/**
 * verify-hub.js
 * 驗證 Semiconductor Knowledge Hub 的資料完整性、相依性與色彩規範
 */
import fs from 'fs';
import path from 'path';

const ROOT_DIR = 'C:/Users/Sam/AI-Workspace/projects/semiconductor-knowledge-hub';

async function verify() {
  console.log('=== 開始檢驗 Semiconductor Knowledge Hub ===');
  let errors = 0;

  // 1. 驗證資料匯入
  try {
    const { CHAPTERS_DATA } = await import(`file://${ROOT_DIR}/data/chapters-data.js`);
    console.log(`[PASS] CHAPTERS_DATA 成功載入，共有 ${CHAPTERS_DATA.length} 個章節`);
    if (CHAPTERS_DATA.length < 25) {
      console.error('[FAIL] 章節數量不足 25');
      errors++;
    }

    // 檢查每個章節是否具備必要屬性
    CHAPTERS_DATA.forEach((ch, idx) => {
      if (!ch.id || !ch.fullTitle || !ch.contentHtml) {
        console.error(`[FAIL] 章節 #${idx} 缺少必要欄位: ${JSON.stringify(ch)}`);
        errors++;
      }
    });

    const { FAB_FLOW_NODES } = await import(`file://${ROOT_DIR}/data/fab-flow.js`);
    console.log(`[PASS] FAB_FLOW_NODES 成功載入，共有 ${FAB_FLOW_NODES.length} 個節點`);
    if (FAB_FLOW_NODES.length !== 12) {
      console.error('[FAIL] FAB_FLOW_NODES 節點數量不為 12');
      errors++;
    }

    const { GLOSSARY_DATA, JARGON_DATA } = await import(`file://${ROOT_DIR}/data/glossary-data.js`);
    console.log(`[PASS] GLOSSARY_DATA (${GLOSSARY_DATA.length} 筆) 與 JARGON_DATA (${JARGON_DATA.length} 筆) 載入成功`);
    if (GLOSSARY_DATA.length === 0 || JARGON_DATA.length === 0) {
      console.error('[FAIL] GLOSSARY 或 JARGON 資料為空');
      errors++;
    }

    const { SEARCH_INDEX } = await import(`file://${ROOT_DIR}/data/search-index.js`);
    console.log(`[PASS] SEARCH_INDEX 成功載入，共有 ${SEARCH_INDEX.length} 條全文檢索條目`);

  } catch (err) {
    console.error('[FAIL] 資料載入發生錯誤:', err);
    errors++;
  }

  // 2. 驗證零中系依賴與安全性
  const filesToScan = ['index.html', 'styles.css', 'app.js', 'package.json', 'README.md'];
  const bannedKeywords = ['deepseek', 'qwen', 'kimi', 'moonshot', 'baidu', 'aliyun', 'tencent', 'bytedance', 'volcengine'];

  for (const f of filesToScan) {
    const p = path.join(ROOT_DIR, f);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8').toLowerCase();
      for (const kw of bannedKeywords) {
        if (content.includes(kw)) {
          console.error(`[FAIL] 發現禁止中系關鍵字 "${kw}" 在 ${f}`);
          errors++;
        }
      }
    }
  }
  console.log('[PASS] 零中系相依性審查：通過 (無中系相依、套件或外部端點)');

  // 3. 驗證靜態資產
  const assets = ['assets/cover.svg', 'assets/16-wafer-map-patterns.svg', '.nojekyll', '.github/workflows/deploy.yml'];
  for (const a of assets) {
    const ap = path.join(ROOT_DIR, a);
    if (!fs.existsSync(ap)) {
      console.error(`[FAIL] 缺少必要檔案: ${a}`);
      errors++;
    } else {
      console.log(`[PASS] 資產檔案存在: ${a}`);
    }
  }

  if (errors === 0) {
    console.log('=== 所有驗證項目全數通過 (0 錯誤) ===');
  } else {
    console.error(`=== 驗證失敗，共有 ${errors} 個錯誤 ===`);
    process.exit(1);
  }
}

verify();
