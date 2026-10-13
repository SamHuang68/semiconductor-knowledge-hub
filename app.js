/**
 * app.js
 * Semiconductor Knowledge Hub — 主控制器 (深度優化旗艦版)
 * 支援純前端單頁式極速閱讀、路由切換、全文搜尋、術語字典、製程圖譜、
 * 手機端抽屜導覽、字級縮放、學習進度追蹤、書籤收藏、Mermaid 向量渲染、
 * 代碼一鍵複製與全套鍵盤極速導航。
 */

import { CHAPTERS_DATA } from './data/chapters-data.js';
import { FAB_FLOW_NODES } from './data/fab-flow.js';
import { GLOSSARY_DATA, JARGON_DATA } from './data/glossary-data.js';
import { SEARCH_INDEX } from './data/search-index.js';

(() => {
  'use strict';

  let currentChapterId = 'ch00';
  let activeJargonTab = 'all';
  let activeSidebarFilterMode = 'all'; // 'all' | 'read' | 'starred'

  // 本地學習進度、收藏與字級偏好記憶
  const READ_STORAGE_KEY = 'semi_read_chapters';
  const BOOKMARK_STORAGE_KEY = 'semi_bookmarked_chapters';
  const FONT_STORAGE_KEY = 'semi_font_size';

  const readChapters = new Set(JSON.parse(localStorage.getItem(READ_STORAGE_KEY) || '[]'));
  const bookmarkedChapters = new Set(JSON.parse(localStorage.getItem(BOOKMARK_STORAGE_KEY) || '[]'));
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
  const shortcutsModalEl = document.getElementById('shortcutsModal');

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
   * 切換收藏狀態
   */
  function toggleBookmark(chId) {
    if (bookmarkedChapters.has(chId)) {
      bookmarkedChapters.delete(chId);
    } else {
      bookmarkedChapters.add(chId);
    }
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify([...bookmarkedChapters]));
    renderSidebar(chapterFilterEl ? chapterFilterEl.value : '');
    updateBookmarkButtonUI(chId);
  }

  function updateBookmarkButtonUI(chId) {
    const btn = document.getElementById('toggleBookmarkBtn');
    if (!btn) return;
    const isBookmarked = bookmarkedChapters.has(chId);
    if (isBookmarked) {
      btn.classList.add('is-bookmarked');
      btn.innerHTML = '⭐ 已收藏';
    } else {
      btn.classList.remove('is-bookmarked');
      btn.innerHTML = '☆ 收藏此章';
    }
  }

  /**
   * 1. 初始化側邊欄目錄樹
   */
  function renderSidebar(filterText = '') {
    if (!sidebarNavEl) return;
    const partsMap = new Map();

    // 分組與模式過濾
    CHAPTERS_DATA.forEach(ch => {
      // 搜尋文字過濾
      if (filterText && !ch.fullTitle.toLowerCase().includes(filterText.toLowerCase()) && !ch.shortTitle.toLowerCase().includes(filterText.toLowerCase())) {
        return;
      }
      // 模式過濾
      if (activeSidebarFilterMode === 'read' && !readChapters.has(ch.id)) {
        return;
      }
      if (activeSidebarFilterMode === 'starred' && !bookmarkedChapters.has(ch.id)) {
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
        const isStarred = bookmarkedChapters.has(ch.id);
        const numStr = ch.num < 10 ? `0${ch.num}` : `${ch.num}`;
        html += `
          <li class="chapter-nav-item">
            <a href="#${ch.id}" class="chapter-nav-link ${isActive ? 'is-active' : ''}" data-ch-id="${ch.id}">
              <span class="ch-title-wrap">
                <span class="ch-number">${ch.id.startsWith('app') ? '附錄' : `CH ${numStr}`}</span>
                <span>${escapeHtml(ch.shortTitle)}</span>
              </span>
              <span style="display: flex; align-items: center;">
                ${isStarred ? '<span class="star-indicator" title="已收藏">★</span>' : ''}
                ${isRead ? '<span class="read-check-indicator" title="已閱讀完成">✓</span>' : ''}
              </span>
            </a>
          </li>
        `;
      });
      html += `</ul></div>`;
    }

    if (partsMap.size === 0) {
      html = '<div style="padding: 16px; font-size: 13px; color: var(--text-muted); text-align: center;">查無相符章節</div>';
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

    const isBookmarked = bookmarkedChapters.has(chapter.id);

    mainCanvasEl.innerHTML = `
      ${trackHtml}
      <header class="article-header">
        <div class="article-top-bar">
          <span class="article-part-label">${chapter.part}</span>
          <div class="article-action-cluster">
            <button type="button" class="article-action-btn ${isBookmarked ? 'is-bookmarked' : ''}" id="toggleBookmarkBtn" title="收藏此章節 (快捷鍵: B)">
              ${isBookmarked ? '⭐ 已收藏' : '☆ 收藏此章'}
            </button>
            <button type="button" class="article-action-btn" id="copyLinkBtn" title="複製目前章節連結">
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

    // 渲染 Mermaid 圖表與代碼複製鈕
    renderMermaidDiagrams();
    attachCodeCopyButtons();

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

  /**
   * 8. Mermaid 流程圖動態向量渲染
   */
  async function renderMermaidDiagrams() {
    const diagrams = mainCanvasEl.querySelectorAll('.mermaid-diagram');
    if (diagrams.length === 0) return;

    try {
      if (!window.mermaid) {
        const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');
        window.mermaid = mermaid;
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          themeVariables: {
            primaryColor: '#e0f2fe',
            primaryBorderColor: '#0284c7',
            primaryTextColor: '#0f172a',
            lineColor: '#0284c7',
            secondaryColor: '#f1f5f9',
            tertiaryColor: '#ffffff'
          }
        });
      }

      for (let i = 0; i < diagrams.length; i++) {
        const d = diagrams[i];
        const rawCode = d.getAttribute('data-mermaid');
        if (rawCode) {
          const id = `mermaid-svg-${Date.now()}-${i}`;
          const { svg } = await window.mermaid.render(id, rawCode);
          d.innerHTML = `<div class="mermaid-rendered">${svg}</div>`;
        }
      }
    } catch (err) {
      console.warn('Mermaid 渲染受阻，保留原始代碼區塊:', err);
    }
  }

  /**
   * 9. 代碼區塊右上角一鍵複製
   */
  function attachCodeCopyButtons() {
    mainCanvasEl.querySelectorAll('pre.code-pre').forEach((pre) => {
      if (pre.querySelector('.copy-code-btn')) return;
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn';
      copyBtn.type = 'button';
      copyBtn.textContent = '複製';
      copyBtn.title = '複製代碼內容';
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        navigator.clipboard.writeText(code).then(() => {
          copyBtn.textContent = '已複製！';
          setTimeout(() => { copyBtn.textContent = '複製'; }, 2000);
        });
      });
      pre.appendChild(copyBtn);
    });
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

  // 2. 側邊欄切換 Tab (全部 / 已讀 / 收藏)
  document.querySelectorAll('.side-tab-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.side-tab-pill').forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      activeSidebarFilterMode = pill.getAttribute('data-filter-mode');
      renderSidebar(chapterFilterEl ? chapterFilterEl.value : '');
    });
  });

  // 3. Hash 路由監聽
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('ch') || hash.startsWith('app')) {
      loadChapter(hash);
    }
  });

  // 4. 事件代理：點擊導航與跨頁跳轉
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

    // 收藏當前章節
    if (e.target.closest('#toggleBookmarkBtn')) {
      toggleBookmark(currentChapterId);
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

    // 開啟快捷鍵指南
    if (e.target.closest('#openShortcutsBtn')) {
      shortcutsModalEl.classList.add('is-open');
      return;
    }

    // 關閉快捷鍵指南
    if (e.target.closest('#closeShortcutsBtn') || (e.target === shortcutsModalEl)) {
      shortcutsModalEl.classList.remove('is-open');
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

  // 5. 行話字典即時搜尋輸入
  if (jargonSearchInput) {
    jargonSearchInput.addEventListener('input', (e) => {
      renderJargonModal(e.target.value, activeJargonTab);
    });
  }

  // 6. 全文搜尋即時輸入
  if (searchInputEl) {
    searchInputEl.addEventListener('input', (e) => {
      runSearch(e.target.value);
    });
  }

  // 7. 字級按鈕
  if (fontSizeDecBtn) {
    fontSizeDecBtn.addEventListener('click', () => applyFontSize(currentFontSize - 1));
  }
  if (fontSizeResetBtn) {
    fontSizeResetBtn.addEventListener('click', () => applyFontSize(16.5));
  }
  if (fontSizeIncBtn) {
    fontSizeIncBtn.addEventListener('click', () => applyFontSize(currentFontSize + 1));
  }

  // 8. 回到頂部按鈕
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 9. 全域熱鍵 (Keyboard Shortcuts)
  window.addEventListener('keydown', (e) => {
    // 忽略在輸入框中的按鍵
    const isInputActive = document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA');

    // Esc 關閉所有彈窗
    if (e.key === 'Escape') {
      if (atlasModalEl) atlasModalEl.classList.remove('is-open');
      if (jargonModalEl) jargonModalEl.classList.remove('is-open');
      if (searchModalEl) searchModalEl.classList.remove('is-open');
      if (shortcutsModalEl) shortcutsModalEl.classList.remove('is-open');
      if (appSidebarEl) appSidebarEl.classList.remove('is-open');
      if (sidebarBackdropEl) sidebarBackdropEl.classList.remove('is-active');
      return;
    }

    // / 或 Ctrl+K 開啟全域搜尋
    if ((e.key === '/' && !isInputActive) || (e.key === 'k' && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      searchModalEl.classList.add('is-open');
      if (searchInputEl) {
        searchInputEl.value = '';
        searchInputEl.focus();
        runSearch('');
      }
      return;
    }

    if (isInputActive) return;

    // [ 前往上一章
    if (e.key === '[') {
      const idx = CHAPTERS_DATA.findIndex(c => c.id === currentChapterId);
      if (idx > 0) loadChapter(CHAPTERS_DATA[idx - 1].id);
      return;
    }

    // ] 前往下一章
    if (e.key === ']') {
      const idx = CHAPTERS_DATA.findIndex(c => c.id === currentChapterId);
      if (idx < CHAPTERS_DATA.length - 1) loadChapter(CHAPTERS_DATA[idx + 1].id);
      return;
    }

    // M 開啟製程全景圖
    if (e.key === 'm' || e.key === 'M') {
      atlasModalEl.classList.add('is-open');
      renderAtlasModal();
      return;
    }

    // J 開啟行話字典
    if (e.key === 'j' || e.key === 'J') {
      jargonModalEl.classList.add('is-open');
      renderJargonModal('', activeJargonTab);
      return;
    }

    // B 收藏當前章節
    if (e.key === 'b' || e.key === 'B') {
      toggleBookmark(currentChapterId);
      return;
    }

    // ? 開啟快捷鍵指南
    if (e.key === '?') {
      shortcutsModalEl.classList.add('is-open');
      return;
    }

    // + / - 字級縮放
    if (e.key === '=' || e.key === '+') {
      applyFontSize(currentFontSize + 1);
      return;
    }
    if (e.key === '-' || e.key === '_') {
      applyFontSize(currentFontSize - 1);
      return;
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
