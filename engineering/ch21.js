import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderAdvancedPackagingObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'cowos'; // 'cowos' | 'soic' | 'density'
  let bumpPitch = 25.0; // 0.8 ~ 150 µm
  let dataRateGbps = 4.0; // 1.0 ~ 10.0 Gbps/pin

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'cowos') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2.5D CoWoS Architecture">
          <!-- 頂層晶片群組 (Top Die Tier) -->
          <!-- 左側 HBM 堆疊 (4-16 層 DRAM) -->
          <g transform="translate(100, 50)">
            <rect x="0" y="0" width="140" height="90" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <!-- 內部 TSV 穿孔指示 -->
            <line x1="30" y1="10" x2="30" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="70" y1="10" x2="70" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="110" y1="10" x2="110" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <text x="70" y="42" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">HBM3e 記憶體</text>
            <text x="70" y="58" text-anchor="middle" fill="#f59e0b" font-size="10">8-16 層 3D TSV 堆疊</text>
          </g>

          <!-- 中央高效能運算邏輯晶片 (SoC / GPU Die) -->
          <g transform="translate(280, 40)">
            <rect x="0" y="0" width="240" height="100" rx="3" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
            <text x="120" y="45" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="750">先進運算核心 (SoC / GPU)</text>
            <text x="120" y="65" text-anchor="middle" fill="#38bdf8" font-size="11">3nm / 4nm 邏輯晶片</text>
          </g>

          <!-- 右側 HBM 堆疊 -->
          <g transform="translate(560, 50)">
            <rect x="0" y="0" width="140" height="90" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <line x1="30" y1="10" x2="30" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="70" y1="10" x2="70" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="110" y1="10" x2="110" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <text x="70" y="42" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">HBM3e 記憶體</text>
            <text x="70" y="58" text-anchor="middle" fill="#f59e0b" font-size="10">8-16 層 3D TSV 堆疊</text>
          </g>

          <!-- 微凸塊層 (Micro-Bumps: 間距 35µm) -->
          <g transform="translate(80, 140)">
            ${Array.from({ length: 28 }, (_, i) => `
              <circle cx="${i * 23 + 10}" cy="8" r="3.5" fill="#e2e8f0"/>
            `).join('')}
            <text x="320" y="12" fill="#94a3b8" font-size="10.5">微凸塊 Micro-Bumps (Pitch 35µm)</text>
          </g>

          <!-- 中層：大面積矽中介層 (Silicon Interposer, 內含超密 RDL 導線與 TSV) -->
          <g transform="translate(60, 160)">
            <rect x="0" y="0" width="680" height="60" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <!-- 表面高密 RDL 金屬線與高速平行訊號脈衝 -->
            <path d="M 40,8 L 640,8" stroke="#10b981" stroke-width="2"/>
            <path d="M 40,14 L 640,14" stroke="#10b981" stroke-width="2"/>
            <path d="M 80,8 L 320,8 M 580,14 L 360,14" stroke="#6ee7b7" stroke-width="2.2" stroke-dasharray="6 6" class="anim-data-flow"/>
            <!-- 垂直 TSV 穿孔貫穿中介層 -->
            ${Array.from({ length: 12 }, (_, i) => `
              <line x1="${i * 55 + 40}" y1="15" x2="${i * 55 + 40}" y2="55" stroke="#f59e0b" stroke-width="3"/>
            `).join('')}
            <text x="340" y="38" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="750">2.5D 矽中介層 (Silicon Interposer with TSVs)</text>
          </g>

          <!-- C4 凸塊層 (C4 Bumps: 間距 150µm) -->
          <g transform="translate(80, 220)">
            ${Array.from({ length: 14 }, (_, i) => `
              <circle cx="${i * 48 + 15}" cy="10" r="6" fill="#f59e0b"/>
            `).join('')}
            <text x="320" y="15" fill="#f59e0b" font-size="11">C4 Bumps (Pitch 150µm)</text>
          </g>

          <!-- 底層：大型 ABF 封裝基板 (Organic Substrate) -->
          <g transform="translate(40, 245)">
            <rect x="0" y="0" width="720" height="50" rx="3" fill="#0f172a" stroke="#64748b" stroke-width="1.5"/>
            <text x="360" y="30" text-anchor="middle" fill="#cbd5e1" font-size="12" font-weight="700">ABF 封裝基板 (Package Substrate)</text>
          </g>

          <!-- BGA 錫球 (Ball Grid Array 連接至 PCB 主機板) -->
          <g transform="translate(60, 295)">
            ${Array.from({ length: 12 }, (_, i) => `
              <circle cx="${i * 58 + 25}" cy="16" r="10" fill="#94a3b8"/>
            `).join('')}
            <text x="340" y="22" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">BGA 錫球 (Pitch 1.0 mm → PCB 主機板)</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'HBM Aggregate Bandwidth' : 'HBM 互連總頻寬'}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 1.2 TB/s · 堆疊</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? '1024-bit wide parallel bus per stack' : '1024-bit 匯流排超寬平行傳輸'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Interposer Size' : '中介層面積 (Interposer Size)'}</div>
          <div class="eng-obj-metric-value">&gt; 3.3× ~ 8× 光罩視場</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'CoWoS-S / CoWoS-L reticle stitching' : '台積電 CoWoS-S / CoWoS-L 突破單光罩限制'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Micro-Bump Pitch' : '微凸塊間距 (Micro-Bump Pitch)'}</div>
          <div class="eng-obj-metric-value">25 - 40 µm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Hundreds of high-density contacts per mm²' : '每平方毫米數百個高密度接點'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? '2.5D & Fan-Out Family' : '2.5D 與扇出型條例總覽'}</div>
          <div class="eng-obj-metric-value" style="font-size: 13.5px;">CoWoS-S/R/L · EMIB · I-Cube · InFO</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Includes H-Cube, FOCoS/FOEB, S-Connect/SWIFT, InFO-PoP/3D/SoW, FO-PLP' : '含 EMIB-T、H-Cube、FOCoS/FOEB、S-Connect/SWIFT、InFO-PoP/3D/SoW、FO-PLP'}</div>
        </div>
      `;

      footerNote = t.ch21_cowos_desc;
    } else if (activeTab === 'soic') {
      viewportHtml = `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D SoIC Bumpless Hybrid Bonding">
          <!-- 上晶片 (Top Chip) -->
          <g transform="translate(200, 50)">
            <rect x="0" y="0" width="400" height="90" rx="3" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
            <text x="200" y="45" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">上層晶片 (Top Chip: 例如 SRAM 快取)</text>
            <!-- 表面微銅接點 (Cu Pads, 直徑 0.5µm, 間距 0.9µm) -->
            ${Array.from({ length: 9 }, (_, i) => `
              <rect x="${i * 42 + 25}" y="76" width="20" height="14" fill="#f59e0b"/>
            `).join('')}
          </g>

          <!-- 混合鍵合介面 (Hybrid Bonding Interface: <1µm Pitch, 無凸塊 Bumpless) -->
          <g transform="translate(200, 140)">
            <rect x="0" y="0" width="400" height="16" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" stroke-dasharray="3 3"/>
            ${Array.from({ length: 9 }, (_, i) => `
              <line x1="${i * 42 + 35}" y1="-8" x2="${i * 42 + 35}" y2="24" stroke="#fde047" stroke-width="2" stroke-dasharray="3 3" class="anim-data-flow"/>
            `).join('')}
            <text x="200" y="12" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">無凸塊混合鍵合介面 (SiO₂-SiO₂ 親水鍵合 + Cu-Cu 熱擴散)</text>
          </g>

          <!-- 下晶片 (Bottom Chip) -->
          <g transform="translate(200, 156)">
            <!-- 表面微銅接點精確對齊 -->
            ${Array.from({ length: 9 }, (_, i) => `
              <rect x="${i * 42 + 25}" y="0" width="20" height="14" fill="#f59e0b"/>
            `).join('')}
            <rect x="0" y="14" width="400" height="90" rx="3" fill="#1e293b" stroke="#0284c7" stroke-width="1.5"/>
            <text x="200" y="65" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">下層運算邏輯晶片 (Bottom Compute Die)</text>
          </g>

          <!-- 說明指標 -->
          <text x="400" y="300" text-anchor="middle" fill="#10b981" font-size="13" font-weight="750">無焊錫 · 無底部填充膠 · 接點間距 &lt; 1.0 µm</text>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Bonding Pitch' : '互連間距 (Bonding Pitch)'}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&lt; 0.9 µm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? '>40x finer than conventional micro-bumps' : '比傳統微凸塊縮小 40 倍以上'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Interconnect Density' : '互連密度 (Interconnect Density)'}</div>
          <div class="eng-obj-metric-value">&gt; 1,200,000 / mm²</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Near-monolithic ultra-low latency' : '實現晶粒級單晶片超低延遲'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Energy Efficiency' : '通訊能耗改善'}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&lt; 0.05 pJ / bit</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? '90% lower parasitic capacitance vs. bumps' : '寄生電容劇降，能耗僅傳統封裝 10%'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'All Known 3D & 3.5D Clauses (3A–3F)' : '已知 3D 堆疊與 3.5D 六大條例 (3A–3F)'}</div>
          <div class="eng-obj-metric-value" style="font-size: 13.5px;">SoIC-X/P · Foveros · SAINT · COUPE</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'F2F/F2B · W2W/D2W · HBM TC-NCF/MR-MUF · CBA · 3.5D · CPO · TGV Glass' : '含 F2F/F2B、W2W/D2W、HBM TC-NCF/MR-MUF、CBA、3.5D、CPO 與 TGV 玻璃基板'}</div>
        </div>
      `;

      footerNote = t.ch21_soic_desc;
    } else {
      // Density comparison & Live Interconnect Physics
      const density = Math.round(1000000 / (bumpPitch * bumpPitch));
      const bwDensity = ((density * dataRateGbps) / 8000).toFixed(2);
      const energyPj = (0.025 + 0.012 * Math.pow(bumpPitch, 0.9)).toFixed(2);

      let techName = '';
      let techBadgeColor = '';
      if (bumpPitch <= 1.5) {
        techName = '3D SoIC (Cu-Cu 混合鍵合 Hybrid Bonding)';
        techBadgeColor = 'var(--semi-teal)';
      } else if (bumpPitch <= 15) {
        techName = '次世代超細節距 3D 堆疊 (Ultra-Fine Pitch)';
        techBadgeColor = '#38bdf8';
      } else if (bumpPitch <= 55) {
        techName = '2.5D CoWoS 微凸塊 (Micro-Bumps)';
        techBadgeColor = '#f59e0b';
      } else if (bumpPitch <= 160) {
        techName = '標準覆晶封裝 (Flip-Chip C4)';
        techBadgeColor = '#94a3b8';
      } else {
        techName = '傳統封裝 (BGA / Wire Bonding)';
        techBadgeColor = '#ef4444';
      }

      controlsHtml = `
        <div class="eng-obj-slider-cluster">
          <div class="eng-obj-slider-unit">
            <div class="eng-obj-slider-header">
              <span class="eng-obj-slider-label">${t.ch21_pitch_slider}</span>
              <span class="eng-obj-slider-val" id="pitchVal">${bumpPitch.toFixed(1)} µm</span>
            </div>
            <input type="range" class="eng-obj-slider" id="pitchSlider" min="0.8" max="150" step="0.1" value="${bumpPitch}" aria-label="Bump Pitch">
          </div>
          <div class="eng-obj-slider-unit">
            <div class="eng-obj-slider-header">
              <span class="eng-obj-slider-label">${t.ch21_datarate_slider}</span>
              <span class="eng-obj-slider-val" id="dataRateVal">${dataRateGbps.toFixed(1)} Gbps</span>
            </div>
            <input type="range" class="eng-obj-slider" id="dataRateSlider" min="1.0" max="10.0" step="0.5" value="${dataRateGbps}" aria-label="Pin Data Rate">
          </div>
        </div>
      `;

      // 產生動態介面 SVG
      const numBumps = Math.max(2, Math.min(22, Math.round(360 / Math.max(12, bumpPitch * 2.2))));
      const bumpRadius = Math.max(1.5, Math.min(10, bumpPitch * 0.28));
      const spacingPx = 420 / (numBumps + 1);

      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Packaging Interconnect Live Physics Engine">
          <g transform="translate(140, 25)">
            <!-- 當前技術標註看板 -->
            <rect x="0" y="0" width="520" height="34" rx="4" fill="#0f172a" stroke="${techBadgeColor}" stroke-width="1.5"/>
            <text x="260" y="22" text-anchor="middle" fill="${techBadgeColor}" font-size="13" font-weight="750">
              匹配架構: ${techName}
            </text>

            <!-- 上層晶片 (Die A) -->
            <rect x="40" y="55" width="440" height="50" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2"/>
            <text x="260" y="85" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700">Top Die (SoC / Corelet)</text>

            <!-- 介面凸塊 / 混合鍵合層 -->
            <g transform="translate(40, 105)">
              ${bumpPitch <= 1.5 ? `
                <!-- 無凸塊 Cu-Cu 擴散層 -->
                <rect x="0" y="0" width="440" height="12" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981"/>
                <text x="220" y="10" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">原子級 Cu-Cu 擴散鍵合 (Zero Bump)</text>
              ` : `
                <!-- 離散凸塊陣列 -->
                ${Array.from({ length: numBumps }, (_, i) => `
                  <circle cx="${(i + 1) * spacingPx}" cy="10" r="${bumpRadius}" fill="${bumpPitch <= 35 ? '#38bdf8' : '#f59e0b'}"/>
                `).join('')}
                <line x1="${spacingPx}" y1="24" x2="${spacingPx * 2}" y2="24" stroke="#94a3b8" stroke-width="1"/>
                <text x="${spacingPx * 1.5}" y="36" text-anchor="middle" fill="#94a3b8" font-size="10">Pitch: ${bumpPitch}µm</text>
              `}
            </g>

            <!-- 下層基板 / 中介層 (Die B / Interposer) -->
            <rect x="40" y="145" width="440" height="50" rx="3" fill="#0f172a" stroke="#64748b" stroke-width="1.2"/>
            <text x="260" y="175" text-anchor="middle" fill="#cbd5e1" font-size="12.5" font-weight="700">Bottom Tier (Interposer / Base Die)</text>

            <!-- 橫向演進對照標尺 -->
            <g transform="translate(40, 215)">
              <line x1="0" y1="25" x2="440" y2="25" stroke="#334155" stroke-width="3"/>
              <!-- 錨點標記 -->
              <circle cx="10" cy="25" r="4" fill="#10b981"/>
              <text x="10" y="15" text-anchor="middle" fill="#10b981" font-size="10">0.9µm SoIC</text>
              
              <circle cx="110" cy="25" r="4" fill="#38bdf8"/>
              <text x="110" y="15" text-anchor="middle" fill="#38bdf8" font-size="10">35µm CoWoS</text>
              
              <circle cx="280" cy="25" r="4" fill="#f59e0b"/>
              <text x="280" y="15" text-anchor="middle" fill="#f59e0b" font-size="10">150µm C4</text>

              <!-- 當前 Pitch 指針 -->
              <polygon points="${Math.max(5, Math.min(435, (bumpPitch / 150) * 440))},38 ${Math.max(5, Math.min(435, (bumpPitch / 150) * 440)) - 6},48 ${Math.max(5, Math.min(435, (bumpPitch / 150) * 440)) + 6},48" fill="${techBadgeColor}"/>
              <text x="${Math.max(25, Math.min(415, (bumpPitch / 150) * 440))}" y="62" text-anchor="middle" fill="${techBadgeColor}" font-size="11" font-weight="700">當前: ${bumpPitch.toFixed(1)}µm</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch21_density_label}</div>
          <div class="eng-obj-metric-value" style="color: ${techBadgeColor};">${density.toLocaleString()} / mm²</div>
          <div class="eng-obj-metric-note">幾何面積互連密度 (1 / Pitch²)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch21_bw_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${bwDensity} TB/s/mm²</div>
          <div class="eng-obj-metric-note">單線 ${dataRateGbps} Gbps 平行傳輸總頻寬</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch21_energy_label}</div>
          <div class="eng-obj-metric-value" style="color: ${parseFloat(energyPj) < 0.1 ? 'var(--semi-teal)' : '#f59e0b'};">${energyPj} pJ / bit</div>
          <div class="eng-obj-metric-note">${parseFloat(energyPj) < 0.1 ? '微米級 Cu 擴散 · 極致超低傳輸能耗' : '微凸塊寄生電容損耗'}</div>
        </div>
      `;

      // 恢復四世代概略參考比較；現有可調模型與滑桿範圍保持不變。
      viewportHtml += `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Packaging Interconnect Density Comparison">
          <text x="400" y="25" text-anchor="middle" fill="#cbd5e1" font-size="12">四世代互連參考比較（概略密度；柱長為示意，非線性比例）</text>
          <!-- 橫向柱狀對照圖 -->
          <g transform="translate(180, 50)">
            <!-- 1. BGA -->
            <rect x="0" y="0" width="8" height="28" fill="#64748b"/>
            <text x="-15" y="19" text-anchor="end" fill="#94a3b8" font-size="12">打線 / BGA</text>
            <text x="20" y="19" fill="#e2e8f0" font-size="11.5">間距 1000 µm · 密度 1 / mm²</text>

            <!-- 2. Flip-Chip C4 -->
            <rect x="0" y="55" width="30" height="28" fill="#0284c7"/>
            <text x="-15" y="74" text-anchor="end" fill="#94a3b8" font-size="12">覆晶 (Flip-Chip C4)</text>
            <text x="42" y="74" fill="#e2e8f0" font-size="11.5">間距 150 µm · 密度約 40 / mm²</text>

            <!-- 3. 2.5D CoWoS 微凸塊 -->
            <rect x="0" y="110" width="110" height="28" fill="#f59e0b"/>
            <text x="-15" y="129" text-anchor="end" fill="#f59e0b" font-size="12">2.5D CoWoS 微凸塊</text>
            <text x="122" y="129" fill="#e2e8f0" font-size="11.5">間距 35 µm · 密度約 800 / mm²</text>

            <!-- 4. 3D SoIC 混合鍵合 -->
            <rect x="0" y="165" width="460" height="34" fill="#10b981"/>
            <text x="-15" y="187" text-anchor="end" fill="#10b981" font-size="13" font-weight="700">3D SoIC 混合鍵合</text>
            <text x="20" y="222" fill="#10b981" font-size="13" font-weight="750">約 0.9 µm · 約 1,200,000 / mm²（約提升 1500 倍）</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml += `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">互連密度躍升幅度</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">1,500 倍</div>
          <div class="eng-obj-metric-note">從 2.5D 微凸塊邁向 3D Cu-Cu 混合鍵合</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">小晶片 (Chiplet) 戰略意義</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">打破摩爾定律物理極限</div>
          <div class="eng-obj-metric-note">算力、快取與高頻寬記憶體異質整合</div>
        </div>
      `;

      footerNote = t.ch21_density_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh21Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 21</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh21Title">${t.ch21_title}</h2>
          <p class="eng-obj-subtitle">${t.ch21_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'cowos' ? 'is-active' : ''}" data-tab="cowos">${t.ch21_tab_cowos}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'soic' ? 'is-active' : ''}" data-tab="soic">${t.ch21_tab_soic}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'density' ? 'is-active' : ''}" data-tab="density">${t.ch21_tab_density}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? '1/P² I/O Density & Stoney Warpage Law' : '3D 節距平方反比與 Stoney 翹曲律 (3D Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'D_IO = 1/P² (>10⁵/mm²) · E_bit = ½CV² (<0.05 pJ)' : 'D_IO = 1/P² (>10⁵/mm²) · E_bit = ½CV² (<0.05 pJ)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? '100× hybrid-bond density leap, 3D thermal matrix & TGV stiffness' : '無凸塊混合鍵合密度暴增百倍、3D 熱耦合矩陣與 TGV 玻璃抗翹曲'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Smile-Cry NWO · 50nm Blister · In TIM' : 'Smile-Cry NWO · 50nm Blister · In TIM'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Controls CoWoS warpage NWO, 50nm hybrid-bond blisters & 3D thermal crosstalk' : '補強環與玻璃載板抑制哭笑臉翹曲、Class 1 臭氧洗防混合鍵合氣泡與銦片散熱'}</div>
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

    // 綁定滑桿事件
    if (activeTab === 'density') {
      const pSlider = container.querySelector('#pitchSlider');
      const dSlider = container.querySelector('#dataRateSlider');
      if (pSlider) {
        bindEngineeringEvent(pSlider, 'input', e => {
          bumpPitch = Number(e.target.value);
          update();
        });
      }
      if (dSlider) {
        bindEngineeringEvent(dSlider, 'input', e => {
          dataRateGbps = Number(e.target.value);
          update();
        });
      }
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 9. Ch 03 柴氏長晶提拉與晶圓切片拋光幾何模型 (CZ Ingot Puller & Wafer Slicing)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderAdvancedPackagingObject as render };
