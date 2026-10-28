export const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const L = (en, zh, enText) => (en ? enText : zh);

export function frame(caption, en, body, height = 232) {
  const badge = L(en, '示意 · 未按比例', 'Schematic · not to scale');
  const source = L(en, '沒有量測值。名稱取自本章，不另編數字。', 'No measured values. Names come from this chapter. No added numbers.');
  return `<figure class="chapter-figure"><svg viewBox="0 0 640 ${height}" role="img" aria-label="${esc(`${caption}. ${badge}. ${source}`)}">${body}</svg><figcaption><span class="illus-badge">${esc(badge)}</span><span class="figure-caption">${esc(caption)}</span><span class="figure-source">${esc(source)}</span></figcaption></figure>`;
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
  return `<rect x="48" y="128" width="360" height="52" fill="#a6bdcb" stroke="#334155"/><text x="228" y="158" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '矽', 'Silicon')}</text><rect x="70" y="128" width="70" height="22" fill="#57bdb3" stroke="#0f766e"/><rect x="300" y="128" width="70" height="22" fill="#57bdb3" stroke="#0f766e"/><text x="105" y="196" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '源極', 'Source')}</text><text x="335" y="196" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '汲極', 'Drain')}</text><rect x="168" y="112" width="80" height="16" fill="#fde68a" stroke="#92400e"/><text x="208" y="100" text-anchor="middle" fill="#92400e" font-size="12">${L(en, '閘極氧化層', 'Gate oxide')}</text><rect x="168" y="68" width="80" height="44" fill="#bae6fd" stroke="#075985"/><text x="208" y="94" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '閘極', 'Gate')}</text><text x="470" y="120" fill="#0f172a" font-size="13">${L(en, '通道', 'Channel')}</text><path d="M450 116 H250" stroke="#075985"/>`;
}

function cz(en) {
  return `<path d="M250 70 h140 l30 110 h-200 z" fill="#e2e8f0" stroke="#334155"/><path d="M270 150 h100 l12 20 h-124 z" fill="#fde68a" stroke="#92400e"/><text x="320" y="164" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '熔融矽', 'Melt')}</text><rect x="300" y="28" width="40" height="28" fill="#99f6e4" stroke="#0f766e"/><text x="400" y="46" fill="#0f172a" font-size="12">${L(en, '晶種', 'Seed')}</text><rect x="292" y="56" width="56" height="94" fill="#f8fafc" stroke="#0f766e"/><text x="430" y="110" fill="#0f172a" font-size="12">${L(en, '晶棒 · 旋轉上拉', 'Ingot · rotate and pull')}</text><text x="320" y="196" text-anchor="middle" fill="#334155" font-size="12">${L(en, '坩堝', 'Crucible')}</text>`;
}

function photoVsLitho(en) {
  return `${flow([L(en, '光源', 'Light'), L(en, '底片／光罩', 'Film / mask'), L(en, '鏡頭', 'Lens'), L(en, '相紙／光阻', 'Paper / resist')])}<text x="160" y="132" text-anchor="middle" fill="#334155" font-size="12">${L(en, '攝影', 'Photography')}</text><text x="480" y="132" text-anchor="middle" fill="#334155" font-size="12">${L(en, '微影用同一順序', 'Lithography uses the same order')}</text>`;
}

function lithoFlow(en) {
  const stage = (x, resist, open) => `<rect x="${x}" y="150" width="150" height="28" fill="#a6bdcb" stroke="#334155"/>${resist}${open ? '' : ''}`;
  return `${stage(40)}${`<rect x="40" y="122" width="150" height="28" fill="#e1ad70" stroke="#92400e"/>`}<text x="115" y="110" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '塗佈', 'Coat')}</text><rect x="245" y="150" width="150" height="28" fill="#a6bdcb" stroke="#334155"/><rect x="245" y="122" width="46" height="28" fill="#e1ad70" stroke="#92400e"/><rect x="349" y="122" width="46" height="28" fill="#e1ad70" stroke="#92400e"/><text x="320" y="110" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '曝光', 'Expose')}</text><rect x="450" y="150" width="150" height="28" fill="#a6bdcb" stroke="#334155"/><rect x="450" y="122" width="46" height="28" fill="#e1ad70" stroke="#92400e"/><rect x="554" y="122" width="46" height="28" fill="#e1ad70" stroke="#92400e"/><text x="525" y="110" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '顯影', 'Develop')}</text><text x="320" y="196" text-anchor="middle" fill="#334155" font-size="12">${L(en, '光阻開口時，下方薄膜仍在', 'Resist opens; the film underneath remains')}</text>`;
}

