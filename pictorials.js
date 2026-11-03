// 段落實物示意圖（視覺升級第 2 階段）：把方框加字換成畫出實物或機制的圖。
// 每張圖一個繪製函式，經 section-diagrams.js 的 pictorial 圖型呼叫；圖內文字一律取自規格的 labels，
// 標籤須逐字出自該段正文，或沿用既有圖已用的標籤（from: 'figure'），由 scripts/test-section-diagrams.mjs 檢查。
// 只有規格標明 sourcedNumbers 的圖可以放數字，且數字須出現在該段正文（Sam 2026-11-03 核可，改用「依正文數值繪製」標章）。
const INK = '#0f172a';
const INK_2 = '#334155';
const MUTED = '#64748b';
const LINE = '#cbd5e1';
const TEAL = '#0f766e';
const TEAL_L = '#99f6e4';
const TEAL_XL = '#f0fdfa';
const BLUE = '#075985';
const BLUE_L = '#bae6fd';
const BLUE_XL = '#e0f2fe';
const AMBER = '#92400e';
const AMBER_L = '#fde68a';
const AMBER_XL = '#fef3c7';
const PINK = '#9d174d';
const PINK_L = '#fce7f3';
const RED = '#9a3412';
const SI = '#a6bdcb';
const LIGHT = '#f8fafc';
const RESIST = '#e1ad70';

// 共用工具：標籤取用、單行與多行文字、箭頭
function tools(spec, en, kit) {
  const L = key => {
    const label = spec.labels.find(item => item.key === key);
    if (!label) throw new Error(`${spec.draw} 缺少標籤 ${key}`);
    return en ? label.en : label.zh;
  };
  const t = (x, y, text, size = 12, fill = INK, anchor = 'middle', weight = 400) => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-size="${size}"${weight > 400 ? ` font-weight="${weight}"` : ''}>${kit.esc(text)}</text>`;
  // 依寬度斷行；y 是第一行基線，回傳圖與實際高度
  const para = (x, y, text, width, size = 11, fill = INK_2, anchor = 'middle', weight = 400) => {
    const lines = kit.wrap(text, width, size, en, 8);
    const lh = size * 1.3;
    return { svg: lines.map((line, i) => t(x, y + i * lh, line, size, fill, anchor, weight)).join(''), height: lines.length * lh };
  };
  const arrow = (x1, y1, x2, y2, color = TEAL, width = 1.5) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 6;
    const p = s => `${(x2 - h * Math.cos(a + s * 0.45)).toFixed(1)} ${(y2 - h * Math.sin(a + s * 0.45)).toFixed(1)}`;
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${color}" stroke-width="${width}" fill="none"/><path d="M${x2} ${y2} L${p(1)} L${p(-1)} Z" fill="${color}"/>`;
  };
  // 步驟或圖例用的圈字母（圖內不用阿拉伯數字當序號）
  const mark = (x, y, letter) => `<circle cx="${x}" cy="${y}" r="9" fill="#ffffff" stroke="${TEAL}"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" fill="${TEAL}" font-size="10.5" font-weight="700">${letter}</text>`;
  // 尺寸線：兩端都有箭頭；引線：虛線
  const dim = (x1, y1, x2, y2, color = INK_2) => arrow((x1 + x2) / 2, (y1 + y2) / 2, x1, y1, color, 1.1) + arrow((x1 + x2) / 2, (y1 + y2) / 2, x2, y2, color, 1.1);
  const lead = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${MUTED}" stroke-dasharray="2 2"/>`;
  // 圈字母圖例排成一列，只放名稱：各指標的說明已在圖下方的條列卡片，圖內不再重複（B 批的指標圖共用）
  const legend = (rows, y) => rows.map(([letter, name], i) => {
    const x = 16 + i * (608 / rows.length);
    return mark(x + 9, y - 4, letter) + t(x + 22, y, L(name), 12, INK, 'start', 700);
  }).join('');
  // 指定斷行：每個元素一行，用於中文需要在標點處斷行、避免把詞拆開的地方（2.21.0）
  const lines = (x, y, rows, size = 11, fill = INK_2, anchor = 'middle', weight = 400) => ({ svg: rows.map((row, i) => t(x, y + i * size * 1.3, row, size, fill, anchor, weight)).join(''), height: rows.length * size * 1.3 });
  // 英文照寬度斷行；中文在指定的字前斷成兩行
  const breakAt = (x, y, text, at, width, size, fill, anchor, weight) => { const i = en ? -1 : text.indexOf(at); return i > 0 ? lines(x, y, [text.slice(0, i), text.slice(i)], size, fill, anchor, weight) : para(x, y, text, width, size, fill, anchor, weight); };
  return { L, t, para, lines, breakAt, arrow, mark, dim, lead, legend, icon: kit.iconAt };
}

// 鋸齒屋頂的廠房
const factory = (x, y, w, h, fill, stroke) => `<path d="M${x} ${y + h} V${y + h * 0.42} l${w / 3} ${-h * 0.3} v${h * 0.3} l${w / 3} ${-h * 0.3} v${h * 0.3} l${w / 3} ${-h * 0.3} V${y + h} Z" fill="${fill}" stroke="${stroke}" stroke-width="1.3" stroke-linejoin="round"/>`;
// 俯視晶圓：圓與底部缺口
const waferTop = (cx, cy, r, fill = '#e2e8f0', stroke = INK_2) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}"/><path d="M${cx - 3} ${cy + r - 0.5} l3 -3.5 3 3.5" fill="#ffffff" stroke="${stroke}"/>`;

// ch00 誰負責什麼：設計、製造、封測三段；IDM 括號只跨設計與製造，供應商只供應製造段（技術審查修正）
function industryMap(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  let svg = '';
  const idmName = para(216, 20, L('idm'), 400, 12.5, INK, 'middle', 700);
  const idmDesc = para(216, 20 + idmName.height + 2, L('idmDoes'), 400, 11, INK_2);
  const yb = 20 + idmName.height + idmDesc.height + 4;
  svg += idmName.svg + idmDesc.svg + `<path d="M18 ${yb + 9} V${yb} H414 V${yb + 9}" fill="none" stroke="${PINK}" stroke-width="1.6"/>`;
  const yz = yb + 18;
  const zones = [[16, 'zoneDesign'], [224, 'zoneMake'], [432, 'zoneTest']];
  // 各段名稱與說明，先算高度再畫底框
  const fabless = [para(112, yz + 122, L('fabless'), 176, 11.5, INK, 'middle', 700)];
  fabless.push(para(112, yz + 122 + fabless[0].height + 2, L('fablessDoes'), 176, 10.5));
  const foundry = [para(270, yz + 122, L('foundry'), 96, 11.5, INK, 'middle', 700)];
  foundry.push(para(270, yz + 122 + foundry[0].height + 2, L('foundryDoes'), 96, 10.5));
  const idmFab = [para(370, yz + 122, L('idmShort'), 96, 11.5, INK, 'middle', 700)];
  idmFab.push(para(370, yz + 122 + idmFab[0].height + 2, L('idmMakes'), 84, 10.5));
  const osat = [para(528, yz + 122, L('osat'), 176, 11.5, INK, 'middle', 700)];
  osat.push(para(528, yz + 122 + osat[0].height + 2, L('osatDoes'), 176, 10.5));
  const textH = Math.max(...[fabless, foundry, idmFab, osat].map(([a, b]) => a.height + b.height + 2));
  const zoneBottom = yz + 112 + textH + 12;
  zones.forEach(([x, key]) => {
    svg += `<rect x="${x}" y="${yz}" width="192" height="${zoneBottom - yz}" rx="8" fill="${LIGHT}" stroke="${LINE}"/>` + t(x + 96, yz + 20, L(key), 12.5, TEAL, 'middle', 700);
  });
  // 設計：電腦上畫電路，旁邊一座打叉的小廠房（沒有自己的工廠）
  svg += `<rect x="74" y="${yz + 36}" width="76" height="50" rx="4" fill="${BLUE_XL}" stroke="${BLUE}" stroke-width="1.3"/><path d="M104 ${yz + 86} v8 M94 ${yz + 95} h20" stroke="${BLUE}" stroke-width="1.3"/>`
    + `<path d="M84 ${yz + 50} h20 v14 h16 M108 ${yz + 46} h30 M88 ${yz + 74} h44 M124 ${yz + 56} v18" fill="none" stroke="${TEAL}" stroke-width="1.4"/>`
    + factory(160, yz + 66, 30, 24, '#ffffff', MUTED) + `<path d="M158 ${yz + 64} l34 28 M192 ${yz + 64} l-34 28" stroke="${RED}" stroke-width="1.8"/>`;
  // IDM 也自己設計：括號下的設計段放一個 IDM 小標記，避免讀成「IDM＝設計公司＋代工廠」（審查意見）
  svg += `<rect x="24" y="${yz + 34}" width="40" height="18" rx="9" fill="${PINK_L}" stroke="${PINK}"/>` + t(44, yz + 47, L('idmShort'), 10, PINK, 'middle', 700);
  // 製造：代工廠與 IDM 都有晶圓廠
  svg += factory(240, yz + 40, 60, 48, BLUE_XL, BLUE) + waferTop(296, yz + 86, 11, TEAL_XL, TEAL)
    + factory(340, yz + 40, 60, 48, PINK_L, PINK) + waferTop(396, yz + 86, 11, TEAL_XL, TEAL)
    + arrow(152, yz + 60, 236, yz + 60, TEAL, 1.6);
  // 兩座廠房的晶圓都送往封測：從兩座廠房下方匯合後指向封測段（審查意見：原本只從 IDM 出發）
  svg += `<path d="M262 ${yz + 89} V${yz + 104} H420 V${yz + 64} M362 ${yz + 89} V${yz + 104}" fill="none" stroke="${TEAL}" stroke-width="1.6"/>`;
  // 封測：晶圓 → 切開的晶粒 → 封裝後的晶片
  svg += waferTop(470, yz + 64, 18, '#e2e8f0', INK_2) + [-8, 0, 8].flatMap(dx => [-8, 0, 8].map(dy => `<rect x="${466 + dx - 3}" y="${yz + 60 + dy - 3}" width="6" height="6" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".6"/>`)).join('')
    + arrow(492, yz + 64, 506, yz + 64, TEAL, 1.3)
    + `<rect x="511" y="${yz + 57}" width="14" height="14" fill="${TEAL_L}" stroke="${TEAL}"/>` + arrow(530, yz + 64, 544, yz + 64, TEAL, 1.3)
    + `<rect x="550" y="${yz + 52}" width="40" height="24" rx="3" fill="#334155"/>${[556, 564, 572, 580].map(x => `<path d="M${x} ${yz + 76} v6 M${x} ${yz + 52} v-6" stroke="${INK_2}" stroke-width="1.6"/>`).join('')}`
    + arrow(420, yz + 64, 448, yz + 64, TEAL, 1.6);
  svg += [fabless, foundry, idmFab, osat].map(([a, b]) => a.svg + b.svg).join('');
  // 設備與材料供應商：箭頭只指向製造段的兩座廠房
  const ys = zoneBottom + 30;
  const supplier = para(30, ys + 20, L('suppliers'), 196, 12, INK, 'start', 700);
  const supplies = para(30, ys + 20 + supplier.height, L('supplies'), 196, 10.5, INK_2, 'start');
  const bandH = Math.max(52, 20 + supplier.height + supplies.height);
  svg += `<rect x="16" y="${ys}" width="608" height="${bandH}" rx="8" fill="${AMBER_XL}" stroke="${AMBER}"/>` + supplier.svg + supplies.svg
    + ['furnace', 'drop', 'gas-cylinder', 'wafer'].map((name, i) => icon(name, 250 + i * 32, ys + bandH / 2 - 11, 22, AMBER)).join('')
    + arrow(270, ys - 2, 270, zoneBottom + 4, AMBER, 1.5) + arrow(370, ys - 2, 370, zoneBottom + 4, AMBER, 1.5);
  return { svg, height: Math.ceil(ys + bandH + 14) };
}

// ch01 無塵室：左邊比較每立方英尺的微粒，右邊是迷你環境（晶圓經過的路徑用同一個深色，技術審查修正）
function cleanroom(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  let svg = '';
  svg += para(164, 22, en ? `${L('halfMicron')} ${L('cubicFoot')}` : `${L('cubicFoot')}，${L('halfMicron')}`, 290, 11.5, INK, 'middle', 700).svg;
  // 立方體：正面方框加斜邊，點數只是示意
  const cube = (x, y, fill) => `<path d="M${x} ${y + 20} l20 -20 h70 v70 l-20 20" fill="${fill}" stroke="${INK_2}" stroke-linejoin="round"/><rect x="${x}" y="${y + 20}" width="70" height="70" fill="${fill}" stroke="${INK_2}"/><path d="M${x + 70} ${y + 20} l20 -20" stroke="${INK_2}"/>`;
  const dots = [];
  for (let i = 0; i < 64; i++) dots.push([46 + ((i * 37) % 62), 66 + ((i * 53) % 62)]);
  svg += cube(42, 40, '#ffffff') + dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="${RED}"/>`).join('');
  svg += cube(196, 40, TEAL_XL) + `<circle cx="222" cy="92" r="1.6" fill="${RED}"/><circle cx="246" cy="118" r="1.6" fill="${RED}"/>`
    + [214, 231, 248].map(x => arrow(x, 66, x, 84, TEAL, 1.2)).join('');
  const officeName = para(87, 162, L('office'), 130, 12, INK, 'middle', 700);
  const officeN = para(87, 162 + officeName.height, L('officeCount'), 130, 11, RED);
  const roomName = para(241, 162, L('criticalArea'), 130, 12, INK, 'middle', 700);
  const roomN = para(241, 162 + roomName.height, L('roomCount'), 130, 11, TEAL);
  svg += officeName.svg + officeN.svg + roomName.svg + roomN.svg;
  const leftBottom = 162 + Math.max(officeName.height + officeN.height, roomName.height + roomN.height);
  const classes = para(164, leftBottom + 16, `${L('classes')}${en ? ': ' : '：'}${L('smallerCleaner')}`, 270, 10.5, MUTED);
  svg += classes.svg;
  // 右：迷你環境。機台外殼只畫中性線框；晶圓盒內部、機台前端與處理腔是晶圓經過的地方，用同一個深色
  svg += t(478, 22, L('miniEnv'), 12, INK, 'middle', 700);
  svg += `<rect x="332" y="34" width="292" height="172" rx="8" fill="#f1f5f9" stroke="${LINE}"/>`;
  svg += `<rect x="452" y="104" width="160" height="94" rx="6" fill="#ffffff" stroke="${INK_2}" stroke-width="1.4"/>`
    + `<rect x="458" y="128" width="54" height="64" rx="3" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + `<rect x="530" y="116" width="74" height="76" rx="3" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + `<rect x="511" y="150" width="20" height="18" fill="${TEAL_L}"/><path d="M512 150 h18 M512 168 h18" stroke="${TEAL}"/>`;
  // 密封的晶圓盒：外殼加粗，內部同樣是深色；晶圓水平疊放，前門朝向機台
  svg += `<rect x="396" y="132" width="52" height="60" rx="5" fill="${TEAL_L}" stroke="${INK_2}" stroke-width="2.2"/>` + [143, 153, 163, 173, 183].map(y => `<path d="M403 ${y} h38" stroke="${TEAL}" stroke-width="1.6"/>`).join('')
    + `<path d="M413 132 v-8 h18 v8" fill="none" stroke="${INK_2}" stroke-width="1.6"/><path d="M446 136 v52" stroke="${INK_2}" stroke-width="3.5"/>`;
  svg += `<path d="M424 159 H566" stroke="${TEAL}" stroke-width="2" stroke-dasharray="5 3"/>` + arrow(556, 159, 572, 159, TEAL, 2);
  // 標籤：晶圓盒在左上，機台前端在右上，開門的位置在廠房外框下方
  const carrier = para(390, 52, L('carrier'), 100, 10.5, INK, 'middle', 600);
  svg += carrier.svg + `<path d="M412 ${52 + carrier.height - 6} V122" stroke="${MUTED}" stroke-dasharray="2 2"/>`;
  const front = para(532, 52, L('toolFront'), 150, 10.5, INK, 'middle', 600);
  const small = para(532, 52 + front.height, L('smallSpace'), 150, 10.5, TEAL, 'middle', 600);
  svg += front.svg + small.svg + `<path d="M485 ${52 + front.height + small.height - 6} V126" stroke="${MUTED}" stroke-dasharray="2 2"/>`;
  const opened = para(450, 224, L('opened'), 180, 10.5, INK_2);
  svg += opened.svg + `<path d="M450 196 V${224 - 11}" stroke="${MUTED}" stroke-dasharray="2 2"/>`;
  // 圖例：淺色＝整個廠房，深色＝晶圓經過的地方；只跟右欄對齊，不受左欄高度影響
  const legendY = 224 + opened.height + 4;
  const lightNote = para(352, legendY + 10, L('wholeBuilding'), 250, 10.5, INK_2, 'start');
  const darkNote = para(352, legendY + 14 + lightNote.height, L('passThrough'), 250, 10.5, INK, 'start', 600);
  svg += `<rect x="334" y="${legendY + 1}" width="12" height="12" fill="#f1f5f9" stroke="${LINE}"/>` + lightNote.svg
    + `<rect x="334" y="${legendY + 5 + lightNote.height}" width="12" height="12" fill="${TEAL_L}" stroke="${TEAL}"/>` + darkNote.svg;
  return { svg, height: Math.ceil(Math.max(leftBottom + 16 + classes.height, legendY + 14 + lightNote.height + darkNote.height) + 8) };
}

// ch01 機台：單片式與批次式，兩張圖底部對齊、晶圓同寬；直立爐管內晶圓水平疊放
function toolTypes(spec, en, kit) {
  const { L, t, para } = tools(spec, en, kit);
  let svg = '';
  const base = 156;
  // 兩組往中間靠攏，手機窄螢幕左右滑動時比較容易同時看到（審查意見）
  const sx = 200, bx = 420;
  // 單片式：處理腔內一片晶圓躺在載台上（不畫正文沒提到的氣體或電漿）
  svg += `<rect x="${sx - 70}" y="${base - 96}" width="140" height="96" rx="10" fill="${BLUE_XL}" stroke="${BLUE}" stroke-width="1.4"/><path d="M${sx - 70} ${base - 78} h140" stroke="${BLUE}"/>`
    + `<rect x="${sx - 40}" y="${base - 26}" width="80" height="14" rx="2" fill="${SI}" stroke="${INK_2}"/><rect x="${sx - 35}" y="${base - 32}" width="70" height="6" rx="1" fill="#e2e8f0" stroke="${INK_2}"/>`;
  // 批次式：直立爐管與晶舟，晶圓水平疊放
  svg += `<path d="M${bx - 45} ${base} V${base - 108} a45 22 0 0 1 90 0 V${base}" fill="${AMBER_XL}" stroke="${AMBER}" stroke-width="1.4"/>`
    + `<path d="M${bx - 32} ${base - 6} V${base - 112} M${bx + 32} ${base - 6} V${base - 112}" stroke="${INK_2}" stroke-width="1.6"/>`
    + Array.from({ length: 17 }, (_, i) => `<rect x="${bx - 35}" y="${base - 110 + i * 6}" width="70" height="2.2" fill="#e2e8f0" stroke="${INK_2}" stroke-width=".6"/>`).join('')
    + `<path d="M${bx - 52} ${base} h104" stroke="${INK_2}" stroke-width="1.6"/>`;
  svg += `<path d="M${bx + 35} ${base - 60} H${bx + 62}" stroke="${MUTED}" stroke-dasharray="2 2"/>`;
  const many = para(bx + 66, base - 64, L('hundred'), 130, 10.5, INK_2, 'start');
  svg += many.svg;
  const col = (cx, keys) => {
    let y = base + 22, out = '';
    keys.forEach(([key, size, fill, weight]) => { const p = para(cx, y, L(key), 260, size, fill, 'middle', weight); out += p.svg; y += p.height + 2; });
    return { svg: out, bottom: y };
  };
  const left = col(sx, [['single', 13, INK, 700], ['oneAtATime', 11.5, INK_2, 400], ['singleExamples', 11, MUTED, 400]]);
  const right = col(bx, [['batch', 13, INK, 700], ['manyAtOnce', 11.5, INK_2, 400], ['furnace', 11, MUTED, 400]]);
  svg += left.svg + right.svg;
  return { svg, height: Math.ceil(Math.max(left.bottom, right.bottom) + 8) };
}

// ch01 誰在晶圓廠裡工作：圈字母釘在各自負責的物件上，職稱放在下方圖例（手機上不擠在圖中，技術審查修正）
function fabRoles(spec, en, kit) {
  const { L, t, arrow, mark, icon } = tools(spec, en, kit);
  let svg = '';
  // 資訊網路（CIM）連到每台機台
  svg += `<path d="M120 34 H470" stroke="${BLUE}" stroke-width="1.4" stroke-dasharray="4 3"/>` + [150, 270, 390].map(x => `<path d="M${x} 34 V92" stroke="${BLUE}" stroke-width="1.2" stroke-dasharray="4 3"/>`).join('') + mark(484, 34, 'H');
  // 製程整合（PIE）看整條流程
  svg += `<path d="M110 66 V58 H430 V66" fill="none" stroke="${PINK}" stroke-width="1.6"/>` + mark(212, 52, 'C');
  // 生產線：晶圓盒 → 三台機台 → 出貨
  const tool = x => `<rect x="${x}" y="92" width="80" height="66" rx="6" fill="${LIGHT}" stroke="${INK_2}" stroke-width="1.4"/><rect x="${x + 6}" y="146" width="68" height="6" fill="${LINE}"/>`;
  svg += tool(110) + tool(230) + tool(350);
  svg += `<rect x="40" y="118" width="38" height="34" rx="4" fill="${TEAL_L}" stroke="${INK_2}" stroke-width="1.4"/>` + [128, 136, 144].map(y => `<path d="M46 ${y} h26" stroke="${TEAL}"/>`).join('')
    + arrow(80, 135, 106, 135) + arrow(192, 125, 226, 125) + arrow(312, 125, 346, 125) + arrow(432, 125, 470, 125);
  // 製程工程師（PE）：機台上的 Recipe 面板
  svg += `<rect x="146" y="100" width="34" height="22" rx="2" fill="#ffffff" stroke="${TEAL}"/><path d="M151 107 h24 M151 113 h16" stroke="${TEAL}"/>` + mark(196, 102, 'A');
  // 設備工程師（EE）：機台本體
  svg += icon('knowhow', 258, 104, 24, INK_2) + mark(300, 108, 'B');
  // 品保工程師（QA）：出貨端
  svg += `<rect x="474" y="108" width="44" height="36" rx="3" fill="${AMBER_XL}" stroke="${AMBER}"/><path d="M474 118 h44 M496 108 v10" stroke="${AMBER}"/>` + icon('shield-check', 524, 102, 26, TEAL) + mark(560, 102, 'G');
  // 良率工程師（YE）：晶圓圖與缺陷資料
  svg += waferTop(590, 60, 22, '#ffffff', INK_2) + [[-10, -8], [4, -12], [8, 4], [-6, 8], [12, -2]].map(([dx, dy]) => `<circle cx="${590 + dx}" cy="${60 + dy}" r="2.4" fill="${RED}"/>`).join('') + mark(558, 40, 'D');
  // 製造部（MFG）：排程表與晶圓盒，字母放在兩者之間
  svg += `<rect x="20" y="56" width="64" height="40" rx="3" fill="#ffffff" stroke="${INK_2}"/><rect x="26" y="63" width="30" height="6" fill="${TEAL_L}"/><rect x="40" y="74" width="34" height="6" fill="${BLUE_L}"/><rect x="30" y="85" width="22" height="6" fill="${AMBER_L}"/>` + mark(92, 106, 'E');
  // 廠務工程師：機台下方的水、電、氣體管線
  svg += [[176, BLUE], [184, AMBER], [192, TEAL]].map(([y, c]) => `<path d="M100 ${y} H440" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`).join('')
    + [150, 270, 390].map(x => `<path d="M${x} 158 V176" stroke="${INK_2}" stroke-width="1.5"/>`).join('') + mark(86, 184, 'F');
  // 時鐘只留給「全年無休」（技術審查修正：不與排程表混用）
  svg += icon('clock', 466, 168, 22, INK_2) + t(494, 184, L('allYear'), 11.5, INK_2, 'start');
  // 圖例：單欄，手機上不必左右滑動就能對照字母（技術審查修正）
  const roles = ['pe', 'ee', 'pie', 'ye', 'mfg', 'facilities', 'qa', 'cim'];
  roles.forEach((key, i) => {
    const y = 226 + i * 22;
    svg += mark(30, y - 4, 'ABCDEFGH'[i]) + t(46, y, L(key), 12, INK, 'start');
  });
  return { svg, height: 226 + 7 * 22 + 16 };
}

// ch02 摻雜：二維鍵結模型，每條鍵畫兩個電子點；雜質比例未按實際（圖說註明）
function dopingLattice(spec, en, kit) {
  const { L, t, para } = tools(spec, en, kit);
  let svg = '';
  const panels = [
    { x: 16, center: 'atomSi', title: 'pure', notes: ['pureNone', 'pureFour', 'purePoor'], fill: '#e2e8f0', stroke: INK_2 },
    { x: 224, center: 'atomP', title: 'nType', notes: ['nAdd', 'nFive', 'nFree'], fill: BLUE_L, stroke: BLUE, extra: true },
    { x: 432, center: 'atomB', title: 'pType', notes: ['pAdd', 'pThree', 'pHole'], fill: AMBER_L, stroke: AMBER, hole: true }
  ];
  const s = 44, r = 12.5, cy = 92, stub = 13;
  let bottom = 0;
  const notesOf = panels.map(p => {
    let y = 186;
    const title = para(p.x + 96, y, L(p.title), 180, 13, INK, 'middle', 700);
    y += title.height + 2;
    const notes = p.notes.map(key => { const n = para(p.x + 96, y, L(key), 180, 11, INK_2); y += n.height + 1; return n; });
    bottom = Math.max(bottom, y);
    return title.svg + notes.map(n => n.svg).join('');
  });
  panels.forEach((p, pi) => {
    const cx = p.x + 96;
    svg += `<rect x="${p.x}" y="16" width="192" height="152" rx="8" fill="${LIGHT}" stroke="${LINE}"/>`;
    const pts = [];
    for (const j of [-1, 0, 1]) for (const i of [-1, 0, 1]) pts.push([cx + i * s, cy + j * s, i, j]);
    // 鍵：相鄰原子之間；邊緣的原子往外畫半條鍵，讓每個原子都看得到四條鍵
    const bond = (x1, y1, x2, y2, single = false) => {
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, horizontal = y1 === y2;
      const d = horizontal ? [[-4, 0], [4, 0]] : [[0, -4], [0, 4]];
      let out = `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#94a3b8" stroke-width="1"/>`;
      out += `<circle cx="${mx + d[0][0]}" cy="${my + d[0][1]}" r="2.4" fill="${BLUE}"/>`;
      out += single ? `<circle cx="${mx + d[1][0]}" cy="${my + d[1][1]}" r="2.8" fill="#ffffff" stroke="${RED}" stroke-width="1.4"/>` : `<circle cx="${mx + d[1][0]}" cy="${my + d[1][1]}" r="2.4" fill="${BLUE}"/>`;
      return out;
    };
    for (const [x, y, i, j] of pts) {
      if (i < 1) svg += bond(x + r, y, x + s - r, y, p.hole && i === 0 && j === 0);
      if (j < 1) svg += bond(x, y + r, x, y + s - r);
      if (i === -1) svg += bond(x - r - stub, y, x - r, y);
      if (i === 1) svg += bond(x + r, y, x + r + stub, y);
      if (j === -1) svg += bond(x, y - r - stub, x, y - r);
      if (j === 1) svg += bond(x, y + r, x, y + r + stub);
    }
    for (const [x, y, i, j] of pts) {
      // 只有雜質原子加粗；純矽的中心原子與其他矽原子相同（審查意見）
      const center = i === 0 && j === 0 && p.center !== 'atomSi';
      svg += `<circle cx="${x}" cy="${y}" r="${r}" fill="${center ? p.fill : '#e2e8f0'}" stroke="${center ? p.stroke : INK_2}" stroke-width="${center ? 1.6 : 1}"/>` + t(x, y + 4, L(center ? p.center : 'atomSi'), 10.5, INK, 'middle', 600);
    }
    if (p.extra) {
      // 多出來、可以自由移動的電子
      svg += `<circle cx="${cx + 21}" cy="${cy - 21}" r="2.8" fill="${BLUE}"/><path d="M${cx + 26} ${cy - 24} q8 -2 10 6" fill="none" stroke="${BLUE}" stroke-width="1.2"/><path d="M${cx + 36} ${cy - 18} l-3.5 -3 4.5 -0.5z" fill="${BLUE}"/>`;
    }
    if (p.hole) svg += t(cx + s / 2 + 4, cy - 12, L('hole'), 10.5, RED, 'middle', 700);
    svg += notesOf[pi];
  });
  return { svg, height: Math.ceil(bottom + 8) };
}

// ch02 CMOS：上圖是同一片晶圓上的 P 井（NMOS）與 N 井（PMOS）；下圖兩步：離子掃過整片，光阻擋住的一側箭頭停在光阻內（技術審查修正）
// 左右配置：NMOS／P 井在左、PMOS／N 井在右，第 11 章 FEOL 改畫時沿用
function cmosWells(spec, en, kit) {
  const { L, t, para, arrow, mark } = tools(spec, en, kit);
  const N_FILL = BLUE_L, N_LINE = BLUE, P_FILL = PINK_L, P_LINE = PINK;
  let svg = t(320, 16, L('sameWafer'), 12, INK, 'middle', 700);
  svg += `<rect x="40" y="62" width="560" height="84" fill="#e2e8f0" stroke="${INK_2}"/>`;
  const well = (x, fill, stroke) => `<path d="M${x} 62 V118 a18 18 0 0 0 18 18 H${x + 212} a18 18 0 0 0 18 -18 V62" fill="${fill}" stroke="${stroke}" stroke-width="1.3"/>`;
  svg += well(64, P_FILL, P_LINE) + well(346, N_FILL, N_LINE);
  // 電晶體：源汲極顏色與 N／P 圖例一致（P 井內是 N 型、N 井內是 P 型）
  const device = (cx, sdFill, sdLine) => `<rect x="${cx - 70}" y="62" width="44" height="18" rx="3" fill="${sdFill}" stroke="${sdLine}"/><rect x="${cx + 26}" y="62" width="44" height="18" rx="3" fill="${sdFill}" stroke="${sdLine}"/>`
    + `<rect x="${cx - 26}" y="57" width="52" height="5" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".8"/><rect x="${cx - 26}" y="36" width="52" height="21" rx="2" fill="#cbd5e1" stroke="${INK_2}"/>`;
  svg += device(184, N_FILL, N_LINE) + device(466, P_FILL, P_LINE);
  // 元件名稱放在閘極上方，不寫在閘極方塊裡（審查意見：像在說閘極就是 NMOS）
  svg += t(184, 31, L('nmos'), 12, INK, 'middle', 700) + t(466, 31, L('pmos'), 12, INK, 'middle', 700);
  svg += t(184, 128, L('pWell'), 11, P_LINE, 'middle', 600) + t(466, 128, L('nWell'), 11, N_LINE, 'middle', 600);
  // 圖例
  svg += `<rect x="520" y="10" width="12" height="12" fill="${N_FILL}" stroke="${N_LINE}"/>` + t(536, 20, L('nType'), 10.5, INK_2, 'start')
    + `<rect x="574" y="10" width="12" height="12" fill="${P_FILL}" stroke="${P_LINE}"/>` + t(590, 20, L('pType'), 10.5, INK_2, 'start');
  let y = 166;
  const nDesc = [para(184, y, L('nmosCarrier'), 250, 11, INK_2), null];
  nDesc[1] = para(184, y + nDesc[0].height, L('nmosOn'), 250, 11, INK_2);
  const pDesc = [para(466, y, L('pmosCarrier'), 250, 11, INK_2), null];
  pDesc[1] = para(466, y + pDesc[0].height, L('pmosOn'), 250, 11, INK_2);
  svg += nDesc.map(d => d.svg).join('') + pDesc.map(d => d.svg).join('');
  y += Math.max(nDesc[0].height + nDesc[1].height, pDesc[0].height + pDesc[1].height) + 22;
  // 下圖：兩次微影與佈植，各遮住一半
  const step = (x, letter, coverRight) => {
    const top = y, sil = top + 58;
    let out = mark(x + 4, top + 4, letter);
    out += `<rect x="${x}" y="${sil}" width="250" height="34" fill="#e2e8f0" stroke="${INK_2}"/>`;
    const openX = coverRight ? x : x + 125;
    const coverX = coverRight ? x + 125 : x;
    // 井涵蓋整個沒被光阻擋住的一側：打進矽的離子都落在井裡（審查意見：原本有一支落在井外）
    out += `<path d="M${openX + 2} ${sil} V${sil + 18} a8 8 0 0 0 8 8 H${openX + 115} a8 8 0 0 0 8 -8 V${sil}" fill="${coverRight ? P_FILL : N_FILL}" stroke="${coverRight ? P_LINE : N_LINE}"/>`;
    out += `<rect x="${coverX}" y="${sil - 18}" width="125" height="18" fill="${RESIST}" stroke="${AMBER}"/>`;
    // 箭頭離光阻邊緣至少 6px，不貼著邊緣
    for (let i = 0; i < 9; i++) {
      const ax = x + 20 + i * 28;
      const covered = coverRight ? ax > x + 125 : ax < x + 125;
      out += arrow(ax, top + 14, ax, covered ? sil - 9 : sil + 12, RED, 1.2);
    }
    return out;
  };
  svg += step(40, 'A', true) + step(350, 'B', false);
  svg += t(227, y + 58 - 5, L('resist'), 10.5, INK, 'middle', 600);
  const note = para(320, y + 58 + 34 + 26, `${L('repeat')}${en ? ' ' : '，'}${L('separately')}`, 520, 11.5, INK, 'middle', 600);
  svg += note.svg;
  return { svg, height: Math.ceil(y + 58 + 34 + 26 + note.height + 2) };
}

