import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderChipJourneyObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'timeline'; // 'timeline' | 'boundary' | 'hierarchy'
  let activeStage = 2; // 0: 沙子, 1: 晶圓, 2: 前段製造, 3: 測試, 4: 先進封裝, 5: 智慧手機

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'timeline') {
      const stages = [
        { label: lang === 'zh' ? '1. 矽石沙石' : '1. Silica Sand', sub: lang === 'en' ? 'Quartz feedstock' : '石英原料' },
        { label: lang === 'zh' ? '2. 晶棒切片' : '2. Ingot / Slicing', sub: '300mm Wafer' },
        { label: lang === 'zh' ? '3. 晶圓前段' : '3. Front-End Fab', sub: lang === 'en' ? 'Example: 1500 steps' : '示例：1500工步' },
        { label: lang === 'zh' ? '4. 晶圓測試' : '4. Wafer Test', sub: lang === 'en' ? "WAT + CP probing" : "WAT + CP 針測" },
        { label: lang === 'zh' ? '5. 先進封裝' : '5. Packaging', sub: '2.5D CoWoS' },
        { label: lang === 'zh' ? '6. 系統整合' : '6. System Assembly', sub: lang === 'en' ? "Flagship smartphone" : "智慧手機旗艦機" }
      ];

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chip Life Journey Macro Timeline">
          <defs>
            <linearGradient id="journeyFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="50%" stop-color="#10b981"/>
              <stop offset="100%" stop-color="#f59e0b"/>
            </linearGradient>
            <radialGradient id="glowPoint" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- 上方：全景時間軸節點條 -->
          <g transform="translate(40, 30)">
            <line x1="40" y1="25" x2="680" y2="25" stroke="#334155" stroke-width="3"/>
            <line x1="40" y1="25" x2="${40 + activeStage * 128}" y2="25" stroke="url(#journeyFlow)" stroke-width="4"/>
            ${stages.map((st, idx) => {
              const cx = 40 + idx * 128;
              const isCur = idx === activeStage;
              const isPast = idx <= activeStage;
              return `
                <g class="journey-node" data-stage="${idx}" role="button" tabindex="0" aria-pressed="${isCur}" aria-label="${esc(st.label)}" style="cursor: pointer;" transform="translate(${cx}, 25)">
                  ${isCur ? `<circle cx="0" cy="0" r="18" fill="url(#glowPoint)"/>` : ''}
                  <circle cx="0" cy="0" r="${isCur ? 10 : 8}" fill="${isCur ? '#38bdf8' : isPast ? '#10b981' : '#1e293b'}" stroke="${isCur ? '#ffffff' : isPast ? '#10b981' : '#475569'}" stroke-width="2.5"/>
                  <text x="0" y="24" text-anchor="middle" fill="${isCur ? '#38bdf8' : '#94a3b8'}" font-size="10.5" font-weight="${isCur ? '750' : '500'}">${st.label}</text>
                  <text x="0" y="38" text-anchor="middle" fill="#64748b" font-size="9">${st.sub}</text>
                </g>
              `;
            }).join('')}
          </g>

          <!-- 中央：代表性實體模型展示區 -->
          <g transform="translate(60, 110)">
            <rect x="0" y="0" width="680" height="280" rx="8" fill="#09131b" stroke="#1e293b" stroke-width="1.5"/>

            ${activeStage === 0 ? `
              <!-- 階段 0: 石英砂提煉成 11N 電子級多晶矽 -->
              <g transform="translate(60, 40)">
                <path d="M 40,180 L 160,50 L 280,180 Z" fill="#334155" opacity="0.6"/>
                <path d="M 80,180 L 160,70 L 240,180 Z" fill="#64748b" opacity="0.8"/>
                <circle cx="160" cy="50" r="15" fill="#f59e0b" opacity="0.5"/>
                <text x="160" y="205" text-anchor="middle" fill="#cbd5e1" font-size="12" font-weight="700">${lang === 'en' ? "Quartz feedstock (SiO₂)" : "石英原料 (SiO₂)"}</text>
              </g>
              <g transform="translate(360, 40)">
                <path d="M 0,110 L 40,110" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
                <rect x="60" y="40" width="180" height="130" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
                <text x="150" y="70" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${lang === 'en' ? "Purified polysilicon (EGS)" : "提純後電子級多晶矽"}</text>
                <text x="150" y="95" text-anchor="middle" fill="#10b981" font-size="18" font-weight="800">99.999999999%</text>
                <text x="150" y="120" text-anchor="middle" fill="#94a3b8" font-size="11">${lang === 'en' ? "11N product example" : "11N 純度產品示例"}</text>
                <text x="150" y="145" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${lang === 'en' ? "Siemens high-temperature vapor reduction" : "西門子高溫氣相還原法"}</text>
              </g>
            ` : activeStage === 1 ? `
              <!-- 階段 1: 柴氏拉晶成單晶矽棒與切片 -->
              <g transform="translate(100, 30)">
                <!-- 晶棒 -->
                <rect x="50" y="40" width="80" height="150" rx="4" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
                <path d="M 50,40 C 50,15 130,15 130,40 Z" fill="#475569"/>
                <ellipse cx="90" cy="190" rx="40" ry="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
                <text x="90" y="220" text-anchor="middle" fill="#cbd5e1" font-size="11" font-weight="700">${lang === 'en' ? "300mm single-crystal silicon ingot" : "300mm 單晶矽棒 (Ingot)"}</text>
              </g>
              <g transform="translate(360, 50)">
                <!-- 金剛石線鋸切出的拋光晶圓 -->
                <ellipse cx="140" cy="100" rx="120" ry="40" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
                <ellipse cx="140" cy="100" rx="80" ry="25" fill="none" stroke="#38bdf8" stroke-dasharray="4,4" opacity="0.6"/>
                <path d="M 255,100 L 260,105 L 260,95 Z" fill="#38bdf8"/>
                <text x="140" y="165" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${lang === 'en' ? "300mm double-side-polished prime wafer" : "300mm 雙面拋光裸晶圓 (Prime Wafer)"}</text>
                <text x="140" y="185" text-anchor="middle" fill="#94a3b8" font-size="10.5">${lang === 'en' ? "775 µm example · &lt; 0.1 nm claim unverified" : "775 µm厚度示例 · &lt; 0.1 nm宣稱未確認"}</text>
              </g>
            ` : activeStage === 2 ? `
              <!-- 階段 2: 晶圓廠前段製造 (FEOL + BEOL) -->
              <g transform="translate(80, 25)">
                <rect x="0" y="20" width="520" height="190" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                <!-- BEOL 多層銅導線 (上方) -->
                <g transform="translate(30, 40)">
                  <rect x="0" y="0" width="460" height="70" fill="#1e293b" opacity="0.6"/>
                  <line x1="40" y1="20" x2="420" y2="20" stroke="#f59e0b" stroke-width="4"/>
                  <line x1="80" y1="45" x2="380" y2="45" stroke="#f59e0b" stroke-width="3"/>
                  <line x1="120" y1="20" x2="120" y2="45" stroke="#f59e0b" stroke-width="3"/>
                  <line x1="280" y1="20" x2="280" y2="45" stroke="#f59e0b" stroke-width="3"/>
                  <text x="230" y="65" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="700">${lang === 'en' ? "BEOL example: 12~15 Cu layers (Low-k isolation)" : "BEOL示例：12~15層雙鑲嵌銅線（Low-k隔離）"}</text>
                </g>
                <!-- FEOL 電晶體閘極層 (下方) -->
                <g transform="translate(30, 120)">
                  <rect x="0" y="0" width="460" height="70" fill="#09131b"/>
                  <!-- 閘極與鰭片 -->
                  ${[80, 160, 240, 320, 400].map(gx => `
                    <rect x="${gx - 12}" y="15" width="24" height="30" fill="#38bdf8" rx="2"/>
                    <rect x="${gx - 6}" y="20" width="12" height="25" fill="#10b981"/>
                  `).join('')}
                  <line x1="10" y1="50" x2="450" y2="50" stroke="#64748b" stroke-width="2"/>
                  <text x="230" y="62" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700">${lang === 'en' ? "FEOL example: tens of billions of FinFET / GAA switches" : "FEOL示例：數百億顆FinFET／GAA開關"}</text>
                </g>
                <text x="260" y="225" text-anchor="middle" fill="#cbd5e1" font-size="11">${lang === 'en' ? "Example: 50+ masks and thousands of deposition/litho/etch/implant/CMP steps; product-dependent" : "示例：50+道光罩、上千道沉積／微影／蝕刻／佈植／CMP工步；依產品而異"}</text>
              </g>
            ` : activeStage === 3 ? `
              <!-- 階段 3: 晶圓允收測試 (WAT PCM + CP 針測) -->
              <g transform="translate(100, 30)">
                <!-- 探針卡下針 -->
                <rect x="30" y="20" width="200" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
                <text x="130" y="40" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">${lang === 'en' ? "Vertical Probe Card" : "垂直探針卡 (Vertical Probe Card)"}</text>
                <!-- 數萬根微彈簧探針 -->
                ${[60, 80, 100, 120, 140, 160, 180, 200].map(px => `
                  <line x1="${px}" y1="50" x2="${px}" y2="90" stroke="#f59e0b" stroke-width="1.5"/>
                `).join('')}
                <!-- 晶圓測試點 -->
                <rect x="40" y="90" width="180" height="80" rx="3" fill="#0f172a" stroke="#64748b" stroke-width="1.5"/>
                <text x="130" y="125" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">${lang === 'en' ? "CP high-frequency probing (Touchdown)" : "CP 高頻針測 (Touchdown)"}</text>
                <text x="130" y="145" text-anchor="middle" fill="#cbd5e1" font-size="9.5">${lang === 'en' ? "Example: millions of test vectors" : "示例：百萬條測試向量分選"}</text>
              </g>
              <g transform="translate(380, 40)">
                <!-- 電子晶圓圖 (Wafer Bin Map) -->
                <circle cx="110" cy="90" r="80" fill="#09131b" stroke="#38bdf8" stroke-width="2"/>
                <!-- 網格點良品與不良品 -->
                ${[0, 1, 2, 3, 4, 5].map(r => [0, 1, 2, 3, 4, 5].map(c => {
                  const pass = !(r === 0 || c === 0 || (r === 2 && c === 4));
                  return `<rect x="${60 + c * 17}" y="${40 + r * 17}" width="14" height="14" rx="2" fill="${pass ? '#10b981' : '#ef4444'}"/>`;
                }).join('')).join('')}
                <text x="110" y="190" text-anchor="middle" fill="#cbd5e1" font-size="11" font-weight="700">${lang === 'en' ? "Wafer Bin Map" : "電子晶圓圖 (Wafer Bin Map)"}</text>
              </g>
            ` : activeStage === 4 ? `
              <!-- 階段 4: 先進封裝 (2.5D CoWoS / 3D SoIC) -->
              <g transform="translate(90, 40)">
                <rect x="0" y="30" width="500" height="160" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                <!-- 頂層 Chiplets (SoC + HBM) -->
                <g transform="translate(60, 50)">
                  <rect x="0" y="0" width="140" height="50" rx="3" fill="#38bdf8" stroke="#ffffff" stroke-width="1"/>
                  <text x="70" y="25" text-anchor="middle" fill="#09131b" font-size="11" font-weight="800">Logic SoC / GPU</text>
                  <text x="70" y="40" text-anchor="middle" fill="#09131b" font-size="9">${lang === 'en' ? "3nm compute-die example" : "3nm運算晶粒示例"}</text>
                </g>
                <g transform="translate(230, 50)">
                  <rect x="0" y="0" width="90" height="50" rx="3" fill="#10b981"/>
                  <text x="45" y="25" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">HBM3e</text>
                  <text x="45" y="40" text-anchor="middle" fill="#ffffff" font-size="9">${lang === 'en' ? "3D-stacked memory" : "3D 堆疊記憶體"}</text>
                </g>
                <g transform="translate(340, 50)">
                  <rect x="0" y="0" width="90" height="50" rx="3" fill="#10b981"/>
                  <text x="45" y="25" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">HBM3e</text>
                  <text x="45" y="40" text-anchor="middle" fill="#ffffff" font-size="9">${lang === 'en' ? "3D-stacked memory" : "3D 堆疊記憶體"}</text>
                </g>
                <!-- 中間矽中介層 (Silicon Interposer with TSVs) -->
                <rect x="40" y="115" width="420" height="25" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
                <text x="250" y="132" text-anchor="middle" fill="#38bdf8" font-size="10.5" font-weight="700">${lang === 'en' ? "Silicon interposer with TSVs" : "矽中介層 (Silicon Interposer with TSV 矽穿孔)"}</text>
                <!-- 底層封裝基板與 BGA 錫球 -->
                <rect x="20" y="150" width="460" height="25" fill="#1e293b"/>
                <text x="250" y="167" text-anchor="middle" fill="#cbd5e1" font-size="10.5">${lang === 'en' ? "ABF organic substrate + BGA solder-ball array" : "ABF 有機載板 (Substrate) + BGA 錫球陣列"}</text>
              </g>
            ` : `
              <!-- 階段 5: 智慧型手機終端產品系統組裝 -->
              <g transform="translate(140, 30)">
                <!-- 手機主機板 -->
                <rect x="0" y="20" width="400" height="180" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
                <text x="200" y="45" text-anchor="middle" fill="#a7f3d0" font-size="12" font-weight="700">${lang === 'en' ? "Flagship phone mainboard (HDI / Substrate-Like PCB)" : "高密度旗艦手機主機板 (HDI / Substrate-Like PCB)"}</text>
                <!-- 核心處理器封裝 (SoC) -->
                <g transform="translate(130, 60)">
                  <rect x="0" y="0" width="140" height="110" rx="4" fill="#09131b" stroke="#f59e0b" stroke-width="2"/>
                  <circle cx="70" cy="45" r="24" fill="#f59e0b" opacity="0.3"/>
                  <text x="70" y="50" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="800">${lang === 'en' ? "Packaged IC" : "封裝晶片"}</text>
                  <text x="70" y="70" text-anchor="middle" fill="#ffffff" font-size="10">${lang === 'en' ? "Package illustration" : "泛用封裝晶片示意"}</text>
                  <text x="70" y="90" text-anchor="middle" fill="#38bdf8" font-size="9.5">${lang === 'en' ? "Example: tens of billions" : "示例：數百億電晶體"}</text>
                </g>
                <text x="200" y="225" text-anchor="middle" fill="#cbd5e1" font-size="11">${lang === 'en' ? "Millions of work hours are illustrative; actual time depends on product and supply chain" : "數百萬協作工時為教學示例；實際時程依產品與供應鏈而異"}</text>
              </g>
            `}
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 90,210 L 710,210" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="10 6" class="anim-data-flow" opacity="0.7"/><path d="M 140,140 L 660,140" fill="none" stroke="#34d399" stroke-width="1.6" stroke-dasharray="6 6" class="anim-beam" opacity="0.55"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch00_metric_total_time}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${lang === 'en' ? "90 ~ 120 days (example)" : "90 ~ 120天（示例）"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Example: front end 70 days + assembly/test 30 days; product-dependent" : "示例：前段70天＋封測30天；實際週期依產品而異"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch00_metric_clean_class}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "Site-specific class" : "等級依場域而定"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Actual class is site-specific; no verified operating-room comparison" : "實際等級依場域規格；未核實手術室比較倍率"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch00_metric_die_count}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${lang === 'en' ? "500 ~ 1,200 dies (example)" : "500 ~ 1,200顆（示例）"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Depends on die area and yield" : "依晶片面積與良率 (Yield) 決定"}</div>
        </div>
      `;

      footerNote = t.ch00_timeline_desc;
    } else if (activeTab === 'boundary') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FEOL vs BEOL vs OSAT Boundaries">
          <!-- 四大領域邊界分割 -->
          <g transform="translate(50, 40)">
            <!-- 1. FEOL -->
            <g transform="translate(0, 0)">
              <rect x="0" y="0" width="165" height="300" rx="6" fill="#09131b" stroke="#38bdf8" stroke-width="2"/>
              <rect x="0" y="0" width="165" height="35" rx="6" fill="#38bdf8"/>
              <text x="82" y="23" text-anchor="middle" fill="#09131b" font-size="12" font-weight="800">${lang === 'en' ? "1. FEOL Front End" : "1. FEOL 前段"}</text>
              <text x="82" y="60" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">${lang === 'en' ? "Transistor fabrication" : "電晶體開關製造"}</text>
              <text x="15" y="90" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Well implantation" : "• 井區離子佈植"}</text>
              <text x="15" y="115" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• STI isolation" : "• STI 淺溝槽隔離"}</text>
              <text x="15" y="140" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Gate oxide (HfO₂)" : "• 閘極氧化層 (HfO₂)"}</text>
              <text x="15" y="165" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• SiGe/carbon source epitaxy" : "• 矽鍺/碳源極磊晶"}</text>
              <text x="15" y="190" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Anneal example &gt; 1000°C" : "• 退火示例 &gt; 1000°C"}</text>
              <rect x="15" y="240" width="135" height="40" rx="4" fill="#1e293b"/>
              <text x="82" y="265" text-anchor="middle" fill="#38bdf8" font-size="10">${lang === 'en' ? "Cleanroom illustration" : "潔淨環境示意"}</text>
            </g>

            <!-- 2. MOL -->
            <g transform="translate(178, 0)">
              <rect x="0" y="0" width="165" height="300" rx="6" fill="#09131b" stroke="#10b981" stroke-width="2"/>
              <rect x="0" y="0" width="165" height="35" rx="6" fill="#10b981"/>
              <text x="82" y="23" text-anchor="middle" fill="#09131b" font-size="12" font-weight="800">${lang === 'en' ? "2. MOL Middle End" : "2. MOL 中間段"}</text>
              <text x="82" y="60" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">${lang === 'en' ? "Nanoscale contact plugs" : "奈米接觸插塞"}</text>
              <text x="15" y="90" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Self-aligned silicide (NiSi)" : "• 自對準矽化物 (NiSi)"}</text>
              <text x="15" y="115" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Contact litho and etch" : "• 接觸孔微影與蝕刻"}</text>
              <text x="15" y="140" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• CVD tungsten (W) fill" : "• CVD 鎢金屬 (W) 填充"}</text>
              <text x="15" y="165" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Tungsten CMP" : "• 鎢 CMP 平坦化"}</text>
              <text x="15" y="190" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Connect gates to M1" : "• 連接閘極與 M1"}</text>
              <rect x="15" y="240" width="135" height="40" rx="4" fill="#1e293b"/>
              <text x="82" y="265" text-anchor="middle" fill="#10b981" font-size="10">${lang === 'en' ? "Electrical bridge" : "電氣橋樑節點"}</text>
            </g>

            <!-- 3. BEOL -->
            <g transform="translate(356, 0)">
              <rect x="0" y="0" width="165" height="300" rx="6" fill="#09131b" stroke="#f59e0b" stroke-width="2"/>
              <rect x="0" y="0" width="165" height="35" rx="6" fill="#f59e0b"/>
              <text x="82" y="23" text-anchor="middle" fill="#09131b" font-size="12" font-weight="800">${lang === 'en' ? "3. BEOL Back End" : "3. BEOL 後段"}</text>
              <text x="82" y="60" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="700">${lang === 'en' ? "Multilayer Cu wiring" : "多層銅導線網路"}</text>
              <text x="15" y="90" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Dual damascene" : "• 雙鑲嵌製程"}</text>
              <text x="15" y="115" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Ultra-low-k dielectric" : "• Low-k 超低介電質"}</text>
              <text x="15" y="140" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Cu plating (Superfill)" : "• 銅電鍍超填 (Superfill)"}</text>
              <text x="15" y="165" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Example: 12~15 Cu layers" : "• 示例：12~15層銅線"}</text>
              <text x="15" y="190" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Budget example &lt; 400°C" : "• 熱預算示例 &lt; 400°C"}</text>
              <rect x="15" y="240" width="135" height="40" rx="4" fill="#1e293b"/>
              <text x="82" y="265" text-anchor="middle" fill="#f59e0b" font-size="10">${lang === 'en' ? "Signal and power networks" : "訊號與供電網路"}</text>
            </g>

            <!-- 4. OSAT -->
            <g transform="translate(534, 0)">
              <rect x="0" y="0" width="165" height="300" rx="6" fill="#09131b" stroke="#8b5cf6" stroke-width="2"/>
              <rect x="0" y="0" width="165" height="35" rx="6" fill="#8b5cf6"/>
              <text x="82" y="23" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">${lang === 'en' ? "4. OSAT Assembly/Test" : "4. OSAT 封測廠"}</text>
              <text x="82" y="60" text-anchor="middle" fill="#c084fc" font-size="11" font-weight="700">${lang === 'en' ? "Packaging and final test" : "封裝與最終測試"}</text>
              <text x="15" y="90" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Wafer grinding" : "• 晶圓薄化 (Grinding)"}</text>
              <text x="15" y="115" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Die singulation" : "• 晶粒切割 (Dicing)"}</text>
              <text x="15" y="140" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Flip chip / 2.5D CoWoS" : "• 覆晶 / 2.5D CoWoS"}</text>
              <text x="15" y="165" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• Encapsulation (Molding)" : "• 膠體封裝 (Molding)"}</text>
              <text x="15" y="190" fill="#cbd5e1" font-size="10">${lang === 'en' ? "• FT final test and sorting" : "• FT 最終測試分選"}</text>
              <rect x="15" y="240" width="135" height="40" rx="4" fill="#1e293b"/>
              <text x="82" y="265" text-anchor="middle" fill="#c084fc" font-size="10">${lang === 'en' ? "Protection and interconnect" : "實體防護與互連"}</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 90,210 L 710,210" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="10 6" class="anim-data-flow" opacity="0.7"/><path d="M 140,140 L 660,140" fill="none" stroke="#34d399" stroke-width="1.6" stroke-dasharray="6 6" class="anim-beam" opacity="0.55"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Front-/back-end thermal budget" : "前段與後段熱預算"}</div>
          <div class="eng-obj-metric-value">&lt; 400 °C (BEOL)</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Illustrates Cu/Low-k thermal-budget concerns; actual limit is process-specific" : "用於說明Cu／Low-k熱預算限制；實際規格依流程而異"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Wafer mask count" : "晶圓光罩層數"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${lang === 'en' ? "50 ~ 80+ masks (example)" : "50 ~ 80+道（示例）"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "EUV + DUV multiple patterning" : "EUV + DUV 多重圖形化"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Industry specialization" : "產業分工模式"}</div>
          <div class="eng-obj-metric-value">Fabless + Foundry + OSAT</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "TSMC foundry + outsourced assembly/test" : "台積電晶圓專工 + 封測專業代工"}</div>
        </div>
      `;

      footerNote = t.ch00_boundary_desc;
    } else {
      // hierarchy 模式
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lot, Wafer, Reticle Shot, Die Hierarchy">
          <g transform="translate(60, 40)">
            <!-- 階層 1: Lot (批) -->
            <g transform="translate(0, 0)">
              <rect x="0" y="0" width="150" height="130" rx="6" fill="#09131b" stroke="#38bdf8" stroke-width="2"/>
              <text x="75" y="28" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${lang === 'en' ? "1 Lot (batch)" : "1 Lot (批號)"}</text>
              <rect x="35" y="45" width="80" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="75" y="68" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="800">${lang === 'en' ? "25 wafers" : "25 片晶圓"}</text>
              <text x="75" y="105" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "Loaded in one airtight FOUP" : "裝載於單一 FOUP 氣密盒"}</text>
            </g>

            <line x1="150" y1="65" x2="190" y2="65" stroke="#475569" stroke-width="2" stroke-dasharray="4,4"/>

            <!-- 階層 2: Wafer (晶圓) -->
            <g transform="translate(190, 0)">
              <rect x="0" y="0" width="150" height="130" rx="6" fill="#09131b" stroke="#10b981" stroke-width="2"/>
              <text x="75" y="28" text-anchor="middle" fill="#10b981" font-size="13" font-weight="750">${lang === 'en' ? "1 Wafer" : "1 Wafer (單片)"}</text>
              <circle cx="75" cy="65" r="24" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
              <text x="75" y="70" text-anchor="middle" fill="#10b981" font-size="11" font-weight="800">300 mm</text>
              <text x="75" y="105" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "12-inch class · ≈706 cm²" : "12吋級 · 約706 cm²"}</text>
            </g>

            <line x1="340" y1="65" x2="380" y2="65" stroke="#475569" stroke-width="2" stroke-dasharray="4,4"/>

            <!-- 階層 3: Reticle Shot (光罩曝光場) -->
            <g transform="translate(380, 0)">
              <rect x="0" y="0" width="150" height="130" rx="6" fill="#09131b" stroke="#f59e0b" stroke-width="2"/>
              <text x="75" y="28" text-anchor="middle" fill="#f59e0b" font-size="13" font-weight="750">${lang === 'en' ? "1 Shot (exposure field)" : "1 Shot (曝光場)"}</text>
              <rect x="35" y="45" width="80" height="40" rx="2" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
              <text x="75" y="68" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="800">26 × 33 mm</text>
              <text x="75" y="105" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "Example field; tool-dependent" : "曝光場示例；依機型而異"}</text>
            </g>

            <line x1="530" y1="65" x2="570" y2="65" stroke="#475569" stroke-width="2" stroke-dasharray="4,4"/>

            <!-- 階層 4: Die (晶粒) -->
            <g transform="translate(570, 0)">
              <rect x="0" y="0" width="120" height="130" rx="6" fill="#09131b" stroke="#ec4899" stroke-width="2"/>
              <text x="60" y="28" text-anchor="middle" fill="#ec4899" font-size="13" font-weight="750">${lang === 'en' ? "1 Die" : "1 Die (晶粒)"}</text>
              <rect x="35" y="45" width="50" height="40" rx="2" fill="#ec4899" opacity="0.3"/>
              <text x="60" y="70" text-anchor="middle" fill="#ec4899" font-size="11" font-weight="800">100 mm²</text>
              <text x="60" y="105" text-anchor="middle" fill="#cbd5e1" font-size="10">${lang === 'en' ? "Example: 15 billion" : "示例：150億電晶體"}</text>
            </g>

            <!-- 下方：微縮換算關聯總圖 -->
            <g transform="translate(0, 160)">
              <rect x="0" y="0" width="690" height="140" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="345" y="35" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">${lang === 'en' ? "Scale example: 1 lot (25 wafers) → tens of thousands of dies → hundreds of trillions of transistors" : "尺度示例：1批（25片）→數萬顆晶粒→數百兆個電晶體"}</text>
              <text x="345" y="65" text-anchor="middle" fill="#cbd5e1" font-size="11">${lang === 'en' ? "Each laser-marked Wafer ID has its own digital history in the fab MES" : "每一片晶圓都有獨立雷射刻號 (Wafer ID)，在工廠 MES 系統中享有獨立數位履歷"}</text>
              <text x="345" y="90" text-anchor="middle" fill="#94a3b8" font-size="10.5">${lang === 'en' ? "Particle damage depends on size, location and process; one particle does not determine scrap count" : "微粒造成的損害取決於粒徑、位置與製程，不能由單一微粒推定報廢數"}</text>
              <text x="345" y="115" text-anchor="middle" fill="#10b981" font-size="10.5" font-weight="700">${lang === 'en' ? "Statistical control manages defect risk; it does not establish zero defects" : "統計管制用於管理缺陷風險，不代表已達成零缺陷"}</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 90,210 L 710,210" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="10 6" class="anim-data-flow" opacity="0.7"/><path d="M 140,140 L 660,140" fill="none" stroke="#34d399" stroke-width="1.6" stroke-dasharray="6 6" class="anim-beam" opacity="0.55"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Standard lot size" : "標準批次大小 (Lot)"}</div>
          <div class="eng-obj-metric-value">${lang === 'en' ? "25 × 300mm wafers" : "25 片 300mm 晶圓"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "1 fully loaded FOUP" : "滿載 1 個 FOUP 晶圓盒"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Reticle field size" : "曝光場尺寸 (Reticle Field)"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">26 mm × 33 mm</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "Example: 60~80 shots; depends on field layout" : "示例：60~80次Shot；依曝光場排版而異"}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${lang === 'en' ? "Flagship chip transistor count" : "旗艦晶片電晶體數量"}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${lang === 'en' ? "&gt; 15 billion (example)" : "&gt; 150億顆（示例）"}</div>
          <div class="eng-obj-metric-note">${lang === 'en' ? "150~290 MTr/mm² is illustrative, not a guarantee for every product" : "150~290 MTr/mm²為密度示例，非所有產品保證"}</div>
        </div>
      `;

      footerNote = t.ch00_hierarchy_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh00Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 00</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh00Title">${t.ch00_title}</h2>
          <p class="eng-obj-subtitle">${t.ch00_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="group" aria-label="${lang === 'en' ? 'Chip journey views' : '晶片旅程視圖'}">
            <button type="button" class="eng-obj-tab ${activeTab === 'timeline' ? 'is-active' : ''}" data-tab="timeline" aria-pressed="${activeTab === 'timeline'}">${t.ch00_tab_timeline}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'boundary' ? 'is-active' : ''}" data-tab="boundary" aria-pressed="${activeTab === 'boundary'}">${t.ch00_tab_boundary}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'hierarchy' ? 'is-active' : ''}" data-tab="hierarchy" aria-pressed="${activeTab === 'hierarchy'}">${t.ch00_tab_hierarchy}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Value Chain & Foundry 2.0 Clauses' : '價值鏈與 Foundry 2.0 條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'EDA/IP · Fabless · Foundry 2.0 · OSAT' : 'EDA/IP · Fabless · Foundry 2.0 · OSAT'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'EDA/IP, Fabless, Foundry 2.0 (FEOL/BEOL + 2.5D/3D + KGD), IDM 2.0 & OSAT' : 'EDA/IP、無廠設計、Foundry 2.0 (前段+2.5D/3D封裝+KGD)、IDM 2.0 與 OSAT'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Area & 3D Yield Teaching Approximations' : '面積與3D良率教學近似'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'GDPW ≈ πR²/A · Y_3D = (∏Y_KGD)·Y_bond^(N-1)' : 'GDPW ≈ πR²/A · Y_3D = (∏Y_KGD)·Y_bond^(N-1)'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? '858 mm² field example. GDPW above uses area only; the calculator adds perimeter loss. 3D yield assumes simplified factors, not calibrated performance.' : '858 mm²曝光場示例；上式GDPW僅取面積比，計算器另計周界損失。3D良率為簡化因子假設，未經實測校準。'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Stitch Open · KGD Escape · Pad Oxide' : 'Stitch Open · KGD Escape · Pad Oxide'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Illustrative failure mechanisms for investigation; prevention requires process-specific verification.' : '異常機制僅供教學與調查；預防效果須依實際流程驗證。'}</div>
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
        const restoreFocus = btn === btn.ownerDocument.activeElement;
        activeTab = btn.getAttribute('data-tab');
        update();
        if (restoreFocus) container.querySelector(`[data-tab="${activeTab}"]`)?.focus();
      });
    });

    container.querySelectorAll('.journey-node').forEach(node => {
      const selectStage = () => {
        const restoreFocus = node === node.ownerDocument.activeElement;
        activeStage = parseInt(node.getAttribute('data-stage'), 10);
        update();
        if (restoreFocus) container.querySelector(`[data-stage="${activeStage}"]`)?.focus();
      };
      bindEngineeringEvent(node, 'click', selectStage);
      bindEngineeringEvent(node, 'keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectStage();
        }
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 22. Ch 14 製程節點微縮標尺對比、Dennard 縮放終結與密度模型 (Process Nodes & Scaling)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderChipJourneyObject as render };
