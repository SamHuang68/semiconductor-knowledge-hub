import { GLOSSARY_DATA } from './data/glossary-data.js';

export function glossarySlug(en) {
  return String(en || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function chapterIdsFromField(field) {
  return String(field || '').split(/[、,]/).map(part => part.trim()).filter(part => /^\d+$/.test(part)).map(num => `ch${num.padStart(2, '0')}`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildTerms(lang, context) {
  const hasPolishingPad = /\bpolishing[\s-]+pads?\b/i.test(context);
  const terms = [];
  for (const entry of GLOSSARY_DATA) {
    const slug = glossarySlug(entry.en);
    if (!slug) continue;
    if (lang === 'zh' && entry.zh && entry.zh !== '—' && entry.zh.length >= 2) {
      terms.push({ slug, text: entry.zh, kind: 'plain' });
    }
    if (lang === 'en' && entry.en && entry.en.length >= 4) {
      terms.push({ slug, text: entry.en, kind: 'word' });
    }
    // 出現拋光墊時，Pad 語意不明；完整 Bond Pad 與中文焊墊仍保留。
    if (hasPolishingPad && slug === 'bond-pad') continue;
    if (entry.abbr && entry.abbr.length >= 3 && /^[A-Za-z0-9]+$/.test(entry.abbr)) {
      terms.push({ slug, text: entry.abbr, kind: 'word' });
    }
  }
  terms.sort((a, b) => b.text.length - a.text.length);
  return terms;
}

function locate(text, term) {
  if (term.kind === 'plain') return text.indexOf(term.text);
  const match = new RegExp(`(?:^|[^A-Za-z0-9])(${escapeRegExp(term.text)})(?=$|[^A-Za-z0-9])`, 'i').exec(text);
  if (!match) return -1;
  return match.index + match[0].length - match[1].length;
}

function linkTextNode(node, terms, used) {
  const text = node.nodeValue;
  if (!text || !text.trim()) return;
  let best = null;
  for (const term of terms) {
    if (used.has(term.slug)) continue;
    const index = locate(text, term);
    if (index < 0) continue;
    if (!best || index < best.index || (index === best.index && term.text.length > best.term.text.length)) {
      best = { index, term };
    }
  }
  if (!best) return;
  const { index, term } = best;
  const parent = node.parentNode;
  if (text.slice(0, index)) parent.insertBefore(document.createTextNode(text.slice(0, index)), node);
  const link = document.createElement('a');
  link.href = `#glossary/${term.slug}`;
  link.className = 'glossary-term';
  link.textContent = text.slice(index, index + term.text.length);
  parent.insertBefore(link, node);
  node.nodeValue = text.slice(index + term.text.length);
  used.add(term.slug);
  if (node.nodeValue) linkTextNode(node, terms, used);
}

export function linkGlossaryTerms(root, lang) {
  if (!root) return 0;
  const terms = buildTerms(lang === 'en' ? 'en' : 'zh', root.textContent || '');
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest('a, code, pre, script, style, svg, button, h1, h2, h3, textarea')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const used = new Set();
  nodes.forEach(node => linkTextNode(node, terms, used));
  return used.size;
}
