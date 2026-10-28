const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function group(value) {
  const [whole, frac] = String(value).split('.');
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return frac ? `${withCommas}.${frac}` : withCommas;
}

function bars(points, valueKey, textKey, unit) {
  const max = Math.max(...points.map(point => point[valueKey]));
  return points.map(point => {
    const width = max > 0 ? (point[valueKey] / max) * 100 : 0;
    return `<div class="sourced-bar"><span class="sourced-bar-year">${esc(point.year)}</span><span class="sourced-bar-track"><span class="sourced-bar-fill" style="width:${width.toFixed(2)}%"></span></span><span class="sourced-bar-value">${esc(point[textKey])} ${esc(unit)}</span></div>`;
  }).join('');
}

const WAFER_URL = 'https://www.prnewswire.com/news-releases/worldwide-silicon-wafer-shipments-and-revenue-start-recovery-in-late-2024-semi-reports-302375339.html';
const TSMC_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001046179.json';

const waferPoints = [
  { year: '2020', areaValue: 12407, areaText: '12,407', revenueValue: 11.2, revenueText: '11.2' },
  { year: '2021', areaValue: 14165, areaText: '14,165', revenueValue: 12.6, revenueText: '12.6' },
  { year: '2022', areaValue: 14713, areaText: '14,713', revenueValue: 13.8, revenueText: '13.8' },
  { year: '2023', areaValue: 12602, areaText: '12,602', revenueValue: 12.3, revenueText: '12.3' },
  { year: '2024', areaValue: 12266, areaText: '12,266', revenueValue: 11.5, revenueText: '11.5' }
];

const ppePoints = [
  { year: '2017', usd: 11153400000, filed: '2018-04-19', accn: '0001193125-18-121866' },
  { year: '2018', usd: 10309800000, filed: '2019-04-17', accn: '0001193125-19-108390' },
  { year: '2019', usd: 15393600000, filed: '2020-04-15', accn: '0001193125-20-107579' },
  { year: '2020', usd: 18064100000, filed: '2021-04-16', accn: '0001193125-21-118512' },
  { year: '2021', usd: 30252200000, filed: '2022-04-14', accn: '0001193125-22-104891' },
  { year: '2022', usd: 35231800000, filed: '2023-04-20', accn: '0001193125-23-107214' },
  { year: '2023', usd: 31019500000, filed: '2024-04-18', accn: '0001193125-24-099840' },
  { year: '2024', usd: 29155400000, filed: '2025-04-17', accn: '0001193125-25-083423' }
].map(point => ({ ...point, usdText: group(point.usd), usdValue: point.usd }));

