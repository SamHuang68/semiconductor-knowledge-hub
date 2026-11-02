export const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const L = (en, zh, enText) => (en ? enText : zh);

// 文字與箭頭小工具：箭頭頭直接畫成三角形，不依賴 <defs>，複製單張 SVG 時也完整
const tx = (x, y, label, size = 12, fill = '#0f172a', anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-size="${size}">${esc(label)}</text>`;
function arrow(x1, y1, x2, y2, color = '#0f766e', width = 1.5) {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 6;
  const p = (r, s) => `${(x2 - h * Math.cos(a + s * r)).toFixed(1)} ${(y2 - h * Math.sin(a + s * r)).toFixed(1)}`;
  return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${color}" stroke-width="${width}" fill="none"/><path d="M${x2} ${y2} L${p(0.45, 1)} L${p(0.45, -1)} Z" fill="${color}"/>`;
}

export function frame(caption, en, body, height = 232, key = '') {
  const badge = L(en, '示意 · 未按比例', 'Schematic · not to scale');
  const source = L(en, '沒有量測值。名稱取自本章，不另編數字。', 'No measured values. Names come from this chapter. No added numbers.');
  return `<figure class="chapter-figure"${key ? ` data-figure="${key}"` : ''}><svg viewBox="0 0 640 ${height}" role="img" aria-label="${esc(`${caption}. ${badge}. ${source}`)}">${body}</svg><figcaption><span class="illus-badge">${esc(badge)}</span><span class="figure-caption">${esc(caption)}</span><span class="figure-source">${esc(source)}</span></figcaption></figure>`;
}

function flow(labels) {
  const gap = 14;
  const width = (608 - gap * (labels.length - 1)) / labels.length;
  return labels.map((label, index) => {
    const x = 16 + index * (width + gap);
    const arrow = index < labels.length - 1
      ? `<path d="M${x + width + 1} 78 h${gap - 2}" stroke="#0f766e" stroke-width="1.5"/>`
      : '';
    return `<rect x="${x}" y="48" width="${width}" height="58" rx="4" fill="#f8fafc" stroke="#334155"/><text x="${x + width / 2}" y="81" text-anchor="middle" fill="#0f172a" font-size="12">${esc(label)}</text>${arrow}`;
  }).join('');
}

function life(en) {
  return flow([L(en, '設計', 'Design'), L(en, '光罩', 'Mask'), L(en, '晶圓廠', 'Fab'), L(en, '測試', 'Test'), L(en, '封裝', 'Package'), L(en, '出貨', 'Ship')]);
}

function waferDieChip(en) {
  return `<circle cx="90" cy="100" r="62" fill="#e2e8f0" stroke="#334155"/><circle cx="90" cy="100" r="54" fill="#f8fafc" stroke="#64748b"/>${Array.from({ length: 16 }, (_, i) => `<rect x="${58 + (i % 4) * 16}" y="${68 + Math.floor(i / 4) * 16}" width="13" height="13" fill="#99f6e4" stroke="#0f766e"/>`).join('')}<text x="90" y="178" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '晶圓', 'Wafer')}</text><path d="M170 100 h36" stroke="#0f766e"/><rect x="220" y="62" width="76" height="76" fill="#57bdb3" stroke="#0f766e"/><text x="258" y="160" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '晶粒', 'Die')}</text><path d="M314 100 h36" stroke="#0f766e"/><rect x="364" y="78" width="150" height="44" fill="#a6bdcb" stroke="#334155"/><rect x="400" y="52" width="78" height="26" fill="#57bdb3" stroke="#0f766e"/><text x="439" y="150" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '封裝後的晶片', 'Packaged chip')}</text>`;
}

function fabSection(en) {
  return `<rect x="80" y="28" width="480" height="42" fill="#e0f2fe" stroke="#075985"/><text x="320" y="54" text-anchor="middle" fill="#0f172a" font-size="14">${L(en, '上層 · 空調與過濾', 'Top · air handling and filters')}</text><rect x="80" y="78" width="480" height="58" fill="#f0fdfa" stroke="#0f766e"/><text x="320" y="112" text-anchor="middle" fill="#0f172a" font-size="14">${L(en, '中層 · 無塵室', 'Middle · cleanroom')}</text><rect x="80" y="144" width="480" height="52" fill="#f8fafc" stroke="#64748b"/><text x="320" y="175" text-anchor="middle" fill="#0f172a" font-size="14">${L(en, '下層 · 管線與附屬設備', 'Bottom · piping and support')}</text>`;
}

function oht(en) {
  return `<path d="M40 36 h560" stroke="#334155" stroke-width="4"/><rect x="250" y="28" width="88" height="22" rx="3" fill="#bae6fd" stroke="#075985"/><path d="M294 50 v28" stroke="#334155" stroke-width="2"/><rect x="262" y="78" width="64" height="40" fill="#f8fafc" stroke="#334155"/><text x="294" y="102" text-anchor="middle" fill="#0f172a" font-size="12">FOUP</text><rect x="120" y="150" width="400" height="46" fill="#f1f5f9" stroke="#64748b"/><text x="320" y="178" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '機台 Load Port', 'Tool load port')}</text>`;
}

function mosfet(en) {
  // 主剖面：源汲極自對準閘極，邊緣到閘極下方；閘極氧化層是閘極與矽之間的薄層；通道在閘極下方、源極與汲極之間的矽表面
  const main = `<rect x="30" y="140" width="340" height="70" fill="#a6bdcb" stroke="#334155"/><rect x="50" y="140" width="90" height="26" fill="#57bdb3" stroke="#0f766e"/><rect x="260" y="140" width="90" height="26" fill="#57bdb3" stroke="#0f766e"/><rect x="140" y="141" width="120" height="11" fill="none" stroke="#075985" stroke-dasharray="3 2"/><rect x="140" y="88" width="120" height="44" fill="#bae6fd" stroke="#075985"/><rect x="140" y="132" width="120" height="8" fill="#fde68a" stroke="#92400e"/>`
    + tx(200, 115, L(en, '③ 閘極', '③ Gate'), 13)
    + tx(330, 196, L(en, '矽', 'Silicon'), 12, '#334155')
    + `<path d="M262 136 L300 112" stroke="#92400e"/>` + tx(304, 110, L(en, '④ 閘極氧化層', '④ Gate oxide'), 12, '#92400e', 'start')
    + `<path d="M200 152 V222" stroke="#075985"/>` + tx(200, 238, L(en, '⑤ 通道', '⑤ Channel'), 12, '#075985')
    + tx(90, 238, L(en, '① 源極', '① Source'), 12) + tx(310, 238, L(en, '② 汲極', '② Drain'), 12);
  // 右側兩個小剖面：拿掉電壓時閘門關閉；閘極電壓超過臨界電壓，通道打開，載子由源極流向汲極
  const mini = (top, on) => `<rect x="478" y="${top}" width="74" height="22" fill="${on ? '#7dd3fc' : '#bae6fd'}" stroke="#075985"/><rect x="478" y="${top + 22}" width="74" height="4" fill="#fde68a" stroke="#92400e"/><rect x="410" y="${top + 26}" width="210" height="40" fill="#a6bdcb" stroke="#334155"/><rect x="420" y="${top + 26}" width="58" height="14" fill="#57bdb3" stroke="#0f766e"/><rect x="552" y="${top + 26}" width="58" height="14" fill="#57bdb3" stroke="#0f766e"/>`
    + (on ? `<rect x="478" y="${top + 27}" width="74" height="8" fill="#0f766e" opacity="0.35"/>${arrow(446, top + 31, 584, top + 31, '#0f172a', 1.5)}` + tx(515, top + 54, L(en, '載子', 'Carriers'), 11, '#0f172a') : '');
  return main
    + tx(515, 22, L(en, '關 · 拿掉電壓，閘門關閉', 'Off · voltage removed'), 12, '#334155') + mini(34, false)
    + tx(515, 134, L(en, '開 · 閘極電壓超過臨界電壓（Vt）', 'On · above threshold voltage (Vt)'), 11.5, '#0f766e') + mini(146, true);
}

