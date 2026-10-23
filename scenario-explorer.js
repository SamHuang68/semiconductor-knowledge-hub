import { bindDiagramViewer } from './legend-viewer.js';
import { renderConnections, bindConnections, connectionOrigin, originQuery, renderConnectionReturn, carryConnectionOrigin } from './extended-exploration.js';
import { SCENARIOS, getScenario } from './data/scenario-paths.js';
import { CHAPTERS_DATA } from './data/chapters-data.js';
import { waferArt, crossSection, packageArt, journeyArt, dispatchArt, renderComparison, bindComparison, comparisonIsOpen } from './scenario-diagrams.js';
import { signalPreview, renderSignalLab, bindSignalLab, signalIsOpen } from './signal-reading.js';
import { hasPractice, renderPractice, bindPractice } from './scenario-practice.js';

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

function bindNavigation(container, s, n, origin) {
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
    url.hash = route(s.id, n.id) + originQuery(origin);
    const status = container.querySelector('#shareStatus');
    const fallback = container.querySelector('#manualShare');
    const isEn = (localStorage.getItem('semi_preferred_lang') || 'zh') === 'en';
    try {
      await navigator.clipboard.writeText(url.href);
      status.textContent = isEn ? 'Step link copied to clipboard.' : '已複製目前步驟的連結。';
      fallback.hidden = true;
    } catch {
      status.textContent = isEn ? 'Browser denied clipboard access, please copy URL manually below.' : '瀏覽器未允許複製，請選取下方連結手動複製。';
      fallback.hidden = false;
      const input = fallback.querySelector('input');
      input.value = url.href;
      input.focus();
      input.select();
    }
  });
}

function flowMap(s, active, isEn = false) {
  const item = (n, index, extra = '') => {
    const title = isEn ? (n.titleEn || n.title) : n.title;
    const tag = isEn ? (n.tagEn || n.tag) : n.tag;
    const inspectText = isEn ? 'Inspect station <span aria-hidden="true">↗</span>' : '查看這一站 <span aria-hidden="true">↗</span>';
    return `<a class="flow-node ${active.id === n.id ? 'is-current' : ''} ${extra}" href="${route(s.id, n.id)}" ${active.id === n.id ? 'aria-current="step"' : ''}><span class="node-meta">${String(index + 1).padStart(2, '0')} · ${esc(tag)}</span><strong>${esc(title)}</strong><span class="node-inspect">${inspectText}</span></a>`;
  };
  const label = isEn ? (s.labelEn || s.label) : s.label;
  if (s.kind === 'branch') {
    const branchAria = isEn ? 'Quality Excursion Decision Flow' : '品質異常分支圖';
    const splitLeft = isEn ? 'In Control ↙' : '未觸發 ↙';
    const splitRight = isEn ? '↘ Out-of-Control' : '↘ 已觸發';
    const noteNormal = isEn ? 'Normal Path<br>Continue Metrology & SPC' : '正常路徑<br>回到量測與持續監控';
    const returnNote = isEn ? 'Unresolved → Return to Analysis / Resolved & Approved → Continuous Monitoring' : '未符合 → 回到分析　／　符合且核准 → 持續監控';
    return `<div class="branch-map" aria-label="${branchAria}">
      ${item(s.nodes[0], 0, 'branch-start')}<div class="branch-arrow branch-start-arrow" aria-hidden="true">↓</div>
      ${item(s.nodes[1], 1, 'branch-decision')}<div class="branch-split"><span>${splitLeft}</span><span>${splitRight}</span></div>
      ${item(s.nodes[2], 2, 'branch-normal')}${item(s.nodes[3], 3, 'branch-hold')}
      <p class="branch-note">${noteNormal}</p><div class="branch-arrow branch-investigate-arrow" aria-hidden="true">↓</div>
      ${item(s.nodes[4], 4, 'branch-cause')}<div class="branch-arrow branch-release-arrow" aria-hidden="true">↓</div>${item(s.nodes[5], 5, 'branch-release')}
      <p class="branch-return">${returnNote}</p></div>`;
  }
  const cycleReturn = isEn
    ? '↶ If metrology passes, proceed to next layer per routing; if out-of-control, trigger excursion containment.'
    : '↶ 量測合格後，依製程路徑展開下一層；不合格則進入異常處理。';
  return `<div class="flow-map ${s.kind === 'compare' ? 'comparison-map' : ''}" aria-label="${esc(label)}">${s.nodes.map((n, i) => `${item(n, i)}${i < s.nodes.length - 1 && s.kind !== 'compare' ? '<span class="flow-arrow" aria-hidden="true">→</span>' : ''}`).join('')}</div>${s.kind === 'cycle' ? `<div class="cycle-return">${cycleReturn}</div>` : ''}`;
}

