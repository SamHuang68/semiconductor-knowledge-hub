import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderSoftwareHardwareTruthObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'rowhammer'; // 'rowhammer' | 'pvt' | 'irdrop'
  let hammerActivations = 0; // 累計讀取次數
  let pvtCorner = 'TT'; // 'TT' | 'SS' | 'FF'
  let isBurst = false; // 是否處於突發高負載

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'rowhammer') {
      const isFlipped = hammerActivations >= 100000;
      const chargeLevel = Math.max(0, 100 - Math.floor(hammerActivations / 1000));

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DRAM Row Hammer Capacitor Leakage Mechanism">
          <!-- 上方互動控制按鈕 -->
          <g transform="translate(100, 20)">
            <rect x="0" y="0" width="190" height="26" rx="4" id="rowHammerAttackBtn" fill="#ef4444" style="cursor: pointer;"/>
            <text x="95" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750">高頻讀取攻擊行 (+25,000次)</text>

            <rect x="210" y="0" width="170" height="26" rx="4" id="rowHammerTrrBtn" fill="#10b981" style="cursor: pointer;"/>
            <text x="295" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750">執行 TRR 目標行刷新 ↺</text>

            <rect x="400" y="0" width="160" height="26" rx="4" id="rowHammerResetBtn" fill="#1e293b" stroke="#475569" stroke-width="1" style="cursor: pointer;"/>
            <text x="480" y="17" text-anchor="middle" fill="#cbd5e1" font-size="11">重置計數器</text>
          </g>

          <!-- 中央：三相鄰字元線 (Wordlines) 微觀物理剖面 -->
          <g transform="translate(60, 65)">
            <rect x="0" y="0" width="680" height="325" rx="8" fill="#09131b" stroke="#1e293b" stroke-width="1.5"/>

            <!-- 1. 上方受害行 (Victim Row N-1) -->
            <g transform="translate(40, 25)">
              <rect x="0" y="0" width="340" height="65" rx="4" fill="#0f172a" stroke="${isFlipped ? '#ef4444' : '#334155'}" stroke-width="${isFlipped ? 2 : 1}"/>
              <text x="20" y="25" fill="${isFlipped ? '#ef4444' : '#38bdf8'}" font-size="11" font-weight="750">相鄰受害行 (Victim Row N-1) 儲存電容</text>
              <!-- 電荷狀態條 -->
              <rect x="20" y="35" width="220" height="16" rx="3" fill="#1e293b"/>
              <rect x="20" y="35" width="${(chargeLevel / 100) * 220}" height="16" rx="3" fill="${isFlipped ? '#ef4444' : '#10b981'}"/>
              <text x="250" y="48" fill="${isFlipped ? '#ef4444' : '#cbd5e1'}" font-size="10.5" font-weight="700">電荷: ${chargeLevel}%</text>
              <text x="310" y="48" fill="${isFlipped ? '#ef4444' : '#34d399'}" font-size="12" font-weight="800">${isFlipped ? 'Bit 0 (翻轉!)' : 'Bit 1'}</text>
            </g>

            <!-- 2. 中間攻擊行 (Aggressor Row N - 被高頻頻繁開關) -->
            <g transform="translate(40, 110)">
              <rect x="0" y="0" width="340" height="85" rx="4" fill="#1e1b4b" stroke="#f59e0b" stroke-width="2"/>
              <text x="20" y="25" fill="#f59e0b" font-size="12" font-weight="800">⚡ 攻擊行 (Aggressor Row N) 字元線</text>
              <text x="20" y="45" fill="#cbd5e1" font-size="10.5">累計高頻開關次數：<tspan fill="#f59e0b" font-weight="800">${hammerActivations.toLocaleString()}</tspan> 次</text>
              <!-- 頻繁震盪的電壓方波示意 -->
              <path d="M 20,70 L 40,70 L 40,55 L 60,55 L 60,70 L 80,70 L 80,55 L 100,55 L 100,70 L 120,70 L 120,55 L 140,55 L 140,70 L 160,70" fill="none" stroke="#f59e0b" stroke-width="2"/>
              <text x="180" y="68" fill="#f59e0b" font-size="10">V_WL: 1.2V ↔ 0V 快速激發</text>
            </g>

            <!-- 3. 下方受害行 (Victim Row N+1) -->
            <g transform="translate(40, 215)">
              <rect x="0" y="0" width="340" height="65" rx="4" fill="#0f172a" stroke="${isFlipped ? '#ef4444' : '#334155'}" stroke-width="${isFlipped ? 2 : 1}"/>
              <text x="20" y="25" fill="${isFlipped ? '#ef4444' : '#38bdf8'}" font-size="11" font-weight="750">相鄰受害行 (Victim Row N+1) 儲存電容</text>
              <!-- 電荷狀態條 -->
              <rect x="20" y="35" width="220" height="16" rx="3" fill="#1e293b"/>
              <rect x="20" y="35" width="${(chargeLevel / 100) * 220}" height="16" rx="3" fill="${isFlipped ? '#ef4444' : '#10b981'}"/>
              <text x="250" y="48" fill="${isFlipped ? '#ef4444' : '#cbd5e1'}" font-size="10.5" font-weight="700">電荷: ${chargeLevel}%</text>
              <text x="310" y="48" fill="${isFlipped ? '#ef4444' : '#34d399'}" font-size="12" font-weight="800">${isFlipped ? 'Bit 0 (翻轉!)' : 'Bit 1'}</text>
            </g>

            <!-- 右側：物理原理與資安警示看板 -->
            <g transform="translate(400, 25)">
              <rect x="0" y="0" width="255" height="255" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="127" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">硬體物理機制解析</text>
              <line x1="20" y1="35" x2="235" y2="35" stroke="#334155"/>

              <text x="15" y="60" fill="#cbd5e1" font-size="10.5">• 物理間距：相鄰 WL 僅 &lt; 30nm</text>
              <text x="15" y="85" fill="#cbd5e1" font-size="10.5">• 洩漏原因：高頻電磁耦合與穿隧效應</text>
              <text x="15" y="110" fill="#cbd5e1" font-size="10.5">• 臨界門檻：約 50,000 ~ 100,000 次存取</text>
              <text x="15" y="135" fill="#cbd5e1" font-size="10.5">• 資安危害：破壞 OS 頁表實現特權提升</text>

              <rect x="15" y="155" width="225" height="85" rx="4" fill="${isFlipped ? '#450a0a' : '#064e3b'}" stroke="${isFlipped ? '#ef4444' : '#10b981'}" stroke-width="1.5"/>
              <text x="127" y="180" text-anchor="middle" fill="${isFlipped ? '#ef4444' : '#34d399'}" font-size="11" font-weight="800">${isFlipped ? '⚠️ BIT FLIP 翻轉告警！' : '✓ 儲存電荷安全'}</text>
              <text x="127" y="200" text-anchor="middle" fill="#cbd5e1" font-size="9.5">${isFlipped ? '未被讀取的相鄰行記憶體數據已遭篡改' : '尚未達到相鄰電容電荷洩漏崩潰閾值'}</text>
              <text x="127" y="222" text-anchor="middle" fill="${isFlipped ? '#fca5a5' : '#a7f3d0'}" font-size="9.5">${isFlipped ? '點擊「執行 TRR 刷新」即可修復' : 'TRR 硬體演算法持續監控激發頻率'}</text>
            </g>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><path d="M 140,185 L 660,185 M 140,245 L 660,245" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="7 5" class="anim-data-flow" opacity="0.72"/><line x1="400" y1="85" x2="400" y2="335" stroke="#fbbf24" stroke-width="2.2" stroke-dasharray="6 5" class="anim-beam" opacity="0.7"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch24_metric_rowhammer_t}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">~ 64,000 次</div>
          <div class="eng-obj-metric-note">在 64ms 刷新週期內累計重複激活</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">硬體防禦對策</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">TRR (目標行即時刷新)</div>
          <div class="eng-obj-metric-note">硬體計數器在翻轉前強制插入刷新指令</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">伺服器保護機制</div>
          <div class="eng-obj-metric-value">ECC 錯誤檢查與糾正</div>
          <div class="eng-obj-metric-note">單硬體位元翻轉可被即時透明修正 (SEC-DED)</div>
        </div>
      `;

      footerNote = t.ch24_rowhammer_desc;
    } else if (activeTab === 'pvt') {
      const pvtData = {
        SS: { name: 'Slow-Slow (高溫低壓劣質角)', temp: '105 °C', volt: '0.675 V (-10%)', speed: '- 25% 延遲增大', risk: 'Setup Time 時序違規 (當機)' },
        TT: { name: 'Typical-Typical (標稱典型角)', temp: '25 °C', volt: '0.750 V (標稱)', speed: '基準節拍 (100%)', risk: '最佳設計平衡點' },
        FF: { name: 'Fast-Fast (低溫高壓快速角)', temp: '-20 °C', volt: '0.825 V (+10%)', speed: '+ 28% 速度超快', risk: 'Hold Time 保持違規 / 漏電激增' }
      };
      const cur = pvtData[pvtCorner];

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PVT Process Corners and DVFS Model">
          <!-- 上方工藝角按鈕 -->
          <g transform="translate(100, 20)">
            ${Object.keys(pvtData).map((c, i) => `
              <g class="pvt-btn" data-corner="${c}" style="cursor: pointer;" transform="translate(${i * 200}, 0)">
                <rect x="0" y="0" width="180" height="28" rx="4" fill="${pvtCorner === c ? (c === 'SS' ? '#ef4444' : c === 'TT' ? '#10b981' : '#38bdf8') : '#1e293b'}" stroke="${pvtCorner === c ? '#ffffff' : '#334155'}" stroke-width="1.5"/>
                <text x="90" y="18" text-anchor="middle" fill="${pvtCorner === c ? '#09131b' : '#cbd5e1'}" font-size="11.5" font-weight="800">${c} Corner (${c === 'SS' ? '慢速' : c === 'TT' ? '典型' : '快速'})</text>
              </g>
            `).join('')}
          </g>

          <!-- 中央：常態分佈鐘形曲線與晶片分箱 (Binning) -->
          <g transform="translate(60, 65)">
            <rect x="0" y="0" width="680" height="325" rx="8" fill="#09131b" stroke="#1e293b" stroke-width="1.5"/>

            <!-- 標題 -->
            <text x="30" y="30" fill="#38bdf8" font-size="13" font-weight="750">半導體物理波動之必然：${cur.name}</text>

            <!-- 鐘形常態分佈高斯曲線 -->
            <g transform="translate(50, 60)">
              <!-- 坐標軸 -->
              <line x1="0" y1="180" x2="360" y2="180" stroke="#475569" stroke-width="2"/>
              <line x1="180" y1="20" x2="180" y2="180" stroke="#475569" stroke-dasharray="4,4"/>

              <!-- 高斯曲線 -->
              <path d="M 20,175 Q 100,165 140,80 Q 180,10 220,80 Q 260,165 340,175" fill="none" stroke="#94a3b8" stroke-width="2.5"/>

              <!-- 區間標記 -->
              <!-- SS 區 (左) -->
              <rect x="20" y="20" width="100" height="160" fill="#ef4444" opacity="${pvtCorner === 'SS' ? '0.35' : '0.08'}"/>
              <text x="70" y="195" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">SS (慢晶粒)</text>

              <!-- TT 區 (中) -->
              <rect x="120" y="20" width="120" height="160" fill="#10b981" opacity="${pvtCorner === 'TT' ? '0.35' : '0.08'}"/>
              <text x="180" y="195" text-anchor="middle" fill="#10b981" font-size="10" font-weight="700">TT (標稱中值)</text>

              <!-- FF 區 (右) -->
              <rect x="240" y="20" width="100" height="160" fill="#38bdf8" opacity="${pvtCorner === 'FF' ? '0.35' : '0.08'}"/>
              <text x="290" y="195" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700">FF (快晶粒)</text>

              <!-- 當前點指針 -->
              ${(() => {
                const cx = pvtCorner === 'SS' ? 70 : pvtCorner === 'TT' ? 180 : 290;
                return `
                  <line x1="${cx}" y1="10" x2="${cx}" y2="180" stroke="#ffffff" stroke-width="2.5"/>
                  <circle cx="${cx}" cy="${pvtCorner === 'TT' ? 10 : 80}" r="6" fill="#f59e0b"/>
                `;
              })()}
            </g>

            <!-- 右側：DVFS 軟韌體調校策略看板 -->
            <g transform="translate(420, 50)">
              <rect x="0" y="0" width="230" height="240" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="115" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">軟韌體 DVFS 調校參數</text>
              <line x1="20" y1="35" x2="210" y2="35" stroke="#334155"/>

              <text x="15" y="60" fill="#94a3b8" font-size="10.5">極限結溫 (Tj)：</text>
              <text x="115" y="60" fill="#ffffff" font-size="11" font-weight="700">${cur.temp}</text>

              <text x="15" y="85" fill="#94a3b8" font-size="10.5">核心電壓 (Vcore)：</text>
              <text x="115" y="85" fill="#ffffff" font-size="11" font-weight="700">${cur.volt}</text>

              <text x="15" y="110" fill="#94a3b8" font-size="10.5">電晶體開關速度：</text>
              <text x="115" y="110" fill="#f59e0b" font-size="11" font-weight="800">${cur.speed}</text>

              <text x="15" y="135" fill="#94a3b8" font-size="10.5">時序風險類型：</text>
              <text x="115" y="135" fill="#ef4444" font-size="10" font-weight="700">${cur.risk.split(' ')[0]}</text>

              <rect x="15" y="155" width="200" height="65" rx="3" fill="#1e293b"/>
              <text x="115" y="175" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="750">DVFS 韌體應對策略：</text>
              <text x="115" y="195" text-anchor="middle" fill="#cbd5e1" font-size="9.5">${pvtCorner === 'SS' ? '補償電壓 +10% 或降主頻' : pvtCorner === 'TT' ? '採用標稱基準 P-State 曲線' : '降低電壓壓制漏電與過熱'}</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 140,185 L 660,185 M 140,245 L 660,245" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="7 5" class="anim-data-flow" opacity="0.72"/><line x1="400" y1="85" x2="400" y2="335" stroke="#fbbf24" stroke-width="2.2" stroke-dasharray="6 5" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch24_metric_pvt_spread}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">± 25% ~ 30%</div>
          <div class="eng-obj-metric-note">同一晶圓不同晶粒的開關延遲離散</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">晶片分箱機制 (Binning)</div>
          <div class="eng-obj-metric-value">Speed Binned</div>
          <div class="eng-obj-metric-note">體質好作旗艦超頻版，慢晶粒作省電版</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">EFuse 熔絲燒錄</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">出廠晶粒專屬校準</div>
          <div class="eng-obj-metric-note">韌體開機讀取電壓偏移 (Voltage Margin)</div>
        </div>
      `;

      footerNote = t.ch24_pvt_desc;
    } else {
      // irdrop 模式
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IR Drop Dynamic Voltage Drop and Clock Jitter">
          <!-- 上方控制切換 -->
          <g transform="translate(240, 20)">
            <rect x="0" y="0" width="160" height="26" rx="4" class="burst-btn" data-burst="false" fill="${!isBurst ? '#10b981' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="80" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750">穩定閒置負載 (Idle)</text>

            <rect x="180" y="0" width="160" height="26" rx="4" class="burst-btn" data-burst="true" fill="${isBurst ? '#ef4444' : '#1e293b'}" style="cursor: pointer;"/>
            <text x="260" y="17" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750">⚡ 突發巨量運算 (Burst)</text>
          </g>

          <g transform="translate(60, 65)">
            <rect x="0" y="0" width="680" height="325" rx="8" fill="#09131b" stroke="#1e293b" stroke-width="1.5"/>

            <!-- 標題 -->
            <text x="30" y="30" fill="#38bdf8" font-size="13" font-weight="750">供電網路 (PDN) 寄生電阻壓降：ΔV = I_core × R_metal</text>

            <!-- 示波器波形圖 -->
            <g transform="translate(50, 50)">
              <!-- 坐標系 -->
              <rect x="0" y="0" width="360" height="220" rx="4" fill="#000000" stroke="#334155" stroke-width="1"/>
              <!-- 示波器網格 -->
              ${[0, 1, 2, 3, 4].map(y => `<line x1="0" y1="${y * 55}" x2="360" y2="${y * 55}" stroke="#1e293b" stroke-width="1"/>`).join('')}
              ${[0, 1, 2, 3, 4, 5, 6].map(x => `<line x1="${x * 60}" y1="0" x2="${x * 60}" y2="220" stroke="#1e293b" stroke-width="1"/>`).join('')}

              <!-- 標稱電壓參考線 0.75V -->
              <line x1="0" y1="55" x2="360" y2="55" stroke="#10b981" stroke-dasharray="4,4"/>
              <text x="10" y="45" fill="#10b981" font-size="10">標稱電壓 Vdd = 0.75V</text>

              <!-- 動態電壓波形 -->
              ${!isBurst ? `
                <path d="M 0,55 Q 90,53 180,56 T 360,55" fill="none" stroke="#10b981" stroke-width="3"/>
                <text x="180" y="100" text-anchor="middle" fill="#10b981" font-size="12" font-weight="700">供電電壓穩定 · 零 IR Drop 衝擊</text>
              ` : `
                <!-- 突發瞬間的深刻下凹 (Voltage Sag) -->
                <path d="M 0,55 L 80,55 Q 110,55 130,150 Q 150,170 170,165 Q 210,130 250,60 L 360,55" fill="none" stroke="#ef4444" stroke-width="3.5"/>
                <!-- 壓降標記 -->
                <line x1="150" y1="55" x2="150" y2="165" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2,2"/>
                <text x="160" y="115" fill="#ef4444" font-size="12" font-weight="800">ΔV = -120 mV 壓降!</text>
                <text x="180" y="195" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700">瞬態電壓驟降至 0.63V</text>
              `}
            </g>

            <!-- 右側：時序崩潰分析 -->
            <g transform="translate(440, 50)">
              <rect x="0" y="0" width="210" height="220" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
              <text x="105" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">時鐘時序衝擊 (Timing)</text>
              <line x1="20" y1="35" x2="190" y2="35" stroke="#334155"/>

              <text x="15" y="60" fill="#94a3b8" font-size="10.5">瞬態工作電流：</text>
              <text x="115" y="60" fill="${isBurst ? '#ef4444' : '#10b981'}" font-size="11" font-weight="750">${isBurst ? '85 A (突發峰值)' : '12 A (閒置低耗)'}</text>

              <text x="15" y="85" fill="#94a3b8" font-size="10.5">晶片金屬阻抗：</text>
              <text x="115" y="85" fill="#ffffff" font-size="11">~ 1.4 mΩ</text>

              <text x="15" y="110" fill="#94a3b8" font-size="10.5">電晶體開關延遲：</text>
              <text x="115" y="110" fill="${isBurst ? '#ef4444' : '#10b981'}" font-size="11" font-weight="800">${isBurst ? '310 ps (+55%)' : '200 ps (標稱)'}</text>

              <rect x="15" y="130" width="180" height="75" rx="4" fill="${isBurst ? '#450a0a' : '#064e3b'}" stroke="${isBurst ? '#ef4444' : '#10b981'}" stroke-width="1.5"/>
              <text x="105" y="155" text-anchor="middle" fill="${isBurst ? '#ef4444' : '#34d399'}" font-size="11" font-weight="800">${isBurst ? '⚠️ 時序裕量歸零 (Violation)' : '✓ 時鐘時序裕量充裕'}</text>
              <text x="105" y="175" text-anchor="middle" fill="#cbd5e1" font-size="9">${isBurst ? '容易引發軟體隨機 Panic 或 ECC 報警' : '滿足建立時間 (Setup Margin)'}</text>
              <text x="105" y="195" text-anchor="middle" fill="${isBurst ? '#fca5a5' : '#a7f3d0'}" font-size="9">${isBurst ? '對策：增加片上去耦電容 (Decap)' : '晶片背面供電技術可降 40% 壓降'}</text>
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><path d="M 140,185 L 660,185 M 140,245 L 660,245" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="7 5" class="anim-data-flow" opacity="0.72"/><line x1="400" y1="85" x2="400" y2="335" stroke="#fbbf24" stroke-width="2.2" stroke-dasharray="6 5" class="anim-beam" opacity="0.7"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch24_metric_irdrop_v}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 100 mV</div>
          <div class="eng-obj-metric-note">全核滿載突發瞬態電壓下陷</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">時序延遲膨脹</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">+ 30% ~ 55%</div>
          <div class="eng-obj-metric-note">電晶體因欠壓導致充放電減速</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">硬體解法：背面供電 (BSPDN)</div>
          <div class="eng-obj-metric-value">- 40% 壓降損失</div>
          <div class="eng-obj-metric-note">粗金屬軌道直接從背面供電，阻抗暴跌</div>
        </div>
      `;

      footerNote = t.ch24_irdrop_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjCh24Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 24</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh24Title">${t.ch24_title}</h2>
          <p class="eng-obj-subtitle">${t.ch24_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'rowhammer' ? 'is-active' : ''}" data-tab="rowhammer">${t.ch24_tab_rowhammer}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'pvt' ? 'is-active' : ''}" data-tab="pvt">${t.ch24_tab_pvt}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'irdrop' ? 'is-active' : ''}" data-tab="irdrop">${t.ch24_tab_irdrop}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'HW-FW Cross-Layer Clauses' : '硬體－軟韌體跨層協同六大條例'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'TRR/PRAC · ECC · FTL · AVS · 3D NUMA' : 'TRR/PRAC · ECC · FTL · AVS · 3D NUMA'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Temp refresh & PRAC, On-Die ECC/Chipkill, NAND FTL/LDPC, AVS/droop & 3D NUMA' : 'DRAM 溫控刷新與 PRAC、On-Die ECC/Chipkill、NAND FTL/LDPC、AVS/壓降與 3D 排程'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'L·di/dt Droop, DVFS f³ & Hamming ECC Law' : '瞬態壓降、立方功耗與 ECC 纠錯律 (HW/FW Law)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'ΔV = I·R + L·di/dt · P_dyn ∝ V²f · 2^r ≥ k+r+1' : 'ΔV = I·R + L·di/dt · P_dyn ∝ V²f · 2^r ≥ k+r+1'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'BSPDN+DTC tames di/dt, µs DVFS halts runaway & ECC blocks SDC' : 'BSPDN+DTC 抑制壓降、微秒級 DVFS 防熱失控與 SECDED/LDPC 防靜默損毀'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? 'Droop Stretch · SDC/PRAC · Read-Scrub' : 'Droop Stretch · SDC/PRAC · Read-Scrub'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Mitigates L di/dt droop hangs, fleet Silent Data Corruption & NAND read disturb' : '奈秒時脈展頻防瞬態壓降當機、PRAC 與背景巡檢防靜默損毀與 3D NAND 讀取刷新'}</div>
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

    const attackBtn = container.querySelector('#rowHammerAttackBtn');
    if (attackBtn) {
      bindEngineeringEvent(attackBtn, 'click', () => {
        hammerActivations += 25000;
        update();
      });
    }

    const trrBtn = container.querySelector('#rowHammerTrrBtn');
    if (trrBtn) {
      bindEngineeringEvent(trrBtn, 'click', () => {
        hammerActivations = 0;
        update();
      });
    }

    const resetBtn = container.querySelector('#rowHammerResetBtn');
    if (resetBtn) {
      bindEngineeringEvent(resetBtn, 'click', () => {
        hammerActivations = 0;
        update();
      });
    }

    container.querySelectorAll('.pvt-btn').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        pvtCorner = btn.getAttribute('data-corner');
        update();
      });
    });

    container.querySelectorAll('.burst-btn').forEach(btn => {
      bindEngineeringEvent(btn, 'click', () => {
        isBurst = btn.getAttribute('data-burst') === 'true';
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 26. App-Glossary 附錄 A：半導體全域術語拓撲星系與領域雷達圖模型
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderSoftwareHardwareTruthObject as render };
