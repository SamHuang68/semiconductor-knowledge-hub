import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderFabEnvironmentObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'cleanroom'; // 'cleanroom' | 'amhs' | 'facility'
  let isoClass = 1; // 1 to 6
  let laminarVelocity = 0.45; // 0.20 to 0.65 m/s

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    let controlsHtml = '';

    // 微粒濃度公式與理想換氣率教學示例；ISO完整分類表適用域未確認
    // C_n = 10^N * (0.1 / D)^2.08
    const c01Limit = Math.pow(10, isoClass); // 0.1 µm 微粒基準
    const c05Limit = Math.pow(10, isoClass) * Math.pow(0.1 / 0.5, 2.08); // 0.5 µm 公式示例；非已核實的分類限值
    const c05Display = c05Limit < 1 ? c05Limit.toFixed(2) : Math.round(c05Limit).toLocaleString();

    // 理想ACH = (v * 3600) / H；假設全面FFU覆蓋及示例淨高H = 3.0m
    const ceilingHeight = 3.0;
    const ach = Math.round((laminarVelocity * 3600) / ceilingHeight);
    const residenceTime = (ceilingHeight / laminarVelocity).toFixed(1);

    // 未校準壓差教學式 ΔP (Pa) = 8.0 + v * 32.0；非設計或實測規格
    const deltaP = (8.0 + laminarVelocity * 32.0).toFixed(1);

    // 教學區間標籤；原閾值保留，不據此診斷實際湍流或振動
    const isTurbulentRisk = laminarVelocity < 0.30;
    const isOptimalFlow = laminarVelocity >= 0.40 && laminarVelocity <= 0.50;
    let flowQuality = '';
    let flowColor = '';
    if (isTurbulentRisk) {
      flowQuality = lang === 'en' ? 'Example: low-speed band' : '教學示例：低風速區間';
      flowColor = '#ef4444';
    } else if (isOptimalFlow) {
      flowQuality = lang === 'en' ? 'Example: reference band' : '教學示例：參考區間內';
      flowColor = '#10b981';
    } else {
      flowQuality = lang === 'en' ? 'Example: outside reference band' : '教學示例：參考區間外';
      flowColor = '#f59e0b';
    }

    if (activeTab === 'cleanroom') {
      controlsHtml = `
        <div class="ch01-model-controls" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 10px; padding: 12px; background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px solid rgba(56, 189, 248, 0.2);">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch01_iso_slider}</span>
              <span style="color: #38bdf8; font-weight: 750; font-family: monospace;">ISO Class ${isoClass}</span>
            </div>
            <input type="range" id="ch01IsoSlider" aria-label="${esc(t.ch01_iso_slider)}" aria-valuenow="${isoClass}" aria-valuetext="ISO Class ${isoClass}" min="1" max="6" step="1" value="${isoClass}" style="width: 100%; accent-color: #0ea5e9; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>${lang === 'en' ? "N = 1 (example)" : "N = 1（示例）"}</span>
              <span>${lang === 'en' ? "N = 3 (example)" : "N = 3（示例）"}</span>
              <span>${lang === 'en' ? "N = 6 (example)" : "N = 6（示例）"}</span>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch01_velocity_slider}</span>
              <span style="color: #10b981; font-weight: 750; font-family: monospace;">${laminarVelocity.toFixed(2)} m/s</span>
            </div>
            <input type="range" id="ch01VelocitySlider" aria-label="${esc(t.ch01_velocity_slider)}" aria-valuenow="${laminarVelocity}" aria-valuetext="${laminarVelocity.toFixed(2)} m/s" min="0.20" max="0.65" step="0.05" value="${laminarVelocity}" style="width: 100%; accent-color: #10b981; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>${lang === 'en' ? "0.20 m/s (low end)" : "0.20 m/s（低端）"}</span>
              <span>${lang === 'en' ? "0.45 m/s (reference)" : "0.45 m/s（參考）"}</span>
              <span>${lang === 'en' ? "0.65 m/s (high end)" : "0.65 m/s（高端）"}</span>
            </div>
          </div>
        </div>
      `;
    }

    if (activeTab === 'cleanroom') {
      const lineOpacity = Math.min(0.95, Math.max(0.4, laminarVelocity * 1.5));
      const lineStrokeWidth = (laminarVelocity * 3.2).toFixed(1);

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${lang === 'en' ? 'Cleanroom airflow and particle teaching schematic' : '無塵室氣流與微粒教學示意'}">
          <!-- 上方天花板 Plenum 靜壓箱與 FFU (Fan Filter Units) -->
          <g transform="translate(60, 20)">
            <rect x="0" y="0" width="680" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="340" y="24" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">
              ${lang === 'en' ? "Plenum & FFU Array · Coverage Example 95–100%" : "靜壓箱與FFU陣列 · 覆蓋率示例 95–100%"}
            </text>
            <!-- ULPA 濾網層 (0.12µm 過濾效率 99.99995%) -->
            <rect x="0" y="38" width="680" height="12" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
            <text x="340" y="47" text-anchor="middle" fill="#ffffff" font-size="9.5" font-weight="700">
              ${lang === 'en' ? "ULPA Filter Example: 99.99995% @ 0.12µm" : "ULPA濾網示例：99.99995% @ 0.12µm"}
            </text>
          </g>

          <!-- 潔淨室加工區 (Clean Zone)：垂直單向層流 (Laminar Downflow) -->
          <g transform="translate(60, 75)">
            <!-- 兩側回風夾道 (Return Air Chases) -->
            <rect x="0" y="0" width="30" height="200" fill="#09131b" stroke="#475569" stroke-width="1.5"/>
            <text x="15" y="100" text-anchor="middle" fill="#94a3b8" font-size="10" transform="rotate(-90 15 100)">${lang === 'en' ? "Return-air chase ↑" : "回風夾道 ↑"}</text>

            <rect x="650" y="0" width="30" height="200" fill="#09131b" stroke="#475569" stroke-width="1.5"/>
            <text x="665" y="100" text-anchor="middle" fill="#94a3b8" font-size="10" transform="rotate(90 665 100)">${lang === 'en' ? "Return-air chase ↑" : "回風夾道 ↑"}</text>

            <!-- 垂直氣流動態流線 (Laminar Streamlines) -->
            ${Array.from({ length: 14 }, (_, i) => {
              const xPos = i * 44 + 48;
              return `
                <g transform="translate(${xPos}, 0)">
                  <g class="anim-liquid-flow">
                  <line x1="0" y1="10" x2="0" y2="180" stroke="${isTurbulentRisk ? '#f87171' : '#38bdf8'}" stroke-width="${lineStrokeWidth}" stroke-dasharray="6 4" opacity="${lineOpacity}"/>
                  <polygon points="-3,180 3,180 0,186" fill="${isTurbulentRisk ? '#f87171' : '#38bdf8'}"/>
                </g>
                </g>
              `;
            }).join('')}

            ${isTurbulentRisk ? `
              <!-- 弱風速下之橫向渦流擾動警示 -->
              <g transform="translate(240, 40)">
                <path d="M 0,20 Q 30,-10 60,20 T 120,20" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4 3"/>
                <text x="60" y="45" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="750">${lang === 'en' ? "Low-speed band illustration" : "低風速區間示意"}</text>
              </g>
            ` : `
              <!-- 均勻層流壓制無擾動 -->
              <g transform="translate(260, 20)">
                <rect x="0" y="0" width="220" height="24" rx="4" fill="#0f172a" opacity="0.8" stroke="#10b981" stroke-width="1"/>
                <text x="110" y="16" text-anchor="middle" fill="#34d399" font-size="10" font-weight="700">
                  ${lang === 'en' ? `ACH ${ach}/h · H/v ${residenceTime}s` : `ACH ${ach}/h · H/v ${residenceTime}s`}
                </text>
              </g>
            `}

            <!-- 機台設備與無塵衣操作員 (Equipment in clean zone) -->
            <g transform="translate(180, 70)">
              <rect x="0" y="0" width="160" height="130" rx="4" fill="#0f172a" stroke="#cbd5e1" stroke-width="2"/>
              <text x="80" y="35" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">${lang === 'en' ? "Lithography / Etch Tool" : "微影 / 蝕刻機台"}</text>
              <rect x="25" y="55" width="110" height="55" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="80" y="80" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">${lang === 'en' ? "Load Port" : "Load Port 裝載口"}</text>
              <text x="80" y="98" text-anchor="middle" fill="#94a3b8" font-size="9.5">${lang === 'en' ? "Positive-pressure N₂ curtain" : "微正壓 N₂ 氣幕保護"}</text>
            </g>

            <!-- 無塵衣工程師與微粒下壓軌跡 -->
            <g transform="translate(420, 90)">
              <circle cx="20" cy="20" r="14" fill="#cbd5e1"/>
              <rect x="5" y="34" width="30" height="76" rx="4" fill="#cbd5e1"/>
              <text x="20" y="70" text-anchor="middle" fill="#0f172a" font-size="10" font-weight="800">${lang === 'en' ? "Cleanroom suit" : "無塵衣"}</text>
              <text x="20" y="130" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "Operator" : "操作人員"}</text>

              <!-- 人體發塵微粒瞬間被垂直層流壓制向下 -->
              <circle cx="38" cy="45" r="4" fill="#f59e0b"/>
              <path d="M 38,45 L 38,95" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2" marker-end="url(#arrow)"/>
              <text x="50" y="75" fill="#fbbf24" font-size="9">${lang === 'en' ? "Particles carried down ↓" : "微粒被流線下壓 ↓"}</text>
            </g>
          </g>

          <!-- 下方高架穿孔地板 (Raised Perforated Floor Grid) -->
          <g transform="translate(60, 275)">
            <rect x="0" y="0" width="680" height="24" fill="#334155" stroke="#cbd5e1" stroke-width="1.5"/>
            ${Array.from({ length: 34 }, (_, i) => `
              <circle cx="${i * 20 + 10}" cy="12" r="4.5" fill="#09131b"/>
            `).join('')}
            <text x="340" y="44" text-anchor="middle" fill="#cbd5e1" font-size="11">
              ${lang === 'en' ? "Perforated Floor & Return Path; Validate Actual Airflow" : "穿孔地板與回風路徑示意；實際氣流須驗證"}
            </text>
          </g>

          <!-- 物理定律浮水印標籤 -->
          <g transform="translate(480, 335)">
            <rect x="0" y="0" width="260" height="42" rx="4" fill="#0f172a" opacity="0.85" stroke="#38bdf8" stroke-width="1"/>
            <text x="130" y="18" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="750">C_n = 10^N · (0.1 / D)^2.08</text>
            <text x="130" y="33" text-anchor="middle" fill="#cbd5e1" font-size="9.5">ACH = (v × 3600) / H · ΔP = +${deltaP} Pa</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label" style="text-transform:none">${t.ch01_cn_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark); font-family: monospace;">
            ${lang === 'en' ? `${c01Limit.toLocaleString()} particles/m³` : `${c01Limit.toLocaleString()} 顆/m³`}
          </div>
          <div class="eng-obj-metric-note">${lang === 'en' ? `N=${isoClass}; 0.5µm formula estimate: ${c05Display} particles/m³. ISO table applicability unverified.` : `N=${isoClass}；0.5µm公式估算：${c05Display} 顆/m³。ISO分類表適用組合未確認。`}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? `${t.ch01_ach_label} & Ideal Transit` : `${t.ch01_ach_label}與理想穿越時間`}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal); font-family: monospace;">
            ${lang === 'en' ? `${ach} changes/hr (${residenceTime}s)` : `${ach} 次/hr (${residenceTime}s)`}
          </div>
          <div class="eng-obj-metric-note">${lang === 'en' ? `Assumes 100% FFU coverage and H=3.0m. H/v=${residenceTime}s is ideal transit through H, not complete room-air replacement.` : `假設100%FFU覆蓋、H=3.0m；H/v=${residenceTime}s為理想穿越高度時間，非全室完全置換。`}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? `${t.ch01_dp_label} & Airflow State` : `${t.ch01_dp_label} & 氣流狀態`}</div>
          <div class="eng-obj-metric-value" style="color: ${flowColor}; font-size: 13px; font-weight: 750;">
            +${deltaP} Pa (${flowQuality})
          </div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "ΔP=8+32v is uncalibrated. The example reference band is 0.40–0.50m/s, not a contamination or vibration diagnosis." : "ΔP=8+32v為未校準示例；參考風速區間0.40–0.50m/s，不判定實際污染或振動。"}</div>
        </div>
      `;

      footerNote = t.ch01_cleanroom_desc;
    } else if (activeTab === 'amhs') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OHT Skyrail and FOUP Automated Load Port Docking">
          <!-- 天花板 OHT 單軌空中軌道 (Ceiling Monorail Track) -->
          <g transform="translate(60, 30)">
            <rect x="0" y="0" width="680" height="20" fill="#334155" stroke="#64748b" stroke-width="1.5"/>
            <text x="340" y="14" text-anchor="middle" fill="#94a3b8" font-size="10.5">${lang === 'en' ? "OHT Ceiling Monorail" : "OHT 天車空中高速單軌 (Ceiling Skyrail Monorail)"}</text>
          </g>

          <!-- OHT 天車本體與昇降吊具 (OHT Vehicle with Hoist) -->
          <g transform="translate(300, 50)">
            <!-- 天車小車 (OHT Vehicle: 300 m/min 高速驅動) -->
            <rect x="0" y="0" width="200" height="50" rx="4" fill="#0f172a" stroke="#0ea5e9" stroke-width="2"/>
            <text x="100" y="28" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${lang === 'en' ? "OHT Example: 300 m/min" : "OHT速度示例：300 m/min"}</text>

            <!-- 垂直升降纜繩 (Hoist Belts) -->
            <line x1="40" y1="50" x2="40" y2="130" stroke="#e2e8f0" stroke-width="2.5"/>
            <line x1="160" y1="50" x2="160" y2="130" stroke="#e2e8f0" stroke-width="2.5"/>

            <!-- 300mm FOUP (Front Opening Unified Pod: 盛裝 25 片晶圓) -->
            <g transform="translate(25, 130)">
              <rect x="0" y="0" width="150" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
              <!-- 晶圓盒把手 -->
              <rect x="50" y="-12" width="50" height="12" rx="2" fill="#475569" stroke="#cbd5e1" stroke-width="1"/>
              <!-- 內部充氮 N2 與 25 片晶圓橫線 -->
              ${Array.from({ length: 9 }, (_, i) => `
                <line x1="20" y1="${i * 10 + 20}" x2="130" y2="${i * 10 + 20}" stroke="#38bdf8" stroke-width="1.5"/>
              `).join('')}
              <text x="75" y="80" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">300mm FOUP</text>
              <text x="75" y="96" text-anchor="middle" fill="#ffffff" font-size="9.5">${lang === 'en' ? "N₂-Purged Pod (25 Wafers)" : "充氮 N₂ 氣密盒 (25片裝)"}</text>
            </g>
          </g>

          <!-- 下方機台裝載埠 (Load Port & EFEM) -->
          <g transform="translate(240, 290)">
            <rect x="0" y="0" width="320" height="90" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
            <!-- 氣動定位定位銷 (Kinematic Coupling Pins) -->
            <polygon points="40,0 46,-8 34,-8" fill="#fbbf24"/>
            <polygon points="160,0 166,-8 154,-8" fill="#fbbf24"/>
            <polygon points="280,0 286,-8 274,-8" fill="#fbbf24"/>
            <text x="160" y="35" text-anchor="middle" fill="#34d399" font-size="12.5" font-weight="750">${lang === 'en' ? "Equipment Load Port" : "機台裝載埠 (Equipment Load Port)"}</text>
            <text x="160" y="55" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${lang === 'en' ? "Automated Door & Controlled Transfer" : "自動開門與受控傳送示意"}</text>
            <text x="160" y="75" text-anchor="middle" fill="#38bdf8" font-size="10">${lang === 'en' ? "Mini-Environment Example: ISO 1; Verify Specs" : "迷你環境示例：ISO 1；實際規格須驗證"}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch01_metric_oht_speed}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">300 m/min (5 m/s)</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "300m/min is a teaching condition; dispatch and collision-avoidance performance require equipment verification." : "300 m/min為教學速度條件；排程與避碰效能須依設備驗證"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "FOUP Capacity" : "FOUP 晶圓盒容量"}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "25 × 300mm Wafers" : "25 片 300mm 晶圓"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Enclosure and purge can reduce exposure; protection depends on equipment and operation." : "封閉與吹氣可降低暴露；保護效果依設備與操作條件"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Wafer Transfer Alignment Accuracy" : "晶圓傳送對位精度"}</div>
          <div class="eng-obj-metric-value">± 0.05 mm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "±0.05mm is an uncalibrated alignment example; actual accuracy requires equipment-specific verification." : "±0.05mm為未校準定位示例；實際精度依設備與驗證"}</div>
        </div>
      `;

      footerNote = t.ch01_amhs_desc;
    } else if (activeTab === 'facility') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fab Facilities Ultrapure Water and Specialty Gas Systems">
          <!-- 左側：18.2 MΩ·cm 超純水 (UPW) 循環管路 -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="320" height="340" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5" rx="6"/>
            <text x="160" y="32" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${lang === 'en' ? "Ultrapure Water System (UPW)" : "超純水系統 (UPW Facility)"}</text>
            <text x="160" y="52" text-anchor="middle" fill="#94a3b8" font-size="10.5">${lang === 'en' ? "TOC Example Condition: &lt; 1 ppb" : "TOC示例條件：&lt; 1 ppb"}</text>

            <!-- 淨化流程模組 (RO → EDI → UV 185nm → 脫氣膜) -->
            <g transform="translate(30, 75)">
              <rect x="0" y="0" width="260" height="40" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="130" y="25" text-anchor="middle" fill="#ffffff" font-size="11">${lang === 'en' ? "1. Reverse Osmosis + EDI" : "1. RO 逆滲透 + EDI 電去離子"}</text>

              <rect x="0" y="60" width="260" height="40" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="130" y="85" text-anchor="middle" fill="#ffffff" font-size="11">${lang === 'en' ? "2. 185nm UV TOC Breakdown" : "2. 185nm 紫外線 (UV) TOC 降解"}</text>

              <rect x="0" y="120" width="260" height="40" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="130" y="145" text-anchor="middle" fill="#ffffff" font-size="11">${lang === 'en' ? "3. Degassing Example: DO &lt; 1 ppb" : "3. 脫氣示例：DO &lt; 1 ppb"}</text>

              <rect x="0" y="180" width="260" height="40" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="130" y="205" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="750">${lang === 'en' ? "To Tool: 18.2 MΩ·cm (@25°C)" : "送至機台: 18.2 MΩ·cm (@25°C)"}</text>
            </g>
          </g>

          <!-- 右側：劇毒特氣雙壁套管與洗滌塔 (Specialty Gas & Scrubbers) -->
          <g transform="translate(420, 40)">
            <rect x="0" y="0" width="320" height="340" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
            <text x="160" y="32" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="750">${lang === 'en' ? "Specialty Gas & Abatement" : "特氣與廢氣處理 (Gas & Scrubber)"}</text>
            <text x="160" y="52" text-anchor="middle" fill="#94a3b8" font-size="10.5"><tspan x="160">${lang === 'en' ? "Double-Walled Stainless Lines · " : "雙層不銹鋼同軸管 · "}</tspan><tspan x="160" dy="14">${lang === 'en' ? "Burn/Wet Example; Verify Efficiency" : "燃燒／水洗示意；效率須驗證"}</tspan></text>

            <g transform="translate(30, 75)">
              <!-- 雙層同軸套管剖面 (Coaxial Tubing) -->
              <rect x="0" y="0" width="260" height="50" rx="3" fill="#1e293b" stroke="#cbd5e1" stroke-width="1"/>
              <text x="130" y="20" text-anchor="middle" fill="#f87171" font-size="11" font-weight="700">${lang === 'en' ? "Hazardous Gases (SiH₄, WF₆, Cl₂)" : "具危害特氣 (SiH₄, WF₆, Cl₂)"}</text>
              <text x="130" y="38" text-anchor="middle" fill="#94a3b8" font-size="10">${lang === 'en' ? "Inner Gas Line · Outer Vacuum Monitoring" : "內管輸氣 · 外管負壓抽氣偵測"}</text>

              <!-- Point-of-Use 燃燒水洗機 (Burn-Wet Scrubber) -->
              <rect x="0" y="70" width="260" height="70" rx="4" fill="#09131b" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="130" y="95" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="750">${lang === 'en' ? "Point-of-Use Burn/Wet Scrubber" : "局部燃燒式洗滌器 (POU Scrubber)"}</text>
              <text x="130" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${lang === 'en' ? "PFC Treatment Example: 1400°C" : "PFC處理溫度示例：1400°C"}</text>
              <text x="130" y="130" text-anchor="middle" fill="#34d399" font-size="10">${lang === 'en' ? "Wet Treatment; Verify Discharge" : "水洗中和；排放須驗證"}</text>

              <!-- 廠級中央洗滌塔 (Central Wet Scrubber) -->
              <rect x="0" y="160" width="260" height="50" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
              <text x="130" y="185" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">${lang === 'en' ? "Central Exhaust Scrubber" : "中央廢氣洗滌塔 (Central Scrubber)"}</text>
              <text x="130" y="202" text-anchor="middle" fill="#94a3b8" font-size="9.5">${lang === 'en' ? "Countercurrent Alkaline Spray Neutralization" : "酸鹼排氣鹼液逆向噴淋中和"}</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "UPW Resistivity" : "超純水電阻率 (UPW Resistivity)"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">18.2 MΩ·cm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "18.2 MΩ·cm at 25°C is a teaching reference, not a supply-performance guarantee." : "25°C下18.2 MΩ·cm教學參考；非供水性能保證"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Total Organic Carbon (TOC)" : "總有機碳含量 (TOC)"}</div>
          <div class="eng-obj-metric-value">&lt; 1 ppb</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "TOC <1ppb is an example condition; actual limits depend on process and measurement." : "TOC <1ppb為教學條件；實際限值依製程與量測"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Specialty Gas Piping Example" : "特氣管路示例"}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "Double-Walled Coaxial" : "雙層同軸 (Coaxial)"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Outer-line monitoring and protection require gas-, equipment- and site-specific verification." : "外管監測與防護須依氣體、設備及現場要求驗證"}</div>
        </div>
      `;

      footerNote = t.ch01_facility_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh01Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 01</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh01Title">${t.ch01_title}</h2>
          <p class="eng-obj-subtitle">${t.ch01_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="group" aria-label="${lang === 'en' ? 'Fab environment views' : '晶圓廠環境視圖'}">
            <button type="button" class="eng-obj-tab ${activeTab === 'cleanroom' ? 'is-active' : ''}" data-tab="cleanroom" aria-pressed="${activeTab === 'cleanroom'}">${t.ch01_tab_cleanroom}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'amhs' ? 'is-active' : ''}" data-tab="amhs" aria-pressed="${activeTab === 'amhs'}">${t.ch01_tab_amhs}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'facility' ? 'is-active' : ''}" data-tab="facility" aria-pressed="${activeTab === 'facility'}">${t.ch01_tab_facility}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? "Cleanroom, AMHS & Facility Examples" : "無塵室、AMHS與廠務示例"}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'ISO 1–3 · OHT/FOUP · 18.2 MΩ UPW' : 'ISO 1–3 · OHT/FOUP · 18.2 MΩ UPW'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? "ULPA, OHT/Stocker/EFEM, 18.2 MΩ·cm UPW, gas and abatement are teaching examples; equipment conditions are uncalibrated." : "ULPA、OHT/Stocker/EFEM、18.2 MΩ·cm UPW、特氣與廢氣處理為教學概覽；設備條件未校準"}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? "Cleanroom & UPW Teaching Formulas" : "潔淨環境與UPW教學公式"}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'Cn = 10^N(0.1/D)^2.08 · 18.24 MΩ·cm' : 'Cn = 10^N(0.1/D)^2.08 · 18.24 MΩ·cm'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? "Particle-formula applicability is unverified; FOUP purge RH <1% is an example, not an oxidation-prevention guarantee." : "微粒公式適用域未確認；FOUP吹氣RH <1%為教學條件，不保證抑制氧化"}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'AMC Haze · UPW Silica · VC-E Vib' : 'AMC Haze · UPW Silica · VC-E Vib'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? "AMC <1ppb, UPW colloidal silica and Sub-Fab vibration are diagnostic examples; site-specific thresholds and controls require verification." : "AMC <1ppb、UPW膠體矽及Sub-Fab振動為排查主題；閾值與控制效果依場域驗證"}</div>
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

    const isoSlider = container.querySelector('#ch01IsoSlider');
    if (isoSlider) {
      bindEngineeringEvent(isoSlider, 'input', (e) => {
        const restoreFocus = e.target === e.target.ownerDocument.activeElement;
        isoClass = parseInt(e.target.value, 10);
        update();
        if (restoreFocus) container.querySelector('#ch01IsoSlider')?.focus();
      });
    }

    const velocitySlider = container.querySelector('#ch01VelocitySlider');
    if (velocitySlider) {
      bindEngineeringEvent(velocitySlider, 'input', (e) => {
        const restoreFocus = e.target === e.target.ownerDocument.activeElement;
        laminarVelocity = parseFloat(e.target.value);
        update();
        if (restoreFocus) container.querySelector('#ch01VelocitySlider')?.focus();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 18. Ch 02 固態物理基礎、PN 接面空乏區與 MOSFET 強反轉層模型 (Solid State Physics)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderFabEnvironmentObject as render };
