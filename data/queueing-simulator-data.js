/**
 * data/queueing-simulator-data.js
 * 晶圓廠產線排隊延遲與 Little's Law / Kingman 週期時效模擬器 (Fab Queueing Simulator)
 * 50 輪深度工程優化 Stage 26 (Rounds 126–130)
 * 
 * 實作 Little 定律 (WIP = TH * CT) 與 Kingman VUT 方程式，
 * 定量展示機台稼動率 (Utilization) 突破 85%~90% 時在製品排隊時間呈曲棍球棒 (Hockey Stick) 指數暴增現象。
 */

/**
 * 依據 Kingman VUT 方程式計算排隊等待時間與總生產週期
 * @param {object} params
 * @param {number} params.utilization 機台利用率 u (0.01 ~ 0.99)
 * @param {number} params.processTimeHr 單批平均製程加工時間 t0 (小時)
 * @param {number} [params.ca=1.0] 到達間隔變異係數 (Coefficient of Variation of Arrivals)
 * @param {number} [params.ce=0.5] 加工時間變異係數 (Coefficient of Variation of Service)
 * @param {number} [params.throughputLotsDay=100] 產線每日產出率 TH (Lots/Day)
 */
export function calculateKingmanQueueing(params) {
  const {
    utilization = 0.82,
    processTimeHr = 1.2,
    ca = 1.0,
    ce = 0.5,
    throughputLotsDay = 120
  } = params;

  const u = Math.min(0.98, Math.max(0.05, utilization));

  // Kingman 方程式：CTq = V * U * T
  // V = (ca^2 + ce^2) / 2
  // U = u / (1 - u)
  // T = t0
  const vFactor = (ca * ca + ce * ce) / 2;
  const uFactor = u / (1 - u);
  const queueTimeHr = vFactor * uFactor * processTimeHr;
  const totalCycleTimeHr = queueTimeHr + processTimeHr;

  // Little 定律：WIP = TH * CT (Lots)
  const throughputPerHour = throughputLotsDay / 24;
  const totalWipLots = throughputPerHour * totalCycleTimeHr;

  // 產生 0.1 到 0.96 稼動率之曲棍球棒曲線點
  const curvePoints = [];
  for (let rate = 0.1; rate <= 0.96; rate += 0.05) {
    const qHr = vFactor * (rate / (1 - rate)) * processTimeHr;
    curvePoints.push({
      u: parseFloat(rate.toFixed(2)),
      queueTimeHr: parseFloat(qHr.toFixed(2)),
      totalCycleTimeHr: parseFloat((qHr + processTimeHr).toFixed(2))
    });
  }

  return {
    utilization: u,
    queueTimeHr: parseFloat(queueTimeHr.toFixed(2)),
    totalCycleTimeHr: parseFloat(totalCycleTimeHr.toFixed(2)),
    totalWipLots: Math.round(totalWipLots),
    vFactor: parseFloat(vFactor.toFixed(2)),
    isBottleneckSaturated: u >= 0.88,
    curvePoints
  };
}
