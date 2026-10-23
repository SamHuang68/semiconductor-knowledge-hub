import assert from 'node:assert/strict';
import {isDeepStrictEqual} from 'node:util';
import http from 'node:http';
import path from 'node:path';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const mode=process.argv[2];
assert.ok(['排版','畫面'].includes(mode),'請指定排版或畫面模式');
assert.ok(process.env.HUB_EVIDENCE_DIR&&process.env.PLAYWRIGHT_PACKAGE,'須指定證據目錄與 Playwright 套件');
assert.ok(mode!=='排版'||process.env.HUB_BASELINE,'排版模式須提供原版交疊量測基準');
const root=fileURLToPath(new URL('../',import.meta.url));
const evidence=path.resolve(process.env.HUB_EVIDENCE_DIR);
const scopes=[['ch06','anomalies'],['ch09','megasonic'],['ch09','marangoni'],['ch13','dram'],['ch13','hbm'],['ch14','pitch'],['ch15','ellipsometry'],['ch18','ocap']];
const selected=process.argv.slice(3);
assert.ok(selected.every(key=>scopes.some(parts=>parts.join('/')===key)),'局部選擇必須屬於明列頁籤');
const runScopes=selected.length?scopes.filter(parts=>selected.includes(parts.join('/'))):scopes;
const compact=value=>String(value??'').replace(/\s+/g,'');
const report={模式:mode,結果:'未完成',開始時間:new Date().toISOString(),目前狀態:null,紀錄:[],操作:[],截圖:[],失敗:[],頁面錯誤:[],
  範圍:runScopes,限制:['僅指定頁籤；畫面模式只擷取 ch06 與 ch18，不重跑模型操作',
  '矩形交疊使用獨立 tspan／直接文字行；交集寬大於1.5、高大於2視框單位即完整記錄並要求零筆',
  '保留原始動畫，幾何及截圖仍須主控視讀；SVG非原生可聚焦控制以圖面區域持有鍵盤焦點，另驗證真實點擊改變模型']};
let server,browser,page,card,viewport,reader,baseline;
function check(ok,message,detail){if(!ok)report.失敗.push({狀態:{...report.目前狀態},項目:message,細節:detail});}
const equal=(a,b,message)=>check(isDeepStrictEqual(a,b),message,{實際:a,預期:b});
const cleanControls=items=>items.filter(c=>!Object.keys(c.data||{}).some(k=>['data-diagram-index','data-text-index','data-diagram-action'].includes(k)))
  .map(c=>({標籤:c.標籤,id:c.id,data:c.data,value:c.value}));

