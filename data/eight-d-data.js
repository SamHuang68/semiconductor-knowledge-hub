/**
 * data/eight-d-data.js
 * 8D 異常表單互動工作台與動態報告生成器 (8D Excursion Worksheet Generator)
 * 50 輪深度工程優化 Stage 11 (Rounds 51–55)
 * 
 * 支援與 28 篇全站 OCAP 決策樹資料模型無縫串接，
 * 自動預填 D1~D8 跨部門半導體異常工程報告，支援 localStorage 草稿暫存與匯出。
 */

import { OCAP_TREES } from './ocap-data.js';

export const EIGHT_D_DISCIPLINES = [
  { id: 'D1', titleZh: 'D1 成立改善小組', titleEn: 'D1 Team Formation', roleZh: '跨部門核心小組 (PE/EE/YE/QA/PIE)', roleEn: 'Cross-functional Team' },
  { id: 'D2', titleZh: 'D2 問題與異常描述', titleEn: 'D2 Problem Description', roleZh: '5W2H 精確定義晶圓受害範圍', roleEn: '5W2H Defect Scope' },
  { id: 'D3', titleZh: 'D3 緊急防堵對策 (ICA)', titleEn: 'D3 Interim Containment', roleZh: '即刻 Hold 批次、機台停機與章魚追溯', roleEn: 'Immediate Quarantine & Interlock' },
  { id: 'D4', titleZh: 'D4 根本原因分析 (RCA)', titleEn: 'D4 Root Cause Analysis', roleZh: '5-Why 物理機制、魚骨圖與驗證', roleEn: '5-Why Physics & Ishikawa' },
  { id: 'D5', titleZh: 'D5 永久改善對策 (PCA)', titleEn: 'D5 Permanent Corrective Actions', roleZh: '消除物理根因的最佳對策評選', roleEn: 'Select Corrective Actions' },
  { id: 'D6', titleZh: 'D6 實施與驗證對策', titleEn: 'D6 Implement & Validate PCA', roleZh: '試產批次驗證 Cpk 與良率恢復', roleEn: 'Pilot Lot Validation' },
  { id: 'D7', titleZh: 'D7 預防再發防呆互鎖', titleEn: 'D7 Prevent Recurrence', roleZh: 'FMEA 更新、MES 防呆與作業標準化', roleEn: 'FMEA & MES Poka-Yoke' },
  { id: 'D8', titleZh: 'D8 團隊肯定與結案', titleEn: 'D8 Team Recognition & Closure', roleZh: '管理審查核准、結案歸檔與表揚', roleEn: 'Management Sign-off & Recognition' }
];

const STORAGE_KEY = 'semi_8d_worksheets';

/**
 * 依章節 OCAP 資料生成預填 8D 報告
 * @param {string} chId 章節代碼 (例如 'ch18', 'ch04')
 * @param {'zh'|'en'} lang 語言
 * @returns {Record<string, string>}
 */
export function generate8dFromOcap(chId, lang = 'zh') {
  const ocap = OCAP_TREES[chId] || OCAP_TREES.ch18 || {};
  const isEn = lang === 'en';

  const title = isEn ? (ocap.titleEn || 'General Fabrication Excursion') : (ocap.titleZh || '半導體製程一般異常');
  const trigger = isEn ? (ocap.triggerEn || 'Parametric out-of-spec alert') : (ocap.triggerZh || '製程參數超標警報');
  const containment = isEn ? (ocap.containmentEn || 'Immediate lot quarantine and tool halt') : (ocap.containmentZh || '立即隔離批次並停機檢修');
  const prevention = isEn ? (ocap.preventionEn || 'Update MES interlock rule') : (ocap.preventionZh || '更新 MES 自動防呆互鎖規則');
  const disposition = isEn ? (ocap.dispositionEn || 'Pass Cpk test for lot disposition') : (ocap.dispositionZh || '通過 Cpk 評估始可放行批次');

  let rcaSteps = '';
  if (Array.isArray(ocap.steps)) {
    rcaSteps = ocap.steps.map((s, idx) => {
      const q = isEn ? s.questionEn : s.questionZh;
      const act = isEn ? s.actionEn : s.actionZh;
      return `Step ${idx + 1}: ${q} -> ${act}`;
    }).join('\n');
  }

  return {
    chId,
    reportId: `8D-${chId.toUpperCase()}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
    date: new Date().toISOString().slice(0, 10),
    title: isEn ? `8D Report: ${title}` : `8D 異常改善工程報告：${title}`,
    d1: isEn ? 'Champion: Fab Director | Leader: Senior PIE Engineer | Members: Litho PE, Plasma EE, Yield Analyst, Metrology QA' : '負責人：廠長／部經理 | 主組長：資深整合工程師 (PIE) | 組員：製程工程師 (PE)、設備工程師 (EE)、良率分析 (YE)、品質保證 (QA)',
    d2: isEn ? `[What] ${title}\n[When] Detected at inline metrology step\n[Where] Module ${chId.toUpperCase()} cleanroom bay\n[Trigger] ${trigger}\n[Scope] 25 wafers in active FOUP` : `【異常現象】${title}\n【發生時間】線上檢測時發現\n【發生位置】無塵室 ${chId.toUpperCase()} 站點機台\n【觸發標準】${trigger}\n【受害範圍】當前 FOUP 內 25 片晶圓，以及同 Recipe 關聯批次`,
    d3: isEn ? `[Immediate Action] ${containment}\n[Traceability] Octopus sweep on preceding/succeeding 5 lots in stocker.\n[Tool State] Tool set to DOWN; RMS checksum locked.` : `【緊急防堵】${containment}\n【批次追溯】啟動章魚防堵法，清查前後 5 批同一機台在製品 (WIP)。\n【機台處置】機台轉為 Down 狀態，MES 鎖定派工卡控。`,
    d4: isEn ? `[Root Cause Analysis]\n${rcaSteps || 'Analyzed via 5-Why and SEM physical failure analysis.'}` : `【物理肇因分析 5-Why】\n${rcaSteps || '透過雙束 FIB 切片與 SEM 電顯確認物理失效機制，追溯化學品/射頻匹配源頭。'}`,
    d5: isEn ? `[Selected PCA] Replace degraded chamber component and recalibrate flow mass controllers.` : `【永久對策評選】更換劣化之腔體零件（如 Focus Ring/Showerhead），校正質量流量控制器 (MFC) 並進行 3 批 Dummy 驗證。`,
    d6: isEn ? `[Validation] Processed 3 monitor wafers. Cpk recovered to >1.45. ${disposition}` : `【實施驗證】投入 3 批控片進行復機確認，量測 49 點均勻度良好，Cpk 達標 $\\ge 1.45$。${disposition}`,
    d7: isEn ? `[Poka-Yoke] ${prevention}\nUpdated Control Plan and FMEA severity rank.` : `【預防再發防呆】${prevention}\n同步更新製程管制計畫書 (Control Plan) 與製程 FMEA 嚴重度評級，建立 SPC Nelson 判異自動 Hold 機互鎖。`,
    d8: isEn ? 'Approved by QA Director. Lessons learned documented in Semiconductor Knowledge Base.' : 'QA 處長審查核准結案。將本案例物理機制與排除指引納入全廠工程知識庫，表彰改善小組。'
  };
}

/**
 * 讀取已暫存的 8D 草稿
 * @param {string} chId
 * @returns {Record<string, string> | null}
 */
export function load8dDraft(chId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const store = JSON.parse(raw);
    return store[chId] || null;
  } catch {
    return null;
  }
}

/**
 * 保存 8D 草稿至 localStorage
 * @param {string} chId
 * @param {Record<string, string>} data
 */
export function save8dDraft(chId, data) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || '{}';
    const store = JSON.parse(raw);
    store[chId] = { ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn('Failed to save 8D draft to localStorage:', e);
  }
}

/**
 * 匯出 8D 表單為標準 Markdown 格式
 * @param {Record<string, string>} report
 * @returns {string}
 */
export function export8dToMarkdown(report) {
  return `# ${report.title || '8D 異常工程報告'}\n\n` +
    `> 報告編號：${report.reportId} | 建立日期：${report.date}\n\n` +
    `## D1: 改善小組 (Team Formation)\n${report.d1}\n\n` +
    `## D2: 問題描述 (Problem Description 5W2H)\n${report.d2}\n\n` +
    `## D3: 緊急防堵對策 (Interim Containment Actions)\n${report.d3}\n\n` +
    `## D4: 根本原因分析 (Root Cause Analysis RCA)\n${report.d4}\n\n` +
    `## D5: 永久改善對策 (Permanent Corrective Actions)\n${report.d5}\n\n` +
    `## D6: 實施與驗證對策 (Implement & Validate PCA)\n${report.d6}\n\n` +
    `## D7: 預防再發防呆措施 (Prevent Recurrence Poka-Yoke)\n${report.d7}\n\n` +
    `## D8: 團隊肯定與結案 (Recognition & Sign-off)\n${report.d8}\n`;
}