function cz(en) {
  // 開口的坩堝裝著熔融矽；晶種往上拉出晶棒，晶棒底部接著熔融矽液面，一邊旋轉一邊往上拉
  return `<path d="M230 80 V176 H410 V80" fill="none" stroke="#334155" stroke-width="2"/><rect x="232" y="132" width="176" height="42" fill="#fde68a"/>${tx(320, 160, L(en, '熔融矽', 'Molten silicon'), 12)}<rect x="300" y="28" width="40" height="28" fill="#99f6e4" stroke="#0f766e"/><rect x="292" y="56" width="56" height="76" fill="#f8fafc" stroke="#0f766e"/>${tx(320, 196, L(en, '坩堝', 'Crucible'), 12, '#334155')}`
    + arrow(266, 110, 266, 50, '#0f766e', 2)
    + `<path d="M294 104 q26 14 52 0" fill="none" stroke="#0f766e" stroke-width="1.5"/><path d="M346 104 l-7 -1 l3 6 z" fill="#0f766e"/>`
    + `<path d="M340 42 H432" stroke="#334155"/>` + tx(438, 46, L(en, '晶種', 'Seed'), 12, '#0f172a', 'start')
    + `<path d="M348 90 H432" stroke="#334155"/>` + tx(438, 94, L(en, '晶棒 · 旋轉上拉', 'Ingot · rotate and pull'), 12, '#0f172a', 'start');
}

function photoVsLitho(en) {
  return `${flow([L(en, '光源', 'Light'), L(en, '底片／光罩', 'Film / mask'), L(en, '鏡頭', 'Lens'), L(en, '相紙／光阻', 'Paper / resist')])}<text x="160" y="132" text-anchor="middle" fill="#334155" font-size="12">${L(en, '攝影', 'Photography')}</text><text x="480" y="132" text-anchor="middle" fill="#334155" font-size="12">${L(en, '微影用同一順序', 'Lithography uses the same order')}</text>`;
}

function lithoFlow(en) {
  // 以照到光的區域在顯影時溶掉為例：曝光後光阻仍完整、只有受光區起化學變化，顯影才出現開口
  const panel = (x, title, stage) => {
    let out = tx(x + 85, 30, title, 13) + `<rect x="${x}" y="150" width="170" height="30" fill="#a6bdcb" stroke="#334155"/>`;
    if (stage === 'develop') out += `<rect x="${x}" y="122" width="65" height="28" fill="#e1ad70" stroke="#92400e"/><rect x="${x + 105}" y="122" width="65" height="28" fill="#e1ad70" stroke="#92400e"/>`;
    else out += `<rect x="${x}" y="122" width="170" height="28" fill="#e1ad70" stroke="#92400e"/>`;
    if (stage === 'coat') out += tx(x + 85, 140, L(en, '光阻', 'Resist'), 11) + tx(x + 85, 169, L(en, '底下的材料', 'Material underneath'), 11);
    if (stage === 'expose') {
      out += `<rect x="${x + 65}" y="122" width="40" height="28" fill="#fef3c7" stroke="#92400e" stroke-dasharray="3 2"/><rect x="${x}" y="72" width="65" height="10" fill="#334155"/><rect x="${x + 105}" y="72" width="65" height="10" fill="#334155"/>`
        + [75, 85, 95].map(dx => arrow(x + dx, 44, x + dx, 118, '#d97706', 1.5)).join('')
        + tx(x + 137, 66, L(en, '光罩', 'Mask'), 11, '#334155')
        + tx(x + 85, 198, L(en, '照到光的地方會起化學變化', 'Exposed areas change chemically'), 10, '#92400e');
    }
    if (stage === 'develop') out += tx(x + 85, 198, L(en, '顯影液溶掉一部分', 'Developer dissolves part'), 10.5, '#92400e');
    return out;
  };
  return panel(20, L(en, '① 塗佈', '① Coat'), 'coat') + arrow(196, 136, 228, 136)
    + panel(235, L(en, '② 曝光', '② Expose'), 'expose') + arrow(411, 136, 443, 136)
    + panel(450, L(en, '③ 顯影', '③ Develop'), 'develop')
    + `<text x="320" y="222" text-anchor="middle" fill="#334155" font-size="12">${L(en, '光阻開口時，下方薄膜仍在', 'Resist opens; the film underneath remains')}</text>`;
}

function deposition(en) {
  // 四種方法是並列的選項，不是先後步驟：各自一張小卡，不畫連接線
  const card = (x, name, note, art) => `<rect x="${x}" y="28" width="140" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>${tx(x + 70, 50, name, 14)}${art(x)}${tx(x + 70, 200, note, 12, '#334155')}`;
  const base = x => `<rect x="${x + 20}" y="130" width="100" height="26" fill="#a6bdcb" stroke="#334155"/>`;
  const dots = (x, y, n, color) => Array.from({ length: n }, (_, i) => `<circle cx="${x + 30 + i * 20}" cy="${y + (i % 2) * 10}" r="4" fill="${color}"/>`).join('');
  // 熱氧化：虛線是原本的矽表面，氧化層有一部分往下長
  return card(20, L(en, '熱氧化', 'Thermal oxidation'), L(en, '吃掉一部分矽', 'Consumes some silicon'), x => `${base(x)}<rect x="${x + 20}" y="118" width="100" height="16" fill="#fde68a" stroke="#92400e"/><path d="M${x + 20} 126 h100" stroke="#92400e" stroke-dasharray="4 3"/>${dots(x, 80, 5, '#ef4444')}`)
    + card(170, 'CVD', L(en, '氣體反應', 'Gas reaction'), x => `${base(x)}<rect x="${x + 20}" y="122" width="100" height="8" fill="#99f6e4" stroke="#0f766e"/>${dots(x, 74, 5, '#0f766e')}${dots(x, 96, 5, '#075985')}`)
    + card(320, 'PVD', L(en, '靶材濺出', 'Target atoms'), x => `${base(x)}<rect x="${x + 20}" y="122" width="100" height="8" fill="#d9ac73" stroke="#92400e"/><rect x="${x + 20}" y="62" width="100" height="12" fill="#9a3412"/>${[40, 70, 100].map(dx => arrow(x + dx, 78, x + dx + (dx - 70) / 4, 116, '#9a3412')).join('')}`)
    + card(470, 'ALD', L(en, '一層一層', 'One layer at a time'), x => `${base(x)}${Array.from({ length: 10 }, (_, i) => `<circle cx="${x + 25 + i * 10}" cy="126" r="4" fill="#0f766e"/>`).join('')}<path d="M${x + 50} 96 a20 14 0 1 1 40 0" fill="none" stroke="#0f766e" stroke-width="1.5"/><path d="M${x + 90} 96 l-5 -6 l8 0 z" fill="#0f766e"/>`);
}

