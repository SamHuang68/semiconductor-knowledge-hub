/**
 * app.js
 * Semiconductor Knowledge Hub — 主控制器
 * 支援純前端單頁式極速閱讀、路由切換、全文搜尋、術語字典、製程圖譜、
 * 手機端抽屜導覽、字級縮放、學習進度追蹤與捲動進度指示
 */

import { CHAPTERS_DATA } from './data/chapters-data.js';
import { FAB_FLOW_NODES } from './data/fab-flow.js';
import { GLOSSARY_DATA, JARGON_DATA } from './data/glossary-data.js';
import { SEARCH_INDEX } from './data/search-index.js';

(() => {
  'use strict';

  let currentChapterId = 'ch00';
  let activeJargonTab = 'all';

  // 本地學習進度與偏好記憶
  const READ_STORAGE_KEY = 'semi_read_chapters';
  const FONT_STORAGE_KEY = 'semi_font_size';

  const readChapters = new Set(JSON.parse(localStorage.getItem(READ_STORAGE_KEY) || '[]'));
  let currentFontSize = parseFloat(localStorage.getItem(FONT_STORAGE_KEY) || '16.5');

  // DOM 節點快取
  const appSidebarEl = document.getElementById('appSidebar');
  const sidebarNavEl = document.getElementById('sidebarNav');
  const sidebarBackdropEl = document.getElementById('sidebarBackdrop');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const chapterFilterEl = document.getElementById('chapterFilter');
  const mainCanvasEl = document.getElementById('mainContentArea');
  const tocListEl = document.getElementById('tocList');
  const readingProgressBar = document.getElementById('readingProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const studyProgressText = document.getElementById('studyProgressText');
  const studyProgressBar = document.getElementById('studyProgressBar');

  const atlasModalEl = document.getElementById('atlasModal');
  const atlasGridEl = document.getElementById('atlasGrid');
  const jargonModalEl = document.getElementById('jargonModal');
  const jargonListEl = document.getElementById('jargonList');
  const jargonSearchInput = document.getElementById('jargonSearchInput');
  const searchModalEl = document.getElementById('searchModal');
  const searchInputEl = document.getElementById('searchModalInput');
  const searchResultsEl = document.getElementById('searchResultsList');

  // 字級調節按鈕
  const fontSizeDecBtn = document.getElementById('fontSizeDecBtn');
  const fontSizeResetBtn = document.getElementById('fontSizeResetBtn');
  const fontSizeIncBtn = document.getElementById('fontSizeIncBtn');

  /**
   * 套用字級
   */
  function applyFontSize(size) {
    currentFontSize = Math.min(22, Math.max(14, size));
    document.documentElement.style.setProperty('--article-font-size', `${currentFontSize}px`);
    localStorage.setItem(FONT_STORAGE_KEY, String(currentFontSize));
  }

  /**
   * 更新學習進度條 (0 ~ 25 章)
   */
  function updateStudyProgress() {
    const totalCoreChapters = 25; // 0 到 24 章
    const coreCount = [...readChapters].filter(id => id.startsWith('ch')).length;
    const pct = Math.min(100, Math.round((coreCount / totalCoreChapters) * 100));

    if (studyProgressText) {
      studyProgressText.textContent = `${coreCount} / ${totalCoreChapters} 章 (${pct}%)`;
    }
    if (studyProgressBar) {
      studyProgressBar.style.width = `${pct}%`;
    }
  }

  /**
   * 標記當前章節為已讀
   */
  function markChapterRead(chId) {
    if (!readChapters.has(chId)) {
      readChapters.add(chId);
      localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...readChapters]));
      updateStudyProgress();
      renderSidebar(chapterFilterEl ? chapterFilterEl.value : '');
    }
  }

  /**
   * 1. 初始化側邊欄目錄樹
   */
  function renderSidebar(filterText = '') {
    if (!sidebarNavEl) return;
    const partsMap = new Map();

    // 分組
    CHAPTERS_DATA.forEach(ch => {
      if (filterText && !ch.fullTitle.toLowerCase().includes(filterText.toLowerCase()) && !ch.shortTitle.toLowerCase().includes(filterText.toLowerCase())) {
        return;
      }
      if (!partsMap.has(ch.part)) {
        partsMap.set(ch.part, []);
      }
      partsMap.get(ch.part).push(ch);
    });

    let html = '';
    for (const [partName, chapters] of partsMap.entries()) {
      html += `
        <div class="part-group">
          <div class="part-title">${partName}</div>
          <ul class="chapter-nav-list">
      `;
      chapters.forEach(ch => {
        const isActive = ch.id === currentChapterId;
        const isRead = readChapters.has(ch.id);
        const numStr = ch.num < 10 ? `0${ch.num}` : `${ch.num}`;
        html += `
          <li class="chapter-nav-item">
            <a href="#${ch.id}" class="chapter-nav-link ${isActive ? 'is-active' : ''}" data-ch-id="${ch.id}">
              <span class="ch-title-wrap">
                <span class="ch-number">${ch.id.startsWith('app') ? '附錄' : `CH ${numStr}`}</span>
                <span>${escapeHtml(ch.shortTitle)}</span>
              </span>
              ${isRead ? '<span class="read-check-indicator" title="已閱讀完成">✓</span>' : ''}
            </a>
          </li>
        `;
      });
      html += `</ul></div>`;
    }

    if (partsMap.size === 0) {
      html = '<div style="padding: 16px; font-size: 13px; color: var(--text-muted);">查無相符章節</div>';
    }

    sidebarNavEl.innerHTML = html;
  }

  /**
   * 2. 載入並渲染指定章節
   */
  function loadChapter(chId) {
    const chapter = CHAPTERS_DATA.find(c => c.id === chId) || CHAPTERS_DATA[0];
    currentChapterId = chapter.id;

    // 標記已讀
    markChapterRead(chapter.id);

    // 更新網址 Hash (若不同)
    if (window.location.hash !== `#${chapter.id}`) {
      history.replaceState(null, '', `#${chapter.id}`);
    }

    // 計算上一章與下一章
    const currentIndex = CHAPTERS_DATA.findIndex(c => c.id === chapter.id);
    const prevChapter = currentIndex > 0 ? CHAPTERS_DATA[currentIndex - 1] : null;
    const nextChapter = currentIndex < CHAPTERS_DATA.length - 1 ? CHAPTERS_DATA[currentIndex + 1] : null;

    // 渲染主閱讀區
    let trackHtml = '';
    if (chapter.waferTrack) {
      trackHtml = `
        <div class="wafer-track-banner">
          <div class="track-info">
            <span class="track-kicker">📍 晶圓位置旅程</span>
            <span class="track-title">${chapter.waferTrack.replace(/\n/g, ' · ')}</span>
          </div>
          <span class="track-badge">WAFER TRACK</span>
        </div>
      `;
    }

    let paginationHtml = `
      <div class="chapter-pagination">
        ${prevChapter ? `
          <a href="#${prevChapter.id}" class="page-nav-card" data-nav-target="${prevChapter.id}">
            <span class="nav-direction">← 上一章</span>
            <span class="nav-title">${escapeHtml(prevChapter.shortTitle)}</span>
          </a>
        ` : '<div></div>'}
        ${nextChapter ? `
          <a href="#${nextChapter.id}" class="page-nav-card" style="text-align: right;" data-nav-target="${nextChapter.id}">
            <span class="nav-direction">下一章 →</span>
            <span class="nav-title">${escapeHtml(nextChapter.shortTitle)}</span>
          </a>
        ` : '<div></div>'}
      </div>
    `;

    mainCanvasEl.innerHTML = `
      ${trackHtml}
      <header class="article-header">
        <div class="article-top-bar">
          <span class="article-part-label">${chapter.part}</span>
          <div class="article-action-cluster">
            <button type="button" class="article-action-btn" id="copyLinkBtn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              <span>複製章節連結</span>
            </button>
          </div>
        </div>
        <h1 class="article-headline">${escapeHtml(chapter.fullTitle)}</h1>
      </header>
      <div class="article-body">
        ${chapter.contentHtml}
      </div>
      ${paginationHtml}
    `;

    // 重新高亮側邊欄
    renderSidebar(chapterFilterEl ? chapterFilterEl.value : '');

    // 渲染段落 TOC
    renderToc(chapter.headings);

    // 捲動至頁首
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 手機版自動收合側邊欄
    if (appSidebarEl) {
      appSidebarEl.classList.remove('is-open');
    }
    if (sidebarBackdropEl) {
      sidebarBackdropEl.classList.remove('is-active');
    }
  }

  /**
   * 3. 渲染右側段落目錄 (TOC)
   */
  function renderToc(headings) {
    if (!tocListEl) return;
    if (!headings || headings.length === 0) {
      tocListEl.innerHTML = '<li class="toc-item"><span style="font-size: 12px; color: var(--text-muted);">本章無次級標題</span></li>';
      return;
    }

    let html = '';
    headings.forEach(h => {
      html += `
        <li class="toc-item">
          <a href="#${h.id}" class="toc-link" data-toc-target="${h.id}">${escapeHtml(h.text)}</a>
        </li>
      `;
    });
    tocListEl.innerHTML = html;
  }

  /**
   * 4. 滾動聯動高亮 (ScrollSpy) 與頂部進度條
   */
  window.addEventListener('scroll', () => {
    // 頂部進度條
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && readingProgressBar) {
      const scrollPct = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
      readingProgressBar.style.width = `${scrollPct}%`;
    }

    // 回到頂部按鈕可見度
    if (backToTopBtn) {
      if (window.scrollY > 320) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }

    // TOC ScrollSpy
    const headingEls = mainCanvasEl.querySelectorAll('h2[id], h3[id]');
    if (headingEls.length === 0) return;

    let currentHeadingId = '';
    const scrollPos = window.scrollY + 120;

    headingEls.forEach(el => {
      if (el.offsetTop <= scrollPos) {
        currentHeadingId = el.id;
      }
    });

    if (currentHeadingId && tocListEl) {
      tocListEl.querySelectorAll('.toc-link').forEach(link => {
        if (link.getAttribute('data-toc-target') === currentHeadingId) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }
  }, { passive: true });

  /**
   * 5. 渲染製程全景圖譜 (Atlas Modal)
   */
  function renderAtlasModal() {
    if (!atlasGridEl) return;
    let html = '';
    FAB_FLOW_NODES.forEach(node => {
      html += `
        <div class="atlas-card" data-jump-ch="${node.chapterId}">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="atlas-step-num">STEP ${node.num}</span>
              <span class="track-badge" style="font-size: 10px;">${node.badge}</span>
            </div>
            <h3 class="atlas-card-title">${escapeHtml(node.nameZh)}</h3>
            <p class="atlas-card-desc">${escapeHtml(node.summary)}</p>
          </div>
          <div class="atlas-card-meta">
            <div><strong>關鍵機台：</strong>${escapeHtml(node.keyTool)}</div>
            <div><strong>所屬站點：</strong>${escapeHtml(node.chapterTitle)}</div>
          </div>
        </div>
      `;
    });
    atlasGridEl.innerHTML = html;
  }

  /**
   * 6. 渲染現場行話與術語字典 (Jargon Modal)
   */
  function renderJargonModal(query = '', tab = 'all') {
    if (!jargonListEl) return;
    let items = [];

    if (tab === 'all' || tab === 'glossary') {
      GLOSSARY_DATA.forEach(g => {
        if (!query || g.en.toLowerCase().includes(query.toLowerCase()) || g.zh.includes(query) || (g.abbr && g.abbr.toLowerCase().includes(query.toLowerCase())) || g.desc.includes(query)) {
          items.push({
            type: 'glossary',
            term: `${g.zh} (${g.en}${g.abbr ? ' / ' + g.abbr : ''})`,
            meaning: g.desc,
            example: g.chapter ? `主要出現章節：第 ${g.chapter} 章` : ''
          });
        }
      });
    }

    if (tab === 'all' || tab === 'jargon' || tab === 'wafer' || tab === 'tool' || tab === 'system' || tab === 'quality') {
      JARGON_DATA.forEach(j => {
        const catMatch = 
          tab === 'all' || 
          (tab === 'jargon') || 
          (tab === 'wafer' && j.category.includes('晶圓')) ||
          (tab === 'tool' && j.category.includes('機台')) ||
          (tab === 'system' && j.category.includes('系統')) ||
          (tab === 'quality' && j.category.includes('品質'));

        if (catMatch) {
          if (!query || j.term.includes(query) || j.meaning.includes(query) || j.example.includes(query)) {
            items.push({
              type: 'jargon',
              term: `【${j.category}】${j.term}`,
              meaning: j.meaning,
              example: j.example ? `💬 例句：${j.example}` : ''
            });
          }
        }
      });
    }

    if (items.length === 0) {
      jargonListEl.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-muted);">查無相符名詞或行話</div>';
      return;
    }

    let html = '';
    items.forEach(it => {
      html += `
        <div class="jargon-item-card">
          <div class="jargon-term">${escapeHtml(it.term)}</div>
          <div class="jargon-meaning">${escapeHtml(it.meaning)}</div>
          ${it.example ? `<div class="jargon-example">${escapeHtml(it.example)}</div>` : ''}
        </div>
      `;
    });
    jargonListEl.innerHTML = html;
  }

  /**
   * 7. 全文檢索功能
   */
  function runSearch(keyword) {
    if (!searchResultsEl) return;
    if (!keyword || keyword.trim() === '') {
      searchResultsEl.innerHTML = '<div style="padding: 16px; font-size: 13px; color: var(--text-muted); text-align: center;">輸入關鍵字搜尋 25 章內容、術語與行話...</div>';
      return;
    }
    const q = keyword.trim().toLowerCase();
    const hits = [];

    SEARCH_INDEX.forEach(idx => {
      if (idx.title.toLowerCase().includes(q) || idx.keywords.toLowerCase().includes(q)) {
        hits.push(idx);
      }
    });

    if (hits.length === 0) {
      searchResultsEl.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">找不到包含「${escapeHtml(keyword)}」的章節或內容</div>`;
      return;
    }

    let html = '';
    hits.forEach(hit => {
      html += `
        <div class="jargon-item-card" data-search-target="${hit.chId}" style="cursor: pointer; margin-bottom: 8px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--semi-blue);">${hit.part}</div>
          <div class="jargon-term">${escapeHtml(hit.title)}</div>
          <div class="jargon-meaning" style="font-size: 13px;">${escapeHtml(hit.snippet)}...</div>
        </div>
      `;
    });
    searchResultsEl.innerHTML = html;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 事件監聽與綁定
  // ══════════════════════════════════════════════════════════════════════════

  // 1. 側邊欄過濾輸入
  if (chapterFilterEl) {
    chapterFilterEl.addEventListener('input', (e) => {
      renderSidebar(e.target.value);
    });
  }

  // 2. Hash 路由監聽
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('ch') || hash.startsWith('app')) {
      loadChapter(hash);
    }
  });

  // 3. 事件代理：點擊導航與跨頁跳轉
  document.addEventListener('click', (e) => {
    // 側邊欄點擊
    const navLink = e.target.closest('.chapter-nav-link');
    if (navLink) {
      e.preventDefault();
      const targetId = navLink.getAttribute('data-ch-id');
      loadChapter(targetId);
      return;
    }

    // 章節底部分頁點擊
    const pageNav = e.target.closest('.page-nav-card');
    if (pageNav) {
      e.preventDefault();
      const targetId = pageNav.getAttribute('data-nav-target');
      loadChapter(targetId);
      return;
    }

    // 製程圖譜卡片跳轉
    const atlasCard = e.target.closest('.atlas-card');
    if (atlasCard) {
      const targetId = atlasCard.getAttribute('data-jump-ch');
      atlasModalEl.classList.remove('is-open');
      loadChapter(targetId);
      return;
    }

    // 全文搜尋結果跳轉
    const searchCard = e.target.closest('[data-search-target]');
    if (searchCard) {
      const targetId = searchCard.getAttribute('data-search-target');
      searchModalEl.classList.remove('is-open');
      loadChapter(targetId);
      return;
    }

    // 複製章節連結按鈕
    if (e.target.closest('#copyLinkBtn')) {
      const btn = e.target.closest('#copyLinkBtn');
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>已複製連結！</span>';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
      });
      return;
    }

    // 開啟全景圖譜
    if (e.target.closest('#openAtlasBtn')) {
      atlasModalEl.classList.add('is-open');
      renderAtlasModal();
      return;
    }

    // 關閉全景圖譜
    if (e.target.closest('#closeAtlasBtn') || (e.target === atlasModalEl)) {
      atlasModalEl.classList.remove('is-open');
      return;
    }

    // 開啟行話字典
    if (e.target.closest('#openJargonBtn')) {
      jargonModalEl.classList.add('is-open');
      renderJargonModal('', activeJargonTab);
      return;
    }

    // 關閉行話字典
    if (e.target.closest('#closeJargonBtn') || (e.target === jargonModalEl)) {
      jargonModalEl.classList.remove('is-open');
      return;
    }

    // 行話字典 Tab 切換
    const tabPill = e.target.closest('.tab-pill');
    if (tabPill) {
      document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('is-active'));
      tabPill.classList.add('is-active');
      activeJargonTab = tabPill.getAttribute('data-tab');
      renderJargonModal(jargonSearchInput ? jargonSearchInput.value : '', activeJargonTab);
      return;
    }

    // 開啟全文搜尋
    if (e.target.closest('#openSearchBtn')) {
      searchModalEl.classList.add('is-open');
      if (searchInputEl) {
        searchInputEl.value = '';
        searchInputEl.focus();
        runSearch('');
      }
      return;
    }

    // 關閉全文搜尋
    if (e.target.closest('#closeSearchBtn') || (e.target === searchModalEl)) {
      searchModalEl.classList.remove('is-open');
      return;
    }

    // 手機側邊欄切換
    if (e.target.closest('#mobileToggleBtn')) {
      if (appSidebarEl) appSidebarEl.classList.toggle('is-open');
      if (sidebarBackdropEl) sidebarBackdropEl.classList.toggle('is-active');
      return;
    }

    // 點擊手機側邊欄遮罩
    if (e.target === sidebarBackdropEl) {
      if (appSidebarEl) appSidebarEl.classList.remove('is-open');
      if (sidebarBackdropEl) sidebarBackdropEl.classList.remove('is-active');
      return;
    }
  });

  // 4. 行話字典即時搜尋輸入
  if (jargonSearchInput) {
    jargonSearchInput.addEventListener('input', (e) => {
      renderJargonModal(e.target.value, activeJargonTab);
    });
  }

  // 5. 全文搜尋即時輸入
  if (searchInputEl) {
    searchInputEl.addEventListener('input', (e) => {
      runSearch(e.target.value);
    });
  }

  // 6. 字級按鈕
  if (fontSizeDecBtn) {
    fontSizeDecBtn.addEventListener('click', () => applyFontSize(currentFontSize - 1));
  }
  if (fontSizeResetBtn) {
    fontSizeResetBtn.addEventListener('click', () => applyFontSize(16.5));
  }
  if (fontSizeIncBtn) {
    fontSizeIncBtn.addEventListener('click', () => applyFontSize(currentFontSize + 1));
  }

  // 7. 回到頂部按鈕
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 8. 全域熱鍵 (Keyboard Shortcuts)
  window.addEventListener('keydown', (e) => {
    // Esc 關閉所有彈窗
    if (e.key === 'Escape') {
      if (atlasModalEl) atlasModalEl.classList.remove('is-open');
      if (jargonModalEl) jargonModalEl.classList.remove('is-open');
      if (searchModalEl) searchModalEl.classList.remove('is-open');
      if (appSidebarEl) appSidebarEl.classList.remove('is-open');
      if (sidebarBackdropEl) sidebarBackdropEl.classList.remove('is-active');
      return;
    }

    // / 或 Ctrl+K 開啟全域搜尋
    if ((e.key === '/' && document.activeElement.tagName !== 'INPUT') || (e.key === 'k' && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      searchModalEl.classList.add('is-open');
      if (searchInputEl) {
        searchInputEl.value = '';
        searchInputEl.focus();
        runSearch('');
      }
    }
  });

  // 初始載入
  applyFontSize(currentFontSize);
  updateStudyProgress();

  const initHash = window.location.hash.replace('#', '');
  const initialId = (initHash.startsWith('ch') || initHash.startsWith('app')) ? initHash : 'ch00';
  renderSidebar();
  loadChapter(initialId);

})();
