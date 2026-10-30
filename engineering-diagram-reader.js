// 同一份活 SVG 提供全圖、閱讀比例與可換行文字，不複製互動圖形。
function diagrams(card) { return [...card.querySelectorAll('.eng-obj-viewport > svg')]; }
function textOf(node) { return node.textContent.replace(/\s+/g, ' ').trim(); }

function readingState(state) {
  return state.reading ||= { view: 'fit', scale: 1, open: true, observer: null, width: 0 };
}

function afterDiagramLayout(container, reading, action) {
  if (reading.frame) cancelAnimationFrame(reading.frame);
  let attempts = 0;
  const position = () => {
    reading.frame = null;
    if (!container.isConnected) return;
    const ready = diagrams(container).every(svg => {
      const box = svg.getBoundingClientRect();
      return Math.abs(box.width - svg.viewBox.baseVal.width * reading.scale) < 1 && Math.abs(box.height - svg.viewBox.baseVal.height * reading.scale) < 1;
    });
    // 模型更新與離屏 SVG 可能延後布局；以真正尺寸為準，不假設固定兩個畫格足夠。
    if (!ready && ++attempts < 60) { reading.frame = requestAnimationFrame(position); return; }
    if (ready) action();
  };
  reading.frame = requestAnimationFrame(position);
}

function ensureSharedSvgDefs(svgs, doc) {
  for (const svg of svgs) {
    if (svg.querySelector('defs[data-shared-optical-defs]')) continue;
    const hasArrow = Boolean(svg.querySelector('#arrow'));
    const hasGlow = Boolean(svg.querySelector('#glow'));
    const wrapper = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    wrapper.innerHTML = `<defs data-shared-optical-defs="1">` +
      (hasArrow ? '' : `<marker id="arrow" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8.5 5 L 0 8.5 L 2.2 5 z" fill="context-stroke" stroke="none"/></marker>`) +
      `<marker id="arrow-cyan" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8.5 5 L 0 8.5 L 2.2 5 z" fill="#38bdf8"/></marker>` +
      `<marker id="arrow-emerald" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8.5 5 L 0 8.5 L 2.2 5 z" fill="#10b981"/></marker>` +
      `<marker id="arrow-amber" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8.5 5 L 0 8.5 L 2.2 5 z" fill="#f59e0b"/></marker>` +
      `<marker id="arrow-rose" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8.5 5 L 0 8.5 L 2.2 5 z" fill="#ef4444"/></marker>` +
      (hasGlow ? '' : `<filter id="glow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`) +
      `<linearGradient id="siSheenGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#334155"/><stop offset="50%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>` +
      `<linearGradient id="cuDamasceneGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fbbf24"/><stop offset="50%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#b45309"/></linearGradient>` +
      `<radialGradient id="plasmaAuraGrad" cx="50%" cy="50%" r="55%"><stop offset="0%" stop-color="#c084fc" stop-opacity="0.55"/><stop offset="55%" stop-color="#38bdf8" stop-opacity="0.25"/><stop offset="100%" stop-color="#090d16" stop-opacity="0"/></radialGradient>` +
      `</defs>`;
    const defs = wrapper.firstElementChild;
    if (defs) svg.prepend(defs);
  }
}

