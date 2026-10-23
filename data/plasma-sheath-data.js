/**
 * plasma-sheath-data.js - Plasma Sheath Dynamics & IEDF/IADF Simulator
 *
 * Simulates:
 * 1. Bohm Sheath Criterion & Child-Langmuir Sheath thickness:
 *    u_B = sqrt(e * Te / M_i), s_sheath ~ lambda_D * (2 * e * V / (k_B * Te))^(3/4)
 * 2. Dual-Frequency RF (DF-CCP):
 *    Source frequency (60 MHz) decupled from bias frequency (2 MHz)
 * 3. Ion Energy Distribution Function (IEDF) bimodal peak splitting:
 *    Delta E_ion ~ (2 * e * V_rf) / (omega_bias * tau_ion)
 * 4. High Aspect Ratio Contact (HARC) Bowing & ARDE (Microloading)
 *
 * Complies with Rule 0003 (Cleanroom Light Theme) and Rule 0013 (Strict ASCII filename).
 */

export const PLASMA_SHEATH_DATA = {
  version: '2.9.0',
  gases: [
    { id: 'ar', name: { zh: '氬氣 (Ar)', en: 'Argon (Ar)' }, atomicMassAmu: 39.95, ionCharge: 1 },
    { id: 'cf4', name: { zh: '四氟化碳 (CF4 / CF3+)', en: 'Carbon Tetrafluoride (CF3+)' }, atomicMassAmu: 69.0, ionCharge: 1 },
    { id: 'c4f8', name: { zh: '八氟環丁烷 (C4F8 / C2F4+)', en: 'Octafluorocyclobutane' }, atomicMassAmu: 100.0, ionCharge: 1 },
    { id: 'o2', name: { zh: '氧氣 (O2+)', en: 'Oxygen (O2+)' }, atomicMassAmu: 32.0, ionCharge: 1 },
    { id: 'cl2', name: { zh: '氯氣 (Cl2+)', en: 'Chlorine (Cl2+)' }, atomicMassAmu: 70.9, ionCharge: 1 }
  ],

  /**
   * Calculate Bohm velocity and sheath thickness.
   * @param {number} teEv - Electron temperature in eV (e.g. 2 - 5)
   * @param {number} neCm3 - Plasma density in cm^-3 (e.g. 1e10 - 1e12)
   * @param {number} vBiasV - RF bias voltage in Volts (e.g. 100 - 1500)
   * @param {string} gasId - Gas identifier
   * @returns {{ bohmVelocityMS: number, debyeLengthUm: number, sheathThicknessMm: number }}
   */
  calculateSheathProperties(teEv, neCm3, vBiasV, gasId = 'ar') {
    const gas = this.gases.find(g => g.id === gasId) || this.gases[0];
    const e = 1.602e-19; // Coulomb
    const eps0 = 8.854e-12; // F/m
    const amuKg = 1.6605e-27;
    const ionMassKg = gas.atomicMassAmu * amuKg;
    const neM3 = neCm3 * 1e6;

    // Bohm velocity: u_B = sqrt(e * Te / M_i)
    const bohmVelocityMS = Math.sqrt((e * teEv) / ionMassKg);

    // Debye length: lambda_D = sqrt(eps0 * Te_eV / (e * ne))
    const debyeLengthM = Math.sqrt((eps0 * teEv) / (e * neM3));
    const debyeLengthUm = debyeLengthM * 1e6;

    // Child-Langmuir sheath thickness: s = (sqrt(2)/3) * lambda_D * (2 * V_bias / Te)^(3/4)
    const normalizedV = Math.max(1, (2 * vBiasV) / Math.max(0.1, teEv));
    const sheathThicknessM = (Math.SQRT2 / 3.0) * debyeLengthM * Math.pow(normalizedV, 0.75);
    const sheathThicknessMm = sheathThicknessM * 1000;

    return {
      bohmVelocityMS: Math.round(bohmVelocityMS),
      debyeLengthUm: Number(debyeLengthUm.toFixed(2)),
      sheathThicknessMm: Number(sheathThicknessMm.toFixed(3))
    };
  },

  /**
   * Generate 2-MHz RF bimodal IEDF energy spectrum.
   * @param {number} biasV - Peak bias voltage
   * @param {number} freqMHz - RF Bias frequency (e.g. 0.4, 2.0, 13.56)
   * @param {string} gasId - Gas identifier
   * @returns {{ energyPeaks: [number, number], deltaE: number, meanEnergyEv: number }}
   */
  generateIedfSpectrum(biasV, freqMHz = 2.0, gasId = 'ar') {
    const gas = this.gases.find(g => g.id === gasId) || this.gases[0];
    const meanEnergyEv = biasV * 0.72; // mean DC self-bias component

    // Ion transit time through sheath: tau_ion ~ 3 * s / u_B
    const sheath = this.calculateSheathProperties(3.5, 5e10, biasV, gasId);
    const tauIonSec = (3 * (sheath.sheathThicknessMm * 1e-3)) / sheath.bohmVelocityMS;
    
    // RF angular frequency
    const omega = 2 * Math.PI * freqMHz * 1e6;
    const product = omega * tauIonSec;

    // High frequency (omega * tau >> 1) collapses peaks; Low frequency (omega * tau << 1) splits peaks widely
    const splitFraction = Math.min(0.85, 2.8 / Math.max(1.0, product));
    const deltaE = biasV * splitFraction;
    const lowPeak = Math.max(10, meanEnergyEv - deltaE / 2);
    const highPeak = meanEnergyEv + deltaE / 2;

    return {
      energyPeaks: [Number(lowPeak.toFixed(1)), Number(highPeak.toFixed(1))],
      deltaE: Number(deltaE.toFixed(1)),
      meanEnergyEv: Number(meanEnergyEv.toFixed(1))
    };
  },

  /**
   * Simulate High Aspect Ratio Contact (HARC) etching profile and bow ratio.
   * @param {number} aspectRatio - e.g. 20 to 60 (for 3D NAND channel hole or DRAM contact)
   * @param {number} biasV - Ion acceleration bias
   * @param {number} ionTiltStdDeg - Angular dispersion std deviation (e.g. 0.8 to 2.5 deg)
   * @returns {{ bottomCdNm: number, bowCdNm: number, ardeEtchRateRatio: number }}
   */
  simulateHarcProfile(aspectRatio, biasV, ionTiltStdDeg = 1.2) {
    const topCdNm = 60; // Nominal CD at top mask opening
    
    // ARDE (Aspect Ratio Dependent Etching) slowdown: Knudsen diffusion of radicals
    const ardeEtchRateRatio = 1.0 / (1.0 + 0.045 * Math.pow(aspectRatio, 1.15));

    // Sidewall bowing due to ion scattering and angular tail
    const bowFactor = (ionTiltStdDeg / 1.0) * (aspectRatio / 30) * Math.min(1.5, biasV / 800);
    const bowCdNm = topCdNm * (1.0 + 0.18 * bowFactor);

    // Bottom CD tapering
    const bottomTaper = Math.min(0.7, 0.015 * aspectRatio * (1.0 / Math.max(0.5, biasV / 600)));
    const bottomCdNm = topCdNm * (1.0 - bottomTaper);

    return {
      bottomCdNm: Number(bottomCdNm.toFixed(1)),
      bowCdNm: Number(bowCdNm.toFixed(1)),
      ardeEtchRateRatio: Number(ardeEtchRateRatio.toFixed(3))
    };
  }
};
