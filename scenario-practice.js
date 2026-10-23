// 題目只整理既有教材；不把概念判斷當作生產處置或放行授權。
const exercises = {
  pattern: {
    node: 'expose', chapter: 'ch04', source: '第 4 章：微影',
    title: '顯影完成，圖形在哪一層？',
    question: '在這張簡化剖面圖中，曝光與顯影已完成，但還沒有進行蝕刻。哪一項描述正確？',
    choices: [
      ['光阻已形成開口，下方目標薄膜仍未被蝕刻。', '微影先在光阻上定義圖形；接下來的蝕刻才把圖形轉移到目標材料。'],
      ['下方薄膜已被挖出電路圖形。', '這把微影和蝕刻混在一起了。顯影去除部分光阻，不等於完成目標薄膜的蝕刻。'],
      ['光阻已經全部移除。', '這一步仍需要有圖形的光阻作為暫時遮罩；去光阻安排在後續加工之後。']
    ],
    answer: 0, boundary: '只對照此頁的簡化蝕刻路徑，不涵蓋所有光阻種類、硬遮罩或其他圖形化流程。'
  },
  quality: {
    node: 'decision', chapter: 'ch17', source: '第 17 章：SPC 與製程管制',
    title: '仍在規格內，可以忽略警訊嗎？',
    question: '假設量測資料已確認有效，某一點超出既定管制界限，但仍在產品規格內。哪一項理解正確？',
    choices: [
      ['產品還在規格內，所以可以忽略這個訊號。', '管制界限用來及早發現製程異常。仍在規格內，不能抵銷已出現的管制警訊。'],
      ['須依既定異常處理規則追查，但不能單憑它認定產品已超規。', 'OOC 表示超出管制界限；OOS 表示超出規格界限。兩者不同，後續檢查與處置須依適用的 OCAP 和權責。'],
      ['已經證明整批產品不合格，應直接報廢。', '這個訊號不足以證明整批產品超規，也不足以決定報廢。仍須確認影響範圍、取得證據並依權責判定處置。']
    ],
    answer: 1, boundary: '本題練習區分 OOC 與 OOS，不提供實際界限數值、停機條件或放行授權。'
  },
  dispatch: {
    node: 'recipe', chapter: 'ch23', source: '第 23 章：MES 與晶圓廠自動化',
    title: '晶圓到了機台，就能加工嗎？',
    question: '晶圓盒已送達指定機台，但系統顯示 Recipe 版本不符。依教材的防呆概念，哪一項理解正確？',
    choices: [
      ['只要送到正確機台，就可以開始加工。', '搬運位置正確只是其中一項條件。產品、站點、機台狀態、Hold 與 Recipe 版本等檢查仍各自有作用。'],
      ['先做完再補履歷，就能避免延誤。', '履歷記錄不能補救使用錯誤配方的風險，也不能取代加工前的防呆檢查。'],
      ['版本不符時不應直接開始；須依規範釐清並完成必要確認。', 'Recipe 版本核對是加工前的防呆規則。到站、通過檢查與正式加工，是不同的狀態。']
    ],
    answer: 2, boundary: '本題練習理解系統角色與防呆，不提供修改 Recipe、解除 Hold 或核准例外的方法。'
  }
};
const responses = new Map();
export const hasPractice = id => Boolean(exercises[id]);

function feedback(id, selected) {
  if (selected === undefined) return '';
  const e = exercises[id];
  return `<strong>${selected === e.answer ? '判斷正確' : '再想一想'}</strong><p>${e.choices[selected][1]}</p>`;
}

export function renderPractice(id) {
  const e = exercises[id];
  if (!e) return '';
  const selected = responses.get(id);
  return `<section class="practice-panel" aria-labelledby="practiceTitle">
    <p class="explorer-kicker">03 / 試著判斷</p><h3 id="practiceTitle" tabindex="-1">${e.title}</h3>
    <p id="practiceQuestion">${e.question}</p>
    <div class="practice-choices" role="group" aria-labelledby="practiceQuestion">${e.choices.map((choice, i) => `<button type="button" class="practice-choice" data-answer="${i}" aria-pressed="${selected === i}"><span aria-hidden="true">${String.fromCharCode(65 + i)}</span><span>${choice[0]}</span></button>`).join('')}</div>
    <div class="practice-feedback" role="status" aria-live="polite" aria-atomic="true">${feedback(id, selected)}</div>
    <div class="practice-actions"><button type="button" class="practice-reset" ${selected === undefined ? 'hidden' : ''}>重新作答</button><a href="#explore/${id}/${e.node}" class="practice-diagram">對照流程圖 →</a><a href="#${e.chapter}?from=${id}%2F${e.node}">閱讀依據：${e.source} ↗</a></div>
    <p class="practice-boundary">${e.boundary}</p>
  </section>`;
}

export function bindPractice(container, id) {
  const panel = container.querySelector('.practice-panel');
  if (!panel) return;
  const choices = [...panel.querySelectorAll('[data-answer]')];
  const reset = panel.querySelector('.practice-reset');
  choices.forEach((button, i) => button.addEventListener('click', () => {
    responses.set(id, i);
    choices.forEach((choice, index) => choice.setAttribute('aria-pressed', String(index === i)));
    panel.querySelector('.practice-feedback').innerHTML = feedback(id, i);
    reset.hidden = false;
  }));
  reset.addEventListener('click', () => {
    responses.delete(id);
    choices.forEach(choice => choice.setAttribute('aria-pressed', 'false'));
    panel.querySelector('.practice-feedback').textContent = '';
    reset.hidden = true;
    choices[0].focus();
  });
}
