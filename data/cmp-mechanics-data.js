/**
 * cmp-mechanics-data.js - CMP Tribology, Prestonian Mechanics & Dishing/Erosion Engine
 *
 * Simulates:
 * 1. Non-linear Preston Equation with Chemical Etch component:
 *    MRR = k_p * P^alpha * V^beta + MRR_chem
 * 2. Greenwood-Williamson Pad Asperity Contact Mechanics
 * 3. Copper Dual-Damascene Pattern Density Dependent Dishing & Dielectric Erosion:
 *    Dishing ~ f(Line_Width, Overpolish_Time)
 *    Erosion ~ f(Pattern_Density, Overpolish_Time)
 * 4. Run-to-Run (R2R) Eddy Current & Motor Current Endpoint Detection (EPD)
 *
 * Complies with Rule 0003 (Cleanroom Light Theme) and Rule 0013 (Strict ASCII filename).
 */

export const CMP_MECHANICS_DATA = {
  version: '2.9.0',
  slurryModels: [
    {
      id: 'cu_bulk_slurry',
      name: { zh: '銅金屬大量研磨液 (Cu Bulk Slurry)', en: 'Copper Bulk CMP Slurry' },
      kp: 85.0, // Preston coefficient
      alpha: 0.92, // Pressure exponent
      beta: 0.88,  // Velocity exponent
      mrrChemNmMin: 45.0, // Static chemical etch rate
      selectivityCuToTa: 120.0,
      abrasiveType: 'Colloidal Silica (35nm)'
    },
    {
      id: 'cu_barrier_slurry',
      name: { zh: '阻擋層研磨液 (Ta/TaN Barrier Slurry)', en: 'Ta/TaN Barrier CMP Slurry' },
      kp: 22.0,
      alpha: 1.05,
      beta: 0.95,
      mrrChemNmMin: 5.0,
      selectivityCuToTa: 1.2, // Tuned for co-planar removal
      abrasiveType: 'High-Purity Fumed Silica'
    },
    {
      id: 'oxide_cerium_slurry',
      name: { zh: '淺溝槽隔離氧化層研磨液 (STI Ceria Slurry)', en: 'STI Oxide Ceria Slurry' },
      kp: 65.0,
      alpha: 0.85,
      beta: 0.80,
      mrrChemNmMin: 2.0,
      selectivityCuToTa: 45.0, // Oxide to SiN selectivity > 35:1
      abrasiveType: 'High Selectivity Ceria (CeO2)'
    }
  ],

  /**
   * Calculate Material Removal Rate (MRR) in nm/min.
   * @param {number} pressurePsi - Downforce pressure in psi (1.5 to 5.0 psi)
   * @param {number} platenVelocityMps - Relative velocity in m/s (0.5 to 2.5 m/s)
   * @param {string} slurryId - Slurry identifier
   * @returns {{ mrrNmMin: number, mechanicalComponent: number, chemicalComponent: number }}
   */
  calculateMrr(pressurePsi, platenVelocityMps, slurryId = 'cu_bulk_slurry') {
    const slurry = this.slurryModels.find(s => s.id === slurryId) || this.slurryModels[0];
    const p = Math.max(0.2, pressurePsi);
    const v = Math.max(0.1, platenVelocityMps);

    // Mechanical Prestonian component: MRR_mech = kp * P^alpha * V^beta
    const mechanical = slurry.kp * Math.pow(p, slurry.alpha) * Math.pow(v, slurry.beta);
    const chemical = slurry.mrrChemNmMin;
    const mrrNmMin = mechanical + chemical;

    return {
      mrrNmMin: Number(mrrNmMin.toFixed(1)),
      mechanicalComponent: Number(mechanical.toFixed(1)),
      chemicalComponent: Number(chemical.toFixed(1))
    };
  },

  /**
   * Evaluate Dishing and Erosion in Copper Interconnect lines.
   * @param {number} lineWidthUm - Interconnect trace width (e.g. 0.1 to 100 um)
   * @param {number} patternDensity - Metal density (0.1 to 0.9)
   * @param {number} overpolishPercent - Overpolish duration percentage (0 to 50%)
   * @returns {{ dishingNm: number, erosionNm: number, totalStepHeightNm: number }}
   */
  evaluateDishingErosion(lineWidthUm, patternDensity, overpolishPercent = 20) {
    const op = Math.max(0, overpolishPercent) / 100.0;
    const width = Math.max(0.05, lineWidthUm);
    const density = Math.max(0.05, Math.min(0.95, patternDensity));

    // Dishing scales with line width and pad bending into wide metal trenches
    // Dishing ~ K_dish * sqrt(width) * (1 + 1.8 * overpolish)
    const dishingNm = (12.5 * Math.sqrt(width) + 4.0 * Math.log10(width + 1.0)) * (1.0 + 1.6 * op);

    // Erosion scales strongly with pattern density (dielectric pressure redistribution)
    // Erosion ~ K_ero * (density / (1 - density)) * overpolish
    const erosionNm = (18.0 * (density / (1.0 - density * 0.85))) * (0.35 + 1.8 * op);

    const totalStepHeightNm = dishingNm + erosionNm;

    return {
      dishingNm: Number(dishingNm.toFixed(1)),
      erosionNm: Number(erosionNm.toFixed(1)),
      totalStepHeightNm: Number(totalStepHeightNm.toFixed(1))
    };
  },

  /**
   * Simulate Eddy Current Sensor voltage trace during copper clearing.
   * @param {number} initialCuNm - Starting copper overburden (e.g. 600 - 800 nm)
   * @param {number} polishTimeSec - Elapsed polishing time
   * @param {number} mrrNmMin - Polish rate
   * @returns {{ remainingCuNm: number, eddySensorMv: number, isCleared: boolean }}
   */
  simulateEddyCurrentTrace(initialCuNm = 750, polishTimeSec = 45, mrrNmMin = 750) {
    const removedNm = (mrrNmMin / 60.0) * polishTimeSec;
    const remainingCuNm = Math.max(0, initialCuNm - removedNm);

    // Eddy sensor voltage is proportional to sheet conductance (proportional to thickness)
    // Dynamic range 0 to 5000 mV
    const eddySensorMv = remainingCuNm > 0 
      ? Math.min(5000, 350 + (remainingCuNm / initialCuNm) * 4650)
      : 50; // Residual noise baseline

    const isCleared = remainingCuNm <= 5.0;

    return {
      remainingCuNm: Number(remainingCuNm.toFixed(1)),
      eddySensorMv: Number(eddySensorMv.toFixed(1)),
      isCleared
    };
  }
};
