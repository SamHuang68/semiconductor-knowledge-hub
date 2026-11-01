import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderReliabilityTestingObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  const l = (zh, en) => lang === 'en' ? en : zh;
  let activeTab = 'bathtub'; // 'bathtub' | 'burnin' | 'esd'
  let stressTemp = 125;      // 85 ~ 175 °C
  let activationEa = 0.70;   // 0.3 ~ 1.1 eV

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'bathtub') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bathtub Hazard Rate Curve and Burn-in Truncation">
          <!-- 浴缸曲線繪圖區 -->
          <g transform="translate(80, 40)">
            <rect x="0" y="0" width="640" height="300" fill="#0f172a" stroke="#334155" stroke-width="1.5" rx="6"/>

            <!-- 座標軸 -->
            <line x1="40" y1="260" x2="600" y2="260" stroke="#64748b" stroke-width="2"/>
            <text x="600" y="285" text-anchor="end" fill="#94a3b8" font-size="11">${l(`時間 t`, `Time t`)}</text>

            <line x1="40" y1="260" x2="40" y2="30" stroke="#64748b" stroke-width="2"/>
            <text x="35" y="20" fill="#94a3b8" font-size="11">${l(`失效率 λ(t)`, `Hazard λ(t)`)}</text>

            <!-- 經典浴缸曲線 (Bathtub Curve) -->
            <path d="M 60,60 Q 120,220 180,220 L 460,220 Q 520,220 580,60" fill="none" stroke="#38bdf8" stroke-width="3.5"/>

            <!-- 區域 1: 早期失效期 (Infant Mortality) -->
            <rect x="40" y="30" width="140" height="230" fill="#ef4444" opacity="0.15"/>
            <text x="110" y="55" text-anchor="middle" fill="#f87171" font-size="11" font-weight="750">${l(`1. 早期失效`, `1. Early failures`)}</text>
            <text x="110" y="75" text-anchor="middle" fill="#f87171" font-size="9.5">${l(`（缺陷示意）`, `(Defect illustration)`)}</text>

            <!-- 預燒篩截標註 (Burn-In Truncation Cutoff Line) -->
            <line x1="160" y1="30" x2="160" y2="260" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
            <text x="160" y="140" fill="#fbbf24" font-size="10.5" font-weight="800" transform="rotate(-90 160 140)">${l(`⇦ 預燒篩選示意`, `⇦ Burn-in screen`)}</text>

            <!-- 區域 2: 正常使用期 (Useful Life) -->
            <rect x="180" y="30" width="280" height="230" fill="#10b981" opacity="0.15"/>
            <text x="320" y="55" text-anchor="middle" fill="#34d399" font-size="11.5" font-weight="750">${l(`2. 正常使用期`, `2. Useful life`)}</text>
            <text x="320" y="75" text-anchor="middle" fill="#34d399" font-size="10">${l(`近似穩定區（非量測）`, `Stable region (illustrative)`)}</text>

            <!-- 區域 3: 磨損老化期 (Wear-out) -->
            <rect x="460" y="30" width="140" height="230" fill="#8b5cf6" opacity="0.15"/>
            <text x="530" y="55" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="750">${l(`3. 磨損老化期`, `3. Wear-out`)}</text>
            <text x="530" y="75" text-anchor="middle" fill="#a78bfa" font-size="9.5">${l(`（TDDB／電遷移）`, `(TDDB / EM)`)}</text>
          </g>

          <text x="400" y="375" text-anchor="middle" fill="#fbbf24" font-size="11.5" font-weight="750">${l(`預燒可篩出部分早期缺陷；效果取決於失效機制與應力條件，不保證零失效。`, `Burn-in can screen early defects; effectiveness depends on mechanism and stress, not a zero-failure guarantee.`)}</text>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch22_metric_fit}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&lt; 10 FIT</div>
          <div class="eng-obj-metric-note">${l(`1 FIT = 每 10⁹ 元件小時 1 次失效；上方為示例`, `1 FIT = 1 failure per 10⁹ device-hours; value above is illustrative`)}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${l(`定常失效率倒數示例`, `Constant-hazard reciprocal example`)}</div>
          <div class="eng-obj-metric-value">${l(`&gt; 1.0 × 10⁸ 小時`, `&gt; 1.0 × 10⁸ hours`)}</div>
          <div class="eng-obj-metric-note">${l(`由 &lt; 10 FIT 假設換算，非產品壽命或 AEC 要求`, `Derived from the &lt; 10 FIT assumption; not product life or an AEC requirement`)}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${l(`預燒篩選範圍`, `Burn-in screening scope`)}</div>
          <div class="eng-obj-metric-value">${l(`依機制與條件`, `Mechanism-dependent`)}</div>
          <div class="eng-obj-metric-note">${l(`降低早期缺陷風險，不代表所有缺陷都能篩除`, `Reduces early-defect risk; does not screen every defect`)}</div>
        </div>
      `;

      footerNote = t.ch22_bathtub_desc;
    } else if (activeTab === 'burnin') {
      const kB = 8.617333262145e-5;
      const Tuse = 55 + 273.15;
      const Tstress = stressTemp + 273.15;
      const tempAF = Math.exp((activationEa / kB) * (1 / Tuse - 1 / Tstress));
      const voltAF = 1.69;
      const totalAF = Math.max(1, Math.round(tempAF * voltAF));
      const equivDays = Math.round((48 * totalAF) / 24);
      const equivYears = (equivDays / 365).toFixed(equivDays / 365 < 0.1 ? 2 : 1);

      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch22Temp">${t.physics_slider_temp}</label>
            <input type="range" class="eng-obj-range-input" id="ch22Temp" min="85" max="175" step="5" value="${stressTemp}">
            <span class="eng-obj-slider-val">${stressTemp}°C</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch22Ea">${t.physics_slider_ea}</label>
            <input type="range" class="eng-obj-range-input" id="ch22Ea" min="0.30" max="1.10" step="0.05" value="${activationEa}">
            <span class="eng-obj-slider-val">${activationEa.toFixed(2)} eV</span>
          </div>
          <div style="font-size: 11.5px; color: #92400e; margin-left: auto;">
            ${l(`總 AF`, `Total AF`)} = <strong style="color: #075985; font-size: 13.5px;">${totalAF.toLocaleString()}×</strong>
          </div>
        </div>
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Burn-in Chamber and Arrhenius Acceleration Formula">
          <!-- 高溫預燒爐 (Burn-In Chamber @ stressTemp) -->
          <g transform="translate(80, 40)">
            <rect x="0" y="0" width="300" height="320" fill="#0f172a" stroke="#ef4444" stroke-width="2" rx="6"/>
            <text x="150" y="32" text-anchor="middle" fill="#f87171" font-size="13" font-weight="750">${l(`高溫預燒爐示意`, `Burn-in chamber schematic`)}</text>
            <text x="150" y="52" text-anchor="middle" fill="#f59e0b" font-size="11">${l(`示例應力：${stressTemp}°C · 1.3× Vdd`, `Example stress: ${stressTemp}°C · 1.3× Vdd`)}</text>

            <!-- 預燒插槽板陣列 (Burn-In Boards BIB) -->
            ${Array.from({ length: 4 }, (_, r) => 
              Array.from({ length: 4 }, (_, c) => `
                <rect x="${c * 60 + 35}" y="${r * 55 + 75}" width="45" height="38" rx="2" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" class="anim-heat"/>
                <text x="${c * 60 + 57}" y="${r * 55 + 98}" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">IC</text>
              `).join('')
            ).join('')}
          </g>

          <!-- 右側：Arrhenius 方程式與加速因子 (Acceleration Factor) -->
          <g transform="translate(420, 40)">
            <rect x="0" y="0" width="320" height="320" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" rx="6"/>
            <text x="160" y="32" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${l(`Arrhenius 溫度加速`, `Arrhenius temperature model`)}</text>

            <g transform="translate(20, 65)">
              <rect x="0" y="0" width="280" height="70" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="140" y="17" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="800">${l(`熱 AF`, `Thermal AF`)} = exp[(Ea/k)·(1/Tuse - 1/Tstress)]</text>
              <text x="140" y="35" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${l(`總 AF = 熱 AF × 1.69（假設）`, `Total AF = Thermal AF × 1.69 (assumed)`)}</text>
              <text x="140" y="52" text-anchor="middle" fill="#94a3b8" font-size="10.5">Ea = ${activationEa.toFixed(2)} eV · Tstress = ${stressTemp}°C</text>
            </g>

            <g transform="translate(20, 155)">
              <rect x="0" y="0" width="280" height="135" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
              <text x="14" y="25" fill="#34d399" font-size="11.5" font-weight="750">${l(`教學模型等效換算：`, `Teaching-model equivalence:`)}</text>
              <text x="14" y="50" fill="#cbd5e1" font-size="11">${l(`• 參考使用溫度：55°C`, `• Reference use temperature: 55°C`)}</text>
              <text x="14" y="70" fill="#cbd5e1" font-size="11">${l(`• 應力示例：${stressTemp}°C + 1.3× 電壓`, `• Example stress: ${stressTemp}°C + 1.3× voltage`)}</text>
              <text x="14" y="95" fill="#fbbf24" font-size="12" font-weight="800">${l(`示例總 AF ≈ ${totalAF.toLocaleString()} 倍`, `Example total AF ≈ ${totalAF.toLocaleString()}×`)}</text>
              <text x="14" y="118" fill="#38bdf8" font-size="10.5">${l(`48 小時 → 模型 ${equivDays.toLocaleString()} 天（${equivYears} 年）`, `48 h → modeled ${equivDays.toLocaleString()} days (${equivYears} y)`)}</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch22_metric_af}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${l(`${totalAF.toLocaleString()} 倍`, `${totalAF.toLocaleString()}×`)}</div>
          <div class="eng-obj-metric-note">${l(`溫度 AF × 1.69；1.3² 為未校準電壓假設`, `Thermal AF × 1.69; 1.3² is an uncalibrated voltage assumption`)}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${l(`模型等效時間`, `Modeled equivalent duration`)}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${l(`${equivYears} 年`, `${equivYears} years`)}</div>
          <div class="eng-obj-metric-note">${l(`48 小時應力示例；非保證壽命或通用預燒規範`, `48-hour stress example; not guaranteed life or a universal burn-in recipe`)}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${l(`缺陷活化能 Ea`, `Activation energy Ea`)}</div>
          <div class="eng-obj-metric-value">${activationEa.toFixed(2)} eV</div>
          <div class="eng-obj-metric-note">${l(`須按材料與失效機制量測；此滑桿為教學輸入`, `Must be characterized for the material and failure mechanism; illustrative input`)}</div>
        </div>
      `;

      footerNote = t.ch22_burnin_desc;
    } else if (activeTab === 'esd') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ESD Protection GGNMOS Clamp Circuit">
          <!-- ESD 衝擊與箝位電路圖 -->
          <g transform="translate(100, 50)">
            <rect x="0" y="0" width="600" height="300" fill="#0f172a" stroke="#ef4444" stroke-width="2" rx="6"/>
            <text x="300" y="32" text-anchor="middle" fill="#f87171" font-size="13" font-weight="750">${l(`晶片 I/O ESD 箝位原理示意`, `Chip I/O ESD clamp schematic`)}</text>

            <!-- 外部引腳受到 2000V 靜電脈衝襲擊 (HBM Strike) -->
            <g transform="translate(30, 80)">
              <rect x="0" y="20" width="80" height="50" rx="3" fill="#ef4444"/>
              <text x="40" y="45" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">I/O Pad</text>
              <text x="40" y="60" text-anchor="middle" fill="#ffffff" font-size="9">${l(`引腳焊墊`, `Bond pad`)}</text>
              <!-- 閃電打擊符號 -->
              <polygon points="10,-20 30,-20 18,5 35,5 5,40 15,12 2,12" fill="#fbbf24"/>
              <text x="45" y="-5" fill="#f59e0b" font-size="12" font-weight="800">${l(`⚡ 2,000 V HBM 示例`, `⚡ 2,000 V HBM example`)}</text>
            </g>

            <!-- GGNMOS 箝位電晶體 (Gate-Grounded NMOS Clamp) -->
            <g transform="translate(230, 80)">
              <rect x="0" y="0" width="140" height="130" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
              <text x="70" y="25" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">${l(`GGNMOS 箝位器`, `GGNMOS clamp`)}</text>
              <text x="70" y="45" text-anchor="middle" fill="#94a3b8" font-size="9.5">${l(`雪崩觸發寄生 BJT`, `Avalanche triggers BJT`)}</text>
              <!-- 大電流洩放箭頭向下 -->
              <path d="M 70,60 L 70,115" stroke="#ef4444" stroke-width="4" marker-end="url(#arrow)"/>
              <text x="70" y="90" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="800">${l(`瞬態電流洩放 ⇓`, `Transient current ⇓`)}</text>
            </g>

            <!-- 接地線 (GND) -->
            <line x1="200" y1="240" x2="400" y2="240" stroke="#64748b" stroke-width="3"/>
            <text x="300" y="260" text-anchor="middle" fill="#cbd5e1" font-size="11">${l(`箝位電流路徑至 GND`, `Clamp-current path to GND`)}</text>

            <!-- 右側被保護的脆弱內部核心電晶體 (Protected Core Gate Oxide) -->
            <g transform="translate(430, 80)">
              <rect x="0" y="0" width="140" height="130" rx="4" fill="#09131b" stroke="#10b981" stroke-width="2"/>
              <text x="70" y="25" text-anchor="middle" fill="#34d399" font-size="11" font-weight="750">${l(`內部核心電晶體`, `Core transistor`)}</text>
              <text x="70" y="45" text-anchor="middle" fill="#38bdf8" font-size="9.5">${l(`1.5 nm 氧化層示例`, `1.5 nm oxide example`)}</text>
              <circle cx="70" cy="85" r="24" fill="#10b981" opacity="0.3"/>
              <text x="70" y="90" text-anchor="middle" fill="#34d399" font-size="11" font-weight="800">${l(`保護須實測驗證`, `Verify protection`)}</text>
              <text x="70" y="115" text-anchor="middle" fill="#cbd5e1" font-size="9.5">${l(`&lt; 5 V：示例，非保證`, `&lt; 5 V: example only`)}</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch22_metric_esd_level}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 2,000 V (HBM)</div>
          <div class="eng-obj-metric-note">${l(`示例值；實際 HBM 等級須依 JS-001 測試`, `Illustrative value; actual HBM class requires JS-001 testing`)}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${l(`箝位響應時間示例`, `Clamp-response example`)}</div>
          <div class="eng-obj-metric-value">${l(`&lt; 0.5 ns（示例）`, `&lt; 0.5 ns (example)`)}</div>
          <div class="eng-obj-metric-note">${l(`未綁定元件資料；響應取決於結構與寄生效應`, `No device data supplied; response depends on structure and parasitics`)}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${l(`靜態漏電示例`, `Quiescent-leakage example`)}</div>
          <div class="eng-obj-metric-value">&lt; 1.0 nA</div>
          <div class="eng-obj-metric-note">${l(`示例 &lt; 1.0 nA，非實測或通用規格`, `Illustrative &lt; 1.0 nA, not measured or a universal specification`)}</div>
        </div>
      `;

      footerNote = t.ch22_esd_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh22Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 22</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh22Title">${t.ch22_title}</h2>
          <p class="eng-obj-subtitle">${t.ch22_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="group" aria-label="${l('可靠度主題', 'Reliability topic')}">
            <button type="button" class="eng-obj-tab ${activeTab === 'bathtub' ? 'is-active' : ''}" data-tab="bathtub" aria-pressed="${activeTab === 'bathtub'}">${t.ch22_tab_bathtub}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'burnin' ? 'is-active' : ''}" data-tab="burnin" aria-pressed="${activeTab === 'burnin'}">${t.ch22_tab_burnin}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'esd' ? 'is-active' : ''}" data-tab="esd" aria-pressed="${activeTab === 'esd'}">${t.ch22_tab_esd}</button>
          </div>
        </div>

        ${controlsHtml}

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Qualification topics (check applicable revision)' : '驗證主題（須查適用版次）'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'HTOL · TC · HAST · MSL · WLR' : 'HTOL · TC · HAST · MSL · WLR'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'JESD22 HTOL, -65~150°C TC, HAST, J-STD-020 MSL reflow & TDDB/BTI/HCI/EM' : 'JESD22 高溫壽命、-65~150°C 溫循、HAST 溫濕偏壓、J-STD-020 與 TDDB/BTI/EM'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Weibull Bathtub & Arrhenius-Peck FIT Law' : 'Weibull 浴缸與 Peck/FIT 卡方律 (Rel Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'F(t)=1-e^-(t/η)^β · FIT = χ²/(2·N·t·AF)×10⁹' : 'F(t)=1-e^-(t/η)^β · FIT = χ²/(2·N·t·AF)×10⁹'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'FIT bounds need sample exposure, failures, confidence and a validated acceleration model' : 'FIT 上限需要樣本時數、失效數、信賴度與經驗證的加速模型'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'WLBI/SLT · D₂ NBTI · CDM Rail-Clamp' : 'WLBI/SLT · D₂ NBTI · CDM Rail-Clamp'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Screens infant mortality via Burn-in/SLT, D₂ anneal for NBTI & CDM ESD clamps' : '高壓老化與 SLT 攔截早夭期缺陷、重氫退火抗 NBTI 老化與 CDM 高速靜電防護'}</div>
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
        const restoreFocus = btn === btn.ownerDocument.activeElement;
        activeTab = btn.getAttribute('data-tab');
        update();
        if (restoreFocus) container.querySelector(`[data-tab="${activeTab}"]`)?.focus();
      });
    });

    const tempSlider = container.querySelector('#ch22Temp');
    if (tempSlider) {
      bindEngineeringEvent(tempSlider, 'input', (e) => {
        const restoreFocus = e.target === e.target.ownerDocument.activeElement;
        stressTemp = parseInt(e.target.value, 10);
        update();
        if (restoreFocus) container.querySelector('#ch22Temp')?.focus();
      });
    }
    const eaSlider = container.querySelector('#ch22Ea');
    if (eaSlider) {
      bindEngineeringEvent(eaSlider, 'input', (e) => {
        const restoreFocus = e.target === e.target.ownerDocument.activeElement;
        activationEa = parseFloat(e.target.value);
        update();
        if (restoreFocus) container.querySelector('#ch22Ea')?.focus();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 21. Ch 00 晶片的一生：從沙子到智慧手機的宏觀時空全景旅程模型 (The Chip's Life)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderReliabilityTestingObject as render };
