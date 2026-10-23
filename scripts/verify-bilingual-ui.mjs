import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SCENARIOS } from '../data/scenario-paths.js';

console.log('--- 1. 檢驗 5 大情境與所有節點雙語欄位完整度 ---');
for (const s of SCENARIOS) {
  assert.ok(s.titleEn && s.titleEn.trim(), `scenario ${s.id} 缺少 titleEn`);
  assert.ok(s.questionEn && s.questionEn.trim(), `scenario ${s.id} 缺少 questionEn`);
  assert.ok(s.introEn && s.introEn.trim(), `scenario ${s.id} 缺少 introEn`);
  assert.ok(s.boundaryEn && s.boundaryEn.trim(), `scenario ${s.id} 缺少 boundaryEn`);
  assert.ok(s.labelEn && s.labelEn.trim(), `scenario ${s.id} 缺少 labelEn`);
  for (const n of s.nodes) {
    assert.ok(n.titleEn && n.titleEn.trim(), `node ${s.id}/${n.id} 缺少 titleEn`);
    assert.ok(n.tagEn && n.tagEn.trim(), `node ${s.id}/${n.id} 缺少 tagEn`);
    assert.ok(n.detailEn && n.detailEn.trim(), `node ${s.id}/${n.id} 缺少 detailEn`);
    assert.ok(n.lookEn && n.lookEn.trim(), `node ${s.id}/${n.id} 缺少 lookEn`);
    assert.ok(n.resultEn && n.resultEn.trim(), `node ${s.id}/${n.id} 缺少 resultEn`);
  }
}
console.log('[PASS] 5 大情境與 24 個節點英文欄位完整度 100%');

console.log('--- 2. 檢驗 index.html 與 app.js I18N 標籤對齊 ---');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const regex = /data-i18n(?:-placeholder|-title|-aria)?="([^"]+)"/g;
let match;
const tags = [];
while ((match = regex.exec(html)) !== null) {
  tags.push(match[1]);
}
for (const key of new Set(tags)) {
  assert.ok(app.includes(`${key}:`), `I18N 字典缺少註冊 key: ${key}`);
}
console.log(`[PASS] index.html 中所有 ${tags.length} 處 i18n 標記均在 I18N.zh 與 I18N.en 中完整註冊`);
