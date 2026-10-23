import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { SCENARIOS } from '../data/scenario-paths.js';

const mode = process.argv[2];
assert.ok(['基準', '導覽', '畫面'].includes(mode), '必須指定定點案例');
const root = fileURLToPath(new URL('../', import.meta.url));
const evidence = process.env.HUB_EVIDENCE_DIR;
assert.ok(evidence, '必須提供證據目錄');
const server = http.createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
    let source = root;
    if (mode==='畫面' && pathname.startsWith('基準/')) {source=process.env.HUB_BASELINE_ROOT;pathname=pathname.slice(3)||'index.html';}
    const file = path.resolve(source, pathname);
    if (!file.startsWith(path.resolve(source) + path.sep)) { res.writeHead(403); res.end(); return; }
    res.setHeader('Content-Type', ({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'}[path.extname(file)] || 'text/plain') + '; charset=utf-8');
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}/`;
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
const browser = await chromium.launch({channel:'msedge',headless:true});
const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
page.setDefaultTimeout(8000);
const errors = []; page.on('pageerror',e=>errors.push(e.message));
const settled = async hash => {
  await page.waitForFunction(hash=>document.querySelector(`.flow-node[href="${hash}"]`)?.getAttribute('aria-current')==='step',hash);
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
};
const open = async hash => {await page.goto(base+hash);await settled(hash);};
const original = () => page.evaluate(()=>({
  title:document.querySelector('#detailTitle').textContent,
  text:document.querySelector('.detail-copy').textContent,
  svg:document.querySelector('.detail-visual svg').innerHTML,
  links:[...document.querySelectorAll('.source-chapter,.step-controls a')].map(a=>[a.textContent,a.getAttribute('href')])
}));
try {
  if(mode==='畫面') {
    for(const width of [1440,390]) {
      await page.setViewportSize({width,height:1000});
      let previous;
      for(const [prefix,version] of [['基準/','1.5.0'],['','1.6.0']]) {
        await page.goto(base+prefix+'#explore/journey/transistor');await settled('#explore/journey/transistor');
        await page.locator('[data-explorer-view="detail"]').click();
        const current=await page.locator('.node-detail').evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
        if(previous) assert.deepEqual(current,previous,'相同視窗與操作的原解說版面必須一致');
        previous=current;
        await page.screenshot({path:path.join(evidence,`${version}_延伸同條件_${width}.png`)});
      }
    }
    assert.deepEqual(errors,[]);console.log('原節點版面同條件1440／390對照通過。');
  } else {
  const record = {version:'1.5.0',sha:'e5234de9bded41c9af401bd60fd744b38e379380',nodes:{}};
  const baseline = mode==='導覽' ? JSON.parse(await readFile(path.join(evidence,'1.5.0_延伸前基準.json'),'utf8')) : null;
  let checkedLinks=0;
  for(const s of SCENARIOS) for(const n of s.nodes) {
    const hash=`#explore/${s.id}/${n.id}`;
    await open(hash);
    if(mode==='基準') {record.nodes[hash]=await original();continue;}
    assert.deepEqual(await original(),baseline.nodes[hash],'原節點圖形、解說與流程入口必須保留');
    const links=await page.locator('.related-link').evaluateAll(items=>items.map(a=>({href:a.getAttribute('href'),text:a.textContent})));
    assert.ok(links.length>=1&&links.length<=2,'每站提供一至兩項延伸');
    for(let i=0;i<links.length;i++) {
      const target=links[i].href;
      assert.notEqual(target.split('/')[1],s.id,'延伸必須跨情境');
      await page.locator('.related-link').nth(i).focus();
      await page.keyboard.press('Enter');await settled(target);
      assert.equal(await page.evaluate(()=>document.activeElement.id),'detailTitle');
      assert.equal(await page.locator('.flow-node[aria-current="step"]').getAttribute('href'),target);
      assert.match(links[i].text,new RegExp((await page.locator('#detailTitle').innerText()).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
      await page.goBack();await settled(hash);
      assert.equal(await page.evaluate(()=>document.activeElement.id),'detailTitle');
      checkedLinks++;
    }
  }
  for(const width of [1440,390,312,768]) {
    await page.setViewportSize({width,height:width===768?500:1000});
    await open('#explore/journey/transistor');
    if(mode==='導覽') {
      await page.locator('.related-link').first().focus();
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'頁面不可橫向溢位');
      assert.ok(await page.locator('.related-link').first().evaluate(el=>{const r=el.getBoundingClientRect();return r.width>=44&&r.height>=44&&r.left>=0&&r.right<=innerWidth;}));
      await page.keyboard.press('Tab');assert.equal(await page.locator('.related-link').nth(1).evaluate(el=>el===document.activeElement),true);
      await page.keyboard.press('Shift+Tab');assert.equal(await page.locator('.related-link').first().evaluate(el=>el===document.activeElement),true);
      assert.ok(await page.locator('.related-link').first().evaluate(el=>el.getBoundingClientRect().top>=document.querySelector('.explorer-toolbar').getBoundingClientRect().bottom),'鍵盤焦點不可被工具列遮住');
      if(width!==768) assert.ok(await page.locator('.related-heading').evaluate(el=>el.getBoundingClientRect().top>=document.querySelector('.explorer-toolbar').getBoundingClientRect().bottom),'空間足夠時呈現延伸標題');
    }
    await page.screenshot({path:path.join(evidence,`${mode==='基準'?'1.5.0_延伸前':'1.6.0_延伸探索'}_${width}.png`)});
  }
  if(mode==='基準') await writeFile(path.join(evidence,'1.5.0_延伸前基準.json'),JSON.stringify(record,null,2));
  else {
    await open('#explore/pattern/expose');await page.locator('.compare-toggle').click();assert.equal(await page.locator('.comparison-pair svg').count(),2);
    await page.locator('.diagram-launch').click();assert.equal(await page.locator('.diagram-dialog').evaluate(el=>el.matches(':modal')),true);await page.keyboard.press('Escape');
    await page.locator('.source-chapter').click();await page.locator('.article-headline').waitFor();
    assert.equal(await page.locator('.chapter-scenario-link').getAttribute('href'),'#explore/pattern/expose');
    await page.locator('.chapter-scenario-link').click();await settled('#explore/pattern/expose');
    await page.locator('[data-explorer-view="practice"]').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'practiceTitle');
    await open('#explore/quality/decision');await page.locator('.signal-toggle').click();await page.locator('[data-signal-example="single"]').click();
    const target=await page.locator('.related-link').first().getAttribute('href');await page.locator('.related-link').first().click();await settled(target);await page.goBack();await settled('#explore/quality/decision');
    assert.match(await page.locator('.signal-preview').innerText(),/單點越界/);
    console.log(`延伸探索通過：25站原內容保全、${checkedLinks}條跨情境連結、鍵盤與瀏覽器返回、四尺寸及受影響既有入口。`);
  }
  assert.deepEqual(errors,[]);
  if(mode==='基準') console.log('已擷取1.5.0共25站原圖、解說、流程與教材連結及四尺寸基準。');
  }
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
