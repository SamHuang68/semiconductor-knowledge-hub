import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('=== 檢驗 20 輪深度優化擴充元件與系統架構 (Stage 1 ~ Stage 4) ===');

// 1. 檢驗 28 大模組實體照片、特徵熱點 Hotspots 與計量 HUD (Stage 1)
const { REAL_PHOTOS_DATA } = await import(`file://${ROOT_DIR}/data/real-photos.js`);
const photoKeys = Object.keys(REAL_PHOTOS_DATA);
assert.equal(photoKeys.length, 28, '實體照片必須覆蓋全站 28 個模組 (Ch 00 ~ 24 + 附錄 A/B/C)');

let totalHotspots = 0;
for (const [chId, p] of Object.entries(REAL_PHOTOS_DATA)) {
  assert.ok(p.src, `${chId} 缺少照片 src`);
  assert.ok(p.metrology && p.metrology.techniqueZh && p.metrology.techniqueEn, `${chId} 缺少 metrology 檢測技術資訊`);
  assert.ok(p.metrology.mag && p.metrology.voltage && p.metrology.fov, `${chId} 缺少 metrology 放大倍率/電壓/FOV 規格`);
  if (p.hotspots && p.hotspots.length > 0) {
    totalHotspots += p.hotspots.length;
    p.hotspots.forEach((h, idx) => {
      assert.ok(h.labelZh && h.labelEn, `${chId} hotspot #${idx} 缺少雙語標籤`);
      assert.ok(h.detailZh && h.detailEn, `${chId} hotspot #${idx} 缺少雙語物理機制說明`);
      assert.ok(typeof h.x === 'number' && typeof h.y === 'number', `${chId} hotspot #${idx} 座標無效`);
    });
  }
}
console.log(`[PASS] Stage 1 (Rounds 1-5): 28 模組照片、Metrology HUD 與 ${totalHotspots} 處微觀特徵熱點完整性 100%`);

// 2. 檢驗 8 大物理計算器沙盒 (Stage 2)
const { PHYSICS_CALCULATORS } = await import(`file://${ROOT_DIR}/data/calculators-data.js`);
const calcKeys = Object.keys(PHYSICS_CALCULATORS);
assert.ok(calcKeys.length >= 8, '物理速算器至少收錄 8 套');
for (const [id, c] of Object.entries(PHYSICS_CALCULATORS)) {
  assert.ok(c.titleZh && c.titleEn, `計算器 ${id} 缺少雙語標題`);
  assert.ok(c.formulaLatex, `計算器 ${id} 缺少物理公式`);
  assert.ok(Array.isArray(c.params) && c.params.length >= 2, `計算器 ${id} 參數輸入不足`);
  assert.equal(typeof c.calculate, 'function', `計算器 ${id} 缺少 calculate 計算函式`);
  
  // 建立預設參數測試 calculate 輸出
  const defaults = {};
  c.params.forEach(inp => { defaults[inp.id] = inp.default; });
  const results = c.calculate(defaults);
  assert.ok(Array.isArray(results) && results.length >= 1, `計算器 ${id} 計算結果無效`);
  assert.ok(results[0].value !== undefined, `計算器 ${id} 第一項結果值無效`);
}
console.log(`[PASS] Stage 2 (Rounds 6-7): 8 大經典半導體物理速算模型計算函式全數驗證通過`);

// 3. 檢驗 28 大 OCAP 異常反應處置決策樹 (Stage 2)
const { OCAP_TREES } = await import(`file://${ROOT_DIR}/data/ocap-data.js`);
const ocapKeys = Object.keys(OCAP_TREES);
assert.equal(ocapKeys.length, 28, 'OCAP 決策樹必須滿貫覆蓋 28 個模組');
for (const [id, tree] of Object.entries(OCAP_TREES)) {
  assert.ok(tree.titleZh && tree.titleEn, `OCAP ${id} 缺少雙語標題`);
  assert.ok(tree.triggerZh && tree.triggerEn, `OCAP ${id} 缺少觸發警報條件`);
  assert.ok(tree.containmentZh && tree.containmentEn, `OCAP ${id} 缺少緊急防堵處置`);
  assert.ok(Array.isArray(tree.steps) && tree.steps.length >= 3, `OCAP ${id} steps 決策階層不足 3 步`);
  assert.ok(tree.dispositionZh && tree.dispositionEn, `OCAP ${id} 缺少批次處置放行標準`);
  assert.ok(tree.preventionZh && tree.preventionEn, `OCAP ${id} 缺少長期防呆措施`);
}
console.log(`[PASS] Stage 2 (Rounds 8-10): 28 篇全站 OCAP 異常處置決策樹完整性 100%`);

