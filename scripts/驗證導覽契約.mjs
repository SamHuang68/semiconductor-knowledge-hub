import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { SCENARIOS } from '../data/情境路徑.js';
import { CHAPTERS_DATA } from '../data/chapters-data.js';
import { normalizeChapterHref } from '../章節連結.js';

// 僅驗證本次新增導覽及舊連結相容契約，不啟動網站或外部服務。
assert.deepEqual(SCENARIOS.map(s => s.id), ['journey', 'pattern', 'quality', 'packaging', 'dispatch'], '五個情境入口必須保留');
const chapterIds = new Set(CHAPTERS_DATA.map(ch => ch.id));
for (const scenario of SCENARIOS) {
  assert.ok(scenario.boundary?.trim(), `${scenario.id} 必須說明教學邊界`);
  const ids = new Set(scenario.nodes.map(n => n.id));
  assert.equal(ids.size, scenario.nodes.length, `${scenario.id} 節點識別不可重複`);
  for (const node of scenario.nodes) {
    assert.ok(chapterIds.has(node.chapter), `${scenario.id}/${node.id} 的教材來源必須存在`);
    assert.ok(Array.isArray(node.next), `${scenario.id}/${node.id} 的分支必須是陣列`);
    for (const edge of node.next) {
      assert.ok(ids.has(edge.to), `${scenario.id}/${node.id} 的分支目的地必須存在`);
      assert.ok(edge.label?.trim(), `${scenario.id}/${node.id} 的分支必須有可讀說明`);
    }
  }
}

const quality = SCENARIOS.find(s => s.id === 'quality');
const qualityNodes = new Map(quality.nodes.map(n => [n.id, n]));
function canReach(from, to) {
  const pending = [from];
  const visited = new Set();
  while (pending.length) {
    const id = pending.pop();
    if (id === to) return true;
    if (visited.has(id)) continue;
    visited.add(id);
    pending.push(...qualityNodes.get(id).next.map(edge => edge.to));
  }
  return false;
}
assert.equal(quality.kind, 'branch', '品質情境必須提供判斷分支');
assert.deepEqual(qualityNodes.get('decision').next.map(edge => edge.to).sort(), ['hold', 'monitor'], '正常與異常兩條路徑皆須保留');
for (const id of qualityNodes.keys()) assert.ok(canReach('signal', id), `品質節點 ${id} 必須能由入口到達`);
for (const [from, to] of [['monitor', 'signal'], ['hold', 'release'], ['release', 'cause'], ['cause', 'release'], ['release', 'monitor']]) {
  assert.ok(canReach(from, to), `品質流程 ${from} 至 ${to} 必須可達`);
}
assert.deepEqual(qualityNodes.get('release').next.map(edge => edge.to).sort(), ['cause', 'monitor'], '放行評估須保留返回調查與核准後監控兩個選擇');

const packaging = SCENARIOS.find(s => s.id === 'packaging');
assert.equal(packaging.kind, 'compare', '封裝必須呈現結構比較');
assert.deepEqual(packaging.nodes.map(n => n.id), ['single', 'interposer', 'stack'], '三種封裝比較選項必須保留');
assert.ok(packaging.nodes.every(n => n.next.length === 0), '封裝比較不能建立先後流程');
assert.match(packaging.boundary, /並列選項.*並非先後步驟/, '比較應清楚揭露非時序性');

// 正常化換行後核對已讀取的基準來源，防止導覽改版刪減教材。
// 基準提交：9cc60aece2f53a9db0d627c117bb52d5ff2a5389。
const sourceHashes = {
  'chapters-data.js': 'cad0fd3b94d2cb337b8b44388bd7f8636312181f139682c25e4a2fff939e11a1',
  'fab-flow.js': '2f2b92227665b0f1f401a472bd8bb9c4635235e3a2349f9c2bb54ebf50f285e4',
  'glossary-data.js': '47338e1c5f7cea20d56146c811468ff0d44862f9e86651245797f0a34f904d4f',
  'search-index.js': '6ae28b8e9645afe223bc416ea1ad5b9826287d167bc4333b64b6e62c888df70f'
};
for (const [file, expected] of Object.entries(sourceHashes)) {
  const source = readFileSync(new URL(`../data/${file}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  assert.equal(createHash('sha256').update(source).digest('hex'), expected, `${file} 必須保留基準來源內容`);
}

const linkCases = [
  ['#node-00', '#ch00'],
  ['#node-24', '#ch24'],
  ['../../2-process-modules/04-lithography/README.md', '#ch04'],
  ['../19-wafer-test/README.md#wat', '#ch19'],
  ['../../3-integration/11-cmos-process-flow/', '#ch11'],
  ['../../2-process-modules/README.md', '#ch04'],
  ['../../6-beyond-the-fab/README.md', '#ch23'],
  ['../README.md', '#explore'],
  ['../../README.md', '#explore'],
  ['glossary.md', '#app-glossary'],
  ['../appendix/fab-jargon.md', '#app-jargon'],
  ['further-reading.md#網站', '#app-reading'],
  ['#ch18', '#ch18'],
  ['#常見異常', '#常見異常'],
  ['https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction', 'https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction'],
  ['https://example.org/04-lithography/README.md#段落', 'https://example.org/04-lithography/README.md#段落'],
  ['mailto:reader@example.org', 'mailto:reader@example.org']
];
for (const [input, expected] of linkCases) {
  assert.equal(normalizeChapterHref(input), expected, `章節連結契約不符：${input}`);
}
console.log('導覽契約通過：五情境、教材引用、分支回路、封裝比較、來源保全與舊連結相容。');
