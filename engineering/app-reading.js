import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderMasteryRoadmapObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'tree'; // 'tree' | 'classics' | 'cert'
  let selectedLevel = 2; // 1, 2, 3, 4

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'tree') {
      const levels = [
        { lvl: 'L1', title: '零基礎新手入門 (Freshman)', desc: '矽晶圓長晶切拋、Class 1 無塵室規範、基礎物理與 CMOS 電晶體基本運作原理', ch: 'Ch 00 ~ Ch 03' },
        { lvl: 'L2', title: '製程模組工程師 (Module Engineer)', desc: '微影光路與光阻化學、薄膜沉積 (ALD/PVD/CVD)、電漿蝕刻腔體、CMP 運動學與離子佈植', ch: 'Ch 04 ~ Ch 10' },
        { lvl: 'L3', title: '製程整合與良率專家 (PIE / Yield)', desc: '完整 CMOS 整合迴路、WAT 劃線道 PCM 測試、CP 針測、SPC 3σ 管制、缺陷圖譜與 OCAP 應變', ch: 'Ch 11 ~ Ch 19' },
        { lvl: 'L4', title: '首席晶片架構師 (Chief Architect)', desc: '2.5D CoWoS 與 3D SoIC 先進封裝、DTCO 微縮設計、智慧製造 MES 調度、DVFS 與軟韌體硬體真相', ch: 'Ch 20 ~ Ch 24' }
      ];

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Semiconductor Engineer Career Mastery Tree">
          <g transform="translate(60, 30)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">半導體工程師四階階梯式技能修煉樹 (Engineer Mastery Tree)</text>

            <!-- 垂直進階梯形階梯 (從 L1 底到 L4 頂) -->
            <g transform="translate(40, 45)">
              ${levels.map((item, idx) => {
                const isSelected = selectedLevel === (idx + 1);
                const y = idx * 75;
                return `
                  <g class="level-bar" data-level="${idx + 1}" style="cursor: pointer;" transform="translate(0, ${y})">
                    <rect x="0" y="0" width="600" height="65" rx="6" fill="${isSelected ? '#1e293b' : '#0f172a'}" stroke="${isSelected ? '#38bdf8' : '#334155'}" stroke-width="${isSelected ? 2.5 : 1}"/>
                    <!-- 左側徽章 -->
                    <rect x="15" y="12" width="48" height="40" rx="4" fill="${isSelected ? '#38bdf8' : '#334155'}"/>
                    <text x="39" y="37" text-anchor="middle" fill="${isSelected ? '#09131b' : '#cbd5e1'}" font-size="16" font-weight="800">${item.lvl}</text>
                    <!-- 標題與對應章節 -->
                    <text x="75" y="28" fill="${isSelected ? '#38bdf8' : '#ffffff'}" font-size="12" font-weight="750">${item.title}</text>
                    <text x="580" y="28" text-anchor="end" fill="#f59e0b" font-size="11" font-weight="700">${item.ch}</text>
                    <text x="75" y="48" fill="#94a3b8" font-size="10.5">${item.desc}</text>
                  </g>
                `;
              }).join('')}
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,340 L 680,340" fill="none" stroke="#34d399" stroke-width="2.2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><path d="M 160,180 L 640,180" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="6 6" class="anim-beam" opacity="0.6"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">當前選中技能等級</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${levels[selectedLevel - 1].lvl}</div>
          <div class="eng-obj-metric-note">${levels[selectedLevel - 1].title.split(' ')[0]}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">修煉對應章節</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${levels[selectedLevel - 1].ch}</div>
          <div class="eng-obj-metric-note">配備專屬微觀物理機制工程物件</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">核心第一性原理</div>
          <div class="eng-obj-metric-value">微觀物理 + 統計管制</div>
          <div class="eng-obj-metric-note">從原子層到百億晶體統計良率</div>
        </div>
      `;

      footerNote = t.app_reading_tree_desc;
    } else if (activeTab === 'classics') {
      const bibles = [
        { author: 'S. M. Sze (施敏)', title: 'Physics of Semiconductor Devices', zh: '《半導體元件物理》全球權威聖經' },
        { author: 'Stephen A. Campbell', title: 'The Science and Engineering of Microelectronic Fabrication', zh: '《微電子製造科學與工程》製程技術經典' },
        { author: 'James D. Plummer', title: 'Silicon VLSI Technology', zh: '《矽 VLSI 技術：基礎、實作與模型》史丹佛殿堂教材' },
        { author: 'Dieter K. Schroder', title: 'Semiconductor Material and Device Characterization', zh: '《半導體材料與元件量測特性分析》檢測百科' }
      ];

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Semiconductor Classic Bibles">
          <g transform="translate(60, 30)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">站在巨人的肩膀上：四大半導體全球公認聖經著作 (Classic Bibles)</text>
            <g transform="translate(0, 40)">
              ${bibles.map((b, idx) => {
                const y = idx * 75;
                return `
                  <g transform="translate(0, ${y})">
                    <rect x="0" y="0" width="680" height="65" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                    <rect x="15" y="12" width="36" height="40" rx="3" fill="#10b981"/>
                    <text x="33" y="36" text-anchor="middle" fill="#09131b" font-size="14" font-weight="800">#${idx + 1}</text>
                    <text x="65" y="28" fill="#38bdf8" font-size="12" font-weight="750">${b.title}</text>
                    <text x="65" y="48" fill="#cbd5e1" font-size="10.5">${b.zh}</text>
                    <text x="660" y="38" text-anchor="end" fill="#f59e0b" font-size="11" font-weight="700">${b.author}</text>
                  </g>
                `;
              }).join('')}
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,340 L 680,340" fill="none" stroke="#34d399" stroke-width="2.2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><path d="M 160,180 L 640,180" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="6 6" class="anim-beam" opacity="0.6"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_reading_metric_bibles}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">4 大聖經巨著</div>
          <div class="eng-obj-metric-note">半導體物理、製程、量測三足鼎立</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">理論永恆度</div>
          <div class="eng-obj-metric-value">歷久彌新 50+ 年</div>
          <div class="eng-obj-metric-note">摩爾定律微縮背後不變的物理定律</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">建議研讀方式</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">本站導覽 + 聖經深入</div>
          <div class="eng-obj-metric-note">本站作為快速全景地圖，聖經作為微積分深度推導</div>
        </div>
      `;

      footerNote = t.app_reading_classics_desc;
    } else {
      // cert 模式 (第一性原理)
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="First Principles Mindset Roadmap">
          <g transform="translate(60, 40)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">半導體工程師的核心第一性原理思維藍圖 (First Principles)</text>

            <g transform="translate(20, 50)">
              <!-- 維度 1 -->
              <g transform="translate(0, 0)">
                <rect x="0" y="0" width="300" height="110" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                <text x="20" y="28" fill="#38bdf8" font-size="12" font-weight="750">1. 微觀物理熱力學第一性原理</text>
                <text x="20" y="52" fill="#cbd5e1" font-size="10">• 能帶量子穿隧、化學反應活化能 (Arrhenius)</text>
                <text x="20" y="72" fill="#cbd5e1" font-size="10">• Preston CMP 摩擦磨削動能平衡</text>
                <text x="20" y="92" fill="#94a3b8" font-size="10">⇒ 任何異常都可以拆解為微觀力熱光電反應</text>
              </g>

              <!-- 維度 2 -->
              <g transform="translate(340, 0)">
                <rect x="0" y="0" width="300" height="110" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
                <text x="20" y="28" fill="#10b981" font-size="12" font-weight="750">2. 天文尺度下的統計管制紀律</text>
                <text x="20" y="52" fill="#cbd5e1" font-size="10">• 單片 300mm 晶圓含數百億電晶體</text>
                <text x="20" y="72" fill="#cbd5e1" font-size="10">• 6-Sigma Cpk ≥ 1.67、WECO 八大判異</text>
                <text x="20" y="92" fill="#94a3b8" font-size="10">⇒ 不相信運氣，只相信數據與常態分佈</text>
              </g>

              <!-- 維度 3 -->
              <g transform="translate(0, 130)">
                <rect x="0" y="0" width="300" height="110" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
                <text x="20" y="28" fill="#f59e0b" font-size="12" font-weight="750">3. 跨模組製程協同效應 (DTCO)</text>
                <text x="20" y="52" fill="#cbd5e1" font-size="10">• 微影解析度受限於蝕刻側壁鈍化</text>
                <text x="20" y="72" fill="#cbd5e1" font-size="10">• 封裝應力反向影響矽晶片電晶體遷移率</text>
                <text x="20" y="92" fill="#94a3b8" font-size="10">⇒ 絕不能只守著自己的單一站台當井底之蛙</text>
              </g>

              <!-- 維度 4 -->
              <g transform="translate(340, 130)">
                <rect x="0" y="0" width="300" height="110" rx="6" fill="#0f172a" stroke="#ec4899" stroke-width="1.5"/>
                <text x="20" y="28" fill="#ec4899" font-size="12" font-weight="750">4. 軟韌體與硬體真實物理邊界</text>
                <text x="20" y="52" fill="#cbd5e1" font-size="10">• DRAM Row Hammer 漏電翻轉真實存在</text>
                <text x="20" y="72" fill="#cbd5e1" font-size="10">• IR Drop 壓降與 PVT 工藝角決定軟體極限</text>
                <text x="20" y="92" fill="#94a3b8" font-size="10">⇒ 優秀架構師必須穿透抽象層看見矽晶片本體</text>
              </g>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,340 L 680,340" fill="none" stroke="#34d399" stroke-width="2.2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.7"/><path d="M 160,180 L 640,180" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="6 6" class="anim-beam" opacity="0.6"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_reading_metric_mindset}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">4 大思維支柱</div>
          <div class="eng-obj-metric-note">物理 · 統計 · 跨模組 · 軟硬體貫通</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">工程解決能力</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">8D 根因分析</div>
          <div class="eng-obj-metric-note">永遠追溯物理機理，杜絕盲改與止血掩蓋</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">終極目標</div>
          <div class="eng-obj-metric-value">全域系統性卓越</div>
          <div class="eng-obj-metric-note">在極致物理極限中創造人類最強算力</div>
        </div>
      `;

      footerNote = t.app_reading_tree_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjReadingTitle">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · APPENDIX C</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjReadingTitle">${t.app_reading_title}</h2>
          <p class="eng-obj-subtitle">${t.app_reading_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'tree' ? 'is-active' : ''}" data-tab="tree">${t.app_reading_tab_tree}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'classics' ? 'is-active' : ''}" data-tab="classics">${t.app_reading_tab_classics}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'cert' ? 'is-active' : ''}" data-tab="cert">${t.app_reading_tab_cert}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Standards & Conferences Clauses' : '國際標準與頂尖會議條例 (Standards)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'SEMI/JEDEC/UCIe · IEDM/VLSI/ECTC' : 'SEMI/JEDEC/UCIe · IEDM/VLSI/ECTC'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Spans SEMI/JEDEC/AEC/UCIe/IEEE 1838 standards & IEDM/VLSI/ISSCC/ECTC' : '涵蓋 SEMI/JEDEC/AEC/UCIe/IEEE 1838 標準與 IEDM/VLSI/ISSCC/ECTC 會議'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? '25-Chapter 75+ Governing Equations Atlas' : '全書 25 章 75+ 核心統御方程庫 (Equations)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'Rayleigh · Deal-Grove · Preston · Weibull · OEE' : 'Rayleigh · Deal-Grove · Preston · Weibull · OEE'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Unites device physics, process kinetics, 3D thermomechanics & CIM' : '串聯半導體固態物理、製程動力學、3D 熱機械、良率統計與排隊論方程'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'SEMI S2/E10 · JEDEC JESD47 · ISTFA FA' : 'SEMI S2/E10 · JEDEC JESD47 · ISTFA FA'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Integrates SEMI safety, JEDEC/AEC qualification & ISTFA/IRPS FA standards' : '整合 SEMI 機台安規、JEDEC/AEC 可靠度標準與 ISTFA/IRPS 國際失效分析知識庫'}</div>
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

    container.querySelectorAll('.level-bar').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        selectedLevel = parseInt(btn.getAttribute('data-level'), 10);
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 總調度入口 (Unified Mount Orchestrator) — 覆蓋全站 25 正式章 + 3 附錄 = 28 全模組 100% 滿貫
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderMasteryRoadmapObject as render };
