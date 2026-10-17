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
      node('film', '準備薄膜', '鋪材料', 'ch05', '先準備待加工的薄膜。材料及沉積方式取決於該層的功能。', '膜厚與均勻性', '覆蓋基板的材料層', [], {
        titleEn: 'Deposit Thin Film', tagEn: 'Film Prep',
        detailEn: 'Deposit target thin films for processing. Material and deposition techniques depend on the layer\'s electrical or optical function.',
        lookEn: 'Film thickness and uniformity', resultEn: 'Substrate coated with target material'
      }),
      node('resist', '塗佈光阻', '感光層', 'ch04', '光阻覆蓋待加工表面，後續以曝光與顯影形成暫時的遮罩。', '塗佈均勻性與表面狀態', '尚未形成圖形的光阻', [], {
        titleEn: 'Coat Photoresist', tagEn: 'Photosensitive',
        detailEn: 'Photoresist coats the working surface, forming a temporary mask after subsequent exposure and development.',
        lookEn: 'Coating uniformity and surface condition', resultEn: 'Uniform photoresist film prior to patterning'
      }),
      node('expose', '曝光與顯影', '定義圖形', 'ch04', '曝光使光阻產生化學變化，顯影後留下所需的圖形。此時下方材料尚未被蝕刻。', '線寬與對準偏差', '有開口的光阻遮罩', [], {
        titleEn: 'Expose & Develop', tagEn: 'Pattern Define',
        detailEn: 'Photolithography exposes resist to induce chemical changes; development reveals the pattern while underlying material remains intact.',
        lookEn: 'Critical dimension (CD) and overlay error', resultEn: 'Patterned photoresist mask with openings'
      }),
      node('etch', '蝕刻轉移', '加工材料', 'ch06', '以光阻或硬遮罩保護部分區域，去除開口下的目標材料。', '選擇比、輪廓與終點', '材料層中的圖形', [], {
        titleEn: 'Etch Transfer', tagEn: 'Material Etch',
        detailEn: 'Protected by photoresist or hard mask, exposed areas of target material are selectively removed.',
        lookEn: 'Selectivity, sidewall profile, and endpoint', resultEn: 'Transferred circuit features in the material layer'
      }),
      node('clean', '去光阻與清洗', '去除殘留', 'ch09', '加工後移除暫時的光阻與殘留物，為下一步準備表面。', '殘留、污染與表面損傷', '清潔的圖形化材料', [], {
        titleEn: 'Strip Resist & Clean', tagEn: 'Residue Clean',
        detailEn: 'Post-etch photoresist stripping and residue cleaning condition the wafer surface for the next operation.',
        lookEn: 'Residue, defectivity, and surface damage', resultEn: 'Pristine, patterned material surface'
      }),
      node('measure', '量測與回饋', '確認結果', 'ch15', '依站點要求量測尺寸或檢查缺陷，合格後才能依流程進入下一層。', '量測結果與製程允收條件', '下一層製程或異常處置的依據', [], {
        titleEn: 'Metrology & Feedback', tagEn: 'Result Metrology',
        detailEn: 'Inspect dimensions (CD) or scan for defectivity according to station criteria before advancing down the routing.',
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
      node('signal', '查看量測結果', '量測', 'ch15', '先確認量測對象、條件與資料有效性，再檢視製程訊號。', '量測條件、批次與站點', '可供判讀的資料', [{ label: '判讀訊號', labelEn: 'Interpret Signal', to: 'decision' }], {
        titleEn: 'Inspect Metrology Signal', tagEn: 'Metrology',
        detailEn: 'Verify measurement targets, recipes, and data integrity before analyzing process signals.',
        lookEn: 'Inspection parameters, lot history, and station ID', resultEn: 'Valid data ready for engineering interpretation'
      }),
      node('decision', '是否觸發異常條件？', '判斷', 'ch17', '檢查管制圖、規格與異常規則；不能只憑單一良率數字判定根因。', 'SPC 訊號與既定判定規則', '選擇符合觀測的路徑', [{ label: '未觸發：持續監控', labelEn: 'In Control: Keep Monitoring', to: 'monitor' }, { label: '已觸發：隔離追查', labelEn: 'Excursion: Hold & Isolate', to: 'hold' }], {
        titleEn: 'Is Out-of-Control Triggered?', tagEn: 'Decision',
        detailEn: 'Evaluate SPC control charts, spec limits, and Nelson/Western Electric rules; never diagnose root causes solely on a single yield figure.',
        lookEn: 'SPC signals and established disposition rules', resultEn: 'Branching decision based on observed data'
      }),
      node('monitor', '持續監控', '正常路徑', 'ch17', '依既定流程繼續作業與監控；沒有觸發警訊不代表免除後續檢查。', '趨勢是否改變', '保留製程與量測紀錄', [{ label: '返回量測', labelEn: 'Return to Metrology', to: 'signal' }], {
        titleEn: 'Continuous Monitoring', tagEn: 'Normal Path',
        detailEn: 'Proceed with standard production flow and SPC tracking; absence of alarms does not waive subsequent routine inspections.',
        lookEn: 'Trends and shifts in key metrics', resultEn: 'Preserved process logs and metrology records'
      }),
      node('hold', '暫停與圈定範圍', '異常路徑', 'ch18', '依 OCAP 暫停受影響批次或機台，追溯共同經過的站點與加工歷史。', '受影響批次、時間與機台', '待調查範圍與保留證據', [{ label: '追查根因', labelEn: 'Investigate Root Cause', to: 'cause' }], {
        titleEn: 'Hold & Containment', tagEn: 'Excursion Path',
        detailEn: 'Execute OCAP to hold suspect lots or freeze tools, tracing common equipment history and processing timestamps.',
        lookEn: 'Affected lot list, tool IDs, and time windows', resultEn: 'Contained scope and quarantined evidence for root cause analysis'
      }),
      node('cause', '分析與修正', '追查', 'ch16', '結合缺陷分布、製程履歷與故障分析，驗證可能原因，再採取修正。', '假設是否有證據支持', '有依據的修正與驗證方案', [{ label: '確認修正結果', labelEn: 'Verify Corrective Action', to: 'release' }], {
        titleEn: 'Analyze & Correct', tagEn: 'Investigation',
        detailEn: 'Synthesize spatial wafer maps, tool logs, and failure analysis (FA) to substantiate hypotheses before deploying corrective actions.',
        lookEn: 'Evidence supporting the root-cause hypothesis', resultEn: 'Validated corrective action and verification plan'
      }),
      node('release', '驗證與放行評估', '驗證', 'ch18', '確認改善結果，依權責評估放行；未滿足條件就保持管制並繼續調查。', '恢復條件、結果與核准紀錄', '放行評估或回到調查', [{ label: '仍不符合：回到調查', labelEn: 'Unresolved: Return to Analysis', to: 'cause' }, { label: '符合並核准：持續監控', labelEn: 'Resolved & Approved: Monitor', to: 'monitor' }], {
        titleEn: 'Verify & Disposition', tagEn: 'Disposition',
        detailEn: 'Validate improvement effectiveness and evaluate lot release per governance; maintain quarantine if conditions remain unsatisfied.',
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
      node('route', '確認製程路徑', 'MES', 'ch23', '依批次履歷與 Route 確認下一道作業，並檢查是否有鎖批或其他限制。', '批次身分與流程狀態', '可進行的下一道作業', [], {
        titleEn: 'Confirm Process Route', tagEn: 'MES',
        detailEn: 'Query lot history and MES Route to verify the next valid station while verifying holds or inhibitory flags.',
        lookEn: 'Lot traveler, current station, and hold status', resultEn: 'Authorized next manufacturing operation'
      }),
      node('dispatch', '派工與排程', '派工系統', 'ch01', '依機台能力、批次優先順序與時間限制安排加工順序。', '機台可用狀態與等待時間', '加工與搬運安排', [], {
        titleEn: 'Dispatch & Schedule', tagEn: 'Dispatcher',
        detailEn: 'Prioritize and queue lots based on tool readiness, lot urgency (hot lots), and queue time (Q-time) constraints.',
        lookEn: 'Tool availability and lot wait times', resultEn: 'Scheduled tool assignment and transport request'
      }),
      node('transport', '搬運晶圓盒', 'AMHS／FOUP', 'ch01', '晶圓放在晶圓盒內，透過搬運系統送至指定機台。', '晶圓盒與機台身分是否一致', '到達機台的批次', [], {
        titleEn: 'Transport FOUP', tagEn: 'AMHS / FOUP',
        detailEn: 'Wafers are sealed in FOUP pods and delivered to the tool load port via Automated Material Handling Systems (AMHS/OHT).',
        lookEn: 'FOUP RFID match against load port sensor', resultEn: 'Lot docked and clamped at the target tool'
      }),
      node('recipe', '核對與加工', '機台／Recipe', 'ch23', '確認產品、站點及配方相符後執行作業；配方定義本次加工參數。', '防呆檢查與機台紀錄', '完成本次加工', [], {
        titleEn: 'Verify & Process', tagEn: 'Tool / Recipe',
        detailEn: 'Enforce recipe management verification to ensure matching product, layer, and chamber parameters before execution.',
        lookEn: 'Poka-yoke validation and in-situ tool trace logs', resultEn: 'Execution of target physical/chemical transformation'
      }),
      node('record', '記錄與下一站', 'MES／量測', 'ch23', '回寫加工履歷，按流程進行必要量測與後續派工。', '履歷完整性與下一站條件', '可追溯的晶圓旅程', [], {
        titleEn: 'Log & Next Station', tagEn: 'MES / Metrology',
        detailEn: 'Commit run-time history to MES database, advancing traveler to required metrology or the next production step.',
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
