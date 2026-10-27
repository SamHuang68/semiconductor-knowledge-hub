import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderPlasmaEtchObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'chamber'; // 'chamber' | 'profile' | 'anomalies'
  let rfSourcePower = 800; // 200 ~ 1500 W (ICP Coil: Controls Plasma Density)
  let rfBiasPower = 250;   // 0 ~ 600 W (Chuck Bias: Controls Ion Kinetic Energy)
  let chamberPressure = 15; // 2 ~ 80 mTorr (Pressure: Mean free path & collisions)

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'chamber') {
      const plasmaBrightness = 0.35 + (rfSourcePower / 1500) * 0.6;
      const biasVoltage = rfBiasPower === 0 ? 0 : Math.round(50 + 26 * Math.sqrt(rfBiasPower));
      const ionFlux = ((rfSourcePower / 1000) * 1.5).toFixed(2);
      const sheathThickness = Math.round(16 + Math.sqrt(biasVoltage) * 0.55);
      const ionArrowLength = Math.round(14 + (biasVoltage / 700) * 22);

      controlsHtml = `
        <div class="eng-obj-slider-cluster">
          <div class="eng-obj-slider-unit">
            <div class="eng-obj-slider-header">
              <span class="eng-obj-slider-label">${t.ch06_rf_source_label}</span>
              <span class="eng-obj-slider-val" id="rfSourceVal">${rfSourcePower} W</span>
            </div>
            <input type="range" class="eng-obj-slider" id="rfSourceSlider" min="200" max="1500" step="50" value="${rfSourcePower}" aria-label="RF Source Power">
          </div>
          <div class="eng-obj-slider-unit">
            <div class="eng-obj-slider-header">
              <span class="eng-obj-slider-label">${t.ch06_rf_bias_label}</span>
              <span class="eng-obj-slider-val" id="rfBiasVal">${rfBiasPower} W</span>
            </div>
            <input type="range" class="eng-obj-slider" id="rfBiasSlider" min="0" max="600" step="10" value="${rfBiasPower}" aria-label="RF Bias Power">
          </div>
        </div>
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ICP Plasma Chamber Live Engine">
          <!-- 腔體外壁 (Chamber Wall) -->
          <rect x="180" y="20" width="440" height="420" rx="8" fill="#09131b" stroke="#334155" stroke-width="2"/>

          <!-- 頂部氣體噴淋板 (Showerhead) -->
          <rect x="240" y="30" width="320" height="20" rx="3" fill="#334155" stroke="#64748b"/>
          <!-- 噴淋小孔與氣體通入 -->
          <g fill="#38bdf8">
            <circle cx="280" cy="40" r="2.5"/><circle cx="320" cy="40" r="2.5"/><circle cx="360" cy="40" r="2.5"/>
            <circle cx="400" cy="40" r="2.5"/><circle cx="440" cy="40" r="2.5"/><circle cx="480" cy="40" r="2.5"/><circle cx="520" cy="40" r="2.5"/>
          </g>
          <text x="400" y="24" text-anchor="middle" fill="#94a3b8" font-size="11" data-ink="halo">${t.ch06_showerhead}</text>

          <!-- ICP 高頻感應線圈 (13.56 MHz Coil) -->
          <g stroke="#f59e0b" stroke-width="3" fill="none">
            <circle cx="220" cy="110" r="14" opacity="${0.4 + (rfSourcePower / 1500) * 0.6}"/>
            <circle cx="220" cy="150" r="14" opacity="${0.4 + (rfSourcePower / 1500) * 0.6}"/>
            <circle cx="580" cy="110" r="14" opacity="${0.4 + (rfSourcePower / 1500) * 0.6}"/>
            <circle cx="580" cy="150" r="14" opacity="${0.4 + (rfSourcePower / 1500) * 0.6}"/>
          </g>
          <text x="160" y="135" text-anchor="end" fill="#f59e0b" font-size="11.5" font-weight="700">ICP RF Source Coil</text>
          <text x="160" y="150" text-anchor="end" fill="#94a3b8" font-size="10.5">13.56 MHz (${rfSourcePower} W)</text>

          <!-- 高密度電漿輝光區 (Plasma Glow Discharge) -->
          <ellipse cx="400" cy="170" rx="${140 + (rfSourcePower / 1500) * 45}" ry="${70 + (rfSourcePower / 1500) * 25}" fill="rgba(113, 236, 227, ${plasmaBrightness})" filter="drop-shadow(0 0 18px rgba(56, 189, 248, 0.75))" class="anim-plasma"/>
          <text x="400" y="165" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700">${t.ch06_plasma_glow}</text>
          <text x="400" y="185" text-anchor="middle" fill="#e0f2fe" font-size="11.5">離子通量: ${ionFlux} × 10¹¹ cm⁻³ | 自由基: F*, Cl*</text>

          <!-- 電漿鞘層 (Plasma Sheath - 暗區電壓降) -->
          <rect x="240" y="${295 - sheathThickness}" width="320" height="${sheathThickness}" fill="rgba(15, 23, 42, 0.75)" stroke="#0284c7" stroke-dasharray="4 3"/>
          <text x="575" y="${295 - sheathThickness / 2 + 4}" fill="#38bdf8" font-size="11">${t.ch06_sheath} (-Vdc: ${biasVoltage} V)</text>

          <!-- 離子加速垂直箭頭 -->
          <g stroke="#71ece3" stroke-width="${1.5 + (rfBiasPower / 600) * 2.0}" opacity="0.9">
            <line x1="320" y1="${295 - sheathThickness}" x2="320" y2="${295 - sheathThickness + ionArrowLength}"/>
            <line x1="360" y1="${295 - sheathThickness}" x2="360" y2="${295 - sheathThickness + ionArrowLength}"/>
            <line x1="400" y1="${295 - sheathThickness}" x2="400" y2="${295 - sheathThickness + ionArrowLength}"/>
            <line x1="440" y1="${295 - sheathThickness}" x2="440" y2="${295 - sheathThickness + ionArrowLength}"/>
            <line x1="480" y1="${295 - sheathThickness}" x2="480" y2="${295 - sheathThickness + ionArrowLength}"/>
          </g>

          <!-- 300mm 晶圓載台與靜電吸盤 (ESC) -->
          <rect x="250" y="295" width="300" height="8" rx="2" fill="#38bdf8"/>
          <text x="160" y="302" text-anchor="end" fill="#38bdf8" font-size="12" font-weight="700">300mm 晶圓</text>
          
          <rect x="230" y="305" width="340" height="45" rx="3" fill="#1e293b" stroke="#0284c7" stroke-width="1.5"/>
          <text x="400" y="325" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700">${t.ch06_esc}</text>
          <text x="400" y="342" text-anchor="middle" fill="#94a3b8" font-size="11">He 背面氦氣冷卻 (10 Torr, 25°C)</text>

          <!-- 下方 RF 偏壓產生器 (RF Bias Generator) -->
          <rect x="330" y="365" width="140" height="30" rx="3" fill="#0f172a" stroke="#0284c7"/>
          <text x="400" y="384" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="700">RF Bias (${rfBiasPower} W)</text>
          <path d="M 400,350 L 400,365" stroke="#0284c7" stroke-width="2"/>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">RF Source Power (${rfSourcePower} W)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${ionFlux} × 10¹¹ cm⁻³</div>
          <div class="eng-obj-metric-note">直接調控電漿離子通量 (Ion Density)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">自偏壓 Self-Bias (-Vdc)</div>
          <div class="eng-obj-metric-value" style="color: #f59e0b;">-${biasVoltage} V</div>
          <div class="eng-obj-metric-note">垂直加速正離子之轟擊動能 (${biasVoltage} eV)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">RF 雙頻解耦架構</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">獨立解耦</div>
          <div class="eng-obj-metric-note">高頻產離子 · 低頻拉動能 · 兼顧速率與選擇比</div>
        </div>
      `;

      footerNote = t.ch06_etch_footer;
    } else if (activeTab === 'profile') {
      const biasVoltage = rfBiasPower === 0 ? 0 : Math.round(50 + 26 * Math.sqrt(rfBiasPower));
      const mfp = Math.round(500 / chamberPressure); // µm
      // 異向性因子 A = 1 - R_L / R_V
      const rawAnisotropy = 1 - (chamberPressure / 80) * 0.7 + (biasVoltage / 700) * 0.45;
      const anisotropy = Math.max(0.15, Math.min(0.99, rawAnisotropy));
      const profileAngle = (72.0 + anisotropy * 17.8).toFixed(1); // 72.0° ~ 89.8°
      const undercutNm = Math.max(0, Math.round((1 - anisotropy) * 55)); // 0 ~ 45 nm

      controlsHtml = `
        <div class="eng-obj-slider-cluster">
          <div class="eng-obj-slider-unit">
            <div class="eng-obj-slider-header">
              <span class="eng-obj-slider-label">${t.ch06_rf_bias_label}</span>
              <span class="eng-obj-slider-val" id="biasPowerVal">${rfBiasPower} W</span>
            </div>
            <input type="range" class="eng-obj-slider" id="biasPowerSlider" min="0" max="600" step="10" value="${rfBiasPower}" aria-label="RF Bias Power">
          </div>
          <div class="eng-obj-slider-unit">
            <div class="eng-obj-slider-header">
              <span class="eng-obj-slider-label">${t.ch06_pressure_label}</span>
              <span class="eng-obj-slider-val" id="pressureVal">${chamberPressure} mTorr</span>
            </div>
            <input type="range" class="eng-obj-slider" id="pressureSlider" min="2" max="80" step="1" value="${chamberPressure}" aria-label="Chamber Pressure">
          </div>
        </div>
      `;

      // 溝槽截面動態座標
      const leftMaskEdge = 170;
      const rightMaskEdge = 310;
      const trenchBottomY = 270;
      const trenchTopY = 40;
      const undercutOffset = undercutNm * 0.6;
      const botOffset = Math.round((90 - parseFloat(profileAngle)) * 1.5);

      const pathData = `
        M 30,${trenchTopY}
        L ${leftMaskEdge},${trenchTopY}
        C ${leftMaskEdge - undercutOffset},${trenchTopY + 30} ${leftMaskEdge + botOffset},${trenchBottomY - 40} ${leftMaskEdge + botOffset},${trenchBottomY}
        L ${rightMaskEdge - botOffset},${trenchBottomY}
        C ${rightMaskEdge - botOffset},${trenchBottomY - 40} ${rightMaskEdge + undercutOffset},${trenchTopY + 30} ${rightMaskEdge},${trenchTopY}
        L 450,${trenchTopY}
        L 450,330
        L 30,330
        Z
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anisotropic Etch Profile Live Engine">
          <g transform="translate(160, 35)">
            <!-- 矽基底與動態輪廓溝槽 -->
            <path d="${pathData}" fill="#1e293b" stroke="#334155" stroke-width="2"/>

            <!-- 光阻遮罩 (Photoresist Mask) -->
            <rect x="30" y="0" width="${leftMaskEdge - 30}" height="40" fill="#f59e0b" opacity="0.9"/>
            <rect x="${rightMaskEdge}" y="0" width="${450 - rightMaskEdge}" height="40" fill="#f59e0b" opacity="0.9"/>
            <text x="100" y="25" text-anchor="middle" fill="#09131b" font-size="12" font-weight="700">光阻遮罩 (PR)</text>
            <text x="380" y="25" text-anchor="middle" fill="#09131b" font-size="12" font-weight="700">光阻遮罩 (PR)</text>

            <!-- 側壁鈍化聚合物膜 (Passivation Film, 如 CFx) -->
            ${anisotropy > 0.65 ? `
              <path d="M ${leftMaskEdge},${trenchTopY} C ${leftMaskEdge - undercutOffset},${trenchTopY + 30} ${leftMaskEdge + botOffset},${trenchBottomY - 40} ${leftMaskEdge + botOffset},${trenchBottomY}" fill="none" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
              <path d="M ${rightMaskEdge},${trenchTopY} C ${rightMaskEdge + undercutOffset},${trenchTopY + 30} ${rightMaskEdge - botOffset},${trenchBottomY - 40} ${rightMaskEdge - botOffset},${trenchBottomY}" fill="none" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
              <text x="135" y="160" fill="#10b981" font-size="11" font-weight="700">側壁 CFx 鈍化膜</text>
            ` : `
              <text x="135" y="160" fill="#ef4444" font-size="11" font-weight="700">鈍化不足 (底切)</text>
            `}

            <!-- 垂直高能離子轟擊 (打擊底部) -->
            <g stroke="#38bdf8" stroke-width="${1.5 + (biasVoltage / 700) * 2}" opacity="0.9">
              <line x1="210" y1="10" x2="210" y2="255" stroke-dasharray="5 3"/>
              <line x1="240" y1="10" x2="240" y2="255" stroke-dasharray="5 3"/>
              <line x1="270" y1="10" x2="270" y2="255" stroke-dasharray="5 3"/>
            </g>
            <text x="240" y="100" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="700">垂直離子轟擊 (Ar⁺, CF₃⁺)</text>

            <!-- 底部化學揮發反應 (SiF4) -->
            <text x="240" y="265" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">反應脫附 (SiF₄ ↑)</text>
            
            <!-- 垂直度與角度標註 -->
            <text x="${rightMaskEdge - botOffset - 15}" y="${trenchBottomY - 15}" fill="${anisotropy > 0.85 ? '#10b981' : '#f59e0b'}" font-size="13" font-weight="750">
              ${profileAngle}°
            </text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch06_sidewall_angle}</div>
          <div class="eng-obj-metric-value" style="color: ${parseFloat(profileAngle) >= 88 ? 'var(--semi-teal)' : '#f59e0b'};">${profileAngle}°</div>
          <div class="eng-obj-metric-note">${parseFloat(profileAngle) >= 88 ? '高度非等向性 (Vertical)' : '等向性擴散側蝕增加'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch06_anisotropy_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${anisotropy.toFixed(2)}</div>
          <div class="eng-obj-metric-note">平均自由程 λ_mfp: ~${mfp} µm</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch06_undercut_depth}</div>
          <div class="eng-obj-metric-value" style="color: ${undercutNm > 15 ? '#ef4444' : '#10b981'};">${undercutNm} nm</div>
          <div class="eng-obj-metric-note">${undercutNm === 0 ? '完美側壁零掏空保護' : '氣壓過高導致橫向侵蝕'}</div>
        </div>
      `;

      footerNote = '非等向性蝕刻的核心在於「物理離子轟擊打碎底部晶格 + 化學自由基結合揮發 + 側壁鈍化膜保護免於橫向掏空」，三位一體實現深寬比超過 20:1 的筆直奈米溝槽。';
    } else {
      // 異常與微負載效應 (Anomalies & RIE Lag)
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Etch Anomalies">
          <!-- 1. 正常垂直 (Ideal) -->
          <g transform="translate(60, 70)">
            <text text-anchor="middle" fill="#10b981" font-size="12" font-weight="700">${svgTextLines(t.ch06_profile_ideal.replace(' Anisotropic ', '\nAnisotropic ').replace(' (', '\n('), 70, -35)}</text>
            <path d="M 10,40 L 45,40 L 45,220 L 95,220 L 95,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
            <rect x="10" y="25" width="35" height="15" fill="#f59e0b"/>
            <rect x="95" y="25" width="35" height="15" fill="#f59e0b"/>
          </g>

          <!-- 2. 底切掏空 (Undercut) -->
          <g transform="translate(240, 70)">
            <text text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">${svgTextLines(t.ch06_profile_undercut.replace(' (', '\n('), 70, -35)}</text>
            <path d="M 10,40 L 45,40 Q 20,110 45,220 L 95,220 Q 120,110 95,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <rect x="10" y="25" width="35" height="15" fill="#f59e0b"/>
            <rect x="95" y="25" width="35" height="15" fill="#f59e0b"/>
          </g>

          <!-- 3. 側壁鼓出 (Bowing) -->
          <g transform="translate(420, 70)">
            <text text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="700">${svgTextLines(t.ch06_profile_bowing.replace(' (', '\n('), 70, -35)}</text>
            <path d="M 10,40 L 45,40 Q 30,100 45,220 L 95,220 Q 110,100 95,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <rect x="10" y="25" width="35" height="15" fill="#f59e0b"/>
            <rect x="95" y="25" width="35" height="15" fill="#f59e0b"/>
          </g>

          <!-- 4. RIE 延遲 (RIE Lag) -->
          <g transform="translate(600, 70)">
            <text text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">${svgTextLines(t.ch06_profile_lag.replace(' / ', '\n/ ').replace(' (', '\n('), 70, -35)}</text>
            <!-- 寬槽 (深) -->
            <path d="M 10,40 L 30,40 L 30,220 L 70,220 L 70,40 L 85,40 L 85,150 L 105,150 L 105,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="50" y="235" text-anchor="middle" fill="#38bdf8" font-size="10">寬槽深</text>
            <text x="95" y="165" text-anchor="middle" fill="#ef4444" font-size="10">窄孔淺</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
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

    renderEngineeringCard(container, `
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
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Plasma & 3D Etch Clauses' : '電漿與 3D 蝕刻條例 (Etch Clauses)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'CCP/ICP · Cryo-HAR · Bosch · ALE' : 'CCP/ICP · Cryo-HAR · Bosch · ALE'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'CCP/ICP RIE, 3D NAND Cryo-HAR, 3D TSV Bosch DRIE & GAA ALE release' : 'CCP/ICP 雙頻解耦、3D NAND 極低溫深孔、3D TSV 波希蝕刻與 GAA ALE'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Sheath, ARDE & ALE Synergy Law' : '鞘層準直與原子層協同律 (Etch Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'd_sh ∝ Vdc^(3/4) · Synergy S > 95%' : 'd_sh ∝ Vdc^(3/4) · Synergy S > 95%'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Child-Langmuir sheath, Knudsen ARDE lag & ALE synergy > 95%' : 'Child-Langmuir 電漿鞘層準直、ARDE 克努森衰減與 ALE 自限協同'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Foot Notch · 3D Bowing · RIE Lag' : 'Foot Notch · 3D Bowing · RIE Lag'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Suppresses charging foot-notching, high-AR bowing & RIE Lag via pulsed/ALE' : '以脈衝電漿消除底部充電切角、超低溫冷凍抑制深孔鼓出與 ALE 克服延遲'}</div>
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

    // 綁定連續物理滑桿事件
    if (activeTab === 'chamber') {
      const srcSlider = container.querySelector('#rfSourceSlider');
      const biasSlider = container.querySelector('#rfBiasSlider');
      if (srcSlider) {
        bindEngineeringEvent(srcSlider, 'input', e => {
          rfSourcePower = Number(e.target.value);
          update();
        });
      }
      if (biasSlider) {
        bindEngineeringEvent(biasSlider, 'input', e => {
          rfBiasPower = Number(e.target.value);
          update();
        });
      }
    } else if (activeTab === 'profile') {
      const biasSlider = container.querySelector('#biasPowerSlider');
      const pressSlider = container.querySelector('#pressureSlider');
      if (biasSlider) {
        bindEngineeringEvent(biasSlider, 'input', e => {
          rfBiasPower = Number(e.target.value);
          update();
        });
      }
      if (pressSlider) {
        bindEngineeringEvent(pressSlider, 'input', e => {
          chamberPressure = Number(e.target.value);
          update();
        });
      }
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 4. Ch 12 電晶體架構演進立體等角模型 (Planar -> FinFET -> GAA Nanosheet)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderPlasmaEtchObject as render };
