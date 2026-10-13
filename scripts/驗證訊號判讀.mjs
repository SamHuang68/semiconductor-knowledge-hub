import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const mode = process.argv[2];
assert.ok(['基準', '判讀', '版面'].includes(mode), '必須指定案例');
const root = mode === '基準' ? process.env.HUB_BASELINE_ROOT : fileURLToPath(new URL('../', import.meta.url));
const evidence = process.env.HUB_EVIDENCE_DIR;
assert.ok(root && evidence, '必須指定來源及證據目錄');
await mkdir(evidence, { recursive: true });
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
    const file = path.resolve(root, pathname);
    if (!file.startsWith(path.resolve(root) + path.sep)) { res.writeHead(403); res.end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' }[path.extname(file)] || 'text/plain') + '; charset=utf-8');
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}/`;
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const open = async hash => {
  await page.goto(base + hash);
  await page.locator('#detailTitle').waitFor();
  await page.waitForFunction(hash => document.querySelector(`.branch-map a[href="${hash}"]`)?.getAttribute('aria-current') === 'step', hash);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
};
const shot = name => page.screenshot({ path: path.join(evidence, name + '.png') });
try {
  if (mode === '基準') {
    await open('#explore/quality/decision');
    assert.match(await page.locator('.app-footer').innerText(), /版本 1\.3\.0/);
    assert.equal(await page.locator('.branch-map .flow-node').count(), 6);
    assert.equal(await page.locator('.step-next').count(), 2);
    const before = { version: '1.3.0', sha: 'd23336eb6fef6c67037c2025a00c660817ba1865', source: await page.locator('.source-chapter').getAttribute('href'), steps: await page.locator('.step-next').allTextContents() };
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.locator('.explorer-tools [data-explorer-view="detail"]').click();
      await shot(`1.3.0_品質基準_${width}`);
    }
    await page.locator('.step-next[href$="/hold"]').click();
    await page.waitForFunction(() => document.querySelector('#detailTitle')?.textContent === '暫停與圈定範圍');
    await page.locator('.source-chapter').click();
    await page.locator('.article-headline').waitFor();
    assert.equal(await page.locator('.chapter-scenario-link').getAttribute('href'), '#explore/quality/hold');
    await writeFile(path.join(evidence, '1.3.0_品質基準.json'), JSON.stringify(before, null, 2));
    console.log('品質基準通過：六節點、雙分支與教材回程，1440／390 像素畫面已保存。');
  } else {
    const visibleHeading = async () => page.waitForFunction(() => {
      const title = document.querySelector('#signalTitle')?.getBoundingClientRect();
      const toolbar = document.querySelector('.explorer-toolbar')?.getBoundingClientRect();
      return title && toolbar && title.top >= toolbar.bottom && title.bottom < innerHeight;
    });
    const expand = async () => {
      if (await page.locator('.signal-toggle').getAttribute('aria-expanded') === 'false') await page.locator('.signal-toggle').click();
      await visibleHeading();
    };
    const setPoint = async count => {
      await page.locator('#signalCount').focus();
      await page.keyboard.press('Home');
      for (let i = 1; i < count; i++) await page.keyboard.press('ArrowRight');
      assert.equal(await page.locator('#signalCount').inputValue(), String(count));
    };
    await open('#explore/quality/decision');
    if (mode === '判讀') {
      assert.equal(await page.locator('#signalLab').isVisible(), false);
      await page.locator('.signal-toggle').focus(); await page.keyboard.press('Enter');
      await visibleHeading();
      assert.equal(await page.evaluate(() => document.activeElement.id), 'signalTitle');
      assert.equal(await page.locator('#signalChart circle').count(), 12);
      assert.equal(await page.locator('#signalChart .is-outside').count(), 0);
      assert.match(await page.locator('#signalObservation').innerText(), /不能證明/);
      await page.locator('[data-signal-example="single"]').focus(); await page.keyboard.press('Space');
      assert.equal(await page.locator('[data-signal-example="single"]').getAttribute('aria-pressed'), 'true');
      await page.locator('#signalStart').click();
      assert.equal(await page.locator('#signalPrevious').isDisabled(), true);
      assert.equal(await page.locator('#signalChart circle').count(), 1);
      await setPoint(7);
      assert.equal(await page.locator('#signalChart .is-outside').count(), 0);
      assert.doesNotMatch(await page.locator('#signalObservation').innerText(), /第 8 點/);
      await page.locator('#signalNext').click();
      assert.equal(await page.locator('#signalChart .is-outside').count(), 1);
      assert.match(await page.locator('#signalObservation').innerText(), /第 8 點越過/);
      assert.equal(await page.locator('#signalChart circle').count(), 8);
      await page.locator('.signal-data summary').click();
      assert.equal(await page.locator('#signalRows tr').count(), 8);
      assert.match(await page.locator('#signalRows tr').last().innerText(), /超出上管制界限/);
      await setPoint(12);
      assert.match(await page.locator('#signalObservation').innerText(), /不會自動解除/);
      assert.equal(await page.locator('#signalNext').isDisabled(), true);
      const shown = await page.locator('#qualityPreview svg').innerHTML();
      for (const node of ['signal', 'decision', 'monitor', 'hold', 'cause', 'release']) {
        await page.locator(`.branch-map a[href$="/${node}"]`).click();
        await page.waitForURL(base + '#explore/quality/' + node);
        await page.waitForFunction(node => document.querySelector(`.branch-map a[href$="/${node}"]`)?.getAttribute('aria-current') === 'step', node);
        assert.equal(await page.locator('#qualityPreview svg').innerHTML(), shown, '瀏覽節點不能讓訊號自動恢復');
      }
      assert.equal(await page.locator('.step-next[href$="/cause"]').count(), 1);
      assert.equal(await page.locator('.step-next[href$="/monitor"]').count(), 1);
      await page.locator('[data-signal-example="shift"]').click();
      assert.equal(await page.locator('#signalChart .is-outside').count(), 0);
      assert.match(await page.locator('#signalObservation').innerText(), /連續 9 點/);
      assert.match(await page.locator('#signalObservation').innerText(), /不設定通用異常門檻/);
      await setPoint(3); assert.doesNotMatch(await page.locator('#signalObservation').innerText(), /連續 9/);
      await page.locator('.signal-source').click(); await page.locator('.article-headline').waitFor();
      assert.equal(await page.locator('.chapter-scenario-link').getAttribute('href'), '#explore/quality/decision');
      await page.locator('.chapter-scenario-link').click();
      await page.locator('#signalCount').waitFor();
      assert.equal(await page.locator('#signalCount').inputValue(), '3');
      assert.equal(await page.locator('[data-signal-example="shift"]').getAttribute('aria-pressed'), 'true');
      await page.locator('.signal-paths a[href$="/hold"]').click();
      await page.waitForFunction(() => document.querySelector('#detailTitle')?.textContent === '暫停與圈定範圍');
      await page.locator('.signal-toggle').click();
      assert.equal(await page.locator('#signalLab').isVisible(), false);
      assert.equal(await page.locator('.signal-toggle').getAttribute('aria-expanded'), 'false');
      await page.locator('.explorer-tools [data-explorer-view="practice"]').click();
      await page.locator('[data-answer="1"]').click();
      assert.match(await page.locator('.practice-feedback').innerText(), /判斷正確/);
      await page.reload(); await page.locator('#qualityPreview').waitFor();
      assert.match(await page.locator('#qualityPreview').innerText(), /基準波動.*前 12 點/);
      assert.equal(await page.locator('#signalLab').isVisible(), false);
      console.log('訊號判讀通過：三示例、逐點資料邊界、越界保留、鍵盤、六節點訊號保全、雙分支與教材回程、原練習。');
    }
    for (const width of [1440, 390, 312]) {
      await page.setViewportSize({ width, height: 1000 });
      await open('#explore/quality/decision');
      await page.locator('[data-signal-example="baseline"]').evaluate(button => button.click());
      await page.locator('.explorer-tools [data-explorer-view="detail"]').click();
      await shot(`1.4.0_品質解說_${width}`);
      const alignment = await page.locator('#qualityPreview').evaluate(preview => {
        const svg = preview.querySelector('svg').getBoundingClientRect();
        return [...preview.querySelectorAll('.signal-axis span')].every((label, i) => {
          const box = label.getBoundingClientRect();
          return Math.abs(box.top + box.height / 2 - (svg.top + svg.height * (i + 1) / 4)) < 1;
        });
      });
      assert.ok(alignment, `${width} 預覽標籤須對準三條管制線`);
      // 同一瀏覽工作階段保留開合狀態；先回到解說再明確重新展開。
      if (await page.locator('.signal-toggle').getAttribute('aria-expanded') === 'true') await page.locator('.signal-toggle').click();
      await expand();
      await shot(`1.4.0_訊號入口_${width}`);
      await page.locator('[data-signal-example="single"]').click();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width} 不可橫向溢出`);
      await page.evaluate(() => {
        const plot = document.querySelector('.signal-workspace').getBoundingClientRect();
        const toolbar = document.querySelector('.explorer-toolbar');
        const offset = (parseFloat(getComputedStyle(toolbar).top) || 0) + toolbar.getBoundingClientRect().height + 18;
        scrollTo({ top: scrollY + plot.top - offset, behavior: 'instant' });
      });
      await shot(`1.4.0_訊號曲線_${width}`);
      const geometry = await page.locator('.signal-lab').evaluate(panel => [...panel.querySelectorAll('button, input, svg, table, a')].filter(el => el.getBoundingClientRect().width).every(el => { const r=el.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth + 1; }));
      assert.ok(geometry, `${width} 圖表及操作完整位於畫面內`);
    }
    await page.setViewportSize({ width: 768, height: 500 });
    await page.locator('.explorer-tools [data-explorer-view="detail"]').click();
    await page.locator('.signal-toggle').click(); await expand(); await visibleHeading();
    console.log('訊號版面通過：1440／390／312 像素與 768×500 短視窗、標題焦點及無橫向溢出。');
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
