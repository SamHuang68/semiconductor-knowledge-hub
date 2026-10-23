import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { SCENARIOS } from '../data/scenario-paths.js';

const mode=process.argv[2];
assert.ok(['基準','回程','補充'].includes(mode),'必須指定定點案例');
const root=fileURLToPath(new URL('../',import.meta.url));
const evidence=process.env.HUB_EVIDENCE_DIR;
assert.ok(evidence,'必須提供既有證據目錄');
const server=http.createServer(async(req,res)=>{
  try {
    const file=path.resolve(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '')||'index.html');
    if(!file.startsWith(path.resolve(root)+path.sep)){res.writeHead(403);res.end();return;}
    res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'}[path.extname(file)]||'text/plain')+'; charset=utf-8');
    res.end(await readFile(file));
  }catch{res.writeHead(404);res.end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}/`;
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage();page.setDefaultTimeout(8000);
const errors=[];context.on('page',p=>p.on('pageerror',e=>errors.push(e.message)));page.on('pageerror',e=>errors.push(e.message));
const settle=async(hash,p=page)=>{
  await p.waitForFunction(hash=>location.hash===hash&&document.querySelector('.flow-node[aria-current="step"]')?.getAttribute('href').split('?')[0]===hash.split('?')[0],hash);
  await p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
};
const open=async hash=>{await page.goto(base+hash);await settle(hash);};
const contents=()=>page.evaluate(()=>({
  detail:document.querySelector('.detail-copy').textContent,
  svg:document.querySelector('.detail-visual svg').innerHTML,
  links:[...document.querySelectorAll('.source-chapter,.step-controls a')].map(a=>[a.textContent,a.getAttribute('href')]),
  related:[...document.querySelectorAll('.related-link')].map(a=>[a.textContent,a.getAttribute('href').split('?')[0]])
}));
try {
  if(mode==='補充'){
    const target='#explore/pattern/measure?via=quality%2Fdecision';
    for(const size of [{width:390,height:1000},{width:312,height:800},{width:768,height:500}]){
      await page.setViewportSize(size);await open(target);
      await page.locator('#detailTitle').focus();await page.keyboard.press('Tab');
      assert.equal(await page.locator('.exploration-return a').evaluate(el=>el===document.activeElement&&el.matches(':focus-visible')),true);
      assert.ok(await page.locator('.exploration-return a').evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=document.querySelector('.explorer-toolbar').getBoundingClientRect().bottom&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth;}));
      await page.screenshot({path:path.join(evidence,`1.7.0_長文字鍵盤回程_${size.width}.png`)});
      await page.keyboard.press('Enter');await settle('#explore/quality/decision');
    }
    await open(target);
    await page.evaluate(()=>{navigator.clipboard.writeText=async()=>{throw new DOMException('拒絕剪貼簿','NotAllowedError');};});
    await page.locator('#shareStep').click();await page.locator('#manualShare').waitFor({state:'visible'});
    assert.equal(await page.locator('#stepUrl').inputValue(),base+target);
    assert.equal(await page.evaluate(()=>document.activeElement.id),'stepUrl');
    await page.selectOption('#scenarioSelect','packaging');await settle('#explore/packaging/single');assert.equal(await page.locator('.exploration-return').count(),0);
    await open('#explore/packaging/single?via=journey%2Fpackage');await page.locator('.compare-toggle').click();
    await page.locator('.package-option h4 a').last().click();await settle('#explore/packaging/stack?via=journey%2Fpackage');
    await page.locator('.package-option .comparison-source').last().click();await page.locator('.article-headline').waitFor();
    assert.equal(await page.locator('.chapter-scenario-link').getAttribute('href'),'#explore/packaging/stack?via=journey%2Fpackage');
    for(const hash of ['#ch04?from=pattern%2Fexpose&via=unknown%2Fnode','#ch04?from=quality%2Fdecision&via=pattern%2Fmeasure']){
      await page.goto(base+hash);await page.locator('.article-headline').waitFor();
      assert.equal(new URLSearchParams(new URL(page.url()).hash.split('?')[1]).has('via'),false,'無效章節來源不得帶入回程');
      assert.ok(!(await page.locator('.chapter-scenario-link').getAttribute('href')).includes('via='));
    }
    assert.deepEqual(errors,[]);console.log('補充通過：真實Tab焦點、長文字及短視窗、手動分享、明確切換清除來源、封裝比較教材回程及章節參數拒絕。');
  }else{
  const record={version:'1.6.0',sha:'1c1ecdcc629d6ea4ab89517e3b094c966bfdd724',nodes:{},geometry:{}};
  const baseline=mode==='回程'?JSON.parse(await readFile(path.join(evidence,'1.6.0_回程前基準.json'),'utf8')):null;
  let count=0;
  for(const s of SCENARIOS)for(const n of s.nodes){
    const hash=`#explore/${s.id}/${n.id}`;await open(hash);
    if(mode==='基準'){record.nodes[hash]=await contents();continue;}
    assert.deepEqual(await contents(),baseline.nodes[hash],'原節點及延伸內容必須保留');
    assert.equal(await page.locator('.exploration-return').count(),0,'直接進入原網址不虛構延伸來源');
    const links=await page.locator('.related-link').evaluateAll(items=>items.map(a=>a.getAttribute('href')));
    for(let i=0;i<links.length;i++){
      await page.locator('.related-link').nth(i).click();await settle(links[i]);
      assert.equal(await page.locator('.exploration-return a').getAttribute('href'),hash);
      assert.match(await page.locator('.exploration-return').innerText(),new RegExp(n.title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
      await page.locator('.exploration-return a').focus();await page.keyboard.press('Enter');await settle(hash);
      assert.equal(await page.evaluate(()=>document.activeElement.id),'detailTitle');count++;
    }
  }
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:1000});await open('#explore/pattern/expose');
    await page.locator('.explorer-toolbar [data-explorer-view="detail"]').click();
    const geometry=await page.locator('.node-detail').evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
    if(mode==='基準')record.geometry[width]=geometry;else assert.deepEqual(geometry,baseline.geometry[width],'無來源的原版面不可改變');
    await page.screenshot({path:path.join(evidence,`${mode==='基準'?'1.6.0':'1.7.0'}_回程同條件_${width}.png`)});
  }
  if(mode==='基準'){
    await writeFile(path.join(evidence,'1.6.0_回程前基準.json'),JSON.stringify(record,null,2));
    console.log('已擷取1.6.0共25節點、28條延伸與1440／390同條件版面基準。');
  }else{
    const source='#explore/journey/transistor', target='#explore/pattern/expose?via=journey%2Ftransistor';
    await open(source);await page.locator('.related-link').first().click();await settle(target);
    await page.reload();await settle(target);assert.equal(await page.locator('.exploration-return a').getAttribute('href'),source);
    const fresh=await context.newPage();await fresh.goto(base+target);await settle(target,fresh);assert.equal(await fresh.locator('.exploration-return a').getAttribute('href'),source);await fresh.close();
    await page.locator('#shareStep').click();await page.waitForFunction(()=>document.querySelector('#shareStatus').textContent.includes('已複製'));
    assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),base+target);
    await page.locator('.step-next').click();await settle('#explore/pattern/etch?via=journey%2Ftransistor');
    assert.equal(await page.locator('.exploration-return a').getAttribute('href'),source);
    await page.locator('.compare-toggle').click();await page.locator('.comparison-steps a').last().click();await settle('#explore/pattern/measure?via=journey%2Ftransistor');
    await page.locator('.source-chapter').click();await page.locator('.article-headline').waitFor();
    assert.equal(await page.locator('.chapter-scenario-link').getAttribute('href'),'#explore/pattern/measure?via=journey%2Ftransistor');
    await page.reload();await page.locator('.article-headline').waitFor();await page.locator('.chapter-scenario-link').click();await settle('#explore/pattern/measure?via=journey%2Ftransistor');
    await page.locator('.related-link').first().click();await settle('#explore/quality/decision?via=pattern%2Fmeasure');
    assert.equal(await page.locator('.exploration-return a').getAttribute('href'),'#explore/pattern/measure');
    await page.locator('.signal-toggle').click();await page.locator('[data-signal-example="single"]').click();
    await page.locator('.signal-source').click();await page.locator('.article-headline').waitFor();await page.locator('.chapter-scenario-link').click();await settle('#explore/quality/decision?via=pattern%2Fmeasure');
    assert.match(await page.locator('.signal-preview').innerText(),/單點越界/);
    await page.locator('.practice-actions a[href^="#ch"]').click();await page.locator('.article-headline').waitFor();await page.locator('.chapter-scenario-link').click();await settle('#explore/quality/decision?via=pattern%2Fmeasure');
    await page.locator('.diagram-launch').click();assert.equal(await page.locator('.diagram-dialog').evaluate(el=>el.matches(':modal')),true);await page.keyboard.press('Escape');
    await page.goBack();await page.locator('.article-headline').waitFor();await page.goForward();await settle('#explore/quality/decision?via=pattern%2Fmeasure');
    for(const via of ['unknown/node','journey/unknown','pattern/expose','packaging/single','javascript:alert(1)','<svg onload=alert(1)>']){
      await open('#explore/pattern/expose?via='+encodeURIComponent(via));assert.equal(await page.locator('.exploration-return').count(),0);
      assert.equal(await page.locator('.source-chapter').getAttribute('href'),'#ch04?from=pattern%2Fexpose');
    }
    for(const size of [{width:1440,height:1000},{width:390,height:1000},{width:312,height:800},{width:768,height:500}]){
      await page.setViewportSize(size);await open(target);await page.locator('.explorer-toolbar [data-explorer-view="detail"]').click();
      await page.locator('.exploration-return a').focus();
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'頁面不可橫向溢位');
      assert.ok(await page.locator('.exploration-return a').evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=document.querySelector('.explorer-toolbar').getBoundingClientRect().bottom&&r.bottom<=innerHeight&&r.height>=44;}),'回程控制須可見且可操作');
      await page.screenshot({path:path.join(evidence,`1.7.0_探索回程_${size.width}.png`)});
      await page.keyboard.press('Enter');await settle(source);
    }
    console.log(`探索回程通過：${count}條來回、25節點保全、重新整理／新分頁／分享、同情境與教材回程、來源更新與無效參數、四尺寸及原圖例。`);
  }
  assert.deepEqual(errors,[]);
  }
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
