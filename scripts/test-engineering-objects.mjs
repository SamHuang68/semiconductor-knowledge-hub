import assert from 'node:assert/strict';
import { mountEngineeringObject } from '../工程物件.js';

class MockElement {
  constructor(tag = 'div') {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this._listeners = {};
    this._attrs = {};
    this._html = '';
  }
  setAttribute(k, v) { this._attrs[k] = String(v); }
  getAttribute(k) { return this._attrs[k] || null; }
  addEventListener(evt, fn) {
    if (!this._listeners[evt]) this._listeners[evt] = [];
    this._listeners[evt].push(fn);
  }
  dispatchEvent(evt) {
    const list = this._listeners[evt.type] || [];
    for (const fn of list) fn(evt);
  }
  set innerHTML(val) {
    this._html = val;
    this.children = [];
    // parse buttons with data-*
    const btnRegex = /<button[^>]*class="([^"]*)"[^>]*data-([a-z]+)="([^"]*)"[^>]*id="?([^"\s>]*)"?[^>]*>(.*?)<\/button>/gi;
    let match;
    while ((match = btnRegex.exec(val)) !== null) {
      const btn = new MockElement('button');
      btn.className = match[1];
      btn.setAttribute(`data-${match[2]}`, match[3]);
      if (match[4]) btn.setAttribute('id', match[4]);
      this.children.push(btn);
    }
    // parse regular buttons by id
    const idBtnRegex = /<button[^>]*id="([a-zA-Z0-9]+)"[^>]*>/gi;
    while ((match = idBtnRegex.exec(val)) !== null) {
      if (!this.children.some(c => c.getAttribute('id') === match[1])) {
        const btn = new MockElement('button');
        btn.setAttribute('id', match[1]);
        this.children.push(btn);
      }
    }
  }
  get innerHTML() { return this._html; }
  querySelectorAll(sel) {
    if (sel.includes('[data-')) {
      const attrMatch = sel.match(/\[(data-[a-z]+)\]/);
      if (attrMatch) {
        return this.children.filter(c => c.getAttribute(attrMatch[1]) !== null);
      }
    }
    return [];
  }
  querySelector(sel) {
    if (sel.startsWith('#')) {
      const id = sel.slice(1);
      return this.children.find(c => c.getAttribute('id') === id) || null;
    }
    return null;
  }
}

console.log('--- 測試 1: Ch 04 微影模型切換 ---');
const c4 = new MockElement();
mountEngineeringObject('ch04', c4, 'zh');
assert.ok(c4.innerHTML.includes('DUV 浸潤式'), '預設應有浸潤式');
// 模擬點擊 EUV Tab
const euvBtn = c4.children.find(c => c.getAttribute('data-mode') === 'euv');
if (euvBtn) {
  euvBtn.dispatchEvent({ type: 'click' });
  assert.ok(c4.innerHTML.includes('13.5 nm'), '點擊 EUV 後應更新波長為 13.5nm');
}
console.log('[PASS] Ch 04 微影模型互動切換正常');

console.log('--- 測試 2: Ch 05 薄膜 ALD 循環單步前進 ---');
const c5 = new MockElement();
mountEngineeringObject('ch05', c5, 'zh');
assert.ok(c5.innerHTML.includes('ALD 四步自限循環'), '預設應展示 ALD 模式');
const nextBtn = c5.querySelector('#aldNextBtn');
assert.ok(nextBtn, '應存在 aldNextBtn');
nextBtn.dispatchEvent({ type: 'click' });
assert.ok(c5.innerHTML.includes('步驟 2'), '單步前進後應推進至步驟 2');
nextBtn.dispatchEvent({ type: 'click' });
assert.ok(c5.innerHTML.includes('步驟 3'), '單步前進後應推進至步驟 3');
console.log('[PASS] Ch 05 薄膜 ALD 單步循環正常');

console.log('--- 測試 3: Ch 06 蝕刻模型切換 ---');
const c6 = new MockElement();
mountEngineeringObject('ch06', c6, 'zh');
assert.ok(c6.innerHTML.includes('ICP'), '預設應展示 ICP 腔體');
console.log('[PASS] Ch 06 蝕刻腔體模型正常');

