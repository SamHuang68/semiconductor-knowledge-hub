import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderWaferTestObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'wat'; // 'wat' | 'cp' | 'binmap'
  let forceCurrent = 10.0; // 1.0 ~ 50.0 mA
  let leadResistance = 5.0; // 0.5 ~ 20.0 Ohm
  let probeOD = 50; // 0 ~ 80 um

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    // Kelvin 4-Wire 物理計算
    // 待測真值 (金屬插塞 Via 接觸阻抗 R_DUT = 0.82 Ω)
    const rDUT = 0.82; // Ohm
    // 2-Wire 測量值 (包含兩條導線與探針電阻: R_DUT + 2 * R_lead)
    const r2Wire = rDUT + 2 * leadResistance; // Ohm
    // 2-Wire 誤差率 (%)
    const err2Wire = (((r2Wire - rDUT) / rDUT) * 100).toFixed(1);
    // Kelvin 4-Wire 測量值 (Sense 線高阻抗電壓計 I_sense ≈ 0，消除導線壓降)
    const r4Wire = rDUT; // 0.82 Ohm
    const vSense = (forceCurrent * 1e-3 * rDUT * 1000).toFixed(2); // mV

    // CP 探針下壓行程 (Overdrive) 與接觸電阻物理 (Scrubbing Mechanics)
    // 探針彈簧係數 k = 0.08 gf/um
    const contactForce = (probeOD * 0.08).toFixed(1); // gf/pin
    // 接觸電阻 Rc (隨著下壓破除微凸塊表面氧化膜而急遽下降)
    let rcProbe = 0;
    let cpStatus = 'pass';
    if (probeOD < 20) {
      rcProbe = (12.0 * Math.exp(-probeOD / 6) + 2.8).toFixed(2);
      cpStatus = 'false_open'; // 氧化層未破除，造成假開路
    } else if (probeOD <= 65) {
      rcProbe = (0.12 + 1.6 / (probeOD - 12)).toFixed(2);
      cpStatus = 'pass'; // 理想接觸
    } else {
      rcProbe = (0.15 + (probeOD - 65) * 0.008).toFixed(2);
      cpStatus = 'over_scrub'; // 過度下壓，凸塊壓傷或探針疲勞
    }

    if (activeTab === 'wat') {
      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch19ForceSlider">${t.ch19_force_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch19ForceSlider" min="1" max="50" step="1" value="${forceCurrent}">
            <span class="eng-obj-slider-val">${forceCurrent.toFixed(1)} mA</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch19LeadSlider">${t.ch19_lead_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch19LeadSlider" min="0.5" max="20" step="0.5" value="${leadResistance}">
            <span class="eng-obj-slider-val">${leadResistance.toFixed(1)} Ω</span>
          </div>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: #94a3b8; font-family: monospace;">${t.ch19_rdut_label}: <strong style="color: #38bdf8; font-size: 13px;">${rDUT} Ω</strong></span>
            <span class="ch19-test-status" data-status="error" style="font-size: 11px; padding: 2px 7px; border-radius: 4px; background: rgba(15,23,42,0.6); border: 1px solid var(--border-subtle); color: #ef4444; font-weight: 700;">
              2-Wire: ${r2Wire.toFixed(2)} Ω (+${err2Wire}%)
            </span>
            <span class="ch19-test-status" data-status="pass" style="font-size: 11px; padding: 2px 7px; border-radius: 4px; background: rgba(15,23,42,0.6); border: 1px solid var(--border-subtle); color: #10b981; font-weight: 700;">
              4-Wire: ${r4Wire.toFixed(2)} Ω (${lang === 'en' ? "0.0% error" : "0.0% 誤差"})
            </span>
          </div>
        </div>
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="WAT Scribe-line PCM Test Pattern and Kelvin 4-Wire Sensing Principle">
          <!-- 左側：晶圓切割劃線道 (Scribe-Line Street @ 80µm 寬) 與 PCM 測試結構 -->
          <g transform="translate(40, 30)">
            <rect x="0" y="0" width="340" height="360" fill="#0f172a" stroke="#334155" stroke-width="1.5" rx="6"/>
            <text x="170" y="24" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${lang === 'en' ? "Scribe-line PCM test keys (Process Control Monitor)" : "劃線道 PCM 測試鍵 (Process Control Monitor)"}</text>

            <!-- 左右相鄰實體晶片與中間劃線道 -->
            <g transform="translate(15, 45)">
              <rect x="0" y="0" width="85" height="290" fill="#1e293b" stroke="#475569" stroke-width="1" rx="3"/>
              <text x="42" y="145" text-anchor="middle" fill="#64748b" font-size="11" font-weight="700">Die A</text>

              <rect x="225" y="0" width="85" height="290" fill="#1e293b" stroke="#475569" stroke-width="1" rx="3"/>
              <text x="267" y="145" text-anchor="middle" fill="#64748b" font-size="11" font-weight="700">Die B</text>

              <!-- 中間劃線道 -->
              <rect x="95" y="0" width="120" height="290" fill="#090d16" stroke="#38bdf8" stroke-width="1.5" rx="3"/>
              <text x="155" y="20" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700">Scribe 80µm</text>

              <!-- PCM 測試結構單元 (Kelvin Contact Via 測試鍵高亮) -->
              ${[
                { name: 'NMOS Ion/Ioff', y: 35, active: false },
                { name: 'PMOS Ion/Ioff', y: 95, active: false },
                { name: 'Kelvin Contact Rc', y: 155, active: true },
                { name: 'Comb-Serpentine', y: 215, active: false }
              ].map(item => `
                <g transform="translate(102, ${item.y})">
                  <rect x="0" y="0" width="106" height="50" rx="3" fill="${item.active ? '#1e293b' : '#0f172a'}" stroke="${item.active ? '#f59e0b' : '#334155'}" stroke-width="${item.active ? 1.5 : 1}"/>
                  <!-- 4 個測試焊墊 (Test Pads: Force+, Sense+, Sense-, Force-) -->
                  <rect x="6" y="15" width="18" height="18" fill="#f59e0b" rx="2"/>
                  <rect x="30" y="15" width="18" height="18" fill="#38bdf8" rx="2"/>
                  <rect x="58" y="15" width="18" height="18" fill="#38bdf8" rx="2"/>
                  <rect x="82" y="15" width="18" height="18" fill="#f59e0b" rx="2"/>
                  <!-- 針尖垂直下壓 -->
                  <line x1="15" y1="-8" x2="15" y2="15" stroke="#fbbf24" stroke-width="2"/>
                  <line x1="39" y1="-8" x2="39" y2="15" stroke="#38bdf8" stroke-width="1.5"/>
                  <line x1="67" y1="-8" x2="67" y2="15" stroke="#38bdf8" stroke-width="1.5"/>
                  <line x1="91" y1="-8" x2="91" y2="15" stroke="#fbbf24" stroke-width="2"/>
                  <text x="53" y="44" text-anchor="middle" fill="${item.active ? '#fbbf24' : '#94a3b8'}" font-size="8.5" font-weight="700">${item.name}</text>
                </g>
              `).join('')}
            </g>
          </g>

          <!-- 右側：Kelvin 4-Wire 測量等效電路與誤差解析 -->
          <g transform="translate(400, 30)">
            <rect x="0" y="0" width="360" height="360" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
            <text x="180" y="24" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="750">${lang === 'en' ? "Kelvin contact resistance (4-Wire Sense)" : "Kelvin 四線式接觸阻抗量測法 (4-Wire Sense)"}</text>

            <!-- 電流源 (Force Loop: 橘線) -->
            <g transform="translate(30, 45)">
              <rect x="0" y="0" width="300" height="42" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="150" y="25" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">${lang === 'en' ? "Constant-current source I_force =" : "定電流源 I_force ="} ${forceCurrent.toFixed(1)} mA</text>
            </g>

            <!-- 導線與待測電阻 DUT 串聯網格 -->
            <g transform="translate(30, 110)">
              <!-- Force+ 導線電阻 -->
              <rect x="10" y="10" width="70" height="26" fill="#334155" stroke="#f59e0b" stroke-width="1" rx="2"/>
              <text x="45" y="27" text-anchor="middle" fill="#cbd5e1" font-size="9.5">R_lead: ${leadResistance.toFixed(1)}Ω</text>
              <line x1="45" y1="-23" x2="45" y2="10" stroke="#f59e0b" stroke-width="2"/>

              <!-- Force- 導線電阻 -->
              <rect x="220" y="10" width="70" height="26" fill="#334155" stroke="#f59e0b" stroke-width="1" rx="2"/>
              <text x="255" y="27" text-anchor="middle" fill="#cbd5e1" font-size="9.5">R_lead: ${leadResistance.toFixed(1)}Ω</text>
              <line x1="255" y1="-23" x2="255" y2="10" stroke="#f59e0b" stroke-width="2"/>

              <!-- 中間待測孔 R_DUT -->
              <rect x="110" y="2" width="80" height="42" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
              <text x="150" y="20" text-anchor="middle" fill="#ffffff" font-size="10.5" font-weight="800">R_DUT</text>
              <text x="150" y="34" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700" data-ink="light">${rDUT} Ω (820mΩ)</text>

              <line x1="80" y1="23" x2="110" y2="23" stroke="#f59e0b" stroke-width="2"/>
              <line x1="190" y1="23" x2="220" y2="23" stroke="#f59e0b" stroke-width="2"/>

              <!-- Sense+ 與 Sense- 內引線 (藍色高阻抗電壓感測) -->
              <line x1="110" y1="23" x2="110" y2="85" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 2"/>
              <circle cx="110" cy="23" r="3" fill="#38bdf8"/>
              <line x1="190" y1="23" x2="190" y2="85" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 2"/>
              <circle cx="190" cy="23" r="3" fill="#38bdf8"/>
            </g>

            <!-- 高阻抗電壓表 (Sense Meter: 藍框) -->
            <g transform="translate(80, 205)">
              <rect x="0" y="0" width="200" height="50" rx="4" fill="#0b1329" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="100" y="22" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="750">${lang === 'en' ? "High-Z voltmeter (I_sense ≈ 0)" : "高阻抗電壓計 (I_sense ≈ 0)"}</text>
              <text x="100" y="38" text-anchor="middle" fill="#34d399" font-size="10.5" font-family="monospace" font-weight="700">V_sense = ${vSense} mV</text>
            </g>

            <!-- 比較結論看板 -->
            <g transform="translate(25, 275)">
              <rect x="0" y="0" width="310" height="65" rx="4" fill="#020617" stroke="#334155" stroke-width="1"/>
              <text x="15" y="24" fill="#ef4444" font-size="10.5" font-weight="700">${lang === 'en' ? "2-Wire:" : "傳統 2-Wire:"} ${r2Wire.toFixed(2)} Ω ${lang === 'en' ? "(lead drop; error +" : "(包含導線壓降，誤差 +"}${err2Wire}%)</text>
              <text x="15" y="48" fill="#10b981" font-size="11" font-weight="800">Kelvin 4-Wire: ${r4Wire.toFixed(2)} Ω ${lang === 'en' ? "(zero sense current, zero error!)" : "(Sense 無電流，精準零誤差!)"}</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 220,90 L 380,220 L 580,90" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-dasharray="7 5" class="anim-data-flow" opacity="0.75"/><circle cx="380" cy="220" r="24" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="4 4" class="anim-beam" opacity="0.7"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "True contact resistance (R_DUT)" : "接觸孔真實電阻 (R_DUT)"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${rDUT} Ω (820 mΩ)</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "True via / contact plug resistance" : "Via / Contact Plug 物理真值"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Standard reading (2-Wire)" : "傳統二線量測值 (2-Wire)"}</div>
          <div class="eng-obj-metric-value" style="color: #ef4444;">${r2Wire.toFixed(2)} Ω (+${err2Wire}%)</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Parasitic lead resistance " : "寄生導線阻抗 "}${leadResistance}×2${lang === 'en' ? " Ω causes large error" : " Ω 嚴重失真"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Kelvin reading (4-Wire)" : "Kelvin 四線量測值 (4-Wire)"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${r4Wire.toFixed(2)} Ω (${lang === 'en' ? "0.00% error" : "0.00% 誤差"})</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Zero sense current eliminates lead resistance" : "Sense 端零電流，徹底抵消導線電阻"}</div>
        </div>
      `;

      footerNote = t.ch19_wat_desc;
    } else if (activeTab === 'cp') {
      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch19OdSlider">${t.ch19_od_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch19OdSlider" min="0" max="80" step="5" value="${probeOD}">
            <span class="eng-obj-slider-val">${probeOD} µm</span>
          </div>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: #94a3b8; font-family: monospace;">${lang === 'en' ? "Contact force:" : "下壓力:"} <strong style="color: #38bdf8; font-size: 13px;">${contactForce} gf/pin</strong></span>
            <span class="ch19-test-status" data-status="${cpStatus}" style="font-size: 11px; padding: 2px 7px; border-radius: 4px; background: rgba(15,23,42,0.6); border: 1px solid var(--border-subtle); color: ${cpStatus === 'pass' ? '#10b981' : (cpStatus === 'false_open' ? '#ef4444' : '#f59e0b')}; font-weight: 700;">
              ${t.ch19_rc_label}: ${rcProbe} Ω (${cpStatus === 'pass' ? (lang === 'en' ? "✓ Good contact" : '✓ 良好接觸') : (cpStatus === 'false_open' ? (lang === 'en' ? "⚠️ False open (oxide intact)" : '⚠️ 假開路 (未破氧化膜)') : (lang === 'en' ? "⚠️ Excess pressure (bump damage)" : '⚠️ 過壓 (刮傷凸塊)'))})
            </span>
          </div>
        </div>
      `;

      // 探針下壓垂直位移與滑移刮痕 (Scrubbing) 物理形變
      const tipDy = Math.round(probeOD * 0.45);
      const tipDx = Math.round(probeOD * 0.22);

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CP Probe Card Touchdown and Scrubbing Mechanics">
          <!-- 上方探針卡基板 (Probe Card PCB & Space Transformer) -->
          <g transform="translate(80, 25)">
            <rect x="0" y="0" width="640" height="42" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="320" y="26" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="750">${lang === 'en' ? "Vertical probe card: 45,000+ MEMS spring probes" : "垂直探針卡基板 (Vertical Probe Card: 45,000+ MEMS 微彈簧針)"}</text>
          </g>

          <!-- 微彈簧垂直探針束 (動態下壓與滑移 Scrubbing) -->
          <g transform="translate(110, 67)">
            ${Array.from({ length: 16 }, (_, i) => {
              const baseY = 80;
              const currentTipY = baseY + tipDy;
              const currentTipX = tipDx;
              return `
                <g transform="translate(${i * 36 + 15}, 0)">
                  <!-- 彈簧針主體 (隨 Overdrive 彎曲) -->
                  <path d="M 0,0 C 8,${Math.round(currentTipY * 0.4)} -12,${Math.round(currentTipY * 0.7)} ${currentTipX},${currentTipY}" fill="none" stroke="#cbd5e1" stroke-width="2.5"/>
                  <!-- 探針針尖 (Touchdown Scrub Point) -->
                  <circle cx="${currentTipX}" cy="${currentTipY}" r="3.5" fill="${cpStatus === 'pass' ? '#10b981' : (cpStatus === 'false_open' ? '#ef4444' : '#f59e0b')}"/>
                </g>
              `;
            }).join('')}
            <text x="290" y="65" text-anchor="middle" fill="#94a3b8" font-size="11">${lang === 'en' ? "Overdrive " : "下壓行程 "}${probeOD} µm${lang === 'en' ? " · Contact force " : " · 觸地接觸壓力 "}${contactForce} gf/pin${lang === 'en' ? " · Tip scrub to break oxide " : " · 針尖水平滑移破膜 "}${tipDx} µm</text>
          </g>

          <!-- 下方被測晶粒微凸塊 (Die Micro-Bumps) 與晶圓 -->
          <g transform="translate(80, 215)">
            <!-- 晶片凸塊陣列 (Micro-Bumps with Scrub Marks) -->
            ${Array.from({ length: 16 }, (_, i) => `
              <g transform="translate(${i * 36 + 45}, 0)">
                <circle cx="0" cy="0" r="8" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>
                ${probeOD >= 20 ? `
                  <!-- 探針刮痕 (Scrub Mark: 刺破氧化層露出新鮮焊料) -->
                  <line x1="-3" y1="0" x2="${Math.min(5, tipDx - 2)}" y2="0" stroke="#ffffff" stroke-width="2.5"/>
                ` : ''}
              </g>
            `).join('')}

            <!-- 被測晶粒主體 (DUT) -->
            <rect x="10" y="12" width="620" height="95" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
            <text x="320" y="50" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">${lang === 'en' ? "Die under test: CPU/GPU core" : "待測晶片 (Die Under Test: CPU/GPU 核心)"}</text>
            <text x="320" y="72" text-anchor="middle" fill="#34d399" font-size="11">${lang === 'en' ? "Test vectors (2.4 GHz Clock · Scan Chain · BIST) · Contact resistance Rc =" : "高速測試向量激勵 (2.4 GHz Clock · Scan Chain · BIST 自檢) · 接觸電阻 Rc ="} ${rcProbe} Ω</text>
          </g>

          <!-- 下方晶圓真空吸盤 (Wafer Chuck) -->
          <rect x="60" y="340" width="680" height="30" fill="#334155" rx="3"/>
          <text x="400" y="360" text-anchor="middle" fill="#cbd5e1" font-size="11">${lang === 'en' ? "Wafer prober vacuum chuck: thermal control -40°C ~ 125°C" : "晶圓真空吸盤載台 (Wafer Prober Chuck with Thermal Control -40°C ~ 125°C)"}</text>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 220,90 L 380,220 L 580,90" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-dasharray="7 5" class="anim-data-flow" opacity="0.75"/><circle cx="380" cy="220" r="24" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="4 4" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch19_metric_pins}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${lang === 'en' ? "45,000+ pins" : "45,000+ 針"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Dense vertical MEMS spring probe array" : "垂直 MEMS 微彈簧針高密度佈置"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Contact resistance (Rc)" : "接觸電阻 (Rc)"}</div>
          <div class="eng-obj-metric-value" style="color: ${cpStatus === 'pass' ? 'var(--semi-teal)' : '#ef4444'};">${rcProbe} Ω (${contactForce} gf)</div>
          <div class="eng-obj-metric-note">${cpStatus === 'pass' ? (lang === 'en' ? "Oxide fully broken; excellent test-signal integrity" : '破膜充分，測試訊號完整度極佳') : (cpStatus === 'false_open' ? (lang === 'en' ? "⚠️ Insufficient overdrive; intact oxide causes a false open" : '⚠️ 下壓不足，氧化膜未破造成假開路') : (lang === 'en' ? "⚠️ Excessive overdrive; deep micro-bump scratches!" : '⚠️ 下壓過大，微凸塊刮痕過深！'))}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch19_metric_freq}</div>
          <div class="eng-obj-metric-value">&gt; 2.4 GHz</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Coaxial spring-probe shielding and impedance matching" : "微彈簧同軸屏蔽，阻抗匹配良好"}</div>
        </div>
      `;

      footerNote = t.ch19_cp_desc;
    } else if (activeTab === 'binmap') {
      // 繪製完整的 Bin Map 晶粒分類圖
      const dies = [];
      const rows = 8;
      const cols = 8;
      for (let r = -3; r <= 3; r++) {
        for (let c = -3; c <= 3; c++) {
          if (r * r + c * c <= 11) {
            let bin = 1; // 預設良品
            if (r === 2 && c === 2) bin = 7; // 短路
            else if (r === -2 && c === 1) bin = 9; // 漏電
            else if (r === 0 && c === -3) bin = 2; // 降頻
            dies.push({ x: c * 32 + 180, y: r * 32 + 180, bin });
          }
        }
      }

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wafer Bin Map Classification Diagram">
          <!-- 左側：晶圓 Bin Map 分類圖 -->
          <g transform="translate(60, 30)">
            <circle cx="180" cy="180" r="160" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
            <polygon points="175,338 185,338 180,344" fill="#38bdf8"/>

            ${dies.map(d => {
              let fill = '#10b981'; // Bin 1
              if (d.bin === 2) fill = '#f59e0b'; // Bin 2
              else if (d.bin === 7) fill = '#ef4444'; // Bin 7
              else if (d.bin === 9) fill = '#8b5cf6'; // Bin 9
              return `
                <rect x="${d.x - 12}" y="${d.y - 12}" width="24" height="24" rx="2" fill="${fill}" stroke="#0f172a" stroke-width="1.5"/>
              `;
            }).join('')}
          </g>

          <!-- 右側：Bin 分類圖例與封裝對接說明 -->
          <g transform="translate(440, 40)">
            <rect x="0" y="0" width="310" height="320" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <text x="20" y="32" fill="#38bdf8" font-size="13" font-weight="750">${lang === 'en' ? "CP die bin classification" : "CP 晶粒分類結果 (Bin Classification)"}</text>

            <g transform="translate(20, 55)">
              <!-- Bin 1 -->
              <rect x="0" y="0" width="20" height="20" fill="#10b981" rx="2"/>
              <text x="30" y="15" fill="#34d399" font-size="11" font-weight="750">${lang === 'en' ? "Bin 1: Prime (all functions pass · 94.2%)" : "Bin 1: Prime 良品 (全功能通過 · 94.2%)"}</text>

              <!-- Bin 2 -->
              <rect x="0" y="35" width="20" height="20" fill="#f59e0b" rx="2"/>
              <text x="30" y="50" fill="#fbbf24" font-size="11" font-weight="750">${lang === 'en' ? "Bin 2: Lower speed / partial cores · 3.1%" : "Bin 2: Speed Bin (降頻/部分核心可用 · 3.1%)"}</text>

              <!-- Bin 7 -->
              <rect x="0" y="70" width="20" height="20" fill="#ef4444" rx="2"/>
              <text x="30" y="85" fill="#f87171" font-size="11" font-weight="750">${lang === 'en' ? "Bin 7: Gross Fail (open / short · 1.8%)" : "Bin 7: Gross Fail (開路/短路失效 · 1.8%)"}</text>

              <!-- Bin 9 -->
              <rect x="0" y="105" width="20" height="20" fill="#8b5cf6" rx="2"/>
              <text x="30" y="120" fill="#a78bfa" font-size="11" font-weight="750">${lang === 'en' ? "Bin 9: Parametric Fail (excess leakage · 0.9%)" : "Bin 9: Parametric Fail (漏電超標 · 0.9%)"}</text>
            </g>

            <!-- 封裝揀晶對接流程 -->
            <g transform="translate(20, 205)">
              <rect x="0" y="0" width="270" height="95" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="12" y="24" fill="#38bdf8" font-size="11" font-weight="750">${lang === 'en' ? "To advanced packaging assembly:" : "傳送至先進封裝廠 (To Assembly):"}</text>
              <foreignObject x="12" y="32" width="246" height="55">
                <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 11px; color: #cbd5e1; line-height: 1.4;">
                  ${lang === 'en' ? "Bin Map XML ships with the wafer. Pick only green Bin 1 dies for 2.5D/3D packaging to avoid costly interposer waste." : "電子 Bin Map XML 隨晶圓出貨。自動揀晶機 (Die Bonder) 只吸取綠色 Bin 1 良品進入 2.5D/3D 封裝，杜絕浪費高價中介層！"}
                </div>
              </foreignObject>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 220,90 L 380,220 L 580,90" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-dasharray="7 5" class="anim-data-flow" opacity="0.75"/><circle cx="380" cy="220" r="24" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="4 4" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "CP prime die yield" : "CP 晶粒合格良率 (Prime Yield)"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">94.2% (${lang === 'en' ? "584 / 620 dies" : "584 / 620 顆"})</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "High-yield production example for a mature flagship node" : "成熟旗艦節點的高良率量產典範"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Secondary usable dies (Bin 2)" : "次級可用晶粒 (Bin 2)"}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "3.1% (lower-speed products)" : "3.1% (可做降頻版)"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Disable faulty compute units with eFuses for resale" : "熔斷禁用瑕疵運算單元 (eFuse) 轉售市場"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Assembly handoff format" : "封裝對接格式"}</div>
          <div class="eng-obj-metric-value">SEMI E142 XML</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Wafer-map coordinates guide the precision die bonder" : "晶圓圖座標直接驅動高精度固晶機"}</div>
        </div>
      `;

      footerNote = t.ch19_binmap_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh19Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 19</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh19Title">${t.ch19_title}</h2>
          <p class="eng-obj-subtitle">${t.ch19_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'wat' ? 'is-active' : ''}" data-tab="wat">${t.ch19_tab_wat}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'cp' ? 'is-active' : ''}" data-tab="cp">${t.ch19_tab_cp}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'binmap' ? 'is-active' : ''}" data-tab="binmap">${t.ch19_tab_binmap}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Wafer Probe & KGD Clauses' : '晶圓針測與 KGD 條例 (Probe Clauses)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'WAT · Cobra · MEMS · 3D KGD' : 'WAT · Cobra · MEMS · 3D KGD'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? '4-wire Kelvin WAT, C4 Cobra, 20µm MEMS micro-bump probe & bumpless 3D BIST' : 'Kelvin 四線 WAT、C4 垂直探針、20µm 微凸塊 MEMS 探針與無凸塊 3D BIST'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Kelvin 4-Wire, Holm & Williams-Brown Law' : 'Kelvin 四線與 3D 測試逃逸率律 (Test Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'R_DUT = V_sense/I_force · DL = 1 - Y^(1-FC)' : 'R_DUT = V_sense/I_force · DL = 1 - Y^(1-FC)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Nullifies lead resistance, controls 5–15 µm OD & bounds 3D DL' : '消除探針引線電阻、微凸塊 5–15 µm 受控超程與 KGD 逃逸率壓縮'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Auto-Polish Rc · PMI Cratering · Decap' : 'Auto-Polish Rc · PMI Cratering · Decap'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Eliminates high-Rc false fails, sub-pad ULK cratering & multi-site bounce' : '自動清針與重測消除假死粒誤殺、低針壓 MEMS 防焊墊裂紋與針尖電容抑制壓降'}</div>
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

    const forceSlider = container.querySelector('#ch19ForceSlider');
    if (forceSlider) {
      bindEngineeringEvent(forceSlider, 'input', (e) => {
        forceCurrent = parseFloat(e.target.value);
        update();
      });
    }

    const leadSlider = container.querySelector('#ch19LeadSlider');
    if (leadSlider) {
      bindEngineeringEvent(leadSlider, 'input', (e) => {
        leadResistance = parseFloat(e.target.value);
        update();
      });
    }

    const odSlider = container.querySelector('#ch19OdSlider');
    if (odSlider) {
      bindEngineeringEvent(odSlider, 'input', (e) => {
        probeOD = parseInt(e.target.value, 10);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 17. Ch 01 Class 1 垂直層流無塵室、OHT 天車與 FOUP 氣密對接模型 (Fab Environment)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderWaferTestObject as render };