function etch(en) {
  // 光阻兩塊中間留一個開口；只有開口下方的材料被蝕刻，兩邊都蝕到底層。
  // 等向：往各方向速度差不多，側向也蝕掉約一個深度，延伸到光阻底下；非等向：直壁、寬度等於開口
  const stack = x => `<rect x="${x}" y="170" width="260" height="24" fill="#a6bdcb" stroke="#334155"/><rect x="${x}" y="130" width="260" height="40" fill="#57bdb3" stroke="#0f766e"/>`;
  const resist = x => `<rect x="${x}" y="108" width="105" height="22" fill="#e1ad70" stroke="#92400e"/><rect x="${x + 155}" y="108" width="105" height="22" fill="#e1ad70" stroke="#92400e"/>`;
  const wet = 20, dry = 360;
  return tx(wet + 130, 26, L(en, '濕蝕刻 · 等向', 'Wet etching · isotropic'), 14)
    + `<rect x="${wet}" y="46" width="260" height="62" fill="#e0f2fe"/><rect x="${wet + 105}" y="108" width="50" height="22" fill="#e0f2fe"/>` + tx(wet + 130, 70, L(en, '化學溶液', 'Chemical solution'), 12, '#075985')
    + stack(wet) + `<path d="M${wet + 65} 130 Q${wet + 65} 170 ${wet + 105} 170 L${wet + 155} 170 Q${wet + 195} 170 ${wet + 195} 130 Z" fill="#e0f2fe" stroke="#0f766e"/>` + resist(wet)
    + arrow(wet + 130, 148, wet + 130, 164, '#075985', 1.2) + arrow(wet + 130, 148, wet + 92, 148, '#075985', 1.2) + arrow(wet + 130, 148, wet + 168, 148, '#075985', 1.2)
    + `<path d="M${wet + 74} 136 L${wet + 40} 214" stroke="#334155"/>` + tx(wet + 40, 228, L(en, '側蝕', 'Undercut'), 12, '#0f172a')
    + tx(dry + 130, 26, L(en, '乾蝕刻 · 非等向', 'Dry etching · anisotropic'), 14)
    + `<rect x="${dry + 40}" y="42" width="180" height="26" rx="13" fill="#ede9fe" stroke="#5b21b6"/>` + tx(dry + 130, 60, L(en, '電漿', 'Plasma'), 12, '#5b21b6')
    + stack(dry) + `<rect x="${dry + 105}" y="130" width="50" height="40" fill="#f8fafc" stroke="#0f766e"/>` + resist(dry)
    + [115, 130, 145].map(dx => arrow(dry + dx, 74, dry + dx, 160, '#5b21b6', 1.4)).join('') + [40, 220].map(dx => arrow(dry + dx, 74, dry + dx, 104, '#5b21b6', 1.4)).join('')
    + `<path d="M${dry + 156} 150 L${dry + 214} 214" stroke="#334155"/>` + tx(dry + 214, 228, L(en, '筆直的側壁', 'Straight sidewalls'), 12)
    + tx(wet + 40, 124, L(en, '光阻', 'Resist'), 11, '#0f172a') + tx(dry + 52, 124, L(en, '光阻', 'Resist'), 11, '#0f172a');
}

function implanter(en) {
  return flow([L(en, '離子源', 'Source'), L(en, '質量分析', 'Magnet'), L(en, '加速', 'Accel'), L(en, '掃描', 'Scan'), L(en, '晶圓', 'Wafer')]);
}

function cmpTool(en) {
  return `<ellipse cx="250" cy="150" rx="150" ry="28" fill="#e2e8f0" stroke="#334155"/><text x="250" y="154" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '研磨墊 · 旋轉平台', 'Pad · platen')}</text><rect x="190" y="70" width="120" height="36" rx="4" fill="#bae6fd" stroke="#075985"/><text x="250" y="92" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '研磨頭', 'Head')}</text><circle cx="430" cy="120" r="10" fill="#fde68a" stroke="#92400e"/><text x="470" y="124" fill="#0f172a" font-size="12">${L(en, '研磨液', 'Slurry')}</text><rect x="40" y="108" width="36" height="50" fill="#cbd5e1" stroke="#334155"/><text x="58" y="96" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '修整器', 'Conditioner')}</text>`;
}

function dishing(en) {
  // 虛線是周圍表面的高度。碟化：一條較寬的金屬導線中間被磨得凹下去；侵蝕：導線密集的整個區域一起比周圍低
  const d = 20, e = 360;
  const dish = `<rect x="${d}" y="100" width="260" height="70" fill="#a6bdcb" stroke="#334155"/><rect x="${d + 70}" y="100" width="120" height="50" fill="#f8fafc"/><path d="M${d + 70} 100 Q${d + 130} 124 ${d + 190} 100 L${d + 190} 150 L${d + 70} 150 Z" fill="#d9ac73" stroke="#92400e"/><path d="M${d - 6} 100 H${d + 266}" stroke="#0f172a" stroke-dasharray="5 4"/>`
    + tx(d + 130, 36, L(en, '碟化 Dishing', 'Dishing'), 14)
    + `<path d="M${d + 130} 110 L${d + 130} 70" stroke="#334155"/>` + tx(d + 130, 62, L(en, '像一個盤子', 'Like a dish'), 12)
    + tx(d + 130, 192, L(en, '較寬的金屬導線', 'A wide metal line'), 12, '#92400e');
  const lines = Array.from({ length: 6 }, (_, i) => `<rect x="${e + 80 + i * 20}" y="114" width="10" height="36" fill="#d9ac73" stroke="#92400e"/>`).join('');
  const erosion = `<path d="M${e} 100 H${e + 70} V114 H${e + 200} V100 H${e + 260} V170 H${e} Z" fill="#a6bdcb" stroke="#334155"/>${lines}<path d="M${e - 6} 100 H${e + 266}" stroke="#0f172a" stroke-dasharray="5 4"/>`
    + tx(e + 130, 36, L(en, '侵蝕 Erosion', 'Erosion'), 14)
    + `<path d="M${e + 70} 88 q0 -8 10 -8 H${e + 125} l5 -6 l5 6 H${e + 190} q10 0 10 8" fill="none" stroke="#334155"/>` + tx(e + 130, 64, L(en, '導線密集的整個區域', 'A whole area of dense lines'), 12)
    + tx(e + 130, 192, L(en, '比周圍低', 'Lower than its surroundings'), 12, '#92400e');
  return dish + erosion + `<text x="320" y="222" text-anchor="middle" fill="#334155" font-size="12">${L(en, '形狀對照，沒有深度數值', 'Shape comparison, no depth values')}</text>`;
}

