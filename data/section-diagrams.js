// 段落流程圖與結構圖規格：依 chapterId 與 h2 標題（中英文）插入；繪製見 section-diagrams.js。
// 規則：標籤取自該段正文、不另編數字；圖內文字不得含阿拉伯數字；正文文字不因加圖而刪減。
// 由設計者依段落正文提案，經獨立查核者逐張比對正文後保留或修正；檢查見 scripts/test-section-diagrams.mjs。
export const SECTION_DIAGRAMS = [
  {
    "chapterId": "ch00",
    "headingZh": "誰負責什麼：半導體產業的分工",
    "headingEn": "Who does what: how the industry divides the work",
    "type": "pictorial",
    "draw": "industryMap",
    "captionZh": "晶片分工地圖：設計、製造、封裝測試各由誰負責。",
    "captionEn": "Who does which part: design, manufacturing, assembly and test.",
    "labels": [
      {
        "key": "idm",
        "zh": "整合元件製造廠（IDM）",
        "en": "Integrated device manufacturer (IDM)"
      },
      {
        "key": "idmDoes",
        "zh": "從設計、製造到銷售都自己來",
        "en": "Designs, manufactures and sells its own chips"
      },
      {
        "key": "zoneDesign",
        "zh": "設計",
        "en": "Design"
      },
      {
        "key": "zoneMake",
        "zh": "製造",
        "en": "Manufacturing"
      },
      {
        "key": "zoneTest",
        "zh": "封裝測試",
        "en": "Assembly and test"
      },
      {
        "key": "fabless",
        "zh": "IC 設計公司（Fabless）",
        "en": "Fabless IC design company"
      },
      {
        "key": "fablessDoes",
        "zh": "設計晶片的電路，但沒有自己的工廠",
        "en": "Designs the circuits of the chip but owns no factory"
      },
      {
        "key": "foundry",
        "zh": "晶圓代工廠（Foundry）",
        "en": "Foundry"
      },
      {
        "key": "foundryDoes",
        "zh": "接受設計公司委託",
        "en": "for its design customers"
      },
      {
        "key": "idmShort",
        "zh": "IDM",
        "en": "IDM"
      },
      {
        "key": "idmMakes",
        "zh": "主要製造自己設計的產品",
        "en": "mainly makes its own products"
      },
      {
        "key": "osat",
        "zh": "封裝測試廠（OSAT）",
        "en": "Outsourced semiconductor assembly and test (OSAT)"
      },
      {
        "key": "osatDoes",
        "zh": "把晶圓切成一顆顆晶片、封裝並測試",
        "en": "Cuts wafers into individual chips, packages them and tests them"
      },
      {
        "key": "suppliers",
        "zh": "設備與材料供應商",
        "en": "Equipment and materials suppliers"
      },
      {
        "key": "supplies",
        "zh": "機台、化學品、氣體、晶圓",
        "en": "tools, chemicals, gases and wafers"
      }
    ]
  },
  {
    "chapterId": "ch00",
    "headingZh": "前段與後段",
    "headingEn": "Front end and back end",
    "type": "pictorial",
    "draw": "frontBack",
    "captionZh": "前段與後段的常見分法，以及廠內 FEOL／BEOL 用法",
    "captionEn": "Front end versus back end: the usual split and the in-fab FEOL/BEOL meaning",
    "labels": [
      {
        "key": "common",
        "zh": "最常見的分法",
        "en": "The most common way to divide"
      },
      {
        "key": "fe",
        "zh": "前段",
        "en": "Front end"
      },
      {
        "key": "feSub",
        "zh": "晶圓製造",
        "en": "wafer fabrication"
      },
      {
        "key": "feNote",
        "zh": "在晶圓廠裡，把電路一層一層做在晶圓上",
        "en": "Inside the fab, the circuit is built on the wafer layer by layer"
      },
      {
        "key": "most",
        "zh": "最花時間的部分",
        "en": "The most time-consuming part"
      },
      {
        "key": "months",
        "zh": "兩到三個月甚至更久",
        "en": "Two to three months or longer"
      },
      {
        "key": "be",
        "zh": "後段",
        "en": "Back end"
      },
      {
        "key": "beSub",
        "zh": "封裝與測試",
        "en": "packaging and test"
      },
      {
        "key": "test",
        "zh": "測試",
        "en": "Tested"
      },
      {
        "key": "cut",
        "zh": "切割",
        "en": "Cut"
      },
      {
        "key": "pack",
        "zh": "封裝",
        "en": "Packaged"
      },
      {
        "key": "chip",
        "zh": "可以焊到電路板上的晶片",
        "en": "Chips that can be soldered onto circuit boards"
      },
      {
        "key": "inside",
        "zh": "晶圓廠內部",
        "en": "Inside a fab"
      },
      {
        "key": "feol",
        "zh": "前段（FEOL）",
        "en": "Front end of line (FEOL)"
      },
      {
        "key": "feolD",
        "zh": "製造電晶體的步驟",
        "en": "The steps that build transistors"
      },
      {
        "key": "beol",
        "zh": "後段（BEOL）",
        "en": "Back end of line (BEOL)"
      },
      {
        "key": "beolD",
        "zh": "做金屬導線的步驟",
        "en": "The steps that build metal wiring"
      },
      {
        "key": "ctx",
        "zh": "聽到時要看上下文判斷",
        "en": "Use the context to tell which one is meant"
      }
    ]
  },
  {
    "chapterId": "ch00",
    "headingZh": "不斷重複的循環",
    "headingEn": "A loop that repeats again and again",
    "type": "cycle",
    "captionZh": "前段製程每一層反覆經過的同一組動作。",
    "captionEn": "The same set of actions the front end repeats for each layer.",
    "steps": [
      {
        "zh": "鋪上材料",
        "en": "Deposit a material",
        "icon": "layers"
      },
      {
        "zh": "用微影定義圖形",
        "en": "Define a pattern with lithography",
        "icon": "litho"
      },
      {
        "zh": "蝕刻或佈植",
        "en": "Etch or implant",
        "icon": "etch"
      },
      {
        "zh": "清洗",
        "en": "Clean",
        "icon": "clean"
      },
      {
        "zh": "量測",
        "en": "Measure",
        "icon": "microscope"
      }
    ],
    "centerZh": "逐層重複",
    "centerEn": "Repeated layer by layer"
  },
  {
    "chapterId": "ch00",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "flow",
    "foldSection": true,
    "captionZh": "晶粒面積、良率與成本如何推向小晶片與堆疊前篩選。",
    "captionEn": "How die area, yield and cost lead to chiplets and pre-bond KGD screening.",
    "steps": [
      {
        "zh": "晶粒面積放大",
        "en": "Die area grows",
        "noteZh": "毛晶粒變少、邊緣廢料多",
        "noteEn": "Fewer gross dies, more edge loss"
      },
      {
        "zh": "良率超線性崩跌",
        "en": "Yield decays super-linearly"
      },
      {
        "zh": "好晶粒成本暴增",
        "en": "Good-die cost escalates"
      },
      {
        "zh": "拆解為高良率小晶片",
        "en": "Split into high-yield chiplets"
      },
      {
        "zh": "堆疊使組合良率下降",
        "en": "Stacking drops compound yield",
        "noteZh": "各顆裸晶良率相乘",
        "noteEn": "Die yields multiply together"
      },
      {
        "zh": "堆疊前篩選合格裸晶",
        "en": "Pre-bond KGD screening",
        "noteZh": "單次鍵合良率也須極高",
        "noteEn": "Per-tier bonding yield must be very high"
      }
    ]
  },
  {
    "chapterId": "ch00",
    "headingZh": "價值鏈與 Foundry 2.0 條例總覽",
    "headingEn": "Value Chain & Foundry 2.0 Clauses",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "Foundry 2.0 生態系六類分工與各自的演進。",
    "captionEn": "The six Foundry 2.0 ecosystem roles and how each is evolving.",
    "columns": [
      {
        "titleZh": "設計與矽智財",
        "titleEn": "Design & IP",
        "items": [
          {
            "zh": "EDA 與矽智財供應商",
            "en": "EDA & silicon IP vendors",
            "noteZh": "導入 AI 輔助佈局",
            "noteEn": "AI-driven physical design",
            "icon": "eda"
          },
          {
            "zh": "無廠 IC 設計與雲端業者",
            "en": "Fabless design houses & hyperscalers",
            "noteZh": "轉向多晶粒拆分",
            "noteEn": "Shift to chiplet disaggregation",
            "icon": "cloud"
          }
        ]
      },
      {
        "titleZh": "晶圓製造",
        "titleEn": "Wafer fabrication",
        "items": [
          {
            "zh": "純晶圓代工整合平台",
            "en": "Pure-play foundry platforms",
            "noteZh": "前段與先進封裝在廠內合一",
            "noteEn": "Front end and packaging converge in-house",
            "icon": "fab"
          },
          {
            "zh": "整合元件製造廠 IDM",
            "en": "Integrated device manufacturers (IDM)",
            "noteZh": "記憶體廠主導 HBM 堆疊",
            "noteEn": "Memory IDMs lead HBM stacking",
            "icon": "circuit"
          }
        ]
      },
      {
        "titleZh": "封測與供應鏈",
        "titleEn": "Assembly, test & supply chain",
        "items": [
          {
            "zh": "委外封裝測試廠 OSAT",
            "en": "Outsourced assembly & test (OSAT)",
            "noteZh": "升級至中道製程",
            "noteEn": "Moves into middle-end processing",
            "icon": "package"
          },
          {
            "zh": "設備、材料與特氣供應商",
            "en": "Equipment & materials suppliers",
            "noteZh": "晶圓廠與封裝廠的物理基石",
            "noteEn": "Physical foundation of fabs and packaging",
            "icon": "gas-cylinder"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch00",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "全旅程三大跨站失效徵兆與防堵對策。",
    "captionEn": "Three cross-value-chain failure signatures and their containment.",
    "root": {
      "zh": "全旅程跨站失效",
      "en": "Cross-value-chain failures"
    },
    "branches": [
      {
        "zh": "良率驟跌與光罩拼接斷路",
        "en": "Yield crash and stitch-line opens",
        "leafZh": "拆解為小晶片，拼接區重疊曝光",
        "leafEn": "Chiplet partitioning; stitch overlap zones"
      },
      {
        "zh": "漏網壞晶使堆疊模組報廢",
        "en": "KGD escape scraps whole module",
        "leafZh": "PAT 離群篩選與通道備援修復",
        "leafEn": "PAT outlier screening and lane repair"
      },
      {
        "zh": "跨廠交接焊墊氧化與受潮",
        "en": "Handover pad oxidation, moisture",
        "leafZh": "充氮 FOUP 運送並電漿預清洗",
        "leafEn": "Nitrogen-purged FOUPs, plasma pre-clean"
      }
    ]
  },
  {
    "chapterId": "ch00",
    "headingZh": "一片晶圓的旅程",
    "headingEn": "The journey of one wafer",
    "type": "pictorial",
    "draw": "scaleTiles",
    "sourcedNumbers": true,
    "sourceZh": "三組數量都照本段正文的說法寫，沒有換算成阿拉伯數字。",
    "sourceEn": "All three quantities are worded as in this section and are not converted into figures.",
    "captionZh": "一顆晶片與一片晶圓的規模",
    "captionEn": "The scale of one chip and one wafer",
    "labels": [
      {
        "key": "chipLead",
        "zh": "一顆指甲大小的晶片上",
        "en": "A chip the size of a fingernail can hold"
      },
      {
        "key": "transistors",
        "zh": "數十億到上千億",
        "en": "Billions or even hundreds of billions"
      },
      {
        "key": "unitTr",
        "zh": "個電晶體",
        "en": "transistors"
      },
      {
        "key": "waferLead",
        "zh": "一片晶圓要經過",
        "en": "A wafer goes through"
      },
      {
        "key": "steps",
        "zh": "數百到上千",
        "en": "Hundreds to more than a thousand"
      },
      {
        "key": "unitSt",
        "zh": "個步驟",
        "en": "steps"
      },
      {
        "key": "months",
        "zh": "好幾個月",
        "en": "Several months"
      },
      {
        "key": "usable",
        "zh": "才能變成可以使用的晶片",
        "en": "before it becomes usable chips"
      }
    ]
  },
  {
    "chapterId": "ch00",
    "headingZh": "工廠裡的三個基本單位",
    "headingEn": "Three basic units in the fab",
    "type": "pictorial",
    "draw": "threeUnits",
    "sourcedNumbers": true,
    "sourceZh": "最多 25 片出自本段表格；晶圓盒內的片數、路線上的步驟數與機台畫面都是示意。",
    "sourceEn": "Up to 25 comes from the table in this section. The wafers in the carrier, the steps on the route and the tool screen are schematic.",
    "captionZh": "Lot 沿著 Route 前進，每一站套用 Recipe",
    "captionEn": "A lot moves along its route, and each step applies a recipe",
    "labels": [
      {
        "key": "lot",
        "zh": "Lot（批）",
        "en": "Lot"
      },
      {
        "key": "lotDef",
        "zh": "一起移動、一起生產的一組晶圓",
        "en": "A group of wafers that move and are processed together"
      },
      {
        "key": "max",
        "zh": "最多 25 片",
        "en": "Up to 25 wafers"
      },
      {
        "key": "carrier",
        "zh": "晶圓盒",
        "en": "Wafer carrier"
      },
      {
        "key": "route",
        "zh": "Route（流程）",
        "en": "Route"
      },
      {
        "key": "routeDef",
        "zh": "一個產品從頭到尾要經過的所有步驟和順序",
        "en": "All the steps a product must go through, in order, from start to finish"
      },
      {
        "key": "recipe",
        "zh": "Recipe（配方）",
        "en": "Recipe"
      },
      {
        "key": "recipeDef",
        "zh": "某個步驟在機台上要用的參數",
        "en": "The settings a tool uses for a step"
      },
      {
        "key": "temp",
        "zh": "溫度",
        "en": "Temperature"
      },
      {
        "key": "time",
        "zh": "時間",
        "en": "Time"
      },
      {
        "key": "gas",
        "zh": "氣體流量",
        "en": "Gas flow"
      },
      {
        "key": "eggs",
        "zh": "一盒雞蛋",
        "en": "A carton of eggs"
      },
      {
        "key": "steps",
        "zh": "食譜的步驟清單",
        "en": "The list of steps in a cooking recipe"
      },
      {
        "key": "oven",
        "zh": "烤箱的溫度與時間設定",
        "en": "The temperature and time you set on an oven"
      }
    ]
  },
  {
    "chapterId": "ch01",
    "headingZh": "誰在晶圓廠裡工作",
    "headingEn": "Who works in a fab",
    "type": "pictorial",
    "draw": "fabRoles",
    "captionZh": "八種常見職務各自負責生產線上的哪一塊。",
    "captionEn": "What each of the eight common roles looks after along the line.",
    "labels": [
      {
        "key": "pe",
        "zh": "製程工程師（PE）",
        "en": "Process engineer (PE)"
      },
      {
        "key": "ee",
        "zh": "設備工程師（EE）",
        "en": "Equipment engineer (EE)"
      },
      {
        "key": "pie",
        "zh": "製程整合工程師（PIE）",
        "en": "Process integration engineer (PIE)"
      },
      {
        "key": "ye",
        "zh": "良率工程師（YE）",
        "en": "Yield engineer (YE)"
      },
      {
        "key": "mfg",
        "zh": "製造部（MFG）",
        "en": "Manufacturing (MFG)"
      },
      {
        "key": "facilities",
        "zh": "廠務工程師",
        "en": "Facilities engineer"
      },
      {
        "key": "qa",
        "zh": "品保工程師（QA）",
        "en": "Quality engineer (QA)"
      },
      {
        "key": "cim",
        "zh": "CIM 工程師",
        "en": "CIM engineer"
      },
      {
        "key": "allYear",
        "zh": "全年無休",
        "en": "Every day of the year"
      }
    ]
  },
  {
    "chapterId": "ch01",
    "headingZh": "機台：工廠的主角",
    "headingEn": "Tools: the stars of the fab",
    "type": "pictorial",
    "draw": "toolTypes",
    "captionZh": "單片式與批次式機台，以及保養後要先 Qual 才能生產",
    "captionEn": "Single-wafer and batch tools, and why a tool needs a qual after maintenance",
    "labels": [
      {
        "key": "single",
        "zh": "單片式",
        "en": "Single-wafer tools"
      },
      {
        "key": "oneAtATime",
        "zh": "一次處理一片晶圓",
        "en": "Process one wafer at a time"
      },
      {
        "key": "singleExamples",
        "zh": "曝光機、大部分的蝕刻機",
        "en": "scanners and most etch tools"
      },
      {
        "key": "batch",
        "zh": "批次式",
        "en": "Batch tools"
      },
      {
        "key": "manyAtOnce",
        "zh": "一次處理很多片晶圓",
        "en": "Process many wafers at once"
      },
      {
        "key": "furnace",
        "zh": "爐管",
        "en": "furnaces"
      },
      {
        "key": "hundred",
        "zh": "一次可以放進上百片",
        "en": "can hold more than a hundred wafers"
      },
      {
        "key": "running",
        "zh": "正常運轉",
        "en": "Running"
      },
      {
        "key": "waiting",
        "zh": "待機",
        "en": "Waiting"
      },
      {
        "key": "pm",
        "zh": "保養（PM，Preventive Maintenance）",
        "en": "Preventive maintenance (PM)"
      },
      {
        "key": "down",
        "zh": "Down 機",
        "en": "Down"
      },
      {
        "key": "replaced",
        "zh": "零件換新、腔體清潔過",
        "en": "Parts have been replaced and the chamber has been cleaned"
      },
      {
        "key": "testWafers",
        "zh": "先跑測試用的晶圓",
        "en": "Run test wafers first"
      },
      {
        "key": "check",
        "zh": "檢查微粒、膜厚、蝕刻率等是否正常",
        "en": "Check particles, film thickness, etch rate and so on"
      },
      {
        "key": "released",
        "zh": "確認合格後才開放生產",
        "en": "Only after the results pass is the tool released for production"
      },
      {
        "key": "qual",
        "zh": "Qual",
        "en": "Qual"
      },
      {
        "key": "skip",
        "zh": "沒做會怎樣",
        "en": "If you skip it"
      },
      {
        "key": "wrong",
        "zh": "如果機台其實有問題",
        "en": "If something is actually wrong with the tool"
      },
      {
        "key": "scrap",
        "zh": "第一批跑進去的產品晶圓可能整批報廢",
        "en": "the first lot of product wafers through it may be scrapped"
      }
    ]
  },
  {
    "chapterId": "ch01",
    "headingZh": "無塵室：比手術室還乾淨",
    "headingEn": "The cleanroom: cleaner than an operating room",
    "type": "pictorial",
    "draw": "cleanroom",
    "sourcedNumbers": true,
    "sourceZh": "數值出自本段正文；立方體裡的點數與機台構造都是示意。",
    "sourceEn": "Values come from this section. Dot counts and the tool layout are schematic.",
    "captionZh": "無塵室要多乾淨、晶圓經過的地方，以及進無塵室前要做什麼",
    "captionEn": "How clean a cleanroom must be, the wafer path, and the steps before entering",
    "labels": [
      {
        "key": "cubicFoot",
        "zh": "每立方英尺",
        "en": "in every cubic foot of air"
      },
      {
        "key": "halfMicron",
        "zh": "0.5 微米以上的微粒",
        "en": "Particles of 0.5 micrometers or larger"
      },
      {
        "key": "office",
        "zh": "一般辦公室",
        "en": "A typical office"
      },
      {
        "key": "officeCount",
        "zh": "數十萬到上百萬顆",
        "en": "Hundreds of thousands to millions of particles"
      },
      {
        "key": "criticalArea",
        "zh": "無塵室的關鍵區域",
        "en": "Critical areas of a cleanroom"
      },
      {
        "key": "roomCount",
        "zh": "個位數以下",
        "en": "Below single digits"
      },
      {
        "key": "classes",
        "zh": "「Class 1」「Class 10」",
        "en": "\"Class 1\" and \"Class 10\""
      },
      {
        "key": "smallerCleaner",
        "zh": "數字越小越乾淨",
        "en": "the smaller the number, the cleaner the room"
      },
      {
        "key": "miniEnv",
        "zh": "迷你環境",
        "en": "Mini-environment"
      },
      {
        "key": "carrier",
        "zh": "密封的晶圓盒",
        "en": "Sealed wafer carriers"
      },
      {
        "key": "opened",
        "zh": "只有在機台內部才會打開",
        "en": "Only opened inside the tools"
      },
      {
        "key": "toolFront",
        "zh": "機台前端",
        "en": "Front end of each tool"
      },
      {
        "key": "smallSpace",
        "zh": "小型的超潔淨空間",
        "en": "A small ultra-clean space"
      },
      {
        "key": "wholeBuilding",
        "zh": "不需要讓整個廠房都達到最高等級",
        "en": "The whole building does not need the highest cleanliness class"
      },
      {
        "key": "passThrough",
        "zh": "只要晶圓「經過的地方」夠乾淨就好",
        "en": "Only the places the wafers pass through have to be that clean"
      },
      {
        "key": "before",
        "zh": "進無塵室前",
        "en": "Before entering"
      },
      {
        "key": "people",
        "zh": "人是無塵室最大的污染源",
        "en": "People are the biggest source of contamination in a cleanroom"
      },
      {
        "key": "skin",
        "zh": "皮屑",
        "en": "Skin flakes"
      },
      {
        "key": "hair",
        "zh": "頭髮",
        "en": "Hair"
      },
      {
        "key": "sweat",
        "zh": "汗水",
        "en": "Sweat"
      },
      {
        "key": "cosmetics",
        "zh": "化妝品",
        "en": "Cosmetics"
      },
      {
        "key": "suit",
        "zh": "全身包覆的無塵衣",
        "en": "Full-body cleanroom suit"
      },
      {
        "key": "shower",
        "zh": "風淋室",
        "en": "Air shower"
      },
      {
        "key": "blow",
        "zh": "吹掉身上的灰塵",
        "en": "blows dust off their body"
      },
      {
        "key": "room",
        "zh": "無塵室",
        "en": "Cleanroom"
      }
    ]
  },
  {
    "chapterId": "ch01",
    "headingZh": "工廠的血液：廠務系統",
    "headingEn": "The lifeblood of the fab: facilities",
    "type": "pictorial",
    "draw": "facilities",
    "captionZh": "廠務供應機台的資源，以及要處理的廢氣廢液",
    "captionEn": "What the facilities team supplies to a tool, and the waste it handles",
    "labels": [
      {
        "key": "team",
        "zh": "廠務",
        "en": "The facilities team"
      },
      {
        "key": "steady",
        "zh": "大量穩定的資源供應",
        "en": "a large, steady supply of resources"
      },
      {
        "key": "upw",
        "zh": "超純水",
        "en": "Ultrapure water"
      },
      {
        "key": "upwUse",
        "zh": "清洗晶圓用",
        "en": "Used for cleaning wafers"
      },
      {
        "key": "upwVol",
        "zh": "用量非常大",
        "en": "The fab uses huge amounts of it"
      },
      {
        "key": "gas",
        "zh": "特殊氣體與化學品",
        "en": "Specialty gases and chemicals"
      },
      {
        "key": "gasSys",
        "zh": "專門的供應與偵測系統",
        "en": "Dedicated supply and detection systems"
      },
      {
        "key": "power",
        "zh": "電力",
        "en": "Electric power"
      },
      {
        "key": "dip",
        "zh": "一次極短暫的電壓不穩",
        "en": "Even a very brief voltage dip"
      },
      {
        "key": "ruin",
        "zh": "可能讓正在加工的晶圓報廢",
        "en": "can ruin the wafers being processed"
      },
      {
        "key": "exhaust",
        "zh": "排氣與廢水處理",
        "en": "Exhaust and wastewater treatment"
      },
      {
        "key": "wasteD",
        "zh": "處理製程產生的廢氣與廢液",
        "en": "Handle the waste gases and liquids produced by the processes"
      },
      {
        "key": "env",
        "zh": "溫濕度與振動控制",
        "en": "Temperature, humidity and vibration control"
      },
      {
        "key": "sens1",
        "zh": "曝光機等精密機台",
        "en": "Precision tools such as scanners"
      },
      {
        "key": "sens2",
        "zh": "對環境變化非常敏感",
        "en": "are very sensitive to changes in their environment"
      },
      {
        "key": "supply",
        "zh": "供應",
        "en": "Supply"
      },
      {
        "key": "waste",
        "zh": "廢氣與廢液",
        "en": "Waste gases and liquids"
      }
    ]
  },
  {
    "chapterId": "ch01",
    "headingZh": "工廠怎麼衡量表現",
    "headingEn": "How a fab measures its performance",
    "type": "pictorial",
    "draw": "cycleTime",
    "captionZh": "拉長生產週期的三件事：排隊、插隊與沒湊滿就開機",
    "captionEn": "Three things that stretch cycle time: queues, hot lots and early batch runs",
    "labels": [
      {
        "key": "ct",
        "zh": "生產週期（Cycle Time）",
        "en": "Cycle time"
      },
      {
        "key": "ctDef",
        "zh": "一批晶圓從投片到完成要花多久",
        "en": "How long it takes a lot to go from wafer start to completion"
      },
      {
        "key": "wipTerm",
        "zh": "在製品（WIP，Work in Process）",
        "en": "Work in process (WIP)"
      },
      {
        "key": "wip",
        "zh": "WIP 越多，每片晶圓排隊等機台的時間就越長",
        "en": "The more WIP there is, the longer each wafer waits in line for tools"
      },
      {
        "key": "hotA",
        "zh": "每一批急件插隊",
        "en": "Every time a hot lot jumps the queue"
      },
      {
        "key": "hotB",
        "zh": "其他晶圓就得多等一下",
        "en": "other lots have to wait a little longer"
      },
      {
        "key": "hot",
        "zh": "急件（Hot Lot）",
        "en": "Hot lots"
      },
      {
        "key": "batch",
        "zh": "批次式機台還可能為了急件不等湊滿就開機",
        "en": "A batch tool may even start a run without waiting to fill up"
      },
      {
        "key": "waste",
        "zh": "降低效率",
        "en": "which wastes capacity"
      },
      {
        "key": "highway",
        "zh": "車越多，高速公路越塞",
        "en": "Just as more cars make a highway more congested"
      }
    ]
  },
  {
    "chapterId": "ch01",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "潔淨室與廠務三類異常及各自的防堵對策。",
    "captionEn": "Three cleanroom and facility excursions and the containment for each.",
    "root": {
      "zh": "潔淨室與廠務異常",
      "en": "Cleanroom and facility excursions"
    },
    "branches": [
      {
        "zh": "分子污染使光罩鏡頭霧化",
        "en": "AMC haze on reticles and optics",
        "leafZh": "加裝化學濾網",
        "leafEn": "Add chemical filtration"
      },
      {
        "zh": "超純水膠體矽與溶氧超標",
        "en": "UPW colloidal silica and DO spikes",
        "leafZh": "超標即對濕洗槽停機",
        "leafEn": "Alarms block wet-bench track-in"
      },
      {
        "zh": "次廠務泵浦微振動",
        "en": "Sub-fab pump micro-vibration",
        "leafZh": "獨立防振基座加磁浮減振",
        "leafEn": "Isolated pedestals plus magnetic levitation"
      }
    ]
  },
  {
    "chapterId": "ch01",
    "headingZh": "無塵室、AMHS 與廠務概覽",
    "headingEn": "Cleanroom, AMHS & Facility Overview",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "無塵室、自動搬運與四類廠務系統的組成。",
    "captionEn": "What makes up the cleanroom, automated handling and four utility groups.",
    "columns": [
      {
        "titleZh": "無塵室與迷你環境",
        "titleEn": "Cleanroom & mini-environments",
        "items": [
          {
            "zh": "FFU 加 ULPA 濾網",
            "en": "FFUs with ULPA filters"
          },
          {
            "zh": "垂直單向層流壓向高架地板",
            "en": "Vertical laminar downflow to raised floor"
          },
          {
            "zh": "混合鍵合區微粒可致局部未鍵合",
            "en": "Hybrid-bond particles can leave unbonded areas"
          },
          {
            "zh": "FOUP 與 EFEM 內部更潔淨",
            "en": "FOUP and EFEM interiors kept cleaner"
          }
        ],
        "icon": "particle"
      },
      {
        "titleZh": "自動物料搬運 AMHS",
        "titleEn": "Automated material handling (AMHS)",
        "items": [
          {
            "zh": "空中單軌天車 OHT",
            "en": "Overhead hoist transport (OHT)"
          },
          {
            "zh": "跨樓層升降機與充氮倉儲",
            "en": "Lifters and nitrogen-purge stockers"
          },
          {
            "zh": "軌道側緩衝架與機台裝卸埠",
            "en": "Overhead buffers and tool load ports"
          },
          {
            "zh": "全程零人工接觸",
            "en": "Zero human handling"
          }
        ],
        "icon": "oht"
      },
      {
        "titleZh": "四類廠務系統",
        "titleEn": "Four groups of fab utilities",
        "items": [
          {
            "zh": "超純水",
            "en": "Ultrapure water (UPW)"
          },
          {
            "zh": "氣體與化學品、研磨液供應",
            "en": "Gases plus chemical and slurry delivery"
          },
          {
            "zh": "雙迴路供電與不斷電",
            "en": "Dual-feed power with UPS"
          },
          {
            "zh": "機台端局部尾氣處理",
            "en": "Point-of-use local scrubbers"
          }
        ],
        "icon": "valve"
      }
    ]
  },
  {
    "chapterId": "ch01",
    "headingZh": "廠務關係式與 3D 製程條件",
    "headingEn": "Facility Relationships & 3D Process Conditions",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三項潔淨室與廠務關係式及其製程用途。",
    "captionEn": "Three cleanroom and facility relationships and what each is used for.",
    "root": {
      "zh": "潔淨室與廠務關係式",
      "en": "Cleanroom & facility relationships",
      "noteZh": "須依適用條件解讀",
      "noteEn": "Read within applicable conditions"
    },
    "branches": [
      {
        "zh": "ISO 微粒濃度冪次定律",
        "en": "ISO particle power law",
        "leafZh": "界面微粒可能造成未鍵合",
        "leafEn": "Interface particles may leave unbonded areas"
      },
      {
        "zh": "超純水理論電阻率極限",
        "en": "UPW intrinsic resistivity limit",
        "leafZh": "防止浸潤微影擾動與清洗水痕",
        "leafEn": "Prevents immersion aberration and watermarks"
      },
      {
        "zh": "FOUP 吹掃與等待時間",
        "en": "FOUP purge and queue time",
        "leafZh": "降低水氣與氧氣暴露",
        "leafEn": "Lowers moisture and oxygen exposure"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "摻雜：N 型與 P 型",
    "headingEn": "Doping: N-type and P-type",
    "type": "pictorial",
    "draw": "dopingLattice",
    "captionZh": "平面鍵結簡化示意，實際晶格是立體的；雜質比例未按實際。",
    "captionEn": "Simplified flat bond sketch; dopant ratio not to scale.",
    "labels": [
      {
        "key": "atomSi",
        "zh": "矽",
        "en": "Si"
      },
      {
        "key": "atomP",
        "zh": "磷",
        "en": "P"
      },
      {
        "key": "atomB",
        "zh": "硼",
        "en": "B"
      },
      {
        "key": "hole",
        "zh": "電洞",
        "en": "hole"
      },
      {
        "key": "pure",
        "zh": "純矽",
        "en": "Pure silicon"
      },
      {
        "key": "pureNone",
        "zh": "未加入其他元素",
        "en": "No other element added",
        "from": "figure"
      },
      {
        "key": "pureFour",
        "zh": "矽原子最外層有四個電子",
        "en": "Silicon atom has four outer electrons",
        "from": "figure"
      },
      {
        "key": "purePoor",
        "zh": "導電能力很差",
        "en": "Conducts poorly"
      },
      {
        "key": "nType",
        "zh": "N 型",
        "en": "N-type"
      },
      {
        "key": "nAdd",
        "zh": "加入磷或砷",
        "en": "Phosphorus or arsenic added",
        "from": "figure"
      },
      {
        "key": "nFive",
        "zh": "雜質最外層有五個電子",
        "en": "Impurity has five outer electrons",
        "from": "figure"
      },
      {
        "key": "nFree",
        "zh": "多出可自由移動的電子",
        "en": "One extra electron moves freely",
        "from": "figure"
      },
      {
        "key": "pType",
        "zh": "P 型",
        "en": "P-type"
      },
      {
        "key": "pAdd",
        "zh": "加入硼",
        "en": "Boron added",
        "from": "figure"
      },
      {
        "key": "pThree",
        "zh": "雜質最外層有三個電子",
        "en": "Impurity has three outer electrons",
        "from": "figure"
      },
      {
        "key": "pHole",
        "zh": "少一個電子，留下電洞",
        "en": "One electron missing leaves a hole",
        "from": "figure"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "NMOS、PMOS 與 CMOS",
    "headingEn": "NMOS, PMOS and CMOS",
    "type": "pictorial",
    "draw": "cmosWells",
    "captionZh": "同一片晶圓上的 P 井與 N 井，以及輪流遮蔽、分區佈植。",
    "captionEn": "P-wells and N-wells on one wafer, and how masking lets each region be implanted.",
    "labels": [
      {
        "key": "sameWafer",
        "zh": "同一片晶圓",
        "en": "On the same wafer"
      },
      {
        "key": "nmos",
        "zh": "NMOS",
        "en": "NMOS"
      },
      {
        "key": "pmos",
        "zh": "PMOS",
        "en": "PMOS"
      },
      {
        "key": "pWell",
        "zh": "P 型區域（P 井）",
        "en": "P-type regions (P-wells)"
      },
      {
        "key": "nWell",
        "zh": "N 型區域（N 井）",
        "en": "N-type regions (N-wells)"
      },
      {
        "key": "nType",
        "zh": "N 型",
        "en": "N-type"
      },
      {
        "key": "pType",
        "zh": "P 型",
        "en": "P-type"
      },
      {
        "key": "nmosCarrier",
        "zh": "靠電子導電",
        "en": "Conducts with electrons"
      },
      {
        "key": "nmosOn",
        "zh": "閘極加高電壓時打開",
        "en": "turns on when the gate voltage is high"
      },
      {
        "key": "pmosCarrier",
        "zh": "靠電洞導電",
        "en": "Conducts with holes"
      },
      {
        "key": "pmosOn",
        "zh": "閘極加低電壓時打開",
        "en": "turns on when the gate voltage is low"
      },
      {
        "key": "resist",
        "zh": "光阻",
        "en": "Resist",
        "from": "figure"
      },
      {
        "key": "repeat",
        "zh": "多次的微影和離子佈植",
        "en": "Several rounds of lithography and ion implantation"
      },
      {
        "key": "separately",
        "zh": "分別處理不同區域",
        "en": "to treat each region separately"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "從電晶體到晶片",
    "headingEn": "From transistors to a chip",
    "captionZh": "從電晶體、邏輯閘、運算電路到以金屬導線連成晶片。",
    "captionEn": "From transistors to logic gates and circuits, then wired into a chip.",
    "type": "pictorial",
    "draw": "transistorsToChip",
    "labels": [
      {
        "key": "tr",
        "zh": "電晶體",
        "en": "Transistors"
      },
      {
        "key": "gate",
        "zh": "邏輯閘",
        "en": "Logic gate"
      },
      {
        "key": "circuit",
        "zh": "運算電路",
        "en": "Computing circuits"
      },
      {
        "key": "chip",
        "zh": "晶片",
        "en": "Chip"
      },
      {
        "key": "fewTr",
        "zh": "幾個電晶體組成一個邏輯閘",
        "en": "A few transistors make a logic gate"
      },
      {
        "key": "manyG",
        "zh": "許多邏輯閘組成運算電路",
        "en": "Many logic gates make computing circuits"
      },
      {
        "key": "wire",
        "zh": "用好幾層金屬導線把它們連起來",
        "en": "Several layers of metal wiring connect them all"
      },
      {
        "key": "twoStages",
        "zh": "晶圓廠的工作可以分成兩大段",
        "en": "The work of a fab falls into two big stages"
      },
      {
        "key": "si",
        "zh": "矽",
        "en": "Silicon"
      },
      {
        "key": "feol",
        "zh": "FEOL",
        "en": "FEOL"
      },
      {
        "key": "feolD",
        "zh": "先在矽的表面做出電晶體",
        "en": "First build the transistors at the surface of the silicon"
      },
      {
        "key": "beol",
        "zh": "BEOL",
        "en": "BEOL"
      },
      {
        "key": "beolD",
        "zh": "再在上方一層一層蓋出金屬導線",
        "en": "Then build the metal wiring above them layer by layer"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "微縮：越做越小",
    "headingEn": "Scaling: making it smaller and smaller",
    "captionZh": "電晶體微縮的好處、漏電問題與結構走向立體的因果。",
    "captionEn": "Why shrinking transistors led to leakage and a three-dimensional structure.",
    "type": "pictorial",
    "draw": "shrinkWhy",
    "sourcedNumbers": true,
    "sourceZh": "「大約每兩年增加一倍」照本段正文寫；右格的電晶體數正好是左格的兩倍、每顆面積一半，只是示意。",
    "sourceEn": "The doubling every two years is worded as in this section. The right square holds exactly twice as many transistors, each at half the area, as a sketch.",
    "labels": [
      {
        "key": "moore",
        "zh": "摩爾定律",
        "en": "Moore's law"
      },
      {
        "key": "double",
        "zh": "晶片上的電晶體數量大約每兩年增加一倍",
        "en": "The number of transistors on a chip roughly doubled every two years"
      },
      {
        "key": "small",
        "zh": "電晶體越小，就能做得越快、越省電",
        "en": "Smaller transistors can be faster and use less power"
      },
      {
        "key": "more",
        "zh": "同一面積放進更多電晶體",
        "en": "More of them fit in the same area"
      },
      {
        "key": "cost",
        "zh": "每個電晶體的成本也更低",
        "en": "Each transistor costs less"
      },
      {
        "key": "past",
        "zh": "縮小到一定程度後",
        "en": "Shrink past a certain point"
      },
      {
        "key": "control",
        "zh": "閘極越來越難完全控制通道",
        "en": "The gate finds it harder and harder to fully control the channel"
      },
      {
        "key": "leak",
        "zh": "關掉時仍有電流漏過去",
        "en": "Current keeps leaking through even when the transistor is off"
      },
      {
        "key": "faucet",
        "zh": "水龍頭關不緊",
        "en": "Like a faucet that will not shut tight"
      },
      {
        "key": "solve",
        "zh": "為了解決這個問題",
        "en": "To solve this"
      },
      {
        "key": "to3d",
        "zh": "從平面走向立體",
        "en": "From planar to three-dimensional"
      },
      {
        "key": "planar",
        "zh": "平面",
        "en": "Planar"
      },
      {
        "key": "threeD",
        "zh": "立體",
        "en": "Three-dimensional"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "foldSection": true,
    "type": "pictorial",
    "draw": "swingScale",
    "sourcedNumbers": true,
    "sourceZh": "次臨界擺幅數值出自本段表格，是典型範圍，不是單一元件的量測值；刻度尺從 55 到 125 mV/dec 線性排列，不印刻度。",
    "sourceEn": "Subthreshold swing values come from the table in this section: typical ranges, not measurements of one device. The scale runs linearly from 55 to 125 mV/dec without printed ticks.",
    "captionZh": "三大元件物理定律，以及次臨界擺幅的數值位置",
    "captionEn": "Three device physics laws, and where the subthreshold swing values fall",
    "labels": [
      {
        "key": "root",
        "zh": "元件物理定量定律",
        "en": "Quantitative device physics laws",
        "from": "figure"
      },
      {
        "key": "b1",
        "zh": "本質載子熱激發定律",
        "en": "Intrinsic carrier thermal law",
        "from": "figure"
      },
      {
        "key": "l1",
        "zh": "壓低堆疊接面溫度",
        "en": "Cap junction temperature in stacks",
        "from": "figure"
      },
      {
        "key": "b2",
        "zh": "次臨界擺幅極限",
        "en": "Subthreshold swing limit",
        "from": "figure"
      },
      {
        "key": "l2",
        "zh": "催生 GAA 奈米片",
        "en": "Drove the move to GAA nanosheets",
        "from": "figure"
      },
      {
        "key": "b3",
        "zh": "量子穿隧閘極漏電",
        "en": "Quantum tunneling gate leakage",
        "from": "figure"
      },
      {
        "key": "l3",
        "zh": "改用高介電材料",
        "en": "Switch to high-k dielectric",
        "from": "figure"
      },
      {
        "key": "unit",
        "zh": "mV/dec",
        "en": "mV/dec"
      },
      {
        "key": "v596",
        "zh": "59.6",
        "en": "59.6"
      },
      {
        "key": "limit",
        "zh": "熱電子發射極限",
        "en": "Thermionic limit"
      },
      {
        "key": "k300",
        "zh": "300 K",
        "en": "at 300 K"
      },
      {
        "key": "gaa",
        "zh": "GAA 奈米片",
        "en": "GAA"
      },
      {
        "key": "vGaa",
        "zh": "62–65",
        "en": "62–65"
      },
      {
        "key": "fin",
        "zh": "FinFET",
        "en": "FinFET"
      },
      {
        "key": "vFin",
        "zh": "~70",
        "en": "~70"
      },
      {
        "key": "planar",
        "zh": "平面短通道",
        "en": "Short-channel planar"
      },
      {
        "key": "vPlanar",
        "zh": "95–120",
        "en": "95–120"
      },
      {
        "key": "worse",
        "zh": "惡化",
        "en": "Degrades"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "半導體能隙、Multi-Vt 與功耗概覽",
    "headingEn": "Bandgap, Multi-Vt & Power Overview",
    "foldTables": true,
    "foldSection": true,
    "type": "pictorial",
    "draw": "bandgapBars",
    "sourcedNumbers": true,
    "sourceZh": "能隙數值出自本段表格，是室溫的典型值；長條從 0 eV 起按比例。下方三欄沿用原本的重點。",
    "sourceEn": "Bandgap values come from the table in this section and are typical room-temperature values. Bars start at 0 eV and are to scale. The three columns below keep the original key points.",
    "captionZh": "五種半導體的能隙，以及三類主題的重點",
    "captionEn": "Bandgaps of five semiconductors, and key points of the three topics",
    "labels": [
      {
        "key": "eg",
        "zh": "能隙",
        "en": "Bandgap"
      },
      {
        "key": "rt",
        "zh": "室溫（300 K）",
        "en": "Room-Temperature (300 K)"
      },
      {
        "key": "ev",
        "zh": "eV",
        "en": "eV"
      },
      {
        "key": "ge",
        "zh": "Ge",
        "en": "Ge"
      },
      {
        "key": "si",
        "zh": "Si",
        "en": "Si"
      },
      {
        "key": "gaas",
        "zh": "GaAs",
        "en": "GaAs"
      },
      {
        "key": "sic",
        "zh": "4H-SiC",
        "en": "4H-SiC"
      },
      {
        "key": "gan",
        "zh": "GaN",
        "en": "GaN"
      },
      {
        "key": "v066",
        "zh": "0.66",
        "en": "0.66"
      },
      {
        "key": "v112",
        "zh": "1.12",
        "en": "1.12"
      },
      {
        "key": "v142",
        "zh": "1.42",
        "en": "1.42"
      },
      {
        "key": "v326",
        "zh": "3.26",
        "en": "3.26"
      },
      {
        "key": "v34",
        "zh": "3.4",
        "en": "3.4"
      },
      {
        "key": "siUse",
        "zh": "矽主導主流數位 CMOS",
        "en": "Si powers mainstream CMOS"
      },
      {
        "key": "power",
        "zh": "高壓電動車與 AI 伺服器電源轉換",
        "en": "EV traction and AI server power electronics"
      },
      {
        "key": "c1",
        "zh": "能隙與載子遷移率",
        "en": "Bandgap & carrier mobility",
        "from": "figure"
      },
      {
        "key": "c1a",
        "zh": "能隙決定耐溫與耐壓極限",
        "en": "Bandgap sets heat and voltage limits",
        "from": "figure"
      },
      {
        "key": "c1b",
        "zh": "遷移率決定導通速度",
        "en": "Mobility sets conduction speed",
        "from": "figure"
      },
      {
        "key": "c2",
        "zh": "多重臨界電壓與次臨界擺幅",
        "en": "Multi-Vt & subthreshold swing",
        "from": "figure"
      },
      {
        "key": "c2a",
        "zh": "ULVT、LVT、SVT、HVT",
        "en": "ULVT, LVT, SVT, HVT flavors",
        "from": "figure"
      },
      {
        "key": "c2b",
        "zh": "擺幅有室溫熱離子發射極限",
        "en": "Swing has a room-temperature thermionic limit",
        "from": "figure"
      },
      {
        "key": "c2c",
        "zh": "降低 Vt 提速，但漏電暴增",
        "en": "Lower Vt: faster, but leakage soars",
        "from": "figure"
      },
      {
        "key": "c2d",
        "zh": "改用功函數金屬與偶極調 Vt",
        "en": "Tune Vt with work-function metal and dipoles",
        "from": "figure"
      },
      {
        "key": "c3",
        "zh": "CMOS 功耗分量與對策",
        "en": "CMOS power terms & countermeasures",
        "from": "figure"
      },
      {
        "key": "c3a",
        "zh": "動態切換功耗",
        "en": "Dynamic switching power",
        "from": "figure"
      },
      {
        "key": "c3an",
        "zh": "與電壓平方成正比",
        "en": "Scales with supply voltage squared",
        "from": "figure"
      },
      {
        "key": "c3b",
        "zh": "瞬間短路功耗",
        "en": "Short-circuit power",
        "from": "figure"
      },
      {
        "key": "c3c",
        "zh": "靜態漏電功耗",
        "en": "Static leakage power",
        "from": "figure"
      },
      {
        "key": "c3cn",
        "zh": "次臨界、閘極與接面漏電",
        "en": "Subthreshold, gate and junction leakage",
        "from": "figure"
      },
      {
        "key": "c3d",
        "zh": "HKMG 與 GAA 壓制漏電",
        "en": "HKMG and GAA suppress leakage",
        "from": "figure"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三類元件物理失效與對應的防堵對策。",
    "captionEn": "Three device-physics failure scenarios and their countermeasures.",
    "root": {
      "zh": "元件物理三類失效",
      "en": "Device-physics failure scenarios"
    },
    "branches": [
      {
        "zh": "DIBL 與關態漏電失控",
        "en": "DIBL and off-state leakage spikes",
        "leafZh": "轉向 FinFET 或 GAA",
        "leafEn": "Move to FinFET or GAA nanosheets"
      },
      {
        "zh": "SRAM 失配讀寫失效",
        "en": "SRAM bitcell flips from mismatch",
        "leafZh": "無摻雜通道與細晶粒功函數金屬",
        "leafEn": "Undoped channels, fine-grain metal gates"
      },
      {
        "zh": "GIDL 與寄生閂鎖燒毀",
        "en": "GIDL and latch-up burnout",
        "leafZh": "緩解邊緣電場並加保護環",
        "leafEn": "Relax peak fields, add guard rings"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "半導體：可以控制的導體",
    "headingEn": "Semiconductors: conductors you can control",
    "type": "pictorial",
    "draw": "semiControl",
    "captionZh": "介於金屬與玻璃之間、可以被控制，以及為什麼用矽",
    "captionEn": "Between metal and glass, and controllable; why silicon is the main material",
    "labels": [
      {
        "key": "glass",
        "zh": "玻璃",
        "en": "Glass"
      },
      {
        "key": "glassNote",
        "zh": "幾乎不導電",
        "en": "Hardly conducts at all"
      },
      {
        "key": "semi",
        "zh": "半導體",
        "en": "Semiconductors"
      },
      {
        "key": "between",
        "zh": "介於兩者之間",
        "en": "Sit in between"
      },
      {
        "key": "metal",
        "zh": "金屬",
        "en": "Metals"
      },
      {
        "key": "metalNote",
        "zh": "很容易導電",
        "en": "Conduct electricity easily"
      },
      {
        "key": "control",
        "zh": "導電能力可以被控制",
        "en": "Their conductivity can be controlled"
      },
      {
        "key": "dope",
        "zh": "加入少量的其他元素",
        "en": "Adding small amounts of other elements"
      },
      {
        "key": "volt",
        "zh": "施加電壓",
        "en": "Applying a voltage"
      },
      {
        "key": "siMain",
        "zh": "矽是最主要的半導體材料",
        "en": "Silicon is the main semiconductor material"
      },
      {
        "key": "abundant",
        "zh": "地球上的含量非常豐富",
        "en": "Extremely abundant on Earth"
      },
      {
        "key": "sand",
        "zh": "沙子的主要成分就是矽的氧化物",
        "en": "Sand is mostly silicon oxide"
      },
      {
        "key": "sio2",
        "zh": "二氧化矽",
        "en": "Silicon dioxide"
      },
      {
        "key": "si",
        "zh": "矽",
        "en": "Silicon"
      },
      {
        "key": "insulator",
        "zh": "品質很好的絕緣層",
        "en": "A high-quality insulator"
      },
      {
        "key": "useful",
        "zh": "製程上非常好用",
        "en": "Very useful in manufacturing"
      }
    ]
  },
  {
    "chapterId": "ch03",
    "headingZh": "晶圓尺寸",
    "headingEn": "Wafer sizes",
    "type": "pictorial",
    "draw": "waferSizes",
    "sourcedNumbers": true,
    "sourceZh": "四個圓的直徑依本段正文的數值，按同一比例繪製。",
    "sourceEn": "The four diameters use the values in this section, drawn to one scale.",
    "captionZh": "150 到 450 mm 晶圓按直徑等比例並排。",
    "captionEn": "Wafers from 150 mm to 450 mm side by side, diameters to scale.",
    "labels": [
      {
        "key": "d150",
        "zh": "150 mm",
        "en": "150 mm"
      },
      {
        "key": "n150",
        "zh": "6 吋",
        "en": "6-inch"
      },
      {
        "key": "d200",
        "zh": "200 mm",
        "en": "200 mm"
      },
      {
        "key": "n200",
        "zh": "8 吋",
        "en": "8-inch"
      },
      {
        "key": "d300",
        "zh": "300 mm",
        "en": "300 mm"
      },
      {
        "key": "n300",
        "zh": "12 吋",
        "en": "12-inch"
      },
      {
        "key": "d450",
        "zh": "450 mm",
        "en": "450 mm"
      },
      {
        "key": "area",
        "zh": "300 mm 晶圓的面積是 200 mm 的 2.25 倍",
        "en": "A 300 mm wafer has 2.25 times the area of a 200 mm wafer"
      },
      {
        "key": "studied",
        "zh": "產業也曾研究 450 mm 晶圓",
        "en": "The industry also studied 450 mm wafers"
      },
      {
        "key": "tooCostly",
        "zh": "設備開發成本太高而沒有普及",
        "en": "they never took off because developing the equipment was too expensive"
      }
    ]
  },
  {
    "chapterId": "ch03",
    "headingZh": "從沙子到高純度多晶矽",
    "headingEn": "From sand to high-purity polysilicon",
    "type": "pictorial",
    "draw": "sandToPoly",
    "captionZh": "石英砂純化成電子級多晶矽，再長成排列整齊的單晶矽。",
    "captionEn": "Purifying quartz sand into polysilicon, then growing ordered single crystal.",
    "labels": [
      {
        "key": "metallurgical",
        "zh": "冶金級矽",
        "en": "Metallurgical-grade silicon"
      },
      {
        "key": "metallurgicalNote",
        "zh": "石英砂與碳經電弧爐去氧",
        "en": "Sand + carbon in arc furnace, oxygen removed",
        "from": "figure"
      },
      {
        "key": "hcl",
        "zh": "與氯化氫反應",
        "en": "React with hydrogen chloride",
        "from": "figure"
      },
      {
        "key": "hclNote",
        "zh": "變成易揮發的含氯化合物",
        "en": "Forms a volatile chlorine compound",
        "from": "figure"
      },
      {
        "key": "distill",
        "zh": "多次蒸餾",
        "en": "Distill many times",
        "from": "figure"
      },
      {
        "key": "distillNote",
        "zh": "去除雜質",
        "en": "Removes impurities",
        "from": "figure"
      },
      {
        "key": "decompose",
        "zh": "高溫分解",
        "en": "Decompose at high temperature",
        "from": "figure"
      },
      {
        "key": "decomposeNote",
        "zh": "沉積回固態的矽",
        "en": "Deposits solid silicon again",
        "from": "figure"
      },
      {
        "key": "eg",
        "zh": "電子級多晶矽",
        "en": "Electronic-grade polysilicon"
      },
      {
        "key": "egNote",
        "zh": "雖然很純，但原子的排列方向是雜亂的一小塊一小塊",
        "en": "Very pure, but its atoms are arranged in many small regions"
      },
      {
        "key": "growth",
        "zh": "長晶",
        "en": "Crystal growth"
      },
      {
        "key": "growthNote",
        "zh": "變成排列整齊的單晶矽",
        "en": "Becomes neatly ordered single crystal",
        "from": "figure"
      },
      {
        "key": "poly",
        "zh": "多晶",
        "en": "Polysilicon"
      },
      {
        "key": "grains",
        "zh": "排列方向不同的小晶粒",
        "en": "small grains with different orientations"
      },
      {
        "key": "single",
        "zh": "單晶",
        "en": "Single-crystal silicon"
      },
      {
        "key": "aligned",
        "zh": "同一個方向整齊排列",
        "en": "arranged neatly in the same orientation"
      },
      {
        "key": "waferSingle",
        "zh": "晶圓本身是單晶矽",
        "en": "The wafer itself is single-crystal silicon"
      },
      {
        "key": "mgPurity",
        "zh": "約 98% 到 99%",
        "en": "About 98% to 99%"
      },
      {
        "key": "purity",
        "zh": "99.999999999%",
        "en": "99.999999999%"
      },
      {
        "key": "nines",
        "zh": "11 個 9",
        "en": "eleven nines"
      }
    ],
    "sourcedNumbers": true,
    "sourceZh": "純度數值出自本段正文；電弧爐、反應器、蒸餾塔與沉積的小圖只是示意。",
    "sourceEn": "The purity values come from this section. The small drawings of the arc furnace, reactor, distillation column and deposition are schematic."
  },
  {
    "chapterId": "ch03",
    "headingZh": "從晶棒到晶圓",
    "headingEn": "From ingot to wafer",
    "type": "pictorial",
    "draw": "ingotToWafer",
    "captionZh": "晶棒加工成晶圓的六個動作，以及缺口、編號與厚度",
    "captionEn": "Six operations from ingot to wafer, plus the notch, wafer ID and thickness",
    "labels": [
      {
        "key": "shape",
        "zh": "晶棒整形",
        "en": "Shape the ingot"
      },
      {
        "key": "shapeNote",
        "zh": "切頭尾、磨外徑、刻晶格方向記號",
        "en": "Cut ends, grind diameter, mark orientation",
        "from": "figure"
      },
      {
        "key": "slice",
        "zh": "切片",
        "en": "Slice"
      },
      {
        "key": "sliceNote",
        "zh": "線鋸一次切成數百片",
        "en": "A wire saw cuts hundreds at once",
        "from": "figure"
      },
      {
        "key": "lap",
        "zh": "研磨與倒角",
        "en": "Lap and edge-round"
      },
      {
        "key": "lapNote",
        "zh": "表面磨平、邊緣磨圓避免崩裂",
        "en": "Grind flat; round edges to avoid chipping",
        "from": "figure"
      },
      {
        "key": "etch",
        "zh": "蝕刻",
        "en": "Etch"
      },
      {
        "key": "etchNote",
        "zh": "化學去除表面損傷層",
        "en": "Chemicals remove the damaged surface layer",
        "from": "figure"
      },
      {
        "key": "polish",
        "zh": "拋光",
        "en": "Polish"
      },
      {
        "key": "polishNote",
        "zh": "表面像鏡子一樣平滑",
        "en": "Smooth as a mirror",
        "from": "figure"
      },
      {
        "key": "clean",
        "zh": "清洗與檢驗",
        "en": "Clean and inspect"
      },
      {
        "key": "cleanNote",
        "zh": "查平坦度、微粒與金屬污染",
        "en": "Flatness, particles, metal contamination",
        "from": "figure"
      },
      {
        "key": "notch",
        "zh": "Notch",
        "en": "Notch"
      },
      {
        "key": "vNotch",
        "zh": "V 形缺口",
        "en": "V-shaped notch"
      },
      {
        "key": "waferId",
        "zh": "Wafer ID",
        "en": "Wafer ID"
      },
      {
        "key": "find",
        "zh": "機台在處理晶圓前，會先找到 Notch",
        "en": "Before processing a wafer, a tool first finds the notch"
      },
      {
        "key": "rotate",
        "zh": "把晶圓轉到固定的方向",
        "en": "rotates the wafer to a fixed orientation"
      },
      {
        "key": "round",
        "zh": "邊緣磨圓",
        "en": "Edges are rounded"
      },
      {
        "key": "thick",
        "zh": "大約是 775 微米",
        "en": "About 775 micrometers"
      }
    ],
    "sourcedNumbers": true,
    "sourceZh": "厚度出自本段正文；邊緣剖面的形狀與比例只是示意。",
    "sourceEn": "The thickness comes from this section. The shape and proportions of the edge profile are schematic."
  },
  {
    "chapterId": "ch03",
    "headingZh": "特殊晶圓",
    "headingEn": "Special wafers",
    "type": "pictorial",
    "draw": "specialWafers",
    "captionZh": "三種晶圓的剖面，以及控片、擋片與再生晶圓",
    "captionEn": "Cross-sections of three wafer types, plus monitor, dummy and reclaimed wafers",
    "labels": [
      {
        "key": "polished",
        "zh": "拋光晶圓",
        "en": "Polished wafers"
      },
      {
        "key": "epi",
        "zh": "磊晶晶圓",
        "en": "Epitaxial wafers"
      },
      {
        "key": "epiNote",
        "zh": "拋光晶圓表面再長一層單晶矽",
        "en": "Single-crystal silicon grown on a polished wafer",
        "from": "figure"
      },
      {
        "key": "epiLayer",
        "zh": "品質更好的單晶矽",
        "en": "higher-quality single-crystal silicon"
      },
      {
        "key": "soi",
        "zh": "SOI 晶圓（絕緣層上覆矽）",
        "en": "SOI wafers (silicon on insulator)"
      },
      {
        "key": "soiNote",
        "zh": "薄矽下面埋一層絕緣層",
        "en": "Insulating layer buried under thin silicon",
        "from": "figure"
      },
      {
        "key": "soiLeak",
        "zh": "可以減少漏電",
        "en": "Reduces leakage",
        "from": "figure"
      },
      {
        "key": "soiUse",
        "zh": "常用在射頻等特殊產品",
        "en": "Often used in special products such as RF",
        "from": "figure"
      },
      {
        "key": "thinSi",
        "zh": "薄矽",
        "en": "thin layer of silicon"
      },
      {
        "key": "insulator",
        "zh": "絕緣層",
        "en": "insulating layer"
      },
      {
        "key": "siBase",
        "zh": "矽",
        "en": "silicon"
      },
      {
        "key": "notProduct",
        "zh": "工廠裡很多晶圓不是產品",
        "en": "Many wafers in a fab are not product"
      },
      {
        "key": "product",
        "zh": "產品晶圓",
        "en": "Product wafers"
      },
      {
        "key": "dummy",
        "zh": "擋片（Dummy Wafer）",
        "en": "Dummy wafers"
      },
      {
        "key": "monitor",
        "zh": "控片（Monitor Wafer）",
        "en": "Monitor wafers"
      },
      {
        "key": "check",
        "zh": "檢查機台狀態",
        "en": "Check the condition of tools"
      },
      {
        "key": "measure",
        "zh": "例如量測膜厚或微粒",
        "en": "For example by measuring film thickness or particles"
      },
      {
        "key": "full1",
        "zh": "批次式機台需要放滿晶圓",
        "en": "Batch tools need to be fully loaded"
      },
      {
        "key": "full2",
        "zh": "溫度和氣流才會均勻",
        "en": "so that temperature and gas flow are uniform"
      },
      {
        "key": "used",
        "zh": "用過的控片和擋片",
        "en": "Used monitor and dummy wafers"
      },
      {
        "key": "reclaim",
        "zh": "研磨後回收再用",
        "en": "Polished and reused"
      },
      {
        "key": "reclaimed",
        "zh": "再生晶圓",
        "en": "Reclaimed wafers"
      }
    ]
  },
  {
    "chapterId": "ch03",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三類基板異常與對應的永久防呆對策",
    "captionEn": "Three substrate failure signatures and their permanent countermeasures",
    "root": {
      "zh": "矽晶圓基板異常",
      "en": "Wafer substrate failures"
    },
    "branches": [
      {
        "zh": "結晶空洞 COP",
        "en": "Crystal originated pits (COP)",
        "leafZh": "校準拉速／溫梯，評估氫退火或磊晶",
        "leafEn": "Calibrate V/G; evaluate hydrogen anneal or epi"
      },
      {
        "zh": "熱滑移差排線",
        "en": "Thermal slip dislocation lines",
        "leafZh": "管控間隙氧、改用環形支撐舟",
        "leafEn": "Control interstitial oxygen; use ring boats"
      },
      {
        "zh": "背磨次表面微裂紋",
        "en": "Backgrind subsurface micro-cracks",
        "leafZh": "應力釋放拋光或蝕刻，載片支撐",
        "leafEn": "Stress-relief polish or etch; carrier support"
      }
    ]
  },
  {
    "chapterId": "ch03",
    "headingZh": "晶圓基板種類與應用概覽",
    "headingEn": "Wafer Substrate Types and Applications",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "五類晶圓基板與各自的代表應用。",
    "captionEn": "Five wafer substrate categories and their representative applications.",
    "root": {
      "zh": "晶圓基板種類",
      "en": "Wafer substrate types",
      "icon": "wafer"
    },
    "branches": [
      {
        "zh": "柴氏單晶矽與磊晶矽",
        "en": "CZ/MCZ bulk & epitaxial Si",
        "leafZh": "先進邏輯與記憶體主力基板",
        "leafEn": "Main substrate for advanced logic and memory",
        "icon": "ingot"
      },
      {
        "zh": "浮區法高阻值矽",
        "en": "Float-zone high-resistivity Si",
        "leafZh": "高壓功率元件與毫米波射頻",
        "leafEn": "High-voltage power devices and mmWave RF",
        "icon": "float-zone"
      },
      {
        "zh": "絕緣層上覆矽 SOI",
        "en": "Silicon-on-insulator (SOI)",
        "leafZh": "低功耗晶片、射頻開關與矽光子",
        "leafEn": "Low-power chips, RF switches and photonics",
        "icon": "soi"
      },
      {
        "zh": "寬能隙與三五族基板",
        "en": "Wide-bandgap & III-V substrates",
        "leafZh": "電動車逆變器、氮化鎵電源、光通訊",
        "leafEn": "EV inverters, GaN power, optical links",
        "icon": "hexagon"
      },
      {
        "zh": "堆疊與背面供電載片",
        "en": "Stacking & backside-power carriers",
        "leafZh": "HBM、CoWoS 與背面供電",
        "leafEn": "HBM stacking, CoWoS and backside power",
        "icon": "carrier"
      }
    ]
  },
  {
    "chapterId": "ch03",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "foldSection": true,
    "type": "pictorial",
    "draw": "scheilIngots",
    "sourcedNumbers": true,
    "sourceZh": "偏析係數出自本段表格；顏色越深表示摻質越濃，深淺依本段的 Scheil 式計算，每根以自己的頭端為基準，畫到晶棒約九成處。",
    "sourceEn": "Segregation coefficients come from the table in this section. Darker means more dopant. Shading follows the Scheil equation in this section, relative to the head end of each ingot, up to about 90% of the ingot.",
    "captionZh": "三大長晶與基板定律，以及三種摻質沿晶棒的濃度變化",
    "captionEn": "Three crystal and substrate laws, and how three dopants vary along an ingot",
    "labels": [
      {
        "key": "root",
        "zh": "長晶與基板定量定律",
        "en": "Crystal & substrate laws",
        "from": "figure"
      },
      {
        "key": "b1",
        "zh": "Voronkov 準則",
        "en": "Voronkov point-defect criterion",
        "from": "figure"
      },
      {
        "key": "l1",
        "zh": "評估原生點缺陷風險",
        "en": "Assesses grown-in point-defect risk",
        "from": "figure"
      },
      {
        "key": "b2",
        "zh": "Scheil 摻質偏析",
        "en": "Scheil dopant segregation",
        "from": "figure"
      },
      {
        "key": "l2",
        "zh": "摻硼 P 型晶圓成邏輯主流",
        "en": "Boron-doped P-type wafers dominate logic",
        "from": "figure"
      },
      {
        "key": "b3",
        "zh": "SFQR 與薄化 TTV",
        "en": "SFQR & thinning TTV",
        "from": "figure"
      },
      {
        "key": "l3",
        "zh": "超規致 EUV 失焦、鍵合氣泡",
        "en": "Excess causes EUV defocus and bonding voids",
        "from": "figure"
      },
      {
        "key": "coef",
        "zh": "偏析係數",
        "en": "Segregation coefficient"
      },
      {
        "key": "boron",
        "zh": "硼",
        "en": "Boron"
      },
      {
        "key": "vB",
        "zh": "0.80",
        "en": "0.80"
      },
      {
        "key": "phos",
        "zh": "磷",
        "en": "Phosphorus"
      },
      {
        "key": "vP",
        "zh": "0.35",
        "en": "0.35"
      },
      {
        "key": "arsenic",
        "zh": "砷",
        "en": "Arsenic"
      },
      {
        "key": "vAs",
        "zh": "0.30",
        "en": "0.30"
      },
      {
        "key": "dopant",
        "zh": "摻質",
        "en": "Dopant"
      },
      {
        "key": "tail",
        "zh": "尾部",
        "en": "Tail"
      },
      {
        "key": "flat",
        "zh": "晶棒頭尾電阻率均勻",
        "en": "Flat axial resistivity"
      },
      {
        "key": "rich",
        "zh": "越往晶棒尾部熔體越濃、電阻率越低",
        "en": "Tail enrichment"
      }
    ]
  },
  {
    "chapterId": "ch04",
    "headingZh": "怎麼印得更小",
    "headingEn": "How to print smaller",
    "type": "pictorial",
    "draw": "printSmaller",
    "sourcedNumbers": true,
    "sourceZh": "波長出自本段表格；長條長度與波長成正比，從 0 起畫。下方三個技巧只是示意。",
    "sourceEn": "Wavelengths come from the table in this section. Bar lengths are proportional to wavelength, starting from 0. The three tricks below are schematic.",
    "captionZh": "波長越短印得越細，以及 193 nm 時代的三個技巧",
    "captionEn": "Shorter wavelengths print finer, plus three tricks from the 193 nm years",
    "labels": [
      {
        "key": "hg",
        "zh": "汞燈",
        "en": "Mercury lamp"
      },
      {
        "key": "krf",
        "zh": "KrF 雷射（DUV）",
        "en": "KrF laser (DUV)"
      },
      {
        "key": "arf",
        "zh": "ArF 雷射（DUV）",
        "en": "ArF laser (DUV)"
      },
      {
        "key": "euv",
        "zh": "EUV（極紫外光）",
        "en": "EUV (extreme ultraviolet)"
      },
      {
        "key": "v436",
        "zh": "436",
        "en": "436"
      },
      {
        "key": "v365",
        "zh": "365 nm",
        "en": "365 nm"
      },
      {
        "key": "v248",
        "zh": "248 nm",
        "en": "248 nm"
      },
      {
        "key": "v193",
        "zh": "193 nm",
        "en": "193 nm"
      },
      {
        "key": "v135",
        "zh": "13.5 nm",
        "en": "13.5 nm"
      },
      {
        "key": "shorter",
        "zh": "波長更短的光",
        "en": "Light with a shorter wavelength"
      },
      {
        "key": "pen",
        "zh": "就像用更細的筆可以寫出更小的字",
        "en": "Just as a finer pen can write smaller letters"
      },
      {
        "key": "years",
        "zh": "193 nm 用了很多年",
        "en": "The industry used 193 nm light for many years"
      },
      {
        "key": "immersion",
        "zh": "浸潤式微影",
        "en": "Immersion lithography"
      },
      {
        "key": "water",
        "zh": "在鏡頭和晶圓之間加一層水",
        "en": "Adding a layer of water between the lens and the wafer"
      },
      {
        "key": "better",
        "zh": "讓解析能力再提升",
        "en": "Improves the resolution further"
      },
      {
        "key": "opc",
        "zh": "OPC",
        "en": "OPC"
      },
      {
        "key": "mask",
        "zh": "光罩",
        "en": "Mask"
      },
      {
        "key": "printed",
        "zh": "印出來",
        "en": "print"
      },
      {
        "key": "distort",
        "zh": "光通過極小的圖形時會變形",
        "en": "Light distorts as it passes through extremely small patterns"
      },
      {
        "key": "wrongly",
        "zh": "故意把光罩上的圖形畫歪",
        "en": "The patterns on the mask are deliberately drawn \"wrong\""
      },
      {
        "key": "correct",
        "zh": "讓它印出來剛好正確",
        "en": "So that they print correctly"
      },
      {
        "key": "multi",
        "zh": "多重曝光",
        "en": "Multiple patterning"
      },
      {
        "key": "twoPlus",
        "zh": "拆成兩次或更多次",
        "en": "Split into two or more exposures"
      },
      {
        "key": "cost",
        "zh": "步驟和成本都增加",
        "en": "More steps and higher cost"
      }
    ]
  },
  {
    "chapterId": "ch04",
    "headingZh": "對準：每一層都要對得剛好",
    "headingEn": "Alignment: every layer must line up exactly",
    "type": "pictorial",
    "draw": "overlayCd",
    "sourcedNumbers": true,
    "sourceZh": "「CD 偏大 2 nm」是本段的現場用語；虛線輪廓與偏移量都誇大畫出。",
    "sourceEn": "“CD is 2 nm large” is a floor phrase from this section. The dashed outline and the shifts are exaggerated.",
    "captionZh": "微影工程師最常講的兩個詞：CD 與 Overlay",
    "captionEn": "CD and overlay, the two terms lithography engineers use most",
    "labels": [
      {
        "key": "cdTitle",
        "zh": "CD",
        "en": "CD"
      },
      {
        "key": "cdName",
        "zh": "關鍵尺寸",
        "en": "Critical dimension"
      },
      {
        "key": "cdLarge",
        "zh": "CD 偏大 2 nm",
        "en": "CD is 2 nm large"
      },
      {
        "key": "lineWidth",
        "zh": "例如線寬",
        "en": "Such as a line width"
      },
      {
        "key": "cdDef",
        "zh": "圖形最需要控制的尺寸",
        "en": "The dimension of a pattern that most needs to be controlled"
      },
      {
        "key": "notNode",
        "zh": "CD 不等於製程節點的「幾奈米」",
        "en": "CD is not the \"nanometer\" in a process node name"
      },
      {
        "key": "overlay",
        "zh": "Overlay",
        "en": "Overlay"
      },
      {
        "key": "overlayDef",
        "zh": "這一層和前一層的對準誤差",
        "en": "The alignment error between the current layer and the previous one"
      },
      {
        "key": "open",
        "zh": "斷路",
        "en": "Open"
      },
      {
        "key": "short",
        "zh": "短路",
        "en": "Shorted"
      },
      {
        "key": "shiftX",
        "zh": "Overlay 往 X 方向偏",
        "en": "Overlay is shifted in X"
      },
      {
        "key": "contact",
        "zh": "接觸點",
        "en": "Contact"
      },
      {
        "key": "metalLine",
        "zh": "金屬線",
        "en": "Metal line"
      },
      {
        "key": "land",
        "zh": "金屬線必須準確接到下面的接觸點",
        "en": "A metal line must land exactly on the contact below it"
      },
      {
        "key": "advanced",
        "zh": "在先進製程中",
        "en": "In advanced processes"
      },
      {
        "key": "fewNm",
        "zh": "層與層之間容許的對準誤差只有幾奈米",
        "en": "the allowed misalignment between layers is only a few nanometers"
      }
    ]
  },
  {
    "chapterId": "ch04",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "微影三大核心異常與對應的防堵對策",
    "captionEn": "The three core lithography failure modes and their containment actions",
    "root": {
      "zh": "微影三大核心異常",
      "en": "Three core lithography failures"
    },
    "branches": [
      {
        "zh": "EUV 隨機微橋接",
        "en": "EUV stochastic micro-bridging",
        "leafZh": "提高劑量並改用金屬氧化物光阻",
        "leafEn": "Raise dose; switch to metal-oxide resist"
      },
      {
        "zh": "吸盤微粒局部失焦",
        "en": "Chuck-particle focus hotspot",
        "leafZh": "暫停曝光、清刷吸盤並重工",
        "leafEn": "Halt exposure, clean chuck, rework wafer"
      },
      {
        "zh": "高階非線性疊對超規",
        "en": "High-order overlay out of spec",
        "leafZh": "逐曝光區修正，超規重工",
        "leafEn": "Per-exposure correction; rework if over spec"
      }
    ]
  },
  {
    "chapterId": "ch04",
    "headingZh": "微影曝光世代與 High-NA 條例總覽",
    "headingEn": "Lithography & High-NA EUV Clauses",
    "foldTables": true,
    "foldSection": true,
    "type": "pictorial",
    "draw": "lithoGens",
    "sourcedNumbers": true,
    "sourceZh": "解析度、波長與 NA 出自本段表格；橫軸是對數刻度，左端約 1000 nm、右端約 8 nm，不印刻度。世代名與用途沿用原本的流程圖。",
    "sourceEn": "Resolution, wavelength and NA come from the table in this section. The axis is logarithmic, from about 1000 nm on the left to about 8 nm on the right, without printed ticks. Generation names and uses are kept from the original flow diagram.",
    "captionZh": "各世代微影的解析度與主要用途（橫軸為對數刻度）",
    "captionEn": "Resolution and main uses of each lithography generation (log scale)",
    "labels": [
      {
        "key": "res",
        "zh": "解析度",
        "en": "Resolution"
      },
      {
        "key": "endL",
        "zh": "1000+ nm",
        "en": "1000+ nm"
      },
      {
        "key": "endR",
        "zh": "~8 nm",
        "en": "~8 nm"
      },
      {
        "key": "g0",
        "zh": "紫外光 g／i-line",
        "en": "UV g-line / i-line",
        "from": "figure"
      },
      {
        "key": "u0",
        "zh": "焊墊、重佈線層與凸塊",
        "en": "Pads, packaging RDL and micro-bumps",
        "from": "figure"
      },
      {
        "key": "g1",
        "zh": "深紫外光 KrF／ArF",
        "en": "DUV KrF / ArF",
        "from": "figure"
      },
      {
        "key": "u1",
        "zh": "上層金屬線與佈植遮罩",
        "en": "Upper BEOL and ion implant masks",
        "from": "figure"
      },
      {
        "key": "g2",
        "zh": "浸潤式與多重圖形化",
        "en": "ArF immersion + multi-patterning",
        "from": "figure"
      },
      {
        "key": "u2",
        "zh": "DRAM 與 FinFET 鰭片",
        "en": "DRAM and FinFET fins",
        "from": "figure"
      },
      {
        "key": "g3",
        "zh": "標準 NA 極紫外光",
        "en": "Low-NA EUV",
        "from": "figure"
      },
      {
        "key": "u3",
        "zh": "減少多重曝光光罩層數",
        "en": "Fewer multi-patterning mask layers",
        "from": "figure"
      },
      {
        "key": "g4",
        "zh": "High-NA 極紫外光",
        "en": "High-NA EUV",
        "from": "figure"
      },
      {
        "key": "u4",
        "zh": "單次曝光取代雙重曝光",
        "en": "Single exposure replaces double patterning",
        "from": "figure"
      },
      {
        "key": "r0",
        "zh": "解析度 350–1000+ nm",
        "en": "Resolution 350–1000+ nm"
      },
      {
        "key": "r1",
        "zh": "解析度 65–180 nm",
        "en": "Resolution 65–180 nm"
      },
      {
        "key": "r2",
        "zh": "單次曝光極限 ~38 nm",
        "en": "Single-exposure limit ~38 nm"
      },
      {
        "key": "r3",
        "zh": "解析度 ~13 nm",
        "en": "~13 nm CD"
      },
      {
        "key": "r4",
        "zh": "單次曝光解析度 ~8 nm",
        "en": "Single-exposure resolution ~8 nm"
      },
      {
        "key": "s0a",
        "zh": "g-line (436 nm)",
        "en": "g-line (436 nm)"
      },
      {
        "key": "s0b",
        "zh": "i-line (365 nm)",
        "en": "i-line (365 nm)"
      },
      {
        "key": "s0c",
        "zh": "NA 0.30–0.65",
        "en": "NA 0.30–0.65"
      },
      {
        "key": "s1a",
        "zh": "KrF (248 nm, NA 0.60–0.93)",
        "en": "KrF (248 nm, NA 0.60–0.93)"
      },
      {
        "key": "s1b",
        "zh": "ArF 乾式 (193 nm, NA 0.85–0.93)",
        "en": "ArF Dry (193 nm, NA 0.85–0.93)"
      },
      {
        "key": "s2a",
        "zh": "ArFi (193 nm + 超純水 n=1.44)",
        "en": "ArFi (193 nm + UPW water n=1.44)"
      },
      {
        "key": "s2b",
        "zh": "NA = 1.35",
        "en": "hyper-NA 1.35"
      },
      {
        "key": "s3b",
        "zh": "13.5 nm EUV",
        "en": "13.5 nm EUV"
      },
      {
        "key": "s3",
        "zh": "NA = 0.33",
        "en": "NA = 0.33"
      },
      {
        "key": "s4",
        "zh": "13.5 nm EUV，NA = 0.55",
        "en": "13.5 nm EUV, NA = 0.55"
      }
    ]
  },
  {
    "chapterId": "ch04",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "foldSection": true,
    "type": "pictorial",
    "draw": "lithoLaws",
    "sourcedNumbers": true,
    "sourceZh": "數值出自本段表格；三欄的名稱與對策沿用原本的分支圖。",
    "sourceEn": "Values come from the table in this section. Column names and responses are kept from the original branch diagram.",
    "captionZh": "微影定律的關鍵數字與各自推動的對策",
    "captionEn": "Key numbers of the lithography laws and the response each drives",
    "labels": [
      {
        "key": "root",
        "zh": "微影光學與統計定律",
        "en": "Litho optical & stochastic laws",
        "from": "figure"
      },
      {
        "key": "b1",
        "zh": "瑞利解析度與焦深",
        "en": "Rayleigh resolution & DOF",
        "from": "figure"
      },
      {
        "key": "l1",
        "zh": "需極平坦 CMP 與超薄光阻",
        "en": "Demands atomic-flat CMP and ultra-thin resist",
        "from": "figure"
      },
      {
        "key": "b2",
        "zh": "EUV 光子散粒雜訊",
        "en": "EUV photon shot noise",
        "from": "figure"
      },
      {
        "key": "l2",
        "zh": "導入金屬氧化物光阻",
        "en": "Drives metal oxide resist (MOR) adoption",
        "from": "figure"
      },
      {
        "key": "b3",
        "zh": "邊緣放置誤差 EPE",
        "en": "Edge placement error (EPE)",
        "from": "figure"
      },
      {
        "key": "l3",
        "zh": "催生自對準接觸孔與通孔",
        "en": "Drives self-aligned contacts and vias",
        "from": "figure"
      },
      {
        "key": "dof",
        "zh": "焦深",
        "en": "Depth-of-Focus"
      },
      {
        "key": "big0",
        "zh": "±15–20 nm",
        "en": "±15–20 nm"
      },
      {
        "key": "cond0",
        "zh": "0.55 NA High-NA EUV",
        "en": "0.55 NA High-NA EUV"
      },
      {
        "key": "photon",
        "zh": "EUV 光子",
        "en": "EUV photon"
      },
      {
        "key": "big1",
        "zh": "91.8 eV",
        "en": "91.8 eV"
      },
      {
        "key": "x14",
        "zh": "為 193nm 光子的 14 倍",
        "en": "14× higher than 193nm DUV"
      },
      {
        "key": "fewer",
        "zh": "EUV 光子數量少 14 倍",
        "en": "14× fewer photons"
      },
      {
        "key": "dose",
        "zh": "相同曝光劑量",
        "en": "at the same dose"
      },
      {
        "key": "ovl",
        "zh": "層間疊對精度",
        "en": "Layer-to-layer Overlay"
      },
      {
        "key": "big2",
        "zh": "Overlay < 1.2–1.5 nm",
        "en": "Overlay < 1.2–1.5 nm"
      },
      {
        "key": "cond2",
        "zh": "Pitch = 20 nm",
        "en": "20 nm Pitch"
      }
    ]
  },
  {
    "chapterId": "ch04",
    "headingZh": "常見異常",
    "headingEn": "Common problems",
    "type": "pictorial",
    "draw": "lithoDefects",
    "captionZh": "四種微影異常長什麼樣，以及各自的結果",
    "captionEn": "Four lithography problems: what each looks like and what it causes",
    "labels": [
      {
        "key": "cd",
        "zh": "CD 偏大或偏小",
        "en": "CD too large or too small"
      },
      {
        "key": "cdResult",
        "zh": "線寬不合格",
        "en": "Line width out of spec"
      },
      {
        "key": "defocus",
        "zh": "局部失焦",
        "en": "Local defocus"
      },
      {
        "key": "defocusResult",
        "zh": "局部圖形模糊",
        "en": "Blurred pattern in one area"
      },
      {
        "key": "overlay",
        "zh": "Overlay 超規",
        "en": "Overlay out of spec"
      },
      {
        "key": "overlayResult",
        "zh": "上下層接不上",
        "en": "Layers do not connect"
      },
      {
        "key": "resist",
        "zh": "光阻缺陷",
        "en": "Resist defects"
      },
      {
        "key": "resistResult",
        "zh": "圖形缺損",
        "en": "Missing or damaged patterns"
      },
      {
        "key": "particle",
        "zh": "顆粒",
        "en": "Particle"
      }
    ]
  },
  {
    "chapterId": "ch04",
    "headingZh": "微影的三個主角",
    "headingEn": "The three key players",
    "type": "pictorial",
    "draw": "scannerFields",
    "sourcedNumbers": true,
    "sourceZh": "縮小四倍出自本段正文：光罩圖形與一個曝光區的邊長按四比一畫；晶圓大小與格數只是示意。淡青色的格子已經曝過，箭頭是曝光的順序。",
    "sourceEn": "The four-times reduction comes from this section: the mask pattern and one exposure field are drawn at a four-to-one edge ratio. Wafer size and field count are schematic. Pale teal fields are already exposed; arrows show the exposure order.",
    "captionZh": "光罩、光阻與曝光機：一個曝光區接一個曝光區",
    "captionEn": "Mask, resist and scanner: one exposure field after another",
    "labels": [
      {
        "key": "mask",
        "zh": "光罩（Reticle / Mask）",
        "en": "Mask (reticle)"
      },
      {
        "key": "quartz",
        "zh": "石英板",
        "en": "Quartz plate"
      },
      {
        "key": "dozens",
        "zh": "數十片",
        "en": "Dozens"
      },
      {
        "key": "quarter",
        "zh": "縮小四倍",
        "en": "One-quarter of its size"
      },
      {
        "key": "scanner",
        "zh": "曝光機（Scanner）",
        "en": "Scanner"
      },
      {
        "key": "field",
        "zh": "曝光區",
        "en": "Exposure field"
      },
      {
        "key": "hundred",
        "zh": "上百次",
        "en": "More than a hundred repetitions"
      },
      {
        "key": "pr",
        "zh": "光阻（Photoresist，簡稱 PR）",
        "en": "Photoresist (PR)"
      },
      {
        "key": "wafer",
        "zh": "晶圓",
        "en": "Wafer"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "熱氧化：讓矽自己長出氧化層",
    "headingEn": "Thermal oxidation: letting silicon grow its own oxide",
    "type": "pictorial",
    "draw": "thermalOxidation",
    "captionZh": "乾式與濕式熱氧化對照；虛線是原本的矽表面",
    "captionEn": "Dry vs. wet thermal oxidation; the dashed line is the original silicon surface",
    "labels": [
      {
        "key": "gasIn",
        "zh": "通入氧氣或水蒸氣",
        "en": "Oxygen or steam flows in"
      },
      {
        "key": "furnace",
        "zh": "爐管",
        "en": "Furnace"
      },
      {
        "key": "batchTool",
        "zh": "批次式機台",
        "en": "Batch tools"
      },
      {
        "key": "hundred",
        "zh": "一次可以處理上百片晶圓",
        "en": "Can process more than a hundred wafers at once"
      },
      {
        "key": "dry",
        "zh": "乾式氧化",
        "en": "Dry oxidation"
      },
      {
        "key": "useO2",
        "zh": "使用氧氣",
        "en": "Uses oxygen"
      },
      {
        "key": "slow",
        "zh": "生長慢",
        "en": "Grows slowly"
      },
      {
        "key": "quality",
        "zh": "品質非常好",
        "en": "The quality is excellent"
      },
      {
        "key": "wet",
        "zh": "濕式氧化",
        "en": "Wet oxidation"
      },
      {
        "key": "useSteam",
        "zh": "使用水蒸氣",
        "en": "Uses steam"
      },
      {
        "key": "fast",
        "zh": "生長快",
        "en": "Grows fast"
      },
      {
        "key": "thicker",
        "zh": "適合需要較厚氧化層的地方",
        "en": "Suits places that need a thicker oxide"
      },
      {
        "key": "silicon",
        "zh": "矽",
        "en": "Silicon"
      },
      {
        "key": "sio2",
        "zh": "二氧化矽",
        "en": "Silicon dioxide"
      },
      {
        "key": "consumed",
        "zh": "「吃掉」一部分矽",
        "en": "\"Consuming\" part of the silicon"
      },
      {
        "key": "oxideLayer",
        "zh": "氧化層",
        "en": "the oxide"
      },
      {
        "key": "interface",
        "zh": "和矽之間的介面品質特別好",
        "en": "The interface between the oxide and the silicon is especially good"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "PVD：把原子「撞」下來",
    "headingEn": "PVD: knocking atoms loose",
    "type": "flow",
    "captionZh": "濺鍍時原子從靶材飛到晶圓、堆積成膜的過程",
    "captionEn": "How sputtering knocks atoms off a target to build a film on the wafer",
    "steps": [
      {
        "zh": "帶電氬離子",
        "en": "Charged argon ions",
        "noteZh": "在真空腔體中撞擊靶材",
        "noteEn": "Strike the target in a vacuum chamber",
        "icon": "pmos"
      },
      {
        "zh": "靶材原子被撞出",
        "en": "Atoms knocked off the target",
        "icon": "sputter"
      },
      {
        "zh": "飛到晶圓上",
        "en": "Atoms fly onto the wafer",
        "icon": "deposit"
      },
      {
        "zh": "堆積成薄膜",
        "en": "Build up a film",
        "noteZh": "主要是鋁、鈦等金屬",
        "noteEn": "Mainly metals such as aluminum, titanium",
        "icon": "layers"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "ALD：一次只鋪一層原子",
    "headingEn": "ALD: one layer of atoms at a time",
    "type": "cycle",
    "captionZh": "ALD 輪流通入兩種氣體、每輪約長一層原子",
    "captionEn": "The ALD cycle: two gases in turn, about one atomic layer each cycle",
    "steps": [
      {
        "zh": "通入第一種氣體",
        "en": "First gas flows in",
        "noteZh": "鋪滿一層後自動停止",
        "noteEn": "Covers one layer, then stops by itself",
        "icon": "gas"
      },
      {
        "zh": "抽乾淨",
        "en": "Purge the chamber",
        "icon": "exhaust"
      },
      {
        "zh": "通入第二種氣體",
        "en": "Second gas flows in",
        "noteZh": "與表面那層反應",
        "noteEn": "Reacts with that layer",
        "icon": "gas"
      }
    ],
    "centerZh": "每一輪約長一層原子",
    "centerEn": "About one atomic layer per cycle"
  },
  {
    "chapterId": "ch05",
    "headingZh": "薄膜要看哪些指標",
    "headingEn": "What to measure in a thin film",
    "type": "pictorial",
    "draw": "filmMetrics",
    "captionZh": "薄膜的五個指標，以及填窄溝時兩種長法的結果",
    "captionEn": "Five film metrics, and two ways a narrow trench can fill",
    "labels": [
      {
        "key": "thickness",
        "zh": "膜厚",
        "en": "Thickness"
      },
      {
        "key": "uniformity",
        "zh": "均勻度",
        "en": "Uniformity"
      },
      {
        "key": "stepCoverage",
        "zh": "階梯覆蓋",
        "en": "Step coverage"
      },
      {
        "key": "stress",
        "zh": "應力",
        "en": "Stress"
      },
      {
        "key": "particles",
        "zh": "微粒",
        "en": "Particles"
      },
      {
        "key": "fillTitle",
        "zh": "要把窄溝填滿時",
        "en": "When filling a narrow trench"
      },
      {
        "key": "notAlwaysGood",
        "zh": "覆蓋均勻不一定是好事",
        "en": "Even coverage is not always good"
      },
      {
        "key": "sidewalls",
        "zh": "側壁同時長厚",
        "en": "The sidewalls thicken at the same rate"
      },
      {
        "key": "closeFirst",
        "zh": "開口可能先被封住",
        "en": "The opening may close first"
      },
      {
        "key": "void",
        "zh": "裡面就留下空洞",
        "en": "leave a void inside"
      },
      {
        "key": "voidShort",
        "zh": "空洞",
        "en": "Void"
      },
      {
        "key": "bottomUp",
        "zh": "從底部往上長",
        "en": "Grow from the bottom up"
      },
      {
        "key": "want",
        "zh": "填溝時反而希望從底部往上長",
        "en": "For gap fill, you actually want the film to grow from the bottom up"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "foldSection": true,
    "captionZh": "薄膜三大核心異常與對應的永久防呆對策",
    "captionEn": "Three core thin-film failures and the countermeasure for each",
    "type": "pictorial",
    "draw": "filmFailures",
    "labels": [
      {
        "key": "root",
        "zh": "薄膜三大核心異常",
        "en": "Three core thin-film failures",
        "from": "figure"
      },
      {
        "key": "b1",
        "zh": "孔口懸垂夾斷空洞",
        "en": "Overhang pinch-off keyhole void",
        "from": "figure"
      },
      {
        "key": "l1",
        "zh": "降溫、沉積蝕刻循環或 ALD",
        "en": "Lower temperature, dep-etch-dep, or ALD",
        "from": "figure"
      },
      {
        "key": "b2",
        "zh": "深孔底部 ALD 變薄",
        "en": "ALD thinning at deep-hole bottoms",
        "from": "figure"
      },
      {
        "key": "l2",
        "zh": "駐留模式 ALD 並監控壓力",
        "en": "Soak-mode ALD with pressure-pulse monitoring",
        "from": "figure"
      },
      {
        "key": "b3",
        "zh": "電鍍銅底部空洞",
        "en": "Electroplated copper bottom voids",
        "from": "figure"
      },
      {
        "key": "l3",
        "zh": "釕／鈷襯墊並即時補液",
        "en": "Ru/Co liners and real-time additive dosing",
        "from": "figure"
      },
      {
        "key": "overhang",
        "zh": "懸垂（Overhang）",
        "en": "Overhang"
      },
      {
        "key": "keyhole",
        "zh": "鑰匙孔",
        "en": "Keyhole"
      },
      {
        "key": "thin",
        "zh": "孔底呈現未飽和變薄",
        "en": "Starves the hole bottom"
      },
      {
        "key": "seedBreak",
        "zh": "銅晶種層（Cu Seed）在細孔側壁斷裂不連續",
        "en": "Discontinuous PVD Cu seed coverage on lower sidewalls"
      },
      {
        "key": "bottomVoid",
        "zh": "底部空洞",
        "en": "Bottom voids"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "六大薄膜沉積與電鍍超填條例總覽",
    "headingEn": "Thin-Film & ECD Superfill Clauses",
    "foldTables": true,
    "foldSection": true,
    "type": "pictorial",
    "draw": "filmClauses",
    "captionZh": "六大長膜條例分三組，以及電鍍超填的三個階段",
    "captionEn": "The six film-growth clauses in three groups, and three stages of ECD superfill",
    "labels": [
      {
        "key": "c1",
        "zh": "從矽晶長出",
        "en": "Grown from the Si crystal",
        "from": "figure"
      },
      {
        "key": "k1a",
        "zh": "熱氧化",
        "en": "Thermal oxide",
        "from": "figure"
      },
      {
        "key": "d1a",
        "zh": "消耗矽基板自體生成",
        "en": "Grows by consuming the Si substrate",
        "from": "figure"
      },
      {
        "key": "n1a",
        "zh": "I/O 閘極與溝槽內襯氧化層",
        "en": "I/O gate oxides and STI liner oxide",
        "from": "figure"
      },
      {
        "key": "k1b",
        "zh": "磊晶",
        "en": "Epitaxy",
        "from": "figure"
      },
      {
        "key": "d1b",
        "zh": "延續單晶晶格，可選擇性生長",
        "en": "Extends the crystal lattice, can be selective",
        "from": "figure"
      },
      {
        "key": "n1b",
        "zh": "源汲極應變磊晶與超晶格",
        "en": "Strained S/D epi and Si/SiGe superlattices",
        "from": "figure"
      },
      {
        "key": "c2",
        "zh": "氣相沉積",
        "en": "Vapor-phase deposition",
        "from": "figure"
      },
      {
        "key": "k2a",
        "zh": "CVD 家族",
        "en": "CVD family",
        "from": "figure"
      },
      {
        "key": "d2a",
        "zh": "低壓保形、電漿低溫、流動填孔",
        "en": "LPCVD conformal, PECVD low-temp, FCVD gap-fill",
        "from": "figure"
      },
      {
        "key": "n2a",
        "zh": "ONO 堆疊與溝槽填充",
        "en": "ONO stacks and STI gap-fill",
        "from": "figure"
      },
      {
        "key": "k2b",
        "zh": "ALD",
        "en": "ALD",
        "from": "figure"
      },
      {
        "key": "d2b",
        "zh": "自限性循環，原子級保形覆蓋",
        "en": "Self-limiting cycles, atomic-level conformality",
        "from": "figure"
      },
      {
        "key": "n2b",
        "zh": "高介電閘極、GAA 與電容",
        "en": "High-k gates, GAA and capacitors",
        "from": "figure"
      },
      {
        "key": "k2c",
        "zh": "PVD",
        "en": "PVD",
        "from": "figure"
      },
      {
        "key": "d2c",
        "zh": "視線傳播，iPVD 改善深孔覆蓋",
        "en": "Line of sight; iPVD improves deep-via coverage",
        "from": "figure"
      },
      {
        "key": "n2c",
        "zh": "阻擋層、銅晶種層與鋁墊",
        "en": "Barriers, Cu seed layers and Al pads",
        "from": "figure"
      },
      {
        "key": "c3",
        "zh": "液相電鍍",
        "en": "Liquid-phase plating",
        "from": "figure"
      },
      {
        "key": "k3a",
        "zh": "電鍍超填",
        "en": "ECD superfill",
        "from": "figure"
      },
      {
        "key": "d3a",
        "zh": "添加劑驅動由孔底往上填銅",
        "en": "Additives drive bottom-up Cu fill",
        "from": "figure"
      },
      {
        "key": "n3a",
        "zh": "銅導線、穿矽孔與重佈線層",
        "en": "Cu wires, TSV fill and RDL routing",
        "from": "figure"
      },
      {
        "key": "seed",
        "zh": "銅晶種層（Cu Seed）",
        "en": "Cu seed layers"
      },
      {
        "key": "bottomUp",
        "zh": "由孔底往上",
        "en": "Bottom-up"
      },
      {
        "key": "voidFree",
        "zh": "無空洞超填",
        "en": "Void-free superfilling"
      },
      {
        "key": "diel",
        "zh": "介電層",
        "en": "Dielectrics"
      },
      {
        "key": "supp",
        "zh": "抑制劑（Suppressor，PEG 阻擋孔口）",
        "en": "Suppressor (PEG at trench mouth)"
      },
      {
        "key": "acc",
        "zh": "加速劑（Accelerator，SPS 富集於孔底）",
        "en": "Accelerator (SPS concentrating at bottom curvature)"
      },
      {
        "key": "lev",
        "zh": "整平劑",
        "en": "Leveler"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "foldSection": true,
    "type": "pictorial",
    "draw": "filmLaws",
    "sourcedNumbers": true,
    "sourceZh": "數值出自本段表格；氧化層剖面依消耗 0.44 的比例畫，虛線是原本的矽表面。曲線、深孔與溝槽的形狀只是示意，深孔沒有按深寬比畫。",
    "sourceEn": "Values come from the table in this section. The oxide cross-section follows the 0.44 consumption ratio, and the dashed line is the original silicon surface. The curve, hole and trench shapes are schematic, and the hole is not drawn to its aspect ratio.",
    "captionZh": "三大薄膜與電鍍定律的關鍵數字與製程控制",
    "captionEn": "Key numbers of three thin-film and plating laws and what each governs",
    "labels": [
      {
        "key": "root",
        "zh": "薄膜與電鍍動力學定律",
        "en": "Thin-film & ECD kinetic laws",
        "from": "figure"
      },
      {
        "key": "b1",
        "zh": "線性－拋物線氧化模型",
        "en": "Deal-Grove linear-parabolic law",
        "from": "figure"
      },
      {
        "key": "l1",
        "zh": "預測氧化層厚度與矽消耗",
        "en": "Predicts oxide thickness and Si consumed",
        "from": "figure"
      },
      {
        "key": "b2",
        "zh": "ALD 深孔飽和時間",
        "en": "ALD deep-hole saturation time",
        "from": "figure"
      },
      {
        "key": "l2",
        "zh": "決定深孔 ALD 最低脈衝時間",
        "en": "Sets minimum ALD pulse time in deep holes",
        "from": "figure"
      },
      {
        "key": "b3",
        "zh": "法拉第與曲率加速超填",
        "en": "Faraday & curvature-enhanced fill",
        "from": "figure"
      },
      {
        "key": "l3",
        "zh": "孔底長得比孔口快、無空洞",
        "en": "Bottom outgrows the mouth: void-free fill",
        "from": "figure"
      },
      {
        "key": "t1",
        "zh": "1",
        "en": "1.0"
      },
      {
        "key": "nm",
        "zh": "nm",
        "en": "nm"
      },
      {
        "key": "t044",
        "zh": "0.44",
        "en": "0.44"
      },
      {
        "key": "consumed",
        "zh": "消耗",
        "en": "consumed"
      },
      {
        "key": "si",
        "zh": "單晶矽",
        "en": "Substrate Si"
      },
      {
        "key": "ox",
        "zh": "氧化層",
        "en": "Oxide"
      },
      {
        "key": "thk",
        "zh": "氧化層厚度",
        "en": "Oxide thickness"
      },
      {
        "key": "time",
        "zh": "時間",
        "en": "Time"
      },
      {
        "key": "rate",
        "zh": "界面反應速率常數",
        "en": "Reaction rate"
      },
      {
        "key": "diff",
        "zh": "擴散係數",
        "en": "Diffusion-limited"
      },
      {
        "key": "v50",
        "zh": "50:1",
        "en": "50:1"
      },
      {
        "key": "ar",
        "zh": "深寬比",
        "en": "Aspect ratio"
      },
      {
        "key": "pulse",
        "zh": "最低脈衝時間",
        "en": "Minimum precursor pulse times"
      },
      {
        "key": "v510",
        "zh": "5–10 倍",
        "en": "5–10×"
      },
      {
        "key": "growth",
        "zh": "底部生長速度",
        "en": "Bottom Cu growth"
      },
      {
        "key": "mouth",
        "zh": "孔口",
        "en": "Mouth"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "為什麼需要薄膜",
    "headingEn": "Why thin films are needed",
    "type": "pictorial",
    "draw": "filmStack",
    "captionZh": "晶片由一層層薄膜疊成，各層從幾個原子到幾微米厚（非特定製程）",
    "captionEn": "A generic film stack: layers from a few atoms to a few micrometers thick",
    "labels": [
      {
        "key": "metal",
        "zh": "金屬",
        "en": "Metals"
      },
      {
        "key": "nitride",
        "zh": "氮化矽",
        "en": "Silicon nitride"
      },
      {
        "key": "etchStop",
        "zh": "蝕刻停止層",
        "en": "Etch stop layers"
      },
      {
        "key": "oxide",
        "zh": "氧化矽",
        "en": "Silicon oxide"
      },
      {
        "key": "poly",
        "zh": "多晶矽",
        "en": "Polysilicon"
      },
      {
        "key": "hardMask",
        "zh": "硬遮罩",
        "en": "Hard masks"
      },
      {
        "key": "helpPrecise",
        "zh": "幫助後續步驟做得更準",
        "en": "Help later steps come out more precisely"
      },
      {
        "key": "insulate",
        "zh": "絕緣",
        "en": "Insulation"
      },
      {
        "key": "insulateDoes",
        "zh": "把導線和元件隔開",
        "en": "Separate wires and devices"
      },
      {
        "key": "conduct",
        "zh": "導電",
        "en": "Conduction"
      },
      {
        "key": "conductDoes",
        "zh": "用來傳遞訊號",
        "en": "Carry signals"
      },
      {
        "key": "support",
        "zh": "輔助製程",
        "en": "Process support"
      },
      {
        "key": "supportDoes",
        "zh": "例如硬遮罩、蝕刻停止層",
        "en": "For example, hard masks and etch stop layers"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "CVD：用氣體「長」出薄膜",
    "headingEn": "CVD: growing films from gases",
    "type": "pictorial",
    "draw": "cvdTypes",
    "captionZh": "LPCVD 與 PECVD：反應能量從哪裡來",
    "captionEn": "LPCVD and PECVD: where the reaction energy comes from",
    "labels": [
      {
        "key": "gasesIn",
        "zh": "把幾種氣體通進腔體",
        "en": "Several gases flow into a chamber"
      },
      {
        "key": "solidFilm",
        "zh": "留下固態的薄膜",
        "en": "Leaving behind a solid film"
      },
      {
        "key": "exhaust",
        "zh": "廢氣則被抽走",
        "en": "The gaseous by-products are pumped away"
      },
      {
        "key": "lpcvd",
        "zh": "LPCVD",
        "en": "LPCVD"
      },
      {
        "key": "lpName",
        "zh": "低壓 CVD",
        "en": "low-pressure CVD"
      },
      {
        "key": "lpEnergy",
        "zh": "靠高溫提供能量",
        "en": "Uses high temperature for energy"
      },
      {
        "key": "lpGood",
        "zh": "薄膜均勻、品質好",
        "en": "The films are uniform and high quality"
      },
      {
        "key": "lpHot",
        "zh": "但溫度高",
        "en": "But the temperature is high"
      },
      {
        "key": "pecvd",
        "zh": "PECVD",
        "en": "PECVD"
      },
      {
        "key": "peName",
        "zh": "電漿輔助 CVD",
        "en": "plasma-enhanced CVD"
      },
      {
        "key": "peEnergy",
        "zh": "用電漿提供能量",
        "en": "Uses a plasma for energy"
      },
      {
        "key": "peLow",
        "zh": "可以在較低溫度下沉積",
        "en": "Deposition can happen at lower temperatures"
      },
      {
        "key": "plasma",
        "zh": "電漿",
        "en": "Plasma"
      },
      {
        "key": "fitMetal",
        "zh": "適合已經有金屬的晶圓",
        "en": "It suits wafers that already have metal on them"
      },
      {
        "key": "metalCant",
        "zh": "金屬承受不了高溫",
        "en": "The metal cannot survive high temperatures"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "磊晶：長出延續晶格的單晶",
    "headingEn": "Epitaxy: growing a crystal that continues the lattice",
    "type": "pictorial",
    "draw": "epitaxy",
    "captionZh": "磊晶：新膜延續底下晶圓的原子排列",
    "captionEn": "Epitaxy: the new film continues the atomic arrangement of the wafer below",
    "labels": [
      {
        "key": "specialCvd",
        "zh": "磊晶是一種特殊的 CVD",
        "en": "Epitaxy is a special kind of CVD"
      },
      {
        "key": "newFilm",
        "zh": "新長出的薄膜",
        "en": "The new film"
      },
      {
        "key": "wafer",
        "zh": "底下晶圓",
        "en": "The wafer underneath"
      },
      {
        "key": "continues",
        "zh": "延續底下晶圓的原子排列",
        "en": "Continues the atomic arrangement of the wafer underneath"
      },
      {
        "key": "singleCrystal",
        "zh": "成為單晶",
        "en": "So the film is also a single crystal"
      },
      {
        "key": "advanced",
        "zh": "先進電晶體",
        "en": "Advanced transistors"
      },
      {
        "key": "stack",
        "zh": "交替堆疊的矽與矽鍺層",
        "en": "Alternating stacks of silicon and silicon germanium"
      },
      {
        "key": "si",
        "zh": "矽",
        "en": "Silicon"
      },
      {
        "key": "sige",
        "zh": "矽鍺",
        "en": "Silicon germanium"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "常見異常",
    "headingEn": "Common problems",
    "type": "pictorial",
    "draw": "filmDefects",
    "captionZh": "五種薄膜異常長什麼樣，以及各自的結果",
    "captionEn": "Five thin-film problems: what each looks like and what it causes",
    "labels": [
      {
        "key": "thick",
        "zh": "膜厚偏厚或偏薄",
        "en": "Film too thick or too thin"
      },
      {
        "key": "thickResult",
        "zh": "影響電性與後續蝕刻",
        "en": "Affects electrical behavior and later etching"
      },
      {
        "key": "uniform",
        "zh": "均勻度差",
        "en": "Poor uniformity"
      },
      {
        "key": "uniformResult",
        "zh": "晶圓不同位置的晶粒表現不同",
        "en": "Dies behave differently across the wafer"
      },
      {
        "key": "particles",
        "zh": "微粒",
        "en": "Particles"
      },
      {
        "key": "particlesResult",
        "zh": "缺陷、良率下降",
        "en": "Defects, lower yield"
      },
      {
        "key": "peel",
        "zh": "薄膜剝落或龜裂",
        "en": "Film peeling or cracking"
      },
      {
        "key": "peelResult",
        "zh": "結構損壞",
        "en": "Structural damage"
      },
      {
        "key": "voids",
        "zh": "空洞",
        "en": "Voids"
      },
      {
        "key": "voidsResult",
        "zh": "斷路或可靠度問題",
        "en": "Open circuits or reliability problems"
      }
    ]
  },
  {
    "chapterId": "ch06",
    "headingZh": "蝕刻在做什麼",
    "headingEn": "What etching does",
    "type": "pictorial",
    "draw": "etchTransfer",
    "captionZh": "蝕刻時光阻蓋住與未蓋住區域的不同結果",
    "captionEn": "What happens to covered and uncovered areas when the pattern is etched",
    "labels": [
      {
        "key": "resist",
        "zh": "光阻",
        "en": "Photoresist"
      },
      {
        "key": "onlyResist",
        "zh": "微影完成後，電路圖形只存在於光阻上",
        "en": "After lithography, the circuit pattern exists only in the photoresist"
      },
      {
        "key": "covered",
        "zh": "被光阻蓋住的地方",
        "en": "Areas covered by resist"
      },
      {
        "key": "protected",
        "zh": "受到保護",
        "en": "are protected"
      },
      {
        "key": "uncovered",
        "zh": "沒有被蓋住的地方",
        "en": "Uncovered areas"
      },
      {
        "key": "removed",
        "zh": "被去除",
        "en": "are removed"
      },
      {
        "key": "transfer",
        "zh": "把這個圖形「轉印」到底下的材料",
        "en": "\"Transfer\" that pattern into the material underneath"
      },
      {
        "key": "stencil",
        "zh": "光阻就是那張貼紙",
        "en": "The photoresist is that stencil"
      }
    ]
  },
  {
    "chapterId": "ch06",
    "headingZh": "怎麼知道什麼時候該停",
    "headingEn": "How to know when to stop",
    "type": "flow",
    "captionZh": "從挖到下一層到終點偵測、再過度蝕刻的順序",
    "captionEn": "How the tool detects the endpoint from plasma light, then over etches",
    "steps": [
      {
        "zh": "挖穿目標材料",
        "en": "Etch clears the target",
        "noteZh": "碰到下一層",
        "noteEn": "Reaches the next layer"
      },
      {
        "zh": "電漿化學成分改變",
        "en": "Plasma chemistry changes"
      },
      {
        "zh": "發光跟著改變",
        "en": "Emitted light changes",
        "noteZh": "顏色與強度都改變",
        "noteEn": "Color and intensity shift"
      },
      {
        "zh": "終點偵測",
        "en": "Endpoint detection",
        "noteZh": "機台監測光判斷挖到底",
        "noteEn": "Tool reads the light to know it is through"
      },
      {
        "zh": "過度蝕刻",
        "en": "Over etch",
        "noteZh": "多蝕刻一點確保清乾淨",
        "noteEn": "A little longer to clear everywhere"
      }
    ]
  },
  {
    "chapterId": "ch06",
    "headingZh": "蝕刻之後",
    "headingEn": "After etching",
    "type": "flow",
    "captionZh": "蝕刻完成後的去光阻、清洗與 AEI 檢查順序",
    "captionEn": "What happens after etching: strip, clean, then inspect (AEI)",
    "steps": [
      {
        "zh": "去光阻",
        "en": "Ashing / strip",
        "noteZh": "氧電漿燒掉光阻",
        "noteEn": "Oxygen plasma burns off the resist",
        "icon": "plasma"
      },
      {
        "zh": "清洗",
        "en": "Clean",
        "icon": "clean"
      },
      {
        "zh": "AEI 蝕刻後檢查",
        "en": "After etch inspection (AEI)",
        "noteZh": "量測線寬與缺陷",
        "noteEn": "Measure line width and defects",
        "icon": "microscope"
      }
    ]
  },
  {
    "chapterId": "ch06",
    "headingZh": "越挖越深：高深寬比蝕刻",
    "headingEn": "Digging deeper: high-aspect-ratio etching",
    "type": "branch",
    "captionZh": "孔越深時高深寬比蝕刻可能出現的問題",
    "captionEn": "What can go wrong as a high-aspect-ratio hole gets deeper",
    "root": {
      "zh": "孔越挖越深",
      "en": "The hole gets deeper",
      "noteZh": "離子越難抵達底部",
      "noteEn": "Ions struggle to reach the bottom"
    },
    "branches": [
      {
        "zh": "蝕刻速度變慢",
        "en": "The etch slows down"
      },
      {
        "zh": "孔變彎或扭曲",
        "en": "The hole bends or twists"
      },
      {
        "zh": "中段被挖得較寬",
        "en": "The middle becomes wider"
      }
    ]
  },
  {
    "chapterId": "ch06",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "乾蝕刻三大致命異常與對應的永久防呆對策",
    "captionEn": "Three critical dry-etch failures and their permanent countermeasures",
    "root": {
      "zh": "乾蝕刻三大致命異常",
      "en": "Three critical dry-etch failures"
    },
    "branches": [
      {
        "zh": "底部充電側向掏空",
        "en": "Charging-induced foot notching",
        "leafZh": "過蝕刻改用同步脈衝電漿",
        "leafEn": "Pulsed plasma during over etch"
      },
      {
        "zh": "超深孔鼓出與扭曲",
        "en": "Deep-hole bowing and twisting",
        "leafZh": "超低溫蝕刻搭配硬遮罩",
        "leafEn": "Cryogenic etch with hard masks"
      },
      {
        "zh": "密集小孔蝕刻不穿",
        "en": "Dense narrow vias not opened",
        "leafZh": "虛設圖形與蝕刻停止層",
        "leafEn": "Dummy fill and an etch stop layer"
      }
    ]
  },
  {
    "chapterId": "ch06",
    "headingZh": "電漿蝕刻、Cryo-HAR 與 Bosch TSV 條例總覽",
    "headingEn": "Plasma Etch, Cryo-HAR & Bosch TSV Clauses",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "四類蝕刻條例與各自的代表應用。",
    "captionEn": "Four etch clause categories and their representative applications.",
    "root": {
      "zh": "電漿與原子層蝕刻條例",
      "en": "Plasma & atomic layer etch clauses",
      "icon": "etch"
    },
    "branches": [
      {
        "zh": "電容／感應耦合 RIE",
        "en": "CCP vs. ICP reactive ion etch",
        "leafZh": "鰭片、溝槽、接觸孔與雙鑲嵌",
        "leafEn": "Fins, STI, contacts and dual damascene",
        "icon": "plasma"
      },
      {
        "zh": "極低溫高深寬比蝕刻",
        "en": "Cryogenic high-AR (Cryo-HAR) etch",
        "leafZh": "NAND 通道孔、DRAM 電容",
        "leafEn": "NAND channel holes and DRAM capacitors",
        "icon": "snowflake"
      },
      {
        "zh": "波希法深矽蝕刻",
        "en": "Bosch deep RIE (DRIE)",
        "leafZh": "中介層與晶粒穿矽孔、MEMS",
        "leafEn": "Interposer and die TSVs, and MEMS",
        "icon": "deep-hole"
      },
      {
        "zh": "原子層蝕刻與選擇性釋放",
        "en": "ALE & selective isotropic release",
        "leafZh": "GAA 通道釋放與內間隔壁",
        "leafEn": "GAA channel release and inner spacers",
        "icon": "gaa"
      }
    ]
  },
  {
    "chapterId": "ch06",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三大蝕刻定律各自對應的深孔與奈米片對策。",
    "captionEn": "How each etch law shapes deep-hole and nanosheet process control.",
    "root": {
      "zh": "電漿與原子層蝕刻定律",
      "en": "Plasma & ALE quantitative laws"
    },
    "branches": [
      {
        "zh": "鞘層與離子入射角定律",
        "en": "Sheath & ion angular spread law",
        "leafZh": "高偏壓讓離子直射深孔底",
        "leafEn": "High bias drives ions straight to hole bottoms"
      },
      {
        "zh": "深寬比相依蝕刻 ARDE",
        "en": "Aspect-ratio dependent etch (ARDE)",
        "leafZh": "需高選擇比蝕刻停止層",
        "leafEn": "Requires high-selectivity etch stop layers"
      },
      {
        "zh": "原子層蝕刻協同因子",
        "en": "ALE synergy factor law",
        "leafZh": "消除 RIE Lag 與晶格損傷",
        "leafEn": "Removes RIE lag and lattice damage"
      }
    ]
  },
  {
    "chapterId": "ch06",
    "headingZh": "電漿：蝕刻的工具",
    "headingEn": "Plasma: the etching tool",
    "type": "pictorial",
    "draw": "plasma",
    "captionZh": "氣體變成電漿：離子、電子與活潑原子團各司其職",
    "captionEn": "Gas turned into plasma: ions, electrons and reactive fragments each have a job",
    "labels": [
      {
        "key": "plasmaIs",
        "zh": "電漿是氣體被高能量激發後的狀態",
        "en": "A plasma is a gas that has been excited by high energy"
      },
      {
        "key": "fourth",
        "zh": "物質的第四態",
        "en": "The fourth state of matter"
      },
      {
        "key": "gasIn",
        "zh": "通入特定氣體",
        "en": "Feeds specific gases"
      },
      {
        "key": "vacuum",
        "zh": "真空腔體",
        "en": "A vacuum chamber"
      },
      {
        "key": "rf",
        "zh": "射頻電力",
        "en": "Radio-frequency (RF) power"
      },
      {
        "key": "glow",
        "zh": "腔體裡會發出微弱的光",
        "en": "The chamber gives off a faint glow"
      },
      {
        "key": "ions",
        "zh": "離子",
        "en": "Ions"
      },
      {
        "key": "electrons",
        "zh": "電子",
        "en": "Electrons"
      },
      {
        "key": "radicals",
        "zh": "非常活潑的原子團",
        "en": "Highly reactive fragments of molecules"
      },
      {
        "key": "fastPrecise",
        "zh": "又快又準地往下挖",
        "en": "Etch downward both fast and precisely"
      },
      {
        "key": "ionsDirection",
        "zh": "離子則負責提供方向",
        "en": "The ions provide the direction"
      },
      {
        "key": "radicalsReact",
        "zh": "活潑原子團負責和材料發生化學反應",
        "en": "The reactive fragments in the plasma react chemically with the material"
      }
    ]
  },
  {
    "chapterId": "ch06",
    "headingZh": "蝕刻要看哪些指標",
    "headingEn": "What to measure in etching",
    "type": "pictorial",
    "draw": "etchMetrics",
    "captionZh": "一個蝕刻溝槽上的五個指標",
    "captionEn": "Five etch metrics on one etched trench",
    "labels": [
      {
        "key": "afterLitho",
        "zh": "微影後",
        "en": "After lithography"
      },
      {
        "key": "afterEtch",
        "zh": "蝕刻後",
        "en": "After etching"
      },
      {
        "key": "targetMat",
        "zh": "要挖的材料",
        "en": "The target material"
      },
      {
        "key": "notWanted",
        "zh": "不想挖的材料",
        "en": "The materials you do not want to etch"
      },
      {
        "key": "selResist",
        "zh": "對光阻的選擇比",
        "en": "Selectivity to the photoresist"
      },
      {
        "key": "selUnder",
        "zh": "對下層材料的選擇比",
        "en": "selectivity to the layer underneath"
      },
      {
        "key": "rate",
        "zh": "蝕刻率",
        "en": "Etch rate"
      },
      {
        "key": "uniformity",
        "zh": "均勻度",
        "en": "Uniformity"
      },
      {
        "key": "selectivity",
        "zh": "選擇比",
        "en": "Selectivity"
      },
      {
        "key": "profile",
        "zh": "輪廓",
        "en": "Profile"
      },
      {
        "key": "cd",
        "zh": "CD 變化",
        "en": "CD change"
      }
    ]
  },
  {
    "chapterId": "ch07",
    "headingZh": "兩個最重要的參數",
    "headingEn": "The two most important parameters",
    "type": "pictorial",
    "draw": "doseEnergy",
    "captionZh": "劑量決定濃度，能量決定深度",
    "captionEn": "Dose sets the concentration; energy sets the depth.",
    "labels": [
      {
        "key": "energy",
        "zh": "能量",
        "en": "Energy"
      },
      {
        "key": "energyDef",
        "zh": "離子的速度有多快",
        "en": "How fast the ions travel"
      },
      {
        "key": "energySets",
        "zh": "決定打得多深",
        "en": "It sets how deep they go"
      },
      {
        "key": "dose",
        "zh": "劑量",
        "en": "Dose"
      },
      {
        "key": "doseDef",
        "zh": "每單位面積打進多少個原子",
        "en": "How many atoms are implanted per unit area"
      },
      {
        "key": "doseSets",
        "zh": "決定摻雜的濃度",
        "en": "It sets the doping concentration"
      },
      {
        "key": "deeperNotMore",
        "zh": "能量越高是打得越深，不是打進越多原子",
        "en": "Higher energy means the ions go deeper, not that more atoms go in"
      },
      {
        "key": "countByDose",
        "zh": "原子的數量由劑量決定",
        "en": "The number of atoms is set by the dose"
      }
    ]
  },
  {
    "chapterId": "ch07",
    "headingZh": "退火：修復與活化",
    "headingEn": "Annealing: repair and activation",
    "type": "flow",
    "captionZh": "佈植撞亂晶格，退火修復並活化雜質",
    "captionEn": "Implant damage is repaired by annealing, which also activates the impurities.",
    "steps": [
      {
        "zh": "離子高速撞進矽",
        "en": "Ions slam into the silicon",
        "icon": "implant"
      },
      {
        "zh": "矽原子被撞亂",
        "en": "Silicon atoms knocked out of place",
        "noteZh": "雜質尚未就定位",
        "noteEn": "Impurities not yet in position",
        "icon": "random"
      },
      {
        "zh": "退火：加熱晶圓",
        "en": "Anneal: heat the wafer",
        "icon": "thermometer"
      },
      {
        "zh": "晶格修復、雜質就定位",
        "en": "Lattice repairs; impurities settle",
        "noteZh": "開始導電，稱為活化",
        "noteEn": "They start conducting: activation",
        "icon": "lattice"
      }
    ]
  },
  {
    "chapterId": "ch07",
    "headingZh": "熱預算：加熱是有額度的",
    "headingEn": "Thermal budget: heat comes with a limit",
    "type": "pictorial",
    "draw": "thermalBudget",
    "captionZh": "每次高溫都讓雜質再擴散，最終影響電性",
    "captionEn": "Every high-temperature step adds diffusion, leading to leakage and Vt shift.",
    "labels": [
      {
        "key": "everyHot",
        "zh": "每一次高溫步驟",
        "en": "Every high-temperature step"
      },
      {
        "key": "diffuse",
        "zh": "都會讓之前佈植的雜質再擴散一點",
        "en": "makes the previously implanted impurities diffuse a bit more"
      },
      {
        "key": "source",
        "zh": "源極",
        "en": "Source"
      },
      {
        "key": "drain",
        "zh": "汲極",
        "en": "Drain"
      },
      {
        "key": "adds",
        "zh": "擴散會累積",
        "en": "Diffusion adds up"
      },
      {
        "key": "distort",
        "zh": "前面做好的摻雜區域變形",
        "en": "Distorts the doped regions built earlier"
      },
      {
        "key": "tooDeep",
        "zh": "源極和汲極的摻雜擴散得太深、太寬",
        "en": "The source and drain doping spreads too deep and too wide"
      },
      {
        "key": "leak",
        "zh": "漏電變大、Vt 偏移",
        "en": "Leakage goes up and Vt shifts"
      }
    ]
  },
  {
    "chapterId": "ch07",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "type": "flow",
    "foldSection": true,
    "captionZh": "退火技術朝高溫、極短時間演進以壓低擴散",
    "captionEn": "Annealing moved to high temperature and ultra-short time to curb diffusion.",
    "steps": [
      {
        "zh": "爐管退火",
        "en": "Furnace anneal"
      },
      {
        "zh": "尖峰快速熱退火",
        "en": "Spike RTA"
      },
      {
        "zh": "毫秒閃光退火",
        "en": "Millisecond flash anneal (FLA)"
      },
      {
        "zh": "奈秒雷射退火",
        "en": "Nanosecond laser anneal (LSA)"
      }
    ]
  },
  {
    "chapterId": "ch07",
    "headingZh": "離子佈植與毫秒／奈秒退火條例總覽",
    "headingEn": "Ion Implant & Ultra-Fast Anneal Clauses",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "佈植與退火兩類條例的方法與代表應用。",
    "captionEn": "Implant and anneal clauses: the methods in each and their key uses.",
    "columns": [
      {
        "titleZh": "離子佈植",
        "titleEn": "Ion implantation",
        "items": [
          {
            "zh": "中電流、大電流與高能佈植",
            "en": "Medium-current, high-current & MeV implant",
            "noteZh": "逆行井、Vt 微調、源汲極延伸",
            "noteEn": "Retrograde wells, Vt tuning, S/D extensions"
          },
          {
            "zh": "低溫佈植與電漿共形摻雜",
            "en": "Cryo-implant & plasma doping (PLAD)",
            "noteZh": "鰭片側壁與頂部均勻摻雜",
            "noteEn": "Uniform doping of fin sidewalls and tops"
          }
        ]
      },
      {
        "titleZh": "退火熱處理",
        "titleEn": "Thermal annealing",
        "items": [
          {
            "zh": "爐管與尖峰快速熱退火",
            "en": "Furnace & spike RTA",
            "noteZh": "修復晶格、活化源汲極",
            "noteEn": "Heals the lattice, activates S/D"
          },
          {
            "zh": "毫秒閃光與奈秒雷射退火",
            "en": "Millisecond flash & nanosecond laser anneal",
            "noteZh": "零擴散活化、背面局部退火",
            "noteEn": "Zero-diffusion activation, backside anneal"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch07",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "佈植與退火三大異常與對應的永久防呆對策",
    "captionEn": "Three implant and anneal failures and their permanent countermeasures",
    "root": {
      "zh": "佈植退火三大異常",
      "en": "Three implant & anneal failures"
    },
    "branches": [
      {
        "zh": "通道效應長尾穿通",
        "en": "Channeling tail punch-through",
        "leafZh": "傾角旋轉防呆或預非晶化",
        "leafEn": "Tilt/twist interlocks or Ge PAI"
      },
      {
        "zh": "瞬態增強擴散與硼叢集",
        "en": "TED and boron clustering",
        "leafZh": "碳共佈植並以尖峰加雷射退火",
        "leafEn": "Carbon co-implant plus spike RTA and LSA"
      },
      {
        "zh": "光阻爆裂與雷射退火條紋",
        "en": "Resist popping & LSA stripes",
        "leafZh": "分步冷卻、兩段灰化、吸收層",
        "leafEn": "ESC He cooling, two-step strip, absorber cap"
      }
    ]
  },
  {
    "chapterId": "ch08",
    "headingZh": "磨到哪裡該停",
    "headingEn": "Knowing when to stop",
    "type": "compare",
    "captionZh": "CMP 控制研磨終點的三種方式",
    "captionEn": "Three ways CMP is made to stop at the right point.",
    "columns": [
      {
        "titleZh": "終點偵測",
        "titleEn": "Endpoint detection",
        "items": [
          {
            "zh": "磨到另一種材料時",
            "en": "When polishing reaches another material"
          },
          {
            "zh": "摩擦力與反光改變",
            "en": "Friction and reflection change"
          },
          {
            "zh": "機台據此判斷是否到目標",
            "en": "Tool judges whether target is reached"
          }
        ]
      },
      {
        "titleZh": "停止層",
        "titleEn": "Stop layer",
        "items": [
          {
            "zh": "下方先鋪較耐磨的一層",
            "en": "A harder layer deposited underneath"
          },
          {
            "zh": "碰到時研磨自然變慢",
            "en": "Polishing slows down on reaching it"
          }
        ]
      },
      {
        "titleZh": "微調研磨時間",
        "titleEn": "Adjusting polishing time",
        "items": [
          {
            "zh": "研磨墊用久速度慢慢改變",
            "en": "Pad wear slowly changes the rate"
          },
          {
            "zh": "依前幾批的量測結果",
            "en": "Based on previous lots' measurements"
          },
          {
            "zh": "自動微調下一批時間",
            "en": "Next lot's time adjusted automatically"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch08",
    "headingZh": "假圖形：為了磨得平",
    "headingEn": "Dummy fill: patterns that exist only to polish flat",
    "type": "pictorial",
    "draw": "dummyFill",
    "captionZh": "補不補假圖形，決定 CMP 能否磨平（以銅 CMP 為例）",
    "captionEn": "Whether dummy fill is added decides whether CMP polishes flat (copper CMP shown)",
    "labels": [
      {
        "key": "rateDensity",
        "zh": "研磨速度和圖形密度有關",
        "en": "The CMP polishing rate depends on pattern density"
      },
      {
        "key": "emptyArea",
        "zh": "圖形太少的空曠區域",
        "en": "Empty areas of the chip with few patterns"
      },
      {
        "key": "added",
        "zh": "補上假圖形",
        "en": "Adds dummy patterns to empty areas"
      },
      {
        "key": "noCurrent",
        "zh": "不通電的假圖形",
        "en": "Dummy patterns that carry no current"
      },
      {
        "key": "uneven",
        "zh": "密度不均勻，就會磨得一邊高一邊低",
        "en": "If the density is uneven, one side ends up higher than the other"
      },
      {
        "key": "notFlat",
        "zh": "表面不平",
        "en": "The surface is not flat"
      },
      {
        "key": "defocus",
        "zh": "微影失焦",
        "en": "lithography defocus"
      },
      {
        "key": "thickness",
        "zh": "導線厚度不一致",
        "en": "uneven wire thickness"
      },
      {
        "key": "shorts",
        "zh": "金屬殘留造成短路",
        "en": "leftover metal that shorts wires together"
      },
      {
        "key": "evenDensity",
        "zh": "圖形密度盡量平均",
        "en": "The pattern density is as even as possible"
      },
      {
        "key": "polishEven",
        "zh": "磨得均勻",
        "en": "Polish evenly"
      }
    ]
  },
  {
    "chapterId": "ch08",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "type": "branch",
    "foldSection": true,
    "captionZh": "混合鍵合中銅墊太凸、受控內凹或凹陷太深的結果",
    "captionEn": "Outcomes of Cu pad recess in hybrid bonding: protruding, controlled, too deep.",
    "root": {
      "zh": "CMP 後的銅墊凹陷",
      "en": "Cu pad recess after CMP"
    },
    "branches": [
      {
        "zh": "銅墊太凸",
        "en": "Protruding Cu pad",
        "leafZh": "室溫下介電質無法貼合",
        "leafEn": "No dielectric contact at room temp"
      },
      {
        "zh": "受控內凹",
        "en": "Controlled Cu dishing",
        "leafZh": "退火時銅膨脹橋接",
        "leafEn": "Cu expands to bridge during anneal"
      },
      {
        "zh": "凹陷太深",
        "en": "Dishing too deep",
        "leafZh": "銅膨脹不到對面，形成開路",
        "leafEn": "Cu can't reach across: open joint"
      }
    ]
  },
  {
    "chapterId": "ch08",
    "headingZh": "CMP 平坦化與 3D 混合鍵合條例總覽",
    "headingEn": "CMP & 3D Hybrid Bonding Clauses",
    "foldTables": true,
    "type": "flow",
    "foldSection": true,
    "captionZh": "CMP 條例從前段、中段、後段延伸到混合鍵合",
    "captionEn": "CMP clauses run from FEOL, MOL and BEOL through to hybrid bonding.",
    "steps": [
      {
        "zh": "前段淺溝槽隔離 CMP",
        "en": "FEOL STI oxide CMP",
        "noteZh": "停在氮化矽並建立平坦基準",
        "noteEn": "Stops on nitride; sets a flat focal plane"
      },
      {
        "zh": "中段閘極與接觸孔 CMP",
        "en": "MOL gate and contact plug CMP",
        "noteZh": "閘極高度決定 Vt 一致性",
        "noteEn": "Gate height governs Vt uniformity"
      },
      {
        "zh": "後段銅雙鑲嵌三步研磨",
        "en": "BEOL three-step Cu damascene CMP",
        "noteZh": "假金屬填充壓低碟化與侵蝕",
        "noteEn": "Dummy metal fill bounds dishing and erosion"
      },
      {
        "zh": "TSV 露出與混合鍵合",
        "en": "TSV reveal and hybrid bonding CMP",
        "noteZh": "銅墊精準內凹，退火時頂合",
        "noteEn": "Cu pads recessed to fuse on anneal"
      }
    ]
  },
  {
    "chapterId": "ch08",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "CMP 三大關鍵異常與對應的永久防呆對策",
    "captionEn": "Three critical CMP failure signatures and the countermeasure for each.",
    "root": {
      "zh": "CMP 三大關鍵異常",
      "en": "Three critical CMP failures"
    },
    "branches": [
      {
        "zh": "寬銅線碟化與介電質侵蝕",
        "en": "Cu dishing and oxide erosion",
        "leafZh": "虛設金屬填充加低壓軟拋光液",
        "leafEn": "Dummy metal fill, low-downforce slurry"
      },
      {
        "zh": "研磨液團簇弧形刮痕",
        "en": "Slurry-cluster chatter scratches",
        "leafZh": "使用點過濾器與大顆粒計數器",
        "leafEn": "POU filters and large particle counters"
      },
      {
        "zh": "混合鍵合銅凹陷超規",
        "en": "Hybrid-bond Cu recess out of spec",
        "leafZh": "多區氣囊拋光頭加終點偵測",
        "leafEn": "Multi-zone membrane head with endpointing"
      }
    ]
  },
  {
    "chapterId": "ch08",
    "headingZh": "為什麼要磨平",
    "headingEn": "Why the wafer must be flat",
    "type": "pictorial",
    "draw": "whyPlanarize",
    "captionZh": "層層堆疊的起伏、兩個問題，以及用 CMP 磨平",
    "captionEn": "Stacked layers turn into hills, two problems follow, and CMP flattens them",
    "labels": [
      {
        "key": "follows",
        "zh": "表面就會順著底下的圖形起伏",
        "en": "The surface follows the shape of the patterns below"
      },
      {
        "key": "hills",
        "zh": "晶圓表面就像丘陵地一樣高低不平",
        "en": "The wafer surface looks like rolling hills"
      },
      {
        "key": "cmp",
        "zh": "化學機械研磨",
        "en": "Chemical mechanical planarization"
      },
      {
        "key": "level",
        "zh": "每一層樓板都要先抹平",
        "en": "Every floor slab has to be leveled"
      },
      {
        "key": "twoProblems",
        "zh": "這會帶來兩個問題",
        "en": "This causes two problems"
      },
      {
        "key": "focus",
        "zh": "微影對不準焦",
        "en": "Lithography cannot focus"
      },
      {
        "key": "focusRange",
        "zh": "焦距範圍",
        "en": "Range of focus"
      },
      {
        "key": "focusNote",
        "zh": "高處和低處無法同時清楚",
        "en": "The high and low areas cannot both be in focus"
      },
      {
        "key": "excess",
        "zh": "多餘的材料去不掉",
        "en": "Excess material cannot be removed"
      },
      {
        "key": "excessNote",
        "zh": "把溝槽外多餘的銅去掉",
        "en": "Removing the copper outside the trenches"
      }
    ]
  },
  {
    "chapterId": "ch09",
    "headingZh": "Q-Time：清洗的效果會過期",
    "headingEn": "Q-time: a clean surface has an expiration date",
    "type": "branch",
    "captionZh": "系統依 Q-Time 狀態決定晶圓的處理方式",
    "captionEn": "How the fab system handles a lot according to its Q-time status.",
    "root": {
      "zh": "系統計算 Q-Time",
      "en": "System tracks each lot's Q-time",
      "noteZh": "兩站之間可等多久",
      "noteEn": "How long a lot may wait between steps"
    },
    "branches": [
      {
        "zh": "在規定時間內",
        "en": "Within the set time",
        "leafZh": "進入下一個步驟",
        "leafEn": "Moves on to the next step"
      },
      {
        "zh": "快到期",
        "en": "Close to the limit",
        "leafZh": "優先派工",
        "leafEn": "Gets dispatching priority"
      },
      {
        "zh": "超過時間",
        "en": "Limit exceeded",
        "leafZh": "擋下，重洗或另作處理",
        "leafEn": "Held; re-clean or other handling"
      }
    ]
  },
  {
    "chapterId": "ch09",
    "headingZh": "交叉污染：有些東西不能混用",
    "headingEn": "Cross-contamination: some things must never mix",
    "type": "pictorial",
    "draw": "crossContamination",
    "captionZh": "污染等級：晶圓盒與機台要對上，否則微量銅會擴大成良率損失",
    "captionEn": "Contamination classes: carriers must match tools, or a trace of copper spreads",
    "labels": [
      {
        "key": "classes",
        "zh": "污染等級",
        "en": "Contamination classes"
      },
      {
        "key": "colorTag",
        "zh": "常用顏色或標籤區分",
        "en": "often marked by color or labels"
      },
      {
        "key": "frontEnd",
        "zh": "前段",
        "en": "Front end"
      },
      {
        "key": "copperProc",
        "zh": "銅製程",
        "en": "Copper processes"
      },
      {
        "key": "carrier",
        "zh": "晶圓盒",
        "en": "Wafer carriers"
      },
      {
        "key": "tool",
        "zh": "機台",
        "en": "Tools"
      },
      {
        "key": "check",
        "zh": "系統也會檢查晶圓盒和機台的等級是否相符",
        "en": "Checks whether the class of the carrier matches the class of the tool"
      },
      {
        "key": "block",
        "zh": "禁止進機台",
        "en": "Blocks the wafer from entering the tool"
      },
      {
        "key": "copperUse",
        "zh": "銅製程使用的",
        "en": "used for copper processes"
      },
      {
        "key": "tweezers",
        "zh": "機台、晶圓盒，甚至鑷子和手套",
        "en": "The tools, wafer carriers, and even tweezers and gloves"
      },
      {
        "key": "separate",
        "zh": "都要和前段製程嚴格分開",
        "en": "kept strictly separate from the front end"
      },
      {
        "key": "trace",
        "zh": "微量的銅",
        "en": "A trace of copper"
      },
      {
        "key": "carried",
        "zh": "被帶進前段機台",
        "en": "carried into a front-end tool"
      },
      {
        "key": "everyWafer",
        "zh": "污染之後經過那台機台的所有晶圓",
        "en": "Contaminates every wafer that passes through that tool afterward"
      },
      {
        "key": "diffuses",
        "zh": "銅在矽中擴散得非常快",
        "en": "Copper diffuses through silicon extremely fast"
      },
      {
        "key": "reach",
        "zh": "跑進電晶體所在的區域",
        "en": "reaching the area where the transistors are"
      },
      {
        "key": "leakYield",
        "zh": "電晶體漏電，良率大幅下降",
        "en": "Transistors leak, yield drops sharply"
      },
      {
        "key": "hardTrace",
        "zh": "很難追查源頭",
        "en": "The source is very hard to trace"
      }
    ]
  },
  {
    "chapterId": "ch09",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "type": "branch",
    "foldSection": true,
    "captionZh": "為何超臨界二氧化碳乾燥能避免圖案倒塌",
    "captionEn": "Why supercritical carbon dioxide drying prevents pattern collapse.",
    "root": {
      "zh": "乾燥時的毛細拉扯應力",
      "en": "Capillary bending stress in drying",
      "noteZh": "隨表面張力與深寬比增大",
      "noteEn": "Grows with surface tension and aspect ratio"
    },
    "branches": [
      {
        "zh": "水",
        "en": "Water",
        "leafZh": "拉垮高深寬比結構",
        "leafEn": "Collapses high-AR structures"
      },
      {
        "zh": "超臨界二氧化碳",
        "en": "Supercritical carbon dioxide",
        "leafZh": "無氣液界面，毛細力歸零",
        "leafEn": "No meniscus; zero capillary force"
      }
    ]
  },
  {
    "chapterId": "ch09",
    "headingZh": "濕／乾式清洗與超臨界 CO₂ 乾燥條例總覽",
    "headingEn": "Wet/Dry Clean & Supercritical CO₂ Clauses",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "四類清洗與乾燥條例及各自的核心機制",
    "captionEn": "Four cleaning and drying clauses and the core mechanism of each.",
    "root": {
      "zh": "清洗與乾燥條例",
      "en": "Cleaning and drying clauses",
      "noteZh": "零微粒、零金屬並防倒塌",
      "noteEn": "Zero particles, zero metals, no collapse"
    },
    "branches": [
      {
        "zh": "經典 RCA 濕式清洗",
        "en": "Classic RCA wet clean",
        "leafZh": "去有機物、氧化層、微粒與金屬",
        "leafEn": "Removes organics, oxide, particles, metals"
      },
      {
        "zh": "單片旋轉與臭氧水清洗",
        "en": "Single-wafer spin and ozonated UPW",
        "leafZh": "單片噴新鮮藥液，杜絕交叉污染",
        "leafEn": "Fresh dispense, no cross-contamination"
      },
      {
        "zh": "乾式氣相化學清潔",
        "en": "Dry vapor chemical clean",
        "leafZh": "氧化層轉成鹽類後昇華抽走",
        "leafEn": "Oxide turned to salt, then sublimed away"
      },
      {
        "zh": "馬蘭哥尼與超臨界乾燥",
        "en": "Marangoni and supercritical drying",
        "leafZh": "IPA 降張力，超臨界無氣液界面",
        "leafEn": "IPA lowers tension; supercritical: no meniscus"
      }
    ]
  },
  {
    "chapterId": "ch09",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "濕式清洗三大致命異常與對應的永久防呆對策",
    "captionEn": "Three critical wet-clean failure mechanisms and the countermeasure for each.",
    "root": {
      "zh": "濕式清洗三大致命異常",
      "en": "Three critical wet-clean failures"
    },
    "branches": [
      {
        "zh": "高深寬比結構乾燥倒塌",
        "en": "High-AR pattern collapse on drying",
        "leafZh": "改用馬蘭哥尼或超臨界乾燥",
        "leafEn": "Switch to Marangoni or supercritical drying"
      },
      {
        "zh": "疏水矽表面水痕",
        "en": "Evaporative silica watermarks",
        "leafZh": "濕進濕出並用除氧超純水",
        "leafEn": "Wet-to-wet transfer and degassed UPW"
      },
      {
        "zh": "雙金屬電偶腐蝕",
        "en": "Bimetallic galvanic corrosion",
        "leafZh": "添加唑類緩蝕劑並控溶氧",
        "leafEn": "Azole inhibitors; purge dissolved oxygen"
      }
    ]
  },
  {
    "chapterId": "ch09",
    "headingZh": "污染有哪幾種",
    "headingEn": "Kinds of contamination",
    "type": "pictorial",
    "draw": "contaminants",
    "captionZh": "晶圓表面上的四種污染與常見來源",
    "captionEn": "Four kinds of contamination on a wafer surface and where they come from",
    "labels": [
      {
        "key": "particle",
        "zh": "微粒",
        "en": "Particles"
      },
      {
        "key": "particleSrc",
        "zh": "機台、環境、人",
        "en": "Tools, environment, people"
      },
      {
        "key": "metal",
        "zh": "金屬污染",
        "en": "Metal contamination"
      },
      {
        "key": "metalSrc",
        "zh": "化學品、機台零件、人體",
        "en": "Chemicals, tool parts, the human body"
      },
      {
        "key": "organic",
        "zh": "有機物",
        "en": "Organics"
      },
      {
        "key": "organicSrc",
        "zh": "光阻殘留、人體油脂",
        "en": "Photoresist residue, skin oils"
      },
      {
        "key": "oxide",
        "zh": "原生氧化層",
        "en": "Native oxide"
      },
      {
        "key": "oxideSrc",
        "zh": "矽表面接觸空氣後自然長出",
        "en": "Grows naturally once a silicon surface meets air"
      },
      {
        "key": "trouble",
        "zh": "金屬污染特別麻煩",
        "en": "Metal contamination is especially troublesome"
      },
      {
        "key": "sodium",
        "zh": "汗水中的鈉離子",
        "en": "Sodium ions from sweat"
      },
      {
        "key": "gate",
        "zh": "閘極",
        "en": "Gate"
      },
      {
        "key": "gateOxide",
        "zh": "閘極氧化層",
        "en": "Gate oxide"
      },
      {
        "key": "si",
        "zh": "矽",
        "en": "Silicon"
      },
      {
        "key": "moves",
        "zh": "會到處移動",
        "en": "Move around inside it"
      },
      {
        "key": "drift",
        "zh": "Vt 漂移",
        "en": "Vt drift"
      }
    ]
  },
  {
    "chapterId": "ch10",
    "headingZh": "接觸窗與導通孔",
    "headingEn": "Contacts and vias",
    "type": "stack",
    "captionZh": "接觸窗與導通孔在導線結構中的位置",
    "captionEn": "Where contacts and vias sit between the transistor and the metal layers.",
    "layers": [
      {
        "zh": "上層金屬",
        "en": "Upper metal layer"
      },
      {
        "zh": "導通孔",
        "en": "Via",
        "noteZh": "連接上下兩層金屬",
        "noteEn": "Connects two metal layers"
      },
      {
        "zh": "第一層金屬",
        "en": "First metal layer"
      },
      {
        "zh": "接觸窗",
        "en": "Contact",
        "noteZh": "絕緣層中的孔，通常填鎢",
        "noteEn": "Insulator hole, usually tungsten-filled"
      },
      {
        "zh": "電晶體",
        "en": "Transistor"
      }
    ]
  },
  {
    "chapterId": "ch10",
    "headingZh": "低介電常數材料",
    "headingEn": "Low-k dielectrics",
    "type": "flow",
    "captionZh": "低介電常數材料：降低導線間電容效應，但結構脆弱",
    "captionEn": "Why low-k dielectrics are used between wires, and why they are fragile.",
    "steps": [
      {
        "zh": "導線彼此靠得很近",
        "en": "Wires sit close together"
      },
      {
        "zh": "像一個小電容",
        "en": "They act like a small capacitor"
      },
      {
        "zh": "拖慢訊號、增加耗電",
        "en": "Slower signals, more power"
      },
      {
        "zh": "改用低介電常數材料",
        "en": "Use low-k between the wires",
        "noteZh": "減少這個影響",
        "noteEn": "To reduce this effect"
      },
      {
        "zh": "常帶微小孔洞，結構脆弱",
        "en": "Tiny pores, mechanically weak",
        "noteZh": "蝕刻、CMP、封裝易受損",
        "noteEn": "Easily damaged in etch, CMP, packaging"
      }
    ]
  },
  {
    "chapterId": "ch10",
    "headingZh": "越來越細的挑戰",
    "headingEn": "The challenges of ever-thinner wires",
    "type": "pictorial",
    "draw": "thinWires",
    "captionZh": "導線變細帶來的兩大問題",
    "captionEn": "Two problems that grow as wires get thinner.",
    "labels": [
      {
        "key": "thinner",
        "zh": "導線越做越細",
        "en": "As wires get thinner"
      },
      {
        "key": "resistance",
        "zh": "電阻變高",
        "en": "Higher resistance"
      },
      {
        "key": "barrier",
        "zh": "阻障層",
        "en": "Barrier layer"
      },
      {
        "key": "cap",
        "zh": "覆蓋層",
        "en": "Cap layer"
      },
      {
        "key": "barrierShare",
        "zh": "阻障層占的比例變大",
        "en": "The barrier layer takes up a larger share of the space"
      },
      {
        "key": "scatter",
        "zh": "電子也更容易被散射",
        "en": "Electrons scatter more easily"
      },
      {
        "key": "em",
        "zh": "電遷移",
        "en": "Electromigration"
      },
      {
        "key": "longCurrent",
        "zh": "電流長時間流過時",
        "en": "Long-term current flow"
      },
      {
        "key": "electrons",
        "zh": "電子",
        "en": "Electrons"
      },
      {
        "key": "pushAtoms",
        "zh": "把金屬原子一點一點推走",
        "en": "Pushes metal atoms away bit by bit"
      },
      {
        "key": "voids",
        "zh": "形成空洞而斷線",
        "en": "Forming voids that break the wire"
      }
    ]
  },
  {
    "chapterId": "ch10",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "type": "branch",
    "foldSection": true,
    "captionZh": "降低互連延遲的兩條路：降介電常數與縮短導線",
    "captionEn": "Two levers on interconnect RC delay: lower k and shorter wires.",
    "root": {
      "zh": "互連 RC 延遲",
      "en": "Interconnect RC delay",
      "noteZh": "與導線長度平方成正比",
      "noteEn": "Scales with wire length squared"
    },
    "branches": [
      {
        "zh": "降低有效介電常數",
        "en": "Lower the effective k",
        "leafZh": "多孔超低介電質與氣隙",
        "leafEn": "Porous ultra-low-k and air gaps"
      },
      {
        "zh": "縮短導線長度",
        "en": "Shorten the wire length",
        "leafZh": "垂直堆疊使延遲功耗驟降",
        "leafEn": "Vertical stacks slash delay, power"
      }
    ]
  },
  {
    "chapterId": "ch10",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "後段導線三大核心異常與對應的永久防呆對策",
    "captionEn": "Three critical BEOL failure modes and the countermeasure for each.",
    "root": {
      "zh": "後段導線三大核心異常",
      "en": "Three critical BEOL failure modes",
      "icon": "risk"
    },
    "branches": [
      {
        "zh": "雙鑲嵌通孔底部開路",
        "en": "Dual-damascene via bottom open",
        "leafZh": "無阻障層由下而上金屬填孔",
        "leafEn": "Barrierless bottom-up metal via fill",
        "icon": "step"
      },
      {
        "zh": "超低介電質電漿損傷擊穿",
        "en": "ULK plasma damage and TDDB",
        "leafZh": "還原電漿去光阻並修補孔隙",
        "leafEn": "Reducing-plasma ash plus pore sealing",
        "icon": "plasma"
      },
      {
        "zh": "電遷移空洞與擠出短路",
        "en": "Electromigration void and hillock",
        "leafZh": "鈷蓋層加 Blech 長度規則",
        "leafEn": "Cobalt cap plus Blech length limits",
        "icon": "electromigration"
      }
    ]
  },
  {
    "chapterId": "ch10",
    "headingZh": "從鋁到銅",
    "headingEn": "From aluminum to copper",
    "type": "pictorial",
    "draw": "alToCu",
    "captionZh": "鋁先鋪再蝕刻；銅先挖溝、填銅再磨平（細節見下一段）",
    "captionEn": "Al: deposit, then etch. Cu: trench, fill, polish (details in the next section)",
    "labels": [
      {
        "key": "al",
        "zh": "鋁",
        "en": "Aluminum"
      },
      {
        "key": "alStep1",
        "zh": "先用 PVD 把鋁鋪滿整片晶圓",
        "en": "Aluminum was deposited over the whole wafer with PVD"
      },
      {
        "key": "alStep2",
        "zh": "微影和蝕刻",
        "en": "Lithography and etching"
      },
      {
        "key": "alStep3",
        "zh": "留下導線",
        "en": "Leaving the wires behind"
      },
      {
        "key": "cu",
        "zh": "銅",
        "en": "Copper"
      },
      {
        "key": "cuLow",
        "zh": "銅的電阻比鋁低",
        "en": "Copper has lower resistance than aluminum"
      },
      {
        "key": "hardEtch",
        "zh": "銅有一個大問題：很難用乾蝕刻挖出圖形",
        "en": "Copper has one big problem: it is very hard to pattern with dry etching"
      },
      {
        "key": "opposite",
        "zh": "完全相反的做法",
        "en": "The opposite approach"
      },
      {
        "key": "digFirst",
        "zh": "先挖溝",
        "en": "dig the trenches first"
      },
      {
        "key": "fillCu",
        "zh": "再填銅",
        "en": "then fill them with copper"
      }
    ]
  },
  {
    "chapterId": "ch10",
    "headingZh": "常見異常",
    "headingEn": "Common problems",
    "type": "pictorial",
    "draw": "metalDefects",
    "captionZh": "五種金屬化異常的剖面縮圖",
    "captionEn": "Five metallization problems in cross-section",
    "labels": [
      {
        "key": "void",
        "zh": "銅填充空洞",
        "en": "Voids in copper fill"
      },
      {
        "key": "voidResult",
        "zh": "電阻變高、可靠度問題",
        "en": "Higher resistance, reliability problems"
      },
      {
        "key": "residue",
        "zh": "銅殘留",
        "en": "Copper residue"
      },
      {
        "key": "residueResult",
        "zh": "導線短路",
        "en": "Shorts between wires"
      },
      {
        "key": "openVia",
        "zh": "導通孔不通",
        "en": "Open vias"
      },
      {
        "key": "openResult",
        "zh": "斷路",
        "en": "Open circuits"
      },
      {
        "key": "barrier",
        "zh": "阻障層失效",
        "en": "Barrier failure"
      },
      {
        "key": "barrierResult",
        "zh": "銅擴散，造成漏電",
        "en": "Copper diffuses and causes leakage"
      },
      {
        "key": "lowk",
        "zh": "低介電材料損傷",
        "en": "Low-k damage"
      },
      {
        "key": "lowkResult",
        "zh": "漏電、結構剝離",
        "en": "Leakage, delamination"
      }
    ]
  },
  {
    "chapterId": "ch10",
    "headingZh": "後段金屬互連與無阻障金屬條例總覽",
    "headingEn": "BEOL Interconnect & Barrierless Metal Clauses",
    "type": "pictorial",
    "draw": "beolTiers",
    "sourcedNumbers": true,
    "sourceZh": "數值出自本段表格；局部層的三種材料依製程擇用；層號、節距與材料依節點及廠商而異，未按比例。",
    "sourceEn": "Values come from the table in this section. Local-tier materials are chosen per process. Layer numbers, pitches and materials vary by node and vendor. Not to scale.",
    "captionZh": "後段金屬層級：局部、中階、全域到封裝介面",
    "captionEn": "BEOL metal tiers: local, intermediate, global and the package interface",
    "labels": [
      {
        "key": "c4",
        "zh": "C4 覆晶凸塊",
        "en": "C4 flip-chip bumps"
      },
      {
        "key": "cowos",
        "zh": "CoWoS 微凸塊",
        "en": "CoWoS micro-bumps"
      },
      {
        "key": "alPad",
        "zh": "頂層鋁墊",
        "en": "Top Al Bond Pad"
      },
      {
        "key": "globalTier",
        "zh": "全域厚金屬與封裝介面層",
        "en": "Global Top Metal, RDL & UBM Interface"
      },
      {
        "key": "globalM",
        "zh": "M10–M16+",
        "en": "M10–M16+"
      },
      {
        "key": "globalPitch",
        "zh": "線寬／節距 0.5–10+ µm",
        "en": "Pitch 0.5–10+ µm"
      },
      {
        "key": "thickCu",
        "zh": "超厚銅",
        "en": "Ultra-Thick Cu"
      },
      {
        "key": "midTier",
        "zh": "中階與半全域互連層",
        "en": "Intermediate & Semi-Global Tiers"
      },
      {
        "key": "midM",
        "zh": "M4–M9",
        "en": "M4–M9"
      },
      {
        "key": "midPitch",
        "zh": "節距 36–160 nm",
        "en": "Pitch 36–160 nm"
      },
      {
        "key": "cuDD",
        "zh": "雙鑲嵌電鍍銅",
        "en": "Cu Dual-Damascene"
      },
      {
        "key": "ulk",
        "zh": "多孔超低介電質",
        "en": "Porous Ultra-Low-k"
      },
      {
        "key": "airGap",
        "zh": "氣隙（Air-Gap, k ≈ 1.0）",
        "en": "Air-Gap (k ≈ 1.0)"
      },
      {
        "key": "localTier",
        "zh": "局部互連層",
        "en": "Local Interconnect Tiers"
      },
      {
        "key": "localM",
        "zh": "M0 / M1–M3",
        "en": "M0 / M1–M3"
      },
      {
        "key": "localPitch",
        "zh": "節距 18–28 nm",
        "en": "Pitch 18–28 nm"
      },
      {
        "key": "tanCu",
        "zh": "超薄 TaN + Cu Dual-Damascene",
        "en": "Ultra-thin TaN + Cu Dual-Damascene"
      },
      {
        "key": "co",
        "zh": "CVD/ALD 鈷（Co）",
        "en": "CVD/ALD Cobalt (Co)"
      },
      {
        "key": "ru",
        "zh": "釕（Ru）無阻障層填充",
        "en": "Barrierless Ruthenium (Ru)"
      }
    ],
    "foldSection": true
  },
  {
    "chapterId": "ch11",
    "headingZh": "第二段：MOL，把電晶體接出來",
    "headingEn": "Stage 2: MOL, connecting the transistors",
    "type": "flow",
    "captionZh": "MOL 接觸窗的製作順序",
    "captionEn": "The order of steps that build the MOL contacts.",
    "steps": [
      {
        "zh": "鋪上絕緣層",
        "en": "Deposit an insulating layer",
        "noteZh": "覆蓋在電晶體上方",
        "noteEn": "Over the transistors"
      },
      {
        "zh": "挖出接觸窗",
        "en": "Open contacts",
        "noteZh": "對準源極、汲極和閘極",
        "noteEn": "Aligned to the source, drain and gate"
      },
      {
        "zh": "填入鎢",
        "en": "Fill with tungsten"
      },
      {
        "zh": "CMP 磨平",
        "en": "Polish flat with CMP",
        "noteZh": "形成連到外面的插座",
        "noteEn": "Sockets that connect to the outside"
      }
    ]
  },
  {
    "chapterId": "ch11",
    "headingZh": "第三段：BEOL，蓋出導線",
    "headingEn": "Stage 3: BEOL, building the wiring",
    "type": "flow",
    "captionZh": "BEOL 從銅導線到晶圓離開晶圓廠的順序",
    "captionEn": "The BEOL order, from copper wiring until the wafer leaves the fab for test.",
    "steps": [
      {
        "zh": "逐層做出銅導線",
        "en": "Copper wiring, layer by layer",
        "noteZh": "大馬士革製程，最上面幾層最粗",
        "noteEn": "Damascene process; top layers thickest"
      },
      {
        "zh": "鋪上保護層",
        "en": "Cover with a passivation layer"
      },
      {
        "zh": "只在焊墊位置開口",
        "en": "Openings only at the bond pads",
        "noteZh": "讓探針與封裝打線接觸晶片",
        "noteEn": "So probes and package wires reach the chip"
      },
      {
        "zh": "晶圓離開晶圓廠",
        "en": "The wafer leaves the fab",
        "noteZh": "進入測試階段",
        "noteEn": "Moves on to test"
      }
    ]
  },
  {
    "chapterId": "ch11",
    "headingZh": "光罩層數",
    "headingEn": "Mask count",
    "type": "compare",
    "captionZh": "比較生產效率：只看總天數與看每層光罩天數",
    "captionEn": "Comparing fab efficiency by total days versus days per mask layer.",
    "columns": [
      {
        "titleZh": "只看總天數",
        "titleEn": "Total days only",
        "items": [
          {
            "zh": "層數多，總天數自然較長",
            "en": "More layers, naturally more total days"
          },
          {
            "zh": "誤以為層數多的效率較差",
            "en": "Wrongly makes more layers look less efficient"
          }
        ]
      },
      {
        "titleZh": "每層光罩幾天",
        "titleEn": "Days per mask layer",
        "items": [
          {
            "zh": "生產週期除以光罩層數",
            "en": "Cycle time divided by mask layers"
          },
          {
            "zh": "層數不同也能公平比較",
            "en": "Fair across different mask counts"
          },
          {
            "zh": "數字越小，效率越好",
            "en": "Lower is better"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch11",
    "headingZh": "CMOS 跨層整合與背面供電條例總覽",
    "headingEn": "Cross-Tier CMOS & BSPDN Clauses",
    "type": "flow",
    "foldSection": true,
    "captionZh": "跨層整合中，越往後段熱預算越低",
    "captionEn": "Each later integration tier works under a lower thermal budget.",
    "steps": [
      {
        "zh": "前段 FEOL",
        "en": "Front-end-of-line (FEOL)",
        "noteZh": "最高溫：磊晶與活化退火",
        "noteEn": "Highest: epitaxy and spike anneal"
      },
      {
        "zh": "中段 MOL",
        "en": "Middle-of-line (MOL)",
        "noteZh": "中溫：避免 NiPtSi 聚集",
        "noteEn": "Moderate: avoids NiPtSi agglomeration"
      },
      {
        "zh": "後段 BEOL",
        "en": "Back-end-of-line (BEOL)",
        "noteZh": "嚴格低溫：防止銅擴散",
        "noteEn": "Strict low temp: prevents Cu diffusion"
      },
      {
        "zh": "晶圓背面與封裝介面",
        "en": "Backside & packaging interface",
        "noteZh": "超低溫製程",
        "noteEn": "Ultra-low thermal budget"
      }
    ]
  },
  {
    "chapterId": "ch11",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三大跨層整合定律及其對整合順序的意義",
    "captionEn": "Three cross-tier integration laws and what each means for integration.",
    "root": {
      "zh": "跨層整合定量定律",
      "en": "Cross-tier integration laws"
    },
    "branches": [
      {
        "zh": "遞減熱預算定律",
        "en": "Decreasing thermal budget law",
        "leafZh": "改採 RMG 後閘極整合",
        "leafEn": "Requires RMG gate-last integration"
      },
      {
        "zh": "中段接觸電阻傳輸線模型",
        "en": "MOL contact resistance TLM law",
        "leafZh": "奈秒雷射退火壓低接觸電阻率",
        "leafEn": "Nanosecond laser anneal lowers resistivity"
      },
      {
        "zh": "閘延遲與背面供電壓降定律",
        "en": "RO delay and BSPDN IR-drop law",
        "leafZh": "確立背面供電為標準架構",
        "leafEn": "Establishes backside power as the standard"
      }
    ]
  },
  {
    "chapterId": "ch11",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "跨層整合三大異常與對應的永久防呆對策",
    "captionEn": "Three classic integration failures and the countermeasure for each.",
    "root": {
      "zh": "跨層整合三大異常",
      "en": "Three classic integration failures",
      "icon": "risk"
    },
    "branches": [
      {
        "zh": "超溫矽化物團聚",
        "en": "Overheated silicide agglomeration",
        "leafZh": "熱預算金字塔並由 MES 攔截",
        "leafEn": "Thermal budget hierarchy interlocked in MES",
        "icon": "thermometer"
      },
      {
        "zh": "中段接觸孔空洞與短路",
        "en": "MOL contact void and SAC short",
        "leafZh": "低介電側壁加無氟鈷／鉬填孔",
        "leafEn": "Low-k spacers and F-free Co/Mo plugs",
        "icon": "step"
      },
      {
        "zh": "STI 凹陷與漏電駝峰",
        "en": "STI corner divot and leakage hump",
        "leafZh": "轉角圓滑化氧化並控氧化層損耗",
        "leafEn": "Corner-rounding oxidation, oxide-loss budget",
        "icon": "profile"
      }
    ]
  },
  {
    "chapterId": "ch11",
    "headingZh": "一個反覆出現的循環",
    "headingEn": "A loop that keeps repeating",
    "type": "pictorial",
    "draw": "processLoop",
    "captionZh": "每層都走一次的循環，以及 FEOL、MOL、BEOL 的位置",
    "captionEn": "The loop every layer goes through, and where FEOL, MOL and BEOL sit",
    "labels": [
      {
        "key": "sameLoop",
        "zh": "同一個循環",
        "en": "The same loop"
      },
      {
        "key": "deposit",
        "zh": "鋪上材料",
        "en": "Deposit a material"
      },
      {
        "key": "litho",
        "zh": "微影定義圖形",
        "en": "Define a pattern with lithography"
      },
      {
        "key": "etchImplant",
        "zh": "蝕刻或佈植",
        "en": "Etch or implant"
      },
      {
        "key": "strip",
        "zh": "去光阻、清洗",
        "en": "Strip resist and clean"
      },
      {
        "key": "measure",
        "zh": "量測",
        "en": "Measure"
      },
      {
        "key": "maskLayer",
        "zh": "光罩層",
        "en": "Mask layer"
      },
      {
        "key": "oneMask",
        "zh": "每做一次微影，就要用到一片光罩",
        "en": "Each lithography step uses one mask"
      },
      {
        "key": "beol",
        "zh": "BEOL",
        "en": "BEOL"
      },
      {
        "key": "beolDoes",
        "zh": "負責做多層金屬導線",
        "en": "Builds the multilevel metal wiring"
      },
      {
        "key": "mol",
        "zh": "MOL",
        "en": "MOL"
      },
      {
        "key": "molDoes",
        "zh": "負責把電晶體接出來",
        "en": "Connects the transistors to the wiring above"
      },
      {
        "key": "feol",
        "zh": "FEOL",
        "en": "FEOL"
      },
      {
        "key": "feolDoes",
        "zh": "負責做出電晶體",
        "en": "Builds the transistors"
      },
      {
        "key": "contact",
        "zh": "接觸窗",
        "en": "Contact"
      },
      {
        "key": "metalLayer",
        "zh": "金屬層",
        "en": "Metal layer"
      },
      {
        "key": "varies",
        "zh": "三段的分界在不同工廠略有不同",
        "en": "Where the three stages divide varies slightly from fab to fab"
      },
      {
        "key": "insideFab",
        "zh": "都發生在晶圓廠內",
        "en": "All happen inside the fab"
      },
      {
        "key": "differ",
        "zh": "和封裝測試的「後段」不同",
        "en": "which is different from the \"back end\" of packaging and test"
      }
    ]
  },
  {
    "chapterId": "ch12",
    "headingZh": "平面電晶體的極限",
    "headingEn": "The limits of the planar transistor",
    "type": "pictorial",
    "draw": "planarLeak",
    "captionZh": "平面電晶體縮小後的兩條漏電路徑（以 NMOS 示意）",
    "captionEn": "Two leakage paths in a shrinking planar transistor (NMOS shown)",
    "labels": [
      {
        "key": "fromAbove",
        "zh": "閘極只從上方控制通道",
        "en": "The gate controls the channel only from above"
      },
      {
        "key": "gate",
        "zh": "閘極",
        "en": "Gate"
      },
      {
        "key": "source",
        "zh": "源極",
        "en": "Source"
      },
      {
        "key": "drain",
        "zh": "汲極",
        "en": "Drain"
      },
      {
        "key": "channel",
        "zh": "通道",
        "en": "Channel"
      },
      {
        "key": "insulator",
        "zh": "閘極絕緣層",
        "en": "Gate insulator"
      },
      {
        "key": "tooClose",
        "zh": "源極和汲極靠得太近",
        "en": "The source and drain get too close together"
      },
      {
        "key": "sneak",
        "zh": "下方較深的地方就會有電流「偷偷溜過去」",
        "en": "Current \"sneaks through\" deeper down"
      },
      {
        "key": "faucet",
        "zh": "即使閘極關閉也一樣，就像水龍頭關不緊",
        "en": "Even when the gate is off, like a faucet that will not shut tight"
      },
      {
        "key": "thinner",
        "zh": "絕緣層越做越薄",
        "en": "The insulator was made thinner and thinner"
      },
      {
        "key": "tunnel",
        "zh": "電子會直接穿過去，造成漏電",
        "en": "Electrons could tunnel straight through it, causing leakage"
      },
      {
        "key": "twoPaths",
        "zh": "產業的解法分成兩條路",
        "en": "The industry took two paths to solve this"
      },
      {
        "key": "materials",
        "zh": "換材料",
        "en": "Change the materials"
      },
      {
        "key": "structure",
        "zh": "換結構",
        "en": "Change the structure"
      }
    ]
  },
  {
    "chapterId": "ch12",
    "headingZh": "換材料：應變矽與 HKMG",
    "headingEn": "Changing the materials: strained silicon and HKMG",
    "type": "compare",
    "captionZh": "換材料的兩種做法：應變矽與 HKMG",
    "captionEn": "The two materials-based fixes compared: strained silicon and HKMG.",
    "columns": [
      {
        "titleZh": "應變矽",
        "titleEn": "Strained silicon",
        "items": [
          {
            "zh": "輕微拉開或擠壓矽晶格",
            "en": "Slightly stretch or squeeze the lattice"
          },
          {
            "zh": "電子和電洞跑得更快",
            "en": "Electrons and holes move faster"
          },
          {
            "zh": "例：PMOS 源汲極長入矽鍺",
            "en": "E.g. silicon germanium in PMOS source/drain"
          }
        ]
      },
      {
        "titleZh": "HKMG",
        "titleEn": "HKMG",
        "items": [
          {
            "zh": "改用高介電常數絕緣層",
            "en": "High-k gate insulator"
          },
          {
            "zh": "較厚絕緣層，同樣控制力",
            "en": "Same control with a thicker layer"
          },
          {
            "zh": "減少漏電",
            "en": "Reduces leakage"
          },
          {
            "zh": "閘極從多晶矽改回金屬",
            "en": "Gate moves from polysilicon back to metal"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch12",
    "headingZh": "GAA：閘極完全包住通道",
    "headingEn": "GAA: the gate wraps all the way around",
    "type": "pictorial",
    "draw": "gaaFlow",
    "captionZh": "GAA 六步：A、C、D 沿通道，B、E、F 垂直通道剖面",
    "captionEn": "GAA in six steps: A, C, D cut along the channel; B, E, F cut across it",
    "labels": [
      {
        "key": "epi",
        "zh": "交替磊晶矽與矽鍺",
        "en": "Alternate silicon and SiGe epitaxy"
      },
      {
        "key": "fin",
        "zh": "做出鰭狀結構",
        "en": "Form fin-shaped stacks"
      },
      {
        "key": "dummy",
        "zh": "做假閘極",
        "en": "Build dummy gate"
      },
      {
        "key": "inner",
        "zh": "做內側間隔物",
        "en": "Form inner spacers"
      },
      {
        "key": "release",
        "zh": "挖掉矽鍺、釋放通道",
        "en": "Remove SiGe to release the channels"
      },
      {
        "key": "fill",
        "zh": "填入閘極材料",
        "en": "Fill in the gate"
      },
      {
        "key": "critical",
        "zh": "最關鍵的一步",
        "en": "The most critical step"
      },
      {
        "key": "selective",
        "zh": "選擇比極高的蝕刻",
        "en": "An etch with extremely high selectivity"
      },
      {
        "key": "suspended",
        "zh": "懸空的矽通道",
        "en": "Silicon channel suspended"
      },
      {
        "key": "ald",
        "zh": "ALD",
        "en": "ALD"
      },
      {
        "key": "insulatorMetal",
        "zh": "閘極絕緣層和金屬",
        "en": "The gate insulator and metal"
      },
      {
        "key": "si",
        "zh": "矽",
        "en": "Silicon"
      },
      {
        "key": "sige",
        "zh": "矽鍺",
        "en": "Silicon germanium"
      },
      {
        "key": "dummyGate",
        "zh": "假閘極",
        "en": "Dummy gate"
      },
      {
        "key": "innerSpacer",
        "zh": "內側間隔物",
        "en": "Inner spacer"
      }
    ]
  },
  {
    "chapterId": "ch12",
    "headingZh": "背面供電：把電源線搬到背面",
    "headingEn": "Backside power delivery: moving the power lines to the back",
    "type": "pictorial",
    "draw": "backsidePower",
    "captionZh": "正面與背面供電對照，以及背面供電四步（翻面後方向相反）",
    "captionEn": "Front vs. backside power, and the four steps (flipped steps face the other way)",
    "labels": [
      {
        "key": "traditional",
        "zh": "傳統上",
        "en": "Traditionally"
      },
      {
        "key": "drop",
        "zh": "電壓下降",
        "en": "Voltage drop"
      },
      {
        "key": "congested",
        "zh": "擁擠",
        "en": "Congested"
      },
      {
        "key": "transistors",
        "zh": "電晶體",
        "en": "Transistors"
      },
      {
        "key": "front",
        "zh": "正面",
        "en": "Front"
      },
      {
        "key": "back",
        "zh": "背面",
        "en": "Back"
      },
      {
        "key": "bspdn",
        "zh": "背面供電",
        "en": "Backside power delivery"
      },
      {
        "key": "carrier",
        "zh": "承載晶圓",
        "en": "Carrier wafer"
      },
      {
        "key": "thin",
        "zh": "磨到極薄",
        "en": "Extremely thin"
      },
      {
        "key": "wiring",
        "zh": "電源導線",
        "en": "Power wiring"
      },
      {
        "key": "leavesFront",
        "zh": "正面就能留給訊號線使用",
        "en": "Leaves the front for signal wiring"
      },
      {
        "key": "stable",
        "zh": "電源也更穩定",
        "en": "makes the power supply more stable"
      },
      {
        "key": "signal",
        "zh": "訊號線",
        "en": "Signal lines"
      },
      {
        "key": "power",
        "zh": "電源線",
        "en": "Power lines"
      },
      {
        "key": "bonded",
        "zh": "接合到另一片承載晶圓上",
        "en": "Bonded to a carrier wafer"
      },
      {
        "key": "flipped",
        "zh": "翻過來",
        "en": "The stack is flipped over"
      },
      {
        "key": "thinned",
        "zh": "把原本的晶圓磨到極薄",
        "en": "The original wafer is thinned until it is extremely thin"
      },
      {
        "key": "built",
        "zh": "在背面做出電源導線",
        "en": "Power wiring is built on its back"
      }
    ]
  },
  {
    "chapterId": "ch12",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三大微縮定律及其對電晶體架構的意義",
    "captionEn": "Three transistor scaling laws and what each means for device design.",
    "root": {
      "zh": "電晶體微縮定量定律",
      "en": "Transistor scaling laws"
    },
    "branches": [
      {
        "zh": "靜電特徵長度定律",
        "en": "Electrostatic scaling length law",
        "leafZh": "極短閘長下僅 GAA 守住靜電",
        "leafEn": "At the shortest gates only GAA keeps control"
      },
      {
        "zh": "立體有效通道寬度定律",
        "en": "Effective channel width law",
        "leafZh": "奈米片寬連續可調、電流更高",
        "leafEn": "Tunable sheet width, higher drive current"
      },
      {
        "zh": "汲極誘發能障降低定律",
        "en": "DIBL exponential law",
        "leafZh": "超低電壓下仍保有開關比",
        "leafEn": "Keeps on/off ratio at ultra-low voltage"
      }
    ]
  },
  {
    "chapterId": "ch12",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "前段三大核心異常與對應的永久防呆對策",
    "captionEn": "Three critical FEOL failure modes and the countermeasure for each.",
    "root": {
      "zh": "前段三大核心異常",
      "en": "Three critical FEOL failure modes",
      "icon": "risk"
    },
    "branches": [
      {
        "zh": "奈米片沾黏與內間隔層掏空",
        "en": "Nanosheet stiction, spacer short",
        "leafZh": "乾式氣相釋放並以原子層蝕刻控深",
        "leafEn": "Dry vapor release plus ALE recess control",
        "icon": "gaa"
      },
      {
        "zh": "底部寄生漏電與磊晶空洞",
        "en": "Sub-fin leakage, epi merge voids",
        "leafZh": "底部介電隔離加循環沉積回蝕",
        "leafEn": "BDI layer plus cyclic dep-etch epitaxy",
        "icon": "transistor"
      },
      {
        "zh": "背面接觸孔疊對偏移",
        "en": "Backside contact overlay shift",
        "leafZh": "自對準背面接觸加高階畸變補償",
        "leafEn": "Self-aligned backside contact plus CPE",
        "icon": "overlay"
      }
    ]
  },
  {
    "chapterId": "ch13",
    "headingZh": "HBM：把 DRAM 疊起來",
    "headingEn": "HBM: stacking DRAM",
    "type": "pictorial",
    "draw": "hbmStack",
    "sourcedNumbers": true,
    "sourceZh": "數值出自本段表格的 HBM4／HBM4E 一列；這一列另含仍有微凸塊的無助焊劑熱壓；標尺底部的青色是基底晶粒；層間高度未按比例。",
    "sourceEn": "Values come from the HBM4/HBM4E row of the table in this section. That row also covers fluxless TCB, which still uses micro-bumps. The teal layer at the bottom of the stack is the base die. Gaps are not to scale.",
    "captionZh": "製作 HBM 的主要步驟，以及三種堆疊接合方式",
    "captionEn": "The main steps in making HBM, and three ways to bond the stack",
    "labels": [
      {
        "key": "tsv",
        "zh": "做出 TSV",
        "en": "Build the TSVs"
      },
      {
        "key": "thin",
        "zh": "把晶圓磨薄到只剩幾十微米",
        "en": "Thin the wafers down to only a few dozen micrometers"
      },
      {
        "key": "bumps",
        "zh": "做出微小的凸塊",
        "en": "Form tiny bumps"
      },
      {
        "key": "stack",
        "zh": "疊起來接合",
        "en": "Stack and bond"
      },
      {
        "key": "tsvName",
        "zh": "TSV",
        "en": "TSV"
      },
      {
        "key": "tsvDef",
        "zh": "穿過晶片的垂直導線",
        "en": "Vertical wires that pass through the dies"
      },
      {
        "key": "stackDef",
        "zh": "把多顆 DRAM 晶片垂直疊在一起",
        "en": "Stacks several DRAM dies vertically"
      },
      {
        "key": "tcncf",
        "zh": "TC-NCF",
        "en": "TC-NCF"
      },
      {
        "key": "tcncfName",
        "zh": "熱壓鍵合搭配非導電膜",
        "en": "Thermal Compression with Non-Conductive Film"
      },
      {
        "key": "mrmuf",
        "zh": "MR-MUF",
        "en": "MR-MUF"
      },
      {
        "key": "mrmufName",
        "zh": "巨量回焊搭配模塑底部填膠",
        "en": "Mass Reflow Molded Underfill"
      },
      {
        "key": "hybrid",
        "zh": "無凸塊混合鍵合",
        "en": "Bumpless Cu-Cu Bonding"
      },
      {
        "key": "cuDesc",
        "zh": "大幅壓縮層間高度",
        "en": "Eliminate inter-die gap height"
      },
      {
        "key": "microbump",
        "zh": "微凸塊",
        "en": "Micro-bumps"
      },
      {
        "key": "gen",
        "zh": "HBM4 / HBM4E（16H+）",
        "en": "HBM4 / HBM4E (16H+)"
      },
      {
        "key": "fits775",
        "zh": "在 775 µm 封裝高度限制內容納 16 層以上堆疊",
        "en": "Fits 16+ DRAM tiers within the ~775 µm package height limit"
      }
    ]
  },
  {
    "chapterId": "ch13",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "記憶體三大致命異常與表中列出的一項對策",
    "captionEn": "Three critical memory failure modes and one listed countermeasure for each.",
    "root": {
      "zh": "記憶體致命異常",
      "en": "Critical memory failure modes",
      "icon": "risk"
    },
    "branches": [
      {
        "zh": "DRAM 保持時間變異",
        "en": "DRAM variable retention time",
        "leafZh": "晶粒內建 ECC",
        "leafEn": "On-die ECC",
        "icon": "clock"
      },
      {
        "zh": "NAND 字元線置換空洞",
        "en": "NAND wordline replacement voids",
        "leafZh": "無氟 ALD 鉬取代鎢",
        "leafEn": "Fluorine-free ALD Mo instead of W",
        "icon": "layers"
      },
      {
        "zh": "HBM 微凸塊橋接",
        "en": "HBM micro-bump solder bridging",
        "leafZh": "無凸塊銅對銅混合鍵合",
        "leafEn": "Bumpless Cu-Cu hybrid bonding",
        "icon": "bumps"
      }
    ]
  },
  {
    "chapterId": "ch13",
    "headingZh": "3D 記憶體與新興 NVM 條例總覽",
    "headingEn": "3D Memory & Emerging NVM Clauses",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "DRAM 微縮演進與各類嵌入式非揮發性記憶體的儲存機制",
    "captionEn": "The DRAM scaling roadmap and the storage physics of each embedded NVM family.",
    "root": {
      "zh": "記憶體架構與新興 NVM",
      "en": "Memory roadmap & emerging NVM"
    },
    "branches": [
      {
        "zh": "DRAM 微縮與立體化",
        "en": "DRAM scaling & stacking roadmap",
        "leafZh": "垂直通道、無電容與水平疊層",
        "leafEn": "Vertical channel, capacitorless, stacked DRAM"
      },
      {
        "zh": "嵌入式快閃記憶體",
        "en": "Embedded flash (eFlash)",
        "leafZh": "分閘式浮閘或氮化矽電荷捕捉",
        "leafEn": "Split-gate floating gate or SONOS charge trap"
      },
      {
        "zh": "自旋磁阻記憶體 MRAM",
        "en": "Spin-torque MRAM (STT / SOT)",
        "leafZh": "後段金屬層間的磁性穿隧接面",
        "leafEn": "Magnetic tunnel junction inside BEOL metals"
      },
      {
        "zh": "電阻式與相變化記憶體",
        "en": "Resistive & phase-change memory",
        "leafZh": "氧空位導電細絲或硫族相變",
        "leafEn": "Oxygen-vacancy filaments or GST phase change"
      },
      {
        "zh": "氧化鉿基鐵電記憶體",
        "en": "Hafnia-based ferroelectric memory",
        "leafZh": "氧化鉿鋯自發極化雙穩態",
        "leafEn": "Bistable polarization in doped HZO"
      }
    ]
  },
  {
    "chapterId": "ch13",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "記憶體三大定量定律與各自的工程意義",
    "captionEn": "Three memory physics and bandwidth laws and the engineering impact of each.",
    "root": {
      "zh": "記憶體物理與頻寬定律",
      "en": "Memory physics & bandwidth laws"
    },
    "branches": [
      {
        "zh": "DRAM 電容分壓定律",
        "en": "DRAM capacitor charge-sharing law",
        "leafZh": "催生垂直通道與水平堆疊 DRAM",
        "leafEn": "Drives vertical-channel and stacked DRAM"
      },
      {
        "zh": "NAND 穿隧與多態視窗",
        "en": "NAND F-N tunneling & Vt window",
        "leafZh": "QLC 需 CBA 與 LDPC",
        "leafEn": "QLC needs CBA and LDPC"
      },
      {
        "zh": "HBM 超寬匯流排頻寬",
        "en": "HBM wide-I/O bandwidth law",
        "leafZh": "打破記憶體頻寬牆",
        "leafEn": "Breaks the memory wall"
      }
    ]
  },
  {
    "chapterId": "ch14",
    "headingZh": "名稱的由來",
    "headingEn": "Where the names came from",
    "type": "pictorial",
    "draw": "nodeShrink",
    "sourcedNumbers": true,
    "sourceZh": "0.7 與 0.1 奈米出自本段正文；長方形依 0.7 倍等比例縮放，其餘為示意。",
    "sourceEn": "0.7 and 0.1 nm come from this section. The rectangles are scaled by exactly 0.7; everything else is schematic.",
    "captionZh": "每代縮成 0.7 倍：面積約減半；節點名稱後來與尺寸脫鉤",
    "captionEn": "Shrinking by 0.7 halves the area; node names later came apart from real sizes",
    "labels": [
      {
        "key": "times07",
        "zh": "長和寬都乘以 0.7",
        "en": "Multiplying both the length and the width by 0.7"
      },
      {
        "key": "half",
        "zh": "面積就變成大約一半",
        "en": "Cuts the area roughly in half"
      },
      {
        "key": "twice",
        "zh": "同樣面積可以放進兩倍的電晶體",
        "en": "Twice as many transistors fit in the same area"
      },
      {
        "key": "agreed",
        "zh": "名稱和實際尺寸是對得上的",
        "en": "The name and the real dimensions agreed"
      },
      {
        "key": "roughly",
        "zh": "大致等於電晶體閘極的長度，或是最密集線路的寬度",
        "en": "The gate length of the transistor or the width of the densest lines"
      },
      {
        "key": "shrink07",
        "zh": "每一代把尺寸縮小到大約 0.7 倍",
        "en": "Shrink dimensions to about 0.7 times each generation"
      },
      {
        "key": "complex",
        "zh": "電晶體的結構越來越複雜",
        "en": "Transistor structures became more and more complex"
      },
      {
        "key": "cantKeep",
        "zh": "實際尺寸的縮小速度跟不上名稱",
        "en": "The real dimensions could not keep up with the names"
      },
      {
        "key": "apart",
        "zh": "兩者就逐漸脫鉤了",
        "en": "The two gradually came apart"
      },
      {
        "key": "someCos",
        "zh": "也有公司",
        "en": "Some companies have also started"
      },
      {
        "key": "angstrom",
        "zh": "改用「埃」（Å，0.1 奈米）來命名新世代",
        "en": "naming new generations in angstroms (Å, 0.1 nm)"
      },
      {
        "key": "labelsOnly",
        "zh": "同樣只是世代代號",
        "en": "Likewise just generation labels"
      }
    ]
  },
  {
    "chapterId": "ch14",
    "headingZh": "為什麼不同公司的「幾奈米」不能直接比",
    "headingEn": "Why different companies' \"nanometers\" cannot be compared directly",
    "type": "branch",
    "captionZh": "不同公司的「幾奈米」不能直接比較的原因",
    "captionEn": "Why node names from different companies cannot be compared directly.",
    "root": {
      "zh": "「幾奈米」不能直接比",
      "en": "Node names not directly comparable",
      "noteZh": "各家自行命名，無統一標準",
      "noteEn": "No common standard; each names its own",
      "icon": "ruler"
    },
    "branches": [
      {
        "zh": "名稱相同",
        "en": "Same name",
        "leafZh": "密度可能差很多",
        "leafEn": "Density can differ a lot",
        "icon": "tag"
      },
      {
        "zh": "名稱數字較大",
        "en": "Larger number in the name",
        "leafZh": "密度可能反而更高",
        "leafEn": "Can even be denser",
        "icon": "array"
      },
      {
        "zh": "同一世代多個版本",
        "en": "Several versions per generation",
        "leafZh": "特性不完全相同",
        "leafEn": "Characteristics not all the same",
        "icon": "terms"
      }
    ]
  },
  {
    "chapterId": "ch14",
    "headingZh": "成熟製程一樣重要",
    "headingEn": "Mature processes matter just as much",
    "type": "compare",
    "captionZh": "選擇製程世代時，最先進與成熟製程的取捨",
    "captionEn": "Trade-offs between the most advanced and mature processes when choosing a node.",
    "columns": [
      {
        "titleZh": "最先進製程",
        "titleEn": "Most advanced processes",
        "items": [
          {
            "zh": "光罩和設計成本非常高",
            "en": "Masks and design are extremely expensive"
          },
          {
            "zh": "銷量大、效能要求高才划算",
            "en": "Worth it only for high-volume, high-performance"
          }
        ],
        "icon": "gaa"
      },
      {
        "titleZh": "成熟製程",
        "titleEn": "Mature processes",
        "items": [
          {
            "zh": "類比與高電壓電路表現更好",
            "en": "Analog and high-voltage circuits work better"
          },
          {
            "zh": "可靠度經過長期驗證",
            "en": "Reliability proven over many years"
          },
          {
            "zh": "例：汽車電子、電源管理",
            "en": "E.g. automotive electronics, power management"
          }
        ],
        "icon": "shield-check"
      }
    ]
  },
  {
    "chapterId": "ch14",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三大 DTCO 瓶頸與表中列出的一項對策",
    "captionEn": "Three primary DTCO failure modes and one listed countermeasure for each.",
    "root": {
      "zh": "三大 DTCO 瓶頸",
      "en": "Three primary DTCO failure modes",
      "icon": "risk"
    },
    "branches": [
      {
        "zh": "矮單元繞線擁塞與壓降",
        "en": "Low-track cell congestion, IR drop",
        "leafZh": "電源移到晶圓背面",
        "leafEn": "Move power to the wafer backside",
        "icon": "route"
      },
      {
        "zh": "導線與通孔電阻暴增",
        "en": "Interconnect resistivity explosion",
        "leafZh": "改用釕、鉬無阻障金屬",
        "leafEn": "Barrierless Ru or Mo",
        "icon": "resistance"
      },
      {
        "zh": "光罩錯誤增強因子失控",
        "en": "MEEF runaway",
        "leafZh": "High-NA EUV",
        "leafEn": "High-NA EUV",
        "icon": "reticle"
      }
    ]
  },
  {
    "chapterId": "ch14",
    "headingZh": "真實微縮標尺與 DTCO／STCO 條例總覽",
    "headingEn": "True Scaling Metrics & DTCO/STCO Clauses",
    "type": "pictorial",
    "draw": "cppScale",
    "foldTables": true,
    "foldSection": true,
    "sourcedNumbers": true,
    "sourceZh": "節距與軌道數出自本段表格，是各家公開值的典型範圍，不是單一產品的量測值；1.4nm 那一格是預估。軸從 0 nm 起，虛線標出 3nm 的位置。",
    "sourceEn": "Pitches and track counts come from the table in this section: typical ranges of public figures across companies, not measurements of one product. The 1.4nm value is projected. The axis starts at 0 nm, and the dashed line marks 3nm.",
    "captionZh": "CPP、金屬節距的表列典型值與軌道高度、DTCO、STCO",
    "captionEn": "Tabulated typical CPP and metal pitch values, plus track height, DTCO and STCO",
    "labels": [
      {
        "key": "metrics",
        "zh": "真實微縮標尺",
        "en": "True scaling metrics"
      },
      {
        "key": "cpp",
        "zh": "閘極接觸節距",
        "en": "Contacted Poly / Gate Pitch"
      },
      {
        "key": "cppAbbr",
        "zh": "CPP",
        "en": "CPP"
      },
      {
        "key": "cppItem",
        "zh": "相鄰閘極中心距，決定 X 軸密度",
        "en": "Gate-to-gate pitch; sets X-axis density",
        "from": "figure"
      },
      {
        "key": "cppNote",
        "zh": "最誠實的前段微縮尺規",
        "en": "Ground-truth metric for FEOL scaling",
        "from": "figure"
      },
      {
        "key": "m1p",
        "zh": "第一層金屬最小節距",
        "en": "Minimum Metal Pitch"
      },
      {
        "key": "m1pAbbr",
        "zh": "M1P",
        "en": "M1P"
      },
      {
        "key": "m1pItem",
        "zh": "最底層金屬節距，決定 Y 軸佈線密度",
        "en": "Lowest-level metal pitch; sets Y-axis routing",
        "from": "figure"
      },
      {
        "key": "m1pNote",
        "zh": "反映 EUV 解析度與後段微縮",
        "en": "Reflects EUV resolution and BEOL scaling",
        "from": "figure"
      },
      {
        "key": "g7",
        "zh": "7nm",
        "en": "7nm"
      },
      {
        "key": "g3",
        "zh": "3nm",
        "en": "3nm"
      },
      {
        "key": "g2",
        "zh": "2nm",
        "en": "2nm"
      },
      {
        "key": "g3e",
        "zh": "3nm EUV",
        "en": "3nm EUV"
      },
      {
        "key": "g14",
        "zh": "1.4nm",
        "en": "1.4nm"
      },
      {
        "key": "proj",
        "zh": "預估",
        "en": "projected"
      },
      {
        "key": "stall",
        "zh": "3nm 之後 CPP 幾乎不再縮小",
        "en": "CPP has largely stalled after 3nm"
      },
      {
        "key": "v7c",
        "zh": "54–57 nm",
        "en": "54–57 nm"
      },
      {
        "key": "v3c",
        "zh": "45–50 nm",
        "en": "45–50 nm"
      },
      {
        "key": "v7m",
        "zh": "36–40 nm",
        "en": "36–40 nm"
      },
      {
        "key": "v3m",
        "zh": "23–30 nm",
        "en": "23–30 nm"
      },
      {
        "key": "v14",
        "zh": "約 20–22 nm",
        "en": "~20–22 nm"
      },
      {
        "key": "a0",
        "zh": "0",
        "en": "0"
      },
      {
        "key": "a20",
        "zh": "20",
        "en": "20"
      },
      {
        "key": "a40",
        "zh": "40",
        "en": "40"
      },
      {
        "key": "nm",
        "zh": "nm",
        "en": "nm"
      },
      {
        "key": "myth",
        "zh": "商業「幾奈米」命名迷思",
        "en": "commercial \"nanometer\" marketing names"
      },
      {
        "key": "track",
        "zh": "軌道高度",
        "en": "Track height"
      },
      {
        "key": "trackItem",
        "zh": "單元高度等於軌道數乘金屬節距",
        "en": "Cell height is tracks times metal pitch",
        "from": "figure"
      },
      {
        "key": "trackT",
        "zh": "軌道數由 9T / 7.5T 縮減至 6T / 5T",
        "en": "Cell height scales from 9T / 7.5T down to 6T / 5T"
      },
      {
        "key": "trackNote",
        "zh": "減少軌道數仍可縮小邏輯面積",
        "en": "Fewer tracks still shrink logic area",
        "from": "figure"
      },
      {
        "key": "dtcoStco",
        "zh": "DTCO／STCO",
        "en": "DTCO/STCO"
      },
      {
        "key": "dtco",
        "zh": "DTCO",
        "en": "DTCO"
      },
      {
        "key": "dtcoItem",
        "zh": "單擴散斷開、埋入電源軌與背面供電",
        "en": "SDB, buried power rails, backside power",
        "from": "figure"
      },
      {
        "key": "dtcoNote",
        "zh": "靠三維單元結構重組延續摩爾定律",
        "en": "Extends Moore's Law via 3D cell-level structural innovation"
      },
      {
        "key": "stco",
        "zh": "STCO",
        "en": "STCO"
      },
      {
        "key": "stcoItem",
        "zh": "SoC 拆成按功能最佳化的小晶片",
        "en": "SoC split into node-optimized chiplets",
        "from": "figure"
      },
      {
        "key": "stcoNote",
        "zh": "以立體整合突破曝光視場極限",
        "en": "Stacking breaks the reticle limit",
        "from": "figure"
      }
    ]
  },
  {
    "chapterId": "ch14",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "製程微縮三大定律與對節點對標、小晶片拆解的意義",
    "captionEn": "Three scaling laws and what they mean for node benchmarking and chiplets.",
    "root": {
      "zh": "製程微縮與小晶片定律",
      "en": "Node scaling & chiplet laws"
    },
    "branches": [
      {
        "zh": "單元面積與電晶體密度",
        "en": "Cell area & transistor density law",
        "leafZh": "跨越商業命名的客觀密度換算",
        "leafEn": "Objective density yardstick beyond node names"
      },
      {
        "zh": "Dennard 微縮崩潰",
        "en": "Post-Dennard power density law",
        "leafZh": "轉向多核心、AI 加速器與液冷",
        "leafEn": "Turn to multicore, AI cores, liquid cooling"
      },
      {
        "zh": "異質小晶片混搭成本",
        "en": "Heterogeneous chiplet cost law",
        "leafZh": "運算用先進，I/O 留成熟節點",
        "leafEn": "Compute on advanced nodes, I/O on mature"
      }
    ]
  },
  {
    "chapterId": "ch15",
    "headingZh": "工廠的眼睛",
    "headingEn": "The eyes of the fab",
    "type": "flow",
    "captionZh": "每個重要步驟後，量測數據決定晶圓能否往下走",
    "captionEn": "After each important step, tool data decides whether the wafer can move on.",
    "steps": [
      {
        "zh": "完成重要步驟",
        "en": "An important step is done",
        "icon": "check"
      },
      {
        "zh": "機台確認",
        "en": "Tools check the wafer",
        "noteZh": "厚度、線寬、有沒有缺陷",
        "noteEn": "Thickness, line width, any defects",
        "icon": "microscope"
      },
      {
        "zh": "產生數據",
        "en": "Data is produced",
        "noteZh": "製程控制與良率分析的基礎",
        "noteEn": "Basis of process control and yield analysis",
        "icon": "tester"
      },
      {
        "zh": "決定晶圓能否往下走",
        "en": "Decide whether the wafer moves on",
        "icon": "dispatch"
      }
    ]
  },
  {
    "chapterId": "ch15",
    "headingZh": "抽樣：不是每片都量",
    "headingEn": "Sampling: not every wafer is measured",
    "type": "pictorial",
    "draw": "samplingLevels",
    "captionZh": "只量部分批次、晶圓與位置（數量示意）；比例依風險與成本取捨",
    "captionEn": "Sampling some lots, wafers and sites (counts schematic) trades risk against cost",
    "labels": [
      {
        "key": "someLots",
        "zh": "部分批次",
        "en": "Some lots"
      },
      {
        "key": "someWafers",
        "zh": "每批中的部分晶圓",
        "en": "Some wafers in each lot"
      },
      {
        "key": "someSites",
        "zh": "每片晶圓上的部分位置",
        "en": "Some sites on each wafer"
      },
      {
        "key": "rates",
        "zh": "抽樣比例",
        "en": "Sampling rates"
      },
      {
        "key": "lower",
        "zh": "降低抽樣比例",
        "en": "Lower sampling rates"
      },
      {
        "key": "stable",
        "zh": "穩定的製程",
        "en": "Stable processes"
      },
      {
        "key": "higher",
        "zh": "提高抽樣比例",
        "en": "Higher sampling rates"
      },
      {
        "key": "newProducts",
        "zh": "新產品",
        "en": "New products"
      },
      {
        "key": "freshTools",
        "zh": "剛保養完的機台",
        "en": "tools fresh from maintenance"
      },
      {
        "key": "recentProblems",
        "zh": "最近出過問題的製程",
        "en": "processes that recently had problems"
      },
      {
        "key": "tradeOff",
        "zh": "抽樣是在風險和成本之間取捨",
        "en": "Sampling is a trade-off between risk and cost"
      },
      {
        "key": "lessName",
        "zh": "量得越少",
        "en": "Measuring less"
      },
      {
        "key": "lessFast",
        "zh": "產出越快",
        "en": "Speeds up output"
      },
      {
        "key": "lessRisk",
        "zh": "風險越高",
        "en": "Raises the risk"
      },
      {
        "key": "lessLate",
        "zh": "可能讓異常的晶圓一路流到後面才被發現",
        "en": "Lets abnormal wafers flow far down the line before anyone notices"
      },
      {
        "key": "lessLots",
        "zh": "影響的批數也更多",
        "en": "More lots are affected"
      },
      {
        "key": "moreName",
        "zh": "量得越多",
        "en": "Measuring more"
      },
      {
        "key": "moreEarly",
        "zh": "越能及早發現問題",
        "en": "Catches problems earlier"
      },
      {
        "key": "moreCost",
        "zh": "量測要花時間和機台產能",
        "en": "Metrology takes time and tool capacity"
      },
      {
        "key": "moreSlow",
        "zh": "量太多會拖慢整座工廠",
        "en": "Measuring too much slows down the whole fab"
      }
    ]
  },
  {
    "chapterId": "ch15",
    "headingZh": "在線量測與 3D 封裝無損檢測條例總覽",
    "headingEn": "In-Line Metrology & 3D NDT Inspection Clauses",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "從晶圓廠在線量測、檢測延伸到先進封裝無損檢測",
    "captionEn": "Fab metrology and inspection, extended to non-destructive package inspection.",
    "columns": [
      {
        "titleZh": "晶圓廠在線量測與檢測",
        "titleEn": "Fab in-line metrology & inspection",
        "items": [
          {
            "zh": "臨界尺寸與結構幾何量測",
            "en": "CD & profile metrology",
            "noteZh": "CD-SEM 與光學散射儀",
            "noteEn": "CD-SEM and OCD scatterometry"
          },
          {
            "zh": "薄膜厚度、成分與疊對量測",
            "en": "Film, composition & overlay metrology",
            "noteZh": "橢偏儀、XRF 與疊對靶標",
            "noteEn": "Ellipsometry, XRF and overlay targets"
          },
          {
            "zh": "光學明暗場與電子束缺陷檢測",
            "en": "Optical bright/dark-field & e-beam inspection",
            "noteZh": "電壓對比抓底部接觸孔開路",
            "noteEn": "Voltage contrast finds buried contact opens"
          }
        ]
      },
      {
        "titleZh": "先進封裝無損檢測",
        "titleEn": "Advanced packaging NDT",
        "items": [
          {
            "zh": "超音波掃描與 X 光斷層掃描",
            "en": "Acoustic microscopy & X-ray CT",
            "noteZh": "抓鍵合空洞、裂紋與脫層",
            "noteEn": "Flags bonding voids, cracks, delamination"
          },
          {
            "zh": "紅外線對準與翹曲光學量測",
            "en": "IR alignment & warpage metrology",
            "noteZh": "穿透矽對準、迴焊動態翹曲",
            "noteEn": "Through-silicon alignment, reflow warpage"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch15",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "量測與無損檢測三大定律及其工程意義",
    "captionEn": "Three metrology and NDT laws and the engineering impact of each.",
    "root": {
      "zh": "量測與無損檢測定律",
      "en": "Metrology & NDT laws"
    },
    "branches": [
      {
        "zh": "橢偏與 OCD 逆散射",
        "en": "Ellipsometry & OCD inverse law",
        "leafZh": "線上形貌直接作為 APC 輸入",
        "leafEn": "Inline geometry feeds APC run-to-run loops"
      },
      {
        "zh": "瑞利散射與聲阻抗反射",
        "en": "Rayleigh & acoustic reflection law",
        "leafZh": "暗場抓微粒，超音波照鍵合空洞",
        "leafEn": "Dark-field finds particles; C-SAM finds voids"
      },
      {
        "zh": "量測重複性與公差比",
        "en": "Gauge R&R P/T ratio law",
        "leafZh": "量測雜訊不吃掉製程視窗",
        "leafEn": "Gauge noise must not eat the process window"
      }
    ]
  },
  {
    "chapterId": "ch15",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "量測機台三類自身異常與表中列出的對策",
    "captionEn": "Three metrology-tool failure modes and the listed countermeasures.",
    "root": {
      "zh": "量測機台自身異常",
      "en": "Metrology tool failure modes"
    },
    "branches": [
      {
        "zh": "電子束光阻萎縮與充電",
        "en": "E-beam resist shrinkage & charging",
        "leafZh": "低著陸能量並扣除萎縮補償",
        "leafEn": "Low landing energy; subtract shrink offset"
      },
      {
        "zh": "OCD 參數耦合失真",
        "en": "OCD parameter cross-correlation",
        "leafZh": "混合量測前饋鎖定底層膜厚",
        "leafEn": "Hybrid metrology: feed forward film thickness"
      },
      {
        "zh": "暗場假警報與音波邊緣盲區",
        "en": "Nuisance flood & C-SAM edge shadow",
        "leafZh": "偏振濾波、自適應閾值並補紅外線",
        "leafEn": "Polarized filters, adaptive threshold, IR edge"
      }
    ]
  },
  {
    "chapterId": "ch15",
    "headingZh": "量測與檢測不一樣",
    "headingEn": "Metrology and inspection are not the same",
    "type": "pictorial",
    "draw": "metrologyVsInspection",
    "captionZh": "量測得到一組數字，檢測得到標出缺陷位置的分佈圖",
    "captionEn": "Metrology gives a set of numbers; inspection gives a map of defect locations",
    "labels": [
      {
        "key": "metrology",
        "zh": "量測",
        "en": "Metrology"
      },
      {
        "key": "inspection",
        "zh": "檢測",
        "en": "Inspection"
      },
      {
        "key": "measures",
        "zh": "測量具體的數值",
        "en": "Measures specific values"
      },
      {
        "key": "searches",
        "zh": "在晶圓上尋找缺陷",
        "en": "Searches the wafer for defects"
      },
      {
        "key": "thickness",
        "zh": "膜厚",
        "en": "Film thickness"
      },
      {
        "key": "lineWidth",
        "zh": "線寬",
        "en": "Line width"
      },
      {
        "key": "particles",
        "zh": "微粒",
        "en": "Particles"
      },
      {
        "key": "scratches",
        "zh": "刮傷",
        "en": "Scratches"
      },
      {
        "key": "pattern",
        "zh": "圖形異常",
        "en": "Pattern problems"
      },
      {
        "key": "numbers",
        "zh": "量測的結果是一組數字",
        "en": "Metrology produces a set of numbers"
      },
      {
        "key": "map",
        "zh": "檢測的結果是一張標出缺陷位置的分佈圖",
        "en": "Inspection produces a map of defect locations"
      },
      {
        "key": "loosely",
        "zh": "現場常把兩者都籠統地叫",
        "en": "People on the floor often loosely call both"
      },
      {
        "key": "callBoth",
        "zh": "「量測」",
        "en": "\"metrology\" or \"measurement.\""
      }
    ]
  },
  {
    "chapterId": "ch15",
    "headingZh": "常見的量測",
    "headingEn": "Common measurements",
    "type": "pictorial",
    "draw": "fiveMeasurements",
    "captionZh": "五種常見量測：量什麼、怎麼量、什麼時候量",
    "captionEn": "Five common measurements: what is measured, how, and when",
    "labels": [
      {
        "key": "thickness",
        "zh": "膜厚",
        "en": "Film thickness"
      },
      {
        "key": "thickHow",
        "zh": "用光照射薄膜，分析反射光的變化",
        "en": "Shine light on the film and analyze the reflected light"
      },
      {
        "key": "thickWhen",
        "zh": "薄膜沉積、CMP 之後",
        "en": "After deposition and CMP"
      },
      {
        "key": "cd",
        "zh": "線寬（CD）",
        "en": "Line width (CD)"
      },
      {
        "key": "cdHow",
        "zh": "用電子顯微鏡從上方量測",
        "en": "Measure from above with an electron microscope"
      },
      {
        "key": "cdSem",
        "zh": "CD-SEM",
        "en": "CD-SEM"
      },
      {
        "key": "cdWhen",
        "zh": "微影、蝕刻之後",
        "en": "After lithography and etching"
      },
      {
        "key": "profile",
        "zh": "立體輪廓",
        "en": "Profile"
      },
      {
        "key": "ocdHow",
        "zh": "分析光的散射，搭配模型推算形狀",
        "en": "Analyze scattered light and fit it with a model"
      },
      {
        "key": "ocd",
        "zh": "OCD",
        "en": "OCD"
      },
      {
        "key": "ocdWhen",
        "zh": "先進結構的關鍵步驟",
        "en": "Key steps for advanced structures"
      },
      {
        "key": "overlay",
        "zh": "對準（Overlay）",
        "en": "Overlay"
      },
      {
        "key": "ovlHow",
        "zh": "量測上下兩層的對準記號",
        "en": "Measure the alignment marks of two layers"
      },
      {
        "key": "ovlWhen",
        "zh": "微影之後",
        "en": "After lithography"
      },
      {
        "key": "sheet",
        "zh": "片電阻",
        "en": "Sheet resistance"
      },
      {
        "key": "sheetHow",
        "zh": "用四根探針接觸表面量測",
        "en": "Touch the surface with four probes"
      },
      {
        "key": "sheetWhen",
        "zh": "佈植、退火、金屬沉積之後",
        "en": "After implantation, anneal and metal deposition"
      },
      {
        "key": "timing",
        "zh": "常見時機",
        "en": "Typical timing"
      }
    ]
  },
  {
    "chapterId": "ch15",
    "headingZh": "破壞性分析",
    "headingEn": "Destructive analysis",
    "type": "pictorial",
    "draw": "crossSectionAnalysis",
    "captionZh": "切開晶圓，用電子顯微鏡看剖面；這種分析會破壞晶圓",
    "captionEn": "Cut the wafer open and examine the cross-section; the wafer is destroyed",
    "labels": [
      {
        "key": "cutOpen",
        "zh": "把晶圓切開",
        "en": "Cutting the wafer open"
      },
      {
        "key": "examined",
        "zh": "用電子顯微鏡觀察剖面",
        "en": "Examined with an electron microscope"
      },
      {
        "key": "eachLayer",
        "zh": "每一層的厚度和形狀",
        "en": "The thickness and shape of each layer"
      },
      {
        "key": "destroys",
        "zh": "這種分析會破壞晶圓",
        "en": "This kind of analysis destroys the wafer"
      },
      {
        "key": "mainly",
        "zh": "所以主要用在",
        "en": "So it is used mainly in"
      },
      {
        "key": "dev",
        "zh": "製程開發",
        "en": "Process development"
      },
      {
        "key": "fa",
        "zh": "故障分析",
        "en": "Failure analysis"
      }
    ]
  },
  {
    "chapterId": "ch16",
    "headingZh": "良率就是錢",
    "headingEn": "Yield is money",
    "type": "cycle",
    "captionZh": "新製程靠一個個找出並解決問題，讓良率逐步爬升",
    "captionEn": "Yield climbs as engineers find and solve problems one by one.",
    "steps": [
      {
        "zh": "找出問題",
        "en": "Find problems"
      },
      {
        "zh": "解決問題",
        "en": "Solve problems"
      },
      {
        "zh": "良率逐步爬升",
        "en": "Yield gradually climbs",
        "noteZh": "爬得越快越有競爭力",
        "noteEn": "Faster climb, more competitive"
      }
    ],
    "centerZh": "良率學習曲線",
    "centerEn": "Yield learning curve"
  },
  {
    "chapterId": "ch16",
    "headingZh": "良率怎麼算",
    "headingEn": "How yield is calculated",
    "type": "flow",
    "captionZh": "良率分階段計算，整體良率是各階段相乘",
    "captionEn": "Yield is tracked in stages, and overall yield is the product of the stages.",
    "steps": [
      {
        "zh": "晶圓良率",
        "en": "Line yield",
        "noteZh": "完成前段製程、未中途報廢",
        "noteEn": "Finish the front end without scrap"
      },
      {
        "zh": "晶粒良率",
        "en": "Die yield",
        "noteZh": "通過晶圓測試的晶粒比例",
        "noteEn": "Fraction of dies passing wafer test"
      },
      {
        "zh": "最終測試良率",
        "en": "Final test yield",
        "noteZh": "封裝後通過最終測試的比例",
        "noteEn": "Packaged chips passing final test"
      },
      {
        "zh": "整體良率",
        "en": "Overall yield",
        "noteZh": "各階段相乘",
        "noteEn": "Product of all stages"
      }
    ]
  },
  {
    "chapterId": "ch16",
    "headingZh": "共通性分析",
    "headingEn": "Commonality analysis",
    "type": "flow",
    "captionZh": "共通性分析靠晶圓履歷找出壞晶圓的共同點",
    "captionEn": "Commonality analysis uses wafer histories to find what bad wafers share.",
    "steps": [
      {
        "zh": "幾批良率特別差",
        "en": "Several lots have poor yield"
      },
      {
        "zh": "逐站比對好壞晶圓",
        "en": "Compare bad vs normal wafers",
        "noteZh": "機台、腔體、時間與材料",
        "noteEn": "Tools, chambers, times and materials"
      },
      {
        "zh": "找出壞晶圓獨有共同點",
        "en": "Find what only bad wafers share"
      },
      {
        "zh": "範圍縮小到少數幾站",
        "en": "Narrow the search to a few steps"
      }
    ]
  },
  {
    "chapterId": "ch16",
    "headingZh": "故障分析：找到「兇手」",
    "headingEn": "Failure analysis: finding the culprit",
    "type": "flow",
    "captionZh": "故障分析從電性定位到剖面觀察，找出失效的實際證據",
    "captionEn": "Failure analysis finds physical evidence, from fault isolation to imaging.",
    "steps": [
      {
        "zh": "統計分析：可能是哪裡",
        "en": "Statistics: where it might be"
      },
      {
        "zh": "電性定位",
        "en": "Electrical fault isolation",
        "noteZh": "故障點常發出微弱光或熱",
        "noteEn": "Failures often give off faint light or heat"
      },
      {
        "zh": "逐層剝除",
        "en": "Deprocessing",
        "noteZh": "逐層去除並觀察",
        "noteEn": "Remove and inspect layer by layer"
      },
      {
        "zh": "精準切割",
        "en": "Precise cross-sectioning",
        "noteZh": "用聚焦離子束切出剖面",
        "noteEn": "FIB cuts a cross-section at the failure"
      },
      {
        "zh": "觀察與分析",
        "en": "Observation and analysis",
        "noteZh": "確認短路、斷路、空洞或污染",
        "noteEn": "Confirm a short, open, void or contamination"
      }
    ]
  },
  {
    "chapterId": "ch16",
    "headingZh": "良率數學模型與 EFA／PFA 故障分析條例總覽",
    "headingEn": "Yield Models & EFA/PFA Failure Analysis Clauses",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "良率模型、非破壞電性定位與破壞性物理分析對照",
    "captionEn": "Yield models, non-destructive EFA and destructive PFA side by side.",
    "columns": [
      {
        "titleZh": "良率預測模型",
        "titleEn": "Yield models",
        "items": [
          {
            "keyZh": "方法",
            "keyEn": "Methods",
            "zh": "卜瓦松、莫菲與負二項式",
            "en": "Poisson, Murphy, negative binomial"
          },
          {
            "keyZh": "能力",
            "keyEn": "Capability",
            "zh": "量化大晶片的缺陷群聚衝擊",
            "en": "Quantifies defect clustering on large dies"
          },
          {
            "keyZh": "用途",
            "keyEn": "Target",
            "zh": "預測良率學習、評估小晶片拆分",
            "en": "Yield-learning forecasts, chiplet split ROI"
          }
        ]
      },
      {
        "titleZh": "電性故障定位 EFA",
        "titleEn": "Electrical fault isolation (EFA)",
        "items": [
          {
            "keyZh": "方法",
            "keyEn": "Methods",
            "zh": "掃描鏈、PEM、OBIRCH、熱成像",
            "en": "Scan chain, PEM, OBIRCH, lock-in thermography"
          },
          {
            "keyZh": "能力",
            "keyEn": "Capability",
            "zh": "熱波相位算出熱點所在層深",
            "en": "Thermal phase pinpoints the die tier in a stack"
          },
          {
            "keyZh": "用途",
            "keyEn": "Target",
            "zh": "不拆封裝鎖定失效層與凸塊",
            "en": "Finds the leaking tier or bump, package intact"
          }
        ]
      },
      {
        "titleZh": "物理故障分析 PFA",
        "titleEn": "Physical failure analysis (PFA)",
        "items": [
          {
            "keyZh": "方法",
            "keyEn": "Methods",
            "zh": "FIB、STEM、能譜與原子探針",
            "en": "FIB, STEM, EELS/EDX and atom probe"
          },
          {
            "keyZh": "能力",
            "keyEn": "Capability",
            "zh": "單原子級晶格與化學價態解析",
            "en": "Atomic lattice and chemical-state resolution",
            "noteZh": "電漿 FIB 一次切開整排凸塊",
            "noteEn": "Plasma FIB cuts whole bump arrays at once"
          },
          {
            "keyZh": "用途",
            "keyEn": "Target",
            "zh": "拍下閘極針孔、鍵合空洞鐵證",
            "en": "Definitive proof of pinholes and bond voids"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch16",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "良率與故障分析三大定律及其工程意義",
    "captionEn": "Three yield and failure-analysis laws and the engineering impact of each.",
    "root": {
      "zh": "良率與故障分析定律",
      "en": "Yield & failure analysis laws"
    },
    "branches": [
      {
        "zh": "良率統計模型與叢集度",
        "en": "Yield models & defect clustering",
        "leafZh": "報價、學習曲線與拆分評估",
        "leafEn": "Pricing, learning curves, chiplet split ROI"
      },
      {
        "zh": "缺陷粒徑與關鍵面積",
        "en": "Defect size & critical area law",
        "leafZh": "拉寬線距並加雙重通孔",
        "leafEn": "Wire spreading and via doubling"
      },
      {
        "zh": "鎖相熱成像相位深度",
        "en": "Lock-in thermography phase depth",
        "leafZh": "不開蓋算出漏電層，指引下刀",
        "leafEn": "Finds the shorted tier before FIB milling"
      }
    ]
  },
  {
    "chapterId": "ch16",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "良率與故障分析三類異常與表中列出的對策",
    "captionEn": "Three yield and FA failure modes and the listed countermeasures.",
    "root": {
      "zh": "良率與故障分析異常",
      "en": "Yield and FA failure modes"
    },
    "branches": [
      {
        "zh": "晶圓圖空間圖騰",
        "en": "Spatial wafer-map signatures",
        "leafZh": "AI 分類晶圓圖並鎖住嫌疑腔體",
        "leafEn": "AI map classification holds suspect chambers"
      },
      {
        "zh": "單一腔體異常被平均掩蓋",
        "en": "Single-chamber excursion masked",
        "leafZh": "腔體槽位級追蹤並自動鎖腔",
        "leafEn": "Chamber/slot genealogy auto-locks the chamber"
      },
      {
        "zh": "盲目劈開樣品毀掉證據",
        "en": "Blind FIB cut destroys evidence",
        "leafZh": "先非破壞定位，才准去層切割",
        "leafEn": "Localize non-destructively before any FIB cut"
      }
    ]
  },
  {
    "chapterId": "ch17",
    "headingZh": "規格界限與管制界限",
    "headingEn": "Specification limits and control limits",
    "type": "compare",
    "captionZh": "OOC 代表製程可能異常，OOS 代表產品已不合格",
    "captionEn": "OOC signals an abnormal process; OOS means the product is already out of spec.",
    "columns": [
      {
        "titleZh": "OOC：超出管制界限",
        "titleEn": "OOC: outside control limits",
        "items": [
          {
            "zh": "依製程平常表現算出的範圍",
            "en": "Range calculated from normal behavior",
            "noteZh": "通常比規格界限窄",
            "noteEn": "Usually narrower than spec limits"
          },
          {
            "zh": "製程不像平常，可能有異常",
            "en": "Not behaving as usual; something may be wrong"
          },
          {
            "zh": "產品不一定不合格，但須處理",
            "en": "Product not necessarily bad, but act on it"
          },
          {
            "zh": "像車道線：一壓線就修正",
            "en": "Like lane markings: correct when touched"
          }
        ]
      },
      {
        "titleZh": "OOS：超出規格界限",
        "titleEn": "OOS: outside spec limits",
        "items": [
          {
            "zh": "產品要求的範圍",
            "en": "The range the product requires"
          },
          {
            "zh": "產品已不符合要求",
            "en": "Product already out of spec"
          },
          {
            "zh": "要開 MRB 判定",
            "en": "Needs an MRB disposition"
          },
          {
            "zh": "像路的邊緣：開出去就出事",
            "en": "Like the road edge: going over is an accident"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch17",
    "headingZh": "實驗設計與分批實驗",
    "headingEn": "Design of experiments and split lots",
    "type": "flow",
    "captionZh": "分批實驗把同一批晶圓分組，各組條件不同、其他步驟相同",
    "captionEn": "A split lot divides one lot into groups, each under a different condition.",
    "steps": [
      {
        "zh": "同一批晶圓",
        "en": "One lot of wafers"
      },
      {
        "zh": "分成幾組",
        "en": "Divide into several groups"
      },
      {
        "zh": "每組使用不同條件",
        "en": "Each group: a different condition",
        "noteZh": "其他步驟完全相同",
        "noteEn": "Everything else stays the same"
      },
      {
        "zh": "比較各組結果",
        "en": "Compare the groups",
        "noteZh": "經歷幾乎一樣，比較最公平",
        "noteEn": "Near-identical histories: the fairest test"
      }
    ]
  },
  {
    "chapterId": "ch17",
    "headingZh": "自動控制：R2R 與 FDC",
    "headingEn": "Automatic control: R2R and FDC",
    "type": "pictorial",
    "draw": "r2rFdc",
    "captionZh": "R2R 批間調整、FDC 即時監控；自動補償可能藏住問題",
    "captionEn": "R2R adjusts between runs and FDC watches each run; compensation can hide drift",
    "labels": [
      {
        "key": "r2r",
        "zh": "Run-to-Run",
        "en": "Run-to-run"
      },
      {
        "key": "between",
        "zh": "批與批之間",
        "en": "Between runs"
      },
      {
        "key": "basedOn",
        "zh": "根據前幾批的量測結果",
        "en": "Based on the measurements of the previous lots"
      },
      {
        "key": "tune",
        "zh": "自動微調下一批的 Recipe",
        "en": "Automatically fine-tunes the recipe of the next lot"
      },
      {
        "key": "exIf",
        "zh": "例如線寬偏大",
        "en": "For example, if the line width is running large"
      },
      {
        "key": "exThen",
        "zh": "就自動調整下一批的曝光能量",
        "en": "the exposure dose of the next lot is adjusted"
      },
      {
        "key": "shower",
        "zh": "就像洗澡時感覺水溫偏冷，就把熱水轉大一點",
        "en": "It is like turning up the hot water when the shower feels a little cold"
      },
      {
        "key": "fdc",
        "zh": "FDC",
        "en": "FDC"
      },
      {
        "key": "during",
        "zh": "製程進行中",
        "en": "During the run"
      },
      {
        "key": "sensorData",
        "zh": "即時監看機台感測器的數據",
        "en": "Watches the tool's sensor data in real time during processing"
      },
      {
        "key": "sensors",
        "zh": "例如壓力、溫度、功率、氣體流量",
        "en": "Such as pressure, temperature, power and gas flow"
      },
      {
        "key": "alarm",
        "zh": "一旦曲線不正常，就立刻發出警報",
        "en": "As soon as a trace looks abnormal, it raises an alarm"
      },
      {
        "key": "dashboard",
        "zh": "就像汽車儀表板上的警示燈",
        "en": "It is like the warning lights on a car's dashboard"
      },
      {
        "key": "apc",
        "zh": "兩者都屬於先進製程控制（APC）",
        "en": "Both are part of advanced process control (APC)"
      },
      {
        "key": "hide",
        "zh": "自動補償會把問題藏起來",
        "en": "Automatic compensation can hide problems"
      },
      {
        "key": "measurements",
        "zh": "量測結果",
        "en": "Measurements"
      },
      {
        "key": "nearTarget",
        "zh": "一直維持在目標附近",
        "en": "Keeps the measurements near the target"
      },
      {
        "key": "looksNormal",
        "zh": "看起來一切正常",
        "en": "and everything looks normal"
      },
      {
        "key": "burst",
        "zh": "補不回來時，問題才一次爆發",
        "en": "The problem surfaces all at once"
      },
      {
        "key": "adjustments",
        "zh": "調整量",
        "en": "Adjustments"
      },
      {
        "key": "doseA",
        "zh": "例如曝光能量",
        "en": "whether the exposure dose"
      },
      {
        "key": "doseB",
        "zh": "是不是被越調越多",
        "en": "keeps being pushed further and further"
      },
      {
        "key": "worse",
        "zh": "機台可能正在持續惡化",
        "en": "The tool may be steadily getting worse"
      },
      {
        "key": "runsOut",
        "zh": "調整量用盡",
        "en": "The adjustment range runs out"
      },
      {
        "key": "watch1",
        "zh": "除了看量測結果，也要監控",
        "en": "Besides the measurements, also watch the size of the"
      },
      {
        "key": "watch2",
        "zh": "「調整量」本身",
        "en": "adjustments themselves"
      }
    ]
  },
  {
    "chapterId": "ch17",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "常見控制失效與各自的永久對策",
    "captionEn": "The classic control failures and the countermeasure for each.",
    "root": {
      "zh": "常見控制失效",
      "en": "Classic control failures"
    },
    "branches": [
      {
        "zh": "過度干預調機",
        "en": "Over-control tampering",
        "leafZh": "交由自動控制器微調",
        "leafEn": "Delegate trim to automatic control"
      },
      {
        "zh": "量測假值污染回饋迴路",
        "en": "Bad metrology poisons feedback",
        "leafZh": "回饋迴路前端設防呆閘門",
        "leafEn": "Gate the feedback loop's inputs"
      },
      {
        "zh": "保養後 FDC 基準漂移",
        "en": "Post-PM FDC baseline shift",
        "leafZh": "保養驗證後重設基準",
        "leafEn": "Re-center baseline after PM"
      }
    ]
  },
  {
    "chapterId": "ch17",
    "headingZh": "SPC 判異規則、Cpk 與 APC 四大支柱條例總覽",
    "headingEn": "SPC Rules, Cpk & APC 4-Pillar Clauses",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "SPC 判異、製程能力與 APC 四大支柱三大條例對照",
    "captionEn": "SPC rules, process capability and the four APC pillars side by side.",
    "columns": [
      {
        "titleZh": "SPC 判異規則",
        "titleEn": "SPC out-of-control rules",
        "items": [
          {
            "keyZh": "界限",
            "keyEn": "Limits",
            "zh": "管制界限不是規格界限",
            "en": "Control limits are not spec limits"
          },
          {
            "keyZh": "目的",
            "keyEn": "Purpose",
            "zh": "超規前先抓非隨機偏移",
            "en": "Catch non-random drift before out-of-spec"
          },
          {
            "keyZh": "攔截",
            "keyEn": "Interlock",
            "zh": "觸發即自動扣留批與腔體",
            "en": "Any rule hit auto-holds lot and chamber"
          }
        ]
      },
      {
        "titleZh": "製程能力 Cp／Cpk",
        "titleEn": "Process capability Cp vs. Cpk",
        "items": [
          {
            "keyZh": "定義",
            "keyEn": "Definition",
            "zh": "Cp 看潛在、Cpk 計入偏移",
            "en": "Cp is potential; Cpk accounts for centering"
          },
          {
            "keyZh": "門檻",
            "keyEn": "Threshold",
            "zh": "四標準差為量產最低門檻",
            "en": "Four sigma is the minimum production baseline"
          },
          {
            "keyZh": "要求",
            "keyEn": "Mandate",
            "zh": "車用與多晶粒堆疊要求更高 Cpk",
            "en": "Automotive, multi-die stacks require higher Cpk"
          }
        ]
      },
      {
        "titleZh": "APC 四大支柱",
        "titleEn": "Four pillars of APC",
        "items": [
          {
            "keyZh": "批次間控制",
            "keyEn": "Run-to-run",
            "zh": "逐批自動微調配方",
            "en": "Trims recipes lot by lot"
          },
          {
            "keyZh": "FDC",
            "keyEn": "FDC",
            "zh": "加工中即抓電弧等異常",
            "en": "Catches plasma arcing mid-wafer"
          },
          {
            "keyZh": "VM",
            "keyEn": "VM",
            "zh": "以感測數據預測每片晶圓",
            "en": "Predicts every wafer from FDC traces"
          },
          {
            "keyZh": "PdM",
            "keyEn": "PdM",
            "zh": "預測性維護",
            "en": "Predictive maintenance"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch17",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三大控制定律各自帶來的製程穩定效果",
    "captionEn": "What each of the three control laws does for fab stability.",
    "root": {
      "zh": "SPC／APC 控制定律",
      "en": "SPC and APC control laws"
    },
    "branches": [
      {
        "zh": "休哈特管制界限與 Cpk",
        "en": "Shewhart limits and Cpk",
        "leafZh": "區分管制線與規格線",
        "leafEn": "Separates control limits from spec limits"
      },
      {
        "zh": "EWMA 批次間回饋控制",
        "en": "EWMA run-to-run feedback",
        "leafZh": "隨耗材磨耗逐批微調配方",
        "leafEn": "Trims recipes lot by lot as pads, liners age"
      },
      {
        "zh": "多變量 FDC 與 VM",
        "en": "Multivariate FDC and VM",
        "leafZh": "毫秒攔截微弧並預測每片晶圓",
        "leafEn": "Catches micro-arcing; predicts every wafer"
      }
    ]
  },
  {
    "chapterId": "ch17",
    "headingZh": "製程能力：Cpk",
    "headingEn": "Process capability: Cpk",
    "type": "pictorial",
    "draw": "cpkParking",
    "sourcedNumbers": true,
    "sourceZh": "1.33 出自本段正文；停車格與車寬只是比喻，三格下方的 Cpk 長條只比較高低，不代表數值。",
    "sourceEn": "1.33 comes from this section. The parking space and the car are an analogy; the Cpk bars under the three spaces only compare high and low.",
    "captionZh": "用停車理解 Cpk：車越窄、停得越置中，Cpk 越高",
    "captionEn": "Cpk as parking: a narrower, better-centered car means a higher Cpk",
    "labels": [
      {
        "key": "specSpace",
        "zh": "規格是停車格",
        "en": "The specifications are the parking space"
      },
      {
        "key": "carWidth",
        "zh": "製程的變化範圍是車子的寬度",
        "en": "The spread of the process is the width of the car"
      },
      {
        "key": "cpk",
        "zh": "Cpk",
        "en": "Cpk"
      },
      {
        "key": "narrow",
        "zh": "車子越窄、停得越置中",
        "en": "The narrower the car and the more centered it is"
      },
      {
        "key": "far",
        "zh": "離兩邊的線越遠",
        "en": "the farther it is from the lines on both sides"
      },
      {
        "key": "higher",
        "zh": "Cpk 就越高",
        "en": "and the higher the Cpk"
      },
      {
        "key": "shift",
        "zh": "就算製程稍微偏移，也不容易超出規格",
        "en": "Even if the process shifts a little, it is unlikely to go out of spec"
      },
      {
        "key": "value",
        "zh": "1.33",
        "en": "1.33"
      },
      {
        "key": "req",
        "zh": "業界常見的要求是 Cpk 至少 1.33",
        "en": "A common industry requirement is a Cpk of at least 1.33"
      },
      {
        "key": "stricter",
        "zh": "車用等要求更高的產品",
        "en": "Products with stricter requirements"
      },
      {
        "key": "auto",
        "zh": "標準會更嚴格",
        "en": "such as automotive chips, have even higher standards"
      }
    ]
  },
  {
    "chapterId": "ch18",
    "headingZh": "異常一定會發生",
    "headingEn": "Abnormalities will happen",
    "type": "flow",
    "captionZh": "異常處理的基本順序：從發現異常到防止再發",
    "captionEn": "The basic order for handling an abnormality, step by step.",
    "steps": [
      {
        "zh": "發現異常",
        "en": "Detect",
        "icon": "risk"
      },
      {
        "zh": "擋住影響",
        "en": "Contain",
        "icon": "stop"
      },
      {
        "zh": "找出範圍",
        "en": "Find the scope",
        "icon": "search"
      },
      {
        "zh": "判定處置",
        "en": "Disposition",
        "icon": "selectivity"
      },
      {
        "zh": "找出根本原因",
        "en": "Find the root cause",
        "icon": "why"
      },
      {
        "zh": "防止再發",
        "en": "Prevent recurrence",
        "icon": "shield-check"
      }
    ]
  },
  {
    "chapterId": "ch18",
    "headingZh": "Hold：先擋下來",
    "headingEn": "Hold: stop it first",
    "type": "compare",
    "captionZh": "Hold 先擋下晶圓，預約 Hold 到指定步驟才擋下",
    "captionEn": "A hold stops suspect wafers; a future hold stops them at a specified step.",
    "columns": [
      {
        "titleZh": "Hold",
        "titleEn": "Hold",
        "items": [
          {
            "zh": "擋下可能受影響的晶圓",
            "en": "Stops the wafers that may be affected"
          },
          {
            "zh": "暫停生產",
            "en": "Production pauses"
          },
          {
            "zh": "問題機台也停用",
            "en": "The problem tool is taken out of service"
          }
        ]
      },
      {
        "titleZh": "預約 Hold",
        "titleEn": "Future hold",
        "items": [
          {
            "zh": "晶圓先繼續生產",
            "en": "Wafers keep moving"
          },
          {
            "zh": "到指定步驟自動擋下",
            "en": "Stopped automatically at a specified step"
          },
          {
            "zh": "例如等下一站量測結果",
            "en": "e.g. to wait for next-step measurements"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch18",
    "headingZh": "找出影響範圍",
    "headingEn": "Finding the scope",
    "type": "pictorial",
    "draw": "suspectScope",
    "captionZh": "可疑範圍從最後一次確認正常的時間點開始算",
    "captionEn": "The suspect scope starts from the last time the tool was confirmed normal",
    "labels": [
      {
        "key": "lastGood",
        "zh": "最後一次確認正常的時間點",
        "en": "The last time the tool was confirmed to be normal"
      },
      {
        "key": "found",
        "zh": "今天下午被發現異常",
        "en": "Found to be abnormal this afternoon"
      },
      {
        "key": "earlier",
        "zh": "異常可能早在被發現之前就開始了",
        "en": "The problem may have started long before anyone noticed it"
      },
      {
        "key": "monitor",
        "zh": "控片量測合格",
        "en": "A monitor wafer passed"
      },
      {
        "key": "missA",
        "zh": "只擋發現當下的晶圓",
        "en": "Holding only the wafers found at the moment of detection"
      },
      {
        "key": "missB",
        "zh": "會漏掉更早受影響的晶圓",
        "en": "misses the ones affected earlier"
      },
      {
        "key": "after",
        "zh": "從那之後經過這台機台的所有晶圓",
        "en": "Every wafer that went through the tool after that point"
      },
      {
        "key": "suspect",
        "zh": "都列入可疑範圍",
        "en": "is treated as suspect"
      },
      {
        "key": "frequent",
        "zh": "檢查越頻繁，可疑的範圍就越小",
        "en": "The more often they are checked, the smaller the suspect scope"
      },
      {
        "key": "history",
        "zh": "工廠系統記錄的履歷",
        "en": "The history recorded by the factory systems"
      },
      {
        "key": "which",
        "zh": "有哪些晶圓經過這台機台、這個腔體",
        "en": "which wafers went through this tool, or this chamber"
      }
    ]
  },
  {
    "chapterId": "ch18",
    "headingZh": "工程變更：改變也是一種風險",
    "headingEn": "Engineering changes: change is a risk too",
    "type": "flow",
    "captionZh": "任何工程變更都要評估、驗證並通過審核才能上線",
    "captionEn": "Every engineering change is assessed, verified and approved before production.",
    "steps": [
      {
        "zh": "評估風險",
        "en": "Assess the risk",
        "noteZh": "電性、良率和可靠度",
        "noteEn": "Electrical behavior, yield and reliability",
        "icon": "rate"
      },
      {
        "zh": "用實驗批驗證",
        "en": "Verify with experimental lots",
        "icon": "batch"
      },
      {
        "zh": "必要時做可靠度測試",
        "en": "Run reliability tests when needed",
        "icon": "thermometer"
      },
      {
        "zh": "通過審核才正式上線",
        "en": "Production only after approval",
        "noteZh": "重大變更須事先通知客戶",
        "noteEn": "Major changes: notify customers in advance",
        "icon": "check"
      }
    ]
  },
  {
    "chapterId": "ch18",
    "headingZh": "OCAP 防堵、MRB／PAT、8D 與 PCN 條例總覽",
    "headingEn": "OCAP, MRB/PAT, 8D & PCN Governance Clauses",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "異常與變更管理四大條例各自的核心準則",
    "captionEn": "The four excursion and change clauses and the core rule of each.",
    "root": {
      "zh": "異常與變更管理條例",
      "en": "Excursion and change clauses",
      "noteZh": "不放過受損晶圓、不擅改配方",
      "noteEn": "No defect escapes, no unauthorized changes"
    },
    "branches": [
      {
        "zh": "OCAP 與章魚防堵",
        "en": "OCAP and octopus containment",
        "leafZh": "先止血防堵，再分析原因",
        "leafEn": "Contain first, debug second"
      },
      {
        "zh": "MRB 物料審查",
        "en": "Material review board (MRB)",
        "leafZh": "四種處置；PAT 剔除離群晶粒",
        "leafEn": "Four dispositions; PAT scraps outlier dies"
      },
      {
        "zh": "八步法根因改善",
        "en": "Eight-discipline root cause",
        "leafZh": "再教育不算對策，須自動互鎖",
        "leafEn": "Retraining is not a fix; interlocks required"
      },
      {
        "zh": "ECN／PCN 變更管理",
        "en": "ECN/PCN change control",
        "leafZh": "重大變更須提前通知客戶",
        "leafEn": "Major changes need advance customer notice"
      }
    ]
  },
  {
    "chapterId": "ch18",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三大統計定律在異常防堵與零缺陷篩選中的作用",
    "captionEn": "How three statistical laws drive containment and zero-defect screening.",
    "root": {
      "zh": "防堵與篩選統計定律",
      "en": "Containment and screening laws"
    },
    "branches": [
      {
        "zh": "機台共性超幾何檢定",
        "en": "Hypergeometric tool commonality",
        "leafZh": "鎖定問題腔體並追回姊妹批",
        "leafEn": "Inhibits the chamber, recalls sister lots"
      },
      {
        "zh": "穩健四分位距動態 PAT",
        "en": "Robust IQR dynamic PAT",
        "leafZh": "剔除偏離同晶圓群體的晶粒",
        "leafEn": "Scraps dies abnormal within their own wafer"
      },
      {
        "zh": "空間鄰近篩選與 SBL",
        "en": "Spatial neighborhood PAT and SBL",
        "leafZh": "攔截叢集缺陷旁的半傷晶粒",
        "leafEn": "Catches walking-wounded dies near clusters"
      }
    ]
  },
  {
    "chapterId": "ch18",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三類異常防堵與變更失效及對應對策",
    "captionEn": "Three containment and change-control failures and their countermeasures.",
    "root": {
      "zh": "異常防堵與變更三大失效",
      "en": "Containment and change failures"
    },
    "branches": [
      {
        "zh": "姊妹批漏網出貨",
        "en": "Sister lots escape containment",
        "leafZh": "章魚防堵，自最後正常點追鎖",
        "leafEn": "Octopus hold back to the last known good"
      },
      {
        "zh": "邊際離群晶粒流出",
        "en": "Marginal maverick die escape",
        "leafZh": "動態 PAT 與 GDBN 剔除",
        "leafEn": "Dynamic PAT and GDBN ink-out"
      },
      {
        "zh": "配方變更引發下游良率崩跌",
        "en": "ECN crashes downstream yield",
        "leafZh": "重大變更須三批全流程驗證",
        "leafEn": "Major changes need three full-flow qual lots"
      }
    ]
  },
  {
    "chapterId": "ch18",
    "headingZh": "判定：放行、重工或報廢",
    "headingEn": "Disposition: release, rework or scrap",
    "type": "pictorial",
    "draw": "dispositions",
    "captionZh": "四種處置，以及影響較大或不確定時召開的 MRB",
    "captionEn": "Four dispositions, and the MRB that meets when the impact is large or uncertain",
    "labels": [
      {
        "key": "release",
        "zh": "放行（Release）",
        "en": "Release"
      },
      {
        "key": "releaseMeans",
        "zh": "確認沒有影響，繼續生產",
        "en": "No impact confirmed; production continues"
      },
      {
        "key": "releaseWhen",
        "zh": "異常不影響產品品質",
        "en": "The abnormality does not affect product quality"
      },
      {
        "key": "rework",
        "zh": "重工（Rework）",
        "en": "Rework"
      },
      {
        "key": "reworkMeans",
        "zh": "去除部分結果，重新做一次",
        "en": "Remove part of the result and do it again"
      },
      {
        "key": "reworkWhen",
        "zh": "可以重做的步驟，主要是微影",
        "en": "Steps that can be redone, mainly lithography"
      },
      {
        "key": "scrap",
        "zh": "報廢（Scrap）",
        "en": "Scrap"
      },
      {
        "key": "scrapMeans",
        "zh": "晶圓不再繼續生產",
        "en": "The wafers are taken out of production"
      },
      {
        "key": "scrapWhen",
        "zh": "損壞無法挽回，或繼續做的風險太高",
        "en": "The damage cannot be undone, or continuing is too risky"
      },
      {
        "key": "cond",
        "zh": "有條件放行",
        "en": "Conditional release"
      },
      {
        "key": "condMeans",
        "zh": "繼續生產，但加強後續檢查或特別標記",
        "en": "Production continues with extra checks later or special marking"
      },
      {
        "key": "condWhen",
        "zh": "影響還不確定，需要更多數據",
        "en": "The impact is still uncertain and more data is needed"
      },
      {
        "key": "mrb",
        "zh": "MRB",
        "en": "MRB"
      },
      {
        "key": "mrbWhen",
        "zh": "影響較大或不確定的情況",
        "en": "When the impact is large or uncertain"
      },
      {
        "key": "mrbMeets",
        "zh": "會召開物料審查會議",
        "en": "a material review board (MRB) meets, and"
      },
      {
        "key": "mrbWho",
        "zh": "由製程、整合、品保等部門共同決定",
        "en": "the process, integration, quality and other departments decide together"
      },
      {
        "key": "mrbCustomer",
        "zh": "必要時也會通知客戶",
        "en": "The customer is notified when necessary"
      },
      {
        "key": "after",
        "zh": "決定處置之後，還要找出根本原因",
        "en": "After the disposition, the root cause must still be found"
      },
      {
        "key": "fix",
        "zh": "執行改善對策",
        "en": "corrective actions put in place"
      },
      {
        "key": "confirm",
        "zh": "並確認同樣的問題不會再發生",
        "en": "and it must be confirmed that the same problem will not happen again"
      }
    ]
  },
  {
    "chapterId": "ch19",
    "headingZh": "兩種晶圓測試",
    "headingEn": "Two kinds of wafer test",
    "type": "compare",
    "captionZh": "WAT 與 CP 兩種晶圓測試的對象與目的對照",
    "captionEn": "WAT and CP side by side: what each wafer test measures and why.",
    "columns": [
      {
        "titleZh": "WAT",
        "titleEn": "WAT",
        "items": [
          {
            "zh": "切割道上的測試結構",
            "en": "Test structures in the scribe lines",
            "keyZh": "測什麼",
            "keyEn": "What it tests"
          },
          {
            "zh": "確認製程是否正常",
            "en": "Confirms the process was normal",
            "keyZh": "目的",
            "keyEn": "Purpose"
          },
          {
            "zh": "檢查製程做得對不對",
            "en": "Checks: was the process done right",
            "keyZh": "簡單來說",
            "keyEn": "Put simply"
          }
        ],
        "icon": "tester"
      },
      {
        "titleZh": "CP",
        "titleEn": "CP",
        "items": [
          {
            "zh": "每一顆晶粒的功能",
            "en": "The function of every die",
            "keyZh": "測什麼",
            "keyEn": "What it tests"
          },
          {
            "zh": "找出哪些晶粒是好的",
            "en": "Finds out which dies are good",
            "keyZh": "目的",
            "keyEn": "Purpose"
          },
          {
            "zh": "檢查每顆晶片能不能用",
            "en": "Checks: does each chip work",
            "keyZh": "簡單來說",
            "keyEn": "Put simply"
          }
        ],
        "icon": "probe-card"
      }
    ]
  },
  {
    "chapterId": "ch19",
    "headingZh": "晶圓圖交給封裝",
    "headingEn": "Handing the wafer map to packaging",
    "type": "flow",
    "captionZh": "CP 後晶圓圖交到封裝廠挑出好晶粒的流程",
    "captionEn": "How the wafer map travels from CP to packaging, where good dies are picked.",
    "steps": [
      {
        "zh": "CP 完成",
        "en": "CP completed"
      },
      {
        "zh": "晶圓圖隨晶圓送出",
        "en": "Wafer map travels with wafer",
        "noteZh": "以電子資料送到封裝廠",
        "noteEn": "As electronic data, to the packaging house"
      },
      {
        "zh": "核對晶圓編號",
        "en": "Check the wafer ID",
        "noteZh": "確認資料與實體是同一片",
        "noteEn": "Data and physical wafer are the same"
      },
      {
        "zh": "以記號確認方向",
        "en": "Confirm orientation by marks",
        "noteZh": "圖上位置對應正確晶粒",
        "noteEn": "Each map position matches the right die"
      },
      {
        "zh": "只挑合格晶粒",
        "en": "Pick only good dies",
        "noteZh": "已知良好晶粒 KGD",
        "noteEn": "Known good dies (KGD)"
      }
    ]
  },
  {
    "chapterId": "ch19",
    "headingZh": "常見異常",
    "headingEn": "Common problems",
    "type": "branch",
    "captionZh": "晶圓測試常見異常與各自造成的結果",
    "captionEn": "Common wafer test problems and the result each one leads to.",
    "root": {
      "zh": "晶圓測試常見異常",
      "en": "Common wafer test problems"
    },
    "branches": [
      {
        "zh": "接觸不良",
        "en": "Poor contact",
        "leafZh": "好的晶粒被誤判為壞",
        "leafEn": "Good dies judged bad"
      },
      {
        "zh": "針痕過深",
        "en": "Probe marks too deep",
        "leafZh": "焊墊受損影響打線",
        "leafEn": "Damaged pads affect wire bonding"
      },
      {
        "zh": "測試機台之間有差異",
        "en": "Tester-to-tester differences",
        "leafZh": "良率因機台而異",
        "leafEn": "Yield depends on the tester"
      },
      {
        "zh": "晶圓圖錯置",
        "en": "Wafer map mismatch",
        "leafZh": "封裝時挑錯晶粒",
        "leafEn": "Wrong dies picked in packaging"
      }
    ]
  },
  {
    "chapterId": "ch19",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "晶圓針測的異常來源及其造成的後果",
    "captionEn": "The probe test failure modes and what each one causes.",
    "root": {
      "zh": "晶圓針測異常",
      "en": "Probe test failure modes"
    },
    "branches": [
      {
        "zh": "探針接觸電阻過高",
        "en": "High probe contact resistance",
        "leafZh": "好晶被誤判為壞晶",
        "leafEn": "Healthy dies falsely rejected"
      },
      {
        "zh": "扎針過深",
        "en": "Excessive overdrive",
        "leafZh": "打裂底層低介電質",
        "leafEn": "Cracks sub-pad low-k dielectric"
      },
      {
        "zh": "多顆晶粒同時測試",
        "en": "Multi-site parallel testing",
        "leafZh": "電源塌陷與時序誤殺",
        "leafEn": "Power droop, at-speed false fails"
      }
    ]
  },
  {
    "chapterId": "ch19",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "晶圓測試三大定量定律與對應的工程意義",
    "captionEn": "Three wafer-test laws and what each means for probing and KGD.",
    "root": {
      "zh": "晶圓測試與 KGD 定律",
      "en": "Wafer test and KGD laws"
    },
    "branches": [
      {
        "zh": "開爾文四線量測",
        "en": "Kelvin four-wire measurement",
        "leafZh": "消除線纜與探針接觸電阻",
        "leafEn": "Cancels cable and probe contact resistance"
      },
      {
        "zh": "Holm 接觸與過壓行程",
        "en": "Holm contact and probe overdrive",
        "leafZh": "太小假性開路，太大打裂低介電質",
        "leafEn": "Low OD false-fails; high OD cracks low-k"
      },
      {
        "zh": "測試逃逸率與 KGD",
        "en": "Test escape and KGD break-even",
        "leafZh": "提高覆蓋率，免整組模組報廢",
        "leafEn": "Higher coverage avoids scrapping the module"
      }
    ]
  },
  {
    "chapterId": "ch19",
    "headingZh": "測試也是成本",
    "headingEn": "Testing costs money too",
    "type": "pictorial",
    "draw": "watVsCp",
    "captionZh": "WAT 全部合格，CP 良率卻可能很差：兩者要一起看",
    "captionEn": "WAT can pass while CP yield is poor, so look at both together",
    "labels": [
      {
        "key": "passAll",
        "zh": "WAT 全部合格",
        "en": "Passes every WAT item"
      },
      {
        "key": "cpPoor",
        "zh": "CP 良率卻很差",
        "en": "Its CP yield is poor"
      },
      {
        "key": "fewKeys",
        "zh": "只量切割道上少數幾個位置的測試鍵",
        "en": "Measures test keys at only a few places in the scribe lines"
      },
      {
        "key": "random",
        "zh": "隨機分佈的缺陷就不一定會被測到",
        "en": "Randomly scattered defects, for example, may not be caught at all"
      },
      {
        "key": "health",
        "zh": "把 WAT 當成製程的健康檢查",
        "en": "a health check of the process"
      },
      {
        "key": "exam",
        "zh": "把 CP 當成產品的實際體檢",
        "en": "the real physical exam of the product"
      },
      {
        "key": "wat",
        "zh": "WAT",
        "en": "WAT"
      },
      {
        "key": "cp",
        "zh": "CP",
        "en": "CP"
      },
      {
        "key": "both",
        "zh": "兩者一起看",
        "en": "Look at both together"
      }
    ]
  },
  {
    "chapterId": "ch19",
    "headingZh": "晶圓測試、探針卡與 3D KGD 條例總覽",
    "headingEn": "Wafer Test, Probe Card & 3D KGD Clauses",
    "type": "pictorial",
    "draw": "probeCards",
    "foldSection": true,
    "sourcedNumbers": true,
    "sourceZh": "節距與針數出自本段表格；探針疏密只是定性示意。懸臂式的節距是細節距產品的適用值。",
    "sourceEn": "Pitches and pin counts come from the table in this section; probe density is qualitative only. The cantilever pitch is the value for fine-pitch versions.",
    "captionZh": "五種晶圓測試與探針卡做法（探針疏密只是定性示意）",
    "captionEn": "Five wafer-test and probe-card approaches (probe density is qualitative only)",
    "labels": [
      {
        "key": "watCard",
        "zh": "晶圓允收測試探針卡",
        "en": "WAT Parametric Probe Card"
      },
      {
        "key": "kelvin",
        "zh": "Kelvin 四線量測",
        "en": "Kelvin 4-wire"
      },
      {
        "key": "pcm",
        "zh": "切割道 PCM 測試鍵",
        "en": "Scribe-line PCM test keys"
      },
      {
        "key": "pinsW",
        "zh": "24–48 pins",
        "en": "24–48 pins"
      },
      {
        "key": "cantilever",
        "zh": "懸臂式探針卡",
        "en": "Cantilever Probe Card"
      },
      {
        "key": "scrub",
        "zh": "針跡（Scrub Mark）較大",
        "en": "Larger scrub marks"
      },
      {
        "key": "wbPad",
        "zh": "傳統打線焊墊（Wire-Bond Pad）",
        "en": "Perimeter wire-bond pads"
      },
      {
        "key": "pitchC",
        "zh": "用於周邊排列焊墊，細節距產品適用節距 ≥ 30–40 µm",
        "en": "Fine-pitch versions reach ≥ 30–40 µm pitch"
      },
      {
        "key": "pinsC",
        "zh": "數百至數千針",
        "en": "Hundreds to a few thousand pins"
      },
      {
        "key": "vertName",
        "zh": "垂直式與彈簧針探針卡",
        "en": "Vertical"
      },
      {
        "key": "pogo",
        "zh": "彈簧針探針卡",
        "en": "Pogo-Pin Probe Card"
      },
      {
        "key": "buckled",
        "zh": "垂直微屈曲探針",
        "en": "Vertically buckled needles"
      },
      {
        "key": "flipBump",
        "zh": "C4 覆晶凸塊",
        "en": "C4 solder bumps"
      },
      {
        "key": "pitchV",
        "zh": "70–150 µm",
        "en": "70–150 µm"
      },
      {
        "key": "pinsV",
        "zh": "5,000–30,000+ pins",
        "en": "5,000–30,000+ pins"
      },
      {
        "key": "memsName",
        "zh": "MEMS 微機電薄膜探針卡",
        "en": "Fine-Pitch MEMS Probe Card"
      },
      {
        "key": "memsNeedle",
        "zh": "微影電鑄微機電探針",
        "en": "MEMS micro-needles"
      },
      {
        "key": "ubump",
        "zh": "微凸塊針測",
        "en": "Micro-bump KGD probing"
      },
      {
        "key": "pitchM",
        "zh": "20–55 µm",
        "en": "20–55 µm"
      },
      {
        "key": "pinsM",
        "zh": "30,000–100,000+ pins",
        "en": "30,000–100,000+ pins"
      },
      {
        "key": "preBond",
        "zh": "混合鍵合前 KGD 測試",
        "en": "Pre-Bond KGD"
      },
      {
        "key": "bondPad",
        "zh": "< 10 µm 混合鍵合銅墊",
        "en": "< 10 µm Cu hybrid bond pads"
      },
      {
        "key": "noProbe",
        "zh": "直接下針刮傷",
        "en": "Direct needle probing"
      },
      {
        "key": "prohibited",
        "zh": "禁止",
        "en": "strictly prohibited"
      },
      {
        "key": "sacrificial",
        "zh": "專用犧牲測試墊",
        "en": "Dedicated sacrificial probe pads"
      },
      {
        "key": "bist",
        "zh": "內建自我測試",
        "en": "MBIST / LBIST"
      }
    ]
  },
  {
    "chapterId": "ch20",
    "headingZh": "常見的封裝形式",
    "headingEn": "Common package types",
    "type": "compare",
    "captionZh": "常見封裝形式的特色與常見用途對照",
    "captionEn": "Common package types compared by their features and typical uses.",
    "columns": [
      {
        "titleZh": "導線架封裝",
        "titleEn": "Lead frame packages",
        "items": [
          {
            "zh": "成本低",
            "en": "Low cost"
          },
          {
            "zh": "接腳在四周或底部周圍",
            "en": "Leads around the sides or bottom edge"
          },
          {
            "zh": "微控制器、電源管理晶片",
            "en": "Microcontrollers, power management chips",
            "keyZh": "常見用途",
            "keyEn": "Typical use"
          }
        ]
      },
      {
        "titleZh": "BGA 球柵陣列",
        "titleEn": "BGA (ball grid array)",
        "items": [
          {
            "zh": "底部整面布滿錫球",
            "en": "Whole bottom covered with solder balls"
          },
          {
            "zh": "接點多",
            "en": "Many contacts"
          },
          {
            "zh": "處理器、繪圖晶片",
            "en": "Processors, graphics chips",
            "keyZh": "常見用途",
            "keyEn": "Typical use"
          }
        ]
      },
      {
        "titleZh": "晶圓級封裝",
        "titleEn": "Wafer-level packaging",
        "items": [
          {
            "zh": "直接在晶圓上完成封裝",
            "en": "Packaged directly on the wafer"
          },
          {
            "zh": "尺寸接近晶粒本身",
            "en": "About the size of the die"
          },
          {
            "zh": "手機中的小型晶片",
            "en": "Small chips in phones",
            "keyZh": "常見用途",
            "keyEn": "Typical use"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch20",
    "headingZh": "常見異常",
    "headingEn": "Common problems",
    "type": "pictorial",
    "draw": "packageDefects",
    "captionZh": "五種封裝異常發生在哪裡，以及各自的結果",
    "captionEn": "Where five packaging problems occur, and what each leads to",
    "labels": [
      {
        "key": "chipping",
        "zh": "崩邊",
        "en": "Chipping"
      },
      {
        "key": "chipRes",
        "zh": "晶粒邊緣破損，可能延伸成裂痕",
        "en": "Damaged die edges that may grow into cracks"
      },
      {
        "key": "nonStick",
        "zh": "打線黏不上",
        "en": "Non-stick on wire bond"
      },
      {
        "key": "open",
        "zh": "斷路",
        "en": "Open circuits"
      },
      {
        "key": "sweep",
        "zh": "沖線",
        "en": "Wire sweep"
      },
      {
        "key": "short",
        "zh": "相鄰導線短路",
        "en": "Shorts between neighboring wires"
      },
      {
        "key": "sweepCause",
        "zh": "封膠時的流動把細線推彎",
        "en": "Mold compound flow pushes the thin wires sideways"
      },
      {
        "key": "delam",
        "zh": "脫層",
        "en": "Delamination"
      },
      {
        "key": "reliab",
        "zh": "可靠度問題",
        "en": "Reliability problems"
      },
      {
        "key": "voids",
        "zh": "空洞",
        "en": "Voids"
      },
      {
        "key": "voidRes",
        "zh": "散熱變差、可靠度問題",
        "en": "Poorer heat dissipation, reliability problems"
      },
      {
        "key": "voidCause",
        "zh": "封膠或底部填充沒有填滿",
        "en": "Mold compound or underfill does not fill completely"
      }
    ]
  },
  {
    "chapterId": "ch20",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "傳統封裝的失效來源及其造成的結果",
    "captionEn": "Traditional packaging failure modes and what each one leads to.",
    "root": {
      "zh": "傳統封裝失效",
      "en": "Traditional packaging failures"
    },
    "branches": [
      {
        "zh": "邊角凸塊剪應變",
        "en": "Corner bump shear strain",
        "leafZh": "錫球斷裂、低介電層撕裂",
        "leafEn": "Cracked solder balls, torn low-k"
      },
      {
        "zh": "封裝吸濕後過迴焊爐",
        "en": "Absorbed moisture, then reflow",
        "leafZh": "爆米花裂開與脫層",
        "leafEn": "Popcorning and delamination"
      },
      {
        "zh": "打線金屬互相擴散",
        "en": "Wire-bond metal interdiffusion",
        "leafZh": "柯肯達爾空洞、焊球脫落",
        "leafEn": "Kirkendall voids, ball lift-off"
      }
    ]
  },
  {
    "chapterId": "ch20",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "封裝三大熱機械與流體定律各自推動的設計改變",
    "captionEn": "How three thermomechanical and fluid laws reshaped package design.",
    "root": {
      "zh": "封裝熱機械與流體定律",
      "en": "Thermomechanical and fluid laws"
    },
    "branches": [
      {
        "zh": "焊球熱疲勞定律",
        "en": "Coffin-Manson solder fatigue",
        "leafZh": "邊角焊球先裂，填膠延長壽命",
        "leafEn": "Corner bumps fail first; underfill adds life"
      },
      {
        "zh": "毛細底部填充流動",
        "en": "Washburn capillary underfill flow",
        "leafZh": "間隙縮小改採先貼膜或模壓底填",
        "leafEn": "Narrow gaps shift to TC-NCF or MR-MUF"
      },
      {
        "zh": "封裝熱阻網路",
        "en": "Package thermal resistance network",
        "leafZh": "改採裸晶直露加銦片或均溫板",
        "leafEn": "Exposed die with indium TIM or vapor chamber"
      }
    ]
  },
  {
    "chapterId": "ch20",
    "headingZh": "傳統封裝的流程",
    "headingEn": "The traditional packaging flow",
    "type": "pictorial",
    "draw": "packagingFlow",
    "captionZh": "傳統封裝九步：從晶背研磨到檢查",
    "captionEn": "Traditional packaging in nine steps, from backgrinding to inspection",
    "labels": [
      {
        "key": "backgrind",
        "zh": "晶背研磨",
        "en": "Backgrind"
      },
      {
        "key": "backgrindHow",
        "zh": "從背面把晶圓磨薄",
        "en": "Grind the wafer thinner from the back"
      },
      {
        "key": "dicing",
        "zh": "切割",
        "en": "Dicing"
      },
      {
        "key": "dicingHow",
        "zh": "沿著切割道用鑽石刀或雷射切開",
        "en": "Cut along the scribe lines with a diamond blade or a laser"
      },
      {
        "key": "stealth",
        "zh": "隱形切割",
        "en": "Stealth dicing"
      },
      {
        "key": "stealthHow",
        "zh": "用雷射在晶圓內部打出一層改質層",
        "en": "Uses a laser to create a modified layer inside the wafer"
      },
      {
        "key": "stealthSplit",
        "zh": "再把膠膜撐開，讓晶粒沿著改質層分開",
        "en": "Then stretches the tape so the dies separate along that layer"
      },
      {
        "key": "attach",
        "zh": "黏晶",
        "en": "Die attach"
      },
      {
        "key": "attachHow",
        "zh": "依照晶圓圖，只挑出好的晶粒",
        "en": "Following the wafer map, pick only the good dies"
      },
      {
        "key": "wire",
        "zh": "打線",
        "en": "Wire bonding"
      },
      {
        "key": "wireHow",
        "zh": "把晶粒的焊墊連到導線架或基板上",
        "en": "Connect the pads on the die to the lead frame or substrate"
      },
      {
        "key": "mold",
        "zh": "封膠",
        "en": "Molding"
      },
      {
        "key": "moldHow",
        "zh": "用環氧樹脂等材料把晶粒和導線包起來",
        "en": "Encapsulate the die and wires in a material such as epoxy resin"
      },
      {
        "key": "mark",
        "zh": "印字",
        "en": "Marking"
      },
      {
        "key": "markHow",
        "zh": "用雷射在表面印上產品型號和批號",
        "en": "Laser-mark the product name and lot number on the surface"
      },
      {
        "key": "ball",
        "zh": "植球或電鍍接腳",
        "en": "Ball mount or lead plating"
      },
      {
        "key": "ballHow",
        "zh": "在底部植上錫球，或在接腳表面電鍍",
        "en": "Attach solder balls to the bottom, or plate the surface of the leads"
      },
      {
        "key": "sing",
        "zh": "切單",
        "en": "Singulation"
      },
      {
        "key": "singHow",
        "zh": "把一整條基板上的封裝切成一顆顆獨立的晶片",
        "en": "Cut the packages on a strip of substrate into individual chips"
      },
      {
        "key": "inspect",
        "zh": "檢查",
        "en": "Inspection"
      }
    ]
  },
  {
    "chapterId": "ch20",
    "headingZh": "覆晶：把晶片翻過來",
    "headingEn": "Flip chip: turning the die over",
    "type": "pictorial",
    "draw": "flipChipBumps",
    "sourcedNumbers": true,
    "sourceZh": "間距範圍出自本段表格，間距尺為對數刻度；凸塊大小只示意排序。微凸塊下方畫的是中介層或下層晶粒，不是有機基板。",
    "sourceEn": "Pitch ranges come from the table in this section, on a log scale. Bump sizes only show the order. Below the micro-bump is an interposer or a lower die, not an organic substrate.",
    "captionZh": "打線與覆晶的連接路徑，以及三種覆晶凸塊與接點間距",
    "captionEn": "Wire bonding vs. flip chip, and three flip-chip bump types with their pitch",
    "labels": [
      {
        "key": "wb",
        "zh": "打線",
        "en": "Wire bonding"
      },
      {
        "key": "fc",
        "zh": "覆晶",
        "en": "Flip chip"
      },
      {
        "key": "shorter",
        "zh": "覆晶的連接路徑更短",
        "en": "Flip chip has shorter connections"
      },
      {
        "key": "area",
        "zh": "可以在晶粒整個表面布滿接點",
        "en": "Can place contacts across the whole surface of the die"
      },
      {
        "key": "faceDown",
        "zh": "正面朝下",
        "en": "Face down"
      },
      {
        "key": "bumps",
        "zh": "凸塊",
        "en": "Bumps"
      },
      {
        "key": "bumpsDo",
        "zh": "連接晶粒和基板",
        "en": "connect the die to the substrate"
      },
      {
        "key": "balls",
        "zh": "錫球",
        "en": "Solder balls"
      },
      {
        "key": "ballsDo",
        "zh": "連接封裝和電路板",
        "en": "connect the package to the circuit board"
      },
      {
        "key": "underfill",
        "zh": "底部填充",
        "en": "Underfill"
      },
      {
        "key": "substrate",
        "zh": "基板",
        "en": "Substrate"
      },
      {
        "key": "board",
        "zh": "電路板",
        "en": "Circuit board"
      },
      {
        "key": "c4",
        "zh": "可控塌陷晶片連接錫球（C4 Bump）",
        "en": "Controlled Collapse Chip Connection (C4 Bump)"
      },
      {
        "key": "selfAlign",
        "zh": "表面張力自對準",
        "en": "Surface tension self-alignment"
      },
      {
        "key": "pillar",
        "zh": "銅柱凸塊（Copper Pillar Bump）",
        "en": "Copper Pillar Bump (Cu Pillar)"
      },
      {
        "key": "noCollapse",
        "zh": "回焊時銅柱不塌陷",
        "en": "Non-collapsing vertical copper columns"
      },
      {
        "key": "cap",
        "zh": "焊帽（Solder Cap）",
        "en": "SnAg Solder Cap"
      },
      {
        "key": "micro",
        "zh": "微凸塊與熱壓接合（Micro-Bump & TCB）",
        "en": "Micro-Bump & Thermo-Compression Bonding"
      },
      {
        "key": "tcb",
        "zh": "熱壓鍵合頭精準控制高度與平整度",
        "en": "Bonded under precise heat and pressure (TCB)"
      },
      {
        "key": "cu",
        "zh": "Cu",
        "en": "Cu"
      },
      {
        "key": "ni",
        "zh": "Ni",
        "en": "Ni"
      },
      {
        "key": "snag",
        "zh": "SnAg",
        "en": "SnAg"
      },
      {
        "key": "pitch",
        "zh": "接點間距（Pitch）",
        "en": "Contact Pitch"
      },
      {
        "key": "r1",
        "zh": "130 µm ～ 200 µm",
        "en": "130 µm – 200 µm"
      },
      {
        "key": "r2",
        "zh": "40 µm ～ 100 µm",
        "en": "40 µm – 100 µm"
      },
      {
        "key": "r3",
        "zh": "10 µm ～ 55 µm",
        "en": "10 µm – 55 µm"
      },
      {
        "key": "t10",
        "zh": "10 µm",
        "en": "10 µm"
      },
      {
        "key": "t100",
        "zh": "100 µm",
        "en": "100 µm"
      },
      {
        "key": "barC4",
        "zh": "C4",
        "en": "C4"
      },
      {
        "key": "barPillar",
        "zh": "銅柱凸塊",
        "en": "Cu Pillar"
      },
      {
        "key": "barMicro",
        "zh": "微凸塊",
        "en": "Micro-Bump"
      }
    ]
  },
  {
    "chapterId": "ch20",
    "headingZh": "傳統與晶圓級封裝六大條例總覽",
    "headingEn": "Legacy & Wafer-Level Packaging Clauses",
    "type": "pictorial",
    "draw": "packageFamilies",
    "foldSection": true,
    "sourcedNumbers": true,
    "sourceZh": "1:1 出自本段表格（扇入型晶圓級封裝的面積與晶粒相同）；六格的大小與比例都只是示意。",
    "sourceEn": "1:1 comes from the table in this section (a fan-in WLCSP is the same size as the die). Sizes and proportions in all six cells are schematic.",
    "captionZh": "六大封裝家族的側剖面對照",
    "captionEn": "Six package families in side view",
    "labels": [
      {
        "key": "leaded",
        "zh": "導線架有引腳封裝",
        "en": "Leaded Leadframe Packages"
      },
      {
        "key": "gullWing",
        "zh": "鷗翼形（Gull-Wing）",
        "en": "Gull-wing"
      },
      {
        "key": "throughHole",
        "zh": "穿孔插針（Through-Hole）",
        "en": "Through-hole pins"
      },
      {
        "key": "leadless",
        "zh": "導線架無引腳封裝",
        "en": "Leadless Leadframe Packages"
      },
      {
        "key": "thermalPad",
        "zh": "大型散熱墊（Exposed Thermal Pad）",
        "en": "Exposed bottom thermal pad"
      },
      {
        "key": "lands",
        "zh": "底部直接裸露金屬焊墊",
        "en": "Flush perimeter lands"
      },
      {
        "key": "array",
        "zh": "球柵與觸點陣列基板封裝",
        "en": "Substrate Array Packages"
      },
      {
        "key": "bga",
        "zh": "球柵陣列（BGA）",
        "en": "Bottom solder ball arrays (BGA)"
      },
      {
        "key": "lga",
        "zh": "平面金屬觸點陣列（LGA）",
        "en": "Land pads (LGA)"
      },
      {
        "key": "wlcsp",
        "zh": "扇入型晶圓級晶片尺寸封裝",
        "en": "Fan-In Wafer-Level Packaging"
      },
      {
        "key": "rdl",
        "zh": "RDL 重佈線",
        "en": "RDL"
      },
      {
        "key": "ubm",
        "zh": "UBM 凸塊下金屬層",
        "en": "UBM"
      },
      {
        "key": "oneToOne",
        "zh": "封裝面積與裸晶粒完全 1:1 相等",
        "en": "A true 1:1 die-sized package"
      },
      {
        "key": "stacking",
        "zh": "打線與封裝體 3D 垂直堆疊",
        "en": "3D Multi-Die Wire-Bond & Package Stacking"
      },
      {
        "key": "daf",
        "zh": "間隔膠膜（Spacer / Die-Attach Film）",
        "en": "Die-Attach Film (DAF) spacers"
      },
      {
        "key": "pop",
        "zh": "PoP（Package-on-Package）",
        "en": "PoP (Package-on-Package)"
      },
      {
        "key": "sip",
        "zh": "系統級封裝與基板內埋",
        "en": "System-in-Package & Embedded Die"
      },
      {
        "key": "shield",
        "zh": "共形電磁屏蔽",
        "en": "Conformal EMI shielding"
      },
      {
        "key": "antenna",
        "zh": "天線（AiP）",
        "en": "Antennas-in-package (AiP)"
      },
      {
        "key": "bothSides",
        "zh": "正反兩面",
        "en": "Both sides"
      }
    ]
  },
  {
    "chapterId": "ch21",
    "headingZh": "扇出型封裝",
    "headingEn": "Fan-out packaging",
    "type": "flow",
    "captionZh": "扇出型封裝不用傳統基板的製作順序",
    "captionEn": "How fan-out packaging is built without a traditional substrate, step by step.",
    "steps": [
      {
        "zh": "晶粒排列於承載板",
        "en": "Arrange dies on a carrier"
      },
      {
        "zh": "封膠包成重組晶圓",
        "en": "Mold into a reconstituted wafer"
      },
      {
        "zh": "做出重佈線層",
        "en": "Build the redistribution layer",
        "noteZh": "RDL",
        "noteEn": "RDL"
      },
      {
        "zh": "接點往外扇出",
        "en": "Contacts fan out from the die",
        "noteZh": "擴展到比晶粒更大的面積",
        "noteEn": "To an area larger than the die"
      }
    ]
  },
  {
    "chapterId": "ch21",
    "headingZh": "3D 堆疊：往上疊",
    "headingEn": "3D stacking: building upward",
    "type": "pictorial",
    "draw": "bondingPitch",
    "foldTables": [
      1
    ],
    "sourcedNumbers": true,
    "sourceZh": "間距出自本段兩張表格，橫軸為對數刻度；虛線空心色條是通孔節距（TGV、層間通孔），不是晶片之間的接點；箭頭端表示範圍沒有下限或上限。各條例左側是結構示意，3F 是電晶體層級（虛線框），比例與其他列不同。覆晶凸塊的細分範圍見第 20 章。",
    "sourceEn": "Pitches come from the two tables in this section, on a log scale. Hollow dashed bars are via pitches (TGV and inter-tier vias), not die-to-die contacts. Arrow ends mark open-ended ranges. The small drawings show each structure; 3F (dashed frame) is at transistor level, on a different scale. Chapter 20 breaks down flip-chip bump pitches.",
    "captionZh": "接點間距的對數尺，以及四種鍵合方向與粒度",
    "captionEn": "Contact pitch on a log scale, and four bonding orientations and granularities",
    "labels": [
      {
        "key": "denser",
        "zh": "接點間距越小，同樣面積內的連接點越多",
        "en": "The smaller the contact pitch, the more connections fit in the same area"
      },
      {
        "key": "t100nm",
        "zh": "100 nm",
        "en": "100 nm"
      },
      {
        "key": "t1",
        "zh": "1 µm",
        "en": "1 µm"
      },
      {
        "key": "t10",
        "zh": "10 µm",
        "en": "10 µm"
      },
      {
        "key": "t100",
        "zh": "100 µm",
        "en": "100 µm"
      },
      {
        "key": "fc",
        "zh": "覆晶凸塊",
        "en": "Flip-chip bumps"
      },
      {
        "key": "fcPitch",
        "zh": "一百微米以上",
        "en": "A hundred micrometers or more"
      },
      {
        "key": "mb",
        "zh": "微凸塊",
        "en": "Micro bumps"
      },
      {
        "key": "mbPitch",
        "zh": "數十微米",
        "en": "Tens of micrometers"
      },
      {
        "key": "hb",
        "zh": "混合鍵合",
        "en": "Hybrid bonding"
      },
      {
        "key": "hbPitch",
        "zh": "十微米以下",
        "en": "Below ten micrometers"
      },
      {
        "key": "c3a",
        "zh": "條例 3A：無凸塊銅對銅混合鍵合",
        "en": "Clause 3A: Bumpless Cu-Cu Hybrid Bonding"
      },
      {
        "key": "c3b",
        "zh": "條例 3B：微凸塊與 TSV 垂直 3D 堆疊",
        "en": "Clause 3B: Micro-Bump & TSV Vertical 3D IC"
      },
      {
        "key": "c3c",
        "zh": "條例 3C：3D 記憶體垂直堆疊",
        "en": "Clause 3C: 3D Memory Vertical Stacking"
      },
      {
        "key": "c3d",
        "zh": "條例 3D：3.5D 複合異質整合",
        "en": "Clause 3D: 3.5D Hybrid Integration (3D + 2.5D)"
      },
      {
        "key": "c3e",
        "zh": "條例 3E：3D 光電共封裝與玻璃核心基板",
        "en": "Clause 3E: 3D Co-Packaged Optics (CPO) & Glass Core Substrate (TGV)"
      },
      {
        "key": "c3f",
        "zh": "條例 3F：單石 3D 積體電路與雙面 3D 晶圓整合",
        "en": "Clause 3F: Monolithic 3D IC & Wafer-Backside 3D Integration"
      },
      {
        "key": "v3a",
        "zh": "< 10 µm 至 < 1 µm",
        "en": "< 10 µm down to < 1 µm"
      },
      {
        "key": "v3b",
        "zh": "10 µm ～ 55 µm",
        "en": "10 µm – 55 µm"
      },
      {
        "key": "v3c1",
        "zh": "15 µm ～ 55 µm（微凸塊）",
        "en": "15 µm – 55 µm (Micro-bump)"
      },
      {
        "key": "v3c2",
        "zh": "< 10 µm（混合鍵合 HBM4+）",
        "en": "< 10 µm (Hybrid Bonding HBM4+)"
      },
      {
        "key": "v3d1",
        "zh": "垂直 < 1～9 µm（3D）",
        "en": "Vertical < 1–9 µm (3D)"
      },
      {
        "key": "v3d2",
        "zh": "水平 25～40 µm（2.5D）",
        "en": "Lateral 25–40 µm (2.5D)"
      },
      {
        "key": "v3e1",
        "zh": "垂直 < 10 µm Cu-Cu 鍵合",
        "en": "Vertical < 10 µm Cu-Cu Bonding"
      },
      {
        "key": "v3e2",
        "zh": "TGV 玻璃通孔（Pitch 40～100 µm）",
        "en": "Through-Glass Vias (TGV, 40–100 µm pitch)"
      },
      {
        "key": "v3f",
        "zh": "< 100 nm 層間通孔",
        "en": "< 100 nm Monolithic Inter-tier Vias"
      },
      {
        "key": "f2f",
        "zh": "面對面鍵合（F2F，Face-to-Face）",
        "en": "Face-to-Face (F2F) Bonding"
      },
      {
        "key": "shortest",
        "zh": "訊號路徑最短",
        "en": "Shortest possible signal path"
      },
      {
        "key": "f2b",
        "zh": "面對背鍵合（F2B，Face-to-Back）",
        "en": "Face-to-Back (F2B)"
      },
      {
        "key": "viaTsv",
        "zh": "下層晶粒內部的 TSV",
        "en": "TSVs inside the lower die"
      },
      {
        "key": "w2w",
        "zh": "晶圓對晶圓鍵合（W2W，Wafer-to-Wafer）",
        "en": "Wafer-to-Wafer (W2W / WoW) Bonding"
      },
      {
        "key": "w2wHow",
        "zh": "直接整片對準與混合鍵合",
        "en": "Aligned and hybrid-bonded at once"
      },
      {
        "key": "throughput",
        "zh": "吞吐量極高",
        "en": "Highest throughput"
      },
      {
        "key": "same",
        "zh": "上下晶粒面積必須完全相同",
        "en": "Requires identical die sizes"
      },
      {
        "key": "noScreen",
        "zh": "無法預先剔除壞晶粒",
        "en": "Cannot pre-screen bad dies"
      },
      {
        "key": "d2w",
        "zh": "晶粒對晶圓鍵合",
        "en": "Die-to-Wafer (D2W / CoW)"
      },
      {
        "key": "kgd",
        "zh": "已知良好晶粒（KGD）",
        "en": "Known Good Dies (KGD)"
      },
      {
        "key": "carrier",
        "zh": "逐顆或以載板群組方式貼合",
        "en": "Individually or via collective carrier transfer"
      },
      {
        "key": "mix",
        "zh": "不同尺寸、不同製程節點",
        "en": "Different die sizes and process nodes"
      },
      {
        "key": "keepYield",
        "zh": "只把好晶粒疊上去以保全總良率",
        "en": "Avoiding compound yield loss from bad dies"
      }
    ]
  },
  {
    "chapterId": "ch21",
    "headingZh": "小晶片（Chiplet）",
    "headingEn": "Chiplets",
    "foldTables": true,
    "type": "compare",
    "captionZh": "小晶片之間互連介面的主要類別對照",
    "captionEn": "The main kinds of chiplet interconnect compared side by side.",
    "columns": [
      {
        "titleZh": "UCIe",
        "titleEn": "UCIe",
        "items": [
          {
            "zh": "開放通用標準",
            "en": "Industry-wide open specification"
          },
          {
            "zh": "定義物理層與協定層",
            "en": "Defines the physical and protocol layers"
          },
          {
            "zh": "跨生態系小晶片隨插即用",
            "en": "Plug-and-play multi-vendor chiplets"
          }
        ]
      },
      {
        "titleZh": "AIB 與 BoW",
        "titleEn": "AIB and BoW",
        "items": [
          {
            "zh": "平行訊號、時脈轉發架構",
            "en": "Parallel clock-forwarded interfaces"
          },
          {
            "zh": "高頻寬、低延遲互連",
            "en": "High bandwidth, low latency links"
          }
        ]
      },
      {
        "titleZh": "專屬高速架構互連",
        "titleEn": "Dedicated high-speed fabric links",
        "items": [
          {
            "zh": "記憶體一致性互連",
            "en": "Cache-coherent die-to-die fabric"
          },
          {
            "zh": "針對 AI 超算最佳化",
            "en": "Tailored for AI supercomputing"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch21",
    "headingZh": "先進封裝的挑戰",
    "headingEn": "Challenges of advanced packaging",
    "type": "branch",
    "captionZh": "先進封裝面臨的主要挑戰與說明",
    "captionEn": "The main challenges of advanced packaging and what each one means.",
    "root": {
      "zh": "先進封裝的挑戰",
      "en": "Challenges of advanced packaging",
      "icon": "chiplets"
    },
    "branches": [
      {
        "zh": "散熱",
        "en": "Heat",
        "leafZh": "熱更難散出去",
        "leafEn": "Heat is harder to get out",
        "icon": "heat"
      },
      {
        "zh": "翹曲",
        "en": "Warpage",
        "leafZh": "封裝越大越容易彎曲",
        "leafEn": "Larger packages bend more",
        "icon": "stress"
      },
      {
        "zh": "測試",
        "en": "Test",
        "leafZh": "中間晶片很難單獨測試",
        "leafEn": "Hard to test middle chips alone",
        "icon": "probe-card"
      },
      {
        "zh": "良率相乘",
        "en": "Multiplied yield",
        "leafZh": "任一失敗，整個封裝受影響",
        "leafEn": "Any failure affects the package",
        "icon": "defect"
      }
    ]
  },
  {
    "chapterId": "ch21",
    "headingZh": "2.5D：並排放在中介層上",
    "headingEn": "2.5D: side by side on an interposer",
    "type": "pictorial",
    "draw": "interposerTypes",
    "foldTables": true,
    "captionZh": "四種 2.5D 中介層結構：變化在中介層或基板",
    "captionEn": "Four 2.5D interposer structures: the interposer or the substrate changes",
    "labels": [
      {
        "key": "sideBySide",
        "zh": "把好幾顆晶片並排放在一片中介層上",
        "en": "Places several chips side by side on an interposer"
      },
      {
        "key": "notAlways",
        "zh": "中介層不一定是矽",
        "en": "An interposer is not always silicon"
      },
      {
        "key": "basis",
        "zh": "中介層材質與互連結構",
        "en": "Interposer material and bridge topology"
      },
      {
        "key": "processor",
        "zh": "處理器",
        "en": "Processor"
      },
      {
        "key": "hbm",
        "zh": "HBM",
        "en": "HBM"
      },
      {
        "key": "pkgSub",
        "zh": "封裝基板",
        "en": "Package substrate"
      },
      {
        "key": "interposer",
        "zh": "中介層",
        "en": "Interposer"
      },
      {
        "key": "siName",
        "zh": "矽中介層",
        "en": "Monolithic Silicon Interposer"
      },
      {
        "key": "siFull",
        "zh": "整片單晶矽中介層",
        "en": "Full silicon interposer"
      },
      {
        "key": "stitch",
        "zh": "曝光拼接（Stitching）",
        "en": "Reticle-stitched"
      },
      {
        "key": "larger",
        "zh": "做得比單次曝光的範圍還大",
        "en": "made larger than a single exposure field"
      },
      {
        "key": "tsv",
        "zh": "TSV 矽穿孔",
        "en": "TSVs"
      },
      {
        "key": "rdlName",
        "zh": "有機重佈線中介層",
        "en": "Organic RDL Interposer"
      },
      {
        "key": "rdlWith",
        "zh": "以多層有機高分子重佈線層（RDL）",
        "en": "multi-layer organic polymer redistribution layers"
      },
      {
        "key": "rdlReplace",
        "zh": "取代整片矽中介層",
        "en": "Replaces the silicon interposer with"
      },
      {
        "key": "bridgeName",
        "zh": "局部矽橋與重組中介層",
        "en": "Local Silicon Bridge & Reconstituted Interposer"
      },
      {
        "key": "bridgeWhere",
        "zh": "僅在相鄰晶片邊緣下方",
        "en": "only where die-to-die high-density links are needed"
      },
      {
        "key": "bridgeEmbed",
        "zh": "嵌入微型矽橋",
        "en": "Embeds tiny silicon bridges"
      },
      {
        "key": "hybridName",
        "zh": "複合載板",
        "en": "Hybrid-Substrate"
      },
      {
        "key": "abf",
        "zh": "ABF 載板",
        "en": "ABF upper tier"
      },
      {
        "key": "hdi",
        "zh": "HDI 基板",
        "en": "HDI lower tier"
      },
      {
        "key": "hybridStack",
        "zh": "將精細線距 ABF 載板與高密度 HDI 基板上下疊合",
        "en": "A fine-pitch ABF upper tier and an HDI lower tier"
      }
    ]
  },
  {
    "chapterId": "ch21",
    "headingZh": "2.5D、扇出型與 3D／3.5D 封裝條例總覽",
    "headingEn": "2.5D, Fan-Out & 3D/3.5D Packaging Clauses",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "2.5D 與 3D 封裝三大挑戰的瓶頸與對策",
    "captionEn": "Three 2.5D/3D packaging challenges: bottleneck and countermeasure.",
    "columns": [
      {
        "titleZh": "跨層熱阻與熱點耦合",
        "titleEn": "Cross-tier thermal coupling",
        "items": [
          {
            "keyZh": "瓶頸",
            "keyEn": "Bottleneck",
            "zh": "底層熱量被上方晶片阻擋",
            "en": "Bottom-die heat trapped under upper tiers"
          },
          {
            "keyZh": "對策",
            "keyEn": "Countermeasure",
            "zh": "結構矽、混合鍵合與液冷",
            "en": "Structural Si, hybrid bonding, liquid cooling"
          }
        ]
      },
      {
        "titleZh": "大面積翹曲與晶片封裝交互",
        "titleEn": "Large-area warpage and CPI",
        "items": [
          {
            "keyZh": "瓶頸",
            "keyEn": "Bottleneck",
            "zh": "矽、銅與載板熱膨脹落差",
            "en": "CTE mismatch of silicon, copper, substrate"
          },
          {
            "keyZh": "對策",
            "keyEn": "Countermeasure",
            "zh": "補強環、模塑底填與玻璃基板",
            "en": "Stiffener rings, MR-MUF, glass core substrates"
          }
        ]
      },
      {
        "titleZh": "堆疊內部可測性與修復",
        "titleEn": "Stack test access and repair",
        "items": [
          {
            "keyZh": "瓶頸",
            "keyEn": "Bottleneck",
            "zh": "疊合後探針碰不到中間層",
            "en": "Middle dies cannot be probed once bonded"
          },
          {
            "keyZh": "對策",
            "keyEn": "Countermeasure",
            "zh": "堆疊測試標準與備援通道修復",
            "en": "Stack DfT standard and redundant lane repair"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch21",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三大異質整合定律各自推動的封裝演進",
    "captionEn": "How three heterogeneous-integration laws drive packaging changes.",
    "root": {
      "zh": "異質整合定量定律",
      "en": "Heterogeneous integration laws"
    },
    "branches": [
      {
        "zh": "節距平方反比密度律",
        "en": "Inverse-square pitch density law",
        "leafZh": "節距縮小，互連密度暴增",
        "leafEn": "Finer pitch multiplies I/O density"
      },
      {
        "zh": "立體堆疊熱阻耦合",
        "en": "Stacked-die thermal coupling",
        "leafZh": "高功耗層移近頂部散熱",
        "leafEn": "Put high-power logic nearest the heatsink"
      },
      {
        "zh": "Stoney 翹曲縮放律",
        "en": "Stoney warpage scaling law",
        "leafZh": "大封裝改用玻璃核心基板",
        "leafEn": "Large packages move to glass core substrates"
      }
    ]
  },
  {
    "chapterId": "ch21",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "先進封裝三大核心異常與對應的防呆對策",
    "captionEn": "Three critical advanced-packaging failures and their countermeasures.",
    "root": {
      "zh": "先進封裝三大核心異常",
      "en": "Three critical packaging failures"
    },
    "branches": [
      {
        "zh": "哭笑臉翹曲反轉",
        "en": "Smile/cry warpage inversion",
        "leafZh": "補強環並導入玻璃核心基板",
        "leafEn": "Stiffener rings and glass core substrates"
      },
      {
        "zh": "混合鍵合微粒空洞",
        "en": "Hybrid-bond particle blister voids",
        "leafZh": "貼合前於機台內刷洗並活化",
        "leafEn": "In-situ scrub and activation before contact"
      },
      {
        "zh": "垂直熱耦合降頻",
        "en": "Vertical thermal cross-heating",
        "leafZh": "結構矽、導熱矽穿孔與銦片導熱",
        "leafEn": "Structural silicon, thermal TSVs, indium TIM"
      }
    ]
  },
  {
    "chapterId": "ch21",
    "headingZh": "為什麼需要先進封裝",
    "headingEn": "Why advanced packaging is needed",
    "type": "pictorial",
    "draw": "splitChip",
    "sourcedNumbers": true,
    "sourceZh": "26 mm × 33 mm 出自本段正文，虛線框依這個長寬比畫；缺陷點、晶粒與小晶片的大小都只是示意。",
    "sourceEn": "26 mm × 33 mm comes from this section, and the dashed box uses that aspect ratio. Defects and the sizes of the die and chiplets are schematic.",
    "captionZh": "大晶粒受曝光範圍與良率所限，拆成小晶片再整合",
    "captionEn": "Exposure field and yield limit large dies, so they are split into chiplets",
    "labels": [
      {
        "key": "reticle",
        "zh": "曝光機一次能曝光的範圍",
        "en": "The area a scanner can expose at once"
      },
      {
        "key": "size",
        "zh": "大約 26 mm × 33 mm",
        "en": "About 26 mm × 33 mm"
      },
      {
        "key": "bigHit",
        "zh": "晶粒越大，越容易被缺陷打中",
        "en": "The bigger the die, the more likely it is to be hit by a defect"
      },
      {
        "key": "split",
        "zh": "把一顆大晶片拆成幾顆小晶片",
        "en": "Splitting one large chip into several smaller chips"
      },
      {
        "key": "compute",
        "zh": "運算核心",
        "en": "Compute cores"
      },
      {
        "key": "advanced",
        "zh": "最先進的製程",
        "en": "The most advanced process"
      },
      {
        "key": "analog",
        "zh": "類比和輸入輸出電路",
        "en": "Analog and I/O circuits"
      },
      {
        "key": "mature",
        "zh": "成熟製程",
        "en": "Mature processes"
      },
      {
        "key": "memory",
        "zh": "記憶體",
        "en": "Memory"
      },
      {
        "key": "dedicated",
        "zh": "專門的製程",
        "en": "Its own dedicated process"
      },
      {
        "key": "data",
        "zh": "在處理器和記憶體之間搬運大量資料",
        "en": "Move huge amounts of data between processors and memory"
      },
      {
        "key": "best",
        "zh": "各自用最適合的製程製造",
        "en": "Making each with the process that suits it best"
      },
      {
        "key": "tight",
        "zh": "再用先進封裝把它們緊密地整合在一起",
        "en": "Integrating them tightly with advanced packaging"
      },
      {
        "key": "single",
        "zh": "讓它們像一顆晶片一樣運作",
        "en": "So they work like a single chip"
      }
    ]
  },
  {
    "chapterId": "ch22",
    "headingZh": "封裝後為什麼還要再測",
    "headingEn": "Why test again after packaging",
    "type": "flow",
    "captionZh": "封裝後仍要對每顆晶片做最終測試才出貨",
    "captionEn": "Why every chip goes through final test after packaging and before shipment.",
    "steps": [
      {
        "zh": "晶圓測試挑出好晶粒",
        "en": "Wafer test picks good dies"
      },
      {
        "zh": "封裝",
        "en": "Packaging",
        "noteZh": "可能造成打線不良、封裝應力",
        "noteEn": "Can cause bad wire bonds or package stress"
      },
      {
        "zh": "最終測試",
        "en": "Final test",
        "noteZh": "封裝後才測得到的特性",
        "noteEn": "Characteristics only testable once packaged"
      },
      {
        "zh": "出貨",
        "en": "Shipment"
      }
    ]
  },
  {
    "chapterId": "ch22",
    "headingZh": "最終測試",
    "headingEn": "Final test",
    "type": "pictorial",
    "draw": "finalTest",
    "captionZh": "最終測試：放進測試座、高低溫測試、分級，部分產品再做 SLT",
    "captionEn": "Final test: sockets, hot and cold tests, binning, and SLT for some products",
    "labels": [
      {
        "key": "packaged",
        "zh": "封裝好的晶片",
        "en": "Packaged chips"
      },
      {
        "key": "handler",
        "zh": "分類機（Handler）",
        "en": "Handler"
      },
      {
        "key": "socket",
        "zh": "測試座",
        "en": "Test sockets"
      },
      {
        "key": "temps",
        "zh": "在高溫和低溫下分別測試",
        "en": "Testing at both high and low temperatures"
      },
      {
        "key": "tester",
        "zh": "測試機",
        "en": "Tester"
      },
      {
        "key": "tests",
        "zh": "功能和電性測試",
        "en": "Functional and electrical tests"
      },
      {
        "key": "binning",
        "zh": "分級",
        "en": "Binning"
      },
      {
        "key": "speedPower",
        "zh": "依照實際能跑的速度或功耗",
        "en": "According to the speed or power they actually achieve"
      },
      {
        "key": "sold",
        "zh": "可能因此以不同的規格出售",
        "en": "May be sold under different specifications"
      },
      {
        "key": "slt",
        "zh": "系統級測試（SLT）",
        "en": "System-level test (SLT)"
      },
      {
        "key": "sltDo",
        "zh": "執行實際的軟體來測試",
        "en": "Runs actual software"
      }
    ]
  },
  {
    "chapterId": "ch22",
    "headingZh": "可靠度：能用多久",
    "headingEn": "Reliability: how long it lasts",
    "type": "flow",
    "captionZh": "加速可靠度測試如何推算正常使用壽命",
    "captionEn": "How accelerated reliability tests estimate lifetime under normal use.",
    "steps": [
      {
        "zh": "加速測試",
        "en": "Accelerated testing",
        "noteZh": "更高的溫度、電壓或濕度",
        "noteEn": "Higher temperature, voltage or humidity"
      },
      {
        "zh": "失效更快發生",
        "en": "Failures happen sooner"
      },
      {
        "zh": "以模型推算壽命",
        "en": "Estimate lifetime with models",
        "noteZh": "正常使用下的壽命",
        "noteEn": "Lifetime under normal use"
      }
    ]
  },
  {
    "chapterId": "ch22",
    "headingZh": "晶片怎麼老化",
    "headingEn": "How chips age",
    "type": "pictorial",
    "draw": "agingMechanisms",
    "captionZh": "四種老化機制發生在哪裡",
    "captionEn": "Where the four aging mechanisms happen",
    "labels": [
      {
        "key": "stress",
        "zh": "電流、電壓和溫度",
        "en": "Current, voltage and temperature"
      },
      {
        "key": "em",
        "zh": "電遷移（EM）",
        "en": "Electromigration (EM)"
      },
      {
        "key": "emDo1",
        "zh": "電流長期推動金屬原子",
        "en": "Long-term current pushes metal atoms along"
      },
      {
        "key": "emDo2",
        "zh": "導線形成空洞而斷線",
        "en": "forming voids that break the wire"
      },
      {
        "key": "tddb",
        "zh": "介電層崩潰（TDDB）",
        "en": "Time-dependent dielectric breakdown (TDDB)"
      },
      {
        "key": "tddbDo1",
        "zh": "絕緣層長期承受電場",
        "en": "An insulating layer under a long-term electric field"
      },
      {
        "key": "tddbDo2",
        "zh": "最後被擊穿",
        "en": "eventually breaks down"
      },
      {
        "key": "hci",
        "zh": "熱載子效應（HCI）",
        "en": "Hot carrier injection (HCI)"
      },
      {
        "key": "hciDo1",
        "zh": "高能量的電子撞進閘極絕緣層",
        "en": "High-energy electrons get into the gate insulator"
      },
      {
        "key": "hciDo2",
        "zh": "電晶體特性慢慢改變",
        "en": "and the transistor's characteristics slowly change"
      },
      {
        "key": "bti",
        "zh": "偏壓溫度不穩定（BTI）",
        "en": "Bias temperature instability (BTI)"
      },
      {
        "key": "btiDo",
        "zh": "高溫加上電壓，讓 Vt 隨時間漂移",
        "en": "High temperature plus voltage makes Vt drift over time"
      },
      {
        "key": "electrons",
        "zh": "電子",
        "en": "Electrons"
      },
      {
        "key": "field",
        "zh": "電場",
        "en": "Electric field"
      },
      {
        "key": "vt",
        "zh": "Vt",
        "en": "Vt"
      },
      {
        "key": "time",
        "zh": "時間",
        "en": "Time"
      }
    ]
  },
  {
    "chapterId": "ch22",
    "headingZh": "JEDEC／AEC-Q100 可靠度驗證主題",
    "headingEn": "JEDEC & AEC-Q100 Qualification Topics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "五類可靠度驗證主題與各自攔截的失效模式",
    "captionEn": "Five qualification topics and the failure modes each one targets.",
    "root": {
      "zh": "可靠度驗證主題",
      "en": "Qualification topics",
      "noteZh": "教學應力例，非標準條文",
      "noteEn": "Teaching examples, not standard clauses",
      "icon": "bathtub"
    },
    "branches": [
      {
        "zh": "高溫工作壽命與預燒",
        "en": "High-temp operating life, burn-in",
        "leafZh": "逼出早夭期閘極氧化層針孔",
        "leafEn": "Screens infant-mortality gate oxide pinholes",
        "icon": "thermometer"
      },
      {
        "zh": "溫度循環與熱衝擊",
        "en": "Temp. cycling and thermal shock",
        "leafZh": "焊球與微凸塊熱疲勞裂紋",
        "leafEn": "Solder and micro-bump fatigue cracks",
        "icon": "cycle"
      },
      {
        "zh": "高加速溫濕度應力",
        "en": "Accelerated temp & humidity stress",
        "leafZh": "焊墊腐蝕與樹枝狀結晶短路",
        "leafEn": "Pad corrosion and dendritic shorts",
        "icon": "drop"
      },
      {
        "zh": "濕氣敏感度與迴焊爆米花",
        "en": "Moisture sensitivity and reflow",
        "leafZh": "氣爆脫層與翹曲風險",
        "leafEn": "Popcorning and warpage risk",
        "icon": "package"
      },
      {
        "zh": "晶圓級本質可靠度",
        "en": "Wafer-level intrinsic reliability",
        "leafZh": "電晶體漂移與互連空洞風險",
        "leafEn": "Transistor drift and voiding risk",
        "icon": "wafer"
      }
    ]
  },
  {
    "chapterId": "ch22",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三條可靠度定律與各自的用途或限制",
    "captionEn": "Three reliability laws and the use or limit of each.",
    "root": {
      "zh": "可靠度加速壽命定律",
      "en": "Reliability and acceleration laws",
      "noteZh": "參數須依材料與資料擬合",
      "noteEn": "Parameters must be fitted to data"
    },
    "branches": [
      {
        "zh": "韋伯分佈與浴缸曲線",
        "en": "Weibull and the bathtub curve",
        "leafZh": "形狀參數區分早夭、隨機、磨損",
        "leafEn": "Shape parameter: infant, random, wear-out"
      },
      {
        "zh": "溫濕加速與 FIT 上限",
        "en": "Arrhenius-Peck AF and FIT bound",
        "leafZh": "各試驗不可共用未驗證加速因子",
        "leafEn": "Tests can't share unvalidated AFs"
      },
      {
        "zh": "電晶體本質老化定律",
        "en": "Transistor aging laws (BTI, TDDB)",
        "leafZh": "PDK 老化模型預留時序裕度",
        "leafEn": "PDK aging models for EOL timing margin"
      }
    ]
  },
  {
    "chapterId": "ch22",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "早期缺陷、老化與靜電損傷的異常與防堵對策",
    "captionEn": "Early-defect, aging and ESD failures and the countermeasure for each.",
    "root": {
      "zh": "可靠度與測試異常",
      "en": "Reliability and test failures"
    },
    "branches": [
      {
        "zh": "早夭期缺陷逃逸",
        "en": "Infant-mortality escape",
        "leafZh": "依核可計畫評估預燒與 SLT",
        "leafEn": "Evaluate burn-in and SLT per qualified plan"
      },
      {
        "zh": "老化時序違例當機",
        "en": "Aging timing-violation crash",
        "leafZh": "評估氘氣退火、老化監測與 AVS",
        "leafEn": "Evaluate deuterium anneal, monitors, AVS"
      },
      {
        "zh": "搬運靜電潛在損傷",
        "en": "Handler ESD latent damage",
        "leafZh": "接地、離子風機與 ESD 防護",
        "leafEn": "Grounding, ionizers and ESD clamps"
      }
    ]
  },
  {
    "chapterId": "ch23",
    "headingZh": "防呆：降低錯誤風險",
    "headingEn": "Interlocks: reducing error risk",
    "type": "branch",
    "captionZh": "各條防呆規則在條件不符時由系統自動擋下",
    "captionEn": "Each interlock rule automatically stops the lot when its condition is not met",
    "root": {
      "zh": "防呆規則",
      "en": "Interlock rules",
      "noteZh": "由系統自動擋下",
      "noteEn": "Enforced automatically by the system",
      "icon": "shield-check"
    },
    "branches": [
      {
        "zh": "晶圓不在這一站",
        "en": "Lot should not be at this step",
        "leafZh": "不能進站",
        "leafEn": "Cannot track in",
        "icon": "situation"
      },
      {
        "zh": "機台沒有通過驗證",
        "en": "Tool not qualified",
        "leafZh": "不能做這個產品",
        "leafEn": "Cannot run this product",
        "icon": "badge"
      },
      {
        "zh": "Recipe 版本不對",
        "en": "Wrong recipe version",
        "leafZh": "不能開始",
        "leafEn": "Processing cannot start",
        "icon": "definition"
      },
      {
        "zh": "Q-Time 超過",
        "en": "Q-time expired",
        "leafZh": "或晶圓被 Hold，不能繼續",
        "leafEn": "Or lot on hold: cannot continue",
        "icon": "clock"
      },
      {
        "zh": "接觸過銅的晶圓盒",
        "en": "Carrier that touched copper",
        "leafZh": "不能放上前段機台",
        "leafEn": "Cannot go on a front-end tool",
        "icon": "foup"
      }
    ]
  },
  {
    "chapterId": "ch23",
    "headingZh": "履歷：每一片晶圓的完整紀錄",
    "headingEn": "History: the complete record of every wafer",
    "type": "branch",
    "captionZh": "晶圓履歷在良率、機台與客戶問題上的用途",
    "captionEn": "How the wafer history is used for yield, tool and customer problems",
    "root": {
      "zh": "晶圓履歷",
      "en": "Wafer history",
      "noteZh": "整座工廠的記憶",
      "noteEn": "The memory of the whole factory"
    },
    "branches": [
      {
        "zh": "良率異常",
        "en": "Abnormal yield",
        "leafZh": "共通性分析",
        "leafEn": "Commonality analysis"
      },
      {
        "zh": "機台出問題",
        "en": "Tool problem",
        "leafZh": "找出受影響的範圍",
        "leafEn": "Find which wafers were affected"
      },
      {
        "zh": "客戶回報問題",
        "en": "Customer reports a problem",
        "leafZh": "追溯到晶圓與批次",
        "leafEn": "Trace back to wafer and lot"
      }
    ]
  },
  {
    "chapterId": "ch23",
    "headingZh": "數據與智慧製造",
    "headingEn": "Data and smart manufacturing",
    "type": "branch",
    "captionZh": "工廠數據在智慧製造中的用途",
    "captionEn": "What fab data is used for in smart manufacturing",
    "root": {
      "zh": "工廠數據",
      "en": "Fab data",
      "noteZh": "感測器、量測與測試數據",
      "noteEn": "Sensor, measurement and test data",
      "icon": "network"
    },
    "branches": [
      {
        "zh": "預測性保養",
        "en": "Predictive maintenance",
        "leafZh": "預測零件何時更換",
        "leafEn": "Predict when parts need replacing",
        "icon": "maintenance"
      },
      {
        "zh": "虛擬量測",
        "en": "Virtual metrology",
        "leafZh": "推估量測結果",
        "leafEn": "Estimate measurement results",
        "icon": "virtual-metrology"
      },
      {
        "zh": "人工智慧分析",
        "en": "AI analysis",
        "leafZh": "辨識晶圓圖型態",
        "leafEn": "Recognize wafer map patterns",
        "icon": "ai"
      },
      {
        "zh": "自動化派工",
        "en": "Automated dispatching",
        "leafZh": "決定最佳生產順序",
        "leafEn": "Decide the best production order",
        "icon": "dispatch"
      }
    ]
  },
  {
    "chapterId": "ch23",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "工廠系統異常與對應的防堵對策",
    "captionEn": "Fab-system failure modes and their containment countermeasures",
    "root": {
      "zh": "工廠系統異常",
      "en": "Fab-system failure modes"
    },
    "branches": [
      {
        "zh": "Q-Time 連鎖逾時",
        "en": "Cascade Q-Time expiration",
        "leafZh": "禁止上游清洗站進站",
        "leafEn": "Block track-in at the clean step"
      },
      {
        "zh": "天車交握逾時卡死",
        "en": "OHT handshake timeout",
        "leafZh": "繞行至鄰近空中儲位",
        "leafEn": "Detour to an adjacent OHB shelf"
      },
      {
        "zh": "帳實不符",
        "en": "Book-to-physical mismatch",
        "leafZh": "EAP 鎖死機械手臂",
        "leafEn": "EAP hard-locks the robot"
      }
    ]
  },
  {
    "chapterId": "ch23",
    "headingZh": "智慧製造 CIM 與相關 SEMI 通訊標準",
    "headingEn": "Smart Fab CIM & Related SEMI Standards",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "CIM 各系統與 SEMI 標準各自負責的工作",
    "captionEn": "Each CIM system and SEMI standard, and what it is responsible for.",
    "root": {
      "zh": "CIM 系統",
      "en": "CIM systems",
      "noteZh": "協調機台、在製品與搬運",
      "noteEn": "Coordinates tools, WIP and transport"
    },
    "branches": [
      {
        "zh": "製造執行系統（MES）",
        "en": "Manufacturing execution (MES)",
        "leafZh": "途程、進出站與晶圓履歷",
        "leafEn": "Routes, track-in/out, wafer genealogy"
      },
      {
        "zh": "EAP 與配方管理",
        "en": "EAP and recipe management",
        "leafZh": "連接機台與 MES，校驗配方",
        "leafEn": "Bridges tools and MES; verifies recipes"
      },
      {
        "zh": "SEMI 機台通訊標準",
        "en": "SEMI tool communication standards",
        "leafZh": "SECS／GEM 訊息與狀態機",
        "leafEn": "SECS/GEM messages and state machines"
      },
      {
        "zh": "即時派工與良率管理",
        "en": "Dispatching and yield management",
        "leafZh": "派工指揮搬運、良率數據關聯分析",
        "leafEn": "Dispatches transport; correlates yield data"
      }
    ]
  },
  {
    "chapterId": "ch23",
    "headingZh": "定量模型、假設與使用條件",
    "headingEn": "Quantitative Models, Assumptions & Conditions",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "三條營運定律的核心關係、假設與工程意義",
    "captionEn": "Three operations-research laws: core relation, assumptions and implication.",
    "columns": [
      {
        "titleZh": "利特爾法則與週期倍數",
        "titleEn": "Little's Law and X-Factor",
        "items": [
          {
            "keyZh": "核心關係",
            "keyEn": "Core relation",
            "zh": "WIP 等於產出乘週期時間",
            "en": "WIP = throughput × cycle time"
          },
          {
            "keyZh": "假設",
            "keyEn": "Assumes",
            "zh": "長期平均量且系統邊界一致",
            "en": "Long-run averages, consistent boundaries"
          },
          {
            "keyZh": "工程意義",
            "keyEn": "Implication",
            "zh": "產出不變時 WIP 增則週期拉長",
            "en": "More WIP, same throughput: longer cycle time"
          }
        ]
      },
      {
        "titleZh": "多機台排隊與利用率",
        "titleEn": "Multi-server queue and utilization",
        "items": [
          {
            "keyZh": "核心關係",
            "keyEn": "Core relation",
            "zh": "利用率接近滿載時等待放大",
            "en": "Waiting grows as utilization nears full"
          },
          {
            "keyZh": "假設",
            "keyEn": "Assumes",
            "zh": "到站與服務變異、同質機台",
            "en": "Arrival/service variability, homogeneous tools"
          },
          {
            "keyZh": "工程意義",
            "keyEn": "Implication",
            "zh": "降低到站變異或共用合格機台",
            "en": "Smoother arrivals or qualified tool pooling"
          }
        ]
      },
      {
        "titleZh": "OEE 教學分解",
        "titleEn": "OEE teaching decomposition",
        "items": [
          {
            "keyZh": "核心關係",
            "keyEn": "Core relation",
            "zh": "可用率×表現效率×良率",
            "en": "Availability × performance × quality"
          },
          {
            "keyZh": "假設",
            "keyEn": "Assumes",
            "zh": "時間與良品定義須一致",
            "en": "Consistent time and good-unit definitions"
          },
          {
            "keyZh": "工程意義",
            "keyEn": "Implication",
            "zh": "預先配置 FOUP 與預測性維護",
            "en": "FOUP pre-positioning, predictive maintenance"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch23",
    "headingZh": "工廠裡的主要系統",
    "headingEn": "The main systems in a fab",
    "type": "pictorial",
    "draw": "fabSystemsHub",
    "captionZh": "七大系統各管什麼：以 MES 為中心，彼此互相配合",
    "captionEn": "Seven fab systems around the MES, each with its own job, working together",
    "labels": [
      {
        "key": "mes",
        "zh": "MES（製造執行系統）",
        "en": "MES (manufacturing execution system)"
      },
      {
        "key": "mesA",
        "zh": "工廠的大腦和帳本",
        "en": "The brain and the ledger of the fab"
      },
      {
        "key": "mesD",
        "zh": "記錄每批晶圓在哪裡、下一步是什麼",
        "en": "Records where every lot is and what its next step is"
      },
      {
        "key": "mesD2",
        "zh": "控制每一次進出站",
        "en": "controls every move in and out of a step"
      },
      {
        "key": "eap",
        "zh": "機台自動化系統",
        "en": "Equipment automation"
      },
      {
        "key": "eapA",
        "zh": "機台的翻譯員",
        "en": "The tools' interpreter"
      },
      {
        "key": "eapD",
        "zh": "連接機台與 MES",
        "en": "Connects tools to the MES"
      },
      {
        "key": "eapD2",
        "zh": "下載 Recipe、啟動製程、收集數據",
        "en": "downloads recipes, starts processing and collects data"
      },
      {
        "key": "amhs",
        "zh": "物料搬運系統",
        "en": "Material handling control"
      },
      {
        "key": "amhsA",
        "zh": "物流中心",
        "en": "The logistics center"
      },
      {
        "key": "amhsD",
        "zh": "指揮天車和倉儲",
        "en": "Directs the overhead vehicles and stockers"
      },
      {
        "key": "amhsD2",
        "zh": "把晶圓盒送到正確的位置",
        "en": "to deliver carriers to the right place"
      },
      {
        "key": "disp",
        "zh": "派工系統",
        "en": "Dispatching"
      },
      {
        "key": "dispA",
        "zh": "交通號誌",
        "en": "Traffic lights"
      },
      {
        "key": "dispD",
        "zh": "決定每台機台下一批要做哪一批晶圓",
        "en": "Decides which lot each tool should run next"
      },
      {
        "key": "rms",
        "zh": "Recipe 管理系統",
        "en": "Recipe management"
      },
      {
        "key": "rmsA",
        "zh": "食譜資料庫",
        "en": "A recipe library"
      },
      {
        "key": "rmsD",
        "zh": "管理每台機台的 Recipe 和版本",
        "en": "Manages the recipes of every tool and their versions"
      },
      {
        "key": "pcs",
        "zh": "製程控制系統",
        "en": "Process control"
      },
      {
        "key": "pcsA",
        "zh": "品管員",
        "en": "The quality inspector"
      },
      {
        "key": "pcsD2",
        "zh": "監控與控制製程品質",
        "en": "monitor and control process quality"
      },
      {
        "key": "yas",
        "zh": "良率分析系統",
        "en": "Yield analysis"
      },
      {
        "key": "yasA",
        "zh": "偵探",
        "en": "The detective"
      },
      {
        "key": "yasD",
        "zh": "整合製程和測試數據，分析良率",
        "en": "Combines process and test data to analyze yield"
      },
      {
        "key": "notAll",
        "zh": "MES 不等於工廠的所有系統",
        "en": "The MES is not every system in the fab"
      }
    ]
  },
  {
    "chapterId": "ch23",
    "headingZh": "一批晶圓到站時，發生了什麼事",
    "headingEn": "What happens when a lot arrives at a tool",
    "type": "pictorial",
    "draw": "lotArrival",
    "captionZh": "一批晶圓到站的六個步驟與各步負責的系統",
    "captionEn": "Six steps when a lot arrives at a tool, and the systems in charge of each",
    "labels": [
      {
        "key": "example",
        "zh": "以一批晶圓抵達一台蝕刻機為例",
        "en": "Take a lot arriving at an etch tool as an example"
      },
      {
        "key": "amhs",
        "zh": "搬運系統",
        "en": "Material handling"
      },
      {
        "key": "eq",
        "zh": "機台",
        "en": "Tool"
      },
      {
        "key": "eap",
        "zh": "機台自動化系統",
        "en": "Equipment automation"
      },
      {
        "key": "mes",
        "zh": "MES",
        "en": "MES"
      },
      {
        "key": "fdc",
        "zh": "FDC",
        "en": "FDC"
      },
      {
        "key": "placed",
        "zh": "天車把晶圓盒放到機台的 Load Port",
        "en": "An overhead vehicle places the wafer carrier on the tool's load port"
      },
      {
        "key": "readId",
        "zh": "機台讀取晶圓盒上的編號",
        "en": "and the tool reads the ID on the carrier"
      },
      {
        "key": "q1",
        "zh": "這批晶圓現在應該在這一站嗎？",
        "en": "Should this lot be at this step now?"
      },
      {
        "key": "q2",
        "zh": "這台機台可以做這個產品嗎？",
        "en": "Is this tool qualified for this product?"
      },
      {
        "key": "q3",
        "zh": "機台狀態正常嗎？",
        "en": "Is the tool in a normal state?"
      },
      {
        "key": "q4",
        "zh": "晶圓有沒有被 Hold？",
        "en": "Is the lot on hold?"
      },
      {
        "key": "q5",
        "zh": "Q-Time 有沒有超過？",
        "en": "Has its Q-time been exceeded?"
      },
      {
        "key": "q6",
        "zh": "晶圓盒的污染等級和機台相符嗎？",
        "en": "Does the carrier's contamination class match the tool?"
      },
      {
        "key": "download",
        "zh": "系統把正確版本的 Recipe 下載到機台",
        "en": "The system downloads the correct version of the recipe to the tool"
      },
      {
        "key": "trackIn",
        "zh": "進站",
        "en": "Track-in"
      },
      {
        "key": "start",
        "zh": "機台開始加工",
        "en": "The tool starts processing"
      },
      {
        "key": "toFdc",
        "zh": "同時把感測器數據即時送給 FDC 監控",
        "en": "Sends its sensor data to FDC in real time"
      },
      {
        "key": "trackOut",
        "zh": "出站",
        "en": "Track-out"
      },
      {
        "key": "items",
        "zh": "機台、腔體、Recipe、時間",
        "en": "Tool, chamber, recipe, time"
      },
      {
        "key": "record",
        "zh": "寫入這批晶圓的履歷",
        "en": "written into the lot's history"
      },
      {
        "key": "next",
        "zh": "系統決定下一站",
        "en": "The system decides the next step"
      },
      {
        "key": "deliver",
        "zh": "搬運系統把晶圓盒送過去",
        "en": "the material handling system delivers the carrier there"
      },
      {
        "key": "stocker",
        "zh": "或先送進倉儲等待",
        "en": "or sends it to a stocker to wait"
      }
    ]
  },
  {
    "chapterId": "ch24",
    "headingZh": "DRAM 為什麼要刷新",
    "headingEn": "Why DRAM needs refresh",
    "type": "cycle",
    "captionZh": "DRAM 電容漏電與定期刷新的循環",
    "captionEn": "The DRAM cycle of capacitor leakage and regular refresh",
    "steps": [
      {
        "zh": "電容存放電荷",
        "en": "Capacitors store charge"
      },
      {
        "zh": "電容慢慢漏電",
        "en": "Capacitors slowly leak",
        "noteZh": "溫度越高漏電越快",
        "noteEn": "Faster leakage at higher temperature"
      },
      {
        "zh": "讀出每一列資料",
        "en": "Read out every row",
        "noteZh": "由記憶體控制器執行",
        "noteEn": "Done by the memory controller"
      },
      {
        "zh": "寫回補充電荷",
        "en": "Write back, replacing lost charge"
      }
    ],
    "centerZh": "定期刷新",
    "centerEn": "Regular refresh"
  },
  {
    "chapterId": "ch24",
    "headingZh": "NAND Flash 的脾氣",
    "headingEn": "The quirks of NAND flash",
    "type": "flow",
    "captionZh": "每單元位元數越多，耐用度越低、ECC 需求越高",
    "captionEn": "Why storing more bits per cell lowers endurance and needs stronger ECC",
    "steps": [
      {
        "zh": "每單元存的位元越多",
        "en": "More bits stored per cell"
      },
      {
        "zh": "要分辨的電荷狀態越多",
        "en": "More charge states to tell apart"
      },
      {
        "zh": "彼此的間隔越窄",
        "en": "Narrower gaps between them"
      },
      {
        "zh": "可抹寫次數越少",
        "en": "Cells can be erased fewer times",
        "noteZh": "需要的 ECC 也越強",
        "noteEn": "And stronger ECC is needed"
      }
    ]
  },
  {
    "chapterId": "ch24",
    "headingZh": "每一顆晶片都不一樣",
    "headingEn": "Every chip is different",
    "type": "flow",
    "captionZh": "測試時寫入熔絲的資料，讓韌體為每顆晶片設定電壓與頻率",
    "captionEn": "Fuse data written at test lets firmware set each chip's voltage and frequency",
    "steps": [
      {
        "zh": "製程變異",
        "en": "Process variation",
        "noteZh": "速度和漏電不完全相同",
        "noteEn": "Speed and leakage differ slightly",
        "icon": "random"
      },
      {
        "zh": "測試時寫入熔絲",
        "en": "Written into fuses during test",
        "noteZh": "特性或校正值",
        "noteEn": "Characteristics or calibration values",
        "icon": "fuse"
      },
      {
        "zh": "韌體開機時讀取",
        "en": "Firmware reads them at boot",
        "icon": "firmware"
      },
      {
        "zh": "設定電壓和頻率",
        "en": "Sets voltage and frequency",
        "noteZh": "每顆晶片最適合的值",
        "noteEn": "The most suitable for each chip",
        "icon": "sliders"
      }
    ]
  },
  {
    "chapterId": "ch24",
    "headingZh": "Errata 與晶片改版",
    "headingEn": "Errata and chip revisions",
    "type": "pictorial",
    "draw": "steppingLayers",
    "captionZh": "Stepping 字母與數字改版各改到哪幾層（依公司而定）",
    "captionEn": "Letter vs number steppings: which layers change (rules vary by company)",
    "labels": [
      {
        "key": "letter",
        "zh": "字母改變",
        "en": "A letter change"
      },
      {
        "key": "letterDo",
        "zh": "代表底層的電晶體也有修改",
        "en": "Means the transistors at the bottom were also changed"
      },
      {
        "key": "remade",
        "zh": "需要重做大部分光罩",
        "en": "Most masks had to be remade"
      },
      {
        "key": "number",
        "zh": "數字改變",
        "en": "A number change"
      },
      {
        "key": "numberDo",
        "zh": "代表只修改上層的金屬導線",
        "en": "Means only the upper metal wiring was changed"
      },
      {
        "key": "fewMasks",
        "zh": "只要修改上層幾道金屬層的光罩",
        "en": "Changing just the masks of a few upper metal layers"
      },
      {
        "key": "spare",
        "zh": "備用的邏輯閘",
        "en": "Spare logic gates"
      },
      {
        "key": "connect",
        "zh": "把這些備用閘接進電路",
        "en": "Connect these spare gates into the circuit"
      },
      {
        "key": "transistors",
        "zh": "底層的電晶體",
        "en": "The transistors at the bottom"
      },
      {
        "key": "metal",
        "zh": "上層的金屬導線",
        "en": "Upper metal wiring"
      },
      {
        "key": "masks",
        "zh": "光罩",
        "en": "Masks"
      },
      {
        "key": "transMasks",
        "zh": "底層電晶體的光罩",
        "en": "The masks for the transistor layers at the bottom are"
      },
      {
        "key": "mostMasks",
        "zh": "最多、最貴",
        "en": "the most numerous and most expensive"
      },
      {
        "key": "longest",
        "zh": "製程時間也最長",
        "en": "and those layers take the longest to process"
      },
      {
        "key": "park",
        "zh": "先把一些晶圓停在金屬層之前等待",
        "en": "Park some wafers just before the metal layers"
      },
      {
        "key": "arrive",
        "zh": "修正版光罩一到就繼續生產",
        "en": "Production can continue as soon as the fixed masks arrive"
      },
      {
        "key": "save",
        "zh": "可以省下大量的成本和時間",
        "en": "Saves a great deal of cost and time"
      },
      {
        "key": "vary",
        "zh": "實際規則依各公司而定",
        "en": "The actual rules vary from company to company"
      }
    ]
  },
  {
    "chapterId": "ch24",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "製程物理與軟韌體失配的異常與防堵對策",
    "captionEn": "Silicon-firmware mismatch failures and their countermeasures",
    "root": {
      "zh": "製程物理與軟韌體失配",
      "en": "Silicon-firmware mismatch"
    },
    "branches": [
      {
        "zh": "瞬間壓降當機",
        "en": "Transient voltage-droop crash",
        "leafZh": "自適應時脈週期延長",
        "leafEn": "Adaptive clock stretching"
      },
      {
        "zh": "靜默資料損毀",
        "en": "Silent data corruption",
        "leafZh": "加入餘數檢查碼",
        "leafEn": "Add residue arithmetic checks"
      },
      {
        "zh": "讀取干擾掉資料",
        "en": "Read-disturb data loss",
        "leafZh": "背景搬移至新區塊",
        "leafEn": "Background data relocation"
      }
    ]
  },
  {
    "chapterId": "ch24",
    "headingZh": "硬體與韌體協同設計主題",
    "headingEn": "Hardware–Firmware Design Topics",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "六個軟硬體協同設計主題，依記憶體、電壓時序與堆疊熱分組",
    "captionEn": "Six hardware–firmware topics grouped by memory, voltage/timing and stack heat.",
    "columns": [
      {
        "titleZh": "記憶體資料完整性",
        "titleEn": "Memory data integrity",
        "items": [
          {
            "zh": "DRAM 溫度相依刷新與錘擊防護",
            "en": "Temperature-dependent DRAM refresh, Row Hammer",
            "noteZh": "依料號設定刷新、TRR／PRAC",
            "noteEn": "Part-specific refresh; TRR / PRAC"
          },
          {
            "zh": "軟錯誤與多層錯誤更正碼",
            "en": "Soft errors and multi-tier ECC",
            "noteZh": "多層 ECC 與記憶體巡檢",
            "noteEn": "Layered ECC plus memory scrubbing"
          },
          {
            "zh": "NAND 快閃轉換層與壽命管理",
            "en": "NAND flash translation layer (FTL)",
            "noteZh": "耗損平均、讀取重試與 LDPC",
            "noteEn": "Wear leveling, read retry, LDPC"
          }
        ]
      },
      {
        "titleZh": "電壓與時序",
        "titleEn": "Voltage and timing",
        "items": [
          {
            "zh": "製程角、自適應電壓與老化補償",
            "en": "PVT corners, AVS/DVFS, aging guardband",
            "noteZh": "eFuse 校準與關鍵路徑監測",
            "noteEn": "eFuse calibration, critical-path monitors"
          },
          {
            "zh": "瞬態壓降與時脈週期延長",
            "en": "Transient droop and clock stretching",
            "noteZh": "壓降偵測、延長時脈與分批喚醒",
            "noteEn": "Detect droop, extend clock, stage ramp-up"
          }
        ]
      },
      {
        "titleZh": "立體堆疊熱與排程",
        "titleEn": "Stack thermal and scheduling",
        "items": [
          {
            "zh": "立體堆疊熱耦合與小晶片排程",
            "en": "Stack thermal coupling, chiplet NUMA scheduling",
            "noteZh": "拓撲感知排程與分層降頻",
            "noteEn": "Topology-aware scheduling, tier throttling"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch24",
    "headingZh": "定量模型、假設與使用條件",
    "headingEn": "Quantitative Models, Assumptions & Conditions",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "壓降、功耗熱與 ECC 三種模型的關係、假設與意義",
    "captionEn": "Droop, power/thermal and ECC models: core relation, assumptions, implication.",
    "columns": [
      {
        "titleZh": "電源分配網路壓降模型",
        "titleEn": "PDN voltage droop model",
        "items": [
          {
            "keyZh": "核心關係",
            "keyEn": "Core relation",
            "zh": "壓降為電阻項加電感項",
            "en": "Droop = resistive + inductive terms"
          },
          {
            "keyZh": "限制",
            "keyEn": "Limit",
            "zh": "不能只由電流斜率決定壓降",
            "en": "Current slew alone doesn't set droop"
          },
          {
            "keyZh": "工程意義",
            "keyEn": "Implication",
            "zh": "評估供電佈局、去耦與漸進啟動",
            "en": "Power routing, decoupling, staged ramp-up"
          }
        ]
      },
      {
        "titleZh": "動態電壓頻率功耗與熱失控",
        "titleEn": "DVFS power and thermal runaway",
        "items": [
          {
            "keyZh": "核心關係",
            "keyEn": "Core relation",
            "zh": "動態功耗與電壓平方乘頻率成正比",
            "en": "Dynamic power ∝ voltage squared × frequency"
          },
          {
            "keyZh": "假設",
            "keyEn": "Assumes",
            "zh": "立方近似須電壓正比於頻率",
            "en": "Cubic law needs voltage proportional to f"
          },
          {
            "keyZh": "工程意義",
            "keyEn": "Implication",
            "zh": "依感測器與迴路延遲設計降頻",
            "en": "Design DVFS around sensors, loop latency"
          }
        ]
      },
      {
        "titleZh": "ECC 界限與錯誤尾",
        "titleEn": "ECC bound and error tail",
        "items": [
          {
            "keyZh": "核心關係",
            "keyEn": "Core relation",
            "zh": "Hamming 界限給出最少檢查位元",
            "en": "Hamming bound gives minimum check bits"
          },
          {
            "keyZh": "假設",
            "keyEn": "Assumes",
            "zh": "位元錯誤獨立同分佈",
            "en": "Independent, identically distributed errors"
          },
          {
            "keyZh": "工程意義",
            "keyEn": "Implication",
            "zh": "依錯誤型態評估 ECC 與巡檢",
            "en": "Match ECC and scrubbing to the fault model"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch24",
    "headingZh": "ECC：錯誤一定會發生",
    "headingEn": "ECC: errors will happen",
    "type": "pictorial",
    "draw": "eccSoftErrors",
    "captionZh": "軟錯誤從哪裡來，ECC 怎麼補救",
    "captionEn": "Where soft errors come from, and how ECC helps",
    "labels": [
      {
        "key": "radio",
        "zh": "封裝材料中微量的放射性物質",
        "en": "Trace radioactive material in the package"
      },
      {
        "key": "cosmic",
        "zh": "來自宇宙射線的粒子",
        "en": "Particles from cosmic rays"
      },
      {
        "key": "flip",
        "zh": "都可能打翻一個位元",
        "en": "Can flip a bit"
      },
      {
        "key": "soft",
        "zh": "軟錯誤",
        "en": "Soft errors"
      },
      {
        "key": "weak",
        "zh": "製程變異造成的體質較弱的單元",
        "en": "Weaker cells caused by process variation"
      },
      {
        "key": "data",
        "zh": "資料",
        "en": "Data"
      },
      {
        "key": "check",
        "zh": "檢查位元",
        "en": "Check bits"
      },
      {
        "key": "correct",
        "zh": "偵測並更正少量的位元錯誤",
        "en": "Detect and correct a small number of bit errors"
      },
      {
        "key": "tooMany",
        "zh": "錯誤太多時只能偵測、無法更正",
        "en": "beyond that, it can only detect them"
      },
      {
        "key": "onDie",
        "zh": "新一代 DRAM 晶片內部的 ECC",
        "en": "The ECC inside newer DRAM chips"
      },
      {
        "key": "sysEcc",
        "zh": "系統層級的 ECC",
        "en": "System-level ECC"
      },
      {
        "key": "differ",
        "zh": "兩件不同的事",
        "en": "Two different things"
      }
    ]
  },
  {
    "chapterId": "app-jargon",
    "headingZh": "晶圓廠批次狀態機與跨部門交接實戰條例",
    "headingEn": "Fab Lot State-Machine & Shift Handover Clauses",
    "type": "flow",
    "captionZh": "機台開腔修機後，由 EE 交給 PE 驗證再放行的流程",
    "captionEn": "How a repaired tool passes from EE to PE for qualification before release",
    "steps": [
      {
        "zh": "EE 修機",
        "en": "EE completes the repair",
        "noteZh": "開腔後嚴禁直接跑產品",
        "noteEn": "No product directly after chamber open"
      },
      {
        "zh": "跑 Season 與控片",
        "en": "Run seasoning and monitor wafers",
        "noteZh": "交由製程工程師",
        "noteEn": "Handed off to PE"
      },
      {
        "zh": "確認壓回管制線內",
        "en": "Confirm back within control limits",
        "noteZh": "微粒、膜厚與蝕刻率",
        "noteEn": "Particles, film thickness and etch rate"
      },
      {
        "zh": "簽核 Release",
        "en": "Sign off the tool release"
      }
    ]
  },
  {
    "chapterId": "app-jargon",
    "headingZh": "現場異常告警與跨班別緊急處置行話速查",
    "headingEn": "Fab Excursion Alarm & Triage Jargon Lookup",
    "type": "branch",
    "captionZh": "現場緊急告警與當班的立即處置",
    "captionEn": "Floor emergency callouts and the shift's immediate action",
    "root": {
      "zh": "現場緊急告警",
      "en": "Floor emergency callout",
      "icon": "risk"
    },
    "branches": [
      {
        "zh": "Q-Time 快爆了",
        "en": "Q-Time about to blow",
        "leafZh": "關閉上游清洗站進站",
        "leafEn": "Block track-in at the clean step",
        "icon": "clock"
      },
      {
        "zh": "FDC 亮紅燈鎖批",
        "en": "FDC Auto-Hold tripped",
        "leafZh": "攔截所有姊妹批",
        "leafEn": "Future Hold on all sister lots",
        "icon": "lock"
      },
      {
        "zh": "ADI 疊對偏移",
        "en": "ADI overlay shift",
        "leafZh": "轉入黃光重工",
        "leafEn": "Route to photo rework",
        "icon": "overlay"
      },
      {
        "zh": "CP 外圍環帶死粒",
        "en": "CP edge-ring failing dies",
        "leafZh": "嫌疑腔體切 Down",
        "leafEn": "Take the offending chamber down",
        "icon": "edge-ring"
      }
    ]
  },
  {
    "chapterId": "app-jargon",
    "headingZh": "晶圓與批次",
    "headingEn": "Wafers and lots",
    "type": "pictorial",
    "draw": "lotJourney",
    "sourcedNumbers": true,
    "sourceZh": "最多 25 片出自本段表格；分成三組取自例句，不代表一定分三組；晶圓盒與晶圓的數量只是示意。",
    "sourceEn": "Up to 25 comes from the table in this section. The three groups come from an example sentence and are not a rule; carrier and wafer counts are schematic.",
    "captionZh": "一個 Lot 從投片到 Fab Out 會遇到的行話",
    "captionEn": "Jargon a lot meets on its way from wafer start to fab out",
    "labels": [
      {
        "key": "lot",
        "zh": "Lot",
        "en": "Lot"
      },
      {
        "key": "lotDef",
        "zh": "一批晶圓，最多 25 片",
        "en": "A group of wafers, up to 25"
      },
      {
        "key": "start",
        "zh": "投片（Wafer Start）",
        "en": "Wafer start"
      },
      {
        "key": "split",
        "zh": "Split",
        "en": "Split"
      },
      {
        "key": "merge",
        "zh": "Merge",
        "en": "Merge"
      },
      {
        "key": "bank",
        "zh": "Bank",
        "en": "Bank"
      },
      {
        "key": "fabOut",
        "zh": "Fab Out",
        "en": "Fab out"
      },
      {
        "key": "wip",
        "zh": "WIP",
        "en": "WIP"
      },
      {
        "key": "move",
        "zh": "Move",
        "en": "Moves"
      },
      {
        "key": "hot",
        "zh": "Hot Lot",
        "en": "Hot lot"
      },
      {
        "key": "monitor",
        "zh": "控片",
        "en": "Monitor wafer"
      },
      {
        "key": "dummy",
        "zh": "擋片",
        "en": "Dummy wafer"
      },
      {
        "key": "broken",
        "zh": "破片",
        "en": "Broken wafer"
      }
    ]
  },
  {
    "chapterId": "app-jargon",
    "headingZh": "機台",
    "headingEn": "Tools",
    "type": "pictorial",
    "draw": "toolJargon",
    "captionZh": "機台行話各在機台的哪個位置",
    "captionEn": "Where tool jargon lives on a tool",
    "labels": [
      {
        "key": "loadPort",
        "zh": "Load Port",
        "en": "Load port"
      },
      {
        "key": "chamber",
        "zh": "Chamber",
        "en": "Chamber"
      },
      {
        "key": "bQuote",
        "zh": "「這片是在 B 腔做的。」",
        "en": "\"This wafer ran in chamber B.\""
      },
      {
        "key": "recipe",
        "zh": "Recipe",
        "en": "Recipe"
      },
      {
        "key": "idle",
        "zh": "Idle",
        "en": "Idle"
      },
      {
        "key": "down",
        "zh": "Down（Down 機）",
        "en": "Down"
      },
      {
        "key": "pm",
        "zh": "PM",
        "en": "PM"
      },
      {
        "key": "pmDef",
        "zh": "定期保養",
        "en": "Scheduled preventive maintenance"
      },
      {
        "key": "seasoning",
        "zh": "Seasoning",
        "en": "Seasoning"
      },
      {
        "key": "qual",
        "zh": "Qual",
        "en": "Qual"
      },
      {
        "key": "backUp",
        "zh": "復機",
        "en": "Back up"
      },
      {
        "key": "dedication",
        "zh": "綁機（Dedication）",
        "en": "Dedication"
      },
      {
        "key": "dedDef",
        "zh": "指定晶圓只能在特定機台上做",
        "en": "Restricting wafers to a specific tool"
      }
    ]
  },
  {
    "chapterId": "app-jargon",
    "headingZh": "系統與流程",
    "headingEn": "Systems and flow",
    "type": "pictorial",
    "draw": "systemVsPhysical",
    "captionZh": "系統紀錄與實際的晶圓兩條線，以及 Hold 與帳實不符",
    "captionEn": "The system record and the physical wafers, plus hold and mismatched records",
    "labels": [
      {
        "key": "system",
        "zh": "系統",
        "en": "System"
      },
      {
        "key": "physical",
        "zh": "實際狀況",
        "en": "What is physically happening"
      },
      {
        "key": "dispatch",
        "zh": "派工",
        "en": "Dispatching"
      },
      {
        "key": "trackIn",
        "zh": "進站（Track-in）",
        "en": "Track-in"
      },
      {
        "key": "run",
        "zh": "跑貨",
        "en": "Run product"
      },
      {
        "key": "trackOut",
        "zh": "出站（Track-out）",
        "en": "Track-out"
      },
      {
        "key": "qtime",
        "zh": "Q-Time",
        "en": "Q-time"
      },
      {
        "key": "qtimeDef",
        "zh": "兩站之間允許等待的時間",
        "en": "The time allowed to wait between two steps"
      },
      {
        "key": "hold",
        "zh": "Hold",
        "en": "Hold"
      },
      {
        "key": "holdDef",
        "zh": "暫停晶圓或機台的生產",
        "en": "Stopping production of a lot or a tool"
      },
      {
        "key": "release",
        "zh": "Release",
        "en": "Release"
      },
      {
        "key": "mismatch",
        "zh": "帳實不符",
        "en": "Records don't match"
      },
      {
        "key": "mismatchEx",
        "zh": "系統顯示已出站，晶圓卻還在機台裡",
        "en": "The system says it tracked out, but the wafers are still in the tool"
      }
    ]
  },
  {
    "chapterId": "app-jargon",
    "headingZh": "品質與異常",
    "headingEn": "Quality and abnormalities",
    "type": "pictorial",
    "draw": "oocOos",
    "captionZh": "OOC 與 OOS 的落點與去向，以及晶圓圖的圖樣",
    "captionEn": "Where OOC and OOS land and what follows, plus patterns on a wafer map",
    "labels": [
      {
        "key": "cl",
        "zh": "管制界限",
        "en": "Control limits"
      },
      {
        "key": "spec",
        "zh": "規格",
        "en": "Specification"
      },
      {
        "key": "ooc",
        "zh": "OOC",
        "en": "OOC"
      },
      {
        "key": "oocDef",
        "zh": "數據超出管制界限",
        "en": "Data outside the control limits"
      },
      {
        "key": "oos",
        "zh": "OOS",
        "en": "OOS"
      },
      {
        "key": "oosDef",
        "zh": "數據超出規格",
        "en": "Data outside the specification"
      },
      {
        "key": "ocap",
        "zh": "照 OCAP 處理",
        "en": "Follow the OCAP"
      },
      {
        "key": "mrb",
        "zh": "MRB",
        "en": "MRB"
      },
      {
        "key": "rework",
        "zh": "Rework",
        "en": "Rework"
      },
      {
        "key": "concession",
        "zh": "特採放行",
        "en": "Concession release"
      },
      {
        "key": "scrap",
        "zh": "Scrap",
        "en": "Scrap"
      },
      {
        "key": "excursion",
        "zh": "Excursion",
        "en": "Excursion"
      },
      {
        "key": "excDef",
        "zh": "突發的品質異常事件",
        "en": "A sudden quality problem"
      },
      {
        "key": "map",
        "zh": "Map",
        "en": "Map"
      },
      {
        "key": "scratch",
        "zh": "刮痕",
        "en": "Scratches"
      },
      {
        "key": "particle",
        "zh": "Particle",
        "en": "Particles"
      }
    ]
  },
  {
    "chapterId": "app-jargon",
    "headingZh": "區域與人",
    "headingEn": "Areas and people",
    "type": "pictorial",
    "draw": "areasPeople",
    "captionZh": "現場區域與職能的行話（區域位置只是示意）",
    "captionEn": "Fab areas and engineering roles in jargon (the layout is schematic)",
    "labels": [
      {
        "key": "photo",
        "zh": "黃光",
        "en": "Photo"
      },
      {
        "key": "photoDef",
        "zh": "微影區，因照明是黃色而得名",
        "en": "The lithography area, named after its yellow lighting"
      },
      {
        "key": "furnace",
        "zh": "爐管",
        "en": "Diffusion"
      },
      {
        "key": "furnaceDef",
        "zh": "氧化、退火等批次式高溫機台的區域",
        "en": "The area of high-temperature batch tools for oxidation and annealing"
      },
      {
        "key": "wet",
        "zh": "Wet",
        "en": "Wets"
      },
      {
        "key": "wetDef",
        "zh": "濕式清洗與濕蝕刻區",
        "en": "The wet cleaning and wet etching area"
      },
      {
        "key": "pe",
        "zh": "PE",
        "en": "PE"
      },
      {
        "key": "ee",
        "zh": "EE",
        "en": "EE"
      },
      {
        "key": "pie",
        "zh": "PIE",
        "en": "PIE"
      },
      {
        "key": "ye",
        "zh": "YE",
        "en": "YE"
      },
      {
        "key": "roles",
        "zh": "製程、設備、製程整合、良率工程師",
        "en": "Process, equipment, process integration and yield engineers"
      },
      {
        "key": "handover",
        "zh": "交接",
        "en": "Handover"
      },
      {
        "key": "handoverDef",
        "zh": "換班時說明機台與晶圓的狀況",
        "en": "Passing on the status of tools and wafers at shift change"
      }
    ]
  },
  {
    "chapterId": "app-glossary",
    "headingZh": "八大工程領域核心術語與物理量綱條例總覽",
    "headingEn": "8-Domain Core Terminology & Physical Dimension Clauses",
    "foldTables": true,
    "type": "compare",
    "captionZh": "八大工程領域及其核心代表縮寫，依領域分三組。",
    "captionEn": "The eight engineering domains and their core abbreviations, grouped by area.",
    "columns": [
      {
        "titleZh": "基板、元件與前段製程",
        "titleEn": "Substrate, device & front end",
        "items": [
          {
            "zh": "晶圓基板與元件物理",
            "en": "Wafer substrates & device physics",
            "noteZh": "CZ、SOI、GAA、CFET",
            "noteEn": "CZ, SOI, GAA, CFET",
            "icon": "ingot"
          },
          {
            "zh": "前段圖形化與長膜模組",
            "en": "FEOL lithography & thin-film modules",
            "noteZh": "EUV、SAQP、ALD、ECD",
            "noteEn": "EUV, SAQP, ALD, ECD",
            "icon": "litho"
          },
          {
            "zh": "蝕刻、佈植退火、平坦化與清洗",
            "en": "Etch, implant/anneal, CMP & clean",
            "noteZh": "RIE、ALE、RTA、CMP",
            "noteEn": "RIE, ALE, RTA, CMP",
            "icon": "etch"
          }
        ]
      },
      {
        "titleZh": "互連、記憶體與封裝",
        "titleEn": "Interconnect, memory & packaging",
        "items": [
          {
            "zh": "中後段互連與背面供電",
            "en": "MOL, BEOL & backside power delivery",
            "noteZh": "雙鑲嵌銅、ULK、BSPDN",
            "noteEn": "Dual-damascene Cu, ULK, BSPDN",
            "icon": "interconnect"
          },
          {
            "zh": "先進記憶體與新興 NVM",
            "en": "Advanced memory & emerging NVM",
            "noteZh": "DRAM、NAND、HBM",
            "noteEn": "DRAM, NAND, HBM",
            "icon": "array"
          },
          {
            "zh": "傳統與異質整合封裝及智慧製造",
            "en": "Packaging & smart fab CIM",
            "noteZh": "CoWoS、UCIe、MES",
            "noteEn": "CoWoS, UCIe, MES",
            "icon": "chiplets"
          }
        ]
      },
      {
        "titleZh": "量測、控制與可靠度",
        "titleEn": "Metrology, control & reliability",
        "items": [
          {
            "zh": "在線量測、無損檢測與故障分析",
            "en": "In-line metrology, inspection & FA",
            "noteZh": "OCD、C-SAM、STEM",
            "noteEn": "OCD, C-SAM, STEM",
            "icon": "microscope"
          },
          {
            "zh": "製程控制、異常防堵與可靠度測試",
            "en": "Process control, excursion & reliability",
            "noteZh": "APC、OCAP、HTOL",
            "noteEn": "APC, OCAP, HTOL",
            "icon": "control-limit"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "app-glossary",
    "headingZh": "定量物理定律與跨章節異常診斷速查",
    "headingEn": "Quantitative Laws & Cross-Chapter Failure Lookup",
    "foldTables": true,
    "type": "compare",
    "captionZh": "六大工程維度的統御方程與代表現場異常。",
    "captionEn": "Governing equations and signature failure modes across six engineering domains.",
    "columns": [
      {
        "titleZh": "工程領域與統御方程",
        "titleEn": "Domain & governing equations",
        "items": [
          {
            "zh": "光學微影與圖形化",
            "en": "Lithography & patterning",
            "noteZh": "CD、DOF 與 EPE 視窗",
            "noteEn": "CD, DOF and EPE windows",
            "icon": "litho"
          },
          {
            "zh": "薄膜、蝕刻與平坦化",
            "en": "Deposition, etch & planarization",
            "noteZh": "深孔傳導、Preston 磨耗律",
            "noteEn": "Knudsen transport, Preston's law",
            "icon": "layers"
          },
          {
            "zh": "電晶體物理與 CMOS 整合",
            "en": "Device physics & CMOS integration",
            "noteZh": "擺幅極限、Pelgrom 失配",
            "noteEn": "Swing limit, Pelgrom mismatch",
            "icon": "transistor"
          },
          {
            "zh": "先進記憶體與先進封裝",
            "en": "Memory & advanced packaging",
            "noteZh": "電容保持、翹曲與熱阻",
            "noteEn": "Retention, warpage, thermal resistance",
            "icon": "array"
          },
          {
            "zh": "量測、良率與 SPC／APC",
            "en": "Metrology, yield & SPC/APC",
            "noteZh": "負二項良率與 EWMA 回饋",
            "noteEn": "Negative-binomial yield, EWMA feedback",
            "icon": "control-limit"
          },
          {
            "zh": "測試、可靠度、智慧工廠與韌體",
            "en": "Test, reliability, CIM & firmware",
            "noteZh": "電遷移、浴缸曲線、利特爾法則",
            "noteEn": "EM law, Weibull bathtub, Little's Law",
            "icon": "bathtub"
          }
        ]
      },
      {
        "titleZh": "代表現場異常",
        "titleEn": "Signature failure modes",
        "items": [
          {
            "zh": "EUV 隨機微橋接、失焦熱點",
            "en": "EUV stochastic micro-bridges, focus hotspots",
            "icon": "litho"
          },
          {
            "zh": "懸垂空洞、底部切角、碟形凹陷",
            "en": "Keyhole seams, foot-notching, CMP dishing",
            "icon": "layers"
          },
          {
            "zh": "DIBL 穿通、奈米片釋放沾黏",
            "en": "DIBL punch-through, sheet release stiction",
            "icon": "transistor"
          },
          {
            "zh": "DRAM 變異保持時間、哭笑臉翹曲",
            "en": "DRAM VRT tail bits, Smile/Cry warpage",
            "icon": "array"
          },
          {
            "zh": "晶圓圖指紋、過度調機",
            "en": "Wafer-map rings, tampering",
            "icon": "control-limit"
          },
          {
            "zh": "早夭漏放、Q-Time 鎖批",
            "en": "Infant-mortality escapes, Q-Time gridlock",
            "icon": "bathtub"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "app-reading",
    "headingZh": "國際半導體標準組織與頂尖技術會議權威條例",
    "headingEn": "International Semiconductor Standards & Premier Conferences Clauses",
    "foldTables": true,
    "type": "compare",
    "captionZh": "國際標準聯盟與頂尖技術會議各自涵蓋的範圍。",
    "captionEn": "International standards bodies and premier conferences, and what each covers.",
    "columns": [
      {
        "titleZh": "國際標準聯盟",
        "titleEn": "International standards bodies",
        "items": [
          {
            "zh": "SEMI 國際標準",
            "en": "SEMI international standards",
            "noteZh": "晶圓、FOUP 介面與自動化通訊",
            "noteEn": "Wafer, FOUP and fab automation protocols"
          },
          {
            "zh": "JEDEC 與車規 AEC",
            "en": "JEDEC & automotive AEC",
            "noteZh": "記憶體介面與可靠度驗證",
            "noteEn": "Memory interfaces, reliability qualification"
          },
          {
            "zh": "UCIe、OCP 與 IEEE 聯盟",
            "en": "UCIe, OCP & IEEE consortia",
            "noteZh": "小晶片互連與堆疊測試架構",
            "noteEn": "Die-to-die links and stacked-die test access"
          }
        ],
        "icon": "definition"
      },
      {
        "titleZh": "頂尖技術會議",
        "titleEn": "Premier technical conferences",
        "items": [
          {
            "zh": "IEDM 與 VLSI 研討會",
            "en": "IEDM & VLSI Symposium",
            "noteZh": "次世代製程節點首度公開",
            "noteEn": "Where next-gen process nodes debut"
          },
          {
            "zh": "ISSCC、ITC 與 IRPS",
            "en": "ISSCC, ITC & IRPS",
            "noteZh": "晶片設計、測試與可靠度物理",
            "noteEn": "Chip design, test and reliability physics"
          },
          {
            "zh": "ECTC 與 SPIE 微影會議",
            "en": "ECTC & SPIE Advanced Lithography",
            "noteZh": "先進封裝與微影量測藍圖",
            "noteEn": "Advanced packaging, lithography, metrology"
          }
        ],
        "icon": "usage"
      }
    ]
  },
  {
    "chapterId": "app-reading",
    "headingZh": "跨領域進階研讀路線圖與標準規範對照",
    "headingEn": "Cross-Domain Study Roadmaps & Standards Matrix",
    "foldTables": true,
    "type": "branch",
    "captionZh": "四條職能研讀路線與各自的代表會議、標準。",
    "captionEn": "Four career-track study roadmaps with their key conferences and standards.",
    "root": {
      "zh": "工程職能研讀路線",
      "en": "Engineering career tracks",
      "icon": "route"
    },
    "branches": [
      {
        "zh": "前段製程整合與元件研發",
        "en": "FEOL integration & device R&D",
        "leafZh": "IEDM、VLSI 與 IRDS",
        "leafEn": "IEDM, VLSI Symposium, IRDS Roadmap",
        "icon": "gaa"
      },
      {
        "zh": "四大模組與在線量測控制",
        "en": "Unit modules, metrology & APC",
        "leafZh": "SPIE 與 SEMI 標準",
        "leafEn": "SPIE Advanced Lithography, SEMI standards",
        "icon": "modules"
      },
      {
        "zh": "先進封裝與失效分析",
        "en": "Advanced packaging & physical FA",
        "leafZh": "ECTC、ISTFA、UCIe",
        "leafEn": "ECTC, ISTFA, UCIe",
        "icon": "chiplets"
      },
      {
        "zh": "測試、可靠度與智慧製造",
        "en": "Test, reliability & smart fab CIM",
        "leafZh": "IRPS、ITC 與 JEDEC",
        "leafEn": "IRPS, ITC and JEDEC",
        "icon": "bathtub"
      }
    ]
  },
  {
    "chapterId": "app-reading",
    "headingZh": "產業標準",
    "headingEn": "Industry standards",
    "type": "pictorial",
    "draw": "standardsMap",
    "sourcedNumbers": true,
    "sourceZh": "標準編號與章節編號都出自本段表格；章節編號取自表格的相關章節欄。",
    "sourceEn": "Standard names and chapter numbers come from the table in this section; chapter numbers are from its Related chapters column.",
    "captionZh": "八個產業標準各對應哪幾章",
    "captionEn": "Which chapters each of the eight industry standards relates to",
    "labels": [
      {
        "key": "related",
        "zh": "相關章節",
        "en": "Related chapters"
      },
      {
        "key": "ch1",
        "zh": "1",
        "en": "1"
      },
      {
        "key": "ch18",
        "zh": "18",
        "en": "18"
      },
      {
        "key": "ch20",
        "zh": "20",
        "en": "20"
      },
      {
        "key": "ch22",
        "zh": "22",
        "en": "22"
      },
      {
        "key": "ch23",
        "zh": "23",
        "en": "23"
      },
      {
        "key": "s1",
        "zh": "ISO 14644-1",
        "en": "ISO 14644-1"
      },
      {
        "key": "c1",
        "zh": "潔淨室的等級分類",
        "en": "Cleanroom classification"
      },
      {
        "key": "s2",
        "zh": "SEMI E10",
        "en": "SEMI E10"
      },
      {
        "key": "c2",
        "zh": "設備可靠度、可用率與狀態的定義",
        "en": "Definitions of equipment reliability, availability and states"
      },
      {
        "key": "s3",
        "zh": "SEMI E5、E30、E37",
        "en": "SEMI E5, E30, E37"
      },
      {
        "key": "c3",
        "zh": "機台通訊標準（SECS-II、GEM、HSMS）",
        "en": "Equipment communication standards (SECS-II, GEM, HSMS)"
      },
      {
        "key": "s4",
        "zh": "IPC/JEDEC J-STD-020",
        "en": "IPC/JEDEC J-STD-020"
      },
      {
        "key": "c4",
        "zh": "封裝的濕度敏感等級分類",
        "en": "Moisture sensitivity classification of packages"
      },
      {
        "key": "s5",
        "zh": "IPC/JEDEC J-STD-033",
        "en": "IPC/JEDEC J-STD-033"
      },
      {
        "key": "c5",
        "zh": "濕度敏感元件的包裝、運送與使用",
        "en": "Packing, shipping and use of moisture-sensitive devices"
      },
      {
        "key": "s6",
        "zh": "JEDEC J-STD-046",
        "en": "JEDEC J-STD-046"
      },
      {
        "key": "c6",
        "zh": "產品與製程變更的客戶通知",
        "en": "Customer notification of product and process changes"
      },
      {
        "key": "s7",
        "zh": "JEDEC JESD47",
        "en": "JEDEC JESD47"
      },
      {
        "key": "c7",
        "zh": "積體電路的可靠度驗證",
        "en": "Reliability qualification of integrated circuits"
      },
      {
        "key": "s8",
        "zh": "AEC-Q100",
        "en": "AEC-Q100"
      },
      {
        "key": "c8",
        "zh": "車用積體電路的可靠度驗證",
        "en": "Reliability qualification of automotive integrated circuits"
      }
    ]
  }
];
