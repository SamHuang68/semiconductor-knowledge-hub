import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderSmartFabAutomationObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  const L = (zh, en) => lang === 'en' ? en : zh;
  let activeTab = 'qtime'; // 'qtime' | 'interlock' | 'oee'
  let qtimeState = 'safe'; // 'safe' | 'warning' | 'expired'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'qtime') {
      let timeRemaining = qtimeState === 'safe' ? '3h 42m' : qtimeState === 'warning' ? '0h 18m' : L("逾時 12m", "12m overdue");
      let circleStroke = qtimeState === 'safe' ? '#10b981' : qtimeState === 'warning' ? '#f59e0b' : '#ef4444';
      let strokeDash = qtimeState === 'safe' ? '400, 500' : qtimeState === 'warning' ? '150, 500' : '0, 500';

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Q-Time Excursion Countdown and Alarm Model">
          <!-- 上方狀態切換按鈕 -->
          <g transform="translate(100, 20)">
            <rect x="0" y="0" width="180" height="26" rx="4" class="qtime-btn" data-q="safe" role="button" tabindex="0" aria-pressed="${qtimeState === 'safe'}" aria-label="${esc(L("安全示例", "Safe example"))}" fill="${qtimeState === 'safe' ? '#10b981' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="90" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" pointer-events="none">${L("模擬安全進度", "Safe example")}</text>

            <rect x="210" y="0" width="180" height="26" rx="4" class="qtime-btn" data-q="warning" role="button" tabindex="0" aria-pressed="${qtimeState === 'warning'}" aria-label="${esc(L("警報示例", "Warning example"))}" fill="${qtimeState === 'warning' ? '#f59e0b' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="300" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" pointer-events="none">${L("模擬臨界警報", "Warning example")}</text>

            <rect x="420" y="0" width="180" height="26" rx="4" class="qtime-btn" data-q="expired" role="button" tabindex="0" aria-pressed="${qtimeState === 'expired'}" aria-label="${esc(L("逾時示例", "Expired example"))}" fill="${qtimeState === 'expired' ? '#ef4444' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="510" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" pointer-events="none">${L("模擬逾時鎖機", "Expired example")}</text>
          </g>

          <!-- 中央：Q-Time 動態倒數計時鐘與物理機制對比 -->
          <g transform="translate(60, 65)">
            <rect x="0" y="0" width="680" height="325" rx="8" fill="#09131b" stroke="#1e293b" stroke-width="1.5"/>

            <!-- 左側：倒數圓環儀表 -->
            <g transform="translate(80, 50)">
              <circle cx="100" cy="100" r="85" fill="#0f172a" stroke="#334155" stroke-width="12"/>
              <circle cx="100" cy="100" r="85" fill="none" stroke="${circleStroke}" stroke-width="12" stroke-dasharray="${strokeDash}" stroke-linecap="round" transform="rotate(-90 100 100)"/>
              <text x="100" y="85" text-anchor="middle" fill="#94a3b8" font-size="12">${L("Q-Time 剩餘時間", "Q-time remaining")}</text>
              <text x="100" y="115" text-anchor="middle" fill="${circleStroke}" font-size="20" font-weight="800">${timeRemaining}</text>
              <text x="100" y="140" text-anchor="middle" fill="#64748b" font-size="10.5">${L("清洗 → 進爐（示例上限 4h）", "Clean → furnace (example: 4h)")}</text>
            </g>

            <!-- 右側：氧化層物理厚度與系統處置動作 -->
            <g transform="translate(320, 45)">
              <rect x="0" y="0" width="320" height="230" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="160" y="30" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${L("表面狀態與 MES 處置示例", "Surface state & MES example")}</text>
              <line x1="20" y1="45" x2="300" y2="45" stroke="#334155" stroke-width="1"/>

              <!-- 矽晶圓表面自然氧化層生長狀況 -->
              <g transform="translate(20, 60)">
                <text x="0" y="15" fill="#cbd5e1" font-size="11" font-weight="700">${L("矽表面自然氧化層（示意）：", "Native oxide (schematic):")}</text>
                <rect x="0" y="25" width="280" height="40" rx="3" fill="#1e293b"/>
                <!-- 矽基底 -->
                <rect x="0" y="45" width="280" height="20" fill="#38bdf8" opacity="0.7"/>
                <text x="140" y="60" text-anchor="middle" fill="#09131b" font-size="10" font-weight="700">${L("單晶矽基板", "Silicon substrate")}</text>
                <!-- 氧化層根據狀態變厚 -->
                <rect x="0" y="${qtimeState === 'safe' ? 40 : qtimeState === 'warning' ? 34 : 26}" width="280" height="${qtimeState === 'safe' ? 5 : qtimeState === 'warning' ? 11 : 19}" fill="${circleStroke}"/>
              </g>

              <g transform="translate(20, 150)">
                <text x="0" y="15" fill="#94a3b8" font-size="11">${L("示例厚度：", "Example thickness:")}</text>
                <text x="120" y="15" fill="${circleStroke}" font-size="11" font-weight="800">${qtimeState === 'safe' ? L("&lt; 0.2 nm（示例）", "&lt; 0.2 nm (example)") : qtimeState === 'warning' ? L("0.6 nm（示例）", "0.6 nm (example)") : L("&gt; 1.5 nm（示例）", "&gt; 1.5 nm (example)")}</text>

                <text x="0" y="40" fill="#94a3b8" font-size="11">${L("MES 處置：", "MES action:")}</text>
                <text x="120" y="40" fill="${circleStroke}" font-size="11" font-weight="800">${qtimeState === 'safe' ? L("正常排程派工", "Normal dispatch") : qtimeState === 'warning' ? L("提高搬運優先級", "Priority transfer") : L("鎖批待工程處置", "Hold for disposition")}</text>

                <text x="0" y="65" fill="#94a3b8" font-size="11">${L("示例接阻變化：", "Example resistance:")}</text>
                <text x="120" y="65" fill="${circleStroke}" font-size="11" font-weight="700">${qtimeState === 'safe' ? L("示例基準", "Example baseline") : qtimeState === 'warning' ? L("+15%（示例）", "+15% (example)") : L("&gt;+300%（示例）", "&gt;+300% (example)")}</text>
              </g>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,120 L 690,120 M 110,280 L 690,280" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="100" x2="400" y2="310" stroke="#34d399" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch23_metric_qtime_limit}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${L("4.0 小時（示例）", "4.0 hours (example)")}</div>
          <div class="eng-obj-metric-note">${L("未校準示例；實際 Q-Time 依表面處理、環境與後段製程訂定。", "Uncalibrated example; the actual Q-time depends on surface treatment, ambient conditions, and the next process.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("逾時處置示例", "Example expiry action")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${L("隔離並評估重洗", "Hold and assess reclean")}</div>
          <div class="eng-obj-metric-note">${L("依核准流程決定重洗或其他處置，不能一概自動重工。", "Use the approved disposition; reclean is not an automatic remedy for every excursion.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("調度示例", "Dispatch example")}</div>
          <div class="eng-obj-metric-value">${L("Rush Lot 優先派工", "Rush-lot priority")}</div>
          <div class="eng-obj-metric-note">${L("示例在剩餘 30 分鐘時提高 OHT 優先級；需容量與互鎖允許。", "Example: raise OHT priority with 30 minutes left, subject to capacity and interlocks.")}</div>
        </div>
      `;

      footerNote = t.ch23_qtime_desc;
    } else if (activeTab === 'interlock') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RFID Carrier and Recipe Poka-Yoke Interlock">
          <g transform="translate(60, 40)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${L("Load Port 三項互鎖檢查示例", "Load-port interlock: three example checks")}</text>

            <!-- 左側：FOUP 到達 Load Port -->
            <g transform="translate(40, 60)">
              <rect x="0" y="0" width="180" height="200" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
              <text x="90" y="30" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${L("300mm FOUP 晶圓盒", "300 mm FOUP")}</text>
              <rect x="30" y="50" width="120" height="80" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="90" y="95" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="800">Lot #P30912</text>
              <!-- RFID 標籤與射頻光波 -->
              <circle cx="90" cy="155" r="14" fill="#f59e0b" opacity="0.4"/>
              <text x="90" y="160" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="800">${L("RFID 標籤", "RFID tag")}</text>
            </g>

            <!-- 中間：MES 伺服器校驗三重檢核 -->
            <g transform="translate(260, 60)">
              <rect x="0" y="0" width="220" height="200" rx="6" fill="#09131b" stroke="#10b981" stroke-width="2"/>
              <text x="110" y="28" text-anchor="middle" fill="#10b981" font-size="12" font-weight="800">${L("MES 校驗", "MES checks")}</text>

              <!-- 檢核項 1 -->
              <g transform="translate(15, 45)">
                <circle cx="12" cy="12" r="9" fill="#10b981"/>
                <text x="12" y="16" text-anchor="middle" fill="#ffffff" font-size="10">✓</text>
                <text x="30" y="16" fill="#cbd5e1" font-size="10.5" font-weight="700">${L("1. 工單合法性驗證", "1. Authorized lot route")}</text>
              </g>

              <!-- 檢核項 2 -->
              <g transform="translate(15, 85)">
                <circle cx="12" cy="12" r="9" fill="#10b981"/>
                <text x="12" y="16" text-anchor="middle" fill="#ffffff" font-size="10">✓</text>
                <text x="30" y="16" fill="#cbd5e1" font-size="10.5" font-weight="700">${L("2. 配方版本與校驗碼", "2. Recipe / checksum")}</text>
              </g>

              <!-- 檢核項 3 -->
              <g transform="translate(15, 125)">
                <circle cx="12" cy="12" r="9" fill="#10b981"/>
                <text x="12" y="16" text-anchor="middle" fill="#ffffff" font-size="10">✓</text>
                <text x="30" y="16" fill="#cbd5e1" font-size="10.5" font-weight="700">${L("3. 腔體 PM 有效期驗證", "3. Chamber PM validity")}</text>
              </g>

              <rect x="15" y="155" width="190" height="30" rx="4" fill="#10b981" opacity="0.2"/>
              <text x="110" y="175" text-anchor="middle" fill="#34d399" font-size="11" font-weight="800">${L("三項符合 · 允許繼續", "All checks pass · proceed")}</text>
            </g>

            <!-- 右側：機台開門允許動作 -->
            <g transform="translate(520, 60)">
              <rect x="0" y="0" width="150" height="200" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
              <text x="75" y="30" text-anchor="middle" fill="#10b981" font-size="12" font-weight="750">${L("Load Port 門", "Load-port door")}</text>
              <rect x="25" y="60" width="100" height="90" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
              <text x="75" y="105" text-anchor="middle" fill="#34d399" font-size="13" font-weight="800">${L("允許開門 🔓", "Open permitted 🔓")}</text>
              <text x="75" y="175" text-anchor="middle" fill="#cbd5e1" font-size="10">${L("機器手臂搬運晶圓", "Robot transfers wafers")}</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,120 L 690,120 M 110,280 L 690,280" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="100" x2="400" y2="310" stroke="#34d399" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("校驗回應時間示例", "Example check latency")}</div>
          <div class="eng-obj-metric-value">${L("&lt; 0.2 秒（示例）", "&lt; 0.2 s (example)")}</div>
          <div class="eng-obj-metric-note">${L("示例目標，非量測或 SEMI 保證值；延遲依系統實作而異。", "Illustrative target, not a measurement or SEMI guarantee; latency depends on implementation.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("錯批進機防護", "Wrong-lot protection")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${L("零錯批為目標", "Zero misroutes: target")}</div>
          <div class="eng-obj-metric-note">${L("互鎖降低風險；需驗證資料、感測、例外流程與失效處置。", "Interlocks reduce risk; data, sensors, exceptions, and failure handling still need validation.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("配方版本簽核", "Recipe approval")}</div>
          <div class="eng-obj-metric-value">${L("電子簽核 (EDC/RMS)", "Electronic approval (EDC/RMS)")}</div>
          <div class="eng-obj-metric-note">${L("示例設定：只允許下載已核准版本，仍須核對機台回報。", "Example policy: download approved versions only, then verify the tool response.")}</div>
        </div>
      `;

      footerNote = t.ch23_interlock_desc;
    } else {
      // oee 模式
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fab Overall Equipment Effectiveness OEE Dashboard">
          <g transform="translate(60, 40)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="750">${L("OEE = 可用率 (A) × 表現效率 (P) × 品質良率 (Q)", "OEE = Availability (A) × Performance (P) × Quality (Q)")}</text>

            <!-- 三大指標長條 -->
            <!-- 1. 可用率 (Availability) -->
            <g transform="translate(40, 60)">
              <rect x="0" y="0" width="180" height="200" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
              <text x="90" y="30" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${L("可用率 (Availability)", "Availability")}</text>
              <text x="90" y="70" text-anchor="middle" fill="#38bdf8" font-size="28" font-weight="800">92.5%</text>
              <line x1="20" y1="90" x2="160" y2="90" stroke="#334155"/>
              <text x="90" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${L("運轉時間 / 計畫生產時間", "Run time / planned time")}</text>
              <text x="90" y="140" text-anchor="middle" fill="#94a3b8" font-size="9.5">${L("• 停機分類須明確", "• Define downtime scope")}</text>
              <text x="90" y="160" text-anchor="middle" fill="#94a3b8" font-size="9.5">${L("• 計入非計畫停機", "• Include unplanned stops")}</text>
            </g>

            <text x="245" y="160" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="800">×</text>

            <!-- 2. 表現效率 (Performance) -->
            <g transform="translate(270, 60)">
              <rect x="0" y="0" width="180" height="200" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
              <text x="90" y="30" text-anchor="middle" fill="#10b981" font-size="12" font-weight="750">${L("表現效率 (Performance)", "Performance")}</text>
              <text x="90" y="70" text-anchor="middle" fill="#10b981" font-size="28" font-weight="800">98.2%</text>
              <line x1="20" y1="90" x2="160" y2="90" stroke="#334155"/>
              <text x="90" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${L("實際產出 / 理想產能", "Actual / ideal output")}</text>
              <text x="90" y="140" text-anchor="middle" fill="#94a3b8" font-size="9.5">${L("• 搬運延遲損失", "• Transfer-delay losses")}</text>
              <text x="90" y="160" text-anchor="middle" fill="#94a3b8" font-size="9.5">${L("• 降速損失", "• Reduced-speed losses")}</text>
            </g>

            <text x="475" y="160" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="800">×</text>

            <!-- 3. 品質良率 (Quality) -->
            <g transform="translate(500, 60)">
              <rect x="0" y="0" width="180" height="200" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
              <text x="90" y="30" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="750">${L("品質良率 (Quality)", "Quality")}</text>
              <text x="90" y="70" text-anchor="middle" fill="#f59e0b" font-size="28" font-weight="800">99.4%</text>
              <line x1="20" y1="90" x2="160" y2="90" stroke="#334155"/>
              <text x="90" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${L("良品數 / 總產出數", "Good units / total units")}</text>
              <text x="90" y="140" text-anchor="middle" fill="#94a3b8" font-size="9.5">${L("• 扣除破片與刮傷", "• Breakage / scratches")}</text>
              <text x="90" y="160" text-anchor="middle" fill="#94a3b8" font-size="9.5">${L("• 扣除微粒超標瑕疵", "• Particle defects")}</text>
            </g>

            <!-- 下方：綜合 OEE 得分 -->
            <g transform="translate(140, 280)">
              <rect x="0" y="0" width="440" height="50" rx="6" fill="#09131b" stroke="#38bdf8" stroke-width="2"/>
              <text x="220" y="32" text-anchor="middle" fill="#34d399" font-size="16" font-weight="800">${L("綜合 OEE ≈ 90.3%（教學示例）", "OEE ≈ 90.3% (teaching example)")}</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,120 L 690,120 M 110,280 L 690,280" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="100" x2="400" y2="310" stroke="#34d399" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch23_metric_oee_target}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&gt; 90.0%</div>
          <div class="eng-obj-metric-note">${L("示例目標，非特定廠商或全產線績效；先定義時間分類與量測範圍。", "Example target, not a vendor or fleet benchmark; define time categories and measurement scope first.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${L("MTBF 示例目標", "Example MTBF target")}</div>
          <div class="eng-obj-metric-value">${L("&gt; 350 小時（示例）", "&gt; 350 hours (example)")}</div>
          <div class="eng-obj-metric-note">${L("未校準目標；需失效定義、運轉時間與維修紀錄支持。", "Uncalibrated target; requires failure definitions, operating hours, and maintenance records.")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch23_metric_fab_wip}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${L("~ 100,000+ 片（示例）", "~ 100,000+ wafers (example)")}</div>
          <div class="eng-obj-metric-note">${L("WIP 規模示例；不是即時廠務數據，也不保證流動平衡。", "Illustrative WIP scale, not live fab data or proof of balanced flow.")}</div>
        </div>
      `;

      footerNote = t.ch23_oee_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh23Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 23</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh23Title">${t.ch23_title}</h2>
          <p class="eng-obj-subtitle">${t.ch23_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'qtime' ? 'is-active' : ''}" data-tab="qtime">${t.ch23_tab_qtime}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'interlock' ? 'is-active' : ''}" data-tab="interlock">${t.ch23_tab_interlock}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'oee' ? 'is-active' : ''}" data-tab="oee">${t.ch23_tab_oee}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'CIM Systems & Related Standards' : 'CIM 系統與相關標準'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'MES · EAP/RMS · SECS/GEM300 · RTD' : 'MES · EAP/RMS · SECS/GEM300 · RTD'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'MES genealogy/Q-time, EAP/RMS zero-touch, SECS/GEM300/Interface A & RTD/YMS' : 'MES 履歷與 Q-time、EAP/RMS 零接觸防呆、SECS/GEM300/Interface A 與 RTD/YMS'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Little’s Law, Queueing Approximation & OEE' : '利特爾法則、排隊近似與 OEE'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'WIP = TH × CT · CT_q ∝ u/(1-u) · OEE = A×P×Q' : 'WIP = TH × CT · CT_q ∝ u/(1-u) · OEE = A×P×Q'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'X-factor ≈ 2.0 and u > 85% are examples, not universal limits; queueing depends on variability and capacity.' : 'X-factor ≈ 2.0 與 u > 85% 為示例，非通用門檻；排隊取決於變異與容量。'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Q-Time Kanban · E84 OHB · E90 SlotMap' : 'Q-Time Kanban · E84 OHB · E90 SlotMap'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Capacity-aware dispatch, E84 handshakes and slot checks reduce risk; validate exception handling.' : '容量調度、E84 交握與槽位檢查降低風險，仍須驗證例外處理。'}</div>
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

    container.querySelectorAll('.qtime-btn').forEach(btn => {
      const selectState = () => {
        const restoreFocus = btn === btn.ownerDocument.activeElement;
        qtimeState = btn.getAttribute('data-q');
        update();
        if (restoreFocus) container.querySelector(`[data-q="${qtimeState}"]`)?.focus();
      };
      bindEngineeringEvent(btn, 'click', selectState);
      bindEngineeringEvent(btn, 'keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectState(); }
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 25. Ch 24 軟韌體視角看晶片：Row Hammer、PVT 工藝角與 IR Drop 模型 (Firmware Perspective)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderSmartFabAutomationObject as render };
