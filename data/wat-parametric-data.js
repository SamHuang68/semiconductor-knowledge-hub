/**
 * data/wat-parametric-data.js
 * 晶圓允收測試 WAT 參數統計分佈與動態晶圓熱圖 (WAT Parametric Heatmap & Boxplot Engine)
 * 50 輪深度工程優化 Stage 19 (Rounds 91–95)
 * 
 * 收錄 12 大半導體經典 WAT 電性量測參數模型，
 * 提供 49 點晶圓二維熱圖插值 (Wafer Heatmap) 與箱型圖統計分析。
 */

export const WAT_PARAMETERS = {
  vth_nmos: {
    id: 'vth_nmos',
    nameZh: 'NMOS 閾值電壓 (Vth)',
    nameEn: 'NMOS Threshold Voltage (Vth)',
    unit: 'V',
    nominal: 0.35,
    lsl: 0.30,
    usl: 0.40,
    sigma: 0.015,
    descZh: '飽和區汲極電流外推之閘極門檻開啟電壓，反映通道離子佈植摻雜濃度與氧化層厚度。',
    descEn: 'Gate threshold turn-on voltage extrapolated from saturation drain current, reflecting channel doping.'
  },
  vth_pmos: {
    id: 'vth_pmos',
    nameZh: 'PMOS 閾值電壓 (|Vth|)',
    nameEn: 'PMOS Threshold Voltage (|Vth|)',
    unit: 'V',
    nominal: -0.34,
    lsl: -0.39,
    usl: -0.29,
    sigma: 0.014,
    descZh: 'PMOS 通道開啟電壓，受 N-Well 摻雜與功函數金屬 (Work-function Metal) 影響。',
    descEn: 'PMOS threshold voltage influenced by N-well doping and work-function metal dipole stack.'
  },
  idsat_nmos: {
    id: 'idsat_nmos',
    nameZh: 'NMOS 飽和驅動電流 (Idsat)',
    nameEn: 'NMOS Saturation Drive Current (Idsat)',
    unit: 'mA/µm',
    nominal: 1.15,
    lsl: 1.00,
    usl: 1.30,
    sigma: 0.045,
    descZh: '閘極與汲極施加額定電壓時之最大開態電流，直接決定邏輯閘開關速度 (Fmax)。',
    descEn: 'Maximum on-state current at nominal Vdd, directly governing logic cell switching frequency.'
  },
  idsat_pmos: {
    id: 'idsat_pmos',
    nameZh: 'PMOS 飽和驅動電流 (|Idsat|)',
    nameEn: 'PMOS Saturation Drive Current (|Idsat|)',
    unit: 'mA/µm',
    nominal: 0.88,
    lsl: 0.75,
    usl: 1.00,
    sigma: 0.038,
    descZh: 'PMOS 驅動電流，受 SiGe 源汲極施加之單軸壓縮應變與電洞遷移率提升影響。',
    descEn: 'PMOS drive current enhanced by uniaxial compressive strain from embedded SiGe source/drain.'
  },
  ioff_nmos: {
    id: 'ioff_nmos',
    nameZh: 'NMOS 關態漏電流 (Ioff)',
    nameEn: 'NMOS Off-State Leakage Current (Ioff)',
    unit: 'nA/µm',
    nominal: 2.5,
    lsl: 0.1,
    usl: 10.0,
    sigma: 1.2,
    descZh: 'Vg=0V 時之次臨界漏電流與源汲極穿隧電流，直接決定晶片靜態待機功耗。',
    descEn: 'Subthreshold and drain-to-source leakage at zero gate bias, governing chip standby power.'
  },
  rs_poly: {
    id: 'rs_poly',
    nameZh: '多晶矽 / 閘極線片電阻 (Rs)',
    nameEn: 'Poly / Gate Sheet Resistance (Rs)',
    unit: 'Ω/sq',
    nominal: 12.0,
    lsl: 9.5,
    usl: 14.5,
    sigma: 0.75,
    descZh: '閘極電極薄膜電阻，過高會造成信號傳遞 Elmore 延遲與 RC 延遲惡化。',
    descEn: 'Gate sheet resistance; elevated values degrade RC propagation delay and timing margin.'
  },
  tox_inv: {
    id: 'tox_inv',
    nameZh: '反轉層等效氧化層厚度 (Tox,inv)',
    nameEn: 'Inversion Equivalent Oxide Thickness',
    unit: 'nm',
    nominal: 1.18,
    lsl: 1.10,
    usl: 1.26,
    sigma: 0.022,
    descZh: '量子力學反轉態下測得之閘極介電層電容等效厚度，由 ALD 高介電層精確決定。',
    descEn: 'Capacitance-equivalent oxide thickness under inversion, governed by ALD high-k cycle control.'
  },
  bv_junction: {
    id: 'bv_junction',
    nameZh: 'PN 接面反向崩潰電壓 (BV)',
    nameEn: 'PN Junction Breakdown Voltage (BV)',
    unit: 'V',
    nominal: 8.5,
    lsl: 6.8,
    usl: 11.5,
    sigma: 0.45,
    descZh: '源極/汲極接面能承受之最大反向偏壓，反映輕摻雜汲極 (LDD) 橫向擴散輪廓。',
    descEn: 'Maximum reverse voltage before avalanche breakdown, reflecting LDD lateral dopant profile.'
  },
  rc_contact: {
    id: 'rc_contact',
    nameZh: '接觸孔接觸電阻 (Rc)',
    nameEn: 'Contact Resistance (Rc)',
    unit: 'Ω/contact',
    nominal: 45.0,
    lsl: 30.0,
    usl: 65.0,
    sigma: 4.8,
    descZh: '金屬矽化物 (Silicide) 與鎢插塞 (W-Plug) 間之介面電阻，是先進節點寄生效應的主因。',
    descEn: 'Silicide to tungsten plug interface resistance, a primary contributor to parasitic delay.'
  },
  r_via_chain: {
    id: 'r_via_chain',
    nameZh: '通孔鏈串聯總電阻 (Via Chain R)',
    nameEn: 'Via Chain Total Resistance (10k Vias)',
    unit: 'kΩ',
    nominal: 18.5,
    lsl: 14.0,
    usl: 24.0,
    sigma: 1.4,
    descZh: '連續貫穿 10,000 個微通孔之串聯測試鏈，檢驗雙鑲嵌蝕刻貫通率與晶種覆蓋連續性。',
    descEn: '10,000-via daisy chain testing etch landing, barrier integrity, and void-free copper fill.'
  },
  fmax_ro: {
    id: 'fmax_ro',
    nameZh: '環形振盪器震盪頻率 (RO Fmax)',
    nameEn: 'Ring Oscillator Frequency (RO Fmax)',
    unit: 'GHz',
    nominal: 4.2,
    lsl: 3.8,
    usl: 4.8,
    sigma: 0.14,
    descZh: '101 階反相器環形振盪器之動態振盪頻率，全方位表徵當前晶圓整體電晶體速度基準。',
    descEn: '101-stage inverter ring oscillator frequency, acting as the benchmark for silicon logic speed.'
  },
  c_overlap: {
    id: 'c_overlap',
    nameZh: '閘極源/汲重疊寄生電容 (Cov)',
    nameEn: 'Gate-to-S/D Overlap Capacitance (Cov)',
    unit: 'fF/µm',
    nominal: 0.18,
    lsl: 0.14,
    usl: 0.23,
    sigma: 0.012,
    descZh: '閘極電極與源極/汲極重疊區域產生之米勒寄生效應電容，影響動態高頻切換損耗。',
    descEn: 'Miller capacitance from gate-to-diffusion overlap, determining dynamic power and delay.'
  }
};

