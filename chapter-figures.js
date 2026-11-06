export const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const L = (en, zh, enText) => (en ? enText : zh);

// 文字與箭頭小工具：箭頭頭直接畫成三角形，不依賴 <defs>，複製單張 SVG 時也完整
const tx = (x, y, label, size = 12, fill = '#0f172a', anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-size="${size}">${esc(label)}</text>`;
function arrow(x1, y1, x2, y2, color = '#0f766e', width = 1.5) {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 6;
  const p = (r, s) => `${(x2 - h * Math.cos(a + s * r)).toFixed(1)} ${(y2 - h * Math.sin(a + s * r)).toFixed(1)}`;
  return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${color}" stroke-width="${width}" fill="none"/><path d="M${x2} ${y2} L${p(0.45, 1)} L${p(0.45, -1)} Z" fill="${color}"/>`;
}

// sourced：圖內有出自正文的數字時（第 2 階段起，Sam 2026-11-03 核可），改用「依正文數值繪製」標章並寫明數值出處
export function frame(caption, en, body, height = 232, key = '', sourced = null) {
  const badge = sourced ? L(en, '依正文數值繪製', 'Drawn from values in the text') : L(en, '示意 · 未按比例', 'Schematic · not to scale');
  const source = sourced ? (en ? sourced.en : sourced.zh) : L(en, '沒有量測值。名稱取自本章，不另編數字。', 'No measured values. Names come from this chapter. No added numbers.');
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

// 晶圓、晶粒與晶片（2.24.0 改畫，第 3 階段 F 批）：兩片同樣是 300 mm 的晶圓，左邊排大晶粒、右邊排小晶粒，切割道一樣寬，
// 所以小晶粒那片的切割道占比較大；邊緣被切到的格子塗淺灰。右側保留原圖的「晶粒 → 封裝後的晶片」。
// 技術審查修正：顆數只在中間寫一次正文的範圍，不分配給左右兩片；切割道加粗一整條貫穿的橫線；只畫一個缺口
function waferDieChip(en) {
  // 晶粒格以晶圓的圓形裁切，邊緣被切到的格子只留在晶圓內
  const wafer = (cx, cy, r, n) => {
    const street = 2, s = (2 * r) / n, id = `wdc-clip-${n}`;
    let out = `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath><circle cx="${cx}" cy="${cy}" r="${r}" fill="#e2e8f0" stroke="#334155" stroke-width="1.4"/><g clip-path="url(#${id})">`;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const x = cx - r + i * s, y = cy - r + j * s, corners = [[x, y], [x + s, y], [x, y + s], [x + s, y + s]].map(([px, py]) => Math.hypot(px - cx, py - cy) <= r - 1);
      if (!corners.some(Boolean)) continue;
      const full = corners.every(Boolean);
      out += `<rect x="${(x + street / 2).toFixed(1)}" y="${(y + street / 2).toFixed(1)}" width="${(s - street).toFixed(1)}" height="${(s - street).toFixed(1)}" fill="${full ? '#99f6e4' : '#cbd5e1'}" stroke="${full ? '#0f766e' : '#94a3b8'}" stroke-width=".5"/>`;
    }
    return out + `</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#334155" stroke-width="1.4"/><path d="M${cx - 4} ${cy + r - 0.5} l4 -5 4 5" fill="#ffffff" stroke="#334155"/>`;
  };
  // 左片約幾十顆、右片約數百顆（F1 審查修正：原本左片只有 4 顆，低於正文的「幾十顆」）
  const r = 72, c1 = 90, c2 = 256, cy = 92, s2 = (2 * r) / 18;
  const sy = cy - r + 9 * s2;
  return wafer(c1, cy, r, 8) + wafer(c2, cy, r, 18)
    // 右片：一整條貫穿晶圓的橫向切割道加粗
    + `<path d="M${(c2 - Math.sqrt(r * r - (sy - cy) ** 2)).toFixed(1)} ${sy} H${(c2 + Math.sqrt(r * r - (sy - cy) ** 2)).toFixed(1)}" stroke="#9a3412" stroke-width="2"/>`
    + `<path d="M${c2 + 52} ${sy} L${c2 + 92} ${sy - 46}" stroke="#64748b" stroke-dasharray="2 2"/>` + tx(c2 + 94, sy - 50, L(en, '切割道', 'Scribe lines'), 11, '#9a3412', 'start')
    + tx(c1, cy + r + 18, L(en, '300 mm 晶圓', '300 mm wafer'), 11.5, '#0f172a') + tx(c2, cy + r + 18, L(en, '300 mm 晶圓', '300 mm wafer'), 11.5, '#0f172a')
    // 顆數範圍只寫一次，用一個跨兩片的括號，不分配給左右任何一片
    + `<path d="M${c1 - r} ${cy + r + 26} v5 H${c2 + r} v-5" fill="none" stroke="#0f766e" stroke-width="1.2"/>`
    + (en ? tx((c1 + c2) / 2, cy + r + 46, 'Anything from a few dozen to tens of thousands', 11, '#0f766e') + tx((c1 + c2) / 2, cy + r + 60, 'of dies, depending on the die size', 11, '#0f766e')
      : tx((c1 + c2) / 2, cy + r + 48, '幾十顆到上萬顆晶粒', 12, '#0f766e') + tx((c1 + c2) / 2, cy + r + 64, '數量取決於晶粒的大小', 11, '#334155'))
    // 右側：沿切割道切開 → 一顆晶粒 → 封裝起來就是晶片
    + `<path d="M342 ${cy} h22" stroke="#0f766e" stroke-width="1.5"/><path d="M364 ${cy} l-6 -4 v8 z" fill="#0f766e"/>`
    + `<rect x="376" y="${cy - 30}" width="60" height="60" fill="#57bdb3" stroke="#0f766e"/>` + tx(406, cy + 48, L(en, '晶粒（Die）', 'Die'), 12, '#0f172a')
    + `<path d="M448 ${cy} h22" stroke="#0f766e" stroke-width="1.5"/><path d="M470 ${cy} l-6 -4 v8 z" fill="#0f766e"/>`
    + `<rect x="482" y="${cy - 2}" width="140" height="34" fill="#a6bdcb" stroke="#334155"/><rect x="516" y="${cy - 22}" width="72" height="20" fill="#57bdb3" stroke="#0f766e"/>`
    + tx(552, cy + 48, L(en, '封裝後的晶片', 'Packaged chip'), 12, '#0f172a');
}

// 多行標籤：第一行是層名，其餘是說明（章節圖不帶斷行工具，各語言分行寫好）
const lines = (x, y, rows, first = '#0f766e') => rows.map((row, i) => tx(x, y + i * 14, row, i === 0 ? 12.5 : 10.5, i === 0 ? first : '#334155', 'start')).join('');