function deposition(en) {
  return flow(['OX', 'CVD', 'PVD', 'ALD']) + `<text x="92" y="130" text-anchor="middle" fill="#334155" font-size="12">${L(en, '熱氧化', 'Thermal oxide')}</text><text x="244" y="130" text-anchor="middle" fill="#334155" font-size="12">${L(en, '氣體反應', 'Gas reaction')}</text><text x="396" y="130" text-anchor="middle" fill="#334155" font-size="12">${L(en, '靶材濺出', 'Target atoms')}</text><text x="548" y="130" text-anchor="middle" fill="#334155" font-size="12">${L(en, '一層一層', 'One layer')}</text>`;
}

function etch(en) {
  return `<text x="160" y="36" text-anchor="middle" fill="#0f172a" font-size="14">${L(en, '等向 · 光阻下方側蝕', 'Isotropic · undercut')}</text><rect x="70" y="118" width="180" height="36" fill="#57bdb3" stroke="#0f766e"/><path d="M110 118 q40 28 80 0" fill="#f8fafc" stroke="#0f766e"/><rect x="120" y="86" width="80" height="32" fill="#e1ad70" stroke="#92400e"/><text x="480" y="36" text-anchor="middle" fill="#0f172a" font-size="14">${L(en, '非等向 · 直壁', 'Anisotropic · straight wall')}</text><rect x="390" y="118" width="180" height="36" fill="#57bdb3" stroke="#0f766e"/><rect x="430" y="118" width="40" height="36" fill="#f8fafc" stroke="#0f766e"/><rect x="510" y="118" width="40" height="36" fill="#f8fafc"/><rect x="430" y="86" width="40" height="32" fill="#e1ad70" stroke="#92400e"/><rect x="550" y="86" width="40" height="32" fill="#e1ad70" stroke="#92400e"/>`;
}

function implanter(en) {
  return flow([L(en, '離子源', 'Source'), L(en, '質量分析', 'Magnet'), L(en, '加速', 'Accel'), L(en, '掃描', 'Scan'), L(en, '晶圓', 'Wafer')]);
}

function cmpTool(en) {
  return `<ellipse cx="250" cy="150" rx="150" ry="28" fill="#e2e8f0" stroke="#334155"/><text x="250" y="154" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '研磨墊 · 旋轉平台', 'Pad · platen')}</text><rect x="190" y="70" width="120" height="36" rx="4" fill="#bae6fd" stroke="#075985"/><text x="250" y="92" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '研磨頭', 'Head')}</text><circle cx="430" cy="120" r="10" fill="#fde68a" stroke="#92400e"/><text x="470" y="124" fill="#0f172a" font-size="12">${L(en, '研磨液', 'Slurry')}</text><rect x="40" y="108" width="36" height="50" fill="#cbd5e1" stroke="#334155"/><text x="58" y="96" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '修整器', 'Conditioner')}</text>`;
}

function dishing(en) {
  return `<text x="160" y="40" text-anchor="middle" fill="#0f172a" font-size="14">Dishing</text><path d="M40 120 h70 q40 28 80 0 h70" fill="none" stroke="#9a3412" stroke-width="8"/><rect x="40" y="124" width="220" height="28" fill="#a6bdcb" stroke="#334155"/><text x="480" y="40" text-anchor="middle" fill="#0f172a" font-size="14">Erosion</text><path d="M360 108 h220" fill="none" stroke="#9a3412" stroke-width="6"/><path d="M400 108 h140" fill="none" stroke="#475569" stroke-width="10"/><rect x="360" y="118" width="220" height="34" fill="#a6bdcb" stroke="#334155"/><text x="320" y="180" text-anchor="middle" fill="#334155" font-size="12">${L(en, '形狀對照，沒有深度數值', 'Shape comparison, no depth values')}</text>`;
}

