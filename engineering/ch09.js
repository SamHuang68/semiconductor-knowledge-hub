import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderWetCleanObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'rca'; // 'rca' | 'megasonic' | 'marangoni'
  let acousticFreq = 1.0; // MHz (0.05 ~ 2.00 MHz)
  let particleSize = 30; // nm (15 ~ 150 nm)

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    let controlsHtml = '';

    // 兆聲波連續物理動力學計算
    const nu = 0.893e-6; // 超純水運動黏滯度 (m²/s @ 25°C)
    const freqHz = acousticFreq * 1e6;
    const deltaAcMeters = Math.sqrt(nu / (Math.PI * freqHz));
    const deltaAcUm = deltaAcMeters * 1e6; // 聲學邊界層厚度 (µm)

    // 凡得瓦爾吸附力 F_vdw = (A_H * d_p) / (12 * z_0²)
    const dpMeters = particleSize * 1e-9;
    const z0 = 0.4e-9; // 0.4 nm 吸附平衡間距
    const AH = 1.0e-19; // Hamaker 常數 (J)
    const fVdwNewtons = (AH * dpMeters) / (12 * z0 * z0);
    const fVdwNn = fVdwNewtons * 1e9; // 轉換為 nN

    // 聲微流剪切曳力 F_drag ∝ d_p * (0.533 / δ_ac)^1.85
    // 基準常數：在 f = 1.0 MHz (δ_ac ≈ 0.533 µm), dp = 30nm 時 F_drag ≈ 2.85 nN
    const fDragNn = 2.85 * (particleSize / 30) * Math.pow(0.533 / deltaAcUm, 1.85);

    // 剝離比 Ratio = F_drag / F_vdw
    const removalRatio = fDragNn / fVdwNn;

    // 清除率 PRE (%)
    const prePercent = Math.min(99.9, Math.max(8.0, 100 / (1 + Math.exp(-4.5 * (removalRatio - 0.95)))));

    // 空化破壞模式判定
    const isUltrasound = acousticFreq < 0.40;
    const isSafeMegasonic = acousticFreq >= 0.80;
    let cavStatus = '';
    let cavColor = '';
    if (isUltrasound) {
      cavStatus = lang === 'en' ? '⚠️ Destructive Transient Cavitation (>500 MPa Shock)' : '⚠️ 瞬態劇烈空化 (>500 MPa 崩塌衝擊，毀損 GAA 結構)';
      cavColor = '#ef4444';
    } else if (isSafeMegasonic) {
      cavStatus = lang === 'en' ? 'Controlled microstreaming (teaching-model regime)' : '受控聲微流（教學模型區間）';
      cavColor = '#10b981';
    } else {
      cavStatus = lang === 'en' ? '⚡ Acoustic Transition Mode (Mild Oscillatory Stress)' : '⚡ 聲學過渡震盪模式 (微空化剪切震盪)';
      cavColor = '#f59e0b';
    }

    if (activeTab === 'megasonic') {
      controlsHtml = `
        <div class="ch09-acoustic-controls" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 10px; padding: 12px; background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px solid rgba(56, 189, 248, 0.2);">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch09_freq_slider}</span>
              <span style="color: #38bdf8; font-weight: 750; font-family: monospace;">${acousticFreq.toFixed(2)} MHz</span>
            </div>
            <input type="range" id="ch09FreqSlider" min="0.05" max="2.00" step="0.05" value="${acousticFreq}" style="width: 100%; accent-color: #0ea5e9; cursor: pointer;">
            <div class="ch09-control-ticks" style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>${lang === 'en' ? "50 kHz (ultrasonic)" : "50 kHz (超音波)"}</span>
              <span>${lang === 'en' ? "1.0 MHz (standard megasonic)" : "1.0 MHz (兆聲波標準)"}</span>
              <span>${lang === 'en' ? "2.0 MHz (ultrahigh frequency)" : "2.0 MHz (超高頻)"}</span>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch09_size_slider}</span>
              <span style="color: #f59e0b; font-weight: 750; font-family: monospace;">${particleSize} nm</span>
            </div>
            <input type="range" id="ch09SizeSlider" min="15" max="150" step="5" value="${particleSize}" style="width: 100%; accent-color: #f59e0b; cursor: pointer;">
            <div class="ch09-control-ticks" style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>${lang === 'en' ? "15 nm (advanced-node particles)" : "15 nm (先進節點微粒)"}</span>
              <span>60 nm</span>
              <span>${lang === 'en' ? "150 nm (submicron contaminants)" : "150 nm (次微米雜質)"}</span>
            </div>
          </div>
        </div>
      `;
    }

    if (activeTab === 'rca') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RCA Cleans Chemistry Mechanism">
          <!-- 背景三區域劃分 -->
          <rect x="20" y="20" width="240" height="370" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <rect x="280" y="20" width="240" height="370" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
          <rect x="540" y="20" width="240" height="370" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>

          <!-- 區域 1: SC-1 (RCA-1) 鹼性去微粒 -->
          <g transform="translate(30, 30)">
            <text x="110" y="25" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${lang === 'en' ? "1. SC-1 (RCA-1 clean)" : "1. SC-1 (RCA-1 清洗)"}</text>
            <text x="110" y="45" text-anchor="middle" fill="#94a3b8" font-size="10.5">NH₄OH : H₂O₂ : H₂O @ 70°C</text>

            <!-- 晶圓矽基板 -->
            <rect x="10" y="230" width="200" height="40" fill="#334155" rx="3"/>
            <text x="110" y="255" text-anchor="middle" fill="#cbd5e1" font-size="11">${lang === 'en' ? svgTextLines("Si substrate\nNegative charge: ζ ≈ -40mV", 110, 248, 14) : "Si 基底 (帶負電 ζ ≈ -40mV)"}</text>

            <!-- 表面微蝕刻氧化層與 Zeta 電位排斥機制 -->
            <rect x="10" y="215" width="200" height="15" fill="#38bdf8" opacity="0.3"/>
            <text x="110" y="205" text-anchor="middle" fill="#38bdf8" font-size="10">${lang === 'en' ? "Micro-etch removes oxide (~0.5 nm)" : "微蝕刻脫落氧化層 (~0.5 nm)"}</text>

            <!-- 漂浮顆粒與排斥電場 -->
            <circle cx="110" cy="120" r="24" fill="#f87171" stroke="#ffffff" stroke-width="1.5"/>
            <text x="110" y="125" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">${lang === 'en' ? svgTextLines("Particle\n(-)", 110, 120, 12) : "微粒 (-)"}</text>
            <!-- 負電排斥箭頭 (Repulsion) -->
            <path d="M 110,150 L 110,190" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)"/>
            <text x="110" y="175" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">${lang === 'en' ? "⇡ Electrostatic repulsion ⇣" : "⇡ 靜電排斥力 ⇣"}</text>
            <text x="110" y="320" text-anchor="middle" fill="#38bdf8" font-size="10.5">${lang === 'en' ? "Removes organics and submicron particles" : "去除有機物與次微米微粒"}</text>
          </g>

          <!-- 區域 2: DHF 稀氫氟酸洗去原生氧化層 -->
          <g transform="translate(290, 30)">
            <text x="110" y="25" text-anchor="middle" fill="#34d399" font-size="13" font-weight="750">${lang === 'en' ? "2. DHF (dilute HF dip)" : "2. DHF 稀氫氟酸浸泡"}</text>
            <text x="110" y="45" text-anchor="middle" fill="#94a3b8" font-size="10.5">HF : H₂O (1:50 ~ 1:100)</text>

            <!-- 晶圓矽基板 -->
            <rect x="10" y="230" width="200" height="40" fill="#334155" rx="3"/>
            <text x="110" y="255" text-anchor="middle" fill="#cbd5e1" font-size="11">${lang === 'en' ? "Si substrate (Si-H passivation)" : "Si 基底 (氫鍵鈍化 Si-H)"}</text>

            <!-- SiO2 溶解消失動態 -->
            <g transform="translate(20, 140)">
              <text x="100" y="20" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">SiO₂ + 6HF → H₂SiF₆ + 2H₂O</text>
              <text x="100" y="45" text-anchor="middle" fill="#94a3b8" font-size="10">${lang === 'en' ? "Chemical oxide dissolves rapidly" : "化學氧化層快速被溶解咬除"}</text>
              <line x1="20" y1="65" x2="180" y2="65" stroke="#10b981" stroke-width="2" stroke-dasharray="4 3"/>
              <text x="100" y="85" text-anchor="middle" fill="#34d399" font-size="11">${lang === 'en' ? "Forms a hydrophobic surface" : "形成疏水性 (Hydrophobic) 表面"}</text>
            </g>
            <text x="110" y="320" text-anchor="middle" fill="#34d399" font-size="10.5">${lang === 'en' ? "Removes residual impurities in the oxide" : "移除氧化層中之殘留雜質"}</text>
          </g>

          <!-- 區域 3: SC-2 (RCA-2) 酸性金屬離子錯化 -->
          <g transform="translate(550, 30)">
            <text x="110" y="25" text-anchor="middle" fill="#f59e0b" font-size="13" font-weight="750">${lang === 'en' ? "3. SC-2 (RCA-2 clean)" : "3. SC-2 (RCA-2 清洗)"}</text>
            <text x="110" y="45" text-anchor="middle" fill="#94a3b8" font-size="10.5">HCl : H₂O₂ : H₂O @ 70°C</text>

            <!-- 晶圓矽基板 -->
            <rect x="10" y="230" width="200" height="40" fill="#334155" rx="3"/>
            <text x="110" y="255" text-anchor="middle" fill="#cbd5e1" font-size="11">${lang === 'en' ? svgTextLines("Si substrate:\nclean passivating oxide", 110, 248, 14) : "Si 基底 (生成潔淨鈍化氧化膜)"}</text>

            <!-- 金屬離子螯合絡合物反應 -->
            <g transform="translate(20, 110)">
              <circle cx="40" cy="30" r="16" fill="#e11d48"/>
              <text x="40" y="34" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">Fe³⁺</text>
              <circle cx="160" cy="30" r="16" fill="#e11d48"/>
              <text x="160" y="34" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">Cu²⁺</text>

              <path d="M 60,30 L 140,30" stroke="#f59e0b" stroke-width="2"/>
              <text x="100" y="24" text-anchor="middle" fill="#fbbf24" font-size="10">+ 6Cl⁻</text>
              <text x="100" y="70" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">${lang === 'en' ? svgTextLines("Soluble chloride complex\n[FeCl₆]³⁻", 100, 62, 14) : "[FeCl₆]³⁻ 可溶性氯錯離子"}</text>
              <text x="100" y="90" text-anchor="middle" fill="#94a3b8" font-size="10">${lang === 'en' ? "Stays dissolved; no redeposition" : "永遠溶入清洗液，不再沉積"}</text>
            </g>
            <text x="110" y="320" text-anchor="middle" fill="#f59e0b" font-size="10.5">${lang === 'en' ? "Metal residue &lt; 1E10 atoms/cm²" : "金屬離子殘留 &lt; 1E10 atoms/cm²"}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch09_metric_pre}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 99.8%</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "SC-1: like negative charges repel particles from the surface" : "SC-1 表面同極性負電排斥脫附"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch09_metric_metal}</div>
          <div class="eng-obj-metric-value">&lt; 1×10¹⁰ atoms/cm²</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "SC-2: hydrochloric acid complexes Fe/Cu heavy-metal ions" : "SC-2 鹽酸螯合鐵/銅重金屬離子"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Zeta potential (ζ-potential)" : "Zeta 電位 (ζ-potential)"}</div>
          <div class="eng-obj-metric-value">-40 ~ -50 mV</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Strong Coulomb repulsion prevents particle reattachment" : "強烈庫侖排斥杜絕顆粒二次吸附"}</div>
        </div>
      `;

      footerNote = lang === 'en' ? 'SC-1 (NH₄OH/H₂O₂/H₂O @ 70°C) micro-etches the silicon surface oxide and gives particles and wafer surfaces a strong negative zeta potential. Electrostatic repulsion prevents particle reattachment. DHF removes the chemical oxide. SC-2 (HCl/H₂O₂/H₂O @ 70°C) converts heavy-metal ions such as Fe and Cu into soluble chloride complexes to dissolve metal contamination.' : t.ch09_rca_desc;
    } else if (activeTab === 'megasonic') {
      const blHeight = Math.min(85, Math.max(12, deltaAcUm * 30));
      const pRadius = Math.max(5, Math.min(16, particleSize / 7));
      const isDetached = removalRatio >= 1.0;

      viewportHtml = `
        <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Megasonic Acoustic Boundary Layer and Particle Stripping Physics">
          <!-- 上方兆聲波石英發振器 (Megasonic Transducer Array) -->
          <g transform="translate(80, 25)">
            <rect x="0" y="0" width="640" height="38" rx="5" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
            <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="750">
              ${lang === 'en' ? "Megasonic piezoelectric transducer array (f =" : "兆聲波壓電換能器陣列 (Megasonic Transducer: f ="} ${acousticFreq.toFixed(2)} MHz)
            </text>
          </g>

          <!-- 高頻縱波聲壓震盪場 (Acoustic Wavefronts) 隨頻率密集化 -->
          <g transform="translate(90, 75)">
            <g class="anim-acoustic">
            ${Array.from({ length: 5 }, (_, i) => {
              const yPos = i * 16 + 10;
              return `<line x1="10" y1="${yPos}" x2="610" y2="${yPos}" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="8 4" opacity="${0.9 - i * 0.12}"/>`;
            }).join('')}
            </g>
            <text x="310" y="105" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="600">
              ${lang === 'en' ? svgTextLines('High-frequency longitudinal sound-pressure field\nAcoustic microstreaming drag: F_drag = ' + fDragNn.toFixed(2) + ' nN', 310, 88) : `高頻縱波聲壓場 · 聲微流剪切 (Acoustic Microstreaming Drag: F_drag = ${fDragNn.toFixed(2)} nN)`}
            </text>
          </g>

          <!-- 下方晶圓表面邊界層微觀物理剖面 -->
          <g transform="translate(80, 190)">
            <!-- 背景水動力層容器 -->
            <rect x="0" y="0" width="640" height="265" fill="#0b1329" stroke="#334155" stroke-width="1.5" rx="5"/>

            <!-- 聲學邊界層 δ_ac 動態高度矩形 -->
            <rect x="20" y="${160 - blHeight}" width="600" height="${blHeight}" fill="#0284c7" opacity="0.32" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 2"/>
            <text x="40" y="205" fill="#38bdf8" font-size="11" font-weight="700">
              ${lang === 'en' ? "Acoustic boundary-layer thickness:" : "聲學邊界層厚度:"} δ_ac = √(ν / πf) = ${deltaAcUm.toFixed(3)} µm ${lang === 'en' ? (acousticFreq >= 0.8 ? '(compressed >75%)' : '(layer too thick)') : (acousticFreq >= 0.8 ? '(壓縮 >75%)' : '(邊界層過厚)')}
            </text>

            <!-- 晶圓矽基板 (Wafer Substrate) -->
            <rect x="20" y="160" width="600" height="25" fill="#334155" stroke="#64748b" stroke-width="1.5" rx="3"/>
            <text x="320" y="177" text-anchor="middle" fill="#cbd5e1" font-size="11" font-weight="700">${lang === 'en' ? "Wafer surface · Si substrate" : "晶圓矽表面 (Wafer Surface · Si Substrate)"}</text>

            <!-- 微粒物理動力學行為動態渲染 -->
            ${isDetached ? `
              <!-- 成功脫附：微粒向上剝離飛出 -->
              <g transform="translate(320, ${160 - blHeight - 25})" class="anim-particle-lift">
                <circle cx="0" cy="0" r="${pRadius}" fill="#34d399" stroke="#ffffff" stroke-width="2"/>
                <text x="-40" y="4" text-anchor="end" fill="#e2e8f0" font-size="9" font-weight="800">${particleSize}nm</text>

                <!-- 向上剪切曳力向量 F_drag -->
                <path d="M 0,-${pRadius} L 30,-${pRadius + 35}" stroke="#34d399" stroke-width="2.5" marker-end="url(#arrow)"/>
                <text x="45" y="-${pRadius + 20}" fill="#34d399" font-size="11" font-weight="750">F_drag = ${fDragNn.toFixed(2)} nN ↗</text>

                <!-- 凡得瓦爾吸附力向下衰退向量 -->
                <path d="M 0,${pRadius} L 0,${pRadius + 16}" stroke="#f87171" stroke-width="1.5" stroke-dasharray="2 2"/>
                <text x="25" y="${pRadius + 12}" fill="#f87171" font-size="9.5">F_vdw = ${fVdwNn.toFixed(2)} nN</text>

              </g>
              <text x="320" y="232" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="750"><tspan x="320" y="232">${lang === 'en' ? "Particle overcomes adhesion and is swept away " : "微粒克服吸附脫附捲走 "}</tspan><tspan x="320" dy="18">(${lang === 'en' ? "Removal ratio:" : "剝離比:"} ${removalRatio.toFixed(2)}x · PRE: ${prePercent.toFixed(1)}%)</tspan></text>
            ` : `
              <!-- 未達剝離條件：微粒困於滯留死區 -->
              <g transform="translate(320, ${160 - pRadius})">
                <circle cx="0" cy="0" r="${pRadius}" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
                <text x="-40" y="4" text-anchor="end" fill="#ffffff" font-size="9" font-weight="800">${particleSize}nm</text>

                <!-- 向下凡得瓦爾力主導 -->
                <path d="M 0,${pRadius} L 0,${pRadius + 18}" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrow)"/>
                <path d="M -35,-43 L -15,-43 L 0,${pRadius + 18}" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="3 2"/>
                <text x="-45" y="-40" text-anchor="end" fill="#ef4444" font-size="10.5" font-weight="700">F_vdw = ${fVdwNn.toFixed(2)} nN ${lang === 'en' ? "(strong adhesion)" : "(強吸附)"}</text>

                <!-- 微弱剪切力 -->
                <path d="M 0,-${pRadius} L 15,-${pRadius + 10}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2 2"/>
                <text x="25" y="-${pRadius}" fill="#94a3b8" font-size="9.5">F_drag = ${fDragNn.toFixed(2)} nN ${lang === 'en' ? "(trapped)" : "(受困)"}</text>

              </g>
              <text x="320" y="232" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="750"><tspan x="320" y="232">${lang === 'en' ? "Particle is trapped in the stagnant layer " : "微粒深陷死區停滯層無法沖刷 "}</tspan><tspan x="320" dy="18">(${lang === 'en' ? "Removal ratio:" : "剝離比:"} ${removalRatio.toFixed(2)}x &lt; 1.0 · PRE: ${prePercent.toFixed(1)}%)</tspan></text>
            `}

            <!-- 物理定律標籤浮水印 -->
            <rect x="20" y="15" width="200" height="42" rx="4" fill="#0f172a" opacity="0.85" stroke="#38bdf8" stroke-width="1"/>
            <text x="120" y="32" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700">δ_ac = √(ν / πf)</text>
            <text x="120" y="47" text-anchor="middle" fill="#cbd5e1" font-size="9.5">F_vdw = (A_H · d_p) / (12 z_0²)</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch09_delta_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark); font-family: monospace;">${deltaAcUm.toFixed(3)} µm</div>
          <div class="eng-obj-metric-note">δ_ac = √(ν / πf)${lang === 'en' ? " · Compression " : " · 壓縮率 "}${(Math.max(0, (1 - deltaAcUm / 2.39) * 100)).toFixed(0)}%</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch09_ratio_label} & PRE</div>
          <div class="eng-obj-metric-value" style="color: ${removalRatio >= 1.0 ? 'var(--semi-teal)' : '#ef4444'}; font-family: monospace;">
            ${removalRatio.toFixed(2)}x (${prePercent.toFixed(1)}%)
          </div>
          <div class="eng-obj-metric-note">F_drag: ${fDragNn.toFixed(2)} nN / F_vdw: ${fVdwNn.toFixed(2)} nN</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Nanostructure cavitation state" : "奈米結構空化狀態"}</div>
          <div class="eng-obj-metric-value ch09-cavitation-status" data-status="${isUltrasound ? 'destructive' : isSafeMegasonic ? 'controlled' : 'transition'}" style="color: ${cavColor}; font-size: 13.5px; font-weight: 750;">${cavStatus}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? (isSafeMegasonic ? 'Frequency selects the teaching-model regime; see the calculated PRE in the adjacent card.' : 'Low-frequency cavitation collapse pressure damages fins') : (isSafeMegasonic ? '頻率用於選擇教學模型區間；PRE 請見旁側計算欄。' : '低頻空化崩塌壓強破壞鰭片')}</div>
        </div>
      `;

      footerNote = t.ch09_megasonic_desc;
    } else if (activeTab === 'marangoni') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Marangoni Surface Tension Gradient Drying">
          <!-- 水槽槽體 (UPW Bath) -->
          <rect x="80" y="180" width="640" height="210" rx="4" fill="#0284c7" opacity="0.25" stroke="#0ea5e9" stroke-width="2"/>
          <text x="400" y="360" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">${lang === 'en' ? "Ultrapure water (UPW) bath: surface tension γ_high ≈ 72 mN/m" : "超純水槽 (Ultrapure Water UPW Bath: 表面張力 γ_high ≈ 72 mN/m)"}</text>

          <!-- 頂部注入 IPA 蒸氣 (IPA Vapor Injection) -->
          <g transform="translate(180, 30)">
            <rect x="0" y="0" width="440" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="220" y="20" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">${lang === 'en' ? "Inject IPA (isopropanol vapor) + N₂ carrier gas" : "IPA (異丙醇蒸氣) + N₂ 載氣噴入"}</text>
            <!-- IPA 氣流向下流動 -->
            <path d="M 120,35 L 120,75" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3"/>
            <path d="M 220,35 L 220,75" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3"/>
            <path d="M 320,35 L 320,75" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3"/>
          </g>

          <!-- 緩慢向上提拉的晶圓 (Wafer Slow Pulling Up) -->
          <g transform="translate(360, 60)">
            <rect x="0" y="0" width="80" height="260" rx="3" fill="#64748b" stroke="#cbd5e1" stroke-width="2"/>
            <text x="40" y="100" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700" transform="rotate(-90 40 100)">${lang === 'en' ? "Wafer rises slowly ↑ (1-2 mm/s)" : "晶圓緩慢向上提拉 ↑ (1-2 mm/s)"}</text>
            <path d="M -15,57 L 0,57" fill="none" stroke="#34d399" stroke-width="1"/>
            <text x="-25" y="60" text-anchor="end" fill="#34d399" font-size="10.5">${lang === 'en' ? "100% clean and dry" : "100% 潔淨乾爽"}</text>
          </g>

          <!-- 彎月面 (Meniscus) 表面張力差驅動微觀流動 (Marangoni Effect) -->
          <g transform="translate(440, 150)">
            <g class="anim-liquid-flow">
            <!-- 彎月水膜弧線 -->
            <path d="M 0,20 Q 30,30 60,60" fill="none" stroke="#38bdf8" stroke-width="4"/>
            </g>
            <!-- IPA 融入使得頂部表面張力低 -->
            <text x="75" y="25" fill="#fbbf24" font-size="11" font-weight="700">${lang === 'en' ? "Top: low surface tension (γ_low ≈ 22 mN/m)" : "頂部低表面張力 (γ_low ≈ 22 mN/m)"}</text>
            <!-- 底部純水表面張力高 -->
            <text x="75" y="70" fill="#38bdf8" font-size="11" font-weight="700">${lang === 'en' ? "Bath: high surface tension (γ_high ≈ 72 mN/m)" : "槽內高表面張力 (γ_high ≈ 72 mN/m)"}</text>
            <!-- Marangoni 向下拉力箭頭 -->
            <g class="anim-liquid-flow">
              <path d="M 25,25 L 45,55" stroke="#10b981" stroke-width="3" marker-end="url(#arrow)"/>
            </g>
            <text x="75" y="48" fill="#34d399" font-size="11.5" font-weight="750">${lang === 'en' ? "⇓ Marangoni surface-tension-gradient force" : "⇓ Marangoni 表面張力梯度拉回力"}</text>
            <text x="75" y="95" fill="#cbd5e1" font-size="10">${lang === 'en' ? svgTextLines("Water film returns down to the bath;\nno droplets remain to evaporate", 75, 95, 17) : "水膜自發被向下吸回水槽，無水滴殘留蒸發"}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch09_metric_watermark}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${lang === 'en' ? "0 Defects (zero watermarks)" : "0 Defects (零水痕)"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Prevents silica residue left by evaporating droplets" : "杜絕水滴蒸發析出二氧化矽殘斑"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Surface tension difference (Δγ)" : "表面張力梯度差 (Δγ)"}</div>
          <div class="eng-obj-metric-value">~ 50 mN/m</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Strong capillary force pulls the liquid film downward" : "強大毛細收縮力牽引液膜下洩"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Wafer withdrawal speed" : "晶圓提拉速率"}</div>
          <div class="eng-obj-metric-value">1.0 ~ 2.0 mm/s</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Slow, constant-speed withdrawal forms a continuous, uniform meniscus" : "慢速等速脫附形成連續均勻彎月面"}</div>
        </div>
      `;

      footerNote = t.ch09_marangoni_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh09Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 09</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh09Title">${t.ch09_title}</h2>
          <p class="eng-obj-subtitle">${t.ch09_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'rca' ? 'is-active' : ''}" data-tab="rca">${t.ch09_tab_rca}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'megasonic' ? 'is-active' : ''}" data-tab="megasonic">${t.ch09_tab_megasonic}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'marangoni' ? 'is-active' : ''}" data-tab="marangoni">${t.ch09_tab_marangoni}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Wet/Dry Clean & SCCO₂ Clauses' : '濕／乾式清洗與超臨界乾燥條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'RCA · DIO₃ · Siconi · SCCO₂ Dry' : 'RCA · DIO₃ · Siconi · SCCO₂ Dry'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'RCA + 1MHz megasonic, Siconi vapor clean, Marangoni & Supercritical CO₂ dry' : 'RCA 四步 + 1MHz 兆聲波、Siconi 氣相除氧化層、Marangoni 與超臨界 CO₂ 零張力乾燥'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'DLVO, Megasonic & Laplace Law' : 'DLVO 排斥與零毛細張力律 (Clean Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'δ_ac = √(2ν/ω) · F_cap ∝ γ·(H/S)² = 0' : 'δ_ac = √(2ν/ω) · F_cap ∝ γ·(H/S)² = 0'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'SC-1 Zeta repulsion, sub-µm acoustic layer & γ=0 SCCO₂ drying' : 'SC-1 Zeta 電位排斥、兆聲波次微米邊界層與 SCCO₂ 零毛細力乾燥'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Fin Stiction · Watermark · Galvanic Pit' : 'Fin Stiction · Watermark · Galvanic Pit'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Prevents capillary fin collapse via scCO₂, silica watermarks & galvanic pitting' : '以超臨界 scCO₂ 消除毛細倒塌、除氧氮封防矽酸水痕與緩蝕劑防電偶掏空'}</div>
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

    const freqSlider = container.querySelector('#ch09FreqSlider');
    if (freqSlider) {
      bindEngineeringEvent(freqSlider, 'input', (e) => {
        acousticFreq = parseFloat(e.target.value);
        update();
      });
    }

    const sizeSlider = container.querySelector('#ch09SizeSlider');
    if (sizeSlider) {
      bindEngineeringEvent(sizeSlider, 'input', (e) => {
        particleSize = parseInt(e.target.value, 10);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 11. Ch 11 CMOS 完整整合剖面與步進模型 (Full CMOS Integrated Stepper Model)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderWetCleanObject as render };
