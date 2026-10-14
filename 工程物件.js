/**
 * 工程物件.js
 * Semiconductor Knowledge Hub — 製程工程物件與微觀機制模型控制器
 * 
 * 包含四大製程核心之高質感幾何向量與微觀物理模型：
 * 1. Ch 04 微影 (Lithography)：曝光機光路透鏡縮放、Rayleigh 物理公式與光阻化學反應模型
 * 2. Ch 05 薄膜沉積 (Thin Films)：PVD 濺鍍 vs CVD 熱反應 vs ALD 原子層自限循環模型
 * 3. Ch 06 蝕刻 (Etch)：ICP 雙頻解耦電漿腔體與非等向性溝槽輪廓模型
 * 4. Ch 12 電晶體演進 (Transistor Evolution)：2D Planar -> 3D FinFET -> 3D GAA Nanosheet 立體等角模型
 * 
 * 特色：
 * - 零外部相依、零中系庫、100% 原生 SVG/DOM/CSS 動畫
 * - 中英雙語無縫支援
 * - 具備即時互動、狀態切換與微觀參數模擬
 * - 遵守 WCAG AA 無障礙標準與我不留名規範
 */

const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// 雙語字典
const TEXTS = {
  zh: {
    badge_prefix: '製程工程物件 · PROCESS OBJECT',
    live_sim: '互動幾何模型 · LIVE SIMULATION',
    btn_next_step: '單步前進 →',
    btn_auto_play: '自動循環 ▶',
    btn_pause: '暫停 ⏸',
    btn_reset: '重設計數 ↺',
    legend_title: '材料與光路標記：',

    // Ch 04 微影
    ch04_title: '曝光機光學縮放光路與光阻微觀反應模型',
    ch04_sub: '探索 ASML 雙載台曝光機 4:1 投影物鏡縮小、Rayleigh 解析度極限公式與光阻光化學反應機制',
    ch04_tab_path: '光學縮放光路 (4:1 Reduction)',
    ch04_tab_pr: '光阻光化學機制 (PR Chemistry)',
    ch04_tab_scan: '步進掃描對準 (Step-and-Scan)',
    ch04_mode_dry: 'DUV 乾式 (193nm Dry)',
    ch04_mode_imm: 'DUV 浸潤式 (ArFi 193nm / 水 n=1.44)',
    ch04_mode_euv: 'EUV 微影 (13.5nm / 0.33 NA)',
    ch04_mode_high_na: 'High-NA EUV (13.5nm / 0.55 NA)',
    ch04_laser_source: '準分子雷射光源',
    ch04_illuminator: '照明光瞳 (Quasar / Annular)',
    ch04_reticle: '光罩載台 (Reticle 4x 圖案)',
    ch04_proj_lens: '投影物鏡組 (4:1 縮小聚焦)',
    ch04_imm_water: '超純水浸潤層 (UPW, n=1.44)',
    ch04_wafer_stage: '晶圓載台與光阻層 (1x 晶圓圖案)',
    ch04_metric_res: 'Rayleigh 解析度極限 R',
    ch04_metric_dof: '焦深範圍 DOF',
    ch04_metric_na: '數值孔徑 NA',
    ch04_metric_scale: '物像縮小比',
    ch04_formula_note: '公式依據 Rayleigh 準則：R = k₁·(λ/NA)，DOF = k₂·(λ/NA²)。浸潤式藉由水折射率 (n=1.44) 將 NA 突破 1.0 極限至 1.35；EUV 則利用極短波長 (13.5nm) 與反射光學在超高真空中曝光。',
    ch04_pr_pos: '正光阻 (Positive Tone: 光照區可溶)',
    ch04_pr_neg: '負光阻 (Negative Tone: 光照區交聯硬化)',
    ch04_pr_car: 'EUV 化學增幅光阻 (CAR / PAG 酸催化)',

    // Ch 05 薄膜
    ch05_title: '薄膜沉積機制對比與 ALD 原子層自限循環模型',
    ch05_sub: '微觀對比 PVD 物理濺鍍、CVD 熱化學氣相沉積及 ALD 原子層四步自限循環在高深寬比深孔中的階梯覆蓋率',
    ch05_tab_pvd: 'PVD 物理濺鍍 (Sputtering)',
    ch05_tab_cvd: 'CVD 化學氣相沉積 (Chemical Vapor)',
    ch05_tab_ald: 'ALD 四步自限循環 (Atomic Layer)',
    ch05_step_1: '步驟 1: 前驅物 A 脈衝吸附 (Pulse A)',
    ch05_step_2: '步驟 2: 惰性氣體吹掃 (Purge A)',
    ch05_step_3: '步驟 3: 前驅物 B 反應物脈衝 (Pulse B)',
    ch05_step_4: '步驟 4: 惰性氣體吹掃副產物 (Purge B)',
    ch05_ald_cycle_count: '已完成循環數：',
    ch05_ald_thickness: '累計薄膜厚度：',
    ch05_ald_conformality: '階梯覆蓋率 (Conformality)：',
    ch05_metric_rate: '沉積速率',
    ch05_metric_coverage: '階梯覆蓋率',
    ch05_metric_temp: '典型加工溫度',
    ch05_metric_uniformity: '原子層級厚度控制',
    ch05_pvd_desc: 'PVD 濺鍍為視線傳播 (Line-of-Sight)，金屬原子被撞擊後筆直飛行，容易在深孔入口形成「懸垂 (Overhang)」阻擋後續填入，孔底嚴重不足，容易形成空洞 (Void)。',
    ch05_cvd_desc: 'CVD 利用前驅氣體擴散與表面熱化學反應，階梯覆蓋率達 65%-85%，沉積速率高，但在超高深寬比 (>15:1) 結構中頂部仍比底部厚。',
    ch05_ald_desc: 'ALD 透過自限性表面化學反應 (Self-Limiting Surface Reaction)，每次循環僅精確沉積 1 個原子單分子層 (~0.1nm/cycle)，實現 100% 完美階梯覆蓋與零空洞！',

    // Ch 06 蝕刻
    ch06_title: '電漿蝕刻反應腔體結構與非等向性溝槽輪廓模型',
    ch06_sub: '解析感應耦合電漿 (ICP) 雙頻電源解耦控制、垂直離子轟擊與側壁鈍化保護膜之協同作用',
    ch06_tab_chamber: '電漿腔體系統 (ICP/CCP Chamber)',
    ch06_tab_profile: '非等向性蝕刻微觀機制 (Anisotropic Etch)',
    ch06_tab_anomalies: '微負載效應與異常 (Etch Anomalies & RIE Lag)',
    ch06_rf_source_label: 'RF Source Power (控制電漿離子密度 / Flux):',
    ch06_rf_bias_label: 'RF Bias Power (控制自偏壓與離子轟擊能量 / Energy):',
    ch06_showerhead: '氣體噴淋頭 (Showerhead Gas Inlet: CF₄, Cl₂, HBr, Ar)',
    ch06_source_coil: 'ICP 高頻感應線圈 (13.56 MHz: 激發高密度電漿)',
    ch06_plasma_glow: '高密度發光電漿區 (離子 + 自由基)',
    ch06_sheath: '電漿鞘層 (暗區電場加速區)',
    ch06_esc: '靜電吸盤 (ESC) + 背面氦氣冷卻 (Backside He Cooling)',
    ch06_bias_gen: '低頻 RF 偏壓電源 (2 MHz: 產生負向自偏壓 -Vdc)',
    ch06_profile_ideal: '理想垂直非等向性輪廓 (90°)',
    ch06_profile_undercut: '側壁掏空底切 (Undercutting: 鈍化不足)',
    ch06_profile_bowing: '側壁鼓出凹陷 (Bowing: 離子散射)',
    ch06_profile_lag: 'RIE 延遲 / 微負載效應 (窄孔蝕刻速度慢)',
    ch06_etch_footer: 'ICP 的關鍵突破在於將電漿密度 (Source) 與離子轟擊動能 (Bias) 徹底解耦：上部線圈產生大量反應離子，下部電極垂直加速轟擊，搭配側壁鈍化層保護，精準刻劃奈米深槽。',

    // Ch 12 電晶體演進
    ch12_title: '電晶體立體架構演進等角模型 (Planar → FinFET → GAA Nanosheet)',
    ch12_sub: '探索從 2D 平面 MOSFET 突破短通道效應瓶頸，邁向 3D FinFET 三面包覆與 2nm GAA 全環繞奈米片的立體幾何演進',
    ch12_tab_planar: '2D 平面電晶體 (Planar MOSFET, 28nm ~ 20nm)',
    ch12_tab_finfet: '3D 鰭式電晶體 (3D FinFET, 16nm ~ 3nm)',
    ch12_tab_gaa: '3D 環繞式閘極奈米片 (GAA Nanosheet, 2nm ~ A16)',
    ch12_gate_wrap: '閘極靜電包覆面數',
    ch12_ss_metric: '次臨界擺幅 (Subthreshold Swing SS)',
    ch12_drive_curr: '通道驅動電流能力 (Ion)',
    ch12_node_span: '主流應用製程節點',
    ch12_planar_desc: 'Planar MOSFET 閘極僅覆蓋二維通道頂部 (單面控制)。通道微縮至 20nm 時，汲極電場穿透引發嚴重 DIBL (汲極引致能障降低) 與次臨界漏電，物理微縮面臨極限。',
    ch12_finfet_desc: 'FinFET 將矽通道立體「豎起」成鰭片，金屬閘極三面包覆 (Tri-Gate)，等效通道寬度 Weff = 2·Hfin + Wfin 大幅增加，通道靜電控制力倍增，漏電降低 10 倍以上。',
    ch12_gaa_desc: 'GAA Nanosheet 將垂直鰭片改為 3-4 層水平超薄矽奈米片，閘極 360° 全方位環繞穿插四周，次臨界擺幅逼近理論極限 (63 mV/dec)，搭配背面供電網路 (BSPDN) 釋放正面互連瓶頸！'
  },
  en: {
    badge_prefix: 'PROCESS OBJECT · ENGINEERING MODEL',
    live_sim: 'LIVE SIMULATION & DYNAMICS',
    btn_next_step: 'Next Step →',
    btn_auto_play: 'Auto Cycle ▶',
    btn_pause: 'Pause ⏸',
    btn_reset: 'Reset ↺',
    legend_title: 'Materials & Optical Key:',

    // Ch 04 Lithography
    ch04_title: 'Scanner Optical Path & Photoresist Photochemistry Model',
    ch04_sub: 'Explore 4:1 projection lens reduction, Rayleigh resolution limit formulas, and photoresist chemical mechanisms',
    ch04_tab_path: 'Optical Path (4:1 Reduction)',
    ch04_tab_pr: 'PR Photochemistry Mechanism',
    ch04_tab_scan: 'Step-and-Scan Slit Motion',
    ch04_mode_dry: 'DUV Dry (193nm Dry)',
    ch04_mode_imm: 'DUV Immersion (ArFi 193nm / Water n=1.44)',
    ch04_mode_euv: 'EUV Lithography (13.5nm / 0.33 NA)',
    ch04_mode_high_na: 'High-NA EUV (13.5nm / 0.55 NA)',
    ch04_laser_source: 'Excimer Laser / Plasma Source',
    ch04_illuminator: 'Illuminator Pupil (Quasar / Annular)',
    ch04_reticle: 'Reticle Stage (4x Mask Pattern)',
    ch04_proj_lens: 'Projection Optics Column (4:1 Reduction)',
    ch04_imm_water: 'Ultrapure Water Immersion Layer (n=1.44)',
    ch04_wafer_stage: 'Wafer Stage & Photoresist (1x Printed Pattern)',
    ch04_metric_res: 'Rayleigh Resolution Limit R',
    ch04_metric_dof: 'Depth of Focus DOF',
    ch04_metric_na: 'Numerical Aperture NA',
    ch04_metric_scale: 'Optical Demagnification',
    ch04_formula_note: 'Physics based on Rayleigh criteria: R = k₁·(λ/NA), DOF = k₂·(λ/NA²). Immersion water (n=1.44) breaks the 1.0 NA barrier up to 1.35; EUV exploits extremely short 13.5nm wavelength with reflective Bragg mirrors under high vacuum.',
    ch04_pr_pos: 'Positive Tone (Exposed area dissolves in TMAH)',
    ch04_pr_neg: 'Negative Tone (Exposed area cross-links & hardens)',
    ch04_pr_car: 'EUV Chemically Amplified Resist (CAR / PAG Acid Catalysis)',

    // Ch 05 Thin Films
    ch05_title: 'Thin Film Deposition Mechanisms & ALD Self-Limiting Model',
    ch05_sub: 'Compare step coverage across PVD physical sputtering, CVD thermal reaction, and 4-step ALD self-limiting cycles in high-aspect-ratio vias',
    ch05_tab_pvd: 'PVD Sputtering (Physical Vapor)',
    ch05_tab_cvd: 'CVD Chemical Vapor Deposition',
    ch05_tab_ald: 'ALD 4-Step Self-Limiting Cycle',
    ch05_step_1: 'Step 1: Precursor A Pulse Chemisorption',
    ch05_step_2: 'Step 2: Inert Gas Purge A (N₂/Ar)',
    ch05_step_3: 'Step 3: Precursor B Reactant Pulse (H₂O)',
    ch05_step_4: 'Step 4: Inert Gas Purge Byproducts (N₂)',
    ch05_ald_cycle_count: 'Completed Cycles:',
    ch05_ald_thickness: 'Accumulated Thickness:',
    ch05_ald_conformality: 'Step Coverage (Conformality):',
    ch05_metric_rate: 'Deposition Rate',
    ch05_metric_coverage: 'Step Coverage',
    ch05_metric_temp: 'Typical Process Temp',
    ch05_metric_uniformity: 'Atomic Thickness Control',
    ch05_pvd_desc: 'PVD sputtering is line-of-sight: knocked metal atoms travel straight, causing rapid overhang at trench mouth, starving lower sidewalls and bottom, leading to keyholes/voids.',
    ch05_cvd_desc: 'CVD utilizes precursor gas diffusion and thermal surface reactions, providing 65%-85% step coverage. However, in very high aspect ratios (>15:1), openings remain thicker than bottoms.',
    ch05_ald_desc: 'ALD uses self-limiting surface chemical reactions: each cycle strictly deposits a single atomic monolayer (~0.1nm/cycle), achieving 100% perfect conformality and zero voids.',

    // Ch 06 Etch
    ch06_title: 'Plasma Etch Reactor Architecture & Anisotropic Profile Model',
    ch06_sub: 'Explore dual-frequency ICP decoupling, vertical ion bombardment, and sidewall passivation polymer synergy',
    ch06_tab_chamber: 'Plasma Chamber (ICP/CCP Architecture)',
    ch06_tab_profile: 'Anisotropic Microscopic Mechanism',
    ch06_tab_anomalies: 'Etch Anomalies & RIE Lag',
    ch06_rf_source_label: 'RF Source Power (Controls Plasma Density / Radical Flux):',
    ch06_rf_bias_label: 'RF Bias Power (Controls Self-Bias & Ion Bombardment Energy):',
    ch06_showerhead: 'Showerhead Gas Inlet (CF₄, Cl₂, HBr, Ar)',
    ch06_source_coil: 'ICP RF Source Coil (13.56 MHz: Generates High-Density Plasma)',
    ch06_plasma_glow: 'High-Density Plasma Glow (Ions & Radicals)',
    ch06_sheath: 'Plasma Sheath (Dark space acceleration zone)',
    ch06_esc: 'Electrostatic Chuck (ESC) + Backside Helium Cooling',
    ch06_bias_gen: 'Low-Frequency RF Bias Generator (2 MHz: Generates -Vdc)',
    ch06_profile_ideal: 'Ideal Vertical Anisotropic Profile (90°)',
    ch06_profile_undercut: 'Sidewall Undercutting (Insufficient passivation)',
    ch06_profile_bowing: 'Sidewall Bowing (Ion scattering from mask)',
    ch06_profile_lag: 'RIE Lag / ARDE (Narrow holes etch slower)',
    ch06_etch_footer: 'The key breakthrough of ICP is decoupling plasma density (Source) from ion bombardment kinetic energy (Bias): top coil generates dense reactive ions while bottom chuck accelerates them vertically with sidewall passivation.',

    // Ch 12 Transistor Evolution
    ch12_title: 'Transistor Architecture Evolution Isometric 3D Model',
    ch12_sub: 'Explore the structural evolution overcoming short-channel limits from 2D Planar to 3D FinFET Tri-Gate and 2nm Gate-All-Around Nanosheet',
    ch12_tab_planar: '2D Planar MOSFET (28nm ~ 20nm)',
    ch12_tab_finfet: '3D FinFET (16nm ~ 3nm)',
    ch12_tab_gaa: '3D GAA Nanosheet (2nm ~ A16)',
    ch12_gate_wrap: 'Gate Electrostatic Wrapping',
    ch12_ss_metric: 'Subthreshold Swing (SS)',
    ch12_drive_curr: 'Channel Drive Current (Ion)',
    ch12_node_span: 'Leading Production Nodes',
    ch12_planar_desc: 'Planar MOSFET gates only control the top 2D surface of the channel. Scaling below 20nm leads to catastrophic DIBL and punch-through leakage, halting planar scaling.',
    ch12_finfet_desc: 'FinFET stands the silicon channel up as a 3D fin, with the metal gate wrapping over 3 sides (Tri-Gate). Weff = 2·Hfin + Wfin triples drive current while slashing leakage by >10x.',
    ch12_gaa_desc: 'GAA Nanosheet divides the fin into 3-4 vertically stacked horizontal nanosheets, wrapped 360° on all 4 sides by the gate. SS approaches 63 mV/dec, paired with Backside Power Delivery (BSPDN).'
  }
};

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 1. Ch 04 微影光路與光阻反應模型 (Lithography Optical & PR Model)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderLithoOpticalObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'path'; // 'path' | 'pr' | 'scan'
  let activeOpticalMode = 'imm'; // 'dry' | 'imm' | 'euv' | 'high_na'
  let activePRMode = 'pos'; // 'pos' | 'neg' | 'car'

  // 光學參數設定
  const OPTICAL_PRESETS = {
    dry: { lambda: 193, na: 0.93, k1: 0.35, k2: 0.50, r: '72.6 nm', dof: '111.5 nm', scale: '4 : 1' },
    imm: { lambda: 193, na: 1.35, k1: 0.28, k2: 0.50, r: '40.0 nm', dof: '52.9 nm', scale: '4 : 1' },
    euv: { lambda: 13.5, na: 0.33, k1: 0.32, k2: 0.50, r: '13.1 nm', dof: '62.0 nm', scale: '4 : 1' },
    high_na: { lambda: 13.5, na: 0.55, k1: 0.32, k2: 0.50, r: '7.9 nm', dof: '22.3 nm', scale: '8 : 4 (Anamorphic)' }
  };

  function update() {
    const cur = OPTICAL_PRESETS[activeOpticalMode];

    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'path') {
      controlsHtml = `
        <div class="eng-obj-tab-group" role="tablist">
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'dry' ? 'is-active' : ''}" data-mode="dry">${t.ch04_mode_dry}</button>
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'imm' ? 'is-active' : ''}" data-mode="imm">${t.ch04_mode_imm}</button>
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'euv' ? 'is-active' : ''}" data-mode="euv">${t.ch04_mode_euv}</button>
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'high_na' ? 'is-active' : ''}" data-mode="high_na">${t.ch04_mode_high_na}</button>
        </div>
      `;

      const isEUV = activeOpticalMode === 'euv' || activeOpticalMode === 'high_na';
      const isImm = activeOpticalMode === 'imm';
      const beamColor = isEUV ? '#38bdf8' : '#71ece3';
      const beamCore = isEUV ? '#e0f2fe' : '#ccfbf1';

      viewportHtml = `
        <svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scanner Optical Path 4x Reduction">
          <defs>
            <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${beamColor}" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="${beamColor}" stop-opacity="0.25"/>
            </linearGradient>
            <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#0284c7" stop-opacity="0.7"/>
              <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0.7"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- 背景格線標註 -->
          <g stroke="#1e293b" stroke-width="0.75" stroke-dasharray="3 3">
            <line x1="60" y1="50" x2="740" y2="50"/>
            <line x1="60" y1="130" x2="740" y2="130"/>
            <line x1="60" y1="210" x2="740" y2="210"/>
            <line x1="60" y1="350" x2="740" y2="350"/>
            <line x1="400" y1="30" x2="400" y2="430" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="6 4"/>
          </g>

          <!-- 1. 光源部 (Laser/EUV Source) -->
          <rect x="330" y="24" width="140" height="36" rx="4" fill="#0f172a" stroke="${beamColor}" stroke-width="1.5"/>
          <text x="400" y="47" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700" font-family="sans-serif">${t.ch04_laser_source} (${cur.lambda} nm)</text>
          
          <!-- 出射光束錐 -->
          <polygon points="370,60 430,60 480,110 320,110" fill="url(#beamGrad)" opacity="0.6"/>
          <line x1="400" y1="60" x2="400" y2="110" stroke="${beamCore}" stroke-width="2" class="anim-beam"/>

          <!-- 2. 照明光瞳 (Illuminator) -->
          <rect x="310" y="110" width="180" height="12" rx="2" fill="#334155" stroke="#64748b"/>
          <text x="510" y="120" fill="#94a3b8" font-size="11" font-family="sans-serif">${t.ch04_illuminator}</text>

          <!-- 光罩入射光 -->
          <polygon points="320,122 480,122 470,150 330,150" fill="url(#beamGrad)" opacity="0.7"/>

          <!-- 3. 光罩載台 (Reticle Stage, 4x Scale) -->
          <rect x="250" y="150" width="300" height="16" rx="2" fill="#1e293b" stroke="#e2e8f0" stroke-width="1.2"/>
          <!-- 光罩鉻層微圖形 (4x 圖元) -->
          <g fill="#f59e0b">
            <rect x="340" y="152" width="20" height="12"/>
            <rect x="380" y="152" width="20" height="12"/>
            <rect x="420" y="152" width="20" height="12"/>
          </g>
          <text x="570" y="162" fill="#f59e0b" font-size="12" font-weight="700" font-family="sans-serif">${t.ch04_reticle} [4x: 112nm Pitch]</text>

          <!-- 4. 4:1 縮小投影物鏡系統 (Projection Lens Column) -->
          <!-- 投影光錐 4:1 收束折射 -->
          <polygon points="330,166 470,166 450,230 350,230" fill="url(#beamGrad)" opacity="0.75"/>
          
          <!-- 雙凸透鏡 1 -->
          <path d="M 320,230 Q 400,215 480,230 Q 400,245 320,230 Z" fill="url(#lensGrad)" stroke="#38bdf8" stroke-width="1"/>
          
          <!-- 光闌 Aperture Stop (NA 控制器) -->
          <rect x="310" y="255" width="60" height="8" fill="#475569"/>
          <rect x="430" y="255" width="60" height="8" fill="#475569"/>
          <text x="510" y="262" fill="#38bdf8" font-size="11" font-family="sans-serif">NA Aperture Stop (${cur.na})</text>

          <!-- 雙凸透鏡 2 與收斂光錐 -->
          <path d="M 340,280 Q 400,268 460,280 Q 400,292 340,280 Z" fill="url(#lensGrad)" stroke="#38bdf8" stroke-width="1"/>
          <polygon points="360,290 440,290 405,372 395,372" fill="url(#beamGrad)" opacity="0.9" filter="url(#glow)"/>
          
          <!-- 投影透鏡組說明 -->
          <text x="180" y="245" text-anchor="end" fill="#94a3b8" font-size="11.5" font-family="sans-serif">${t.ch04_proj_lens}</text>
          <path d="M 190,242 L 315,242" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>

          <!-- 5. 浸潤式水層 (Immersion Layer) 若為 ArFi -->
          ${isImm ? `
            <rect x="320" y="360" width="160" height="14" rx="2" fill="rgba(56, 189, 248, 0.35)" stroke="#38bdf8" stroke-width="1"/>
            <text x="500" y="371" fill="#71ece3" font-size="11.5" font-weight="600" font-family="sans-serif">${t.ch04_imm_water}</text>
          ` : ''}

          <!-- 6. 晶圓載台與 1x 光阻成像層 (Wafer Stage) -->
          <rect x="260" y="376" width="280" height="32" rx="3" fill="#1e293b" stroke="#0284c7" stroke-width="1.5"/>
          <rect x="280" y="376" width="240" height="6" fill="#f59e0b"/>
          <!-- 縮小成像圖案 1x (28nm Pitch) -->
          <g fill="#38bdf8">
            <rect x="390" y="376" width="5" height="6"/>
            <rect x="400" y="376" width="5" height="6"/>
            <rect x="410" y="376" width="5" height="6"/>
          </g>
          <text x="400" y="399" text-anchor="middle" fill="#f8fafc" font-size="12" font-weight="700" font-family="sans-serif">${t.ch04_wafer_stage} [1x: 28nm Pitch]</text>
          <text x="560" y="392" fill="#38bdf8" font-size="11.5" font-weight="700" font-family="sans-serif">Focus DOF: ±${cur.dof}</text>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_res}</div>
          <div class="eng-obj-metric-value">${cur.r}</div>
          <div class="eng-obj-metric-note">R = k₁·(λ/NA) · k₁=${cur.k1}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_dof}</div>
          <div class="eng-obj-metric-value">${cur.dof}</div>
          <div class="eng-obj-metric-note">DOF = k₂·(λ/NA²) · k₂=${cur.k2}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_na}</div>
          <div class="eng-obj-metric-value">${cur.na}</div>
          <div class="eng-obj-metric-note">${isImm ? 'Immersion Water (n=1.44)' : (isEUV ? 'Mo/Si Reflective Optics' : 'Standard Dry Air Lens')}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_scale}</div>
          <div class="eng-obj-metric-value">${cur.scale}</div>
          <div class="eng-obj-metric-note">Reticle to Wafer Magnification</div>
        </div>
      `;

      footerNote = t.ch04_formula_note;
    } else if (activeTab === 'pr') {
      controlsHtml = `
        <div class="eng-obj-tab-group" role="tablist">
          <button type="button" class="eng-obj-tab ${activePRMode === 'pos' ? 'is-active' : ''}" data-prmode="pos">${t.ch04_pr_pos}</button>
          <button type="button" class="eng-obj-tab ${activePRMode === 'neg' ? 'is-active' : ''}" data-prmode="neg">${t.ch04_pr_neg}</button>
          <button type="button" class="eng-obj-tab ${activePRMode === 'car' ? 'is-active' : ''}" data-prmode="car">${t.ch04_pr_car}</button>
        </div>
      `;

      const isPos = activePRMode === 'pos';
      const isCar = activePRMode === 'car';

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Photoresist Mechanism">
          <!-- 步驟 1: 曝光照光 -->
          <g transform="translate(40, 40)">
            <rect x="0" y="0" width="210" height="300" rx="6" fill="#131e2b" stroke="#334155"/>
            <text x="105" y="28" text-anchor="middle" fill="#38bdf8" font-size="13.5" font-weight="700">1. 曝光照射 (Exposure)</text>
            <!-- 光罩遮擋 -->
            <rect x="15" y="55" width="60" height="8" fill="#e2e8f0"/>
            <rect x="135" y="55" width="60" height="8" fill="#e2e8f0"/>
            <text x="105" y="50" text-anchor="middle" fill="#94a3b8" font-size="10.5">光罩開口 (Mask)</text>
            <!-- 光束線束 -->
            <g stroke="#71ece3" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.85">
              <line x1="85" y1="65" x2="85" y2="150"/>
              <line x1="105" y1="65" x2="105" y2="150"/>
              <line x1="125" y1="65" x2="125" y2="150"/>
            </g>
            <!-- 光阻層 -->
            <rect x="15" y="150" width="180" height="60" fill="#f59e0b" opacity="0.85"/>
            <!-- 照光感光區 -->
            <rect x="75" y="150" width="60" height="60" fill="${isPos ? '#38bdf8' : '#059669'}" opacity="0.9"/>
            <text x="105" y="185" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${isCar ? 'PAG 產酸 H⁺' : (isPos ? '光解去保護' : '交聯聚合')}</text>
            <!-- 矽基板 -->
            <rect x="15" y="210" width="180" height="40" fill="#334155"/>
            <text x="105" y="235" text-anchor="middle" fill="#94a3b8" font-size="11">矽基板 (Si Substrate)</text>
          </g>

          <!-- 步驟 2: 後烘烤 (PEB) -->
          <g transform="translate(295, 40)">
            <rect x="0" y="0" width="210" height="300" rx="6" fill="#131e2b" stroke="#334155"/>
            <text x="105" y="28" text-anchor="middle" fill="#f59e0b" font-size="13.5" font-weight="700">2. 後烘烤 (PEB ~110°C)</text>
            <text x="105" y="60" text-anchor="middle" fill="#cbd5e1" font-size="11">${isCar ? '酸催化連鎖放大反應' : '熱致化學均勻擴散'}</text>
            <!-- 熱波指示 -->
            <path d="M 60,95 Q 75,80 90,95 T 120,95 T 150,95" fill="none" stroke="#f59e0b" stroke-width="2"/>
            <!-- 光阻層與擴散 -->
            <rect x="15" y="150" width="180" height="60" fill="#f59e0b" opacity="0.85"/>
            <rect x="73" y="150" width="64" height="60" fill="${isPos ? '#0284c7' : '#047857'}" opacity="0.95"/>
            <text x="105" y="185" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${isCar ? '1 個 H⁺ 催化 100+ 鍵' : (isPos ? '溶解度倍增區' : '耐溶交聯區')}</text>
            <rect x="15" y="210" width="180" height="40" fill="#334155"/>
            <text x="105" y="235" text-anchor="middle" fill="#94a3b8" font-size="11">矽基板 (Si Substrate)</text>
          </g>

          <!-- 步驟 3: 顯影洗淨 (Development) -->
          <g transform="translate(550, 40)">
            <rect x="0" y="0" width="210" height="300" rx="6" fill="#131e2b" stroke="#334155"/>
            <text x="105" y="28" text-anchor="middle" fill="#10b981" font-size="13.5" font-weight="700">3. 顯影洗淨 (TMAH 2.38%)</text>
            <text x="105" y="60" text-anchor="middle" fill="#cbd5e1" font-size="11">${isPos ? '光照區溶解 · 留下開口' : '未照光區溶解 · 留下立柱'}</text>
            
            <!-- 顯影後光阻殘留圖形 -->
            ${isPos ? `
              <!-- 正光阻：中間照光區被溶掉形成開口 -->
              <rect x="15" y="150" width="60" height="60" fill="#f59e0b"/>
              <rect x="135" y="150" width="60" height="60" fill="#f59e0b"/>
              <text x="105" y="185" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="700">開口 (Opening)</text>
            ` : `
              <!-- 負光阻：中間照光區留存，兩側溶掉 -->
              <rect x="75" y="150" width="60" height="60" fill="#047857"/>
              <text x="105" y="185" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">立柱 (Island)</text>
            `}
            <rect x="15" y="210" width="180" height="40" fill="#334155"/>
            <text x="105" y="235" text-anchor="middle" fill="#94a3b8" font-size="11">矽基板 (Si Substrate)</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">顯影液規格 (Developer)</div>
          <div class="eng-obj-metric-value">2.38% TMAH</div>
          <div class="eng-obj-metric-note">氫氧化四甲基銨強鹼水溶液</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">對比度 Contrast (γ)</div>
          <div class="eng-obj-metric-value">&gt; 12.0</div>
          <div class="eng-obj-metric-note">高陡直度側壁輪廓必備指標</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">線邊粗糙度 (LER / LWR)</div>
          <div class="eng-obj-metric-value">&lt; 1.2 nm</div>
          <div class="eng-obj-metric-note">受酸擴散長度與光子散粒噪聲影響</div>
        </div>
      `;

      footerNote = '化學增幅型抗蝕劑 (CAR) 透過微量 PAG 光酸產生劑引發後烘烤連鎖脫保護反應，將光量子靈敏度提升數百倍，是 7nm 以下極紫外光 (EUV) 微影克服光源功率不足的關鍵技術。';
    } else {
      // Step-and-Scan Slit
      controlsHtml = '';
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Step and Scan">
          <!-- 光罩載台掃描運動 (向左 4v) -->
          <g transform="translate(150, 40)">
            <rect x="0" y="0" width="500" height="80" rx="4" fill="#131e2b" stroke="#334155"/>
            <text x="20" y="26" fill="#f59e0b" font-size="13" font-weight="700">光罩台 (Reticle Stage) · 速度: 4v ← 掃描</text>
            <rect x="180" y="38" width="140" height="28" fill="#334155" stroke="#f59e0b" stroke-width="1.5"/>
            <!-- 掃描狹縫 (Exposure Slit) -->
            <rect x="230" y="38" width="40" height="28" fill="#38bdf8" opacity="0.8"/>
            <text x="250" y="56" text-anchor="middle" fill="#09131b" font-size="10.5" font-weight="700">狹縫 Slit</text>
          </g>

          <!-- 光學縮小投影中心箭頭 -->
          <path d="M 400,130 L 400,210" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 4"/>
          <text x="420" y="175" fill="#38bdf8" font-size="12" font-family="sans-serif">4:1 反向同步投影</text>

          <!-- 晶圓載台掃描運動 (向右 v) -->
          <g transform="translate(150, 220)">
            <rect x="0" y="0" width="500" height="90" rx="4" fill="#131e2b" stroke="#0284c7"/>
            <text x="20" y="26" fill="#38bdf8" font-size="13" font-weight="700">晶圓台 (Wafer Stage) · 速度: v → 步進掃描</text>
            <circle cx="250" cy="56" r="30" fill="#1e293b" stroke="#64748b"/>
            <!-- 曝光區域 (Die Exposure Field) -->
            <rect x="235" y="44" width="30" height="24" fill="#38bdf8" opacity="0.8"/>
            <text x="250" y="59" text-anchor="middle" fill="#09131b" font-size="9" font-weight="700">Die 1x</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">掃描視場 (Field Size)</div>
          <div class="eng-obj-metric-value">26 × 33 mm</div>
          <div class="eng-obj-metric-note">單次掃描最大標準曝光面積</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">套準精度 (Overlay Accuracy)</div>
          <div class="eng-obj-metric-value">&lt; 1.5 nm</div>
          <div class="eng-obj-metric-note">雙載台干涉儀即時反饋校正</div>
        </div>
      `;
      footerNote = '步進掃描 (Step-and-Scan) 讓光罩台與晶圓台以 4:1 的精確速度比反向高速動態掃描，僅透過狹窄的光學最佳像差中心狹縫 (Slit) 進行曝光，大幅降低大面積透鏡邊緣畸變。';
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh04Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 04</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh04Title">${t.ch04_title}</h2>
          <p class="eng-obj-subtitle">${t.ch04_sub}</p>
        </header>
        
        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'path' ? 'is-active' : ''}" data-tab="path">${t.ch04_tab_path}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'pr' ? 'is-active' : ''}" data-tab="pr">${t.ch04_tab_pr}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'scan' ? 'is-active' : ''}" data-tab="scan">${t.ch04_tab_scan}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
    container.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeOpticalMode = btn.getAttribute('data-mode');
        update();
      });
    });
    container.querySelectorAll('[data-prmode]').forEach(btn => {
      btn.addEventListener('click', () => {
        activePRMode = btn.getAttribute('data-prmode');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 2. Ch 05 薄膜沉積機制對比與 ALD 自限模型 (Thin Films & ALD Model)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderDepositionMechanismObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'ald'; // 'pvd' | 'cvd' | 'ald'
  let aldStep = 1; // 1 | 2 | 3 | 4
  let aldCycleCount = 1;
  let isAutoPlaying = false;
  let timerId = null;

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    let stepperBarHtml = '';

    if (activeTab === 'pvd') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PVD Sputtering Mechanism">
          <!-- 上方靶材 (Sputter Target) -->
          <rect x="250" y="30" width="300" height="28" rx="3" fill="#b45309" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="400" y="49" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">金屬靶材 (Sputter Target: Cu / Ti)</text>

          <!-- 氬離子轟擊與濺射原子粒子 (Line of sight) -->
          <g opacity="0.85">
            <!-- Ar+ 離子向上轟擊 -->
            <path d="M 320,110 L 340,65 M 480,110 L 460,65" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 3"/>
            <text x="310" y="125" fill="#38bdf8" font-size="11">Ar⁺ 離子轟擊</text>
            <!-- 濺射原子向下噴發 (視線直進) -->
            <path d="M 350,60 L 370,220 M 400,60 L 400,220 M 450,60 L 430,220" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" class="anim-ion"/>
          </g>

          <!-- 下方高深寬比深溝槽 (Trench Aspect Ratio 8:1) -->
          <g transform="translate(250, 190)">
            <!-- 矽基底邊框 -->
            <path d="M 20,20 L 100,20 L 100,210 L 200,210 L 200,20 L 280,20 L 280,230 L 20,230 Z" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            
            <!-- PVD 薄膜沉積輪廓 (明顯懸垂 Overhang 與孔底覆蓋不足) -->
            <!-- 表面平坦區：厚 (25px) -->
            <rect x="20" y="5" width="80" height="15" fill="#f59e0b"/>
            <rect x="200" y="5" width="80" height="15" fill="#f59e0b"/>
            
            <!-- 開口處懸垂 (Overhang / Pinch-off) -->
            <path d="M 90,20 Q 120,35 100,75 L 100,20 Z" fill="#d97706"/>
            <path d="M 210,20 Q 180,35 200,75 L 200,20 Z" fill="#d97706"/>
            
            <!-- 側壁中下段極薄 (3-5px) -->
            <rect x="100" y="75" width="4" height="135" fill="#f59e0b" opacity="0.6"/>
            <rect x="196" y="75" width="4" height="135" fill="#f59e0b" opacity="0.6"/>
            
            <!-- 底部沉積較薄 (6px) -->
            <rect x="100" y="204" width="100" height="6" fill="#f59e0b" opacity="0.7"/>

            <!-- 標註懸垂與空洞風險 -->
            <text x="320" y="50" fill="#f59e0b" font-size="12" font-weight="700">開口懸垂 (Overhang)</text>
            <path d="M 310,47 L 215,35" stroke="#f59e0b" stroke-width="1.2"/>
            <text x="150" y="140" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">空洞風險 (Void)</text>
            <text x="320" y="200" fill="#94a3b8" font-size="11.5">孔底覆蓋率僅 15-20%</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_coverage}</div>
          <div class="eng-obj-metric-value" style="color: #ef4444;">15% - 25%</div>
          <div class="eng-obj-metric-note">視線沉積導致深孔底部覆蓋嚴重不足</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_rate}</div>
          <div class="eng-obj-metric-value">0.5 - 2.0 nm/s</div>
          <div class="eng-obj-metric-note">高速金屬導體沉積</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_temp}</div>
          <div class="eng-obj-metric-value">室溫 ~ 150°C</div>
          <div class="eng-obj-metric-note">熱預算負擔低</div>
        </div>
      `;
      footerNote = t.ch05_pvd_desc;
    } else if (activeTab === 'cvd') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CVD Mechanism">
          <!-- 上方氣體前驅物分子雲 -->
          <g transform="translate(250, 30)">
            <rect x="0" y="0" width="300" height="35" rx="3" fill="#0284c7" stroke="#38bdf8"/>
            <text x="150" y="22" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700">前驅反應氣體 (SiH₄ + O₂ / WF₆ + H₂)</text>
          </g>

          <!-- 擴散氣體分子 (擴散進孔內) -->
          <g fill="#38bdf8" opacity="0.75">
            <circle cx="360" cy="100" r="4"/><circle cx="430" cy="110" r="4"/>
            <circle cx="390" cy="140" r="4"/><circle cx="410" cy="170" r="4"/>
            <circle cx="380" cy="220" r="3"/><circle cx="420" cy="260" r="3"/>
          </g>

          <!-- 下方高深寬比深溝槽 (CVD 階梯覆蓋約 75%) -->
          <g transform="translate(250, 170)">
            <path d="M 20,20 L 100,20 L 100,210 L 200,210 L 200,20 L 280,20 L 280,230 L 20,230 Z" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            
            <!-- CVD 薄膜 (較均勻，但頂部仍略厚於底部) -->
            <!-- 表面：厚 16px -->
            <rect x="20" y="4" width="80" height="16" fill="#0284c7"/>
            <rect x="200" y="4" width="80" height="16" fill="#0284c7"/>
            <!-- 側壁：厚 12px (上段) 漸變至 9px (下段) -->
            <path d="M 100,20 L 112,20 L 109,210 L 100,210 Z" fill="#0284c7"/>
            <path d="M 200,20 L 188,20 L 191,210 L 200,210 Z" fill="#0284c7"/>
            <!-- 底部：厚 10px -->
            <rect x="100" y="200" width="100" height="10" fill="#0284c7"/>

            <text x="310" y="80" fill="#38bdf8" font-size="12" font-weight="700">表面反應擴散成膜</text>
            <text x="310" y="110" fill="#94a3b8" font-size="11.5">階梯覆蓋率約 70% - 85%</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_coverage}</div>
          <div class="eng-obj-metric-value" style="color: #0284c7;">70% - 85%</div>
          <div class="eng-obj-metric-note">分子擴散提供良好階梯覆蓋</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_rate}</div>
          <div class="eng-obj-metric-value">10 - 100 nm/min</div>
          <div class="eng-obj-metric-note">介電層與多晶矽主流成膜技術</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_temp}</div>
          <div class="eng-obj-metric-value">350°C ~ 750°C</div>
          <div class="eng-obj-metric-note">需考量元件熱預算 (Thermal Budget)</div>
        </div>
      `;
      footerNote = t.ch05_cvd_desc;
    } else {
      // ALD 4-Step Self-Limiting Cycle
      const thicknessNm = (aldCycleCount * 0.11).toFixed(2);
      const stepTitle = t[`ch05_step_${aldStep}`];

      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ALD 4-Step Cycle">
          <!-- 步驟標題指示 -->
          <rect x="200" y="25" width="400" height="34" rx="4" fill="#0f766e" stroke="#14b8a6"/>
          <text x="400" y="47" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">${stepTitle}</text>

          <!-- 4 步驟進度膠囊 -->
          <g transform="translate(240, 75)">
            <rect x="0" y="0" width="70" height="8" rx="2" fill="${aldStep === 1 ? '#14b8a6' : '#334155'}"/>
            <rect x="80" y="0" width="70" height="8" rx="2" fill="${aldStep === 2 ? '#14b8a6' : '#334155'}"/>
            <rect x="160" y="0" width="70" height="8" rx="2" fill="${aldStep === 3 ? '#14b8a6' : '#334155'}"/>
            <rect x="240" y="0" width="70" height="8" rx="2" fill="${aldStep === 4 ? '#14b8a6' : '#334155'}"/>
          </g>

          <!-- 下方高深寬比深溝槽 (ALD 100% 保形性，等厚度沉積) -->
          <g transform="translate(250, 140)">
            <path d="M 20,20 L 100,20 L 100,230 L 200,230 L 200,20 L 280,20 L 280,250 L 20,250 Z" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            
            <!-- 累計等厚原子層 (100% 完美保形) -->
            <!-- 根據 aldCycleCount 繪製均勻薄層 (每循環增加 3px) -->
            <path d="M 20,${20 - aldCycleCount * 3} L 100,${20 - aldCycleCount * 3} L 100,230 L 200,230 L 200,${20 - aldCycleCount * 3} L 280,${20 - aldCycleCount * 3} L 280,20 L 200,20 L 200,${230 - aldCycleCount * 3} L 100,${230 - aldCycleCount * 3} L 100,20 L 20,20 Z" fill="#14b8a6" opacity="0.9"/>

            <!-- 步驟動態指示微觀球體 -->
            ${aldStep === 1 ? `
              <!-- Pulse A 前驅物分子飽和吸附 -->
              <g fill="#f59e0b">
                <circle cx="60" cy="15" r="4"/><circle cx="85" cy="15" r="4"/><circle cx="215" cy="15" r="4"/><circle cx="240" cy="15" r="4"/>
                <circle cx="104" cy="60" r="4"/><circle cx="104" cy="120" r="4"/><circle cx="104" cy="180" r="4"/>
                <circle cx="196" cy="60" r="4"/><circle cx="196" cy="120" r="4"/><circle cx="196" cy="180" r="4"/>
                <circle cx="130" cy="226" r="4"/><circle cx="170" cy="226" r="4"/>
              </g>
              <text x="310" y="80" fill="#f59e0b" font-size="12" font-weight="700">前驅物 A 自限單分子吸附</text>
              <text x="310" y="105" fill="#94a3b8" font-size="11.5">表面活性位點飽和後反應自動停止</text>
            ` : ''}

            ${aldStep === 2 ? `
              <!-- Purge A 吹掃 -->
              <g stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 3">
                <line x1="150" y1="50" x2="150" y2="200"/>
              </g>
              <text x="310" y="80" fill="#38bdf8" font-size="12" font-weight="700">N₂ 吹除未吸附多餘分子</text>
              <text x="310" y="105" fill="#94a3b8" font-size="11.5">避免前驅物在氣相中提早反應</text>
            ` : ''}

            ${aldStep === 3 ? `
              <!-- Pulse B 反應物形成單原子層 -->
              <g fill="#38bdf8">
                <circle cx="104" cy="80" r="4"/><circle cx="104" cy="140" r="4"/>
                <circle cx="196" cy="80" r="4"/><circle cx="196" cy="140" r="4"/>
                <circle cx="150" cy="226" r="4"/>
              </g>
              <text x="310" y="80" fill="#14b8a6" font-size="12" font-weight="700">前驅物 B 化學鍵結成膜</text>
              <text x="310" y="105" fill="#94a3b8" font-size="11.5">反應生成 Al-O 單一原子層</text>
            ` : ''}

            ${aldStep === 4 ? `
              <!-- Purge B 吹掃副產物 -->
              <text x="310" y="80" fill="#10b981" font-size="12" font-weight="700">吹除反應副產物 (CH₄)</text>
              <text x="310" y="105" fill="#94a3b8" font-size="11.5">恢復表面活性羥基，完成 1 循環！</text>
            ` : ''}

            <text x="150" y="160" text-anchor="middle" fill="#14b8a6" font-size="12" font-weight="700">100% 完美保形階梯覆蓋</text>
          </g>
        </svg>
      `;

      stepperBarHtml = `
        <div class="eng-obj-stepper-bar">
          <div class="eng-obj-stepper-actions">
            <button type="button" class="eng-obj-btn eng-obj-btn-primary" id="aldNextBtn">${t.btn_next_step}</button>
            <button type="button" class="eng-obj-btn" id="aldPlayBtn">${isAutoPlaying ? t.btn_pause : t.btn_auto_play}</button>
            <button type="button" class="eng-obj-btn" id="aldResetBtn">${t.btn_reset}</button>
          </div>
          <div class="eng-obj-stepper-info">
            <span>${t.ch05_ald_cycle_count} <strong>${aldCycleCount}</strong></span>
            <span>${t.ch05_ald_thickness} <strong>${thicknessNm} nm</strong></span>
            <span>${t.ch05_ald_conformality} <strong style="color: var(--semi-teal);">100%</strong></span>
          </div>
        </div>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_coverage}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">100% 完美保形</div>
          <div class="eng-obj-metric-note">側壁、孔底、角落厚度完全等厚</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_uniformity}</div>
          <div class="eng-obj-metric-value">0.11 nm / cycle</div>
          <div class="eng-obj-metric-note">精確單原子分子層成長控制 (GPC)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">主要關鍵應用</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">HKMG 閘極介電層</div>
          <div class="eng-obj-metric-note">3D NAND 高深寬比穿孔、DRAM 電容</div>
        </div>
      `;

      footerNote = t.ch05_ald_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh05Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 05</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh05Title">${t.ch05_title}</h2>
          <p class="eng-obj-subtitle">${t.ch05_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'pvd' ? 'is-active' : ''}" data-tab="pvd">${t.ch05_tab_pvd}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'cvd' ? 'is-active' : ''}" data-tab="cvd">${t.ch05_tab_cvd}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'ald' ? 'is-active' : ''}" data-tab="ald">${t.ch05_tab_ald}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        ${stepperBarHtml}

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (timerId) clearInterval(timerId);
        isAutoPlaying = false;
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    const nextBtn = container.querySelector('#aldNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        aldStep++;
        if (aldStep > 4) {
          aldStep = 1;
          aldCycleCount++;
        }
        update();
      });
    }

    const playBtn = container.querySelector('#aldPlayBtn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        isAutoPlaying = !isAutoPlaying;
        if (isAutoPlaying) {
          timerId = setInterval(() => {
            aldStep++;
            if (aldStep > 4) {
              aldStep = 1;
              aldCycleCount++;
              if (aldCycleCount > 6) aldCycleCount = 1;
            }
            update();
          }, 850);
        } else {
          if (timerId) clearInterval(timerId);
        }
        update();
      });
    }

    const resetBtn = container.querySelector('#aldResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (timerId) clearInterval(timerId);
        isAutoPlaying = false;
        aldStep = 1;
        aldCycleCount = 1;
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 3. Ch 06 電漿蝕刻腔體結構與非等向性輪廓模型 (Plasma Etch & Profile Model)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderPlasmaEtchObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'chamber'; // 'chamber' | 'profile' | 'anomalies'
  let rfSourcePower = 80; // 0 ~ 100
  let rfBiasPower = 60;   // 0 ~ 100

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'chamber') {
      const plasmaBrightness = 0.4 + (rfSourcePower / 100) * 0.55;
      const biasVoltage = Math.round(150 + (rfBiasPower / 100) * 550);
      const ionSpeedY = Math.round(18 + (rfBiasPower / 100) * 14);

      viewportHtml = `
        <svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ICP Plasma Chamber">
          <!-- 腔體外壁 (Chamber Wall) -->
          <rect x="180" y="20" width="440" height="420" rx="8" fill="#09131b" stroke="#334155" stroke-width="2"/>

          <!-- 頂部氣體噴淋板 (Showerhead) -->
          <rect x="240" y="30" width="320" height="20" rx="3" fill="#334155" stroke="#64748b"/>
          <!-- 噴淋小孔與氣體通入 -->
          <g fill="#38bdf8">
            <circle cx="280" cy="40" r="2.5"/><circle cx="320" cy="40" r="2.5"/><circle cx="360" cy="40" r="2.5"/>
            <circle cx="400" cy="40" r="2.5"/><circle cx="440" cy="40" r="2.5"/><circle cx="480" cy="40" r="2.5"/><circle cx="520" cy="40" r="2.5"/>
          </g>
          <text x="400" y="24" text-anchor="middle" fill="#94a3b8" font-size="11">${t.ch06_showerhead}</text>

          <!-- ICP 高頻感應線圈 (13.56 MHz Coil) -->
          <g stroke="#f59e0b" stroke-width="3" fill="none">
            <circle cx="220" cy="110" r="14"/><circle cx="220" cy="150" r="14"/>
            <circle cx="580" cy="110" r="14"/><circle cx="580" cy="150" r="14"/>
          </g>
          <text x="160" y="135" text-anchor="end" fill="#f59e0b" font-size="11.5" font-weight="700">ICP RF Source Coil</text>
          <text x="160" y="150" text-anchor="end" fill="#94a3b8" font-size="10.5">13.56 MHz (密度控制)</text>

          <!-- 高密度電漿輝光區 (Plasma Glow Discharge) -->
          <ellipse cx="400" cy="170" rx="170" ry="85" fill="rgba(113, 236, 227, ${plasmaBrightness})" filter="drop-shadow(0 0 16px rgba(56, 189, 248, 0.7))" class="anim-plasma"/>
          <text x="400" y="165" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700">${t.ch06_plasma_glow}</text>
          <text x="400" y="185" text-anchor="middle" fill="#e0f2fe" font-size="11.5">離子: Ar⁺, CF₃⁺ | 自由基: F*, Cl* (密度: 10¹¹ cm⁻³)</text>

          <!-- 電漿鞘層 (Plasma Sheath - 暗區電壓降) -->
          <rect x="240" y="270" width="320" height="24" fill="rgba(15, 23, 42, 0.6)" stroke="#0284c7" stroke-dasharray="4 3"/>
          <text x="575" y="286" fill="#38bdf8" font-size="11">${t.ch06_sheath} (-Vdc: ${biasVoltage} V)</text>

          <!-- 離子加速垂直箭頭 -->
          <g stroke="#71ece3" stroke-width="${1.5 + (rfBiasPower / 100) * 1.5}" opacity="0.85">
            <line x1="320" y1="260" x2="320" y2="${260 + ionSpeedY}"/>
            <line x1="400" y1="260" x2="400" y2="${260 + ionSpeedY}"/>
            <line x1="480" y1="260" x2="480" y2="${260 + ionSpeedY}"/>
          </g>

          <!-- 300mm 晶圓載台與靜電吸盤 (ESC) -->
          <rect x="250" y="295" width="300" height="8" rx="2" fill="#38bdf8"/>
          <text x="160" y="302" text-anchor="end" fill="#38bdf8" font-size="12" font-weight="700">300mm 晶圓</text>
          
          <rect x="230" y="305" width="340" height="45" rx="3" fill="#1e293b" stroke="#0284c7" stroke-width="1.5"/>
          <text x="400" y="325" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700">${t.ch06_esc}</text>
          <text x="400" y="342" text-anchor="middle" fill="#94a3b8" font-size="11">He 背面氦氣冷卻 (10 Torr, 25°C)</text>

          <!-- 下方 RF 偏壓產生器 (RF Bias Generator) -->
          <rect x="330" y="365" width="140" height="30" rx="3" fill="#0f172a" stroke="#0284c7"/>
          <text x="400" y="384" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="700">RF Bias (2 MHz)</text>
          <path d="M 400,350 L 400,365" stroke="#0284c7" stroke-width="2"/>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">RF Source Power (${rfSourcePower}%)</div>
          <div class="eng-obj-metric-value">${(rfSourcePower * 15).toFixed(0)} W</div>
          <div class="eng-obj-metric-note">直接調控電漿離子通量 (Ion Density)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">自偏壓 Self-Bias (-Vdc)</div>
          <div class="eng-obj-metric-value" style="color: #f59e0b;">-${biasVoltage} V</div>
          <div class="eng-obj-metric-note">垂直加速正離子之轟擊動能</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">RF 雙頻解耦架構</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">獨立解耦</div>
          <div class="eng-obj-metric-note">同時滿足高速蝕刻與高選擇比垂直側壁</div>
        </div>
      `;

      footerNote = t.ch06_etch_footer;
    } else if (activeTab === 'profile') {
      // 非等向性蝕刻微觀機制
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anisotropic Etch Profile">
          <g transform="translate(180, 40)">
            <!-- 矽基底與垂直溝槽 -->
            <path d="M 20,40 L 130,40 L 130,280 L 310,280 L 310,40 L 420,40 L 420,320 L 20,320 Z" fill="#1e293b" stroke="#334155" stroke-width="2"/>

            <!-- 光阻遮罩 (Photoresist Mask) -->
            <rect x="20" y="0" width="110" height="40" fill="#f59e0b" opacity="0.9"/>
            <rect x="310" y="0" width="110" height="40" fill="#f59e0b" opacity="0.9"/>
            <text x="75" y="25" text-anchor="middle" fill="#09131b" font-size="12" font-weight="700">光阻遮罩 (PR)</text>
            <text x="365" y="25" text-anchor="middle" fill="#09131b" font-size="12" font-weight="700">光阻遮罩 (PR)</text>

            <!-- 側壁鈍化聚合物膜 (Passivation Polymer Film, 如 CFx) -->
            <rect x="127" y="40" width="7" height="240" fill="#10b981"/>
            <rect x="306" y="40" width="7" height="240" fill="#10b981"/>
            <text x="145" y="160" fill="#10b981" font-size="11.5" font-weight="700">側壁鈍化層 (CFx)</text>
            <text x="145" y="176" fill="#94a3b8" font-size="10">阻止自由基側向掏空</text>

            <!-- 垂直高能離子轟擊 (打擊底部，打散鍵結) -->
            <g stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arrow)">
              <line x1="200" y1="20" x2="200" y2="265" class="anim-ion"/>
              <line x1="240" y1="20" x2="240" y2="265" class="anim-ion"/>
            </g>
            <text x="220" y="110" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">正離子垂直轟擊 (Ar⁺, CF₃⁺)</text>

            <!-- 自由基中性擴散反應 (F*, Cl*) -->
            <g fill="#e0f2fe" opacity="0.8">
              <circle cx="180" cy="230" r="3"/><circle cx="260" cy="230" r="3"/>
              <circle cx="210" cy="270" r="3"/><circle cx="230" cy="270" r="3"/>
            </g>

            <!-- 底部化學揮發反應揮發出氣體 (SiF4) -->
            <text x="220" y="274" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">化學反應脫附 (SiF₄ ↑)</text>
            
            <!-- 90° 垂直陡直標註 -->
            <path d="M 310,260 L 295,260 L 295,280" stroke="#f59e0b" stroke-width="1.5" fill="none"/>
            <text x="275" y="255" fill="#f59e0b" font-size="12" font-weight="700">89.8° 垂直</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">側壁垂直度 (Profile Angle)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">89.5° ~ 90.0°</div>
          <div class="eng-obj-metric-note">極致非等向性 (Anisotropic) 輪廓</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">矽對光阻選擇比 (Selectivity)</div>
          <div class="eng-obj-metric-value">&gt; 25 : 1</div>
          <div class="eng-obj-metric-note">保護遮罩在長蝕刻時間下不被穿透</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">側壁保護機制</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">碳氟聚合物 (CFx)</div>
          <div class="eng-obj-metric-note">離子只打底部，側壁免於側蝕</div>
        </div>
      `;
      footerNote = '非等向性蝕刻的核心在於「物理離子轟擊打碎底部晶格 + 化學自由基結合揮發 + 側壁鈍化膜保護免於橫向掏空」，三位一體實現深寬比超過 20:1 的筆直奈米溝槽。';
    } else {
      // 異常與微負載效應 (Anomalies & RIE Lag)
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Etch Anomalies">
          <!-- 1. 正常垂直 (Ideal) -->
          <g transform="translate(60, 40)">
            <text x="70" y="20" text-anchor="middle" fill="#10b981" font-size="12" font-weight="700">${t.ch06_profile_ideal}</text>
            <path d="M 10,40 L 45,40 L 45,220 L 95,220 L 95,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
            <rect x="10" y="25" width="35" height="15" fill="#f59e0b"/>
            <rect x="95" y="25" width="35" height="15" fill="#f59e0b"/>
          </g>

          <!-- 2. 底切掏空 (Undercut) -->
          <g transform="translate(240, 40)">
            <text x="70" y="20" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">${t.ch06_profile_undercut}</text>
            <path d="M 10,40 L 45,40 Q 20,110 45,220 L 95,220 Q 120,110 95,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <rect x="10" y="25" width="35" height="15" fill="#f59e0b"/>
            <rect x="95" y="25" width="35" height="15" fill="#f59e0b"/>
          </g>

          <!-- 3. 側壁鼓出 (Bowing) -->
          <g transform="translate(420, 40)">
            <text x="70" y="20" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="700">${t.ch06_profile_bowing}</text>
            <path d="M 10,40 L 45,40 Q 30,100 45,220 L 95,220 Q 110,100 95,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <rect x="10" y="25" width="35" height="15" fill="#f59e0b"/>
            <rect x="95" y="25" width="35" height="15" fill="#f59e0b"/>
          </g>

          <!-- 4. RIE 延遲 (RIE Lag) -->
          <g transform="translate(600, 40)">
            <text x="70" y="20" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">${t.ch06_profile_lag}</text>
            <!-- 寬槽 (深) -->
            <path d="M 10,40 L 30,40 L 30,220 L 70,220 L 70,40 L 85,40 L 85,150 L 105,150 L 105,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="50" y="235" text-anchor="middle" fill="#38bdf8" font-size="10">寬槽深</text>
            <text x="95" y="165" text-anchor="middle" fill="#ef4444" font-size="10">窄孔淺</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">RIE Lag 根本成因</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">Knudsen 分子擴散受限</div>
          <div class="eng-obj-metric-note">窄高深寬比孔徑使中性氣體交換速率驟降</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">終點偵測技術 (EPD)</div>
          <div class="eng-obj-metric-value">OES 光發射光譜</div>
          <div class="eng-obj-metric-note">監控特定反應波長突變精準停止蝕刻</div>
        </div>
      `;
      footerNote = '在同片晶圓上，大面積開口蝕刻速度快、深寬比大的微小穿孔蝕刻速度慢，稱為 RIE 延遲 (RIE Lag)；需仰賴過蝕刻 (Over-Etch) 與終點偵測 (EPD) 確保所有孔洞完全貫穿。';
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh06Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 06</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh06Title">${t.ch06_title}</h2>
          <p class="eng-obj-subtitle">${t.ch06_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'chamber' ? 'is-active' : ''}" data-tab="chamber">${t.ch06_tab_chamber}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'profile' ? 'is-active' : ''}" data-tab="profile">${t.ch06_tab_profile}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'anomalies' ? 'is-active' : ''}" data-tab="anomalies">${t.ch06_tab_anomalies}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 4. Ch 12 電晶體架構演進立體等角模型 (Planar -> FinFET -> GAA Nanosheet)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderTransistor3DObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeGen = 'finfet'; // 'planar' | 'finfet' | 'gaa'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeGen === 'planar') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2D Planar MOSFET 3D Cutaway">
          <g transform="translate(180, 80)">
            <!-- 3D 等角投影基底 (Silicon Substrate Base) -->
            <!-- 頂面 -->
            <polygon points="220,40 380,120 180,220 20,140" fill="#334155" stroke="#475569" stroke-width="1.2"/>
            <!-- 正側面 -->
            <polygon points="20,140 180,220 180,260 20,180" fill="#1e293b" stroke="#334155"/>
            <!-- 右側面 -->
            <polygon points="180,220 380,120 380,160 180,260" fill="#0f172a" stroke="#334155"/>

            <!-- 源極 (Source N+) 與汲極 (Drain N+) -->
            <polygon points="60,120 120,150 90,165 30,135" fill="#f59e0b"/>
            <text x="50" y="145" fill="#09131b" font-size="10.5" font-weight="700">Source (N⁺)</text>

            <polygon points="280,100 340,130 310,145 250,115" fill="#f59e0b"/>
            <text x="310" y="125" fill="#09131b" font-size="10.5" font-weight="700">Drain (N⁺)</text>

            <!-- 2D 通道 (Channel - 僅限表面單一平面薄層) -->
            <polygon points="140,110 240,160 210,175 110,125" fill="#0284c7" opacity="0.85"/>
            <text x="175" y="145" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">2D 表面通道 (單面控制)</text>

            <!-- 閘極氧化層與金屬閘極 (Gate Electrode) -->
            <!-- 閘極立體方塊跨在頂部表面 -->
            <polygon points="175,70 235,100 175,130 115,100" fill="#64748b" stroke="#94a3b8"/>
            <polygon points="115,100 175,130 175,145 115,115" fill="#475569" stroke="#64748b"/>
            <polygon points="175,130 235,100 235,115 175,145" fill="#334155" stroke="#64748b"/>
            <text x="175" y="95" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">Gate 閘極</text>

            <!-- 漏電路徑標註 -->
            <path d="M 100,165 Q 180,210 260,135" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
            <text x="180" y="205" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700">基底短通道穿透漏電 (DIBL Leakage)</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_gate_wrap}</div>
          <div class="eng-obj-metric-value">1 面控制 (Top Single Gate)</div>
          <div class="eng-obj-metric-note">僅覆蓋二維通道頂部表面</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_ss_metric}</div>
          <div class="eng-obj-metric-value" style="color: #ef4444;">85 - 100 mV/dec</div>
          <div class="eng-obj-metric-note">次臨界漏電高，開關關不緊</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_node_span}</div>
          <div class="eng-obj-metric-value">28nm ~ 20nm 以前</div>
          <div class="eng-obj-metric-note">微縮至 20nm 遭遇物理極限</div>
        </div>
      `;
      footerNote = t.ch12_planar_desc;
    } else if (activeGen === 'finfet') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D FinFET Isometric Cutaway">
          <g transform="translate(180, 80)">
            <!-- 3D 矽基底 (Substrate) -->
            <polygon points="220,50 380,130 180,230 20,150" fill="#334155" stroke="#475569" stroke-width="1.2"/>
            <polygon points="20,150 180,230 180,270 20,190" fill="#1e293b" stroke="#334155"/>
            <polygon points="180,230 380,130 380,170 180,270" fill="#0f172a" stroke="#334155"/>

            <!-- 垂直立起的立體矽鰭片 (Vertical Silicon Fin: 高度 45nm, 寬度 6nm) -->
            <polygon points="80,100 320,70 320,150 80,180" fill="#0284c7" opacity="0.6"/>
            <!-- 鰭片頂部與前端 -->
            <polygon points="80,100 120,80 320,70 280,90" fill="#38bdf8"/>
            <polygon points="80,100 80,180 120,160 120,80" fill="#0369a1"/>

            <!-- 閘極立體三面包覆 (Tri-Gate: 跨坐包覆頂面、左側面、右側面) -->
            <!-- 閘極橫跨在鰭片中間 -->
            <polygon points="180,40 240,70 240,170 180,140" fill="#64748b" opacity="0.9" stroke="#94a3b8"/>
            <polygon points="180,40 200,30 260,60 240,70" fill="#94a3b8"/>
            <polygon points="240,70 260,60 260,160 240,170" fill="#475569"/>

            <!-- 標註立體三面包覆 -->
            <text x="210" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">Tri-Gate (三面包覆閘極)</text>
            <path d="M 210,32 L 210,65" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2 2"/>

            <!-- 源極與汲極磊晶塊 (Raised Epitaxial S/D) -->
            <polygon points="90,110 130,90 140,140 100,160" fill="#f59e0b"/>
            <text x="75" y="165" fill="#f59e0b" font-size="11" font-weight="700">Source Fin</text>

            <polygon points="270,75 310,55 320,105 280,125" fill="#f59e0b"/>
            <text x="325" y="70" fill="#f59e0b" font-size="11" font-weight="700">Drain Fin</text>

            <!-- 標註等效通道寬度 Weff = 2*Hfin + Wfin -->
            <text x="200" y="210" text-anchor="middle" fill="#71ece3" font-size="12" font-weight="700">Weff = 2·H_fin + W_fin (大驅動電流 / 漏電驟降)</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_gate_wrap}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">3 面立體包覆 (Tri-Gate)</div>
          <div class="eng-obj-metric-note">頂部 + 兩側鰭片垂直立體控制</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_ss_metric}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">68 - 72 mV/dec</div>
          <div class="eng-obj-metric-note">靜電抑制力極佳，漏電流大幅下降 10 倍</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_node_span}</div>
          <div class="eng-obj-metric-value">16nm ~ 3nm 世代</div>
          <div class="eng-obj-metric-note">台積電 / Intel / 三星黃金十年主力架構</div>
        </div>
      `;
      footerNote = t.ch12_finfet_desc;
    } else {
      // 3D GAA Nanosheet
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D GAA Nanosheet Isometric Cutaway">
          <g transform="translate(180, 80)">
            <!-- 3D 矽基底 (Substrate) -->
            <polygon points="220,50 380,130 180,230 20,150" fill="#334155" stroke="#475569" stroke-width="1.2"/>
            <polygon points="20,150 180,230 180,270 20,190" fill="#1e293b" stroke="#334155"/>
            <polygon points="180,230 380,130 380,170 180,270" fill="#0f172a" stroke="#334155"/>

            <!-- 垂直堆疊的 3 層超薄水平奈米片通道 (Stacked Nanosheets: 厚 5nm, 寬 30nm) -->
            <!-- 奈米片 3 (頂層) -->
            <polygon points="90,70 310,40 330,50 110,80" fill="#38bdf8"/>
            <!-- 奈米片 2 (中層) -->
            <polygon points="90,95 310,65 330,75 110,105" fill="#38bdf8"/>
            <!-- 奈米片 1 (底層) -->
            <polygon points="90,120 310,90 330,100 110,130" fill="#38bdf8"/>

            <!-- 閘極金屬 360° 全方位穿插環繞包覆 (Gate-All-Around) -->
            <!-- 環繞每片奈米片四周 -->
            <path d="M 180,30 L 240,60 L 240,160 L 180,130 Z" fill="#64748b" opacity="0.8" stroke="#38bdf8" stroke-width="1.2"/>
            <!-- 穿插在奈米片間隙中的閘極金屬 -->
            <rect x="195" y="75" width="30" height="8" fill="#10b981" opacity="0.9"/>
            <rect x="195" y="100" width="30" height="8" fill="#10b981" opacity="0.9"/>

            <text x="210" y="20" text-anchor="middle" fill="#10b981" font-size="12" font-weight="700">GAA 360° 全環繞閘極 (Gate-All-Around)</text>
            <text x="345" y="45" fill="#38bdf8" font-size="11" font-weight="700">3層堆疊奈米片</text>

            <!-- 次世代背面供電網路 (Backside Power Delivery Network - BSPDN) -->
            <path d="M 100,240 L 100,275 M 260,190 L 260,275" stroke="#f59e0b" stroke-width="3"/>
            <text x="180" y="260" text-anchor="middle" fill="#f59e0b" font-size="11.5" font-weight="700">背面供電網路 (BSPDN / SuperPower Rail)</text>
            <text x="180" y="278" text-anchor="middle" fill="#94a3b8" font-size="10.5">電源線移至晶圓背部 · 正面純繞訊號</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_gate_wrap}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">4 面 360° 全環繞 (GAA)</div>
          <div class="eng-obj-metric-note">穿插環繞多層奈米片四周，消除漏電盲區</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_ss_metric}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">63 - 65 mV/dec</div>
          <div class="eng-obj-metric-note">逼近熱力學極限 (60 mV/dec)，開關極度敏捷</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_node_span}</div>
          <div class="eng-obj-metric-value">2nm (N2 / A16 / 18A)</div>
          <div class="eng-obj-metric-note">結合背面供電 (BSPDN) 邁入埃米 (Angstrom) 時代</div>
        </div>
      `;
      footerNote = t.ch12_gaa_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh12Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 12</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh12Title">${t.ch12_title}</h2>
          <p class="eng-obj-subtitle">${t.ch12_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeGen === 'planar' ? 'is-active' : ''}" data-gen="planar">${t.ch12_tab_planar}</button>
            <button type="button" class="eng-obj-tab ${activeGen === 'finfet' ? 'is-active' : ''}" data-gen="finfet">${t.ch12_tab_finfet}</button>
            <button type="button" class="eng-obj-tab ${activeGen === 'gaa' ? 'is-active' : ''}" data-gen="gaa">${t.ch12_tab_gaa}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-gen]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeGen = btn.getAttribute('data-gen');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 總調度入口 (Unified Mount Orchestrator)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function mountEngineeringObject(chId, container, lang = 'zh') {
  if (!container) return;
  if (chId === 'ch04') {
    renderLithoOpticalObject(container, lang);
  } else if (chId === 'ch05') {
    renderDepositionMechanismObject(container, lang);
  } else if (chId === 'ch06') {
    renderPlasmaEtchObject(container, lang);
  } else if (chId === 'ch12') {
    renderTransistor3DObject(container, lang);
  }
}
