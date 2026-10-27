import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderTransistor3DObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeGen = 'finfet'; // 'planar' | 'finfet' | 'gaa'
  let finHeight = 45; // nm (30 ~ 65 nm)
  let finWidth = 6; // nm (4 ~ 12 nm)
  let nsWidth = 35; // nm (20 ~ 55 nm)
  let nsLayers = 3; // 2 ~ 4 layers

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    let controlsHtml = '';

    // 物理量計算
    let weffNm = 100;
    let ssMvDec = 92.0;
    let ionRatio = 1.0;
    const tNs = 5; // 奈米片厚度 5nm

    if (activeGen === 'planar') {
      weffNm = 100;
      ssMvDec = 92.5;
      ionRatio = 1.0;
    } else if (activeGen === 'finfet') {
      weffNm = 2 * finHeight + finWidth;
      // 隨鰭片變薄，靜電控制更強，SS 更低
      ssMvDec = 62.0 + 1.1 * (finWidth - 4) + 0.08 * (65 - finHeight);
      ionRatio = (weffNm / 100) * Math.pow(85 / ssMvDec, 1.1);
      controlsHtml = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 10px; padding: 12px; background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px solid rgba(56, 189, 248, 0.2);">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch12_fin_height_slider}</span>
              <span style="color: #38bdf8; font-weight: 750; font-family: monospace;">${finHeight} nm</span>
            </div>
            <input type="range" id="ch12FinHeightSlider" min="30" max="65" step="1" value="${finHeight}" style="width: 100%; accent-color: #0ea5e9; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>30 nm (初期節點)</span>
              <span>45 nm (成熟 FinFET)</span>
              <span>65 nm (極致高深寬比)</span>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch12_fin_width_slider}</span>
              <span style="color: #10b981; font-weight: 750; font-family: monospace;">${finWidth} nm</span>
            </div>
            <input type="range" id="ch12FinWidthSlider" min="4" max="12" step="1" value="${finWidth}" style="width: 100%; accent-color: #10b981; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>4 nm (超薄完全空乏)</span>
              <span>6 nm (3nm FinFET)</span>
              <span>12 nm (16nm FinFET)</span>
            </div>
          </div>
        </div>
      `;
    } else {
      // GAA
      weffNm = nsLayers * (2 * nsWidth + 2 * tNs);
      ssMvDec = 60.5 + 35.0 / nsWidth;
      ionRatio = (weffNm / 100) * Math.pow(85 / ssMvDec, 1.25);
      controlsHtml = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 10px; padding: 12px; background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px solid rgba(56, 189, 248, 0.2);">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch12_ns_width_slider}</span>
              <span style="color: #38bdf8; font-weight: 750; font-family: monospace;">${nsWidth} nm</span>
            </div>
            <input type="range" id="ch12NsWidthSlider" min="20" max="55" step="1" value="${nsWidth}" style="width: 100%; accent-color: #0ea5e9; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>20 nm (低功耗窄片)</span>
              <span>35 nm (標稱 GAA)</span>
              <span>55 nm (高驅動寬片)</span>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch12_ns_layers_slider}</span>
              <span style="color: #f59e0b; font-weight: 750; font-family: monospace;">${nsLayers} 層 (Tiers)</span>
            </div>
            <input type="range" id="ch12NsLayersSlider" min="2" max="4" step="1" value="${nsLayers}" style="width: 100%; accent-color: #f59e0b; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>2 層 (超薄)</span>
              <span>3 層 (主流 A16/N2)</span>
              <span>4 層 (極限密度)</span>
            </div>
          </div>
        </div>
      `;
    }

    if (activeGen === 'planar') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2D Planar MOSFET 3D Cutaway">
          <g transform="translate(180, 80)">
            <!-- 3D 等角投影基底 (Silicon Substrate Base) -->
            <polygon points="220,40 380,120 180,220 20,140" fill="#334155" stroke="#475569" stroke-width="1.2"/>
            <polygon points="20,140 180,220 180,260 20,180" fill="#1e293b" stroke="#334155"/>
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
            <polygon points="175,70 235,100 175,130 115,100" fill="#64748b" stroke="#94a3b8"/>
            <polygon points="115,100 175,130 175,145 115,115" fill="#475569" stroke="#64748b"/>
            <polygon points="175,130 235,100 235,115 175,145" fill="#334155" stroke="#64748b"/>
            <text x="175" y="95" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">Gate 閘極</text>

            <!-- 漏電路徑標註 -->
            <path d="M 100,165 Q 180,210 260,135" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
            <text x="180" y="205" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700">基底短通道穿透漏電 (DIBL Leakage)</text>

            <!-- 物理標籤浮水印 -->
            <rect x="230" y="20" width="180" height="42" rx="4" fill="#0f172a" opacity="0.85" stroke="#ef4444" stroke-width="1"/>
            <text x="320" y="38" text-anchor="middle" fill="#f87171" font-size="10.5" font-weight="750">SS = ln(10)·(kT/q)·(1+Cd/Cox)</text>
            <text x="320" y="52" text-anchor="middle" fill="#cbd5e1" font-size="9.5">SS ≈ ${ssMvDec.toFixed(1)} mV/dec (開關關不緊)</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_gate_wrap}</div>
          <div class="eng-obj-metric-value">1 面控制 (Top Gate)</div>
          <div class="eng-obj-metric-note">僅覆蓋二維通道頂部表面</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_ss_calc_label}</div>
          <div class="eng-obj-metric-value" style="color: #ef4444; font-family: monospace;">${ssMvDec.toFixed(1)} mV/dec</div>
          <div class="eng-obj-metric-note">次臨界漏電高，關態待機功耗龐大</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_weff_label}</div>
          <div class="eng-obj-metric-value">${weffNm} nm (基準 1.0x)</div>
          <div class="eng-obj-metric-note">受限於水平二維佈局面積</div>
        </div>
      `;
      footerNote = t.ch12_planar_desc;
    } else if (activeGen === 'finfet') {
      const finScaleH = (finHeight / 45);
      const finVisualH = Math.round(50 * finScaleH);
      const finVisualW = Math.max(4, Math.round(finWidth * 1.2));

      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D FinFET Isometric Cutaway">
          <g transform="translate(180, 80)">
            <!-- 3D 矽基底 (Substrate) -->
            <polygon points="220,50 380,130 180,230 20,150" fill="#334155" stroke="#475569" stroke-width="1.2"/>
            <polygon points="20,150 180,230 180,270 20,190" fill="#1e293b" stroke="#334155"/>
            <polygon points="180,230 380,130 380,170 180,270" fill="#0f172a" stroke="#334155"/>

            <!-- 垂直立起的立體矽鰭片 (Vertical Silicon Fin) 依 H_fin 與 W_fin 連續變化 -->
            <polygon points="80,${150 - finVisualH} 320,${120 - finVisualH} 320,150 80,180" fill="#0284c7" opacity="0.6"/>
            <polygon points="80,${150 - finVisualH} ${80 + finVisualW * 4},${135 - finVisualH} 320,${120 - finVisualH} ${320 - finVisualW * 4},${135 - finVisualH}" fill="#38bdf8"/>
            <polygon points="80,${150 - finVisualH} 80,180 ${80 + finVisualW * 4},165 ${80 + finVisualW * 4},${135 - finVisualH}" fill="#0369a1"/>

            <!-- 閘極立體三面包覆 (Tri-Gate: 跨坐包覆頂面、左側面、右側面) -->
            <polygon points="180,${70 - finVisualH} 240,${100 - finVisualH} 240,170 180,140" fill="#64748b" opacity="0.9" stroke="#94a3b8"/>
            <polygon points="180,${70 - finVisualH} 200,${60 - finVisualH} 260,${90 - finVisualH} 240,${100 - finVisualH}" fill="#94a3b8"/>
            <polygon points="240,${100 - finVisualH} 260,${90 - finVisualH} 260,160 240,170" fill="#475569"/>

            <!-- 標註立體三面包覆 -->
            <text x="210" y="${55 - finVisualH}" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">
              Tri-Gate 三面立體包覆 (H_fin = ${finHeight}nm, W_fin = ${finWidth}nm)
            </text>
            <path d="M 210,${62 - finVisualH} L 210,${90 - finVisualH}" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2 2"/>

            <!-- 源極與汲極磊晶塊 (Raised Epitaxial S/D) -->
            <polygon points="90,110 130,90 140,140 100,160" fill="#f59e0b"/>
            <text x="75" y="165" fill="#f59e0b" font-size="11" font-weight="700" data-ink="halo">Source</text>

            <polygon points="270,75 310,55 320,105 280,125" fill="#f59e0b"/>
            <text x="325" y="70" fill="#f59e0b" font-size="11" font-weight="700">Drain</text>

            <!-- 物理公式標籤 -->
            <text x="200" y="215" text-anchor="middle" fill="#71ece3" font-size="11.5" font-weight="750">
              W_eff = 2·H_fin + W_fin = 2×${finHeight} + ${finWidth} = ${weffNm} nm (${ionRatio.toFixed(2)}x 電流)
            </text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_weff_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark); font-family: monospace;">
            ${weffNm} nm (${ionRatio.toFixed(2)}x Ion)
          </div>
          <div class="eng-obj-metric-note">Weff = 2·H_fin + W_fin · 驅動能力大增</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_ss_calc_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal); font-family: monospace;">
            ${ssMvDec.toFixed(1)} mV/dec
          </div>
          <div class="eng-obj-metric-note">三面靜電抑制 · 漏電流較平面驟降 10 倍</div>
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
      const nsScaleW = (nsWidth / 35);
      const nsVisualW = Math.round(30 * nsScaleW);

      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D GAA Nanosheet Isometric Cutaway">
          <g transform="translate(180, 80)">
            <!-- 3D 矽基底 (Substrate) -->
            <polygon points="220,50 380,130 180,230 20,150" fill="#334155" stroke="#475569" stroke-width="1.2"/>
            <polygon points="20,150 180,230 180,270 20,190" fill="#1e293b" stroke="#334155"/>
            <polygon points="180,230 380,130 380,170 180,270" fill="#0f172a" stroke="#334155"/>

            <!-- 垂直堆疊的 N 層水平奈米片通道 (Stacked Nanosheets: 厚 5nm, 寬 W_ns) -->
            ${Array.from({ length: nsLayers }, (_, idx) => {
              const yOffset = 70 + idx * 24;
              return `
                <g>
                  <polygon points="90,${yOffset} ${310 + nsVisualW},${yOffset - 30} ${330 + nsVisualW},${yOffset - 20} 110,${yOffset + 10}" fill="#38bdf8"/>
                  <text x="75" y="${yOffset + 8}" fill="#38bdf8" font-size="9" font-weight="700">Tier ${nsLayers - idx}</text>
                </g>
              `;
            }).join('')}

            <!-- 閘極金屬 360° 全方位穿插環繞包覆 (Gate-All-Around) -->
            <path d="M 180,30 L 240,60 L 240,165 L 180,135 Z" fill="#64748b" opacity="0.8" stroke="#38bdf8" stroke-width="1.2"/>
            <!-- 穿插在奈米片間隙中的閘極金屬 -->
            ${Array.from({ length: nsLayers }, (_, idx) => {
              const yRect = 75 + idx * 24;
              return `<rect x="195" y="${yRect}" width="30" height="7" fill="#10b981" opacity="0.9"/>`;
            }).join('')}

            <text x="210" y="20" text-anchor="middle" fill="#10b981" font-size="12" font-weight="750">
              GAA 360° 全環繞閘極 (${nsLayers}層奈米片 · 寬度 ${nsWidth}nm)
            </text>
            <text x="355" y="45" fill="#38bdf8" font-size="11" font-weight="700">
              W_eff = ${nsLayers}×(2×${nsWidth}+10) = ${weffNm} nm
            </text>

            <!-- 次世代背面供電網路 (BSPDN) -->
            <path d="M 100,240 L 100,275 M 260,190 L 260,275" stroke="#f59e0b" stroke-width="3"/>
            <path d="M 100,275 L 100,238 M 260,275 L 260,188" stroke="#fde047" stroke-width="2" stroke-dasharray="5 5" class="anim-data-flow"/>
            <text x="180" y="260" text-anchor="middle" fill="#f59e0b" font-size="11.5" font-weight="700">背面供電網路 (BSPDN / SuperPower Rail)</text>
            <text x="180" y="278" text-anchor="middle" fill="#94a3b8" font-size="10.5">電源線移至晶圓背部 · 正面純繞訊號</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_weff_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark); font-family: monospace;">
            ${weffNm} nm (${ionRatio.toFixed(2)}x Ion)
          </div>
          <div class="eng-obj-metric-note">Weff = N·(2W_ns + 2T_ns) · 超高飽和電流</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_ss_calc_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal); font-family: monospace;">
            ${ssMvDec.toFixed(1)} mV/dec
          </div>
          <div class="eng-obj-metric-note">逼近理論極限 (60 mV/dec) · 零漏電死區</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_node_span}</div>
          <div class="eng-obj-metric-value">2nm (N2 / A16 / 18A)</div>
          <div class="eng-obj-metric-note">結合背面供電 (BSPDN) 邁入埃米時代</div>
        </div>
      `;
      footerNote = t.ch12_gaa_desc;
    }

    renderEngineeringCard(container, `
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
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'BSPDN & 3D Device Clauses' : '背面供電與單石 3D 電晶體條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">PowerVia · SPR · BSPDN · CFET</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Intel PowerVia (nTSV), TSMC SPR (A16), Samsung BSPDN, 3D CFET' : '含 Intel PowerVia (nTSV)、TSMC SPR、Samsung BSPDN、CFET 垂直堆疊'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Natural Length λ_N & GAA Weff Law' : '自然靜電長度與有效通道寬度律 (GAA Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'λ_GAA < λ_Fin < λ_Planar · Weff = 2N(W+T)' : 'λ_GAA < λ_Fin < λ_Planar · Weff = 2N(W+T)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Lg ≥ 5λN suppresses DIBL while N-stack nanosheets multiply Weff' : '閘極長度 Lg ≥ 5λN 壓制 DIBL 與 GAA 垂直堆疊有效寬度倍增'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Dry SiGe Release · BDI · nTSV Overlay' : 'Dry SiGe Release · BDI · nTSV Overlay'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Prevents GAA sheet stiction, sub-sheet leakage (BDI) & BSPDN overlay drift' : '以氣相無水蝕刻防奈米片沾黏、BDI 底部絕緣防漏電與紅外線對準鎖定背面供電'}</div>
          </div>
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `, t);

    // 綁定事件
    container.querySelectorAll('[data-gen]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activeGen = btn.getAttribute('data-gen');
        update();
      });
    });

    const finHSlider = container.querySelector('#ch12FinHeightSlider');
    if (finHSlider) {
      bindEngineeringEvent(finHSlider, 'input', e => {
        finHeight = parseInt(e.target.value, 10);
        update();
      });
    }

    const finWSlider = container.querySelector('#ch12FinWidthSlider');
    if (finWSlider) {
      bindEngineeringEvent(finWSlider, 'input', e => {
        finWidth = parseInt(e.target.value, 10);
        update();
      });
    }

    const nsWSlider = container.querySelector('#ch12NsWidthSlider');
    if (nsWSlider) {
      bindEngineeringEvent(nsWSlider, 'input', e => {
        nsWidth = parseInt(e.target.value, 10);
        update();
      });
    }

    const nsLSlider = container.querySelector('#ch12NsLayersSlider');
    if (nsLSlider) {
      bindEngineeringEvent(nsLSlider, 'input', e => {
        nsLayers = parseInt(e.target.value, 10);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 5. Ch 07 離子佈植機光路偏轉與晶格退火活化模型 (Ion Implantation & Anneal)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderTransistor3DObject as render };