// 晶格點：在多邊形內放旋轉過的格點（多晶的每顆小晶粒方向不同）
function latticeIn(poly, angle, step, color) {
  const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const inside = (x, y) => {
    let hit = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  };
  const near = (x, y) => poly.some((p, i) => {
    const q = poly[(i + 1) % poly.length];
    const dx = q[0] - p[0], dy = q[1] - p[1];
    const u = Math.max(0, Math.min(1, ((x - p[0]) * dx + (y - p[1]) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(x - (p[0] + u * dx), y - (p[1] + u * dy)) < 3;
  });
  const c = Math.cos(angle), s = Math.sin(angle);
  let out = '';
  for (let i = -12; i <= 12; i++) for (let j = -12; j <= 12; j++) {
    const x = cx + (i * c - j * s) * step, y = cy + (i * s + j * c) * step;
    if (inside(x, y) && !near(x, y)) out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.7" fill="${color}"/>`;
  }
  return out;
}

// ch03 從沙子到高純度多晶矽：上排沿用原本的純化步驟；下排是多晶與單晶的原子排列（一段一張圖，取代原本的流程方框）
function sandToPoly(spec, en, kit) {
  const { L, para, arrow, mark } = tools(spec, en, kit);
  let svg = '';
  const steps = [['metallurgical', 'metallurgicalNote'], ['hcl', 'hclNote'], ['distill', 'distillNote'], ['decompose', 'decomposeNote']];
  const w = 136, gap = (608 - 4 * w) / 3;
  const chips = steps.map(([a, b], i) => {
    const x = 16 + i * (w + gap);
    const head = para(x + w / 2, 0, L(a), w - 16, 11.5, INK, 'middle', 700);
    const note = para(x + w / 2, 0, L(b), w - 16, 10.5, INK_2);
    return { x, a, b, h: 18 + head.height + note.height };
  });
  const rowH = Math.ceil(Math.max(...chips.map(c => c.h)));
  chips.forEach((c, i) => {
    const tone = [TEAL_XL, BLUE_XL, AMBER_XL, '#f1f5f9'][i];
    const stroke = [TEAL, BLUE, AMBER, INK_2][i];
    svg += `<rect x="${c.x}" y="20" width="${w}" height="${rowH}" rx="6" fill="${tone}" stroke="${stroke}" stroke-width="1.2"/>`;
    const head = para(c.x + w / 2, 20 + 18, L(c.a), w - 16, 11.5, INK, 'middle', 700);
    svg += head.svg + para(c.x + w / 2, 20 + 18 + head.height, L(c.b), w - 16, 10.5, INK_2).svg + mark(c.x + 2, 22, 'ABCD'[i]);
    if (i < 3) svg += arrow(c.x + w + 2, 20 + rowH / 2, c.x + w + gap - 2, 20 + rowH / 2);
  });
  // 下排：右邊是電子級多晶矽（接在高溫分解之後），左邊是長晶後的單晶矽
  const top = 20 + rowH + 34;
  svg += arrow(16 + 3 * (w + gap) + w / 2, 20 + rowH + 2, 16 + 3 * (w + gap) + w / 2, top - 2);
  const panel = (x, letter, title, note, grains, labels) => {
    let out = `<rect x="${x}" y="${top}" width="294" height="0" rx="8" fill="#ffffff" stroke="${LINE}"/>`;
    const head = para(x + 147, top + 20, L(title), 270, 12, INK, 'middle', 700);
    const sub = para(x + 147, top + 20 + head.height, L(note), 270, 10.5, INK_2);
    out += head.svg + sub.svg;
    let y = top + 22 + head.height + sub.height;
    const box = { x: x + 14, y: y + 4, w: 132, h: 74 };
    out += `<rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" fill="${LIGHT}" stroke="${INK_2}"/>`;
    for (const [poly, angle] of grains) {
      const abs = poly.map(([px, py]) => [box.x + px * box.w, box.y + py * box.h]);
      out += latticeIn(abs, angle, 9, BLUE);
      if (grains.length > 1) out += `<path d="M${abs.map(p => p.join(' ')).join(' L')} Z" fill="none" stroke="${RED}" stroke-width="1.1"/>`;
    }
    let ly = box.y + 12;
    labels.forEach(([key, size, fill, weight]) => { const p = para(x + 156, ly, L(key), 124, size, fill, 'start', weight); out += p.svg; ly += p.height + 4; });
    const bottom = Math.max(box.y + box.h, ly - 4) + 12;
    out = out.replace('height="0"', `height="${bottom - top}"`);
    return { svg: out + mark(x + 2, top + 2, letter), bottom };
  };
  const poly = panel(330, 'E', 'eg', 'egNote', [
    [[[0, 0], [0.38, 0], [0.32, 0.48], [0, 0.56]], 0], [[[0.38, 0], [1, 0], [1, 0.4], [0.62, 0.54], [0.32, 0.48]], 0.6],
    [[[0, 0.56], [0.32, 0.48], [0.42, 1], [0, 1]], -0.45], [[[0.32, 0.48], [0.62, 0.54], [0.72, 1], [0.42, 1]], 1.05], [[[0.62, 0.54], [1, 0.4], [1, 1], [0.72, 1]], 0.25]
  ], [['poly', 12, RED, 700], ['grains', 10.5, INK_2, 400]]);
  const single = panel(16, 'F', 'growth', 'growthNote', [[[[0, 0], [1, 0], [1, 1], [0, 1]], 0]], [['single', 12, BLUE, 700], ['aligned', 10.5, INK_2, 400], ['waferSingle', 10.5, MUTED, 400]]);
  svg += poly.svg + single.svg;
  const mid = top + 40;
  svg += arrow(328, mid, 312, mid);
  return { svg, height: Math.ceil(Math.max(poly.bottom, single.bottom) + 10) };
}

// ch03 從晶棒到晶圓：六格小圖，標籤沿用原本流程方框；折成兩列，第二列由右往左
function ingotToWafer(spec, en, kit) {
  const { L, para, arrow, mark } = tools(spec, en, kit);
  const w = 186, gap = (608 - 3 * w) / 2;
  const art = [
    // 晶棒整形：切掉頭尾（虛線）、側面刻出晶格方向記號
    (x, y) => `<path d="M${x + 30} ${y + 30} l14 -6 v40 l-14 -6 z" fill="#e2e8f0" stroke="${MUTED}" stroke-dasharray="3 2"/><path d="M${x + 156} ${y + 30} l-14 -6 v40 l14 -6 z" fill="#e2e8f0" stroke="${MUTED}" stroke-dasharray="3 2"/>`
      + `<rect x="${x + 44}" y="${y + 24}" width="98" height="40" fill="${SI}" stroke="${INK_2}"/><ellipse cx="${x + 44}" cy="${y + 44}" rx="6" ry="20" fill="#cbd5e1" stroke="${INK_2}"/>`
      + `<path d="M${x + 52} ${y + 27} H${x + 136}" stroke="${BLUE}" stroke-width="2.2"/><path d="M${x + 44} ${y + 14} v60 M${x + 142} ${y + 14} v60" stroke="${RED}" stroke-width="1.2" stroke-dasharray="4 3"/>`,
    // 切片：多條平行線鋸同時穿過晶棒
    (x, y) => `<rect x="${x + 26}" y="${y + 26}" width="96" height="38" fill="${SI}" stroke="${INK_2}"/><ellipse cx="${x + 26}" cy="${y + 45}" rx="6" ry="19" fill="#cbd5e1" stroke="${INK_2}"/>`
      + Array.from({ length: 8 }, (_, i) => `<path d="M${x + 36 + i * 11} ${y + 14} V${y + 76}" stroke="${INK_2}" stroke-width="1"/>`).join('')
      + [0, 1, 2].map(i => `<ellipse cx="${x + 138 + i * 12}" cy="${y + 45}" rx="4" ry="19" fill="#e2e8f0" stroke="${INK_2}"/>`).join(''),
    // 研磨與倒角：表面磨平，直角邊緣磨成圓弧
    (x, y) => `<path d="M${x + 24} ${y + 32} H${x + 146} a12 12 0 0 1 0 24 H${x + 24} l4 -6 -4 -6 4 -6 -4 -6 z" fill="${SI}" stroke="${INK_2}"/><path d="M${x + 146} ${y + 32} h12 v24 h-12" fill="none" stroke="${RED}" stroke-dasharray="3 2"/>`
      + [60, 100].map(dx => `<path d="M${x + dx} ${y + 14} v12 M${x + dx - 4} ${y + 22} l4 4 4 -4 M${x + dx} ${y + 74} v-12 M${x + dx - 4} ${y + 66} l4 -4 4 4" fill="none" stroke="${TEAL}" stroke-width="1.3"/>`).join(''),
    // 蝕刻：左半是留下的表面損傷層（鋸齒），右半已被化學液去除
    (x, y) => `<path d="M${x + 24} ${y + 64} V${y + 40} ${Array.from({ length: 8 }, (_, i) => `L${x + 30 + i * 8} ${y + (i % 2 ? 40 : 33)}`).join(' ')} L${x + 92} ${y + 40} H${x + 162} V${y + 64} z" fill="${SI}" stroke="${INK_2}"/>`
      + [40, 60, 80].map(dx => `<path d="M${x + dx} ${y + 12} c-4 6 -4 9 0 9 s4 -3 0 -9" fill="${BLUE_L}" stroke="${BLUE}"/>`).join('')
      + `<path d="M${x + 92} ${y + 40} H${x + 162}" stroke="${TEAL}" stroke-width="2"/>`,
    // 拋光：表面像鏡子一樣平滑、反光
    (x, y) => `<ellipse cx="${x + 93}" cy="${y + 46}" rx="66" ry="22" fill="#e2e8f0" stroke="${INK_2}"/><path d="M${x + 60} ${y + 52} l18 -14 M${x + 74} ${y + 56} l22 -18 M${x + 98} ${y + 54} l12 -10" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round"/>`,
    // 清洗與檢驗：放大鏡檢查，合格打勾
    (x, y) => waferTop(x + 72, y + 44, 30, '#e2e8f0', INK_2) + `<circle cx="${x + 92}" cy="${y + 36}" r="15" fill="#ffffff" fill-opacity=".6" stroke="${TEAL}" stroke-width="2"/><path d="M${x + 103} ${y + 47} l14 14" stroke="${TEAL}" stroke-width="3" stroke-linecap="round"/>`
      + `<circle cx="${x + 138}" cy="${y + 22}" r="11" fill="${TEAL}"/><path d="M${x + 133} ${y + 22} l4 4 7 -8" fill="none" stroke="#ffffff" stroke-width="2"/>`
  ];
  const keys = [['shape', 'shapeNote'], ['slice', 'sliceNote'], ['lap', 'lapNote'], ['etch', 'etchNote'], ['polish', 'polishNote'], ['clean', 'cleanNote']];
  const textH = keys.map(([a, b]) => para(0, 0, L(a), w - 16, 12, INK, 'middle', 700).height + para(0, 0, L(b), w - 16, 10.5).height);
  const rowH = [0, 1].map(r => 90 + Math.max(...textH.slice(r * 3, r * 3 + 3)) + 12);
  let svg = '';
  keys.forEach(([a, b], i) => {
    const row = Math.floor(i / 3), col = row === 0 ? i : 2 - (i % 3);
    const x = 16 + col * (w + gap), y = 20 + (row ? rowH[0] + 30 : 0);
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${rowH[row]}" rx="8" fill="#ffffff" stroke="${LINE}"/>` + art[i](x, y);
    const head = para(x + w / 2, y + 100, L(a), w - 16, 12, INK, 'middle', 700);
    svg += head.svg + para(x + w / 2, y + 100 + head.height, L(b), w - 16, 10.5).svg + mark(x + 2, y + 2, 'ABCDEF'[i]);
    if (i === 2) svg += arrow(x + w / 2, y + rowH[0] + 2, x + w / 2, y + rowH[0] + 28);
    else if (i < 5) svg += row === 0 ? arrow(x + w + 2, y + 46, x + w + gap - 2, y + 46) : arrow(x - 2, y + 46, x - gap + 2, y + 46);
  });
  return { svg, height: Math.ceil(20 + rowH[0] + 30 + rowH[1] + 12) };
}

// ch03 晶圓尺寸：四個圓的直徑依正文數值按同一比例（300 mm 畫成 150px），底部對齊；450 mm 用虛線
function waferSizes(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const k = 0.5, gap = 18, base = 268;
  const sizes = [['d150', 'n150', 150], ['d200', 'n200', 200], ['d300', 'n300', 300], ['d450', null, 450]];
  let x = 18, svg = '';
  const centers = sizes.map(([, , d]) => { const r = (d * k) / 2; const c = x + r; x += d * k + gap; return [c, base - r, r]; });
  sizes.forEach(([dk, nk, d], i) => {
    const [cx, cy, r] = centers[i];
    if (d === 450) {
      svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${MUTED}" stroke-width="1.5" stroke-dasharray="7 5"/>`;
      svg += t(cx, cy - 18, L(dk), 13, MUTED, 'middle', 700);
      const studied = para(cx, cy + 4, L('studied'), 170, 10.5, INK_2);
      svg += studied.svg + para(cx, cy + 6 + studied.height, L('tooCostly'), 170, 10.5, MUTED).svg;
    } else {
      svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${['#e2e8f0', '#dbeafe', TEAL_XL][i]}" stroke="${[INK_2, BLUE, TEAL][i]}" stroke-width="1.5"/>`;
      svg += t(cx, cy - 2, L(dk), 12.5, INK, 'middle', 700) + t(cx, cy + 15, L(nk), 11.5, INK_2);
    }
  });
  // 200 mm 與 300 mm 之間：面積是 2.25 倍
  const [c2, y2, r2] = centers[1], [c3, y3, r3] = centers[2];
  svg += `<path d="M${c2} ${y2 - r2 - 4} C ${c2} ${y3 - r3 - 40}, ${c3} ${y3 - r3 - 40}, ${c3} ${y3 - r3 - 6}" fill="none" stroke="${TEAL}" stroke-width="1.5"/>` + arrow(c3, y3 - r3 - 14, c3, y3 - r3 - 4, TEAL, 1.5);
  const apex = (y2 - r2 - 4 + 6 * (y3 - r3 - 40) + y3 - r3 - 6) / 8;
  const areaLines = para(0, 0, L('area'), 250, 11.5).height / (11.5 * 1.3);
  const area = para((c2 + c3) / 2, apex - 10 - (areaLines - 1) * 11.5 * 1.3, L('area'), 250, 11.5, TEAL, 'middle', 600);
  svg += area.svg;
  return { svg, height: base + 16 };
}

// ch03 特殊晶圓：拋光、磊晶、SOI 三種剖面，未按比例但保留相對厚薄；磊晶層與基板同為單晶矽，用同色系加交界線（技術審查修正）
function specialWafers(spec, en, kit) {
  const { L, para } = tools(spec, en, kit);
  let svg = '';
  const cols = [16, 224, 432];
  const top = 30, blockW = 96;
  // 引線：從層的右緣拉到右側，標籤上下錯開，避免薄層的標籤擠在一起
  const lead = (xr, yLayer, yLabel, key) => { const p = para(xr + 18, yLabel + 4, L(key), 66, 10.5, INK_2, 'start'); return `<path d="M${xr} ${yLayer} H${xr + 8} V${yLabel} H${xr + 14}" fill="none" stroke="${MUTED}" stroke-dasharray="2 2"/>${p.svg}`; };
  // 拋光晶圓：一整塊單晶矽
  let x = cols[0] + 8;
  svg += `<rect x="${x}" y="${top + 26}" width="${blockW}" height="56" fill="${SI}" stroke="${INK_2}"/>`;
  // 磊晶晶圓：同樣的拋光晶圓，表面再長一層薄的單晶矽
  x = cols[1] + 8;
  svg += `<rect x="${x}" y="${top + 34}" width="${blockW}" height="48" fill="${SI}" stroke="${INK_2}"/><rect x="${x}" y="${top + 26}" width="${blockW}" height="8" fill="#c7d7e2" stroke="${INK_2}"/><path d="M${x} ${top + 34} h${blockW}" stroke="${TEAL}" stroke-width="1.4" stroke-dasharray="4 2"/>`
    + lead(x + blockW, top + 30, top + 22, 'epiLayer');
  // SOI：薄矽／絕緣層／矽（支撐基板最厚）
  x = cols[2] + 8;
  svg += `<rect x="${x}" y="${top + 42}" width="${blockW}" height="40" fill="${SI}" stroke="${INK_2}"/><rect x="${x}" y="${top + 34}" width="${blockW}" height="8" fill="${AMBER_XL}" stroke="${AMBER}"/><rect x="${x}" y="${top + 26}" width="${blockW}" height="8" fill="${SI}" stroke="${INK_2}"/>`
    + lead(x + blockW, top + 30, top + 6, 'thinSi') + lead(x + blockW, top + 38, top + 40, 'insulator') + lead(x + blockW, top + 62, top + 74, 'siBase');
  const texts = [['polished', []], ['epi', ['epiNote']], ['soi', ['soiNote', 'soiLeak', 'soiUse']]];
  let bottom = 0;
  texts.forEach(([title, notes], i) => {
    let y = top + 108;
    const head = para(cols[i] + 96, y, L(title), 180, 12.5, INK, 'middle', 700);
    svg += head.svg; y += head.height + 2;
    for (const key of notes) { const p = para(cols[i] + 96, y, L(key), 180, 11, INK_2); svg += p.svg; y += p.height + 1; }
    bottom = Math.max(bottom, y);
  });
  return { svg, height: Math.ceil(bottom + 8) };
}

// ── B 批（2.19.0，ch04–ch10 製程模組）──
const COPPER = '#d9ac73';
const AL = '#cbd5e1';
const PLASMA = '#ede9fe';
const VIOLET = '#5b21b6';
const GREEN = '#15803d';
// 和銅同框的圖，光阻畫成淺底加斜線，避免看成銅（審查意見：RESIST 與 COPPER 幾乎同色）
const hatched = (x, y, w, h, fill, stroke) => {
  let d = '';
  // 斜線從底邊往右上畫，碰到右邊界就停，不超出方框
  for (let s = 2; s < w; s += 7) { const e = Math.min(h, w - s); d += `M${x + s} ${y + h} l${e} ${-e} `; }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}"/><path d="${d.trim()}" stroke="${stroke}" stroke-width=".8"/>`;
};
const hatchedResist = (x, y, w, h) => hatched(x, y, w, h, AMBER_XL, AMBER);

// ch04 對準：左邊俯視導線說明 CD（虛線是 CD 偏大時的輪廓，誇大畫出）；右邊三格俯視：對準、往 X 偏離開接觸點、偏到旁邊的接觸點
// 導線沿 Y 方向，偏移沿 X 方向，與導線垂直，偏移後明顯離開接觸點（技術審查修正）
function overlayCd(spec, en, kit) {
  const { L, t, para, arrow, dim, lead, mark, icon } = tools(spec, en, kit);
  let svg = t(156, 24, `${L('cdTitle')} · ${L('cdName')}`, 13, INK, 'middle', 700);
  svg += `<rect x="30" y="46" width="170" height="100" rx="4" fill="${LIGHT}" stroke="${LINE}"/>`
    + `<rect x="60" y="46" width="28" height="100" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="128" y="46" width="28" height="100" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + `<rect x="120" y="46" width="44" height="100" fill="none" stroke="${RED}" stroke-width="1.3" stroke-dasharray="4 3"/>`;
  svg += lead(164, 70, 210, 70) + para(214, 66, L('cdLarge'), 82, 10.5, RED, 'start', 600).svg;
  svg += lead(128, 146, 128, 164) + lead(156, 146, 156, 164) + dim(128, 160, 156, 160, INK);
  const width = para(142, 180, L('lineWidth'), 200, 10.5, INK_2);
  let ly = 180 + width.height + 10;
  const def = para(156, ly, L('cdDef'), 260, 11, INK);
  const node = para(156, ly + def.height + 2, L('notNode'), 260, 10.5, MUTED);
  svg += width.svg + def.svg + node.svg;
  const leftBottom = ly + def.height + 2 + node.height;
  // 右：Overlay
  svg += t(472, 24, L('overlay'), 13, INK, 'middle', 700);
  const odef = para(472, 42, L('overlayDef'), 290, 11, INK_2);
  svg += odef.svg;
  const my = 42 + odef.height + 34;
  const contact = (cx, cy, stroke = BLUE) => `<rect x="${cx - 9}" y="${cy - 9}" width="18" height="18" fill="${BLUE_L}" stroke="${stroke}" stroke-width="${stroke === BLUE ? 1 : 1.8}"/>`;
  const line = (cx, dashed) => dashed ? `<rect x="${cx - 7}" y="${my}" width="14" height="70" fill="none" stroke="${MUTED}" stroke-dasharray="3 2"/>` : `<rect x="${cx - 7}" y="${my}" width="14" height="70" fill="${TEAL_L}" fill-opacity=".9" stroke="${TEAL}"/>`;
  // C：旁邊的接觸點靠得較近，偏移的導線同時壓到自己與旁邊的接觸點，兩個節點被接在一起（審查意見：原本整條移到旁邊，同時變成斷路）
  const minis = [
    { x: 326, own: 46, neighbor: null, shift: 0 },
    { x: 426, own: 46, neighbor: null, shift: 20 },
    { x: 526, own: 30, neighbor: 54, shift: 12 }
  ];
  minis.forEach((m, i) => {
    svg += `<rect x="${m.x}" y="${my}" width="92" height="90" rx="4" fill="${LIGHT}" stroke="${LINE}"/>` + contact(m.x + m.own, my + 61);
    if (m.neighbor) svg += contact(m.x + m.neighbor, my + 61, RED);
    if (m.shift) svg += line(m.x + m.own, true);
    svg += line(m.x + m.own + m.shift) + mark(m.x + 2, my + 2, 'ABC'[i]);
  });
  svg += icon('check', 362, my + 96, 20, GREEN);
  svg += t(472, my + 112, L('open'), 11.5, RED, 'middle', 700) + t(572, my + 112, L('short'), 11.5, RED, 'middle', 700);
  // 往 X 方向的偏移：B、C 兩格上方
  svg += arrow(440, my - 10, 610, my - 10, RED, 1.5) + t(525, my - 16, L('shiftX'), 10.5, RED, 'middle', 600);
  let ry = my + 136;
  svg += `<rect x="330" y="${ry - 10}" width="12" height="12" fill="${BLUE_L}" stroke="${BLUE}"/>` + t(348, ry, L('contact'), 10.5, INK_2, 'start')
    + `<rect x="470" y="${ry - 10}" width="12" height="12" fill="${TEAL_L}" stroke="${TEAL}"/>` + t(488, ry, L('metalLine'), 10.5, INK_2, 'start');
  const land = para(472, ry + 20, L('land'), 290, 11, INK);
  const few = para(472, ry + 22 + land.height, `${L('advanced')}${en ? ', ' : '，'}${L('fewNm')}`, 290, 11, INK_2);
  svg += land.svg + few.svg;
  return { svg, height: Math.ceil(Math.max(leftBottom, ry + 22 + land.height + few.height) + 6) };
}

// ch04 常見異常：四張卡片只放異常名稱、小圖與一句結果，可能原因留給表格（技術審查修正）
function lithoDefects(spec, en, kit) {
  const { L, t, para, lead } = tools(spec, en, kit);
  const w = 146, gap = (608 - 4 * w) / 3;
  const art = [
    // CD 偏大或偏小：虛線是目標線寬，左邊偏窄、右邊偏寬
    (x, y) => [[34, 8], [73, 12], [112, 18]].map(([dx, lw]) => `<rect x="${x + dx - lw / 2}" y="${y + 8}" width="${lw}" height="64" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${x + dx - 6}" y="${y + 8}" width="12" height="64" fill="none" stroke="${INK_2}" stroke-dasharray="3 2"/>`).join(''),
    // 局部失焦：背面的顆粒把晶圓頂高，凸起處的圖形離開清楚成像的範圍（顆粒與頂高都誇大）
    (x, y) => `<rect x="${x + 10}" y="${y + 48}" width="126" height="9" fill="${TEAL_XL}"/><path d="M${x + 10} ${y + 48} h126 M${x + 10} ${y + 57} h126" stroke="${TEAL}" stroke-dasharray="3 2"/>`
      + `<rect x="${x + 10}" y="${y + 66}" width="126" height="10" rx="2" fill="#e2e8f0" stroke="${INK_2}"/><circle cx="${x + 73}" cy="${y + 61}" r="4.5" fill="${RED}"/>`
      + `<path d="M${x + 10} ${y + 63} H${x + 52} C${x + 62} ${y + 63}, ${x + 64} ${y + 52}, ${x + 73} ${y + 52} S${x + 84} ${y + 63}, ${x + 94} ${y + 63} H${x + 136}" fill="none" stroke="#94a3b8" stroke-width="5"/>`
      + [18, 30, 42, 104, 116, 128].map(dx => `<path d="M${x + dx} ${y + 52} v6" stroke="${TEAL}" stroke-width="2"/>`).join('')
      + [64, 73, 82].map(dx => `<path d="M${x + dx} ${y + 40} v8" stroke="${TEAL}" stroke-width="4" stroke-opacity=".3"/>`).join('')
      + lead(x + 78, y + 64, x + 104, y + 84) + t(x + 106, y + 88, L('particle'), 10, RED, 'start'),
    // Overlay 超規：上層導線整排偏移，接不到下層的接觸點
    (x, y) => [50, 96].map(dx => `<rect x="${x + dx - 8}" y="${y + 50}" width="16" height="16" fill="${BLUE_L}" stroke="${BLUE}"/><rect x="${x + dx - 6}" y="${y + 8}" width="12" height="62" fill="none" stroke="${MUTED}" stroke-dasharray="3 2"/><rect x="${x + dx + 12}" y="${y + 8}" width="12" height="62" fill="${TEAL_L}" fill-opacity=".9" stroke="${TEAL}"/>`).join(''),
    // 光阻缺陷：顯影後的光阻線條，氣泡處缺一段、顆粒處變形
    (x, y) => `<rect x="${x + 28}" y="${y + 8}" width="18" height="64" fill="${RESIST}" stroke="${AMBER}"/>`
      + `<path d="M${x + 64} ${y + 8} h18 v24 h-18 z M${x + 64} ${y + 48} h18 v24 h-18 z" fill="${RESIST}" stroke="${AMBER}"/><circle cx="${x + 73}" cy="${y + 40}" r="7" fill="none" stroke="${MUTED}" stroke-dasharray="2 2"/>`
      + `<path d="M${x + 100} ${y + 8} h18 v34 q10 6 0 14 v16 h-18 z" fill="${RESIST}" stroke="${AMBER}"/><circle cx="${x + 122}" cy="${y + 49}" r="4" fill="${RED}"/>`
  ];
  const cards = [['cd', 'cdResult'], ['defocus', 'defocusResult'], ['overlay', 'overlayResult'], ['resist', 'resistResult']];
  const texts = cards.map(([a, b]) => [para(0, 0, L(a), w - 16, 12, INK, 'middle', 700), para(0, 0, L(b), w - 16, 10.5)]);
  const cardH = 106 + Math.max(...texts.map(([a, b]) => a.height + b.height)) + 6;
  let svg = '';
  cards.forEach(([a, b], i) => {
    const x = 16 + i * (w + gap);
    svg += `<rect x="${x}" y="12" width="${w}" height="${cardH}" rx="8" fill="#ffffff" stroke="${LINE}"/>` + art[i](x, 16);
    const head = para(x + w / 2, 118, L(a), w - 16, 12, INK, 'middle', 700);
    svg += head.svg + para(x + w / 2, 118 + head.height, L(b), w - 16, 10.5, RED).svg;
  });
  return { svg, height: Math.ceil(12 + cardH + 8) };
}

// ch05 為什麼需要薄膜：主剖面只畫成品中仍存在的層；硬遮罩放在右上小圖（只在製程中使用），三色分組圖例（技術審查修正）
function filmStack(spec, en, kit) {
  const { L, t, para, lead } = tools(spec, en, kit);
  const X0 = 136, X1 = 404;
  let svg = `<rect x="${X0}" y="172" width="${X1 - X0}" height="28" fill="${SI}" stroke="${INK_2}"/>`
    + `<rect x="${X0}" y="100" width="${X1 - X0}" height="72" fill="${TEAL_XL}" stroke="${TEAL}"/>`
    // 氮化矽屬絕緣層，同時當蝕刻停止層：填色用絕緣色、外框用輔助製程的粉紅（審查意見）
    + `<rect x="${X0}" y="92" width="${X1 - X0}" height="8" fill="${TEAL_L}" stroke="${PINK}" stroke-width="1.3"/>`
    + `<rect x="${X0}" y="40" width="${X1 - X0}" height="52" fill="${TEAL_XL}" stroke="${TEAL}"/>`
    // 多晶矽閘極與基板之間有一層很薄的閘極絕緣層（審查意見：原本直接貼在基板上）
    + `<rect x="226" y="142" width="56" height="26" rx="2" fill="${AMBER_L}" stroke="${AMBER}"/><rect x="222" y="168" width="64" height="4" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".8"/>`
    + [[150, 40], [214, 80], [316, 36], [364, 30]].map(([x, w]) => `<rect x="${x}" y="48" width="${w}" height="28" rx="2" fill="${COPPER}" stroke="${RED}"/>`).join('')
    + `<rect x="247" y="76" width="14" height="66" fill="${COPPER}" stroke="${RED}"/>`;
  // 左側標籤欄，以引線接到各層
  const tag = (y, key, fill, toX, toY, weight = 600) => para(16, y, L(key), 112, 11, fill, 'start', weight).svg + lead(118, y - 4, toX, toY);
  svg += tag(66, 'metal', RED, 150, 62) + tag(98, 'nitride', TEAL, X0, 96) + para(16, 112, L('etchStop'), 112, 10.5, PINK, 'start', 600).svg
    + tag(140, 'oxide', TEAL, X0, 136) + tag(166, 'poly', AMBER, 226, 158);
  // 右上：硬遮罩小圖，畫在待蝕刻層上、光阻下
  // 標題與說明在上，小剖面在下（標題同為粉紅色，對應硬遮罩那一層）；光阻畫斜線，不和導電的銅色混淆（審查意見）
  svg += `<rect x="424" y="22" width="200" height="114" rx="8" fill="#ffffff" stroke="${LINE}"/>`
    + `<rect x="444" y="108" width="160" height="18" fill="${TEAL_XL}" stroke="${TEAL}"/>`
    + [452, 512, 572].map(x => `<rect x="${x}" y="100" width="24" height="8" fill="${PINK_L}" stroke="${PINK}"/>` + hatchedResist(x, 84, 24, 16)).join('');
  svg += t(524, 42, L('hardMask'), 12, PINK, 'middle', 700) + para(524, 58, L('helpPrecise'), 180, 10, INK_2).svg;
  // 圖例：絕緣、導電、輔助製程
  let y = 156;
  [['insulate', 'insulateDoes', TEAL_XL, TEAL], ['conduct', 'conductDoes', COPPER, RED], ['support', 'supportDoes', PINK_L, PINK]].forEach(([name, note, fill, stroke]) => {
    const head = para(446, y, L(name), 176, 11.5, INK, 'start', 700);
    const body = para(446, y + head.height, L(note), 176, 10.5, INK_2, 'start');
    // 導電一類有金屬與多晶矽兩種顏色，圖例方塊左右各半
    svg += (name === 'conduct' ? `<rect x="426" y="${y - 10}" width="6" height="12" fill="${COPPER}" stroke="${RED}"/><rect x="432" y="${y - 10}" width="6" height="12" fill="${AMBER_L}" stroke="${AMBER}"/>` : `<rect x="426" y="${y - 10}" width="12" height="12" fill="${fill}" stroke="${stroke}"/>`) + head.svg + body.svg;
    y += head.height + body.height + 6;
  });
  return { svg, height: Math.ceil(Math.max(212, y) + 4) };
}

// ch05 熱氧化：左邊直立爐管（晶圓水平疊放，氧氣或水蒸氣擇一通入）；右邊乾式、濕式剖面，虛線是原本的矽表面，
// 氧化層虛線上方略厚於下方、新的矽介面低於原表面（技術審查修正；不標數字）
function thermalOxidation(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  let svg = para(108, 18, L('gasIn'), 184, 11, INK, 'middle', 600).svg;
  svg += `<rect x="40" y="60" width="136" height="150" rx="10" fill="${AMBER_XL}" stroke="${AMBER}" stroke-width="1.3"/>`
    + Array.from({ length: 11 }, (_, i) => `<path d="M48 ${72 + i * 12} q-6 6 0 12 M168 ${72 + i * 12} q6 6 0 12" fill="none" stroke="${AMBER}" stroke-width="1.3"/>`).join('')
    + `<path d="M60 210 V96 a48 30 0 0 1 96 0 V210" fill="#ffffff" stroke="${MUTED}" stroke-width="1.4"/>`
    + `<path d="M78 92 V204 M138 92 V204" stroke="${MUTED}" stroke-width="1.8"/>`
    + Array.from({ length: 16 }, (_, i) => `<path d="M76 ${96 + i * 6.6} h64" stroke="${INK_2}" stroke-width="1.8"/>`).join('')
    + `<path d="M108 40 V64" stroke="${TEAL}" stroke-width="2"/>` + arrow(108, 56, 108, 76, TEAL, 2)
    + [[96, 84], [122, 86]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${RED}"/><circle cx="${x + 5}" cy="${y}" r="2.6" fill="${RED}"/>`).join('');
  let y = 230;
  const name = para(108, y, L('furnace'), 180, 12.5, INK, 'middle', 700); y += name.height;
  const batch = para(108, y, L('batchTool'), 180, 11, INK_2); y += batch.height;
  const hundred = para(108, y, L('hundred'), 180, 11, INK_2); y += hundred.height;
  svg += name.svg + batch.svg + hundred.svg;
  const leftBottom = y;
  // 右：乾式與濕式的剖面
  const panel = (x, title, gas, total, rate, trait, consumed) => {
    const top = 130 - Math.round(total * 0.55), bottom = 130 + Math.round(total * 0.45);
    let out = `<rect x="${x}" y="12" width="196" height="0" rx="8" fill="#ffffff" stroke="${LINE}"/>`;
    out += t(x + 98, 32, L(title), 13, INK, 'middle', 700) + t(x + 98, 50, L(gas), 11, INK_2);
    out += `<rect x="${x + 16}" y="${bottom}" width="100" height="${176 - bottom}" fill="${SI}" stroke="${INK_2}"/>`
      + `<rect x="${x + 16}" y="${top}" width="100" height="${bottom - top}" fill="${TEAL_L}" stroke="${TEAL}"/>`
      + `<path d="M${x + 10} 130 h112" stroke="${INK}" stroke-width="1.2" stroke-dasharray="5 3"/><path d="M${x + 16} ${bottom} h100" stroke="${TEAL}" stroke-width="2.4"/>`
      + t(x + 66, 168, L('silicon'), 11, INK);
    out += total > 30 ? t(x + 66, top + 16, L('sio2'), 10.5, TEAL, 'middle', 600) : '';
    if (consumed) out += `<path d="M${x + 120} 130 h5 v${bottom - 130} h-5" fill="none" stroke="${TEAL}" stroke-width="1.4"/>` + para(x + 130, 136, L('consumed'), 64, 10, TEAL, 'start', 600).svg;
    let ty = 196;
    const r = para(x + 98, ty, L(rate), 180, 12, INK, 'middle', 700); ty += r.height;
    const tr = para(x + 98, ty, L(trait), 176, 10.5, INK_2); ty += tr.height;
    return { svg: out + r.svg + tr.svg, bottom: ty };
  };
  const dry = panel(220, 'dry', 'useO2', 16, 'slow', 'quality', false);
  const wet = panel(428, 'wet', 'useSteam', 44, 'fast', 'thicker', true);
  // 乾式太薄，「二氧化矽」用引線標在右側
  const dryLabel = `<path d="M336 128 h18" stroke="${MUTED}" stroke-dasharray="2 2"/>` + t(358, 132, L('sio2'), 10.5, TEAL, 'start', 600);
  const panelBottom = Math.max(dry.bottom, wet.bottom) + 6;
  // 中文補上主詞「氧化層」；英文的介面句本身已有 the oxide
  const iface = para(422, panelBottom + 18, en ? L('interface') : `${L('oxideLayer')}${L('interface')}`, 400, 11, TEAL, 'middle', 600);
  svg += (dry.svg + wet.svg).replace(/height="0"/g, `height="${panelBottom - 12}"`) + dryLabel + iface.svg;
  return { svg, height: Math.ceil(Math.max(leftBottom, panelBottom + 18 + iface.height) + 4) };
}

// ch05 CVD：左邊 LPCVD 畫成熱壁管（管內多片晶圓、外圍加熱器、一端進氣一端抽走）；右邊 PECVD 平行板單片腔，
// 氣體從上電極（噴淋頭）進入，兩電極間有電漿光暈，晶圓剖面內有金屬線（技術審查修正；兩邊都不標溫度數字）
function cvdTypes(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  // 上方共同元素：氣體進、固態薄膜、廢氣抽走
  const common = [['gasesIn', TEAL], ['solidFilm', BLUE], ['exhaust', MUTED]];
  let svg = '', ch = 0;
  common.forEach(([key, color], i) => {
    const x = 16 + i * 208;
    const p = para(x + 22, 26, L(key), 178, 11, INK, 'start', 600);
    ch = Math.max(ch, p.height);
    svg += (i === 1 ? `<rect x="${x}" y="17" width="14" height="10" fill="${TEAL_L}" stroke="${TEAL}"/>` : arrow(x, 22, x + 16, 22, color, 2)) + p.svg;
  });
  const top = 26 + ch + 14;
  // 左：LPCVD 熱壁管
  const ty = top + 20;
  svg += `<rect x="44" y="${ty}" width="232" height="84" rx="8" fill="${AMBER_XL}" stroke="${AMBER}" stroke-width="1.3"/>`
    + Array.from({ length: 10 }, (_, i) => `<path d="M${56 + i * 22} ${ty + 6} q6 -6 12 0 M${56 + i * 22} ${ty + 78} q6 6 12 0" fill="none" stroke="${AMBER}" stroke-width="1.3"/>`).join('')
    + `<rect x="36" y="${ty + 14}" width="248" height="56" rx="26" fill="#ffffff" stroke="${MUTED}" stroke-width="1.4"/>`
    + Array.from({ length: 14 }, (_, i) => `<path d="M${88 + i * 11} ${ty + 22} V${ty + 62}" stroke="${INK_2}" stroke-width="2"/>`).join('')
    + `<path d="M82 ${ty + 64} H240" stroke="${MUTED}" stroke-width="2"/>`
    + arrow(14, ty + 42, 34, ty + 42, TEAL, 2) + arrow(286, ty + 42, 308, ty + 42, MUTED, 2);
  let ly = ty + 106;
  const lp = [['lpcvdName', 12.5, INK, 700], ['lpEnergy', 11, AMBER, 600], ['lpGood', 11, INK_2, 400], ['lpHot', 11, INK_2, 400]].map(([key, size, fill, weight]) => {
    const text = key === 'lpcvdName' ? (en ? `${L('lpcvd')} (${L('lpName')})` : `${L('lpcvd')}（${L('lpName')}）`) : L(key);
    const p = para(160, ly, text, 280, size, fill, 'middle', weight); ly += p.height; return p.svg;
  }).join('');
  svg += lp;
  // 右：PECVD 平行板單片腔
  const px = 340;
  svg += `<rect x="${px + 20}" y="${ty}" width="232" height="96" rx="8" fill="${LIGHT}" stroke="${INK_2}" stroke-width="1.3"/>`
    + `<rect x="${px + 60}" y="${ty + 12}" width="152" height="10" fill="#cbd5e1" stroke="${INK_2}"/>` + Array.from({ length: 9 }, (_, i) => `<circle cx="${px + 72 + i * 16}" cy="${ty + 24}" r="1.4" fill="${INK_2}"/>`).join('')
    + `<path d="M${px + 136} ${ty - 18} V${ty + 12}" stroke="${TEAL}" stroke-width="2"/>` + arrow(px + 136, ty - 10, px + 136, ty + 10, TEAL, 2)
    + `<ellipse cx="${px + 136}" cy="${ty + 46}" rx="74" ry="16" fill="${PLASMA}" stroke="${VIOLET}" stroke-opacity=".5"/>`
    + `<rect x="${px + 92}" y="${ty + 66}" width="88" height="5" fill="#e2e8f0" stroke="${INK_2}"/><rect x="${px + 60}" y="${ty + 71}" width="152" height="10" fill="#cbd5e1" stroke="${INK_2}"/>`
    + arrow(px + 252, ty + 84, px + 276, ty + 84, MUTED, 2) + t(px + 136, ty + 50, L('plasma'), 10.5, VIOLET, 'middle', 600);
  // 晶圓剖面小圖：已經有金屬線，薄膜蓋在上面
  const zx = px + 28, zy = ty + 108;
  svg += `<rect x="${zx}" y="${zy + 30}" width="96" height="14" fill="${SI}" stroke="${INK_2}"/>` + [zx + 12, zx + 52].map(x => `<rect x="${x}" y="${zy + 18}" width="28" height="12" fill="${COPPER}" stroke="${RED}"/>`).join('')
    // 薄膜等厚貼住金屬線與基板（審查意見：原本和金屬之間留了白縫，像空洞）
    + `<path d="M${zx} ${zy + 30} V${zy + 26} H${zx + 8} V${zy + 14} H${zx + 44} V${zy + 26} H${zx + 48} V${zy + 14} H${zx + 84} V${zy + 26} H${zx + 96} V${zy + 30} H${zx + 80} V${zy + 18} H${zx + 52} V${zy + 30} H${zx + 40} V${zy + 18} H${zx + 12} V${zy + 30} Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + `<path d="M${px + 96} ${ty + 71} L${zx + 48} ${zy + 8}" stroke="${MUTED}" stroke-dasharray="2 2"/>`;
  const fit = para(zx + 108, zy + 18, L('fitMetal'), 140, 10.5, INK, 'start', 600);
  const cant = para(zx + 108, zy + 18 + fit.height, L('metalCant'), 140, 10.5, RED, 'start');
  svg += fit.svg + cant.svg;
  let ry = Math.max(zy + 52, zy + 18 + fit.height + cant.height) + 14;
  const pe = [['pecvdName', 12.5, INK, 700], ['peEnergy', 11, VIOLET, 600], ['peLow', 11, INK_2, 400]].map(([key, size, fill, weight]) => {
    const text = key === 'pecvdName' ? (en ? `${L('pecvd')} (${L('peName')})` : `${L('pecvd')}（${L('peName')}）`) : L(key);
    const p = para(px + 136, ry, text, 280, size, fill, 'middle', weight); ry += p.height; return p.svg;
  }).join('');
  svg += pe;
  return { svg, height: Math.ceil(Math.max(ly, ry) + 6) };
}

// ch05 磊晶：左邊原子排列的剖面，新膜的原子落在底下晶圓同一組格線上；右邊是交替堆疊的矽與矽鍺層
function epitaxy(spec, en, kit) {
  const { L, t, para, lead } = tools(spec, en, kit);
  let svg = para(180, 22, L('specialCvd'), 330, 12, INK, 'middle', 700).svg;
  const x0 = 40, y0 = 52, s = 22, cols = 11;
  svg += `<rect x="${x0 - 14}" y="${y0 - 14}" width="${(cols - 1) * s + 28}" height="${6 * s + 28}" rx="6" fill="#ffffff" stroke="${LINE}"/>`;
  for (let i = 0; i < cols; i++) svg += `<path d="M${x0 + i * s} ${y0 - 10} V${y0 + 6 * s + 10}" stroke="${TEAL}" stroke-opacity=".35" stroke-dasharray="2 3"/>`;
  for (let j = 0; j < 7; j++) for (let i = 0; i < cols; i++) {
    const film = j < 3;
    svg += `<circle cx="${x0 + i * s}" cy="${y0 + j * s}" r="6" fill="${film ? TEAL_L : '#e2e8f0'}" stroke="${film ? TEAL : INK_2}"/>`;
  }
  svg += `<path d="M${x0 - 14} ${y0 + 2.5 * s} h${(cols - 1) * s + 28}" stroke="${INK}" stroke-dasharray="5 3"/>`;
  const right = x0 + (cols - 1) * s + 22;
  svg += lead(right - 8, y0 + s, right + 4, y0 + s) + para(right + 8, y0 + s + 4, L('newFilm'), 100, 11, TEAL, 'start', 700).svg
    + lead(right - 8, y0 + 4.5 * s, right + 4, y0 + 4.5 * s) + para(right + 8, y0 + 4.5 * s + 4, L('wafer'), 100, 11, INK_2, 'start', 700).svg;
  const cont = para(180, y0 + 6 * s + 40, L('continues'), 330, 11, INK);
  const single = para(180, y0 + 6 * s + 40 + cont.height, L('singleCrystal'), 330, 11, TEAL, 'middle', 600);
  svg += cont.svg + single.svg;
  const leftBottom = y0 + 6 * s + 40 + cont.height + single.height;
  // 右：先進電晶體裡交替堆疊的矽與矽鍺
  const rx = 470;
  svg += para(rx + 60, 22, L('advanced'), 200, 12, INK, 'middle', 700).svg;
  svg += `<rect x="${rx}" y="168" width="120" height="30" fill="#e2e8f0" stroke="${INK_2}"/>`
    // 由下往上先長矽鍺，再與矽交替；矽不會直接疊在矽基板上（審查意見）
    + Array.from({ length: 6 }, (_, i) => `<rect x="${rx}" y="${66 + i * 17}" width="120" height="17" fill="${i % 2 ? AMBER_L : '#e2e8f0'}" stroke="${i % 2 ? AMBER : INK_2}"/>`).join('');
  const stack = para(rx + 60, 222, L('stack'), 200, 11, INK);
  svg += stack.svg + `<rect x="${rx - 2}" y="${236 + stack.height - 18}" width="12" height="12" fill="#e2e8f0" stroke="${INK_2}"/>` + t(rx + 16, 236 + stack.height - 8, L('si'), 10.5, INK_2, 'start')
    + `<rect x="${rx + 62}" y="${236 + stack.height - 18}" width="12" height="12" fill="${AMBER_L}" stroke="${AMBER}"/>` + t(rx + 80, 236 + stack.height - 8, L('sige'), 10.5, INK_2, 'start');
  return { svg, height: Math.ceil(Math.max(leftBottom, 236 + stack.height) + 8) };
}

// ch05 薄膜要看哪些指標：上半一張剖面標出五個指標；下半是填窄溝的兩種長法
// 上列溝槽中段略寬，薄膜各處等厚，開口先合攏、中段留下空洞；開口頂端不畫懸垂，避免和 PVD 的懸垂混淆（技術審查修正）
function filmMetrics(spec, en, kit) {
  const { L, t, para, dim, lead, mark, legend } = tools(spec, en, kit);
  let svg = '';
  // 主剖面：基板上有一個台階，薄膜蓋在上面；台階上方的薄膜裡夾著一顆微粒
  svg += `<path d="M24 150 V112 H170 V72 H300 V150 Z" fill="${SI}" stroke="${INK_2}"/>`
    + `<path d="M24 112 V100 H158 V60 H300 V72 H170 V112 Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + `<circle cx="244" cy="64" r="5" fill="${RED}"/>`;
  // 階梯覆蓋：頂部、側壁、底部三處的厚度（審查意見：原本只有一條引線，看不出比的是哪三處）
  svg += dim(60, 100, 60, 112, INK) + mark(78, 88, 'A') + mark(146, 80, 'C') + mark(262, 44, 'E')
    + dim(210, 60, 210, 72, TEAL) + dim(158, 90, 170, 90, TEAL) + dim(132, 100, 132, 112, TEAL);
  // 均勻度：同一片晶圓不同位置、不同晶圓之間
  const wafer = (cx, cy, shade) => waferTop(cx, cy, 24, '#ffffff', INK_2) + [[0, 0], [-12, -8], [12, -8], [-12, 10], [12, 10]].map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${cy + dy}" r="3.2" fill="${shade}"/>`).join('');
  svg += wafer(366, 86, TEAL) + wafer(426, 86, TEAL) + mark(340, 56, 'B');
  // 應力：晶圓翹曲，薄膜在右端剝落翹起（正文：翹曲或薄膜剝落）
  svg += `<path d="M488 104 Q548 70 608 104" fill="none" stroke="${SI}" stroke-width="9"/><path d="M488 98 Q548 64 594 90" fill="none" stroke="${TEAL}" stroke-width="3"/>`
    + `<path d="M594 90 q10 -2 16 -14" fill="none" stroke="${TEAL}" stroke-width="3"/>` + mark(500, 62, 'D');
  svg += legend([['A', 'thickness'], ['B', 'uniformity'], ['C', 'stepCoverage'], ['D', 'stress'], ['E', 'particles']], 180);
  // 下半：要把窄溝填滿時
  let y = 202;
  svg += `<path d="M16 ${y} H624" stroke="${LINE}"/>`;
  y += 22;
  svg += t(320, y, L('fillTitle'), 12.5, INK, 'middle', 700);
  // 接回上方的階梯覆蓋：覆蓋均勻不一定是好事（舊圖說「常見混淆」的意思）
  const notGood = para(320, y + 18, L('notAlwaysGood'), 500, 11, RED, 'middle', 600);
  svg += notGood.svg;
  const top = y + 18 + notGood.height + 6;
  // 溝槽：開口略窄、中段略寬（實際蝕刻常見的微凸輪廓）
  const trench = x => `<path d="M${x} ${top} H${x + 34} C${x + 30} ${top + 30}, ${x + 30} ${top + 50}, ${x + 36} ${top + 76} H${x + 64} C${x + 70} ${top + 50}, ${x + 70} ${top + 30}, ${x + 66} ${top} H${x + 100} V${top + 90} H${x} Z" fill="${SI}" stroke="${INK_2}"/>`;
  // 填滿後的薄膜：表面一層加上整個溝槽（沿溝槽輪廓反向走一圈）
  const film = (x, inner) => `<path d="M${x} ${top - 8} H${x + 100} V${top} H${x + 66} C${x + 70} ${top + 30}, ${x + 70} ${top + 50}, ${x + 64} ${top + 76} H${x + 36} C${x + 30} ${top + 50}, ${x + 30} ${top + 30}, ${x + 34} ${top} H${x} Z" fill="${TEAL_L}" stroke="${TEAL}"/>` + inner;
  // 等厚生長：途中開口變窄；結果開口合攏、中段留下空洞
  // 途中：薄膜沿側壁、底部與表面等厚，剩下的開口在頂端最窄
  const confA = x => trench(x) + film(x, `<path d="M${x + 41} ${top - 8} C${x + 37} ${top + 30}, ${x + 37} ${top + 50}, ${x + 43} ${top + 68} H${x + 57} C${x + 63} ${top + 50}, ${x + 63} ${top + 30}, ${x + 59} ${top - 8} Z" fill="#ffffff" stroke="${TEAL}"/><path d="M${x + 41.5} ${top - 8} H${x + 58.5}" stroke="#ffffff" stroke-width="2"/>`);
  const confB = x => trench(x) + film(x, `<path d="M${x + 50} ${top + 14} C${x + 44} ${top + 30}, ${x + 42} ${top + 52}, ${x + 46} ${top + 66} H${x + 54} C${x + 58} ${top + 52}, ${x + 56} ${top + 30}, ${x + 50} ${top + 14} Z" fill="#ffffff" stroke="${RED}"/>`);
  const upA = x => trench(x) + `<path d="M${x + 33} ${top + 46} C${x + 33} ${top + 60}, ${x + 34} ${top + 70}, ${x + 36} ${top + 76} H${x + 64} C${x + 66} ${top + 70}, ${x + 67} ${top + 60}, ${x + 67} ${top + 46} Z" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${x}" y="${top - 4}" width="34" height="4" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${x + 66}" y="${top - 4}" width="34" height="4" fill="${TEAL_L}" stroke="${TEAL}"/>`;
  const upB = x => trench(x) + film(x, '');
  svg += confA(30) + `<path d="M138 ${top + 44} h20" stroke="${TEAL}" stroke-width="1.5"/><path d="M158 ${top + 44} l-6 -4 v8 z" fill="${TEAL}"/>` + confB(170);
  svg += upA(344) + `<path d="M452 ${top + 44} h20" stroke="${TEAL}" stroke-width="1.5"/><path d="M472 ${top + 44} l-6 -4 v8 z" fill="${TEAL}"/>` + upB(484);
  svg += lead(220, top + 40, 290, top + 40) + t(292, top + 44, L('voidShort'), 10.5, RED, 'start', 600);
  let ly = top + 108;
  const side = para(160, ly, L('sidewalls'), 290, 11.5, INK, 'middle', 700);
  const close = para(160, ly + side.height, `${L('closeFirst')}${en ? ' and ' : '，'}${L('void')}`, 290, 10.5, RED);
  const up = para(474, ly, L('bottomUp'), 290, 11.5, INK, 'middle', 700);
  const want = para(474, ly + up.height, L('want'), 290, 10.5, TEAL, 'middle', 600);
  svg += side.svg + close.svg + up.svg + want.svg;
  return { svg, height: Math.ceil(ly + Math.max(side.height + close.height, up.height + want.height) + 6) };
}

// ch06 蝕刻在做什麼：三格剖面，光阻圖形經蝕刻轉印到底下的材料，最後拿掉光阻
function etchTransfer(spec, en, kit) {
  const { L, t, para, arrow, mark, lead } = tools(spec, en, kit);
  const w = 184, xs = [16, 228, 440];
  let svg = '';
  const base = x => `<rect x="${x + 8}" y="120" width="168" height="24" fill="${SI}" stroke="${INK_2}"/>`;
  const resist = x => `<rect x="${x + 8}" y="74" width="56" height="18" fill="${RESIST}" stroke="${AMBER}"/><rect x="${x + 120}" y="74" width="56" height="18" fill="${RESIST}" stroke="${AMBER}"/>`;
  // A：微影後，圖形只在光阻上
  let x = xs[0];
  svg += base(x) + `<rect x="${x + 8}" y="92" width="168" height="28" fill="${TEAL_L}" stroke="${TEAL}"/>` + resist(x)
    + lead(x + 36, 74, x + 36, 58) + t(x + 36, 52, L('resist'), 10.5, AMBER, 'middle', 600);
  // B：蝕刻中，開口下方的材料被去除，光阻下方受到保護
  x = xs[1];
  svg += base(x) + `<rect x="${x + 8}" y="92" width="56" height="28" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${x + 120}" y="92" width="56" height="28" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + `<rect x="${x + 64}" y="92" width="56" height="28" fill="none" stroke="${RED}" stroke-dasharray="3 2"/>` + resist(x)
    + [76, 92, 108].map(dx => arrow(x + dx, 34, x + dx, 112, VIOLET, 1.4)).join('') + [24, 48, 136, 160].map(dx => arrow(x + dx, 34, x + dx, 68, VIOLET, 1.4)).join('');
  // C：拿掉光阻，圖形留在材料上
  x = xs[2];
  svg += base(x) + `<rect x="${x + 8}" y="92" width="56" height="28" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${x + 120}" y="92" width="56" height="28" fill="${TEAL_L}" stroke="${TEAL}"/>`;
  svg += arrow(204, 106, 224, 106) + arrow(416, 106, 436, 106);
  // 圖下文字
  const a = para(xs[0] + w / 2, 166, L('onlyResist'), w - 12, 11, INK);
  const covered = [para(xs[1] + 48, 166, L('covered'), 88, 10.5, INK, 'middle', 600), null];
  covered[1] = para(xs[1] + 48, 166 + covered[0].height, L('protected'), 88, 10.5, TEAL, 'middle', 600);
  const open = [para(xs[1] + 136, 166, L('uncovered'), 88, 10.5, INK, 'middle', 600), null];
  open[1] = para(xs[1] + 136, 166 + open[0].height, L('removed'), 88, 10.5, RED, 'middle', 600);
  const c = para(xs[2] + w / 2, 166, L('transfer'), w - 12, 11, INK);
  svg += a.svg + covered.map(p => p.svg).join('') + open.map(p => p.svg).join('') + c.svg
    // 引線終點落在受保護的材料與被去除的開口內，不指進基板（審查意見）
    + lead(xs[1] + 36, 150, xs[1] + 36, 106) + lead(xs[1] + 92, 150, xs[1] + 92, 106);
  const textBottom = 166 + Math.max(a.height, covered[0].height + covered[1].height, open[0].height + open[1].height, c.height);
  xs.forEach((px, i) => { svg = `<rect x="${px}" y="16" width="${w}" height="${textBottom - 4}" rx="8" fill="#ffffff" stroke="${LINE}"/>` + svg + mark(px + 2, 18, 'ABC'[i]); });
  const stencil = para(320, textBottom + 32, L('stencil'), 560, 11.5, AMBER, 'middle', 600);
  return { svg: svg + stencil.svg, height: Math.ceil(textBottom + 32 + stencil.height) };
}

// ch06 電漿：左邊真空腔體裡的電漿（離子、電子、活潑原子團），右邊放大一個溝槽：原子團負責化學反應、離子提供方向
function plasma(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const ion = (x, y) => `<circle cx="${x}" cy="${y}" r="5.5" fill="${PINK_L}" stroke="${PINK}"/><path d="M${x - 3} ${y} h6 M${x} ${y - 3} v6" stroke="${PINK}" stroke-width="1.4"/>`;
  const electron = (x, y) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${BLUE}"/>`;
  const radical = (x, y) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${TEAL_L}" stroke="${TEAL}"/><circle cx="${x + 3.5}" cy="${y - 3.5}" r="1.3" fill="${TEAL}"/>`;
  const head = para(184, 20, L('plasmaIs'), 340, 11.5, INK, 'middle', 700);
  const fourth = para(184, 20 + head.height, L('fourth'), 340, 10.5, VIOLET, 'middle', 600);
  let svg = head.svg + fourth.svg;
  const top = 20 + head.height + fourth.height + 18;
  // 真空腔體、上電極、電漿光暈、下電極與晶圓
  svg += `<rect x="24" y="${top}" width="220" height="150" rx="10" fill="${LIGHT}" stroke="${INK_2}" stroke-width="1.4"/>`
    + `<path d="M134 ${top - 16} V${top + 12}" stroke="${TEAL}" stroke-width="2"/>` + arrow(134, top - 10, 134, top + 10, TEAL, 2)
    + `<rect x="54" y="${top + 12}" width="160" height="8" fill="#cbd5e1" stroke="${INK_2}"/>`
    + `<rect x="50" y="${top + 26}" width="168" height="84" rx="30" fill="${PLASMA}" stroke="${VIOLET}" stroke-opacity=".4"/>`
    + `<rect x="84" y="${top + 114}" width="100" height="6" fill="#e2e8f0" stroke="${INK_2}"/><rect x="54" y="${top + 120}" width="160" height="10" fill="#cbd5e1" stroke="${INK_2}"/>`
    + [[72, 46], [118, 70], [168, 50], [194, 86], [98, 92]].map(([x, y]) => ion(x, top + y)).join('')
    + [[86, 62], [140, 44], [182, 70], [120, 98], [204, 58], [66, 84]].map(([x, y]) => electron(x, top + y)).join('')
    + [[100, 52], [152, 84], [174, 98], [130, 60], [80, 100], [196, 40], [62, 64], [146, 100]].map(([x, y]) => radical(x, top + y)).join('')
    // 電漿裡大部分仍是沒有帶電的氣體分子（審查意見：不要畫成全是帶電粒子）
    + [[88, 40], [160, 66], [112, 84], [184, 56], [70, 98], [206, 96], [138, 34]].map(([x, y]) => `<circle cx="${x}" cy="${top + y}" r="3.2" fill="#e2e8f0" stroke="${MUTED}"/><circle cx="${x + 5}" cy="${top + y}" r="3.2" fill="#e2e8f0" stroke="${MUTED}"/>`).join('');
  svg += para(146, top - 8, L('gasIn'), 120, 10.5, TEAL, 'start', 600).svg;
  // 射頻電力接到下電極
  const rfY = top + 172;
  svg += `<path d="M134 ${top + 130} V${rfY - 12}" stroke="${INK_2}" stroke-width="1.4"/><circle cx="134" cy="${rfY}" r="12" fill="#ffffff" stroke="${INK_2}" stroke-width="1.4"/><path d="M126 ${rfY} q4 -8 8 0 t8 0" fill="none" stroke="${INK_2}" stroke-width="1.4"/>`;
  const rf = para(152, rfY + 4, L('rf'), 190, 10.5, INK_2, 'start', 600);
  svg += rf.svg;
  // 右側標籤欄：真空腔體、微弱的光
  const vac = para(254, top + 14, L('vacuum'), 96, 10.5, INK_2, 'start', 600);
  const glow = para(254, top + 60, L('glow'), 96, 10.5, VIOLET, 'start', 600);
  svg += vac.svg + lead(244, top + 10, 252, top + 10) + glow.svg + lead(218, top + 56, 252, top + 56);
  // 圖例
  let ly = rfY + 4 + Math.max(rf.height, 20) + 12;
  [[ion, 'ions'], [electron, 'electrons'], [radical, 'radicals']].forEach(([glyph, key]) => {
    const p = para(48, ly, L(key), 290, 10.5, INK_2, 'start');
    svg += glyph(34, ly - 4) + p.svg; ly += p.height + 6;
  });
  // 右：放大的溝槽
  const zx = 366;
  svg += `<rect x="${zx}" y="${top - 30}" width="258" height="196" rx="8" fill="#ffffff" stroke="${LINE}"/>` + lead(184, top + 116, zx, top + 70);
  svg += para(zx + 129, top - 10, L('fastPrecise'), 230, 11.5, INK, 'middle', 700).svg;
  const my = top + 70;
  svg += `<path d="M${zx + 24} ${my} H${zx + 104} V${my + 56} H${zx + 152} V${my} H${zx + 232} V${my + 80} H${zx + 24} Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + `<rect x="${zx + 24}" y="${my - 16}" width="80" height="16" fill="${RESIST}" stroke="${AMBER}"/><rect x="${zx + 152}" y="${my - 16}" width="80" height="16" fill="${RESIST}" stroke="${AMBER}"/>`
    + [116, 128, 140].map(dx => arrow(zx + dx, my - 40, zx + dx, my + 50, PINK, 1.4) + ion(zx + dx, my - 44)).join('')
    // 原子團集中在溝槽底部，避免讀成側壁也被橫向蝕刻（審查意見）
    + [[110, my + 50], [146, my + 46], [128, my + 52], [118, my + 44], [138, my + 50]].map(([dx, y]) => radical(zx + dx, y)).join('');
  const ionsDir = para(zx + 16, my - 56, L('ionsDirection'), 88, 10.5, PINK, 'start', 600);
  const react = para(zx + 129, my + 100, L('radicalsReact'), 230, 10.5, TEAL, 'middle', 600);
  svg += ionsDir.svg + react.svg + lead(zx + 128, my + 58, zx + 128, my + 88);
  // 放大框的高度包住底下的說明，框線不穿過文字（審查意見）
  const boxBottom = my + 100 + react.height;
  svg = svg.replace(`width="258" height="196"`, `width="258" height="${boxBottom - (top - 30)}"`);
  return { svg, height: Math.ceil(Math.max(ly, boxBottom + 4, top + 166) + 6) };
}

// ch06 蝕刻要看哪些指標：一個蝕刻到停止層的溝槽標出指標；CD 變化畫成同一個特徵的光阻開口寬與蝕刻後溝槽寬；
// 均勻度的小圖是蝕刻中途、還沒到停止層的兩個溝槽，深度不同（技術審查修正）
function etchMetrics(spec, en, kit) {
  const { L, t, para, dim, lead, mark, legend } = tools(spec, en, kit);
  let svg = `<rect x="30" y="170" width="360" height="20" fill="${SI}" stroke="${INK_2}"/><rect x="30" y="160" width="360" height="10" fill="${BLUE_L}" stroke="${BLUE}"/>`
    + `<path d="M30 100 H180 L192 160 H228 L240 100 H390 V160 H30 Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + `<rect x="30" y="84" width="150" height="16" fill="${RESIST}" stroke="${AMBER}"/><rect x="240" y="84" width="150" height="16" fill="${RESIST}" stroke="${AMBER}"/>`
    // 光阻也被吃掉一些：虛線是蝕刻前的光阻厚度；停止層在溝底被吃掉一點（審查意見：原本像選擇比無限大）
    + `<rect x="30" y="76" width="150" height="8" fill="none" stroke="${AMBER}" stroke-dasharray="3 2"/><rect x="240" y="76" width="150" height="8" fill="none" stroke="${AMBER}" stroke-dasharray="3 2"/>`
    + `<path d="M192 160 V162.5 H228 V160" fill="#ffffff" stroke="${BLUE}"/>`
    // 輪廓：右壁虛線往外凸、左壁虛線往內縮
    + `<path d="M240 100 Q256 130 228 160" fill="none" stroke="${RED}" stroke-dasharray="3 2"/><path d="M180 100 Q202 128 192 160" fill="none" stroke="${RED}" stroke-dasharray="3 2"/>`;
  // 蝕刻率：溝槽深度
  svg += dim(166, 100, 166, 160, INK) + mark(150, 128, 'A');
  // CD 變化：微影後的光阻開口寬、蝕刻後的溝槽底寬；「蝕刻後」放在溝底右側，英文才不會壓到側壁（審查意見）
  svg += lead(180, 76, 180, 64) + lead(240, 76, 240, 64) + dim(180, 70, 240, 70, INK) + t(210, 62, L('afterLitho'), 10, INK_2)
    + dim(192, 150, 228, 150, RED) + t(236, 154, L('afterEtch'), 9.5, RED, 'start', 600) + mark(282, 66, 'E');
  // 選擇比：對光阻的選擇比與對下層材料的選擇比是兩個不同的數字
  const selResist = para(30, 50, L('selResist'), 140, 10, AMBER, 'start', 600);
  const target = para(342, 132, L('targetMat'), 84, 10.5, TEAL, 'middle', 600);
  svg += selResist.svg + target.svg + mark(292, 128, 'C') + `<circle cx="110" cy="165" r="2" fill="${BLUE}"/>` + lead(110, 166, 110, 198)
    + para(110, 212, `${L('notWanted')}${en ? ': ' : '：'}${L('selUnder')}`, 220, 10.5, BLUE, 'middle', 600).svg;
  svg += mark(258, 124, 'D');
  // 均勻度：晶圓中心與邊緣，蝕刻中途的深度不同
  const bx = 430;
  svg += `<rect x="${bx}" y="40" width="194" height="150" rx="8" fill="#ffffff" stroke="${LINE}"/>` + mark(bx + 2, 42, 'B')
    + waferTop(bx + 46, 112, 30, '#ffffff', INK_2) + `<circle cx="${bx + 46}" cy="112" r="3.5" fill="${TEAL}"/><circle cx="${bx + 68}" cy="96" r="3.5" fill="${TEAL}"/>`;
  const trench = (x, depth) => `<path d="M${x} 90 H${x + 14} V${90 + depth} H${x + 26} V90 H${x + 40} V146 H${x} Z" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${x}" y="146" width="40" height="8" fill="${BLUE_L}" stroke="${BLUE}"/><rect x="${x}" y="154" width="40" height="10" fill="${SI}" stroke="${INK_2}"/>`;
  svg += trench(bx + 96, 40) + trench(bx + 146, 24) + lead(bx + 50, 112, bx + 96, 124) + lead(bx + 72, 96, bx + 146, 104);
  return { svg: svg + legend([['A', 'rate'], ['B', 'uniformity'], ['C', 'selectivity'], ['D', 'profile'], ['E', 'cd']], 250), height: 262 };
}

// ch07 劑量與能量：2×2 剖面；往右能量越高、打得越深，往下劑量越高、原子越多（深度與數量互不影響）
function doseEnergy(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const cx = [180, 400], cy = [86, 190], w = 200, h = 88;
  let svg = t(390, 22, L('energy'), 13, INK, 'middle', 700) + arrow(200, 34, 580, 34, TEAL, 1.6);
  const eDef = para(390, 52, `${L('energyDef')}${en ? '. ' : '，'}${L('energySets')}`, 380, 10.5, INK_2);
  svg += eDef.svg;
  svg += t(80, 92, L('dose'), 13, INK, 'middle', 700) + arrow(150, 86, 150, 270, TEAL, 1.6);
  // 中文定義在「每單位面積」後換行，不把「打進」拆成兩行（審查意見）
  const doseDef = L('doseDef');
  const dDef = en ? para(80, 112, doseDef, 110, 10.5, INK_2) : { svg: t(80, 112, doseDef.slice(0, 5), 10.5, INK_2) + t(80, 125.65, doseDef.slice(5), 10.5, INK_2), height: 27.3 };
  const dSets = para(80, 116 + dDef.height, L('doseSets'), 110, 10.5, INK_2);
  svg += dDef.svg + dSets.svg;
  // 每格：矽的剖面，點是打進去的原子；淺／深由能量決定，多／少由劑量決定；打得越深，分布也略寬
  [0, 1].forEach(r => [0, 1].forEach(c => {
    const x = cx[c], y = cy[r], n = r ? 26 : 8, depth = c ? 58 : 22, spread = c ? 4.5 : 3;
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e2e8f0" stroke="${INK_2}"/><path d="M${x} ${y} h${w}" stroke="${INK}" stroke-width="2"/>`;
    for (let k = 0; k < n; k++) svg += `<circle cx="${(x + 12 + (k + 0.5) * (176 / n)).toFixed(1)}" cy="${y + depth + ((k * 7) % 5) * spread - 2 * spread}" r="3" fill="${BLUE}"/>`;
  }));
  const deeper = para(390, 302, L('deeperNotMore'), 420, 11, PINK, 'middle', 600);
  const count = para(390, 304 + deeper.height, L('countByDose'), 420, 10.5, INK_2);
  svg += deeper.svg + count.svg;
  return { svg, height: Math.ceil(304 + deeper.height + count.height + 4) };
}

// ch07 熱預算：同一顆電晶體經過三次高溫，源汲極一次比一次深、寬，最後在閘極下方靠近
function thermalBudget(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const head = para(320, 22, `${L('everyHot')}${en ? ' ' : '，'}${L('diffuse')}`, 560, 12, INK, 'middle', 700);
  let svg = head.svg;
  const top = 22 + head.height + 26;
  const w = 168, xs = [16, 236, 456];
  const stages = [[0, 16], [8, 28], [14, 42]];
  stages.forEach(([g, d], i) => {
    const x = xs[i], s = top + 24;
    svg += `<rect x="${x}" y="${s}" width="${w}" height="74" fill="#e2e8f0" stroke="${INK_2}"/>`
      + `<rect x="${x + 64}" y="${s - 4}" width="40" height="4" fill="${AMBER_XL}" stroke="${AMBER}" stroke-width=".8"/><rect x="${x + 64}" y="${s - 24}" width="40" height="20" rx="2" fill="${AMBER_L}" stroke="${AMBER}"/>`;
    // 擴散往各方向都一樣：內外兩側外擴相同的量；虛線是前一格的輪廓（審查意見）
    const region = (xa, xb, dd, dashed) => `<path d="M${xa} ${s} V${s + dd - 8} q0 8 8 8 H${xb - 8} q8 0 8 -8 V${s}${dashed ? '' : ' Z'}" fill="${dashed ? 'none' : BLUE_L}" stroke="${BLUE}"${dashed ? ' stroke-dasharray="3 2"' : ''}/>`;
    const pair = (gg, dd, dashed) => region(x + 24 - gg, x + 66 + gg, dd, dashed) + region(x + 102 - gg, x + 144 + gg, dd, dashed);
    svg += pair(g, d, false) + (i ? pair(stages[i - 1][0], stages[i - 1][1], true) : '');
    if (i < 2) svg += arrow(x + w + 8, s + 37, xs[i + 1] - 8, s + 37, AMBER, 1.8) + icon('heat', x + w + 15, s + 4, 22, AMBER);
  });
  const s = top + 24;
  svg += t(xs[0] + 45, s + 92, L('source'), 10.5, BLUE, 'middle', 600) + t(xs[0] + 123, s + 92, L('drain'), 10.5, BLUE, 'middle', 600);
  const adds = para(xs[1] + w / 2, s + 92, L('adds'), w, 11, INK, 'middle', 600);
  const distort = para(xs[1] + w / 2, s + 94 + adds.height, L('distort'), w, 10.5, INK_2);
  const deep = para(xs[2] + w / 2, s + 92, L('tooDeep'), w, 11, INK, 'middle', 600);
  const leak = para(xs[2] + w / 2, s + 94 + deep.height, L('leak'), w, 11, RED, 'middle', 700);
  svg += adds.svg + distort.svg + deep.svg + leak.svg;
  return { svg, height: Math.ceil(s + 94 + Math.max(adds.height + distort.height, deep.height + leak.height) + 6) };
}

// 起伏的表面：在幾個圖形位置疊加平滑的山丘，回傳折線點（ch08 共用）
const hills = (x0, x1, base, height, centers, spread) => {
  const pts = [];
  for (let x = x0; x <= x1; x += 4) pts.push([x, base - height * Math.max(...centers.map(c => Math.exp(-(((x - c) / spread) ** 2))))]);
  return pts;
};
const curve = pts => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y.toFixed(1)}`).join(' ');

// ch08 為什麼要磨平：左上層層堆疊後表面像丘陵；左下 CMP 磨平；右邊兩個問題（對不準焦、溝槽外多餘的銅去不掉）
function whyPlanarize(spec, en, kit) {
  const { L, t, para, arrow, mark } = tools(spec, en, kit);
  const head = para(160, 20, L('follows'), 290, 11.5, INK, 'middle', 700);
  let svg = head.svg;
  const top = 20 + head.height + 10;
  const feats = [70, 150, 230];
  // 由上往下畫：每層都從自己的表面一路填到基板，下一層再蓋上去；整片薄膜只會順著起伏，不會放大高低差（審查意見）
  [[top + 24, 15, AMBER_XL, AMBER], [top + 40, 15, BLUE_XL, BLUE], [top + 56, 15, TEAL_XL, TEAL]].forEach(([base, h, fill, stroke]) => {
    svg += `<path d="${curve(hills(30, 290, base, h, feats, 26))} L290 ${top + 96} L30 ${top + 96} Z" fill="${fill}" stroke="${stroke}"/>`;
  });
  svg += feats.map(c => `<rect x="${c - 18}" y="${top + 70}" width="36" height="12" fill="${COPPER}" stroke="${RED}"/>`).join('') + `<rect x="30" y="${top + 82}" width="260" height="20" fill="${SI}" stroke="${INK_2}"/>`;
  const hilly = para(160, top + 122, L('hills'), 290, 11, INK_2);
  svg += hilly.svg;
  // 左下：CMP 磨平後
  let y = top + 122 + hilly.height + 12;
  svg += arrow(160, y - 4, 160, y + 18, TEAL, 1.6);
  const cmp = para(176, y + 12, L('cmp'), 140, 11, TEAL, 'start', 700);
  svg += cmp.svg;
  y += Math.max(28, cmp.height + 14);
  svg += `<rect x="30" y="${y}" width="260" height="34" fill="${TEAL_XL}" stroke="${TEAL}"/>` + feats.map(c => `<rect x="${c - 18}" y="${y + 22}" width="36" height="12" fill="${COPPER}" stroke="${RED}"/>`).join('')
    + `<rect x="30" y="${y + 34}" width="260" height="18" fill="${SI}" stroke="${INK_2}"/>`;
  const level = para(160, y + 70, L('level'), 290, 10.5, INK_2);
  svg += level.svg;
  const leftBottom = y + 70 + level.height;
  // 右：兩個問題
  const rx = 330;
  svg += t(rx + 147, 20, L('twoProblems'), 12, INK, 'middle', 700);
  svg += `<rect x="${rx}" y="34" width="294" height="0" rx="8" fill="#ffffff" stroke="${LINE}"/>` + mark(rx + 2, 36, 'A');
  const fa = para(rx + 147, 56, L('focus'), 260, 12, INK, 'middle', 700);
  svg += fa.svg;
  const fy = 56 + fa.height + 16;
  // 清楚成像的範圍很淺：高處在範圍內、低處在範圍外
  svg += `<rect x="${rx + 20}" y="${fy + 6}" width="254" height="14" fill="${TEAL_XL}"/><path d="M${rx + 20} ${fy + 6} h254 M${rx + 20} ${fy + 20} h254" stroke="${TEAL}" stroke-dasharray="4 3"/>`
    + `<path d="${curve(hills(rx + 20, rx + 274, fy + 46, 34, [rx + 90, rx + 210], 30))} L${rx + 274} ${fy + 64} L${rx + 20} ${fy + 64} Z" fill="${BLUE_XL}" stroke="${BLUE}"/>`
    // 虛線帶就是能清楚成像的焦距範圍，標在兩座山丘之間（審查意見：原本沒有標示）
    + t(rx + 150, fy + 17, L('focusRange'), 10, TEAL, 'middle', 600);
  const fn = para(rx + 147, fy + 82, L('focusNote'), 260, 10.5, INK_2);
  svg += fn.svg;
  const by = fy + 82 + fn.height + 14;
  svg += `<rect x="${rx}" y="${by}" width="294" height="0" rx="8" fill="#ffffff" stroke="${LINE}"/>` + mark(rx + 2, by + 2, 'B');
  const eb = para(rx + 147, by + 22, L('excess'), 260, 12, INK, 'middle', 700);
  svg += eb.svg;
  const ey = by + 22 + eb.height + 10;
  svg += `<rect x="${rx + 30}" y="${ey + 12}" width="234" height="34" fill="${TEAL_XL}" stroke="${TEAL}"/>`
    + `<path d="M${rx + 30} ${ey} H${rx + 264} V${ey + 12} H${rx + 224} V${ey + 34} H${rx + 194} V${ey + 12} H${rx + 162} V${ey + 34} H${rx + 132} V${ey + 12} H${rx + 100} V${ey + 34} H${rx + 70} V${ey + 12} H${rx + 30} Z" fill="${COPPER}" stroke="${RED}"/>`
    // 虛線是要磨到的位置：線以上就是溝槽外多餘的銅
    + `<path d="M${rx + 20} ${ey + 12} H${rx + 274}" stroke="${INK}" stroke-dasharray="4 3"/>`;
  const en2 = para(rx + 147, ey + 64, L('excessNote'), 260, 10.5, INK_2);
  svg += en2.svg;
  const rightBottom = ey + 64 + en2.height;
  svg = svg.replace('height="0"', `height="${by - 8 - 34}"`).replace('height="0"', `height="${rightBottom + 4 - by}"`);
  return { svg, height: Math.ceil(Math.max(leftBottom, rightBottom + 4) + 8) };
}

// ch08 假圖形：上排俯視，空曠區補上不通電的假圖形（小方塊不和導線相連）；下排剖面以銅 CMP 為例，
// 沒補時密集導線區較低（導線較薄）、空曠區較高，補了之後平坦、導線厚度一致（技術審查修正）
function dummyFill(spec, en, kit) {
  const { L, t, para, lead } = tools(spec, en, kit);
  const head = para(320, 20, L('rateDensity'), 560, 11.5, INK, 'middle', 700);
  let svg = head.svg;
  const top = 20 + head.height + 10;
  const plan = (x, fill) => {
    let out = `<rect x="${x}" y="${top}" width="288" height="96" rx="4" fill="${LIGHT}" stroke="${LINE}"/>`
      + Array.from({ length: 9 }, (_, i) => `<rect x="${x + 12 + i * 13}" y="${top + 10}" width="7" height="76" fill="${COPPER}" stroke="${RED}" stroke-width=".8"/>`).join('');
    if (fill) for (let i = 0; i < 7; i++) for (let j = 0; j < 4; j++) out += `<rect x="${x + 152 + i * 18}" y="${top + 12 + j * 20}" width="10" height="10" fill="${COPPER}" fill-opacity=".55" stroke="${RED}" stroke-width=".8"/>`;
    return out;
  };
  svg += plan(16, false) + plan(336, true);
  const empty = para(226, top + 50, L('emptyArea'), 120, 10.5, INK_2);
  svg += empty.svg;
  const added = para(480, top + 118, L('added'), 280, 11, INK, 'middle', 700);
  const noCurrent = para(480, top + 118 + added.height, L('noCurrent'), 280, 10.5, INK_2);
  svg += added.svg + noCurrent.svg + lead(530, top + 86, 530, top + 106);
  // 下排：研磨後的剖面
  const sy = top + 118 + added.height + noCurrent.height + 28;
  const dense = x => Array.from({ length: 9 }, (_, i) => x + 12 + i * 13);
  // 沒補：密集區表面較低，導線較薄；空曠區較高
  svg += `<path d="M16 ${sy + 12} H130 C150 ${sy + 12}, 160 ${sy}, 180 ${sy} H304 V${sy + 46} H16 Z" fill="${TEAL_XL}" stroke="${TEAL}"/>`
    + dense(16).map(x => `<rect x="${x}" y="${sy + 12}" width="7" height="22" fill="${COPPER}" stroke="${RED}" stroke-width=".8"/>`).join('')
    + `<rect x="16" y="${sy + 46}" width="288" height="12" fill="${SI}" stroke="${INK_2}"/><path d="M16 ${sy} H304" stroke="${INK}" stroke-dasharray="4 3"/>`;
  // 補了：整片平坦，導線與假圖形厚度一致
  svg += `<rect x="336" y="${sy + 4}" width="288" height="42" fill="${TEAL_XL}" stroke="${TEAL}"/>`
    + dense(336).map(x => `<rect x="${x}" y="${sy + 4}" width="7" height="30" fill="${COPPER}" stroke="${RED}" stroke-width=".8"/>`).join('')
    + Array.from({ length: 7 }, (_, i) => `<rect x="${488 + i * 18}" y="${sy + 4}" width="10" height="30" fill="${COPPER}" fill-opacity=".55" stroke="${RED}" stroke-width=".8"/>`).join('')
    + `<rect x="336" y="${sy + 58 - 12}" width="288" height="12" fill="${SI}" stroke="${INK_2}"/>`;
  let ly = sy + 78;
  const uneven = para(160, ly, L('uneven'), 280, 11, RED, 'middle', 700);
  ly += uneven.height + 2;
  const effects = para(160, ly, [L('notFlat'), L('defocus'), L('thickness'), L('shorts')].join(en ? ', ' : '、'), 280, 10.5, INK_2);
  const even = para(480, sy + 78, L('evenDensity'), 280, 11, TEAL, 'middle', 700);
  const polish = para(480, sy + 78 + even.height + 2, L('polishEven'), 280, 10.5, INK_2);
  svg += uneven.svg + effects.svg + even.svg + polish.svg;
  return { svg, height: Math.ceil(Math.max(ly + effects.height, sy + 80 + even.height + polish.height) + 6) };
}

// ch09 污染有哪幾種：晶圓表面上的四種污染，各配常見來源；下方是鈉離子在閘極氧化層內往矽介面方向移動，造成 Vt 漂移（技術審查修正）
function contaminants(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const zones = [['particle', 'particleSrc'], ['metal', 'metalSrc'], ['organic', 'organicSrc'], ['oxide', 'oxideSrc']];
  const w = 152;
  let svg = `<rect x="16" y="78" width="608" height="34" fill="${SI}" stroke="${INK_2}"/>`;
  const art = [
    x => `<circle cx="${x + 76}" cy="66" r="12" fill="#94a3b8" stroke="${INK_2}"/><circle cx="${x + 106}" cy="73" r="5" fill="#94a3b8" stroke="${INK_2}"/>`,
    x => [[56, 76], [72, 80], [90, 75], [104, 82], [120, 77]].map(([dx, y]) => `<circle cx="${x + dx}" cy="${y}" r="3.6" fill="${AMBER_L}" stroke="${AMBER}"/>`).join(''),
    x => `<path d="M${x + 40} 78 C${x + 44} 66, ${x + 66} 64, ${x + 78} 70 S${x + 108} 64, ${x + 114} 78 Z" fill="#d9f99d" stroke="#3f6212"/>`,
    x => `<rect x="${x + 4}" y="73" width="${w - 8}" height="5" fill="${TEAL_L}" stroke="${TEAL}"/>`
  ];
  let bottom = 0;
  zones.forEach(([name, src], i) => {
    const x = 16 + i * w;
    if (i) svg += `<path d="M${x} 24 V128" stroke="${LINE}" stroke-dasharray="3 3"/>`;
    svg += art[i](x) + t(x + w / 2, 36, L(name), 12, INK, 'middle', 700);
    const s = para(x + w / 2, 132, L(src), w - 16, 10.5, INK_2);
    svg += s.svg; bottom = Math.max(bottom, 132 + s.height);
  });
  // 下方：鈉離子
  const y = bottom + 30;
  svg += `<path d="M16 ${y - 14} H624" stroke="${LINE}"/>` + t(320, y + 6, L('trouble'), 12, INK, 'middle', 700);
  const gy = y + 24;
  svg += `<rect x="150" y="${gy}" width="200" height="18" fill="${AMBER_L}" stroke="${AMBER}"/><rect x="110" y="${gy + 18}" width="280" height="30" fill="${TEAL_XL}" stroke="${TEAL}"/><rect x="110" y="${gy + 48}" width="280" height="28" fill="#e2e8f0" stroke="${INK_2}"/>`;
  [[170, 26], [236, 36], [300, 24], [340, 34]].forEach(([x, dy]) => {
    svg += `<circle cx="${x}" cy="${gy + dy}" r="5.5" fill="${AMBER_L}" stroke="${AMBER}"/><path d="M${x - 2.6} ${gy + dy} h5.2 M${x} ${gy + dy - 2.6} v5.2" stroke="${AMBER}" stroke-width="1.2"/>`
      // 往下（往矽介面）的箭頭較長、往上的較短（審查意見：要看出往矽介面方向移動）
      + arrow(x + 11, gy + dy, x + 11, gy + dy - 6, RED, 1.1) + arrow(x + 11, gy + dy, x + 11, gy + dy + 11, RED, 1.3);
  });
  svg += lead(400, gy + 10, 347, gy + 30);
  svg += lead(150, gy + 9, 96, gy + 9) + t(92, gy + 13, L('gate'), 10.5, AMBER, 'end', 600)
    + lead(110, gy + 33, 96, gy + 33) + t(92, gy + 37, L('gateOxide'), 10.5, TEAL, 'end', 600)
    + lead(110, gy + 62, 96, gy + 62) + t(92, gy + 66, L('si'), 10.5, INK_2, 'end', 600);
  const sodium = para(404, gy + 14, L('sodium'), 210, 11, AMBER, 'start', 700);
  const moves = para(404, gy + 14 + sodium.height, L('moves'), 210, 10.5, INK_2, 'start');
  const drift = para(404, gy + 18 + sodium.height + moves.height, L('drift'), 210, 11.5, RED, 'start', 700);
  svg += sodium.svg + moves.svg + drift.svg;
  return { svg, height: Math.ceil(Math.max(gy + 82, gy + 18 + sodium.height + moves.height + drift.height) + 6) };
}

// ch09 交叉污染：檢查畫在機台的 Load Port 上，晶圓盒放上去時系統比對等級，相符打綠勾、不符打紅叉；
// 兩區之間不畫實體門（技術審查修正）。下排沿用原本的流程：微量銅如何擴大成良率損失
function crossContamination(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const head = para(320, 20, `${L('classes')}${en ? ', ' : '，'}${L('colorTag')}`, 560, 11.5, INK, 'middle', 700);
  let svg = head.svg;
  const top = 20 + head.height + 8;
  const zone = (x, fill, stroke, key) => `<rect x="${x}" y="${top}" width="296" height="150" rx="8" fill="${fill}" stroke="${stroke}"/>` + t(x + 148, top + 20, L(key), 12, stroke, 'middle', 700);
  svg += zone(16, TEAL_XL, TEAL, 'frontEnd') + zone(328, AMBER_XL, AMBER, 'copperProc');
  // 機台、Load Port 與晶圓盒；晶圓盒上的色條代表污染等級
  const tool = (x, tag) => `<rect x="${x}" y="${top + 46}" width="110" height="80" rx="6" fill="#ffffff" stroke="${INK_2}" stroke-width="1.3"/><rect x="${x + 10}" y="${top + 56}" width="40" height="8" rx="2" fill="${tag}"/>`
    + `<rect x="${x - 40}" y="${top + 112}" width="40" height="5" fill="#cbd5e1" stroke="${INK_2}"/>`;
  const carrier = (x, tag) => `<rect x="${x}" y="${top + 84}" width="34" height="28" rx="4" fill="#ffffff" stroke="${INK_2}" stroke-width="1.3"/><rect x="${x}" y="${top + 84}" width="34" height="7" rx="2" fill="${tag}"/>` + [98, 104].map(dy => `<path d="M${x + 5} ${top + dy} h24" stroke="${MUTED}"/>`).join('');
  svg += tool(150, TEAL) + carrier(113, AMBER) + tool(462, AMBER) + carrier(425, AMBER);
  // 比對結果：不符禁止進機台、相符打勾
  svg += `<circle cx="130" cy="${top + 62}" r="12" fill="#ffffff" stroke="${RED}" stroke-width="1.6"/><path d="M124 ${top + 56} l12 12 M136 ${top + 56} l-12 12" stroke="${RED}" stroke-width="2"/>`
    + `<circle cx="442" cy="${top + 62}" r="12" fill="#ffffff" stroke="${GREEN}" stroke-width="1.6"/>` + icon('check', 432, top + 52, 20, GREEN);
  const block = para(84, top + 132, L('block'), 150, 10.5, RED, 'middle', 700);
  svg += block.svg + t(205, top + 144, L('tool'), 10.5, INK_2) + t(442, top + 136, L('carrier'), 10.5, INK_2) + t(517, top + 144, L('tool'), 10.5, INK_2);
  let y = top + 150 + 22;
  svg += icon('network', 40, y - 14, 20, BLUE);
  const check = para(68, y, L('check'), 540, 11, INK, 'start', 600);
  // 補回原句的主語：銅製程使用的機台、晶圓盒，甚至鑷子和手套（審查意見）
  const sep = para(68, y + check.height, en ? `${L('tweezers')} ${L('copperUse')} are ${L('separate')}` : `${L('copperUse')}${L('tweezers')}，${L('separate')}`, 540, 10.5, INK_2, 'start');
  svg += check.svg + sep.svg;
  y += check.height + sep.height + 22;
  // 下排：微量銅如何擴大成良率損失
  const steps = [`${L('trace')}${en ? ' ' : ''}${L('carried')}`, L('everyWafer'), `${L('diffuses')}${en ? ', ' : '，'}${L('reach')}`, L('leakYield')];
  const bw = 140, gap = (608 - 4 * bw) / 3;
  const ps = steps.map(text => para(0, 0, text, bw - 16, 10.5, INK).height);
  const bh = Math.max(...ps) + 20;
  steps.forEach((text, i) => {
    const x = 16 + i * (bw + gap);
    // 文字在方框內垂直置中
    svg += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="6" fill="${i === 3 ? '#fff1f2' : LIGHT}" stroke="${i === 3 ? RED : LINE}"/>` + para(x + bw / 2, y + (bh - ps[i]) / 2 + 10, text, bw - 16, 10.5, i === 3 ? RED : INK, 'middle', i === 3 ? 700 : 400).svg;
    if (i < 3) svg += arrow(x + bw + 2, y + bh / 2, x + bw + gap - 2, y + bh / 2);
  });
  const hard = para(16 + 3 * (bw + gap) + bw / 2, y + bh + 16, L('hardTrace'), bw + 20, 10.5, MUTED);
  return { svg: svg + hard.svg, height: Math.ceil(y + bh + 16 + hard.height) };
}

