import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const mode = process.argv[2];
assert.ok(['基準', '檢視', '畫面'].includes(mode), '必須指定案例');
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
page.setDefaultTimeout(8000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const open = async (scenario, node) => {
  const hash = `#explore/${scenario}/${node}`;
  await page.goto(base + hash);
  await page.waitForFunction(hash => document.querySelector(`.flow-node[href="${hash}"]`)?.getAttribute('aria-current') === 'step', hash);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
};
const routes = [['journey','wiring'],['pattern','expose'],['quality','decision'],['packaging','stack'],['dispatch','recipe']];
try {
  if (mode === '基準') {
    const record = { version: '1.4.0', sha: 'efc3f24cb1f38546e9b12181fd9dfd9d4159067d', diagrams: [] };
    for (const [scenario, node] of routes) {
      await open(scenario, node);
      assert.match(await page.locator('.app-footer').innerText(), /版本 1\.4\.0/);
      record.diagrams.push({ scenario, node, text: await page.locator('.detail-visual').innerText(), svg: await page.locator('.detail-visual svg').innerHTML() });
    }
    for (const width of [1440,390]) {
      await page.setViewportSize({width,height:1000});
      await page.locator('.explorer-tools [data-explorer-view="detail"]').click();
      await page.screenshot({path:path.join(evidence, `1.4.0_放大前基準_${width}.png`)});
    }
    await writeFile(path.join(evidence, '1.4.0_放大前基準.json'), JSON.stringify(record,null,2));
    console.log('已觀測1.4.0五種圖例原貌與1440／390畫面。');
  } else if (mode === '畫面') {
    for (const [scenario,node] of routes) {
      await open(scenario,node);
      await page.locator('.diagram-launch').click();
      await page.locator('#diagramFit').click();
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      await page.screenshot({path:path.join(evidence,`1.5.0_圖例畫面_${scenario}.png`)});
      await page.locator('#diagramClose').click();
    }
    for (const width of [1440,390]) {
      await page.setViewportSize({width,height:1000});
      await page.locator('.explorer-tools [data-explorer-view="detail"]').click();
      await page.screenshot({path:path.join(evidence,`1.5.0_原頁保全_${width}.png`)});
    }
    console.log('已擷取五種圖例與原頁同尺寸畫面，供主控實際覆核；不重跑互動案例。');
  } else {
    const baseline = JSON.parse(await readFile(path.join(evidence,'1.4.0_放大前基準.json'),'utf8'));
    for (const [scenario,node] of routes) {
      await open(scenario,node);
      const original = await page.locator('.detail-visual svg').innerHTML();
      const originalOverflow = await page.evaluate(()=>getComputedStyle(document.body).overflow);
      assert.equal(original, baseline.diagrams.find(item=>item.scenario===scenario).svg, '原圖形須保持一致');
      await page.locator('.diagram-launch').focus(); await page.keyboard.press('Enter');
      assert.equal(await page.locator('.diagram-dialog').evaluate(el=>el.matches(':modal')), true);
      assert.equal(await page.evaluate(()=>getComputedStyle(document.body).overflow),'hidden');
      assert.equal(await page.evaluate(()=>document.activeElement.id), 'diagramClose');
      await page.keyboard.press('Shift+Tab');
      assert.equal(await page.evaluate(()=>document.activeElement.tagName),'SUMMARY');
      assert.equal(await page.locator('.diagram-dialog svg').innerHTML(), original);
      assert.equal(await page.locator('.diagram-dialog [id="qualityPreview"]').count(),0);
      await page.locator('#diagramPlus').click();
      assert.equal(await page.locator('#diagramMinus').isDisabled(),false);
      await page.keyboard.press('/');
      assert.equal(await page.locator('#searchModal').evaluate(el=>el.classList.contains('is-open')),false);
      await page.keyboard.press('m');
      assert.equal(await page.locator('#atlasModal').evaluate(el=>el.classList.contains('is-open')),false);
      for(let i=0;i<9;i++) {await page.keyboard.press('Tab'); assert.equal(await page.evaluate(()=>!!document.activeElement.closest('.diagram-dialog')),true);}
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.diagram-dialog').isVisible(),false);
      assert.equal(await page.evaluate(()=>document.activeElement.className),'diagram-launch');
      assert.equal(await page.evaluate(()=>getComputedStyle(document.body).overflow),originalOverflow);
    }
    for(const size of [{width:1440,height:1000},{width:390,height:1000},{width:312,height:800},{width:768,height:500}]) {
      console.log(`檢查圖例視窗：${size.width}×${size.height}`);
      await page.setViewportSize(size);
      await open('dispatch','recipe');
      await page.locator('.diagram-launch').click();
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      assert.equal(await page.locator('.diagram-dialog .dispatch-role').count(),5);
      assert.ok(Number((await page.locator('#diagramZoom').textContent()).replace('%',''))>=100,'初次開啟不縮小文字');
      await page.screenshot({path:path.join(evidence,`1.5.0_圖例閱讀_${size.width}.png`)});
      await page.locator('#diagramFit').click();
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      const fit = Number((await page.locator('#diagramZoom').textContent()).replace('%',''));
      assert.ok(fit>0 && fit<=300);
      const geometry = await page.locator('.diagram-viewport').evaluate(el=>({viewport:[el.clientWidth,el.clientHeight,el.scrollWidth,el.scrollHeight],output:document.querySelector('#diagramZoom').textContent,style:el.querySelector('.diagram-stage').getAttribute('style'),transform:el.querySelector('.diagram-canvas').getAttribute('style'),stage:el.querySelector('.diagram-stage').getBoundingClientRect().toJSON(),canvas:el.querySelector('.diagram-canvas').getBoundingClientRect().toJSON(),art:el.querySelector('.detail-visual').getBoundingClientRect().toJSON()}));
      if (geometry.viewport[2]>geometry.viewport[0]+1 || geometry.viewport[3]>geometry.viewport[1]+1) {console.log(JSON.stringify({size,fit,geometry}));await page.screenshot({path:path.join(evidence,'1.5.0_符合視窗診斷.png')});}
      assert.ok(geometry.viewport[2]<=geometry.viewport[0]+1 && geometry.viewport[3]<=geometry.viewport[1]+1,'符合視窗時需顯示整張圖');
      await page.screenshot({path:path.join(evidence,`1.5.0_圖例全圖_${size.width}.png`)});
      for(let i=0;i<4;i++) await page.locator('#diagramPlus').click();
      assert.ok(await page.locator('.diagram-viewport').evaluate(el=>el.scrollWidth>el.clientWidth || el.scrollHeight>el.clientHeight));
      await page.locator('.diagram-viewport').focus(); await page.keyboard.press('End');
      assert.ok(await page.locator('.diagram-viewport').evaluate(el=>el.scrollTop>0 || el.scrollLeft>0),'End 須移到可捲動軸的末端');
      await page.keyboard.press('Home');
      assert.ok(await page.locator('.diagram-viewport').evaluate(el=>el.scrollTop===0 && el.scrollLeft===0));
      await page.locator('#diagramFit').click();
      assert.equal(await page.locator('#diagramZoom').textContent(),fit+'%');
      await page.locator('.diagram-notes summary').click();
      assert.match(await page.locator('#diagramBoundary').innerText(),/晶圓廠/);
      assert.ok(await page.locator('#diagramClose').evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0 && r.right<=innerWidth && r.bottom<=innerHeight;}));
      await page.locator('#diagramClose').click();
    }
    await open('quality','decision');
    await page.locator('.signal-toggle').click();
    await page.locator('[data-signal-example="single"]').click();
    await page.locator('.diagram-launch').click();
    assert.equal(await page.locator('.diagram-dialog .is-outside').count(),1);
    assert.match(await page.locator('.diagram-dialog .signal-preview').innerText(),/單點越界/);
    await page.setViewportSize({width:312,height:800});
    await page.locator('#diagramFit').click();
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    assert.ok(await page.locator('.diagram-stage').evaluate(el=>el.getBoundingClientRect().height+1>=el.querySelector('.detail-visual').getBoundingClientRect().height),'旋轉後仍須完整容納原圖');
    for(let i=0;i<12 && !await page.locator('#diagramPlus').isDisabled();i++) await page.locator('#diagramPlus').click();
    assert.equal(await page.locator('#diagramZoom').textContent(),'300%');
    assert.equal(await page.locator('#diagramPlus').isDisabled(),true);
    await page.evaluate(()=>location.hash='#explore/pattern/etch');
    await page.waitForFunction(()=>document.querySelector('#detailTitle')?.textContent==='蝕刻轉移');
    assert.equal(await page.locator('.diagram-dialog').isVisible(),false);
    await page.locator('.compare-toggle').click();
    assert.equal(await page.locator('.comparison-pair svg').count(),2);
    await page.keyboard.press('/'); await page.locator('#searchModal.is-open').waitFor();
    await page.keyboard.press('Escape');
    console.log('圖例檢視通過：五種原圖保全、原生模態、鍵盤焦點與快捷鍵隔離、四尺寸縮放、完整圖、關閉回程及新舊入口。');
  }
  assert.deepEqual(errors,[]);
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
