// 段落流程圖與結構圖：依 data/section-diagrams.js 的規格，在指定 h2 標題後插入示意圖。
// 沿用 chapter-figures.js 的外框與圖說（示意、未按比例、名稱取自本章、不另編數字），正文文字不刪減。
import { esc, frame } from './chapter-figures.js';
import { SECTION_DIAGRAMS } from './data/section-diagrams.js';

const INK = '#0f172a';
const INK_2 = '#334155';
const LINE = '#0f766e';
const TONES = [
  { fill: '#f0fdfa', stroke: '#0f766e' },
  { fill: '#e0f2fe', stroke: '#075985' },
  { fill: '#fef3c7', stroke: '#92400e' },
  { fill: '#f1f5f9', stroke: '#334155' },
  { fill: '#fce7f3', stroke: '#9d174d' },
  { fill: '#ede9fe', stroke: '#5b21b6' },
  { fill: '#ecfccb', stroke: '#3f6212' }
];

const pick = (node, en) => (en ? node.en : node.zh);

// 估算字寬：中日韓文字與全形標點以一個字寬計，拉丁字母與數字約半個字寬
const charWidth = ch => (/[⺀-鿿豈-﫿＀-￯　-〿]/.test(ch) ? 1.02 : /\s/.test(ch) ? 0.3 : 0.56);
const textWidth = (text, size) => [...text].reduce((w, ch) => w + charWidth(ch), 0) * size;

// 斷行單位：每個中文字一單位；連續的英文字母、數字與連字號視為一個字，不從中間拆開；
// 逗號、頓號等標點黏在前一個單位上，不出現在行首
const tokens = text => (String(text).match(/[A-Za-z0-9][A-Za-z0-9.\-/+%'’]*|\s+|./gu) || []).reduce((units, unit) => {
  if (units.length && /^[、，。；：！？）」』,.;:!?)]$/.test(unit)) units[units.length - 1] += unit;
  else units.push(unit);
  return units;
}, []);

function greedy(units, width, size) {
  const lines = [];
  let line = '';
  for (const unit of units) {
    const next = line + unit;
    if (line.trim() && textWidth(next.trimEnd(), size) > width) {
      lines.push(line.trim());
      line = unit.trimStart();
    } else line = next;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

// 依可用寬度切行；行數確定後縮小行寬重排，讓各行長度接近，避免最後一行只剩一兩個字
// 超過 maxLines 時以省略號收尾（各圖型以 boxHeight 預留足夠行數，正常不會截斷）
function wrap(text, width, size, en, maxLines = 2) {
  const units = tokens(text);
  let lines = greedy(units, width, size);
  if (lines.length > 1) {
    let lo = width / lines.length, hi = width;
    for (let i = 0; i < 12; i++) {
      const mid = (lo + hi) / 2;
      if (greedy(units, mid, size).length <= lines.length) hi = mid; else lo = mid;
    }
    lines = greedy(units, hi, size);
  }
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.$/u, '…');
  }
  return lines;
}

function textBlock(x, cy, lines, size, color, weight = 400) {
  const lh = size * 1.25;
  const top = cy - ((lines.length - 1) * lh) / 2 + size * 0.35;
  return lines.map((line, i) => `<text x="${x}" y="${top + i * lh}" text-anchor="middle" fill="${color}" font-size="${size}"${weight > 400 ? ` font-weight="${weight}"` : ''}>${esc(line)}</text>`).join('');
}

// 方框文字最多四行；各圖型依 boxHeight 算出所需高度，不截斷內容
const MAX_LINES = 4;
const labelSize = en => (en ? 11.5 : 12.5);
function boxHeight(w, label, note, en) {
  const labelLines = wrap(label, w - 12, labelSize(en), en, MAX_LINES).length;
  const noteLines = note ? wrap(note, w - 12, 10.5, en, MAX_LINES).length : 0;
  return 16 + labelLines * labelSize(en) * 1.25 + (noteLines ? 6 + noteLines * 10.5 * 1.25 : 0);
}

function box(x, y, w, h, tone, label, note, en) {
  const size = labelSize(en);
  const labelLines = wrap(label, w - 12, size, en, MAX_LINES);
  const noteLines = note ? wrap(note, w - 12, 10.5, en, MAX_LINES) : [];
  const block = labelLines.length * size * 1.25 + (noteLines.length ? 6 + noteLines.length * 10.5 * 1.25 : 0);
  const top = y + (h - block) / 2;
  const labelCy = top + (labelLines.length * size * 1.25) / 2;
  const noteCy = top + labelLines.length * size * 1.25 + 6 + (noteLines.length * 10.5 * 1.25) / 2;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${tone.fill}" stroke="${tone.stroke}" stroke-width="1.2"/>`
    + textBlock(x + w / 2, labelCy, labelLines, size, INK, 600)
    + (noteLines.length ? textBlock(x + w / 2, noteCy, noteLines, 10.5, INK_2) : '');
}