function clean(en) {
  // 批次式：整批晶圓直立、整片浸入，依序經過一排化學槽和清水槽；單片式：一次一片，一邊旋轉一邊噴灑化學品
  const tank = (x, liquid, label, wafers) => `<rect x="${x}" y="80" width="62" height="78" fill="${liquid}" stroke="#075985"/>${wafers ? Array.from({ length: 5 }, (_, i) => `<path d="M${x + 13 + i * 9} 88 V150" stroke="#475569" stroke-width="2"/>`).join('') : ''}${tx(x + 31, 176, label, 11, '#334155')}`;
  return tx(160, 30, L(en, '批次式濕式清洗槽', 'Batch wet bench'), 13)
    + tank(20, '#bae6fd', L(en, '化學槽', 'Chemical'), true) + tank(92, '#e0f2fe', L(en, '清水槽', 'Rinse')) + tank(164, '#bae6fd', L(en, '化學槽', 'Chemical')) + tank(236, '#e0f2fe', L(en, '清水槽', 'Rinse'))
    + arrow(40, 56, 280, 56, '#0f766e')
    + tx(500, 30, L(en, '單片式清洗機', 'Single-wafer cleaner'), 13)
    + `<ellipse cx="500" cy="128" rx="90" ry="20" fill="#f8fafc" stroke="#334155"/><rect x="494" y="146" width="12" height="34" fill="#94a3b8"/><path d="M436 132 q64 22 128 0" fill="none" stroke="#0f766e" stroke-width="1.5"/><path d="M564 132 l-9 0 l4 -7 z" fill="#0f766e"/><path d="M470 52 h40 v14 h-40 z" fill="#cbd5e1" stroke="#334155"/>${arrow(490, 66, 490, 102, '#075985')}${arrow(482, 66, 466, 100, '#075985')}${arrow(498, 66, 516, 100, '#075985')}`
    + tx(500, 206, L(en, '一邊旋轉一邊噴灑化學品', 'Spins while spraying'), 11, '#334155');
}

function metalStack(en) {
  return `<rect x="80" y="150" width="480" height="22" fill="#a6bdcb" stroke="#334155"/><path d="M110 150 v-16 M180 150 v-16 M250 150 v-16" stroke="#9a3412" stroke-width="3"/><path d="M120 134 h200 M360 134 h120" stroke="#9a3412" stroke-width="4"/><text x="200" y="124" fill="#92400e" font-size="12">${L(en, '下層細密', 'Lower, dense')}</text><path d="M160 118 v-18 M400 118 v-18" stroke="#9a3412" stroke-width="6"/><path d="M140 100 h300" stroke="#9a3412" stroke-width="10"/><text x="300" y="88" fill="#92400e" font-size="12">${L(en, '上層粗寬 · 導通孔相連', 'Upper, wide · vias')}</text>`;
}

function damascene(en) {
  return flow([L(en, '挖洞', 'Etch'), L(en, '阻障層', 'Barrier'), L(en, '電鍍', 'Plate'), 'CMP', L(en, '覆蓋層', 'Cap')]);
}

function feol(en) {
  return flow([L(en, '隔離', 'Isolation'), L(en, '井', 'Wells'), L(en, '閘極', 'Gate'), 'Spacer', L(en, '源汲', 'S/D'), L(en, '矽化物', 'Silicide')]);
}

function devices(en) {
  // 剖面：閘極（淺藍）控制通道（淺青）的面數。平面從上方一面；FinFET 倒 U 形包住鰭的上方與兩側；GAA 包住每一片奈米片的四面
  return tx(110, 36, L(en, '平面 · 上方', 'Planar · from above'), 13)
    + `<rect x="40" y="120" width="140" height="36" fill="#a6bdcb" stroke="#334155"/><rect x="80" y="120" width="60" height="6" fill="#99f6e4" stroke="#0f766e"/><rect x="80" y="96" width="60" height="24" fill="#bae6fd" stroke="#075985"/>`
    + tx(320, 36, L(en, 'FinFET · 三面', 'FinFET · three sides'), 13)
    + `<rect x="250" y="130" width="140" height="26" fill="#a6bdcb" stroke="#334155"/><rect x="300" y="86" width="28" height="44" fill="#99f6e4" stroke="#0f766e"/><path d="M290 130 V76 H338 V130 H328 V86 H300 V130 Z" fill="#bae6fd" stroke="#075985"/>`
    + tx(520, 36, L(en, 'GAA · 四面', 'GAA · four sides'), 13)
    + `<rect x="470" y="150" width="120" height="16" fill="#a6bdcb" stroke="#334155"/><rect x="488" y="58" width="84" height="92" rx="4" fill="#bae6fd" stroke="#075985"/>` + [72, 98, 124].map(y => `<rect x="500" y="${y}" width="60" height="10" fill="#99f6e4" stroke="#0f766e"/>`).join('')
    + `<rect x="236" y="190" width="14" height="10" fill="#bae6fd" stroke="#075985"/>${tx(256, 199, L(en, '閘極', 'Gate'), 12, '#0f172a', 'start')}<rect x="330" y="190" width="14" height="10" fill="#99f6e4" stroke="#0f766e"/>${tx(350, 199, L(en, '通道', 'Channel'), 12, '#0f172a', 'start')}`;
}

function dram(en) {
  // 只畫一個單元：字元線埋在矽表面以下的溝槽裡（上有絕緣蓋），兩側摻雜區；
  // 一側經接觸接到較低的位元線，另一側經接觸窗越過位元線高度，接到上方又細又高的圓柱電容
  const cell = `<rect x="40" y="150" width="340" height="76" fill="#a6bdcb" stroke="#334155"/><rect x="110" y="150" width="58" height="16" fill="#57bdb3" stroke="#0f766e"/><rect x="212" y="150" width="58" height="16" fill="#57bdb3" stroke="#0f766e"/><rect x="170" y="150" width="40" height="62" fill="#fde68a" stroke="#92400e"/><rect x="176" y="172" width="28" height="34" fill="#bae6fd" stroke="#075985"/><rect x="176" y="153" width="28" height="19" fill="#e2e8f0" stroke="#64748b"/>`
    + `<rect x="128" y="118" width="20" height="32" fill="#d9ac73" stroke="#92400e"/><rect x="50" y="106" width="150" height="12" fill="#d9ac73" stroke="#92400e"/><rect x="232" y="78" width="18" height="72" fill="#d9ac73" stroke="#92400e"/>`
    + `<rect x="225" y="14" width="32" height="64" rx="3" fill="#e0f2fe" stroke="#075985"/><path d="M221 40 l8 -5 l8 5 l8 -5 l8 5 l8 -5 M221 47 l8 -5 l8 5 l8 -5 l8 5 l8 -5" fill="none" stroke="#475569"/>`;
  const labels = tx(50, 98, L(en, '位元線', 'Bit line'), 12, '#92400e', 'start')
    + `<path d="M204 190 L300 200" stroke="#075985"/>` + tx(304, 204, L(en, '埋入式字元線', 'Buried word line'), 12, '#075985', 'start')
    + tx(265, 34, L(en, '電容', 'Capacitor'), 12, '#075985', 'start') + tx(265, 52, L(en, '細長圓柱', 'Slender cylinder'), 11, '#334155', 'start')
    + tx(210, 244, L(en, '電晶體 · 開關', 'Transistor · switch'), 12);
  // 右側 1T1C 小插圖：電晶體是開關，電容存放電荷
  const circuit = `<path d="M470 40 V220" stroke="#92400e" stroke-width="2"/>${tx(470, 32, L(en, '位元線', 'Bit line'), 11, '#92400e')}<path d="M470 130 H500 M560 130 H580 V156" fill="none" stroke="#334155" stroke-width="1.5"/><rect x="500" y="118" width="60" height="24" rx="3" fill="#bae6fd" stroke="#075985"/>${tx(530, 134, L(en, '開關', 'Switch'), 11)}<path d="M530 118 V98" stroke="#075985" stroke-width="1.5"/>${tx(530, 92, L(en, '字元線', 'Word line'), 11, '#075985')}<path d="M566 156 H594 M566 164 H594" stroke="#075985" stroke-width="2.5"/><path d="M580 164 V182" stroke="#334155"/><path d="M572 182 H588" stroke="#334155"/>${tx(580, 206, L(en, '存放電荷', 'Stores charge'), 11, '#075985')}`;
  return cell + labels + circuit;
}

