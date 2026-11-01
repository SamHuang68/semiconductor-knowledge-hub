/**
 * data/curve-plotter.js
 * 物理速算器 2D 靈敏度曲線繪圖儀 (Parametric Sensitivity Curve Plotter)
 * 50 輪深度工程優化 Stage 9 (Rounds 41–45)
 * 
 * 支援純前端輕量 SVG 座標繪圖，隨變數滑桿即時計算二維物理響應曲線，
 * 並繪製當前作業點 (Operating Point Cursor) 與無塵室高對比網格。
 */

/**
 * 逃逸 HTML 特殊字符
 * @param {string} str
 * @returns {string}
 */
function escapeXml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * 物理曲線定義與動態求值
 */
/**
 * CH10 teaching ratio, not a calibrated lifetime prediction.
 * Fixed reference: Jref = 2 MA/cm², Tref = 105°C; n = 2, Ea = 0.9 eV.
 * Inputs follow the calculator's positive-current and temperature ranges.
 */
export function relativeEmLifetime(currentJ, tempC) {
  const kB = 8.617e-5; // eV/K
  const referenceJ = 2;
  const referenceT = 105 + 273.15; // K, fixed as the operating temperature varies
  const temperature = tempC + 273.15;
  return Math.pow(referenceJ / currentJ, 2)
    * Math.exp((0.9 / kB) * (1 / temperature - 1 / referenceT));
}

/** CH17: normal-distribution teaching estimate, not calibrated defect data.
 * erfc approximation evaluates the small tail directly to avoid 1-CDF cancellation.
 * Independent reference cases cover central, offset and six-sigma tails.
 */
function normalTail(z) {
  if (z === 0) return 0.5;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.5 * x);
  const erfc = t * Math.exp(-x * x - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return z > 0 ? 0.5 * erfc : 1 - 0.5 * erfc;
}

export function normalDefectPpm(p) {
  if (![p.usl, p.lsl, p.mean, p.sigma].every(Number.isFinite) || p.sigma <= 0 || p.usl <= p.lsl) return NaN;
  const below = normalTail((p.mean - p.lsl) / p.sigma);
  const above = normalTail((p.usl - p.mean) / p.sigma);
  return Math.max(0, Math.min(1, below + above)) * 1e6;
}

