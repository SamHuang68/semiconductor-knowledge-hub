import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderProcessScalingObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'pitch'; // 'pitch' | 'dennard' | 'density'
  let activeNode = 'n3'; // 'n28' | 'n7' | 'n3' | 'a16'
  let vdd = 0.75; // 0.55 ~ 1.80 V
  let nodeLg = 14; // 2 ~ 180 nm

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'pitch') {
      const nodes = {
        n28: { name: '28nm Planar (2011)', cpp: 115, mp: 90, finp: 60, height: 900, dens: '15 MTr/mm²' },
        n7: { name: '7nm FinFET (2018)', cpp: 54, mp: 40, finp: 27, height: 240, dens: '95 MTr/mm²' },
        n3: { name: '3nm FinFET/GAA (2022)', cpp: 45, mp: 22, finp: 21, height: 135, dens: '290 MTr/mm²' },
        a16: { name: 'A16 1.6nm GAA + BSPDN (2026)', cpp: 40, mp: 18, finp: 18, height: 90, dens: '450 MTr/mm²' }
      };
      const cur = nodes[activeNode];

      viewportHtml = `
        <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Process Nodes Pitch Scale Comparison">
          <!-- 節點選擇快捷標籤 -->
          <g transform="translate(60, 20)">
            ${Object.keys(nodes).map((k, i) => `
              <g class="node-btn" data-node="${k}" style="cursor: pointer;" transform="translate(${i * 170}, 0)">
                <rect x="0" y="0" width="160" height="28" rx="4" fill="${activeNode === k ? '#38bdf8' : '#1e293b'}" stroke="${activeNode === k ? '#ffffff' : '#334155'}" stroke-width="1.5"/>
                <text x="80" y="18" text-anchor="middle" fill="${activeNode === k ? '#09131b' : '#cbd5e1'}" font-size="11" font-weight="750">${nodes[k].name.split(' ')[0]}</text>
              </g>
            `).join('')}
          </g>

          <!-- 幾何標尺可視化區 -->
          <g transform="translate(60, 70)">
            <rect x="0" y="0" width="680" height="385" rx="8" fill="#09131b" stroke="#1e293b" stroke-width="1.5"/>

            <!-- 標題與當前節點真實參數 -->
            <text x="30" y="35" fill="#38bdf8" font-size="14" font-weight="800">${cur.name}</text>
            <text x="30" y="55" fill="#94a3b8" font-size="11">真實物理標尺：CPP (接觸多晶矽間距) vs Metal Pitch (最小金屬間距)</text>

            <!-- 左側：真實等比例物理結構示意 (Top-down & Cross-section) -->
            <g transform="translate(50, 80)">
              <!-- 閘極線 (垂直排列) -->
              <text x="0" y="15" fill="#cbd5e1" font-size="11" font-weight="700">垂直閘極線 (Gate Lines / Poly)：</text>
              <g transform="translate(0, 30)">
                ${(() => {
                  // 兩種間距採相同顯示倍率，完整保留三組線形與數值。
                  const scale = (activeNode === 'n28' ? 1.4 : activeNode === 'n7' ? 2.5 : activeNode === 'n3' ? 3.4 : 4.0) * 0.65;
                  const cppPx = cur.cpp * scale;
                  return [0, 1, 2].map(idx => `
                    <rect x="${idx * cppPx}" y="0" width="${18 * scale * 0.4}" height="70" rx="2" fill="#38bdf8" opacity="0.8"/>
                    <line x1="${idx * cppPx}" y1="80" x2="${(idx + 1) * cppPx}" y2="80" stroke="#f59e0b" stroke-width="2"/>
                  `).join('') + `
                    <text x="${cppPx / 2}" y="97" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="800">CPP = ${cur.cpp} nm</text>
                  `;
                })()}
              </g>

              <!-- 底層金屬線 (水平排列) -->
              <g transform="translate(0, 140)">
                <text x="0" y="15" fill="#cbd5e1" font-size="11" font-weight="700">底層最小金屬間距 (M1 Pitch)：</text>
                <g transform="translate(0, 30)">
                  ${(() => {
                    const scale = (activeNode === 'n28' ? 1.4 : activeNode === 'n7' ? 2.5 : activeNode === 'n3' ? 3.4 : 4.0) * 0.65;
                    const mpPx = cur.mp * scale;
                    return [0, 1, 2].map(idx => `
                      <rect x="0" y="${idx * mpPx * 0.7}" width="240" height="${10 * scale * 0.35}" rx="2" fill="#10b981" opacity="0.8"/>
                    `).join('') + `
                      <text x="250" y="${mpPx * 0.7}" fill="#10b981" font-size="11" font-weight="800">M1P = ${cur.mp} nm</text>
                    `;
                  })()}
                </g>
              </g>
            </g>

            <!-- 右側：尺寸比對雷達與真相看板 -->
            <g transform="translate(420, 80)">
              <rect x="0" y="0" width="230" height="210" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="115" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">微縮真相分析 (Reality Check)</text>
              <line x1="20" y1="35" x2="210" y2="35" stroke="#334155" stroke-width="1"/>

              <text x="20" y="60" fill="#94a3b8" font-size="10.5">宣傳節點名：</text>
              <text x="120" y="60" fill="#ffffff" font-size="11" font-weight="700">${nodes[activeNode].name.split(' ')[0]}</text>

              <text x="20" y="85" fill="#94a3b8" font-size="10.5">閘極長度 Lg：</text>
              <text x="120" y="85" fill="#38bdf8" font-size="11" font-weight="700">~12 - 14 nm</text>

              <text x="20" y="110" fill="#94a3b8" font-size="10.5">氧化層厚度 Tox：</text>
              <text x="120" y="110" fill="#10b981" font-size="11" font-weight="700">~1.2 - 1.5 nm</text>

              <text x="20" y="135" fill="#94a3b8" font-size="10.5">邏輯密度：</text>
              <text x="120" y="135" fill="#f59e0b" font-size="11" font-weight="800">${cur.dens}</text>

              <text x="20" y="160" fill="#94a3b8" font-size="10.5">微縮推手：</text>
              <text x="120" y="160" fill="#cbd5e1" font-size="10.5">DTCO + GAA</text>

              <rect x="15" y="175" width="200" height="25" rx="3" fill="#1e293b"/>
              <text x="115" y="192" text-anchor="middle" fill="#ec4899" font-size="10" font-weight="700">「3奈米裡沒有任何尺寸是3nm」</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,310 Q 400,200 680,100" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="9 6" class="anim-data-flow" opacity="0.7"/><circle cx="560" cy="150" r="32" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="5 5" class="anim-beam" opacity="0.65"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch14_metric_cpp}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${cur.cpp} nm</div>
          <div class="eng-obj-metric-note">相鄰閘極中心點物理間隔</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch14_metric_mp}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${cur.mp} nm</div>
          <div class="eng-obj-metric-note">最嚴苛微影金屬連線線寬+間距</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch14_metric_density}</div>
          <div class="eng-obj-metric-value">${cur.dens}</div>
          <div class="eng-obj-metric-note">百萬電晶體 / 平方毫米</div>
        </div>
      `;

      footerNote = t.ch14_pitch_desc;
    } else if (activeTab === 'dennard') {
      // 物理計算：動態功耗 vs 靜態量子穿隧漏電
      const tox = 0.03 * nodeLg + 0.6; // nm
      const fGhz = Math.min(5.2, 0.6 + 2.6 * (vdd / 1.0) * (35 / (nodeLg + 10)));
      const pDyn = Math.round(90 * Math.pow(vdd, 2) * (fGhz / 3.0) * Math.pow(28 / nodeLg, 0.55));
      const iTunnel = 420 * Math.exp(-1.55 * tox);
      const iSubth = 15 * Math.pow(10, -(0.32 / 0.08) * (vdd / 1.0));
      const pLeak = Math.round((iTunnel + iSubth) * vdd * (28 / nodeLg));
      const pTotal = pDyn + pLeak;
      const powerDensity = Math.round(15 + (pTotal / 110) * 65); // W/cm²
      const dynPercent = Math.round((pDyn / (pDyn + pLeak)) * 100);
      const leakPercent = 100 - dynPercent;
      const isPowerWall = nodeLg < 65 && powerDensity > 40;

      controlsHtml = `
        <div class="eng-obj-slider-cluster">
          <div class="eng-obj-slider-unit">
            <div class="eng-obj-slider-header">
              <span class="eng-obj-slider-label">${t.ch14_vdd_slider}</span>
              <span class="eng-obj-slider-val" id="vddVal">${vdd.toFixed(2)} V</span>
            </div>
            <input type="range" class="eng-obj-slider" id="vddSlider" min="0.55" max="1.80" step="0.05" value="${vdd}" aria-label="Supply Voltage">
          </div>
          <div class="eng-obj-slider-unit">
            <div class="eng-obj-slider-header">
              <span class="eng-obj-slider-label">${t.ch14_lg_slider}</span>
              <span class="eng-obj-slider-val" id="lgVal">${nodeLg} nm</span>
            </div>
            <input type="range" class="eng-obj-slider" id="lgSlider" min="2" max="180" step="2" value="${nodeLg}" aria-label="Feature Node Lg">
          </div>
        </div>
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dennard Scaling Breakdown Curve Live Engine">
          <!-- 坐標系 -->
          <g transform="translate(70, 45)">
            <line x1="0" y1="280" x2="490" y2="280" stroke="#475569" stroke-width="2"/>
            <line x1="0" y1="0" x2="0" y2="280" stroke="#475569" stroke-width="2"/>
            <text x="490" y="275" fill="#94a3b8" font-size="11">年份 / 節點</text>
            <text x="10" y="20" fill="#94a3b8" font-size="11">標準化指標 (Log Scale)</text>

            <!-- 橫坐標節點標記 -->
            ${[
              { year: '1985\n1.5µm', x: 40 },
              { year: '1995\n350nm', x: 120 },
              { year: '2005\n65nm', x: 220, wall: true },
              { year: '2015\n14nm', x: 330 },
              { year: '2025\n2nm', x: 440 }
            ].map(pt => `
              <line x1="${pt.x}" y1="280" x2="${pt.x}" y2="285" stroke="#94a3b8" stroke-width="1.5"/>
              <text x="${pt.x}" y="305" text-anchor="middle" fill="${pt.wall ? '#ef4444' : '#94a3b8'}" font-size="10">${pt.year.split('\n')[0]}</text>
              <text x="${pt.x}" y="320" text-anchor="middle" fill="#64748b" font-size="9">${pt.year.split('\n')[1]}</text>
            `).join('')}

            <!-- 2005 年熱耗牆紅色虛線 -->
            <line x1="220" y1="20" x2="220" y2="280" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4"/>
            <rect x="175" y="28" width="90" height="22" rx="3" fill="#ef4444" opacity="0.85"/>
            <text x="220" y="43" text-anchor="middle" fill="#ffffff" font-size="9.5" font-weight="800">Dennard 縮放終結</text>

            <!-- 曲線 1: 電晶體數量 (持續指數上升) -->
            <path d="M 40,260 Q 150,230 220,180 T 440,40" fill="none" stroke="#10b981" stroke-width="2.5"/>
            <text x="445" y="45" fill="#10b981" font-size="10" font-weight="700">電晶體數 (摩爾定律)</text>

            <!-- 曲線 2: 時脈頻率 Clock Frequency (2005年撞牆停滯) -->
            <path d="M 40,270 Q 130,240 220,140 L 440,135" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
            <text x="445" y="140" fill="#38bdf8" font-size="10" font-weight="700">主頻極限 (~4 GHz)</text>

            <!-- 曲線 3: 工作電壓 Vdd (停滯在 0.7V) -->
            <path d="M 40,70 L 120,110 L 220,190 L 440,210" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
            <text x="445" y="215" fill="#f59e0b" font-size="10" font-weight="700">工作電壓 (止步 ~0.7V)</text>

            <!-- 曲線 4: 漏電流密度 (急遽上升) -->
            <path d="M 40,275 L 150,270 L 220,250 Q 320,200 440,90" fill="none" stroke="#ec4899" stroke-width="2.5" stroke-dasharray="4,4"/>
            <text x="445" y="95" fill="#ec4899" font-size="10" font-weight="700">靜態漏電 (穿隧暴增)</text>
          </g>

          <!-- 右側動態功率儀表板看板 -->
          <g transform="translate(560, 45)">
            <rect x="0" y="0" width="180" height="280" rx="6" fill="#0f172a" stroke="${isPowerWall ? '#ef4444' : '#10b981'}" stroke-width="1.5"/>
            <text x="90" y="24" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="750">即時功耗組成分析</text>
            <line x1="15" y1="34" x2="165" y2="34" stroke="#334155" stroke-width="1"/>

            <!-- 功耗堆疊長條圖 -->
            <g transform="translate(30, 50)">
              <!-- 背景總高 120px -->
              <rect x="0" y="0" width="40" height="120" rx="3" fill="#1e293b"/>
              <!-- 動態功耗條 (綠色) -->
              <rect x="0" y="${120 * (leakPercent / 100)}" width="40" height="${120 * (dynPercent / 100)}" rx="3" fill="#10b981"/>
              <!-- 漏電功耗條 (粉紅色) -->
              <rect x="0" y="0" width="40" height="${120 * (leakPercent / 100)}" rx="3" fill="#ec4899"/>
              
              <text x="50" y="${Math.max(15, 120 * (leakPercent / 100) / 2 + 4)}" fill="#ec4899" font-size="10" font-weight="700">漏電: ${leakPercent}%</text>
              <text x="50" y="${Math.min(115, 120 * (leakPercent / 100) + 120 * (dynPercent / 100) / 2 + 4)}" fill="#10b981" font-size="10" font-weight="700">動態: ${dynPercent}%</text>
            </g>

            <!-- 熱流密度量表 -->
            <g transform="translate(15, 190)">
              <text x="0" y="12" fill="#94a3b8" font-size="10">晶片功率密度：</text>
              <text x="150" y="12" text-anchor="end" fill="${isPowerWall ? '#ef4444' : 'var(--semi-teal)'}" font-size="13" font-weight="800">${powerDensity} W/cm²</text>
              
              <rect x="0" y="22" width="150" height="8" rx="2" fill="#1e293b"/>
              <rect x="0" y="22" width="${Math.min(150, (powerDensity / 120) * 150)}" height="8" rx="2" fill="${isPowerWall ? '#ef4444' : '#10b981'}"/>
              
              <text x="75" y="48" text-anchor="middle" fill="${isPowerWall ? '#ef4444' : '#10b981'}" font-size="10" font-weight="750">
                ${isPowerWall ? '⚠️ 撞擊熱耗牆 (Power Wall)' : '✅ 功耗密度受控'}
              </text>
              <text x="75" y="64" text-anchor="middle" fill="#94a3b8" font-size="9">等效頻率: ~${fGhz.toFixed(1)} GHz</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,310 Q 400,200 680,100" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="9 6" class="anim-data-flow" opacity="0.7"/><circle cx="560" cy="150" r="32" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="5 5" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch14_scaling_status}</div>
          <div class="eng-obj-metric-value" style="color: ${isPowerWall ? '#ef4444' : 'var(--semi-teal)'}; font-size: 15px;">
            ${isPowerWall ? '熱耗牆崩潰 (Breakdown)' : '健康縮放區 (Healthy)'}
          </div>
          <div class="eng-obj-metric-note">${isPowerWall ? '量子穿隧漏電超越動態翻轉功耗' : '電壓與尺寸協同等比微縮'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch14_power_density}</div>
          <div class="eng-obj-metric-value" style="color: ${isPowerWall ? '#f59e0b' : 'var(--semi-blue-dark)'};">${powerDensity} W / cm²</div>
          <div class="eng-obj-metric-note">${powerDensity > 80 ? '超越核子反應爐爐心熱通量極限' : '傳統風冷可維持安全散熱'}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">運算力架構轉向</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">多核異質 + 3D 堆疊</div>
          <div class="eng-obj-metric-note">由單核頻率狂飆走向平行小晶片 (Chiplet)</div>
        </div>
      `;

      footerNote = t.ch14_dennard_desc;
    } else {
      // density 模式
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Standard Cell Track Height and Density Calculation">
          <g transform="translate(60, 40)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">邏輯標準單元高度 (Cell Height) = Track 軌道數 × Metal Pitch (M1P)</text>

            <!-- 對比 1: 9-Track (成熟節點) -->
            <g transform="translate(30, 50)">
              <rect x="0" y="0" width="180" height="240" rx="4" fill="#0f172a" stroke="#64748b" stroke-width="1.5"/>
              <text x="90" y="25" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="700">9-Track (28nm)</text>
              <line x1="20" y1="35" x2="160" y2="35" stroke="#334155"/>
              ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(tr => `
                <line x1="20" y1="${55 + tr * 18}" x2="160" y2="${55 + tr * 18}" stroke="#475569" stroke-width="2"/>
              `).join('')}
              <text x="90" y="228" text-anchor="middle" fill="#cbd5e1" font-size="10.5">Cell Height = 9 × 90 = 810 nm</text>
            </g>

            <!-- 對比 2: 6-Track (先進 FinFET) -->
            <g transform="translate(250, 50)">
              <rect x="0" y="0" width="180" height="240" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="90" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">6-Track (7nm/5nm)</text>
              <line x1="20" y1="35" x2="160" y2="35" stroke="#334155"/>
              ${[0, 1, 2, 3, 4, 5].map(tr => `
                <line x1="20" y1="${65 + tr * 24}" x2="160" y2="${65 + tr * 24}" stroke="#38bdf8" stroke-width="2.5"/>
              `).join('')}
              <text x="90" y="228" text-anchor="middle" fill="#38bdf8" font-size="10.5" font-weight="700">Cell Height = 6 × 40 = 240 nm</text>
            </g>

            <!-- 對比 3: 5-Track / 4.5-Track (2nm GAA + 背面供電) -->
            <g transform="translate(470, 50)">
              <rect x="0" y="0" width="180" height="240" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
              <text x="90" y="25" text-anchor="middle" fill="#10b981" font-size="12" font-weight="800">5-Track + 背面供電 (N2/A16)</text>
              <line x1="20" y1="35" x2="160" y2="35" stroke="#334155"/>
              ${[0, 1, 2, 3, 4].map(tr => `
                <line x1="20" y1="${75 + tr * 28}" x2="160" y2="${75 + tr * 28}" stroke="#10b981" stroke-width="3"/>
              `).join('')}
              <rect x="20" y="195" width="140" height="18" fill="#f59e0b" opacity="0.3"/>
              <text x="90" y="208" text-anchor="middle" fill="#f59e0b" font-size="9.5" font-weight="800">背面埋入式供電軌 (BSPDN)</text>
              <text x="90" y="228" text-anchor="middle" fill="#10b981" font-size="10.5" font-weight="700">Cell Height = 5 × 22 = 110 nm</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 120,310 Q 400,200 680,100" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="9 6" class="anim-data-flow" opacity="0.7"/><circle cx="560" cy="150" r="32" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="5 5" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">標準單元軌道演進</div>
          <div class="eng-obj-metric-value">9T → 6T → 5T</div>
          <div class="eng-obj-metric-note">DTCO (設計與製程協同優化)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">背面供電網路 (BSPDN)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">+ 15% 頻率 / -20% 面積</div>
          <div class="eng-obj-metric-note">將電源線移至晶圓背面，釋放正面空間</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">單元高度壓縮比</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 85% 縮小</div>
          <div class="eng-obj-metric-note">810nm (28nm) 降至 110nm (N2)</div>
        </div>
      `;

      footerNote = t.ch14_density_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh14Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 14</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh14Title">${t.ch14_title}</h2>
          <p class="eng-obj-subtitle">${t.ch14_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'pitch' ? 'is-active' : ''}" data-tab="pitch">${t.ch14_tab_pitch}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'dennard' ? 'is-active' : ''}" data-tab="dennard">${t.ch14_tab_dennard}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'density' ? 'is-active' : ''}" data-tab="density">${t.ch14_tab_density}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'True Scaling & DTCO/STCO Clauses' : '微縮標尺與 DTCO/STCO 條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'CPP · M1P · 6T/5T · DTCO · STCO' : 'CPP · M1P · 6T/5T · DTCO · STCO'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'CPP gate pitch, M1P metal pitch, 5T cells, DTCO (BPR/BSPDN) & STCO 3D chiplets' : 'CPP 閘極節距、M1P 金屬節距、5T 單元、DTCO (BPR/BSPDN) 與 STCO 3D 小晶片'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Standard-Cell Area & Dark-Silicon Law' : '標準單元面積與後丹納德定律 (Scaling Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'A_cell = N_CPP·CPP·N_T·M1P · P = αCV²f + V·I_leak' : 'A_cell = N_CPP·CPP·N_T·M1P · P = αCV²f + V·I_leak'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'CPP×M1P sets true density; dark silicon drives BSPDN & 3D STCO' : 'CPP×M1P 決定真實密度，暗矽效應催生 BSPDN 與 STCO 3D 小晶片'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Pin Deadlock · Ru/Mo RC · MEEF/EPE' : 'Pin Deadlock · Ru/Mo RC · MEEF/EPE'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Solves low-track routing deadlock via BSPDN, Ru/Mo RC wall & High-NA MEEF' : '以背面供電解放矮單元繞線死結、短自由程金屬突破 RC 牆與 High-NA 壓低 MEEF'}</div>
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

    // 綁定節點切換事件 (pitch 模式)
    container.querySelectorAll('.node-btn').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activeNode = btn.getAttribute('data-node');
        update();
      });
    });

    // 綁定 Dennard 物理滑桿事件
    if (activeTab === 'dennard') {
      const vSlider = container.querySelector('#vddSlider');
      const lSlider = container.querySelector('#lgSlider');
      if (vSlider) {
        bindEngineeringEvent(vSlider, 'input', e => {
          vdd = Number(e.target.value);
          update();
        });
      }
      if (lSlider) {
        bindEngineeringEvent(lSlider, 'input', e => {
          nodeLg = Number(e.target.value);
          update();
        });
      }
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 23. Ch 18 晶圓廠 OCAP 應變處置樹、重工判定矩陣與防堵追溯模型 (Excursion Control)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderProcessScalingObject as render };
