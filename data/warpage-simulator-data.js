/**
 * data/warpage-simulator-data.js
 * 3D 先進封裝鍵合熱應力與翹曲 Warpage 模擬器 (3D Packaging Warpage & Stoney Simulator)
 * 50 輪深度工程優化 Stage 21 (Rounds 101–105)
 * 
 * 依據 Stoney 熱雙金屬片方程式與材料熱膨脹係數 (CTE) 失配，
 * 定量模擬 CoWoS、InFO、SoIC 與玻璃基板在迴焊 (260°C) 與常溫下的翹曲 (Smile / Cry)。
 */

export const PACKAGING_MATERIALS = {
  silicon_die: { nameZh: '矽單晶晶粒 (Silicon Die)', nameEn: 'Single-Crystal Silicon Die', cte: 2.6, youngModulus: 130 },
  silicon_interposer: { nameZh: '全矽中介層 (CoWoS-S Interposer)', nameEn: 'CoWoS-S Silicon Interposer', cte: 2.6, youngModulus: 130 },
  organic_rdl: { nameZh: '有機重佈線層 (InFO / CoWoS-R RDL)', nameEn: 'Organic Polyimide RDL', cte: 14.5, youngModulus: 4.5 },
  mold_compound: { nameZh: '環氧樹脂封膠 (EMC Mold)', nameEn: 'Epoxy Molding Compound (EMC)', cte: 9.2, youngModulus: 18.0 },
  bt_substrate: { nameZh: 'BT 載板 (FCBGA Core Substrate)', nameEn: 'BT / ABF Organic Substrate', cte: 15.0, youngModulus: 24.0 },
  glass_core: { nameZh: '玻璃核心基板 (Glass Core Substrate)', nameEn: 'Glass Core Substrate (TGV)', cte: 3.5, youngModulus: 75.0 },
  copper_pillar: { nameZh: '銅柱凸塊 (Cu Pillar)', nameEn: 'Copper Pillar Micro-Bump', cte: 16.5, youngModulus: 110 }
};

export const PACKAGING_ARCHITECTURES = {
  cowos_s: {
    id: 'cowos_s',
    nameZh: 'CoWoS-S 全矽中介層先進封裝',
    nameEn: 'TSMC CoWoS-S Full Silicon Interposer',
    topMaterial: 'silicon_die',
    baseMaterial: 'bt_substrate',
    interposerMaterial: 'silicon_interposer',
    packageSizeMm: 65,
    topThicknessUm: 750,
    baseThicknessUm: 1200
  },
  info_pop: {
    id: 'info_pop',
    nameZh: 'InFO-PoP 扇出型晶圓級封裝',
    nameEn: 'TSMC InFO-PoP Fan-Out Wafer-Level',
    topMaterial: 'silicon_die',
    baseMaterial: 'organic_rdl',
    interposerMaterial: 'mold_compound',
    packageSizeMm: 15,
    topThicknessUm: 400,
    baseThicknessUm: 220
  },
  glass_tgv: {
    id: 'glass_tgv',
    nameZh: '玻璃核心基板先進光電共封裝 (CPO TGV)',
    nameEn: 'Glass Core Substrate with TGV (CPO / AI)',
    topMaterial: 'silicon_die',
    baseMaterial: 'glass_core',
    interposerMaterial: 'copper_pillar',
    packageSizeMm: 75,
    topThicknessUm: 750,
    baseThicknessUm: 1000
  }
};

/**
 * 計算熱應力引發之翹曲曲率半徑與總高度偏差 (Warpage Deflection)
 * @param {string} archId 封裝架構 ID
 * @param {number} tempC 溫度 (°C)
 * @param {number} [refTempC=150] 零應力固化參考溫度 (°C)
 * @returns {{ deltaT: number, curvatureRadiusM: number, warpageUm: number, shape: 'Smile (凸)'|'Cry (凹)'|'Flat (平坦)' }}
 */
export function calculatePackageWarpage(archId, tempC, refTempC = 150) {
  const arch = PACKAGING_ARCHITECTURES[archId] || PACKAGING_ARCHITECTURES.cowos_s;
  const topMat = PACKAGING_MATERIALS[arch.topMaterial];
  const baseMat = PACKAGING_MATERIALS[arch.baseMaterial];

  const deltaT = tempC - refTempC;
  const deltaCte = (baseMat.cte - topMat.cte) * 1e-6; // 1/K
  const hTop = arch.topThicknessUm * 1e-6; // m
  const hBase = arch.baseThicknessUm * 1e-6; // m
  const totalH = hTop + hBase;
  const lengthM = arch.packageSizeMm * 1e-3; // m

  const m = hTop / hBase;
  const n = topMat.youngModulus / baseMat.youngModulus;

  // Stoney-Timoshenko 雙金屬片熱應力曲率方程
  const numerator = 6 * deltaCte * deltaT * Math.pow(1 + m, 2);
  const denominator = totalH * (3 * Math.pow(1 + m, 2) + (1 + m * n) * (Math.pow(m, 2) + 1 / (m * n)));
  const curvature = numerator / (denominator || 1); // 1/m

  // 翹曲高度 delta = (kappa * L^2) / 8
  const warpageM = (curvature * lengthM * lengthM) / 8;
  const warpageUm = warpageM * 1e6; // µm

  let shape = 'Flat (平坦)';
  if (warpageUm > 5) shape = 'Smile (凸)';
  else if (warpageUm < -5) shape = 'Cry (凹)';

  return {
    archId,
    tempC,
    deltaT,
    curvatureRadiusM: curvature !== 0 ? parseFloat((1 / Math.abs(curvature)).toFixed(2)) : Infinity,
    warpageUm: parseFloat(warpageUm.toFixed(1)),
    shape,
    isReflowRisk: Math.abs(warpageUm) > 85 // 一般 JEDEC 迴焊上限約 85-100 µm
  };
}
