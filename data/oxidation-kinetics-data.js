/**
 * oxidation-kinetics-data.js - Silicon Thermal Oxidation Deal-Grove & Massoud Kinetics
 *
 * Simulates:
 * 1. Deal-Grove Classical Model:
 *    x_ox^2 + A * x_ox = B * (t + tau)
 *    Linear regime: x_ox ~ (B/A) * (t + tau) (interface reaction limited)
 *    Parabolic regime: x_ox^2 ~ B * t (diffusion limited)
 * 2. Dry O2 vs. Wet H2O Arrhenius temperature kinetics
 * 3. Wafer orientation effect: (111) linear rate is ~1.68x faster than (100)
 * 4. Massoud early-stage thin-oxide enhancement (< 25 nm)
 *
 * Complies with Rule 0003 (Cleanroom Light Theme) and Rule 0013 (Strict ASCII filename).
 */

export const OXIDATION_KINETICS_DATA = {
  version: '2.9.0',
  ambients: [
    {
      id: 'dry_o2',
      name: { zh: '乾氧氧化 (Dry O2)', en: 'Dry Oxygen (Dry O2)' },
      // Parabolic B = B0 * exp(-Eb / (kB * T))
      b0: 214.0, // um^2 / hr
      eb: 1.24,  // eV
      // Linear (B/A) = (B/A)0 * exp(-Eba / (kB * T))
      ba0: 3.71e5, // um / hr
      eba: 2.00,   // eV
      tauDefaultMin: 20, // initial rapid stage equivalent time
      massoudC1: 0.85,   // Massoud rate enhancement pre-factor
      massoudL1Nm: 1.8   // decay length in nm
    },
    {
      id: 'wet_h2o',
      name: { zh: '水氣濕氧氧化 (Wet H2O / Steam)', en: 'Wet Steam (Wet H2O)' },
      b0: 386.0,
      eb: 0.78, // lower activation energy due to high OH- solubility
      ba0: 1.63e6,
      eba: 1.95,
      tauDefaultMin: 0,
      massoudC1: 0.15,
      massoudL1Nm: 1.0
    }
  ],

  /**
   * Calculate Deal-Grove rate constants for temperature.
   * @param {number} tempC - Furnace temperature in Celsius (800 - 1200)
   * @param {string} ambientId - 'dry_o2' or 'wet_h2o'
   * @param {string} orientation - '(100)' or '(111)'
   * @returns {{ B_um2_hr: number, BA_um_hr: number, A_um: number }}
   */
  getRateConstants(tempC, ambientId = 'dry_o2', orientation = '(100)') {
    const amb = this.ambients.find(a => a.id === ambientId) || this.ambients[0];
    const kB = 8.617333e-5; // eV/K
    const tempK = tempC + 273.15;

    const B = amb.b0 * Math.exp(-amb.eb / (kB * tempK));
    let BA = amb.ba0 * Math.exp(-amb.eba / (kB * tempK));

    // Orientation factor: (111) has higher dangling bond density than (100)
    if (orientation === '(111)') {
      BA *= 1.68;
    }

    const A = B / BA;
    return { B_um2_hr: B, BA_um_hr: BA, A_um: A };
  },

  /**
   * Calculate oxide thickness for given oxidation time.
   * Solves quadratic equation: x^2 + A * x - B * (t + tau) = 0
   * @param {number} tempC - Temperature in Celsius
   * @param {number} timeMin - Oxidation time in minutes
   * @param {string} ambientId - Ambient
   * @param {string} orientation - Silicon wafer orientation
   * @param {number} initialOxideNm - Native oxide or pre-existing oxide
   * @returns {{ thicknessNm: number, regime: 'linear' | 'transition' | 'parabolic' }}
   */
  calculateDealGroveThickness(tempC, timeMin, ambientId = 'dry_o2', orientation = '(100)', initialOxideNm = 2.0) {
    const amb = this.ambients.find(a => a.id === ambientId) || this.ambients[0];
    const { B_um2_hr, A_um } = this.getRateConstants(tempC, ambientId, orientation);

    const xi_um = initialOxideNm * 1e-3;
    // Equivalent initial time tau = (xi^2 + A * xi) / B
    const tauHr = (xi_um * xi_um + A_um * xi_um) / B_um2_hr;
    const totalTimeHr = (timeMin / 60.0) + tauHr;

    // x = (-A + sqrt(A^2 + 4 * B * (t + tau))) / 2
    const discriminant = A_um * A_um + 4 * B_um2_hr * totalTimeHr;
    let x_um = (-A_um + Math.sqrt(discriminant)) / 2.0;

    // Massoud enhancement correction for thin dry oxide (< 25 nm)
    if (ambientId === 'dry_o2' && x_um < 0.025) {
      const extraNm = amb.massoudC1 * (1 - Math.exp(-(x_um * 1000) / amb.massoudL1Nm));
      x_um += extraNm * 1e-3;
    }

    const thicknessNm = x_um * 1000;

    let regime = 'transition';
    if (x_um < 0.05 * A_um) {
      regime = 'linear';
    } else if (x_um > 2.0 * A_um) {
      regime = 'parabolic';
    }

    return {
      thicknessNm: Number(thicknessNm.toFixed(2)),
      regime
    };
  },

  /**
   * Calculate required oxidation time to reach target thickness.
   * @param {number} targetThicknessNm - Target oxide in nm
   * @param {number} tempC - Furnace temperature
   * @param {string} ambientId - Ambient
   * @param {string} orientation - Orientation
   * @returns {{ requiredTimeMin: number }}
   */
  getOxidationTimeForTarget(targetThicknessNm, tempC, ambientId = 'dry_o2', orientation = '(100)') {
    const { B_um2_hr, A_um } = this.getRateConstants(tempC, ambientId, orientation);
    const x_um = targetThicknessNm * 1e-3;
    const xi_um = 0.002; // 2nm native oxide
    const tauHr = (xi_um * xi_um + A_um * xi_um) / B_um2_hr;

    const tHr = ((x_um * x_um + A_um * x_um) / B_um2_hr) - tauHr;
    const requiredTimeMin = Math.max(0, tHr * 60);

    return {
      requiredTimeMin: Number(requiredTimeMin.toFixed(1))
    };
  }
};
