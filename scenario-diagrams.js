const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function waferArt() {
  const dies = [];
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    if ((x - 3.5) ** 2 + (y - 3.5) ** 2 < 15) dies.push(`<rect x="${65 + x * 24}" y="${26 + y * 24}" width="19" height="19" rx="1" fill="${(x + y) % 4 === 0 ? '#65d5c4' : '#214956'}" stroke="#81dbd0" stroke-width=".6"/>`);
  }
  return `<svg viewBox="0 0 340 260" aria-hidden="true"><ellipse cx="168" cy="137" rx="113" ry="113" fill="#0b303c" stroke="#68cbbd"/>${dies.join('')}<path d="M153 246l15-10 15 10" fill="#0b303c" stroke="#68cbbd"/><path d="M276 100h33v80h-57" fill="none" stroke="#97b3bb" stroke-dasharray="4 5"/><rect x="278" y="180" width="42" height="42" rx="3" fill="#d9ac73"/><rect x="287" y="189" width="24" height="24" fill="#183943"/></svg>`;
}

export function crossSection(index) {
  const segments = [42, 126, 210];
  let layers = '<rect x="28" y="145" width="280" height="48" fill="#a6bdcb"/>';
  if (index >= 0 && index < 3) layers += '<rect x="28" y="113" width="280" height="32" fill="#57bdb3"/>';
  else if (index >= 3) layers += segments.map(x => `<rect x="${x}" y="113" width="55" height="32" fill="#57bdb3"/>`).join('');
  if (index === 1) layers += '<rect x="28" y="84" width="280" height="29" fill="#e1ad70"/>';
  if (index === 2 || index === 3) layers += segments.map(x => `<rect x="${x}" y="84" width="55" height="29" fill="#e1ad70"/>`).join('');
  if (index === 3) layers += '<path d="M111 33v93m84-93v93m84-93v93m-172-8 4 8 4-8m76 0 4 8 4-8m76 0 4 8 4-8" fill="none" stroke="#0f766e" stroke-width="2"/>';
  if (index === 5) layers += '<path d="M42 87v-12h55v12m-55-6h55" fill="none" stroke="#e1ad70" stroke-width="2"/>';
  return `<svg viewBox="0 0 336 220" role="img" aria-label="${index < 0 ? '尚未鋪設目標薄膜的矽基板' : ['待加工薄膜覆蓋基板', '光阻覆蓋薄膜', '光阻形成開口，下方薄膜仍完整', '蝕刻後薄膜形成圖形，光阻仍在', '去除光阻，留下材料圖形', '量測圖形尺寸'][index]}">${layers}<text x="168" y="175" text-anchor="middle" fill="#102d3a" font-size="16">矽基板</text></svg>`;
}

export function packageArt(index) {
  const base = '<rect x="24" y="168" width="288" height="22" rx="2" fill="#a6bdcb"/>';
  const ball = Array.from({ length: 9 }, (_, i) => `<circle cx="${48 + i * 30}" cy="203" r="5" fill="#d9ac73"/>`).join('');
  const chips = index === 0 ? '<rect x="100" y="105" width="136" height="48" fill="#57bdb3"/>' : index === 1 ? '<rect x="40" y="144" width="256" height="12" fill="#d9ac73"/><rect x="64" y="86" width="94" height="44" fill="#57bdb3"/><rect x="190" y="86" width="82" height="44" fill="#57bdb3"/><path d="M82 130v14h166v-14" fill="none" stroke="#d9ac73" stroke-width="2"/>' : '<rect x="83" y="62" width="170" height="35" fill="#57bdb3"/><rect x="83" y="108" width="170" height="35" fill="#3a8893"/><path d="M110 97v11m28-11v11m30-11v11m30-11v11m28-11v11" stroke="#d9ac73" stroke-width="4"/>';
  return `<svg viewBox="0 0 336 220" role="img" aria-label="${['單晶粒位於封裝基板上方', '晶粒並排，透過中介結構連接', '晶粒垂直堆疊並相互連接'][index]}">${base}${ball}${chips}${packageConnections(index)}<text x="168" y="184" text-anchor="middle" fill="#102d3a" font-size="14">封裝基板</text></svg>`;
}

export function signalArt(index) {
  const abnormal = index > 2;
  return `<svg viewBox="0 0 336 220" role="img" aria-label="製程監控示意；沒有實際量測值"><path d="M30 30v145h280M30 57h280M30 143h280" fill="none" stroke="#7194a1" stroke-dasharray="5 5"/><polyline points="30,103 63,89 96,111 129,90 162,102 195,80 228,${abnormal ? 35 : 99} 261,${abnormal ? 46 : 86} 294,${abnormal ? 34 : 100}" fill="none" stroke="${abnormal ? '#c2410c' : '#0369a1'}" stroke-width="3"/><text x="168" y="205" text-anchor="middle" fill="#334155" font-size="14">${abnormal ? '異常處置依據須回到實際量測' : '先確認資料，再判讀訊號'}</text></svg>`;
}

