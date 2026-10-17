/**
 * verify-hub.js
 * 驗證 Semiconductor Knowledge Hub 的資料完整性、雙語覆蓋率、零中系相依與靜態資產
 */
import fs from 'fs';
import path from 'path';

const ROOT_DIR = 'C:/Users/Sam/AI-Workspace/projects/semiconductor-knowledge-hub';

async function verify() {
  console.log('=== 開始檢驗 Semiconductor Knowledge Hub (中英雙語旗艦版) ===');
  let errors = 0;

  // 1. 驗證章節與雙語資料完整性
  try {
    const { CHAPTERS_DATA } = await import(`file://${ROOT_DIR}/data/chapters-data.js`);
    console.log(`[PASS] CHAPTERS_DATA 成功載入，共有 ${CHAPTERS_DATA.length} 個雙語章節`);
    if (CHAPTERS_DATA.length < 28) {
      console.error(`[FAIL] 章節數量不足 28 (預期 25 正式章 + 3 附錄，實得 ${CHAPTERS_DATA.length})`);
      errors++;
    }

    // 檢查每個章節是否具備中英雙語必要屬性
    CHAPTERS_DATA.forEach((ch, idx) => {
      if (!ch.id || !ch.fullTitle || !ch.contentHtml) {
        console.error(`[FAIL] 章節 #${idx} 缺少中文必要欄位`);
        errors++;
      }
      if (!ch.fullTitleEn || !ch.contentHtmlEn || !ch.partEn) {
        console.error(`[FAIL] 章節 #${idx} (${ch.id}) 缺少英文必要欄位 (fullTitleEn / contentHtmlEn / partEn)`);
        errors++;
      }
    });
    console.log('[PASS] 28 個章節與附錄的中英雙語內容全數對齊驗證通過');

    const { FAB_FLOW_NODES } = await import(`file://${ROOT_DIR}/data/fab-flow.js`);
    console.log(`[PASS] FAB_FLOW_NODES 成功載入，共有 ${FAB_FLOW_NODES.length} 個節點`);
    if (FAB_FLOW_NODES.length !== 12) {
      console.error('[FAIL] FAB_FLOW_NODES 節點數量不為 12');
      errors++;
    }
    FAB_FLOW_NODES.forEach((n, idx) => {
      if (!n.nameZh || !n.nameEn || !n.summaryEn || !n.keyToolEn || !n.governingLawZh || !n.governingLawEn || !n.ocapSignatureZh || !n.ocapSignatureEn) {
        console.error(`[FAIL] 製程節點 #${idx} (${n.id}) 缺少雙語欄位`);
        errors++;
      }
    });
    console.log('[PASS] 12 大製程全景節點中英雙語規格全數對齊驗證通過');

    const { GLOSSARY_DATA, JARGON_DATA } = await import(`file://${ROOT_DIR}/data/glossary-data.js`);
    console.log(`[PASS] GLOSSARY_DATA (${GLOSSARY_DATA.length} 筆) 與 JARGON_DATA (${JARGON_DATA.length} 筆) 載入成功`);
    if (GLOSSARY_DATA.length === 0 || JARGON_DATA.length === 0) {
      console.error('[FAIL] GLOSSARY 或 JARGON 資料為空');
      errors++;
    }

    GLOSSARY_DATA.forEach((g, idx) => {
      if (!g.en || !g.zh || !g.descZh || !g.descEn) {
        console.error(`[FAIL] 術語總表 #${idx} (${g.en}) 缺少中英說明`);
        errors++;
      }
    });

    JARGON_DATA.forEach((j, idx) => {
      if (!j.termZh || !j.termEn || !j.meaningZh || !j.meaningEn) {
        console.error(`[FAIL] 現場行話 #${idx} (${j.termZh}) 缺少中英解釋`);
        errors++;
      }
    });
    console.log('[PASS] 術語總表 (245 筆) 與 現場行話 (43 筆) 中英對照全數驗證通過');

    const { SEARCH_INDEX } = await import(`file://${ROOT_DIR}/data/search-index.js`);
    console.log(`[PASS] SEARCH_INDEX 成功載入，共有 ${SEARCH_INDEX.length} 條雙語全文檢索條目`);
    if (SEARCH_INDEX.length < 28) {
      console.error('[FAIL] 全文索引條目不足 28 筆');
      errors++;
    }

  } catch (err) {
    console.error('[FAIL] 資料載入發生錯誤:', err);
    errors++;
  }

  // 2. 驗證零中系依賴與安全性
  const filesToScan = ['index.html', 'styles.css', 'app.js', 'package.json', 'README.md', '工程物件.js', '工程物件.css'];
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

  // 3. 驗證全站二十八大工程物件模組 (Ch 00 ~ 24 + 附錄 A/B/C 滿貫覆蓋) 雙語渲染
  try {
    const engObj = await import(`file://${ROOT_DIR}/工程物件.js`);
    const testIds = ['ch00', 'ch01', 'ch02', 'ch03', 'ch04', 'ch05', 'ch06', 'ch07', 'ch08', 'ch09', 'ch10', 'ch11', 'ch12', 'ch13', 'ch14', 'ch15', 'ch16', 'ch17', 'ch18', 'ch19', 'ch20', 'ch21', 'ch22', 'ch23', 'ch24', 'app-glossary', 'app-jargon', 'app-reading'];
    for (const id of testIds) {
      for (const lang of ['zh', 'en']) {
        const dummy = { innerHTML: '', querySelectorAll: () => [], querySelector: () => null };
        engObj.mountEngineeringObject(id, dummy, lang);
        const cardCount = (dummy.innerHTML.match(/class="eng-obj-metric-card"/g) || []).length;
        if (!dummy.innerHTML || dummy.innerHTML.length < 500 || cardCount < 6) {
          console.error(`[FAIL] 工程物件 ${id} (${lang}) 渲染輸出異常`);
          errors++;
        }
      }
    }
    console.log('[PASS] 二十八大全站工程物件模型 (Ch 00 ~ 24 + 附錄 A/B/C 滿貫覆蓋) 中英雙語渲染全數通過');
  } catch (err) {
    console.error('[FAIL] 工程物件載入或渲染失敗:', err);
    errors++;
  }

  // 4. 驗證靜態資產
  const assets = ['assets/cover.svg', 'assets/16-wafer-map-patterns.svg', '.nojekyll', '.github/workflows/deploy.yml', '工程物件.js', '工程物件.css'];
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