// 晶圓廠三層剖面（2.18.0 改畫，A 批）：上層風扇把空氣經天花板濾網送進中層無塵室，下層管線穿過有孔地板接到機台。
// 「其他空間都在服務它」由上層與下層各一個箭頭指向中層，不用跨三層的括號（技術審查修正：括號會把無塵室也框進「其他空間」）
function fabSection(en) {
  const fan = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="13" fill="#ffffff" stroke="#075985" stroke-width="1.3"/><path d="M${cx} ${cy} q-2 -10 6 -10 M${cx} ${cy} q10 -2 10 6 M${cx} ${cy} q2 10 -6 10 M${cx} ${cy} q-10 2 -10 -6" fill="none" stroke="#075985" stroke-width="1.3"/>`;
  const tool = x => `<rect x="${x}" y="130" width="52" height="54" rx="4" fill="#f8fafc" stroke="#334155" stroke-width="1.3"/><rect x="${x + 8}" y="138" width="22" height="14" rx="1" fill="#e0f2fe" stroke="#075985"/>`;
  return `<rect x="20" y="16" width="460" height="246" rx="4" fill="#ffffff" stroke="#334155" stroke-width="1.6"/>`
    // 上層：空調與過濾
    + `<rect x="20" y="16" width="460" height="76" rx="4" fill="#e0f2fe" stroke="none"/>` + [230, 300, 370, 440].map(x => fan(x, 52)).join('')
    + lines(32, 36, en ? ['Top level', 'Air-handling and', 'filtration system that', 'sends clean air downward'] : ['上層', '空調與過濾系統', '把乾淨的空氣送下來'])
    // 天花板濾網
    + `<rect x="20" y="92" width="460" height="8" fill="#ffffff" stroke="#0f766e"/>${Array.from({ length: 45 }, (_, i) => `<path d="M${26 + i * 10} 92 v8" stroke="#0f766e" stroke-width=".8"/>`).join('')}`
    + tx(176, 89, L(en, '濾網', 'Filters'), 10, '#0f766e', 'start')
    // 中層：無塵室，空氣一路往下吹
    + `<rect x="20" y="100" width="460" height="84" fill="#f0fdfa" stroke="none"/>` + tool(214) + tool(294) + tool(374)
    + `<rect x="268" y="166" width="26" height="4" fill="#cbd5e1" stroke="#334155"/><rect x="270" y="148" width="22" height="18" rx="2" fill="#99f6e4" stroke="#334155"/><path d="M291 150 v14" stroke="#0f766e" stroke-width="2"/>`
    + [200, 280, 360, 440].map(x => arrow(x, 104, x, 124, '#5eead4', 1.4)).join('') + [230, 300, 370, 440].map(x => arrow(x, 66, x, 88, '#075985', 1.4)).join('')
    + lines(32, 120, en ? ['Middle level', 'The cleanroom, where', 'the tools and wafers are'] : ['中層', '無塵室', '機台和晶圓都在這裡'])
    // 有孔的地板
    + `<path d="M20 187 H480" stroke="#64748b" stroke-width="6" stroke-dasharray="6 4"/>`
    // 下層：管線、真空幫浦、化學品供應
    + `<rect x="20" y="190" width="460" height="72" rx="4" fill="#f1f5f9" stroke="none"/>`
    + `<path d="M190 212 H470 M190 224 H470" stroke="#92400e" stroke-width="3" stroke-linecap="round"/>` + [240, 320, 400].map(x => `<path d="M${x} 212 V184" stroke="#92400e" stroke-width="2.4"/>`).join('')
    + `<circle cx="214" cy="244" r="11" fill="#ffffff" stroke="#334155" stroke-width="1.3"/><path d="M214 244 l7 -4 M214 244 l-7 -4 M214 244 v8" stroke="#334155" stroke-width="1.3"/><path d="M214 233 V224" stroke="#334155" stroke-width="1.6"/>`
    + `<rect x="430" y="230" width="18" height="26" rx="4" fill="#fef3c7" stroke="#92400e"/><rect x="452" y="230" width="18" height="26" rx="4" fill="#fef3c7" stroke="#92400e"/><path d="M439 230 V224 M461 230 V224" stroke="#92400e" stroke-width="1.6"/>`
    + lines(32, 208, en ? ['Bottom level', 'Piping, vacuum pumps and', 'chemical supply equipment', 'that support the tools above'] : ['下層', '管線、真空幫浦', '和化學品供應設備', '支援上面的機台'])
    // 其他空間都在服務中層的無塵室
    + `<path d="M484 54 C 520 54, 524 132, 488 138" fill="none" stroke="#9d174d" stroke-width="1.6"/><path d="M488 138 l7 -5 l1 8 z" fill="#9d174d"/>`
    + `<path d="M484 226 C 520 226, 524 150, 488 146" fill="none" stroke="#9d174d" stroke-width="1.6"/><path d="M488 146 l8 -2 l-3 7 z" fill="#9d174d"/>`
    + lines(526, 132, en ? ['Everything else', 'is there to serve it'] : ['其他空間', '都在「服務」它'], '#9d174d');
}

// 天車、倉儲與 Load Port 在同一張圖（2.18.0 改畫，A 批）：天車在天花板軌道上，把 FOUP 放到機台前方的 Load Port；
// FOUP 內晶圓水平疊放，前門朝向機台；重量照正文寫成「裝滿的 FOUP」（技術審查修正）。
// 圖內有正文的重量與片數，所以用「依正文數值繪製」標章（MATCHERS 第四欄）
function oht(en) {
  const foup = (x, y, door = true) => `<rect x="${x}" y="${y}" width="44" height="36" rx="4" fill="#f8fafc" stroke="#334155" stroke-width="1.4"/><path d="M${x + 12} ${y} v-5 h20 v5" fill="none" stroke="#334155" stroke-width="1.4"/>`
    + [8, 15, 22, 29].map(dy => `<path d="M${x + 5} ${y + dy} h${door ? 31 : 34}" stroke="#0f766e" stroke-width="1.6"/>`).join('')
    + (door ? `<path d="M${x + 42} ${y + 3} v30" stroke="#0f766e" stroke-width="3.5"/>` : '');
  return `<path d="M60 34 H604" stroke="#334155" stroke-width="5" stroke-linecap="round"/>${[150, 300, 450, 590].map(x => `<path d="M${x} 16 V31" stroke="#94a3b8" stroke-width="1.5"/>`).join('')}`
    // 倉儲：多格儲位，暫放等待中的 FOUP
    + `<rect x="20" y="40" width="114" height="180" rx="4" fill="#f1f5f9" stroke="#334155" stroke-width="1.4"/>` + [84, 128, 172].map(y => `<path d="M24 ${y} H130" stroke="#94a3b8"/>`).join('') + `<path d="M77 44 V216" stroke="#94a3b8"/>`
    + [[28, 46], [80, 90], [28, 134], [80, 178], [28, 178]].map(([x, y]) => foup(x, y, false)).join('')
    + `<path d="M77 34 V40" stroke="#334155" stroke-width="2"/>`
    + lines(20, 238, en ? ['Stocker', 'Temporarily stores', 'FOUPs that are waiting'] : ['倉儲（Stocker）', '暫時存放還在', '等待的 FOUP'])
    // 天車在軌道上，吊帶把 FOUP 往下放到 Load Port
    + `<rect x="396" y="36" width="64" height="24" rx="4" fill="#bae6fd" stroke="#075985" stroke-width="1.4"/><path d="M410 60 V92 M446 60 V92" stroke="#334155" stroke-width="1.2"/><rect x="404" y="90" width="48" height="6" rx="1" fill="#075985"/>`
    + foup(406, 100) + arrow(468, 106, 468, 160, '#075985', 1.4)
    + (en ? ['Overhead hoist', 'transport (OHT)'] : ['天車（OHT）']).map((row, i) => tx(476, 54 + i * 14, row, 12.5, '#0f766e', 'start')).join('')
    + (en ? ['Vehicles that run on', 'rails in the ceiling'] : ['在天花板的軌道', '上行駛']).map((row, i) => tx(476, (en ? 84 : 70) + i * 14, row, 10.5, '#334155', 'start')).join('')
    // 機台與 Load Port：FOUP 前門朝向機台
    + `<rect x="486" y="118" width="134" height="104" rx="6" fill="#f8fafc" stroke="#334155" stroke-width="1.4"/><rect x="500" y="130" width="40" height="24" rx="2" fill="#e0f2fe" stroke="#075985"/><path d="M486 160 h-8" stroke="#334155"/>` + tx(553, 202, L(en, '機台', 'Tool'), 12, '#334155')
    + `<rect x="396" y="172" width="90" height="8" rx="1" fill="#cbd5e1" stroke="#334155"/><path d="M402 180 V222 M478 180 V222" stroke="#334155" stroke-width="1.4"/>`
    + `<rect x="406" y="136" width="44" height="36" rx="4" fill="none" stroke="#0f766e" stroke-width="1.2" stroke-dasharray="4 3"/>`
    + lines(250, 196, en ? ['Load port', 'The platform at the', 'front of a tool'] : ['Load Port', '機台前方放 FOUP', '的平台'])
    + `<path d="M330 192 L394 177" stroke="#94a3b8" stroke-dasharray="2 2"/>`
    + (en ? ['A full FOUP weighs', 'about eight kilograms,', 'holding up to 25 wafers'] : ['裝滿的 FOUP', '大約有八公斤重，', '一盒最多 25 片']).map((row, i) => tx(326, 132 + i * 14, row, 10.5, '#334155', 'end')).join('')
    + `<path d="M332 128 H402" stroke="#94a3b8" stroke-dasharray="2 2"/>`;
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

// 長晶（2.25.0 改畫，第 3 階段 F 批）：同一個坩堝畫成四格，依正文的四個步驟：加熱熔化 → 晶種接觸液面 → 一邊旋轉一邊往上拉 → 拉出整根晶棒。
// 圖說來自正文註解（坩堝、熔融矽、晶種、旋轉上拉的晶棒），不改。技術審查修正：拉晶時晶棒底部貼著液面；整根提出後坩堝底還剩一些熔融的矽；
// 頸部、肩部不標；溫度、直徑、長度與重量照正文寫，不畫尺寸線，所以用「依正文數值繪製」標章（MATCHERS 第四欄）
function cz(en) {
  const base = 196, rim = 140, X = i => 16 + i * 154, C = i => X(i) + 72;
  const crucible = (cx, surface) => `<rect x="${cx - 45}" y="${surface}" width="90" height="${base - surface - 1}" fill="#fde68a"/><path d="M${cx - 46} ${rim} V${base} H${cx + 46} V${rim}" fill="none" stroke="#334155" stroke-width="2"/>`;
  const rod = (cx, y) => `<path d="M${cx} 12 V${y}" stroke="#334155" stroke-width="1.6"/>`;
  const seed = (cx, y) => `<rect x="${cx - 5}" y="${y}" width="10" height="10" fill="#99f6e4" stroke="#0f766e"/>`;
  // 晶棒：晶種 → 細頸 → 肩部 → 圓柱；tail 為 true 時尾端收成錐形
  const ingot = (cx, y, body, tail) => seed(cx, y) + `<path d="M${cx - 1.5} ${y + 10} V${y + 20} L${cx - 17} ${y + 36} V${y + 36 + body}${tail ? ` L${cx} ${y + 52 + body} L${cx + 17} ${y + 36 + body}` : ` H${cx + 17}`} V${y + 36} L${cx + 1.5} ${y + 20} V${y + 10} Z" fill="#cbd5e1" stroke="#334155"/>`;
  const under = (cx, y, rows, color = '#334155', size = 10.5) => rows.map((row, i) => tx(cx, y + i * 14, row, size, color)).join('');
  let svg = '';
  // 加熱到 1,400 °C 以上熔化：坩堝兩側畫加熱線圈
  svg += crucible(C(0), 156) + [-54, 54].map(dx => `<path d="M${C(0) + dx} 146 ${[0, 1, 2, 3, 4, 5].map(k => `l${k % 2 ? 5 : -5} 7`).join(' ')}" fill="none" stroke="#9a3412" stroke-width="1.5"/>`).join('')
    + tx(C(0), 112, L(en, '1,400 °C 以上', 'Above 1,400 °C'), 12, '#9a3412') + [-14, 0, 14].map(dx => `<path d="M${C(0) + dx} 134 q-3 -4 0 -8 q3 -4 0 -8" fill="none" stroke="#9a3412" stroke-width="1.1"/>`).join('')
    + tx(C(0), 182, L(en, '熔化的矽', 'Molten silicon'), 10.5, '#0f172a') + tx(C(0), 214, L(en, '石英坩堝', 'Quartz crucible'), 11, '#334155')
    // 摻雜框：英文照正文補上 small amounts（F2 審查修正）
    + `<rect x="${X(0) + 6}" y="226" width="132" height="${en ? 66 : 52}" rx="6" fill="#f0fdfa" stroke="#0f766e"/>`
    + under(C(0), 242, en ? ['Small amounts of', 'boron or phosphorus'] : ['加入少量硼或磷'], '#0f766e', 10) + under(C(0), en ? 272 : 258, en ? ['Boron → P-type', 'Phosphorus → N-type'] : ['硼 → P 型', '磷 → N 型'], '#0f172a', 10.5);
  // 晶種輕輕接觸熔化的矽（F2 審查修正：英文「Seed crystal」寫成同一行，不拆成標題加註解）
  svg += crucible(C(1), 156) + rod(C(1), 146) + seed(C(1), 146) + `<path d="M${C(1) + 7} 150 L${C(1) + 14} 132" stroke="#64748b" stroke-dasharray="2 2"/>`
    + tx(C(1) + 8, 126, L(en, '晶種', 'Seed crystal'), en ? 10.5 : 12, '#0f766e', 'start') + under(C(1), 214, en ? ['Gently touches', 'the molten silicon'] : ['輕輕接觸熔化的矽']);
  // 一邊旋轉、一邊非常緩慢地往上拉：晶棒底部貼著液面
  svg += crucible(C(2), 166) + rod(C(2), 70) + ingot(C(2), 70, 60, false)
    + `<path d="M${C(2) - 24} 100 a24 7 0 0 0 48 0" fill="none" stroke="#0f766e" stroke-width="1.5"/><path d="M${C(2) + 24} 100 l-2 -6 l-4 5 z" fill="#0f766e"/>` + arrow(C(2) + 36, 132, C(2) + 36, 72, '#0f766e', 2)
    + under(C(2), 214, en ? ['Rotated and pulled', 'upward very slowly'] : ['一邊旋轉、一邊', '非常緩慢地往上拉']);
  // 最後拉出一根圓柱狀的單晶晶棒；坩堝底還剩一些熔融的矽
  // 晶棒尾端要高過坩堝口，才看得出整根已經提出（F2 審查修正）
  svg += crucible(C(3), 188) + rod(C(3), 16) + ingot(C(3), 16, 66, true)
    + under(C(3), 214, en ? ['Cylindrical', 'single-crystal ingot'] : ['圓柱狀的單晶晶棒'], '#0f172a', 11)
    + under(C(3), en ? 248 : 236, en ? ['A 300 mm ingot:', 'about two meters long,', 'several hundred kilograms'] : ['300 mm 晶棒', '長達兩公尺左右', '重達數百公斤'], '#334155', 10);
  // 步驟之間的箭頭
  svg += [0, 1, 2].map(i => arrow(C(i) + 60, 176, C(i + 1) - 54, 176, '#0f766e', 1.5)).join('');
  return svg;
}

// 粗體文字（章節圖用）
const tb = (x, y, label, size = 12, fill = '#0f172a', anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-size="${size}" font-weight="700">${esc(label)}</text>`;
// 多行置中文字（章節圖用）
const rowsAt = (x, y, rows, size = 10.5, fill = '#334155', anchor = 'middle', gap = 13) => rows.map((row, i) => tx(x, y + i * gap, row, size, fill, anchor)).join('');

// 攝影與微影（2.26.0 改畫，第 3 階段 G 批）：上列是攝影（光源 → 底片 → 鏡頭 → 相紙），下列是微影（光源 → 光罩 → 鏡頭 → 光阻）。
// 技術審查修正：「光 → 底片 → 鏡頭 → 相紙」是暗房放相的順序，不畫成相機外框、也不畫收斂；下列鏡頭之後光束收斂到光阻，
// 光罩上的圖形畫得比光阻上的大（縮小投影）；括號框住下列的光路，標「曝光機就像相機」。圖說來自正文註解，沒有改
function photoVsLitho(en) {
  const cx = [150, 270, 390, 520], y1 = 66, y2 = 184;
  const sun = (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="#fde68a" stroke="#92400e"/>` + Array.from({ length: 8 }, (_, k) => { const a = (k * Math.PI) / 4; return `<path d="M${(x + 12 * Math.cos(a)).toFixed(1)} ${(y + 12 * Math.sin(a)).toFixed(1)} L${(x + 17 * Math.cos(a)).toFixed(1)} ${(y + 17 * Math.sin(a)).toFixed(1)}" stroke="#92400e" stroke-width="1.4"/>`; }).join('');
  const lens = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="24" fill="#e0f2fe" stroke="#075985" stroke-width="1.4"/>`;
  const film = (x, y) => `<rect x="${x - 22}" y="${y - 16}" width="44" height="32" rx="2" fill="#475569"/>` + [-16, -6, 4, 14].map(d => `<rect x="${x + d}" y="${y - 14}" width="4" height="3" fill="#ffffff"/><rect x="${x + d}" y="${y + 11}" width="4" height="3" fill="#ffffff"/>`).join('') + `<rect x="${x - 12}" y="${y - 8}" width="24" height="16" fill="#cbd5e1"/>`;
  const paper = (x, y) => `<path d="M${x - 17} ${y - 20} H${x + 9} L${x + 17} ${y - 12} V${y + 20} H${x - 17} Z" fill="#ffffff" stroke="#334155"/><path d="M${x + 9} ${y - 20} V${y - 12} H${x + 17}" fill="none" stroke="#334155"/><rect x="${x - 11}" y="${y - 6}" width="22" height="16" fill="#cbd5e1"/>`;
  const bars = (x, y, w, h, c) => [0.1, 0.45, 0.8].map(f => `<rect x="${(x + f * w - w * 0.05).toFixed(1)}" y="${y}" width="${(w * 0.1).toFixed(1)}" height="${h}" fill="${c}"/>`).join('');
  let svg = tb(24, y1 + 5, L(en, '攝影', 'Photography'), 13, '#0f172a', 'start') + tb(24, y2 + 5, L(en, '微影', 'Lithography'), 13, '#0f766e', 'start')
    + rowsAt(24, y2 + 24, en ? ['Lithography uses', 'the same order'] : ['微影用同一順序'], 10, '#334155', 'start');
  // 上列：攝影，只用箭頭連起四件
  svg += sun(cx[0], y1) + film(cx[1], y1) + lens(cx[2], y1) + paper(cx[3], y1)
    + [0, 1, 2].map(i => arrow(cx[i] + 26, y1, cx[i + 1] - 28, y1, '#334155', 1.3)).join('')
    + [L(en, '光源', 'Light'), L(en, '底片', 'Film negative'), L(en, '鏡頭', 'Lens'), L(en, '相紙', 'Photo paper')].map((s, i) => tx(cx[i], y1 + 42, s, 11.5, '#0f172a')).join('');
  // 下列：微影；鏡頭之後光束收斂，光阻上的圖形比光罩上的小
  svg += sun(cx[0], y2) + `<rect x="${cx[1] - 22}" y="${y2 - 22}" width="44" height="44" rx="2" fill="#f1f5f9" stroke="#334155"/>` + bars(cx[1] - 16, y2 - 16, 32, 32, '#334155') + lens(cx[2], y2)
    + `<path d="M${cx[2] + 6} ${y2 - 20} L${cx[3] - 6} ${y2 - 9} V${y2 + 9} L${cx[2] + 6} ${y2 + 20} Z" fill="#fde68a" fill-opacity=".45"/>`
    + `<rect x="${cx[3] - 6}" y="${y2 - 30}" width="6" height="60" fill="#e1ad70" stroke="#92400e"/><rect x="${cx[3]}" y="${y2 - 30}" width="12" height="60" fill="#a6bdcb" stroke="#334155"/>` + `<g transform="rotate(90 ${cx[3] - 3} ${y2})">${bars(cx[3] - 12, y2 - 2, 18, 4, '#92400e')}</g>`
    + [0, 1].map(i => arrow(cx[i] + 26, y2, cx[i + 1] - 28, y2, '#0f766e', 1.3)).join('')
    + [L(en, '光源', 'Light'), L(en, '光罩', 'Mask'), L(en, '鏡頭', 'Lens'), L(en, '光阻', 'Photoresist')].map((s, i) => tx(cx[i], y2 + 46, s, 11.5, '#0f172a')).join('')
    + tx(cx[3] + 18, y2 + 4, L(en, '晶圓', 'Wafer'), 10, '#334155', 'start');
  // 兩列之間：光罩就像底片、光阻就像相紙
  svg += `<path d="M${cx[1]} ${y1 + 50} V${y2 - 28} M${cx[3]} ${y1 + 50} V${y2 - 34}" stroke="#64748b" stroke-dasharray="3 3"/>`
    + rowsAt(cx[1] + 8, y1 + 68, en ? ['The mask is like', 'the film negative'] : ['光罩就像底片'], 10.5, '#0f766e', 'start')
    + rowsAt(cx[3] - 8, y1 + 68, en ? ['The photoresist is', 'like photo paper'] : ['光阻就像相紙'], 10.5, '#0f766e', 'end');
  // 下列光路的括號：曝光機就像相機；光阻：照到光的地方會起化學變化
  const by = y2 + 58;
  svg += `<path d="M${cx[0] - 24} ${by} v6 H${cx[2] + 24} v-6" fill="none" stroke="#0f766e" stroke-width="1.3"/>`
    + `<rect x="${(cx[0] + cx[2]) / 2 - 84}" y="${by + 12}" width="20" height="13" rx="2" fill="#ffffff" stroke="#0f766e"/><circle cx="${(cx[0] + cx[2]) / 2 - 74}" cy="${by + 18.5}" r="4" fill="none" stroke="#0f766e"/><rect x="${(cx[0] + cx[2]) / 2 - 80}" y="${by + 9}" width="7" height="3" fill="#0f766e"/>`
    + tb((cx[0] + cx[2]) / 2 - 58, by + 23, L(en, '曝光機就像相機', 'The scanner is like the camera'), 11.5, '#0f766e', 'start')
    + tx((cx[0] + cx[2]) / 2, by + 40, L(en, '把光罩上的圖形縮小投影到晶圓上', 'projecting a reduced image of the mask onto the wafer'), 10.5, '#334155')
    + `<path d="M${(cx[0] + cx[2]) / 2 + (en ? 152 : 82)} ${by + 36} L${(cx[2] + cx[3]) / 2} ${y2 + 10}" stroke="#64748b" stroke-dasharray="2 2"/>`
    + rowsAt(cx[3], by + 2, en ? ['Changing chemically', 'wherever light hits it'] : ['照到光的地方', '會起化學變化'], 10.5, '#92400e');
  return svg;
}

// 微影流程（2.26.0 改畫，第 3 階段 G 批）：上帶是正文的七個步驟，括號標出塗佈到顯影由同一組機台連著曝光機做；
// 檢查不合格就重工回到塗佈，一旦進入蝕刻就無法重來；下帶保留塗佈、曝光、顯影三格剖面，以圈字母對到上帶。
// 技術審查修正：拿掉貼在光阻上的光罩條（看起來像一比一接觸曝光），改成鏡頭把光收斂到受光區；拿掉 ①②③ 編號。圖說來自正文註解，沒有改
function lithoFlow(en) {
  const w = 80, gap = 8, xs = Array.from({ length: 7 }, (_, i) => 16 + i * (w + gap)), c = i => xs[i] + w / 2, top = 40;
  const names = en ? [['Surface prep'], ['Resist coat'], ['Soft bake'], ['Align and', 'expose'], ['Post-exposure', 'bake'], ['Develop'], ['Inspect (ADI)']] : [['表面處理'], ['塗佈光阻'], ['軟烤'], ['對準與曝光'], ['曝後烤'], ['顯影'], ['檢查（ADI）']];
  const wafer = (x, y) => `<rect x="${x - 18}" y="${y}" width="36" height="5" rx="1" fill="#a6bdcb" stroke="#334155" stroke-width=".8"/>`;
  const heat = (x, y) => `<rect x="${x - 20}" y="${y + 5}" width="40" height="4" fill="#9a3412"/>` + [-10, 0, 10].map(d => `<path d="M${x + d} ${y - 2} q-2 -3 0 -6 q2 -3 0 -6" fill="none" stroke="#9a3412" stroke-width=".9"/>`).join('');
  const icons = [
    (x, y) => wafer(x, y + 16) + [-12, -4, 4, 12, -8, 8].map((d, k) => `<circle cx="${x + d}" cy="${y + (k > 3 ? 4 : 10)}" r="1.4" fill="#64748b"/>`).join(''),
    (x, y) => wafer(x, y + 16) + `<rect x="${x - 18}" y="${y + 13}" width="36" height="3" fill="#e1ad70"/><path d="M${x} ${y} c-3 4 -3 7 0 7 s3 -3 0 -7" fill="#e1ad70" stroke="#92400e" stroke-width=".8"/><path d="M${x - 14} ${y + 24} a14 4 0 0 0 28 0" fill="none" stroke="#0f766e"/>`,
    (x, y) => wafer(x, y + 10) + heat(x, y + 10),
    (x, y) => wafer(x, y + 16) + `<rect x="${x - 18}" y="${y + 13}" width="36" height="3" fill="#e1ad70"/>` + [-6, 0, 6].map(d => arrow(x + d, y, x + d, y + 11, '#d97706', 1.2)).join(''),
    (x, y) => wafer(x, y + 10) + heat(x, y + 10),
    (x, y) => wafer(x, y + 16) + `<rect x="${x - 6}" y="${y}" width="12" height="5" fill="#334155"/>` + [-6, 0, 6].map(d => `<circle cx="${x + d}" cy="${y + 10}" r="1.3" fill="#075985"/>`).join(''),
    (x, y) => wafer(x, y + 16) + `<circle cx="${x + 2}" cy="${y + 6}" r="6" fill="none" stroke="#0f766e" stroke-width="1.6"/><path d="M${x + 6} ${y + 10} l5 5" stroke="#0f766e" stroke-width="2"/>`
  ];
  const mk = (x, y, letter) => `<circle cx="${x}" cy="${y}" r="8" fill="#ffffff" stroke="#0f766e"/><text x="${x}" y="${y + 3.5}" text-anchor="middle" fill="#0f766e" font-size="10" font-weight="700">${letter}</text>`;
  let svg = '';
  // 括號：塗佈到顯影由同一組機台連著曝光機
  svg += `<path d="M${xs[1]} 33 v-5 H${xs[5] + w} v5" fill="none" stroke="#0f766e" stroke-width="1.3"/>`
    + rowsAt(c(3), en ? 12 : 22, en ? ['The track, which handles coating and developing,', 'is connected directly to the scanner'] : ['負責塗佈和顯影的機台會和曝光機直接相連'], 10.5, '#0f766e');
  xs.forEach((x, i) => {
    svg += `<rect x="${x}" y="${top}" width="${w}" height="58" rx="6" fill="#f8fafc" stroke="#334155"/>` + icons[i](c(i), top + 6)
      + rowsAt(c(i), top + 42, names[i], 10, '#0f172a', 'middle', 11);
    if (i < 6) svg += `<path d="M${x + w} ${top + 29} h${gap}" stroke="#0f766e" stroke-width="1.4"/>`;
  });
  svg += mk(xs[1] + 11, top + 11, 'A') + mk(xs[3] + 11, top + 11, 'B') + mk(xs[5] + 11, top + 11, 'C');
  // 重工：檢查不合格，回到塗佈；出口：蝕刻
  svg += `<path d="M${c(6) - 14} ${top + 58} V${top + 72} H${c(1)} V${top + 60}" fill="none" stroke="#9a3412" stroke-width="1.5"/>` + arrow(c(1), top + 66, c(1), top + 59, '#9a3412', 1.5)
    // 重工：說明靠左貼著迴圈，第三行補正文的理由「底下的材料還沒被動過」（G1 審查修正）；蝕刻出口往下移，讓出空間
    + tb(c(1) + 8, top + 88, 'Rework', 11.5, '#9a3412', 'start') + tx(c(1) + 8, top + 102, L(en, '把光阻全部去掉，重新塗佈、曝光', 'Strip off all the photoresist and coat and expose the wafer again'), 10.5, '#9a3412', 'start')
    + tx(c(1) + 8, top + 115, L(en, '底下的材料還沒被動過', 'The material underneath has not been touched'), 10, '#64748b', 'start')
    + `<path d="M${c(6) + 16} ${top + 58} V${top + 120}" stroke="#64748b" stroke-width="1.4"/>` + arrow(c(6) + 16, top + 112, c(6) + 16, top + 121, '#64748b', 1.4)
    + `<rect x="${xs[6] + 8}" y="${top + 122}" width="${w - 8}" height="22" rx="4" fill="#e2e8f0" stroke="#64748b"/>` + tx(c(6) + 4, top + 137, L(en, '蝕刻', 'Etching'), 10.5, '#334155')
    + rowsAt(xs[6] + 2, top + 134, en ? ['Once the wafer goes through etching, the wrong pattern', 'is permanently carved into the material'] : ['一旦進入蝕刻，錯誤的圖形就會永久刻進材料裡'], 10, '#64748b', 'end');
  // 下帶：塗佈、曝光、顯影三格剖面，以圈字母對到上帶
  const sy = top + 172, pw = 150;
  const panel = (i, stage, letter) => {
    const x = c(i) - pw / 2;
    let out = `<rect x="${x}" y="${sy + 26}" width="${pw}" height="26" fill="#a6bdcb" stroke="#334155"/>` + mk(x - 2, sy - 8, letter);
    if (stage === 'develop') out += `<rect x="${x}" y="${sy}" width="56" height="26" fill="#e1ad70" stroke="#92400e"/><rect x="${x + 94}" y="${sy}" width="56" height="26" fill="#e1ad70" stroke="#92400e"/>`;
    else out += `<rect x="${x}" y="${sy}" width="${pw}" height="26" fill="#e1ad70" stroke="#92400e"/>`;
    if (stage === 'coat') out += tx(x + 75, sy + 17, L(en, '光阻', 'Resist'), 11) + tx(x + 75, sy + 44, L(en, '底下的材料', 'Material underneath'), 11);
    if (stage === 'expose') out += `<rect x="${x + 56}" y="${sy}" width="38" height="26" fill="#fef3c7" stroke="#92400e" stroke-dasharray="3 2"/><path d="M${x + 40} ${sy - 24} L${x + 56} ${sy} H${x + 94} L${x + 110} ${sy - 24} Z" fill="#fde68a" fill-opacity=".5"/>`
      + `<ellipse cx="${x + 75}" cy="${sy - 26}" rx="36" ry="5" fill="#e0f2fe" stroke="#075985"/>` + rowsAt(x + 75, sy + 68, en ? ['Exposed areas', 'change chemically'] : ['照到光的地方', '會起化學變化'], 10, '#92400e', 'middle', 12);
    if (stage === 'develop') out += rowsAt(x + 75, sy + 68, en ? ['Developer', 'dissolves part'] : ['顯影液溶掉一部分'], 10.5, '#92400e', 'middle', 12);
    return out;
  };
  svg += panel(1, 'coat', 'A') + panel(3, 'expose', 'B') + panel(5, 'develop', 'C')
    + `<text x="320" y="${sy + 104}" text-anchor="middle" fill="#334155" font-size="12">${L(en, '光阻開口時，下方薄膜仍在', 'Resist opens; the film underneath remains')}</text>`;
  return svg;
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

// 佈植機（2.27.0 改畫，第 3 階段 G 批）：離子源 → 質量分析磁鐵 → 加速 → 掃描 → 晶圓。磁鐵裡畫三條曲率不同的軌跡，
// 只有中間那一條穿過狹縫；加速段是一排電極環；掃描段把離子束掃成扇形；晶圓側放大圈畫光阻擋住離子、只有開口內的離子進到矽裡。
// 技術審查：標籤用正文完整詞（英文不用縮寫），不標角度、不標輕重。圖說來自正文註解，沒有改
function implanter(en) {
  const PINK = '#9d174d', BLUE = '#075985', INK = '#0f172a', INK2 = '#334155', MUTED = '#64748b';
  let svg = '';
  // 磁鐵：三條軌跡從同一點進入，路徑長度相同、半徑不同，轉彎的程度不同
  const E = [118, 160], phi = -35 * Math.PI / 180, S = 110 * 35 * Math.PI / 180;
  const track = R => {
    const c = [E[0] + R * Math.cos(phi + Math.PI / 2), E[1] + R * Math.sin(phi + Math.PI / 2)], d = S / R, pts = [];
    for (let k = 0; k <= 16; k++) { const a = phi - Math.PI / 2 + (d * k) / 16; pts.push([c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)]); }
    return { pts, heading: phi + d };
  };
  const cm = [E[0] + 110 * Math.cos(phi + Math.PI / 2), E[1] + 110 * Math.sin(phi + Math.PI / 2)];
  const arcPts = (R, a0, a1) => Array.from({ length: 13 }, (_, k) => { const a = a0 + ((a1 - a0) * k) / 12; return [cm[0] + R * Math.cos(a), cm[1] + R * Math.sin(a)]; });
  // 磁場區的出口邊界放在中間那條軌跡轉完的位置：三條軌跡在磁場裡一路轉彎，出了磁場才走直線（G2 審查修正）
  const a0 = phi - Math.PI / 2 - 0.06, a1 = phi - Math.PI / 2 + 35 * Math.PI / 180;
  const band = [...arcPts(136, a0, a1), ...arcPts(84, a1, a0)];
  svg += `<path d="${band.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')} Z" fill="#e0f2fe" stroke="${BLUE}" stroke-width="1.2"/>`;
  const slitX = 232;
  [[168, '#94a3b8'], [110, PINK], [76, '#94a3b8']].forEach(([R, color], i) => {
    const { pts, heading } = track(R), [ex, ey] = pts[pts.length - 1];
    const stopY = ey + (slitX - 4 - ex) * Math.tan(heading);
    const endX = i === 1 ? slitX + 4 : slitX - 4;
    const line = `${pts.map(([x, y], k) => `${k ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')} L${endX} ${(i === 1 ? ey : stopY).toFixed(1)}`;
    svg += `<path d="${line}" fill="none" stroke="${color}" stroke-width="${i === 1 ? 2.2 : 1.5}"${i === 1 ? '' : ' stroke-dasharray="4 2"'}/>`;
    if (i !== 1) svg += `<path d="M${slitX - 9} ${(stopY - 4).toFixed(1)} l5 4 -5 4" fill="none" stroke="#9a3412" stroke-width="1.4"/>`;
  });
  const by = track(110).pts[16][1];
  // 狹縫：只有中間那一條穿過
  svg += `<rect x="${slitX - 4}" y="${by - 46}" width="8" height="${46 - 5}" fill="#475569"/><rect x="${slitX - 4}" y="${by + 5}" width="8" height="40" fill="#475569"/>`;
  // 離子源（斜放，出口對準磁鐵入口）與氣瓶
  const sc = [E[0] - 56 * Math.cos(phi), E[1] - 56 * Math.sin(phi)];
  svg += `<g transform="rotate(-35 ${sc[0].toFixed(1)} ${sc[1].toFixed(1)})"><rect x="${(sc[0] - 28).toFixed(1)}" y="${(sc[1] - 18).toFixed(1)}" width="56" height="36" rx="6" fill="#e2e8f0" stroke="${INK2}"/></g>`
    + `<path d="M${(E[0] - 30 * Math.cos(phi)).toFixed(1)} ${(E[1] - 30 * Math.sin(phi)).toFixed(1)} L${E[0]} ${E[1]}" stroke="${PINK}" stroke-width="2.2"/>`
    + `<rect x="26" y="96" width="16" height="36" rx="5" fill="#cbd5e1" stroke="${INK2}"/><rect x="30" y="90" width="8" height="6" fill="${INK2}"/><path d="M34 132 V150 L48 ${(sc[1] - 6).toFixed(1)}" fill="none" stroke="${INK2}" stroke-width="1.3"/>`;
  // 加速：一排電極環；掃描：一對偏轉板把離子束掃成扇形；晶圓側面
  svg += `<path d="M${slitX + 4} ${by} H372" stroke="${PINK}" stroke-width="2.2"/>` + [262, 282, 302, 322].map(x => `<ellipse cx="${x}" cy="${by}" rx="4" ry="18" fill="none" stroke="${BLUE}" stroke-width="2"/>`).join('')
    + arrow(258, by - 26, 330, by - 26, BLUE, 1.2)
    + `<rect x="372" y="${by - 16}" width="26" height="5" fill="#475569"/><rect x="372" y="${by + 11}" width="26" height="5" fill="#475569"/>`
    + `<path d="M398 ${by} L516 ${by - 70} V${by + 70} Z" fill="${PINK}" fill-opacity=".1"/>` + [-70, -35, 0, 35, 70].map(d => `<path d="M398 ${by} L516 ${by + d}" stroke="${PINK}" stroke-width="1" stroke-dasharray="3 3"/>`).join('')
    + `<rect x="516" y="${by - 72}" width="7" height="144" fill="#a6bdcb" stroke="${INK2}"/>`;
  // 放大圈：光阻擋住離子，只有開口內的離子進到矽裡（離子由左往右，與上面的離子束同方向）
  const zc = [580, by - 10], zr = 36;
  svg += `<path d="M523 ${by - 30} L${zc[0] - zr + 2} ${zc[1] - 14} M523 ${by - 12} L${zc[0] - zr + 2} ${zc[1] + 14}" stroke="${MUTED}" stroke-dasharray="2 2"/>`
    + `<circle cx="${zc[0]}" cy="${zc[1]}" r="${zr}" fill="#ffffff" stroke="${MUTED}"/>`
    + `<rect x="${zc[0] + 10}" y="${zc[1] - 24}" width="16" height="48" fill="#a6bdcb"/><rect x="${zc[0]}" y="${zc[1] - 24}" width="10" height="18" fill="#e1ad70" stroke="#92400e"/><rect x="${zc[0]}" y="${zc[1] + 6}" width="10" height="18" fill="#e1ad70" stroke="#92400e"/>`
    + `<rect x="${zc[0] + 10}" y="${zc[1] - 6}" width="9" height="12" fill="${PINK}" fill-opacity=".45"/>`
    + [-18, -11, 0, 12, 19].map(d => arrow(zc[0] - 26, zc[1] + d, Math.abs(d) < 6 ? zc[0] + 16 : zc[0] + 5, zc[1] + d, PINK, 1.1)).join('');
  // 文字：各段名稱與正文的說明
  const ny = 252;
  svg += rowsAt(48, 68, en ? ['A gas containing boron,', 'phosphorus or arsenic'] : ['含有硼、磷或砷的氣體'], 10, INK2, 'start')
    + tx(126, 104, L(en, '磁場', 'magnetic field'), 10, BLUE, 'middle')
    + tb(72, ny, L(en, '離子源', 'Ion source'), 11.5, INK) + tb(170, ny, L(en, '質量分析', 'Mass analysis'), 11.5, INK) + tb(292, ny, L(en, '加速', 'Acceleration'), 11.5, INK)
    + tb(420, ny, L(en, '掃描', 'Scanning'), 11.5, INK) + tb(556, ny, L(en, '晶圓', 'Wafer'), 11.5, INK)
    + rowsAt(170, ny + 16, en ? ['Ions of different masses', 'bend by different amounts'] : ['不同重量的離子', '轉彎的程度不同'], 10, INK2)
    + rowsAt(292, ny + 16, en ? ['electric field'] : ['電場'], 10, BLUE)
    + rowsAt(420, ny + 16, en ? ['swept evenly across', 'the whole wafer'] : ['均勻地掃過整片晶圓'], 10, INK2)
    + `<path d="M${slitX} ${by + 46} V${by + 56}" stroke="${MUTED}" stroke-dasharray="2 2"/>` + rowsAt(slitX, by + 68, en ? ['only the wanted', 'species gets through'] : ['只有需要的那一種', '離子能通過'], 10, PINK)
    + rowsAt(556, ny + 16, en ? ['Wherever photoresist covers', 'the wafer, it stops the ions,', 'so only the areas opened in', 'the resist get implanted'] : ['晶圓上有光阻覆蓋的地方，', '離子會被光阻擋住，', '只有光阻開口的區域會被佈植'], 10, INK2)
    + tx(zc[0], zc[1] - zr - 6, L(en, '光阻', 'photoresist'), 9.5, '#92400e', 'middle');
  // 整張上移，去掉頂端的空白
  return `<g transform="translate(0 -34)">${svg}</g>`;
}

// CMP 機台（2.28.0 改畫，第 3 階段 H 批）：側視圖。研磨墊貼在旋轉平台上，研磨頭偏離平台轉軸、把晶圓正面朝下壓在墊上，
// 下壓箭頭以研磨頭中心線左右對稱、長短不同（不同區域的壓力）；研磨液從研磨頭上游滴到墊面；修整器在另一側壓在墊上，底面是鑽石顆粒。
// 技術審查：只畫機台、不畫放大格（圖說只列機台零件）；研磨頭與修整器的轉動正文沒寫，不畫。圖說來自正文註解，沒有改
function cmpTool(en) {
  const INK2 = '#334155', BLUE = '#075985', MUTED = '#64748b';
  let svg = '';
  // 平台與研磨墊、轉軸與旋轉箭頭
  svg += `<rect x="70" y="148" width="460" height="22" rx="3" fill="#94a3b8" stroke="${INK2}"/><rect x="70" y="140" width="460" height="8" fill="#e2e8f0" stroke="${INK2}"/>`
    + `<rect x="292" y="170" width="16" height="40" fill="#cbd5e1" stroke="${INK2}"/>`
    + `<path d="M268 192 A32 8 0 1 0 332 192" fill="none" stroke="#0f766e" stroke-width="1.5"/>` + arrow(274, 196, 268, 192, '#0f766e', 1.5)
    // 研磨液：噴嘴在研磨頭上游，液滴落在墊面，墊面帶著研磨液流向研磨頭
    + `<path d="M410 52 H370 V96" fill="none" stroke="${INK2}" stroke-width="4"/><path d="M366 96 h8 l-2 6 h-4 z" fill="${INK2}"/>`
    + [110, 124].map(y => `<path d="M370 ${y} c-3 4 -3 7 0 7 s3 -3 0 -7" fill="#bae6fd" stroke="${BLUE}"/>`).join('')
    + `<path d="M300 139 H384" stroke="#7dd3fc" stroke-width="2.5"/>` + arrow(350, 132, 306, 132, BLUE, 1.2)
    // 研磨頭：偏離平台轉軸，在轉軸與墊緣之間；晶圓正面朝下，壓在墊上
    + `<rect x="232" y="48" width="16" height="40" fill="#cbd5e1" stroke="${INK2}"/><rect x="186" y="88" width="108" height="44" rx="6" fill="#bae6fd" stroke="${BLUE}"/>`
    + `<rect x="194" y="132" width="92" height="7" fill="#a6bdcb" stroke="${INK2}"/>` + Array.from({ length: 11 }, (_, i) => `<path d="M${198 + i * 8} 139 v-2" stroke="#0f766e" stroke-width="1.4"/>`).join('')
    + [[204, 18], [222, 26], [240, 32], [258, 26], [276, 18]].map(([x, l]) => arrow(x, 96, x, 96 + l, BLUE, 1.6)).join('')
    // 修整器：較小的圓盤，另一側壓在墊上，底面是鑽石顆粒
    + `<path d="M500 52 H458 V118" fill="none" stroke="${INK2}" stroke-width="4"/><rect x="430" y="118" width="56" height="14" rx="3" fill="#e2e8f0" stroke="${INK2}"/>`
    + Array.from({ length: 7 }, (_, i) => `<path d="M${435 + i * 7.5} 132 l3 6 3 -6 z" fill="#475569"/>`).join('');
  // 文字
  svg += tx(240, 40, L(en, '研磨頭', 'Polishing head'), 11.5, '#0f172a')
    + `<path d="M186 110 L150 96" stroke="${MUTED}" stroke-dasharray="2 2"/>` + rowsAt(148, 86, en ? ['pressure on', 'different zones'] : ['不同區域的壓力'], 10, BLUE, 'end')
    + `<path d="M196 136 L150 124" stroke="${MUTED}" stroke-dasharray="2 2"/>` + rowsAt(148, 122, en ? ['wafer face down'] : ['晶圓正面朝下'], 10, INK2, 'end')
    + tx(364, 80, L(en, '研磨液（Slurry）', 'Slurry'), 11, BLUE, 'end')
    + tx(500, 44, L(en, '修整器', 'Conditioner'), 11.5, '#0f172a', 'start') + `<path d="M488 136 L540 124" stroke="${MUTED}" stroke-dasharray="2 2"/>` + tx(542, 126, L(en, '鑽石顆粒', 'diamond grit'), 10, INK2, 'start')
    + `<path d="M100 144 L70 122" stroke="${MUTED}" stroke-dasharray="2 2"/>` + tx(66, 118, L(en, '研磨墊', 'Polishing pad'), 10.5, INK2, 'end')
    + tx(342, 212, L(en, '旋轉平台', 'rotating platen'), 10.5, '#0f766e', 'start');
  return svg;
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

// 清洗機台（2.28.0 改畫，第 3 階段 H 批）：左邊批次式濕式清洗槽，一排化學槽與清水槽交替（清水最淡），晶舟裝著直立的整批晶圓，
// 正被吊入第一個化學槽、整片浸在液面下；右邊單片式清洗機，晶圓水平放在旋轉夾頭上，噴嘴噴出扇形藥液，外圍是防濺杯。
// 技術審查：「洗車的流水線」只寫成文字，不畫車；標籤用正文原詞。圖說來自正文註解，沒有改
function clean(en) {
  const INK2 = '#334155', BLUE = '#075985', TEAL = '#0f766e';
  const tank = (x, liquid, label) => `<rect x="${x}" y="96" width="62" height="74" fill="#ffffff" stroke="${BLUE}"/><rect x="${x + 1}" y="104" width="60" height="65" fill="${liquid}"/><path d="M${x + 1} 104 h60" stroke="${BLUE}" stroke-width=".8"/>${rowsAt(x + 31, 186, [label], 10, INK2)}`;
  let svg = tb(160, 26, L(en, '批次式濕式清洗槽', 'Batch wet benches'), 12.5, '#0f172a')
    + tank(20, '#93c5fd', L(en, '化學槽', 'chemical tank')) + tank(92, '#eff6ff', L(en, '清水槽', 'rinse tank')) + tank(164, '#93c5fd', L(en, '化學槽', 'chemical tank')) + tank(236, '#eff6ff', L(en, '清水槽', 'rinse tank'))
    // 晶舟：直立的整批晶圓，整片浸在第一槽的液面下，吊架往上連到吊臂
    + `<path d="M51 52 V112" stroke="${INK2}" stroke-width="2"/><path d="M28 112 H74" stroke="${INK2}" stroke-width="2"/>`
    + Array.from({ length: 6 }, (_, i) => `<path d="M${32 + i * 8} 114 V160" stroke="#475569" stroke-width="2.4"/>`).join('') + `<path d="M28 162 H74" stroke="${INK2}" stroke-width="2"/>`
    + arrow(90, 66, 290, 66, TEAL) + rowsAt(190, 84, en ? ['like a car wash line'] : ['像洗車的流水線'], 10, TEAL)
    + rowsAt(58, 50, en ? ['A whole batch of wafers'] : ['整批晶圓'], 10, INK2, 'start') + `<path d="M62 54 L66 116" stroke="#64748b" stroke-dasharray="2 2"/>`;
  // 單片式：旋轉夾頭、轉軸與旋轉箭頭，噴嘴的扇形噴灑，外圍防濺杯
  svg += tb(500, 26, L(en, '單片式清洗機', 'Single-wafer cleaners'), 12.5, '#0f172a')
    + `<path d="M412 118 V160 H588 V118" fill="none" stroke="#94a3b8" stroke-width="3"/>`
    + `<rect x="430" y="128" width="140" height="5" fill="#a6bdcb" stroke="${INK2}"/><rect x="484" y="133" width="32" height="8" fill="#cbd5e1" stroke="${INK2}"/><rect x="494" y="141" width="12" height="38" fill="#94a3b8" stroke="${INK2}"/>`
    + `<path d="M470 168 A30 6 0 1 0 530 168" fill="none" stroke="${TEAL}" stroke-width="1.5"/>` + arrow(524, 172, 530, 168, TEAL, 1.5)
    + `<path d="M486 54 h28 v14 h-28 z" fill="#cbd5e1" stroke="${INK2}"/><path d="M500 68 L456 126 H544 Z" fill="#bae6fd" fill-opacity=".55"/>`
    + rowsAt(500, 196, en ? ['one wafer at a time'] : ['一次處理一片晶圓'], 10.5, INK2)
    + rowsAt(500, 211, en ? ['spraying chemicals while the wafer spins'] : ['一邊旋轉一邊噴灑化學品'], 10.5, INK2)
    + rowsAt(500, 226, en ? ['avoid cross-contamination between wafers'] : ['避免晶圓之間互相污染'], 10.5, TEAL);
  return svg;
}

// 多層金屬導線（2.29.0 改畫，第 3 階段 H 批）：底部矽基板上一排電晶體，鎢灰細柱接到第一層金屬；絕緣層只當底色。
// 由下往上三帶：下層兩列最窄最密、中層兩列較寬（中段斷開記號表示省略的層）、上層兩列最寬最厚；
// 每兩列相鄰金屬之間都有導通孔，粗細跟著層放大，兩端都落在金屬上。右側大括號：帶名、描述詞、比喻（圖示內無字）與功能句。
// 「下層細密」「上層粗寬 · 導通孔相連」改用正文原句與「導通孔」標籤（技術審查修正）。圖說來自正文註解，沒有改
function metalStack(en) {
  const CU = '#d9ac73', CU_LINE = '#9a3412', INK2 = '#334155', MUTED = '#64748b', AMBER = '#92400e', TEAL = '#0f766e';
  const X0 = 70, X1 = 400;
  const k = (n, a, p) => Array.from({ length: n }, (_, i) => a + i * p);
  // 由下往上六列：[頂邊 y, 高, 寬, 左緣位置]
  const rows = [[240, 7, 8, k(20, 76, 16)], [220, 7, 8, k(20, 76, 16)], [188, 12, 18, k(10, 71, 32)], [146, 12, 18, k(10, 71, 32)], [106, 18, 44, k(5, 82, 64)], [62, 24, 84, k(3, 86, 112)]];
  const vw = [4, 6, 6, 10, 14], every = [2, 1, 1, 1, 1];
  let vias = '', wires = '';
  const viaAt = [];
  rows.forEach(([y, h, w, xs], i) => {
    wires += xs.map(x => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${CU}" stroke="${CU_LINE}" stroke-width=".8"/>`).join('');
    if (!i) return;
    const [ly, , lw, lxs] = rows[i - 1], v = vw[i - 1];
    xs.forEach((u, j) => {
      if (j % every[i - 1]) return;
      const c = u + w / 2;
      const m = lxs.map(l => [Math.max(u, l), Math.min(u + w, l + lw)]).filter(([a, b]) => b - a >= v).map(([a, b]) => (a + b) / 2).sort((a, b) => Math.abs(a - c) - Math.abs(b - c))[0];
      if (m === undefined) return;
      viaAt.push([i, m, y + h, ly]);
      vias += `<rect x="${m - v / 2}" y="${y + h}" width="${v}" height="${ly - y - h}" fill="${CU}" stroke="${CU_LINE}" stroke-width=".8"/>`;
    });
  });
  // 相鄰兩列至少要有一根導通孔（審查發現原本只找下排中心，邊緣剛好對齊時整排都被略過）
  for (let i = 1; i < rows.length; i++) if (!viaAt.some(([r]) => r === i)) throw new Error(`metalStack 第 ${i} 與第 ${i + 1} 列之間沒有導通孔`);
  let svg = `<rect x="${X0}" y="54" width="${X1 - X0}" height="208" fill="#f1f5f9"/>` + vias + wires;
  // 中層中段的斷開記號：上下兩條波浪線之間留白，表示中間還有省略的層
  const wave = y => `M${X0 - 6} ${y} ` + 'q6 -4 12 0 t12 0 '.repeat(14).trim();
  svg += `<rect x="${X0 - 6}" y="167" width="${X1 - X0 + 6}" height="10" fill="#ffffff"/><path d="${wave(166)}" fill="none" stroke="${MUTED}"/><path d="${wave(178)}" fill="none" stroke="${MUTED}"/>`;
  // 矽基板與電晶體：每個閘極兩側各一根鎢灰細柱，接到第一列金屬（不標字）
  svg += `<rect x="${X0}" y="262" width="${X1 - X0}" height="18" fill="#a6bdcb" stroke="${INK2}"/>`
    + k(20, 80, 16).map(c => `<rect x="${c - 1.5}" y="247" width="3" height="15" fill="#94a3b8" stroke="${INK2}" stroke-width=".4"/>`).join('')
    + k(10, 88, 32).map(c => `<rect x="${c - 4}" y="255" width="8" height="7" fill="#fde68a" stroke="${AMBER}" stroke-width=".7"/>`).join('');
  // 左側標籤：電晶體、導通孔（只指金屬層之間的柱子）
  const v4 = viaAt.find(([i]) => i === 5);
  svg += tx(62, 262, L(en, '電晶體', 'Transistors'), 10.5, INK2, 'end') + `<path d="M64 258 L84 258" stroke="${MUTED}" stroke-dasharray="2 2"/>`
    + tx(62, 102, L(en, '導通孔', 'Vias'), 10.5, INK2, 'end') + `<path d="M64 98 L${v4[1] - 8} 98" stroke="${MUTED}" stroke-dasharray="2 2"/>`;
  // 右側大括號與說明：帶名、描述詞、比喻圖示與比喻、功能句
  const brace = (y1, y2) => { const m = (y1 + y2) / 2; return `<path d="M${X1 + 6} ${y1} q6 0 6 6 V${m - 5} q0 5 6 5 q-6 0 -6 5 V${y2 - 6} q0 6 -6 6" fill="none" stroke="${INK2}" stroke-width="1.2"/>`; };
  const icons = [
    (x, y) => `<rect x="${x}" y="${y}" width="40" height="14" rx="2" fill="#475569"/><path d="M${x + 3} ${y + 5} h34 M${x + 3} ${y + 9} h34" stroke="#ffffff" stroke-width="1" stroke-dasharray="4 3"/>`,
    (x, y) => `<rect x="${x + 4}" y="${y + 2}" width="32" height="10" rx="2" fill="#94a3b8"/><path d="M${x + 7} ${y + 7} h26" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 3"/>`,
    (x, y) => `<rect x="${x + 4}" y="${y}" width="13" height="14" fill="#cbd5e1" stroke="${INK2}" stroke-width=".6"/><rect x="${x + 23}" y="${y}" width="13" height="14" fill="#cbd5e1" stroke="${INK2}" stroke-width=".6"/><path d="M${x + 20} ${y + 1} v12" stroke="#94a3b8" stroke-width="3"/>`
  ];
  const groups = en
    ? [['Upper layers', 'The thickest and widest', 'like highways', ['carrying signals over long', 'distances and delivering power']], ['Middle layers', 'Wider', 'like city streets', ['connecting different', 'circuit blocks']], ['Lower layers', 'Narrow and dense', 'like alleys', ['connecting nearby transistors']]]
    : [['上層', '最粗最寬', '像高速公路', ['負責長距離傳送訊號和供應電源']], ['中層', '較寬', '像市區道路', ['連接不同的電路區塊']], ['下層', '又細又密', '像巷弄', ['負責連接鄰近的電晶體']]];
  const bands = [[62, 124], [146, 200], [220, 247]];
  let prev = 40;
  groups.forEach(([name, desc, like, fn], i) => {
    const h = 14 + 14 + 18 + fn.length * 13;
    const top = Math.max((bands[i][0] + bands[i][1]) / 2 - h / 2, prev + 6);
    prev = top + h;
    const x = X1 + 22;
    svg += brace(...bands[i]) + tx(x, top + 11, name, 11.5, '#0f172a', 'start').replace('<text ', '<text font-weight="700" ')
      + tx(x, top + 25, desc, 10.5, AMBER, 'start').replace('<text ', '<text font-weight="700" ')
      + icons[i](x, top + 31) + tx(x + 46, top + 42, like, 10.5, TEAL, 'start')
      + fn.map((line, j) => tx(x, top + 58 + j * 13, line, 10, INK2, 'start')).join('');
  });
  return `<g transform="translate(0 -40)">${svg}</g>`;
}

// 雙大馬士革七步剖面（2.19.0 改畫，B 批）：每格底部都是下層銅導線與其上的薄覆蓋層；②的導通孔打穿覆蓋層、露出下層銅；
// ③的阻障層與晶種層包覆孔與溝的側壁及底部；⑥之後阻障層只留在開口內，表面只剩絕緣層與銅。導通孔在下、溝槽在上（技術審查修正）
function damascene(en) {
  const CU = '#d9ac73', CU_LINE = '#9a3412', DIEL = '#f0fdfa', DIEL_LINE = '#0f766e', CAP = '#bae6fd', CAP_LINE = '#075985', LINER = '#9d174d', SEED = '#b45309';
  const steps = [
    [L(en, '① 鋪絕緣層', '① Deposit'), L(en, '', 'dielectric')],
    [L(en, '② 挖出導通孔', '② Etch vias'), L(en, '和溝槽', 'and trenches')],
    [L(en, '③ 鋪阻障層', '③ Barrier and'), L(en, '與晶種層', 'seed layers')],
    [L(en, '④ 電鍍銅', '④ Copper'), L(en, '', 'plating')],
    [L(en, '⑤ 退火', '⑤ Anneal'), ''],
    [L(en, '⑥ 銅 CMP', '⑥ Copper CMP'), ''],
    [L(en, '⑦ 鋪覆蓋層', '⑦ Cap layer'), '']
  ];
  const w = 140, xs = [16, 172, 328, 484, 94, 250, 406];
  // 剖面比標題低 8px，英文兩行標題才不會壓到 ④⑤ 表面多出來的銅
  const panel = (i, x, top) => {
    const y = top + 8;
    // 開口：上面是寬的溝槽，下面是窄的導通孔，往下穿過覆蓋層接到下層銅
    const hole = `M${x + 30} ${y + 34} V${y + 56} H${x + 60} V${y + 80} H${x + 80} V${y + 56} H${x + 110} V${y + 34}`;
    let out = `<rect x="${x}" y="${top}" width="${w}" height="126" rx="6" fill="#ffffff" stroke="#cbd5e1"/>`
      + tx(x + w / 2, top + 16, steps[i][0], 11) + (steps[i][1] ? tx(x + w / 2, top + 29, steps[i][1], 11) : '')
      + `<rect x="${x + 10}" y="${y + 80}" width="120" height="28" fill="${DIEL}" stroke="${DIEL_LINE}"/><rect x="${x + 40}" y="${y + 80}" width="60" height="18" fill="${CU}" stroke="${CU_LINE}"/>`
      + `<rect x="${x + 10}" y="${y + 76}" width="120" height="4" fill="${CAP}" stroke="${CAP_LINE}" stroke-width=".8"/>`
      + `<rect x="${x + 10}" y="${y + 34}" width="120" height="42" fill="${DIEL}" stroke="${DIEL_LINE}"/>`;
    if (i >= 1) out += `<path d="${hole} Z" fill="#ffffff"/><path d="${hole}" fill="none" stroke="${DIEL_LINE}"/>`;
    if (i >= 3) out += `<path d="${hole} Z" fill="${CU}"/>`;
    if (i === 3 || i === 4) out += `<rect x="${x + 10}" y="${y + 26}" width="120" height="8" fill="${CU}" stroke="${CU_LINE}"/>`;
    // 阻障層與晶種層都長在開口內側：貼著絕緣層的是阻障層，再往內才是晶種層（審查意見：原本畫成阻障、晶種、阻障三明治）
    // inside(d) 是與壁面平行、往開口內縮 d 的線；③～⑤ 連表面一起包住，⑥ 之後只留在開口內。晶種層電鍍後與銅融為一體，只在 ③ 畫出
    const inside = (d, surface) => surface
      ? `M${x + 10} ${y + 34 - d} H${x + 30 + d} V${y + 56 - d} H${x + 60 + d} V${y + 80 - d} H${x + 80 - d} V${y + 56 - d} H${x + 110 - d} V${y + 34 - d} H${x + 130}`
      : `M${x + 30 + d} ${y + 34} V${y + 56 - d} H${x + 60 + d} V${y + 80 - d} H${x + 80 - d} V${y + 56 - d} H${x + 110 - d} V${y + 34}`;
    if (i >= 2) out += `<path d="${inside(1.2, i <= 4)}" fill="none" stroke="${LINER}" stroke-width="2.4"/>`;
    if (i === 2) out += `<path d="${inside(3.2, true)}" fill="none" stroke="${SEED}" stroke-width="1.6"/>`;
    // 下層銅導線也有自己的阻障層（它是上一輪做好的同一種結構）
    out += `<path d="M${x + 40} ${y + 80} V${y + 98} H${x + 100} V${y + 80}" fill="none" stroke="${LINER}" stroke-width="1.6"/>`;
    if (i === 4) out += [18, 28, 112, 122].map(dx => `<path d="M${x + dx} ${y + 24} q-4 -4 0 -8 q4 -4 0 -8" fill="none" stroke="#92400e" stroke-width="1.3"/>`).join('');
    if (i === 6) out += `<rect x="${x + 10}" y="${y + 30}" width="120" height="4" fill="${CAP}" stroke="${CAP_LINE}" stroke-width=".8"/>`;
    if (i === 1) out += tx(x + 70, y + 49, L(en, '溝槽', 'Trench'), 9.5, '#334155') + tx(x + 101, y + 70, L(en, '導通孔', 'Via'), 9, '#334155') + `<path d="M${x + 88} ${y + 67} H${x + 82}" stroke="#64748b"/>`;
    return out;
  };
  let svg = xs.map((x, i) => panel(i, x, i < 4 ? 12 : 154)).join('');
  [0, 1, 2].forEach(i => { svg += arrow(xs[i] + w + 1, 78, xs[i + 1] - 1, 78); });
  svg += `<path d="M554 140 V146 H164 V152" fill="none" stroke="#0f766e" stroke-width="1.5"/><path d="M164 153 l-4 -6 h8 z" fill="#0f766e"/>`;
  [4, 5].forEach(i => { svg += arrow(xs[i] + w + 1, 220, xs[i + 1] - 1, 220); });
  // ⑦ 做完回到 ①：每一層金屬都重複這個流程（審查意見：提案的循環箭頭）
  svg += `<path d="M476 281 V290 H8 V75 H12" fill="none" stroke="#0f766e" stroke-width="1.5"/><path d="M15 75 l-6 -4 v8 z" fill="#0f766e"/>`
    + tx(250, 304, L(en, '每一層金屬都重複這個流程', 'Every metal layer repeats this flow'), 10.5, '#0f766e');
  const key = (x, fill, stroke, label) => `<rect x="${x}" y="314" width="12" height="12" fill="${fill}" stroke="${stroke}"/>` + tx(x + 16, 324, label, 10.5, '#334155', 'start');
  const half = (x, label) => `<rect x="${x}" y="314" width="6" height="12" fill="${LINER}"/><rect x="${x + 6}" y="314" width="6" height="12" fill="${SEED}"/>` + tx(x + 16, 324, label, 10.5, '#334155', 'start');
  return svg + key(40, CU, CU_LINE, L(en, '銅', 'Copper')) + key(130, DIEL, DIEL_LINE, L(en, '絕緣層', 'Dielectric'))
    + half(240, L(en, '阻障層、晶種層', 'Barrier, seed')) + key(420, CAP, CAP_LINE, L(en, '覆蓋層', 'Cap layer'));
}

// 平面 CMOS 的 FEOL 七步剖面（2.20.0 改畫，C 批）：左邊 NMOS（P 井、N 型源汲極）、右邊 PMOS（N 井、P 型源汲極），與第 2 章圖的左右配置相同。
// 深度固定：淺摻雜 < 源汲極接面 < STI < 井；④⑥ 以光阻遮住 PMOS 區、只佈植 NMOS 區，PMOS 區另做一次；矽化物只在源汲極與閘極頂面（技術審查修正）
function feol(en) {
  const N = '#bae6fd', N_LINE = '#075985', P = '#fce7f3', P_LINE = '#9d174d', OX = '#f0fdfa', OX_LINE = '#0f766e', GATE = '#fde68a', GATE_LINE = '#92400e', SPACER = '#cbd5e1', SIL = '#334155', SI = '#e2e8f0';
  const steps = [
    L(en, '① 隔離', '① Isolation'), L(en, '② 做出井', '② Wells'), L(en, '③ 做閘極', '③ Gate'), L(en, '④ 淺摻雜', '④ Light doping'),
    L(en, '⑤ 側壁間隔物', '⑤ Sidewall spacers'), L(en, '⑥ 源極與汲極', '⑥ Source and drain'), L(en, '⑦ 金屬矽化物', '⑦ Silicide')
  ];
  const w = 140, xs = [16, 172, 328, 484, 94, 250, 406];
  const panel = (i, x, top) => {
    // 剖面往下移，④⑥ 的佈植箭頭才不會壓到標題
    const y = top + 10, s = y + 40;
    // 兩個主動區的中心：左 x+42、右 x+98（中間 STI 在 x+66～x+74，右邊 STI 在 x+122）
    const gl = x + 42, gr = x + 98;
    let out = `<rect x="${x}" y="${top}" width="${w}" height="126" rx="6" fill="#ffffff" stroke="#cbd5e1"/>` + tx(x + w / 2, top + 16, steps[i], 11);
    out += `<rect x="${x + 10}" y="${s}" width="120" height="60" fill="${SI}" stroke="#334155"/>`;
    // ② 起：左 P 井、右 N 井，比 STI 深
    if (i >= 1) out += `<rect x="${x + 10}" y="${s}" width="61" height="44" fill="${P}" stroke="${P_LINE}" stroke-width=".8"/><rect x="${x + 71}" y="${s}" width="59" height="44" fill="${N}" stroke="${N_LINE}" stroke-width=".8"/>`;
    // ④ 起：淺摻雜（只延伸到閘極邊緣）；④ 當下只有 NMOS 區做了，PMOS 區被光阻遮住
    const ldd = (g, f, l) => `<rect x="${g - 19}" y="${s}" width="9" height="4" fill="${f}" stroke="${l}" stroke-width=".6"/><rect x="${g + 10}" y="${s}" width="9" height="4" fill="${f}" stroke="${l}" stroke-width=".6"/>`;
    if (i >= 3) out += ldd(gl, N, N_LINE);
    if (i >= 4) out += ldd(gr, P, P_LINE);
    // ⑥ 起：源汲極（較深），從 STI 到側壁間隔物外緣
    const sd = (g, f, l) => `<rect x="${g - 24}" y="${s}" width="10" height="10" fill="${f}" stroke="${l}" stroke-width=".7"/><rect x="${g + 14}" y="${s}" width="10" height="10" fill="${f}" stroke="${l}" stroke-width=".7"/>`;
    if (i >= 5) out += sd(gl, N, N_LINE);
    if (i >= 6) out += sd(gr, P, P_LINE);
    // STI：三道淺溝槽填氧化矽，表面磨平
    out += [x + 10, x + 66, x + 122].map(sx => `<rect x="${sx}" y="${s}" width="8" height="22" fill="${OX}" stroke="${OX_LINE}"/>`).join('');
    // ③ 起：閘極絕緣層與閘極
    if (i >= 2) out += [gl, gr].map(g => `<rect x="${g - 10}" y="${s - 2}" width="20" height="2" fill="${OX}" stroke="${OX_LINE}" stroke-width=".5"/><rect x="${g - 10}" y="${s - 16}" width="20" height="14" fill="${GATE}" stroke="${GATE_LINE}"/>`).join('');
    // ⑤ 起：側壁間隔物
    if (i >= 4) out += [gl, gr].map(g => `<rect x="${g - 14}" y="${s - 16}" width="4" height="16" fill="${SPACER}" stroke="#334155" stroke-width=".6"/><rect x="${g + 10}" y="${s - 16}" width="4" height="16" fill="${SPACER}" stroke="#334155" stroke-width=".6"/>`).join('');
    // ⑦：矽化物只在源汲極與閘極頂面
    if (i === 6) out += [gl, gr].map(g => `<rect x="${g - 24}" y="${s - 2}" width="10" height="2" fill="${SIL}"/><rect x="${g + 14}" y="${s - 2}" width="10" height="2" fill="${SIL}"/><rect x="${g - 10}" y="${s - 18}" width="20" height="2" fill="${SIL}"/>`).join('');
    // ④⑥：光阻遮住 PMOS 區，箭頭只打進 NMOS 區
    if (i === 3 || i === 5) {
      out += `<rect x="${x + 71}" y="${s - 24}" width="59" height="24" fill="#e1ad70" stroke="${GATE_LINE}"/>` + tx(x + 100, s - 9, L(en, '光阻', 'Resist'), 9, '#0f172a');
      out += [24, 36, 48, 60].map(dx => arrow(x + dx, s - 27, x + dx, s - (dx > 30 && dx < 54 ? 18 : 2), '#9a3412', i === 3 ? 1 : 1.8)).join('');
    }
    // ⑥ 佈植後整片晶圓退火活化：記號與「退火」放在剖面下方，橫跨整格
    if (i === 5) out += [20, 28].map(dx => `<path d="M${x + dx} ${top + 124} q-3 -3 0 -6 q3 -3 0 -6" fill="none" stroke="#92400e" stroke-width="1.2"/>`).join('') + tx(x + 36, top + 122, L(en, '接著退火活化', 'then anneal to activate'), 9, '#92400e', 'start');
    if (i === 1) out += tx(x + 40, s + 56, L(en, 'P 井', 'P-well'), 9.5, P_LINE) + tx(x + 100, s + 56, L(en, 'N 井', 'N-well'), 9.5, N_LINE);
    if (i === 2) out += tx(gl, s + 56, 'NMOS', 9.5, '#0f172a') + tx(gr, s + 56, 'PMOS', 9.5, '#0f172a');
    return out;
  };
  let svg = xs.map((x, i) => panel(i, x, i < 4 ? 12 : 154)).join('');
  [0, 1, 2].forEach(i => { svg += arrow(xs[i] + w + 1, 78, xs[i + 1] - 1, 78); });
  svg += `<path d="M554 140 V146 H164 V152" fill="none" stroke="#0f766e" stroke-width="1.5"/><path d="M164 153 l-4 -6 h8 z" fill="#0f766e"/>`;
  [4, 5].forEach(i => { svg += arrow(xs[i] + w + 1, 220, xs[i + 1] - 1, 220); });
  const key = (x, fill, stroke, label) => `<rect x="${x}" y="296" width="12" height="12" fill="${fill}" stroke="${stroke}"/>` + tx(x + 16, 306, label, 10.5, '#334155', 'start');
  return svg + key(20, N, N_LINE, L(en, 'N 型', 'N-type')) + key(96, P, P_LINE, L(en, 'P 型', 'P-type')) + key(172, OX, OX_LINE, L(en, '氧化矽', 'Silicon oxide'))
    + key(286, GATE, GATE_LINE, L(en, '閘極', 'Gate')) + key(362, SPACER, '#334155', 'Spacer') + key(448, SIL, SIL, L(en, '金屬矽化物', 'Silicide'))
    + tx(320, 330, L(en, '④⑥ 先以光阻遮住 PMOS 區、只佈植 NMOS 區；PMOS 區再另做一次', '④⑥ Resist covers PMOS while NMOS is implanted; PMOS is done separately'), 10.5, '#334155');
}

// 平面、FinFET、GAA 剖面（2.30.0 改畫）：閘極淺藍、通道淺青，閘極包覆通道的面用橘線標出；標題與圖例沿用舊圖。
// FinFET 的鰭由基板穿過淺溝槽隔離長出，閘極兩腳落在隔離層上；GAA 三片奈米片懸空，閘極填滿片間與最下片下方，
// 整塊落在隔離層上；基板凸起的矽墩頂面低於隔離層頂面，閘極底下全是隔離層（技術審查修正：舊圖的閘極直接壓在基板上；畫完後審查又指出矽墩頂與隔離層齊平）
function devices(en) {
  const SUB = '#a6bdcb', SUB_S = '#334155', STI = '#f1f5f9', STI_S = '#94a3b8', GATE = '#bae6fd', GATE_S = '#075985', CH = '#99f6e4', CH_S = '#0f766e', HL = '#ea580c';
  const sub = (x, y, h) => `<rect x="${x}" y="${y}" width="140" height="${h}" fill="${SUB}" stroke="${SUB_S}"/>`;
  const sti = (x, y, h) => `<rect x="${x}" y="${y}" width="140" height="${h}" fill="${STI}" stroke="${STI_S}"/>`;
  const planar = tx(110, 30, L(en, '平面 · 上方', 'Planar · from above'), 13)
    + sub(40, 126, 40) + `<rect x="80" y="126" width="60" height="6" fill="${CH}" stroke="${CH_S}"/><rect x="80" y="98" width="60" height="26" fill="${GATE}" stroke="${GATE_S}"/>`
    + `<path d="M80 126 H140" stroke="${HL}" stroke-width="3"/>`;
  const fin = tx(320, 30, L(en, 'FinFET · 三面', 'FinFET · three sides'), 13)
    + sub(250, 142, 24) + sti(250, 124, 18) + `<rect x="312" y="124" width="16" height="18" fill="${SUB}" stroke="${SUB_S}"/>`
    + `<rect x="312" y="70" width="16" height="54" fill="${CH}" stroke="${CH_S}"/>`
    + `<path d="M300 124 V58 H340 V124 H330 V68 H310 V124 Z" fill="${GATE}" stroke="${GATE_S}"/>`
    + `<path d="M312 124 V70 H328 V124" fill="none" stroke="${HL}" stroke-width="3"/>`
    + `<path d="M322 98 H354" stroke="#64748b" stroke-dasharray="2 2"/>` + tx(358, 102, L(en, '鰭', 'Fin'), 12, '#0f172a', 'start');
  const gaa = tx(530, 30, L(en, 'GAA · 四面', 'GAA · four sides'), 13)
    + sub(460, 150, 16) + sti(460, 136, 14) + `<rect x="506" y="141" width="48" height="9" fill="${SUB}" stroke="${SUB_S}"/>`
    + `<rect x="494" y="50" width="72" height="85" rx="4" fill="${GATE}" stroke="${GATE_S}"/>`
    + [64, 88, 112].map(y => `<rect x="506" y="${y}" width="48" height="10" fill="${CH}" stroke="${HL}" stroke-width="2.5"/>`).join('');
  const legend = `<rect x="150" y="191" width="14" height="10" fill="${GATE}" stroke="${GATE_S}"/>` + tx(170, 200, L(en, '閘極', 'Gate'), 12, '#0f172a', 'start')
    + `<rect x="230" y="191" width="14" height="10" fill="${CH}" stroke="${CH_S}"/>` + tx(250, 200, L(en, '通道', 'Channel'), 12, '#0f172a', 'start')
    + `<path d="M318 196 H336" stroke="${HL}" stroke-width="3"/>` + tx(342, 200, L(en, '閘極包覆通道的面', 'Sides of the channel the gate wraps'), 12, '#0f172a', 'start');
  return planar + fin + gaa + legend;
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
  [/剖面示意|cross-section of a fab/i, fabSection, 276],
  [/天車|OHT|FOUP/i, oht, 282, { zh: '重量與片數出自本段正文；其餘為示意。', en: 'The weight and wafer count come from this section. Everything else is schematic.' }],
  [/MOSFET/i, mosfet, 250],
  [/CZ|長晶|crystal growth/i, cz, 300, { zh: '溫度、晶棒直徑、長度與重量出自本段正文；坩堝與晶棒的大小只是示意。', en: 'The temperature and the ingot diameter, length and weight come from this section. Crucible and ingot sizes are schematic.' }],
  [/攝影|photography compared/i, photoVsLitho, 296],
  [/微影流程|lithography flow/i, lithoFlow, 326],
  [/沉積|deposition methods/i, deposition, 214],
  [/等向|isotropic/i, etch, 240],
  [/佈植機|implanter/i, implanter, 284],
  [/Dishing|Erosion|碟/i, dishing],
  [/CMP 機台|CMP tool/i, cmpTool, 232],
  [/清洗|wet bench/i, clean, 240],
  [/多層金屬|multilevel metal/i, metalStack, 252],
  [/大馬士革|damascene/i, damascene, 336],
  [/FEOL/i, feol, 340],
  [/FinFET|GAA/i, devices, 214],
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
  [/晶粒|die and chip/i, waferDieChip, 248, { zh: '晶圓直徑與顆數範圍出自本段正文；格子數只是示意，不代表顆數。', en: 'The wafer diameter and the die-count range come from this section. The grid is schematic and does not show the real count.' }]
];

export function figureForCaption(caption) {
  const en = !/[\u4e00-\u9fff]/.test(caption);
  const draw = MATCHERS.find(([pattern]) => pattern.test(caption));
  const body = draw ? draw[1](en) : flow(caption.split(/→|->|、|，|,/).map(part => part.trim()).filter(Boolean).slice(0, 6));
  return frame(caption, en, body, draw?.[2], draw ? draw[1].name : 'flow', draw?.[3] || null);
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
