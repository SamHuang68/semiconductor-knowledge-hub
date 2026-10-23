# Semiconductor Knowledge Hub · 半導體製造概論知識庫

> 跟著一片晶圓，走完從沙子到晶片的完整旅程。系統化拆解 25 章 FEOL/BEOL 製程模組、CMOS/FinFET/GAA 整合、良率量測與先進封裝（CoWoS/SoIC）。

🌐 **線上公開站點**：[GitHub Pages 半導體製造概論知識庫](https://samhuang68.github.io/semiconductor-knowledge-hub/)

---

## 專案特色

- **修正版本 v2.6.2 — 情境圖例與訊號圖表 WCAG 對比修復、複製 SVG 淺色調色盤匯出與目錄結構 100% 滿貫對齊（2.6.2）**：
  - **情境探索圖例與訊號判讀圖表高對比達標**：全面消除淺底白字、淡色字（`#edf8f6`、`#d5e4e8`、`#bcd3db`、`#dcebec`、`#71ece3` 等）對比不足缺陷。材料圖例、比較圖標題、派工系統標籤、管制圖軸線與折線全面重構為深板岩與高對比色，所有可見文字與圖表元素對比度達標 WCAG AA（$\ge 4.5:1$，部分達 $10:1$ 以上）。
  - **複製 SVG 匯出配色無塵室淺色調色盤就緒**：重構 `engineering-diagram-reader.js` 的 `portableDiagram(svg)`，匯出時直接遍歷 DOM 套用淺色調色盤屬性映射（深黑面板轉為 `#f8fafc` 淺色材質，漸層與文字同步轉換，並注入專屬 `<style>` 區塊），徹底解決貼入外部簡報或向量工具呈現原始深黑屬性問題。
  - **全站 28 章目錄結構（TOC）與正文 H2 100% 滿貫對齊**：修正 Ch 12（電晶體 3D 架構與背面供電條例 vs 結構演進一覽）與 Ch 20（傳統與晶圓級封裝條例 vs 常見異常）TOC 條目順序；在 Ch 21 正文中補回遺漏的「2.5D、扇出型與 3D／3.5D 封裝條例總覽」H2 標題，使全站 28 章目錄與正文錨點達成 100% 完全對齊。

- **修正版本 v2.6.1 — 工程物件對比退化、正文結構與製程全景圖互動修正（2.6.1）**：
  - 工程物件 SVG 改以完整的淺色調色盤逐色對應：深色面板換成淺色材質、淺色字換成同色相深色字，恢復顏色語意；量測 28 個工程物件 132 個畫面（含互動狀態）、1,572 個文字元素全數達 WCAG AA，大面積深色填色為 0。v2.6.0 原為 414 處對比不足、85 個深色面板。
  - 照片燈箱的深色畫布與白底白字標題改為淡色量測台與深色字。
  - 還原 ch08、ch11、ch20、ch21 正文中被 `String.replace` 的 `$&` 樣式插入表格儲存格的標題與段落。
  - 製程全景圖的 Q-Time 時效矩陣實際顯示 5 個時窗徽章（微影→蝕刻與 OCAP 統一為 4 小時）；天車調度模擬在任何關閉路徑都會停止。
  - 新增門禁：`verify-light-theme.mjs` 的調色盤涵蓋與燈箱檢查、`verify-hub.js` 的正文結構檢查，以及瀏覽器層 `scripts/verify-svg-contrast.mjs`、`scripts/verify-atlas-lifecycle.mjs`。
  - 2.6.0 對「100% 淡色化」與燈箱白卡的描述，在 SVG 內部與燈箱畫布並未成立，以本版為準。
  - 依規則 0013 將 28 個中文檔名改為英文（例如 `工程物件.js` → `engineering-objects.js`），`verify-hub.js` 新增檔名 ASCII 門禁；完整對照見 `revision-history.md`。

- **里程碑版本 v2.6.0 — 無塵室淡色實驗系統深層升級與全站合規大滿貫（2.6.0）**：
  - 100% 徹底落實「規則 0003：簡報與網頁一律只用淡色系（嚴格禁止任何深暗色底）」，全站完成 CDP 真機實測無死角淡色化。
  - **三大工程彈窗淡色實驗室系統**：物理定量速算沙盒（薄荷白板公式條、淺板岩滑桿群、儀表輸出卡）、觀念隨堂快測（曜黑題幹 $\ge 12:1$ 高對比、白底微邊框選項卡）、異常處置 OCAP 戰情室（白底卡片步驟流、微距連接箭頭、彩色防呆邊框）。
  - **工程物件實體照片面板與 Lightbox 升級**：照片面板載體、HUD 規格區、縮放燈箱全面升級為無塵室白卡基底（Luminance $\ge 0.70$），保留高解析實體照片真實成像。
  - **製程全景圖譜橫截面演變展示帶（Atlas 2.0 Stream Banner）**：演變流橫幅與多層微觀膜層畫布升級為明亮無塵室即時監控台，單晶矽基底與深槽蝕刻高清晰顯影。
  - **390px 真機響應式防溢出強化**：全站精密數據表格容器追加 `overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch;`，真機與 CDP 模擬量測 `docScrollWidth === 390` 零水平溢出。
  - **自動化門禁強化**：`scripts/verify-light-theme.mjs` 擴充至 9 大維度，含括彈窗核心元件明度、實體照片面板載體、程式碼區塊無塵室底色與響應式防溢出斷言，全數 100% 通過。

- **里程碑版本 v2.5.0 — 美術呈現進階升級與全站淡色系合規大滿貫（2.5.0）**：
  1. **全站 100% 遵守規則 0003 淡色系規範（Rule 0003 Light Theme Gate）**：禁絕所有深黑/午夜藍底色，建立專屬自動化門禁 `scripts/verify-light-theme.mjs`，包含背景明度（Luminance >= 0.65）、資產載體對比門禁與雙態切換器門禁；將首頁 Hero 主視覺、情境探索畫布、28 座工程物件舞台全面升級為精密無塵室淺色儀器面板。
  2. **建置缺陷根因修復與晶圓刻度分隔線（Precision Wafer Divider）**：修正 `scripts/build-data.js` 分隔線正則缺陷，將全站 655 處字面殘留「---」段落完整修復為具有晶圓刻度象徵之 `hr.semi-hr`（◈ WAFER SCALE ◈），並以可逆性演算法嚴格證明正文內容零刪減。
  3. **無塵室 500nm 琥珀黃光淡色主題（500nm Litho Amber Light Mode）**：依決策 D1 移除深黑模式，黃光微影模式全面重構為淡琥珀微暖象牙基底（`#fdfbf7`）配高對比深琥珀文字（`#451a03`，對比度 > 13:1），保留黃光室教學概念同時兼顧無障礙與規則 0003。
  4. **手機端 RWD 響應式優化與導覽防溢出**：修正窄螢幕與手機端（390px）工具列溢出缺陷，隱藏外連按鈕，優化視窗折行排版，確保行動裝置瀏覽視野無裁切、無橫向溢出。

- **里程碑版本 v2.4.0 — 20 輪深度工程優化大滿貫（2.4.0）**：
  1. **全站 28 大章節物理速算沙盒大滿貫（Stage 5 / Rounds 21–25）**：`data/calculators-data.js` 擴充至 28/28 滿貫覆蓋（Ch 00 ~ 24 + 附錄 A/B/C），全站 28 座互動工程物件第 5 卡（Governing Law）點擊直接開啟專屬物理定量速算器，涵蓋 GDPW 晶圓淨晶粒數、ISO 14644 微粒分佈、Varshni 能隙溫漂、Scheil-Gulliver 長晶偏析、Rayleigh 焦深/解析度、Arrhenius 反應速率、ARDE 蝕刻寬深比延遲、LSS 離子佈植高斯深度、Preston CMP 研磨速率、RCA 兆聲波微粒洗淨、FS-MS 銅奈米散射與 Black 電遷移、CMOS 跨層熱預算積分、GAA Weff 靜電有效寬度、DRAM 儲存電荷與 NAND 穿隧、Dennard 功耗牆與 RC 延遲、橢偏儀 Ψ/Δ 光學、Poisson/Murphy/負二項良率模型、SPC Cpk 製程能力指數、8D 異常重工損益、Kelvin 四線電阻、Coffin-Manson 焊球熱疲勞、3D 封裝互連密度 (1/P²)、Weibull 浴缸故障曲線、Little 定律與 Kingman 排隊延遲、PDN L·di/dt 供電壓降，以及八大領域量綱、批次狀態機與國際標準換算器。
  2. **全站 28 大章節觀念隨堂快測大滿貫（Stage 6 / Rounds 26–30）**：`data/quiz-data.js` 擴充至 28 篇全站完整覆蓋，每章具備高鑑別度實務題、雙語選項、正解標記與詳實物理原理解析；並整合 `localStorage` 測驗成績持久化（`semi_quiz_results`）。
  3. **晶圓缺陷圖譜 16 大模式與 SPC 管制圖模擬深化、8D 異常表單列印（Stage 7 / Rounds 31–35）**：升級第 16 章缺陷圖譜、第 17 章 SPC 動態模擬與第 18 章 OCAP 戰情室，新增一鍵調用 `@media print` 專用「🖨️ 8D 異常報告表」出版級列印功能，支援完整品質工程異常處置表單紙本匯出與封裝。
  4. **純原生 Web Audio API 無塵室合成音效引擎與全站無障礙升級（Stage 8 / Rounds 36–40）**：全新建立 `data/sound-fx.js` 獨立音效引擎，採用純前端原生 Web Audio API 即時程序化合成無塵室點擊、答對、答錯、OCAP 警報與天車起步音效；頂部導覽列提供雙語動態靜音切換按鈕（預設靜音、點擊即啟用，記憶於 `localStorage`），具備 Node.js CLI 測試環境安全回退；全面升級無障礙與自動化驗證測試，版本推進至 `v2.4.0`。

- **里程碑版本 v2.3.0 — 20 輪結構化深度工程優化大滿貫（2.3.0）**：
  1. **實體電顯與機台照片深層互動（Stage 1 / Rounds 1–5）**：全站 28 大模組實體半導體電顯（SEM/TEM）與機台照片支援 **全螢幕深層縮放燈箱（Lightbox，支援 +/-/1:1 縮放、拖曳平移、左右箭頭跨章切換）**、**84 處微觀物理特徵標記（Hotspots，標記 Gate Oxide, FinFET Fin, AMHS Track, TSV, Wedge Bond 等物理特徵與交互機制卡片）**、**四態視圖切換器（🔀 並列、⚡ 示意、📷 實體、🌓 疊合）**、**Curtain Overlay 擦除疊合對照滑塊（物理電顯與向量示意圖即時重疊擦除）** 與 **Metrology HUD 計量規格抬頭顯示（檢測技術、放大倍率、加速電壓與 FOV）**。
  2. **物理定量速算器沙盒與全站 OCAP 決策樹（Stage 2 / Rounds 6–10）**：建立獨立資料庫 `calculators-data.js`，收錄 **8 大半導體經典物理速算沙盒（Rayleigh 解析度/焦深、Arrhenius 化學反應動力學、LSS 高斯佈植縱深、Preston CMP 研磨速率、Deal-Grove 氧化厚度、Poisson/Murphy/負二項良率模型、3D 封裝密度、ALT 加速老化）**，支援參數滑桿即時定量重算；建立 `ocap-data.js` 收錄 **28 篇全站異常反應處置決策樹（OCAP，涵蓋觸發警報、緊急防堵隔離、5 階 RCA 決策流、處置放行與長期防呆互鎖）**；並於各章工程物件第 5 卡（Governing Law）與第 6 卡（Failure Diagnostics）無縫直連。
  3. **晶圓廠全景圖譜天車調度、Q-Time 矩陣與語音朗讀（Stage 3 / Rounds 11–15）**：升級 12 大製程全景圖譜（Fab Flow Atlas），新增 **無塵室天車調度模擬（OHT AMHS Simulation，以 1800ms 節奏自動演繹 12 站派工與動態橫截面演變）**、**Q-Time 關鍵時效嚴苛管制矩陣（展示原生氧化層、光阻中毒、高分子腐蝕與銅自退火之時效限制）**、**各站機台實體縮圖一鍵直連燈箱**，以及於現場行話字典整合 **Web Speech API 雙語術語朗讀發音**。
  4. **無塵室 500nm 黃光微影濾光主題、隨堂快測與出版級列印（Stage 4 / Rounds 16–20）**：新增頂部主題切換器（**☀️ 亮色微暖工程模式 / 🌙 暗色極致對比模式 / 🟡 無塵室 500nm 黃光微影濾光模式**）；建立 `quiz-data.js` 觀念隨堂快測題庫與互動測驗彈窗；升級 publication-grade 出版級 `@media print` 講義與試卷排版樣式；並將全站版本號推進至 `v2.3.0`。

- **全書 25 章「定量物理定律與 3D 製程視窗」雙語 H2 目錄錨點（TOC ScrollSpy）100% 導覽整合與核心術語公式深化（2.0.6）**：為 `Ch00`–`Ch24` 全書 25 個正式章節的定量統御方程表建立專屬雙語 `<h2>` 標題錨點（`#定量物理定律與3d製程視窗` / `#quantitative-governing-laws-and-3d-process-windows`），完整註冊於右側段落目錄（TOC），並為 `GLOSSARY_DATA` 12 項核心指標術語（`DOF`、`Overlay`、`ALD`、`CMP`、`RC Delay`、`EM`、`Yield`、`Cpk`、`WAT`、`TSV`、`HTOL`、`OEE`）補齊定量數學方程與 3D 標尺。

- **全站 28/28 互動工程物件（Ch00–Ch24 + 附錄 A/B/C）100% 五卡儀表板（含第 5 張「定量統御定律卡」）與多波段 SVG 物理場動畫大滿貫（2.0.5）**：完成 `Ch00`、`Ch13`–`Ch24` 與 `附錄 A/B/C` 共 16 座工程物件的第 5 張雙語「定量統御定律（Quantitative Governing Law）」指標卡與 SVG 諧波能量環升級，達成全站 28 座工程物件 **100% 具備 5 張雙語指標卡（共 140 張中英指標卡）與雙層動態 SVG 物理視覺化**。

- **第 01–12 章（前中後段與元件物理 12 座工程物件）第 5 張「定量統御定律卡」與多波段物理場諧波動畫升級（2.0.4）**：於 `engineering-objects.css` 新增 `.anim-pulse-ring` 與 `.anim-field-glow` 物理場光暈動畫（完整支援 `prefers-reduced-motion` 無障礙降級），並為 `Ch01`–`Ch12` 共 12 座互動工程物件補齊第 5 張雙語「定量統御定律（Quantitative Governing Law）」指標卡與 SVG 多波段能量場動畫。

- **第 20–24 章（Coffin-Manson 焊球疲勞與 Washburn 毛細流、3D 節距 1/P² 密度律與 Stoney 翹曲方程、Weibull 浴缸與 Peck/FIT 卡方公式、Little's Law 與 Kingman 排隊公式、PDN L·di/dt 壓降與 Hamming/UBER 纠錯定律）定量方程完形（2.0.3）**：完成 `ch20`–`ch24` 雙語定量物理方程與 3D 互鎖表，達成全書 25 個正式章節（`Ch00`–`Ch24`）**100% 具備專屬定量統御方程（Governing Equations）與製程視窗對照表**。

- **第 15–19 章（橢偏散射與超音波反射、良率負二項模型與 3D 熱成像相位深度、SPC/EWMA/馬氏距離、超幾何共性檢定與動態 PAT、Kelvin 四線與 Williams-Brown 逃逸率）定量方程深化（2.0.2）**：於 `ch15`–`ch19` 新增雙語定量物理與統計控制方程表，涵蓋 `橢偏儀 Ψ/Δ 與 C-SAM 聲阻抗反射率方程`、`Gauge R&R P/T Ratio ≤ 10%`、`Poisson/Murphy/負二項良率與 1/x³ 關鍵面積致死率積分`、`3D LIT 鎖相熱成像相位－深度公式`、`EWMA R2R 控制律與 FDC 馬氏距離 T²`、`超幾何機台共性 P-Value 與 AEC-Q001 IQR 動態 PAT`，以及 `Kelvin 四線電阻消除、Holm 探針接觸電阻與 Williams-Brown 3D KGD 測試逃逸率定律`。

- **第 10–14 章（FS-MS 奈米電阻率／Elmore 延遲、CMOS 熱預算積分／TLM 接觸電阻、GAA 自然靜電長度、DRAM 分壓／HBM4 2048-bit 頻寬與 STCO 密度公式）定量物理方程深化（2.0.1）**：於 `ch10`–`ch14` 新增雙語定量物理方程與 3D 互鎖表，涵蓋 `Fuchs-Sondheimer 與 Mayadas-Shatzkes 尺寸散射方程（證明 Co/Ru/Mo 在 <15nm 勝過銅）、Elmore L² 延遲與 Black/Blech 電遷移定律`、`全流程遞減熱預算積分與 TLM 接觸電阻傳輸線模型`、`自然靜電微縮長度 λ_N 與 GAA 有效通道寬度倍增公式`、`DRAM 位元線電荷分壓、3D NAND F-N 穿隧與 HBM4 2048-bit 頻寬公式` 及 `CPP×M1P 標準單元面積與 STCO 異質小晶片成本方程`。

- **里程碑版本 v2.0.0 — 第 05–09 章（薄膜／電鍍 CEAC、電漿鞘層／ALE、離子佈植／熱穿透、CMP 3D 混合鍵合銅熱膨脹與 DLVO／拉普拉斯毛細力）定量物理方程深化（2.0.0）**：於五大前段核心製程模組補齊完整定量方程與 3D 互鎖表，涵蓋 `Deal-Grove 氧化定律、Gordon 深孔擴散與 CEAC 曲率加速電鍍銅超填方程`、`Child-Langmuir 電漿鞘層、ARDE 克努森傳導與 ALE 協同因子公式`、`LSS 高斯縱深、Fick 擴散與 1D 熱穿透深度（解釋奈秒雷射背面退火不傷正面銅線）`、`Preston 局部壓力與 3D 混合鍵合 1–3 nm 銅熱膨脹橋接方程` 及 `DLVO Zeta 電位、兆聲波邊界層與 Young-Laplace 超臨界 CO₂ 零毛細壓力公式`。

- **第 00–04 章（價值鏈良率經濟、無塵室冪次律、量子穿隧能帶、長晶偏析與 EUV 散粒雜訊／EPE）定量物理方程與 3D 互鎖深化（1.9.9）**：於 `ch00`–`ch04` 新增雙語「定量物理方程、製程視窗與 3D 異質整合跨站互鎖表」，涵蓋 `GDPW 毛晶粒數與 3D 堆疊複合良率定律`、`ISO 14644-1 微粒濃度冪次律與 18.24 MΩ·cm 超純水極限`、`波茲曼 59.6 mV/dec 次臨界極限與 EOT 量子穿隧方程`、`Voronkov 臨界比、Scheil 偏析方程與 SFQR/TTV 平坦度定律` 及 `瑞利焦深、EUV 91.8 eV 光子散粒雜訊與 EPE 邊緣放置誤差預算公式`。

- **晶圓廠現場行話（JARGON_DATA 43 筆雙語詞條與附錄 B）300mm 自動化與 3D 封裝實戰語境深化（1.9.8）**：針對 `data/glossary-data.js` 與附錄 B（`app-jargon`）中的 `Lot`、`Hot Lot (Super Hot / Hand-Carry)`、`Split (DOE / Future Hold)`、`控片 (Monitor)`、`擋片 (Dummy)`、`Recipe (RMS Checksum)`、`PM`、`Seasoning（養腔）`、`Q-Time (Auto-Hold)`、`Hold`、`Rework（黃光去膠重曝）`、`Excursion（戰情室與章魚防堵）`、`MRB` 與 `PE/EE/PIE/YE/TE/PKG` 共 14 項核心行話補齊 300mm 智慧晶圓廠與先進封裝現場運作機制。

- **5 大情境探索路徑（Scenario Explorer 全站 24 個互動節點）雙語製程與防呆條例全面深化（1.9.7）**：將 `data/scenario-paths.js` 中「看懂圖形轉移（Pattern Transfer 6 站）」、「處理良率異常（Yield Excursion 6 站判斷樹）」與「走進晶圓廠（Inside the Fab 5 站自動化派工）」共 17 個核心節點的中英雙語技術內容全面升級，串聯 `BARC/CAR/MOR 光阻`、`193i+SAQP / High-NA EUV`、`Cryo-HAR / Bosch DRIE / ALE`、`SCCO₂ 超臨界乾燥`、`APC R2R`、`P/T Ratio < 10%`、`WECO/Nelson + FDC`、`OCAP 章魚防堵法`、`3D LIT + Xe⁺ PFIB/STEM`、`MRB + PAT/SBL` 及 `SEMI E84 / GEM300 / Interface A Zero-Touch Track-In`。

- **全站 28 章節（Ch00–Ch24 + 附錄 A/B/C）雙語條例 H2 錨點與右側目錄（TOC ScrollSpy）100% 導覽整合（1.9.6）**：為全書 25 個正式章節與 3 篇附錄的所有工程與 3D 整合條例總表建立專屬雙語 `<h2>` 標題錨點，並完整註冊於 `chapters-data.js` 的 `headings` 與 `headingsEn` 陣列，支援右側段落目錄（TOC）一鍵跳轉與滾動高亮（ScrollSpy）。

- **全站 28/28 互動工程物件 100% 動態 SVG 物理與信號流滿貫覆蓋（1.9.5）**：完成第 0 章（晶片價值鏈與 EDA 合成流）、第 2 章（能帶載子躍遷與 MOSFET 通道反轉漂移）、第 14 章（微縮軌跡與 DTCO/STCO 小晶片互連）、第 18 章（OCAP 異常防堵與章魚追溯流）、第 23 章（CIM SECS/GEM300 雙向交握與 Q-Time 監控流）及第 24 章（Row Hammer 鄰列耦合波、L·di/dt 壓降電流與 3D 堆疊熱傳導流）SVG 動態升級，實現全站 28 座工程物件 100% 具備即時動態物理視覺化。

- **核心整合、3D 記憶體、故障分析、SPC 與晶圓針測工程物件 SVG 動態物理光束升級（1.9.4）**：為第 11 章（CMOS 跨層整合）、第 13 章（DRAM / 3D NAND / HBM 垂直 TSV 高速資料流）、第 16 章（良率晶圓圖掃描、雙束 FIB 離子束微割與 HR-TEM 繞射束）、第 17 章（SPC 管制軌跡與 Cpk 動態掃描）與第 19 章（WAT Kelvin 四線電流與 CP 微凸塊探針接觸脈衝）五大互動工程物件全面導入非侵入式 SVG 動態光束與信號脈衝動畫（`.anim-data-flow` / `.anim-beam`）。

- **12 大製程全景圖（Fab Flow Atlas）與 5 大互動情境探索路徑（Scenario Explorer）全譜系條例同步（1.9.3）**：將 `data/fab-flow.js` 第 01 至 11 站（涵蓋 `11N CZ/MCZ 與 SOI/LTHC 載片`、`ISSG 自由基氧化`、`High-NA EUV 與 SAQP/MOR`、`Cryo-HAR 與 Bosch TSV 蝕刻`、`FLA/LSA 零擴散退火`、`100% 保形 ALD 與選擇性磊晶`、`3D 混合鍵合 1–3 nm 銅內凹 CMP`、`Siconi 乾洗與 SCCO₂ 超臨界零張力乾燥`、`無阻障 Co/Ru/Mo 與 Air-Gap/BSPDN`、`GAA/CFET`、`CD-SAXS / C-SAM / 3D X-Ray CT / LIT`）及 `data/scenario-paths.js` 中英雙語導覽節點全面升級對齊全書最新條例。

- **附錄 A／B／C（八大領域術語量綱、批次狀態機行話、SEMI／JEDEC／UCIe 標準與頂尖會議）條例補完暨全站 28/28 工程物件指標卡滿貫（1.9.2）**：於附錄 A 新增 `八大工程領域核心縮寫與物理量綱條例總表`；於附錄 B 新增 `晶圓廠批次狀態機（Run/Hold/Future-Hold/Split）、開腔養腔復機（Season/Qual）、戰情室會診與 2.5D/3D 封裝現場行話條例表`；於附錄 C 新增 `SEMI / JEDEC / AEC-Q / UCIe / IEEE 1838 國際標準與 IEDM / VLSI / ISSCC / ECTC / IRPS / SPIE 頂尖會議條例表`，並為附錄 A／B／C 工程物件補齊第 4 張雙語條例總覽指標卡與 SVG 動態資料流，達成全站 28 個工程物件 100% 四卡滿貫。

- **Foundry 2.0 產業生態、無塵室／AMHS／廠務、固態物理、SPC／APC、OCAP／8D／PCN、CIM／SECS-GEM 與軟硬體協同條例滿貫整合（1.9.1）**：完成全書 25 章（`ch00`～`ch24`）所有專業條例總表與 25 座工程物件第 4 張雙語條例總覽指標卡的 100% 滿貫覆蓋：於第 0 章新增 `Foundry 2.0（前段 + 2.5D/3D 封裝 + KGD 測試）與六大價值鏈角色` 條例；於第 1 章新增 `ISO Class 1–5 無塵室、AMHS (OHT/Stocker/EFEM) 與四大廠務（18.2 MΩ·cm UPW / 特氣 / UPS / Scrubber）` 條例；於第 2 章新增 `Si / Ge / GaAs / 4H-SiC / GaN 能隙、Multi-Vt (ULVT~HVT) 與 CMOS 三大功耗公式` 條例；於第 17 章新增 `WECO / Nelson 判異規則、Cpk 階梯與 APC 四大支柱（R2R / FDC / VM / PdM）` 條例；於第 18 章新增 `OCAP 章魚防堵、MRB + PAT/SBL 異常值篩選、8D (D1–D8) 根因防呆與 ECN / JEDEC J-STD-046 PCN` 條例；於第 23 章新增 `MES / EAP / RMS / RTD / YMS 與 SEMI SECS-II / HSMS / GEM300 / Interface A` 條例；於第 24 章新增 `DRAM 溫控刷新與 PRAC、On-Die ECC / Chipkill、3D NAND FTL / LDPC、PVT / AVS、L di/dt 壓降展頻與 3D V-Cache / HBM NUMA 排程` 條例。

- **新興非揮發性與 3D 記憶體譜系、DTCO／STCO 微縮標尺、3D 無損量測（C-SAM／X-Ray CT）與 EFA／PFA 故障分析條例深化（1.9.0）**：於第 13 章補齊 `DRAM 6F² → 4F² VCT → 3D DRAM` 與 `eFlash / STT-MRAM / SOT-MRAM / RRAM / PCRAM / HfO₂ FeRAM` 完整記憶體條例；於第 14 章建立 `CPP`、`M1P`、`Track Height (9T → 5T)`、`DTCO (SDB / COAG / BPR / BSPDN)` 與 `STCO (3D Chiplet 異質拆解重組)` 五大微縮條例表；於第 15 章整合 `CD-SEM / OCD / CD-SAXS / HR-XRD`、`µDBO 疊對`、`BBP 明場 / 雷射暗場 / E-Beam 電壓對比` 及 `2.5D/3D 封裝 C-SAM 超音波、3D X-Ray CT 與 WLI / Shadow Moiré 翹曲量測` 條例；於第 16 章新增 `Poisson / Murphy / Negative Binomial 良率模型`、`PEM / OBIRCH / 鎖相熱成像（LIT 3D Z 軸熱點定位）` 與 `Xe⁺ Plasma FIB / STEM / EELS` 條例，並為 Ch13／Ch14／Ch15／Ch16 工程物件補齊第 4 張雙語條例總覽指標卡。

- **電漿／3D 高深寬比蝕刻、離子佈植／毫秒奈秒退火、3D 混合鍵合 CMP 與超臨界乾燥條例深化（1.8.9）**：於第 6 章補齊 `CCP/ICP RIE`、`3D NAND 極低溫高深寬比蝕刻（Cryo-HAR AR >100:1）`、`2.5D/3D TSV 波希法深矽蝕刻（Bosch DRIE）` 與 `GAA 奈米片釋放之原子層蝕刻（ALE）` 條例；於第 7 章整合 `中/大電流與 MeV 佈植`、`Cryo-Implant / PLAD 3D 共形摻雜` 及 `爐管 → Spike RTA → 毫秒閃光（FLA）→ 奈秒雷射（LSA 零擴散與 3D 背面活化）` 條例；於第 8 章新增 `STI 氧化鈰`、`MOL RMG 定高`、`BEOL 三步銅 CMP` 至 `3D TSV Reveal 與無凸塊混合鍵合（Ra < 0.2 nm + 1–3 nm 銅碟化凹陷精控）` 條例；於第 9 章新增 `RCA 四步`、`單片 DIO₃`、`Siconi 乾式氣相除氧化層` 與 `Marangoni / 超臨界 CO₂（SCCO₂ 零表面張力防倒塌）` 條例，並為 Ch06／Ch07／Ch08／Ch09 工程物件補齊第 4 張雙語條例總覽指標卡。

- **特殊晶圓基板、微影世代（至 High-NA EUV）與六大薄膜／電鍍超填條例深化（1.8.8）**：於第 3 章補齊 `CZ/MCZ 單晶與磊晶矽`、`FZ 高阻矽`、`FD-SOI / RF-SOI / 3D CPO 矽光子 SOI`、`4H-SiC 與 GaN 寬能隙基板` 及 `3D TSV / BSPDN 暫時鍵合載片（LTHC）` 條例；於第 4 章建立 `g/i-line（封裝 RDL）`、`KrF/ArF`、`ArFi 193i + LELE/SADP/SAQP`、`Low-NA EUV (0.33 NA)` 至 `High-NA EUV (0.55 NA 非對稱 4×/8× + MOR 光阻)` 全世代微影條例表；於第 5 章整合 `熱氧化/ISSG`、`CVD/FCVD`、`ALD (100% 保形)`、`PVD/iPVD`、`SiGe/Si:P 選擇性磊晶` 與 `ECD 電鍍銅由底向上超填（雙鑲嵌／TSV／微凸塊）` 六大條例，並為 Ch03／Ch04／Ch05 工程物件補齊第 4 張雙語條例總覽指標卡。

- **後段金屬階層、CMOS 全流程跨層整合、3D 微凸塊 KGD 探針卡與 JEDEC／AEC-Q100 可靠度條例深化（1.8.7）**：於第 10 章補齊 `M0/M1 無阻障 Co/Ru/Mo`、`M4–M9 多孔 ULK + Air-Gap` 至 `M10+ 超厚銅 / RDL / UBM / 背面 nTSV` 階層條例；於第 11 章建立 `FEOL → MOL (COAG / SAC / BPR) → BEOL → BSPDN → 3D 混合鍵合介面` 跨層熱預算與結構對照表；於第 19 章新增 `WAT 四線 Kelvin`、`Cantilever`、`Vertical / Cobra`、`20–55 µm 微凸塊 MEMS 探針卡` 與 `<10 µm 無凸塊 3D 混合鍵合犧牲墊 + IEEE 1838 KGD` 測試條例；於第 22 章新增 `JEDEC JESD22 / AEC-Q100 / J-STD-020`（`HTOL`、`TC`、`HAST/THB`、`MSL 迴焊爆米花`、`WLR TDDB/BTI/HCI/EM`）完整驗證條例，並為 Ch10／Ch11／Ch19／Ch22 工程物件補齊第 4 張雙語條例總覽指標卡。

- **第二輪全譜系 3D／傳統至準先進封裝與單石 3D 電晶體條例深化（1.8.6）**：於第 21 章（先進封裝）、第 20 章（傳統與基板級封裝）、第 12 章（先進電晶體與背面供電）、術語字典（245 筆）與工程物件（Ch12／Ch20／Ch21）補齊第二輪深度條例與動態光學路徑：
  1. **第 21 章擴充至六大 3D 條例（3A～3F）與鍵合拓撲／可測性條例**：新增 **條例 3E — 3D 光電共封裝與玻璃核心基板**（`TSMC COUPE [EIC-on-PIC]`、`Intel CPO`、`Broadcom Bailly SCIP`、`GF Fotonix`、`Glass Core Substrate + TGV [玻璃通孔]`）、**條例 3F — 單石 3D 積體電路與雙面 3D 晶圓整合**（`Sequential / Monolithic 3D IC`、`CFET`、`BSPDN`）、**3D 鍵合方向與粒度拓撲條例表**（`F2F 面對面`、`F2B 面對背 / B2B`、`W2W 晶圓對晶圓`、`D2W / CoW 晶粒對晶圓與 Collective D2W`）、OSAT 2.5D/FO 平台（`Amkor S-Connect / S-SWIFT`、`PTI FOPLP`），以及 **3D 散熱／CPI 翹曲／IEEE 1838（PTAP/STAP/FPP 與 UCIe/HBM 冗餘通道修復）** 工程對策表。
  2. **第 20 章補齊覆晶凸塊與 1D/2D/WLP/3D-PoP/SiP 六大封裝家族條例**：新增 **覆晶凸塊與填膠條例表**（`C4 錫球`、`Cu Pillar 銅柱凸塊`、`µBump + TCB`、`CUF / NCF / MUF`）與 **完整封裝形式條例表**（有引腳 `DIP / SOP / SOIC / QFP / TO-220`、無引腳 `QFN / DFN / SON / Clip-Bond`、陣列載板 `PBGA / FCBGA / FCCSP / LGA / PGA`、扇入型 `Fan-In WLCSP`、多晶粒階梯打線與封裝體 3D 堆疊 `MCP / DDP / QDP / PoP / PiP`，以及 `SiP 系統級封裝 + 共形電磁屏蔽 / SESUB`）。
  3. **第 12 章補齊背面供電（BSPDN）與單石 3D 電晶體（CFET）條例**：新增 `Intel PowerVia (nTSV)`、`TSMC Super PowerRail (SPR)`、`Samsung BSPDN (BPR)` 與 `Monolithic / Sequential 3D CFET` 對照表，並為 Ch12／Ch20／Ch21 工程物件補上 `.anim-data-flow` 動態訊號／供電流與第 4 張條例總覽指標卡。

- **全譜系 3D／2.5D／3.5D／扇出型與 3D 記憶體封裝條例整合（1.8.5）**：於第 21 章（先進封裝）、第 13 章（記憶體製造）、附錄 A／術語字典（245 筆）、全文檢索索引、工程物件（Ch21）、情境探索 04 與 12 大製程全景圖譜（Step 12）雙語對應條例下，完整納入所有已知主流封裝技術：包含 **2.5D 中介層與局部矽橋**（`TSMC CoWoS-S / CoWoS-R / CoWoS-L [LSI]`、`Intel EMIB / EMIB-T`、`Samsung I-CubeS / I-CubeE / H-Cube`、`ASE FOCoS-CF / FOCoS-CL / FOEB`、`UMC 2.5D`）、**扇出型與晶圓級系統封裝**（`TSMC InFO-RDL / InFO-PoP / InFO-oS / InFO_B / InFO-3D / InFO-SoW / CoW-SoW`、`Samsung FO-PLP / ePoP`、`ASE FOWLP / FO-EBG`、`Amkor SWIFT`）、**3D 垂直堆疊四大條例**（3A 無凸塊銅對銅混合鍵合：`TSMC SoIC-X`、`Intel Foveros Direct`、`Samsung X-Cube [Hybrid Bonding] / SAINT-S / SAINT-D / SAINT-L`、`3D NAND CBA [CMOS Bonded to Array]`、Sony 堆疊式 CIS；3B 微凸塊與 TSV 3D IC：`TSMC SoIC-P`、`Intel Foveros / Foveros Omni`、`Samsung X-Cube [µBump]`、`ASE VIPack 3D IC`；3C 3D 記憶體垂直堆疊：`HBM2E / HBM3 / HBM3E / HBM4` 之 `TC-NCF`、`MR-MUF` 與 `Fluxless / Hybrid Bonding HBM`、`3DS RDIMM`、`Custom 3D Cube DRAM`；3D 3.5D 異質整合：`TSMC 3.5D [CoWoS + SoIC]`、`Intel Co-EMIB`、`Samsung 3.5D`），以及 **小晶片互連標準**（`UCIe-Standard / UCIe-Advanced / UCIe-3D`、`AIB`、`BoW`、`NVLink-C2C`、`Infinity Fabric`）。

- **圖像與物理動畫呈現升級（1.8.4）**：為 28 個工程物件自動注入共用 SVG 光學定義（`#arrow` 自動繼承筆畫向量箭頭、發光濾鏡與材質漸層），連同獨立 SVG 複製一併攜帶；補齊 Ch09 兆聲波微粒脫附發光與流場動畫、Ch05 PVD／CVD 氣相粒子與離子束動畫，並加入 `prefers-reduced-motion` 動畫降級保護。升級 `cover.svg`（切割道微網格、薄膜干涉彩虹光澤與雷射掃描束）、`16-wafer-map-patterns.svg`（晶圓基底放射漸層與缺陷晶粒呼吸高亮），以及 Atlas 2.0 動態晶圓橫截面流（對齊 12 大製程節點契約、中英雙語標示與懸停／鍵盤焦點同步預覽）。

- **其他章節圖例排版（1.8.3）**：分開蝕刻異常標題、清洗粒徑與受力說明、記憶體編號與註解、節點間距標示、橢偏入射角及 OCAP 處置區。修正潔淨室、晶圓切片與清洗圖的固定定位遭動畫覆蓋；原文、動態數值、滑桿、模型選項、閱讀工具與匯出入口保留。指定頁籤已完成中英文、1440／390 像素及參數端點驗證；此結果不代表全站或實體裝置驗證。

- **圖例閱讀與資訊保全（1.8.2）**：28 個工程物件新增看全圖、閱讀比例、縮放、鍵盤平移及可換行的圖中文字列表；閱讀比例依實際字級計算，目標最小 16 px。列表直接沿用目前圖面文字與即時數值，可選取定位及收合。修正長晶動畫定位與三章標籤排版，保留原圖、滑桿、ALD、全螢幕及多圖 SVG 匯出。

- **工程互動操作保全（1.8.1）**：工程卡片更新時保留操作工具列、滑桿與焦點，修正全螢幕互動及 ALD 自動播放的清理；CVD 機制標籤與 DRAM 放電曲線改用各自相同的內部計算假設，恢復 BGA／C4／CoWoS／SoIC 四世代參考比較，同時保留精細節距與資料速率滑桿。手機頁首、頁籤與滑桿可換行，全螢幕圖形可橫向捲動閱讀。局部瀏覽器案例已完成，部署身分另以同版本交付紀錄核對。

- **28 個工程物件與 12 大流程圖譜（1.8.0）**：既有 25 章與 3 個附錄提供工程示意物件，搭配可操作參數、圖表及章節定位；全景圖譜串接 12 大製程的學習入口。這些內容供概念探索，不代表所有教材、物理模型或製程主張都已完整驗證。

- **延伸來源與回程（1.7.0）**：跨情境後顯示來源與返回原站的入口；同情境繼續閱讀、比較、練習及進入教材再返回均保留起點。來源寫入連結，重新整理、新分頁或分享後仍可回程；再次跨情境時更新為最近的出發節點。

- **跨情境延伸探索（1.6.0）**：25個節點各提供一至兩項延伸，共28條帶有閱讀理由的關聯連結；直達另一情境的相關節點，保留瀏覽器返回、教材回程與原流程入口。手機鍵盤導覽會避開固定工具列。

- **圖例放大檢視（1.5.0）**：五種情境的節點圖例可開啟獨立檢視窗，支援最高300%、符合視窗、觸控／滑鼠捲動與鍵盤移動。沿用目前圖形與訊號狀態，關閉後返回原操作位置。

- **訊號判讀操作區（1.4.0）**：切換基準波動、單點越界與連續偏移三種教學示例；用滑桿或前後按鈕逐點展開，圖形、文字觀察與相對位置表同步更新。訊號選擇獨立於流程節點，核對規則後可回到監控、異常處置或原教材。

- **前後對照與結構比較（1.3.0）**：六組材料剖面前後對照、三種封裝並排比較；晶圓旅程與系統交接圖隨節點改變，區分元件、互連、測試、資訊核對與實體搬運。

- **情境練習與連續閱讀（1.2.0）**：新增微影、SPC 與配方防呆三題練習，每個選項都有解釋及章節依據；手機點節點後直接看到解說，進入教材可返回原步驟。就近操作列提供情境切換、全圖、解說、練習及步驟分享。

- **五種互動情境**：以製造旅程、圖形轉移、品質異常分支、封裝比較與晶圓廠交接探索教材。各節點可操作、可深連結，並回連原章節；微影與封裝採原生 SVG 剖面示意。
- **25 章完整工程教材**：涵蓋從矽長晶、微影（DUV/EUV）、蝕刻、薄膜、CMP、金屬化，到 FinFET、GAA 奈米片、3D NAND 與先進封裝（2.5D/3D、CoWoS、SoIC）。
- **晶圓位置即時追蹤（Wafer Station Tracker）**：每章標註「前一站 ➔ 本章 ➔ 下一站」，清楚掌握晶圓在產線上的加工進度。
- **晶圓廠 12 大製程全景圖譜（Fab Flow Atlas）**：點選任一步驟即時定位並高亮對應章節的核心技術重點與關鍵機台。
- **現場行話與術語字典（Fab Jargon & Metrology Glossary）**：收錄 245 筆核心術語與 43 筆晶圓廠現場日常口語行話，支援分類標籤篩選與即打即顯模糊搜尋。
- **精密科技淡色系介面（Rule 0003）**：微暖高對比灰白底、晶圓刻度細線、高可讀性文字色彩階層（對比度達 WCAG AA >= 7:1）。
- **純前端架構**：HTML／CSS／JavaScript ES Modules，免安裝打包套件。新情境使用本機 HTML／SVG；既有章節的 Mermaid 圖表會按需從 jsDelivr 載入，不能視為完全離線能力。

情境圖為教學摘要，不是特定晶圓廠的正式流程、配方或放行指令。工程物件使用未經實測校準的教學模型，內部計算一致不等於實體製程正確或產品效能保證。1.8.1 的局部驗證、審查及公開部署已完成；1.8.2 另完成桌面／手機 188 組圖例文字對照與四尺寸閱讀操作案例。這些證據不涵蓋實體裝置、跨瀏覽器、完整讀屏或整站全套驗證；最終提交、部署及公開資產狀態另以同版本交付紀錄核對。設計範圍見 [情境設計契約](scenario-design-contract.md)，版本變更見 [修訂紀錄](revision-history.md)。既有正文、附錄與名詞資料保持原樣。

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
