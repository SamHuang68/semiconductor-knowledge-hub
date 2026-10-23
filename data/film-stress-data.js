/**
 * film-stress-data.js - Thin Film Stress, Thermal Mismatch & Delamination Risk Engine
 *
 * Simulates:
 * 1. Total Film Stress:
 *    sigma_tot = sigma_intrinsic + sigma_thermal
 *    sigma_thermal = [E_f / (1 - nu_f)] * (alpha_sub - alpha_film) * (T_dep - T_room)
 * 2. Delamination Energy Release Rate (Fracture Mechanics):
 *    G = Z * (sigma_tot^2 * h_f) / E'_f
 *    Risk criterion: G >= G_c (Critical Adhesion Energy Release Rate)
 * 3. Multi-layer IMD Cu / Low-k peeling threshold analysis.
 *
 * Complies with Rule 0003 (Cleanroom Light Theme) and Rule 0013 (Strict ASCII filename).
 */

export const FILM_STRESS_DATA = {
  version: '2.9.0',
  films: [
    {
      id: 'teos_oxide',
      name: { zh: 'PECVD TEOS 氧化矽 (SiO2)', en: 'PECVD TEOS Silicon Oxide' },
      youngsModulusGpa: 72,
      poissonsRatio: 0.17,
      ctePpm: 0.5, // 0.5e-6 /K
      typicalIntrinsicMpa: -120, // Compressive (<0)
      gcJouleM2: 8.5 // Critical adhesion energy to Si
    },
    {
      id: 'si3n4_sin',
      name: { zh: 'LPCVD 氮化矽 (Si3N4 應變膜)', en: 'LPCVD Silicon Nitride (Tensile/Cap)' },
      youngsModulusGpa: 280,
      poissonsRatio: 0.25,
      ctePpm: 3.2,
      typicalIntrinsicMpa: 850, // Highly Tensile (>0)
      gcJouleM2: 5.2
    },
    {
      id: 'ti_tin_barrier',
      name: { zh: 'PVD 鈦/氮化鈦 (Ti/TiN 擴散阻擋層)', en: 'PVD Ti/TiN Diffusion Barrier' },
      youngsModulusGpa: 350,
      poissonsRatio: 0.25,
      ctePpm: 9.4,
      typicalIntrinsicMpa: 1200, // Very High Tensile
      gcJouleM2: 4.0
    },
    {
      id: 'cu_seed_metal',
      name: { zh: '電鍍銅 (Electroplated Cu Metal)', en: 'Electroplated Copper Metal' },
      youngsModulusGpa: 110,
      poissonsRatio: 0.34,
      ctePpm: 16.5,
      typicalIntrinsicMpa: 50,
      gcJouleM2: 7.0
    },
    {
      id: 'low_k_dielectric',
      name: { zh: '多孔性低介電常數薄膜 (Porous Low-k / SiCOH)', en: 'Porous Low-k Dielectric (SiCOH)' },
      youngsModulusGpa: 9.5,
      poissonsRatio: 0.22,
      ctePpm: 12.0,
      typicalIntrinsicMpa: -40,
      gcJouleM2: 2.1 // Fragile, highly susceptible to peeling
    }
  ],

  substrates: {
    si_wafer: {
      name: { zh: '單晶矽晶圓 (Si Wafer)', en: 'Single-Crystal Silicon Wafer' },
      youngsModulusGpa: 130,
      poissonsRatio: 0.28,
      ctePpm: 2.6
    }
  },

  /**
   * Calculate total stress composed of intrinsic and thermal mismatch.
   * @param {string} filmId - Film identifier
   * @param {number} thicknessNm - Film thickness in nm
   * @param {number} tDepC - Deposition temperature in Celsius (e.g. 350 - 400)
   * @param {number} tMeasureC - Current ambient temp in Celsius (usually 25)
   * @returns {{ totalStressMpa: number, thermalStressMpa: number, intrinsicStressMpa: number, stressType: 'compressive' | 'tensile' }}
   */
  calculateCompositeStress(filmId, thicknessNm, tDepC = 350, tMeasureC = 25) {
    const film = this.films.find(f => f.id === filmId) || this.films[0];
    const sub = this.substrates.si_wafer;

    // Biaxial modulus E' = E / (1 - nu)
    const biaxialModulusGpa = film.youngsModulusGpa / (1 - film.poissonsRatio);
    // Delta CTE in 1/K: (alpha_sub - alpha_film)
    const deltaCte = (sub.ctePpm - film.ctePpm) * 1e-6;
    // Delta T = (T_dep - T_measure)
    const deltaT = tDepC - tMeasureC;

    // Thermal stress: sigma_th = E' * delta_alpha * delta_T
    // Gpa * deltaCte * deltaT -> 1 GPa = 1000 MPa
    const thermalStressMpa = biaxialModulusGpa * 1000 * deltaCte * deltaT;

    // Intrinsic stress (thickness relaxation factor)
    const thicknessFactor = Math.pow(Math.max(10, thicknessNm) / 100, -0.15);
    const intrinsicStressMpa = film.typicalIntrinsicMpa * thicknessFactor;

    const totalStressMpa = intrinsicStressMpa + thermalStressMpa;
    const stressType = totalStressMpa < 0 ? 'compressive' : 'tensile';

    return {
      totalStressMpa: Number(totalStressMpa.toFixed(1)),
      thermalStressMpa: Number(thermalStressMpa.toFixed(1)),
      intrinsicStressMpa: Number(intrinsicStressMpa.toFixed(1)),
      stressType
    };
  },

  /**
   * Evaluate delamination and film cracking risk by Griffith energy release rate G.
   * @param {string} filmId - Film identifier
   * @param {number} thicknessNm - Thickness in nm
   * @param {number} tDepC - Deposition temp
   * @returns {{ energyReleaseRateG: number, gcCritical: number, safetyFactor: number, riskLevel: 'low' | 'moderate' | 'high' | 'critical' }}
   */
  evaluateDelaminationRisk(filmId, thicknessNm, tDepC = 350) {
    const film = this.films.find(f => f.id === filmId) || this.films[0];
    const stress = this.calculateCompositeStress(filmId, thicknessNm, tDepC, 25);
    
    const hM = thicknessNm * 1e-9;
    const sigmaPa = Math.abs(stress.totalStressMpa) * 1e6;
    const ePrimePa = (film.youngsModulusGpa / (1 - Math.pow(film.poissonsRatio, 2))) * 1e9;

    // Z dimensionless factor ~ 1.25 for edge channel crack/peeling
    const Z = 1.25;
    // Energy release rate G = Z * (sigma^2 * h) / E'
    const energyReleaseRateG = (Z * Math.pow(sigmaPa, 2) * hM) / Math.max(1.0, ePrimePa);
    const gcCritical = film.gcJouleM2;

    const safetyFactor = Number((gcCritical / Math.max(1e-6, energyReleaseRateG)).toFixed(2));

    let riskLevel = 'low';
    if (safetyFactor < 1.0) {
      riskLevel = 'critical'; // Spontaneous peeling or cracking
    } else if (safetyFactor < 2.0) {
      riskLevel = 'high';
    } else if (safetyFactor < 3.5) {
      riskLevel = 'moderate';
    }

    return {
      energyReleaseRateG: Number(energyReleaseRateG.toFixed(3)),
      gcCritical,
      safetyFactor,
      riskLevel
    };
  }
};
