import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderMetrologyInspectionObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'cdsem'; // 'cdsem' | 'optical' | 'ellipsometry'
  let landingEnergy = 500;  // 300 ~ 1200 eV
  let sidewallAngle = 86.0; // 80.0 ~ 89.8 °

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    // CD-SEM 二次電子 (SE) 逃逸動力學與邊緣效應計算
    const rad = (sidewallAngle * Math.PI) / 180;
    const cosTheta = Math.max(0.005, Math.cos(rad));
    // 二次電子邊緣倍增產額 delta / delta_0 ∝ (1 / cos(theta))^n, n ≈ 0.82
    const seMultiplier = Math.pow(1 / cosTheta, 0.82);
    
    // 奈米線條幾何：高度 H = 45nm, 頂部 Top CD = 12.0nm
    // 底部 Bottom CD = Top CD + 2 * (H / tan(theta))
    const lineH = 45; // nm
    const bottomCD = 12.0 + 2 * (lineH / Math.tan(rad));
    
    // 線寬邊緣粗糙度 LWR (nm) 隨能量 (光阻收縮損傷) 與側壁角度 (邊界模糊度) 變化
    const lwr = (1.1 + 0.045 * (90 - sidewallAngle) + 65 / Math.sqrt(landingEnergy)).toFixed(2);
    const snr = Math.round(18 + Math.sqrt(landingEnergy) * 1.2);

    if (activeTab === 'cdsem') {
      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch15EnergySlider">${t.ch15_energy_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch15EnergySlider" min="300" max="1200" step="50" value="${landingEnergy}">
            <span class="eng-obj-slider-val">${landingEnergy} eV</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch15AngleSlider">${t.ch15_angle_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch15AngleSlider" min="80.0" max="89.8" step="0.2" value="${sidewallAngle.toFixed(1)}">
            <span class="eng-obj-slider-val">${sidewallAngle.toFixed(1)}°</span>
          </div>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: #94a3b8; font-family: monospace;">Bottom CD: <strong style="color: #38bdf8; font-size: 13px;">${bottomCD.toFixed(2)} nm</strong></span>
            <span style="font-size: 11px; padding: 2px 7px; border-radius: 4px; background: rgba(15,23,42,0.6); border: 1px solid var(--border-subtle); color: #10b981; font-weight: 700;">
              LWR: ${lwr} nm
            </span>
          </div>
        </div>
      `;

      // 奈米圖案幾何頂底寬度隨傾角動態計算
      const topOffset = Math.round((90 - sidewallAngle) * 2.5);
      // 雙峰波峰高度隨二次電子倍增產額動態計算
      const peakY = Math.max(18, Math.min(60, Math.round(68 - seMultiplier * 9.5)));
      const peakSpread = Math.max(4, Math.min(18, Math.round((90 - sidewallAngle) * 1.3)));

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CD-SEM Electron Beam Metrology and Line Profile with 1/cos(theta) Physics">
          <!-- 上方低能電子槍與磁透鏡組 (FEG) -->
          <g transform="translate(300, 15)">
            <rect x="50" y="0" width="100" height="32" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="100" y="21" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="750">場發射電子槍 (FEG)</text>
            <text x="100" y="45" text-anchor="middle" fill="#94a3b8" font-size="9.5">著陸能量 ${landingEnergy} eV · SNR ${snr} dB</text>

            <!-- 電磁聚焦透鏡與偏轉掃描極板 (Deflection Plates) -->
            <polygon points="70,50 130,50 110,75 90,75" fill="#334155" stroke="#cbd5e1" stroke-width="1"/>
            <rect x="65" y="80" width="15" height="18" fill="#f59e0b"/>
            <rect x="120" y="80" width="15" height="18" fill="#f59e0b"/>
            <text x="100" y="93" text-anchor="middle" fill="#ffffff" font-size="9">X-Y 偏轉掃描</text>

            <!-- 聚焦電子束微探針 (Focused E-Beam Probe: 直徑 < 1nm) -->
            <line x1="100" y1="100" x2="100" y2="175" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 2" class="anim-beam"/>
            <circle cx="100" cy="175" r="3" fill="#38bdf8"/>
          </g>

          <!-- 中段：晶圓奈米溝槽微觀剖面與二次電子 (SE) 逃逸 -->
          <g transform="translate(150, 175)">
            <!-- 矽基底 -->
            <rect x="0" y="60" width="500" height="40" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <text x="250" y="85" text-anchor="middle" fill="#94a3b8" font-size="11">矽晶圓基板 (Silicon Substrate) · θ = ${sidewallAngle.toFixed(1)}°</text>

            <!-- 奈米線條光阻/金屬圖案 (Line/Space Pattern with dynamic sidewall angle) -->
            <g transform="translate(180, 0)">
              <!-- 幾何梯形 (動態側壁傾角) -->
              <polygon points="${topOffset},0 ${140 - topOffset},0 140,60 0,60" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="70" y="30" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750">奈米圖案 (Line)</text>
              <text x="70" y="45" text-anchor="middle" fill="#38bdf8" font-size="9.5">Bottom CD = ${bottomCD.toFixed(2)} nm</text>

              <!-- 側壁二次電子逃逸 (Edge Blooming δ ∝ 1/cosθ) -->
              <circle cx="${topOffset / 2}" cy="30" r="${Math.min(7, 3 + seMultiplier * 0.8)}" fill="#fbbf24"/>
              <line x1="${topOffset / 2}" y1="30" x2="-25" y2="10" stroke="#fbbf24" stroke-width="1.5"/>
              <circle cx="${140 - topOffset / 2}" cy="30" r="${Math.min(7, 3 + seMultiplier * 0.8)}" fill="#fbbf24"/>
              <line x1="${140 - topOffset / 2}" y1="30" x2="165" y2="10" stroke="#fbbf24" stroke-width="1.5"/>
              <text x="-40" y="8" fill="#fbbf24" font-size="9.5">SE 二次電子逃逸 (δ/δ₀ = ${seMultiplier.toFixed(2)}×)</text>
            </g>
          </g>

          <!-- 下方：二次電子信號強度波形圖 (SE Intensity Profile: 經典雙峰曲線) -->
          <g transform="translate(150, 285)">
            <rect x="0" y="0" width="500" height="105" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <text x="250" y="18" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">二次電子信號強度波形 (SE Signal Profile) · 邊緣白邊效應</text>
            <!-- 動態雙峰波形曲線 (Peaks at edges due to blooming) -->
            <path d="M 20,72 L ${180 - peakSpread * 3},72 Q ${180 - peakSpread},72 180,${peakY} Q ${180 + peakSpread},75 ${180 + peakSpread * 2},68 L ${320 - peakSpread * 2},68 Q ${320 - peakSpread},75 320,${peakY} Q ${320 + peakSpread},72 ${320 + peakSpread * 3},72 L 480,72" fill="none" stroke="#10b981" stroke-width="2.5"/>
            <!-- 標註兩峰值與量測 CD -->
            <line x1="180" y1="20" x2="180" y2="88" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="320" y1="20" x2="320" y2="88" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="180" y1="88" x2="320" y2="88" stroke="#f59e0b" stroke-width="2"/>
            <text x="250" y="84" text-anchor="middle" fill="#fbbf24" font-size="10.5" font-weight="750">← 演算法提取 Bottom CD (${bottomCD.toFixed(2)} nm) →</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch15_bottom_cd}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${bottomCD.toFixed(2)} nm</div>
          <div class="eng-obj-metric-note">Top CD: 12.0 nm · 側壁角度 θ: ${sidewallAngle.toFixed(1)}°</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch15_se_yield}</div>
          <div class="eng-obj-metric-value" style="color: #f59e0b;">${seMultiplier.toFixed(2)} ×</div>
          <div class="eng-obj-metric-note">δ(θ) ∝ (1/cosθ)^0.82 表面逃逸深度幾何放大</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch15_lwr_label}</div>
          <div class="eng-obj-metric-value" style="color: ${parseFloat(lwr) > 2.0 ? '#ef4444' : 'var(--semi-teal)'};">${lwr} nm</div>
          <div class="eng-obj-metric-note">著陸能量 ${landingEnergy} eV (SNR: ${snr} dB) · 防光阻收縮</div>
        </div>
      `;

      footerNote = t.ch15_cdsem_desc;
    } else if (activeTab === 'optical') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bright-field vs Dark-field Wafer Defect Inspection">
          <!-- 左側：明場光學檢測 (Bright-field Inspection) -->
          <g transform="translate(60, 30)">
            <rect x="0" y="0" width="320" height="350" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" rx="6"/>
            <text x="160" y="28" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="750">明場檢測 (Bright-Field: 垂直入射)</text>
            <text x="160" y="46" text-anchor="middle" fill="#94a3b8" font-size="10">高 NA 透鏡 · 收集正向反射光 · 偵測圖案變形</text>

            <!-- 光路結構 -->
            <g transform="translate(160, 60)">
              <!-- 光源與物鏡 -->
              <rect x="-40" y="0" width="80" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="3"/>
              <text x="0" y="18" text-anchor="middle" fill="#ffffff" font-size="10">明場物鏡 (NA 0.95)</text>
              <!-- 垂直光線 -->
              <line x1="0" y1="35" x2="0" y2="120" stroke="#38bdf8" stroke-width="3"/>
              <line x1="-15" y1="35" x2="-15" y2="120" stroke="#38bdf8" stroke-width="1.5"/>
              <line x1="15" y1="35" x2="15" y2="120" stroke="#38bdf8" stroke-width="1.5"/>
            </g>

            <!-- 晶圓表面圖案與橋接缺陷 (Bridge Defect) -->
            <g transform="translate(40, 200)">
              <rect x="0" y="40" width="240" height="30" fill="#1e293b"/>
              <rect x="30" y="10" width="40" height="30" fill="#64748b"/>
              <rect x="170" y="10" width="40" height="30" fill="#64748b"/>
              <!-- 缺陷短路橋 (Bridging Pattern Defect) -->
              <rect x="70" y="20" width="100" height="15" fill="#ef4444" stroke="#f87171" stroke-width="1"/>
              <text x="120" y="14" text-anchor="middle" fill="#f87171" font-size="10" font-weight="700">短路橋接缺陷 (Bridge Defect)</text>
              <text x="120" y="90" text-anchor="middle" fill="#38bdf8" font-size="10">反射光強度改變 → 灰階影像對比抓取</text>
            </g>
          </g>

          <!-- 右側：暗場雷射散射檢測 (Dark-field Inspection) -->
          <g transform="translate(420, 30)">
            <rect x="0" y="0" width="320" height="350" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
            <text x="160" y="28" text-anchor="middle" fill="#fbbf24" font-size="12.5" font-weight="750">暗場檢測 (Dark-Field: 斜角掠射)</text>
            <text x="160" y="46" text-anchor="middle" fill="#94a3b8" font-size="10">雷射斜射 · 鏡面反射避開透鏡 · 偵測微小微粒</text>

            <!-- 斜入射雷射 (Grazing Angle Laser) -->
            <line x1="20" y1="70" x2="150" y2="210" stroke="#f59e0b" stroke-width="2.5"/>
            <text x="40" y="65" fill="#fbbf24" font-size="10">雷射斜入射 ↘</text>

            <!-- 鏡面反射光被傾斜擋板濾除 -->
            <line x1="150" y1="210" x2="280" y2="70" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3"/>
            <text x="270" y="65" fill="#64748b" font-size="9.5">鏡面反射光 (不入透鏡)</text>

            <!-- 頂部高靈敏光學收集透鏡與 PMT -->
            <g transform="translate(160, 60)">
              <rect x="-40" y="0" width="80" height="30" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="3"/>
              <text x="0" y="18" text-anchor="middle" fill="#34d399" font-size="10">暗場收集器 (PMT)</text>
            </g>

            <!-- 表面微粒與瑞利散射 (Rayleigh Scattering) -->
            <g transform="translate(40, 210)">
              <rect x="0" y="0" width="240" height="30" fill="#1e293b"/>
              <!-- 15nm 孤立微粒 (Particle) -->
              <circle cx="110" cy="0" r="5" fill="#ef4444" stroke="#ffffff" stroke-width="1"/>
              <!-- 向上發散的瑞利散射光 -->
              <path d="M 110,0 L 110,-120" stroke="#34d399" stroke-width="2.5"/>
              <path d="M 110,0 L 95,-120" stroke="#34d399" stroke-width="1.5"/>
              <path d="M 110,0 L 125,-120" stroke="#34d399" stroke-width="1.5"/>
              <text x="110" y="-40" text-anchor="middle" fill="#34d399" font-size="10" font-weight="700">瑞利散射光 ⇡</text>
              <text x="120" y="55" text-anchor="middle" fill="#fbbf24" font-size="10.5" font-weight="750">漆黑背景下瞬間點亮 15nm 孤立微粒！</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch15_metric_darkfield}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&lt; 15 nm 微粒</div>
          <div class="eng-obj-metric-note">DUV 266nm 紫外雷射暗場瑞利散射</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">晶圓掃描檢測吞吐量</div>
          <div class="eng-obj-metric-value">&gt; 60 Wafers/hr</div>
          <div class="eng-obj-metric-note">光學全檢能在幾分鐘內掃描百億晶粒</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">明場缺陷辨識率</div>
          <div class="eng-obj-metric-value">&gt; 99.5%</div>
          <div class="eng-obj-metric-note">Die-to-Database 即時影像對照演算法</div>
        </div>
      `;

      footerNote = t.ch15_optical_desc;
    } else if (activeTab === 'ellipsometry') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spectroscopic Ellipsometry for Thin Film Metrology">
          <!-- 入射光源與起偏器 (Polarizer @ 70° Brewster Angle) -->
          <g transform="translate(100, 50)">
            <rect x="0" y="0" width="120" height="35" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="60" y="22" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">寬頻光源 + 起偏器</text>
            <!-- 照射光線 -->
            <line x1="120" y1="35" x2="300" y2="220" stroke="#38bdf8" stroke-width="2.5"/>
            <text x="170" y="110" fill="#38bdf8" font-size="10">線偏振光 (Linearly Polarized)</text>
            <path d="M 170,145 L 240,158" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3 2"/>
            <text x="120" y="150" fill="#f59e0b" font-size="11" font-weight="700">θ = 70°</text>
          </g>

          <!-- 晶圓多層薄膜微觀干涉區 (Thin Film Stack) -->
          <g transform="translate(250, 220)">
            <!-- 頂部超薄介電薄膜 (Film to measure: 例如 1.8nm HfO2) -->
            <rect x="0" y="0" width="300" height="20" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="150" y="14" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">待測超薄薄膜 (High-k Film: d = 1.82 nm, n = 2.05)</text>

            <!-- 中間介面層 (Interfacial SiO2 layer) -->
            <rect x="0" y="20" width="300" height="15" fill="#334155"/>
            <text x="150" y="31" text-anchor="middle" fill="#94a3b8" font-size="9">介面氧化層 (IL SiO₂ ~0.8 nm)</text>

            <!-- 矽基底 (Si Substrate) -->
            <rect x="0" y="35" width="300" height="40" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
            <text x="150" y="60" text-anchor="middle" fill="#cbd5e1" font-size="11">矽晶圓基板 (Si Substrate)</text>
          </g>

          <!-- 反射光路、檢偏器與光譜儀 (Analyzer & Spectrometer) -->
          <g transform="translate(550, 50)">
            <line x1="-150" y1="170" x2="30" y2="35" stroke="#f59e0b" stroke-width="2.5"/>
            <!-- 橢圓偏振光標示 -->
            <ellipse cx="-50" cy="110" rx="14" ry="7" fill="none" stroke="#f59e0b" stroke-width="1.5" transform="rotate(-35 -50 110)"/>
            <text x="-40" y="90" fill="#fbbf24" font-size="10">橢圓偏振光 (Elliptically Polarized)</text>

            <rect x="30" y="10" width="130" height="40" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="95" y="28" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">檢偏器 + CCD 光譜儀</text>
            <text x="95" y="42" text-anchor="middle" fill="#94a3b8" font-size="9.5">測量 Ψ (振幅) 與 Δ (相位)</text>
          </g>

          <!-- 下方：擬合曲線說明 -->
          <g transform="translate(180, 320)">
            <rect x="0" y="0" width="440" height="60" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1"/>
            <text x="220" y="24" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">tan(Ψ)·e^(iΔ) = R_p / R_s (麥克斯韋電磁場嚴密擬合)</text>
            <text x="220" y="45" text-anchor="middle" fill="#cbd5e1" font-size="10">同時精準解算多層奈米薄膜物理厚度 (d) 與複數折射率 (n, k)</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch15_metric_film_thick}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">± 0.01 nm (0.1 Å)</div>
          <div class="eng-obj-metric-note">光波干涉相位超高靈敏度</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">折射率測量精度</div>
          <div class="eng-obj-metric-value">± 0.001</div>
          <div class="eng-obj-metric-note">即時反演材料化學計量比與緻密度</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">量測特性</div>
          <div class="eng-obj-metric-value">100% 非破壞性</div>
          <div class="eng-obj-metric-note">晶圓量測完畢後可直接進入下一站繼續加工</div>
        </div>
      `;

      footerNote = t.ch15_ellipsometry_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh15Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 15</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh15Title">${t.ch15_title}</h2>
          <p class="eng-obj-subtitle">${t.ch15_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'cdsem' ? 'is-active' : ''}" data-tab="cdsem">${t.ch15_tab_cdsem}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'optical' ? 'is-active' : ''}" data-tab="optical">${t.ch15_tab_optical}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'ellipsometry' ? 'is-active' : ''}" data-tab="ellipsometry">${t.ch15_tab_ellipsometry}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'In-Line & 3D Inspection Clauses' : '在線與 3D 無損量測條例 (Metrology)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'CD-SEM/OCD · E-Beam VC · C-SAM/CT' : 'CD-SEM/OCD · E-Beam VC · C-SAM/CT'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'CD-SEM/OCD/CD-SAXS, BBP/E-Beam VC, 3D C-SAM acoustic & 3D X-Ray CT' : 'CD-SEM/OCD/CD-SAXS、明暗場與電壓對比、3D 封裝 C-SAM 超音波與 X-Ray CT'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Ellipsometry, Rayleigh d⁶/λ⁴ & C-SAM Law' : '橢偏偏振與 C-SAM 聲阻抗律 (Metrology Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'ρ = tanΨ·e^(iΔ) · R_ac = (Z2-Z1)/(Z2+Z1)' : 'ρ = tanΨ·e^(iΔ) · R_ac = (Z2-Z1)/(Z2+Z1)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Sub-Å film resolution, 99.99% C-SAM void reflection & P/T ≤ 10%' : '次埃級膜厚解析、3D C-SAM 氣泡 99.99% 反射與 P/T Ratio ≤ 10%'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'SEM Shrinkage · OCD GOF · C-SAM Edge' : 'SEM Shrinkage · OCD GOF · C-SAM Edge'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Compensates e-beam resist shrinkage, OCD cross-correlation & C-SAM edge shadow' : '補償電子束光阻萎縮、以混合量測前饋打破 OCD 耦合失真並結合紅外線補盲區'}</div>
          </div>
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `, t);

    container.querySelectorAll('[data-tab]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    const energySlider = container.querySelector('#ch15EnergySlider');
    if (energySlider) {
      bindEngineeringEvent(energySlider, 'input', (e) => {
        landingEnergy = parseInt(e.target.value, 10);
        update();
      });
    }

    const angleSlider = container.querySelector('#ch15AngleSlider');
    if (angleSlider) {
      bindEngineeringEvent(angleSlider, 'input', (e) => {
        sidewallAngle = parseFloat(e.target.value);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 14. Ch 16 晶圓缺陷圖譜空間分佈、雙束 FIB 與 HR-TEM 結晶分析模型 (Yield & FA)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderMetrologyInspectionObject as render };
