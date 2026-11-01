import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderFabJargonDecoderObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  const tx = (zh, en) => lang === 'en' ? en : zh;
  const wrap = (text, width) => {
    if (lang !== 'en') return text;
    const lines = [''];
    for (const word of text.split(' ')) {
      const last = lines.length - 1;
      if (lines[last] && lines[last].length + word.length + 1 > width) lines.push(word);
      else lines[last] += (lines[last] ? ' ' : '') + word;
    }
    return lines.join('\n');
  };
  let activeTab = 'scenarios'; // 'scenarios' | 'culture' | 'decoder'
  let selectedJargon = 'hold';

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'scenarios') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fab High-Frequency Real Scenarios">
          <g transform="translate(60, 40)">
            <!-- 情境 1: 交接班 Handover -->
            <g transform="translate(0, 0)">
              <rect x="0" y="0" width="330" height="140" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
              <rect x="0" y="0" width="330" height="32" rx="6" fill="#38bdf8"/>
              <text x="165" y="21" text-anchor="middle" fill="#09131b" font-size="12" font-weight="800">${tx("1. 四班二輪交接班 (Shift Handover)", "1. Four-Team, Two-Shift Handover")}</text>
              <text x="15" y="55" fill="#f59e0b" font-size="11" font-weight="750">${tx("「卡批狀況與機台 Alarm 請務必逐項交接」", "\"Hand over every held lot and tool alarm.\"")}</text>
              <text x="15" y="78" fill="#cbd5e1" font-size="10">${tx("• 交代在線 WIP、當機機台 (Tool Down) 與等待 PM", "• Review WIP, down tools and pending PM")}</text>
              <text x="15" y="98" fill="#cbd5e1" font-size="10">${tx("• 確認 Hot Lot (急件批) 當前站點與天車優先級", "• Confirm hot-lot station and transport priority")}</text>
              <text x="15" y="118" fill="#34d399" font-size="10" font-weight="700">${tx("✓ 核心原則：不留隱患給下一班，交接不清是最大殺手", "✓ Principle: leave no unresolved risk unreported")}</text>
            </g>

            <!-- 情境 2: 帶線催貨 Expediting -->
            <g transform="translate(350, 0)">
              <rect x="0" y="0" width="330" height="140" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
              <rect x="0" y="0" width="330" height="32" rx="6" fill="#10b981"/>
              <text x="165" y="21" text-anchor="middle" fill="#09131b" font-size="12" font-weight="800">${tx("2. 帶線跑貨 (Lot Expediting)", "2. Lot Expediting")}</text>
              <text x="15" y="55" fill="#38bdf8" font-size="11" font-weight="750">${tx("「這批 Super Hot Run 客戶在催，一路綠燈通行」", "\"The customer needs this super-hot lot expedited.\"")}</text>
              <text x="15" y="78" fill="#cbd5e1" font-size="10">${tx("• OHT 天車插隊搶先搬運，不進 Stocker 緩存倉", "• Prioritize OHT moves and bypass stocker buffering")}</text>
              <text x="15" y="98" fill="#cbd5e1" font-size="10">${tx("• 預先預約機台 Load Port，到站零等待直接進機", "• Reserve the load port for direct loading on arrival")}</text>
              <text x="15" y="118" fill="#38bdf8" font-size="10" font-weight="700">${tx("✓ 核心指標：極限壓縮 Cycle Time (生產週期)", "✓ Metric: minimize cycle time")}</text>
            </g>

            <!-- 情境 3: 機台警報 Tool Alarm -->
            <g transform="translate(0, 160)">
              <rect x="0" y="0" width="330" height="140" rx="6" fill="#0f172a" stroke="#ef4444" stroke-width="2"/>
              <rect x="0" y="0" width="330" height="32" rx="6" fill="#ef4444"/>
              <text x="165" y="21" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">${tx("3. 機台警報排除 (Tool Alarm)", "3. Tool Alarm Response")}</text>
              <text x="15" y="55" fill="#ef4444" font-size="11" font-weight="750">${tx("「Alarm 狂響先下 Hold，絕對不要盲目按 Clear！」", "\"Hold first; never clear an alarm blindly.\"")}</text>
              <text x="15" y="78" fill="#cbd5e1" font-size="10">${tx("• 檢查真空值 (Vacuum)、射頻反射波 (Reflected Power)", "• Check vacuum and reflected RF power")}</text>
              <text x="15" y="98" fill="#cbd5e1" font-size="10">${tx("• 若懷疑破片 (Wafer Breakage) 立即停機，不可移動晶圓", "• Suspected wafer break: stop; do not move wafers")}</text>
              <text x="15" y="118" fill="#ef4444" font-size="10" font-weight="700">${tx("✓ 核心原則：保全現場第一證據，啟動 OCAP 流程", "✓ Preserve evidence and initiate OCAP")}</text>
            </g>

            <!-- 情境 4: Q-Time 壓線急救 -->
            <g transform="translate(350, 160)">
              <rect x="0" y="0" width="330" height="140" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
              <rect x="0" y="0" width="330" height="32" rx="6" fill="#f59e0b"/>
              <text x="165" y="21" text-anchor="middle" fill="#09131b" font-size="12" font-weight="800">${tx("4. Q-Time 逾時壓線 (Q-Time Rush)", "4. Q-Time Rush")}</text>
              <text x="15" y="55" fill="#f59e0b" font-size="11" font-weight="750">${tx("示例：Q-Time 剩 15 分鐘，依規定調度", "Example: 15 min remain; follow dispatch rules.")}</text>
              <text x="15" y="78" fill="#cbd5e1" font-size="10">${tx("• 清洗至進爐上限示例：4 小時，依製程核定", "• Example clean-to-furnace limit: 4 h; validate.")}</text>
              <text x="15" y="98" fill="#cbd5e1" font-size="10">${tx("• 倒數可觸發 MES 優先調度，依現場設定", "• MES priority dispatch depends on configuration.")}</text>
              <text x="15" y="118" fill="#10b981" font-size="10" font-weight="700">${tx("✓ 逾時 1 秒示例：鎖批，依核准程序評估重洗", "✓ Example: 1 s overdue; hold; assess reclean.")}</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,210 L 690,210" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.65"/><circle cx="400" cy="210" r="36" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 5" class="anim-beam" opacity="0.7"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_jargon_metric_jargons}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${tx("43 筆道地行話", "43 fab expressions")}</div>
          <div class="eng-obj-metric-note">${tx("台積電/聯電/世界先進晶圓廠原味術語", "Terms used in TSMC, UMC and VIS fab contexts")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_jargon_metric_shifts}</div>
          <div class="eng-obj-metric-value">${tx("四班二輪 (12hr)", "Four teams, two shifts (12hr)")}</div>
          <div class="eng-obj-metric-note">${tx("日班 07:30-19:30 · 夜班 19:30-07:30", "Day 07:30–19:30 · Night 19:30–07:30")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_jargon_metric_poka}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${tx("零疏失 (Zero Error)", "Zero Error")}</div>
          <div class="eng-obj-metric-note">${tx("黑話是現場最簡潔的抗失誤通訊協議", "Fab jargon is concise communication for error prevention")}</div>
        </div>
      `;

      footerNote = t.app_jargon_scenarios_desc;
    } else if (activeTab === 'culture') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fab 24 Hours Shift Roster Clock">
          <g transform="translate(400, 210)">
            <!-- 24 小時時鐘外環 (直徑 320) -->
            <circle cx="0" cy="0" r="140" fill="#09131b" stroke="#334155" stroke-width="16"/>

            <!-- 上半圓：日班 Day Shift (07:30 - 19:30) -->
            <path d="M -135,0 A 135,135 0 0,1 135,0" fill="none" stroke="#f59e0b" stroke-width="12"/>
            <text x="0" y="-80" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="800">${tx("日班 (Day Shift) 07:30 ~ 19:30", "Day Shift 07:30 ~ 19:30")}</text>
            <text x="0" y="-60" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${tx("晨會 · 帶線 · 異常批處置 · 製程實驗 (Split)", "Morning meeting · Expedite · Excursions · Splits")}</text>

            <!-- 下半圓：夜班 Night Shift (19:30 - 07:30) -->
            <path d="M 135,0 A 135,135 0 0,1 -135,0" fill="none" stroke="#38bdf8" stroke-width="12"/>
            <text x="0" y="70" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="800">${tx("夜班 (Night Shift) 19:30 ~ 07:30", "Night Shift 19:30 ~ 07:30")}</text>
            <text x="0" y="90" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${tx("全力跑貨 · 機台 PM 定期保養 · 突發除錯", "Production · Tool PM · Troubleshooting")}</text>

            <!-- 交接班交接點 (07:30 & 19:30) -->
            <circle cx="-135" cy="0" r="10" fill="#ef4444"/>
            <text x="-155" y="5" text-anchor="end" fill="#ef4444" font-size="11" font-weight="800">${tx("07:30 早交接", "07:30 Handover")}</text>

            <circle cx="135" cy="0" r="10" fill="#ef4444"/>
            <text x="155" y="5" text-anchor="start" fill="#ef4444" font-size="11" font-weight="800">${tx("19:30 晚交接", "19:30 Handover")}</text>

            <circle cx="0" cy="0" r="15" fill="#38bdf8"/>
            <text x="0" y="4" text-anchor="middle" fill="#09131b" font-size="9" font-weight="800">${tx("365天", "365 days")}</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,210 L 690,210" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.65"/><circle cx="400" cy="210" r="36" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 5" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("全年運轉時數", "Annual Operating Hours")}</div>
          <div class="eng-obj-metric-value">${tx("8,760 小時", "8,760 hours")}</div>
          <div class="eng-obj-metric-note">${tx("全年無休 · 即使農曆新年亦全速生產", "Year-round production, including Lunar New Year")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("交接黃金 30 分鐘", "30-Minute Handover")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${tx("資訊 100% 傳遞", "100% information transfer")}</div>
          <div class="eng-obj-metric-note">${tx("口頭 + 電子交接簿 (E-Logbook) 雙重覆核", "Cross-check verbal and electronic logbook records")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("無塵服穿戴規範", "Cleanroom Gowning")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${tx("&lt; 3 分鐘完成", "Complete in &lt; 3 minutes")}</div>
          <div class="eng-obj-metric-note">${tx("防靜電連身服 + 護目鏡 + 雙層乳膠手套", "Antistatic coverall, goggles and double latex gloves")}</div>
        </div>
      `;

      footerNote = t.app_jargon_culture_desc;
    } else {
      // decoder 模式
      const jargons = {
        hold: { name: tx("卡批 / Hold 批", "Hold lot"), real: tx("系統級凍結晶圓批號，防止問題晶圓流入下一道站點", "System hold prevents the affected wafer lot from advancing to the next operation."), risk: tx("延遲處置可能造成下游缺料或 Q-Time 逾時；\n是否重工或報廢須依核准程序評估。", "Delayed action may starve downstream tools or cause Q-time expiry; evaluate rework or scrap under the approved disposition procedure.") },
        broken: { name: tx("破片 (Wafer Break)", "Wafer break"), real: tx("晶圓在機械手臂搬運或腔體內碎裂成碎片", "A wafer fractures during robotic handling or inside a process chamber."), risk: tx("極度重大異常！電漿腔體與全線真空管道面臨微粒污染，需停機 PM 清機數天", "A severe excursion: particle contamination in chambers and vacuum lines may require days of cleaning downtime.") },
        qtime: { name: tx("壓線 (Q-Time Excursion)", "Q-time excursion"), real: tx("兩道工序等待時間即將超過製程核定上限（如清洗至氧化）", "The wait between steps, such as cleaning and oxidation, approaches its qualified process limit."), risk: tx("依表面處理、環境與後續製程，等待可能增加氧化或污染風險；\n逾時鎖批並依核准程序處置。", "Waiting may raise oxidation or contamination risk; effects depend on surface, ambient and next process. Hold for approved disposition.") },
        poka: { name: tx("防呆 (Poka-Yoke)", "Poka-yoke"), real: tx("機台透過條碼、RFID 與配方版本連鎖，阻絕一切人為操作失誤", "Barcode, RFID and recipe-version interlocks are intended to prevent operator errors."), risk: tx("嚴禁任何人私自繞過防呆開門，這是晶圓廠的最高天條", "Never bypass an interlock or open a tool without authorization.") }
      };
      const cur = jargons[selectedJargon] || jargons.hold;

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive Fab Jargon Decoder">
          <!-- 上方黑話切換按鈕 -->
          <g transform="translate(60, 20)">
            ${Object.keys(jargons).map((k, i) => `
              <g class="jargon-btn" data-jargon="${k}" role="button" tabindex="0" aria-pressed="${selectedJargon === k}" aria-label="${esc(jargons[k].name)}" style="cursor: pointer;" transform="translate(${i * 175}, 0)">
                <rect x="0" y="0" width="165" height="30" rx="4" fill="${selectedJargon === k ? '#38bdf8' : '#1e293b'}" stroke="${selectedJargon === k ? '#ffffff' : '#334155'}" stroke-width="1.5"/>
                <text x="82" y="19" text-anchor="middle" fill="${selectedJargon === k ? '#09131b' : '#cbd5e1'}" font-size="11.5" font-weight="750">${lang === 'en' ? jargons[k].name : jargons[k].name.split(' ')[0]}</text>
              </g>
            `).join('')}
          </g>

          <!-- 中央：解碼卡片 -->
          <g transform="translate(80, 75)">
            <rect x="0" y="0" width="640" height="290" rx="8" fill="#09131b" stroke="#334155" stroke-width="1.5"/>

            <text x="40" y="45" fill="#f59e0b" font-size="18" font-weight="800">${tx("現場口頭語", "Fab expression")}: ${cur.name}</text>

            <rect x="40" y="70" width="560" height="75" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
            <text x="60" y="95" fill="#10b981" font-size="12" font-weight="750">${tx("工程實質真義 (Engineering Truth)：", "Engineering Meaning:")}</text>
            <text x="60" y="119" fill="#cbd5e1" font-size="11.5">${svgTextLines(wrap(cur.real, 83), 60, 119, 15)}</text>

            <rect x="40" y="165" width="560" height="75" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="1"/>
            <text x="60" y="190" fill="#ef4444" font-size="12" font-weight="750">${tx("背後物理與品質風險 (Physical Risk)：", "Physical and Quality Risks:")}</text>
            <text x="60" y="214" fill="#cbd5e1" font-size="11.5">${svgTextLines(wrap(cur.risk, 83), 60, 214, 15)}</text>

            <text x="320" y="270" text-anchor="middle" fill="#64748b" font-size="11">${tx("晶圓廠黑話不是無聊的密碼，而是千錘百鍊、防止百萬美元損失的工業安全防線", "Fab terminology communicates safeguards against costly failures")}</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,210 L 690,210" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.65"/><circle cx="400" cy="210" r="36" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 5" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("現場黑話術語分類", "Fab Jargon Category")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${cur.name.split('/')[0]}</div>
          <div class="eng-obj-metric-note">${tx("即時直擊晶圓廠日常真實語境", "Everyday production-floor context")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("風險層級", "Risk Level")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${tx("Critical 安全/良率", "Critical: Safety / Yield")}</div>
          <div class="eng-obj-metric-note">${tx("牽一髮動全身的製造防護線", "Manufacturing safeguards protect interconnected operations")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("對應標準作業書", "Related Procedures")}</div>
          <div class="eng-obj-metric-value">${tx("Fab SOP / OCAP 規範", "Fab SOP / OCAP")}</div>
          <div class="eng-obj-metric-note">${tx("每一句黑話都有對應的嚴格作業規程", "Consult the corresponding formal operating procedure")}</div>
        </div>
      `;

      footerNote = t.app_jargon_scenarios_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjJargonTitle">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · APPENDIX B</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjJargonTitle">${t.app_jargon_title}</h2>
          <p class="eng-obj-subtitle">${t.app_jargon_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="group" aria-label="${tx('工程圖視圖', 'Engineering views')}">
            <button type="button" class="eng-obj-tab ${activeTab === 'scenarios' ? 'is-active' : ''}" data-tab="scenarios" aria-pressed="${activeTab === 'scenarios'}">${t.app_jargon_tab_scenarios}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'culture' ? 'is-active' : ''}" data-tab="culture" aria-pressed="${activeTab === 'culture'}">${t.app_jargon_tab_culture}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'decoder' ? 'is-active' : ''}" data-tab="decoder" aria-pressed="${activeTab === 'decoder'}">${t.app_jargon_tab_decoder}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Lot State & Handover Clauses' : '批次狀態機與交接條例 (Jargon)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'Run/Hold · Season · War-Room · KGD' : 'Run/Hold · Season · War-Room · KGD'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Covers Lot state machine, chamber qual, excursion war-room & 3D KGD jargon' : '涵蓋 Lot 生命週期、開腔養腔復機、章魚防堵會診與 3D 封裝現場行話'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Fab Queueing & Q-Time Teaching Conditions' : '批次排隊與 Q-Time 鎖批教學條件'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 't_wait < t_Q-Time · P(commonality) < 10^-3' : 't_wait < t_Q-Time · P(commonality) < 10^-3'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Configure Q-time holds and RTD by approved procedures; validate commonality decisions. Displayed thresholds are teaching examples.' : 'Q-Time 鎖批與 RTD 依核准流程配置；共性判定須驗證，表列門檻為教學示例。'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Hold/OCAP · Octopus · Rework vs Scrap' : 'Hold/OCAP · Octopus · Rework vs Scrap'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Unites floor alarm jargon, Octopus containment, photo rework & MRB triage' : '串聯現場告警行話、戰情室章魚圍堵、黃光重工與 MRB 跨部門處置標準動作'}</div>
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

    container.querySelectorAll('.jargon-btn').forEach(btn => {
      const selectJargon = () => {
        const key = btn.getAttribute('data-jargon');
        selectedJargon = key;
        update();
        container.querySelector(`[data-jargon="${key}"]`)?.focus?.();
      };
      bindEngineeringEvent(btn, 'click', selectJargon);
      bindEngineeringEvent(btn, 'keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectJargon(); }
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 28. App-Reading 附錄 C：半導體工程師技能樹與階梯路徑圖模型
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderFabJargonDecoderObject as render };
