import { getScenario } from './data/情境路徑.js';

// 人工編排的教學示例；數值只決定圖形座標，不是量測資料或 SPC 判定器。
const examples = [
  { id: 'baseline', title: '基準波動', values: [48, 54, 46, 52, 47, 55, 49, 53, 45, 51, 46, 52], note: '對照中心線上下的交錯波動；此例沒有單點越界，不代表產品合格或免除其他規則檢查。' },
  { id: 'single', title: '單點越界', values: [48, 54, 46, 52, 47, 55, 49, 91, 45, 51, 46, 52], note: '第 8 點超出上管制界限。這是製程訊號，不能據此判定產品超規，也不能直接認定根因。' },
  { id: 'shift', title: '連續偏移', values: [48, 54, 46, 58, 62, 57, 64, 61, 66, 63, 59, 65], note: '第 4 點起連續位於中心線上方，且都在管制界限內。點數只供觀察型態，異常判定仍依適用規則。' }
];
const state = { example: 'baseline', count: 12, open: false };
const current = () => examples.find(example => example.id === state.example);
const values = () => current().values.slice(0, state.count);
const position = value => value > 80 ? '超出上管制界限' : value < 20 ? '低於下管制界限' : value > 50 ? '界限內，中心線上方' : value < 50 ? '界限內，中心線下方' : '位於中心線';
const side = value => Math.sign(value - 50);

function observation() {
  const shown = values();
  const outside = shown.flatMap((value, i) => value > 80 || value < 20 ? [i + 1] : []);
  let run = 1;
  while (run < shown.length && side(shown.at(-run - 1)) === side(shown.at(-1))) run++;
  if (outside.length) return { title: `第 ${outside.join('、')} 點越過管制界限`, text: '先核對量測有效性，再依既定異常規則與 OCAP 處理。後續點回到界限內，也不會自動解除先前的警訊。', marked: outside };
  if (run >= 2 && side(shown.at(-1))) return { title: `末段連續 ${run} 點在中心線${shown.at(-1) > 50 ? '上' : '下'}方`, text: '目前沒有單點越界，但同側型態值得對照適用的連續點規則。這裡只描述看見的型態，不設定通用異常門檻。', marked: [] };
  return { title: state.count === 1 ? '目前只看到第 1 點' : '目前顯示的點都在管制界限內', text: '資料還要連同量測條件與其他適用規則判讀；單憑這張教學圖，不能證明製程穩定或產品合格。', marked: [] };
}

function chart() {
  const shown = values();
  const result = observation();
  const x = index => 12 + index * 52;
  const y = value => 220 - value * 2;
  const points = shown.map((value, i) => `${x(i)},${y(value)}`).join(' ');
  return `<div class="signal-chart"><div class="signal-axis" aria-hidden="true"><span>上管制界限</span><span>中心線</span><span>下管制界限</span></div><svg viewBox="0 0 596 240" preserveAspectRatio="none" role="img" aria-label="${current().title}，顯示前 ${state.count} 點。${result.title}。本圖未繪出規格界限。"><path d="M0 60h596M0 180h596" class="signal-limit"/><path d="M0 120h596" class="signal-center"/><polyline points="${points}" class="signal-trace"/>${shown.map((value, i) => `<circle cx="${x(i)}" cy="${y(value)}" r="${i === shown.length - 1 ? 6 : 4}" class="signal-point ${result.marked.includes(i + 1) ? 'is-outside' : ''}"/>`).join('')}${result.marked.map(point => `<path d="M${x(point - 1) - 5} ${y(shown[point - 1]) - 5}l10 10m0-10-10 10" class="signal-cross"/>`).join('')}</svg></div><div class="signal-order"><span>第 1 點</span><span>量測順序 →</span><span>第 12 點</span></div>`;
}

export const signalIsOpen = () => state.open;
export function signalPreview() {
  return `<div id="qualityPreview" class="signal-preview">${chart()}<p>教學示例：${current().title} · 前 ${state.count} 點</p></div>`;
}

function reading() {
  const result = observation();
  return `<strong>${result.title}</strong><p>${result.text}</p><p class="signal-last">目前第 ${state.count} 點：${position(values().at(-1))}</p>`;
}