function nand(en) {
  // 五格主要流程：交替堆疊 → 通道孔 → 孔壁儲存層與通道 → 邊緣階梯 → 氮化層換成金屬字元線後才接接觸窗
  const W = 118, layers = 16, lh = 8, top = 58;
  const panel = (i, title, opts) => {
    const x = 6 + i * 126;
    let out = tx(x + W / 2, 26, title, 11);
    for (let k = 0; k < layers; k++) {
      const y = top + k * lh;
      const pair = Math.floor((layers - 1 - k) / 2); // 由下往上第幾對
      const right = opts.stair ? x + W - pair * 6 : x + W;
      const nitride = k % 2 === 1; // 最上層是氧化層
      const fill = nitride ? (opts.metal ? '#d9ac73' : '#94a3b8') : '#f1f5f9';
      out += `<rect x="${x}" y="${y}" width="${right - x}" height="${lh}" fill="${fill}" stroke="#64748b" stroke-width="0.5"/>`;
    }
    out += `<path d="M${x + 4} ${top - 8} l6 -4 l6 4 l6 -4 M${x + 4} ${top - 4} l6 -4 l6 4 l6 -4" fill="none" stroke="#475569"/>`;
    if (opts.hole) {
      out += `<rect x="${x + 28}" y="${top}" width="16" height="${layers * lh}" fill="#f8fafc" stroke="#075985"/>`;
      if (opts.fill) out += `<rect x="${x + 28}" y="${top}" width="3" height="${layers * lh}" fill="#fde68a"/><rect x="${x + 41}" y="${top}" width="3" height="${layers * lh}" fill="#fde68a"/><rect x="${x + 31}" y="${top}" width="3" height="${layers * lh}" fill="#57bdb3"/><rect x="${x + 38}" y="${top}" width="3" height="${layers * lh}" fill="#57bdb3"/>`;
    }
    // 每一階接到該階的字元線（穿過上面同一對的氧化層）
    if (opts.contacts) for (let p = 0; p < 8; p++) out += `<path d="M${x + W - p * 6 - 3} ${top + (15 - 2 * p) * lh} V${top - 14}" stroke="#9a3412" stroke-width="1.2"/>`;
    return out;
  };
  const swatch = (x, fill, label) => `<rect x="${x}" y="198" width="10" height="9" fill="${fill}" stroke="#64748b" stroke-width="0.5"/>${tx(x + 13, 206, label, 10.5, '#334155', 'start')}`;
  return panel(0, L(en, '① 堆疊', '① Stack'), {}) + panel(1, L(en, '② 通道孔', '② Channel hole'), { hole: true })
    + panel(2, L(en, '③ 儲存層與通道', '③ Storage & channel'), { hole: true, fill: true })
    + panel(3, L(en, '④ 階梯', '④ Staircase'), { hole: true, fill: true, stair: true })
    + panel(4, L(en, '⑤ 字元線置換', '⑤ Word line replacement'), { hole: true, fill: true, stair: true, metal: true, contacts: true })
    + swatch(8, '#f1f5f9', L(en, '氧化層', 'Oxide')) + swatch(64, '#94a3b8', L(en, '氮化層', 'Nitride')) + tx(65, 222, L(en, '數百層', 'Hundreds of layers'), 10.5, '#334155')
    + tx(317, 206, L(en, '儲存層 · 通道', 'Storage layer · channel'), 10.5, '#334155')
    + tx(569, 206, L(en, '金屬字元線', 'Metal word lines'), 10.5, '#9a3412') + tx(569, 220, L(en, '每一階接上接觸窗', 'Contacts on each step'), 10.5, '#9a3412');
}

function pitch(en) {
  return `<rect x="70" y="70" width="28" height="90" fill="#bae6fd" stroke="#075985"/><rect x="140" y="70" width="28" height="90" fill="#bae6fd" stroke="#075985"/><rect x="210" y="70" width="28" height="90" fill="#bae6fd" stroke="#075985"/><path d="M84 60 h70" stroke="#0f172a"/><text x="119" y="52" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '閘極間距', 'Gate pitch')}</text><rect x="340" y="78" width="220" height="16" fill="#d9ac73" stroke="#92400e"/><rect x="340" y="120" width="220" height="16" fill="#d9ac73" stroke="#92400e"/><path d="M580 86 v42" stroke="#0f172a"/><text x="560" y="168" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '金屬間距', 'Metal pitch')}</text>`;
}

function inspect(en) {
  // 四格：掃描整片 → 比對相鄰晶粒 → 標出差異的位置（還不知道種類，用同一種中性記號）→ 電子顯微鏡複檢後，分佈圖標出位置和種類
  const wafer = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f8fafc" stroke="#334155"/>${Array.from({ length: 16 }, (_, i) => `<rect x="${cx - 26 + (i % 4) * 13}" y="${cy - 26 + Math.floor(i / 4) * 13}" width="11" height="11" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.5"/>`).join('')}`;
  const die = (x, spot) => `<rect x="${x}" y="80" width="40" height="40" fill="#e2e8f0" stroke="#334155"/><path d="M${x + 8} 92 h24 M${x + 8} 100 h24 M${x + 8} 108 h24" stroke="#475569"/>${spot ? `<circle cx="${x + 24}" cy="100" r="3.5" fill="#0f172a"/><circle cx="${x + 24}" cy="100" r="9" fill="none" stroke="#dc2626" stroke-width="1.5"/>` : ''}`;
  const marks = (cx, cy, shaped) => [[-14, -10], [10, 6], [-4, 18], [16, -16]].map(([dx, dy], i) => {
    const x = cx + dx, y = cy + dy;
    if (!shaped) return `<path d="M${x - 3.5} ${y - 3.5} l7 7 M${x + 3.5} ${y - 3.5} l-7 7" stroke="#0f172a" stroke-width="1.8"/>`;
    if (i % 3 === 0) return `<circle cx="${x}" cy="${y}" r="3.5" fill="#dc2626"/>`;
    return i % 3 === 1 ? `<path d="M${x - 4} ${y + 3} L${x} ${y - 4} L${x + 4} ${y + 3} Z" fill="#b45309"/>` : `<rect x="${x - 3.5}" y="${y - 3.5}" width="7" height="7" fill="#075985"/>`;
  }).join('');
  return tx(80, 26, L(en, '① 掃描', '① Scan'), 13) + wafer(80, 100, 46) + `<path d="M52 78 H108 V91 H52 V104 H108 V117 H52" fill="none" stroke="#0f766e" stroke-width="1.5"/>` + tx(80, 172, L(en, '光學或電子束', 'Light or electron beam'), 11, '#334155')
    + arrow(134, 100, 152, 100)
    + tx(232, 26, L(en, '② 比對相鄰晶粒', '② Compare neighbors'), 13) + die(162, false) + die(212, true) + die(262, false) + tx(232, 150, L(en, '每顆晶粒應該長得一模一樣', 'Every die should look the same'), 10.5, '#334155')
    + arrow(310, 100, 328, 100)
    + tx(384, 26, L(en, '③ 標出差異', '③ Mark differences'), 13) + wafer(384, 100, 46) + marks(384, 100, false) + tx(384, 172, L(en, '差異的位置', 'Where they differ'), 11, '#334155')
    + arrow(438, 100, 456, 100)
    + tx(548, 26, L(en, '④ 複檢', '④ Review'), 13)
    + `<path d="M470 44 h36 l-8 34 h-20 z" fill="#cbd5e1" stroke="#334155"/>` + arrow(494, 80, 538, 92, '#334155') + tx(494, 130, L(en, '電子顯微鏡', 'Electron microscope'), 10.5, '#334155')
    + wafer(580, 100, 40) + marks(580, 100, true) + tx(580, 160, L(en, '缺陷分佈圖', 'Defect map'), 11, '#334155')
    + `<circle cx="478" cy="184" r="3.5" fill="#dc2626"/>${tx(486, 188, L(en, '微粒', 'Particle'), 10.5, '#334155', 'start')}<path d="M526 187 L530 180 L534 187 Z" fill="#b45309"/>${tx(538, 188, L(en, '刮傷', 'Scratch'), 10.5, '#334155', 'start')}<rect x="575" y="180" width="7" height="7" fill="#075985"/>${tx(586, 188, L(en, '橋接', 'Bridge'), 10.5, '#334155', 'start')}`;
}

