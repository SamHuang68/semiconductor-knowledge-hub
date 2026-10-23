/**
 * data/opc-demonstrator-data.js
 * 先進微影 OPC 光學近似修正與反向微影技術展示器 (OPC & ILT Demonstrator)
 * 50 輪深度工程優化 Stage 23 (Rounds 111–115)
 * 
 * 模擬次波長微影繞射失真（Corner Rounding、Line-End Shortening、Iso-Dense Bias），
 * 並展示光罩幾何補償（Serif、Hammerhead、SRAF）與晶圓空中成像 (Aerial Image)。
 */

export const OPC_CASES = {
  line_end: {
    id: 'line_end',
    titleZh: '線端縮短補償 (Line-End Shortening & Hammerhead)',
    titleEn: 'Line-End Shortening & Hammerhead Correction',
    distortionDescZh: '繞射效應造成光線在線條端點處向內收縮，導致接觸孔或閘極無法完整覆蓋主動區。',
    distortionDescEn: 'Diffraction causes light intensity to pull back at line ends, resulting in gate coverage loss.',
    solutionZh: '在光罩線端加上「錘頭 (Hammerhead)」擴增幾何面積，補償收縮量。',
    solutionEn: 'Add hammerhead serifs at line ends on the photomask to pull the optical intensity profile outward.',
    maskShapes: [
      { type: 'rect', x: 40, y: 30, w: 20, h: 100, fill: '#0284c7' }, // 原始主線
      { type: 'rect', x: 34, y: 22, w: 32, h: 12, fill: '#ea580c' }  // 錘頭補償
    ],
    waferImageD: 'M 40,36 C 40,28 60,28 60,36 L 60,126 C 60,132 40,132 40,126 Z'
  },
  corner_serif: {
    id: 'corner_serif',
    titleZh: '轉角圓鈍與襯線補償 (Corner Rounding & Corner Serifs)',
    titleEn: 'Corner Rounding & Corner Serifs Correction',
    distortionDescZh: '直角轉折處高頻繞射光波遺失，導致原本直角在晶圓上大幅圓鈍退化。',
    distortionDescEn: 'Loss of high spatial diffraction frequencies rounds sharp right-angle corners into arcs.',
    solutionZh: '在光罩直角外凸處增加正襯線 (Positive Serif)，內凹處開負切口 (Negative Serif)。',
    solutionEn: 'Add positive serifs at convex corners and negative notches at concave corners.',
    maskShapes: [
      { type: 'polygon', points: '30,30 90,30 90,70 60,70 60,110 30,110', fill: '#0284c7' },
      { type: 'rect', x: 88, y: 28, w: 8, h: 8, fill: '#ea580c' }, // 外凸襯線
      { type: 'rect', x: 26, y: 28, w: 8, h: 8, fill: '#ea580c' }
    ],
    waferImageD: 'M 35,35 Q 60,32 85,35 Q 88,50 85,65 Q 70,68 65,75 Q 62,90 60,105 Q 45,108 35,105 Z'
  },
  sraf_assist: {
    id: 'sraf_assist',
    titleZh: '次解析度輔助圖案 (Sub-Resolution Assist Features, SRAF)',
    titleEn: 'Sub-Resolution Assist Features (SRAF)',
    distortionDescZh: '孤立線條 (Isolated Line) 缺少相鄰光學干涉，焦深 (DOF) 與製程視窗大幅萎縮。',
    distortionDescEn: 'Isolated features lack neighboring diffraction interference, severely shrinking depth of focus.',
    solutionZh: '在主線條兩側擺放無法在晶圓上成像的極細次解析度輔助線 (SRAF)，模擬密集線光學干涉。',
    solutionEn: 'Place non-printing sub-resolution assist bars adjacent to isolated lines to mimic dense pitch interference.',
    maskShapes: [
      { type: 'rect', x: 50, y: 20, w: 16, h: 120, fill: '#0284c7' }, // 主線
      { type: 'rect', x: 24, y: 20, w: 6, h: 120, fill: '#ca8a04' }, // 左 SRAF
      { type: 'rect', x: 86, y: 20, w: 6, h: 120, fill: '#ca8a04' }  // 右 SRAF
    ],
    waferImageD: 'M 50,22 L 66,22 L 66,138 L 50,138 Z'
  }
};

/**
 * 產生 OPC 比較視圖 SVG 標記
 * @param {string} caseId
 * @param {'zh'|'en'} lang
 * @param {number} [width=480]
 * @param {number} [height=180]
 */
export function renderOpcComparisonSvg(caseId, lang = 'zh', width = 480, height = 180) {
  const c = OPC_CASES[caseId] || OPC_CASES.line_end;
  const isEn = lang === 'en';

  return `
    <div class="opc-demo-card" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; margin: 12px 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 700; color: #0284c7; font-size: 13.5px;">${isEn ? c.titleEn : c.titleZh}</span>
        <span style="font-size: 11px; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: 600;">OPC / RET</span>
      </div>
      <p style="font-size: 12px; color: #475569; margin: 0 0 10px 0;">${isEn ? c.solutionEn : c.solutionZh}</p>
      
      <svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="${isEn ? c.titleEn : c.titleZh}">
        <!-- 左側面板：修正後光罩 (Corrected Mask) -->
        <g transform="translate(40, 10)">
          <rect x="0" y="0" width="160" height="150" fill="#f8fafc" stroke="#94a3b8" rx="6" />
          <text x="80" y="20" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">${isEn ? 'Photomask (OPC Shapes)' : '光罩圖形 (加補償)'}</text>
          <g transform="translate(20, 10)">
            ${c.maskShapes.map(s => {
              if (s.type === 'rect') return `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="${s.fill}" rx="1" />`;
              if (s.type === 'polygon') return `<polygon points="${s.points}" fill="${s.fill}" />`;
              return '';
            }).join('')}
          </g>
        </g>

        <!-- 中間箭頭：光學微影投射 -->
        <g transform="translate(225, 80)">
          <line x1="0" y1="0" x2="30" y2="0" stroke="#0284c7" stroke-width="2.5" marker-end="url(#opc-arrow)" />
          <text x="15" y="-10" text-anchor="middle" font-size="10" font-weight="600" fill="#0284c7">13.5nm / 193i</text>
        </g>

        <!-- 右側面板：晶圓空中曝光成像 (Wafer Aerial Image) -->
        <g transform="translate(280, 10)">
          <rect x="0" y="0" width="160" height="150" fill="#f8fafc" stroke="#94a3b8" rx="6" />
          <text x="80" y="20" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">${isEn ? 'Wafer Target Achieved' : '晶圓實體曝光成像'}</text>
          <g transform="translate(20, 10)">
            <path d="${c.waferImageD}" fill="#0d9488" stroke="#0f766e" stroke-width="1.5" opacity="0.9" />
          </g>
        </g>
      </svg>
    </div>
  `;
}
