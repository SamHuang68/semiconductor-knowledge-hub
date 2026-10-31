import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderCMOSFlowObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeStep = 1; // 1 to 6

  function update() {
    let stepTitle = '';
    let stepDesc = '';
    let sectionTag = '';

    if (activeStep === 1) {
      stepTitle = t.ch11_step_1;
      stepDesc = lang === 'en' ? "STI schematic: etch the P-type substrate, fill with HDP-CVD SiO₂ and planarize by CMP to isolate active regions. The 300nm depth is a teaching example, not a universal specification." : "STI 示意：在 P 型基板蝕刻溝槽，以 HDP-CVD SiO₂ 充填並經 CMP 平坦化，隔離相鄰活性區。300nm 為教學例值，非通用規格。";
      sectionTag = t.ch11_tab_feol;
    } else if (activeStep === 2) {
      stepTitle = t.ch11_step_2;
      stepDesc = lang === 'en' ? "Twin-well schematic: expose the left PMOS region for phosphorus (P⁺) implantation into the N-well, and the right NMOS region for boron (B⁺) implantation into the P-well; photoresist protects the other regions. This follows diagram positions, not a complete implant recipe." : "雙井區示意：分別開放圖左 PMOS 區注入磷 (P⁺) 形成 N-Well，及圖右 NMOS 區注入硼 (B⁺) 形成 P-Well；其他區域由光阻保護。此說明對齊圖中位置，不代表完整佈植配方。";
      sectionTag = t.ch11_tab_feol;
    } else if (activeStep === 3) {
      stepTitle = t.ch11_step_3;
      stepDesc = lang === 'en' ? "HKMG stack schematic: HfO₂, TiN/TaN work-function metal, a tungsten gate and Si₃N₄ spacers. The 1.5nm thickness and k~25 are teaching examples. This diagram groups structures; the RMG flow in the chapter replaces the gate after high-temperature source/drain steps." : "HKMG 堆疊示意：HfO₂、TiN/TaN 功函數金屬、鎢閘極與 Si₃N₄ 側牆。1.5nm、k~25 為教學例值。本圖依結構分組；正文所述 RMG 流程會在高溫源汲極步驟後置換金屬閘極。";
      sectionTag = t.ch11_tab_feol;
    } else if (activeStep === 4) {
      stepTitle = t.ch11_step_4;
      stepDesc = lang === 'en' ? "Source/drain strain and implant schematic: SiGe for PMOS and Si:C for NMOS illustrate strain engineering with doping. The 60% hole and 50% electron mobility gains are original uncalibrated teaching examples; this figure does not calculate stress or mobility." : "源汲極應變與佈植示意：PMOS 的 SiGe 與 NMOS 的 Si:C 用於應變工程，並搭配摻雜。電洞 60%、電子 50% 的遷移率提升為原未校準教學例值；此圖未計算應力或遷移率。";
      sectionTag = t.ch11_tab_feol;
    } else if (activeStep === 5) {
      stepTitle = t.ch11_step_5;
      stepDesc = lang === 'en' ? "MOL contact schematic: form NiSi at source/drain surfaces, deposit ILD0, etch contacts and fill with CVD tungsten. Materials and sequence illustrate a teaching flow; integration varies by process." : "MOL 接觸示意：源汲極表面形成 NiSi，覆蓋 ILD0 後蝕刻接觸孔並以 CVD 鎢填充。材料與順序為教學例示，實際整合依製程而異。";
      sectionTag = t.ch11_tab_mol;
    } else if (activeStep === 6) {
      stepTitle = t.ch11_step_6;
      stepDesc = lang === 'en' ? "BEOL schematic: form copper lines and vias by dual damascene, separated by low-k dielectric. The 10+ layers and M1 to M10+ range are teaching examples; this figure shows partial wiring, not the full stack or a qualified flow." : "BEOL 互連示意：以雙鑲嵌建立銅線與通孔，並以 Low-k 介電質隔離。10+ 層、M1 至 M10+ 為教學例示；圖只顯示局部互連，不代表完整層數或製程驗證。";
      sectionTag = t.ch11_tab_beol;
    }

    const viewportHtml = `
      <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${lang === 'en' ? `CMOS process cross-section schematic; not to scale` : `CMOS 製程剖面示意；非按比例`}">
        <!-- 頂部步進標示 -->
        <rect x="40" y="15" width="720" height="35" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="60" y="28" fill="#38bdf8" font-size="10" font-weight="750">${sectionTag}</text>
        <text x="60" y="43" fill="#38bdf8" font-size="11.5" font-weight="750">${stepTitle}</text>
        <text x="730" y="28" text-anchor="end" fill="#94a3b8" font-size="11">${lang === 'en' ? `Step ${activeStep} / 6` : `工步 ${activeStep} / 6`}</text>

        <!-- 矽基底本體 (P-Substrate @ 底部) -->
        <g transform="translate(60, 60)">
          <!-- 矽基板 -->
          <rect x="0" y="240" width="680" height="90" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
          <text x="340" y="295" text-anchor="middle" fill="#94a3b8" font-size="12">${lang === 'en' ? `P-type silicon substrate (&lt;100&gt;)` : `P 型矽基底 (&lt;100&gt;)`}</text>

          <!-- 步驟 1+: STI 隔離槽 (中間與兩側) -->
          <rect x="0" y="200" width="80" height="40" fill="#0284c7" opacity="0.7"/>
          <rect x="300" y="200" width="80" height="40" fill="#0284c7" opacity="0.7"/>
          <rect x="600" y="200" width="80" height="40" fill="#0284c7" opacity="0.7"/>
          <text x="340" y="225" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">STI (SiO₂)</text>

          <!-- 步驟 2+: 雙井區 (N-Well 左側 PMOS, P-Well 右側 NMOS) -->
          ${activeStep >= 2 ? `
            <rect x="80" y="190" width="220" height="90" fill="#f59e0b" opacity="0.25" stroke="#f59e0b" stroke-dasharray="2 2"/>
            <text x="190" y="260" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="700">${lang === 'en' ? `N-well (PMOS region)` : `N-Well（PMOS 區域）`}</text>

            <rect x="380" y="190" width="220" height="90" fill="#10b981" opacity="0.25" stroke="#10b981" stroke-dasharray="2 2"/>
            <text x="490" y="260" text-anchor="middle" fill="#34d399" font-size="12" font-weight="700">${lang === 'en' ? `P-well (NMOS region)` : `P-Well（NMOS 區域）`}</text>
          ` : `
            <text x="190" y="225" text-anchor="middle" fill="#64748b" font-size="11">${lang === 'en' ? `Active region 1 (PMOS)` : `活性區 1（PMOS）`}</text>
            <text x="490" y="225" text-anchor="middle" fill="#64748b" font-size="11">${lang === 'en' ? `Active region 2 (NMOS)` : `活性區 2（NMOS）`}</text>
          `}

          <!-- 步驟 3+: HKMG 閘極堆疊 -->
          ${activeStep >= 3 ? `
            <!-- PMOS 閘極 -->
            <g transform="translate(160, 145)">
              <rect x="0" y="50" width="60" height="5" fill="#38bdf8"/>
              <rect x="0" y="15" width="60" height="35" fill="#64748b" stroke="#cbd5e1" stroke-width="1.5"/>
              <!-- Spacers -->
              <rect x="-8" y="15" width="8" height="40" fill="#475569"/>
              <rect x="60" y="15" width="8" height="40" fill="#475569"/>
              <text x="30" y="38" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700" data-ink="light">Gate</text>
            </g>
            <!-- NMOS 閘極 -->
            <g transform="translate(460, 145)">
              <rect x="0" y="50" width="60" height="5" fill="#38bdf8"/>
              <rect x="0" y="15" width="60" height="35" fill="#64748b" stroke="#cbd5e1" stroke-width="1.5"/>
              <!-- Spacers -->
              <rect x="-8" y="15" width="8" height="40" fill="#475569"/>
              <rect x="60" y="15" width="8" height="40" fill="#475569"/>
              <text x="30" y="38" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700" data-ink="light">Gate</text>
            </g>
          ` : ''}

          <!-- 步驟 4+: 源汲極應變磊晶 (SiGe / Si:C) -->
          ${activeStep >= 4 ? `
            <!-- PMOS SiGe S/D -->
            <rect x="90" y="190" width="55" height="15" fill="#e11d48" rx="2"/>
            <rect x="235" y="190" width="55" height="15" fill="#e11d48" rx="2"/>
            <text x="117" y="202" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700" data-ink="light">SiGe S</text>
            <text x="262" y="202" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700" data-ink="light">SiGe D</text>

            <!-- NMOS Si:C S/D -->
            <rect x="390" y="190" width="55" height="15" fill="#059669" rx="2"/>
            <rect x="535" y="190" width="55" height="15" fill="#059669" rx="2"/>
            <text x="417" y="202" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">Si:C S</text>
            <text x="562" y="202" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">Si:C D</text>
          ` : ''}

          <!-- 步驟 5+: MOL 接觸孔與鎢插塞 (W-Plugs) -->
          ${activeStep >= 5 ? `
            <!-- ILD0 介電層 -->
            <rect x="0" y="80" width="680" height="80" fill="#0f172a" opacity="0.5" stroke="#334155" stroke-dasharray="2 2"/>
            <!-- 垂直金屬鎢插塞 (Tungsten Plugs) -->
            ${[117, 190, 262, 417, 490, 562].map(x => `
              <rect x="${x - 5}" y="80" width="10" height="80" fill="#cbd5e1" stroke="#f59e0b" stroke-width="1"/>
            `).join('')}
            <text x="340" y="115" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">${lang === 'en' ? `MOL contacts: W plugs` : `MOL 接觸：鎢插塞`}</text>
          ` : ''}

          <!-- 步驟 6+: BEOL 銅導線 (M1) -->
          ${activeStep >= 6 ? `
            <g transform="translate(0, 20)">
              <rect x="0" y="0" width="680" height="60" fill="#09131b" stroke="#38bdf8" stroke-width="1.5"/>
              <!-- M1 銅導線區塊 -->
              <rect x="100" y="10" width="70" height="40" rx="3" fill="#ea580c" stroke="#f97316" stroke-width="1.5"/>
              <rect x="230" y="10" width="100" height="40" rx="3" fill="#ea580c" stroke="#f97316" stroke-width="1.5"/>
              <rect x="400" y="10" width="120" height="40" rx="3" fill="#ea580c" stroke="#f97316" stroke-width="1.5"/>
              <rect x="550" y="10" width="60" height="40" rx="3" fill="#ea580c" stroke="#f97316" stroke-width="1.5"/>
              <text x="340" y="35" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">${lang === 'en' ? `BEOL M1 / M2 dual-damascene Cu` : `BEOL M1 / M2 雙鑲嵌銅線`}</text>
            </g>
          ` : ''}
        </g>
        <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,85 L 680,85" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="10 6" class="anim-data-flow" opacity="0.65"/><path d="M 160,315 L 640,315" fill="none" stroke="#34d399" stroke-width="1.8" stroke-dasharray="6 6" class="anim-beam" opacity="0.55"/></g>
      </svg>
    `;

    const dashboardHtml = `
      <div class="eng-obj-metric-card">
        <div class="eng-obj-metric-label">${t.ch11_metric_masks}</div>
        <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${lang === 'en' ? `60 ~ 80+ layers` : `60 ~ 80+ 層`}</div>
        <div class="eng-obj-metric-note">${lang === 'en' ? `DUV/EUV mask-count example; process dependent` : `DUV/EUV 光罩數教學例值；依製程而異`}</div>
      </div>
      <div class="eng-obj-metric-card">
        <div class="eng-obj-metric-label">${t.ch11_metric_steps}</div>
        <div class="eng-obj-metric-value">${lang === 'en' ? `1,200 ~ 1,500 steps` : `1,200 ~ 1,500 步`}</div>
        <div class="eng-obj-metric-note">${lang === 'en' ? `Includes films, lithography, etch, implant and CMP; illustrative step count` : `包含薄膜、微影、蝕刻、佈植與 CMP；步數為教學例值`}</div>
      </div>
      <div class="eng-obj-metric-card">
        <div class="eng-obj-metric-label">${t.ch11_metric_cycle}</div>
        <div class="eng-obj-metric-value">${lang === 'en' ? `2.5 ~ 3.5 months` : `2.5 ~ 3.5 個月`}</div>
        <div class="eng-obj-metric-note">${lang === 'en' ? `Illustrative cycle time; depends on flow, capacity and scheduling` : `週期為教學例值，受流程、產能與排程影響`}</div>
      </div>
    `;

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh11Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 11</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh11Title">${t.ch11_title}</h2>
          <p class="eng-obj-subtitle">${t.ch11_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-stepper-bar" style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${[1, 2, 3, 4, 5, 6].map(i => `
              <button type="button" class="eng-obj-tab ${activeStep === i ? 'is-active' : ''}" data-step="${i}">
                ${lang === 'zh' ? `工步 ${i}` : `Step ${i}`}
              </button>
            `).join('')}
            <button type="button" class="eng-obj-btn eng-obj-btn-primary" data-action="next" style="margin-left: auto;">
              ${t.btn_next_step}
            </button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? `Cross-tier CMOS integration overview` : `跨層製程整合概覽`}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'FEOL · MOL · BEOL · BSPDN · 3D' : 'FEOL · MOL · BEOL · BSPDN · 3D'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'STI/HKMG/GAA → COAG/SAC/BPR → Multi-tier Cu → Backside nTSV & 3D WLP' : 'STI/HKMG/GAA → COAG/SAC/BPR → 多層銅線 → 背面 nTSV 與 3D WLP'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? `Thermal-budget and contact-resistivity examples` : `熱預算與接觸電阻教學例示`}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'T_FEOL(1050°C) > T_MOL(500°C) > T_BEOL(400°C)' : 'T_FEOL(1050°C) > T_MOL(500°C) > T_BEOL(400°C)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? `Temperatures and <10⁻⁹ Ω·cm² are illustrative; thermal history and TLM contact resistance are not calculated` : `溫度與 <10⁻⁹ Ω·cm² 為例示；此圖未計算熱歷程或 TLM 接觸電阻`}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? '400°C Ceiling · SAC Short · STI Hump' : '400°C Ceiling · SAC Short · STI Hump'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? `Review thermal history, SAC insulation margins and STI corners; qualify mitigation for each process` : `檢查熱歷程、SAC 絕緣裕度與 STI 轉角；改善措施須依製程驗證`}</div>
          </div>
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${stepDesc}</div>
        </footer>
      </section>
    `, t);

    container.querySelectorAll('[data-step]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activeStep = parseInt(btn.getAttribute('data-step'), 10);
        update();
      });
    });

    const nextBtn = container.querySelector('[data-action="next"]');
    if (nextBtn) {
      bindEngineeringEvent(nextBtn, 'click', () => {
        activeStep = activeStep < 6 ? activeStep + 1 : 1;
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 12. Ch 13 三大記憶體技術微觀立體模型 (DRAM 1T1C, 3D NAND Staircase, HBM 3D)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderCMOSFlowObject as render };