function packageConnections(index) {
  const posts = (xs, y1, y2) => xs.map(x => `<path d="M${x} ${y1}v${y2 - y1}" stroke="#d9ac73" stroke-width="5"/>`).join('');
  if (index === 0) return `${posts([118, 148, 178, 208], 153, 168)}<text x="168" y="135" text-anchor="middle" fill="#092b39" font-size="16">晶粒</text>`;
  if (index === 1) return `${posts([80, 110, 140, 208, 240, 260], 130, 144)}${posts([66, 100, 236, 270], 156, 168)}<text x="111" y="112" text-anchor="middle" fill="#092b39" font-size="15">晶粒</text><text x="231" y="112" text-anchor="middle" fill="#092b39" font-size="15">晶粒</text><text x="168" y="154" text-anchor="middle" fill="#092b39" font-size="12">中介結構</text>`;
  return `${posts([110, 138, 168, 198, 226], 143, 168)}<text x="168" y="86" text-anchor="middle" fill="#092b39" font-size="15">上層晶粒</text><text x="168" y="132" text-anchor="middle" fill="#ffffff" font-size="15">下層晶粒</text>`;
}

export function journeyArt(index) {
  if (index === 4) return packageArt(0);
  const caption = ['空白晶圓 · 材料表面', '局部放大 · 簡化平面元件', '局部放大 · 多層互連', '測試與分類 · 非實際良率'][index];
  let drawing;
  if (index === 0) drawing = '<circle cx="168" cy="104" r="82" fill="#91b7c5" stroke="#d4ebeb" stroke-width="2"/><ellipse cx="168" cy="104" rx="66" ry="82" fill="none" stroke="#b6d5dd"/><path d="M151 184l17-11 17 11" fill="#092b39" stroke="#d4ebeb"/>';
  if (index === 1) drawing = '<rect x="28" y="116" width="280" height="68" fill="#a6bdcb"/><rect x="47" y="116" width="68" height="30" fill="#57bdb3"/><rect x="221" y="116" width="68" height="30" fill="#57bdb3"/><rect x="131" y="100" width="74" height="16" fill="#f2da9b"/><rect x="131" y="60" width="74" height="40" fill="#3c8892"/><text x="168" y="88" text-anchor="middle" fill="white" font-size="16">閘極</text><text x="81" y="165" text-anchor="middle" fill="#092b39" font-size="15">源極區</text><text x="254" y="165" text-anchor="middle" fill="#092b39" font-size="15">汲極區</text>';
  if (index === 2) drawing = '<rect x="28" y="26" width="280" height="141" fill="#294c5c"/><rect x="28" y="167" width="280" height="25" fill="#a6bdcb"/><path d="M51 151h98M215 151h65M84 107h65M149 107h70M190 61h85" stroke="#d9ac73" stroke-width="12"/><path d="M149 151v-44m57 0V61M65 167v-16m175 16v-16" stroke="#d9ac73" stroke-width="9"/><text x="61" y="49" fill="#d8e8e9" font-size="15">介電層</text><text x="168" y="185" text-anchor="middle" fill="#092b39" font-size="14">元件區域</text>';
  if (index === 3) {
    const dies = Array.from({ length: 25 }, (_, i) => `<rect x="${158 + i % 5 * 24}" y="${40 + Math.floor(i / 5) * 24}" width="19" height="19" fill="${i % 7 === 0 ? '#d9ac73' : i % 3 === 0 ? '#7194a1' : '#57bdb3'}"/>`).join('');
    drawing = `<rect x="22" y="36" width="111" height="128" rx="4" fill="#214553" stroke="#7194a1"/><path d="M35 130l15-25 15 11 15-33 15 9 24-27" fill="none" stroke="#71ece3" stroke-width="3"/><text x="78" y="65" text-anchor="middle" fill="white" font-size="19">WAT</text>${dies}<text x="216" y="186" text-anchor="middle" fill="#334155" font-size="15">CP 晶粒分類圖</text><text x="78" y="186" text-anchor="middle" fill="#334155" font-size="15">製程電性</text>`;
  }
  return `<svg viewBox="0 0 336 230" role="img" aria-label="${caption}">${drawing}<text x="168" y="221" text-anchor="middle" fill="#334155" font-size="13">${caption}</text></svg>`;
}

