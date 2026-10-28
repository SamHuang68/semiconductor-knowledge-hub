import assert from 'node:assert/strict';
import { acmrRdPoints, amatRdPoints, amkorRdPoints, asmlRdPoints, axcelisRdPoints, entgRdPoints, formfactorRdPoints, insertSourcedCharts, klaRdPoints, lamRdPoints, micronRevenuePoints, SOURCED_CHARTS, tsmcRdPoints, wstsRegionPoints, wstsWorldwidePoints } from '../sourced-charts.js';
import { chapter as ch00 } from '../data/chapters/ch00.js';
import { chapter as ch01 } from '../data/chapters/ch01.js';
import { chapter as ch03 } from '../data/chapters/ch03.js';
import { chapter as ch04 } from '../data/chapters/ch04.js';
import { chapter as ch05 } from '../data/chapters/ch05.js';
import { chapter as ch06 } from '../data/chapters/ch06.js';
import { chapter as ch07 } from '../data/chapters/ch07.js';
import { chapter as ch08 } from '../data/chapters/ch08.js';
import { chapter as ch09 } from '../data/chapters/ch09.js';
import { chapter as ch13 } from '../data/chapters/ch13.js';
import { chapter as ch14 } from '../data/chapters/ch14.js';
import { chapter as ch15 } from '../data/chapters/ch15.js';
import { chapter as ch16 } from '../data/chapters/ch16.js';
import { chapter as ch19 } from '../data/chapters/ch19.js';
import { chapter as ch20 } from '../data/chapters/ch20.js';

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

const untouched = insertSourcedCharts(ch16.contentHtml, 'ch16', 'zh');
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
  assert.ok(zh.includes('width:100.00%') && zh.includes('width:41.89%') && zh.includes('width:12.56%'), 'ASML 2025 年是滿條，2019 與 2011 年按同一比例');
  assert.ok(zh.includes('不是一台 EUV 曝光機的售價') && en.includes('not the price of one EUV scanner'), '研發費用不能被讀成曝光機售價');
  assert.ok(zh.includes('2011 到 2013') && zh.includes('2014 只出現在該年自己的 20-F') && en.includes('2014 appears only in that year’s own 20-F') && en.includes('The row after 2014 is 2019'), '註腳要分開寫 2011 到 2013 的比較欄，以及 2014 只在當年 20-F');
  assert.ok(!zh.includes('2011 到 2014 是該年自己的 20-F') && !en.includes('2011 through 2014 are that year’s own 20-F'), '不能再把 2014 說成較晚 20-F 也有相同金額');
  assert.ok(zh.indexOf('2014-12-31') < zh.indexOf('2019-12-31'), '2014 的下一列是 2019');
  assert.ok(!zh.includes('2018-12-31') && !zh.includes('2016-12-31') && !zh.includes('2015-12-31') && !zh.includes('2017-12-31'), '不把沒有當年 20-F 列的年度放進 ASML 表');
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

function barWidth(points, value) {
  const max = Math.max(...points.map(point => point.value));
  return ((value / max) * 100).toFixed(2);
}