export function prepareDiagramReading(next, previous, state, lang = 'zh') {
  const isEn = lang === 'en' && ['engObjCh04Title', 'engObjCh05Title', 'engObjCh06Title', 'engObjCh07Title', 'engObjCh08Title', 'engObjCh09Title', 'engObjCh10Title', 'engObjCh19Title', 'engObjCh20Title', 'engObjCh21Title'].includes(next.getAttribute('aria-labelledby'));
  const reading = readingState(state);
  const oldReader = previous?.querySelector('.eng-diagram-reader');
  if (oldReader) reading.open = oldReader.open;
  const viewport = next.querySelector('.eng-obj-viewport');
  const svgs = diagrams(next);
  if (!viewport || !svgs.length) return;
  const doc = next.ownerDocument;
  ensureSharedSvgDefs(svgs, doc);
  viewport.tabIndex = 0;
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-label', isEn ? 'Interactive diagram; scroll or use arrow keys to pan when zoomed in' : '互動圖面；放大後可捲動或用方向鍵平移');
  viewport.dataset.view = reading.view;
  viewport.dataset.scale = String(reading.scale);
  if (reading.view !== 'fit') {
    // 在 DOM 同步前維持尺寸，避免連續調整數值時捲動位置被瀏覽器夾回原點。
    svgs.forEach(svg => sizeSvg(svg, reading.scale));
  }
  const toolbar = doc.createElement('div');
  toolbar.className = 'eng-diagram-toolbar';
  toolbar.setAttribute('role', 'group');
  toolbar.setAttribute('aria-label', isEn ? 'Diagram reading controls' : '圖例閱讀方式');
  for (const [action, label] of [['fit', isEn ? 'Fit diagram' : '看全圖'], ['read', isEn ? 'Reading size' : '閱讀比例'], ['out', '−'], ['in', '＋'], ['text', isEn ? 'Diagram text ↓' : '圖中文字 ↓']]) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.dataset.diagramAction = action;
    button.textContent = label;
    if (action === 'out' || action === 'in') button.setAttribute('aria-label', isEn ? (action === 'out' ? 'Zoom out' : 'Zoom in') : (action === 'out' ? '縮小圖面' : '放大圖面'));
    toolbar.append(button);
  }
  const scale = doc.createElement('output');
  scale.className = 'eng-diagram-scale';
  scale.setAttribute('aria-label', isEn ? 'Scale relative to the original diagram' : '相對原始圖面縮放比例');
  toolbar.append(scale);
  const help = doc.createElement('p');
  help.className = 'eng-diagram-help';
  help.textContent = isEn ? 'Start with the full diagram, then use Reading size for details. Scroll or use arrow keys to pan. Diagram text is listed below.' : '先看全圖，再用閱讀比例查看細節；放大後可捲動或用方向鍵平移。圖中文字另列於卡片下方。';
  viewport.before(toolbar, help);

  const reader = doc.createElement('details');
  reader.className = 'eng-diagram-reader';
  reader.open = reading.open;
  const summary = doc.createElement('summary');
  summary.textContent = isEn ? 'Diagram text and current values' : '圖中文字與即時數值';
  reader.append(summary);
  const note = doc.createElement('p');
  note.textContent = isEn ? 'Listed in diagram order. Select a label to locate it in the diagram; direct interaction remains available.' : '依目前圖面順序列出；選取文字可在圖中定位。圖形操作仍可直接使用。';
  reader.append(note);
  svgs.forEach((svg, diagramIndex) => {
    const group = doc.createElement('section');
    group.className = 'eng-diagram-text-group';
    const title = doc.createElement('h4');
    title.textContent = svgs.length > 1 ? `${isEn ? 'Diagram' : '圖'} ${diagramIndex + 1}・${svg.getAttribute('aria-label') || (isEn ? 'Interactive schematic' : '互動示意')}` : (isEn ? 'Current diagram' : '目前圖面');
    group.append(title);
    const list = doc.createElement('ol');
    list.className = 'eng-diagram-text-list';
    [...svg.querySelectorAll('text')].forEach((text, textIndex) => {
      const item = doc.createElement('li');
      const button = doc.createElement('button');
      button.type = 'button';
      button.dataset.diagramIndex = String(diagramIndex);
      button.dataset.textIndex = String(textIndex);
      button.textContent = textOf(text);
      button.title = isEn ? 'Locate this text in the diagram' : '在圖中定位這段文字';
      item.append(button);
      list.append(item);
    });
    group.append(list);
    reader.append(group);
  });
  next.append(reader);
}

function sizeSvg(svg, scale) {
  svg.style.width = `${svg.viewBox.baseVal.width * scale}px`;
  svg.style.height = `${svg.viewBox.baseVal.height * scale}px`;
}

function fitScale(viewport, svgs) {
  return viewport.clientWidth / Math.max(...svgs.map(svg => svg.viewBox.baseVal.width));
}

