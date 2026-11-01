/**
 * calculators-data.js
 * 半導體核心物理定律即時計算器 (Physics Sandbox Calculators)
 * 滿貫覆蓋全站 25 正式章 (Ch 00 ~ 24) 與 3 篇附錄 (A/B/C) 共 28 大經典定量物理沙盒
 */

import { relativeEmLifetime, normalDefectPpm } from './curve-plotter.js';

export const PHYSICS_CALCULATORS = {
  // Ch 00: 晶片一生與晶圓經濟學
  ch00: {
    id: 'ch00',
    titleZh: '毛晶粒數與面積利用率教學估算 (GDPW & Area Efficiency)',
    titleEn: 'Gross Dies & Area Utilization Teaching Estimate',
    formulaLatex: 'GDPW = d_{wafer} \\cdot \\pi \\cdot \\left[ \\frac{d_{wafer}}{4 \\cdot S_{die}} - \\frac{1}{\\sqrt{2 \\cdot S_{die}}} \\right]',
    descriptionZh: '以面積與周界損失近似估算毛晶粒數，並非精確排版或實測良率。公式中的直徑取 dEff = waferD − 2×edgeEx，晶粒面積取 dieW×dieH；邊緣排除依目前滑桿，切割道寬未獨立建模。面積利用率以完整晶圓面積為分母；結果未經產線校準。',
    descriptionEn: 'Estimate gross dies from area and perimeter loss, not exact packing or measured yield. The formula uses dEff = waferD − 2×edgeEx and die area = dieW×dieH. Edge exclusion follows the slider; scribe width is not modeled separately. Area utilization uses the full wafer area as its denominator. Results are not production-calibrated.',
    params: [
      { id: 'waferD', nameZh: '晶圓直徑 (Wafer Diameter)', nameEn: 'Wafer Diameter', min: 100, max: 450, step: 50, default: 300, unit: 'mm', presets: [{ label: '12-inch (300mm)', val: 300 }, { label: '8-inch (200mm)', val: 200 }, { label: '6-inch (150mm)', val: 150 }] },
      { id: 'dieW', nameZh: '晶粒寬度 (Die Width)', nameEn: 'Die Width', min: 1, max: 35, step: 0.5, default: 10, unit: 'mm', presets: [{ label: 'Small Die (5mm)', val: 5 }, { label: 'Medium (10mm)', val: 10 }, { label: 'Large AI Die (25mm)', val: 25 }] },
      { id: 'dieH', nameZh: '晶粒高度 (Die Height)', nameEn: 'Die Height', min: 1, max: 35, step: 0.5, default: 10, unit: 'mm', presets: [{ label: 'Small Die (5mm)', val: 5 }, { label: 'Medium (10mm)', val: 10 }, { label: 'Large AI Die (25mm)', val: 25 }] },
      { id: 'edgeEx', nameZh: '邊緣禁區 (Edge Exclusion)', nameEn: 'Edge Exclusion', min: 1, max: 5, step: 0.5, default: 3, unit: 'mm', presets: [{ label: 'Standard (3mm)', val: 3 }, { label: 'Tight (2mm)', val: 2 }] }
    ],
    calculate: (p) => {
      const dEff = p.waferD - 2 * p.edgeEx;
      const sDie = p.dieW * p.dieH;
      const r = dEff / 2;
      const waferArea = Math.PI * r * r;
      const gdpw = Math.floor(Math.PI * (dEff * dEff) / (4 * sDie) - (Math.PI * dEff) / Math.sqrt(2 * sDie));
      const activeArea = Math.max(0, gdpw * sDie);
      const ratio = ((activeArea / (Math.PI * (p.waferD / 2) * (p.waferD / 2))) * 100).toFixed(1);
      return [
        { labelZh: '近似毛晶粒數 (GDPW)', labelEn: 'Estimated Gross Dies / Wafer', value: Math.max(0, gdpw), unit: 'dies', highlight: true, noteZh: '周界近似項造成尺寸相依損失；不是精確排版結果', noteEn: 'Perimeter approximation gives size-dependent loss, not exact packing' },
        { labelZh: '晶圓有效利用率 (Area Eff.)', labelEn: 'Area Utilization', value: ratio, unit: '%', highlight: false, noteZh: '依目前邊緣排除值估算；切割道寬未獨立扣除', noteEn: 'Uses current edge exclusion; scribe width is not separately deducted' }
      ];
    }
  },

  // Ch 01: 無塵室與廠務
  ch01: {
    id: 'ch01',
    titleZh: '微粒濃度公式與理想換氣率教學計算器',
    titleEn: 'Particle Formula & Ideal Air Change Teaching Calculator',
    formulaLatex: 'C_n = 10^N \\cdot \\left(\\frac{0.1}{D}\\right)^{2.08}, \\quad ACH = \\frac{Q \\cdot 3600}{V}',
    descriptionZh: '使用既有冪次式計算粒子濃度教學值；ISO完整分類表的等級／粒徑適用組合未確認，結果不是已核實分類限值或現場OPC/SPC門檻。ACH假設100%FFU覆蓋及目前高度／風速，非實測換氣或完全置換保證。',
    descriptionEn: 'Evaluate the existing particle power formula for teaching. Applicable ISO classification-table class/diameter combinations are unverified; results are not confirmed classification limits or site OPC/SPC thresholds. ACH assumes 100% FFU coverage and the selected height/velocity, not measured ventilation or complete replacement.',
    params: [
      { id: 'isoClass', nameZh: 'ISO 潔淨等級 (Class)', nameEn: 'ISO Class', min: 1, max: 6, step: 0.5, default: 3, unit: 'Class', presets: [{ label: 'ISO 1 (example)', val: 1 }, { label: 'ISO 3 (example)', val: 3 }, { label: 'ISO 4 (example)', val: 4 }, { label: 'ISO 5 (example)', val: 5 }] },
      { id: 'sizeD', nameZh: '檢測粒徑 (D)', nameEn: 'Particle Diameter (D)', min: 0.1, max: 5.0, step: 0.1, default: 0.1, unit: 'µm', presets: [{ label: '0.1 µm (example)', val: 0.1 }, { label: '0.2 µm', val: 0.2 }, { label: '0.5 µm (example)', val: 0.5 }] },
      { id: 'ceilingHeight', nameZh: '無塵室挑高 (Ceiling)', nameEn: 'Ceiling Height', min: 3.0, max: 6.0, step: 0.5, default: 4.5, unit: 'm' },
      { id: 'faceVel', nameZh: 'FFU 出風風速 (Face Velocity)', nameEn: 'FFU Velocity', min: 0.2, max: 0.6, step: 0.05, default: 0.45, unit: 'm/s' }
    ],
    calculate: (p) => {
      const Cn = Math.pow(10, p.isoClass) * Math.pow(0.1 / p.sizeD, 2.08);
      const ach = Math.round((p.faceVel * 3600) / p.ceilingHeight);
      return [
        { labelZh: '公式教學估算濃度', labelEn: 'Formula-Based Teaching Concentration', value: Cn < 1 ? Cn.toFixed(2) : Math.round(Cn), unit: 'particles/m³', highlight: true, noteZh: 'ISO分類表適用域未確認；非OPC/SPC現場門檻', noteEn: 'ISO table applicability unverified; not a site OPC/SPC threshold' },
        { labelZh: '循環換氣次數 (ACH)', labelEn: 'Air Changes / Hour', value: ach, unit: '次/hr', highlight: false, noteZh: '理想估算：100%FFU覆蓋及所選高度／風速；非實測', noteEn: 'Ideal estimate: 100% FFU coverage and selected height/velocity; not measured' }
      ];
    }
  },

  // Ch 02: 固態物理
  ch02: {
    id: 'ch02',
    titleZh: '矽能隙溫度相依與 MOSFET 次臨界擺幅計算器 (Varshni & Subthreshold Swing)',
    titleEn: 'Silicon Bandgap Varshni & Subthreshold Swing Calculator',
    formulaLatex: 'E_g(T) = 1.17 - \\frac{4.73 \\times 10^{-4} T^2}{T + 636}, \\quad SS = \\frac{k_B T}{q} \\ln(10) \\left(1 + \\frac{C_d}{C_{ox}}\\right)',
    descriptionZh: '以 Varshni 式估算矽能隙，並以簡化靜電模型計算次臨界擺幅。約 60 mV/dec 只適用於室溫熱激發的理想極限；電容比與預設值是教學示例，不代表特定電晶體技術。',
    descriptionEn: 'Estimate silicon bandgap with the Varshni equation and subthreshold swing with a simplified electrostatic model. Approximately 60 mV/dec is an ideal room-temperature thermionic limit; capacitance ratios and presets are teaching examples, not technology specifications.',
    params: [
      { id: 'tempC', nameZh: '工作溫度 (T)', nameEn: 'Temperature (T)', min: -55, max: 150, step: 5, default: 25, unit: '°C', presets: [{ label: 'Low Temp (-55°C)', val: -55 }, { label: 'Room (25°C)', val: 25 }, { label: 'High Temp (125°C)', val: 125 }] },
      { id: 'cdRatio', nameZh: '電容比 (Cd / Cox)', nameEn: 'Capacitance Ratio', min: 0.05, max: 0.50, step: 0.05, default: 0.15, unit: '', presets: [{ label: 'Low Ratio (0.05)', val: 0.05 }, { label: 'Mid Ratio (0.15)', val: 0.15 }, { label: 'High Ratio (0.35)', val: 0.35 }] }
    ],
    calculate: (p) => {
      const T = p.tempC + 273.15;
      const kB = 8.61733e-5; // eV / K
      const Eg = 1.17 - (4.73e-4 * T * T) / (T + 636);
      const thermalV = (kB * T) * Math.log(10) * 1000; // mV
      const SS = thermalV * (1 + p.cdRatio);
      return [
        { labelZh: '矽禁帶寬度 (Bandgap Eg)', labelEn: 'Silicon Bandgap Eg', value: Eg.toFixed(3), unit: 'eV', highlight: false, noteZh: '能隙示例；不計算元件漏電流', noteEn: 'Bandgap estimate; device leakage is not calculated' },
        { labelZh: '次臨界擺幅 (Subthreshold Swing)', labelEn: 'Subthreshold Swing', value: SS.toFixed(1), unit: 'mV/dec', highlight: true, noteZh: '約 300 K、理想熱激發極限為 59.6 mV/dec', noteEn: 'Ideal thermionic limit near 300 K: 59.6 mV/dec' }
      ];
    }
  },

  // Ch 03: 晶圓製造與長晶
  ch03: {
    id: 'ch03',
    titleZh: 'CZ 偏析與拉速教學估算器',
    titleEn: 'CZ Segregation and Illustrative Pull-Speed Calculator',
    formulaLatex: 'C_s/C_0 = k_0(1-f_s)^{k_0-1}, \\quad V_{example}[mm/min] = 0.065\\,G[K/cm]',
    descriptionZh: 'Scheil 式以完全混合液相、固相無擴散及固定偏析係數估算相對濃度。拉速欄只計 G × 0.065，係數未校準；不是最大拉速、300mm 製程建議或 Voronkov 合格判定。',
    descriptionEn: 'The Scheil estimate assumes a well-mixed liquid, no solid diffusion and a constant segregation coefficient. Pull speed is only G × 0.065 with an uncalibrated coefficient; it is not a maximum speed, 300mm process recommendation or Voronkov acceptance criterion.',
    params: [
      { id: 'dopant', nameZh: '摻雜元素種類', nameEn: 'Dopant Species', min: 0.35, max: 0.80, step: 0.45, default: 0.80, unit: 'k0', presets: [{ label: 'Boron (B, k0=0.80)', val: 0.80 }, { label: 'Phosphorus (P, k0=0.35)', val: 0.35 }] },
      { id: 'fs', nameZh: '固化比例 (Solidified Fraction fs)', nameEn: 'Solidified Fraction', min: 0.05, max: 0.90, step: 0.05, default: 0.50, unit: '', presets: [{ label: 'Seed End (0.10)', val: 0.10 }, { label: 'Middle (0.50)', val: 0.50 }, { label: 'Tail End (0.85)', val: 0.85 }] },
      { id: 'gradT', nameZh: '固液界面溫度梯度 (G)', nameEn: 'Thermal Gradient (G)', min: 10, max: 50, step: 5, default: 30, unit: 'K/cm' }
    ],
    calculate: (p) => {
      const k0 = p.dopant;
      const relativeC = k0 * Math.pow(1 - p.fs, k0 - 1);
      const pullSpeed = (p.gradT * 0.065).toFixed(2); // mm/min 典型熱估算
      return [
        { labelZh: '相對摻雜濃度 (Cs / C0)', labelEn: 'Dopant Ratio (Cs/C0)', value: relativeC.toFixed(2), unit: 'x', highlight: true, noteZh: '在本例 k0 < 1 的 Scheil 假設下，濃度隨固化比例上升', noteEn: 'For k0 < 1 under Scheil assumptions, concentration rises with solidified fraction' },
        { labelZh: '拉速教學估值', labelEn: 'Illustrative Pull Speed', value: pullSpeed, unit: 'mm/min', highlight: false, noteZh: '固定係數示例；未作 v/G 或缺陷風險校準', noteEn: 'Fixed-coefficient example; no v/G or defect-risk calibration' }
      ];
    }
  },

  // Ch 04: 微影
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

  // Ch 05: 薄膜
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
        { labelZh: '最終薄膜厚度 (Thickness)', labelEn: 'Film Thickness', value: thickness.toFixed(1), unit: 'nm', highlight: false, noteZh: (thickness * 10).toFixed(0) + ' Å (埃米)', noteEn: 'Equivalent to ' + (thickness * 10).toFixed(0) + ' Å' }
      ];
    }
  },

  // Ch 06: 蝕刻
  ch06: {
    id: 'ch06',
    titleZh: '電漿反應離子蝕刻選擇比與 ARDE 延遲計算器 (RIE Selectivity & Aspect Ratio Etch Lag)',
    titleEn: 'RIE Etch Selectivity & Aspect Ratio Dependent Etching (ARDE) Calculator',
    formulaLatex: 'S = \\frac{ER_{target}}{ER_{mask}}, \\quad ER(AR) = ER_0 \\cdot \\frac{1}{1 + \\beta \\cdot AR}',
    descriptionZh: '計算電漿蝕刻對光阻/硬遮罩之選擇比 S，並定量高深寬比溝槽深處因克努森傳輸受限導致的蝕刻延遲 (ARDE)。',
    descriptionEn: 'Compute target-to-mask etch selectivity and Aspect Ratio Dependent Etching (ARDE) reduction factor.',
    params: [
      { id: 'erTarget', nameZh: '目標層蝕刻速率 (Target ER)', nameEn: 'Target ER', min: 50, max: 800, step: 25, default: 350, unit: 'nm/min' },
      { id: 'erMask', nameZh: '光阻遮罩損耗率 (Mask ER)', nameEn: 'Mask ER', min: 10, max: 150, step: 5, default: 35, unit: 'nm/min' },
      { id: 'ar', nameZh: '深寬比 (Aspect Ratio)', nameEn: 'Aspect Ratio (AR)', min: 1, max: 60, step: 1, default: 15, unit: ':1', presets: [{ label: 'Logic Fin (5:1)', val: 5 }, { label: 'STI (10:1)', val: 10 }, { label: '3D NAND Hole (50:1)', val: 50 }] },
      { id: 'beta', nameZh: 'ARDE 阻力因子 (Beta)', nameEn: 'ARDE Factor (Beta)', min: 0.01, max: 0.05, step: 0.005, default: 0.02, unit: '' }
    ],
    calculate: (p) => {
      const selectivity = (p.erTarget / p.erMask).toFixed(1);
      const lagFactor = 1 / (1 + p.beta * p.ar);
      const bottomRate = (p.erTarget * lagFactor).toFixed(1);
      return [
        { labelZh: '蝕刻選擇比 (Selectivity)', labelEn: 'Etch Selectivity', value: selectivity, unit: ':1', highlight: true, noteZh: '選擇比 > 10:1 確保遮罩不被過度打穿', noteEn: 'Selectivity > 10:1 prevents mask punch-through' },
        { labelZh: '深孔底部蝕刻速率 (Bottom ER)', labelEn: 'Bottom Etch Rate', value: bottomRate, unit: 'nm/min', highlight: false, noteZh: '受 ARDE 影響衰減為表面的 ' + (lagFactor * 100).toFixed(0) + '%', noteEn: 'Reduced to ' + (lagFactor * 100).toFixed(0) + '% of surface ER' }
      ];
    }
  },

  // Ch 07: 離子佈植
  ch07: {
    id: 'ch07',
    titleZh: '離子佈植射程與摻雜峰值計算器 (LSS Theory)',
    titleEn: 'Ion Implantation Range & Peak Concentration Calculator',
    formulaLatex: 'C(x) = \\frac{\\Phi}{\\sqrt{2\\pi} \\Delta R_p} \\exp\\left(-\\frac{(x - R_p)^2}{2 \\Delta R_p^2}\\right)',
    descriptionZh: 'LSS 相關高斯教學近似：以簡化經驗係數估計投影射程 Rp、離散 ΔRp 與體積峰值濃度 Cmax；不是已校準的佈植模型。',
    descriptionEn: 'LSS-inspired Gaussian teaching approximation: estimate Rp, Delta Rp and peak volume concentration using simplified empirical coefficients; this is not a calibrated implant model.',
    params: [
      { id: 'energy', nameZh: '佈植能量 (Energy)', nameEn: 'Implant Energy', min: 5, max: 200, step: 5, default: 50, unit: 'keV', presets: [{ label: 'Ultra-shallow (5 keV)', val: 5 }, { label: 'Medium (50 keV)', val: 50 }, { label: 'Deep Well (180 keV)', val: 180 }] },
      { id: 'dose', nameZh: '注入劑量 (Dose Φ)', nameEn: 'Dose (Φ)', min: 1e11, max: 1e16, step: 1e13, default: 5e14, unit: 'ions/cm²', presets: [{ label: 'Vt adjust (1e12)', val: 1e12 }, { label: 'Halo/Pocket (5e13)', val: 5e13 }, { label: 'Source/Drain (5e15)', val: 5e15 }] },
      { id: 'ion', nameZh: '離子種類 (Species)', nameEn: 'Ion Species', min: 1, max: 3, step: 1, default: 2, presets: [{ label: 'Boron (B, Light)', val: 1 }, { label: 'Phosphorus (P, Med)', val: 2 }, { label: 'Arsenic (As, Heavy)', val: 3 }] }
    ],
    calculate: (p) => {
      let rpCoeff = 3.5, deltaCoeff = 1.2;
      if (p.ion === 1) { rpCoeff = 3.8; deltaCoeff = 1.5; }
      else if (p.ion === 3) { rpCoeff = 0.8; deltaCoeff = 0.3; }
      const Rp = rpCoeff * Math.pow(p.energy, 0.75); // nm
      const deltaRp = deltaCoeff * Math.pow(p.energy, 0.65); // nm
      const deltaRp_cm = deltaRp * 1e-7;
      const peakC = p.dose / (Math.sqrt(2 * Math.PI) * deltaRp_cm);
      return [
        { labelZh: '投影射程深度 (Rp)', labelEn: 'Projected Range (Rp)', value: Rp.toFixed(1), unit: 'nm', highlight: true, noteZh: '摻雜分佈最高峰所在深度', noteEn: 'Depth of peak concentration profile' },
        { labelZh: '分佈離散度 (ΔRp)', labelEn: 'Range Straggle (ΔRp)', value: deltaRp.toFixed(1), unit: 'nm', highlight: false, noteZh: '標準差寬度', noteEn: 'Gaussian standard deviation' },
        { labelZh: '峰值摻雜濃度 (Cmax)', labelEn: 'Peak Concentration', value: peakC.toExponential(2), unit: 'cm⁻³', highlight: false, noteZh: '10²⁰ cm⁻³ 僅為濃度教學參考，非通用非晶化門檻；損傷須依佈植條件驗證。', noteEn: '10²⁰ cm⁻³ is an illustrative concentration, not a universal amorphization threshold; damage requires implant-specific validation.' }
      ];
    }
  },

  // Ch 08: CMP
  ch08: {
    id: 'ch08',
    titleZh: 'CMP 平坦化材料移除率計算器 (Preston Equation)',
    titleEn: 'Chemical Mechanical Planarization Material Removal Rate (MRR) Calculator',
    formulaLatex: '\\text{MRR} = K_p \\cdot P \\cdot V',
    descriptionZh: '利用 Preston 定律評估拋光下壓力（Downforce）與研磨墊線速度（Velocity）對介電層/銅金屬移除率的線性關聯。',
    descriptionEn: 'Evaluate Chemical Mechanical Planarization removal rate as a function of polish downforce, platen velocity, and Preston constant.',
    params: [
      { id: 'pressure', nameZh: '研磨下壓力 (Pressure P)', nameEn: 'Downforce (P)', min: 0.5, max: 5.0, step: 0.1, default: 2.0, unit: 'psi', presets: [{ label: 'Low-Stress Cu (1.2 psi)', val: 1.2 }, { label: 'Standard (2.0 psi)', val: 2.0 }, { label: 'Oxide Polish (3.5 psi)', val: 3.5 }] },
      { id: 'velocity', nameZh: '相對線速度 (Velocity V)', nameEn: 'Relative Velocity (V)', min: 0.2, max: 2.5, step: 0.1, default: 1.2, unit: 'm/s', presets: [{ label: 'Slow (0.6 m/s)', val: 0.6 }, { label: 'Standard (1.2 m/s)', val: 1.2 }, { label: 'Fast (2.0 m/s)', val: 2.0 }] },
      { id: 'kp', nameZh: '普雷斯頓常數 (Preston Kp)', nameEn: 'Preston Constant (Kp)', min: 50, max: 250, step: 10, default: 120, unit: 'Å/(min·psi·m/s)', presets: [{ label: 'Oxide Slurry (80)', val: 80 }, { label: 'Copper Slurry (140)', val: 140 }, { label: 'Tungsten (110)', val: 110 }] }
    ],
    calculate: (p) => {
      const mrr_A = p.kp * p.pressure * p.velocity;
      const mrr_nm = mrr_A / 10;
      return [
        { labelZh: '材料移除速率 (MRR)', labelEn: 'Removal Rate (MRR)', value: mrr_nm.toFixed(1), unit: 'nm/min', highlight: true, noteZh: '約合 ' + mrr_A.toFixed(0) + ' Å/min', noteEn: 'Equivalent to ' + mrr_A.toFixed(0) + ' Å/min' },
        { labelZh: '移除 100nm 所需時間', labelEn: 'Time for 100nm', value: (100 / mrr_nm).toFixed(1), unit: 'min', highlight: false, noteZh: '終點檢測 (EPD) 停光依據', noteEn: 'Basis for optical endpoint detection (EPD)' }
      ];
    }
  },

  // Ch 09: 清洗與表面工程
  ch09: {
    id: 'ch09',
    titleZh: 'RCA 清洗兆聲波微粒脫附力比值計算器 (Megasonic Acoustic Drag vs Van der Waals)',
    titleEn: 'Megasonic Particle Removal Force Ratio Calculator',
    formulaLatex: 'F_{drag} = 3\\pi \\mu d_p v, \\quad F_{vdw} = \\frac{A_H d_p}{12 z_0^2}, \\quad Ratio = \\frac{F_{drag}}{F_{vdw}}',
    descriptionZh: '教學模型：計算聲流拖曳力與凡得瓦爾吸附力之比值，不計算微粒去除效率 (PRE)。',
    descriptionEn: 'Teaching model: compute acoustic drag relative to van der Waals adhesion; it does not calculate particle removal efficiency (PRE).',
    params: [
      { id: 'dp', nameZh: '微粒直徑 (Particle Diameter)', nameEn: 'Particle Size (dp)', min: 10, max: 200, step: 10, default: 30, unit: 'nm', presets: [{ label: 'Sub-20nm Killer (15nm)', val: 15 }, { label: 'Standard (30nm)', val: 30 }, { label: 'Macro (100nm)', val: 100 }] },
      { id: 'freq', nameZh: '兆聲波頻率 (Frequency)', nameEn: 'Frequency', min: 0.8, max: 2.0, step: 0.1, default: 1.0, unit: 'MHz' },
      { id: 'power', nameZh: '聲波功率密度 (Power)', nameEn: 'Power Density', min: 0.5, max: 3.0, step: 0.2, default: 1.5, unit: 'W/cm²' }
    ],
    calculate: (p) => {
      const v = Math.sqrt(p.power) * 1.8; // m/s
      const mu = 1.0e-3; // Pa·s
      const Fdrag = 3 * Math.PI * mu * (p.dp * 1e-9) * v; // N
      const AH = 1.0e-19; // J (Si - water - SiO2)
      const z0 = 0.4e-9; // nm 典型間距
      const Fvdw = (AH * (p.dp * 1e-9)) / (12 * z0 * z0);
      const ratio = (Fdrag / Fvdw) * 100;
      return [
        { labelZh: '聲流拖曳力 (Acoustic Drag)', labelEn: 'Acoustic Drag Force', value: (Fdrag * 1e9).toFixed(2), unit: 'nN', highlight: false, noteZh: '由兆聲波聲流邊界層產生', noteEn: 'Generated by acoustic streaming boundary' },
        { labelZh: '脫附作用力比 (Drag / Adhesion)', labelEn: 'Removal Force Ratio', value: ratio.toFixed(1), unit: '%', highlight: true, noteZh: '此百分比為拖曳力／吸附力比，並非 PRE；模型未計入 SC-1 化學作用。', noteEn: 'This percentage is drag/adhesion, not PRE; SC-1 chemistry is not modeled.' }
      ];
    }
  },

  // Ch 10: 金屬化
  ch10: {
    id: 'ch10',
    titleZh: '表面散射電阻率與相對電遷移壽命教學計算器',
    titleEn: 'Surface-Scattering Resistivity & Relative EM Lifetime Teaching Calculator',
    formulaLatex: '\\rho(d) = \\rho_0 \\left[1 + \\frac{3}{8}\\frac{\\lambda}{d}(1-p)\\right], \\quad \\frac{L}{L_{ref}} = \\left(\\frac{J_{ref}}{J}\\right)^2 \\exp\\left[\\frac{E_a}{k_B}\\left(\\frac{1}{T}-\\frac{1}{T_{ref}}\\right)\\right]',
    descriptionZh: '<20nm 導線為教學情境；僅含簡化表面散射，未另計晶界散射。相對壽命以 Jref=2 MA/cm²、Tref=105°C（378.15 K）定義為1；n=2、Ea=0.9 eV 是教學假設。曲線與數值卡共用當前 J、T；參考條件固定，不換算年限或作產品合格判定。',
    descriptionEn: 'Sub-20nm wires are a teaching scenario; surface scattering has no separate grain-boundary term. Relative lifetime is defined as 1 at Jref=2 MA/cm² and Tref=105°C (378.15 K); n=2 and Ea=0.9 eV are teaching assumptions. The curve and card share the current J and T, with fixed reference conditions. No conversion to years or product qualification.',
    params: [
      { id: 'width', nameZh: '導線線寬 (Width d)', nameEn: 'Wire Width (d)', min: 10, max: 65, step: 2, default: 18, unit: 'nm', presets: [{ label: 'Advanced M1 (14nm)', val: 14 }, { label: 'Standard M2 (24nm)', val: 24 }, { label: 'Relaxed (50nm)', val: 50 }] },
      { id: 'currentJ', nameZh: '電流密度 (Current Density J)', nameEn: 'Current Density (J)', min: 0.5, max: 5.0, step: 0.5, default: 2.0, unit: 'MA/cm²' },
      { id: 'tempC', nameZh: '晶片工作溫度 (T)', nameEn: 'Operating Temp (T)', min: 60, max: 130, step: 5, default: 105, unit: '°C' }
    ],
    calculate: (p) => {
      const rho0 = 1.7; // µΩ·cm
      const lambda = 39; // nm 銅自由程
      const pScatter = 0.2;
      const rho = rho0 * (1 + (3 / 8) * (lambda / p.width) * (1 - pScatter));
      const relativeLifetime = relativeEmLifetime(p.currentJ, p.tempC);
      return [
        { labelZh: '有效薄膜電阻率 (Effective ρ)', labelEn: 'Effective Resistivity', value: rho.toFixed(2), unit: 'µΩ·cm', highlight: true, noteZh: '相較大塊銅 (1.7) 因尺寸效應激增', noteEn: 'Surges over bulk Cu (1.7) due to size effect' },
        { labelZh: '相對模型壽命 (L/Lref)', labelEn: 'Relative modeled lifetime (L/Lref)', value: relativeLifetime.toFixed(3), unit: '×', highlight: false, noteZh: '固定參考條件＝1；無因次教學比值，非實測壽命或可靠度預測。', noteEn: 'Fixed reference conditions = 1; a dimensionless teaching ratio, not measured lifetime or a reliability prediction.' }
      ];
    }
  },

  // Ch 11: CMOS 流程整合
  ch11: {
    id: 'ch11',
    titleZh: "CMOS 等溫熱預算與擴散長度教學計算器",
    titleEn: "CMOS Isothermal Thermal-Budget & Diffusion Teaching Calculator",
    formulaLatex: 'L_{diff} = 2 \\sqrt{D \\cdot t}, \\quad D = D_0 \\exp\\left(-\\frac{E_a}{k_B T}\\right)',
    descriptionZh: "以單一固定溫度與持續時間計算 Ldiff；D0=0.76 cm²/s、Ea=3.46 eV 為沿用教學假設，未積分升降溫曲線、跨站累積或校準實際 RTA／FLA／LSA。",
    descriptionEn: "Calculate Ldiff at one constant temperature and dwell time. D0=0.76 cm²/s and Ea=3.46 eV are existing teaching assumptions; this does not integrate ramps or process history, or calibrate actual RTA/FLA/LSA.",
    params: [
      { id: 'tempRta', nameZh: '尖峰退火溫度 (Peak T)', nameEn: 'Peak Anneal Temp', min: 950, max: 1350, step: 25, default: 1050, unit: '°C', presets: [{ label: 'Spike RTA (1050°C)', val: 1050 }, { label: 'Flash Anneal (1250°C)', val: 1250 }, { label: 'Nanosecond Laser (1300°C)', val: 1300 }] },
      { id: 'timeSec', nameZh: '高溫持續時間 (Dwell Time)', nameEn: 'Dwell Time', min: 0.001, max: 10.0, step: 0.001, default: 1.5, unit: 'sec', presets: [{ label: '1 ms teaching example', val: 0.001 }, { label: 'Flash (5 ms)', val: 0.005 }, { label: 'Spike (1.5s)', val: 1.5 }] }
    ],
    calculate: (p) => {
      const kB = 8.617e-5;
      const T_K = p.tempRta + 273.15;
      const D0 = 0.76; // cm²/s (Boron)
      const Ea = 3.46; // eV
      const D = D0 * Math.exp(-Ea / (kB * T_K)); // cm²/s
      const Ldiff_cm = 2 * Math.sqrt(D * p.timeSec);
      const Ldiff_nm = Ldiff_cm * 1e7;
      return [
        { labelZh: '雜質擴散長度 (Ldiff)', labelEn: 'Diffusion Length', value: Ldiff_nm < 0.1 ? Ldiff_nm.toExponential(2) : Ldiff_nm.toFixed(2), unit: 'nm', highlight: true, noteZh: "< 2 nm 為教學目標例值，非通用節點規格", noteEn: "< 2 nm is an illustrative target, not a universal sub-3nm specification" },
        { labelZh: '熱預算因子 (D·t)', labelEn: 'Thermal Metric (D·t)', value: (D * p.timeSec * 1e14).toFixed(3), unit: 'nm²', highlight: false, noteZh: "單一等溫步驟的 D·t；未包含跨站累積", noteEn: "D·t for one isothermal step; no multi-step accumulation" }
      ];
    }
  },

  // Ch 12: 元件演進 (GAA / FinFET)
  ch12: {
    id: 'ch12',
    titleZh: 'GAA 奈米片有效寬度與飽和驅動電流計算器 (GAA Nanosheet Weff & Ion Drive)',
    titleEn: 'GAA Nanosheet Effective Width & Saturation Drive Current Calculator',
    formulaLatex: 'W_{eff} = 2 \\cdot N_{sheet} \\cdot (W_{sheet} + T_{sheet}), \\quad I_{on} = W_{eff} \\cdot J_{sat}',
    descriptionZh: "依四面矩形通道近似計算 GAA 的 Weff，並以輸入 Jsat 換算 Ion。未建立同佔位面積的 FinFET 比較、實測電流校準或電路模型。",
    descriptionEn: "Use a four-sided rectangular-channel approximation for GAA Weff and the supplied Jsat for Ion. No equal-footprint FinFET comparison, measured-current calibration or circuit model is included.",
    params: [
      { id: 'nSheets', nameZh: '奈米片堆疊層數 (Sheets N)', nameEn: 'Number of Sheets', min: 2, max: 4, step: 1, default: 3, unit: '層', presets: [{ label: '2 Sheets', val: 2 }, { label: '3 Sheets (Standard)', val: 3 }, { label: '4 Sheets (High-Drive)', val: 4 }] },
      { id: 'wSheet', nameZh: '奈米片寬度 (Width W)', nameEn: 'Sheet Width (W)', min: 15, max: 55, step: 5, default: 35, unit: 'nm', presets: [{ label: 'Narrow (20nm)', val: 20 }, { label: 'Standard (35nm)', val: 35 }, { label: 'Wide (50nm)', val: 50 }] },
      { id: 'tSheet', nameZh: '奈米片厚度 (Thickness T)', nameEn: 'Sheet Thickness (T)', min: 4, max: 8, step: 0.5, default: 5, unit: 'nm' },
      { id: 'jsat', nameZh: "單位有效寬度電流 (Jsat)", nameEn: "Current per Effective Width", min: 0.8, max: 2.0, step: 0.1, default: 1.4, unit: 'mA/µm' }
    ],
    calculate: (p) => {
      const weff_single = 2 * (p.wSheet + p.tSheet);
      const weff_total = p.nSheets * weff_single; // nm
      const ion = (weff_total / 1000) * p.jsat; // mA
      return [
        { labelZh: '總有效導電通道寬度 (Weff)', labelEn: 'Effective Width (Weff)', value: weff_total, unit: 'nm', highlight: true, noteZh: "矩形通道周長加總；未建立等佔位面積 FinFET 比較", noteEn: "Sum of rectangular channel perimeters; no equal-footprint FinFET comparison" },
        { labelZh: '飽和開態電流 (Drive Ion)', labelEn: 'Saturation Drive Ion', value: ion.toFixed(2), unit: 'mA', highlight: false, noteZh: "Ion = Weff × Jsat 教學估計；未計算延遲、壓降或雜訊容限", noteEn: "Ion = Weff × Jsat teaching estimate; delay, IR drop and noise margin are not calculated" }
      ];
    }
  },

  // Ch 13: 記憶體
  ch13: {
    id: 'ch13',
    titleZh: 'DRAM 電荷分享與感測壓差教學計算器',
    titleEn: 'DRAM Charge-Sharing and Sensing-Voltage Teaching Calculator',
    formulaLatex: '\\Delta V_{BL} = \\frac{V_{DD}}{2} \\cdot \\frac{C_S}{C_S + C_{BL}}, \\quad J_{FN} = A E^2 \\exp\\left(-\\frac{B}{E}\\right)',
    descriptionZh: '本教學例只計算 DRAM 電荷分享造成的位元線壓差 ΔV 與電容比。下列 Fowler-Nordheim 公式保留作概念參考，這個計算器未計算其電場或穿隧電流；結果未經實測校準，不代表感測可靠度。',
    descriptionEn: 'This teaching example calculates only the DRAM bitline voltage difference ΔV and capacitance ratio from charge sharing. The Fowler-Nordheim formula below remains a conceptual reference; this calculator does not compute its electric field or tunneling current. Results are not experimentally calibrated and do not establish sensing reliability.',
    params: [
      { id: 'cs', nameZh: '單元電容 (Cell Cap Cs)', nameEn: 'Cell Cap (Cs)', min: 8, max: 25, step: 1, default: 12, unit: 'fF' },
      { id: 'cbl', nameZh: '位元線電容 (Bitline Cap Cbl)', nameEn: 'Bitline Cap (Cbl)', min: 30, max: 120, step: 5, default: 60, unit: 'fF' },
      { id: 'vdd', nameZh: '供電電壓 (VDD)', nameEn: 'Supply Voltage (VDD)', min: 0.8, max: 1.5, step: 0.1, default: 1.1, unit: 'V' }
    ],
    calculate: (p) => {
      const deltaV = ((p.vdd / 2) * (p.cs / (p.cs + p.cbl))) * 1000; // mV
      return [
        { labelZh: '位元線感測壓差 (Delta V)', labelEn: 'Sensing Margin (ΔV)', value: deltaV.toFixed(1), unit: 'mV', highlight: true, noteZh: '> 60 mV 僅為教學參考，非經校準的可靠辨識門檻', noteEn: '> 60 mV is an illustrative reference, not a calibrated sensing-reliability threshold' },
        { labelZh: '電容分享比 (Cs / (Cs+Cbl))', labelEn: 'Capacitance Ratio', value: ((p.cs / (p.cs + p.cbl)) * 100).toFixed(1), unit: '%', highlight: false, noteZh: '3D DRAM 堆疊與位元線寄生電容為延伸議題；本例未模擬結構效應', noteEn: '3D DRAM stacking and bitline parasitics are related topics; structural effects are not modeled here' }
      ];
    }
  },

  // Ch 14: 微縮與 Dennard
  ch14: {
    id: 'ch14',
    titleZh: '相對面積與動態功耗密度教學計算器',
    titleEn: 'Relative Area & Dynamic Power Density Teaching Model',
    formulaLatex: '\\text{Scale} = \\kappa, \\quad \\text{Area} = \\kappa^2, \\quad P_{dyn} \\propto C V^2 f, \\quad P_{leak} = I_{off} \\cdot V',
    descriptionZh: '以尺寸、電壓及頻率倍率估算相對面積與動態功耗密度。P_leak = I_off·V 保留為背景關係，本計算未納入漏電，亦不計算 TDP 或校準散熱極限。',
    descriptionEn: 'Estimate relative area and dynamic power density from dimension, voltage and frequency ratios. P_leak = I_off·V is retained as a background relation; leakage is not included, and this model does not calculate TDP or a calibrated cooling limit.',
    params: [
      { id: 'kappa', nameZh: '微縮比例 (Scaling Factor)', nameEn: 'Scaling Factor (κ)', min: 0.6, max: 0.85, step: 0.05, default: 0.70, unit: '', presets: [{ label: 'Classic Dennard (0.70)', val: 0.70 }, { label: 'Modern Slowdown (0.80)', val: 0.80 }] },
      { id: 'vScale', nameZh: '電壓縮放 (Voltage Scaling)', nameEn: 'Voltage Scaling', min: 0.70, max: 1.0, step: 0.05, default: 0.95, unit: '', presets: [{ label: 'Modern (0.95, Voltage Wall)', val: 0.95 }, { label: 'Ideal (0.70)', val: 0.70 }] },
      { id: 'fScale', nameZh: '頻率倍增 (Freq Boost)', nameEn: 'Frequency Multiplier', min: 1.0, max: 1.4, step: 0.05, default: 1.15, unit: 'x' }
    ],
    calculate: (p) => {
      const areaRatio = p.kappa * p.kappa;
      const powerDyn = p.kappa * (p.vScale * p.vScale) * p.fScale;
      const powerDensity = powerDyn / areaRatio;
      return [
        { labelZh: '單元面積微縮比 (Area)', labelEn: 'Area Scaling', value: areaRatio.toFixed(2), unit: 'x (原有面積)', highlight: true, noteZh: '教學示例：0.7² = 0.49 倍原有面積', noteEn: 'Teaching example: 0.7² = 0.49 times the original area' },
        { labelZh: '相對動態功耗密度', labelEn: 'Relative Dynamic Power Density', value: powerDensity.toFixed(2), unit: 'x', highlight: true, noteZh: '> 1.0 僅表示比基準增加，非實際散熱極限', noteEn: '> 1.0 means an increase relative to the baseline, not a physical cooling limit' }
      ];
    }
  },

  // Ch 15: 計量與檢測
  ch15: {
    id: 'ch15',
    titleZh: '橢偏參數教學關係計算器',
    titleEn: 'Ellipsometric Parameter Teaching Calculator',
    formulaLatex: '\\rho = \\tan(\\Psi) e^{i \\Delta} = \\frac{r_p}{r_s}',
    descriptionZh: '本例以輸入的 n 與 Δ 產生未校準厚度示例，Ψ 僅用於振幅比 tan(Ψ)。n 是輸入而非反演結果；沒有實測資料、多層光學擬合或誤差模型。所示偏振關係式保留作概念參考；結果不代表實測膜厚或設備精度。',
    descriptionEn: 'Input n and Δ produce an uncalibrated thickness example; Ψ is used only for the amplitude ratio tan(Ψ). n is an input, not a fitted result. There are no measured data, multilayer optical fit or uncertainty model. The shown polarization relation remains a conceptual reference; outputs are not measured thickness or instrument precision.',
    params: [
      { id: 'psiDeg', nameZh: '振幅比角 (Psi Ψ)', nameEn: 'Amplitude Angle (Ψ)', min: 10, max: 45, step: 1, default: 28, unit: '°' },
      { id: 'deltaDeg', nameZh: '相位差角 (Delta Δ)', nameEn: 'Phase Shift (Δ)', min: 40, max: 180, step: 2, default: 110, unit: '°' },
      { id: 'refrN', nameZh: '介質折射率 (Refractive Index n)', nameEn: 'Refractive Index (n)', min: 1.4, max: 3.5, step: 0.01, default: 1.46, unit: '', presets: [{ label: 'SiO2 (1.46)', val: 1.46 }, { label: 'Si3N4 (2.00)', val: 2.00 }, { label: 'HfO2 (2.10)', val: 2.10 }] }
    ],
    calculate: (p) => {
      const lambda = 632.8; // HeNe nm
      const thickness = (lambda / (4 * Math.PI * Math.sqrt(p.refrN * p.refrN - 0.5))) * ((180 - p.deltaDeg) / 180) * 8;
      return [
        { labelZh: '教學厚度示例 (Thickness)', labelEn: 'Illustrative Thickness', value: thickness.toFixed(2), unit: 'nm', highlight: true, noteZh: '0.05 nm (0.5 Å) 僅為未確認參考值；本例無精度模型', noteEn: '0.05 nm (0.5 Å) is an unverified reference; no precision model is implemented' },
        { labelZh: '偏振反射比 (|rp/rs|)', labelEn: 'Polarization Ratio', value: Math.tan((p.psiDeg * Math.PI) / 180).toFixed(3), unit: '', highlight: false, noteZh: '菲涅耳反射係數振幅比', noteEn: 'Fresnel reflectance amplitude ratio' }
      ];
    }
  },

  // Ch 16: 良率
  ch16: {
    id: 'ch16',
    titleZh: '晶圓良率教學模型 (Poisson、Murphy 與負二項)',
    titleEn: 'Wafer Yield Teaching Models: Poisson, Murphy & Negative Binomial',
    formulaLatex: 'Y_{Poisson} = e^{-D_0 A}, \\quad Y_{Murphy} = \\left(\\frac{1 - e^{-D_0 A}}{D_0 A}\\right)^2, \\quad Y_{NegBinom} = \\left(1 + \\frac{D_0 A}{\\alpha}\\right)^{-\\alpha}',
    descriptionZh: '以面積、缺陷密度與群聚因子比較三個解析教學模型；面積輸入 mm²，公式內轉為 cm²。未以實測資料校準，也不包含邊緣位置或完整製程效應。α=5 仍是有限群聚例值，不等同 Poisson；結果不是實際量產良率保證。',
    descriptionEn: 'Compare three analytical teaching models using area, defect density and clustering factor; area inputs in mm² are converted to cm². The models are uncalibrated and do not include edge positions or full process effects. α=5 is a finite-clustering example, not identical to Poisson; outputs do not guarantee production yield.',
    params: [
      { id: 'area', nameZh: '晶粒面積 (Die Area A)', nameEn: 'Die Area (A)', min: 10, max: 900, step: 5, default: 100, unit: 'mm²', presets: [{ label: 'Small MCU (25 mm²)', val: 25 }, { label: 'Mid AP (100 mm²)', val: 100 }, { label: 'Large AI GPU (800 mm²)', val: 800 }] },
      { id: 'd0', nameZh: '致命缺陷密度 (Defect Density D0)', nameEn: 'Defect Density (D0)', min: 0.01, max: 0.50, step: 0.01, default: 0.08, unit: 'defects/cm²', presets: [{ label: 'Mature Fab (0.04)', val: 0.04 }, { label: 'Ramp-up (0.10)', val: 0.10 }, { label: 'Early Dev (0.25)', val: 0.25 }] },
      { id: 'clusterAlpha', nameZh: '缺陷聚集因子 (Clustering Alpha)', nameEn: 'Clustering Factor (α)', min: 0.5, max: 5.0, step: 0.5, default: 2.0, unit: '', presets: [{ label: 'High Clustering (1.0)', val: 1.0 }, { label: 'Moderate (2.0)', val: 2.0 }, { label: 'α = 5.0', val: 5.0 }] }
    ],
    calculate: (p) => {
      const area_cm2 = p.area / 100;
      const D0A = p.d0 * area_cm2;
      const yPoisson = Math.exp(-D0A) * 100;
      const yMurphy = (D0A === 0 ? 1 : Math.pow((1 - Math.exp(-D0A)) / D0A, 2)) * 100;
      const yNegBinom = Math.pow(1 + D0A / p.clusterAlpha, -p.clusterAlpha) * 100;
      return [
        { labelZh: '負二項模型良率示例', labelEn: 'Negative Binomial Model Yield', value: yNegBinom.toFixed(1), unit: '%', highlight: true, noteZh: '一般群聚假設；未建模邊緣位置，未校準', noteEn: 'General clustering assumption; edge positions are not modeled, and the result is uncalibrated' },
        { labelZh: '墨菲模型良率 (Murphy)', labelEn: 'Murphy Yield', value: yMurphy.toFixed(1), unit: '%', highlight: false, noteZh: '三角分佈假設的教學估算，未校準', noteEn: 'Teaching estimate under a triangular-distribution assumption; uncalibrated' },
        { labelZh: '泊松模型良率示例 (Poisson)', labelEn: 'Poisson Model Yield', value: yPoisson.toFixed(1), unit: '%', highlight: false, noteZh: '隨機無群聚假設，不是所有製程的良率下限', noteEn: 'Random, unclustered assumption; not a universal process-yield lower bound' }
      ];
    }
  },

  // Ch 17: SPC
  ch17: {
    id: 'ch17',
    titleZh: 'Cp／Cpk 與常態雙尾超規率教學計算器',
    titleEn: 'Cp / Cpk & Normal Two-Tail Nonconformance Teaching Calculator',
    formulaLatex: 'C_p = \\frac{USL - LSL}{6\\sigma}, \\quad C_{pk} = \\min\\left(\\frac{USL - \\mu}{3\\sigma}, \\frac{\\mu - LSL}{3\\sigma}\\right)',
    descriptionZh: '保留 Cp／Cpk 公式；PPM = [Φ((LSL−μ)/σ) + 1−Φ((USL−μ)/σ)] × 10⁶。假設穩定常態分布，非實測或校準預測；能力不代表統計穩定性。曲線使用相同均值／標準差，標示均值與兩側規格。',
    descriptionEn: 'Cp/Cpk formulas are unchanged. PPM = [Φ((LSL−μ)/σ) + 1−Φ((USL−μ)/σ)] × 10⁶. Assumes a stable normal distribution; not measured or calibrated performance. Capability does not establish statistical stability. The curve uses the same mean/sigma and marks the mean and both specifications.',
    params: [
      { id: 'usl', nameZh: '規格上限 (USL)', nameEn: 'Upper Spec Limit (USL)', min: 100, max: 200, step: 1, default: 110, unit: 'nm' },
      { id: 'lsl', nameZh: '規格下限 (LSL)', nameEn: 'Lower Spec Limit (LSL)', min: 50, max: 100, step: 1, default: 90, unit: 'nm' },
      { id: 'mean', nameZh: '製程中心平均值 (Mean μ)', nameEn: 'Process Mean (μ)', min: 90, max: 110, step: 0.1, default: 100.8, unit: 'nm' },
      { id: 'sigma', nameZh: '製程標準差 (Sigma σ)', nameEn: 'Standard Deviation (σ)', min: 0.5, max: 5.0, step: 0.1, default: 2.0, unit: 'nm' }
    ],
    calculate: (p) => {
      const cp = (p.usl - p.lsl) / (6 * p.sigma);
      const cpkUpper = (p.usl - p.mean) / (3 * p.sigma);
      const cpkLower = (p.mean - p.lsl) / (3 * p.sigma);
      const cpk = Math.min(cpkUpper, cpkLower);
      const ppm = normalDefectPpm(p);
      const valid = Number.isFinite(ppm);
      const ppmText = valid ? (ppm >= 0.01 ? ppm.toFixed(2) : ppm.toExponential(3)) : 'N/A';

      return [
        { labelZh: '製程能力指數 (Cpk)', labelEn: 'Process Cpk', value: valid ? cpk.toFixed(2) : 'N/A', unit: '', highlight: true, noteZh: '1.67 僅為示範門檻；不是通用放行或穩定性判定', noteEn: '1.67 is an example threshold, not a universal release or stability criterion' },
        { labelZh: '雙邊潛在能力 (Cp)', labelEn: 'Potential Cp', value: valid ? cp.toFixed(2) : 'N/A', unit: '', highlight: false, noteZh: 'Cp 大於 Cpk 表示均值未置中；不證明隨時間漂移', noteEn: 'Cp above Cpk indicates an off-center mean, not proof of drift over time' },
        { labelZh: '常態雙尾教學估計', labelEn: 'Normal Two-Tail Teaching Estimate', value: ppmText, unit: 'PPM', highlight: false, noteZh: '穩定常態假設、未校準；須 USL > LSL 且 σ > 0', noteEn: 'Stable normal assumption, uncalibrated; requires USL > LSL and σ > 0' }
      ];
    }
  },

  // Ch 18: 異常處理
  ch18: {
    id: 'ch18',
    titleZh: '8D 異常衝擊與重工損益平衡計算器 (Excursion Yield Impact & Rework Cost Break-Even)',
    titleEn: '8D Excursion Impact & Rework Cost Teaching Calculator',
    formulaLatex: '\\text{Modeled Loss} = N_{wafer} \\cdot Cost_{wafer} \\cdot (\\Delta Y/100); \\quad \\text{Net Saving} = \\text{Modeled Loss} - N_{wafer} \\cdot Cost_{rework}',
    descriptionZh: '未校準教學情境：以每片累計在製成本與良率跌幅估算損失，假設全部受影響晶圓都重工且挽回全部模型損失，再扣除重工成本。不是全批報廢估價、恢復率預測或處置建議。',
    descriptionEn: 'Uncalibrated teaching scenario: estimate loss from WIP cost per wafer and yield drop. Assume every affected wafer is reworked and all modeled loss is recovered, then subtract rework cost. Not a full-lot scrap valuation, recovery prediction or disposition recommendation.',
    params: [
      { id: 'wafers', nameZh: '受影響晶圓片數 (Wafers)', nameEn: 'Impacted Wafers', min: 25, max: 250, step: 25, default: 50, unit: 'wafers', presets: [{ label: '1 Lot (25)', val: 25 }, { label: '2 Lots (50)', val: 50 }, { label: 'Super Batch (125)', val: 125 }] },
      { id: 'waferCost', nameZh: '目前累計在製成本 (WIP Cost)', nameEn: 'WIP Cost / Wafer', min: 1000, max: 15000, step: 500, default: 4500, unit: 'USD', presets: [{ label: 'FEOL Early (2000$)', val: 2000 }, { label: 'Gate Layer (4500$)', val: 4500 }, { label: 'BEOL End (12000$)', val: 12000 }] },
      { id: 'yieldDrop', nameZh: '預估良率跌幅 (Delta Yield)', nameEn: 'Yield Loss (ΔY)', min: 5, max: 80, step: 5, default: 35, unit: '%' },
      { id: 'reworkFee', nameZh: '去膠洗淨重工成本 (Rework Cost)', nameEn: 'Rework Cost / Wafer', min: 50, max: 500, step: 5, default: 180, unit: 'USD' }
    ],
    calculate: (p) => {
      const scrapLoss = p.wafers * p.waferCost * (p.yieldDrop / 100);
      const totalReworkCost = p.wafers * p.reworkFee;
      const netSavings = scrapLoss - totalReworkCost;
      return [
        { labelZh: '未處置預估損失 (Scrap Loss)', labelEn: 'Projected Loss', value: Math.round(scrapLoss).toLocaleString(), unit: 'USD', highlight: true, noteZh: '在製成本 × 良率跌幅的教學估計，非實際扣款或全批報廢價', noteEn: 'Teaching estimate: WIP cost × yield drop, not actual charges or full-lot scrap value' },
        { labelZh: '重工淨效益 (Net Rework Saving)', labelEn: 'Rework Savings', value: Math.round(netSavings).toLocaleString(), unit: 'USD', highlight: false, noteZh: '假設挽回全部模型損失並重工所有受影響晶圓；非保證效益', noteEn: 'Assumes full modeled-loss recovery and rework of all affected wafers; not guaranteed savings' }
      ];
    }
  },

  // Ch 19: 晶圓測試
  ch19: {
    id: 'ch19',
    titleZh: '晶圓針測接觸電阻與 KGD 逃逸率計算器 (Kelvin 4-Wire & Williams-Brown Defect Level)',
    titleEn: 'Wafer Probe Contact Resistance & KGD Defect Level Calculator',
    formulaLatex: 'R_{contact} = \\frac{V_{sense}}{I_{force}}, \\quad DL = 1 - Y^{(1 - T_{cov})}',
    descriptionZh: '透過 Kelvin 四線量測消除探針引線電阻，並以 Williams-Brown 公式評估故障覆蓋率 Tcov 對已知良好晶粒 (KGD) 逃逸率之影響。',
    descriptionEn: 'Compute 4-wire Kelvin contact resistance and Williams-Brown defect escape rate for Known Good Die (KGD).',
    params: [
      { id: 'yieldY', nameZh: 'CP 針測良率 (Probe Yield Y)', nameEn: 'Probe Yield (Y)', min: 0.50, max: 0.99, step: 0.01, default: 0.88, unit: '' },
      { id: 'tCov', nameZh: '測試向量故障覆蓋率 (Coverage Tcov)', nameEn: 'Fault Coverage (Tcov)', min: 0.90, max: 0.999, step: 0.005, default: 0.985, unit: '', presets: [{ label: 'Standard (0.95)', val: 0.95 }, { label: 'Automotive Grade (0.995)', val: 0.995 }] },
      { id: 'forceG', nameZh: '探針接觸下壓力 (Probe Force)', nameEn: 'Probe Force', min: 1.0, max: 8.0, step: 0.5, default: 3.5, unit: 'g/needle' }
    ],
    calculate: (p) => {
      const DL = 1 - Math.pow(p.yieldY, 1 - p.tCov);
      const dpm = Math.round(DL * 1e6);
      const rContact = (0.25 / Math.sqrt(p.forceG)).toFixed(2);
      return [
        { labelZh: 'KGD 不良逃逸率 (Defect Level)', labelEn: 'KGD Defect Level', value: dpm, unit: 'DPM', highlight: true, noteZh: '先進 3D 封裝要求逃逸率 < 50 DPM', noteEn: '3D stacked chiplets require < 50 DPM' },
        { labelZh: '探針微接觸電阻 (Contact Rc)', labelEn: 'Contact Resistance', value: rContact, unit: 'Ω', highlight: false, noteZh: '下壓力足夠穿透表面鈍化鋁氧化膜', noteEn: 'Sufficient force scrubs native oxide film' }
      ];
    }
  },

  // Ch 20: 傳統封裝
  ch20: {
    id: 'ch20',
    titleZh: '焊球熱疲勞與毛細底部填膠計算器 (Coffin-Manson Thermal Fatigue & Washburn Flow)',
    titleEn: 'Solder Bump Thermal Fatigue & Capillary Underfill Flow Calculator',
    formulaLatex: 'N_f = C \\cdot (\\Delta T)^{-m}, \\quad t_{flow} = \\frac{3 \\mu L^2}{h \\gamma \\cos\\theta}',
    descriptionZh: '評估溫度循環下晶片與載板 CTE 熱膨脹係數不匹配引發的焊球疲勞壽命，並計算覆晶底填膠 (CUF) 毛細滲透填滿時間。',
    descriptionEn: 'Model solder ball thermal cycling fatigue life and Washburn capillary underfill filling time.',
    params: [
      { id: 'deltaT', nameZh: '溫度循環溫差 (Delta T)', nameEn: 'Temp Swing (ΔT)', min: 50, max: 180, step: 10, default: 125, unit: '°C', presets: [{ label: 'Consumer (0~100°C: 100)', val: 100 }, { label: 'Auto Grade 1 (-40~125°C: 165)', val: 165 }] },
      { id: 'chipL', nameZh: '晶片邊長 (Die Length L)', nameEn: 'Die Length (L)', min: 5, max: 30, step: 1, default: 12, unit: 'mm' },
      { id: 'gapH', nameZh: '覆晶間隙高度 (Bump Gap h)', nameEn: 'Gap Height (h)', min: 20, max: 90, step: 5, default: 45, unit: 'µm' }
    ],
    calculate: (p) => {
      const Nf = Math.round(1e8 * Math.pow(p.deltaT, -2.1));
      const tFlow = ((3 * 0.5 * p.chipL * p.chipL * 1e-6) / (p.gapH * 1e-6 * 0.035 * Math.cos(25 * Math.PI / 180))).toFixed(1);
      return [
        { labelZh: '預估熱疲勞壽命 (Cycles to Fail)', labelEn: 'Thermal Fatigue Life', value: Nf.toLocaleString(), unit: 'cycles', highlight: true, noteZh: '車規 AEC-Q100 須通過 1,000 ~ 2,000 次', noteEn: 'AEC-Q100 requires 1,000 ~ 2,000 cycles' },
        { labelZh: '毛細底填耗時 (Underfill Time)', labelEn: 'Underfill Fill Time', value: tFlow, unit: 'sec', highlight: false, noteZh: '間隙越窄流動時間呈反比拉長', noteEn: 'Tighter gaps linearly increase fill duration' }
      ];
    }
  },

  // Ch 21: 先進封裝
  ch21: {
    id: 'ch21',
    titleZh: '2.5D/3D 異質整合封裝互連密度與頻寬計算器 (Interconnect Density & Bandwidth)',
    titleEn: '2.5D/3D Heterogeneous Packaging Interconnect Density & Bandwidth Calculator',
    formulaLatex: '\\text{Density} = \\frac{1}{\\text{Pitch}^2}, \\quad \\text{Bandwidth} = N_{IO} \\cdot \\text{DataRate} \\cdot 2',
    descriptionZh: '比較傳統打線、微凸塊 (Micro-bump)、矽中介層 (Silicon Interposer) 與銅對銅混合鍵合 (Hybrid Bonding) 的互連密度與線路頻寬。',
    descriptionEn: 'Compute interconnect density and total shoreline bandwidth across standard bumps, TSVs, and direct Cu-Cu hybrid bonding.',
    params: [
      { id: 'pitch', nameZh: '互連節距 (Interconnect Pitch)', nameEn: 'Bump/Pad Pitch', min: 0.5, max: 150, step: 0.5, default: 10, unit: 'µm', presets: [{ label: 'Direct Hybrid Bond (0.8 µm)', val: 0.8 }, { label: 'Micro-bump CoWoS (25 µm)', val: 25 }, { label: 'Standard Flip-Chip (100 µm)', val: 100 }] },
      { id: 'shoreline', nameZh: '晶片互連邊界長度 (Shoreline Length)', nameEn: 'Shoreline Length', min: 1, max: 20, step: 1, default: 5, unit: 'mm' },
      { id: 'datarate', nameZh: '單線資料傳輸率 (Data Rate)', nameEn: 'Per-Line Data Rate', min: 1, max: 32, step: 1, default: 8, unit: 'Gbps' }
    ],
    calculate: (p) => {
      const pitch_mm = p.pitch / 1000;
      const density = Math.round(1 / (pitch_mm * pitch_mm)); // bumps / mm²
      const linesPerMm = 1 / pitch_mm;
      const totalLines = linesPerMm * p.shoreline;
      const bandwidthTbps = (totalLines * p.datarate) / 8000; // TB/s
      return [
        { labelZh: '面互連密度 (Interconnect Density)', labelEn: 'Areal Density', value: density.toLocaleString(), unit: 'io/mm²', highlight: true, noteZh: '無凸塊混合鍵合密度比微凸塊高 1000 倍', noteEn: 'Hybrid bonding exceeds micro-bumps by 1000x' },
        { labelZh: '晶粒邊界總頻寬 (Shoreline BW)', labelEn: 'Shoreline Bandwidth', value: bandwidthTbps.toFixed(2), unit: 'TB/s', highlight: false, noteZh: 'UCIe / HBM 先進封裝頻寬', noteEn: 'UCIe / HBM die-to-die bandwidth' }
      ];
    }
  },

  // Ch 22: 可靠度
  ch22: {
    id: 'ch22',
    titleZh: '熱加速因子與 FIT 教學計算器',
    titleEn: 'Thermal Acceleration and Illustrative FIT Calculator',
    formulaLatex: 'AF = \\exp\\!\\left[\\frac{E_a}{k_B}\\left(\\frac1{T_{use}}-\\frac1{T_{stress}}\\right)\\right],\\quad FIT_{example}=\\frac{0.92\\times10^9}{H_{test}\\,AF}',
    descriptionZh: '只計 Arrhenius 熱加速，不含濕度／Peck 或電壓項。活化能為教學取值；FIT 欄沿用固定 0.92 示例因子，未由失效件數或信賴水準校準，不能視為實測失效率或資格認證。下方浴缸圖為獨立示意，不隨本計算器滑桿變動。',
    descriptionEn: 'Calculates Arrhenius thermal acceleration only, without humidity/Peck or voltage terms. Activation energies are illustrative. The FIT field retains a fixed 0.92 example factor, not calibrated from failure counts or a confidence level; it is not a measured failure rate or qualification result. The bathtub plot below is a separate illustration and does not follow these sliders.',
    params: [
      { id: 'tempStress', nameZh: '試驗應力溫度 (Stress Temp)', nameEn: 'Stress Temp', min: 85, max: 150, step: 5, default: 125, unit: '°C' },
      { id: 'tempUse', nameZh: '現場使用溫度 (Operating Temp)', nameEn: 'Operating Temp', min: 25, max: 70, step: 5, default: 45, unit: '°C' },
      { id: 'ea', nameZh: '失效活化能 (Activation Energy Ea)', nameEn: 'Activation Energy', min: 0.3, max: 1.1, step: 0.05, default: 0.7, unit: 'eV', presets: [{ label: 'Low Ea Example (0.3 eV)', val: 0.3 }, { label: 'High Ea Example (0.9 eV)', val: 0.9 }, { label: 'Mid Ea Example (0.7 eV)', val: 0.7 }] },
      { id: 'sampleHours', nameZh: '試驗累積元件小時 (Device-Hours)', nameEn: 'Total Device-Hours', min: 1e5, max: 1e7, step: 1e5, default: 1e6, unit: 'hours' }
    ],
    calculate: (p) => {
      const kB = 8.617e-5;
      const T_stress_K = p.tempStress + 273.15;
      const T_use_K = p.tempUse + 273.15;
      const AF = Math.exp((p.ea / kB) * (1 / T_use_K - 1 / T_stress_K));
      const equivFieldHours = p.sampleHours * AF;
      const fit = (1 / equivFieldHours) * 1e9 * 0.92;
      return [
        { labelZh: '熱加速因子 (Acceleration Factor AF)', labelEn: 'Thermal AF', value: Math.round(AF), unit: 'x', highlight: true, noteZh: '單一熱活化機制假設；不是保證等效使用年限', noteEn: 'Single thermal-mechanism assumption; not a guaranteed field lifetime' },
        { labelZh: '教學 FIT 示例', labelEn: 'Illustrative FIT', value: fit.toFixed(2), unit: 'FIT', highlight: false, noteZh: '1 FIT = 每 10⁹ 元件小時 1 次失效；本值非實測', noteEn: '1 FIT = 1 failure per 10⁹ device-hours; this value is not measured' }
      ];
    }
  },

  // Ch 23: 智慧製造
  ch23: {
    id: 'ch23',
    titleZh: '晶圓廠 Little 定律週期時間與 OEE 計算器 (Little\'s Law CT & Overall Equipment Effectiveness)',
    titleEn: 'Fab Little\'s Law Cycle Time & OEE Efficiency Calculator',
    formulaLatex: '\\text{WIP} = \\text{TH} \\cdot \\text{CT}, \\quad \\text{OEE} = A \\times P \\times Q',
    descriptionZh: '由相同系統邊界、穩定長期平均的 WIP 與產出率估算 CT。OEE = A × P × Q，本計算器固定 Q = 0.98 為教學假設；不是產線量測或通用績效門檻。',
    descriptionEn: 'Estimate CT from consistent system boundaries and stable long-term average WIP and throughput. OEE = A × P × Q, with Q fixed at 0.98 as a teaching assumption; this is not a production measurement or universal performance threshold.',
    params: [
      { id: 'wip', nameZh: '在製品總晶圓數 (Total WIP)', nameEn: 'Active WIP', min: 1000, max: 50000, step: 500, default: 15000, unit: 'wafers' },
      { id: 'th', nameZh: '每日晶圓出貨產量 (Daily Throughput)', nameEn: 'Throughput (TH)', min: 100, max: 2000, step: 50, default: 500, unit: 'wafers/day' },
      { id: 'avail', nameZh: '機台可用率 (Availability A)', nameEn: 'Availability (A)', min: 70, max: 98, step: 1, default: 92, unit: '%' },
      { id: 'perf', nameZh: '性能效率 (Performance P)', nameEn: 'Performance (P)', min: 70, max: 98, step: 1, default: 90, unit: '%' }
    ],
    calculate: (p) => {
      const ct_days = (p.wip / p.th).toFixed(1);
      const oee = ((p.avail / 100) * (p.perf / 100) * 0.98 * 100).toFixed(1);
      return [
        { labelZh: '晶圓平均週期時間 (Cycle Time)', labelEn: 'Cycle Time (CT)', value: ct_days, unit: 'days', highlight: true, noteZh: '由投片到產出約合需歷時天數', noteEn: 'Total elapsed time from wafer start to outs' },
        { labelZh: '機台綜合效率 (OEE)', labelEn: 'Overall OEE', value: oee, unit: '%', highlight: false, noteZh: '可用率 × 性能率 × 固定良品率 0.98（教學假設）', noteEn: 'Availability × Performance × fixed Q = 0.98 (teaching assumption)' }
      ];
    }
  },

  // Ch 24: 軟韌體視角
  ch24: {
    id: 'ch24',
    titleZh: '供電網路 L·di/dt 與 I·R 壓降教學計算器',
    titleEn: 'PDN L·di/dt and I·R Voltage-Drop Teaching Calculator',
    formulaLatex: '\\Delta V_{PDN}=L\\frac{di}{dt}+IR',
    descriptionZh: '計算簡化集中元件模型的電感與電阻壓降及其比例；沒有計算 RowHammer 翻轉。預設值未經元件校準，未包含去耦、頻率相依阻抗或時域響應，輸出不能直接作電源完整性合格判定。',
    descriptionEn: 'Calculate inductive and resistive drop and their shares in a simplified lumped model; RowHammer bit flips are not calculated. Defaults are uncalibrated and omit decoupling, frequency-dependent impedance and time-domain response, so outputs do not establish power-integrity compliance.',
    params: [
      { id: 'inductance', nameZh: '封裝迴路寄生電感 (Loop L)', nameEn: 'Loop Inductance (L)', min: 5, max: 50, step: 5, default: 15, unit: 'pH' },
      { id: 'slewRate', nameZh: '電流斜率 (di/dt Slew Rate)', nameEn: 'Slew Rate (di/dt)', min: 10, max: 200, step: 10, default: 60, unit: 'A/ns' },
      { id: 'current', nameZh: '持續峰值電流 (Steady Current I)', nameEn: 'Peak Current (I)', min: 50, max: 500, step: 5, default: 180, unit: 'A' },
      { id: 'resGrid', nameZh: '電網寄生電阻 (Grid Resistance)', nameEn: 'Grid Resistance', min: 0.1, max: 0.8, step: 0.05, default: 0.25, unit: 'mΩ' }
    ],
    calculate: (p) => {
      const vInductive = (p.inductance * 1e-12) * (p.slewRate * 1e9); // V
      const vResistive = p.current * (p.resGrid * 1e-3); // V
      const totalDrop_mV = (vInductive + vResistive) * 1000;
      return [
        { labelZh: '動態電源壓降 (PDN Voltage Drop)', labelEn: 'Dynamic Drop (ΔV)', value: totalDrop_mV.toFixed(1), unit: 'mV', highlight: true, noteZh: '時序影響取決於供電規格與餘裕，沒有通用 80 mV 門檻', noteEn: 'Timing impact depends on supply specifications and margins, not a universal 80 mV threshold' },
        { labelZh: '電感性暫態佔比 (Inductive Share)', labelEn: 'Inductive Share', value: ((vInductive / (vInductive + vResistive)) * 100).toFixed(0), unit: '%', highlight: false, noteZh: '依本例 L 與 di/dt 計算，不預測 BSPDN 改善幅度', noteEn: 'Computed from this example L and di/dt; does not predict BSPDN improvement' }
      ];
    }
  },

  // 附錄 A: 術語字典
  'app-glossary': {
    id: 'app-glossary',
    titleZh: '半導體微觀量綱與物理單位換算沙盒 (Dimensional Metric Converter)',
    titleEn: 'Semiconductor Micro-scale Dimensional Converter',
    formulaLatex: '1\\,\\text{nm} = 10\\,\\text{\\AA} = 10^{-3}\\,\\mu\\text{m}, \\quad 1\\,\\text{Torr} = 133.322\\,\\text{Pa}, \\quad 1\\,\\text{eV} = 1.602 \\times 10^{-19}\\,\\text{J}',
    descriptionZh: '提供晶圓廠物理尺規（埃米 Å、奈米 nm、微米 µm）、真空度（Torr、mTorr、Pa）與能量單位（eV、J）高精度互轉。',
    descriptionEn: 'High-precision dimensional conversion sandbox across angstroms, nanometers, vacuum pressures, and electron-volts.',
    params: [
      { id: 'valueNm', nameZh: '長度數值 (Length in nm)', nameEn: 'Length (nm)', min: 0.1, max: 1000, step: 0.1, default: 2.5, unit: 'nm', presets: [{ label: 'Gate Oxide (0.8 nm)', val: 0.8 }, { label: 'Fin Width (5 nm)', val: 5 }, { label: 'Contact (20 nm)', val: 20 }] },
      { id: 'pressMtorr', nameZh: '電漿氣壓 (Pressure in mTorr)', nameEn: 'Pressure (mTorr)', min: 1, max: 500, step: 5, default: 15, unit: 'mTorr', presets: [{ label: 'High Vacuum (2 mTorr)', val: 2 }, { label: 'RIE Etch (15 mTorr)', val: 15 }, { label: 'PECVD (200 mTorr)', val: 200 }] }
    ],
    calculate: (p) => {
      const angstrom = p.valueNm * 10;
      const micron = p.valueNm / 1000;
      const pa = p.pressMtorr * 0.133322;
      return [
        { labelZh: '等效埃米 (Ångström)', labelEn: 'In Ångströms (Å)', value: angstrom.toFixed(1), unit: 'Å', highlight: true, noteZh: '常用於閘極氧化層與薄膜表面粗糙度', noteEn: 'Standard for gate dielectric & surface roughness' },
        { labelZh: '等效微米 (Micron)', labelEn: 'In Microns (µm)', value: micron.toFixed(4), unit: 'µm', highlight: false, noteZh: '封裝重佈線與晶圓厚度量綱', noteEn: 'Packaging RDL and wafer thickness unit' },
        { labelZh: '腔體真空帕斯卡 (Pa)', labelEn: 'Pressure in Pa', value: pa.toFixed(3), unit: 'Pa', highlight: false, noteZh: '電漿放電物理方程標準國際單位', noteEn: 'Standard SI unit for plasma dynamics' }
      ];
    }
  },

  // 附錄 B: 現場行話
  'app-jargon': {
    id: 'app-jargon',
    titleZh: '晶圓廠批次派工狀態機與佇列排隊推估器 (Lot Priority Queueing & Wip Flow)',
    titleEn: 'Fab Lot Dispatch Priority Queueing & Cycle Time Penalty Calculator',
    formulaLatex: 'W_q = \\frac{\\lambda}{\\mu (\\mu - \\lambda)} \\cdot \\text{PriorityFactor}',
    descriptionZh: '模擬晶圓廠現場 Hot Lot（急件手提 Hand-Carry）搶佔機台對正常批次 (Normal Lots) 造成的排隊等待懲罰時間。',
    descriptionEn: 'Model fab floor priority queueing mechanics and dispatch penalty imposed by Super Hot lots.',
    params: [
      { id: 'hotRatio', nameZh: 'Hot Lot 比例 (Hot Lot Share)', nameEn: 'Hot Lot Share', min: 2, max: 25, step: 1, default: 8, unit: '%', presets: [{ label: 'Controlled (5%)', val: 5 }, { label: 'High Stress (12%)', val: 12 }, { label: 'Extreme (20%)', val: 20 }] },
      { id: 'utilization', nameZh: '機台平均負載率 (Tool Utilization)', nameEn: 'Tool Utilization', min: 70, max: 96, step: 2, default: 88, unit: '%' }
    ],
    calculate: (p) => {
      const rho = p.utilization / 100;
      const baseQueueHours = (rho / (1 - rho)) * 1.5;
      const penaltyHours = baseQueueHours * (1 + (p.hotRatio / 100) * 2.8);
      return [
        { labelZh: '普通批次排隊耗時 (Normal Queue Time)', labelEn: 'Normal Wait Time', value: penaltyHours.toFixed(1), unit: 'hours', highlight: true, noteZh: 'Hot Lot 越多普通批次排隊呈非線性惡化', noteEn: 'Excessive hot lots exponentially delay normal lots' },
        { labelZh: '瓶頸機台排隊膨脹係數 (Penalty Factor)', labelEn: 'Delay Inflation', value: (penaltyHours / baseQueueHours).toFixed(2), unit: 'x', highlight: false, noteZh: '現場排程派工調度警示指標', noteEn: 'RTD dynamic dispatch alert trigger' }
      ];
    }
  },

  // 附錄 C: 修煉地圖
  'app-reading': {
    id: 'app-reading',
    titleZh: '工程師修煉技能樹成熟度雷達加權計算器 (Engineering Competence Index)',
    titleEn: 'Semiconductor Engineering Competence & Skill Radar Index Calculator',
    formulaLatex: '\\text{Score} = \\frac{\\sum w_i \\cdot L_i}{\\sum w_i} \\times 20',
    descriptionZh: '依照 FEOL 前段、BEOL 後段、量測檢測、先進封裝、元件物理與 CIM 自動化六大維度權重，評估工程師專業熟練度指數。',
    descriptionEn: 'Evaluate overall engineering skill mastery index across 6 core semiconductor domains.',
    params: [
      { id: 'feol', nameZh: '前段模組熟練度 (FEOL: Litho/Etch/TF)', nameEn: 'FEOL Module Level', min: 1, max: 5, step: 1, default: 4, unit: '級 (1~5)' },
      { id: 'beol', nameZh: '後段金屬化熟練度 (BEOL: Cu/CMP)', nameEn: 'BEOL Module Level', min: 1, max: 5, step: 1, default: 3, unit: '級 (1~5)' },
      { id: 'metro', nameZh: '良率與量測檢測 (Metrology/SPC)', nameEn: 'Metrology / Yield', min: 1, max: 5, step: 1, default: 4, unit: '級 (1~5)' },
      { id: 'pkg', nameZh: '先進封裝技術 (Packaging: CoWoS/SoIC)', nameEn: 'Advanced Packaging', min: 1, max: 5, step: 1, default: 3, unit: '級 (1~5)' }
    ],
    calculate: (p) => {
      const avg = (p.feol + p.beol + p.metro + p.pkg) / 4;
      const score = Math.round(avg * 20);
      let title = '半導體資深製程工程師 (Senior PE)';
      if (score >= 90) title = '半導體製程首席專家 (Principal Fellow)';
      else if (score >= 75) title = '資深整合架構師 (Senior PIE Lead)';
      else if (score < 50) title = '初階工程師 (Junior Process Engineer)';

      return [
        { labelZh: '工程實力綜合指數 (Competence Score)', labelEn: 'Overall Index', value: score, unit: '/ 100 分', highlight: true, noteZh: title, noteEn: 'Holistic competence evaluation' },
        { labelZh: '核心模組平均階層 (Average Level)', labelEn: 'Average Mastery', value: avg.toFixed(2), unit: 'Level (Max 5)', highlight: false, noteZh: '對齊經典聖經與製程四階修煉路徑', noteEn: 'Aligned with classic texts & curriculum roadmap' }
      ];
    }
  }
};
