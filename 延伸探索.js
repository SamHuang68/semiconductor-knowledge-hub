import { SCENARIOS, chapterReturnContext } from './data/情境路徑.js';

// 編輯關聯只保存目的節點與閱讀理由；名稱、章節與網址取自原情境資料。
// 這些是學習主題之間的連結，不是製造順序或生產放行條件。
const CONNECTIONS = {
  'journey/wafer': [['pattern/film', '從基板往上看，第一層待加工材料如何準備？', 'Looking up from the substrate: how is the first thin-film layer deposited?']],
  'journey/transistor': [
    ['pattern/expose', '放大製程中的一個環節，看光阻如何形成圖形。', 'Zoom into photolithography to see how photoresist patterns are defined.'],
    ['dispatch/recipe', '同一站開始加工前，系統與機台要核對哪些資訊？', 'Before running a lot, what verification takes place between MES and tool recipe?']
  ],
  'journey/wiring': [['pattern/etch', '回到材料剖面，分清光阻圖形與材料中的圖形。', 'Return to cross-sections to contrast photoresist patterns with permanent etched features.']],
  'journey/probe': [['quality/signal', '延伸到製程量測：先確認資料條件，再讀取訊號。', 'Bridge to in-line metrology: verify inspection parameters before evaluating signals.']],
  'journey/package': [
    ['packaging/single', '由封裝階段深入結構，先看晶粒與外部的連接。', 'Deep-dive into packaging: inspect fundamental die-to-substrate interconnections.'],
    ['packaging/interposer', '多顆晶粒一起整合時，連接方式有什麼不同？', 'When integrating multiple dies, how does the 2.5D interposer routing differ?']
  ],
  'pattern/film': [['journey/transistor', '回到製造全貌，看薄膜等模組如何參與元件形成。', 'Zoom out to the full flow to see how thin films construct active transistor gates and wells.']],
  'pattern/resist': [['dispatch/recipe', '從材料操作轉到作業核對，理解站點與配方的關係。', 'From chemical dispensing to recipe dispatch: connecting station operations with recipe parameters.']],
  'pattern/expose': [['journey/transistor', '把圖形轉移放回元件製造，理解它只是多個環節之一。', 'Place lithography back into device integration as one of dozens of repeating cycles.']],
  'pattern/etch': [['journey/wiring', '把材料圖形放回電路全貌，繼續認識金屬互連。', 'Place etched trenches back into circuit context to understand multi-level BEOL metallization.']],
  'pattern/clean': [['quality/signal', '清洗後若要判讀量測結果，先確認哪些資料條件？', 'Post-clean metrology: what inspection conditions must be validated prior to defect review?']],
  'pattern/measure': [
    ['quality/decision', '觀察到訊號後，如何區分持續監控與異常處理？', 'After capturing signals: how to distinguish routine SPC monitoring from out-of-control containment?'],
    ['dispatch/record', '量測與加工資訊如何留在可追溯的批次履歷？', 'How metrology and tool runs are permanently committed to the MES genealogy log.']
  ],
  'quality/signal': [['pattern/measure', '用圖形轉移情境理解尺寸量測與缺陷檢查的目的。', 'Connect CD-SEM and defect scanning back to the physical pattern transfer step.']],
  'quality/decision': [['pattern/measure', '回看量測發生的製程背景，避免只看一個數字。', 'Trace the physical processing context rather than evaluating isolated Cpk/yield metrics.']],
  'quality/monitor': [['dispatch/record', '持續監控需要紀錄；看看履歷如何接回後續作業。', 'Routine monitoring requires logging: see how travelers advance to subsequent operations.']],
  'quality/hold': [['dispatch/route', '從批次路徑看鎖批與作業限制如何影響下一站。', 'Trace how lot holds and inhibitory flags prevent downstream dispatch.']],
  'quality/cause': [['dispatch/record', '分析需要追溯資訊；回看加工履歷與量測如何銜接。', 'Root cause failure analysis requires tracing historical run parameters and metrology readings.']],
  'quality/release': [['dispatch/route', '另看製程路徑的限制核對；閱讀此頁不代表批次已放行。', 'Review dispatch clearance gates; studying this flow does not imply lot disposition.']],
  'packaging/single': [['journey/package', '回到製造旅程，看封裝與終測所在的階段。', 'Return to the overall journey to locate assembly and final test in the product lifecycle.']],
  'packaging/interposer': [['journey/probe', '往前認識晶圓測試與晶粒分類，分清 WAT 和 CP 的目的。', 'Look back at wafer sort and Known Good Die (KGD) classification before multi-die assembly.']],
  'packaging/stack': [['journey/package', '從堆疊結構回到封裝階段，連結散熱、可靠度與測試議題。', 'Relate 3D volumetric stacking to thermal dissipation, test access, and reliability.']],
  'dispatch/route': [['quality/hold', '若批次受到異常管制，閱讀暫停與圈定範圍的教學分支。', 'If a lot encounters an excursion hold, explore the quarantine and containment branch.']],
  'dispatch/dispatch': [['journey/transistor', '把派工作業放回製造全貌，看元件形成所需的多次加工。', 'Frame tool scheduling within device fabrication, requiring hundreds of sequential operations.']],
  'dispatch/transport': [['journey/wafer', '回到搬運對象本身，認識矽晶圓如何成為製造基板。', 'Return to the transport payload itself: single-crystal silicon ingots sliced into wafers.']],
  'dispatch/recipe': [['pattern/expose', '用曝光與顯影作為閱讀例子，理解一次加工的材料變化。', 'Use photolithography as a concrete case to understand chamber recipe execution.']],
  'dispatch/record': [['quality/signal', '紀錄之後如何開始判讀？先確認量測對象、條件與資料。', 'How run logs feed into engineering analysis: validating metrology integrity first.']]
};
const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function renderConnections(scenario, node) {
  const isEn = (localStorage.getItem('semi_preferred_lang') || 'zh') === 'en';
  const links = (CONNECTIONS[`${scenario.id}/${node.id}`] || []).map(([destination, reasonZh, reasonEn]) => {
    const [scenarioId, nodeId] = destination.split('/');
    const targetScenario = SCENARIOS.find(item => item.id === scenarioId);
    const targetNode = targetScenario?.nodes.find(item => item.id === nodeId);
    if (!targetNode) return '';
    const scenTitle = isEn ? (targetScenario.titleEn || targetScenario.title) : targetScenario.title;
    const nodeTitle = isEn ? (targetNode.titleEn || targetNode.title) : targetNode.title;
    const reason = isEn ? (reasonEn || reasonZh) : reasonZh;
    return `<a class="related-link" href="#explore/${targetScenario.id}/${targetNode.id}?via=${encodeURIComponent(`${scenario.id}/${node.id}`)}"><span class="related-meta">${esc(scenTitle)} <span aria-hidden="true">↗</span></span><strong>${esc(nodeTitle)}</strong><span class="related-reason">${esc(reason)}</span></a>`;
  }).join('');
  if (!links) return '';
  const kicker = isEn ? 'Extended Exploration' : '延伸探索';
  const heading = isEn ? 'Connecting This Station' : '把這一站串起來';
  const currNodeTitle = isEn ? (node.titleEn || node.title) : node.title;
  const desc = isEn
    ? `Branch out from "${esc(currNodeTitle)}" to other manufacturing contexts. These links indicate technical relevance, not physical sequential ordering.`
    : `從「${esc(currNodeTitle)}」延伸到其他情境。這些連結表示主題關聯，不代表製程先後順序。`;
  return `<section class="related-exploration" aria-labelledby="relatedHeading"><div class="related-heading"><p class="explorer-kicker">${kicker}</p><h3 id="relatedHeading">${heading}</h3><p>${desc}</p></div><div class="related-links">${links}</div></section>`;
}

