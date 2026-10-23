/**
 * verify-light-theme.mjs
 * 規則 0003：簡報與網頁一律只用淡色系（嚴格禁止任何深暗色底）自動化門禁
 * 包含：
 * 1. 背景明度門禁 (Background Luminance Gate)
 * 2. 禁絕深黑底主題 (No Dark Mode Gate)
 * 3. 晶圓黃光微影模式淡色基底門禁 (Litho Amber Light-Base Gate)
 * 4. 關鍵主視圖淡色載體門禁 (Key Views Pale-Surface Gate)
 * 5. 圖像載體對比門禁契約 (Asset-on-Carrier Contrast Gate)
 * 6. 主題切換器收斂門禁 (Theme Switcher Convergence Gate)
 * 7. 彈窗內部元件無塵室淡色門禁 (Modal Components Pale-Surface Gate)
 * 8. 實體照片面板與 Lightbox 淡色載體門禁 (Photo Panel & Lightbox Carrier Gate)
 * 9. 程式碼區塊與橫截面演變帶淡色無塵室門禁 (Code Block & Atlas Stream Cleanroom Gate)
 * 10. 行動端表格響應式防溢出門禁 (Responsive Data Table Gate)
 * 11. 工程物件 SVG 淺色調色盤涵蓋門禁 (SVG Palette Coverage Gate)
 * 12. 照片燈箱內部元件淡色門禁 (Lightbox Interior Gate)
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

let errors = [];

function check(desc, fn) {
  try {
    fn();
    console.log(`[PASS] ${desc}`);
  } catch (err) {
    console.error(`[FAIL] ${desc}: ${err.message}`);
    errors.push(`${desc}: ${err.message}`);
  }
}

/**
 * 計算 sRGB 十六進位或 RGB 值的相對明度 (Relative Luminance)
 * 公式: Y = 0.2126*R + 0.7152*G + 0.0722*B (WCAG 2.1)
 */