function clean(en) {
  return `<rect x="48" y="70" width="200" height="90" fill="#e0f2fe" stroke="#075985"/><rect x="70" y="88" width="150" height="8" fill="#cbd5e1"/><rect x="70" y="104" width="150" height="8" fill="#cbd5e1"/><rect x="70" y="120" width="150" height="8" fill="#cbd5e1"/><text x="148" y="180" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '批次濕槽', 'Batch wet bench')}</text><circle cx="460" cy="120" r="54" fill="#f8fafc" stroke="#334155"/><path d="M460 70 a50 50 0 0 1 36 70" fill="none" stroke="#0f766e" stroke-width="2"/><text x="460" y="190" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '單片旋轉', 'Single-wafer spin')}</text>`;
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
  return `<text x="110" y="36" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '平面 · 上方', 'Planar · top')}</text><rect x="40" y="120" width="140" height="36" fill="#a6bdcb" stroke="#334155"/><rect x="80" y="96" width="60" height="24" fill="#bae6fd" stroke="#075985"/><text x="320" y="36" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, 'FinFET · 三面', 'FinFET · three sides')}</text><rect x="250" y="130" width="140" height="26" fill="#a6bdcb" stroke="#334155"/><rect x="300" y="90" width="28" height="40" fill="#57bdb3" stroke="#0f766e"/><path d="M292 90 h44 v28 h-44 z" fill="none" stroke="#075985" stroke-width="3"/><text x="520" y="36" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, 'GAA · 四面', 'GAA · four sides')}</text><rect x="470" y="140" width="120" height="20" fill="#a6bdcb" stroke="#334155"/><rect x="500" y="100" width="60" height="14" fill="#99f6e4" stroke="#0f766e"/><rect x="492" y="92" width="76" height="30" fill="none" stroke="#075985" stroke-width="3"/>`;
}

function dram(en) {
  return `<rect x="80" y="150" width="280" height="36" fill="#a6bdcb" stroke="#334155"/><rect x="120" y="126" width="70" height="24" fill="#bae6fd" stroke="#075985"/><text x="155" y="118" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '字元線', 'Word line')}</text><rect x="230" y="138" width="90" height="12" fill="#d9ac73" stroke="#92400e"/><text x="275" y="132" text-anchor="middle" fill="#92400e" font-size="12">${L(en, '位元線', 'Bit line')}</text><rect x="400" y="48" width="36" height="138" fill="#e0f2fe" stroke="#075985"/><text x="500" y="120" fill="#0f172a" font-size="13">${L(en, '圓柱電容', 'Cylinder capacitor')}</text>`;
}

function nand(en) {
  const layers = Array.from({ length: 8 }, (_, i) => `<rect x="160" y="${40 + i * 16}" width="220" height="12" fill="${i % 2 ? '#e2e8f0' : '#57bdb3'}" stroke="#334155"/>`).join('');
  return `${layers}<rect x="250" y="40" width="18" height="128" fill="#f8fafc" stroke="#075985"/><text x="420" y="80" fill="#0f172a" font-size="13">${L(en, '垂直通道', 'Vertical channel')}</text><path d="M160 168 h40 v-16 h30 v-16 h30 v-16 h30" fill="none" stroke="#92400e" stroke-width="2"/><text x="420" y="150" fill="#92400e" font-size="13">${L(en, '邊緣階梯', 'Edge staircase')}</text>`;
}

