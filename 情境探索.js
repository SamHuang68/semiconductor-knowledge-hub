import { bindDiagramViewer } from './圖例檢視.js';
import { SCENARIOS, getScenario } from './data/情境路徑.js';
import { CHAPTERS_DATA } from './data/chapters-data.js';
import { waferArt, crossSection, packageArt, journeyArt, dispatchArt, renderComparison, bindComparison, comparisonIsOpen } from './情境圖例.js';
import { signalPreview, renderSignalLab, bindSignalLab, signalIsOpen } from './訊號判讀.js';
import { hasPractice, renderPractice, bindPractice } from './情境練習.js';

const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const route = (scenario, node) => `#explore/${scenario}/${node}`;
let pendingView = null;

function reveal(container, view) {
  const target = container.querySelector(view === 'signal' ? '#signalLab' : view === 'map' ? '#workbenchHeading' : view === 'practice' ? '#practiceTitle' : view === 'compare' ? '#diagramComparison' : '#nodeDetail');
  if (!target) return;
  const header = document.querySelector('.app-header');
  const fixedHeader = ['fixed', 'sticky'].includes(getComputedStyle(header).position) ? header.getBoundingClientRect().height : 0;
  const toolbar = container.querySelector('.explorer-toolbar');
  const offset = Math.max(fixedHeader, parseFloat(getComputedStyle(toolbar).top) || 0) + toolbar.getBoundingClientRect().height + 18;
  const focusTarget = view === 'signal' ? container.querySelector('#signalTitle') : view === 'detail' ? container.querySelector('#detailTitle') : view === 'compare' ? container.querySelector('#comparisonTitle') : target;
  let top = target.getBoundingClientRect().top;
  // 視窗足夠時一起呈現圖與解說；短視窗優先保留焦點標題及閱讀空間。
  if (view === 'detail' && offset + focusTarget.getBoundingClientRect().bottom - top > innerHeight - 64) {
    top = focusTarget.getBoundingClientRect().top;
  }
  window.scrollTo({ top: window.scrollY + top - offset, behavior: 'instant' });
  focusTarget.focus({ preventScroll: true });
}

