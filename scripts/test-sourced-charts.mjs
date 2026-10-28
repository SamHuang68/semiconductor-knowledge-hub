import assert from 'node:assert/strict';
import { asmlRdPoints, insertSourcedCharts, lamRdPoints, SOURCED_CHARTS, tsmcRdPoints, wstsRegionPoints, wstsWorldwidePoints } from '../sourced-charts.js';
import { chapter as ch00 } from '../data/chapters/ch00.js';
import { chapter as ch01 } from '../data/chapters/ch01.js';
import { chapter as ch03 } from '../data/chapters/ch03.js';
import { chapter as ch04 } from '../data/chapters/ch04.js';
import { chapter as ch06 } from '../data/chapters/ch06.js';
import { chapter as ch14 } from '../data/chapters/ch14.js';
import { chapter as ch15 } from '../data/chapters/ch15.js';

const wafer = SOURCED_CHARTS.find(chart => chart.id === 'semi-wafer-shipments');
const ppe = SOURCED_CHARTS.find(chart => chart.id === 'tsmc-ppe-purchases');

const waferRows = [
  ['2020', '12,407', '11.2'],
  ['2021', '14,165', '12.6'],
  ['2022', '14,713', '13.8'],
  ['2023', '12,602', '12.3'],
  ['2024', '12,266', '11.5']
];
const ppeRows = [
  ['2017', '11,153,400,000', '2018-04-19', '0001193125-18-121866'],
  ['2018', '10,309,800,000', '2019-04-17', '0001193125-19-108390'],
  ['2019', '15,393,600,000', '2020-04-15', '0001193125-20-107579'],
  ['2020', '18,064,100,000', '2021-04-16', '0001193125-21-118512'],
  ['2021', '30,252,200,000', '2022-04-14', '0001193125-22-104891'],
  ['2022', '35,231,800,000', '2023-04-20', '0001193125-23-107214'],
  ['2023', '31,019,500,000', '2024-04-18', '0001193125-24-099840'],
  ['2024', '29,155,400,000', '2025-04-17', '0001193125-25-083423']
];

function chartHtml(html) {
  const start = html.indexOf('<figure class="sourced-chart"');
  const end = html.indexOf('</figure>', start);
  assert.ok(start >= 0 && end > start, '要找得到公開數據圖');
  return html.slice(start, end + '</figure>'.length);
}

for (const [chapter, id, before, after] of [
  [ch03, 'ch03', '晶圓尺寸', '特殊晶圓'],
  [ch01, 'ch01', '機台：工廠的主角', '工廠的血液']
]) {
  const html = insertSourcedCharts(chapter.contentHtml, id, 'zh');
  assert.equal((html.match(/class="sourced-chart"/g) || []).length, 1, `${id} 中文要有一張公開數據圖`);
  const figure = chartHtml(html);
  assert.ok(html.indexOf(before) < html.indexOf('sourced-chart') && html.indexOf('sourced-chart') < html.indexOf(after), `${id} 的圖要接在指定小標後面`);
  assert.ok(figure.includes('公開數據') && figure.includes('https://'), `${id} 要標成公開數據並附上網址`);
  assert.ok(!figure.includes('未按比例'), `${id} 的數據圖不使用示意圖的未按比例徽章`);
}

const waferZh = chartHtml(insertSourcedCharts(ch03.contentHtml, 'ch03', 'zh'));
const waferEn = chartHtml(insertSourcedCharts(ch03.contentHtmlEn, 'ch03', 'en'));
for (const row of waferRows) {
  for (const cell of row) {
    assert.ok(waferZh.includes(cell) && waferEn.includes(cell), `晶圓出貨表要保留 ${cell}`);
  }
}
assert.ok(waferZh.includes(wafer.url) && waferEn.includes('Annual Silicon'), '晶圓圖要附上新聞稿網址與表格名稱');
assert.ok(waferZh.includes('width:100.00%') && waferZh.includes('width:84.33%'), '出貨面積最長的一年是滿條，2020 年按比例縮短');
assert.ok(waferZh.includes('不是晶圓直徑') && waferEn.includes('not wafer diameter'), '出貨面積不能被讀成晶圓直徑');

const ppeZh = chartHtml(insertSourcedCharts(ch01.contentHtml, 'ch01', 'zh'));
const ppeEn = chartHtml(insertSourcedCharts(ch01.contentHtmlEn, 'ch01', 'en'));
for (const row of ppeRows) {
  for (const cell of row) {
    assert.ok(ppeZh.includes(cell) && ppeEn.includes(cell), `台積電現金購置表要保留 ${cell}`);
  }
}
assert.ok(ppeZh.includes(ppe.url) && ppeEn.includes('PurchaseOfPropertyPlantAndEquipmentClassifiedAsInvestingActivities'), '台積電圖要附上 SEC JSON 路徑');
assert.ok(ppeZh.includes('width:100.00%') && ppeZh.includes('width:29.26%'), '購置金額最大的一年是滿條，2018 年按同一比例縮短');
assert.ok(ppeZh.includes('台積電以新台幣編製報表。表上的美元是各年 20-F 依年底匯率做的方便換算，年與年的變化有一部分來自匯率。'), '中文圖底下要註明新台幣與年底匯率換算');
assert.ok(ppeEn.includes('convenience translations at each year-end exchange rate'), '英文圖底下要有同一句匯率說明');
assert.ok(ppeZh.indexOf('29,155,400,000') < ppeZh.indexOf('以新台幣編製報表'), '匯率說明要放在金額表後面');
assert.ok(!ppeZh.includes('29.76') && !ppeEn.includes('29.76'), '不混入另一套資本支出數字');

