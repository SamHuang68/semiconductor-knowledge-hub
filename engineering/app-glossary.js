import { renderEngineeringCard, bindEngineeringEvent, registerEngineeringCleanup, disposeEngineeringObject } from '../engineering-object-controls.js';
import { esc, svgTextLines, TEXTS } from './shared.js';

export function renderGlossaryGalaxyObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'radar'; // 'radar' | 'galaxy' | 'acronyms'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'radar') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Semiconductor Glossary Six Domain Radar">
          <!-- 雷達圖中心 (cx=400, cy=200, r=130) -->
          <g transform="translate(0, 0)">
            <!-- 蜘蛛網同心多邊形 (6邊形) -->
            ${[0.25, 0.5, 0.75, 1.0].map(s => {
              const r = 130 * s;
              const pts = [0, 1, 2, 3, 4, 5].map(i => {
                const angle = (i * 60 - 90) * Math.PI / 180;
                return `${400 + r * Math.cos(angle)},${200 + r * Math.sin(angle)}`;
              }).join(' ');
              return `<polygon points="${pts}" fill="none" stroke="#334155" stroke-width="1.2" stroke-dasharray="${s < 1 ? '3,3' : 'none'}"/>`;
            }).join('')}

            <!-- 6 根放射軸線 -->
            ${[0, 1, 2, 3, 4, 5].map(i => {
              const angle = (i * 60 - 90) * Math.PI / 180;
              return `<line x1="400" y1="200" x2="${400 + 130 * Math.cos(angle)}" y2="${200 + 130 * Math.sin(angle)}" stroke="#475569" stroke-width="1.5"/>`;
            }).join('')}

            <!-- 雷達覆蓋區域 (245 筆術語分佈權重) -->
            <!-- 0:微影 (85%), 1:薄膜 (90%), 2:蝕刻 (80%), 3:擴散/佈植 (75%), 4:良率檢測 (95%), 5:先進封裝 (88%) -->
            ${(() => {
              const weights = [0.85, 0.90, 0.80, 0.75, 0.95, 0.88];
              const pts = weights.map((w, i) => {
                const angle = (i * 60 - 90) * Math.PI / 180;
                const r = 130 * w;
                return `${400 + r * Math.cos(angle)},${200 + r * Math.sin(angle)}`;
              }).join(' ');
              return `
                <polygon points="${pts}" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" stroke-width="2.5"/>
                ${weights.map((w, i) => {
                  const angle = (i * 60 - 90) * Math.PI / 180;
                  const r = 130 * w;
                  return `<circle cx="${400 + r * Math.cos(angle)}" cy="${200 + r * Math.sin(angle)}" r="5" fill="#f59e0b"/>`;
                }).join('')}
              `;
            })()}

            <!-- 6 大頂點文字標記 -->
            <!-- 0 (頂部): 微影技術 -->
            <text x="400" y="45" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="800">微影與圖形化 (Litho & Patterning)</text>
            <text x="400" y="60" text-anchor="middle" fill="#94a3b8" font-size="10">EUV / NA / CD / Overlay (48 詞)</text>

            <!-- 1 (右上): 薄膜沉積 -->
            <text x="560" y="130" text-anchor="start" fill="#10b981" font-size="12" font-weight="800">薄膜沉積 (Thin Films)</text>
            <text x="560" y="145" text-anchor="start" fill="#94a3b8" font-size="10">ALD / PVD / CVD / CMP (42 詞)</text>

            <!-- 2 (右下): 電漿蝕刻 -->
            <text x="560" y="275" text-anchor="start" fill="#f59e0b" font-size="12" font-weight="800">電漿蝕刻 (Plasma Etch)</text>
            <text x="560" y="290" text-anchor="start" fill="#94a3b8" font-size="10">ICP / RIE / Selectivity (38 詞)</text>

            <!-- 3 (底部): 擴散佈植 -->
            <text x="400" y="360" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="800">佈植與熱處理 (Implant & Thermal)</text>
            <text x="400" y="375" text-anchor="middle" fill="#94a3b8" font-size="10">RTA / Junction / Channelling (32 詞)</text>

            <!-- 4 (左下): 量測良率 -->
            <text x="240" y="275" text-anchor="end" fill="#34d399" font-size="12" font-weight="800">線上量測與良率 (Metrology & Yield)</text>
            <text x="240" y="290" text-anchor="end" fill="#94a3b8" font-size="10">CD-SEM / SPC / FIB / TEM (50 詞)</text>

            <!-- 5 (左上): 先進封裝 -->
            <text x="240" y="130" text-anchor="end" fill="#ec4899" font-size="12" font-weight="800">先進封裝 (Advanced Packaging)</text>
            <text x="240" y="145" text-anchor="end" fill="#94a3b8" font-size="10">2.5D CoWoS / SoIC / TSV (35 詞)</text>
          </g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="205" r="72" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 130,65 Q 400,35 670,65" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g><g class="eng-kinetic-overlay" pointer-events="none"><circle cx="400" cy="210" r="145" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="8 8" class="anim-data-flow" opacity="0.55"/><path d="M 190,110 L 400,210 L 610,110 M 190,310 L 400,210 L 610,310" fill="none" stroke="#34d399" stroke-width="1.8" stroke-dasharray="6 6" class="anim-beam" opacity="0.65"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_glossary_metric_terms}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">245 條</div>
          <div class="eng-obj-metric-note">涵蓋半導體製造全產業鏈核心語彙</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_glossary_metric_domains}</div>
          <div class="eng-obj-metric-value">6 大核心軸線</div>
          <div class="eng-obj-metric-note">微影 · 薄膜 · 蝕刻 · 佈植 · 檢測 · 封裝</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.app_glossary_metric_bilingual}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">100% 雙語對齊</div>
          <div class="eng-obj-metric-note">附權威英文縮寫與完整定義解釋</div>
        </div>
      `;

      footerNote = t.app_glossary_radar_desc;
    } else if (activeTab === 'galaxy') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Knowledge Galaxy Topological Network">
          <g transform="translate(400, 210)">
            <!-- 背景發光核心軌道 -->
            <circle cx="0" cy="0" r="160" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="6,6"/>
            <circle cx="0" cy="0" r="90" fill="none" stroke="#1e293b" stroke-width="1.5"/>

            <!-- 中心太陽：300mm 晶圓實體 -->
            <circle cx="0" cy="0" r="42" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
            <text x="0" y="5" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="800">300mm 晶圓</text>
            <text x="0" y="20" text-anchor="middle" fill="#94a3b8" font-size="9">全域拓撲核心</text>

            <!-- 環繞衛星節點 (6大星系群) -->
            ${[
              { name: '微影 Litho', color: '#38bdf8', angle: 0, r: 150 },
              { name: '薄膜 CVD/ALD', color: '#10b981', angle: 60, r: 155 },
              { name: '電漿蝕刻 Etch', color: '#f59e0b', angle: 120, r: 145 },
              { name: '離子佈植 Implant', color: '#c084fc', angle: 180, r: 155 },
              { name: 'SPC 良率控制', color: '#34d399', angle: 240, r: 150 },
              { name: '3D 異質封裝', color: '#ec4899', angle: 300, r: 160 }
            ].map(sat => {
              const rad = sat.angle * Math.PI / 180;
              const x = sat.r * Math.cos(rad);
              const y = sat.r * Math.sin(rad);
              return `
                <line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${sat.color}" stroke-width="1.5" opacity="0.4"/>
                <g transform="translate(${x}, ${y})">
                  <circle cx="0" cy="0" r="28" fill="#09131b" stroke="${sat.color}" stroke-width="2"/>
                  <text x="0" y="4" text-anchor="middle" fill="${sat.color}" font-size="9.5" font-weight="750">${sat.name.split(' ')[0]}</text>
                  <text x="0" y="16" text-anchor="middle" fill="#cbd5e1" font-size="8.5">${sat.name.split(' ')[1] || ''}</text>
                </g>
              `;
            }).join('')}
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><circle cx="400" cy="210" r="145" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="8 8" class="anim-data-flow" opacity="0.55"/><path d="M 190,110 L 400,210 L 610,110 M 190,310 L 400,210 L 610,310" fill="none" stroke="#34d399" stroke-width="1.8" stroke-dasharray="6 6" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">跨章節關聯引用鏈</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 380 處</div>
          <div class="eng-obj-metric-note">點擊術語可無縫跨章跳轉學習</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">最密集關鍵字</div>
          <div class="eng-obj-metric-value">CD, CMP, SPC, GAA</div>
          <div class="eng-obj-metric-note">半導體跨學科共通高頻術語</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">學習效率增益</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">+ 300% 脈絡理解</div>
          <div class="eng-obj-metric-note">打通前後段與軟硬體知識邊界</div>
        </div>
      `;

      footerNote = t.app_glossary_galaxy_desc;
    } else {
      // acronyms 矩陣
      const topAcronyms = [
        { ac: 'ALD', full: 'Atomic Layer Deposition', zh: '原子層沉積 (四步自限循環)' },
        { ac: 'EUV', full: 'Extreme Ultraviolet', zh: '極紫外光微影 (13.5nm)' },
        { ac: 'CMP', full: 'Chemical Mechanical Planarization', zh: '化學機械平坦化' },
        { ac: 'TSV', full: 'Through-Silicon Via', zh: '矽穿孔 (先進封裝互連)' },
        { ac: 'GAA', full: 'Gate-All-Around', zh: '全環繞閘極 (奈米片電晶體)' },
        { ac: 'Cpk', full: 'Process Capability Index', zh: '製程能力指數 (目標≥1.67)' },
        { ac: 'WAT', full: 'Wafer Acceptance Test', zh: '晶圓允收測試 (劃線區驗收)' },
        { ac: 'OCAP', full: 'Out of Control Action Plan', zh: '失控應變作業準則' }
      ];

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Top Semiconductor Acronyms Matrix">
          <g transform="translate(60, 30)">
            <text x="340" y="20" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">工程師必備高頻英語縮寫矩陣 (Top Industry Acronyms)</text>
            <g transform="translate(0, 40)">
              ${topAcronyms.map((item, idx) => {
                const r = Math.floor(idx / 4);
                const c = idx % 4;
                return `
                  <g transform="translate(${c * 175}, ${r * 140})">
                    <rect x="0" y="0" width="165" height="120" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                    <rect x="0" y="0" width="165" height="36" rx="6" fill="#1e293b"/>
                    <text x="82" y="24" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="800">${item.ac}</text>
                    <text x="82" y="60" text-anchor="middle" fill="#10b981" font-size="10.5" font-weight="700">${item.full}</text>
                    <text x="82" y="90" text-anchor="middle" fill="#cbd5e1" font-size="10">${item.zh}</text>
                  </g>
                `;
              }).join('')}
            </g>
          </g>
          <g class="eng-kinetic-overlay" pointer-events="none"><circle cx="400" cy="210" r="145" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="8 8" class="anim-data-flow" opacity="0.55"/><path d="M 190,110 L 400,210 L 610,110 M 190,310 L 400,210 L 610,310" fill="none" stroke="#34d399" stroke-width="1.8" stroke-dasharray="6 6" class="anim-beam" opacity="0.65"/></g>
          <g class="eng-kinetic-wave" pointer-events="none"><circle cx="400" cy="200" r="68" fill="none" stroke="#38bdf8" stroke-width="1.4" class="anim-pulse-ring" opacity="0.45"/><path d="M 140,60 Q 400,32 660,60" fill="none" stroke="#34d399" stroke-width="1.5" class="anim-field-glow" opacity="0.5"/></g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">收錄英文縮寫</div>
          <div class="eng-obj-metric-value">&gt; 180 個</div>
          <div class="eng-obj-metric-note">國際 SEMI 標準術語規範</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">常用會議行話縮寫</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">Hold, WIP, OOC, Scrap</div>
          <div class="eng-obj-metric-note">跨廠工程溝通零障礙</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">查詢與導覽相容</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">快捷鍵 J 鍵速開</div>
          <div class="eng-obj-metric-note">任何頁面隨時召喚行話與術語字典</div>
        </div>
      `;

      footerNote = t.app_glossary_radar_desc;
    }

    renderEngineeringCard(container, `
      <section class="eng-obj-card" aria-labelledby="engObjGlossaryTitle">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · APPENDIX A</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjGlossaryTitle">${t.app_glossary_title}</h2>
          <p class="eng-obj-subtitle">${t.app_glossary_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'radar' ? 'is-active' : ''}" data-tab="radar">${t.app_glossary_tab_radar}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'galaxy' ? 'is-active' : ''}" data-tab="galaxy">${t.app_glossary_tab_galaxy}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'acronyms' ? 'is-active' : ''}" data-tab="acronyms">${t.app_glossary_tab_acronyms}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? '8-Domain Terminology Clauses' : '八大工程領域術語條例 (8-Domain)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: var(--semi-teal);">${lang === 'en' ? 'Substrate · FE/BEOL · 3D · CIM' : '基板 · 前中後段 · 3D封裝 · CIM'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Unites 245 bilingual terms, physical dimensions & 25-chapter 3D clauses' : '串聯 245 筆中英術語、物理量綱標尺與全書 25 章 3D 整合架構'}</div>
          </div>
          <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? '8-Domain Quantitative Scaling Benchmarks' : '八大領域定量物理量綱總覽 (SI & Scaling)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #0284c7;">${lang === 'en' ? 'Å (10⁻¹⁰m) · fF (10⁻¹⁵F) · pJ/bit · DPPM/FIT' : 'Å (10⁻¹⁰m) · fF (10⁻¹⁵F) · pJ/bit · DPPM/FIT'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Spans angstrom EOT, femtofarad DRAM cells, sub-pJ 3D I/O & FIT' : '橫跨埃米閘極氧化層、飛法拉 DRAM 電容、皮焦耳 3D 互連與十億小時 FIT'}</div>
          </div>
                  <div class="eng-obj-metric-card">
            <div class="eng-obj-metric-label">${lang === 'en' ? 'Failure Diagnostics & OCAP' : '現場異常診斷與防呆 (Failure & OCAP)'}</div>
            <div class="eng-obj-metric-value" style="font-size: 13.5px; color: #d97706;">${lang === 'en' ? '245 Terms · 75+ Laws · 75 Failure Modes' : '245 Terms · 75+ Laws · 75 Failure Modes'}</div>
            <div class="eng-obj-metric-note">${lang === 'en' ? 'Cross-links 245 glossary terms to 75+ equations & 75 fab failure modes' : '將 245 條標準名詞雙向對映至全書 25 章物理定律與 75 項現場失效排查條例'}</div>
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
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 27. App-Jargon 附錄 B：晶圓廠現場黑話情境解碼器模型
 * ══════════════════════════════════════════════════════════════════════════════
 */
export { renderGlossaryGalaxyObject as render };
