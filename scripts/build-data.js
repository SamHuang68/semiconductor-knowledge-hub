/**
 * build-data.js
 * 將繁體中文與英文參考教材解析轉換為中英雙語純前端資料庫
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeChapterHref } from '../chapter-links.js';

const REF_DIR_ZH = 'C:/Users/Sam/AI-Workspace/reference/Semiconductor_Manufacturing_Introduction/zh-TW';
const REF_DIR_EN = 'C:/Users/Sam/AI-Workspace/reference/Semiconductor_Manufacturing_Introduction/en';
const OUTPUT_DATA_DIR = fileURLToPath(new URL('../data/', import.meta.url));

if (!fs.existsSync(OUTPUT_DATA_DIR)) {
  fs.mkdirSync(OUTPUT_DATA_DIR, { recursive: true });
}

// 章節對照定義（中英雙語）
const CHAPTER_DEF = [
  // 第 0 部
  { part: '第 0 部　開始之前', partEn: 'Part 0: Before You Start', partId: 'part-0', chId: 'ch00', num: 0, title: '半導體製造全景', titleEn: 'The Big Picture', file: '0-before-you-start/00-overview/README.md', category: 'overview' },
  { part: '第 0 部　開始之前', partEn: 'Part 0: Before You Start', partId: 'part-0', chId: 'ch01', num: 1, title: '晶圓廠如何運作', titleEn: 'How a Fab Works', file: '0-before-you-start/01-how-a-fab-works/README.md', category: 'overview' },
  // 第 1 部
  { part: '第 1 部　基礎', partEn: 'Part 1: Fundamentals', partId: 'part-1', chId: 'ch02', num: 2, title: '從物理到電晶體', titleEn: 'From Physics to Transistors', file: '1-fundamentals/02-transistor-basics/README.md', category: 'fundamentals' },
  { part: '第 1 部　基礎', partEn: 'Part 1: Fundamentals', partId: 'part-1', chId: 'ch03', num: 3, title: '從沙子到晶圓', titleEn: 'From Sand to Wafer', file: '1-fundamentals/03-sand-to-wafer/README.md', category: 'fundamentals' },
  // 第 2 部
  { part: '第 2 部　製程模組', partEn: 'Part 2: Process Modules', partId: 'part-2', chId: 'ch04', num: 4, title: '微影', titleEn: 'Lithography', file: '2-process-modules/04-lithography/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partEn: 'Part 2: Process Modules', partId: 'part-2', chId: 'ch05', num: 5, title: '薄膜', titleEn: 'Thin Films', file: '2-process-modules/05-thin-films/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partEn: 'Part 2: Process Modules', partId: 'part-2', chId: 'ch06', num: 6, title: '蝕刻', titleEn: 'Etching', file: '2-process-modules/06-etching/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partEn: 'Part 2: Process Modules', partId: 'part-2', chId: 'ch07', num: 7, title: '離子佈植與熱處理', titleEn: 'Ion Implantation & Anneal', file: '2-process-modules/07-ion-implantation/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partEn: 'Part 2: Process Modules', partId: 'part-2', chId: 'ch08', num: 8, title: 'CMP', titleEn: 'CMP', file: '2-process-modules/08-cmp/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partEn: 'Part 2: Process Modules', partId: 'part-2', chId: 'ch09', num: 9, title: '清洗與污染控制', titleEn: 'Cleaning & Contamination Control', file: '2-process-modules/09-cleaning/README.md', category: 'modules' },
  { part: '第 2 部　製程模組', partEn: 'Part 2: Process Modules', partId: 'part-2', chId: 'ch10', num: 10, title: '金屬化', titleEn: 'Metallization', file: '2-process-modules/10-metallization/README.md', category: 'modules' },
  // 第 3 部
  { part: '第 3 部　製程整合', partEn: 'Part 3: Process Integration', partId: 'part-3', chId: 'ch11', num: 11, title: '走一遍完整的 CMOS 流程', titleEn: 'CMOS Process Flow', file: '3-integration/11-cmos-process-flow/README.md', category: 'integration' },
  { part: '第 3 部　製程整合', partEn: 'Part 3: Process Integration', partId: 'part-3', chId: 'ch12', num: 12, title: '先進電晶體結構', titleEn: 'Advanced Transistors', file: '3-integration/12-advanced-transistors/README.md', category: 'integration' },
  { part: '第 3 部　製程整合', partEn: 'Part 3: Process Integration', partId: 'part-3', chId: 'ch13', num: 13, title: '記憶體製程', titleEn: 'Memory Processes', file: '3-integration/13-memory/README.md', category: 'integration' },
  { part: '第 3 部　製程整合', partEn: 'Part 3: Process Integration', partId: 'part-3', chId: 'ch14', num: 14, title: '「幾奈米」是什麼意思', titleEn: 'Process Nodes', file: '3-integration/14-process-nodes/README.md', category: 'integration' },
  // 第 4 部
  { part: '第 4 部　品質與良率', partEn: 'Part 4: Quality & Yield', partId: 'part-4', chId: 'ch15', num: 15, title: '量測與檢測', titleEn: 'Metrology & Inspection', file: '4-yield-and-quality/15-metrology/README.md', category: 'quality' },
  { part: '第 4 部　品質與良率', partEn: 'Part 4: Quality & Yield', partId: 'part-4', chId: 'ch16', num: 16, title: '良率與故障分析', titleEn: 'Yield & Failure Analysis', file: '4-yield-and-quality/16-yield-analysis/README.md', category: 'quality' },
  { part: '第 4 部　品質與良率', partEn: 'Part 4: Quality & Yield', partId: 'part-4', chId: 'ch17', num: 17, title: '製程控制', titleEn: 'Process Control', file: '4-yield-and-quality/17-process-control/README.md', category: 'quality' },
  { part: '第 4 部　品質與良率', partEn: 'Part 4: Quality & Yield', partId: 'part-4', chId: 'ch18', num: 18, title: '異常處理與工程變更', titleEn: 'Abnormality Handling & Changes', file: '4-yield-and-quality/18-abnormality-handling/README.md', category: 'quality' },
  // 第 5 部
  { part: '第 5 部　後段：測試與封裝', partEn: 'Part 5: Backend & Packaging', partId: 'part-5', chId: 'ch19', num: 19, title: '晶圓測試', titleEn: 'Wafer Test', file: '5-backend/19-wafer-test/README.md', category: 'backend' },
  { part: '第 5 部　後段：測試與封裝', partEn: 'Part 5: Backend & Packaging', partId: 'part-5', chId: 'ch20', num: 20, title: '封裝', titleEn: 'Packaging', file: '5-backend/20-packaging/README.md', category: 'backend' },
  { part: '第 5 部　後段：測試與封裝', partEn: 'Part 5: Backend & Packaging', partId: 'part-5', chId: 'ch21', num: 21, title: '先進封裝', titleEn: 'Advanced Packaging', file: '5-backend/21-advanced-packaging/README.md', category: 'backend' },
  { part: '第 5 部　後段：測試與封裝', partEn: 'Part 5: Backend & Packaging', partId: 'part-5', chId: 'ch22', num: 22, title: '最終測試與可靠度', titleEn: 'Final Test & Reliability', file: '5-backend/22-final-test-and-reliability/README.md', category: 'backend' },
  // 第 6 部
  { part: '第 6 部　走出晶圓廠', partEn: 'Part 6: Beyond the Fab', partId: 'part-6', chId: 'ch23', num: 23, title: '工廠如何被系統管理', titleEn: 'Fab Systems', file: '6-beyond-the-fab/23-fab-systems/README.md', category: 'systems' },
  { part: '第 6 部　走出晶圓廠', partEn: 'Part 6: Beyond the Fab', partId: 'part-6', chId: 'ch24', num: 24, title: '製程如何影響韌體', titleEn: 'Process & Firmware', file: '6-beyond-the-fab/24-process-and-firmware/README.md', category: 'systems' },
  // 附錄
  { part: '附錄', partEn: 'Appendices', partId: 'part-app', chId: 'app-glossary', num: 25, title: '附錄 A　術語總表', titleEn: 'Appendix A: Glossary', file: 'appendix/glossary.md', category: 'appendix' },
  { part: '附錄', partEn: 'Appendices', partId: 'part-app', chId: 'app-jargon', num: 26, title: '附錄 B　現場行話', titleEn: 'Appendix B: Fab Jargon', file: 'appendix/fab-jargon.md', category: 'appendix' },
  { part: '附錄', partEn: 'Appendices', partId: 'part-app', chId: 'app-reading', num: 27, title: '附錄 C　延伸閱讀', titleEn: 'Appendix C: Further Reading', file: 'appendix/further-reading.md', category: 'appendix' }
];

/**
 * 簡易而強固的 Markdown 轉 HTML 解析器（支援繁體中文與英文）
 */
