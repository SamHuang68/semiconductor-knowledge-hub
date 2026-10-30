import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderIonImplantObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'beamline'; // 'beamline' | 'anneal' | 'channeling'
  let activeSpecies = 'b'; // 'b' | 'p' | 'as'
  let energyKeV = 40; // 10 ~ 150 keV
  let doseExponent = 15.0; // 13.0 ~ 16.0 (Φ = 10^doseExponent cm^-2)

  const SPECIES_CONFIG = {
    b: { name: (lang === 'en' ? "¹¹B⁺ (Boron)" : "¹¹B⁺ (硼)"), mass: 11, color: '#38bdf8', rpCoeff: 3.2, dRpCoeff: 0.38, dRpBase: 12 },
    p: { name: (lang === 'en' ? "³¹P⁺ (Phosphorus)" : "³¹P⁺ (磷)"), mass: 31, color: '#f59e0b', rpCoeff: 1.35, dRpCoeff: 0.35, dRpBase: 6 },
    as: { name: (lang === 'en' ? "⁷⁵As⁺ (Arsenic)" : "⁷⁵As⁺ (砷)"), mass: 75, color: '#10b981', rpCoeff: 0.75, dRpCoeff: 0.32, dRpBase: 4 }
  };

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    const cur = SPECIES_CONFIG[activeSpecies];

    // LSS 理論動態計算
    const rp = Math.round(cur.rpCoeff * Math.pow(energyKeV, 0.95)); // nm
    const deltaRp = Math.round(cur.dRpCoeff * rp + cur.dRpBase);   // nm
    const doseVal = Math.pow(10, doseExponent); // cm^-2
    // C_max = Φ / (sqrt(2*pi) * ΔRp * 1e-7)
    const cMax = doseVal / (Math.sqrt(2 * Math.PI) * (deltaRp * 1e-7));
    const cMaxExp = Math.floor(Math.log10(cMax));
    const cMaxMantissa = (cMax / Math.pow(10, cMaxExp)).toFixed(2);
    const doseStr = doseExponent % 1 === 0 ? `1.0 × 10¹⁵` : `${Math.pow(10, doseExponent - Math.floor(doseExponent)).toFixed(1)} × 10${Math.floor(doseExponent)}`;
    const doseFormatted = `${Math.pow(10, doseExponent - Math.floor(doseExponent)).toFixed(1)} × 10${Math.floor(doseExponent)} cm⁻²`;

    if (activeTab === 'beamline') {
      controlsHtml = `
        <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeSpecies === 'b' ? 'is-active' : ''}" data-species="b">${t.ch07_species_b}</button>
            <button type="button" class="eng-obj-tab ${activeSpecies === 'p' ? 'is-active' : ''}" data-species="p">${t.ch07_species_p}</button>
            <button type="button" class="eng-obj-tab ${activeSpecies === 'as' ? 'is-active' : ''}" data-species="as">${t.ch07_species_as}</button>
          </div>
          <div class="eng-obj-slider-cluster">
            <div class="eng-obj-slider-unit">
              <div class="eng-obj-slider-header">
                <span class="eng-obj-slider-label">${t.ch07_energy_slider}</span>
                <span class="eng-obj-slider-val" id="energyVal">${energyKeV} keV</span>
              </div>
              <input type="range" class="eng-obj-slider" id="energySlider" min="10" max="150" step="5" value="${energyKeV}" aria-label="${lang === 'en' ? "Beam Energy" : "佈植能量"}">
            </div>
            <div class="eng-obj-slider-unit">
              <div class="eng-obj-slider-header">
                <span class="eng-obj-slider-label">${t.ch07_dose_slider}</span>
                <span class="eng-obj-slider-val" id="doseVal">10^${doseExponent.toFixed(1)} cm⁻²</span>
              </div>
              <input type="range" class="eng-obj-slider" id="doseSlider" min="13.0" max="16.0" step="0.2" value="${doseExponent}" aria-label="${lang === 'en' ? "Implant Dose" : "佈植劑量"}">
            </div>
          </div>
        </div>
      `;

      // 產生 LSS 高斯曲線 Path 數據 (深度 0 ~ 300 nm 對應 x 軸 0 ~ 130 px)
      const graphWidth = 120;
      const graphHeight = 85;
      const maxDepth = 320; // nm
      const samplePoints = [];
      for (let depth = 0; depth <= maxDepth; depth += 8) {
        const xPos = (depth / maxDepth) * graphWidth;
        const normDist = (depth - rp) / deltaRp;
        const concRelative = Math.exp(-0.5 * normDist * normDist);
        const yPos = graphHeight - concRelative * (graphHeight - 10);
        samplePoints.push(`${xPos.toFixed(1)},${yPos.toFixed(1)}`);
      }
      const gaussianPath = `M 0,${graphHeight} L ` + samplePoints.join(' L ') + ` L ${graphWidth},${graphHeight} Z`;

      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${lang === 'en' ? "Ion Implanter Beamline Live Engine" : "離子佈植束流路徑教學模型"}">
          <!-- 1. 離子源 (Ion Source) -->
          <rect x="35" y="45" width="115" height="70" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <circle cx="92" cy="80" r="16" fill="rgba(56, 189, 248, 0.4)" filter="drop-shadow(0 0 8px #38bdf8)" class="anim-plasma"/>
          <text x="92" y="65" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${lang === 'en' ? "Ion source" : "離子源室"}</text>
          <text x="92" y="105" text-anchor="middle" fill="#94a3b8" font-size="9.5">${lang === 'en' ? "Arc-discharge plasma" : "電弧放電電漿"}</text>

          <!-- 取出電極與初始離子束 -->
          <line x1="150" y1="80" x2="215" y2="80" stroke="${cur.color}" stroke-width="3" stroke-dasharray="6 3" class="anim-beam"/>

          <!-- 2. 90° 質量分析磁鐵 (Mass Analyzer Magnet) -->
          <path d="M 215,35 L 340,35 A 150 150 0 0 1 340,245 L 215,245 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" opacity="0.85"/>
          <text x="270" y="130" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="700">${lang === 'en' ? "90° analyzer magnet" : "90° 分析磁鐵"}</text>
          <text x="270" y="148" text-anchor="middle" fill="#94a3b8" font-size="10">r = mv / qB</text>

          <!-- 磁場內偏轉離子軌跡 (B vs P vs As) -->
          <path d="M 215,80 Q 275,80 275,215" fill="none" stroke="#38bdf8" stroke-width="${activeSpecies === 'b' ? 3.5 : 1.2}" stroke-dasharray="${activeSpecies === 'b' ? 'none' : '3 3'}" opacity="${activeSpecies === 'b' ? 1 : 0.35}"/>
          <path d="M 215,80 Q 305,80 305,215" fill="none" stroke="#f59e0b" stroke-width="${activeSpecies === 'p' ? 3.5 : 1.2}" stroke-dasharray="${activeSpecies === 'p' ? 'none' : '3 3'}" opacity="${activeSpecies === 'p' ? 1 : 0.35}"/>
          <path d="M 215,80 Q 335,80 335,215" fill="none" stroke="#10b981" stroke-width="${activeSpecies === 'as' ? 3.5 : 1.2}" stroke-dasharray="${activeSpecies === 'as' ? 'none' : '3 3'}" opacity="${activeSpecies === 'as' ? 1 : 0.35}"/>

          <!-- 3. 質量分析狹縫 (Resolving Slit) -->
          <rect x="250" y="215" width="${activeSpecies === 'b' ? 16 : (activeSpecies === 'p' ? 46 : 76)}" height="10" fill="#64748b"/>
          <rect x="${activeSpecies === 'b' ? 284 : (activeSpecies === 'p' ? 314 : 344)}" y="215" width="80" height="10" fill="#64748b"/>
          <text x="390" y="223" fill="#e2e8f0" font-size="10.5">${lang === 'en' ? `Mass-resolving slit (${cur.name})` : `狹縫質量分離 (${cur.name})`}</text>

          <!-- 選中目標離子束向下進入加速管 -->
          <line x1="${activeSpecies === 'b' ? 275 : (activeSpecies === 'p' ? 305 : 335)}" y1="225" x2="440" y2="330" stroke="${cur.color}" stroke-width="3" stroke-dasharray="4 2" class="anim-beam"/>

          <!-- 4. 線性加速管 (Post-Acceleration Column) -->
          <g transform="translate(410, 280)">
            <rect x="0" y="0" width="120" height="75" rx="3" fill="#131e2b" stroke="#0284c7" stroke-width="1.2"/>
            <text x="60" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">${lang === 'en' ? "Acceleration column" : "高壓加速管"}</text>
            <text x="60" y="42" text-anchor="middle" fill="#94a3b8" font-size="9.5">${lang === 'en' ? `+${energyKeV} kV electrode` : `+${energyKeV} kV 加速極板`}</text>
            <line x1="15" y1="52" x2="105" y2="52" stroke="#64748b" stroke-width="3"/>
          </g>

          <!-- 離子束注入晶圓 -->
          <line x1="530" y1="315" x2="590" y2="315" stroke="${cur.color}" stroke-width="${2.5 + (energyKeV / 150) * 2}" stroke-dasharray="4 2"/>

          <!-- 5. 終端晶圓盤與 LSS 高斯深度分佈圖 -->
          <g transform="translate(580, 240)">
            <!-- 晶圓基座 -->
            <rect x="0" y="0" width="195" height="175" rx="4" fill="#0f172a" stroke="${cur.color}" stroke-width="1.5"/>
            <text x="97" y="22" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${lang === 'en' ? "Wafer section: LSS model" : "晶圓橫截面 LSS 分佈"}</text>
            
            <!-- 內嵌 LSS 高斯分佈微圖形 -->
            <g transform="translate(35, 45)">
              <!-- 背景與座標軸 -->
              <rect x="0" y="0" width="${graphWidth}" height="${graphHeight}" fill="#1e293b" rx="2"/>
              <line x1="0" y1="${graphHeight}" x2="${graphWidth}" y2="${graphHeight}" stroke="#64748b" stroke-width="1"/>
              
              <!-- 高斯曲線填充與路徑 -->
              <path d="${gaussianPath}" fill="${cur.color}" opacity="0.35"/>
              <path d="${gaussianPath}" fill="none" stroke="${cur.color}" stroke-width="2"/>
              
              <!-- Rp 深度標示線 -->
              <line x1="${(rp / maxDepth) * graphWidth}" y1="0" x2="${(rp / maxDepth) * graphWidth}" y2="${graphHeight}" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 2"/>
              <circle cx="${(rp / maxDepth) * graphWidth}" cy="${graphHeight - 75}" r="3" fill="#ffffff"/>
              
              <!-- 刻度文字 -->
              <text x="0" y="${graphHeight + 12}" fill="#94a3b8" font-size="9">${lang === 'en' ? "Surface 0" : "表面 0"}</text>
              <text x="${graphWidth}" y="${graphHeight + 12}" text-anchor="end" fill="#94a3b8" font-size="9">${maxDepth}nm</text>
              <text x="${(rp / maxDepth) * graphWidth}" y="${graphHeight - 60}" text-anchor="middle" fill="#ffffff" font-size="9.5" font-weight="700">Rp:${rp}nm</text>
            </g>

            <text x="97" y="160" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="700">${lang === 'en' ? "7° tilt: teaching example" : "7° 傾角：教學示例"}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch07_range_label}</div>
          <div class="eng-obj-metric-value" style="color: ${cur.color};">${rp} nm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? `Teaching range estimate (E = ${energyKeV} keV)` : `教學射程估計 (E = ${energyKeV} keV)`}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch07_straggle}</div>
          <div class="eng-obj-metric-value">±${deltaRp} nm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Gaussian standard deviation (ΔRp)" : "縱向高斯標準差 (Straggle ΔRp)"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch07_peak_conc}</div>
          <div class="eng-obj-metric-value" style="color: ${cMaxExp >= 20 ? '#ef4444' : 'var(--semi-teal)'}; font-size:16px;">${cMaxMantissa} × 10${cMaxExp} cm⁻³</div>
          <div class="eng-obj-metric-note">${cMaxExp >= 20 ? (lang === 'en' ? 'High-concentration model regime; activation requires process validation.' : '高濃度模型區間；活化須依製程驗證。') : (lang === 'en' ? 'Lower-concentration model regime; activation is not guaranteed.' : '較低濃度模型區間；不保證完全活化。')}</div>
        </div>
      `;

      footerNote = t.ch07_lss_desc;
    } else if (activeTab === 'anneal') {
      viewportHtml = `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${lang === 'en' ? "Lattice Anneal & Activation" : "晶格退火與活化示意"}">
          <!-- 左側：佈植後晶格損傷 (As-Implanted) -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="310" height="280" rx="4" fill="#131e2b" stroke="#ef4444"/>
            <text x="155" y="26" text-anchor="middle" fill="#ef4444" font-size="13" font-weight="700">${lang === 'en' ? "1. As-implanted damage example" : "1. 佈植後損傷示例 (As-Implanted)"}</text>
            <text x="155" y="46" text-anchor="middle" fill="#94a3b8" font-size="11">${lang === 'en' ? "Lattice damage; inactive dopants" : "晶格損傷 · 未活化摻質示意"}</text>

            <!-- 非晶混亂層 (Amorphized Layer) -->
            <rect x="25" y="70" width="260" height="75" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-dasharray="3 3"/>
            <text x="155" y="112" text-anchor="middle" fill="#ef4444" font-size="11.5" font-weight="700">${lang === 'en' ? svgTextLines("Damaged layer: vacancies / interstitials", 155, 112, 15) : "損傷層示意（空位與間隙原子）"}</text>

            <!-- 亂七八糟的原子點陣 -->
            <g fill="#94a3b8">
              <circle cx="50" cy="85" r="3"/><circle cx="90" cy="120" r="3"/><circle cx="140" cy="90" r="3"/>
              <circle cx="190" cy="125" r="3"/><circle cx="240" cy="85" r="3"/>
            </g>
            <!-- 未活化摻質 (紅點不在格位) -->
            <g fill="#f59e0b">
              <circle cx="80" cy="95" r="4"/><circle cx="170" cy="105" r="4"/><circle cx="220" cy="95" r="4"/>
            </g>

            <!-- 底層完整單晶矽 (Crystalline Si) -->
            <rect x="25" y="145" width="260" height="95" fill="#1e293b"/>
            <!-- 整齊晶格點 -->
            <g fill="#38bdf8">
              <circle cx="50" cy="170" r="3"/><circle cx="90" cy="170" r="3"/><circle cx="130" cy="170" r="3"/><circle cx="170" cy="170" r="3"/><circle cx="210" cy="170" r="3"/><circle cx="250" cy="170" r="3"/>
              <circle cx="50" cy="205" r="3"/><circle cx="90" cy="205" r="3"/><circle cx="130" cy="205" r="3"/><circle cx="170" cy="205" r="3"/><circle cx="210" cy="205" r="3"/><circle cx="250" cy="205" r="3"/>
            </g>
            <text x="155" y="225" text-anchor="middle" fill="#38bdf8" font-size="11">${lang === 'en' ? "Crystalline Si substrate" : "完整單晶矽底層 (Substrate)"}</text>
          </g>

          <!-- 右側：RTA 高溫退火後 (Post-Anneal 1050°C) -->
          <g transform="translate(430, 40)">
            <rect x="0" y="0" width="310" height="280" rx="4" fill="#131e2b" stroke="#10b981"/>
            <text x="155" y="26" text-anchor="middle" fill="#10b981" font-size="13" font-weight="700">${lang === 'en' ? "2. RTA example: 1050°C, 3 s" : "2. RTA 活化示例 (1050°C 3s)"}</text>
            <text x="155" y="46" text-anchor="middle" fill="#94a3b8" font-size="11">${lang === 'en' ? "Regrowth; activation example: >95%" : "再結晶 · 活化率示例 &gt;95%"}</text>

            <!-- 熱脈衝指示 -->
            <path d="M 30,65 Q 155,50 280,65" stroke="#f59e0b" stroke-width="2" class="anim-heat"/>

            <!-- 完整修復之整齊晶格 -->
            <rect x="25" y="70" width="260" height="170" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
            <g fill="#38bdf8">
              <circle cx="50" cy="95" r="3"/><circle cx="130" cy="95" r="3"/><circle cx="210" cy="95" r="3"/><circle cx="250" cy="95" r="3"/>
              <circle cx="50" cy="130" r="3"/><circle cx="90" cy="130" r="3"/><circle cx="170" cy="130" r="3"/><circle cx="250" cy="130" r="3"/>
              <circle cx="50" cy="165" r="3"/><circle cx="90" cy="165" r="3"/><circle cx="130" cy="165" r="3"/><circle cx="210" cy="165" r="3"/><circle cx="250" cy="165" r="3"/>
              <circle cx="50" cy="200" r="3"/><circle cx="90" cy="200" r="3"/><circle cx="130" cy="200" r="3"/><circle cx="170" cy="200" r="3"/><circle cx="210" cy="200" r="3"/><circle cx="250" cy="200" r="3"/>
            </g>
            <!-- 摻質原子成功取代格位 (Substitutional Sites) -->
            <g fill="#10b981">
              <circle cx="90" cy="95" r="4.5"/><circle cx="170" cy="95" r="4.5"/><circle cx="130" cy="130" r="4.5"/><circle cx="210" cy="130" r="4.5"/>
            </g>
            <text x="155" y="115" text-anchor="middle" fill="#10b981" font-size="11.5" font-weight="700">${lang === 'en' ? svgTextLines("Substitutional dopants\nprovide free carriers", 155, 115, 15) : "摻質進入矽晶格格位提供自由載子"}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Illustrative activation" : "電性活化率示例 (Activation)"}</div>
          <div class="eng-obj-metric-value" style="color: #10b981;">&gt; 95%</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Teaching example, not a guaranteed activation rate." : "教學示例，非活化率保證。"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Illustrative thermal budget" : "熱預算示例 (Thermal Budget)"}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "1050°C · 1-3 s" : "1050°C · 1-3 秒"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Anneal conditions must balance activation and diffusion." : "退火條件須兼顧活化與擴散控制。"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Illustrative junction depth (Xj)" : "接面深度示例 (Junction Depth Xj)"}</div>
          <div class="eng-obj-metric-value">&lt; 20 nm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "LSA teaching example; actual junction depth requires validation." : "雷射尖峰退火 (LSA) 教學示例；實際接面深度須驗證。"}</div>
        </div>
      `;

      footerNote = t.ch07_anneal_desc;
    } else {
      // Channeling
      controlsHtml = '';
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${lang === 'en' ? "Channeling Effect" : "通道效應示意"}">
          <!-- 0° 垂直入射：通道效應 (嚴重尾端) -->
          <g transform="translate(80, 40)">
            <rect x="0" y="0" width="280" height="260" rx="4" fill="#131e2b" stroke="#ef4444"/>
            <text x="140" y="26" text-anchor="middle" fill="#ef4444" font-size="12.5" font-weight="700">${lang === 'en' ? "0° incidence: channeling example" : "0° 垂直入射：通道效應示例"}</text>
            <!-- 直穿原子間隙光束 -->
            <line x1="140" y1="45" x2="140" y2="230" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4 2"/>
            <text x="140" y="245" text-anchor="middle" fill="#ef4444" font-size="11">${lang === 'en' ? svgTextLines("Reduced nuclear scattering\ncan produce deeper tails", 140, 235, 14) : "核散射減少可能造成較深尾端"}</text>
            <!-- 兩側原子牆 -->
            <g fill="#64748b">
              <circle cx="100" cy="80" r="4"/><circle cx="100" cy="130" r="4"/><circle cx="100" cy="180" r="4"/>
              <circle cx="180" cy="80" r="4"/><circle cx="180" cy="130" r="4"/><circle cx="180" cy="180" r="4"/>
            </g>
          </g>

          <!-- 7° 傾角入射：隨機核碰撞 (受控高斯輪廓) -->
          <g transform="translate(440, 40)">
            <rect x="0" y="0" width="280" height="260" rx="4" fill="#131e2b" stroke="#10b981"/>
            <text x="140" y="26" text-anchor="middle" fill="#10b981" font-size="12.5" font-weight="700">${lang === 'en' ? "Example: 7° tilt + 27° twist" : "示例：7° 傾角 + 27° 旋轉"}</text>
            <!-- 傾斜光束撞擊原子停止 -->
            <line x1="100" y1="45" x2="150" y2="140" stroke="#10b981" stroke-width="2.5" stroke-dasharray="4 2"/>
            <circle cx="150" cy="140" r="6" fill="#f59e0b"/>
            <text x="140" y="245" text-anchor="middle" fill="#10b981" font-size="11">${lang === 'en' ? "Misalignment can reduce channeling" : "偏離晶軸可降低通道效應"}</text>
            <!-- 偏位原子點陣 -->
            <g fill="#64748b">
              <circle cx="100" cy="80" r="4"/><circle cx="100" cy="130" r="4"/><circle cx="100" cy="180" r="4"/>
              <circle cx="180" cy="80" r="4"/><circle cx="180" cy="130" r="4"/><circle cx="180" cy="180" r="4"/>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Illustrative wafer tilt" : "晶圓傾角示例 (Tilt)"}</div>
          <div class="eng-obj-metric-value">7°</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Tilt can reduce alignment with <110> channels." : "傾角可降低沿 &lt;110&gt; 晶軸的通道效應。"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Illustrative wafer twist" : "晶圓旋轉角示例 (Twist)"}</div>
          <div class="eng-obj-metric-value">22° ~ 27°</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Select twist for the crystal orientation and process." : "旋轉角須依晶向與製程選擇。"}</div>
        </div>
      `;

      footerNote = t.ch07_channeling_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh07Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 07</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh07Title">${t.ch07_title}</h2>
          <p class="eng-obj-subtitle">${t.ch07_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'beamline' ? 'is-active' : ''}" data-tab="beamline">${t.ch07_tab_beamline}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'anneal' ? 'is-active' : ''}" data-tab="anneal">${t.ch07_tab_anneal}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'channeling' ? 'is-active' : ''}" data-tab="channeling">${t.ch07_tab_channeling}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Implant & Ultra-Fast Anneal Clauses' : '佈植與超高速退火條例 (Implant/Anneal)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'MC/HC/MeV · PLAD · RTA · FLA/LSA' : 'MC/HC/MeV · PLAD · RTA · FLA/LSA'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? "7° tilt example, Cryo/PLAD 3D doping, spike RTA and ms/ns anneal to limit diffusion." : "7° 傾角示例、Cryo/PLAD 3D 摻雜、Spike RTA 與限制擴散的毫秒／奈秒退火。"}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'LSS Range & Thermal Depth Law' : '高斯射程與熱穿透深度律 (Implant Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'L_diff = 2√(Dt) · L_th = 2√(α·t_p)' : 'L_diff = 2√(Dt) · L_th = 2√(α·t_p)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? "Teaching overview: Gaussian range, FLA/LSA to limit diffusion and an illustrative 4 µm thermal depth." : "教學概覽：高斯射程、限制擴散的 FLA/LSA 與 4 µm 熱穿透深度示例。"}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Channeling Tail · TED · Crust Pop' : 'Channeling Tail · TED · Crust Pop'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? "Review channeling tails, TED and resist crust damage. A 7° tilt/PAI or anneal strategy requires process-specific validation." : "檢查通道效應長尾、TED 與光阻硬殼損傷；7° 傾角／PAI 或退火策略須依製程驗證。"}</div>
          </div>
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `, t);

    // 綁定頁籤切換事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    // 綁定離子種類切換事件
    container.querySelectorAll('[data-species]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activeSpecies = btn.getAttribute('data-species');
        update();
      });
    });

    // 綁定滑桿事件
    if (activeTab === 'beamline') {
      const eSlider = container.querySelector('#energySlider');
      const dSlider = container.querySelector('#doseSlider');
      if (eSlider) {
        bindEngineeringEvent(eSlider, 'input', e => {
          energyKeV = Number(e.target.value);
          update();
        });
      }
      if (dSlider) {
        bindEngineeringEvent(dSlider, 'input', e => {
          doseExponent = Number(e.target.value);
          update();
        });
      }
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 6. Ch 08 CMP 化學機械研磨運動學與微觀平坦化模型 (CMP Kinematics & Planarization)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderIonImplantObject as render };