function readScale(svgs) {
  let minimum = Infinity;
  for (const svg of svgs) {
    const outer = svg.getScreenCTM();
    const outerScale = outer ? Math.hypot(outer.a, outer.b) : 1;
    for (const text of svg.querySelectorAll('text')) {
      const matrix = text.getScreenCTM();
      const localScale = matrix && outerScale ? Math.hypot(matrix.a, matrix.b) / outerScale : 1;
      const size = parseFloat(getComputedStyle(text).fontSize) * localScale;
      if (size > 0) minimum = Math.min(minimum, size);
    }
  }
  // 閱讀比例以畫面最小 16px 為目標；字級設定變大時同步提高。
  const target = Math.max(16, parseFloat(getComputedStyle(document.documentElement).fontSize));
  return Number.isFinite(minimum) ? Math.max(1, target / minimum) : 1;
}

function updateView(container, state, view, requestedScale, center = true, refresh = false) {
  const reading = readingState(state);
  const viewport = container.querySelector('.eng-obj-viewport');
  const svgs = diagrams(container);
  if (!viewport || !svgs.length || !viewport.clientWidth) return;
  const fit = fitScale(viewport, svgs);
  const oldScale = reading.scale || fit;
  const x = (viewport.scrollLeft + viewport.clientWidth / 2) / oldScale;
  const y = (viewport.scrollTop + viewport.clientHeight / 2) / oldScale;
  const read = readScale(svgs);
  const maximum = Math.max(4, read);
  const scale = view === 'fit' ? fit : view === 'read' ? Math.max(fit, read) : Math.max(fit, Math.min(maximum, requestedScale));
  const changed = reading.view !== view || Math.abs(reading.scale - scale) > .00001;
  const originalScroll = {left: viewport.scrollLeft, top: viewport.scrollTop};
  reading.view = view;
  reading.scale = scale;
  viewport.dataset.view = view;
  viewport.dataset.scale = String(scale);
  svgs.forEach(svg => sizeSvg(svg, scale));
  const output = container.querySelector('.eng-diagram-scale');
  output.textContent = `${Math.round(scale * 100)}%`;
  container.querySelector('[data-diagram-action="out"]').disabled = scale <= fit + .001;
  container.querySelector('[data-diagram-action="in"]').disabled = scale >= maximum - .001;
  for (const action of ['fit', 'read']) container.querySelector(`[data-diagram-action="${action}"]`).setAttribute('aria-pressed', String(view === action));
  const position = view === 'fit' || !center ? {left: 0, top: 0} : changed ? {left: x * scale - viewport.clientWidth / 2, top: y * scale - viewport.clientHeight / 2} : originalScroll;
  viewport.scrollTo({...position, behavior: 'instant'});
  if (reading.frame && (!refresh || changed)) {
    cancelAnimationFrame(reading.frame);
    reading.frame = null;
  }
  // SVG 尺寸在下一個布局週期生效；此時再定位，避免新範圍尚未建立就被夾回左緣。
  if (changed && center) afterDiagramLayout(container, reading, () => viewport.scrollTo({...position, behavior: 'instant'}));
}

