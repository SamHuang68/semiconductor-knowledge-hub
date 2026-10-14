// 生成器與瀏覽器共用章節連結契約，兼容已發布的舊連結。
export function normalizeChapterHref(href) {
  if (/^#node-\d{2}$/.test(href)) return href.replace('#node-', '#ch');
  if (/^(https?:|mailto:)/i.test(href)) return href;
  if (/TRANSLATIONS\.md$/i.test(href)) {
    return 'https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction/blob/main/TRANSLATIONS.md';
  }
  const chapter = href.match(/(?:^|\/)(\d{2})-[^/]+\/(?:README\.md)?(?:#.*)?$/i);
  if (chapter) return `#ch${chapter[1]}`;
  if (/glossary\.md(?:#.*)?$/.test(href)) return '#app-glossary';
  if (/fab-jargon\.md(?:#.*)?$/.test(href)) return '#app-jargon';
  if (/further-reading\.md(?:#.*)?$/.test(href)) return '#app-reading';
  if (/(?:^|\/)appendix\/README\.md$/i.test(href)) return '#app-glossary';
  const part = href.match(/(?:^|\/)([0-6])-[^/]+\/README\.md$/i);
  if (part) return `#${['ch00', 'ch02', 'ch04', 'ch11', 'ch15', 'ch19', 'ch23'][Number(part[1])]}`;
  if (/^(?:\.\.\/|\.\/)*README\.md$/i.test(href)) return '#explore';
  return href;
}
