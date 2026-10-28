import assert from 'node:assert/strict';
import { replaceFigureComments } from '../chapter-figures.js';
import { chapter as ch04 } from '../data/chapters/ch04.js';
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

console.log('[PASS] 第 18、23、24 章補上無數字的結構圖，圖說與既有章節圖一致');
