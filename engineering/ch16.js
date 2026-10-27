import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderYieldFailureAnalysisObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'wafermap'; // 'wafermap' | 'fib' | 'tem'
  let activePattern = 'ring'; // 'ring' | 'edge' | 'scratch' | 'cluster' | 'random'
  let dieArea = 160;          // 50 ~ 800 mm²
  let defectDensity = 0.08;   // 0.02 ~ 0.40 defects/cm²

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    // 半導體良率物理計算 (Murphy & Poisson Models for 300mm Wafer)
    const R_eff = 147; // 300mm wafer with 3mm edge exclusion
    const waferArea = Math.PI * (R_eff ** 2); // ~67,887 mm²
    // Gross Dies per Wafer (GDPW raw theoretical)
    const N_gross = Math.max(12, Math.floor(waferArea / dieArea - (2 * Math.PI * R_eff) / Math.sqrt(2 * dieArea)));
    
    // 缺陷期望值 lambda = (A * D0) / 100
    const lambda = (dieArea * defectDensity) / 100;
    const yieldPoisson = Math.exp(-lambda);
    const yieldMurphy = lambda === 0 ? 1 : Math.pow((1 - Math.exp(-lambda)) / lambda, 2);
    const yieldPct = (yieldMurphy * 100).toFixed(1);
    const poissonPct = (yieldPoisson * 100).toFixed(1);

    // 合格良品數 GDPW
    const N_good = Math.max(0, Math.floor(N_gross * yieldMurphy));
    const waferCost = 12000; // USD
    const dieCost = N_good > 0 ? (waferCost / N_good).toFixed(2) : '9999';
    const costLoss = N_good > 0 ? Math.round((N_gross - N_good) * (waferCost / N_good)) : waferCost;

    if (activeTab === 'wafermap') {
      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch16AreaSlider">${t.ch16_area_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch16AreaSlider" min="50" max="800" step="10" value="${dieArea}">
            <span class="eng-obj-slider-val">${dieArea} mm²</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch16DefectSlider">${t.ch16_defect_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch16DefectSlider" min="0.02" max="0.40" step="0.01" value="${defectDensity.toFixed(2)}">
            <span class="eng-obj-slider-val">${defectDensity.toFixed(2)} /cm²</span>
          </div>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: #94a3b8; font-family: monospace;">Murphy: <strong style="color: ${yieldMurphy >= 0.85 ? '#10b981' : (yieldMurphy >= 0.7 ? '#f59e0b' : '#ef4444')}; font-size: 13px;">${yieldPct}%</strong></span>
            <span style="font-size: 11px; padding: 2px 7px; border-radius: 4px; background: rgba(15,23,42,0.6); border: 1px solid var(--border-subtle); color: #38bdf8; font-weight: 700;">
              GDPW: ${N_good} / ${N_gross}
            </span>
          </div>
        </div>
      `;

      // 依據 dieArea 動態計算 300mm 晶圓上的晶粒網格
      const dies = [];
      const gridStep = Math.max(18, Math.min(36, Math.round(Math.sqrt(dieArea) * 1.6)));
      const dieSize = gridStep - 3;
      const rLimit = 145; // 晶圓半徑 150，邊緣 145

      for (let y = -140; y <= 140; y += gridStep) {
        for (let x = -140; x <= 140; x += gridStep) {
          const dist = Math.sqrt(x * x + y * y);
          if (dist + dieSize * 0.7 <= rLimit) {
            let isDefect = false;
            if (activePattern === 'ring') {
              isDefect = dist >= 60 && dist <= 100;
            } else if (activePattern === 'edge') {
              isDefect = dist >= 115;
            } else if (activePattern === 'scratch') {
              isDefect = Math.abs(y - x * 0.75) < 18 && x >= -80 && x <= 90;
            } else if (activePattern === 'cluster') {
              isDefect = Math.sqrt((x + 45) ** 2 + (y - 40) ** 2) < 46;
            } else if (activePattern === 'random') {
              const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
              const pseudoRand = hash - Math.floor(hash);
              isDefect = pseudoRand < (1 - yieldMurphy);
            }
            if (!isDefect && activePattern !== 'random') {
              const bgHash = Math.cos(x * 34.567 + y * 91.123) * 23421.123;
              const bgRand = bgHash - Math.floor(bgHash);
              if (bgRand < (defectDensity * 0.28)) {
                isDefect = true;
              }
            }
            dies.push({ x: x + 180, y: y + 180, isDefect });
          }
        }
      }

      let patternName = '';
      let patternCause = '';
      let patternAction = '';
      if (activePattern === 'ring') {
        patternName = lang === 'zh' ? '同心圓環狀缺陷 (Ring Signature)' : 'Concentric Ring Defect Signature';
        patternCause = lang === 'zh' ? 'CMP 研磨頭多區氣囊壓力失衡、研磨液離心分佈或光阻旋塗乾燥不均' : 'CMP multi-zone carrier pressure imbalance or spin-dry air turbulence';
        patternAction = lang === 'zh' ? '校正 CMP 研磨墊調節器切削深度與各區氣壓' : 'Calibrate CMP pad conditioner profile & carrier zone pressure';
      } else if (activePattern === 'edge') {
        patternName = lang === 'zh' ? '晶圓邊緣失效 (Edge Ring Signature)' : 'Wafer Edge Exclusion Signature';
        patternCause = lang === 'zh' ? '光阻邊緣去膠 (EBR) 噴嘴角度偏斜、蝕刻機邊緣聚焦環 (Focus Ring) 磨耗' : 'EBR nozzle alignment shift or plasma edge focus ring erosion';
        patternAction = lang === 'zh' ? '更換電漿腔體邊緣 Focus Ring 與校準光阻塗佈去膠線' : 'Replace chamber edge focus ring and re-align EBR dispense line';
      } else if (activePattern === 'scratch') {
        patternName = lang === 'zh' ? '弧形劃痕 (Scratch Signature)' : 'Curved Handling Scratch Signature';
        patternCause = lang === 'zh' ? '自動化晶圓機械手臂真空吸盤夾爪微粒摩擦或 FOUP 晶圓盒導軌刮碰' : 'Robotic handler end-effector particle drag or FOUP cassette contact';
        patternAction = lang === 'zh' ? '立即停機檢查機器人搬送軌跡 (Teach) 並清潔機械手接觸墊' : 'Check robot transfer trajectory & clean end-effector vacuum pads';
      } else if (activePattern === 'cluster') {
        patternName = lang === 'zh' ? '局部團塊缺陷 (Cluster Signature)' : 'Localized Cluster Defect Signature';
        patternCause = lang === 'zh' ? '製程腔體內部微粒爆發 (Flaking) 或清洗液滴噴嘴冷凝物掉落' : 'Chamber wall polymer flaking or chemical spray nozzle condensation drip';
        patternAction = lang === 'zh' ? '執行腔體乾蝕刻清機 (Dry Clean) 或定期濕式 PM 保養' : 'Execute chamber plasma dry clean or schedule immediate wet PM';
      } else if (activePattern === 'random') {
        patternName = lang === 'zh' ? '隨機泊松缺陷 (Poisson Random Signature)' : 'Poisson Random Defect Signature';
        patternCause = lang === 'zh' ? '環境空氣微粒落塵、化學品微量不純物或機台微放電隨機碰撞' : 'Random cleanroom airborne particles, chemical trace impurities or micro-arcing';
        patternAction = lang === 'zh' ? '強化無塵室空氣循環 (HEPA/ULPA) 與藥液多重過濾濾芯更換' : 'Enhance cleanroom air filtration & replace chemical multi-stage point-of-use filters';
      }

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wafer Defect Spatial Signatures & Continuous Yield Physics Map">
          <!-- 左側：300mm 晶圓圖繪製區 -->
          <g transform="translate(60, 30)">
            <!-- 晶圓邊界圓形 (Notch 缺口位於下方) -->
            <circle cx="180" cy="180" r="170" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5"/>
            <!-- 下方 Notch 凹口 -->
            <polygon points="175,348 185,348 180,356" fill="#38bdf8"/>
            <text x="180" y="372" text-anchor="middle" fill="#64748b" font-size="10">SEMI 300mm Notch · Die Area: ${dieArea} mm²</text>

            <!-- 動態晶粒陣列 (Die Grid) -->
            ${dies.map(d => `
              <rect x="${d.x - dieSize / 2}" y="${d.y - dieSize / 2}" width="${dieSize}" height="${dieSize}" rx="1.5"
                    fill="${d.isDefect ? '#ef4444' : '#10b981'}"
                    stroke="#0f172a" stroke-width="1.2"/>
            `).join('')}
          </g>

          <!-- 右側：缺陷特徵診斷與良率模型面板 -->
          <g transform="translate(450, 30)">
            <rect x="0" y="0" width="310" height="360" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <text x="20" y="32" fill="#38bdf8" font-size="13" font-weight="750">${patternName}</text>

            <!-- 模式選擇按鈕 (5 大模式) -->
            <g transform="translate(18, 48)">
              <text x="0" y="14" fill="#94a3b8" font-size="11">切換圖案 (Pattern Select):</text>
              <g transform="translate(0, 24)">
                ${['ring', 'edge', 'scratch', 'cluster', 'random'].map((p, idx) => `
                  <rect x="${idx * 55}" y="0" width="50" height="24" rx="3"
                        fill="${activePattern === p ? '#0284c7' : '#1e293b'}"
                        stroke="${activePattern === p ? '#38bdf8' : '#475569'}"
                        style="cursor: pointer;" data-pattern="${p}"/>
                  <text x="${idx * 55 + 25}" y="16" text-anchor="middle"
                        fill="${activePattern === p ? '#ffffff' : '#94a3b8'}"
                        font-size="9.5" font-weight="700" style="pointer-events: none;">${p.toUpperCase()}</text>
                `).join('')}
              </g>
            </g>

            <!-- 診斷說明卡片 -->
            <g transform="translate(18, 120)">
              <rect x="0" y="0" width="274" height="74" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
              <text x="12" y="20" fill="#fbbf24" font-size="10.5" font-weight="750">可能物理根因 (Root Cause):</text>
              <foreignObject x="12" y="26" width="250" height="42">
                <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 10.5px; color: #cbd5e1; line-height: 1.35;">
                  ${patternCause}
                </div>
              </foreignObject>
            </g>

            <g transform="translate(18, 204)">
              <rect x="0" y="0" width="274" height="74" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
              <text x="12" y="20" fill="#34d399" font-size="10.5" font-weight="750">工程排查行動 (Action Plan):</text>
              <foreignObject x="12" y="26" width="250" height="42">
                <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 10.5px; color: #cbd5e1; line-height: 1.35;">
                  ${patternAction}
                </div>
              </foreignObject>
            </g>

            <!-- 數學良率模型即時公式標註 -->
            <g transform="translate(18, 288)">
              <rect x="0" y="0" width="274" height="58" rx="4" fill="#111827" stroke="#38bdf8" stroke-dasharray="3 2" stroke-width="1"/>
              <text x="12" y="18" fill="#38bdf8" font-size="10" font-family="monospace">MURPHY: Y = [(1 - exp(-λ))/λ]²</text>
              <text x="12" y="34" fill="#94a3b8" font-size="9.5">λ = (A · D₀)/100 = ${(lambda).toFixed(3)} · Poisson Y = ${poissonPct}%</text>
              <text x="12" y="48" fill="#cbd5e1" font-size="9.5">預估良率損耗金額: <strong style="color: #ef4444;">$${costLoss.toLocaleString()} USD</strong></text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><line x1="160" y1="60" x2="400" y2="210" stroke="#38bdf8" stroke-width="2" stroke-dasharray="7 5" class="anim-beam" opacity="0.7"/><circle cx="400" cy="210" r="48" fill="none" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="6 6" class="anim-data-flow" opacity="0.65"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch16_murphy_yield}</div>
          <div class="eng-obj-metric-value" style="color: ${yieldMurphy >= 0.85 ? 'var(--semi-teal)' : (yieldMurphy >= 0.7 ? '#f59e0b' : '#ef4444')};">
            ${yieldPct}% <span style="font-size: 11.5px; color: #94a3b8; font-weight: normal;">(Poisson: ${poissonPct}%)</span>
          </div>
          <div class="eng-obj-metric-note">Murphy 三角分佈模型 (考慮缺陷局部群聚聚集)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch16_gdpw_label}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${N_good} <span style="font-size: 12px; color: #64748b; font-weight: normal;">/ ${N_gross} Dies</span></div>
          <div class="eng-obj-metric-note">300mm 晶圓淨良品數 (Gross Dies: ${N_gross} 顆)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch16_die_cost}</div>
          <div class="eng-obj-metric-value" style="color: #0ea5e9;">$${dieCost} USD</div>
          <div class="eng-obj-metric-note">晶圓基礎成本 $12,000 / 缺陷損耗: $${costLoss.toLocaleString()}</div>
        </div>
      `;

      footerNote = t.ch16_wafermap_desc;
    } else if (activeTab === 'fib') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dual-Beam FIB In-situ Lamella Preparation">
          <!-- 雙束 FIB 系統結構：Ga+ 離子束 (52° 傾角) + 垂直 SEM 電子束 -->
          <g transform="translate(400, 30)">
            <!-- 垂直 SEM 電子束柱 (Vertical SEM Column) -->
            <rect x="-40" y="0" width="80" height="40" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="3"/>
            <text x="0" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">SEM 電子束柱 (監控)</text>
            <line x1="0" y1="40" x2="0" y2="180" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 2"/>

            <!-- 52° 傾角 Ga+ 聚焦離子束柱 (FIB Column @ 30kV) -->
            <g transform="rotate(52 0 180)">
              <rect x="-35" y="0" width="70" height="40" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="3"/>
              <text x="0" y="24" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="700">Ga⁺ FIB 離子柱</text>
              <line x1="0" y1="40" x2="0" y2="180" stroke="#f59e0b" stroke-width="3"/>
            </g>
          </g>

          <!-- 樣品表面奈米微切剖面 (In-Situ Milling & Lamella) -->
          <g transform="translate(180, 210)">
            <!-- 矽晶片主體 -->
            <rect x="0" y="40" width="440" height="120" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <text x="220" y="145" text-anchor="middle" fill="#94a3b8" font-size="11">失效晶粒基底 (Defective Die Area)</text>

            <!-- 兩側被 Ga+ 離子束物理掏空的深坑 (Trench Cross-Sections) -->
            <polygon points="120,40 160,110 80,110" fill="#09131b" stroke="#f59e0b" stroke-width="1.5"/>
            <polygon points="280,40 320,110 240,110" fill="#09131b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="120" y="80" text-anchor="middle" fill="#f59e0b" font-size="9.5">離子掏空深坑</text>
            <text x="280" y="80" text-anchor="middle" fill="#f59e0b" font-size="9.5">離子掏空深坑</text>

            <!-- 中間留下的超薄樣品薄片 (TEM Lamella: 厚度 25nm) -->
            <rect x="195" y="20" width="10" height="90" fill="#cbd5e1" stroke="#38bdf8" stroke-width="1.5"/>
            <!-- 頂部保護性鉑沉積層 (Pt Protective Cap) -->
            <rect x="190" y="10" width="20" height="10" fill="#94a3b8" stroke="#ffffff" stroke-width="1"/>
            <text x="200" y="0" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750">Pt 保護帽層</text>
            <text x="200" y="70" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700" transform="rotate(-90 200 70)">TEM Lamella (&lt; 25nm)</text>

            <!-- 奈米機械手鎢探針 (Omniprobe Needle) 提取薄片 -->
            <path d="M 380,0 L 210,18" stroke="#10b981" stroke-width="3"/>
            <circle cx="210" cy="18" r="4" fill="#34d399"/>
            <text x="360" y="-10" fill="#34d399" font-size="11" font-weight="700">奈米機械手臂 (Omniprobe 提取)</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><line x1="160" y1="60" x2="400" y2="210" stroke="#38bdf8" stroke-width="2" stroke-dasharray="7 5" class="anim-beam" opacity="0.7"/><circle cx="400" cy="210" r="48" fill="none" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="6 6" class="anim-data-flow" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch16_metric_lamella}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&lt; 25 nm</div>
          <div class="eng-obj-metric-note">使 200kV 高能電子束完全透射</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">切片定位精度</div>
          <div class="eng-obj-metric-value">± 5 nm</div>
          <div class="eng-obj-metric-note">精準直擊單一電晶體閘極擊穿點</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">樣品製備時間</div>
          <div class="eng-obj-metric-value">&lt; 1.5 小時</div>
          <div class="eng-obj-metric-note">原位提取 (In-situ Lift-Out) 大幅加速 FA 流程</div>
        </div>
      `;

      footerNote = t.ch16_fib_desc;
    } else if (activeTab === 'tem') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HR-TEM Atomic Lattice and Gate Dielectric Breakdown">
          <!-- HR-TEM 高分辨晶格視野 (Atomic Columns Grid) -->
          <g transform="translate(100, 30)">
            <rect x="0" y="0" width="600" height="340" fill="#09131b" stroke="#334155" stroke-width="2" rx="6"/>

            <!-- 矽基底單晶原子陣列 (<110> 晶帶軸原子柱) -->
            ${Array.from({ length: 11 }, (_, r) => 
              Array.from({ length: 16 }, (_, c) => `
                <circle cx="${c * 35 + 40}" cy="${r * 22 + 100}" r="4" fill="#64748b" opacity="0.8"/>
              `).join('')
            ).join('')}
            <text x="300" y="315" text-anchor="middle" fill="#94a3b8" font-size="11">單晶矽基底原子柱陣列 (Si Lattice Columns &lt;110&gt;)</text>

            <!-- 閘極 High-k 氧化層 (1.5nm HfO2) -->
            <rect x="30" y="55" width="540" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 2"/>
            <text x="140" y="74" fill="#38bdf8" font-size="11" font-weight="700">High-k 閘極介電層 (1.5nm HfO₂)</text>

            <!-- 介電層原子擊穿針孔 (Dielectric Breakdown Pinhole: 漏電根因) -->
            <g transform="translate(380, 50)">
              <circle cx="15" cy="20" r="16" fill="#ef4444" opacity="0.6"/>
              <!-- 晶格畸變與熔穿短路通道 -->
              <path d="M 5,5 Q 15,35 25,10" stroke="#f87171" stroke-width="2.5"/>
              <text x="15" y="-12" text-anchor="middle" fill="#f87171" font-size="11" font-weight="800">擊穿熔孔 (Breakdown Pinhole)</text>
              <text x="15" y="4" text-anchor="middle" fill="#fbbf24" font-size="9.5">原子穿隧短路通道 (Short Circuit)</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><line x1="160" y1="60" x2="400" y2="210" stroke="#38bdf8" stroke-width="2" stroke-dasharray="7 5" class="anim-beam" opacity="0.7"/><circle cx="400" cy="210" r="48" fill="none" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="6 6" class="anim-data-flow" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch16_metric_tem_res}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&lt; 0.05 nm (次埃級)</div>
          <div class="eng-obj-metric-note">球差校正 (Cs-Corrected) 透射電鏡</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">電子束加速電壓</div>
          <div class="eng-obj-metric-value">200 ~ 300 kV</div>
          <div class="eng-obj-metric-note">極短德布羅意波長解析原子間距</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">失效分析判定</div>
          <div class="eng-obj-metric-value" style="color: #ef4444;">TDDB 介電質擊穿</div>
          <div class="eng-obj-metric-note">物理定讞證據指向局部電場過高</div>
        </div>
      `;

      footerNote = t.ch16_tem_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh16Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 16</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh16Title">${t.ch16_title}</h2>
          <p class="eng-obj-subtitle">${t.ch16_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'wafermap' ? 'is-active' : ''}" data-tab="wafermap">${t.ch16_tab_wafermap}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'fib' ? 'is-active' : ''}" data-tab="fib">${t.ch16_tab_fib}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'tem' ? 'is-active' : ''}" data-tab="tem">${t.ch16_tab_tem}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Yield, EFA & PFA Clauses' : '良率模型與 EFA/PFA 分析條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'Neg-Binomial · LIT/OBIRCH · STEM' : 'Neg-Binomial · LIT/OBIRCH · STEM'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Negative Binomial yield, 3D Lock-in Thermography/OBIRCH & PFIB + STEM/EELS' : '負二項式群聚良率模型、3D 鎖相熱成像/OBIRCH 定位與 Xe⁺ PFIB + STEM/EELS'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Negative Binomial & 3D LIT Phase Law' : '負二項良率與 3D 鎖相熱成像律 (FA Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'Y_NB = (1+A·D0/α)^(-α) · Δφ = z√(πf/α_th)' : 'Y_NB = (1+A·D0/α)^(-α) · Δφ = z√(πf/α_th)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Clustered yield model, 1/x³ critical area & 3D LIT z-depth law' : '叢集缺陷良率模型、1/x³ 關鍵面積致死率與 3D LIT 非破壞性深度定位'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Ring/Bullseye · Slot ANOVA · LIT/OBIRCH' : 'Ring/Bullseye · Slot ANOVA · LIT/OBIRCH'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Decodes wafer-map signatures, single-chamber ANOVA & non-destructive LIT/EMMI' : 'AI 解碼晶圓圖空間指紋、單腔體 ANOVA 抓出隱藏異常並堅持非破壞性熱定位優先'}</div>
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

    container.querySelectorAll('[data-pattern]').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        activePattern = btn.getAttribute('data-pattern');
        update();
      });
    });

    const areaSlider = container.querySelector('#ch16AreaSlider');
    if (areaSlider) {
      bindEngineeringEvent(areaSlider, 'input', (e) => {
        dieArea = parseInt(e.target.value, 10);
        update();
      });
    }

    const defectSlider = container.querySelector('#ch16DefectSlider');
    if (defectSlider) {
      bindEngineeringEvent(defectSlider, 'input', (e) => {
        defectDensity = parseFloat(e.target.value);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 15. Ch 17 統計製程控制 (SPC)、Cpk 常態分佈與 R2R 閉環模型 (Process Control)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderYieldFailureAnalysisObject as render };
