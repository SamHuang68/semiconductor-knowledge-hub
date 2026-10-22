/**
 * verify-atlas-lifecycle.mjs
 * 製程全景圖（Atlas）互動門禁：Q-Time 時效矩陣必須實際顯示徽章，天車調度模擬的計時器
 * 在關閉鈕、遮罩、Esc、卡片跳章與切換語言重繪時都不得外漏（2.6.1 修正的兩項缺陷）。
 *
 * 用法：PLAYWRIGHT_PACKAGE=<playwright 路徑> node scripts/verify-atlas-lifecycle.mjs
 */
import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

assert.ok(process.env.PLAYWRIGHT_PACKAGE, '必須指定 PLAYWRIGHT_PACKAGE');
const root = fileURLToPath(new URL('../', import.meta.url));
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' };
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

const QTIME_EXPECTED = 5; // app.js QTIME_MAP 的項數
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.setDefaultTimeout(4000);
const pageErrors = [];
page.on('pageerror', e => pageErrors.push(e.message));
// 只記錄計時器生命週期，不改變 callback 或時序
await page.addInitScript(() => {
  const start = window.setInterval.bind(window), stop = window.clearInterval.bind(window);
  window.__atlasTimers = new Map();
  window.setInterval = (fn, ms, ...args) => { const id = start(fn, ms, ...args); window.__atlasTimers.set(id, ms); return id; };
  window.clearInterval = id => { window.__atlasTimers.delete(id); return stop(id); };
});

const results = [];
async function check(name, fn) {
  try {
    const r = await fn();
    results.push({ name, ok: r === true || Boolean(r && r.ok), detail: r && r.detail ? r.detail : '' });
  } catch (e) {
    results.push({ name, ok: false, detail: 'error: ' + String(e.message).split('\n')[0].slice(0, 120) });
  }
}
const ohtTimers = () => page.evaluate(() => [...window.__atlasTimers.values()].filter(ms => ms === 1800).length);
const label = () => page.locator('#ohtSimBtnText').innerText();
const isOpen = () => page.locator('#atlasModal').evaluate(el => el.classList.contains('is-open'));
const openAtlas = async () => { if (!(await isOpen())) { await page.locator('#openAtlasBtn').click(); await page.locator('#atlasModal.is-open').waitFor(); } };
// Atlas 開啟時語言按鈕被遮罩覆蓋，以程式觸發同一個 click，走「開啟中切換語言即重繪」的程式路徑
const switchLang = lang => page.evaluate(l => document.querySelector(`.lang-btn[data-lang="${l}"]`).click(), lang);
const sim = () => page.locator('#startOhtSimBtn').click();

try {
  await page.goto(`${base}#ch06`, { waitUntil: 'domcontentloaded' });
  await page.locator('.eng-obj-card').waitFor();
  await openAtlas();

  const badges = page.locator('#atlasGrid .atlas-card-qtime-badge');
  await check(`Q-Time 徽章輸出 ${QTIME_EXPECTED} 個`, async () => ({ ok: await badges.count() === QTIME_EXPECTED, detail: `count=${await badges.count()}` }));
  await check('Q-Time 徽章預設隱藏', async () => (await badges.count()) > 0 && !(await badges.first().isVisible()));
  await page.locator('#toggleQtimeBtn').click();
  await check('按 Q-Time 後徽章全部可見', async () => (await badges.evaluateAll(els => els.filter(e => e.offsetParent !== null).length)) === QTIME_EXPECTED);
  await check('Q-Time 按鈕 aria-pressed 同步', async () => await page.locator('#toggleQtimeBtn').getAttribute('aria-pressed') === 'true');
  await check('微影→蝕刻 Q-Time 與 OCAP ch23 一致（4 小時）', async () => {
    const s = await page.locator('#atlasGrid .atlas-card[data-step-num="03"] .atlas-card-qtime-badge').innerText();
    return { ok: /≤ 4h/.test(s), detail: s };
  });

  await sim();
  await check('啟動後恰有 1 個天車計時器', async () => ({ ok: await ohtTimers() === 1, detail: `timers=${await ohtTimers()}` }));
  await page.locator('#closeAtlasBtn').click();
  await check('關閉鈕：計時器歸零', async () => ({ ok: await ohtTimers() === 0, detail: `timers=${await ohtTimers()}` }));
  await openAtlas();
  await check('重開後按鈕文字回到啟動', async () => ({ ok: /啟動/.test(await label()), detail: await label() }));
  await check('重開後 Q-Time 顯示狀態保留', async () => await page.locator('#toggleQtimeBtn').getAttribute('aria-pressed') === 'true');
  await sim();
  await check('重開後可再啟動', async () => ({ ok: await ohtTimers() === 1, detail: `timers=${await ohtTimers()}` }));
  await sim();
  await check('重開後可暫停', async () => ({ ok: await ohtTimers() === 0, detail: `timers=${await ohtTimers()}` }));
  await sim();
  await page.keyboard.press('Escape');
  await check('Esc：計時器歸零', async () => ({ ok: await ohtTimers() === 0, detail: `timers=${await ohtTimers()}` }));
  await openAtlas();
  await sim();
  await switchLang('en');
  await page.waitForTimeout(200);
  await check('執行中切換語言：仍只有 1 個計時器並以英文接續', async () => ({ ok: await ohtTimers() === 1 && /Pause/.test(await label()), detail: `timers=${await ohtTimers()} label=${await label()}` }));
  await sim();
  await check('切換語言後可暫停', async () => ({ ok: await ohtTimers() === 0, detail: `timers=${await ohtTimers()}` }));
  await sim();
  await page.locator('#atlasGrid .atlas-card[data-step-num="04"]').click();
  await page.waitForTimeout(300);
  await check('卡片跳章：Atlas 關閉且計時器歸零', async () => ({ ok: !(await isOpen()) && await ohtTimers() === 0, detail: `timers=${await ohtTimers()}` }));
  await switchLang('zh');
  await openAtlas();
  await sim();
  await page.locator('#atlasModal').click({ position: { x: 5, y: 5 } });
  await check('點遮罩：計時器歸零', async () => ({ ok: await ohtTimers() === 0, detail: `timers=${await ohtTimers()}` }));
  await check('頁面錯誤為 0', async () => ({ ok: pageErrors.length === 0, detail: pageErrors.join(' | ').slice(0, 200) }));
} finally {
  await browser.close();
  server.close();
}

const fails = results.filter(r => !r.ok);
for (const r of results) console.log(`[${r.ok ? 'PASS' : 'FAIL'}] ${r.name}${r.detail ? `（${r.detail}）` : ''}`);
if (fails.length) {
  console.error(`=== Atlas 互動門禁失敗：${fails.length}/${results.length} 項 ===`);
  process.exit(1);
}
console.log(`=== Atlas 互動門禁通過：${results.length} 項 ===`);
