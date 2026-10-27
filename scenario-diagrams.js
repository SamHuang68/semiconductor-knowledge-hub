const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function waferArt() {
  const dies = [];
  for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) {
    const dx = x - 4;
    const dy = y - 4;
    if (dx * dx + dy * dy > 18) continue;
    const partial = (x + y) % 5 === 0;
    dies.push(`<rect x="${78 + x * 18}" y="${36 + y * 18}" width="15" height="15" fill="${partial ? '#fde68a' : '#99f6e4'}" stroke="#0f766e" stroke-width="0.6"/>`);
  }
  return `<svg viewBox="0 0 360 280" role="img" aria-label="空白晶圓示意：晶粒格、缺口與平坦邊，未按比例">
    <circle cx="168" cy="128" r="104" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
    <circle cx="168" cy="128" r="96" fill="#f8fafc" stroke="#64748b"/>
    ${dies.join('')}
    <path d="M150 230 l18 -12 18 12" fill="#f8fafc" stroke="#334155"/>
    <text x="168" y="132" text-anchor="middle" fill="#0f172a" font-size="13" font-weight="700">Si</text>
    <text x="168" y="262" text-anchor="middle" fill="#334155" font-size="12">未按比例 · 缺口朝下</text>
  </svg>`;
}

export function crossSection(index) {
  const labels = ['待加工薄膜覆蓋基板', '光阻覆蓋薄膜', '光阻形成開口，下方薄膜仍完整', '蝕刻後薄膜形成圖形，光阻仍在', '去除光阻，留下材料圖形', '量測圖形尺寸'];
  const aria = index < 0 ? '尚未鋪設目標薄膜的矽基板' : labels[index];
  const windows = [48, 168, 288];
  const filmFull = index >= 0 && index < 3;
  const filmPattern = index >= 3;
  const resistFull = index === 1;
  const resistOpen = index === 2 || index === 3;
  let layers = '<rect x="36" y="168" width="360" height="52" fill="#a6bdcb" stroke="#334155"/>';
  layers += '<text x="216" y="200" text-anchor="middle" fill="#0f172a" font-size="14">矽基板</text>';
  if (filmFull) layers += '<rect x="36" y="132" width="360" height="36" fill="#57bdb3" stroke="#0f766e"/>';
  if (filmPattern) layers += windows.map(x => `<rect x="${x}" y="132" width="72" height="36" fill="#57bdb3" stroke="#0f766e"/>`).join('');
  if (resistFull) layers += '<rect x="36" y="96" width="360" height="36" fill="#e1ad70" stroke="#92400e"/>';
  if (resistOpen) layers += windows.map(x => `<rect x="${x}" y="96" width="72" height="36" fill="#e1ad70" stroke="#92400e"/>`).join('');
  if (index === 3) layers += windows.map(x => `<path d="M${x + 36} 78 v58" fill="none" stroke="#0f766e" stroke-width="1.5" stroke-dasharray="3 3"/>`).join('');
  if (index === 5) layers += '<path d="M48 84 h72 M48 84 v8 M120 84 v8" fill="none" stroke="#0f172a" stroke-width="1.5"/><text x="84" y="76" text-anchor="middle" fill="#0f172a" font-size="12">CD</text>';
  const callout = index < 0 ? '只有基板' : (index < 3 ? '目標薄膜仍連續' : '開口下的薄膜已分成線條');
  return `<svg viewBox="0 0 520 250" role="img" aria-label="${aria}">
    <text x="16" y="22" fill="#334155" font-size="12">未按比例 · 顏色對應圖例</text>
    <text x="16" y="44" fill="#0f172a" font-size="14" font-weight="700">${aria}</text>
    ${layers}
    <text x="430" y="118" fill="#92400e" font-size="12">${resistFull || resistOpen ? '光阻' : ''}</text>
    <text x="430" y="154" fill="#0f766e" font-size="12">${index >= 0 ? '目標薄膜' : ''}</text>
    <text x="16" y="238" fill="#334155" font-size="12">${callout}</text>
  </svg>`;
}

