import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderMasteryRoadmapObject(container, lang = 'zh') {
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
  let activeTab = 'tree'; // 'tree' | 'classics' | 'cert'
  let selectedLevel = 2; // 1, 2, 3, 4

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'tree') {
      const levels = [
        { lvl: 'L1', title: tx("零基礎新手入門 (Freshman)", "Fundamentals"), desc: tx("矽晶圓長晶切拋、Class 1 無塵室規範、基礎物理與 CMOS 電晶體基本運作原理", "Silicon growth and wafer finishing; Class 1 cleanrooms; device physics and CMOS."), ch: 'Ch 00 ~ Ch 03' },
        { lvl: 'L2', title: tx("製程模組工程師 (Module Engineer)", "Process Module Engineer"), desc: tx("微影光路與光阻化學、薄膜沉積 (ALD/PVD/CVD)、電漿蝕刻腔體、CMP 運動學與離子佈植", "Lithography and resist; ALD/PVD/CVD; plasma etching; CMP and implantation."), ch: 'Ch 04 ~ Ch 10' },
        { lvl: 'L3', title: tx("製程整合與良率專家 (PIE / Yield)", "Process Integration / Yield"), desc: tx("完整 CMOS 整合迴路、WAT 劃線道 PCM 測試、CP 針測、SPC 3σ 管制、缺陷圖譜與 OCAP 應變", "CMOS integration; WAT/PCM and CP; SPC 3σ control; defect maps and OCAP."), ch: 'Ch 11 ~ Ch 19' },
        { lvl: 'L4', title: tx("首席晶片架構師 (Chief Architect)", "Chief Chip Architect"), desc: tx("2.5D CoWoS 與 3D SoIC 先進封裝、DTCO 微縮設計、智慧製造 MES 調度、DVFS 與軟韌體硬體真相", "2.5D CoWoS and 3D SoIC; DTCO; MES dispatch; DVFS and hardware/firmware limits."), ch: 'Ch 20 ~ Ch 24' }
      ];

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Semiconductor Engineer Career Mastery Tree">
          <g transform="translate(60, 30)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${tx("半導體工程師四階階梯式技能修煉樹 (Engineer Mastery Tree)", "Four-Level Semiconductor Engineering Learning Path")}</text>

            <!-- 垂直進階梯形階梯 (從 L1 底到 L4 頂) -->
            <g transform="translate(40, 45)">
              ${levels.map((item, idx) => {
                const isSelected = selectedLevel === (idx + 1);
                const y = idx * 75;
                return `
                  <g class="level-bar" data-level="${idx + 1}" role="button" tabindex="0" aria-pressed="${isSelected}" aria-label="${esc(item.lvl + ' ' + item.title)}" style="cursor: pointer;" transform="translate(0, ${y})">
                    <rect x="0" y="0" width="600" height="65" rx="6" fill="${isSelected ? '#1e293b' : '#0f172a'}" stroke="${isSelected ? '#38bdf8' : '#334155'}" stroke-width="${isSelected ? 2.5 : 1}"/>
                    <!-- 左側徽章 -->
                    <rect x="15" y="12" width="48" height="40" rx="4" fill="${isSelected ? '#38bdf8' : '#334155'}"/>
                    <text x="39" y="37" text-anchor="middle" fill="${isSelected ? '#09131b' : '#cbd5e1'}" font-size="16" font-weight="800">${item.lvl}</text>
                    <!-- 標題與對應章節 -->
                    <text x="75" y="28" fill="${isSelected ? '#38bdf8' : '#ffffff'}" font-size="12" font-weight="750">${item.title}</text>
                    <text x="580" y="28" text-anchor="end" fill="#f59e0b" font-size="11" font-weight="700">${item.ch}</text>
                    <text x="75" y="45" fill="#94a3b8" font-size="10.5">${svgTextLines(wrap(item.desc, 83), 75, 45, 13)}</text>
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
          <div class="eng-obj-metric-label">${tx("當前選中技能等級", "Selected Learning Level")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${levels[selectedLevel - 1].lvl}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? levels[selectedLevel - 1].title : levels[selectedLevel - 1].title.split(' ')[0]}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("修煉對應章節", "Related Chapters")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${levels[selectedLevel - 1].ch}</div>
          <div class="eng-obj-metric-note">${tx("配備專屬微觀物理機制工程物件", "Includes engineering diagrams for the relevant mechanisms")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("核心第一性原理", "Core First Principles")}</div>
          <div class="eng-obj-metric-value">${tx("微觀物理 + 統計管制", "Physics + Statistical Control")}</div>
          <div class="eng-obj-metric-note">${tx("從原子層到百億晶體統計良率", "From atomic-scale mechanisms to large transistor populations")}</div>
        </div>
      `;

      footerNote = t.app_reading_tree_desc;
    } else if (activeTab === 'classics') {
      const bibles = [
        { author: tx("S. M. Sze (施敏)", "S. M. Sze"), title: 'Physics of Semiconductor Devices', zh: tx("《半導體元件物理》全球權威聖經", "Reference on semiconductor device physics") },
        { author: 'Stephen A. Campbell', title: 'The Science and Engineering of Microelectronic Fabrication', zh: tx("《微電子製造科學與工程》製程技術經典", "Reference on microelectronic fabrication") },
        { author: 'James D. Plummer', title: 'Silicon VLSI Technology', zh: tx("《矽 VLSI 技術：基礎、實作與模型》史丹佛殿堂教材", "Fundamentals, practice and models of silicon VLSI technology") },
        { author: 'Dieter K. Schroder', title: 'Semiconductor Material and Device Characterization', zh: tx("《半導體材料與元件量測特性分析》檢測百科", "Reference on material and device characterization") }
      ];

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Semiconductor Classic Bibles">
          <g transform="translate(60, 30)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${tx("站在巨人的肩膀上：四大半導體全球公認聖經著作 (Classic Bibles)", "Four Classic Semiconductor References")}</text>
            <g transform="translate(0, 40)">
              ${bibles.map((b, idx) => {
                const y = idx * 75;
                return `
                  <g transform="translate(0, ${y})">
                    <rect x="0" y="0" width="680" height="65" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                    <rect x="15" y="12" width="36" height="40" rx="3" fill="#10b981"/>
                    <text x="33" y="36" text-anchor="middle" fill="#09131b" font-size="14" font-weight="800">#${idx + 1}</text>
                    <text x="65" y="20" fill="#38bdf8" font-size="12" font-weight="750">${svgTextLines(wrap(b.title, 76), 65, 20, 13)}</text>
                    <text x="65" y="45" fill="#cbd5e1" font-size="10.5">${b.zh}</text>
                    <text x="660" y="59" text-anchor="end" fill="#f59e0b" font-size="11" font-weight="700">${b.author}</text>
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
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${tx("4 大聖經巨著", "4 classic references")}</div>
          <div class="eng-obj-metric-note">${tx("半導體物理、製程、量測三足鼎立", "Device physics, fabrication and characterization")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("理論永恆度", "Lasting Foundations")}</div>
          <div class="eng-obj-metric-value">${tx("歷久彌新 50+ 年", "50+ years of foundations")}</div>
          <div class="eng-obj-metric-note">${tx("摩爾定律微縮背後不變的物理定律", "Physical principles behind device scaling")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("建議研讀方式", "Suggested Study Approach")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${tx("本站導覽 + 聖經深入", "Hub overview + textbook depth")}</div>
          <div class="eng-obj-metric-note">${tx("本站作為快速全景地圖，聖經作為微積分深度推導", "Use the hub for an overview and textbooks for mathematical derivations")}</div>
        </div>
      `;

      footerNote = t.app_reading_classics_desc;
    } else {
      // cert 模式 (第一性原理)
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="First Principles Mindset Roadmap">
          <g transform="translate(60, 40)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${tx("半導體工程師的核心第一性原理思維藍圖 (First Principles)", "First-Principles Thinking for Semiconductor Engineers")}</text>

            <g transform="translate(20, 50)">
              <!-- 維度 1 -->
              <g transform="translate(0, 0)">
                <rect x="0" y="0" width="300" height="110" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                <text x="20" y="28" fill="#38bdf8" font-size="12" font-weight="750">${tx("1. 微觀物理熱力學第一性原理", "1. Microscopic Physics and Thermodynamics")}</text>
                <text x="20" y="52" fill="#cbd5e1" font-size="10">${tx("• 能帶量子穿隧、化學反應活化能 (Arrhenius)", "• Band tunneling and Arrhenius activation energy")}</text>
                <text x="20" y="72" fill="#cbd5e1" font-size="10">${tx("• Preston CMP 摩擦磨削動能平衡", "• Preston CMP and mechanical removal")}</text>
                <text x="20" y="92" fill="#94a3b8" font-size="10">${tx("⇒ 任何異常都可以拆解為微觀力熱光電反應", "⇒ Relate excursions to physical mechanisms")}</text>
              </g>

              <!-- 維度 2 -->
              <g transform="translate(340, 0)">
                <rect x="0" y="0" width="300" height="110" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
                <text x="20" y="28" fill="#10b981" font-size="12" font-weight="750">${tx("2. 天文尺度下的統計管制紀律", "2. Statistical Process-Control Discipline")}</text>
                <text x="20" y="52" fill="#cbd5e1" font-size="10">${tx("• 單片 300mm 晶圓含數百億電晶體", "• Tens of billions of transistors on a 300mm wafer")}</text>
                <text x="20" y="72" fill="#cbd5e1" font-size="10">${tx("• Cpk ≥ 1.67 為示例；SPC 規則須指定規則集", "• Example Cpk ≥ 1.67; SPC rule set must be specified")}</text>
                <text x="20" y="92" fill="#94a3b8" font-size="10">${tx("⇒ 不相信運氣，只相信數據與常態分佈", "⇒ Use data and examine distribution assumptions")}</text>
              </g>

              <!-- 維度 3 -->
              <g transform="translate(0, 130)">
                <rect x="0" y="0" width="300" height="110" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
                <text x="20" y="28" fill="#f59e0b" font-size="12" font-weight="750">${tx("3. 跨模組製程協同效應 (DTCO)", "3. Cross-Module Process Interaction (DTCO)")}</text>
                <text x="20" y="52" fill="#cbd5e1" font-size="10">${tx("• 微影解析度受限於蝕刻側壁鈍化", "• Lithography interacts with etch passivation")}</text>
                <text x="20" y="72" fill="#cbd5e1" font-size="10">${tx("• 封裝應力反向影響矽晶片電晶體遷移率", "• Package stress affects transistor mobility")}</text>
                <text x="20" y="92" fill="#94a3b8" font-size="10">${tx("⇒ 絕不能只守著自己的單一站台當井底之蛙", "⇒ Look beyond one process station")}</text>
              </g>

              <!-- 維度 4 -->
              <g transform="translate(340, 130)">
                <rect x="0" y="0" width="300" height="110" rx="6" fill="#0f172a" stroke="#ec4899" stroke-width="1.5"/>
                <text x="20" y="28" fill="#ec4899" font-size="12" font-weight="750">${tx("4. 軟韌體與硬體真實物理邊界", "4. Software, Firmware and Physical Limits")}</text>
                <text x="20" y="52" fill="#cbd5e1" font-size="10">${tx("• DRAM Row Hammer 漏電翻轉真實存在", "• DRAM RowHammer can cause bit flips")}</text>
                <text x="20" y="72" fill="#cbd5e1" font-size="10">${tx("• IR Drop 壓降與 PVT 工藝角決定軟體極限", "• IR drop and PVT corners constrain operation")}</text>
                <text x="20" y="92" fill="#94a3b8" font-size="10">${tx("⇒ 優秀架構師必須穿透抽象層看見矽晶片本體", "⇒ Connect abstractions to physical silicon")}</text>
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
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${tx("4 大思維支柱", "4 pillars of engineering thought")}</div>
          <div class="eng-obj-metric-note">${tx("物理 · 統計 · 跨模組 · 軟硬體貫通", "Physics · Statistics · Modules · Hardware/software")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("工程解決能力", "Problem-Solving Approach")}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${tx("8D 根因分析", "8D Root-Cause Analysis")}</div>
          <div class="eng-obj-metric-note">${tx("永遠追溯物理機理，杜絕盲改與止血掩蓋", "Trace the mechanism; avoid blind changes and symptom masking")}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${tx("終極目標", "Engineering Goal")}</div>
          <div class="eng-obj-metric-value">${tx("全域系統性卓越", "System-Level Excellence")}</div>
          <div class="eng-obj-metric-note">${tx("在極致物理極限中創造人類最強算力", "Develop computing systems within physical limits")}</div>
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
          <div class="eng-obj-tab-group" role="group" aria-label="${tx('工程圖視圖', 'Engineering views')}">
            <button type="button" class="eng-obj-tab ${activeTab === 'tree' ? 'is-active' : ''}" data-tab="tree" aria-pressed="${activeTab === 'tree'}">${t.app_reading_tab_tree}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'classics' ? 'is-active' : ''}" data-tab="classics" aria-pressed="${activeTab === 'classics'}">${t.app_reading_tab_classics}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'cert' ? 'is-active' : ''}" data-tab="cert" aria-pressed="${activeTab === 'cert'}">${t.app_reading_tab_cert}</button>
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
      const selectLevel = () => {
        const level = btn.getAttribute('data-level');
        selectedLevel = parseInt(level, 10);
        update();
        container.querySelector(`[data-level="${level}"]`)?.focus?.();
      };
      bindEngineeringEvent(btn, 'click', selectLevel);
      bindEngineeringEvent(btn, 'keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectLevel(); }
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