export function bindDiagramReading(container, state, bind) {
  const reading = readingState(state);
  const viewport = container.querySelector('.eng-obj-viewport');
  if (!viewport) return;
  updateView(container, state, reading.view, reading.scale, true, true);
  for (const action of ['fit', 'read', 'out', 'in', 'text']) {
    bind(container.querySelector(`[data-diagram-action="${action}"]`), 'click', () => {
      if (action === 'text') {
        const reader = container.querySelector('.eng-diagram-reader');
        reader.open = reading.open = true;
        reader.querySelector('summary').focus();
        reader.scrollIntoView({block: 'start', behavior: 'instant'});
      } else updateView(container, state, action === 'in' || action === 'out' ? 'custom' : action, reading.scale * (action === 'out' ? .8 : 1.25));
    });
  }
  bind(viewport, 'keydown', event => {
    if (event.target !== viewport) return;
    if (reading.view === 'fit' && viewport.scrollWidth <= viewport.clientWidth + 1 && viewport.scrollHeight <= viewport.clientHeight + 1) return;
    const offsets = {ArrowLeft: [-60, 0], ArrowRight: [60, 0], ArrowUp: [0, -60], ArrowDown: [0, 60], PageUp: [0, -viewport.clientHeight * .8], PageDown: [0, viewport.clientHeight * .8]};
    if (!offsets[event.key] && !['Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    if (offsets[event.key]) viewport.scrollBy({left: offsets[event.key][0], top: offsets[event.key][1], behavior: 'instant'});
    else viewport.scrollTo({left: event.key === 'Home' ? 0 : viewport.scrollWidth, top: event.key === 'Home' ? 0 : viewport.scrollHeight, behavior: 'instant'});
  });
  for (const button of container.querySelectorAll('[data-diagram-index]')) {
    bind(button, 'click', () => {
      updateView(container, state, 'read', reading.scale, false);
      afterDiagramLayout(container, reading, () => {
        const text = diagrams(container)[Number(button.dataset.diagramIndex)]?.querySelectorAll('text')[Number(button.dataset.textIndex)];
        if (!text) return;
        const box = text.getBoundingClientRect(), frame = viewport.getBoundingClientRect();
        viewport.scrollBy({left: box.left - frame.left + box.width / 2 - viewport.clientWidth / 2, top: box.top - frame.top + box.height / 2 - viewport.clientHeight / 2, behavior: 'instant'});
        viewport.focus({preventScroll: true});
        viewport.scrollIntoView({block: 'center', behavior: 'instant'});
      });
    });
  }
  if (reading.observed !== viewport) {
    reading.observer?.disconnect();
    reading.width = viewport.clientWidth;
    reading.observer = new ResizeObserver(() => {
      if (!container.isConnected || reading.width === viewport.clientWidth) return;
      reading.width = viewport.clientWidth;
      updateView(container, state, reading.view, reading.scale, true, true);
    });
    reading.observer.observe(viewport);
    reading.observed = viewport;
  }
}

export function disposeDiagramReading(state) {
  state.reading?.observer?.disconnect();
  if (state.reading?.frame) cancelAnimationFrame(state.reading.frame);
}

const SHAPE_FILL_MAP = {
  '#000000': '#f8fafc',
  '#020617': '#f8fafc',
  '#090d16': '#f8fafc',
  '#09131b': '#f8fafc',
  '#0f172a': '#f8fafc',
  '#111827': '#f8fafc',
  'rgba(15, 23, 42, 0.75)': 'rgba(241, 245, 249, 0.92)',
  '#131e2b': '#f1f5f9',
  '#0b1329': '#f1f5f9',
  '#1e293b': '#e2e8f0',
  '#334155': '#d5dde7',
  '#475569': '#cbd5e1',
  '#064e3b': '#d1fae5',
  '#450a0a': '#fee2e2',
  '#1e1b4b': '#e0e7ff'
};

const STROKE_FOR_SHAPES = new Set(['#09131b', '#1e293b', '#334155', '#475569', '#000000', '#020617', '#090d16', '#0f172a', '#111827']);

const TEXT_FILL_MAP = {
  '#ffffff': '#0f172a',
  '#fff': '#0f172a',
  '#f8fafc': '#0f172a',
  '#e2e8f0': '#0f172a',
  '#cbd5e1': '#334155',
  '#94a3b8': '#475569',
  '#64748b': '#475569',
  '#38bdf8': '#075985',
  '#e0f2fe': '#0c4a6e',
  '#f59e0b': '#92400e',
  '#fbbf24': '#92400e',
  '#10b981': '#065f46',
  '#34d399': '#065f46',
  '#a7f3d0': '#065f46',
  '#ef4444': '#991b1b',
  '#f87171': '#991b1b',
  '#fca5a5': '#991b1b',
  '#ec4899': '#9d174d',
  '#c084fc': '#6b21a8',
  '#a78bfa': '#5b21b6',
  '#71ece3': '#115e59',
  '#14b8a6': '#115e59'
};

const DARK_SATURATED_FILLS = new Set([
  '#0284c7', '#0369a1', '#047857', '#0f766e', '#64748b',
  '#7c3aed', '#8b5cf6', '#b45309', '#b91c1c', '#dc2626', '#e11d48'
]);

export function applyCleanroomPalette(svg) {
  const elements = svg.querySelectorAll('*');
  for (const el of elements) {
    const tag = el.tagName.toLowerCase();
    if (['rect', 'path', 'circle', 'ellipse', 'polygon'].includes(tag)) {
      const fill = (el.getAttribute('fill') || '').trim();
      const fillLower = fill.toLowerCase();
      if (fillLower === '#0284c7' || fillLower === '#8b5cf6') {
        const next = el.nextElementSibling;
        const nextFill = next?.getAttribute('fill')?.toLowerCase();
        if (next && ['text', 'tspan'].includes(next.tagName.toLowerCase()) && ['#ffffff', '#fff', '#f8fafc'].includes(nextFill)) {
          el.setAttribute('fill', fillLower === '#0284c7' ? '#0369a1' : '#7c3aed');
        }
      } else if (SHAPE_FILL_MAP[fillLower] || SHAPE_FILL_MAP[fill]) {
        const targetFill = SHAPE_FILL_MAP[fillLower] || SHAPE_FILL_MAP[fill];
        el.setAttribute('fill', targetFill);
        if (STROKE_FOR_SHAPES.has(fillLower) && !el.getAttribute('stroke')) {
          el.setAttribute('stroke', '#64748b');
          el.setAttribute('stroke-width', '1px');
          el.setAttribute('vector-effect', 'non-scaling-stroke');
        }
      }
    } else if (tag === 'text' || tag === 'tspan') {
      const ink = el.getAttribute('data-ink');
      if (ink === 'light') {
        el.setAttribute('fill', '#ffffff');
      } else if (ink === 'halo') {
        el.setAttribute('paint-order', 'stroke');
        el.setAttribute('stroke', '#f8fafc');
        el.setAttribute('stroke-width', '3px');
        el.setAttribute('stroke-linejoin', 'round');
      } else {
        const prev = el.previousElementSibling;
        const prevFill = prev?.getAttribute('fill')?.toLowerCase();
        const prevOpacity = prev?.getAttribute('opacity');
        const isSolidDarkShape = prev && prevFill && DARK_SATURATED_FILLS.has(prevFill) && (!prevOpacity || Number(prevOpacity) >= 0.9);
        const textFill = (el.getAttribute('fill') || '').toLowerCase();
        if (isSolidDarkShape && ['#ffffff', '#fff', '#f8fafc'].includes(textFill)) {
          el.setAttribute('fill', '#ffffff');
        } else if (TEXT_FILL_MAP[textFill]) {
          el.setAttribute('fill', TEXT_FILL_MAP[textFill]);
        }
      }
    } else if (tag === 'foreignobject') {
      const div = el.querySelector('div');
      if (div) {
        div.style.color = '#334155';
      }
    } else if (tag === 'stop') {
      const stopColor = (el.getAttribute('stop-color') || '').toLowerCase();
      if (SHAPE_FILL_MAP[stopColor]) {
        el.setAttribute('stop-color', SHAPE_FILL_MAP[stopColor]);
      }
    }
  }

  const doc = svg.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (doc) {
    let defs = svg.querySelector('defs');
    if (!defs) {
      defs = doc.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.insertBefore(defs, svg.firstChild);
    }
    const style = doc.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = `
      text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
      foreignObject > div { color: #334155 !important; }
    `;
    defs.appendChild(style);
  }
}

export function portableDiagram(svg) {
  const clone = svg.cloneNode(true);
  applyCleanroomPalette(clone);
  // 只移除本檢視器加入的顯示尺寸，保留原 viewBox、defs、事件目標與圖面內容。
  clone.style.removeProperty('width');
  clone.style.removeProperty('height');
  if (!clone.getAttribute('style')) clone.removeAttribute('style');
  return clone;
}

if (typeof window !== 'undefined') {
  window.portableDiagram = portableDiagram;
}