assertRd(ch05, 'amat-rd-expense', '為什麼需要薄膜', '熱氧化：讓矽自己長出氧化層', 'Why thin films are needed', 'Thermal oxidation: letting silicon grow its own oxide', amatRdPoints, (zh, en) => {
  assert.ok(zh.includes('https://data.sec.gov/api/xbrl/companyfacts/CIK0000006951.json') && en.includes('APPLIED MATERIALS INC /DE'), 'Applied Materials 圖要附上 SEC 路徑');
  assert.ok(zh.includes(`width:${barWidth(amatRdPoints, 3570000000)}%`) && zh.includes(`width:${barWidth(amatRdPoints, 1118000000)}%`), 'Applied Materials 2025 會計年度是滿條，2011 年按同一比例');
  assert.ok(zh.includes('不是一台 CVD、PVD 或 ALD 機台的售價') && en.includes('not the price of one CVD, PVD, or ALD tool'), '研發費用不能被讀成機台售價');
  assert.ok(zh.includes('會計年度在 10 月結束') && en.includes('fiscal year ends in October'), '要寫明 Applied Materials 的會計年度在 10 月結束');
  assert.ok(zh.includes('1,774,000,000') && zh.includes('1,781,000,000') && en.includes('2,022,000,000'), '註腳要寫出 2017 與 2018 兩套不一致的金額');
  assert.ok(!zh.includes('<th scope="row">2017-10-29</th>') && !zh.includes('<th scope="row">2018-10-28</th>') && !zh.includes('<th scope="row">2009-10-25</th>'), '不一致的年度不放進 Applied Materials 表');
  assert.ok(zh.indexOf('2016-10-30') < zh.indexOf('2019-10-27'), '2016 的下一列是 2019');
});

assertRd(ch07, 'axcelis-rd-expense', '佈植機怎麼運作', '兩個最重要的參數', 'How an implanter works', 'The two most important parameters', axcelisRdPoints, (zh, en) => {
  assert.ok(zh.includes('https://data.sec.gov/api/xbrl/companyfacts/CIK0001113232.json') && en.includes('AXCELIS TECHNOLOGIES INC'), 'Axcelis 圖要附上 SEC 路徑');
  assert.ok(zh.includes(`width:${barWidth(axcelisRdPoints, 108958000)}%`) && zh.includes(`width:${barWidth(axcelisRdPoints, 32586000)}%`), 'Axcelis 2025 年是滿條，2015 年按同一比例');
  assert.ok(zh.includes('不是一台離子佈植機的售價') && en.includes('not the price of one ion implanter'), '研發費用不能被讀成佈植機售價');
  assert.ok(zh.includes('33,533,000') && zh.includes('0001047469-15-002063') && en.includes('10-K/A'), '註腳要寫出 2014 年 10-K/A 的金額與 accession');
  assert.ok(!zh.includes('<th scope="row">2014-12-31</th>'), '2014 年不放進 Axcelis 表');
  assert.ok(zh.indexOf('2013-12-31') < zh.indexOf('2015-12-31'), '2013 的下一列是 2015');
});

assertRd(ch13, 'micron-contract-revenue', '記憶體和邏輯晶片有什麼不同', 'DRAM：一個電晶體加一個電容', 'How memory differs from logic', 'DRAM: one transistor and one capacitor', micronRevenuePoints, (zh, en) => {
  assert.ok(zh.includes('https://data.sec.gov/api/xbrl/companyfacts/CIK0000723125.json') && en.includes('RevenueFromContractWithCustomerExcludingAssessedTax'), 'Micron 圖要附上 SEC 路徑');
  assert.ok(zh.includes(`width:${barWidth(micronRevenuePoints, 133188000000)}%`) && zh.includes(`width:${barWidth(micronRevenuePoints, 15540000000)}%`), 'Micron 2026 會計年度是滿條，2023 年按同一比例');
  assert.ok(zh.includes('不是單列 DRAM') && en.includes('not DRAM alone'), '合併收入不能被讀成單列 DRAM');
  assert.ok(zh.includes('2018-08-31') && zh.includes('2026-09-03') && en.includes('late August or early September'), '表上要有期初與期末，並寫明會計年度不是日曆年底');
  assert.ok(!zh.includes('6,056,000,000') && !zh.includes('4,870,000,000'), '不把標成 FY 的季度金額放進 Micron 表');
  assert.ok(!zh.includes('<th scope="row">2017-09-01</th>'), '不把只有比較欄的 2018 會計年度放進表');
});

