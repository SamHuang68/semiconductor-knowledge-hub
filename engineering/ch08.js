import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderCMPObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'kinematics'; // 'kinematics' | 'micro' | 'defects'
  let pressure = 3.0; // psi (1.0 ~ 5.0)
  let speed = 90;     // RPM (40 ~ 120)

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    const mrr = Math.round(1.5 * pressure * speed);

    if (activeTab === 'kinematics') {
      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch08Pressure">${t.physics_slider_p}</label>
            <input type="range" class="eng-obj-range-input" id="ch08Pressure" min="1.0" max="6.0" step="0.2" value="${pressure}">
            <span class="eng-obj-slider-val">${pressure.toFixed(1)} psi</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch08Speed">${t.physics_slider_v}</label>
            <input type="range" class="eng-obj-range-input" id="ch08Speed" min="40" max="150" step="5" value="${speed}">
            <span class="eng-obj-slider-val">${speed} RPM</span>
          </div>
          <div style="font-size: 11.5px; color: #f59e0b; margin-left: auto;">
            Preston MRR = <strong style="color: #38bdf8;">${mrr} nm/min</strong>
          </div>
        </div>
      `;
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CMP Tool Kinematics">
          <!-- 1. 旋轉研磨大盤 (Polishing Pad, 直徑 760mm) -->
          <g transform="translate(320, 220)">
            <circle cx="0" cy="0" r="180" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            <!-- 研磨墊同心圓與同向旋轉動畫 -->
            <g class="anim-rotate-pad">
              <circle cx="0" cy="0" r="140" fill="none" stroke="#334155" stroke-dasharray="8 6"/>
              <circle cx="0" cy="0" r="100" fill="none" stroke="#334155" stroke-dasharray="8 6"/>
              <circle cx="0" cy="0" r="60" fill="none" stroke="#334155" stroke-dasharray="8 6"/>
              <line x1="-180" y1="0" x2="180" y2="0" stroke="#38bdf8" stroke-width="1.2" opacity="0.6"/>
              <line x1="0" y1="-180" x2="0" y2="180" stroke="#38bdf8" stroke-width="1.2" opacity="0.6"/>
            </g>
            <text x="-120" y="150" fill="#94a3b8" font-size="11.5">${t.ch08_pad_label}</text>
          </g>

          <!-- 2. 晶圓研磨頭 (Carrier Head, 倒扣 300mm 晶圓) -->
          <g transform="translate(420, 170)">
            <circle cx="0" cy="0" r="80" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
            <!-- 研磨頭旋轉與分區環 -->
            <g class="anim-rotate-head">
              <circle cx="0" cy="0" r="60" fill="none" stroke="#38bdf8" stroke-dasharray="4 4"/>
              <circle cx="0" cy="0" r="35" fill="none" stroke="#38bdf8" stroke-dasharray="4 4"/>
              <circle cx="0" cy="0" r="8" fill="#f59e0b"/>
            </g>
            <line x1="80" y1="0" x2="120" y2="0" stroke="#0284c7" stroke-width="1.2"/>
            <text x="135" y="-8" text-anchor="start" fill="#38bdf8" font-size="12" font-weight="700">${svgTextLines(t.ch08_head_label.replace(' (', '\n('), 135, -8)}</text>
            <text x="0" y="98" text-anchor="middle" fill="#94a3b8" font-size="10.5">${lang === 'en' ? "300mm wafer (down-force P:" : "300mm 晶圓 (下向壓 P:"} ${pressure.toFixed(1)} psi)</text>
          </g>

          <!-- 3. 研磨液滴注臂 (Slurry Delivery Arm) -->
          <g transform="translate(180, 70)">
            <rect x="0" y="0" width="160" height="14" rx="2" fill="#475569" stroke="#64748b"/>
            <circle cx="150" cy="7" r="5" fill="#38bdf8"/>
            <!-- 滴落研磨液滴 -->
            <circle cx="150" cy="30" r="4" fill="#38bdf8" opacity="0.8"/>
            <circle cx="150" cy="60" r="5" fill="#38bdf8" opacity="0.85"/>
            <text x="0" y="-8" fill="#38bdf8" font-size="11">${t.ch08_slurry_arm}</text>
          </g>

          <!-- 4. 鑽石修整器 (Diamond Conditioner Disk) -->
          <g transform="translate(190, 290)">
            <circle cx="0" cy="0" r="38" fill="#334155" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="0" y="4" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="700">${lang === 'en' ? svgTextLines("Diamond\nconditioner\ndisk", 0, -12, 14) : "鑽石修整盤"}</text>
            <text x="0" y="52" text-anchor="middle" fill="#94a3b8" font-size="9.5">${lang === 'en' ? "Deglaze / roughen" : "去除釉質 / 粗糙化"}</text>
          </g>

          <!-- 速度與 Preston 標註 -->
          <text x="680" y="80" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="700">${lang === 'en' ? "Preston equation" : "Preston 方程"}</text>
          <text x="680" y="105" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="600">MRR = Kp · P · V</text>
          <text x="680" y="130" text-anchor="middle" fill="#38bdf8" font-size="16" font-weight="750">≈ ${mrr} nm/min</text>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch08_mrr_label}</div>
          <div class="eng-obj-metric-value">${mrr} nm/min</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Material removal rate (Preston Kp=1.5)" : "材料移除速率 (Preston Kp=1.5)"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Contact pressure P (down-force)" : "接觸壓力 P (Down-Force)"}</div>
          <div class="eng-obj-metric-value">${pressure.toFixed(1)} psi</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Multi-zone air bladders control wafer flatness" : "多區氣囊分區調控晶圓平坦度"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Relative polishing speed V (platen speed)" : "相對研磨轉速 V (Platen Speed)"}</div>
          <div class="eng-obj-metric-value">${speed} RPM</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Same-direction rotation keeps relative speed uniform across the wafer" : "同向旋轉確保全晶圓相對速度均勻"}</div>
        </div>
      `;

      footerNote = t.ch08_preston_note;
    } else if (activeTab === 'micro') {
      viewportHtml = `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CMP Chemical Mechanical Mechanism">
          <!-- 上方旋轉聚氨酯研磨墊 (Pad Asperities 微孔微突起) -->
          <g transform="translate(100, 30)">
            <rect x="0" y="0" width="600" height="40" fill="#334155" stroke="#64748b"/>
            <!-- 墊表面粗糙微峰 (Asperities) -->
            <path d="M 0,40 Q 50,55 100,40 Q 150,55 200,40 Q 250,55 300,40 Q 350,55 400,40 Q 450,55 500,40 Q 550,55 600,40 Z" fill="#475569"/>
            <text x="300" y="24" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="700">${lang === 'en' ? "Polyurethane polishing pad asperities press down for abrasion" : "聚氨酯研磨墊粗糙微峰 (Pad Asperities 下壓磨削)"}</text>
          </g>

          <!-- 研磨液納米磨粒 (CeO2 / SiO2 Abrasive Particles) -->
          <g fill="#38bdf8">
            <circle cx="220" cy="115" r="7"/><circle cx="350" cy="118" r="7"/><circle cx="480" cy="116" r="7"/>
            <circle cx="280" cy="140" r="6"/><circle cx="410" cy="142" r="6"/>
          </g>
          <text x="650" y="125" fill="#38bdf8" font-size="11">${lang === 'en' ? svgTextLines("Nano-abrasives\n(SiO₂ / CeO₂)", 650, 125, 17) : "奈米磨粒 (SiO₂ / CeO₂)"}</text>

          <!-- 下方晶圓表面微觀輪廓：突出高點 vs 低窪處 -->
          <g transform="translate(100, 180)">
            <!-- 矽基底 -->
            <path d="M 0,140 L 0,80 L 150,80 L 150,40 L 300,40 L 300,80 L 450,80 L 450,40 L 600,40 L 600,140 Z" fill="#1e293b" stroke="#334155" stroke-width="2"/>
            
            <!-- 表面水合鈍化層 (Chemical Passivation Layer ~3nm) -->
            <!-- 高點：鈍化層被磨粒強烈磨除 (露出純銅繼續氧化) -->
            <rect x="150" y="36" width="150" height="6" fill="#f59e0b" opacity="0.6"/>
            <rect x="450" y="36" width="150" height="6" fill="#f59e0b" opacity="0.6"/>
            <!-- 低窪處：鈍化層完好無損，阻擋化學溶蝕 -->
            <rect x="0" y="76" width="150" height="6" fill="#10b981"/>
            <rect x="300" y="76" width="150" height="6" fill="#10b981"/>

            <text x="225" y="25" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">${lang === 'en' ? svgTextLines("High spots under pressure:\nmechanical oxide removal", 225, 8, 17) : "高點受壓：機械磨除氧化層"}</text>
            <text x="75" y="115" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">${lang === 'en' ? svgTextLines("Low areas: no pressure;\npassivation protection", 75, 115, 17) : "低處不承受壓力：鈍化保護"}</text>
            <text x="375" y="115" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">${lang === 'en' ? svgTextLines("Low areas: no pressure;\npassivation protection", 375, 115, 17) : "低處不承受壓力：鈍化保護"}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Chemical action" : "化學作用 (Chemical)"}</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">${lang === 'en' ? "Oxidation, passivation and softening" : "氧化鈍化軟化"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Forms a porous hydrated CuO/Cu(OH)₂ film" : "生成疏鬆 CuO/Cu(OH)₂ 水合膜"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Mechanical action" : "機械作用 (Mechanical)"}</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">${lang === 'en' ? "Selective removal of high spots" : "高點選擇性磨除"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Nano-abrasives rub away raised asperities" : "奈米磨粒擦碰刮除微峰凸起"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Global planarization capability" : "全域平坦化能力"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">Planarization &gt; 95%</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Sole focus safeguard for lithography depth of focus (DOF)" : "微影焦深 (DOF) 唯一定焦保障技術"}</div>
        </div>
      `;

      footerNote = t.ch08_micro_desc;
    } else {
      // Defects & Dummy Fill
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CMP Defects">
          <!-- 1. 碟化 (Dishing) -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="310" height="260" rx="4" fill="#131e2b" stroke="#ef4444"/>
            <text x="155" y="26" text-anchor="middle" fill="#ef4444" font-size="13" font-weight="700">${lang === 'en' ? "Wide-line dishing" : "寬導線碟化 (Dishing)"}</text>
            <!-- 介電層 -->
            <rect x="25" y="80" width="70" height="140" fill="#334155"/>
            <rect x="215" y="80" width="70" height="140" fill="#334155"/>
            <!-- 寬銅導線中央下陷 -->
            <path d="M 95,80 Q 155,105 215,80 L 215,220 L 95,220 Z" fill="#f59e0b"/>
            <text x="155" y="125" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700" data-ink="halo">${lang === 'en' ? svgTextLines("Elastic pad bends down,\ndepressing the center", 155, 125, 17) : "研磨墊彈性下彎造成中央凹陷"}</text>
          </g>

          <!-- 2. 假圖形填補 (Dummy Metal Fill) -->
          <g transform="translate(430, 40)">
            <rect x="0" y="0" width="310" height="260" rx="4" fill="#131e2b" stroke="#10b981"/>
            <text x="155" y="26" text-anchor="middle" fill="#10b981" font-size="13" font-weight="700">${lang === 'en' ? "Dummy metal fill" : "假圖形填補 (Dummy Metal Fill)"}</text>
            <!-- 均勻平整表面 -->
            <rect x="25" y="80" width="260" height="140" fill="#334155"/>
            <!-- 均勻分佈之虛擬金屬方塊 -->
            <g fill="#10b981">
              <rect x="45" y="80" width="25" height="140"/><rect x="85" y="80" width="25" height="140"/>
              <rect x="125" y="80" width="25" height="140"/><rect x="165" y="80" width="25" height="140"/>
              <rect x="205" y="80" width="25" height="140"/><rect x="245" y="80" width="25" height="140"/>
            </g>
            <text x="155" y="125" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${lang === 'en' ? svgTextLines("Dummy fill balances pattern density\nSchematic; not a flatness guarantee", 155, 125, 17) : "虛設填補平衡圖形密度 · 示意非平坦度保證"}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Illustrative pattern density" : "圖形密度教學示例 (Pattern Density)"}</div>
          <div class="eng-obj-metric-value">35% ~ 50%</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Example only; apply the qualified process design rules." : "僅為示例；實際限制應依已驗證製程的設計規則。"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Maximum allowed dishing depth" : "最大允許碟化深度 (Dishing Spec)"}</div>
          <div class="eng-obj-metric-value">&lt; 15 nm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Avoids poor upper-layer lithography focus and impedance variation" : "避免上層微影對焦不良與阻抗波動"}</div>
        </div>
      `;

      footerNote = t.ch08_defects_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh08Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 08</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh08Title">${t.ch08_title}</h2>
          <p class="eng-obj-subtitle">${t.ch08_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'kinematics' ? 'is-active' : ''}" data-tab="kinematics">${t.ch08_tab_kinematics}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'micro' ? 'is-active' : ''}" data-tab="micro">${t.ch08_tab_micro}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'defects' ? 'is-active' : ''}" data-tab="defects">${t.ch08_tab_defects}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'FEOL/BEOL & 3D Hybrid Bond CMP' : '全域與 3D 混合鍵合 CMP 條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'STI · RMG · 3-Step Cu · 3D Recess' : 'STI · RMG · 3-Step Cu · 3D Recess'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'STI ceria, RMG gate, 3-step Cu CMP & 3D SoIC 1–3nm Cu dishing control' : 'STI 氧化鈰、RMG 定高、雙鑲嵌銅三步研磨與 3D SoIC 1–3nm 銅碟化精控'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Preston & Hybrid Bond Thermal Law' : 'Preston 與混合鍵合熱膨脹律 (CMP Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'MRR = Kp·P·V · Δh_Cu = Δα·H·ΔT' : 'MRR = Kp·P·V · Δh_Cu = Δα·H·ΔT'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Preston pattern-density pressure & 1–3 nm Cu thermal bridging' : 'Preston 局部有效壓力與 3D 混合鍵合 1–3 nm 銅凹陷熱膨脹橋接'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Cu dishing · Scratches · Recess (example: 1.5 nm)' : '銅碟化 · 刮痕 · 凹陷（示例：1.5 nm）'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'For dishing, review pattern density; for scratches, slurry particle control; for hybrid-bond recess, CMP endpoint control. Qualify actions for each process.' : '碟化應檢查圖形密度，刮痕應檢查研磨液粒子控制，混合鍵合凹陷應檢查 CMP 終點控制；改善措施須依各製程驗證。'}</div>
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
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    const pSlider = container.querySelector('#ch08Pressure');
    if (pSlider) {
      bindEngineeringEvent(pSlider, 'input', (e) => {
        pressure = parseFloat(e.target.value);
        update();
      });
    }
    const sSlider = container.querySelector('#ch08Speed');
    if (sSlider) {
      bindEngineeringEvent(sSlider, 'input', (e) => {
        speed = parseInt(e.target.value, 10);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 7. Ch 10 金屬化雙載子鑲嵌與電遷移模型 (BEOL Dual Damascene & EM)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderCMPObject as render };
