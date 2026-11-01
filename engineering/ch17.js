import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderProcessControlObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'spc'; // 'spc' | 'cpk' | 'r2r'
  let spcMode = 'normal'; // 'normal' | 'shift' | 'drift'
  let cpkShift = 0.0;     // -1.5 ~ +1.5 σ
  let cpkSpread = 1.0;    // 0.6 ~ 1.8 mult

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'spc') {
      // 產生 18 個批次點
      const points = [];
      for (let i = 0; i < 18; i++) {
        let val = 150; // 中心線 CL
        if (spcMode === 'normal') {
          val += Math.sin(i * 1.5) * 18 + (i % 2 === 0 ? 8 : -8);
        } else if (spcMode === 'shift') {
          // 後段至少連續 9 點在 CL 上方 (Nelson Rule 2)
          val += i < 8 ? (Math.sin(i) * 15) : (25 + (i % 3) * 6);
        } else if (spcMode === 'drift') {
          // 連續遞增趨勢 (Nelson Rule 3)，未超出 UCL
          val += (i - 8) * 8;
        }
        points.push({ x: i * 36 + 80, y: 300 - val });
      }

      const pathStr = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');

      let oocMessage = lang === 'en' ? 'Illustration: variation around the center line' : '示意：數據在中心線兩側波動';
      let oocColor = '#10b981';
      if (spcMode === 'shift') {
        oocMessage = lang === 'en' ? 'Nelson Rule 2: 9 consecutive points on one side' : 'Nelson 規則 2：連續 9 點在中心線同側';
        oocColor = '#ef4444';
      } else if (spcMode === 'drift') {
        oocMessage = lang === 'en' ? 'Nelson Rule 3: 6 consecutive points trending upward' : 'Nelson 規則 3：連續 6 點遞增';
        oocColor = '#ef4444';
      }

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SPC Shewhart Control Chart and Nelson Rules">
          <!-- 圖表繪製區背景 -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="680" height="300" fill="#0f172a" stroke="#334155" stroke-width="1.5" rx="6"/>

            <!-- 管制界限與規格線 -->
            <!-- UCL (+3σ) -->
            <line x1="20" y1="60" x2="660" y2="60" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="5 3"/>
            <text x="665" y="64" fill="#f87171" font-size="10.5" font-weight="700">UCL (+3σ)</text>

            <!-- CL (中心線) -->
            <line x1="20" y1="150" x2="660" y2="150" stroke="#38bdf8" stroke-width="2"/>
            <text x="665" y="140" fill="#38bdf8" font-size="11" font-weight="750">${lang === 'en' ? 'CL (Target)' : 'CL (目標值)'}</text>

            <!-- LCL (-3σ) -->
            <line x1="20" y1="240" x2="660" y2="240" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="5 3"/>
            <text x="665" y="244" fill="#f87171" font-size="10.5" font-weight="700">LCL (-3σ)</text>

            <!-- 時序數據折線與數據點 -->
            <path d="${pathStr}" fill="none" stroke="${oocColor}" stroke-width="2.5"/>
            ${points.map(p => `
              <circle cx="${p.x}" cy="${p.y}" r="4.5" fill="${p.y < 60 || p.y > 240 ? '#ef4444' : '#38bdf8'}" stroke="#ffffff" stroke-width="1.5"/>
            `).join('')}

            <!-- 狀態文字條 -->
            <rect x="40" y="265" width="600" height="26" rx="3" fill="#1e293b" stroke="${oocColor}" stroke-width="1"/>
            <text x="340" y="282" text-anchor="middle" fill="${oocColor}" font-size="11" font-weight="750">${oocMessage}</text>
          </g>

          <!-- 模式控制按鈕 -->
          <g transform="translate(180, 360)">
            ${[
              { id: 'normal', zh: '正常受控 (Normal)', en: 'In-Control' },
              { id: 'shift', zh: '均值偏移 (Mean Shift)', en: 'Mean Shift' },
              { id: 'drift', zh: '腔體磨損漂移 (Drift)', en: 'Tool Drift' }
            ].map((m, idx) => `
              <rect x="${idx * 160}" y="0" width="140" height="28" rx="4"
                    fill="${spcMode === m.id ? '#0284c7' : '#1e293b'}"
                    stroke="${spcMode === m.id ? '#38bdf8' : '#475569'}"
                    style="cursor: pointer;" data-spc-mode="${m.id}" role="button" tabindex="0" aria-pressed="${spcMode === m.id}" aria-label="${esc(lang === 'zh' ? m.zh : m.en)}"/>
              <text x="${idx * 160 + 70}" y="18" text-anchor="middle"
                    fill="${spcMode === m.id ? '#ffffff' : '#94a3b8'}"
                    font-size="11" font-weight="700" style="pointer-events: none;">${lang === 'zh' ? m.zh : m.en}</text>
            `).join('')}
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 100,210 L 700,210" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="10 6" class="anim-data-flow" opacity="0.65"/><path d="M 100,130 L 700,130 M 100,290 L 700,290" fill="none" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="5 5" class="anim-beam" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch17_metric_sigma}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">± 3σ (99.73%)</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Normal-distribution control limits' : '自然常態分佈管制界限'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch17_metric_ooc}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? '8 Nelson Rules' : 'Nelson 8 項規則'}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Detect mean shifts, trends and abnormal cycles' : '靈敏捕捉均值位移、趨勢與週期異常'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Illustrative Hold Policy' : '示範暫停策略 (Hold)'}</div>
          <div class="eng-obj-metric-value" style="color: ${spcMode === 'normal' ? 'var(--semi-teal)' : '#ef4444'};">
            ${spcMode === 'normal' ? (lang === 'en' ? 'READY (Example)' : 'READY (示例)') : (lang === 'en' ? 'HOLD (Example)' : 'HOLD (示例)')}
          </div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Actual lot holds depend on the site response plan' : '實際批次暫停依現場異常處置計畫決定'}</div>
        </div>
      `;

      footerNote = t.ch17_spc_desc;
    } else if (activeTab === 'cpk') {
      const usl = 520;
      const lsl = 80;
      const target = 300;
      const baseSigma = 44;
      const curSigma = Math.max(15, baseSigma * cpkSpread);
      const curMean = target + cpkShift * baseSigma;
      const calcCp = ((usl - lsl) / (6 * curSigma)).toFixed(2);
      const calcCpk = Math.min((usl - curMean) / (3 * curSigma), (curMean - lsl) / (3 * curSigma)).toFixed(2);
      const isAcceptable = calcCpk >= 1.67;

      // 動態高斯鐘型曲線取樣點
      const gaussPts = [];
      for (let x = 20; x <= 580; x += 15) {
        const z = (x - curMean) / curSigma;
        const y = 270 - Math.min(220, Math.round(210 * Math.exp(-0.5 * z * z)));
        gaussPts.push({ x, y });
      }
      const gaussPath = gaussPts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');

      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch17Shift">${t.physics_slider_shift}</label>
            <input type="range" class="eng-obj-range-input" id="ch17Shift" min="-1.5" max="1.5" step="0.1" value="${cpkShift}">
            <span class="eng-obj-slider-val">${cpkShift >= 0 ? '+' : ''}${cpkShift.toFixed(1)}σ</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch17Spread">${t.physics_slider_spread}</label>
            <input type="range" class="eng-obj-range-input" id="ch17Spread" min="0.6" max="1.8" step="0.1" value="${cpkSpread}">
            <span class="eng-obj-slider-val">${cpkSpread.toFixed(1)}×</span>
          </div>
          <div style="font-size: 11.5px; margin-left: auto;">
            Cpk = <strong style="color: ${isAcceptable ? 'var(--semi-teal)' : '#b91c1c'}; font-size: 14px;">${calcCpk}</strong>
          </div>
        </div>
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Process Capability Cpk Gaussian Distribution">
          <!-- 高斯常態分佈曲線動態渲染 -->
          <g transform="translate(100, 40)">
            <rect x="0" y="0" width="600" height="320" fill="#0f172a" stroke="#334155" stroke-width="1.5" rx="6"/>

            <!-- 規格界限 (USL / LSL) -->
            <line x1="80" y1="40" x2="80" y2="280" stroke="#f59e0b" stroke-width="2.5"/>
            <text x="80" y="32" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="800">${lang === 'en' ? 'LSL (Lower Limit 80)' : 'LSL (規格下限 80)'}</text>

            <line x1="520" y1="40" x2="520" y2="280" stroke="#f59e0b" stroke-width="2.5"/>
            <text x="520" y="32" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="800">${lang === 'en' ? 'USL (Upper Limit 520)' : 'USL (規格上限 520)'}</text>

            <!-- 目標中心線 Target -->
            <line x1="300" y1="40" x2="300" y2="280" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3 3"/>
            <text x="300" y="32" text-anchor="middle" fill="#94a3b8" font-size="10.5">${lang === 'en' ? 'Target (Center 300)' : 'Target (目標中心 300)'}</text>

            <!-- 實際均值線 μ -->
            <line x1="${curMean}" y1="45" x2="${curMean}" y2="280" stroke="${isAcceptable ? '#38bdf8' : '#ef4444'}" stroke-width="1.5" stroke-dasharray="4 2"/>
            <text x="${curMean}" y="295" text-anchor="middle" fill="${isAcceptable ? '#38bdf8' : '#ef4444'}" font-size="10.5" font-weight="700">μ = ${curMean.toFixed(0)}</text>

            <!-- 動態常態分佈鐘型曲線 -->
            <path d="${gaussPath}" fill="none" stroke="${isAcceptable ? '#10b981' : '#ef4444'}" stroke-width="3"/>

            <text x="300" y="340" text-anchor="middle" fill="${isAcceptable ? '#34d399' : '#f87171'}" font-size="13" font-weight="800">
              Cp = ${calcCp} · Cpk = ${calcCpk} ${isAcceptable ? (lang === 'en' ? '✓ Meets example threshold' : '✓ 達示範門檻') : (lang === 'en' ? '✗ Below example threshold' : '✗ 未達示範門檻')}
            </text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 100,210 L 700,210" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="10 6" class="anim-data-flow" opacity="0.65"/><path d="M 100,130 L 700,130 M 100,290 L 700,290" fill="none" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="5 5" class="anim-beam" opacity="0.5"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Current Process Capability Cpk' : '即時製程能力 Cpk'}</div>
          <div class="eng-obj-metric-value" style="color: ${isAcceptable ? 'var(--semi-teal)' : '#ef4444'};">${calcCpk}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Illustrative capability threshold ≥ 1.67' : '示範能力門檻 ≥ 1.67'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Potential Process Capability Cp' : '潛在製程能力 Cp'}</div>
          <div class="eng-obj-metric-value">${calcCp}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Dispersion-based capability, excluding mean shift' : '不考慮中心偏移之離散度極限'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Illustrative Disposition' : '示範處置狀態'}</div>
          <div class="eng-obj-metric-value" style="color: ${isAcceptable ? 'var(--semi-teal)' : '#ef4444'};">
            ${isAcceptable ? (lang === 'en' ? 'PASS (Example)' : 'PASS (示例)') : (lang === 'en' ? 'HOLD (Example)' : 'HOLD (示例)')}
          </div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Illustration only; no MES release or tool interlock' : '僅示意判定，未連接 MES 放行或機台閉鎖'}</div>
        </div>
      `;

      footerNote = t.ch17_cpk_desc;
    } else if (activeTab === 'r2r') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Run-to-Run Closed-Loop Feedback Control">
          <!-- 閉環控制方塊圖 (Closed-Loop Diagram) -->
          <!-- 1. 機台加工 (Process Chamber) -->
          <g transform="translate(100, 100)">
            <rect x="0" y="0" width="160" height="70" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="80" y="32" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${lang === 'en' ? '1. Tool Processing' : '1. 機台加工'}</text>
            <text x="80" y="52" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? 'Etch / Deposition (Recipe)' : '蝕刻 / 沉積 (Recipe)'}</text>
          </g>

          <line x1="260" y1="135" x2="330" y2="135" stroke="#38bdf8" stroke-width="3" marker-end="url(#arrow)"/>

          <!-- 2. 在線量測 (In-line Metrology) -->
          <g transform="translate(340, 100)">
            <rect x="0" y="0" width="160" height="70" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <text x="80" y="32" text-anchor="middle" fill="#34d399" font-size="12" font-weight="750">${lang === 'en' ? '2. In-line Metrology' : '2. 在線量測'}</text>
            <text x="80" y="52" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? 'CD-SEM / Ellipsometer' : 'CD-SEM / 橢偏儀'}</text>
          </g>

          <line x1="500" y1="135" x2="570" y2="135" stroke="#10b981" stroke-width="3" marker-end="url(#arrow)"/>

          <!-- 3. R2R 控制器 (EWMA Algorithm) -->
          <g transform="translate(580, 100)">
            <rect x="0" y="0" width="160" height="70" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
            <text x="80" y="32" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="750">${lang === 'en' ? '3. R2R Controller' : '3. R2R 控制核心'}</text>
            <text x="80" y="52" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? 'EWMA Smoothing Feedback' : 'EWMA 指數平滑反饋'}</text>
          </g>

          <!-- 閉環回饋回路 (Feedback Loop) -->
          <path d="M 660,170 L 660,260 L 180,260 L 180,175" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#arrow)"/>
          <text x="420" y="285" text-anchor="middle" fill="#fbbf24" font-size="11.5" font-weight="750">${lang === 'en' ? '⇦ Uncalibrated example: next-run etch -1.2s or deposition gas-flow trim ⇦' : '⇦ 未校準示例：下一批蝕刻 -1.2s 或調整沉積氣體流量 ⇦'}</text>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 100,210 L 700,210" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="10 6" class="anim-data-flow" opacity="0.65"/><path d="M 100,130 L 700,130 M 100,290 L 700,290" fill="none" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="5 5" class="anim-beam" opacity="0.5"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Closed-Loop Control Algorithm' : '閉環控制演算法'}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">EWMA (λ = 0.3)</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Uncalibrated example λ; response/noise trade-off' : 'λ 為未校準示例；反映響應與雜訊濾除的取捨'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Assumed Drift Suppression' : '假設腔體漂移抑制率'}</div>
          <div class="eng-obj-metric-value">&gt; 90%</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Uncalibrated assumption for polymer-related aging; not a measured result' : '聚合物沉積老化情境的未校準假設，非實測成效'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Assumed Response Cycle' : '假設控制響應週期'}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? '1 Run (Assumed)' : '1 Run (假設)'}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Uncalibrated example of recipe updates between lots' : '批次間更新配方的未校準示例'}</div>
        </div>
      `;

      footerNote = t.ch17_r2r_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh17Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 17</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh17Title">${t.ch17_title}</h2>
          <p class="eng-obj-subtitle">${t.ch17_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'spc' ? 'is-active' : ''}" data-tab="spc">${t.ch17_tab_spc}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'cpk' ? 'is-active' : ''}" data-tab="cpk">${t.ch17_tab_cpk}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'r2r' ? 'is-active' : ''}" data-tab="r2r">${t.ch17_tab_r2r}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'SPC, Cpk & APC Concepts' : 'SPC 判異、Cpk 與 APC 概念'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'Nelson Rules · Cpk ≥ 1.67 (Example)' : 'Nelson 規則 · Cpk ≥ 1.67 (示例)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Nelson detection, illustrative Cpk threshold; APC: R2R feedback/feedforward, FDC, VM, PdM' : 'Nelson 判異、示範 Cpk 門檻；APC：R2R 回饋前饋、FDC、VM、PdM'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Cpk & EWMA Relations' : 'Cpk 與 EWMA 關係式'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">Cpk = min[(USL-μ)/3σ, (μ-LSL)/3σ]<br>z_t = λy_t+(1-λ)z_{t-1}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Automotive/3D KGD capability context; EWMA lot feedback and FDC Mahalanobis T²' : '車規／3D KGD 能力管理情境；EWMA 批次回饋與 FDC 馬氏距離 T²'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Anti-Tampering · R2R Gate · FDC T²/Q' : 'Anti-Tampering · R2R Gate · FDC T²/Q'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'OCAP concepts: limit overadjustment, gate R2R outliers, adapt FDC baselines after PM' : 'OCAP 概念：限制過度調機、R2R 離群值閘門、PM 後 FDC 基準自適應'}</div>
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

    container.querySelectorAll('[data-spc-mode]').forEach(btn => {
      const selectState = () => {
        const restoreFocus = btn === btn.ownerDocument.activeElement;
        spcMode = btn.getAttribute('data-spc-mode');
        update();
        if (restoreFocus) container.querySelector(`[data-spc-mode="${spcMode}"]`)?.focus();
      };
      bindEngineeringEvent(btn, 'click', selectState);
      bindEngineeringEvent(btn, 'keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectState();
        }
      });
    });

    const shiftSlider = container.querySelector('#ch17Shift');
    if (shiftSlider) {
      bindEngineeringEvent(shiftSlider, 'input', (e) => {
        const restoreFocus = e.target === e.target.ownerDocument.activeElement;
        cpkShift = parseFloat(e.target.value);
        update();
        if (restoreFocus) container.querySelector('#ch17Shift')?.focus();
      });
    }
    const spreadSlider = container.querySelector('#ch17Spread');
    if (spreadSlider) {
      bindEngineeringEvent(spreadSlider, 'input', (e) => {
        const restoreFocus = e.target === e.target.ownerDocument.activeElement;
        cpkSpread = parseFloat(e.target.value);
        update();
        if (restoreFocus) container.querySelector('#ch17Spread')?.focus();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 16. Ch 19 WAT 劃線區參數測試與 CP 晶粒針測模型 (WAT & CP Die Sort)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderProcessControlObject as render };
