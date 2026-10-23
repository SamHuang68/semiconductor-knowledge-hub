/**
 * data/term-linker.js
 * 現場行話與工程術語反向雙向知識網 (Term Popover & Knowledge Graph)
 * 50 輪深度工程優化 Stage 14 (Rounds 66–70)
 * 
 * 在正文與卡片中提供輕量即時迷你懸浮卡 (Mini-Glossary Popover)，
 * 支援名詞即時秒查、發音朗讀 (Web Speech API) 與跨章節導覽跳轉。
 */

import { GLOSSARY_DATA, JARGON_DATA } from './glossary-data.js';

// 建立快速查詢索引 (大寫鍵值)
const TERM_INDEX = new Map();

for (const item of GLOSSARY_DATA) {
  if (item.abbr) {
    TERM_INDEX.set(item.abbr.toUpperCase(), { ...item, type: 'glossary' });
  }
  if (item.en) {
    TERM_INDEX.set(item.en.toUpperCase(), { ...item, type: 'glossary' });
  }
  if (item.zh) {
    TERM_INDEX.set(item.zh, { ...item, type: 'glossary' });
  }
}

for (const item of JARGON_DATA) {
  if (item.termZh) {
    TERM_INDEX.set(item.termZh, { ...item, type: 'jargon', zh: item.termZh, en: item.termEn, descZh: item.defZh, descEn: item.defEn });
  }
  if (item.termEn) {
    TERM_INDEX.set(item.termEn.toUpperCase(), { ...item, type: 'jargon', zh: item.termZh, en: item.termEn, descZh: item.defZh, descEn: item.defEn });
  }
}

/**
 * 查詢術語詳細資訊
 * @param {string} term 術語名稱或縮寫
 * @returns {Record<string, any> | null}
 */
export function lookupTerm(term) {
  if (!term) return null;
  const key = term.trim().toUpperCase();
  return TERM_INDEX.get(key) || TERM_INDEX.get(term.trim()) || null;
}

/**
 * 取得術語關聯章節清單
 * @param {string} term
 * @returns {string[]} 章節代碼陣列 (例如 ['ch04', 'ch17'])
 */
export function getRelatedChaptersForTerm(term) {
  const item = lookupTerm(term);
  if (!item) return [];
  if (item.chapter) {
    const chNum = parseInt(item.chapter, 10);
    return [chNum < 10 ? `ch0${chNum}` : `ch${chNum}`];
  }
  return [];
}

/**
 * 渲染術語浮動卡片 HTML
 * @param {Record<string, any>} info 術語資料
 * @param {'zh'|'en'} lang 語言
 * @returns {string} HTML 標記
 */
export function renderTermPopoverHtml(info, lang = 'zh') {
  if (!info) return '';
  const isEn = lang === 'en';
  const name = isEn ? (info.en || info.zh) : (info.zh || info.en);
  const subname = isEn ? info.zh : info.en;
  const desc = isEn ? (info.descEn || info.descZh) : (info.descZh || info.descEn);
  const ch = info.chapter ? (info.chapter < 10 ? `CH 0${info.chapter}` : `CH ${info.chapter}`) : '';

  return `
    <div class="term-popover-card" role="tooltip" style="
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 12px 14px;
      box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08);
      max-width: 320px;
      font-size: 13px;
      line-height: 1.5;
      color: #1e293b;
      z-index: 10000;
    ">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 6px;">
        <div>
          <span style="font-weight: 700; color: #0284c7; font-size: 14px;">${name}</span>
          ${info.abbr ? `<span style="margin-left: 6px; font-size: 11px; background: #e0f2fe; color: #0369a1; padding: 1px 5px; border-radius: 4px; font-weight: 600;">${info.abbr}</span>` : ''}
          ${subname && subname !== name ? `<div style="font-size: 11px; color: #64748b;">${subname}</div>` : ''}
        </div>
        ${ch ? `<span style="font-size: 11px; background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${ch}</span>` : ''}
      </div>
      <p style="margin: 0; color: #334155; font-size: 12px;">${desc}</p>
      <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 10px; color: #94a3b8; text-transform: uppercase;">SEMICONDUCTOR GLOSSARY</span>
        <button type="button" class="term-pop-speak" data-text="${name}" style="background: none; border: none; cursor: pointer; color: #0284c7; font-size: 11px; padding: 2px 4px; display: inline-flex; align-items: center; gap: 3px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          ${isEn ? 'Pronounce' : '朗讀'}
        </button>
      </div>
    </div>
  `;
}
