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

    // ISO 14644-1 微粒濃度極限與流體換氣率計算
    // C_n = 10^N * (0.1 / D)^2.08
    const c01Limit = Math.pow(10, isoClass); // 0.1 µm 微粒基準
    const c05Limit = Math.max(1, Math.round(Math.pow(10, isoClass) * Math.pow(0.1 / 0.5, 2.08))); // 0.5 µm 微粒

    // 全室換氣率 ACH = (v * 3600) / H (晶圓廠淨高 H = 3.0m)
    const ceilingHeight = 3.0;
    const ach = Math.round((laminarVelocity * 3600) / ceilingHeight);
    const residenceTime = (ceilingHeight / laminarVelocity).toFixed(1);

    // 微正壓梯度 ΔP (Pa) ≈ 8.0 + v * 32.0
    const deltaP = (8.0 + laminarVelocity * 32.0).toFixed(1);

    // 氣流均勻度評級
    const isTurbulentRisk = laminarVelocity < 0.30;
    const isOptimalFlow = laminarVelocity >= 0.40 && laminarVelocity <= 0.50;
    let flowQuality = '';
    let flowColor = '';
    if (isTurbulentRisk) {
      flowQuality = lang === 'en' ? '⚠️ Eddy Current & Cross-Contamination Risk' : '⚠️ 橫向渦流與微粒交叉污染擴散風險';
      flowColor = '#ef4444';
    } else if (isOptimalFlow) {
      flowQuality = lang === 'en' ? '🛡️ Ideal Unidirectional Laminar Piston Flow' : '🛡️ 完美單向垂直活塞層流 (0.45 m/s 黃金標準)';
      flowColor = '#10b981';
    } else {
      flowQuality = lang === 'en' ? '⚡ High Velocity Energy Penalty & Vibration Risk' : '⚡ 超速風切耗能與晶圓微震顫風險';
      flowColor = '#f59e0b';
    }

    if (activeTab === 'cleanroom') {
      controlsHtml = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 10px; padding: 12px; background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px solid rgba(56, 189, 248, 0.2);">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch01_iso_slider}</span>
              <span style="color: #38bdf8; font-weight: 750; font-family: monospace;">ISO Class ${isoClass}</span>
            </div>
            <input type="range" id="ch01IsoSlider" min="1" max="6" step="1" value="${isoClass}" style="width: 100%; accent-color: #0ea5e9; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>ISO 1 (黃金級)</span>
              <span>ISO 3 (Fed Class 1)</span>
              <span>ISO 6 (次級廠務)</span>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch01_velocity_slider}</span>
              <span style="color: #10b981; font-weight: 750; font-family: monospace;">${laminarVelocity.toFixed(2)} m/s</span>
            </div>
            <input type="range" id="ch01VelocitySlider" min="0.20" max="0.65" step="0.05" value="${laminarVelocity}" style="width: 100%; accent-color: #10b981; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>0.20 m/s (易產生亂流)</span>
              <span>0.45 m/s (晶圓廠規範)</span>
              <span>0.65 m/s (超高風速)</span>
            </div>
          </div>
        </div>
      `;
    }

    if (activeTab === 'cleanroom') {
      const lineOpacity = Math.min(0.95, Math.max(0.4, laminarVelocity * 1.5));
      const lineStrokeWidth = (laminarVelocity * 3.2).toFixed(1);

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Class 1 Cleanroom Vertical Laminar Airflow and Particle Physics">
          <!-- 上方天花板 Plenum 靜壓箱與 FFU (Fan Filter Units) -->
          <g transform="translate(60, 20)">
            <rect x="0" y="0" width="680" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="340" y="24" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">
              靜壓箱與風機過濾單元陣列 (Plenum & FFU Array · 全面覆蓋率 95-100%)
            </text>
            <!-- ULPA 濾網層 (0.12µm 過濾效率 99.99995%) -->
            <rect x="0" y="38" width="680" height="12" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
            <text x="340" y="47" text-anchor="middle" fill="#ffffff" font-size="9.5" font-weight="700">
              ULPA 濾網層 (Ultra-Low Penetration Air Filter: 99.99995% @ 0.12µm)
            </text>
          </g>

          <!-- 潔淨室加工區 (Clean Zone)：垂直單向層流 (Laminar Downflow) -->
          <g transform="translate(60, 75)">
            <!-- 兩側回風夾道 (Return Air Chases) -->
            <rect x="0" y="0" width="30" height="200" fill="#09131b" stroke="#475569" stroke-width="1.5"/>
            <text x="15" y="100" text-anchor="middle" fill="#94a3b8" font-size="10" transform="rotate(-90 15 100)">回風夾道 ↑</text>

            <rect x="650" y="0" width="30" height="200" fill="#09131b" stroke="#475569" stroke-width="1.5"/>
            <text x="665" y="100" text-anchor="middle" fill="#94a3b8" font-size="10" transform="rotate(90 665 100)">回風夾道 ↑</text>

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
                <text x="60" y="45" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="750">⚠️ 低風速亂流渦旋 (微粒可能橫向回飄)</text>
              </g>
            ` : `
              <!-- 均勻層流壓制無擾動 -->
              <g transform="translate(260, 20)">
                <rect x="0" y="0" width="220" height="24" rx="4" fill="#0f172a" opacity="0.8" stroke="#10b981" stroke-width="1"/>
                <text x="110" y="16" text-anchor="middle" fill="#34d399" font-size="10" font-weight="700">
                  活塞層流順暢下壓 (換氣: ${ach} 次/hr · 滯留: ${residenceTime}s)
                </text>
              </g>
            `}

            <!-- 機台設備與無塵衣操作員 (Equipment in clean zone) -->
            <g transform="translate(180, 70)">
              <rect x="0" y="0" width="160" height="130" rx="4" fill="#0f172a" stroke="#cbd5e1" stroke-width="2"/>
              <text x="80" y="35" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">微影 / 蝕刻機台</text>
              <rect x="25" y="55" width="110" height="55" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="80" y="80" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">Load Port 裝載口</text>
              <text x="80" y="98" text-anchor="middle" fill="#94a3b8" font-size="9.5">微正壓 N₂ 氣幕保護</text>
            </g>

            <!-- 無塵衣工程師與微粒下壓軌跡 -->
            <g transform="translate(420, 90)">
              <circle cx="20" cy="20" r="14" fill="#cbd5e1"/>
              <rect x="5" y="34" width="30" height="76" rx="4" fill="#cbd5e1"/>
              <text x="20" y="70" text-anchor="middle" fill="#0f172a" font-size="10" font-weight="800">無塵衣</text>
              <text x="20" y="130" text-anchor="middle" fill="#cbd5e1" font-size="10">操作人員</text>

              <!-- 人體發塵微粒瞬間被垂直層流壓制向下 -->
              <circle cx="38" cy="45" r="4" fill="#f59e0b"/>
              <path d="M 38,45 L 38,95" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2" marker-end="url(#arrow)"/>
              <text x="50" y="75" fill="#fbbf24" font-size="9">微粒被流線下壓 ↓</text>
            </g>
          </g>

          <!-- 下方高架穿孔地板 (Raised Perforated Floor Grid) -->
          <g transform="translate(60, 275)">
            <rect x="0" y="0" width="680" height="24" fill="#334155" stroke="#cbd5e1" stroke-width="1.5"/>
            ${Array.from({ length: 34 }, (_, i) => `
              <circle cx="${i * 20 + 10}" cy="12" r="4.5" fill="#09131b"/>
            `).join('')}
            <text x="340" y="44" text-anchor="middle" fill="#cbd5e1" font-size="11">
              高架穿孔地板 (Perforated Floor: 抽吸微粒直入回風夾道 · 杜絕渦流反衝)
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
          <div class="eng-obj-metric-label">${t.ch01_cn_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark); font-family: monospace;">
            ≤ ${c01Limit.toLocaleString()} 顆/m³
          </div>
          <div class="eng-obj-metric-note">ISO Class ${isoClass} (0.1µm) · 0.5µm 上限: ≤${c05Limit.toLocaleString()} 顆/m³</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch01_ach_label} & 滯留時間</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal); font-family: monospace;">
            ${ach} 次/hr (${residenceTime}s)
          </div>
          <div class="eng-obj-metric-note">ACH = (v × 3600) / H · 全室空氣每 ${residenceTime} 秒徹底置換</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch01_dp_label} & 氣流狀態</div>
          <div class="eng-obj-metric-value" style="color: ${flowColor}; font-size: 13px; font-weight: 750;">
            +${deltaP} Pa (${flowQuality})
          </div>
          <div class="eng-obj-metric-note">外溢正壓屏障 · 杜絕開門空氣粉塵逆流滲透</div>
        </div>
      `;

      footerNote = t.ch01_cleanroom_desc;
    } else if (activeTab === 'amhs') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OHT Skyrail and FOUP Automated Load Port Docking">
          <!-- 天花板 OHT 單軌空中軌道 (Ceiling Monorail Track) -->
          <g transform="translate(60, 30)">
            <rect x="0" y="0" width="680" height="20" fill="#334155" stroke="#64748b" stroke-width="1.5"/>
            <text x="340" y="14" text-anchor="middle" fill="#94a3b8" font-size="10.5">OHT 天車空中高速單軌 (Ceiling Skyrail Monorail)</text>
          </g>

          <!-- OHT 天車本體與昇降吊具 (OHT Vehicle with Hoist) -->
          <g transform="translate(300, 50)">
            <!-- 天車小車 (OHT Vehicle: 300 m/min 高速驅動) -->
            <rect x="0" y="0" width="200" height="50" rx="4" fill="#0f172a" stroke="#0ea5e9" stroke-width="2"/>
            <text x="100" y="28" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">OHT 天車 (300 m/min 奔馳)</text>

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
              <text x="75" y="96" text-anchor="middle" fill="#ffffff" font-size="9.5">充氮 N₂ 氣密盒 (25片裝)</text>
            </g>
          </g>

          <!-- 下方機台裝載埠 (Load Port & EFEM) -->
          <g transform="translate(240, 290)">
            <rect x="0" y="0" width="320" height="90" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
            <!-- 氣動定位定位銷 (Kinematic Coupling Pins) -->
            <polygon points="40,0 46,-8 34,-8" fill="#fbbf24"/>
            <polygon points="160,0 166,-8 154,-8" fill="#fbbf24"/>
            <polygon points="280,0 286,-8 274,-8" fill="#fbbf24"/>
            <text x="160" y="35" text-anchor="middle" fill="#34d399" font-size="12.5" font-weight="750">機台裝載埠 (Equipment Load Port)</text>
            <text x="160" y="55" text-anchor="middle" fill="#cbd5e1" font-size="10.5">真空吸盤自動開門 (Door Opener) · 晶圓零暴露傳送</text>
            <text x="160" y="75" text-anchor="middle" fill="#38bdf8" font-size="10">微正壓氣幕 (Mini-Environment ISO 1) 防止顆粒侵入</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch01_metric_oht_speed}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">300 m/min (5 m/s)</div>
          <div class="eng-obj-metric-note">空中單軌智能排程自動避碰與派車</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">FOUP 晶圓盒容量</div>
          <div class="eng-obj-metric-value">25 片 300mm 晶圓</div>
          <div class="eng-obj-metric-note">全封閉微環境隔絕外部無塵室化學氣體</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">晶圓傳送對位精度</div>
          <div class="eng-obj-metric-value">± 0.05 mm</div>
          <div class="eng-obj-metric-note">Kinematic Pins 保證每一次下放完美對齊</div>
        </div>
      `;

      footerNote = t.ch01_amhs_desc;
    } else if (activeTab === 'facility') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fab Facilities Ultrapure Water and Specialty Gas Systems">
          <!-- 左側：18.2 MΩ·cm 超純水 (UPW) 循環管路 -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="320" height="340" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5" rx="6"/>
            <text x="160" y="32" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">超純水系統 (UPW Facility)</text>
            <text x="160" y="52" text-anchor="middle" fill="#94a3b8" font-size="10.5">水分子純化極限 · TOC &lt; 1 ppb</text>

            <!-- 淨化流程模組 (RO → EDI → UV 185nm → 脫氣膜) -->
            <g transform="translate(30, 75)">
              <rect x="0" y="0" width="260" height="40" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="130" y="25" text-anchor="middle" fill="#ffffff" font-size="11">1. RO 逆滲透 + EDI 電去離子</text>

              <rect x="0" y="60" width="260" height="40" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="130" y="85" text-anchor="middle" fill="#ffffff" font-size="11">2. 185nm 紫外線 (UV) TOC 降解</text>

              <rect x="0" y="120" width="260" height="40" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="130" y="145" text-anchor="middle" fill="#ffffff" font-size="11">3. 膜式脫氣 (脫除溶氧 DO &lt; 1 ppb)</text>

              <rect x="0" y="180" width="260" height="40" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="130" y="205" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="750">送至機台: 18.2 MΩ·cm (@25°C)</text>
            </g>
          </g>

          <!-- 右側：劇毒特氣雙壁套管與洗滌塔 (Specialty Gas & Scrubbers) -->
          <g transform="translate(420, 40)">
            <rect x="0" y="0" width="320" height="340" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
            <text x="160" y="32" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="750">特氣與廢氣處理 (Gas & Scrubber)</text>
            <text x="160" y="52" text-anchor="middle" fill="#94a3b8" font-size="10.5"><tspan x="160">雙層不銹鋼同軸管 · </tspan><tspan x="160" dy="14">燃燒洗滌零排放</tspan></text>

            <g transform="translate(30, 75)">
              <!-- 雙層同軸套管剖面 (Coaxial Tubing) -->
              <rect x="0" y="0" width="260" height="50" rx="3" fill="#1e293b" stroke="#cbd5e1" stroke-width="1"/>
              <text x="130" y="20" text-anchor="middle" fill="#f87171" font-size="11" font-weight="700">劇毒特氣 (SiH₄, WF₆, Cl₂)</text>
              <text x="130" y="38" text-anchor="middle" fill="#94a3b8" font-size="10">內管輸氣 · 外管負壓抽氣偵測</text>

              <!-- Point-of-Use 燃燒水洗機 (Burn-Wet Scrubber) -->
              <rect x="0" y="70" width="260" height="70" rx="4" fill="#09131b" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="130" y="95" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="750">局部燃燒式洗滌器 (POU Scrubber)</text>
              <text x="130" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10.5">1400°C 燃燒裂解溫室氣體 PFCs</text>
              <text x="130" y="130" text-anchor="middle" fill="#34d399" font-size="10">水洗中和酸性廢氣 → 達標排放</text>

              <!-- 廠級中央洗滌塔 (Central Wet Scrubber) -->
              <rect x="0" y="160" width="260" height="50" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
              <text x="130" y="185" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">中央廢氣洗滌塔 (Central Scrubber)</text>
              <text x="130" y="202" text-anchor="middle" fill="#94a3b8" font-size="9.5">酸鹼排氣鹼液逆向噴淋中和</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">超純水電阻率 (UPW Resistivity)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">18.2 MΩ·cm</div>
          <div class="eng-obj-metric-note">水分子去離子化理論物理極限</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">總有機碳含量 (TOC)</div>
          <div class="eng-obj-metric-value">&lt; 1 ppb</div>
          <div class="eng-obj-metric-note">十億分之一有機物殘留防晶圓積碳</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">劇毒特氣管路標準</div>
          <div class="eng-obj-metric-value">雙層同軸 (Coaxial)</div>
          <div class="eng-obj-metric-note">外管連續真空抽檢，杜絕微漏風險</div>
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
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'cleanroom' ? 'is-active' : ''}" data-tab="cleanroom">${t.ch01_tab_cleanroom}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'amhs' ? 'is-active' : ''}" data-tab="amhs">${t.ch01_tab_amhs}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'facility' ? 'is-active' : ''}" data-tab="facility">${t.ch01_tab_facility}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Cleanroom, AMHS & Facility Clauses' : '無塵室、AMHS 與四大廠務條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'ISO 1–3 · OHT/FOUP · 18.2 MΩ UPW' : 'ISO 1–3 · OHT/FOUP · 18.2 MΩ UPW'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'ULPA laminar flow, OHT/Stocker/EFEM, 18.2 MΩ·cm UPW, gas, UPS & scrubbers' : 'ULPA 垂直層流、OHT/Stocker/EFEM、18.2 MΩ·cm 超純水、特氣、UPS 與尾氣處理'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Cleanroom & UPW Quantitative Law' : '無塵室與超純水定量律 (Cleanroom Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'Cn = 10^N(0.1/D)^2.08 · 18.24 MΩ·cm' : 'Cn = 10^N(0.1/D)^2.08 · 18.24 MΩ·cm'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'ISO Class 1 particle power law & FOUP N₂ purge RH < 1%' : 'ISO Class 1 微粒冪次極限與 FOUP 充氮 RH < 1% 抑制氧化'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'AMC Haze · UPW Silica · VC-E Vib' : 'AMC Haze · UPW Silica · VC-E Vib'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Prevents <1 ppb AMC lens haze, UPW colloidal silica & Sub-Fab vibration' : '防範 <1 ppb AMC 鏡頭霧化、UPW 膠體矽擊穿與 Sub-Fab 泵浦微振失焦'}</div>
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

    const isoSlider = container.querySelector('#ch01IsoSlider');
    if (isoSlider) {
      bindEngineeringEvent(isoSlider, 'input', (e) => {
        isoClass = parseInt(e.target.value, 10);
        update();
      });
    }

    const velocitySlider = container.querySelector('#ch01VelocitySlider');
    if (velocitySlider) {
      bindEngineeringEvent(velocitySlider, 'input', (e) => {
        laminarVelocity = parseFloat(e.target.value);
        update();
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