// ch10 從鋁到銅：鋁是先鋪再蝕刻，銅是先挖溝再填；打叉圖示放在兩列之間（技術審查修正）
function alToCu(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const xs = [128, 296, 464], w = 150;
  const diel = (x, y) => `<rect x="${x}" y="${y + 40}" width="${w}" height="26" fill="${TEAL_XL}" stroke="${TEAL}"/>`;
  let svg = '';
  // 鋁列
  const ay = 16;
  svg += t(60, ay + 46, L('al'), 16, INK, 'middle', 700);
  svg += diel(xs[0], ay) + `<rect x="${xs[0]}" y="${ay + 28}" width="${w}" height="12" fill="${AL}" stroke="${INK_2}"/>`;
  svg += diel(xs[1], ay) + `<rect x="${xs[1]}" y="${ay + 28}" width="${w}" height="12" fill="${AL}" stroke="${INK_2}"/>` + [24, 96].map(dx => hatchedResist(xs[1] + dx, ay + 18, 30, 10)).join('');
  svg += diel(xs[2], ay) + [24, 96].map(dx => `<rect x="${xs[2] + dx}" y="${ay + 28}" width="30" height="12" fill="${AL}" stroke="${INK_2}"/>`).join('');
  svg += arrow(xs[0] + w + 2, ay + 40, xs[1] - 2, ay + 40) + arrow(xs[1] + w + 2, ay + 40, xs[2] - 2, ay + 40);
  const a1 = para(xs[0] + w / 2, ay + 84, L('alStep1'), w, 10.5, INK_2);
  const a2 = para(xs[1] + w / 2, ay + 84, L('alStep2'), w, 10.5, INK_2);
  const a3 = para(xs[2] + w / 2, ay + 84, L('alStep3'), w, 10.5, INK_2);
  svg += a1.svg + a2.svg + a3.svg;
  // 兩列之間：銅很難乾蝕刻，改成先挖溝再填
  let y = ay + 84 + Math.max(a1.height, a2.height, a3.height) + 18;
  svg += `<path d="M16 ${y} H624" stroke="${LINE}"/>`;
  const hard = para(150, y + 24, L('hardEtch'), 460, 11, RED, 'start', 700);
  const opp = para(150, y + 24 + hard.height, `${L('opposite')}${en ? ': ' : '：'}${L('digFirst')}${en ? ', ' : '，'}${L('fillCu')}`, 460, 11, TEAL, 'start', 700);
  svg += `<circle cx="128" cy="${y + 28}" r="12" fill="#ffffff" stroke="${RED}" stroke-width="1.6"/><path d="M122 ${y + 22} l12 12 M134 ${y + 22} l-12 12" stroke="${RED}" stroke-width="2"/>` + hard.svg + opp.svg;
  // 銅列
  const cy = y + 24 + hard.height + opp.height + 6;
  svg += t(60, cy + 46, L('cu'), 16, INK, 'middle', 700) + para(60, cy + 66, L('cuLow'), 100, 10.5, INK_2).svg;
  const trench = (x, fill) => `<path d="M${x} ${cy + 28} H${x + 24} V${cy + 46} H${x + 54} V${cy + 28} H${x + 96} V${cy + 46} H${x + 126} V${cy + 28} H${x + w} V${cy + 66} H${x} Z" fill="${TEAL_XL}" stroke="${TEAL}"/>`
    + (fill === 'over' ? `<path d="M${x} ${cy + 20} H${x + w} V${cy + 28} H${x + 126} V${cy + 46} H${x + 96} V${cy + 28} H${x + 54} V${cy + 46} H${x + 24} V${cy + 28} H${x} Z" fill="${COPPER}" stroke="${RED}"/>` : '')
    + (fill === 'inlaid' ? [24, 96].map(dx => `<rect x="${x + dx}" y="${cy + 28}" width="30" height="18" fill="${COPPER}" stroke="${RED}"/>`).join('') : '');
  // 第三格：磨掉溝外的銅，只留在溝內（審查意見：只畫到溢出的銅，像導線做到這裡就結束；磨平在下一段，所以不加標籤）
  svg += trench(xs[0], '') + trench(xs[1], 'over') + trench(xs[2], 'inlaid') + arrow(xs[0] + w + 2, cy + 44, xs[1] - 2, cy + 44) + arrow(xs[1] + w + 2, cy + 44, xs[2] - 2, cy + 44);
  const c1 = para(xs[0] + w / 2, cy + 84, L('digFirst'), w, 10.5, INK_2);
  const c2 = para(xs[1] + w / 2, cy + 84, L('fillCu'), w, 10.5, INK_2);
  svg += c1.svg + c2.svg;
  return { svg, height: Math.ceil(cy + 84 + Math.max(c1.height, c2.height, 30) + 4) };
}

