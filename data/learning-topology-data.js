/**
 * data/learning-topology-data.js
 * 跨章節工程技術依存拓撲圖譜 (Chapter Dependency & Learning Topology Map)
 * 50 輪深度工程優化 Stage 27 (Rounds 131–135)
 * 
 * 建立全書 25 正式章與 3 篇附錄之先修依存關係圖譜 (Prerequisites & Successors DAG)，
 * 串接物理基礎、核心模組、整合製程、品質量測與先進封裝四大修煉主幹。
 */

export const CHAPTER_DEPENDENCIES = {
  ch00: { prereqs: [], successors: ['ch01', 'ch02', 'ch03'] },
  ch01: { prereqs: ['ch00'], successors: ['ch18', 'ch23'] },
  ch02: { prereqs: ['ch00'], successors: ['ch07', 'ch12', 'ch24'] },
  ch03: { prereqs: ['ch00'], successors: ['ch04', 'ch05'] },
  ch04: { prereqs: ['ch03'], successors: ['ch06', 'ch10', 'ch15'] },
  ch05: { prereqs: ['ch03'], successors: ['ch06', 'ch08', 'ch10'] },
  ch06: { prereqs: ['ch04', 'ch05'], successors: ['ch08', 'ch11'] },
  ch07: { prereqs: ['ch02'], successors: ['ch11', 'ch12'] },
  ch08: { prereqs: ['ch05', 'ch06'], successors: ['ch10', 'ch11'] },
  ch09: { prereqs: ['ch08'], successors: ['ch10', 'ch11'] },
  ch10: { prereqs: ['ch04', 'ch08'], successors: ['ch11', 'ch20'] },
  ch11: { prereqs: ['ch06', 'ch07', 'ch08', 'ch10'], successors: ['ch12', 'ch13', 'ch14'] },
  ch12: { prereqs: ['ch02', 'ch11'], successors: ['ch14', 'ch24'] },
  ch13: { prereqs: ['ch11'], successors: ['ch21', 'ch24'] },
  ch14: { prereqs: ['ch11', 'ch12'], successors: ['ch21', 'ch24'] },
  ch15: { prereqs: ['ch04', 'ch06', 'ch08'], successors: ['ch16', 'ch17'] },
  ch16: { prereqs: ['ch15'], successors: ['ch17', 'ch18'] },
  ch17: { prereqs: ['ch16'], successors: ['ch18', 'ch23'] },
  ch18: { prereqs: ['ch01', 'ch16', 'ch17'], successors: ['ch23'] },
  ch19: { prereqs: ['ch11', 'ch15'], successors: ['ch20', 'ch21'] },
  ch20: { prereqs: ['ch10', 'ch19'], successors: ['ch21', 'ch22'] },
  ch21: { prereqs: ['ch13', 'ch14', 'ch20'], successors: ['ch22'] },
  ch22: { prereqs: ['ch20', 'ch21'], successors: ['ch24'] },
  ch23: { prereqs: ['ch01', 'ch17', 'ch18'], successors: ['ch24'] },
  ch24: { prereqs: ['ch02', 'ch12', 'ch13', 'ch22', 'ch23'], successors: [] },
  'app-glossary': { prereqs: ['ch00'], successors: [] },
  'app-jargon': { prereqs: ['ch01'], successors: [] },
  'app-reading': { prereqs: ['ch24'], successors: [] }
};

/**
 * 查詢特定章節之前置先修與後續延伸章節
 * @param {string} chId
 */
export function getChapterLearningPath(chId) {
  const node = CHAPTER_DEPENDENCIES[chId] || { prereqs: [], successors: [] };
  return {
    chId,
    prerequisites: node.prereqs,
    successors: node.successors,
    hasPrerequisites: node.prereqs.length > 0,
    hasSuccessors: node.successors.length > 0
  };
}