export function packageArt(index) {
  const aria = ['單晶粒位於封裝基板上方', '晶粒並排，透過中介結構連接', '晶粒垂直堆疊並相互連接'][index];
  const balls = Array.from({ length: 8 }, (_, i) => `<circle cx="${64 + i * 36}" cy="214" r="6" fill="#d9ac73" stroke="#92400e"/>`).join('');
  const substrate = '<rect x="28" y="168" width="360" height="28" fill="#a6bdcb" stroke="#334155"/><text x="208" y="187" text-anchor="middle" fill="#0f172a" font-size="13">封裝基板</text>';
  let body = '';
  if (index === 0) {
    body = '<rect x="132" y="96" width="152" height="56" fill="#57bdb3" stroke="#0f766e"/><text x="208" y="128" text-anchor="middle" fill="#0f172a" font-size="14">晶粒</text><path d="M156 152 v16 M208 152 v16 M260 152 v16" stroke="#92400e" stroke-width="3"/>';
  } else if (index === 1) {
    body = '<rect x="40" y="148" width="336" height="16" fill="#fde68a" stroke="#92400e"/><text x="208" y="160" text-anchor="middle" fill="#0f172a" font-size="11">中介層</text><rect x="72" y="88" width="120" height="48" fill="#57bdb3" stroke="#0f766e"/><rect x="220" y="96" width="100" height="40" fill="#99f6e4" stroke="#0f766e"/><text x="132" y="116" text-anchor="middle" fill="#0f172a" font-size="13">晶粒</text><text x="270" y="120" text-anchor="middle" fill="#0f172a" font-size="13">晶粒</text>';
  } else {
    body = '<rect x="108" y="112" width="200" height="40" fill="#bae6fd" stroke="#075985"/><text x="208" y="137" text-anchor="middle" fill="#0f172a" font-size="13">下層晶粒</text><rect x="108" y="60" width="200" height="40" fill="#57bdb3" stroke="#0f766e"/><text x="208" y="85" text-anchor="middle" fill="#0f172a" font-size="13">上層晶粒</text><path d="M148 100 v12 M188 100 v12 M228 100 v12 M268 100 v12" stroke="#92400e" stroke-width="4"/>';
  }
  return `<svg viewBox="0 0 420 250" role="img" aria-label="${aria}"><text x="16" y="22" fill="#334155" font-size="12">未按比例 · 並列結構，沒有先後</text><text x="16" y="42" fill="#0f172a" font-size="14" font-weight="700">${aria}</text>${substrate}${balls}${body}</svg>`;
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
  let drawing = '';
  if (index === 0) {
    drawing = '<circle cx="180" cy="120" r="78" fill="#e2e8f0" stroke="#334155" stroke-width="2"/><circle cx="180" cy="120" r="70" fill="#f8fafc" stroke="#64748b"/><path d="M166 196 l14 -10 14 10" fill="#f8fafc" stroke="#334155"/><text x="180" y="124" text-anchor="middle" fill="#0f172a" font-size="14">矽晶圓</text>';
  }
  if (index === 1) {
    drawing = '<rect x="40" y="132" width="320" height="64" fill="#a6bdcb" stroke="#334155"/><rect x="70" y="132" width="70" height="28" fill="#57bdb3" stroke="#0f766e"/><rect x="250" y="132" width="70" height="28" fill="#57bdb3" stroke="#0f766e"/><rect x="150" y="112" width="80" height="20" fill="#fde68a" stroke="#92400e"/><rect x="150" y="68" width="80" height="44" fill="#bae6fd" stroke="#075985"/><text x="190" y="94" text-anchor="middle" fill="#0f172a" font-size="14">閘極</text><text x="105" y="176" text-anchor="middle" fill="#0f172a" font-size="13">源極</text><text x="285" y="176" text-anchor="middle" fill="#0f172a" font-size="13">汲極</text>';
  }
  if (index === 2) {
    drawing = '<rect x="40" y="150" width="320" height="36" fill="#a6bdcb" stroke="#334155"/><text x="200" y="172" text-anchor="middle" fill="#0f172a" font-size="13">元件區</text><rect x="40" y="78" width="320" height="72" fill="#f8fafc" stroke="#64748b"/><path d="M70 132 h90 M190 132 h70 M110 100 h80 M210 100 h80" stroke="#d97706" stroke-width="8" stroke-linecap="square"/><path d="M100 150 v-18 M230 150 v-50" stroke="#d97706" stroke-width="6"/><text x="56" y="70" fill="#0f172a" font-size="13">介電層</text><text x="300" y="96" fill="#92400e" font-size="12">金屬</text>';
  }
  if (index === 3) {
    const dies = Array.from({ length: 25 }, (_, i) => `<rect x="${210 + (i % 5) * 22}" y="${58 + Math.floor(i / 5) * 22}" width="18" height="18" fill="${i % 7 === 0 ? '#fde68a' : '#99f6e4'}" stroke="#0f766e"/>`).join('');
    drawing = `<rect x="36" y="52" width="140" height="120" fill="#f8fafc" stroke="#334155"/><path d="M52 140 l20 -28 16 12 18 -36 16 10 28 -24" fill="none" stroke="#075985" stroke-width="2"/><text x="106" y="78" text-anchor="middle" fill="#0f172a" font-size="16">WAT</text><text x="106" y="156" text-anchor="middle" fill="#334155" font-size="12">製程電性</text>${dies}<text x="264" y="184" text-anchor="middle" fill="#334155" font-size="12">分類示意，非實際良率</text>`;
  }
  return `<svg viewBox="0 0 420 230" role="img" aria-label="${caption}"><text x="16" y="22" fill="#334155" font-size="12">未按比例</text>${drawing}<text x="210" y="218" text-anchor="middle" fill="#334155" font-size="13">${caption}</text></svg>`;
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
