/**
 * build-data.js
 * 將繁體中文參考教材解析轉換為零相依純前端資料庫
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeChapterHref } from '../章節連結.js';

const REF_DIR = 'C:/Users/Sam/AI-Workspace/reference/Semiconductor_Manufacturing_Introduction/zh-TW';
const OUTPUT_DATA_DIR = fileURLToPath(new URL('../data/', import.meta.url));

if (!fs.existsSync(OUTPUT_DATA_DIR)) {
  fs.mkdirSync(OUTPUT_DATA_DIR, { recursive: true });
}

// 章節對照表
const CHAPTER_DEF = [
  // 第 0 部
  { part: '第 0 部　開始之前', partId: 'part-0', chId: 'ch00', num: 0, title: '半導體製造全景', file: '0-before-you-start/00-overview/README.md', category: 'overview' },
  { part: '第 0 部　開始之前', partId: 'part-0', chId: 'ch01', num: 1, title: '晶圓廠如何運作', file: '0-before-you-start/01-how-a-fab-works/README.md', category: 'overview' },
  // 第 1 部
  { part: '第 1 部　基礎', partId: 'part-1', chId: 'ch02', num: 2, title: '從物理到電晶體', file: '1-fundamentals/02-transistor-basics/README.md', category: 'fundamentals' },
  { part: '第 1 部　基礎', partId: 'part-1', chId: 'ch03', num: 3, title: '從沙子到晶圓', file: '1-fundamentals/03-sand-to-wafer/README.md', category: 'fundamentals' },
  // 第 2 部
  { part: '第 2 部　製程模組', partId: 'part-2', chId: 'ch04', num: 4, title: '微影', file: '2-process-modules/04-lithography/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partId: 'part-2', chId: 'ch05', num: 5, title: '薄膜', file: '2-process-modules/05-thin-films/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partId: 'part-2', chId: 'ch06', num: 6, title: '蝕刻', file: '2-process-modules/06-etching/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partId: 'part-2', chId: 'ch07', num: 7, title: '離子佈植與熱處理', file: '2-process-modules/07-ion-implantation/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partId: 'part-2', chId: 'ch08', num: 8, title: 'CMP', file: '2-process-modules/08-cmp/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partId: 'part-2', chId: 'ch09', num: 9, title: '清洗與污染控制', file: '2-process-modules/09-cleaning/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partId: 'part-2', chId: 'ch10', num: 10, title: '金屬化', file: '2-process-modules/10-metallization/README.md', category: 'modules' },
  // 第 3 部
  { part: '第 3 部　製程整合', partId: 'part-3', chId: 'ch11', num: 11, title: '走一遍完整的 CMOS 流程', file: '3-integration/11-cmos-process-flow/README.md', category: 'integration' },
  { part: '第 3 部　製程整合', partId: 'part-3', chId: 'ch12', num: 12, title: '先進電晶體結構', file: '3-integration/12-advanced-transistors/README.md', category: 'integration' },
  { part: '第 3 部　製程整合', partId: 'part-3', chId: 'ch13', num: 13, title: '記憶體製程', file: '3-integration/13-memory/README.md', category: 'integration' },
  { part: '第 3 部　製程整合', partId: 'part-3', chId: 'ch14', num: 14, title: '「幾奈米」是什麼意思', file: '3-integration/14-process-nodes/README.md', category: 'integration' },
  // 第 4 部
  { part: '第 4 部　品質與良率', partId: 'part-4', chId: 'ch15', num: 15, title: '量測與檢測', file: '4-yield-and-quality/15-metrology/README.md', category: 'quality' },
  { part: '第 4 部　品質與良率', partId: 'part-4', chId: 'ch16', num: 16, title: '良率與故障分析', file: '4-yield-and-quality/16-yield-analysis/README.md', category: 'quality' },
  { part: '第 4 部　品質與良率', partId: 'part-4', chId: 'ch17', num: 17, title: '製程控制', file: '4-yield-and-quality/17-process-control/README.md', category: 'quality' },
  { part: '第 4 部　品質與良率', partId: 'part-4', chId: 'ch18', num: 18, title: '異常處理與工程變更', file: '4-yield-and-quality/18-abnormality-handling/README.md', category: 'quality' },
  // 第 5 部
  { part: '第 5 部　後段：測試與封裝', partId: 'part-5', chId: 'ch19', num: 19, title: '晶圓測試', file: '5-backend/19-wafer-test/README.md', category: 'backend' },
  { part: '第 5 部　後段：測試與封裝', partId: 'part-5', chId: 'ch20', num: 20, title: '封裝', file: '5-backend/20-packaging/README.md', category: 'backend' },
  { part: '第 5 部　後段：測試與封裝', partId: 'part-5', chId: 'ch21', num: 21, title: '先進封裝', file: '5-backend/21-advanced-packaging/README.md', category: 'backend' },
  { part: '第 5 部　後段：測試與封裝', partId: 'part-5', chId: 'ch22', num: 22, title: '最終測試與可靠度', file: '5-backend/22-final-test-and-reliability/README.md', category: 'backend' },
  // 第 6 部
  { part: '第 6 部　走出晶圓廠', partId: 'part-6', chId: 'ch23', num: 23, title: '工廠如何被系統管理', file: '6-beyond-the-fab/23-fab-systems/README.md', category: 'systems' },
  { part: '第 6 部　走出晶圓廠', partId: 'part-6', chId: 'ch24', num: 24, title: '製程如何影響韌體', file: '6-beyond-the-fab/24-process-and-firmware/README.md', category: 'systems' },
  // 附錄
  { part: '附錄', partId: 'part-app', chId: 'app-glossary', num: 25, title: '附錄 A　術語總表', file: 'appendix/glossary.md', category: 'appendix' },
  { part: '附錄', partId: 'part-app', chId: 'app-jargon', num: 26, title: '附錄 B　現場行話', file: 'appendix/fab-jargon.md', category: 'appendix' },
  { part: '附錄', partId: 'part-app', chId: 'app-reading', num: 27, title: '附錄 C　延伸閱讀', file: 'appendix/further-reading.md', category: 'appendix' }
];

/**
 * 簡易而強固的 Markdown 轉 HTML 解析器（原生純 JS 實作，零相依）
 */
