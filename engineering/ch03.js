import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderIngotWaferObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  const tx = (zh, en) => lang === 'en' ? en : zh;
  let activeTab = 'cz'; // 'cz' | 'saw' | 'polish'
  let pullSpeed = 1.20; // 0.40 ~ 2.20 mm/min
  let tempGrad = 9.0;   // 4.0 ~ 16.0 °C/mm

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    // Voronkov Criterion 計算: xi = V / G (mm²/(min·K))
    const xi = pullSpeed / tempGrad;
    const xiCrit = 0.134; // 臨界中性線
    let regime = 'pure';
    let regimeColor = '#10b981';
    let regimeLabel = t.ch03_regime_pure;
    let impactLabel = t.ch03_impact_pure;

    if (xi > 0.145) {
      regime = 'vacancy';
      regimeColor = '#ef4444';
      regimeLabel = t.ch03_regime_vacancy;
      impactLabel = t.ch03_impact_vacancy;
    } else if (xi < 0.125) {
      regime = 'interstitial';
      regimeColor = '#f59e0b';
      regimeLabel = t.ch03_regime_interstitial;
      impactLabel = t.ch03_impact_interstitial;
    }

    if (activeTab === 'cz') {
      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch03PullSlider">${t.ch03_pull_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch03PullSlider" min="0.40" max="2.20" step="0.05" value="${pullSpeed.toFixed(2)}">
            <span class="eng-obj-slider-val">${pullSpeed.toFixed(2)} mm/min</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch03GradSlider">${t.ch03_grad_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch03GradSlider" min="4.0" max="16.0" step="0.5" value="${tempGrad.toFixed(1)}">
            <span class="eng-obj-slider-val">${tempGrad.toFixed(1)} °C/mm</span>
          </div>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: #94a3b8; font-family: monospace;">(V/G) = <strong style="color: ${regimeColor}; font-size: 13px;">${xi.toFixed(3)}</strong></span>
            <span style="font-size: 11px; padding: 2px 7px; border-radius: 4px; background: rgba(15,23,42,0.6); border: 1px solid ${regimeColor}; color: ${regimeColor}; font-weight: 700;">
              ${regime === 'pure' ? tx("低風險示例區間", "LOW-RISK EXAMPLE") : (regime === 'vacancy' ? tx("空位主導示例", "VACANCY-RICH EXAMPLE") : tx("自間隙主導示例", "INTERSTITIAL-RICH EXAMPLE"))}
            </span>
          </div>
        </div>
      `;

      // 晶棒內部微觀缺陷圖形繪製
      let defectVisual = '';
      if (regime === 'vacancy') {
        defectVisual = `
          <g opacity="0.95">
            ${Array.from({ length: 14 }, (_, i) => {
              const x = ((i * 37) % 40) - 20;
              const y = 155 + ((i * 23) % 95);
              return `
                <polygon points="${x},${y - 4} ${x + 4},${y} ${x},${y + 4} ${x - 4},${y}" fill="#ef4444" stroke="#ffffff" stroke-width="0.8"/>
              `;
            }).join('')}
            <text x="0" y="268" text-anchor="middle" fill="#f87171" font-size="9.5" font-weight="700" data-ink="halo">${tx("COP／D-defect 聚集示意", "COP / D-defect schematic")}</text>
          </g>
        `;
      } else if (regime === 'interstitial') {
        defectVisual = `
          <g opacity="0.95">
            ${Array.from({ length: 5 }, (_, i) => {
              const y = 160 + i * 20;
              return `
                <path d="M -52,${y} Q -35,${y - 8} -50,${y + 12}" fill="none" stroke="#f59e0b" stroke-width="2"/>
                <path d="M 52,${y} Q 35,${y - 8} 50,${y + 12}" fill="none" stroke="#f59e0b" stroke-width="2"/>
              `;
            }).join('')}
            <text x="0" y="268" text-anchor="middle" fill="#fbbf24" font-size="9.5" font-weight="700" data-ink="halo">${tx("自間隙缺陷環示意", "Interstitial loops schematic")}</text>
          </g>
        `;
      } else {
        defectVisual = `
          <g opacity="0.95">
            <rect x="-56" y="144" width="112" height="124" rx="4" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-dasharray="4 2"/>
            <text x="0" y="268" text-anchor="middle" fill="#34d399" font-size="9.5" font-weight="700" data-ink="halo">${tx("低缺陷風險教學區間", "Low-defect-risk teaching regime")}</text>
          </g>
        `;
      }

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Czochralski Crystal Pulling Furnace with Voronkov Criterion Physics">
          <defs>
            <linearGradient id="czMeltGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.95"/>
              <stop offset="50%" stop-color="#ea580c" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#b45309" stop-opacity="0.85"/>
            </linearGradient>
            <linearGradient id="czIngotGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#64748b"/>
              <stop offset="50%" stop-color="#94a3b8"/>
              <stop offset="100%" stop-color="#475569"/>
            </linearGradient>
            <radialGradient id="czHeaterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ef4444" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- 爐體外壁 (Water-Cooled Double Chamber Wall) -->
          <rect x="120" y="20" width="560" height="380" rx="16" fill="#0f172a" stroke="#334155" stroke-width="2"/>
          <text x="140" y="48" fill="#64748b" font-size="11" font-family="monospace">CZ FURNACE VACUUM CHAMBER · Ar PURGE 10-30 Torr · VORONKOV ENGINE</text>

          <!-- 外圍超導磁體線圈 (MCZ Coils: 產生水平/尖峰磁場抑制對流) -->
          <g transform="translate(60, 160)">
            <rect x="0" y="0" width="50" height="150" rx="6" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
            <text x="25" y="80" text-anchor="middle" fill="#38bdf8" font-size="11" transform="rotate(-90 25 80)">${tx("MCZ 磁場線圈", "MCZ field coil")}</text>
          </g>
          <g transform="translate(690, 160)">
            <rect x="0" y="0" width="50" height="150" rx="6" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
            <text x="25" y="80" text-anchor="middle" fill="#38bdf8" font-size="11" transform="rotate(90 25 80)">${tx("MCZ 磁場線圈", "MCZ field coil")}</text>
          </g>

          <!-- 左右兩側石墨電阻加熱器 (Graphite Heaters @ 1450°C) -->
          <g transform="translate(200, 170)">
            <rect x="0" y="0" width="24" height="150" rx="4" fill="#dc2626" stroke="#f87171" stroke-width="1.5" class="anim-heat"/>
            <text x="12" y="80" text-anchor="middle" fill="#ffffff" font-size="10" transform="rotate(-90 12 80)">${tx("石墨加熱器", "Graphite heater")}</text>
          </g>
          <g transform="translate(576, 170)">
            <rect x="0" y="0" width="24" height="150" rx="4" fill="#dc2626" stroke="#f87171" stroke-width="1.5" class="anim-heat"/>
            <text x="12" y="80" text-anchor="middle" fill="#ffffff" font-size="10" transform="rotate(90 12 80)">${tx("石墨加熱器", "Graphite heater")}</text>
          </g>

          <!-- 石英坩堝外層碳-碳複合托杯與支持軸 (Crucible Shaft with Rotation) -->
          <g transform="translate(240, 180)">
            <!-- 石英坩堝主體 (Quartz Crucible) -->
            <path d="M 20,0 C 20,130 50,150 160,150 C 270,150 300,130 300,0 Z" fill="#1e293b" stroke="#cbd5e1" stroke-width="2.5"/>
            <!-- 內部液態矽熔體 (Liquid Silicon Melt @ 1425°C) -->
            <path d="M 25,20 C 25,125 55,145 160,145 C 265,145 295,125 295,20 Z" fill="url(#czMeltGrad)"/>
            <!-- 熔體表面波紋與微觀熱對流渦旋 -->
            <ellipse cx="160" cy="22" rx="135" ry="12" fill="#fbbf24" opacity="0.6"/>
            <!-- 坩堝旋轉標示 (Crucible Rotation CW) -->
            <line x1="160" y1="150" x2="160" y2="210" stroke="#94a3b8" stroke-width="6"/>
            <text x="160" y="200" text-anchor="middle" fill="#38bdf8" font-size="11">${tx("坩堝順轉 ↻（5–15 RPM 示例）", "Crucible ↻ (5–15 RPM example)")}</text>
          </g>

          <!-- 頂部提拉纜繩、夾頭與單晶晶棒 (Ingot with Dash Necking & Pull Motion) -->
          <g transform="translate(400, 30)">
          <g class="anim-crystal-pull">
            <!-- 提拉鉬軸纜繩 (Pull Cable) -->
            <line x1="0" y1="0" x2="0" y2="40" stroke="#e2e8f0" stroke-width="3"/>
            <!-- 籽晶夾頭 (Seed Holder) -->
            <rect x="-12" y="40" width="24" height="15" rx="2" fill="#475569" stroke="#94a3b8" stroke-width="1"/>
            <!-- <100> 單晶籽晶 (Seed Crystal) -->
            <rect x="-4" y="55" width="8" height="18" fill="#e2e8f0"/>
            <!-- 消除差排之細頸 (Dash Necking: 直徑 3-4mm, 長度 > 50mm) -->
            <path d="M -4,73 C -2,85 -2,95 -2,105 L 2,105 C 2,95 2,85 4,73 Z" fill="#94a3b8"/>
            <text x="15" y="92" fill="#38bdf8" font-size="10.5">${tx("Dash 細頸（減少差排）", "Dash necking (dislocation reduction)")}</text>

            <!-- 放肩錐形 (Shoulder / Crown) -->
            <path d="M -2,105 L -60,140 L 60,140 L 2,105 Z" fill="url(#czIngotGrad)" stroke="#cbd5e1" stroke-width="1"/>
            <!-- 300mm 單晶矽棒主體 (Crystal Ingot Body) -->
            <rect x="-60" y="140" width="120" height="140" fill="url(#czIngotGrad)" stroke="${regimeColor}" stroke-width="${regime === 'pure' ? '2.5' : '1.5'}"/>
            
            <!-- 動態微缺陷渲染層 -->
            ${defectVisual}

            <!-- 晶棒反向旋轉標示 (Ingot Counter-Rotation CCW) -->
            <text x="0" y="195" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="750">${tx("300 mm CZ 晶棒示意", "300 mm CZ ingot schematic")}</text>
            <text x="0" y="212" text-anchor="middle" fill="#f8fafc" font-size="10.5">${tx("&lt;100&gt; 晶向 · 逆時針旋轉 ↺", "&lt;100&gt; orientation · rotation ↺")}</text>
            <text x="0" y="228" text-anchor="middle" fill="${regimeColor}" font-size="10" font-weight="700" data-ink="halo">${tx("提拉 V", "Pull V")} = ${pullSpeed.toFixed(2)} mm/min · G = ${tempGrad.toFixed(1)} °C/mm</text>
          </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch03_voronkov_ratio}</div>
          <div class="eng-obj-metric-value" style="color: ${regimeColor};">${xi.toFixed(3)} mm²/(min·K)</div>
          <div class="eng-obj-metric-note">${t.ch03_crit_baseline}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch03_defect_regime}</div>
          <div class="eng-obj-metric-value" style="font-size: 13.5px; color: ${regimeColor};">${regimeLabel}</div>
          <div class="eng-obj-metric-note">${regime === 'pure' ? tx("模型區間不等於零缺陷保證；需搭配熱場與冷卻條件", "The model regime is not a zero-defect guarantee; thermal field and cooling also matter") : (regime === 'vacancy' ? tx("空位聚集可能形成微孔，取決於冷卻與雜質條件", "Vacancy clusters may form voids, depending on cooling and impurities") : tx("自間隙原子聚集可能形成缺陷環", "Self-interstitial clustering may form defect loops"))}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch03_yield_impact}</div>
          <div class="eng-obj-metric-value" style="font-size: 13.5px; color: ${regime === 'pure' ? 'var(--semi-teal)' : '#f87171'};">${regime === 'pure' ? tx("低缺陷風險示例", "Low-defect-risk example") : (regime === 'vacancy' ? tx("可能影響氧化層完整性", "Possible oxide-integrity risk") : tx("可能增加接面漏電", "Possible junction-leakage risk"))}</div>
          <div class="eng-obj-metric-note">${impactLabel}</div>
        </div>
      `;

      footerNote = t.ch03_cz_desc;
    } else if (activeTab === 'saw') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diamond Wire Sawing Ingot into Wafers">
          <defs>
            <pattern id="sawWirePattern" width="16" height="40" patternUnits="userSpaceOnUse">
              <line x1="8" y1="0" x2="8" y2="40" stroke="#38bdf8" stroke-width="1.5"/>
            </pattern>
          </defs>

          <!-- 頂部進給架與進給單晶矽棒 (300mm Ingot Downward Feed) -->
          <g transform="translate(200, 30)">
            <rect x="0" y="0" width="400" height="130" rx="8" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
            <text x="200" y="45" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">${tx("300 mm 單晶矽晶棒", "300 mm silicon ingot")}</text>
            <text x="200" y="65" text-anchor="middle" fill="#38bdf8" font-size="11">${tx("垂直進給 ↓（約 0.5 mm/min 示例）", "Feed ↓ (~0.5 mm/min example)")}</text>
            <!-- 切割切痕線條 (Slits being cut) -->
            ${Array.from({ length: 18 }, (_, i) => `
              <line x1="${i * 20 + 30}" y1="80" x2="${i * 20 + 30}" y2="130" stroke="#0f172a" stroke-width="2.5"/>
            `).join('')}
          </g>

          <!-- 中段金剛石多線鋸切割網 (Diamond Multi-Wire Web) -->
          <g transform="translate(160, 160)">
            <g class="anim-saw-wire">
            <!-- 左右兩側主導向滾輪 (Guide Rollers) -->
            <circle cx="10" cy="40" r="30" fill="#334155" stroke="#64748b" stroke-width="2"/>
            <circle cx="470" cy="40" r="30" fill="#334155" stroke="#64748b" stroke-width="2"/>
            <!-- 金剛石線鋸束 (Diamond Wires Web: 數百條高張力金剛石鋼線) -->
            ${Array.from({ length: 24 }, (_, i) => `
              <line x1="20" y1="${i * 3 + 10}" x2="460" y2="${i * 3 + 10}" stroke="#0ea5e9" stroke-width="1.8"/>
            `).join('')}
            <text x="240" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">${tx("⇄ 金剛石線鋸（40 m/s 示例）", "⇄ Diamond wire (40 m/s example)")}</text>
            <text x="240" y="112" text-anchor="middle" fill="#94a3b8" font-size="11">${tx("金剛石磨粒（8–12 µm 示例）＋冷卻液", "Diamond abrasive (8–12 µm example) + coolant")}</text>
          </g>
          </g>

          <!-- 下方落入之高精度切片晶圓陣列 (Sliced Wafers) -->
          <g transform="translate(200, 290)">
            <rect x="0" y="0" width="400" height="90" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            ${Array.from({ length: 20 }, (_, i) => `
              <rect x="${i * 18 + 25}" y="15" width="8" height="60" rx="1.5" fill="#94a3b8" stroke="#38bdf8" stroke-width="1"/>
            `).join('')}
            <text x="200" y="48" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">${tx("一次切出 400+ 片（示例）", "400+ wafers per pass (example)")}</text>
            <text x="200" y="66" text-anchor="middle" fill="#38bdf8" font-size="11">${tx("厚度約 775 µm · 切縫約 110 µm（示例）", "Thickness ~775 µm · kerf ~110 µm (example)")}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch03_metric_thick}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">775 ± 20 µm</div>
          <div class="eng-obj-metric-note">${tx("300 mm 晶圓示例；公差須依供應商與採購規格確認", "300 mm wafer example; confirm tolerance in the supplier and purchase specification")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("切縫損耗示例", "Example kerf loss")}</div>
          <div class="eng-obj-metric-value">~ 110 µm</div>
          <div class="eng-obj-metric-note">${tx("切縫依線徑、磨粒與切割條件而變", "Kerf depends on wire diameter, abrasive and sawing conditions")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("翹曲量示例（Warp／Bow）", "Example deformation (warp / bow)")}</div>
          <div class="eng-obj-metric-value">&lt; 25 µm</div>
          <div class="eng-obj-metric-note">${tx("Warp 與 Bow 為不同量測；此值不是兩者的通用規格", "Warp and bow are different measurements; this is not a universal limit for either")}</div>
        </div>
      `;

      footerNote = t.ch03_saw_desc;
    } else if (activeTab === 'polish') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wafer Bevel Grinding and Double-Side Polishing">
          <!-- 左側：晶圓邊緣倒角研磨 (Edge Beveling & Profiling) -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="320" height="340" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <text x="160" y="32" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">${tx("晶圓邊緣倒角研磨", "Wafer edge beveling")}</text>
            <text x="160" y="50" text-anchor="middle" fill="#94a3b8" font-size="10.5">${tx("修整尖角 · 降低碎邊風險", "Round sharp edges · reduce chipping risk")}</text>

            <!-- 晶圓截面放大 (銳角尖端 vs 圓弧 R 倒角) -->
            <g transform="translate(60, 90)">
              <!-- 原始未處理直角易裂輪廓 (Sharp Edge) -->
              <path d="M 0,40 L 80,40 L 80,100 L 0,100" fill="#334155" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
              <text x="90" y="50" fill="#f87171" font-size="10">${tx("尖角：應力集中", "Sharp edge: stress concentration")}</text>

              <!-- 鑽石砂輪 CNC 研磨後的標準圓弧輪廓 (SEMI T-Profile) -->
              <path d="M 0,140 L 50,140 C 75,140 85,150 85,170 C 85,190 75,200 50,200 L 0,200 Z" fill="#64748b" stroke="#10b981" stroke-width="2"/>
              <text x="95" y="165" fill="#34d399" font-size="10.5" font-weight="700">${tx("圓弧倒角示意", "Rounded-edge schematic")}</text>
              <text x="95" y="182" fill="#94a3b8" font-size="9.5">Bevel Radius R ~ 250 µm</text>
            </g>
          </g>

          <!-- 右側：化學機械雙面拋光 (DSP: Double-Side Polishing) -->
          <g transform="translate(420, 40)">
            <rect x="0" y="0" width="320" height="340" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <text x="160" y="32" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">${tx("雙面化學機械拋光", "Double-side polishing (DSP)")}</text>
            <text x="160" y="50" text-anchor="middle" fill="#38bdf8" font-size="10.5">${tx("行星輪夾持 · 兩面同時拋光", "Planetary carrier · both sides polished")}</text>

            <!-- 上下旋轉拋光盤與微觀晶圓夾持 -->
            <g transform="translate(30, 80)">
              <!-- 上拋光盤 (Top Plate) -->
              <rect x="0" y="0" width="260" height="30" rx="3" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
              <text x="130" y="20" text-anchor="middle" fill="#cbd5e1" font-size="11">${tx("上拋光盤 ↓ 壓力", "Top plate ↓ pressure")}</text>

              <!-- 中間游星輪 (Planetary Carrier) 與被拋光矽晶圓 -->
              <g transform="translate(20, 45)">
                <rect x="0" y="0" width="220" height="40" rx="4" fill="#09131b" stroke="#0ea5e9" stroke-width="1.5"/>
                <!-- 旋轉運動箭頭 -->
                <circle cx="110" cy="20" r="16" fill="#38bdf8" opacity="0.3"/>
                <text x="110" y="25" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${tx("矽晶圓（自轉＋公轉）", "Wafer (spin + orbit)")}</text>
              </g>

              <!-- 下拋光盤 (Bottom Plate) -->
              <rect x="0" y="100" width="260" height="30" rx="3" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
              <text x="130" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">${tx("下拋光盤 ↺ 旋轉", "Bottom plate ↺ rotation")}</text>

              <!-- 表面奈米粗糙度放大對比 -->
              <g transform="translate(0, 160)">
                <rect x="0" y="0" width="260" height="75" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                <text x="10" y="22" fill="#94a3b8" font-size="10.5">${tx("拋光前示例：RMS 約 1 µm", "Before: RMS ~1 µm (example)")}</text>
                <path d="M 10,32 Q 30,22 50,32 T 90,32 T 130,32 T 170,32 T 210,32 T 250,32" fill="none" stroke="#f87171" stroke-width="1.5"/>
                <text x="10" y="55" fill="#34d399" font-size="10.5" font-weight="700">${tx("拋光後目標示例：RMS &lt; 0.1 nm", "After: RMS &lt; 0.1 nm (example target)")}</text>
                <line x1="10" y1="65" x2="250" y2="65" stroke="#10b981" stroke-width="2"/>
              </g>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch03_metric_roughness}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${tx("&lt; 0.1 nm（示例目標）", "&lt; 0.1 nm (example target)")}</div>
          <div class="eng-obj-metric-note">${tx("粗糙度須附量測面積與頻寬；不能單獨證明微影景深合格", "Roughness needs a measurement area and bandwidth; it alone does not establish lithography focus compliance")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("平坦度示例（GBIR／SFQR）", "Example flatness (GBIR / SFQR)")}</div>
          <div class="eng-obj-metric-value">&lt; 0.05 µm</div>
          <div class="eng-obj-metric-note">${tx("GBIR 為全域、SFQR 為局部量；須分別指定量測定義與限值", "GBIR is global and SFQR is site-based; specify their measurement definitions and limits separately")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("邊緣輪廓示意", "Illustrative edge profile")}</div>
          <div class="eng-obj-metric-value">${tx("邊緣輪廓示意（規格另定）", "Edge profile (specification required)")}</div>
          <div class="eng-obj-metric-note">${tx("輪廓與量測規格須確認；倒角可降低處理時的碎邊風險", "Confirm the profile specification; beveling can reduce chipping during handling")}</div>
        </div>
      `;

      footerNote = t.ch03_polish_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh03Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 03</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh03Title">${t.ch03_title}</h2>
          <p class="eng-obj-subtitle">${t.ch03_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="group" aria-label="${tx('工程圖視圖', 'Engineering views')}">
            <button type="button" class="eng-obj-tab ${activeTab === 'cz' ? 'is-active' : ''}" data-tab="cz" aria-pressed="${activeTab === 'cz'}">${t.ch03_tab_cz}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'saw' ? 'is-active' : ''}" data-tab="saw" aria-pressed="${activeTab === 'saw'}">${t.ch03_tab_saw}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'polish' ? 'is-active' : ''}" data-tab="polish" aria-pressed="${activeTab === 'polish'}">${t.ch03_tab_polish}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Wafer Substrate Overview' : '晶圓基板概覽'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'CZ/Epi · SOI · SiC/GaN · Carrier' : 'CZ/Epi · SOI · SiC/GaN · 3D載片'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? '11N CZ/FZ Si, FD/RF/SiPh SOI, 4H-SiC/GaN WBG & 3D LTHC carrier wafers' : '11N CZ/FZ 單晶矽、FD/RF/SiPh SOI、4H-SiC/GaN 寬能隙與 3D 暫時鍵合載片'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Crystal-Growth Models' : '晶體生長模型'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'V/G ≈ 0.134 · Cs = k0·C0(1-fs)^(k0-1)' : 'V/G ≈ 0.134 · Cs = k0·C0(1-fs)^(k0-1)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Illustrative V/G setting, Scheil assumptions and application-specific TTV targets' : 'V/G 示例設定、Scheil 假設與依用途訂定的 TTV 目標'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'COP GOI · Slip Line · Backgrind SSD' : 'COP GOI · Slip Line · Backgrind SSD'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Investigates COP oxide damage, thermal slip and backgrind cracks; mitigation requires qualification' : '調查 COP 氧化層損傷、熱滑移及背磨裂紋；改善措施須經製程驗證'}</div>
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

    const pullSlider = container.querySelector('#ch03PullSlider');
    if (pullSlider) {
      bindEngineeringEvent(pullSlider, 'input', (e) => {
        pullSpeed = parseFloat(e.target.value);
        update();
      });
    }

    const gradSlider = container.querySelector('#ch03GradSlider');
    if (gradSlider) {
      bindEngineeringEvent(gradSlider, 'input', (e) => {
        tempGrad = parseFloat(e.target.value);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 10. Ch 09 RCA 濕式清洗化學反應、兆聲波與 Marangoni 乾燥模型 (Wet Clean & Megasonics)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderIngotWaferObject as render };