// 同一組缺陷點分別落在大晶粒與小晶粒的格子上；只計完整落在晶圓內的晶粒，含點的晶粒上色
// 點都離大、小晶粒的格線至少 8 單位，不會看起來同時碰到好幾顆
const YIELD_DEFECTS = [[-60, -20], [-20, -58], [20, -22], [60, -18], [-62, 20], [-18, 22], [60, 22], [-22, 60], [22, 58], [18, -62]];
export function dieHits(dieSize, radius = 90) {
  const cols = Math.floor((radius * 2) / dieSize);
  const start = -cols * dieSize / 2;
  const dies = [];
  for (let r = 0; r < cols; r++) for (let c = 0; c < cols; c++) {
    const x = start + c * dieSize, y = start + r * dieSize;
    const inside = [[x, y], [x + dieSize, y], [x, y + dieSize], [x + dieSize, y + dieSize]].every(([px, py]) => Math.hypot(px, py) <= radius);
    if (!inside) continue;
    const hit = YIELD_DEFECTS.some(([px, py]) => px >= x && px < x + dieSize && py >= y && py < y + dieSize);
    dies.push({ x, y, hit });
  }
  return dies;
}
function yieldMap(en) {
  const side = (cx, dieSize, label) => {
    const dies = dieHits(dieSize);
    const cells = dies.map(d => `<rect x="${cx + d.x}" y="${120 + d.y}" width="${dieSize - 2}" height="${dieSize - 2}" fill="${d.hit ? '#fdba74' : '#99f6e4'}" stroke="#0f766e" stroke-width="0.8"/>`).join('');
    const dots = YIELD_DEFECTS.map(([x, y]) => `<circle cx="${cx + x}" cy="${120 + y}" r="3" fill="#0f172a"/>`).join('');
    return `<circle cx="${cx}" cy="120" r="90" fill="#f8fafc" stroke="#334155"/>${cells}${dots}${tx(cx, 228, label, 13)}`;
  };
  return `<g data-hits-large="${dieHits(40).filter(d => d.hit).length}/${dieHits(40).length}" data-hits-small="${dieHits(20).filter(d => d.hit).length}/${dieHits(20).length}">`
    + side(170, 40, L(en, '大晶粒', 'Large dies')) + side(470, 20, L(en, '小晶粒', 'Small dies'))
    + tx(320, 22, L(en, '同一批缺陷位置 · 不是實際良率', 'Same defect sites · not a measured yield'), 12, '#334155')
    + `<circle cx="282" cy="118" r="5" fill="#fdba74" stroke="#0f766e"/>${tx(292, 122, L(en, '被打中', 'Hit'), 11, '#334155', 'start')}<circle cx="282" cy="138" r="3" fill="#0f172a"/>${tx(292, 142, L(en, '缺陷', 'Defect'), 11, '#334155', 'start')}</g>`;
}

function spc(en) {
  // 三張同尺寸小管制圖：規格界限在最外側，所有點都在規格內；分別示範超出管制界限、同一側、一路往上
  const chart = (x, title, pts, extra) => {
    const px = i => x + 14 + i * 22;
    const line = pts.map((y, i) => `${i ? 'L' : 'M'}${px(i)} ${y}`).join(' ');
    return `<rect x="${x}" y="40" width="196" height="132" fill="#ffffff" stroke="#e2e8f0"/><path d="M${x} 48 H${x + 196} M${x} 164 H${x + 196}" stroke="#94a3b8" stroke-width="1.5"/><path d="M${x} 70 H${x + 196} M${x} 142 H${x + 196}" stroke="#b45309" stroke-dasharray="4 3"/><path d="M${x} 106 H${x + 196}" stroke="#0f766e"/><path d="${line}" fill="none" stroke="#075985" stroke-width="1.5"/>${pts.map((y, i) => `<circle cx="${px(i)}" cy="${y}" r="2.6" fill="#075985"/>`).join('')}${extra(px)}${tx(x + 98, 192, title, 10.5, '#0f172a')}`;
  };
  return `<path d="M24 22 h18" stroke="#0f766e"/>${tx(46, 26, L(en, '中心線', 'Center line'), 11, '#0f766e', 'start')}<path d="M150 22 h18" stroke="#b45309" stroke-dasharray="4 3"/>${tx(172, 26, L(en, '管制界限', 'Control limits'), 11, '#b45309', 'start')}<path d="M290 22 h18" stroke="#94a3b8" stroke-width="1.5"/>${tx(312, 26, L(en, '規格', 'Spec'), 11, '#475569', 'start')}`
    + chart(16, L(en, '有一點超出管制界限', 'One point beyond the control limits'), [104, 112, 98, 108, 60, 102, 110, 100, 106], px => `<circle cx="${px(4)}" cy="60" r="7" fill="none" stroke="#dc2626" stroke-width="1.5"/>`)
    + chart(222, L(en, '連續好幾點落在同一側', 'Several in a row on one side'), [110, 102, 92, 96, 88, 94, 90, 86, 92], px => `<path d="M${px(1) - 4} 80 V76 H${px(8) + 4} V80" fill="none" stroke="#dc2626" stroke-width="1.2"/>`)
    + chart(428, L(en, '連續好幾點一路往上', 'Several in a row rising'), [134, 128, 122, 116, 110, 102, 96, 88, 80], px => arrow(px(1), 150, px(8), 92, '#dc2626', 1.2))
    + tx(320, 222, L(en, '即使每一點都還在規格內，只要「形狀」不對，就值得注意', 'Even when every point is within spec, the wrong shape is worth noticing'), 11.5, '#334155');
}

