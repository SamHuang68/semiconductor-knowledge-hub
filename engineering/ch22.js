import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderReliabilityTestingObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
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
            <text x="610" y="265" fill="#94a3b8" font-size="11">時間 Time (t)</text>

            <line x1="40" y1="260" x2="40" y2="30" stroke="#64748b" stroke-width="2"/>
            <text x="35" y="20" fill="#94a3b8" font-size="11">失效率 λ(t)</text>

            <!-- 經典浴缸曲線 (Bathtub Curve) -->
            <path d="M 60,60 Q 120,220 180,220 L 460,220 Q 520,220 580,60" fill="none" stroke="#38bdf8" stroke-width="3.5"/>

            <!-- 區域 1: 早期失效期 (Infant Mortality) -->
            <rect x="40" y="30" width="140" height="230" fill="#ef4444" opacity="0.15"/>
            <text x="110" y="55" text-anchor="middle" fill="#f87171" font-size="11" font-weight="750">1. 早期失效期</text>
            <text x="110" y="75" text-anchor="middle" fill="#f87171" font-size="9.5">(製造缺陷/微裂痕)</text>

            <!-- 預燒篩截標註 (Burn-In Truncation Cutoff Line) -->
            <line x1="160" y1="30" x2="160" y2="260" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
            <text x="160" y="140" fill="#fbbf24" font-size="10.5" font-weight="800" transform="rotate(-90 160 140)">⇦ 預燒截斷線 (Burn-In Cutoff)</text>

            <!-- 區域 2: 正常使用期 (Useful Life) -->
            <rect x="180" y="30" width="280" height="230" fill="#10b981" opacity="0.15"/>
            <text x="320" y="55" text-anchor="middle" fill="#34d399" font-size="11.5" font-weight="750">2. 正常使用期 (Useful Life)</text>
            <text x="320" y="75" text-anchor="middle" fill="#34d399" font-size="10">恆定超低失效率 (&lt; 10 FIT · 數年)</text>

            <!-- 區域 3: 磨損老化期 (Wear-out) -->
            <rect x="460" y="30" width="140" height="230" fill="#8b5cf6" opacity="0.15"/>
            <text x="530" y="55" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="750">3. 磨損老化期</text>
            <text x="530" y="75" text-anchor="middle" fill="#a78bfa" font-size="9.5">(TDDB / 電遷移壽終)</text>
          </g>

          <text x="400" y="375" text-anchor="middle" fill="#fbbf24" font-size="11.5" font-weight="750">預燒 (Burn-In) 的真諦：在工廠用高溫高壓強迫早期早夭品全數陣亡，確保出廠晶片 100% 落在綠色極低失效率區！</text>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch22_metric_fit}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&lt; 10 FIT</div>
          <div class="eng-obj-metric-note">1 FIT = 10⁹ 晶片小時內發生 1 次失效</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">平均無故障時間 (MTBF)</div>
          <div class="eng-obj-metric-value">&gt; 1.0 × 10⁸ 小時</div>
          <div class="eng-obj-metric-note">車規 AEC-Q100 嚴苛可靠度標準</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">預燒篩除效益</div>
          <div class="eng-obj-metric-value">100% 杜絕早期夭折</div>
          <div class="eng-obj-metric-note">阻擋缺陷晶片流入終端市場引發召回</div>
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
      const equivYears = (equivDays / 365).toFixed(1);

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
          <div style="font-size: 11.5px; color: #f59e0b; margin-left: auto;">
            AF = <strong style="color: #38bdf8; font-size: 13.5px;">${totalAF.toLocaleString()}×</strong>
          </div>
        </div>
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Burn-in Chamber and Arrhenius Acceleration Formula">
          <!-- 高溫預燒爐 (Burn-In Chamber @ stressTemp) -->
          <g transform="translate(80, 40)">
            <rect x="0" y="0" width="300" height="320" fill="#0f172a" stroke="#ef4444" stroke-width="2" rx="6"/>
            <text x="150" y="32" text-anchor="middle" fill="#f87171" font-size="13" font-weight="750">高溫預燒爐 (Burn-In Chamber)</text>
            <text x="150" y="52" text-anchor="middle" fill="#f59e0b" font-size="11">即時應力：${stressTemp}°C · 過電壓 1.3× Vdd</text>

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
            <text x="160" y="32" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">Arrhenius 壽命加速方程式</text>

            <g transform="translate(20, 65)">
              <rect x="0" y="0" width="280" height="70" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="140" y="30" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="800">AF = exp[(Ea/k)·(1/Tuse - 1/Tstress)]</text>
              <text x="140" y="52" text-anchor="middle" fill="#94a3b8" font-size="10.5">Ea = ${activationEa.toFixed(2)} eV · Tstress = ${stressTemp}°C</text>
            </g>

            <g transform="translate(20, 155)">
              <rect x="0" y="0" width="280" height="135" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
              <text x="14" y="25" fill="#34d399" font-size="11.5" font-weight="750">即時加速等效換算 (Live Equivalence):</text>
              <text x="14" y="50" fill="#cbd5e1" font-size="11">• 正常使用環境：55°C</text>
              <text x="14" y="70" fill="#cbd5e1" font-size="11">• 預燒應力環境：${stressTemp}°C + 1.3× 電壓</text>
              <text x="14" y="95" fill="#fbbf24" font-size="12" font-weight="800">總加速因子 AF ≈ ${totalAF.toLocaleString()} 倍！</text>
              <text x="14" y="118" fill="#38bdf8" font-size="10.5">預燒 48 小時 ≡ 正常運轉 ${equivDays.toLocaleString()} 天 (${equivYears} 年)</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch22_metric_af}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${totalAF.toLocaleString()} 倍</div>
          <div class="eng-obj-metric-note">Arrhenius 溫度指數與電壓平方模型</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">等效老化年數</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${equivYears} 年</div>
          <div class="eng-obj-metric-note">預燒 48 小時累積之壽命加速</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">缺陷活化能 Ea</div>
          <div class="eng-obj-metric-value">${activationEa.toFixed(2)} eV</div>
          <div class="eng-obj-metric-note">閘極氧化層與金屬電遷移熱物理障礙</div>
        </div>
      `;

      footerNote = t.ch22_burnin_desc;
    } else if (activeTab === 'esd') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ESD Protection GGNMOS Clamp Circuit">
          <!-- ESD 衝擊與箝位電路圖 -->
          <g transform="translate(100, 50)">
            <rect x="0" y="0" width="600" height="300" fill="#0f172a" stroke="#ef4444" stroke-width="2" rx="6"/>
            <text x="300" y="32" text-anchor="middle" fill="#f87171" font-size="13" font-weight="750">晶片 I/O 引腳 ESD 箝位保護電路 (GGNMOS Protection)</text>

            <!-- 外部引腳受到 2000V 靜電脈衝襲擊 (HBM Strike) -->
            <g transform="translate(30, 80)">
              <rect x="0" y="20" width="80" height="50" rx="3" fill="#ef4444"/>
              <text x="40" y="45" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">I/O Pad</text>
              <text x="40" y="60" text-anchor="middle" fill="#ffffff" font-size="9">引腳焊墊</text>
              <!-- 閃電打擊符號 -->
              <polygon points="10,-20 30,-20 18,5 35,5 5,40 15,12 2,12" fill="#fbbf24"/>
              <text x="45" y="-5" fill="#f59e0b" font-size="12" font-weight="800">⚡ 2,000V ESD 衝擊！</text>
            </g>

            <!-- GGNMOS 箝位電晶體 (Gate-Grounded NMOS Clamp) -->
            <g transform="translate(230, 80)">
              <rect x="0" y="0" width="140" height="130" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
              <text x="70" y="25" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">GGNMOS 箝位器</text>
              <text x="70" y="45" text-anchor="middle" fill="#94a3b8" font-size="9.5">雪崩崩潰觸發寄生 BJT</text>
              <!-- 大電流洩放箭頭向下 -->
              <path d="M 70,60 L 70,115" stroke="#ef4444" stroke-width="4" marker-end="url(#arrow)"/>
              <text x="70" y="90" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="800">幾安培大電流洩放 ⇓</text>
            </g>

            <!-- 接地線 (GND) -->
            <line x1="200" y1="240" x2="400" y2="240" stroke="#64748b" stroke-width="3"/>
            <text x="300" y="260" text-anchor="middle" fill="#cbd5e1" font-size="11">安全旁路至封裝地線 (GND)</text>

            <!-- 右側被保護的脆弱內部核心電晶體 (Protected Core Gate Oxide) -->
            <g transform="translate(430, 80)">
              <rect x="0" y="0" width="140" height="130" rx="4" fill="#09131b" stroke="#10b981" stroke-width="2"/>
              <text x="70" y="25" text-anchor="middle" fill="#34d399" font-size="11" font-weight="750">核心內部電晶體</text>
              <text x="70" y="45" text-anchor="middle" fill="#38bdf8" font-size="9.5">1.5nm 脆弱閘極氧化層</text>
              <circle cx="70" cy="85" r="24" fill="#10b981" opacity="0.3"/>
              <text x="70" y="90" text-anchor="middle" fill="#34d399" font-size="11" font-weight="800">✓ 100% 安全</text>
              <text x="70" y="115" text-anchor="middle" fill="#cbd5e1" font-size="9.5">電壓被箝位在 &lt; 5V</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch22_metric_esd_level}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 2,000 V (HBM)</div>
          <div class="eng-obj-metric-note">JEDEC JS-001 人體靜電放電認證標準</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">箝位開通響應時間</div>
          <div class="eng-obj-metric-value">&lt; 0.5 ns (次奈秒)</div>
          <div class="eng-obj-metric-note">在靜電脈衝穿入核心前瞬間雪崩導通</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">平時正常靜態漏電</div>
          <div class="eng-obj-metric-value">&lt; 1.0 nA</div>
          <div class="eng-obj-metric-note">保護電路平時絕緣，不消耗電池多餘功耗</div>
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
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'bathtub' ? 'is-active' : ''}" data-tab="bathtub">${t.ch22_tab_bathtub}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'burnin' ? 'is-active' : ''}" data-tab="burnin">${t.ch22_tab_burnin}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'esd' ? 'is-active' : ''}" data-tab="esd">${t.ch22_tab_esd}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'JEDEC / AEC Qualification Clauses' : '國際可靠度標準條例 (JEDEC / AEC)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'HTOL · TC · HAST · MSL · WLR' : 'HTOL · TC · HAST · MSL · WLR'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'JESD22 HTOL, -65~150°C TC, HAST, J-STD-020 MSL reflow & TDDB/BTI/HCI/EM' : 'JESD22 高溫壽命、-65~150°C 溫循、HAST 溫濕偏壓、J-STD-020 與 TDDB/BTI/EM'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Weibull Bathtub & Arrhenius-Peck FIT Law' : 'Weibull 浴缸與 Peck/FIT 卡方律 (Rel Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'F(t)=1-e^-(t/η)^β · FIT = χ²/(2·N·t·AF)×10⁹' : 'F(t)=1-e^-(t/η)^β · FIT = χ²/(2·N·t·AF)×10⁹'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Burn-In screens β<1 infant mortality; HAST/HTOL bounds 10-yr FIT' : 'Burn-In 篩除 β<1 早夭缺陷、HAST 溫濕加速與 10 年 <10 FIT 保證'}</div>
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
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    const tempSlider = container.querySelector('#ch22Temp');
    if (tempSlider) {
      bindEngineeringEvent(tempSlider, 'input', (e) => {
        stressTemp = parseInt(e.target.value, 10);
        update();
      });
    }
    const eaSlider = container.querySelector('#ch22Ea');
    if (eaSlider) {
      bindEngineeringEvent(eaSlider, 'input', (e) => {
        activationEa = parseFloat(e.target.value);
        update();
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
