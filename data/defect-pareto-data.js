/**
 * data/defect-pareto-data.js
 * 晶圓缺陷空間共性分析與 Pareto 根本原因歸因儀 (Commonality & Defect Pareto Engine)
 * 50 輪深度工程優化 Stage 20 (Rounds 96–100)
 * 
 * 提供半導體產線經典 Pareto 缺陷二八法則排序、
 * 跨機台超幾何分佈共性分析 (Hypergeometric Commonality Analysis) 與 SVG 複合圖表。
 */

export const SAMPLE_DEFECT_CATEGORIES = [
  { id: 'particle_fall', nameZh: '腔體剝落微粒 (Fall-on Particle)', nameEn: 'Chamber Flaking Particle', count: 482, killRatio: 0.85, toolModule: 'PECVD / PVD' },
  { id: 'cmp_scratch', nameZh: '研磨刮痕 (CMP Scratch)', nameEn: 'CMP Micro-Scratch', count: 215, killRatio: 0.95, toolModule: 'CMP Platen 2' },
  { id: 'bridge_short', nameZh: '微影橋接短路 (Photo Bridging)', nameEn: 'Litho Nano-Bridging', count: 142, killRatio: 0.90, toolModule: 'EUV Scanner' },
  { id: 'ebr_residue', nameZh: '晶圓邊緣 EBR 殘膠 (EBR Flaking)', nameEn: 'Bevel EBR Flaking', count: 98, killRatio: 0.40, toolModule: 'Track Coater' },
  { id: 'via_void', nameZh: '通孔空洞斷路 (Via Void)', nameEn: 'Via Seeding Void', count: 64, killRatio: 0.98, toolModule: 'Copper ECD' },
  { id: 'water_mark', nameZh: '乾燥殘留水痕 (Water Mark)', nameEn: 'Immersion Water Mark', count: 35, killRatio: 0.30, toolModule: 'Spin Rinser' },
  { id: 'haze_crystal', nameZh: '氣體結晶微霧 (Ammonium Haze)', nameEn: 'Sulfate Chemical Haze', count: 19, killRatio: 0.25, toolModule: 'FOUP Storage' },
  { id: 'wafer_crack', nameZh: '晶圓微裂痕 (Chipping / Crack)', nameEn: 'Edge Micro-Chipping', count: 8, killRatio: 1.00, toolModule: 'Robot Handler' }
];

/**
 * 計算 Pareto 累積比重與致死率加權指標
 * @param {typeof SAMPLE_DEFECT_CATEGORIES} rawItems
 */
export function computeParetoAnalysis(rawItems = SAMPLE_DEFECT_CATEGORIES) {
  const sorted = [...rawItems].sort((a, b) => b.count - a.count);
  const totalCount = sorted.reduce((sum, item) => sum + item.count, 0);

  let cumulativeCount = 0;
  const paretoRows = sorted.map((item, idx) => {
    cumulativeCount += item.count;
    const countPct = (item.count / totalCount) * 100;
    const cumPct = (cumulativeCount / totalCount) * 100;
    const killerLoss = Math.round(item.count * item.killRatio);
    return {
      ...item,
      rank: idx + 1,
      countPct: parseFloat(countPct.toFixed(1)),
      cumPct: parseFloat(cumPct.toFixed(1)),
      killerLoss,
      isVitalFew: cumPct <= 82.0 // 80/20 關鍵少數
    };
  });

  return {
    totalDefects: totalCount,
    vitalCount: paretoRows.filter(r => r.isVitalFew).length,
    rows: paretoRows
  };
}

/**
 * 超幾何分佈跨機台共性分析檢驗 (Hypergeometric Test for Machine Commonality)
 * 用於確認不良批次是否顯著集中於特定腔體或站點。
 * @param {number} totalLots 總生產批次數 (N)
 * @param {number} badLots 發生異常批次數 (K)
 * @param {number} toolProcessedLots 嫌疑機台走過的批次數 (n)
 * @param {number} toolBadLots 該機台走過且發生異常的批次數 (k)
 * @returns {{ pValue: number, isStatisticallySignificant: boolean, oddsRatio: number }}
 */
export function calculateCommonalityPValue(totalLots, badLots, toolProcessedLots, toolBadLots) {
  // 對數階乘計算超幾何機率
  const logFact = n => {
    let ans = 0;
    for (let i = 2; i <= n; i++) ans += Math.log(i);
    return ans;
  };

  const logComb = (n, k) => {
    if (k < 0 || k > n) return -Infinity;
    return logFact(n) - logFact(k) - logFact(n - k);
  };

  const hypergeomPdf = (N, K, n, k) => {
    return Math.exp(logComb(K, k) + logComb(N - K, n - k) - logComb(N, n));
  };

  // 累計 P-value: P(X >= toolBadLots)
  let pValue = 0;
  const maxK = Math.min(badLots, toolProcessedLots);
  for (let k = toolBadLots; k <= maxK; k++) {
    pValue += hypergeomPdf(totalLots, badLots, toolProcessedLots, k);
  }

  const cleanP = Math.max(0, Math.min(1, pValue));
  const oddsRatio = (toolBadLots / (toolProcessedLots - toolBadLots || 1)) /
                    ((badLots - toolBadLots || 1) / (totalLots - toolProcessedLots - (badLots - toolBadLots) || 1));

  return {
    pValue: parseFloat(cleanP.toExponential(3)),
    isStatisticallySignificant: cleanP < 0.01, // P < 0.01 具備強烈機台共性相關性
    oddsRatio: parseFloat(oddsRatio.toFixed(2))
  };
}
