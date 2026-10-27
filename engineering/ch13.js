import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderMemoryTechObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'dram'; // 'dram' | 'nand' | 'hbm'
  let dramAR = 55;        // 35 ~ 75 (:1)
  let dramTemp = 85;      // 25 ~ 105 (°C)
  let nandLayers = 232;   // 128 ~ 320 (tiers)

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    // DRAM 1T1C 動力學計算 (Capacitance & Retention Decay Law)
    // 圓柱電容直徑 D = 18nm, 等效氧化層厚度 EOT = 0.45nm (ZAZ: ZrO2/Al2O3/ZrO2, k_eff ~ 36)
    // C_cell 隨深寬比線性增長: C_cell = (10.5 + 0.29 * dramAR) fF
    const cCell = 10.5 + 0.29 * dramAR; // fF
    // 接面與介電質漏電隨溫度指數暴增: 每 10.5°C 漏電倍增 (SRH generation & Poole-Frenkel conduction)
    const iLeak = 0.6 * Math.pow(2, (dramTemp - 25) / 10.5); // fA
    // 固定漏電近似：初始 1.1 V，允許下降 0.40 V 至感測下限 0.7 V。
    // 電荷保持時間 t_ret = C_cell × ΔV / I_leak；秒換算為毫秒。
    const tRet = (cCell * 0.40 / iLeak) * 1000; // ms
    // 教學例採 64/32 ms 刷新視窗；不是單次刷新命令的平均間隔。實際條件依料號規格。
    const refreshWindowMs = dramTemp > 85 ? 32 : 64; // ms
    // 保持裕度 (Retention Safety Margin)
    const retMargin = (tRet / refreshWindowMs).toFixed(1);

    // 3D NAND 高深寬比 HAR 穿孔與多層階梯物理
    // 氧化層-鎢閘極雙層厚度 t_tier = 38nm
    const stackH = (nandLayers * 0.038).toFixed(2); // um
    const harAR = Math.round((nandLayers * 38) / 95); // :1 (孔徑 95nm)
    const decks = nandLayers <= 160 ? 1 : (nandLayers <= 280 ? 2 : 3);
    const dieCapacity = Math.round(nandLayers * 4.41); // Gb (TLC)

    if (activeTab === 'dram') {
      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch13ArSlider">${t.ch13_ar_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch13ArSlider" min="35" max="75" step="1" value="${dramAR}">
            <span class="eng-obj-slider-val">${dramAR}:1</span>
          </div>
          <div class="eng-obj-slider-item">
            <label for="ch13TempSlider">${t.ch13_temp_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch13TempSlider" min="25" max="105" step="5" value="${dramTemp}">
            <span class="eng-obj-slider-val">${dramTemp}°C</span>
          </div>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: #94a3b8; font-family: monospace;">${t.ch13_cap_val}: <strong style="color: #38bdf8; font-size: 13px;">${cCell.toFixed(1)} fF</strong></span>
            <span style="font-size: 11px; padding: 2px 7px; border-radius: 4px; background: rgba(15,23,42,0.6); border: 1px solid var(--border-subtle); color: ${tRet < refreshWindowMs ? '#ef4444' : '#10b981'}; font-weight: 700;">
              ${t.ch13_tret_val}: ${tRet.toFixed(0)} ms (${retMargin}× 裕度)
            </span>
          </div>
        </div>
      `;

      // 圓柱電容視覺高度動態縮放
      const capVisH = Math.round(110 + (dramAR - 35) * 1.9);
      // 固定漏電線性放電：V(t) = 1.1 − I_leak × t / C_cell。
      // 圖線顯示 0 ~ 128ms；到達零電位後停止外推。
      let decayPath = 'M 0,' + Math.round(100 - (1.1 / 1.2) * 80);
      for (let x = 0; x <= 160; x += 5) {
        const simTime = (x / 160) * 128; // 0 ~ 128 ms
        const v = Math.max(0, 1.1 - (iLeak * simTime) / (cCell * 1000));
        const y = Math.round(100 - (v / 1.2) * 80);
        decayPath += ` L ${x},${y}`;
      }
      // tREFW 在示波器上的 X 座標 (128ms 為 160px)
      const refiX = Math.round((refreshWindowMs / 128) * 160);

      viewportHtml = `
        <svg viewBox="0 0 800 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DRAM 1T1C High-Aspect Capacitor Structure and Discharge Kinetics">
          <!-- 上方超高深寬比圓柱電容陣列 (動態深寬比) -->
          <g transform="translate(50, 25)">
            <rect x="0" y="0" width="470" height="285" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5" rx="6"/>
            <text x="235" y="24" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">DRAM 圓柱立體電容 (Aspect Ratio ${dramAR}:1 · C = ${cCell.toFixed(1)} fF)</text>

            <!-- 垂直圓柱電容結構 (動態視覺高度) -->
            ${[45, 115, 185, 255, 325, 395].map((x, idx) => `
              <g transform="translate(${x}, ${230 - capVisH})">
                <!-- 外層金屬電極 (Outer TiN Plate) -->
                <rect x="-14" y="0" width="28" height="${capVisH}" rx="4" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
                <!-- 中間高介電薄膜 (High-k ZAZ: ZrO₂ / Al₂O₃ / ZrO₂) -->
                <rect x="-10" y="2" width="20" height="${capVisH - 4}" rx="3" fill="#0284c7" opacity="0.6"/>
                <!-- 內層金屬電極 (Inner TiN Node) -->
                <rect x="-5" y="4" width="10" height="${capVisH - 8}" rx="2" fill="#ea580c"/>
                <!-- 電荷儲存指示 (+) -->
                <text x="0" y="${Math.round(capVisH / 2)}" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="800">Q</text>
                <text x="0" y="${capVisH + 14}" text-anchor="middle" fill="#38bdf8" font-size="9">C${idx + 1}</text>
              </g>
            `).join('')}
            <text x="235" y="268" text-anchor="middle" fill="#94a3b8" font-size="10">TiN 電極 + 2nm ZrO₂/Al₂O₃/ZrO₂ 高介電質 · 漏電 ${iLeak.toFixed(1)} fA @ ${dramTemp}°C</text>
          </g>

          <!-- 右側：電容電荷漏電動力學示波器 (Charge Retention Decay) -->
          <g transform="translate(540, 25)">
            <rect x="0" y="0" width="210" height="235" fill="#0b1329" stroke="#334155" stroke-width="1.5" rx="6"/>
            <text x="105" y="22" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">固定漏電放電曲線 V(t)</text>
            <text x="105" y="36" text-anchor="middle" fill="#94a3b8" font-size="9">t_ret = ${tRet.toFixed(0)} ms · tREFW = ${refreshWindowMs} ms</text>

            <!-- 示波器座標系 (X: 0~128ms, Y: 0~1.2V) -->
            <g transform="translate(25, 55)">
              <rect x="0" y="0" width="160" height="110" fill="#020617" stroke="#1e293b" stroke-width="1"/>
              <!-- 感測臨界電壓下限線 (0.7V) -->
              <line x1="0" y1="53" x2="160" y2="53" stroke="#ef4444" stroke-width="1" stroke-dasharray="3 2"/>
              <text x="155" y="50" text-anchor="end" fill="#ef4444" font-size="8">V_min=0.7V</text>
              <!-- 刷新時間垂直標記線 -->
              <line x1="${refiX}" y1="0" x2="${refiX}" y2="110" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="2 2"/>
              <text x="${refiX}" y="122" text-anchor="middle" fill="#fbbf24" font-size="8.5">tREFW</text>
              <!-- 動態電壓衰減軌跡 -->
              <path d="${decayPath}" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
              <text x="5" y="15" fill="#38bdf8" font-size="8.5" font-family="monospace">1.1V (VDD)</text>
            </g>

            <text x="105" y="210" text-anchor="middle" fill="${retMargin >= 2.0 ? '#34d399' : '#ef4444'}" font-size="10" font-weight="700">
              ${retMargin >= 2.0 ? '模型保持時間大於參考刷新視窗' : '模型裕度較低，須查核實際記憶體規格'}
            </text>
          </g>

          <!-- 下方 1T 存取電晶體與埋入式字元線 (Buried Word-Line bWL) -->
          <g transform="translate(50, 325)">
            <rect x="0" y="0" width="700" height="115" fill="#1e293b" stroke="#334155" stroke-width="1.5" rx="6"/>
            <!-- 埋入式字元線 (bWL) -->
            <rect x="50" y="40" width="270" height="32" rx="3" fill="#475569" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="185" y="61" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">埋入式字元線 (Buried Word-Line bWL)</text>
            <!-- 位元線 (Bit-Line BL) -->
            <rect x="380" y="40" width="270" height="32" rx="3" fill="#475569" stroke="#10b981" stroke-width="1.5"/>
            <text x="515" y="61" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">垂直位元線 (Bit-Line BL)</text>
            <text x="350" y="98" text-anchor="middle" fill="#94a3b8" font-size="10.5">1T1C 電晶體閘極開啟導通字元線，感測放大器 (Sense Amp) 差分讀取位元線電荷</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 150,200 L 650,200" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.6"/><path d="M 400,70 L 400,340" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 6" class="anim-beam" opacity="0.65"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch13_metric_dram_ar}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${dramAR}:1 (${cCell.toFixed(1)} fF)</div>
          <div class="eng-obj-metric-note">ZAZ 高介電常數 k ~ 36 · 儲存電荷 ${(cCell * 1.1).toFixed(1)} fC</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch13_metric_retention}</div>
          <div class="eng-obj-metric-value" style="color: ${dramTemp > 85 ? '#f59e0b' : '#38bdf8'};">${refreshWindowMs} ms ${dramTemp > 85 ? '(2× 雙頻)' : ''}</div>
          <div class="eng-obj-metric-note">固定漏電 ${iLeak.toFixed(1)} fA · 保持時間 ${tRet.toFixed(0)} ms</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">保持安全裕度</div>
          <div class="eng-obj-metric-value" style="color: ${retMargin >= 2.0 ? 'var(--semi-teal)' : '#ef4444'};">${retMargin}× Margin</div>
          <div class="eng-obj-metric-note">${retMargin >= 2.0 ? '電容足以抗衡漏電，資料完好' : '⚠️ 高溫漏電過劇，資料翻轉風險！'}</div>
        </div>
      `;

      footerNote = t.ch13_dram_desc;
      footerNote += ' 本例以 64/32 ms 刷新視窗比較保持時間；tREFI 則是刷新命令的平均間隔，兩者不同。實際刷新條件依記憶體料號與溫度規格。<a href="https://assets.micron.com/adobe/assets/urn:aaid:aem:5ea148c8-e3fe-489e-8489-99b1b9cdcd3c/renditions/original/as/ddr5-new-features-white-paper.pdf" target="_blank" rel="noopener noreferrer">刷新命令與 tREFI 定義（Micron，第 2 頁）</a>。';
    } else if (activeTab === 'nand') {
      controlsHtml = `
        <div class="eng-obj-slider-panel">
          <div class="eng-obj-slider-item">
            <label for="ch13NandSlider">${t.ch13_layers_slider}</label>
            <input type="range" class="eng-obj-range-input" id="ch13NandSlider" min="128" max="320" step="8" value="${nandLayers}">
            <span class="eng-obj-slider-val">${nandLayers} 層</span>
          </div>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: #94a3b8; font-family: monospace;">總堆疊厚度: <strong style="color: #38bdf8; font-size: 13px;">${stackH} µm</strong></span>
            <span style="font-size: 11px; padding: 2px 7px; border-radius: 4px; background: rgba(15,23,42,0.6); border: 1px solid var(--border-subtle); color: #fbbf24; font-weight: 700;">
              HAR 孔深寬比: ${harAR}:1 (${decks} Deck${decks > 1 ? 's' : ''})
            </span>
          </div>
        </div>
      `;

      // 繪製交替層數量 (依 nandLayers 比例映射為 10~18 條視覺代表層)
      const visualTiers = Math.min(18, Math.max(10, Math.round(nandLayers / 18)));
      // Deck 介面位置
      const deckSeamY = decks > 1 ? Math.round(35 + (290 / decks)) : 0;

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D NAND Flash High Aspect Ratio Architecture and Multi-Deck Staircase">
          <!-- 左側：交替疊層與垂直通道孔 (Alternating Stack & HAR Etch) -->
          <g transform="translate(50, 25)">
            <rect x="0" y="0" width="350" height="360" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5" rx="6"/>
            <text x="175" y="24" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">${nandLayers} 層交替堆疊 · 總厚度 ${stackH} µm</text>

            <!-- 多層交替氧化層與鎢閘極 (SiO2 / W pairs) -->
            ${Array.from({ length: visualTiers }, (_, i) => `
              <rect x="20" y="${i * (290 / visualTiers) + 35}" width="310" height="6" fill="#334155"/>
              <rect x="20" y="${i * (290 / visualTiers) + 41}" width="310" height="${Math.max(4, Math.round(290 / visualTiers) - 8)}" fill="#ea580c" opacity="0.85"/>
            `).join('')}

            ${decks > 1 ? `
              <!-- Deck 雙疊對準接合面 (Deck Joint Seam) -->
              <line x1="15" y1="${deckSeamY}" x2="335" y2="${deckSeamY}" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 2"/>
              <text x="335" y="${deckSeamY - 4}" text-anchor="end" fill="#fbbf24" font-size="9" font-weight="700" data-ink="halo">Deck 拼接介面 (${decks}-Stack)</text>
            ` : ''}

            <!-- 貫穿垂直深孔通道 (HAR Etch Channel Holes) -->
            ${[90, 175, 260].map(x => `
              <rect x="${x - 6}" y="35" width="12" height="290" rx="3" fill="#38bdf8" stroke="#ffffff" stroke-width="1"/>
            `).join('')}
            <text x="175" y="340" text-anchor="middle" fill="#38bdf8" font-size="10.5" font-weight="700">HAR 垂直通道孔 (深寬比 ${harAR}:1 · 直徑 95nm)</text>
            <text x="175" y="353" text-anchor="middle" fill="#94a3b8" font-size="9">電荷陷阱層 (CTF: ONO) + 多晶矽中空通道</text>
          </g>

          <!-- 右側：金字塔階梯狀接點引出 (Word-Line Staircase Contact Pads) -->
          <g transform="translate(420, 25)">
            <rect x="0" y="0" width="330" height="360" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
            <text x="165" y="24" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="750">字元線階梯狀引出 (${nandLayers} Tiers Staircase)</text>

            <!-- 階梯幾何形狀 (逐層向後退縮) -->
            ${Array.from({ length: 8 }, (_, i) => `
              <rect x="30" y="${i * 32 + 45}" width="${270 - i * 29}" height="26" fill="#ea580c" rx="2" stroke="#fbbf24" stroke-width="1"/>
              <!-- 垂直接觸插塞 (Contact Vias) 落在每個階梯上 -->
              <line x1="${270 - i * 29 + 15}" y1="35" x2="${270 - i * 29 + 15}" y2="${i * 32 + 45}" stroke="#cbd5e1" stroke-width="2.5"/>
              <circle cx="${270 - i * 29 + 15}" cy="${i * 32 + 45}" r="3" fill="#ffffff"/>
            `).join('')}
            <text x="165" y="338" text-anchor="middle" fill="#fbbf24" font-size="10.5" font-weight="750">微影「修切 (Trim)」工藝製成微型階梯</text>
            <text x="165" y="352" text-anchor="middle" fill="#94a3b8" font-size="9">單顆晶粒 TLC 裸晶容量: ${(dieCapacity / 1000).toFixed(2)} Tb (${dieCapacity} Gb)</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 150,200 L 650,200" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.6"/><path d="M 400,70 L 400,340" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 6" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch13_metric_nand_layers}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">${nandLayers} 層 (${stackH} µm)</div>
          <div class="eng-obj-metric-note">${decks} 層多階對準堆疊 (${decks} Decks Architecture)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">HAR 深孔高寬比</div>
          <div class="eng-obj-metric-value" style="color: #fbbf24;">${harAR}:1 Aspect Ratio</div>
          <div class="eng-obj-metric-note">低溫電漿極速穿透多微米交替介電層</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">單顆裸晶儲存容量</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">${(dieCapacity / 1000).toFixed(2)} Tb / Die</div>
          <div class="eng-obj-metric-note">TLC (3-bit/cell) 8階電壓臨界量化儲存</div>
        </div>
      `;

      footerNote = t.ch13_nand_desc;
    } else if (activeTab === 'hbm') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HBM 3D TSV High-Bandwidth Stacking">
          <!-- 底層邏輯控制基底 (Base Die) -->
          <g transform="translate(150, 310)">
            <rect x="0" y="0" width="500" height="64" rx="4" fill="#0f172a" stroke="#0ea5e9" stroke-width="2"/>
            <text x="250" y="30" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">底層邏輯控制晶粒 (Base Logic Die / Buffer Die)</text>
            <text x="250" y="54" text-anchor="middle" fill="#38bdf8" font-size="10">內建 BIST 自我檢測、修復電路與 1024-bit PHY 介面</text>
          </g>

          <!-- 垂直堆疊 4 層 DRAM Core Dies (以 TSV 貫穿) -->
          ${[1, 2, 3, 4].map((layer, idx) => `
            <g transform="translate(180, ${260 - idx * 55})">
              <!-- DRAM Die -->
              <rect x="0" y="0" width="440" height="42" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="220" y="24" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">DRAM Core Die #${5 - layer} (~30 µm 超薄削磨)</text>
              <!-- 貫穿 TSV 柱與微凸塊 -->
              ${[40, 100, 160, 220, 280, 340, 400].map(tx => `
                <line x1="${tx}" y1="0" x2="${tx}" y2="42" stroke="#38bdf8" stroke-width="2.5"/>
                <circle cx="${tx}" cy="46" r="3" fill="#fbbf24"/>
              `).join('')}
            </g>
          `).join('')}

          <!-- 側邊標記與匯流排流向 -->
          <g transform="translate(640, 100)">
            <path d="M 10,20 L 40,20 L 40,220 L 10,220" fill="none" stroke="#38bdf8" stroke-width="2"/>
            <text x="50" y="120" fill="#38bdf8" font-size="11.5" font-weight="700">1024-bit</text>
            <text x="50" y="136" fill="#38bdf8" font-size="10">超寬並行總線</text>
            <text x="50" y="152" fill="#34d399" font-size="11" font-weight="700">&gt; 1.2 TB/s</text>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 150,200 L 650,200" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" class="anim-data-flow" opacity="0.6"/><path d="M 400,70 L 400,340" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 6" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch13_metric_hbm_bw}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 1.2 TB/s</div>
          <div class="eng-obj-metric-note">HBM3e 提供 AI GPU 充足記憶體頻寬</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">匯流排位元寬度 (Bus Width)</div>
          <div class="eng-obj-metric-value">1024-bit</div>
          <div class="eng-obj-metric-note">傳統 DDR5 (32-bit/ch) 難以企及之平行度</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">裸晶厚度 (Die Thinning)</div>
          <div class="eng-obj-metric-value">~ 30 µm</div>
          <div class="eng-obj-metric-note">精密背磨與微凸塊熱壓鍵合 (TCB)</div>
        </div>
      `;

      footerNote = t.ch13_hbm_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh13Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 13</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh13Title">${t.ch13_title}</h2>
          <p class="eng-obj-subtitle">${t.ch13_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'dram' ? 'is-active' : ''}" data-tab="dram">${t.ch13_tab_dram}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'nand' ? 'is-active' : ''}" data-tab="nand">${t.ch13_tab_nand}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'hbm' ? 'is-active' : ''}" data-tab="hbm">${t.ch13_tab_hbm}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Memory & Emerging NVM Clauses' : '記憶體全譜系條例 (Memory Clauses)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'DRAM 4F² · CBA · HBM · MRAM/FeRAM' : 'DRAM 4F² · CBA · HBM · MRAM/FeRAM'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'DRAM 4F² VCT/3D, 3D NAND CBA, HBM MR-MUF/TC-NCF & MRAM/RRAM/FeRAM' : 'DRAM 4F² VCT/3D、3D NAND CBA、HBM MR-MUF/TC-NCF 與 MRAM/RRAM/FeRAM'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Charge-Sharing & F-N Tunneling Law' : 'DRAM 電荷分配與 F-N 穿隧律 (Memory Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'ΔV_BL = Vdd/[2(1+C_BL/C_s)] · BW = N·R/8' : 'ΔV_BL = Vdd/[2(1+C_BL/C_s)] · BW = N·R/8'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'DRAM 50:1 capacitor, 3D NAND F-N tunneling & HBM4 2048-bit BW' : 'DRAM 50:1 高深寬比電容、3D NAND F-N 穿隧與 HBM4 2048-bit 頻寬'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'DRAM VRT · WL Mo Void · HBM MR-MUF' : 'DRAM VRT · WL Mo Void · HBM MR-MUF'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Mitigates DRAM VRT tail bits, 3D NAND wordline voids & HBM bump bridges' : '以 On-Die ECC 克服 DRAM VRT、無氟鉬填滿 3D NAND 字元線與 MR-MUF 防橋接'}</div>
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

    const arSlider = container.querySelector('#ch13ArSlider');
    if (arSlider) {
      bindEngineeringEvent(arSlider, 'input', (e) => {
        dramAR = parseInt(e.target.value, 10);
        update();
      });
    }

    const tempSlider = container.querySelector('#ch13TempSlider');
    if (tempSlider) {
      bindEngineeringEvent(tempSlider, 'input', (e) => {
        dramTemp = parseInt(e.target.value, 10);
        update();
      });
    }

    const nandSlider = container.querySelector('#ch13NandSlider');
    if (nandSlider) {
      bindEngineeringEvent(nandSlider, 'input', (e) => {
        nandLayers = parseInt(e.target.value, 10);
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 13. Ch 15 CD-SEM 臨界尺寸掃描電鏡、光學明暗場缺陷與橢偏儀薄膜量測模型 (Metrology & Inspection)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderMemoryTechObject as render };
