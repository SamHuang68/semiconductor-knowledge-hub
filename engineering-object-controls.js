import { playSound } from './data/sound-fx.js';
import { REAL_PHOTOS_DATA } from './data/real-photos.js';
import { PHYSICS_CALCULATORS } from './data/calculators-data.js';
import { OCAP_TREES } from './data/ocap-data.js';
import { CONCEPT_QUIZZES } from './data/quiz-data.js';
import { renderSensitivityPlot } from './data/curve-plotter.js';
import { prepareDiagramReading, bindDiagramReading, disposeDiagramReading, portableDiagram } from './engineering-diagram-reader.js';

// 共用工程物件的 DOM 更新、事件綁定與全螢幕生命週期。
const states = new WeakMap();
const listeners = new WeakMap();

const ALL_PHOTO_IDS = [
  'ch00', 'ch01', 'ch02', 'ch03', 'ch04', 'ch05', 'ch06', 'ch07', 'ch08', 'ch09',
  'ch10', 'ch11', 'ch12', 'ch13', 'ch14', 'ch15', 'ch16', 'ch17', 'ch18', 'ch19',
  'ch20', 'ch21', 'ch22', 'ch23', 'ch24', 'app-glossary', 'app-jargon', 'app-reading'
];

export function bindEngineeringEvent(element, type, handler) {
  if (!element) return;
  let entries = listeners.get(element);
  if (!entries) { entries = new Map(); listeners.set(element, entries); }
  if (entries.has(type)) element.removeEventListener?.(type, entries.get(type));
  element.addEventListener(type, handler);
  entries.set(type, handler);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function detectChId(container, card) {
  const fromAttr = container.getAttribute?.('data-ch-id');
  if (fromAttr) return fromAttr;
  const badge = card.querySelector('.eng-obj-badge')?.textContent || '';
  const match = badge.match(/CH\s*(\d{2})/i);
  if (match) return 'ch' + match[1];
  if (badge.includes('GLOSSARY')) return 'app-glossary';
  if (badge.includes('JARGON')) return 'app-jargon';
  if (badge.includes('READING')) return 'app-reading';
  const titleId = card.querySelector('h2.eng-obj-title')?.id || '';
  const titleMatch = titleId.match(/engObj(Ch\d{2}|App[A-Za-z]+)Title/i);
  if (titleMatch) {
    const key = titleMatch[1];
    if (key.toLowerCase().startsWith('ch')) return key.toLowerCase();
    if (/AppGlossary/i.test(key)) return 'app-glossary';
    if (/AppJargon/i.test(key)) return 'app-jargon';
    if (/AppReading/i.test(key)) return 'app-reading';
  }
  return null;
}

function stateFor(container) {
  let state = states.get(container);
  if (!state) {
    state = {
      dialog: null,
      placeholder: null,
      cleanup: null,
      labels: null,
      status: '',
      fallback: '',
      viewMode: 'split',
      curtainPos: 50,
      showHotspots: true
    };
    states.set(container, state);
  }
  return state;
}

export function registerEngineeringCleanup(container, cleanup) {
  stateFor(container).cleanup = cleanup;
}

// 相同結構保留原生控制項，讓焦點及滑鼠拖曳不因重新繪圖而中斷。
function syncNode(current, next) {
  if (current.nodeType !== next.nodeType ||
      (current.nodeType === 1 && (current.tagName !== next.tagName ||
       current.namespaceURI !== next.namespaceURI || current.id !== next.id))) {
    current.replaceWith(next);
    return next;
  }
  if (current.nodeType !== 1) {
    if (current.nodeValue !== next.nodeValue) current.nodeValue = next.nodeValue;
    return current;
  }
  for (const attr of [...current.attributes]) {
    if (!next.hasAttribute(attr.name)) current.removeAttribute(attr.name);
  }
  for (const attr of next.attributes) {
    if (current.getAttribute(attr.name) !== attr.value) current.setAttribute(attr.name, attr.value);
  }
  const children = [...next.childNodes];
  children.forEach((child, index) => {
    if (current.childNodes[index]) syncNode(current.childNodes[index], child);
    else current.append(child);
  });
  while (current.childNodes.length > children.length) current.lastChild.remove();
  if (current.tagName === 'INPUT' && current.value !== next.value) current.value = next.value;
  return current;
}

function focusable(dialog) {
  return [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], summary, [tabindex="0"]')]
    .filter(node => node.getClientRects().length && !node.closest('[hidden]'));
}

function closeFullscreen(container, returnFocus = true) {
  const state = states.get(container);
  if (!state?.dialog) return;
  state.returnFocus = returnFocus;
  if (state.dialog.open) state.dialog.close();
  state.restore?.();
}

function openFullscreen(container) {
  const state = stateFor(container);
  if (state.dialog?.open) { closeFullscreen(container); return; }
  const doc = container.ownerDocument;
  const dialog = doc.createElement('dialog');
  dialog.className = 'eng-obj-dialog';
  const card = container.querySelector('.eng-obj-card');
  dialog.setAttribute('aria-labelledby', card.getAttribute('aria-labelledby'));
  const placeholder = doc.createComment('工程物件原位置');
  container.before(placeholder);
  state.placeholder = placeholder;
  state.dialog = dialog;
  state.scroll = { x: window.scrollX, y: window.scrollY };
  state.overflow = doc.body.style.overflow;
  state.returnFocus = true;
  dialog.append(container);
  doc.body.append(dialog);
  card.classList.add('is-fullscreen');
  dialog.addEventListener('keydown', event => {
    event.stopPropagation();
    if (event.key !== 'Tab') return;
    const nodes = focusable(dialog);
    const first = nodes[0], last = nodes.at(-1);
    if (!first) return;
    if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  let restored = false;
  state.restore = () => {
    if (restored) return;
    if (dialog.open) return;
    restored = true;
    card.classList.remove('is-fullscreen');
    if (placeholder.isConnected) placeholder.replaceWith(container);
    doc.body.style.overflow = state.overflow;
    dialog.remove();
    state.dialog = null;
    state.placeholder = null;
    const button = container.querySelector('[data-action="fullscreen"]');
    button?.setAttribute('aria-expanded', 'false');
    const text = button?.querySelector('.hud-btn-text');
    if (text) text.textContent = state.labels.btn_fullscreen;
    if (state.returnFocus && container.isConnected) {
      window.scrollTo({ left: state.scroll.x, top: state.scroll.y, behavior: 'instant' });
      button?.focus({ preventScroll: true });
    }
  };
  dialog.addEventListener('close', state.restore, { once: true });
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeFullscreen(container);
  });
  doc.body.style.overflow = 'hidden';
  dialog.showModal();
  const button = container.querySelector('[data-action="fullscreen"]');
  button.setAttribute('aria-expanded', 'true');
  button.querySelector('.hud-btn-text').textContent = state.labels.btn_fullscreen_exit;
  button.focus({ preventScroll: true });
}

async function copySvg(container) {
  const state = stateFor(container);
  const diagrams = [...container.querySelectorAll('.eng-obj-viewport > svg')];
  const svg = diagrams[0];
  const feedback = container.querySelector('.eng-obj-copy-feedback');
  const status = feedback.querySelector('[role="status"]');
  const field = feedback.querySelector('textarea');
  if (!svg) {
    state.status = '目前圖形沒有可複製的 SVG。';
    status.textContent = state.status;
    feedback.hidden = false;
    return;
  }
  let code = portableDiagram(svg).outerHTML;
  if (diagrams.length > 1) {
    const exported = container.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'svg');
    exported.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const width = Math.max(...diagrams.map(diagram => diagram.viewBox.baseVal.width));
    let height = 0;
    for (const diagram of diagrams) {
      const copy = portableDiagram(diagram);
      const partHeight = diagram.viewBox.baseVal.height * width / diagram.viewBox.baseVal.width;
      copy.setAttribute('x', '0');
      copy.setAttribute('y', String(height));
      copy.setAttribute('width', String(width));
      copy.setAttribute('height', String(partHeight));
      exported.append(copy);
      height += partHeight;
    }
    exported.setAttribute('viewBox', `0 0 ${width} ${height}`);
    code = exported.outerHTML;
  }
  try {
    if (!navigator.clipboard?.writeText) throw new Error('剪貼簿不可用');
    await navigator.clipboard.writeText(code);
    if (!container.isConnected) return;
    state.status = state.labels.btn_copied_svg;
    state.fallback = '';
    status.textContent = state.status;
    field.hidden = true;
    field.value = '';
  } catch {
    if (!container.isConnected) return;
    state.status = '自動複製未完成。可從下方欄位手動複製目前的 SVG。';
    state.fallback = code;
    status.textContent = state.status;
    field.hidden = false;
    field.value = code;
    field.focus({ preventScroll: true });
    field.select();
  }
  feedback.hidden = false;
}