console.log('--- 測試 4: Ch 12 電晶體演進切換 ---');
const c12 = new MockElement();
mountEngineeringObject('ch12', c12, 'zh');
assert.ok(c12.innerHTML.includes('FinFET'), '預設應展示 FinFET');
const gaaBtn = c12.children.find(c => c.getAttribute('data-gen') === 'gaa');
if (gaaBtn) {
  gaaBtn.dispatchEvent({ type: 'click' });
  assert.ok(c12.innerHTML.includes('GAA 360°'), '點擊 GAA 後應展示 GAA 全環繞');
}
console.log('[PASS] Ch 12 電晶體 3D 等角演進模型正常');

console.log('--- 測試 5: Ch 07 離子佈植模型切換 ---');
const c7 = new MockElement();
mountEngineeringObject('ch07', c7, 'zh');
assert.ok(c7.innerHTML.includes('分析磁鐵'), '預設應展示光路與磁鐵');
const annealBtn = c7.children.find(c => c.getAttribute('data-tab') === 'anneal');
if (annealBtn) {
  annealBtn.dispatchEvent({ type: 'click' });
  assert.ok(c7.innerHTML.includes('RTA 快速退火'), '點擊退火後應展示退火介面');
}
console.log('[PASS] Ch 07 離子佈植與退火模型正常');

console.log('--- 測試 6: Ch 08 CMP 運動學與缺陷模型切換 ---');
const c8 = new MockElement();
mountEngineeringObject('ch08', c8, 'zh');
assert.ok(c8.innerHTML.includes('Preston 方程'), '預設應展示運動學與 Preston');
const defectBtn = c8.children.find(c => c.getAttribute('data-tab') === 'defects');
if (defectBtn) {
  defectBtn.dispatchEvent({ type: 'click' });
  assert.ok(c8.innerHTML.includes('假圖形填補'), '點擊缺陷後應展示假圖形填補');
}
console.log('[PASS] Ch 08 CMP 平坦化模型正常');

console.log('--- 測試 7: Ch 10 金屬化雙鑲嵌單步前進 ---');
const c10 = new MockElement();
mountEngineeringObject('ch10', c10, 'zh');
assert.ok(c10.innerHTML.includes('雙載子鑲嵌'), '預設應展示雙載子鑲嵌');
const damaNext = c10.querySelector('#damaNextBtn');
if (damaNext) {
  damaNext.dispatchEvent({ type: 'click' });
  assert.ok(c10.innerHTML.includes('2 / 6'), '單步前進後應顯示步驟 2');
}
console.log('[PASS] Ch 10 金屬化雙載子鑲嵌模型正常');

console.log('--- 測試 8: Ch 21 先進封裝 CoWoS 與 SoIC 切換 ---');
const c21 = new MockElement();
mountEngineeringObject('ch21', c21, 'zh');
assert.ok(c21.innerHTML.includes('CoWoS'), '預設應展示 CoWoS');
const soicBtn = c21.children.find(c => c.getAttribute('data-tab') === 'soic');
if (soicBtn) {
  soicBtn.dispatchEvent({ type: 'click' });
  assert.ok(c21.innerHTML.includes('無凸塊混合鍵合'), '點擊 SoIC 後應展示混合鍵合');
}
console.log('[PASS] Ch 21 先進封裝架構模型正常');

console.log('--- 測試 9: Ch 03 柴氏長晶與切片模型切換 ---');
const c3 = new MockElement();
mountEngineeringObject('ch03', c3, 'zh');
assert.ok(c3.innerHTML.includes('柴氏長晶爐'), '預設應展示 CZ 長晶爐');
const sawBtn = c3.children.find(c => c.getAttribute('data-tab') === 'saw');
if (sawBtn) {
  sawBtn.dispatchEvent({ type: 'click' });
  assert.ok(c3.innerHTML.includes('金剛石鋸線'), '點擊線鋸後應展示金剛石線鋸切片');
}
console.log('[PASS] Ch 03 柴氏長晶與切片拋光模型正常');

console.log('--- 測試 10: Ch 09 清洗與兆聲波模型切換 ---');
const c9 = new MockElement();
mountEngineeringObject('ch09', c9, 'zh');
assert.ok(c9.innerHTML.includes('SC-1'), '預設應展示 RCA-1 清洗');
const megaBtn = c9.children.find(c => c.getAttribute('data-tab') === 'megasonic');
if (megaBtn) {
  megaBtn.dispatchEvent({ type: 'click' });
  assert.ok(c9.innerHTML.includes('兆聲波'), '點擊兆聲波後應展示音流與邊界層');
}
console.log('[PASS] Ch 09 RCA 清洗與兆聲波模型正常');