function pitch(en) {
  return `<rect x="70" y="70" width="28" height="90" fill="#bae6fd" stroke="#075985"/><rect x="140" y="70" width="28" height="90" fill="#bae6fd" stroke="#075985"/><rect x="210" y="70" width="28" height="90" fill="#bae6fd" stroke="#075985"/><path d="M84 60 h70" stroke="#0f172a"/><text x="119" y="52" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '閘極間距', 'Gate pitch')}</text><rect x="340" y="78" width="220" height="16" fill="#d9ac73" stroke="#92400e"/><rect x="340" y="120" width="220" height="16" fill="#d9ac73" stroke="#92400e"/><path d="M580 86 v42" stroke="#0f172a"/><text x="560" y="168" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '金屬間距', 'Metal pitch')}</text>`;
}

function inspect(en) {
  return flow([L(en, '全片掃描', 'Scan'), L(en, '比對鄰粒', 'Compare'), L(en, '標出差異', 'Mark'), L(en, '電顯複檢', 'Review')]);
}

function yieldMap(en) {
  const die = (ox, oy, cols, size) => Array.from({ length: cols * cols }, (_, i) => {
    const x = ox + (i % cols) * (size + 3);
    const y = oy + Math.floor(i / cols) * (size + 3);
    const hit = (i % 5 === 0);
    return `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${hit ? '#fde68a' : '#99f6e4'}" stroke="#0f766e"/>`;
  }).join('');
  return `${die(40, 48, 3, 42)}${die(360, 48, 6, 22)}<text x="110" y="196" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '大晶粒', 'Large dies')}</text><text x="470" y="196" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '小晶粒', 'Small dies')}</text><text x="320" y="24" text-anchor="middle" fill="#334155" font-size="12">${L(en, '同一批缺陷位置 · 不是實際良率', 'Same defect sites · not a measured yield')}</text>`;
}

function spc(en) {
  return `<path d="M40 40 v140 h560" fill="none" stroke="#334155"/><path d="M40 70 h560" stroke="#b45309" stroke-dasharray="4 3"/><path d="M40 110 h560" stroke="#0f766e"/><path d="M40 150 h560" stroke="#b45309" stroke-dasharray="4 3"/><text x="48" y="64" fill="#b45309" font-size="11">${L(en, '管制界限', 'Control limit')}</text><text x="48" y="104" fill="#0f766e" font-size="11">${L(en, '中心線', 'Center')}</text><path d="M80 108 l40 -8 40 10 40 -6 40 4 40 -30 40 8 40 -4 40 6" fill="none" stroke="#075985" stroke-width="2"/><circle cx="320" cy="78" r="4" fill="#9a3412"/><text x="336" y="74" fill="#9a3412" font-size="11">${L(en, '超出界限', 'Outside limit')}</text><text x="40" y="168" fill="#334155" font-size="11">${L(en, '規格界限在管制界限外側 · 軸上沒有刻度數字', 'Spec limits sit outside control limits · axis has no scale numbers')}</text>`;
}

function cp(en) {
  return `<rect x="40" y="36" width="140" height="48" fill="#f8fafc" stroke="#334155"/><text x="110" y="66" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '測試機', 'Tester')}</text><path d="M180 60 h40" stroke="#0f766e"/><rect x="220" y="48" width="160" height="28" fill="#e2e8f0" stroke="#334155"/><text x="300" y="68" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '探針卡', 'Probe card')}</text><rect x="250" y="100" width="100" height="36" fill="#f1f5f9" stroke="#64748b"/><text x="300" y="122" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '針測機', 'Prober')}</text><circle cx="480" cy="130" r="48" fill="#f8fafc" stroke="#334155"/><text x="480" y="134" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '晶圓', 'Wafer')}</text>`;
}