export function dispatchArt(s, index) {
  const roles = [
    ['MES', '路徑／批次狀態', 18, 20, [0, 3, 4]],
    ['派工系統', '安排作業', 204, 20, [1]],
    ['機台自動化', '核對／回寫', 18, 122, [3, 4]],
    ['加工機台', '配方與加工', 204, 122, [1, 2, 3, 4]],
    ['搬運系統', '晶圓盒（FOUP）', 18, 224, [2]]
  ];
  const box = ([title, detail, x, y, active]) => `<div class="dispatch-role ${active.includes(index) ? 'is-active' : ''}" style="left:${x / 360 * 100}%;top:${y / 320 * 100}%" role="group" aria-label="${title}${active.includes(index) ? '，本節焦點' : ''}"><strong>${title}</strong><span>${detail}</span></div>`;
  const line = (d, active, physical = false) => `<path d="${d}" fill="none" stroke="${active ? '#0f766e' : '#64748b'}" stroke-width="${active ? 3 : 1.5}" ${physical ? '' : 'stroke-dasharray="5 4"'}/>`;
  return `<div class="dispatch-diagram" role="group" aria-label="${esc(s.nodes[index].title)}的系統角色"><svg class="dispatch-lines" viewBox="0 0 360 320" preserveAspectRatio="none" aria-hidden="true">
    ${line('M156 52h48m-8-5 8 5-8 5', index < 2)}
    ${line('M273 84v38m-5-8 5 8 5-8', index === 1)}
    ${line('M87 84v38m-5-8 5 8 5-8m-10-22 5-8 5 8', index >= 3)}
    ${line('M156 154h48m-8-5 8 5-8 5m-32-10-8 5 8 5', index >= 3)}
    ${line('M156 256h117v-70m-5 8 5-8 5 8', index === 2, true)}
    </svg>${roles.map(box).join('')}<span class="dispatch-physical">晶圓盒搬運</span></div><p class="dispatch-focus">本節焦點：${esc(s.nodes[index].title)}</p>`;
}

const openComparisons = new Set();
export const comparisonIsOpen = id => openComparisons.has(id);
const changes = [
  '從矽基板起始狀態，到待加工薄膜覆蓋表面。',
  '薄膜上新增光阻，薄膜本身的形狀尚未改變。',
  '連續光阻形成開口；下方目標薄膜仍完整。',
  '開口下的目標薄膜被移除；保護區上方仍保留光阻。',
  '光阻被移除，目標材料的圖形保留下來。',
  '增加尺寸量測標示；量測本身不代表材料形狀改變。'
];

export function renderComparison(s, n) {
  if (!['pattern', 'packaging'].includes(s.id)) return '';
  const index = s.nodes.indexOf(n);
  const pattern = s.id === 'pattern';
  return `<section id="diagramComparison" class="visual-comparison" ${comparisonIsOpen(s.id) ? '' : 'hidden'} aria-labelledby="comparisonTitle">
    <div class="comparison-heading"><div><p class="explorer-kicker">${pattern ? '同一位置 · 對照材料變化' : '相同觀察角度 · 對照連接方式'}</p><h3 id="comparisonTitle" tabindex="-1">${pattern ? `${esc(n.title)}：前後有何不同？` : '三種封裝結構，一起看'}</h3></div><button type="button" data-explorer-view="detail">返回解說 ↑</button></div>
    ${pattern ? `<p class="comparison-change">${changes[index]}</p><div class="comparison-legend" aria-label="材料圖例"><span><i aria-hidden="true"></i>矽基板</span><span><i aria-hidden="true"></i>目標薄膜</span><span><i aria-hidden="true"></i>光阻</span></div><div class="comparison-pair"><figure><figcaption><span>之前</span>${index ? esc(s.nodes[index - 1].title) : '起始矽基板'}</figcaption>${crossSection(index - 1)}</figure><figure><figcaption><span>之後</span>${esc(n.title)}</figcaption>${crossSection(index)}</figure></div><nav class="comparison-steps" aria-label="選擇要對照的製程步驟">${s.nodes.map((node, i) => `<a href="#explore/pattern/${node.id}" ${node.id === n.id ? 'aria-current="step"' : ''}>${i + 1}. ${esc(node.title)}</a>`).join('')}</nav>` : `<div class="packaging-comparison">${s.nodes.map((node, i) => `<article class="package-option ${node.id === n.id ? 'is-selected' : ''}"><h4><a href="#explore/packaging/${node.id}" ${node.id === n.id ? 'aria-current="true"' : ''}>${esc(node.title)}${node.id === n.id ? '<span>目前查看</span>' : ''}</a></h4><div class="package-option-art">${packageArt(i)}</div><dl><dt>如何連接</dt><dd>${esc(node.detail)}</dd><dt>工程重點</dt><dd>${esc(node.look)}</dd><dt>理解目標</dt><dd>${esc(node.result)}</dd></dl><a class="comparison-source" href="#${node.chapter}?from=packaging%2F${node.id}">閱讀本項教材 ↗</a></article>`).join('')}</div>`}
    <p class="comparison-note">${pattern ? '同一教學剖面的狀態對照，未按比例；顏色表示不同材料。' : '並列選項，沒有先後或優劣排名；同樣大小的圖框不代表實際尺寸相同，非特定產品結構。'}</p>
  </section>`;
}

export function bindComparison(container, id, revealComparison) {
  const button = container.querySelector('.compare-toggle');
  if (!button) return;
  button.addEventListener('click', () => {
    const open = !comparisonIsOpen(id);
    if (open) openComparisons.add(id); else openComparisons.delete(id);
    button.setAttribute('aria-expanded', String(open));
    container.querySelector('#diagramComparison').hidden = !open;
    if (open) revealComparison();
  });
}
