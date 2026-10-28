import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { SECTION_DIAGRAMS } from '../data/section-diagrams.js';
import { headingPattern, insertSectionDiagrams, renderSectionDiagram } from '../section-diagrams.js';

const chapters = {};
for (const file of readdirSync(new URL('../data/chapters/', import.meta.url)).filter(f => f.endsWith('.js'))) {
  const { chapter } = await import(new URL(`../data/chapters/${file}`, import.meta.url));
  chapters[chapter.id] = chapter;
}

const LIMITS = { zh: { label: 12, note: 16, leaf: 16, item: 18, key: 6, layer: 14, layerNote: 18, caption: 30 }, en: { label: 34, note: 44, leaf: 46, item: 48, key: 16, layer: 30, layerNote: 40, caption: 80 } };
const COUNTS = { flow: ['steps', 3, 8], cycle: ['steps', 3, 6], stack: ['layers', 3, 7], compare: ['columns', 2, 3], branch: ['branches', 2, 5] };
// 常見簡體字：出現即視為誤用（本站中文一律臺灣繁體）
const SIMPLIFIED = /[这为们发会来时说对过进还从动点现质应产线业设计实关结图层压电热测体级]/; // zh-tw-guard:allow
// h2 文字解碼後再比對；規格中的標題存一般文字
const decode = text => text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const headings = html => [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map(m => decode(m[1].replace(/<[^>]+>/g, '').replace(/#$/, '').trim()));
// 規格中該語言的所有文字欄位（zh／en 與 *Zh／*En），標題錨點與圖型除外
const ANCHOR_KEYS = new Set(['chapterId', 'headingZh', 'headingEn', 'type']);
const specTexts = (node, lang, out = []) => {
  for (const [key, value] of Object.entries(node)) {
    if (ANCHOR_KEYS.has(key)) continue;
    if (value && typeof value === 'object') specTexts(value, lang, out);
    else if (typeof value === 'string' && (lang === 'zh' ? key === 'zh' || key.endsWith('Zh') : key === 'en' || key.endsWith('En'))) out.push(value);
  }
  return out;
};
// 圖中實際顯示的文字：去標籤、解碼、去空白（換行後各行相接）
const shownText = html => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, '');
const sectionText = (html, heading) => {
  const part = html.split(/(?=<h2\b)/).find(p => headings(p)[0]?.includes(heading)) || '';
  return part.replace(/<[^>]+>/g, ' ');
};

const seen = new Set();
for (const spec of SECTION_DIAGRAMS) {
  const id = `${spec.chapterId}「${spec.headingZh}」`;
  const chapter = chapters[spec.chapterId];
  assert.ok(chapter, `${id} 找不到章節`);
  assert.ok(!seen.has(`${spec.chapterId}#${spec.headingZh}`), `${id} 同一段只能有一張圖`);
  seen.add(`${spec.chapterId}#${spec.headingZh}`);

  // 標題錨點：中英文各對應唯一一個 h2
  for (const [html, heading, lang] of [[chapter.contentHtml, spec.headingZh, '中文'], [chapter.contentHtmlEn, spec.headingEn, '英文']]) {
    assert.equal(headings(html).filter(h => h.includes(heading)).length, 1, `${id} 的${lang}標題須對應唯一一個 h2`);
  }

  const [field, min, max] = COUNTS[spec.type] || [];
  assert.ok(field, `${id} 圖型 ${spec.type} 不存在`);
  assert.ok(spec[field].length >= min && spec[field].length <= max, `${id} ${field} 數量須介於 ${min}–${max}`);

  // 圖內文字：不帶數字、不超長、不用簡體字
  const zhNodes = [], enNodes = [];
  const add = (zh, en, kind) => { if (zh !== undefined) zhNodes.push([zh, kind]); if (en !== undefined) enNodes.push([en, kind]); };
  for (const n of spec.steps || []) { add(n.zh, n.en, 'label'); add(n.noteZh, n.noteEn, 'note'); }
  for (const n of spec.layers || []) { add(n.zh, n.en, 'layer'); add(n.noteZh, n.noteEn, 'layerNote'); }
  for (const c of spec.columns || []) { add(c.titleZh, c.titleEn, 'label'); for (const n of c.items) { add(n.keyZh, n.keyEn, 'key'); add(n.zh, n.en, 'item'); add(n.noteZh, n.noteEn, 'note'); } }
  if (spec.root) { add(spec.root.zh, spec.root.en, 'label'); add(spec.root.noteZh, spec.root.noteEn, 'note'); }
  for (const b of spec.branches || []) { add(b.zh, b.en, 'label'); add(b.leafZh, b.leafEn, 'leaf'); }
  add(spec.centerZh, spec.centerEn, 'note');
  add(spec.topZh, spec.topEn, 'note');
  for (const [text, kind] of zhNodes) {
    assert.ok(text && text.trim(), `${id} 有空白中文標籤`);
    assert.doesNotMatch(text, /\d/, `${id} 圖內文字不得帶數字：${text}`);
    assert.doesNotMatch(text, SIMPLIFIED, `${id} 圖內文字含簡體字：${text}`);
    assert.ok([...text].length <= LIMITS.zh[kind], `${id} 中文${kind}過長：${text}`);
  }
  for (const [text, kind] of enNodes) {
    assert.ok(text && text.trim(), `${id} 有空白英文標籤`);
    assert.doesNotMatch(text, /\d/, `${id} 圖內文字不得帶數字：${text}`);
    assert.ok(text.length <= LIMITS.en[kind], `${id} 英文${kind}過長：${text}`);
  }
  assert.equal(zhNodes.length, enNodes.length, `${id} 中英文標籤數須一致`);

  // 圖說：數字須出現在該段正文
  for (const [caption, html, heading, lang] of [[spec.captionZh, chapter.contentHtml, spec.headingZh, 'zh'], [spec.captionEn, chapter.contentHtmlEn, spec.headingEn, 'en']]) {
    assert.ok([...caption].length <= LIMITS[lang].caption, `${id} 圖說過長：${caption}`);
    if (lang === 'zh') assert.doesNotMatch(caption, SIMPLIFIED, `${id} 圖說含簡體字：${caption}`);
    const text = sectionText(html, heading);
    for (const token of caption.match(/\d[\d.,]*/g) || []) assert.ok(text.includes(token), `${id} 圖說數字「${token}」不在該段正文`);
  }

  for (const lang of ['zh', 'en']) {
    const figure = renderSectionDiagram(spec, lang);
    assert.ok(figure.includes(lang === 'zh' ? '示意 · 未按比例' : 'Schematic · not to scale'), `${id} 須標示示意、未按比例`);
    // 規格裡的每段文字都要畫進圖中：渲染器漏讀欄位或截字即失敗（2.10.0 曾漏畫 compare 與 cycle 的註記）
    // 圖內文字只在 SVG 內找、圖說只在 figcaption 內找，避免短標籤被圖說裡的同字誤判為已顯示
    const [svgPart, captionPart] = figure.split('</svg>');
    const caption = lang === 'zh' ? spec.captionZh : spec.captionEn;
    assert.ok(shownText(captionPart).includes(caption.replace(/\s+/g, '')), `${id} ${lang} 圖說沒有出現在 figcaption`);
    const shown = shownText(svgPart);
    for (const text of specTexts(spec, lang).filter(t => t !== caption)) assert.ok(shown.includes(text.replace(/\s+/g, '')), `${id} ${lang} 規格文字沒有出現在圖中：${text}`);
  }
}

// 插入：每張圖都緊接在對應 h2 之後，正文其餘內容不變
for (const [chapterId, chapter] of Object.entries(chapters)) {
  const specs = SECTION_DIAGRAMS.filter(s => s.chapterId === chapterId);
  for (const [html, lang] of [[chapter.contentHtml, 'zh'], [chapter.contentHtmlEn, 'en']]) {
    const out = insertSectionDiagrams(html, chapterId, lang);
    assert.equal((out.match(/class="chapter-figure"/g) || []).length - (html.match(/class="chapter-figure"/g) || []).length, specs.length, `${chapterId} ${lang} 插入圖數須等於規格數`);
    assert.equal(out.replace(/<figure class="chapter-figure">[\s\S]*?<\/figure>/g, ''), html.replace(/<figure class="chapter-figure">[\s\S]*?<\/figure>/g, ''), `${chapterId} ${lang} 加圖後正文須一字不變`);
    for (const spec of specs) {
      const heading = headingPattern(lang === 'en' ? spec.headingEn : spec.headingZh);
      const at = out.search(new RegExp(`<h2\\b[^>]*>(?:(?!</h2>)[\\s\\S])*?${heading}(?:(?!</h2>)[\\s\\S])*?</h2><figure class="chapter-figure">`));
      assert.ok(at >= 0, `${chapterId} ${lang}「${heading}」的圖須緊接在標題之後`);
    }
  }
}

// 美元符號：插入內容含 `$&`、`$1` 時不得被當成替換樣式
const probe = insertSectionDiagrams('<h2 id="x">T</h2><p>a</p>', 'probe', 'zh', [{ chapterId: 'probe', headingZh: 'T', headingEn: 'T', type: 'flow', captionZh: 'US$1 與 $& 測試', captionEn: 'x', steps: [{ zh: '甲', en: 'a' }, { zh: '乙', en: 'b' }, { zh: '丙', en: 'c' }] }]);
assert.ok(probe.includes('US$1 與 $&amp; 測試') && !probe.includes('US<h2'), '插入內容中的 $ 符號須原樣保留');

const byType = SECTION_DIAGRAMS.reduce((m, s) => ({ ...m, [s.type]: (m[s.type] || 0) + 1 }), {});
console.log(`[PASS] ${SECTION_DIAGRAMS.length} 張段落示意圖（${Object.entries(byType).map(([k, v]) => `${k} ${v}`).join('、') || '尚無'}）標題錨點、無數字標籤、長度、繁體與正文不變檢查通過`);
