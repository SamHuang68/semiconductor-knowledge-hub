import { CHAPTERS_DATA } from './data/chapters-data.js';
import { FAB_FLOW_NODES } from './data/fab-flow.js';

const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const ISO_CLASS_05UM = [
  [2, 4],
  [3, 35],
  [4, 352],
  [5, 3520],
  [6, 35200],
  [7, 352000],
  [8, 3520000]
];

function illustrationSlot({ src, alt, caption }) {
  return `<figure class="illus-slot"><img src="${esc(src)}" alt="${esc(alt)}" data-illustrative="true"><figcaption><span class="illus-badge">示意 Illustrative</span>${esc(caption)}</figcaption></figure>`;
}

export function bindIllustrationSlots(root) {
  root.querySelectorAll('.illus-slot img').forEach(img => {
    const showFallback = () => {
      if (!img.isConnected) return;
      const fallback = document.createElement('div');
      fallback.className = 'illus-fallback';
      fallback.setAttribute('role', 'img');
      fallback.setAttribute('aria-label', img.alt);
      const file = (img.getAttribute('src') || '').split('/').pop();
      fallback.innerHTML = `<strong>${esc(file)}</strong><span>${esc(img.alt)}</span>`;
      img.replaceWith(fallback);
    };
    img.addEventListener('error', showFallback);
    if (img.complete && img.naturalWidth === 0) showFallback();
  });
}

function barRow(label, widthPct, value, tone) {
  return `<li><span class="bar-label">${esc(label)}</span><span class="bar-track"><span class="bar-fill ${tone}" style="width:${widthPct}%"></span></span><span class="bar-value">${esc(value)}</span></li>`;
}

function curriculumChart(isEn) {
  const counts = new Map();
  for (const chapter of CHAPTERS_DATA) {
    const label = isEn ? (chapter.partEn || chapter.part) : chapter.part;
    counts.set(label, (counts.get(label) || 0) + 1);
  }
  const rows = [...counts.entries()];
  const max = Math.max(...rows.map(([, count]) => count));
  const bars = rows.map(([label, count]) => barRow(label, Math.round((count / max) * 100), String(count), 'is-wafer')).join('');
  const title = isEn ? 'Chapters in each part' : '各部章節數';
  const source = isEn
    ? 'Source: count of part fields in data/chapters-data.js. Not a market or capacity figure.'
    : '來源：data/chapters-data.js 的 part 欄位計數。不是市場或產能數據。';
  return `<article class="chart-card"><h3>${title}</h3><ul class="bar-chart">${bars}</ul><p class="chart-source">${source}</p></article>`;
}

function isoChart(isEn) {
  const maxLog = Math.log10(ISO_CLASS_05UM.at(-1)[1]);
  const bars = ISO_CLASS_05UM.map(([klass, value]) => {
    const width = Math.max(6, Math.round((Math.log10(value) / maxLog) * 100));
    return barRow(`ISO ${klass}`, width, value.toLocaleString('en-US'), 'is-silicon');
  }).join('');
  const title = isEn ? 'ISO 14644-1 cleanroom classes' : 'ISO 14644-1 潔淨室等級';
  const axis = isEn ? 'Particles / m³ at ≥ 0.5 µm. Bar length is logarithmic; the number is the table value.' : '≥ 0.5 µm 顆粒數 / m³。長條是對數長度，數字是表列值。';
  const source = isEn
    ? 'Source: ISO 14644-1:2015 Table 1, maximum permitted concentration at ≥ 0.5 µm. Published limits, not measurements from this site. Class 1 has no 0.5 µm limit in that table, so it is omitted.'
    : '來源：ISO 14644-1:2015 Table 1，粒徑 ≥ 0.5 µm 的允許最大濃度。這是標準表列值，不是本站量測。Class 1 在該表沒有 0.5 µm 上限，因此未列入。';
  return `<article class="chart-card"><h3>${title}</h3><p class="chart-axis">${axis}</p><ul class="bar-chart">${bars}</ul><p class="chart-source">${source}</p></article>`;
}

