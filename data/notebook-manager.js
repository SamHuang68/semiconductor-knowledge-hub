/**
 * data/notebook-manager.js
 * 個人化工程研習筆記與段落劃記系統 (Notebook & Annotation System)
 * 50 輪深度工程優化 Stage 17 (Rounds 81–85)
 * 
 * 支援無塵室淡色三色螢光筆劃記 (琥珀黃、科技青、合格綠)、
 * 章節研習筆記便簽儲存、總覽抽屜導覽與 Markdown 筆記一鍵匯出。
 */

const STORAGE_NOTES_KEY = 'semi_user_chapter_notes';
const STORAGE_HIGHLIGHTS_KEY = 'semi_user_highlights';

export const HIGHLIGHT_COLORS = {
  amber: { id: 'amber', nameZh: '微影琥珀黃', nameEn: 'Litho Amber', bg: '#fef3c7', text: '#92400e', border: '#f59e0b' },
  cyan: { id: 'cyan', nameZh: '超純水天青', nameEn: 'Clean Cyan', bg: '#e0f2fe', text: '#0369a1', border: '#0284c7' },
  emerald: { id: 'emerald', nameZh: '合格放行綠', nameEn: 'Pass Emerald', bg: '#dcfce7', text: '#166534', border: '#22c55e' }
};

/**
 * 讀取章節研習筆記
 * @param {string} chId
 * @returns {string}
 */
export function getChapterNote(chId) {
  try {
    const raw = localStorage.getItem(STORAGE_NOTES_KEY);
    if (!raw) return '';
    const store = JSON.parse(raw);
    return store[chId] || '';
  } catch {
    return '';
  }
}

/**
 * 儲存章節研習筆記
 * @param {string} chId
 * @param {string} noteText
 */
export function saveChapterNote(chId, noteText) {
  try {
    const raw = localStorage.getItem(STORAGE_NOTES_KEY) || '{}';
    const store = JSON.parse(raw);
    if (noteText && noteText.trim()) {
      store[chId] = {
        text: noteText.trim(),
        updatedAt: new Date().toISOString()
      };
    } else {
      delete store[chId];
    }
    localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn('Failed to save chapter note:', e);
  }
}

/**
 * 讀取所有高亮標記
 * @returns {Array<{ id: string, chId: string, text: string, color: string, createdAt: string }>}
 */
export function getAllHighlights() {
  try {
    const raw = localStorage.getItem(STORAGE_HIGHLIGHTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * 新增一段高亮標記
 * @param {string} chId 章節代碼
 * @param {string} text 標記文字
 * @param {'amber'|'cyan'|'emerald'} [color='amber'] 色彩
 */
export function addHighlight(chId, text, color = 'amber') {
  if (!text || !text.trim()) return;
  const list = getAllHighlights();
  const item = {
    id: `hl_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    chId,
    text: text.trim().slice(0, 300), // 上限 300 字
    color: HIGHLIGHT_COLORS[color] ? color : 'amber',
    createdAt: new Date().toISOString()
  };
  list.unshift(item);
  try {
    localStorage.setItem(STORAGE_HIGHLIGHTS_KEY, JSON.stringify(list.slice(0, 200))); // 上限 200 筆
  } catch (e) {
    console.warn('Failed to save highlight:', e);
  }
  return item;
}

/**
 * 刪除高亮標記
 * @param {string} hlId
 */
export function removeHighlight(hlId) {
  const list = getAllHighlights().filter(h => h.id !== hlId);
  try {
    localStorage.setItem(STORAGE_HIGHLIGHTS_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Failed to remove highlight:', e);
  }
}

/**
 * 匯出個人研習筆記為 Markdown 文件
 * @param {'zh'|'en'} lang
 * @returns {string}
 */
export function exportNotebookToMarkdown(lang = 'zh') {
  const isEn = lang === 'en';
  let md = isEn
    ? `# Semiconductor Knowledge Hub - Engineering Study Notes\n> Exported on ${new Date().toISOString().slice(0, 10)}\n\n`
    : `# 半導體製造概論知識庫 · 個人工程研習筆記\n> 匯出日期：${new Date().toISOString().slice(0, 10)}\n\n`;

  // 1. 章節便簽
  try {
    const raw = localStorage.getItem(STORAGE_NOTES_KEY);
    if (raw) {
      const store = JSON.parse(raw);
      md += isEn ? `## Chapter Study Notes\n\n` : `## 章節實務研習筆記\n\n`;
      for (const [chId, n] of Object.entries(store)) {
        md += `### ${chId.toUpperCase()}\n- ${n.text || n}\n\n`;
      }
    }
  } catch {}

  // 2. 劃記重點
  const hls = getAllHighlights();
  if (hls.length > 0) {
    md += isEn ? `## Highlighted Insights\n\n` : `## 經典重點標記摘錄\n\n`;
    for (const h of hls) {
      md += `- **[${h.chId.toUpperCase()}]** *"${h.text}"*\n`;
    }
  }

  return md;
}
