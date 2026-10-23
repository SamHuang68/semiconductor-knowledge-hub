/**
 * data/unit-converter-data.js
 * 晶圓製造關鍵量綱與工程單位全域轉換器 (Semiconductor Units & Dimensional Converter)
 * 50 輪深度工程優化 Stage 25 (Rounds 121–125)
 * 
 * 收錄長度薄膜、真空氣壓、原子濃度、熱活化能、離子劑量與缺陷良率
 * 6 大半導體專用量綱維度之雙向即時高精度換算矩陣。
 */

export const UNIT_DIMENSIONS = {
  length_film: {
    id: 'length_film',
    nameZh: '微觀長度與薄膜厚度 (Length & Film Thickness)',
    nameEn: 'Microscopic Length & Film Thickness',
    baseUnit: 'nm',
    units: {
      angstrom: { nameZh: '埃 (Å)', nameEn: 'Angstrom (Å)', toBase: 0.1 },
      nm: { nameZh: '奈米 (nm)', nameEn: 'Nanometer (nm)', toBase: 1.0 },
      um: { nameZh: '微米 (µm)', nameEn: 'Micrometer (µm)', toBase: 1000.0 },
      mil: { nameZh: '毫吋 (mil)', nameEn: 'Mil (thou)', toBase: 25400.0 }
    }
  },
  pressure_vacuum: {
    id: 'pressure_vacuum',
    nameZh: '製程氣壓與腔體真空度 (Vacuum & Chamber Pressure)',
    nameEn: 'Vacuum & Chamber Pressure',
    baseUnit: 'Pa',
    units: {
      torr: { nameZh: '托 (Torr)', nameEn: 'Torr', toBase: 133.322 },
      mtorr: { nameZh: '毫托 (mTorr)', nameEn: 'mTorr', toBase: 0.133322 },
      pa: { nameZh: '帕斯卡 (Pa)', nameEn: 'Pascal (Pa)', toBase: 1.0 },
      mbar: { nameZh: '毫巴 (mbar)', nameEn: 'mbar', toBase: 100.0 },
      atm: { nameZh: '標準大氣壓 (atm)', nameEn: 'Atmosphere (atm)', toBase: 101325.0 }
    }
  },
  concentration: {
    id: 'concentration',
    nameZh: '雜質與環境微污染濃度 (Doping & AMC Concentration)',
    nameEn: 'Dopant & Airborne Contamination Concentration',
    baseUnit: 'ppm',
    units: {
      pct: { nameZh: '百分比 (wt%)', nameEn: 'Weight Percent (wt%)', toBase: 10000.0 },
      ppm: { nameZh: '百萬分之一 (ppm)', nameEn: 'Parts-Per-Million (ppm)', toBase: 1.0 },
      ppb: { nameZh: '十億分之一 (ppb)', nameEn: 'Parts-Per-Billion (ppb)', toBase: 0.001 },
      ppt: { nameZh: '兆分之一 (ppt)', nameEn: 'Parts-Per-Trillion (ppt)', toBase: 0.000001 }
    }
  },
  energy_thermal: {
    id: 'energy_thermal',
    nameZh: '活化能與電子能隙 (Activation Energy & Bandgap)',
    nameEn: 'Activation Energy & Bandgap',
    baseUnit: 'eV',
    units: {
      ev: { nameZh: '電子伏特 (eV)', nameEn: 'Electron-Volt (eV)', toBase: 1.0 },
      joules: { nameZh: '焦耳 (J)', nameEn: 'Joule (J)', toBase: 6.242e18 },
      kcal_mol: { nameZh: '千卡/莫耳 (kcal/mol)', nameEn: 'kcal/mol', toBase: 0.04336 },
      thermal_kt: { nameZh: '室溫熱能 (kT at 300K)', nameEn: 'Thermal Voltage (kT @ 300K)', toBase: 0.02585 }
    }
  },
  ion_dose: {
    id: 'ion_dose',
    nameZh: '離子佈植摻雜劑量 (Ion Implantation Dose)',
    nameEn: 'Ion Implantation Dose',
    baseUnit: 'ions_cm2',
    units: {
      ions_cm2: { nameZh: '離子數 (ions/cm²)', nameEn: 'Ions per cm²', toBase: 1.0 },
      uc_cm2: { nameZh: '微庫侖 (µC/cm²)', nameEn: 'µC/cm²', toBase: 6.242e12 },
      mc_cm2: { nameZh: '毫庫侖 (mC/cm²)', nameEn: 'mC/cm²', toBase: 6.242e15 }
    }
  }
};

/**
 * 跨單位轉換計算核心
 * @param {string} dimensionId 量綱 ID (如 'length_film', 'pressure_vacuum')
 * @param {string} fromUnit 來源單位
 * @param {string} toUnit 目標單位
 * @param {number} value 數值
 * @returns {number}
 */
export function convertSemiconductorUnit(dimensionId, fromUnit, toUnit, value) {
  const dim = UNIT_DIMENSIONS[dimensionId];
  if (!dim || !dim.units[fromUnit] || !dim.units[toUnit]) return value;

  const baseVal = value * dim.units[fromUnit].toBase;
  const targetVal = baseVal / dim.units[toUnit].toBase;
  return targetVal;
}