/**
 * 實體電顯與機台照片全螢幕高解析 Lightbox 檢視器
 */
export function openPhotoLightbox(initialId, lang, doc) {
  let currentIdx = Math.max(0, ALL_PHOTO_IDS.indexOf(initialId));
  const dialog = doc.createElement('dialog');
  dialog.className = 'photo-lightbox-modal';
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', lang === 'en' ? 'Authentic Semiconductor Micrograph Lightbox' : '半導體微觀實體圖鑑燈箱');

  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let showHotspots = true;

  function renderContent() {
    const photoId = ALL_PHOTO_IDS[currentIdx];
    const photo = REAL_PHOTOS_DATA[photoId];
    if (!photo) return;

    const title = lang === 'en' ? photo.titleEn : photo.titleZh;
    const cat = lang === 'en' ? photo.categoryEn : photo.categoryZh;
    const scale = lang === 'en' ? photo.scaleEn : photo.scaleZh;
    const match = lang === 'en' ? photo.matchEn : photo.matchZh;
    const metrology = photo.metrology || {};
    const tech = lang === 'en' ? (metrology.techniqueEn || '') : (metrology.techniqueZh || '');
    const mag = metrology.mag || '';
    const volt = metrology.voltage || '';
    const fov = metrology.fov || '';
    const hotspots = photo.hotspots || [];

    dialog.innerHTML = `
      <div class="lightbox-shell">
        <header class="lightbox-header">
          <div class="lightbox-header-info">
            <span class="lightbox-badge">${escapeHtml(photoId.toUpperCase())}</span>
            <span class="lightbox-cat">${escapeHtml(cat)}</span>
            <h2 class="lightbox-title">${escapeHtml(title)}</h2>
          </div>
          <div class="lightbox-actions">
            <button type="button" class="lightbox-btn lb-btn-zoom-in" title="${lang === 'en' ? 'Zoom In (+)' : '放大 (+)'}">🔍+</button>
            <button type="button" class="lightbox-btn lb-btn-zoom-out" title="${lang === 'en' ? 'Zoom Out (-)' : '縮小 (-)'}">🔍-</button>
            <button type="button" class="lightbox-btn lb-btn-zoom-reset" title="${lang === 'en' ? 'Reset 100%' : '重置 1:1'}">1:1</button>
            <button type="button" class="lightbox-btn lb-btn-hotspots ${showHotspots ? 'is-active' : ''}" title="${lang === 'en' ? 'Toggle Hotspots' : '切換特徵標記'}">🎯</button>
            <button type="button" class="lightbox-btn lb-btn-close" title="${lang === 'en' ? 'Close (Esc)' : '關閉 (Esc)'}">✕</button>
          </div>
        </header>

        <div class="lightbox-canvas-wrap">
          <button type="button" class="lightbox-nav-btn lb-prev" title="${lang === 'en' ? 'Previous Photo (Left Arrow)' : '上一張照片 (左箭頭)'}">◀</button>
          <div class="lightbox-viewport">
            <div class="lightbox-transform-layer" style="transform: translate(${panX}px, ${panY}px) scale(${zoom});">
              <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(title)}" class="lightbox-img" draggable="false">
              ${showHotspots && hotspots.length ? `
                <div class="lightbox-hotspots-layer">
                  ${hotspots.map((h, i) => `
                    <button type="button" class="photo-hotspot-pin" style="left:${h.x}%; top:${h.y}%;" data-idx="${i}" aria-label="${escapeHtml(lang === 'en' ? h.labelEn : h.labelZh)}">
                      <span class="hotspot-pulse"></span>
                      <span class="hotspot-dot">${i + 1}</span>
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            <div class="lightbox-hotspot-card" hidden></div>
          </div>
          <button type="button" class="lightbox-nav-btn lb-next" title="${lang === 'en' ? 'Next Photo (Right Arrow)' : '下一張照片 (右箭頭)'}">▶</button>
        </div>

        <footer class="lightbox-footer">
          <div class="lightbox-metrology">
            <span class="lb-metro-item"><strong>${lang === 'en' ? 'Technique:' : '檢測技術:'}</strong> ${escapeHtml(tech)}</span>
            <span class="lb-metro-item"><strong>${lang === 'en' ? 'Magnification:' : '倍率:'}</strong> ${escapeHtml(mag)}</span>
            <span class="lb-metro-item"><strong>${lang === 'en' ? 'Energy/Bias:' : '能量/偏壓:'}</strong> ${escapeHtml(volt)}</span>
            <span class="lb-metro-item"><strong>${lang === 'en' ? 'Field of View:' : '視場 (FOV):'}</strong> ${escapeHtml(fov)}</span>
            <span class="lb-metro-item"><strong>${lang === 'en' ? 'Scale:' : '尺度規格:'}</strong> ${escapeHtml(scale)}</span>
          </div>
          <div class="lightbox-match-bar">
            <strong>${lang === 'en' ? 'Physical Significance:' : '理論與物理實證：'}</strong> ${escapeHtml(match)}
          </div>
        </footer>
      </div>
    `;

    bindLightboxEvents();
  }

  function bindLightboxEvents() {
    const layer = dialog.querySelector('.lightbox-transform-layer');
    const viewport = dialog.querySelector('.lightbox-viewport');
    const card = dialog.querySelector('.lightbox-hotspot-card');

    dialog.querySelector('.lb-btn-zoom-in')?.addEventListener('click', () => {
      zoom = Math.min(zoom * 1.3, 5.0);
      updateTransform();
    });
    dialog.querySelector('.lb-btn-zoom-out')?.addEventListener('click', () => {
      zoom = Math.max(zoom / 1.3, 0.5);
      updateTransform();
    });
    dialog.querySelector('.lb-btn-zoom-reset')?.addEventListener('click', () => {
      zoom = 1; panX = 0; panY = 0;
      updateTransform();
    });
    dialog.querySelector('.lb-btn-hotspots')?.addEventListener('click', () => {
      showHotspots = !showHotspots;
      renderContent();
    });
    dialog.querySelector('.lb-btn-close')?.addEventListener('click', () => {
      dialog.close();
      dialog.remove();
    });

    dialog.querySelector('.lb-prev')?.addEventListener('click', () => {
      currentIdx = (currentIdx - 1 + ALL_PHOTO_IDS.length) % ALL_PHOTO_IDS.length;
      zoom = 1; panX = 0; panY = 0;
      renderContent();
    });
    dialog.querySelector('.lb-next')?.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % ALL_PHOTO_IDS.length;
      zoom = 1; panX = 0; panY = 0;
      renderContent();
    });

    viewport?.addEventListener('mousedown', e => {
      if (e.target.closest('.photo-hotspot-pin')) return;
      isDragging = true;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      viewport.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      updateTransform();
    });
    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      if (viewport) viewport.style.cursor = 'grab';
    });

    viewport?.addEventListener('wheel', e => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.15 : 0.87;
      zoom = Math.min(Math.max(zoom * delta, 0.4), 6.0);
      updateTransform();
    }, { passive: false });

    dialog.querySelectorAll('.photo-hotspot-pin').forEach(pin => {
      pin.addEventListener('mouseenter', () => showHotspotCard(pin));
      pin.addEventListener('click', e => {
        e.stopPropagation();
        showHotspotCard(pin);
      });
    });

    function showHotspotCard(pin) {
      const idx = parseInt(pin.dataset.idx, 10);
      const photo = REAL_PHOTOS_DATA[ALL_PHOTO_IDS[currentIdx]];
      const h = photo?.hotspots?.[idx];
      if (!h || !card) return;
      const label = lang === 'en' ? h.labelEn : h.labelZh;
      const detail = lang === 'en' ? h.detailEn : h.detailZh;
      card.innerHTML = `
        <div class="hotspot-card-badge">HOTSPOT #${idx + 1}</div>
        <div class="hotspot-card-title">${escapeHtml(label)}</div>
        <div class="hotspot-card-detail">${escapeHtml(detail)}</div>
      `;
      card.hidden = false;
    }

    viewport?.addEventListener('click', e => {
      if (!e.target.closest('.photo-hotspot-pin') && !e.target.closest('.lightbox-hotspot-card')) {
        if (card) card.hidden = true;
      }
    });

    function updateTransform() {
      if (layer) layer.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
    }
  }

  dialog.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      dialog.close();
      dialog.remove();
    } else if (e.key === 'ArrowLeft') {
      currentIdx = (currentIdx - 1 + ALL_PHOTO_IDS.length) % ALL_PHOTO_IDS.length;
      zoom = 1; panX = 0; panY = 0;
      renderContent();
    } else if (e.key === 'ArrowRight') {
      currentIdx = (currentIdx + 1) % ALL_PHOTO_IDS.length;
      zoom = 1; panX = 0; panY = 0;
      renderContent();
    } else if (e.key === '+' || e.key === '=') {
      zoom = Math.min(zoom * 1.3, 5.0);
      const layer = dialog.querySelector('.lightbox-transform-layer');
      if (layer) layer.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
    } else if (e.key === '-') {
      zoom = Math.max(zoom / 1.3, 0.5);
      const layer = dialog.querySelector('.lightbox-transform-layer');
      if (layer) layer.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
    } else if (e.key === '0') {
      zoom = 1; panX = 0; panY = 0;
      const layer = dialog.querySelector('.lightbox-transform-layer');
      if (layer) layer.style.transform = `translate(0px, 0px) scale(1)`;
    }
  });

  doc.body.append(dialog);
  renderContent();
  dialog.showModal();
}

