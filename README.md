# Semiconductor Knowledge Hub · 半導體製造概論知識庫

> 跟著一片晶圓，走完從沙子到晶片的完整旅程。系統化拆解 25 章 FEOL/BEOL 製程模組、CMOS/FinFET/GAA 整合、良率量測與先進封裝（CoWoS/SoIC）。

🌐 **線上公開站點**：[GitHub Pages 半導體製造概論知識庫](https://samhuang68.github.io/semiconductor-knowledge-hub/)

---

## 專案特色

- **12 大製程全景圖（Fab Flow Atlas）與 5 大互動情境探索路徑（Scenario Explorer）全譜系條例同步（1.9.3）**：將 `data/fab-flow.js` 第 01 至 11 站（涵蓋 `11N CZ/MCZ 與 SOI/LTHC 載片`、`ISSG 自由基氧化`、`High-NA EUV 與 SAQP/MOR`、`Cryo-HAR 與 Bosch TSV 蝕刻`、`FLA/LSA 零擴散退火`、`100% 保形 ALD 與選擇性磊晶`、`3D 混合鍵合 1–3 nm 銅內凹 CMP`、`Siconi 乾洗與 SCCO₂ 超臨界零張力乾燥`、`無阻障 Co/Ru/Mo 與 Air-Gap/BSPDN`、`GAA/CFET`、`CD-SAXS / C-SAM / 3D X-Ray CT / LIT`）及 `data/情境路徑.js` 中英雙語導覽節點全面升級對齊全書最新條例。

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

情境圖為教學摘要，不是特定晶圓廠的正式流程、配方或放行指令。工程物件使用未經實測校準的教學模型，內部計算一致不等於實體製程正確或產品效能保證。1.8.1 的局部驗證、審查及公開部署已完成；1.8.2 另完成桌面／手機 188 組圖例文字對照與四尺寸閱讀操作案例。這些證據不涵蓋實體裝置、跨瀏覽器、完整讀屏或整站全套驗證；最終提交、部署及公開資產狀態另以同版本交付紀錄核對。設計範圍見 [情境設計契約](情境設計契約.md)，版本變更見 [修訂紀錄](修訂紀錄.md)。既有正文、附錄與名詞資料保持原樣。

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
