import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { SCENARIOS } from '../data/scenario-paths.js';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE);
const root = fileURLToPath(new URL('../', import.meta.url));
const evidence = process.env.HUB_EVIDENCE_DIR;
assert.ok(evidence && process.env.HUB_BASELINE_ROOT, '必須指定證據目錄與已知正常的基準來源');
await mkdir(evidence, { recursive: true });
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
async function serve(folder) {
  const server = http.createServer(async (req, res) => {
    try {
      const relative = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
      const file = path.resolve(folder, relative);
      if (!file.startsWith(path.resolve(folder) + path.sep)) { res.writeHead(403); res.end(); return; }
      const data = await readFile(file);
      res.setHeader('Content-Type', `${mime[path.extname(file)] || 'text/plain'}; charset=utf-8`);
      res.end(data);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { server, url: `http://127.0.0.1:${server.address().port}/` };
}
const candidate = await serve(root);
const baseline = await serve(process.env.HUB_BASELINE_ROOT);
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const screenshot = name => page.screenshot({ path: path.join(evidence, `${name}.png`), fullPage: false });
const selectedCase = process.argv.find(arg => arg.startsWith('--case='))?.slice(7);
const check = async (name, action) => { if (selectedCase && !name.includes(selectedCase)) return; await action(); console.log(`通過：${name}`); };
async function open(hash = '') { await page.goto(candidate.url + hash); await page.locator('#mainContentArea h1').waitFor(); }
async function clickAndHash(selector, expected) { await page.locator(selector).click(); await page.waitForFunction(hash => location.hash === hash, expected); }
async function noOverflow() {
  const overflow = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, elements: [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); return r.width && r.right > innerWidth + 1; }).slice(0, 12).map(el => ({ tag: el.tagName, class: el.className, width: el.getBoundingClientRect().width, right: el.getBoundingClientRect().right })) }));
  if (overflow.scroll > overflow.width + 1) await screenshot(`溢位診斷_${overflow.width}`);
  assert.ok(overflow.scroll <= overflow.width + 1, `頁面不可水平溢位：${JSON.stringify(overflow)}`);
  const clipped = await page.locator('.scenario-choice, .flow-node, .detail-copy, .explorer-hero').evaluateAll(elements => elements.filter(el => el.scrollWidth > el.clientWidth + 2).map(el => el.className));
  assert.deepEqual(clipped, [], '主要圖文不可被容器裁切');
}
try {
  await check('同尺寸原版章節基準', async () => {
    await page.goto(baseline.url + '#ch00');
    await page.locator('.article-headline').waitFor();
    await screenshot('基準章節_桌面');
    assert.equal(await page.locator('.chapter-nav-link').count(), 28);
    await page.locator('#toggleBookmarkBtn').click();
    assert.ok((await page.evaluate(() => localStorage.getItem('semi_bookmarked_chapters'))).includes('ch00'));
    await page.locator('#fontSizeIncBtn').click();
    assert.equal(await page.evaluate(() => localStorage.getItem('semi_font_size')), '17.5');
  });
  await check('首次首頁與五種情境、全部新節點', async () => {
    await open();
    assert.equal(await page.locator('.scenario-choice').count(), 5);
    await noOverflow(); await screenshot('情境首頁_桌面');
    for (const s of SCENARIOS) {
      await page.locator(`.scenario-choice[href="#explore/${s.id}/${s.nodes[0].id}"]`).click();
      for (const n of s.nodes) {
        await page.locator(`.flow-node[href="#explore/${s.id}/${n.id}"]`).click();
        await page.waitForFunction(title => document.querySelector('#detailTitle')?.textContent === title, n.title);
        assert.equal(await page.locator('.source-chapter').getAttribute('href'), `#${n.chapter}?from=${s.id}%2F${n.id}`);
      }
      await noOverflow();
    }
    await open('#explore/pattern/expose');
    assert.match(await page.locator('.detail-visual svg').getAttribute('aria-label'), /下方薄膜仍完整/);
    await page.locator('.scenario-workbench').scrollIntoViewIfNeeded(); await screenshot('圖形轉移_桌面');
  });
  await check('異常分支與回查可操作', async () => {
    await open('#explore/quality/decision');
    await clickAndHash('.step-next[href$="/monitor"]', '#explore/quality/monitor');
    await clickAndHash('.step-next', '#explore/quality/signal');
    await clickAndHash('.step-next', '#explore/quality/decision');
    await clickAndHash('.step-next[href$="/hold"]', '#explore/quality/hold');
    await clickAndHash('.step-next', '#explore/quality/cause');
    await clickAndHash('.step-next', '#explore/quality/release');
    await clickAndHash('.step-next[href$="/cause"]', '#explore/quality/cause');
    await page.locator('.branch-map').scrollIntoViewIfNeeded(); await screenshot('異常分支_桌面');
    await page.goBack(); assert.ok(page.url().endsWith('#explore/quality/release'));
  });
  await check('並列封裝結構與可分享的深連結', async () => {
    await open('#explore/packaging/stack');
    assert.equal(await page.locator('.comparison-map .flow-arrow').count(), 0);
    assert.equal(await page.locator('.step-next').count(), 0);
    assert.equal(await page.locator('#detailTitle').innerText(), '3D 整合');
    await page.reload(); await page.locator('#detailTitle').waitFor();
    assert.equal(await page.locator('#detailTitle').innerText(), '3D 整合');
    await page.locator('.scenario-workbench').scrollIntoViewIfNeeded(); await screenshot('封裝比較_桌面');
  });
  await check('章內連結、舊網址與段落目錄', async () => {
    await open('#node-00'); assert.ok(page.url().endsWith('#ch00'));
    assert.equal(await page.locator('h1').count(), 1);
    await screenshot('新版章節_桌面');
    await clickAndHash('.article-body a[href="#ch04"] >> nth=0', '#ch04');
    await page.goBack(); assert.ok(page.url().endsWith('#ch00'));
    await page.locator('.toc-link').nth(2).click();
    assert.ok(page.url().endsWith('#ch00'), '段落跳轉仍保留章節網址');
    await page.reload(); await page.locator('.article-headline').waitFor();
    assert.match(await page.locator('.article-headline').innerText(), /第 0 章/);
  });
  await check('收藏、字級、已讀與章節篩選保留', async () => {
    await page.locator('#toggleBookmarkBtn').click();
    await page.locator('#fontSizeIncBtn').click();
    await page.reload(); await page.locator('#toggleBookmarkBtn').waitFor();
    assert.match(await page.locator('#toggleBookmarkBtn').innerText(), /已收藏/);
    assert.equal(await page.evaluate(() => localStorage.getItem('semi_font_size')), '17.5');
    await page.locator('[data-filter-mode="starred"]').click();
    assert.equal(await page.locator('.chapter-nav-link').count(), 1);
    await page.locator('[data-filter-mode="all"]').click();
    await page.locator('#chapterFilter').fill('微影'); assert.equal(await page.locator('.chapter-nav-link').count(), 1);
    await page.locator('#chapterFilter').fill(''); assert.equal(await page.locator('.chapter-nav-link').count(), 28);
    assert.ok((await page.evaluate(() => localStorage.getItem('semi_read_chapters'))).includes('ch04'));
  });
  await check('搜尋、字典、圖譜及彈窗焦點', async () => {
    await page.locator('#openSearchBtn').click(); await page.locator('#searchModalInput').fill('CMP');
    assert.ok(await page.locator('[data-search-target]').count() > 0);
    await page.keyboard.press('Escape'); assert.equal(await page.locator('.is-open[role="dialog"]').count(), 0);
    await page.locator('#openJargonBtn').click(); await page.locator('#jargonSearchInput').fill('CMP');
    assert.ok(await page.locator('#jargonList .jargon-item-card').count() > 0);
    await page.keyboard.press('Escape');
    await page.locator('#openAtlasBtn').click(); assert.equal(await page.locator('.atlas-card').count(), 12);
    await page.locator('.atlas-card').last().focus(); await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'closeAtlasBtn');
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'openAtlasBtn');
    await page.locator('#openAtlasBtn').click(); await page.locator('.atlas-card[data-jump-ch="ch04"]').click();
    await page.waitForFunction(() => location.hash === '#ch04');
  });
  await check('390 像素手機、鍵盤與抽屜', async () => {
    await page.setViewportSize({ width: 390, height: 900 });
    await open('#explore/pattern/expose'); await noOverflow(); await screenshot('情境首頁_手機');
    await page.locator('.node-detail').scrollIntoViewIfNeeded(); await screenshot('圖形轉移_手機');
    await page.locator('.step-next').focus(); await page.keyboard.press('Enter');
    await page.waitForFunction(() => location.hash.endsWith('/etch')); assert.equal(await page.locator('#detailTitle').innerText(), '蝕刻轉移');
    await page.locator('#mobileToggleBtn').click();
    await page.locator('.chapter-nav-link[data-ch-id="ch04"]').click();
    await page.waitForFunction(() => location.hash === '#ch04');
    await page.locator('.article-headline').waitFor();
    assert.equal(await page.locator('#appSidebar.is-open').count(), 0); await noOverflow();
    for (const id of ['openAtlasBtn', 'openJargonBtn', 'openSearchBtn', 'fontSizeIncBtn']) assert.ok(await page.locator('#' + id).isVisible(), `${id} 在手機仍可達`);
    await open('#explore/quality/decision'); await noOverflow();
    await page.locator('.branch-map').scrollIntoViewIfNeeded(); await screenshot('異常分支_手機');
    await page.setViewportSize({ width: 768, height: 1024 }); await noOverflow();
    await page.setViewportSize({ width: 312, height: 780 }); await noOverflow();
  });
  await check('共用路由與焦點回歸', async () => {
    await page.setViewportSize({ width: 390, height: 900 });
    await open('#ch04');
    await page.locator('#mobileToggleBtn').click();
    await page.locator('.chapter-nav-link[data-ch-id="ch04"]').click();
    assert.equal(await page.locator('#appSidebar.is-open').count(), 0, '點擊同章節也必須關閉抽屜');
    await open('#unknown'); assert.match(await page.locator('.article-headline').innerText(), /第 0 章/);
    await page.locator('#openSearchBtn').click(); await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'openSearchBtn');
    await page.locator('#openAtlasBtn').click(); await page.keyboard.press('Control+k');
    assert.equal(await page.locator('[role="dialog"].is-open').count(), 1);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'searchModalInput');
    await page.keyboard.press('Escape');
    await open('#explore/quality/monitor');
    assert.match(await page.locator('.detail-visual').innerText(), /先確認資料，再判讀訊號/);
  });
  await check('既有圖表、複製與列印保全', async () => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await open('#ch23');
    await page.locator('.mermaid-rendered svg').first().waitFor({ timeout: 25000 });
    assert.ok(await page.locator('.mermaid-rendered svg').count() > 0);
    await page.locator('#copyLinkBtn').click();
    assert.ok((await page.evaluate(() => navigator.clipboard.readText())).endsWith('#ch23'));
    await open('#ch00');
    await page.emulateMedia({ media: 'print' });
    assert.equal(await page.locator('.app-header').isVisible(), false);
    assert.ok(await page.locator('.article-body').isVisible());
    await page.emulateMedia({ media: 'screen' });
  });
  assert.deepEqual(errors, [], '不可有瀏覽器執行錯誤');
  console.log('瀏覽器定點驗證完成；不包含完整教材技術內容審核或讀屏符合性認證。');
} finally {
  await browser.close();
  candidate.server.close(); baseline.server.close();
}
