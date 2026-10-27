import assert from 'node:assert/strict';
import { chapterNavTarget, chapterPagerHtml } from '../route-chrome.js';

const pager = chapterPagerHtml({
  isEn: false,
  prev: { id: 'ch03', title: '從沙子到晶圓' },
  next: { id: 'ch05', title: '薄膜 "如何" 鋪上 <材料>' },
  compact: false
});

for (const id of ['ch03', 'ch05']) {
  assert.match(pager, new RegExp(`href="#${id}" data-nav-target="${id}"`), `${id} 的上一章／下一章必須同時有 href 與 data-nav-target`);
}
assert.doesNotMatch(pager, /#null|data-nav-target="null"|data-nav-target=""/, '分頁卡不得導向 #null');
assert.match(pager, /薄膜 &quot;如何&quot; 鋪上 &lt;材料&gt;/, '標題裡的引號與角括號必須跳脫，且不能吃掉目標屬性');

const top = chapterPagerHtml({
  isEn: true,
  prev: null,
  next: { id: 'ch01', title: 'How a Fab Works' },
  compact: true
});
assert.match(top, /href="#ch01" data-nav-target="ch01"/);
assert.doesNotMatch(top, /Previous chapter/, '沒有上一章時不應畫出空卡');

assert.equal(chapterNavTarget('#ch05', 'ch05'), 'ch05');
assert.equal(chapterNavTarget('#ch05', null), 'ch05', '只有 href 時也必須走到章節，而不是 #null');
assert.equal(chapterNavTarget('#ch05', ''), 'ch05');
assert.equal(chapterNavTarget('#ch05', 'null'), 'ch05', '字面 null 不得當成章節 id');
assert.equal(chapterNavTarget('', null), '', '沒有目標時不得寫入 hash');

console.log('[PASS] 上一章／下一章卡片的 href 與 data-nav-target 對到章節，不會導向 #null');