function wirebond(en) {
  return `<rect x="70" y="150" width="360" height="28" fill="#a6bdcb" stroke="#334155"/><text x="250" y="168" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '導線架或基板', 'Lead frame or substrate')}</text><rect x="180" y="100" width="120" height="40" fill="#57bdb3" stroke="#0f766e"/><text x="240" y="124" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '晶粒', 'Die')}</text><path d="M210 100 q-40 -40 -80 50 M270 100 q80 -50 120 50" fill="none" stroke="#9a3412" stroke-width="2"/><text x="470" y="90" fill="#92400e" font-size="13">${L(en, '金屬線', 'Wires')}</text><path d="M90 90 h280 v90 h-280 z" fill="none" stroke="#64748b" stroke-dasharray="4 3"/><text x="250" y="80" text-anchor="middle" fill="#334155" font-size="12">${L(en, '封膠', 'Mold')}</text>`;
}

function flipchip(en) {
  return `<rect x="80" y="150" width="400" height="26" fill="#a6bdcb" stroke="#334155"/><text x="280" y="168" text-anchor="middle" fill="#0f172a" font-size="12">${L(en, '基板', 'Substrate')}</text>${Array.from({ length: 8 }, (_, i) => `<circle cx="${120 + i * 42}" cy="190" r="7" fill="#d9ac73" stroke="#92400e"/>`).join('')}<text x="500" y="194" fill="#92400e" font-size="12">${L(en, '錫球', 'Balls')}</text><rect x="160" y="108" width="240" height="16" fill="#fde68a" stroke="#92400e"/><text x="420" y="120" fill="#92400e" font-size="12">${L(en, '底部填充', 'Underfill')}</text><rect x="180" y="64" width="200" height="36" fill="#57bdb3" stroke="#0f766e"/><text x="280" y="86" text-anchor="middle" fill="#0f172a" font-size="13">${L(en, '翻轉的晶粒', 'Flipped die')}</text>${Array.from({ length: 5 }, (_, i) => `<circle cx="${210 + i * 32}" cy="112" r="5" fill="#bae6fd" stroke="#075985"/>`).join('')}`;
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

const MATCHERS = [
  [/一生|life of a chip/i, life],
  [/晶粒|die and chip/i, waferDieChip],
  [/剖面示意|cross-section of a fab/i, fabSection],
  [/天車|OHT|FOUP/i, oht],
  [/MOSFET/i, mosfet],
  [/CZ|長晶|crystal growth/i, cz],
  [/攝影|photography compared/i, photoVsLitho],
  [/微影流程|lithography flow/i, lithoFlow],
  [/沉積|deposition methods/i, deposition],
  [/等向|isotropic/i, etch],
  [/佈植機|implanter/i, implanter],
  [/Dishing|Erosion|碟/i, dishing],
  [/CMP 機台|CMP tool/i, cmpTool],
  [/清洗|wet bench/i, clean],
  [/多層金屬|multilevel metal/i, metalStack],
  [/大馬士革|damascene/i, damascene],
  [/FEOL/i, feol],
  [/FinFET|GAA/i, devices],
  [/DRAM/i, dram],
  [/NAND/i, nand],
  [/間距|pitch/i, pitch],
  [/缺陷檢測|defect inspection/i, inspect],
  [/良率|yield difference/i, yieldMap],
  [/管制圖|control chart/i, spc],
  [/CP 測試|CP test/i, cp],
  [/打線|wire-bonded/i, wirebond],
  [/覆晶|flip-chip/i, flipchip],
  [/2\.5D|HBM/i, cowos],
  [/浴缸|bathtub/i, bathtub]
];

export function figureForCaption(caption) {
  const en = !/[\u4e00-\u9fff]/.test(caption);
  const draw = MATCHERS.find(([pattern]) => pattern.test(caption));
  const body = draw ? draw[1](en) : flow(caption.split(/→|->|、|，|,/).map(part => part.trim()).filter(Boolean).slice(0, 6));
  return frame(caption, en, body);
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
    const figure = frame(en ? supplement.en : supplement.zh, en, supplement.draw(en));
    const h1 = next.indexOf('</h1>');
    const h2 = next.indexOf('</h2>');
    const cut = h1 >= 0 ? h1 + 5 : (h2 >= 0 ? h2 + 5 : -1);
    next = cut >= 0 ? next.slice(0, cut) + figure + next.slice(cut) : figure + next;
  }
  return next;
}
