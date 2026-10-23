/**
 * data/stco-economics-data.js
 * 互動式微縮經濟學與小晶片 STCO 成本沙盒 (STCO & Chiplet Economics Sandbox)
 * 50 輪深度工程優化 Stage 16 (Rounds 76–80)
 * 
 * 基於半導體晶圓淨晶粒數 (GDPW)、負二項良率模型 (Negative Binomial Yield)、
 * KGD 測試與 2.5D/3D 先進封裝鍵合良率，定量比較單晶片 (Monolithic SoC)
 * 與小晶片拆解 (Chiplet STCO) 之生產成本與損益平衡點。
 */

/**
 * 計算 300mm 晶圓毛晶粒數 (Gross Die Per Wafer, GDPW)
 * @param {number} areaMm2 晶粒面積 (mm²)
 * @param {number} [waferDiaMm=300] 晶圓直徑 (mm)
 * @param {number} [edgeExclusionMm=3] 邊緣排除 (mm)
 * @returns {number}
 */
export function calculateGdpw(areaMm2, waferDiaMm = 300, edgeExclusionMm = 3) {
  if (areaMm2 <= 0) return 0;
  const usableR = (waferDiaMm / 2) - edgeExclusionMm;
  const waferArea = Math.PI * usableR * usableR;
  // 經典經驗公式：GDPW = (Wafer Area / Die Area) - (Perimeter / sqrt(2 * Die Area))
  const perimeter = 2 * Math.PI * usableR;
  const gdpw = (waferArea / areaMm2) - (perimeter / Math.sqrt(2 * areaMm2));
  return Math.max(0, Math.floor(gdpw));
}

/**
 * 依負二項模型計算晶粒良率
 * @param {number} areaMm2 晶粒面積 (mm²)
 * @param {number} defectDensity 缺陷密度 (defects/cm²)
 * @param {number} [alpha=2.0] 群聚參數
 * @returns {number} 良率比值 (0.0 ~ 1.0)
 */
export function calculateNegativeBinomialYield(areaMm2, defectDensity, alpha = 2.0) {
  const areaCm2 = areaMm2 / 100;
  return Math.pow(1 + (defectDensity * areaCm2) / alpha, -alpha);
}

/**
 * 定量 STCO 成本比較計算核心
 * @param {object} inputs
 * @param {number} inputs.socAreaMm2 單晶片總功能面積 (mm²)
 * @param {number} inputs.defectDensity 缺陷密度 (defects/cm²)
 * @param {number} inputs.waferCostLead 先進製程晶圓成本 (美元/片, 例如 N3 $20,000)
 * @param {number} inputs.waferCostMature 成熟製程晶圓成本 (美元/片, 例如 N6 $9,000)
 * @param {number} inputs.computeChiplets 算力小晶片數量 (例如 4 顆)
 * @param {number} inputs.ioRatio IO 模組佔比 (例如 0.25)
 * @param {number} inputs.d2dOverheadPct D2D 互連面積額外開銷 (例如 12%)
 * @param {number} inputs.bondingYield 封裝鍵合良率 (例如 0.985)
 * @param {number} inputs.kgdYield 晶圓測試 KGD 良率 (例如 0.99)
 * @param {number} inputs.pkgSubstrateCost 先進封裝中介層與基板成本 (例如 $55)
 */
export function calculateStcoEconomics(inputs) {
  const {
    socAreaMm2 = 620,
    defectDensity = 0.08,
    waferCostLead = 20000,
    waferCostMature = 9000,
    computeChiplets = 4,
    ioRatio = 0.25,
    d2dOverheadPct = 12,
    bondingYield = 0.985,
    kgdYield = 0.99,
    pkgSubstrateCost = 65
  } = inputs;

  // 1. 單晶片 Monolithic SoC 計算
  const monoGdpw = calculateGdpw(socAreaMm2);
  const monoYield = calculateNegativeBinomialYield(socAreaMm2, defectDensity);
  const monoGoodDies = Math.max(1, Math.floor(monoGdpw * monoYield));
  const monoDieCost = waferCostLead / monoGoodDies;
  const monoStandardPkgCost = 35;
  const monoTotalCost = (monoDieCost / kgdYield) + monoStandardPkgCost;

  // 2. 小晶片 Chiplet 異質架構拆解計算
  // 算力 Die (Leading edge) + IO Die (Mature edge)
  const d2dMultiplier = 1 + (d2dOverheadPct / 100);
  const computeTotalArea = socAreaMm2 * (1 - ioRatio) * d2dMultiplier;
  const eachComputeArea = computeTotalArea / computeChiplets;
  const ioArea = socAreaMm2 * ioRatio * d2dMultiplier;

  // 算力小晶片良率與成本
  const computeGdpw = calculateGdpw(eachComputeArea);
  const computeYield = calculateNegativeBinomialYield(eachComputeArea, defectDensity);
  const computeGoodDies = Math.max(1, Math.floor(computeGdpw * computeYield));
  const eachComputeCost = waferCostLead / computeGoodDies;

  // IO 小晶片良率與成本 (使用成熟製程，通常缺陷密度更低)
  const ioDefectDensity = defectDensity * 0.7;
  const ioGdpw = calculateGdpw(ioArea);
  const ioYield = calculateNegativeBinomialYield(ioArea, ioDefectDensity);
  const ioGoodDies = Math.max(1, Math.floor(ioGdpw * ioYield));
  const eachIoCost = waferCostMature / ioGoodDies;

  // 封裝整體複合良率：所有小晶片皆為良好 (KGD^N) 且鍵合成功 (BondingYield^N)
  const totalDiesInPkg = computeChiplets + 1;
  const compositeYield = Math.pow(kgdYield, totalDiesInPkg) * Math.pow(bondingYield, totalDiesInPkg);

  // 總小晶片矽成本
  const totalSiliconCost = (eachComputeCost * computeChiplets) + eachIoCost;
  const chipletTotalCost = (totalSiliconCost / compositeYield) + pkgSubstrateCost;

  // 節省金額與比例
  const savingsAmount = monoTotalCost - chipletTotalCost;
  const savingsPct = (savingsAmount / monoTotalCost) * 100;

  return {
    monolithic: {
      areaMm2: socAreaMm2,
      gdpw: monoGdpw,
      yieldPct: (monoYield * 100).toFixed(1),
      goodDies: monoGoodDies,
      dieCost: monoDieCost.toFixed(1),
      totalCost: monoTotalCost.toFixed(1)
    },
    chiplet: {
      computeChiplets,
      eachComputeArea: eachComputeArea.toFixed(1),
      computeYieldPct: (computeYield * 100).toFixed(1),
      eachComputeCost: eachComputeCost.toFixed(1),
      ioArea: ioArea.toFixed(1),
      ioYieldPct: (ioYield * 100).toFixed(1),
      eachIoCost: eachIoCost.toFixed(1),
      compositeYieldPct: (compositeYield * 100).toFixed(1),
      totalSiliconCost: totalSiliconCost.toFixed(1),
      totalCost: chipletTotalCost.toFixed(1)
    },
    comparison: {
      savingsAmount: savingsAmount.toFixed(1),
      savingsPct: savingsPct.toFixed(1),
      isBeneficial: savingsAmount > 0
    }
  };
}