// ch10 越來越細的挑戰：左上寬、窄兩個截面，U 形阻障層同厚、頂部是另一色的覆蓋層；左下窄線裡電子較常撞到邊界；
// 右邊電遷移只標電子流方向，空洞出現在電子流的上游端（技術審查修正）
function thinWires(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  let svg = t(320, 20, L('thinner'), 13, INK, 'middle', 700);
  svg += t(180, 46, L('resistance'), 12, INK, 'middle', 700);
  const wire = (x, w) => `<rect x="${x}" y="62" width="${w}" height="56" fill="${PINK_L}" stroke="${PINK}"/><rect x="${x + 5}" y="62" width="${w - 10}" height="51" fill="${COPPER}"/><rect x="${x}" y="56" width="${w}" height="6" fill="${BLUE_L}" stroke="${BLUE}"/>`;
  svg += `<rect x="40" y="56" width="280" height="70" fill="${TEAL_XL}"/>` + wire(56, 100) + wire(280, 30);
  svg += lead(156, 100, 176, 100) + para(180, 104, L('barrier'), 92, 10, PINK, 'start', 600).svg + lead(156, 59, 176, 59) + para(180, 63, L('cap'), 92, 10, BLUE, 'start', 600).svg;
  const share = para(180, 142, L('barrierShare'), 300, 10.5, INK_2);
  svg += share.svg;
  // 縱向導線：窄線中電子路徑較常撞到上下邊界
  let y = 142 + share.height + 14;
  const band = (yy, h, pts) => `<rect x="40" y="${yy}" width="280" height="${h}" fill="${COPPER}" stroke="${RED}"/><path d="M48 ${yy + h / 2} ${pts.map(([dx, dy]) => `L${48 + dx} ${yy + dy}`).join(' ')}" fill="none" stroke="${BLUE}" stroke-width="1.3"/>`;
  svg += band(y, 40, [[60, 4], [130, 36], [200, 6], [264, 22]]) + band(y + 52, 16, [[20, 2], [44, 14], [68, 2], [92, 14], [116, 2], [140, 14], [164, 2], [188, 14], [212, 2], [236, 14], [264, 8]]);
  const scatter = para(180, y + 90, L('scatter'), 300, 10.5, INK_2);
  svg += scatter.svg;
  const leftBottom = y + 90 + scatter.height;
  // 右：電遷移
  const rx = 360;
  svg += t(rx + 132, 46, L('em'), 12, INK, 'middle', 700);
  const flow = para(rx + 132, 66, L('longCurrent'), 240, 10.5, INK_2);
  svg += flow.svg;
  const wy = 66 + flow.height + 30;
  svg += arrow(rx + 30, wy - 14, rx + 230, wy - 14, BLUE, 1.6) + t(rx + 26, wy - 10, L('electrons'), 10.5, BLUE, 'end', 600);
  svg += `<path d="M${rx + 20} ${wy} H${rx + 40} C${rx + 46} ${wy + 8}, ${rx + 46} ${wy + 22}, ${rx + 40} ${wy + 30} H${rx + 20} Z" fill="${COPPER}" stroke="${RED}"/>`
    + `<path d="M${rx + 62} ${wy} C${rx + 54} ${wy + 8}, ${rx + 54} ${wy + 22}, ${rx + 62} ${wy + 30} H${rx + 244} V${wy} H${rx + 226} C${rx + 222} ${wy - 10}, ${rx + 206} ${wy - 10}, ${rx + 202} ${wy} Z" fill="${COPPER}" stroke="${RED}"/>`
    + [[90, 10], [124, 20], [158, 9], [190, 19]].map(([dx, dy]) => `<circle cx="${rx + dx}" cy="${wy + dy}" r="3" fill="#ffffff" stroke="${RED}"/>` + arrow(rx + dx + 5, wy + dy, rx + dx + 18, wy + dy, RED, 1)).join('');
  // 空洞的標籤緊接在空洞下方，引線不穿過其他文字
  const voids = para(rx + 20, wy + 52, L('voids'), 230, 11, RED, 'start', 700);
  const push = para(rx + 20, wy + 54 + voids.height, L('pushAtoms'), 230, 10.5, INK_2, 'start');
  svg += voids.svg + push.svg + lead(rx + 50, wy + 30, rx + 50, wy + 40);
  return { svg, height: Math.ceil(Math.max(leftBottom, wy + 54 + voids.height + push.height) + 6) };
}

// ch10 常見異常：五種金屬化異常的剖面縮圖，卡片只放名稱與結果
function metalDefects(spec, en, kit) {
  const { L, para } = tools(spec, en, kit);
  const w = 116, gap = (608 - 5 * w) / 4;
  const box = (x, y) => `<rect x="${x + 8}" y="${y + 12}" width="${w - 16}" height="58" fill="${TEAL_XL}" stroke="${TEAL}"/>`;
  const art = [
    (x, y) => box(x, y) + `<rect x="${x + 38}" y="${y + 12}" width="40" height="46" fill="${COPPER}" stroke="${RED}"/><ellipse cx="${x + 58}" cy="${y + 38}" rx="5" ry="11" fill="#ffffff" stroke="${RED}"/>`,
    (x, y) => box(x, y) + [24, 66].map(dx => `<rect x="${x + dx}" y="${y + 12}" width="26" height="34" fill="${COPPER}" stroke="${RED}"/>`).join('') + `<path d="M${x + 44} ${y + 12} q5 -5 11 -3 t10 -1 t8 4 z" fill="${COPPER}" stroke="${RED}"/>`,
    (x, y) => box(x, y) + `<rect x="${x + 18}" y="${y + 52}" width="${w - 36}" height="14" fill="${COPPER}" stroke="${RED}"/><rect x="${x + 46}" y="${y + 12}" width="24" height="28" fill="${COPPER}" stroke="${RED}"/><rect x="${x + 46}" y="${y + 40}" width="24" height="7" fill="#94a3b8" stroke="${INK_2}"/>`,
    (x, y) => box(x, y) + `<path d="M${x + 32} ${y + 12} V${y + 56} H${x + 84} V${y + 12}" fill="${COPPER}" stroke="${PINK}" stroke-width="3"/><path d="M${x + 84} ${y + 30} v10" stroke="${COPPER}" stroke-width="4"/>`
      + [[92, 34], [98, 40], [94, 46], [102, 32]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="1.8" fill="${RED}"/>`).join(''),
    (x, y) => `<rect x="${x + 8}" y="${y + 12}" width="${w - 16}" height="28" fill="${TEAL_XL}" stroke="${TEAL}"/><rect x="${x + 8}" y="${y + 44}" width="${w - 16}" height="26" fill="${TEAL_XL}" stroke="${TEAL}"/>`
      + `<path d="M${x + 30} ${y + 12} l6 10 -4 8 5 10 M${x + 70} ${y + 40} l-4 -8 5 -8 -3 -12" fill="none" stroke="${RED}" stroke-width="1.3"/><path d="M${x + 40} ${y + 42} h40" stroke="${RED}" stroke-width="1.2" stroke-dasharray="3 2"/>`
  ];
  const cards = [['void', 'voidResult'], ['residue', 'residueResult'], ['openVia', 'openResult'], ['barrier', 'barrierResult'], ['lowk', 'lowkResult']];
  const textH = Math.max(...cards.map(([a, b]) => para(0, 0, L(a), w - 12, 11.5, INK, 'middle', 700).height + para(0, 0, L(b), w - 12, 10.5).height));
  let svg = '';
  cards.forEach(([a, b], i) => {
    const x = 16 + i * (w + gap);
    svg += `<rect x="${x}" y="12" width="${w}" height="${92 + textH + 6}" rx="8" fill="#ffffff" stroke="${LINE}"/>` + art[i](x, 16);
    const head = para(x + w / 2, 104, L(a), w - 12, 11.5, INK, 'middle', 700);
    svg += head.svg + para(x + w / 2, 104 + head.height, L(b), w - 12, 10.5, RED).svg;
  });
  return { svg, height: Math.ceil(12 + 92 + textH + 6 + 8) };
}

// ch10 後段金屬互連條例總覽：由下往上是局部、中階、全域與封裝介面；局部層兩種材料依製程擇用（兩種填色並列），
// 氣隙只畫在少數幾條線之間（技術審查修正）。數值都出自本段表格
function beolTiers(spec, en, kit) {
  const { L, para, lead } = tools(spec, en, kit);
  const X0 = 24, X1 = 300, LX = 322, LW = 296;
  const sep = en ? ', ' : '、';
  const block = (yTop, rows) => {
    let yy = yTop + 14, out = '';
    const ys = [];
    rows.forEach(([text, size, fill, weight, chip]) => {
      const x = chip ? LX + 18 : LX;
      const p = para(x, yy, text, LW - (chip ? 18 : 0), size, fill, 'start', weight);
      if (chip) out += `<rect x="${LX}" y="${yy - 10}" width="12" height="12" fill="${chip[0]}" stroke="${chip[1]}"/>`;
      ys.push(yy);
      out += p.svg; yy += p.height + 2;
    });
    return { svg: out, h: yy - yTop, ys };
  };
  let svg = '';
  // 封裝介面：凸塊與頂層鋁墊；正文寫「CoWoS 微凸塊或 C4 覆晶凸塊」，兩者擇一（審查意見）
  const top = block(4, [[`${L('cowos')}${en ? ' or ' : ' 或 '}${L('c4')}`, 11, INK, 700], [L('alPad'), 10.5, INK_2, 400]]);
  svg += top.svg;
  const y0 = Math.max(70, top.h + 14);
  svg += `<circle cx="162" cy="${y0 - 34}" r="16" fill="#e2e8f0" stroke="${INK_2}"/><rect x="140" y="${y0 - 18}" width="44" height="4" fill="${INK_2}"/><rect x="122" y="${y0 - 14}" width="80" height="14" fill="${AL}" stroke="${INK_2}"/>`
    + lead(204, y0 - 7, LX - 6, 4 + 14 + 14);
  // 三個層級：先算右側文字高度，再決定各層帶的高度
  const g = block(y0, [[L('globalTier'), 11.5, INK, 700], [`${L('globalM')} · ${L('globalPitch')}`, 10.5, BLUE, 600], [L('thickCu'), 10.5, INK_2, 400]]);
  const gH = Math.max(86, g.h + 8);
  const mid = block(y0 + gH, [[L('midTier'), 11.5, INK, 700], [`${L('midM')} · ${L('midPitch')}`, 10.5, BLUE, 600], [`${L('cuDD')}${sep}${L('ulk')}`, 10.5, INK_2, 400], [L('airGap'), 10.5, TEAL, 600]]);
  const mH = Math.max(90, mid.h + 8);
  // 局部層三種材料各自一個圖例：只有釕標「無阻障層」（審查意見：鈷與釕共用一格會讀成兩者都無阻障）
  const CO = '#94a3b8', RU = '#ddd6fe';
  const loc = block(y0 + gH + mH, [[L('localTier'), 11.5, INK, 700], [`${L('localM')} · ${L('localPitch')}`, 10.5, BLUE, 600], [L('tanCu'), 10.5, INK_2, 400, [COPPER, PINK]], [L('co'), 10.5, INK_2, 400, [CO, INK_2]], [L('ru'), 10.5, INK_2, 400, [RU, VIOLET]]]);
  const lH = Math.max(76, loc.h + 8);
  svg += g.svg + mid.svg + loc.svg;
  const yG = y0, yM = y0 + gH, yL = y0 + gH + mH, yD = yL + lH;
  svg = `<rect x="${X0}" y="${yG}" width="${X1 - X0}" height="${gH}" fill="${LIGHT}" stroke="${LINE}"/><rect x="${X0}" y="${yM}" width="${X1 - X0}" height="${mH}" fill="${TEAL_XL}" stroke="${LINE}"/><rect x="${X0}" y="${yL}" width="${X1 - X0}" height="${lH}" fill="${LIGHT}" stroke="${LINE}"/>` + svg;
  // 全域：兩層粗寬的厚銅，導通孔相連
  [0.18, 0.6].forEach(f => [44, 126, 208].forEach(x => { svg += `<rect x="${x}" y="${yG + gH * f}" width="56" height="20" fill="${COPPER}" stroke="${RED}"/>`; }));
  [66, 148, 230].forEach(x => { svg += `<rect x="${x}" y="${yG + gH * 0.18 + 20}" width="12" height="${gH * 0.42 - 20}" fill="${COPPER}" stroke="${RED}"/>`; });
  // 中階：三層較細的銅線，中間一層少數幾條線之間是氣隙
  [0.16, 0.44, 0.72].forEach((f, r) => { for (let i = 0; i < 9; i++) svg += `<rect x="${36 + i * 29}" y="${yM + mH * f}" width="13" height="11" fill="${COPPER}" stroke="${RED}" stroke-width=".8"/>`; });
  const gapY = yM + mH * 0.44;
  // 氣隙在第 3、4 條與第 6、7 條線之間（線寬 13、間距 29，線與線之間空 16）
  [115, 202].forEach(c => { svg += `<rect x="${c - 6}" y="${gapY - 1}" width="12" height="13" rx="4" fill="#ffffff" stroke="${TEAL}" stroke-dasharray="2 1.5"/>`; });
  // 引線從氣隙往上繞到兩排線之間再接到「氣隙」那一行，不穿過銅線（審查意見）
  svg += `<path d="M202 ${gapY - 1} V${gapY - 8} H304 L${LX - 6} ${mid.ys[3] - 4}" fill="none" stroke="${MUTED}" stroke-dasharray="2 2"/>`;
  // 局部：最細的三層，依製程擇用銅（超薄阻障層）、鈷或釕（無阻障層），三組之間用虛線分開，不是同一層混用
  [0.2, 0.48, 0.76].forEach(f => { for (let i = 0; i < 21; i++) { const [fill, stroke] = i < 9 ? [COPPER, PINK] : i < 15 ? [CO, INK_2] : [RU, VIOLET]; svg += `<rect x="${32 + i * 12.6}" y="${yL + lH * f}" width="6" height="8" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`; } });
  svg += [142, 218].map(x => `<path d="M${x} ${yL + 4} V${yL + lH - 4}" stroke="${MUTED}" stroke-dasharray="3 3"/>`).join('');
  // 元件層
  svg += `<rect x="${X0}" y="${yD}" width="${X1 - X0}" height="24" fill="${SI}" stroke="${INK_2}"/>` + Array.from({ length: 9 }, (_, i) => `<rect x="${38 + i * 29}" y="${yD - 5}" width="12" height="5" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".8"/>`).join('');
  return { svg, height: Math.ceil(Math.max(yD + 24, yL + loc.h) + 8) };
}

// ── C 批（2.20.0，ch11–ch14 整合與先進元件）──
const SI_CH = '#e2e8f0';
const METAL_GATE = '#475569';
const W_PLUG = '#94a3b8';

// ch11 一個反覆出現的循環：左邊五步排成一圈（③ 晶圓上仍有光阻，佈植箭頭停在光阻內，技術審查修正）；
// 右邊是 FEOL、MOL、BEOL 在晶片剖面中的位置（STI 比源汲極接面深，接觸窗用鎢）
function processLoop(spec, en, kit) {
  const { L, t, para, arrow, lead, icon } = tools(spec, en, kit);
  let svg = t(170, 18, L('sameLoop'), 12.5, INK, 'middle', 700);
  // 五個節點排成一圈：上排 ①②③ 由左往右，③ 往下到 ④，④ 往左到 ⑤，⑤ 往上回到 ①；圈內放光罩層
  // （審查意見：原本排成五角形，相鄰兩格太近，上方兩支箭頭縮成只剩箭頭頭、甚至反向）
  const keys = ['deposit', 'litho', 'etchImplant', 'strip', 'measure'];
  const bw = 88;
  const textH = Math.max(...keys.map(k => para(0, 0, L(k), bw - 10, 10.5, INK, 'middle', 600).height));
  const bh = 48 + textH + 6;
  const r1 = 32, r2 = r1 + bh + 88, cols = [16, 126, 236];
  const boxes = [[cols[0], r1], [cols[1], r1], [cols[2], r1], [cols[2], r2], [cols[0], r2]];
  // 晶圓剖面的底：矽與一層材料（小圖寬 68）
  const base = (x, y, film = true) => `<rect x="${x + 16}" y="${y + 34}" width="68" height="8" fill="${SI}" stroke="${INK_2}" stroke-width=".8"/>` + (film ? `<rect x="${x + 16}" y="${y + 28}" width="68" height="6" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".8"/>` : '');
  const art = [
    (x, y) => base(x, y) + [32, 50, 68].map(dx => arrow(x + dx, y + 8, x + dx, y + 24, TEAL, 1.2)).join(''),
    (x, y) => base(x, y) + `<rect x="${x + 16}" y="${y + 22}" width="68" height="6" fill="${RESIST}" stroke="${AMBER}" stroke-width=".8"/>`
      + `<path d="M${x + 16} ${y + 7} H${x + 42} M${x + 58} ${y + 7} H${x + 84}" stroke="${INK}" stroke-width="3"/>` + [46, 54].map(dx => arrow(x + dx, y + 4, x + dx, y + 20, '#d97706', 1.1)).join(''),
    // 左半蝕刻出溝、右半佈植；兩邊都還有光阻，佈植箭頭停在光阻內
    (x, y) => base(x, y, false) + `<rect x="${x + 16}" y="${y + 28}" width="12" height="6" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".8"/><rect x="${x + 38}" y="${y + 28}" width="10" height="6" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".8"/>`
      + `<rect x="${x + 16}" y="${y + 22}" width="12" height="6" fill="${RESIST}" stroke="${AMBER}" stroke-width=".8"/><rect x="${x + 38}" y="${y + 22}" width="10" height="6" fill="${RESIST}" stroke="${AMBER}" stroke-width=".8"/>`
      + `<rect x="${x + 52}" y="${y + 28}" width="32" height="6" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".8"/><rect x="${x + 66}" y="${y + 22}" width="18" height="6" fill="${RESIST}" stroke="${AMBER}" stroke-width=".8"/>`
      + [56, 62, 70, 78].map(dx => arrow(x + dx, y + 6, x + dx, dx > 64 ? y + 25 : y + 30, RED, 1)).join('') + `<path d="M${x + 50} ${y + 4} L${x + 46} ${y + 42}" stroke="${MUTED}"/>`,
    (x, y) => base(x, y, false) + `<rect x="${x + 16}" y="${y + 28}" width="12" height="6" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".8"/><rect x="${x + 38}" y="${y + 28}" width="46" height="6" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".8"/>`
      + [30, 50, 70].map(dx => `<path d="M${x + dx} ${y + 8} c-3 5 -3 8 0 8 s3 -3 0 -8" fill="${BLUE_L}" stroke="${BLUE}"/>`).join(''),
    (x, y) => base(x, y) + icon('microscope', x + 38, y + 2, 24, TEAL)
  ];
  boxes.forEach(([x, y], i) => {
    svg += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="8" fill="#ffffff" stroke="${LINE}"/>` + art[i](x - 6, y)
      + para(x + bw / 2, y + 56, L(keys[i]), bw - 10, 10.5, INK, 'middle', 600).svg;
  });
  const mid1 = r1 + bh / 2, mid2 = r2 + bh / 2, c = col => col + bw / 2;
  svg += arrow(cols[0] + bw + 2, mid1, cols[1] - 2, mid1, TEAL, 1.5) + arrow(cols[1] + bw + 2, mid1, cols[2] - 2, mid1, TEAL, 1.5)
    + arrow(c(cols[2]), r1 + bh + 2, c(cols[2]), r2 - 2, TEAL, 1.5) + arrow(cols[2] - 2, mid2, cols[0] + bw + 2, mid2, TEAL, 1.5)
    + arrow(c(cols[0]), r2 - 2, c(cols[0]), r1 + bh + 2, TEAL, 1.5);
  // 圈內：每做一次微影就用一片光罩，稱為一個光罩層
  const gy = r1 + bh;
  svg += icon('reticle', c(cols[1]) - 12, gy + 6, 24, INK_2) + t(c(cols[1]), gy + 46, L('maskLayer'), 12, INK, 'middle', 700);
  svg += para(c(cols[1]), gy + 61, L('oneMask'), 100, 10, INK_2).svg;
  const leftBottom = r2 + bh;
  // 右：FEOL、MOL、BEOL 剖面。接觸窗往上接到第一層金屬；分界用虛線，不畫成硬切
  const X0 = 352, X1 = 478, yB = 146, yM = 186, yS = 196;
  svg += `<rect x="${X0}" y="34" width="${X1 - X0}" height="${yS - 34}" fill="${LIGHT}" stroke="${LINE}"/><rect x="${X0}" y="${yB}" width="${X1 - X0}" height="${yM - yB}" fill="${TEAL_XL}" stroke="${LINE}"/>`
    + `<rect x="${X0}" y="${yS}" width="${X1 - X0}" height="30" fill="${SI}" stroke="${INK_2}"/>`
    + [X0, 411, X1 - 8].map(x => `<rect x="${x}" y="${yS}" width="8" height="16" fill="${TEAL_XL}" stroke="${TEAL}"/>`).join('');
  // 兩個電晶體：左 NMOS（N 型源汲極）、右 PMOS（P 型源汲極），接面比 STI 淺；鎢接觸窗落在源汲極與閘極上，第一層金屬就在接觸窗正上方
  const plugs = [];
  [[381, BLUE_L, BLUE], [441, PINK_L, PINK]].forEach(([gx, f, s]) => {
    svg += `<rect x="${gx - 14}" y="${yS}" width="9" height="6" fill="${f}" stroke="${s}" stroke-width=".8"/><rect x="${gx + 5}" y="${yS}" width="9" height="6" fill="${f}" stroke="${s}" stroke-width=".8"/>`
      + `<rect x="${gx - 5}" y="${yS - 10}" width="10" height="10" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".8"/>`;
    [[gx - 10, yS], [gx, yS - 10], [gx + 9, yS]].forEach(([x, yb]) => { plugs.push(x); svg += `<rect x="${x - 2.5}" y="${yB}" width="5" height="${yb - yB}" fill="${W_PLUG}" stroke="${INK_2}" stroke-width=".6"/>`; });
  });
  svg += plugs.map(x => `<rect x="${x - 4}" y="${yB - 7}" width="8" height="7" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/>`).join('');
  // 多層金屬：越往上越粗，導通孔相連
  [[114, 14, 8, 22], [84, 22, 10, 30], [48, 36, 14, 40]].forEach(([y, w, h, pitch]) => {
    for (let x = X0 + 6; x + w <= X1 - 4; x += pitch) svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/>`;
  });
  svg += [[379, 122, 139], [400, 94, 114], [426, 62, 84]].map(([x, y1, y2]) => `<rect x="${x}" y="${y1}" width="5" height="${y2 - y1}" fill="${COPPER}" stroke="${RED}" stroke-width=".6"/>`).join('');
  svg += `<path d="M${X0 - 4} ${yB} H${X1 + 6} M${X0 - 4} ${yM} H${X1 + 6}" stroke="${INK}" stroke-dasharray="4 3"/>`;
  // 括號旁只放段名，基線對齊括號中點；每段做什麼列在剖面下方（審查意見：原本三組字依序往下排，對不到各自的括號）
  const segs = [['beol', 'beolDoes', 34, yB, BLUE], ['mol', 'molDoes', yB, yM, TEAL], ['feol', 'feolDoes', yM, yS + 30, PINK]];
  segs.forEach(([name, , y1, y2, color]) => {
    svg += `<path d="M${X1 + 10} ${y1 + 2} h4 V${y2 - 2} h-4" fill="none" stroke="${color}" stroke-width="1.6"/>` + t(X1 + 20, (y1 + y2) / 2 + 4, L(name), 12, color, 'start', 700);
  });
  let ny = yS + 30 + 22;
  segs.forEach(([name, does, , , color]) => {
    const body = para(394, ny, L(does), 228, 10.5, INK_2, 'start');
    svg += t(352, ny, L(name), 11, color, 'start', 700) + body.svg;
    ny += body.height + 4;
  });
  ny += 8;
  svg += `<rect x="352" y="${ny - 9}" width="10" height="10" fill="${W_PLUG}" stroke="${INK_2}"/>` + t(366, ny, L('contact'), 10.5, INK_2, 'start')
    + `<rect x="440" y="${ny - 9}" width="10" height="10" fill="${COPPER}" stroke="${RED}"/>` + t(454, ny, L('metalLayer'), 10.5, INK_2, 'start');
  const varies = para(352, ny + 20, L('varies'), 270, 10.5, INK_2, 'start');
  const inside = para(352, ny + 22 + varies.height, en ? `${L('insideFab')}, ${L('differ')}` : `${L('insideFab')}，${L('differ')}`, 270, 10.5, MUTED, 'start');
  svg += varies.svg + inside.svg;
  return { svg, height: Math.ceil(Math.max(leftBottom, ny + 22 + varies.height + inside.height) + 6) };
}

// ch12 平面電晶體的極限：以 NMOS 示意；路徑一的電子在通道下方較深處由源極移向汲極，「即使閘極關閉」與水龍頭只放在這條旁邊；
// 路徑二的電子由通道往閘極穿過絕緣層，絕緣層不畫破洞（技術審查修正）
function planarLeak(spec, en, kit) {
  const { L, t, para, arrow, lead, mark } = tools(spec, en, kit);
  const above = para(200, 20, L('fromAbove'), 330, 11.5, INK, 'middle', 700);
  let svg = above.svg;
  const g = 20 + above.height + 24;
  svg += arrow(200, g - 18, 200, g + 2, TEAL, 2);
  // 剖面：閘極、薄絕緣層、通道、靠得很近的源極與汲極
  const gy = g + 6, iy = gy + 30, sy = iy + 4;
  svg += `<rect x="40" y="${sy}" width="320" height="110" fill="${SI_CH}" stroke="${INK_2}"/>`
    + `<rect x="70" y="${sy}" width="84" height="32" rx="4" fill="${BLUE_L}" stroke="${BLUE}"/><rect x="246" y="${sy}" width="84" height="32" rx="4" fill="${BLUE_L}" stroke="${BLUE}"/>`
    + `<rect x="150" y="${iy}" width="100" height="4" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".8"/><rect x="150" y="${gy}" width="100" height="30" rx="2" fill="${AMBER_L}" stroke="${AMBER}"/>`;
  // 閘極字樣放左半，右半留給往上穿的電子
  svg += t(178, gy + 19, L('gate'), 11.5, INK, 'middle', 600) + t(112, sy + 21, L('source'), 11, BLUE, 'middle', 600) + t(288, sy + 21, L('drain'), 11, BLUE, 'middle', 600) + `<rect x="154" y="${sy}" width="92" height="3" fill="${BLUE_L}" fill-opacity=".7"/>` + t(184, sy + 12, L('channel'), 10, INK_2);
  svg += lead(250, iy + 2, 270, iy - 14) + t(274, iy - 12, L('insulator'), 10.5, TEAL, 'start', 600);
  // 路徑一：通道下方較深處，電子由源極移到汲極
  const p1 = [[154, sy + 30], [176, sy + 56], [200, sy + 64], [224, sy + 56], [246, sy + 30]];
  svg += `<path d="M154 ${sy + 30} Q200 ${sy + 86} 246 ${sy + 30}" fill="none" stroke="${RED}" stroke-width="1.3" stroke-dasharray="4 3"/>` + p1.slice(1, 4).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="${BLUE}"/>`).join('')
    + `<path d="M246 ${sy + 30} l-1 9 l-6 -6 z" fill="${RED}"/>` + mark(200, sy + 90, 'A');
  // 路徑二：電子由通道往上穿過閘極絕緣層
  svg += [214, 228, 242].map((x, i) => `<circle cx="${x}" cy="${iy - 8 - i * 3}" r="3" fill="${BLUE}"/>` + arrow(x, iy + 10, x, iy - 2, BLUE, 1)).join('') + mark(258, gy - 4, 'B');
  // 右欄說明：A 在深處偷溜（閘極關閉也一樣），B 穿過變薄的絕緣層
  const close = para(384, gy + 4, L('tooClose'), 236, 10.5, INK_2, 'start');
  const sneak = para(384, gy + 6 + close.height, L('sneak'), 236, 11, RED, 'start', 700);
  const off = para(410, gy + 10 + close.height + sneak.height, L('faucet'), 210, 10.5, INK_2, 'start');
  const fy = gy + 10 + close.height + sneak.height;
  // 關不緊的水龍頭
  // 關不緊的水龍頭：橫管、往下的出水口、上方把手，下面兩滴水（審查意見：原本看起來像問號）
  const faucet = `<rect x="380" y="${fy - 6}" width="16" height="5" rx="1" fill="#cbd5e1" stroke="${INK_2}"/><rect x="391" y="${fy - 1}" width="5" height="6" fill="#cbd5e1" stroke="${INK_2}"/><path d="M384 ${fy - 6} v-4 M380 ${fy - 10} h8" stroke="${INK_2}" stroke-width="1.6"/>`
    + `<path d="M393.5 ${fy + 8} c-2 3 -2 5 0 5 s2 -2 0 -5 M393.5 ${fy + 16} c-2 3 -2 5 0 5 s2 -2 0 -5" fill="${BLUE_L}" stroke="${BLUE}"/>`;
  svg += mark(380 - 14, gy, 'A') + close.svg + sneak.svg + faucet + off.svg;
  let ry = fy + off.height + 18;
  const thin = para(384, ry, L('thinner'), 236, 10.5, INK_2, 'start');
  const tunnel = para(384, ry + thin.height, L('tunnel'), 236, 11, BLUE, 'start', 700);
  svg += mark(366, ry - 4, 'B') + thin.svg + tunnel.svg;
  ry += thin.height + tunnel.height;
  // 下方：兩條解法
  const by = Math.max(sy + 110, ry) + 30;
  svg += t(320, by, L('twoPaths'), 12, INK, 'middle', 700);
  [[200, 'materials'], [440, 'structure']].forEach(([x, key]) => {
    svg += arrow(320, by + 8, x, by + 22, TEAL, 1.4) + `<rect x="${x - 80}" y="${by + 24}" width="160" height="30" rx="15" fill="${TEAL_XL}" stroke="${TEAL}"/>` + t(x, by + 44, L(key), 12, TEAL, 'middle', 700);
  });
  return { svg, height: by + 62 };
}

// ch12 GAA 六步：A、C、D 沿通道方向剖面，B、E、F 垂直通道方向截面；疊層由下而上：基板、矽鍺、矽、矽鍺、矽、矽鍺、矽；
// D 的疊層只留在假閘極與側壁間隔物下方，矽鍺兩端內凹、內側間隔物填在側壁間隔物正下方（技術審查修正）
function gaaFlow(spec, en, kit) {
  const { L, t, para, arrow, mark } = tools(spec, en, kit);
  const w = 192, xs = [16, 224, 432];
  const steps = ['epi', 'fin', 'dummy', 'inner', 'release', 'fill'];
  const titleH = Math.max(...steps.map(k => para(0, 0, L(k), w - 28, 11.5, INK, 'middle', 700).height));
  const layer = (x, y, wd, i) => i % 2 ? `<rect x="${x}" y="${y}" width="${wd}" height="8" fill="${SI_CH}" stroke="${INK_2}" stroke-width=".8"/>` : `<rect x="${x}" y="${y}" width="${wd}" height="8" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".8"/>`;
  const stack = (x, base, wd) => Array.from({ length: 6 }, (_, i) => layer(x, base - (i + 1) * 8, wd, i)).join('');
  const sub = (x, y, wd = 160) => `<rect x="${x}" y="${y}" width="${wd}" height="16" fill="${SI}" stroke="${INK_2}"/>`;
  // 剖面方向小圖示：俯視的鰭，紅線是剖切位置（沿著鰭或橫切）
  const view = (x, y, along) => `<rect x="${x}" y="${y + 4}" width="26" height="8" rx="2" fill="#ffffff" stroke="${MUTED}"/>` + (along ? `<path d="M${x - 2} ${y + 8} h30" stroke="${RED}" stroke-width="1.4"/>` : `<path d="M${x + 13} ${y} v16" stroke="${RED}" stroke-width="1.4"/>`);
  const art = [
    (x, d) => sub(x + 16, d + 64) + stack(x + 16, d + 64, 160),
    // 垂直通道方向只畫一條鰭，寬度與 E、F 格的矽片相同（審查意見）
    (x, d) => sub(x + 16, d + 64) + stack(x + 66, d + 64, 60),
    (x, d) => sub(x + 16, d + 64) + stack(x + 16, d + 64, 160) + hatched(x + 76, d + 2, 40, 14, '#f1f5f9', INK_2),
    (x, d) => {
      let o = sub(x + 16, d + 64);
      for (let i = 0; i < 6; i++) {
        const y = d + 64 - (i + 1) * 8;
        o += i % 2 ? layer(x + 70, y, 52, i) : layer(x + 76, y, 40, i) + `<rect x="${x + 70}" y="${y}" width="6" height="8" fill="#cbd5e1" stroke="${INK_2}" stroke-width=".7"/><rect x="${x + 116}" y="${y}" width="6" height="8" fill="#cbd5e1" stroke="${INK_2}" stroke-width=".7"/>`;
      }
      return o + hatched(x + 76, d + 2, 40, 14, '#f1f5f9', INK_2) + `<rect x="${x + 70}" y="${d + 2}" width="6" height="14" fill="#cbd5e1" stroke="${INK_2}" stroke-width=".7"/><rect x="${x + 116}" y="${d + 2}" width="6" height="14" fill="#cbd5e1" stroke="${INK_2}" stroke-width=".7"/>`;
    },
    // 矽鍺挖掉，三片矽上下排開、互不接觸（兩端錨在紙面外）
    // 最底層的矽鍺也挖掉，最下面一片矽和基板之間同樣留出空隙（審查意見：原本像坐在基座上）
    (x, d) => sub(x + 16, d + 64) + [d + 48, d + 32, d + 16].map(y => `<rect x="${x + 66}" y="${y}" width="60" height="8" fill="${SI_CH}" stroke="${INK_2}"/>`).join(''),
    // 絕緣層細線環繞每一片矽，金屬填滿片與片之間
    // 金屬與基板之間也有一層絕緣層，閘極不直接碰到基板（審查意見）
    (x, d) => sub(x + 16, d + 64) + `<rect x="${x + 54}" y="${d + 6}" width="84" height="56" rx="3" fill="${METAL_GATE}"/><rect x="${x + 52}" y="${d + 61}" width="88" height="3" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".6"/>`
      + [d + 48, d + 32, d + 16].map(y => `<rect x="${x + 64}" y="${y - 2}" width="64" height="12" rx="2" fill="none" stroke="${TEAL_L}" stroke-width="2"/><rect x="${x + 66}" y="${y}" width="60" height="8" fill="${SI_CH}" stroke="${INK_2}"/>`).join('')
  ];
  const along = [true, false, true, true, false, false];
  const notes = { release: [['critical', 11, RED, 700], ['selective', 10.5, INK_2, 400], ['suspended', 10.5, INK_2, 400]], fill: [['ald', 11, TEAL, 700], ['insulatorMetal', 10.5, INK_2, 400]] };
  const noteH = Math.max(...Object.values(notes).map(rows => rows.reduce((h, [k, s, c, wt]) => h + para(0, 0, L(k), w - 20, s, c, 'middle', wt).height, 0)));
  const rowH = 20 + titleH + 92;
  let svg = '';
  steps.forEach((key, i) => {
    const row = Math.floor(i / 3), x = xs[i % 3];
    const y = 12 + row * (rowH + 20);
    const h = rowH + (row ? noteH : 0);
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#ffffff" stroke="${LINE}"/>` + mark(x + 2, y + 2, 'ABCDEF'[i]) + view(x + w - 36, y + 6, along[i]);
    svg += para(x + w / 2 - 12, y + 20, L(key), w - 64, 11.5, INK, 'middle', 700).svg;
    const d = y + 20 + titleH + 2;
    svg += art[i](x, d);
    if (notes[key]) {
      let ny = d + 96;
      notes[key].forEach(([k, s, c, wt]) => { const p = para(x + w / 2, ny, L(k), w - 20, s, c, 'middle', wt); svg += p.svg; ny += p.height; });
    }
    if (i % 3 < 2) svg += arrow(x + w + 1, y + 20 + titleH + 40, x + w + 15, y + 20 + titleH + 40);
  });
  // C 到 D 換行；D 與 E 之間省略源汲極磊晶與移除假閘極，只放一個「⋯」
  svg += `<path d="M${xs[2] + w / 2} ${12 + rowH} V${12 + rowH + 10} H${xs[0] + w / 2} V${12 + rowH + 18}" fill="none" stroke="${TEAL}" stroke-width="1.5"/><path d="M${xs[0] + w / 2} ${12 + rowH + 20} l-4 -6 h8 z" fill="${TEAL}"/>`;
  svg += t(xs[1] - 8, 12 + rowH + 20 + 20 + titleH + 34, '⋯', 16, TEAL, 'middle', 700);
  // 圖例
  const ly = 12 + rowH + 20 + rowH + noteH + 24;
  const chips = [['si', SI_CH, INK_2], ['sige', AMBER_L, AMBER], ['dummyGate', '#f1f5f9', INK_2], ['innerSpacer', '#cbd5e1', INK_2]];
  // 假閘極的圖例方塊也用斜線，與圖中一致
  chips.forEach(([k, f, s], i) => { const x = 16 + i * 152; svg += (k === 'dummyGate' ? hatched(x, ly - 10, 12, 12, f, s) : `<rect x="${x}" y="${ly - 10}" width="12" height="12" fill="${f}" stroke="${s}"/>`) + t(x + 18, ly, L(k), 10.5, INK_2, 'start'); });
  return { svg, height: ly + 12 };
}

// ch12 背面供電：上排是正面供電與背面供電的成品方向（承載晶圓在最上面）；下排是四步，方向與上排右格相反。
// 左格電源線與訊號線一樣細、擠在同幾層；右格背面電源導線明顯較寬，經磨薄的矽以短垂直連接接到電晶體層（技術審查修正）
function backsidePower(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const PWR = '#dc2626', SIG = '#2563eb';
  const line = (x, y, wd, c) => `<rect x="${x}" y="${y}" width="${wd}" height="4" rx="1" fill="${c}"/>`;
  const transistors = (x, y, wd) => `<rect x="${x}" y="${y}" width="${wd}" height="10" fill="${TEAL_XL}" stroke="${TEAL}"/>` + Array.from({ length: Math.floor(wd / 18) }, (_, i) => `<rect x="${x + 6 + i * 18}" y="${y + 2}" width="8" height="6" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".6"/>`).join('');
  let svg = '';
  // 上左：傳統，電源線（紅）與訊號線（藍）一樣細，擠在正面同幾層
  const a = 16, top = 34;
  svg += t(a + 148, 20, L('traditional'), 12, INK, 'middle', 700);
  svg += `<rect x="${a + 20}" y="${top}" width="196" height="56" fill="${LIGHT}" stroke="${LINE}"/>`;
  for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) svg += line(a + 26 + i * 21 + (r % 2) * 6, top + 6 + r * 13, 12, (i + r) % 3 === 0 ? PWR : SIG);
  svg += transistors(a + 20, top + 56, 196) + `<rect x="${a + 20}" y="${top + 66}" width="196" height="40" fill="${SI}" stroke="${INK_2}"/>`;
  // 電壓下降標在電源線（紅線）旁（審查意見：原本壓在藍色訊號線上）
  svg += `<path d="M${a + 40} ${top - 4} l4 5 h-3 l4 6" fill="none" stroke="${PWR}" stroke-width="1.6"/>` + lead(a + 46, top + 2, a + 230, top + 30) + t(a + 234, top + 34, L('drop'), 10.5, PWR, 'start', 600);
  svg += t(a + 234, top + 16, L('congested'), 10.5, INK, 'start', 700) + t(a + 234, top + 64, L('transistors'), 10, TEAL, 'start');
  svg += t(a + 10, top + 8, L('front'), 9.5, MUTED, 'end') + t(a + 10, top + 104, L('back'), 9.5, MUTED, 'end');
  // 上右：背面供電成品，承載晶圓在最上面、正面只剩訊號線、背面是較寬的電源導線
  const b = 328;
  svg += t(b + 148, 20, L('bspdn'), 12, INK, 'middle', 700);
  svg += `<rect x="${b + 20}" y="${top - 6}" width="196" height="16" fill="#cbd5e1" stroke="${INK_2}"/>` + `<rect x="${b + 20}" y="${top + 10}" width="196" height="42" fill="${LIGHT}" stroke="${LINE}"/>`;
  for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) svg += line(b + 30 + i * 32 + (r % 2) * 10, top + 16 + r * 12, 12, SIG);
  svg += transistors(b + 20, top + 52, 196) + `<rect x="${b + 20}" y="${top + 62}" width="196" height="6" fill="${SI}" stroke="${INK_2}"/>`
    + [44, 98, 152, 206].map(dx => `<rect x="${b + dx - 2}" y="${top + 62}" width="4" height="8" fill="${PWR}"/>`).join('')
    + `<rect x="${b + 20}" y="${top + 68}" width="196" height="26" fill="#fef2f2" stroke="${LINE}"/>` + [26, 78, 130, 178].map(dx => `<rect x="${b + dx}" y="${top + 70}" width="36" height="10" rx="1" fill="${PWR}"/>`).join('');
  svg += lead(b + 216, top + 2, b + 226, top + 2) + t(b + 230, top + 6, L('carrier'), 10, INK_2, 'start')
    + lead(b + 216, top + 65, b + 226, top + 60) + t(b + 230, top + 58, L('thin'), 10, INK_2, 'start')
    + lead(b + 216, top + 80, b + 226, top + 84) + t(b + 230, top + 88, L('wiring'), 10, PWR, 'start', 600);
  svg += t(b + 10, top + 20, L('front'), 9.5, MUTED, 'end') + t(b + 10, top + 90, L('back'), 9.5, MUTED, 'end');
  const res = para(b + 148, top + 122, en ? `${L('leavesFront')} and ${L('stable')}` : `${L('leavesFront')}，${L('stable')}`, 280, 10.5, TEAL, 'middle', 600);
  svg += res.svg;
  // 圖例
  const ky = top + 122;
  svg += line(a + 40, ky - 6, 16, SIG) + t(a + 62, ky, L('signal'), 10.5, INK_2, 'start') + line(a + 140, ky - 6, 16, PWR) + t(a + 162, ky, L('power'), 10.5, INK_2, 'start');
  // 下排四步
  let y = Math.max(ky + 8, top + 122 + res.height) + 22;
  svg += `<path d="M16 ${y - 10} H624" stroke="${LINE}"/>`;
  const w = 140, gap = (608 - 4 * w) / 3;
  const wafer = (x, y0, flipped, thin, wired) => {
    // 由上往下的層：未翻面時 正面導線、電晶體、矽；翻面後 矽、電晶體、正面導線、承載晶圓
    // 晶圓靠右畫，左邊留給「正面」「背面」小標，不跑出格外
    let o = '';
    const si = thin ? 6 : 34, ox = x + 30, ww = 96;
    const metal = yy => `<rect x="${ox}" y="${yy}" width="${ww}" height="18" fill="${LIGHT}" stroke="${LINE}"/>` + [0, 1].map(r => Array.from({ length: 5 }, (_, i) => line(ox + 5 + i * 18 + r * 5, yy + 4 + r * 7, 9, SIG)).join('')).join('');
    if (!flipped) {
      o += `<rect x="${ox}" y="${y0}" width="${ww}" height="14" fill="#cbd5e1" stroke="${INK_2}"/>` + arrow(ox + 48, y0 + 16, ox + 48, y0 + 24, INK_2, 1.2);
      o += metal(y0 + 28) + transistors(ox, y0 + 46, ww) + `<rect x="${ox}" y="${y0 + 56}" width="${ww}" height="34" fill="${SI}" stroke="${INK_2}"/>`;
      return { svg: o, faces: [y0 + 40, y0 + 76] };
    }
    let yy = y0 + (thin ? 28 : 0);
    // ④ 背面電源導線經磨薄的矽以短垂直連接接到電晶體層，與上排右格一致
    if (wired) o += `<rect x="${ox}" y="${yy - 10}" width="${ww}" height="10" fill="#fef2f2" stroke="${LINE}"/>` + [10, 38, 66].map(dx => `<rect x="${ox + dx}" y="${yy - 8}" width="20" height="6" rx="1" fill="${PWR}"/><rect x="${ox + dx + 8}" y="${yy - 2}" width="4" height="${si + 2}" fill="${PWR}"/>`).join('');
    o += `<rect x="${ox}" y="${yy}" width="${ww}" height="${si}" fill="${SI}" stroke="${INK_2}"/>`;
    yy += si;
    o += transistors(ox, yy, ww) + metal(yy + 10) + `<rect x="${ox}" y="${yy + 28}" width="${ww}" height="14" fill="#cbd5e1" stroke="${INK_2}"/>`;
    return { svg: o, faces: [yy + 22, y0 + (thin ? 28 : 0) + (thin ? 6 : 14)] };
  };
  const stepKeys = ['bonded', 'flipped', 'thinned', 'built'];
  const texts = stepKeys.map(k => para(0, 0, L(k), w - 14, 10.5, INK, 'middle', 600).height);
  const ph = 112 + Math.max(...texts) + 10;
  stepKeys.forEach((k, i) => {
    const x = 16 + i * (w + gap);
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${ph}" rx="8" fill="#ffffff" stroke="${LINE}"/>`;
    const wf = wafer(x, y + 12, i > 0, i > 1, i > 2);
    svg += wf.svg;
    // 正面、背面的小標
    svg += t(x + 5, wf.faces[0] + 3, L('front'), 9, MUTED, 'start') + t(x + 5, wf.faces[1] + 3, L('back'), 9, MUTED, 'start');
    // 翻面圖示放在晶圓下方的空白處，不壓到矽
    if (i === 1) svg += `<path d="M${x + 128} ${y + 100} a7 7 0 1 1 -3 -6" fill="none" stroke="${TEAL}" stroke-width="1.4"/><path d="M${x + 125} ${y + 94} l5 -1 l-1 5 z" fill="${TEAL}"/>`;
    if (i === 2) svg += `<circle cx="${x + 78}" cy="${y + 26}" r="12" fill="#e2e8f0" stroke="${INK_2}" stroke-width="1.4"/><path d="M${x + 66} ${y + 26} h24" stroke="${INK_2}"/>` + arrow(x + 78, y + 36, x + 78, y + 40, INK_2, 1.2);
    svg += para(x + w / 2, y + 116, L(k), w - 14, 10.5, INK, 'middle', 600).svg;
    if (i < 3) svg += arrow(x + w + 1, y + 60, x + w + gap - 1, y + 60);
  });
  return { svg, height: Math.ceil(y + ph + 8) };
}

