import assert from 'node:assert/strict';
import { insertSourcedCharts, SOURCED_CHARTS } from '../sourced-charts.js';
import { chapter as ch01 } from '../data/chapters/ch01.js';
import { chapter as ch03 } from '../data/chapters/ch03.js';
import { chapter as ch14 } from '../data/chapters/ch14.js';

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

const untouched = insertSourcedCharts(ch14.contentHtml, 'ch14', 'zh');
assert.equal((untouched.match(/sourced-chart/g) || []).length, 0, '沒有可核對序列的章節不補圖');

console.log('[PASS] 公開數據圖只使用已核對的出貨表與 20-F 金額，並附上資料表');