export const SENSITIVITY_CURVE_MODELS = {
  // Ch 04: Rayleigh 光學微影焦深 (DOF vs NA)
  ch04: {
    xLabelZh: '數值孔徑 (NA)',
    xLabelEn: 'Numerical Aperture (NA)',
    yLabelZh: '焦深 DOF (nm)',
    yLabelEn: 'Depth of Focus DOF (nm)',
    xMin: 0.25,
    xMax: 1.35,
    compute: (x, p) => {
      const lambda = p.lambda || 193;
      const k2 = p.k2 || 0.6;
      const n = p.n || 1.44;
      return (k2 * lambda * n) / (x * x);
    },
    getCurrentX: p => p.na || 0.85
  },

  // Ch 05: Arrhenius 化學反應速率 (Rate vs Temperature)
  ch05: {
    xLabelZh: '製程溫度 T (K)',
    xLabelEn: 'Temperature T (K)',
    yLabelZh: '反應速率 k (相對比值)',
    yLabelEn: 'Reaction Rate k (Relative)',
    xMin: 400,
    xMax: 1200,
    compute: (x, p) => {
      const ea = (p.ea || 1.2) * 1.602e-19; // eV to J
      const kb = 1.38e-23;
      return Math.exp(-ea / (kb * x));
    },
    getCurrentX: p => (p.tempC ? p.tempC + 273.15 : 673.15)
  },

  // Ch 06: ARDE 蝕刻寬深比延遲 (Etch Rate vs Aspect Ratio)
  ch06: {
    xLabelZh: '深寬比 (Aspect Ratio)',
    xLabelEn: 'Aspect Ratio (Depth/CD)',
    yLabelZh: '蝕刻率延遲係數 (R/R₀)',
    yLabelEn: 'Normalized Etch Rate (R/R₀)',
    xMin: 1,
    xMax: 60,
    compute: (x, p) => {
      const s = p.selectivity || 1.0;
      return 1 / (1 + 0.08 * Math.pow(x, 0.85));
    },
    getCurrentX: p => (p.depth && p.cd ? p.depth / p.cd : 15)
  },

  // Ch 07: LSS 高斯離子佈植縱深濃度 (Concentration vs Depth)
  ch07: {
    xLabelZh: '晶圓深度 x (nm)',
    xLabelEn: 'Wafer Depth x (nm)',
    yLabelZh: '摻雜濃度 N(x) (相對值)',
    yLabelEn: 'Dopant Concentration N(x) (arb.)',
    xMin: 0,
    xMax: 300,
    compute: (x, p) => {
      const rp = p.rp || 80; // nm
      const drp = p.drp || 25; // nm
      const diff = (x - rp) / drp;
      return Math.exp(-0.5 * diff * diff);
    },
    getCurrentX: p => p.rp || 80
  },

  // Ch 08: Preston CMP 研磨移除率 (Removal Rate vs Pressure)
  ch08: {
    xLabelZh: '下壓力 Pressure (psi)',
    xLabelEn: 'Down Force Pressure (psi)',
    yLabelZh: '研磨速率 RR (nm/min)',
    yLabelEn: 'Removal Rate RR (nm/min)',
    xMin: 0.5,
    xMax: 8.0,
    compute: (x, p) => {
      const v = p.speed || 1.2;
      const kp = p.prestonK || 45;
      return kp * x * v;
    },
    getCurrentX: p => p.pressure || 3.0
  },

  // Ch 10: Black 電遷移 MTTF 曲線 (MTTF vs Current Density)
  ch10: {
    xLabelZh: '電流密度 J (MA/cm²)',
    xLabelEn: 'Current Density J (MA/cm²)',
    yLabelZh: '相對模型壽命 L/Lref',
    yLabelEn: 'Relative modeled lifetime L/Lref',
    xMin: 0.5,
    xMax: 5.0,
    compute: (x, p) => relativeEmLifetime(x, p.tempC ?? 105),
    getCurrentX: p => p.currentJ ?? 2.0
  },

  // Ch 14: Relative dynamic power density teaching model, matching the calculator.
  // x = voltage ratio; kappa and fScale remain the current dimension/frequency ratios.
  // Uncalibrated: excludes leakage and does not predict TDP or cooling limits.
  ch14: {
    xLabelZh: '電壓比例 (V/Vref)',
    xLabelEn: 'Voltage ratio (V/Vref)',
    yLabelZh: '相對動態功耗密度',
    yLabelEn: 'Relative dynamic power density',
    xMin: 0.70,
    xMax: 1.0,
    compute: (x, p) => {
      const kappa = p.kappa ?? 0.70;
      // Same evaluation order as calculate(), including two-decimal boundary rounding.
      const powerDyn = kappa * (x * x) * (p.fScale ?? 1.15);
      return powerDyn / (kappa * kappa);
    },
    getCurrentX: p => p.vScale ?? 0.95
  },

  // Ch 16: Uncalibrated negative-binomial teaching curve; same inputs as the calculator.
  ch16: {
    xLabelZh: '缺陷密度 D (defects/cm²)',
    xLabelEn: 'Defect Density D (defects/cm²)',
    yLabelZh: '負二項模型良率 (%)',
    yLabelEn: 'Negative-binomial model yield (%)',
    xMin: 0.01,
    xMax: 0.50,
    compute: (x, p) => {
      const area = (p.area ?? 100) / 100; // mm² to cm², matching calculate().
      const alpha = p.clusterAlpha ?? 2.0;
      return Math.pow(1 + (x * area) / alpha, -alpha) * 100;
    },
    getCurrentX: p => p.d0 ?? 0.08
  },

  // Ch17: process-value normal density using the calculator's mean/sigma.
  ch17: {
    xLabelZh: '製程量測值 x (nm)',
    xLabelEn: 'Process Measurement x (nm)',
    yLabelZh: '常態密度 f(x) (1/nm)',
    yLabelEn: 'Normal Density f(x) (1/nm)',
    getRange: p => {
      const low = Math.min(p.lsl, p.mean - 4 * p.sigma);
      const high = Math.max(p.usl, p.mean + 4 * p.sigma);
      const padding = (high - low) * 0.05;
      return { xMin: low - padding, xMax: high + padding };
    },
    compute: (x, p) => Math.exp(-0.5 * ((x - p.mean) / p.sigma) ** 2) / (p.sigma * Math.sqrt(2 * Math.PI)),
    getCurrentX: p => p.mean
  },

  // Ch 21: 先進封裝 3D 互連密度 (Density vs Pitch)
  ch21: {
    xLabelZh: '凸塊間距 Pitch (µm)',
    xLabelEn: 'Interconnect Pitch (µm)',
    yLabelZh: '互連密度 (I/O / mm²)',
    yLabelEn: 'Interconnect Density (I/O / mm²)',
    xMin: 1,
    xMax: 100,
    compute: x => {
      return (1e6) / (x * x);
    },
    getCurrentX: p => p.bumpPitch || 10
  },

  // Ch 22: Weibull 浴缸故障率曲線 (Hazard Rate vs Lifetime)
  ch22: {
    xLabelZh: '時間 t（任意尺度）',
    xLabelEn: 'Time t (Arbitrary Scale)',
    yLabelZh: '失效強度（任意尺度）',
    yLabelEn: 'Hazard (Arbitrary Scale)',
    xMin: 0.1,
    xMax: 10,
    compute: x => {
      // 浴缸曲線合成：早期失效 (t^-0.6) + 隨機失效 (常數 0.2) + 磨損失效 (t^2.5 * 0.01)
      return (0.3 / Math.pow(x, 0.6)) + 0.15 + (0.012 * Math.pow(x, 2.4));
    },
    getCurrentX: p => p.testHours || 2.5
  }
};

