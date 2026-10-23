/**
 * litho-kinetics-data.js - Lithography PEB & Mack-4 Development Kinetics Engine
 *
 * Simulates:
 * 1. Chemically Amplified Resist (CAR) post-exposure bake (PEB) acid diffusion:
 *    sigma = sqrt(2 * D_acid * t_peb), where D_acid = D_0 * exp(-E_a / (k_B * T))
 * 2. Mack-4 Development Kinetics Rate Model:
 *    R(M) = R_max * ((a + 1) * (1 - M)^n) / (a + (1 - M)^n) + R_min
 * 3. Resist Sidewall Profile, Contrast Gamma, and Critical Dimension (CD) Sensitivity
 *
 * Complies with Rule 0003 (Cleanroom Light Theme) and Rule 0013 (Strict ASCII filename).
 */

export const LITHO_KINETICS_DATA = {
  version: '2.9.0',
  resistModels: [
    {
      id: 'arfi_car_pos',
      name: { zh: '193nm 浸潤式正型 CAR 光阻', en: '193nm ArFi Positive CAR' },
      d0: 0.002, // cm^2/s (~12.5nm diffusion length)
      ea: 0.85, // eV activation energy
      deblockingEa: 0.82, // eV
      mack4: {
        rMax: 120.0, // nm/s
        rMin: 0.02,  // nm/s
        n: 4.8,      // development selectivity
        mTh: 0.45    // threshold inhibitor
      },
      typicalThicknessNm: 85,
      contrastGamma: 14.5
    },
    {
      id: 'euv_car_pos',
      name: { zh: '0.33NA EUV 化學增幅光阻', en: '0.33NA EUV Positive CAR' },
      d0: 0.0008, // cm^2/s (~5.5nm diffusion length)
      ea: 0.90, // eV
      deblockingEa: 0.88, // eV
      mack4: {
        rMax: 180.0,
        rMin: 0.05,
        n: 6.2,
        mTh: 0.50
      },
      typicalThicknessNm: 35,
      contrastGamma: 18.2
    },
    {
      id: 'euv_mor_neg',
      name: { zh: 'High-NA EUV 金屬氧化物負型光阻 (MOR)', en: 'High-NA EUV Metal-Oxide Negative Resist (MOR)' },
      d0: 0.0001, // nm-scale ultra-low diffusion (~1.8nm)
      ea: 0.98, // eV
      deblockingEa: 0.92, // eV
      mack4: {
        rMax: 95.0,
        rMin: 0.01,
        n: 7.5,
        mTh: 0.60
      },
      typicalThicknessNm: 20,
      contrastGamma: 22.0
    }
  ],

  /**
   * Calculate acid diffusion length during PEB.
   * @param {number} tempC - Temperature in Celsius (e.g. 100 - 130)
   * @param {number} timeSec - Bake time in seconds (e.g. 45 - 90)
   * @param {string} resistId - Model ID
   * @returns {{ dAcidCm2S: number, diffusionLengthNm: number, deblockFraction: number }}
   */
  calculatePebDiffusion(tempC, timeSec, resistId = 'arfi_car_pos') {
    const model = this.resistModels.find(m => m.id === resistId) || this.resistModels[0];
    const kB = 8.617333e-5; // eV/K
    const tempK = tempC + 273.15;
    
    // Diffusion coefficient in cm^2/s
    const dAcidCm2S = model.d0 * Math.exp(-model.ea / (kB * tempK));
    // Convert to nm^2/s: 1 cm^2 = 1e14 nm^2
    const dAcidNm2S = dAcidCm2S * 1e14;
    // Characteristic 1D diffusion length sigma = sqrt(2 * D * t)
    const diffusionLengthNm = Math.sqrt(2 * dAcidNm2S * Math.max(0, timeSec));

    // Deblocking rate approximation: reaction frequency factor ~ 1e11 s^-1
    const kDeblock = 1.0e11 * Math.exp(-model.deblockingEa / (kB * tempK));
    const deblockFraction = Math.min(0.999, 1 - Math.exp(-kDeblock * timeSec * 0.01));

    return {
      dAcidCm2S,
      diffusionLengthNm: Number(diffusionLengthNm.toFixed(3)),
      deblockFraction: Number(deblockFraction.toFixed(4))
    };
  },

  /**
   * Calculate Mack-4 development rate R(M).
   * @param {number} normalizedInhibitor - M parameter from 0.0 (fully exposed) to 1.0 (unexposed)
   * @param {string} resistId - Model ID
   * @returns {{ rateNmS: number, normalizedRate: number }}
   */
  calculateMack4Rate(normalizedInhibitor, resistId = 'arfi_car_pos') {
    const model = this.resistModels.find(m => m.id === resistId) || this.resistModels[0];
    const { rMax, rMin, n, mTh } = model.mack4;
    const M = Math.max(0, Math.min(1, normalizedInhibitor));

    // Mack-4 parameter 'a'
    const a = ((n + 1) / (n - 1)) * Math.pow(1 - mTh, n);
    const top = (a + 1) * Math.pow(1 - M, n);
    const btm = a + Math.pow(1 - M, n);
    const rateNmS = rMax * (top / Math.max(1e-9, btm)) + rMin;

    return {
      rateNmS: Number(rateNmS.toFixed(3)),
      normalizedRate: Number((rateNmS / rMax).toFixed(4))
    };
  },

  /**
   * Estimate sidewall angle and final CD based on dose and bake.
   * @param {number} doseMilliJoule - Exposure dose in mJ/cm^2
   * @param {number} tempC - PEB temp
   * @param {number} devTimeSec - Development time in seconds
   * @param {string} resistId - Model ID
   * @returns {{ sidewallAngleDeg: number, targetCdNm: number, actualCdNm: number, cdBiasNm: number }}
   */
  evaluateResistProfile(doseMilliJoule, tempC, devTimeSec, resistId = 'arfi_car_pos') {
    const peb = this.calculatePebDiffusion(tempC, 60, resistId);
    const targetCdNm = resistId.includes('euv') ? 16 : 40;
    
    // Dose nominal is ~25 mJ/cm^2 for ArFi, ~45 mJ/cm^2 for EUV
    const nominalDose = resistId.includes('euv') ? 45 : 25;
    const doseRatio = doseMilliJoule / nominalDose;

    // CD varies inversely with dose for positive CAR
    const cdBiasNm = (1 - doseRatio) * 12 + (peb.diffusionLengthNm - 5.0) * 0.8;
    const actualCdNm = Math.max(2, targetCdNm + cdBiasNm);

    // Sidewall angle: higher contrast & lower diffusion gives steeper sidewalls (> 88 deg)
    const baseAngle = 89.2;
    const diffusionPenalty = Math.max(0, (peb.diffusionLengthNm - 4.0) * 0.45);
    const devPenalty = Math.abs(devTimeSec - 60) * 0.05;
    const sidewallAngleDeg = Math.min(90, Math.max(75, baseAngle - diffusionPenalty - devPenalty));

    return {
      sidewallAngleDeg: Number(sidewallAngleDeg.toFixed(2)),
      targetCdNm,
      actualCdNm: Number(actualCdNm.toFixed(2)),
      cdBiasNm: Number(cdBiasNm.toFixed(2))
    };
  }
};