// 4. 檢驗觀念隨堂快測題庫 (Stage 4)
const { CONCEPT_QUIZZES } = await import(`file://${ROOT_DIR}/data/quiz-data.js`);
const quizKeys = Object.keys(CONCEPT_QUIZZES);
assert.ok(quizKeys.length >= 8, '隨堂測驗題庫至少覆蓋 8 個核心章節');
let totalQuestions = 0;
for (const [id, qList] of Object.entries(CONCEPT_QUIZZES)) {
  assert.ok(Array.isArray(qList) && qList.length >= 1, `題庫 ${id} 題目為空`);
  qList.forEach((q, idx) => {
    totalQuestions++;
    assert.ok(q.questionZh && q.questionEn, `題庫 ${id} #${idx} 缺少雙語題目`);
    assert.ok(Array.isArray(q.optionsZh) && q.optionsZh.length >= 4, `題庫 ${id} #${idx} 選項不足 4 項`);
    assert.ok(Array.isArray(q.optionsEn) && q.optionsEn.length >= 4, `題庫 ${id} #${idx} 英文選項不足 4 項`);
    assert.ok(typeof q.answer === 'number' && q.answer >= 0 && q.answer < q.optionsZh.length, `題庫 ${id} #${idx} 正解索引超出範圍`);
    assert.ok(q.explanationZh && q.explanationEn, `題庫 ${id} #${idx} 缺少雙語物理觀念解析`);
  });
}
console.log(`[PASS] Stage 4 (Round 17): 觀念隨堂快測 ${totalQuestions} 道高鑑別度實務題校驗 100% 通過`);

// 5. 檢驗樣式表 styles.css (Stage 3 & Stage 4)
const styles = fs.readFileSync(path.join(ROOT_DIR, 'styles.css'), 'utf8');
assert.ok(styles.includes('[data-theme="litho-amber"]'), 'styles.css 必須包含無塵室 500nm 黃光微影濾光主題模式');
assert.ok(styles.includes('[data-theme="dark"]'), 'styles.css 必須包含暗色主題模式');
assert.ok(styles.includes('.theme-switch-cluster'), 'styles.css 必須包含主題切換器樣式');
assert.ok(styles.includes('.atlas-sim-bar'), 'styles.css 必須包含全景圖譜天車調度模擬條樣式');
assert.ok(styles.includes('.btn-jargon-speech'), 'styles.css 必須包含 Web Speech API 發音按鈕樣式');
assert.ok(styles.includes('@media print'), 'styles.css 必須包含出版級列印排版樣式');
console.log('[PASS] Stage 4 (Rounds 16 & 18): 500nm 黃光微影濾光主題、暗色主題、天車模擬條與出版級列印樣式全數就緒');

// 6. 檢驗 index.html 與 app.js (Stage 3 & Stage 4)
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'app.js'), 'utf8');
const pkgJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));

assert.ok(indexHtml.includes('class="theme-switch-cluster"'), 'index.html 必須具備主題切換群組');
assert.ok(indexHtml.includes('id="atlasSimBar"'), 'index.html 必須具備天車調度控制條');
assert.ok(appJs.includes('applyTheme(theme)'), 'app.js 必須具備主題切換管理函式');
assert.ok(appJs.includes('QTIME_MAP ='), 'app.js 必須包含 Q-Time 關鍵時效矩陣');
assert.ok(appJs.includes('function speakTerm('), 'app.js 必須包含 Web Speech API 語音發音函式');
assert.equal(pkgJson.version, '2.3.0', 'package.json 版本號必須為 2.3.0');
assert.ok(indexHtml.includes('版本 2.3.0'), 'index.html 頁尾版本必須升級至 2.3.0');
assert.ok(appJs.includes('版本 2.3.0'), 'app.js 字典版本必須升級至 2.3.0');

console.log('[PASS] Stage 3 & 4 (Rounds 11-15, 19-20): 天車調度模擬、Q-Time 矩陣、語音朗讀與 v2.3.0 進版驗證全數通過！');
console.log('=== 20 輪結構化工程優化驗證全數滿貫通過 (0 錯誤) ===');