export function renderSignalLab() {
  const quality = getScenario('quality');
  const destination = id => quality.nodes.find(node => node.id === id);
  return `<section id="signalLab" class="signal-lab" ${state.open ? '' : 'hidden'} aria-labelledby="signalTitle">
    <div class="signal-heading"><div><p class="explorer-kicker">換個訊號 · 看出判讀差別</p><h3 id="signalTitle" tabindex="-1">如果量測曲線變成這樣？</h3></div><button type="button" data-explorer-view="detail">返回解說 ↑</button></div>
    <p class="signal-intro">選一種教學示例，再逐點展開，觀察新資料如何改變你看到的型態。</p>
    <div class="signal-examples" role="group" aria-label="選擇訊號示例">${examples.map(example => `<button type="button" data-signal-example="${example.id}" aria-pressed="${state.example === example.id}">${example.title}</button>`).join('')}</div>
    <div class="signal-workspace"><div class="signal-plot"><div class="signal-plot-label"><strong>管制圖概念示意</strong><span>人工示例，無實際單位</span></div><div id="signalChart">${chart()}</div><p class="signal-key">圓點：已顯示資料　×：超出管制界限</p></div>
    <div class="signal-reading"><p class="explorer-kicker">只根據目前顯示的點</p><div id="signalObservation" role="status" aria-live="polite">${reading()}</div></div></div>
    <div class="signal-controls"><label for="signalCount">顯示到第 <output id="signalCountValue" for="signalCount">${state.count}</output> 點，共 12 點</label><input id="signalCount" type="range" min="1" max="12" step="1" value="${state.count}" aria-valuetext="已顯示前 ${state.count} 點，共 12 點"><div class="signal-actions"><button type="button" id="signalStart">從第 1 點開始</button><button type="button" id="signalPrevious" ${state.count === 1 ? 'disabled' : ''}>← 前一點</button><button type="button" id="signalNext" ${state.count === 12 ? 'disabled' : ''}>下一點 →</button></div></div>
    <details class="signal-data"><summary>查看目前各點的相對位置</summary><table><caption>僅列已顯示資料，不提供實際量測值</caption><thead><tr><th scope="col">量測順序</th><th scope="col">相對位置</th></tr></thead><tbody id="signalRows">${rows()}</tbody></table></details>
    <details class="signal-explanation"><summary>查看這組完整示例的解說</summary><p id="signalExampleNote">${current().note}</p></details>
    <div class="signal-paths"><h4>帶著觀察，回到處理流程</h4><p>圖形描述與處理權責分開：先判讀規則，再選符合實際條件的路徑。</p><nav aria-label="訊號判讀後的閱讀路徑"><a href="#explore/quality/decision">${destination('decision').title} →</a><a href="#explore/quality/monitor">未觸發時：${destination('monitor').title} →</a><a href="#explore/quality/hold">符合異常規則時：${destination('hold').title} →</a></nav></div>
    <p class="signal-boundary">本圖只畫管制界限，沒有規格界限，不能判定產品超規。示例不代表即時量測；異常規則、OCAP 與放行依現場權責執行。</p><a class="signal-source" href="#ch17?from=quality%2Fdecision">教材依據：第 17 章・製程管制與 SPC ↗</a>
  </section>`;
}

function rows() {
  return values().map((value, i) => `<tr><th scope="row">第 ${i + 1} 點</th><td>${position(value)}</td></tr>`).join('');
}

export function bindSignalLab(container, revealLab) {
  const toggle = container.querySelector('.signal-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    state.open = !state.open;
    toggle.setAttribute('aria-expanded', String(state.open));
    container.querySelector('#signalLab').hidden = !state.open;
    if (state.open) revealLab();
  });
  const update = () => {
    container.querySelector('#signalChart').innerHTML = chart();
    container.querySelector('#qualityPreview').outerHTML = signalPreview();
    container.querySelector('#signalObservation').innerHTML = reading();
    container.querySelector('#signalCountValue').textContent = state.count;
    const slider = container.querySelector('#signalCount');
    slider.value = state.count;
    slider.setAttribute('aria-valuetext', `已顯示前 ${state.count} 點，共 12 點`);
    container.querySelector('#signalPrevious').disabled = state.count === 1;
    container.querySelector('#signalNext').disabled = state.count === 12;
    container.querySelector('#signalRows').innerHTML = rows();
    container.querySelector('#signalExampleNote').textContent = current().note;
    container.querySelectorAll('[data-signal-example]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.signalExample === state.example)));
  };
  container.querySelectorAll('[data-signal-example]').forEach(button => button.addEventListener('click', () => { state.example = button.dataset.signalExample; state.count = 12; update(); }));
  container.querySelector('#signalCount').addEventListener('input', event => { state.count = Number(event.target.value); update(); });
  container.querySelector('#signalStart').addEventListener('click', () => { state.count = 1; update(); });
  container.querySelector('#signalPrevious').addEventListener('click', () => { state.count = Math.max(1, state.count - 1); update(); });
  container.querySelector('#signalNext').addEventListener('click', () => { state.count = Math.min(12, state.count + 1); update(); });
}