function markdownToHtml(md) {
  let lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = [];
  let inCode = false;
  let codeLang = '';
  let codeBuffer = [];
  let inTable = false;
  let tableBuffer = [];
  let inBlockquote = false;
  let blockquoteBuffer = [];

  function flushTable() {
    if (tableBuffer.length === 0) return;
    let rows = tableBuffer.map(r => r.trim()).filter(r => r.startsWith('|') && r.endsWith('|'));
    if (rows.length < 2) {
      html.push(...tableBuffer);
      tableBuffer = [];
      return;
    }
    let header = rows[0].split('|').slice(1, -1).map(c => c.trim());
    // 檢查第二行是否為分隔線
    let isAlignRow = /^\|[\s-:]+\|/.test(rows[1]);
    let startRow = isAlignRow ? 2 : 1;
    let tableHtml = ['<div class="table-container"><table class="semi-table"><thead><tr>'];
    header.forEach(h => {
      tableHtml.push(`<th>${formatInline(h)}</th>`);
    });
    tableHtml.push('</tr></thead><tbody>');
    for (let i = startRow; i < rows.length; i++) {
      let cells = rows[i].split('|').slice(1, -1).map(c => c.trim());
      tableHtml.push('<tr>');
      cells.forEach(c => {
        tableHtml.push(`<td>${formatInline(c)}</td>`);
      });
      tableHtml.push('</tr>');
    }
    tableHtml.push('</tbody></table></div>');
    html.push(tableHtml.join(''));
    tableBuffer = [];
  }

  function flushBlockquote() {
    if (blockquoteBuffer.length === 0) return;
    let bqContent = blockquoteBuffer.join('\n');
    blockquoteBuffer = [];
    
    // 檢查是否為 GitHub callout: > [!TIP], > [!NOTE], > 📍 **晶圓位置**
    if (bqContent.includes('[!TIP]') || bqContent.includes('Know-how')) {
      let cleaned = bqContent.replace(/\[!TIP\]\s*/g, '').trim();
      html.push(`<div class="callout callout-knowhow"><div class="callout-badge">🔧 FAB KNOW-HOW 現場實務</div><div class="callout-body">${markdownToHtml(cleaned)}</div></div>`);
    } else if (bqContent.includes('[!NOTE]') || bqContent.includes('名詞')) {
      let cleaned = bqContent.replace(/\[!NOTE\]\s*/g, '').trim();
      html.push(`<div class="callout callout-glossary"><div class="callout-badge">📖 GLOSSARY 核心名詞</div><div class="callout-body">${markdownToHtml(cleaned)}</div></div>`);
    } else if (bqContent.includes('晶圓位置')) {
      html.push(`<div class="callout callout-wafer-pos"><div class="callout-badge">📍 WAFER TRACK 晶圓站點</div><div class="callout-body">${markdownToHtml(bqContent)}</div></div>`);
    } else {
      html.push(`<blockquote class="semi-blockquote">${markdownToHtml(bqContent)}</blockquote>`);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // 程式碼區塊
    if (line.startsWith('```')) {
      if (inTable) { flushTable(); inTable = false; }
      if (inBlockquote) { flushBlockquote(); inBlockquote = false; }
      if (!inCode) {
        inCode = true;
        codeLang = line.replace('```', '').trim();
        codeBuffer = [];
      } else {
        inCode = false;
        let escaped = codeBuffer.join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        if (codeLang === 'mermaid') {
          html.push(`<div class="mermaid-diagram" data-mermaid="${escapeHtmlAttr(codeBuffer.join('\n'))}"><pre class="code-pre"><code>${escaped}</code></pre></div>`);
        } else {
          html.push(`<pre class="code-pre ${codeLang ? 'lang-' + codeLang : ''}"><code>${escaped}</code></pre>`);
        }
      }
      continue;
    }
    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    // 引用區塊
    if (line.startsWith('>')) {
      if (inTable) { flushTable(); inTable = false; }
      inBlockquote = true;
      blockquoteBuffer.push(line.replace(/^>\s?/, ''));
      continue;
    } else if (inBlockquote) {
      if (line.trim() === '') {
        // blockquote 內部空行
        blockquoteBuffer.push('');
        continue;
      } else {
        flushBlockquote();
        inBlockquote = false;
      }
    }

    // 表格
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      inTable = true;
      tableBuffer.push(line.trim());
      continue;
    } else if (inTable) {
      flushTable();
      inTable = false;
    }

    // 分隔線
    if (/^---{3,}$/.test(line.trim())) {
      html.push('<hr class="semi-hr" />');
      continue;
    }

    // 標題
    let headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      let level = headerMatch[1].length;
      let text = headerMatch[2].trim();
      let anchor = createSlug(text);
      html.push(`<h${level} id="${anchor}" class="heading-anchor">${formatInline(text)}<a class="anchor-link" href="#${anchor}" aria-hidden="true">#</a></h${level}>`);
      continue;
    }

    // 清單
    if (/^\s*[-*]\s+(.*)$/.test(line)) {
      let match = line.match(/^\s*[-*]\s+(.*)$/);
      html.push(`<ul class="semi-ul"><li>${formatInline(match[1])}</li></ul>`);
      continue;
    }

    // 數字清單
    if (/^\s*\d+\.\s+(.*)$/.test(line)) {
      let match = line.match(/^\s*\d+\.\s+(.*)$/);
      html.push(`<ol class="semi-ol"><li>${formatInline(match[1])}</li></ol>`);
      continue;
    }

    // 空行
    if (line.trim() === '') {
      continue;
    }

    // 一般段落
    html.push(`<p class="semi-p">${formatInline(line)}</p>`);
  }

  if (inTable) flushTable();
  if (inBlockquote) flushBlockquote();

  // 合併相鄰的 ul / ol
  let result = html.join('\n');
  result = result.replace(/<\/ul>\n<ul class="semi-ul">/g, '');
  result = result.replace(/<\/ol>\n<ol class="semi-ol">/g, '');
  return result;
}

