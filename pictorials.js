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
  return { L, t, para, arrow, mark, icon: kit.iconAt };
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

export const PICTORIALS = { industryMap, cleanroom, toolTypes, fabRoles, dopingLattice, cmosWells, sandToPoly, ingotToWafer, waferSizes, specialWafers };
