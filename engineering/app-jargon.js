import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderFabJargonDecoderObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
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
              <text x="165" y="21" text-anchor="middle" fill="#09131b" font-size="12" font-weight="800">1. 四班二輪交接班 (Shift Handover)</text>
              <text x="15" y="55" fill="#f59e0b" font-size="11" font-weight="750">「卡批狀況與機台 Alarm 請務必逐項交接」</text>
              <text x="15" y="78" fill="#cbd5e1" font-size="10">• 交代在線 WIP、當機機台 (Tool Down) 與等待 PM</text>
              <text x="15" y="98" fill="#cbd5e1" font-size="10">• 確認 Hot Lot (急件批) 當前站點與天車優先級</text>
              <text x="15" y="118" fill="#34d399" font-size="10" font-weight="700">✓ 核心原則：不留隱患給下一班，交接不清是最大殺手</text>
            </g>

            <!-- 情境 2: 帶線催貨 Expediting -->
            <g transform="translate(350, 0)">
              <rect x="0" y="0" width="330" height="140" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
              <rect x="0" y="0" width="330" height="32" rx="6" fill="#10b981"/>
              <text x="165" y="21" text-anchor="middle" fill="#09131b" font-size="12" font-weight="800">2. 帶線跑貨 (Lot Expediting)</text>
              <text x="15" y="55" fill="#38bdf8" font-size="11" font-weight="750">「這批 Super Hot Run 客戶在催，一路綠燈通行」</text>
              <text x="15" y="78" fill="#cbd5e1" font-size="10">• OHT 天車插隊搶先搬運，不進 Stocker 緩存倉</text>
              <text x="15" y="98" fill="#cbd5e1" font-size="10">• 預先預約機台 Load Port，到站零等待直接進機</text>
              <text x="15" y="118" fill="#38bdf8" font-size="10" font-weight="700">✓ 核心指標：極限壓縮 Cycle Time (生產週期)</text>
            </g>

            <!-- 情境 3: 機台警報 Tool Alarm -->
            <g transform="translate(0, 160)">
              <rect x="0" y="0" width="330" height="140" rx="6" fill="#0f172a" stroke="#ef4444" stroke-width="2"/>
              <rect x="0" y="0" width="330" height="32" rx="6" fill="#ef4444"/>
              <text x="165" y="21" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">3. 機台警報排除 (Tool Alarm)</text>
              <text x="15" y="55" fill="#ef4444" font-size="11" font-weight="750">「Alarm 狂響先下 Hold，絕對不要盲目按 Clear！」</text>
              <text x="15" y="78" fill="#cbd5e1" font-size="10">• 檢查真空值 (Vacuum)、射頻反射波 (Reflected Power)</text>
              <text x="15" y="98" fill="#cbd5e1" font-size="10">• 若懷疑破片 (Wafer Breakage) 立即停機，不可移動晶圓</text>
              <text x="15" y="118" fill="#ef4444" font-size="10" font-weight="700">✓ 核心原則：保全現場第一證據，啟動 OCAP 流程</text>
            </g>

            <!-- 情境 4: Q-Time 壓線急救 -->
            <g transform="translate(350, 160)">
              <rect x="0" y="0" width="330" height="140" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
              <rect x="0" y="0" width="330" height="32" rx="6" fill="#f59e0b"/>
              <text x="165" y="21" text-anchor="middle" fill="#09131b" font-size="12" font-weight="800">4. Q-Time 逾時壓線 (Q-Time Rush)</text>
              <text x="15" y="55" fill="#f59e0b" font-size="11" font-weight="750">「剩 15 分鐘自然氧化層要長出來了，手刀推車！」</text>
              <text x="15" y="78" fill="#cbd5e1" font-size="10">• 清洗出槽至高溫爐管嚴格限制 4 小時以內</text>
              <text x="15" y="98" fill="#cbd5e1" font-size="10">• 倒數響起 MES 自動觸發高優先級調度</text>
              <text x="15" y="118" fill="#10b981" font-size="10" font-weight="700">✓ 逾時後果：一旦超過 1 秒強制退回重新洗淨</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,210 L 690,210" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.65"/><circle cx="400" cy="210" r="36" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 5" class="anim-beam" opacity="0.7"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_jargon_metric_jargons}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">43 筆道地行話</div>
          <div class="eng-obj-metric-note">台積電/聯電/世界先進晶圓廠原味術語</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_jargon_metric_shifts}</div>
          <div class="eng-obj-metric-value">四班二輪 (12hr)</div>
          <div class="eng-obj-metric-note">日班 07:30-19:30 · 夜班 19:30-07:30</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_jargon_metric_poka}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">零疏失 (Zero Error)</div>
          <div class="eng-obj-metric-note">黑話是現場最簡潔的抗失誤通訊協議</div>
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
            <text x="0" y="-80" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="800">日班 (Day Shift) 07:30 ~ 19:30</text>
            <text x="0" y="-60" text-anchor="middle" fill="#cbd5e1" font-size="10.5">晨會 · 帶線 · 異常批處置 · 製程實驗 (Split)</text>

            <!-- 下半圓：夜班 Night Shift (19:30 - 07:30) -->
            <path d="M 135,0 A 135,135 0 0,1 -135,0" fill="none" stroke="#38bdf8" stroke-width="12"/>
            <text x="0" y="70" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="800">夜班 (Night Shift) 19:30 ~ 07:30</text>
            <text x="0" y="90" text-anchor="middle" fill="#cbd5e1" font-size="10.5">全力跑貨 · 機台 PM 定期保養 · 突發除錯</text>

            <!-- 交接班交接點 (07:30 & 19:30) -->
            <circle cx="-135" cy="0" r="10" fill="#ef4444"/>
            <text x="-155" y="5" text-anchor="end" fill="#ef4444" font-size="11" font-weight="800">07:30 早交接</text>

            <circle cx="135" cy="0" r="10" fill="#ef4444"/>
            <text x="155" y="5" text-anchor="start" fill="#ef4444" font-size="11" font-weight="800">19:30 晚交接</text>

            <circle cx="0" cy="0" r="15" fill="#38bdf8"/>
            <text x="0" y="4" text-anchor="middle" fill="#09131b" font-size="9" font-weight="800">365天</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,210 L 690,210" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.65"/><circle cx="400" cy="210" r="36" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 5" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">全年運轉時數</div>
          <div class="eng-obj-metric-value">8,760 小時</div>
          <div class="eng-obj-metric-note">全年無休 · 即使農曆新年亦全速生產</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">交接黃金 30 分鐘</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">資訊 100% 傳遞</div>
          <div class="eng-obj-metric-note">口頭 + 電子交接簿 (E-Logbook) 雙重覆核</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">無塵服穿戴規範</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&lt; 3 分鐘完成</div>
          <div class="eng-obj-metric-note">防靜電連身服 + 護目鏡 + 雙層乳膠手套</div>
        </div>
      `;

      footerNote = t.app_jargon_culture_desc;
    } else {
      // decoder 模式
      const jargons = {
        hold: { name: '卡批 / Hold 批', real: '系統級凍結晶圓批號，防止問題晶圓流入下一道站點', risk: '若未即時處置將引發下游產線斷料或 Q-Time 逾時報廢' },
        broken: { name: '破片 (Wafer Break)', real: '晶圓在機械手臂搬運或腔體內碎裂成碎片', risk: '極度重大異常！電漿腔體與全線真空管道面臨微粒污染，需停機 PM 清機數天' },
        qtime: { name: '壓線 (Q-Time Excursion)', real: '兩道工序等待時間即將超過物理上限 (如清洗至氧化)', risk: '超過時間自然氧化層會長出，導致金屬接觸電阻倍增或晶片失效' },
        poka: { name: '防呆 (Poka-Yoke)', real: '機台透過條碼、RFID 與配方版本連鎖，阻絕一切人為操作失誤', risk: '嚴禁任何人私自繞過防呆開門，這是晶圓廠的最高天條' }
      };
      const cur = jargons[selectedJargon] || jargons.hold;

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive Fab Jargon Decoder">
          <!-- 上方黑話切換按鈕 -->
          <g transform="translate(60, 20)">
            ${Object.keys(jargons).map((k, i) => `
              <g class="jargon-btn" data-jargon="${k}" style="cursor: pointer;" transform="translate(${i * 175}, 0)">
                <rect x="0" y="0" width="165" height="30" rx="4" fill="${selectedJargon === k ? '#38bdf8' : '#1e293b'}" stroke="${selectedJargon === k ? '#ffffff' : '#334155'}" stroke-width="1.5"/>
                <text x="82" y="19" text-anchor="middle" fill="${selectedJargon === k ? '#09131b' : '#cbd5e1'}" font-size="11.5" font-weight="750">${jargons[k].name.split(' ')[0]}</text>
              </g>
            `).join('')}
          </g>

          <!-- 中央：解碼卡片 -->
          <g transform="translate(80, 75)">
            <rect x="0" y="0" width="640" height="290" rx="8" fill="#09131b" stroke="#334155" stroke-width="1.5"/>

            <text x="40" y="45" fill="#f59e0b" font-size="18" font-weight="800">現場口頭語：【${cur.name}】</text>

            <rect x="40" y="70" width="560" height="75" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
            <text x="60" y="95" fill="#10b981" font-size="12" font-weight="750">工程實質真義 (Engineering Truth)：</text>
            <text x="60" y="125" fill="#cbd5e1" font-size="11.5">${cur.real}</text>

            <rect x="40" y="165" width="560" height="75" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="1"/>
            <text x="60" y="190" fill="#ef4444" font-size="12" font-weight="750">背後物理與品質風險 (Physical Risk)：</text>
            <text x="60" y="220" fill="#cbd5e1" font-size="11.5">${cur.risk}</text>

            <text x="320" y="270" text-anchor="middle" fill="#64748b" font-size="11">晶圓廠黑話不是無聊的密碼，而是千錘百鍊、防止百萬美元損失的工業安全防線</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 110,210 L 690,210" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.65"/><circle cx="400" cy="210" r="36" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 5" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">現場黑話術語分類</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${cur.name.split('/')[0]}</div>
          <div class="eng-obj-metric-note">即時直擊晶圓廠日常真實語境</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">風險層級</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">Critical 安全/良率</div>
          <div class="eng-obj-metric-note">牽一髮動全身的製造防護線</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">對應標準作業書</div>
          <div class="eng-obj-metric-value">Fab SOP / OCAP 規範</div>
          <div class="eng-obj-metric-note">每一句黑話都有對應的嚴格作業規程</div>
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
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'scenarios' ? 'is-active' : ''}" data-tab="scenarios">${t.app_jargon_tab_scenarios}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'culture' ? 'is-active' : ''}" data-tab="culture">${t.app_jargon_tab_culture}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'decoder' ? 'is-active' : ''}" data-tab="decoder">${t.app_jargon_tab_decoder}</button>
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
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Fab Queueing & Q-Time Interlock Law' : '批次排隊與 Q-Time 鎖批數學律 (Floor Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 't_wait < t_Q-Time · P(commonality) < 10^-3' : 't_wait < t_Q-Time · P(commonality) < 10^-3'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Strict Q-Time auto-hold, RTD priority weights & commonality P-value' : 'Q-Time 倒數硬性鎖批、RTD 權重排程與超幾何共性秒級定位異常腔體'}</div>
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
      bindEngineeringEvent(btn, 'click', () => {
        selectedJargon = btn.getAttribute('data-jargon');
        update();
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
