import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderSemiconductorPhysicsObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  const tx = (zh, en) => lang === 'en' ? en : zh;
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
            <text x="100" y="30" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${tx("本質矽", "Intrinsic silicon")}</text>
            <text x="100" y="48" text-anchor="middle" fill="#94a3b8" font-size="10">${tx("未摻雜示意 · 非純度規格", "Undoped schematic")}</text>

            <!-- 傳導帶 (Conduction Band Ec) -->
            <rect x="20" y="70" width="160" height="45" fill="#0284c7" opacity="0.6"/>
            <line x1="20" y1="115" x2="180" y2="115" stroke="#38bdf8" stroke-width="2"/>
            <text x="30" y="105" fill="#ffffff" font-size="11" font-weight="700">${tx("Ec 傳導帶底", "Ec conduction-band edge")}</text>

            <!-- 費米能階 EF (正中央) -->
            <line x1="20" y1="175" x2="180" y2="175" stroke="#fbbf24" stroke-width="1.8" stroke-dasharray="4 2"/>
            <text x="100" y="168" text-anchor="middle" fill="#fbbf24" font-size="10.5" font-weight="700">${tx("EF = Ei 本質費米能階", "EF = Ei (intrinsic level)")}</text>

            <!-- 價帶 (Valence Band Ev) -->
            <rect x="20" y="235" width="160" height="45" fill="#ea580c" opacity="0.6"/>
            <line x1="20" y1="235" x2="180" y2="235" stroke="#f97316" stroke-width="2"/>
            <text x="30" y="255" fill="#ffffff" font-size="11" font-weight="700">${tx("Ev 價帶頂", "Ev valence-band edge")}</text>

            <text x="100" y="210" text-anchor="middle" fill="#94a3b8" font-size="10">${tx("能隙 Eg = 1.12 eV（300 K）", "Eg = 1.12 eV at 300 K")}</text>
          </g>

          <!-- 2. N 型半導體 (N-type: 摻五價磷 P) -->
          <g transform="translate(300, 40)">
            <rect x="0" y="0" width="200" height="320" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5" rx="6"/>
            <text x="100" y="30" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${tx("N 型矽（磷施體）", "N-type Si (P donors)")}</text>
            <text x="100" y="48" text-anchor="middle" fill="#38bdf8" font-size="10">${tx("施體摻雜 · 電子為多數載子", "Donors · majority electrons")}</text>

            <rect x="20" y="70" width="160" height="45" fill="#0284c7" opacity="0.6"/>
            <line x1="20" y1="115" x2="180" y2="115" stroke="#38bdf8" stroke-width="2"/>
            <text x="30" y="105" fill="#ffffff" font-size="11" font-weight="700">${tx("Ec 傳導帶底", "Ec conduction-band edge")}</text>

            <!-- 施體能階 Ed 與向上躍升的費米能階 EF -->
            <line x1="20" y1="130" x2="180" y2="130" stroke="#f87171" stroke-width="1.5" stroke-dasharray="2 2"/>
            <text x="140" y="126" fill="#f87171" font-size="9.5">${tx("Ed 施體階", "Ed donor level")}</text>

            <line x1="20" y1="140" x2="180" y2="140" stroke="#fbbf24" stroke-width="2"/>
            <text x="100" y="155" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">${tx("EF ⇑ 趨近 Ec", "EF ⇑ toward Ec")}</text>

            <rect x="20" y="235" width="160" height="45" fill="#ea580c" opacity="0.6"/>
            <line x1="20" y1="235" x2="180" y2="235" stroke="#f97316" stroke-width="2"/>
            <text x="30" y="255" fill="#ffffff" font-size="11" font-weight="700">${tx("Ev 價帶頂", "Ev valence-band edge")}</text>

            <text x="100" y="300" text-anchor="middle" fill="#38bdf8" font-size="10.5">${tx("電子為主要導電載子", "Electrons carry most current")}</text>
          </g>

          <!-- 3. P 型半導體 (P-type: 摻三價硼 B) -->
          <g transform="translate(540, 40)">
            <rect x="0" y="0" width="200" height="320" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
            <text x="100" y="30" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="750">${tx("P 型矽（硼受體）", "P-type Si (B acceptors)")}</text>
            <text x="100" y="48" text-anchor="middle" fill="#fbbf24" font-size="10">${tx("受體摻雜 · 電洞為多數載子", "Acceptors · majority holes")}</text>

            <rect x="20" y="70" width="160" height="45" fill="#0284c7" opacity="0.6"/>
            <line x1="20" y1="115" x2="180" y2="115" stroke="#38bdf8" stroke-width="2"/>
            <text x="30" y="105" fill="#ffffff" font-size="11" font-weight="700">${tx("Ec 傳導帶底", "Ec conduction-band edge")}</text>

            <!-- 受體能階 Ea 與向下沉降的費米能階 EF -->
            <line x1="20" y1="210" x2="180" y2="210" stroke="#fbbf24" stroke-width="2"/>
            <text x="100" y="200" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">${tx("EF ⇓ 趨近 Ev", "EF ⇓ toward Ev")}</text>

            <line x1="20" y1="220" x2="180" y2="220" stroke="#34d399" stroke-width="1.5" stroke-dasharray="2 2"/>
            <text x="140" y="230" fill="#34d399" font-size="9.5">${tx("Ea 受體階", "Ea acceptor level")}</text>

            <rect x="20" y="235" width="160" height="45" fill="#ea580c" opacity="0.6"/>
            <line x1="20" y1="235" x2="180" y2="235" stroke="#f97316" stroke-width="2"/>
            <text x="30" y="255" fill="#ffffff" font-size="11" font-weight="700">${tx("Ev 價帶頂", "Ev valence-band edge")}</text>

            <text x="100" y="300" text-anchor="middle" fill="#fbbf24" font-size="10.5">${tx("電洞為主要導電載子", "Holes carry most current")}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 180,210 L 620,210" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="8 5" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="290" x2="400" y2="120" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 4" class="anim-beam" opacity="0.7"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch02_metric_bandgap}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">1.12 eV</div>
          <div class="eng-obj-metric-note">${tx("300 K 近似值；接面電壓另受摻雜、溫度與電流影響", "Approximate at 300 K; junction voltage also depends on doping, temperature and current")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("熱能 kT", "Thermal energy kT")}</div>
          <div class="eng-obj-metric-value">25.9 meV (@ 300K)</div>
          <div class="eng-obj-metric-note">${tx("熱電壓為 kT/q ≈ 25.9 mV；此卡顯示能量", "Thermal voltage is kT/q ≈ 25.9 mV; this card shows energy")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("本質載子濃度 ni（300 K 近似）", "Intrinsic concentration ni (300 K approximation)")}</div>
          <div class="eng-obj-metric-value">1.0 × 10¹⁰ cm⁻³</div>
          <div class="eng-obj-metric-note">${tx("摻雜可改變載子濃度；導電度也取決於遷移率與溫度", "Doping changes carrier density; conductivity also depends on mobility and temperature")}</div>
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
            <text x="110" y="40" text-anchor="middle" fill="#fbbf24" font-size="16" font-weight="800">${tx("P 區", "P-type region")}</text>
            <text x="110" y="65" text-anchor="middle" fill="#94a3b8" font-size="11">${tx("多數載子：電洞 h⁺", "Majority carriers: holes h⁺")}</text>
            <!-- 電洞圓圈示意 -->
            ${Array.from({ length: 8 }, (_, i) => `
              <circle cx="${(i % 3) * 50 + 40}" cy="${Math.floor(i / 3) * 45 + 100}" r="10" fill="#f59e0b"/>
              <text x="${(i % 3) * 50 + 40}" y="${Math.floor(i / 3) * 45 + 104}" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">+</text>
            `).join('')}

            <!-- N 區主體 (右側: 大量電子多數載子) -->
            <rect x="380" y="0" width="220" height="240" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
            <text x="490" y="40" text-anchor="middle" fill="#38bdf8" font-size="16" font-weight="800">${tx("N 區", "N-type region")}</text>
            <text x="490" y="65" text-anchor="middle" fill="#94a3b8" font-size="11">${tx("多數載子：電子 e⁻", "Majority carriers: electrons e⁻")}</text>
            <!-- 電子圓圈示意 -->
            ${Array.from({ length: 8 }, (_, i) => `
              <circle cx="${(i % 3) * 50 + 420}" cy="${Math.floor(i / 3) * 45 + 100}" r="10" fill="#0ea5e9"/>
              <text x="${(i % 3) * 50 + 420}" y="${Math.floor(i / 3) * 45 + 103}" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">-</text>
            `).join('')}

            <!-- 中間空間電荷區 (空乏區 Depletion Region: W ~ 0.3µm) -->
            <rect x="220" y="0" width="160" height="240" fill="#09131b" stroke="#ef4444" stroke-width="2"/>
            <text x="300" y="30" text-anchor="middle" fill="#f87171" font-size="12" font-weight="750">${tx("空乏區", "Depletion region")}</text>
            <text x="300" y="48" text-anchor="middle" fill="#94a3b8" font-size="9.5">${tx("移動載子減少 · 固定離子", "Few mobile carriers · fixed ions")}</text>

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
            <text x="300" y="140" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="800">${tx("⇦ 內建電場 Ebi", "⇦ Built-in field Ebi")}</text>
          </g>

          <!-- 下方電流平衡說明條 -->
          <g transform="translate(160, 320)">
            <rect x="0" y="0" width="480" height="50" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1"/>
            <text x="240" y="24" text-anchor="middle" fill="#34d399" font-size="11.5" font-weight="750">${tx("熱平衡：擴散與漂移電流相抵（Inet = 0）", "Equilibrium: diffusion and drift balance (Inet = 0)")}</text>
            <text x="240" y="42" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${tx("順偏降低能障；逆偏擴大空乏區，但仍有漏電", "Forward bias lowers the barrier; reverse bias widens depletion but leakage remains")}</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 180,210 L 620,210" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="8 5" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="290" x2="400" y2="120" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 4" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch02_metric_built_in}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">~ 0.7 V</div>
          <div class="eng-obj-metric-note">${tx("教學示例；內建電位依摻雜與溫度而變，並非固定導通門檻", "Teaching example; built-in potential varies with doping and temperature, not a fixed turn-on threshold")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("空乏區電場示例", "Example depletion-region field")}</div>
          <div class="eng-obj-metric-value">&gt; 10⁵ V/cm</div>
          <div class="eng-obj-metric-note">${tx("示例值，未指定摻雜與偏壓；平衡時漂移抵銷擴散", "Illustrative value without specified doping or bias; drift balances diffusion at equilibrium")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("接面電容示例 Cj", "Example junction capacitance Cj")}</div>
          <div class="eng-obj-metric-value">~ 0.5 fF/µm²</div>
          <div class="eng-obj-metric-note">${tx("示例值；空乏層電容通常隨逆偏增加而減少", "Illustrative value; depletion capacitance generally falls as reverse bias increases")}</div>
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
            <text x="280" y="45" text-anchor="middle" fill="${isCutoff ? '#94a3b8' : '#fbbf24'}" font-size="13" font-weight="750">${tx("金屬閘極", "Metal gate")} · V_GS = ${vgs.toFixed(2)} V</text>

            <!-- 閘極介電層 (High-k Dielectric: 1.5nm HfO2) -->
            <rect x="180" y="60" width="200" height="15" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="280" y="72" text-anchor="middle" fill="#ffffff" font-size="9.5" font-weight="700">${tx("High-k 氧化鉿（1.5 nm 示意）", "HfO₂ high-k (1.5 nm example)")}</text>

            <!-- 強反轉導電通道 (動態繪製厚度與夾斷形狀) -->
            ${isCutoff ? `
              <line x1="180" y1="80" x2="380" y2="80" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>

            ` : (isSat ? `
              <path d="M 180,75 L 380,75 L ${380 - pinchLen},77 L 180,${75 + channelThick} Z" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5" opacity="0.95"/>
              <text x="270" y="86" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="800">${tx("汲極端反轉層夾斷", "Drain-end pinch-off")}</text>
              <line x1="${380 - pinchLen}" y1="65" x2="${380 - pinchLen}" y2="92" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2 2"/>
              <text x="${380 - pinchLen + 4}" y="68" fill="#ef4444" font-size="8.5" font-weight="700" data-ink="halo">${tx("夾斷點", "Pinch-off")}</text>
            ` : `
              <rect x="180" y="75" width="200" height="${channelThick}" fill="#10b981" stroke="#34d399" stroke-width="1.5"/>
              <text x="280" y="${80 + Math.round(channelThick/2)}" text-anchor="middle" fill="#ffffff" font-size="9.5" font-weight="800">${tx("反轉通道（厚度示意）", "Inversion channel (schematic)")}</text>
            `)}

            <!-- 下方 P 型矽基板 (P-Substrate) 與空乏層 -->
            <rect x="0" y="93" width="560" height="174" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>

            <!-- 兩側 N+ 源極與汲極 (Source & Drain) -->
            <rect x="20" y="93" width="160" height="70" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" rx="2"/>
            <text x="100" y="136" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">${tx("N⁺ 源極：0 V", "N⁺ source: 0 V")}</text>

            <rect x="380" y="93" width="160" height="70" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" rx="2"/>
            <text x="460" y="136" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">${tx("N⁺ 汲極", "N⁺ drain")}: ${vds.toFixed(2)} V</text>

            ${isCutoff ? `<text x="280" y="188" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700">${tx("低於強反轉門檻 Vth=0.35V", "Below strong inversion: Vth=0.35V")}</text>` : ''}
            <text x="280" y="210" text-anchor="middle" fill="#94a3b8" font-size="13">${tx("P 型矽基板", "P-type silicon substrate")}</text>
            <text x="280" y="235" text-anchor="middle" fill="${modeColor}" font-size="11.5" font-weight="700">${isCutoff ? tx("⇦ 次臨界區：仍有小漏電 ⇨", "⇦ Subthreshold: small leakage remains ⇨") : (isSat ? tx("⇦ 汲極端夾斷：飽和區 ⇨", "⇦ Drain-end pinch-off: saturation ⇨") : tx("⇦ 反轉通道：線性區 ⇨", "⇦ Inversion channel: linear regime ⇨"))}</text>
          </g>

          <!-- 即時狀態指示橫條 -->
          <g transform="translate(160, 335)">
            <rect x="0" y="0" width="480" height="45" rx="4" fill="#0f172a" stroke="${modeColor}" stroke-width="1.5"/>
            <text x="240" y="20" text-anchor="middle" fill="${modeColor}" font-size="12" font-weight="750">${tx("狀態", "State")}: ${modeName} · I_D = ${idStr} mA/μm</text>
            <text x="240" y="36" text-anchor="middle" fill="#cbd5e1" font-size="10">${isCutoff ? tx("尚未達強反轉；模型保留次臨界電流", "Below strong inversion; the model retains subthreshold current") : (isSat ? tx("V_DS ≥ V_ov：此處採長通道平方律示例", "V_DS ≥ V_ov: a long-channel square-law example") : tx("V_DS < V_ov：此處採線性區模型", "V_DS < V_ov: linear-region model"))}</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 180,210 L 620,210" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="8 5" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="290" x2="400" y2="120" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 4" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("工作區間", "Operating regime")}</div>
          <div class="eng-obj-metric-value" style="color: ${modeColor}; font-size: 15px;">${modeName}</div>
          <div class="eng-obj-metric-note">${isCutoff ? tx("V_GS < Vth：次臨界", "V_GS < Vth: subthreshold") : (isSat ? tx("V_DS ≥ V_ov：夾斷", "V_DS ≥ V_ov: pinch-off") : tx("V_DS < V_ov：線性", "V_DS < V_ov: linear"))}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("汲極電流 I_D（教學模型）", "Drain current I_D (teaching model)")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${idStr} mA/μm</div>
          <div class="eng-obj-metric-note">${tx("未校準的平方律／次臨界示例，非元件規格", "Uncalibrated square-law/subthreshold example, not a device specification")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("過驅電壓 V_ov", "Overdrive V_ov")}</div>
          <div class="eng-obj-metric-value">${vov.toFixed(2)} V</div>
          <div class="eng-obj-metric-note">V_GS - Vth (Vth = 0.35V)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("近似跨導 g_m", "Approximate transconductance g_m")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${gmStr} mS/μm</div>
          <div class="eng-obj-metric-note">${tx("簡化模型近似，未包含所有修正項", "Simplified approximation; not all correction terms are included")}</div>
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
          <div class="eng-obj-tab-group" role="group" aria-label="${tx('工程圖視圖', 'Engineering views')}">
            <button type="button" class="eng-obj-tab ${activeTab === 'band' ? 'is-active' : ''}" data-tab="band" aria-pressed="${activeTab === 'band'}">${t.ch02_tab_band}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'pn' ? 'is-active' : ''}" data-tab="pn" aria-pressed="${activeTab === 'pn'}">${t.ch02_tab_pn}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'inversion' ? 'is-active' : ''}" data-tab="inversion" aria-pressed="${activeTab === 'inversion'}">${t.ch02_tab_inversion}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Bandgap, Multi-Vt & Power' : '能隙、Multi-Vt 與功耗'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'Si/SiC/GaN · Multi-Vt · C·V²·f' : 'Si/SiC/GaN · Multi-Vt · C·V²·f'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Si/SiGe/SiC/GaN bandgaps, ULVT–HVT 60mV/dec limit & dynamic/leakage power' : 'Si/SiGe/SiC/GaN 能隙、ULVT~HVT 次臨界擺幅 60mV/dec 與動態/靜態功耗公式'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Subthreshold & Tunneling Law' : '次臨界擺幅與穿隧定律 (Device Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'SS ≥ 59.6 mV/dec · EOT = t·(3.9/k)' : 'SS ≥ 59.6 mV/dec · EOT = t·(3.9/k)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? '300 K thermionic limit; high-k leakage reduction depends on the gate stack and bias' : '300 K 熱激發極限；高介電常數材料的漏電改善依閘極堆疊與偏壓而變'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'DIBL · Pelgrom RDF · GIDL/Latch-up' : 'DIBL · Pelgrom RDF · GIDL/Latch-up'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Diagnoses DIBL punch-through, RDF Vt mismatch & PNPN CMOS latch-up' : '診斷 DIBL／穿通、RDF 臨界電壓失配與寄生 PNPN 閂鎖'}</div>
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