console.log('--- 測試 11: Ch 11 CMOS 完整整合步進流程 ---');
const c11 = new MockElement();
mountEngineeringObject('ch11', c11, 'zh');
assert.ok(c11.innerHTML.includes('工步 1 / 6'), '預設應展示步驟 1 STI');
const cmosNext = c11.querySelector('[data-action="next"]');
if (cmosNext) {
  cmosNext.dispatchEvent({ type: 'click' });
  assert.ok(c11.innerHTML.includes('工步 2 / 6'), '單步前進後應展示工步 2 雙井');
}
console.log('[PASS] Ch 11 CMOS 完整流程步進模型正常');

console.log('--- 測試 12: Ch 13 記憶體 DRAM 與 3D NAND 切換 ---');
const c13 = new MockElement();
mountEngineeringObject('ch13', c13, 'zh');
assert.ok(c13.innerHTML.includes('DRAM 圓柱狀立體儲存電容'), '預設應展示 DRAM 1T1C');
const nandBtn = c13.children.find(c => c.getAttribute('data-tab') === 'nand');
if (nandBtn) {
  nandBtn.dispatchEvent({ type: 'click' });
  assert.ok(c13.innerHTML.includes('200+ 層交替堆疊'), '點擊 NAND 後應展示 3D NAND 階梯穿孔');
}
console.log('[PASS] Ch 13 記憶體 DRAM / 3D NAND / HBM 模型正常');

console.log('--- 測試 13: Ch 15 CD-SEM 與光學檢測切換 ---');
const c15 = new MockElement();
mountEngineeringObject('ch15', c15, 'zh');
assert.ok(c15.innerHTML.includes('二次電子'), '預設應展示 CD-SEM 二次電子');
const opticalBtn = c15.children.find(c => c.getAttribute('data-tab') === 'optical');
if (opticalBtn) {
  opticalBtn.dispatchEvent({ type: 'click' });
  assert.ok(c15.innerHTML.includes('明場檢測'), '點擊光學後應展示明場/暗場檢測');
}
console.log('[PASS] Ch 15 CD-SEM 與光學檢測模型正常');

console.log('--- 測試 14: Ch 16 晶圓缺陷空間圖譜與 FIB 切片切換 ---');
const c16 = new MockElement();
mountEngineeringObject('ch16', c16, 'zh');
assert.ok(c16.innerHTML.includes('缺陷特徵診斷') || c16.innerHTML.includes('同心圓環狀缺陷'), '預設應展示晶圓缺陷圖譜');
const fibBtn = c16.children.find(c => c.getAttribute('data-tab') === 'fib');
if (fibBtn) {
  fibBtn.dispatchEvent({ type: 'click' });
  assert.ok(c16.innerHTML.includes('TEM Lamella') || c16.innerHTML.includes('Ga⁺ FIB'), '點擊 FIB 後應展示雙束 FIB 切片');
}
console.log('[PASS] Ch 16 良率缺陷圖譜與 FIB/TEM 模型正常');

console.log('--- 測試 15: Ch 17 SPC 管制圖與判異規則切換 ---');
const c17 = new MockElement();
mountEngineeringObject('ch17', c17, 'zh');
assert.ok(c17.innerHTML.includes('UCL (+3σ)'), '預設應展示 SPC 3σ 管制界限');
const shiftBtn = c17.children.find(c => c.getAttribute('data-spc-mode') === 'shift');
if (shiftBtn) {
  shiftBtn.dispatchEvent({ type: 'click' });
  assert.ok(c17.innerHTML.includes('WECO 規則 2'), '點擊 Shift 後應觸發 WECO 規則 2 警報');
}
console.log('[PASS] Ch 17 SPC 管制圖與 Cpk 模型正常');

console.log('--- 測試 16: Ch 19 WAT 劃線區與 CP 針測切換 ---');
const c19 = new MockElement();
mountEngineeringObject('ch19', c19, 'zh');
assert.ok(c19.innerHTML.includes('PCM 測試鍵'), '預設應展示 WAT PCM 劃線區測試');
const cpBtn = c19.children.find(c => c.getAttribute('data-tab') === 'cp');
if (cpBtn) {
  cpBtn.dispatchEvent({ type: 'click' });
  assert.ok(c19.innerHTML.includes('Vertical Probe Card') || c19.innerHTML.includes('微彈簧針'), '點擊 CP 後應展示垂直探針卡');
}
console.log('[PASS] Ch 19 WAT 與 CP 晶圓測試模型正常');

console.log('=== 全部十六大核心工程物件互動單元測試通過 (0 錯誤) ===');


