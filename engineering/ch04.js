import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderLithoOpticalObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'path'; // 'path' | 'pr' | 'scan'
  let activeOpticalMode = 'imm'; // 'dry' | 'imm' | 'euv' | 'high_na'
  let activePRMode = 'pos'; // 'pos' | 'neg' | 'car'
  let customK1 = 0.28;
  let customNA = 1.35;

  // 光學參數設定
  const OPTICAL_PRESETS = {
    dry: { lambda: 193, na: 0.93, k1: 0.35, k2: 0.50, r: '72.6 nm', dof: '111.5 nm', scale: '4 : 1' },
    imm: { lambda: 193, na: 1.35, k1: 0.28, k2: 0.50, r: '40.0 nm', dof: '52.9 nm', scale: '4 : 1' },
    euv: { lambda: 13.5, na: 0.33, k1: 0.32, k2: 0.50, r: '13.1 nm', dof: '62.0 nm', scale: '4 : 1' },
    high_na: { lambda: 13.5, na: 0.55, k1: 0.32, k2: 0.50, r: '7.9 nm', dof: '22.3 nm', scale: '8 : 4 (Anamorphic)' }
  };

  function update() {
    const cur = OPTICAL_PRESETS[activeOpticalMode];
    const isEUV = activeOpticalMode === 'euv' || activeOpticalMode === 'high_na';
    const isImm = activeOpticalMode === 'imm';
    const beamColor = isEUV ? '#38bdf8' : '#71ece3';
    const beamCore = isEUV ? '#e0f2fe' : '#ccfbf1';

    // 即時物理推算
    const calcR = ((customK1 * cur.lambda) / customNA).toFixed(1);
    const calcDOF = ((0.50 * cur.lambda) / (customNA * customNA)).toFixed(1);
    const apertureGap = Math.max(16, Math.min(60, Math.round(customNA * 28)));

    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'path') {
      controlsHtml = `
        <div class="eng-obj-tab-group" role="tablist">
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'dry' ? 'is-active' : ''}" data-mode="dry">${t.ch04_mode_dry}</button>
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'imm' ? 'is-active' : ''}" data-mode="imm">${t.ch04_mode_imm}</button>
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'euv' ? 'is-active' : ''}" data-mode="euv">${t.ch04_mode_euv}</button>
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'high_na' ? 'is-active' : ''}" data-mode="high_na">${t.ch04_mode_high_na}</button>
        </div>
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch04K1">${t.physics_slider_k1}</label>
            <input type="range" class="eng-obj-range-input" id="ch04K1" min="0.25" max="0.55" step="0.01" value="${customK1}">
            <span class="eng-obj-slider-val">${customK1.toFixed(2)}</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch04NA">${t.physics_slider_na}</label>
            <input type="range" class="eng-obj-range-input" id="ch04NA" min="${isEUV ? '0.25' : '0.70'}" max="${isEUV ? '0.75' : '1.45'}" step="0.01" value="${customNA}">
            <span class="eng-obj-slider-val">${customNA.toFixed(2)}</span>
          </div>
          <div style="font-size: 11.5px; color: #94a3b8; margin-left: auto;">
            λ = <strong style="color: #38bdf8;">${cur.lambda} nm</strong>
          </div>
        </div>
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scanner Optical Path 4x Reduction" data-optics="refractive">
          <defs>
            <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${beamColor}" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="${beamColor}" stop-opacity="0.25"/>
            </linearGradient>
            <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#0284c7" stop-opacity="0.7"/>
              <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0.7"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- 背景格線標註 -->
          <g stroke="#1e293b" stroke-width="0.75" stroke-dasharray="3 3">
            <line x1="60" y1="50" x2="740" y2="50"/>
            <line x1="60" y1="130" x2="740" y2="130"/>
            <line x1="60" y1="210" x2="740" y2="210"/>
            <line x1="60" y1="350" x2="740" y2="350"/>
            <line x1="400" y1="30" x2="400" y2="430" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="6 4"/>
          </g>

          <!-- 1. 光源部 (Laser/EUV Source) -->
          <rect x="330" y="24" width="140" height="36" rx="4" fill="#0f172a" stroke="${beamColor}" stroke-width="1.5"/>
          <text x="400" y="47" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700" font-family="sans-serif">${t.ch04_laser_source} (${cur.lambda} nm)</text>
          
          <!-- 出射光束錐 -->
          <polygon points="370,60 430,60 480,110 320,110" fill="url(#beamGrad)" opacity="0.6"/>
          <line x1="400" y1="60" x2="400" y2="110" stroke="${beamCore}" stroke-width="2" class="anim-beam"/>

          <!-- 2. 照明光瞳 (Illuminator) -->
          <rect x="310" y="110" width="180" height="12" rx="2" fill="#334155" stroke="#64748b"/>
          <text x="510" y="120" fill="#94a3b8" font-size="11" font-family="sans-serif">${t.ch04_illuminator}</text>

          <!-- 光罩入射光 -->
          <polygon points="320,122 480,122 470,150 330,150" fill="url(#beamGrad)" opacity="0.7"/>

          <!-- 3. 光罩載台 (Reticle Stage, 4x Scale) -->
          <rect x="250" y="150" width="300" height="16" rx="2" fill="#1e293b" stroke="#e2e8f0" stroke-width="1.2"/>
          <!-- 光罩鉻層微圖形 (4x 圖元) -->
          <g fill="#f59e0b">
            <rect x="340" y="152" width="20" height="12"/>
            <rect x="380" y="152" width="20" height="12"/>
            <rect x="420" y="152" width="20" height="12"/>
          </g>
          <path d="M 550,158 L 562,158" fill="none" stroke="#f59e0b" stroke-width="1"/>
          <text x="570" y="157" fill="#f59e0b" font-size="12" font-weight="700" font-family="sans-serif"><tspan x="570">${t.ch04_reticle} </tspan><tspan x="570" dy="18">[4x: 112nm Pitch]</tspan></text>

          <!-- 4. 4:1 縮小投影物鏡系統 (Projection Lens Column) -->
          <!-- 投影光錐 4:1 收束折射 -->
          <polygon points="330,166 470,166 450,230 350,230" fill="url(#beamGrad)" opacity="0.75"/>
          
          <!-- 雙凸透鏡 1 -->
          <path d="M 320,230 Q 400,215 480,230 Q 400,245 320,230 Z" fill="url(#lensGrad)" stroke="#38bdf8" stroke-width="1"/>
          
          <!-- 光闌 Aperture Stop (隨 NA 滑桿連動開合) -->
          <rect x="${400 - apertureGap - 50}" y="255" width="50" height="8" fill="#475569"/>
          <rect x="${400 + apertureGap}" y="255" width="50" height="8" fill="#475569"/>
          <text x="510" y="262" fill="#38bdf8" font-size="11" font-family="sans-serif">NA Aperture Stop (${customNA.toFixed(2)})</text>

          <!-- 雙凸透鏡 2 與收斂光錐 -->
          <path d="M 340,280 Q 400,268 460,280 Q 400,292 340,280 Z" fill="url(#lensGrad)" stroke="#38bdf8" stroke-width="1"/>
          <polygon points="${400 - apertureGap},290 ${400 + apertureGap},290 405,372 395,372" fill="url(#beamGrad)" opacity="0.9" filter="url(#glow)"/>
          
          <!-- 投影透鏡組說明 -->
          <text x="180" y="235" text-anchor="end" fill="#94a3b8" font-size="11.5" font-family="sans-serif"><tspan x="180">${t.ch04_proj_lens.replace(' (', ' </tspan><tspan x="180" dy="17">(')}</tspan></text>
          <path d="M 190,242 L 315,242" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>

          <!-- 5. 浸潤式水層 (Immersion Layer) 若為 ArFi -->
          ${isImm ? `
            <rect x="320" y="360" width="160" height="14" rx="2" fill="rgba(56, 189, 248, 0.35)" stroke="#38bdf8" stroke-width="1"/>
            <text x="500" y="371" fill="#71ece3" font-size="11.5" font-weight="600" font-family="sans-serif">${t.ch04_imm_water}</text>
          ` : ''}

          <!-- 6. 晶圓載台與 1x 光阻成像層 (Wafer Stage) -->
          <rect x="260" y="376" width="280" height="32" rx="3" fill="#1e293b" stroke="#0284c7" stroke-width="1.5"/>
          <rect x="280" y="376" width="240" height="6" fill="#f59e0b"/>
          <!-- 縮小成像圖案 1x (隨解析度動態計算) -->
          <g fill="#38bdf8">
            <rect x="${395 - calcR / 10}" y="376" width="${Math.max(3, calcR / 10)}" height="6"/>
            <rect x="${405}" y="376" width="${Math.max(3, calcR / 10)}" height="6"/>
          </g>
          <text x="400" y="399" text-anchor="middle" fill="#f8fafc" font-size="12" font-weight="700" font-family="sans-serif">${t.ch04_wafer_stage} [R = ${calcR} nm]</text>
          <text x="560" y="430" fill="#38bdf8" font-size="11.5" font-weight="700" font-family="sans-serif">Focus DOF: ±${calcDOF} nm</text>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      if (isEUV) {
        const en = lang === 'en';
        const scaleLabel = activeOpticalMode === 'high_na' ? '4× / 8×' : '4× / 4×';
        viewportHtml = `
          <svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${en ? 'Reflective EUV optical principle diagram' : 'EUV 反射式光路原理示意'}" data-optics="reflective">
            <defs><marker id="ch04EuvArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0f766e"/></marker></defs>
            <rect x="24" y="24" width="752" height="412" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-dasharray="6 5"/>
            <text x="45" y="49" fill="#0f172a" font-size="14" font-weight="700">${en ? 'Vacuum · reflective optics' : '真空環境・反射式光學'}</text>
            <text x="45" y="71" fill="#475569" font-size="12">${en ? 'Simplified path; mirror count and geometry are not to scale' : '簡化光路；鏡面數量與幾何非按比例'}</text>
            <rect x="50" y="110" width="180" height="54" rx="6" fill="#e2e8f0" stroke="#0f766e"/>
            <text x="140" y="132" text-anchor="middle" fill="#0f172a" font-size="13" font-weight="700">${en ? 'EUV illumination' : 'EUV 照明系統'}</text>
            <text x="140" y="151" text-anchor="middle" fill="#0f766e" font-size="12">λ = ${cur.lambda} nm</text>
            <path d="M230,137 L370,196 L550,116 L390,278 L555,349" fill="none" stroke="#0f766e" stroke-width="3" marker-end="url(#ch04EuvArrow)"/>
            <path d="M275,156 L320,175" fill="none" stroke="#0f766e" stroke-width="3" marker-end="url(#ch04EuvArrow)"/><path d="M420,174 L480,147" fill="none" stroke="#0f766e" stroke-width="3" marker-end="url(#ch04EuvArrow)"/><path d="M510,156 L450,217" fill="none" stroke="#0f766e" stroke-width="3" marker-end="url(#ch04EuvArrow)"/><path d="M440,299 L490,321" fill="none" stroke="#0f766e" stroke-width="3" marker-end="url(#ch04EuvArrow)"/>
            <path d="M315,205 L423,205" stroke="#64748b" stroke-width="12"/>
            <path d="M315,198 L423,198" stroke="#b45309" stroke-width="4"/>
            <text x="350" y="234" text-anchor="middle" fill="#0f172a" font-size="13" font-weight="700">${en ? 'Reflective mask' : '反射式光罩'}</text>
            <path d="M512,126 Q550,106 587,126" fill="none" stroke="#0369a1" stroke-width="9"/>
            <path d="M354,288 Q390,268 426,288" fill="none" stroke="#0369a1" stroke-width="9"/>
            <text x="603" y="168" fill="#0f172a" font-size="13" font-weight="700">${en ? 'Projection mirrors' : '投影反射鏡組'}</text>
            <text x="603" y="191" fill="#475569" font-size="12">NA = ${customNA.toFixed(2)}</text>
            <text x="603" y="214" fill="#0f766e" font-size="13" font-weight="700">${scaleLabel}</text>
            <text x="603" y="235" fill="#475569" font-size="11">${en ? 'Two-axis demagnification' : '兩軸縮小倍率'}</text>
            <rect x="480" y="350" width="220" height="12" fill="#f59e0b"/>
            <rect x="465" y="362" width="250" height="35" rx="4" fill="#e2e8f0" stroke="#64748b"/>
            <text x="590" y="384" text-anchor="middle" fill="#0f172a" font-size="13" font-weight="700">${en ? 'Resist / wafer stage' : '光阻／晶圓載台'}</text>
            <text x="50" y="345" fill="#0f172a" font-size="13">R = ${calcR} nm</text>
            <text x="50" y="369" fill="#0f172a" font-size="13">DOF = ${calcDOF} nm</text>
            <text x="50" y="409" fill="#475569" font-size="12">${en ? 'No transmissive lens or immersion-water layer in this EUV path' : '此 EUV 光路不使用透射式透鏡或浸潤水層'}</text>
          </svg>`;
      }

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_res}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${calcR} nm</div>
          <div class="eng-obj-metric-note">R = k₁·(λ/NA) · k₁=${customK1.toFixed(2)}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_dof}</div>
          <div class="eng-obj-metric-value">${calcDOF} nm</div>
          <div class="eng-obj-metric-note">DOF = 0.5·(λ/NA²)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_na}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${customNA.toFixed(2)}</div>
          <div class="eng-obj-metric-note">${isImm ? 'Immersion Water (n=1.44)' : (isEUV ? 'Mo/Si Reflective Optics' : 'Standard Dry Air Lens')}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_scale}</div>
          <div class="eng-obj-metric-value">${cur.scale}</div>
          <div class="eng-obj-metric-note">Reticle to Wafer Magnification</div>
        </div>
      `;

      footerNote = t.ch04_formula_note;
    } else if (activeTab === 'pr') {
      controlsHtml = `
        <div class="eng-obj-tab-group" role="tablist">
          <button type="button" class="eng-obj-tab ${activePRMode === 'pos' ? 'is-active' : ''}" data-prmode="pos">${t.ch04_pr_pos}</button>
          <button type="button" class="eng-obj-tab ${activePRMode === 'neg' ? 'is-active' : ''}" data-prmode="neg">${t.ch04_pr_neg}</button>
          <button type="button" class="eng-obj-tab ${activePRMode === 'car' ? 'is-active' : ''}" data-prmode="car">${t.ch04_pr_car}</button>
        </div>
      `;

      const isPos = activePRMode === 'pos';
      const isCar = activePRMode === 'car';

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Photoresist Mechanism">
          <!-- 步驟 1: 曝光照光 -->
          <g transform="translate(40, 40)">
            <rect x="0" y="0" width="210" height="300" rx="6" fill="#131e2b" stroke="#334155"/>
            <text x="105" y="28" text-anchor="middle" fill="#38bdf8" font-size="13.5" font-weight="700">${lang === 'en' ? "1. Exposure" : "1. 曝光照射 (Exposure)"}</text>
            <!-- 光罩遮擋 -->
            <rect x="15" y="55" width="60" height="8" fill="#e2e8f0"/>
            <rect x="135" y="55" width="60" height="8" fill="#e2e8f0"/>
            <text x="105" y="50" text-anchor="middle" fill="#94a3b8" font-size="10.5">${lang === 'en' ? "Mask opening" : "光罩開口 (Mask)"}</text>
            <!-- 光束線束 -->
            <g stroke="#71ece3" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.85">
              <line x1="85" y1="65" x2="85" y2="150"/>
              <line x1="105" y1="65" x2="105" y2="150"/>
              <line x1="125" y1="65" x2="125" y2="150"/>
            </g>
            <!-- 光阻層 -->
            <rect x="15" y="150" width="180" height="60" fill="#f59e0b" opacity="0.85"/>
            <!-- 照光感光區 -->
            <rect x="75" y="150" width="60" height="60" fill="${isPos ? '#38bdf8' : '#059669'}" opacity="0.9"/>
            <text x="105" y="185" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${lang === 'en' ? (isCar ? 'PAG generates H⁺' : (isPos ? 'Photolytic deprotection' : 'Cross-linking')) : (isCar ? 'PAG 產酸 H⁺' : (isPos ? '光解去保護' : '交聯聚合'))}</text>
            <!-- 矽基板 -->
            <rect x="15" y="210" width="180" height="40" fill="#334155"/>
            <text x="105" y="235" text-anchor="middle" fill="#94a3b8" font-size="11">${lang === 'en' ? "Si substrate" : "矽基板 (Si Substrate)"}</text>
          </g>

          <!-- 步驟 2: 後烘烤 (PEB) -->
          <g transform="translate(295, 40)">
            <rect x="0" y="0" width="210" height="300" rx="6" fill="#131e2b" stroke="#334155"/>
            <text x="105" y="28" text-anchor="middle" fill="#f59e0b" font-size="13.5" font-weight="700">${lang === 'en' ? "2. PEB (~110°C)" : "2. 後烘烤 (PEB ~110°C)"}</text>
            <text x="105" y="60" text-anchor="middle" fill="#cbd5e1" font-size="11">${lang === 'en' ? (isCar ? 'Acid-catalyzed chain reaction' : 'Uniform thermal diffusion') : (isCar ? '酸催化連鎖放大反應' : '熱致化學均勻擴散')}</text>
            <!-- 熱波指示 -->
            <path d="M 60,95 Q 75,80 90,95 T 120,95 T 150,95" fill="none" stroke="#f59e0b" stroke-width="2"/>
            <!-- 光阻層與擴散 -->
            <rect x="15" y="150" width="180" height="60" fill="#f59e0b" opacity="0.85"/>
            <rect x="73" y="150" width="64" height="60" fill="${isPos ? '#0284c7' : '#047857'}" opacity="0.95"/>
            <text x="105" y="185" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${lang === 'en' ? (isCar ? '1 H⁺ catalyzes 100+ bonds' : (isPos ? 'Solubility-multiplied region' : 'Insoluble cross-linked region')) : (isCar ? '1 個 H⁺ 催化 100+ 鍵' : (isPos ? '溶解度倍增區' : '耐溶交聯區'))}</text>
            <rect x="15" y="210" width="180" height="40" fill="#334155"/>
            <text x="105" y="235" text-anchor="middle" fill="#94a3b8" font-size="11">${lang === 'en' ? "Si substrate" : "矽基板 (Si Substrate)"}</text>
          </g>

          <!-- 步驟 3: 顯影洗淨 (Development) -->
          <g transform="translate(550, 40)">
            <rect x="0" y="0" width="210" height="300" rx="6" fill="#131e2b" stroke="#334155"/>
            <text x="105" y="28" text-anchor="middle" fill="#10b981" font-size="13.5" font-weight="700">${lang === 'en' ? "3. Develop (TMAH 2.38%)" : "3. 顯影洗淨 (TMAH 2.38%)"}</text>
            <text x="105" y="60" text-anchor="middle" fill="#cbd5e1" font-size="11">${lang === 'en' ? (isPos ? 'Exposed dissolves · opening' : 'Unexposed dissolves · island') : (isPos ? '光照區溶解 · 留下開口' : '未照光區溶解 · 留下立柱')}</text>
            
            <!-- 顯影後光阻殘留圖形 -->
            ${isPos ? `
              <!-- 正光阻：中間照光區被溶掉形成開口 -->
              <rect x="15" y="150" width="60" height="60" fill="#f59e0b"/>
              <rect x="135" y="150" width="60" height="60" fill="#f59e0b"/>
              <text x="105" y="185" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="700">${lang === 'en' ? "Opening" : "開口 (Opening)"}</text>
            ` : `
              <!-- 負光阻：中間照光區留存，兩側溶掉 -->
              <rect x="75" y="150" width="60" height="60" fill="#047857"/>
              <text x="105" y="185" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">${lang === 'en' ? "Island" : "立柱 (Island)"}</text>
            `}
            <rect x="15" y="210" width="180" height="40" fill="#334155"/>
            <text x="105" y="235" text-anchor="middle" fill="#94a3b8" font-size="11">${lang === 'en' ? "Si substrate" : "矽基板 (Si Substrate)"}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Developer" : "顯影液規格 (Developer)"}</div>
          <div class="eng-obj-metric-value">2.38% TMAH</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Strong alkaline aqueous tetramethylammonium hydroxide" : "氫氧化四甲基銨強鹼水溶液"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Contrast (γ)" : "對比度 Contrast (γ)"}</div>
          <div class="eng-obj-metric-value">&gt; 12.0</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Key metric for steep sidewall profiles" : "高陡直度側壁輪廓必備指標"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Line edge / width roughness (LER / LWR)" : "線邊粗糙度 (LER / LWR)"}</div>
          <div class="eng-obj-metric-value">&lt; 1.2 nm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Affected by acid diffusion length and photon shot noise" : "受酸擴散長度與光子散粒噪聲影響"}</div>
        </div>
      `;

      footerNote = lang === 'en' ? "Chemically amplified resist (CAR) uses a small amount of photoacid generator (PAG) to trigger chain deprotection reactions during post-exposure bake, increasing photon sensitivity by hundreds of times. It is a key technique for addressing limited EUV source power below 7nm." : '化學增幅型抗蝕劑 (CAR) 透過微量 PAG 光酸產生劑引發後烘烤連鎖脫保護反應，將光量子靈敏度提升數百倍，是 7nm 以下極紫外光 (EUV) 微影克服光源功率不足的關鍵技術。';
    } else {
      // Step-and-Scan Slit
      controlsHtml = '';
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Step and Scan">
          <!-- 光罩載台掃描運動 (向左 4v) -->
          <g transform="translate(150, 40)">
            <rect x="0" y="0" width="500" height="80" rx="4" fill="#131e2b" stroke="#334155"/>
            <text x="20" y="26" fill="#f59e0b" font-size="13" font-weight="700">${lang === 'en' ? "Reticle stage · speed: 4v ← scan" : "光罩台 (Reticle Stage) · 速度: 4v ← 掃描"}</text>
            <rect x="180" y="38" width="140" height="28" fill="#334155" stroke="#f59e0b" stroke-width="1.5"/>
            <!-- 掃描狹縫 (Exposure Slit) -->
            <rect x="230" y="38" width="40" height="28" fill="#38bdf8" opacity="0.8"/>
            <text x="250" y="56" text-anchor="middle" fill="#09131b" font-size="10.5" font-weight="700">${lang === 'en' ? "Slit" : "狹縫 Slit"}</text>
          </g>

          <!-- 光學縮小投影中心箭頭 -->
          <path d="M 400,130 L 400,210" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 4"/>
          <text x="420" y="175" fill="#38bdf8" font-size="12" font-family="sans-serif">${lang === 'en' ? "4:1 counter-scanning projection" : "4:1 反向同步投影"}</text>

          <!-- 晶圓載台掃描運動 (向右 v) -->
          <g transform="translate(150, 220)">
            <rect x="0" y="0" width="500" height="90" rx="4" fill="#131e2b" stroke="#0284c7"/>
            <text x="20" y="26" fill="#38bdf8" font-size="13" font-weight="700">${lang === 'en' ? "Wafer stage · speed: v → step-and-scan" : "晶圓台 (Wafer Stage) · 速度: v → 步進掃描"}</text>
            <circle cx="250" cy="56" r="30" fill="#1e293b" stroke="#64748b"/>
            <!-- 曝光區域 (Die Exposure Field) -->
            <rect x="235" y="44" width="30" height="24" fill="#38bdf8" opacity="0.8"/>
            <text x="250" y="59" text-anchor="middle" fill="#09131b" font-size="9" font-weight="700">Die 1x</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Scan field size" : "掃描視場 (Field Size)"}</div>
          <div class="eng-obj-metric-value">26 × 33 mm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Maximum standard exposure area per scan" : "單次掃描最大標準曝光面積"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Overlay accuracy" : "套準精度 (Overlay Accuracy)"}</div>
          <div class="eng-obj-metric-value">&lt; 1.5 nm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Real-time dual-stage interferometer feedback correction" : "雙載台干涉儀即時反饋校正"}</div>
        </div>
      `;
      footerNote = lang === 'en' ? "Step-and-scan moves the reticle and wafer stages in opposite directions at a precise 4:1 speed ratio. Exposure uses a narrow central slit with favorable aberration performance, substantially reducing distortion at the edges of a large lens field." : '步進掃描 (Step-and-Scan) 讓光罩台與晶圓台以 4:1 的精確速度比反向高速動態掃描，僅透過狹窄的光學最佳像差中心狹縫 (Slit) 進行曝光，大幅降低大面積透鏡邊緣畸變。';
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh04Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 04</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh04Title">${t.ch04_title}</h2>
          <p class="eng-obj-subtitle">${t.ch04_sub}</p>
        </header>
        
        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'path' ? 'is-active' : ''}" data-tab="path">${t.ch04_tab_path}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'pr' ? 'is-active' : ''}" data-tab="pr">${t.ch04_tab_pr}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'scan' ? 'is-active' : ''}" data-tab="scan">${t.ch04_tab_scan}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Lithography Generation Clauses' : '微影波長與曝光條例 (Litho Clauses)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'i-line · 193i · EUV · High-NA' : 'i-line · 193i · EUV · High-NA'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? '365nm RDL, 193i+SAQP, 0.33 NA EUV & 0.55 NA High-NA anamorphic (4×/8×)' : '365nm 封裝 RDL、193i+SAQP、0.33 NA EUV 與 0.55 NA High-NA (4×/8×)'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Rayleigh DOF & Shot-Noise Law' : '瑞利焦深與散粒雜訊律 (Litho Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'HP = k1·λ/NA · DOF = k2·λ/NA² · EPE' : 'HP = k1·λ/NA · DOF = k2·λ/NA² · EPE'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? '0.55 High-NA 8nm limit, 91.8 eV shot noise & EPE < Pitch/4' : '0.55 High-NA 解析度 8nm、91.8 eV 光子散粒雜訊與 EPE < P/4'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Stochastic Bridge · Chuck Spot · CPE' : 'Stochastic Bridge · Chuck Spot · CPE'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Mitigates EUV stochastic bridges, chuck focus hotspots & CPE overlay drift' : '防範 EUV 光子散粒隨機微橋接、吸盤顆粒失焦熱點與高階疊對畸變重工'}</div>
          </div>
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `, t);

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
    container.querySelectorAll('[data-mode]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activeOpticalMode = btn.getAttribute('data-mode');
        const p = OPTICAL_PRESETS[activeOpticalMode];
        if (p) {
          customK1 = p.k1;
          customNA = p.na;
        }
        update();
      });
    });
    container.querySelectorAll('[data-prmode]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activePRMode = btn.getAttribute('data-prmode');
        update();
      });
    });

    const k1Slider = container.querySelector('#ch04K1');
    if (k1Slider) {
      bindEngineeringEvent(k1Slider, 'input', (e) => {
        customK1 = parseFloat(e.target.value);
        update();
      });
    }
    const naSlider = container.querySelector('#ch04NA');
    if (naSlider) {
      bindEngineeringEvent(naSlider, 'input', (e) => {
        customNA = parseFloat(e.target.value);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 2. Ch 05 薄膜沉積機制對比與 ALD 自限模型 (Thin Films & ALD Model)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderLithoOpticalObject as render };