function cp(en) {
  // 側視：測試機在上，經探針卡往下接觸晶圓；晶圓放在針測機的載台上，由針測機移動
  return `<rect x="200" y="14" width="240" height="38" rx="4" fill="#f8fafc" stroke="#334155"/>${tx(320, 38, L(en, '測試機', 'Tester'), 13)}`
    + `<path d="M320 52 V78" stroke="#334155" stroke-width="5"/>` + arrow(300, 54, 300, 76, '#075985') + tx(294, 70, L(en, '測試訊號', 'Test signals'), 10.5, '#075985', 'end') + arrow(340, 76, 340, 54, '#0f766e') + tx(346, 70, L(en, '晶粒的反應', 'Die response'), 10.5, '#0f766e', 'start')
    + `<rect x="180" y="78" width="280" height="14" rx="7" fill="#e2e8f0" stroke="#334155"/>${tx(174, 90, L(en, '探針卡', 'Probe card'), 12, '#0f172a', 'end')}`
    + Array.from({ length: 7 }, (_, i) => `<path d="M${290 + i * 10} 92 L${296 + i * 8} 110" stroke="#475569"/>`).join('')
    + `<rect x="200" y="110" width="240" height="6" fill="#57bdb3" stroke="#0f766e"/>${tx(446, 122, L(en, '晶圓', 'Wafer'), 12, '#0f172a', 'start')}`
    + `<rect x="230" y="116" width="180" height="26" fill="#cbd5e1" stroke="#64748b"/><rect x="160" y="142" width="320" height="50" fill="#f1f5f9" stroke="#64748b"/>${tx(320, 174, L(en, '針測機', 'Prober'), 13)}`
    + arrow(186, 160, 222, 160, '#334155') + arrow(222, 160, 186, 160, '#334155') + arrow(452, 176, 452, 150, '#334155') + tx(320, 214, L(en, '移動晶圓，讓探針落在焊墊上', 'Moves the wafer so the probes land on the pads'), 11, '#334155')
    + `<circle cx="566" cy="104" r="50" fill="#ffffff" stroke="#94a3b8"/><path d="M520 120 H612" stroke="#0f766e"/>` + [540, 566, 592].map(x => `<rect x="${x - 7}" y="114" width="14" height="6" fill="#d9ac73" stroke="#92400e"/><path d="M${x - 10} 70 L${x} 113" stroke="#475569" stroke-width="1.5"/>`).join('')
    + `<path d="M350 106 L517 96" stroke="#94a3b8" stroke-dasharray="3 3"/>${tx(566, 172, L(en, '焊墊', 'Pads'), 11, '#92400e')}`;
}

function wirebond(en) {
  // 晶粒經黏晶貼在導線架或基板上，金屬線從晶粒焊墊接到導線架或基板，最後封膠
  return `<rect x="70" y="146" width="360" height="28" fill="#a6bdcb" stroke="#334155"/><text x="250" y="164" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '導線架或基板', 'Lead frame or substrate')}</text><rect x="176" y="140" width="128" height="6" fill="#cbd5e1" stroke="#64748b"/><rect x="180" y="100" width="120" height="40" fill="#57bdb3" stroke="#0f766e"/><text x="240" y="124" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '晶粒', 'Die')}</text><path d="M196 100 q-40 -36 -84 46 M284 100 q40 -36 84 46" fill="none" stroke="#9a3412" stroke-width="2"/><path d="M90 70 h320 v110 h-320 z" fill="none" stroke="#64748b" stroke-dasharray="4 3"/><text x="250" y="88" text-anchor="middle" fill="#334155" font-size="12">${L(en, '封膠', 'Mold')}</text>`
    + `<path d="M351 117 L440 98" stroke="#92400e"/>` + tx(446, 102, L(en, '金屬線', 'Wires'), 13, '#92400e', 'start');
}

function flipchip(en) {
  // 晶粒正面朝下，凸塊直接焊在基板上；底部填充填滿晶粒與基板之間的空隙；錫球焊在基板底面
  return `<rect x="80" y="124" width="400" height="26" fill="#a6bdcb" stroke="#334155"/><text x="280" y="142" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '基板', 'Substrate')}</text>${Array.from({ length: 8 }, (_, i) => `<circle cx="${120 + i * 42}" cy="157" r="7" fill="#d9ac73" stroke="#92400e"/>`).join('')}<text x="500" y="161" fill="#92400e" font-size="12">${L(en, '錫球', 'Solder balls')}</text><rect x="170" y="100" width="220" height="24" fill="#fde68a" stroke="#92400e"/><text x="404" y="116" fill="#92400e" font-size="12">${L(en, '底部填充', 'Underfill')}</text><rect x="180" y="64" width="200" height="36" fill="#57bdb3" stroke="#0f766e"/><text x="280" y="86" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '翻轉的晶粒', 'Flipped die')}</text>${Array.from({ length: 5 }, (_, i) => `<rect x="${204 + i * 32}" y="100" width="12" height="24" rx="5" fill="#bae6fd" stroke="#075985"/>`).join('')}`
    + `<path d="M146 112 L203 112" stroke="#075985"/>` + tx(140, 116, L(en, '凸塊', 'Bumps'), 12, '#075985', 'end');
}

function cowos(en) {
  return `<rect x="70" y="160" width="500" height="24" fill="#a6bdcb" stroke="#334155"/><text x="320" y="176" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '基板', 'Substrate')}</text><rect x="110" y="128" width="420" height="24" fill="#fde68a" stroke="#92400e"/><text x="320" y="144" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '中介層', 'Interposer')}</text><rect x="140" y="72" width="160" height="46" fill="#57bdb3" stroke="#0f766e"/><text x="220" y="100" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '處理器', 'Processor')}</text><rect x="340" y="56" width="70" height="20" fill="#99f6e4" stroke="#0f766e"/><rect x="340" y="78" width="70" height="20" fill="#bae6fd" stroke="#075985"/><rect x="340" y="100" width="70" height="20" fill="#99f6e4" stroke="#0f766e"/><text x="450" y="96" fill="#0f172a" font-size="13">HBM</text>`;
}

function bathtub(en) {
  return `<path d="M48 170 v-120 h540" fill="none" stroke="#334155"/><path d="M70 70 C140 70 160 130 230 140 S360 140 420 140 500 80 570 60" fill="none" stroke="#9a3412" stroke-width="2.5"/><text x="110" y="60" fill="#9a3412" font-size="12">${L(en, '早期失效', 'Early')}</text><text x="300" y="128" fill="#0f766e" font-size="12">${L(en, '穩定', 'Stable')}</text><text x="500" y="52" fill="#9a3412" font-size="12">${L(en, '老化', 'Wear-out')}</text><text x="48" y="196" fill="#334155" font-size="12">${L(en, '曲線只有形狀，沒有失效率數字', 'Shape only, no failure-rate numbers')}</text>`;
}

function labeledBox(x, y, w, h, label) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#f8fafc" stroke="#334155"/><text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle" fill="#0f172a" font-size="12">${esc(label)}</text>`;
}