function markdownToHtml(md, lang = 'zh') {
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
    
    // 檢查是否為 GitHub callout: > [!TIP], > [!NOTE], > 📍 **晶圓位置** / Where the wafer is
    if (bqContent.includes('[!TIP]') || bqContent.includes('Know-how')) {
      let cleaned = bqContent.replace(/\[!TIP\]\s*/g, '').trim();
      let badge = lang === 'en' ? '🔧 FAB KNOW-HOW' : '🔧 FAB KNOW-HOW 現場實務';
      html.push(`<div class="callout callout-knowhow"><div class="callout-badge">${badge}</div><div class="callout-body">${markdownToHtml(cleaned, lang)}</div></div>`);
    } else if (bqContent.includes('[!NOTE]') || bqContent.includes('名詞') || bqContent.includes('Term')) {
      let cleaned = bqContent.replace(/\[!NOTE\]\s*/g, '').trim();
      let badge = lang === 'en' ? '📖 GLOSSARY & KEY TERMS' : '📖 GLOSSARY 核心名詞';
      html.push(`<div class="callout callout-glossary"><div class="callout-badge">${badge}</div><div class="callout-body">${markdownToHtml(cleaned, lang)}</div></div>`);
    } else if (bqContent.includes('晶圓位置') || bqContent.includes('Where the wafer is')) {
      let badge = lang === 'en' ? '📍 WAFER TRACK' : '📍 WAFER TRACK 晶圓站點';
      html.push(`<div class="callout callout-wafer-pos"><div class="callout-badge">${badge}</div><div class="callout-body">${markdownToHtml(bqContent, lang)}</div></div>`);
    } else {
      html.push(`<blockquote class="semi-blockquote">${markdownToHtml(bqContent, lang)}</blockquote>`);
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

    // 分隔線（Markdown 規格：三個以上連字號即為分隔線；舊式 /^---{3,}$/ 需 5 個以上，造成 655 處字面「---」）
    if (/^-{3,}$/.test(line.trim())) {
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
      let fileName = path.basename(src);
      return `<figure class="semi-figure"><img src="assets/${fileName}" alt="${alt}" class="semi-img" loading="lazy" /><figcaption>${alt}</figcaption></figure>`;
    })
    .replace(/\[(.*?)\]\((.*?)\)/g, (match, text, href) => {
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

function extractWaferTrack(content) {
  const trackMatch = content.match(/> 📍 \*\*(?:晶圓位置|Where the wafer is)\*\*([\s\S]*?)---/);
  if (trackMatch) {
    return trackMatch[1].trim().replace(/^>\s*/gm, '');
  }
  return '';
}

function extractHeadings(content) {
  const headings = [];
  const h2Matches = content.matchAll(/^##\s+(.+)$/gm);
  for (const h of h2Matches) {
    const hText = h[1].trim();
    headings.push({
      text: hText,
      id: createSlug(hText)
    });
  }
  return headings;
}

/**
 * 主建置流程
 */
function build() {
  console.log('開始解析中英雙語 25 章內容與附錄...');
  const chapters = [];
  const searchIndex = [];

  for (const def of CHAPTER_DEF) {
    const fullPathZh = path.join(REF_DIR_ZH, def.file);
    const fullPathEn = path.join(REF_DIR_EN, def.file);

    if (!fs.existsSync(fullPathZh)) {
      console.warn(`[ZH] 檔案不存在: ${fullPathZh}`);
      continue;
    }
    if (!fs.existsSync(fullPathEn)) {
      console.warn(`[EN] 檔案不存在: ${fullPathEn}`);
      continue;
    }

    const rawZh = fs.readFileSync(fullPathZh, 'utf8');
    const rawEn = fs.readFileSync(fullPathEn, 'utf8');

    // 標題提取
    const titleMatchZh = rawZh.match(/^#\s+(.+)$/m);
    const fullTitleZh = titleMatchZh ? titleMatchZh[1].trim() : def.title;

    const titleMatchEn = rawEn.match(/^#\s+(.+)$/m);
    const fullTitleEn = titleMatchEn ? titleMatchEn[1].trim() : def.titleEn;

    // 晶圓位置提取
    const waferTrackZh = extractWaferTrack(rawZh);
    const waferTrackEn = extractWaferTrack(rawEn);

    // H2 目錄提取
    const headingsZh = extractHeadings(rawZh);
    const headingsEn = extractHeadings(rawEn);

    // 內文轉 HTML
    const htmlZh = markdownToHtml(rawZh, 'zh');
    const htmlEn = markdownToHtml(rawEn, 'en');

    // 全文搜尋純文字提取
    const plainZh = rawZh.replace(/<[^>]+>/g, ' ').replace(/[#*`|>-]/g, ' ').replace(/\s+/g, ' ').trim();
    const plainEn = rawEn.replace(/<[^>]+>/g, ' ').replace(/[#*`|>-]/g, ' ').replace(/\s+/g, ' ').trim();

    searchIndex.push({
      chId: def.chId,
      num: def.num,
      title: fullTitleZh,
      titleEn: fullTitleEn,
      part: def.part,
      partEn: def.partEn,
      snippet: plainZh.substring(0, 260),
      snippetEn: plainEn.substring(0, 260),
      keywords: `${plainZh} ${plainEn}`
    });

    chapters.push({
      id: def.chId,
      part: def.part,
      partEn: def.partEn,
      partId: def.partId,
      num: def.num,
      shortTitle: def.title,
      shortTitleEn: def.titleEn,
      fullTitle: fullTitleZh,
      fullTitleEn: fullTitleEn,
      category: def.category,
      waferTrack: waferTrackZh,
      waferTrackEn: waferTrackEn,
      headings: headingsZh,
      headingsEn: headingsEn,
      contentHtml: htmlZh,
      contentHtmlEn: htmlEn
    });
  }

  // 解析附錄 A: 術語總表 (中英整合對照)
  const glossaryList = [];
  const glossaryPathZh = path.join(REF_DIR_ZH, 'appendix/glossary.md');
  const glossaryPathEn = path.join(REF_DIR_EN, 'appendix/glossary.md');

  if (fs.existsSync(glossaryPathZh) && fs.existsSync(glossaryPathEn)) {
    const zhLines = fs.readFileSync(glossaryPathZh, 'utf8')
      .split('\n')
      .filter(l => l.trim().startsWith('|') && !l.includes('英文 | 縮寫') && !l.includes('|---|'));
    const enLines = fs.readFileSync(glossaryPathEn, 'utf8')
      .split('\n')
      .filter(l => l.trim().startsWith('|') && !l.includes('Term | Abbreviation') && !l.includes('|---|'));

    for (let i = 0; i < zhLines.length; i++) {
      const zParts = zhLines[i].split('|').slice(1, -1).map(s => s.trim());
      const eParts = i < enLines.length ? enLines[i].split('|').slice(1, -1).map(s => s.trim()) : [];

      if (zParts.length >= 5) {
        const enTerm = zParts[0];
        const abbr = zParts[1] === '—' ? '' : zParts[1];
        const zhTerm = zParts[2];
        const descZh = zParts[3];
        const descEn = eParts.length >= 4 ? eParts[3] : descZh;
        const chapter = zParts[4];

        glossaryList.push({
          en: enTerm,
          abbr: abbr,
          zh: zhTerm,
          desc: descZh,
          descZh: descZh,
          descEn: descEn,
          chapter: chapter
        });
      }
    }
  }

  // 解析附錄 B: 現場行話 (中英整合對照)
  const jargonList = [];
  const jargonPathZh = path.join(REF_DIR_ZH, 'appendix/fab-jargon.md');
  const jargonPathEn = path.join(REF_DIR_EN, 'appendix/fab-jargon.md');

  if (fs.existsSync(jargonPathZh) && fs.existsSync(jargonPathEn)) {
    const rawZhJargon = fs.readFileSync(jargonPathZh, 'utf8');
    const rawEnJargon = fs.readFileSync(jargonPathEn, 'utf8');

    const zhLines = rawZhJargon.split('\n');
    const enLines = rawEnJargon.split('\n');

    const zhEntries = [];
    let curCatZh = '晶圓與批次';
    for (const line of zhLines) {
      if (line.startsWith('## ')) {
        curCatZh = line.replace('## ', '').trim();
      } else if (line.trim().startsWith('|') && !line.includes('行話 | 意思') && !line.includes('|---|')) {
        const p = line.split('|').slice(1, -1).map(s => s.trim());
        if (p.length >= 3) {
          zhEntries.push({ term: p[0], meaning: p[1], example: p[2], category: curCatZh });
        }
      }
    }

    const enEntries = [];
    let curCatEn = 'Wafers and lots';
    for (const line of enLines) {
      if (line.startsWith('## ')) {
        curCatEn = line.replace('## ', '').trim();
      } else if (line.trim().startsWith('|') && !line.includes('Expression | In Taiwanese fabs') && !line.includes('|---|')) {
        const p = line.split('|').slice(1, -1).map(s => s.trim());
        if (p.length >= 4) {
          enEntries.push({ term: p[0], taiwanese: p[1], meaning: p[2], example: p[3], category: curCatEn });
        }
      }
    }

    const count = Math.min(zhEntries.length, enEntries.length);
    for (let i = 0; i < count; i++) {
      const z = zhEntries[i];
      const e = enEntries[i];
      jargonList.push({
        term: z.term,
        termZh: z.term,
        termEn: e.term,
        taiwanese: e.taiwanese,
        meaning: z.meaning,
        meaningZh: z.meaning,
        meaningEn: e.meaning,
        example: z.example,
        exampleZh: z.example,
        exampleEn: e.example,
        category: z.category,
        categoryZh: z.category,
        categoryEn: e.category
      });
    }
  }

  // 寫入純前端資料模組
  const chaptersCode = `/**
 * chapters-data.js
 * 半導體製造知識庫 25 章與附錄完整結構化內容（中英雙語原生）
 */
export const CHAPTERS_DATA = ${JSON.stringify(chapters, null, 2)};
`;

  const searchCode = `/**
 * search-index.js
 * 純前端雙語全文檢索索引
 */
export const SEARCH_INDEX = ${JSON.stringify(searchIndex, null, 2)};
`;

  const glossaryCode = `/**
 * glossary-data.js
 * 附錄 A 術語總表 (${glossaryList.length} 條目) 與 附錄 B 現場行話 (${jargonList.length} 條目)（中英對照雙語版）
 */
export const GLOSSARY_DATA = ${JSON.stringify(glossaryList, null, 2)};
export const JARGON_DATA = ${JSON.stringify(jargonList, null, 2)};
`;

  fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'chapters-data.js'), chaptersCode, 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'search-index.js'), searchCode, 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'glossary-data.js'), glossaryCode, 'utf8');

  console.log(`雙語建置完成！已輸出:
  - ${chapters.length} 個雙語章節至 chapters-data.js
  - ${searchIndex.length} 筆雙語檢索索引至 search-index.js
  - ${glossaryList.length} 筆雙語術語及 ${jargonList.length} 筆雙語現場行話至 glossary-data.js`);
}

build();
