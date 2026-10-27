import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderDepositionMechanismObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'ald'; // 'pvd' | 'cvd' | 'ald'
  let aldStep = 1; // 1 | 2 | 3 | 4
  let aldCycleCount = 1;
  let isAutoPlaying = false;
  let timerId = null;
  let cvdTemp = 650;  // 520 ~ 820 °C
  let cvdPress = 1.5; // 0.2 ~ 5.0 Torr

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    let stepperBarHtml = '';

    // CVD Arrhenius 熱化學反應動力學計算
    const T_K = cvdTemp + 273.15;
    const kB = 8.617e-5; // eV/K
    const Ea = 1.35;     // 活化能 1.35 eV
    // 表面化學反應速率 ks (nm/min)
    const ks = 2.4e7 * Math.exp(-Ea / (kB * T_K));
    // 氣相質傳擴散通量 hg (nm/min)
    const hg = 36 * Math.pow(cvdPress, 0.65);
    // 總沉積速率 (阻抗串聯模型 R_dep = (ks * hg) / (ks + hg))
    const rDep = (ks * hg) / (ks + hg);
    
    // 動力學主導機制判定
    let regime = 'surface';
    let regimeLabel = t.ch05_regime_surface;
    let regimeColor = '#10b981';
    let stepCoverage = 88;
    let overhangPx = 8;
    let bottomThickPx = 13;

    if (ks >= hg) {
      regime = 'mass';
      regimeLabel = t.ch05_regime_mass;
      regimeColor = '#ef4444';
      stepCoverage = Math.max(38, Math.round(86 - (cvdTemp - 680) * 0.32 - (cvdPress * 3.5)));
      overhangPx = Math.min(26, Math.round(8 + (cvdTemp - 680) * 0.12 + cvdPress * 1.5));
      bottomThickPx = Math.max(4, Math.round(14 * (stepCoverage / 100)));
    } else {
      stepCoverage = Math.min(97, Math.round(92 - (cvdTemp - 520) * 0.04));
      overhangPx = 8;
      bottomThickPx = Math.round(14 * (stepCoverage / 100));
    }

    if (activeTab === 'pvd') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PVD Sputtering Mechanism">
          <!-- 上方靶材 (Sputter Target) -->
          <rect x="250" y="30" width="300" height="28" rx="3" fill="#b45309" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="400" y="49" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">金屬靶材 (Sputter Target: Cu / Ti)</text>

          <!-- 氬離子轟擊與濺射原子粒子 (Line of sight) -->
          <g opacity="0.85">
            <!-- Ar+ 離子向上轟擊 -->
            <path d="M 320,110 L 340,65 M 480,110 L 460,65" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 3" class="anim-beam"/>
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
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
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
      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch05TempSlider">${t.ch05_temp_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch05TempSlider" min="520" max="820" step="10" value="${cvdTemp}">
            <span class="eng-obj-slider-val">${cvdTemp} °C</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch05PressSlider">${t.ch05_press_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch05PressSlider" min="0.2" max="5.0" step="0.1" value="${cvdPress.toFixed(1)}">
            <span class="eng-obj-slider-val">${cvdPress.toFixed(1)} Torr</span>
          </div>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: #94a3b8; font-family: monospace;">R_dep: <strong style="color: #38bdf8; font-size: 13px;">${rDep.toFixed(1)} nm/min</strong></span>
            <span style="font-size: 11px; padding: 2px 7px; border-radius: 4px; background: rgba(15,23,42,0.6); border: 1px solid ${regimeColor}; color: ${regimeColor}; font-weight: 700;">
              ${regime === 'surface' ? '✓ SURFACE LIMITED' : '⚠ MASS TRANSPORT LIMITED'}
            </span>
          </div>
        </div>
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CVD Mechanism with Arrhenius Reaction Kinetics">
          <!-- 上方氣體前驅物分子雲 -->
          <g transform="translate(250, 30)">
            <rect x="0" y="0" width="300" height="35" rx="3" fill="#0284c7" stroke="#38bdf8"/>
            <text x="150" y="22" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700">前驅反應氣體 (SiH₄ + O₂ / WF₆ + H₂)</text>
          </g>

          <!-- 擴散氣體分子 (擴散進孔內) -->
          <g fill="#38bdf8" opacity="0.75" class="anim-electron">
            <circle cx="360" cy="100" r="4"/><circle cx="430" cy="110" r="4"/>
            <circle cx="390" cy="140" r="4"/><circle cx="410" cy="170" r="4"/>
            <circle cx="380" cy="220" r="3"/><circle cx="420" cy="260" r="3"/>
          </g>

          <!-- 下方高深寬比深溝槽 (CVD 階梯覆蓋動態輪廓) -->
          <g transform="translate(250, 170)">
            <path d="M 20,20 L 100,20 L 100,210 L 200,210 L 200,20 L 280,20 L 280,230 L 20,230 Z" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            
            <!-- CVD 薄膜動態輪廓 -->
            <!-- 表面平坦區 -->
            <rect x="20" y="${20 - overhangPx}" width="80" height="${overhangPx}" fill="#0284c7"/>
            <rect x="200" y="${20 - overhangPx}" width="80" height="${overhangPx}" fill="#0284c7"/>
            
            <!-- 開口處懸垂 (Overhang) -->
            <path d="M ${100 - overhangPx},20 Q ${100 + overhangPx * 1.3},${20 + overhangPx * 1.5} 100,${40 + overhangPx * 2} L 100,20 Z" fill="#0369a1"/>
            <path d="M ${200 + overhangPx},20 Q ${200 - overhangPx * 1.3},${20 + overhangPx * 1.5} 200,${40 + overhangPx * 2} L 200,20 Z" fill="#0369a1"/>
            
            <!-- 側壁薄膜 -->
            <path d="M 100,20 L ${100 + Math.max(3, bottomThickPx * 0.9)},20 L ${100 + Math.max(2, bottomThickPx * 0.6)},210 L 100,210 Z" fill="#0284c7"/>
            <path d="M 200,20 L ${200 - Math.max(3, bottomThickPx * 0.9)},20 L ${200 - Math.max(2, bottomThickPx * 0.6)},210 L 200,210 Z" fill="#0284c7"/>
            
            <!-- 底部沉積 -->
            <rect x="100" y="${210 - bottomThickPx}" width="100" height="${bottomThickPx}" fill="#0284c7"/>

            <!-- 狀態標註 -->
            <text x="310" y="60" fill="${regimeColor}" font-size="12" font-weight="700">${regime === 'surface' ? '表面反應受限：ks < hg' : '質傳擴散受限：ks ≥ hg'}</text>
            <text x="310" y="85" fill="${regimeColor}" font-size="11.5" font-weight="700">階梯覆蓋率 Step Coverage: ${stepCoverage}%</text>
            <text x="310" y="108" fill="#94a3b8" font-size="11">R_dep = ${rDep.toFixed(1)} nm/min · Ea = 1.35 eV</text>

            ${regime === 'mass' ? `
              <text x="150" y="130" text-anchor="middle" fill="#ef4444" font-size="10.5" font-weight="700">⚠️ 孔口早閉空洞 (Void Risk)</text>
            ` : ''}
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_step_coverage}</div>
          <div class="eng-obj-metric-value" style="color: ${regimeColor};">${stepCoverage}%</div>
          <div class="eng-obj-metric-note">${regime === 'surface' ? t.ch05_coverage_good : t.ch05_coverage_poor}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_rate_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${rDep.toFixed(1)} nm/min</div>
          <div class="eng-obj-metric-note">Arrhenius ks: ${ks.toFixed(1)} · 氣相 hg: ${hg.toFixed(1)}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_regime_label}</div>
          <div class="eng-obj-metric-value" style="font-size: 13.5px; color: ${regimeColor};">${regimeLabel}</div>
          <div class="eng-obj-metric-note">${regime === 'surface' ? '活化能主導 · 分子有充沛時間擴散至孔底' : '反應極快受限於氣體擴散 · 易封孔形成空洞'}</div>
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
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
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

    renderEngineeringCard(container, `
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
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        ${stepperBarHtml}

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Thin-Film & ECD Clauses' : '六大薄膜與電鍍條例 (Film Clauses)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'Ox · CVD · ALD · iPVD · EPI · ECD' : 'Ox · CVD · ALD · iPVD · EPI · ECD'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'ISSG ox, FCVD gap-fill, 100% ALD, iPVD seed, SiGe SEG & ECD Cu superfill' : 'ISSG 氧化、FCVD 填孔、ALD 100% 保形、iPVD 晶種、SiGe 磊晶與 ECD 銅超填'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Deal-Grove, ALD & CEAC Superfill Law' : 'Deal-Grove 與超填定律 (Film Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'xo²+Axo=Bt · t_sat ∝ (L/d)² · CEAC' : 'xo²+Axo=Bt · t_sat ∝ (L/d)² · CEAC'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Linear-parabolic oxidation, ALD (L/d)² dose & CEAC superfill' : '熱氧化線性拋物線律、ALD 深孔擴散平方律與曲率加速電鍍超填'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Keyhole Seam · ALD Starve · Cu Void' : 'Keyhole Seam · ALD Starve · Cu Void'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Eliminates CVD keyhole seams, high-AR ALD starvation & ECD bottom voids' : '消除 CVD 懸垂夾斷中縫空洞、高深寬比 ALD 底部耗盡與電鍍超填充失效'}</div>
          </div>
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `, t);

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        if (timerId) clearInterval(timerId);
        isAutoPlaying = false;
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    const tempSlider = container.querySelector('#ch05TempSlider');
    if (tempSlider) {
      bindEngineeringEvent(tempSlider, 'input', (e) => {
        cvdTemp = parseInt(e.target.value, 10);
        update();
      });
    }

    const pressSlider = container.querySelector('#ch05PressSlider');
    if (pressSlider) {
      bindEngineeringEvent(pressSlider, 'input', (e) => {
        cvdPress = parseFloat(e.target.value);
        update();
      });
    }

    const nextBtn = container.querySelector('#aldNextBtn');
    if (nextBtn) {
      bindEngineeringEvent(nextBtn, 'click', () => {
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
      bindEngineeringEvent(playBtn, 'click', () => {
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
      bindEngineeringEvent(resetBtn, 'click', () => {
        if (timerId) clearInterval(timerId);
        isAutoPlaying = false;
        aldStep = 1;
        aldCycleCount = 1;
        update();
      });
    }
  }

  registerEngineeringCleanup(container, () => {
    if (timerId) clearInterval(timerId);
    timerId = null;
    isAutoPlaying = false;
  });
  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 3. Ch 06 電漿蝕刻腔體結構與非等向性輪廓模型 (Plasma Etch & Profile Model)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderDepositionMechanismObject as render };
