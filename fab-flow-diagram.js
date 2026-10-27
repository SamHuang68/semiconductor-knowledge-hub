function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function shortText(summary) {
  const sentence = String(summary || '').split('。')[0].trim();
  if (sentence.length <= 96) return sentence;
  const slice = sentence.slice(0, 96);
  const pivot = Math.max(slice.lastIndexOf('，'), slice.lastIndexOf('、'), slice.lastIndexOf(','));
  return `${(pivot > 36 ? slice.slice(0, pivot) : slice).trim()}…`;
}

export function mountFabFlow(container, nodes, isEn) {
  if (!container || !nodes?.length) return;
  const label = isEn ? 'Teaching fab flow' : '教學用製程流程';
  const buttons = nodes.map((node, index) => {
    const name = isEn ? node.nameEn : node.nameZh;
    return `<li><button type="button" class="fab-station" data-station="${index}" aria-pressed="${index === 0 ? 'true' : 'false'}" tabindex="${index === 0 ? '0' : '-1'}">
      <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16"></circle><text x="18" y="22" text-anchor="middle">${escapeHtml(node.num)}</text></svg>
      <span>${escapeHtml(name)}</span>
    </button></li>`;
  }).join('');
  container.innerHTML = `<section class="fab-flow ds-section" aria-labelledby="fabFlowTitle">
    <p class="ds-kicker">Fab flow</p>
    <h2 id="fabFlowTitle">${isEn ? 'Twelve stations, one teaching order' : '十二站教學順序'}</h2>
    <p>${isEn
      ? 'Focus or click a station. The note is the opening of the summary already stored for that station.'
      : '點選或把焦點移到某一站，下方使用該站既有摘要的開頭。這是教學順序，不是特定晶圓廠的正式路線。'}</p>
    <ol class="fab-flow-list" aria-label="${label}">${buttons}</ol>
    <div id="fabFlowDetail" class="fab-flow-detail" role="region" aria-live="polite"></div>
  </section>`;
  const stationButtons = [...container.querySelectorAll('.fab-station')];
  const detail = container.querySelector('#fabFlowDetail');
  const show = index => {
    const node = nodes[index];
    const summary = isEn ? node.summaryEn : node.summaryZh;
    const title = isEn ? (node.chapterTitleEn || node.chapterTitle) : (node.chapterTitleZh || node.chapterTitle);
    const name = isEn ? node.nameEn : node.nameZh;
    stationButtons.forEach((button, buttonIndex) => {
      const on = buttonIndex === index;
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
      button.tabIndex = on ? 0 : -1;
    });
    detail.innerHTML = `<h3>${escapeHtml(name)}</h3><p>${escapeHtml(shortText(summary))}</p><a href="#${escapeHtml(node.chapterId)}">${escapeHtml(isEn ? `Read ${title}` : `閱讀${title}`)}</a>`;
  };
  show(0);
  container.addEventListener('click', event => {
    const button = event.target.closest('.fab-station');
    if (!button || !container.contains(button)) return;
    show(Number(button.dataset.station));
  });
  container.addEventListener('focusin', event => {
    const button = event.target.closest('.fab-station');
    if (!button || !container.contains(button)) return;
    show(Number(button.dataset.station));
  });
  container.querySelector('.fab-flow-list').addEventListener('keydown', event => {
    const current = stationButtons.indexOf(document.activeElement);
    if (current < 0) return;
    const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? current + 1 : (event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? current - 1 : -1);
    if (event.key === 'Home') { event.preventDefault(); stationButtons[0].focus(); return; }
    if (event.key === 'End') { event.preventDefault(); stationButtons[stationButtons.length - 1].focus(); return; }
    if (next < 0 || next >= stationButtons.length) return;
    event.preventDefault();
    stationButtons[next].focus();
  });
}
