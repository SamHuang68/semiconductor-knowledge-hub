import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderPackagingFlowObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'wirebond'; // 'wirebond' | 'flipchip' | 'underfill'
  let dnpRadiusMm = 10.0; // mm (4.0 ~ 20.0 mm)
  let bumpHeightUm = 75; // µm (40 ~ 110 µm)

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    let controlsHtml = '';

    // 熱力學與 Coffin-Manson 疲勞力學計算
    // Δα = 15.0 (BT基板) - 2.6 (矽晶片) = 12.4 ppm/K
    const deltaAlpha = 12.4e-6;
    const deltaTempK = 165; // -40°C ~ 125°C 溫差
    const dnpMeters = dnpRadiusMm * 1e-3;
    const bumpHeightMeters = bumpHeightUm * 1e-6;

    // 熱膨脹失配熱位移 Δu = L · Δα · ΔT (µm)
    const deltaUMicrons = (dnpMeters * deltaAlpha * deltaTempK) * 1e6;

    // 角落焊球剪切應變 Δγ = Δu / h_bump
    const shearStrain = (deltaUMicrons / bumpHeightUm);
    const shearStrainPct = (shearStrain * 100).toFixed(1);

    // Coffin-Manson 焊錫熱疲勞壽命 N_f = C · (Δγ)^(-m) (m ≈ 1.95)
    // 裸焊球基準
    const nfBare = Math.max(120, Math.round(115 * Math.pow(Math.max(0.08, shearStrain), -1.95)));
    // Underfill 底部填膠應變衰減至 12%，壽命倍增
    const nfUnderfill = Math.round(nfBare * 16.5);

    // 車規可靠度評級 (AEC-Q100 規範通常要求 1000~3000 次熱循環)
    const isAutoGradeBare = nfBare >= 1000;
    const isAutoGradeUf = nfUnderfill >= 3000;

    if (activeTab === 'flipchip' || activeTab === 'underfill') {
      controlsHtml = `
        <div class="ch20-model-controls" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 10px; padding: 12px; background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px solid rgba(56, 189, 248, 0.2);">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch20_dnp_slider}</span>
              <span style="color: #38bdf8; font-weight: 750; font-family: monospace;">${dnpRadiusMm.toFixed(1)} mm</span>
            </div>
            <input type="range" id="ch20DnpSlider" min="4.0" max="20.0" step="1.0" value="${dnpRadiusMm}" style="width: 100%; accent-color: #0ea5e9; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>${lang === 'en' ? "4 mm (small die)" : "4 mm (小晶粒)"}</span>
              <span>${lang === 'en' ? "10 mm (medium SoC)" : "10 mm (中型 SoC)"}</span>
              <span>${lang === 'en' ? "20 mm (large AI compute die)" : "20 mm (巨大 AI 運算晶粒)"}</span>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: 600;">${t.ch20_bump_height_slider}</span>
              <span style="color: #10b981; font-weight: 750; font-family: monospace;">${bumpHeightUm} µm</span>
            </div>
            <input type="range" id="ch20BumpSlider" min="40" max="110" step="5" value="${bumpHeightUm}" style="width: 100%; accent-color: #10b981; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 2px;">
              <span>${lang === 'en' ? "40 µm (small, dense bumps)" : "40 µm (微型高密凸塊)"}</span>
              <span>${lang === 'en' ? "75 µm (standard C4 bumps)" : "75 µm (標準 C4 凸塊)"}</span>
              <span>${lang === 'en' ? "110 µm (tall collapsed bumps)" : "110 µm (高坍塌厚凸塊)"}</span>
            </div>
          </div>
        </div>
      `;
    }

    if (activeTab === 'wirebond') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Thermosonic Wire Bonding Flow and Tool Capillary">
          <!-- 底部基板與導線架 (Substrate & Leadframe) -->
          <g transform="translate(100, 260)">
            <rect x="0" y="40" width="600" height="50" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
            <text x="300" y="70" text-anchor="middle" fill="#94a3b8" font-size="11">${lang === 'en' ? "Package leadframe / substrate" : "封裝導線架 / 基板 (Package Leadframe / Substrate)"}</text>

            <!-- 兩側外引腳 (Outer Leads) -->
            <rect x="20" y="10" width="80" height="30" fill="#f59e0b" rx="2"/>
            <text x="60" y="30" text-anchor="middle" fill="#0f172a" font-size="10.5" font-weight="750">${lang === 'en' ? "Lead 1" : "引腳 1"}</text>

            <rect x="500" y="10" width="80" height="30" fill="#f59e0b" rx="2"/>
            <text x="540" y="30" text-anchor="middle" fill="#0f172a" font-size="10.5" font-weight="750">${lang === 'en' ? "Lead 2" : "引腳 2"}</text>
          </g>

          <!-- 中間晶粒 (Die Attached on Substrate with Epoxy) -->
          <g transform="translate(260, 200)">
            <rect x="0" y="0" width="280" height="60" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="140" y="35" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">${lang === 'en' ? "Semiconductor die" : "半導體晶片 (Die)"}</text>
            <!-- 表面周圍鋁/銅焊墊 (Bond Pads) -->
            <rect x="20" y="0" width="25" height="10" fill="#cbd5e1" rx="1"/>
            <rect x="235" y="0" width="25" height="10" fill="#cbd5e1" rx="1"/>
          </g>

          <!-- 陶瓷劈刀 (Capillary) 正在打第一焊點與金線走弧 (Wire Looping) -->
          <path d="M 292,200 Q 230,110 160,270" fill="none" stroke="#fbbf24" stroke-width="3"/>
          <path d="M 292,200 Q 230,110 160,270" fill="none" stroke="#fef08a" stroke-width="2" stroke-dasharray="6 6" class="anim-data-flow"/>
          <ellipse cx="292" cy="202" rx="7" ry="4" fill="#f59e0b"/>
          <rect x="150" y="268" width="12" height="4" fill="#f59e0b"/>
          <text x="190" y="140" fill="#fbbf24" font-size="11" font-weight="700">${lang === 'en' ? "Gold-wire looping" : "金線走弧 (Looping)"}</text>

          <!-- 右側正在作業的陶瓷劈刀 (Capillary Tool) -->
          <g transform="translate(500, 40)">
            <polygon points="0,0 30,0 20,120 10,120" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
            <text x="50" y="50" fill="#ffffff" font-size="11" font-weight="700">${lang === 'en' ? "Ceramic capillary" : "陶瓷劈刀 (Capillary)"}</text>
            <text x="50" y="68" fill="#94a3b8" font-size="9.5">${lang === 'en' ? "Ultrasonic vibration (120 kHz) + 200°C thermocompression" : "超音波震盪 (120 kHz) + 200°C 熱壓"}</text>
            <line x1="15" y1="0" x2="15" y2="155" stroke="#fbbf24" stroke-width="2.5"/>
            <circle cx="15" cy="155" r="7" fill="#f59e0b"/>
            <text x="35" y="155" fill="#f59e0b" font-size="10" font-weight="700">${lang === 'en' ? "Free-air ball (FAB)" : "打火球 (FAB)"}</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch20_metric_bond_speed}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${lang === 'en' ? "16 ~ 20 wires / second" : "16 ~ 20 條線 / 秒"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Fast, precise capillary motion driven by a voice-coil motor" : "高速音圈馬達劈刀精準飛速穿梭"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Bond-wire material" : "打線材質"}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "Gold (Au) / copper (Cu) wire" : "金線 (Au) / 銅線 (Cu)"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Copper offers higher conductivity and lower precious-metal cost" : "銅線具更高導電率且節省貴金屬成本"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Bond shear failure force" : "焊點剪切破壞力"}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "&gt; 15 gf (gram-force)" : "&gt; 15 gf (克拉力)"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Metal eutectic atomic bonding provides vibration durability" : "金屬共晶原子鍵合確保抗震耐久"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Leadframe & 3D Wire-Bond Clauses' : '導線架與打線 3D 堆疊條例'}</div>
          <div class="eng-obj-metric-value" style="font-size: 13.5px;">DIP/SOP/QFP · QFN/DFN · MCP/PoP</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Includes TO-220/247, Clip-Bond QFN, DDP/QDP 3D multi-die wire-bond stack' : '含 TO-220/247、Clip-Bond QFN、MCP/DDP/QDP 多晶粒階梯 3D 堆疊'}</div>
        </div>
      `;

      footerNote = t.ch20_wirebond_desc;
    } else if (activeTab === 'flipchip') {
      const shearOffsetPx = Math.min(22, Math.round(shearStrain * 28));

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flip-Chip C4 Bumps and Thermo-Mechanical Shear Stress">
          <!-- 上方晶片主體 (Flip-Chip Die) -->
          <g transform="translate(120, 50)">
            <rect x="0" y="0" width="560" height="75" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
            <text x="280" y="36" text-anchor="middle" fill="#ffffff" font-size="13.5" font-weight="750">
              ${lang === 'en' ? "Flip-chip die (CTE α_si = 2.6 ppm/K · DNP radius L =" : "覆晶晶片 (Silicon Die: CTE α_si = 2.6 ppm/K · DNP 半徑 L ="} ${dnpRadiusMm.toFixed(1)} mm)
            </text>
            <text x="280" y="58" text-anchor="middle" fill="#38bdf8" font-size="11">
              ${lang === 'en' ? "Neutral point at center · Peak mismatch displacement at the farthest corner (Δu =" : "中性點在中心 · 熱失配最大剪切位移發生於最遠角落 (Δu ="} ${deltaUMicrons.toFixed(2)} µm)
            </text>
          </g>

          <!-- 中段：C4 焊錫凸塊陣列與角落焊球剪切變形剖面 -->
          <g transform="translate(120, 125)">
            <!-- 內側常態焊球 (中心應變小) -->
            ${Array.from({ length: 7 }, (_, i) => {
              const xPos = i * 48 + 140;
              return `
                <g transform="translate(${xPos}, 0)">
                  <ellipse cx="0" cy="35" rx="13" ry="12" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
                  <text x="0" y="38" text-anchor="middle" fill="#0f172a" font-size="7.5" font-weight="800">C4</text>
                </g>
              `;
            }).join('')}

            <!-- 最外側角落焊球 (承受最大剪切變形 Δγ) -->
            <g transform="translate(40, 0)">
              <!-- 變形前虛線輪廓 -->
              <ellipse cx="0" cy="35" rx="14" ry="13" fill="none" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>
              <!-- 熱剪切偏斜實體 (Sheared Solder Joint) -->
              <path d="M -12,10 L ${12 - shearOffsetPx},10 Q ${16 - shearOffsetPx},35 ${8},60 L -12,60 Z" fill="#ef4444" opacity="0.85" stroke="#f87171" stroke-width="1.8"/>
              <text x="-4" y="38" text-anchor="middle" fill="#ffffff" font-size="8.5" font-weight="800">Δγ</text>
              <text x="0" y="80" text-anchor="middle" fill="#f87171" font-size="10" font-weight="750">
                ${lang === 'en' ? "Peak corner shear:" : "角落最大剪切:"} ${shearStrainPct}%
              </text>
            </g>

            <g transform="translate(520, 0)">
              <ellipse cx="0" cy="35" rx="14" ry="13" fill="none" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>
              <path d="M -12,10 L ${12 + shearOffsetPx},10 Q ${16 + shearOffsetPx},35 ${8},60 L -12,60 Z" fill="#ef4444" opacity="0.85" stroke="#f87171" stroke-width="1.8"/>
              <text x="4" y="38" text-anchor="middle" fill="#ffffff" font-size="8.5" font-weight="800">Δγ</text>
              <text x="0" y="80" text-anchor="middle" fill="#f87171" font-size="10" font-weight="750">
                ${lang === 'en' ? "Peak corner shear:" : "角落最大剪切:"} ${shearStrainPct}%
              </text>
            </g>
          </g>

          <!-- 下方有機封裝基板 (Organic Substrate) -->
          <g transform="translate(100, 220)">
            <rect x="0" y="10" width="600" height="70" rx="4" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="300" y="45" text-anchor="middle" fill="#cbd5e1" font-size="13" font-weight="750">
              ${lang === 'en' ? "High-density organic substrate (BT/ABF: CTE α_sub = 15.0 ppm/K)" : "高密度有機封裝基板 (Organic BT/ABF: CTE α_sub = 15.0 ppm/K)"}
            </text>
            <text x="300" y="65" text-anchor="middle" fill="#f59e0b" font-size="10.5">
              ${lang === 'en' ? "CTE mismatch Δα = 12.4 ppm/K · Greater thermal expansion than silicon" : "熱膨脹差 Δα = 12.4 ppm/K · 高溫膨脹量遠大於矽晶片"}
            </text>
          </g>

          <!-- 物理定律標籤浮水印 -->
          <g transform="translate(180, 315)">
            <rect x="0" y="0" width="440" height="45" rx="4" fill="#0f172a" opacity="0.85" stroke="#ef4444" stroke-width="1"/>
            <text x="220" y="20" text-anchor="middle" fill="#f87171" font-size="11" font-weight="750">
              ${lang === 'en' ? "Coffin-Manson thermal-fatigue law:" : "Coffin-Manson 熱疲勞定律:"} N_f = C · (Δγ)^(-1.95)
            </text>
            <text x="220" y="36" text-anchor="middle" fill="#cbd5e1" font-size="9.5">
              ${lang === 'en' ? "Life without underfill:" : "無底部填膠壽命僅:"} ~${nfBare}${lang === 'en' ? " cycles" : " 次循環"} ${isAutoGradeBare ? (lang === 'en' ? "(Pass)" : '(合格)') : (lang === 'en' ? "(⚠️ Below the automotive 1000-cycle threshold; brittle-fracture risk)" : '(⚠️ 未達車規 1000 次門檻，極易脆斷)')}
            </text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch20_strain_label}</div>
          <div class="eng-obj-metric-value" style="color: #ef4444; font-family: monospace;">
            ${shearStrainPct}% (Δu: ${deltaUMicrons.toFixed(2)} µm)
          </div>
          <div class="eng-obj-metric-note">Δγ = (L · Δα · ΔT) / h${lang === 'en' ? " · Corner stress concentration" : " · 角落應力集中"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch20_fatigue_label}</div>
          <div class="eng-obj-metric-value" style="color: ${isAutoGradeBare ? 'var(--semi-teal)' : '#ef4444'}; font-family: monospace;">
            ~${nfBare}${lang === 'en' ? " cycles" : " 次循環"}
          </div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "No underfill protection · Fatigue microcracks at the bump neck" : "無 Underfill 保護 · 焊球頸部疲勞微裂紋"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Automotive reliability rating (AEC-Q100)" : "車規可靠度評級 (AEC-Q100)"}</div>
          <div class="eng-obj-metric-value" style="color: ${isAutoGradeBare ? 'var(--semi-teal)' : '#ef4444'}; font-size: 13.5px; font-weight: 750;">
            ${isAutoGradeBare ? (lang === 'en' ? "Grade 1 pass (small die)" : 'Grade 1 合格 (小型晶粒)') : (lang === 'en' ? "⚠️ Fail (high-temperature fatigue-fracture risk)" : '⚠️ 不合格 (高溫疲勞斷裂風險)')}
          </div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Capillary underfill and curing strongly recommended" : "強烈建議施加 Capillary Underfill 固化"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Bump & Substrate Package Clauses' : '凸塊與陣列基板封裝條例'}</div>
          <div class="eng-obj-metric-value" style="font-size: 13.5px;">C4 · Cu Pillar · FCBGA · FCCSP</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Includes PBGA, LGA/PGA, Fan-In WLCSP, SiP with EMI Shielding' : '含 PBGA、LGA/PGA、Fan-In WLCSP 與 SiP 系統級封裝'}</div>
        </div>
      `;

      footerNote = t.ch20_flipchip_desc;
    } else if (activeTab === 'underfill') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Capillary Underfill Epoxy Flow Kinetics and Stress Redistribution">
          <!-- 晶片與基板間隙 (Die to Substrate Gap) -->
          <g transform="translate(100, 50)">
            <!-- 覆晶晶片 (Top Die) -->
            <rect x="60" y="0" width="480" height="70" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="300" y="35" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">
              ${lang === 'en' ? "Silicon die (DNP radius L =" : "矽晶片 (Silicon Die: DNP 半徑 L ="} ${dnpRadiusMm.toFixed(1)} mm)
            </text>
            <text x="300" y="54" text-anchor="middle" fill="#34d399" font-size="10.5">
              ${lang === 'en' ? "Cured underfill locks the structure · Bump shear strain drops from " : "底部填膠硬化鎖死結構 · 焊球剪切應變由 "}${shearStrainPct}${lang === 'en' ? "% to " : "% 驟降至 "}${(shearStrain * 12).toFixed(1)}%
            </text>

            <!-- C4 焊錫球陣列 -->
            ${Array.from({ length: 9 }, (_, i) => `
              <circle cx="${i * 48 + 110}" cy="100" r="12" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
            `).join('')}

            <!-- 毛細作用充填完畢之綠色環氧樹脂膠體 (Fully Wetted Underfill Matrix) -->
            <rect x="60" y="70" width="480" height="60" fill="#10b981" opacity="0.45"/>
            <path d="M 65,82 L 535,82 M 65,118 L 535,118" stroke="#6ee7b7" stroke-width="1.8" stroke-dasharray="8 6" class="anim-data-flow"/>
            <text x="300" y="105" text-anchor="middle" fill="#34d399" font-size="11.5" font-weight="800">
              ${lang === 'en' ? "100% cured epoxy fill · Stress redistribution through the structure" : "環氧樹脂 100% 固化充填 · 應力分散至整體結構 (Stress Redistribution)"}
            </text>

            <!-- 點膠針嘴 (Dispense Needle at edge) -->
            <g transform="translate(40, 20)">
              <rect x="0" y="0" width="12" height="60" fill="#94a3b8"/>
              <path d="M 0,60 L 12,60 L 6,75 Z" fill="#94a3b8"/>
              <circle cx="6" cy="82" r="5" fill="#10b981"/>
              <text x="-10" y="40" text-anchor="end" fill="#34d399" font-size="10.5" font-weight="750">${lang === 'en' ? "Dispense nozzle ⇦" : "點膠噴嘴 ⇦"}</text>
            </g>

            <!-- 下方有機封裝基板 (Organic Substrate) -->
            <rect x="0" y="130" width="600" height="70" rx="3" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="300" y="170" text-anchor="middle" fill="#cbd5e1" font-size="13" font-weight="750">
              ${lang === 'en' ? "Organic substrate (BT/ABF: CTE = 15.0 ppm/K)" : "有機基板 (BT/ABF: CTE = 15.0 ppm/K)"}
            </text>
          </g>

          <!-- 應力分析說明與 Coffin-Manson 壽命對比 -->
          <g transform="translate(140, 290)">
            <rect x="0" y="0" width="520" height="65" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
            <text x="260" y="24" text-anchor="middle" fill="#34d399" font-size="12" font-weight="750">
              ${lang === 'en' ? "Relieves mismatch shear · Fatigue life: " : "消除熱失配剪切集中 · 熱疲勞壽命從 "}${nfBare}${lang === 'en' ? " to " : " 狂增至 "}${nfUnderfill.toLocaleString()}${lang === 'en' ? " cycles!" : " 次循環！"}
            </text>
            <text x="260" y="46" text-anchor="middle" fill="#cbd5e1" font-size="10.5">
              ${lang === 'en' ? "Cross-linking (150°C cure) · 16.5× bump fatigue resistance; all pass AEC-Q100!" : "高分子交聯硬化 (150°C 固化) · 焊錫凸塊抗疲勞能力提升 16.5 倍，全數通過車規 AEC-Q100！"}
            </text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Strain before vs after underfill" : "充填前 vs 充填後應變"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal); font-family: monospace;">
            ${shearStrainPct}% ⇨ ${(shearStrain * 12).toFixed(1)}%
          </div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Local shear stress decreases 88%" : "局部剪切應力下降 88%"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch20_fatigue_label} (Underfill)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal); font-family: monospace;">
            &gt; ${nfUnderfill.toLocaleString()}${lang === 'en' ? " cycles" : " 次循環"}
          </div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "16.5 times the life without underfill" : "相較無填膠激增 16.5 倍壽命"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Automotive reliability rating (AEC-Q100)" : "車規可靠度評級 (AEC-Q100)"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal); font-size: 13.5px; font-weight: 750;">
            ${lang === 'en' ? "🛡️ Grade 0 top certification (-40°C~150°C)" : "🛡️ Grade 0 頂級認證 (-40°C~150°C)"}
          </div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Long-term durability for automotive and harsh industrial use" : "具備車載與極限工控長期耐久性"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? 'Underfill Process Clauses' : '底部填充製程三大條例'}</div>
          <div class="eng-obj-metric-value" style="font-size: 13.5px;">CUF · TC-NCF · MR-MUF</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? 'Capillary Underfill (CUF), Non-Conductive Film (NCF), Molded Underfill (MUF)' : '毛細點膠 (CUF)、熱壓非導電膜 (NCF) 與巨量回焊模塑填膠 (MR-MUF)'}</div>
        </div>
      `;

      footerNote = t.ch20_underfill_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh20Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 20</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh20Title">${t.ch20_title}</h2>
          <p class="eng-obj-subtitle">${t.ch20_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'wirebond' ? 'is-active' : ''}" data-tab="wirebond">${t.ch20_tab_wirebond}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'flipchip' ? 'is-active' : ''}" data-tab="flipchip">${t.ch20_tab_flipchip}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'underfill' ? 'is-active' : ''}" data-tab="underfill">${t.ch20_tab_underfill}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Coffin-Manson DNP & Washburn Flow Law' : 'Coffin-Manson 疲勞與毛細底填律 (PKG Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'Δγ ∝ L_DNP·Δα·ΔT/h · t_fill ∝ η·L²/h_gap' : 'Δγ ∝ L_DNP·Δα·ΔT/h · t_fill ∝ η·L²/h_gap'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Corner bump strain, underfill stress relief & MR-MUF transition' : '角落焊球應變集中、Underfill 應力分散與微米間隙改採 MR-MUF'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'CPI White-Bump · MSL Bake · Pd-Cu IMC' : 'CPI White-Bump · MSL Bake · Pd-Cu IMC'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Prevents corner CPI white-bumps, MSL reflow popcorning & Kirkendall voids' : '四角緩衝與底膠防低介電層撕裂、防潮袋烘烤杜絕爆米花脫層與鍍鈀銅線防空洞'}</div>
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

    const dnpSlider = container.querySelector('#ch20DnpSlider');
    if (dnpSlider) {
      bindEngineeringEvent(dnpSlider, 'input', e => {
        dnpRadiusMm = parseFloat(e.target.value);
        update();
      });
    }

    const bumpSlider = container.querySelector('#ch20BumpSlider');
    if (bumpSlider) {
      bindEngineeringEvent(bumpSlider, 'input', e => {
        bumpHeightUm = parseInt(e.target.value, 10);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 20. Ch 22 浴缸曲線、高溫預燒 Arrhenius 方程式與 ESD 防護模型 (Reliability & Burn-In)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderPackagingFlowObject as render };
