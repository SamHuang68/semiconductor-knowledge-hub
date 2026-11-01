import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderSoftwareHardwareTruthObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  const L = (zh, en) => lang === 'en' ? en : zh;
  let activeTab = 'rowhammer'; // 'rowhammer' | 'pvt' | 'irdrop'
  let hammerActivations = 0; // 累計讀取次數
  let pvtCorner = 'TT'; // 'TT' | 'SS' | 'FF'
  let isBurst = false; // 是否處於突發高負載

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'rowhammer') {
      const isFlipped = hammerActivations >= 100000;
      const chargeLevel = Math.max(0, 100 - Math.floor(hammerActivations / 1000));

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DRAM Row Hammer Capacitor Leakage Mechanism">
          <!-- 上方互動控制按鈕 -->
          <g transform="translate(100, 20)">
            <rect x="0" y="0" width="190" height="26" rx="4" id="rowHammerAttackBtn" role="button" tabindex="0" aria-label="${esc(L("激發攻擊行 25000 次", "Activate aggressor 25,000 times"))}" fill="#ef4444" style="cursor: pointer;"/>
            <text x="95" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750" pointer-events="none">${L("激發攻擊行 (+25,000次)", "Activate row (+25,000)")}</text>

            <rect x="210" y="0" width="170" height="26" rx="4" id="rowHammerTrrBtn" role="button" tabindex="0" aria-label="${esc(L("刷新並重設教學示例", "Refresh and reset the teaching example"))}" fill="#10b981" style="cursor: pointer;"/>
            <text x="295" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750" pointer-events="none">${L("刷新／重設示例 ↺", "Refresh / reset demo ↺")}</text>

            <rect x="400" y="0" width="160" height="26" rx="4" id="rowHammerResetBtn" role="button" tabindex="0" aria-label="${esc(L("重設教學計數器", "Reset the teaching counter"))}" fill="#1e293b" stroke="#475569" stroke-width="1" style="cursor: pointer;"/>
            <text x="480" y="17" text-anchor="middle" fill="#cbd5e1" font-size="11" pointer-events="none">${L("重置計數器", "Reset counter")}</text>
          </g>

          <!-- 中央：三相鄰字元線 (Wordlines) 微觀物理剖面 -->
          <g transform="translate(60, 65)">
            <rect x="0" y="0" width="680" height="325" rx="8" fill="#09131b" stroke="#1e293b" stroke-width="1.5"/>

            <!-- 1. 上方受害行 (Victim Row N-1) -->
            <g transform="translate(40, 25)">
              <rect x="0" y="0" width="340" height="65" rx="4" fill="#0f172a" stroke="${isFlipped ? '#ef4444' : '#334155'}" stroke-width="${isFlipped ? 2 : 1}"/>
              <text x="20" y="25" fill="${isFlipped ? '#ef4444' : '#38bdf8'}" font-size="11" font-weight="750">${L("受害行 N−1 儲存電容", "Victim row N−1 capacitors")}</text>
              <!-- 電荷狀態條 -->
              <rect x="20" y="35" width="220" height="16" rx="3" fill="#1e293b"/>
              <rect x="20" y="35" width="${(chargeLevel / 100) * 220}" height="16" rx="3" fill="${isFlipped ? '#ef4444' : '#10b981'}"/>
              <text x="250" y="48" fill="${isFlipped ? '#ef4444' : '#cbd5e1'}" font-size="10.5" font-weight="700">${L("電荷", "Charge")}: ${chargeLevel}%</text>
              <text x="310" y="48" fill="${isFlipped ? '#ef4444' : '#34d399'}" font-size="12" font-weight="800">${isFlipped ? L("Bit 0（翻轉）", "Bit 0 (flipped)") : 'Bit 1'}</text>
            </g>

            <!-- 2. 中間攻擊行 (Aggressor Row N - 被高頻頻繁開關) -->
            <g transform="translate(40, 110)">
              <rect x="0" y="0" width="340" height="85" rx="4" fill="#1e1b4b" stroke="#f59e0b" stroke-width="2"/>
              <text x="20" y="25" fill="#f59e0b" font-size="12" font-weight="800">${L("⚡ 攻擊行 N 字元線", "⚡ Aggressor row N")}</text>
              <text x="20" y="45" fill="#cbd5e1" font-size="10.5">${L("累計激發", "Activations")}: <tspan fill="#f59e0b" font-weight="800">${hammerActivations.toLocaleString()}</tspan></text>
              <!-- 頻繁震盪的電壓方波示意 -->
              <path d="M 20,70 L 40,70 L 40,55 L 60,55 L 60,70 L 80,70 L 80,55 L 100,55 L 100,70 L 120,70 L 120,55 L 140,55 L 140,70 L 160,70" fill="none" stroke="#f59e0b" stroke-width="2"/>
              <text x="180" y="68" fill="#f59e0b" font-size="10">${L("示例 V_WL: 1.2V ↔ 0V", "Example V_WL: 1.2V ↔ 0V")}</text>
            </g>

            <!-- 3. 下方受害行 (Victim Row N+1) -->
            <g transform="translate(40, 215)">
              <rect x="0" y="0" width="340" height="65" rx="4" fill="#0f172a" stroke="${isFlipped ? '#ef4444' : '#334155'}" stroke-width="${isFlipped ? 2 : 1}"/>
              <text x="20" y="25" fill="${isFlipped ? '#ef4444' : '#38bdf8'}" font-size="11" font-weight="750">${L("受害行 N+1 儲存電容", "Victim row N+1 capacitors")}</text>
              <!-- 電荷狀態條 -->
              <rect x="20" y="35" width="220" height="16" rx="3" fill="#1e293b"/>
              <rect x="20" y="35" width="${(chargeLevel / 100) * 220}" height="16" rx="3" fill="${isFlipped ? '#ef4444' : '#10b981'}"/>
              <text x="250" y="48" fill="${isFlipped ? '#ef4444' : '#cbd5e1'}" font-size="10.5" font-weight="700">${L("電荷", "Charge")}: ${chargeLevel}%</text>
              <text x="310" y="48" fill="${isFlipped ? '#ef4444' : '#34d399'}" font-size="12" font-weight="800">${isFlipped ? L("Bit 0（翻轉）", "Bit 0 (flipped)") : 'Bit 1'}</text>
            </g>

            <!-- 右側：物理原理與資安警示看板 -->
            <g transform="translate(400, 25)">
              <rect x="0" y="0" width="255" height="255" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="127" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${L("RowHammer 示意", "RowHammer illustration")}</text>
              <line x1="20" y1="35" x2="235" y2="35" stroke="#334155"/>

              <text x="15" y="60" fill="#cbd5e1" font-size="10.5">${L("• 幾何：示意，非按比例", "• Geometry: not to scale")}</text>
              <text x="15" y="85" fill="#cbd5e1" font-size="10.5">${L("• 機制：反覆激發擾動鄰近儲存格", "• Repeated activation disturbs nearby cells")}</text>
              <text x="15" y="110" fill="#cbd5e1" font-size="10.5">${L("• 此模型於 100,000 次激發翻轉", "• Demo flips at 100,000 activations")}</text>
              <text x="15" y="135" fill="#cbd5e1" font-size="10.5">${L("• 風險：資料損毀與安全漏洞", "• Risk: corruption and security flaws")}</text>

              <rect x="15" y="155" width="225" height="85" rx="4" fill="${isFlipped ? '#450a0a' : '#064e3b'}" stroke="${isFlipped ? '#ef4444' : '#10b981'}" stroke-width="1.5"/>
              <text x="127" y="180" text-anchor="middle" fill="${isFlipped ? '#ef4444' : '#34d399'}" font-size="11" font-weight="800">${isFlipped ? L("⚠ 位元翻轉（示例）", "⚠ Bit flip (demo)") : L("尚未達示例門檻", "Below demo threshold")}</text>
              <text x="127" y="200" text-anchor="middle" fill="#cbd5e1" font-size="9.5">${isFlipped ? L("示例中鄰近行資料已改變", "Nearby data changed in this demo") : L("電荷比例為示意，非實測", "Charge scale is illustrative")}</text>
              <text x="127" y="222" text-anchor="middle" fill="${isFlipped ? '#fca5a5' : '#a7f3d0'}" font-size="9.5">${isFlipped ? L("刷新不能恢復已遺失資料", "Refresh cannot recover lost data") : L("TRR 防護能力依實作而異", "TRR effectiveness varies by design")}</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 140,185 L 660,185 M 140,245 L 660,245" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="7 5" class="anim-data-flow" opacity="0.72"/><line x1="400" y1="85" x2="400" y2="335" stroke="#fbbf24" stroke-width="2.2" stroke-dasharray="6 5" class="anim-beam" opacity="0.7"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch24_metric_rowhammer_t}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${L("100,000 次（本教學模型）", "100,000 activations (this model)")}</div>
          <div class="eng-obj-metric-note">${L("固定教學門檻，非實測規格；真實門檻依晶片、資料型態與時序而異。", "Fixed teaching threshold, not a measured specification; real thresholds depend on the chip, data pattern, and timing.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("硬體防禦對策", "Hardware mitigation")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${L("TRR 目標行刷新", "Target Row Refresh (TRR)")}</div>
          <div class="eng-obj-metric-note">${L("翻轉前刷新可降低風險；刷新不能恢復已遺失資料。此按鈕會重設示例。", "Refreshing before a flip can reduce risk; refresh cannot restore lost data. This button resets the demo.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("伺服器保護機制", "Server protection")}</div>
          <div class="eng-obj-metric-value">${L("ECC 錯誤檢查與更正", "Error-correcting codes (ECC)")}</div>
          <div class="eng-obj-metric-note">${L("SEC-DED 可更正每碼字一位元、偵測兩位元錯誤；不是所有 RowHammer 的保證防護。", "SEC-DED corrects one bit and detects two bits per codeword; it does not guarantee protection from every RowHammer pattern.")}</div>
        </div>
      `;

      footerNote = t.ch24_rowhammer_desc;
    } else if (activeTab === 'pvt') {
      const pvtData = {
        SS: { name: L("SS 慢角（搭配高溫低壓示例）", "SS slow corner (hot / low-V example)"), temp: '105 °C', volt: '0.675 V (-10%)', speed: L("−25% 速度（示例）", "−25% (example)"), risk: L("Setup 建立時間風險", "Setup risk") },
        TT: { name: L("TT 典型角（示例條件）", "TT typical corner (example conditions)"), temp: '25 °C', volt: L("0.750 V（標稱）", "0.750 V (nominal)"), speed: L("基準速度 (100%)", "Baseline (100%)"), risk: L("需驗證裕量", "Check margin") },
        FF: { name: L("FF 快角（搭配低溫高壓示例）", "FF fast corner (cold / high-V example)"), temp: '-20 °C', volt: '0.825 V (+10%)', speed: L("+28% 速度（示例）", "+28% (example)"), risk: L("Hold 保持時間風險", "Hold risk") }
      };
      const cur = pvtData[pvtCorner];

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PVT Process Corners and DVFS Model">
          <!-- 上方工藝角按鈕 -->
          <g transform="translate(100, 20)">
            ${Object.keys(pvtData).map((c, i) => `
              <g class="pvt-btn" data-corner="${c}" role="button" tabindex="0" aria-pressed="${pvtCorner === c}" aria-label="${esc(`${c} ${L("製程角示例", "corner example")}`)}" style="cursor: pointer;" transform="translate(${i * 200}, 0)">
                <rect x="0" y="0" width="180" height="28" rx="4" fill="${pvtCorner === c ? (c === 'SS' ? '#ef4444' : c === 'TT' ? '#10b981' : '#38bdf8') : '#1e293b'}" stroke="${pvtCorner === c ? '#ffffff' : '#334155'}" stroke-width="1.5"/>
                <text x="90" y="18" text-anchor="middle" fill="${pvtCorner === c ? '#09131b' : '#cbd5e1'}" font-size="11.5" font-weight="800">${c} Corner (${c === 'SS' ? L("慢速", "slow") : c === 'TT' ? L("典型", "typical") : L("快速", "fast")})</text>
              </g>
            `).join('')}
          </g>

          <!-- 中央：常態分佈鐘形曲線與晶片分箱 (Binning) -->
          <g transform="translate(60, 65)">
            <rect x="0" y="0" width="680" height="325" rx="8" fill="#09131b" stroke="#1e293b" stroke-width="1.5"/>

            <!-- 標題 -->
            <text x="30" y="30" fill="#38bdf8" font-size="13" font-weight="750">${L("教學情境", "Teaching scenario")}: ${cur.name}</text>

            <!-- 鐘形常態分佈高斯曲線 -->
            <g transform="translate(50, 60)">
              <!-- 坐標軸 -->
              <line x1="0" y1="180" x2="360" y2="180" stroke="#475569" stroke-width="2"/>
              <line x1="180" y1="20" x2="180" y2="180" stroke="#475569" stroke-dasharray="4,4"/>

              <!-- 高斯曲線 -->
              <path d="M 20,175 Q 100,165 140,80 Q 180,10 220,80 Q 260,165 340,175" fill="none" stroke="#94a3b8" stroke-width="2.5"/>

              <!-- 區間標記 -->
              <!-- SS 區 (左) -->
              <rect x="20" y="20" width="100" height="160" fill="#ef4444" opacity="${pvtCorner === 'SS' ? '0.35' : '0.08'}"/>
              <text x="70" y="195" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">${L("SS（慢製程角）", "SS (slow corner)")}</text>

              <!-- TT 區 (中) -->
              <rect x="120" y="20" width="120" height="160" fill="#10b981" opacity="${pvtCorner === 'TT' ? '0.35' : '0.08'}"/>
              <text x="180" y="195" text-anchor="middle" fill="#10b981" font-size="10" font-weight="700">${L("TT（典型製程角）", "TT (typical corner)")}</text>

              <!-- FF 區 (右) -->
              <rect x="240" y="20" width="100" height="160" fill="#38bdf8" opacity="${pvtCorner === 'FF' ? '0.35' : '0.08'}"/>
              <text x="290" y="195" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700">${L("FF（快製程角）", "FF (fast corner)")}</text>

              <!-- 當前點指針 -->
              ${(() => {
                const cx = pvtCorner === 'SS' ? 70 : pvtCorner === 'TT' ? 180 : 290;
                return `
                  <line x1="${cx}" y1="10" x2="${cx}" y2="180" stroke="#ffffff" stroke-width="2.5"/>
                  <circle cx="${cx}" cy="${pvtCorner === 'TT' ? 10 : 80}" r="6" fill="#f59e0b"/>
                `;
              })()}
            </g>

            <!-- 右側：DVFS 軟韌體調校策略看板 -->
            <g transform="translate(420, 50)">
              <rect x="0" y="0" width="230" height="240" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="115" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${L("PVT 教學情境", "PVT teaching scenarios")}</text>
              <line x1="20" y1="35" x2="210" y2="35" stroke="#334155"/>

              <text x="15" y="60" fill="#94a3b8" font-size="10.5">${L("示例結溫 Tj：", "Example Tj:")}</text>
              <text x="115" y="60" fill="#ffffff" font-size="11" font-weight="700">${cur.temp}</text>

              <text x="15" y="85" fill="#94a3b8" font-size="10.5">${L("示例 Vcore：", "Example Vcore:")}</text>
              <text x="115" y="85" fill="#ffffff" font-size="11" font-weight="700">${cur.volt}</text>

              <text x="15" y="110" fill="#94a3b8" font-size="10.5">${L("示例速度：", "Example speed:")}</text>
              <text x="115" y="110" fill="#f59e0b" font-size="11" font-weight="800">${cur.speed}</text>

              <text x="15" y="135" fill="#94a3b8" font-size="10.5">${L("可能時序風險：", "Potential risk:")}</text>
              <text x="115" y="135" fill="#ef4444" font-size="10" font-weight="700">${cur.risk}</text>

              <rect x="15" y="155" width="200" height="65" rx="3" fill="#1e293b"/>
              <text x="115" y="175" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="750">${L("DVFS 調校方向（需驗證）：", "DVFS options (validate first):")}</text>
              <text x="115" y="195" text-anchor="middle" fill="#cbd5e1" font-size="9.5">${pvtCorner === 'SS' ? L("僅在核准範圍內調壓或降頻", "Use approved voltage / frequency") : pvtCorner === 'TT' ? L("使用經驗證的 P-State", "Use validated P-states") : L("驗證降低電壓後的時序", "Validate timing at lower voltage")}</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 140,185 L 660,185 M 140,245 L 660,245" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="7 5" class="anim-data-flow" opacity="0.72"/><line x1="400" y1="85" x2="400" y2="335" stroke="#fbbf24" stroke-width="2.2" stroke-dasharray="6 5" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch24_metric_pvt_spread}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">± 25% ~ 30%</div>
          <div class="eng-obj-metric-note">${L("教學離散度示例，非此晶圓量測；P、V、T 為獨立的驗證維度。", "Illustrative spread, not wafer measurements; process, voltage, and temperature are independent validation dimensions.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("晶片分箱機制 (Binning)", "Chip binning")}</div>
          <div class="eng-obj-metric-value">Speed Binned</div>
          <div class="eng-obj-metric-note">${L("依量測的時序、功耗與產品規格分級；慢角不必然更省電。", "Bin against measured timing, power, and product specifications; slow corners are not necessarily lower-power.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("eFuse 校準資料", "eFuse calibration data")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${L("依產品實作", "Product-dependent")}</div>
          <div class="eng-obj-metric-note">${L("部分產品讓韌體讀取逐晶粒校準值；需依資料表與驗證流程。", "Some products expose per-die calibration to firmware; follow the datasheet and validation process.")}</div>
        </div>
      `;

      footerNote = t.ch24_pvt_desc;
    } else {
      // irdrop 模式
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IR Drop Dynamic Voltage Drop and Clock Jitter">
          <!-- 上方控制切換 -->
          <g transform="translate(240, 20)">
            <rect x="0" y="0" width="160" height="26" rx="4" class="burst-btn" data-burst="false" role="button" tabindex="0" aria-pressed="${isBurst === false}" aria-label="${esc(L("閒置負載示例", "Idle-load example"))}" fill="${!isBurst ? '#10b981' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="80" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750" pointer-events="none">${L("穩定閒置負載", "Idle example")}</text>

            <rect x="180" y="0" width="160" height="26" rx="4" class="burst-btn" data-burst="true" role="button" tabindex="0" aria-pressed="${isBurst === true}" aria-label="${esc(L("突發負載示例", "Burst-load example"))}" fill="${isBurst ? '#ef4444' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="260" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750" pointer-events="none">${L("⚡ 突發負載", "⚡ Burst example")}</text>
          </g>

          <g transform="translate(60, 65)">
            <rect x="0" y="0" width="680" height="325" rx="8" fill="#09131b" stroke="#1e293b" stroke-width="1.5"/>

            <!-- 標題 -->
            <text x="30" y="30" fill="#38bdf8" font-size="13" font-weight="750">${L("PDN 電阻壓降示意：ΔV = I_core × R_metal", "PDN resistive-drop illustration: ΔV = I_core × R_metal")}</text>

            <!-- 示波器波形圖 -->
            <g transform="translate(50, 50)">
              <!-- 坐標系 -->
              <rect x="0" y="0" width="360" height="220" rx="4" fill="#000000" stroke="#334155" stroke-width="1"/>
              <!-- 示波器網格 -->
              ${[0, 1, 2, 3, 4].map(y => `<line x1="0" y1="${y * 55}" x2="360" y2="${y * 55}" stroke="#1e293b" stroke-width="1"/>`).join('')}
              ${[0, 1, 2, 3, 4, 5, 6].map(x => `<line x1="${x * 60}" y1="0" x2="${x * 60}" y2="220" stroke="#1e293b" stroke-width="1"/>`).join('')}

              <!-- 標稱電壓參考線 0.75V -->
              <line x1="0" y1="55" x2="360" y2="55" stroke="#10b981" stroke-dasharray="4,4"/>
              <text x="10" y="45" fill="#10b981" font-size="10">${L("示例基準 Vdd = 0.75V", "Example baseline Vdd = 0.75V")}</text>

              <!-- 動態電壓波形 -->
              ${!isBurst ? `
                <path d="M 0,55 Q 90,53 180,56 T 360,55" fill="none" stroke="#10b981" stroke-width="3"/>
                <text x="180" y="100" text-anchor="middle" fill="#10b981" font-size="12" font-weight="700">${L("穩定基準示意，非零電阻壓降", "Stable baseline; not zero resistive drop")}</text>
              ` : `
                <!-- 突發瞬間的深刻下凹 (Voltage Sag) -->
                <path d="M 0,55 L 80,55 Q 110,55 130,150 Q 150,170 170,165 Q 210,130 250,60 L 360,55" fill="none" stroke="#ef4444" stroke-width="3.5"/>
                <!-- 壓降標記 -->
                <line x1="150" y1="55" x2="150" y2="165" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2,2"/>
                <text x="160" y="115" fill="#ef4444" font-size="12" font-weight="800">${L("示例下陷：−120 mV", "Example sag: −120 mV")}</text>
                <text x="180" y="195" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700">${L("示例瞬態電壓 0.63V", "Example transient voltage: 0.63V")}</text>
              `}
            </g>

            <!-- 右側：時序崩潰分析 -->
            <g transform="translate(440, 50)">
              <rect x="0" y="0" width="210" height="220" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="105" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${L("時序影響示例", "Illustrative timing impact")}</text>
              <line x1="20" y1="35" x2="190" y2="35" stroke="#334155"/>

              <text x="15" y="60" fill="#94a3b8" font-size="10.5">${L("示例電流：", "Example current:")}</text>
              <text x="115" y="60" fill="${isBurst ? '#ef4444' : '#10b981'}" font-size="11" font-weight="750">${isBurst ? L("85 A（突發）", "85 A (burst)") : L("12 A（閒置）", "12 A (idle)")}</text>

              <text x="15" y="85" fill="#94a3b8" font-size="10.5">${L("示例電阻：", "Example resistance:")}</text>
              <text x="115" y="85" fill="#ffffff" font-size="11">~ 1.4 mΩ</text>

              <text x="15" y="110" fill="#94a3b8" font-size="10.5">${L("示例延遲：", "Example delay:")}</text>
              <text x="115" y="110" fill="${isBurst ? '#ef4444' : '#10b981'}" font-size="11" font-weight="800">${isBurst ? '310 ps (+55%)' : L("200 ps（基準）", "200 ps (baseline)")}</text>

              <rect x="15" y="130" width="180" height="75" rx="4" fill="${isBurst ? '#450a0a' : '#064e3b'}" stroke="${isBurst ? '#ef4444' : '#10b981'}" stroke-width="1.5"/>
              <text x="105" y="155" text-anchor="middle" fill="${isBurst ? '#ef4444' : '#34d399'}" font-size="11" font-weight="800">${isBurst ? L("⚠ 可能時序違規", "⚠ Possible violation") : L("示例基準時序", "Example baseline timing")}</text>
              <text x="105" y="175" text-anchor="middle" fill="#cbd5e1" font-size="9">${isBurst ? L("結果依路徑與防護而異", "Outcome depends on path / protection") : L("仍須驗證建立時間裕量", "Validate setup margin")}</text>
              <text x="105" y="195" text-anchor="middle" fill="${isBurst ? '#fca5a5' : '#a7f3d0'}" font-size="9">${isBurst ? L("選項：評估去耦與負載斜率", "Assess decoupling / load ramp") : L("12 A × 1.4 mΩ ≈ 16.8 mV", "12 A × 1.4 mΩ ≈ 16.8 mV")}</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 140,185 L 660,185 M 140,245 L 660,245" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="7 5" class="anim-data-flow" opacity="0.72"/><line x1="400" y1="85" x2="400" y2="335" stroke="#fbbf24" stroke-width="2.2" stroke-dasharray="6 5" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch24_metric_irdrop_v}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 100 mV</div>
          <div class="eng-obj-metric-note">${L("未校準情境；波形為示意，非由電路瞬態模型求解。", "Uncalibrated scenario; the waveform is illustrative, not solved by a transient circuit model.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("延遲變化示例", "Example delay change")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">+ 30% ~ 55%</div>
          <div class="eng-obj-metric-note">${L("欠壓可增加延遲；此比例為教學假設，需製程與路徑量測。", "Undervoltage can increase delay; these percentages are teaching assumptions requiring process and path characterization.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("硬體選項：背面供電 (BSPDN)", "Hardware option: backside power")}</div>
          <div class="eng-obj-metric-value">${L("−40%（假設示例）", "−40% (assumed example)")}</div>
          <div class="eng-obj-metric-note">${L("改善取決於佈局與供電網路；40% 非通用效益或產品保證。", "Improvement depends on layout and the power network; 40% is not a universal benefit or product guarantee.")}</div>
        </div>
      `;

      footerNote = t.ch24_irdrop_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh24Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 24</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh24Title">${t.ch24_title}</h2>
          <p class="eng-obj-subtitle">${t.ch24_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'rowhammer' ? 'is-active' : ''}" data-tab="rowhammer">${t.ch24_tab_rowhammer}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'pvt' ? 'is-active' : ''}" data-tab="pvt">${t.ch24_tab_pvt}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'irdrop' ? 'is-active' : ''}" data-tab="irdrop">${t.ch24_tab_irdrop}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Hardware–Firmware Design Topics' : '硬體與韌體協同設計主題'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'TRR/PRAC · ECC · FTL · AVS · 3D NUMA' : 'TRR/PRAC · ECC · FTL · AVS · 3D NUMA'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Temp refresh & PRAC, On-Die ECC/Chipkill, NAND FTL/LDPC, AVS/droop & 3D NUMA' : 'DRAM 溫控刷新與 PRAC、On-Die ECC/Chipkill、NAND FTL/LDPC、AVS/壓降與 3D 排程'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Droop, Dynamic Power & Hamming Bound' : '壓降、動態功耗與 Hamming 界限'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'ΔV = I·R + L·di/dt · P_dyn ∝ V²f · 2^r ≥ k+r+1' : 'ΔV = I·R + L·di/dt · P_dyn ∝ V²f · 2^r ≥ k+r+1'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'PDN design, power management and ECC reduce risk; limits depend on the product and fault pattern.' : 'PDN 設計、電源管理與 ECC 降低風險；限制依產品與錯誤型態而異。'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Droop Stretch · SDC/PRAC · Read-Scrub' : 'Droop Stretch · SDC/PRAC · Read-Scrub'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Characterize droop, silent corruption and read disturb; validate each mitigation against its fault model.' : '量測壓降、靜默損毀與讀取擾動，並依各失效模型驗證對策。'}</div>
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

    const bindAction = (selector, action) => {
      container.querySelectorAll(selector).forEach(btn => {
        const activate = () => {
          const restoreFocus = btn === btn.ownerDocument.activeElement;
          const focusSelector = btn.id ? `#${btn.id}` : btn.dataset.corner
            ? `[data-corner="${btn.dataset.corner}"]` : `[data-burst="${btn.dataset.burst}"]`;
          action(btn);
          update();
          if (restoreFocus) container.querySelector(focusSelector)?.focus();
        };
        bindEngineeringEvent(btn, 'click', activate);
        bindEngineeringEvent(btn, 'keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); }
        });
      });
    };
    bindAction('#rowHammerAttackBtn', () => { hammerActivations += 25000; });
    bindAction('#rowHammerTrrBtn, #rowHammerResetBtn', () => { hammerActivations = 0; });
    bindAction('.pvt-btn', btn => { pvtCorner = btn.getAttribute('data-corner'); });
    bindAction('.burst-btn', btn => { isBurst = btn.getAttribute('data-burst') === 'true'; });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 26. App-Glossary 附錄 A：半導體全域術語拓撲星系與領域雷達圖模型
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderSoftwareHardwareTruthObject as render };
