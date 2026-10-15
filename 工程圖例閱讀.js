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

export function prepareDiagramReading(next, previous, state) {
  const reading = readingState(state);
  const oldReader = previous?.querySelector('.eng-diagram-reader');
  if (oldReader) reading.open = oldReader.open;
  const viewport = next.querySelector('.eng-obj-viewport');
  const svgs = diagrams(next);
  if (!viewport || !svgs.length) return;
  const doc = next.ownerDocument;
  viewport.tabIndex = 0;
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-label', '互動圖面；放大後可捲動或用方向鍵平移');
  viewport.dataset.view = reading.view;
  viewport.dataset.scale = String(reading.scale);
  if (reading.view !== 'fit') {
    // 在 DOM 同步前維持尺寸，避免連續調整數值時捲動位置被瀏覽器夾回原點。
    svgs.forEach(svg => sizeSvg(svg, reading.scale));
  }
  const toolbar = doc.createElement('div');
  toolbar.className = 'eng-diagram-toolbar';
  toolbar.setAttribute('role', 'group');
  toolbar.setAttribute('aria-label', '圖例閱讀方式');
  for (const [action, label] of [['fit', '看全圖'], ['read', '閱讀比例'], ['out', '−'], ['in', '＋'], ['text', '圖中文字 ↓']]) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.dataset.diagramAction = action;
    button.textContent = label;
    if (action === 'out' || action === 'in') button.setAttribute('aria-label', action === 'out' ? '縮小圖面' : '放大圖面');
    toolbar.append(button);
  }
  const scale = doc.createElement('output');
  scale.className = 'eng-diagram-scale';
  scale.setAttribute('aria-label', '相對原始圖面縮放比例');
  toolbar.append(scale);
  const help = doc.createElement('p');
  help.className = 'eng-diagram-help';
  help.textContent = '先看全圖，再用閱讀比例查看細節；放大後可捲動或用方向鍵平移。圖中文字另列於卡片下方。';
  viewport.before(toolbar, help);

  const reader = doc.createElement('details');
  reader.className = 'eng-diagram-reader';
  reader.open = reading.open;
  const summary = doc.createElement('summary');
  summary.textContent = '圖中文字與即時數值';
  reader.append(summary);
  const note = doc.createElement('p');
  note.textContent = '依目前圖面順序列出；選取文字可在圖中定位。圖形操作仍可直接使用。';
  reader.append(note);
  svgs.forEach((svg, diagramIndex) => {
    const group = doc.createElement('section');
    group.className = 'eng-diagram-text-group';
    const title = doc.createElement('h4');
    title.textContent = svgs.length > 1 ? `圖 ${diagramIndex + 1}・${svg.getAttribute('aria-label') || '互動示意'}` : '目前圖面';
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
      button.title = '在圖中定位這段文字';
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

export function portableDiagram(svg) {
  const clone = svg.cloneNode(true);
  // 只移除本檢視器加入的顯示尺寸，保留原 viewBox、defs、事件目標與圖面內容。
  clone.style.removeProperty('width');
  clone.style.removeProperty('height');
  if (!clone.getAttribute('style')) clone.removeAttribute('style');
  return clone;
}
