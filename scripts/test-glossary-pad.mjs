/** 第 8 章拋光墊術語回歸；只驗證 Pad 消歧與此章英文頁。 */
import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';

assert.ok(process.env.PLAYWRIGHT_PACKAGE, '必須指定 PLAYWRIGHT_PACKAGE');
assert.ok(process.env.PAD_EVIDENCE_DIR, '必須指定 PAD_EVIDENCE_DIR');
const root = fileURLToPath(new URL('../', import.meta.url));
const output = process.env.PAD_EVIDENCE_DIR;
await mkdir(output, { recursive: true });
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer(async (req, res) => {
  try {
    const relative = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
    const file = path.resolve(root, relative);
    if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
    res.setHeader('Content-Type', (types[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8');
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE);
let browser;
const results = [];
const check = (name, actual, expected) => {
  try { assert.deepEqual(actual, expected); results.push({ name, ok: true }); }
  catch { results.push({ name, ok: false, actual, expected }); }
};

try {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => localStorage.setItem('semi_preferred_lang', 'en'));
  await page.goto(`${base}/index.html#ch08`, { waitUntil: 'networkidle' });
  await page.locator('.article-body a.glossary-term').first().waitFor();
  const cases = [
    { name: '拋光墊與後續泛稱不連到焊墊', html: '<p>Polishing pad: a special pad on a rotating platen.</p>', expected: [] },
    { name: '大小寫、複數、連字號仍辨識拋光語境', html: '<p>POLISHING-PADS use slurry. Pad wear changes the rate.</p>', expected: [] },
    { name: '跨行內標記仍辨識完整詞組', html: '<p><strong>polishing</strong>\n pad and pad wear.</p>', expected: [] },
    { name: '混合語境保留完整 Bond Pad 連結', html: '<p>Polishing pad, pad wear, then Bond Pad connections.</p>', expected: ['Bond Pad'] },
    { name: '一般 Pad 縮寫功能保留', html: '<p>Pad connects the chip to a test probe.</p>', expected: ['Pad'] },
    { name: '完整 Bond Pad 功能保留', html: '<p>A Bond Pad is a metal contact.</p>', expected: ['Bond Pad'] },
    { name: '中文焊墊功能保留', lang: 'zh', html: '<p>polishing pad 與焊墊是不同物件。</p>', expected: ['焊墊'] }
  ];
  for (const item of cases) {
    const actual = await page.evaluate(async ({ html, lang }) => {
      const { linkGlossaryTerms } = await import('/glossary-links.js');
      const container = document.createElement('div');
      container.innerHTML = `${html}<svg><text>42.5 nm</text></svg><code>Pad 600 nm</code>`;
      const text = container.textContent;
      const svg = container.querySelector('svg').outerHTML;
      linkGlossaryTerms(container, lang || 'en');
      return {
        links: [...container.querySelectorAll('a[href="#glossary/bond-pad"]')].map(a => a.textContent),
        preserved: container.textContent === text && container.querySelector('svg').outerHTML === svg && !container.querySelector('svg a, code a')
      };
    }, item);
    check(item.name, actual.links, item.expected);
    check(`${item.name}：原文與圖上數字保全`, actual.preserved, true);
  }

  const chapter = await page.evaluate(() => {
    const article = document.querySelector('.article-body');
    const label = [...article.querySelectorAll('strong')].find(el => el.textContent === 'Polishing pad');
    return {
      title: document.querySelector('.article-headline').textContent,
      polishingLabel: label?.textContent,
      polishingHasLink: Boolean(label?.querySelector('a')),
      bondLinks: [...article.querySelectorAll('a[href="#glossary/bond-pad"]')].map(a => a.textContent),
      numbers: article.textContent.match(/\d+(?:\.\d+)?/g),
      svgs: [...article.querySelectorAll('svg')].map(svg => svg.outerHTML)
    };
  });
  check('第 8 章確實使用英文', chapter.title, 'Chapter 8: CMP — Polishing the Wafer Flat');
  check('實際 Polishing pad 標籤無焊墊連結', [chapter.polishingLabel, chapter.polishingHasLink], ['Polishing pad', false]);
  check('第 8 章不把其他泛稱 pad 改連焊墊', chapter.bondLinks, []);
  check('第 8 章無頁面執行錯誤', errors, []);
  const label = page.locator('.article-body strong').filter({ hasText: /^Polishing pad$/ });
  await label.scrollIntoViewIfNeeded();
  await label.locator('xpath=..').locator('xpath=..').screenshot({ path: path.join(output, 'ch08-polishing-pad.png') });
  const snapshot = { ...chapter, svgHashes: chapter.svgs.map(svg => createHash('sha256').update(svg).digest('hex')) };
  delete snapshot.svgs;
  await writeFile(path.join(output, 'ch08-snapshot.json'), JSON.stringify(snapshot, null, 2));
  await writeFile(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
  for (const result of results) console.log(`${result.ok ? 'PASS' : 'FAIL'} ${result.name}${result.ok ? '' : ': ' + JSON.stringify(result)}`);
  if (results.some(result => !result.ok)) process.exitCode = 1;
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
