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

  // Ch 14: RC 互連線延遲 (Delay vs Wire Length)
  ch14: {
    xLabelZh: '導線長度 L (µm)',
    xLabelEn: 'Interconnect Length L (µm)',
    yLabelZh: 'RC 延遲 τ (ps)',
    yLabelEn: 'RC Delay τ (ps)',
    xMin: 10,
    xMax: 1000,
    compute: (x, p) => {
      const r = p.resPerUm || 0.15; // ohm/um
      const c = p.capPerUm || 0.2; // fF/um
      return 0.5 * r * c * x * x * 0.001; // ps
    },
    getCurrentX: p => p.wireLength || 250
  },

  // Ch 16: 負二項良率模型 (Yield vs Defect Density)
  ch16: {
    xLabelZh: '缺陷密度 D (defects/cm²)',
    xLabelEn: 'Defect Density D (defects/cm²)',
    yLabelZh: '晶圓良率 Yield (%)',
    yLabelEn: 'Wafer Yield (%)',
    xMin: 0.05,
    xMax: 1.5,
    compute: (x, p) => {
      const area = p.dieArea || 1.2; // cm2
      const alpha = p.alpha || 2.0;
      return 100 * Math.pow(1 + (x * area) / alpha, -alpha);
    },
    getCurrentX: p => p.defectDensity || 0.25
  },

  // Ch 17: SPC 常態分佈鐘形曲線與 Cpk (Normal Density)
  ch17: {
    xLabelZh: '統計偏差 (Z-Score σ)',
    xLabelEn: 'Process Deviation (Z-Score σ)',
    yLabelZh: '常態機率密度 f(z)',
    yLabelEn: 'Normal Probability Density',
    xMin: -4,
    xMax: 4,
    compute: x => {
      return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
    },
    getCurrentX: p => {
      const cpk = p.cpk || 1.33;
      return (1.67 - cpk) * 2; // 操作點偏移
    }
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
    xLabelZh: '工作時間 t (相對小時)',
    xLabelEn: 'Operating Time t (Normalized Hours)',
    yLabelZh: '瞬間故障率 λ(t)',
    yLabelEn: 'Hazard Rate λ(t)',
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

  const padLeft = 65;
  const padRight = 30;
  const padTop = 32;
  const padBottom = 42;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const { xMin, xMax, compute, getCurrentX } = model;
  const xLabel = lang === 'en' ? model.xLabelEn : model.xLabelZh;
  const yLabel = lang === 'en' ? model.yLabelEn : model.yLabelZh;

  // 取樣 50 個點計算 Y 範圍
  const steps = 50;
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
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; padding: 0 4px;">
        <span style="font-size: 11px; font-weight: 700; color: #0369a1; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          ${lang === 'en' ? 'Live Sensitivity Curve & Operating Point' : '即時參數敏感度曲線與工作點'}
        </span>
        <span style="font-size: 11px; color: #64748b; font-family: monospace;">
          ${lang === 'en' ? 'Current Op Point:' : '目前工作點：'} 
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

        <!-- 曲線繪製 -->
        <path d="${pathD}" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- 當前工作點交叉輔助線 -->
        <line x1="${padLeft}" y1="${curSvgY.toFixed(1)}" x2="${curSvgX.toFixed(1)}" y2="${curSvgY.toFixed(1)}" stroke="#ea580c" stroke-width="1" stroke-dasharray="2,2" opacity="0.8" />
        <line x1="${curSvgX.toFixed(1)}" y1="${padTop + plotH}" x2="${curSvgX.toFixed(1)}" y2="${curSvgY.toFixed(1)}" stroke="#ea580c" stroke-width="1" stroke-dasharray="2,2" opacity="0.8" />

        <!-- 當前工作點圓點 -->
        <circle cx="${curSvgX.toFixed(1)}" cy="${curSvgY.toFixed(1)}" r="5.5" fill="#ea580c" stroke="#ffffff" stroke-width="2" />
        <circle cx="${curSvgX.toFixed(1)}" cy="${curSvgY.toFixed(1)}" r="9" fill="none" stroke="#ea580c" stroke-width="1.5" opacity="0.4" />

        <!-- 軸標籤 -->
        <text x="${(padLeft + plotW / 2).toFixed(1)}" y="${height - 6}" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">${escapeXml(xLabel)}</text>
        <text x="16" y="${(padTop + plotH / 2).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#334155" transform="rotate(-90 16 ${(padTop + plotH / 2).toFixed(1)})">${escapeXml(yLabel)}</text>
      </svg>
    </div>
  `;
}