const arrowHead = (x, y, dir) => {
  const d = { right: `M${x - 6} ${y - 4} L${x} ${y} L${x - 6} ${y + 4}`, down: `M${x - 4} ${y - 6} L${x} ${y} L${x + 4} ${y - 6}`, left: `M${x + 6} ${y - 4} L${x} ${y} L${x + 6} ${y + 4}`, up: `M${x - 4} ${y + 6} L${x} ${y} L${x + 4} ${y + 6}` }[dir];
  return `<path d="${d}" fill="none" stroke="${LINE}" stroke-width="1.5"/>`;
};

// 線性流程：3–4 步單列，5–8 步自動折成兩列（蛇形）
function flow(spec, en) {
  const steps = spec.steps;
  const rows = steps.length <= 4 ? 1 : 2;
  const perRow = Math.ceil(steps.length / rows);
  const gap = 26;
  const w = (608 - gap * (perRow - 1)) / perRow;
  const noteOf = step => (step.noteZh ? pick({ zh: step.noteZh, en: step.noteEn }, en) : '');
  const h = Math.ceil(Math.max(58, ...steps.map(step => boxHeight(w, pick(step, en), noteOf(step), en))));
  const rowGap = 34;
  const height = 40 + rows * h + (rows - 1) * rowGap + 24;
  let svg = '';
  steps.forEach((step, i) => {
    const row = Math.floor(i / perRow);
    const col = row % 2 === 0 ? i % perRow : perRow - 1 - (i % perRow);
    const x = 16 + col * (w + gap);
    const y = 32 + row * (h + rowGap);
    svg += box(x, y, w, h, TONES[i % TONES.length], pick(step, en), noteOf(step), en);
    svg += `<circle cx="${x + 2}" cy="${y + 2}" r="8.5" fill="#ffffff" stroke="${LINE}"/><text x="${x + 2}" y="${y + 5.5}" text-anchor="middle" fill="${LINE}" font-size="10" font-weight="700">${stepMark(i)}</text>`;
    if (i < steps.length - 1) {
      const nextRow = Math.floor((i + 1) / perRow);
      if (nextRow === row) {
        const dir = row % 2 === 0 ? 'right' : 'left';
        const x1 = dir === 'right' ? x + w + 2 : x - 2;
        const x2 = dir === 'right' ? x + w + gap - 2 : x - gap + 2;
        svg += `<path d="M${x1} ${y + h / 2} H${x2}" stroke="${LINE}" stroke-width="1.5"/>${arrowHead(x2, y + h / 2, dir)}`;
      } else {
        svg += `<path d="M${x + w / 2} ${y + h + 2} V${y + h + rowGap - 2}" stroke="${LINE}" stroke-width="1.5"/>${arrowHead(x + w / 2, y + h + rowGap - 2, 'down')}`;
      }
    }
  });
  return { svg, height };
}

// 步驟編號用圈字母，避免圖內出現阿拉伯數字（既有圖規範：圖內文字不帶數字）
const stepMark = i => 'ABCDEFGH'[i];

// 循環：節點排成環，箭頭順時針，最後一步接回第一步
function cycle(spec, en) {
  const steps = spec.steps;
  const n = steps.length;
  const w = n > 5 ? 128 : 144;
  const noteOf = step => (step.noteZh ? pick({ zh: step.noteZh, en: step.noteEn }, en) : '');
  const h = Math.ceil(Math.max(52, ...steps.map(step => boxHeight(w, pick(step, en), noteOf(step), en))));
  const angle = i => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const rx = 220;
  // 同側上下相鄰、水平距離不足的節點不可重疊：依節點高度放大縱向半徑
  let ry = 92;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const k = Math.abs(Math.sin(angle(i)) - Math.sin(angle(j)));
      if (k > 0 && rx * Math.abs(Math.cos(angle(i)) - Math.cos(angle(j))) < w + 8) ry = Math.max(ry, (h + 12) / k);
    }
  }
  const cx = 320, cy = 16 + h / 2 + ry;
  const pts = steps.map((_, i) => [cx + rx * Math.cos(angle(i)), cy + ry * Math.sin(angle(i))]);
  let svg = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${LINE}" stroke-width="1.2" stroke-dasharray="5 5"/>`;
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / n;
    const ax = cx + rx * Math.cos(a), ay = cy + ry * Math.sin(a);
    const tangent = Math.atan2(ry * Math.cos(a), -rx * Math.sin(a)) * 180 / Math.PI;
    svg += `<path d="M-6 -4 L0 0 L-6 4" transform="translate(${ax} ${ay}) rotate(${tangent})" fill="none" stroke="${LINE}" stroke-width="1.6"/>`;
  }
  steps.forEach((step, i) => {
    const [x, y] = pts[i];
    svg += box(x - w / 2, y - h / 2, w, h, TONES[i % TONES.length], pick(step, en), noteOf(step), en);
    svg += `<circle cx="${x - w / 2 + 2}" cy="${y - h / 2 + 2}" r="8.5" fill="#ffffff" stroke="${LINE}"/><text x="${x - w / 2 + 2}" y="${y - h / 2 + 5.5}" text-anchor="middle" fill="${LINE}" font-size="10" font-weight="700">${stepMark(i)}</text>`;
  });
  if (spec.centerZh) svg += textBlock(cx, cy, wrap(pick({ zh: spec.centerZh, en: spec.centerEn }, en), 200, 13, en, 2), 13, INK_2, 600);
  return { svg, height: Math.ceil(cy + ry + h / 2 + 16) };
}

// 層疊結構：由上到下畫出層次，右側可加註每層作用
function stack(spec, en) {
  const layers = spec.layers;
  const h = Math.min(40, Math.floor(196 / layers.length));
  let svg = '';
  layers.forEach((layer, i) => {
    const y = 24 + i * (h + 4);
    const tone = TONES[i % TONES.length];
    svg += `<rect x="40" y="${y}" width="260" height="${h}" rx="3" fill="${tone.fill}" stroke="${tone.stroke}" stroke-width="1.2"/>`;
    svg += textBlock(170, y + h / 2, wrap(pick(layer, en), 248, 12.5, en, 1), 12.5, INK, 600);
    if (layer.noteZh) {
      svg += `<path d="M304 ${y + h / 2} H330" stroke="${tone.stroke}" stroke-dasharray="3 3"/>`;
      const lines = wrap(pick({ zh: layer.noteZh, en: layer.noteEn }, en), 284, 11.5, en, 2);
      const top = y + h / 2 - ((lines.length - 1) * 13) / 2 + 4;
      svg += lines.map((line, k) => `<text x="338" y="${top + k * 13}" fill="${INK_2}" font-size="11.5">${esc(line)}</text>`).join('');
    }
  });
  if (spec.topZh) svg += `<text x="40" y="16" fill="${INK_2}" font-size="11">${esc(pick({ zh: spec.topZh, en: spec.topEn }, en))}</text>`;
  return { svg, height: 24 + layers.length * (h + 4) + 16 };
}

// 並排比較：二到三欄，每欄標題加要點；要點可在上方加列標題（key）、下方加補充（note）
function compare(spec, en) {
  const cols = spec.columns;
  const gap = 18;
  const w = (608 - gap * (cols.length - 1)) / cols.length;
  const maxItems = Math.max(...cols.map(c => c.items.length));
  const SMALL = 10.5;
  const partsOf = item => [
    ...(item.keyZh ? wrap(pick({ zh: item.keyZh, en: item.keyEn }, en), w - 34, SMALL, en, 2).map(text => ({ text, size: SMALL, color: INK_2, weight: 600 })) : []),
    ...wrap(pick(item, en), w - 34, 11.5, en, MAX_LINES).map(text => ({ text, size: 11.5, color: INK, weight: 400 })),
    ...(item.noteZh ? wrap(pick({ zh: item.noteZh, en: item.noteEn }, en), w - 34, SMALL, en, MAX_LINES).map(text => ({ text, size: SMALL, color: INK_2, weight: 400 })) : []),
  ];
  const blockOf = parts => parts.reduce((sum, p) => sum + p.size * 1.25, 0);
  // 同一列的要點等高，取各欄該列所需高度的最大值
  const rowH = Array.from({ length: maxItems }, (_, ii) => Math.max(38, ...cols.map(c => (c.items[ii] ? blockOf(partsOf(c.items[ii])) + 12 : 0))));
  const titleLines = Math.max(...cols.map(c => wrap(pick({ zh: c.titleZh, en: c.titleEn }, en), w - 16, 13, en, 2).length));
  const titleH = titleLines > 1 ? 52 : 40;
  const height = 16 + titleH + 10 + rowH.reduce((a, b) => a + b + 8, 0) + 20;
  let svg = '';
  cols.forEach((col, ci) => {
    const x = 16 + ci * (w + gap);
    const tone = TONES[(ci * 2) % TONES.length];
    svg += `<rect x="${x}" y="16" width="${w}" height="${height - 28}" rx="8" fill="#ffffff" stroke="${tone.stroke}" stroke-width="1.2"/>`;
    svg += `<rect x="${x}" y="16" width="${w}" height="${titleH}" rx="8" fill="${tone.fill}" stroke="${tone.stroke}" stroke-width="1.2"/>`;
    svg += textBlock(x + w / 2, 16 + titleH / 2, wrap(pick({ zh: col.titleZh, en: col.titleEn }, en), w - 16, 13, en, 2), 13, INK, 700);
    let y = 16 + titleH + 10;
    col.items.forEach((item, ii) => {
      svg += `<circle cx="${x + 14}" cy="${y + rowH[ii] / 2}" r="3" fill="${tone.stroke}"/>`;
      const parts = partsOf(item);
      let cursor = y + rowH[ii] / 2 - blockOf(parts) / 2;
      for (const p of parts) {
        svg += `<text x="${x + 24}" y="${cursor + p.size * 0.625 + p.size * 0.35}" fill="${p.color}" font-size="${p.size}"${p.weight > 400 ? ` font-weight="${p.weight}"` : ''}>${esc(p.text)}</text>`;
        cursor += p.size * 1.25;
      }
      y += rowH[ii] + 8;
    });
  });
  return { svg, height };
}

