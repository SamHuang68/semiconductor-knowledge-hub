# Semiconductor Knowledge Hub · 半導體製造概論知識庫

> 跟著一片晶圓，走完從沙子到晶片的完整旅程。系統化拆解 25 章 FEOL/BEOL 製程模組、CMOS/FinFET/GAA 整合、良率量測與先進封裝（CoWoS/SoIC）。

🌐 **線上公開站點**：[https://samhuang68.github.io/semiconductor-knowledge-hub/](https://samhuang68.github.io/semiconductor-knowledge-hub/)（或自訂網域 `https://semi.samhuang68.org/`）

---

## 專案特色

- **五種互動情境（1.1.0）**：以製造旅程、圖形轉移、品質異常分支、封裝比較與晶圓廠交接探索教材。各節點可操作、可深連結，並回連原章節；微影與封裝採原生 SVG 剖面示意。
- **25 章完整工程教材**：涵蓋從矽長晶、微影（DUV/EUV）、蝕刻、薄膜、CMP、金屬化，到 FinFET、GAA 奈米片、3D NAND 與先進封裝（2.5D/3D、CoWoS、SoIC）。
- **晶圓位置即時追蹤（Wafer Station Tracker）**：每章標註「前一站 ➔ 本章 ➔ 下一站」，清楚掌握晶圓在產線上的加工進度。
- **晶圓廠 12 大製程全景圖譜（Fab Flow Atlas）**：點選任一步驟即時定位並高亮對應章節的核心技術重點與關鍵機台。
- **現場行話與術語字典（Fab Jargon & Metrology Glossary）**：收錄 245 筆核心術語與 43 筆晶圓廠現場日常口語行話，支援分類標籤篩選與即打即顯模糊搜尋。
- **精密科技淡色系介面（Rule 0003）**：微暖高對比灰白底、晶圓刻度細線、高可讀性文字色彩階層（對比度達 WCAG AA >= 7:1）。
- **純前端架構**：HTML／CSS／JavaScript ES Modules，免安裝打包套件。新情境使用本機 HTML／SVG；既有章節的 Mermaid 圖表會按需從 jsDelivr 載入，不能視為完全離線能力。

情境圖為教學摘要，不是特定晶圓廠的正式流程、配方或放行指令。設計範圍見 [情境設計契約](情境設計契約.md)，版本變更見 [修訂紀錄](修訂紀錄.md)。既有正文、附錄與名詞資料保持原樣。

---

## 目錄大綱

| 部別 | 涵蓋章節 | 核心主題 |
|---|---|---|
| **第 0 部 開始之前** | 第 0～1 章 | 半導體產業分工、無塵室、自動搬運（AMHS）與晶圓廠運作機制 |
| **第 1 部 基礎** | 第 2～3 章 | 電晶體物理、MOSFET/CMOS、沙子純化、拉晶與拋光晶圓製作 |
| **第 2 部 製程模組** | 第 4～10 章 | 黃光微影、薄膜沉積（CVD/PVD/ALD）、蝕刻、離子佈植、CMP、清洗與金屬化 |
| **第 3 部 製程整合** | 第 11～14 章 | 完整 CMOS 流程、FinFET、GAA 奈米片、記憶體（DRAM/3D NAND）與製程節點定義 |
| **第 4 部 品質與良率** | 第 15～18 章 | 在線量測（CD-SEM/TEM）、晶圓圖良率分析、SPC 製程管制與 OCAP 異常處理 |
| **第 5 部 後段：測試與封裝** | 第 19～22 章 | 晶圓測試（WAT/CP）、傳統封裝、先進封裝（2.5D/3D CoWoS/SoIC）與可靠度測試 |
| **第 6 部 走出晶圓廠** | 第 23～24 章 | 工廠製造執行系統（MES）、防呆機制、晶圓履歷與製程對韌體之影響 |
| **附錄** | 附錄 A～C | 245 筆術語總表、43 筆現場行話對照與延伸閱讀清單 |

---

## 授權與來源致敬

- 本專案文字與知識架構源自開源專案 [chenwei810/Semiconductor_Manufacturing_Introduction](https://github.com/chenwei810/Semiconductor_Manufacturing_Introduction)。
- 授權條款遵循 **創用 CC 姓名標示－非商業性－相同方式分享 4.0 國際（CC BY-NC-SA 4.0）**。
- 本專案依該授權進行工程介面重製、純前端模組化與互動式視覺圖譜升級，遵守非商業性使用與相同方式分享原則。
