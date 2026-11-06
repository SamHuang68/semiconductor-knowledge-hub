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
  // 英文照寬度斷行；中文在指定的字前斷行，at 可以是一個字串或依序的多個字串（2.23.0 起可多個）
  const breakAt = (x, y, text, at, width, size, fill, anchor, weight) => {
    const cuts = en ? [] : [].concat(at).map(a => text.indexOf(a));
    return cuts.length && cuts.every((c, j) => c > (j ? cuts[j - 1] : 0)) ? lines(x, y, [0, ...cuts].map((c, j, a) => text.slice(c, a[j + 1])), size, fill, anchor, weight) : para(x, y, text, width, size, fill, anchor, weight);
  };
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
  // 進無塵室前（第 3 階段 F 批併入，技術審查：提案只能併入現有圖）：人是最大的污染源 → 穿上全身包覆的無塵衣 → 走過風淋室 → 無塵室。
  // 順序只用箭頭表示，不加編號
  const yb = Math.ceil(Math.max(leftBottom + 16 + classes.height, legendY + 14 + lightNote.height + darkNote.height) + 12);
  svg += `<path d="M16 ${yb} H624" stroke="${LINE}"/>` + t(16, yb + 20, L('before'), 12, INK, 'start', 700);
  const pp = para(16, yb + 40, L('people'), 330, 11, RED, 'start', 700);
  svg += pp.svg;
  const py = yb + 48 + pp.height;
  const body = (x, fill, stroke) => `<path d="M${x - 13} ${py + 46} q0 -26 13 -26 q13 0 13 26 z" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/><path d="M${x - 6} ${py + 46} v14 M${x + 6} ${py + 46} v14" stroke="${stroke}" stroke-width="3" stroke-linecap="round"/>`;
  const plain = x => body(x, '#e2e8f0', INK_2) + `<circle cx="${x}" cy="${py + 10}" r="8" fill="#e2e8f0" stroke="${INK_2}" stroke-width="1.4"/>`;
  const suited = x => body(x, '#ffffff', TEAL) + `<path d="M${x - 10} ${py + 20} V${py + 8} a10 10 0 0 1 20 0 V${py + 20} z" fill="#ffffff" stroke="${TEAL}" stroke-width="1.4"/><rect x="${x - 6}" y="${py + 6}" width="12" height="6" rx="2" fill="${TEAL_L}" stroke="${TEAL}"/>`;
  const px = 96;
  svg += plain(px) + [[-18, 6], [16, 2], [-22, 36], [20, 40], [-10, 24], [12, 28]].map(([dx, dy]) => `<circle cx="${px + dx}" cy="${py + dy}" r="1.8" fill="${RED}"/>`).join('')
    + t(px - 26, py + 8, L('skin'), 9.5, INK_2, 'end') + t(px + 24, py + 4, L('hair'), 9.5, INK_2, 'start') + t(px - 28, py + 40, L('sweat'), 9.5, INK_2, 'end') + t(px + 26, py + 44, L('cosmetics'), 9.5, INK_2, 'start');
  svg += arrow(172, py + 30, 204, py + 30, TEAL, 1.6) + suited(236) + para(236, py + 78, L('suit'), 120, 10, INK, 'middle', 600).svg;
  // 風淋室：兩側噴嘴吹向人
  svg += arrow(270, py + 30, 302, py + 30, TEAL, 1.6) + `<rect x="314" y="${py - 6}" width="96" height="72" rx="4" fill="${TEAL_XL}" stroke="${INK_2}"/>`
    + [8, 24, 40].map(d => `<circle cx="318" cy="${py + d}" r="2" fill="${INK_2}"/><circle cx="406" cy="${py + d}" r="2" fill="${INK_2}"/>` + arrow(322, py + d, 338, py + d + 4, BLUE, 1.1) + arrow(402, py + d, 386, py + d + 4, BLUE, 1.1)).join('') + suited(362);
  svg += t(362, py + 80, L('shower'), 10.5, INK, 'middle', 700) + para(362, py + 94, L('blow'), 130, 10, INK_2, 'middle').svg;
  // 門後就是無塵室
  svg += arrow(422, py + 30, 454, py + 30, TEAL, 1.6) + `<rect x="464" y="${py - 10}" width="150" height="76" rx="6" fill="${TEAL_XL}" stroke="${TEAL}" stroke-dasharray="4 3"/>`
    + `<rect x="476" y="${py - 2}" width="40" height="64" rx="2" fill="#ffffff" stroke="${INK_2}" stroke-width="1.4"/><rect x="484" y="${py + 6}" width="24" height="16" rx="1" fill="${TEAL_L}" stroke="${INK_2}"/><circle cx="510" cy="${py + 34}" r="2" fill="${INK_2}"/>`
    + t(570, py + 34, L('room'), 11, TEAL, 'middle', 700);
  return { svg, height: py + 94 + para(0, 0, L('blow'), 130, 10).height + 8 };
}

// ch01 機台：單片式與批次式，兩張圖底部對齊、晶圓同寬；直立爐管內晶圓水平疊放
function toolTypes(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
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
  // 保養後先 Qual（第 3 階段 F 批併入，技術審查：提案只能併入現有圖）：四種狀態，從保養往下走四步；
  // 「沒做會怎樣」的虛線從第一步直接繞過 Qual 到紅框，紅框照正文寫「如果機台其實有問題」與「可能」，不寫成必然
  const yb = Math.ceil(Math.max(left.bottom, right.bottom) + 10);
  svg += `<path d="M16 ${yb} H624" stroke="${LINE}"/>`;
  const capY = yb + 14;
  let cx = 16, pmX = 0;
  [['running', GREEN], ['waiting', MUTED], ['pm', BLUE], ['down', RED]].forEach(([k, c]) => {
    const w = textW(L(k), 10.5) + 22;
    svg += `<rect x="${cx}" y="${capY}" width="${w}" height="22" rx="11" fill="#ffffff" stroke="${c}" stroke-width="1.4"/>` + t(cx + w / 2, capY + 15, L(k), 10.5, c, 'middle', 700);
    if (k === 'pm') pmX = cx;
    cx += w + 10;
  });
  const bw = 140, bg = 16, by = capY + 62, keys = ['replaced', 'testWafers', 'check', 'released'];
  const ps = keys.map(k => para(0, 0, L(k), bw - 16, 10));
  const bh = Math.max(...ps.map(p => p.height)) + 18;
  keys.forEach((k, i) => {
    const x = 16 + i * (bw + bg), last = i === 3;
    svg += `<rect x="${x}" y="${by}" width="${bw}" height="${bh}" rx="6" fill="${last ? '#f0fdf4' : '#ffffff'}" stroke="${last ? GREEN : INK_2}" stroke-width="${last ? 1.6 : 1}"/>`
      + para(x + bw / 2 - (last ? 6 : 0), by + 13 + (bh - 18 - ps[i].height) / 2 + 3, L(k), bw - 16 - (last ? 12 : 0), 10, INK, 'middle', 600).svg;
    if (!last) svg += arrow(x + bw + 2, by + bh / 2, x + bw + bg - 2, by + bh / 2, INK_2, 1.3);
  });
  svg += tick(16 + 3 * (bw + bg) + bw - 12, by + 14, 1);
  // 保養膠囊往下接到第一步；Qual 括住中間兩步
  svg += `<path d="M${pmX + 16} ${capY + 22} V${capY + 34} H${16 + bw / 2} V${by - 8}" fill="none" stroke="${BLUE}" stroke-width="1.3"/>` + arrow(16 + bw / 2, by - 12, 16 + bw / 2, by - 1, BLUE, 1.3);
  const q1 = 16 + bw + bg, q2 = 16 + 3 * (bw + bg) - bg;
  svg += `<path d="M${q1} ${by - 4} v-7 H${q2} v7" fill="none" stroke="${TEAL}" stroke-width="1.4"/>` + t((q1 + q2) / 2, by - 15, L('qual'), 11, TEAL, 'middle', 800);
  // 沒做會怎樣：從第一步直接繞到紅框
  const ry = by + bh + 18, wp = para(0, 0, L('wrong'), 270, 10.5), sp = para(0, 0, L('scrap'), 270, 10);
  const rh = 16 + wp.height + sp.height;
  svg += `<path d="M${16 + 30} ${by + bh} V${ry + rh / 2} H${336}" fill="none" stroke="${RED}" stroke-width="1.4" stroke-dasharray="5 3"/>` + arrow(328, ry + rh / 2, 340, ry + rh / 2, RED, 1.4)
    + t(60, ry + rh / 2 - 5, L('skip'), 10.5, RED, 'start', 700)
    + `<rect x="342" y="${ry}" width="282" height="${rh}" rx="6" fill="#fff1f2" stroke="${RED}"/>` + para(354, ry + 17, L('wrong'), 270, 10.5, RED, 'start', 700).svg + para(354, ry + 17 + wp.height, L('scrap'), 270, 10, INK, 'start').svg;
  return { svg, height: ry + rh + 8 };
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
// 2.25.0（第 3 階段 F 批）：A–D 文字不動，各加一張小圖；A 加上冶金級的純度、E 加上電子級的純度，改用「依正文數值繪製」。
// 技術審查修正：A 的電弧爐不畫氧氣；B 的氯化氫從下方進、含氯化合物從上方出；C 的雜質從塔頂與塔底兩處排出；D 是受熱表面上越積越厚的矽
function sandToPoly(spec, en, kit) {
  const { L, t, para, arrow, mark } = tools(spec, en, kit);
  let svg = '';
  const steps = [['metallurgical', 'metallurgicalNote'], ['hcl', 'hclNote'], ['distill', 'distillNote'], ['decompose', 'decomposeNote']];
  const w = 136, gap = (608 - 4 * w) / 3, art = 50;
  const chips = steps.map(([a, b], i) => {
    const x = 16 + i * (w + gap);
    const head = para(x + w / 2, 0, L(a), w - 16, 11.5, INK, 'middle', 700);
    const note = para(x + w / 2, 0, L(b), w - 16, 10.5, INK_2);
    return { x, a, b, h: 18 + art + head.height + note.height + (i === 0 ? 26 : 0) };
  });
  const rowH = Math.ceil(Math.max(...chips.map(c => c.h)));
  const icons = [
    // A 電弧爐：爐體裝著石英砂與碳，三根電極往下放電
    cx => `<path d="M${cx - 28} ${44} h56 l-7 24 h-42 z" fill="#e2e8f0" stroke="${INK_2}"/><path d="M${cx - 25} ${54} h50 l-4 13 h-42 z" fill="${AMBER_L}"/>`
      + [-12, 0, 12].map(dx => `<rect x="${cx + dx - 2.5}" y="${26}" width="5" height="24" fill="${INK_2}"/><path d="M${cx + dx} ${50} l-3 4 4 1 -3 4" fill="none" stroke="${RED}" stroke-width="1.2"/>`).join(''),
    // B 反應器：氯化氫從下方進，含氯化合物從上方出
    cx => `<rect x="${cx - 16}" y="${32}" width="32" height="34" rx="5" fill="#ffffff" stroke="${BLUE}" stroke-width="1.3"/><path d="M${cx - 13} ${56} h26 v7 h-26 z" fill="${SI}"/>`
      + [[-5, 50], [4, 44], [-2, 38]].map(([dx, y]) => `<circle cx="${cx + dx}" cy="${y}" r="2" fill="none" stroke="${BLUE}"/>`).join('') + arrow(cx - 26, 72, cx - 16, 62, BLUE, 1.3) + arrow(cx + 6, 32, cx + 18, 22, BLUE, 1.3),
    // C 蒸餾塔：含氯化合物從左側進料；雜質從塔頂與塔底排出（紅色，箭頭端畫出雜質小點），純化後的部分從右側取出（F2 審查修正：補上進料、分出雜質與產物）
    cx => `<rect x="${cx - 9}" y="${24}" width="18" height="46" rx="3" fill="#ffffff" stroke="${AMBER}" stroke-width="1.3"/>` + [32, 40, 48, 56, 64].map(y => `<path d="M${cx - 9} ${y} h18" stroke="${AMBER}" stroke-width=".7"/>`).join('')
      + arrow(cx - 30, 47, cx - 10, 47, INK_2, 1.3) + arrow(cx + 9, 47, cx + 26, 47, TEAL, 1.3)
      + arrow(cx + 9, 27, cx + 24, 27, RED, 1.3) + arrow(cx + 9, 67, cx + 24, 67, RED, 1.3)
      + [[29, 25], [32, 29], [29, 65], [32, 69]].map(([dx, y]) => `<circle cx="${cx + dx}" cy="${y}" r="1.5" fill="${RED}"/>`).join(''),
    // D 高溫分解：受熱的矽棒表面越積越厚
    cx => `<path d="M${cx - 30} ${72} V${34} a30 14 0 0 1 60 0 V${72}" fill="none" stroke="${MUTED}" stroke-dasharray="3 2"/><path d="M${cx - 12} ${70} V${36} H${cx + 12} V${70}" fill="none" stroke="${SI}" stroke-width="11" stroke-linejoin="round"/>`
      + `<path d="M${cx - 12} ${70} V${36} H${cx + 12} V${70}" fill="none" stroke="${RED}" stroke-width="2.4" stroke-linejoin="round"/>` + [-22, 22].map(dx => `<path d="M${cx + dx} ${62} q-2 -4 0 -8 q2 -4 0 -8" fill="none" stroke="${RED}" stroke-width=".9"/>`).join('')
  ];
  chips.forEach((c, i) => {
    const tone = [TEAL_XL, BLUE_XL, AMBER_XL, '#f1f5f9'][i];
    const stroke = [TEAL, BLUE, AMBER, INK_2][i];
    svg += `<rect x="${c.x}" y="20" width="${w}" height="${rowH}" rx="6" fill="${tone}" stroke="${stroke}" stroke-width="1.2"/>` + icons[i](c.x + w / 2);
    const head = para(c.x + w / 2, 20 + 18 + art, L(c.a), w - 16, 11.5, INK, 'middle', 700);
    const note = para(c.x + w / 2, 20 + 18 + art + head.height, L(c.b), w - 16, 10.5, INK_2);
    svg += head.svg + note.svg + mark(c.x + 2, 22, 'ABCD'[i]);
    if (i === 0) {
      const pw = textW(L('mgPurity'), 10.5) + 16, py = 20 + 18 + art + head.height + note.height - 4;
      svg += `<rect x="${c.x + (w - pw) / 2}" y="${py}" width="${pw}" height="18" rx="9" fill="${TEAL}"/>` + t(c.x + w / 2, py + 13, L('mgPurity'), 10.5, '#ffffff', 'middle', 700);
    }
    if (i < 3) svg += arrow(c.x + w + 2, 20 + rowH / 2, c.x + w + gap - 2, 20 + rowH / 2);
  });
  // 下排：右邊是電子級多晶矽（接在高溫分解之後），左邊是長晶後的單晶矽
  const top = 20 + rowH + 34;
  svg += arrow(16 + 3 * (w + gap) + w / 2, 20 + rowH + 2, 16 + 3 * (w + gap) + w / 2, top - 2);
  // 電子級多晶矽的純度放在 E 的副標下方；F 留同樣的高度，兩格的原子排列圖才對齊（2.25.0）
  const panel = (x, letter, title, note, grains, labels, badge = []) => {
    let out = `<rect x="${x}" y="${top}" width="294" height="0" rx="8" fill="#ffffff" stroke="${LINE}"/>`;
    const head = para(x + 147, top + 20, L(title), 270, 12, INK, 'middle', 700);
    const sub = para(x + 147, top + 20 + head.height, L(note), 270, 10.5, INK_2);
    out += head.svg + sub.svg;
    let y = top + 22 + head.height + sub.height;
    if (badge.length) {
      const pw = Math.max(...badge.map(b => textW(b, 11))) + 24;
      out += `<rect x="${x + 147 - pw / 2}" y="${y + 2}" width="${pw}" height="${8 + badge.length * 15}" rx="9" fill="${TEAL}"/>` + badge.map((b, i) => t(x + 147, y + 16 + i * 15, b, 11, '#ffffff', 'middle', 700)).join('');
    }
    y += 40;
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
  ], [['poly', 12, RED, 700], ['grains', 10.5, INK_2, 400]], [L('purity'), en ? `(${L('nines')})` : `（${L('nines')}）`]);
  const single = panel(16, 'F', 'growth', 'growthNote', [[[[0, 0], [1, 0], [1, 1], [0, 1]], 0]], [['single', 12, BLUE, 700], ['aligned', 10.5, INK_2, 400], ['waferSingle', 10.5, MUTED, 400]]);
  svg += poly.svg + single.svg;
  const mid = top + 40;
  svg += arrow(328, mid, 312, mid);
  return { svg, height: Math.ceil(Math.max(poly.bottom, single.bottom) + 10) };
}

// ch03 從晶棒到晶圓：六格小圖，標籤沿用原本流程方框；折成兩列，第二列由右往左
function ingotToWafer(spec, en, kit) {
  const { L, t, para, breakAt, arrow, mark, dim } = tools(spec, en, kit);
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
  // 2.25.0（第 3 階段 F 批）：第三列畫出成品晶圓上的 Notch、Wafer ID 與邊緣剖面。
  // 技術審查修正：Notch 與 F 格的晶圓同在下方；厚度只寫正文的「大約是 775 微米」，剖面不按比例
  const B = Math.ceil(20 + rowH[0] + 30 + rowH[1] + 18), cx = 82, cy = B + 64, r = 46;
  let band = card(16, B, 608, 132, '#ffffff', LINE) + waferTop(cx, cy, r, '#e2e8f0', INK_2);
  // 機台先找到 Notch，再把晶圓轉到固定方向：繞晶圓上緣的旋轉箭頭
  const R = r + 8, ang = d => d * Math.PI / 180, P = d => [cx + R * Math.cos(ang(d)), cy + R * Math.sin(ang(d))];
  const [sx, sy] = P(-150), [ex, ey] = P(-40);
  band += `<path d="M${sx.toFixed(1)} ${sy.toFixed(1)} A${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${TEAL}" stroke-width="1.6"/>` + arrow(ex - 6 * Math.sin(ang(40)), ey - 6 * Math.cos(ang(40)), ex, ey, TEAL, 1.6);
  // 兩個標籤接回正文原句：英文用正文的 and，整句與正文相同；中文在「把晶圓」前斷行（F2 審查修正）
  band += breakAt(150, B + 24, en ? `${L('find')} and ${L('rotate')}` : `${L('find')}，${L('rotate')}`, '把晶圓', 230, 10.5, INK, 'start', 600).svg;
  // Wafer ID：雷射刻在晶圓上的一組點陣編號
  band += Array.from({ length: 16 }, (_, k) => `<circle cx="${cx - 26 + (k % 8) * 2.4}" cy="${cy + 28 + Math.floor(k / 8) * 2.6}" r=".8" fill="${INK_2}"/>`).join('')
    + `<path d="M${cx - 22} ${cy + 33} L${cx - 40} ${B + 114}" stroke="${MUTED}" stroke-dasharray="2 2"/>` + t(24, B + 125, L('waferId'), 10.5, INK, 'start', 700);
  // Notch 放大圈：晶圓在邊緣線上方，V 形缺口往上凹
  const zx = 176, zy = B + 98, id = `notch-zoom-${en ? 'en' : 'zh'}`;
  band += `<clipPath id="${id}"><circle cx="${zx}" cy="${zy}" r="18"/></clipPath><g clip-path="url(#${id})"><rect x="${zx - 18}" y="${zy - 18}" width="36" height="36" fill="#ffffff"/>`
    + `<path d="M${zx - 18} ${zy - 18} H${zx + 18} V${zy + 4} H${zx + 6} L${zx} ${zy - 7} L${zx - 6} ${zy + 4} H${zx - 18} Z" fill="#e2e8f0" stroke="${INK_2}"/></g><circle cx="${zx}" cy="${zy}" r="18" fill="none" stroke="${TEAL}" stroke-width="1.6"/>`
    + `<path d="M${cx + 3} ${cy + r} L${zx - 18} ${zy + 2}" stroke="${MUTED}" stroke-dasharray="2 2"/>`
    + t(zx + 26, zy - 2, L('notch'), 11.5, TEAL, 'start', 800) + t(zx + 26, zy + 13, L('vNotch'), 10.5, INK_2, 'start', 600);
  // 邊緣剖面：左端是磨圓的邊緣，右端是斷開的示意線；厚度用尺寸線標示
  const ey0 = B + 52, ey1 = B + 78, ex0 = 452;
  band += `<path d="M${ex0} ${ey0} H600 l-4 6 4 7 -4 7 4 6 H${ex0} a13 13 0 0 1 0 -26 Z" fill="${SI}" stroke="${INK_2}"/><path d="M${ex0} ${ey1} a13 13 0 0 1 0 -26" fill="none" stroke="${TEAL}" stroke-width="2.2"/>`
    + t(432, ey0 - 12, L('round'), 10.5, TEAL, 'start', 700) + dim(480, ey0, 480, ey1, INK) + t(480, ey1 + 20, L('thick'), 10.5, INK, 'middle', 700);
  return { svg: svg + band, height: B + 140 };
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
  const { L, t, para, breakAt, arrow } = tools(spec, en, kit);
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
  // 2.25.0（第 3 階段 F 批）：下方加「工廠裡很多晶圓不是產品」。批次式機台的晶舟裡，產品晶圓連成一組，空位用擋片補滿；
  // 控片拿去量測台檢查機台狀態。用過的控片和擋片從晶舟送去研磨，成為再生晶圓，再回到晶舟
  // （F2 審查修正：原本只有控片走到研磨，迴圈也沒有回到控片與擋片）
  const B = Math.ceil(bottom + 14), bx0 = 204, bx1 = 252, sy = j => B + 48 + j * 8;
  svg += card(16, B, 608, 200, LIGHT, LINE) + t(28, B + 20, L('notProduct'), 12, INK, 'start', 800)
    + `<rect x="${bx0 - 6}" y="${B + 40}" width="${bx1 - bx0 + 12}" height="5" fill="${INK_2}"/><rect x="${bx0 - 6}" y="${sy(12) + 6}" width="${bx1 - bx0 + 12}" height="5" fill="${INK_2}"/>`
    + `<path d="M${bx0 - 3} ${B + 45} V${sy(12) + 6} M${bx1 + 3} ${B + 45} V${sy(12) + 6}" stroke="${INK_2}" stroke-width="2"/>`
    + Array.from({ length: 13 }, (_, j) => `<path d="M${bx0} ${sy(j)} H${bx1}" stroke="${j < 2 || j > 9 ? '#94a3b8' : j === 2 ? BLUE : TEAL}" stroke-width="3" stroke-linecap="round"/>`).join('');
  const bracket = (j0, j1, key, color) => { const m = (sy(j0) + sy(j1)) / 2; return `<path d="M${bx0 - 10} ${sy(j0) - 2} h-4 V${sy(j1) + 2} h4" fill="none" stroke="${color}" stroke-width="1.3"/>` + t(bx0 - 20, m + 4, L(key), 10.5, color, 'end', 700); };
  svg += bracket(0, 1, 'dummy', MUTED) + bracket(3, 9, 'product', TEAL) + bracket(10, 12, 'dummy', MUTED);
  const f1 = breakAt(262, B + 92, en ? L('full1') : `${L('full1')}，`, '放滿', 124, 10.5, INK_2, 'start', 400);
  svg += f1.svg + para(262, B + 92 + f1.height, L('full2'), 124, 10.5, INK_2, 'start').svg;
  // 控片：從晶舟拿去量測台
  svg += arrow(bx1 + 6, sy(2), 414, sy(2), BLUE, 1.4) + t(262, sy(2) - 6, L('monitor'), 10.5, BLUE, 'start', 700)
    + `<rect x="420" y="${B + 44}" width="70" height="42" rx="4" fill="#ffffff" stroke="${INK_2}"/><rect x="436" y="${B + 50}" width="12" height="10" fill="${INK_2}"/><path d="M442 ${B + 60} V${B + 72}" stroke="${BLUE}" stroke-dasharray="2 2"/>`
    + `<path d="M428 ${B + 74} H458" stroke="${BLUE}" stroke-width="3" stroke-linecap="round"/><circle cx="474" cy="${B + 62}" r="9" fill="#ffffff" stroke="${TEAL}" stroke-width="1.4"/><path d="M474 ${B + 62} l5 -5" stroke="${TEAL}" stroke-width="1.6" stroke-linecap="round"/>`;
  const ck = para(455, B + 102, L('check'), 130, 10.5, INK, 'middle', 700);
  svg += ck.svg + para(455, B + 102 + ck.height, L('measure'), 130, 10, INK_2).svg;
  // 用過的控片和擋片：從晶舟底部沿下緣送到右側研磨；再生晶圓沿上緣回到晶舟頂部
  svg += `<circle cx="580" cy="${B + 70}" r="20" fill="#e2e8f0" stroke="${INK_2}"/><circle cx="586" cy="${B + 64}" r="8" fill="#ffffff" stroke="${INK_2}"/><path d="M566 ${B + 82} a16 16 0 0 0 22 4" fill="none" stroke="${TEAL}" stroke-width="1.4"/><path d="M588 ${B + 86} l-6 -1 3 5 z" fill="${TEAL}"/>`
    + breakAt(578, B + 108, L('reclaim'), '回收', 70, 10, INK_2, 'middle', 400).svg
    + `<path d="M228 ${sy(12) + 11} V${B + 176} H616 V${B + 70} H608" fill="none" stroke="${MUTED}" stroke-width="1.3"/>` + arrow(610, B + 70, 602, B + 70, MUTED, 1.3)
    + t(420, B + 192, L('used'), 10.5, INK_2, 'middle', 600)
    + `<path d="M580 ${B + 49} V${B + 30} H228 V${B + 34}" fill="none" stroke="${TEAL}" stroke-width="1.3"/>` + arrow(228, B + 31, 228, B + 39, TEAL, 1.3)
    + t(404, B + 25, L('reclaimed'), 10.5, TEAL, 'middle', 800);
  return { svg, height: B + 208 };
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

// ch07 熱預算：同一顆電晶體經過三次高溫，源汲極一次比一次深、寬，最後在閘極下方靠近；底部是製程順序的冷暖色帶（2.27.0）
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
  // 製程順序色帶（2.27.0 併入「高溫步驟要盡量排在前面」）：由暖到冷，越後面越冷；直立虛線之後有了金屬導線，溫度大幅降低。
  // 技術審查：不畫長條、不標溫度、不畫累計
  const by = s + 94 + Math.max(adds.height + distort.height, deep.height + leak.height) + 40, mx = 404;
  svg += t(16, by - 12, L('order'), 11.5, INK, 'start', 700) + arrow(16 + textW(L('order'), 11.5) + 10, by - 16, 624, by - 16, INK_2, 1.4);
  for (let k = 0; k < 38; k++) {
    const x = 16 + k * 16, f = x + 8 < mx ? 1 - 0.5 * (x + 8 - 16) / (mx - 16) : 0.16 - 0.12 * (x + 8 - mx) / (624 - mx);
    svg += `<rect x="${x}" y="${by}" width="16.4" height="18" fill="${mixColor(COLD, HOT, f)}"/>`;
  }
  svg += `<rect x="16" y="${by}" width="608" height="18" fill="none" stroke="${INK_2}"/><path d="M${mx} ${by - 8} V${by + 28}" stroke="${INK}" stroke-width="1.4" stroke-dasharray="4 3"/>`;
  const e1 = para(20, by + 36, L('early'), mx - 40, 10.5, RED, 'start', 700), e2 = para(20, by + 36 + e1.height, L('cooler'), mx - 40, 10.5, INK_2, 'start');
  const m1 = para(mx + 8, by + 36, L('metal'), 624 - mx - 12, 10.5, INK, 'start', 700), m2 = para(mx + 8, by + 36 + m1.height, L('drop'), 624 - mx - 12, 10.5, BLUE, 'start', 700);
  svg += e1.svg + e2.svg + m1.svg + m2.svg;
  return { svg, height: Math.ceil(by + 36 + Math.max(e1.height + e2.height, m1.height + m2.height) + 4) };
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
  // 右欄下方：銅磨完之後不能放太久（2.29.0 併入，第 3 階段 H 批）。時間軸左端是剛磨完、表面沒有覆蓋層的銅，右端鋪上藍色覆蓋層，
  // 兩端之間是 Q-Time 限制；時限之後往下分支：表面出現深色斑點的銅、為什麼與做法。不標時間（技術審查修正）
  const qy = wy + 54 + voids.height + push.height + 14;
  const kh = para(rx + 132, qy + 22, L('kh'), 250, 11.5, INK, 'middle', 700);
  svg += `<path d="M${rx + 8} ${qy} H${rx + 256}" stroke="${LINE}"/>` + kh.svg;
  const sy = qy + 22 + kh.height + 14;
  const sect = (x, y, capOn, spots) => `<rect x="${x}" y="${y + 4}" width="60" height="24" fill="${TEAL_XL}" stroke="${TEAL}" stroke-width=".8"/><rect x="${x + 14}" y="${y + 4}" width="32" height="16" fill="${COPPER}"/><path d="M${x + 14} ${y + 4} V${y + 20} H${x + 46} V${y + 4}" fill="none" stroke="${PINK}" stroke-width="1.4"/>`
    + (capOn ? `<rect x="${x}" y="${y}" width="60" height="4" fill="${BLUE_L}" stroke="${BLUE}"/>` : '')
    + (spots ? [[19, 6], [26, 5.5], [33, 6.5], [40, 5.5]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="2.3" fill="#57534e"/>`).join('') : '');
  const bx = rx + 160;
  svg += sect(rx + 16, sy, false) + sect(rx + 192, sy, true)
    // 區間兩端都封口：起點是磨完、終點是時限；正常路徑從時限前接到覆蓋層，超過時限才從終點往下分支（審查修正）
    + `<path d="M${rx + 84} ${sy + 9} v14 M${bx} ${sy + 9} v14 M${rx + 84} ${sy + 16} H${bx}" fill="none" stroke="${BLUE}" stroke-width="1.4"/>` + arrow(bx, sy + 16, rx + 186, sy + 16, BLUE, 1.4)
    + kit.iconAt('clock', rx + 86, sy - 14, 16, BLUE) + t(rx + 106, sy - 2, L('qt'), 10.5, BLUE, 'start', 700);
  const done = para(rx + 46, sy + 44, L('done'), 100, 10.5, INK_2), capd = para(rx + 222, sy + 44, L('capDep'), 92, 10.5, INK_2);
  svg += done.svg + capd.svg;
  const r2 = sy + 44 + Math.max(done.height, capd.height) + 2;
  svg += arrow(bx, sy + 16, bx, r2, RED, 1.4) + sect(bx - 30, r2 + 2, false, true) + t(bx - 38, r2 + 22, L('over'), 10.5, RED, 'end', 700);
  const why = para(bx, r2 + 48, L('corrode'), 200, 10.5, INK_2);
  const eng = para(bx, r2 + 48 + why.height + 14, L('eng'), 200, 10.5, TEAL, 'middle', 700);
  svg += why.svg + arrow(bx, r2 + 48 + why.height - 6, bx, r2 + 48 + why.height + 2, TEAL, 1.2) + eng.svg;
  return { svg, height: Math.ceil(Math.max(leftBottom, r2 + 48 + why.height + 14 + eng.height) + 4) };
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
  const rule = en ? para(rx + 26, y0 + 18, `${L('narrow')}, ${L('far')}, ${L('higher')}`, 232, 11.5, INK, 'start', 700)
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
  const near = para(154, yu + 14, en ? `${L('nearTarget')}, ${L('looksNormal')}` : `${L('nearTarget')}，${L('looksNormal')}`, 300, 10.5, TEAL, 'start', 600);
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
  const sus = para((last + alarm) / 2, yB + 18, en ? `${L('after')} ${L('suspect')}` : `${L('after')}，${L('suspect')}`, 300, 11, RED, 'middle', 700);
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
  const m1 = en ? para(28, my + 40, `${L('mrbWhen')}, ${L('mrbMeets')} ${L('mrbWho')}`, 180, 10.5, INK, 'start', 600) : lines(28, my + 40, [`${L('mrbWhen')}，`, L('mrbMeets')], 10.5, INK, 'start', 600);
  const m2 = en ? { svg: '', height: 0 } : para(28, my + 40 + m1.height + 4, L('mrbWho'), 180, 10.5, INK_2, 'start');
  const m3 = para(28, my + 40 + m1.height + m2.height + 8, L('mrbCustomer'), 180, 10.5, MUTED, 'start');
  const mh = 40 + m1.height + m2.height + m3.height + 6;
  svg += `<path d="M101 ${y0 + 48} V${my}" stroke="${PINK}" stroke-width="1.4" stroke-dasharray="4 3"/>` + card(16, my, 196, mh, PINK_L, PINK) + t(28, my + 22, L('mrb'), 13, PINK, 'start', 800) + m1.svg + m2.svg + m3.svg;
  const yb = Math.max(y0 + 4 * (rh + 8) - 8, my + mh) + 26;
  const fix = para(320, yb, en ? `${L('after')}, ${L('fix')}, ${L('confirm')}` : `${L('after')}、${L('fix')}，${L('confirm')}`, 580, 11, INK, 'middle', 700);
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
// 每格只放一個節距與一個針數（取自正文表格）；懸臂式的節距在 2.23.0 正文校勘後補上，用正文原句標明是細節距產品的值；
// 內建自我測試畫成晶粒內的一塊電路區塊；不放 Cobra 等商用名稱
function probeCards(spec, en, kit) {
  const { L, t, para, lines, breakAt } = tools(spec, en, kit);
  const cw = 114, gap = (608 - 5 * cw) / 4, y0 = 12;
  const cols = [
    ['watCard', [['kelvin', INK, 600], ['pcm', TEAL, 600], ['pinsW', INK_2, 400]]],
    ['cantilever', [['scrub', INK, 600, '較大'], ['wbPad', TEAL, 600], ['pitchC', INK, 700, ['細節距', '≥']], ['pinsC', INK_2, 400]]],
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
// 技術審查修正：TGV 與層間通孔不是晶片之間的接點，畫成空心虛線色條；開放區間用箭頭端；F2F 下層晶粒經 TSV 再接凸塊到基板；W2W 的壞晶粒會配到好晶粒上。
// 2.22.0：長表六條例的結構縮圖（計畫 P073）併入間距尺，每一列左側一張無文字的小圖（70 × 40）。縮圖用色跟著色條：青綠只畫混合鍵合的介面，
// 晶粒中性色、記憶體疊層藍色、基底晶粒與中介層灰色，TSV 與下段面板一樣用銅色。3F 是電晶體層級：外框改虛線並加放大鏡，正面訊號層與背面供電分兩色
function bondingPitch(spec, en, kit) {
  const { L, t, para, breakAt, arrow } = tools(spec, en, kit);
  const y0 = 12, xl = 252, X = v => xl + (Math.log10(v) + 1.5) * 92;
  const den = para(436, y0 + 14, L('denser'), 380, 11, TEAL, 'middle', 700);
  let svg = den.svg + arrow(606, y0 + 18 + den.height - 6, 272, y0 + 18 + den.height - 6, TEAL, 1.6);
  // 六條例的結構縮圖（70 × 40，不放文字）
  const hbi = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="1.6" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".5"/>`;
  const mem = (x, y, w, n) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * 3.9}" width="${w}" height="2.9" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".5"/>`).join('');
  const bump = (x, y, xs, r = 1.5) => xs.map(d => `<circle cx="${x + d}" cy="${y}" r="${r}" fill="#e2e8f0" stroke="${INK_2}" stroke-width=".6"/>`).join('');
  const thumbs = {
    // 3A：兩顆晶粒以混合鍵合直接接合，介面上是銅對銅接點
    c3a: (x, y) => `<rect x="${x + 5}" y="${y + 5}" width="60" height="14" fill="${DIE_C}" stroke="${INK_2}"/><rect x="${x + 5}" y="${y + 20.6}" width="60" height="14" fill="${DIE_C}" stroke="${INK_2}"/>` + hbi(x + 5, y + 19, 60) + [12, 24, 36, 48, 60].map(d => `<rect x="${x + d - 2}" y="${y + 16}" width="4" height="8" fill="${COPPER}" stroke="${RED}" stroke-width=".4"/>`).join(''),
    // 3B：上層晶粒經微凸塊接到有 TSV 的下層晶粒
    c3b: (x, y) => `<rect x="${x + 13}" y="${y + 4}" width="44" height="11" fill="${DIE_C}" stroke="${INK_2}"/>` + bump(x, y + 18.5, [18, 28, 38, 48, 58].map(d => d - 3), 2.4) + `<rect x="${x + 5}" y="${y + 22}" width="60" height="14" fill="${SI}" stroke="${INK_2}"/>` + [16, 35, 54].map(d => `<rect x="${x + d}" y="${y + 22}" width="2.5" height="14" fill="${COPPER}"/>`).join(''),
    // 3C：八層記憶體晶粒疊在灰色的基底晶粒上，層間留縫；最上層沒有 TSV
    c3c: (x, y) => mem(x + 12, y + 2, 46, 8) + `<rect x="${x + 8}" y="${y + 33.5}" width="54" height="5" fill="${SI}" stroke="${INK_2}"/><path d="M${x + 24} ${y + 5.9} V${y + 33.5} M${x + 46} ${y + 5.9} V${y + 33.5}" stroke="${COPPER}" stroke-width="1.4"/>`,
    // 3D：左邊兩顆晶粒垂直混合鍵合，右邊記憶體疊層，兩者以微凸塊並排接到中介層
    c3d: (x, y) => `<rect x="${x + 2}" y="${y + 32}" width="66" height="5" fill="${SI}" stroke="${INK_2}"/><rect x="${x + 6}" y="${y + 9}" width="26" height="8" fill="${DIE_C}" stroke="${INK_2}"/>` + hbi(x + 6, y + 17, 26) + `<rect x="${x + 6}" y="${y + 18.6}" width="26" height="10.4" fill="${DIE_C}" stroke="${INK_2}"/>`
      + mem(x + 40, y + 10, 24, 4) + `<rect x="${x + 38}" y="${y + 25.6}" width="28" height="3.4" fill="${SI}" stroke="${INK_2}" stroke-width=".6"/>` + bump(x, y + 30.5, [10, 19, 28, 43, 52, 61], 1.4),
    // 3E：左邊光電共封裝（電子晶片混合鍵合在光子晶片上），右邊玻璃核心基板與玻璃通孔；兩者是不同的條目，中間以細虛線分開
    c3e: (x, y) => `<rect x="${x + 3}" y="${y + 22}" width="30" height="10" fill="#ede9fe" stroke="#6d28d9"/><rect x="${x + 9}" y="${y + 12.4}" width="18" height="8" fill="${DIE_C}" stroke="${INK_2}"/>` + hbi(x + 9, y + 20.4, 18)
      + `<path d="M${x + 36} ${y + 5} V${y + 35}" stroke="${LINE}" stroke-dasharray="2 2"/><rect x="${x + 39}" y="${y + 21}" width="28" height="8" fill="#f1f5f9" stroke="${MUTED}"/><path d="M${x + 41} ${y + 27} l4 -4 M${x + 59} ${y + 27} l4 -4" stroke="#ffffff" stroke-width="1.2"/>`
      + [46, 53, 60].map(d => `<path d="M${x + d} ${y + 21} V${y + 29}" stroke="${COPPER}" stroke-width="1.4" stroke-dasharray="1.6 1"/>`).join('') + `<rect x="${x + 45}" y="${y + 14}" width="16" height="6" fill="${DIE_C}" stroke="${INK_2}"/>`,
    // 3F：電晶體層級的兩層元件與穿過兩層的閘極；正面是訊號層（琥珀色），背面是供電（紅色）；右上的放大鏡表示比例與其他格不同
    c3f: (x, y) => `<rect x="${x + 12}" y="${y + 8}" width="38" height="4" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".6"/><rect x="${x + 12}" y="${y + 13}" width="38" height="7" fill="#e2e8f0" stroke="${INK_2}"/><rect x="${x + 12}" y="${y + 21}" width="38" height="7" fill="#e2e8f0" stroke="${INK_2}"/><rect x="${x + 29}" y="${y + 12}" width="4" height="17" fill="${METAL_GATE}"/><rect x="${x + 8}" y="${y + 30}" width="46" height="3.5" fill="${RED}"/>`
      + `<circle cx="${x + 60}" cy="${y + 9}" r="3.6" fill="none" stroke="${MUTED}" stroke-width="1.2"/><path d="M${x + 62.6} ${y + 11.6} L${x + 66} ${y + 15}" stroke="${MUTED}" stroke-width="1.6" stroke-linecap="round"/>`
  };
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
    const cx = Math.min(622 - w / 2, Math.max(xl + w / 2, (X(v1) + X(v2)) / 2));
    return `<text x="${cx}" y="${y - 8}" text-anchor="middle" fill="${INK_2}" font-size="9.5" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">${kit.esc(text)}</text>`;
  };
  // 短表三大類
  let y = yt + 20;
  const rows = [
    { name: `${L('fc')} · ${L('fcPitch')}`, bold: true, bars: [[100, 270, C.fc, {}, null, { openR: true }]] },
    { name: `${L('mb')} · ${L('mbPitch')}`, bold: true, bars: [[10, 100, C.mb, {}, null]] },
    { name: `${L('hb')} · ${L('hbPitch')}`, bold: true, bars: [[3, 10, C.hb, {}, null, { openL: true }]] },
    'sep',
    { name: L('c3a'), thumb: 'c3a', bars: [[1, 10, C.hb, {}, 'v3a', { openL: true }]] },
    { name: L('c3b'), thumb: 'c3b', brk: '與 TSV', bars: [[10, 55, C.mb, {}, 'v3b']] },
    { name: L('c3c'), thumb: 'c3c', bars: [[15, 55, C.mb, {}, 'v3c1'], [3, 10, C.hb, {}, 'v3c2', { openL: true }]] },
    { name: L('c3d'), thumb: 'c3d', bars: [[1, 9, C.hb, {}, 'v3d1', { openL: true }], [25, 40, C.mb, {}, 'v3d2']] },
    { name: L('c3e'), thumb: 'c3e', brk: '與玻璃', bars: [[3, 10, C.hb, {}, 'v3e1', { openL: true }], [40, 100, C.mb, {}, 'v3e2', { hollow: true }]] },
    { name: L('c3f'), thumb: 'c3f', brk: '與雙面', bars: [[0.045, 0.1, C.hb, {}, 'v3f', { hollow: true, openL: true }]] }
  ];
  const gridTop = yt + 6;
  let body = '';
  for (const row of rows) {
    if (row === 'sep') { body += `<path d="M16 ${y - 6} H624" stroke="${LINE}"/>`; y += 8; continue; }
    const nx = row.thumb ? 94 : 16, nw = row.thumb ? 150 : 226;
    const p = row.brk ? breakAt(nx, y + 4, row.name, row.brk, nw, 10, INK, 'start', 600) : para(nx, y + 4, row.name, nw, 10, INK, 'start', row.bold ? 700 : 600);
    const step = row.bars.some(b => b[4]) ? 26 : 16;
    const bh = row.bars.length * step;
    const rh = Math.max(p.height + 4, bh + 2, row.thumb ? 44 : 0);
    let by = y + (rh - bh) / 2 + (step === 26 ? 16 : 6);
    if (row.thumb) { const ty = y - 6 + (rh - 40) / 2; body += `<rect x="16" y="${ty}" width="70" height="40" rx="3" fill="#ffffff" stroke="${row.thumb === 'c3f' ? INK_2 : LINE}"${row.thumb === 'c3f' ? ' stroke-dasharray="3 2"' : ''}/>` + thumbs[row.thumb](16, ty); }
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

// ── E 批（ch22–ch24 與附錄）：最終測試與可靠度、工廠系統、記憶體與韌體、現場行話 ──

// 圖示庫沒有的小圖：扳手、上升曲線、日、月、燈塔、汽車、素面晶圓、沒有數字的月曆。畫法同 icons.js 的 iconAt（24 格、線寬 1.75）（2.22.0）
const GLYPHS = {
  wrench: '<path d="M4.5 19.5 12.5 11.5" stroke-width="2.8"/><path d="M21 8A5 5 0 1 1 16 3M21 8h-2.8M16 3v2.8"/>',
  rise: '<path d="M4 4v16h16"/><path d="M7 16c4-1 6-4 11-9"/><path d="M14.5 6.5 18 7l-.5 3.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
  moon: '<path d="M15.5 4.2a8 8 0 1 0 4.3 12.6 6.5 6.5 0 0 1-4.3-12.6z"/>',
  tower: '<rect x="8.5" y="2.5" width="7" height="5" rx="1"/><rect x="8.5" y="7.5" width="7" height="5" rx="1"/><rect x="8.5" y="12.5" width="7" height="5" rx="1"/><path d="M12 17.5V21M8 21h8"/>',
  car: '<path d="M3 16.5V12.5L5.8 7.5h12.4L21 12.5v4z"/><path d="M3 12.5h18"/><circle cx="7.5" cy="17" r="2" fill="#ffffff"/><circle cx="16.5" cy="17" r="2" fill="#ffffff"/>',
  blank: '<path d="M10.7 20.9A9 9 0 1 1 13.3 20.9L12 19.3z" fill="#cbd5e1"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4M7 13.5h2M11 13.5h2M15 13.5h2M7 17h2M11 17h2"/>'
};
const glyph = (name, x, y, size, color) => `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GLYPHS[name]}</svg>`;

// ch22 最終測試：進料 → 分類機把晶片放進測試座 → 測試機做功能和電性測試（高溫、低溫各一次）→ 依速度或功耗分級；
// 有些產品另做系統級測試。取代原本三個方框的流程圖，三步順序保留
function finalTest(spec, en, kit) {
  const { L, t, para, breakAt, arrow, icon } = tools(spec, en, kit);
  const y0 = 12, chip = (x, y, w = 14, h = 9) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${INK_2}"/>`;
  let svg = '<g transform="translate(0 14)">';
  // ① 進料盤上的封裝好的晶片
  svg += `<rect x="22" y="${y0 + 66}" width="76" height="34" rx="3" fill="${LIGHT}" stroke="${INK_2}"/>` + [0, 1, 2].flatMap(i => [0, 1].map(j => chip(28 + i * 23, y0 + 71 + j * 14))).join('');
  svg += para(60, y0 + 118, L('packaged'), 90, 10.5, INK_2).svg + arrow(104, y0 + 84, 122, y0 + 84);
  // ② 分類機的軌道橫跨整條動線：取放手臂把晶片放進測試座，測完再依結果放進出料盒（技術審查後修正：晶片不經過測試機）
  const grip = (x, yb) => `<rect x="${x - 11}" y="${y0 + 24}" width="22" height="10" rx="2" fill="${MUTED}"/><path d="M${x} ${y0 + 34} V${yb}" stroke="${INK_2}" stroke-width="3"/><rect x="${x - 7}" y="${yb}" width="14" height="5" rx="1" fill="${MUTED}"/>` + chip(x - 7, yb + 6);
  svg += `<path d="M132 ${y0 + 28} H520" stroke="${INK_2}" stroke-width="5" stroke-linecap="round"/>` + grip(191, y0 + 62) + grip(465, y0 + 50);
  svg += `<rect x="140" y="${y0 + 92}" width="104" height="8" fill="#dcfce7" stroke="${GREEN}"/><rect x="176" y="${y0 + 80}" width="30" height="12" rx="2" fill="${AMBER_L}" stroke="${AMBER}"/>` + arrow(191, y0 + 70, 191, y0 + 80, AMBER, 1.2);
  svg += t(193, y0 + 10, L('handler'), 11.5, INK, 'middle', 700) + t(191, y0 + 114, L('socket'), 10.5, AMBER, 'middle', 600);
  // 高溫、低溫分別測試
  svg += icon('thermometer', 140, y0 + 46, 18, RED) + icon('snowflake', 158, y0 + 46, 18, BLUE) + para(140, y0 + 130, L('temps'), 136, 10, INK_2, 'start').svg;
  // ③ 測試機以纜線連到測試板，測試結果以虛線回報給分類機
  svg += `<path d="M244 ${y0 + 96} C262 ${y0 + 96} 266 ${y0 + 70} 290 ${y0 + 70}" fill="none" stroke="${INK_2}" stroke-width="2"/>`
    + `<rect x="290" y="${y0 + 40}" width="78" height="62" rx="4" fill="${LIGHT}" stroke="${INK_2}"/><rect x="298" y="${y0 + 48}" width="62" height="28" rx="2" fill="${BLUE_XL}" stroke="${BLUE}"/>` + icon('tester', 318, y0 + 51, 22, BLUE)
    + `<path d="M329 ${y0 + 40} V${y0 + 31}" stroke="${BLUE}" stroke-width="1.4" stroke-dasharray="2 2"/>`
    + t(329, y0 + 10, L('tester'), 11.5, INK, 'middle', 700) + para(329, y0 + 118, L('tests'), 110, 10.5, BLUE, 'middle', 600).svg;
  // ④ 依速度或功耗分級，放進不同的出料盒
  const bins = [[402, TEAL_L, TEAL], [446, BLUE_L, BLUE], [490, AMBER_XL, AMBER]];
  svg += bins.map(([x, f, s], i) => `<path d="M${x} ${y0 + 66} V${y0 + 100} H${x + 38} V${y0 + 66}" fill="${f}" stroke="${s}" stroke-width="1.4"/>` + Array.from({ length: 3 - i }, (_, k) => chip(x + 12, y0 + 90 - k * 10)).join('')).join('');
  const sp = para(465, y0 + 118, L('speedPower'), 150, 10, INK_2);
  svg += t(465, y0 + 10, L('binning'), 11.5, INK, 'middle', 700) + sp.svg + para(465, y0 + 118 + sp.height + 2, L('sold'), 150, 10.5, TEAL, 'middle', 600).svg;
  // 系統級測試：從分級之後另外拉出（不是只有某一級要做），放進接近真實產品的環境，執行實際的軟體
  const sx = 546;
  svg += `<path d="M465 ${y0 + 104} V${y0 + 108} H585 V${y0 + 104}" fill="none" stroke="${MUTED}" stroke-dasharray="3 3"/>` + arrow(585, y0 + 106, 585, y0 + 101, MUTED, 1.2)
    + `<rect x="${sx}" y="${y0 + 66}" width="78" height="34" rx="3" fill="${PINK_L}" stroke="${PINK}"/>` + chip(sx + 6, y0 + 78)
    + `<rect x="${sx + 26}" y="${y0 + 70}" width="46" height="26" rx="2" fill="#ffffff" stroke="${PINK}"/>` + [0, 1, 2].map(k => `<path d="M${sx + 31} ${y0 + 77 + k * 6} h${30 - k * 8}" stroke="${PINK}" stroke-width="1.4"/>`).join('');
  svg += breakAt(585, y0 + 44, L('slt'), '（', 78, 10.5, PINK, 'middle', 700).svg + para(585, y0 + 130, L('sltDo'), 78, 10, INK_2).svg + '</g>';
  return { svg, height: y0 + 186 };
}

// ch22 晶片怎麼老化：四種機制各畫一格小剖面，取代原本四分支的方框圖（四個機制名稱與結果都保留，改用正文原句）
function agingMechanisms(spec, en, kit) {
  const { L, t, para, lines, arrow, icon } = tools(spec, en, kit);
  const y0 = 12, cw = 146, gap = (608 - 4 * cw) / 3;
  let svg = `<rect x="16" y="${y0}" width="608" height="30" rx="6" fill="${AMBER_XL}" stroke="${AMBER}"/>` + t(320, y0 + 20, L('stress'), 12, AMBER, 'middle', 700);
  const top = y0 + 44, ah = 92;
  // 英文的接法照正文：電遷移與熱載子用逗號，介電層崩潰直接接成一句；中文每個標籤一行，長句在逗號後斷開，不把詞拆開
  const cells = [['em', ['emDo1', 'emDo2'], ', '], ['tddb', ['tddbDo1', 'tddbDo2'], ' '], ['hci', ['hciDo1', 'hciDo2'], ', '], ['bti', ['btiDo'], ' ']];
  const desc = (x, y, ks, sep) => en ? para(x, y, ks.map(L).join(sep), cw - 14, 10.5, INK_2) : lines(x, y, ks.flatMap(k => L(k).split(/(?<=，)/)), 10, INK_2, 'middle');
  const th = Math.max(...cells.map(([k]) => para(0, 0, L(k), cw - 12, 11, INK, 'middle', 700).height));
  const dh = Math.max(...cells.map(([, ks, sep]) => desc(0, 0, ks, sep).height));
  const art = [
    // 電遷移：電子沿導線流動，把金屬原子一路推走，上游端形成空洞；箭頭標明是電子（審查意見）
    (x, y) => `<rect x="${x + 14}" y="${y + 34}" width="118" height="18" fill="${COPPER}" stroke="${RED}"/><path d="M${x + 22} ${y + 34} h16 q4 9 0 18 h-16 z" fill="#ffffff" stroke="${RED}" stroke-width=".8"/>`
      + Array.from({ length: 9 }, (_, i) => `<circle cx="${x + 50 + i * 9}" cy="${y + 43 + (i % 2 ? 3 : -3)}" r="1.8" fill="${AMBER}"/>`).join('') + arrow(x + 30, y + 24, x + 120, y + 24, BLUE, 1.4) + t(x + 75, y + 16, L('electrons'), 10, BLUE, 'middle', 600),
    // 介電層崩潰：電場由閘極垂直穿過薄絕緣層，裡面逐漸連成一條擊穿路徑
    (x, y) => `<rect x="${x + 24}" y="${y + 20}" width="98" height="16" fill="${METAL_GATE}"/><rect x="${x + 24}" y="${y + 36}" width="98" height="8" fill="${AMBER_L}" stroke="${AMBER}"/><rect x="${x + 24}" y="${y + 44}" width="98" height="18" fill="${SI}" stroke="${INK_2}"/>`
      + [40, 58, 94, 108].map(dx => arrow(x + dx, y + 30, x + dx, y + 50, '#2563eb', 1.3)).join('') + `<path d="M${x + 74} ${y + 36} l3 2 l-3 2 l3 2 l-2 2" fill="none" stroke="${RED}" stroke-width="1.8"/>` + t(x + 73, y + 14, L('field'), 10, '#2563eb', 'middle', 600),
    // 熱載子效應：電子沿通道加速，在汲極附近有高能量的電子撞進閘極絕緣層
    (x, y) => `<rect x="${x + 14}" y="${y + 44}" width="118" height="22" fill="${SI}" stroke="${INK_2}"/><rect x="${x + 18}" y="${y + 44}" width="28" height="10" rx="3" fill="${BLUE_L}" stroke="${BLUE}"/><rect x="${x + 100}" y="${y + 44}" width="28" height="10" rx="3" fill="${BLUE_L}" stroke="${BLUE}"/>`
      + `<rect x="${x + 48}" y="${y + 38}" width="50" height="6" fill="${AMBER_L}" stroke="${AMBER}"/><rect x="${x + 48}" y="${y + 22}" width="50" height="16" fill="${METAL_GATE}"/>`
      + [56, 70, 84].map((dx, i) => `<circle cx="${x + dx}" cy="${y + 50}" r="${2 + i * 0.4}" fill="${BLUE}"/>`).join('') + arrow(x + 88, y + 49, x + 92, y + 41, RED, 1.6) + `<circle cx="${x + 92}" cy="${y + 40}" r="3" fill="${RED}"/>`,
    // 偏壓溫度不穩定：高溫加上閘極電壓，Vt 隨時間漂移（無刻度，兩軸標 Vt 與時間）
    (x, y) => `<rect x="${x + 14}" y="${y + 44}" width="66" height="22" fill="${SI}" stroke="${INK_2}"/><rect x="${x + 30}" y="${y + 38}" width="34" height="6" fill="${AMBER_L}" stroke="${AMBER}"/><rect x="${x + 30}" y="${y + 22}" width="34" height="16" fill="${METAL_GATE}"/>` + icon('thermometer', x + 10, y + 6, 18, RED)
      + `<path d="M${x + 47} ${y + 22} V${y + 12}" stroke="${INK_2}"/><path d="M${x + 41} ${y + 12} h12" stroke="${INK_2}" stroke-width="1.6"/>`
      + `<path d="M${x + 90} ${y + 14} V${y + 62} H${x + 136}" fill="none" stroke="${INK_2}"/><path d="M${x + 92} ${y + 54} C${x + 106} ${y + 44} ${x + 118} ${y + 30} ${x + 134} ${y + 24}" fill="none" stroke="${RED}" stroke-width="1.6"/>`
      + t(x + 94, y + 12, L('vt'), 9.5, INK_2, 'start', 700) + t(x + 136, y + 76, L('time'), 9.5, INK_2, 'end', 600)
  ];
  cells.forEach(([k, ks, sep], i) => {
    const x = 16 + i * (cw + gap);
    svg += card(x, top, cw, 14 + th + ah + dh + 10) + para(x + cw / 2, top + 20, L(k), cw - 12, 11, INK, 'middle', 700).svg + art[i](x, top + 10 + th) + desc(x + cw / 2, top + 14 + th + ah, ks, sep).svg;
    svg += `<path d="M${x + cw / 2} ${y0 + 30} V${top}" stroke="${AMBER}" stroke-dasharray="3 2"/>`;
  });
  return { svg, height: top + 14 + th + ah + dh + 18 };
}

// ch23 工廠裡的主要系統：MES 在中間，其他六個系統環繞；外圍以淡色虛線彼此相連，表示彼此互相配合，不是全部只聽 MES。
// 比喻用物件圖示，不用人物臉孔
function fabSystemsHub(spec, en, kit) {
  const { L, t, para, breakAt, icon } = tools(spec, en, kit);
  const y0 = 12, bw = 192, bx = [16, 432];
  const nodes = [
    ['eap', 'eapA', ['eapD', 'eapD2'], 'network'], ['amhs', 'amhsA', ['amhsD', 'amhsD2'], 'oht', ' '], ['disp', 'dispA', ['dispD'], 'dispatch'],
    ['rms', 'rmsA', ['rmsD'], 'books'], ['pcs', 'pcsA', ['pcsD2'], 'control-limit'], ['yas', 'yasA', ['yasD'], 'search']
  ];
  // 英文接成一句；中文每個標籤各自成段，長的 MES 說明在「下一步」前斷開
  const dutyBlock = (x, y, ks, sep = ', ', width, anchor = 'start') => {
    if (en) return para(x, y, ks.map(L).join(sep), width, 10, INK_2, anchor);
    let yy = y, o = '';
    ks.forEach(k => { const p = k === 'mesD' ? breakAt(x, yy, L(k), '下一步', width, 10, INK_2, anchor) : para(x, yy, L(k), width, 10, INK_2, anchor); o += p.svg; yy += p.height; });
    return { svg: o, height: yy - y };
  };
  const nh = Math.max(...nodes.map(([a, b, ks, , sep]) => 16 + para(0, 0, L(a), bw - 44, 11, INK, 'start', 700).height + para(0, 0, L(b), bw - 44, 10.5, TEAL, 'start', 600).height + dutyBlock(0, 0, ks, sep, bw - 16).height + 6));
  const gy = 12, ys = i => y0 + (i % 3) * (nh + gy);
  const H = 3 * nh + 2 * gy;
  // 中央：MES
  const mx = 238, mw = 164;
  const mt = para(mx + mw / 2, 0, L('mes'), mw - 20, 12, INK, 'middle', 700), ma = para(mx + mw / 2, 0, L('mesA'), mw - 20, 11, TEAL, 'middle', 700), md = dutyBlock(mx + mw / 2, 0, ['mesD', 'mesD2'], ', ', mw - 16, 'middle');
  const mh = 46 + mt.height + ma.height + md.height, my = y0 + (H - mh) / 2;
  let svg = '';
  // 連線：MES 到每個系統（實線），外圍相鄰系統之間（淡色虛線）
  nodes.forEach((_, i) => { const x = i < 3 ? bx[0] + bw : bx[1], y = ys(i) + nh / 2; svg += `<path d="M${x} ${y} L${i < 3 ? mx : mx + mw} ${my + mh / 2}" stroke="${TEAL}" stroke-width="1.3"/>`; });
  [0, 1, 3, 4].forEach(i => { const x = (i < 3 ? bx[0] : bx[1]) + bw / 2; svg += `<path d="M${x} ${ys(i) + nh} V${ys(i + 1)}" stroke="${MUTED}" stroke-dasharray="3 3"/>`; });
  svg += card(mx, my, mw, mh, TEAL_XL, TEAL) + icon('modules', mx + mw / 2 - 13, my + 8, 26, TEAL)
    + para(mx + mw / 2, my + 48, L('mes'), mw - 20, 12, INK, 'middle', 700).svg + para(mx + mw / 2, my + 48 + mt.height, L('mesA'), mw - 20, 11, TEAL, 'middle', 700).svg
    + dutyBlock(mx + mw / 2, my + 52 + mt.height + ma.height, ['mesD', 'mesD2'], ', ', mw - 16, 'middle').svg;
  // 跨欄虛線：外圍系統也彼此配合，例如機台自動化系統向 Recipe 管理系統取得 Recipe
  svg += `<path d="M${bx[0] + bw - 30} ${ys(0)} C${bx[0] + bw - 10} ${y0 - 8} ${bx[1] + 10} ${y0 - 8} ${bx[1] + 30} ${ys(0)}" fill="none" stroke="${MUTED}" stroke-width="1.3" stroke-dasharray="4 3"/>`;
  nodes.forEach(([a, b, ks, ic, sep], i) => {
    const x = i < 3 ? bx[0] : bx[1], y = ys(i);
    const p1 = para(x + 38, y + 18, L(a), bw - 44, 11, INK, 'start', 700), p2 = para(x + 38, y + 18 + p1.height, L(b), bw - 44, 10.5, TEAL, 'start', 600);
    svg += card(x, y, bw, nh) + icon(ic, x + 8, y + 8, 22, TEAL) + p1.svg + p2.svg + dutyBlock(x + 8, y + 22 + p1.height + p2.height, ks, sep, bw - 16).svg;
  });
  const yn = y0 + H + 22;
  svg += t(320, yn, L('notAll'), 11, MUTED, 'middle', 600);
  return { svg, height: yn + 10 };
}

// ch23 一批晶圓到站：六格依序，每格上方標當時負責的系統（技術審查修正：一格可標兩個系統，角色與本段時序圖一致）
function lotArrival(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const y0 = 12, cw = 196, gx = 10;
  const sys = { amhs: TEAL, eq: INK_2, eap: BLUE, mes: PINK, fdc: AMBER };
  const tag = (x, y, keys) => { let xx = x, o = ''; keys.forEach(k => { const w = [...L(k)].reduce((s, ch) => s + (/[⺀-鿿]/.test(ch) ? 10.6 : 5.8), 0) + 12; o += `<rect x="${xx}" y="${y - 12}" width="${w}" height="16" rx="8" fill="#ffffff" stroke="${sys[k]}"/>` + t(xx + w / 2, y, L(k), 10, sys[k], 'middle', 700); xx += w + 4; }); return o; };
  const head = para(320, y0 + 14, L('example'), 600, 11.5, INK, 'middle', 700);
  let svg = head.svg;
  const qs = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
  const steps = [
    { sys: ['amhs', 'eq'], text: [['placedRead']] },
    { sys: ['mes', 'eap'], text: qs.map(q => [q, 'check']) },
    { sys: ['mes', 'eap'], text: [['download'], ['trackIn', 'bold']] },
    { sys: ['eq', 'fdc'], text: [['start', 'bold'], ['toFdc']] },
    { sys: ['eap', 'mes'], text: [['trackOut', 'bold'], ['items'], ['record']] },
    { sys: ['mes', 'amhs'], text: [['next'], ['deliver'], ['stocker']] }
  ];
  const txt = k => k === 'placedRead' ? `${L('placed')}${en ? ', ' : '，'}${L('readId')}` : L(k);
  const textH = st => st.text.reduce((h, [k, kind]) => h + para(0, 0, txt(k), kind === 'check' ? cw - 30 : cw - 16, kind === 'check' ? 9.5 : 10.5).height + 3, 0);
  const rows = [steps.slice(0, 3), steps.slice(3)];
  const art = [
    (x, y) => icon('oht', x + 22, y - 2, 24, TEAL) + arrow(x + 34, y + 22, x + 34, y + 28, TEAL, 1.2) + icon('loadport', x + 20, y + 28, 26, INK_2) + `<rect x="${x + 70}" y="${y + 18}" width="34" height="14" rx="2" fill="#ffffff" stroke="${INK_2}"/>` + [0, 2, 3, 5, 6, 8].map(k => `<path d="M${x + 74 + k * 3} ${y + 21} v8" stroke="${INK}" stroke-width="${k % 3 ? 1 : 1.8}"/>`).join(''),
    () => '',
    (x, y) => icon('books', x + 20, y + 6, 30, PINK) + arrow(x + 56, y + 21, x + 98, y + 21, BLUE, 1.6) + icon('etch', x + 104, y + 4, 34, INK_2),
    (x, y) => icon('etch', x + 16, y + 4, 36, INK_2) + `<path d="M${x + 56} ${y + 22} H${x + 102}" stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="4 3"/>` + arrow(x + 96, y + 22, x + 104, y + 22, AMBER, 1.6)
      + `<rect x="${x + 106}" y="${y + 6}" width="56" height="34" rx="3" fill="#ffffff" stroke="${AMBER}"/><path d="M${x + 110} ${y + 30} L${x + 122} ${y + 24} L${x + 132} ${y + 28} L${x + 144} ${y + 16} L${x + 158} ${y + 20}" fill="none" stroke="${AMBER}" stroke-width="1.4"/>`,
    (x, y) => `<rect x="${x + 22}" y="${y + 2}" width="62" height="42" rx="3" fill="#ffffff" stroke="${PINK}"/>` + [0, 1, 2, 3].map(k => `<path d="M${x + 28} ${y + 11 + k * 9} h${42 - (k % 2) * 12}" stroke="${PINK}" stroke-width="1.4"/>`).join('') + icon('check', x + 96, y + 10, 26, GREEN),
    (x, y) => icon('oht', x + 12, y + 8, 26, TEAL) + arrow(x + 42, y + 18, x + 92, y + 8, TEAL, 1.4) + arrow(x + 42, y + 24, x + 92, y + 36, TEAL, 1.4) + icon('single-wafer', x + 96, y - 4, 24, INK_2) + icon('stocker', x + 96, y + 26, 24, INK_2)
  ];
  let y = y0 + 16 + head.height + 6;
  rows.forEach((row, r) => {
    const rh = Math.max(...row.map((st, c) => 30 + (r === 0 && c === 1 ? 0 : 62) + textH(st))) + 10;
    row.forEach((st, c) => {
      const i = r * 3 + c, x = 16 + c * (cw + gx);
      svg += card(x, y, cw, rh) + `<circle cx="${x + 14}" cy="${y + 16}" r="8" fill="${TEAL}"/>` + t(x + 14, y + 19.5, String.fromCharCode(65 + i), 9.5, '#ffffff', 'middle', 700) + tag(x + 28, y + 20, st.sys) + art[i](x, y + 30);
      let yy = y + 30 + (i === 1 ? 6 : 64);
      st.text.forEach(([k, kind]) => {
        if (kind === 'check') { const p = para(x + 26, yy, L(k), cw - 30, 9.5, INK, 'start'); svg += tick(x + 14, yy - 3, 0.7) + p.svg; yy += p.height + 3; return; }
        const p = para(x + cw / 2, yy, txt(k), cw - 16, 10.5, kind === 'bold' ? PINK : INK_2, 'middle', kind === 'bold' ? 700 : 400); svg += p.svg; yy += p.height + 3;
      });
      if (c < 2) svg += arrow(x + cw + 1, y + rh / 2, x + cw + gx - 1, y + rh / 2);
    });
    if (r === 0) { const from = 16 + 2 * (cw + gx) + cw / 2, to = 16 + cw / 2, yb = y + rh; svg += `<path d="M${from} ${yb} V${yb + 8} H${to} V${yb + 14}" fill="none" stroke="${TEAL}" stroke-width="1.5"/>` + arrow(to, yb + 10, to, yb + 17); }
    y += rh + 20;
  });
  return { svg, height: y - 10 };
}

// ch24 ECC：兩種粒子打翻同一個位元（軟錯誤）；體質較弱的單元只畫成陣列中較淡的一格、不加箭頭，和軟錯誤分開標
// （技術審查修正）。中段是資料加檢查位元，右段是兩種結果，下方是晶片內部與系統層級的 ECC 兩件事
function eccSoftErrors(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const y0 = 12, cell = (x, y, kind) => `<rect x="${x}" y="${y}" width="16" height="12" rx="2" fill="${kind === 'flip' ? '#ffffff' : kind === 'weak' ? '#ccfbf1' : TEAL_L}" stroke="${kind === 'flip' ? RED : kind === 'weak' ? MUTED : TEAL}" stroke-width="${kind === 'flip' ? 1.8 : 0.8}"${kind === 'weak' ? ' stroke-dasharray="2 2"' : ''}/>`;
  let svg = `<rect x="26" y="${y0 + 58}" width="196" height="104" rx="6" fill="${LIGHT}" stroke="${INK_2}" stroke-width="1.4"/>`;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) svg += cell(42 + c * 21, y0 + 70 + r * 18, r === 1 && c === 5 ? 'flip' : r === 3 && c === 1 ? 'weak' : '');
  const fx = 42 + 5 * 21 + 8, fy = y0 + 70 + 18 + 6;
  // 宇宙射線的粒子從上方射入；封裝材料的放射性物質從封裝內部發出
  svg += arrow(fx + 34, y0 + 24, fx + 3, fy - 5, RED, 1.6) + `<circle cx="${fx - 46}" cy="${y0 + 150}" r="5" fill="${AMBER_L}" stroke="${AMBER}"/>` + [0, 120, 240].map(a => `<path d="M${fx - 46} ${y0 + 150} l${(7 * Math.cos((a - 90) * Math.PI / 180)).toFixed(1)} ${(7 * Math.sin((a - 90) * Math.PI / 180)).toFixed(1)}" stroke="${AMBER}" stroke-width="2.4"/>`).join('')
    + arrow(fx - 40, y0 + 145, fx - 4, fy + 5, AMBER, 1.6);
  svg += para(fx + 40, y0 + 22, L('cosmic'), 110, 10.5, RED, 'start', 600).svg + para(26, y0 + 184, L('radio'), 196, 10.5, AMBER, 'start', 600).svg;
  svg += para(26, y0 + 22, L('flip'), 160, 11, RED, 'start', 700).svg + t(fx - 22, y0 + 50, L('soft'), 11, RED, 'end', 800) + `<path d="M${fx - 20} ${y0 + 47} L${fx - 2} ${fy - 6}" stroke="${RED}" stroke-dasharray="2 2"/>`;
  const yw = y0 + 184 + para(0, 0, L('radio'), 196, 10.5).height + 4;
  const weak = para(40, yw + 4, L('weak'), 180, 10, MUTED, 'start');
  svg += cell(22, yw - 6, 'weak') + weak.svg;
  // 中段：資料後面接檢查位元
  const mx = 250, my = y0 + 92;
  svg += Array.from({ length: 8 }, (_, i) => cell(mx + i * 14 - 1, my, '').replace('width="16"', 'width="12"')).join('') + Array.from({ length: 3 }, (_, i) => `<rect x="${mx + 112 + i * 14}" y="${my}" width="12" height="12" rx="2" fill="${AMBER_L}" stroke="${AMBER}"/>`).join('');
  svg += t(mx + 52, my - 8, L('data'), 10.5, TEAL, 'middle', 700) + t(mx + 132, my - 8, L('check'), 10.5, AMBER, 'middle', 700) + arrow(mx + 160, my + 6, mx + 182, my - 14) + arrow(mx + 160, my + 6, mx + 182, my + 30);
  // 右段：少量錯誤可以更正；錯誤太多只能偵測
  const rx = 440, row = (y, bad) => Array.from({ length: 8 }, (_, i) => `<rect x="${rx + i * 11}" y="${y}" width="9" height="9" rx="1.5" fill="${bad.includes(i) ? '#fee2e2' : TEAL_L}" stroke="${bad.includes(i) ? RED : TEAL}" stroke-width=".8"/>`).join('');
  svg += row(y0 + 64, [3]) + tick(rx + 102, y0 + 70, 0.9) + para(rx, y0 + 92, L('correct'), 184, 10.5, GREEN, 'start', 600).svg;
  svg += row(y0 + 124, [3, 4]) + `<path d="M${rx + 98} ${y0 + 134} l7 -12 l7 12 z" fill="#fef3c7" stroke="${AMBER}" stroke-width="1.3" stroke-linejoin="round"/><path d="M${rx + 105} ${y0 + 126} v4 M${rx + 105} ${y0 + 132} v.4" stroke="${AMBER}" stroke-width="1.6" stroke-linecap="round"/>`
    + para(rx, y0 + 152, L('tooMany'), 184, 10.5, AMBER, 'start', 600).svg;
  // 下方：晶片內部的 ECC 與系統層級的 ECC 是兩件事
  const yb = Math.max(yw + 4 + weak.height, y0 + 152 + para(0, 0, L('tooMany'), 184, 10.5).height) + 22;
  svg += `<path d="M16 ${yb - 12} H624" stroke="${LINE}"/>`;
  svg += `<rect x="40" y="${yb}" width="150" height="54" rx="4" fill="${LIGHT}" stroke="${INK_2}"/><rect x="50" y="${yb + 36}" width="42" height="12" rx="2" fill="${AMBER_L}" stroke="${AMBER}"/><rect x="420" y="${yb}" width="150" height="54" rx="4" fill="${LIGHT}" stroke="${INK_2}"/><rect x="430" y="${yb + 36}" width="42" height="12" rx="2" fill="${AMBER_L}" stroke="${AMBER}"/>`
    + `<path d="M295 ${yb + 18} h20 M295 ${yb + 26} h20 M312 ${yb + 12} l-14 20" stroke="${INK_2}" stroke-width="2" stroke-linecap="round"/>`;
  const d1 = para(48, yb + 14, L('onDie'), 140, 10, INK, 'start', 600), d2 = para(428, yb + 14, L('sysEcc'), 140, 10, INK, 'start', 600);
  svg += d1.svg + d2.svg + t(305, yb + 48, L('differ'), 10.5, INK_2, 'middle', 600);
  return { svg, height: yb + 62 };
}

// ch24 Errata 與晶片改版：字母改版與數字改版各改到哪幾層。光罩畫成同樣大小，只差張數（技術審查修正）；
// 剖面裡電晶體是基板上的薄層，上面疊多層金屬。取代原本兩欄的方框圖，八項說明都改用正文原句保留
function steppingLayers(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const y0 = 12, HOT = '#dc2626';
  const panel = (x, kind) => {
    const letter = kind === 'letter';
    const title = para(x + 148, y0 + 20, L(letter ? 'letter' : 'number'), 280, 12, INK, 'middle', 700);
    const sy = y0 + 20 + title.height + 8;
    let o = title.svg;
    // 剖面：基板、電晶體薄層、六層金屬
    o += `<rect x="${x + 14}" y="${sy + 66}" width="150" height="16" fill="${SI}" stroke="${INK_2}"/>`;
    o += `<rect x="${x + 14}" y="${sy + 58}" width="150" height="8" fill="${TEAL_L}" stroke="${letter ? HOT : TEAL}" stroke-width="${letter ? 2 : 1}"/>` + [30, 62, 94, 126].map(dx => `<rect x="${x + dx}" y="${sy + 55}" width="8" height="3" fill="${METAL_GATE}"/>`).join('');
    for (let k = 0; k < 6; k++) {
      const yk = sy + 48 - k * 9, red = letter ? k < 4 : k >= 4;
      o += `<rect x="${x + 14}" y="${yk}" width="150" height="9" fill="#f1f5f9" stroke="${INK_2}" stroke-width=".5"/>` + [24, 56, 92, 128].map(dx => `<rect x="${x + dx + (k % 2) * 8}" y="${yk + 3}" width="${20 - (k % 3) * 4}" height="3" fill="${red ? '#fecaca' : COPPER}" stroke="${red ? HOT : RED}" stroke-width=".4"/>`).join('');
      if (red) o += `<rect x="${x + 14}" y="${yk}" width="150" height="9" fill="none" stroke="${HOT}" stroke-width="1.4"/>`;
    }
    if (!letter) {
      // 備用的邏輯閘（虛線）預先做在電晶體層；新的金屬連線（紅色虛線）只在上層，經由通孔接下去
      o += [44, 112].map(dx => `<rect x="${x + dx}" y="${sy + 58}" width="12" height="8" fill="none" stroke="${HOT}" stroke-dasharray="2 1.5"/>`).join('') + `<path d="M${x + 118} ${sy + 58} V${sy + 21}" stroke="${COPPER}" stroke-width="2.4"/><path d="M${x + 118} ${sy + 21} V${sy + 8} H${x + 150}" fill="none" stroke="${HOT}" stroke-width="1.6" stroke-dasharray="4 2"/>`;
    }
    // 光罩：同樣大小，下層那疊張數多
    const deck = (dx, dy, n, red) => Array.from({ length: n }, (_, i) => `<rect x="${x + dx + i * 2}" y="${dy - i * 3}" width="34" height="20" rx="1.5" fill="${red(i) ? '#fee2e2' : '#ffffff'}" stroke="${red(i) ? HOT : INK_2}" stroke-width=".9"/>`).join('');
    o += deck(196, sy + 66, 10, () => letter) + deck(246, sy + 34, 4, i => letter ? i < 2 : i >= 2);
    o += lead(x + 166, sy + 62, x + 194, sy + 70) + lead(x + 166, sy + 26, x + 244, sy + 40);
    return { svg: o, sy };
  };
  const a = panel(16, 'letter'), b = panel(328, 'number');
  const sy = a.sy, ly = sy + 104;
  // 左：字母改變；右：數字改變（各自的說明，正文原句）
  const block = (cx, rows) => { let yy = ly, o = ''; rows.forEach(([text, size, color, weight]) => { const p = para(cx, yy, text, 280, size, color, 'middle', weight); o += p.svg; yy += p.height + 2; }); return { svg: o, y: yy }; };
  const lb = block(164, [[L('letterDo'), 10.5, INK, 600], [L('remade'), 10.5, HOT, 700]]);
  const rb = block(476, [[L('numberDo'), 10.5, INK, 600], [L('fewMasks'), 10.5, HOT, 700], [L('connect'), 10.5, INK_2, 400], [L('save'), 10.5, GREEN, 700]]);
  const pH = Math.max(lb.y, rb.y) - y0 + 4;
  let svg = card(16, y0, 296, pH) + card(328, y0, 296, pH) + a.svg + b.svg + lb.svg + rb.svg;
  // 層與光罩的名稱：放在兩張卡片下方一列，以色塊對應
  let y = y0 + pH + 22;
  const legend = [[TEAL_L, TEAL, 'transistors', ''], ['#f1f5f9', INK_2, 'metal', ''], ['#ffffff', INK_2, 'masks', ''], ['none', HOT, 'spare', ' stroke-dasharray="2 1.5"']];
  const lg = legend.map(([, , k]) => para(0, 0, L(k), 124, 10.5, INK_2, 'start', 600).height);
  svg += legend.map(([f, s, k, dash], i) => `<rect x="${24 + i * 152}" y="${y - 10}" width="16" height="12" rx="2" fill="${f}" stroke="${s}"${dash}/>` + para(46 + i * 152, y, L(k), 124, 10.5, INK_2, 'start', 600).svg).join('');
  y += Math.max(...lg) - 13.65;
  const most = para(24, y + 20, en ? `${L('transMasks')} ${L('mostMasks')}, ${L('longest')}` : `${L('transMasks')}${L('mostMasks')}，${L('longest')}`, 590, 10.5, INK_2, 'start');
  svg += most.svg;
  // 下方時間軸：晶圓先停在金屬層之前，修正版光罩一到就繼續生產
  y += 20 + most.height + 22;
  svg += `<path d="M16 ${y - 14} H624" stroke="${LINE}"/>`;
  svg += [0, 1, 2].map(i => `<ellipse cx="${40 + i * 12}" cy="${y + 14}" rx="12" ry="5" fill="#e2e8f0" stroke="${INK_2}"/>`).join('') + `<path d="M${88} ${y} V${y + 28}" stroke="${HOT}" stroke-width="2.4"/>`;
  const park = para(100, y + 6, L('park'), 200, 10.5, INK, 'start', 600);
  svg += park.svg + `<rect x="318" y="${y}" width="30" height="18" rx="1.5" fill="#fee2e2" stroke="${HOT}"/>` + arrow(352, y + 9, 376, y + 9);
  const arrive = para(384, y + 6, L('arrive'), 236, 10.5, INK, 'start', 600);
  svg += arrive.svg;
  y += Math.max(park.height, arrive.height, 28) + 14;
  svg += t(320, y, L('vary'), 10.5, MUTED, 'middle');
  return { svg, height: y + 10 };
}

// 附錄 行話：晶圓與批次。上排是一個 Lot 從投片到 Fab Out：淡色虛線框是晶圓廠，晶圓從右緣穿出（2.22.0 審查修正）；
// 下排是站點前排隊的 WIP 與插隊的 Hot Lot，右下是三種特別的晶圓
function lotJourney(spec, en, kit) {
  const { L, t, para, breakAt, arrow, icon } = tools(spec, en, kit);
  const y0 = 12, wafer = (x, y, fill = '#e2e8f0', stroke = INK_2) => `<ellipse cx="${x}" cy="${y}" rx="12" ry="4" fill="${fill}" stroke="${stroke}"/>`;
  const foup = (x, y, s = 30, c = TEAL) => icon('foup', x, y, s, c);
  const cy = y0 + 56;
  // 晶圓廠：淡色虛線框，右上角放廠房小圖示
  let svg = `<rect x="18" y="${y0 + 2}" width="388" height="${cy + 70 - y0 - 2}" rx="10" fill="${LIGHT}" stroke="${MUTED}" stroke-dasharray="5 4"/>` + icon('fab', 380, y0 + 8, 18, MUTED);
  // 投片 → Lot（最多 25 片）→ Split 成幾組、各做不同條件 → Merge → Bank → Fab Out；投片的名稱放在晶圓上方，不和 Lot 的說明擠在一起
  const st = breakAt(0, 0, L('start'), '（', 88, 10.5);
  svg += [0, 1, 2].map(i => wafer(46, cy - 6 + i * 6)).join('') + arrow(64, cy, 84, cy) + breakAt(24, cy - 24 - (st.height - 13.65), L('start'), '（', 88, 10.5, INK, 'start', 700).svg;
  svg += foup(90, cy - 18, 36) + t(108, cy + 34, L('lot'), 11, TEAL, 'middle', 700) + para(108, cy + 48, L('lotDef'), 96, 10, INK_2).svg + arrow(130, cy, 150, cy);
  const groups = [[TEAL_L, TEAL], [BLUE_L, BLUE], [AMBER_L, AMBER]];
  svg += groups.map(([f, s], i) => { const gy = cy - 26 + i * 26; return `<path d="M152 ${cy} Q166 ${gy} 178 ${gy}" fill="none" stroke="${s}" stroke-width="1.3"/>` + wafer(190, gy, f, s) + `<rect x="${206}" y="${gy - 8}" width="26" height="16" rx="2" fill="#ffffff" stroke="${s}"/><path d="M232 ${gy} Q250 ${gy} 262 ${cy}" fill="none" stroke="${s}" stroke-width="1.3"/>`; }).join('');
  svg += t(190, cy - 40, L('split'), 11, INK, 'middle', 700) + t(276, cy - 20, L('merge'), 11, INK, 'middle', 700) + foup(262, cy - 10, 26) + arrow(292, cy, 312, cy);
  // Bank：停在某一站前面等待，暫停符號放在框的上方
  svg += `<rect x="316" y="${cy - 20}" width="44" height="40" rx="4" fill="none" stroke="${MUTED}" stroke-dasharray="4 3"/>` + foup(322, cy - 15, 30) + `<path d="M335 ${cy - 34} v10 M341 ${cy - 34} v10" stroke="${INK_2}" stroke-width="2.4"/>` + t(338, cy + 34, L('bank'), 11, INK, 'middle', 700);
  // Fab Out：晶圓穿出晶圓廠的右緣
  svg += arrow(364, cy, 426, cy, TEAL, 1.6) + wafer(442, cy) + t(442, cy + 24, L('fabOut'), 11, INK, 'middle', 700);
  // 下列：站點前排隊的 WIP、Move 計數、Hot Lot 從超車車道插隊
  const ry = y0 + 200;
  svg += `<path d="M16 ${ry - 46} H624" stroke="${LINE}"/>`;
  svg += `<path d="M30 ${ry + 18} H250 M30 ${ry - 16} H250" stroke="${LINE}" stroke-width="10" stroke-linecap="round"/>` + [40, 76, 112, 148].map(x => foup(x, ry + 3, 28, MUTED)).join('')
    + `<rect x="256" y="${ry - 2}" width="70" height="38" rx="4" fill="${LIGHT}" stroke="${INK_2}"/>` + icon('etch', 274, ry + 4, 26, INK_2)
    + `<path d="M296 ${ry - 12} h28 v12" fill="none" stroke="${INK_2}"/>` + [0, 1, 2, 3].map(k => `<path d="M${300 + k * 5} ${ry - 9} v6" stroke="${INK}" stroke-width="1.4"/>`).join('') + `<path d="M298 ${ry - 3} L318 ${ry - 9}" stroke="${INK}" stroke-width="1.2"/>`;
  svg += foup(150, ry - 30, 26, RED) + arrow(184, ry - 18, 246, ry - 18, RED, 2) + arrow(184, ry - 13, 240, ry - 13, RED, 1.2);
  svg += t(96, ry + 54, L('wip'), 11, INK, 'middle', 700) + t(312, ry - 22, L('move'), 11, INK, 'start', 700) + t(144, ry - 24, L('hot'), 11, RED, 'end', 700);
  // 右下：三種特別的晶圓；擋片畫成插進晶舟空槽的灰色晶圓，兩旁是產品晶圓
  const lx = 372, leg = [['monitor', x => wafer(x, ry, '#ffffff', TEAL) + `<path d="M${x - 9} ${ry + 9} h18 M${x - 9} ${ry + 7} v4 M${x} ${ry + 8} v3 M${x + 9} ${ry + 7} v4" stroke="${TEAL}"/>`],
    ['dummy', x => `<path d="M${x - 17} ${ry - 13} V${ry + 13} M${x + 17} ${ry - 13} V${ry + 13}" stroke="${INK_2}" stroke-width="1.6"/>` + [-8, 0, 8].map(d => `<path d="M${x - 17} ${ry + d} h3 M${x + 17} ${ry + d} h-3" stroke="${INK_2}"/>`).join('')
      + [[-8, '#e2e8f0'], [0, '#94a3b8'], [8, '#e2e8f0']].map(([d, f]) => `<ellipse cx="${x}" cy="${ry + d}" rx="12" ry="2.6" fill="${f}" stroke="${INK_2}"/>`).join('')],
    ['broken', x => wafer(x, ry) + `<path d="M${x - 4} ${ry - 4} l3 3 l-2 2 l4 3" fill="none" stroke="${RED}" stroke-width="1.6"/>`]];
  svg += leg.map(([k, draw], i) => { const x = lx + 22 + i * 86; return draw(x) + t(x, ry + 26, L(k), 10.5, INK, 'middle', 600); }).join('');
  return { svg, height: ry + 66 };
}

// 附錄 行話：機台。行話各在機台的哪個位置（俯視示意，不代表特定機種）。技術審查修正：綁機畫成晶圓盒以鎖鏈連到數台曝光機中指定的一台；
// 狀態燈只是示意：燈塔由上而下紅、黃、綠，掛在機台側面，閒置用黃燈、Down 用紅燈，綠燈不加標籤；PM 之後經 Seasoning、Qual、復機回到綠燈（2.22.0 審查修正）
function toolJargon(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const y0 = 12;
  let svg = '';
  // 機台俯視：前方 Load Port、中央傳送腔與手臂、後方 A、B 兩個腔體
  const tx = 40, ty = y0 + 26;
  svg += `<rect x="${tx}" y="${ty}" width="250" height="170" rx="8" fill="${LIGHT}" stroke="${INK_2}" stroke-width="1.4"/>`;
  svg += `<circle cx="${tx + 125}" cy="${ty + 92}" r="34" fill="#ffffff" stroke="${INK_2}"/><path d="M${tx + 125} ${ty + 92} l18 -18 l14 6" fill="none" stroke="${INK_2}" stroke-width="3" stroke-linecap="round"/>`;
  const ch = (x, label, hi) => `<rect x="${x}" y="${ty + 12}" width="70" height="44" rx="6" fill="${hi ? TEAL_L : '#ffffff'}" stroke="${hi ? TEAL : INK_2}" stroke-width="${hi ? 1.8 : 1}"/>` + t(x + 35, ty + 40, label, 14, hi ? TEAL : INK_2, 'middle', 800);
  svg += ch(tx + 30, 'A', false) + ch(tx + 150, 'B', true);
  // Chamber 標在兩個腔體之間，左右各一個箭頭指向 A、B
  svg += t(tx + 125, ty + 32, L('chamber'), 10, INK_2, 'middle', 600) + arrow(tx + 117, ty + 42, tx + 102, ty + 42, MUTED, 1) + arrow(tx + 133, ty + 42, tx + 148, ty + 42, MUTED, 1);
  svg += `<rect x="${tx + 70}" y="${ty + 136}" width="110" height="30" rx="3" fill="#ffffff" stroke="${INK_2}"/>` + icon('foup', tx + 110, ty + 136, 28, TEAL);
  svg += t(tx + 125, ty + 186, L('loadPort'), 11, INK, 'middle', 700);
  svg += para(tx + 185, y0 + 14, L('bQuote'), 200, 10.5, TEAL, 'middle', 600).svg;
  // 側面控制面板：Recipe
  svg += `<rect x="${tx + 252}" y="${ty + 70}" width="26" height="46" rx="3" fill="#ffffff" stroke="${INK_2}"/>` + icon('books', tx + 254, ty + 80, 22, PINK) + t(tx + 284, ty + 98, L('recipe'), 11, PINK, 'start', 700);
  // 燈塔：由上而下紅、黃、綠，支架接到機台側面
  const lx = tx + 258, ly = ty - 2;
  svg += `<path d="M${lx + 9} ${ly + 48} V${ly + 60} H${tx + 250}" fill="none" stroke="${INK_2}" stroke-width="2"/>` + [['#f87171', RED], ['#fde047', AMBER], ['#4ade80', GREEN]].map(([f, s], i) => `<rect x="${lx}" y="${ly + i * 16}" width="18" height="16" rx="2" fill="${f}" stroke="${s}"/>`).join('');
  svg += t(lx + 24, ly + 12, L('down'), 10.5, RED, 'start', 700) + t(lx + 24, ly + 28, L('idle'), 10.5, AMBER, 'start', 700);
  // 右側：PM 之後依序 Seasoning、Qual、復機，再回到綠燈
  const px = 420, steps = [['pm', 'wrench', INK_2], ['seasoning', 'blank', MUTED], ['qual', 'check', GREEN], ['backUp', 'output', TEAL]];
  steps.forEach(([k, ic, c], i) => {
    const y = y0 + 20 + i * 44;
    svg += `<rect x="${px}" y="${y}" width="150" height="32" rx="6" fill="#ffffff" stroke="${c}"/>` + (GLYPHS[ic] ? glyph : icon)(ic, px + 8, y + 5, 22, c) + t(px + 38, y + 21, L(k), 11, INK, 'start', 700);
    if (i < 3) svg += arrow(px + 75, y + 32, px + 75, y + 44, c, 1.3);
  });
  svg += `<path d="M${px} ${y0 + 168} H${px - 28} V${ly + 40} H${lx + 30}" fill="none" stroke="${TEAL}" stroke-width="1.3" stroke-dasharray="4 3"/>` + arrow(lx + 30, ly + 40, lx + 20, ly + 40, TEAL, 1.3);
  svg += para(px + 75, y0 + 196, `${L('pm')}${en ? ': ' : '：'}${L('pmDef')}`, 200, 10, INK_2).svg;
  // 下方：綁機，晶圓盒以鎖鏈連到數台曝光機中指定的一台
  const dy = y0 + 236;
  svg += `<path d="M16 ${dy - 14} H624" stroke="${LINE}"/>` + icon('foup', 40, dy + 4, 32, TEAL) + `<path d="M76 ${dy + 20} H${236}" stroke="${INK_2}" stroke-width="2" stroke-dasharray="6 3"/>` + icon('lock', 140, dy + 8, 22, INK_2);
  svg += [0, 1, 2].map(i => `<rect x="${244 + i * 66}" y="${dy}" width="54" height="40" rx="4" fill="${i === 0 ? TEAL_XL : LIGHT}" stroke="${i === 0 ? TEAL : MUTED}" stroke-width="${i === 0 ? 1.8 : 1}"/>` + icon('litho', 258 + i * 66, dy + 6, 26, i === 0 ? TEAL : MUTED)).join('');
  svg += t(452, dy + 16, L('dedication'), 11, INK, 'start', 700) + para(452, dy + 32, L('dedDef'), 172, 10, INK_2, 'start').svg;
  return { svg, height: dy + 58 };
}

// 附錄 行話：系統與流程。上面是系統的紀錄、下面是實際的晶圓：出站後經過 Q-Time，等到下一站進站。Hold 畫成主流程上方的獨立狀態，
// 可由多處進入（技術審查修正），Release 接回下一站的進站；帳實不符畫在右側獨立的插圖框，不接流程箭頭（2.22.0 審查修正）
function systemVsPhysical(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const y0 = 12, hy = y0 + 22, sy = y0 + 86, py = sy + 84, le = 484;
  let svg = `<rect x="16" y="${sy - 26}" width="${le - 16}" height="52" rx="8" fill="${BLUE_XL}" stroke="${BLUE}" stroke-opacity=".5"/><rect x="16" y="${py - 26}" width="${le - 16}" height="52" rx="8" fill="${TEAL_XL}" stroke="${TEAL}" stroke-opacity=".5"/>`;
  const pl = para(0, 0, L('physical'), 118, 10.5);
  svg += icon('modules', 22, sy - 11, 22, BLUE) + t(48, sy + 4, L('system'), 11, BLUE, 'start', 700) + icon('foup', 22, py - 11, 22, TEAL) + para(48, py + 4 - (pl.height - 13.65) / 2, L('physical'), 118, 10.5, TEAL, 'start', 700).svg;
  const node = (x, y, k, c, w = 78) => { return `<rect x="${x - w / 2}" y="${y - 14}" width="${w}" height="28" rx="14" fill="#ffffff" stroke="${c}" stroke-width="1.4"/>` + para(x, y + 4 - (para(0, 0, L(k), w - 8, 10).height > 14 ? 6 : 0), L(k), w - 8, 10, INK, 'middle', 700).svg; };
  // 派工 → 進站 →（實際跑貨）→ 出站 → Q-Time 沙漏 → 下一站進站
  svg += node(134, sy, 'dispatch', BLUE, 70) + arrow(169, sy, 183, sy, BLUE) + node(222, sy, 'trackIn', BLUE);
  svg += arrow(222, sy + 14, 222, py - 14, INK_2, 1.2) + node(222, py, 'run', TEAL) + arrow(222, py - 14, 296, sy + 13, INK_2, 1.2) + node(314, sy, 'trackOut', BLUE);
  svg += `<path d="M353 ${sy} H365" stroke="${BLUE}" stroke-width="1.5"/><path d="M365 ${sy - 12} h14 l-14 24 h14 z" fill="${AMBER_XL}" stroke="${AMBER}"/>` + arrow(379, sy, 399, sy, BLUE) + node(438, sy, 'trackIn', BLUE);
  const q = para(0, 0, `${L('qtime')}${en ? ': ' : '：'}${L('qtimeDef')}`, 176, 10);
  svg += para(372, sy + 46 - (q.height - 13) / 2, `${L('qtime')}${en ? ': ' : '：'}${L('qtimeDef')}`, 176, 10, AMBER, 'middle', 600).svg;
  // Hold：主流程上方的獨立狀態，從多處以虛線進入；Release 接回下一站的進站
  const hx = 250, hb = hy + 16, mid = (hb + sy - 14) / 2;
  svg += `<rect x="${hx - 48}" y="${hy - 16}" width="96" height="32" rx="6" fill="#fff1f2" stroke="${RED}"/>` + icon('lock', hx - 40, hy - 10, 20, RED) + t(hx - 14, hy + 4, L('hold'), 11, RED, 'start', 700)
    + arrow(hx + 48, hy, hx + 68, hy, INK_2, 1.3) + `<rect x="${hx + 68}" y="${hy - 16}" width="110" height="32" rx="6" fill="#f0fdf4" stroke="${GREEN}"/>` + icon('check', hx + 76, hy - 10, 20, GREEN) + t(hx + 102, hy + 4, L('release'), 11, GREEN, 'start', 700);
  const hd = para(0, 0, L('holdDef'), 170, 10);
  svg += para(hx - 56, hy + 4 - (hd.height - 13) / 2, L('holdDef'), 170, 10, INK_2, 'end').svg;
  svg += [[134, sy - 14], [222, sy - 14], [314, sy - 14], [372, sy - 12]].map(([x, y]) => `<path d="M${x} ${y} C${x} ${mid} ${hx} ${mid} ${hx} ${hb + 7}" fill="none" stroke="${RED}" stroke-dasharray="3 3"/>`).join('') + arrow(hx, hb + 8, hx, hb, RED, 1.2);
  svg += `<path d="M${hx + 178} ${hy} Q438 ${hy} 438 ${hy + 10} V${sy - 22}" fill="none" stroke="${GREEN}" stroke-dasharray="3 3"/>` + arrow(438, sy - 24, 438, sy - 14, GREEN, 1.2);
  // 帳實不符：右側獨立插圖，系統顯示已出站，晶圓卻還在機台裡
  const mx = 559, c = (sy + py) / 2, ex = para(mx, py + 44, L('mismatchEx'), 114, 10, RED, 'middle', 600);
  svg += `<rect x="494" y="${hy - 16}" width="130" height="${py + 39 + ex.height - (hy - 16)}" rx="8" fill="#ffffff" stroke="${RED}" stroke-opacity=".55"/>` + t(mx, hy + 4, L('mismatch'), 11, RED, 'middle', 800);
  svg += `<rect x="${mx - 57}" y="${sy - 14}" width="114" height="28" rx="14" fill="#ffffff" stroke="${BLUE}"/>` + t(mx - 7, sy + 4, L('trackOut'), 9.5, BLUE, 'middle', 700) + tick(mx + 45, sy - 1, 0.8);
  svg += `<path d="M${mx} ${sy + 14} V${c - 12} M${mx} ${c + 12} V${py - 20}" stroke="${RED}" stroke-width="1.6" stroke-dasharray="3 3"/><path d="M${mx - 8} ${c - 4} h16 M${mx - 8} ${c + 4} h16 M${mx + 6} ${c - 9} l-12 18" stroke="${RED}" stroke-width="1.8"/>`;
  svg += `<rect x="${mx - 32}" y="${py - 20}" width="64" height="40" rx="5" fill="${LIGHT}" stroke="${INK_2}" stroke-width="1.3"/><rect x="${mx - 24}" y="${py - 13}" width="48" height="26" rx="3" fill="#ffffff" stroke="${INK_2}"/>` + [-4, 4].map(d => `<ellipse cx="${mx}" cy="${py + d}" rx="17" ry="3" fill="#fee2e2" stroke="${RED}"/>`).join('');
  return { svg: svg + ex.svg, height: Math.max(py + 34, py + 39 + ex.height) + 6 };
}

// 附錄 行話：品質與異常。管制界限與規格畫成兩把獨立的尺，不表示內外關係（技術審查修正）：超出管制界限是 OOC，照 OCAP 處理；
// 超出規格是 OOS，開 MRB 決定重工、特採放行或報廢（三個出口用藍、綠、紅區分）。Map 指整片晶圓圖，刮痕與微粒是圖上的圖樣
function oocOos(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const y0 = 12;
  const chart = (x, y, kind) => {
    const dashed = kind === 'cl';
    let o = `<rect x="${x}" y="${y}" width="150" height="72" rx="4" fill="#ffffff" stroke="${LINE}"/><path d="M${x + 6} ${y + 36} H${x + 144}" stroke="${TEAL}"/>`;
    o += `<path d="M${x + 6} ${y + 16} H${x + 144} M${x + 6} ${y + 56} H${x + 144}" stroke="${dashed ? AMBER : INK_2}" stroke-width="1.4"${dashed ? ' stroke-dasharray="5 3"' : ''}/>`;
    o += [12, 30, 48, 66, 84, 102].map((dx, i) => `<circle cx="${x + dx + 6}" cy="${y + 36 + [-6, 4, -3, 7, -5, 2][i]}" r="2.6" fill="${TEAL}"/>`).join('') + `<circle cx="${x + 132}" cy="${y + 9}" r="3.4" fill="${RED}"/>`;
    return o;
  };
  let svg = chart(16, y0 + 30, 'cl') + chart(16, y0 + 150, 'spec');
  svg += t(16, y0 + 22, L('cl'), 10.5, AMBER, 'start', 700) + t(16, y0 + 142, L('spec'), 10.5, INK_2, 'start', 700);
  svg += t(176, y0 + 52, L('ooc'), 13, RED, 'start', 800) + para(176, y0 + 68, L('oocDef'), 120, 10, INK_2, 'start').svg + arrow(232, y0 + 48, 262, y0 + 48, RED) + `<rect x="266" y="${y0 + 34}" width="110" height="28" rx="6" fill="${AMBER_XL}" stroke="${AMBER}"/>` + t(321, y0 + 52, L('ocap'), 10.5, AMBER, 'middle', 700);
  svg += t(176, y0 + 172, L('oos'), 13, RED, 'start', 800) + para(176, y0 + 188, L('oosDef'), 120, 10, INK_2, 'start').svg + arrow(232, y0 + 168, 262, y0 + 168, RED);
  // MRB：圓桌加座位，三個出口
  const mx = 300, my = y0 + 168;
  svg += `<circle cx="${mx}" cy="${my}" r="20" fill="${PINK_L}" stroke="${PINK}"/>` + [0, 72, 144, 216, 288].map(a => `<circle cx="${(mx + 26 * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(my + 26 * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="4" fill="#ffffff" stroke="${PINK}"/>`).join('') + t(mx, my + 4, L('mrb'), 10.5, PINK, 'middle', 800);
  const exits = [['rework', BLUE, -34], ['concession', GREEN, 0], ['scrap', RED, 34]];
  svg += exits.map(([k, c, dy]) => arrow(mx + 32, my + dy * 0.3, mx + 66, my + dy, c, 1.4) + t(mx + 72, my + dy + 4, L(k), 10.5, c, 'start', 700)).join('');
  // 右上：Excursion 閃電
  const ex = 470;
  svg += `<path d="M${ex} ${y0 + 20} l-12 22 h10 l-8 20 l20 -26 h-10 l8 -16 z" fill="${AMBER_L}" stroke="${RED}" stroke-width="1.4" stroke-linejoin="round"/>` + t(ex + 20, y0 + 38, L('excursion'), 12, RED, 'start', 800) + para(ex + 20, y0 + 56, L('excDef'), 130, 10, INK_2, 'start').svg;
  // 右下：整片晶圓圖叫 Map，上面的刮痕與微粒是圖樣；微粒的引線從右下方進來，避開缺口
  const wx = 548, wy = y0 + 124;
  svg += waferTop(wx, wy, 44, '#f8fafc') + `<path d="M${wx - 26} ${wy - 16} q22 8 40 30" fill="none" stroke="${INK}" stroke-width="1.6"/>` + [[14, -20], [22, -6], [-10, 18], [6, 26], [-24, 6]].map(([dx, dy]) => `<circle cx="${wx + dx}" cy="${wy + dy}" r="2" fill="${RED}"/>`).join('');
  svg += t(wx - 50, wy - 46, L('map'), 12, INK, 'end', 800) + `<path d="M${wx - 48} ${wy - 44} L${wx - 34} ${wy - 30}" stroke="${MUTED}" stroke-dasharray="2 2"/>`
    + t(wx - 52, wy + 6, L('scratch'), 10.5, INK, 'end', 600) + `<path d="M${wx - 50} ${wy + 2} L${wx - 16} ${wy - 6}" stroke="${MUTED}" stroke-dasharray="2 2"/>`
    + t(wx + 30, wy + 62, L('particle'), 10.5, RED, 'middle', 600) + `<path d="M${wx + 24} ${wy + 52} L${wx + 8} ${wy + 29}" stroke="${MUTED}" stroke-dasharray="2 2"/>`;
  return { svg, height: y0 + 236 };
}

// 附錄 行話：區域與人。區域方塊只是示意，不代表實際廠區配置；黃光區用黃色描邊與底色區分，燈具的光錐照在曝光機上。職能徽章只畫工具小圖，
// 不畫人臉；交接畫在前後兩個班別（日、月）之間，不連在任何兩個職能之間（技術審查修正）
function areasPeople(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const y0 = 12, aw = 196, gx = 10;
  const areas = [['photo', 'photoDef', AMBER, 'litho', '#eab308', '#fefce8'], ['furnace', 'furnaceDef', RED, 'furnace', RED, '#ffffff'], ['wet', 'wetDef', BLUE, 'clean', BLUE, '#ffffff']];
  const dh = Math.max(...areas.map(([, d]) => para(0, 0, L(d), aw - 16, 10).height));
  let svg = '';
  areas.forEach(([n, d, c, ic, stroke, fill], i) => {
    const x = 16 + i * (aw + gx);
    svg += `<rect x="${x}" y="${y0}" width="${aw}" height="${76 + dh}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`;
    if (i === 0) svg += `<path d="M${x + 24} ${y0 + 9} h12 l13 41 h-38 z" fill="#fde047" fill-opacity=".5"/><rect x="${x + 20}" y="${y0 + 4}" width="20" height="5" rx="2" fill="#facc15" stroke="${AMBER}" stroke-width=".8"/>`;
    svg += icon(ic, x + 12, y0 + 12, 36, c) + t(x + 58, y0 + 36, L(n), 13, c, 'start', 800) + para(x + 10, y0 + 66, L(d), aw - 16, 10, INK_2, 'start').svg;
  });
  // 四個職能徽章：PE 調參數、EE 扳手、PIE 拼圖、YE 上升的良率曲線
  const by = y0 + 76 + dh + 26;
  const roles = [['pe', 'sliders'], ['ee', 'wrench'], ['pie', 'puzzle'], ['ye', 'rise']];
  svg += roles.map(([k, ic], i) => { const x = 40 + i * 92; return `<circle cx="${x + 28}" cy="${by + 22}" r="22" fill="${TEAL_XL}" stroke="${TEAL}" stroke-width="1.4"/>` + (GLYPHS[ic] ? glyph : icon)(ic, x + 18, by + 6, 20, TEAL) + t(x + 28, by + 38, L(k), 10.5, TEAL, 'middle', 800); }).join('');
  svg += para(196, by + 64, L('roles'), 360, 10.5, INK_2).svg;
  // 交接：前後兩個班別之間（日班交給夜班）
  const hx = 432;
  svg += `<rect x="${hx - 8}" y="${by - 8}" width="${624 - hx + 8}" height="90" rx="8" fill="${LIGHT}" stroke="${LINE}"/>` + glyph('sun', hx + 6, by + 4, 30, AMBER) + arrow(hx + 44, by + 19, hx + 116, by + 19, TEAL, 2) + glyph('moon', hx + 122, by + 4, 30, BLUE);
  svg += t(hx + 80, by + 12, L('handover'), 11, TEAL, 'middle', 800) + para(hx + 4, by + 52, L('handoverDef'), 180, 10, INK_2, 'start').svg;
  return { svg, height: by + 90 };
}

// 附錄 延伸閱讀：產業標準。八個標準各掛在哪幾章（點陣對照：橫向是相關章節，資料出自本段表格）。同一列有兩章時只畫兩顆實心點，不畫連線
function standardsMap(spec, en, kit) {
  const { L, t, para, icon } = tools(spec, en, kit);
  const y0 = 12, cols = [['ch1', 1], ['ch18', 18], ['ch20', 20], ['ch22', 22], ['ch23', 23]], cx0 = 420, cs = 46;
  const rows = [['s1', 'c1', [1], 'particle'], ['s2', 'c2', [1, 23], 'tower'], ['s3', 'c3', [23], 'network'], ['s4', 'c4', [20], 'drop'], ['s5', 'c5', [20], 'box'], ['s6', 'c6', [18], 'tag'], ['s7', 'c7', [22], 'shield-check'], ['s8', 'c8', [22], 'car']];
  let svg = t(cx0 + 2 * cs, y0 + 14, L('related'), 11, INK, 'middle', 700) + cols.map(([k], i) => t(cx0 + i * cs, y0 + 34, L(k), 11, TEAL, 'middle', 800)).join('');
  let y = y0 + 46;
  rows.forEach(([s, c, chs, ic], i) => {
    const p = para(52, y + 32, L(c), 330, 10, INK_2, 'start'), rh = Math.max(40, 24 + p.height + 4);
    if (i % 2 === 0) svg += `<rect x="16" y="${y}" width="608" height="${rh}" fill="${LIGHT}"/>`;
    svg += (GLYPHS[ic] ? glyph : icon)(ic, 22, y + 8, 22, TEAL) + t(52, y + 18, L(s), 11, INK, 'start', 700) + p.svg;
    svg += cols.map(([, n], j) => `<circle cx="${cx0 + j * cs}" cy="${y + rh / 2}" r="${chs.includes(n) ? 7 : 2}" fill="${chs.includes(n) ? TEAL : LINE}"/>`).join('');
    y += rh;
  });
  return { svg, height: y + 10 };
}

// ── F 批：正文數值校勘後補畫 ──

// ch14 真實微縮標尺與 DTCO／STCO 條例總覽（計畫 P051）：CPP 與第一層金屬最小節距的表列典型值畫在同一條從 0 nm 起的線性軸上，
// 虛線標出「3nm」這個節點名稱的位置，對照真正的節距。技術審查修正：兩組各用一色，第三段各照正文標籤（2nm/A14 與 1.4nm/A14 預估），
// 不暗示同一世代；預估值畫成空心虛線。圖中不放單一晶圓廠的製程名稱，世代只寫 2nm、1.4nm。3nm 與 2nm 的 CPP 相同，旁邊標出正文的說明。
// 數值文字加白邊，避免被格線穿過。下段保留被取代方框圖的軌道高度、DTCO 與 STCO。2.23.0 正文數值校勘核可後才畫
function cppScale(spec, en, kit) {
  const { L, t, para, lines } = tools(spec, en, kit);
  const halo = (x, y, text, size, fill, anchor, weight) => t(x, y, text, size, fill, anchor, weight).replace('<text ', '<text stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke" ');
  const y0 = 12, xl = 168, X = v => xl + v * 7, sep = en ? ': ' : '：';
  // 節距記號：兩端短豎線加一條連線，不用箭頭（小圖裡箭頭會疊在一起）
  const pitch = (x1, y1, x2, y2, c) => x1 === x2
    ? `<path d="M${x1 - 3} ${y1} h6 M${x1 - 3} ${y2} h6 M${x1} ${y1} V${y2}" stroke="${c}" stroke-width="1.2"/>`
    : `<path d="M${x1} ${y1 - 3} v6 M${x2} ${y1 - 3} v6 M${x1} ${y1} H${x2}" stroke="${c}" stroke-width="1.2"/>`;
  const minis = {
    // CPP：鰭上三支閘極，標出相鄰兩支的中心距（X 方向）
    gates: (x, y) => `<rect x="${x + 2}" y="${y + 18}" width="44" height="8" fill="${SI}" stroke="${INK_2}" stroke-width=".6"/>` + [8, 21, 34].map(d => `<rect x="${x + d}" y="${y + 9}" width="6" height="21" rx="1" fill="${TEAL_L}" stroke="${TEAL}"/>`).join('') + pitch(x + 11, y + 4, x + 24, y + 4, TEAL),
    // M1P：三條最底層金屬線，標出相鄰兩條的中心距（Y 方向）
    metal: (x, y) => [4, 15, 26].map(d => `<rect x="${x + 2}" y="${y + d}" width="36" height="5" rx="1" fill="${BLUE_L}" stroke="${BLUE}"/>`).join('') + pitch(x + 44, y + 6.5, x + 44, y + 17.5, BLUE),
    // 軌道高度：單元外框內的軌道，右側標單元高度
    tracks: (x, y) => `<rect x="${x + 2}" y="${y + 2}" width="36" height="30" fill="#ffffff" stroke="${INK_2}"/>` + [8, 14, 20, 26].map(d => `<path d="M${x + 5} ${y + d} H${x + 35}" stroke="${MUTED}" stroke-dasharray="3 2"/>`).join('') + pitch(x + 44, y + 2, x + 44, y + 32, INK_2)
  };
  let svg = t(16, y0 + 12, L('metrics'), 12, INK, 'start', 800);
  let y = y0 + 26;
  const groups = [
    ['cpp', 'cppAbbr', 'cppItem', 'cppNote', TEAL_L, TEAL, 'gates', [['g7', 54, 57, 'v7c'], ['g3', 45, 50, 'v3c'], ['g2', 45, 50, 'v3c']], true],
    ['m1p', 'm1pAbbr', 'm1pItem', 'm1pNote', BLUE_L, BLUE, 'metal', [['g7', 36, 40, 'v7m'], ['g3e', 23, 30, 'v3m'], ['g14', 20, 22, 'v14', true]]]
  ];
  const zones = [];
  groups.forEach(([n, ab, it, nt, f, s, mini, rows, stall]) => {
    svg += minis[mini](16, y) + t(72, y + 12, `${L(n)}${en ? ' (' : '（'}${L(ab)}${en ? ')' : '）'}`, 11.5, s, 'start', 800) + t(624, y + 12, L(nt), 10, s, 'end', 600) + t(72, y + 27, L(it), 10, INK_2, 'start');
    let ry = y + 50;
    const top = ry - 10;
    rows.forEach(([g, a, b, v, proj]) => {
      svg += t(xl - 10, ry + 4, proj ? `${L(g)}${en ? ', ' : '（'}${L('proj')}${en ? '' : '）'}` : L(g), 10.5, INK, 'end', 700)
        + `<rect x="${X(a)}" y="${ry - 5}" width="${X(b) - X(a)}" height="10" rx="2" fill="${proj ? '#ffffff' : f}" stroke="${s}" stroke-width="${proj ? 1.4 : 1}"${proj ? ' stroke-dasharray="3 2"' : ''}/>`
        + halo(X(b) + 6, ry + 3.5, L(v), 9.5, INK_2, 'start', 600);
      ry += 20;
    });
    // 3nm 與 2nm 的 CPP 相同：左側括號加正文的說明
    if (stall) svg += `<path d="M${X(45) - 5} ${y + 65} h-4 V${y + 95} h4" fill="none" stroke="${s}" stroke-width="1.2"/>` + halo(X(45) - 14, y + 84, L('stall'), 10, s, 'end', 700);
    zones.push([top, ry - 10]);
    y = ry + 6;
  });
  // 刻度格線只畫在色條所在的兩區；軸每 10 nm 一格，只標正文出現過的數字
  const ay = y + 2, ticks = [0, 10, 20, 30, 40, 50, 60];
  const grid = zones.map(([a, b]) => ticks.map(v => `<path d="M${X(v)} ${a} V${b}" stroke="${LINE}" stroke-dasharray="2 3"/>`).join('')).join('');
  svg = grid + svg;
  svg += `<path d="M${X(0)} ${ay} H${X(60)}" stroke="${INK_2}"/>` + ticks.map(v => `<path d="M${X(v)} ${ay} v4" stroke="${INK_2}"/>`).join('')
    + [[0, 'a0'], [20, 'a20'], [40, 'a40']].map(([v, k]) => t(X(v), ay + 15, L(k), 9.5, MUTED, 'middle', 600)).join('') + t(X(60) + 8, ay + 4, L('nm'), 9.5, MUTED, 'start', 600);
  // 3nm 的位置：虛線穿過兩區色條直到軸上，下方寫這是商業命名
  svg += zones.map(([a, b]) => `<path d="M${X(3)} ${a} V${b}" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="4 3"/>`).join('') + `<path d="M${X(3)} ${zones[1][1]} V${ay}" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="4 3"/>`
    + `<path d="M${X(3)} ${ay + 1} l-4 7 h8 z" fill="${AMBER}"/>` + t(X(3) + 8, ay + 30, `${L('g3')}${sep}${L('myth')}`, 10, AMBER, 'start', 700);
  // 軌道高度：單元高度等於軌道數乘金屬節距
  const yt = ay + 44;
  svg += minis.tracks(16, yt) + t(72, yt + 12, L('track'), 11.5, INK, 'start', 800) + t(624, yt + 12, L('trackNote'), 10, INK_2, 'end', 600)
    + t(72, yt + 27, L('trackItem'), 10, INK_2, 'start') + t(72, yt + 41, L('trackT'), 10, INK_2, 'start');
  // 下段：DTCO 與 STCO 兩張卡
  const yd = yt + 56;
  svg += `<path d="M16 ${yd} H624" stroke="${LINE}"/>` + t(16, yd + 20, L('dtcoStco'), 12, INK, 'start', 800);
  const cy = yd + 30, cw = 300;
  const cardArt = [
    // DTCO：電晶體下方的埋入電源軌（紅）
    (x, y) => `<rect x="${x + 10}" y="${y + 22}" width="40" height="8" fill="${SI}" stroke="${INK_2}" stroke-width=".6"/>` + [16, 34].map(d => `<rect x="${x + d}" y="${y + 10}" width="8" height="12" rx="1" fill="${TEAL_L}" stroke="${TEAL}"/>`).join('') + `<rect x="${x + 10}" y="${y + 31}" width="40" height="4" fill="${RED}"/>`,
    // STCO：功能不同的小晶片放在同一片基底上
    (x, y) => `<rect x="${x + 8}" y="${y + 28}" width="44" height="6" fill="${SI}" stroke="${INK_2}"/>` + [[10, DIE_C], [24, BLUE_L], [38, AMBER_L]].map(([d, f]) => `<rect x="${x + d}" y="${y + 14}" width="12" height="13" fill="${f}" stroke="${INK_2}"/>`).join('')
  ];
  // 英文 DTCO 的說明在 via 前斷行，不把 3D 和 cell-level 拆開
  const note = (x, yy, k) => { const s = L(k), i = en ? s.indexOf(' via ') : -1; return i > 0 ? lines(x, yy, [s.slice(0, i), s.slice(i + 1)], 10, TEAL, 'start', 600) : para(x, yy, s, cw - 72, 10, TEAL, 'start', 600); };
  const cards = [['dtco', 'dtcoItem', 'dtcoNote'], ['stco', 'stcoItem', 'stcoNote']].map(([k, it, nt]) => [k, para(0, 0, L(it), cw - 72, 10), note(0, 0, nt), it, nt]);
  const ch = Math.max(...cards.map(([, a, b]) => 24 + a.height + b.height + 8), 46);
  cards.forEach(([k, a, , it, nt], i) => {
    const x = 16 + i * (cw + 8);
    svg += card(x, cy, cw, ch) + cardArt[i](x, cy + 2) + t(x + 62, cy + 18, L(k), 11.5, INK, 'start', 800)
      + para(x + 62, cy + 34, L(it), cw - 72, 10, INK_2, 'start').svg + note(x + 62, cy + 34 + a.height, nt).svg;
  });
  return { svg, height: cy + ch + 8 };
}

// ── 第 3 階段 F 批：ch00–ch01（每筆提案先經動筆前技術審查，再依修正指示畫）──

// 文字寬度估計（中文全形一字寬、其他約 0.56 字寬），用來排膠囊與圖例的位置
const textW = (s, size) => [...s].reduce((w, ch) => w + (/[⺀-鿿＀-￯]/.test(ch) ? 1 : 0.56), 0) * size;
// 粗體標題後面接一段一般字重的副標，副標用 tspan 接在同一行
const headline = (kit, x, y, title, sub, c) => `<text x="${x}" y="${y}" text-anchor="start" fill="${c}" font-size="13" font-weight="800">${kit.esc(title)}<tspan dx="8" fill="${INK_2}" font-size="11" font-weight="600">${kit.esc(sub)}</tspan></text>`;

// ch00 一片晶圓的旅程：三張數據卡。數量沿用正文的文字說法，不換成阿拉伯數字；月份畫成沒有數字的月曆
function scaleTiles(spec, en, kit) {
  const { L, para, icon } = tools(spec, en, kit);
  const y0 = 12, cw = 196, gap = 10, bs = en ? 15 : 18;
  const cards = [['transistor', 'chipLead', 'transistors', 'unitTr'], ['route', 'waferLead', 'steps', 'unitSt'], ['calendar', null, 'months', 'usable']];
  const parts = cards.map(([ic, lead, big, tail]) => ({ ic, lead, big, tail, lp: lead ? para(0, 0, L(lead), cw - 60, 10.5) : { height: 0 }, bp: para(0, 0, L(big), cw - 28, bs), tp: para(0, 0, L(tail), cw - 28, 11) }));
  const top = Math.max(38, ...parts.map(p => p.lp.height + 14));
  const h = Math.max(...parts.map(p => top + 10 + p.bp.height + p.tp.height)) + 12;
  let svg = '';
  parts.forEach(({ ic, lead, big, tail, bp }, i) => {
    const x = 16 + i * (cw + gap), by = y0 + top + 10 + bs;
    svg += card(x, y0, cw, h, TEAL_XL, TEAL) + (GLYPHS[ic] ? glyph : icon)(ic, x + 12, y0 + 10, 26, TEAL);
    if (lead) svg += para(x + 46, y0 + 24, L(lead), cw - 60, 10.5, INK_2, 'start', 600).svg;
    svg += para(x + 14, by, L(big), cw - 28, bs, TEAL, 'start', 800).svg + para(x + 14, by + bp.height - bs * 1.3 + 18, L(tail), cw - 28, 11, INK, 'start', 600).svg;
  });
  return { svg, height: y0 + h + 8 };
}

// ch00 前段與後段：上排是最常見的分法，前段＝晶圓製造、後段＝封裝與測試；下排把前段的晶圓放大成剖面，
// 說明晶圓廠內部的另一種用法（FEOL 做電晶體、BEOL 做金屬導線）。技術審查修正：後段只畫到「可以焊到電路板上的晶片」，
// 焊上電路板不算後段的一步；接觸窗畫成細柱但不標、不畫 MOL；不寫章號。取代原本的兩欄方框圖，八項資訊都保留
function frontBack(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const y0 = 12, y1 = y0 + 18, ph = 132;
  const head = (x, y, k, sub, c) => headline(kit, x, y, L(k), L(sub), c);
  let svg = t(16, y0 + 8, L('common'), 10.5, MUTED, 'start', 700);
  // 左：前段，一片晶圓與花費的時間
  const wx = 66, wy = y1 + 82;
  svg += card(16, y1, 284, ph, '#ffffff', BLUE) + head(30, y1 + 22, 'fe', 'feSub', BLUE)
    + waferTop(wx, wy, 34, '#f8fafc') + fullDies(wx, wy, 30, 6).map(c => `<rect x="${c.x + 0.8}" y="${c.y + 0.8}" width="${c.s - 1.6}" height="${c.s - 1.6}" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".5"/>`).join('');
  const fn = para(114, y1 + 50, L('feNote'), 176, 10.5, INK, 'start', 600);
  const mt = para(114, y1 + 56 + fn.height, L('most'), 176, 10.5, TEAL, 'start', 700);
  svg += fn.svg + mt.svg + icon('clock', 114, y1 + 52 + fn.height + mt.height, 16, TEAL) + para(134, y1 + 64 + fn.height + mt.height, L('months'), 156, 10.5, TEAL, 'start', 600).svg;
  // 右：後段，測試 → 切割 → 封裝 → 可以焊到電路板上的晶片
  const rx = 316, sy = y1 + 46;
  svg += card(rx, y1, 308, ph, '#ffffff', AMBER) + head(rx + 14, y1 + 22, 'be', 'beSub', AMBER);
  const steps = [
    x => `<rect x="${x + 4}" y="${sy}" width="40" height="6" rx="1" fill="${INK_2}"/>` + [14, 24, 34].map(d => `<path d="M${x + d} ${sy + 6} l-3 16" stroke="${INK}" stroke-width="1.2"/>`).join('') + `<ellipse cx="${x + 24}" cy="${sy + 26}" rx="22" ry="5" fill="#f8fafc" stroke="${INK_2}"/>`,
    x => `<ellipse cx="${x + 24}" cy="${sy + 26}" rx="22" ry="5" fill="#f8fafc" stroke="${INK_2}"/><path d="M${x + 24} ${sy + 22} v9" stroke="${RED}" stroke-width="1.6"/><circle cx="${x + 24}" cy="${sy + 11}" r="11" fill="#cbd5e1" stroke="${INK_2}"/><circle cx="${x + 24}" cy="${sy + 11}" r="3" fill="#ffffff" stroke="${INK_2}"/>`,
    x => `<rect x="${x + 4}" y="${sy + 22}" width="40" height="6" fill="${SI}" stroke="${INK_2}"/><rect x="${x + 14}" y="${sy + 16}" width="20" height="6" fill="${DIE_C}" stroke="${INK_2}"/><path d="M${x + 8} ${sy + 22} V${sy + 10} H${x + 40} V${sy + 22}" fill="none" stroke="${INK_2}"/>`,
    x => `<rect x="${x + 6}" y="${sy + 6}" width="36" height="24" rx="2" fill="#475569"/>` + [12, 20, 28, 36].map(d => `<path d="M${x + d} ${sy + 30} v4 M${x + d} ${sy + 6} v-4" stroke="${INK_2}" stroke-width="1.4"/>`).join('')
  ];
  ['test', 'cut', 'pack'].forEach((k, i) => { const x = rx + 14 + i * 64; svg += steps[i](x) + t(x + 24, sy + 52, L(k), 10.5, INK, 'middle', 600) + arrow(x + 50, sy + 18, x + 62, sy + 18, AMBER, 1.3); });
  svg += steps[3](rx + 206) + para(rx + 232, sy + 52, L('chip'), 100, 10, INK, 'middle', 600).svg;
  // 放大框：從前段的晶圓拉出剖面，說明晶圓廠內部的 FEOL／BEOL
  const y2 = y1 + ph + 26, zh2 = 124;
  svg += `<path d="M${wx - 24} ${wy + 24} L16 ${y2} M${wx + 24} ${wy + 24} L132 ${y2}" stroke="${MUTED}" stroke-dasharray="3 3"/>`
    + `<rect x="16" y="${y2}" width="608" height="${zh2}" rx="8" fill="${TEAL_XL}" stroke="${TEAL}" stroke-dasharray="5 3"/>` + t(28, y2 + 18, L('inside'), 11, TEAL, 'start', 700);
  const cs = 40, ce = 380, sb = y2 + 112;
  svg += `<rect x="${cs}" y="${sb - 18}" width="${ce - cs}" height="18" fill="${SI}" stroke="${INK_2}"/>`;
  const gates = [70, 130, 190, 250, 310];
  svg += gates.map(g => `<rect x="${g - 14}" y="${sb - 18}" width="8" height="5" fill="${TEAL_L}"/><rect x="${g + 6}" y="${sb - 18}" width="8" height="5" fill="${TEAL_L}"/><rect x="${g - 6}" y="${sb - 30}" width="12" height="12" fill="${METAL_GATE}"/>`).join('');
  svg += gates.map(g => `<path d="M${g - 10} ${sb - 18} V${sb - 42} M${g} ${sb - 30} V${sb - 42} M${g + 10} ${sb - 18} V${sb - 42}" stroke="${INK_2}" stroke-width="1.2"/>`).join('');
  const metal = (y, h, segs) => segs.map(([a, b]) => `<rect x="${a}" y="${y}" width="${b - a}" height="${h}" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".6"/>`).join('');
  // 第一層金屬：每顆電晶體的源極、閘極、汲極各接一小段，彼此分開；第二、三層才把不同電晶體的節點連起來（F1 審查修正：原本三根接觸連在同一段，等於短路）
  svg += metal(sb - 46, 4, gates.flatMap(g => [[g - 13, g - 7], [g - 3, g + 3], [g + 7, g + 13]])) + metal(sb - 60, 6, [[74, 136], [194, 256], [294, 372]]) + metal(sb - 80, 9, [[52, 210], [222, 376]]);
  svg += [[78, sb - 54, 8], [128, sb - 54, 8], [198, sb - 54, 8], [248, sb - 54, 8], [298, sb - 54, 8], [102, sb - 71, 11], [224, sb - 71, 11], [338, sb - 71, 11]].map(([x, y, h]) => `<rect x="${x}" y="${y}" width="4" height="${h}" fill="${AMBER}"/>`).join('');
  const bk = (y1b, y2b) => `<path d="M392 ${y1b} h8 V${y2b} h-8" fill="none" stroke="${TEAL}" stroke-width="1.4"/>`;
  svg += bk(sb - 80, sb - 46) + bk(sb - 31, sb) + t(410, sb - 66, L('beol'), 11, INK, 'start', 700) + t(410, sb - 52, L('beolD'), 10, INK_2, 'start') + t(410, sb - 17, L('feol'), 11, INK, 'start', 700) + t(410, sb - 3, L('feolD'), 10, INK_2, 'start');
  svg += t(320, y2 + zh2 + 20, L('ctx'), 10.5, INK_2, 'middle', 600);
  return { svg, height: y2 + zh2 + 30 };
}

// ch00 工廠裡的三個基本單位：Lot 是一盒晶圓、Route 是一條路線、Recipe 是某一站機台用的參數；比喻小圖各放在自己那一格下方。
// 技術審查修正：晶圓盒內晶圓分格平放、彼此不接觸；Recipe 畫成機台的參數畫面而不是手轉旋鈕，參數不填數值
function threeUnits(spec, en, kit) {
  const { L, t, para, breakAt, arrow } = tools(spec, en, kit);
  const y0 = 12, cw = 192, gap = 16, xs = [16, 16 + cw + gap, 16 + 2 * (cw + gap)];
  const cols = [['lot', 'lotDef', 'eggs'], ['route', 'routeDef', 'steps'], ['recipe', 'recipeDef', 'oven']];
  const def = (x, y, d, fill) => d === 'routeDef' ? breakAt(x, y, L(d), '的所有', cw - 24, 10, fill, 'start') : para(x, y, L(d), cw - 24, 10, fill, 'start');
  const defH = Math.max(...cols.map(([, d]) => def(0, 0, d).height));
  const anaH = Math.max(...cols.map(([, , a]) => para(0, 0, L(a), cw - 54, 10).height));
  const dy = y0 + 40 + defH, ay = dy + 104, h = ay - y0 + Math.max(24, anaH + 8) + 8;
  let svg = '';
  cols.forEach(([n, d], i) => { const x = xs[i]; svg += card(x, y0, cw, h) + t(x + 12, y0 + 20, L(n), 12.5, TEAL, 'start', 800) + def(x + 12, y0 + 38, d, INK_2).svg; });
  // Lot：密封晶圓盒，晶圓水平分格、彼此不接觸
  let x = xs[0];
  svg += `<rect x="${x + 22}" y="${dy + 8}" width="66" height="80" rx="6" fill="${TEAL_XL}" stroke="${INK_2}" stroke-width="2"/><path d="M${x + 42} ${dy + 8} v-6 h26 v6" fill="none" stroke="${INK_2}" stroke-width="1.6"/>`
    + Array.from({ length: 7 }, (_, k) => `<path d="M${x + 28} ${dy + 18 + k * 10} h-2 M${x + 84} ${dy + 18 + k * 10} h2" stroke="${INK_2}"/><path d="M${x + 31} ${dy + 18 + k * 10} h48" stroke="${TEAL}" stroke-width="2"/>`).join('');
  svg += t(x + 100, dy + 34, L('carrier'), 10.5, INK, 'start', 600) + `<path d="M${x + 98} ${dy + 30} L${x + 88} ${dy + 34}" stroke="${MUTED}" stroke-dasharray="2 2"/>` + para(x + 100, dy + 56, L('max'), cw - 104, 11, TEAL, 'start', 800).svg;
  svg += arrow(xs[0] + cw + 2, dy + 22, xs[1] + 12, dy + 22, TEAL, 1.4);
  // Route：一條路線上的步驟方塊，晶圓盒沿著箭頭前進；最後一格放大到右邊的 Recipe
  x = xs[1];
  const box = (bx, by, hi) => `<rect x="${bx}" y="${by}" width="24" height="16" rx="3" fill="${hi ? TEAL_L : '#ffffff'}" stroke="${hi ? TEAL : INK_2}" stroke-width="${hi ? 1.6 : 1}"/>`;
  const r1 = [x + 14, x + 58, x + 102, x + 146];
  svg += r1.map((bx, k) => box(bx, dy + 14, false) + (k < 3 ? arrow(bx + 26, dy + 22, bx + 42, dy + 22, INK_2, 1.1) : '')).join('')
    + `<path d="M${r1[3] + 12} ${dy + 32} V${dy + 60}" stroke="${INK_2}" stroke-width="1.1"/>` + arrow(r1[3] + 12, dy + 52, r1[3] + 12, dy + 62, INK_2, 1.1)
    + box(r1[3], dy + 64, true) + arrow(r1[3] - 2, dy + 72, r1[2] + 28, dy + 72, INK_2, 1.1) + box(r1[2], dy + 64, false) + arrow(r1[2] - 2, dy + 72, r1[1] + 28, dy + 72, INK_2, 1.1) + box(r1[1], dy + 64, false)
    + `<rect x="${r1[3] - 18}" y="${dy + 36}" width="22" height="24" rx="3" fill="${TEAL_XL}" stroke="${INK_2}" stroke-width="1.4"/>` + [43, 49, 55].map(y => `<path d="M${r1[3] - 14} ${dy + y - 2} h14" stroke="${TEAL}" stroke-width="1.6"/>`).join('');
  svg += `<path d="M${r1[3] + 24} ${dy + 64} L${xs[2] + 14} ${dy + 10} M${r1[3] + 24} ${dy + 80} L${xs[2] + 14} ${dy + 90}" stroke="${TEAL}" stroke-dasharray="3 3"/>`;
  // Recipe：機台的參數畫面，三個參數只留空格
  x = xs[2];
  svg += `<rect x="${x + 14}" y="${dy + 4}" width="${cw - 28}" height="90" rx="6" fill="#ffffff" stroke="${INK_2}" stroke-width="1.4"/><rect x="${x + 14}" y="${dy + 4}" width="${cw - 28}" height="12" rx="6" fill="${INK_2}"/>`
    + ['temp', 'time', 'gas'].map((k, j) => t(x + 24, dy + 38 + j * 22, L(k), 10.5, INK, 'start', 600) + `<rect x="${x + cw - 78}" y="${dy + 27 + j * 22}" width="56" height="15" rx="2" fill="${TEAL_XL}" stroke="${TEAL}"/>`).join('');
  // 比喻小圖：一盒雞蛋、食譜的步驟清單、烤箱的溫度與時間設定
  const glyphs = [
    gx => `<rect x="${gx}" y="${ay}" width="30" height="18" rx="3" fill="#ffffff" stroke="${MUTED}"/>` + [0, 1, 2].flatMap(c => [0, 1].map(r => `<ellipse cx="${gx + 6 + c * 9}" cy="${ay + 5 + r * 8}" rx="3.4" ry="3" fill="#fef3c7" stroke="${MUTED}" stroke-width=".7"/>`)).join(''),
    gx => `<rect x="${gx + 4}" y="${ay - 2}" width="22" height="22" rx="2" fill="#ffffff" stroke="${MUTED}"/>` + [0, 1, 2].map(r => `<path d="M${gx + 8} ${ay + 4 + r * 6} h3 M${gx + 13} ${ay + 4 + r * 6} h9" stroke="${MUTED}" stroke-width="1.2"/>`).join(''),
    gx => `<rect x="${gx}" y="${ay - 2}" width="30" height="22" rx="3" fill="#ffffff" stroke="${MUTED}"/><rect x="${gx + 4}" y="${ay + 6}" width="16" height="10" rx="1" fill="#fef3c7" stroke="${MUTED}" stroke-width=".7"/><circle cx="${gx + 25}" cy="${ay + 7}" r="2.4" fill="none" stroke="${MUTED}"/><circle cx="${gx + 25}" cy="${ay + 14}" r="2.4" fill="none" stroke="${MUTED}"/>`
  ];
  cols.forEach(([, , a], i) => { svg += glyphs[i](xs[i] + 12) + para(xs[i] + 50, ay + 10, L(a), cw - 54, 10, MUTED, 'start', 600).svg; });
  return { svg, height: y0 + h + 8 };
}

// ch01 廠務：一台通用的製程機台（技術審查修正：不用曝光機外形），超純水、特殊氣體與化學品、電力從地板下往上供應，
// 廢氣與廢液往下接到處理系統；外圍虛線框是溫濕度與振動控制。取代原本的五分支方框圖，根節點與五個葉節點的資訊都保留
function facilities(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const y0 = 12, yf = y0 + 182;
  let svg = headline(kit, 16, y0 + 14, L('team'), L('steady'), INK);
  // 機台與環境控制
  svg += `<rect x="232" y="${y0 + 36}" width="176" height="128" rx="10" fill="none" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="5 4"/>`
    + `<rect x="252" y="${y0 + 56}" width="136" height="94" rx="8" fill="${LIGHT}" stroke="${INK_2}" stroke-width="1.4"/><rect x="272" y="${y0 + 70}" width="96" height="56" rx="4" fill="#ffffff" stroke="${INK_2}"/>`
    + `<rect x="290" y="${y0 + 112}" width="60" height="8" fill="${SI}" stroke="${INK_2}"/><ellipse cx="320" cy="${y0 + 110}" rx="26" ry="3" fill="#e2e8f0" stroke="${INK_2}"/>`;
  const envP = para(420, y0 + 52, L('env'), 204, 11, AMBER, 'start', 700);
  svg += envP.svg + icon('thermometer', 420, y0 + 54 + envP.height, 20, AMBER) + icon('cloud', 444, y0 + 54 + envP.height, 20, AMBER)
    + `<path d="M470 ${y0 + 64 + envP.height} q4 -8 8 0 t8 0 t8 0" fill="none" stroke="${AMBER}" stroke-width="1.6"/>`;
  const s1 = para(420, y0 + 92 + envP.height, L('sens1'), 204, 10, INK_2, 'start');
  svg += s1.svg + para(420, y0 + 92 + envP.height + s1.height, L('sens2'), 204, 10, INK_2, 'start').svg;
  // 地板
  svg += `<path d="M16 ${yf} H624" stroke="${MUTED}" stroke-width="5" stroke-dasharray="7 4"/>`;
  // 三條供應：地板下往上進機台
  const sup = [['upw', ['upwUse', 'upwVol'], BLUE, 'drop'], ['gas', ['gasSys'], PINK, 'gas-cylinder'], ['power', ['ruin'], AMBER, null]];
  let ly = yf + 22;
  sup.forEach(([k, ds, c, ic], i) => {
    const px = 274 + i * 30;
    svg += `<path d="M234 ${ly - 4} H${px} V${y0 + 152}" fill="none" stroke="${c}" stroke-width="2.4"/>` + arrow(px, y0 + 166, px, y0 + 151, c, 2.4);
    svg += (ic ? icon(ic, 16, ly - 16, 16, c) : `<path d="M24 ${ly - 16} l-5 9 h5 l-3 8 l8 -10 h-5 l3 -7 z" fill="${AMBER_L}" stroke="${c}" stroke-linejoin="round"/>`) + t(38, ly - 2, L(k), 11, c, 'start', 700);
    let yy = ly + 13;
    if (k === 'power') { svg += t(38, yy, L('dip'), 10, RED, 'start', 600) + `<path d="M38 ${yy + 7} h26 l2 7 h8 l2 -7 h26" fill="none" stroke="${RED}" stroke-width="1.6" stroke-linejoin="round"/>`; yy += 28; }
    ds.forEach(d => { const p = para(38, yy, L(d), 152, 10, INK_2, 'start'); svg += p.svg; yy += p.height; });
    ly = yy + 12;
  });
  // 廢氣與廢液：往下接到處理系統
  const ex = 370, tx = 440, ty = yf + 18, tw2 = 184;
  const exT = para(tx + 12, ty + 18, L('exhaust'), tw2 - 24, 11, INK, 'start', 700);
  const exP = para(tx + 12, ty + 22 + exT.height, L('wasteD'), tw2 - 24, 10, INK_2, 'start');
  const th = 16 + exT.height + exP.height;
  svg += `<path d="M${ex} ${y0 + 150} V${ty + 20} H${tx - 2}" fill="none" stroke="${MUTED}" stroke-width="2.4" stroke-dasharray="6 3"/>` + arrow(tx - 14, ty + 20, tx - 1, ty + 20, MUTED, 2.4)
    + `<rect x="${tx}" y="${ty}" width="${tw2}" height="${th}" rx="6" fill="${LIGHT}" stroke="${MUTED}"/>` + exT.svg + exP.svg;
  // 圖例：供應往上、廢氣與廢液往下
  const gy = Math.max(ly, ty + th + 16) + 4;
  svg += arrow(26, gy + 6, 26, gy - 8, INK_2, 2) + t(36, gy + 2, L('supply'), 10, INK_2, 'start', 600)
    + `<path d="M${100 + textW(L('supply'), 10)} ${gy - 8} v12" stroke="${MUTED}" stroke-width="2" stroke-dasharray="4 2"/>` + arrow(100 + textW(L('supply'), 10), gy, 100 + textW(L('supply'), 10), gy + 7, MUTED, 2) + t(110 + textW(L('supply'), 10), gy + 2, L('waste'), 10, INK_2, 'start', 600);
  return { svg, height: gy + 14 };
}

// ch01 工廠怎麼衡量表現：生產週期被三件事拉長——機台前排隊的 WIP、插隊的急件、為了急件不等湊滿就開機的批次式機台；
// 角落放正文的比喻「車越多，高速公路越塞」。技術審查修正：保留舊圖根節點「生產週期：投片到完成」；晶舟空位明顯但不畫成剛好一半；不標時間與片數
function cycleTime(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const y0 = 12;
  let svg = t(16, y0 + 14, L('ct'), 13, TEAL, 'start', 800);
  const cd = para(16, y0 + 32, L('ctDef'), 360, 10.5, INK_2, 'start');
  svg += cd.svg;
  // 生產週期的時間條，虛線延長段表示被拉長
  const by = y0 + 40 + cd.height;
  svg += `<rect x="16" y="${by}" width="420" height="10" rx="5" fill="${TEAL_L}" stroke="${TEAL}"/><path d="M438 ${by + 5} H592" stroke="${RED}" stroke-width="3" stroke-dasharray="6 4"/>` + arrow(584, by + 5, 604, by + 5, RED, 3);
  // 情境：排隊、插隊、沒湊滿就開機
  const sy = by + 96, lane = sy + 30;
  svg += `<path d="M126 ${lane} H448" stroke="${LINE}" stroke-width="8" stroke-linecap="round"/>` + [132, 168, 204, 240, 276, 312, 348, 384].map(x => icon('foup', x, sy, 26, MUTED)).join('');
  svg += `<rect x="456" y="${sy - 18}" width="66" height="56" rx="5" fill="${LIGHT}" stroke="${INK_2}" stroke-width="1.4"/>` + icon('etch', 474, sy - 6, 30, INK_2);
  // 急件從隊伍後方插到最前面
  svg += `<path d="M140 ${sy - 4} Q280 ${sy - 58} 418 ${sy - 2}" fill="none" stroke="${RED}" stroke-width="1.6" stroke-dasharray="5 3"/>` + arrow(412, sy - 6, 420, sy, RED, 1.6)
    + icon('foup', 420, sy, 26, RED) + `<path d="M433 ${sy} v-14" stroke="${RED}" stroke-width="1.4"/><path d="M433 ${sy - 14} h10 l-3 4 l3 4 h-10" fill="${RED}"/>`;
  const hp = para(270, sy - 50, en ? `${L('hotA')}, ${L('hotB')}` : `${L('hotA')}，${L('hotB')}`, 330, 10.5, RED, 'middle', 700);
  svg += para(270, sy - 46 - hp.height + 13, en ? `${L('hotA')}, ${L('hotB')}` : `${L('hotA')}，${L('hotB')}`, 330, 10.5, RED, 'middle', 700).svg;
  svg += t(287, lane + 22, L('wipTerm'), 11, INK, 'middle', 800);
  const wp = para(287, lane + 37, L('wip'), 320, 10.5, INK, 'middle', 600);
  svg += wp.svg;
  // 批次式爐管：晶舟只放了急件，其餘空著，就亮燈開機
  const fx = 584, fb = sy + 34;
  svg += `<path d="M${fx - 30} ${fb} V${fb - 70} a30 16 0 0 1 60 0 V${fb}" fill="${AMBER_XL}" stroke="${AMBER}" stroke-width="1.4"/><path d="M${fx - 22} ${fb - 4} V${fb - 74} M${fx + 22} ${fb - 4} V${fb - 74}" stroke="${INK_2}" stroke-width="1.4"/>`
    + Array.from({ length: 11 }, (_, k) => { const y = fb - 72 + k * 6; return k < 3 ? `<rect x="${fx - 22}" y="${y}" width="44" height="2.2" fill="#fee2e2" stroke="${RED}" stroke-width=".6"/>` : `<path d="M${fx - 22} ${y + 1} h4 M${fx + 22} ${y + 1} h-4" stroke="${INK_2}" stroke-width=".8"/>`; }).join('')
    + `<path d="M${fx - 36} ${fb} h72" stroke="${INK_2}" stroke-width="1.6"/><circle cx="${fx + 22}" cy="${fb - 96}" r="5" fill="#4ade80" stroke="${GREEN}"/>`
    + t(fx - 24, fb - 92, L('hot'), 9.5, RED, 'end', 700) + `<path d="M${fx - 22} ${fb - 95} L${fx - 16} ${fb - 72}" stroke="${MUTED}" stroke-dasharray="2 2"/>`;
  const bp = para(fx + 30, fb + 18, L('batch'), 150, 10, INK, 'end', 600);
  svg += bp.svg + t(fx + 30, fb + 18 + bp.height, L('waste'), 10.5, RED, 'end', 700);
  // 角落：高速公路的比喻
  const hy = sy - 4;
  svg += `<rect x="16" y="${hy}" width="96" height="22" rx="3" fill="#cbd5e1"/><path d="M16 ${hy + 11} H112" stroke="#ffffff" stroke-dasharray="6 4"/>`
    + [[20, 3], [38, 3], [56, 3], [74, 3], [26, 13], [46, 13], [66, 13], [88, 13]].map(([x, d]) => `<rect x="${x}" y="${hy + d}" width="12" height="6" rx="1.5" fill="${INK_2}"/>`).join('');
  svg += para(64, hy + 38, L('highway'), 116, 10, MUTED, 'middle', 600).svg;
  const bottom = Math.max(lane + 37 + wp.height, fb + 18 + bp.height + 14, hy + 38 + para(0, 0, L('highway'), 116, 10).height);
  return { svg, height: bottom + 8 };
}

// ── 第 3 階段 F2（2.25.0，ch02–ch03）──
// 文字置中：para 的 y 是第一行基線，依總高度往上推，讓多行文字在 cy 附近垂直置中
const midY = (cy, height, size) => cy - height / 2 + size;

// 樹狀圖列：照搬被取代的分支方框圖（根、三個分支與各自的結論）。hi 是第二列要展開的分支，
// 用同一個琥珀色把分支和第二列的面板連起來，面板標題也沿用同一個分支名稱
function treeRow(L, para, arrow, y0, rootKey, rows, hi) {
  const rx = 16, rw = 132, bx = 176, bw = 200, lx = 404, lw = 220, gap = 8;
  const bh = rows.map(([b, l]) => Math.max(para(0, 0, L(b), bw - 20, 11, INK, 'middle', 700).height, para(0, 0, L(l), lw - 20, 10.5).height) + 16);
  let y = y0, svg = '', hb = 0;
  const mids = [];
  rows.forEach(([b, l], i) => {
    const h = bh[i], on = i === hi, cy = y + h / 2;
    if (on) hb = y + h;
    const bp = para(0, 0, L(b), bw - 20, 11, INK, 'middle', 700), lp = para(0, 0, L(l), lw - 20, 10.5);
    svg += card(bx, y, bw, h, on ? AMBER_XL : '#ffffff', on ? AMBER : LINE, 6) + card(lx, y, lw, h, LIGHT, LINE, 6)
      + para(bx + bw / 2, midY(cy, bp.height, 11), L(b), bw - 20, 11, on ? AMBER : INK, 'middle', 700).svg
      + para(lx + lw / 2, midY(cy, lp.height, 10.5), L(l), lw - 20, 10.5, INK_2).svg
      + arrow(bx + bw + 2, cy, lx - 2, cy, TEAL, 1.3);
    mids.push(cy);
    y += h + gap;
  });
  const bottom = y - gap, ry = (y0 + bottom) / 2;
  const rp = para(0, 0, L(rootKey), rw - 20, 11.5, INK, 'middle', 700), rh = Math.max(40, rp.height + 18);
  svg += card(rx, ry - rh / 2, rw, rh, TEAL_XL, TEAL, 6) + para(rx + rw / 2, midY(ry, rp.height, 11.5), L(rootKey), rw - 20, 11.5, INK, 'middle', 700).svg;
  svg += mids.map(m => `<path d="M${rx + rw} ${ry} C ${rx + rw + 18} ${ry}, ${bx - 22} ${m}, ${bx - 8} ${m}" fill="none" stroke="${TEAL}" stroke-width="1.3"/>` + arrow(bx - 9, m, bx - 2, m, TEAL, 1.3)).join('');
  // 從展開的分支往下拉兩條虛線到第二列面板的上緣；虛線先畫，被下方的卡片蓋住的部分不顯示（F2 審查修正）
  const zoom = py => `<path d="M${bx + 10} ${hb} L24 ${py} M${bx + bw - 10} ${hb} L616 ${py}" fill="none" stroke="${AMBER}" stroke-dasharray="4 3"/>`;
  return { svg, bottom, zoom };
}

// ch02 半導體：可以控制的導體。上排是由玻璃到金屬的定性漸層，半導體在中段，下面的滑桿與兩個旋鈕表示導電能力可以被控制；
// 下排兩張卡說明矽為什麼是最主要的半導體材料。技術審查修正：不寫銅、不寫數值，滑桿不超出半導體那一段
function semiControl(spec, en, kit) {
  const { L, t, para } = tools(spec, en, kit);
  const by = 42, bh = 22, s0 = 236, s1 = 404, mid = (s0 + s1) / 2, id = `semi-band-${en ? 'en' : 'zh'}`;
  let svg = `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#475569"/></linearGradient></defs>`
    + `<rect x="30" y="${by}" width="580" height="${bh}" rx="4" fill="url(#${id})" stroke="${INK_2}"/>`
    + `<rect x="${s0}" y="${by - 4}" width="${s1 - s0}" height="${bh + 8}" rx="5" fill="none" stroke="${TEAL}" stroke-width="2"/>`
    + t(100, by - 10, L('glass'), 12.5, INK, 'middle', 800) + t(mid, by - 10, L('semi'), 12.5, TEAL, 'middle', 800) + t(530, by - 10, L('metal'), 12.5, INK, 'middle', 800)
    + para(100, by + bh + 18, L('glassNote'), 170, 10.5, INK_2).svg + para(mid, by + bh + 18, L('between'), 160, 10.5, TEAL, 'middle', 600).svg + para(530, by + bh + 18, L('metalNote'), 170, 10.5, INK_2).svg;
  // 滑桿：只在半導體那一段內左右移動；兩個旋鈕都接到中間的圓鈕，表示兩種方法都能往兩個方向調整
  // （F2 審查修正：原本接到滑桿兩端，會被讀成一個讓導電變差、一個讓導電變好）
  const cy = 104, sy = 118, dy = 152, d0 = mid - 52, d1 = mid + 52;
  svg += t(mid, cy, L('control'), 11.5, TEAL, 'middle', 800)
    + `<path d="M${s0 + 12} ${sy} H${s1 - 12}" stroke="${TEAL}" stroke-width="2"/><path d="M${s0 + 12} ${sy} l7 -4 v8 z M${s1 - 12} ${sy} l-7 -4 v8 z" fill="${TEAL}"/><circle cx="${mid}" cy="${sy}" r="7" fill="#ffffff" stroke="${TEAL}" stroke-width="2"/>`;
  const dial = cx => `<path d="M${cx} ${dy - 12} L${mid + (cx < mid ? -5 : 5)} ${sy + 6}" stroke="${TEAL}" stroke-dasharray="3 2"/><circle cx="${cx}" cy="${dy}" r="11" fill="#ffffff" stroke="${TEAL}" stroke-width="1.6"/>`
    + `<path d="M${cx} ${dy} L${cx + 6} ${dy - 6}" stroke="${TEAL}" stroke-width="2" stroke-linecap="round"/>` + [-60, 0, 60].map(a => { const r = (a - 90) * Math.PI / 180; return `<path d="M${(cx + 13 * Math.cos(r)).toFixed(1)} ${(dy + 13 * Math.sin(r)).toFixed(1)} L${(cx + 16 * Math.cos(r)).toFixed(1)} ${(dy + 16 * Math.sin(r)).toFixed(1)}" stroke="${TEAL}"/>`; }).join('');
  const dl = para(d0 - 18, dy + 4, L('dope'), 190, 10.5, INK, 'end', 600), dr = para(d1 + 18, dy + 4, L('volt'), 190, 10.5, INK, 'start', 600);
  svg += dial(d0) + dial(d1) + dl.svg + dr.svg;
  // 下排：矽是最主要的半導體材料，兩個原因各一張卡
  const ty = Math.max(dy + 18, dy + 4 + Math.max(dl.height, dr.height)) + 26, cy2 = ty + 10;
  svg += t(16, ty, L('siMain'), 12.5, INK, 'start', 800);
  const ab = para(0, 0, L('abundant'), 196, 11, INK, 'start', 700), sd = para(0, 0, L('sand'), 196, 10.5);
  const ins = para(0, 0, L('insulator'), 180, 11, INK, 'start', 700), us = para(0, 0, L('useful'), 180, 10.5);
  const ch = Math.max(84, 26 + ab.height + sd.height, 26 + ins.height + us.height);
  svg += card(16, cy2, 300, ch, TEAL_XL, LINE) + card(324, cy2, 300, ch, BLUE_XL, LINE);
  // 沙堆
  const px = 62, pb = cy2 + ch / 2 + 22;
  svg += `<path d="M${px - 38} ${pb} Q ${px - 16} ${pb - 40} ${px} ${pb - 42} Q ${px + 16} ${pb - 40} ${px + 38} ${pb} Z" fill="${AMBER_L}" stroke="${AMBER}"/>`
    + [[-20, -8], [-8, -20], [6, -12], [16, -26], [22, -6], [-2, -32], [-26, -4], [10, -4]].map(([dx, dyy]) => `<circle cx="${px + dx}" cy="${pb + dyy}" r="1.6" fill="${AMBER}"/>`).join('');
  svg += para(118, cy2 + 22, L('abundant'), 196, 11, INK, 'start', 700).svg + para(118, cy2 + 26 + ab.height, L('sand'), 196, 10.5, INK_2, 'start').svg;
  // 矽與表面長出的二氧化矽薄層
  const kx = 340, ky = cy2 + ch / 2 - 8;
  svg += `<rect x="${kx}" y="${ky + 8}" width="80" height="30" fill="${SI}" stroke="${INK_2}"/><rect x="${kx}" y="${ky}" width="80" height="8" fill="#ffffff" stroke="${BLUE}" stroke-width="1.4"/>`
    + t(kx + 40, ky + 29, L('si'), 11, INK, 'middle', 700) + `<path d="M${kx + 60} ${ky + 4} L${kx + 70} ${ky - 10}" stroke="${MUTED}" stroke-dasharray="2 2"/>` + t(kx + 40, ky - 14, L('sio2'), 10.5, BLUE, 'middle', 700);
  svg += para(436, cy2 + 22, L('insulator'), 180, 11, INK, 'start', 700).svg + para(436, cy2 + 26 + ins.height, L('useful'), 180, 10.5, INK_2, 'start').svg;
  return { svg, height: cy2 + ch + 8 };
}

// ch02 從電晶體到晶片：上排是一路縮小倍率的鏈（電晶體 → 邏輯閘 → 運算電路 → 晶片），下排是同一顆晶片的剖面，
// 電晶體做在矽的表面（FEOL），上方一層一層蓋出金屬導線（BEOL）。取代原本的流程方框，五個步驟與兩個註記都保留。
// 技術審查修正：源極、汲極在矽內，閘極在表面；接觸窗接到第一層金屬但不標、不畫 MOL；金屬由下往上越來越粗；
// 第一層金屬每個端點各自一段，第二層起才連接不同電晶體，介層孔都落在上下兩層金屬上（沿用 F1 前段與後段的修正）
function transistorsToChip(spec, en, kit) {
  const { L, t, para, breakAt, arrow } = tools(spec, en, kit);
  const y0 = 12, iw = 84, gw = (608 - 4 * iw) / 3, xs = [0, 1, 2, 3].map(i => 16 + i * (iw + gw));
  const D = (x, y, s, fill = '#ffffff') => `<path d="M${x} ${y} h${s * 0.55} a${s / 2} ${s / 2} 0 0 1 0 ${s} h${-s * 0.55} z" fill="${fill}" stroke="${INK_2}" stroke-width="${s > 20 ? 1.4 : 0.9}"/>`;
  const art = [
    x => `<rect x="${x + 8}" y="${y0 + 38}" width="68" height="22" fill="${SI}" stroke="${INK_2}"/><rect x="${x + 14}" y="${y0 + 38}" width="18" height="7" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${x + 52}" y="${y0 + 38}" width="18" height="7" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${x + 33}" y="${y0 + 26}" width="18" height="12" fill="${METAL_GATE}"/>`,
    x => `<path d="M${x + 6} ${y0 + 28} h14 M${x + 6} ${y0 + 44} h14 M${x + 64} ${y0 + 36} h14" stroke="${INK_2}" stroke-width="1.4"/>` + D(x + 20, y0 + 18, 36) + `<circle cx="${x + 62}" cy="${y0 + 36}" r="3.5" fill="#ffffff" stroke="${INK_2}" stroke-width="1.4"/>`,
    x => [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]].map(([c, r]) => D(x + 6 + c * 26, y0 + 20 + r * 24, 14)).join('')
      + `<path d="M${x + 24} ${y0 + 27} h8 M${x + 50} ${y0 + 27} h8 M${x + 24} ${y0 + 51} h8 M${x + 50} ${y0 + 51} h8 M${x + 28} ${y0 + 27} V${y0 + 51}" stroke="${TEAL}" stroke-width="1.1" fill="none"/>`,
    x => `<rect x="${x + 16}" y="${y0 + 16}" width="52" height="44" rx="3" fill="#475569"/>` + [0, 1, 2, 3, 4].map(k => `<path d="M${x + 22 + k * 10} ${y0 + 16} v-5 M${x + 22 + k * 10} ${y0 + 60} v5" stroke="${INK_2}" stroke-width="1.6"/>`).join('')
      + `<rect x="${x + 28}" y="${y0 + 24}" width="28" height="28" fill="${DIE_C}" stroke="#ffffff" stroke-width=".8"/><path d="M${x + 35} ${y0 + 24} v28 M${x + 42} ${y0 + 24} v28 M${x + 49} ${y0 + 24} v28 M${x + 28} ${y0 + 31} h28 M${x + 28} ${y0 + 38} h28 M${x + 28} ${y0 + 45} h28" stroke="#94a3b8" stroke-width=".6"/>`
  ];
  // 箭頭下方的註記可能有三、四行；名稱放在最長的註記之下，避免寬的英文名稱壓到註記（F2 自檢修正）
  // 中文註記在詞的邊界斷行，不把「導線」拆成兩行
  const cut = { fewTr: '一個', manyG: '運算', wire: '把它們' }, note = (x, y, k) => breakAt(x, y, L(k), cut[k], en ? gw + 8 : gw - 6, 10, INK_2, 'middle', 400);
  const notes = ['fewTr', 'manyG', 'wire'].map(k => note(0, 0, k));
  const noteBottom = y0 + 54 + Math.max(...notes.map(n => n.height)), ty = Math.max(y0 + 86, noteBottom + 8);
  let svg = '';
  ['tr', 'gate', 'circuit', 'chip'].forEach((k, i) => {
    const x = xs[i];
    svg += art[i](x) + t(x + iw / 2, ty, L(k), 12, INK, 'middle', 700);
    if (i < 3) svg += arrow(x + iw + 6, y0 + 38, x + iw + gw - 6, y0 + 38) + note(x + iw + gw / 2, y0 + 54, ['fewTr', 'manyG', 'wire'][i]).svg;
  });
  // 下排：剖面。Y 是矽的表面
  const top = ty + 16, Y = top + 148, g = [90, 180, 270, 360];
  svg += card(16, top, 608, Y + 48 - top, '#ffffff', LINE) + t(30, top + 20, L('twoStages'), 11.5, INK, 'start', 700)
    + `<rect x="30" y="${Y - 120}" width="400" height="120" fill="${LIGHT}"/><rect x="30" y="${Y}" width="400" height="34" fill="${SI}" stroke="${INK_2}"/>` + t(42, Y + 26, L('si'), 11, INK, 'start', 700);
  svg += g.map(c => `<rect x="${c - 30}" y="${Y}" width="20" height="10" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${c + 10}" y="${Y}" width="20" height="10" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${c - 8}" y="${Y - 14}" width="16" height="14" fill="${METAL_GATE}"/>`
    + `<rect x="${c - 22}" y="${Y - 34}" width="4" height="34" fill="${W_PLUG}"/><rect x="${c - 2}" y="${Y - 34}" width="4" height="20" fill="${W_PLUG}"/><rect x="${c + 18}" y="${Y - 34}" width="4" height="34" fill="${W_PLUG}"/>`).join('');
  const metal = (y, h, segs) => segs.map(([a, b]) => `<rect x="${a}" y="${y}" width="${b - a}" height="${h}" fill="${COPPER}" stroke="${AMBER}" stroke-width=".6"/>`).join('');
  const vias = (y, h, xs2) => xs2.map(x => `<rect x="${x - 2}" y="${y}" width="4" height="${h}" fill="${AMBER}"/>`).join('');
  svg += metal(Y - 40, 6, g.flatMap(c => [[c - 26, c - 14], [c - 6, c + 6], [c + 14, c + 26]]))
    + vias(Y - 48, 8, [110, 160, 180, 270, 290, 340]) + metal(Y - 56, 8, [[104, 166], [176, 274], [286, 346]])
    // 第三、四層每一段只接一個節點（F2 審查修正：原本第三、四層把不同電晶體的源極、閘極、汲極接成同一個節點）；
    // 沒有往上接的端點是往紙面內外走線，剖面看不到
    + vias(Y - 66, 10, [130, 316]) + metal(Y - 78, 12, [[100, 236], [256, 410]])
    + vias(Y - 90, 12, [168, 380]) + metal(Y - 106, 16, [[60, 236], [262, 420]]);
  const bk = (a, b) => `<path d="M440 ${a} h8 V${b} h-8" fill="none" stroke="${TEAL}" stroke-width="1.4"/>`;
  const bd = para(0, 0, L('beolD'), 160, 10.5), fd = para(0, 0, L('feolD'), 160, 10.5);
  const bm = Y - 70, fm = Y - 2;
  svg += bk(Y - 106, Y - 34) + bk(Y - 14, Y + 10)
    + t(458, bm - (bd.height + 14) / 2 + 10, L('beol'), 12, INK, 'start', 800) + para(458, bm - (bd.height + 14) / 2 + 26, L('beolD'), 160, 10.5, INK_2, 'start').svg
    + t(458, fm - (fd.height + 14) / 2 + 10, L('feol'), 12, INK, 'start', 800) + para(458, fm - (fd.height + 14) / 2 + 26, L('feolD'), 160, 10.5, INK_2, 'start').svg;
  return { svg, height: Y + 56 };
}

// ch02 微縮：越做越小。上排：同樣大小的兩格，右格的電晶體正好是左格的兩倍、每顆面積一半；
// 下排左：縮小到一定程度後，關閉的電晶體仍有電流從閘極下方漏過去，像關不緊的水龍頭；
// 下排右：同色的閘極，平面只從上方控制通道，立體結構從三面包住通道。取代原本的流程方框，四個步驟與三個註記都保留。
// 技術審查修正：漏電路徑在表面略下方穿過通道；源極、汲極不標；不寫章號
function shrinkWhy(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const y0 = 12, sq = 96;
  // 俯視的電晶體：主動區加一條直向的閘極
  const tr = (cx, cy, w, h) => `<rect x="${(cx - w / 2).toFixed(1)}" y="${(cy - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".8"/><rect x="${(cx - w * 0.09).toFixed(1)}" y="${(cy - h / 2 - h * 0.22).toFixed(1)}" width="${(w * 0.18).toFixed(1)}" height="${(h * 1.44).toFixed(1)}" fill="${METAL_GATE}"/>`;
  let svg = `<rect x="30" y="${y0 + 12}" width="${sq}" height="${sq}" fill="${LIGHT}" stroke="${INK_2}"/><rect x="170" y="${y0 + 12}" width="${sq}" height="${sq}" fill="${LIGHT}" stroke="${INK_2}"/>`;
  svg += [24, 72].flatMap(cy => [24, 72].map(cx => tr(30 + cx, y0 + 12 + cy, 28, 20))).join('');
  svg += [24, 72].flatMap(cy => [12, 36, 60, 84].map(cx => tr(170 + cx, y0 + 12 + cy, 28 / Math.SQRT2, 20 / Math.SQRT2))).join('');
  svg += arrow(132, y0 + 60, 164, y0 + 60);
  const db = para(290, y0 + 44, L('double'), 326, 10.5, INK_2, 'start', 600);
  svg += t(290, y0 + 24, L('moore'), 13, TEAL, 'start', 800) + db.svg;
  let y = y0 + 54 + db.height;
  for (const k of ['small', 'more', 'cost']) {
    const p = para(306, y, L(k), 310, 10.5, INK, 'start', 600);
    svg += `<circle cx="297" cy="${y - 4}" r="2.6" fill="${TEAL}"/>` + p.svg;
    y += p.height + 6;
  }
  const r2 = Math.max(y0 + 12 + sq, y) + 26;
  svg += arrow(156, r2 - 22, 156, r2 - 2);
  // 下排左：關不緊
  const cw = 280, xA = 16, xB = 344;
  const ct = para(0, 0, L('control'), cw - 24, 10.5), S = r2 + 50 + ct.height;
  const lk = para(0, 0, L('leak'), 170, 10.5), fc = para(0, 0, L('faucet'), 84, 10);
  const h2 = S + 36 + 16 + Math.max(lk.height, fc.height) + 10 - r2;
  svg += card(xA, r2, cw, h2, '#ffffff', LINE) + t(xA + 12, r2 + 20, L('past'), 12, RED, 'start', 800) + para(xA + 12, r2 + 38, L('control'), cw - 24, 10.5, INK_2, 'start').svg;
  const sx = xA + 16;
  svg += `<rect x="${sx}" y="${S}" width="170" height="36" fill="${SI}" stroke="${INK_2}"/><rect x="${sx + 12}" y="${S}" width="46" height="12" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${sx + 112}" y="${S}" width="46" height="12" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + `<rect x="${sx + 60}" y="${S - 4}" width="50" height="4" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".6"/><rect x="${sx + 60}" y="${S - 22}" width="50" height="18" fill="${METAL_GATE}"/>`
    + `<path d="M${sx + 50} ${S + 7} Q ${sx + 85} ${S + 15} ${sx + 118} ${S + 7}" fill="none" stroke="${RED}" stroke-width="1.6" stroke-dasharray="4 3"/><path d="M${sx + 120} ${S + 6.5} l-7 -2 l1.5 6 z" fill="${RED}"/>`
    + para(sx + 85, S + 52, L('leak'), 170, 10.5, RED, 'middle', 600).svg;
  // 水龍頭：把手、出水口與水滴
  const fx = xA + 218, fy = S - 10;
  svg += `<rect x="${fx - 30}" y="${fy}" width="40" height="10" rx="2" fill="#cbd5e1" stroke="${INK_2}"/><path d="M${fx + 10} ${fy} h10 a8 8 0 0 1 8 8 v10 h-10 v-8 h-8 z" fill="#cbd5e1" stroke="${INK_2}"/><path d="M${fx - 12} ${fy} v-8 M${fx - 20} ${fy - 8} h16" stroke="${INK_2}" stroke-width="2" stroke-linecap="round"/>`
    + [[fy + 26, 2.6], [fy + 38, 2.2]].map(([dy2, r]) => `<path d="M${fx + 23} ${dy2 - r * 2} q${r} ${r * 1.6} 0 ${r * 2.6} q${-r} ${-r} 0 ${-r * 2.6}" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".8"/>`).join('')
    + para(fx + 10, S + 52, L('faucet'), 84, 10, INK_2).svg;
  svg += arrow(xA + cw + 4, r2 + h2 / 2, xB - 4, r2 + h2 / 2);
  // 下排右：平面與立體，同色閘極
  svg += card(xB, r2, cw, h2, '#ffffff', LINE) + t(xB + 12, r2 + 18, L('solve'), 10.5, MUTED, 'start', 600) + t(xB + 12, r2 + 36, L('to3d'), 12, TEAL, 'start', 800);
  const px = xB + 24, qx = xB + 158;
  // F2 審查修正：兩種結構都畫閘極介電層（琥珀色，與左格相同）；立體結構的閘極兩腳停在隔離氧化層上，不碰矽基板；
  // 通道改用藍色，與左格的源極、汲極區分
  svg += `<rect x="${px}" y="${S}" width="100" height="36" fill="${SI}" stroke="${INK_2}"/><rect x="${px + 20}" y="${S}" width="60" height="5" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".8"/>`
    + `<rect x="${px + 20}" y="${S - 3}" width="60" height="3" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".6"/><rect x="${px + 20}" y="${S - 19}" width="60" height="16" fill="${METAL_GATE}"/>`
    + [px + 34, px + 50, px + 66].map(x => arrow(x, S - 16, x, S - 5, '#ffffff', 1.2)).join('')
    + `<rect x="${qx}" y="${S + 16}" width="100" height="20" fill="${SI}" stroke="${INK_2}"/><rect x="${qx}" y="${S + 8}" width="100" height="8" fill="#f1f5f9" stroke="${MUTED}" stroke-width=".8"/>`
    + `<rect x="${qx + 38}" y="${S - 16}" width="24" height="24" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".6"/><rect x="${qx + 40}" y="${S - 14}" width="20" height="30" fill="${BLUE_L}" stroke="${BLUE}"/>`
    + `<path d="M${qx + 30} ${S + 8} V${S - 24} H${qx + 70} V${S + 8} H${qx + 62} V${S - 16} H${qx + 38} V${S + 8} Z" fill="${METAL_GATE}"/>`
    + arrow(qx + 31, S - 2, qx + 37, S - 2, '#ffffff', 1.2) + arrow(qx + 69, S - 2, qx + 63, S - 2, '#ffffff', 1.2) + arrow(qx + 50, S - 23, qx + 50, S - 17, '#ffffff', 1.2)
    + t(px + 50, S + 52, L('planar'), 11, INK, 'middle', 700) + t(qx + 50, S + 52, L('threeD'), 11, TEAL, 'middle', 700);
  return { svg, height: r2 + h2 + 8 };
}

// ch02 半導體能隙、Multi-Vt 與功耗概覽：第一列是五種材料的能隙長條，從 0 eV 起按比例；第二列保留原本三欄的重點。
// 第一欄原本的「矽主導主流數位 CMOS」「SiC、GaN 用於電源轉換」改成長條旁的正文原句（技術審查修正）
function bandgapBars(spec, en, kit) {
  const { L, t, para, breakAt, icon } = tools(spec, en, kit);
  const y0 = 12, x0 = 96, k = 90, by = i => y0 + 30 + i * 24;
  const bars = [['ge', 'v066', 0.66], ['si', 'v112', 1.12], ['gaas', 'v142', 1.42], ['sic', 'v326', 3.26], ['gan', 'v34', 3.4]];
  let svg = t(16, y0 + 12, L('eg'), 13, INK, 'start', 800) + t(16 + textW(L('eg'), 13) + 10, y0 + 12, L('rt'), 10.5, MUTED, 'start', 600)
    + `<path d="M${x0} ${y0 + 24} V${by(4) + 22}" stroke="${INK_2}" stroke-width="1.2"/>`;
  bars.forEach(([n, v, eg], i) => {
    const y = by(i), w = eg * k, c = eg > 3 ? [AMBER_L, AMBER] : n === 'si' ? [TEAL_L, TEAL] : [BLUE_L, BLUE];
    svg += t(x0 - 8, y + 12, L(n), 11, INK, 'end', 700) + `<rect x="${x0}" y="${y}" width="${w}" height="16" rx="2" fill="${c[0]}" stroke="${c[1]}"/>` + t(x0 + w + 6, y + 12, `${L(v)} ${L('ev')}`, 10.5, INK_2, 'start', 600);
  });
  svg += t(260, by(1) + 12, L('siUse'), 10.5, TEAL, 'start', 700);
  const pw = breakAt(0, 0, L('power'), 'AI', 156, 10.5), pm = (by(3) + by(4) + 16) / 2;
  svg += `<path d="M452 ${by(3)} h6 V${by(4) + 16} h-6" fill="none" stroke="${AMBER}" stroke-width="1.4"/>` + breakAt(466, midY(pm, pw.height, 10.5), L('power'), 'AI', 156, 10.5, AMBER, 'start', 700).svg;
  // 第二列：原本三欄的重點
  const cols = [['bandgap', 'c1', ['c1a', 'c1b']], ['threshold', 'c2', ['c2a', 'c2b', 'c2c', 'c2d']], ['conductor', 'c3', ['c3a', 'c3an', 'c3b', 'c3c', 'c3cn', 'c3d']]];
  const top = by(4) + 40, cw = 196, gap = 10;
  const body = (x, y, keys, draw) => {
    let yy = y, out = '';
    for (const key of keys) {
      const note = key.endsWith('n');
      const p = para(x + (note ? 22 : 14), yy, L(key), cw - (note ? 34 : 26), note ? 10 : 10.5, note ? MUTED : INK, 'start', note ? 400 : 600);
      if (draw) out += (note ? '' : `<circle cx="${x + 7}" cy="${yy - 3.5}" r="2.4" fill="${INK_2}"/>`) + p.svg;
      yy += p.height + (note ? 6 : 4);
    }
    return { svg: out, bottom: yy };
  };
  const heads = cols.map(([, h]) => para(0, 0, L(h), cw - 50, 11.5, INK, 'start', 800));
  const ch = Math.max(...cols.map(([, , keys], i) => body(0, 0, keys, false).bottom + Math.max(30, heads[i].height + 14))) + 16;
  cols.forEach(([ic, h, keys], i) => {
    const x = 16 + i * (cw + gap), hh = Math.max(30, heads[i].height + 14);
    svg += card(x, top, cw, ch, '#ffffff', LINE) + icon(ic, x + 10, top + 8, 22, TEAL) + para(x + 40, top + 22, L(h), cw - 50, 11.5, INK, 'start', 800).svg + body(x + 8, top + hh + 16, keys, true).svg;
  });
  return { svg, height: top + ch + 8 };
}

// ch02 定量物理定律：第一列照搬原本的分支圖；第二列把「次臨界擺幅極限」那一支展開成一把刻度尺，
// 從 55 到 125 mV/dec 線性排列但不印刻度，只標正文給的數值（技術審查修正：FinFET 只有約略值，畫成一點）
function swingScale(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const tree = treeRow(L, para, arrow, 12, 'root', [['b1', 'l1'], ['b2', 'l2'], ['b3', 'l3']], 1);
  const py = tree.bottom + 18, ph = 136, x0 = 150, x1 = 566, k = (x1 - x0) / 70, X = v => x0 + (v - 55) * k, ay = py + 86;
  let svg = tree.zoom(py) + tree.svg + card(16, py, 608, ph, '#ffffff', AMBER) + t(30, py + 20, L('b2'), 12, AMBER, 'start', 800);
  svg += `<path d="M${x0} ${ay} H${x1}" stroke="${INK_2}" stroke-width="1.4"/>` + arrow(x1 - 4, ay, x1 + 6, ay, INK_2, 1.4) + t(x1 + 12, ay + 4, L('unit'), 10.5, INK_2, 'start', 600);
  // 熱電子發射極限：紅線
  const xl = X(59.6);
  svg += `<path d="M${xl} ${ay - 40} V${ay + 10}" stroke="${RED}" stroke-width="2"/>` + t(xl, ay - 44, `≈ ${L('v596')}`, 11, RED, 'middle', 800)
    + t(xl - 8, ay - 22, L('limit'), 10.5, RED, 'end', 600) + t(xl - 8, ay - 8, en ? L('k300') : `（${L('k300')}）`, 10.5, RED, 'end', 600);
  // GAA 奈米片：色塊；FinFET：一點；平面短通道：色塊
  const g0 = X(62), g1 = X(65), p0 = X(95), p1 = X(120), fx = X(70);
  svg += `<rect x="${g0}" y="${ay - 6}" width="${g1 - g0}" height="12" fill="${TEAL_L}" stroke="${TEAL}"/>` + t((g0 + g1) / 2, ay + 24, L('gaa'), 10.5, TEAL, 'middle', 700) + t((g0 + g1) / 2, ay + 38, L('vGaa'), 10.5, TEAL, 'middle', 600)
    + `<circle cx="${fx}" cy="${ay}" r="4.5" fill="${BLUE}"/>` + t(fx, ay - 24, L('fin'), 10.5, BLUE, 'middle', 700) + t(fx, ay - 10, L('vFin'), 10.5, BLUE, 'middle', 600)
    + `<rect x="${p0}" y="${ay - 6}" width="${p1 - p0}" height="12" fill="${AMBER_L}" stroke="${AMBER}"/>` + t((p0 + p1) / 2, ay + 24, L('planar'), 10.5, AMBER, 'middle', 700) + t((p0 + p1) / 2, ay + 38, L('vPlanar'), 10.5, AMBER, 'middle', 600)
    + arrow(X(77), ay - 30, X(118), ay - 30, RED, 1.5) + t((X(77) + X(118)) / 2, ay - 36, L('worse'), 11, RED, 'middle', 700);
  return { svg, height: py + ph + 8 };
}

// ch03 定量物理定律：第一列照搬原本的分支圖；第二列把「Scheil 摻質偏析」那一支展開成三根晶棒，
// 顏色越深表示摻質越濃，依 Scheil 式 C/C(頭端) = (1 − fs)^(k0 − 1) 計算，畫到晶棒約九成處；每根以自己的頭端為基準
function scheilIngots(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const tree = treeRow(L, para, arrow, 12, 'root', [['b1', 'l1'], ['b2', 'l2'], ['b3', 'l3']], 1);
  const py = tree.bottom + 18, x0 = 170, len = 280, ih = 22, ys = [0, 1, 2].map(i => py + 52 + i * 36), ph = ys[2] + ih + 16 - py;
  const rows = [['boron', 'vB', 0.8], ['phos', 'vP', 0.35], ['arsenic', 'vAs', 0.3]];
  const lo = [186, 230, 253], hi = [7, 89, 133], mix = u => `rgb(${lo.map((c, j) => Math.round(c + (hi[j] - c) * u)).join(',')})`;
  const shade = (k0, fs) => mix(Math.min(1, Math.log10(Math.pow(1 - fs, k0 - 1)) / Math.log10(5)));
  const id = `scheil-${en ? 'en' : 'zh'}`;
  let svg = tree.zoom(py) + tree.svg + `<defs>${rows.map(([, , k0], i) => `<linearGradient id="${id}-${i}" x1="0" x2="1">${[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map(fs => `<stop offset="${(fs / 0.9).toFixed(3)}" stop-color="${shade(k0, fs)}"/>`).join('')}</linearGradient>`).join('')}</defs>`
    + card(16, py, 608, ph, '#ffffff', AMBER) + t(30, py + 20, L('b2'), 12, AMBER, 'start', 800)
    + t(104, py + 40, L('coef'), 10.5, MUTED, 'start', 700) + t(x0 + len, py + 40, L('tail'), 10.5, INK_2, 'middle', 700);
  // 圖例：顏色越深表示摻質越濃（F2 審查修正：避免把深淺讀成電阻率）
  const kx = 300 + textW(L('dopant'), 10.5) + 8;
  svg += `<defs><linearGradient id="${id}-key" x1="0" x2="1"><stop offset="0" stop-color="${mix(0)}"/><stop offset="1" stop-color="${mix(1)}"/></linearGradient></defs>`
    + t(300, py + 40, L('dopant'), 10.5, MUTED, 'start', 700) + `<rect x="${kx}" y="${py + 31}" width="56" height="10" fill="url(#${id}-key)" stroke="${INK_2}" stroke-width=".6"/>`;
  rows.forEach(([n, v, k0], i) => {
    const y = ys[i];
    svg += t(30, y + 15, L(n), 11.5, INK, 'start', 700) + t(104, y + 15, L(v), 11, INK_2, 'start', 600)
      + `<path d="M${x0} ${y} L${x0 - 14} ${y + ih / 2 - 3} h-8 v6 h8 L${x0} ${y + ih} Z" fill="${shade(k0, 0)}" stroke="${INK_2}"/>`
      + `<rect x="${x0}" y="${y}" width="${len}" height="${ih}" fill="url(#${id}-${i})" stroke="${INK_2}"/><ellipse cx="${x0 + len}" cy="${y + ih / 2}" rx="4" ry="${ih / 2}" fill="${shade(k0, 0.9)}" stroke="${INK_2}"/>`;
  });
  svg += para(468, ys[0] + 15, L('flat'), 150, 10.5, INK, 'start', 600).svg;
  const rp = para(0, 0, L('rich'), 136, 10.5), rm = (ys[1] + ys[2] + ih) / 2;
  svg += `<path d="M460 ${ys[1]} h6 V${ys[2] + ih} h-6" fill="none" stroke="${BLUE}" stroke-width="1.4"/>` + para(476, midY(rm, rp.height, 10.5), L('rich'), 136, 10.5, BLUE, 'start', 700).svg;
  return { svg, height: py + ph + 8 };
}

// ── 第 3 階段 G1（2.26.0，ch04–ch05）──
// 三欄定律圖共用：上方是根節點，往下接三欄；每欄上方是分支名、中間由 body 畫、下方是結論（照搬被取代的分支方框）
function lawColumns(L, para, y0, rootKey, cols, bodyH, body) {
  const cw = 196, gap = 10, xs = [0, 1, 2].map(i => 16 + i * (cw + gap));
  const rp = para(0, 0, L(rootKey), 260, 12, INK, 'middle', 800), rh = rp.height + 16;
  let svg = card(180, y0, 280, rh, TEAL_XL, TEAL, 6) + para(320, y0 + 8 + 12, L(rootKey), 260, 12, INK, 'middle', 800).svg;
  const top = y0 + rh + 22;
  const heads = cols.map(([b]) => para(0, 0, L(b), cw - 20, 11.5, INK, 'middle', 700)), hh = Math.max(...heads.map(h => h.height)) + 14;
  const leaves = cols.map(([, l]) => para(0, 0, L(l), cw - 20, 10.5)), lh = Math.max(...leaves.map(h => h.height)) + 14;
  const ch = hh + bodyH + lh;
  xs.forEach((x, i) => {
    svg += `<path d="M320 ${y0 + rh} V${y0 + rh + 10} H${x + cw / 2} V${top}" fill="none" stroke="${TEAL}" stroke-width="1.3"/>`
      + card(x, top, cw, ch, '#ffffff', LINE) + `<path d="M${x + 1} ${top + hh} H${x + cw - 1}" stroke="${LINE}"/><rect x="${x + 1}" y="${top + hh + bodyH}" width="${cw - 2}" height="${lh - 1}" rx="7" fill="${LIGHT}"/>`
      + para(x + cw / 2, midY(top + hh / 2, heads[i].height, 11.5), L(cols[i][0]), cw - 20, 11.5, AMBER, 'middle', 700).svg
      + para(x + cw / 2, midY(top + hh + bodyH + lh / 2, leaves[i].height, 10.5), L(cols[i][1]), cw - 20, 10.5, INK_2).svg
      + body(i, x, top + hh, cw);
  });
  return { svg, bottom: top + ch };
}

// ch04 微影的三個主角：光罩上的圖形經曝光機縮小四倍，投影到晶圓上的一個曝光區；曝完一塊再移到下一塊。
// 技術審查修正：光罩圖形與一個曝光區的邊長按四比一畫，收斂光束只對到亮起的那一格，兩者是同一個圖案；
// 一疊光罩放在旁邊、不在投影路徑上；晶圓表面塗著光阻，三個主角都在圖上
function scannerFields(spec, en, kit) {
  const { L, t, lead } = tools(spec, en, kit);
  const wx = 180, wy = 274, r = 96, n = 12, m = 10, cw = (2 * r) / n, ch = (2 * r) / m;
  const fc = 6, fr = 4, fx = wx - r + fc * cw, fy = wy - r + fr * ch, mx = fx + cw / 2, pw = cw * 4, ph = ch * 4, px = mx - pw / 2, py = 30;
  const motif = (x, y, w, h, c) => [[0.12, 0.12, 0.16, 0.76], [0.72, 0.12, 0.16, 0.76], [0.12, 0.12, 0.76, 0.16], [0.42, 0.42, 0.16, 0.46]].map(([a, b, c2, d]) => `<rect x="${(x + a * w).toFixed(1)}" y="${(y + b * h).toFixed(1)}" width="${(c2 * w).toFixed(1)}" height="${(d * h).toFixed(1)}" fill="${c}"/>`).join('');
  const id = `sf-${en ? 'en' : 'zh'}`;
  // 一疊光罩：每一層一片，不在投影路徑上
  let svg = [2, 1, 0].map(k => `<rect x="${34 + k * 7}" y="${34 + k * 7}" width="58" height="62" rx="2" fill="#f1f5f9" stroke="${INK_2}"/>`).join('') + motif(34, 34, 58, 62, '#94a3b8') + t(70, 124, L('dozens'), 10.5, INK_2, 'middle', 600);
  // 光罩與縮小投影：光束從光罩圖形收斂到亮起的那一格
  svg += `<rect x="${px - 12}" y="${py - 8}" width="${pw + 24}" height="${ph + 16}" rx="2" fill="#f1f5f9" stroke="${INK_2}"/>` + motif(px, py, pw, ph, INK_2)
    + `<ellipse cx="${mx}" cy="146" rx="44" ry="8" fill="${BLUE_XL}" stroke="${BLUE}" stroke-width="1.4"/>`;
  // 晶圓：表面塗著光阻，曝光區一格一格排滿；已曝過的格子淡青色，邊緣不完整的格子淡化
  svg += `<clipPath id="${id}"><circle cx="${wx}" cy="${wy}" r="${r}"/></clipPath><circle cx="${wx}" cy="${wy}" r="${r}" fill="${AMBER_XL}" stroke="${INK_2}" stroke-width="1.4"/><g clip-path="url(#${id})">`;
  const full = [];
  for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) {
    const x = wx - r + i * cw, y = wy - r + j * ch, inside = [[x, y], [x + cw, y], [x, y + ch], [x + cw, y + ch]].map(([a, b]) => Math.hypot(a - wx, b - wy) <= r);
    if (!inside.some(Boolean)) continue;
    const ok = inside.every(Boolean), order = j * n + (j % 2 ? n - 1 - i : i), done = order < fr * n + (fr % 2 ? n - 1 - fc : fc);
    if (ok) full.push([i, j]);
    svg += `<rect x="${(x + 0.8).toFixed(1)}" y="${(y + 0.8).toFixed(1)}" width="${(cw - 1.6).toFixed(1)}" height="${(ch - 1.6).toFixed(1)}" fill="${ok && done ? TEAL_XL : 'none'}" stroke="${ok ? AMBER : '#e2c79a'}" stroke-width=".6"${ok ? '' : ' stroke-dasharray="2 2"'}/>`;
  }
  // 收斂光束畫在晶圓格線之上（F 審查修正：原本先畫光束，被不透明的晶圓蓋住，看不出縮小四倍落在一個曝光區）
  svg += `</g><path d="M${px} ${py + ph} L${px + pw} ${py + ph} L${fx + cw} ${fy} L${fx} ${fy} Z" fill="${TEAL_L}" fill-opacity=".35"/>`
    + [[px, py, fx, fy], [px + pw, py, fx + cw, fy], [px, py + ph, fx, fy + ch], [px + pw, py + ph, fx + cw, fy + ch]].map(([a, b, c, d]) => `<path d="M${a.toFixed(1)} ${b.toFixed(1)} L${c.toFixed(1)} ${d.toFixed(1)}" stroke="${TEAL}" stroke-width=".8" stroke-dasharray="3 2"/>`).join('')
    + `<rect x="${fx + 0.8}" y="${fy + 0.8}" width="${cw - 1.6}" height="${ch - 1.6}" fill="${TEAL_L}" stroke="${TEAL}" stroke-width="1.4"/>` + motif(fx + 0.8, fy + 0.8, cw - 1.6, ch - 1.6, TEAL)
    + `<path d="M${wx - 4} ${wy + r - 0.5} l4 -5 4 5" fill="#ffffff" stroke="${INK_2}"/>`;
  // 蛇行路線：一列由左到右、下一列由右到左
  const rowsSeen = [...new Set(full.map(([, j]) => j))];
  let path = '', heads = '';
  rowsSeen.forEach((j, k) => {
    const cs = full.filter(([, jj]) => jj === j).map(([i]) => i), a = Math.min(...cs), b = Math.max(...cs), y = wy - r + (j + 0.5) * ch;
    const [s, e] = j % 2 ? [b, a] : [a, b], sx = wx - r + (s + 0.5) * cw, ex = wx - r + (e + 0.5) * cw;
    path += `${k ? 'L' : 'M'}${sx.toFixed(1)} ${y.toFixed(1)} L${ex.toFixed(1)} ${y.toFixed(1)} `;
    heads += `<path d="M${ex.toFixed(1)} ${y.toFixed(1)} l${j % 2 ? 5 : -5} -3 v6 z" fill="${TEAL}"/>`;
  });
  svg += `<path d="${path}" fill="none" stroke="${TEAL}" stroke-width=".9" stroke-opacity=".75"/>` + heads;
  // 標籤
  svg += t(px + pw + 24, 44, L('mask'), 12, INK, 'start', 800) + t(px + pw + 24, 60, L('quartz'), 10.5, INK_2, 'start')
    + t(mx + 52, 150, L('scanner'), 11.5, BLUE, 'start', 700) + t(mx + 30, 172, L('quarter'), 11.5, TEAL, 'start', 700)
    + lead(fx + cw, fy + ch / 2, 300, fy + ch / 2 - 4) + t(304, fy + ch / 2, L('field'), 11, TEAL, 'start', 700)
    + lead(wx + 70, wy + 30, 300, wy + 30) + t(304, wy + 34, L('hundred'), 10.5, INK_2, 'start', 600)
    + lead(wx + 52, wy + 78, 300, wy + 72) + t(304, wy + 76, L('pr'), 10.5, AMBER, 'start', 700)
    + t(wx, wy + r + 20, L('wafer'), 11, INK, 'middle', 700);
  return { svg, height: wy + r + 30 };
}

// ch04 怎麼印得更小：上帶是光源波長，長條從 0 起、長度與波長成正比；下帶是 193 nm 時代的三個技巧。
// 技術審查修正：不用沒有刻度的對數尺；浸潤式只在鏡頭下方加一薄層水；OPC 上排是沒修正、下排是修正後；
// 多重曝光用兩色交錯的密線表示，不寫第一次、第二次；不標折射率、NA 或節距
function printSmaller(spec, en, kit) {
  const { L, t, para, arrow, mark } = tools(spec, en, kit);
  const x0 = 170, k = 400 / 436, y0 = 14;
  const rows = [['hg', [['v436', 436], ['v365', 365]], [AMBER_L, AMBER]], ['krf', [['v248', 248]], [BLUE_L, BLUE]], ['arf', [['v193', 193]], [BLUE_L, BLUE]], ['euv', [['v135', 13.5]], [PLASMA, VIOLET]]];
  let y = y0, svg = '', yArf = 0, yEuv = 0;
  rows.forEach(([n, bars, [f, s]]) => {
    const h = bars.length * 14 - 4;
    svg += t(x0 - 8, y + h / 2 + 4, L(n), 10.5, INK, 'end', 700);
    bars.forEach(([v, nm], j) => { const by = y + j * 14, w = nm * k; svg += `<rect x="${x0}" y="${by}" width="${w.toFixed(1)}" height="10" rx="2" fill="${f}" stroke="${s}"/>` + t(x0 + w + 6, by + 9, L(v), 10, INK_2, 'start', 600); });
    if (n === 'arf') yArf = y;
    if (n === 'euv') yEuv = y;
    y += h + 10;
  });
  svg += `<path d="M${x0} ${y0 - 4} V${y - 6}" stroke="${INK_2}" stroke-width="1.2"/>` + arrow(612, y0, 612, yEuv + 8, TEAL, 1.4)
    + t(604, yEuv + 9, L('shorter'), 10.5, TEAL, 'end', 700) + t(604, yEuv + 25, L('pen'), 10, INK_2, 'end');
  // 下帶：193 nm 用了很多年，產業發展出三個技巧
  const hy = yEuv + 52;
  // 虛線從 193 nm 長條轉折接到下帶標題（G1 審查修正：原本停在空白處，像一條門檻）
  svg += `<path d="M${x0 + 193 * k - 20} ${yArf + 11} V${hy - 4} H${16 + textW(L('years'), 11.5) + 8}" fill="none" stroke="${MUTED}" stroke-dasharray="3 3"/>` + t(16, hy, L('years'), 11.5, INK, 'start', 700);
  const top = hy + 10, cw = 196, xs = [16, 222, 428];
  const heads = ['immersion', 'opc', 'multi'];
  const notes = [['water', 'better'], ['distort', 'wrongly', 'correct'], ['twoPlus', 'cost']];
  const noteH = notes.map(ks => ks.reduce((s, k2) => s + para(0, 0, L(k2), cw - 24, 10).height + 3, 0));
  const ch = 30 + 96 + Math.max(...noteH) + 8;
  xs.forEach((x, i) => {
    svg += card(x, top, cw, ch, '#ffffff', LINE) + t(x + 12, top + 20, L(heads[i]), 12, TEAL, 'start', 800);
    let ny = top + 30 + 96 + 10;
    for (const k2 of notes[i]) { const p = para(x + 12, ny, L(k2), cw - 24, 10, k2 === 'distort' ? RED : INK_2, 'start', k2 === 'better' || k2 === 'correct' ? 600 : 400); svg += p.svg; ny += p.height + 3; }
  });
  // 浸潤式：鏡頭最後一片的平底下方夾一薄層水
  let x = xs[0], ay = top + 30;
  svg += [-24, -8, 8, 24].map(d => `<path d="M${x + 98 + d} ${ay + 2} L${x + 98 + d * 0.55} ${ay + 26}" stroke="${AMBER}" stroke-opacity=".6"/>`).join('')
    + `<path d="M${x + 58} ${ay + 26} Q ${x + 98} ${ay + 6} ${x + 138} ${ay + 26} V${ay + 52} H${x + 58} Z" fill="${BLUE_XL}" stroke="${BLUE}"/>`
    + `<rect x="${x + 50}" y="${ay + 52}" width="96" height="6" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".6"/>` + [x + 64, x + 84, x + 112, x + 132].map(d => `<path d="M${d} ${ay + 55} q3 -2 6 0" fill="none" stroke="${BLUE}" stroke-width=".6"/>`).join('')
    + `<rect x="${x + 30}" y="${ay + 58}" width="136" height="6" fill="${RESIST}" stroke="${AMBER}" stroke-width=".6"/><rect x="${x + 30}" y="${ay + 64}" width="136" height="18" fill="${SI}" stroke="${INK_2}"/>`;
  // OPC：上排原本的長方形印出來變圓、變短；下排角落加小方塊、線端加寬，印出來接近長方形
  x = xs[1];
  const shape = (sx, sy, fix) => `<rect x="${sx}" y="${sy}" width="44" height="14" fill="${INK_2}"/>` + (fix ? [[-4, -4], [40, -4], [-4, 10], [40, 10]].map(([a, b]) => `<rect x="${sx + a}" y="${sy + b}" width="8" height="8" fill="${INK_2}"/>`).join('') : '');
  svg += t(x + 38, ay + 10, L('mask'), 10, MUTED, 'middle', 700) + t(x + 131, ay + 10, L('printed'), 10, MUTED, 'middle', 700)
    + shape(x + 16, ay + 20, false) + arrow(x + 72, ay + 27, x + 104, ay + 27, INK_2, 1.2) + `<rect x="${x + 114}" y="${ay + 22}" width="34" height="10" rx="5" fill="${TEAL_L}" stroke="${TEAL}"/>` + xmark(x + 166, ay + 27, 4)
    + shape(x + 16, ay + 62, true) + arrow(x + 72, ay + 69, x + 104, ay + 69, INK_2, 1.2) + `<rect x="${x + 112}" y="${ay + 62}" width="44" height="14" rx="1.5" fill="${TEAL_L}" stroke="${TEAL}"/>` + tick(x + 172, ay + 69);
  // 多重曝光：等距的密線拆成 A、B 兩組交錯，每組的節距是合起來的兩倍
  x = xs[2];
  svg += Array.from({ length: 10 }, (_, j) => `<rect x="${x + 30 + j * 14}" y="${ay + 26}" width="7" height="48" fill="${j % 2 ? AMBER_L : TEAL_L}" stroke="${j % 2 ? AMBER : TEAL}"/>`).join('')
    + Array.from({ length: 10 }, (_, j) => t(x + 33.5 + j * 14, ay + 18, j % 2 ? 'B' : 'A', 9.5, j % 2 ? AMBER : TEAL, 'middle', 800)).join('');
  return { svg, height: top + ch + 8 };
}

// ch04 微影曝光世代與 High-NA 條例總覽：五個世代放在同一把解析度軸上，左粗右細，橫軸是對數刻度但不印刻度；
// 引線拉到下方五欄，每欄是世代名、解析度、光源與 NA（正文原文）以及原本的用途短句（技術審查修正：不放產品名）
function lithoGens(spec, en, kit) {
  const { L, t, para, breakAt, arrow } = tools(spec, en, kit);
  const X = v => 40 + (560 * Math.log10(1000 / v)) / Math.log10(125), ay = 40;
  let svg = t(16, 18, L('res'), 11.5, INK, 'start', 800) + `<path d="M24 ${ay} H600" stroke="${INK_2}" stroke-width="1.4"/>` + arrow(596, ay, 612, ay, INK_2, 1.4)
    + t(40, ay - 10, L('endL'), 9.5, MUTED, 'middle', 600) + t(600, ay - 10, L('endR'), 9.5, MUTED, 'middle', 600);
  const marks = [(X(1000) + X(350)) / 2, (X(180) + X(65)) / 2, X(38), X(13), X(8)];
  svg += `<rect x="${X(1000)}" y="${ay - 5}" width="${(X(350) - X(1000)).toFixed(1)}" height="10" rx="2" fill="${AMBER_L}" stroke="${AMBER}"/>` + arrow(X(1000) + 4, ay, 28, ay, AMBER, 1.6)
    + `<rect x="${X(180).toFixed(1)}" y="${ay - 5}" width="${(X(65) - X(180)).toFixed(1)}" height="10" rx="2" fill="${BLUE_L}" stroke="${BLUE}"/>`
    + [X(38), X(13), X(8)].map((x, i) => `<circle cx="${x.toFixed(1)}" cy="${ay}" r="5" fill="${[TEAL, VIOLET, PINK][i]}"/>`).join('');
  const cw = 116.8, cols = [['g0', 'r0', ['s0a', 's0b', 's0c'], 'u0'], ['g1', 'r1', ['s1a', 's1b'], 'u1'], ['g2', 'r2', ['s2a', 's2b'], 'u2'], ['g3', 'r3', ['s3b', 's3'], 'u3'], ['g4', 'r4', ['s4'], 'u4']];
  const block = (x, keys, draw) => {
    let y = 92, out = '';
    const [g, r, s, u] = keys;
    for (const [k, size, fill, w] of [[g, 10.5, INK, 700], [r, 10.5, TEAL, 700], ...s.map(k2 => [k2, 9.5, INK_2, 400]), [u, 9.5, MUTED, 400]]) {
      const cut = { r0: '350', r4: '解析度' }[k], p = cut ? breakAt(x + 8, y, L(k), cut, cw - 16, size, fill, 'start', w) : para(x + 8, y, L(k), cw - 16, size, fill, 'start', w);
      if (draw) out += p.svg;
      y += p.height + (k === r || k === s[s.length - 1] ? 5 : 1);
    }
    return { svg: out, bottom: y };
  };
  const ch = Math.max(...cols.map(c => block(0, c, false).bottom)) - 70;
  cols.forEach((c, i) => {
    const x = 16 + i * (cw + 6);
    svg += `<path d="M${marks[i].toFixed(1)} ${ay + 6} L${(x + cw / 2).toFixed(1)} 72" stroke="${MUTED}" stroke-dasharray="2 2"/>` + card(x, 72, cw, ch, '#ffffff', LINE) + block(x, c, true).svg;
  });
  return { svg, height: 72 + ch + 8 };
}

// ch04 定量物理定律：取代三定律分支方框，三欄各放分支名、正文的關鍵數字與原本的對策（技術審查修正：
// EPE < 5 nm 在正文是 TeX，不上圖；14 倍放在同一張卡裡講兩面；表格只有三列，不寫「四」）
function lithoLaws(spec, en, kit) {
  const { L, t, para } = tools(spec, en, kit);
  const cols = [['b1', 'l1'], ['b2', 'l2'], ['b3', 'l3']];
  const cards = [[['dof', 10.5, INK_2, 600], ['big0', 17, TEAL, 800], ['cond0', 10, MUTED, 400]], [['photon', 10.5, INK_2, 600], ['big1', 17, TEAL, 800], ['x14', 10.5, INK, 600], ['fewer', 10.5, RED, 700], ['dose', 10, MUTED, 400]], [['ovl', 10.5, INK_2, 600], ['big2', 14, TEAL, 800], ['cond2', 10, MUTED, 400]]];
  const hOf = rows => rows.reduce((s, [k, size]) => s + (size > 12 ? size * 0.45 : 0) + para(0, 0, L(k), 172, size).height + 4, 0);
  const bodyH = Math.max(...cards.map(hOf)) + 26;
  const tree = lawColumns(L, para, 12, 'root', cols, bodyH, (i, x, y, cw) => {
    let yy = y + 14 + 12, out = '';
    for (const [k, size, fill, w] of cards[i]) { const pad = size > 12 ? size * 0.45 : 0, p = para(x + cw / 2, yy + pad, L(k), cw - 24, size, fill, 'middle', w); out += p.svg; yy += pad + p.height + 4; }
    return out;
  });
  return { svg: tree.svg, height: tree.bottom + 8 };
}

// ch05 常見異常：五張卡片，每張是一個異常的小剖面、名稱與結果（可能原因留給下方表格）；版式沿用 ch04 的微影異常圖，
// 微粒與空洞的畫法沿用同章的薄膜指標圖
function filmDefects(spec, en, kit) {
  const { L, para } = tools(spec, en, kit);
  const w = 115.2, gap = 8;
  const sub = (x, y) => `<rect x="${x + 10}" y="${y + 50}" width="${w - 20}" height="16" fill="${SI}" stroke="${INK_2}"/>`;
  const art = [
    // 膜厚偏厚或偏薄：虛線是目標厚度，左半偏厚、右半偏薄
    (x, y) => [[x + 8, 30], [x + 62, 42]].map(([bx, top]) => `<rect x="${bx}" y="${y + 50}" width="${45}" height="16" fill="${SI}" stroke="${INK_2}"/><rect x="${bx}" y="${y + top}" width="45" height="${50 - top}" fill="${TEAL_L}" stroke="${TEAL}"/><path d="M${bx - 3} ${y + 37} h51" stroke="${INK_2}" stroke-dasharray="3 2"/>`).join(''),
    // 均勻度差：同一片晶圓上，中間厚、邊緣薄
    (x, y) => sub(x, y) + `<path d="M${x + 10} ${y + 50} V${y + 44} Q ${x + w / 2} ${y + 20} ${x + w - 10} ${y + 44} V${y + 50} Z" fill="${TEAL_L}" stroke="${TEAL}"/><path d="M${x + 6} ${y + 37} H${x + w - 6}" stroke="${INK_2}" stroke-dasharray="3 2"/>`,
    // 微粒：薄膜裡夾著一顆微粒，表面跟著鼓起
    (x, y) => sub(x, y) + `<path d="M${x + 10} ${y + 50} V${y + 38} H${x + w / 2 - 14} Q ${x + w / 2} ${y + 22} ${x + w / 2 + 14} ${y + 38} H${x + w - 10} V${y + 50} Z" fill="${TEAL_L}" stroke="${TEAL}"/><circle cx="${x + w / 2}" cy="${y + 40}" r="5" fill="${RED}"/>`,
    // 薄膜剝落或龜裂：膜上有裂縫，右端翹起剝落
    (x, y) => sub(x, y) + `<path d="M${x + 10} ${y + 50} V${y + 40} H${x + 74} L${x + 76} ${y + 50} Z" fill="${TEAL_L}" stroke="${TEAL}"/><path d="M${x + 80} ${y + 50} L${x + 80} ${y + 42} Q ${x + 92} ${y + 34} ${x + 104} ${y + 22} L${x + 106} ${y + 28} Q ${x + 94} ${y + 40} ${x + 86} ${y + 50} Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
      + [34, 56].map(d => `<path d="M${x + d} ${y + 40} l2 4 -2 3 2 3" fill="none" stroke="${RED}" stroke-width="1.2"/>`).join(''),
    // 空洞：填溝時開口先被封住，裡面留下空洞
    (x, y) => `<path d="M${x + 10} ${y + 66} V${y + 34} H${x + 44} V${y + 64} H${x + w - 44} V${y + 34} H${x + w - 10} V${y + 66} Z" fill="${SI}" stroke="${INK_2}"/><path d="M${x + 10} ${y + 34} V${y + 26} H${x + w - 10} V${y + 34} H${x + w - 44} V${y + 64} H${x + 44} V${y + 34} Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
      + `<path d="M${x + w / 2} ${y + 36} C${x + w / 2 - 6} ${y + 46}, ${x + w / 2 - 6} ${y + 56}, ${x + w / 2} ${y + 58} C${x + w / 2 + 6} ${y + 56}, ${x + w / 2 + 6} ${y + 46}, ${x + w / 2} ${y + 36} Z" fill="#ffffff" stroke="${RED}"/>`
  ];
  const cards = [['thick', 'thickResult'], ['uniform', 'uniformResult'], ['particles', 'particlesResult'], ['peel', 'peelResult'], ['voids', 'voidsResult']];
  const texts = cards.map(([a, b]) => [para(0, 0, L(a), w - 14, 11, INK, 'middle', 700), para(0, 0, L(b), w - 14, 10)]);
  const head = Math.max(...texts.map(([a]) => a.height)), cardH = 88 + head + Math.max(...texts.map(([, b]) => b.height)) + 6;
  let svg = '';
  cards.forEach(([a, b], i) => {
    const x = 16 + i * (w + gap);
    svg += card(x, 12, w, cardH, '#ffffff', LINE) + art[i](x, 16) + para(x + w / 2, 100, L(a), w - 14, 11, INK, 'middle', 700).svg + para(x + w / 2, 100 + head + 2, L(b), w - 14, 10, RED).svg;
  });
  return { svg, height: 12 + cardH + 8 };
}

// ch05 六大薄膜沉積與電鍍超填條例總覽：上方保留原本的三組六條例；下方一條帶子畫電鍍超填的三個階段。
// 技術審查修正：加速劑一開始稀疏分布在所有表面，孔底隨銅生長縮小，同樣數量的加速劑才被擠濃；抑制劑集中在表面與孔口；
// 加速劑用紫色，不和銅色混淆；溝槽開在介電層裡；不標數字
function filmClauses(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const cw = 196, gap = 10, cols = [['c1', [['k1a', 'd1a', 'n1a'], ['k1b', 'd1b', 'n1b']]], ['c2', [['k2a', 'd2a', 'n2a'], ['k2b', 'd2b', 'n2b'], ['k2c', 'd2c', 'n2c']]], ['c3', [['k3a', 'd3a', 'n3a']]]];
  const block = (x, items, draw) => {
    let y = 12 + 36, out = '';
    for (const [k, d, nt] of items) {
      const a = para(x + 12, y, L(k), cw - 24, 11, TEAL, 'start', 800), b = para(x + 12, y + a.height, L(d), cw - 24, 10, INK, 'start'), c = para(x + 12, y + a.height + b.height, L(nt), cw - 24, 9.5, MUTED, 'start');
      if (draw) out += a.svg + b.svg + c.svg;
      y += a.height + b.height + c.height + 8;
    }
    return { svg: out, bottom: y };
  };
  const ch = Math.max(...cols.map(([, items]) => block(0, items, false).bottom)) - 12;
  let svg = '';
  cols.forEach(([h, items], i) => { const x = 16 + i * (cw + gap); svg += card(x, 12, cw, ch, '#ffffff', LINE) + t(x + 12, 12 + 22, L(h), 12, INK, 'start', 800) + block(x, items, true).svg; });
  // 下方：電鍍超填的三個階段
  const B = 12 + ch + 16, by = B + 40, dw = 120, tw = 34, td = 52;
  svg += card(16, B, 608, 152, LIGHT, LINE) + t(28, B + 20, L('k3a'), 12, INK, 'start', 800);
  const trench = x => `<path d="M${x} ${by} H${x + (dw - tw) / 2} V${by + td} H${x + (dw + tw) / 2} V${by} H${x + dw} V${by + 72} H${x} Z" fill="#dbe4ee" stroke="${INK_2}"/>`
    + `<path d="M${x} ${by} H${x + (dw - tw) / 2} V${by + td} H${x + (dw + tw) / 2} V${by} H${x + dw}" fill="none" stroke="${COPPER}" stroke-width="2.4"/>`;
  const dot = (x, y, c) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2" fill="${c}"/>`;
  const sup = x => [6, 16, 26, 36, 84, 94, 104, 114].map(d => dot(x + d, by - 4, BLUE)).join('') + [[(dw - tw) / 2 + 3, 5], [(dw + tw) / 2 - 3, 5], [(dw - tw) / 2 + 3, 13], [(dw + tw) / 2 - 3, 13]].map(([a, b]) => dot(x + a, by + b, BLUE)).join('');
  const xa = 30, xb = 196, xc = 362, lw = (dw - tw) / 2 + 4, rw = (dw + tw) / 2 - 4;
  // A：連續的薄晶種層；抑制劑密集在表面與孔口，同樣六顆加速劑稀疏分布在側壁與孔底
  svg += trench(xa) + sup(xa) + [[lw, 26], [rw, 34], [lw, 44], [lw + 8, td - 4], [dw / 2 + 2, td - 4], [rw - 6, td - 4]].map(([a, b]) => dot(xa + a, by + b, VIOLET)).join('');
  // B：銅從孔底往上長，孔底變小，同樣數量的加速劑擠在變小的孔底
  const fillB = 26;
  svg += trench(xb) + sup(xb) + `<path d="M${xb + (dw - tw) / 2 + 1.2} ${by + td - 1.2} V${by + td - fillB} Q ${xb + dw / 2} ${by + td - fillB - 4} ${xb + (dw + tw) / 2 - 1.2} ${by + td - fillB} V${by + td - 1.2} Z" fill="${COPPER}"/>`
    + [-12, -7, -2, 3, 8, 13].map(d => dot(xb + dw / 2 + d, by + td - fillB - 4, VIOLET)).join('');
  // C：填滿、沒有空洞；溝槽上方的小凸起由整平劑壓住
  svg += trench(xc) + `<path d="M${xc} ${by} H${xc + (dw - tw) / 2} V${by + td} H${xc + (dw + tw) / 2} V${by} H${xc + dw} V${by - 10} H${xc + (dw + tw) / 2 + 6} Q ${xc + dw / 2} ${by - 20} ${xc + (dw - tw) / 2 - 6} ${by - 10} H${xc} Z" fill="${COPPER}" stroke="${AMBER}" stroke-width=".6"/>`
    + [-10, 0, 10].map(d => dot(xc + dw / 2 + d, by - 18 + Math.abs(d) * 0.3, GREEN)).join('');
  svg += arrow(xa + dw + 8, by + 30, xb - 8, by + 30) + arrow(xb + dw + 8, by + 30, xc - 8, by + 30)
    + t(xa + dw / 2, by + 90, L('seed'), 10, AMBER, 'middle', 600) + t(xb + dw / 2, by + 90, L('bottomUp'), 10, INK, 'middle', 600) + t(xc + dw / 2, by + 90, L('voidFree'), 10, TEAL, 'middle', 700)
    + t(xa + 8, by + 66, L('diel'), 9.5, INK_2, 'start');
  // 圖例：三種添加劑
  const lg = [['supp', BLUE], ['acc', VIOLET], ['lev', GREEN]];
  let ly = B + 44;
  for (const [k, c] of lg) { const p = para(510, ly, L(k), 108, 9.5, INK, 'start', 600); svg += dot(500, ly - 3.5, c) + p.svg; ly += p.height + 8; }
  return { svg, height: B + 160 };
}

// ch05 定量物理定律：取代三定律分支方框。第一欄畫氧化層剖面：原表面是虛線，氧化層四成四在原表面下、五成六在上；
// 第二欄是 ALD 深孔的深寬比；第三欄是電鍍銅孔底比孔口長得快的倍數（技術審查修正：SiO₂ 在正文是 TeX，不上圖；
// 0.44 標的是被消耗的矽；深孔不按深寬比畫，中段用斷裂記號省略）
function filmLaws(spec, en, kit) {
  const { L, t, para, dim, arrow } = tools(spec, en, kit);
  const cols = [['b1', 'l1'], ['b2', 'l2'], ['b3', 'l3']], bodyH = 196;
  const tree = lawColumns(L, para, 12, 'root', cols, bodyH, (i, x, y, cw) => {
    if (i === 0) {
      // 氧化層剖面：總厚 40px，原表面虛線下 17.6、上 22.4
      const s = y + 52, T = 40, below = T * 0.44, ox = x + 46, ow = 70;
      let out = `<rect x="${ox}" y="${s + below}" width="${ow}" height="28" fill="${SI}" stroke="${INK_2}"/><rect x="${ox}" y="${s - T + below}" width="${ow}" height="${T}" fill="${AMBER_XL}" stroke="${AMBER}"/>`
        + `<path d="M${ox - 8} ${s} H${ox + ow + 8}" stroke="${INK_2}" stroke-dasharray="3 2"/>`
        + t(ox + ow / 2, s - 4, L('ox'), 10, AMBER, 'middle', 700) + t(ox + ow / 2, s + below + 18, L('si'), 9.5, INK, 'middle', 600)
        + dim(ox - 14, s - T + below, ox - 14, s + below, INK) + t(ox - 20, s - T / 2 + below + 4, en ? `${L('t1')} ${L('nm')}` : `${L('t1')} ${L('nm')}`, 10, INK, 'end', 700)
        + dim(ox + ow + 14, s, ox + ow + 14, s + below, RED) + t(ox + ow + 20, s + below / 2 + 4, `${L('t044')} ${L('nm')}`, 10, RED, 'start', 700) + t(ox + ow + 20, s + below / 2 + 18, L('consumed'), 9.5, RED, 'start', 600);
      // 厚度隨時間：前段直線，後段變緩
      const gx = x + 30, gy = y + 186, gw = 150, gh = 66;
      out += `<path d="M${gx} ${gy - gh} V${gy} H${gx + gw}" fill="none" stroke="${INK_2}" stroke-width="1.1"/>`
        + `<path d="M${gx} ${gy} L${gx + 40} ${gy - 26} Q ${gx + 90} ${gy - 52} ${gx + gw - 4} ${gy - 60}" fill="none" stroke="${TEAL}" stroke-width="1.8"/>`
        + t(gx + 4, gy - gh - 4, L('thk'), 9.5, MUTED, 'start', 600) + t(gx + gw, gy + 12, L('time'), 9.5, MUTED, 'end', 600)
        + t(gx + 30, gy - 4, L('rate'), 9, TEAL, 'start') + t(gx + gw - 2, gy - 68, L('diff'), 9, TEAL, 'end');
      return out;
    }
    if (i === 1) {
      // ALD 深孔：中段用斷裂記號省略深度，薄膜沿側壁與孔底等厚
      const hx = x + 120, top = y + 16, hw = 18;
      let out = `<rect x="${hx - 26}" y="${top}" width="${hw + 52}" height="168" fill="${SI}" stroke="${INK_2}"/><rect x="${hx}" y="${top}" width="${hw}" height="160" fill="#ffffff"/>`
        + `<path d="M${hx - 26} ${top} H${hx} V${top + 160} H${hx + hw} V${top} H${hx + hw + 26}" fill="none" stroke="${TEAL}" stroke-width="2.4"/>`
        + `<path d="M${hx - 30} ${top + 74} l8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 M${hx - 30} ${top + 84} l8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6" fill="none" stroke="#ffffff" stroke-width="4"/>`
        + `<path d="M${hx - 30} ${top + 74} l8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 M${hx - 30} ${top + 84} l8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6" fill="none" stroke="${INK_2}"/>`;
      const big = para(x + 54, top + 50, L('v50'), 90, 20, TEAL, 'middle', 800);
      out += big.svg + para(x + 54, top + 50 + big.height, L('ar'), 90, 10.5, INK, 'middle', 700).svg + para(x + 54, top + 100, L('pulse'), 84, 10, INK_2).svg;
      return out;
    }
    // 電鍍：溝槽裡的銅，孔底的箭頭長、孔口的箭頭短
    const tx2 = x + 104, top = y + 70, tw2 = 50, td2 = 96;
    let out = `<path d="M${tx2 - 24} ${top} H${tx2} V${top + td2} H${tx2 + tw2} V${top} H${tx2 + tw2 + 24} V${top + td2 + 18} H${tx2 - 24} Z" fill="#dbe4ee" stroke="${INK_2}"/>`
      + `<rect x="${tx2 + 1}" y="${top + td2 - 40}" width="${tw2 - 2}" height="39" fill="${COPPER}"/>`
      + arrow(tx2 + tw2 / 2, top + td2 - 42, tx2 + tw2 / 2, top + 22, AMBER, 2.2) + arrow(tx2 + 2, top + 6, tx2 + 9, top + 6, AMBER, 1.2) + arrow(tx2 + tw2 - 2, top + 6, tx2 + tw2 - 9, top + 6, AMBER, 1.2)
      + t(tx2 + tw2 / 2, top - 8, L('mouth'), 9.5, INK_2, 'middle', 600);
    const big = para(x + 50, y + 34, L('v510'), 90, 18, TEAL, 'middle', 800);
    out += big.svg + para(x + 50, y + 34 + big.height, L('growth'), 80, 10, INK, 'middle', 700).svg;
    return out;
  });
  return { svg: tree.svg, height: tree.bottom + 8 };
}

// ch05 現場異常徵兆：取代三大異常分支方框，三欄各畫一個剖面；名稱與對策照搬方框（技術審查：懸垂要畫得比孔中段厚，
// 與同章薄膜指標圖刻意不畫懸垂的「等厚生長」區分；ALD 膜厚誇大成由上往下變薄；晶種層上段連續、下段斷開）
function filmFailures(spec, en, kit) {
  const { L, t, para, breakAt, lead } = tools(spec, en, kit);
  const cols = [['b1', 'l1'], ['b2', 'l2'], ['b3', 'l3']], bodyH = 186;
  const tree = lawColumns(L, para, 12, 'root', cols, bodyH, (i, x, y, cw) => {
    const sx = x + 48, top = y + 22, w = 100, tw = 36, td = 104, l = sx + (w - tw) / 2, r = l + tw;
    let out = `<path d="M${sx} ${top} H${l} V${top + td} H${r} V${top} H${sx + w} V${top + td + 16} H${sx} Z" fill="${SI}" stroke="${INK_2}"/>`;
    if (i === 0) {
      // 孔口兩側的懸垂比中段厚，提前封口，中央留下鑰匙孔狀空洞
      // 薄膜填滿溝槽，孔口兩側的懸垂鼓起、提前封口，只在中央留下鑰匙孔狀空洞（G1 審查修正：原本空洞畫了兩層輪廓）
      out += `<path d="M${sx} ${top - 5} H${l - 4} Q ${l + 6} ${top - 16} ${(l + r) / 2} ${top - 9} Q ${r - 6} ${top - 16} ${r + 4} ${top - 5} H${sx + w} V${top} H${r} V${top + td} H${l} V${top} H${sx} Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
        + `<path d="M${(l + r) / 2} ${top + 14} C${(l + r) / 2 - 7} ${top + 40}, ${(l + r) / 2 - 7} ${top + 80}, ${(l + r) / 2} ${top + 92} C${(l + r) / 2 + 7} ${top + 80}, ${(l + r) / 2 + 7} ${top + 40}, ${(l + r) / 2} ${top + 14} Z" fill="#ffffff" stroke="${RED}"/>`
        + lead(l + 12, top - 2, l + 6, top - 12) + t(x + 10, top - 14, L('overhang'), 9.5, TEAL, 'start', 700)
        + lead((l + r) / 2 + 4, top + 60, sx + w + 4, top + 60) + t(sx + w + 6, top + 64, L('keyhole'), 9.5, RED, 'start', 700);
      return out;
    }
    if (i === 1) {
      // ALD 膜在深孔側壁由上往下變薄，孔底最薄（厚度誇大）
      out += `<path d="M${sx} ${top - 5} H${sx + w} V${top} H${sx} Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
        + `<path d="M${l} ${top} H${l + 6} L${l + 1} ${top + td - 1} H${r - 1} L${r - 6} ${top} H${r} V${top + td} H${l} Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
        + lead((l + r) / 2, top + td - 2, sx + w + 4, top + td + 4) + breakAt(sx + w + 6, top + td + 8, L('thin'), ['未飽和', '變薄'], 44, 9.5, RED, 'start', 700).svg;
      return out;
    }
    // 晶種層上段連續、下段斷開；銅填不到孔底，留下空洞
    out += `<path d="M${sx} ${top} H${l} V${top + 48} M${r} ${top + 48} V${top} H${sx + w}" fill="none" stroke="${COPPER}" stroke-width="2.4"/>`
      + [58, 74, 90].map(d => `<path d="M${l} ${top + d} v6 M${r} ${top + d + 4} v6" stroke="${COPPER}" stroke-width="2.4"/>`).join('')
      // 晶種斷開的下段長不出銅：銅底下到孔底整塊都是空洞，只描一層紅色輪廓（G1 審查修正：原本空洞裡又浮著一個橢圓）
      + `<path d="M${l + 1.2} ${top - 8} H${r - 1.2} V${top + 70} Q ${(l + r) / 2} ${top + 80} ${l + 1.2} ${top + 70} Z" fill="${COPPER}" fill-opacity=".85"/><path d="M${sx} ${top - 4} H${sx + w}" stroke="${COPPER}" stroke-width="4"/>`
      + `<path d="M${l + 2} ${top + 71} Q ${(l + r) / 2} ${top + 81} ${r - 2} ${top + 71} V${top + td - 2} H${l + 2} Z" fill="#ffffff" stroke="${RED}" stroke-width="1.2"/>`
      + lead(l + 1, top + 62, x + 14, top + 126) + para(x + 10, top + 136, L('seedBreak'), cw - 20, 9.5, AMBER, 'start', 600).svg
      + lead((l + r) / 2 + 10, top + 92, sx + w + 4, top + 100) + para(sx + w + 6, top + 104, L('bottomVoid'), 44, 9.5, RED, 'start', 700).svg;
    return out;
  });
  return { svg: tree.svg, height: tree.bottom + 8 };
}

// ── G2 批（2.27.0，第 3 階段 ch06–ch07）──
// 帶正電的離子（圈內加號）、帶負電的電子（圈內減號）：符號用線條畫，不用文字
const ionGlyph = (x, y, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${PINK_L}" stroke="${PINK}"/><path d="M${x - r * 0.55} ${y} h${r * 1.1} M${x} ${y - r * 0.55} v${r * 1.1}" stroke="${PINK}" stroke-width="1.3"/>`;
const elecGlyph = (x, y, r = 3.6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${BLUE_XL}" stroke="${BLUE}"/><path d="M${x - r * 0.55} ${y} h${r * 1.1}" stroke="${BLUE}" stroke-width="1.2"/>`;
// 細箭頭（箭頭小一號），用在離子軌跡
const thinArrow = (x1, y1, x2, y2, color, width = 1.1, h = 4.5) => {
  const a = Math.atan2(y2 - y1, x2 - x1), p = s => `${(x2 - h * Math.cos(a + s * 0.5)).toFixed(1)} ${(y2 - h * Math.sin(a + s * 0.5)).toFixed(1)}`;
  return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${color}" stroke-width="${width}" fill="none"/><path d="M${x2} ${y2} L${p(1)} L${p(-1)} Z" fill="${color}"/>`;
};
// 深孔：左右兩壁的點（由上往下），白底填滿、只描兩壁與孔底，孔口不描
const holeShape = (left, right, stroke = INK_2, width = 1) => {
  // 白色填色在孔口往上多蓋 1.5，蓋掉底板的上邊框，孔口不留細線（G2 審查修正）
  const lift = ([x, y]) => [x, y - 1.5];
  const pts = [lift(left[0]), ...left, ...right.slice().reverse(), lift(right[0])].map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const wall = [...left, ...right.slice().reverse()].map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return `<path d="${pts} Z" fill="#ffffff"/><path d="${wall}" fill="none" stroke="${stroke}" stroke-width="${width}"/>`;
};
// 顏色內插：熱（橘）到冷（淡藍），用在熱預算與背面退火的溫度色帶
const mixColor = (a, b, f) => {
  const pa = a.match(/\w\w/g).map(h => parseInt(h, 16)), pb = b.match(/\w\w/g).map(h => parseInt(h, 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * Math.max(0, Math.min(1, f))).toString(16).padStart(2, '0')).join('');
};
const COLD = '#e0f2fe', HOT = '#f97316';

// ch06 怎麼知道什麼時候該停：取代 A–E 流程方框，舊方框的八句全部保留。上排是同一個開口的三個時間點：
// A 蝕刻中；B 挖穿目標材料、碰到下一層，電漿光暈換色，一處還留著薄薄的殘留；C 過度蝕刻後清乾淨，下一層只被碰到一點。
// 右上是腔壁上的小窗與偵測器；下排是偵測器讀到的光強度：平段 → 斜坡 → 新的平段，終點偵測標在斜坡結束處，之後的陰影是過度蝕刻。
// 技術審查：不寫監測的是哪一種物種，曲線只畫成一種情形；挖太多的後果另畫一個下一層明顯凹陷的小剖面
function endpointTrace(spec, en, kit) {
  const { L, t, para, arrow, lead, mark } = tools(spec, en, kit);
  const w = 140, xs = [16, 170, 324], gy = 20, gh = 34, rt = 64, tm = rt + 10, nl = tm + 36, sb = nl + 14, o = 16;
  let svg = '';
  const bottoms = [];
  xs.forEach((x, i) => {
    const cx = x + w / 2, depth = i ? 36 : 18;
    svg += card(x, 12, w, sb + 18 - 12, '#ffffff', LINE)
      + `<rect x="${x + 8}" y="${gy}" width="${w - 16}" height="${gh}" rx="14" fill="${i ? BLUE_XL : PLASMA}" stroke="${i ? BLUE : VIOLET}" stroke-opacity=".45"/>`
      + `<rect x="${x + 6}" y="${tm}" width="${w - 12}" height="36" fill="${TEAL_L}" stroke="${TEAL}"/>`
      + `<rect x="${cx - o}" y="${tm - 0.5}" width="${2 * o}" height="${depth + 0.5}" fill="#ffffff"/>`
      + `<path d="${i ? `M${cx - o} ${tm} V${nl} M${cx + o} ${nl} V${tm}` : `M${cx - o} ${tm} V${tm + depth} H${cx + o} V${tm}`}" fill="none" stroke="${TEAL}"/>`
      + `<rect x="${x + 6}" y="${nl}" width="${w - 12}" height="14" fill="${BLUE_L}" stroke="${BLUE}"/><rect x="${x + 6}" y="${sb}" width="${w - 12}" height="10" fill="${SI}" stroke="${INK_2}"/>`
      + `<rect x="${x + 6}" y="${rt}" width="${cx - o - x - 6}" height="10" fill="${RESIST}" stroke="${AMBER}"/><rect x="${cx + o}" y="${rt}" width="${x + w - 6 - cx - o}" height="10" fill="${RESIST}" stroke="${AMBER}"/>`;
    // B：右半邊孔底還留著一層薄薄的目標材料；C：下一層只被碰到一點
    if (i === 1) svg += `<rect x="${cx + 1}" y="${nl - 3}" width="${o - 1}" height="3" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".8"/>`;
    if (i === 2) svg += `<rect x="${cx - o + 0.5}" y="${nl - 0.6}" width="${2 * o - 1}" height="3.1" fill="#ffffff"/><path d="M${cx - o} ${nl} V${nl + 2.5} H${cx + o} V${nl}" fill="none" stroke="${BLUE}"/>`;
    const stopY = i ? nl - 1 : tm + depth - 1;
    svg += [-8, 0, 8].map(d => thinArrow(cx + d, gy + gh + 3, cx + d, i === 1 && d > 0 ? nl - 4 : stopY, VIOLET)).join('') + mark(x + 2, 14, 'ABC'[i]);
    if (i === 0) svg += t(cx, gy + 21, L('plasma'), 10.5, VIOLET, 'middle', 700) + t(cx, tm + 30, L('target'), 9.5, TEAL, 'middle', 700) + t(cx, nl + 10.5, L('nextLayer'), 9, BLUE, 'middle', 700);
    if (i === 1) {
      const p = para(0, 0, L('chem'), w - 28, 10, BLUE, 'middle', 700);
      svg += para(cx, midY(gy + gh / 2, p.height, 10), L('chem'), w - 28, 10, BLUE, 'middle', 700).svg
        + lead(cx + o - 3, nl - 2, cx + o + 6, nl - 9) + t(cx + o + 8, nl - 8, L('residue'), 9.5, RED, 'start', 700);
    }
    if (i) {
      const a = para(cx, 158, L(i === 1 ? 'etchA' : 'oe'), w, 11, i === 1 ? INK : AMBER, 'middle', 700), b = para(cx, 158 + a.height + 1, L(i === 1 ? 'next' : 'clear'), w, 10.5, INK_2);
      svg += a.svg + b.svg;
      bottoms.push(158 + a.height + 1 + b.height);
    }
  });
  // 右上：腔壁上的小窗與偵測器，電漿的光穿過小窗
  svg += `<rect x="482" y="14" width="8" height="60" fill="#cbd5e1" stroke="${INK_2}"/><rect x="482" y="30" width="8" height="28" fill="${BLUE_XL}" stroke="${BLUE}"/>`
    + `<rect x="496" y="28" width="44" height="32" rx="4" fill="${INK_2}"/><ellipse cx="496" cy="44" rx="4" ry="10" fill="${BLUE_L}" stroke="${BLUE}"/><path d="M540 44 H556" stroke="${INK_2}" stroke-width="1.6"/>`
    + thinArrow(458, 30, 480, 38, BLUE, 1.2) + thinArrow(458, 44, 480, 48, BLUE, 1.2);
  const l1 = para(552, 92, L('light'), 140, 11, INK, 'middle', 700), l2 = para(552, 92 + l1.height, L('colorInt'), 140, 10.5, BLUE, 'middle', 600);
  const l3 = para(552, 92 + l1.height + l2.height + 6, L('watch'), 140, 10.5, INK_2);
  svg += l1.svg + l2.svg + l3.svg;
  bottoms.push(92 + l1.height + l2.height + 6 + l3.height);
  // 下排：偵測器讀到的光強度（橫軸是時間，只畫箭頭）
  const C0 = Math.max(...bottoms) + 12, ax = 64, ay = C0 + 116, hi = C0 + 36, lo = C0 + 74, sx = 250, xe = 300, oe = 362;
  svg += card(16, C0, 608, 128, LIGHT, LINE)
    + `<rect x="${xe}" y="${C0 + 12}" width="${oe - xe}" height="${ay - C0 - 12}" fill="${AMBER_XL}"/>`
    + arrow(ax, ay, ax, C0 + 12, INK_2, 1.1) + arrow(ax, ay, 474, ay, INK_2, 1.1)
    + `<rect x="${ax + 10}" y="${C0 + 13}" width="16" height="11" rx="2" fill="${INK_2}"/><ellipse cx="${ax + 10}" cy="${C0 + 18.5}" rx="2" ry="4" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".8"/>` + t(ax + 32, C0 + 22, L('intensity'), 10, MUTED, 'start', 600)
    + `<path d="M${xe} ${C0 + 12} V${ay}" stroke="${TEAL}" stroke-dasharray="4 3"/>`
    + `<path d="M${ax + 2} ${hi} H${sx} C${sx + 26} ${hi}, ${xe - 26} ${lo}, ${xe} ${lo} H466" fill="none" stroke="${TEAL}" stroke-width="2"/>`
    + t(xe - 6, C0 + 26, L('ep'), 11.5, TEAL, 'end', 800) + t((xe + oe) / 2, C0 + 56, L('oe'), 10.5, AMBER, 'middle', 700)
    + mark(150, hi, 'A') + mark(sx + 25, (hi + lo) / 2, 'B') + mark(331, lo, 'C');
  // 停得太早或挖得太久：紅色箭頭沿時間方向
  svg += arrow(xe - 4, C0 + 100, 110, C0 + 100, RED, 1.3) + para(200, C0 + 92, L('under'), 230, 10.5, RED, 'middle', 600).svg
    + arrow(oe + 4, C0 + 100, 484, C0 + 100, RED, 1.3);
  // 右：挖太多，下一層明顯凹陷
  const mx = 498, mc = mx + 54;
  svg += `<rect x="${mx}" y="${C0 + 16}" width="108" height="22" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${mc - 14}" y="${C0 + 15.5}" width="28" height="22.5" fill="#ffffff"/>`
    + `<rect x="${mx}" y="${C0 + 9}" width="${54 - 14}" height="7" fill="${RESIST}" stroke="${AMBER}"/><rect x="${mc + 14}" y="${C0 + 9}" width="${54 - 14}" height="7" fill="${RESIST}" stroke="${AMBER}"/>`
    + `<rect x="${mx}" y="${C0 + 38}" width="108" height="12" fill="${BLUE_L}" stroke="${BLUE}"/><rect x="${mx}" y="${C0 + 50}" width="108" height="8" fill="${SI}" stroke="${INK_2}"/>`
    + `<rect x="${mc - 13.5}" y="${C0 + 37.4}" width="27" height="8.6" fill="#ffffff"/><path d="M${mc - 14} ${C0 + 16} V${C0 + 38} M${mc + 14} ${C0 + 38} V${C0 + 16}" stroke="${TEAL}"/><path d="M${mc - 14} ${C0 + 38} V${C0 + 46} H${mc + 14} V${C0 + 38}" fill="none" stroke="${RED}" stroke-width="1.4"/>`
    + para(mc, C0 + 88, L('damage'), 120, 10.5, RED, 'middle', 600).svg;
  return { svg, height: C0 + 128 + 8 };
}

// ch06 越挖越深：取代分支方框（根、根的說明與三個分支照搬）。同一塊材料上三個深孔，深寬比約十五比一：
// A 帶小角度的離子斜的停在上段側壁、只有接近垂直的到得了孔底，等時間刻線越往下越密；B 下段變彎、扭曲（標寬與深的記號，不寫數字）；
// C 中段被挖得比較寬、孔底收窄
function harHoles(spec, en, kit) {
  const { L, para, arrow, dim, lead } = tools(spec, en, kit);
  const head = para(320, 24, L('deeper'), 400, 13, INK, 'middle', 800);
  const T = 24 + head.height + 46, D = 210, hw = 14, hx = [70, 270, 470], n = 42;
  let svg = head.svg + `<rect x="16" y="${T}" width="608" height="${D + 24}" fill="#dbe4ee" stroke="${INK_2}"/>`;
  const walls = (fn) => { const l = [], r = []; for (let k = 0; k <= n; k++) { const f = k / n, [c, half] = fn(f); l.push([c - half, T + f * D]); r.push([c + half, T + f * D]); } return [l, r]; };
  // A：直孔
  svg += holeShape(...walls(() => [hx[0] + hw / 2, hw / 2]));
  // B：下段左右彎
  svg += holeShape(...walls(f => [hx[1] + hw / 2 + (f < 0.5 ? 0 : 8 * Math.sin((f - 0.5) * Math.PI / 0.3)), hw / 2]));
  // C：中段鼓出、孔底收窄
  svg += holeShape(...walls(f => [hx[2] + hw / 2, (hw / 2 + 7 * Math.exp(-(((f - 0.38) / 0.13) ** 2))) * (f > 0.72 ? 1 - 0.45 * (f - 0.72) / 0.28 : 1)]));
  // 頂部遮罩
  svg += [[16, hx[0]], [hx[0] + hw, hx[1]], [hx[1] + hw, hx[2]], [hx[2] + hw, 624]].map(([a, b]) => `<rect x="${a}" y="${T - 9}" width="${b - a}" height="9" fill="${METAL_GATE}"/>`).join('');
  // A：離子從上方來，帶小角度的斜的打到上段側壁就停，只有接近垂直的到得了孔底
  const cx = hx[0] + hw / 2, m = T - 9;
  for (const [xe, deg] of [[-3, 7], [3, -7], [-1, 4], [2, -3], [0, 0], [-10, 8], [10, -8]]) {
    const a = deg * Math.PI / 180, x0 = cx + xe, wall = deg > 0 ? cx + hw / 2 : cx - hw / 2;
    const yEnd = Math.abs(xe) > hw / 2 ? m - 1 : deg ? Math.min(T + D - 3, m + (wall - x0) / Math.tan(a)) : T + D - 3;
    const xEnd = x0 + Math.tan(a) * (yEnd - m);
    svg += thinArrow(x0 - Math.tan(a) * 34, m - 34, xEnd, yEnd, VIOLET, 1)
      // 打到側壁的落點畫一個小點，看得出停在上段
      + (deg && Math.abs(xe) <= hw / 2 ? `<circle cx="${xEnd.toFixed(1)}" cy="${yEnd.toFixed(1)}" r="2.2" fill="${VIOLET}"/>` : '');
  }
  // 等時間刻線：深度和時間的平方根成正比，越往下越密；說明前放時鐘小圖示，表示每格時間相同（G2 審查修正）
  svg += Array.from({ length: 9 }, (_, k) => { const y = T + D * Math.sqrt((k + 1) / 9); return `<path d="M${hx[0] + hw + 3} ${y.toFixed(1)} h7" stroke="${RED}" stroke-width="1.3"/>`; }).join('');
  svg += lead(cx + hw / 2, T + 72, hx[0] + hw + 16, T + 60) + para(hx[0] + hw + 18, T + 56, L('ions'), 150, 10.5, VIOLET, 'start', 700).svg
    + kit.iconAt('clock', hx[0] + hw + 16, T + D - 51, 15, RED) + para(hx[0] + hw + 36, T + D - 40, L('slow'), 132, 11, RED, 'start', 700).svg;
  // B：寬與深的記號（不寫數字）
  const bx = hx[1];
  svg += `<path d="M${bx} ${T - 9} V${T - 24} M${bx + hw} ${T - 9} V${T - 24}" stroke="${MUTED}" stroke-dasharray="2 2"/>`
    + arrow(bx - 14, T - 19, bx, T - 19, INK, 1.1) + arrow(bx + hw + 14, T - 19, bx + hw, T - 19, INK, 1.1)
    + dim(bx - 20, T - 9, bx - 20, T + D, INK)
    + para(bx + hw + 16, T + 40, L('dozens'), 150, 10.5, INK, 'start', 700).svg
    + para(bx + hw + 24, T + D * 0.72, L('bend'), 140, 11, RED, 'start', 700).svg;
  svg += para(hx[2] + hw + 26, T + D * 0.36, L('wide'), 118, 11, RED, 'start', 700).svg;
  return { svg, height: T + D + 24 + 10 };
}

// ch06 常見異常：五張卡片，每張是一個蝕刻異常的小剖面、名稱與結果（可能原因留給下方表格）；版式沿用 ch05 的薄膜異常圖
function etchDefects(spec, en, kit) {
  const { L, t, para } = tools(spec, en, kit);
  const w = 115.2, gap = 8;
  // 共同的疊層：光阻（y+16）、目標材料（y+24 到 y+52）、下一層（到 y+64）、基板（到 y+74）
  const base = (x, y) => `<rect x="${x + 8}" y="${y + 24}" width="${w - 16}" height="28" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${x + 8}" y="${y + 16}" width="${w - 16}" height="8" fill="${RESIST}" stroke="${AMBER}"/>`;
  const under = (x, y) => `<rect x="${x + 8}" y="${y + 52}" width="${w - 16}" height="12" fill="${BLUE_L}" stroke="${BLUE}"/><rect x="${x + 8}" y="${y + 64}" width="${w - 16}" height="10" fill="${SI}" stroke="${INK_2}"/>`;
  const trench = (x0, wd, y, bot) => `<rect x="${x0}" y="${y + 15.5}" width="${wd}" height="${bot - y - 15.5}" fill="#ffffff"/><path d="M${x0} ${y + 24} V${bot} H${x0 + wd} V${y + 24}" fill="none" stroke="${TEAL}"/>`;
  const through = (x0, wd, y) => `<rect x="${x0}" y="${y + 15.5}" width="${wd}" height="${36.5}" fill="#ffffff"/><path d="M${x0} ${y + 24} V${y + 52} M${x0 + wd} ${y + 52} V${y + 24}" fill="none" stroke="${TEAL}"/>`;
  const art = [
    // 蝕刻不足：沒挖到底，孔底留著目標材料（紅虛線框）
    (x, y, c) => base(x, y) + trench(c - 13, 26, y, y + 42) + under(x, y) + `<rect x="${c - 13}" y="${y + 42}" width="26" height="10" fill="none" stroke="${RED}" stroke-dasharray="3 2" stroke-width="1.2"/>`,
    // 過度蝕刻：挖穿目標材料，又往下一層挖進去（紅線）
    (x, y, c) => base(x, y) + through(c - 13, 26, y) + under(x, y) + `<rect x="${c - 12.5}" y="${y + 51.4}" width="25" height="7.6" fill="#ffffff"/><path d="M${c - 13} ${y + 52} V${y + 59} H${c + 13} V${y + 52}" fill="none" stroke="${RED}" stroke-width="1.4"/>`,
    // CD 偏移：光阻被吃得變窄變圓，蝕刻出的線也變窄；虛線是原本的寬度
    (x, y, c) => under(x, y) + `<rect x="${c - 11}" y="${y + 24}" width="22" height="28" fill="${TEAL_L}" stroke="${TEAL}"/><path d="M${c - 11} ${y + 24} V${y + 20} Q${c - 11} ${y + 16} ${c - 7} ${y + 16} H${c + 7} Q${c + 11} ${y + 16} ${c + 11} ${y + 20} V${y + 24} Z" fill="${RESIST}" stroke="${AMBER}"/>`
      + `<rect x="${c - 18}" y="${y + 12}" width="36" height="40" fill="none" stroke="${INK_2}" stroke-dasharray="3 2"/>`,
    // 微粒：掉進開口的微粒擋住蝕刻，底下留著一塊材料
    (x, y, c) => base(x, y) + through(c - 13, 26, y) + under(x, y) + `<rect x="${c - 6}" y="${y + 40}" width="12" height="12" fill="${TEAL_L}" stroke="${TEAL}"/><circle cx="${c}" cy="${y + 34}" r="6" fill="${RED}"/>`,
    // 負載效應：圖形密的地方挖得淺，疏的地方挖得深
    (x, y, c) => base(x, y) + [x + 14, x + 28, x + 42].map(a => trench(a, 8, y, y + 36)).join('') + trench(x + 80, 8, y, y + 48) + under(x, y)
      + t(x + 32, y + 10, L('dense'), 10.5, INK_2, 'middle', 700) + t(x + 84, y + 10, L('sparse'), 10.5, INK_2, 'middle', 700)
  ];
  const cards = [['under', 'underR'], ['over', 'overR'], ['cd', 'cdR'], ['particle', 'particleR'], ['loading', 'loadingR']];
  const texts = cards.map(([a, b]) => [para(0, 0, L(a), w - 14, 11, INK, 'middle', 700), para(0, 0, L(b), w - 14, 10)]);
  const head = Math.max(...texts.map(([a]) => a.height)), cardH = 88 + head + Math.max(...texts.map(([, b]) => b.height)) + 6;
  let svg = '';
  cards.forEach(([a, b], i) => {
    const x = 16 + i * (w + gap);
    svg += card(x, 12, w, cardH, '#ffffff', LINE) + art[i](x, 16, x + w / 2) + para(x + w / 2, 100, L(a), w - 14, 11, INK, 'middle', 700).svg + para(x + w / 2, 100 + head + 2, L(b), w - 14, 10, RED).svg;
  });
  return { svg, height: 12 + cardH + 8 };
}

// ch06 電漿蝕刻條例總覽：上半照搬四類條例（名稱、應用與原本的圖示），波希法那張以琥珀色標出並拉虛線到下半；
// 下半是波希法的三步循環 A 等向性蝕刻 → B 沉積側壁保護膜 → C 底部離子破膜往下挖，再回到 A；右邊是多次循環後的直孔，
// 側壁留下一串向矽內凹的小弧（微扇形波紋）。技術審查修正：去掉 ①②③，不放產品名，A 的碗形略為側蝕到遮罩底下
function boschClauses(spec, en, kit) {
  const { L, t, para, lines, breakAt, arrow, lead, mark, icon } = tools(spec, en, kit);
  const rp = para(0, 0, L('root'), 250, 12, INK, 'middle', 800), rh = rp.height + 16;
  // 中文第一張的應用在「接觸孔」前斷行，英文 B 步驟在化學式之後斷行，不把詞或化學式拆開
  const leaf = (x, y, i) => breakAt(x, y, L(`l${i}`), i === 1 ? '接觸孔' : [], cw - 20, 10, INK_2, 'start');
  const stepText = (c, y, k) => {
    const s = L(k), cut = en && k === 'sB' ? s.indexOf(' polymer') : -1;
    return cut > 0 ? lines(c, y, [s.slice(0, cut), s.slice(cut + 1)], 10, INK, 'middle', 600) : para(c, y, s, pw + 22, 10, INK, 'middle', 600);
  };
  let svg = card(170, 12, 300, rh, TEAL_XL, TEAL, 6) + icon('etch', 180, 12 + rh / 2 - 9, 18, TEAL) + para(332, midY(12 + rh / 2, rp.height, 12), L('root'), 250, 12, INK, 'middle', 800).svg;
  const cw = 146, gap = 8, top = 12 + rh + 22, icons = ['plasma', 'snowflake', 'deep-hole', 'gaa'], pw = 112;
  const names = [1, 2, 3, 4].map(i => para(0, 0, L(`b${i}`), cw - 40, 11, INK, 'start', 700)), leaves = [1, 2, 3, 4].map(i => leaf(0, 0, i));
  const nh = Math.max(...names.map(p => p.height)), ch = 12 + Math.max(nh, 20) + 6 + Math.max(...leaves.map(p => p.height)) + 8;
  const xs = [0, 1, 2, 3].map(i => 16 + i * (cw + gap)), bosch = 2;
  const py = top + ch + 28;
  // 波希法那張卡往下拉兩條虛線到下半；虛線先畫，被卡片蓋住的部分不顯示
  svg += `<path d="M${xs[bosch] + 10} ${top + ch} L24 ${py} M${xs[bosch] + cw - 10} ${top + ch} L616 ${py}" fill="none" stroke="${AMBER}" stroke-dasharray="4 3"/>`;
  xs.forEach((x, i) => {
    const on = i === bosch;
    svg += `<path d="M320 ${12 + rh} V${top - 10} H${x + cw / 2} V${top}" fill="none" stroke="${TEAL}" stroke-width="1.3"/>`
      + card(x, top, cw, ch, on ? AMBER_XL : '#ffffff', on ? AMBER : LINE, 6) + icon(icons[i], x + 8, top + 9, 18, on ? AMBER : TEAL)
      + para(x + 32, top + 21, L(`b${i + 1}`), cw - 40, 11, on ? AMBER : INK, 'start', 700).svg
      + leaf(x + 10, top + 12 + Math.max(nh, 20) + 6 + 10, i + 1).svg;
  });
  // 下半：三步循環
  const y0 = py + 40, px = [36, 182, 328];
  const bowl = (c, d = 40) => `M${c - 17} ${y0 + 12} C${c - 17} ${y0 + d}, ${c + 17} ${y0 + d}, ${c + 17} ${y0 + 12}`;
  const film = (c, part) => {
    const all = part === 'all';
    const left = `M${all ? `${c - 54} ${y0 + 3.2} H${c - 12.6}` : `${c - 12.6} ${y0 + 4}`} V${y0 + 12.6} H${c - 15.8} C${c - 15.8} ${y0 + 24}, ${c - 13} ${y0 + 31}, ${c - 7} ${y0 + 33.5}`;
    const right = `M${all ? `${c + 54} ${y0 + 3.2} H${c + 12.6}` : `${c + 12.6} ${y0 + 4}`} V${y0 + 12.6} H${c + 15.8} C${c + 15.8} ${y0 + 24}, ${c + 13} ${y0 + 31}, ${c + 7} ${y0 + 33.5}`;
    return `<path d="${left} ${part === 'all' ? `Q${c} ${y0 + 36.5} ${c + 7} ${y0 + 33.5}` : ''} ${right}" fill="none" stroke="${VIOLET}" stroke-width="2.2"/>`;
  };
  let band = '';
  px.forEach((x, i) => {
    const c = x + pw / 2;
    band += `<rect x="${x}" y="${y0 + 12}" width="${pw}" height="50" fill="${SI}" stroke="${INK_2}"/>`
      + `<path d="${bowl(c)} V${y0 + 10.5} H${c - 17} Z" fill="#ffffff"/><path d="${bowl(c)}" fill="none" stroke="${INK_2}"/>`;
    if (i === 2) band += `<path d="M${c - 8} ${y0 + 32} Q${c} ${y0 + 46} ${c + 8} ${y0 + 32} Z" fill="#ffffff" stroke="${INK_2}"/><rect x="${c - 7}" y="${y0 + 30}" width="14" height="4" fill="#ffffff"/>`;
    band += `<rect x="${x}" y="${y0 + 4}" width="${pw / 2 - 12}" height="8" fill="#94a3b8" stroke="${INK_2}"/><rect x="${c + 12}" y="${y0 + 4}" width="${pw / 2 - 12}" height="8" fill="#94a3b8" stroke="${INK_2}"/>`;
    if (i === 0) band += [[c - 6, y0 + 22], [c + 7, y0 + 18], [c, y0 + 28], [c - 11, y0 + 15], [c + 12, y0 + 26], [c - 3, y0 - 4], [c + 9, y0 - 8]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.4" fill="${TEAL_L}" stroke="${TEAL}"/>`).join('');
    if (i === 1) band += film(c, 'all');
    if (i === 2) band += film(c, 'side') + [-4, 4].map(d => thinArrow(c + d, y0 - 16, c + d, y0 + 40, VIOLET, 1.2)).join('');
    band += mark(x + 2, y0 + 2, 'ABC'[i]) + stepText(c, y0 + 78, ['sA', 'sB', 'sC'][i]).svg;
    if (i < 2) band += arrow(x + pw + 4, y0 + 38, px[i + 1] - 4, y0 + 38, AMBER, 1.6);
  });
  const textH = Math.max(...['sA', 'sB', 'sC'].map(k => stepText(0, 0, k).height));
  const ly = y0 + 78 + textH + 6, ca = px[0] + pw / 2, cc = px[2] + pw / 2;
  band += `<path d="M${cc} ${ly} V${ly + 12} H${ca} V${ly + 4}" fill="none" stroke="${AMBER}" stroke-width="1.6"/>` + arrow(ca, ly + 6, ca, ly - 1, AMBER, 1.6)
    + `<rect x="${(ca + cc) / 2 - 46}" y="${ly + 4}" width="92" height="16" fill="#ffffff"/>` + t((ca + cc) / 2, ly + 16, L('step'), 11, AMBER, 'middle', 800);
  // 右：多次循環後的直孔，側壁一串向矽內凹的小弧
  const hc = 548, half = 11, s = 15, nS = 6, hy = y0 + 12, hb = hy + s * nS;
  let lw = `M${hc - half} ${hy}`, rw = `M${hc + half} ${hb}`;
  for (let k = 0; k < nS; k++) lw += ` Q${hc - half - 6} ${hy + k * s + s / 2} ${hc - half} ${hy + (k + 1) * s}`;
  for (let k = nS - 1; k >= 0; k--) rw += ` Q${hc + half + 6} ${hy + k * s + s / 2} ${hc + half} ${hy + k * s}`;
  band += `<rect x="${hc - 56}" y="${hy}" width="112" height="${s * nS + 18}" fill="${SI}" stroke="${INK_2}"/>`
    + `<path d="${lw} C${hc - half} ${hb + 12}, ${hc + half} ${hb + 12}, ${hc + half} ${hb} ${rw.replace(/^M[^Q]+/, '')} Z" fill="#ffffff"/>`
    + `<path d="${lw}" fill="none" stroke="${VIOLET}" stroke-width="1.6"/><path d="${rw}" fill="none" stroke="${VIOLET}" stroke-width="1.6"/><path d="M${hc - half} ${hb} C${hc - half} ${hb + 12}, ${hc + half} ${hb + 12}, ${hc + half} ${hb}" fill="none" stroke="${INK_2}"/><rect x="${hc - half + 0.8}" y="${hy - 1.5}" width="${2 * half - 1.6}" height="3" fill="#ffffff"/>`
    + `<rect x="${hc - 56}" y="${hy - 8}" width="${56 - half}" height="8" fill="#94a3b8" stroke="${INK_2}"/><rect x="${hc + half}" y="${hy - 8}" width="${56 - half}" height="8" fill="#94a3b8" stroke="${INK_2}"/>`;
  const sc = para(hc, hb + 40, L('scallop'), 150, 11, VIOLET, 'middle', 700), lim = para(hc, hb + 40 + sc.height, `${L('lt50')}${en ? ' ' : '，'}${L('why50')}`, 150, 10, INK_2);
  band += lead(hc - half - 5, hb - s * 1.5, hc - 30, hb + 27) + sc.svg + lim.svg;
  const bottom = Math.max(ly + 24, hb + 40 + sc.height + lim.height);
  svg += card(16, py, 608, bottom - py + 4, '#ffffff', AMBER) + t(32, py + 22, L('fast'), 12, AMBER, 'start', 800) + band;
  return { svg, height: bottom + 12 };
}

// ch06 定量物理定律：上半照搬三條定律與對策（樹狀三列），第三列原子層蝕刻以琥珀色標出並拉虛線到下半；
// 下半三格原子剖面，虛線是原本的表面：A 只通改質氣體，最上一排被改質、沒有原子離開；B 只用低能離子轟擊，也沒有原子離開；
// A、B 共用括號「均不蝕刻」；C 兩步交替，最上一排被剝掉。技術審查：不畫協同度百分比；Ar⁺ 待 Sam 決定，先只畫帶正電的離子符號
function etchLaws(spec, en, kit) {
  const { L, t, para, arrow, dim, lead } = tools(spec, en, kit);
  const tree = treeRow(L, para, arrow, 12, 'root', [['b1', 'l1'], ['b2', 'l2'], ['b3', 'l3']], 2);
  const py = tree.bottom + 26, pw = 184, xs = [26, 228, 430], ly = py + 66, sp = 15, r = 6;
  let svg = tree.zoom(py) + tree.svg;
  let band = '';
  const atom = (x, y, mod) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${SI}" stroke="${INK_2}"/>` + (mod ? `<circle cx="${x + 4.5}" cy="${y - 4.5}" r="2.6" fill="${TEAL_L}" stroke="${TEAL}"/>` : '');
  xs.forEach((x, i) => {
    const lx = x + pw / 2 - 3.5 * sp;
    band += `<path d="M${x + 14} ${ly - r - 3} H${x + pw - 14}" stroke="${INK_2}" stroke-dasharray="4 3"/>`;
    for (let row = 0; row < 4; row++) for (let col = 0; col < 8; col++) {
      if (i === 2 && row === 0) continue;
      band += atom(lx + col * sp, ly + row * sp, i === 0 && row === 0);
    }
    if (i === 0) band += [0, 1, 2, 3].map(k => `<circle cx="${lx + 10 + k * 30}" cy="${ly - 30 - (k % 2) * 6}" r="2.6" fill="${TEAL_L}" stroke="${TEAL}"/><circle cx="${lx + 15 + k * 30}" cy="${ly - 30 - (k % 2) * 6}" r="2.6" fill="${TEAL_L}" stroke="${TEAL}"/>`).join('');
    if (i === 1) band += [0, 1, 2].map(k => ionGlyph(lx + 18 + k * 42, ly - 36) + thinArrow(lx + 18 + k * 42, ly - 30, lx + 18 + k * 42, ly - r - 5, PINK, 1.1)).join('');
    if (i === 2) band += [[lx + 20, ly - 26], [lx + 62, ly - 34], [lx + 100, ly - 24]].map(([a, b]) => atom(a, b, true) + thinArrow(a, b - 8, a, b - 18, INK_2, 1)).join('')
      + dim(lx + 7 * sp + 14, ly - r - 3, lx + 7 * sp + 14, ly + sp - r - 1, RED);
  });
  const ty = ly + 3 * sp + 26;
  band += para(xs[0] + pw / 2, ty, L('modA'), pw - 10, 10.5, INK, 'middle', 600).svg;
  // B 的說明：文字、離子符號、文字（離子符號代替待決的 Ar⁺）
  // 兩段文字分別靠齊離子符號的左右兩側，間距固定，不受字寬估算誤差影響
  const s1 = L('ionB1'), s2 = L('ionB2'), gx = xs[1] + pw / 2 + (textW(s1, 10.5) - textW(s2, 10.5)) / 2 * (en ? 0.85 : 1);
  band += t(gx - 8, ty, s1, 10.5, INK, 'end', 600) + ionGlyph(gx, ty - 4, 4.5) + t(gx + 8, ty, s2, 10.5, INK, 'start', 600);
  // 括號放在 A 的說明之下：英文 A 會斷成兩行，括號跟著往下，不貼在字上
  const by = ty + para(0, 0, L('modA'), pw - 10, 10.5).height + 3;
  band += `<path d="M${xs[0] + 20} ${by - 6} V${by} H${xs[1] + pw - 20} V${by - 6}" fill="none" stroke="${RED}" stroke-width="1.3"/>`
    + (en ? t((xs[0] + xs[1] + pw) / 2, by + 18, L('none'), 11, RED, 'middle', 800) : xmark((xs[0] + xs[1] + pw) / 2 - 40, by + 14, 4, RED) + t((xs[0] + xs[1] + pw) / 2 - 30, by + 18, L('none'), 11, RED, 'start', 800));
  const alt = para(xs[2] + pw / 2, ty, L('alt'), pw - 10, 11, TEAL, 'middle', 800), per = para(xs[2] + pw / 2, ty + alt.height, L('perCycle'), pw - 10, 10.5, RED, 'middle', 700);
  band += alt.svg + per.svg;
  const bottom = Math.max(by + 24, ty + alt.height + per.height);
  svg += card(16, py, 608, bottom - py + 4, '#ffffff', AMBER) + band;
  return { svg, height: bottom + 12 };
}

// ch06 現場異常徵兆：取代三大異常分支方框，三欄各畫一個剖面；名稱與對策照搬方框。
// A 絕緣層底部充電：電子停在孔口光阻、孔底氧化層累積正電荷，離子在接近孔底時才被推向側邊，在導電層緊貼絕緣層處掏出水平凹槽；
// B 硬遮罩邊緣被削斜，離子小角度散射打到中上段側壁，鼓出成桶狀，孔底略偏（扭曲）；C 密集窄孔停在半途，孤立寬孔已打穿下層
function etchFailures(spec, en, kit) {
  const { L, t, para, lead } = tools(spec, en, kit);
  const cols = [['b1', 'l1'], ['b2', 'l2'], ['b3', 'l3']], bodyH = 200;
  const tree = lawColumns(L, para, 12, 'root', cols, bodyH, (i, x, y, cw) => {
    let out = '';
    if (i === 0) {
      const sx = x + 10, sw = 112, cx = sx + sw / 2, o = 11;
      out += `<rect x="${sx}" y="${y + 50}" width="${sw}" height="70" fill="${SI}" stroke="${INK_2}"/><rect x="${sx}" y="${y + 120}" width="${sw}" height="22" fill="${AMBER_XL}" stroke="${AMBER}"/>`
        + `<rect x="${cx - o}" y="${y + 48.5}" width="${2 * o}" height="71.5" fill="#ffffff"/><rect x="${cx + o - 0.5}" y="${y + 112}" width="10" height="8" fill="#ffffff"/>`
        + `<path d="M${cx - o} ${y + 50} V${y + 120} M${cx + o} ${y + 50} V${y + 112} H${cx + o + 9.5} V${y + 120}" fill="none" stroke="${INK_2}"/><path d="M${cx + o} ${y + 112} H${cx + o + 9.5} V${y + 120}" fill="none" stroke="${RED}" stroke-width="1.4"/>`
        + `<rect x="${sx}" y="${y + 34}" width="${cx - o - sx}" height="16" fill="${RESIST}" stroke="${AMBER}"/><rect x="${cx + o}" y="${y + 34}" width="${sx + sw - cx - o}" height="16" fill="${RESIST}" stroke="${AMBER}"/>`
        + [[cx - o - 3, y + 38], [cx - o - 3, y + 46], [cx + o + 3, y + 36], [cx + o + 3, y + 44]].map(([a, b]) => elecGlyph(a, b)).join('')
        + [cx - 6, cx + 2].map(a => ionGlyph(a, y + 116, 3.6)).join('')
        + `<path d="M${cx - 2} ${y + 14} V${y + 94} Q${cx - 2} ${y + 108} ${cx + 6} ${y + 112}" fill="none" stroke="${PINK}" stroke-width="1.3"/>` + thinArrow(cx + 4, y + 111, cx + o + 6, y + 115, PINK, 1.3)
        + t(sx + 4, y + 45, L('resist'), 9, AMBER, 'start', 700) + para(sx + 25, y + 80, L('cond'), 44, 9.5, INK, 'middle', 700).svg
        + t(cx, y + 135, L('oxide'), 9.5, AMBER, 'middle', 700)
        + lead(cx + o + 5, y + 40, x + 134, y + 34) + t(x + 136, y + 37, L('elec'), 9.5, BLUE, 'start', 700)
        + lead(cx + o + 9, y + 113, x + 134, y + 82) + para(x + 136, y + 84, L('notch'), 56, 9.5, RED, 'start', 700).svg
        + lead(cx + 4, y + 119, x + 134, y + 128) + para(x + 136, y + 128, L('plus'), 56, 9.5, PINK, 'start', 700).svg;
      return out;
    }
    if (i === 1) {
      const cx = x + 58, top = y + 56, D = 124, n = 31, l = [], r = [];
      for (let k = 0; k <= n; k++) {
        const f = k / n, half = 9 + 7 * Math.exp(-(((f - 0.32) / 0.15) ** 2)), off = f > 0.72 ? 7 * ((f - 0.72) / 0.28) ** 1.5 : 0;
        l.push([cx + off - half, top + f * D]); r.push([cx + off + half, top + f * D]);
      }
      out += `<rect x="${x + 8}" y="${top}" width="100" height="${D + 8}" fill="#dbe4ee" stroke="${INK_2}"/>` + holeShape(l, r)
        + `<path d="M${x + 8} ${top - 12} H${cx - 16} L${cx - 9} ${top} H${x + 8} Z M${x + 108} ${top - 12} H${cx + 16} L${cx + 9} ${top} H${x + 108} Z" fill="${METAL_GATE}"/>`
        + thinArrow(cx - 13, top - 30, cx - 13, top - 5, VIOLET, 1.1) + thinArrow(cx - 13, top - 5, cx + 15, top + 0.32 * D, VIOLET, 1.1)
        + thinArrow(cx + 13, top - 30, cx + 13, top - 5, VIOLET, 1.1) + thinArrow(cx + 13, top - 5, cx - 15, top + 0.32 * D, VIOLET, 1.1)
        + para(x + cw / 2, y + 14, L('facet'), cw - 16, 9.5, INK_2, 'middle', 600).svg
        + lead(cx + 17, top + 0.32 * D, x + 116, top + 0.32 * D - 4) + para(x + 118, top + 0.32 * D - 8, L('bow'), 72, 9.5, RED, 'start', 700).svg
        + lead(cx + 15, top + D - 4, x + 116, top + D - 10) + para(x + 118, top + D - 12, L('twist'), 72, 9.5, RED, 'start', 700).svg;
      return out;
    }
    // C：密集窄孔停在半途，孤立寬孔已打穿下層
    out += `<rect x="${x + 10}" y="${y + 44}" width="176" height="104" fill="#dbe4ee" stroke="${INK_2}"/><rect x="${x + 10}" y="${y + 148}" width="176" height="14" fill="${BLUE_L}" stroke="${BLUE}"/>`
      + [x + 26, x + 44, x + 62].map(a => `<rect x="${a}" y="${y + 43.5}" width="9" height="${48.5}" fill="#ffffff"/><path d="M${a} ${y + 44} V${y + 92} H${a + 9} V${y + 44}" fill="none" stroke="${INK_2}"/>`).join('')
      + `<rect x="${x + 128}" y="${y + 43.5}" width="30" height="104.5" fill="#ffffff"/><rect x="${x + 128.5}" y="${y + 147.4}" width="29" height="7.6" fill="#ffffff"/>`
      + `<path d="M${x + 128} ${y + 44} V${y + 148} M${x + 158} ${y + 148} V${y + 44}" fill="none" stroke="${INK_2}"/><path d="M${x + 128} ${y + 148} V${y + 155} H${x + 158} V${y + 148}" fill="none" stroke="${RED}" stroke-width="1.4"/>`
      + t(x + 48, y + 34, L('dense'), 10.5, INK, 'middle', 700) + t(x + 143, y + 34, L('iso'), 10.5, INK, 'middle', 700)
      + para(x + 48, y + 112, L('open'), 80, 9.5, RED, 'middle', 700).svg + para(x + 143, y + 176, L('punch'), 96, 9.5, RED, 'middle', 700).svg;
    return out;
  });
  return { svg: tree.svg, height: tree.bottom + 8 };
}

// ch07 為什麼要佈植：兩格同樣的遮罩開口。左：早期把晶圓放在高溫的雜質氣體裡，表面最濃、往下往兩側漸淡，還擴到遮罩底下；
// 右：現代用離子佈植，離子束平行射入，摻雜只在開口內、深度一定、邊緣窄。技術審查：不畫槍
function diffuseVsImplant(spec, en, kit) {
  const { L, t, para, icon } = tools(spec, en, kit);
  const pw = 296, xs = [16, 328], o = 40, H = 88;
  const titles = ['early', 'modern'].map(k => para(0, 0, L(k), pw - 24, 12, INK, 'middle', 800));
  const th = Math.max(...titles.map(p => p.height)), T = 30 + th + 76;
  const foot = ['hard', 'place'].map(k => para(0, 0, L(k), pw - 24, 11.5, INK, 'middle', 800)), fh = Math.max(...foot.map(p => p.height));
  const ch = T + H + 24 + fh + 6 - 12;
  let svg = '';
  xs.forEach((x, i) => {
    const cx = x + pw / 2;
    svg += card(x, 12, pw, ch, '#ffffff', LINE) + para(cx, 32, L(i ? 'modern' : 'early'), pw - 24, 12, i ? TEAL : AMBER, 'middle', 800).svg
      + `<rect x="${x + 12}" y="${T}" width="${pw - 24}" height="${H}" fill="#e2e8f0" stroke="${INK_2}"/>`;
    if (!i) {
      // 雜質由表面往下、往兩側擴散，越外圈越淡，擴到遮罩底下
      svg += [[o + 50, 58, 0.12], [o + 34, 44, 0.2], [o + 20, 30, 0.32], [o + 8, 17, 0.5]].map(([rx, ry, op]) => `<path d="M${cx - rx} ${T} A${rx} ${ry} 0 0 0 ${cx + rx} ${T} Z" fill="${PINK}" fill-opacity="${op}"/>`).join('')
        + [0, 1, 2].map(k => `<path d="M${x + 24} ${T - 50 + k * 13} q12 -7 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0" fill="none" stroke="${RED}" stroke-opacity=".55" stroke-width="1.4"/>`).join('')
        + [[x + 60, T - 44], [x + 112, T - 30], [x + 170, T - 46], [x + 214, T - 28], [x + 250, T - 40], [x + 88, T - 22]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.6" fill="${PINK}"/>`).join('')
        + icon('heat', x + pw - 40, T - 70, 20, RED) + t(x + 18, T - 60, L('gas'), 10.5, RED, 'start', 700)
        + t(cx, T + 76, L('slow'), 10.5, PINK, 'middle', 700);
    } else {
      // 離子束平行射入：打在遮罩上的停在遮罩表面，開口內的進到矽裡固定深度
      svg += `<rect x="${cx - o - 2}" y="${T}" width="${2 * o + 4}" height="44" rx="3" fill="${PINK}" fill-opacity=".14"/>` + [1, 2].map(k => `<rect x="${cx - o - 2 + k * 2}" y="${T + 12 + k * 4}" width="${2 * o + 4 - k * 4}" height="${30 - k * 8}" rx="3" fill="${PINK}" fill-opacity="${[0, 0.3, 0.5][k]}"/>`).join('')
        + Array.from({ length: 9 }, (_, k) => { const ax = x + 36 + k * 28, inside = Math.abs(ax - cx) < o; return thinArrow(ax, T - 52, ax, inside ? T + 22 : T - 11, PINK, 1.2); }).join('')
        + t(x + 18, T - 60, L('shot'), 10.5, PINK, 'start', 700);
    }
    svg += `<rect x="${x + 12}" y="${T - 10}" width="${pw / 2 - 12 - o}" height="10" fill="#94a3b8" stroke="${INK_2}"/><rect x="${cx + o}" y="${T - 10}" width="${pw / 2 - 12 - o}" height="10" fill="#94a3b8" stroke="${INK_2}"/>`
      + t(x + 20, T + H - 8, L('si'), 10, INK_2, 'start', 600)
      + para(cx, T + H + 24, L(i ? 'place' : 'hard'), pw - 24, 11.5, i ? TEAL : RED, 'middle', 800).svg;
  });
  return { svg, height: 12 + ch + 8 };
}

// ch07 退火：取代 A–D 流程方框，四句與兩個註記全部保留。上半是兩個晶格小方陣：離子撞亂晶格、雜質卡在格點之間 → 退火加熱 →
// 晶格修復、雜質坐上格點（活化）；下半三欄依正文「從長到短」：爐管整批加熱、快速熱退火用強光、毫秒級只熱表面一薄層。不放數字
function annealRepair(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const sp = 18, cols = 6, rows = 4, lx = 84, rx = 438, ly = 76;
  // 位移乘 0.6：原子有位移但中心距至少一個直徑，不會疊在一起（G2 審查修正）
  const jit = [[3, -2], [-4, 3], [5, 4], [-2, -5], [4, -3], [-5, 2], [2, 5], [-3, -4], [6, 1], [-4, -2], [1, 4], [5, -5]].map(([a, b]) => [a * 0.6, b * 0.6]);
  let svg = '';
  // 左：撞亂的晶格，兩個空位、雜質卡在格點之間
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    if ((r === 1 && c === 2) || (r === 2 && c === 4)) continue;
    const [dx, dy] = jit[(r * cols + c) % jit.length];
    svg += `<circle cx="${lx + c * sp + dx}" cy="${ly + r * sp + dy}" r="5.5" fill="${SI}" stroke="${INK_2}"/>`;
  }
  svg += [[lx + 1.5 * sp, ly + 0.5 * sp], [lx + 3.5 * sp, ly + 2.5 * sp], [lx + 2.35 * sp, ly + 1.35 * sp]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="5.5" fill="${BLUE}" stroke="${INK}"/>`).join('')
    + [0, 1, 2].map(k => thinArrow(lx - 30 + k * 26, ly - 48, lx + 4 + k * 30, ly - 10, PINK, 1.3)).join('');
  // 右：修復好的晶格，雜質坐上格點
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const dope = (r === 1 && c === 2) || (r === 2 && c === 4) || (r === 2 && c === 0);
    svg += `<circle cx="${rx + c * sp}" cy="${ly + r * sp}" r="5.5" fill="${dope ? BLUE : SI}" stroke="${dope ? INK : INK_2}"/>`;
  }
  const lw = (cols - 1) * sp, mid = (lx + lw + rx) / 2;
  svg += para(lx + lw / 2, 26, L('ions'), 220, 11, PINK, 'middle', 700).svg
    + arrow(lx + lw + 26, ly + 27, rx - 26, ly + 27, RED, 2.2) + icon('thermometer', mid - 10, ly - 4, 20, RED)
    + para(mid, ly + 52, L('heat'), 150, 11, RED, 'middle', 700).svg;
  const k1 = para(lx + lw / 2, ly + 3 * sp + 30, L('knock'), 210, 11, INK, 'middle', 700), k2 = para(lx + lw / 2, ly + 3 * sp + 30 + k1.height, L('notYet'), 210, 10.5, INK_2);
  const r1 = para(rx + lw / 2, ly + 3 * sp + 30, L('repair'), 210, 11, INK, 'middle', 700), r2 = para(rx + lw / 2, ly + 3 * sp + 30 + r1.height, L('active'), 210, 10.5, TEAL, 'middle', 700);
  svg += k1.svg + k2.svg + r1.svg + r2.svg;
  // 下半：三種退火從長到短
  const oy = ly + 3 * sp + 30 + Math.max(k1.height + k2.height, r1.height + r2.height) + 26;
  const head = para(320, oy, L('order'), 560, 12, INK, 'middle', 800);
  svg += head.svg + arrow(40, oy + head.height + 2, 600, oy + head.height + 2, MUTED, 1.4);
  const top = oy + head.height + 14, cw = 196, gap = 10, xs = [0, 1, 2].map(i => 16 + i * (cw + gap));
  const sets = [['furnace', 'fTime'], ['rta', 'rTime', 'lamp'], ['ms', 'msTime', 'msSrc', 'surface']];
  const blocks = sets.map(keys => keys.map((k, j) => para(0, 0, L(k), cw - 20, j ? 10.5 : 11.5, INK, 'middle', j ? 600 : 700)));
  const textH = Math.max(...blocks.map(b => b.reduce((s, p) => s + p.height, 0))), ch = 84 + textH + 10;
  const warm = '#fdba74';
  xs.forEach((x, i) => {
    const c = x + cw / 2;
    svg += card(x, top, cw, ch, '#ffffff', LINE);
    if (i === 0) svg += `<rect x="${x + 22}" y="${top + 14}" width="${cw - 44}" height="44" rx="22" fill="${AMBER_XL}" stroke="${AMBER}"/>`
      + Array.from({ length: 9 }, (_, k) => `<rect x="${x + 50 + k * 12}" y="${top + 22}" width="3" height="28" fill="${warm}" stroke="${RED}" stroke-width=".6"/>`).join('')
      + `<path d="M${x + 44} ${top + 52} H${x + cw - 44}" stroke="${INK_2}" stroke-width="1.4"/>` + [0, 1, 2, 3, 4, 5].map(k => `<path d="M${x + 36 + k * 24} ${top + 64} q6 4 12 0 t12 0" fill="none" stroke="${RED}" stroke-width="1.2"/>`).join('');
    if (i === 1) svg += `<rect x="${c - 52}" y="${top + 54}" width="104" height="7" fill="${warm}" stroke="${RED}" stroke-width=".8"/>`
      + [-40, -20, 0, 20, 40].map(d => `<circle cx="${c + d}" cy="${top + 22}" r="6" fill="${AMBER_L}" stroke="${AMBER}"/>` + thinArrow(c + d, top + 30, c + d, top + 50, AMBER, 1.1)).join('');
    if (i === 2) svg += `<rect x="${c - 52}" y="${top + 52}" width="104" height="12" fill="#e2e8f0" stroke="${INK_2}"/><rect x="${c - 52}" y="${top + 52}" width="104" height="2.6" fill="${RED}"/>`
      + `<rect x="${c - 14}" y="${top + 12}" width="28" height="14" rx="2" fill="${INK_2}"/><path d="M${c - 3} ${top + 26} L${c - 34} ${top + 51} H${c + 34} L${c + 3} ${top + 26} Z" fill="${RED}" fill-opacity=".22"/>`;
    let yy = top + 84 + 10;
    blocks[i].forEach((p, j) => { svg += para(c, yy, L(sets[i][j]), cw - 20, j ? 10.5 : 11.5, j === 1 ? RED : j ? INK_2 : INK, 'middle', j === 1 ? 700 : j ? 400 : 700).svg; yy += p.height; });
  });
  return { svg, height: top + ch + 10 };
}

// ch07 定量物理定律：上半照搬四種退火（爐管、尖峰快速熱退火、毫秒閃光、奈秒雷射），配上等距的小圖示，奈秒雷射那張拉虛線到下半；
// 下半是背面供電晶圓的縱剖面：最上面一薄層升至 1300°C，熱往下很快變淡，虛線以下 5 µm 維持 < 400°C，再往下是正面銅導線，
// 最底是承載晶圓（不標）。只用正文的 1300°C、5 µm、400°C，各層厚度不按比例
function annealLaws(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const cw = 134, gap = 24, xs = [0, 1, 2, 3].map(i => 16 + i * (cw + gap)), warm = '#fdba74';
  const names = [0, 1, 2, 3].map(i => para(0, 0, L(`f${i}`), cw - 16, 11, INK, 'middle', 700)), nh = Math.max(...names.map(p => p.height));
  const ch = 64 + nh + 8, py = 12 + ch + 30;
  let svg = `<path d="M${xs[3] + 10} ${12 + ch} L24 ${py} M${xs[3] + cw - 10} ${12 + ch} L616 ${py}" fill="none" stroke="${AMBER}" stroke-dasharray="4 3"/>`;
  const icons = [
    c => `<rect x="${c - 44}" y="24" width="88" height="30" rx="15" fill="${AMBER_XL}" stroke="${AMBER}"/>` + Array.from({ length: 6 }, (_, k) => `<rect x="${c - 26 + k * 10}" y="30" width="3" height="18" fill="${warm}" stroke="${RED}" stroke-width=".5"/>`).join(''),
    c => [-24, -8, 8, 24].map(d => `<circle cx="${c + d}" cy="28" r="5" fill="${AMBER_L}" stroke="${AMBER}"/>`).join('') + `<rect x="${c - 36}" y="44" width="72" height="6" fill="${warm}" stroke="${RED}" stroke-width=".7"/>`,
    c => `<rect x="${c - 34}" y="22" width="68" height="9" rx="4.5" fill="${AMBER_L}" stroke="${AMBER}"/><path d="M${c - 4} 32 l-5 7 h7 l-5 8" fill="none" stroke="${RED}" stroke-width="1.6"/><rect x="${c - 36}" y="48" width="72" height="6" fill="#e2e8f0" stroke="${INK_2}"/><rect x="${c - 36}" y="48" width="72" height="1.8" fill="${RED}"/>`,
    c => `<rect x="${c - 14}" y="20" width="28" height="12" rx="2" fill="${INK_2}"/><path d="M${c} 32 V47" stroke="${RED}" stroke-width="2.2"/><rect x="${c - 36}" y="48" width="72" height="6" fill="#e2e8f0" stroke="${INK_2}"/><rect x="${c - 8}" y="48" width="16" height="1.8" fill="${RED}"/>`
  ];
  xs.forEach((x, i) => {
    const on = i === 3, c = x + cw / 2;
    svg += card(x, 12, cw, ch, on ? AMBER_XL : '#ffffff', on ? AMBER : LINE, 6) + icons[i](c) + para(c, 76, L(`f${i}`), cw - 16, 11, on ? AMBER : INK, 'middle', 700).svg;
    if (i < 3) svg += arrow(x + cw + 3, 40, x + cw + gap - 3, 40, TEAL, 1.5);
  });
  // 下半：背面供電晶圓的縱剖面
  const sx = 40, sw = 300, top = py + 44, hot = 8, si = 64, beol = 52, carrier = 18;
  let band = Array.from({ length: 5 }, (_, k) => thinArrow(sx + 40 + k * 55, py + 14, sx + 40 + k * 55, top - 3, RED, 1.4)).join('');
  band += `<rect x="${sx}" y="${top}" width="${sw}" height="${hot}" fill="${RED}" fill-opacity=".85"/>`;
  for (let k = 0; k < 16; k++) band += `<rect x="${sx}" y="${top + hot + k * si / 16}" width="${sw}" height="${si / 16 + 0.3}" fill="${mixColor(warm.slice(1), 'e2e8f0', Math.pow((k + 1) / 16, 0.45))}"/>`;
  const dl = top + hot + si;
  band += `<rect x="${sx}" y="${top}" width="${sw}" height="${hot + si}" fill="none" stroke="${INK_2}"/>`
    + `<rect x="${sx}" y="${dl}" width="${sw}" height="${beol}" fill="#dbe4ee" stroke="${INK_2}"/>`
    + [0, 1, 2].map(r => Array.from({ length: 6 - r }, (_, k) => `<rect x="${sx + 22 + r * 14 + k * (44 + r * 10)}" y="${dl + 8 + r * 15}" width="${26 + r * 8}" height="${7 + r}" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/>`).join('')).join('')
    + `<rect x="${sx}" y="${dl + beol}" width="${sw}" height="${carrier}" fill="${SI}" stroke="${INK_2}"/>`
    + `<path d="M${sx - 8} ${dl} H${sx + sw + 18}" stroke="${BLUE}" stroke-width="1.4" stroke-dasharray="5 3"/>`;
  const lx = sx + sw + 24;
  const b1 = para(lx, py + 24, L('bspdn'), 240, 11.5, INK, 'start', 800);
  band += b1.svg + t(lx, py + 24 + b1.height + 2, L('laser'), 10.5, RED, 'start', 700)
    + lead(sx + sw + 2, top + hot / 2, lx - 4, top + 8) + para(lx, top + 12, L('top'), 240, 10.5, RED, 'start', 700).svg
    + para(lx, dl + 4, L('deep'), 240, 10.5, BLUE, 'start', 700).svg
    + lead(sx + sw + 2, dl + 30, lx - 4, dl + 38) + para(lx, dl + 42, L('cu'), 240, 10.5, AMBER, 'start', 700).svg;
  const bottom = dl + beol + carrier;
  svg += card(16, py, 608, bottom - py + 14, '#ffffff', AMBER) + band;
  return { svg, height: bottom + 22 };
}

// ch07 現場異常徵兆：取代三大異常分支方框，名稱與對策照搬方框。A、B 用同一個「濃度／深度」小座標，不標刻度：
// A 虛線是高斯分佈，實線往深處拖出長尾；B 虛線是佈植後的淺分布，實線是退火後，峰附近的點是不導電叢集，尾段被推深（瞬態增強擴散）；
// C 左邊光阻表層碳化結殼、裂開冒泡（微爆裂），右邊晶圓俯視的平行條紋。技術審查：用「條紋」，不用「裂紋」
function implantFailures(spec, en, kit) {
  const { L, t, para, breakAt, arrow, lead } = tools(spec, en, kit);
  const cols = [['b1', 'l1'], ['b2', 'l2'], ['b3', 'l3']], bodyH = 178;
  const plot = (ox, oy, fn, style) => {
    let d = '';
    for (let k = 0; k <= 70; k++) { const dep = k * 2; d += `${k ? 'L' : 'M'}${(ox + dep).toFixed(1)} ${(oy - 3 - 92 * fn(dep)).toFixed(1)}`; }
    return `<path d="${d}" fill="none" ${style}/>`;
  };
  const tree = lawColumns(L, para, 12, 'root', cols, bodyH, (i, x, y) => {
    let out = '';
    if (i < 2) {
      const ox = x + 26, oy = y + 136;
      out += arrow(ox, oy, ox, oy - 112, INK_2, 1.1) + arrow(ox, oy, ox + 156, oy, INK_2, 1.1)
        + t(ox + 6, oy - 102, L('conc'), 9.5, MUTED, 'start', 600) + t(ox + 156, oy + 14, L('depth'), 9.5, MUTED, 'end', 600);
      if (i === 0) {
        const g = d => Math.exp(-(((d - 34) / 14) ** 2));
        const tail = d => 0.12 * Math.exp(-(d - 34) / 45) / (1 + Math.exp(-(d - 40) / 4));
        out += plot(ox, oy, d => 0.8 * g(d) + tail(d), `stroke="${PINK}" stroke-width="1.8"`) + plot(ox, oy, g, `stroke="${INK_2}" stroke-dasharray="4 3" stroke-width="1.3"`)
          + t(ox + 50, oy - 84, L('gauss'), 9.5, INK_2, 'start', 600)
          + lead(ox + 104, oy - 13, ox + 108, oy - 36) + breakAt(ox + 70, oy - 54, L('tail'), '（', 92, 9.5, PINK, 'start', 700).svg;
      } else {
        const g0 = d => 0.95 * Math.exp(-(((d - 20) / 10) ** 2)), g1 = d => 0.62 * Math.exp(-(((d - 21) / 11) ** 2)) + 0.11 * Math.exp(-(((d - 48) / 24) ** 2));
        out += plot(ox, oy, g0, `stroke="${INK_2}" stroke-dasharray="4 3" stroke-width="1.3"`) + plot(ox, oy, g1, `stroke="${PINK}" stroke-width="1.8"`)
          + [[ox + 18, oy - 52], [ox + 22, oy - 47], [ox + 26, oy - 53], [ox + 21, oy - 57], [ox + 25, oy - 46]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.2" fill="${INK}"/>`).join('')
          + lead(ox + 28, oy - 52, ox + 44, oy - 80) + para(ox + 46, oy - 88, L('bics'), 110, 9.5, INK, 'start', 700).svg
          + t(ox + 46, oy - 60, L('after'), 9.5, PINK, 'start', 700)
          + arrow(ox + 52, oy - 24, ox + 86, oy - 24, PINK, 1.2) + para(ox + 52, oy - 44, L('ted'), 104, 9.5, PINK, 'start', 700).svg;
      }
      return out;
    }
    // C：左邊光阻表層碳化結殼、裂開冒泡；右邊晶圓俯視的平行條紋
    const rx0 = x + 10, rw = 84, ry = y + 94;
    out += `<rect x="${rx0}" y="${ry + 40}" width="${rw}" height="16" fill="${SI}" stroke="${INK_2}"/><rect x="${rx0}" y="${ry}" width="${rw}" height="40" fill="${RESIST}" stroke="${AMBER}"/>`
      + `<path d="M${rx0} ${ry} H${rx0 + 38} L${rx0 + 42} ${ry + 7} L${rx0 + 46} ${ry} H${rx0 + rw} V${ry + 7} H${rx0} Z" fill="#78350f"/>`
      + [[rx0 + 18, ry + 22, 3.4], [rx0 + 58, ry + 28, 3], [rx0 + 70, ry + 16, 3.6], [rx0 + 42, ry + 14, 4]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="#ffffff" stroke="${AMBER}"/>`).join('')
      + `<path d="M${rx0 + 36} ${ry - 8} l4 4 M${rx0 + 48} ${ry - 9} l-3 4 M${rx0 + 42} ${ry - 12} v5" stroke="${RED}" stroke-width="1.3"/><path d="M${rx0 + 30} ${ry - 16} l5 -2 2 4 z M${rx0 + 52} ${ry - 18} l5 1 -2 4 z" fill="#78350f"/>`
      + para(rx0 + rw / 2, y + 30, L('crust'), 92, 9.5, AMBER, 'middle', 700).svg + lead(rx0 + 12, y + 26 + para(0, 0, L('crust'), 92, 9.5).height, rx0 + 12, ry + 2)
      + lead(rx0 + 58, ry - 14, x + 104, ry - 20) + t(x + 106, ry - 17, L('pop'), 9.5, RED, 'start', 700);
    const wc = x + 150, wy = y + 132, wr = 26;
    out += `<circle cx="${wc}" cy="${wy}" r="${wr}" fill="#e2e8f0" stroke="${INK_2}"/>`
      + Array.from({ length: 8 }, (_, k) => { const dx = -wr + 3 + k * 6.6, h = Math.sqrt(Math.max(0, wr * wr - (dx + 1.6) ** 2)); return k % 2 ? '' : `<rect x="${(wc + dx).toFixed(1)}" y="${(wy - h + 1).toFixed(1)}" width="3.2" height="${(2 * h - 2).toFixed(1)}" fill="${RED}" fill-opacity=".45"/>`; }).join('')
      + t(wc, wy + wr + 14, L('stripe'), 10, RED, 'middle', 700);
    return out;
  });
  return { svg: tree.svg, height: tree.bottom + 8 };
}

// ── H1 批（2.28.0，第 3 階段 ch08–ch09）──
const DIEL_C = '#dbe4ee', BARRIER = '#9d174d', OXIDE = AMBER_XL;
// 要被磨掉的多餘部分：同一種紅色斜線（四欄、各圖共用）
const excessHatch = (x, y, w, h) => {
  let d = '';
  for (let s = 3; s < w + h; s += 6) {
    const [x1, y1] = s <= w ? [x + s, y + h] : [x + w, y + h - (s - w)], [x2, y2] = s >= h ? [x + s - h, y] : [x, y + h - s];
    d += `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} `;
  }
  return `<path d="${d.trim()}" stroke="${RED}" stroke-opacity=".6" stroke-width=".9"/>`;
};

// ch08 CMP 用在哪裡：四欄，每欄上下兩個小剖面，向下箭頭表示研磨；紅色斜線是要被磨掉的多餘部分。
// 技術審查修正：不寫「磨前／磨後」、不放章節號；STI 的主動區頂面畫一層不標字的停止層，磨完與停止層齊平
function cmpUses(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const w = 146, gap = 8, xs = [0, 1, 2, 3].map(i => 16 + i * (w + gap)), keys = [['sti', 'stiDo'], ['diel', 'dielDo'], ['w', 'wDo'], ['cu', 'cuDo']], ex = ['exOx', 'insul', 'exW', 'exCu'];
  const sti = (x, y, after) => {
    const a = x + 14, b = x + w - 14, tr = [[x + 44, 20], [x + 86, 20]];
    let o = `<rect x="${a}" y="${y + 18}" width="${b - a}" height="32" fill="${SI}" stroke="${INK_2}"/>`;
    o += [[a, x + 44], [x + 64, x + 86], [x + 106, b]].map(([p, q]) => `<rect x="${p}" y="${y + 14}" width="${q - p}" height="4" fill="#94a3b8" stroke="${INK_2}" stroke-width=".6"/>`).join('');
    o += tr.map(([p, tw]) => `<rect x="${p}" y="${y + 14}" width="${tw}" height="24" fill="${OXIDE}" stroke="${AMBER}"/>`).join('');
    if (!after) o += `<rect x="${a}" y="${y + 4}" width="${b - a}" height="10" fill="${OXIDE}" stroke="${AMBER}"/>` + excessHatch(a, y + 4, b - a, 10);
    return o;
  };
  const diel = (x, y, after) => {
    const a = x + 14, b = x + w - 14, ls = [x + 30, x + 64, x + 98];
    let o = `<rect x="${a}" y="${y + 40}" width="${b - a}" height="10" fill="${SI}" stroke="${INK_2}"/>`;
    if (after) o += `<rect x="${a}" y="${y + 18}" width="${b - a}" height="22" fill="${TEAL_XL}" stroke="${TEAL}"/>`;
    else {
      let d = `M${a} ${y + 40} V${y + 14}`;
      for (const l of ls) d += ` H${l - 4} Q${l - 4} ${y + 4} ${l + 9} ${y + 4} Q${l + 22} ${y + 4} ${l + 22} ${y + 14}`;
      d += ` H${b} V${y + 40} Z`;
      o += `<path d="${d}" fill="${TEAL_XL}" stroke="${TEAL}"/>` + excessHatch(a, y + 14, b - a, 4) + ls.map(l => excessHatch(l + 1, y + 7, 16, 7)).join('');
    }
    return o + ls.map(l => `<rect x="${l}" y="${y + 30}" width="18" height="10" fill="${COPPER}" stroke="${RED}"/>`).join('');
  };
  const wcmp = (x, y, after) => {
    const a = x + 14, b = x + w - 14, hs = [x + 46, x + 88];
    let o = `<rect x="${a}" y="${y + 44}" width="${b - a}" height="6" fill="${SI}" stroke="${INK_2}"/><rect x="${a}" y="${y + 14}" width="${b - a}" height="30" fill="${DIEL_C}" stroke="${INK_2}"/>`;
    o += hs.map(h => `<rect x="${h}" y="${y + 14}" width="12" height="30" fill="${W_PLUG}" stroke="${INK_2}"/><path d="M${h + 1} ${y + 14} V${y + 43} H${h + 11} V${y + 14}" fill="none" stroke="${BARRIER}" stroke-width=".8"/>`).join('');
    if (!after) o += `<rect x="${a}" y="${y + 6}" width="${b - a}" height="8" fill="${W_PLUG}" stroke="${INK_2}"/>` + excessHatch(a, y + 6, b - a, 8);
    return o;
  };
  const cu = (x, y, after) => {
    const a = x + 14, b = x + w - 14, ts = [[x + 28, 30], [x + 84, 22]];
    let o = `<rect x="${a}" y="${y + 14}" width="${b - a}" height="36" fill="${DIEL_C}" stroke="${INK_2}"/>`;
    if (!after) o += `<rect x="${a}" y="${y + 4}" width="${b - a}" height="10" fill="${COPPER}"/>` + excessHatch(a, y + 4, b - a, 10) + `<path d="M${a} ${y + 14} V${y + 4} H${b} V${y + 14}" fill="none" stroke="${RED}" stroke-width=".8"/>`;
    o += ts.map(([p, tw]) => `<rect x="${p}" y="${y + 13.5}" width="${tw}" height="20.5" fill="${COPPER}"/><path d="M${p} ${y + 14} V${y + 34} H${p + tw} V${y + 14}" fill="none" stroke="${BARRIER}" stroke-width="1.6"/>`).join('');
    if (!after) o += [[a, ts[0][0]], [ts[0][0] + ts[0][1], ts[1][0]], [ts[1][0] + ts[1][1], b]].map(([p, q]) => `<path d="M${p} ${y + 14} H${q}" stroke="${BARRIER}" stroke-width="1.6"/>`).join('');
    return o;
  };
  const draws = [sti, diel, wcmp, cu];
  const descs = keys.map(([, d]) => para(0, 0, L(d), w - 16, 10.5)), dh = Math.max(...descs.map(p => p.height));
  const ch = 184 + dh + 8;
  let svg = '';
  xs.forEach((x, i) => {
    svg += card(x, 12, w, ch, '#ffffff', LINE) + para(x + w / 2, 32, L(keys[i][0]), w - 16, 12, INK, 'middle', 800).svg
      + t(x + w / 2, 50, L(ex[i]), 9.5, i === 1 ? TEAL : RED, 'middle', 700)
      + draws[i](x, 52, false) + arrow(x + w / 2, 108, x + w / 2, 124, TEAL, 1.6) + draws[i](x, 126, true)
      + para(x + w / 2, 196, L(keys[i][1]), w - 16, 10.5, INK_2).svg;
  });
  return { svg, height: 12 + ch + 8 };
}

// ch08 磨到哪裡該停：取代三欄比較方框，標題與八句照搬。終點偵測：快磨完、露出下層的剖面，旁邊是摩擦力與反光隨研磨時間的小曲線，
// 換材料那一刻同時轉折；停止層：被磨材料裡的向下箭頭長、到停止層變短；微調研磨時間：研磨速度隨研磨墊用久慢慢漂移，量測後回饋到下一批。
// 技術審查修正：三格並列不編號，曲線不標數值，速度只畫成緩慢單調的漂移
function cmpStop(spec, en, kit) {
  const { L, t, para, arrow, lead, icon } = tools(spec, en, kit);
  const cw = 196, gap = 10, xs = [0, 1, 2].map(i => 16 + i * (cw + gap)), dy = 46, dh = 96;
  const items = [['i1a', 'i1b', 'i1c'], ['i2a', 'i2b'], ['i3a', 'i3b', 'i3c']];
  const blocks = items.map(ks => ks.map(k => para(0, 0, L(k), cw - 24, 10.5)));
  const th = Math.max(...blocks.map(b => b.reduce((s, p) => s + p.height + 3, 0)));
  const ch = dy + dh + th + 14;
  let svg = '';
  xs.forEach((x, i) => {
    svg += card(x, 12, cw, ch, '#ffffff', LINE) + para(x + cw / 2, 34, L(`t${i + 1}`), cw - 16, 12, AMBER, 'middle', 800).svg;
    let yy = 12 + dy + dh + 12;
    blocks[i].forEach((p, j) => { svg += para(x + cw / 2, yy, L(items[i][j]), cw - 24, 10.5, j === blocks[i].length - 1 ? INK : INK_2, 'middle', j === blocks[i].length - 1 ? 600 : 400).svg; yy += p.height + 3; });
  });
  const y = 12 + dy;
  // 終點偵測：上層材料快磨完，露出下層；右邊是摩擦力與反光的小曲線
  let x = xs[0];
  svg += `<rect x="${x + 10}" y="${y + 52}" width="76" height="26" fill="${BLUE_L}" stroke="${BLUE}"/><path d="M${x + 10} ${y + 52} V${y + 46} H${x + 30} Q${x + 36} ${y + 46} ${x + 38} ${y + 52} M${x + 58} ${y + 52} Q${x + 60} ${y + 46} ${x + 66} ${y + 46} H${x + 86} V${y + 52}" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + `<rect x="${x + 6}" y="${y + 36}" width="84" height="10" rx="2" fill="#cbd5e1" stroke="${INK_2}"/>` + arrow(x + 48, y + 14, x + 48, y + 34, INK_2, 1.3);
  const gx = x + 104, gy = y + 70, gw = 80;
  svg += arrow(gx, gy, gx + gw, gy, INK_2, 1) + arrow(gx, gy, gx, y + 4, INK_2, 1)
    + `<path d="M${gx + 2} ${y + 46} H${gx + 44} L${gx + 50} ${y + 30} H${gx + gw - 4}" fill="none" stroke="${RED}" stroke-width="1.6"/>`
    + `<path d="M${gx + 2} ${y + 20} H${gx + 44} L${gx + 50} ${y + 58} H${gx + gw - 4}" fill="none" stroke="${BLUE}" stroke-width="1.6"/>`
    + `<path d="M${gx + 47} ${y + 6} V${gy}" stroke="${MUTED}" stroke-dasharray="3 2"/>`
    + `<path d="M${x + 48} ${y + 57} H${gx + 47}" stroke="${MUTED}" stroke-dasharray="3 2"/>`
    + t(gx + 4, y + 42, L('friction'), 9, RED, 'start', 700) + t(gx + 4, y + 16, L('reflect'), 9, BLUE, 'start', 700)
    + t(gx + gw, gy + 12, L('ptime'), 9, MUTED, 'end', 600);
  // 停止層：被磨材料中的向下箭頭長，到停止層變短
  x = xs[1];
  svg += `<rect x="${x + 16}" y="${y + 70}" width="164" height="10" fill="${SI}" stroke="${INK_2}"/><rect x="${x + 16}" y="${y + 60}" width="164" height="10" fill="#94a3b8" stroke="${INK_2}"/>`
    + `<rect x="${x + 16}" y="${y + 36}" width="82" height="24" fill="${TEAL_L}" stroke="${TEAL}"/>`
    + arrow(x + 57, y + 4, x + 57, y + 34, RED, 2) + arrow(x + 139, y + 46, x + 139, y + 58, RED, 2)
    + t(x + 22, y + 68.5, L('t2'), 8.5, INK, 'start', 700);
  // 微調研磨時間：研磨速度隨研磨墊用久慢慢漂移；量測後回饋到下一批
  x = xs[2];
  const cx0 = x + 16, cy0 = y + 44;
  const stack = (cx, cy, c) => [0, 5, 10].map(d => `<ellipse cx="${cx}" cy="${cy + d}" rx="15" ry="4" fill="#e2e8f0" stroke="${c}"/>`).join('');
  svg += arrow(cx0, cy0, cx0 + 164, cy0, INK_2, 1) + arrow(cx0, cy0, cx0, y + 2, INK_2, 1)
    + `<path d="M${cx0 + 4} ${y + 16} C${cx0 + 60} ${y + 19}, ${cx0 + 110} ${y + 28}, ${cx0 + 160} ${y + 36}" fill="none" stroke="${TEAL}" stroke-width="1.8"/>`
    + t(cx0 + 6, y + 9, L('rate'), 9, MUTED, 'start', 600) + t(cx0 + 150, y + 22, L('wear'), 9.5, TEAL, 'end', 700)
    + stack(x + 34, y + 62, INK_2) + t(x + 34, y + 92, L('prev'), 9.5, INK_2, 'middle', 700)
    + arrow(x + 52, y + 68, x + 80, y + 68, AMBER, 1.4) + icon('ruler', x + 86, y + 57, 22, INK_2)
    + arrow(x + 114, y + 68, x + 142, y + 68, AMBER, 1.4) + stack(x + 162, y + 62, TEAL) + t(x + 162, y + 92, L('next'), 9.5, TEAL, 'middle', 700);
  return { svg, height: 12 + ch + 8 };
}

// ch08 常見異常：五張卡片，每張是一個 CMP 異常的小剖面、名稱與結果（可能原因留給下方表格）；版式沿用 ch05、ch06 的異常卡
function cmpDefects(spec, en, kit) {
  const { L, para } = tools(spec, en, kit);
  const w = 115.2, gap = 8;
  const base = (x, y) => `<rect x="${x + 8}" y="${y + 30}" width="${w - 16}" height="34" fill="${DIEL_C}" stroke="${INK_2}"/>`;
  const line = (x0, y, wd, top = 30, cls = '') => `<rect x="${x0}" y="${y + top}" width="${wd}" height="${54 - top}" fill="${COPPER}" stroke="${RED}" stroke-width=".9"${cls}/>`;
  const art = [
    // 磨過頭或磨不夠：兩個小剖面對同一條目標虛線，左邊高於、右邊低於
    (x, y) => [[x + 8, 22], [x + 62, 36]].map(([bx, top]) => `<rect x="${bx}" y="${y + 50}" width="45" height="14" fill="${SI}" stroke="${INK_2}"/><rect x="${bx}" y="${y + top}" width="45" height="${50 - top}" fill="${TEAL_L}" stroke="${TEAL}"/>`).join('')
      + `<path d="M${x + 4} ${y + 29} H${x + w - 4}" stroke="${INK_2}" stroke-dasharray="3 2"/>`,
    // 碟化與侵蝕：左邊寬銅線中間凹下；右邊密集細線區整片較低；虛線是周圍表面
    (x, y) => base(x, y) + `<path d="M${x + 14} ${y + 30} Q${x + 30} ${y + 40} ${x + 46} ${y + 30} Z" fill="#ffffff"/><path d="M${x + 14} ${y + 30} Q${x + 30} ${y + 40} ${x + 46} ${y + 30} V${y + 54} H${x + 14} Z" fill="${COPPER}" stroke="${RED}" stroke-width=".9"/>`
      + `<path d="M${x + 58} ${y + 30} H${x + 62} V${y + 35} H${x + 102} V${y + 30}" fill="#ffffff" stroke="${INK_2}"/>` + [64, 74, 84, 94].map(d => `<rect x="${x + d}" y="${y + 35}" width="5" height="19" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/>`).join('')
      + `<path d="M${x + 4} ${y + 30} H${x + w - 4}" stroke="${INK}" stroke-dasharray="3 2"/>`,
    // 刮傷：一道 V 形刻痕切進導線
    (x, y) => base(x, y) + line(x + 24, y, 22) + line(x + 70, y, 22) + `<path d="M${x + 22} ${y + 29.5} L${x + 37} ${y + 46} L${x + 52} ${y + 29.5} Z" fill="#ffffff" stroke="${RED}" stroke-width="1.3"/>`,
    // 金屬殘留：兩條導線之間的絕緣層表面留著一層薄金屬，兩端都接到導線
    (x, y) => base(x, y) + line(x + 18, y, 22) + line(x + 76, y, 22) + `<rect x="${x + 18}" y="${y + 27}" width="80" height="3" fill="${COPPER}" stroke="${RED}" stroke-width="1.2"/>`,
    // 腐蝕：銅導線頂面不規則的坑洞
    (x, y) => base(x, y) + line(x + 26, y, 64) + [[36, 4], [50, 3], [62, 5], [78, 3.5]].map(([d, r]) => `<path d="M${x + d - r} ${y + 30} A${r} ${r} 0 0 0 ${x + d + r} ${y + 30} Z" fill="#ffffff" stroke="${RED}" stroke-width="1.1"/>`).join('')
  ];
  const cards = [['over', 'overR'], ['dish', 'dishR'], ['scratch', 'scratchR'], ['residue', 'residueR'], ['corr', 'corrR']];
  const texts = cards.map(([a, b]) => [para(0, 0, L(a), w - 14, 11, INK, 'middle', 700), para(0, 0, L(b), w - 14, 10)]);
  const head = Math.max(...texts.map(([a]) => a.height)), cardH = 88 + head + Math.max(...texts.map(([, b]) => b.height)) + 6;
  let svg = '';
  cards.forEach(([a, b], i) => {
    const x = 16 + i * (w + gap);
    svg += card(x, 12, w, cardH, '#ffffff', LINE) + art[i](x, 16) + para(x + w / 2, 100, L(a), w - 14, 11, INK, 'middle', 700).svg + para(x + w / 2, 100 + head + 2, L(b), w - 14, 10, RED).svg;
  });
  return { svg, height: 12 + cardH + 8 };
}

// ch08 CMP 平坦化條例總覽：上排照搬四段條例（名稱與註記），後段銅雙鑲嵌那張以琥珀色標出並拉虛線到下半；
// 下半是銅雙鑲嵌三步研磨的四個小剖面：起始整面厚銅 → 高速除銅（溝外剩薄銅）→ 軟著陸清銅（停在阻障層）→ 阻障層與介電質微拋（低壓）。
// 技術審查修正：不用 Step 與數字；溝內的銅與側壁、底部的阻障層一直保留，被磨掉的只有溝外的阻障層；本圖不放數字
function cmpClauses(spec, en, kit) {
  const { L, t, para, breakAt, arrow, lead } = tools(spec, en, kit);
  const cw = 140, gap = 16, xs = [0, 1, 2, 3].map(i => 16 + i * (cw + gap)), hi = 2;
  const nm = [0, 1, 2, 3].map(i => para(0, 0, L(`s${i}`), cw - 16, 11, INK, 'middle', 700)), nt = [0, 1, 2, 3].map(i => para(0, 0, L(`n${i}`), cw - 16, 10));
  const nh = Math.max(...nm.map(p => p.height)), th = Math.max(...nt.map(p => p.height)), ch = 14 + nh + 4 + th + 10, py = 12 + ch + 30;
  let svg = `<path d="M${xs[hi] + 10} ${12 + ch} L24 ${py} M${xs[hi] + cw - 10} ${12 + ch} L616 ${py}" fill="none" stroke="${AMBER}" stroke-dasharray="4 3"/>`;
  xs.forEach((x, i) => {
    const on = i === hi;
    svg += card(x, 12, cw, ch, on ? AMBER_XL : '#ffffff', on ? AMBER : LINE, 6) + para(x + cw / 2, 12 + 20, L(`s${i}`), cw - 16, 11, on ? AMBER : INK, 'middle', 700).svg
      + para(x + cw / 2, 12 + 20 + nh + 4, L(`n${i}`), cw - 16, 10, INK_2).svg;
    if (i < 3) svg += arrow(x + cw + 3, 12 + ch / 2, x + cw + gap - 3, 12 + ch / 2, TEAL, 1.5);
  });
  // 下半：四個小剖面；溝外的銅由厚到無，最後一步磨掉溝外的阻障層、介電質頂面略降
  const sw = 112, sx = [0, 1, 2, 3].map(i => 34 + i * (sw + 38)), top = py + 88;
  const sect = (x, stage) => {
    const dTop = stage === 3 ? top + 1.6 : top, tr = [[x + 12, 46], [x + 74, 22]];
    let o = `<rect x="${x}" y="${dTop}" width="${sw}" height="${top + 40 - dTop}" fill="#f0fdfa" stroke="${TEAL}"/>`;
    if (stage < 2) { const h = stage ? 4 : 20; o += `<rect x="${x}" y="${top - h}" width="${sw}" height="${h}" fill="${COPPER}"/><path d="M${x} ${top} V${top - h} H${x + sw} V${top}" fill="none" stroke="${RED}" stroke-width=".8"/>`; }
    o += tr.map(([p, tw]) => `<rect x="${p}" y="${dTop - 0.5}" width="${tw}" height="${top + 24.5 - dTop}" fill="${COPPER}"/><path d="M${p} ${dTop} V${top + 24} H${p + tw} V${dTop}" fill="none" stroke="${BARRIER}" stroke-width="1.8"/>`).join('');
    // 溝外的阻障層只在兩個開口以外，溝內的銅和上方的銅相連（審查修正，高）
    if (stage < 3) o += [[x, tr[0][0]], [tr[0][0] + tr[0][1], tr[1][0]], [tr[1][0] + tr[1][1], x + sw]].map(([p, q]) => `<path d="M${p} ${top} H${q}" stroke="${BARRIER}" stroke-width="1.8"/>`).join('');
    return o;
  };
  let band = sx.map((x, i) => sect(x, i)).join('');
  const steps = [['bulk', null], ['soft', 'stopTa'], ['buff', 'low']];
  steps.forEach(([k, n], i) => {
    const ax = sx[i] + sw + 4, bx = sx[i + 1] - 4, mx = (ax + bx) / 2;
    band += arrow(ax, top + 18, bx, top + 18, AMBER, 1.8);
    // 步驟名放在兩格之間、剖面上方，虛線往下接到箭頭
    const p = breakAt(mx, top - 48, L(k), k === 'buff' ? '微拋' : [], sw - 10, 10.5, AMBER, 'middle', 800), q = n ? para(mx, top - 48 + p.height, L(n), 120, 9.5, INK_2, 'middle', 600) : { svg: '', height: 0 };
    band += p.svg + q.svg + lead(mx, top - 48 + p.height + q.height - 6, mx, top + 12);
  });
  // 材料標籤（第一格）
  const x0 = sx[0];
  band += lead(x0 + 30, top + 12, x0 + 30, top + 50) + t(x0 + 30, top + 60, L('cuL'), 9.5, RED, 'middle', 700)
    + lead(x0 + 86, top + 24, x0 + 86, top + 50) + t(x0 + 86, top + 60, L('bar'), 9.5, BARRIER, 'middle', 700)
    + t(x0 + sw / 2, top + 80, L('die'), 9.5, INK_2, 'middle', 700) + lead(x0 + sw / 2, top + 36, x0 + sw / 2, top + 70);
  const bottom = top + 92;
  svg += card(16, py, 608, bottom - py, '#ffffff', AMBER) + band;
  return { svg, height: bottom + 10 };
}

// ch08 定量物理定律：取代銅墊凹陷的分支方框，根、三種情形與三個結果照搬。三欄是銅墊太凸、受控內凹、凹陷太深，
// 兩列是室溫下與退火時；每格上晶圓翻面朝下、下晶圓朝上，銅墊嵌在介電質裡對齊，凹陷誇張畫。
// 技術審查修正：門檻數字待 Sam 統一，圖上不放數字；正文沒說太凸的晶圓退火後會怎樣，那一格留空
function bondRecess(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const cw = 196, gap = 10, xs = [0, 1, 2].map(i => 16 + i * (cw + gap));
  const rp = para(0, 0, L('root'), 260, 12, INK, 'middle', 800), rh = rp.height + 16;
  let svg = card(180, 12, 280, rh, TEAL_XL, TEAL, 6) + para(320, 12 + 20, L('root'), 260, 12, INK, 'middle', 800).svg;
  const hy = 12 + rh + 20, heads = [1, 2, 3].map(i => para(0, 0, L(`b${i}`), cw - 20, 11.5, INK, 'middle', 700)), hh = Math.max(...heads.map(p => p.height)) + 12;
  const res = [1, 2, 3].map(i => para(0, 0, L(`l${i}`), cw - 20, 10.5)), rhh = Math.max(...res.map(p => p.height)) + 14;
  const cellH = 86, r1 = hy + hh + 22, r2 = r1 + cellH + 26, ch = r2 + cellH + 8 - hy + rhh;
  // 每格：上晶圓（翻面朝下）與下晶圓；recess > 0 是內凹、< 0 是凸出；expand 是退火時每面的膨脹量
  const cell = (x, y, recess, expand, first) => {
    const cx = x + cw / 2, pw = 44, gapD = recess < 0 ? -2 * recess : 0, mid = y + 40, uTop = y + 6, uBot = mid - gapD / 2, lTop = mid + gapD / 2, lBot = y + 80;
    const pr = recess - expand;
    let o = `<rect x="${x + 18}" y="${uTop}" width="${cw - 36}" height="${uBot - uTop}" fill="${DIEL_C}" stroke="${INK_2}"/><rect x="${x + 18}" y="${lTop}" width="${cw - 36}" height="${lBot - lTop}" fill="${DIEL_C}" stroke="${INK_2}"/>`;
    o += `<rect x="${cx - pw / 2}" y="${uTop + 10}" width="${pw}" height="${uBot - (pr > 0 ? pr : 0) - uTop - 10 + (pr < 0 ? -pr : 0)}" fill="${COPPER}" stroke="${RED}" stroke-width=".9"/>`
      + `<rect x="${cx - pw / 2}" y="${lTop + (pr > 0 ? pr : 0) - (pr < 0 ? -pr : 0)}" width="${pw}" height="${lBot - 10 - lTop - (pr > 0 ? pr : 0) + (pr < 0 ? -pr : 0)}" fill="${COPPER}" stroke="${RED}" stroke-width=".9"/>`;
    if (expand) o += thinArrow(cx - pw / 2 - 8, lBot - 16, cx - pw / 2 - 8, lTop + 4, RED, 1.2) + thinArrow(cx - pw / 2 - 8, uTop + 16, cx - pw / 2 - 8, uBot - 4, RED, 1.2)
      + (first === 'up' ? para(cx - pw / 2 - 14, lTop + 16, L('up'), 52, 9, RED, 'end', 700).svg : '');
    if (expand && pr > 0) o += `<path d="M${cx - pw / 2 - 4} ${mid} H${cx + pw / 2 + 4}" stroke="${RED}" stroke-width="1.4" stroke-dasharray="2 2"/>`;
    if (recess < 0) o += `<path d="M${x + 18} ${mid} H${cx - pw / 2 - 2} M${cx + pw / 2 + 2} ${mid} H${x + cw - 18}" stroke="${RED}" stroke-width="1.4" stroke-dasharray="2 2"/>`;
    if (first === true) o += t(x + 24, uTop + 15, L('die'), 9, INK_2, 'start', 700) + lead(cx + pw / 2 - 6, lBot - 14, cx + pw / 2 + 24, lBot + 4) + t(cx + pw / 2 + 26, lBot + 12, L('pad'), 9, RED, 'start', 700);
    return o;
  };
  const cases = [[-3, 0], [3, 0], [7, 0]];
  xs.forEach((x, i) => {
    svg += `<path d="M320 ${12 + rh} V${hy - 10} H${x + cw / 2} V${hy}" fill="none" stroke="${TEAL}" stroke-width="1.3"/>`
      + card(x, hy, cw, ch, '#ffffff', LINE) + `<path d="M${x + 1} ${hy + hh} H${x + cw - 1}" stroke="${LINE}"/>` + para(x + cw / 2, midY(hy + hh / 2, heads[i].height, 11.5), L(`b${i + 1}`), cw - 20, 11.5, AMBER, 'middle', 700).svg
      + cell(x, r1, cases[i][0], 0, i === 0);
    if (i === 0) svg += `<rect x="${x + 18}" y="${r2 + 6}" width="${cw - 36}" height="74" rx="4" fill="#f1f5f9"/>`;
    else svg += cell(x, r2, cases[i][0], 3, i === 1 ? 'up' : false);
    svg += `<rect x="${x + 1}" y="${hy + ch - rhh}" width="${cw - 2}" height="${rhh - 1}" rx="7" fill="${LIGHT}"/>` + para(x + cw / 2, midY(hy + ch - rhh / 2, res[i].height, 10.5), L(`l${i + 1}`), cw - 20, 10.5, i ? INK_2 : INK_2).svg;
  });
  svg += xs.map(x => t(x + 8, r1 - 6, L('rt'), 10.5, TEAL, 'start', 800) + t(x + 8, r2 - 6, L('an'), 10.5, RED, 'start', 800)).join('');
  return { svg, height: hy + ch + 8 };
}

// ch08 現場異常徵兆：取代三大異常分支方框，根、三個異常與對策照搬（樹狀三列），研磨液團簇刮痕那一列以琥珀色標出並拉虛線到下半；
// 下半左是晶圓俯視圖：一段不與晶圓同心的圓弧上一串等間距短刻痕，跨過的晶粒標紅；右是刮痕末端的放大，留著一顆硬顆粒。
// 技術審查修正：英文正文沒有「切斷多條金屬線」，不畫被切斷的導線；不放數字
function cmpFailures(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const tree = treeRow(L, para, arrow, 12, 'root', [['b1', 'l1'], ['b2', 'l2'], ['b3', 'l3']], 1);
  const py = tree.bottom + 26, wc = [150, py + 104], wr = 76, die = 15;
  let svg = tree.svg, band = t(32, py + 22, L('b2'), 11.5, AMBER, 'start', 800);
  // 圓弧（圓心在晶圓外）
  // 圓弧的兩端都留在晶圓內（G 審查前自查：原本有一段畫到晶圓外）
  const ac = [wc[0] + 85, wc[1] + 75], ar = 90, a0 = -3.0, a1 = -1.8;
  const onArc = a => [ac[0] + ar * Math.cos(a), ac[1] + ar * Math.sin(a)];
  const hitDies = new Set();
  for (let k = 0; k <= 40; k++) { const [px, py2] = onArc(a0 + (a1 - a0) * k / 40); hitDies.add(`${Math.floor((px - wc[0]) / die)},${Math.floor((py2 - wc[1]) / die)}`); }
  band += `<circle cx="${wc[0]}" cy="${wc[1]}" r="${wr}" fill="#e2e8f0" stroke="${INK_2}"/>`;
  for (let i = -6; i < 6; i++) for (let j = -6; j < 6; j++) {
    const x = wc[0] + i * die, y = wc[1] + j * die;
    if ([[x, y], [x + die, y], [x, y + die], [x + die, y + die]].every(([p, q]) => Math.hypot(p - wc[0], q - wc[1]) < wr - 2)) band += `<rect x="${x + 1}" y="${y + 1}" width="${die - 2}" height="${die - 2}" fill="${hitDies.has(`${i},${j}`) ? '#fecaca' : '#ffffff'}" stroke="${hitDies.has(`${i},${j}`) ? RED : LINE}" stroke-width=".7"/>`;
  }
  for (let k = 0; k <= 14; k++) {
    const a = a0 + (a1 - a0) * k / 14, [px, py2] = onArc(a), nx = Math.cos(a), ny = Math.sin(a);
    band += `<path d="M${(px - nx * 3).toFixed(1)} ${(py2 - ny * 3).toFixed(1)} L${(px + nx * 3).toFixed(1)} ${(py2 + ny * 3).toFixed(1)}" stroke="${RED}" stroke-width="2"/>`;
  }
  const [ex, ey] = onArc(a1);
  band += para(wc[0] + wr + 18, py + 40, L('arc'), 170, 11, RED, 'start', 700).svg + lead(wc[0] + wr + 16, py + 44, ...onArc(a0 + (a1 - a0) * 0.75).map(v => +v.toFixed(1)));
  // 右：刮痕末端放大，留著一顆硬顆粒
  const zc = [520, py + 104], zr = 58;
  band += `<path d="M${ex.toFixed(1)} ${ey.toFixed(1)} L${zc[0] - zr + 4} ${zc[1] - 20} M${ex.toFixed(1)} ${ey.toFixed(1)} L${zc[0] - zr + 4} ${zc[1] + 20}" stroke="${MUTED}" stroke-dasharray="2 2"/>`
    + `<circle cx="${zc[0]}" cy="${zc[1]}" r="${zr}" fill="#f1f5f9" stroke="${MUTED}"/>`
    + `<path d="M${zc[0] - 50} ${zc[1] + 18} Q${zc[0] - 10} ${zc[1] + 4} ${zc[0] + 14} ${zc[1] - 8}" fill="none" stroke="${RED}" stroke-width="3" stroke-dasharray="6 3"/>`
    + `<path d="M${zc[0] + 14} ${zc[1] - 17} l9 2 4 8 -3 9 -9 2 -7 -6 0 -9 z" fill="#475569" stroke="${INK}"/>`
    + para(zc[0], zc[1] + zr + 16, L('debris'), 150, 10.5, INK, 'middle', 700).svg;
  const bottom = zc[1] + zr + 30;
  svg += card(16, py, 608, bottom - py, '#ffffff', AMBER) + band;
  return { svg, height: bottom + 10 };
}

// ch09 看不見的敵人：一條製程帶，相同的灰色方塊只標「步驟」，方塊之間插入清洗的水滴；左下放大晶圓表面的一顆微粒與幾個金屬原子。
// 技術審查修正：正文沒有列出步驟名稱與順序，方塊不畫成特定製程；不標次數
function cleanEverywhere(spec, en, kit) {
  const { L, t, para, arrow, icon } = tools(spec, en, kit);
  const h1 = para(320, 24, `${L('every')}${en ? ', ' : '、'}${L('before')}`, 560, 12, INK, 'middle', 800);
  let svg = h1.svg;
  const y = 24 + h1.height + 12, bw = 64, gap = 45, xs = Array.from({ length: 6 }, (_, i) => 26 + i * (bw + gap));
  xs.forEach((x, i) => {
    svg += `<rect x="${x}" y="${y}" width="${bw}" height="34" rx="6" fill="#e2e8f0" stroke="${INK_2}"/>` + t(x + bw / 2, y + 21, L('step'), 10.5, INK_2, 'middle', 700);
    if (i < 5) svg += `<path d="M${x + bw} ${y + 17} H${x + bw + gap}" stroke="${MUTED}" stroke-width="1.2"/>` + icon('drop', x + bw + gap / 2 - 9, y + 8, 18, BLUE) + t(x + bw + gap / 2, y + 46, L('clean'), 9.5, BLUE, 'middle', 700);
  });
  // 放大：晶圓表面的一顆微粒與幾個金屬原子，足以讓電晶體失效
  const zy = y + 70;
  svg += `<rect x="40" y="${zy + 40}" width="240" height="22" fill="${SI}" stroke="${INK_2}"/><circle cx="110" cy="${zy + 30}" r="10" fill="#94a3b8" stroke="${INK}"/>`
    + [[170, 37], [186, 36.5], [202, 37.5], [178, 38]].map(([a, b]) => `<circle cx="${a}" cy="${zy + b}" r="2.6" fill="${BLUE}"/>`).join('')
    + t(110, zy + 12, L('particle'), 10.5, INK, 'middle', 700) + t(186, zy + 24, L('metal'), 10.5, BLUE, 'middle', 700)
    + arrow(296, zy + 44, 360, zy + 44, RED, 1.8) + icon('transistor', 368, zy + 24, 38, RED) + xmark(404, zy + 58, 5, RED)
    + t(420, zy + 49, L('kill'), 11, RED, 'start', 800);
  return { svg, height: zy + 74 };
}

// ch09 Q-Time：取代分支方框，根、根的說明與三種狀態照搬。時間條由綠到黃到紅，直立的上限線是 Q-Time；
// 括號把綠段與黃段一起標成「在規定時間內」；上方三個表面小剖面：剛洗完 → 長出極薄原生氧化層、吸附少量污染物 → 更厚、更多。
// 技術審查修正：快到期仍在規定時間內；不標時間數值；氧化層和緩增厚
function qtimeBar(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const r1 = para(320, 24, L('root'), 400, 12.5, INK, 'middle', 800), r2 = para(320, 24 + r1.height, L('rootN'), 400, 10.5, INK_2);
  let svg = r1.svg + r2.svg;
  const sy = 24 + r1.height + r2.height + 16, bx = 40, bw = 560, gEnd = 300, yEnd = 420, by = sy + 82;
  // 三個表面小剖面
  const surf = (cx, ox, dots) => `<rect x="${cx - 46}" y="${sy + 30}" width="92" height="22" fill="${SI}" stroke="${INK_2}"/>` + (ox ? `<rect x="${cx - 46}" y="${sy + 30 - ox}" width="92" height="${ox}" fill="${OXIDE}" stroke="${AMBER}" stroke-width=".8"/>` : '')
    + dots.map(d => `<circle cx="${cx - 40 + d * 8}" cy="${sy + 30 - ox - 3}" r="2.4" fill="${INK_2}"/>`).join('');
  svg += surf(140, 0, []) + surf(360, 2.5, [3, 8]) + surf(530, 4.5, [1, 4, 6, 9, 11]);
  svg += para(140, sy + 8, L('fresh'), 190, 9.5, TEAL, 'middle', 700).svg
    + lead(486, sy + 28, 478, sy + 40) + t(476, sy + 44, L('oxide'), 9.5, AMBER, 'end', 700)
    + lead(538, sy + 21, 534, sy + 14) + t(530, sy + 10, L('contam'), 9.5, INK_2, 'middle', 700);
  // 時間條
  svg += `<rect x="${bx}" y="${by}" width="${gEnd - bx}" height="18" fill="#bbf7d0" stroke="${GREEN}"/><rect x="${gEnd}" y="${by}" width="${yEnd - gEnd}" height="18" fill="${AMBER_L}" stroke="${AMBER}"/><rect x="${yEnd}" y="${by}" width="${bx + bw - yEnd}" height="18" fill="#fecaca" stroke="${RED}"/>`
    + `<path d="M${yEnd} ${by - 14} V${by + 26}" stroke="${INK}" stroke-width="2"/>` + t(yEnd, by - 18, L('qt'), 11, INK, 'middle', 800)
    + arrow(bx + bw, by + 9, bx + bw + 14, by + 9, INK_2, 1.2) + `<path d="M${bx} ${by - 2} V${by + 28}" stroke="${INK}" stroke-width="1.6"/>` + t(bx - 2, by + 40, L('start'), 9.5, INK, 'start', 700)
    + `<path d="M${bx} ${by - 6} V${by - 10} H${yEnd - 4} V${by - 6}" fill="none" stroke="${GREEN}" stroke-width="1.4"/>` + t((bx + yEnd) / 2, by - 14, L('b1'), 10.5, GREEN, 'middle', 800);
  // 三種處理
  const ly = by + 30;
  svg += arrow(170, by + 18, 170, ly + 6, GREEN, 1.4) + para(170, ly + 20, L('l1'), 200, 10.5, INK, 'middle', 700).svg
    + t(360, ly + 6, L('b2'), 10.5, AMBER, 'middle', 800) + arrow(360, ly + 10, 360, ly + 22, AMBER, 1.3) + para(360, ly + 36, L('l2'), 110, 10.5, INK, 'middle', 700).svg
    + t(510, ly + 6, L('b3'), 10.5, RED, 'middle', 800) + arrow(510, ly + 10, 510, ly + 22, RED, 1.3);
  const hd = para(510, ly + 36, L('held'), 170, 10.5, INK, 'middle', 700), dc = para(510, ly + 36 + hd.height, L('decide'), 170, 10, INK_2), yy = ly + 36 + hd.height + dc.height + 4;
  svg += hd.svg + dc.svg + arrow(500, yy - 6, 462, yy + 6, RED, 1.2) + arrow(520, yy - 6, 558, yy + 6, RED, 1.2);
  const rc = para(452, yy + 20, L('reclean'), 100, 10, INK, 'middle', 700), ot = para(566, yy + 20, L('other'), 110, 10, INK, 'middle', 700);
  svg += rc.svg + ot.svg;
  return { svg, height: Math.ceil(yy + 20 + Math.max(rc.height, ot.height) + 2) };
}

// ch09 常見異常：五張卡片，每張是一個清洗異常的小圖、名稱與結果；版式沿用其他章的異常卡
function cleanDefects(spec, en, kit) {
  const { L, para, arrow } = tools(spec, en, kit);
  const w = 115.2, gap = 8;
  const surf = (x, y, a = 10, b = w - 10) => `<rect x="${x + a}" y="${y + 48}" width="${b - a}" height="16" fill="${SI}" stroke="${INK_2}"/>`;
  const dots = (x, y, list) => list.map(d => `<circle cx="${x + d}" cy="${y + 44.5}" r="3.2" fill="#94a3b8" stroke="${INK}" stroke-width=".7"/>`).join('');
  const art = [
    // 清洗後微粒反而增加：左邊少、右邊多
    (x, y) => surf(x, y, 8, 50) + surf(x, y, 66, w - 8) + dots(x, y, [24, 38]) + dots(x, y, [70, 77, 84, 91, 98, 105]) + arrow(x + 52, y + 30, x + 64, y + 30, TEAL, 1.4),
    // 水痕：俯視圓環，邊緣深、內部淡
    (x, y) => `<circle cx="${x + w / 2}" cy="${y + 40}" r="24" fill="#f1f5f9" stroke="#94a3b8" stroke-width="5"/><circle cx="${x + w / 2}" cy="${y + 40}" r="24" fill="none" stroke="${INK_2}" stroke-width=".8"/>`,
    // 金屬污染：表面嵌著比微粒小的金屬原子
    (x, y) => surf(x, y) + [22, 36, 50, 66, 80, 94].map((d, k) => `<circle cx="${x + d}" cy="${y + 48 + (k % 2) * 2}" r="2" fill="${BLUE}"/>`).join(''),
    // 薄膜被吃掉太多：薄膜頂面低於目標虛線
    (x, y) => surf(x, y) + `<rect x="${x + 10}" y="${y + 40}" width="${w - 20}" height="8" fill="${TEAL_L}" stroke="${TEAL}"/><path d="M${x + 6} ${y + 30} H${x + w - 6}" stroke="${INK_2}" stroke-dasharray="3 2"/>`,
    // 圖形倒塌：兩根細高結構頂端互相靠攏
    (x, y) => surf(x, y) + `<path d="M${x + 38} ${y + 48} L${x + 50} ${y + 14} L${x + w / 2} ${y + 14} L${x + 46} ${y + 48} Z M${x + w - 38} ${y + 48} L${x + w - 50} ${y + 14} L${x + w / 2} ${y + 14} L${x + w - 46} ${y + 48} Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
  ];
  const cards = [['more', 'moreR'], ['water', 'waterR'], ['metal', 'metalR'], ['film', 'filmR'], ['collapse', 'collapseR']];
  const texts = cards.map(([a, b]) => [para(0, 0, L(a), w - 14, 11, INK, 'middle', 700), para(0, 0, L(b), w - 14, 10)]);
  const head = Math.max(...texts.map(([a]) => a.height)), cardH = 88 + head + Math.max(...texts.map(([, b]) => b.height)) + 6;
  let svg = '';
  cards.forEach(([a, b], i) => {
    const x = 16 + i * (w + gap);
    svg += card(x, 12, w, cardH, '#ffffff', LINE) + art[i](x, 16) + para(x + w / 2, 100, L(a), w - 14, 11, INK, 'middle', 700).svg + para(x + w / 2, 100 + head + 2, L(b), w - 14, 10, RED).svg;
  });
  return { svg, height: 12 + cardH + 8 };
}

// ch09 清洗與乾燥條例總覽：左欄照搬根、根的說明與四類條例（名稱與結果），乾式氣相化學清潔那張以琥珀色標出；
// 右邊在真空腔體裡展開四個小剖面：原生氧化層 → 通入 NF₃ / NH₃ → 轉成固態鹽類 → 升溫至 > 100°C 昇華抽走，露出乾淨矽面。
// 技術審查修正：前三格載台是冷色、第四格才加熱；不畫電漿輝光（正文是遠端自由基）；全程沒有液滴
function cleanClauses(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const lw = 224, hi = 3;
  const r1 = para(16 + lw / 2, 30, L('root'), lw - 20, 12, INK, 'middle', 800), r2 = para(16 + lw / 2, 30 + r1.height, L('rootN'), lw - 20, 10, INK_2);
  let svg = card(16, 12, lw, r1.height + r2.height + 16, TEAL_XL, TEAL, 6) + r1.svg + r2.svg;
  let y = 12 + r1.height + r2.height + 16 + 10;
  const cardsY = [];
  for (let i = 1; i <= 4; i++) {
    const on = i === hi, a = para(0, 0, L(`b${i}`), lw - 20, 11, INK, 'middle', 700), b = para(0, 0, L(`l${i}`), lw - 20, 10), h = a.height + b.height + 12;
    svg += card(16, y, lw, h, on ? AMBER_XL : '#ffffff', on ? AMBER : LINE, 6) + para(16 + lw / 2, y + 16, L(`b${i}`), lw - 20, 11, on ? AMBER : INK, 'middle', 700).svg + para(16 + lw / 2, y + 16 + a.height, L(`l${i}`), lw - 20, 10, INK_2).svg;
    cardsY.push([y, h]);
    y += h + 6;
  }
  const leftBottom = y - 6;
  // 右：真空腔體裡的四個小剖面
  const rx = 262, rw = 362, [hy, hh] = cardsY[hi - 1], ty = 22, sw = 66, g = 22, xs = [0, 1, 2, 3].map(i => rx + 14 + i * (sw + g)), sy = ty + 60;
  // 從乾式氣相化學清潔那張卡轉折連到右邊的腔體
  svg += `<path d="M${16 + lw} ${hy + hh / 2} H${rx - 11} V${ty + 100} H${rx}" fill="none" stroke="${AMBER}" stroke-dasharray="4 3"/>` + `<rect x="${rx}" y="${ty}" width="${rw}" height="168" rx="10" fill="#ffffff" stroke="${AMBER}"/>` + t(rx + 12, ty + 18, L('vac'), 10.5, AMBER, 'start', 800);
  xs.forEach((x, i) => {
    const hot = i === 3;
    svg += `<rect x="${x - 2}" y="${sy + 30}" width="${sw + 4}" height="8" fill="${hot ? '#fdba74' : BLUE_L}" stroke="${hot ? RED : BLUE}" stroke-width=".8"/><rect x="${x}" y="${sy + 12}" width="${sw}" height="18" fill="${SI}" stroke="${INK_2}"/>`;
    if (i < 2) svg += `<rect x="${x}" y="${sy + 7}" width="${sw}" height="5" fill="${OXIDE}" stroke="${AMBER}" stroke-width=".8"/>`;
    if (i === 1) svg += [8, 26, 44, 62].map(d => `<circle cx="${x + d}" cy="${sy - 12 + (d % 3) * 3}" r="2.4" fill="${TEAL_L}" stroke="${TEAL}"/><circle cx="${x + d + 4}" cy="${sy - 12 + (d % 3) * 3}" r="2.4" fill="${BLUE_L}" stroke="${BLUE}"/>`).join('');
    if (i === 2) svg += `<rect x="${x}" y="${sy}" width="${sw}" height="12" fill="#f5f5f4" stroke="${INK_2}" stroke-width=".8"/>` + Array.from({ length: 8 }, (_, k) => `<circle cx="${x + 5 + k * 8}" cy="${sy + 6 + (k % 2) * 2 - 1}" r="2" fill="#d6d3d1" stroke="${MUTED}" stroke-width=".5"/>`).join('');
    if (hot) svg += [10, 30, 50, 66].map((d, k) => `<circle cx="${x + d}" cy="${sy - 4 - k * 5}" r="2.2" fill="#d6d3d1" stroke="${MUTED}" stroke-width=".6"/>` + thinArrow(x + d, sy - 8 - k * 5, x + d, sy - 18 - k * 5, MUTED, 1)).join('')
      + Array.from({ length: 4 }, (_, k) => `<path d="M${x + 10 + k * 18} ${sy + 44} q3 4 0 8" fill="none" stroke="${RED}" stroke-width="1.2"/>`).join('');
    if (i < 3) svg += arrow(x + sw + 3, sy + 20, x + sw + g - 3, sy + 20, AMBER, 1.5);
  });
  const lab = [['native'], ['gas'], ['salt', 'formula'], ['heat', 'sub']];
  xs.forEach((x, i) => { let yy = sy + 66; lab[i].forEach((k, j) => { const p = para(x + sw / 2, yy, L(k), sw + 26, 9.5, j ? INK_2 : INK, 'middle', j ? 600 : 700); svg += p.svg; yy += p.height; }); });
  // 沒有液滴：劃掉的水滴
  const dx = rx + 160, dyy = ty + 18;
  svg += `<path d="M${dx} ${dyy - 12} c-5 7 -7 10 -7 13 a7 7 0 0 0 14 0 c0 -3 -2 -6 -7 -13 z" fill="${BLUE_XL}" stroke="${BLUE}"/>` + xmark(dx, dyy - 3, 7, RED) + t(dx + 14, dyy + 1, L('noLiquid'), 9.5, RED, 'start', 700);
  return { svg, height: Math.max(leftBottom, ty + 168) + 10 };
}

// ch09 定量物理定律：取代毛細力的分支方框，根、根的說明、水與超臨界二氧化碳兩支及結果照搬。
// 左：水只剩結構之間、液面低於頂端呈下凹的彎月面，兩根細高結構上半段被拉向彼此、頂端貼住；
// 右：超臨界二氧化碳均勻充滿結構之間與上方，沒有液面線，結構直立。技術審查修正：不放表面張力與深寬比的數字
function dryCollapse(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const r1 = para(320, 24, L('root'), 440, 12.5, INK, 'middle', 800), r2 = para(320, 24 + r1.height, L('rootN'), 440, 10.5, INK_2);
  let svg = r1.svg + r2.svg;
  const top = 24 + r1.height + r2.height + 14, pw = 296, xs = [16, 328];
  const heads = [para(0, 0, L('b1'), pw - 24, 12, INK, 'middle', 800), para(0, 0, L('b2'), pw - 24, 12, INK, 'middle', 800)], hh = Math.max(...heads.map(p => p.height));
  const res = [para(0, 0, L('l1'), pw - 24, 11, RED, 'middle', 700), para(0, 0, L('l2'), pw - 24, 11, TEAL, 'middle', 700)], rh = Math.max(...res.map(p => p.height));
  const ch = 20 + hh + 150 + rh + 14;
  xs.forEach((x, i) => {
    const cx = x + pw / 2, base = top + 20 + hh + 130, H = 100;
    svg += card(x, top, pw, ch, '#ffffff', LINE) + para(cx, top + 22, L(i ? 'b2' : 'b1'), pw - 24, 12, i ? VIOLET : BLUE, 'middle', 800).svg
      + `<rect x="${x + 40}" y="${base}" width="${pw - 80}" height="14" fill="${SI}" stroke="${INK_2}"/>`;
    const p1 = cx - 34, p2 = cx + 34, pwid = 14;
    if (!i) {
      // 水：液面低於頂端，彎月面下凹；結構上半段彎向彼此，頂端貼住
      svg += `<path d="M${p1 + 10} ${base} V${base - 34} Q${cx} ${base - 18} ${p2 - 10} ${base - 34} V${base} Z" fill="${BLUE_L}" stroke="${BLUE}"/>`
        + `<path d="M${p1} ${base} C${p1} ${base - 50}, ${cx - 18} ${base - 70}, ${cx - 15} ${base - H} H${cx} C${cx - 4} ${base - 70}, ${p1 + pwid} ${base - 50}, ${p1 + pwid} ${base} Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
        + `<path d="M${p2} ${base} C${p2} ${base - 50}, ${cx + 18} ${base - 70}, ${cx + 15} ${base - H} H${cx} C${cx + 4} ${base - 70}, ${p2 - pwid} ${base - 50}, ${p2 - pwid} ${base} Z" fill="${TEAL_L}" stroke="${TEAL}"/>`
        + arrow(p1 + 16, base - 28, p1 + 30, base - 28, RED, 1.5) + arrow(p2 - 16, base - 28, p2 - 30, base - 28, RED, 1.5)
        + lead(cx + 8, base - 25, cx + 46, base - 46) + t(cx + 48, base - 48, L('men'), 10, BLUE, 'start', 700);
    } else {
      // 超臨界：整個區域均勻淡色，沒有液面線；結構直立
      svg += `<rect x="${x + 40}" y="${base - H - 16}" width="${pw - 80}" height="${H + 16}" fill="${PLASMA}" fill-opacity=".8"/>`
        + [p1, p2 - pwid].map(px => `<rect x="${px}" y="${base - H}" width="${pwid}" height="${H}" fill="${TEAL_L}" stroke="${TEAL}"/>`).join('');
    }
    svg += para(cx, top + ch - rh - 4, L(i ? 'l2' : 'l1'), pw - 24, 11, i ? TEAL : RED, 'middle', 700).svg;
  });
  return { svg, height: top + ch + 8 };
}

// ch09 現場異常徵兆：取代三大異常分支方框，三欄各畫一個外觀；名稱與對策照搬方框。
// A 俯視鰭片兩兩頂端併攏（間距窄寬交替）；B 俯視的咖啡環狀殘留物；C 剖面銅色導線外包阻障層，靠近交界處的導線側出現一排半圓孔洞。
// 技術審查修正：英文正文沒有「接觸孔邊緣」，畫成導線與阻障層交界；不指明哪一種金屬是陽極；不放數字
function cleanFailures(spec, en, kit) {
  const { L, t, para, lead } = tools(spec, en, kit);
  const cols = [['b1', 'l1'], ['b2', 'l2'], ['b3', 'l3']], bodyH = 172;
  const tree = lawColumns(L, para, 12, 'root', cols, bodyH, (i, x, y, cw) => {
    let out = '';
    if (i === 0) {
      // 俯視：鰭片兩兩頂端併攏
      out += `<rect x="${x + 22}" y="${y + 20}" width="${cw - 44}" height="92" rx="4" fill="#f1f5f9" stroke="${LINE}"/>`;
      // 兩兩併在一起：同一對之間幾乎沒有間隙，對與對之間的間距變寬（窄、寬交替）
      for (let k = 0; k < 4; k++) { const fx = x + 36 + k * 34; out += `<rect x="${fx}" y="${y + 26}" width="9" height="80" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${fx + 10}" y="${y + 26}" width="9" height="80" fill="${TEAL_L}" stroke="${TEAL}"/><rect x="${fx - 2}" y="${y + 23}" width="23" height="86" rx="4" fill="none" stroke="${RED}" stroke-dasharray="3 2"/>`; }
      out += para(x + cw / 2, y + 132, L('paired'), cw - 20, 10, RED, 'middle', 700).svg;
      return out;
    }
    if (i === 1) {
      out += `<rect x="${x + 22}" y="${y + 20}" width="${cw - 44}" height="92" rx="4" fill="#f1f5f9" stroke="${LINE}"/><circle cx="${x + cw / 2}" cy="${y + 66}" r="32" fill="#f8fafc" stroke="#94a3b8" stroke-width="7"/><circle cx="${x + cw / 2}" cy="${y + 66}" r="35.5" fill="none" stroke="${INK_2}" stroke-width=".8"/>`
        + para(x + cw / 2, y + 132, L('ring'), cw - 20, 10, RED, 'middle', 700).svg;
      return out;
    }
    // 剖面：導線外包阻障層，靠近交界處的導線側一排半圓孔洞
    const lx = x + 58, lw2 = 80, ly = y + 34, lh = 62;
    out += `<rect x="${x + 18}" y="${y + 22}" width="${cw - 36}" height="86" fill="${DIEL_C}" stroke="${INK_2}"/><rect x="${lx - 3}" y="${ly}" width="${lw2 + 6}" height="${lh + 3}" fill="${BARRIER}"/><rect x="${lx}" y="${ly}" width="${lw2}" height="${lh}" fill="${COPPER}"/>`
      + [0, 1, 2, 3].map(k => `<path d="M${lx + lw2} ${ly + 12 + k * 13} a5 5 0 0 0 0 10 Z" fill="#ffffff" stroke="${RED}" stroke-width="1"/>`).join('')
      + t(lx + lw2 / 2 - 6, ly + lh / 2 + 4, L('lineL'), 9.5, RED, 'middle', 700) + lead(lx - 3, ly + 50, x + 26, y + 120) + t(x + 22, y + 130, L('barL'), 9.5, BARRIER, 'start', 700)
      + para(x + cw - 20, y + 130, L('mouse'), 110, 9.5, RED, 'end', 700).svg + lead(lx + lw2 - 4, ly + 47, x + cw - 40, y + 118);
    return out;
  });
  return { svg: tree.svg, height: tree.bottom + 8 };
}

// ── H2 批（2.29.0，第 3 階段 ch10–ch11）──
const PASSIV = '#ede9fe', SPACER_C = '#cbd5e1', SILICIDE = '#334155', LOWK = '#f1f5f9';
// 一排導線剖面（由下往上），相鄰兩排之間自動加導通孔：導通孔放在上下兩條導線重疊區的中點，整根落在兩條導線的範圍內；
// 相鄰兩列至少要有一根，否則丟出錯誤（審查發現原本只找下排中心，邊緣剛好對齊時整排都被略過）
// rows：[{ y（頂邊）, h, w, xs }]；every：每幾條上排導線放一根；vw：各層之間導通孔的寬度
const wireStack = (rows, vw, every = 1, fill = COPPER, stroke = RED) => {
  let vias = '', wires = '';
  const viaXs = [];
  rows.forEach((r, i) => {
    wires += r.xs.map(x => `<rect x="${x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`).join('');
    if (!i) return;
    const lo = rows[i - 1], w = vw[i - 1], got = [];
    r.xs.forEach((u, k) => {
      if (k % (every[i - 1] || 1)) return;
      const c = u + r.w / 2;
      const best = lo.xs.map(l => [Math.max(u, l), Math.min(u + r.w, l + lo.w)]).filter(([a, b]) => b - a >= w).map(([a, b]) => (a + b) / 2).sort((a, b) => Math.abs(a - c) - Math.abs(b - c))[0];
      if (best === undefined) return;
      got.push(best);
      vias += `<rect x="${best - w / 2}" y="${r.y + r.h}" width="${w}" height="${lo.y - r.y - r.h}" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`;
    });
    if (!got.length) throw new Error(`wireStack 第 ${i} 與第 ${i + 1} 列之間沒有導通孔`);
    viaXs.push(got);
  });
  return { svg: vias + wires, viaXs };
};

// ch10 接觸窗與導通孔：取代五層方框，五層與兩句註記照搬。平面電晶體上方的絕緣層裡兩根鎢柱落在源汲極（只畫不標），
// 第一層金屬的兩條銅線各自壓在一根接觸窗上；上一層絕緣層裡一根銅導通孔連到上層金屬。右邊加外框的小圖：導通孔底部沒有接到下層金屬，斷路（技術審查修正）
function contactsVias(spec, en, kit) {
  const { L, t, para, lead } = tools(spec, en, kit);
  const X0 = 20, X1 = 300;
  let svg = `<rect x="${X0}" y="76" width="${X1 - X0}" height="152" fill="${DIEL_C}" stroke="${INK_2}" stroke-width=".8"/>`
    + [100, 140, 160].map(y => `<path d="M${X0} ${y} H${X1}" stroke="${MUTED}" stroke-width=".6" stroke-dasharray="3 2"/>`).join('');
  // 矽基板、淺溝槽隔離、源汲極、閘極與側壁間隔物
  svg += `<rect x="${X0}" y="228" width="${X1 - X0}" height="28" fill="${SI}" stroke="${INK_2}"/>`
    + [66, 236].map(x => `<rect x="${x}" y="228" width="18" height="22" fill="${TEAL_XL}" stroke="${TEAL}"/>`).join('')
    + [84, 186].map(x => `<rect x="${x}" y="228" width="50" height="12" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".7"/>`).join('')
    + `<rect x="140" y="226" width="40" height="2" fill="${TEAL_XL}" stroke="${TEAL}" stroke-width=".5"/><rect x="140" y="208" width="40" height="18" fill="${AMBER_L}" stroke="${AMBER}"/>`
    + [134, 180].map(x => `<rect x="${x}" y="210" width="6" height="18" fill="${SPACER_C}" stroke="${INK_2}" stroke-width=".6"/>`).join('');
  // 接觸窗（鎢）、第一層金屬（兩條，各自接一根接觸窗）、導通孔與上層金屬（銅）
  svg += [103, 205].map(x => `<rect x="${x}" y="160" width="12" height="68" fill="${W_PLUG}" stroke="${INK_2}"/>`).join('')
    + [[86, 46], [188, 64]].map(([x, w]) => `<rect x="${x}" y="140" width="${w}" height="20" fill="${COPPER}" stroke="${RED}"/>`).join('')
    + `<rect x="214" y="100" width="12" height="40" fill="${COPPER}" stroke="${RED}"/><rect x="150" y="80" width="140" height="20" fill="${COPPER}" stroke="${RED}"/>`;
  svg += para(26, 186, L('insul'), 72, 10, MUTED, 'start').svg;
  // 右側標籤：由上往下對齊各層
  const LX = 312, NW = 150;
  svg += lead(290, 90, LX - 4, 90) + t(LX, 94, L('upper'), 11, INK, 'start', 700);
  svg += lead(226, 118, LX - 4, 118) + t(LX, 122, L('via'), 11, INK, 'start', 700) + para(LX, 136, L('viaN'), NW, 10, INK_2, 'start').svg;
  svg += lead(252, 150, LX - 4, 150) + t(LX, 154, L('m1'), 11, INK, 'start', 700);
  svg += lead(217, 194, LX - 4, 194) + t(LX, 198, L('contact'), 11, INK, 'start', 700) + para(LX, 212, L('contactN'), NW, 10, INK_2, 'start').svg;
  svg += `<path d="M84 260 v4 H236 v-4" fill="none" stroke="${INK_2}"/>` + t(160, 276, L('tr'), 11, INK, 'middle', 700);
  // 斷路小圖
  const bx = 476, bw = 148;
  const head = para(bx + bw / 2, 92, L('bad'), bw - 16, 11, INK, 'middle', 700);
  const iy = 92 + head.height;
  svg += card(bx, 72, bw, iy + 118 - 72, '#ffffff', LINE) + head.svg
    + `<rect x="${bx + 12}" y="${iy}" width="${bw - 24}" height="84" fill="${DIEL_C}" stroke="${INK_2}" stroke-width=".8"/>`
    + `<rect x="${bx + 24}" y="${iy + 60}" width="${bw - 48}" height="18" fill="${COPPER}" stroke="${RED}"/><rect x="${bx + 34}" y="${iy + 4}" width="${bw - 68}" height="16" fill="${COPPER}" stroke="${RED}"/>`
    + `<rect x="${bx + bw / 2 - 6}" y="${iy + 20}" width="12" height="30" fill="${COPPER}" stroke="${RED}"/>`
    + xmark(bx + bw / 2, iy + 55, 3.5) + t(bx + bw / 2, iy + 104, L('open'), 12, RED, 'middle', 700);
  return { svg: `<g transform="translate(0 -60)">${svg}</g>`, height: Math.ceil(Math.max(282, iy + 126)) - 60 };
}

// ch10 低介電常數材料：兩格導線的尺寸與間距相同。左邊一般絕緣層，相對的側壁感應出較多的正負電荷，中間是電容符號；
// 右邊帶微小孔洞的低介電常數材料，電荷較少、電容符號較小較淡；右下三個小圖是容易受損的三個製程（技術審查修正）
function lowK(spec, en, kit) {
  const { L, t, para, breakAt, arrow, lead } = tools(spec, en, kit);
  const PW = 260, ps = [16, 364];
  const heads = [para(0, 0, L('close'), PW - 16, 11.5, INK, 'middle', 700), para(0, 0, L('lowk'), PW - 16, 11.5, INK, 'middle', 700)];
  const top = 26 + Math.max(...heads.map(h => h.height)) + 4;
  let svg = '';
  ps.forEach((px, i) => {
    const k = i === 1;
    svg += para(px + PW / 2, 26, L(k ? 'lowk' : 'close'), PW - 16, 11.5, k ? TEAL : INK, 'middle', 700).svg;
    svg += `<rect x="${px + 10}" y="${top}" width="${PW - 20}" height="80" fill="${k ? LOWK : '#e2e8f0'}" stroke="${INK_2}" stroke-width=".8"/>`;
    // 孔洞只畫在導線以外的地方
    if (k) [[18, 14], [21, 50], [17, 70], [96, 14], [110, 64], [150, 16], [160, 62], [100, 28], [240, 12], [238, 46], [244, 70], [140, 70], [90, 56], [166, 28]].forEach(([dx, dy]) => { svg += `<circle cx="${px + dx}" cy="${top + dy}" r="${2 + (dx % 3) * 0.4}" fill="#ffffff" stroke="${MUTED}" stroke-width=".7"/>`; });
    svg += [px + 30, px + 186].map(x => `<rect x="${x}" y="${top + 12}" width="44" height="56" fill="${COPPER}" stroke="${RED}"/>`).join('');
    // 相對側壁的感應電荷：左邊四對、右邊兩對
    const ys = k ? [24, 56] : [18, 30, 50, 62];
    svg += ys.map(dy => `<path d="M${px + 78} ${top + dy} h6 M${px + 81} ${top + dy - 3} v6" stroke="${RED}" stroke-width="1.4"/><path d="M${px + 176} ${top + dy} h6" stroke="${BLUE}" stroke-width="1.4"/>`).join('');
    // 電容符號：右邊較小較淡
    const pl = k ? 6 : 11, op = k ? ' opacity=".45"' : '';
    svg += `<g${op}><path d="M${px + 90} ${top + 44} H${px + 126} M${px + 134} ${top + 44} H${px + 170}" stroke="${INK_2}" stroke-width="1.2"/><path d="M${px + 126} ${top + 44 - pl} v${pl * 2} M${px + 134} ${top + 44 - pl} v${pl * 2}" stroke="${INK}" stroke-width="2.2"/></g>`;
    if (!k) svg += t(px + 130, top + 24, L('cap'), 10, RED, 'middle', 700);
  });
  // 左格下方：絕緣層與結果
  svg += lead(36, top + 80, 36, top + 88) + t(26, top + 98, L('insul'), 10.5, INK_2, 'start');
  const slow = para(16 + PW / 2, top + 120, L('slow'), PW - 20, 11, RED, 'middle', 700);
  svg += slow.svg;
  // 兩格之間的箭頭
  const red = breakAt(320, top + 18, L('reduce'), '這', 80, 10.5, TEAL, 'middle', 600);
  svg += red.svg + arrow(282, top + 18 + red.height + 6, 358, top + 18 + red.height + 6, TEAL, 1.6);
  // 右格下方：孔洞、脆弱與三個容易受損的製程
  const rx = 364;
  svg += lead(rx + 108, top + 67, rx + 70, top + 88) + t(rx + 10, top + 98, L('pores'), 10.5, INK_2, 'start');
  svg += t(rx + 10, top + 116, L('weak'), 11, RED, 'start', 700);
  const ty = top + 128, tw = 76, tg = (PW - 3 * tw) / 2;
  const crack = (x, y) => `<path d="M${x} ${y} l3 5 -3 4 4 5" fill="none" stroke="${RED}" stroke-width="1.3"/>`;
  const pores = (x, y, w) => [6, 18, 30, 42, 54].filter(d => d < w - 4).map((d, j) => `<circle cx="${x + d}" cy="${y + 5 + (j % 2) * 5}" r="1.6" fill="#ffffff" stroke="${MUTED}" stroke-width=".5"/>`).join('');
  const tiles = [
    (x, y) => `<rect x="${x + 10}" y="${y + 24}" width="56" height="18" fill="${LOWK}" stroke="${INK_2}" stroke-width=".7"/>` + pores(x + 10, y + 26, 56)
      + [22, 38, 54].map(d => thinArrow(x + d, y + 6, x + d, y + 22, VIOLET, 1.1)).join('') + crack(x + 46, y + 24),
    (x, y) => `<rect x="${x + 6}" y="${y + 10}" width="64" height="9" rx="2" fill="${INK_2}"/><rect x="${x + 10}" y="${y + 21}" width="56" height="18" fill="${LOWK}" stroke="${INK_2}" stroke-width=".7"/>` + pores(x + 10, y + 23, 56)
      + thinArrow(x + 38, y + 2, x + 38, y + 9, TEAL, 1.1) + crack(x + 24, y + 21),
    (x, y) => `<rect x="${x + 10}" y="${y + 30}" width="56" height="12" fill="${LOWK}" stroke="${INK_2}" stroke-width=".7"/>` + pores(x + 10, y + 31, 56)
      + `<rect x="${x + 20}" y="${y + 10}" width="36" height="12" fill="#e2e8f0" stroke="${INK_2}"/>` + [26, 38, 50].map(d => `<circle cx="${x + d}" cy="${y + 26}" r="3" fill="${SOLDER_D}" stroke="${INK_2}" stroke-width=".7"/>`).join('') + crack(x + 34, y + 30)
  ];
  ['etch', 'cmp', 'pkg'].forEach((key, j) => {
    const x = rx + j * (tw + tg);
    svg += card(x, ty, tw, 50, '#ffffff', LINE, 6) + tiles[j](x, ty) + t(x + tw / 2, ty + 64, L(key), 10.5, INK_2);
  });
  svg += t(rx + PW / 2, ty + 82, L('damage'), 11, RED, 'middle', 700);
  return { svg, height: Math.ceil(Math.max(top + 120 + slow.height, ty + 82) + 10) };
}

// ch10 定量物理定律：上半照搬分支圖（根與註記、兩條分支與結論），結論卡加小圖：多孔超低介電質與氣隙、
// 並排兩顆晶片之間的長導線改成上下堆疊的短連線；降低有效介電常數的 30–45% 放在第一條分支。
// 下半是奈米導線電阻率的數據卡：寬導線與細導線中的電子路徑，與 5–10 倍。不放活化能、Blech 與只在 TeX 裡的符號（技術審查修正）
function rcLevers(spec, en, kit) {
  const { L, t, para, breakAt, arrow } = tools(spec, en, kit);
  const rx = 16, rw = 148, bx = 192, bw = 180, lx = 400, lw = 224, rh = 86, gap = 10;
  let svg = '';
  const rows = [0, 1].map(i => 16 + i * (rh + gap));
  const ry = (rows[0] + rows[1] + rh) / 2;
  const rp = para(0, 0, L('root'), rw - 20, 12, INK, 'middle', 800), np = para(0, 0, L('rootN'), rw - 20, 10.5);
  const rH = rp.height + np.height + 22;
  svg += card(rx, ry - rH / 2, rw, rH, TEAL_XL, TEAL, 6) + para(rx + rw / 2, ry - rH / 2 + 10 + 12, L('root'), rw - 20, 12, INK, 'middle', 800).svg
    + para(rx + rw / 2, ry - rH / 2 + 14 + rp.height + 10.5, L('rootN'), rw - 20, 10.5, INK_2).svg;
  rows.forEach((y, i) => {
    const cy = y + rh / 2;
    svg += `<path d="M${rx + rw} ${ry} C ${rx + rw + 16} ${ry}, ${bx - 20} ${cy}, ${bx - 8} ${cy}" fill="none" stroke="${TEAL}" stroke-width="1.3"/>` + arrow(bx - 9, cy, bx - 2, cy, TEAL, 1.3);
    svg += card(bx, y, bw, rh, '#ffffff', LINE, 6) + card(lx, y, lw, rh, LIGHT, LINE, 6) + arrow(bx + bw + 2, cy, lx - 2, cy, TEAL, 1.3);
    const bp = para(0, 0, L(`b${i + 1}`), bw - 20, 11.5, INK, 'middle', 700);
    if (i === 0) {
      svg += para(bx + bw / 2, cy - (bp.height + 26) / 2 + 11.5, L('b1'), bw - 20, 11.5, INK, 'middle', 700).svg + t(bx + bw / 2, cy + (bp.height + 26) / 2 - 2, L('pct'), 20, TEAL, 'middle', 800);
    } else svg += para(bx + bw / 2, midY(cy, bp.height, 11.5), L('b2'), bw - 20, 11.5, INK, 'middle', 700).svg;
    const lp = para(0, 0, L(`l${i + 1}`), lw - 112, 10.5);
    svg += breakAt(lx + 104, midY(cy, lp.height, 10.5), L(`l${i + 1}`), i ? '延遲' : [], lw - 112, 10.5, INK_2, 'start').svg;
  });
  // 結論卡的小圖：三條銅線之間是多孔材料，其中一個間隔是氣隙
  const a = lx + 10, ay = rows[0] + 22;
  svg += `<rect x="${a}" y="${ay}" width="78" height="42" fill="${LOWK}" stroke="${INK_2}" stroke-width=".7"/>`
    + [[a + 8, 6], [a + 18, 30], [a + 60, 10], [a + 66, 34], [a + 40, 4], [a + 12, 18]].map(([x, dy]) => `<circle cx="${x}" cy="${ay + dy}" r="1.8" fill="#ffffff" stroke="${MUTED}" stroke-width=".6"/>`).join('')
    + [a + 22, a + 48].map(x => `<rect x="${x}" y="${ay + 10}" width="10" height="24" fill="${COPPER}" stroke="${RED}" stroke-width=".8"/>`).join('')
    + `<rect x="${a + 35}" y="${ay + 12}" width="10" height="22" rx="4" fill="#ffffff" stroke="${TEAL}" stroke-dasharray="2 1.5"/>`;
  // 並排的兩顆晶片之間是長導線，改成上下堆疊後連線很短
  const by = rows[1] + 20;
  svg += `<rect x="${a}" y="${by + 26}" width="22" height="16" fill="#e2e8f0" stroke="${INK_2}"/><rect x="${a + 30}" y="${by + 26}" width="22" height="16" fill="#e2e8f0" stroke="${INK_2}"/>`
    + `<path d="M${a + 11} ${by + 26} V${by + 18} H${a + 41} V${by + 26}" fill="none" stroke="${RED}" stroke-width="1.6"/>`
    + thinArrow(a + 56, by + 30, a + 62, by + 30, TEAL, 1.1)
    + `<rect x="${a + 64}" y="${by + 10}" width="22" height="14" fill="#e2e8f0" stroke="${INK_2}"/><rect x="${a + 64}" y="${by + 28}" width="22" height="14" fill="#e2e8f0" stroke="${INK_2}"/><path d="M${a + 75} ${by + 24} V${by + 28}" stroke="${RED}" stroke-width="2"/>`;
  // 下半：數據卡
  const dy = rows[1] + rh + 18, dh = 96;
  svg += card(16, dy, 608, dh, AMBER_XL, AMBER, 8) + t(32, dy + 24, L('rho'), 12.5, INK, 'start', 800);
  const band = (yy, h, pts) => `<rect x="40" y="${yy}" width="230" height="${h}" fill="${COPPER}" stroke="${RED}"/><path d="M46 ${yy + h / 2} ${pts.map(([px, py]) => `L${46 + px} ${yy + py}`).join(' ')}" fill="none" stroke="${BLUE}" stroke-width="1.2"/>`;
  svg += band(dy + 36, 30, [[60, 3], [126, 27], [190, 4], [218, 18]]) + band(dy + 74, 12, [[18, 2], [38, 10], [58, 2], [78, 10], [98, 2], [118, 10], [138, 2], [158, 10], [178, 2], [198, 10], [218, 6]]);
  svg += thinArrow(282, dy + 80, 372, dy + 58, RED, 1.4);
  svg += t(470, dy + 60, L('x'), 30, RED, 'middle', 800) + para(470, dy + 82, L('spike'), 260, 11.5, RED, 'middle', 700).svg;
  return { svg, height: dy + dh + 8 };
}

// ch11 MOL：取代四步方框，四步標題與註記照搬，以 A–D 標順序。底圖是 FEOL 圖最後一步的 NMOS 半邊（P 井、淺溝槽隔離、源汲極、閘極、Spacer、矽化物）。
// B 三個孔：兩個落在 Spacer 外側的源汲極矽化物上、一個落在閘極頂，都不碰 Spacer；C 鎢整片覆蓋並填滿三孔；D 表面的鎢磨掉，柱頂與絕緣層齊平（技術審查修正）
function molSteps(spec, en, kit) {
  const { L, t, para, arrow, mark, lead } = tools(spec, en, kit);
  const w = 140, gap = 16, xs = [0, 1, 2, 3].map(i => 16 + i * (w + gap));
  const hp = [0, 1, 2, 3].map(i => {
    const h = para(0, 0, L(`s${i}`), w - 34, 11, INK, 'start', 700), n = spec.labels.some(l => l.key === `n${i}`) ? para(0, 0, L(`n${i}`), w - 16, 10) : { height: 0 };
    return h.height + n.height;
  });
  const hh = Math.max(...hp) + 10, s = 16 + hh + 82;
  const holes = [34, 70, 106];
  let svg = '';
  xs.forEach((x, i) => {
    svg += card(x, 12, w, s + 46 - 12, '#ffffff', LINE) + mark(x + 16, 30, 'ABCD'[i]);
    const h = para(x + 30, 34, L(`s${i}`), w - 34, 11, INK, 'start', 700);
    svg += h.svg;
    if (spec.labels.some(l => l.key === `n${i}`)) svg += para(x + w / 2, 34 + h.height + 2, L(`n${i}`), w - 16, 10, INK_2).svg;
    // 矽、P 井、淺溝槽隔離、源汲極
    svg += `<rect x="${x + 6}" y="${s}" width="128" height="38" fill="${PINK_L}" stroke="${INK_2}"/>`
      + [[18, 32], [90, 32]].map(([d, sw]) => `<rect x="${x + d}" y="${s}" width="${sw}" height="10" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".7"/>`).join('')
      + [50, 84].map(d => `<rect x="${x + d}" y="${s}" width="6" height="4" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".6"/>`).join('')
      + [6, 122].map(d => `<rect x="${x + d}" y="${s}" width="12" height="22" fill="${TEAL_XL}" stroke="${TEAL}"/>`).join('');
    // 絕緣層（A 起）先畫，閘極與 Spacer 嵌在裡面
    svg += `<rect x="${x + 6}" y="${s - 48}" width="128" height="48" fill="${DIEL_C}" stroke="${INK_2}" stroke-width=".8"/>`;
    svg += `<rect x="${x + 56}" y="${s - 2}" width="28" height="2" fill="${TEAL_XL}" stroke="${TEAL}" stroke-width=".5"/><rect x="${x + 56}" y="${s - 18}" width="28" height="16" fill="${AMBER_L}" stroke="${AMBER}"/>`
      + [50, 84].map(d => `<rect x="${x + d}" y="${s - 18}" width="6" height="18" fill="${SPACER_C}" stroke="${INK_2}" stroke-width=".6"/>`).join('')
      + [[18, 32], [90, 32]].map(([d, sw]) => `<rect x="${x + d}" y="${s - 2}" width="${sw}" height="2" fill="${SILICIDE}"/>`).join('') + `<rect x="${x + 56}" y="${s - 20}" width="28" height="2" fill="${SILICIDE}"/>`;
    // 孔：源汲極的孔到矽化物頂、閘極的孔到閘極頂的矽化物
    if (i >= 1) svg += holes.map(d => `<rect x="${x + d - 4}" y="${s - 48}" width="8" height="${d === 70 ? 28 : 46}" fill="${i === 1 ? '#ffffff' : W_PLUG}" stroke="${INK_2}" stroke-width=".6"/>`).join('');
    if (i === 2) svg += `<rect x="${x + 6}" y="${s - 56}" width="128" height="8" fill="${W_PLUG}" stroke="${INK_2}" stroke-width=".6"/>`;
    if (i === 1) svg += [['src', 34], ['gate', 70], ['drn', 106]].map(([k, d]) => t(x + d, s - 54, L(k), 9.5, INK_2)).join('');
    if (i === 3) svg += holes.map(d => lead(x + 70, s - 62, x + d, s - 49)).join('') + t(x + 70, s - 66, L('socket'), 11, TEAL, 'middle', 700);
    if (i < 3) svg += arrow(x + w + 2, s - 20, x + w + gap - 2, s - 20, TEAL, 1.5);
  });
  // 圖例
  const ky = s + 62;
  svg += `<rect x="20" y="${ky - 10}" width="12" height="12" fill="${DIEL_C}" stroke="${INK_2}"/>` + t(36, ky, L('insul'), 10.5, INK_2, 'start')
    + `<rect x="${44 + textW(L('insul'), 10.5)}" y="${ky - 10}" width="12" height="12" fill="${W_PLUG}" stroke="${INK_2}"/>` + t(60 + textW(L('insul'), 10.5), ky, L('w'), 10.5, INK_2, 'start');
  return { svg, height: ky + 10 };
}

// ch11 BEOL：取代四步方框，四步與兩句註記照搬，以 A–D 標順序。左邊剖面是越往上越粗的多層銅導線與導通孔，最上面是另一種金屬的焊墊（不標材料），
// 保護層蓋住焊墊邊緣、只在中央開口；D 的箭頭指向測試探針的小圖，封裝打線的小圖另放下方、不接箭頭，兩張小圖都標「之後」（技術審查修正）
function beolSteps(spec, en, kit) {
  const { L, t, para, arrow, mark, lead } = tools(spec, en, kit);
  const X0 = 16, X1 = 236, o = 20;
  // 剖面整個往下移 o，上方留給 C 的標籤
  let cs = `<rect x="${X0}" y="92" width="${X1 - X0}" height="128" fill="${DIEL_C}" stroke="${INK_2}" stroke-width=".8"/>`;
  const row = (y, h, w, xs) => ({ y, h, w, xs });
  const k = (n, a0, p) => Array.from({ length: n }, (_, i) => a0 + i * p);
  cs += wireStack([row(212, 6, 8, k(13, 22, 16)), row(196, 6, 8, k(13, 22, 16)), row(174, 10, 16, k(7, 18, 32)), row(152, 10, 16, k(7, 18, 32)), row(124, 16, 40, [30, 102, 170]), row(100, 20, 120, [60])], [3, 5, 6, 12, 18], [2, 1, 2, 1, 1]).svg;
  // 元件層：鎢接觸窗落在矽上，閘極在兩根接觸窗之間
  cs += `<rect x="${X0}" y="234" width="${X1 - X0}" height="18" fill="${SI}" stroke="${INK_2}"/>` + `<rect x="${X0}" y="220" width="${X1 - X0}" height="14" fill="${DIEL_C}" stroke="${INK_2}" stroke-width=".8"/>`
    + k(13, 26, 16).map(c => `<rect x="${c - 1.5}" y="218" width="3" height="16" fill="${W_PLUG}" stroke="${INK_2}" stroke-width=".4"/>`).join('')
    + k(6, 34, 32).map(c => `<rect x="${c - 4}" y="228" width="8" height="6" fill="${AMBER_L}" stroke="${AMBER}" stroke-width=".7"/>`).join('');
  // 焊墊、與頂層導線相連的導通孔、保護層（蓋住焊墊邊緣，只在中央開口）
  cs += `<rect x="112" y="92" width="16" height="8" fill="${COPPER}" stroke="${RED}" stroke-width=".8"/>`
    + `<rect x="${X0}" y="68" width="${X1 - X0}" height="24" fill="${PASSIV}" stroke="${VIOLET}"/><rect x="70" y="80" width="100" height="12" fill="${AL}" stroke="${INK_2}"/>`
    + `<rect x="94" y="67" width="52" height="13" fill="#ffffff"/><path d="M94 67 V80 H146 V67" fill="none" stroke="${VIOLET}"/>`;
  let svg = `<g transform="translate(0 ${o})">${cs}</g>`;
  // C：放在剖面上方，引線指到開口
  const ch = para(38, 30, L('s2'), 164, 11, INK, 'start', 700), cn = para(38, 30 + ch.height + 1, L('n2'), 164, 10, INK_2, 'start');
  svg += mark(24, 26, 'C') + ch.svg + cn.svg + lead(110, 30 + ch.height + cn.height - 4, 120, 70 + o);
  // 右邊的步驟標籤
  const LX = 262, NW = 154;
  const item = (letter, key, note, y, from) => {
    const h = para(LX + 14, y, L(key), NW - 14, 11, INK, 'start', 700);
    let out = mark(LX, y - 4, letter) + h.svg;
    if (note) out += para(LX + 14, y + h.height + 1, L(note), NW - 14, 10, INK_2, 'start').svg;
    return out + (from ? lead(...from, LX - 11, y - 4) : '');
  };
  svg += item('B', 's1', null, 104, [228, 76 + o]);
  svg += lead(170, 88 + o, LX - 4, 136) + t(LX, 140, L('pad'), 11, INK, 'start', 700);
  svg += item('A', 's0', 'n0', 176, [228, 158 + o]);
  // D：晶圓離開晶圓廠，箭頭指向測試探針
  svg += mark(LX, 26, 'D') + t(LX + 14, 30, L('s3'), 11, INK, 'start', 700) + `<path d="M222 ${66 + o} V44 H${LX - 14}" fill="none" stroke="${TEAL}" stroke-width="1.6"/>` + arrow(LX - 14, 44, 438, 44, TEAL, 1.6);
  // 小圖：兩張都是之後才發生的事；探針小圖接在 D 的箭頭後面，打線小圖另放下方、不接箭頭
  const ix = 440, iw = 184;
  const later = (x, y) => `<rect x="${x}" y="${y}" width="${textW(L('later'), 10) + 14}" height="16" rx="8" fill="${AMBER_XL}" stroke="${AMBER}"/>` + t(x + 7, y + 12, L('later'), 10, AMBER, 'start', 700);
  const padArt = (x, y) => `<rect x="${x}" y="${y}" width="${iw - 40}" height="16" fill="${DIEL_C}" stroke="${INK_2}" stroke-width=".7"/><rect x="${x + 30}" y="${y - 8}" width="${iw - 100}" height="8" fill="${AL}" stroke="${INK_2}"/>`
    + `<path d="M${x} ${y - 12} H${x + 42} V${y - 4} H${x + 30} V${y}" fill="${PASSIV}" stroke="${VIOLET}"/><path d="M${x + iw - 40} ${y - 12} H${x + iw - 82} V${y - 4} H${x + iw - 70} V${y}" fill="${PASSIV}" stroke="${VIOLET}"/>`;
  const p1 = 16, p1h = 116;
  const n3 = para(ix + 12, p1 + 58, L('n3'), iw - 24, 10, INK_2, 'start');
  svg += card(ix, p1, iw, p1h, '#ffffff', LINE) + later(ix + 10, p1 + 10) + t(ix + 12, p1 + 44, L('probe'), 11.5, INK, 'start', 700) + n3.svg
    + padArt(ix + 20, p1 + p1h - 22)
    + `<path d="M${ix + iw - 12} ${p1 + 34} L${ix + 96} ${p1 + p1h - 30}" stroke="${INK_2}" stroke-width="2"/><rect x="${ix + iw - 30}" y="${p1 + 24}" width="22" height="12" fill="#e2e8f0" stroke="${INK_2}"/>`;
  const p2 = p1 + p1h + 16, p2h = 104;
  svg += card(ix, p2, iw, p2h, '#ffffff', LINE) + later(ix + 10, p2 + 10) + t(ix + 12, p2 + 44, L('bond'), 11.5, INK, 'start', 700)
    + padArt(ix + 20, p2 + p2h - 14)
    + `<ellipse cx="${ix + 92}" cy="${p2 + p2h - 26}" rx="9" ry="5" fill="#fde68a" stroke="${AMBER}"/><path d="M${ix + 92} ${p2 + p2h - 30} C ${ix + 96} ${p2 + 30}, ${ix + 150} ${p2 + 30}, ${ix + 172} ${p2 + 56}" fill="none" stroke="${AMBER}" stroke-width="1.8"/>`;
  return { svg, height: Math.max(252 + o + 6, p2 + p2h + 8) };
}

// ch11 光罩層數：上半是晶圓廠的俯視示意，一輪「沉積、微影、蝕刻、清洗、量測」，量測後回到沉積再做下一層；所有回圈都經過微影區入口，
// 匯成一條粗線「重複進入」。右邊放大瓶頸機台的入口：剛投片與快完成的兩隊晶圓盒搶同一批機台，在機台前大量堆積。
// 下半照搬比較方框：兩個光罩層數不同的產品各畫成一條由等長小格組成的長條（格數不標），每格是一層光罩；兩條各有一格放大，大小相同。不放數字（技術審查修正）
function maskCount(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  let svg = '';
  const boxes = [['dep', 24, 52], ['litho', 104, 96], ['etch', 214, 52], ['clean', 278, 52], ['meas', 342, 52]];
  const by = 56, bh = 42;
  boxes.forEach(([key, x, w]) => {
    const hot = key === 'litho';
    svg += `<rect x="${x}" y="${by}" width="${w}" height="${bh}" rx="5" fill="${hot ? AMBER_XL : '#ffffff'}" stroke="${hot ? AMBER : INK_2}" stroke-width="${hot ? 2.6 : 1}"/>`
      + t(x + w / 2, hot ? by + 18 : by + 25, L(key), 11, INK, 'middle', 700) + (hot ? t(x + w / 2, by + 33, L('neck'), 9.5, AMBER, 'middle', 700) : '');
  });
  // 每一層光罩都繞一圈；四條回圈只是代表「很多次」，不代表次數
  [0, 1, 2, 3].forEach(i => {
    svg += `<path d="M${352 + i * 9} ${by + bh} V${by + bh + 10 + i * 8} H${50 - i * 6} V${by + bh}" fill="none" stroke="${TEAL}" stroke-opacity="${0.5 + i * 0.15}" stroke-width="1.2"/>` + thinArrow(50 - i * 6, by + bh + 6, 50 - i * 6, by + bh + 1, TEAL, 1.2);
  });
  svg += `<path d="M76 ${by + 21} H90" stroke="${AMBER}" stroke-width="5"/><path d="M89 ${by + 13} L103 ${by + 21} L89 ${by + 29} Z" fill="${AMBER}"/>` + t(89, by - 8, L('re'), 10.5, AMBER, 'middle', 700);
  [[200, 214], [266, 278], [330, 342]].forEach(([a, b]) => { svg += arrow(a, by + 21, b, by + 21, TEAL, 1.3); });
  svg += para(208, by + bh + 52, L('back'), 360, 10.5, TEAL, 'middle', 600).svg;
  // 右：瓶頸機台的入口
  const cx = 416, cw = 208, cy = 16, ch = 186;
  svg += card(cx, cy, cw, ch, '#ffffff', AMBER) + t(cx + cw / 2, cy + 20, L('neck'), 11.5, AMBER, 'middle', 800);
  const foup = (x, y, c, s) => `<rect x="${x}" y="${y}" width="16" height="11" rx="2" fill="${c}" stroke="${s}" stroke-width=".8"/><path d="M${x + 5} ${y} v-2 h6 v2" fill="none" stroke="${s}" stroke-width=".8"/>`;
  const pile = (y0, c, s, cols) => cols.map((n, i) => Array.from({ length: n }, (_, j) => foup(cx + 14 + i * 20, y0 - j * 14, c, s)).join('')).join('');
  const tx = cx + cw - 68;
  svg += `<rect x="${tx}" y="${cy + 70}" width="60" height="56" rx="5" fill="${AMBER_XL}" stroke="${AMBER}" stroke-width="2.6"/>` + t(tx + 30, cy + 102, L('litho'), 9.5, INK, 'middle', 700);
  svg += t(cx + 14, cy + 42, L('newW'), 10.5, BLUE, 'start', 700) + pile(cy + 80, BLUE_L, BLUE, [3, 2, 3, 2, 1]);
  svg += pile(cy + 146, AMBER_L, AMBER, [2, 3, 2, 3, 1]) + t(cx + 14, cy + 174, L('oldW'), 10.5, AMBER, 'start', 700);
  svg += `<path d="M${cx + 116} ${cy + 86} C ${tx - 16} ${cy + 86}, ${tx - 16} ${cy + 94}, ${tx - 4} ${cy + 94}" fill="none" stroke="${BLUE}" stroke-width="1.4"/><path d="M${cx + 116} ${cy + 140} C ${tx - 16} ${cy + 140}, ${tx - 16} ${cy + 102}, ${tx - 4} ${cy + 102}" fill="none" stroke="${AMBER}" stroke-width="1.4"/>`
    + thinArrow(tx - 8, cy + 94, tx - 1, cy + 94, BLUE, 1.4) + thinArrow(tx - 8, cy + 102, tx - 1, cy + 102, AMBER, 1.4);
  svg += para(cx + cw - 8, cy + 142, L('fight'), 84, 10, RED, 'end', 700).svg;
  svg += t(cx + 64, cy + 106, L('pile'), 10, RED, 'middle', 700);
  // 下半：兩個光罩層數不同的產品
  const ly = cy + ch + 26;
  svg += t(16, ly, L('two'), 12, INK, 'start', 800);
  const cell = 20, bars = [[6, '#e2e8f0', MUTED], [10, TEAL_L, TEAL]];
  bars.forEach(([n, c, s], i) => {
    const y = ly + 14 + i * 26;
    svg += Array.from({ length: n }, (_, j) => `<rect x="${24 + j * cell}" y="${y}" width="${cell}" height="16" fill="${c}" stroke="${s}" stroke-width=".8"/>`).join('')
      + `<path d="M${24 + n * cell} ${y - 3} v22" stroke="${INK_2}" stroke-dasharray="2 2"/>`;
  });
  // 左欄：只看總天數；右欄：每層光罩幾天（兩條各取一格放大，大小相同）
  const c1 = ly + 92, c2x = 330;
  const col = (x, y, title, items, mk) => {
    let out = t(x, y, L(title), 11.5, INK, 'start', 700), yy = y + 18;
    items.forEach((key, j) => {
      const p = para(x + 16, yy, L(key), 270, 10.5, INK_2, 'start');
      out += (mk[j] ? mk[j](x + 6, yy - 4) : `<circle cx="${x + 6}" cy="${yy - 4}" r="2.5" fill="${MUTED}"/>`) + p.svg;
      yy += p.height + 4;
    });
    return { svg: out, bottom: yy };
  };
  const left = col(16, c1, 't1', ['i1a', 'i1b'], [null, (x, y) => xmark(x, y, 3.5)]);
  // 放大：兩條各取最後一格，放大成同樣大小、上下對齊，左右兩條虛線標出寬度相同
  const zx = 344, zw = 40, zh = 32, za = ly + 4, zb = ly + 42;
  bars.forEach(([n, c, st], i) => {
    const y = ly + 14 + i * 26, x2 = 24 + n * cell, zy = i ? zb : za;
    svg += `<rect x="${x2 - cell}" y="${y}" width="${cell}" height="16" fill="none" stroke="${st}" stroke-width="2"/>`
      + `<path d="M${x2} ${y} L${zx} ${zy} M${x2} ${y + 16} L${zx} ${zy + zh}" fill="none" stroke="${st}" stroke-dasharray="3 2"/>`
      + `<rect x="${zx}" y="${zy}" width="${zw}" height="${zh}" fill="${c}" stroke="${st}" stroke-width="1.4"/>`;
  });
  svg += `<path d="M${zx} ${za - 3} V${zb + zh + 3} M${zx + zw} ${za - 3} V${zb + zh + 3}" stroke="${INK_2}" stroke-dasharray="1.5 2"/>`;
  const right = col(c2x, c1, 't2', ['i2a', 'i2b', 'i2c'], [null, null, (x, y) => tick(x + 1, y, 0.8)]);
  svg += left.svg + right.svg;
  return { svg, height: Math.ceil(Math.max(left.bottom, right.bottom) + 2) };
}

// ch11 跨層熱預算：取代四步流程，段名照搬。線性 °C 縱軸只在軸頂標「°C」；四根浮動區間條：FEOL 600–1050°C、MOL 400–550°C，
// BEOL 頂邊是 400°C 的實線、往下淡出，背面頂邊是 350–400°C 的漸層、往下淡出；400°C 的淡水平線貫穿 MOL 底與 BEOL 頂，
// 虛線階梯連接四段的上限。溫區名稱放在段名下方。不放產品名稱（技術審查修正）
function tierThermal(spec, en, kit) {
  const { L, t, para } = tools(spec, en, kit);
  const AX = 58, Y = v => 262 - (v - 200) / 900 * 222, cw = 128, cs = [0, 1, 2, 3].map(i => 84 + i * 138), bw = 64;
  let svg = `<defs><linearGradient id="tt-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${TEAL}" stop-opacity=".75"/><stop offset="1" stop-color="${TEAL}" stop-opacity="0"/></linearGradient>`
    + `<linearGradient id="tt-fade2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${BLUE}" stop-opacity=".15"/><stop offset=".25" stop-color="${BLUE}" stop-opacity=".7"/><stop offset="1" stop-color="${BLUE}" stop-opacity="0"/></linearGradient></defs>`;
  svg += `<path d="M${AX} ${Y(200)} V${Y(1100)}" stroke="${INK_2}" stroke-width="1.2"/><path d="M${AX - 4} ${Y(1100) + 6} L${AX} ${Y(1100)} L${AX + 4} ${Y(1100) + 6}" fill="none" stroke="${INK_2}" stroke-width="1.2"/>`
    + t(AX - 8, Y(1100) + 10, L('deg'), 11, INK_2, 'end', 700) + `<path d="M${AX} ${Y(200)} H624" stroke="${INK_2}"/>`;
  svg += `<path d="M${AX} ${Y(400)} H624" stroke="${MUTED}" stroke-opacity=".5"/>`;
  const cx = i => cs[i] + cw / 2;
  // 四根區間條
  svg += `<rect x="${cx(0) - bw / 2}" y="${Y(1050)}" width="${bw}" height="${Y(600) - Y(1050)}" rx="3" fill="${HOT}" fill-opacity=".8" stroke="${RED}"/>`
    + `<rect x="${cx(1) - bw / 2}" y="${Y(550)}" width="${bw}" height="${Y(400) - Y(550)}" rx="3" fill="${AMBER_L}" stroke="${AMBER}"/>`
    + `<rect x="${cx(2) - bw / 2}" y="${Y(400)}" width="${bw}" height="${Y(200) - Y(400)}" fill="url(#tt-fade)"/><path d="M${cx(2) - bw / 2} ${Y(400)} h${bw}" stroke="${TEAL}" stroke-width="2.4"/>`
    + `<rect x="${cx(3) - bw / 2}" y="${Y(400)}" width="${bw}" height="${Y(200) - Y(400)}" fill="url(#tt-fade2)"/>`;
  // 虛線階梯：連接四段的上限
  const gx = i => (cx(i) + bw / 2 + cx(i + 1) - bw / 2) / 2;
  svg += `<path d="M${cx(0) + bw / 2} ${Y(1050)} H${gx(0)} V${Y(550)} H${cx(1) - bw / 2} M${cx(1) + bw / 2} ${Y(550)} H${gx(1)} V${Y(400)} H${cx(2) - bw / 2} M${cx(2) + bw / 2} ${Y(400)} H${cx(3) - bw / 2}" fill="none" stroke="${INK_2}" stroke-dasharray="4 3"/>`;
  // 數值與理由：FEOL 放在條的上下，其他段放在條的上方
  svg += t(cx(0), Y(1050) - 8, L('v0'), 12, RED, 'middle', 800) + para(cx(0), Y(600) + 16, L('r0'), cw - 8, 10.5, INK_2).svg;
  const above = (i, vKey, rKey) => {
    const top = i === 1 ? Y(550) : Y(400);
    const r = rKey ? para(0, 0, L(rKey), cw - 8, 10.5) : { height: 0 };
    let out = t(cx(i), top - 8, L(vKey), 12, i === 1 ? AMBER : i === 2 ? TEAL : BLUE, 'middle', 800);
    if (rKey) out += para(cx(i), top - 26 - r.height + 10.5, L(rKey), cw - 8, 10.5, INK_2).svg;
    return out;
  };
  svg += above(1, 'v1', 'r1') + above(2, 'v2', 'r2') + above(3, 'v3', null);
  // 段名與溫區名稱
  let bottom = 0;
  [0, 1, 2, 3].forEach(i => {
    const n = para(cx(i), Y(200) + 18, L(`s${i}`), cw - 6, 11, INK, 'middle', 700);
    const z = para(cx(i), Y(200) + 18 + n.height + 2, L(`z${i}`), cw - 6, 10.5, [RED, AMBER, TEAL, BLUE][i], 'middle', 600);
    svg += n.svg + z.svg;
    bottom = Math.max(bottom, Y(200) + 18 + n.height + 2 + z.height);
  });
  return { svg, height: Math.ceil(bottom + 4) };
}

// ── I1 批（2.30.0，第 3 階段 ch12–ch13）──
// 高斯分佈的鐘形：中心 c、半寬 w、高 h，底在 base
// 斜線鋪滿整個方框：45 度斜線依方框裁切，高而窄的方框左上半也有線（I1 審查修正；共用的 hatched 只從底邊起畫）
const hatchFill = (x, y, w, h, fill, stroke) => {
  let d = '';
  for (let k = -h + 3; k < w; k += 7) {
    const t0 = Math.max(0, -k), t1 = Math.min(h, w - k);
    if (t1 > t0) d += `M${(x + k + t0).toFixed(1)} ${(y + h - t0).toFixed(1)} L${(x + k + t1).toFixed(1)} ${(y + h - t1).toFixed(1)} `;
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}"/><path d="${d.trim()}" stroke="${stroke}" stroke-width=".8"/>`;
};
const bell = (c, w, h, base) => `M${c - w} ${base} C ${c - w / 2} ${base}, ${c - w / 3} ${base - h}, ${c} ${base - h} S ${c + w / 2} ${base}, ${c + w} ${base}`;

// ch12 換材料：取代兩欄方框圖，舊圖文字改用正文原句。左格應變矽：通則「讓電子和電洞跑得更快」放在上方，
// 不貼在 PMOS 例子旁（矽鍺擠壓主要加快電洞）；例子是 PMOS 源汲極挖凹長入矽鍺、水平箭頭擠向通道，放大框接到閘極下方的通道矽。
// 右格 HKMG：多晶矽閘極在薄絕緣層上、幾顆電子穿過；金屬閘極在較厚的高介電常數絕緣層上，只剩一顆（技術審查修正）
function strainHkmg(spec, en, kit) {
  const { L, t, para, arrow, lead } = tools(spec, en, kit);
  const lx = 16, lw = 300, rx = 324, rw = 300;
  let svg = '';
  // 左格
  const s1 = para(lx + 16, 54, L('stretch'), lw - 32, 10.5, INK_2, 'start');
  const s2 = para(lx + 16, 56 + s1.height, L('faster'), lw - 32, 11, TEAL, 'start', 700);
  let y = 56 + s1.height + s2.height + 10;
  const eg = t(lx + 16, y, en ? `${L('eg')}: ${L('pmos')}` : `${L('eg')}：${L('pmos')}`, 11, INK, 'start', 700);
  const sd = para(lx + 36, y + 17, L('sdSige'), lw - 52, 10.5, INK_2, 'start');
  svg += t(lx + 16, 34, L('strained'), 13, INK, 'start', 800) + s1.svg + s2.svg + `<path d="M${lx + 16} ${y - 15} H${lx + lw - 16}" stroke="${LINE}"/>` + eg
    + `<rect x="${lx + 16}" y="${y + 7}" width="12" height="12" fill="${AMBER_L}" stroke="${AMBER}"/>` + sd.svg;
  const sy = y + 17 + sd.height + 40;
  // PMOS 剖面：矽、閘極絕緣層、閘極、側壁；源汲極挖凹後長入矽鍺，內側尖端指向通道
  svg += `<rect x="32" y="${sy}" width="180" height="58" fill="${SI_CH}" stroke="${INK_2}"/>`
    + `<path d="M40 ${sy} H92 L100 ${sy + 12} L92 ${sy + 26} H40 Z M204 ${sy} H152 L144 ${sy + 12} L152 ${sy + 26} H204 Z" fill="${AMBER_L}" stroke="${AMBER}"/>`
    + `<rect x="100" y="${sy - 2}" width="44" height="2" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".6"/>`
    + `<rect x="100" y="${sy - 30}" width="44" height="28" fill="${BLUE_L}" stroke="${BLUE}"/>` + t(122, sy - 12, L('gate'), 10.5, BLUE, 'middle', 700)
    + [92, 144].map(x => `<rect x="${x}" y="${sy - 30}" width="8" height="30" fill="#cbd5e1" stroke="${INK_2}" stroke-width=".7"/>`).join('')
    + arrow(98, sy + 14, 112, sy + 14, RED, 1.6) + arrow(146, sy + 14, 132, sy + 14, RED, 1.6)
    + t(122, sy + 46, L('squeeze'), 11, RED, 'middle', 700);
  // 放大框：從閘極下方的通道拉到右邊，上面是原本的晶格，下面是被左右擠壓、水平間距變小的晶格
  const zx = 228, zw = 74, zt = sy - 36, zb = sy + 62;
  svg += `<rect x="108" y="${sy + 1}" width="28" height="8" fill="none" stroke="${INK}" stroke-dasharray="2 1.5"/>`
    + `<path d="M136 ${sy + 1} L${zx} ${zt} M136 ${sy + 9} L${zx} ${zb}" stroke="${MUTED}" stroke-dasharray="3 2"/>`
    + card(zx, zt, zw, zb - zt, '#ffffff', INK_2, 4);
  const grid = (cx, top, dx) => {
    let o = '';
    for (let r = 0; r < 3; r++) o += `<path d="M${cx - 2 * dx} ${top + r * 9} H${cx + 2 * dx}" stroke="${LINE}"/>`;
    for (let c = -2; c <= 2; c++) o += `<path d="M${cx + c * dx} ${top} V${top + 18}" stroke="${LINE}"/>` + [0, 1, 2].map(r => `<circle cx="${cx + c * dx}" cy="${top + r * 9}" r="2.2" fill="${INK_2}"/>`).join('');
    return o;
  };
  const zc = zx + zw / 2;
  svg += grid(zc, zt + 12, 12) + thinArrow(zc, zt + 36, zc, zt + 48, RED, 1.3) + grid(zc, zt + 54, 8)
    + thinArrow(zx + 6, zt + 63, zx + 14, zt + 63, RED, 1.2) + thinArrow(zx + zw - 6, zt + 63, zx + zw - 14, zt + 63, RED, 1.2)
    + t(zc, zb - 8, L('lattice'), 10.5, INK_2, 'middle', 700);
  const leftBottom = zb + 12;
  // 右格
  const h1 = para(rx + 16, 54, L('highkUse'), rw - 32, 10.5, INK_2, 'start');
  const HK = '#5eead4';
  const gy = 58 + h1.height + 14;
  const ax = rx + 66, bx = rx + 234, sw = 70, base = gy + 44;
  svg += t(rx + 16, 34, L('hkmg'), 13, INK, 'start', 800) + h1.svg;
  // 兩個閘極堆疊，矽的上緣對齊
  svg += `<rect x="${ax - sw / 2}" y="${base}" width="${sw}" height="24" fill="${SI_CH}" stroke="${INK_2}"/><rect x="${bx - sw / 2}" y="${base}" width="${sw}" height="24" fill="${SI_CH}" stroke="${INK_2}"/>`
    + `<rect x="${ax - sw / 2}" y="${base - 3}" width="${sw}" height="3" fill="${TEAL_L}" stroke="${TEAL}" stroke-width=".6"/>`
    + `<rect x="${ax - sw / 2}" y="${base - 37}" width="${sw}" height="34" fill="#e2e8f0" stroke="${INK_2}"/>` + t(ax, base - 16, L('poly'), 10, INK, 'middle', 700)
    + `<rect x="${bx - sw / 2}" y="${base - 10}" width="${sw}" height="10" fill="${HK}" stroke="${TEAL}" stroke-width=".8"/>`
    + `<rect x="${bx - sw / 2}" y="${base - 44}" width="${sw}" height="34" fill="${METAL_GATE}" stroke="${INK}"/>` + t(bx, base - 23, L('metal'), 10.5, '#ffffff', 'middle', 700)
    + arrow(ax + sw / 2 + 6, gy + 14, bx - sw / 2 - 6, gy + 14, TEAL, 1.6);
  // 電子：左邊幾顆穿過薄絕緣層，右邊只剩一顆
  svg += [-20, 0, 20].map(dx => thinArrow(ax + dx, base + 18, ax + dx, base - 6, BLUE, 1) + `<circle cx="${ax + dx}" cy="${base - 10}" r="3" fill="${BLUE}"/>`).join('')
    + thinArrow(bx + 20, base + 18, bx + 20, base + 2, BLUE, 1) + `<circle cx="${bx + 20}" cy="${base - 5}" r="3" fill="${BLUE}"/>`
    + t(ax + sw / 2 + 8, base + 16, L('leak'), 10.5, RED, 'start', 700);
  // 兩種絕緣層各自標名，色塊對應
  const chip = (cx, key, fill) => { const w = textW(L(key), 10.5); return `<rect x="${cx - w / 2 - 9}" y="${base + 34}" width="7" height="7" fill="${fill}" stroke="${TEAL}"/>` + t(cx + 5, base + 41, L(key), 10.5, TEAL, 'middle', 700); };
  svg += chip(ax, 'insul', TEAL_L) + chip(bx, 'highk', HK);
  const both = para(rx + rw / 2, base + 64, en ? `${L('thicker')}, ${L('same')}` : `${L('thicker')}，${L('same')}`, rw - 32, 11, INK, 'middle', 700);
  const mv = para(rx + rw / 2, base + 70 + both.height + 18, L('moved'), rw - 40, 10.5, INK, 'middle', 700);
  svg += both.svg + t(rx + rw / 2, base + 66 + both.height, L('less'), 12, TEAL, 'middle', 800) + mv.svg;
  const rightBottom = base + 70 + both.height + 18 + mv.height;
  const H = Math.max(leftBottom, rightBottom);
  return { svg: card(lx, 12, lw, H - 12, '#ffffff', LINE) + card(rx, 12, rw, H - 12, '#ffffff', LINE) + svg, height: H + 8 };
}

// ch12 結構演進一覽：Know-how「先做一個假的，再換成真的」的三組「之前 → 之後」。犧牲材料一律用斜線，與上方圖例一致：
// 假閘極換成金屬閘極（高介電常數層呈 U 形）；矽鍺與矽交疊、挖掉矽鍺後矽片懸空；多重曝光的輔助圖形兩側長出間隔物，移除後只留下兩倍密度的線
function sacrificial(spec, en, kit) {
  const { L, t, para, breakAt, arrow, lead } = tools(spec, en, kit);
  const w = 192, xs = [16, 224, 432], keys = ['dummy', 'sige', 'helper'];
  let svg = hatchFill(16, 14, 14, 14, '#f1f5f9', INK_2) + t(38, 26, L('heavy'), 12.5, INK, 'start', 700);
  const title = (x, y, k) => breakAt(x, y, L(k), k === 'helper' ? '之後' : [], w - 24, 11, INK, 'start', 700);
  const titleH = Math.max(...keys.map(k => title(0, 0, k).height));
  const top = 40, d = top + 22 + titleH, ch = 22 + titleH + 64 + 26;
  const sub = (x, y) => `<rect x="${x}" y="${y}" width="72" height="14" fill="${SI}" stroke="${INK_2}"/>`;
  const minis = [
    // 假閘極 → 金屬閘極：兩側是側壁與絕緣層
    (x, after) => sub(x, d + 40) + `<rect x="${x}" y="${d + 12}" width="20" height="28" fill="${LIGHT}" stroke="${LINE}"/><rect x="${x + 52}" y="${d + 12}" width="20" height="28" fill="${LIGHT}" stroke="${LINE}"/>`
      + `<rect x="${x + 20}" y="${d + 12}" width="6" height="28" fill="#cbd5e1" stroke="${INK_2}" stroke-width=".7"/><rect x="${x + 46}" y="${d + 12}" width="6" height="28" fill="#cbd5e1" stroke="${INK_2}" stroke-width=".7"/>`
      + (after ? `<rect x="${x + 26}" y="${d + 12}" width="20" height="28" fill="${METAL_GATE}"/><path d="M${x + 27.5} ${d + 12} V${d + 38.5} H${x + 44.5} V${d + 12}" fill="none" stroke="${TEAL_L}" stroke-width="2.4"/>` : hatchFill(x + 26, d + 12, 20, 28, '#f1f5f9', INK_2)),
    // 矽鍺與矽交疊 → 挖掉矽鍺，矽片懸空（兩端錨在紙面外）
    (x, after) => sub(x, d + 40) + Array.from({ length: 6 }, (_, i) => {
      const yy = d + 40 - (i + 1) * 7;
      if (i % 2) return `<rect x="${x + 16}" y="${yy}" width="40" height="7" fill="${SI_CH}" stroke="${INK_2}" stroke-width=".8"/>`;
      return after ? '' : hatchFill(x + 16, yy, 40, 7, AMBER_L, AMBER);
    }).join(''),
    // 輔助圖形與兩側的間隔物 → 移除輔助圖形，只留下間隔物；兩組輔助圖形的間距等於寬度加兩個間隔物，留下的四條線等距
    (x, after) => sub(x, d + 40) + [12, 46].map(dx => (after ? '' : hatchFill(x + dx, d + 18, 12, 22, '#f1f5f9', INK_2))
      + `<rect x="${x + dx - 5}" y="${d + 18}" width="5" height="22" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".7"/><rect x="${x + dx + 12}" y="${d + 18}" width="5" height="22" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".7"/>`).join('')
  ];
  const under = { dummy: ['dummyGate', 'metalGate'], sige: ['sigeName', null], helper: ['helperName', 'spacer'] };
  keys.forEach((k, i) => {
    const x = xs[i];
    svg += card(x, top, w, ch, '#ffffff', LINE) + title(x + 12, top + 20, k).svg
      + minis[i](x + 12, false) + arrow(x + 88, d + 30, x + 104, d + 30, TEAL, 1.5) + minis[i](x + 108, true);
    under[k].forEach((key, j) => { if (key) svg += t(x + 48 + j * 96, d + 70, L(key), 10.5, INK_2, 'middle', 600); });
    // 輔助圖形與間隔物各拉一條引線，指到斜線本體與留下的藍色細條（I1 審查修正）
    if (k === 'helper') svg += lead(x + 36, d + 59, x + 30, d + 34) + lead(x + 144, d + 59, x + 135, d + 36);
  });
  // 下方：為什麼要先佔位
  const why = breakAt(96, top + ch + 30, en ? `${L('why1a')} ${L('why1b')}, ${L('why2')}, ${L('hold')}` : `${L('why1a')}${L('why1b')}，${L('why2')}，${L('hold')}`, L('why2'), 516, 10.5, INK_2, 'start');
  const bh = why.height + 20;
  svg += card(16, top + ch + 12, 608, bh, LIGHT, LINE, 6) + t(32, top + ch + 30, L('why'), 11, TEAL, 'start', 800) + why.svg;
  return { svg, height: top + ch + 12 + bh + 8 };
}

// ch13 記憶體和邏輯：晶片俯視，大部分面積是幾塊相同的方格陣列，陣列之間與外圈是周邊電路帶；
// 右邊放大一小塊陣列，一格格完全相同的記憶單元。不寫「數十億」，比例只是示意
function memoryChip(spec, en, kit) {
  const { L, t, para } = tools(spec, en, kit);
  const sub = para(16, 42, L('goal'), 600, 10.5, INK_2, 'start');
  let svg = t(16, 24, L('twoParts'), 12.5, INK, 'start', 700) + sub.svg;
  const y0 = 42 + sub.height + 8;
  svg += `<rect x="24" y="${y0}" width="220" height="180" rx="4" fill="${AMBER_XL}" stroke="${INK_2}"/>`;
  const blocks = [[36, y0 + 12], [140, y0 + 12], [36, y0 + 94], [140, y0 + 94]];
  blocks.forEach(([x, y]) => {
    let g = '';
    for (let k = 6; k < 92; k += 6) g += `M${x + k} ${y} V${y + 74} `;
    for (let k = 6; k < 74; k += 6) g += `M${x} ${y + k} H${x + 92} `;
    svg += `<rect x="${x}" y="${y}" width="92" height="74" fill="${TEAL_XL}" stroke="${TEAL}"/><path d="${g.trim()}" stroke="${TEAL_L}" stroke-width=".7"/>`;
  });
  // 周邊電路帶裡的小方塊，表示各式邏輯電路
  svg += [[48, y0 + 88], [82, y0 + 89], [112, y0 + 88], [152, y0 + 89], [186, y0 + 88], [216, y0 + 89]].map(([x, y]) => `<rect x="${x}" y="${y}" width="8" height="3.5" fill="${AMBER}"/>`).join('')
    + [[132, y0 + 22], [133, y0 + 50], [132, y0 + 120], [133, y0 + 150]].map(([x, y]) => `<rect x="${x}" y="${y}" width="3.5" height="8" fill="${AMBER}"/>`).join('');
  // 放大框
  const zx = 288, zy = y0, zs = 160;
  svg += `<rect x="188" y="${y0 + 18}" width="36" height="36" fill="none" stroke="${INK}" stroke-dasharray="2 1.5"/>`
    + `<path d="M224 ${y0 + 18} L${zx} ${zy} M224 ${y0 + 54} L${zx} ${zy + zs}" stroke="${MUTED}" stroke-dasharray="3 2"/>`
    + card(zx, zy, zs, zs, TEAL_XL, TEAL, 4);
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) {
    const x = zx + 8 + c * 24.5, y = zy + 8 + r * 24.5;
    svg += `<rect x="${x}" y="${y}" width="20" height="20" rx="3" fill="#ffffff" stroke="${TEAL}"/><circle cx="${x + 10}" cy="${y + 10}" r="4" fill="${TEAL_L}" stroke="${TEAL}"/>`;
  }
  svg += para(zx + zs / 2, zy + zs + 18, L('identical'), zs + 20, 10.5, TEAL, 'middle', 700).svg;
  // 右欄：兩個部分
  const tx0 = 468, tw = 156;
  const a = para(tx0 + 16, y0 + 34, L('arrayDo'), tw - 16, 10.5, INK_2, 'start');
  const py = y0 + 34 + a.height + 26;
  const p = para(tx0 + 16, py + 20, L('periDo'), tw - 16, 10.5, INK_2, 'start');
  svg += `<rect x="${tx0}" y="${y0 + 8}" width="11" height="11" fill="${TEAL_XL}" stroke="${TEAL}"/>` + t(tx0 + 16, y0 + 18, L('array'), 12, TEAL, 'start', 800) + a.svg
    + `<rect x="${tx0}" y="${py - 6}" width="11" height="11" fill="${AMBER_XL}" stroke="${INK_2}"/>` + t(tx0 + 16, py + 4, L('peri'), 12, AMBER, 'start', 800) + p.svg;
  return { svg, height: Math.ceil(Math.max(y0 + 180, zy + zs + 18 + 14, py + 20 + p.height) + 10) };
}

// ch13 NVM 條例總覽：取代分支圖，根、五個分支與結論照搬，結論放在分支卡內；四類非揮發性記憶體各畫兩個儲存狀態的小剖面。
// 嵌入式快閃只畫 SONOS 堆疊（氮化矽有沒有電子）；MRAM 的磁性穿隧接面夾在上下金屬線之間，下層磁化固定、上層翻轉；
// RRAM 細絲接通或斷開；PCRAM 亂排或規則排列；鐵電層的極化朝上或朝下。不標 0、1，不放阻值符號與化學式下標（技術審查修正）
function nvmCells(spec, en, kit) {
  const { L, t, para, breakAt, arrow, lead } = tools(spec, en, kit);
  const rx = 16, rw = 120, bx = 156, bw = 188, px = 356, pw = 268, gap = 8;
  const cardText = i => {
    const b = para(0, 0, L(`b${i}`), bw - 20, 11, INK, 'start', 700), l = para(0, 0, L(`l${i}`), bw - 20, 10, INK_2, 'start');
    return { b, l, h: b.height + l.height + 4 };
  };
  const ELEC = '#94a3b8';
  // 兩個狀態的中心、中欄標籤位置
  const s1 = px + 58, s2 = px + 210, mid = px + 134;
  const art = [
    null,
    // SONOS：閘極、上氧化層、氮化矽、穿隧氧化層、矽
    y => {
      const stack = (cx, filled) => `<rect x="${cx - 30}" y="${y + 6}" width="60" height="12" fill="#cbd5e1" stroke="${INK_2}" stroke-width=".8"/><rect x="${cx - 30}" y="${y + 18}" width="60" height="4" fill="${TEAL_XL}" stroke="${TEAL}" stroke-width=".6"/>`
        + `<rect x="${cx - 30}" y="${y + 22}" width="60" height="9" fill="#94a3b8" stroke="${INK_2}" stroke-width=".8"/><rect x="${cx - 30}" y="${y + 31}" width="60" height="3" fill="${TEAL_XL}" stroke="${TEAL}" stroke-width=".6"/>`
        + `<rect x="${cx - 30}" y="${y + 34}" width="60" height="12" fill="${SI_CH}" stroke="${INK_2}" stroke-width=".8"/>`
        + (filled ? [-20, -10, 0, 10, 20].map(dx => `<circle cx="${cx + dx}" cy="${y + 26.5}" r="2.2" fill="${BLUE}" stroke="#ffffff" stroke-width=".6"/>`).join('') : '');
      return stack(s1, true) + stack(s2, false) + t(mid, y + 4, L('sonos'), 10, MUTED, 'middle', 700)
        + lead(s1 + 30, y + 26.5, mid - 36, y + 26.5) + t(mid, y + 30, L('trap'), 10.5, BLUE, 'middle', 700);
    },
    // MRAM：上下金屬線夾著 CoFeB／MgO／CoFeB；下層磁化固定，上層與下層同向（平行）或反向（反平行）
    y => {
      const mtj = (cx, flip) => `<rect x="${cx - 32}" y="${y + 2}" width="64" height="8" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/><rect x="${cx - 32}" y="${y + 44}" width="64" height="8" fill="${COPPER}" stroke="${RED}" stroke-width=".7"/>`
        + `<rect x="${cx - 18}" y="${y + 10}" width="36" height="13" fill="#ede9fe" stroke="${VIOLET}" stroke-width=".8"/><rect x="${cx - 18}" y="${y + 23}" width="36" height="5" fill="#e2e8f0" stroke="${INK_2}" stroke-width=".6"/><rect x="${cx - 18}" y="${y + 28}" width="36" height="16" fill="#ede9fe" stroke="${VIOLET}" stroke-width=".8"/>`
        + (flip ? thinArrow(cx + 10, y + 16.5, cx - 10, y + 16.5, VIOLET, 1.6) : thinArrow(cx - 10, y + 16.5, cx + 10, y + 16.5, VIOLET, 1.6)) + thinArrow(cx - 10, y + 36, cx + 10, y + 36, VIOLET, 1.6);
      return mtj(s1, false) + mtj(s2, true) + t(s1, y + 66, L('par'), 10.5, INK, 'middle', 700) + t(s2, y + 66, L('anti'), 10.5, INK, 'middle', 700)
        + t(mid, y + 19, L('cofeb'), 9.5, VIOLET, 'middle', 600) + t(mid, y + 31, L('mgo'), 9.5, INK_2, 'middle', 600) + t(mid, y + 43, L('cofeb'), 9.5, VIOLET, 'middle', 600);
    },
    // 左：RRAM 上下電極夾著氧化物，細絲接通或斷開；右：PCRAM 亂排（非晶態）與規則排列（結晶態）
    y => {
      const rram = (cx, on) => `<rect x="${cx - 20}" y="${y + 12}" width="40" height="6" fill="${ELEC}" stroke="${INK_2}" stroke-width=".7"/><rect x="${cx - 20}" y="${y + 18}" width="40" height="22" fill="${LIGHT}" stroke="${INK_2}" stroke-width=".7"/><rect x="${cx - 20}" y="${y + 40}" width="40" height="6" fill="${ELEC}" stroke="${INK_2}" stroke-width=".7"/>`
        + `<path d="M${cx - 1} 40 l3 -5 l-4 -5 l3 -5${on ? ' l-2 -7' : ''}" transform="translate(0 ${y})" fill="none" stroke="${INK_2}" stroke-width="2.6" stroke-linejoin="round"/>`;
      const r1 = px + 30, r2 = px + 88, c1 = px + 164, c2 = px + 230;
      let o = rram(r1, true) + rram(r2, false) + t((r1 + r2) / 2, y + 6, L('rram'), 10, MUTED, 'middle', 700)
        + para((r1 + r2) / 2, y + 60, L('fil'), 108, 10, INK, 'middle', 700).svg + `<path d="M${px + 124} ${y + 4} V${y + 78}" stroke="${LINE}" stroke-dasharray="3 2"/>`;
      const block = cx => `<rect x="${cx - 24}" y="${y + 12}" width="48" height="34" fill="${AMBER_XL}" stroke="${AMBER}" stroke-width=".8"/>`;
      const rnd = [[4, 5], [13, 21], [25, 8], [36, 27], [42, 13], [8, 30], [30, 18], [19, 12], [40, 4], [22, 29], [4, 17], [33, 7]];
      o += block(c1) + rnd.map(([dx, dy]) => `<circle cx="${c1 - 22 + dx}" cy="${y + 13 + dy}" r="1.8" fill="${AMBER}"/>`).join('')
        + block(c2) + [0, 1, 2, 3].flatMap(r => [0, 1, 2, 3, 4].map(c => `<circle cx="${c2 - 18 + c * 9}" cy="${y + 17 + r * 8.5}" r="1.8" fill="${AMBER}"/>`)).join('')
        + t((c1 + c2) / 2, y + 6, L('pcram'), 10, MUTED, 'middle', 700)
        + breakAt(c1, y + 60, L('amor'), '（', 68, 10, INK, 'middle', 600).svg + breakAt(c2, y + 60, L('cryst'), '（', 68, 10, INK, 'middle', 600).svg;
      return o;
    },
    // 鐵電：上下電極夾著氧化鉿鋯層，極化箭頭朝上或朝下
    y => {
      const fe = (cx, up) => `<rect x="${cx - 30}" y="${y + 8}" width="60" height="6" fill="${ELEC}" stroke="${INK_2}" stroke-width=".7"/><rect x="${cx - 30}" y="${y + 14}" width="60" height="26" fill="${PINK_L}" stroke="${PINK}" stroke-width=".8"/><rect x="${cx - 30}" y="${y + 40}" width="60" height="6" fill="${ELEC}" stroke="${INK_2}" stroke-width=".7"/>`
        + [-18, 0, 18].map(dx => (up ? thinArrow(cx + dx, y + 36, cx + dx, y + 18, PINK, 1.5) : thinArrow(cx + dx, y + 18, cx + dx, y + 36, PINK, 1.5))).join('');
      return fe(s1, true) + fe(s2, false) + t(mid, y + 26, L('hzo'), 10.5, PINK, 'middle', 700) + t(mid, y + 40, L('pol'), 10, INK_2, 'middle', 600);
    }
  ];
  const dramText = () => [para(0, 0, L('b0'), 200, 11, INK, 'start', 700), para(0, 0, L('l0'), 468 - 248, 10.5, INK_2, 'start')];
  // 各小圖相對 y 的實際上下界（含上方小標與下方標籤），用來垂直置中（I1 審查修正：原本照 76 算，SONOS 貼到框、兩張偏上）
  const bounds = [null, [-5, 46], [2, 70], [-3, 76], [8, 46]];
  const rowH = [0, 1, 2, 3, 4].map(i => (i ? Math.max(cardText(i).h + 16, 88) : Math.max(...dramText().map(p => p.height)) + 18));
  let y = 12, svg = '';
  const mids = [];
  rowH.forEach((h, i) => {
    const c = cardText(i), cy = y + h / 2, wide = i === 0;
    const w = wide ? 608 - (bx - 16) : bw;
    svg += card(bx, y, w, h, '#ffffff', LINE, 6);
    if (wide) {
      // DRAM 一支保留文字：分支名與結論排成一列
      const [b0, l0] = dramText();
      const bt = para(bx + 12, midY(cy, b0.height, 11), L('b0'), 200, 11, INK, 'start', 700), lt = para(bx + 236, midY(cy, l0.height, 10.5), L('l0'), w - 248, 10.5, INK_2, 'start');
      svg += bt.svg + arrow(bx + 214, cy, bx + 230, cy, TEAL, 1.2) + lt.svg;
    } else {
      const top = midY(cy, c.h, 11);
      svg += para(bx + 12, top, L(`b${i}`), bw - 20, 11, INK, 'start', 700).svg + para(bx + 12, top + c.b.height + 4, L(`l${i}`), bw - 20, 10, INK_2, 'start').svg
        + card(px, y, pw, h, LIGHT, LINE, 6) + arrow(bx + bw + 1, cy, px - 1, cy, TEAL, 1.2) + art[i](y + (h - (bounds[i][1] - bounds[i][0])) / 2 - bounds[i][0]);
    }
    mids.push(cy);
    y += h + gap;
  });
  const bottom = y - gap, ry = (12 + bottom) / 2;
  const rp = para(0, 0, L('root'), rw - 16, 11.5, INK, 'middle', 700), rh = rp.height + 18;
  svg += card(rx, ry - rh / 2, rw, rh, TEAL_XL, TEAL, 6) + para(rx + rw / 2, midY(ry, rp.height, 11.5), L('root'), rw - 16, 11.5, INK, 'middle', 700).svg
    + mids.map(m => `<path d="M${rx + rw} ${ry} C ${rx + rw + 12} ${ry}, ${bx - 16} ${m}, ${bx - 7} ${m}" fill="none" stroke="${TEAL}" stroke-width="1.2"/>` + arrow(bx - 8, m, bx - 1, m, TEAL, 1.2)).join('');
  return { svg, height: bottom + 10 };
}

// ch13 定量物理定律：上半照搬分支圖（根、三條分支與結論，含「QLC 需 CBA 與 LDPC」，正文疑點另列）；
// 下半兩張數據卡：TLC 與 QLC 在同寬的約 5 V 視窗內切出 8 與 16 個互不重疊的窄鐘形；
// HBM3E 與 HBM4 的介面位元數與頻寬，匯流排線數只是示意，不放只在 TeX 裡的 9.6 與 1.2（技術審查修正）
function memoryLaws(spec, en, kit) {
  const { L, t, para, arrow } = tools(spec, en, kit);
  const tree = treeRow(L, para, arrow, 14, 'root', [['b0', 'l0'], ['b1', 'l1'], ['b2', 'l2']], -1);
  let svg = tree.svg;
  const y0 = tree.bottom + 16, ch = 156;
  // 左卡：多態視窗
  const wl = 90, wr = 300, rows = [[y0 + 70, 8, 'tlc', 'n8'], [y0 + 114, 16, 'qlc', 'n16']];
  svg += card(16, y0, 352, ch, AMBER_XL, AMBER, 8) + t(30, y0 + 22, L('b1'), 11.5, INK, 'start', 800)
    + `<path d="M${wl} ${y0 + 42} V${y0 + 120} M${wr} ${y0 + 42} V${y0 + 120}" stroke="${AMBER}" stroke-dasharray="3 2"/>`;
  rows.forEach(([base, n, tag, num], k) => {
    const pitch = (wr - wl) / n, hw = pitch * 0.38;
    svg += t(30, base - 8, L(tag), 11.5, INK, 'start', 800) + t(30, base + 8, L(num), 13, TEAL, 'start', 800)
      + (k ? thinArrow(wl - 14, base, wr + 16, base, INK_2, 1) : `<path d="M${wl - 14} ${base} H${wr + 10}" stroke="${INK_2}"/>`)
      + Array.from({ length: n }, (_, i) => `<path d="${bell(wl + pitch * (i + 0.5), hw, 24, base)}" fill="${BLUE_L}" stroke="${BLUE}" stroke-width=".9"/>`).join('');
  });
  svg += t(wr + 20, y0 + 118, L('vt'), 10.5, INK_2, 'start', 600)
    + `<path d="M${wl} ${y0 + 126} v5 H${wr} v-5" fill="none" stroke="${AMBER}" stroke-width="1.4"/>` + t((wl + wr) / 2, y0 + 146, L('window'), 11, AMBER, 'middle', 700)
    + t(352, y0 + 38, L('states'), 10.5, BLUE, 'end', 600);
  // 右卡：HBM 介面位元數
  const hx = 376, bus = (x, y, n) => `<path d="M${x} ${y} H${x + n * 6} M${x} ${y + 20} H${x + n * 6}" stroke="${INK_2}" stroke-width="1.6"/>` + Array.from({ length: n }, (_, i) => `<path d="M${x + 3 + i * 6} ${y + 2} V${y + 18}" stroke="${TEAL}" stroke-width="1.4"/>`).join('');
  svg += card(hx, y0, 248, ch, TEAL_XL, TEAL, 8) + t(hx + 14, y0 + 22, L('b2'), 11.5, INK, 'start', 800)
    + t(hx + 14, y0 + 54, L('hbm3e'), 11, INK, 'start', 800) + bus(hx + 68, y0 + 40, 8) + t(hx + 124, y0 + 54, L('w1'), 11, TEAL, 'start', 700)
    + arrow(hx + 92, y0 + 66, hx + 92, y0 + 82, TEAL, 1.4) + t(hx + 100, y0 + 78, L('dbl'), 10.5, TEAL, 'start', 700)
    + t(hx + 14, y0 + 104, L('hbm4'), 11, INK, 'start', 800) + bus(hx + 68, y0 + 90, 16) + t(hx + 172, y0 + 104, L('w2'), 11, TEAL, 'start', 700)
    + t(hx + 14, y0 + 132, L('bw'), 12, TEAL, 'start', 800);
  return { svg, height: y0 + ch + 8 };
}

export const PICTORIALS = {
  industryMap, cleanroom, toolTypes, fabRoles, dopingLattice, cmosWells, sandToPoly, ingotToWafer, waferSizes, specialWafers,
  overlayCd, lithoDefects, filmStack, thermalOxidation, cvdTypes, epitaxy, filmMetrics,
  etchTransfer, plasma, etchMetrics, doseEnergy, thermalBudget,
  whyPlanarize, dummyFill, contaminants, crossContamination, alToCu, thinWires, metalDefects, beolTiers,
  processLoop, planarLeak, gaaFlow, backsidePower, hbmStack, nodeShrink,
  metrologyVsInspection, fiveMeasurements, samplingLevels, crossSectionAnalysis,
  cpkParking, r2rFdc, suspectScope, dispositions, watVsCp, probeCards,
  packagingFlow, flipChipBumps, packageFamilies, packageDefects, splitChip, interposerTypes, bondingPitch,
  finalTest, agingMechanisms, fabSystemsHub, lotArrival,
  eccSoftErrors, steppingLayers, lotJourney, toolJargon, systemVsPhysical, oocOos, areasPeople, standardsMap,
  cppScale,
  scaleTiles, frontBack, threeUnits, facilities, cycleTime,
  semiControl, transistorsToChip, shrinkWhy, bandgapBars, swingScale, scheilIngots,
  scannerFields, printSmaller, lithoGens, lithoLaws, filmDefects, filmClauses, filmLaws, filmFailures,
  endpointTrace, harHoles, etchDefects, boschClauses, etchLaws, etchFailures, diffuseVsImplant, annealRepair, annealLaws, implantFailures,
  cmpUses, cmpStop, cmpDefects, cmpClauses, bondRecess, cmpFailures, cleanEverywhere, qtimeBar, cleanDefects, cleanClauses, dryCollapse, cleanFailures,
  contactsVias, lowK, rcLevers, molSteps, beolSteps, maskCount, tierThermal,
  strainHkmg, sacrificial, memoryChip, nvmCells, memoryLaws
};
