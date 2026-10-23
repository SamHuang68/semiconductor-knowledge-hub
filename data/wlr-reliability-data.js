/**
 * data/wlr-reliability-data.js
 * 半導體元件可靠度 WLR 物理衰退模型沙盒 (Wafer Level Reliability Physics Sandbox)
 * 50 輪深度工程優化 Stage 24 (Rounds 116–120)
 * 
 * 收錄 TDDB (介電擊穿)、BTI (偏壓溫度不穩定性)、HCI (熱載子注入) 與 EM (電遷移)
 * 4 大晶圓級可靠度物理機制模型與 10 年運作壽命外推外插演算法。
 */

export const WLR_MODELS = {
  tddb: {
    id: 'tddb',
    nameZh: 'TDDB 經時閘極介電層擊穿 (E-Model)',
    nameEn: 'Time-Dependent Dielectric Breakdown (TDDB)',
    activationEnergyEa: 0.9, // eV
    voltageAccFactorGamma: 4.2, // 1/V
    descriptionZh: '高電場誘導氧化層陷阱密度 (Traps) 隨時間增加，當陷阱形成相通穿透鏈時發生不可逆硬擊穿 (Hard Breakdown)。',
    descriptionEn: 'Electric field-induced trap generation forming a percolating breakdown path across the thin gate dielectric.'
  },
  bti: {
    id: 'bti',
    nameZh: 'BTI 負/正偏壓溫度不穩定性 (NBTI / PBTI)',
    nameEn: 'Bias Temperature Instability (BTI)',
    activationEnergyEa: 0.18,
    voltageAccFactorGamma: 2.8,
    descriptionZh: '高溫負偏壓下 Si-H 鍵斷裂引發介面態 (Interface States) 與氧化層電荷捕獲，導致 Vt 漂移與驅動電流退化。',
    descriptionEn: 'Si-H bond dissociation and charge trapping causing positive threshold voltage shifts and drive current loss.'
  },
  hci: {
    id: 'hci',
    nameZh: 'HCI 熱載子注入效應 (Hot Carrier Injection)',
    nameEn: 'Hot Carrier Injection (HCI)',
    activationEnergyEa: -0.1, // 負活化能：低溫下跌落更嚴重
    voltageAccFactorGamma: 3.5,
    descriptionZh: '高汲極電場加速電子/電洞撞擊晶格產生雪崩熱載子，注入閘極氧化層破壞介面。',
    descriptionEn: 'High channel electric field accelerates carriers into the gate oxide, generating interface traps.'
  },
  em: {
    id: 'em',
    nameZh: 'EM 導線電遷移 (Black Equation)',
    nameEn: 'Electromigration Interconnect Wearout (EM)',
    activationEnergyEa: 0.95,
    currentExponentN: 2.0,
    descriptionZh: '高電流密度下電子風 (Electron Wind) 動量轉移推動金屬離子沿晶界漂移，形成空洞 (Void) 斷路或小丘 (Hillock) 短路。',
    descriptionEn: 'Momentum transfer from electron wind causes atomic metal migration, leading to open voids or short hillocks.'
  }
};

/**
 * 計算可靠度熱應力與電壓加速因子 (Acceleration Factor, AF)
 * @param {string} modelId 模型 ID
 * @param {number} stressV 測試加速應力電壓 (V)
 * @param {number} stressTempC 測試溫度 (°C)
 * @param {number} [useV=0.75] 正常操作電壓 (V)
 * @param {number} [useTempC=55] 正常操作溫度 (°C)
 * @returns {{ thermalAF: number, voltageAF: number, totalAF: number, projectedLifeYears: number }}
 */
export function calculateReliabilityAcceleration(modelId, stressV, stressTempC, useV = 0.75, useTempC = 55) {
  const m = WLR_MODELS[modelId] || WLR_MODELS.tddb;
  const kB = 8.617e-5; // eV/K

  const T_stress_k = stressTempC + 273.15;
  const T_use_k = useTempC + 273.15;

  // 1. 熱加速因子 AF_thermal = exp( (Ea/kB) * (1/T_use - 1/T_stress) )
  const thermalAF = Math.exp((m.activationEnergyEa / kB) * ((1 / T_use_k) - (1 / T_stress_k)));

  // 2. 電壓加速因子 AF_voltage = exp( gamma * (V_stress - V_use) )
  const voltageAF = Math.exp(m.voltageAccFactorGamma * (stressV - useV));

  const totalAF = Math.max(1, thermalAF * voltageAF);

  // 假設在加速條件下測得的 MTTF 為 100 小時，外推到正常使用壽命
  const testHours = 100;
  const projectedLifeHours = testHours * totalAF;
  const projectedLifeYears = projectedLifeHours / (365.25 * 24);

  return {
    modelId,
    thermalAF: parseFloat(thermalAF.toFixed(1)),
    voltageAF: parseFloat(voltageAF.toFixed(1)),
    totalAF: parseFloat(totalAF.toExponential(2)),
    projectedLifeYears: parseFloat(projectedLifeYears.toFixed(1)),
    passes10YearRequirement: projectedLifeYears >= 10.0
  };
}