function bindNavigation(container, s, n) {
  container.querySelector('#scenarioSelect').addEventListener('change', e => {
    const selected = getScenario(e.target.value);
    pendingView = 'map';
    location.hash = route(selected.id, selected.nodes[0].id);
  });
  container.onclick = e => {
    const jump = e.target.closest('[data-explorer-view]');
    if (jump) { reveal(container, jump.dataset.explorerView); return; }
    const link = e.target.closest('a[href^="#explore/"]');
    if (!link || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const view = link.matches('.scenario-choice, .hero-links a') ? 'map' : link.closest('.visual-comparison') ? 'compare' : 'detail';
    if (link.getAttribute('href') === location.hash) { e.preventDefault(); reveal(container, view); }
    else pendingView = view;
  };
  container.querySelector('#shareStep').addEventListener('click', async () => {
    const url = new URL(location.href);
    url.hash = route(s.id, n.id);
    const status = container.querySelector('#shareStatus');
    const fallback = container.querySelector('#manualShare');
    try {
      await navigator.clipboard.writeText(url.href);
      status.textContent = '已複製目前步驟的連結。';
      fallback.hidden = true;
    } catch {
      status.textContent = '瀏覽器未允許複製，請選取下方連結手動複製。';
      fallback.hidden = false;
      const input = fallback.querySelector('input');
      input.value = url.href;
      input.focus();
      input.select();
    }
  });
}

function flowMap(s, active) {
  const item = (n, index, extra = '') => `<a class="flow-node ${active.id === n.id ? 'is-current' : ''} ${extra}" href="${route(s.id, n.id)}" ${active.id === n.id ? 'aria-current="step"' : ''}><span class="node-meta">${String(index + 1).padStart(2, '0')} · ${esc(n.tag)}</span><strong>${esc(n.title)}</strong><span class="node-inspect">查看這一站 <span aria-hidden="true">↗</span></span></a>`;
  if (s.kind === 'branch') return `<div class="branch-map" aria-label="品質異常分支圖">
    ${item(s.nodes[0], 0, 'branch-start')}<div class="branch-arrow branch-start-arrow" aria-hidden="true">↓</div>
    ${item(s.nodes[1], 1, 'branch-decision')}<div class="branch-split"><span>未觸發 ↙</span><span>↘ 已觸發</span></div>
    ${item(s.nodes[2], 2, 'branch-normal')}${item(s.nodes[3], 3, 'branch-hold')}
    <p class="branch-note">正常路徑<br>回到量測與持續監控</p><div class="branch-arrow branch-investigate-arrow" aria-hidden="true">↓</div>
    ${item(s.nodes[4], 4, 'branch-cause')}<div class="branch-arrow branch-release-arrow" aria-hidden="true">↓</div>${item(s.nodes[5], 5, 'branch-release')}
    <p class="branch-return">未符合 → 回到分析　／　符合且核准 → 持續監控</p></div>`;
  return `<div class="flow-map ${s.kind === 'compare' ? 'comparison-map' : ''}" aria-label="${esc(s.label)}">${s.nodes.map((n, i) => `${item(n, i)}${i < s.nodes.length - 1 && s.kind !== 'compare' ? '<span class="flow-arrow" aria-hidden="true">→</span>' : ''}`).join('')}</div>${s.kind === 'cycle' ? '<div class="cycle-return">↶ 量測合格後，依製程路徑展開下一層；不合格則進入異常處理。</div>' : ''}`;
}

export function renderExplorer(container, hash) {
  const [, scenarioId, nodeId] = hash.split('/');
  const s = getScenario(scenarioId);
  const n = s.nodes.find(n => n.id === nodeId) || s.nodes[0];
  const index = s.nodes.indexOf(n);
  const source = CHAPTERS_DATA.find(c => c.id === n.chapter);
  const view = pendingView || (s.nodes.some(node => node.id === nodeId) ? 'detail' : scenarioId ? 'map' : null);
  pendingView = null;
  document.body.classList.add('is-exploring');
  const next = n.next.length ? n.next : s.kind === 'compare' ? [] : index < s.nodes.length - 1 ? [{ label: '下一站', to: s.nodes[index + 1].id }] : [{ label: s.kind === 'cycle' ? '再看一輪' : '回到起點', to: s.nodes[0].id }];
  const art = s.id === 'pattern' ? crossSection(index) : s.id === 'packaging' ? packageArt(index) : s.id === 'quality' ? signalPreview() : s.id === 'dispatch' ? dispatchArt(s, index) : journeyArt(index);
  container.innerHTML = `<div class="explorer">
    <header class="explorer-hero"><div class="hero-copy"><p class="explorer-kicker">半導體製造概論 · 互動學習地圖</p><h1>先看懂流程<br>再深入每一站</h1><p>跟著一片晶圓，串起製程、品質與封裝。<br class="desktop-break">選一個問題，從圖中找到答案。</p><div class="hero-links"><a href="#explore/journey/wafer">開始晶圓旅程 <span aria-hidden="true">↗</span></a><a href="#ch00">閱讀完整教材 →</a></div><div class="hero-stats"><span><b>25</b> 章教材</span><span><b>5</b> 種探索情境</span><span><b>12</b> 個製程模組</span></div></div><div class="hero-wafer">${waferArt()}<span>從晶圓，到每一顆晶粒</span></div></header>
    <section class="scenario-section" aria-labelledby="scenarioHeading"><div class="section-heading"><div><p class="explorer-kicker">從你的問題出發</p><h2 id="scenarioHeading">今天想弄懂什麼？</h2></div><span class="section-index">01 / 選情境</span></div><nav class="scenario-nav" aria-label="探索情境">${SCENARIOS.map((item, i) => `<a href="${route(item.id, item.nodes[0].id)}" class="scenario-choice ${item.id === s.id ? 'is-selected' : ''}" ${item.id === s.id ? 'aria-current="page"' : ''}><span class="scenario-number">0${i + 1} <span aria-hidden="true">${item.icon}</span></span><strong>${esc(item.title)}</strong><span>${esc(item.label)}</span></a>`).join('')}</nav></section>
    <nav class="explorer-toolbar" aria-label="情境操作"><label for="scenarioSelect">切換情境<select id="scenarioSelect">${SCENARIOS.map(item => `<option value="${item.id}" ${item.id === s.id ? 'selected' : ''}>${esc(item.title)}</option>`).join('')}</select></label><div class="explorer-tools"><button type="button" data-explorer-view="map">看全圖</button><button type="button" data-explorer-view="detail">看解說</button>${hasPractice(s.id) ? '<button type="button" data-explorer-view="practice">試著判斷</button>' : ''}<button type="button" id="shareStep">複製步驟連結</button></div>
    <p id="shareStatus" class="share-status" role="status" aria-live="polite"></p><div id="manualShare" class="manual-share" hidden><label for="stepUrl">目前步驟的連結</label><input id="stepUrl" type="url" readonly></div></nav>
    <section class="scenario-workbench" aria-labelledby="workbenchHeading"><div class="section-heading"><div><span class="scenario-type">${esc(s.label)}</span><h2 id="workbenchHeading" tabindex="-1">${esc(s.question)}</h2><p>${esc(s.intro)}</p></div><span class="section-index">02 / 看關係</span></div>
    <div class="map-legend"><span><i class="legend-active"></i>目前查看</span><span><i></i>可點選節點</span><span>${s.kind === 'compare' ? '並列結構，沒有先後順序' : s.kind === 'branch' ? '箭頭表示判斷後的處理方向' : '箭頭表示此教學路徑的順序'}</span></div>${flowMap(s, n)}
    <div class="node-detail" id="nodeDetail"><div class="detail-visual"><span class="visual-label">${s.id === 'pattern' ? '材料剖面 · 隨步驟變化' : s.id === 'packaging' ? '封裝結構 · 切換比較' : s.id === 'quality' ? '製程訊號 · 所選教學示例' : s.id === 'dispatch' ? '系統角色 · 本節焦點' : '晶圓旅程 · 階段示意'}</span>${art}<div class="material-legend">${s.id === 'pattern' ? '<span>■ 矽基板</span><span>■ 目標薄膜</span><span>■ 光阻</span>' : s.id === 'dispatch' ? '<span>虛線：資訊核對與回寫</span><span>實線：晶圓盒搬運</span>' : '<span>示意未按比例，非特定產品結構</span>'}</div></div><div class="detail-copy"><p class="explorer-kicker">${esc(n.tag)} · 第 ${index + 1} 個${s.kind === 'compare' ? '選項' : '節點'}</p><h3 id="detailTitle" tabindex="-1">${esc(n.title)}</h3>${['pattern', 'packaging'].includes(s.id) ? `<button type="button" class="compare-toggle" aria-controls="diagramComparison" aria-expanded="${comparisonIsOpen(s.id)}">${s.id === 'pattern' ? '前後剖面對照' : '三種結構並排比較'} <span aria-hidden="true">↗</span></button>` : ''}${s.id === 'quality' ? `<button type="button" class="signal-toggle" aria-controls="signalLab" aria-expanded="${signalIsOpen()}">切換訊號・逐點判讀 <span aria-hidden="true">↗</span></button>` : ''}<p>${esc(n.detail)}</p><dl><div><dt>看什麼</dt><dd>${esc(n.look)}</dd></div><div><dt>帶走什麼</dt><dd>${esc(n.result)}</dd></div></dl><a class="source-chapter" href="#${n.chapter}?from=${s.id}%2F${n.id}">教材依據：${esc(source.fullTitle)} <span aria-hidden="true">↗</span></a><div class="step-controls">${index > 0 && s.kind !== 'branch' && s.kind !== 'compare' ? `<a class="step-back" href="${route(s.id, s.nodes[index - 1].id)}">← 上一站</a>` : ''}${next.map(target => `<a href="${route(s.id, target.to)}" class="step-next">${esc(target.label)} →</a>`).join('')}</div></div></div>
    ${renderComparison(s, n)}
    ${s.id === 'quality' ? renderSignalLab() : ''}
    <p class="scenario-boundary"><strong>閱讀這張圖時</strong>${esc(s.boundary)}</p><p class="explorer-status" role="status" aria-live="polite">目前查看：${esc(s.title)}／${esc(n.title)}。${s.kind === 'compare' ? '可切換其他結構進行比較。' : '可點選節點或使用步驟按鈕繼續。'}</p></section>
    ${renderPractice(s.id)}
    <section class="explorer-library"><div><p class="explorer-kicker">延伸 / 深入理解</p><h2>圖是入口，教材是底稿</h2><p>回到完整章節，繼續查看技術細節、現場實務與延伸閱讀。</p></div><div class="library-links"><a href="#ch00">從第 0 章開始 →</a><a href="#app-glossary">查看術語總表 →</a><a href="#app-reading">延伸閱讀與來源 →</a></div></section>
  </div>`;
  bindNavigation(container, s, n);
  bindDiagramViewer(container, s, n);
  bindPractice(container, s.id);
  bindSignalLab(container, () => reveal(container, 'signal'));
  bindComparison(container, s.id, () => reveal(container, 'compare'));
  if (view) requestAnimationFrame(() => { if (container.querySelector('.explorer')) reveal(container, view); });
  else window.scrollTo({ top: 0, behavior: 'instant' });
  return { scenario: s, node: n };
}
