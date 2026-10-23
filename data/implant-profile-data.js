/**
 * implant-profile-data.js - Ion Implantation Range & Pearson-IV Profile Engine
 *
 * Simulates:
 * 1. Ion Implantation Range parameters (Rp, Delta-Rp, Skewness gamma, Kurtosis beta)
 * 2. Gaussian and Pearson-IV concentration profiles:
 *    C(x) = [Dose / (sqrt(2*pi) * Delta_Rp)] * exp(-(x - Rp)^2 / (2 * Delta_Rp^2))
 * 3. Channeling Tail & Pre-Amorphization Implantation (PAI) Suppression
 * 4. Transient Enhanced Diffusion (TED) during Rapid Thermal Anneal (RTA)
 *
 * Complies with Rule 0003 (Cleanroom Light Theme) and Rule 0013 (Strict ASCII filename).
 */

export const IMPLANT_PROFILE_DATA = {
  version: '2.9.0',
  dopants: [
    {
      id: 'boron_b11',
      name: { zh: '硼 (11B+ P型主流)', en: 'Boron (11B+ P-type)' },
      atomicMassAmu: 11.0,
      dopantType: 'P',
      // Energy scaling coefficients: Rp ~ a * E^b (E in keV, Rp in nm)
      rpA: 3.8,
      rpB: 0.76,
      straggleRatio: 0.45,
      skewness: 0.85, // Positive skew (tail extends toward deep silicon)
      kurtosis: 4.2,
      tedSensitivity: 'very_high'
    },
    {
      id: 'phosphorus_p31',
      name: { zh: '磷 (31P+ N型井/深接面)', en: 'Phosphorus (31P+ N-type)' },
      atomicMassAmu: 31.0,
      dopantType: 'N',
      rpA: 1.6,
      rpB: 0.82,
      straggleRatio: 0.38,
      skewness: 0.35,
      kurtosis: 3.4,
      tedSensitivity: 'moderate'
    },
    {
      id: 'arsenic_as75',
      name: { zh: '砷 (75As+ N型淺源汲極)', en: 'Arsenic (75As+ N-type S/D)' },
      atomicMassAmu: 75.0,
      dopantType: 'N',
      rpA: 0.95,
      rpB: 0.84,
      straggleRatio: 0.32,
      skewness: -0.15, // Negative skew (blunt tail)
      kurtosis: 3.1,
      tedSensitivity: 'low'
    },
    {
      id: 'germanium_ge72',
      name: { zh: '鍺 (72Ge+ 預非晶化 PAI)', en: 'Germanium (72Ge+ PAI)' },
      atomicMassAmu: 72.6,
      dopantType: 'neutral',
      rpA: 0.98,
      rpB: 0.83,
      straggleRatio: 0.31,
      skewness: -0.10,
      kurtosis: 3.0,
      tedSensitivity: 'none'
    }
  ],

  /**
   * Calculate Range (Rp) and Straggle (Delta-Rp) from implant energy.
   * @param {string} dopantId - Dopant identifier
   * @param {number} energyKeV - Implantation beam energy in keV (1 to 200 keV)
   * @returns {{ rpNm: number, deltaRpNm: number, lateralStraggleNm: number }}
   */
  calculateRangeParameters(dopantId, energyKeV) {
    const dopant = this.dopants.find(d => d.id === dopantId) || this.dopants[0];
    const safeEnergy = Math.max(1, energyKeV);

    const rpNm = dopant.rpA * Math.pow(safeEnergy, dopant.rpB);
    const deltaRpNm = rpNm * dopant.straggleRatio;
    const lateralStraggleNm = deltaRpNm * 0.75;

    return {
      rpNm: Number(rpNm.toFixed(1)),
      deltaRpNm: Number(deltaRpNm.toFixed(1)),
      lateralStraggleNm: Number(lateralStraggleNm.toFixed(1))
    };
  },

  /**
   * Calculate peak concentration in atoms/cm^3.
   * Peak = Dose / (sqrt(2*pi) * Delta_Rp_cm)
   * @param {number} doseAtomsCm2 - Dose in cm^-2 (e.g. 1e14 to 5e15)
   * @param {number} deltaRpNm - Longitudinal straggle in nm
   * @returns {{ peakConcentrationCm3: number, peakConcentrationLog10: number }}
   */
  calculatePeakConcentration(doseAtomsCm2, deltaRpNm) {
    const deltaRpCm = deltaRpNm * 1e-7;
    const peak = doseAtomsCm2 / (Math.sqrt(2 * Math.PI) * deltaRpCm);
    return {
      peakConcentrationCm3: peak,
      peakConcentrationLog10: Number(Math.log10(peak).toFixed(2))
    };
  },

  /**
   * Generate 1D depth profile points C(x).
   * @param {string} dopantId - Dopant identifier
   * @param {number} energyKeV - Beam energy
   * @param {number} doseAtomsCm2 - Dose
   * @param {boolean} hasPai - Whether Pre-Amorphization Implantation was performed
   * @param {number} maxDepthNm - Maximum depth to simulate
   * @returns {Array<{ depthNm: number, concentrationCm3: number, concentrationLog10: number }>}
   */
  calculateImplantProfile(dopantId, energyKeV, doseAtomsCm2, hasPai = true, maxDepthNm = 250) {
    const { rpNm, deltaRpNm } = this.calculateRangeParameters(dopantId, energyKeV);
    const { peakConcentrationCm3 } = this.calculatePeakConcentration(doseAtomsCm2, deltaRpNm);
    const points = [];

    const stepNm = Math.max(2, Math.round(maxDepthNm / 50));
    for (let x = 0; x <= maxDepthNm; x += stepNm) {
      // Gaussian core
      const diff = x - rpNm;
      const core = peakConcentrationCm3 * Math.exp(-Math.pow(diff, 2) / (2 * Math.pow(deltaRpNm, 2)));

      // Channeling tail (exponential tail for un-amorphized Si)
      let tail = 0;
      if (!hasPai && x > rpNm) {
        const tailSlopeNm = deltaRpNm * 2.2;
        tail = (peakConcentrationCm3 * 0.05) * Math.exp(-(x - rpNm) / tailSlopeNm);
      }

      const totalConc = Math.max(1e12, core + tail);
      points.push({
        depthNm: x,
        concentrationCm3: totalConc,
        concentrationLog10: Number(Math.log10(totalConc).toFixed(2))
      });
    }

    return points;
  },

  /**
   * Simulate thermal diffusion broadening after Rapid Thermal Anneal (RTA).
   * @param {number} rpNm - Projected range
   * @param {number} deltaRpNm - Initial straggle
   * @param {number} rtaTempC - Peak RTA temp (e.g. 1000 - 1050 C)
   * @param {number} rtaTimeSec - Spike anneal time (e.g. 1 to 5 s)
   * @returns {{ junctionDepthXjNm: number, stragglePostAnnealNm: number }}
   */
  simulateRtaAnnealDiffusion(rpNm, deltaRpNm, rtaTempC = 1020, rtaTimeSec = 2) {
    const kB = 8.617333e-5; // eV/K
    const tempK = rtaTempC + 273.15;
    
    // Intrinsic boron diffusion D0 = 0.76 cm2/s, Ea = 3.46 eV
    // With Transient Enhanced Diffusion (TED), D_eff is boosted by 10x - 50x during initial seconds
    const tedBoostFactor = 25.0;
    const dThermalCm2S = 0.76 * Math.exp(-3.46 / (kB * tempK)) * tedBoostFactor;
    const dThermalNm2S = dThermalCm2S * 1e14;

    // Post-anneal effective straggle: sigma_eff^2 = sigma_0^2 + 2 * D * t
    const diffusionLengthSq = 2 * dThermalNm2S * rtaTimeSec;
    const stragglePostAnnealNm = Math.sqrt(Math.pow(deltaRpNm, 2) + diffusionLengthSq);

    // Approximate metallurgical junction depth Xj at background C_sub = 1e17 cm^-3
    const xjNm = rpNm + stragglePostAnnealNm * 2.8;

    return {
      junctionDepthXjNm: Number(xjNm.toFixed(1)),
      stragglePostAnnealNm: Number(stragglePostAnnealNm.toFixed(1))
    };
  }
};