try{
  await mkdir(evidence,{recursive:true});
  if(mode==='排版')baseline=JSON.parse(await readFile(process.env.HUB_BASELINE,'utf8'));
  const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
  server=http.createServer(async(req,res)=>{
    try{const relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '')||'index.html';
      const file=path.resolve(root,relative);if(!file.startsWith(path.resolve(root)+path.sep)){res.writeHead(403);res.end();return;}
      res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream')+'; charset=utf-8');res.end(await readFile(file));
    }catch{res.writeHead(404);res.end();}
  });
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
  const base=`http://127.0.0.1:${server.address().port}/`;
  browser=await chromium.launch({channel:'msedge',headless:true});
  report.瀏覽器版本=browser.version();
  page=await browser.newPage({viewport:{width:1440,height:1000}});page.setDefaultTimeout(8000);
  page.on('pageerror',error=>report.頁面錯誤.push({狀態:{...report.目前狀態},訊息:error.message}));
  card=page.locator('.eng-obj-card');viewport=card.locator('.eng-obj-viewport');reader=card.locator('.eng-diagram-reader');
  const action=name=>card.locator(`[data-diagram-action="${name}"]`);
  const settle=()=>page.evaluate(async()=>{await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
  const controls=()=>card.evaluate(el=>[...el.querySelectorAll('button,input,select,textarea,[role="slider"],[role="tab"]')].map(c=>({標籤:c.tagName,id:c.id,data:Object.fromEntries([...c.attributes].filter(a=>a.name.startsWith('data-')).map(a=>[a.name,a.value])),value:'value'in c?c.value:null})));
  const open=async(chapter,tab,lang,width)=>{
    report.目前狀態={章節:chapter,頁籤:tab,語言:lang,寬度:width,操作:'初始'};
    await page.setViewportSize({width,height:1000});await page.goto('about:blank');await page.goto(base+'#'+chapter,{waitUntil:'domcontentloaded'});await card.waitFor();
    const desired=lang==='en'?'en':'zh-Hant';
    if(await page.locator('html').getAttribute('lang')!==desired)await page.locator(`.lang-btn[data-lang="${lang}"]`).click();
    await page.waitForFunction(value=>document.documentElement.lang===value,desired);
    await card.locator(`.eng-obj-tab[data-tab="${tab}"]`).click();await action('fit').click();await settle();
    assert.equal(await card.count(),1,'必須存在唯一工程圖卡');
  };
  // 原始 text 的順序用於保全與清單；幾何則逐 tspan／直接文字節點量測。
  const measure=()=>viewport.evaluate(container=>{
    const mat=m=>m?{a:m.a,b:m.b,c:m.c,d:m.d,e:m.e,f:m.f}:null;
    const project=(r,inverse)=>{const points=[[r.left,r.top],[r.right,r.top],[r.right,r.bottom],[r.left,r.bottom]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(inverse));const x=Math.min(...points.map(p=>p.x)),y=Math.min(...points.map(p=>p.y));return{x,y,width:Math.max(...points.map(p=>p.x))-x,height:Math.max(...points.map(p=>p.y))-y};};
    return [...container.querySelectorAll(':scope > svg')].map((svg,index)=>{
      const v=svg.viewBox.baseVal,screen=svg.getScreenCTM(),inverse=screen.inverse();
      const texts=[...svg.querySelectorAll('text')];const lines=[];
      texts.forEach((text,textIndex)=>{
        const spans=[...text.querySelectorAll('tspan')].filter(s=>!s.querySelector('tspan'));
        const targets=spans.length?[...spans,...[...text.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim())]:[text];
        targets.forEach((node,lineIndex)=>{
          const element=node.nodeType===Node.TEXT_NODE?text:node;
          let r;if(node.nodeType===Node.TEXT_NODE){const range=document.createRange();range.selectNodeContents(node);r=range.getBoundingClientRect();}else r=node.getBoundingClientRect();
          const style=getComputedStyle(element),m=element.getScreenCTM(),reasons=[];
          if(!r.width||!r.height)reasons.push('實際矩形為零');
          if(style.display==='none'||style.visibility==='hidden'||style.visibility==='collapse')reasons.push('計算樣式不可見');
          for(let p=element;p;p=p.parentElement){if(getComputedStyle(p).display==='none'||Number(getComputedStyle(p).opacity)===0)reasons.push('自身或父層隱藏');if(p===svg)break;}
          const box=project(r,inverse);
          let group=text.parentElement;while(group&&group.parentElement!==svg)group=group.parentElement;
          let column=null;
          if(group?.tagName.toLowerCase()==='g'){const gbox=project(r,group.getScreenCTM().inverse());column={transform:group.getAttribute('transform'),矩形:gbox};}
          lines.push({文字索引:textIndex,行索引:lineIndex,文字:node.textContent,矩形:box,畫面矩形:{x:r.x,y:r.y,width:r.width,height:r.height},CTM:mat(m),字級:parseFloat(style.fontSize),畫面字級:parseFloat(style.fontSize)*Math.min(Math.hypot(m.a,m.b),Math.hypot(m.c,m.d)),父欄:column,排除原因:[...new Set(reasons)],出界:box.x<v.x-.5||box.y<v.y-.5||box.x+box.width>v.x+v.width+.5||box.y+box.height>v.y+v.height+.5});
        });
      });
      const pairs=[];for(let i=0;i<lines.length;i++)for(let j=i+1;j<lines.length;j++){
        const a=lines[i],b=lines[j];if(a.排除原因.length||b.排除原因.length)continue;
        const width=Math.min(a.矩形.x+a.矩形.width,b.矩形.x+b.矩形.width)-Math.max(a.矩形.x,b.矩形.x);
        const height=Math.min(a.矩形.y+a.矩形.height,b.矩形.y+b.矩形.height)-Math.max(a.矩形.y,b.矩形.y);
        if(width>1.5&&height>2)pairs.push({第一行:i,第二行:j,第一文字:a.文字,第二文字:b.文字,寬:width,高:height,面積:width*height,占較小矩形比例:width*height/Math.min(a.矩形.width*a.矩形.height,b.矩形.width*b.矩形.height)});
      }
      const metals=[...svg.querySelectorAll('rect[fill="#10b981"][opacity="0.8"]')].map(el=>({矩形:project(el.getBoundingClientRect(),inverse)}));
      const panels=[...svg.querySelectorAll('rect[fill="#0f172a"][width="230"][height="210"]')].map(el=>project(el.getBoundingClientRect(),inverse));
      const ocap=[...svg.querySelectorAll('.ocap-sim-btn')].map(el=>({狀態:el.dataset.sim,填色:el.getAttribute('fill'),矩形:project(el.getBoundingClientRect(),inverse)}));
      const framePairs=[];for(let i=0;i<ocap.length;i++)for(let j=i+1;j<ocap.length;j++){const a=ocap[i].矩形,b=ocap[j].矩形,w=Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x),h=Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y);if(w>0&&h>0)framePairs.push({第一:i,第二:j,寬:w,高:h});}
      const scrap=svg.querySelector('rect[width="130"][y="150"]');
      const prevention=texts.find(t=>t.textContent.includes('閉環防再發對策'))?.parentElement.querySelector('rect');
      const workflow= scrap&&prevention ? [scrap,prevention].map(n=>project(n.getBoundingClientRect(),inverse)) : [];
      const wave=svg.querySelector('.anim-acoustic')?.parentElement;
      const waveLabel=wave?.querySelector(':scope > text');
      const waveGap=waveLabel?project(waveLabel.getBoundingClientRect(),wave.getScreenCTM().inverse()).y-Math.max(...[...wave.querySelectorAll('.anim-acoustic line')].map(l=>Number(l.getAttribute('y1'))))-6:null;
      return {索引:index,文字:texts.map(t=>t.textContent),行:lines,交疊:pairs,SVG:svg.outerHTML,視框:{x:v.x,y:v.y,width:v.width,height:v.height},金屬矩形:metals,右側看板:panels,OCAP控制框:ocap,OCAP框交疊:framePairs,處置與防再發框:workflow,聲波極值至說明間隔:waveGap};
    });
  });
  const snapshot=async(label,readable=false)=>{
    await settle();const diagrams=await measure();const record={狀態:{...report.目前狀態},階段:label,圖:diagrams};report.紀錄.push(record);
    check(diagrams.length>0,'量測必須包含實際SVG');
    const expected=diagrams.flatMap(d=>d.文字.map(compact));
    equal(await reader.locator('.eng-diagram-text-list li').evaluateAll(nodes=>nodes.map(el=>el.textContent.replace(/\s+/g,''))),expected,'文字清單逐項同步');
    for(const d of diagrams){
      check(d.交疊.length===0,'所有可見文字行交疊為零',{圖:d.索引,pairs:d.交疊});
      const visible=d.行.filter(t=>!t.排除原因.length);
      check(visible.every(t=>!t.出界),'所有可見文字行均在SVG內',visible.filter(t=>t.出界));
      if(readable)check(visible.every(t=>t.畫面字級>=15.95),'閱讀比例最小字級至少約16px',visible.filter(t=>t.畫面字級<15.95));
      if(report.目前狀態.頁籤==='megasonic')check(d.聲波極值至說明間隔>=4,'聲波整個正負6單位動畫範圍不掃過說明文字',d.聲波極值至說明間隔);
      if(report.目前狀態.章節==='ch06'){
        const labels=visible.filter(t=>/^translate\(\s*(60|240|420|600)[ ,]+70\s*\)$/.test(t.父欄?.transform||''));
        check(new Set(labels.map(t=>t.父欄.transform)).size===4,'ch06必須量到四個標籤欄');
        check(labels.every(t=>t.父欄.矩形.x>=-20.5&&t.父欄.矩形.x+t.父欄.矩形.width<=160.5),'ch06每個標籤限於自身180單位寬欄',labels);
      }
      if(report.目前狀態.章節==='ch14'){
        check(d.金屬矩形.length===3,'ch14必須量到三條金屬矩形',d.金屬矩形);
        check(d.金屬矩形.every(({矩形:b})=>b.x>=d.視框.x-.5&&b.y>=d.視框.y-.5&&b.x+b.width<=d.視框.x+d.視框.width+.5&&b.y+b.height<=d.視框.y+d.視框.height+.5),'ch14三條金屬矩形不可超出SVG',d.金屬矩形);
        check(d.右側看板.length===1,'ch14右側看板必須可識別',d.右側看板);
        check(d.金屬矩形.every(({矩形:a})=>d.右側看板.every(b=>a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y)),'ch14金屬矩形不得侵入右側看板',{金屬:d.金屬矩形,看板:d.右側看板});
      }
      if(report.目前狀態.章節==='ch18'){
        check(d.OCAP控制框.length===4,'ch18四個控制框存在');check(d.OCAP框交疊.length===0,'ch18控制框不得相互交疊',d.OCAP框交疊);
        check(d.處置與防再發框.length===2,'ch18報廢與防再發框均存在');
        const [a,b]=d.處置與防再發框;if(a&&b)check(b.y-(a.y+a.height)>=19.5,'ch18報廢與防再發框保留20單位間隔',d.處置與防再發框);
      }
    }
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'頁面沒有水平溢位');
    return diagrams;
  };
  const fit=async()=>{
    await action('fit').click();await settle();
    await page.waitForFunction(()=>{const e=document.querySelector('.eng-obj-viewport');return e?.dataset.view==='fit'&&e.scrollWidth<=e.clientWidth+1&&e.scrollHeight<=e.clientHeight+1;},null,{timeout:1500});
    const size=await viewport.evaluate(el=>({view:el.dataset.view,w:el.clientWidth,h:el.clientHeight,sw:el.scrollWidth,sh:el.scrollHeight}));
    check(size.view==='fit'&&size.sw<=size.w+1&&size.sh<=size.h+1,'可返回fit且全圖納入視窗',size);
  };
  const read=async()=>{
    const before=cleanControls(await controls());await action('read').click();await settle();
    equal(await viewport.getAttribute('data-view'),'read','閱讀模式生效');await snapshot('閱讀比例',true);
    await viewport.focus();await page.keyboard.press('Home');await settle();
    const beforeScroll=await viewport.evaluate(el=>({x:el.scrollLeft,y:el.scrollTop,w:el.clientWidth,h:el.clientHeight,sw:el.scrollWidth,sh:el.scrollHeight}));
    await page.keyboard.press('End');await settle();
    const after=await viewport.evaluate(el=>({x:el.scrollLeft,y:el.scrollTop,focus:document.activeElement===el}));
    check(after.focus,'圖面捲動保留焦點');
    if(beforeScroll.sw>beforeScroll.w+1||beforeScroll.sh>beforeScroll.h+1)check(after.x>beforeScroll.x||after.y>beforeScroll.y,'閱讀比例可實際捲動',{beforeScroll,after});
    report.操作.push({狀態:{...report.目前狀態},項目:'閱讀捲動',beforeScroll,after});
    await page.keyboard.press('Home');equal(cleanControls(await controls()),before,'閱讀操作不改模型控制值');
  };
  const captures=async()=>{
    const s=report.目前狀態,prefix=`${s.語言}_${s.章節}_${s.頁籤}_${s.寬度}`;
    await fit();await viewport.screenshot({path:path.join(evidence,prefix+'_全圖.png'),animations:'allow'});
    await action('read').click();await settle();await viewport.screenshot({path:path.join(evidence,prefix+'_圖面.png'),animations:'allow'});
    await action('text').click();await settle();
    check(await reader.evaluate(el=>el.open&&document.activeElement===el.querySelector('summary')),'文字入口展開清單並移動焦點');
    await reader.screenshot({path:path.join(evidence,prefix+'_文字.png'),animations:'allow'});
    report.截圖.push({狀態:{...s},檔案:[prefix+'_圖面.png',prefix+'_文字.png']});
  };
  const setRange=async(id,value)=>{
    const input=card.locator(`input[id="${id}"]`);const spec=await input.evaluate(el=>({min:Number(el.min),max:Number(el.max),step:Number(el.step)||1}));
    await input.focus();const before=Number(await input.inputValue());
    // 先走相反端點，保證所測操作具有實際數值變更。
    await page.keyboard.press(value===spec.max?'Home':'End');await settle();const opposite=Number(await input.inputValue());
    if(value===spec.min)await page.keyboard.press('Home');
    else if(value===spec.max)await page.keyboard.press('End');
    else {await page.keyboard.press('Home');for(let i=0;i<Math.round((value-spec.min)/spec.step);i++)await page.keyboard.press('ArrowRight');}
    await settle();const actual=Number(await input.inputValue());
    check(Math.abs(actual-value)<1e-6&&actual!==opposite,'滑桿實際到達目標且值已改變',{id,value,actual,opposite});
    check(await input.evaluate(el=>document.activeElement===el),'滑桿重繪保留焦點',id);
    report.操作.push({狀態:{...report.目前狀態},項目:'滑桿',id,before,value,actual});
  };
  const svgClick=async(selector)=>{
    await viewport.focus();const target=card.locator(selector);await target.scrollIntoViewIfNeeded();
    const point=await target.evaluate(el=>{const r=el.getBoundingClientRect();for(const [u,v] of [[.5,.5],[.5,.12],[.5,.88],[.1,.5],[.9,.5]]){const x=r.left+r.width*u,y=r.top+r.height*v,hit=document.elementFromPoint(x,y);if(hit&&(hit===el||el.contains(hit)))return{x,y};}return null;});
    assert.ok(point,'SVG控制項沒有可由滑鼠命中的位置');await page.mouse.click(point.x,point.y);await settle();
    check(await viewport.evaluate(el=>document.activeElement===el)||await target.evaluate(el=>document.activeElement===el),'SVG控制操作保留圖面或控制項焦點');
  };
  for(const width of [1440,390])for(const lang of ['zh','en'])for(const [chapter,tab] of(mode==='畫面'?[scopes[0],scopes[7]]:runScopes)){
    await open(chapter,tab,lang,width);
    const startFailures=report.失敗.length;
    const initial=await snapshot('初始fit');const initialControls=cleanControls(await controls());
    if(mode==='排版'&&lang==='zh'){
      const old=baseline.狀態.find(s=>s.章節===chapter&&(s.頁籤?.data?.['data-tab']===tab||s.頁籤===`[data-tab="${tab}"]`));
      assert.ok(old,`缺少原版基準：${chapter}/${tab}`);const b=old[width===1440?'桌面':'手機'];
      equal(initial.map(d=>d.文字.map(compact)),b.SVG.map(d=>d.文字.map(t=>compact(t.文字))),'原版文字逐node保全');
      equal(initialControls,cleanControls(b.控制項),'原版控制項id/data/value保全');
    }
    await read();
    if(lang==='zh'||chapter==='ch06'||mode==='畫面')await captures();
    await fit();equal(cleanControls(await controls()),initialControls,'fit返回後控制項保全');
    equal((await measure()).map(d=>d.文字.map(compact)),initial.map(d=>d.文字.map(compact)),'中英文閱讀切換不改原字串');
    if(mode==='排版'){
      if(chapter==='ch09'){
        const ranges=await card.locator('input[type="range"]').evaluateAll(nodes=>nodes.map(el=>({id:el.id,min:Number(el.min),max:Number(el.max),step:Number(el.step)||1})));
        if(tab==='megasonic')check(ranges.length===2,'megasonic兩個滑桿存在');
        report.操作.push({狀態:{...report.目前狀態},項目:'實際range清冊',ranges});
        for(const range of ranges)for(const value of[range.min,range.max,range.min+Math.round((range.max-range.min)/range.step/2)*range.step]){
          await open(chapter,tab,lang,width);report.目前狀態.操作=`${range.id}=${value}`;await setRange(range.id,value);await snapshot('滑桿fit');await read();await fit();
        }
      }
      if(chapter==='ch13'&&tab==='dram')for(const ar of[35,75])for(const temp of[25,105]){
        await open(chapter,tab,lang,width);report.目前狀態.操作=`AR=${ar},溫度=${temp}`;
        await setRange('ch13ArSlider',ar);await setRange('ch13TempSlider',temp);await snapshot('DRAM四角fit');await read();await fit();
      }
      if(chapter==='ch14'||chapter==='ch18'){
        const attr=chapter==='ch14'?'data-node':'data-sim',cls=chapter==='ch14'?'.node-btn':'.ocap-sim-btn';
        const values=chapter==='ch14'?['n28','n7','n3','a16']:['normal','ooc','hold','disposed'];
        equal(await card.locator(`${cls}[${attr}]`).evaluateAll((nodes,a)=>nodes.map(n=>n.getAttribute(a)),attr),values,'四種SVG模型控制完整存在');
        for(const value of values){
          await fit();await svgClick(`${cls}[${attr}="${values.find(v=>v!==value)}"]`);
          const before=await viewport.locator('svg').first().innerHTML();await svgClick(`${cls}[${attr}="${value}"]`);
          check(await viewport.locator('svg').first().innerHTML()!==before,'真實點擊使SVG模型狀態變更',{value});
          report.目前狀態.操作=`${attr}=${value}`;await snapshot('SVG控制fit');
          if(chapter==='ch14')check(await card.evaluate(el=>{const c=el.getBoundingClientRect();return [...el.querySelectorAll('.eng-obj-viewport rect[fill="#10b981"][opacity="0.8"]')].every(r=>{const b=r.getBoundingClientRect();return b.left>=c.left-.5&&b.right<=c.right+.5&&b.top>=c.top-.5&&b.bottom<=c.bottom+.5;});}),'ch14三條金屬矩形不得超出fit圖卡');
          await read();await fit();
        }
      }
    }
    if(report.失敗.length>startFailures){const name=`失敗_${lang}_${chapter}_${tab}_${width}.png`;await page.screenshot({path:path.join(evidence,name)});report.截圖.push({狀態:{...report.目前狀態},失敗畫面:name});}
  }
  check(report.頁面錯誤.length===0,'頁面沒有執行錯誤',report.頁面錯誤);
  assert.equal(report.失敗.length,0,`有${report.失敗.length}項排版或保全失敗`);report.結果='通過';
}catch(error){report.結果='失敗';report.原因=error.message;process.exitCode=1;if(page)try{await page.screenshot({path:path.join(evidence,`失敗_${mode}.png`)});}catch{report.擷取限制='無法取得失敗截圖';}}
finally{
  try{await browser?.close();}catch(error){report.關閉錯誤=error.message;process.exitCode=1;}
  if(server?.listening)await new Promise(resolve=>server.close(resolve));report.完成時間=new Date().toISOString();
  await mkdir(evidence,{recursive:true});const output=path.join(evidence,`圖例排版_${mode}.json`);await writeFile(output,JSON.stringify(report,null,2)+'\n','utf8');
  console.log(JSON.stringify({模式:mode,結果:report.結果,量測紀錄數:report.紀錄.length,失敗數:report.失敗.length,原因:report.原因,證據:output}));
}