assertRd(ch15, 'kla-rd-expense', '量測與檢測不一樣', '常見的量測', 'Metrology and inspection are not the same', 'Common measurements', klaRdPoints, (zh, en) => {
  assert.ok(zh.includes('https://data.sec.gov/api/xbrl/companyfacts/CIK0000319201.json') && en.includes('KLA Corporation'), 'KLA 圖要附上 SEC 路徑');
  assert.ok(zh.includes(`width:${barWidth(klaRdPoints, 1532118000)}%`) && zh.includes(`width:${barWidth(klaRdPoints, 386163000)}%`), 'KLA 2026 會計年度是滿條，2011 年按同一比例');
  assert.ok(zh.includes('不是一台量測機或檢測機的售價') && en.includes('not the price of one metrology or inspection tool'), '研發費用不能被讀成量測機售價');
  assert.ok(zh.includes('會計年度在 6 月 30 日結束') && en.includes('fiscal year ends on 30 June'), '要寫明 KLA 的會計年度在 6 月 30 日結束');
  assert.ok(zh.includes('526,870,000') && zh.includes('526,688,000') && en.includes('608,531,000'), '註腳要寫出 2017 與 2018 兩套不一致的金額');
  assert.ok(!zh.includes('<th scope="row">2017-06-30</th>') && !zh.includes('<th scope="row">2018-06-30</th>'), '不一致的年度不放進 KLA 表');
  assert.ok(zh.indexOf('2016-06-30') < zh.indexOf('2019-06-30'), '2016 的下一列是 2019');
});

assertRd(ch08, 'entg-rd-expense', 'CMP 怎麼運作', 'CMP 用在哪裡', 'How CMP works', 'Where CMP is used', entgRdPoints, (zh, en) => {
  assert.ok(zh.includes('https://data.sec.gov/api/xbrl/companyfacts/CIK0001101302.json') && en.includes('Entegris, Inc.'), 'Entegris 圖要附上 SEC 路徑');
  assert.ok(zh.includes(`width:${barWidth(entgRdPoints, 329000000)}%`) && zh.includes(`width:${barWidth(entgRdPoints, 47980000)}%`), 'Entegris 2025 年是滿條，2011 年按同一比例');
  assert.ok(zh.includes('不是一片研磨墊或研磨液的價格') && en.includes('not the price of one polishing pad or of slurry'), '研發費用不能被讀成研磨墊或研磨液的價格');
  assert.ok(zh.includes('沒有拆成 CMP') && en.includes('not a CMP segment'), '要寫明這是整家公司，不是 CMP 部門');
  assert.ok(zh.includes('277,313,000') && zh.includes('277,300,000') && zh.includes('316,111,000') && en.includes('316,100,000'), '註腳要寫出 2023 與 2024 兩套不一致的金額');
  assert.ok(zh.includes('0001101302-24-000009') && en.includes('0001101302-26-000012'), '註腳要寫出不一致年度的 accession');
  assert.ok(!zh.includes('<th scope="row">2023-12-31</th>') && !zh.includes('<th scope="row">2024-12-31</th>'), '不一致的年度不放進 Entegris 表');
  assert.ok(zh.indexOf('2022-12-31') < zh.indexOf('2025-12-31'), '2022 的下一列是 2025');
});

assertRd(ch09, 'acmr-rd-expense', '怎麼洗', 'Q-Time：清洗的效果會過期', 'How wafers are cleaned', 'Q-time: a clean surface has an expiration date', acmrRdPoints, (zh, en) => {
  assert.ok(zh.includes('https://data.sec.gov/api/xbrl/companyfacts/CIK0001680062.json') && en.includes('ACM Research, Inc.'), 'ACM Research 圖要附上 SEC 路徑');
  assert.ok(zh.includes(`width:${barWidth(acmrRdPoints, 144989000)}%`) && zh.includes(`width:${barWidth(acmrRdPoints, 5138000)}%`), 'ACM Research 2025 年是滿條，2017 年按同一比例');
  assert.ok(zh.includes('不是一台清洗機的售價') && en.includes('not the price of one cleaning tool'), '研發費用不能被讀成清洗機售價');
  assert.ok(zh.includes('濕式清洗、電鍍與先進封裝') && en.includes('wet cleaning, plating, and advanced packaging'), '要寫明業務不只有清洗');
  assert.ok(zh.includes('3,259,000') && zh.includes('0001654954-18-002950') && en.includes('fy 2017'), '註腳要寫出 2016 年比較欄的金額與 accession');
  assert.ok(!zh.includes('<th scope="row">2016-12-31</th>'), '2016 年不放進 ACM Research 表');
  assert.ok(zh.indexOf('2017-12-31') < zh.indexOf('2018-12-31'), '表從 2017 年那份 10-K 起算');
});

