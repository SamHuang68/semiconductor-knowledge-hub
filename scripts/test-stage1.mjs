/** Stage 1：首頁與 ch04 樣板的內容保全與最小操作回歸。 */
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
const [base, evidence] = process.argv.slice(2);
const before = JSON.parse(await readFile(path.join(evidence, 'baseline/snapshots.json'), 'utf8'));
const after = JSON.parse(await readFile(path.join(evidence, 'fixed/snapshots.json'), 'utf8'));
const results = [];
function check(name, actual, expected = true) {
  try { assert.deepEqual(actual, expected); results.push({ name, ok: true }); }
  catch (error) { results.push({ name, ok: false, detail: error.message }); }
}
for (const current of after) {
  const original = before.find(record => record.name === current.name);
  check(`${current.name}：無橫向溢出`, current.overflow, false);
  check(`${current.name}：無頁面錯誤`, current.errors, []);
  if (current.route === 'home') {
    check(`${current.name}：既有入口與文字保留`, current.homeLinks.map(link => `${link.href}|${link.text}`).sort(), original.homeLinks.map(link => `${link.href}|${link.text}`).sort());
    check(`${current.name}：12站名稱順序保留`, current.flow.map(item => item.text), original.flow.map(item => item.text));
  } else {
    check(`${current.name}：教材段落與表格保留`, current.paragraphs, original.paragraphs);
    check(`${current.name}：來源連結保留`, current.sourceLinks, original.sourceLinks);
    check(`${current.name}：標題前置`, current.boxes['.article-header'].y < original.boxes['.article-header'].y);
    check(`${current.name}：閱讀工具不浮蓋`, current.boxes['.app-toc'].position, 'static');
    if (current.size === 'desktop') check(`${current.name}：主圖可讀寬度增加`, current.boxes['.eng-obj-viewport'].width > original.boxes['.eng-obj-viewport'].width * 1.5);
  }
}

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const [lang, viewport] of [['en', {width:1440,height:1000}], ['zh', {width:390,height:844}]]) {
    const context = await browser.newContext({ viewport, reducedMotion:'reduce' });
    await context.addInitScript(lang => localStorage.setItem('semi_preferred_lang',lang),lang);
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/#home`, {waitUntil:'networkidle'});
    const stations = page.locator('#home-fab-flow .fab-station');
    check(`${lang}：首頁站數`,await stations.count(),12);
    check(`${lang}：流程在部別目錄之前`,await page.evaluate(()=>document.querySelector('#home-fab-flow').compareDocumentPosition(document.querySelector('#homePartsTitle')) & Node.DOCUMENT_POSITION_FOLLOWING ? true : false));
    await stations.first().focus();
    await page.keyboard.press('End');
    check(`${lang}：End移到最後站`,await stations.last().getAttribute('aria-pressed'),'true');
    await page.keyboard.press('Home');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    check(`${lang}：方向鍵選取微影站`,await stations.nth(2).getAttribute('aria-pressed'),'true');
    check(`${lang}：單一選取與鍵盤入口`,await page.locator('#home-fab-flow [aria-pressed="true"][tabindex="0"]').count(),1);
    const readLink = page.locator('#fabFlowDetail a');
    check(`${lang}：閱讀連到ch04`,await readLink.getAttribute('href'),'#ch04');
    await readLink.click();
    await page.locator('.eng-obj-card').waitFor();
    check(`${lang}：標題與要點位於正文之前`,await page.evaluate(()=>{
      const title=document.querySelector('.article-header'), points=document.querySelector('.chapter-key-takeaways'), article=document.querySelector('.article-body');
      return Boolean(title.compareDocumentPosition(points)&Node.DOCUMENT_POSITION_FOLLOWING) && Boolean(points.compareDocumentPosition(article)&Node.DOCUMENT_POSITION_FOLLOWING);
    }));
    check(`${lang}：原本五項要點保留`,await page.locator('.chapter-key-takeaways ol > li').count(),5);
    await page.locator('.chapter-key-takeaways .anchor-link').click();
    check(`${lang}：前置重點錨點保留章節路由`,new URL(page.url()).hash,'#ch04');
    check(`${lang}：旅程只呈現一次`,await page.locator('.wafer-track-banner,.callout-wafer-pos').count(),1);
    check(`${lang}：頁首頁尾章節導覽保留`,await page.locator('.chapter-pagination').evaluateAll(nodes=>nodes.map(node=>[...node.querySelectorAll('a')].map(a=>a.getAttribute('href')))),[['#ch03','#ch05'],['#ch03','#ch05']]);
    const toc=page.locator('#tocDrawerToggle');
    await toc.focus(); await page.keyboard.press('Enter');
    check(`${lang}：目錄展開並聚焦連結`,await page.evaluate(()=>document.querySelector('#tocDrawerToggle').getAttribute('aria-expanded')==='true'&&document.activeElement.matches('#tocList a')));
    await toc.click();
    check(`${lang}：目錄收合且保留焦點`,await page.evaluate(()=>document.querySelector('#tocDrawerToggle').getAttribute('aria-expanded')==='false'&&document.activeElement.id==='tocDrawerToggle'));
    const fontBefore=await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--article-font-size'));
    const pointsFontBefore=await page.locator('.chapter-key-takeaways ol').evaluate(node=>parseFloat(getComputedStyle(node).fontSize));
    await page.locator('#fontSizeIncBtn').click();
    check(`${lang}：字級可調整`,await page.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--article-font-size'))),parseFloat(fontBefore)+1);
    // 字級設定與瀏覽器樣式重算分開；等實際文字完成更新，仍要求完整 +1px。
    await page.waitForFunction(size=>parseFloat(getComputedStyle(document.querySelector('.chapter-key-takeaways ol')).fontSize)===size,pointsFontBefore+1,{timeout:1500});
    check(`${lang}：重點實際文字跟隨字級工具`,await page.locator('.chapter-key-takeaways ol').evaluate(node=>parseFloat(getComputedStyle(node).fontSize)),pointsFontBefore+1);
    await page.locator('#fontSizeResetBtn').click();
    const card=page.locator('.eng-obj-card');
    const labels=await card.locator('.eng-diagram-text-list button').allTextContents();
    const original=before.find(record=>record.route==='ch04'&&record.lang===lang&&record.size===(lang==='en'?'desktop':'mobile'));
    check(`${lang}：模型初始文字與數值保留`,labels,original.controls.slice(-labels.length).map(item=>item.text));
    await card.locator('[data-diagram-action="read"]').click();
    check(`${lang}：閱讀比例可切換`,await card.locator('.eng-obj-viewport').getAttribute('data-view'),'read');
    await card.locator('[data-diagram-action="fit"]').click();
    check(`${lang}：可返回完整圖面`,await card.locator('.eng-obj-viewport').getAttribute('data-view'),'fit');
    await card.locator('[data-action="fullscreen"]').focus(); await page.keyboard.press('Enter');
    await page.locator('.eng-obj-dialog[open]').waitFor();
    await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
    check(`${lang}：全螢幕焦點留在對話框`,await page.evaluate(()=>Boolean(document.activeElement.closest('.eng-obj-dialog[open]'))));
    await page.keyboard.press('Escape');
    check(`${lang}：退出全螢幕恢復圖面與焦點`,await page.evaluate(()=>!document.querySelector('.eng-obj-dialog[open]')&&document.activeElement.dataset.action==='fullscreen'&&Boolean(document.querySelector('.article-body .eng-obj-card'))));
    for(const mode of ['schematic','photo','overlay','split']) {
      await card.locator(`[data-view-mode="${mode}"]`).click();
      check(`${lang}：${mode}檢視保留`,await card.locator(`.eng-obj-stage.is-view-${mode}`).count(),1);
    }
    await card.locator('.btn-open-lightbox').click();
    await page.locator('.photo-lightbox-modal[open]').waitFor();
    await page.locator('.lb-btn-zoom-in').click();
    await page.keyboard.press('Escape');
    check(`${lang}：照片放大關閉並返回焦點`,await page.evaluate(()=>!document.querySelector('.photo-lightbox-modal[open]')&&document.activeElement.classList.contains('btn-open-lightbox')));
    if(lang==='en') check('英文樣板圖面工具不混入中文',await card.locator('.eng-diagram-toolbar,.eng-diagram-help,.eng-diagram-reader > summary,.eng-obj-boundary').evaluateAll(nodes=>nodes.every(node=>!/[\u3400-\u9fff]/.test(node.textContent))));
    await page.locator('.chapter-reading-tools a[href="#ch03"]').click();
    await page.waitForFunction(()=>document.querySelector('.engineering-object-mount')?.dataset.chId==='ch03');
    check(`${lang}：離開ch04時復原共用工具位置`,await page.evaluate(()=>!document.body.classList.contains('is-chapter-sample')&&document.querySelector('.main-canvas').nextElementSibling?.classList.contains('app-toc')));
    await page.goBack();
    await page.waitForFunction(()=>document.querySelector('.engineering-object-mount')?.dataset.chId==='ch04');
    check(`${lang}：返回ch04仍可使用閱讀工具`,await page.locator('.chapter-reading-tools .app-toc').count(),1);
    const nextLang=lang==='en'?'zh':'en';
    await page.locator(`.lang-btn[data-lang="${nextLang}"]`).click();
    await page.waitForFunction(nextLang=>document.querySelector('.engineering-object-mount')?.dataset.lang===nextLang,nextLang);
    await page.locator('.eng-obj-card').waitFor();
    check(`${lang}：語言切換後樣板仍存在`,await page.locator('.chapter-key-takeaways ol > li').count(),5);
    await page.locator('.route-crumb a[href="#home"]').click();
    await stations.first().waitFor();
    check(`${lang}：返回首頁不殘留樣板工具位置`,await page.evaluate(()=>!document.body.classList.contains('is-chapter-sample')&&!document.querySelector('.chapter-reading-tools .app-toc')));
    check(`${lang}：操作無頁面錯誤`,errors,[]);
    await context.close();
  }
} finally {
  await browser.close();
  await mkdir(evidence,{recursive:true});
  await writeFile(path.join(evidence,'interaction-results.json'),JSON.stringify(results,null,2));
  const failed=results.filter(result=>!result.ok);
  console.log(JSON.stringify({checks:results.length,failed:failed.length,failures:failed},null,2));
  if(failed.length) process.exitCode=1;
}