/**
 * 產生晶圓 49 點量測網格座標與模擬數值
 * @param {string} paramId
 * @param {number} [radialGradient=0.08] 徑向邊緣偏移係數
 * @returns {Array<{ x: number, y: number, r: number, val: number, isOos: boolean }>}
 */
export function generateWaferMapPoints(paramId, radialGradient = 0.08) {
  const p = WAT_PARAMETERS[paramId] || WAT_PARAMETERS.vth_nmos;
  const points = [];
  const rings = [
    { count: 1, radius: 0 },
    { count: 6, radius: 35 },
    { count: 12, radius: 68 },
    { count: 14, radius: 100 },
    { count: 16, radius: 130 }
  ];

  let seed = 42;
  const pseudoRand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return (seed / 233280) - 0.5;
  };

  for (const ring of rings) {
    if (ring.radius === 0) {
      const val = p.nominal + (pseudoRand() * p.sigma * 0.8);
      points.push({ x: 0, y: 0, r: 0, val: parseFloat(val.toFixed(3)), isOos: val < p.lsl || val > p.usl });
    } else {
      const dTheta = (2 * Math.PI) / ring.count;
      for (let i = 0; i < ring.count; i++) {
        const theta = i * dTheta;
        const x = ring.radius * Math.cos(theta);
        const y = ring.radius * Math.sin(theta);
        // 邊緣效應：半徑愈大略微偏移
        const normR = ring.radius / 140;
        const edgeDrift = (normR * normR) * p.sigma * radialGradient * 10;
        const val = p.nominal + edgeDrift + (pseudoRand() * p.sigma * 1.5);
        points.push({
          x: Math.round(x),
          y: Math.round(y),
          r: ring.radius,
          val: parseFloat(val.toFixed(3)),
          isOos: val < p.lsl || val > p.usl
        });
      }
    }
  }

  return points;
}

/**
 * 統計計算 (Min, Q1, Median, Q3, Max, Mean, StdDev, Cpk)
 * @param {number[]} values
 * @param {number} lsl
 * @param {number} usl
 */
export function computeWatStats(values, lsl, usl) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const min = sorted[0];
  const max = sorted[n - 1];
  const median = n % 2 === 1 ? sorted[Math.floor(n / 2)] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;
  const variance = sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1 || 1);
  const stdDev = Math.sqrt(variance);

  const cpl = (mean - lsl) / (3 * stdDev);
  const cpu = (usl - mean) / (3 * stdDev);
  const cpk = Math.max(0, Math.min(cpl, cpu));

  return {
    count: n,
    min: min.toFixed(3),
    max: max.toFixed(3),
    q1: q1.toFixed(3),
    median: median.toFixed(3),
    q3: q3.toFixed(3),
    mean: mean.toFixed(3),
    stdDev: stdDev.toFixed(4),
    cpk: cpk.toFixed(2),
    isCpkCapable: cpk >= 1.33
  };
}