// 分支：左側起點（徵兆或決策點），右側分出二到五個結果，可附後續動作
function branch(spec, en) {
  const items = spec.branches;
  const leafOf = item => (item.leafZh ? pick({ zh: item.leafZh, en: item.leafEn }, en) : '');
  // 每列高度依該列分支與後續動作所需行數決定
  const rowH = items.map(item => Math.ceil(Math.max(items.length > 4 ? 40 : 46, boxHeight(item.leafZh ? 180 : 390, pick(item, en), '', en), item.leafZh ? boxHeight(180, leafOf(item), '', en) : 0)));
  const rootNote = spec.root.noteZh ? pick({ zh: spec.root.noteZh, en: spec.root.noteEn }, en) : '';
  const rootH = Math.ceil(Math.max(70, boxHeight(150, pick(spec.root, en), rootNote, en)));
  const height = Math.max(150, rootH + 32, 22 + rowH.reduce((a, b) => a + b + 10, 0));
  const rootY = height / 2 - rootH / 2;
  let svg = box(16, rootY, 150, rootH, TONES[2], pick(spec.root, en), rootNote, en);
  let y = 16;
  items.forEach((item, i) => {
    const midY = y + rowH[i] / 2;
    svg += `<path d="M168 ${height / 2} C 200 ${height / 2}, 200 ${midY}, 230 ${midY}" fill="none" stroke="${LINE}" stroke-width="1.4"/>${arrowHead(232, midY, 'right')}`;
    svg += box(234, y, item.leafZh ? 180 : 390, rowH[i], TONES[(i + 1) % TONES.length], pick(item, en), '', en);
    if (item.leafZh) {
      svg += `<path d="M416 ${midY} H440" stroke="${LINE}" stroke-width="1.4"/>${arrowHead(442, midY, 'right')}`;
      svg += box(444, y, 180, rowH[i], TONES[3], leafOf(item), '', en);
    }
    y += rowH[i] + 10;
  });
  return { svg, height };
}

const TEMPLATES = { flow, cycle, stack, compare, branch };

export function renderSectionDiagram(spec, lang) {
  const en = lang === 'en';
  const { svg, height } = TEMPLATES[spec.type](spec, en);
  return frame(en ? spec.captionEn : spec.captionZh, en, svg, Math.ceil(height));
}

const escapeRegExp = text => String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// 規格的標題存一般文字；正文 HTML 的 & < > 有的寫成實體、有的是字面字元，兩種都接受
export const headingPattern = text => escapeRegExp(text).replace(/&/g, '(?:&amp;|&)').replace(/</g, '(?:&lt;|<)').replace(/>/g, '(?:&gt;|>)');

// 以函式型 replacer 插入，避免輸出內容中的 `$&`、`$1` 被當成替換樣式（見 8D 陷阱 0028）
export function insertSectionDiagrams(html, chapterId, lang, specs = SECTION_DIAGRAMS) {
  let next = String(html);
  const en = lang === 'en';
  for (const spec of specs) {
    if (spec.chapterId !== chapterId) continue;
    const heading = headingPattern(en ? spec.headingEn : spec.headingZh);
    // 限定在單一 h2 內比對，避免標題文字先出現在正文時跨段插錯位置
    const pattern = new RegExp(`<h2\\b[^>]*>(?:(?!</h2>)[\\s\\S])*?${heading}(?:(?!</h2>)[\\s\\S])*?</h2>`);
    next = next.replace(pattern, match => match + renderSectionDiagram(spec, lang));
  }
  return next;
}