// 來源只接受已存在且確實連到目前情境的編輯關聯，不使用網址中的任意文字或外部網址。
export function connectionOrigin(scenarioId, value) {
  if (typeof value !== 'string') return null;
  const parts = value.split('/');
  if (parts.length !== 2 || !SCENARIOS.some(item => item.id === scenarioId)) return null;
  const scenario = SCENARIOS.find(item => item.id === parts[0]);
  const node = scenario?.nodes.find(item => item.id === parts[1]);
  if (!node || !CONNECTIONS[value]?.some(([destination]) => destination.split('/')[0] === scenarioId)) return null;
  return { scenario, node, value: `${scenario.id}/${node.id}` };
}

export const originQuery = origin => origin ? `?via=${encodeURIComponent(origin.value)}` : '';

export function renderConnectionReturn(origin) {
  if (!origin) return '';
  const isEn = (localStorage.getItem('semi_preferred_lang') || 'zh') === 'en';
  const scenTitle = isEn ? (origin.scenario.titleEn || origin.scenario.title) : origin.scenario.title;
  const nodeTitle = isEn ? (origin.node.titleEn || origin.node.title) : origin.node.title;
  const label = isEn ? `Exploration Source · ${esc(scenTitle)}` : `延伸來源 · ${esc(scenTitle)}`;
  const linkText = isEn ? `← Back to ${esc(nodeTitle)}` : `← 回到${esc(nodeTitle)}`;
  return `<aside class="exploration-return" aria-label="${isEn ? 'Extended Exploration Source' : '本次延伸來源'}"><span>${label}</span><a href="#explore/${origin.value}">${linkText}</a></aside>`;
}

