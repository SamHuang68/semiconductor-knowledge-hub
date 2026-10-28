const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function group(value) {
  const [whole, frac] = String(value).split('.');
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return frac ? `${withCommas}.${frac}` : withCommas;
}

function bars(points, valueKey, textKey, unit, labelKey = 'year') {
  const max = Math.max(...points.map(point => point[valueKey]));
  return points.map(point => {
    const width = max > 0 ? (point[valueKey] / max) * 100 : 0;
    const label = String(point[labelKey]);
    const wide = label.length > 4 ? ' sourced-bar-wide' : '';
    return `<div class="sourced-bar${wide}"><span class="sourced-bar-year">${esc(label)}</span><span class="sourced-bar-track"><span class="sourced-bar-fill" style="width:${width.toFixed(2)}%"></span></span><span class="sourced-bar-value">${esc(point[textKey])} ${esc(unit)}</span></div>`;
  }).join('');
}

const WAFER_URL = 'https://www.prnewswire.com/news-releases/worldwide-silicon-wafer-shipments-and-revenue-start-recovery-in-late-2024-semi-reports-302375339.html';
const TSMC_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001046179.json';
const WSTS_PAGE = 'https://www.wsts.org/67/Historical-Billings-Report';
const WSTS_XLSX = 'https://www.wsts.org/esraCMS/extension/media/f/WST/7803/WSTS-Historical-Billings-Report-Aug_2026.xlsx';

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

export const wstsWorldwidePoints = [
  { year: '1986', row: 10, cell: 'N10', usdThousand: 26355359 },
  { year: '1987', row: 16, cell: 'N16', usdThousand: 32530452 },
  { year: '1988', row: 22, cell: 'N22', usdThousand: 45004809 },
  { year: '1989', row: 28, cell: 'N28', usdThousand: 48762926 },
  { year: '1990', row: 34, cell: 'N34', usdThousand: 50518932 },
  { year: '1991', row: 40, cell: 'N40', usdThousand: 54607454 },
  { year: '1992', row: 46, cell: 'N46', usdThousand: 59864958 },
  { year: '1993', row: 52, cell: 'N52', usdThousand: 77309681 },
  { year: '1994', row: 58, cell: 'N58', usdThousand: 101878593 },
  { year: '1995', row: 64, cell: 'N64', usdThousand: 144403681 },
  { year: '1996', row: 70, cell: 'N70', usdThousand: 131966432 },
  { year: '1997', row: 76, cell: 'N76', usdThousand: 137203120 },
  { year: '1998', row: 82, cell: 'N82', usdThousand: 125611999 },
  { year: '1999', row: 88, cell: 'N88', usdThousand: 149378551 },
  { year: '2000', row: 94, cell: 'N94', usdThousand: 204393623 },
  { year: '2001', row: 100, cell: 'N100', usdThousand: 138962610 },
  { year: '2002', row: 106, cell: 'N106', usdThousand: 140713320 },
  { year: '2003', row: 112, cell: 'N112', usdThousand: 166425522 },
  { year: '2004', row: 118, cell: 'N118', usdThousand: 213026836 },
  { year: '2005', row: 124, cell: 'N124', usdThousand: 227484137 },
  { year: '2006', row: 130, cell: 'N130', usdThousand: 247716193 },
  { year: '2007', row: 136, cell: 'N136', usdThousand: 255645338 },
  { year: '2008', row: 142, cell: 'N142', usdThousand: 248602812 },
  { year: '2009', row: 148, cell: 'N148', usdThousand: 226313366 },
  { year: '2010', row: 154, cell: 'N154', usdThousand: 298315115 },
  { year: '2011', row: 160, cell: 'N160', usdThousand: 299521338 },
  { year: '2012', row: 166, cell: 'N166', usdThousand: 291562116 },
  { year: '2013', row: 172, cell: 'N172', usdThousand: 305583864 },
  { year: '2014', row: 178, cell: 'N178', usdThousand: 335842917 },
  { year: '2015', row: 184, cell: 'N184', usdThousand: 335167861 },
  { year: '2016', row: 190, cell: 'N190', usdThousand: 338930855 },
  { year: '2017', row: 196, cell: 'N196', usdThousand: 412220944 },
  { year: '2018', row: 202, cell: 'N202', usdThousand: 468778285 },
  { year: '2019', row: 208, cell: 'N208', usdThousand: 412306976 },
  { year: '2020', row: 214, cell: 'N214', usdThousand: 440389358 },
  { year: '2021', row: 220, cell: 'N220', usdThousand: 555892514 },
  { year: '2022', row: 226, cell: 'N226', usdThousand: 574084194 },
  { year: '2023', row: 232, cell: 'N232', usdThousand: 526885425 },
  { year: '2024', row: 238, cell: 'N238', usdThousand: 630548606 },
  { year: '2025', row: 244, cell: 'N244', usdThousand: 795640305 }
].map(point => ({ ...point, usdText: group(point.usdThousand), usdValue: point.usdThousand }));