assertRd(ch19, 'formfactor-rd-expense', 'CP：一顆一顆測', '測試也是成本', 'CP: testing die by die', 'Testing costs money too', formfactorRdPoints, (zh, en) => {
  assert.ok(zh.includes('https://data.sec.gov/api/xbrl/companyfacts/CIK0001039399.json') && en.includes('FormFactor, Inc.'), 'FormFactor 圖要附上 SEC 路徑');
  assert.ok(zh.includes(`width:${barWidth(formfactorRdPoints, 121938000)}%`) && zh.includes(`width:${barWidth(formfactorRdPoints, 40130000)}%`), 'FormFactor 2024 會計年度是滿條，2012 年按同一比例');
  assert.ok(zh.includes('不是一張探針卡的售價') && en.includes('not the price of one probe card'), '研發費用不能被讀成探針卡售價');
  assert.ok(zh.includes('不是每一年的 12 月 31 日') && en.includes('not 31 December in every year'), '要寫明期末不一定是 12 月 31 日');
  assert.ok(zh.includes('2012-12-29') && zh.includes('2025-12-27') && en.includes('about 90 days'), '表上要有不是 12 月 31 日的期末，並排除標成 FY 的季度數');
  assert.ok(!zh.includes('10,683,000'), '不把標成 FY 的季度金額放進 FormFactor 表');
});

assertRd(ch20, 'amkor-rd-expense', '為什麼要封裝', '傳統封裝的流程', 'Why chips need packages', 'The traditional packaging flow', amkorRdPoints, (zh, en) => {
  assert.ok(zh.includes('https://data.sec.gov/api/xbrl/companyfacts/CIK0001047127.json') && en.includes('AMKOR TECHNOLOGY, INC.'), 'Amkor 圖要附上 SEC 路徑');
  assert.ok(zh.includes(`width:${barWidth(amkorRdPoints, 177473000)}%`) && zh.includes(`width:${barWidth(amkorRdPoints, 47534000)}%`), 'Amkor 2023 年是滿條，2010 年按同一比例');
  assert.ok(zh.includes('不是一顆封裝的價格') && en.includes('not the price of one package'), '研發費用不能被讀成封裝價格');
  assert.ok(zh.includes('委外封裝與測試') && en.includes('combines packaging and test'), '要寫明數字含封裝與測試');
  assert.ok(zh.includes('117,206,000') && zh.includes('117,210,000') && zh.includes('166,614,000') && en.includes('166,627,000'), '註腳要寫出 2016 與 2017 兩套不一致的金額');
  assert.ok(zh.includes('0001047127-17-000011') && en.includes('0001047127-20-000006'), '註腳要寫出不一致年度的 accession');
  assert.ok(!zh.includes('<th scope="row">2016-12-31</th>') && !zh.includes('<th scope="row">2017-12-31</th>'), '不一致的年度不放進 Amkor 表');
  assert.ok(zh.indexOf('2015-12-31') < zh.indexOf('2018-12-31'), '2015 的下一列是 2018');
});

console.log('[PASS] 公開數據圖只使用已核對的出貨表、20-F 金額、WSTS Total Year 與年報研發費用，並附上資料表');