/**
 * 物理定律即時計算沙盒彈窗 (Physics Sandbox Modal)
 */
export function openPhysicsCalculator(chId, lang, doc) {
  const calc = PHYSICS_CALCULATORS[chId];
  if (!calc) return;
  const dialog = doc.createElement('dialog');
  dialog.className = 'physics-calc-modal';
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', lang === 'en' ? calc.titleEn : calc.titleZh);

  const paramState = {};
  for (const p of calc.params) {
    paramState[p.id] = p.default;
  }

  function render() {
    const title = lang === 'en' ? calc.titleEn : calc.titleZh;
    const desc = lang === 'en' ? calc.descriptionEn : calc.descriptionZh;
    const outputs = calc.calculate(paramState);

    dialog.innerHTML = `
      <div class="calc-modal-shell">
        <header class="calc-modal-header">
          <div class="calc-title-area">
            <span class="calc-badge">PHYSICS SANDBOX</span>
            <h2 class="calc-title">${escapeHtml(title)}</h2>
          </div>
          <button type="button" class="calc-close-btn" title="${lang === 'en' ? 'Close (Esc)' : '關閉 (Esc)'}">✕</button>
        </header>

        <div class="calc-body">
          <div class="calc-formula-banner">
            <span class="formula-label">${lang === 'en' ? 'Governing Formula:' : '物理統御方程式：'}</span>
            <code class="formula-code">${escapeHtml(calc.formulaLatex)}</code>
            <p class="formula-desc">${escapeHtml(desc)}</p>
          </div>

          ${renderSensitivityPlot(chId, paramState, lang)}

          <div class="calc-grid">
            <div class="calc-inputs-pane">
              <h3 class="pane-title">${lang === 'en' ? 'Parameter Inputs' : '變數控制項'}</h3>
              <div class="calc-params-list">
                ${calc.params.map(p => {
                  const pName = lang === 'en' ? p.nameEn : p.nameZh;
                  const currentVal = paramState[p.id];
                  return `
                    <div class="calc-param-group" data-param="${p.id}">
                      <div class="calc-param-header">
                        <label class="calc-param-label" for="param-${p.id}">${escapeHtml(pName)}</label>
                        <span class="calc-param-value" id="val-${p.id}">${currentVal} ${escapeHtml(p.unit)}</span>
                      </div>
                      <input type="range" class="calc-slider" id="param-${p.id}"
                        min="${p.min}" max="${p.max}" step="${p.step}" value="${currentVal}"
                        aria-valuemin="${p.min}" aria-valuemax="${p.max}" aria-valuenow="${currentVal}">
                      ${p.presets ? `
                        <div class="calc-presets">
                          ${p.presets.map(pr => `
                            <button type="button" class="calc-preset-btn ${currentVal === pr.val ? 'is-selected' : ''}" data-param="${p.id}" data-val="${pr.val}">${escapeHtml(pr.label)}</button>
                          `).join('')}
                        </div>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="calc-outputs-pane">
              <h3 class="pane-title">${lang === 'en' ? 'Real-Time Derived Outputs' : '即時物理計算結果'}</h3>
              <div class="calc-outputs-list">
                ${outputs.map(out => {
                  const outLabel = lang === 'en' ? out.labelEn : out.labelZh;
                  const outNote = lang === 'en' ? out.noteEn : out.noteZh;
                  return `
                    <div class="calc-output-card ${out.highlight ? 'is-highlight' : ''}">
                      <div class="output-label">${escapeHtml(outLabel)}</div>
                      <div class="output-value-row">
                        <span class="output-num">${escapeHtml(out.value)}</span>
                        ${out.unit ? `<span class="output-unit">${escapeHtml(out.unit)}</span>` : ''}
                      </div>
                      ${outNote ? `<div class="output-note">${escapeHtml(outNote)}</div>` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    dialog.querySelector('.calc-close-btn')?.addEventListener('click', () => {
      dialog.close();
      dialog.remove();
    });

    dialog.querySelectorAll('.calc-slider').forEach(slider => {
      slider.addEventListener('input', () => {
        const pId = slider.id.replace('param-', '');
        paramState[pId] = parseFloat(slider.value);
        render();
      });
    });

    dialog.querySelectorAll('.calc-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.dataset.param;
        const val = parseFloat(btn.dataset.val);
        paramState[pId] = val;
        render();
      });
    });
  }

  dialog.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      dialog.close();
      dialog.remove();
    }
  });

  doc.body.append(dialog);
  render();
  dialog.showModal();
}