export const wstsRegionPoints = [
  { year: '2024', region: 'Americas', cell: 'N234', usdThousand: 195122507 },
  { year: '2024', region: 'Europe', cell: 'N235', usdThousand: 51250218 },
  { year: '2024', region: 'Japan', cell: 'N236', usdThousand: 46739287 },
  { year: '2024', region: 'Asia Pacific', cell: 'N237', usdThousand: 337436594 },
  { year: '2025', region: 'Americas', cell: 'N240', usdThousand: 256476450 },
  { year: '2025', region: 'Europe', cell: 'N241', usdThousand: 54694054 },
  { year: '2025', region: 'Japan', cell: 'N242', usdThousand: 44723219 },
  { year: '2025', region: 'Asia Pacific', cell: 'N243', usdThousand: 439746582 }
].map(point => ({
  ...point,
  barLabel: `${point.year} ${point.region}`,
  usdText: group(point.usdThousand),
  usdValue: point.usdThousand
}));

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
  },
  {
    id: 'wsts-worldwide-billings',
    chapterId: 'ch00',
    headingZh: '誰負責什麼：半導體產業的分工',
    headingEn: 'Who does what: how the industry divides the work',
    titleZh: 'WSTS 全球半導體帳單金額（完整年度）',
    titleEn: 'WSTS worldwide semiconductor billings, full years',
    noteZh: '這是 WSTS Blue Book 的全球帳單金額，不是晶圓廠產能，也不是某一家公司的營收。單位沿用試算表寫的 1000 US$（千美元）。表上的整數就是 Total Year 儲存格，沒有改成十億美元，也沒有把各月再加一次。',
    noteEn: 'These are WSTS Blue Book worldwide billings, not fab capacity and not one company’s revenue. The unit is the workbook’s 1000 US$. Each integer is the Total Year cell, not a conversion into billions and not a sum of the months.',
    url: WSTS_PAGE,
    fileUrl: WSTS_XLSX,
    locatorZh: '頁面 Historical Billings Report 上的免費檔 WSTS-Historical-Billings-Report-Aug_2026.xlsx。工作表 Monthly Data。第 3 列寫 All numbers are in 1000 US$. 第 4 列的 Total Year 是第 14 欄（欄名 N）。每一列的列名是 Worldwide。只收 December 有數字的年度：1986 到 2025。',
    locatorEn: 'Free file WSTS-Historical-Billings-Report-Aug_2026.xlsx on the Historical Billings Report page. Sheet: Monthly Data. Row 3 says All numbers are in 1000 US$. Row 4 names Total Year in column 14 (column N). Each row label is Worldwide. Only years with a December value are included: 1986 through 2025.',
    footnoteZh: '同一檔還有 2026 年的列，但 December 是空的，Total Year 不是完整年度，所以沒有畫進來。3MMA 工作表是三個月移動平均，這張圖不用那一張。',
    footnoteEn: 'The same file has 2026 rows, but December is empty, so that Total Year is not a full year and is left out. The 3MMA sheet is a three-month moving average and is not used here.',
    render(lang) {
      const en = lang === 'en';
      const yearLabel = en ? 'Year' : '年';
      const cellLabel = en ? 'Cell' : '儲存格';
      const valueLabel = en ? 'Thousands of US dollars' : '千美元';
      const rows = wstsWorldwidePoints.map(point => `<tr><th scope="row">${point.year}</th><td>${point.cell}</td><td>${point.usdText}</td></tr>`).join('');
      return `<figure class="sourced-chart" id="chart-${this.id}">
        <figcaption>
          <span class="sourced-badge">${en ? 'Published data' : '公開數據'}</span>
          <span class="figure-caption">${esc(en ? this.titleEn : this.titleZh)}</span>
          <span class="figure-source">${esc(en ? this.noteEn : this.noteZh)}</span>
          <span class="figure-source"><a href="${esc(this.url)}" rel="noopener noreferrer">${en ? 'WSTS Historical Billings Report' : 'WSTS Historical Billings Report'}</a></span>
          <span class="sourced-url">${esc(this.url)}</span>
          <span class="figure-source"><a href="${esc(this.fileUrl)}" rel="noopener noreferrer">${en ? 'Workbook .xlsx' : '試算表 .xlsx'}</a></span>
          <span class="sourced-url">${esc(this.fileUrl)}</span>
          <span class="figure-source">${esc(en ? this.locatorEn : this.locatorZh)}</span>
        </figcaption>
        <div class="sourced-plot" aria-hidden="true">
          <p class="sourced-plot-title">${esc(valueLabel)}</p>
          ${bars(wstsWorldwidePoints, 'usdValue', 'usdText', en ? 'US$ thousand' : '千美元')}
        </div>
        <div class="table-container">
          <table class="semi-table sourced-data-table">
            <caption>${esc(en ? this.titleEn : this.titleZh)}</caption>
            <thead><tr><th scope="col">${yearLabel}</th><th scope="col">${cellLabel}</th><th scope="col">${esc(valueLabel)}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p class="figure-source">${esc(en ? this.footnoteEn : this.footnoteZh)}</p>
      </figure>`;
    }
  },
  {
    id: 'wsts-region-billings',
    chapterId: 'ch00',
    headingZh: '價值鏈與 Foundry 2.0 條例總覽',
    headingEn: 'Value Chain & Foundry 2.0 Clauses',
    titleZh: 'WSTS 各地區半導體帳單金額（2024 與 2025）',
    titleEn: 'WSTS semiconductor billings by region, 2024 and 2025',
    noteZh: '地區名稱沿用試算表的列名。這是帳單地區，不是晶圓廠所在地，也不是產能占比。2024 年四區相加等於 Worldwide 儲存格 N238；2025 年四區相加等於 N244。',
    noteEn: 'Region names are the workbook row labels. These are billing regions, not fab locations and not capacity share. The four 2024 regions add up to the Worldwide cell N238; the four 2025 regions add up to N244.',
    url: WSTS_PAGE,
    fileUrl: WSTS_XLSX,
    locatorZh: '同一份 WSTS-Historical-Billings-Report-Aug_2026.xlsx，工作表 Monthly Data，Total Year 欄（第 14 欄，欄名 N）。列名是 Americas、Europe、Japan、Asia Pacific。單位是 1000 US$。只列 December 有數字、而且四區相加等於 Worldwide 的 2024 與 2025。',
    locatorEn: 'The same WSTS-Historical-Billings-Report-Aug_2026.xlsx, sheet Monthly Data, Total Year column (column 14, column N). Row labels: Americas, Europe, Japan, Asia Pacific. Unit: 1000 US$. Only 2024 and 2025 are shown: December is filled in, and the four regions add up to Worldwide.',
    render(lang) {
      const en = lang === 'en';
      const yearLabel = en ? 'Year' : '年';
      const regionLabel = en ? 'Row label' : '列名';
      const cellLabel = en ? 'Cell' : '儲存格';
      const valueLabel = en ? 'Thousands of US dollars' : '千美元';
      const rows = wstsRegionPoints.map(point => `<tr><th scope="row">${point.year}</th><td>${esc(point.region)}</td><td>${point.cell}</td><td>${point.usdText}</td></tr>`).join('');
      return `<figure class="sourced-chart" id="chart-${this.id}">
        <figcaption>
          <span class="sourced-badge">${en ? 'Published data' : '公開數據'}</span>
          <span class="figure-caption">${esc(en ? this.titleEn : this.titleZh)}</span>
          <span class="figure-source">${esc(en ? this.noteEn : this.noteZh)}</span>
          <span class="figure-source"><a href="${esc(this.url)}" rel="noopener noreferrer">${en ? 'WSTS Historical Billings Report' : 'WSTS Historical Billings Report'}</a></span>
          <span class="sourced-url">${esc(this.url)}</span>
          <span class="figure-source"><a href="${esc(this.fileUrl)}" rel="noopener noreferrer">${en ? 'Workbook .xlsx' : '試算表 .xlsx'}</a></span>
          <span class="sourced-url">${esc(this.fileUrl)}</span>
          <span class="figure-source">${esc(en ? this.locatorEn : this.locatorZh)}</span>
        </figcaption>
        <div class="sourced-plot" aria-hidden="true">
          <p class="sourced-plot-title">${esc(valueLabel)}</p>
          ${bars(wstsRegionPoints, 'usdValue', 'usdText', en ? 'US$ thousand' : '千美元', 'barLabel')}
        </div>
        <div class="table-container">
          <table class="semi-table sourced-data-table">
            <caption>${esc(en ? this.titleEn : this.titleZh)}</caption>
            <thead><tr><th scope="col">${yearLabel}</th><th scope="col">${regionLabel}</th><th scope="col">${cellLabel}</th><th scope="col">${esc(valueLabel)}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
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
