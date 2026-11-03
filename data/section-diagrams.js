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
    "type": "compare",
    "captionZh": "前段與後段的常見分法，以及廠內 FEOL／BEOL 用法。",
    "captionEn": "Front end versus back end: the usual split and the in-fab FEOL/BEOL meaning.",
    "columns": [
      {
        "titleZh": "前段",
        "titleEn": "Front end",
        "items": [
          {
            "zh": "一般指晶圓製造",
            "en": "Usually means wafer fabrication"
          },
          {
            "zh": "在晶圓廠裡一層層做出電路",
            "en": "Builds the circuit layer by layer in the fab"
          },
          {
            "zh": "最花時間，通常兩到三個月以上",
            "en": "Most time-consuming: two to three months or more"
          },
          {
            "zh": "廠內另指 FEOL：製造電晶體",
            "en": "In-fab meaning, FEOL: building transistors"
          }
        ]
      },
      {
        "titleZh": "後段",
        "titleEn": "Back end",
        "items": [
          {
            "zh": "一般指封裝與測試",
            "en": "Usually means packaging and test"
          },
          {
            "zh": "測試、切割、封裝做好的晶圓",
            "en": "Tests, cuts and packages the finished wafers"
          },
          {
            "zh": "做成可焊到電路板上的晶片",
            "en": "Makes chips that can be soldered onto boards"
          },
          {
            "zh": "廠內另指 BEOL：製作金屬導線",
            "en": "In-fab meaning, BEOL: building metal wiring"
          }
        ]
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
    "captionZh": "單片式與批次式機台：一次處理一片，或一次處理很多片。",
    "captionEn": "Single-wafer and batch tools: one wafer at a time, or many at once.",
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
    "captionZh": "無塵室要多乾淨，以及為什麼只要晶圓經過的地方最乾淨。",
    "captionEn": "How clean a cleanroom must be, and why only the wafer path must be cleanest.",
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
      }
    ]
  },
  {
    "chapterId": "ch01",
    "headingZh": "工廠的血液：廠務系統",
    "headingEn": "The lifeblood of the fab: facilities",
    "type": "branch",
    "captionZh": "廠務系統供應機台的五類資源與各自重點。",
    "captionEn": "The five kinds of resources the facilities team supplies to the tools.",
    "root": {
      "zh": "廠務系統",
      "en": "Facilities",
      "noteZh": "供應機台大量穩定資源",
      "noteEn": "A large, steady supply for the tools"
    },
    "branches": [
      {
        "zh": "超純水",
        "en": "Ultrapure water",
        "leafZh": "清洗晶圓，用量很大",
        "leafEn": "Cleans wafers; huge volumes used"
      },
      {
        "zh": "特殊氣體與化學品",
        "en": "Specialty gases and chemicals",
        "leafZh": "專門供應與偵測系統",
        "leafEn": "Dedicated supply and detection"
      },
      {
        "zh": "電力",
        "en": "Electric power",
        "leafZh": "短暫電壓不穩就可能報廢",
        "leafEn": "Brief voltage dips can ruin wafers"
      },
      {
        "zh": "排氣與廢水處理",
        "en": "Exhaust and wastewater treatment",
        "leafZh": "處理製程廢氣與廢液",
        "leafEn": "Treats waste gases and liquids"
      },
      {
        "zh": "溫濕度與振動控制",
        "en": "Temp., humidity, vibration control",
        "leafZh": "精密機台對環境很敏感",
        "leafEn": "Precision tools are environment-sensitive"
      }
    ]
  },
  {
    "chapterId": "ch01",
    "headingZh": "工廠怎麼衡量表現",
    "headingEn": "How a fab measures its performance",
    "type": "branch",
    "captionZh": "拉長整廠生產週期的因素與各自的作用方式。",
    "captionEn": "What lengthens fab cycle time, and how each factor does it.",
    "root": {
      "zh": "拉長生產週期的因素",
      "en": "What lengthens cycle time",
      "noteZh": "生產週期：投片到完成",
      "noteEn": "Cycle time: wafer start to completion"
    },
    "branches": [
      {
        "zh": "在製品（WIP）越多",
        "en": "More work in process (WIP)",
        "leafZh": "每片晶圓排隊等機台更久",
        "leafEn": "Each wafer waits longer for tools"
      },
      {
        "zh": "急件插隊",
        "en": "Hot lots jump the queue",
        "leafZh": "其他晶圓得多等一下",
        "leafEn": "Other lots wait a little longer"
      },
      {
        "zh": "批次機台為急件提早開機",
        "en": "Batch tools run early for hot lots",
        "leafZh": "未湊滿就開機，降低效率",
        "leafEn": "Runs before full, wasting capacity"
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
    "type": "flow",
    "captionZh": "從電晶體、邏輯閘、運算電路到以金屬導線連成晶片。",
    "captionEn": "From transistors to logic gates and circuits, then wired into a chip.",
    "steps": [
      {
        "zh": "電晶體",
        "en": "Transistors",
        "noteZh": "先做在矽表面（FEOL）",
        "noteEn": "Built first at the silicon surface (FEOL)"
      },
      {
        "zh": "邏輯閘",
        "en": "Logic gates",
        "noteZh": "由幾個電晶體組成",
        "noteEn": "A few transistors make a logic gate"
      },
      {
        "zh": "運算電路",
        "en": "Computing circuits",
        "noteZh": "由許多邏輯閘組成",
        "noteEn": "Many logic gates make computing circuits"
      },
      {
        "zh": "多層金屬導線",
        "en": "Layers of metal wiring",
        "noteZh": "在上方逐層蓋出（BEOL）",
        "noteEn": "Built above, layer by layer (BEOL)"
      },
      {
        "zh": "一顆晶片",
        "en": "A chip"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "微縮：越做越小",
    "headingEn": "Scaling: making it smaller and smaller",
    "type": "flow",
    "captionZh": "電晶體微縮的好處、漏電問題與結構走向立體的因果。",
    "captionEn": "Why shrinking transistors led to leakage and a three-dimensional structure.",
    "steps": [
      {
        "zh": "電晶體越做越小",
        "en": "Transistors shrink",
        "noteZh": "更快、更省電、成本更低",
        "noteEn": "Faster, lower power, lower cost"
      },
      {
        "zh": "閘極難完全控制通道",
        "en": "Gate loses full control of channel",
        "noteZh": "縮小到一定程度後",
        "noteEn": "Once past a certain point"
      },
      {
        "zh": "關掉時仍有漏電",
        "en": "Current leaks even when off",
        "noteZh": "像水龍頭關不緊",
        "noteEn": "Like a faucet that will not shut tight"
      },
      {
        "zh": "結構從平面走向立體",
        "en": "From planar to three-dimensional"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三大元件物理定律各自推動的製程演進。",
    "captionEn": "How each device physics law drove a change in process technology.",
    "root": {
      "zh": "元件物理定量定律",
      "en": "Quantitative device physics laws"
    },
    "branches": [
      {
        "zh": "本質載子熱激發定律",
        "en": "Intrinsic carrier thermal law",
        "leafZh": "壓低堆疊接面溫度",
        "leafEn": "Cap junction temperature in stacks"
      },
      {
        "zh": "次臨界擺幅極限",
        "en": "Subthreshold swing limit",
        "leafZh": "催生 GAA 奈米片",
        "leafEn": "Drove the move to GAA nanosheets"
      },
      {
        "zh": "量子穿隧閘極漏電",
        "en": "Quantum tunneling gate leakage",
        "leafZh": "改用高介電材料",
        "leafEn": "Switch to high-k dielectric"
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "半導體能隙、Multi-Vt 與功耗概覽",
    "headingEn": "Bandgap, Multi-Vt & Power Overview",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "能隙、多重臨界電壓與 CMOS 功耗三類主題重點。",
    "captionEn": "Bandgap, Multi-Vt and CMOS power: key points of the three topics.",
    "columns": [
      {
        "titleZh": "能隙與載子遷移率",
        "titleEn": "Bandgap & carrier mobility",
        "items": [
          {
            "zh": "能隙決定耐溫與耐壓極限",
            "en": "Bandgap sets heat and voltage limits"
          },
          {
            "zh": "遷移率決定導通速度",
            "en": "Mobility sets conduction speed"
          },
          {
            "zh": "矽主導主流數位 CMOS",
            "en": "Silicon powers mainstream CMOS"
          },
          {
            "zh": "SiC、GaN 用於電源轉換",
            "en": "SiC and GaN for power conversion"
          }
        ],
        "icon": "bandgap"
      },
      {
        "titleZh": "多重臨界電壓與次臨界擺幅",
        "titleEn": "Multi-Vt & subthreshold swing",
        "items": [
          {
            "zh": "ULVT、LVT、SVT、HVT",
            "en": "ULVT, LVT, SVT, HVT flavors"
          },
          {
            "zh": "擺幅有室溫熱離子發射極限",
            "en": "Swing has a room-temperature thermionic limit"
          },
          {
            "zh": "降低 Vt 提速，但漏電暴增",
            "en": "Lower Vt: faster, but leakage soars"
          },
          {
            "zh": "改用功函數金屬與偶極調 Vt",
            "en": "Tune Vt with work-function metal and dipoles"
          }
        ],
        "icon": "threshold"
      },
      {
        "titleZh": "CMOS 功耗分量與對策",
        "titleEn": "CMOS power terms & countermeasures",
        "items": [
          {
            "zh": "動態切換功耗",
            "en": "Dynamic switching power",
            "noteZh": "與電壓平方成正比",
            "noteEn": "Scales with supply voltage squared"
          },
          {
            "zh": "瞬間短路功耗",
            "en": "Short-circuit power"
          },
          {
            "zh": "靜態漏電功耗",
            "en": "Static leakage power",
            "noteZh": "次臨界、閘極與接面漏電",
            "noteEn": "Subthreshold, gate and junction leakage"
          },
          {
            "zh": "HKMG 與 GAA 壓制漏電",
            "en": "HKMG and GAA suppress leakage"
          }
        ],
        "icon": "conductor"
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
      }
    ]
  },
  {
    "chapterId": "ch03",
    "headingZh": "從晶棒到晶圓",
    "headingEn": "From ingot to wafer",
    "type": "pictorial",
    "draw": "ingotToWafer",
    "captionZh": "晶棒依序加工成為可出貨晶圓的六個動作。",
    "captionEn": "The six operations that turn an ingot into a wafer ready to ship.",
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
      }
    ]
  },
  {
    "chapterId": "ch03",
    "headingZh": "特殊晶圓",
    "headingEn": "Special wafers",
    "type": "pictorial",
    "draw": "specialWafers",
    "captionZh": "一般拋光晶圓與兩種特殊晶圓的剖面，未按比例。",
    "captionEn": "Cross-sections of a polished wafer and two special wafers, not to scale.",
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
        "leafZh": "磁場控制長晶或改用磊晶矽片",
        "leafEn": "MCZ magnetic control or an epi wafer"
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
        "leafZh": "應力釋放拋光並貼附載片",
        "leafEn": "Stress-relief CMP on a temporary carrier"
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
    "type": "branch",
    "foldSection": true,
    "captionZh": "三大長晶與基板定律及其製程意義。",
    "captionEn": "Three crystal and substrate laws and what each means for the process.",
    "root": {
      "zh": "長晶與基板定量定律",
      "en": "Crystal & substrate laws"
    },
    "branches": [
      {
        "zh": "Voronkov 準則",
        "en": "Voronkov point-defect criterion",
        "leafZh": "評估原生點缺陷風險",
        "leafEn": "Assesses grown-in point-defect risk"
      },
      {
        "zh": "Scheil 摻質偏析",
        "en": "Scheil dopant segregation",
        "leafZh": "摻硼 P 型晶圓成邏輯主流",
        "leafEn": "Boron-doped P-type wafers dominate logic"
      },
      {
        "zh": "SFQR 與薄化 TTV",
        "en": "SFQR & thinning TTV",
        "leafZh": "超規致 EUV 失焦、鍵合氣泡",
        "leafEn": "Excess causes EUV defocus and bonding voids"
      }
    ]
  },
  {
    "chapterId": "ch04",
    "headingZh": "怎麼印得更小",
    "headingEn": "How to print smaller",
    "type": "compare",
    "captionZh": "沿用 193 nm 光源時，三種繼續縮小圖形的技巧",
    "captionEn": "Three tricks used to keep shrinking patterns during the 193 nm years",
    "columns": [
      {
        "titleZh": "浸潤式微影",
        "titleEn": "Immersion lithography",
        "items": [
          {
            "zh": "鏡頭與晶圓之間加一層水",
            "en": "A layer of water between lens and wafer"
          },
          {
            "zh": "解析能力再提升",
            "en": "Resolution improves further"
          }
        ]
      },
      {
        "titleZh": "OPC",
        "titleEn": "OPC",
        "items": [
          {
            "zh": "光通過極小圖形會變形",
            "en": "Light distorts through tiny patterns"
          },
          {
            "zh": "故意把光罩圖形畫歪",
            "en": "Mask patterns deliberately drawn wrong"
          },
          {
            "zh": "印出來剛好正確",
            "en": "So they print correctly"
          }
        ]
      },
      {
        "titleZh": "多重曝光",
        "titleEn": "Multiple patterning",
        "items": [
          {
            "zh": "拆成兩次或更多次曝光",
            "en": "Split into two or more exposures"
          },
          {
            "zh": "步驟與成本都增加",
            "en": "More steps and higher cost"
          }
        ]
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
    "type": "flow",
    "foldSection": true,
    "captionZh": "各世代微影依解析度由粗到細排列，並附主要用途。",
    "captionEn": "Lithography generations from coarse to fine resolution, with their main uses.",
    "steps": [
      {
        "zh": "紫外光 g／i-line",
        "en": "UV g-line / i-line",
        "noteZh": "焊墊、重佈線層與凸塊",
        "noteEn": "Pads, packaging RDL and micro-bumps"
      },
      {
        "zh": "深紫外光 KrF／ArF",
        "en": "DUV KrF / ArF",
        "noteZh": "上層金屬線與佈植遮罩",
        "noteEn": "Upper BEOL and ion implant masks"
      },
      {
        "zh": "浸潤式與多重圖形化",
        "en": "ArF immersion + multi-patterning",
        "noteZh": "DRAM 與 FinFET 鰭片",
        "noteEn": "DRAM and FinFET fins"
      },
      {
        "zh": "標準 NA 極紫外光",
        "en": "Low-NA EUV",
        "noteZh": "減少多重曝光光罩層數",
        "noteEn": "Fewer multi-patterning mask layers"
      },
      {
        "zh": "High-NA 極紫外光",
        "en": "High-NA EUV",
        "noteZh": "單次曝光取代雙重曝光",
        "noteEn": "Single exposure replaces double patterning"
      }
    ]
  },
  {
    "chapterId": "ch04",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "微影光學與統計定律各自推動的製程對策。",
    "captionEn": "How each lithography optical and stochastic law drives a process response.",
    "root": {
      "zh": "微影光學與統計定律",
      "en": "Litho optical & stochastic laws"
    },
    "branches": [
      {
        "zh": "瑞利解析度與焦深",
        "en": "Rayleigh resolution & DOF",
        "leafZh": "需極平坦 CMP 與超薄光阻",
        "leafEn": "Demands atomic-flat CMP and ultra-thin resist"
      },
      {
        "zh": "EUV 光子散粒雜訊",
        "en": "EUV photon shot noise",
        "leafZh": "導入金屬氧化物光阻",
        "leafEn": "Drives metal oxide resist (MOR) adoption"
      },
      {
        "zh": "邊緣放置誤差 EPE",
        "en": "Edge placement error (EPE)",
        "leafZh": "催生自對準接觸孔與通孔",
        "leafEn": "Drives self-aligned contacts and vias"
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
    "type": "branch",
    "foldSection": true,
    "captionZh": "薄膜三大核心異常與對應的永久防呆對策",
    "captionEn": "Three core thin-film failures and the countermeasure for each",
    "root": {
      "zh": "薄膜三大核心異常",
      "en": "Three core thin-film failures"
    },
    "branches": [
      {
        "zh": "孔口懸垂夾斷空洞",
        "en": "Overhang pinch-off keyhole void",
        "leafZh": "降溫、沉積蝕刻循環或 ALD",
        "leafEn": "Lower temperature, dep-etch-dep, or ALD"
      },
      {
        "zh": "深孔底部 ALD 變薄",
        "en": "ALD thinning at deep-hole bottoms",
        "leafZh": "駐留模式 ALD 並監控壓力",
        "leafEn": "Soak-mode ALD with pressure-pulse monitoring"
      },
      {
        "zh": "電鍍銅底部空洞",
        "en": "Electroplated copper bottom voids",
        "leafZh": "釕／鈷襯墊並即時補液",
        "leafEn": "Ru/Co liners and real-time additive dosing"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "六大薄膜沉積與電鍍超填條例總覽",
    "headingEn": "Thin-Film & ECD Superfill Clauses",
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "六大長膜條例依生長方式分三組，並附代表應用。",
    "captionEn": "The six film-growth clauses grouped by growth route, with key applications.",
    "columns": [
      {
        "titleZh": "從矽晶長出",
        "titleEn": "Grown from the Si crystal",
        "items": [
          {
            "keyZh": "熱氧化",
            "keyEn": "Thermal oxide",
            "zh": "消耗矽基板自體生成",
            "en": "Grows by consuming the Si substrate",
            "noteZh": "I/O 閘極與溝槽內襯氧化層",
            "noteEn": "I/O gate oxides and STI liner oxide"
          },
          {
            "keyZh": "磊晶",
            "keyEn": "Epitaxy",
            "zh": "延續單晶晶格，可選擇性生長",
            "en": "Extends the crystal lattice, can be selective",
            "noteZh": "源汲極應變磊晶與超晶格",
            "noteEn": "Strained S/D epi and Si/SiGe superlattices"
          }
        ]
      },
      {
        "titleZh": "氣相沉積",
        "titleEn": "Vapor-phase deposition",
        "items": [
          {
            "keyZh": "CVD 家族",
            "keyEn": "CVD family",
            "zh": "低壓保形、電漿低溫、流動填孔",
            "en": "LPCVD conformal, PECVD low-temp, FCVD gap-fill",
            "noteZh": "ONO 堆疊與溝槽填充",
            "noteEn": "ONO stacks and STI gap-fill"
          },
          {
            "keyZh": "ALD",
            "keyEn": "ALD",
            "zh": "自限性循環，原子級保形覆蓋",
            "en": "Self-limiting cycles, atomic-level conformality",
            "noteZh": "高介電閘極、GAA 與電容",
            "noteEn": "High-k gates, GAA and capacitors"
          },
          {
            "keyZh": "PVD",
            "keyEn": "PVD",
            "zh": "視線傳播，iPVD 改善深孔覆蓋",
            "en": "Line of sight; iPVD improves deep-via coverage",
            "noteZh": "阻擋層、銅晶種層與鋁墊",
            "noteEn": "Barriers, Cu seed layers and Al pads"
          }
        ]
      },
      {
        "titleZh": "液相電鍍",
        "titleEn": "Liquid-phase plating",
        "items": [
          {
            "keyZh": "電鍍超填",
            "keyEn": "ECD superfill",
            "zh": "添加劑驅動由孔底往上填銅",
            "en": "Additives drive bottom-up Cu fill",
            "noteZh": "銅導線、穿矽孔與重佈線層",
            "noteEn": "Cu wires, TSV fill and RDL routing"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "foldTables": true,
    "type": "branch",
    "foldSection": true,
    "captionZh": "三大薄膜與電鍍定律各自決定的製程控制。",
    "captionEn": "What each thin-film and electroplating law governs in the process.",
    "root": {
      "zh": "薄膜與電鍍動力學定律",
      "en": "Thin-film & ECD kinetic laws",
      "icon": "formula"
    },
    "branches": [
      {
        "zh": "線性－拋物線氧化模型",
        "en": "Deal-Grove linear-parabolic law",
        "leafZh": "預測氧化層厚度與矽消耗",
        "leafEn": "Predicts oxide thickness and Si consumed",
        "icon": "thickness"
      },
      {
        "zh": "ALD 深孔飽和時間",
        "en": "ALD deep-hole saturation time",
        "leafZh": "決定深孔 ALD 最低脈衝時間",
        "leafEn": "Sets minimum ALD pulse time in deep holes",
        "icon": "clock"
      },
      {
        "zh": "法拉第與曲率加速超填",
        "en": "Faraday & curvature-enhanced fill",
        "leafZh": "孔底長得比孔口快、無空洞",
        "leafEn": "Bottom outgrows the mouth: void-free fill",
        "icon": "fill-up"
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
    "foldTables": true,
    "type": "compare",
    "foldSection": true,
    "captionZh": "三項真實微縮標尺與兩種協同最佳化",
    "captionEn": "Three true scaling metrics and two co-optimization strategies.",
    "columns": [
      {
        "titleZh": "真實微縮標尺",
        "titleEn": "True scaling metrics",
        "items": [
          {
            "keyZh": "CPP",
            "keyEn": "CPP",
            "zh": "相鄰閘極中心距，決定 X 軸密度",
            "en": "Gate-to-gate pitch; sets X-axis density",
            "noteZh": "最誠實的前段微縮尺規",
            "noteEn": "Ground-truth metric for FEOL scaling"
          },
          {
            "keyZh": "金屬節距",
            "keyEn": "Metal pitch",
            "zh": "最底層金屬節距，決定 Y 軸佈線密度",
            "en": "Lowest-level metal pitch; sets Y-axis routing",
            "noteZh": "反映 EUV 解析度與後段微縮",
            "noteEn": "Reflects EUV resolution and BEOL scaling"
          },
          {
            "keyZh": "軌道高度",
            "keyEn": "Track height",
            "zh": "單元高度等於軌道數乘金屬節距",
            "en": "Cell height is tracks times metal pitch",
            "noteZh": "減少軌道數仍可縮小邏輯面積",
            "noteEn": "Fewer tracks still shrink logic area"
          }
        ]
      },
      {
        "titleZh": "DTCO 與 STCO",
        "titleEn": "DTCO & STCO",
        "items": [
          {
            "keyZh": "DTCO",
            "keyEn": "DTCO",
            "zh": "單擴散斷開、埋入電源軌與背面供電",
            "en": "SDB, buried power rails, backside power",
            "noteZh": "靠單元結構重組延續摩爾定律",
            "noteEn": "Extends Moore's Law via cell restructuring"
          },
          {
            "keyZh": "STCO",
            "keyEn": "STCO",
            "zh": "SoC 拆成按功能最佳化的小晶片",
            "en": "SoC split into node-optimized chiplets",
            "noteZh": "以立體整合突破曝光視場極限",
            "noteEn": "Stacking breaks the reticle limit"
          }
        ]
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
        "en": "everything looks normal"
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
        "en": "the higher the Cpk"
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
        "en": "treated as suspect"
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
        "en": "a material review board (MRB) meets"
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
        "en": "it must be confirmed that the same problem will not happen again"
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
    "sourceZh": "節距與針數出自本段表格；探針疏密只是定性示意。懸臂式的適用節距（≥ 80–150 µm）尚待查證，圖中不標。",
    "sourceEn": "Pitches and pin counts come from the table in this section; probe density is qualitative only. The cantilever pitch (≥ 80–150 µm) is not shown until it is verified.",
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
    "sourcedNumbers": true,
    "sourceZh": "間距出自本段兩張表格，橫軸為對數刻度；虛線空心色條是通孔節距（TGV、層間通孔），不是晶片之間的接點；箭頭端表示範圍沒有下限或上限。覆晶凸塊的細分範圍見第 20 章。",
    "sourceEn": "Pitches come from the two tables in this section, on a log scale. Hollow dashed bars are via pitches (TGV and inter-tier vias), not die-to-die contacts. Arrow ends mark open-ended ranges. Chapter 20 breaks down flip-chip bump pitches.",
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
    "type": "flow",
    "captionZh": "最終測試中晶片的測試與分級順序",
    "captionEn": "The final test sequence: handler loading, testing and binning.",
    "steps": [
      {
        "zh": "分類機放入測試座",
        "en": "Handler places chips in sockets"
      },
      {
        "zh": "功能與電性測試",
        "en": "Functional and electrical tests",
        "noteZh": "高溫與低溫分別測試",
        "noteEn": "At both high and low temperatures"
      },
      {
        "zh": "依速度或功耗分級",
        "en": "Bin by speed or power",
        "noteZh": "可能以不同規格出售",
        "noteEn": "May be sold under different specifications"
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
    "type": "branch",
    "captionZh": "長期電流、電壓與溫度造成的晶片老化機制",
    "captionEn": "Chip aging mechanisms driven by long-term current, voltage and temperature.",
    "root": {
      "zh": "電流、電壓與溫度",
      "en": "Current, voltage and temperature"
    },
    "branches": [
      {
        "zh": "電遷移（EM）",
        "en": "Electromigration (EM)",
        "leafZh": "導線形成空洞而斷線",
        "leafEn": "Voids form and break the wire"
      },
      {
        "zh": "介電層崩潰（TDDB）",
        "en": "Dielectric breakdown (TDDB)",
        "leafZh": "絕緣層最後被擊穿",
        "leafEn": "Insulating layer breaks down"
      },
      {
        "zh": "熱載子效應（HCI）",
        "en": "Hot carrier injection (HCI)",
        "leafZh": "電晶體特性改變",
        "leafEn": "Transistor characteristics change"
      },
      {
        "zh": "偏壓溫度不穩定（BTI）",
        "en": "Bias temperature instability (BTI)",
        "leafZh": "Vt 隨時間漂移",
        "leafEn": "Vt drifts over time"
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
    "type": "compare",
    "captionZh": "Stepping 字母與數字改變的常見慣例，依公司而定",
    "captionEn": "Common stepping convention for letter vs number changes; rules vary by company",
    "columns": [
      {
        "titleZh": "字母改變",
        "titleEn": "Letter change",
        "items": [
          {
            "zh": "底層電晶體也有修改",
            "en": "Bottom transistors also changed"
          },
          {
            "zh": "需要重做大部分光罩",
            "en": "Most masks must be remade"
          },
          {
            "zh": "底層光罩最多、最貴",
            "en": "Bottom masks: most numerous, most expensive"
          },
          {
            "zh": "底層製程時間最長",
            "en": "Bottom layers take the longest to process"
          }
        ]
      },
      {
        "titleZh": "數字改變",
        "titleEn": "Number change",
        "items": [
          {
            "zh": "只修改上層金屬導線",
            "en": "Only the upper metal wiring changed"
          },
          {
            "zh": "只改上層幾道金屬層光罩",
            "en": "Only a few upper metal-layer masks"
          },
          {
            "zh": "把備用邏輯閘接進電路",
            "en": "Connects spare logic gates into the circuit"
          },
          {
            "zh": "省下大量成本和時間",
            "en": "Saves a great deal of cost and time"
          }
        ]
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
  }
];