export function carryConnectionOrigin(container, scenario, origin) {
  if (!origin) return;
  container.querySelectorAll(`a[href^="#explore/${scenario.id}/"]`).forEach(link => {
    if (!link.matches('.scenario-choice')) link.setAttribute('href', link.getAttribute('href').split('?')[0] + originQuery(origin));
  });
  container.querySelectorAll('a[href^="#ch"]').forEach(link => {
    const [chapter, query = ''] = link.getAttribute('href').split('?');
    const params = new URLSearchParams(query);
    const context = chapterReturnContext(chapter.slice(1), params.get('from'));
    if (context?.scenario.id === scenario.id) {
      params.set('via', origin.value);
      link.setAttribute('href', `${chapter}?${params}`);
    }
  });
  const back = container.querySelector('.exploration-return a');
  back?.addEventListener('focus', () => {
    if (!back.matches(':focus-visible')) return;
    const toolbar = container.querySelector('.explorer-toolbar').getBoundingClientRect();
    const box = back.getBoundingClientRect();
    if (box.top < toolbar.bottom + 12 || box.bottom > innerHeight - 12) window.scrollBy({top: box.top - toolbar.bottom - 18, behavior:'instant'});
  });
}

export function bindConnections(container) {
  const section = container.querySelector('.related-exploration');
  section?.addEventListener('focusin', event => {
    const link = event.target.closest('.related-link');
    // 滑鼠按下會先取得焦點；此時捲動會讓放開位置離開連結，必須只處理鍵盤焦點。
    if (!link || !link.matches(':focus-visible')) return;
    const header = document.querySelector('.app-header');
    const toolbar = container.querySelector('.explorer-toolbar');
    const headerHeight = ['sticky', 'fixed'].includes(getComputedStyle(header).position) ? header.getBoundingClientRect().height : 0;
    const offset = Math.max(headerHeight, parseFloat(getComputedStyle(toolbar).top) || 0) + toolbar.getBoundingClientRect().height + 18;
    const card = link.getBoundingClientRect();
    const heading = section.querySelector('.related-heading').getBoundingClientRect();
    const top = link === section.querySelector('.related-link') && card.bottom - heading.top <= innerHeight - offset - 18 ? heading.top : card.top;
    if (top < offset || card.bottom > innerHeight - 18) window.scrollBy({top: top - offset, behavior: 'instant'});
  });
}
