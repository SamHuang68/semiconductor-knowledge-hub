import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = fileURLToPath(new URL('../', import.meta.url));
const evidence = process.env.HUB_EVIDENCE_DIR;
assert.ok(evidence, '必須指定既有證據目錄');
await mkdir(evidence, { recursive: true });
const mode = process.argv[2];
assert.ok(['基準', '學習操作', '版面'].includes(mode), '必須指定案例，不自動擴大驗證');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
    const file = path.resolve(root, pathname);
    if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
    res.setHeader('Content-Type', `${mime[path.extname(file)] || 'text/plain'}; charset=utf-8`);
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}/`;
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const shot = name => page.screenshot({ path: path.join(evidence, name + '.png') });
const open = async hash => { if (page.url() === base + hash) await page.reload(); else await page.goto(base + hash); await page.locator('#mainContentArea h1').waitFor(); };
try {
  if (mode === '基準') {
    await open('#explore/pattern/film');
    await page.locator('.flow-node[href$="/expose"]').click();
    await page.waitForFunction(() => document.querySelector('#detailTitle')?.textContent === '曝光與顯影');
    const geometry = await page.locator('#detailTitle').boundingBox();
    await shot('1.1.0_手機點選節點');
    await page.locator('.source-chapter').click();
    await page.locator('.article-headline').waitFor();
    const returnLink = await page.locator('.chapter-scenario-link').getAttribute('href');
    const record = { 基準: 'e3fd99eb60e03e6385214ed25ba98651542bff65', 視窗高度: 900, 解說標題頂端: geometry.y, 解說在視窗內: geometry.y >= 0 && geometry.y < 900, 教材返回連結: returnLink, 期望返回節點: '#explore/pattern/expose' };
    await writeFile(path.join(evidence, '1.1.0_操作基準.json'), JSON.stringify(record, null, 2));
    console.log(JSON.stringify(record));
  } else {
    const visibleBelowToolbar = async selector => {
      try { await page.waitForFunction(selector => {
        const r = document.querySelector(selector)?.getBoundingClientRect();
        const t = document.querySelector('.explorer-toolbar')?.getBoundingClientRect();
        return r && t && r.top >= t.bottom && r.bottom < innerHeight;
      }, selector, { timeout: 5000 }); }
      catch (error) {
        console.log(JSON.stringify(await page.evaluate(selector => ({ selector, viewport: [innerWidth, innerHeight], target: document.querySelector(selector)?.getBoundingClientRect().toJSON(), toolbar: document.querySelector('.explorer-toolbar')?.getBoundingClientRect().toJSON(), header: document.querySelector('.app-header')?.getBoundingClientRect().toJSON(), focus: document.activeElement.id }), selector)));
        await shot(`1.3.0_定位診斷_${page.viewportSize().width}`);
        throw error;
      }
    };
    if (mode === '學習操作') {
      await open('#explore/pattern/film');
      await page.locator('[data-explorer-view="map"]').click();
      await page.locator('.flow-node[href$="/expose"]').click();
      await page.waitForFunction(() => document.querySelector('#detailTitle')?.textContent === '曝光與顯影');
      await visibleBelowToolbar('#detailTitle');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'detailTitle');
      await shot('1.3.0_手機點選節點');
      await page.locator('.source-chapter').click();
      await page.locator('.article-headline').waitFor();
      assert.ok(page.url().endsWith('#ch04?from=pattern%2Fexpose'));
      assert.equal(await page.locator('.chapter-scenario-link').getAttribute('href'), '#explore/pattern/expose');
      await page.reload(); await page.locator('.article-headline').waitFor();
      assert.equal(await page.locator('.chapter-scenario-link').getAttribute('href'), '#explore/pattern/expose');
      await page.locator('.chapter-scenario-link').click();
      await visibleBelowToolbar('#detailTitle');
      assert.equal(await page.locator('#detailTitle').innerText(), '曝光與顯影');
      await page.goBack(); await page.locator('.article-headline').waitFor();
      await page.goForward(); await visibleBelowToolbar('#detailTitle');
      console.log('通過：390 像素點選節點可見、精確教材回程、重載及瀏覽器前進後退');

      await page.locator('[data-explorer-view="map"]').click();
      await page.locator('.flow-node[href$="/expose"]').click();
      await visibleBelowToolbar('#detailTitle');
      await page.locator('.step-next').focus(); await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.querySelector('#detailTitle')?.textContent === '蝕刻轉移');
      await visibleBelowToolbar('#detailTitle');
      await page.locator('#shareStep').click();
      await page.waitForFunction(() => document.querySelector('#shareStatus').textContent.includes('已複製'));
      assert.ok((await page.evaluate(() => navigator.clipboard.readText())).endsWith('#explore/pattern/etch'));
      await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error('驗證拒絕複製'); }; });
      await page.locator('#shareStep').click();
      await page.locator('#stepUrl').waitFor({ state: 'visible' });
      assert.ok((await page.locator('#stepUrl').inputValue()).endsWith('#explore/pattern/etch'));
      assert.equal(await page.evaluate(() => document.activeElement.id), 'stepUrl');
      assert.match(await page.locator('#shareStatus').innerText(), /手動複製/);
      await page.locator('.explorer-tools [data-explorer-view="detail"]').click();
      await visibleBelowToolbar('#detailTitle');
      console.log('通過：同節點再次開啟、鍵盤下一站、分享成功與權限拒絕的手動複製');

      for (const [scenario, node, answer] of [['pattern', 'expose', 0], ['quality', 'decision', 1], ['dispatch', 'recipe', 2]]) {
        await open(`#explore/${scenario}/${node}`);
        await page.locator('[data-explorer-view="practice"]').click();
        await visibleBelowToolbar('#practiceTitle');
        for (let i = 0; i < 3; i++) {
          await page.locator(`[data-answer="${i}"]`).click();
          assert.match(await page.locator('.practice-feedback').innerText(), i === answer ? /判斷正確/ : /再想一想/);
          assert.equal(await page.locator('.practice-choice[aria-pressed="true"]').count(), 1);
          assert.ok((await page.locator('.practice-feedback p').innerText()).length > 20);
        }
        await page.locator(`[data-answer="${answer}"]`).focus(); await page.keyboard.press('Space');
        await page.locator('.practice-diagram').click(); await visibleBelowToolbar('#detailTitle');
        assert.match(await page.locator('.practice-feedback').innerText(), /判斷正確/);
        await page.locator('#scenarioSelect').selectOption('journey');
        await page.waitForFunction(() => location.hash === '#explore/journey/wafer');
        assert.equal(await page.locator('.practice-panel').count(), 0);
        await page.locator('#scenarioSelect').selectOption(scenario);
        await page.waitForFunction(id => location.hash.startsWith('#explore/' + id + '/'), scenario);
        assert.match(await page.locator('.practice-feedback').innerText(), /判斷正確/);
        await page.locator('[data-explorer-view="practice"]').click();
        await page.locator('.practice-reset').click();
        assert.equal(await page.locator('.practice-feedback').innerText(), '');
        assert.equal(await page.locator('.practice-choice[aria-pressed="true"]').count(), 0);
        assert.equal(await page.evaluate(() => document.activeElement.dataset.answer), '0');
        await page.locator('.practice-actions a[href^="#ch"]').click();
        await page.locator('.article-headline').waitFor();
        assert.equal(await page.locator('.chapter-scenario-link').getAttribute('href'), `#explore/${scenario}/${node}`);
      }
      console.log('通過：三題九個答案解釋、鍵盤作答、情境切換保留、重試及教材依據回程');

      for (const hash of ['#ch04?from=pattern%2Funknown', '#ch04?from=quality%2Fhold', '#ch04?from=%3Cscript%3E', '#ch04']) {
        await open(hash); await page.locator('.article-headline').waitFor();
        assert.ok(page.url().endsWith('#ch04'));
        assert.equal(await page.locator('.chapter-scenario-link').getAttribute('href'), '#explore/pattern');
      }
      await open('#node-04'); await page.locator('.article-headline').waitFor();
      assert.ok(page.url().endsWith('#ch04'));
      await page.locator('#mobileToggleBtn').click();
      await page.locator('.chapter-nav-link[data-ch-id="ch04"]').click();
      assert.equal(await page.locator('#appSidebar.is-open').count(), 0);
      await page.locator('#toggleBookmarkBtn').click();
      assert.ok((await page.evaluate(() => localStorage.getItem('semi_bookmarked_chapters'))).includes('ch04'));
      assert.ok((await page.evaluate(() => localStorage.getItem('semi_read_chapters'))).includes('ch04'));
      await open('#unknown'); await page.locator('.article-headline').waitFor();
      assert.ok(page.url().endsWith('#ch00'));
      console.log('通過：返回參數驗證、舊章節網址、未知路由、手機同章抽屜及收藏／已讀識別');
    } else {
      for (const width of process.argv[3] ? [Number(process.argv[3])] : [390, 312, 768, 1440]) {
        await page.setViewportSize({ width, height: Number(process.argv[4]) || (width === 312 ? 780 : 1000) });
        await open('#explore/pattern/expose');
        await visibleBelowToolbar('#detailTitle');
        await page.locator('[data-explorer-view="practice"]').click();
        await visibleBelowToolbar('#practiceTitle');
        await page.locator('[data-answer="1"]').click();
        const overflow = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth,
          clipped: [...document.querySelectorAll('.explorer-toolbar, .practice-panel, .practice-choice, .detail-copy')].filter(el => el.scrollWidth > el.clientWidth + 2).map(el => el.className) }));
        assert.ok(overflow.scroll <= overflow.width + 1, JSON.stringify(overflow));
        assert.deepEqual(overflow.clipped, []);
        await page.locator('[data-explorer-view="practice"]').click();
        await shot(`1.3.0_情境練習_${width}`);
        await page.locator('[data-explorer-view="map"]').click();
        await visibleBelowToolbar('#workbenchHeading');
      }
      console.log('通過：390／312／768／1440 像素操作列、練習、解說可見及無水平裁切');
    }
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); server.close(); }
