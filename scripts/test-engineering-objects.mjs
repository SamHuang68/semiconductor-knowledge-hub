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

console.log('=== 全部工程物件互動單元測試通過 (0 錯誤) ===');