const untouched = insertSourcedCharts(ch15.contentHtml, 'ch15', 'zh');
assert.equal((untouched.match(/sourced-chart/g) || []).length, 0, '沒有可核對序列的章節不補圖');

function figureById(html, id) {
  const start = html.indexOf(`id="chart-${id}"`);
  assert.ok(start >= 0, `要找得到 ${id}`);
  const open = html.lastIndexOf('<figure', start);
  const end = html.indexOf('</figure>', start);
  return html.slice(open, end + '</figure>'.length);
}

for (const [html, before, after, id] of [
  [ch00.contentHtml, '誰負責什麼：半導體產業的分工', '旅程地圖', 'wsts-worldwide-billings'],
  [ch00.contentHtmlEn, 'Who does what: how the industry divides the work', 'Map of the journey', 'wsts-worldwide-billings'],
  [ch00.contentHtml, '價值鏈與 Foundry 2.0 條例總覽', '定量物理定律與 3D 製程視窗', 'wsts-region-billings'],
  [ch00.contentHtmlEn, 'Value Chain & Foundry 2.0 Clauses', 'Quantitative Governing Laws & 3D Process Windows', 'wsts-region-billings']
]) {
  const lang = html === ch00.contentHtml ? 'zh' : 'en';
  const rendered = insertSourcedCharts(html, 'ch00', lang);
  assert.equal((rendered.match(/class="sourced-chart"/g) || []).length, 2, '第 0 章要有兩張公開數據圖');
  const figure = figureById(rendered, id);
  assert.ok(rendered.indexOf(before) < rendered.indexOf(`chart-${id}`) && rendered.indexOf(`chart-${id}`) < rendered.indexOf(after), `${id} 要接在指定小標後面`);
  assert.ok(figure.includes(lang === 'zh' ? '公開數據' : 'Published data'), `${id} 要標成公開數據`);
  assert.ok(!figure.includes('未按比例'), `${id} 不使用示意圖徽章`);
}

const worldZh = figureById(insertSourcedCharts(ch00.contentHtml, 'ch00', 'zh'), 'wsts-worldwide-billings');
const worldEn = figureById(insertSourcedCharts(ch00.contentHtmlEn, 'ch00', 'en'), 'wsts-worldwide-billings');
assert.equal(wstsWorldwidePoints.length, 40, '全球帳單只收 1986 到 2025 共 40 個完整年度');
for (const point of wstsWorldwidePoints) {
  for (const cell of [point.year, point.cell, point.usdText]) {
    assert.ok(worldZh.includes(cell) && worldEn.includes(cell), `全球帳單表要保留 ${cell}`);
  }
}
assert.ok(worldZh.includes('https://www.wsts.org/67/Historical-Billings-Report'), '全球帳單要附上 WSTS 頁面');
assert.ok(worldZh.includes('WSTS-Historical-Billings-Report-Aug_2026.xlsx') && worldEn.includes('Monthly Data'), '全球帳單要附上試算表與工作表');
assert.ok(worldZh.includes('width:100.00%') && worldZh.includes('width:3.31%') && worldZh.includes('width:79.25%') && worldZh.includes('width:17.47%'), '2025 年是滿條，1986、2001、2024 按同一比例');
assert.ok(worldZh.includes('不是晶圓廠產能') && worldEn.includes('not fab capacity'), '帳單金額不能被讀成產能');
assert.ok(!worldZh.includes('<th scope="row">2026</th>') && !worldEn.includes('<th scope="row">2026</th>'), '不把不完整的 2026 年放進表');
assert.ok(!worldZh.includes('1043024817') && !worldZh.includes('1,043,024,817'), '不寫出 2026 年未完成的合計');
assert.ok(worldZh.includes('3MMA') && worldEn.includes('three-month moving average'), '要寫明沒有使用三個月移動平均');

const regionZh = figureById(insertSourcedCharts(ch00.contentHtml, 'ch00', 'zh'), 'wsts-region-billings');
const regionEn = figureById(insertSourcedCharts(ch00.contentHtmlEn, 'ch00', 'en'), 'wsts-region-billings');
const sumByYear = year => wstsRegionPoints.filter(point => point.year === year).reduce((sum, point) => sum + point.usdThousand, 0);
assert.equal(sumByYear('2024'), 630548606, '2024 四區相加要等於 Worldwide N238');
assert.equal(sumByYear('2025'), 795640305, '2025 四區相加要等於 Worldwide N244');
for (const point of wstsRegionPoints) {
  for (const cell of [point.region, point.cell, point.usdText]) {
    assert.ok(regionZh.includes(cell) && regionEn.includes(cell), `分區帳單表要保留 ${cell}`);
  }
}
assert.ok(regionZh.includes('width:100.00%') && regionZh.includes('width:44.37%') && regionZh.includes('width:10.17%'), '2025 Asia Pacific 是滿條，其餘地區按同一比例');
assert.ok(regionZh.includes('不是晶圓廠所在地') && regionEn.includes('not fab locations'), '分區是帳單地區');
assert.ok(!regionZh.includes('<th scope="row">2026</th>'), '分區表不收 2026');

