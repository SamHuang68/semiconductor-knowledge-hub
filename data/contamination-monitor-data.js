/**
 * contamination-monitor-data.js - Airborne Molecular Contamination (AMC) & Surface TXRF Monitor
 *
 * Simulates:
 * 1. AMC 4 Core Categories (SEMI F21 standard):
 *    - Category A (Acids): SO2, HF, HCl (Corrosion, optics haze)
 *    - Category B (Bases): NH3, NMP, Amines (T-topping resist bridging)
 *    - Category C (Condensables): Organics, Siloxanes (Gate oxide degradation)
 *    - Category D (Dopants): B2H6, PH3 (Uncontrolled doping shift)
 * 2. Surface Metal Impurities via TXRF (Total Reflection X-Ray Fluorescence):
 *    Detects sub-ppb surface metals (Fe, Cu, Ni, Cr, Ca, Na) with 1e9 atoms/cm^2 limit.
 * 3. FOUP purge efficiency and chemical filtration air quality metrics.
 *
 * Complies with Rule 0003 (Cleanroom Light Theme) and Rule 0013 (Strict ASCII filename).
 */

export const CONTAMINATION_MONITOR_DATA = {
  version: '2.9.0',
  amcCategories: [
    {
      id: 'cat_b_bases',
      code: 'B',
      name: { zh: '鹼性氣體 (Category B: Bases)', en: 'Category B: Bases (NH3, Amines)' },
      targetPpb: 0.5,
      alarmPpb: 1.5,
      impactMechanism: {
        zh: '中和光阻曝光產生之光酸 (Photo-Acid)，造成光阻圖形頂部不溶解，形成嚴重的 T-topping 殘留與線路橋接短路',
        en: 'Neutralizes photogenerated acid at resist surface, causing severe T-topping and bridging defects'
      },
      mitigationAction: {
        zh: 'FOUP 氮氣吹驅 (N2 Purge)、光阻塗佈前化學微孔炭濾網更換',
        en: 'N2 purge in FOUPs and carbon chemical filtration in litho track'
      }
    },
    {
      id: 'cat_a_acids',
      code: 'A',
      name: { zh: '酸性氣體 (Category A: Acids)', en: 'Category A: Acids (SO2, HF, HCl)' },
      targetPpb: 1.0,
      alarmPpb: 3.0,
      impactMechanism: {
        zh: '在晶圓微水膜上形成腐蝕電解質，造成金屬線孔蝕 (Pitting) 與光學鏡面表面硫酸鹽晶體霧化 (Haze)',
        en: 'Forms acidic condensates corroding metal pads and producing optics haze via ammonium sulfate'
      },
      mitigationAction: {
        zh: '鹼性離子交換濾網更換、排風微壓差平衡調校',
        en: 'Ion-exchange filtration and differential pressure verification'
      }
    },
    {
      id: 'cat_c_condensables',
      code: 'C',
      name: { zh: '可凝聚有機物 (Category C: Condensables)', en: 'Category C: Condensables (Siloxanes, Organics)' },
      targetPpb: 2.0,
      alarmPpb: 5.0,
      impactMechanism: {
        zh: '在矽晶圓高溫氧化爐沉積微量矽氧烷，引發薄膜孔隙率增高與 Gate Oxide TDDB 壽命驟降',
        en: 'Siloxane deposition creates pinholes and degradation of gate oxide TDDB reliability'
      },
      mitigationAction: {
        zh: '低揮發載具材質 (Ultra-low outgassing Entegris FOUP) 與氣相脫附監測',
        en: 'Ultra-low outgassing FOUPs and thermal desorption GC-MS tracking'
      }
    },
    {
      id: 'cat_d_dopants',
      code: 'D',
      name: { zh: '揮發摻雜物 (Category D: Dopants)', en: 'Category D: Dopants (Boron/Phosphorus vapor)' },
      targetPpb: 0.05,
      alarmPpb: 0.2,
      impactMechanism: {
        zh: '自微量揮發物滲入高阻矽基底或磊晶層，導致電阻率 (Rs) 與臨界電壓 (Vth) 漂移',
        en: 'Inadvertent auto-doping shifting substrate sheet resistance and threshold voltage'
      },
      mitigationAction: {
        zh: '離子佈植維修排風隔離、專屬氣相捕集器 (Getter)',
        en: 'Dedicated implant maintenance exhaust and chemical gas getters'
      }
    }
  ],

  metalsTxrfSpec: [
    { element: 'Fe', name: { zh: '鐵 (Fe)', en: 'Iron' }, specThreshold: 1.0e9 },
    { element: 'Cu', name: { zh: '銅 (Cu)', en: 'Copper' }, specThreshold: 1.0e9 },
    { element: 'Ni', name: { zh: '鎳 (Ni)', en: 'Nickel' }, specThreshold: 1.0e9 },
    { element: 'Cr', name: { zh: '鉻 (Cr)', en: 'Chromium' }, specThreshold: 2.0e9 },
    { element: 'Ca', name: { zh: '鈣 (Ca)', en: 'Calcium' }, specThreshold: 5.0e9 },
    { element: 'Na', name: { zh: '鈉 (Na)', en: 'Sodium' }, specThreshold: 5.0e9 }
  ],

  /**
   * Evaluate risk level based on AMC concentration and exposure time.
   * @param {string} categoryId - e.g. 'cat_b_bases'
   * @param {number} concentrationPpb - Measured air concentration in ppb
   * @param {number} exposureHours - Wafer queue exposure time
   * @returns {{ riskLevel: 'safe' | 'warning' | 'critical', defectProbability: number, recommendedAction: { zh: string, en: string } }}
   */
  evaluateAmcRisk(categoryId, concentrationPpb, exposureHours = 2) {
    const cat = this.amcCategories.find(c => c.id === categoryId) || this.amcCategories[0];
    const doseRatio = (concentrationPpb / cat.targetPpb) * (exposureHours / 1.0);

    let riskLevel = 'safe';
    let defectProbability = 0.01;

    if (concentrationPpb >= cat.alarmPpb || doseRatio > 4.0) {
      riskLevel = 'critical';
      defectProbability = Math.min(0.95, 0.25 + 0.15 * doseRatio);
    } else if (concentrationPpb > cat.targetPpb || doseRatio > 1.5) {
      riskLevel = 'warning';
      defectProbability = Math.min(0.40, 0.05 + 0.08 * doseRatio);
    }

    return {
      riskLevel,
      defectProbability: Number(defectProbability.toFixed(3)),
      recommendedAction: cat.mitigationAction
    };
  },

  /**
   * Evaluate TXRF surface metal cleanliness against 3nm spec limits.
   * @param {Record<string, number>} readings - Map of element to measured atoms/cm^2
   * @returns {{ pass: boolean, outOfSpecElements: string[], worstRatio: number }}
   */
  evaluateTxrfSurfaceMetals(readings) {
    const outOfSpecElements = [];
    let worstRatio = 0.0;

    this.metalsTxrfSpec.forEach(spec => {
      const val = readings[spec.element] || 0;
      const ratio = val / spec.specThreshold;
      if (ratio > worstRatio) worstRatio = ratio;
      if (val > spec.specThreshold) {
        outOfSpecElements.push(spec.element);
      }
    });

    return {
      pass: outOfSpecElements.length === 0,
      outOfSpecElements,
      worstRatio: Number(worstRatio.toFixed(2))
    };
  }
};
