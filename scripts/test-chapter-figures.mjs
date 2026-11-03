import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { dieHits, replaceFigureComments } from '../chapter-figures.js';
import { chapter as ch04 } from '../data/chapters/ch04.js';
import { chapter as ch10 } from '../data/chapters/ch10.js';
import { chapter as ch11 } from '../data/chapters/ch11.js';
import { chapter as ch18 } from '../data/chapters/ch18.js';
import { chapter as ch23 } from '../data/chapters/ch23.js';
import { chapter as ch24 } from '../data/chapters/ch24.js';

const badgeZh = '示意 · 未按比例';
const sourceZh = '沒有量測值。名稱取自本章，不另編數字。';
const badgeEn = 'Schematic · not to scale';
const sourceEn = 'No measured values. Names come from this chapter. No added numbers.';

function texts(html) {
  return [...html.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(match => match[1]);
}

for (const chapter of [ch18, ch23, ch24]) {
  const zh = replaceFigureComments(chapter.contentHtml, chapter.id);
  const en = replaceFigureComments(chapter.contentHtmlEn, chapter.id);
  assert.equal((zh.match(/class="chapter-figure"/g) || []).length, 1, `${chapter.id} 中文要有一張補圖`);
  assert.equal((en.match(/class="chapter-figure"/g) || []).length, 1, `${chapter.id} 英文要有一張補圖`);
  assert.ok(zh.includes(badgeZh) && zh.includes(sourceZh), `${chapter.id} 中文圖說要標示意、未按比例、沒有量測值`);
  assert.ok(en.includes(badgeEn) && en.includes(sourceEn), `${chapter.id} 英文圖說要標 schematic、not to scale、no measured values`);
  assert.ok(zh.indexOf('chapter-figure') < zh.indexOf('</h2>'), `${chapter.id} 的補圖要放在第一個小標之前`);
  for (const label of texts(zh + en)) {
    assert.doesNotMatch(label, /\d/, `${chapter.id} 的圖內文字不得帶數字：${label}`);
  }
}

const litho = replaceFigureComments(ch04.contentHtml, 'ch04');
assert.ok(litho.includes('光阻開口時，下方薄膜仍在'), '第 4 章既有微影圖要保留');
assert.ok(litho.includes(badgeZh) && litho.includes(sourceZh), '既有章節圖改用同一套圖說');
assert.equal((litho.match(/異常之後/g) || []).length, 0, '已有圖的章節不應再插入第 18 章的補圖');

const plain = replaceFigureComments('<p class="semi-p">沒有圖。</p>', 'ch18');
assert.ok(plain.includes('class="chapter-figure"'), '沒有標題時補圖仍要出現');

// 2.14.0：圖說比對順序曾讓含「晶粒」的中文圖說全被畫成「晶圓→晶粒→晶片」。
// 同一章中英文圖說描述同一張圖，畫出的圖種必須一致；並抽查幾張圖要畫成對的圖。
const keys = html => [...html.matchAll(/<figure class="chapter-figure" data-figure="(\w+)"/g)].map(m => m[1]);
const expected = { ch00: ['life', 'waferDieChip'], ch10: ['metalStack', 'damascene'], ch11: ['feol'], ch15: ['inspect'], ch16: ['yieldMap'], ch17: ['spc'], ch19: ['cp'], ch20: ['wirebond', 'flipchip'] };
for (const file of readdirSync(new URL('../data/chapters/', import.meta.url)).filter(f => f.endsWith('.js'))) {
  const { chapter } = await import(new URL(`../data/chapters/${file}`, import.meta.url));
  const zh = keys(replaceFigureComments(chapter.contentHtml, chapter.id));
  const en = keys(replaceFigureComments(chapter.contentHtmlEn, chapter.id));
  assert.deepEqual(zh, en, `${chapter.id} 中英文章節圖的圖種要一致`);
  if (expected[chapter.id]) assert.deepEqual(zh, expected[chapter.id], `${chapter.id} 章節圖要畫成 ${expected[chapter.id].join('、')}`);
}

// 同一組缺陷點下，大晶粒被打中的比例要明顯高於小晶粒（正文：大晶粒的良率會比小晶粒低很多）
const ratio = dies => dies.filter(d => d.hit).length / dies.length;
assert.ok(ratio(dieHits(40)) > 2 * ratio(dieHits(20)), '良率圖：大晶粒被打中的比例要明顯較高');

// 2.19.0：雙大馬士革由五個方框改畫成七步剖面，步驟沿用正文的七個步驟，中英都要畫齊
const damascene = html => texts(html.match(/<figure class="chapter-figure" data-figure="damascene">[\s\S]*?<\/figure>/)?.[0] || '').join('');
const zhSteps = damascene(replaceFigureComments(ch10.contentHtml, 'ch10'));
for (const step of ['鋪絕緣層', '挖出導通孔', '和溝槽', '鋪阻障層', '與晶種層', '電鍍銅', '退火', '銅 CMP', '鋪覆蓋層']) assert.ok(zhSteps.includes(step), `雙大馬士革中文圖缺少步驟：${step}`);
const enSteps = damascene(replaceFigureComments(ch10.contentHtmlEn, 'ch10'));
for (const step of ['Deposit', 'Etch vias', 'Barrier and', 'Copper', 'Anneal', 'Copper CMP', 'Cap layer']) assert.ok(enSteps.includes(step), `雙大馬士革英文圖缺少步驟：${step}`);

// 2.20.0：FEOL 由六個方框改畫成七步剖面（補上正文的淺摻雜）；左右配置與第 2 章圖相同：NMOS／P 井在左、PMOS／N 井在右
const feolFigure = html => html.match(/<figure class="chapter-figure" data-figure="feol">[\s\S]*?<\/figure>/)?.[0] || '';
const xOf = (html, label) => Number(html.match(new RegExp(`<text x="([\\d.]+)"[^>]*>${label}</text>`))?.[1]);
for (const [html, steps, wells] of [
  [feolFigure(replaceFigureComments(ch11.contentHtml, 'ch11')), ['隔離', '做出井', '做閘極', '淺摻雜', '側壁間隔物', '源極與汲極', '金屬矽化物'], ['P 井', 'N 井']],
  [feolFigure(replaceFigureComments(ch11.contentHtmlEn, 'ch11')), ['Isolation', 'Wells', 'Gate', 'Light doping', 'Sidewall spacers', 'Source and drain', 'Silicide'], ['P-well', 'N-well']]
]) {
  const shown = texts(html).join('');
  for (const step of steps) assert.ok(shown.includes(step), `FEOL 圖缺少步驟：${step}`);
  assert.ok(xOf(html, 'NMOS') < xOf(html, 'PMOS'), 'FEOL 圖的 NMOS 要在左、PMOS 在右');
  assert.ok(xOf(html, wells[0]) < xOf(html, wells[1]), 'FEOL 圖的 P 井要在左、N 井在右');
}

console.log('[PASS] 第 18、23、24 章補上無數字的結構圖，圖說與既有章節圖一致；中英圖種一致，良率圖比例正確');
