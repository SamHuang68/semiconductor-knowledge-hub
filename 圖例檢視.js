let dialog;
let opener;
let zoom = 1;
let fit = 1;
let width = 720;
let height = 400;

function update(next, center = true) {
  const viewport = dialog.querySelector('.diagram-viewport');
  const x = (viewport.scrollLeft + viewport.clientWidth / 2) / zoom;
  const y = (viewport.scrollTop + viewport.clientHeight / 2) / zoom;
  zoom = Math.max(fit, Math.min(3, next));
  const stage = dialog.querySelector('.diagram-stage');
  stage.style.width = `${width * zoom}px`;
  stage.style.height = `${height * zoom}px`;
  dialog.querySelector('.diagram-canvas').style.transform = `scale(${zoom})`;
  dialog.querySelector('#diagramZoom').textContent = `${Math.round(zoom * 100)}%`;
  dialog.querySelector('#diagramMinus').disabled = zoom <= fit + .001;
  dialog.querySelector('#diagramPlus').disabled = zoom >= 3;
  if (center) {
    viewport.scrollLeft = x * zoom - viewport.clientWidth / 2;
    viewport.scrollTop = y * zoom - viewport.clientHeight / 2;
  } else { viewport.scrollLeft = 0; viewport.scrollTop = 0; }
}

function measureFit() {
  const viewport = dialog.querySelector('.diagram-viewport');
  fit = Math.min(3, (viewport.clientWidth - 24) / width, (viewport.clientHeight - 24) / height);
}
function fitDiagram() { measureFit(); update(fit, false); }
function resizeDiagram() {
  const content = dialog.querySelector('.diagram-canvas').firstElementChild;
  if (content) height = Math.ceil(content.getBoundingClientRect().height / zoom);
  measureFit();
  update(Math.max(zoom, fit), false);
}

function ensureDialog() {
  if (dialog) return;
  dialog = document.createElement('dialog');
  dialog.className = 'diagram-dialog';
  dialog.setAttribute('aria-labelledby', 'diagramTitle');
  dialog.setAttribute('aria-describedby', 'diagramHelp');
  dialog.innerHTML = `<div class="diagram-shell"><header class="diagram-header"><div><p>圖例檢視</p><h2 id="diagramTitle"></h2></div><button type="button" id="diagramClose" autofocus>關閉圖例 ×</button></header><div class="diagram-controls" role="group" aria-label="圖例縮放"><button type="button" id="diagramMinus" aria-label="縮小圖例">−</button><button type="button" id="diagramFit">符合視窗</button><button type="button" id="diagramPlus" aria-label="放大圖例">＋</button><output id="diagramZoom" aria-live="polite" aria-label="目前縮放比例"></output></div><p id="diagramHelp">放大後可捲動查看細節；鍵盤可聚焦圖面後使用方向鍵。按 Esc 關閉。</p><div class="diagram-viewport" tabindex="0" role="region" aria-label="可捲動的放大圖例"><div class="diagram-stage"><div class="diagram-canvas"></div></div></div><details class="diagram-notes"><summary>查看這張圖的解說與閱讀限制</summary><p id="diagramExplanation"></p><p id="diagramBoundary"></p></details></div>`;
  document.body.append(dialog);
  dialog.querySelector('#diagramClose').addEventListener('click', () => dialog.close());
  dialog.querySelector('#diagramPlus').addEventListener('click', () => update(zoom + .25));
  dialog.querySelector('#diagramMinus').addEventListener('click', () => update(zoom - .25));
  dialog.querySelector('#diagramFit').addEventListener('click', fitDiagram);
  dialog.querySelector('.diagram-viewport').addEventListener('keydown', event => {
    const viewport = event.currentTarget;
    const steps = { ArrowLeft: [-40, 0], ArrowRight: [40, 0], ArrowUp: [0, -40], ArrowDown: [0, 40], PageUp: [0, -viewport.clientHeight * .8], PageDown: [0, viewport.clientHeight * .8] };
    if (steps[event.key]) {
      event.preventDefault();
      viewport.scrollBy({ left: steps[event.key][0], top: steps[event.key][1], behavior: 'instant' });
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      viewport.scrollTo({ left: event.key === 'Home' ? 0 : viewport.scrollWidth, top: event.key === 'Home' ? 0 : viewport.scrollHeight, behavior: 'instant' });
    }
  });
  // 新視窗自行處理鍵盤，避免原頁搜尋／字級等快捷鍵在背景觸發。
  dialog.addEventListener('keydown', event => {
    event.stopPropagation();
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not(:disabled), summary, [tabindex="0"]')].filter(element => element.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  dialog.addEventListener('close', () => {
    if (dialog.open) return;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    else (document.querySelector('#detailTitle') || document.querySelector('#mainContentArea'))?.focus({ preventScroll: true });
    dialog.querySelector('.diagram-canvas').replaceChildren();
  });
  dialog.querySelector('.diagram-notes').addEventListener('toggle', () => { if (dialog.open) resizeDiagram(); });
  window.addEventListener('resize', () => { if (dialog.open) resizeDiagram(); });
  window.addEventListener('hashchange', () => { if (dialog.open) dialog.close(); });
}

export function bindDiagramViewer(container, scenario, node) {
  const source = container.querySelector('.detail-visual');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'diagram-launch';
  button.textContent = '放大檢視圖例 ↗';
  button.setAttribute('aria-haspopup', 'dialog');
  source.append(button);
  button.addEventListener('click', () => {
    ensureDialog();
    opener = button;
    width = ['dispatch', 'quality'].includes(scenario.id) ? 480 : 720;
    const clone = source.cloneNode(true);
    clone.querySelector('.diagram-launch').remove();
    // 僅複用本站生成的圖例；移除識別碼，避免與原頁狀態欄位重複。
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    clone.style.width = `${width}px`;
    clone.style.maxWidth = 'none';
    const canvas = dialog.querySelector('.diagram-canvas');
    canvas.style.width = `${width}px`;
    canvas.style.transform = 'none';
    canvas.replaceChildren(clone);
    dialog.querySelector('#diagramTitle').textContent = `${scenario.label}・${node.title}`;
    dialog.querySelector('#diagramExplanation').textContent = node.detail;
    dialog.querySelector('#diagramBoundary').textContent = scenario.boundary;
    dialog.querySelector('.diagram-notes').open = false;
    dialog.showModal();
    // 圖形採未縮放的原始版面高度；前一次檢視的 transform 不影響新圖量測。
    height = Math.ceil(clone.getBoundingClientRect().height);
    zoom = 1;
    resizeDiagram();
    dialog.querySelector('#diagramClose').focus();
  });
}