// ch13 HBM：上排是製作 HBM 的四步；下排是表格的三種堆疊接合方式。775 µm 與 16 層以上屬於第三種（HBM4／HBM4E），
// 標尺放在第三格旁，晶粒疊含一顆基底晶粒加 16 層 DRAM；混合鍵合是銅對銅、絕緣層對絕緣層同時貼合，介面無縫（技術審查修正）
function hbmStack(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const DIE = '#cbd5e1';
  let svg = '';
  // 上排：四步
  const w = 140, gap = (608 - 4 * w) / 3, y0 = 14;
  const die = (x, y, wd, h) => `<rect x="${x}" y="${y}" width="${wd}" height="${h}" fill="${DIE}" stroke="${INK_2}"/>`;
  const tsv = (x, y, h) => `<rect x="${x}" y="${y}" width="4" height="${h}" fill="${COPPER}" stroke="${RED}" stroke-width=".6"/>`;
  const steps = [
    // TSV 從正面往下做、還沒穿透；磨薄從背面（下方）磨，磨掉的厚度加上剩下的厚度等於原厚度，TSV 從背面露出（審查意見）
    x => die(x + 20, y0 + 20, 100, 34) + [44, 68, 92].map(dx => tsv(x + dx, y0 + 20, 22)).join(''),
    x => die(x + 20, y0 + 20, 100, 22) + `<rect x="${x + 20}" y="${y0 + 42}" width="100" height="12" fill="none" stroke="${MUTED}" stroke-dasharray="3 2"/>` + [44, 68, 92].map(dx => tsv(x + dx, y0 + 20, 22)).join('') + arrow(x + 70, y0 + 64, x + 70, y0 + 46, INK_2, 1.3),
    x => die(x + 20, y0 + 20, 100, 22) + [44, 68, 92].map(dx => tsv(x + dx, y0 + 20, 22) + `<circle cx="${x + dx + 2}" cy="${y0 + 45}" r="3" fill="#e2e8f0" stroke="${INK_2}"/>`).join(''),
    x => [0, 1, 2, 3].map(r => die(x + 30, y0 + 8 + r * 13, 80, 9) + [50, 68, 86].map(dx => tsv(x + dx, y0 + 8 + r * 13, 9) + (r < 3 ? `<circle cx="${x + dx + 2}" cy="${y0 + 19 + r * 13}" r="2" fill="#e2e8f0" stroke="${INK_2}" stroke-width=".6"/>` : '')).join('')).join('')
  ];
  const keys = ['tsv', 'thin', 'bumps', 'stack'];
  const th = Math.max(...keys.map(k => para(0, 0, L(k), w - 12, 10.5, INK, 'middle', 600).height));
  keys.forEach((k, i) => {
    const x = 16 + i * (w + gap);
    svg += `<rect x="${x}" y="${y0}" width="${w}" height="${66 + th}" rx="8" fill="#ffffff" stroke="${LINE}"/>` + steps[i](x) + para(x + w / 2, y0 + 72, L(k), w - 12, 10.5, INK, 'middle', 600).svg;
    if (i < 3) svg += arrow(x + w + 1, y0 + 36, x + w + gap - 1, y0 + 36);
  });
  let y = y0 + 66 + th + 10;
  const def1 = para(170, y + 8, `${L('tsvName')}${en ? ': ' : '：'}${L('tsvDef')}`, 300, 10.5, INK_2);
  const def2 = para(470, y + 8, L('stackDef'), 300, 10.5, INK_2);
  svg += def1.svg + def2.svg;
  y += Math.max(def1.height, def2.height) + 18;
  svg += `<path d="M16 ${y - 8} H624" stroke="${LINE}"/>`;
  // 下排：三種接合方式（同比例；前兩種的縫隙相近，第三種幾乎為零，不標數值）
  const bw = 148, bx = [16, 172, 328];
  const gapH = 14, dieH = 26;
  const pair = (x, yy, mode) => {
    let o = die(x + 18, yy, 112, dieH) + [42, 72, 102].map(dx => tsv(x + dx, yy, dieH)).join('');
    const yb = yy + dieH + (mode === 'hybrid' ? 0 : gapH);
    if (mode === 'ncf') o += `<rect x="${x + 18}" y="${yy + dieH}" width="112" height="${gapH}" fill="#ede9fe" stroke="${VIOLET}" stroke-width=".8"/>`;
    if (mode === 'muf') o += `<rect x="${x + 18}" y="${yy + dieH}" width="112" height="${gapH}" fill="#94a3b8"/>` + arrow(x + 6, yy + dieH + gapH / 2, x + 18, yy + dieH + gapH / 2, INK_2, 1.2);
    if (mode !== 'hybrid') o += [42, 72, 102].map(dx => `<ellipse cx="${x + dx + 2}" cy="${yy + dieH + gapH / 2}" rx="5" ry="${gapH / 2}" fill="#e2e8f0" stroke="${INK_2}"/>`).join('');
    o += die(x + 18, yb, 112, dieH) + [42, 72, 102].map(dx => tsv(x + dx, yb, dieH)).join('');
    // 混合鍵合：銅墊對銅墊、絕緣層對絕緣層，同一條介面
    if (mode === 'hybrid') o += `<rect x="${x + 18}" y="${yb - 4}" width="112" height="8" fill="${TEAL_XL}" stroke="${TEAL}" stroke-width=".8"/>` + [42, 72, 102].map(dx => `<rect x="${x + dx - 4}" y="${yb - 4}" width="12" height="8" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/>`).join('') + `<path d="M${x + 18} ${yb} h112" stroke="${INK}" stroke-width=".5" stroke-opacity=".35"/>`;
    return o;
  };
  const by = y + 24;
  const names = [['tcncf', 'tcncfName', 'ncf'], ['mrmuf', 'mrmufName', 'muf'], ['hybrid', 'cuDesc', 'hybrid']];
  const nh = Math.max(...names.map(([a, b]) => para(0, 0, L(a), bw - 12, 11.5, INK, 'middle', 700).height + para(0, 0, L(b), bw - 12, 10.5).height));
  const boxH = 18 + 2 * dieH + gapH + 22 + nh + 8;
  names.forEach(([a, b, mode], i) => {
    const x = bx[i];
    svg += `<rect x="${x}" y="${by}" width="${bw}" height="${boxH}" rx="8" fill="#ffffff" stroke="${LINE}"/>` + pair(x, by + 18, mode);
    const head = para(x + bw / 2, by + 18 + 2 * dieH + gapH + 22, L(a), bw - 12, 11.5, INK, 'middle', 700);
    svg += head.svg + para(x + bw / 2, by + 18 + 2 * dieH + gapH + 22 + head.height, L(b), bw - 12, 10.5, INK_2).svg;
  });
  // 第一種：熱壓頭往下壓；第二種：一次回焊
  svg += `<rect x="${bx[0] + 74}" y="${by + 4}" width="48" height="8" rx="2" fill="#64748b"/>` + [86, 110].map(dx => arrow(bx[0] + dx, by + 12, bx[0] + dx, by + 17, RED, 1.2)).join('');
  svg += [56, 74, 92].map(dx => `<path d="M${bx[1] + dx} ${by + 14} q-3 -3 0 -6 q3 -3 0 -6" fill="none" stroke="${RED}" stroke-width="1.2"/>`).join('');
  svg += lead(bx[0] + 40, by + 18 + dieH + gapH / 2, bx[0] + 26, by + 14) + t(bx[0] + 6, by + 12, L('microbump'), 9.5, INK_2, 'start');
  // 第三種旁的高度標尺：基底晶粒加 16 層 DRAM，整疊都在封裝高度限制內
  const sx = 488, sTop = by + 34, layers = 16;
  svg += para(558, by + 14, L('gen'), 132, 11, INK, 'middle', 700).svg;

  for (let i = 0; i < layers; i++) svg += `<rect x="${sx}" y="${sTop + i * 6}" width="36" height="5" fill="${DIE}" stroke="${INK_2}" stroke-width=".5"/>`;
  svg += `<rect x="${sx}" y="${sTop + layers * 6}" width="36" height="9" fill="${TEAL_L}" stroke="${TEAL}"/>`;
  const sBot = sTop + layers * 6 + 9;
  svg += `<path d="M${sx + 41} ${sTop} h5 V${sBot} h-5" fill="none" stroke="${INK}" stroke-width="1.2"/>`;
  const fits = para(sx + 52, sTop + 20, L('fits775'), 84, 10, INK, 'start', 600);
  svg += fits.svg;
  return { svg, height: Math.ceil(Math.max(by + boxH, sBot, sTop + 30 + fits.height) + 10) };
}