function fabFlowStrip(isEn) {
  const items = FAB_FLOW_NODES.map(node => {
    const name = isEn ? node.nameEn : node.nameZh;
    return `<li><a href="#${esc(node.chapterId)}"><span>${esc(String(node.num).padStart(2, '0'))}</span><strong>${esc(name)}</strong></a></li>`;
  }).join('');
  const title = isEn ? 'Twelve teaching stations' : '十二個教學站點';
  const note = isEn
    ? 'Source: name and chapter fields in data/fab-flow.js. Teaching order only, not a qualified fab route.'
    : '來源：data/fab-flow.js 的站名與章節。這是教學順序，不是特定晶圓廠的正式路線。';
  return `<section class="ds-section ds-panel" aria-labelledby="fabFlowStripTitle"><p class="ds-kicker">Fab flow</p><h2 id="fabFlowStripTitle">${title}</h2><ol class="fab-flow-strip">${items}</ol><p class="chart-source">${note}</p></section>`;
}

function imageGallery(isEn) {
  const shots = isEn
    ? [
      ['assets/generated/hero-cleanroom-aisle.webp', 'Illustrative cleanroom aisle with overhead transport, not a photograph of a named fab.', 'Illustrative cleanroom aisle. Not a metrology image and not a specific factory.'],
      ['assets/generated/wafer-notch-macro.webp', 'Illustrative macro of a silicon wafer notch and die streets.', 'Illustrative wafer surface. Not a lot photograph.'],
      ['assets/generated/litho-scanner-bay.webp', 'Illustrative lithography scanner bay in yellow light, without readable brand marks.', 'Illustrative scanner bay. Not a tool acceptance photo.'],
      ['assets/generated/finfet-cutaway-illustrative.webp', 'Illustrative FinFET cutaway showing fin, gate, and source-drain, not to scale.', 'Illustrative device cutaway. Geometry is not a measured cross-section.'],
      ['assets/generated/cowos-stack-illustrative.webp', 'Illustrative 2.5D package stack with interposer and stacked memory, not to scale.', 'Illustrative package stack. Not a product teardown.'],
      ['assets/generated/oht-foup-bay.webp', 'Illustrative overhead hoist carrying a FOUP above process tools.', 'Illustrative automated transport. Not an AMHS layout drawing.']
    ]
    : [
      ['assets/generated/hero-cleanroom-aisle.webp', '無塵室走道與天車的示意畫面，不是指名晶圓廠的照片。', '示意用無塵室走道，不是量測影像，也不是特定工廠。'],
      ['assets/generated/wafer-notch-macro.webp', '矽晶圓缺口與切割道的示意近拍。', '示意用晶圓表面，不是批次照片。'],
      ['assets/generated/litho-scanner-bay.webp', '黃光區曝光機台的示意場景，沒有可讀廠牌。', '示意用曝光機台區，不是機台驗收照片。'],
      ['assets/generated/finfet-cutaway-illustrative.webp', 'FinFET 剖面示意，可見鰭片、閘極與源汲，未按比例。', '示意用元件剖面，幾何不是實測切面。'],
      ['assets/generated/cowos-stack-illustrative.webp', '2.5D 封裝堆疊示意，含中介層與堆疊記憶體，未按比例。', '示意用封裝堆疊，不是產品拆解。'],
      ['assets/generated/oht-foup-bay.webp', '天車吊運 FOUP 經過機台的示意畫面。', '示意用自動搬運，不是 AMHS 配置圖。']
    ];
  const title = isEn ? 'Illustration slots' : '示意影像預留位';
  const lead = isEn
    ? 'These frames wait for generated images. Until a file is added, the frame keeps the alt text. Every image in this set is illustrative.'
    : '這些框位等生成圖放入。檔案還沒到時，框內保留替代文字。這組圖一律是示意，不是量測或拆解。';
  return `<section class="ds-section" aria-labelledby="illusSlotsTitle"><p class="ds-kicker">Illustrative</p><h2 id="illusSlotsTitle">${title}</h2><p>${lead}</p><div class="illus-grid">${shots.map(([src, alt, caption]) => illustrationSlot({ src, alt, caption })).join('')}</div></section>`;
}

export function renderExploreVisuals(isEn) {
  const chartTitle = isEn ? 'What this hub actually counts' : '這座知識庫數得出的東西';
  const chartLead = isEn
    ? 'Bars below are either counts from this repository or a cited public standard. They are not process capability, yield, or cost.'
    : '下面的長條不是製程能力、良率或成本。它們只來自本倉庫的計數，或一份有出處的公開標準。';
  return `${fabFlowStrip(isEn)}<section class="ds-section" aria-labelledby="hubChartsTitle"><p class="ds-kicker">Data</p><h2 id="hubChartsTitle">${chartTitle}</h2><p>${chartLead}</p><div class="chart-grid">${curriculumChart(isEn)}${isoChart(isEn)}</div></section>${imageGallery(isEn)}`;
}
