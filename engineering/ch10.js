import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderInterconnectObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'damascene'; // 'damascene' | 'superfill' | 'em'
  let damaStep = 1; // 1 ~ 6
  let currentDensityMA = 1.8; // 0.5 ~ 5.0 MA/cm²
  let tempC = 105; // 50 ~ 150 °C
  let capTech = 'sicn'; // 'sicn' | 'coru'

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    let stepperBarHtml = '';

    if (activeTab === 'damascene') {
      const stepTitle = t[`ch10_step_dama_${damaStep}`];

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dual Damascene Flow">
          <!-- 步驟標題指示膠囊 -->
          <rect x="180" y="25" width="440" height="34" rx="4" fill="#0284c7" stroke="#38bdf8"/>
          <text x="400" y="47" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">${stepTitle}</text>

          <!-- 步驟進度膠囊 -->
          <g transform="translate(190, 75)">
            ${[1, 2, 3, 4, 5, 6].map(i => `
              <rect x="${(i - 1) * 72}" y="0" width="60" height="8" rx="2" fill="${damaStep >= i ? '#38bdf8' : '#334155'}"/>
            `).join('')}
          </g>

          <!-- 雙鑲嵌微觀剖面演進 -->
          <g transform="translate(260, 120)">
            <!-- 下層金屬層 M(n-1) -->
            <rect x="0" y="180" width="280" height="50" fill="#b45309"/>
            <text x="140" y="210" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">下層金屬線 M(n-1) 銅導線</text>

            <!-- 介電層 (Low-k SiCOH) -->
            <rect x="0" y="0" width="280" height="180" fill="#1e293b" stroke="#334155" stroke-width="2"/>

            <!-- 步驟 1: 介電層實體 -->
            ${damaStep === 1 ? `
              <text x="140" y="90" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">Low-k 介電層 (SiCOH, k=2.5)</text>
            ` : ''}

            <!-- 步驟 2 以上：挖出通孔 (Via) 與上方金屬溝槽 (Trench) -->
            ${damaStep >= 2 ? `
              <!-- 溝槽開口 (上段寬 160px, 深 70px) -->
              <rect x="60" y="0" width="160" height="70" fill="#09131b"/>
              <!-- 通孔開口 (下段窄 60px, 深 110px) -->
              <rect x="110" y="70" width="60" height="110" fill="#09131b"/>
            ` : ''}

            <!-- 步驟 3: 沉積 Ta/TaN 阻擋層 (1.5nm 綠色線) -->
            ${damaStep >= 3 ? `
              <path d="M 60,0 L 60,70 L 110,70 L 110,180 L 170,180 L 170,70 L 220,70 L 220,0" fill="none" stroke="#10b981" stroke-width="3"/>
            ` : ''}

            <!-- 步驟 4: 沉積 Cu Seed 晶種層 (薄橘線) -->
            ${damaStep >= 4 ? `
              <path d="M 63,0 L 63,67 L 113,67 L 113,177 L 167,177 L 167,67 L 217,67 L 217,0" fill="none" stroke="#f59e0b" stroke-width="2"/>
            ` : ''}

            <!-- 步驟 5: 電化學電鍍填滿銅 (ECD Cu) -->
            ${damaStep === 5 ? `
              <rect x="60" y="0" width="160" height="70" fill="#f59e0b" opacity="0.95"/>
              <rect x="110" y="70" width="60" height="110" fill="#f59e0b" opacity="0.95"/>
              <!-- 頂部過載鍍銅層 (Overburden) -->
              <rect x="0" y="-15" width="280" height="15" fill="#f59e0b"/>
              <text x="140" y="-3" text-anchor="middle" fill="#09131b" font-size="10" font-weight="700">電鍍過載銅層 (Overburden)</text>
            ` : ''}

            <!-- 步驟 6: CMP 磨平與覆蓋頂部帽層 (SiCN Cap) -->
            ${damaStep === 6 ? `
              <rect x="60" y="0" width="160" height="70" fill="#f59e0b"/>
              <rect x="110" y="70" width="60" height="110" fill="#f59e0b"/>
              <!-- 頂部 SiCN 介電遮罩帽層 -->
              <rect x="0" y="-6" width="280" height="6" fill="#0f766e"/>
              <text x="140" y="40" text-anchor="middle" fill="#09131b" font-size="12" font-weight="700">金屬溝槽 Trench (Mn)</text>
              <text x="140" y="125" text-anchor="middle" fill="#09131b" font-size="11" font-weight="700">導通孔 Via (Vn)</text>
            ` : ''}
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      stepperBarHtml = `
        <div class="eng-obj-stepper-bar">
          <div class="eng-obj-stepper-actions">
            <button type="button" class="eng-obj-btn eng-obj-btn-primary" id="damaNextBtn">${t.btn_next_step}</button>
            <button type="button" class="eng-obj-btn" id="damaResetBtn">${t.btn_reset}</button>
          </div>
          <div class="eng-obj-stepper-info">
            <span>雙鑲嵌步驟：<strong>${damaStep} / 6</strong></span>
          </div>
        </div>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">介電常數 Low-k (SiCOH)</div>
          <div class="eng-obj-metric-value">k ≈ 2.4 ~ 2.7</div>
          <div class="eng-obj-metric-note">大幅降低相鄰金屬線間寄生電容</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">擴散阻擋層 (Barrier)</div>
          <div class="eng-obj-metric-value">1.5 nm Ta/TaN</div>
          <div class="eng-obj-metric-note">阻止銅原子熱擴散進入介電層</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">雙鑲嵌核心優勢</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">孔與溝槽一體成型</div>
          <div class="eng-obj-metric-note">免除接觸介面，接觸電阻降低 40%</div>
        </div>
      `;

      footerNote = t.ch10_damascene_desc;
    } else if (activeTab === 'superfill') {
      viewportHtml = `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ECD Superfilling">
          <g transform="translate(250, 40)">
            <rect x="0" y="0" width="300" height="280" rx="4" fill="#131e2b" stroke="#334155" stroke-width="2"/>
            
            <!-- 挖空的深孔 (HAR Via) -->
            <rect x="90" y="0" width="120" height="230" fill="#09131b"/>
            
            <!-- 底部銅自底向上噴泉生長 -->
            <path d="M 90,160 Q 150,110 210,160 L 210,230 L 90,230 Z" fill="#f59e0b"/>
            <text x="150" y="195" text-anchor="middle" fill="#09131b" font-size="12" font-weight="700">自底向上電鍍生長</text>

            <!-- 抑制劑 Suppressor 在孔口邊角 -->
            <g fill="#ef4444">
              <rect x="75" y="0" width="20" height="12" rx="2"/>
              <rect x="205" y="0" width="20" height="12" rx="2"/>
            </g>
            <text x="150" y="-12" text-anchor="middle" fill="#ef4444" font-size="11.5" font-weight="700">抑制劑 Suppressor (開口阻生長)</text>

            <!-- 加速劑 Accelerator 在孔底高曲率處累積 -->
            <g fill="#10b981">
              <circle cx="110" cy="175" r="4"/><circle cx="150" cy="155" r="4"/><circle cx="190" cy="175" r="4"/>
            </g>
            <text x="150" y="255" text-anchor="middle" fill="#10b981" font-size="11.5" font-weight="700">加速劑 Accelerator (孔底加速填平)</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">電鍍填孔模式</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">無縫超填 (Superfilling)</div>
          <div class="eng-obj-metric-note">孔底成長速率為孔口的 5 倍以上</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">空洞與接縫 (Voids/Seams)</div>
          <div class="eng-obj-metric-value">0% 零缺陷</div>
          <div class="eng-obj-metric-note">徹底消除高深寬比接觸窗孔洞斷線</div>
        </div>
      `;

      footerNote = t.ch10_superfill_desc;
    } else {
      // Electromigration (EM) 連續物理計算器
      const ea = capTech === 'coru' ? 1.25 : 0.85; // eV
      const tk = tempC + 273.15; // K
      const kb = 8.61733e-5; // eV/K
      // Black's Equation: MTTF = A * J^-2 * exp(Ea / kT)
      const baseHours = capTech === 'coru' ? 5200000 : 75000;
      const jRatio = 1.0 / currentDensityMA;
      const thermalFactor = Math.exp((ea / kb) * (1 / tk - 1 / 378.15));
      const mttfHours = baseHours * (jRatio * jRatio) * thermalFactor;
      const mttfYears = mttfHours / 8760;

      let riskText = '';
      let riskColor = '';
      if (mttfYears >= 10.0) {
        riskText = `${mttfYears.toFixed(1)} 年 (車規/伺服器極致可靠)`;
        riskColor = 'var(--semi-teal)';
      } else if (mttfYears >= 1.0) {
        riskText = `${mttfYears.toFixed(1)} 年 (合格消費電子標竿)`;
        riskColor = '#38bdf8';
      } else {
        riskText = `${Math.round(mttfHours)} 小時 (⚠️ 早期斷路風險)`;
        riskColor = '#ef4444';
      }

      controlsHtml = `
        <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${capTech === 'sicn' ? 'is-active' : ''}" data-cap="sicn">${t.ch10_cap_sicn}</button>
            <button type="button" class="eng-obj-tab ${capTech === 'coru' ? 'is-active' : ''}" data-cap="coru">${t.ch10_cap_coru}</button>
          </div>
          <div class="eng-obj-slider-cluster">
            <div class="eng-obj-slider-unit">
              <div class="eng-obj-slider-header">
                <span class="eng-obj-slider-label">${t.ch10_j_slider}</span>
                <span class="eng-obj-slider-val" id="jVal">${currentDensityMA.toFixed(1)} MA/cm²</span>
              </div>
              <input type="range" class="eng-obj-slider" id="jSlider" min="0.5" max="5.0" step="0.1" value="${currentDensityMA}" aria-label="Current Density">
            </div>
            <div class="eng-obj-slider-unit">
              <div class="eng-obj-slider-header">
                <span class="eng-obj-slider-label">${t.ch10_temp_slider}</span>
                <span class="eng-obj-slider-val" id="tempVal">${tempC} °C</span>
              </div>
              <input type="range" class="eng-obj-slider" id="tempSlider" min="50" max="150" step="5" value="${tempC}" aria-label="Junction Temperature">
            </div>
          </div>
        </div>
      `;

      // 空洞與丘陵大小動態演變
      const emIntensity = Math.min(1.0, (currentDensityMA / 4.0) * (tempC / 130) * (capTech === 'coru' ? 0.25 : 1.0));
      const voidWidth = Math.round(15 + emIntensity * 45);
      const hillockHeight = Math.round(10 + emIntensity * 38);

      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Electromigration Live Engine">
          <g transform="translate(130, 45)">
            <rect x="0" y="0" width="540" height="200" rx="4" fill="#131e2b" stroke="#334155" stroke-width="2"/>
            
            <!-- 銅導線實體 (Copper Line) -->
            <rect x="40" y="55" width="460" height="70" fill="#b45309" stroke="#f59e0b" stroke-width="1.5"/>

            <!-- 頂部帽層 (SiCN vs Co/Ru) -->
            <rect x="40" y="47" width="460" height="8" fill="${capTech === 'coru' ? '#10b981' : '#0f766e'}" filter="${capTech === 'coru' ? 'drop-shadow(0 0 6px #10b981)' : 'none'}"/>
            <text x="270" y="42" text-anchor="middle" fill="${capTech === 'coru' ? '#10b981' : '#94a3b8'}" font-size="11" font-weight="700">
              ${capTech === 'coru' ? 'Co/Ru 金屬沉積覆蓋帽層 (強鍵合鎖緊原子 · Ea = 1.25 eV)' : 'SiCN 介電帽層 (介面易滑移 · Ea = 0.85 eV)'}
            </text>

            <!-- 電子風方向 (向右大量電子流動畫線) -->
            <g stroke="#38bdf8" stroke-width="${1.5 + (currentDensityMA / 5.0) * 2.0}" class="anim-electron" opacity="0.9">
              <line x1="80" y1="90" x2="160" y2="90"/>
              <line x1="200" y1="90" x2="280" y2="90"/>
              <line x1="320" y1="90" x2="400" y2="90"/>
            </g>
            <text x="270" y="105" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750" data-ink="light">
              電子風 (Electron Wind Force → J = ${currentDensityMA.toFixed(1)} MA/cm²)
            </text>

            <!-- 上游形成空洞 (Void - 斷路風險) -->
            <path d="M 80,55 Q ${80 + voidWidth},90 80,125 Z" fill="#09131b" stroke="#ef4444" stroke-width="1.5"/>
            <text x="80" y="145" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700">空洞 (Void)</text>

            <!-- 下游擠出金屬丘陵 (Hillock - 短路風險) -->
            <path d="M 430,55 Q ${445},${55 - hillockHeight} 460,55 Z" fill="#f59e0b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="445" y="${Math.min(35, 50 - hillockHeight)}" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="700">丘陵 (Hillock)</text>

            <text x="270" y="175" text-anchor="middle" fill="#cbd5e1" font-size="11">
              Black 方程：MTTF ∝ J⁻² · exp(Ea / kT) | 當前溫度: ${tempC}°C (${(tempC + 273.15).toFixed(1)} K)
            </text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch10_mttf_label}</div>
          <div class="eng-obj-metric-value" style="color: ${riskColor}; font-size: 16px;">${riskText}</div>
          <div class="eng-obj-metric-note">Black 方程預估之中位壽命</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch10_ea_label}</div>
          <div class="eng-obj-metric-value" style="color: ${capTech === 'coru' ? 'var(--semi-teal)' : '#f59e0b'};">${ea} eV</div>
          <div class="eng-obj-metric-note">${capTech === 'coru' ? '鈷釕帽層消除頂部界面擴散通道' : '銅介電層介面為主要遷移路徑'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch10_risk_label}</div>
          <div class="eng-obj-metric-value" style="color: ${riskColor}; font-size: 15px;">
            ${mttfYears >= 10.0 ? 'Tier-1 汽車/超算' : (mttfYears >= 1.0 ? '消費電子標準' : '超限警示 (Fail)')}
          </div>
          <div class="eng-obj-metric-note">J = ${currentDensityMA} MA/cm² · T = ${tempC}°C</div>
        </div>
      `;

      footerNote = t.ch10_em_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh10Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 10</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh10Title">${t.ch10_title}</h2>
          <p class="eng-obj-subtitle">${t.ch10_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'damascene' ? 'is-active' : ''}" data-tab="damascene">${t.ch10_tab_damascene}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'superfill' ? 'is-active' : ''}" data-tab="superfill">${t.ch10_tab_superfill}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'em' ? 'is-active' : ''}" data-tab="em">${t.ch10_tab_em}</button>
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
            <div class="eng-obj-metric-label">${lang === 'en' ? 'BEOL Interconnect Clauses' : '後段金屬互連條例 (BEOL Clauses)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'M0 Co/Ru · Cu/ULK · RDL/UBM' : 'M0 Co/Ru · Cu/ULK · RDL/UBM'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Barrierless Co/Ru/Mo, Cu Dual-Damascene + Air-Gap, Ultra-Thick Cu & 3D pads' : '局部無阻障 Co/Ru/Mo、雙鑲嵌銅與 Air-Gap、頂層超厚銅與 3D 鍵合墊'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Fuchs-Sondheimer & Black EM Law' : '奈米尺寸效應與電遷移律 (BEOL Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'ρ_eff ∝ ρ0·λ0/W · MTTF = A·J^-n·e^(Ea/kT)' : 'ρ_eff ∝ ρ0·λ0/W · MTTF = A·J^-n·e^(Ea/kT)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Proves barrierless Ru/Mo beats Cu <15nm, plus Elmore L² & EM' : '證明 <15nm 下無阻障 Ru/Mo 勝過銅，以及 Elmore L² 與 Blech 長度'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Via Open/SIV · ULK TDDB · EM Hillock' : 'Via Open/SIV · ULK TDDB · EM Hillock'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Prevents via SIV opens, ULK plasma-damage TDDB & EM cathode voids' : '以無阻障 Co/Ru 通孔、孔隙修復與選擇性鈷蓋層防範通孔開路、TDDB 與電遷移'}</div>
          </div>
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `, t);

    // 綁定頁籤切換事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    // 綁定雙鑲嵌步進按鈕
    const nextBtn = container.querySelector('#damaNextBtn');
    if (nextBtn) {
      bindEngineeringEvent(nextBtn, 'click', () => {
        damaStep = (damaStep % 6) + 1;
        update();
      });
    }

    const resetBtn = container.querySelector('#damaResetBtn');
    if (resetBtn) {
      bindEngineeringEvent(resetBtn, 'click', () => {
        damaStep = 1;
        update();
      });
    }

    // 綁定 EM 模式帽層切換與滑桿事件
    if (activeTab === 'em') {
      container.querySelectorAll('[data-cap]').forEach(btn => {
        bindEngineeringEvent(btn, 'click', () => {
          capTech = btn.getAttribute('data-cap');
          update();
        });
      });

      const jSlider = container.querySelector('#jSlider');
      const tempSlider = container.querySelector('#tempSlider');
      if (jSlider) {
        bindEngineeringEvent(jSlider, 'input', e => {
          currentDensityMA = Number(e.target.value);
          update();
        });
      }
      if (tempSlider) {
        bindEngineeringEvent(tempSlider, 'input', e => {
          tempC = Number(e.target.value);
          update();
        });
      }
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 8. Ch 21 先進封裝 2.5D CoWoS 與 3D SoIC 混合鍵合模型 (Advanced Packaging)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderInterconnectObject as render };
