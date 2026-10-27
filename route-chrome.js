function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function withoutTitle(raw, title) {
  const wanted = String(title || '').replace(/\s+/g, '');
  if (!wanted) return raw;
  let index = 0;
  let seen = 0;
  while (index < raw.length && seen < wanted.length) {
    if (/\s/.test(raw[index])) {
      index += 1;
      continue;
    }
    if (raw[index] !== wanted[seen]) return raw;
    index += 1;
    seen += 1;
  }
  return seen === wanted.length ? raw.slice(index).trim() : raw;
}

export function previewFromSnippet(snippet, isEn, title = '') {
  const text = String(snippet || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  const marked = isEn
    ? text.match(/This chapter:\s*(.+?)(?:\s+Next stop\b|$)/i)
    : text.match(/本章：\s*(.+?)(?:\s+下一站|$)/);
  const source = (marked ? marked[1] : text.split(/[。.]/)[0]).replace(/\s+/g, ' ').trim();
  const raw = marked ? source : withoutTitle(source, title);
  if (!raw || raw.length <= 110) return raw;
  const slice = raw.slice(0, 110);
  const pivot = Math.max(slice.lastIndexOf('，'), slice.lastIndexOf(','), slice.lastIndexOf(' '));
  return `${(pivot > 40 ? slice.slice(0, pivot) : slice).trim()}…`;
}

export function breadcrumbHtml({ isEn, items }) {
  const parts = items.map(item => (
    item.current || !item.href
      ? `<span aria-current="page">${escapeHtml(item.label)}</span>`
      : `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`
  )).join('');
  return `<nav class="route-crumb" aria-label="${isEn ? 'Breadcrumb' : '路徑'}">${parts}</nav>`;
}

export function chapterNavTarget(href, dataNavTarget) {
  const explicit = typeof dataNavTarget === 'string' ? dataNavTarget.trim() : '';
  if (explicit && explicit !== 'null') return explicit;
  const raw = String(href || '');
  if (!raw.startsWith('#')) return '';
  const id = raw.slice(1);
  if (!id || id === 'null') return '';
  try { return decodeURIComponent(id); } catch { return id; }
}

export function chapterPagerHtml({ isEn, prev, next, compact }) {
  const link = (chapter, dir) => {
    if (!chapter) return '';
    const label = dir === 'prev' ? (isEn ? 'Previous chapter' : '上一章') : (isEn ? 'Next chapter' : '下一章');
    const id = escapeHtml(chapter.id);
    return `<a class="page-nav-card" href="#${id}" data-nav-target="${id}"><span class="nav-direction">${label}</span><span class="nav-title">${escapeHtml(chapter.title)}</span></a>`;
  };
  const prevHtml = link(prev, 'prev');
  const nextHtml = link(next, 'next');
  if (!prevHtml && !nextHtml) return '';
  const id = compact ? '' : ' id="chapterPagerEnd"';
  const label = compact
    ? (isEn ? 'Previous and next chapter, top of the page' : '頁首的上一章與下一章')
    : (isEn ? 'Previous and next chapter, end of the page' : '頁尾的上一章與下一章');
  return `<nav class="chapter-pagination${compact ? ' is-compact' : ''}"${id} aria-label="${label}">${prevHtml}${nextHtml}</nav>`;
}

export function notFoundHtml(isEn) {
  return `<article class="not-found">
    ${breadcrumbHtml({
      isEn,
      items: [
        { href: '#home', label: isEn ? 'Home' : '首頁' },
        { label: isEn ? 'Page not found' : '找不到頁面', current: true }
      ]
    })}
    <p class="ds-kicker">404</p>
    <h1>${isEn ? 'This page is not in the book' : '這本書裡沒有這個頁面'}</h1>
    <p class="home-lead">${isEn
      ? 'The address does not match a chapter, a part, the glossary, or a scenario. The chapters themselves are unchanged.'
      : '這個網址對不上任何章節、分部、術語或情境。教材本身沒有缺頁。'}</p>
    <div class="home-actions">
      <a class="home-action is-primary" href="#home">${isEn ? 'Back to the home page' : '回到首頁'}</a>
      <a class="home-action" href="#explore">${isEn ? 'Open the scenario map' : '進入情境探索'}</a>
      <a class="home-action" href="#glossary">${isEn ? 'Open the glossary' : '查術語'}</a>
    </div>
  </article>`;
}

export function readingProgressText({ isEn, percent, place, total, active }) {
  if (!active) return isEn ? 'Not reading a chapter' : '尚未閱讀章節';
  return isEn
    ? `This chapter ${percent}%. ${place} of ${total} in this book.`
    : `本章 ${percent}%。全書第 ${place} 篇，共 ${total} 篇。`;
}
