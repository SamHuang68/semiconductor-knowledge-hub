import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderSemiconductorPhysicsObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'band'; // 'band' | 'pn' | 'inversion'
  let vgs = 0.70;
  let vds = 0.40;

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'band') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Semiconductor Band Diagram Intrinsic vs N-type vs P-type">
          <!-- 三大能帶圖對比區域 -->
          <!-- 1. 本質半導體 (Intrinsic Si) -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="200" height="320" fill="#0f172a" stroke="#334155" stroke-width="1.5" rx="6"/>
            <text x="100" y="30" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">本質矽 (Intrinsic)</text>
            <text x="100" y="48" text-anchor="middle" fill="#94a3b8" font-size="10">未摻雜 · 純度 11N</text>

            <!-- 傳導帶 (Conduction Band Ec) -->
            <rect x="20" y="70" width="160" height="45" fill="#0284c7" opacity="0.6"/>
            <line x1="20" y1="115" x2="180" y2="115" stroke="#38bdf8" stroke-width="2"/>
            <text x="30" y="105" fill="#ffffff" font-size="11" font-weight="700">Ec 傳導帶底</text>

            <!-- 費米能階 EF (正中央) -->
            <line x1="20" y1="175" x2="180" y2="175" stroke="#fbbf24" stroke-width="1.8" stroke-dasharray="4 2"/>
            <text x="100" y="168" text-anchor="middle" fill="#fbbf24" font-size="10.5" font-weight="700">EF = Ei (中性費米階)</text>

            <!-- 價帶 (Valence Band Ev) -->
            <rect x="20" y="235" width="160" height="45" fill="#ea580c" opacity="0.6"/>
            <line x1="20" y1="235" x2="180" y2="235" stroke="#f97316" stroke-width="2"/>
            <text x="30" y="255" fill="#ffffff" font-size="11" font-weight="700">Ev 價帶頂</text>

            <text x="100" y="210" text-anchor="middle" fill="#94a3b8" font-size="10">能隙 Eg = 1.12 eV</text>
          </g>

          <!-- 2. N 型半導體 (N-type: 摻五價磷 P) -->
          <g transform="translate(300, 40)">
            <rect x="0" y="0" width="200" height="320" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5" rx="6"/>
            <text x="100" y="30" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">N 型矽 (摻雜磷 P⁺)</text>
            <text x="100" y="48" text-anchor="middle" fill="#38bdf8" font-size="10">施體摻雜 · 電子多數載子</text>

            <rect x="20" y="70" width="160" height="45" fill="#0284c7" opacity="0.6"/>
            <line x1="20" y1="115" x2="180" y2="115" stroke="#38bdf8" stroke-width="2"/>
            <text x="30" y="105" fill="#ffffff" font-size="11" font-weight="700">Ec 傳導帶底</text>

            <!-- 施體能階 Ed 與向上躍升的費米能階 EF -->
            <line x1="20" y1="130" x2="180" y2="130" stroke="#f87171" stroke-width="1.5" stroke-dasharray="2 2"/>
            <text x="140" y="126" fill="#f87171" font-size="9.5">Ed 施體階</text>

            <line x1="20" y1="140" x2="180" y2="140" stroke="#fbbf24" stroke-width="2"/>
            <text x="100" y="155" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">EF ⇑ 躍升接近 Ec</text>

            <rect x="20" y="235" width="160" height="45" fill="#ea580c" opacity="0.6"/>
            <line x1="20" y1="235" x2="180" y2="235" stroke="#f97316" stroke-width="2"/>
            <text x="30" y="255" fill="#ffffff" font-size="11" font-weight="700">Ev 價帶頂</text>

            <text x="100" y="300" text-anchor="middle" fill="#38bdf8" font-size="10.5">容易激發自由電子導電</text>
          </g>

          <!-- 3. P 型半導體 (P-type: 摻三價硼 B) -->
          <g transform="translate(540, 40)">
            <rect x="0" y="0" width="200" height="320" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
            <text x="100" y="30" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="750">P 型矽 (摻雜硼 B⁻)</text>
            <text x="100" y="48" text-anchor="middle" fill="#fbbf24" font-size="10">受體摻雜 · 電洞多數載子</text>

            <rect x="20" y="70" width="160" height="45" fill="#0284c7" opacity="0.6"/>
            <line x1="20" y1="115" x2="180" y2="115" stroke="#38bdf8" stroke-width="2"/>
            <text x="30" y="105" fill="#ffffff" font-size="11" font-weight="700">Ec 傳導帶底</text>

            <!-- 受體能階 Ea 與向下沉降的費米能階 EF -->
            <line x1="20" y1="210" x2="180" y2="210" stroke="#fbbf24" stroke-width="2"/>
            <text x="100" y="200" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">EF ⇓ 沉降貼近 Ev</text>

            <line x1="20" y1="220" x2="180" y2="220" stroke="#34d399" stroke-width="1.5" stroke-dasharray="2 2"/>
            <text x="140" y="230" fill="#34d399" font-size="9.5">Ea 受體階</text>

            <rect x="20" y="235" width="160" height="45" fill="#ea580c" opacity="0.6"/>
            <line x1="20" y1="235" x2="180" y2="235" stroke="#f97316" stroke-width="2"/>
            <text x="30" y="255" fill="#ffffff" font-size="11" font-weight="700">Ev 價帶頂</text>

            <text x="100" y="300" text-anchor="middle" fill="#fbbf24" font-size="10.5">容易吸納電子產生電洞導電</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 180,210 L 620,210" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="8 5" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="290" x2="400" y2="120" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 4" class="anim-beam" opacity="0.7"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch02_metric_bandgap}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">1.12 eV</div>
          <div class="eng-obj-metric-note">矽材料決定了 0.7V 導通門檻與高溫穩定性</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">熱電壓 (Thermal Voltage kT)</div>
          <div class="eng-obj-metric-value">25.9 meV (@ 300K)</div>
          <div class="eng-obj-metric-note">決定載子波茲曼分佈與次臨界擺幅理論極限</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">本質載子濃度 (ni)</div>
          <div class="eng-obj-metric-value">1.0 × 10¹⁰ cm⁻³</div>
          <div class="eng-obj-metric-note">摻雜濃度 10¹⁶ ~ 10²⁰ 徹底主導材料導電度</div>
        </div>
      `;

      footerNote = t.ch02_band_desc;
    } else if (activeTab === 'pn') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PN Junction Depletion Region and Built-in Electric Field">
          <!-- PN 接面整體主體結構 -->
          <g transform="translate(100, 50)">
            <!-- P 區主體 (左側: 大量電洞多數載子) -->
            <rect x="0" y="0" width="220" height="240" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
            <text x="110" y="40" text-anchor="middle" fill="#fbbf24" font-size="16" font-weight="800">P 區 (P-type)</text>
            <text x="110" y="65" text-anchor="middle" fill="#94a3b8" font-size="11">多數載子: 電洞 (h⁺)</text>
            <!-- 電洞圓圈示意 -->
            ${Array.from({ length: 8 }, (_, i) => `
              <circle cx="${(i % 3) * 50 + 40}" cy="${Math.floor(i / 3) * 45 + 100}" r="10" fill="#f59e0b"/>
              <text x="${(i % 3) * 50 + 40}" y="${Math.floor(i / 3) * 45 + 104}" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">+</text>
            `).join('')}

            <!-- N 區主體 (右側: 大量電子多數載子) -->
            <rect x="380" y="0" width="220" height="240" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
            <text x="490" y="40" text-anchor="middle" fill="#38bdf8" font-size="16" font-weight="800">N 區 (N-type)</text>
            <text x="490" y="65" text-anchor="middle" fill="#94a3b8" font-size="11">多數載子: 電子 (e⁻)</text>
            <!-- 電子圓圈示意 -->
            ${Array.from({ length: 8 }, (_, i) => `
              <circle cx="${(i % 3) * 50 + 420}" cy="${Math.floor(i / 3) * 45 + 100}" r="10" fill="#0ea5e9"/>
              <text x="${(i % 3) * 50 + 420}" y="${Math.floor(i / 3) * 45 + 103}" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">-</text>
            `).join('')}

            <!-- 中間空間電荷區 (空乏區 Depletion Region: W ~ 0.3µm) -->
            <rect x="220" y="0" width="160" height="240" fill="#09131b" stroke="#ef4444" stroke-width="2"/>
            <text x="300" y="30" text-anchor="middle" fill="#f87171" font-size="12" font-weight="750">空乏區 (Depletion)</text>
            <text x="300" y="48" text-anchor="middle" fill="#94a3b8" font-size="9.5">載子耗盡 · 裸露不可移動離子</text>

            <!-- 左側帶負電的受體離子 NA- -->
            ${[90, 150, 210].map(y => `
              <circle cx="255" cy="${y}" r="12" fill="#334155" stroke="#f87171" stroke-width="1.5"/>
              <text x="255" y="${y + 4}" text-anchor="middle" fill="#f87171" font-size="11" font-weight="800">-</text>
            `).join('')}

            <!-- 右側帶正電的施體離子 ND+ -->
            ${[90, 150, 210].map(y => `
              <circle cx="345" cy="${y}" r="12" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="345" y="${y + 4}" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="800">+</text>
            `).join('')}

            <!-- 內建電場向量 Ebi (由正離子指向負離子 ←) -->
            <line x1="330" y1="120" x2="275" y2="120" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow)"/>
            <text x="300" y="140" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="800">⇦ 內建電場 Ebi</text>
          </g>

          <!-- 下方電流平衡說明條 -->
          <g transform="translate(160, 320)">
            <rect x="0" y="0" width="480" height="50" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1"/>
            <text x="240" y="24" text-anchor="middle" fill="#34d399" font-size="11.5" font-weight="750">擴散電流 (Diffusion) ⇄ 漂移電流 (Drift) 精確相抵 (Inet = 0)</text>
            <text x="240" y="42" text-anchor="middle" fill="#cbd5e1" font-size="10.5">順偏電壓克服 0.7V 內建能障導通；逆偏擴大空乏區杜絕漏電</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 180,210 L 620,210" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="8 5" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="290" x2="400" y2="120" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 4" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch02_metric_built_in}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">~ 0.7 V</div>
          <div class="eng-obj-metric-note">矽二極體與 PN 接面導通能障</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">空乏區內部電場</div>
          <div class="eng-obj-metric-value">&gt; 10⁵ V/cm</div>
          <div class="eng-obj-metric-note">強大微觀靜電場阻止載子進一步擴散</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">接面電容效應 (Cj)</div>
          <div class="eng-obj-metric-value">~ 0.5 fF/µm²</div>
          <div class="eng-obj-metric-note">隨逆向偏壓增加而降低寄生電容</div>
        </div>
      `;

      footerNote = t.ch02_pn_desc;
    } else if (activeTab === 'inversion') {
      const vth = 0.35;
      const isCutoff = vgs < vth;
      const vov = Math.max(0, vgs - vth);
      const isSat = !isCutoff && (vds >= vov);
      const modeName = isCutoff 
        ? (lang === 'en' ? 'Cutoff (Subthreshold)' : '截止區 (次臨界漏電)')
        : (isSat 
            ? (lang === 'en' ? 'Saturation (Pinch-off)' : '飽和區 (通道端夾斷)')
            : (lang === 'en' ? 'Linear (Triode Conduction)' : '線性區 (歐姆連續導通)'));
      const modeColor = isCutoff ? '#ef4444' : (isSat ? '#f59e0b' : '#10b981');

      let idVal = 0;
      if (isCutoff) {
        idVal = 0.0002 * Math.exp((vgs - vth) / 0.07) * (1 - Math.exp(-vds / 0.026));
      } else if (isSat) {
        idVal = 0.85 * Math.pow(vov, 2) * (1 + 0.08 * vds);
      } else {
        idVal = 1.7 * (vov * vds - 0.5 * Math.pow(vds, 2));
      }
      const idStr = idVal < 0.001 ? '< 0.001' : idVal.toFixed(3);
      const gmStr = isCutoff ? '0.00' : (isSat ? (1.7 * vov).toFixed(2) : (1.7 * vds).toFixed(2));
      const channelThick = isCutoff ? 0 : Math.min(18, Math.max(3, Math.round(4 + vov * 14)));
      const pinchLen = Math.min(65, Math.max(16, Math.round(18 + (vds - vov) * 55)));

      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch02Vgs">${t.physics_slider_vgs}</label>
            <input type="range" class="eng-obj-range-input" id="ch02Vgs" min="0.00" max="1.20" step="0.05" value="${vgs}">
            <span class="eng-obj-slider-val">${vgs.toFixed(2)} V</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch02Vds">${t.physics_slider_vds}</label>
            <input type="range" class="eng-obj-range-input" id="ch02Vds" min="0.00" max="1.00" step="0.05" value="${vds}">
            <span class="eng-obj-slider-val">${vds.toFixed(2)} V</span>
          </div>
        </div>
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MOSFET Strong Inversion Channel Physics Model">
          <!-- MOSFET 橫截面主體 (MOS Structure with Inversion Layer) -->
          <g transform="translate(120, 35)">
            <!-- 頂部金屬閘極 (Gate Electrode @ VG) -->
            <rect x="180" y="20" width="200" height="40" fill="#334155" stroke="${isCutoff ? '#94a3b8' : '#f59e0b'}" stroke-width="2" rx="3"/>
            <text x="280" y="45" text-anchor="middle" fill="${isCutoff ? '#94a3b8' : '#fbbf24'}" font-size="13" font-weight="750">金屬閘極 (Gate: V_GS = ${vgs.toFixed(2)}V)</text>

            <!-- 閘極介電層 (High-k Dielectric: 1.5nm HfO2) -->
            <rect x="180" y="60" width="200" height="15" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="280" y="72" text-anchor="middle" fill="#ffffff" font-size="9.5" font-weight="700">氧化鉿介電薄膜 (1.5nm High-k)</text>

            <!-- 強反轉導電通道 (動態繪製厚度與夾斷形狀) -->
            ${isCutoff ? `
              <line x1="180" y1="80" x2="380" y2="80" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
              <text x="280" y="96" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">無反轉導電層 (V_GS &lt; Vth=0.35V 截止無通道)</text>
            ` : (isSat ? `
              <path d="M 180,75 L 380,75 L ${380 - pinchLen},77 L 180,${75 + channelThick} Z" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5" opacity="0.95"/>
              <text x="270" y="86" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="800">夾斷反轉層 (Pinch-off Channel)</text>
              <line x1="${380 - pinchLen}" y1="65" x2="${380 - pinchLen}" y2="92" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2 2"/>
              <text x="${380 - pinchLen + 4}" y="68" fill="#ef4444" font-size="8.5" font-weight="700" data-ink="halo">夾斷點</text>
            ` : `
              <rect x="180" y="75" width="200" height="${channelThick}" fill="#10b981" stroke="#34d399" stroke-width="1.5"/>
              <text x="280" y="${80 + Math.round(channelThick/2)}" text-anchor="middle" fill="#ffffff" font-size="9.5" font-weight="800">強反轉導電通道 (${channelThick}nm)</text>
            `)}

            <!-- 下方 P 型矽基板 (P-Substrate) 與空乏層 -->
            <rect x="0" y="93" width="560" height="174" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>

            <!-- 兩側 N+ 源極與汲極 (Source & Drain) -->
            <rect x="20" y="93" width="160" height="70" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" rx="2"/>
            <text x="100" y="136" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">源極 N⁺ (Source: 0V)</text>

            <rect x="380" y="93" width="160" height="70" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" rx="2"/>
            <text x="460" y="136" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">汲極 N⁺ (Drain: ${vds.toFixed(2)}V)</text>

            <text x="280" y="210" text-anchor="middle" fill="#94a3b8" font-size="13">P 型矽基板 (P-Type Silicon Substrate)</text>
            <text x="280" y="235" text-anchor="middle" fill="${modeColor}" font-size="11.5" font-weight="700">${isCutoff ? '⇦ 截止無載子電流 ⇨' : (isSat ? '⇦ 飽和區載子高速漂移飽和電流 I_D,sat ⇨' : '⇦ 電子在反轉通道中線性導通 ⇨')}</text>
          </g>

          <!-- 即時狀態指示橫條 -->
          <g transform="translate(160, 335)">
            <rect x="0" y="0" width="480" height="45" rx="4" fill="#0f172a" stroke="${modeColor}" stroke-width="1.5"/>
            <text x="240" y="20" text-anchor="middle" fill="${modeColor}" font-size="12" font-weight="750">狀態：${modeName} · I_D = ${idStr} mA/μm</text>
            <text x="240" y="36" text-anchor="middle" fill="#cbd5e1" font-size="10">${isCutoff ? '閘極電壓不足，表面未反轉' : (isSat ? '汲極電壓超過夾斷界限 V_DS ≥ V_ov，電流受橫向飽和速度限制' : '閘極產生均勻反轉層，電晶體呈歐姆線性導通')}</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 180,210 L 620,210" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="8 5" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="290" x2="400" y2="120" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 4" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">工作區間 (Mode)</div>
          <div class="eng-obj-metric-value" style="color: ${modeColor}; font-size: 15px;">${modeName}</div>
          <div class="eng-obj-metric-note">${isCutoff ? 'V_GS < Vth 截止' : (isSat ? 'V_DS ≥ V_ov 夾斷' : 'V_DS < V_ov 線性')}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">汲極電流 (I_D)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${idStr} mA/μm</div>
          <div class="eng-obj-metric-note">導通通道載子流</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">過驅電壓 (V_ov)</div>
          <div class="eng-obj-metric-value">${vov.toFixed(2)} V</div>
          <div class="eng-obj-metric-note">V_GS - Vth (Vth = 0.35V)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">跨導 (g_m)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${gmStr} mS/μm</div>
          <div class="eng-obj-metric-note">閘極對電流調控靈敏度</div>
        </div>
      `;

      footerNote = t.ch02_inversion_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh02Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 02</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh02Title">${t.ch02_title}</h2>
          <p class="eng-obj-subtitle">${t.ch02_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'band' ? 'is-active' : ''}" data-tab="band">${t.ch02_tab_band}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'pn' ? 'is-active' : ''}" data-tab="pn">${t.ch02_tab_pn}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'inversion' ? 'is-active' : ''}" data-tab="inversion">${t.ch02_tab_inversion}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Bandgap, Multi-Vt & Power Clauses' : '能隙、Multi-Vt 與功耗物理條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'Si/SiC/GaN · Multi-Vt · C·V²·f' : 'Si/SiC/GaN · Multi-Vt · C·V²·f'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Si/SiGe/SiC/GaN bandgaps, ULVT–HVT 60mV/dec limit & dynamic/leakage power' : 'Si/SiGe/SiC/GaN 能隙、ULVT~HVT 次臨界擺幅 60mV/dec 與動態/靜態功耗公式'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Subthreshold & Tunneling Law' : '次臨界擺幅與穿隧定律 (Device Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'SS ≥ 59.6 mV/dec · EOT = t·(3.9/k)' : 'SS ≥ 59.6 mV/dec · EOT = t·(3.9/k)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? '300K Boltzmann limit & High-k HfO₂ 10⁴× tunneling reduction' : '300K 波茲曼熱力學極限與 High-k HfO₂ 抑制量子穿隧 10⁴ 倍'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'DIBL · Pelgrom RDF · GIDL/Latch-up' : 'DIBL · Pelgrom RDF · GIDL/Latch-up'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Diagnoses DIBL punch-through, RDF Vt mismatch & PNPN CMOS latch-up' : '診斷短通道穿通漏電、無摻雜通道抑制 RDF 失配與保護環防閂鎖燒毀'}</div>
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

    const vgsInput = container.querySelector('#ch02Vgs');
    if (vgsInput) {
      bindEngineeringEvent(vgsInput, 'input', e => {
        vgs = parseFloat(e.target.value);
        update();
      });
    }

    const vdsInput = container.querySelector('#ch02Vds');
    if (vdsInput) {
      bindEngineeringEvent(vdsInput, 'input', e => {
        vds = parseFloat(e.target.value);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 19. Ch 20 引線鍵合 (Wire Bonding)、覆晶 C4 凸塊與底部填充膠模型 (Packaging Flow)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderSemiconductorPhysicsObject as render };
