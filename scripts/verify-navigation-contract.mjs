import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { SCENARIOS } from '../data/scenario-paths.js';
import { loadAllChapters } from '../data/chapters-data.js';
import { loadSearchIndex } from '../data/search-index.js';
const CHAPTERS_DATA = await loadAllChapters();
import { normalizeChapterHref } from '../chapter-links.js';

// 僅驗證本次新增導覽及舊連結相容契約，不啟動網站或外部服務。
assert.deepEqual(SCENARIOS.map(s => s.id), ['journey', 'pattern', 'quality', 'packaging', 'dispatch'], '五個情境入口必須保留');
const chapterIds = new Set(CHAPTERS_DATA.map(ch => ch.id));
for (const scenario of SCENARIOS) {
  assert.ok(scenario.boundary?.trim(), `${scenario.id} 必須說明教學邊界`);
  const ids = new Set(scenario.nodes.map(n => n.id));
  assert.equal(ids.size, scenario.nodes.length, `${scenario.id} 節點識別不可重複`);
  for (const node of scenario.nodes) {
    assert.ok(chapterIds.has(node.chapter), `${scenario.id}/${node.id} 的教材來源必須存在`);
    assert.ok(Array.isArray(node.next), `${scenario.id}/${node.id} 的分支必須是陣列`);
    for (const edge of node.next) {
      assert.ok(ids.has(edge.to), `${scenario.id}/${node.id} 的分支目的地必須存在`);
      assert.ok(edge.label?.trim(), `${scenario.id}/${node.id} 的分支必須有可讀說明`);
    }
  }
}

const quality = SCENARIOS.find(s => s.id === 'quality');
const qualityNodes = new Map(quality.nodes.map(n => [n.id, n]));
function canReach(from, to) {
  const pending = [from];
  const visited = new Set();
  while (pending.length) {
    const id = pending.pop();
    if (id === to) return true;
    if (visited.has(id)) continue;
    visited.add(id);
    pending.push(...qualityNodes.get(id).next.map(edge => edge.to));
  }
  return false;
}
assert.equal(quality.kind, 'branch', '品質情境必須提供判斷分支');
assert.deepEqual(qualityNodes.get('decision').next.map(edge => edge.to).sort(), ['hold', 'monitor'], '正常與異常兩條路徑皆須保留');
for (const id of qualityNodes.keys()) assert.ok(canReach('signal', id), `品質節點 ${id} 必須能由入口到達`);
for (const [from, to] of [['monitor', 'signal'], ['hold', 'release'], ['release', 'cause'], ['cause', 'release'], ['release', 'monitor']]) {
  assert.ok(canReach(from, to), `品質流程 ${from} 至 ${to} 必須可達`);
}
assert.deepEqual(qualityNodes.get('release').next.map(edge => edge.to).sort(), ['cause', 'monitor'], '放行評估須保留返回調查與核准後監控兩個選擇');

const packaging = SCENARIOS.find(s => s.id === 'packaging');
assert.equal(packaging.kind, 'compare', '封裝必須呈現結構比較');
assert.deepEqual(packaging.nodes.map(n => n.id), ['single', 'interposer', 'stack'], '三種封裝比較選項必須保留');
assert.ok(packaging.nodes.every(n => n.next.length === 0), '封裝比較不能建立先後流程');
assert.match(packaging.boundary, /並列選項.*並非先後步驟/, '比較應清楚揭露非時序性');

// 正常化換行後核對已讀取的基準來源，防止導覽改版刪減教材。
// 基準：中英雙語原生擴充版（包含 28 章中英完整教材與雙語字典）。
// 2.6.1：chapters-data.js 基準由 5a1d3e92… 更新。原基準內含 `$&` 替換毀損（ch08 中英、ch11 中英、ch20 英、ch21 英：
// 錨點複本與「現場異常徵兆」整段被插進表格儲存格）。還原只把錨點複本改回 `$&lt;`／`$&gt;` 並把該段移回「本章重點」前，
// 以正向模擬逐字元重現原檔證明無其他增刪；正文結構另由 verify-hub.js 檢查。
// 2.36.0：Sam 於 2026-11-08 對 F–K 正文校勘提案回覆「照建議核可」。fab-flow.js 佈植站把 LSA 歸到毫秒級、奈秒另稱「奈秒雷射退火」
// （summary／summaryZh／summaryEn 與 keyTool／keyToolZh／keyToolEn 共 6 處，G3-3d），基準由 5cbccd27… 更新；glossary-data.js 的 RTA 條目
// 同樣改寫（desc 三欄，G3-3c），Lot 條目改為「對濕氣敏感的站點會再充氮」「代工計價多以片為單位」（meaning 三欄，K9），基準由 0ee4bd99… 更新。
// 2.36.1：Sam 於 2026-11-08 對範圍外後續校勘提案（docs/…/text-corrections-followups-2026-11-08.md）回覆「照建議核可」：glossary-data.js 的
// Dishing 條目英文 `exactly 1–3 nm` 改 `within 1–3 nm`（descEn 一欄，C6），基準由 de80ce4e… 更新。
const sourceHashes = {
  'fab-flow.js': '738e3c5b24bf2f122c16667f603a3a5e082b15405e81edee09887cb07b19c73c',
  'glossary-data.js': '8f5966d843fed917d3ed03d42079ad20c09870081af9344b23b9a6a6e4779485'
};
for (const [file, expected] of Object.entries(sourceHashes)) {
  const source = readFileSync(new URL(`../data/${file}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  assert.equal(createHash('sha256').update(source).digest('hex'), expected, `${file} 必須保留基準來源內容`);
}
const chapterDigest = createHash('sha256').update(CHAPTERS_DATA.map(c => JSON.stringify([c.id, c.contentHtml, c.contentHtmlEn])).join('\n')).digest('hex');
// 2.12.0：已核可 B7–B10、授權剩餘章節來源校勘及 Claude 局部審查修正基準；保留正文逐字差異證據，非回復拆檔前錯誤。
// 2.13.1：Sam 於 2026-11-02 核可 7 處中文正文錯字修正（ch07、ch08、ch10、ch18、ch21、ch22、app-jargon 各一處），基準由 4f4008f8… 更新；英文正文未動。
// 2.13.2：Sam 於 2026-11-02 核可還原數學式 TeX 反斜線（ch00、ch01、ch04、ch09、ch14、ch20、ch22 共 35 處，只補反斜線、Tab／Backspace 改回指令），基準由 814a3c5f… 更新。
// 2.15.1：Sam 於 2026-11-03 核可正文校勘 13 項：[!NOTE] 殘留中英各 6 處（名詞卡拆回獨立名詞卡框）、ch12 與 ch20 空標題移回內容、5 處錯字（ch05、ch07、ch08、ch20 兩處、ch22），基準由 2c5879f8… 更新。
// 2.23.0：Sam 於 2026-11-04 核可正文數值校勘 3 處：ch14 CPP 與最小金屬節距兩列、ch19 懸臂式探針卡節距，中英同步；CPP 列另補一句「3nm 之後 CPP 幾乎不再縮小」，基準由 52fcef2e… 更新。
// 2.23.1：Sam 於 2026-11-04 核可 ch14「定量物理定律與 3D 製程視窗」例題的 M1P 由 21 nm 改為 23 nm，單元高度隨之由 126 nm 改為 138 nm（中英同步），基準由 fe25d3aa… 更新。
// 2.34.2：Sam 於 2026-11-07 核可 ch16 正文晶圓圖 `<img>` 補上 SVG 實際寬高 `width="724" height="488"`（中英各一處，只加屬性，文字未動；移除這兩個屬性後雜湊等於 223b4cc9…），讓圖片下載前先預留版面，基準由 223b4cc9… 更新。
// 2.36.0：Sam 於 2026-11-08 對 F–K 正文校勘提案（docs/…/text-corrections-F-K-2026-11-07.md）回覆「照建議核可」：各項照「建議」欄改，
// 23 個章節檔中英同步（ch00–ch04、ch06–ch10、ch13–ch19、ch21–ch24、附錄 A、B）；建議不改的 7 項與另案 K12 未動。英文 H3-2a 第二處依原意寫成
// 「recessed within」（照字面會是不合文法的「recessed by within」）；英文 I11-1 的 `~` 放進 `<code>~6T</code>`（可見文字相同，
// 與同表 `<code>~90–100 MTr/mm² (7nm)</code>` 寫法一致，圖的標籤才比對得到）。基準由 500baef5… 更新。
// 2.36.1：Sam 於 2026-11-08 對範圍外後續校勘提案（docs/…/text-corrections-followups-2026-11-08.md）回覆「照建議核可」：ch03 英文背磨列子句順序（C3）、
// ch07 英文現場異常列名第二個 & 改 and（C4）、ch24 中文「是否提供與實際效果」兩處（C5）、附錄 A 英文 Dishing 的 exactly 改 within（C6），基準由 b5e82ef0… 更新。
assert.equal(chapterDigest, 'e012934c4dfb5d391e907bdb6fa3624293d9022f6bbe9ebe6208cdfc25a1d7e1', '章節正文必須與 2.36.1 核可基準一致');
const SEARCH_INDEX = await loadSearchIndex();
const searchDigest = createHash('sha256').update(SEARCH_INDEX.map(e => JSON.stringify([e.chId, e.keywords, e.title, e.titleEn])).join('\n')).digest('hex');
// 2.36.1：同一提案 C7。檢索全文自拆檔（0896238）後未隨正文校勘同步，搜尋會找到並顯示改前的句子。依已核可的 2.36.0 替換，
// 把仍整段留在 keywords／snippet 的 23 處舊句與本次 C5a 換成新句（去標記後的同樣形式）；另刪除 Markdown 名詞卡語法「[!NOTE]」89 處
// （正文已無，其中中英各 6 處是 2.15.1 從正文拿掉的）、ch20 一個簡體字改回「無」。其餘內容與拆檔時相同，基準由 4d3f6b41… 更新。
// 2.36.2：Sam 於 2026-11-08 對 2.36.1 列出的兩項觀察回覆「處理」：刪除 keywords 裡的 Markdown 名詞卡語法「[!TIP]」84 處
// （21 章各 4 處，正文沒有），其餘內容不變，基準由 db1ba079… 更新。
assert.equal(searchDigest, 'd97be7b7971614041f4bb73698c0f14bebedba46c3cd59389e16af7d7fa0e000', '檢索全文必須與 2.36.2 核可基準一致');

const linkCases = [
  ['#node-00', '#ch00'],
  ['#node-24', '#ch24'],
  ['../../2-process-modules/04-lithography/README.md', '#ch04'],
  ['../19-wafer-test/README.md#wat', '#ch19'],
  ['../../3-integration/11-cmos-process-flow/', '#ch11'],
  ['../../2-process-modules/README.md', '#ch04'],
  ['../../6-beyond-the-fab/README.md', '#ch23'],
  ['../README.md', '#explore'],
  ['../../README.md', '#explore'],
  ['glossary.md', '#app-glossary'],
  ['../appendix/fab-jargon.md', '#app-jargon'],
  ['../appendix/README.md', '#app-glossary'],
  ['further-reading.md#網站', '#app-reading'],
  ['../../TRANSLATIONS.md', 'https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction/blob/master/TRANSLATIONS.md'],
  ['https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction/blob/main/TRANSLATIONS.md', 'https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction/blob/master/TRANSLATIONS.md'],
  ['#ch18', '#ch18'],
  ['#常見異常', '#常見異常'],
  ['https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction', 'https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction'],
  ['https://example.org/04-lithography/README.md#段落', 'https://example.org/04-lithography/README.md#段落'],
  ['mailto:reader@example.org', 'mailto:reader@example.org']
];
for (const [input, expected] of linkCases) {
  assert.equal(normalizeChapterHref(input), expected, `章節連結契約不符：${input}`);
}
console.log('導覽契約通過：五情境、教材引用、分支回路、封裝比較、來源保全與舊連結相容。');