function ocap(en) {
  const labels = [L(en, '異常訊號', 'Signal'), L(en, '先 Hold', 'Hold'), L(en, '找出範圍', 'Scope'), L(en, '判定', 'Decide')];
  const width = 136;
  const gap = 18;
  const top = labels.map((label, index) => {
    const x = 20 + index * (width + gap);
    const arrow = index < labels.length - 1
      ? `<path d="M${x + width + 2} 46 h${gap - 4}" stroke="#0f766e" stroke-width="1.5"/>`
      : '';
    return labeledBox(x, 28, width, 36, label) + arrow;
  }).join('');
  const decide = 20 + 3 * (width + gap) + width / 2;
  const branch = `<path d="M${decide} 64 V84 H88 V100 M${decide} 84 H320 V100 M${decide} 84 H552 V100" fill="none" stroke="#0f766e" stroke-width="1.5"/>`;
  const outcomes = [
    labeledBox(20, 100, 136, 36, L(en, '放行', 'Release')),
    labeledBox(252, 100, 136, 36, L(en, '重工', 'Rework')),
    labeledBox(484, 100, 136, 36, L(en, '報廢', 'Scrap'))
  ].join('');
  const aside = `<text x="320" y="168" text-anchor="middle" fill="#334155" font-size="12">${L(en, '工程變更另外審查，不在這條處置線上', 'An engineering change is reviewed apart from this line')}</text>`;
  return top + branch + outcomes + aside;
}

function fabSystems(en) {
  return flow([
    L(en, '到站', 'Arrive'),
    L(en, '核對路徑', 'Route'),
    L(en, '防呆允許', 'Interlock'),
    L(en, '機台加工', 'Run'),
    L(en, '寫入履歷', 'History')
  ]) + `<text x="320" y="150" text-anchor="middle" fill="#334155" font-size="12">${L(en, '只有先後，沒有節拍或等待時間', 'Order only, no takt time or queue time')}</text>`;
}

function firmware(en) {
  const panel = (x, title, inner) => `<rect x="${x}" y="24" width="192" height="156" rx="6" fill="#f8fafc" stroke="#cbd5e1"/><text x="${x + 96}" y="48" text-anchor="middle" fill="#0f172a" font-size="13">${esc(title)}</text>${inner}`;
  const dram = panel(20, 'DRAM', `<rect x="76" y="78" width="80" height="46" fill="#e0f2fe" stroke="#075985"/><path d="M116 124 v22" stroke="#9a3412" stroke-width="1.5"/><path d="M110 140 h12 l-6 8 z" fill="#9a3412"/><text x="116" y="164" text-anchor="middle" fill="#334155" font-size="12">${L(en, '電荷會漏', 'Charge leaks')}</text>`);
  const hammer = panel(224, L(en, '鄰近列', 'Neighbors'), `<rect x="248" y="70" width="144" height="16" fill="#e2e8f0" stroke="#64748b"/><rect x="248" y="96" width="144" height="16" fill="#fde68a" stroke="#92400e"/><rect x="248" y="122" width="144" height="16" fill="#e2e8f0" stroke="#64748b"/><text x="320" y="156" text-anchor="middle" fill="#334155" font-size="12">${L(en, '中間列被存取', 'Middle row accessed')}</text>`);
  const ecc = panel(428, 'ECC', `${labeledBox(448, 68, 152, 28, L(en, '資料與檢查碼', 'Data and checks'))}<path d="M524 96 v16" stroke="#0f766e" stroke-width="1.5"/>${labeledBox(448, 112, 152, 28, L(en, '訂正後再讀出', 'Corrected read'))}`);
  return dram + hammer + ecc;
}

const SUPPLEMENTS = {
  ch18: {
    zh: '異常之後：先擋下、找出範圍，再放行、重工或報廢',
    en: 'After an abnormality: hold, find the scope, then release, rework, or scrap',
    draw: ocap
  },
  ch23: {
    zh: '晶圓到站之後：核對路徑、防呆允許、機台加工、寫入履歷',
    en: 'After a wafer arrives: check the route, pass the interlock, run the tool, write the history',
    draw: fabSystems
  },
  ch24: {
    zh: '製程留下的三種硬體事實：電荷會漏、鄰近列受擾、錯誤要訂正',
    en: 'Three hardware facts the process leaves behind: charge leaks, neighbor rows are disturbed, errors are corrected',
    draw: firmware
  }
};

// 依序比對，先命中者勝。「晶粒」是很多圖說都會出現的字（缺陷檢測、良率、打線、覆晶），
// 所以 waferDieChip 放在最後，只在沒有更具體的規則命中時才使用（2.14.0 修正）。第三欄是圖高。
const MATCHERS = [
  [/一生|life of a chip/i, life],
  [/剖面示意|cross-section of a fab/i, fabSection],
  [/天車|OHT|FOUP/i, oht],
  [/MOSFET/i, mosfet, 250],
  [/CZ|長晶|crystal growth/i, cz],
  [/攝影|photography compared/i, photoVsLitho],
  [/微影流程|lithography flow/i, lithoFlow],
  [/沉積|deposition methods/i, deposition, 214],
  [/等向|isotropic/i, etch, 240],
  [/佈植機|implanter/i, implanter],
  [/Dishing|Erosion|碟/i, dishing],
  [/CMP 機台|CMP tool/i, cmpTool],
  [/清洗|wet bench/i, clean, 220],
  [/多層金屬|multilevel metal/i, metalStack],
  [/大馬士革|damascene/i, damascene],
  [/FEOL/i, feol],
  [/FinFET|GAA/i, devices],
  [/DRAM/i, dram, 256],
  [/NAND/i, nand],
  [/間距|pitch/i, pitch],
  [/缺陷檢測|defect inspection/i, inspect, 200],
  [/良率|yield difference/i, yieldMap, 240],
  [/管制圖|control chart/i, spc],
  [/CP 測試|CP test/i, cp, 224],
  [/打線|wire-bonded/i, wirebond],
  [/覆晶|flip-chip/i, flipchip, 190],
  [/2\.5D|HBM/i, cowos],
  [/浴缸|bathtub/i, bathtub],
  [/晶粒|die and chip/i, waferDieChip]
];

export function figureForCaption(caption) {
  const en = !/[\u4e00-\u9fff]/.test(caption);
  const draw = MATCHERS.find(([pattern]) => pattern.test(caption));
  const body = draw ? draw[1](en) : flow(caption.split(/→|->|、|，|,/).map(part => part.trim()).filter(Boolean).slice(0, 6));
  return frame(caption, en, body, draw?.[2], draw ? draw[1].name : 'flow');
}

export function replaceFigureComments(html, chapterId = '') {
  let count = 0;
  const swap = (_, kind, body) => {
    count += 1;
    return figureForCaption(body.trim());
  };
  let next = String(html)
    .replace(/<p class="semi-p">\s*<!--\s*(圖：|Figure:)\s*([\s\S]*?)-->\s*<\/p>/g, swap)
    .replace(/<!--\s*(圖：|Figure:)\s*([\s\S]*?)-->/g, swap);
  const supplement = SUPPLEMENTS[chapterId];
  if (count === 0 && supplement) {
    const en = !/[\u4e00-\u9fff]/.test(next.slice(0, 800));
    const figure = frame(en ? supplement.en : supplement.zh, en, supplement.draw(en), undefined, supplement.draw.name);
    const h1 = next.indexOf('</h1>');
    const h2 = next.indexOf('</h2>');
    const cut = h1 >= 0 ? h1 + 5 : (h2 >= 0 ? h2 + 5 : -1);
    next = cut >= 0 ? next.slice(0, cut) + figure + next.slice(cut) : figure + next;
  }
  return next;
}
