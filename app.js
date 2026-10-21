/**
 * app.js
 * Semiconductor Knowledge Hub — 主控制器 (中英雙語深度優化旗艦版)
 * 支援純前端單頁式極速閱讀、中英雙語無縫切換、路由切換、全文搜尋、術語字典、
 * 製程圖譜、手機端抽屜導覽、字級縮放、學習進度追蹤、書籤收藏、Mermaid 向量渲染、
 * 代碼一鍵複製與全套鍵盤極速導航。
 */

import { CHAPTERS_DATA } from './data/chapters-data.js';
import { FAB_FLOW_NODES } from './data/fab-flow.js';
import { GLOSSARY_DATA, JARGON_DATA } from './data/glossary-data.js';
import { SEARCH_INDEX } from './data/search-index.js';
import { renderExplorer } from './情境探索.js';
import { connectionOrigin, originQuery } from './延伸探索.js';
import { scenarioForChapter, chapterReturnContext } from './data/情境路徑.js';
import { normalizeChapterHref } from './章節連結.js';
import { mountEngineeringObject } from './工程物件.js';
import { REAL_PHOTOS_DATA } from './data/real-photos.js';
import { playSound, toggleSound, isSoundEnabled } from './data/sound-fx.js';

(() => {
  'use strict';

  // 語言偏好字典
  const I18N = {
    zh: {
      brand_subtitle: '半導體製造概論 · 25 章完整工程知識庫',
      nav_explore: '情境探索',
      nav_atlas: '製程全景圖',
      nav_jargon: '行話與術語字典',
      nav_search: '檢索',
      sidebar_explore: '◎ 情境探索與流程圖 →',
      study_progress: '學習進度',
      study_progress_format: (core, total, pct) => `${core} / ${total} 章 (${pct}%)`,
      tab_all: '全部',
      tab_read: '已讀',
      tab_starred: '⭐ 收藏',
      filter_placeholder: '過濾章節名稱...',
      loading_text: '正在載入半導體製造核心教材...',
      reading_font_size: '閱讀字級',
      toc_heading: '本頁段落大綱',
      toc_empty: '本章無次級標題',
      chapter_num_prefix: num => `CH ${num < 10 ? '0' + num : num}`,
      appendix_prefix: '附錄',
      bookmark_btn_saved: '⭐ 已收藏',
      bookmark_btn_unsaved: '☆ 收藏此章',
      copy_link_btn: '複製章節連結',
      copy_link_copied: '已複製連結！',
      prev_chapter: '← 上一章',
      next_chapter: '下一章 →',
      wafer_track_title: '📍 晶圓位置旅程',
      wafer_track_badge: 'WAFER TRACK',
      explore_scenario_return: title => `返回剛才的步驟：${title}`,
      explore_scenario_intro: title => `用流程圖理解：${title}`,
      explore_continue: '繼續探索 ↗',
      explore_open: '開啟互動情境 ↗',
      no_matching_chapters: '查無相符章節',
      footer_attribution: `本專案基於開源教材 <a href="https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction" target="_blank" rel="noopener">chenwei810/Semiconductor_Manufacturing_Introduction</a> （採 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hant" target="_blank" rel="noopener">CC BY-NC-SA 4.0 創用 CC 姓名標示-非商業性-相同方式分享</a> 授權）重製與架構升級。`,
      footer_desc: '涵蓋 25 章從沙子到晶片的完整晶圓製造旅程 · 28 大模組實體電顯與機台照片並列對照 · 245 筆核心術語與現場實務行話 · 中英雙語無縫支援 · 純前端極速架構 · 零中系依賴 · 版本 2.4.0',
      atlas_title: '晶圓廠 12 大核心製程全景圖譜 (Fab Flow Atlas)',
      btn_close: '關閉 (Esc)',
      jargon_title: '晶圓廠現場行話與術語字典',
      jargon_subtitle: '收錄 245 筆核心術語與 43 筆現場口語行話',
      jargon_placeholder: '輸入名詞、縮寫、行話或定義（例如: Q-Time, CMP, Hot Lot, 浸潤式）...',
      jargon_tab_all: '全部收錄',
      jargon_tab_glossary: '術語總表 (附錄 A)',
      jargon_tab_jargon: '現場行話 (附錄 B)',
      jargon_tab_wafer: '晶圓與批次',
      jargon_tab_tool: '機台操作',
      jargon_tab_system: '系統與流程',
      jargon_tab_quality: '品質與異常',
      search_modal_title: '全域教材檢索',
      search_placeholder: '搜尋 25 章內容、技術主題或製程步驟...',
      search_empty_hint: '輸入關鍵字搜尋 25 章內容、術語與行話...',
      search_not_found: kw => `找不到包含「${kw}」的章節或內容`,
      shortcuts_modal_title: '鍵盤極速導航指南',
      sc_prev_chapter: '前往上一章 (Previous Chapter)',
      sc_next_chapter: '前往下一章 (Next Chapter)',
      sc_search: '全域全文搜尋 (Global Search)',
      sc_atlas: '開啟 12 大製程全景圖譜 (Fab Flow Atlas)',
      sc_jargon: '開啟現場行話與術語字典 (Jargon & Glossary)',
      sc_bookmark: '收藏 / 取消收藏目前章節 (Bookmark Toggle)',
      sc_font: '放大 / 縮小閱讀字級 (Font Scaling)',
      sc_help: '開啟此快捷鍵清單 (Shortcuts Help)',
      sc_close: '關閉任何目前彈窗 (Close Modal)',
      btn_copy_code: '複製',
      btn_copied_code: '已複製！',
      tool_label: '關鍵機台：',
      module_label: '所屬站點：',
      law_label: '統御方程：',
      ocap_label: '異常防呆：',
      lang_btn_zh_title: '切換為繁體中文',
      lang_btn_en_title: 'Switch to English',
      theme_light_title: '亮色微暖工程模式 (Light Mode)',
      theme_dark_title: '暗色極致對比模式 (Dark Mode)',
      theme_amber_title: '無塵室 500nm 黃光微影濾光模式 (Litho Amber Mode)',
      sound_btn_title: '切換無塵室互動音效 (開/關)',
      oht_sim_btn: '啟動天車調度模擬',
      oht_sim_pause: '暫停天車調度模擬',
      qtime_btn: 'Q-Time 時效矩陣',
      btn_menu_aria: '切換章節目錄',
      btn_menu_title: '展開章節目錄',
      btn_atlas_title: '開啟 12 大製程全景流程圖 (快捷鍵: M)',
      btn_jargon_title: '查詢 245 筆名詞與 43 筆晶圓廠現場行話 (快捷鍵: J)',
      btn_search_title: '全域即時檢索 (快捷鍵: / 或 Ctrl+K)',
      btn_shortcuts_title: '查看鍵盤快捷鍵指南 (快捷鍵: ?)',
      btn_font_dec_title: '縮小閱讀字體',
      btn_font_reset_title: '預設閱讀字體 (16.5px)',
      btn_font_inc_title: '放大閱讀字體',
      btn_back_to_top_aria: '回到頂部',
      btn_back_to_top_title: '回到頂部',
      sidebar_nav_aria: '章節樹狀導覽',
      app_toc_aria: '本頁大綱',
      or_word: '或',
      indicator_starred: '已收藏',
      indicator_completed: '已讀完'
    },
    en: {
      brand_subtitle: 'Semiconductor Manufacturing · 25-Chapter Engineering Hub',
      nav_explore: 'Scenario Map',
      nav_atlas: 'Fab Flow Atlas',
      nav_jargon: 'Jargon & Glossary',
      nav_search: 'Search',
      sidebar_explore: '◎ Scenario Maps & Flowcharts →',
      study_progress: 'Learning Progress',
      study_progress_format: (core, total, pct) => `${core} / ${total} Chapters (${pct}%)`,
      tab_all: 'All',
      tab_read: 'Read',
      tab_starred: '⭐ Starred',
      filter_placeholder: 'Filter chapter title...',
      loading_text: 'Loading semiconductor manufacturing curriculum...',
      reading_font_size: 'Font Size',
      toc_heading: 'On This Page',
      toc_empty: 'No subheadings in this chapter',
      chapter_num_prefix: num => `CH ${num < 10 ? '0' + num : num}`,
      appendix_prefix: 'App.',
      bookmark_btn_saved: '⭐ Starred',
      bookmark_btn_unsaved: '☆ Star Chapter',
      copy_link_btn: 'Copy Chapter Link',
      copy_link_copied: 'Link Copied!',
      prev_chapter: '← Previous',
      next_chapter: 'Next →',
      wafer_track_title: '📍 Where the Wafer Is',
      wafer_track_badge: 'WAFER TRACK',
      explore_scenario_return: title => `Return to step: ${title}`,
      explore_scenario_intro: title => `Understand with flowchart: ${title}`,
      explore_continue: 'Continue Exploring ↗',
      explore_open: 'Open Scenario ↗',
      no_matching_chapters: 'No matching chapters found',
      footer_attribution: `Adapted from the open-source book <a href="https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction" target="_blank" rel="noopener">chenwei810/Semiconductor_Manufacturing_Introduction</a> licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>.`,
      footer_desc: 'Comprehensive 25-chapter wafer fabrication guide from sand to chip · 28-module authentic SEM & tool photo side-by-side view · 245 core terms & 43 fab jargon · Native bilingual support · Zero Chinese-origin dependencies · v2.4.0',
      theme_light_title: 'Light Precision Mode',
      theme_dark_title: 'Dark High-Contrast Mode',
      theme_amber_title: 'Cleanroom 500nm Litho Amber Mode',
      sound_btn_title: 'Toggle Cleanroom Sound FX (On/Mute)',
      oht_sim_btn: 'Start OHT Simulation',
      oht_sim_pause: 'Pause OHT Simulation',
      qtime_btn: 'Q-Time Windows Matrix',
      atlas_title: '12 Core Fab Flow Atlas',
      btn_close: 'Close (Esc)',
      jargon_title: 'Fab Jargon & Terminology Dictionary',
      jargon_subtitle: '245 Core Glossary Terms & 43 Fab Floor Slangs',
      jargon_placeholder: 'Search term, abbreviation, jargon, or definition...',
      jargon_tab_all: 'All Entries',
      jargon_tab_glossary: 'Glossary (App. A)',
      jargon_tab_jargon: 'Fab Jargon (App. B)',
      jargon_tab_wafer: 'Wafers & Lots',
      jargon_tab_tool: 'Tools & Equip.',
      jargon_tab_system: 'Systems & Flow',
      jargon_tab_quality: 'Quality & Control',
      search_modal_title: 'Global Curriculum Search',
      search_placeholder: 'Search 25 chapters, technical terms, or process steps...',
      search_empty_hint: 'Type keywords to search across 25 chapters and terminology...',
      search_not_found: kw => `No results found for "${kw}"`,
      shortcuts_modal_title: 'Keyboard Navigation Shortcuts',
      sc_prev_chapter: 'Previous Chapter',
      sc_next_chapter: 'Next Chapter',
      sc_search: 'Global Search',
      sc_atlas: 'Open 12 Core Fab Flow Atlas',
      sc_jargon: 'Open Jargon & Terminology Dictionary',
      sc_bookmark: 'Bookmark / Unbookmark Current Chapter',
      sc_font: 'Scale Reading Font Size',
      sc_help: 'Show Shortcuts Help Modal',
      sc_close: 'Close Any Open Modal',
      btn_copy_code: 'Copy',
      btn_copied_code: 'Copied!',
      tool_label: 'Key Tools: ',
      module_label: 'Station: ',
      law_label: 'Governing Law: ',
      ocap_label: 'Failure & OCAP: ',
      lang_btn_zh_title: 'Switch to Traditional Chinese',
      lang_btn_en_title: 'Switch to English',
      btn_menu_aria: 'Toggle chapter navigation',
      btn_menu_title: 'Expand chapter navigation',
      btn_atlas_title: 'Open 12 Core Fab Flow Atlas (Shortcut: M)',
      btn_jargon_title: 'Search 245 glossary terms & 43 fab floor jargon (Shortcut: J)',
      btn_search_title: 'Global curriculum search (Shortcut: / or Ctrl+K)',
      btn_shortcuts_title: 'Keyboard shortcuts guide (Shortcut: ?)',
      btn_font_dec_title: 'Decrease reading font size',
      btn_font_reset_title: 'Reset reading font size (16.5px)',
      btn_font_inc_title: 'Increase reading font size',
      btn_back_to_top_aria: 'Back to top',
      btn_back_to_top_title: 'Back to top',
      sidebar_nav_aria: 'Chapter navigation tree',
      app_toc_aria: 'Table of contents',
      or_word: 'or',
      indicator_starred: 'Starred',
      indicator_completed: 'Completed'
    }
  };

  let currentChapterId = 'ch00';
  let activeJargonTab = 'all';
  let activeSidebarFilterMode = 'all'; // 'all' | 'read' | 'starred'

  // 本地偏好記憶
  const READ_STORAGE_KEY = 'semi_read_chapters';
  const BOOKMARK_STORAGE_KEY = 'semi_bookmarked_chapters';
  const EXPLORED_STORAGE_KEY = 'semi_explored_models';
  const FONT_STORAGE_KEY = 'semi_font_size';
  const LANG_STORAGE_KEY = 'semi_preferred_lang';
  const THEME_STORAGE_KEY = 'semi_preferred_theme';

  // 主題管理系統 (Light / Dark / 500nm Litho Amber Mode)
  let currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (_) {}
    document.querySelectorAll('.theme-btn').forEach(btn => {
      const isActive = btn.dataset.theme === theme;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.theme;
      if (t) applyTheme(t);
    });
  });
  applyTheme(currentTheme);

  // 音效切換按鈕監聽
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundToggleBtn && soundIcon) {
    soundIcon.textContent = isSoundEnabled() ? '🔊' : '🔇';
    soundToggleBtn.addEventListener('click', () => {
      const enabled = toggleSound();
      soundIcon.textContent = enabled ? '🔊' : '🔇';
      if (enabled) playSound('click');
    });
  }


  let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'zh';
  const readChapters = new Set(JSON.parse(localStorage.getItem(READ_STORAGE_KEY) || '[]'));
  const bookmarkedChapters = new Set(JSON.parse(localStorage.getItem(BOOKMARK_STORAGE_KEY) || '[]'));
  const exploredModels = new Set(JSON.parse(localStorage.getItem(EXPLORED_STORAGE_KEY) || '[]'));
  let currentFontSize = parseFloat(localStorage.getItem(FONT_STORAGE_KEY) || '16.5');

  // DOM 節點快取
  const appSidebarEl = document.getElementById('appSidebar');
  const sidebarNavEl = document.getElementById('sidebarNav');
  const sidebarBackdropEl = document.getElementById('sidebarBackdrop');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const chapterFilterEl = document.getElementById('chapterFilter');
  const mainCanvasEl = document.getElementById('mainContentArea');
  let disposeCurrentEngineeringObject = null;
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
   * 取得指定章節在當前語言下的檢視資料
   */
  function getChapterData(ch, lang = currentLang) {
    if (!ch) return null;
    if (lang === 'en') {
      return {
        ...ch,
        part: ch.partEn || ch.part,
        shortTitle: ch.shortTitleEn || ch.shortTitle,
        fullTitle: ch.fullTitleEn || ch.fullTitle,
        waferTrack: ch.waferTrackEn || ch.waferTrack,
        headings: ch.headingsEn || ch.headings,
        contentHtml: ch.contentHtmlEn || ch.contentHtml
      };
    }
    return ch;
  }

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
    const t = I18N[currentLang] || I18N.zh;

    if (studyProgressText) {
      studyProgressText.textContent = t.study_progress_format(coreCount, totalCoreChapters, pct);
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
      if (activeSidebarFilterMode === 'read') {
        renderSidebar(chapterFilterEl ? chapterFilterEl.value : '');
      } else {
        const link = sidebarNavEl?.querySelector(`.chapter-nav-link[data-ch-id="${chId}"]`);
        if (link && !link.querySelector('.read-check-indicator')) {
          const t = I18N[currentLang] || I18N.zh;
          const statusWrap = link.querySelector('span[style*="align-items: center"]');
          if (statusWrap) {
            statusWrap.insertAdjacentHTML('beforeend', `<span class="read-check-indicator" title="${t.indicator_completed}">✓</span>`);
          }
        }
      }
    }
  }

  /**
   * 輕量更新側邊欄章節啟用狀態，避免每次切換章節都全量重建 DOM
   */
  function updateSidebarActive(chId) {
    if (!sidebarNavEl) return;
    sidebarNavEl.querySelectorAll('.chapter-nav-link').forEach(link => {
      const match = link.getAttribute('data-ch-id') === chId;
      link.classList.toggle('is-active', match);
      if (match) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }

      const targetId = link.getAttribute('data-ch-id');
      const badgeWrap = link.querySelector('.ch-status-indicators');
      if (badgeWrap && exploredModels.has(targetId) && !badgeWrap.querySelector('.explored-model-badge')) {
        const badge = document.createElement('span');
        badge.className = 'explored-model-badge';
        badge.title = currentLang === 'en' ? 'Interactive physical model explored' : '已完成微觀物理模型互動探索';
        badge.textContent = '⚡';
        badgeWrap.prepend(badge);
      }
    });
  }

  /**
   * 標記章節工程物件模型為已探索
   */
  function markModelExplored(chId) {
    if (!chId || exploredModels.has(chId)) return;
    exploredModels.add(chId);
    try {
      localStorage.setItem(EXPLORED_STORAGE_KEY, JSON.stringify([...exploredModels]));
    } catch (_) {}
    if (sidebarNavEl) {
      sidebarNavEl.querySelectorAll(`.chapter-nav-link[data-ch-id="${chId}"] .ch-status-indicators`).forEach(wrap => {
        if (!wrap.querySelector('.explored-model-badge')) {
          const badge = document.createElement('span');
          badge.className = 'explored-model-badge';
          badge.title = currentLang === 'en' ? 'Interactive physical model explored' : '已完成微觀物理模型互動探索';
          badge.textContent = '⚡';
          wrap.prepend(badge);
        }
      });
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
    const t = I18N[currentLang] || I18N.zh;
    if (isBookmarked) {
      btn.classList.add('is-bookmarked');
      btn.innerHTML = t.bookmark_btn_saved;
    } else {
      btn.classList.remove('is-bookmarked');
      btn.innerHTML = t.bookmark_btn_unsaved;
    }
  }

  /**
   * 1. 初始化側邊欄目錄樹
   */
  function renderSidebar(filterText = '') {
    if (!sidebarNavEl) return;
    const partsMap = new Map();
    const t = I18N[currentLang] || I18N.zh;

    CHAPTERS_DATA.forEach(rawCh => {
      const ch = getChapterData(rawCh, currentLang);
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
          <div class="part-title">${escapeHtml(partName)}</div>
          <ul class="chapter-nav-list">
      `;
      chapters.forEach(ch => {
        const isActive = ch.id === currentChapterId;
        const isRead = readChapters.has(ch.id);
        const isStarred = bookmarkedChapters.has(ch.id);
        const isExplored = exploredModels.has(ch.id);
        const numStr = ch.num < 10 ? `0${ch.num}` : `${ch.num}`;
        const prefix = ch.id.startsWith('app') ? t.appendix_prefix : `CH ${numStr}`;
        html += `
          <li class="chapter-nav-item">
            <a href="#${ch.id}" class="chapter-nav-link ${isActive ? 'is-active' : ''}" data-ch-id="${ch.id}">
              <span class="ch-title-wrap">
                <span class="ch-number">${prefix}</span>
                <span>${escapeHtml(ch.shortTitle)}</span>
              </span>
              <span class="ch-status-indicators" style="display: flex; align-items: center; gap: 3px;">
                ${isExplored ? `<span class="explored-model-badge" title="${currentLang === 'en' ? 'Interactive physical model explored' : '已完成微觀物理模型互動探索'}">⚡</span>` : ''}
                ${isStarred ? `<span class="star-indicator" title="${t.indicator_starred}">★</span>` : ''}
                ${isRead ? `<span class="read-check-indicator" title="${t.indicator_completed}">✓</span>` : ''}
              </span>
            </a>
          </li>
        `;
      });
      html += `</ul></div>`;
    }

    if (partsMap.size === 0) {
      html = `<div style="padding: 16px; font-size: 13px; color: var(--text-muted); text-align: center;">${t.no_matching_chapters}</div>`;
    }

    sidebarNavEl.innerHTML = html;
  }

  /**
   * 2. 載入並渲染指定章節
   */
  function loadChapter(chId, from = null, via = null) {
    disposeCurrentEngineeringObject?.();
    disposeCurrentEngineeringObject = null;
    document.body.classList.remove('is-exploring');
    const rawChapter = CHAPTERS_DATA.find(c => c.id === chId) || CHAPTERS_DATA[0];
    const chapter = getChapterData(rawChapter, currentLang);
    currentChapterId = chapter.id;

    const t = I18N[currentLang] || I18N.zh;

    // 標記已讀
    markChapterRead(chapter.id);

    // 更新網址 Hash (若不同)
    const returnContext = chapterReturnContext(chapter.id, from);
    const origin = returnContext ? connectionOrigin(returnContext.scenario.id, via) : null;
    const chapterHash = `#${chapter.id}${returnContext ? `?from=${encodeURIComponent(returnContext.value)}${origin ? `&via=${encodeURIComponent(origin.value)}` : ''}` : ''}`;
    if (window.location.hash !== chapterHash) {
      history.replaceState(null, '', chapterHash);
    }

    // 計算上一章與下一章
    const currentIndex = CHAPTERS_DATA.findIndex(c => c.id === chapter.id);
    const rawPrev = currentIndex > 0 ? CHAPTERS_DATA[currentIndex - 1] : null;
    const rawNext = currentIndex < CHAPTERS_DATA.length - 1 ? CHAPTERS_DATA[currentIndex + 1] : null;
    const prevChapter = getChapterData(rawPrev, currentLang);
    const nextChapter = getChapterData(rawNext, currentLang);

    // 渲染主閱讀區
    let trackHtml = '';
    if (chapter.waferTrack) {
      trackHtml = `
        <div class="wafer-track-banner">
          <div class="track-info">
            <span class="track-kicker">${t.wafer_track_title}</span>
            <span class="track-title chapter-track-parts">${chapter.waferTrack.split(/\r?\n/).map(line => `<span>${escapeHtml(line.replace(/^-\s*/, '').replace(/\*\*/g, ''))}</span>`).join('')}</span>
          </div>
          <span class="track-badge">${t.wafer_track_badge}</span>
        </div>
      `;
    }

    let paginationHtml = `
      <div class="chapter-pagination">
        ${prevChapter ? `
          <a href="#${prevChapter.id}" class="page-nav-card" data-nav-target="${prevChapter.id}">
            <span class="nav-direction">${t.prev_chapter}</span>
            <span class="nav-title">${escapeHtml(prevChapter.shortTitle)}</span>
          </a>
        ` : '<div></div>'}
        ${nextChapter ? `
          <a href="#${nextChapter.id}" class="page-nav-card" style="text-align: right;" data-nav-target="${nextChapter.id}">
            <span class="nav-direction">${t.next_chapter}</span>
            <span class="nav-title">${escapeHtml(nextChapter.shortTitle)}</span>
          </a>
        ` : '<div></div>'}
      </div>
    `;

    const isBookmarked = bookmarkedChapters.has(chapter.id);
    const relatedScenario = scenarioForChapter(chapter.id);
    const isEn = currentLang === 'en';
    const returnNodeTitle = returnContext ? (isEn ? (returnContext.node.titleEn || returnContext.node.title) : returnContext.node.title) : '';
    const scenarioTitle = relatedScenario ? (isEn ? (relatedScenario.titleEn || relatedScenario.title) : relatedScenario.title) : '';

    mainCanvasEl.innerHTML = `
      <a href="#explore/${returnContext ? returnContext.value : relatedScenario.id}${originQuery(origin)}" class="chapter-scenario-link">
        <span>${returnContext ? t.explore_scenario_return(escapeHtml(returnNodeTitle)) : t.explore_scenario_intro(escapeHtml(scenarioTitle))}</span>
        <span>${returnContext ? t.explore_continue : t.explore_open}</span>
      </a>
      ${trackHtml}
      <header class="article-header">
        <div class="article-top-bar">
          <span class="article-part-label">${chapter.part}</span>
          <div class="article-action-cluster">
            <button type="button" class="article-action-btn ${isBookmarked ? 'is-bookmarked' : ''}" id="toggleBookmarkBtn" title="${isBookmarked ? t.bookmark_btn_saved : t.bookmark_btn_unsaved} (快捷鍵: B)">
              ${isBookmarked ? t.bookmark_btn_saved : t.bookmark_btn_unsaved}
            </button>
            <button type="button" class="article-action-btn" id="copyLinkBtn" title="${t.copy_link_btn}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              <span>${t.copy_link_btn}</span>
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

    // 移除重複標題並正規化連結
    const duplicateHeading = mainCanvasEl.querySelector('.article-body > h1');
    if (duplicateHeading) {
      const title = duplicateHeading.cloneNode(true);
      title.querySelectorAll('.anchor-link').forEach(a => a.remove());
      if (title.textContent.trim() === chapter.fullTitle.trim()) {
        mainCanvasEl.querySelector('.article-headline').id = duplicateHeading.id;
        duplicateHeading.remove();
      }
    }
    mainCanvasEl.querySelectorAll('.article-body a[href]').forEach(link => {
      link.setAttribute('href', normalizeChapterHref(link.getAttribute('href')));
    });

    // 輕量更新側邊欄高亮，避免重複重建整個目錄 DOM
    updateSidebarActive(chapter.id);

    // 渲染段落 TOC
    renderToc(chapter.headings);

    // 渲染 Mermaid 圖表與代碼複製鈕
    renderMermaidDiagrams();
    attachCodeCopyButtons();

    // 掛載全站專屬精細互動工程物件模型 (覆蓋全站 25 正式章 + 3 附錄 = 28 全模組 100% 滿貫)
    attachEngineeringObjectModel(chapter.id, currentLang);

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
    const t = I18N[currentLang] || I18N.zh;
    if (!headings || headings.length === 0) {
      tocListEl.innerHTML = `<li class="toc-item"><span style="font-size: 12px; color: var(--text-muted);">${t.toc_empty}</span></li>`;
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

    let activeId = '';
    const scrollPos = window.scrollY + 100;

    for (let i = 0; i < headingEls.length; i++) {
      const top = headingEls[i].offsetTop;
      if (top <= scrollPos) {
        activeId = headingEls[i].id;
      } else {
        break;
      }
    }

    if (activeId) {
      document.querySelectorAll('.toc-link').forEach(link => {
        if (link.getAttribute('data-toc-target') === activeId) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }
  }, { passive: true });

  /**
   * 5. 渲染製程全景圖譜 (Atlas 2.0 Modal) — 動態晶圓剖面流與深度模型直達
   */
  function renderAtlasModal() {

  const QTIME_MAP = {
    'step-02': { zh: '⏱️ Q-Time ≤ 4h: 進入微影 (防原生氧化層生長)', en: '⏱️ Q-Time ≤ 4h: Transfer to Litho (Native oxide control)' },
    'step-03': { zh: '⏱️ Q-Time ≤ 8h: 進入非等向蝕刻 (防光阻 T-Topping 酸氣中毒)', en: '⏱️ Q-Time ≤ 8h: Transfer to Etch (Resist T-topping prevention)' },
    'step-04': { zh: '⏱️ Q-Time ≤ 2h: 進入濕式清洗 (防含氯高分子殘留腐蝕)', en: '⏱️ Q-Time ≤ 2h: Transfer to Clean (Polymer residue corrosion prevention)' },
    'step-06': { zh: '⏱️ Q-Time ≤ 4h: 進入薄膜沉積 (防界面金屬有機污染)', en: '⏱️ Q-Time ≤ 4h: Transfer to Deposition (Airborne amine prevention)' },
    'step-09': { zh: '⏱️ Q-Time ≤ 6h: 進入化學機械研磨 (防止電鍍銅晶粒非均勻自退火)', en: '⏱️ Q-Time ≤ 6h: Transfer to CMP (Copper grain self-annealing limit)' }
  };
  let ohtSimTimer = null;
  let ohtSimCurrentStep = 1;
  let showQTimeOverlay = false;

    if (!atlasGridEl) return;
    const isEn = currentLang === 'en';
    const t = I18N[currentLang] || I18N.zh;
    const waferSvgEl = document.getElementById('atlasWaferSvg');
    const badgeEl = document.getElementById('atlasStreamStepBadge');
    const titleEl = document.getElementById('atlasStreamTitleText');

    if (titleEl) {
      titleEl.textContent = isEn
        ? 'Wafer Multi-Layer Cross-Section Evolution Stream'
        : '晶圓多層微觀橫截面動態演變流 (Wafer Cross-Section Evolution)';
    }
    if (badgeEl) {
      badgeEl.textContent = isEn
        ? 'Hover or focus cards to preview cross-section evolution'
        : '滑鼠懸停卡片即時預覽剖面演變';
    }

    function renderAtlasWaferCrossSection(stepNum = 1) {
      if (!waferSvgEl) return;
      const progress = Math.max(1, Math.min(12, stepNum));

      let layersHtml = `
        <defs>
          <linearGradient id="atlasSiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
          <linearGradient id="atlasOxideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.85"/>
            <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0.85"/>
          </linearGradient>
          <linearGradient id="atlasPrGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fbbf24"/>
            <stop offset="100%" stop-color="#d97706"/>
          </linearGradient>
          <linearGradient id="atlasDopantGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#34d399" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#059669" stop-opacity="0.35"/>
          </linearGradient>
          <linearGradient id="atlasCuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fcd34d"/>
            <stop offset="50%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
          <radialGradient id="atlasBumpGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="55%" stop-color="#cbd5e1"/>
            <stop offset="100%" stop-color="#64748b"/>
          </radialGradient>
          <filter id="atlasGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      `;

      // Step 1: 單晶矽基底與晶格紋理
      layersHtml += `
        <rect x="60" y="70" width="880" height="38" rx="4" fill="url(#atlasSiGrad)" stroke="#475569" stroke-width="1.5"/>
        <line x1="80" y1="90" x2="920" y2="90" stroke="#334155" stroke-width="0.75" stroke-dasharray="6 6" opacity="0.5"/>
        <text x="500" y="101" text-anchor="middle" fill="#cbd5e1" font-size="10.5" font-weight="600" font-family="sans-serif">${isEn ? 'Single-Crystal Si Substrate (300mm <100>)' : '單晶矽基底 (Si Substrate)'}</text>
      `;

      if (progress >= 2) {
        // Step 2: 熱氧化層 (SiO2)
        layersHtml += `<rect x="60" y="62" width="880" height="8" rx="1" fill="url(#atlasOxideGrad)"/>`;
      }
      if (progress >= 3) {
        // Step 3: 微影光阻層與曝光開窗
        layersHtml += `
          <rect x="60" y="46" width="380" height="16" rx="2" fill="url(#atlasPrGrad)" opacity="0.9"/>
          <rect x="560" y="46" width="380" height="16" rx="2" fill="url(#atlasPrGrad)" opacity="0.9"/>
        `;
        if (progress < 9) {
          layersHtml += `<text x="500" y="57" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700" filter="url(#atlasGlow)">${isEn ? 'Litho Opening (CD)' : '微影開窗 (Litho Opening)'}</text>`;
        }
        if (progress === 3) {
          layersHtml += `
            <rect x="442" y="4" width="116" height="58" fill="#38bdf8" opacity="0.14"/>
            <line x1="465" y1="4" x2="465" y2="62" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 3" class="anim-beam"/>
            <line x1="500" y1="4" x2="500" y2="62" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 3" class="anim-beam"/>
            <line x1="535" y1="4" x2="535" y2="62" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 3" class="anim-beam"/>
          `;
        }
      }
      if (progress >= 4) {
        // Step 4: 非等向性蝕刻深槽
        layersHtml += `<rect x="440" y="62" width="120" height="24" rx="1" fill="#090e17" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3 2"/>`;
        if (progress === 4) {
          layersHtml += `
            <line x1="475" y1="12" x2="475" y2="84" stroke="#a855f7" stroke-width="1.8" stroke-dasharray="3 4" class="anim-ion"/>
            <line x1="525" y1="12" x2="525" y2="84" stroke="#a855f7" stroke-width="1.8" stroke-dasharray="3 4" class="anim-ion"/>
          `;
        }
      }
      if (progress >= 5) {
        // Step 5: 離子摻雜區 (Source / Drain)
        layersHtml += `
          <rect x="355" y="70" width="80" height="16" rx="3" fill="url(#atlasDopantGrad)" stroke="#10b981" stroke-width="0.8"/>
          <rect x="565" y="70" width="80" height="16" rx="3" fill="url(#atlasDopantGrad)" stroke="#10b981" stroke-width="0.8"/>
          <text x="395" y="81" text-anchor="middle" fill="#ecfdf5" font-size="8.5" font-weight="700">S (N+)</text>
          <text x="605" y="81" text-anchor="middle" fill="#ecfdf5" font-size="8.5" font-weight="700">D (N+)</text>
        `;
        if (progress === 5) {
          layersHtml += `
            <line x1="395" y1="8" x2="395" y2="70" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3" class="anim-ion"/>
            <line x1="605" y1="8" x2="605" y2="70" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3" class="anim-ion"/>
          `;
        }
      }
      if (progress >= 6) {
        // Step 6: ALD 高介電常數層與金屬閘極 (HKMG)
        layersHtml += `
          <rect x="442" y="68" width="116" height="18" rx="1.5" fill="url(#atlasCuGrad)" stroke="#fde68a" stroke-width="1"/>
          <text x="500" y="80" text-anchor="middle" fill="#090e17" font-size="8.5" font-weight="800">HKMG</text>
        `;
      }
      if (progress >= 7) {
        // Step 7: CMP 化學機械平坦化全局基準面
        layersHtml += `<line x1="60" y1="46" x2="940" y2="46" stroke="#10b981" stroke-width="2.2" filter="url(#atlasGlow)"/>`;
        if (progress === 7) {
          layersHtml += `<rect x="320" y="36" width="360" height="8" rx="4" fill="#10b981" opacity="0.45" class="anim-wave"/>`;
        }
      }
      if (progress >= 8) {
        // Step 8: 濕式清洗與表面超純水兆聲波淨化 (RCA Clean & Contamination Control)
        layersHtml += `<line x1="60" y1="44" x2="940" y2="44" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="8 4" opacity="0.8"/>`;
        if (progress === 8) {
          layersHtml += `
            <path d="M 180,32 Q 340,24 500,32 T 820,32" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 4" class="anim-data-flow"/>
            <circle cx="310" cy="26" r="3" fill="#38bdf8" class="anim-pulse"/>
            <circle cx="690" cy="26" r="3" fill="#38bdf8" class="anim-pulse"/>
          `;
        }
      }
      if (progress >= 9) {
        // Step 9: 多層銅金屬化雙鑲嵌導線 (M1, Via) 與電流路徑
        layersHtml += `
          <rect x="200" y="22" width="60" height="24" rx="2" fill="url(#atlasCuGrad)" stroke="#fde68a" stroke-width="0.8"/>
          <rect x="470" y="22" width="60" height="24" rx="2" fill="url(#atlasCuGrad)" stroke="#fde68a" stroke-width="0.8"/>
          <rect x="740" y="22" width="60" height="24" rx="2" fill="url(#atlasCuGrad)" stroke="#fde68a" stroke-width="0.8"/>
          <rect x="495" y="46" width="10" height="22" fill="url(#atlasCuGrad)"/>
          <text x="510" y="59" text-anchor="start" fill="#fcd34d" font-size="9" font-weight="700">Via</text>
          <line x1="230" y1="34" x2="770" y2="34" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6 4" class="anim-data-flow" opacity="0.75"/>
        `;
      }
      if (progress >= 10) {
        // Step 10: 先進製程整合 (FinFET / GAA 奈米片堆疊通道)
        layersHtml += `
          <line x1="448" y1="71" x2="478" y2="71" stroke="#38bdf8" stroke-width="2"/>
          <line x1="522" y1="71" x2="552" y2="71" stroke="#38bdf8" stroke-width="2"/>
          <line x1="448" y1="83" x2="478" y2="83" stroke="#38bdf8" stroke-width="2"/>
          <line x1="522" y1="83" x2="552" y2="83" stroke="#38bdf8" stroke-width="2"/>
        `;
      }
      if (progress >= 11) {
        // Step 11: 量測檢測與良率控制 (CD-SEM / AOI 掃描光錐)
        layersHtml += `
          <polygon points="500,2 482,22 518,22" fill="#38bdf8" opacity="0.22"/>
          <line x1="500" y1="0" x2="500" y2="22" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="3 2" class="anim-beam"/>
        `;
      }
      if (progress >= 12) {
        // Step 12: 晶圓針測 CP 探針、切割道與先進封裝微凸塊 (CoWoS/SoIC)
        layersHtml += `
          <path d="M 218,4 L 230,22 L 236,4" fill="none" stroke="#10b981" stroke-width="1.8"/>
          <path d="M 488,4 L 500,22 L 506,4" fill="none" stroke="#10b981" stroke-width="1.8"/>
          <line x1="330" y1="8" x2="330" y2="108" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="4 2" class="anim-beam"/>
          <line x1="670" y1="8" x2="670" y2="108" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="4 2" class="anim-beam"/>
          <circle cx="230" cy="14" r="8" fill="url(#atlasBumpGrad)" stroke="#38bdf8" stroke-width="1.8" filter="url(#atlasGlow)"/>
          <circle cx="500" cy="14" r="8" fill="url(#atlasBumpGrad)" stroke="#38bdf8" stroke-width="1.8" filter="url(#atlasGlow)"/>
          <circle cx="770" cy="14" r="8" fill="url(#atlasBumpGrad)" stroke="#38bdf8" stroke-width="1.8" filter="url(#atlasGlow)"/>
          <line x1="230" y1="14" x2="770" y2="14" stroke="#38bdf8" stroke-width="2" stroke-dasharray="5 3" class="anim-data-flow"/>
        `;
      }

      waferSvgEl.innerHTML = layersHtml;
    }

    renderAtlasWaferCrossSection(1);

    let html = '';
    FAB_FLOW_NODES.forEach(node => {
      const name = isEn ? (node.nameEn || node.nameZh) : node.nameZh;
      const chTitle = isEn ? (node.chapterTitleEn || node.chapterTitleZh || node.chapterTitle) : (node.chapterTitleZh || node.chapterTitle);
      const summary = isEn ? (node.summaryEn || node.summaryZh || node.summary) : (node.summaryZh || node.summary);
      const keyTool = isEn ? (node.keyToolEn || node.keyToolZh || node.keyTool) : (node.keyToolZh || node.keyTool);
      const govLaw = isEn ? (node.governingLawEn || node.governingLawZh || '') : (node.governingLawZh || '');
      const ocapSig = isEn ? (node.ocapSignatureEn || node.ocapSignatureZh || '') : (node.ocapSignatureZh || '');
      const activeClass = parseInt(node.num, 10) === 1 ? ' is-active-step' : '';

      html += `
        <button type="button" class="atlas-card${activeClass}" data-jump-ch="${node.chapterId}" data-step-num="${node.num}">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="atlas-step-num">STEP ${node.num}</span>
              <span class="track-badge" style="font-size: 10px;">${node.badge}</span>
            </div>
            <h3 class="atlas-card-title">${escapeHtml(name)}</h3>
            <p class="atlas-card-desc">${escapeHtml(summary)}</p>
          </div>
          <div>
            <div class="atlas-card-meta">
              <div><strong>${t.tool_label}</strong>${escapeHtml(keyTool)}</div>
              <div><strong>${t.module_label}</strong>${escapeHtml(chTitle)}</div>
              ${govLaw ? `<div style="color: #0284c7;"><strong>${t.law_label}</strong>${escapeHtml(govLaw)}</div>` : ''}
              ${ocapSig ? `<div style="color: #b45309;"><strong>${t.ocap_label}</strong>${escapeHtml(ocapSig)}</div>` : ''}
            </div>
            <div class="atlas-jump-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <span>${isEn ? 'Explore Microscopic Model →' : '探索微觀工程模型 →'}</span>
            </div>
          </div>
        </button>
      `;
    });
    atlasGridEl.innerHTML = html;

    // 綁定天車自動調度模擬 (AMHS Simulation) 與 Q-Time 矩陣
    const startOhtSimBtn = document.getElementById('startOhtSimBtn');
    const toggleQtimeBtn = document.getElementById('toggleQtimeBtn');
    const ohtTelemetryBadge = document.getElementById('ohtTelemetryBadge');
    const ohtTelemetryMsg = document.getElementById('ohtTelemetryMsg');
    const ohtSimBtnText = document.getElementById('ohtSimBtnText');
    const qtimeBtnText = document.getElementById('qtimeBtnText');

    if (toggleQtimeBtn) {
      toggleQtimeBtn.onclick = (e) => {
        e.stopPropagation();
        showQTimeOverlay = !showQTimeOverlay;
        atlasGridEl.classList.toggle('show-qtime', showQTimeOverlay);
        toggleQtimeBtn.classList.toggle('is-active', showQTimeOverlay);
      };
    }

    function stepOhtSim() {
      ohtSimCurrentStep = (ohtSimCurrentStep % 12) + 1;
      const targetNode = FAB_FLOW_NODES.find(n => parseInt(n.num, 10) === ohtSimCurrentStep);
      renderAtlasWaferCrossSection(ohtSimCurrentStep);
      const cards = atlasGridEl.querySelectorAll('.atlas-card');
      cards.forEach(c => {
        const s = parseInt(c.getAttribute('data-step-num'), 10);
        c.classList.toggle('is-oht-focus', s === ohtSimCurrentStep);
        c.classList.toggle('is-active-step', s === ohtSimCurrentStep);
      });
      if (ohtTelemetryBadge && ohtTelemetryMsg && targetNode) {
        ohtTelemetryBadge.className = 'atlas-telemetry-badge is-transit';
        ohtTelemetryBadge.textContent = isEn ? `AMHS Transit -> STEP ${targetNode.num}` : `天車調度中 -> STEP ${targetNode.num}`;
        ohtTelemetryMsg.textContent = isEn
          ? `FOUP #402 [Priority: Hot Lot] delivered to ${targetNode.keyToolEn || targetNode.keyTool}`
          : `FOUP #402 [急件 Hot Lot] 正在搬送至機台：${targetNode.keyToolZh || targetNode.keyTool}`;
      }
    }

    if (startOhtSimBtn) {
      startOhtSimBtn.onclick = (e) => {
        e.stopPropagation();
        if (ohtSimTimer) {
          clearInterval(ohtSimTimer);
          ohtSimTimer = null;
          startOhtSimBtn.classList.remove('is-active');
          if (ohtSimBtnText) ohtSimBtnText.textContent = isEn ? t.oht_sim_btn : '啟動天車調度模擬';
          if (ohtTelemetryBadge) {
            ohtTelemetryBadge.className = 'atlas-telemetry-badge';
            ohtTelemetryBadge.textContent = isEn ? 'AMHS Standby' : '天車待命 (Standby)';
          }
        } else {
          stepOhtSim();
          ohtSimTimer = setInterval(stepOhtSim, 1800);
          startOhtSimBtn.classList.add('is-active');
          playSound('launch');
          if (ohtSimBtnText) ohtSimBtnText.textContent = isEn ? t.oht_sim_pause : '暫停天車調度模擬';
        }
      };
    }


    // 綁定 Hover / Focus 晶圓剖面演變與點擊直達
    const allCards = atlasGridEl.querySelectorAll('.atlas-card');
    allCards.forEach(card => {
      const stepNum = parseInt(card.getAttribute('data-step-num'), 10);
      const chId = card.getAttribute('data-jump-ch');
      const node = FAB_FLOW_NODES.find(n => parseInt(n.num, 10) === stepNum);

      const activateStepPreview = () => {
        allCards.forEach(c => c.classList.remove('is-active-step'));
        card.classList.add('is-active-step');
        renderAtlasWaferCrossSection(stepNum);
        if (badgeEl && node) {
          badgeEl.textContent = `STEP ${node.num} · ${isEn ? (node.nameEn || node.nameZh) : node.nameZh}`;
        }
      };

      card.addEventListener('mouseenter', activateStepPreview);
      card.addEventListener('focus', activateStepPreview);

      card.addEventListener('click', () => {
        if (atlasModalEl) atlasModalEl.classList.remove('is-open');
        window.location.hash = chId;
        setTimeout(() => {
          const mountEl = mainCanvasEl.querySelector('.engineering-object-mount');
          if (mountEl) {
            mountEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            mountEl.classList.add('flash-highlight');
            setTimeout(() => mountEl.classList.remove('flash-highlight'), 2000);
          }
        }, 150);
      });
    });
  }

  /**
   * 6. 渲染現場行話與術語字典 (Jargon Modal)
   */
  
  // Web Speech API 術語與行話語音朗讀
  function speakTerm(text, lang = 'en-US', btn = null) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95;
      if (btn) {
        btn.classList.add('is-speaking');
        utterance.onend = () => btn.classList.remove('is-speaking');
        utterance.onerror = () => btn.classList.remove('is-speaking');
      }
      window.speechSynthesis.speak(utterance);
    } catch (_) {}
  }

  function renderJargonModal(query = '', tab = 'all') {
    if (!jargonListEl) return;
    const isEn = currentLang === 'en';
    const t = I18N[currentLang] || I18N.zh;
    let items = [];
    const q = (query || '').trim().toLowerCase();

    // 附錄 A 術語
    if (tab === 'all' || tab === 'glossary') {
      GLOSSARY_DATA.forEach(g => {
        const match = !q || 
          g.en.toLowerCase().includes(q) || 
          g.zh.includes(q) || 
          (g.abbr && g.abbr.toLowerCase().includes(q)) || 
          (g.descZh && g.descZh.toLowerCase().includes(q)) ||
          (g.descEn && g.descEn.toLowerCase().includes(q));

        if (match) {
          const mainTitle = isEn ? `${g.en}${g.abbr ? ' (' + g.abbr + ')' : ''}` : `${g.zh} (${g.en}${g.abbr ? ' / ' + g.abbr : ''})`;
          const subTitle = isEn ? `${g.zh}` : '';
          const desc = isEn ? (g.descEn || g.descZh) : (g.descZh || g.desc);
          const chInfo = g.chapter ? (isEn ? `Related: Chapter ${g.chapter}` : `主要出現章節：第 ${g.chapter} 章`) : '';

          items.push({
            type: 'glossary',
            term: mainTitle,
            sub: subTitle,
            meaning: desc,
            example: chInfo
          });
        }
      });
    }

    // 附錄 B 行話
    if (tab === 'all' || tab === 'jargon' || tab === 'wafer' || tab === 'tool' || tab === 'system' || tab === 'quality') {
      JARGON_DATA.forEach(j => {
        const catZh = j.categoryZh || j.category || '';
        const catEn = j.categoryEn || '';
        const catMatch = 
          tab === 'all' || 
          tab === 'jargon' || 
          (tab === 'wafer' && (catZh.includes('晶圓') || catEn.toLowerCase().includes('wafer'))) ||
          (tab === 'tool' && (catZh.includes('機台') || catEn.toLowerCase().includes('tool'))) ||
          (tab === 'system' && (catZh.includes('系統') || catEn.toLowerCase().includes('system'))) ||
          (tab === 'quality' && (catZh.includes('品質') || catEn.toLowerCase().includes('quality')));

        if (catMatch) {
          const match = !q ||
            (j.termZh && j.termZh.toLowerCase().includes(q)) ||
            (j.termEn && j.termEn.toLowerCase().includes(q)) ||
            (j.meaningZh && j.meaningZh.toLowerCase().includes(q)) ||
            (j.meaningEn && j.meaningEn.toLowerCase().includes(q)) ||
            (j.exampleZh && j.exampleZh.toLowerCase().includes(q)) ||
            (j.exampleEn && j.exampleEn.toLowerCase().includes(q));

          if (match) {
            const catDisplay = isEn ? (j.categoryEn || j.categoryZh) : (j.categoryZh || j.category);
            const mainTerm = isEn ? (j.termEn || j.termZh) : (j.termZh || j.term);
            const twFab = isEn && j.taiwanese ? ` · In Taiwan Fabs: "${j.taiwanese}"` : '';
            const meaning = isEn ? (j.meaningEn || j.meaningZh) : (j.meaningZh || j.meaning);
            const example = isEn ? (j.exampleEn || j.exampleZh) : (j.exampleZh || j.example);

            items.push({
              type: 'jargon',
              term: isEn ? `[${catDisplay}] ${mainTerm}${twFab}` : `【${catDisplay}】${mainTerm}${twFab}`,
              meaning: meaning,
              example: example ? (isEn ? `💡 Example: ${example}` : `💬 例句：${example}`) : ''
            });
          }
        }
      });
    }

    if (items.length === 0) {
      jargonListEl.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">${t.search_not_found(query)}</div>`;
      return;
    }

    let html = '';
    items.forEach(it => {
      html += `
        <div class="jargon-item-card">
          <div class="jargon-term">
            ${escapeHtml(it.term)}
            ${it.sub ? `<span style="font-size: 12px; font-weight: 500; color: var(--text-muted); margin-left: 6px;">${escapeHtml(it.sub)}</span>` : ''}
          </div>
          <div class="jargon-meaning">${escapeHtml(it.meaning)}</div>
          ${it.example ? `<div class="jargon-example">${escapeHtml(it.example)}</div>` : ''}
        </div>
      `;
    });
    jargonListEl.innerHTML = html;

    jargonListEl.querySelectorAll('.btn-jargon-speech').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.getAttribute('data-speak-text');
        const lang = btn.getAttribute('data-speak-lang') || 'en-US';
        speakTerm(text, lang, btn);
      });
    });

  }

  /**
   * 7. 全文檢索功能
   */
  function runSearch(keyword) {
    if (!searchResultsEl) return;
    const isEn = currentLang === 'en';
    const t = I18N[currentLang] || I18N.zh;

    if (!keyword || keyword.trim() === '') {
      searchResultsEl.innerHTML = `<div style="padding: 16px; font-size: 13px; color: var(--text-muted); text-align: center;">${t.search_empty_hint}</div>`;
      return;
    }
    const q = keyword.trim().toLowerCase();
    const hits = [];

    SEARCH_INDEX.forEach(idx => {
      const matchZh = idx.title.toLowerCase().includes(q) || idx.keywords.toLowerCase().includes(q);
      const matchEn = (idx.titleEn && idx.titleEn.toLowerCase().includes(q)) || (idx.snippetEn && idx.snippetEn.toLowerCase().includes(q));
      if (matchZh || matchEn) {
        hits.push(idx);
      }
    });

    if (hits.length === 0) {
      searchResultsEl.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">${t.search_not_found(keyword)}</div>`;
      return;
    }

    let html = '';
    hits.forEach(hit => {
      const part = isEn ? (hit.partEn || hit.part) : hit.part;
      const title = isEn ? (hit.titleEn || hit.title) : hit.title;
      const snippet = isEn ? (hit.snippetEn || hit.snippet) : hit.snippet;

      html += `
        <div class="jargon-item-card search-result-item" style="margin-bottom: 10px; padding: 12px 14px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: var(--semi-blue);">${escapeHtml(part)}</span>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" class="search-direct-model-btn" data-search-target="${hit.chId}" data-jump-model="true" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; padding: 3px 8px; background: rgba(56, 189, 248, 0.12); color: #0284c7; border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 4px; font-weight: 600; cursor: pointer;">
                ⚡ ${isEn ? 'Direct to Model' : '直達微觀模型'}
              </button>
              <button type="button" class="search-read-chapter-btn" data-search-target="${hit.chId}" data-jump-model="false" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; padding: 3px 8px; background: var(--bg-hover); color: var(--text-secondary); border: 1px solid var(--border-color); border-radius: 4px; font-weight: 600; cursor: pointer;">
                📖 ${isEn ? 'Read Chapter' : '閱讀本章'}
              </button>
            </div>
          </div>
          <div class="jargon-term" style="cursor: pointer;" data-search-target="${hit.chId}" data-jump-model="false">${escapeHtml(title)}</div>
          <div class="jargon-meaning" style="font-size: 13px; cursor: pointer;" data-search-target="${hit.chId}" data-jump-model="false">${escapeHtml(snippet)}...</div>
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
   * 8.5 掛載重點製程章節之互動工程物件模型
   */
  function attachEngineeringObjectModel(chId, lang) {
    const articleBody = mainCanvasEl.querySelector('.article-body');
    if (!articleBody) return;

    let targetEl = null;
    if (chId === 'ch00') {
      targetEl = articleBody.querySelector('h2[id*="一片晶圓的旅程"], h2[id*="the-journey-of-one-wafer"], h2[id*="旅程地圖"], h2[id*="map-of-the-journey"]');
    } else if (chId === 'ch01') {
      targetEl = articleBody.querySelector('h2[id*="無塵室比手術室還乾淨"], h2[id*="the-cleanroom-cleaner-than-an-operating-room"], h2[id*="晶圓怎麼移動foup-與自動搬運"], h2[id*="how-wafers-move-foups-and-automation"]');
    } else if (chId === 'ch02') {
      targetEl = articleBody.querySelector('h2[id*="半導體可以控制的導體"], h2[id*="semiconductors-conductors-you-can-control"], h2[id*="mosfet晶片裡的開關"], h2[id*="the-mosfet-the-switch-inside-a-chip"]');
    } else if (chId === 'ch03') {
      targetEl = articleBody.querySelector('h2[id*="長晶拉出一根完美的單晶"], h2[id*="growing-the-crystal"], h2[id*="從晶棒到晶圓"], h2[id*="from-ingot-to-wafer"]');
    } else if (chId === 'ch04') {
      targetEl = articleBody.querySelector('h2[id*="微影的三個主角"], h2[id*="the-three-key-players"], h2[id*="微影的流程"], h2[id*="the-lithography-flow"]');
    } else if (chId === 'ch05') {
      targetEl = articleBody.querySelector('h2[id*="cvd用氣體長出薄膜"], h2[id*="cvd-growing-films-from-gases"], h2[id*="pvd把原子撞下來"], h2[id*="pvd-knocking-atoms-loose"]');
    } else if (chId === 'ch06') {
      targetEl = articleBody.querySelector('h2[id*="電漿蝕刻的工具"], h2[id*="plasma-the-etching-tool"], h2[id*="濕蝕刻與乾蝕刻"], h2[id*="wet-etching-and-dry-etching"]');
    } else if (chId === 'ch07') {
      targetEl = articleBody.querySelector('h2[id*="佈植機怎麼運作"], h2[id*="how-an-implanter-works"], h2[id*="為什麼要佈植"], h2[id*="why-implant"]');
    } else if (chId === 'ch08') {
      targetEl = articleBody.querySelector('h2[id*="cmp-怎麼運作"], h2[id*="how-cmp-works"], h2[id*="為什麼要磨平"], h2[id*="why-the-wafer-must-be-flat"]');
    } else if (chId === 'ch09') {
      targetEl = articleBody.querySelector('h2[id*="怎麼洗"], h2[id*="how-cleaning-is-done"], h2[id*="污染有哪幾種"], h2[id*="types-of-contamination"]');
    } else if (chId === 'ch10') {
      targetEl = articleBody.querySelector('h2[id*="大馬士革製程"], h2[id*="the-damascene-process"], h2[id*="從鋁到銅"], h2[id*="from-aluminum-to-copper"]');
    } else if (chId === 'ch11') {
      targetEl = articleBody.querySelector('h2[id*="一個反覆出現的循環"], h2[id*="a-repeating-cycle"], h2[id*="第一段feol做出電晶體"], h2[id*="stage-1-feol"]');
    } else if (chId === 'ch12') {
      targetEl = articleBody.querySelector('h2[id*="finfet讓通道站起來"], h2[id*="finfet-making-the-channel-stand-up"], h2[id*="結構演進一覽"], h2[id*="the-evolution-at-a-glance"]');
    } else if (chId === 'ch13') {
      targetEl = articleBody.querySelector('h2[id*="dram一個電晶體加一個電容"], h2[id*="dram-one-transistor-one-capacitor"], h2[id*="3d-nand往上蓋大樓"], h2[id*="3d-nand-building-upward"]');
    } else if (chId === 'ch14') {
      targetEl = articleBody.querySelector('h2[id*="真正該看的尺寸"], h2[id*="the-dimensions-that-actually-matter"], h2[id*="3-奈米裡沒有-3-奈米"], h2[id*="there-is-nothing-3-nm-in-3-nm"]');
    } else if (chId === 'ch15') {
      targetEl = articleBody.querySelector('h2[id*="量測與檢測不一樣"], h2[id*="metrology-and-inspection-are-different"], h2[id*="常見的量測"], h2[id*="common-metrology-methods"]');
    } else if (chId === 'ch16') {
      targetEl = articleBody.querySelector('h2[id*="從晶圓圖看出線索"], h2[id*="reading-clues-from-the-wafer-map"], h2[id*="故障分析找到兇手"], h2[id*="failure-analysis-finding-the-culprit"]');
    } else if (chId === 'ch17') {
      targetEl = articleBody.querySelector('h2[id*="spc把數據畫成管制圖"], h2[id*="spc-turning-data-into-control-charts"], h2[id*="製程能力cpk"], h2[id*="process-capability-cpk"]');
    } else if (chId === 'ch18') {
      targetEl = articleBody.querySelector('h2[id*="ocap事先寫好的應變步驟"], h2[id*="ocap-response-steps-written-in-advance"], h2[id*="hold先擋下來"], h2[id*="hold-stop-it-first"]');
    } else if (chId === 'ch19') {
      targetEl = articleBody.querySelector('h2[id*="wat製程的成績單"], h2[id*="wat-the-process-report-card"], h2[id*="cp一顆一顆測"], h2[id*="cp-testing-die-by-die"]');
    } else if (chId === 'ch20') {
      targetEl = articleBody.querySelector('h2[id*="傳統封裝的流程"], h2[id*="the-traditional-packaging-flow"], h2[id*="覆晶把晶片翻過來"], h2[id*="flip-chip-turning-the-die-over"]');
    } else if (chId === 'ch21') {
      targetEl = articleBody.querySelector('h2[id*="25d並排放在中介層上"], h2[id*="25d-side-by-side-on-an-interposer"], h2[id*="為什麼需要先進封裝"], h2[id*="why-advanced-packaging-is-needed"]');
    } else if (chId === 'ch22') {
      targetEl = articleBody.querySelector('h2[id*="預燒提早篩掉體質不好的晶片"], h2[id*="burn-in-weeding-out-weak-chips-early"], h2[id*="可靠度能用多久"], h2[id*="reliability-how-long-it-lasts"]');
    } else if (chId === 'ch23') {
      targetEl = articleBody.querySelector('h2[id*="工廠裡的主要系統"], h2[id*="the-main-systems-in-a-fab"], h2[id*="防呆讓錯誤無法發生"], h2[id*="interlocks-making-mistakes-impossible"]');
    } else if (chId === 'ch24') {
      targetEl = articleBody.querySelector('h2[id*="軟體看不見的硬體真相"], h2[id*="hardware-truths-that-software-never-sees"], h2[id*="row-hammer記憶單元靠得太近"], h2[id*="row-hammer-memory-cells-packed-too-close"]');
    } else if (chId === 'app-glossary') {
      targetEl = articleBody.querySelector('h2[id*="名詞總表"], h2[id*="glossary"], h2[id*="常用縮寫"], h2[id*="common-acronyms"]');
    } else if (chId === 'app-jargon') {
      targetEl = articleBody.querySelector('h2[id*="台積與晶圓廠常見行話"], h2[id*="common-fab-jargon"], h2[id*="為什麼有這些行話"], h2[id*="why-this-jargon-exists"]');
    } else if (chId === 'app-reading') {
      targetEl = articleBody.querySelector('h2[id*="經典書籍推薦"], h2[id*="recommended-classic-books"], h2[id*="線上資源"], h2[id*="online-resources"]');
    }

    if (!targetEl) {
      targetEl = articleBody.querySelector('h2');
    }

    const container = document.createElement('div');
    container.className = 'engineering-object-mount';
    if (targetEl) {
      targetEl.parentNode.insertBefore(container, targetEl);
    } else {
      articleBody.prepend(container);
    }

    disposeCurrentEngineeringObject = mountEngineeringObject(chId, container, lang);

    // 監聽使用者互動事件，即時標記為已探索
    const onInteract = () => {
      markModelExplored(chId);
    };
    container.addEventListener('pointerdown', onInteract, { passive: true });
    container.addEventListener('input', onInteract, { passive: true });
    container.addEventListener('change', onInteract, { passive: true });
  }

  /**
   * 9. 代碼區塊右上角一鍵複製
   */
  function attachCodeCopyButtons() {
    const t = I18N[currentLang] || I18N.zh;
    mainCanvasEl.querySelectorAll('pre.code-pre').forEach((pre) => {
      if (pre.querySelector('.copy-code-btn')) return;
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn';
      copyBtn.type = 'button';
      copyBtn.textContent = t.btn_copy_code;
      copyBtn.title = t.btn_copy_code;
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        navigator.clipboard.writeText(code).then(() => {
          copyBtn.textContent = t.btn_copied_code;
          setTimeout(() => { copyBtn.textContent = t.btn_copy_code; }, 2000);
        });
      });
      pre.appendChild(copyBtn);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /**
   * 10. 全站語言切換核心
   */
  function applyLanguageUI() {
    const t = I18N[currentLang] || I18N.zh;

    // 更新文件標題與 HTML lang 屬性
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-Hant';
    document.title = currentLang === 'en'
      ? 'Semiconductor Knowledge Hub · Introduction to Semiconductor Manufacturing'
      : 'Semiconductor Knowledge Hub · 半導體製造概論知識庫';

    // 更新靜態文字標籤
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    // 更新 Placeholder 標籤
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // 更新 title 屬性
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (t[key]) {
        el.setAttribute('title', t[key]);
      }
    });

    // 更新 aria-label 屬性
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (t[key]) {
        el.setAttribute('aria-label', t[key]);
      }
    });

    // 更新語言按鈕啟動狀態與 aria-pressed
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === currentLang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // 更新進度條文字
    updateStudyProgress();

    // 重新渲染側邊欄
    renderSidebar(chapterFilterEl ? chapterFilterEl.value : '');

    // 若全景圖開啟中，同步刷新全景圖
    if (atlasModalEl && atlasModalEl.classList.contains('is-open')) {
      renderAtlasModal();
    }

    // 若行話字典開啟中，同步刷新字典
    if (jargonModalEl && jargonModalEl.classList.contains('is-open')) {
      renderJargonModal(jargonSearchInput ? jargonSearchInput.value : '', activeJargonTab);
    }
  }

  function setLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'zh';
    localStorage.setItem(LANG_STORAGE_KEY, currentLang);
    applyLanguageUI();

    const hash = (window.location.hash || '#ch00').slice(1);
    if (!hash.startsWith('explore')) {
      const [chapterId, query = ''] = hash.split('?');
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      loadChapter(chapterId || currentChapterId, new URLSearchParams(query).get('from'), new URLSearchParams(query).get('via'));
      requestAnimationFrame(() => {
        const newMaxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (newMaxScroll > 0) {
          window.scrollTo({ top: scrollRatio * newMaxScroll, behavior: 'instant' });
        }
      });
    } else {
      // 在情境探索模式下切換語言，立即重繪探索畫面
      renderRoute(window.location.hash);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 事件監聽與綁定
  // ══════════════════════════════════════════════════════════════════════════

  // 語言切換按鈕綁定
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        setLanguage(targetLang);
      }
    });
  });

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

  // 3. 情境與教材共用 Hash 路由，保留舊章節網址。
  function renderRoute() {
    disposeCurrentEngineeringObject?.();
    disposeCurrentEngineeringObject = null;
    const normalized = normalizeChapterHref(window.location.hash || '#explore');
    if (window.location.hash !== normalized) history.replaceState(null, '', normalized);
    const hash = normalized.slice(1);
    if (hash === 'explore' || hash.startsWith('explore/')) {
      renderExplorer(mainCanvasEl, hash);
      tocListEl.innerHTML = '';
      appSidebarEl.classList.remove('is-open');
      sidebarBackdropEl.classList.remove('is-active');
    } else {
      const [chapterId, query = ''] = hash.split('?');
      if (CHAPTERS_DATA.some(ch => ch.id === chapterId)) {
        loadChapter(chapterId, new URLSearchParams(query).get('from'), new URLSearchParams(query).get('via'));
      } else {
        loadChapter('ch00');
      }
    }
  }
  window.addEventListener('hashchange', renderRoute);

  // 沿用現有彈窗入口，補齊焦點圈限、背景隔離與關閉後的焦點返回。
  const dialogs = [atlasModalEl, jargonModalEl, searchModalEl, shortcutsModalEl];
  let activeDialog = null;
  let dialogOpener = null;
  document.addEventListener('focusin', e => {
    if (!activeDialog && !e.target.closest('[role="dialog"]')) dialogOpener = e.target;
  });
  const backgroundRegions = [document.querySelector('.app-header'), document.querySelector('.app-container'), document.querySelector('.app-footer')];
  const modalObserver = new MutationObserver(() => {
    const nextDialog = dialogs.find(dialog => dialog.classList.contains('is-open')) || null;
    if (nextDialog === activeDialog) return;
    if (nextDialog) {
      if (!activeDialog && !document.activeElement.closest('[role="dialog"]')) dialogOpener = document.activeElement;
      backgroundRegions.forEach(region => { region.inert = true; });
      const target = nextDialog.querySelector('input') || nextDialog.querySelector('button');
      target?.focus();
    } else {
      backgroundRegions.forEach(region => { region.inert = false; });
      if (dialogOpener?.isConnected && !dialogOpener.closest('[role="dialog"]')) dialogOpener.focus({ preventScroll: true });
      else mainCanvasEl.focus({ preventScroll: true });
    }
    activeDialog = nextDialog;
  });
  dialogs.forEach(dialog => modalObserver.observe(dialog, { attributes: true, attributeFilter: ['class'] }));
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !activeDialog) return;
    const focusable = [...activeDialog.querySelectorAll('a[href], button:not([disabled]), input, [tabindex="0"]')].filter(el => el.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  });

  // 4. 事件代理：點擊導航與跨頁跳轉
  document.addEventListener('click', (e) => {
    // 情境／章節的原生連結使用瀏覽器歷史，段落錨點保留章節資訊。
    const localLink = e.target.closest('a[href^="#"]');
    if (localLink && (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)) return;
    if (localLink && (localLink.classList.contains('toc-link') || localLink.closest('.article-body'))) {
      const href = normalizeChapterHref(localLink.getAttribute('href'));
      if (!/^#(?:ch\d{2}|app-|explore)/.test(href)) {
        let id;
        try { id = decodeURIComponent(href.slice(1)); } catch { return; }
        const target = document.getElementById(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'instant', block: 'start' }); }
      }
    }
    // 側邊欄點擊
    const navLink = e.target.closest('.chapter-nav-link');
    if (navLink) {
      e.preventDefault();
      const targetId = navLink.getAttribute('data-ch-id');
      if (window.location.hash === `#${targetId}`) loadChapter(targetId);
      else window.location.hash = targetId;
      return;
    }

    // 章節底部分頁點擊
    const pageNav = e.target.closest('.page-nav-card');
    if (pageNav) {
      e.preventDefault();
      const targetId = pageNav.getAttribute('data-nav-target');
      window.location.hash = targetId;
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
      const jumpModel = searchCard.getAttribute('data-jump-model') === 'true' || !!e.target.closest('[data-jump-model="true"]');
      searchModalEl.classList.remove('is-open');
      loadChapter(targetId);
      if (jumpModel) {
        setTimeout(() => {
          const mountEl = mainCanvasEl.querySelector('.engineering-object-mount');
          if (mountEl) {
            mountEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            mountEl.classList.add('flash-highlight');
            setTimeout(() => mountEl.classList.remove('flash-highlight'), 2000);
          }
        }, 150);
      }
      return;
    }

    // 複製章節連結按鈕
    if (e.target.closest('#copyLinkBtn')) {
      const btn = e.target.closest('#copyLinkBtn');
      const url = window.location.href;
      const t = I18N[currentLang] || I18N.zh;
      navigator.clipboard.writeText(url).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span>${t.copy_link_copied}</span>`;
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
      renderJargonModal(jargonSearchInput ? jargonSearchInput.value : '', activeJargonTab);
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

    // 手機端選單展開
    if (e.target.closest('#mobileToggleBtn')) {
      appSidebarEl.classList.toggle('is-open');
      sidebarBackdropEl.classList.toggle('is-active');
      return;
    }

    // 手機端遮罩關閉
    if (e.target === sidebarBackdropEl) {
      appSidebarEl.classList.remove('is-open');
      sidebarBackdropEl.classList.remove('is-active');
      return;
    }
  });

  // 5. 搜尋即時輸入監聽
  if (searchInputEl) {
    searchInputEl.addEventListener('input', (e) => {
      runSearch(e.target.value);
    });
  }

  // 6. 行話字典即時搜尋輸入監聽
  if (jargonSearchInput) {
    jargonSearchInput.addEventListener('input', (e) => {
      renderJargonModal(e.target.value, activeJargonTab);
    });
  }

  // 7. 字級調節監聽
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
      dialogs.filter(dialog => dialog !== searchModalEl).forEach(dialog => dialog.classList.remove('is-open'));
      searchModalEl.classList.add('is-open');
      if (searchInputEl) {
        searchInputEl.value = '';
        searchInputEl.focus();
        runSearch('');
      }
      return;
    }

    if (isInputActive || document.querySelector('.atlas-modal.is-open, .jargon-modal.is-open')) return;

    // [ 前往上一章
    if (e.key === '[') {
      if (document.body.classList.contains('is-exploring')) return;
      const idx = CHAPTERS_DATA.findIndex(c => c.id === currentChapterId);
      if (idx > 0) loadChapter(CHAPTERS_DATA[idx - 1].id);
      return;
    }

    // ] 前往下一章
    if (e.key === ']') {
      if (document.body.classList.contains('is-exploring')) return;
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
      if (document.body.classList.contains('is-exploring')) return;
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

  // 初始載入與初始化
  applyFontSize(currentFontSize);
  applyLanguageUI();
  renderRoute();

})();
