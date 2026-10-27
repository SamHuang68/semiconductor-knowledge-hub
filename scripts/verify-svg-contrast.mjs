/**
 * verify-svg-contrast.mjs
 * 規則 0003 渲染層門禁：實際渲染 28 個工程物件的每個分頁與互動狀態，
 * 以「隱藏文字後的實際像素」作為底色，量測每個 SVG 文字、tspan 與 foreignObject 文字的對比，
 * 並檢查大面積深色填色。verify-light-theme.mjs 的靜態檢查看不到相鄰結構、透明度與版面重疊，由本腳本補上。
 *
 * 用法：PLAYWRIGHT_PACKAGE=<playwright 路徑> node scripts/verify-svg-contrast.mjs [--no-states] [--shots <目錄>] [--report <檔案>]
 * 判準：一般文字 ≥ 4.5:1、大字 ≥ 3:1；不透明且明度 < 0.12 的填色不得覆蓋 6% 以上的圖面。
 */
import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

assert.ok(process.env.PLAYWRIGHT_PACKAGE, '必須指定 PLAYWRIGHT_PACKAGE');
const root = fileURLToPath(new URL('../', import.meta.url));
const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : null; };
const withStates = !process.argv.includes('--no-states');
const shotDir = arg('--shots');
if (shotDir) await mkdir(shotDir, { recursive: true });

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
  try {
    const rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
    const file = path.resolve(root, rel);
    if (!file.startsWith(path.resolve(root) + path.sep)) { res.writeHead(403); res.end(); return; }
    res.setHeader('Content-Type', (types[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8');
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}/index.html`;

const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
page.setDefaultTimeout(10000);
const pageErrors = [];
page.on('pageerror', e => pageErrors.push(e.message));

async function measure(id, state) {
  const svg = page.locator('.eng-obj-card .eng-obj-viewport svg').first();
  await svg.scrollIntoViewIfNeeded();
  const meta = await page.evaluate(() => {
    if (!document.getElementById('__contrast_freeze')) {
      const s = document.createElement('style');
      s.id = '__contrast_freeze';
      s.textContent = '.eng-obj-viewport *, .eng-obj-viewport *::before { animation: none !important; transition: none !important; }';
      document.head.append(s);
    }
    const svg = document.querySelector('.eng-obj-card .eng-obj-viewport svg');
    const box = svg.getBoundingClientRect();
    const scale = svg.viewBox.baseVal && svg.viewBox.baseVal.width ? box.width / svg.viewBox.baseVal.width : 1;
    const parse = c => { const m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
    const alphaOf = el => { let a = 1; for (let n = el; n && n !== svg.parentElement; n = n.parentElement) a *= Number(getComputedStyle(n).opacity); return a; };
    const L = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
    const htmlText = [...svg.querySelectorAll('foreignObject *')].filter(el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
    const texts = [];
    for (const el of [...svg.querySelectorAll('text, tspan[fill]'), ...htmlText]) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const isHtml = !(el instanceof SVGElement);
      const fill = parse(isHtml ? cs.color : cs.fill);
      if (!fill) continue;
      const alpha = alphaOf(el) * (isHtml ? 1 : Number(cs.fillOpacity)) * fill[3];
      if (alpha < 0.05) continue;
      const halo = !isHtml && cs.paintOrder.startsWith('stroke') && parseFloat(cs.strokeWidth) >= 2 ? parse(cs.stroke) : null;
      texts.push({ text: (el.textContent || '').trim().slice(0, 40), fill: fill.slice(0, 3), halo: halo && halo.slice(0, 3), alpha, px: parseFloat(cs.fontSize) * scale, bold: Number(cs.fontWeight) >= 700, x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height });
    }
    const darkShapes = [];
    for (const el of svg.querySelectorAll('rect, path, circle, ellipse, polygon')) {
      const cs = getComputedStyle(el);
      const f = parse(cs.fill);
      if (!f || cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect();
      const frac = (r.width * r.height) / (box.width * box.height);
      if (alphaOf(el) * Number(cs.fillOpacity) * f[3] >= 0.5 && L(f) < 0.12 && frac >= 0.06) darkShapes.push({ fill: el.getAttribute('fill'), frac: +frac.toFixed(3) });
    }
    svg.querySelectorAll('text, foreignObject *').forEach(el => { el.dataset.contrastVis = el.style.visibility; el.style.visibility = 'hidden'; });
    return { texts, darkShapes };
  });
  const png = await svg.screenshot();
  await page.evaluate(() => document.querySelectorAll('.eng-obj-card .eng-obj-viewport svg text, .eng-obj-card .eng-obj-viewport svg foreignObject *').forEach(el => { el.style.visibility = el.dataset.contrastVis || ''; }));
  if (shotDir) await writeFile(path.join(shotDir, `${id}-${state}.png`.replace(/[^\w.@#=-]+/g, '_')), await svg.screenshot());
  const backgrounds = await page.evaluate(async ({ b64, boxes }) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
    const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0);
    const L = p => 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
    return boxes.map(t => {
      const x0 = Math.max(0, Math.floor(t.x)), y0 = Math.max(0, Math.floor(t.y));
      const x1 = Math.min(c.width, Math.ceil(t.x + t.w)), y1 = Math.min(c.height, Math.ceil(t.y + t.h));
      if (x1 <= x0 || y1 <= y0) return null;
      const d = ctx.getImageData(x0, y0, x1 - x0, y1 - y0).data, px = [];
      for (let k = 0; k < d.length; k += 4) px.push([d[k], d[k + 1], d[k + 2]]);
      px.sort((a, b) => L(a) - L(b));
      return px[Math.floor(px.length / 2)];
    });
  }, { b64: png.toString('base64'), boxes: meta.texts });
  const fails = [];
  meta.texts.forEach((t, k) => {
    const bg = t.halo || backgrounds[k];
    if (!bg) return;
    const ink = t.fill.map((v, j) => v * t.alpha + bg[j] * (1 - t.alpha));
    const need = t.px >= 24 || (t.px >= 18.66 && t.bold) ? 3 : 4.5;
    const r = ratio(ink, bg);
    if (r < need) fails.push({ text: t.text, ratio: +r.toFixed(2), need });
  });
  return { id, state, texts: meta.texts.length, fails, darkShapes: meta.darkShapes };
}

const results = [];
await page.goto(base, { waitUntil: 'domcontentloaded' });
const ids = await page.evaluate(async () => (await import('./data/chapters-data.js')).CHAPTER_CATALOG.map(c => c.id));
const STATE_CONTROLS = '[data-sim],[data-mode],[data-q],[data-burst],[data-step],[data-spc-mode],[data-pattern],[data-node],[data-corner],[data-jargon],.ocap-sim-btn,.qtime-btn,.burst-btn,.pvt-btn,.node-btn,.jargon-btn,#rowHammerAttackBtn,#rowHammerTrrBtn,#damaNextBtn,#aldNextBtn';
try {
  for (const id of ids) {
    await page.goto('about:blank');
    await page.goto(`${base}#${id}`, { waitUntil: 'domcontentloaded' });
    const card = page.locator('.eng-obj-card');
    await card.waitFor();
    await card.locator('[data-view-mode="schematic"]').click();
    const tabs = await card.locator('.eng-obj-tab[data-tab]').evaluateAll(els => els.map(e => e.dataset.tab));
    for (const tab of tabs.length ? tabs : ['default']) {
      if (tab !== 'default') await card.locator(`.eng-obj-tab[data-tab="${tab}"]`).first().click();
      results.push(await measure(id, tab));
      if (!withStates) continue;
      const count = await card.locator(STATE_CONTROLS).count();
      for (let k = 0; k < count; k++) {
        const repeat = await card.locator(STATE_CONTROLS).nth(k).evaluate(el => /NextBtn$/.test(el.id) ? 6 : 1).catch(() => 0);
        for (let r = 0; r < repeat; r++) {
          const name = await card.locator(STATE_CONTROLS).nth(k).evaluate(el => {
            const key = Object.keys(el.dataset).find(x => x !== 'contrastVis');
            el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            return String(el.id || (key ? `${key}=${el.dataset[key]}` : el.getAttribute('class'))).slice(0, 40);
          }).catch(() => null);
          if (!name) break;
          await page.waitForTimeout(120);
          results.push(await measure(id, `${tab}@${name}#${r + 1}`));
        }
      }
    }
  }
} finally {
  await browser.close();
  server.close();
}

const textCount = results.reduce((n, v) => n + v.texts, 0);
const fails = results.flatMap(v => v.fails.map(f => ({ view: `${v.id}/${v.state}`, ...f })));
const dark = results.flatMap(v => v.darkShapes.map(s => ({ view: `${v.id}/${v.state}`, ...s })));
const report = { views: results.length, texts: textCount, contrastFails: fails, largeDarkShapes: dark, pageErrors };
const reportFile = arg('--report');
if (reportFile) await writeFile(reportFile, JSON.stringify(report, null, 1));
for (const f of fails) console.error(`[FAIL] ${f.view} 「${f.text}」對比 ${f.ratio}:1 < ${f.need}:1`);
for (const d of dark) console.error(`[FAIL] ${d.view} 深色填色 ${d.fill} 覆蓋 ${(d.frac * 100).toFixed(1)}% 圖面`);
for (const e of pageErrors) console.error(`[FAIL] 頁面錯誤：${e}`);
console.log(`量測 ${results.length} 個畫面（${withStates ? '含' : '不含'}互動狀態）、${textCount} 個文字元素`);
if (fails.length || dark.length || pageErrors.length) {
  console.error(`=== SVG 對比門禁失敗：對比 ${fails.length}、深色面板 ${dark.length}、頁面錯誤 ${pageErrors.length} ===`);
  process.exit(1);
}
console.log('=== SVG 對比門禁通過：全部文字達 WCAG AA，無大面積深色填色 ===');
