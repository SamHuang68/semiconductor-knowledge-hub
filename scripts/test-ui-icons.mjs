import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ICON_NAMES, icon } from '../icons.js';
import { CHAPTER_ICONS, PART_ICONS, STATION_ICONS, SCENARIO_ICONS, SCENARIO_NODE_ICONS } from '../data/icon-map.js';
import { CHAPTER_CATALOG } from '../data/chapters-data.js';
import { FAB_FLOW_NODES } from '../data/fab-flow.js';
import { SCENARIOS } from '../data/scenario-paths.js';
import { chapterPagerHtml } from '../route-chrome.js';

// 介面圖示（2.17.0）：每個章節、部、十二站、情境與流程節點都對到存在的圖示
const known = (name, where) => assert.ok(ICON_NAMES.includes(name), `${where} 對到不存在的圖示：${name}`);
for (const ch of CHAPTER_CATALOG) {
  assert.ok(CHAPTER_ICONS[ch.id], `${ch.id} 沒有章節圖示`);
  known(CHAPTER_ICONS[ch.id], ch.id);
  assert.ok(PART_ICONS[ch.partId], `${ch.partId} 沒有部圖示`);
  known(PART_ICONS[ch.partId], ch.partId);
}
for (const node of FAB_FLOW_NODES) {
  assert.ok(STATION_ICONS[node.num], `第 ${node.num} 站沒有圖示`);
  known(STATION_ICONS[node.num], `第 ${node.num} 站`);
}
for (const s of SCENARIOS) {
  known(SCENARIO_ICONS[s.id], `情境 ${s.id}`);
  for (const n of s.nodes) known(SCENARIO_NODE_ICONS[n.id] || CHAPTER_ICONS[n.chapter], `情境 ${s.id} 節點 ${n.id}`);
}

// 對應表漏了某章時只少一個圖示，不讓整個畫面無法渲染；名稱寫錯仍要丟錯，由上面的檢查攔下
assert.equal(icon(undefined), '', '沒有對應的圖示時回傳空字串');
assert.throws(() => icon('no-such-icon'), /沒有這個圖示/, '不存在的圖示名稱要丟錯');

// 圖示一律單色 currentColor，不寫死顏色，黃光主題才會跟著換
for (const name of ICON_NAMES) assert.doesNotMatch(icon(name), /#[0-9a-f]{3,6}\b/i, `${name} 寫死了顏色`);

// 翻頁卡：箭頭與章節圖示都是裝飾；拿掉圖示後文字與原本相同
const pager = chapterPagerHtml({ isEn: false, prev: { id: 'ch03', title: '從沙子到晶圓' }, next: { id: 'ch05', title: '薄膜' }, compact: false });
assert.equal((pager.match(/<svg class="ui-icon[^"]*" viewBox="0 0 24 24" aria-hidden="true"/g) || []).length, 4, '翻頁卡應有兩個箭頭、兩個章節圖示，且都是 aria-hidden');
const text = pager.replace(/<svg\b[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '');
assert.equal(text, '上一章從沙子到晶圓下一章薄膜', '翻頁卡文字不變');

// 側欄狀態改用 SVG，不再留 ⚡ ★ ✓ 字元；徽章保留 title 並補上 aria-label
const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
assert.doesNotMatch(app, />⚡<|>★<|>✓<|textContent = '⚡'/, 'app.js 仍有側欄狀態字元');
assert.match(app, /const statusBadge = \(cls, name, title\) => `<span class="\$\{cls\}" role="img" title="\$\{title\}" aria-label="\$\{title\}">/, '側欄狀態徽章須有 title 與 aria-label');

console.log(`[PASS] 介面圖示：${CHAPTER_CATALOG.length} 章、${new Set(CHAPTER_CATALOG.map(c => c.partId)).size} 部、${FAB_FLOW_NODES.length} 站、${SCENARIOS.length} 個情境與 ${SCENARIOS.reduce((n, s) => n + s.nodes.length, 0)} 個流程節點都有圖示，圖示單色、裝飾用，翻頁卡文字不變`);
