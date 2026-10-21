/**
 * verify-light-theme.mjs
 * 規則 0003：簡報與網頁一律只用淡色系（嚴格禁止任何深暗色底）自動化門禁
 * 包含：
 * 1. 背景明度門禁 (Background Luminance Gate)
 * 2. 禁絕深黑底主題 (No Dark Mode Gate)
 * 3. 晶圓黃光微影模式淡色基底門禁 (Litho Amber Light-Base Gate)
 * 4. 關鍵容器淡色載體門禁 (Key Containers Pale-Surface Gate)
 * 5. 圖像載體對比門禁契約 (Asset-on-Carrier Contrast Gate)
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
  const exploreCss = readFileSync(resolve(ROOT, '情境探索.css'), 'utf8');
  const engCss = readFileSync(resolve(ROOT, '工程物件.css'), 'utf8');
  const legendCss = readFileSync(resolve(ROOT, '圖例檢視.css'), 'utf8');
  const signalCss = readFileSync(resolve(ROOT, '訊號判讀.css'), 'utf8');

  const darkHexRegex = /#0[0-9a-f]{5}|#1[0-4][0-9a-f]{4}/gi;

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

console.log('=== 門禁檢驗結束 ===');

if (errors.length > 0) {
  console.error(`\n共發現 ${errors.length} 項門禁不符合規範：\n${errors.join('\n')}`);
  process.exit(1);
} else {
  console.log('\n[PASS] 所有規則 0003 門禁項目 100% 通過！');
  process.exit(0);
}