// ch14 名稱的由來：上排三格把「一個電晶體所占的面積」畫成長寬比約 1.41 的長方形；長寬乘以 0.7 後，兩個縮小的長方形轉 90 度並排，
// 剛好大致填滿原長方形（技術審查修正：正方形放不下兩個 0.7 倍的正方形）。下排保留原本節點名稱的演變
function nodeShrink(spec, en, kit) {
  const { L, t, para, arrow, mark } = tools(spec, en, kit);
  const W = 120, H = 85, k = 0.7;
  // 閘極的長寬都按外框比例，縮小時一起變成 0.7 倍（審查意見）
  const gate = (x, y, w, h, vertical) => vertical
    ? `<rect x="${x + w * 0.4}" y="${y + h * 0.05}" width="${w * 0.2}" height="${h * 0.9}" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".7"/>`
    : `<rect x="${x + w * 0.05}" y="${y + h * 0.4}" width="${w * 0.9}" height="${h * 0.2}" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".7"/>`;
  const cell = (x, y, w, h, vertical, fill = TEAL_L) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${TEAL}"/>` + gate(x, y, w, h, vertical);
  let svg = '';
  const top = 18;
  // A：原尺寸
  svg += mark(18, top, 'A') + cell(48, top + 10, W, H, false);
  // B：長和寬都乘以 0.7，左下對齊；差額淡色
  const bx = 240;
  svg += mark(bx - 12, top, 'B') + `<rect x="${bx}" y="${top + 10}" width="${W}" height="${H}" fill="#f8fafc" stroke="${MUTED}" stroke-dasharray="4 3"/>` + cell(bx, top + 10 + H - H * k, W * k, H * k, false);
  // C：原尺寸裡並排兩個縮小後轉 90 度的長方形
  const cx = 448;
  svg += mark(cx - 12, top, 'C') + `<rect x="${cx}" y="${top + 10}" width="${W}" height="${H}" fill="none" stroke="${MUTED}" stroke-dasharray="4 3"/>`
    + cell(cx, top + 10 + (H - W * k), H * k, W * k, true) + cell(cx + H * k, top + 10 + (H - W * k), H * k, W * k, true)
    // 旋轉符號：C 格是 B 格縮小後的長方形轉 90 度
    + `<path d="M${cx + W + 22} ${top + 44} a10 10 0 1 1 -8 -10" fill="none" stroke="${TEAL}" stroke-width="1.4"/><path d="M${cx + W + 14} ${top + 34} l6 -4 l1 7 z" fill="${TEAL}"/>`;
  const ty = top + H + 30;
  const times = para(bx + W / 2, ty, L('times07'), 190, 11, INK, 'middle', 700);
  const half = para(bx + W / 2, ty + times.height, L('half'), 190, 10.5, TEAL, 'middle', 600);
  const twice = para(cx + W / 2, ty, L('twice'), 180, 11, INK, 'middle', 700);
  svg += times.svg + half.svg + twice.svg + arrow(178, top + 52, 228, top + 52) + arrow(372, top + 52, 432, top + 52);
  // 下排：名稱怎麼從對應尺寸變成世代代號
  let y = ty + Math.max(times.height + half.height, twice.height) + 22;
  svg += `<path d="M16 ${y - 8} H624" stroke="${LINE}"/>`;
  const chips = [[['agreed', 11, INK, 700], ['roughly', 10, INK_2, 400]], [['shrink07', 11, INK, 700]], [['complex', 11, INK, 700], ['cantKeep', 10, INK_2, 400]], [['apart', 11, RED, 700]], [['angstrom', 11, INK, 700], ['labelsOnly', 10, INK_2, 400]]];
  const cw = 112, cg = (608 - 5 * cw) / 4;
  // 「埃」那一格補回主語「也有公司」：並非整個產業都改用埃（審查意見）
  const chipText = kk => kk === 'angstrom' ? (en ? `${L('someCos')} ${L('angstrom')}` : `${L('someCos')}${L('angstrom')}`) : L(kk);
  const ch = Math.max(...chips.map(rows => rows.reduce((h, [kk, s, c, wt]) => h + para(0, 0, chipText(kk), cw - 12, s, c, 'middle', wt).height + 2, 0))) + 20;
  chips.forEach((rows, i) => {
    const x = 16 + i * (cw + cg);
    svg += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="8" fill="${i === 3 ? '#fff1f2' : LIGHT}" stroke="${i === 3 ? RED : LINE}"/>`;
    let yy = y + 18;
    rows.forEach(([kk, s, c, wt]) => { const p = para(x + cw / 2, yy, chipText(kk), cw - 12, s, c, 'middle', wt); svg += p.svg; yy += p.height + 2; });
    if (i < 4) svg += arrow(x + cw + 1, y + ch / 2, x + cw + cg - 1, y + ch / 2);
  });
  return { svg, height: Math.ceil(y + ch + 8) };
}

// ── D 批（ch15–ch21）：量測與檢測、製程控制、異常處理、晶圓測試、封裝與先進封裝 ──
const DIE_C = '#cbd5e1';
const ORANGE_L = '#fdba74';
const SOLDER_D = '#e2e8f0';
const card = (x, y, w, h, fill = '#ffffff', stroke = LINE, rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}"/>`;
const tick = (x, y, s = 1, color = GREEN) => `<path d="M${x - 5 * s} ${y} l${3.5 * s} ${3.5 * s} l${6.5 * s} ${-7 * s}" fill="none" stroke="${color}" stroke-width="${1.8 * s}" stroke-linecap="round" stroke-linejoin="round"/>`;
const xmark = (x, y, s = 4.5, color = RED) => `<path d="M${x - s} ${y - s} L${x + s} ${y + s} M${x + s} ${y - s} L${x - s} ${y + s}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>`;
// 固定種子的亂數：缺陷點每次畫出來都一樣
const seeded = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
// 俯視晶圓上完整落在圓內的晶粒格
const fullDies = (cx, cy, r, n) => {
  const s = 2 * r / n, cells = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const x = cx - r + i * s, y = cy - r + j * s;
    if ([[x, y], [x + s, y], [x, y + s], [x + s, y + s]].every(([px, py]) => Math.hypot(px - cx, py - cy) <= r - 1)) cells.push({ x, y, s, i, j });
  }
  return cells;
};

// ch15 量測與檢測不一樣：量測得到一組數字（數值格只畫灰條，不放示範數字），檢測得到標出缺陷位置的分佈圖
function metrologyVsInspection(spec, en, kit) {
  const { L, t, para, arrow, dim } = tools(spec, en, kit);
  const subL = para(168, 46, L('measures'), 280, 11, INK_2), subR = para(472, 46, L('searches'), 280, 11, INK_2);
  let svg = t(168, 26, L('metrology'), 14, INK, 'middle', 700) + t(472, 26, L('inspection'), 14, INK, 'middle', 700) + subL.svg + subR.svg;
  const y0 = 46 + Math.max(subL.height, subR.height) + 4;
  // 左：剖面上的膜厚與線寬；線寬標在線條中段
  const yf = y0 + 40, yb = yf + 18;
  svg += `<rect x="48" y="${yb}" width="240" height="24" fill="${SI}" stroke="${INK_2}"/><rect x="48" y="${yf}" width="240" height="18" fill="${TEAL_L}" stroke="${TEAL}"/><path d="M150 ${yf} L158 ${yf - 22} H190 L198 ${yf} Z" fill="${RESIST}" stroke="${AMBER}"/>`;
  svg += dim(70, yf, 70, yb) + t(78, yf + 13, L('thickness'), 11, INK, 'start', 600);
  svg += `<path d="M154 ${yf - 11} V${yf - 34} M194 ${yf - 11} V${yf - 34}" stroke="${MUTED}" stroke-dasharray="2 2"/>` + dim(154, yf - 30, 194, yf - 30) + t(174, yf - 36, L('lineWidth'), 11, INK, 'middle', 600);
  svg += arrow(168, y0 + 88, 168, y0 + 104);
  svg += `<rect x="78" y="${y0 + 108}" width="180" height="50" rx="4" fill="#ffffff" stroke="${INK_2}"/><path d="M78 ${y0 + 133} H258 M168 ${y0 + 108} V${y0 + 158}" stroke="${LINE}"/>`
    + t(90, y0 + 125, L('thickness'), 10.5, INK, 'start') + t(90, y0 + 150, L('lineWidth'), 10.5, INK, 'start')
    + `<rect x="176" y="${y0 + 117}" width="72" height="8" rx="2" fill="${LINE}"/><rect x="176" y="${y0 + 142}" width="72" height="8" rx="2" fill="${LINE}"/>`;
  // 右：晶圓俯視圖上的三種缺陷，再變成只標位置的分佈圖
  const cx = 420, cy = y0 + 40, r = 40;
  const dies = fullDies(cx, cy, r, 7);
  svg += waferTop(cx, cy, r, '#f1f5f9') + dies.map(d => `<rect x="${d.x + 0.6}" y="${d.y + 0.6}" width="${d.s - 1.2}" height="${d.s - 1.2}" fill="#ffffff" stroke="${LINE}" stroke-width=".7"/>`).join('');
  const at = (i, j) => dies.find(d => d.i === i && d.j === j);
  const p = at(2, 2), q = at(4, 4);
  const pc = [p.x + p.s / 2, p.y + p.s / 2], qc = [q.x + q.s / 2, q.y + q.s / 2];
  const scratch = (ox, oy, k) => `M${ox + 6 * k} ${oy - 26 * k} q${12 * k} ${2 * k} ${18 * k} ${16 * k}`;
  svg += `<circle cx="${pc[0]}" cy="${pc[1]}" r="2.6" fill="${INK}"/><path d="${scratch(cx, cy, 1)}" fill="none" stroke="${INK}" stroke-width="1.6"/><path d="M${q.x + 2} ${q.y + q.s / 2} l2 -3 l2 5 l2 -5 l2 5 l2 -3" fill="none" stroke="${RED}" stroke-width="1.2"/>`;
  const leg = [[0, `<circle cx="490" cy="${y0 + 13}" r="2.6" fill="${INK}"/>`, 'particles'], [24, `<path d="M484 ${y0 + 41} q5 -6 12 -3" fill="none" stroke="${INK}" stroke-width="1.6"/>`, 'scratches'], [48, `<path d="M484 ${y0 + 61} l2 -3 l2 5 l2 -5 l2 5 l2 -3" fill="none" stroke="${RED}" stroke-width="1.2"/>`, 'pattern']];
  svg += leg.map(([dy, glyph, k]) => glyph + t(504, y0 + 17 + dy, L(k), 11, INK, 'start')).join('');
  svg += arrow(472, y0 + 88, 472, y0 + 104);
  const mcx = 472, mcy = y0 + 132, k = 24 / r;
  const mark = (x, y) => `<circle cx="${mcx + (x - cx) * k}" cy="${mcy + (y - cy) * k}" r="2.4" fill="${RED}"/>`;
  svg += waferTop(mcx, mcy, 24, '#ffffff') + mark(...pc) + mark(cx + 15, cy - 18) + mark(...qc);
  const resL = para(168, y0 + 178, L('numbers'), 280, 11.5, INK, 'middle', 700), resR = para(472, y0 + 178, L('map'), 280, 11.5, INK, 'middle', 700);
  svg += resL.svg + resR.svg + `<path d="M320 14 V${y0 + 182}" stroke="${LINE}"/>`;
  const yn = y0 + 178 + Math.max(resL.height, resR.height) + 12;
  svg += t(320, yn, en ? `${L('loosely')} ${L('callBoth')}` : `${L('loosely')}${L('callBoth')}`, 11, MUTED);
  return { svg, height: yn + 10 };
}

// ch15 常見的量測：五種量測各畫原理小圖（技術審查修正：膜厚畫表面與介面兩道反射光；線寬的雙箭頭畫在線條中段；
// OCD 只畫一道斜入射光與主反射光，旁邊是無刻度的光譜小曲線，虛線模型輪廓疊在實際形狀上；四根探針不畫接法）
function fiveMeasurements(spec, en, kit) {
  const { L, t, para, arrow, dim } = tools(spec, en, kit);
  const cw = 114, gap = (608 - 5 * cw) / 4, y0 = 12;
  const cols = [['thickness', 'thickHow', 'thickWhen'], ['cd', 'cdHow', 'cdWhen'], ['profile', 'ocdHow', 'ocdWhen'], ['overlay', 'ovlHow', 'ovlWhen'], ['sheet', 'sheetHow', 'sheetWhen']];
  const th = Math.max(...cols.map(([k]) => para(0, 0, L(k), cw - 10, 11.5, INK, 'middle', 700).height));
  const hh = Math.max(...cols.map(([, k]) => para(0, 0, L(k), cw - 12, 10.5).height));
  const wh = Math.max(...cols.map(([, , k]) => para(0, 0, L(k), cw - 16, 10).height));
  const ya = y0 + 12 + th + 4, yh = ya + 94, cardH = yh + hh - y0 - 2;
  const sub = (x, y) => `<rect x="${x + 8}" y="${y}" width="98" height="16" fill="${SI}" stroke="${INK_2}"/>`;
  const art = [
    x => { // 膜厚：入射光在薄膜表面與薄膜／基板介面各反射一道；反射角等於入射角，兩道反射光平行進入偵測器
      const yf = ya + 44, yb = ya + 62;
      return sub(x, yb) + `<rect x="${x + 8}" y="${yf}" width="98" height="18" fill="${TEAL_L}" stroke="${TEAL}"/>`
        + `<circle cx="${x + 16}" cy="${ya + 8}" r="5" fill="${AMBER_L}" stroke="${AMBER}"/><rect x="${x + 64}" y="${ya + 2}" width="30" height="11" rx="2" fill="${INK_2}"/>`
        + `<path d="M${x + 20} ${ya + 12} L${x + 46} ${yf} L${x + 54} ${yb} L${x + 62} ${yf}" fill="none" stroke="${BLUE}" stroke-width="1.3"/>`
        + arrow(x + 46, yf, x + 71.2, ya + 13, BLUE, 1.3) + arrow(x + 62, yf, x + 87.2, ya + 13, BLUE, 1.3);
    },
    x => { // 線寬：電子束從正上方往下
      const yt = ya + 40, yb = ya + 62, ym = (yt + yb) / 2;
      return sub(x, yb) + `<path d="M${x + 36} ${yb} L${x + 44} ${yt} H${x + 70} L${x + 78} ${yb} Z" fill="${RESIST}" stroke="${AMBER}"/>`
        + `<path d="M${x + 47} ${ya} H${x + 67} L${x + 62} ${ya + 20} H${x + 52} Z" fill="${INK_2}"/><path d="M${x + 57} ${ya + 20} V${yt}" stroke="${BLUE}" stroke-width="1.3" stroke-dasharray="3 2"/>`
        + dim(x + 40, ym, x + 74, ym, INK) + t(x + 72, ya + 12, L('cdSem'), 10, INK_2, 'start', 600);
    },
    x => { // 立體輪廓：週期排列的線條
      const yt = ya + 48, yb = ya + 62;
      let o = sub(x, yb) + [30, 50, 70].map(dx => `<path d="M${x + dx - 6} ${yb} L${x + dx - 4} ${yt} H${x + dx + 4} L${x + dx + 6} ${yb} Z" fill="${RESIST}" stroke="${AMBER}"/>`).join('');
      o += `<path d="M${x + 43} ${yb + 2} L${x + 45} ${yt - 3} H${x + 55} L${x + 57} ${yb + 2}" fill="none" stroke="${INK}" stroke-dasharray="2 1.5"/>`;
      o += `<path d="M${x + 22} ${ya + 2} L${x + 50} ${yt - 2}" stroke="${BLUE}" stroke-width="1.3"/>` + arrow(x + 50, yt - 2, x + 71, ya + 13, BLUE, 1.3) + `<rect x="${x + 61}" y="${ya + 1}" width="20" height="11" rx="2" fill="${INK_2}"/>`;
      o += arrow(x + 81, ya + 8, x + 89, ya + 16, INK_2, 1) + `<rect x="${x + 84}" y="${ya + 16}" width="26" height="14" rx="2" fill="#ffffff" stroke="${LINE}"/><path d="M${x + 86} ${ya + 27} q4 -9 7 -2 t7 -2 t6 -4" fill="none" stroke="${BLUE}" stroke-width="1.1"/>`
        + `<path d="M${x + 90} ${ya + 30} L${x + 56} ${ya + 45}" stroke="${INK}" stroke-width=".9" stroke-dasharray="2 1.5"/>`;
      return o + t(x + 84, ya + 44, L('ocd'), 10, INK_2, 'start', 600);
    },
    x => { // 對準：俯視兩個同心方框記號，外框是下層、內框是上層，內框略為偏心
      const cx = x + 57, cy = ya + 38;
      return `<rect x="${cx - 28}" y="${cy - 28}" width="56" height="56" fill="none" stroke="${INK_2}" stroke-width="5" stroke-opacity=".5"/><rect x="${cx - 8}" y="${cy - 9}" width="26" height="26" fill="none" stroke="${TEAL}" stroke-width="5"/>`;
    },
    x => { // 片電阻：四根探針排成一列接觸表面
      const yf = ya + 48, yb = ya + 62;
      return sub(x, yb) + `<rect x="${x + 8}" y="${yf}" width="98" height="14" fill="${AL}" stroke="${INK_2}"/><rect x="${x + 28}" y="${ya + 6}" width="58" height="12" rx="3" fill="${INK_2}"/>`
        + [39, 51, 63, 75].map(dx => `<path d="M${x + dx} ${ya + 18} V${yf}" stroke="${INK}" stroke-width="1.6"/>`).join('');
    }
  ];
  let svg = '';
  const yl = y0 + cardH + 20, yc = yl + 10;
  cols.forEach(([k, how, when], i) => {
    const x = 16 + i * (cw + gap);
    svg += card(x, y0, cw, cardH) + para(x + cw / 2, y0 + 18, L(k), cw - 10, 11.5, INK, 'middle', 700).svg + art[i](x) + para(x + cw / 2, yh, L(how), cw - 12, 10.5).svg
      + `<rect x="${x + 4}" y="${yc}" width="${cw - 8}" height="${wh + 10}" rx="6" fill="${TEAL_XL}" stroke="${TEAL}" stroke-opacity=".4"/>`
      + para(x + cw / 2, yc + 14 + (wh - para(0, 0, L(when), cw - 16, 10).height) / 2, L(when), cw - 16, 10, TEAL, 'middle', 600).svg;
  });
  svg += t(320, yl, L('timing'), 10.5, MUTED, 'middle', 600);
  return { svg, height: yc + wh + 18 };
}

// ch15 抽樣：部分批次 → 每批中的部分晶圓 → 每片晶圓上的部分位置（技術審查修正：晶圓盒側剖面裡晶圓水平疊放，
// 放大線從有量測記號的那一盒拉出；量測點由中心分散到邊緣）。中段是抽樣比例的高低；下段保留被取代的對照圖：量得少與量得多各自的代價
function samplingLevels(spec, en, kit) {
  const { L, t, para, lines, icon } = tools(spec, en, kit);
  const y0 = 12, ph = 120;
  let svg = card(16, y0, 196, ph) + card(228, y0, 180, ph) + card(424, y0, 200, ph);
  // ① 一排晶圓盒，兩盒有量測記號
  const fx = i => 30 + i * 29, on = i => i === 1 || i === 5;
  [0, 1, 2, 3, 4, 5].forEach(i => {
    const c = on(i) ? TEAL : MUTED;
    svg += `<rect x="${fx(i)}" y="${y0 + 38}" width="24" height="28" rx="4" fill="${on(i) ? TEAL_XL : LIGHT}" stroke="${c}" stroke-width="${on(i) ? 1.5 : 1}"/><path d="M${fx(i) + 7} ${y0 + 38} V${y0 + 33} H${fx(i) + 17} V${y0 + 38}" fill="none" stroke="${c}"/>`;
    if (on(i)) svg += icon('microscope', fx(i) + 4, y0 + 14, 16, TEAL);
  });
  // ② 有記號那一盒的側剖面：晶圓水平放在一格格槽裡，少數幾片被量
  const bx = 262, by = y0 + 16;
  svg += `<path d="M${fx(5) + 24} ${y0 + 38} L${bx} ${by} M${fx(5) + 24} ${y0 + 66} L${bx} ${by + 64}" stroke="${TEAL}" stroke-dasharray="3 3"/>`;
  svg += `<rect x="${bx}" y="${by}" width="112" height="64" rx="4" fill="${TEAL_XL}" stroke="${TEAL}" stroke-width="1.5"/>`;
  const picked = [2, 6];
  for (let k = 0; k < 9; k++) {
    const yy = by + 7 + k * 6.2;
    svg += `<path d="M${bx + 4} ${yy} h4 M${bx + 104} ${yy} h4" stroke="${MUTED}"/><rect x="${bx + 9}" y="${yy - 1.4}" width="94" height="2.8" rx="1" fill="${picked.includes(k) ? TEAL : DIE_C}"/>`;
  }
  // ③ 被量的那一片晶圓上，少數量測點由中心分散到邊緣
  const wy = by + 7 + 6 * 6.2, cx = 524, cy = y0 + 50;
  svg += `<path d="M${bx + 103} ${wy} L${cx - 30} ${cy - 16} M${bx + 103} ${wy} L${cx - 30} ${cy + 16}" stroke="${TEAL}" stroke-dasharray="3 3"/>`;
  svg += waferTop(cx, cy, 34, '#ffffff', TEAL) + [[0, 0], [-14, -9], [16, -14], [-20, 14], [23, 15]].map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${cy + dy}" r="3.6" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="1.4"/>`).join('');
  svg += para(114, y0 + 92, L('someLots'), 180, 12, INK, 'middle', 700).svg + para(318, y0 + 98, L('someWafers'), 164, 12, INK, 'middle', 700).svg + para(524, y0 + 102, L('someSites'), 184, 12, INK, 'middle', 700).svg;
  // 中段：抽樣比例，點越密代表量得越多
  const y1 = y0 + ph + 26;
  svg += t(320, y1, L('rates'), 12, INK, 'middle', 700);
  let x = 190, s = 20;
  while (x <= 440) { svg += `<circle cx="${x}" cy="${y1 + 16}" r="2.6" fill="${TEAL}"/>`; x += s; s = Math.max(4.5, s * 0.84); }
  const lowA = para(16, y1 + 4, L('lower'), 150, 11.5, INK, 'start', 700), lowB = para(16, y1 + 4 + lowA.height + 2, L('stable'), 150, 10.5, INK_2, 'start');
  const hiA = para(624, y1 + 4, L('higher'), 176, 11.5, INK, 'end', 700);
  const hiB = en ? para(624, y1 + 4 + hiA.height + 2, `${L('newProducts')}, ${L('freshTools')}, ${L('recentProblems')}`, 176, 10.5, INK_2, 'end')
    : lines(624, y1 + 4 + hiA.height + 2, [`${L('newProducts')}、${L('freshTools')}、`, L('recentProblems')], 10.5, INK_2, 'end');
  svg += lowA.svg + lowB.svg + hiA.svg + hiB.svg;
  // 下段：量得少與量得多各自的代價（被取代的對照圖內容，改用正文原句）
  const y2 = y1 + 4 + Math.max(lowA.height + lowB.height, hiA.height + hiB.height) + 26;
  svg += t(320, y2, L('tradeOff'), 12, INK, 'middle', 700);
  const good = (x0, y) => tick(x0 + 5, y - 3, 0.9);
  const bad = (x0, y) => `<circle cx="${x0 + 5}" cy="${y - 4}" r="5" fill="#fff1f2" stroke="${RED}"/><path d="M${x0 + 2.5} ${y - 4} h5" stroke="${RED}" stroke-width="1.6"/>`;
  const side = (x0, name, items) => {
    let yy = y2 + 44, out = '';
    for (const [k, kind] of items) { const p = para(x0 + 30, yy, L(k), 250, 10.5, INK, 'start'); out += (kind ? good : bad)(x0 + 14, yy) + p.svg; yy += p.height + 6; }
    return { svg: t(x0 + 148, y2 + 28, L(name), 12, TEAL, 'middle', 700) + out, h: yy - y2 - 4 };
  };
  const less = side(16, 'lessName', [['lessFast', 1], ['lessRisk', 0], ['lessLate', 0], ['lessLots', 0]]);
  const more = side(328, 'moreName', [['moreEarly', 1], ['moreCost', 0], ['moreSlow', 0]]);
  const ch = Math.max(less.h, more.h);
  svg += card(16, y2 + 8, 296, ch) + card(328, y2 + 8, 296, ch) + less.svg + more.svg;
  return { svg, height: y2 + 8 + ch + 8 };
}

// ch15 破壞性分析：切開晶圓 → 用電子顯微鏡觀察剖面 → 每一層的厚度和形狀（只畫「切開」，不畫特定切割方法；剖面的立體結構只畫溝槽一種）
function crossSectionAnalysis(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const y0 = 12, ph = 152, pw = 184, gap = (608 - 3 * pw) / 2;
  const px = i => 16 + i * (pw + gap);
  let svg = '';
  [0, 1, 2].forEach(i => { svg += card(px(i), y0, pw, ph); if (i < 2) svg += arrow(px(i) + pw + 3, y0 + 54, px(i + 1) - 3, y0 + 54); });
  // ① 晶圓沿紅線切開，右半片移開
  const cx = px(0) + 88, cy = y0 + 54, r = 38;
  svg += `<path d="M${cx - 3} ${cy - r} A${r} ${r} 0 0 0 ${cx - 3} ${cy + r} Z" fill="#e2e8f0" stroke="${INK_2}"/><path d="M${cx + 9} ${cy - r - 4} A${r} ${r} 0 0 1 ${cx + 9} ${cy + r - 4} Z" fill="#e2e8f0" stroke="${INK_2}"/>`
    + `<path d="M${cx + 3} ${cy - r - 10} V${cy + r + 6}" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4 3"/>`;
  // ② 半片晶圓的側面：切開的那一面朝右，電子顯微鏡的鏡柱對著切面
  const sx = px(1) + 14, cutX = sx + 86;
  svg += `<rect x="${sx}" y="${y0 + 62}" width="86" height="22" fill="#e2e8f0" stroke="${INK_2}"/>` + [0, 1, 2].map(k => `<rect x="${sx}" y="${y0 + 58 - k * 4}" width="86" height="4" fill="${[TEAL_L, AL, AMBER_L][k]}" stroke="${INK_2}" stroke-width=".5"/>`).join('')
    + `<path d="M${cutX} ${y0 + 46} V${y0 + 90}" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4 3"/>`
    + `<rect x="${cutX + 44}" y="${y0 + 43}" width="34" height="26" rx="3" fill="${INK_2}"/><path d="M${cutX + 44} ${y0 + 45} V${y0 + 67} L${cutX + 30} ${y0 + 60} V${y0 + 52} Z" fill="${INK_2}"/><path d="M${cutX + 30} ${y0 + 56} H${cutX + 3}" stroke="${BLUE}" stroke-width="1.4" stroke-dasharray="3 2"/>`;
  // ③ 剖面：溝槽與三層順著表面長的薄膜（粗線條先畫，再用基板蓋住下半，露出來的就是每一層）
  const x0 = px(2) + 10, x1 = px(2) + pw - 10, ys = y0 + 50, tl = px(2) + 64, tr = px(2) + 120, ybot = ys + 36;
  const surface = `M${x0} ${ys} H${tl} V${ybot} H${tr} V${ys} H${x1}`;
  svg += [[48, AMBER_L], [32, AL], [16, TEAL_L]].map(([w, c]) => `<path d="${surface}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="miter"/>`).join('');
  svg += `<path d="${surface} V${y0 + 112} H${x0} Z" fill="${SI}" stroke="${INK_2}"/>` + [8, 16, 24].map(d => `<path d="M${x0} ${ys - d} H${tl + d} V${ybot - d} H${tr - d} V${ys - d} H${x1}" fill="none" stroke="${INK_2}" stroke-width=".6"/>`).join('');
  svg += `<path d="M${x0 + 18} ${ys} V${ys - 24} M${x0 + 14} ${ys} h8 M${x0 + 14} ${ys - 8} h8 M${x0 + 14} ${ys - 16} h8 M${x0 + 14} ${ys - 24} h8" stroke="${INK}" stroke-width="1.1"/>`;
  svg += [[0, 'cutOpen'], [1, 'examined'], [2, 'eachLayer']].map(([i, k]) => para(px(i) + pw / 2, y0 + 128, L(k), pw - 16, 11, INK, 'middle', 700).svg).join('');
  // 下方提示列：會破壞晶圓 → 主要用在製程開發和故障分析
  const y1 = y0 + ph + 30;
  svg += `<circle cx="34" cy="${y1 - 4}" r="12" fill="#e2e8f0" stroke="${RED}"/><path d="M28 ${y1 - 15} l5 7 l-4 4 l6 6 l-2 7" fill="none" stroke="${RED}" stroke-width="1.6"/>`;
  const des = para(54, y1, L('destroys'), 230, 11.5, RED, 'start', 700);
  const dw = Math.min(230, [...L('destroys')].reduce((w, ch) => w + (/[\u2E80-\u9FFF\uFF00-\uFFEF]/.test(ch) ? 1.02 : 0.56), 0) * 11.5), ax = 54 + dw + 14;
  svg += des.svg + arrow(ax, y1 - 4, ax + 30, y1 - 4) + t(ax + 40, y1, L('mainly'), 11, INK_2, 'start');
  const tagY = y1 + 12;
  svg += [[ax + 40, 'dev'], [ax + 186, 'fa']].map(([x, k]) => `<rect x="${x}" y="${tagY}" width="138" height="24" rx="12" fill="${TEAL_XL}" stroke="${TEAL}"/>` + t(x + 69, tagY + 16, L(k), 11, TEAL, 'middle', 700)).join('');
  return { svg, height: Math.max(tagY + 24, y1 + des.height) + 10 };
}

// ch17 製程能力：用停車理解 Cpk。規格是停車格、製程的變化範圍是車寬；三格只比較 Cpk 高低，不標數值；右側數據卡放正文的 1.33
function cpkParking(spec, en, kit) {
  const { L, t, para, lines, dim, mark } = tools(spec, en, kit);
  const y0 = 12, sw = 104, gap = 8, top = y0 + 56, sh = 108;
  let svg = `<path d="M18 ${y0 + 3} v15 M30 ${y0 + 3} v15" stroke="${INK}" stroke-width="2.4"/>` + t(42, y0 + 15, L('specSpace'), 11.5, INK, 'start', 600)
    + `<rect x="16" y="${y0 + 26}" width="16" height="18" rx="4" fill="${TEAL_L}" stroke="${TEAL}"/>` + t(42, y0 + 40, L('carWidth'), 11.5, INK, 'start', 600);
  const car = (x, w, ghost) => ghost
    ? `<rect x="${x}" y="${top + 14}" width="${w}" height="70" rx="8" fill="none" stroke="${TEAL}" stroke-dasharray="4 3"/>`
    : `<rect x="${x}" y="${top + 14}" width="${w}" height="70" rx="8" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="1.4"/><rect x="${x + 4}" y="${top + 24}" width="${w - 8}" height="12" rx="3" fill="#ffffff" stroke="${TEAL}" stroke-width=".8"/><rect x="${x + 4}" y="${top + 64}" width="${w - 8}" height="9" rx="3" fill="#ffffff" stroke="${TEAL}" stroke-width=".8"/>`;
  // A 窄車停正中（加一個稍微偏移的車影，仍在格內）；B 寬車停正中；C 窄車偏向一側
  [['A', 36, 32, 0.85], ['B', 17, 70, 0.35], ['C', 13.5, 32, 0.3]].forEach(([letter, dx, w, f], i) => {
    const x = 16 + i * (sw + gap);
    svg += `<rect x="${x}" y="${top}" width="${sw}" height="${sh}" rx="4" fill="${LIGHT}" stroke="${LINE}"/><path d="M${x + 10} ${top} V${top + sh} M${x + sw - 10} ${top} V${top + sh}" stroke="${INK}" stroke-width="2.4"/>`;
    if (i === 0) svg += car(x + dx + 12, w, true);
    svg += car(x + dx, w);
    if (i === 0) svg += dim(x + 11.5, top + 98, x + dx, top + 98, TEAL) + dim(x + dx + w, top + 98, x + sw - 11.5, top + 98, TEAL);
    const gy = top + sh + 18;
    svg += mark(x + 9, gy - 4, letter) + t(x + 24, gy, L('cpk'), 11, INK, 'start', 700)
      + `<rect x="${x + 52}" y="${gy - 9}" width="${sw - 52}" height="9" rx="3" fill="#ffffff" stroke="${LINE}"/><rect x="${x + 52}" y="${gy - 9}" width="${(sw - 52) * f}" height="9" rx="3" fill="${f > 0.5 ? TEAL : AMBER_L}" stroke="${f > 0.5 ? TEAL : AMBER}" stroke-width=".8"/>`;
  });
  // 右側：A 的說明（正文原句）與業界要求
  const rx = 364;
  const rule = en ? para(rx + 26, y0 + 18, `${L('narrow')}, ${L('far')}, and ${L('higher')}`, 232, 11.5, INK, 'start', 700)
    : lines(rx + 26, y0 + 18, [`${L('narrow')}，`, `${L('far')}，${L('higher')}`], 11.5, INK, 'start', 700);
  svg += mark(rx + 9, y0 + 14, 'A') + rule.svg;
  let yy = y0 + 18 + rule.height + 8;
  const shift = para(rx + 26, yy, L('shift'), 232, 10.5, INK_2, 'start');
  svg += `<rect x="${rx + 3}" y="${yy - 11}" width="12" height="15" rx="3" fill="none" stroke="${TEAL}" stroke-dasharray="3 2"/>` + shift.svg;
  const cy = yy + shift.height + 10;
  const req = para(rx + 98, cy + 24, L('req'), 152, 11, INK, 'start', 700);
  const strict = en ? para(rx + 98, cy + 24 + req.height + 4, `${L('stricter')}, ${L('auto')}`, 152, 10.5, INK_2, 'start')
    : lines(rx + 98, cy + 24 + req.height + 4, [`${L('stricter')}，`, L('auto')], 10.5, INK_2, 'start');
  const ch = Math.max(78, 24 + req.height + 4 + strict.height + 4);
  svg += card(rx, cy, 260, ch, TEAL_XL, TEAL) + t(rx + 48, cy + ch / 2 + 11, L('value'), 30, TEAL, 'middle', 800) + req.svg + strict.svg;
  return { svg, height: Math.max(top + sh + 26, cy + ch) + 8 };
}

// ch17 自動控制：上段保留被取代的對照圖（R2R 在批與批之間、根據量測結果；FDC 在製程進行中、根據感測器數據），
// 下段把說明框「自動補償會把問題藏起來」畫成兩張共用橫軸的走勢：調整量碰到上限的同時，量測結果才跳離目標
function r2rFdc(spec, en, kit) {
  const { L, t, para, lines, arrow, icon } = tools(spec, en, kit);
  const y0 = 12;
  const chip = (x, y, text) => { const w = (en ? text.length * 6.2 : text.length * 11.5) + 18; return { svg: `<rect x="${x}" y="${y - 13}" width="${w}" height="18" rx="9" fill="${TEAL_XL}" stroke="${TEAL}"/>` + t(x + w / 2, y, text, 10.5, TEAL, 'middle', 700), w }; };
  const lot = (x, y, fill = LIGHT, stroke = MUTED) => `<rect x="${x}" y="${y}" width="24" height="20" rx="3" fill="${fill}" stroke="${stroke}"/>` + [5, 10, 15].map(d => `<path d="M${x + 4} ${y + d} h16" stroke="${stroke}" stroke-width="1.2"/>`).join('');
  // 左：Run-to-Run
  let svg = t(30, y0 + 22, L('r2r'), 14, INK, 'start', 700);
  svg += chip(130, y0 + 21, L('between')).svg;
  const ya = y0 + 36;
  svg += lot(34, ya + 34) + lot(64, ya + 34) + arrow(92, ya + 44, 112, ya + 44) + icon('microscope', 116, ya + 32, 22, TEAL)
    + `<path d="M128 ${ya + 30} C150 ${ya + 2} 222 ${ya + 2} 244 ${ya + 30}" fill="none" stroke="${TEAL}" stroke-width="1.5"/>` + arrow(242, ya + 26, 246, ya + 32)
    + lot(234, ya + 34, TEAL_XL, TEAL) + `<circle cx="186" cy="${ya + 9}" r="10" fill="#ffffff" stroke="${TEAL}" stroke-width="1.4"/><path d="M186 ${ya + 9} L193 ${ya + 3}" stroke="${TEAL}" stroke-width="2" stroke-linecap="round"/>`;
  const l1 = para(30, ya + 82, L('basedOn'), 270, 11, INK, 'start', 700), l2 = para(30, ya + 82 + l1.height, L('tune'), 270, 11, INK, 'start', 700);
  let yl = ya + 82 + l1.height + l2.height + 2;
  const l3 = para(30, yl, en ? `${L('exIf')}, ${L('exThen')}` : `${L('exIf')}，${L('exThen')}`, 270, 10.5, INK_2, 'start'); yl += l3.height + 2;
  const l4 = para(30, yl, L('shower'), 270, 10.5, MUTED, 'start'); yl += l4.height;
  svg += l1.svg + l2.svg + l3.svg + l4.svg;
  // 右：FDC，製程進行中看感測器曲線，一不正常就警報
  svg += t(342, y0 + 22, L('fdc'), 14, INK, 'start', 700) + chip(386, y0 + 21, L('during')).svg;
  svg += `<rect x="346" y="${ya + 16}" width="64" height="54" rx="6" fill="${LIGHT}" stroke="${INK_2}"/><rect x="356" y="${ya + 52}" width="44" height="4" fill="${DIE_C}" stroke="${INK_2}" stroke-width=".6"/>`
    + [[352, ya + 26], [404, ya + 26], [378, ya + 22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${BLUE}"/>`).join('') + arrow(414, ya + 43, 432, ya + 43, BLUE);
  svg += `<rect x="436" y="${ya + 10}" width="176" height="64" rx="4" fill="#ffffff" stroke="${LINE}"/><path d="M442 ${ya + 26} H606 M442 ${ya + 58} H606" stroke="${MUTED}" stroke-dasharray="3 3"/>`
    + `<path d="M442 ${ya + 44} L470 ${ya + 42} L498 ${ya + 45} L520 ${ya + 43} L534 ${ya + 41} L544 ${ya + 18} L554 ${ya + 44} L606 ${ya + 43}" fill="none" stroke="${BLUE}" stroke-width="1.5"/>`
    + `<path d="M570 ${ya + 32} l9 -16 l9 16 z" fill="#fff1f2" stroke="${RED}" stroke-width="1.4" stroke-linejoin="round"/><path d="M579 ${ya + 21} v5 M579 ${ya + 28.5} v.5" stroke="${RED}" stroke-width="1.8" stroke-linecap="round"/>`;
  const r1 = para(342, ya + 82, L('sensorData'), 270, 11, INK, 'start', 700); let yr = ya + 82 + r1.height;
  const r2 = para(342, yr, L('sensors'), 270, 10.5, INK_2, 'start'); yr += r2.height + 2;
  const r3 = para(342, yr, L('alarm'), 270, 11, RED, 'start', 700); yr += r3.height + 2;
  const r4 = para(342, yr, L('dashboard'), 270, 10.5, MUTED, 'start'); yr += r4.height;
  svg += r1.svg + r2.svg + r3.svg + r4.svg;
  const cardH = Math.max(yl, yr) - y0 + 4;
  svg = card(16, y0, 296, cardH) + card(328, y0, 296, cardH) + svg;
  const yApc = y0 + cardH + 20;
  svg += t(320, yApc, L('apc'), 11, INK_2, 'middle', 600);
  // 下段：兩張共用橫軸的走勢（不放數字）。第 10 批起調整量貼到上限，同一批之後量測結果才跳離目標
  const y2 = yApc + 30;
  svg += `<path d="M16 ${y2 - 18} H624" stroke="${LINE}"/>` + t(320, y2, L('hide'), 12.5, INK, 'middle', 700);
  const X = i => 160 + i * 34, n = 14, hit = 10;
  const yu = y2 + 16, uh = 90, yd = yu + uh + 18, dh = 72;
  svg += `<rect x="146" y="${yu}" width="478" height="${uh}" rx="4" fill="#ffffff" stroke="${LINE}"/><rect x="146" y="${yd}" width="478" height="${dh}" rx="4" fill="#ffffff" stroke="${LINE}"/>`;
  const tgt = yu + 40;
  svg += `<path d="M150 ${tgt} H620" stroke="${TEAL}" stroke-dasharray="5 3"/>`;
  const jitter = [-3, 2, -1, 3, -2, 1, -3, 2, 0, -2, 1, -1];
  for (let i = 0; i < n; i++) {
    const y = i <= hit ? tgt + jitter[i % jitter.length] : tgt - 16 - (i - hit - 1) * 7;
    svg += `<circle cx="${X(i)}" cy="${y}" r="3.4" fill="${i <= hit ? TEAL : RED}"/>`;
  }
  const near = para(154, yu + 14, en ? `${L('nearTarget')}, and ${L('looksNormal')}` : `${L('nearTarget')}，${L('looksNormal')}`, 300, 10.5, TEAL, 'start', 600);
  const vx = X(hit) + 17;
  svg += near.svg + para(vx + 6, tgt + 16, L('burst'), 620 - vx - 8, 10.5, RED, 'start', 700).svg;
  // 調整量：一階一階往上爬，碰到上限後就補不動了
  const lim = yd + 12;
  let path = `M${X(0) - 13} ${yd + dh - 8}`;
  for (let i = 0; i < n; i++) { const y = lim + (dh - 20) * (1 - Math.min(i, hit) / hit); path += ` V${y} H${X(i) + 17}`; }
  svg += `<path d="M150 ${lim} H620" stroke="${RED}" stroke-dasharray="5 3"/><path d="${path}" fill="none" stroke="${AMBER}" stroke-width="2"/>`;
  svg += para(vx + 8, lim + 16, L('runsOut'), 96, 10.5, RED, 'start', 700).svg + para(154, yd + 24, L('worse'), 200, 10.5, AMBER, 'start', 600).svg;
  svg += `<path d="M${vx} ${yu + 4} V${yd + dh - 4}" stroke="${RED}" stroke-width="1.2" stroke-dasharray="2 3"/>`;
  svg += para(16, yu + 30, L('measurements'), 124, 11, INK, 'start', 700).svg;
  const adj = para(16, yd + 22, L('adjustments'), 124, 11, INK, 'start', 700);
  svg += adj.svg + (en ? para(16, yd + 22 + adj.height + 2, `${L('doseA')} ${L('doseB')}`, 124, 10, INK_2, 'start') : lines(16, yd + 22 + adj.height + 2, [L('doseA'), L('doseB')], 10, INK_2, 'start')).svg;
  const yw = yd + dh + 26;
  const watch = para(42, yw, en ? `${L('watch1')} ${L('watch2')}` : `${L('watch1')}${L('watch2')}`, 560, 11, TEAL, 'start', 700);
  svg += icon('search', 16, yw - 15, 20, TEAL) + watch.svg;
  return { svg, height: yw + watch.height + 4 };
}

// ch18 找出影響範圍：時間軸往回找到最後一次確認正常（控片量測合格）的時間點，之後經過這台機台的晶圓都列入可疑範圍；
// 只擋發現當下的晶圓會漏掉更早受影響的晶圓；檢查越頻繁，範圍越小（技術審查修正：不知道從何時開始，用均勻斜線，不用由淡到深的漸層）
function suspectScope(spec, en, kit) {
  const { L, t, para, lead } = tools(spec, en, kit);
  const y0 = 12, last = 350, alarm = 590;
  const lastGood = para(last, y0 + 14, L('lastGood'), 200, 11, INK, 'middle', 700), found = para(624, y0 + 14, L('found'), 150, 11, RED, 'end', 700);
  const yE = y0 + 14 + Math.max(lastGood.height, found.height) + 6;
  const earlier = para(472, yE, L('earlier'), 200, 10.5, INK_2, 'middle');
  const bandTop = yE + earlier.height - 4, yA = bandTop + 34;
  let svg = lastGood.svg + found.svg + earlier.svg;
  svg += hatched(last + 10, bandTop, alarm - last - 24, 24, '#fff7ed', '#fdba74') + `<rect x="${last + 10}" y="${bandTop}" width="${alarm - last - 24}" height="24" fill="none" stroke="${ORANGE_L}"/>`;
  const qx = (last + alarm) / 2, qy = bandTop + 12;
  svg += `<circle cx="${qx}" cy="${qy}" r="10" fill="#ffffff" stroke="${RED}"/><path d="M${qx - 3.5} ${qy - 3} q0 -4 3.5 -4 q3.5 0 3.5 3.5 q0 2.5 -3.5 3.8 v2" fill="none" stroke="${RED}" stroke-width="1.6" stroke-linecap="round"/><circle cx="${qx}" cy="${qy + 5.6}" r="1.1" fill="${RED}"/>`;
  svg += lead(last, y0 + 14 + lastGood.height - 6, last, yA - 11) + lead(alarm, y0 + 14 + found.height - 6, alarm, yA - 12);
  // 機台與時間軸
  const axis = (y, checks, scopeFrom) => {
    let o = `<path d="M70 ${y} H${alarm + 14}" stroke="${INK_2}" stroke-width="1.5"/>`;
    for (let x = 82; x < alarm - 14; x += 24) if (!checks.some(c => Math.abs(c - x) < 12)) {
      const sus = x > scopeFrom;
      o += `<rect x="${x - 6}" y="${y - 5}" width="12" height="10" rx="2" fill="${sus ? AMBER_XL : LIGHT}" stroke="${sus ? RED : MUTED}" stroke-width="${sus ? 1.5 : 1}"/>`;
    }
    o += checks.map(c => `<circle cx="${c}" cy="${y}" r="9" fill="#ffffff" stroke="${GREEN}" stroke-width="1.4"/>` + tick(c + 0.5, y + 0.5, 0.75)).join('');
    o += `<path d="M${alarm} ${y - 11} l10 18 h-20 z" fill="#fff1f2" stroke="${RED}" stroke-width="1.4" stroke-linejoin="round"/><path d="M${alarm} ${y - 5} v6 M${alarm} ${y + 3.5} v.5" stroke="${RED}" stroke-width="1.8" stroke-linecap="round"/>`;
    return o;
  };
  svg += `<rect x="16" y="${yA - 20}" width="40" height="34" rx="4" fill="${LIGHT}" stroke="${INK_2}"/><rect x="22" y="${yA - 14}" width="16" height="10" fill="#ffffff" stroke="${INK_2}"/><path d="M56 ${yA} H70" stroke="${INK_2}" stroke-width="1.5"/>`;
  svg += axis(yA, [110, last], last);
  svg += t(110, yA + 26, L('monitor'), 10.5, GREEN, 'middle', 600);
  // 只擋發現當下：灰色虛線小括號；列入可疑範圍：從最後一次確認正常到發現異常
  const miss = para(alarm - 64, yA + 24, en ? `${L('missA')} ${L('missB')}` : `${L('missA')}，${L('missB')}`, 230, 10.5, MUTED, 'end');
  svg += `<path d="M${alarm - 54} ${yA + 10} v6 H${alarm + 8} v-6" fill="none" stroke="${MUTED}" stroke-width="1.4" stroke-dasharray="3 2"/>` + miss.svg;
  const yB = yA + 24 + miss.height + 8;
  svg += `<path d="M${last} ${yB - 7} V${yB} H${alarm + 8} V${yB - 7}" fill="none" stroke="${RED}" stroke-width="1.8"/>`;
  const sus = para((last + alarm) / 2, yB + 18, en ? `${L('after')} is ${L('suspect')}` : `${L('after')}，${L('suspect')}`, 300, 11, RED, 'middle', 700);
  svg += sus.svg;
  // 第二條：檢查加倍頻繁，可疑範圍變短
  const yC = yB + 18 + sus.height + 30;
  const freq = [110, 230, 350, 470];
  svg += t(70, yC - 16, L('frequent'), 11, TEAL, 'start', 700) + axis(yC, freq, 470);
  svg += `<path d="M470 ${yC + 10} V${yC + 17} H${alarm + 8} V${yC + 10}" fill="none" stroke="${RED}" stroke-width="1.8"/>`;
  // 履歷：查出異常期間經過這台機台、這個腔體的晶圓
  const yD = yC + 44;
  svg += `<ellipse cx="28" cy="${yD - 12}" rx="10" ry="3.5" fill="${BLUE_XL}" stroke="${BLUE}"/><path d="M18 ${yD - 12} V${yD + 1} A10 3.5 0 0 0 38 ${yD + 1} V${yD - 12}" fill="${BLUE_XL}" stroke="${BLUE}"/><path d="M18 ${yD - 5.5} A10 3.5 0 0 0 38 ${yD - 5.5}" fill="none" stroke="${BLUE}"/>`;
  const hist = para(46, yD, en ? `${L('history')}: ${L('which')}` : `${L('history')}：${L('which')}`, 570, 11, BLUE, 'start', 600);
  return { svg: svg + hist.svg, height: yD + hist.height + 2 };
}

// ch18 判定：四種處置各配小圖；MRB 不畫在決策點上，放在一側以虛線連到決策點，只在影響較大或不確定時召開（技術審查修正）；
// 重工只畫微影光阻剝除重塗；報廢用打叉的晶圓，不用回收符號
function dispositions(spec, en, kit) {
  const { L, t, para, lines, arrow, icon } = tools(spec, en, kit);
  const y0 = 12, rx = 232, rw = 392;
  const rows = [['release', 'releaseMeans', 'releaseWhen'], ['rework', 'reworkMeans', 'reworkWhen'], ['scrap', 'scrapMeans', 'scrapWhen'], ['cond', 'condMeans', 'condWhen']];
  const heights = rows.map(([a, b, c]) => 14 + para(0, 0, L(a), 300, 12, INK, 'start', 700).height + para(0, 0, L(b), 300, 10.5).height + para(0, 0, L(c), 300, 10.5).height + 8);
  const rh = Math.max(64, ...heights);
  const art = [
    (x, y) => arrow(x, y, x + 44, y, GREEN, 2.4) + `<circle cx="${x + 54}" cy="${y}" r="9" fill="#f0fdf4" stroke="${GREEN}"/>` + tick(x + 54.5, y + 0.5, 0.75),
    (x, y) => `<path d="M${x + 52} ${y - 8} C${x + 52} ${y - 22} ${x + 14} ${y - 22} ${x + 14} ${y - 10}" fill="none" stroke="${AMBER}" stroke-width="1.8"/>` + arrow(x + 14, y - 12, x + 14, y - 6, AMBER, 1.8)
      + `<rect x="${x + 2}" y="${y + 8}" width="24" height="9" fill="${SI}" stroke="${INK_2}"/><rect x="${x + 2}" y="${y}" width="24" height="8" fill="none" stroke="${AMBER}" stroke-dasharray="3 2"/>` + xmark(x + 14, y + 4, 3)
      + arrow(x + 29, y + 8, x + 37, y + 8, INK_2, 1.3) + `<rect x="${x + 40}" y="${y + 8}" width="24" height="9" fill="${SI}" stroke="${INK_2}"/><rect x="${x + 40}" y="${y}" width="24" height="8" fill="${RESIST}" stroke="${AMBER}"/>`,
    (x, y) => `<circle cx="${x + 30}" cy="${y}" r="17" fill="#e2e8f0" stroke="${INK_2}"/>` + xmark(x + 30, y, 9),
    (x, y) => arrow(x, y + 4, x + 40, y + 4, AMBER, 2.4) + icon('tag', x + 2, y - 16, 16, AMBER) + icon('search', x + 40, y - 12, 20, AMBER)
  ];
  let svg = '';
  rows.forEach(([a, b, c], i) => {
    const y = y0 + i * (rh + 8), mid = y + rh / 2;
    svg += card(rx, y, rw, rh) + art[i](rx + 10, mid) + `<path d="M118 ${y0 + 30} H216 V${mid} H${rx}" fill="none" stroke="${TEAL}" stroke-width="1.4"/>`;
    const n1 = para(rx + 84, y + 20, L(a), 300, 12, INK, 'start', 700);
    const p2 = para(rx + 84, y + 20 + n1.height + 2, L(b), 300, 10.5, INK, 'start');
    const p3 = para(rx + 84, y + 20 + n1.height + 2 + p2.height, L(c), 300, 10.5, TEAL, 'start');
    svg += n1.svg + p2.svg + p3.svg;
  });
  // 決策點：一批晶圓走到這裡，決定命運
  svg += `<rect x="24" y="${y0 + 18}" width="34" height="26" rx="3" fill="${LIGHT}" stroke="${INK_2}"/>` + [6, 12, 18].map(d => `<path d="M29 ${y0 + 18 + d} h24" stroke="${INK_2}"/>`).join('')
    + arrow(62, y0 + 31, 84, y0 + 31) + `<path d="M101 ${y0 + 14} L118 ${y0 + 31} L101 ${y0 + 48} L84 ${y0 + 31} Z" fill="${TEAL_XL}" stroke="${TEAL}" stroke-width="1.4"/>`;
  // MRB：只在影響較大或不確定時召開，以虛線連到決策點
  const my = y0 + 92;
  const m1 = en ? para(28, my + 40, `${L('mrbWhen')}, ${L('mrbMeets')}, and ${L('mrbWho')}`, 180, 10.5, INK, 'start', 600) : lines(28, my + 40, [`${L('mrbWhen')}，`, L('mrbMeets')], 10.5, INK, 'start', 600);
  const m2 = en ? { svg: '', height: 0 } : para(28, my + 40 + m1.height + 4, L('mrbWho'), 180, 10.5, INK_2, 'start');
  const m3 = para(28, my + 40 + m1.height + m2.height + 8, L('mrbCustomer'), 180, 10.5, MUTED, 'start');
  const mh = 40 + m1.height + m2.height + m3.height + 6;
  svg += `<path d="M101 ${y0 + 48} V${my}" stroke="${PINK}" stroke-width="1.4" stroke-dasharray="4 3"/>` + card(16, my, 196, mh, PINK_L, PINK) + t(28, my + 22, L('mrb'), 13, PINK, 'start', 800) + m1.svg + m2.svg + m3.svg;
  const yb = Math.max(y0 + 4 * (rh + 8) - 8, my + mh) + 26;
  const fix = para(320, yb, en ? `${L('after')}, ${L('fix')}, and ${L('confirm')}` : `${L('after')}、${L('fix')}，${L('confirm')}`, 580, 11, INK, 'middle', 700);
  svg += `<path d="M16 ${yb - 18} H624" stroke="${LINE}"/>` + fix.svg;
  return { svg, height: yb + fix.height };
}

// ch19 測試也是成本：同一片晶圓畫兩次，晶粒格與缺陷點座標完全相同（固定種子產生）。WAT 只量切割道上的測試鍵，缺陷點不落在測試鍵上；
// CP 每顆都測，含缺陷點的晶粒標成橘色（技術審查修正：缺陷點夠多，讓 CP 的壞晶粒比例明顯偏高；不標良率數字）
function watVsCp(spec, en, kit) {
  const { L, t, para } = tools(spec, en, kit);
  const y0 = 12, r = 84, cy = y0 + 30 + r, xs = [170, 470], n = 8;
  let svg = para(xs[0], y0 + 16, L('passAll'), 280, 12.5, GREEN, 'middle', 700).svg + para(xs[1], y0 + 16, L('cpPoor'), 280, 12.5, RED, 'middle', 700).svg;
  const dies = fullDies(0, 0, r, n);
  const rnd = seeded(20261104);
  const pts = Array.from({ length: 24 }, () => { const d = dies[Math.floor(rnd() * dies.length)]; return [d.x + 4 + rnd() * (d.s - 8), d.y + 4 + rnd() * (d.s - 8), d]; });
  const hit = new Set(pts.map(p => p[2]));
  xs.forEach((cx, k) => {
    svg += waferTop(cx, cy, r, k ? '#f1f5f9' : '#94a3b8');
    svg += dies.map(d => `<rect x="${cx + d.x + (k ? 1 : 2.2)}" y="${cy + d.y + (k ? 1 : 2.2)}" width="${d.s - (k ? 2 : 4.4)}" height="${d.s - (k ? 2 : 4.4)}" fill="${k ? (hit.has(d) ? ORANGE_L : TEAL_L) : '#ffffff'}" stroke="${k ? (hit.has(d) ? RED : TEAL) : LINE}" stroke-width=".8"/>`).join('');
    svg += pts.map(([x, y]) => `<circle cx="${cx + x}" cy="${cy + y}" r="2.3" fill="${INK}"/>`).join('');
  });
  // WAT 的測試鍵在切割道交叉處，全部合格
  const s = 2 * r / n;
  svg += [[2, 2], [6, 2], [4, 4], [2, 6], [6, 6]].map(([i, j]) => { const x = xs[0] - r + i * s, y = cy - r + j * s; return `<rect x="${x - 3.5}" y="${y - 3.5}" width="7" height="7" fill="${GREEN}"/>`; }).join('');
  let yy = cy + r + 22;
  const keys = para(xs[0] - 128, yy, L('fewKeys'), 250, 10.5, INK, 'start'), rand = para(xs[0] - 128, yy + keys.height + 4, L('random'), 250, 10.5, INK, 'start');
  svg += `<rect x="${xs[0] - 146}" y="${yy - 9}" width="7" height="7" fill="${GREEN}"/>` + keys.svg + `<circle cx="${xs[0] - 142.5}" cy="${yy + keys.height}" r="2.6" fill="${INK}"/>` + rand.svg;
  yy += keys.height + rand.height + 28;
  svg += `<path d="M16 ${yy - 18} H624" stroke="${LINE}"/>`;
  const h1 = para(xs[0], yy, en ? `${L('wat')}: ${L('health')}` : L('health'), 270, 11, INK, 'middle', 700), h2 = para(xs[1], yy, en ? `${L('cp')}: ${L('exam')}` : L('exam'), 270, 11, INK, 'middle', 700);
  const yb = yy + Math.max(h1.height, h2.height) + 10;
  svg += h1.svg + h2.svg + `<path d="M${xs[0]} ${yb - 6} V${yb} H${xs[1]} V${yb - 6}" fill="none" stroke="${TEAL}" stroke-width="1.4"/>` + t(320, yb + 18, L('both'), 12, TEAL, 'middle', 700);
  return { svg, height: yb + 26 };
}

// ch19 晶圓測試、探針卡與 3D KGD 條例總覽：五欄側視示意。技術審查修正：不用欄距暗示節距，探針疏密只做定性示意；
// 每格只放一個節距與一個針數（取自正文表格）；懸臂式的節距尚待查證，不標；內建自我測試畫成晶粒內的一塊電路區塊；不放 Cobra 等商用名稱
function probeCards(spec, en, kit) {
  const { L, t, para, lines, breakAt } = tools(spec, en, kit);
  const cw = 114, gap = (608 - 5 * cw) / 4, y0 = 12;
  const cols = [
    ['watCard', [['kelvin', INK, 600], ['pcm', TEAL, 600], ['pinsW', INK_2, 400]]],
    ['cantilever', [['scrub', INK, 600, '較大'], ['wbPad', TEAL, 600], ['pinsC', INK_2, 400]]],
    ['vertName', [['buckled', INK, 600], ['flipBump', TEAL, 600], ['pitchV', INK, 700], ['pinsV', INK_2, 400]]],
    ['memsName', [['memsNeedle', INK, 600], ['ubump', TEAL, 600], ['pitchM', INK, 700], ['pinsM', INK_2, 400]]],
    ['preBond', [['bondPad', INK, 600], ['noProbe', RED, 700], ['sacrificial', AMBER, 600], ['bist', TEAL, 600]]]
  ];
  const name = k => k === 'vertName' && en ? `${L('vertName')} / ${L('pogo')}` : L(k);
  const text = k => k === 'noProbe' ? (en ? `${L('noProbe')}: ${L('prohibited')}` : `${L('prohibited')}${L('noProbe')}`) : L(k);
  const head = (x, y, k) => k === 'vertName' ? breakAt(x, y, name(k), '彈簧', cw - 10, 11, INK, 'middle', 700) : para(x, y, name(k), cw - 10, 11, INK, 'middle', 700);
  const th = Math.max(...cols.map(([k]) => head(0, 0, k).height));
  const ya = y0 + 12 + th + 4;
  const bar = x => `<rect x="${x + 10}" y="${ya + 2}" width="94" height="10" rx="2" fill="${INK_2}"/>`;
  const wafer = x => `<rect x="${x + 6}" y="${ya + 80}" width="102" height="12" fill="${SI}" stroke="${INK_2}"/>`;
  const die = (x, x1, x2, y = ya + 66, h = 14) => `<rect x="${x + x1}" y="${y}" width="${x2 - x1}" height="${h}" fill="${DIE_C}" stroke="${INK_2}"/>`;
  const art = [
    // 切割道上的測試鍵和晶粒表面同高；兩組 Force/Sense 探針各落在一個測試鍵上
    x => bar(x) + wafer(x) + die(x, 8, 106) + `<path d="M${x + 48} ${ya + 66} v14 M${x + 66} ${ya + 66} v14" stroke="${MUTED}" stroke-dasharray="2 2"/>`
      + `<rect x="${x + 50}" y="${ya + 63}" width="6" height="3" fill="${COPPER}" stroke="${RED}" stroke-width=".5"/><rect x="${x + 58}" y="${ya + 63}" width="6" height="3" fill="${COPPER}" stroke="${RED}" stroke-width=".5"/>`
      + `<path d="M${x + 30} ${ya + 12} L${x + 52} ${ya + 63} M${x + 40} ${ya + 12} L${x + 54.5} ${ya + 63} M${x + 74} ${ya + 12} L${x + 59.5} ${ya + 63} M${x + 84} ${ya + 12} L${x + 62} ${ya + 63}" stroke="${INK}" stroke-width="1.2"/>`,
    x => bar(x) + wafer(x) + die(x, 22, 92) + `<path d="M${x + 12} ${ya + 12} h20 v12 h-20 z M${x + 82} ${ya + 12} h20 v12 h-20 z" fill="${AMBER_L}" stroke="${AMBER}"/>`
      + `<path d="M${x + 30} ${ya + 24} L${x + 42} ${ya + 58} L${x + 43} ${ya + 64} M${x + 84} ${ya + 24} L${x + 72} ${ya + 58} L${x + 71} ${ya + 64}" fill="none" stroke="${INK}" stroke-width="1.4"/>`
      + `<rect x="${x + 34}" y="${ya + 64}" width="14" height="3" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".6"/><rect x="${x + 66}" y="${ya + 64}" width="14" height="3" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".6"/><path d="M${x + 37} ${ya + 65.5} h9 M${x + 68} ${ya + 65.5} h9" stroke="${INK}" stroke-width="1.3"/>`,
    x => bar(x) + wafer(x) + die(x, 16, 98, ya + 70, 10) + `<rect x="${x + 14}" y="${ya + 22}" width="86" height="3" fill="${MUTED}"/><rect x="${x + 14}" y="${ya + 48}" width="86" height="3" fill="${MUTED}"/>`
      + [30, 44, 58, 72, 86].map(dx => `<path d="M${x + dx} ${ya + 12} V${ya + 22} C${x + dx + 5} ${ya + 32} ${x + dx - 5} ${ya + 38} ${x + dx} ${ya + 48} V${ya + 62}" fill="none" stroke="${INK}" stroke-width="1.3"/><circle cx="${x + dx}" cy="${ya + 66}" r="4" fill="#e2e8f0" stroke="${INK_2}"/>`).join(''),
    x => bar(x) + wafer(x) + die(x, 16, 98, ya + 70, 10) + `<rect x="${x + 18}" y="${ya + 30}" width="78" height="2.5" fill="${MUTED}"/>`
      + Array.from({ length: 10 }, (_, i) => { const dx = 25 + i * 7.2; return `<path d="M${x + dx} ${ya + 12} V${ya + 30} L${x + dx + 1.5} ${ya + 66}" fill="none" stroke="${INK}" stroke-width=".9"/><circle cx="${x + dx + 1.5}" cy="${ya + 68}" r="2" fill="#e2e8f0" stroke="${INK_2}" stroke-width=".7"/>`; }).join(''),
    x => bar(x) + wafer(x) + die(x, 8, 106, ya + 62, 18) + [26, 40, 54, 68].map(dx => `<rect x="${x + dx}" y="${ya + 62}" width="8" height="3" fill="${COPPER}" stroke="${RED}" stroke-width=".5"/>`).join('')
      + `<rect x="${x + 86}" y="${ya + 57}" width="14" height="5" fill="${AMBER_L}" stroke="${AMBER}"/><path d="M${x + 93} ${ya + 12} V${ya + 57}" stroke="${INK}" stroke-width="1.4"/>`
      + `<path d="M${x + 44} ${ya + 12} V${ya + 50}" stroke="${INK}" stroke-width="1.4"/><circle cx="${x + 44}" cy="${ya + 34}" r="9" fill="none" stroke="${RED}" stroke-width="2"/><path d="M${x + 37.6} ${ya + 40.4} L${x + 50.4} ${ya + 27.6}" stroke="${RED}" stroke-width="2"/>`
      + `<rect x="${x + 14}" y="${ya + 68}" width="40" height="9" rx="2" fill="${TEAL_L}" stroke="${TEAL}"/>`
  ];
  // 第五格的說明靠左，前面放與圖上構件同色的小圖示：銅墊、禁止下針、犧牲測試墊、內建自我測試
  const glyph = [
    (gx, gy) => `<rect x="${gx}" y="${gy - 6}" width="8" height="3" fill="${COPPER}" stroke="${RED}" stroke-width=".5"/>`,
    (gx, gy) => `<circle cx="${gx + 4}" cy="${gy - 4}" r="4" fill="none" stroke="${RED}" stroke-width="1.3"/><path d="M${gx + 1.2} ${gy - 1.2} L${gx + 6.8} ${gy - 6.8}" stroke="${RED}" stroke-width="1.3"/>`,
    (gx, gy) => `<rect x="${gx}" y="${gy - 7}" width="8" height="4" fill="${AMBER_L}" stroke="${AMBER}"/>`,
    (gx, gy) => `<rect x="${gx}" y="${gy - 8}" width="8" height="6" rx="1" fill="${TEAL_L}" stroke="${TEAL}"/>`
  ];
  // 帶千分位的針數不從逗號斷開：數字一行、pins 一行
  const row = (x, y, [k, c, w, at], i, col) => {
    const s = text(k), cut = s.includes(',') ? s.lastIndexOf(' ') : -1;
    if (cut > 0) return lines(x + cw / 2, y, [s.slice(0, cut), s.slice(cut + 1)], 10.5, c, 'middle', w);
    if (col === 4) return k === 'bondPad' ? breakAt(x + 18, y, s, '混合', cw - 22, 10.5, c, 'start', w) : para(x + 18, y, s, cw - 22, 10.5, c, 'start', w);
    return at ? breakAt(x + cw / 2, y, s, at, cw - 12, 10.5, c, 'middle', w) : para(x + cw / 2, y, s, cw - 12, 10.5, c, 'middle', w);
  };
  const texts = cols.map(([, rows], col) => rows.reduce((a, r, i) => a + row(0, 0, r, i, col).height + 3, 0));
  const cardH = ya + 100 + Math.max(...texts) - y0 + 2;
  let svg = '';
  cols.forEach(([nm, rows], col) => {
    const x = 16 + col * (cw + gap);
    svg += card(x, y0, cw, cardH) + head(x + cw / 2, y0 + 18, nm).svg + art[col](x);
    let yy = ya + 110;
    rows.forEach((r, i) => { const p = row(x, yy, r, i, col); svg += (col === 4 ? glyph[i](x + 7, yy) : '') + p.svg; yy += p.height + 3; });
  });
  return { svg, height: y0 + cardH + 8 };
}

// ch20 傳統封裝的流程：九步依序，每格一張小圖（第 9 步「檢查」正文沒有細節，只放圖示；晶背研磨不畫保護膠膜，以免跨段取材）
function packagingFlow(spec, en, kit) {
  const { L, t, para, breakAt, arrow, icon } = tools(spec, en, kit);
  const cw = 194, gx = (608 - 3 * cw) / 2, aw = 78, tw = cw - aw - 10, y0 = 12, gy = 24;
  const steps = [['backgrind', 'backgrindHow'], ['dicing', 'dicingHow', 'stealth', 'stealthHow', 'stealthSplit'], ['attach', 'attachHow'], ['wire', 'wireHow'], ['mold', 'moldHow'], ['mark', 'markHow'], ['ball', 'ballHow'], ['sing', 'singHow'], ['inspect']];
  const style = [[11.5, INK, 700], [10, INK_2, 400], [10.5, TEAL, 700], [10, INK_2, 400], [10, INK_2, 400]];
  const ZH_BREAK = { dicingHow: '鑽石刀', attachHow: '只挑出' };
  const block = (x, y, keys) => { let yy = y, out = ''; keys.forEach((k, i) => { const [s, c, w] = style[i]; if (i === 2) yy += 4; const p = ZH_BREAK[k] ? breakAt(x, yy, L(k), ZH_BREAK[k], tw, s, c, 'start', w) : para(x, yy, L(k), tw, s, c, 'start', w); out += p.svg; yy += p.height + (i === 0 ? 1 : 0); }); return { svg: out, h: yy - y }; };
  const pkgBody = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${INK_2}"/>`;
  const art = [
    (ax, ay) => `<rect x="${ax + 4}" y="${ay + 18}" width="62" height="12" fill="none" stroke="${MUTED}" stroke-dasharray="3 2"/><rect x="${ax + 4}" y="${ay + 30}" width="62" height="12" fill="#e2e8f0" stroke="${INK_2}"/>`
      + [10, 22, 34, 46, 58].map(d => `<rect x="${ax + d - 3}" y="${ay + 42}" width="7" height="2.5" fill="${TEAL}"/>`).join('') + hatched(ax + 14, ay + 2, 42, 10, '#cbd5e1', INK_2) + arrow(ax + 35, ay + 12, ax + 35, ay + 20, INK_2, 1.3),
    // 左：刀片沿切割道切開；右：隱形切割，雷射聚焦在晶圓內部打出改質層，再把膠膜往兩邊撐開
    (ax, ay) => `<rect x="${ax + 2}" y="${ay + 28}" width="30" height="9" fill="#e2e8f0" stroke="${INK_2}"/><path d="M${ax + 17} ${ay + 28} v9" stroke="#ffffff" stroke-width="2"/><rect x="${ax}" y="${ay + 37}" width="34" height="3" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".7"/>`
      + `<circle cx="${ax + 17}" cy="${ay + 17}" r="9" fill="#e2e8f0" stroke="${INK_2}" stroke-width="1.2"/><circle cx="${ax + 17}" cy="${ay + 17}" r="1.8" fill="${INK_2}"/>`
      + `<rect x="${ax + 40}" y="${ay + 28}" width="30" height="9" fill="#e2e8f0" stroke="${INK_2}"/><path d="M${ax + 49} ${ay + 6} L${ax + 55} ${ay + 32} L${ax + 61} ${ay + 6}" fill="${PINK_L}" fill-opacity=".7" stroke="#dc2626" stroke-width=".9"/><path d="M${ax + 55} ${ay + 30} v5" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="1.5 1"/>`
      + `<rect x="${ax + 38}" y="${ay + 37}" width="34" height="3" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".7"/>` + arrow(ax + 51, ay + 46, ax + 40, ay + 46, BLUE, 1.1) + arrow(ax + 59, ay + 46, ax + 70, ay + 46, BLUE, 1.1),
    (ax, ay) => `<circle cx="${ax + 16}" cy="${ay + 22}" r="15" fill="#ffffff" stroke="${INK_2}"/>` + [[-7, -7], [0, -7], [7, -7], [-7, 0], [0, 0], [7, 0], [-7, 7], [0, 7], [7, 7]].map(([dx, dy], i) => `<rect x="${ax + 13 + dx}" y="${ay + 19 + dy}" width="6" height="6" fill="${i === 4 ? '#fecaca' : TEAL_L}" stroke="${i === 4 ? RED : TEAL}" stroke-width=".6"/>`).join('')
      + arrow(ax + 33, ay + 24, ax + 44, ay + 30, INK_2, 1.2) + `<rect x="${ax + 38}" y="${ay + 40}" width="32" height="6" fill="${SI}" stroke="${INK_2}"/><rect x="${ax + 46}" y="${ay + 32}" width="16" height="8" fill="${TEAL_L}" stroke="${TEAL}"/>`,
    (ax, ay) => `<rect x="${ax + 2}" y="${ay + 40}" width="66" height="8" fill="${SI}" stroke="${INK_2}"/><rect x="${ax + 20}" y="${ay + 28}" width="30" height="12" fill="${TEAL_L}" stroke="${TEAL}"/><path d="M${ax + 23} ${ay + 28} q-10 -14 -17 12 M${ax + 47} ${ay + 28} q10 -14 17 12" fill="none" stroke="${AMBER}" stroke-width="1.4"/>`,
    (ax, ay) => `<rect x="${ax + 2}" y="${ay + 40}" width="66" height="8" fill="${SI}" stroke="${INK_2}"/><rect x="${ax + 2}" y="${ay + 14}" width="66" height="26" rx="2" fill="${INK_2}"/><rect x="${ax + 20}" y="${ay + 28}" width="30" height="12" fill="none" stroke="${TEAL_L}" stroke-dasharray="2 2"/>`,
    (ax, ay) => pkgBody(ax + 8, ay + 22, 54, 26) + `<rect x="${ax + 14}" y="${ay + 29}" width="26" height="3" fill="#ffffff"/><rect x="${ax + 14}" y="${ay + 37}" width="18" height="3" fill="#ffffff"/><path d="M${ax + 56} ${ay + 2} L${ax + 42} ${ay + 30}" stroke="#dc2626" stroke-width="1.6"/>`,
    (ax, ay) => pkgBody(ax + 2, ay + 20, 30, 14) + [8, 17, 26].map(d => `<circle cx="${ax + d}" cy="${ay + 37.5}" r="3.4" fill="#e2e8f0" stroke="${INK_2}"/>`).join('')
      + pkgBody(ax + 42, ay + 20, 24, 14) + `<path d="M${ax + 42} ${ay + 27} h-4 v10 h-3 M${ax + 66} ${ay + 27} h4 v10 h3" fill="none" stroke="${AMBER}" stroke-width="2"/>`,
    (ax, ay) => `<rect x="${ax + 2}" y="${ay + 34}" width="66" height="8" fill="${SI}" stroke="${INK_2}"/>` + [4, 26, 48].map(d => pkgBody(ax + d + 1, ay + 22, 18, 12)).join('') + `<path d="M${ax + 24.5} ${ay + 16} V${ay + 46} M${ax + 46.5} ${ay + 16} V${ay + 46}" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3 2"/>`,
    (ax, ay) => pkgBody(ax + 8, ay + 30, 30, 14) + icon('search', ax + 30, ay + 2, 32, TEAL)
  ];
  const rows = [0, 1, 2].map(r => steps.slice(r * 3, r * 3 + 3));
  const rowH = rows.map(row => Math.max(62, ...row.map(keys => block(0, 0, keys).h + 18)));
  let svg = '', y = y0;
  rows.forEach((row, r) => {
    row.forEach((keys, c) => {
      const x = 16 + c * (cw + gx), i = r * 3 + c;
      const b = block(x + aw + 4, y + 18, keys);
      svg += card(x, y, cw, rowH[r]) + art[i](x + 4, y + (rowH[r] - 50) / 2 - 2) + b.svg;
      if (c < 2) svg += arrow(x + cw + 1, y + rowH[r] / 2, x + cw + gx - 1, y + rowH[r] / 2);
    });
    if (r < 2) {
      const from = 16 + 2 * (cw + gx) + cw / 2, to = 16 + cw / 2, yb = y + rowH[r];
      svg += `<path d="M${from} ${yb} V${yb + gy / 2} H${to} V${yb + gy - 3}" fill="none" stroke="${TEAL}" stroke-width="1.5"/>` + arrow(to, yb + gy - 8, to, yb + gy - 1);
    }
    y += rowH[r] + gy;
  });
  return { svg, height: y - gy + 8 };
}

// ch20 覆晶：上段是打線與覆晶的連接路徑與接點位置（橘色路徑都從晶粒內同一位置的電路出發、終點都在基板頂面）；
// 下段是三種覆晶凸塊的特寫與正文表格的接點間距（技術審查修正：微凸塊由晶粒焊墊往下依序為銅、鎳、錫銀焊帽，下方承接面不是有機基板；間距色條錯開兩列，顯示 40–55 µm 重疊）
function flipChipBumps(spec, en, kit) {
  const { L, t, para, lead } = tools(spec, en, kit);
  const y0 = 12, PATH = '#ea580c', SOLDER = '#e2e8f0';
  let svg = t(164, y0 + 22, L('wb'), 13, INK, 'middle', 700) + t(476, y0 + 22, L('fc'), 13, INK, 'middle', 700);
  // 左：打線，焊墊在晶粒周邊，金屬線拱到基板
  const ys = y0 + 40;
  svg += `<rect x="34" y="${ys + 66}" width="196" height="16" fill="${SI}" stroke="${INK_2}"/>` + t(132, ys + 78, L('substrate'), 10, INK, 'middle')
    + `<rect x="80" y="${ys + 34}" width="104" height="30" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="80" y="${ys + 34}" width="104" height="2.5" fill="${MUTED}"/><rect x="80" y="${ys + 64}" width="104" height="2" fill="${AL}"/><rect x="146" y="${ys + 37}" width="16" height="7" fill="${INK_2}"/>`
    + `<rect x="82" y="${ys + 32}" width="8" height="2" fill="${AMBER}"/><rect x="174" y="${ys + 32}" width="8" height="2" fill="${AMBER}"/><rect x="40" y="${ys + 64}" width="10" height="2" fill="${AMBER}"/><rect x="214" y="${ys + 64}" width="10" height="2" fill="${AMBER}"/>`
    + `<path d="M86 ${ys + 32} Q60 ${ys + 4} 45 ${ys + 64} M178 ${ys + 32} Q204 ${ys + 4} 219 ${ys + 64}" fill="none" stroke="${AMBER}" stroke-width="1.6"/>`
    + `<path d="M162 ${ys + 40} H178 V${ys + 33} Q204 ${ys + 4} 219 ${ys + 64} V${ys + 66}" fill="none" stroke="${PATH}" stroke-width="3" stroke-opacity=".8"/>`;
  // 右：覆晶，晶粒翻過來正面朝下，凸塊布滿整面直接焊到基板，基板底部再以錫球接電路板
  svg += `<rect x="338" y="${ys + 72}" width="180" height="10" fill="#dcfce7" stroke="${GREEN}"/><rect x="346" y="${ys + 44}" width="164" height="16" fill="${SI}" stroke="${INK_2}"/>`
    + [0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${358 + i * 23.3}" cy="${ys + 66}" r="5.2" fill="${SOLDER}" stroke="${INK_2}"/>`).join('')
    + `<path d="M372 ${ys + 44} L378 ${ys + 32} H478 L484 ${ys + 44} Z" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".8"/>`
    + Array.from({ length: 9 }, (_, i) => `<rect x="${382 + i * 11}" y="${ys + 32}" width="7" height="12" rx="3" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".8"/>`).join('')
    + `<rect x="378" y="${ys + 8}" width="100" height="24" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="378" y="${ys + 30}" width="100" height="2" fill="${MUTED}"/><rect x="454" y="${ys + 20}" width="16" height="9" fill="${INK_2}"/>`
    + `<path d="M462 ${ys + 24} V${ys + 44}" fill="none" stroke="${PATH}" stroke-width="3" stroke-opacity=".8"/>`;
  svg += lead(476, ys + 31, 524, ys + 13) + t(528, ys + 16, L('faceDown'), 10, INK, 'start', 600) + lead(482, ys + 40, 524, ys + 32) + t(528, ys + 36, L('underfill'), 10, AMBER, 'start', 600)
    + lead(510, ys + 52, 524, ys + 54) + t(528, ys + 57, L('substrate'), 10, INK, 'start') + lead(518, ys + 77, 524, ys + 77) + t(528, ys + 80, L('board'), 10, GREEN, 'start');
  // 接點位置：周邊一圈與布滿整面（俯視）
  const yv = ys + 96;
  svg += `<rect x="48" y="${yv}" width="40" height="40" fill="${TEAL_L}" stroke="${TEAL}"/>` + [0, 1, 2, 3, 4].flatMap(i => [[52 + i * 7.4, yv + 3], [52 + i * 7.4, yv + 33], [51, yv + 4 + i * 7.4], [81, yv + 4 + i * 7.4]]).map(([x, y]) => `<rect x="${x}" y="${y}" width="4" height="4" fill="${AMBER}"/>`).join('');
  svg += `<rect x="348" y="${yv}" width="40" height="40" fill="${TEAL_L}" stroke="${TEAL}"/>` + Array.from({ length: 25 }, (_, k) => `<circle cx="${354 + (k % 5) * 7}" cy="${yv + 6 + Math.floor(k / 5) * 7}" r="2.2" fill="${BLUE}"/>`).join('');
  const area = para(400, yv + 14, L('area'), 212, 10.5, INK, 'start', 600);
  let yr = yv + 14 + area.height + 4;
  const short = para(424, yr, L('shorter'), 188, 10.5, PATH, 'start', 700);
  svg += area.svg + `<path d="M400 ${yr - 4} h18" stroke="${PATH}" stroke-width="3" stroke-opacity=".8"/>` + short.svg;
  yr = Math.max(yr + short.height, yv + 46) + 4;
  const bumpLine = para(362, yr, `${L('bumps')}${en ? ': ' : '：'}${L('bumpsDo')}`, 250, 10, BLUE, 'start'), ballLine = para(362, yr + bumpLine.height + 2, `${L('balls')}${en ? ': ' : '：'}${L('ballsDo')}`, 250, 10, INK_2, 'start');
  svg += `<rect x="349" y="${yr - 9}" width="6" height="10" rx="2.5" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".8"/><circle cx="352" cy="${yr + bumpLine.height - 2}" r="4.2" fill="${SOLDER}" stroke="${INK_2}"/>` + bumpLine.svg + ballLine.svg;
  const topH = yr + bumpLine.height + ballLine.height + 2 - y0;
  svg = card(16, y0, 296, topH) + card(328, y0, 296, topH) + svg;
  // 下段：三種凸塊特寫（大小只示意排序）
  const y1 = y0 + topH + 16, bw = 196;
  const cells = [[16, 'c4', 'selfAlign'], [222, 'pillar', 'noCollapse'], [428, 'micro', 'tcb']];
  const th = Math.max(...cells.map(([, a, b]) => para(0, 0, L(a), bw - 16, 10.5, INK, 'middle', 700).height + para(0, 0, L(b), bw - 16, 10, INK_2).height));
  const ch = 106 + th + 4;
  const swatch = [[SOLDER, INK_2], [COPPER, RED], [TEAL_L, TEAL]];
  cells.forEach(([x, a, b], i) => {
    svg += card(x, y1, bw, ch) + `<rect x="${x + 10}" y="${y1 + 10}" width="22" height="9" rx="2" fill="${swatch[i][0]}" stroke="${swatch[i][1]}"/>`;
    const cx = x + bw / 2, yb = y1 + 22;
    const top = (w = 100) => `<rect x="${cx - w / 2}" y="${yb}" width="${w}" height="20" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${cx - 12}" y="${yb + 20}" width="24" height="3" fill="${AL}" stroke="${INK_2}" stroke-width=".6"/>`;
    if (i === 0) svg += top() + `<ellipse cx="${cx}" cy="${yb + 36}" rx="17" ry="13" fill="${SOLDER}" stroke="${INK_2}"/><rect x="${cx - 14}" y="${yb + 49}" width="28" height="3" fill="${AL}" stroke="${INK_2}" stroke-width=".6"/><rect x="${cx - 58}" y="${yb + 52}" width="116" height="16" fill="${SI}" stroke="${INK_2}"/>`;
    if (i === 1) svg += top() + `<rect x="${cx - 10}" y="${yb + 23}" width="20" height="20" fill="${COPPER}" stroke="${RED}" stroke-width=".8"/><path d="M${cx - 10} ${yb + 43} h20 v3 q-10 4 -20 0 z" fill="${SOLDER}" stroke="${INK_2}"/><rect x="${cx - 12}" y="${yb + 49}" width="24" height="3" fill="${AL}" stroke="${INK_2}" stroke-width=".6"/><rect x="${cx - 58}" y="${yb + 52}" width="116" height="16" fill="${SI}" stroke="${INK_2}"/>`
      + lead(cx + 10, yb + 45, cx + 29, yb + 33) + para(cx + 32, yb + 32, L('cap'), 62, 9.5, INK_2, 'start').svg;
    if (i === 2) svg += `<rect x="${cx - 44}" y="${yb - 14}" width="88" height="9" rx="2" fill="${MUTED}"/>` + [-20, 0, 20].map(d => `<path d="M${cx + d} ${yb - 4} v3" stroke="${RED}" stroke-width="1.4"/>`).join('')
      + `<rect x="${cx - 44}" y="${yb}" width="88" height="18" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${cx - 8}" y="${yb + 18}" width="16" height="2" fill="${AL}"/><rect x="${cx - 6}" y="${yb + 20}" width="12" height="9" fill="${COPPER}" stroke="${RED}" stroke-width=".6"/><rect x="${cx - 6}" y="${yb + 29}" width="12" height="3" fill="#94a3b8"/><rect x="${cx - 6}" y="${yb + 32}" width="12" height="6" rx="2" fill="${SOLDER}" stroke="${INK_2}" stroke-width=".6"/><rect x="${cx - 8}" y="${yb + 38}" width="16" height="2" fill="${AL}"/><rect x="${cx - 44}" y="${yb + 40}" width="88" height="18" fill="${TEAL_L}" stroke="${TEAL}"/>`
      + [['cu', 24.5, 20], ['ni', 30.5, 31], ['snag', 35, 42]].map(([k, dy, ly]) => lead(cx + 6, yb + dy, cx + 50, yb + ly - 3) + t(cx + 53, yb + ly, L(k), 9.5, INK_2, 'start')).join('');
    const p1 = para(cx, y1 + 106, L(a), bw - 16, 10.5, INK, 'middle', 700);
    svg += p1.svg + para(cx, y1 + 106 + p1.height, L(b), bw - 16, 10, INK_2).svg;
  });
  // 間距尺：對數刻度，三種範圍錯開兩列
  const y2 = y1 + ch + 26, X = v => 150 + (Math.log10(v) - Math.log10(8)) / (Math.log10(260) - Math.log10(8)) * 466;
  svg += t(16, y2 + 18, L('pitch'), 11, INK, 'start', 700);
  svg += [[10, 't10'], [100, 't100']].map(([v, k]) => `<path d="M${X(v)} ${y2 - 6} V${y2 + 62}" stroke="${LINE}" stroke-dasharray="3 3"/>` + t(X(v), y2 + 76, L(k), 9.5, MUTED, 'middle', 600)).join('') + `<path d="M150 ${y2 + 62} H616" stroke="${INK_2}"/>`;
  const bar = (v1, v2, y, fill, stroke, k, above) => `<rect x="${X(v1)}" y="${y}" width="${X(v2) - X(v1)}" height="12" rx="3" fill="${fill}" stroke="${stroke}"/>` + t((X(v1) + X(v2)) / 2, above ? y - 4 : y + 24, L(k), 9.5, INK_2);
  svg += bar(130, 200, y2 + 14, SOLDER, INK_2, 'r1', true) + bar(40, 100, y2 + 14, COPPER, RED, 'r2', true) + bar(10, 55, y2 + 30, TEAL_L, TEAL, 'r3');
  // 色條旁直接寫凸塊名稱，不必靠卡片角落的色塊對應
  svg += t(X(130) - 4, y2 + 24, L('barC4'), 9.5, INK, 'end', 700) + t(X(40) - 4, y2 + 24, L('barPillar'), 9.5, INK, 'end', 700) + t(X(55) + 4, y2 + 40, L('barMicro'), 9.5, INK, 'start', 700);
  return { svg, height: y2 + 84 };
}

// ch20 傳統與晶圓級封裝六大條例總覽：六格側剖面（技術審查修正：導線架無引腳封裝的晶粒放在中央裸露散熱墊上、細線打到周邊焊墊；
// 系統級封裝的共形屏蔽只罩住晶片區，天線放在屏蔽之外的模組邊緣）。比例全為示意
function packageFamilies(spec, en, kit) {
  const { L, t, para, dim, lead } = tools(spec, en, kit);
  const cw = 196, gx = 10, y0 = 12, MOLD = INK_2, PCB = '#dcfce7';
  const cells = [['leaded', ['gullWing', 'throughHole']], ['leadless', ['thermalPad', 'lands']], ['array', ['bga', 'lga']], ['wlcsp', ['rdl', 'ubm', 'oneToOne']], ['stacking', ['daf', 'pop']], ['sip', ['shield', 'antenna', 'bothSides']]];
  const th = Math.max(...cells.map(([k]) => para(0, 0, L(k), cw - 14, 11, INK, 'middle', 700).height));
  const labH = Math.max(...cells.map(([, ks]) => ks.reduce((h, k) => h + para(0, 0, L(k), cw - 24, 10, INK_2, 'start').height + 2, 0)));
  const chh = 12 + th + 84 + labH + 10;
  const ball = (x, y, r = 3.6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#e2e8f0" stroke="${INK_2}"/>`;
  const art = [
    (ax, ay) => `<rect x="${ax}" y="${ay + 64}" width="118" height="6" fill="${PCB}" stroke="${GREEN}"/><rect x="${ax + 26}" y="${ay + 34}" width="66" height="22" rx="2" fill="${MOLD}"/><rect x="${ax + 46}" y="${ay + 42}" width="26" height="7" fill="none" stroke="${TEAL_L}" stroke-dasharray="2 2"/>`
      + `<path d="M${ax + 26} ${ay + 46} h-7 v17 h-9 M${ax + 92} ${ay + 46} h7 v17 h9" fill="none" stroke="${AMBER}" stroke-width="2.2"/>`
      + `<rect x="${ax + 130}" y="${ay + 30}" width="44" height="16" rx="2" fill="${MOLD}"/><rect x="${ax + 124}" y="${ay + 64}" width="56" height="6" fill="${PCB}" stroke="${GREEN}"/>` + [136, 147, 158, 169].map(d => `<path d="M${ax + d} ${ay + 46} V${ay + 76}" stroke="${AMBER}" stroke-width="2"/>`).join(''),
    (ax, ay) => `<rect x="${ax}" y="${ay + 64}" width="180" height="6" fill="${PCB}" stroke="${GREEN}"/><rect x="${ax + 30}" y="${ay + 38}" width="120" height="24" rx="2" fill="${MOLD}"/>`
      + `<rect x="${ax + 62}" y="${ay + 56}" width="56" height="6" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/><rect x="${ax + 30}" y="${ay + 57}" width="14" height="5" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/><rect x="${ax + 136}" y="${ay + 57}" width="14" height="5" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/>`
      + `<rect x="${ax + 70}" y="${ay + 48}" width="40" height="8" fill="${TEAL_L}" stroke="${TEAL}"/><path d="M${ax + 72} ${ay + 48} q-16 -8 -35 9 M${ax + 108} ${ay + 48} q16 -8 35 9" fill="none" stroke="${AMBER_L}" stroke-width="1.2"/>`,
    (ax, ay) => `<rect x="${ax + 18}" y="${ay + 44}" width="144" height="10" fill="${AMBER_XL}" stroke="${AMBER}"/><path d="M${ax + 18} ${ay + 47.5} h144 M${ax + 18} ${ay + 51} h144" stroke="${AMBER}" stroke-width=".5"/><rect x="${ax + 60}" y="${ay + 30}" width="60" height="12" fill="${TEAL_L}" stroke="${TEAL}"/>`
      + Array.from({ length: 8 }, (_, i) => `<circle cx="${ax + 64 + i * 7.4}" cy="${ay + 43}" r="1.5" fill="${BLUE}"/>`).join('') + [28, 41, 54, 67, 80].map(d => ball(ax + d, ay + 58.5)).join('')
      + `<path d="M${ax + 90} ${ay + 26} V${ay + 66}" stroke="${MUTED}" stroke-dasharray="3 2"/>` + [98, 111, 124, 137, 150].map(d => `<rect x="${ax + d - 4}" y="${ay + 54}" width="8" height="3" fill="${COPPER}" stroke="${RED}" stroke-width=".6"/>`).join(''),
    (ax, ay) => `<rect x="${ax + 40}" y="${ay + 28}" width="100" height="20" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${ax + 40}" y="${ay + 48}" width="100" height="4" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".7"/>`
      + [52, 72, 92, 112, 128].map(d => `<rect x="${ax + d - 4}" y="${ay + 52}" width="8" height="2" fill="${MUTED}"/>` + ball(ax + d, ay + 58.5, 4.2)).join('')
      + `<rect x="${ax + 38}" y="${ay + 24}" width="104" height="40" fill="none" stroke="${INK}" stroke-dasharray="3 2"/>` + dim(ax + 40, ay + 16, ax + 140, ay + 16, INK),
    (ax, ay) => `<rect x="${ax + 2}" y="${ay + 62}" width="88" height="8" fill="${AMBER_XL}" stroke="${AMBER}"/>` + [0, 1, 2, 3].map(i => `<rect x="${ax + 10 + i * 8}" y="${ay + 56 - i * 10}" width="54" height="5" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".7"/><rect x="${ax + 10 + i * 8}" y="${ay + 61 - i * 10}" width="54" height="${i ? 5 : 1}" fill="${AMBER_L}"/><path d="M${ax + 12 + i * 8} ${ay + 56 - i * 10} q-${6 + i * 4} -2 -${8 + i * 6} ${6 + i * 10}" fill="none" stroke="${AMBER}" stroke-width=".9"/>`).join('')
      + `<rect x="${ax + 104}" y="${ay + 46}" width="72" height="14" rx="2" fill="${MOLD}"/><rect x="${ax + 104}" y="${ay + 20}" width="72" height="14" rx="2" fill="${MOLD}"/>` + [110, 170].map(d => ball(ax + d, ay + 40, 4)).join('') + [114, 130, 146, 162].map(d => ball(ax + d, ay + 63.5, 3.2)).join(''),
    (ax, ay) => `<rect x="${ax + 8}" y="${ay + 40}" width="164" height="8" fill="${AMBER_XL}" stroke="${AMBER}"/><rect x="${ax + 100}" y="${ay + 42}" width="18" height="4" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".7"/><rect x="${ax + 13}" y="${ay + 20}" width="111" height="20" fill="#94a3b8" fill-opacity=".45"/><rect x="${ax + 18}" y="${ay + 26}" width="32" height="14" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${ax + 54}" y="${ay + 28}" width="24" height="12" fill="${BLUE_L}" stroke="${BLUE}"/><rect x="${ax + 82}" y="${ay + 30}" width="20" height="10" fill="${PINK_L}" stroke="${PINK}"/>`
      + [106, 114].map(d => `<rect x="${ax + d}" y="${ay + 34}" width="5" height="6" fill="${INK_2}"/>`).join('') + `<path d="M${ax + 13} ${ay + 40} V${ay + 20} H${ax + 124} V${ay + 40}" fill="none" stroke="${INK}" stroke-width="1.8"/>`
      + `<rect x="${ax + 136}" y="${ay + 34}" width="32" height="6" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/><path d="M${ax + 146} ${ay + 26} a6 6 0 0 1 12 0 M${ax + 142} ${ay + 22} a10 10 0 0 1 20 0" fill="none" stroke="${AMBER}" stroke-width="1.2"/>`
      + `<rect x="${ax + 30}" y="${ay + 48}" width="30" height="9" fill="${TEAL_L}" stroke="${TEAL}"/>` + [70, 80, 90].map(d => `<rect x="${ax + d}" y="${ay + 48}" width="5" height="6" fill="${INK_2}"/>`).join('')
  ];
  // 圖上的位置：每個標籤的引線終點（相對於小圖原點）
  // 圈字母位置（相對於小圖原點）；第三、四個數是引線指到的構件位置，沒有就不畫引線
  const anchors = { gullWing: [12, 60], throughHole: [158, 72], thermalPad: [90, 62], lands: [36, 62], bga: [20, 74, 28, 61], lga: [160, 68, 150, 57], rdl: [158, 44, 141, 50], ubm: [158, 64, 132, 53], oneToOne: [90, 14], daf: [26, 54], pop: [140, 40], shield: [68, 20], antenna: [152, 34], bothSides: [45, 57] };
  let svg = '';
  cells.forEach(([name, ks], i) => {
    const x = 16 + (i % 3) * (cw + gx), y = y0 + Math.floor(i / 3) * (chh + 12), ax = x + 8, ay = y + 8 + th;
    svg += card(x, y, cw, chh) + para(x + cw / 2, y + 20, L(name), cw - 14, 11, INK, 'middle', 700).svg + art[i](ax, ay);
    let yy = ay + 92;
    ks.forEach((k, j) => {
      const p = para(x + 22, yy, L(k), cw - 24, 10, INK_2, 'start');
      const [dx, dy, tx, ty] = anchors[k];
      if (tx !== undefined) svg += lead(ax + tx, ay + ty, ax + dx, ay + dy);
      svg += `<circle cx="${x + 13}" cy="${yy - 4}" r="5.5" fill="#ffffff" stroke="${TEAL}"/>` + t(x + 13, yy - 0.5, String.fromCharCode(97 + j), 8.5, TEAL, 'middle', 700)
        + `<circle cx="${ax + dx}" cy="${ay + dy}" r="5.5" fill="#ffffff" stroke="${TEAL}" fill-opacity=".9"/>` + t(ax + dx, ay + dy + 3.5, String.fromCharCode(97 + j), 8.5, TEAL, 'middle', 700) + p.svg;
      yy += p.height + 2;
    });
  });
  return { svg, height: y0 + 2 * chh + 12 + 8 };
}

// ch20 常見異常：一張打線封裝剖面標出五種異常的位置（取代原本只列「異常→結果」的方框圖，結果沿用正文表格）；
// 沖線在剖面看不出側向彎曲，另畫俯視小圖；底部填充屬覆晶結構，另畫覆晶小圖（技術審查修正：空洞的結果是散熱變差與可靠度問題兩項）
function packageDefects(spec, en, kit) {
  const { L, t, para, mark } = tools(spec, en, kit);
  const y0 = 12;
  let svg = card(16, y0, 356, 168);
  // 剖面：導線架或基板、晶粒、金屬線、封膠
  svg += `<rect x="32" y="${y0 + 34}" width="324" height="94" rx="3" fill="#cbd5e1" stroke="${INK_2}"/><rect x="36" y="${y0 + 128}" width="316" height="18" fill="${SI}" stroke="${INK_2}"/>`;
  svg += `<path d="M130 ${y0 + 96} H256 V${y0 + 115} L249 ${y0 + 124} H130 Z" fill="${TEAL_L}" stroke="${TEAL}"/><path d="M251 ${y0 + 121} l-9 -5 l-6 3 M253 ${y0 + 117} l-7 -2" fill="none" stroke="${RED}" stroke-width="1.2"/><rect x="126" y="${y0 + 124}" width="134" height="4" fill="${MUTED}"/>`;
  svg += `<rect x="134" y="${y0 + 94}" width="8" height="2" fill="${AMBER}"/><rect x="244" y="${y0 + 94}" width="8" height="2" fill="${AMBER}"/><rect x="50" y="${y0 + 126}" width="12" height="2" fill="${AMBER}"/><rect x="322" y="${y0 + 126}" width="12" height="2" fill="${AMBER}"/>`;
  svg += `<path d="M138 ${y0 + 94} Q92 ${y0 + 48} 56 ${y0 + 126}" fill="none" stroke="${AMBER}" stroke-width="1.6"/><path d="M328 ${y0 + 126} Q292 ${y0 + 48} 254 ${y0 + 84} q-3 3 -6 1" fill="none" stroke="${AMBER}" stroke-width="1.6"/>`;
  svg += `<rect x="146" y="${y0 + 92}" width="66" height="3.2" fill="#ffffff" stroke="${RED}" stroke-width=".7"/>` + [[196, 52, 6], [214, 62, 4.5], [184, 64, 3.5], [228, 48, 3]].map(([x, y, r]) => `<circle cx="${x}" cy="${y0 + y}" r="${r}" fill="#ffffff" stroke="${INK_2}" stroke-width=".8"/>`).join('');
  const pos = [['A', 268, 124], ['B', 238, 78], ['C', 86, 70], ['D', 170, 84], ['E', 246, 44]];
  svg += pos.map(([l, x, y]) => mark(x, y0 + y, l)).join('');
  // C：沖線俯視小圖；E：覆晶的底部填充小圖
  svg += card(388, y0, 236, 80) + card(388, y0 + 88, 236, 80);
  svg += `<rect x="440" y="${y0 + 22}" width="34" height="36" fill="${TEAL_L}" stroke="${TEAL}"/>` + [26, 34, 42, 50].map(d => `<rect x="398" y="${y0 + d - 1}" width="12" height="3" fill="${AMBER}"/>`).join('')
    + `<path d="M440 ${y0 + 26} H410 M440 ${y0 + 34} Q424 ${y0 + 40} 410 ${y0 + 34} M440 ${y0 + 42} Q426 ${y0 + 41} 410 ${y0 + 42} M440 ${y0 + 50} H410" fill="none" stroke="${AMBER}" stroke-width="1.3"/>`
    + `<circle cx="424" cy="${y0 + 39.5}" r="3" fill="none" stroke="${RED}" stroke-width="1.4"/>` + mark(400, y0 + 13, 'C') + `<path d="M426 ${y0 + 12} q6 8 0 14" fill="none" stroke="${BLUE}" stroke-width="1.4"/><path d="M423 ${y0 + 24} l3 3 l3 -4" fill="none" stroke="${BLUE}" stroke-width="1.4"/>`;
  svg += para(484, y0 + 26, L('sweepCause'), 132, 10, INK_2, 'start').svg;
  const fy = y0 + 104;
  svg += `<rect x="404" y="${fy + 34}" width="76" height="10" fill="${SI}" stroke="${INK_2}"/><path d="M402 ${fy + 34} L408 ${fy + 26} H476 L482 ${fy + 34} Z" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".8"/>`
    + [414, 424, 434, 444, 454, 464].map(x => `<rect x="${x - 2}" y="${fy + 26}" width="5" height="8" rx="2" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".6"/>`).join('')
    + `<rect x="408" y="${fy + 10}" width="68" height="16" fill="${TEAL_L}" stroke="${TEAL}"/><ellipse cx="448" cy="${fy + 30}" rx="5" ry="3" fill="#ffffff" stroke="${INK_2}" stroke-width=".8"/>` + mark(400, fy - 3, 'E');
  svg += para(492, fy + 14, L('voidCause'), 124, 10, INK_2, 'start').svg;
  // 下方：五種異常的名稱與結果
  const y1 = y0 + 188, w = 608 / 5;
  const items = [['A', 'chipping', 'chipRes'], ['B', 'nonStick', 'open'], ['C', 'sweep', 'short'], ['D', 'delam', 'reliab'], ['E', 'voids', 'voidRes']];
  let hMax = 0;
  items.forEach(([l, a, b], i) => {
    const x = 16 + i * w;
    const n = para(x + 22, y1, L(a), w - 26, 11, INK, 'start', 700), r = para(x + 22, y1 + n.height + 2, L(b), w - 26, 10.5, RED, 'start');
    svg += mark(x + 9, y1 - 4, l) + n.svg + r.svg;
    hMax = Math.max(hMax, n.height + r.height + 2);
  });
  return { svg, height: y1 + hMax + 4 };
}

// ch21 為什麼需要先進封裝：曝光範圍（虛線框依正文 26 × 33 的長寬比）限制晶粒大小、大晶粒容易被缺陷打中，
// 於是拆成幾顆小晶片，各用最適合的製程，再用先進封裝整合
function splitChip(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const y0 = 12;
  const ret = para(103, y0 + 16, L('reticle'), 176, 11, INK, 'middle', 700);
  const yb = y0 + 16 + ret.height + 2, w = 104, h = w * 33 / 26;
  let svg = ret.svg + `<rect x="51" y="${yb}" width="${w}" height="${h}" fill="#ffffff" stroke="${INK_2}" stroke-dasharray="5 3"/><rect x="55" y="${yb + 4}" width="${w - 8}" height="${h - 8}" fill="${TEAL_L}" stroke="${TEAL}"/>`;
  svg += [[14, 18], [62, 12], [34, 42], [78, 56], [20, 80], [64, 98], [44, 118]].map(([dx, dy]) => `<circle cx="${55 + dx}" cy="${yb + 4 + dy}" r="3" fill="${INK}"/>`).join('');
  const size = para(103, yb + h + 16, L('size'), 176, 11, INK_2, 'middle', 600), hitP = para(103, yb + h + 16 + size.height + 4, L('bigHit'), 176, 10.5, RED, 'middle');
  svg += size.svg + hitP.svg;
  // 右：拆成小晶片並排在封裝上，運算核心與記憶體之間大量搬運資料
  const sp = para(448, y0 + 16, L('split'), 340, 12, INK, 'middle', 700);
  const data = para(472, y0 + 16 + sp.height + 6, L('data'), 260, 10.5, BLUE, 'middle', 600);
  const ya = y0 + 16 + sp.height + 6 + data.height + 2;
  svg += sp.svg + data.svg + arrow(472, ya, 430, ya, BLUE, 3) + arrow(472, ya, 514, ya, BLUE, 3) + arrow(196, yb + h / 2, 262, yb + h / 2, TEAL, 2.4);
  const cy = ya + 12;
  const chips = [[276, 80, DIE_C, INK_2, 'analog', 'mature'], [362, 112, TEAL_L, TEAL, 'compute', 'advanced'], [480, 132, BLUE_L, BLUE, 'memory', 'dedicated']];
  const chH = Math.max(76, ...chips.map(([, cw, , , a, b]) => 22 + para(0, 0, L(a), cw - 10, 11, INK, 'middle', 700).height + 2 + para(0, 0, L(b), cw - 10, 10).height));
  chips.forEach(([x, cw, f, s, a, b]) => {
    svg += `<rect x="${x}" y="${cy}" width="${cw}" height="${chH}" rx="3" fill="${f}" stroke="${s}" stroke-width="1.3"/>`;
    const n = para(x + cw / 2, cy + 22, L(a), cw - 10, 11, INK, 'middle', 700);
    svg += n.svg + para(x + cw / 2, cy + 22 + n.height + 2, L(b), cw - 10, 10, INK_2).svg;
    svg += Array.from({ length: Math.floor(cw / 12) }, (_, i) => `<circle cx="${x + 8 + i * 12}" cy="${cy + chH + 2}" r="1.8" fill="${INK_2}"/>`).join('');
  });
  svg += `<rect x="268" y="${cy + chH + 4}" width="352" height="14" fill="${SI}" stroke="${INK_2}"/>`;
  let yy = cy + chH + 36;
  for (const k of ['best', 'tight', 'single']) { const p = para(444, yy, L(k), 350, k === 'single' ? 11.5 : 10.5, k === 'single' ? TEAL : INK_2, 'middle', k === 'single' ? 700 : 400); svg += p.svg; yy += p.height + 2; }
  return { svg, height: Math.max(yy, yb + h + 16 + size.height + 4 + hitP.height) + 4 };
}

// ch21 2.5D：四格同比例剖面，上方都是處理器與 HBM 並排，只改中間層（技術審查修正：複合載板那一格保留一片淡色的中介層，
// 變化畫在下方的 ABF 載板與 HDI 基板兩層，不讓晶片直接坐在 ABF 上）。取代原本四類方框圖，舊圖的特徵改用正文原句
function interposerTypes(spec, en, kit) {
  const { L, t, para } = tools(spec, en, kit);
  const y0 = 12, cw = 296, gx = 16;
  const head = para(320, y0 + 16, `${L('sideBySide')}${en ? '. ' : '；'}${L('notAlways')}`, 600, 11.5, INK, 'middle', 700);
  const basis = para(320, y0 + 16 + head.height + 2, L('basis'), 600, 10.5, MUTED, 'middle', 600);
  let svg = head.svg + basis.svg;
  const ly = y0 + 16 + head.height + basis.height + 8;
  svg += [[TEAL_L, TEAL, 'processor'], [BLUE_L, BLUE, 'hbm'], ['#e2e8f0', INK_2, 'pkgSub']].map(([f, s, k], i) => `<rect x="${150 + i * 124}" y="${ly - 10}" width="14" height="12" fill="${f}" stroke="${s}"/>` + t(170 + i * 124, ly, L(k), 10.5, INK_2, 'start')).join('');
  const cells = [['siName', [['siFull'], ['stitch'], ['tsv']]], ['rdlName', [['rdl']]], ['bridgeName', [['bridge']]], ['hybridName', [['abfHdi'], ['hybridStack']]]];
  const th = Math.max(...cells.map(([k]) => para(0, 0, L(k), cw - 16, 11, INK, 'middle', 700).height));
  const bridgeText = en ? `${L('bridgeEmbed')} ${L('bridgeWhere')}` : `${L('bridgeWhere')}${L('bridgeEmbed')}`;
  const rdlText = en ? `${L('rdlReplace')} ${L('rdlWith')}` : `${L('rdlWith')}${L('rdlReplace')}`;
  const stitchText = en ? `${L('stitch')}, ${L('larger')}` : `${L('stitch')}，${L('larger')}`;
  const featText = k => k === 'bridge' ? bridgeText : k === 'rdl' ? rdlText : k === 'stitch' ? stitchText : L(k);
  const fh = Math.max(...cells.map(([, fs]) => fs.reduce((h, [k]) => h + (k === 'abfHdi' ? 16 : para(0, 0, featText(k), cw - 20, 10, INK_2).height), 0)));
  const chh = 12 + th + 86 + fh + 8;
  const chipsOn = (x, y) => `<rect x="${x + 86}" y="${y}" width="124" height="24" fill="${TEAL_L}" stroke="${TEAL}"/>` + [26, 224].map(d => [0, 1, 2].map(k => `<rect x="${x + d}" y="${y + k * 8}" width="46" height="8" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".7"/>`).join('')).join('')
    + [[26, 72], [86, 210], [224, 270]].map(([a, b]) => Array.from({ length: Math.floor((b - a - 6) / 10) + 1 }, (_, i) => `<circle cx="${x + a + 4 + i * 10}" cy="${y + 26}" r="1.6" fill="${INK_2}"/>`).join('')).join('');
  const subst = (x, y) => `<rect x="${x + 14}" y="${y}" width="268" height="14" fill="#e2e8f0" stroke="${INK_2}"/>` + Array.from({ length: 12 }, (_, i) => `<circle cx="${x + 26 + i * 22.4}" cy="${y + 18}" r="3.4" fill="#e2e8f0" stroke="${INK_2}"/>`).join('');
  const bumps = (x, y) => Array.from({ length: 10 }, (_, i) => `<circle cx="${x + 34 + i * 25.4}" cy="${y}" r="2.6" fill="#e2e8f0" stroke="${INK_2}" stroke-width=".8"/>`).join('');
  const art = [
    (x, y) => chipsOn(x, y) + `<rect x="${x + 26}" y="${y + 28}" width="244" height="14" fill="${SI}" stroke="${INK_2}"/>` + [60, 110, 160, 210, 250].map(d => `<rect x="${x + d}" y="${y + 28}" width="3" height="14" fill="${COPPER}"/>`).join('')
      + `<path d="M${x + 30} ${y + 31} H${x + 266}" stroke="${COPPER}" stroke-width=".8"/><path d="M${x + 148} ${y + 24} V${y + 46}" stroke="${RED}" stroke-width="1.4" stroke-dasharray="3 2"/>` + bumps(x, y + 45) + subst(x, y + 48),
    (x, y) => chipsOn(x, y) + `<rect x="${x + 26}" y="${y + 28}" width="244" height="14" fill="${AMBER_XL}" stroke="${AMBER}"/>` + [31, 34.5, 38].map(d => `<path d="M${x + 30} ${y + d} H${x + 266}" stroke="${AMBER}" stroke-width=".8"/>`).join('') + bumps(x, y + 45) + subst(x, y + 48),
    (x, y) => chipsOn(x, y) + `<rect x="${x + 26}" y="${y + 28}" width="244" height="14" fill="#f1f5f9" stroke="${MUTED}"/><rect x="${x + 56}" y="${y + 29}" width="46" height="9" fill="${SI}" stroke="${INK_2}"/><rect x="${x + 194}" y="${y + 29}" width="46" height="9" fill="${SI}" stroke="${INK_2}"/>` + bumps(x, y + 45) + subst(x, y + 48),
    (x, y) => chipsOn(x, y) + `<rect x="${x + 26}" y="${y + 28}" width="244" height="12" fill="${SI}" fill-opacity=".6" stroke="${INK_2}" stroke-dasharray="3 2"/>` + t(x + 128, y + 37, L('interposer'), 8.5, INK, 'middle', 700) + bumps(x, y + 43)
      + `<rect x="${x + 14}" y="${y + 46}" width="268" height="8" fill="${AMBER_XL}" stroke="${AMBER}"/><path d="M${x + 14} ${y + 50} h268" stroke="${AMBER}" stroke-width=".5"/><rect x="${x + 14}" y="${y + 54}" width="268" height="10" fill="${BLUE_XL}" stroke="${BLUE}"/>`
      + Array.from({ length: 12 }, (_, i) => `<circle cx="${x + 26 + i * 22.4}" cy="${y + 68}" r="3.4" fill="#e2e8f0" stroke="${INK_2}"/>`).join('')
  ];
  cells.forEach(([name, feats], i) => {
    const x = 16 + (i % 2) * (cw + gx), y = ly + 14 + Math.floor(i / 2) * (chh + 12), ay = y + 12 + th + 4;
    svg += card(x, y, cw, chh) + para(x + cw / 2, y + 20, L(name), cw - 16, 11, INK, 'middle', 700).svg + art[i](x, ay);
    let yy = ay + 88;
    feats.forEach(([k]) => {
      if (k === 'abfHdi') { svg += `<rect x="${x + 70}" y="${yy - 9}" width="12" height="10" fill="${AMBER_XL}" stroke="${AMBER}"/>` + t(x + 86, yy, L('abf'), 10, AMBER, 'start', 700) + `<rect x="${x + 160}" y="${yy - 9}" width="12" height="10" fill="${BLUE_XL}" stroke="${BLUE}"/>` + t(x + 176, yy, L('hdi'), 10, BLUE, 'start', 700); yy += 16; return; }
      const p = para(x + cw / 2, yy, featText(k), cw - 20, 10, k === 'stitch' ? RED : INK_2, 'middle', k === 'stitch' ? 600 : 400); svg += p.svg; yy += p.height;
    });
  });
  return { svg, height: ly + 14 + 2 * chh + 12 + 6 };
}

// ch21 3D 堆疊：上段是接點間距的對數尺（短表三大類，加上長表六條例的範圍）；下段是四種鍵合方向與粒度，保留被取代的對照圖（晶圓對晶圓與晶粒對晶圓）。
// 技術審查修正：TGV 與層間通孔不是晶片之間的接點，畫成空心虛線色條；開放區間用箭頭端；F2F 下層晶粒經 TSV 再接凸塊到基板；W2W 的壞晶粒會配到好晶粒上
function bondingPitch(spec, en, kit) {
  const { L, t, para, breakAt, arrow } = tools(spec, en, kit);
  const y0 = 12, xl = 214, X = v => xl + (Math.log10(v) + 1.5) * 100;
  const den = para(415, y0 + 14, L('denser'), 400, 11, TEAL, 'middle', 700);
  let svg = den.svg + arrow(600, y0 + 18 + den.height - 6, 236, y0 + 18 + den.height - 6, TEAL, 1.6);
  const yt = y0 + 24 + den.height + 10;
  const ticks = [[0.1, 't100nm'], [1, 't1'], [10, 't10'], [100, 't100']];
  svg += ticks.map(([v, k]) => t(X(v), yt, L(k), 9.5, MUTED, 'middle', 600)).join('');
  const C = { hb: [TEAL_L, TEAL], mb: [COPPER, RED], fc: [SOLDER_D, INK_2] };
  const barSvg = (v1, v2, y, [f, s], { hollow, openL, openR } = {}) => {
    const x1 = openL ? X(v1) - 0 : X(v1), x2 = X(v2);
    let o = `<rect x="${x1}" y="${y - 5}" width="${Math.max(3, x2 - x1)}" height="10" rx="2" fill="${hollow ? '#ffffff' : f}" stroke="${s}" stroke-width="${hollow ? 1.4 : 1}"${hollow ? ' stroke-dasharray="3 2"' : ''}/>`;
    if (openL) o += `<path d="M${x1 - 1} ${y - 5} L${x1 - 9} ${y} L${x1 - 1} ${y + 5}" fill="${hollow ? '#ffffff' : f}" stroke="${s}"/>`;
    if (openR) o += `<path d="M${x2 + 1} ${y - 5} L${x2 + 9} ${y} L${x2 + 1} ${y + 5}" fill="${f}" stroke="${s}"/>`;
    return o;
  };
  const val = (text, v1, v2, y) => {
    const w = [...text].reduce((s, ch) => s + (/[\u2E80-\u9FFF\uFF00-\uFFEF]/.test(ch) ? 1.02 : 0.56), 0) * 9.5;
    const cx = Math.min(622 - w / 2, Math.max(xl - 10 + w / 2, (X(v1) + X(v2)) / 2));
    return `<text x="${cx}" y="${y - 8}" text-anchor="middle" fill="${INK_2}" font-size="9.5" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">${kit.esc(text)}</text>`;
  };
  // 短表三大類
  let y = yt + 20;
  const rows = [
    { name: `${L('fc')} · ${L('fcPitch')}`, bold: true, bars: [[100, 300, C.fc, {}, null, { openR: true }]] },
    { name: `${L('mb')} · ${L('mbPitch')}`, bold: true, bars: [[10, 100, C.mb, {}, null]] },
    { name: `${L('hb')} · ${L('hbPitch')}`, bold: true, bars: [[3, 10, C.hb, {}, null, { openL: true }]] },
    'sep',
    { name: L('c3a'), bars: [[1, 10, C.hb, {}, 'v3a', { openL: true }]] },
    { name: L('c3b'), bars: [[10, 55, C.mb, {}, 'v3b']] },
    { name: L('c3c'), bars: [[15, 55, C.mb, {}, 'v3c1'], [3, 10, C.hb, {}, 'v3c2', { openL: true }]] },
    { name: L('c3d'), bars: [[1, 9, C.hb, {}, 'v3d1', { openL: true }], [25, 40, C.mb, {}, 'v3d2']] },
    { name: L('c3e'), bars: [[3, 10, C.hb, {}, 'v3e1', { openL: true }], [40, 100, C.mb, {}, 'v3e2', { hollow: true }]] },
    { name: L('c3f'), brk: '與雙面', bars: [[0.045, 0.1, C.hb, {}, 'v3f', { hollow: true, openL: true }]] }
  ];
  const gridTop = yt + 6;
  let body = '';
  for (const row of rows) {
    if (row === 'sep') { body += `<path d="M16 ${y - 6} H624" stroke="${LINE}"/>`; y += 8; continue; }
    const p = row.brk ? breakAt(16, y + 4, row.name, row.brk, 190, 10, INK, 'start', 600) : para(16, y + 4, row.name, 190, 10, INK, 'start', row.bold ? 700 : 600);
    const step = row.bars.some(b => b[4]) ? 26 : 16;
    const bh = row.bars.length * step;
    const rh = Math.max(p.height + 4, bh + 2);
    let by = y + (rh - bh) / 2 + (step === 26 ? 16 : 6);
    body += p.svg;
    for (const [v1, v2, col, , k, opt] of row.bars) { body += barSvg(v1, v2, by, col, opt || {}) + (k ? val(L(k), v1, v2, by) : ''); by += step; }
    y += rh + 8;
  }
  svg += ticks.map(([v]) => `<path d="M${X(v)} ${gridTop} V${y - 6}" stroke="${LINE}" stroke-dasharray="3 3"/>`).join('') + body;
  // 下段：鍵合方向與粒度
  const y2 = y + 10, pw = 146, pg = (608 - 4 * pw) / 3;
  svg += `<path d="M16 ${y2 - 10} H624" stroke="${LINE}"/>`;
  const panels = [['f2f', ['shortest']], ['f2b', ['viaTsv']], ['w2w', ['w2wHow', 'throughput', 'same', 'noScreen']], ['d2w', ['kgd', 'carrier', 'mix', 'keepYield']]];
  const th = Math.max(...panels.map(([k]) => para(0, 0, L(k), pw - 12, 10.5, INK, 'middle', 700).height));
  const fh = Math.max(...panels.map(([, ks]) => ks.reduce((h, k) => h + para(0, 0, L(k), pw - 14, 10, INK_2).height + 2, 0)));
  const ph = 10 + th + 88 + fh + 6;
  const die = (x, y, w, h, metal) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${DIE_C}" stroke="${INK_2}"/>` + (metal === 'top' ? `<rect x="${x}" y="${y}" width="${w}" height="5" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".6"/>` : metal === 'bottom' ? `<rect x="${x}" y="${y + h - 5}" width="${w}" height="5" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".6"/>` : '');
  const tsvs = (x, y, h, xs) => xs.map(d => `<rect x="${x + d}" y="${y}" width="3" height="${h}" fill="${COPPER}" stroke="${RED}" stroke-width=".4"/>`).join('');
  const sub = (x, y) => `<rect x="${x + 8}" y="${y}" width="130" height="10" fill="${SI}" stroke="${INK_2}"/>`;
  const balls = (x, y) => [28, 50, 72, 94, 116].map(d => `<circle cx="${x + d}" cy="${y}" r="3" fill="#e2e8f0" stroke="${INK_2}"/>`).join('');
  const PATH = '#ea580c';
  const art = [
    // F2F：兩顆晶粒的金屬層面對面；下層晶粒經 TSV、凸塊到基板
    (x, a) => die(x + 20, a + 8, 106, 24, 'bottom') + die(x + 20, a + 32, 106, 26, 'top') + tsvs(x + 20, a + 37, 21, [22, 50, 78]) + balls(x, a + 62) + sub(x, a + 66)
      + `<path d="M${x + 60} ${a + 37} H${x + 71.5} V${a + 70}" fill="none" stroke="${MUTED}" stroke-width="1.4"/><path d="M${x + 60} ${a + 26} V${a + 37}" fill="none" stroke="${PATH}" stroke-width="2.6" stroke-opacity=".85"/>`,
    // F2B：上層晶粒正面朝下貼在減薄的下層晶粒背面，經下層晶粒內部的 TSV 導通；虛線表示可再往上疊
    (x, a) => `<rect x="${x + 20}" y="${a + 2}" width="106" height="14" fill="none" stroke="${MUTED}" stroke-dasharray="3 2"/>` + die(x + 20, a + 18, 106, 20, 'bottom') + die(x + 20, a + 40, 106, 18, 'bottom') + tsvs(x + 20, a + 40, 13, [22, 50, 78]) + balls(x, a + 62) + sub(x, a + 66)
      + `<path d="M${x + 71.5} ${a + 55} V${a + 70}" fill="none" stroke="${MUTED}" stroke-width="1.4"/><path d="M${x + 60} ${a + 34} V${a + 41} H${x + 71.5} V${a + 55}" fill="none" stroke="${PATH}" stroke-width="2.6" stroke-opacity=".85"/>`,
    // W2W：兩片整片對準後一起切割；上下的壞晶粒（打叉）會配到好晶粒上，整組浪費
    (x, a) => [0, 1].map(k => `<rect x="${x + 8}" y="${a + 8 + k * 14}" width="130" height="12" fill="${DIE_C}" stroke="${INK_2}"/>` + [1, 2, 3, 4].map(i => `<path d="M${x + 8 + i * 26} ${a + 8 + k * 14} v12" stroke="${INK_2}"/>`).join('')).join('')
      + xmark(x + 8 + 26 + 13, a + 14, 3.5) + xmark(x + 8 + 78 + 13, a + 28, 3.5) + arrow(x + 73, a + 38, x + 73, a + 48, INK_2, 1.3)
      + [0, 1, 2, 3, 4].map(i => { const bad = i === 1 || i === 3, bx = x + 10 + i * 26; return `<rect x="${bx}" y="${a + 52}" width="22" height="8" fill="${DIE_C}" stroke="${bad ? RED : INK_2}" stroke-width="${bad ? 1.6 : 1}"/><rect x="${bx}" y="${a + 60}" width="22" height="8" fill="${DIE_C}" stroke="${bad ? RED : INK_2}" stroke-width="${bad ? 1.6 : 1}"/>`; }).join(''),
    // D2W：已知良好晶粒逐顆貼到底層晶圓上，上層晶粒可以比底層小；壞晶粒不疊上去
    (x, a) => `<rect x="${x + 8}" y="${a + 52}" width="130" height="12" fill="${DIE_C}" stroke="${INK_2}"/>` + [1, 2, 3, 4].map(i => `<path d="M${x + 8 + i * 26} ${a + 52} v12" stroke="${INK_2}"/>`).join('')
      + [0, 1, 2].map(i => `<rect x="${x + 13 + i * 26}" y="${a + 44}" width="16" height="8" fill="${TEAL_L}" stroke="${TEAL}"/>`).join('')
      + `<rect x="${x + 91}" y="${a + 22}" width="16" height="8" fill="${TEAL_L}" stroke="${TEAL}"/>` + tick(x + 99.5, a + 15, 0.7) + arrow(x + 99, a + 32, x + 99, a + 42, TEAL, 1.3)
      + `<rect x="${x + 118}" y="${a + 10}" width="16" height="8" fill="#fee2e2" stroke="${RED}"/>` + xmark(x + 126, a + 4, 3)
  ];
  panels.forEach(([name, ks], i) => {
    const x = 16 + i * (pw + pg), a = y2 + 12 + th + 2;
    svg += card(x, y2, pw, ph) + para(x + pw / 2, y2 + 18, L(name), pw - 12, 10.5, INK, 'middle', 700).svg + art[i](x, a);
    let yy = a + 92;
    ks.forEach((k, j) => { const p = k === 'keepYield' ? breakAt(x + pw / 2, yy, L(k), '以保全', pw - 14, 10, INK_2, 'middle', 400) : para(x + pw / 2, yy, L(k), pw - 14, 10, j === 0 && i < 2 ? PATH : INK_2, 'middle', j === 0 && i < 2 ? 700 : 400); svg += p.svg; yy += p.height + 2; });
  });
  return { svg, height: y2 + ph + 8 };
}

export const PICTORIALS = {
  industryMap, cleanroom, toolTypes, fabRoles, dopingLattice, cmosWells, sandToPoly, ingotToWafer, waferSizes, specialWafers,
  overlayCd, lithoDefects, filmStack, thermalOxidation, cvdTypes, epitaxy, filmMetrics,
  etchTransfer, plasma, etchMetrics, doseEnergy, thermalBudget,
  whyPlanarize, dummyFill, contaminants, crossContamination, alToCu, thinWires, metalDefects, beolTiers,
  processLoop, planarLeak, gaaFlow, backsidePower, hbmStack, nodeShrink,
  metrologyVsInspection, fiveMeasurements, samplingLevels, crossSectionAnalysis,
  cpkParking, r2rFdc, suspectScope, dispositions, watVsCp, probeCards,
  packagingFlow, flipChipBumps, packageFamilies, packageDefects, splitChip, interposerTypes, bondingPitch
};