/**
 * 繪製二維靈敏度曲線 SVG
 * @param {string} chId 章節模組 ID (例如 'ch04')
 * @param {Record<string, number>} params 目前滑桿參數鍵值
 * @param {'zh'|'en'} lang 介面語系
 * @param {number} [width=520] SVG 寬度
 * @param {number} [height=220] SVG 高度
 * @returns {string} 完整的 SVG 標記字串
 */
export function renderSensitivityPlot(chId, params = {}, lang = 'zh', width = 520, height = 210) {
  const model = SENSITIVITY_CURVE_MODELS[chId];
  if (!model) return '';
  if (chId === 'ch17' && !Number.isFinite(normalDefectPpm(params))) return `<p class="sensitivity-plot-invalid" role="status">${lang === 'en' ? 'Invalid example: require USL > LSL and positive standard deviation.' : '示例無效：須 USL > LSL 且標準差為正。'}</p>`;

  const padLeft = 65;
  const padRight = 30;
  const padTop = 32;
  const padBottom = 42;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const { compute, getCurrentX } = model;
  const { xMin, xMax } = chId === 'ch17' ? model.getRange(params) : model;
  const xLabel = lang === 'en' ? model.xLabelEn : model.xLabelZh;
  const yLabel = lang === 'en' ? model.yLabelEn : model.yLabelZh;

  // 取樣 50 個點計算 Y 範圍
  const steps = chId === 'ch17' ? Math.min(2400, Math.max(100, Math.ceil((xMax - xMin) / (params.sigma / 8)))) : 50;
  const pts = [];
  let yMin = Infinity;
  let yMax = -Infinity;

  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const y = compute(x, params);
    if (!Number.isNaN(y) && Number.isFinite(y)) {
      pts.push({ x, y });
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;
    }
  }

  if (chId === 'ch17') {
    const peak = { x: params.mean, y: compute(params.mean, params) };
    pts.push(peak);
    pts.sort((a, b) => a.x - b.x);
    yMax = Math.max(yMax, peak.y);
  }
  if (pts.length < 2) return '';

  // 防止 yMin == yMax
  if (yMax <= yMin) {
    yMax = yMin + 1;
  }
  const yRange = yMax - yMin;
  const yDispMin = Math.max(0, yMin - yRange * 0.05);
  const yDispMax = yMax + yRange * 0.08;

  // 轉換成 SVG 座標
  const toSvgX = x => padLeft + ((x - xMin) / (xMax - xMin)) * plotW;
  const toSvgY = y => padTop + plotH - ((y - yDispMin) / (yDispMax - yDispMin)) * plotH;

  const pathD = pts.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(p.x).toFixed(1)} ${toSvgY(p.y).toFixed(1)}`).join(' ');

  // 計算當前操作點
  const curX = Math.max(xMin, Math.min(xMax, getCurrentX(params)));
  const curY = compute(curX, params);
  const curSvgX = toSvgX(curX);
  const curSvgY = toSvgY(curY);

  // CH17 only: specification boundaries; the orange marker is the current mean.
  const specLines = chId === 'ch17' ? ['lsl', 'usl'].map(id => {
    const x = toSvgX(params[id]).toFixed(1);
    return `<line data-spec-limit="${id}" x1="${x}" x2="${x}" y1="${padTop}" y2="${padTop + plotH}" stroke="#0f766e" stroke-width="1.5" stroke-dasharray="5,3"/><text x="${x}" y="${padTop - 8}" text-anchor="${id === 'lsl' ? 'end' : 'start'}" font-size="10" fill="#0f766e">${id.toUpperCase()} ${params[id]}</text>`;
  }).join('') : '';

  // 網格線 (4 條橫線)
  const gridLines = [];
  for (let g = 0; g <= 4; g++) {
    const yVal = yDispMin + (g / 4) * (yDispMax - yDispMin);
    const yPos = toSvgY(yVal);
    const label = yVal >= 1000 ? (yVal / 1000).toFixed(1) + 'k' : yVal.toFixed(yVal < 10 ? 2 : 0);
    gridLines.push(`
      <line x1="${padLeft}" y1="${yPos.toFixed(1)}" x2="${width - padRight}" y2="${yPos.toFixed(1)}" stroke="#e2e8f0" stroke-dasharray="3,3" />
      <text x="${padLeft - 8}" y="${(yPos + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="#64748b" font-family="monospace">${escapeXml(label)}</text>
    `);
  }

  // X 軸刻度標籤 (5 個點)
  const xTicks = [];
  for (let t = 0; t <= 4; t++) {
    const xVal = xMin + (t / 4) * (xMax - xMin);
    const xPos = toSvgX(xVal);
    const xText = xVal >= 100 ? xVal.toFixed(0) : xVal.toFixed(xVal < 2 ? 2 : 1);
    xTicks.push(`
      <line x1="${xPos.toFixed(1)}" y1="${padTop + plotH}" x2="${xPos.toFixed(1)}" y2="${padTop + plotH + 5}" stroke="#94a3b8" />
      <text x="${xPos.toFixed(1)}" y="${padTop + plotH + 18}" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">${escapeXml(xText)}</text>
    `);
  }

  return `
    <div class="sensitivity-plot-container" style="margin: 16px 0; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div style="display: flex; ${chId === 'ch17' ? 'flex-wrap: wrap; gap: 8px;' : ''} justify-content: space-between; align-items: center; margin-bottom: 6px; padding: 0 4px;">
        <span style="font-size: 11px; font-weight: 700; color: #0369a1; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          ${chId === 'ch17' ? (lang === 'en' ? 'Normal Distribution Teaching Model' : '常態分布教學模型') : (chId === 'ch22' ? (lang === 'en' ? 'Independent Bathtub Illustration' : '獨立浴缸曲線示意') : (lang === 'en' ? 'Live Sensitivity Curve & Operating Point' : '即時參數敏感度曲線與工作點'))}
        </span>
        <span style="font-size: 11px; color: #64748b; font-family: monospace;">
          ${chId === 'ch17' ? (lang === 'en' ? 'Mean / Density:' : '均值／密度：') : (chId === 'ch22' ? (lang === 'en' ? 'Example Marker:' : '示例標記：') : (lang === 'en' ? 'Current Op Point:' : '目前工作點：'))}
          <strong style="color: #c2410c;">X=${curX.toFixed(2)}, Y=${curY >= 1000 ? (curY / 1000).toFixed(1) + 'k' : curY.toFixed(2)}</strong>
        </span>
      </div>
      <svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" style="overflow: visible; display: block;" role="img" aria-label="${escapeXml(yLabel)} vs ${escapeXml(xLabel)}">
        <!-- 背景與邊框 -->
        <rect x="${padLeft}" y="${padTop}" width="${plotW}" height="${plotH}" fill="#f8fafc" rx="4" />
        
        <!-- 網格線 -->
        ${gridLines.join('')}
        ${xTicks.join('')}

        <!-- 座標軸外框 -->
        <line x1="${padLeft}" y1="${padTop + plotH}" x2="${width - padRight}" y2="${padTop + plotH}" stroke="#94a3b8" stroke-width="1.5" />
        <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="#94a3b8" stroke-width="1.5" />

        ${specLines}
        <!-- 曲線繪製 -->
        <path d="${pathD}" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- 當前工作點交叉輔助線 -->
        <line x1="${padLeft}" y1="${curSvgY.toFixed(1)}" x2="${curSvgX.toFixed(1)}" y2="${curSvgY.toFixed(1)}" stroke="#ea580c" stroke-width="1" stroke-dasharray="2,2" opacity="0.8" />
        <line x1="${curSvgX.toFixed(1)}" y1="${padTop + plotH}" x2="${curSvgX.toFixed(1)}" y2="${curSvgY.toFixed(1)}" stroke="#ea580c" stroke-width="1" stroke-dasharray="2,2" opacity="0.8" />

        <!-- 當前工作點圓點 -->
        <circle ${chId === 'ch17' ? 'data-mean-marker="true"' : ''} cx="${curSvgX.toFixed(1)}" cy="${curSvgY.toFixed(1)}" r="5.5" fill="#ea580c" stroke="#ffffff" stroke-width="2" />
        <circle cx="${curSvgX.toFixed(1)}" cy="${curSvgY.toFixed(1)}" r="9" fill="none" stroke="#ea580c" stroke-width="1.5" opacity="0.4" />

        <!-- 軸標籤 -->
        <text x="${(padLeft + plotW / 2).toFixed(1)}" y="${height - 6}" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">${escapeXml(xLabel)}</text>
        <text x="16" y="${(padTop + plotH / 2).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#334155" transform="rotate(-90 16 ${(padTop + plotH / 2).toFixed(1)})">${escapeXml(yLabel)}</text>
      </svg>
      ${chId === 'ch22' ? `<p class="sensitivity-plot-note" style="font-size:12px;color:#475569;margin:8px 0 0;">${lang === 'en' ? 'Uncalibrated shape only. The marker is illustrative; neither axis is measured hours or FIT. This plot is independent of the AF calculator sliders.' : '僅示意未校準的形狀。標記為示例，兩軸不是實測小時或 FIT；此圖獨立於 AF 計算器滑桿。'}</p>` : ''}
    </div>
  `;
}
