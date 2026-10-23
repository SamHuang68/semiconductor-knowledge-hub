/**
 * imc-growth-data.js - Micro-bump Intermetallic Compound (IMC) Kinetics & Kirkendall Void Engine
 *
 * Simulates:
 * 1. Copper-Tin (Cu-Sn) and Nickel-Tin (Ni-Sn) IMC phase formation:
 *    - Cu6Sn5 (eta-phase scallop crystals)
 *    - Cu3Sn (epsilon-phase planar layer)
 * 2. Arrhenius Diffusion Growth Kinetics:
 *    X(t) = sqrt(X0^2 + K0 * exp(-Q / (R * T)) * t)
 * 3. Kirkendall Voiding induced by differential diffusion flux (J_Cu >> J_Sn)
 * 4. Ultra-fine Pitch (< 15 um) Microbump Full Sn Consumption Risk
 *
 * Complies with Rule 0003 (Cleanroom Light Theme) and Rule 0013 (Strict ASCII filename).
 */

export const IMC_GROWTH_DATA = {
  version: '2.9.0',
  metallurgies: [
    {
      id: 'cu_sn_standard',
      name: { zh: 'Cu / Sn-Ag 微凸塊系統', en: 'Cu / Sn-Ag Standard Micro-bump' },
      k0Um2Hr: 3.2e7, // Pre-exponential factor
      activationEnergyQ: 75.0, // kJ/mol
      phases: ['Cu6Sn5', 'Cu3Sn'],
      kirkendallVoidPropensity: 'high',
      description: {
        zh: '高溫固態老化時，Cu3Sn 層內產生微觀柯肯達爾孔洞，顯著降低落下撞擊 (Drop Test) 壽命',
        en: 'Pronounced Kirkendall void formation inside Cu3Sn layer under thermal aging'
      }
    },
    {
      id: 'cu_ni_sn_barrier',
      name: { zh: 'Cu / Ni / Sn-Ag 阻擋層系統', en: 'Cu / Ni / Sn-Ag Barrier Micro-bump' },
      k0Um2Hr: 8.5e6,
      activationEnergyQ: 88.0,
      phases: ['(Cu,Ni)6Sn5', 'Ni3Sn4'],
      kirkendallVoidPropensity: 'very_low',
      description: {
        zh: 'Ni 阻擋層使 IMC 生長速率降低 3~5 倍，有效抑制 Kirkendall 孔洞與過度脆裂',
        en: 'Ni barrier reduces IMC growth rate by 3-5x and halts Kirkendall voiding'
      }
    },
    {
      id: 'cu_cu_hybrid_bond',
      name: { zh: 'Cu-Cu 直接混合鍵合 (TSMC SoIC)', en: 'Cu-Cu Direct Hybrid Bonding (SoIC)' },
      k0Um2Hr: 1.1e5,
      activationEnergyQ: 105.0, // High activation energy for direct solid-state grain boundary diffusion
      phases: ['Direct Cu-Cu Grain Boundary Interlocking'],
      kirkendallVoidPropensity: 'none',
      description: {
        zh: '無錫 (Solder-less) 固相反應，完全消除低熔點錫與 IMC 脆性破壞風險',
        en: 'Zero-solder solid state diffusion completely immune to IMC embrittlement'
      }
    }
  ],

  /**
   * Calculate total IMC thickness after thermal exposure.
   * @param {number} tempC - Temperature in Celsius (e.g. 125, 150, 175 C for HTS)
   * @param {number} agingHours - Thermal aging duration in hours
   * @param {string} metallurgyId - Metallurgy identifier
   * @param {number} initialImcUm - As-reflowed IMC thickness (e.g. 0.5 to 1.0 um)
   * @returns {{ imcThicknessUm: number, cu6sn5Um: number, cu3snUm: number }}
   */
  calculateImcThickness(tempC, agingHours, metallurgyId = 'cu_sn_standard', initialImcUm = 0.8) {
    const met = this.metallurgies.find(m => m.id === metallurgyId) || this.metallurgies[0];
    const R = 8.314e-3; // kJ / (mol * K)
    const tempK = tempC + 273.15;

    // Rate constant K = K0 * exp(-Q / (R * T)) in um^2 / hr
    const rateConstant = met.k0Um2Hr * Math.exp(-met.activationEnergyQ / (R * tempK));
    
    // Diffusion controlled parabolic growth: X = sqrt(X0^2 + K * t)
    const imcThicknessUm = Math.sqrt(Math.pow(initialImcUm, 2) + rateConstant * Math.max(0, agingHours));

    // Phase distribution: for Cu-Sn, Cu6Sn5 forms ~65%, Cu3Sn forms ~35%
    const cu6sn5Um = imcThicknessUm * (metallurgyId === 'cu_sn_standard' ? 0.65 : 0.85);
    const cu3snUm = imcThicknessUm - cu6sn5Um;

    return {
      imcThicknessUm: Number(imcThicknessUm.toFixed(2)),
      cu6sn5Um: Number(cu6sn5Um.toFixed(2)),
      cu3snUm: Number(cu3snUm.toFixed(2))
    };
  },

  /**
   * Evaluate whether microbump solder is completely consumed by IMC.
   * @param {number} bumpHeightUm - e.g. 10 um for micro-bump
   * @param {number} imcThicknessUm - Measured IMC
   * @returns {{ isFullyConsumed: boolean, residualSolderUm: number, consumptionPercentage: number }}
   */
  evaluateMicrobumpConsumption(bumpHeightUm, imcThicknessUm) {
    // 1 um of Cu6Sn5/Cu3Sn consumes approximately 0.75 um of pure Sn solder
    const solderConsumedUm = imcThicknessUm * 0.75;
    const residualSolderUm = Math.max(0, bumpHeightUm - solderConsumedUm);
    const consumptionPercentage = Math.min(100, (solderConsumedUm / Math.max(0.1, bumpHeightUm)) * 100);

    return {
      isFullyConsumed: residualSolderUm <= 0.2,
      residualSolderUm: Number(residualSolderUm.toFixed(2)),
      consumptionPercentage: Number(consumptionPercentage.toFixed(1))
    };
  },

  /**
   * Evaluate Kirkendall void formation risk in Cu3Sn layer.
   * @param {number} agingHours - Aging time
   * @param {number} tempC - Aging temperature
   * @returns {{ voidDensityRisk: 'negligible' | 'moderate' | 'critical', shearStrengthRetentionPercent: number }}
   */
  evaluateKirkendallVoidRisk(agingHours, tempC) {
    const hours = Math.max(0, agingHours);
    // Voids accelerate above 125 C and > 500 hours
    const thermalStressMetric = (tempC / 150.0) * Math.sqrt(hours / 500.0);

    let voidDensityRisk = 'negligible';
    let shearStrengthRetentionPercent = 100;

    if (thermalStressMetric > 1.8) {
      voidDensityRisk = 'critical';
      shearStrengthRetentionPercent = Math.max(30, 100 - (thermalStressMetric - 1.8) * 45);
    } else if (thermalStressMetric > 0.8) {
      voidDensityRisk = 'moderate';
      shearStrengthRetentionPercent = Math.max(70, 100 - (thermalStressMetric - 0.8) * 30);
    }

    return {
      voidDensityRisk,
      shearStrengthRetentionPercent: Number(shearStrengthRetentionPercent.toFixed(1))
    };
  }
};