/**
 * 異常處置決策樹 (OCAP Decision Modal)
 */

/**
 * 晶圓製造觀念隨堂快測彈窗 (Concept Quick-Quiz Modal)
 */
export function openQuizModal(chId, lang, doc) {
  const quizList = CONCEPT_QUIZZES[chId] || CONCEPT_QUIZZES.ch00;
  if (!quizList || !quizList.length) return;
  const dialog = doc.createElement('dialog');
  dialog.className = 'quiz-modal';
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', lang === 'en' ? 'Wafer Fabrication Concept Quick-Quiz' : '半導體晶圓製造觀念隨堂快測');

  let currentQ = 0;
  let selectedOption = null;
  let isAnswered = false;

  function render() {
    const q = quizList[currentQ];
    const qText = lang === 'en' ? q.questionEn : q.questionZh;
    const opts = lang === 'en' ? q.optionsEn : q.optionsZh;
    const expText = lang === 'en' ? q.explanationEn : q.explanationZh;

    dialog.innerHTML = `
      <div class="quiz-shell">
        <header class="quiz-header">
          <div class="quiz-title-area">
            <span class="quiz-badge">CONCEPT QUICK-QUIZ</span>
            <span class="quiz-count">Q ${currentQ + 1} / ${quizList.length}</span>
          </div>
          <button type="button" class="quiz-close-btn" title="${lang === 'en' ? 'Close (Esc)' : '關閉 (Esc)'}">✕</button>
        </header>

        <div class="quiz-body">
          <h3 class="quiz-question">${escapeHtml(qText)}</h3>
          <div class="quiz-options-list">
            ${opts.map((opt, idx) => {
              let optClass = 'quiz-opt-btn';
              if (isAnswered) {
                if (idx === q.answer) optClass += ' is-correct';
                else if (idx === selectedOption) optClass += ' is-wrong';
              } else if (selectedOption === idx) {
                optClass += ' is-selected';
              }
              return `
                <button type="button" class="${optClass}" data-idx="${idx}" ${isAnswered ? 'disabled' : ''}>
                  <span class="opt-prefix">${String.fromCharCode(65 + idx)}.</span>
                  <span class="opt-text">${escapeHtml(opt)}</span>
                </button>
              `;
            }).join('')}
          </div>

          ${isAnswered ? `
            <div class="quiz-feedback-box ${selectedOption === q.answer ? 'is-correct' : 'is-wrong'}">
              <div class="feedback-verdict">${selectedOption === q.answer ? (lang === 'en' ? '✅ Correct Answer!' : '✅ 回答正確！') : (lang === 'en' ? '❌ Incorrect!' : '❌ 回答有誤')}</div>
              <p class="feedback-explanation"><strong>${lang === 'en' ? 'Physics Explanation:' : '物理原理解析：'}</strong> ${escapeHtml(expText)}</p>
            </div>
          ` : ''}
        </div>

        <footer class="quiz-footer">
          ${!isAnswered ? `
            <button type="button" class="quiz-submit-btn" ${selectedOption === null ? 'disabled' : ''}>${lang === 'en' ? 'Submit Answer' : '提交答案'}</button>
          ` : `
            <button type="button" class="quiz-next-btn">${currentQ < quizList.length - 1 ? (lang === 'en' ? 'Next Question →' : '下一題 →') : (lang === 'en' ? 'Complete (Close)' : '完成測驗 (關閉)')}</button>
          `}
        </footer>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    dialog.querySelector('.quiz-close-btn')?.addEventListener('click', () => {
      dialog.close();
      dialog.remove();
    });

    dialog.querySelectorAll('.quiz-opt-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedOption = parseInt(btn.dataset.idx, 10);
        render();
      });
    });

    dialog.querySelector('.quiz-submit-btn')?.addEventListener('click', () => {
      if (selectedOption === null) return;
      isAnswered = true;
      render();
    });

    dialog.querySelector('.quiz-next-btn')?.addEventListener('click', () => {
      if (currentQ < quizList.length - 1) {
        currentQ++;
        selectedOption = null;
        isAnswered = false;
        render();
      } else {
        dialog.close();
        dialog.remove();
      }
    });
  }

  dialog.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      dialog.close();
      dialog.remove();
    }
  });

  doc.body.append(dialog);
  render();
  dialog.showModal();
}

export function openOcapModal(chId, lang, doc) {
  const ocap = OCAP_TREES[chId];
  if (!ocap) return;
  playSound('alarm');
  const dialog = doc.createElement('dialog');
  dialog.className = 'ocap-modal';
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', lang === 'en' ? ocap.titleEn : ocap.titleZh);

  const title = lang === 'en' ? ocap.titleEn : ocap.titleZh;
  const trigger = lang === 'en' ? ocap.triggerEn : ocap.triggerZh;
  const containment = lang === 'en' ? ocap.containmentEn : ocap.containmentZh;
  const rca = lang === 'en' ? ocap.rcaEn : ocap.rcaZh;
  const disposition = lang === 'en' ? ocap.dispositionEn : ocap.dispositionZh;
  const prevention = lang === 'en' ? ocap.preventionEn : ocap.preventionZh;
  const steps = ocap.steps || [];

  dialog.innerHTML = `
    <div class="ocap-shell">
      <header class="ocap-header">
        <div class="ocap-title-row">
          <span class="ocap-badge">OCAP STANDARD PROCEDURE</span>
          <h2 class="ocap-title">${escapeHtml(title)}</h2>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button type="button" class="btn-print-8d" title="${lang === 'en' ? 'Print or export formal 8D problem solving sheet' : '列印或匯出標準 8D 異常處置工程表單'}">🖨️ ${lang === 'en' ? '8D Sheet' : '8D 報告表'}</button>
          <button type="button" class="ocap-close-btn" title="${lang === 'en' ? 'Close (Esc)' : '關閉 (Esc)'}">✕</button>
        </div>
      </header>

      <div class="ocap-body">
        <div class="ocap-alert-banner">
          <div class="ocap-alert-item trigger-item">
            <span class="alert-tag trigger-tag">🚨 ${lang === 'en' ? 'TRIGGER SIGNAL' : '異常觸發條件'}</span>
            <p class="alert-desc">${escapeHtml(trigger)}</p>
          </div>
          <div class="ocap-alert-item containment-item">
            <span class="alert-tag containment-tag">🛑 ${lang === 'en' ? 'CONTAINMENT ACTION' : '緊急防堵隔離'}</span>
            <p class="alert-desc">${escapeHtml(containment)}</p>
          </div>
        </div>

        <div class="ocap-flow-section">
          <h3 class="section-title">${lang === 'en' ? '5-Stage Diagnostic Decision Flowchart' : '五階段應變處置決策流程圖'}</h3>
          <div class="ocap-flow-grid">
            ${steps.map((s, idx) => {
              const text = lang === 'en' ? s.textEn : s.textZh;
              return `
                <div class="ocap-step-node step-${s.type || 'standard'}">
                  <div class="step-num-badge">STAGE 0${idx + 1}</div>
                  <div class="step-type-lbl">${escapeHtml((s.type || 'step').toUpperCase())}</div>
                  <div class="step-content">${escapeHtml(text)}</div>
                  ${idx < steps.length - 1 ? `<div class="step-connector-arrow">➔</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="ocap-bottom-panels">
          <div class="ocap-sub-panel rca-panel">
            <h4 class="sub-title">🔍 ${lang === 'en' ? 'Root Cause Analysis (RCA)' : '根因排查方法'}</h4>
            <p>${escapeHtml(rca)}</p>
          </div>
          <div class="ocap-sub-panel disp-panel">
            <h4 class="sub-title">⚖️ ${lang === 'en' ? 'Wafer Lot Disposition' : '批次處置放行準則'}</h4>
            <p>${escapeHtml(disposition)}</p>
          </div>
          <div class="ocap-sub-panel prev-panel">
            <h4 class="sub-title">🛡️ ${lang === 'en' ? 'Long-Term Prevention' : '防再發工程閉鎖'}</h4>
            <p>${escapeHtml(prevention)}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  dialog.querySelector('.ocap-close-btn')?.addEventListener('click', () => {
    dialog.close();
    dialog.remove();
  });

  dialog.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      dialog.close();
      dialog.remove();
    }
  });

  doc.body.append(dialog);
  dialog.showModal();
}

export function renderEngineeringCard(container, markup, labels) {
  // 字串層單元測試仍沿用原契約；真正 DOM 的行為另由瀏覽器案例覆核。
  if (!container.ownerDocument?.createElement) { container.innerHTML = markup; return; }
  const state = stateFor(container);
  state.labels = labels;
  const doc = container.ownerDocument;
  const template = doc.createElement('template');
  template.innerHTML = markup;
  const next = template.content.querySelector('.eng-obj-card');
  if (!next) throw new Error('工程物件缺少卡片根節點');

  // 偵測章節識別與中英雙語語系，查詢實體照片資料庫
  const chId = detectChId(container, next);
  const lang = container.getAttribute?.('data-lang') || (doc.documentElement?.lang === 'en' ? 'en' : 'zh');
  const photo = chId ? REAL_PHOTOS_DATA[chId] : null;

  if (photo) {
    // 1. 建立視圖模式切換器 (並列對照 / 動態示意 / 實體照片 / 疊合滑塊)
    const viewToggle = doc.createElement('div');
    viewToggle.className = 'eng-obj-view-toggle';
    viewToggle.setAttribute('role', 'radiogroup');
    viewToggle.setAttribute('aria-label', lang === 'en' ? 'Display Mode' : '視圖顯示模式');

    const modes = [
      ['split', '🔀', '並列對照', 'Side-by-Side'],
      ['schematic', '⚡', '動態示意', 'Schematic'],
      ['photo', '📷', '實體照片', 'Real Photo'],
      ['overlay', '🌓', '疊合滑塊', 'Curtain Overlay']
    ];
    for (const [m, icon, zh, en] of modes) {
      const btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'view-toggle-btn' + (state.viewMode === m ? ' is-active' : '');
      btn.dataset.viewMode = m;
      btn.title = lang === 'en' ? en + ' View' : zh + '模式';
      btn.innerHTML = '<span aria-hidden="true">' + icon + '</span> <span class="view-toggle-text">' + (lang === 'en' ? en : zh) + '</span>';
      viewToggle.append(btn);
    }
    next.querySelector('.eng-obj-badge-row')?.append(viewToggle);

    // 2. 建立顯示舞台 (Stage)，將 viewport 與 photo-panel 整合
    const viewport = next.querySelector('.eng-obj-viewport');
    if (viewport && !viewport.parentElement.classList.contains('eng-obj-stage')) {
      const stage = doc.createElement('div');
      stage.className = 'eng-obj-stage is-view-' + state.viewMode;
      stage.style.setProperty('--curtain-pos', (state.curtainPos || 50) + '%');
      viewport.before(stage);
      stage.append(viewport);

      const photoPanel = doc.createElement('aside');
      photoPanel.className = 'eng-obj-photo-panel';
      photoPanel.setAttribute('aria-label', lang === 'en' ? 'Authentic Semiconductor Photo & Micrograph' : '半導體實體照片與微觀電顯');

      const title = lang === 'en' ? photo.titleEn : photo.titleZh;
      const category = lang === 'en' ? photo.categoryEn : photo.categoryZh;
      const scale = lang === 'en' ? photo.scaleEn : photo.scaleZh;
      const caption = lang === 'en' ? photo.captionEn : photo.captionZh;
      const match = lang === 'en' ? photo.matchEn : photo.matchZh;
      const metrology = photo.metrology || {};
      const tech = lang === 'en' ? (metrology.techniqueEn || '') : (metrology.techniqueZh || '');
      const mag = metrology.mag || '';
      const volt = metrology.voltage || '';
      const fov = metrology.fov || '';
      const hotspots = photo.hotspots || [];

      photoPanel.innerHTML = `
        <div class="photo-panel-header">
          <div class="photo-header-left">
            <span class="photo-category-badge">${escapeHtml(category)}</span>
            <span class="photo-scale-badge">${escapeHtml(scale)}</span>
          </div>
          <div class="photo-header-tools">
            ${hotspots.length ? `
              <button type="button" class="photo-tool-btn btn-toggle-hotspots ${state.showHotspots ? 'is-active' : ''}" title="${lang === 'en' ? 'Toggle Feature Hotspots' : '切換微觀物理特徵標註'}">
                <span aria-hidden="true">🎯</span> <span class="photo-tool-text">${lang === 'en' ? 'Hotspots' : '微觀標註'}</span>
              </button>
            ` : ''}
            <button type="button" class="photo-tool-btn btn-open-lightbox" title="${lang === 'en' ? 'Open High-Resolution Lightbox (Zoom & Pan)' : '開啟高解析全景燈箱（支援微觀縮放與平移）'}">
              <span aria-hidden="true">🔍</span> <span class="photo-tool-text">${lang === 'en' ? 'Zoom' : '微觀檢視'}</span>
            </button>
          </div>
        </div>

        <div class="photo-img-wrap ${state.showHotspots ? 'has-hotspots' : ''}" title="${lang === 'en' ? 'Double click to open Lightbox' : '點擊在模式間切換，雙擊開啟微觀燈箱'}">
          <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(title)}" class="eng-real-photo">
          ${hotspots.length ? `
            <div class="photo-hotspots-layer" role="region" aria-label="Microscopic Hotspots">
              ${hotspots.map((h, idx) => `
                <button type="button" class="photo-hotspot-pin" style="left:${h.x}%; top:${h.y}%;" data-idx="${idx}" aria-label="${escapeHtml(lang === 'en' ? h.labelEn : h.labelZh)}">
                  <span class="hotspot-pulse"></span>
                  <span class="hotspot-dot">${idx + 1}</span>
                </button>
              `).join('')}
              <div class="photo-hotspot-tooltip" hidden></div>
            </div>
          ` : ''}
        </div>

        <div class="photo-overlay-caption">
          <div class="photo-title">${escapeHtml(title)}</div>
          <div class="photo-caption">${escapeHtml(caption)}</div>
          <div class="photo-metrology-hud">
            <span class="hud-item"><strong class="hud-lbl">${lang === 'en' ? 'Technique:' : '檢測技術:'}</strong> ${escapeHtml(tech)}</span>
            <span class="hud-item"><strong class="hud-lbl">${lang === 'en' ? 'Mag:' : '倍率:'}</strong> ${escapeHtml(mag)}</span>
            <span class="hud-item"><strong class="hud-lbl">${lang === 'en' ? 'Energy/Bias:' : '能量/偏壓:'}</strong> ${escapeHtml(volt)}</span>
            <span class="hud-item"><strong class="hud-lbl">${lang === 'en' ? 'FOV:' : '視場:'}</strong> ${escapeHtml(fov)}</span>
          </div>
          <div class="photo-match-note"><strong>${lang === 'en' ? 'Theory vs. Physical:' : '理論與實體對照：'}</strong> ${escapeHtml(match)}</div>
        </div>
      `;
      stage.append(photoPanel);

      // 疊合模式滑桿控制器
      const curtainBar = doc.createElement('div');
      curtainBar.className = 'curtain-slider-bar';
      curtainBar.innerHTML = `
        <span class="curtain-label-left">⚡ ${lang === 'en' ? 'Schematic' : '動態示意'}</span>
        <input type="range" min="0" max="100" value="${state.curtainPos || 50}" class="curtain-slider" aria-label="${lang === 'en' ? 'Curtain Split Ratio' : '疊合對照比例'}">
        <span class="curtain-label-right">📷 ${lang === 'en' ? 'Physical Photo' : '實體照片'}</span>
        <span class="curtain-val-badge">${state.curtainPos || 50}%</span>
      `;
      stage.append(curtainBar);
    }
  }

  // 物理速算器與 OCAP 快捷按鈕群
  const toolCluster = doc.createElement('div');
  toolCluster.className = 'eng-obj-tool-cluster';

  if (chId && PHYSICS_CALCULATORS[chId]) {
    const btnCalc = doc.createElement('button');
    btnCalc.type = 'button';
    btnCalc.className = 'tool-cluster-btn btn-open-calc';
    btnCalc.title = lang === 'en' ? 'Open Physics Sandbox Calculator' : '開啟物理定律即時計算沙盒';
    btnCalc.innerHTML = '<span aria-hidden="true">🧮</span> <span class="cluster-btn-text">' + (lang === 'en' ? 'Physics Sandbox' : '物理速算器') + '</span>';
    toolCluster.append(btnCalc);
  }

    if (chId && CONCEPT_QUIZZES[chId]) {
    const btnQuiz = doc.createElement('button');
    btnQuiz.type = 'button';
    btnQuiz.className = 'tool-cluster-btn btn-open-quiz';
    btnQuiz.title = lang === 'en' ? 'Take Concept Quick-Quiz' : '挑戰晶圓製造觀念隨堂快測';
    btnQuiz.innerHTML = '<span aria-hidden="true">📝</span> <span class="cluster-btn-text">' + (lang === 'en' ? 'Quick Quiz' : '隨堂快測') + '</span>';
    toolCluster.append(btnQuiz);
  }

  if (chId && OCAP_TREES[chId]) {
    const btnOcap = doc.createElement('button');
    btnOcap.type = 'button';
    btnOcap.className = 'tool-cluster-btn btn-open-ocap';
    btnOcap.title = lang === 'en' ? 'Inspect OCAP Decision Flowchart' : '檢視異常反應處置決策樹 (OCAP)';
    btnOcap.innerHTML = '<span aria-hidden="true">🚨</span> <span class="cluster-btn-text">' + (lang === 'en' ? 'OCAP Flow' : 'OCAP 決策樹') + '</span>';
    toolCluster.append(btnOcap);
  }

  if (toolCluster.childNodes.length > 0) {
    next.querySelector('.eng-obj-badge-row')?.append(toolCluster);
  }

  const hud = doc.createElement('div');
  hud.className = 'eng-obj-hud-actions';
  for (const [action, text] of [
    ['fullscreen', state.dialog?.open ? labels.btn_fullscreen_exit : labels.btn_fullscreen],
    ['copy-svg', labels.btn_copy_svg]
  ]) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.className = 'eng-obj-hud-btn';
    button.dataset.action = action;
    button.title = text;
    const span = doc.createElement('span');
    span.className = 'hud-btn-text';
    span.textContent = text;
    button.append(span);
    if (action === 'fullscreen') {
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-expanded', String(Boolean(state.dialog?.open)));
    }
    hud.append(button);
  }
  next.querySelector('.eng-obj-badge-row').append(hud);

  const boundary = doc.createElement('p');
  boundary.className = 'eng-obj-boundary';
  boundary.textContent = '互動教學示意：數值用於觀察模型趨勢，未經特定設備或產品校準；不能作為製程配方、量產預測或放行依據。';
  next.querySelector('.eng-obj-header').append(boundary);

  const feedback = doc.createElement('div');
  feedback.className = 'eng-obj-copy-feedback';
  feedback.hidden = !state.status;
  const status = doc.createElement('p');
  status.setAttribute('role', 'status');
  status.textContent = state.status;
  const field = doc.createElement('textarea');
  field.setAttribute('aria-label', '目前圖形的 SVG 原始碼');
  field.readOnly = true;
  field.hidden = !state.fallback;
  field.value = state.fallback;
  feedback.append(status, field);
  next.querySelector('.eng-obj-header').append(feedback);

  if (state.dialog?.open) next.classList.add('is-fullscreen');
  const previous = container.querySelector('.eng-obj-card');
  prepareDiagramReading(next, previous, state);
  if (previous) syncNode(previous, next);
  else container.replaceChildren(next);

  // 原始碼欄位是 DOM property，不依賴 HTML value 屬性。
  container.querySelector('.eng-obj-copy-feedback textarea').value = state.fallback;
  bindEngineeringEvent(container.querySelector('[data-action="fullscreen"]'), 'click', () => openFullscreen(container));
  bindEngineeringEvent(container.querySelector('[data-action="copy-svg"]'), 'click', () => copySvg(container));
  bindDiagramReading(container, state, bindEngineeringEvent);

  // 綁定視圖模式切換事件
  container.querySelectorAll('.view-toggle-btn').forEach(btn => {
    bindEngineeringEvent(btn, 'click', () => {
      const mode = btn.dataset.viewMode;
      if (!mode) return;
      state.viewMode = mode;
      container.querySelectorAll('.view-toggle-btn').forEach(b => {
        b.classList.toggle('is-active', b.dataset.viewMode === mode);
      });
      const stage = container.querySelector('.eng-obj-stage');
      if (stage) {
        stage.className = 'eng-obj-stage is-view-' + mode;
      }
    });
  });

  // 綁定疊合滑塊事件
  const curtainSlider = container.querySelector('.curtain-slider');
  const curtainBadge = container.querySelector('.curtain-val-badge');
  const stage = container.querySelector('.eng-obj-stage');
  if (curtainSlider && stage) {
    bindEngineeringEvent(curtainSlider, 'input', () => {
      const val = curtainSlider.value;
      state.curtainPos = val;
      stage.style.setProperty('--curtain-pos', val + '%');
      if (curtainBadge) curtainBadge.textContent = val + '%';
    });
  }

  // 特徵熱點開關
  const btnHotspots = container.querySelector('.btn-toggle-hotspots');
  const imgWrap = container.querySelector('.photo-img-wrap');
  if (btnHotspots && imgWrap) {
    bindEngineeringEvent(btnHotspots, 'click', () => {
      state.showHotspots = !state.showHotspots;
      btnHotspots.classList.toggle('is-active', state.showHotspots);
      imgWrap.classList.toggle('has-hotspots', state.showHotspots);
    });
  }

  // 特徵熱點 Hover / Click 提示窗
  const tooltip = container.querySelector('.photo-hotspot-tooltip');
  if (tooltip && photo?.hotspots) {
    container.querySelectorAll('.photo-hotspot-pin').forEach(pin => {
      const showTip = () => {
        const idx = parseInt(pin.dataset.idx, 10);
        const h = photo.hotspots[idx];
        if (!h) return;
        const label = lang === 'en' ? h.labelEn : h.labelZh;
        const detail = lang === 'en' ? h.detailEn : h.detailZh;
        tooltip.innerHTML = `
          <div class="tooltip-badge">#${idx + 1}</div>
          <div class="tooltip-title">${escapeHtml(label)}</div>
          <div class="tooltip-detail">${escapeHtml(detail)}</div>
        `;
        tooltip.hidden = false;
        const pinLeft = parseFloat(pin.style.left);
        const pinTop = parseFloat(pin.style.top);
        tooltip.style.left = Math.min(Math.max(pinLeft, 10), 85) + '%';
        tooltip.style.top = (pinTop > 60 ? pinTop - 35 : pinTop + 8) + '%';
      };

      bindEngineeringEvent(pin, 'mouseenter', showTip);
      bindEngineeringEvent(pin, 'click', e => {
        e.stopPropagation();
        showTip();
      });
    });

    if (imgWrap) {
      bindEngineeringEvent(imgWrap, 'mouseleave', () => {
        tooltip.hidden = true;
      });
      bindEngineeringEvent(imgWrap, 'click', e => {
        if (!e.target.closest('.photo-hotspot-pin') && !e.target.closest('.photo-hotspot-tooltip')) {
          tooltip.hidden = true;
        }
      });
    }
  }

  // 燈箱開啟按鈕
  const btnLightbox = container.querySelector('.btn-open-lightbox');
  if (btnLightbox && chId) {
    bindEngineeringEvent(btnLightbox, 'click', e => {
      e.stopPropagation();
      openPhotoLightbox(chId, lang, doc);
    });
  }

  // 雙擊照片開啟燈箱
  if (imgWrap && chId) {
    bindEngineeringEvent(imgWrap, 'dblclick', () => {
      openPhotoLightbox(chId, lang, doc);
    });
  }

  // 綁定物理速算器與 OCAP 決策樹事件
  const btnCalc = container.querySelector('.btn-open-calc');
  if (btnCalc && chId) {
    bindEngineeringEvent(btnCalc, 'click', e => {
      e.stopPropagation();
      openPhysicsCalculator(chId, lang, doc);
    });
  }

    const btnQuiz = container.querySelector('.btn-open-quiz');
  if (btnQuiz && chId) {
    bindEngineeringEvent(btnQuiz, 'click', e => {
      e.stopPropagation();
      openQuizModal(chId, lang, doc);
    });
  }

  const btnOcap = container.querySelector('.btn-open-ocap');
  if (btnOcap && chId) {
    bindEngineeringEvent(btnOcap, 'click', e => {
      e.stopPropagation();
      openOcapModal(chId, lang, doc);
    });
  }

  // 卡片 5 與 卡片 6 的點擊直連
  const metricCards = container.querySelectorAll('.eng-obj-metric-card');
  if (metricCards[4] && chId && PHYSICS_CALCULATORS[chId]) {
    metricCards[4].style.cursor = 'pointer';
    metricCards[4].title = lang === 'en' ? 'Click to open Physics Sandbox Calculator' : '點擊開啟物理定律即時計算沙盒';
    bindEngineeringEvent(metricCards[4], 'click', () => openPhysicsCalculator(chId, lang, doc));
  }
  if (metricCards[5] && chId && OCAP_TREES[chId]) {
    metricCards[5].style.cursor = 'pointer';
    metricCards[5].title = lang === 'en' ? 'Click to inspect OCAP Decision Flowchart' : '點擊檢視異常反應處置決策樹 (OCAP)';
    bindEngineeringEvent(metricCards[5], 'click', () => openOcapModal(chId, lang, doc));
  }
}

export function disposeEngineeringObject(container) {
  const state = states.get(container);
  if (!state) return;
  state.cleanup?.();
  disposeDiagramReading(state);
  closeFullscreen(container, false);
  states.delete(container);
}
