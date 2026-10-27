import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderSmartFabAutomationObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'qtime'; // 'qtime' | 'interlock' | 'oee'
  let qtimeState = 'safe'; // 'safe' | 'warning' | 'expired'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'qtime') {
      let timeRemaining = qtimeState === 'safe' ? '3h 42m' : qtimeState === 'warning' ? '0h 18m' : '0h 00m (逾時 12m)';
      let circleStroke = qtimeState === 'safe' ? '#10b981' : qtimeState === 'warning' ? '#f59e0b' : '#ef4444';
      let strokeDash = qtimeState === 'safe' ? '400, 500' : qtimeState === 'warning' ? '150, 500' : '0, 500';

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Q-Time Excursion Countdown and Alarm Model">
          <!-- 上方狀態切換按鈕 -->
          <g transform="translate(100, 20)">
            <rect x="0" y="0" width="180" height="26" rx="4" class="qtime-btn" data-q="safe" fill="${qtimeState === 'safe' ? '#10b981' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="90" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">模擬安全進度 (Safe)</text>

            <rect x="210" y="0" width="180" height="26" rx="4" class="qtime-btn" data-q="warning" fill="${qtimeState === 'warning' ? '#f59e0b' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="300" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">模擬臨界警報 (Warning)</text>

            <rect x="420" y="0" width="180" height="26" rx="4" class="qtime-btn" data-q="expired" fill="${qtimeState === 'expired' ? '#ef4444' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="510" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">模擬逾時鎖機 (Expired)</text>
          </g>

          <!-- 中央：Q-Time 動態倒數計時鐘與物理機制對比 -->
          <g transform="translate(60, 65)">
            <rect x="0" y="0" width="680" height="325" rx="8" fill="#09131b" stroke="#1e293b" stroke-width="1.5"/>

            <!-- 左側：倒數圓環儀表 -->
            <g transform="translate(80, 50)">
              <circle cx="100" cy="100" r="85" fill="#0f172a" stroke="#334155" stroke-width="12"/>
              <circle cx="100" cy="100" r="85" fill="none" stroke="${circleStroke}" stroke-width="12" stroke-dasharray="${strokeDash}" stroke-linecap="round" transform="rotate(-90 100 100)"/>
              <text x="100" y="85" text-anchor="middle" fill="#94a3b8" font-size="12">Q-Time 剩餘時間</text>
              <text x="100" y="115" text-anchor="middle" fill="${circleStroke}" font-size="20" font-weight="800">${timeRemaining}</text>
              <text x="100" y="140" text-anchor="middle" fill="#64748b" font-size="10.5">清洗出槽 → 爐管進爐 (上限 4h)</text>
            </g>

            <!-- 右側：氧化層物理厚度與系統處置動作 -->
            <g transform="translate(320, 45)">
              <rect x="0" y="0" width="320" height="230" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="160" y="30" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">微觀物理機制與 MES 處置狀態</text>
              <line x1="20" y1="45" x2="300" y2="45" stroke="#334155" stroke-width="1"/>

              <!-- 矽晶圓表面自然氧化層生長狀況 -->
              <g transform="translate(20, 60)">
                <text x="0" y="15" fill="#cbd5e1" font-size="11" font-weight="700">矽表面自然氧化層 (Native Oxide)：</text>
                <rect x="0" y="25" width="280" height="40" rx="3" fill="#1e293b"/>
                <!-- 矽基底 -->
                <rect x="0" y="45" width="280" height="20" fill="#38bdf8" opacity="0.7"/>
                <text x="140" y="60" text-anchor="middle" fill="#09131b" font-size="10" font-weight="700">純淨單晶矽 (Si Substrate)</text>
                <!-- 氧化層根據狀態變厚 -->
                <rect x="0" y="${qtimeState === 'safe' ? 40 : qtimeState === 'warning' ? 34 : 26}" width="280" height="${qtimeState === 'safe' ? 5 : qtimeState === 'warning' ? 11 : 19}" fill="${circleStroke}"/>
              </g>

              <g transform="translate(20, 150)">
                <text x="0" y="15" fill="#94a3b8" font-size="11">氧化層物理厚度：</text>
                <text x="120" y="15" fill="${circleStroke}" font-size="11" font-weight="800">${qtimeState === 'safe' ? '&lt; 0.2 nm (健康)' : qtimeState === 'warning' ? '0.6 nm (臨界粗糙)' : '&gt; 1.5 nm (嚴重失控)'}</text>

                <text x="0" y="40" fill="#94a3b8" font-size="11">MES 系統處置：</text>
                <text x="120" y="40" fill="${circleStroke}" font-size="11" font-weight="800">${qtimeState === 'safe' ? '正常排程派工' : qtimeState === 'warning' ? 'OHT 天車優先搬運' : '硬體互鎖強制退回重洗'}</text>

                <text x="0" y="65" fill="#94a3b8" font-size="11">接觸電阻衝擊：</text>
                <text x="120" y="65" fill="${circleStroke}" font-size="11" font-weight="700">${qtimeState === 'safe' ? '符合設計規格' : qtimeState === 'warning' ? '接阻上升 15%' : '接阻爆增 &gt; 300% (報廢)'}</text>
              </g>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,120 L 690,120 M 110,280 L 690,280" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="100" x2="400" y2="310" stroke="#34d399" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch23_metric_qtime_limit}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">4.0 小時</div>
          <div class="eng-obj-metric-note">DHF 清洗後自然氧化層生長視窗</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">逾時後果處置</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">自動退回前清洗站</div>
          <div class="eng-obj-metric-note">強制重新去除原生氧化物</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">智慧調度機制</div>
          <div class="eng-obj-metric-value">Rush Lot 動態提速</div>
          <div class="eng-obj-metric-note">剩餘 30 分鐘時自動提升 OHT 優先級</div>
        </div>
      `;

      footerNote = t.ch23_qtime_desc;
    } else if (activeTab === 'interlock') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RFID Carrier and Recipe Poka-Yoke Interlock">
          <g transform="translate(60, 40)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">機台裝載口 (Load Port) 三重防呆校驗 (Poka-Yoke Interlock)</text>

            <!-- 左側：FOUP 到達 Load Port -->
            <g transform="translate(40, 60)">
              <rect x="0" y="0" width="180" height="200" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
              <text x="90" y="30" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">300mm FOUP 晶圓盒</text>
              <rect x="30" y="50" width="120" height="80" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="90" y="95" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="800">Lot #P30912</text>
              <!-- RFID 標籤與射頻光波 -->
              <circle cx="90" cy="155" r="14" fill="#f59e0b" opacity="0.4"/>
              <text x="90" y="160" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="800">RFID 標籤</text>
            </g>

            <!-- 中間：MES 伺服器校驗三重檢核 -->
            <g transform="translate(260, 60)">
              <rect x="0" y="0" width="220" height="200" rx="6" fill="#09131b" stroke="#10b981" stroke-width="2"/>
              <text x="110" y="28" text-anchor="middle" fill="#10b981" font-size="12" font-weight="800">MES 核心即時校驗</text>

              <!-- 檢核項 1 -->
              <g transform="translate(15, 45)">
                <circle cx="12" cy="12" r="9" fill="#10b981"/>
                <text x="12" y="16" text-anchor="middle" fill="#ffffff" font-size="10">✓</text>
                <text x="30" y="16" fill="#cbd5e1" font-size="10.5" font-weight="700">1. 工單合法性驗證</text>
              </g>

              <!-- 檢核項 2 -->
              <g transform="translate(15, 85)">
                <circle cx="12" cy="12" r="9" fill="#10b981"/>
                <text x="12" y="16" text-anchor="middle" fill="#ffffff" font-size="10">✓</text>
                <text x="30" y="16" fill="#cbd5e1" font-size="10.5" font-weight="700">2. 配方版本校验 (CheckSum)</text>
              </g>

              <!-- 檢核項 3 -->
              <g transform="translate(15, 125)">
                <circle cx="12" cy="12" r="9" fill="#10b981"/>
                <text x="12" y="16" text-anchor="middle" fill="#ffffff" font-size="10">✓</text>
                <text x="30" y="16" fill="#cbd5e1" font-size="10.5" font-weight="700">3. 腔體 PM 有效期驗證</text>
              </g>

              <rect x="15" y="155" width="190" height="30" rx="4" fill="#10b981" opacity="0.2"/>
              <text x="110" y="175" text-anchor="middle" fill="#34d399" font-size="11" font-weight="800">100% 匹配 · 允許開門</text>
            </g>

            <!-- 右側：機台開門允許動作 -->
            <g transform="translate(520, 60)">
              <rect x="0" y="0" width="150" height="200" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
              <text x="75" y="30" text-anchor="middle" fill="#10b981" font-size="12" font-weight="750">Load Port 閥門</text>
              <rect x="25" y="60" width="100" height="90" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
              <text x="75" y="105" text-anchor="middle" fill="#34d399" font-size="13" font-weight="800">充氮開門 🔓</text>
              <text x="75" y="175" text-anchor="middle" fill="#cbd5e1" font-size="10">機器手臂吸取晶圓</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,120 L 690,120 M 110,280 L 690,280" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><line x1="400" y1="100" x2="400" y2="310" stroke="#34d399" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">防呆校驗響應時效</div>
          <div class="eng-obj-metric-value">&lt; 0.2 秒</div>
          <div class="eng-obj-metric-note">RFID 掃描至開門信號下達</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">錯批進機 (Miscooperation)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">0 件 / 百萬批</div>
          <div class="eng-obj-metric-note">硬體連鎖達成 100% 防呆</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">配方版本簽核</div>
          <div class="eng-obj-metric-value">電子簽核 (EDC/RMS)</div>
          <div class="eng-obj-metric-note">未經工程簽核配方無法下載至機台</div>
        </div>
      `;

      footerNote = t.ch23_interlock_desc;
    } else {
      // oee 模式
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fab Overall Equipment Effectiveness OEE Dashboard">
          <g transform="translate(60, 40)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="750">OEE (設備綜合效率) = 可用率 (A) × 表現效率 (P) × 品質良率 (Q)</text>

            <!-- 三大指標長條 -->
            <!-- 1. 可用率 (Availability) -->
            <g transform="translate(40, 60)">
              <rect x="0" y="0" width="180" height="200" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
              <text x="90" y="30" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">可用率 (Availability)</text>
              <text x="90" y="70" text-anchor="middle" fill="#38bdf8" font-size="28" font-weight="800">92.5%</text>
              <line x1="20" y1="90" x2="160" y2="90" stroke="#334155"/>
              <text x="90" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10.5">總運轉時間 / 計畫時間</text>
              <text x="90" y="140" text-anchor="middle" fill="#94a3b8" font-size="9.5">• 扣除定期 PM 維護</text>
              <text x="90" y="160" text-anchor="middle" fill="#94a3b8" font-size="9.5">• 扣除機台意外當機</text>
            </g>

            <text x="245" y="160" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="800">×</text>

            <!-- 2. 表現效率 (Performance) -->
            <g transform="translate(270, 60)">
              <rect x="0" y="0" width="180" height="200" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
              <text x="90" y="30" text-anchor="middle" fill="#10b981" font-size="12" font-weight="750">表現效率 (Performance)</text>
              <text x="90" y="70" text-anchor="middle" fill="#10b981" font-size="28" font-weight="800">98.2%</text>
              <line x1="20" y1="90" x2="160" y2="90" stroke="#334155"/>
              <text x="90" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10.5">實際產出 / 理論極限產能</text>
              <text x="90" y="140" text-anchor="middle" fill="#94a3b8" font-size="9.5">• 扣除機器人搬運延遲</text>
              <text x="90" y="160" text-anchor="middle" fill="#94a3b8" font-size="9.5">• 扣除微小降速運轉</text>
            </g>

            <text x="475" y="160" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="800">×</text>

            <!-- 3. 品質良率 (Quality) -->
            <g transform="translate(500, 60)">
              <rect x="0" y="0" width="180" height="200" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
              <text x="90" y="30" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="750">品質良率 (Quality)</text>
              <text x="90" y="70" text-anchor="middle" fill="#f59e0b" font-size="28" font-weight="800">99.4%</text>
              <line x1="20" y1="90" x2="160" y2="90" stroke="#334155"/>
              <text x="90" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10.5">加工良品數 / 總進片數</text>
              <text x="90" y="140" text-anchor="middle" fill="#94a3b8" font-size="9.5">• 扣除破片與刮傷</text>
              <text x="90" y="160" text-anchor="middle" fill="#94a3b8" font-size="9.5">• 扣除微粒超標瑕疵</text>
            </g>

            <!-- 下方：綜合 OEE 得分 -->
            <g transform="translate(140, 280)">
              <rect x="0" y="0" width="440" height="50" rx="6" fill="#09131b" stroke="#38bdf8" stroke-width="2"/>
              <text x="220" y="32" text-anchor="middle" fill="#34d399" font-size="16" font-weight="800">綜合 OEE = 90.3% (世界級旗艦晶圓廠標準)</text>
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
          <div class="eng-obj-metric-note">台積電/英特爾高階機台稼動標桿</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">平均故障間隔 (MTBF)</div>
          <div class="eng-obj-metric-value">&gt; 350 小時</div>
          <div class="eng-obj-metric-note">預測性維護 (PdM) 預先更換消耗件</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch23_metric_fab_wip}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">~ 100,000+ 片</div>
          <div class="eng-obj-metric-note">在製晶圓流暢平衡流動</div>
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
            <div class="eng-obj-metric-label">${lang === 'en' ? 'CIM Stack & SEMI Standards Clauses' : 'CIM 六大系統與 SEMI 標準條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'MES · EAP/RMS · SECS/GEM300 · RTD' : 'MES · EAP/RMS · SECS/GEM300 · RTD'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'MES genealogy/Q-time, EAP/RMS zero-touch, SECS/GEM300/Interface A & RTD/YMS' : 'MES 履歷與 Q-time、EAP/RMS 零接觸防呆、SECS/GEM300/Interface A 與 RTD/YMS'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Little’s Law, Kingman Queue & OEE Law' : '利特爾法則與金曼排隊爆炸律 (CIM Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'WIP = TH × CT · CT_q ∝ u/(1-u) · OEE = A×P×Q' : 'WIP = TH × CT · CT_q ∝ u/(1-u) · OEE = A×P×Q'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Controls X-Factor ≈ 2.0, prevents u>85% Q-time spikes & boosts OEE' : '管控 X-Factor ≈ 2.0、多機台群組化防止 >85% 塞車與預測性天車派工'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Q-Time Kanban · E84 OHB · E90 SlotMap' : 'Q-Time Kanban · E84 OHB · E90 SlotMap'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Prevents cascade Q-Time expirations, E84 OHT gridlock & slot-map collisions' : '拉動式容量閥門防連鎖 Q-Time 鎖批、天車逾時自動繞行 OHB 與雷射掃描防破片'}</div>
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
      bindEngineeringEvent(btn, 'click', () => {
        qtimeState = btn.getAttribute('data-q');
        update();
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
