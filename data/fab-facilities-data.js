/**
 * data/fab-facilities-data.js
 * 晶圓廠化學品供應與超純水廠務監控儀表板 (Fab Facilities & UPW Telemetry Console)
 * 50 輪深度工程優化 Stage 22 (Rounds 106–110)
 * 
 * 結構化收錄晶圓廠四大關鍵廠務系統（超純水 UPW、大宗特氣 Bulk Gas、
 * 酸鹼廢氣洗滌塔 Scrubber 與不斷電電力 UPS），支援即時遙測警報模擬。
 */

export const FAB_FACILITIES_SYSTEMS = {
  upw: {
    id: 'upw',
    nameZh: '超純水系統 (Ultra-Pure Water)',
    nameEn: 'Ultra-Pure Water System (UPW)',
    flowRateM3Hr: 450,
    parameters: [
      { id: 'resistivity', nameZh: '水阻率', nameEn: 'Resistivity', unit: 'MΩ·cm', normalVal: 18.24, minLimit: 18.0, maxLimit: 18.3, status: 'nominal' },
      { id: 'toc', nameZh: '總有機碳 (TOC)', nameEn: 'Total Organic Carbon', unit: 'ppb', normalVal: 0.8, minLimit: 0, maxLimit: 1.5, status: 'nominal' },
      { id: 'do', nameZh: '溶氧量 (DO)', nameEn: 'Dissolved Oxygen', unit: 'ppb', normalVal: 0.9, minLimit: 0, maxLimit: 2.0, status: 'nominal' },
      { id: 'particles', nameZh: '微粒數 (>20nm)', nameEn: 'Particles (>20nm)', unit: 'cts/mL', normalVal: 2, minLimit: 0, maxLimit: 10, status: 'nominal' }
    ]
  },
  bulk_gas: {
    id: 'bulk_gas',
    nameZh: '大宗高純特氣系統 (Bulk Speciality Gases)',
    nameEn: 'Ultra-High Purity Bulk Gas Infrastructure',
    flowRateM3Hr: 2200,
    parameters: [
      { id: 'n2_purity', nameZh: '高純氮氣純度', nameEn: 'N2 Purity', unit: 'N', normalVal: 9.9999999, minLimit: 9.99999, maxLimit: 10.0, status: 'nominal' },
      { id: 'h2_moisture', nameZh: '氫氣水分含量', nameEn: 'H2 Moisture', unit: 'ppb', normalVal: 0.5, minLimit: 0, maxLimit: 1.0, status: 'nominal' },
      { id: 'ar_pressure', nameZh: '氬氣管網供氣壓力', nameEn: 'Argon Pressure', unit: 'MPa', normalVal: 0.85, minLimit: 0.75, maxLimit: 0.95, status: 'nominal' }
    ]
  },
  exhaust_scrubber: {
    id: 'exhaust_scrubber',
    nameZh: '酸鹼排氣與揮發性有機物洗滌塔 (Scrubber)',
    nameEn: 'Acid/Alkaline & VOC Exhaust Scrubber',
    flowRateM3Hr: 12000,
    parameters: [
      { id: 'acid_ph', nameZh: '酸性洗滌循環液 pH', nameEn: 'Acid Scrubber Liquid pH', unit: 'pH', normalVal: 7.2, minLimit: 6.8, maxLimit: 8.5, status: 'nominal' },
      { id: 'voc_removal', nameZh: '沸石轉輪 VOC 去除率', nameEn: 'Zeolite Rotor Removal', unit: '%', normalVal: 99.2, minLimit: 98.0, maxLimit: 100, status: 'nominal' },
      { id: 'delta_p', nameZh: '填料塔壓差 (Delta P)', nameEn: 'Bed Differential Pressure', unit: 'Pa', normalVal: 350, minLimit: 200, maxLimit: 600, status: 'nominal' }
    ]
  },
  power_ups: {
    id: 'power_ups',
    nameZh: '無塵室不斷電雙迴路電力系統 (UPS & Power)',
    nameEn: 'Cleanroom Dual-Feed UPS Power Grid',
    capacityMva: 35,
    parameters: [
      { id: 'voltage_thd', nameZh: '電壓諧波總失真 (THD)', nameEn: 'Voltage Harmonic THD', unit: '%', normalVal: 1.2, minLimit: 0, maxLimit: 3.0, status: 'nominal' },
      { id: 'frequency', nameZh: '電網頻率', nameEn: 'Grid Frequency', unit: 'Hz', normalVal: 60.0, minLimit: 59.8, maxLimit: 60.2, status: 'nominal' },
      { id: 'ups_backup_min', nameZh: '電池組全載續航時間', nameEn: 'Full-Load Battery Autonomy', unit: 'min', normalVal: 20, minLimit: 15, maxLimit: 30, status: 'nominal' }
    ]
  }
};

/**
 * 模擬廠務遙測數據採樣與異常狀態檢測
 * @param {string} systemId
 * @param {boolean} [simulateExcursion=false] 是否注入隨機異常
 */
export function getFacilitiesTelemetrySnapshot(systemId, simulateExcursion = false) {
  const sys = FAB_FACILITIES_SYSTEMS[systemId] || FAB_FACILITIES_SYSTEMS.upw;
  const snapshot = sys.parameters.map(p => {
    let currentVal = p.normalVal;
    let isWarning = false;
    let isAlarm = false;

    if (simulateExcursion) {
      currentVal = p.maxLimit * 1.15; // 超標 15%
      isAlarm = true;
    }

    return {
      ...p,
      currentVal: typeof currentVal === 'number' ? parseFloat(currentVal.toFixed(p.normalVal < 10 ? 2 : 1)) : currentVal,
      isWarning,
      isAlarm,
      status: isAlarm ? 'alarm' : isWarning ? 'warning' : 'nominal'
    };
  });

  return {
    systemId: sys.id,
    systemNameZh: sys.nameZh,
    systemNameEn: sys.nameEn,
    timestamp: new Date().toISOString(),
    overallStatus: simulateExcursion ? 'CRITICAL_ALARM' : 'NORMAL_STEADY',
    telemetry: snapshot
  };
}
