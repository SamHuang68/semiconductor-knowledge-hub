/**
 * calculators-data.js
 * 半導體核心物理定律即時計算器 (Physics Sandbox Calculators)
 * 收錄微影、薄膜、蝕刻、佈植、CMP、熱氧化、微縮、先進封裝、良率與可靠度等經典定量物理模型
 */

export const PHYSICS_CALCULATORS = {
  ch04: {
    id: 'ch04',
    titleZh: '微影解析度與景深計算器 (Rayleigh Equation)',
    titleEn: 'Lithography Resolution & Depth of Focus Calculator',
    formulaLatex: 'R = k_1 \\frac{\\lambda}{\\text{NA}}, \\quad \\text{DoF} = k_2 \\frac{\\lambda}{\\text{NA}^2}',
    descriptionZh: '利用瑞利判據（Rayleigh Criterion）即時計算在不同波長、數值孔徑 NA 與製程因子 k1/k2 下之微影最小解析度與光學景深。',
    descriptionEn: 'Calculate minimum feature size and depth of focus across various exposure wavelengths and NA using Rayleigh criteria.',
    params: [
      { id: 'wavelength', nameZh: '曝光波長 (λ)', nameEn: 'Wavelength (λ)', min: 13.5, max: 365, step: 0.1, default: 193, unit: 'nm', presets: [{ label: 'EUV (13.5nm)', val: 13.5 }, { label: 'ArF (193nm)', val: 193 }, { label: 'KrF (248nm)', val: 248 }, { label: 'i-Line (365nm)', val: 365 }] },
      { id: 'na', nameZh: '數值孔徑 (NA)', nameEn: 'Numerical Aperture (NA)', min: 0.5, max: 1.35, step: 0.01, default: 1.35, unit: '', presets: [{ label: 'High-NA EUV (0.55)', val: 0.55 }, { label: 'Standard EUV (0.33)', val: 0.33 }, { label: 'ArFi Immersion (1.35)', val: 1.35 }, { label: 'Dry ArF (0.93)', val: 0.93 }] },
      { id: 'k1', nameZh: '製程因子 (k1)', nameEn: 'Process Factor (k1)', min: 0.28, max: 0.60, step: 0.01, default: 0.32, unit: '', presets: [{ label: 'Aggressive (0.28)', val: 0.28 }, { label: 'Production (0.35)', val: 0.35 }, { label: 'Relaxed (0.50)', val: 0.50 }] },
      { id: 'k2', nameZh: '景深因子 (k2)', nameEn: 'DoF Factor (k2)', min: 0.40, max: 1.00, step: 0.05, default: 0.60, unit: '', presets: [{ label: 'Tight (0.50)', val: 0.50 }, { label: 'Standard (0.65)', val: 0.65 }] }
    ],
    calculate: (p) => {
      const R = p.k1 * (p.wavelength / p.na);
      const DoF = p.k2 * (p.wavelength / (p.na * p.na));
      return [
        { labelZh: '最小線寬解析度 (R)', labelEn: 'Resolution (R)', value: R.toFixed(2), unit: 'nm', highlight: true, noteZh: '若 R < 20nm 需搭配多重曝光 (SADP/SAQP) 或 EUV', noteEn: 'R < 20nm requires multi-patterning or EUV' },
        { labelZh: '光學景深 (DoF)', labelEn: 'Depth of Focus (DoF)', value: DoF.toFixed(1), unit: 'nm', highlight: false, noteZh: 'DoF 越窄對晶圓平坦度與聚焦控制要求越極端', noteEn: 'Narrower DoF requires ultra-flat wafers & focal tracking' }
      ];
    }
  },

  ch05: {
    id: 'ch05',
    titleZh: '化學氣相沉積與阿瑞尼斯動力學計算器 (Arrhenius Kinetics)',
    titleEn: 'CVD Deposition Rate & Arrhenius Kinetics Calculator',
    formulaLatex: 'k = A \\exp\\left(-\\frac{E_a}{k_B T}\\right), \\quad x = k \\cdot t',
    descriptionZh: '計算熱化學氣相沉積在表面反應受限區之沉積速率與薄膜生長厚度。',
    descriptionEn: 'Compute CVD deposition rate and total film thickness in the surface reaction rate-limited regime.',
    params: [
      { id: 'temp', nameZh: '沉積溫度 (T)', nameEn: 'Deposition Temp (T)', min: 200, max: 900, step: 10, default: 450, unit: '°C', presets: [{ label: 'PECVD Low-T (300°C)', val: 300 }, { label: 'LPCVD Poly-Si (620°C)', val: 620 }, { label: 'HTO Oxide (800°C)', val: 800 }] },
      { id: 'ea', nameZh: '反應活化能 (Ea)', nameEn: 'Activation Energy (Ea)', min: 0.3, max: 2.2, step: 0.05, default: 1.1, unit: 'eV', presets: [{ label: 'Plasma-assisted (0.4 eV)', val: 0.4 }, { label: 'Thermal Poly-Si (1.6 eV)', val: 1.6 }, { label: 'TEOS SiO2 (1.1 eV)', val: 1.1 }] },
      { id: 'time', nameZh: '沉積時間 (t)', nameEn: 'Deposition Time (t)', min: 1, max: 120, step: 1, default: 15, unit: 'min', presets: [{ label: 'Flash ALD (2 min)', val: 2 }, { label: 'Standard (15 min)', val: 15 }, { label: 'Thick Film (60 min)', val: 60 }] },
      { id: 'a', nameZh: '指前頻率因子 (A)', nameEn: 'Pre-exponential Factor (A)', min: 1e6, max: 1e9, step: 1e6, default: 2.5e7, unit: 'nm/min' }
    ],
    calculate: (p) => {
      const kB = 8.617333262e-5; // eV / K
      const T_kelvin = p.temp + 273.15;
      const rate = p.a * Math.exp(-p.ea / (kB * T_kelvin));
      const thickness = rate * p.time;
      return [
        { labelZh: '沉積生長速率 (Rate)', labelEn: 'Deposition Rate', value: rate < 0.01 ? rate.toExponential(2) : rate.toFixed(2), unit: 'nm/min', highlight: true, noteZh: '溫度每上升 50°C 速率呈現指數級劇增', noteEn: 'Rate surges exponentially with temperature' },
        { labelZh: '最終薄膜厚度 (Thickness)', labelEn: 'Film Thickness', value: thickness.toFixed(1), unit: 'nm', highlight: false, noteZh: `約合 ${(thickness * 10).toFixed(0)} Å (埃米)`, noteEn: `Equivalent to ${(thickness * 10).toFixed(0)} Å` }
      ];
    }
  },

  ch07: {
    id: 'ch07',
    titleZh: '離子佈植射程與摻雜峰值計算器 (LSS Theory)',
    titleEn: 'Ion Implantation Range & Peak Concentration Calculator',
    formulaLatex: 'C(x) = \\frac{\\Phi}{\\sqrt{2\\pi} \\Delta R_p} \\exp\\left(-\\frac{(x - R_p)^2}{2 \\Delta R_p^2}\\right)',
    descriptionZh: '依據 LSS 離子散射理論，計算特定離子（硼/磷/砷）在矽基板中的投影射程 Rp、跨距 ΔRp 與峰值摻雜濃度。',
    descriptionEn: 'Calculates ion projected range (Rp), straggle, and peak dopant concentration in silicon under LSS theory.',
    params: [
      { id: 'energy', nameZh: '佈植能量 (E)', nameEn: 'Implant Energy (E)', min: 5, max: 200, step: 5, default: 40, unit: 'keV', presets: [{ label: 'Ultra-shallow (5 keV)', val: 5 }, { label: 'Standard (40 keV)', val: 40 }, { label: 'Deep Well (180 keV)', val: 180 }] },
      { id: 'dose', nameZh: '佈植劑量 (Φ)', nameEn: 'Implant Dose (Φ)', min: 1e12, max: 1e16, step: 1e12, default: 5e14, unit: 'cm⁻²', presets: [{ label: 'Vt Adjust (1e12)', val: 1e12 }, { label: 'Source/Drain (5e15)', val: 5e15 }, { label: 'Well Dose (1e13)', val: 1e13 }] },
      { id: 'species', nameZh: '摻雜離子種 (Species)', nameEn: 'Dopant Species', min: 1, max: 3, step: 1, default: 2, unit: '', presets: [{ label: 'Boron B-11', val: 1 }, { label: 'Phosphorus P-31', val: 2 }, { label: 'Arsenic As-75', val: 3 }] }
    ],
    calculate: (p) => {
      // 依離子原子量經驗估算 Rp 與 dRp
      let rpFactor = 3.5, drpFactor = 1.2;
      if (p.species === 1) { rpFactor = 4.2; drpFactor = 1.8; } // 硼 (輕)
      else if (p.species === 2) { rpFactor = 1.4; drpFactor = 0.55; } // 磷
      else if (p.species === 3) { rpFactor = 0.8; drpFactor = 0.32; } // 砷 (重)

      const Rp = rpFactor * Math.pow(p.energy, 0.9); // nm
      const dRp = drpFactor * Math.pow(p.energy, 0.75); // nm
      const dRp_cm = dRp * 1e-7;
      const peakConc = p.dose / (Math.sqrt(2 * Math.PI) * dRp_cm); // atoms/cm3

      return [
        { labelZh: '投影射程深度 (Rp)', labelEn: 'Projected Range (Rp)', value: Rp.toFixed(1), unit: 'nm', highlight: true, noteZh: '離子濃度最高之深度中心點', noteEn: 'Depth of highest implanted dopant density' },
        { labelZh: '投影縱向分佈標準差 (ΔRp)', labelEn: 'Straggle (ΔRp)', value: dRp.toFixed(1), unit: 'nm', highlight: false, noteZh: '高斯分佈之擴散寬度', noteEn: 'Gaussian distribution spread parameter' },
        { labelZh: '峰值摻雜濃度 (Cp)', labelEn: 'Peak Concentration (Cp)', value: peakConc.toExponential(2), unit: 'atoms/cm³', highlight: true, noteZh: peakConc > 5e20 ? '超過固溶度極限，需雷射退火' : '符合常規活化範圍', noteEn: peakConc > 5e20 ? 'Exceeds solid solubility' : 'Within standard activation range' }
      ];
    }
  },

  ch08: {
    id: 'ch08',
    titleZh: '化學機械研磨移除速率計算器 (Preston Equation)',
    titleEn: 'CMP Material Removal Rate Calculator (Preston Law)',
    formulaLatex: '\\text{MRR} = K_p \\cdot P \\cdot V',
    descriptionZh: '透過 Preston 機械磨損方程式，計算研磨頭下壓力 P 與研磨墊旋轉線速度 V 對材料移除率（MRR）之影響。',
    descriptionEn: 'Calculate material removal rate (MRR) based on Prestonian mechanics under variable downforce and velocity.',
    params: [
      { id: 'pressure', nameZh: '研磨下壓力 (P)', nameEn: 'Downforce Pressure (P)', min: 1.0, max: 6.0, step: 0.2, default: 3.0, unit: 'psi', presets: [{ label: 'Low stress (1.5 psi)', val: 1.5 }, { label: 'Standard (3.0 psi)', val: 3.0 }, { label: 'Aggressive (5.0 psi)', val: 5.0 }] },
      { id: 'velocity', nameZh: '晶圓/研磨墊相對線速度 (V)', nameEn: 'Relative Velocity (V)', min: 0.5, max: 3.5, step: 0.1, default: 1.8, unit: 'm/s', presets: [{ label: 'Center (0.8 m/s)', val: 0.8 }, { label: 'Mid-radius (1.8 m/s)', val: 1.8 }, { label: 'Edge (3.0 m/s)', val: 3.0 }] },
      { id: 'kp', nameZh: 'Preston 化學常數 (Kp)', nameEn: 'Preston Constant (Kp)', min: 2.0, max: 15.0, step: 0.5, default: 6.5, unit: '10⁻¹⁴ m²/N', presets: [{ label: 'Oxide Slurry (4.5)', val: 4.5 }, { label: 'Copper Slurry (7.0)', val: 7.0 }, { label: 'Tungsten (9.5)', val: 9.5 }] }
    ],
    calculate: (p) => {
      // 1 psi = 6894.76 Pa (N/m2)
      const p_pa = p.pressure * 6894.76;
      const kp_val = p.kp * 1e-14;
      // MRR in m/s -> nm/min
      const mrr_m_s = kp_val * p_pa * p.velocity;
      const mrr_nm_min = mrr_m_s * 1e9 * 60;
      const prestonProduct = (p.pressure * p.velocity).toFixed(2);

      return [
        { labelZh: '材料移除速率 (MRR)', labelEn: 'Removal Rate (MRR)', value: mrr_nm_min.toFixed(1), unit: 'nm/min', highlight: true, noteZh: '移除率隨 P×V 線性上升，超出上限可能造成微刮痕', noteEn: 'MRR scales with P×V; excessive values risk scratching' },
        { labelZh: '壓力-速度乘積 (P·V)', labelEn: 'P·V Product', value: prestonProduct, unit: 'psi·m/s', highlight: false, noteZh: '工程經驗值通常控制在 3.0 ~ 8.0 之間', noteEn: 'Typical engineering window: 3.0 ~ 8.0' }
      ];
    }
  },

  ch11: {
    id: 'ch11',
    titleZh: '熱氧化層生長厚度計算器 (Deal-Grove Model)',
    titleEn: 'Thermal Oxide Thickness Calculator (Deal-Grove)',
    formulaLatex: 'x_0^2 + A x_0 = B(t + \\tau), \\quad x_0 = \\frac{-A + \\sqrt{A^2 + 4B(t+\\tau)}}{2}',
    descriptionZh: '模擬矽基板在高溫爐管中進行乾氧（Dry O2）或濕氧（Wet Steam）熱氧化生長之二氧化矽層厚度。',
    descriptionEn: 'Simulates SiO2 thermal oxidation thickness using the linear-parabolic Deal-Grove model.',
    params: [
      { id: 'temp', nameZh: '氧化溫度 (T)', nameEn: 'Oxidation Temp (T)', min: 800, max: 1150, step: 25, default: 1000, unit: '°C', presets: [{ label: 'Low-T (900°C)', val: 900 }, { label: 'Standard (1000°C)', val: 1000 }, { label: 'High-T (1100°C)', val: 1100 }] },
      { id: 'time', nameZh: '氧化時間 (t)', nameEn: 'Oxidation Time (t)', min: 0.1, max: 10, step: 0.1, default: 2.0, unit: 'hours', presets: [{ label: 'Thin Oxide (0.5 hr)', val: 0.5 }, { label: 'Standard (2.0 hr)', val: 2.0 }, { label: 'Thick Field (8.0 hr)', val: 8.0 }] },
      { id: 'ambient', nameZh: '反應氣氛 (Ambient)', nameEn: 'Ambient Environment', min: 1, max: 2, step: 1, default: 1, unit: '', presets: [{ label: '乾氧 Dry O2 (緻密薄膜)', val: 1 }, { label: '濕氧 Wet Steam (快速厚膜)', val: 2 }] }
    ],
    calculate: (p) => {
      const T_K = p.temp + 273.15;
      const isDry = p.ambient === 1;

      // Arrhenius 定律推導 Deal-Grove 參數 B 與 B/A
      const B0 = isDry ? 7.72e2 : 2.14e2; // um2/hr
      const Ea_B = isDry ? 1.23 : 0.71; // eV
      const lin0 = isDry ? 6.23e5 : 8.95e6; // um/hr
      const Ea_lin = isDry ? 2.00 : 1.96; // eV
      const kB = 8.617333262e-5;

      const B = B0 * Math.exp(-Ea_B / (kB * T_K)); // um2/hr
      const B_over_A = lin0 * Math.exp(-Ea_lin / (kB * T_K)); // um/hr
      const A = B / B_over_A; // um
      const tau = isDry ? 0.05 : 0; // hr

      // 解一元二次方程
      const t_tot = p.time + tau;
      const x0_um = (-A + Math.sqrt(A * A + 4 * B * t_tot)) / 2;
      const x0_nm = x0_um * 1000;

      return [
        { labelZh: '二氧化矽膜厚 (x₀)', labelEn: 'Oxide Thickness (x₀)', value: x0_nm.toFixed(1), unit: 'nm', highlight: true, noteZh: isDry ? '乾氧生長速度慢，但介電擊穿強度最高' : '濕氧因水分子擴散係數高，生長速率遠高於乾氧', noteEn: isDry ? 'Dense oxide with highest dielectric breakdown' : 'Fast growth due to high H2O solubility' },
        { labelZh: '拋物線常數 (B)', labelEn: 'Parabolic Rate (B)', value: (B * 1e6).toFixed(2), unit: 'nm²/hr', highlight: false, noteZh: '主導厚膜擴散限制區之生長', noteEn: 'Dominates diffusion-controlled thick regime' },
        { labelZh: '線性生長速率 (B/A)', labelEn: 'Linear Rate (B/A)', value: (B_over_A * 1000).toFixed(2), unit: 'nm/hr', highlight: false, noteZh: '主導初期薄膜表面反應區之生長', noteEn: 'Dominates initial reaction-controlled regime' }
      ];
    }
  },

  ch16: {
    id: 'ch16',
    titleZh: '晶圓缺陷與良率模型計算器 (Yield Models)',
    titleEn: 'Wafer Defect Density & Die Yield Calculator',
    formulaLatex: 'Y_P = e^{-D_0 A}, \\quad Y_M = \\left(\\frac{1 - e^{-D_0 A}}{D_0 A}\\right)^2, \\quad Y_{NB} = (1 + D_0 A / \\alpha)^{-\\alpha}',
    descriptionZh: '即時比較泊松模型（Poisson）、墨菲模型（Murphy）與負二項分佈模型（Negative Binomial）在不同晶粒面積與缺陷密度下的良率預測。',
    descriptionEn: 'Compare Poisson, Murphy, and Negative Binomial yield models against die area and defect density.',
    params: [
      { id: 'area', nameZh: '晶粒晶片面積 (A)', nameEn: 'Die Area (A)', min: 10, max: 800, step: 10, default: 120, unit: 'mm²', presets: [{ label: 'Mobile SoC (90 mm²)', val: 90 }, { label: 'Desktop CPU (150 mm²)', val: 150 }, { label: 'AI Accelerator (650 mm²)', val: 650 }] },
      { id: 'd0', nameZh: '致命缺陷密度 (D₀)', nameEn: 'Defect Density (D₀)', min: 0.02, max: 1.5, step: 0.02, default: 0.12, unit: 'defects/cm²', presets: [{ label: 'Mature Fab (0.05)', val: 0.05 }, { label: 'Standard Ramp (0.12)', val: 0.12 }, { label: 'New Node Pilot (0.45)', val: 0.45 }] },
      { id: 'alpha', nameZh: '缺陷聚集因子 (α)', nameEn: 'Cluster Parameter (α)', min: 0.5, max: 4.0, step: 0.2, default: 2.0, unit: '', presets: [{ label: 'High Clustering (1.0)', val: 1.0 }, { label: 'Standard (2.0)', val: 2.0 }, { label: 'Low Clustering (4.0)', val: 4.0 }] }
    ],
    calculate: (p) => {
      const A_cm2 = p.area / 100; // mm2 -> cm2
      const DA = p.d0 * A_cm2;

      // 1. Poisson
      const Y_P = Math.exp(-DA) * 100;
      // 2. Murphy
      const Y_M = DA === 0 ? 100 : Math.pow((1 - Math.exp(-DA)) / DA, 2) * 100;
      // 3. Negative Binomial
      const Y_NB = Math.pow(1 + DA / p.alpha, -p.alpha) * 100;

      // 300mm 晶圓可用晶粒數估算 (DPW)
      const r_wafer = 150; // mm
      const dpw_gross = Math.floor((Math.PI * r_wafer * r_wafer) / p.area - (Math.PI * 2 * r_wafer) / Math.sqrt(2 * p.area));
      const net_good_dies = Math.floor(dpw_gross * (Y_NB / 100));

      return [
        { labelZh: '負二項模型良率 (Y_NB)', labelEn: 'Neg. Binomial Yield', value: Y_NB.toFixed(1), unit: '%', highlight: true, noteZh: '考慮晶圓邊緣缺陷聚集效應，最貼近先進製程實績', noteEn: 'Accounts for defect clustering, best for advanced nodes' },
        { labelZh: '墨菲模型良率 (Y_Murphy)', labelEn: 'Murphy Yield', value: Y_M.toFixed(1), unit: '%', highlight: false, noteZh: '中度缺陷聚集假設下的預估值', noteEn: 'Mid-range estimation under normalized variation' },
        { labelZh: '泊松模型良率 (Y_Poisson)', labelEn: 'Poisson Yield', value: Y_P.toFixed(1), unit: '%', highlight: false, noteZh: '純隨機分佈假設，對大晶片良率預測偏過度悲觀', noteEn: 'Over-pessimistic for large dies with clustered flaws' },
        { labelZh: '300mm 淨合格晶粒數', labelEn: 'Net Good Dies (300mm)', value: `${net_good_dies} / ${dpw_gross}`, unit: '顆 (Dies)', highlight: true, noteZh: `單片晶圓毛晶粒數約 ${dpw_gross} 顆`, noteEn: `Gross dies per wafer: ~${dpw_gross}` }
      ];
    }
  },

  ch21: {
    id: 'ch21',
    titleZh: '先進 3D 封裝互連密度與熱阻估算器 (3D Packaging)',
    titleEn: 'Advanced 3D Packaging Interconnect & Thermal Estimator',
    formulaLatex: '\\text{Density} = \\frac{1}{\\text{Pitch}^2}, \\quad \\Delta T_j = P \\cdot \\theta_{ja}',
    descriptionZh: '估算 CoWoS、InFO、SoIC 在微凸塊（Micro-bump）與銅直接混合鍵合（Hybrid Bonding）下的 I/O 密度、頻寬與散熱溫升。',
    descriptionEn: 'Estimate I/O interconnect density, interface bandwidth, and junction thermal rise for 2.5D/3D integration.',
    params: [
      { id: 'pitch', nameZh: '凸塊/鍵合節距 (Pitch)', nameEn: 'Bump / Bond Pitch', min: 0.8, max: 130, step: 0.5, default: 25, unit: 'µm', presets: [{ label: 'Hybrid Bonding (0.9 µm)', val: 0.9 }, { label: 'Micro-bump CoWoS (25 µm)', val: 25 }, { label: 'Flip-Chip C4 (100 µm)', val: 100 }] },
      { id: 'power', nameZh: '晶片總功耗 (Total Power)', nameEn: 'Total Chip Power (P)', min: 50, max: 1000, step: 25, default: 450, unit: 'W', presets: [{ label: 'Client GPU (250 W)', val: 250 }, { label: 'AI Accelerator (700 W)', val: 700 }] },
      { id: 'theta', nameZh: '封裝熱阻 (θja)', nameEn: 'Thermal Resistance (θja)', min: 0.05, max: 0.5, step: 0.01, default: 0.12, unit: '°C/W', presets: [{ label: 'Direct Liquid Cooling (0.06)', val: 0.06 }, { label: 'Vapor Chamber Air (0.14)', val: 0.14 }, { label: 'Standard Heatsink (0.30)', val: 0.30 }] }
    ],
    calculate: (p) => {
      // 密度計算 (bumps / mm2)
      // pitch is in um -> mm is pitch * 1e-3
      const pitch_mm = p.pitch * 1e-3;
      const density = Math.floor(1 / (pitch_mm * pitch_mm));
      const deltaT = p.power * p.theta;
      const estBandwidth = (density * 0.003).toFixed(1); // 經驗頻寬估算 (TB/s/cm2)

      return [
        { labelZh: '互連面密度 (Interconnect Density)', labelEn: 'Interconnect Density', value: density > 1e6 ? `${(density / 1e6).toFixed(2)}M` : density.toLocaleString(), unit: 'I/O / mm²', highlight: true, noteZh: p.pitch < 2 ? '晶圓對晶圓 (W2W) 混合鍵合等級' : '高階 2.5D 中介層微凸塊等級', noteEn: p.pitch < 2 ? 'Direct Cu-Cu Hybrid Bonding regime' : 'High-density micro-bump regime' },
        { labelZh: '介面頻寬密度估算', labelEn: 'Est. Bandwidth Density', value: estBandwidth, unit: 'TB/s / cm²', highlight: false, noteZh: '支持高頻寬記憶體 (HBM3e/4) 極速傳輸', noteEn: 'Enables extreme bandwidth for HBM3e/4' },
        { labelZh: '核心接面溫升 (ΔTj)', labelEn: 'Junction Temp Rise (ΔTj)', value: `+${deltaT.toFixed(1)}`, unit: '°C', highlight: true, noteZh: deltaT > 65 ? '散熱超限！必須導入微通道水冷散熱' : '散熱餘裕正常', noteEn: deltaT > 65 ? 'Critical thermal limit! Requires liquid cooling' : 'Within acceptable thermal margin' }
      ];
    }
  },

  ch22: {
    id: 'ch22',
    titleZh: '可靠度壽命加速因子計算器 (Arrhenius ALT Model)',
    titleEn: 'Reliability Accelerated Life Testing (ALT) Calculator',
    formulaLatex: '\\text{AF} = \\exp\\left[\\frac{E_a}{k_B} \\left(\\frac{1}{T_{\\text{use}}} - \\frac{1}{T_{\\text{stress}}}\\right)\\right]',
    descriptionZh: '利用阿瑞尼斯高溫加速老化測試（HTOL），計算在高溫應力條件下加速晶片缺陷暴露的時間加速因子（AF）。',
    descriptionEn: 'Compute the Arrhenius acceleration factor (AF) for High-Temperature Operating Life (HTOL) testing.',
    params: [
      { id: 't_use', nameZh: '實際工作溫度 (T_use)', nameEn: 'Operating Temp (T_use)', min: 25, max: 85, step: 5, default: 55, unit: '°C', presets: [{ label: 'Server Bay (40°C)', val: 40 }, { label: 'Consumer (55°C)', val: 55 }, { label: 'Automotive (85°C)', val: 85 }] },
      { id: 't_stress', nameZh: '高溫應力測試溫度 (T_stress)', nameEn: 'Stress Temp (T_stress)', min: 100, max: 175, step: 5, default: 125, unit: '°C', presets: [{ label: 'Standard HTOL (125°C)', val: 125 }, { label: 'Automotive Grade 0 (150°C)', val: 150 }] },
      { id: 'ea', nameZh: '失效機制活化能 (Ea)', nameEn: 'Activation Energy (Ea)', min: 0.3, max: 1.2, step: 0.05, default: 0.7, unit: 'eV', presets: [{ label: 'Electromigration (0.9 eV)', val: 0.9 }, { label: 'TDDB Gate Oxide (0.7 eV)', val: 0.7 }, { label: 'Corrosion (0.45 eV)', val: 0.45 }] }
    ],
    calculate: (p) => {
      const kB = 8.617333262e-5;
      const T_use_K = p.t_use + 273.15;
      const T_stress_K = p.t_stress + 273.15;
      const exponent = (p.ea / kB) * ((1 / T_use_K) - (1 / T_stress_K));
      const AF = Math.exp(exponent);
      const testHours10Yr = (10 * 365 * 24) / AF;

      return [
        { labelZh: '熱加速因子 (Acceleration Factor AF)', labelEn: 'Acceleration Factor (AF)', value: AF.toFixed(1), unit: '倍 (×)', highlight: true, noteZh: '應力測試中 1 小時相當於實際服役 AF 小時', noteEn: '1 hour of stress equals AF hours of real operation' },
        { labelZh: '證明 10 年壽命所需測試時數', labelEn: 'Hours for 10-Yr Equivalent', value: testHours10Yr.toFixed(0), unit: '小時 (hrs)', highlight: false, noteZh: `約 ${(testHours10Yr / 24).toFixed(0)} 天烘烤測試即可等效 10 年`, noteEn: `Equivalent to ${(testHours10Yr / 24).toFixed(0)} days of continuous burn-in` }
      ];
    }
  }
};
