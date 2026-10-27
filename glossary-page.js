import { GLOSSARY_DATA } from './data/glossary-data.js';
import { CHAPTER_CATALOG } from './data/chapters-data.js';
import { chapterIdsFromField, glossarySlug } from './glossary-links.js';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

const catalog = new Map(CHAPTER_CATALOG.map(chapter => [chapter.id, chapter]));

function chapterLinks(field, isEn) {
  return chapterIdsFromField(field).map(id => {
    const chapter = catalog.get(id);
    if (!chapter) return '';
    const label = isEn ? (chapter.fullTitleEn || chapter.fullTitle) : chapter.fullTitle;
    return `<a href="#${id}">${escapeHtml(label)}</a>`;
  }).filter(Boolean).join('');
}

export function renderGlossaryPage(lang, slug) {
  const isEn = lang === 'en';
  const entries = GLOSSARY_DATA.map(entry => {
    const id = glossarySlug(entry.en);
    const heading = isEn ? entry.en : (entry.zh && entry.zh !== '—' ? entry.zh : entry.en);
    const alt = isEn ? (entry.zh && entry.zh !== '—' ? entry.zh : '') : entry.en;
    const desc = isEn ? (entry.descEn || entry.desc) : (entry.descZh || entry.desc);
    const links = chapterLinks(entry.chapter, isEn);
    const abbr = entry.abbr ? `<abbr>${escapeHtml(entry.abbr)}</abbr>` : '';
    return `<article class="glossary-entry" id="glossary-${id}" data-glossary-slug="${escapeHtml(id)}" data-search="${escapeHtml(`${entry.zh} ${entry.en} ${entry.abbr} ${desc}`.toLowerCase())}">
      <h2>${escapeHtml(heading)} ${abbr}</h2>
      ${alt ? `<p class="glossary-alt" lang="${isEn ? 'zh-Hant' : 'en'}">${escapeHtml(alt)}</p>` : ''}
      <p>${escapeHtml(desc)}</p>
      ${links ? `<p class="glossary-back">${isEn ? 'In the chapters' : '回到章節'} ${links}</p>` : ''}
    </article>`;
  }).join('');
  return `<article class="glossary-page">
    <nav class="route-crumb" aria-label="${isEn ? 'Breadcrumb' : '路徑'}"><a href="#home">${isEn ? 'Home' : '首頁'}</a><span aria-current="page">${isEn ? 'Glossary' : '術語總表'}</span></nav>
    <p class="ds-kicker">${isEn ? 'Terms in this book' : '本書術語'}</p>
    <h1>${isEn ? 'Glossary' : '術語總表'}</h1>
    <p class="home-lead">${isEn
      ? `Traditional Chinese terms with their English names, taken from the ${GLOSSARY_DATA.length} entries already in this book. Each entry links back to the chapter that introduces it.`
      : `這裡列出本書既有的 ${GLOSSARY_DATA.length} 條術語：台灣繁體中文配上英文術語。每一條都連回介紹它的章節。`}</p>
    <label class="glossary-filter">${isEn ? 'Filter terms' : '篩選術語'}
      <input id="glossaryFilter" type="search" autocomplete="off" placeholder="${isEn ? 'Chinese, English, or abbreviation' : '中文、英文或縮寫'}">
    </label>
    <p id="glossaryCount" class="glossary-count" role="status"></p>
    <div id="glossaryList">${entries}</div>
  </article>`;
}

export function bindGlossaryPage(root, slug) {
  const input = root.querySelector('#glossaryFilter');
  const list = root.querySelector('#glossaryList');
  const count = root.querySelector('#glossaryCount');
  const entries = [...list.querySelectorAll('.glossary-entry')];
  const apply = () => {
    const query = input.value.trim().toLowerCase();
    let visible = 0;
    entries.forEach(entry => {
      const show = !query || entry.dataset.search.includes(query);
      entry.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = `${visible} / ${entries.length}`;
  };
  input.addEventListener('input', apply);
  apply();
  if (!slug) return;
  const target = root.querySelector(`#glossary-${CSS.escape(slug)}`);
  if (!target) return;
  target.hidden = false;
  target.classList.add('is-targeted');
  target.scrollIntoView({ block: 'start' });
}