export function renderExplorer(container, hash) {
  const isEn = (localStorage.getItem('semi_preferred_lang') || 'zh') === 'en';
  const [pathname, query = ''] = hash.split('?');
  const [, scenarioId, nodeId] = pathname.split('/');
  const s = getScenario(scenarioId);
  const n = s.nodes.find(n => n.id === nodeId) || s.nodes[0];
  const origin = connectionOrigin(s.id, new URLSearchParams(query).get('via'));
  const index = s.nodes.indexOf(n);
  const source = CHAPTERS_DATA.find(c => c.id === n.chapter);
  const view = pendingView || (s.nodes.some(node => node.id === nodeId) ? 'detail' : scenarioId ? 'map' : null);
  pendingView = null;
  document.body.classList.add('is-exploring');

  const sTitle = isEn ? (s.titleEn || s.title) : s.title;
  const sQuestion = isEn ? (s.questionEn || s.question) : s.question;
  const sIntro = isEn ? (s.introEn || s.intro) : s.intro;
  const sBoundary = isEn ? (s.boundaryEn || s.boundary) : s.boundary;
  const sLabel = isEn ? (s.labelEn || s.label) : s.label;

  const nTitle = isEn ? (n.titleEn || n.title) : n.title;
  const nTag = isEn ? (n.tagEn || n.tag) : n.tag;
  const nDetail = isEn ? (n.detailEn || n.detail) : n.detail;
  const nLook = isEn ? (n.lookEn || n.look) : n.look;
  const nResult = isEn ? (n.resultEn || n.result) : n.result;

  const sourceTitle = isEn ? (source?.fullTitleEn || source?.fullTitle) : source?.fullTitle;

  const next = n.next.length
    ? n.next.map(t => ({ ...t, label: isEn ? (t.labelEn || t.label) : t.label }))
    : s.kind === 'compare'
      ? []
      : index < s.nodes.length - 1
        ? [{ label: isEn ? 'Next Station' : '下一站', to: s.nodes[index + 1].id }]
        : [{ label: s.kind === 'cycle' ? (isEn ? 'Cycle Again' : '再看一輪') : (isEn ? 'Back to Start' : '回到起點'), to: s.nodes[0].id }];

  const art = s.id === 'pattern' ? crossSection(index) : s.id === 'packaging' ? packageArt(index) : s.id === 'quality' ? signalPreview() : s.id === 'dispatch' ? dispatchArt(s, index) : journeyArt(index);

  const heroKicker = isEn ? 'Semiconductor Manufacturing · Interactive Learning Map' : '半導體製造概論 · 互動學習地圖';
  const heroH1 = isEn ? 'Understand the Flow First,<br>Deep-Dive Station by Station' : '先看懂流程<br>再深入每一站';
  const heroP = isEn ? 'Follow a silicon wafer to connect fabrication, quality, and packaging.<br class="desktop-break">Choose a question and discover the answers in the map.' : '跟著一片晶圓，串起製程、品質與封裝。<br class="desktop-break">選一個問題，從圖中找到答案。';
  const heroLink1 = isEn ? 'Start Wafer Journey' : '開始晶圓旅程';
  const heroLink2 = isEn ? 'Read Full Curriculum →' : '閱讀完整教材 →';
  const heroStats = isEn
    ? '<span><b>25</b> Chapters</span><span><b>5</b> Scenarios</span><span><b>12</b> Modules</span>'
    : '<span><b>25</b> 章教材</span><span><b>5</b> 種探索情境</span><span><b>12</b> 個製程模組</span>';
  const heroWaferCaption = isEn ? 'From blank wafer to individual dies' : '從晶圓，到每一顆晶粒';
  const scenarioKicker = isEn ? 'Start from Your Questions' : '從你的問題出發';
  const scenarioHeading = isEn ? 'What would you like to explore today?' : '今天想弄懂什麼？';
  const scenarioIndex1 = isEn ? '01 / Choose Scenario' : '01 / 選情境';
  const scenarioIndex2 = isEn ? '02 / Understand Flow' : '02 / 看關係';
  const toolbarLabel = isEn ? 'Switch Scenario' : '切換情境';
  const viewMapText = isEn ? 'Map View' : '看全圖';
  const viewDetailText = isEn ? 'Detail View' : '看解說';
  const viewPracticeText = isEn ? 'Practice' : '試著判斷';
  const copyStepText = isEn ? 'Copy Step Link' : '複製步驟連結';
  const manualShareLabel = isEn ? 'Link to current step' : '目前步驟的連結';
  const legendCurrent = isEn ? 'Current Station' : '目前查看';
  const legendSelectable = isEn ? 'Selectable Station' : '可點選節點';
  const legendArrow = isEn
    ? (s.kind === 'compare' ? 'Parallel options with no sequential ordering' : s.kind === 'branch' ? 'Arrows indicate workflow branches' : 'Arrows indicate pedagogical sequence')
    : (s.kind === 'compare' ? '並列結構，沒有先後順序' : s.kind === 'branch' ? '箭頭表示判斷後的處理方向' : '箭頭表示此教學路徑的順序');
  const visualLabel = isEn
    ? (s.id === 'pattern' ? 'Material Cross-Section · Step by Step' : s.id === 'packaging' ? 'Packaging Architectures · Side-by-Side' : s.id === 'quality' ? 'Process Signals · Metrology Showcase' : s.id === 'dispatch' ? 'System Roles · Dispatch Focus' : 'Wafer Journey · Phase Overview')
    : (s.id === 'pattern' ? '材料剖面 · 隨步驟變化' : s.id === 'packaging' ? '封裝結構 · 切換比較' : s.id === 'quality' ? '製程訊號 · 所選教學示例' : s.id === 'dispatch' ? '系統角色 · 本節焦點' : '晶圓旅程 · 階段示意');
  const materialLegend = isEn
    ? (s.id === 'pattern' ? '<span>■ Silicon Substrate</span><span>■ Target Film</span><span>■ Photoresist</span>' : s.id === 'dispatch' ? '<span>Dashed: Info Query/Log</span><span>Solid: FOUP Transport</span>' : '<span>Schematics not to scale, non-commercial structure</span>')
    : (s.id === 'pattern' ? '<span>■ 矽基板</span><span>■ 目標薄膜</span><span>■ 光阻</span>' : s.id === 'dispatch' ? '<span>虛線：資訊核對與回寫</span><span>實線：晶圓盒搬運</span>' : '<span>示意未按比例，非特定產品結構</span>');
  const nodeKicker = isEn
    ? `${esc(nTag)} · ${s.kind === 'compare' ? 'Option' : 'Station'} #${index + 1}`
    : `${esc(nTag)} · 第 ${index + 1} 個${s.kind === 'compare' ? '選項' : '節點'}`;
  const compareToggleText = isEn
    ? (s.id === 'pattern' ? 'Cross-Section Comparison' : 'Three Architectures Side-by-Side')
    : (s.id === 'pattern' ? '前後剖面對照' : '三種結構並排比較');
  const signalToggleText = isEn ? 'Inspect Signals · Point-by-Point Analysis' : '切換訊號・逐點判讀';
  const sourceChapterText = isEn ? 'Source Chapter: ' : '教材依據：';
  const stepBackText = isEn ? '← Previous' : '← 上一站';
  const boundaryLead = isEn ? 'Pedagogical Scope: ' : '閱讀這張圖時：';
  const statusViewing = isEn
    ? `Currently viewing: ${esc(sTitle)} / ${esc(nTitle)}. ${s.kind === 'compare' ? 'Switch across architectures for comparison.' : 'Click nodes or use step buttons to continue.'}`
    : `目前查看：${esc(sTitle)}／${esc(nTitle)}。${s.kind === 'compare' ? '可切換其他結構進行比較。' : '可點選節點或使用步驟按鈕繼續。'}`;
  const libraryKicker = isEn ? 'Curriculum Reference' : '延伸 / 深入理解';
  const libraryH2 = isEn ? 'Flow is the gateway, curriculum is the foundation' : '圖是入口，教材是底稿';
  const libraryP = isEn ? 'Return to the full chapters for in-depth engineering details, fab practices, and further reading.' : '回到完整章節，繼續查看技術細節、現場實務與延伸閱讀。';
  const libraryLinks = isEn
    ? '<a href="#ch00">Start from Chapter 0 →</a><a href="#app-glossary">View Glossary →</a><a href="#app-reading">Further Reading & References →</a>'
    : '<a href="#ch00">從第 0 章開始 →</a><a href="#app-glossary">查看術語總表 →</a><a href="#app-reading">延伸閱讀與來源 →</a>';

  container.innerHTML = `<div class="explorer">
    <header class="explorer-hero"><div class="hero-copy"><p class="explorer-kicker">${heroKicker}</p><h1>${heroH1}</h1><p>${heroP}</p><div class="hero-links"><a href="#explore/journey/wafer">${heroLink1} <span aria-hidden="true">↗</span></a><a href="#ch00">${heroLink2}</a></div><div class="hero-stats">${heroStats}</div></div><div class="hero-wafer">${waferArt()}<span>${heroWaferCaption}</span></div></header>
    <section class="scenario-section" aria-labelledby="scenarioHeading"><div class="section-heading"><div><p class="explorer-kicker">${scenarioKicker}</p><h2 id="scenarioHeading">${scenarioHeading}</h2></div><span class="section-index">${scenarioIndex1}</span></div><nav class="scenario-nav" aria-label="${isEn ? 'Scenarios' : '探索情境'}">${SCENARIOS.map((item, i) => `<a href="${route(item.id, item.nodes[0].id)}" class="scenario-choice ${item.id === s.id ? 'is-selected' : ''}" ${item.id === s.id ? 'aria-current="page"' : ''}><span class="scenario-number">0${i + 1} <span aria-hidden="true">${item.icon}</span></span><strong>${esc(isEn ? (item.titleEn || item.title) : item.title)}</strong><span>${esc(isEn ? (item.labelEn || item.label) : item.label)}</span></a>`).join('')}</nav></section>
    <nav class="explorer-toolbar" aria-label="${isEn ? 'Scenario Toolbar' : '情境操作'}"><label for="scenarioSelect">${toolbarLabel}<select id="scenarioSelect">${SCENARIOS.map(item => `<option value="${item.id}" ${item.id === s.id ? 'selected' : ''}>${esc(isEn ? (item.titleEn || item.title) : item.title)}</option>`).join('')}</select></label><div class="explorer-tools"><button type="button" data-explorer-view="map">${viewMapText}</button><button type="button" data-explorer-view="detail">${viewDetailText}</button>${hasPractice(s.id) ? `<button type="button" data-explorer-view="practice">${viewPracticeText}</button>` : ''}<button type="button" id="shareStep">${copyStepText}</button></div>
    <p id="shareStatus" class="share-status" role="status" aria-live="polite"></p><div id="manualShare" class="manual-share" hidden><label for="stepUrl">${manualShareLabel}</label><input id="stepUrl" type="url" readonly></div></nav>
    <section class="scenario-workbench" aria-labelledby="workbenchHeading"><div class="section-heading"><div><span class="scenario-type">${esc(sLabel)}</span><h2 id="workbenchHeading" tabindex="-1">${esc(sQuestion)}</h2><p>${esc(sIntro)}</p></div><span class="section-index">${scenarioIndex2}</span></div>
    <div class="map-legend"><span><i class="legend-active"></i>${legendCurrent}</span><span><i></i>${legendSelectable}</span><span>${legendArrow}</span></div>${flowMap(s, n, isEn)}
    <div class="node-detail" id="nodeDetail"><div class="detail-visual"><span class="visual-label">${visualLabel}</span>${art}<div class="material-legend">${materialLegend}</div></div><div class="detail-copy"><p class="explorer-kicker">${nodeKicker}</p><h3 id="detailTitle" tabindex="-1">${esc(nTitle)}</h3>${['pattern', 'packaging'].includes(s.id) ? `<button type="button" class="compare-toggle" aria-controls="diagramComparison" aria-expanded="${comparisonIsOpen(s.id)}">${compareToggleText} <span aria-hidden="true">↗</span></button>` : ''}${s.id === 'quality' ? `<button type="button" class="signal-toggle" aria-controls="signalLab" aria-expanded="${signalIsOpen()}">${signalToggleText} <span aria-hidden="true">↗</span></button>` : ''}<p>${esc(nDetail)}</p><dl><div><dt>${isEn ? 'Key Focus' : '看什麼'}</dt><dd>${esc(nLook)}</dd></div><div><dt>${isEn ? 'Takeaway' : '帶走什麼'}</dt><dd>${esc(nResult)}</dd></div></dl><a class="source-chapter" href="#${n.chapter}?from=${s.id}%2F${n.id}">${sourceChapterText}${esc(sourceTitle)} <span aria-hidden="true">↗</span></a><div class="step-controls">${index > 0 && s.kind !== 'branch' && s.kind !== 'compare' ? `<a class="step-back" href="${route(s.id, s.nodes[index - 1].id)}">${stepBackText}</a>` : ''}${next.map(target => `<a href="${route(s.id, target.to)}" class="step-next">${esc(target.label)} →</a>`).join('')}</div></div></div>
    ${renderComparison(s, n)}
    ${s.id === 'quality' ? renderSignalLab() : ''}
    <p class="scenario-boundary"><strong>${boundaryLead}</strong>${esc(sBoundary)}</p><p class="explorer-status" role="status" aria-live="polite">${statusViewing}</p></section>
    ${renderConnections(s, n)}
    ${renderPractice(s.id)}
    <section class="explorer-library"><div><p class="explorer-kicker">${libraryKicker}</p><h2>${libraryH2}</h2><p>${libraryP}</p></div><div class="library-links">${libraryLinks}</div></section>
  </div>`;
  container.querySelector('#detailTitle').insertAdjacentHTML('afterend', renderConnectionReturn(origin));
  carryConnectionOrigin(container, s, origin);
  bindNavigation(container, s, n, origin);
  bindConnections(container);
  bindDiagramViewer(container, s, n);
  bindPractice(container, s.id);
  bindSignalLab(container, () => reveal(container, 'signal'));
  bindComparison(container, s.id, () => reveal(container, 'compare'));
  if (view) requestAnimationFrame(() => { if (container.querySelector('.explorer')) reveal(container, view); });
  else window.scrollTo({ top: 0, behavior: 'instant' });
  return { scenario: s, node: n };
}
