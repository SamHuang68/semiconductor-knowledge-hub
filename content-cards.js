// 說明框與「粗體標籤：說明」條列改成有圖示的卡片（視覺升級第 1 階段）。
// 字串層轉換，接在 insertSectionDiagrams 之後：只加 class、圖示與包裝用的 span，文字一字不改；
// emoji 與標籤後的冒號包進 .visually-hidden，仍留在 DOM（讀屏、搜尋、複製照舊）。
// Sam 2026-11-03 核可樣式，先以 ch05、ch13、ch21 做樣板，驗收後於 2.16.0 擴到全站。
import { icon } from './icons.js';
import { LABEL_ICONS } from './data/icon-map.js';

const hidden = text => `<span class="visually-hidden">${text}</span>`;
const EMOJI = /^(📖|🔧|📍)\s*/u;
// <li><strong>標籤</strong>：說明</li>；標籤不含標籤內的其他標記
const LABELLED = /^<li><strong>([^<]{1,60})<\/strong>(\s*[：:]\s*)([\s\S]*)<\/li>$/;
const listItems = ul => ul.match(/<li\b[\s\S]*?<\/li>/g) || [];

// 一則「粗體標題 + 條列」：名詞卡排兩欄四格，Know-how 排成「情境 → 做法 → 為什麼 → 沒做會怎樣」，相關章節放在最後一列
function card(title, ul, kind) {
  const head = title.replace(/^<p class="semi-p"><strong>(📖|🔧)\s*/u, (m, e) => `<p class="semi-p card-title">${icon(kind === 'term' ? 'term' : 'knowhow')}<strong>${hidden(`${e} `)}`);
  const tiles = listItems(ul).map(li => {
    const m = li.match(LABELLED);
    if (!m) return li;
    const name = LABEL_ICONS[m[1]];
    return `<li${name ? ` data-label="${name}"` : ''}>${name ? icon(name) : ''}<span class="tile-body"><strong>${m[1]}</strong>${hidden(m[2])}${m[3]}</span></li>`;
  }).join('');
  return `<div class="card card-${kind}">${head}\n<ul class="semi-ul card-tiles ${kind === 'term' ? 'grid' : 'chain'}">${tiles}</ul></div>`;
}

function callout(kind, badge, body) {
  const badgeHtml = badge.replace(EMOJI, m => icon(kind === 'callout-glossary' ? 'term' : kind === 'callout-knowhow' ? 'knowhow' : 'wafer') + hidden(m));
  let next;
  if (kind === 'callout-wafer-pos') {
    // 晶圓位置：前一站、本章、下一站。li 的文字不動，章節樣板靠 li 文字與上方站點橫幅比對去重
    next = body.replace(/^<p class="semi-p">(📍\s*)/u, (m, e) => `<p class="semi-p">${hidden(e)}`)
      .replace(/<ul class="semi-ul">([\s\S]*?)<\/ul>/, (m, lis) => `<ul class="semi-ul track-steps">${listItems(lis).map((li, i) => li.replace(/^<li>([\s\S]*)<\/li>$/, (x, inner) => `<li${i === 1 ? ' class="is-current"' : ''}>${icon('wafer')}<span class="li-body">${inner}</span></li>`)).join('')}</ul>`);
  } else {
    const blocks = [...body.matchAll(/<p class="semi-p"><strong>(?:📖|🔧)[\s\S]*?<\/p>\s*<ul class="semi-ul">[\s\S]*?<\/ul>/gu)];
    next = body;
    for (const b of blocks.reverse()) {
      const [, title, ul] = b[0].match(/^(<p class="semi-p">[\s\S]*?<\/p>)\s*(<ul class="semi-ul">[\s\S]*?<\/ul>)$/);
      const kindOf = /^<p class="semi-p"><strong>📖/u.test(title) ? 'term' : 'knowhow';
      next = next.slice(0, b.index) + card(title, ul, kindOf) + next.slice(b.index + b[0].length);
    }
  }
  return `<div class="callout ${kind} is-carded"><div class="callout-badge">${badgeHtml}</div><div class="callout-body">${next}</div></div>`;
}

// 正文的「粗體標籤：說明」條列（2–6 項、每項都有標籤）→ 圖示卡格；標籤查不到圖示時整組改用序號
function iconList(ul) {
  const items = listItems(ul.replace(/^<ul class="semi-ul">|<\/ul>$/g, '')).map(li => li.match(LABELLED));
  if (items.length < 2 || items.length > 6 || items.some(m => !m)) return ul;
  const named = items.every(m => LABEL_ICONS[m[1]]);
  const lis = items.map((m, i) => `<li>${named ? icon(LABEL_ICONS[m[1]]) : `<span class="li-num" aria-hidden="true">${i + 1}</span>`}<span class="li-body"><strong>${m[1]}</strong>${hidden(m[2])}${m[3]}</span></li>`).join('');
  return `<ul class="semi-ul icon-list">${lis}</ul>`;
}

export function cardify(html) {
  return String(html)
    .replace(/<div class="callout (callout-glossary|callout-knowhow|callout-wafer-pos)"><div class="callout-badge">([\s\S]*?)<\/div><div class="callout-body">([\s\S]*?)<\/div><\/div>/g, (m, kind, badge, body) => callout(kind, badge, body))
    .replace(/<ul class="semi-ul">[\s\S]*?<\/ul>/g, ul => iconList(ul));
}
