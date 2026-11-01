import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderExcursionControlObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'ocap'; // 'ocap' | 'rework' | 'containment'
  let simState = 'hold'; // 'normal' | 'ooc' | 'hold' | 'disposed'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'ocap') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OCAP Decision Tree Flow">
          <!-- 上方控制切換 -->
          <g transform="translate(60, 20)">
            <rect x="0" y="0" width="150" height="26" rx="4" class="ocap-sim-btn" data-sim="normal" role="button" tabindex="0" aria-pressed="${simState === 'normal'}" aria-label="${lang === 'en' ? 'Normal Monitoring' : '模擬正常監控'}" fill="${simState === 'normal' ? '#10b981' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="75" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${lang === 'en' ? "Normal Monitoring" : "模擬正常監控 (Normal)"}</text>

            <rect x="170" y="0" width="160" height="26" rx="4" class="ocap-sim-btn" data-sim="ooc" role="button" tabindex="0" aria-pressed="${simState === 'ooc'}" aria-label="${lang === 'en' ? 'Trigger OOC Alarm' : '觸發 OOC 警報'}" fill="${simState === 'ooc' ? '#f59e0b' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="250" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${lang === 'en' ? "Trigger OOC Alarm" : "觸發 OOC 警報 (Alarm)"}</text>

            <rect x="350" y="0" width="150" height="26" rx="4" class="ocap-sim-btn" data-sim="hold" role="button" tabindex="0" aria-pressed="${simState === 'hold'}" aria-label="${lang === 'en' ? 'Interlock: Lot Hold' : '系統連鎖截停'}" fill="${simState === 'hold' ? '#ef4444' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="425" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${lang === 'en' ? "Interlock: Lot Hold" : "系統連鎖截停 (Lot Hold)"}</text>

            <rect x="520" y="0" width="160" height="26" rx="4" class="ocap-sim-btn" data-sim="disposed" role="button" tabindex="0" aria-pressed="${simState === 'disposed'}" aria-label="${lang === 'en' ? 'Disposition / Release' : '工程處置放行'}" fill="${simState === 'disposed' ? '#8b5cf6' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="600" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${lang === 'en' ? "Disposition / Release" : "工程處置放行 (Disposition)"}</text>
          </g>

          <!-- OCAP 四步決策樹主圖 -->
          <g transform="translate(60, 70)">
            <!-- 步驟 1: 即時監控 -->
            <g transform="translate(0, 40)">
              <rect x="0" y="0" width="140" height="120" rx="6" fill="#09131b" stroke="${simState === 'normal' ? '#10b981' : '#334155'}" stroke-width="2"/>
              <text x="70" y="30" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="750">${lang === 'en' ? "1. Inline Monitoring" : "步驟 1: 線上監控"}</text>
              <text x="70" y="55" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• SPC Charts: 3σ" : "• SPC 管制圖 3σ"}</text>
              <text x="70" y="75" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Tool FDC Sensors" : "• 機台 FDC 感測器"}</text>
              <text x="70" y="95" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Inline Defect Inspection" : "• 線上缺陷檢測"}</text>
            </g>

            <line x1="140" y1="100" x2="180" y2="100" stroke="#475569" stroke-width="2"/>

            <!-- 步驟 2: 觸發 OOC & 系統連鎖截停 -->
            <g transform="translate(180, 40)">
              <rect x="0" y="0" width="150" height="120" rx="6" fill="#09131b" stroke="${simState === 'ooc' || simState === 'hold' ? '#ef4444' : '#334155'}" stroke-width="${simState === 'hold' ? 3 : 2}"/>
              <text x="75" y="30" text-anchor="middle" fill="${simState === 'hold' ? '#ef4444' : '#f59e0b'}" font-size="11" font-weight="750">${lang === 'en' ? "2. System Hold" : "步驟 2: 系統截停"}</text>
              <text x="75" y="55" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Automatic Lot Hold" : "• 自動下達 Lot Hold"}</text>
              <text x="75" y="75" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Auto Tool Lock (Down)" : "• 機台自動閉鎖 (Down)"}</text>
              <text x="75" y="95" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">${lang === 'en' ? "Block Downstream Defects" : "阻止不良品流入下站"}</text>
            </g>

            <line x1="330" y1="100" x2="370" y2="100" stroke="#475569" stroke-width="2"/>

            <!-- 步驟 3: 影響範圍清查 -->
            <g transform="translate(370, 40)">
              <rect x="0" y="0" width="140" height="120" rx="6" fill="#09131b" stroke="#38bdf8" stroke-width="2"/>
              <text x="70" y="30" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="750">${lang === 'en' ? "3. Scope Review" : "步驟 3: 範圍清查"}</text>
              <text x="70" y="55" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Octopus Lot Tracing" : "• 八爪魚同批追溯"}</text>
              <text x="70" y="75" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Example: 2 Lots Each Side" : "• 情境：前後各抽測 2 批"}</text>
              <text x="70" y="95" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• List Affected Wafers" : "• 鎖定受害晶圓清單"}</text>
            </g>

            <line x1="510" y1="100" x2="550" y2="100" stroke="#475569" stroke-width="2"/>

            <!-- 步驟 4: 三向處置判定 -->
            <g transform="translate(550, 0)">
              <rect x="0" y="0" width="130" height="60" rx="4" fill="#09131b" stroke="#10b981" stroke-width="2"/>
              <text x="65" y="25" text-anchor="middle" fill="#10b981" font-size="11" font-weight="800">${lang === 'en' ? "✓ Release" : "✓ 放行 (Release)"}</text>
              <text x="65" y="45" text-anchor="middle" fill="#cbd5e1" font-size="9">${lang === 'en' ? "Assess Spec Compliance" : "評估規格內容許"}</text>

              <rect x="0" y="75" width="130" height="60" rx="4" fill="#09131b" stroke="#f59e0b" stroke-width="2"/>
              <text x="65" y="100" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="800">${lang === 'en' ? "↺ Rework" : "↺ 重工 (Rework)"}</text>
              <text x="65" y="120" text-anchor="middle" fill="#cbd5e1" font-size="9">${lang === 'en' ? "Strip Resist and Recoat" : "黃光去膠重新塗佈"}</text>

              <rect x="0" y="150" width="130" height="60" rx="4" fill="#09131b" stroke="#ef4444" stroke-width="2"/>
              <text x="65" y="175" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="800">${lang === 'en' ? "✕ Scrap" : "✕ 報廢 (Scrap)"}</text>
              <text x="65" y="195" text-anchor="middle" fill="#cbd5e1" font-size="9">${lang === 'en' ? "Etch-Through Damage" : "蝕刻穿孔物理損毀"}</text>
            </g>

            <!-- 下方：防呆閉環 8D -->
            <g transform="translate(40, 230)">
              <rect x="0" y="0" width="600" height="60" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="300" y="25" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="700">${lang === 'en' ? "Prevent Recurrence: 8D Report + Poka-Yoke Tool / Recipe Interlocks" : "閉環防再發對策：8D 報告 + Poka-Yoke 機台配方互鎖"}</text>
              <text x="300" y="45" text-anchor="middle" fill="#94a3b8" font-size="10">${lang === 'en' ? "Confirm Root Cause, Revise SOPs and Update Interlocks Before Returning the Tool to Production" : "確認 Root Cause 根因，修改作業標準書 (SOP)，更新防呆規則後方可釋放機台生產"}</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,210 L 680,210" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><circle cx="400" cy="210" r="42" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch18_metric_hold_time}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${lang === 'en' ? "&lt; 2.0 Hours" : "&lt; 2.0 小時"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Uncalibrated scenario: disposition &lt; 2.0 hours; actual limits follow the approved OCAP and Q-Time rules." : "未校準情境：處置 &lt; 2.0 小時；實際時限依核准 OCAP 與 Q-Time 規範。"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch18_metric_rework_limit}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "≤ 2 Cycles" : "≤ 2 次"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Uncalibrated scenario: at most 2 cycles; assess the material stack, surface condition and qualified rework process." : "未校準情境：最多 2 次；須依材料堆疊、表面狀態與合格重工流程評估。"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch18_metric_scrap_cost}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">$250,000+ USD</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Uncalibrated cost scenario: 25 wafers at 3nm, $250,000+ USD; not an actual quotation or guaranteed loss." : "未校準成本情境：25 片 3nm 晶圓，$250,000+ USD；非實際報價或損失保證。"}</div>
        </div>
      `;

      footerNote = t.ch18_ocap_desc;
    } else if (activeTab === 'rework') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rework Feasibility Window Matrix">
          <g transform="translate(60, 40)">
            <!-- 綠燈區：可重工 (Reversible) -->
            <g transform="translate(0, 0)">
              <rect x="0" y="0" width="330" height="280" rx="8" fill="#09131b" stroke="#10b981" stroke-width="2.5"/>
              <rect x="0" y="0" width="330" height="40" rx="8" fill="#10b981"/>
              <text x="165" y="26" text-anchor="middle" fill="#09131b" font-size="13" font-weight="800">${lang === 'en' ? "✓ Green: Conditional Rework" : "✓ 綠燈區：符合條件才可重工"}</text>

              <g transform="translate(20, 60)">
                <text x="0" y="20" fill="#34d399" font-size="12" font-weight="750">${lang === 'en' ? "1. Post-Develop Resist / ADI" : "1. 光阻顯影後 (Post-Develop / ADI)"}</text>
                <text x="15" y="40" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Exposure Dose Error / CD Too Wide or Narrow" : "• 曝光劑量偏差 / CD 偏寬偏窄"}</text>
                <text x="15" y="58" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Stepper / Scanner Overlay Error" : "• 步進掃描對準失誤 (Overlay Shift)"}</text>
                <text x="15" y="76" fill="#10b981" font-size="10" font-weight="700">${lang === 'en' ? "⇒ Plasma Strip + SPM: Check Compatibility" : "⇒ 氧電漿去膠 + SPM：須確認材料相容性"}</text>

                <text x="0" y="110" fill="#34d399" font-size="12" font-weight="750">${lang === 'en' ? "2. CMP Under-Polish" : "2. CMP 研磨不足 (Under-Polish)"}</text>
                <text x="15" y="130" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Excess Oxide / Incomplete Metal Removal" : "• 氧化層殘留過厚 / 金屬未完全清除"}</text>
                <text x="15" y="148" fill="#10b981" font-size="10" font-weight="700">${lang === 'en' ? "⇒ Buff: 10-15 s Scenario; Qualify First" : "⇒ 補磨情境 10-15 秒；須經製程驗證"}</text>

                <text x="0" y="180" fill="#34d399" font-size="12" font-weight="750">${lang === 'en' ? "3. Excess Post-Clean Particles" : "3. 清洗顆粒超標 (Post-Clean Particles)"}</text>
                <text x="15" y="200" fill="#10b981" font-size="10" font-weight="700">${lang === 'en' ? "⇒ RCA Megasonic Reclean: Qualified Recipe" : "⇒ RCA 兆聲波再洗：須用合格配方"}</text>
              </g>
            </g>

            <!-- 紅燈區：不可逆破壞 (Irreversible) -->
            <g transform="translate(350, 0)">
              <rect x="0" y="0" width="330" height="280" rx="8" fill="#09131b" stroke="#ef4444" stroke-width="2.5"/>
              <rect x="0" y="0" width="330" height="40" rx="8" fill="#ef4444"/>
              <text x="165" y="26" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="800">${lang === 'en' ? "✕ Red: Risk of Irreversible Damage" : "✕ 紅燈區：不可逆損傷風險"}</text>

              <g transform="translate(20, 60)">
                <text x="0" y="20" fill="#f87171" font-size="12" font-weight="750">${lang === 'en' ? "1. Post-Plasma-Etch / AEI" : "1. 電漿蝕刻後 (Post-Etch / AEI)"}</text>
                <text x="15" y="40" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Sidewall Undercut / Bottom Etch-Through" : "• 側壁底切 (Undercut) / 底部穿孔過蝕刻"}</text>
                <text x="15" y="58" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Silicon / Oxide Removed by Chemical Gases" : "• 實體矽材/氧化層已被化學氣體挖走"}</text>
                <text x="15" y="76" fill="#ef4444" font-size="10" font-weight="700">${lang === 'en' ? "⇒ Removed Material: Assess Disposition" : "⇒ 移除材料難以回復；依缺陷評估處置"}</text>

                <text x="0" y="110" fill="#f87171" font-size="12" font-weight="750">${lang === 'en' ? "2. Implant Dose / Energy Error" : "2. 離子佈植打錯劑量/能量"}</text>
                <text x="15" y="130" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Excess Dopant Depth May Cause Failure" : "• 摻雜過深可能造成接面失效"}</text>
                <text x="15" y="148" fill="#ef4444" font-size="10" font-weight="700">${lang === 'en' ? "⇒ Doping Changed; Assess Recoverability" : "⇒ 摻雜已改變；能否恢復須評估"}</text>

                <text x="0" y="180" fill="#f87171" font-size="12" font-weight="750">${lang === 'en' ? "3. CMP Over-Polish / Dishing" : "3. CMP 過磨碟化 (Over-Polish Dishing)"}</text>
                <text x="15" y="200" fill="#ef4444" font-size="10" font-weight="700">${lang === 'en' ? "⇒ Thin Cu, Higher Resistance: Review" : "⇒ 銅線變薄、電阻升高；須評估處置"}</text>
              </g>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,210 L 680,210" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><circle cx="400" cy="210" r="42" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Rework Assessment Point" : "重工評估時點"}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "Pre-Etch" : "蝕刻前 (Pre-Etch)"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Pre-etch resist defects may be reworkable. After etch or implant, assess the defect and qualified recovery options; rework is not categorically excluded." : "蝕刻前光阻缺陷可能可重工；蝕刻或佈植後須依缺陷與合格恢復流程評估，非一律不可重工。"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Rework Recovery: Uncalibrated Scenario" : "重工恢復率：未校準情境"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${lang === 'en' ? "Scenario Assumption &gt; 99.8%" : "情境假設 &gt; 99.8%"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "&gt; 99.8% is an uncalibrated scenario assumption, not a measurement or guarantee; it does not establish 100% damage-free rework. Recovery and financial benefit require validation." : "&gt; 99.8% 僅為未校準情境假設，非實測或保證；100% 無損重工不能由此推定。恢復率與損益須另行驗證。"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Material Review Board (MRB)" : "物料審查委員會 (MRB)"}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "Process + Integration + QA Sign-Off" : "製程 + 整合 + 品保簽核"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Review release, rework or scrap disposition under the approved procedure." : "依核准程序審查放行、重工或報廢處置。"}</div>
        </div>
      `;

      footerNote = t.ch18_rework_desc;
    } else {
      // containment 模式 (八爪魚)
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Octopus Incident Containment Model">
          <g transform="translate(60, 30)">
            <!-- 核心：異常觸發點 -->
            <g transform="translate(260, 110)">
              <circle cx="80" cy="80" r="60" fill="#ef4444" opacity="0.2"/>
              <circle cx="80" cy="80" r="45" fill="#ef4444"/>
              <text x="80" y="75" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">${lang === 'en' ? "Excursion Lot" : "異常核心批"}</text>
              <text x="80" y="95" text-anchor="middle" fill="#ffffff" font-size="10.5">Lot #A88301</text>
            </g>

            <!-- 八爪魚放射觸手 (追溯維度) -->
            <!-- 1. 同機台腔體 (Chamber) -->
            <g transform="translate(60, 40)">
              <line x1="280" y1="150" x2="160" y2="70" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4"/>
              <rect x="0" y="0" width="160" height="60" rx="4" fill="#09131b" stroke="#38bdf8" stroke-width="2"/>
              <text x="80" y="25" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="750">${lang === 'en' ? "1. Same Chamber" : "1. 同腔體 (Chamber)"}</text>
              <text x="80" y="45" text-anchor="middle" fill="#cbd5e1" font-size="9.5">${lang === 'en' ? "Etch-04: 6 Lots; Split Unspecified" : "Etch-04：6 批情境，前後分配未定"}</text>
            </g>

            <!-- 2. 同配方 (Recipe) -->
            <g transform="translate(460, 40)">
              <line x1="400" y1="150" x2="520" y2="70" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4"/>
              <rect x="0" y="0" width="160" height="60" rx="4" fill="#09131b" stroke="#f59e0b" stroke-width="2"/>
              <text x="80" y="25" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="750">${lang === 'en' ? "2. Same Recipe Version" : "2. 同配方版本 (Recipe)"}</text>
              <text x="80" y="45" text-anchor="middle" fill="#cbd5e1" font-size="9.5">${lang === 'en' ? "Review All Tools Using V4.2" : "清查使用 V4.2 的所有機台"}</text>
            </g>

            <!-- 3. 同光罩 (Reticle) -->
            <g transform="translate(60, 240)">
              <line x1="280" y1="210" x2="160" y2="270" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4"/>
              <rect x="0" y="0" width="160" height="60" rx="4" fill="#09131b" stroke="#10b981" stroke-width="2"/>
              <text x="80" y="25" text-anchor="middle" fill="#10b981" font-size="11" font-weight="750">${lang === 'en' ? "3. Same Reticle Serial No." : "3. 同光罩序號 (Reticle)"}</text>
              <text x="80" y="45" text-anchor="middle" fill="#cbd5e1" font-size="9.5">${lang === 'en' ? "Rule Out Reticle Particles" : "排除光罩表面微塵污染"}</text>
            </g>

            <!-- 4. 同批化學品 (Slurry/Gas) -->
            <g transform="translate(460, 240)">
              <line x1="400" y1="210" x2="520" y2="270" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4"/>
              <rect x="0" y="0" width="160" height="60" rx="4" fill="#09131b" stroke="#c084fc" stroke-width="2"/>
              <text x="80" y="25" text-anchor="middle" fill="#c084fc" font-size="11" font-weight="750">${lang === 'en' ? "4. Same Chemical Batch" : "4. 同批化學品 (Chemical)"}</text>
              <text x="80" y="45" text-anchor="middle" fill="#cbd5e1" font-size="9.5">${lang === 'en' ? "Trace Gas Cylinder / Slurry Batch" : "追溯氣體鋼瓶／研磨液批號"}</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,210 L 680,210" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><circle cx="400" cy="210" r="42" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Lots Identified by Traceability" : "追溯鎖定批次數量"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${lang === 'en' ? "12 ~ 24 Lots" : "12 ~ 24 批 (Lots)"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "12 ~ 24 lots is an uncalibrated defensive-hold scenario. The Etch-04 6-lot scenario leaves the before/after allocation unspecified. Actual scope follows traceability evidence." : "12 ~ 24 批為未校準防禦性 Hold 情境；Etch-04 的 6 批情境未定義前後分配。實際範圍依追溯證據決定。"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Traceability Data Sources" : "追溯資料來源"}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "MES Digital History + FDC" : "MES 數位履歷 + FDC"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Correlate Wafer Timestamps Across Tools in Real Time" : "即時關聯晶圓在各機台的時間戳記"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Customer Shipment Containment Goal" : "客戶出貨防堵目標"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${lang === 'en' ? "Goal: 100% Defect Blocking" : "目標：100% 阻絕不良"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Zero escapes is a goal, not verified performance. Protect automotive / mobile customers using screening evidence and approved release criteria." : "零瑕疵流出為目標，非已驗證績效；須依篩選證據與核准放行條件保護車用／手機客戶。"}</div>
        </div>
      `;

      footerNote = t.ch18_containment_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh18Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 18</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh18Title">${t.ch18_title}</h2>
          <p class="eng-obj-subtitle">${t.ch18_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'ocap' ? 'is-active' : ''}" data-tab="ocap">${t.ch18_tab_ocap}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'rework' ? 'is-active' : ''}" data-tab="rework">${t.ch18_tab_rework}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'containment' ? 'is-active' : ''}" data-tab="containment">${t.ch18_tab_containment}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'OCAP, MRB, 8D & PCN Clauses' : 'OCAP、MRB、8D 與 PCN 變更條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'OCAP/Octopus · MRB/PAT · 8D · PCN' : 'OCAP/章魚防堵 · MRB/PAT · 8D · PCN'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? "OCAP Octopus containment, MRB and automotive PAT screening, 8D (D1–D8) interlocks and J-STD-046 PCN" : "OCAP 章魚防堵、MRB 與車用 PAT 篩選、8D (D1–D8) 防呆互鎖與 J-STD-046 PCN"}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Hypergeometric P-Value & IQR DPAT Law' : '超幾何共性檢定與動態 PAT 律 (PAT Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'P(X≥k) < 10^-3 · DPAT = Q50 ± 6·IQR/1.35' : 'P(X≥k) < 10^-3 · DPAT = Q50 ± 6·IQR/1.35'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? "Hypergeometric commonality testing supports chamber and sister-lot investigation; IQR DPAT screens outliers without guaranteeing localization within seconds or zero escapes." : "超幾何共性檢定協助調查異常腔體與姊妹批；IQR DPAT 篩選離群晶粒，不保證秒級定位或零漏失。"}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Octopus Hold · AEC DPAT · ECN Matrix' : 'Octopus Hold · AEC DPAT · ECN Matrix'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? "15 minutes is an uncalibrated containment scenario. Sister-lot holds, DPAT screening and cross-step ECN review follow approved procedures; complete interception within that time is not guaranteed." : "15 分鐘僅為未校準防堵情境；姊妹批 Hold、DPAT 篩選及 ECN 跨站審查依核准流程執行，不保證時限內全數攔截。"}</div>
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

    container.querySelectorAll('.ocap-sim-btn').forEach(btn => {
      const selectState = () => {
        const restoreFocus = btn === btn.ownerDocument.activeElement;
        simState = btn.getAttribute('data-sim');
        update();
        if (restoreFocus) container.querySelector(`[data-sim="${simState}"]`)?.focus();
      };
      bindEngineeringEvent(btn, 'click', selectState);
      bindEngineeringEvent(btn, 'keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectState();
        }
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 24. Ch 23 晶圓廠 MES 智慧調度、Q-Time 逾時失控連鎖警報與防呆互鎖模型 (Smart Fab)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderExcursionControlObject as render };
