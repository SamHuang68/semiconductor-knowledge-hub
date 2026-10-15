import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const mode = process.argv[2];
assert.ok(['保全', '操作', '畫面', '交錯'].includes(mode), '請指定保全、操作、畫面或交錯案例');
assert.ok(process.env.HUB_EVIDENCE_DIR && process.env.PLAYWRIGHT_PACKAGE, '必須指定證據目錄及Playwright套件');
assert.ok(mode !== '保全' || process.env.HUB_BASELINE, '保全案例必須指定原版基準檔');
const root = fileURLToPath(new URL('../', import.meta.url));
const evidence = path.resolve(process.env.HUB_EVIDENCE_DIR);
await mkdir(evidence, { recursive: true });
let server, browser, page;
let base = process.env.HUB_BASE_URL;
const report = { 案例: mode, 開始時間: new Date().toISOString(), 結果: '未完成', 目前狀態: null, 紀錄: [], 頁面錯誤: [], 限制: ['僅工程物件圖例閱讀範圍，非整站驗證', '剪貼簿使用頁面模擬，未測作業系統剪貼簿', '截圖須由主控視讀，幾何斷言不等於完整視覺驗收'] };
const compact = text => text.replace(/\s+/g, '');
try {
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
  report.來源 = base;
  const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  page.setDefaultTimeout(8000);
  page.on('pageerror', error => report.頁面錯誤.push(error.message));
  const card = page.locator('.eng-obj-card');
  const viewport = card.locator('.eng-obj-viewport');
  const reader = card.locator('.eng-diagram-reader');
  const action = name => card.locator(`[data-diagram-action="${name}"]`);
  const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const open = async (chapter, selector = null) => {
    report.目前狀態 = { 章節: chapter, 頁籤: selector, 尺寸: page.viewportSize() };
    // 強制重新載入，確保每個原版狀態從模型預設值起始。
    await page.goto('about:blank');
    await page.goto(`${base.split('#')[0]}#${chapter}`, { waitUntil: 'domcontentloaded' });
    await card.waitFor();
    if (selector) await card.locator(`.eng-obj-tab${selector}`).click();
    await settle();
    assert.equal(await card.count(), 1, `${chapter} 必須有一個實際工程物件`);
    assert.equal(await card.locator('.eng-diagram-toolbar').count(), 1, '圖面閱讀工具列必須唯一');
    for (const name of ['fit', 'read', 'out', 'in', 'text']) assert.equal(await action(name).count(), 1, `必須保留${name}閱讀控制`);
    assert.equal(await viewport.getAttribute('tabindex'), '0', '圖面須可用鍵盤聚焦');
  };
  const measure = async () => viewport.evaluate(el => [...el.querySelectorAll(':scope > svg')].map((svg, diagram) => {
    const frame = svg.getBoundingClientRect();
    return { 圖序: diagram, 名稱: svg.getAttribute('aria-label'), 視框: svg.getAttribute('viewBox'),
      文字: [...svg.querySelectorAll('text')].map((text, index) => {
        const box = text.getBoundingClientRect();
        const matrix = text.getScreenCTM();
        const scale = Math.min(Math.hypot(matrix.a, matrix.b), Math.hypot(matrix.c, matrix.d));
        return { 索引: index, 文字: text.textContent, 畫面字級: parseFloat(getComputedStyle(text).fontSize) * scale,
          範圍: { 左: box.left - frame.left, 上: box.top - frame.top, 右: box.right - frame.left, 下: box.bottom - frame.top },
          圖面: { 寬: frame.width, 高: frame.height },
          出界: box.left < frame.left - 0.5 || box.top < frame.top - 0.5 || box.right > frame.right + 0.5 || box.bottom > frame.bottom + 0.5 };
      }) };
  }));
  const checkLabels = async () => {
    const diagrams = await measure();
    const expected = diagrams.flatMap(diagram => diagram.文字.map(text => compact(text.文字)));
    const actual = await card.locator('.eng-diagram-text-list li').evaluateAll(nodes => nodes.map(el => el.textContent.replace(/\s+/g, '')));
    assert.deepEqual(actual, expected, '文字清單須逐項對應目前所有SVG文字，不刪字、不合併項目');
    const buttons = await card.locator('.eng-diagram-text-list li button').evaluateAll(nodes => nodes.map(el => ({ 圖: el.dataset.diagramIndex, 字: el.dataset.textIndex })));
    assert.deepEqual(buttons, diagrams.flatMap((d, i) => d.文字.map((_, j) => ({ 圖: String(i), 字: String(j) }))), '每個文字項目必須具有正確圖序及文字索引');
    return diagrams;
  };
  const checkBounds = diagrams => {
    for (const diagram of diagrams) for (const text of diagram.文字) {
      assert.equal(text.出界, false, `${report.目前狀態.章節} ${report.目前狀態.頁籤} 圖${diagram.圖序}字${text.索引}出界：${text.文字}；${JSON.stringify(text.範圍)}／${JSON.stringify(text.圖面)}`);
    }
  };
  const read = async () => {
    await action('read').click(); await settle();
    assert.equal(await viewport.getAttribute('data-view'), 'read', '可讀比例必須設為read狀態');
    const scale = Number(await viewport.getAttribute('data-scale'));
    assert.equal((await card.locator('.eng-diagram-scale').textContent()).trim(), `${Math.round(scale * 100)}%`, '比例標籤須與目前圖面倍率一致');
    const diagrams = await checkLabels();
    for (const diagram of diagrams) for (const text of diagram.文字) assert.ok(text.畫面字級 >= 15.95, `${report.目前狀態.章節} 圖${diagram.圖序}字${text.索引}可讀字級不足16px：${text.文字}（${text.畫面字級}）`);
    checkBounds(diagrams);
    return diagrams;
  };
  const fit = async () => {
    await action('fit').click(); await settle();
    // dialog 移回正文後 ResizeObserver 會重新計算圖寬；等待實際布局完成，仍要求全圖完全可見。
    await page.waitForFunction(() => { const el = document.querySelector('.eng-obj-viewport'); return el?.dataset.view === 'fit' && el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1; }, null, { timeout: 1500 });
    assert.equal(await viewport.getAttribute('data-view'), 'fit', '符合視窗必須設為fit狀態');
    const extent = await viewport.evaluate(el => ({ 寬: el.clientWidth, 高: el.clientHeight, 內容寬: el.scrollWidth, 內容高: el.scrollHeight }));
    assert.ok(extent.內容寬 <= extent.寬 + 1 && extent.內容高 <= extent.高 + 1, `符合視窗須顯示全部圖面：${JSON.stringify(extent)}`);
    checkBounds(await measure());
  };
  const controls = () => card.locator('.eng-obj-tab,input[type="range"],[data-action="fullscreen"],[data-action="copy-svg"],.eng-obj-stepper-actions button').evaluateAll(nodes => nodes.map(el => ({ 標籤: el.tagName, 識別: el.id, 文字: el.textContent, 屬性: [...el.attributes].filter(a => a.name.startsWith('data-')).map(a => [a.name, a.value]), 值: el.value })));
  const screenshot = async name => { await card.locator('.eng-diagram-toolbar').scrollIntoViewIfNeeded(); await settle(); await page.screenshot({ path: path.join(evidence, name) }); };

  if (mode === '保全') {
    const baseline = JSON.parse(await readFile(process.env.HUB_BASELINE, 'utf8'));
    assert.equal(baseline.狀態.length, 94, '原版基準必須包含94個指定狀態');
    report.基準提交 = baseline.提交;
    const selected = new Set(['ch01:[data-tab="facility"]', 'ch03:[data-tab="cz"]', 'ch04:[data-tab="path"]', 'ch04:[data-tab="pr"]', 'ch21:[data-tab="density"]']);
    for (const [label, size] of [['桌面', { width: 1440, height: 1000 }], ['手機', { width: 390, height: 1000 }]]) {
      await page.setViewportSize(size); await settle();
      for (const state of baseline.狀態) {
        await open(state.章節, state.頁籤);
        const before = await controls();
        assert.equal(await reader.evaluate(el => el.open), true, '圖面文字清單首次載入預設展開');
        const diagrams = await checkLabels();
        const old = state[label];
        assert.ok(Array.isArray(old) && old.length > 0, '基準必須包含此尺寸的實際SVG紀錄');
        assert.equal(diagrams.length, old.length, '原圖數量不可減少，雙SVG須保持');
        diagrams.forEach((diagram, i) => assert.deepEqual(diagram.文字.map(t => compact(t.文字)), old[i].文字.map(t => compact(t.文字)), `${state.章節} ${state.頁籤} 圖${i}原文字須逐項保留`));
        const readable = await read();
        await fit();
        assert.deepEqual(await controls(), before, '閱讀模式切換不可移除或改變既有控制項與輸入值');
        const record = { 章節: state.章節, 頁籤: state.頁籤, 尺寸: label, 圖數: diagrams.length, 文字數: diagrams.reduce((sum, d) => sum + d.文字.length, 0), 最小閱讀字級: Math.min(...readable.flatMap(d => d.文字.map(t => t.畫面字級))) };
        if (selected.has(`${state.章節}:${state.頁籤}`)) {
          const filename = `${label}_${state.章節}_${state.頁籤.match(/="([^"]+)"/)[1]}.png`;
          await screenshot(filename); record.截圖 = filename;
        }
        report.紀錄.push(record);
      }
    }
    assert.equal(report.紀錄.length, 188, '必須完成94狀態的桌面及手機對照，不可跳過');
  }

  if (mode === '操作') {
    for (const size of [{ width: 1440, height: 1000 }, { width: 390, height: 1000 }, { width: 312, height: 800 }, { width: 768, height: 500 }]) {
      await page.setViewportSize(size); await settle();
      await open('ch04', '[data-tab="path"]');
      await read();
      const centered = await viewport.evaluate(el => { const a = el.querySelector('svg').getBoundingClientRect(), b = el.getBoundingClientRect(); return Math.abs((a.left + a.right) / 2 - (b.left + b.right) / 2); });
      assert.ok(centered <= 2, `從全圖切入閱讀比例須保留圖面中心，偏移${centered}px`);
      await viewport.evaluate(el => { el.scrollLeft = 80; el.scrollTop = 40; });
      const range = card.locator('#ch04K1');
      const handle = await range.elementHandle();
      const snapshot = () => viewport.evaluate(el => ({ view: el.dataset.view, scale: Number(el.dataset.scale), x: el.scrollLeft, y: el.scrollTop }));
      const before = await snapshot();
      assert.ok(before.scale > 0 && before.x > 0, '可讀圖面必須能平移並具有明確比例');
      const initial = Number(await range.inputValue());
      await range.focus();
      for (let i = 1; i <= 2; i++) {
        await page.keyboard.press('ArrowRight'); await settle();
        assert.ok(Math.abs(Number(await range.inputValue()) - (initial + i * 0.01)) < 1e-6, '連續方向鍵須更新正確模型步距');
        assert.equal(await range.evaluate((el, old) => el === old && document.activeElement === el, handle), true, '圖面重繪後保留原滑桿及焦點');
        const after = await snapshot();
        assert.deepEqual(after, before, '模型重繪須保留圖面閱讀狀態、比例及捲動位置');
      }
      await range.scrollIntoViewIfNeeded();
      const rect = await range.boundingBox();
      assert.ok(rect && rect.width > 40, '真實拖曳需要可操作的滑桿寬度');
      await page.mouse.move(rect.x + 12, rect.y + rect.height / 2); await page.mouse.down();
      const values = [];
      for (const fraction of [0.3, 0.5, 0.7]) {
        await page.mouse.move(rect.x + rect.width * fraction, rect.y + rect.height / 2, { steps: 4 }); await settle();
        values.push(Number(await range.inputValue()));
        assert.equal(await range.evaluate((el, old) => el === old && document.activeElement === el, handle), true, '拖曳期間須維持控制項與焦點');
        assert.deepEqual(await snapshot(), before, '真實拖曳重繪須保留閱讀比例與捲動');
      }
      await page.mouse.up(); await handle.dispose();
      assert.ok(values.every((value, i) => i === 0 || value > values[i - 1]), '連續拖曳值須持續增加');
      const hash = await page.evaluate(() => location.hash);
      await viewport.focus();
      await viewport.evaluate(el => { el.scrollLeft = 0; });
      await page.keyboard.press('ArrowRight'); await settle();
      assert.ok(await viewport.evaluate(el => el.scrollLeft > 0), '聚焦圖面後方向鍵必須平移');
      assert.equal(await page.evaluate(() => location.hash), hash, '圖面方向鍵不得觸發全站章節導覽');
      assert.equal(await viewport.evaluate(el => document.activeElement === el), true, '平移後仍聚焦圖面');
      const scaleBefore = Number(await viewport.getAttribute('data-scale'));
      await action('in').click(); await settle();
      const enlarged = Number(await viewport.getAttribute('data-scale'));
      assert.ok(Number.isFinite(enlarged) && enlarged > scaleBefore, '放大按鈕必須增加有效比例');
      assert.equal(await viewport.getAttribute('data-view'), 'custom', '手動縮放必須記錄custom狀態');
      await action('out').click(); await settle();
      const reduced = Number(await viewport.getAttribute('data-scale'));
      assert.ok(Number.isFinite(reduced) && reduced > 0 && reduced < enlarged, '縮小按鈕必須降低有效比例');
      await card.locator('.eng-diagram-reader > summary').click();
      assert.equal(await reader.evaluate(el => el.open), false, '文字清單可手動收合');
      await range.focus(); await page.keyboard.press('ArrowLeft'); await settle();
      assert.equal(await reader.evaluate(el => el.open), false, '滑桿重繪保留使用者收合狀態');
      await card.locator('[data-tab="pr"]').click(); await settle();
      assert.equal(await reader.evaluate(el => el.open), false, '切換頁籤保留使用者收合狀態');
      await action('text').click(); await settle();
      assert.equal(await reader.evaluate(el => el.open), true, '文字工具按鈕須展開閱讀清單');
      assert.equal(await reader.evaluate(el => el.contains(document.activeElement)), true, '文字工具須把鍵盤焦點帶到閱讀區');
      await fit();
      const target = card.locator('.eng-diagram-text-list li button').last();
      const targetIndex = await target.evaluate(el => ({ diagram: Number(el.dataset.diagramIndex), text: Number(el.dataset.textIndex) }));
      await target.click(); await settle();
      assert.equal(await viewport.getAttribute('data-view'), 'read', '點文字須切到可讀比例');
      const targetState = await viewport.evaluate((el, index) => {
        const text = el.querySelectorAll(':scope > svg')[index.diagram].querySelectorAll('text')[index.text];
        const r = text.getBoundingClientRect(), v = el.getBoundingClientRect();
        // 文字比視窗寬時保留可讀比例並定位中心，不能為了定位而縮小字體。
        const horizontal = r.width <= el.clientWidth ? r.left >= v.left - 1 && r.right <= v.right + 1 : (r.left + r.right) / 2 >= v.left && (r.left + r.right) / 2 <= v.right;
        const vertical = r.height <= el.clientHeight ? r.top >= v.top - 1 && r.bottom <= v.bottom + 1 : (r.top + r.bottom) / 2 >= v.top && (r.top + r.bottom) / 2 <= v.bottom;
        return { visible: horizontal && vertical, focus: document.activeElement === el || document.activeElement === text };
      }, targetIndex);
      assert.equal(targetState.visible, true, '文字定位須帶入目標；超出視窗的長文字須定位中心並維持可讀比例');
      assert.equal(targetState.focus, true, '文字定位後焦點須在圖面或目標文字');
      await fit();
      await viewport.focus();
      await page.evaluate(() => { window.__原生捲動鍵 = null; window.addEventListener('keydown', event => { if (event.key === 'PageDown') window.__原生捲動鍵 = event.defaultPrevented; }, { once: true }); });
      await page.keyboard.press('PageDown'); await settle();
      assert.equal(await page.evaluate(() => window.__原生捲動鍵), false, '全圖無內部捲動時保留原生頁面捲動鍵');
      const resized = { width: size.width === 1440 ? 1200 : size.width + 20, height: size.height };
      await page.setViewportSize(resized); await settle();
      assert.equal(await viewport.getAttribute('data-view'), 'fit', '視窗變更須保留fit狀態');
      const fitted = await viewport.evaluate(el => el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1);
      assert.equal(fitted, true, 'fit狀態隨視窗變更重新符合圖面');
      await page.setViewportSize(size); await settle();
      const overflow = await page.evaluate(() => document.body.style.overflow);
      await card.locator('[data-action="fullscreen"]').click(); await settle();
      await card.locator('[data-tab="path"]').click(); await settle(); await read();
      assert.equal(await page.locator('.eng-obj-dialog').evaluate(el => el.matches(':modal')), true, '全螢幕切頁籤與閱讀比例後保持模態');
      await page.keyboard.press('Escape'); await settle();
      assert.equal(await page.locator('.eng-obj-dialog').count(), 0, 'Esc關閉全螢幕');
      assert.equal(await card.locator('[data-action="fullscreen"]').evaluate(el => document.activeElement === el), true, 'Esc關閉須恢復全螢幕入口焦點');
      assert.equal(await page.evaluate(() => document.body.style.overflow), overflow, 'Esc關閉須還原捲動');
      await fit();
      const originalTextSize = await card.locator('.eng-diagram-text-list button').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize));
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; }); await settle();
      if (!(await reader.evaluate(el => el.open))) await action('text').click();
      const enlargedTextSize = await card.locator('.eng-diagram-text-list button').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize));
      assert.ok(enlargedTextSize >= originalTextSize * 1.95, '200%根字級必須實際放大閱讀清單文字');
      const reflow = await reader.evaluate(el => ({ container: el.scrollWidth <= el.clientWidth + 1, page: document.documentElement.scrollWidth <= innerWidth + 1, items: [...el.querySelectorAll('li')].every(item => item.scrollWidth <= item.clientWidth + 1) }));
      assert.deepEqual(reflow, { container: true, page: true, items: true }, '200%根字級時文字清單及頁面須重排而非水平溢位');
      await reader.scrollIntoViewIfNeeded(); await settle();
      await page.screenshot({ path: path.join(evidence, `操作_文字重排_${size.width}x${size.height}.png`) });
      await page.evaluate(() => { document.documentElement.style.fontSize = ''; }); await settle();
      await open('ch21', '[data-tab="density"]');
      await read();
      const labels = (await checkLabels()).map(d => d.文字.map(t => compact(t.文字)));
      assert.equal(labels.length, 2, '封裝密度原兩張SVG必須保留');
      await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.__圖例匯出 = value; } } }));
      await card.locator('[data-action="copy-svg"]').click(); await settle();
      const exported = await page.evaluate(() => {
        const doc = new DOMParser().parseFromString(window.__圖例匯出, 'image/svg+xml');
        const svg = doc.documentElement;
        return { errors: doc.querySelectorAll('parsererror').length, viewBox: svg.getAttribute('viewBox'), diagrams: [...svg.children].filter(n => n.tagName.toLowerCase() === 'svg').map(n => ({ viewBox: n.getAttribute('viewBox'), text: [...n.querySelectorAll('text')].map(t => t.textContent.replace(/\s+/g, '')) })), displayStyle: [...doc.querySelectorAll('svg')].some(n => /(?:width|height|transform|display)\s*:[^;]*px/i.test(n.getAttribute('style') || '')) };
      });
      assert.equal(exported.errors, 0, '匯出的雙SVG必須可解析');
      assert.ok(exported.viewBox, '匯出需保留可移植viewBox');
      assert.equal(exported.displayStyle, false, '匯出不得混入顯示縮放用px樣式');
      assert.equal(exported.diagrams.length, 2, '複製必須包含兩張原圖');
      assert.deepEqual(exported.diagrams.map(d => d.text), labels, '複製的兩張圖文字須與目前圖面完全相同');
      assert.ok(exported.diagrams.every(d => d.viewBox), '兩張原圖的viewBox均須保留');
      await fit();
      await screenshot(`操作_封裝_${size.width}x${size.height}.png`);
      report.紀錄.push({ 尺寸: size, 拖曳取樣: values, SVG文字數: labels.map(items => items.length), 根字級重排: reflow });
    }
  }
  if (mode === '交錯') {
    report.限制 = ['以頁面input事件控制重繪時序，驗證定位與模型更新交錯；不是實體拖曳或隨機壓力測試'];
    await page.setViewportSize({width:390,height:1000});
    await open('ch04', '[data-tab="path"]');
    const updateDuringClick = async locator => locator.evaluate(button => button.addEventListener('click', () => {
      const measure = phase => { const el=document.querySelector('.eng-obj-viewport'), text=[...el.querySelectorAll('text')].at(-1), r=text.getBoundingClientRect(), v=el.getBoundingClientRect(); (window.__定位交錯量測 ||= []).push({phase,scroll:[el.scrollLeft,el.scrollTop],text:[r.left-v.left,r.top-v.top,r.width,r.height],size:[el.clientWidth,el.clientHeight,el.scrollWidth,el.scrollHeight]}); };
      measure('重繪前');
      document.querySelector('#ch04K1').dispatchEvent(new Event('input', {bubbles:true}));
      measure('重繪後');
      requestAnimationFrame(()=>{measure('畫格一');requestAnimationFrame(()=>{measure('畫格二');requestAnimationFrame(()=>measure('畫格三'));});});
    }, {once:true}));
    await updateDuringClick(action('read'));
    await read();
    const center = await viewport.evaluate(el => { const svg=el.querySelector('svg').getBoundingClientRect(), box=el.getBoundingClientRect(); return Math.abs((svg.left+svg.right-box.left-box.right)/2); });
    assert.ok(center<=2, `定位待完成時的模型重繪不可取消置中，偏移${center}px`);
    await fit();
    const target=card.locator('.eng-diagram-text-list button').last();
    await updateDuringClick(target);
    await target.click(); await settle();
    await page.waitForFunction(()=>document.activeElement===document.querySelector('.eng-obj-viewport'),null,{timeout:1500});
    const located=await viewport.evaluate(el=>{const text=[...el.querySelectorAll('text')].at(-1).getBoundingClientRect(), box=el.getBoundingClientRect();return {焦點:document.activeElement===el,水平:(text.left+text.right)/2>=box.left&&(text.left+text.right)/2<=box.right,垂直:text.top>=box.top-1&&text.bottom<=box.bottom+1};});
    assert.deepEqual(located,{焦點:true,水平:true,垂直:true},'文字定位待完成時的模型重繪不可取消捲動與焦點');
    await fit();
    await card.evaluate(el=>{el.querySelector('[data-diagram-action="read"]').click();el.querySelector('[data-diagram-action="fit"]').click();});
    await settle();
    assert.deepEqual(await viewport.evaluate(el=>({view:el.dataset.view,x:el.scrollLeft,y:el.scrollTop})),{view:'fit',x:0,y:0},'明確的新視圖操作須取代舊定位');
    report.紀錄.push({項目:'縮放及文字定位與模型更新交錯',中心偏移:center,文字定位:located,最後操作優先:true});
  }

  if (mode === '畫面') {
    report.限制 = ['只補指定圖例元素截圖及局部字形、動畫與英文標籤檢查，不重跑188狀態或完整操作案例', '截圖須由主控視讀，幾何斷言不等於完整視覺驗收'];
    const capture = async (locator, name) => {
      await locator.screenshot({ path: path.join(evidence, name), animations: 'allow' });
      return name;
    };
    for (const size of [{ width: 1440, height: 1000 }, { width: 390, height: 1000 }, { width: 312, height: 800 }]) {
      await page.setViewportSize(size); await settle();
      for (const [chapter, tab] of [['ch04', 'path'], ['ch04', 'pr'], ['ch21', 'density']]) {
        await open(chapter, `[data-tab="${tab}"]`);
        await fit();
        const prefix = `畫面_${chapter}_${tab}_${size.width}`;
        const files = [await capture(viewport, `${prefix}_全圖.png`)];
        const readable = await read();
        files.push(await capture(viewport, `${prefix}_閱讀圖面.png`));
        files.push(await capture(reader, `${prefix}_文字清單.png`));
        if (size.width === 1440 && chapter === 'ch04' && tab === 'path') {
          await card.locator('.eng-diagram-toolbar').evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
          await settle();
          const joint = await card.evaluate(el => {
            const toolbar = el.querySelector('.eng-diagram-toolbar').getBoundingClientRect();
            const art = el.querySelector('.eng-obj-viewport').getBoundingClientRect();
            const header = document.querySelector('.app-header').getBoundingClientRect();
            return toolbar.top >= header.bottom && toolbar.bottom <= innerHeight && art.top >= toolbar.bottom && art.bottom <= innerHeight;
          });
          assert.equal(joint, true, '代表頁面截圖須同時完整包含工具列與閱讀圖面');
          await page.screenshot({ path: path.join(evidence, `${prefix}_工具列與閱讀圖面.png`) });
          files.push(`${prefix}_工具列與閱讀圖面.png`);
        }
        if (chapter === 'ch04' && tab === 'path') {
          await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; }); await settle();
          const geometry = await reader.evaluate(el => ({
            字級: [...el.querySelectorAll('.eng-diagram-text-list button')].map(button => parseFloat(getComputedStyle(button).fontSize)),
            序號: [...el.querySelectorAll('.eng-diagram-text-list button')].map(button => { const style = getComputedStyle(button, '::before'); return { 換行: style.whiteSpace, 基寬: style.flexBasis, 字級: style.fontSize }; }),
            容器不溢位: el.scrollWidth <= el.clientWidth + 1,
            頁面不溢位: document.documentElement.scrollWidth <= innerWidth + 1,
            項目不溢位: [...el.querySelectorAll('li,li button')].every(item => item.scrollWidth <= item.clientWidth + 1)
          }));
          assert.ok(geometry.字級.length > 0 && geometry.字級.every(value => value >= 31.95), '200%閱讀清單每項實際字級至少32px');
          assert.ok(geometry.序號.every(value => value.換行 === 'nowrap'), '清單序號必須禁止換行，避免01上下分裂');
          assert.ok(geometry.容器不溢位 && geometry.頁面不溢位 && geometry.項目不溢位, '200%文字清單、項目及頁面均不可水平溢位');
          files.push(await capture(reader, `${prefix}_文字清單200百分比.png`));
          report.紀錄.push({ 章節: chapter, 頁籤: tab, 尺寸: size, 根字級百分比: 200, 量測: geometry });
          await page.evaluate(() => { document.documentElement.style.fontSize = ''; }); await settle();
        }
        report.紀錄.push({ 章節: chapter, 頁籤: tab, 尺寸: size, 最小閱讀字級: Math.min(...readable.flatMap(d => d.文字.map(t => t.畫面字級))), 截圖: files });
      }
    }

    // 在既有CSS動畫物件上設定取樣時間，不改寫動畫來源或定位結構。
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 }); await settle();
      await open('ch03', '[data-tab="cz"]'); await fit();
      const animations = await viewport.evaluate(el => {
        window.__圖例動畫取樣 = el.getAnimations({ subtree: true }).map(animation => ({ animation, time: animation.currentTime, state: animation.playState }));
        window.__圖例動畫取樣.forEach(({ animation }) => animation.pause());
        return window.__圖例動畫取樣.map(({ animation }) => ({ 名稱: animation.animationName, 週期: animation.effect.getTiming().duration }));
      });
      assert.ok(animations.some(animation => animation.名稱 === 'crystalPull' && animation.週期 === 5000), '必須找到既有5秒晶棒拉升動畫，不能跳過動畫案例');
      try {
        for (const time of [0, 2500, 4999]) {
          await page.evaluate(time => window.__圖例動畫取樣.forEach(({ animation }) => { animation.currentTime = time; }), time);
          await settle();
          report.目前狀態.動畫時間毫秒 = time;
          const diagrams = await measure();
          checkBounds(diagrams);
          const file = await capture(viewport, `畫面_ch03_cz_${width}_動畫${time}毫秒.png`);
          report.紀錄.push({ 章節: 'ch03', 頁籤: 'cz', 寬度: width, 動畫時間毫秒: time, 動畫: animations, 文字數: diagrams.flatMap(d => d.文字).length, 截圖: file });
        }
      } finally {
        await page.evaluate(() => {
          window.__圖例動畫取樣.forEach(({ animation, time, state }) => { animation.currentTime = time; if (state === 'running') animation.play(); else if (state === 'paused') animation.pause(); });
          delete window.__圖例動畫取樣;
        });
      }
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.setViewportSize({ width: 1440, height: 1000 }); await settle();
    await open('ch04', '[data-tab="path"]');
    await page.locator('.lang-btn[data-lang="en"]').click();
    await page.waitForFunction(() => document.querySelector('.eng-obj-title')?.textContent.includes('Scanner Optical Path'));
    await settle();
    for (const optical of ['dry', 'imm', 'euv', 'high_na']) {
      report.目前狀態 = { 章節: 'ch04', 頁籤: optical, 語言: '英文', 尺寸: page.viewportSize() };
      await card.locator(`[data-mode="${optical}"]`).click(); await settle();
      const original = (await measure()).map(diagram => diagram.文字.map(item => compact(item.文字)));
      assert.ok(original.flat().some(text => text.includes('ReticleStage(4xMaskPattern)')), '英文光罩長標籤必須保留');
      assert.ok(original.flat().some(text => text.includes('IlluminatorPupil(Quasar/Annular)')), '英文照明光瞳長標籤必須保留');
      await fit();
      const diagrams = await read();
      assert.deepEqual(diagrams.map(diagram => diagram.文字.map(item => compact(item.文字))), original, '英文閱讀比例切換須逐項保留原標籤');
      const record = { 章節: 'ch04', 頁籤: optical, 語言: '英文', 最小閱讀字級: Math.min(...diagrams.flatMap(d => d.文字.map(t => t.畫面字級))) };
      if (optical === 'high_na') {
        await fit();
        record.截圖 = await capture(viewport, '畫面_ch04_英文高NA_1440_全圖.png');
      }
      report.紀錄.push(record);
    }
  }
  assert.deepEqual(report.頁面錯誤, [], '本次圖例閱讀案例不得出現頁面執行錯誤');
  report.結果 = '通過';
} catch (error) {
  report.結果 = '失敗'; report.失敗原因 = error.message; process.exitCode = 1;
  if (page) {
    try {
      if(mode==='交錯') report.交錯量測=await page.evaluate(()=>window.__定位交錯量測);
      report.失敗量測 = await page.locator('.eng-obj-viewport').evaluate(el => ({ view: el.dataset.view, scale: el.dataset.scale, scroll: [el.scrollLeft, el.scrollTop], size: [el.clientWidth, el.clientHeight, el.scrollWidth, el.scrollHeight], 文字: [...el.querySelectorAll('svg text')].map(t => t.textContent) }));
      await page.screenshot({ path: path.join(evidence, `失敗_${mode}.png`) });
    } catch { report.失敗擷取 = '頁面已無法擷取，保留原始案例失敗資訊'; }
  }
} finally {
  await browser?.close();
  if (server) await new Promise(resolve => server.close(resolve));
  report.完成時間 = new Date().toISOString();
  const output = path.join(evidence, `圖例閱讀_${mode}_摘要.json`);
  await writeFile(output, JSON.stringify(report, null, 2), 'utf8');
  console.log(JSON.stringify({ 案例: mode, 結果: report.結果, 已完成狀態數: report.紀錄.length, 證據: output, 失敗原因: report.失敗原因 }));
}
