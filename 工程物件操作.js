// 共用工程物件的 DOM 更新、事件綁定與全螢幕生命週期。
const states = new WeakMap();
const listeners = new WeakMap();
import { prepareDiagramReading, bindDiagramReading, disposeDiagramReading, portableDiagram } from './工程圖例閱讀.js';
export function bindEngineeringEvent(element, type, handler) {
  let entries = listeners.get(element);
  if (!entries) { entries = new Map(); listeners.set(element, entries); }
  if (entries.has(type)) element.removeEventListener?.(type, entries.get(type));
  element.addEventListener(type, handler);
  entries.set(type, handler);
}

function stateFor(container) {
  let state = states.get(container);
  if (!state) {
    state = { dialog: null, placeholder: null, cleanup: null, labels: null, status: '', fallback: '' };
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
  state.scroll = {x:window.scrollX, y:window.scrollY};
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
      window.scrollTo({left:state.scroll.x, top:state.scroll.y, behavior:'instant'});
      button?.focus({preventScroll:true});
    }
  };
  dialog.addEventListener('close', state.restore, {once:true});
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeFullscreen(container);
  });
  doc.body.style.overflow = 'hidden';
  dialog.showModal();
  const button = container.querySelector('[data-action="fullscreen"]');
  button.setAttribute('aria-expanded', 'true');
  button.querySelector('.hud-btn-text').textContent = state.labels.btn_fullscreen_exit;
  button.focus({preventScroll:true});
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
    field.focus({preventScroll:true});
    field.select();
  }
  feedback.hidden = false;
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
      button.setAttribute('aria-haspopup','dialog');
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
  feedback.append(status,field);
  next.querySelector('.eng-obj-header').append(feedback);
  if (state.dialog?.open) next.classList.add('is-fullscreen');
  const previous = container.querySelector('.eng-obj-card');
  prepareDiagramReading(next, previous, state);
  if (previous) syncNode(previous,next);
  else container.replaceChildren(next);
  // 原始碼欄位是 DOM property，不依賴 HTML value 屬性。
  container.querySelector('.eng-obj-copy-feedback textarea').value = state.fallback;
  bindEngineeringEvent(container.querySelector('[data-action="fullscreen"]'),'click',() => openFullscreen(container));
  bindEngineeringEvent(container.querySelector('[data-action="copy-svg"]'),'click',() => copySvg(container));
  bindDiagramReading(container, state, bindEngineeringEvent);
}

export function disposeEngineeringObject(container) {
  const state = states.get(container);
  if (!state) return;
  state.cleanup?.();
  disposeDiagramReading(state);
  closeFullscreen(container,false);
  states.delete(container);
}
