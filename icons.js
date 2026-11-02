// 站內圖示：24 格線、單色 currentColor、圓角線條，與頁首既有圖示同一畫法；不引入外部圖示套件。
// 只放已用到的圖示；新增時沿用同一線寬與留白（有效區約 20×20，四周留 2）。
const PATHS = {
  // 說明框
  term: '<path d="M4 5.5C6.5 4 9.5 4 12 5.5 14.5 4 17.5 4 20 5.5V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0z"/><path d="M12 5.5V19"/>',
  knowhow: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3.5 17.5l3 3 5.8-5.8a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  // 晶圓：圓形、底部缺口、中間幾顆晶粒（格線版在小尺寸時像地球儀）
  wafer: '<path d="M10.7 20.9A9 9 0 1 1 13.3 20.9L12 19.3z"/><rect x="7.8" y="7.8" width="3.6" height="3.6" rx=".4"/><rect x="12.6" y="7.8" width="3.6" height="3.6" rx=".4"/><rect x="7.8" y="12.6" width="3.6" height="3.6" rx=".4"/><rect x="12.6" y="12.6" width="3.6" height="3.6" rx=".4"/>',
  // 名詞卡固定標籤
  definition: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5v-15z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/><path d="M9 7.5h6M9 11h4"/>',
  usage: '<path d="M4 5h16v11H10l-4.5 3.5V16H4V5z"/><path d="M8 9.5h8M8 12.5h5"/>',
  terms: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.3 10.9l7.4-3.8M8.3 13.1l7.4 3.8"/>',
  confusion: '<path d="M5 9.5h14M5 14.5h14"/><path d="M15.5 5 8.5 19"/>',
  // Know-how 固定標籤
  situation: '<path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>',
  practice: '<path d="M9.5 6h10M9.5 12h10M9.5 18h10"/><path d="M4 6l1.2 1.2L7.5 5M4 12l1.2 1.2L7.5 11M4 18l1.2 1.2L7.5 17"/>',
  why: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  risk: '<path d="M12 3.5 2.5 20h19L12 3.5z"/><path d="M12 10v4.5M12 17.2v.1"/>',
  related: '<path d="M10 13.5a4.5 4.5 0 0 0 6.8.5l2.7-2.7a4.5 4.5 0 0 0-6.4-6.4l-1.5 1.5"/><path d="M14 10.5a4.5 4.5 0 0 0-6.8-.5l-2.7 2.7a4.5 4.5 0 0 0 6.4 6.4l1.5-1.5"/>',
  // 正文條列（依標籤語意）
  insulator: '<path d="M12 3 5 6v5.5c0 4 3 7.2 7 9.5 4-2.3 7-5.5 7-9.5V6l-7-3z"/><path d="M9 12h6"/>',
  conductor: '<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8z"/>',
  layers: '<path d="M12 3.5 3 8l9 4.5L21 8l-9-4.5z"/><path d="M3 12.5 12 17l9-4.5"/><path d="M3 16.5 12 21l9-4.5"/>',
  gas: '<circle cx="8.5" cy="12" r="3.5"/><circle cx="15.5" cy="12" r="3.5"/>',
  drop: '<path d="M12 3.5s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/>',
  thickness: '<path d="M4 4h16M4 20h16"/><path d="M12 6.5v11"/><path d="M9.5 9 12 6.5 14.5 9M9.5 15 12 17.5l2.5-2.5"/>',
  uniform: '<circle cx="12" cy="12" r="8.5"/><path d="M7 10h10M7 14h10"/>',
  step: '<path d="M2.5 7.5h5v10h9v-10h5"/><path d="M2.5 10.5h3v9.5h13v-9.5h3" stroke-dasharray="2 2"/>',
  stress: '<path d="M3 15.5c3.5-4.5 14.5-4.5 18 0"/><path d="M6 8.5 3.2 11.3 6 14M18 8.5l2.8 2.8L18 14"/>',
  particle: '<circle cx="7" cy="8" r="2"/><circle cx="16" cy="7" r="1.4"/><circle cx="12" cy="14" r="2.6"/><circle cx="18" cy="17" r="1.6"/><circle cx="6" cy="17" r="1.2"/>',
  array: '<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16"/>',
  circuit: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/>',
  reticle: '<path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
  defect: '<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M4 12h16M12 4v16"/><circle cx="16" cy="8" r="2" fill="currentColor" stroke="none"/>',
  chiplets: '<rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="1"/><rect x="3.5" y="13" width="17" height="7.5" rx="1"/>',
  bandwidth: '<path d="M3 8h15M14 4l4 4-4 4"/><path d="M21 16H6M10 12l-4 4 4 4"/>'
};

// 裝飾用圖示一律 aria-hidden，文字意義由旁邊的文字承擔
export function icon(name, cls = '') {
  const paths = PATHS[name];
  if (!paths) throw new Error(`沒有這個圖示：${name}`);
  return `<svg class="ui-icon${cls ? ` ${cls}` : ''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`;
}

export const ICON_NAMES = Object.keys(PATHS);
