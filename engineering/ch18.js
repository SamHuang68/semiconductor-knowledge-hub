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
            <rect x="0" y="0" width="150" height="26" rx="4" class="ocap-sim-btn" data-sim="normal" fill="${simState === 'normal' ? '#10b981' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="75" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">模擬正常監控 (Normal)</text>

            <rect x="170" y="0" width="160" height="26" rx="4" class="ocap-sim-btn" data-sim="ooc" fill="${simState === 'ooc' ? '#f59e0b' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="250" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">觸發 OOC 警報 (Alarm)</text>

            <rect x="350" y="0" width="150" height="26" rx="4" class="ocap-sim-btn" data-sim="hold" fill="${simState === 'hold' ? '#ef4444' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="425" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">系統連鎖截停 (Lot Hold)</text>

            <rect x="520" y="0" width="160" height="26" rx="4" class="ocap-sim-btn" data-sim="disposed" fill="${simState === 'disposed' ? '#8b5cf6' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="600" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">工程處置放行 (Disposition)</text>
          </g>

          <!-- OCAP 四步決策樹主圖 -->
          <g transform="translate(60, 70)">
            <!-- 步驟 1: 即時監控 -->
            <g transform="translate(0, 40)">
              <rect x="0" y="0" width="140" height="120" rx="6" fill="#09131b" stroke="${simState === 'normal' ? '#10b981' : '#334155'}" stroke-width="2"/>
              <text x="70" y="30" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="750">步驟 1: 線上監控</text>
              <text x="70" y="55" text-anchor="middle" fill="#cbd5e1" font-size="10">• SPC 管制圖 3σ</text>
              <text x="70" y="75" text-anchor="middle" fill="#cbd5e1" font-size="10">• 機台 FDC 感測器</text>
              <text x="70" y="95" text-anchor="middle" fill="#cbd5e1" font-size="10">• 線上缺陷檢測</text>
            </g>

            <line x1="140" y1="100" x2="180" y2="100" stroke="#475569" stroke-width="2"/>

            <!-- 步驟 2: 觸發 OOC & 系統連鎖截停 -->
            <g transform="translate(180, 40)">
              <rect x="0" y="0" width="150" height="120" rx="6" fill="#09131b" stroke="${simState === 'ooc' || simState === 'hold' ? '#ef4444' : '#334155'}" stroke-width="${simState === 'hold' ? 3 : 2}"/>
              <text x="75" y="30" text-anchor="middle" fill="${simState === 'hold' ? '#ef4444' : '#f59e0b'}" font-size="11" font-weight="750">步驟 2: 系統截停</text>
              <text x="75" y="55" text-anchor="middle" fill="#cbd5e1" font-size="10">• 自動下達 Lot Hold</text>
              <text x="75" y="75" text-anchor="middle" fill="#cbd5e1" font-size="10">• 機台自動閉鎖 (Down)</text>
              <text x="75" y="95" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">阻止不良品流入下站</text>
            </g>

            <line x1="330" y1="100" x2="370" y2="100" stroke="#475569" stroke-width="2"/>

            <!-- 步驟 3: 影響範圍清查 -->
            <g transform="translate(370, 40)">
              <rect x="0" y="0" width="140" height="120" rx="6" fill="#09131b" stroke="#38bdf8" stroke-width="2"/>
              <text x="70" y="30" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="750">步驟 3: 範圍清查</text>
              <text x="70" y="55" text-anchor="middle" fill="#cbd5e1" font-size="10">• 八爪魚同批追溯</text>
              <text x="70" y="75" text-anchor="middle" fill="#cbd5e1" font-size="10">• 抽測前後各 2 批</text>
              <text x="70" y="95" text-anchor="middle" fill="#cbd5e1" font-size="10">• 鎖定受害晶圓清單</text>
            </g>

            <line x1="510" y1="100" x2="550" y2="100" stroke="#475569" stroke-width="2"/>

            <!-- 步驟 4: 三向處置判定 -->
            <g transform="translate(550, 0)">
              <rect x="0" y="0" width="130" height="60" rx="4" fill="#09131b" stroke="#10b981" stroke-width="2"/>
              <text x="65" y="25" text-anchor="middle" fill="#10b981" font-size="11" font-weight="800">✓ 放行 (Release)</text>
              <text x="65" y="45" text-anchor="middle" fill="#cbd5e1" font-size="9">評估規格內容許</text>

              <rect x="0" y="75" width="130" height="60" rx="4" fill="#09131b" stroke="#f59e0b" stroke-width="2"/>
              <text x="65" y="100" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="800">↺ 重工 (Rework)</text>
              <text x="65" y="120" text-anchor="middle" fill="#cbd5e1" font-size="9">黃光去膠重新塗佈</text>

              <rect x="0" y="150" width="130" height="60" rx="4" fill="#09131b" stroke="#ef4444" stroke-width="2"/>
              <text x="65" y="175" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="800">✕ 報廢 (Scrap)</text>
              <text x="65" y="195" text-anchor="middle" fill="#cbd5e1" font-size="9">蝕刻穿孔物理損毀</text>
            </g>

            <!-- 下方：防呆閉環 8D -->
            <g transform="translate(40, 230)">
              <rect x="0" y="0" width="600" height="60" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="300" y="25" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="700">閉環防再發對策：8D 報告 + Poka-Yoke 機台配方互鎖</text>
              <text x="300" y="45" text-anchor="middle" fill="#94a3b8" font-size="10">確認 Root Cause 根因，修改作業標準書 (SOP)，更新防呆規則後方可釋放機台生產</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,210 L 680,210" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><circle cx="400" cy="210" r="42" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch18_metric_hold_time}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&lt; 2.0 小時</div>
          <div class="eng-obj-metric-note">防範晶圓停滯超時過期 (Q-Time)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch18_metric_rework_limit}</div>
          <div class="eng-obj-metric-value">≤ 2 次</div>
          <div class="eng-obj-metric-note">避免晶圓表面微粗糙度惡化</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch18_metric_scrap_cost}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">$250,000+ USD</div>
          <div class="eng-obj-metric-note">25 片 3nm 滿載批次價值驚人</div>
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
              <text x="165" y="26" text-anchor="middle" fill="#09131b" font-size="13" font-weight="800">✓ 綠燈區：100% 可重工製程 (Reversible)</text>

              <g transform="translate(20, 60)">
                <text x="0" y="20" fill="#34d399" font-size="12" font-weight="750">1. 光阻顯影後 (Post-Develop / ADI)</text>
                <text x="15" y="40" fill="#cbd5e1" font-size="10">• 曝光劑量偏差 / CD 偏寬偏窄</text>
                <text x="15" y="58" fill="#cbd5e1" font-size="10">• 步進掃描對準失誤 (Overlay Shift)</text>
                <text x="15" y="76" fill="#10b981" font-size="10" font-weight="700">⇒ 處置：氧電漿去膠 (Strip) + SPM 酸洗，晶格無傷</text>

                <text x="0" y="110" fill="#34d399" font-size="12" font-weight="750">2. CMP 研磨不足 (Under-Polish)</text>
                <text x="15" y="130" fill="#cbd5e1" font-size="10">• 氧化層殘留過厚 / 金屬未完全清除</text>
                <text x="15" y="148" fill="#10b981" font-size="10" font-weight="700">⇒ 處置：補磨 (Buff Polish)，再研磨 10-15 秒</text>

                <text x="0" y="180" fill="#34d399" font-size="12" font-weight="750">3. 清洗顆粒超標 (Post-Clean Particles)</text>
                <text x="15" y="200" fill="#10b981" font-size="10" font-weight="700">⇒ 處置：退回 RCA 槽進行兆聲波二次重複清洗</text>
              </g>
            </g>

            <!-- 紅燈區：不可逆破壞 (Irreversible) -->
            <g transform="translate(350, 0)">
              <rect x="0" y="0" width="330" height="280" rx="8" fill="#09131b" stroke="#ef4444" stroke-width="2.5"/>
              <rect x="0" y="0" width="330" height="40" rx="8" fill="#ef4444"/>
              <text x="165" y="26" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="800">✕ 紅燈區：不可逆永久破壞 (Irreversible)</text>

              <g transform="translate(20, 60)">
                <text x="0" y="20" fill="#f87171" font-size="12" font-weight="750">1. 電漿蝕刻後 (Post-Etch / AEI)</text>
                <text x="15" y="40" fill="#cbd5e1" font-size="10">• 側壁底切 (Undercut) / 底部穿孔過蝕刻</text>
                <text x="15" y="58" fill="#cbd5e1" font-size="10">• 實體矽材/氧化層已被化學氣體挖走</text>
                <text x="15" y="76" fill="#ef4444" font-size="10" font-weight="700">⇒ 後果：無法填補，只能降規或整批報廢 (Scrap)</text>

                <text x="0" y="110" fill="#f87171" font-size="12" font-weight="750">2. 離子佈植打錯劑量/能量</text>
                <text x="15" y="130" fill="#cbd5e1" font-size="10">• 摻雜深度過深造成接面崩潰</text>
                <text x="15" y="148" fill="#ef4444" font-size="10" font-weight="700">⇒ 後果：雜質原子已嵌入晶格，物理無法拔出</text>

                <text x="0" y="180" fill="#f87171" font-size="12" font-weight="750">3. CMP 過磨碟化 (Over-Polish Dishing)</text>
                <text x="15" y="200" fill="#ef4444" font-size="10" font-weight="700">⇒ 後果：銅導線厚度過薄，電阻爆表，無法逆轉</text>
              </g>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,210 L 680,210" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><circle cx="400" cy="210" r="42" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">重工黃金分水嶺</div>
          <div class="eng-obj-metric-value">蝕刻前 (Pre-Etch)</div>
          <div class="eng-obj-metric-note">一旦下刀蝕刻即告別重工可能</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">光阻剝除重工良率恢復</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&gt; 99.8%</div>
          <div class="eng-obj-metric-note">及時攔截可挽回數百萬美元損失</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">報廢判定委員會 (MRB)</div>
          <div class="eng-obj-metric-value">製程 + 整合 + 品保簽核</div>
          <div class="eng-obj-metric-note">最高層級專案報廢確認機制</div>
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
              <text x="80" y="75" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">異常核心批</text>
              <text x="80" y="95" text-anchor="middle" fill="#ffffff" font-size="10.5">Lot #A88301</text>
            </g>

            <!-- 八爪魚放射觸手 (追溯維度) -->
            <!-- 1. 同機台腔體 (Chamber) -->
            <g transform="translate(60, 40)">
              <line x1="280" y1="150" x2="160" y2="70" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4"/>
              <rect x="0" y="0" width="160" height="60" rx="4" fill="#09131b" stroke="#38bdf8" stroke-width="2"/>
              <text x="80" y="25" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="750">1. 同腔體 (Chamber)</text>
              <text x="80" y="45" text-anchor="middle" fill="#cbd5e1" font-size="9.5">清查 Etch-04 前後 6 批</text>
            </g>

            <!-- 2. 同配方 (Recipe) -->
            <g transform="translate(460, 40)">
              <line x1="400" y1="150" x2="520" y2="70" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4"/>
              <rect x="0" y="0" width="160" height="60" rx="4" fill="#09131b" stroke="#f59e0b" stroke-width="2"/>
              <text x="80" y="25" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="750">2. 同配方版本 (Recipe)</text>
              <text x="80" y="45" text-anchor="middle" fill="#cbd5e1" font-size="9.5">清查使用 V4.2 的所有機台</text>
            </g>

            <!-- 3. 同光罩 (Reticle) -->
            <g transform="translate(60, 240)">
              <line x1="280" y1="210" x2="160" y2="270" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4"/>
              <rect x="0" y="0" width="160" height="60" rx="4" fill="#09131b" stroke="#10b981" stroke-width="2"/>
              <text x="80" y="25" text-anchor="middle" fill="#10b981" font-size="11" font-weight="750">3. 同光罩序號 (Reticle)</text>
              <text x="80" y="45" text-anchor="middle" fill="#cbd5e1" font-size="9.5">排除光罩表面微塵污染</text>
            </g>

            <!-- 4. 同批化學品 (Slurry/Gas) -->
            <g transform="translate(460, 240)">
              <line x1="400" y1="210" x2="520" y2="270" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4"/>
              <rect x="0" y="0" width="160" height="60" rx="4" fill="#09131b" stroke="#c084fc" stroke-width="2"/>
              <text x="80" y="25" text-anchor="middle" fill="#c084fc" font-size="11" font-weight="750">4. 同批化學品 (Chemical)</text>
              <text x="80" y="45" text-anchor="middle" fill="#cbd5e1" font-size="9.5">清查同一鋼瓶特氣/研磨液</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,210 L 680,210" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><circle cx="400" cy="210" r="42" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 5" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">追溯鎖定批次數量</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">12 ~ 24 批 (Lots)</div>
          <div class="eng-obj-metric-note">防禦性暫停 (Defensive Hold)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">追溯資料來源</div>
          <div class="eng-obj-metric-value">MES 數位履歷 + FDC</div>
          <div class="eng-obj-metric-note">即時關聯晶圓在各機台的時間戳記</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">客戶出貨保護率</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">100% 阻絕不良</div>
          <div class="eng-obj-metric-note">零瑕疵流出至外部車用/手機客戶</div>
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
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Octopus containment, MRB + PAT outlier screen, 8D (D1–D8) & J-STD-046 PCN' : 'OCAP 章魚防堵、MRB 與車用 PAT 篩選、8D (D1–D8) 防呆互鎖與 J-STD-046 PCN'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Hypergeometric P-Value & IQR DPAT Law' : '超幾何共性檢定與動態 PAT 律 (PAT Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'P(X≥k) < 10^-3 · DPAT = Q50 ± 6·IQR/1.35' : 'P(X≥k) < 10^-3 · DPAT = Q50 ± 6·IQR/1.35'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Pinpoints excursion chambers & screens maverick dies via IQR DPAT' : '秒級鎖定異常腔體與章魚防堵姊妹批，以穩健四分位距剔除離群晶粒'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Octopus Hold · AEC DPAT · ECN Matrix' : 'Octopus Hold · AEC DPAT · ECN Matrix'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Enforces Octopus sister-lot containment, DPAT outlier ink-out & ECN review' : '15 分鐘章魚法全數攔截姊妹批、動態 PAT 淘汰邊際壞晶與 ECN 跨站互動審查'}</div>
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
      bindEngineeringEvent(btn, 'click', () => {
        simState = btn.getAttribute('data-sim');
        update();
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