function assertRd(chapter, id, before, after, beforeEn, afterEn, points, extra) {
  const zh = insertSourcedCharts(chapter.contentHtml, chapter.id, 'zh');
  const en = insertSourcedCharts(chapter.contentHtmlEn, chapter.id, 'en');
  assert.equal((zh.match(/class="sourced-chart"/g) || []).length, 1, `${chapter.id} 中文要有一張公開數據圖`);
  assert.equal((en.match(/class="sourced-chart"/g) || []).length, 1, `${chapter.id} 英文要有一張公開數據圖`);
  const figureZh = figureById(zh, id);
  const figureEn = figureById(en, id);
  assert.ok(zh.indexOf(before) < zh.indexOf(`chart-${id}`) && zh.indexOf(`chart-${id}`) < zh.indexOf(after), `${id} 要接在中文小標後面`);
  assert.ok(en.indexOf(beforeEn) < en.indexOf(`chart-${id}`) && en.indexOf(`chart-${id}`) < en.indexOf(afterEn), `${id} 要接在英文小標後面`);
  for (const point of points) {
    for (const cell of [point.end, point.valueText, point.filed, point.accn]) {
      assert.ok(figureZh.includes(cell) && figureEn.includes(cell), `${id} 要保留 ${cell}`);
    }
  }
  assert.ok(figureZh.includes('公開數據') && figureEn.includes('Published data'), `${id} 要標成公開數據`);
  assert.ok(!figureZh.includes('未按比例'), `${id} 不使用示意圖徽章`);
  extra(figureZh, figureEn);
}

assertRd(ch04, 'asml-rd-expense', 'EUV：最先進的微影', '對準：每一層都要對得剛好', 'EUV: the most advanced lithography', 'Alignment: every layer must line up exactly', asmlRdPoints, (zh, en) => {
  assert.ok(zh.includes('https://data.sec.gov/api/xbrl/companyfacts/CIK0000937966.json') && en.includes('ResearchAndDevelopmentExpense'), 'ASML 圖要附上 SEC 路徑');
  assert.ok(zh.includes('width:100.00%') && zh.includes('width:41.89%'), 'ASML 2025 年是滿條，2019 年按同一比例');
  assert.ok(zh.includes('不是一台 EUV 曝光機的售價') && en.includes('not the price of one EUV scanner'), '研發費用不能被讀成曝光機售價');
  assert.ok(!zh.includes('2018-12-31') && !zh.includes('2016-12-31'), '不把沒有當年 20-F 列的年度放進 ASML 表');
});

assertRd(ch06, 'lam-rd-expense', '電漿：蝕刻的工具', '蝕刻要看哪些指標', 'Plasma: the etching tool', 'What to measure in etching', lamRdPoints, (zh, en) => {
  assert.ok(zh.includes('https://data.sec.gov/api/xbrl/companyfacts/CIK0000707549.json') && en.includes('LAM RESEARCH CORPORATION'), 'Lam 圖要附上 SEC 路徑');
  assert.ok(zh.includes('width:100.00%') && zh.includes('width:15.71%'), 'Lam 2026 會計年度是滿條，2011 年按同一比例');
  assert.ok(zh.includes('會計年度在 6 月結束') && en.includes('fiscal year ends in June'), '要寫明 Lam 的會計年度在 6 月結束');
  assert.ok(zh.includes('不是一台蝕刻機的售價') && en.includes('not the price of one etch tool'), '研發費用不能被讀成蝕刻機售價');
});

assertRd(ch14, 'tsmc-rd-expense', '微縮不只靠製程', '成熟製程一樣重要', 'Scaling is not only about the process', 'Mature processes matter just as much', tsmcRdPoints, (zh, en) => {
  assert.ok(zh.includes('units.TWD') && en.includes('ResearchAndDevelopmentExpense.units.TWD'), '台積電研發費用要用新台幣列');
  assert.ok(zh.includes('width:100.00%') && zh.includes('width:39.54%'), '台積電 2024 年研發費用是滿條，2017 年按同一比例');
  assert.ok(zh.includes('不是某一奈米節點的成本') && en.includes('not the cost of one nanometer node'), '研發費用不能被讀成節點成本');
  assert.ok(!zh.includes('6,227,000,000') && !en.includes('6,227,000,000'), '不混入 20-F 的美元方便換算');
  assert.ok(!zh.includes('<th scope="row">2016-12-31</th>'), '不把只有比較欄的 2016 年放進表');
});

console.log('[PASS] 公開數據圖只使用已核對的出貨表、20-F 金額、WSTS Total Year 與年報研發費用，並附上資料表');
