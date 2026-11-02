import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { cardify } from '../content-cards.js';
import { insertSectionDiagrams } from '../section-diagrams.js';
import { ICON_NAMES } from '../icons.js';
import { LABEL_ICONS } from '../data/icon-map.js';

// 對應表用到的圖示都要存在
for (const name of new Set(Object.values(LABEL_ICONS))) assert.ok(ICON_NAMES.includes(name), `icon-map 用到不存在的圖示：${name}`);

// 卡片版只加 class、圖示與包裝 span：拿掉所有標記後，文字必須與原文逐字相同
const text = html => html.replace(/<svg\b[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '');
let cards = 0, tiles = 0, lists = 0, numbered = 0, tracks = 0;
for (const file of readdirSync(new URL('../data/chapters/', import.meta.url)).filter(f => f.endsWith('.js'))) {
  const { chapter } = await import(new URL(`../data/chapters/${file}`, import.meta.url));
  for (const [html, lang] of [[chapter.contentHtml, 'zh'], [chapter.contentHtmlEn, 'en']]) {
    const input = insertSectionDiagrams(html, chapter.id, lang);
    const out = cardify(input);
    assert.equal(text(out.replace(/<span class="li-num"[^>]*>\d+<\/span>/g, '')), text(input), `${chapter.id} ${lang} 卡片版文字須與原文逐字相同`);
    // 說明框內的 emoji 只能留在視覺隱藏的 span 裡（畫面改用 SVG 圖示）；正文本身提到 emoji 的句子不算
    for (const m of out.matchAll(/<div class="callout [\s\S]*?<\/div><\/div>/g)) {
      const visible = m[0].replace(/<span class="visually-hidden">[\s\S]*?<\/span>/g, '');
      assert.doesNotMatch(text(visible), /📖|🔧|📍/u, `${chapter.id} ${lang} 說明框畫面上不得再有 emoji`);
    }
    // 每個名詞卡與 Know-how 都轉成卡片，固定標籤都有語意圖示
    assert.doesNotMatch(out, /<p class="semi-p"><strong>(?:📖|🔧)/u, `${chapter.id} ${lang} 還有沒轉成卡片的說明框`);
    for (const m of out.matchAll(/<ul class="semi-ul card-tiles[^"]*">([\s\S]*?)<\/ul>/g)) {
      const lis = m[1].match(/<li\b/g).length;
      assert.equal((m[1].match(/<li data-label="/g) || []).length, lis, `${chapter.id} ${lang} 卡片每一格都要有圖示`);
      tiles += lis;
    }
    // 正文「粗體標籤：說明」條列（2–6 項）都要轉成圖示卡格
    const outside = out.replace(/<div class="callout [\s\S]*?<\/div><\/div>/g, '');
    for (const m of outside.matchAll(/<ul class="semi-ul">([\s\S]*?)<\/ul>/g)) {
      const lis = m[1].match(/<li\b[\s\S]*?<\/li>/g) || [];
      const labelled = lis.every(li => /^<li><strong>[^<]{1,60}<\/strong>\s*[：:]/.test(li));
      assert.ok(!(lis.length >= 2 && lis.length <= 6 && labelled), `${chapter.id} ${lang} 有粗體標籤條列沒轉成圖示卡格`);
    }
    cards += (out.match(/<div class="card card-/g) || []).length;
    lists += (out.match(/<ul class="semi-ul icon-list">/g) || []).length;
    numbered += (out.match(/class="li-num"/g) || []).length;
    tracks += (out.match(/<ul class="semi-ul track-steps">/g) || []).length;
    // 晶圓位置的 li 文字不動（章節樣板靠它與站點橫幅比對去重）
    const li = s => [...s.matchAll(/callout-wafer-pos[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/g)].map(x => text(x[1]));
    assert.deepEqual(li(out), li(input), `${chapter.id} ${lang} 晶圓位置文字須不變`);
  }
}
assert.equal(tracks, 50, '25 章中英各一個晶圓位置步進條');
assert.equal(numbered, 0, '正文條列都應有語意圖示，不用序號');
console.log(`[PASS] 說明框卡片（全站：${cards} 張卡、${tiles} 格、${lists} 組圖示條列、${tracks} 個站點步進條）文字逐字不變，emoji 只留在視覺隱藏處，圖示對應完整`);