function getRelativeLuminance(hex) {
  let r = 0, g = 0, b = 0;
  hex = hex.trim().toLowerCase();
  if (hex.startsWith('#')) {
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length >= 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
  } else if (hex.startsWith('rgb')) {
    const parts = hex.match(/\d+/g);
    if (parts && parts.length >= 3) {
      r = parseInt(parts[0], 10);
      g = parseInt(parts[1], 10);
      b = parseInt(parts[2], 10);
    }
  }
  const [lr, lg, lb] = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

console.log('=== 開始檢驗 規則 0003 淡色系與載體對比門禁 (Rule 0003 Light Theme Gate) ===');

// 1. 檢驗 styles.css 是否已移除 [data-theme="dark"]
check('禁絕深暗色模式門禁：styles.css 不得存在 [data-theme="dark"] 主題塊', () => {
  const css = readFileSync(resolve(ROOT, 'styles.css'), 'utf8');
  if (/\[data-theme="dark"\]/.test(css)) {
    throw new Error('發現 [data-theme="dark"] 選擇器，違反規則 0003 嚴格禁止深色底規範');
  }
});

// 2. 檢驗 500nm 黃光微影濾光模式的基底明度 (必須 >= 0.70)
check('無塵室 500nm 黃光微影模式淡色基底門禁：--bg-app 與 --bg-surface 明度 >= 0.70', () => {
  const css = readFileSync(resolve(ROOT, 'styles.css'), 'utf8');
  const match = css.match(/\[data-theme="litho-amber"\]\s*\{([\s\S]*?)\}/);
  if (!match) throw new Error('未找到 [data-theme="litho-amber"] 定義');
  const block = match[1];
  const bgAppMatch = block.match(/--bg-app:\s*([^;]+);/);
  const bgSurfaceMatch = block.match(/--bg-surface:\s*([^;]+);/);
  if (!bgAppMatch || !bgSurfaceMatch) throw new Error('缺少 --bg-app 或 --bg-surface');
  
  const lumApp = getRelativeLuminance(bgAppMatch[1]);
  const lumSurface = getRelativeLuminance(bgSurfaceMatch[1]);
  if (lumApp < 0.70) throw new Error(`--bg-app (${bgAppMatch[1]}) 明度過低: ${lumApp.toFixed(3)} < 0.70`);
  if (lumSurface < 0.70) throw new Error(`--bg-surface (${bgSurfaceMatch[1]}) 明度過低: ${lumSurface.toFixed(3)} < 0.70`);
});

// 3. 檢驗關鍵容器的淡色載體明度 (情境探索、工程物件、圖例、訊號判讀)
check('關鍵主視圖載體明度門禁：Hero、工程舞台、圖例與訊號視圖均為淡色載體 (Luminance >= 0.65)', () => {
  const exploreCss = readFileSync(resolve(ROOT, 'scenario-explorer.css'), 'utf8');
  const engCss = readFileSync(resolve(ROOT, 'engineering-objects.css'), 'utf8');
  const legendCss = readFileSync(resolve(ROOT, 'legend-viewer.css'), 'utf8');
  const signalCss = readFileSync(resolve(ROOT, 'signal-reading.css'), 'utf8');

  // 檢查情境探索 hero
  if (/\.explorer-hero[^{]*\{[^}]*background:\s*#092b39/i.test(exploreCss)) {
    throw new Error('情境探索 .explorer-hero 使用了深黑/墨青底 #092b39');
  }
  // 檢查工程物件舞台
  if (/\.eng-obj-stage[^{]*\{[^}]*background(-color)?:\s*(#081119|#000000|#0f172a)/i.test(engCss)) {
    throw new Error('工程物件 .eng-obj-stage 使用了深色舞台背景');
  }
  // 檢查圖例檢視
  if (/\.diagram-viewport[^{]*\{[^}]*background:\s*#092b39/i.test(legendCss)) {
    throw new Error('圖例檢視 .diagram-viewport 使用了深色背景 #092b39');
  }
  // 檢查訊號判讀
  if (/\.signal-plot[^{]*\{[^}]*background:\s*#092b39/i.test(signalCss)) {
    throw new Error('訊號判讀 .signal-plot 使用了深色背景 #092b39');
  }
});

// 4. 圖像與圖示資產載體對比門禁契約 (Asset-on-Carrier Contrast Gate)
check('圖像資產載體對比門禁：核心 SVG 資產在淺色載體 (#FFFFFF) 上不得全白或無對比度', () => {
  const coverSvg = readFileSync(resolve(ROOT, 'assets/cover.svg'), 'utf8');
  const waferSvg = readFileSync(resolve(ROOT, 'assets/16-wafer-map-patterns.svg'), 'utf8');

  // 確保包含深色筆畫或高反差主體，非純透明白線
  if (!/(stroke|fill)="(#0|#1|#2|#3|#4|currentColor|var)/i.test(coverSvg)) {
    throw new Error('assets/cover.svg 缺乏高對比前景定義');
  }
  if (!/(stroke|fill)="(#0|#1|#2|#3|#4|currentColor|var)/i.test(waferSvg)) {
    throw new Error('assets/16-wafer-map-patterns.svg 缺乏高對比前景定義');
  }
});

// 5. 檢驗 index.html 頂部主題按鈕是否已收斂為雙態 (亮色 / 500nm 黃光)
check('主題切換器收斂門禁：index.html 中主題按鈕為 2 態 (取消暗色，保留亮色與 500nm 琥珀黃光)', () => {
  const html = readFileSync(resolve(ROOT, 'index.html'), 'utf8');
  if (/data-theme="dark"/.test(html)) {
    throw new Error('index.html 中仍存在 data-theme="dark" 按鈕');
  }
  if (!/data-theme="light"/.test(html) || !/data-theme="litho-amber"/.test(html)) {
    throw new Error('index.html 需包含 light 與 litho-amber 主題按鈕');
  }
});

// 6. 檢驗三大彈窗內部核心卡片元件無塵室淡色門禁 (Modal Components Pale-Surface Gate)
check('彈窗內部元件無塵室淡色門禁：速算公式條、快測選項卡與 OCAP 步驟節點均為淺色 (Luminance >= 0.70)', () => {
  const engCss = readFileSync(resolve(ROOT, 'engineering-objects.css'), 'utf8');

  // 檢查 calc-formula-banner
  const calcBannerMatch = engCss.match(/\.calc-formula-banner\s*\{[\s\S]*?background:\s*([^;]+);/);
  if (!calcBannerMatch) throw new Error('未找到 .calc-formula-banner 背景設定');
  const calcBannerBg = calcBannerMatch[1].trim();
  const lumCalcBanner = getRelativeLuminance(calcBannerBg);
  if (lumCalcBanner < 0.70) throw new Error(`.calc-formula-banner 背景 (${calcBannerBg}) 明度過低: ${lumCalcBanner.toFixed(3)} < 0.70`);

  // 檢查 quiz-opt-btn
  const quizOptMatch = engCss.match(/\.quiz-opt-btn\s*\{[\s\S]*?background:\s*([^;]+);/);
  if (!quizOptMatch) throw new Error('未找到 .quiz-opt-btn 背景設定');
  const quizOptBg = quizOptMatch[1].trim();
  const lumQuizOpt = getRelativeLuminance(quizOptBg);
  if (lumQuizOpt < 0.70) throw new Error(`.quiz-opt-btn 背景 (${quizOptBg}) 明度過低: ${lumQuizOpt.toFixed(3)} < 0.70`);

  // 檢查 ocap-step-node
  const ocapNodeMatch = engCss.match(/\.ocap-step-node\s*\{[\s\S]*?background:\s*([^;]+);/);
  if (!ocapNodeMatch) throw new Error('未找到 .ocap-step-node 背景設定');
  const ocapNodeBg = ocapNodeMatch[1].trim();
  const lumOcapNode = getRelativeLuminance(ocapNodeBg);
  if (lumOcapNode < 0.70) throw new Error(`.ocap-step-node 背景 (${ocapNodeBg}) 明度過低: ${lumOcapNode.toFixed(3)} < 0.70`);
});

// 7. 檢驗實體照片面板與 Lightbox 淡色載體門禁 (Photo Panel & Lightbox Carrier Gate)
check('實體照片面板與 Lightbox 淡色載體門禁：Photo Panel 與 Lightbox 均為淡色無塵室實驗面板', () => {
  const engCss = readFileSync(resolve(ROOT, 'engineering-objects.css'), 'utf8');

  const photoPanelMatch = engCss.match(/\.eng-obj-photo-panel\s*\{[\s\S]*?background:\s*([^;]+);/);
  if (!photoPanelMatch) throw new Error('未找到 .eng-obj-photo-panel 背景設定');
  const photoPanelBg = photoPanelMatch[1].trim();
  const lumPhotoPanel = getRelativeLuminance(photoPanelBg);
  if (lumPhotoPanel < 0.70) throw new Error(`.eng-obj-photo-panel 背景 (${photoPanelBg}) 明度過低: ${lumPhotoPanel.toFixed(3)} < 0.70`);

  const lightboxMatch = engCss.match(/\.photo-lightbox-modal\s*\{[\s\S]*?background:\s*([^;]+);/);
  if (!lightboxMatch) throw new Error('未找到 .photo-lightbox-modal 背景設定');
  const lightboxBg = lightboxMatch[1].trim();
  const lumLightbox = getRelativeLuminance(lightboxBg);
  if (lumLightbox < 0.70) throw new Error(`.photo-lightbox-modal 背景 (${lightboxBg}) 明度過低: ${lumLightbox.toFixed(3)} < 0.70`);
});

// 8. 檢驗程式碼區塊與橫截面演變帶淡色無塵室門禁 (Code Block & Atlas Stream Cleanroom Gate)
check('程式碼區塊與橫截面演變帶淡色無塵室門禁：.code-pre 與 .atlas-stream-banner 為淡色底', () => {
  const stylesCss = readFileSync(resolve(ROOT, 'styles.css'), 'utf8');

  const codeMatch = stylesCss.match(/\.code-pre\s*\{[\s\S]*?background:\s*([^;]+);/);
  if (!codeMatch) throw new Error('未找到 .code-pre 背景設定');
  const codeBg = codeMatch[1].trim();
  const lumCode = getRelativeLuminance(codeBg);
  if (lumCode < 0.70) throw new Error(`.code-pre 背景 (${codeBg}) 明度過低: ${lumCode.toFixed(3)} < 0.70`);

  const atlasBannerMatch = stylesCss.match(/\.atlas-stream-banner\s*\{[\s\S]*?background:\s*([^;]+);/);
  if (!atlasBannerMatch) throw new Error('未找到 .atlas-stream-banner 背景設定');
  const atlasBannerBg = atlasBannerMatch[1].trim();
  const lumAtlasBanner = getRelativeLuminance(atlasBannerBg);
  if (lumAtlasBanner < 0.70) throw new Error(`.atlas-stream-banner 背景 (${atlasBannerBg}) 明度過低: ${lumAtlasBanner.toFixed(3)} < 0.70`);
});

// 9. 檢驗行動端表格響應式防溢出門禁 (Responsive Data Table Gate)
check('行動端表格響應式防溢出門禁：.table-container 包含 overflow-x: auto 與 max-width: 100%', () => {
  const stylesCss = readFileSync(resolve(ROOT, 'styles.css'), 'utf8');
  const tableContainerMatch = stylesCss.match(/\.table-container\s*\{([\s\S]*?)\}/);
  if (!tableContainerMatch) throw new Error('未找到 .table-container 定義');
  const block = tableContainerMatch[1];
  if (!/overflow-x:\s*auto/i.test(block)) {
    throw new Error('.table-container 缺少 overflow-x: auto 宣告');
  }
  if (!/max-width:\s*100%/i.test(block)) {
    throw new Error('.table-container 缺少 max-width: 100% 宣告');
  }
});

// 10. 工程物件 SVG 淺色調色盤涵蓋門禁 (SVG Palette Coverage Gate)
// 2.5.0 只把外框改成淺色，SVG 內部的深色面板與淺色字未完整對應，造成深字疊深底（2.6.1 修正）。
// engineering-objects.js 用到的每個深色中性填色與淺色文字，都必須在engineering-objects.css 的調色盤層有對應。
check('工程物件 SVG 淺色調色盤涵蓋門禁：深色面板與淺色字皆有淺色主題對應', () => {
  const engJs = readFileSync(resolve(ROOT, 'engineering-objects.js'), 'utf8');
  const engCss = readFileSync(resolve(ROOT, 'engineering-objects.css'), 'utf8');
  const saturation = hex => {
    const h = hex.slice(1).length === 3 ? hex.slice(1).split('').map(c => c + c).join('') : hex.slice(1);
    const c = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
    const max = Math.max(...c), min = Math.min(...c);
    return max ? (max - min) / max : 0;
  };
  // 原始碼中的 fill 屬性值（含 ${條件 ? '#a' : '#b'} 這類動態顏色）
  const usedShape = new Set(), usedText = new Set();
  for (const m of engJs.matchAll(/<(rect|path|circle|ellipse|polygon|text|tspan)\b[^>]*?\bfill="((?:[^"$]|\$\{[^}]*\})*)"/g)) {
    for (const h of m[2].matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)) {
      (/^(text|tspan)$/.test(m[1]) ? usedText : usedShape).add(h[0].toLowerCase());
    }
  }
  // 調色盤層：以規則的主體（最後一個 + 之後）判斷對應的是文字或圖形
  const mappedShape = new Set(), mappedText = new Set();
  for (const m of engCss.matchAll(/(\.eng-obj-viewport[^{}]*)\{([^}]*)\}/g)) {
    if (!/\bfill\s*:/.test(m[2])) continue;
    const subject = m[1].split('+').pop().replace(/:has\([^)]*\)+/g, '');
    const target = /\b(text|tspan)\b/.test(subject) ? mappedText : /\brect\b/.test(subject) ? mappedShape : null;
    if (!target) continue;
    for (const h of subject.matchAll(/\[fill="(#[0-9a-fA-F]{3,6})"\]/g)) target.add(h[1].toLowerCase());
  }
  const darkShapes = [...usedShape].filter(h => { const l = getRelativeLuminance(h); return l < 0.06 || (l < 0.12 && saturation(h) < 0.5); });
  const lightTexts = [...usedText].filter(h => getRelativeLuminance(h) > 0.2);
  const missingShape = darkShapes.filter(h => !mappedShape.has(h));
  const missingText = lightTexts.filter(h => !mappedText.has(h));
  if (missingShape.length) throw new Error(`深色填色未對應淺色材質：${missingShape.join(', ')}`);
  if (missingText.length) throw new Error(`淺色文字未對應深色字：${missingText.join(', ')}`);
  if (/<foreignObject/.test(engJs) && !/\.eng-obj-viewport foreignObject[^{]*\{[^}]*color:[^}]*!important/.test(engCss)) {
    throw new Error('SVG 使用 foreignObject，但調色盤層缺少其行內文字色的覆寫');
  }
  console.log(`       已對應深色填色 ${darkShapes.length} 種、淺色文字 ${lightTexts.length} 種`);
});

// 11. 照片燈箱內部元件淡色門禁 (Lightbox Interior Gate)
check('照片燈箱內部元件淡色門禁：畫布、按鈕為淡色底，標題為深色字', () => {
  const engCss = readFileSync(resolve(ROOT, 'engineering-objects.css'), 'utf8');
  const block = sel => {
    const m = engCss.match(new RegExp(`\\n${sel.replace('.', '\\.')}\\s*\\{([^}]*)\\}`));
    if (!m) throw new Error(`未找到 ${sel} 定義`);
    return m[1];
  };
  const canvas = block('.lightbox-canvas-wrap');
  const canvasBg = (canvas.match(/background-color:\s*([^;]+);/) || [])[1];
  if (!canvasBg || getRelativeLuminance(canvasBg) < 0.70) throw new Error(`.lightbox-canvas-wrap 底色 (${canvasBg}) 不是淡色`);
  for (const h of canvas.matchAll(/#[0-9a-fA-F]{6}\b/g)) {
    if (getRelativeLuminance(h[0]) < 0.70) throw new Error(`.lightbox-canvas-wrap 背景含深色 ${h[0]}`);
  }
  const btnBg = (block('.lightbox-btn').match(/background:\s*([^;]+);/) || [])[1] || '';
  if (/rgba\(\s*(1[0-9]|2[0-9]|3[0-9]|[0-9]),/.test(btnBg)) throw new Error(`.lightbox-btn 背景 (${btnBg}) 為深色`);
  const title = (block('.lightbox-title').match(/color:\s*([^;]+);/) || [])[1] || '';
  if (title.startsWith('#') && getRelativeLuminance(title) > 0.2) throw new Error(`.lightbox-title 文字色 (${title}) 過淺`);
});

console.log('=== 門禁檢驗結束 ===');

if (errors.length > 0) {
  console.error(`\n共發現 ${errors.length} 項門禁不符合規範：\n${errors.join('\n')}`);
  process.exit(1);
} else {
  console.log('\n[PASS] 所有規則 0003 門禁項目 100% 通過！');
  process.exit(0);
}
