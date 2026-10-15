import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const mode = process.argv[2];
assert.ok(['操作', '模型', '畫面'].includes(mode), '案例必須是操作、模型或畫面');
assert.ok(process.env.HUB_EVIDENCE_DIR, '必須指定 HUB_EVIDENCE_DIR 證據目錄');
assert.ok(process.env.PLAYWRIGHT_PACKAGE, '必須指定 PLAYWRIGHT_PACKAGE');
const root = fileURLToPath(new URL('../', import.meta.url));
const evidence = path.resolve(process.env.HUB_EVIDENCE_DIR);
await mkdir(evidence, { recursive: true });
let server;
let base = process.env.HUB_BASE_URL;
if (!base) {
  server = http.createServer(async (req, res) => {
    try {
      const relative = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
      const file = path.resolve(root, relative);
      if (!file.startsWith(path.resolve(root) + path.sep)) { res.writeHead(403); res.end(); return; }
      res.setHeader('Content-Type', ({ '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' }[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8');
      res.end(await readFile(file));
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}/`;
}
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
let browser;
let page;
const report = { 案例: mode, 來源: base, 本機根目錄: root, 開始時間: new Date().toISOString(), 結果: '未完成', 範圍: [], 紀錄: [], 頁面錯誤: [], 限制: ['不代表全部教材技術主張或完整英譯審查', '剪貼簿案例使用頁面模擬，未測作業系統剪貼簿'] };
try {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  page.setDefaultTimeout(7000);
  page.on('pageerror', error => report.頁面錯誤.push(error.message));
  // 僅記錄定時器生命週期，不改變 callback 或時序。
  await page.addInitScript(() => {
    const start = window.setInterval.bind(window), stop = window.clearInterval.bind(window);
    window.__工程定時器 = new Set();
    window.setInterval = (fn, ms, ...args) => { const id = start(fn, ms, ...args); window.__工程定時器.add(id); return id; };
    window.clearInterval = id => { window.__工程定時器.delete(id); return stop(id); };
  });
  const card = page.locator('.eng-obj-card');
  const hud = async () => {
    assert.equal(await card.locator('[data-action="fullscreen"]').count(), 1, '全螢幕入口必須唯一且保留');
    assert.equal(await card.locator('[data-action="copy-svg"]').count(), 1, '複製入口必須唯一且保留');
  };
  const open = async id => {
    // 相同雜湊的 goto 不會重建應用，須先離開文件才可取得真正初始狀態。
    await page.goto('about:blank');
    await page.goto(`${base.split('#')[0]}#${id}`, { waitUntil: 'domcontentloaded' });
    await card.waitFor();
    assert.equal(await card.count(), 1, `${id} 必須掛載一個實際工程物件`);
    await hud();
  };
  const route = async id => {
    const previous = await page.locator('.engineering-object-mount').elementHandle();
    await page.evaluate(id => { location.hash = id; }, id);
    await page.waitForFunction(previous => !previous.isConnected, previous);
    await card.waitFor();
    await previous.dispose();
  };
  const setRange = async (selector, value) => {
    const range = card.locator(selector);
    await range.evaluate((el, next) => { el.value = String(next); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
    assert.equal(Number(await range.inputValue()), value, `${selector} 實際輸入值必須等於指定模型值`);
  };
  const arrows = async range => {
    const info = await range.evaluate(el => ({ min: Number(el.min || 0), max: Number(el.max || 100), step: Number(el.step || 1), value: Number(el.value), valid: el.validity.valid, attr: Number(el.getAttribute('value')) }));
    assert.ok(info.valid && info.value >= info.min && info.value <= info.max, '滑桿預設值必須符合原生範圍與步距');
    assert.equal(info.value, info.attr, '模型宣告值與瀏覽器滑桿值必須相同');
    assert.ok(info.step > 0 && info.max - info.min >= info.step * 2, '滑桿必須有連續兩步可驗證範圍');
    let initial = info.value;
    let direction = info.value + info.step * 2 <= info.max + 1e-8 ? 1 : -1;
    const handle = await range.elementHandle();
    await range.focus();
    if (initial + 2 * info.step > info.max && initial - 2 * info.step < info.min) {
      await page.keyboard.press('Home');
      assert.equal(Number(await range.inputValue()), info.min, '僅三個格點的滑桿先用Home定位首格');
      initial = info.min;
      direction = 1;
    }
    for (let i = 1; i <= 2; i++) {
      await page.keyboard.press(direction === 1 ? 'ArrowRight' : 'ArrowLeft');
      assert.ok(Math.abs(Number(await range.inputValue()) - (initial + direction * info.step * i)) < 1e-6, '每次鍵盤操作必須恰好更新一個步距');
      assert.equal(await range.evaluate((el, previous) => el === previous && document.activeElement === el, handle), true, '更新後須保留原控制項與焦點');
    }
    await handle.dispose();
    await hud();
  };
  const english = async () => {
    await open('ch04');
    const zh = await card.locator('.eng-obj-title').innerText();
    await page.locator('.lang-btn[data-lang="en"]').click();
    await page.waitForFunction(previous => document.querySelector('.eng-obj-title')?.textContent !== previous, zh);
    assert.match(await card.locator('[data-action="fullscreen"]').innerText(), /Full/i, '英文模式必須切換既有全螢幕標籤');
    await card.locator('[data-mode="euv"]').click();
    await arrows(card.locator('#ch04K1'));
    await page.locator('.lang-btn[data-lang="zh"]').click();
    await page.waitForFunction(previous => document.querySelector('.eng-obj-title')?.textContent === previous, zh);
    report.紀錄.push({ 英文抽驗: '第04章標題、全螢幕標籤、模式及滑桿，已返回中文' });
  };

  if (mode === '操作') {
    report.範圍 = ['第04章控制項身分、鍵盤與真實滑鼠拖曳', '模態焦點與路由清理', 'ALD事件與定時器', 'SVG成功與手動備援', '英文標籤抽驗'];
    await open('ch04');
    await card.locator('[data-mode="euv"]').click();
    await hud();
    await arrows(card.locator('#ch04K1'));
    const slider = card.locator('#ch04K1');
    await slider.scrollIntoViewIfNeeded();
    const original = await slider.elementHandle();
    const box = await slider.boundingBox();
    assert.ok(box && box.width > 40, '拖曳滑桿必須具有可操作寬度');
    const values = [];
    await page.mouse.move(box.x + 12, box.y + box.height / 2);
    await page.mouse.down();
    for (const fraction of [0.25, 0.45, 0.65, 0.85]) {
      await page.mouse.move(box.x + box.width * fraction, box.y + box.height / 2, { steps: 5 });
      values.push(Number(await slider.inputValue()));
      assert.equal(await slider.evaluate((el, previous) => el === previous, original), true, '拖曳期間不可替換滑桿');
    }
    await page.mouse.up();
    assert.ok(values.every((value, i) => i === 0 || value > values[i - 1]), '按住滑鼠持續拖曳時各取樣值必須持續增加');
    await original.dispose();
    report.紀錄.push({ 拖曳取樣: values });
    const overflow = await page.evaluate(() => document.body.style.overflow);
    await card.locator('[data-action="fullscreen"]').click();
    const dialog = page.locator('.eng-obj-dialog');
    assert.equal(await dialog.evaluate(el => el.matches(':modal')), true, '必須使用原生模態視窗');
    await card.locator('[data-tab="pr"]').click();
    await card.locator('[data-tab="path"]').click();
    await arrows(card.locator('#ch04K1'));
    assert.equal(await dialog.evaluate(el => el.matches(':modal')), true, '切頁籤與滑桿後仍保持模態狀態');
    const focusSelector = 'button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],summary,[tabindex="0"]';
    for (const edge of ['first', 'last']) {
      await dialog.evaluate((el, { selector, edge }) => { const all = [...el.querySelectorAll(selector)].filter(n => n.getClientRects().length && !n.closest('[hidden]')); window.__預期焦點 = edge === 'first' ? all.at(-1) : all[0]; (edge === 'first' ? all[0] : all.at(-1)).focus(); }, { selector: focusSelector, edge });
      await page.keyboard.press(edge === 'first' ? 'Shift+Tab' : 'Tab');
      assert.equal(await page.evaluate(() => document.activeElement === window.__預期焦點), true, '模態視窗首尾焦點必須循環');
    }
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'detached' });
    assert.equal(await dialog.count(), 0, 'Esc 必須移除模態視窗');
    assert.equal(await card.locator('[data-action="fullscreen"]').evaluate(el => document.activeElement === el), true, '關閉後返回原全螢幕按鈕焦點');
    assert.equal(await page.evaluate(() => document.body.style.overflow), overflow, '關閉後還原頁面捲動');
    await card.locator('[data-action="fullscreen"]').click();
    await route('ch05');
    assert.equal(await dialog.count(), 0, '換章節必須清理全螢幕視窗');
    assert.equal(await page.evaluate(() => document.body.style.overflow), overflow, '換章節必須還原捲動');
    await page.locator('#aldResetBtn').click();
    for (let i = 1; i <= 8; i++) {
      await page.locator('#aldNextBtn').click();
      assert.equal(Number(await card.locator('.eng-obj-stepper-info strong').first().innerText()), 1 + Math.floor(i / 4), '連續單步只能按每四步增加一個循環');
    }
    const timersBefore = await page.evaluate(() => window.__工程定時器.size);
    await page.locator('#aldPlayBtn').click();
    assert.equal(await page.evaluate(() => window.__工程定時器.size), timersBefore + 1, '播放必須只增加一個定時器');
    const detached = await page.locator('.engineering-object-mount').elementHandle();
    await route('ch04');
    assert.equal(await page.evaluate(() => window.__工程定時器.size), timersBefore, '離開 ALD 必須清除播放定時器');
    const stopped = await detached.evaluate(el => el.innerHTML);
    await page.waitForTimeout(1000);
    assert.equal(await detached.evaluate(el => el.innerHTML), stopped, '離開後超過播放週期不得更新舊物件');
    await detached.dispose();
    await card.locator('[data-mode="high_na"]').click();
    const svg = await card.locator('.eng-obj-viewport > svg').evaluate(el => el.outerHTML);
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.__已複製SVG = text; } } }));
    await card.locator('[data-action="copy-svg"]').click();
    assert.equal(await page.evaluate(() => window.__已複製SVG), svg, '成功複製必須使用目前模式的 SVG');
    assert.equal(await card.locator('.eng-obj-copy-feedback textarea').isVisible(), false, '成功複製時隱藏手動欄位');
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('模擬剪貼簿拒絕'); } } }));
    await card.locator('[data-action="copy-svg"]').click();
    const field = card.locator('.eng-obj-copy-feedback textarea');
    await field.waitFor({ state: 'visible' });
    assert.equal(await field.inputValue(), svg, '拒絕時提供相同目前 SVG 的手動複製欄位');
    assert.match(await card.locator('[role="status"]').innerText(), /手動複製/, '失敗必須提供可理解的備援提示');
    await english();
  }

  if (mode === '模型') {
    report.範圍 = ['28個工程物件的實際頁籤與滑桿', 'CVD受限區域', 'DRAM圖線與保持時間', 'NAND及封裝輸入合法值', '四世代封裝參考圖', '英文標籤抽驗'];
    const consumers = [...Array.from({ length: 25 }, (_, i) => `ch${String(i).padStart(2, '0')}`), 'app-glossary', 'app-jargon', 'app-reading'];
    for (const id of consumers) {
      await open(id);
      const tabs = await card.locator('.eng-obj-tab').evaluateAll(nodes => nodes.map(el => ({ text: el.textContent, attrs: [...el.attributes].filter(a => a.name.startsWith('data-')).map(a => [a.name, a.value]) })));
      assert.ok(tabs.length > 0, `${id} 必須有可驗證頁籤`);
      let ranges = 0;
      for (const tab of tabs) {
        // 每個初始控制項從同一章節初始狀態進入，避免模式間相依造成漏驗。
        await open(id);
        const selector = tab.attrs.map(([name, value]) => `[${name}="${value}"]`).join('');
        assert.ok(selector, `${id} 頁籤必須有可識別的資料屬性`);
        await card.locator(`.eng-obj-tab${selector}`).click();
        await hud();
        const ids = await card.locator('input[type="range"]').evaluateAll(nodes => nodes.map(el => el.id));
        for (const inputId of ids) { assert.ok(inputId, '滑桿必須有穩定識別碼'); await arrows(card.locator(`[id="${inputId}"]`)); ranges++; }
      }
      report.紀錄.push({ 章節: id, 初始頁籤數: tabs.length, 滑桿操作數: ranges });
    }
    await open('ch05');
    await card.locator('[data-tab="cvd"]').click();
    await setRange('#ch05TempSlider', 680);
    await setRange('#ch05PressSlider', 1.5);
    assert.match(await card.locator('.eng-obj-viewport').textContent(), /表面反應受限：ks < hg/, '680°C及1.5Torr必須顯示表面反應受限');
    await open('ch13');
    await setRange('#ch13ArSlider', 35);
    await setRange('#ch13TempSlider', 105);
    const dram = await card.locator('.eng-obj-viewport').evaluate(el => {
      const label = el.textContent.match(/t_ret\s*=\s*(\d+)\s*ms/);
      const curve = el.querySelector('path[stroke="#38bdf8"][stroke-width="2.5"]');
      return { retention: Number(label?.[1]), path: curve?.getAttribute('d'), text: el.textContent };
    });
    assert.ok(dram.path && dram.retention > 0, 'DRAM必須公開保持時間與放電圖線');
    const points = [...dram.path.matchAll(/[ML]\s*([\d.]+),([\d.]+)/g)].map(m => [Number(m[1]), Number(m[2])]);
    const threshold = 100 - 0.7 / 1.2 * 80;
    const index = points.findIndex((p, i) => i > 0 && p[1] >= threshold && points[i - 1][1] < threshold);
    assert.ok(index > 0, '105°C、AR35的圖線必須穿過0.7V下限');
    const [x0, y0] = points[index - 1], [x1, y1] = points[index];
    const crossing = (x0 + (threshold - y0) * (x1 - x0) / (y1 - y0)) * 128 / 160;
    assert.ok(Math.abs(crossing - dram.retention) <= 4, '圖線0.7V交點須在顯示保持時間正負4ms內');
    assert.match(dram.text, /tREFW\s*=\s*32\s*ms/, '高溫顯示32ms刷新視窗');
    report.紀錄.push({ DRAM圖線交點毫秒: crossing, 顯示保持時間毫秒: dram.retention });
    await card.locator('[data-tab="nand"]').click();
    assert.equal(Number(await card.locator('#ch13NandSlider').inputValue()), 232, 'NAND預設必須保持232層');
    assert.match(await card.locator('.eng-obj-viewport').textContent(), /232/, 'NAND圖形須顯示相同層數');
    await open('ch21');
    await card.locator('[data-tab="density"]').click();
    assert.equal(await card.locator('.eng-obj-viewport > svg').count(), 2, '封裝密度須同時保留互動圖及四世代參考圖');
    const generations = await card.locator('.eng-obj-viewport > svg').nth(1).textContent();
    for (const expected of [/1000\s*µm/, /150\s*µm/, /35\s*µm/, /0\.9\s*µm/, /1,200,000/]) assert.match(generations, expected, '四世代參考圖的原間距及密度數值必須保留');
    await setRange('#pitchSlider', 35);
    assert.match(await card.locator('.eng-obj-viewport > svg').first().textContent(), /35\.0µm/, '封裝圖必須顯示與滑桿一致的35.0µm');
    await english();
  }

  if (mode === '畫面') {
    report.範圍 = ['第04章與第21章密度頁籤', '1440、390、312及768×500', '頁籤可達性、水平溢位與全螢幕退出', 'PNG供主控人工視讀'];
    for (const size of [{ width: 1440, height: 1000 }, { width: 390, height: 1000 }, { width: 312, height: 800 }, { width: 768, height: 500 }]) {
      await page.setViewportSize(size);
      for (const id of ['ch04', 'ch21']) {
        await open(id);
        if (id === 'ch21') await card.locator('[data-tab="density"]').click();
        const geometry = await card.locator('.eng-obj-tab').evaluateAll(nodes => nodes.map(el => { const r = el.getBoundingClientRect(), c = el.closest('.eng-obj-card').getBoundingClientRect(); return { 文字: el.textContent, 左: r.left, 右: r.right, 卡片左: c.left, 卡片右: c.right, 寬: r.width }; }));
        for (const item of geometry) assert.ok(item.寬 > 0 && item.左 >= item.卡片左 - 1 && item.右 <= item.卡片右 + 1, '所有頁籤須在卡片內可達，不可被橫向裁切');
        const controlsFit = await card.locator('input[type="range"], .eng-obj-slider-item label, .eng-obj-slider-val').evaluateAll(nodes => nodes.every(el => {
          const r = el.getBoundingClientRect(), c = el.closest('.eng-obj-card').getBoundingClientRect();
          return r.left >= c.left && r.right <= c.right;
        }));
        assert.ok(controlsFit, '滑桿、標籤與數值均須在卡片內可見');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true, '頁面不可水平溢位');
        const headerItems = await page.locator('.header-actions button, .header-actions a').evaluateAll(nodes => nodes.filter(el => el.getClientRects().length).map(el => {
          const r = el.getBoundingClientRect();
          return { id:el.id || el.title, left:r.left, right:r.right, bottom:r.bottom, headerBottom:el.closest('header').getBoundingClientRect().bottom };
        }));
        for (const item of headerItems) assert.ok(item.left >= 0 && item.right <= size.width + 1 && item.bottom <= item.headerBottom + 1, `頁首入口須完整可達：${item.id}`);
        await card.scrollIntoViewIfNeeded();
        const filename = `${mode}_${id}_${size.width}x${size.height}.png`;
        await page.screenshot({ path: path.join(evidence, filename) });
        await card.locator('[data-action="fullscreen"]').click();
        const exit = card.locator('[data-action="fullscreen"]');
        await exit.scrollIntoViewIfNeeded();
        const hit = await exit.evaluate(el => { const r = el.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2; return x >= 0 && x <= innerWidth && y >= 0 && y <= innerHeight && el.contains(document.elementFromPoint(x, y)); });
        assert.equal(hit, true, '全螢幕退出按鈕必須能捲動到且不被遮住');
        if (size.width <= 560) {
          const viewport = card.locator('.eng-obj-viewport');
          const readable = await viewport.evaluate(el => {
            const width = el.querySelector('svg').getBoundingClientRect().width;
            el.scrollLeft = el.scrollWidth;
            const reachable = el.scrollLeft > 0;
            el.scrollLeft = 0;
            return width >= 640 && reachable;
          });
          assert.ok(readable, '手機全螢幕圖形至少640像素且可橫向捲動閱讀');
        }
        await page.screenshot({ path: path.join(evidence, `全螢幕_${id}_${size.width}x${size.height}.png`) });
        await exit.click();
        assert.equal(await page.locator('.eng-obj-dialog').count(), 0, '退出按鈕必須可關閉視窗');
        report.紀錄.push({ 章節: id, 尺寸: size, 截圖: filename, 頁籤: geometry });
      }
    }
  }
  assert.deepEqual(report.頁面錯誤, [], '本次工程物件案例不得有頁面執行錯誤');
  report.結果 = '通過';
} catch (error) {
  report.結果 = '失敗';
  report.失敗原因 = error.message;
  if (page) {
    report.失敗畫面 = await page.evaluate(() => ({
      網址: location.href, 視窗寬: innerWidth, 文件寬: document.documentElement.scrollWidth,
      溢位元素: [...document.body.querySelectorAll('*')].map(el => ({el, r: el.getBoundingClientRect()}))
        .filter(({el,r}) => r.width && r.right > innerWidth + 1 && !el.closest('.sidebar,svg'))
        .slice(0, 25).map(({el,r}) => ({標籤:el.tagName, 類別:el.className, 寬:r.width, 左:r.left, 右:r.right}))
    }));
    await page.screenshot({path:path.join(evidence, `失敗_${mode}.png`)});
  }
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (server) await new Promise(resolve => server.close(resolve));
  report.完成時間 = new Date().toISOString();
  const output = path.join(evidence, `工程物件_${mode}_摘要.json`);
  await writeFile(output, JSON.stringify(report, null, 2), 'utf8');
  console.log(JSON.stringify({ 案例: mode, 結果: report.結果, 證據: output, 失敗原因: report.失敗原因 }));
}
