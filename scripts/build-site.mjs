/**
 * build-site.mjs
 * 產生 GitHub Pages 發布產物 _site/：只放網站執行需要的檔案，不公開驗證腳本、內部文件與開發設定。
 * 來源取自 git ls-files（未追蹤的暫存檔不會進入產物），並檢查產物內每個相對參照都能以正確大小寫找到檔案
 * （Pages 在 Linux 上區分大小寫，Windows 本機不區分）。
 *
 * 用法：node scripts/build-site.mjs
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = path.join(ROOT, '_site');

// 不發布的開發與內部檔案；其餘追蹤中的檔案都視為網站內容
const EXCLUDE_DIRS = ['.github/', 'docs/', 'scripts/'];
const EXCLUDE_FILES = ['.gitignore', 'package.json', 'package-lock.json', 'README.md', 'revision-history.md', 'scenario-design-contract.md'];

const tracked = execFileSync('git', ['-c', 'core.quotepath=false', 'ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' })
  .split('\0').filter(Boolean);
const files = tracked.filter(f => !EXCLUDE_DIRS.some(d => f.startsWith(d)) && !EXCLUDE_FILES.includes(f));

rmSync(OUT, { recursive: true, force: true });
for (const f of files) {
  mkdirSync(path.dirname(path.join(OUT, f)), { recursive: true });
  cpSync(path.join(ROOT, f), path.join(OUT, f));
}

// 參照檢查：HTML／JS／CSS 中的相對 import、src、href、url()，須以完全相同的大小寫存在於產物中
const published = new Set(files);
const patterns = [
  /\bimport\s+(?:[^'"]*?\s+from\s+)?['"](\.{1,2}\/[^'"]+)['"]/g,
  /\bimport\(\s*['"`](\.{1,2}\/[^'"`$]+)['"`]\s*\)/g,
  /\b(?:src|href)="((?!https?:|\/\/|#|mailto:|data:|\$\{)[^"'+ ]+\.(?:js|mjs|css|svg|jpg|jpeg|png|webp|html|ico|json))"/g,
  /url\(\s*['"]?((?!https?:|data:|#)[^'")]+\.(?:svg|jpg|jpeg|png|webp|woff2?))['"]?\s*\)/g,
];
const missing = [];
let checked = 0;
for (const f of files.filter(f => /\.(html|js|mjs|css)$/.test(f))) {
  const source = readFileSync(path.join(OUT, f), 'utf8');
  for (const re of patterns) {
    for (const m of source.matchAll(re)) {
      const ref = m[1].split(/[?#]/)[0];
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(f), ref)).replace(/^\.\//, '');
      checked++;
      if (!published.has(target)) missing.push(`${f} → ${m[1]}`);
    }
  }
}

const leaked = files.filter(f => /\.(md|mjs)$/.test(f) && !f.startsWith('data/'));
for (const req of ['index.html', '404.html', '.nojekyll']) if (!published.has(req)) missing.push(`缺少必要檔案 ${req}`);

console.log(`產物 _site/：${files.length} 個檔案（排除 ${tracked.length - files.length} 個開發檔）；檢查 ${checked} 個相對參照`);
if (missing.length || leaked.length) {
  missing.forEach(x => console.error(`[FAIL] 參照不存在或大小寫不符：${x}`));
  leaked.forEach(x => console.error(`[FAIL] 不應發布的檔案：${x}`));
  process.exit(1);
}
if (!existsSync(path.join(OUT, 'index.html'))) { console.error('[FAIL] 產物缺少 index.html'); process.exit(1); }
console.log('[PASS] 發布產物完整，所有相對參照皆存在');