export const SOURCED_CHARTS = [
  {
    id: 'semi-wafer-shipments',
    chapterId: 'ch03',
    headingZh: '晶圓尺寸',
    headingEn: 'Wafer sizes',
    titleZh: '全球矽晶圓出貨面積與營收',
    titleEn: 'Worldwide silicon wafer shipments and revenue',
    noteZh: '這張表是出貨面積與營收，不是晶圓直徑。數字只取自下面這張表，沒有把增減百分比再算一次。',
    noteEn: 'This table is shipment area and revenue, not wafer diameter. The numbers are copied from the cited table, with no recalculated percentages.',
    url: WAFER_URL,
    locatorZh: 'SEMI Silicon Manufacturers Group 年終分析，2025 年 2 月。表格名稱 Annual Silicon* Industry Trends。Source: SEMI (www.semi.org), February 2025。這份 SEMI 新聞稿由 PR Newswire 刊出，上列網址回傳這張表。',
    locatorEn: 'SEMI Silicon Manufacturers Group year-end analysis, February 2025. Table name: Annual Silicon* Industry Trends. Source line: SEMI (www.semi.org), February 2025. This SEMI release is published on PR Newswire, and the URL above returns that table.',
    footnoteZh: '新聞稿註記：數據包含晶圓廠商出給終端使用者的拋光矽晶圓（含全新測試晶圓）、磊晶矽晶圓，以及未拋光矽晶圓。只計半導體用途，不含太陽能。',
    footnoteEn: 'Release note: the data include polished silicon wafers, including virgin test wafers, epitaxial silicon wafers, and non-polished silicon wafers shipped by wafer manufacturers to end users. Shipments are for semiconductor applications only and do not include solar applications.',
    render(lang) {
      const en = lang === 'en';
      const areaLabel = en ? 'Area shipments (million square inches)' : '出貨面積（百萬平方英吋）';
      const revenueLabel = en ? 'Revenue (US$ billion)' : '營收（十億美元）';
      const yearLabel = en ? 'Year' : '年';
      const rows = waferPoints.map(point => `<tr><th scope="row">${point.year}</th><td>${point.areaText}</td><td>${point.revenueText}</td></tr>`).join('');
      return `<figure class="sourced-chart" id="chart-${this.id}">
        <figcaption>
          <span class="sourced-badge">${en ? 'Published data' : '公開數據'}</span>
          <span class="figure-caption">${esc(en ? this.titleEn : this.titleZh)}</span>
          <span class="figure-source">${esc(en ? this.noteEn : this.noteZh)}</span>
          <span class="figure-source"><a href="${esc(this.url)}" rel="noopener noreferrer">${en ? 'SEMI release on PR Newswire' : 'SEMI 新聞稿（PR Newswire）'}</a></span>
          <span class="sourced-url">${esc(this.url)}</span>
          <span class="figure-source">${esc(en ? this.locatorEn : this.locatorZh)}</span>
        </figcaption>
        <div class="sourced-plot" aria-hidden="true">
          <p class="sourced-plot-title">${esc(areaLabel)}</p>
          ${bars(waferPoints, 'areaValue', 'areaText', en ? 'MSI' : '百萬平方英吋')}
          <p class="sourced-plot-title">${esc(revenueLabel)}</p>
          ${bars(waferPoints, 'revenueValue', 'revenueText', en ? 'US$ billion' : '十億美元')}
        </div>
        <div class="table-container">
          <table class="semi-table sourced-data-table">
            <caption>${esc(en ? this.titleEn : this.titleZh)}</caption>
            <thead><tr><th scope="col">${yearLabel}</th><th scope="col">${esc(areaLabel)}</th><th scope="col">${esc(revenueLabel)}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p class="figure-source">${esc(en ? this.footnoteEn : this.footnoteZh)}</p>
      </figure>`;
    }
  },
  {
    id: 'tsmc-ppe-purchases',
    chapterId: 'ch01',
    headingZh: '機台：工廠的主角',
    headingEn: 'Tools: the stars of the fab',
    titleZh: '台積電購置不動產、廠房及設備付出的現金',
    titleEn: 'Cash TSMC paid to acquire property, plant and equipment',
    noteZh: '這是合併報表現金流量表上的購置金額，單位是美元。它不是單一機台的價格，也不是另一套名為資本支出的口徑。',
    noteEn: 'This is the consolidated cash-flow amount paid to acquire property, plant and equipment, in US dollars. It is not the price of one tool, and it is not a different figure labeled capital expenditure.',
    url: TSMC_URL,
    locatorZh: 'SEC Company Facts，CIK 0001046179。路徑 facts.ifrs-full.PurchaseOfPropertyPlantAndEquipmentClassifiedAsInvestingActivities.units.USD。只取 form 為 20-F、fp 為 FY 的列。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0001046179. Path: facts.ifrs-full.PurchaseOfPropertyPlantAndEquipmentClassifiedAsInvestingActivities.units.USD. Only rows with form 20-F and fp FY are used. The amount, filing date, and accession are in the table.',
    fxNoteZh: '台積電以新台幣編製報表。表上的美元是各年 20-F 依年底匯率做的方便換算，年與年的變化有一部分來自匯率。',
    fxNoteEn: 'TSMC reports in NT dollars. The US dollar amounts are the 20-F convenience translations at each year-end exchange rate, so year-over-year changes partly reflect currency moves.',
    render(lang) {
      const en = lang === 'en';
      const yearLabel = en ? 'Fiscal year' : '會計年度';
      const usdLabel = en ? 'US dollars' : '美元';
      const filedLabel = en ? '20-F filed' : '20-F 申報日';
      const rows = ppePoints.map(point => `<tr><th scope="row">${point.year}</th><td>${point.usdText}</td><td>${point.filed}</td><td>${point.accn}</td></tr>`).join('');
      return `<figure class="sourced-chart" id="chart-${this.id}">
        <figcaption>
          <span class="sourced-badge">${en ? 'Published data' : '公開數據'}</span>
          <span class="figure-caption">${esc(en ? this.titleEn : this.titleZh)}</span>
          <span class="figure-source">${esc(en ? this.noteEn : this.noteZh)}</span>
          <span class="figure-source"><a href="${esc(this.url)}" rel="noopener noreferrer">${en ? 'SEC Company Facts JSON' : 'SEC Company Facts JSON'}</a></span>
          <span class="sourced-url">${esc(this.url)}</span>
          <span class="figure-source">${esc(en ? this.locatorEn : this.locatorZh)}</span>
        </figcaption>
        <div class="sourced-plot" aria-hidden="true">
          <p class="sourced-plot-title">${esc(usdLabel)}</p>
          ${bars(ppePoints, 'usd', 'usdText', 'USD')}
        </div>
        <div class="table-container">
          <table class="semi-table sourced-data-table">
            <caption>${esc(en ? this.titleEn : this.titleZh)}</caption>
            <thead><tr><th scope="col">${yearLabel}</th><th scope="col">${esc(usdLabel)}</th><th scope="col">${filedLabel}</th><th scope="col">accession</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p class="figure-source">${esc(en ? this.fxNoteEn : this.fxNoteZh)}</p>
      </figure>`;
    }
  }
];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function insertSourcedCharts(html, chapterId, lang) {
  let next = String(html);
  const en = lang === 'en';
  for (const chart of SOURCED_CHARTS) {
    if (chart.chapterId !== chapterId) continue;
    const heading = en ? chart.headingEn : chart.headingZh;
    const pattern = new RegExp(`(<h2\\b[^>]*>[\\s\\S]*?${escapeRegExp(heading)}[\\s\\S]*?</h2>)`);
    next = next.replace(pattern, `$1${chart.render(lang)}`);
  }
  return next;
}