function formatInline(str) {
  if (!str) return '';
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
      // 替換圖片路徑為本地 assets
      let fileName = path.basename(src);
      return `<figure class="semi-figure"><img src="assets/${fileName}" alt="${alt}" class="semi-img" loading="lazy" /><figcaption>${alt}</figcaption></figure>`;
    })
    .replace(/\[(.*?)\]\((.*?)\)/g, (match, text, href) => {
      // 處理相對章節連結
      const cleanHref = normalizeChapterHref(href);
      return `<a href="${cleanHref}" class="semi-link">${text}</a>`;
    });
}

function createSlug(text) {
  return text.toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function escapeHtmlAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/**
 * 主執行流程
 */
function build() {
  console.log('開始解析 25 章內容與附錄...');
  const chapters = [];
  const searchIndex = [];

  for (const def of CHAPTER_DEF) {
    const fullPath = path.join(REF_DIR, def.file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`檔案不存在: ${fullPath}`);
      continue;
    }
    const rawContent = fs.readFileSync(fullPath, 'utf8');

    // 提取大標題
    let titleMatch = rawContent.match(/^#\s+(.+)$/m);
    let fullTitle = titleMatch ? titleMatch[1].trim() : def.title;

    // 提取晶圓位置
    let waferTrack = '';
    let trackMatch = rawContent.match(/> 📍 \*\*晶圓位置\*\*([\s\S]*?)---/);
    if (trackMatch) {
      waferTrack = trackMatch[1].trim().replace(/^>\s*/gm, '');
    }

    // 提取 H2 標題作為 TOC
    let headings = [];
    let h2Matches = rawContent.matchAll(/^##\s+(.+)$/gm);
    for (const h of h2Matches) {
      let hText = h[1].trim();
      headings.push({
        text: hText,
        id: createSlug(hText)
      });
    }

    // 轉換正文
    let htmlContent = markdownToHtml(rawContent);

    // 建立搜尋片段
    let plainText = rawContent
      .replace(/<[^>]+>/g, ' ')
      .replace(/[#*`|>-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    searchIndex.push({
      chId: def.chId,
      num: def.num,
      title: fullTitle,
      part: def.part,
      snippet: plainText.substring(0, 300),
      keywords: plainText.substring(0, 2000)
    });

    chapters.push({
      id: def.chId,
      part: def.part,
      partId: def.partId,
      num: def.num,
      shortTitle: def.title,
      fullTitle: fullTitle,
      category: def.category,
      waferTrack: waferTrack,
      headings: headings,
      contentHtml: htmlContent
    });
  }

  // 解析附錄 A: 術語總表
  const glossaryList = [];
  const glossaryPath = path.join(REF_DIR, 'appendix/glossary.md');
  if (fs.existsSync(glossaryPath)) {
    const gText = fs.readFileSync(glossaryPath, 'utf8');
    const lines = gText.split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('|') && !line.includes('英文 | 縮寫') && !line.includes('|---|')) {
        const parts = line.split('|').slice(1, -1).map(s => s.trim());
        if (parts.length >= 5) {
          glossaryList.push({
            en: parts[0],
            abbr: parts[1] === '—' ? '' : parts[1],
            zh: parts[2],
            desc: parts[3],
            chapter: parts[4]
          });
        }
      }
    }
  }

  // 解析附錄 B: 現場行話
  const jargonList = [];
  const jargonPath = path.join(REF_DIR, 'appendix/fab-jargon.md');
  if (fs.existsSync(jargonPath)) {
    const jText = fs.readFileSync(jargonPath, 'utf8');
    let currentCategory = '晶圓與批次';
    const lines = jText.split('\n');
    for (const line of lines) {
      if (line.startsWith('## ')) {
        currentCategory = line.replace('## ', '').trim();
      } else if (line.trim().startsWith('|') && !line.includes('行話 | 意思') && !line.includes('|---|')) {
        const parts = line.split('|').slice(1, -1).map(s => s.trim());
        if (parts.length >= 3) {
          jargonList.push({
            term: parts[0],
            meaning: parts[1],
            example: parts[2],
            category: currentCategory
          });
        }
      }
    }
  }

  // 寫入 data 檔案 (ES 模組格式，支援瀏覽器與 Node)
  const chaptersCode = `/**
 * chapters-data.js
 * 半導體製造知識庫 25 章完整結構化內容
 */
export const CHAPTERS_DATA = ${JSON.stringify(chapters, null, 2)};
`;

  const searchCode = `/**
 * search-index.js
 * 純前端全文檢索索引
 */
export const SEARCH_INDEX = ${JSON.stringify(searchIndex, null, 2)};
`;

  const glossaryCode = `/**
 * glossary-data.js
 * 附錄 A 術語總表 (${glossaryList.length} 條目) 與 附錄 B 現場行話 (${jargonList.length} 條目)
 */
export const GLOSSARY_DATA = ${JSON.stringify(glossaryList, null, 2)};
export const JARGON_DATA = ${JSON.stringify(jargonList, null, 2)};
`;

  fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'chapters-data.js'), chaptersCode, 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'search-index.js'), searchCode, 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'glossary-data.js'), glossaryCode, 'utf8');

  console.log(`完成！已輸出:
  - ${chapters.length} 個章節至 chapters-data.js
  - ${searchIndex.length} 筆全文索引至 search-index.js
  - ${glossaryList.length} 筆術語及 ${jargonList.length} 筆現場行話至 glossary-data.js`);
}

build();
