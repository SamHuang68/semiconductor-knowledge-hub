// 編輯導覽層：每個節點回連既有教材；示意圖不代表特定晶圓廠配方。
const node = (id, title, tag, chapter, detail, look, result, next = [], meta = {}) => ({
  id, title, tag, chapter, detail, look, result, next,
  titleEn: meta.titleEn || title,
  tagEn: meta.tagEn || tag,
  detailEn: meta.detailEn || detail,
  lookEn: meta.lookEn || look,
  resultEn: meta.resultEn || result
});

export const SCENARIOS = [
  {
    id: 'journey', title: '跟著晶圓走', titleEn: 'Follow the Wafer',
    question: '一顆晶片是怎麼做出來的？', questionEn: 'How is a chip manufactured from a silicon wafer?',
    kind: 'sequence', label: '製造旅程', labelEn: 'Manufacturing Journey', icon: '◎',
    intro: '從空白晶圓到封裝晶片，先看各階段做什麼，再深入每一站。',
    introEn: 'From blank silicon wafer to packaged chip, explore what each stage achieves before deep-diving into individual stations.',
    boundary: '這是製造階段的教學總覽。晶圓製造會反覆經過微影、薄膜、蝕刻、清洗與量測，並非每個模組只做一次。',
    boundaryEn: 'This is a pedagogical overview of manufacturing stages. Wafer fabrication repeatedly cycles through lithography, deposition, etching, cleaning, and metrology; modules are not executed only once.',
    nodes: [
      node('wafer', '準備晶圓', '材料', 'ch03', '11N 純度單晶矽（CZ/MCZ）經鑽石線切、CMP 鏡面拋光與外延磊晶（或製備為 FD/RF/SiPh SOI 與 3D LTHC 承載晶圓），成為後續製造的完美基板。', '晶圓表面與材料品質', '可進入製程的矽晶圓', [], {
        titleEn: 'Prepare Wafer', tagEn: 'Material',
        detailEn: '11N monocrystalline silicon (CZ/MCZ) is diamond-wire sliced, mirror-polished, and epitaxially grown (or engineered into FD/RF/SiPh SOI and 3D LTHC carrier wafers) as pristine substrates.',
        lookEn: 'Wafer surface and crystal quality', resultEn: 'Silicon wafer ready for fabrication'
      }),
      node('transistor', '形成電晶體', 'FEOL', 'ch11', '透過 STI 隔離、離子佈植與毫秒／奈秒退火、SiGe 應變磊晶、HKMG 替代金屬閘極構築 Planar / FinFET / GAA 奈米片與 CFET 電晶體，並銜接 MOL (COAG/SAC/BPR)。', '元件尺寸、摻雜與電性', '可控制電流的元件結構', [], {
        titleEn: 'Form Transistors', tagEn: 'FEOL',
        detailEn: 'STI isolation, ion implant with millisecond/nanosecond anneal, strained SiGe epitaxy, and RMG HKMG construct Planar, FinFET, GAA nanosheet, and CFET transistors tied to MOL (COAG/SAC/BPR).',
        lookEn: 'Device dimensions, doping profiles, and electrical properties', resultEn: 'Device structures capable of controlling electric current'
      }),
      node('wiring', '連接金屬導線', 'BEOL', 'ch10', '以局部無阻障 Co/Ru/Mo 接觸與 12–18+ 層銅雙鑲嵌（Cu Dual-Damascene + 多孔 ULK / Air-Gap）互連電路，並可結合晶圓背面供電（BSPDN：PowerVia / SPR）分離電源與訊號。', '線路連通、絕緣與平坦度', '連接完成的晶片電路', [], {
        titleEn: 'Interconnect Metals', tagEn: 'BEOL',
        detailEn: 'Barrierless Co/Ru/Mo local contacts and 12–18+ Cu Dual-Damascene tiers (with porous ULK & Air-Gaps) wire the circuit, complemented by Backside Power Delivery (BSPDN: PowerVia / SPR).',
        lookEn: 'Line connectivity, isolation, and planarity', resultEn: 'Completed on-chip interconnect network'
      }),
      node('probe', '測試與分類', '晶圓測試', 'ch19', 'WAT 以 Kelvin 四線探針量測切割道測試鍵監控製程電性；CP 則以高針數垂直／MEMS 微機電探針卡與無凸塊混合鍵合前測試篩選出 KGD（已知合格裸晶）。', '製程監控結果與晶粒測試圖', '後續封裝用的晶粒分類資訊', [], {
        titleEn: 'Test & Classify', tagEn: 'Wafer Test',
        detailEn: 'WAT probes scribe-line PCM keys via Kelvin 4-wire needles, while CP sorts Known Good Dies (KGD) using fine-pitch vertical/MEMS probe cards and pre-bond 3D DFT/BIST.',
        lookEn: 'Process monitoring data and wafer bin maps', resultEn: 'Die classification and binning data for packaging'
      }),
      node('package', '封裝與終測', '封測', 'ch20', '合格 KGD 進入傳統封裝（打線 QFN/BGA、覆晶 C4/Cu Pillar）或 2.5D/3D/3.5D 先進封裝（CoWoS、EMIB、InFO、SoIC、Foveros、HBM），再經預燒（Burn-In）、系統級測試（SLT）與終測（FT）出貨。', '連接、散熱與可靠度', '可交付系統整合的晶片', [], {
        titleEn: 'Package & Final Test', tagEn: 'Packaging & Test',
        detailEn: 'KGD dies undergo legacy packaging (wire-bond, flip-chip C4/Cu pillar) or 2.5D/3D/3.5D advanced packaging (CoWoS, EMIB, InFO, SoIC, Foveros, HBM), followed by Burn-In, SLT, and Final Test (FT).',
        lookEn: 'Interconnects, thermal dissipation, and reliability', resultEn: 'Finished chips ready for system-level integration'
      })
    ]
  },
  {
    id: 'pattern', title: '看懂圖形轉移', titleEn: 'Pattern Transfer',
    question: '電路圖形怎麼進入材料？', questionEn: 'How are circuit patterns transferred into materials?',
    kind: 'cycle', label: '製程循環', labelEn: 'Process Cycle', icon: '▤',
    intro: '逐步查看材料剖面，理解光阻圖形與材料圖形之間的差別。',
    introEn: 'Inspect material cross-sections step-by-step to distinguish photoresist patterns from permanent material features.',
    boundary: '剖面是簡化的蝕刻路徑示意，未按比例，也未涵蓋所有膜層與配方；佈植等其他圖形化路徑請見原教材。',
    boundaryEn: 'Cross-sections represent simplified etch pattern transfers, not to scale, nor covering all thin film stacks and chemistries; see curriculum for ion implantation and other patterning routes.',
    nodes: [
      node('film', '準備薄膜', '鋪材料', 'ch05', '先以熱氧化（ISSG）、CVD/FCVD、PVD 或 ~100% 保形原子層沉積（ALD）準備待加工之介電層、硬遮罩（Hardmask）或功函數金屬薄膜。', '膜厚與均勻性', '覆蓋基板的材料層', [], {
        titleEn: 'Deposit Thin Film', tagEn: 'Film Prep',
        detailEn: 'Grow or deposit target dielectrics, hardmasks, or work-function metals via ISSG thermal oxidation, CVD/FCVD, PVD, or ~100% conformal Atomic Layer Deposition (ALD).',
        lookEn: 'Film thickness and uniformity', resultEn: 'Substrate coated with target material'
      }),
      node('resist', '塗佈光阻', '感光層', 'ch04', '於塗佈顯影機（Track）先旋塗底部抗反射塗層（BARC / Underlayer），再均勻旋塗化學增幅光阻（CAR）或高吸收率無機金屬氧化物光阻（MOR），並經軟烤（Soft Bake）定型。', '塗佈均勻性與表面狀態', '尚未形成圖形的光阻', [], {
        titleEn: 'Coat Photoresist', tagEn: 'Photosensitive',
        detailEn: 'Spin-coat Bottom Anti-Reflective Coating (BARC/underlayer) followed by Chemically Amplified Resist (CAR) or Metal Oxide Resist (MOR) on the Track, stabilized by soft baking.',
        lookEn: 'Coating uniformity and surface condition', resultEn: 'Uniform photoresist film prior to patterning'
      }),
      node('expose', '曝光與顯影', '定義圖形', 'ch04', '透過 193i 浸潤式微影（搭配 LELE/SAQP）或 13.5nm EUV（0.33 NA / 0.55 High-NA）曝光誘發光酸催化反應，經曝後烤（PEB）與 TMAH 顯影後留下奈米光阻遮罩，並執行 ADI 檢測。', '線寬與對準偏差', '有開口的光阻遮罩', [], {
        titleEn: 'Expose & Develop', tagEn: 'Pattern Define',
        detailEn: 'Expose via 193i immersion (with LELE/SAQP) or 13.5nm EUV (0.33 NA / 0.55 High-NA), perform Post-Exposure Bake (PEB) and TMAH development, and verify via ADI CD-SEM/DBO.',
        lookEn: 'Critical dimension (CD) and overlay error', resultEn: 'Patterned photoresist mask with openings'
      }),
      node('etch', '蝕刻轉移', '加工材料', 'ch06', '以 CCP/ICP 反應離子蝕刻（RIE）、Cryo-HAR 極低溫深孔蝕刻、Bosch DRIE（TSV）或原子層蝕刻（ALE）非等向性移除開口下的目標膜層，並以 OES 光譜精準偵測蝕刻終點（EPD）。', '選擇比、輪廓與終點', '材料層中的圖形', [], {
        titleEn: 'Etch Transfer', tagEn: 'Material Etch',
        detailEn: 'Anisotropically transfer the pattern using CCP/ICP RIE, Cryo-HAR etch, Bosch TSV DRIE, or Atomic Layer Etching (ALE) with Optical Emission Spectroscopy (OES) endpointing.',
        lookEn: 'Selectivity, sidewall profile, and endpoint', resultEn: 'Transferred circuit features in the material layer'
      }),
      node('clean', '去光阻與清洗', '去除殘留', 'ch09', '以氧電漿灰化（Plasma Ashing）與單片式濕洗（SPM/SC-1/DIO₃ 或 Siconi™ 乾式氣相清潔）徹底清除光阻與氟碳聚合物殘留，高深寬比結構更結合超臨界 CO₂（SCCO₂）零張力乾燥防止倒塌。', '殘留、污染與表面損傷', '清潔的圖形化材料', [], {
        titleEn: 'Strip Resist & Clean', tagEn: 'Residue Clean',
        detailEn: 'Strip resist and fluorocarbon polymers via plasma ashing, single-wafer DIO₃/RCA wet cleans, or Siconi™ dry vapor cleaning, paired with Supercritical CO₂ (SCCO₂) drying to prevent pattern collapse.',
        lookEn: 'Residue, defectivity, and surface damage', resultEn: 'Pristine, patterned material surface'
      }),
      node('measure', '量測與回饋', '確認結果', 'ch15', '於蝕刻後執行 AEI 量測（CD-SEM、OCD 散射儀、CD-SAXS、µDBO 疊對與 BBP/E-Beam VC 缺陷檢測），將誤差透過 APC Run-to-Run 回饋／前饋補償，合格後放行至下一站。', '量測結果與製程允收條件', '下一層製程或異常處置的依據', [], {
        titleEn: 'Metrology & Feedback', tagEn: 'Result Metrology',
        detailEn: 'Perform post-etch AEI via CD-SEM, OCD scatterometry, CD-SAXS, µDBO overlay, and BBP/E-Beam VC inspection, feeding deviations into APC Run-to-Run controllers before lot release.',
        lookEn: 'Measurement data and statistical acceptance criteria', resultEn: 'Clearance data for next operation or defect disposition'
      })
    ]
  },
  {
    id: 'quality', title: '處理良率異常', titleEn: 'Handle Yield Excursions',
    question: '量測發出警訊，接著怎麼辦？', questionEn: 'What happens when metrology flags an out-of-control alarm?',
    kind: 'branch', label: '判斷分支', labelEn: 'Decision Tree', icon: '◇',
    intro: '從警訊往下判斷，試走「正常」與「異常」兩條處理路徑。',
    introEn: 'Follow the alarm downstream to explore both normal monitoring and excursion containment pathways.',
    boundary: '此圖是教學情境，不是生產放行指令。管制界限不等於規格界限；實際判定、OCAP 與放行權責依各廠規範。',
    boundaryEn: 'This flowchart is an educational scenario, not an operational disposition directive. Control limits do not equal specification limits; fab-specific OCAPs and sign-off authorities govern real production.',
    nodes: [
      node('signal', '查看量測結果', '量測', 'ch15', '先確認量測機台匹配度（Tool Matching）、量測配方與 P/T Ratio（<10%）有效性，避免因量測失準（False Alarm）誤鎖正常產品批。', '量測條件、批次與站點', '可供判讀的資料', [{ label: '判讀訊號', labelEn: 'Interpret Signal', to: 'decision' }], {
        titleEn: 'Inspect Metrology Signal', tagEn: 'Metrology',
        detailEn: 'Verify metrology tool matching, recipe alignment, and gauge P/T ratio (<10%) to rule out metrology false alarms before flagging production lots.',
        lookEn: 'Inspection parameters, lot history, and station ID', resultEn: 'Valid data ready for engineering interpretation'
      }),
      node('decision', '是否觸發異常條件？', '判斷', 'ch17', '套用 SPC 管制界限（±3σ UCL/LCL）、WECO / Nelson 八大判異規則、Cpk（≥1.33/1.67）與機台 FDC 感測器波形進行綜合判讀。', 'SPC 訊號與既定判定規則', '選擇符合觀測的路徑', [{ label: '未觸發：持續監控', labelEn: 'In Control: Keep Monitoring', to: 'monitor' }, { label: '已觸發：隔離追查', labelEn: 'Excursion: Hold & Isolate', to: 'hold' }], {
        titleEn: 'Is Out-of-Control Triggered?', tagEn: 'Decision',
        detailEn: 'Evaluate ±3σ SPC control limits, WECO/Nelson run rules, Cpk indices (≥1.33/1.67), and FDC equipment trace sensors holistically.',
        lookEn: 'SPC signals and established disposition rules', resultEn: 'Branching decision based on observed data'
      }),
      node('monitor', '持續監控', '正常路徑', 'ch17', '依既定流程繼續作業與監控；沒有觸發警訊不代表免除後續檢查。', '趨勢是否改變', '保留製程與量測紀錄', [{ label: '返回量測', labelEn: 'Return to Metrology', to: 'signal' }], {
        titleEn: 'Continuous Monitoring', tagEn: 'Normal Path',
        detailEn: 'Proceed with standard production flow and SPC tracking; absence of alarms does not waive subsequent routine inspections.',
        lookEn: 'Trends and shifts in key metrics', resultEn: 'Preserved process logs and metrology records'
      }),
      node('hold', '暫停與圈定範圍', '異常路徑', 'ch18', '立即依 OCAP 鎖定異常批（Hold Lot）與嫌疑腔體（Down Chamber），啟動「章魚防堵法（Octopus Containment）」向前後展開清查所有同腔體、同載具之姊妹批（Sister Lots）。', '受影響批次、時間與機台', '待調查範圍與保留證據', [{ label: '追查根因', labelEn: 'Investigate Root Cause', to: 'cause' }], {
        titleEn: 'Hold & Containment', tagEn: 'Excursion Path',
        detailEn: 'Execute OCAP to hold suspect lots and down the chamber, launching Octopus Containment upstream and downstream to quarantine all sister lots sharing the same tool or carrier window.',
        lookEn: 'Affected lot list, tool IDs, and time windows', resultEn: 'Contained scope and quarantined evidence for root cause analysis'
      }),
      node('cause', '分析與修正', '追查', 'ch16', '結合晶圓圖空間特徵（環狀／刮痕／群聚）、超幾何機台共性統計（Commonality）與 EFA/PFA（PEM / OBIRCH / LIT 3D 鎖相熱成像 / Xe⁺ PFIB / STEM），依 8D 程序定位物理根因。', '假設是否有證據支持', '有依據的修正與驗證方案', [{ label: '確認修正結果', labelEn: 'Verify Corrective Action', to: 'release' }], {
        titleEn: 'Analyze & Correct', tagEn: 'Investigation',
        detailEn: 'Combine wafer-map spatial signatures, hypergeometric tool commonality, and EFA/PFA (PEM/OBIRCH/3D LIT + Xe⁺ PFIB/STEM) under the 8D methodology to prove physical root cause.',
        lookEn: 'Evidence supporting the root-cause hypothesis', resultEn: 'Validated corrective action and verification plan'
      }),
      node('release', '驗證與放行評估', '驗證', 'ch18', '完成機台維修養腔（Season & Qual）與系統防呆互鎖（Poka-Yoke）後，由 MRB 物料審查委員會與車規 PAT/SBL 篩選機制決定批次重工（Rework）、放行（Release）或報廢（Scrap）。', '恢復條件、結果與核准紀錄', '放行評估或回到調查', [{ label: '仍不符合：回到調查', labelEn: 'Unresolved: Return to Analysis', to: 'cause' }, { label: '符合並核准：持續監控', labelEn: 'Resolved & Approved: Monitor', to: 'monitor' }], {
        titleEn: 'Verify & Disposition', tagEn: 'Disposition',
        detailEn: 'Following chamber seasoning/qual and Poka-Yoke interlocks, convene the Material Review Board (MRB) with PAT/SBL screening to authorize Rework, Release, or Scrap.',
        lookEn: 'Recovery criteria, test results, and approval sign-offs', resultEn: 'Disposition authorization or loopback to investigation'
      })
    ]
  },
  {
    id: 'packaging', title: '比較封裝路線', titleEn: 'Compare Packaging Architectures',
    question: '晶粒要如何連在一起？', questionEn: 'How are semiconductor dies interconnected?',
    kind: 'compare', label: '結構比較', labelEn: 'Architecture Comparison', icon: '▱',
    intro: '切換三種整合概念，對照連接方式、工程重點與閱讀入口。',
    introEn: 'Switch across three packaging concepts to contrast interconnect schemes, engineering trade-offs, and reading chapters.',
    boundary: '三種結構是並列選項，並非先後步驟或優劣排名。示意不代表特定 CoWoS／SoIC 產品，也不涵蓋所有封裝變體。',
    boundaryEn: 'These three architectures are parallel options, not sequential steps or rankings. Schematics do not depict specific commercial CoWoS or SoIC products, nor encompass all packaging variants.',
    nodes: [
      node('single', '單晶粒封裝', '一顆晶粒', 'ch20', '以封裝提供晶粒保護及外部連接，可採打線（Wire Bonding）、覆晶（Flip-Chip C4）或晶圓級／面板級扇出型封裝（InFO-RDL、FOWLP、FO-PLP）等不同連接方式。', '接點、基板、散熱與可靠度', '先理解晶粒到電路板的連接', [], {
        titleEn: 'Single-Die Packaging', tagEn: 'Single Die',
        detailEn: 'Provides die protection and board-level connectivity via wire bonding, flip-chip C4 bumping, or wafer/panel-level fan-out packaging (InFO-RDL, FOWLP, FO-PLP).',
        lookEn: 'Contact pads, substrate, thermal dissipation, and reliability', resultEn: 'Foundational understanding of die-to-PCB interconnects'
      }),
      node('interposer', '2.5D 整合', '並排連接', 'ch21', '多顆晶粒透過中介層或局部矽橋等結構並排互連（涵蓋矽中介層 CoWoS-S／I-CubeS、有機重佈線中介層 CoWoS-R／FOCoS，以及局部矽橋 CoWoS-L／EMIB／EMIB-T／I-CubeE／H-Cube／FOEB），常見討論包含邏輯晶粒與 HBM 記憶體整合。', '互連密度、基板與整合良率', '理解橫向整合的連接路徑', [], {
        titleEn: '2.5D Interposer Integration', tagEn: 'Side-by-Side',
        detailEn: 'Interconnects multiple dies side-by-side on a silicon/organic interposer or local silicon bridge (spanning CoWoS-S/I-CubeS, organic RDL CoWoS-R/FOCoS, and silicon-bridge CoWoS-L/EMIB/EMIB-T/I-CubeE/H-Cube/FOEB), standard for logic-HBM integration.',
        lookEn: 'Interconnect density, warpage, and composite yield', resultEn: 'Appreciation of lateral high-density interconnect schemes'
      }),
      node('stack', '3D 整合', '垂直堆疊', 'ch21', '透過垂直堆疊與鍵合縮短晶粒間連接；不同實作可採不同互連技術：涵蓋無凸塊銅對銅混合鍵合（TSMC SoIC-X [CoW/WoW]、Intel Foveros Direct、Samsung X-Cube [Hybrid]／SAINT-S/D/L、3D NAND CBA、堆疊式 CIS）、微凸塊與 TSV 垂直堆疊（TSMC SoIC-P、Intel Foveros／Foveros Omni、Samsung X-Cube [µBump]、HBM [TC-NCF／MR-MUF]、3DS DRAM、InFO-PoP／InFO-3D），以及結合 3D 堆疊與 2.5D 中介層的 3.5D 複合異質整合（CoWoS + SoIC、Co-EMIB）。', '鍵合對準、熱管理與測試', '理解堆疊之後的工程取捨', [], {
        titleEn: '3D Vertical Integration', tagEn: 'Vertical Stack',
        detailEn: 'Vertically stacks and bonds dies with direct Cu-Cu bonding or microbumps to minimize interconnect delay: spanning bumpless hybrid bonding (TSMC SoIC-X [CoW/WoW], Intel Foveros Direct, Samsung X-Cube [Hybrid]/SAINT-S/D/L, 3D NAND CBA, stacked CIS), microbump/TSV 3D stacking (TSMC SoIC-P, Intel Foveros/Foveros Omni, Samsung X-Cube [µBump], HBM [TC-NCF/MR-MUF], 3DS DRAM, InFO-PoP/InFO-3D), and 3.5D hybrid integration (CoWoS + SoIC, Co-EMIB).',
        lookEn: 'Bond alignment accuracy, thermal throttling, and KGD testability', resultEn: 'Comprehension of volumetric density and 3D design trade-offs'
      })
    ]
  },
  {
    id: 'dispatch', title: '走進晶圓廠', titleEn: 'Inside the Fab',
    question: '一批晶圓如何到達下一站？', questionEn: 'How does a lot navigate to its next processing station?',
    kind: 'sequence', label: '角色交接', labelEn: 'Role Hand-off', icon: '⇄',
    intro: '把批次、系統、搬運與機台串起來，理解 Route 和 Recipe 的不同角色。',
    introEn: 'Connect lots, software systems, automated material handling, and tools to clarify the distinct roles of Route vs Recipe.',
    boundary: '這是簡化的角色交接。實際派工優先順序、搬運方式、鎖批與重工路徑依晶圓廠配置及規範。',
    boundaryEn: 'This is a streamlined model of fab hand-offs. Real-world dispatch priorities, automated transport schedules, hold dispositions, and rework routes depend on factory automation policies.',
    nodes: [
      node('route', '確認製程路徑', 'MES', 'ch23', 'MES 製造執行系統核對晶圓批號、製程流程卡（Route）、Q-Time 倒數計時視窗，以及是否掛有 Hold 或 Future-Hold 攔截旗標。', '批次身分與流程狀態', '可進行的下一道作業', [], {
        titleEn: 'Confirm Process Route', tagEn: 'MES',
        detailEn: 'MES validates lot genealogy, active Process Route, remaining Q-Time countdown timers, and any active Hold or Future-Hold flags.',
        lookEn: 'Lot traveler, current station, and hold status', resultEn: 'Authorized next manufacturing operation'
      }),
      node('dispatch', '派工與排程', '派工系統', 'ch01', 'RTD 即時派工系統每數秒綜合評估 WIP 佇列、Super Hot Lot 優先權、Q-Time 剩餘秒數與綁機規則（Dedication），向 MCS 下達最佳搬運指令。', '機台可用狀態與等待時間', '加工與搬運安排', [], {
        titleEn: 'Dispatch & Schedule', tagEn: 'Dispatcher',
        detailEn: 'The Real-Time Dispatcher (RTD) evaluates WIP queues, Super Hot Lot priority, Q-Time urgency, and chamber dedication rules every few seconds to issue MCS transport commands.',
        lookEn: 'Tool availability and lot wait times', resultEn: 'Scheduled tool assignment and transport request'
      }),
      node('transport', '搬運晶圓盒', 'AMHS／FOUP', 'ch01', '晶圓密封於充氮微環境 FOUP 中，由高架天車（OHT）沿空中軌道高速運送，並透過 SEMI E84 光學交握安全降落至目標機台 Load Port。', '晶圓盒與機台身分是否一致', '到達機台的批次', [], {
        titleEn: 'Transport FOUP', tagEn: 'AMHS / FOUP',
        detailEn: 'Wafers sealed inside N₂-purged FOUPs travel via Overhead Hoist Transport (OHT) and dock onto the target Load Port using SEMI E84 optical handshaking.',
        lookEn: 'FOUP RFID match against load port sensor', resultEn: 'Lot docked and clamped at the target tool'
      }),
      node('recipe', '核對與加工', '機台／Recipe', 'ch23', 'EAP 讀取 FOUP RFID 後與 MES 及 RMS（配方管理系統）完成零接觸三方防呆比對（Zero-Touch Track-In），透過 SECS/GEM300 自動下載 Golden Recipe 並同步串流 Interface A 感測資料。', '防呆檢查與機台紀錄', '完成本次加工', [], {
        titleEn: 'Verify & Process', tagEn: 'Tool / Recipe',
        detailEn: 'EAP verifies FOUP RFID against MES and RMS for Zero-Touch Track-In via SECS/GEM300, downloading the Golden Recipe while streaming high-speed Interface A trace data.',
        lookEn: 'Poka-yoke validation and in-situ tool trace logs', resultEn: 'Execution of target physical/chemical transformation'
      }),
      node('record', '記錄與下一站', 'MES／量測', 'ch23', 'Track-Out 出站自動將腔體編號、配方雜湊、FDC 統計特徵與晶圓槽位完整寫入單晶圓族譜（Wafer Genealogy），無縫觸發下一站派工或 3D 封裝晶粒級追溯。', '履歷完整性與下一站條件', '可追溯的晶圓旅程', [], {
        titleEn: 'Log & Next Station', tagEn: 'MES / Metrology',
        detailEn: 'Track-Out commits chamber IDs, recipe checksums, and FDC trace summaries into single-wafer genealogy, triggering the next RTD dispatch or 3D die-level traceability.',
        lookEn: 'Traceability integrity and gate clearance', resultEn: 'Updated genealogy in the wafer\'s traceable journey'
      })
    ]
  }
];

export function getScenario(id) { return SCENARIOS.find(s => s.id === id) || SCENARIOS[0]; }
export function scenarioForChapter(id) { return SCENARIOS.find(s => s.nodes.some(n => n.chapter === id)) || SCENARIOS[0]; }

// 返回上下文只接受本站已知且與本章相符的節點，不信任網址中的任意文字。
export function chapterReturnContext(chapter, value) {
  const parts = (value || '').split('/');
  if (parts.length !== 2) return null;
  const scenario = SCENARIOS.find(s => s.id === parts[0]);
  const node = scenario?.nodes.find(n => n.id === parts[1] && n.chapter === chapter);
  return node ? { scenario, node, value: `${scenario.id}/${node.id}` } : null;
}
