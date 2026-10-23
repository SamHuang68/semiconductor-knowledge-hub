import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { SCENARIOS } from '../data/scenario-paths.js';

const root = process.env.HUB_VISUAL_BASELINE || fileURLToPath(new URL('../', import.meta.url));
const evidence = process.env.HUB_EVIDENCE_DIR;
assert.ok(evidence, '必須指定既有證據目錄');
await mkdir(evidence, { recursive: true });
const mode = process.argv[2];
assert.ok(['基準', '圖例', '版面'].includes(mode), '必須指定案例，不自動擴大驗證');
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
const open = async hash => {
  if (page.url() === base + hash) await page.reload(); else await page.goto(base + hash);
  const [, scenarioId, nodeId] = hash.split('/');
  const node = SCENARIOS.find(s => s.id === scenarioId)?.nodes.find(n => n.id === nodeId);
  if (node) await page.waitForFunction(title => document.querySelector('#detailTitle')?.textContent === title, node.title);
  else await page.locator('#mainContentArea h1').waitFor();
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
};
try {
  if (mode === '基準') {
    const record = { version: '1.2.0', sha: '69162c0d09bb8dfaf6cfc32abcbf13954686e975', diagrams: [] };
    for (const [scenario, nodes] of [['journey', ['wafer', 'wiring']], ['dispatch', ['route', 'recipe']], ['pattern', ['expose']], ['packaging', ['interposer']]]) {
      for (const node of nodes) {
        await open(`#explore/${scenario}/${node}`);
        await page.locator('.detail-visual svg').waitFor();
        record.diagrams.push({ scenario, node, svg: await page.locator('.detail-visual svg').innerHTML() });
        if (nodes.length === 1) {
          await page.screenshot({ path: path.join(evidence, `1.2.0_圖例基準_${scenario}_390.png`) });
        }
      }
    }
    assert.equal(record.diagrams[0].svg, record.diagrams[1].svg);
    assert.equal(record.diagrams[2].svg, record.diagrams[3].svg);
    await writeFile(path.join(evidence, '1.2.0_圖例基準.json'), JSON.stringify(record, null, 2));
    console.log('基準已觀測：晶圓旅程與派工圖不隨節點改變；剖面與封裝為單一圖檢視。');
  } else {
    const visibleTitle = async selector => {
      try { await page.waitForFunction(selector => {
        const r = document.querySelector(selector)?.getBoundingClientRect();
        const t = document.querySelector('.explorer-toolbar')?.getBoundingClientRect();
        return r && t && r.top >= t.bottom && r.bottom < innerHeight;
      }, selector, { timeout: 5000 }); } catch (error) {
        console.log(JSON.stringify(await page.evaluate(selector => ({ target: document.querySelector(selector)?.getBoundingClientRect().toJSON(), toolbar: document.querySelector('.explorer-toolbar')?.getBoundingClientRect().toJSON(), viewport: [innerWidth,innerHeight], hidden: document.querySelector('#diagramComparison')?.hidden }), selector)));
        await shot(`1.3.0_位置診斷_${page.viewportSize().width}`);
        throw error;
      }
    };
    if (mode === '圖例') {
    await open('#explore/pattern/film');
    assert.equal(await page.locator('#diagramComparison').isVisible(), false);
    await page.locator('.compare-toggle').focus(); await page.keyboard.press('Enter');
    await visibleTitle('#comparisonTitle');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'comparisonTitle');
    const pattern = SCENARIOS.find(s => s.id === 'pattern');
    for (const n of pattern.nodes) {
      await page.locator(`.comparison-steps a[href$="/${n.id}"]`).click();
      await page.waitForFunction(title => document.querySelector('#detailTitle')?.textContent === title, n.title);
      await visibleTitle('#comparisonTitle');
      assert.equal(await page.locator('.comparison-pair svg').count(), 2);
      assert.equal(await page.locator('.comparison-pair figure:last-child svg').innerHTML(), await page.locator('.detail-visual > svg').innerHTML());
      assert.equal(await page.locator('.comparison-steps [aria-current="step"]').innerText(), `${pattern.nodes.indexOf(n) + 1}. ${n.title}`);
      assert.equal(await page.locator('.source-chapter').getAttribute('href'), `#${n.chapter}?from=pattern%2F${n.id}`);
    }
    await page.locator('.comparison-steps a[href$="/expose"]').click();
    await page.waitForFunction(() => document.querySelector('#detailTitle')?.textContent === '曝光與顯影');
    assert.match(await page.locator('.comparison-change').innerText(), /下方目標薄膜仍完整/);
    await page.locator('.compare-toggle').click();
    assert.equal(await page.locator('#diagramComparison').isVisible(), false);
    assert.equal(await page.locator('.compare-toggle').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.evaluate(() => document.activeElement.className), 'compare-toggle');
    await page.locator('.compare-toggle').click();
    await page.locator('.comparison-heading button').click(); await visibleTitle('#detailTitle');
    await page.locator('.source-chapter').click(); await page.locator('.article-headline').waitFor();
    await page.locator('.chapter-scenario-link').click(); await visibleTitle('#detailTitle');
    assert.ok(page.url().endsWith('#explore/pattern/expose'));
    assert.equal(await page.locator('.compare-toggle').getAttribute('aria-expanded'), 'true');
    await page.locator('[data-explorer-view="practice"]').click();
    await page.locator('[data-answer="0"]').click(); assert.match(await page.locator('.practice-feedback').innerText(), /判斷正確/);
    console.log('通過：六組材料前後對照、鍵盤展開、切換／收合、單圖解說、教材回程與既有練習');

    await open('#explore/packaging/interposer');
    await page.locator('.compare-toggle').click();
    assert.equal(await page.locator('.package-option').count(), 3);
    assert.equal(await page.locator('.package-option.is-selected').count(), 1);
    assert.equal(await page.locator('.packaging-comparison .flow-arrow').count(), 0);
    assert.match(await page.locator('.comparison-note').innerText(), /沒有先後或優劣排名/);
    await page.locator('.package-option h4 a[href$="/stack"]').click();
    await page.waitForFunction(() => document.querySelector('#detailTitle')?.textContent === '3D 整合');
    await visibleTitle('#comparisonTitle');
    assert.match(await page.locator('.package-option.is-selected h4').innerText(), /3D 整合/);
    await page.locator('.package-option.is-selected .comparison-source').click();
    await page.locator('.article-headline').waitFor();
    assert.ok(page.url().endsWith('#ch21?from=packaging%2Fstack'));
    await page.locator('.chapter-scenario-link').click(); await visibleTitle('#detailTitle');
    assert.equal(await page.locator('#diagramComparison').isVisible(), true);
    console.log('通過：封裝三項並排、目前選項、無時序語意及個別教材回程');

    for (const id of ['journey', 'dispatch']) {
      const images = [];
      const scenario = SCENARIOS.find(s => s.id === id);
      for (const n of scenario.nodes) {
        await open(`#explore/${id}/${n.id}`);
        await page.waitForFunction(title => document.querySelector('#detailTitle')?.textContent === title, n.title);
        images.push(await page.locator('.detail-visual').innerHTML());
        if (id === 'dispatch') {
          assert.equal(await page.locator('.dispatch-role').count(), 5);
          assert.ok(await page.locator('.dispatch-role.is-active').count() > 0);
          assert.match(await page.locator('.material-legend').innerText(), /虛線：資訊核對與回寫/);
          assert.match(await page.locator('.material-legend').innerText(), /實線：晶圓盒搬運/);
        }
      }
      assert.equal(new Set(images).size, 5, `${id}五站圖例必須對應不同內容`);
    }
    console.log('通過：晶圓旅程與派工各五站圖例不同，角色與搬運／資訊圖例保留');

    }
    const expand = async () => {
      const button = page.locator('.compare-toggle');
      if (await button.getAttribute('aria-expanded') === 'true') await button.click();
      await button.click();
      await visibleTitle('#comparisonTitle');
      await visibleTitle('.comparison-heading button');
    };
    for (const width of [1440, 390, 312]) {
      await page.setViewportSize({ width, height: width === 312 ? 780 : 1000 });
      for (const scenario of ['pattern/expose', 'packaging/interposer', 'dispatch/recipe']) {
        await open('#explore/' + scenario);
        if (scenario.startsWith('dispatch')) {
          await page.evaluate(() => {
            const diagram = document.querySelector('.dispatch-diagram');
            const toolbar = document.querySelector('.explorer-toolbar');
            const inset = parseFloat(getComputedStyle(toolbar).top) + toolbar.getBoundingClientRect().height + 12;
            scrollTo({ top: scrollY + diagram.getBoundingClientRect().top - inset, behavior: 'instant' });
          });
        } else {
          await expand();
        }
        const overflow = await page.evaluate(() => ({ page: document.documentElement.scrollWidth - innerWidth,
          clipped: [...document.querySelectorAll('.visual-comparison:not([hidden]), .package-option, .dispatch-role')].filter(el => el.clientWidth && (el.scrollWidth > el.clientWidth + 2 || (el.classList.contains('dispatch-role') && el.scrollHeight > el.clientHeight + 2))).map(el => el.className) }));
        assert.ok(overflow.page <= 1, JSON.stringify(overflow)); assert.deepEqual(overflow.clipped, []);
        await page.screenshot({ path: path.join(evidence, `1.3.0_${scenario.split('/')[0]}_${width}.png`) });
      }
    }
    await page.setViewportSize({ width: 768, height: 500 });
    await open('#explore/dispatch/recipe'); await visibleTitle('#detailTitle');
    await open('#explore/pattern/expose'); await expand();
    console.log('通過：1440／390／312圖例與比較無裁切，768×500解說及比較焦點可見');

  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); server.close(); }
