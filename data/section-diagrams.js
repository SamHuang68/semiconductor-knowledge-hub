// 段落流程圖與結構圖規格：依 chapterId 與 h2 標題（中英文）插入；繪製見 section-diagrams.js。
// 規則：標籤取自該段正文、不另編數字；圖內文字不得含阿拉伯數字；正文文字不因加圖而刪減。
// 由設計者依段落正文提案，經獨立查核者逐張比對正文後保留或修正；檢查見 scripts/test-section-diagrams.mjs。
export const SECTION_DIAGRAMS = [
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
        "en": "Deposit a material"
      },
      {
        "zh": "用微影定義圖形",
        "en": "Define a pattern with lithography"
      },
      {
        "zh": "蝕刻或佈植",
        "en": "Etch or implant"
      },
      {
        "zh": "清洗",
        "en": "Clean"
      },
      {
        "zh": "量測",
        "en": "Measure"
      }
    ],
    "centerZh": "逐層重複",
    "centerEn": "Repeated layer by layer"
  },
  {
    "chapterId": "ch00",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "type": "flow",
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
    "type": "branch",
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
    "chapterId": "ch02",
    "headingZh": "摻雜：N 型與 P 型",
    "headingEn": "Doping: N-type and P-type",
    "type": "compare",
    "captionZh": "純矽與 N 型、P 型矽在摻雜與外層電子上的差別。",
    "captionEn": "How pure, N-type and P-type silicon differ in dopant and outer electrons.",
    "columns": [
      {
        "titleZh": "純矽",
        "titleEn": "Pure silicon",
        "items": [
          {
            "zh": "未加入其他元素",
            "en": "No other element added"
          },
          {
            "zh": "矽原子最外層有四個電子",
            "en": "Silicon atom has four outer electrons"
          },
          {
            "zh": "導電能力很差",
            "en": "Conducts poorly"
          }
        ]
      },
      {
        "titleZh": "N 型",
        "titleEn": "N-type",
        "items": [
          {
            "zh": "加入磷或砷",
            "en": "Phosphorus or arsenic added"
          },
          {
            "zh": "雜質最外層有五個電子",
            "en": "Impurity has five outer electrons"
          },
          {
            "zh": "多出可自由移動的電子",
            "en": "One extra electron moves freely"
          }
        ]
      },
      {
        "titleZh": "P 型",
        "titleEn": "P-type",
        "items": [
          {
            "zh": "加入硼",
            "en": "Boron added"
          },
          {
            "zh": "雜質最外層有三個電子",
            "en": "Impurity has three outer electrons"
          },
          {
            "zh": "少一個電子，留下電洞",
            "en": "One electron missing leaves a hole"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch02",
    "headingZh": "NMOS、PMOS 與 CMOS",
    "headingEn": "NMOS, PMOS and CMOS",
    "type": "compare",
    "captionZh": "CMOS 中成對使用的 NMOS 與 PMOS 對照。",
    "captionEn": "NMOS and PMOS, the pair used together in CMOS, side by side.",
    "columns": [
      {
        "titleZh": "NMOS",
        "titleEn": "NMOS",
        "items": [
          {
            "zh": "靠電子導電",
            "en": "Conducts with electrons"
          },
          {
            "zh": "閘極加高電壓時打開",
            "en": "Turns on at high gate voltage"
          },
          {
            "zh": "做在 P 型區域（P 井）",
            "en": "Built in P-type regions (P-wells)"
          }
        ]
      },
      {
        "titleZh": "PMOS",
        "titleEn": "PMOS",
        "items": [
          {
            "zh": "靠電洞導電",
            "en": "Conducts with holes"
          },
          {
            "zh": "閘極加低電壓時打開",
            "en": "Turns on at low gate voltage"
          },
          {
            "zh": "做在 N 型區域（N 井）",
            "en": "Built in N-type regions (N-wells)"
          }
        ]
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
    "type": "branch",
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
    "chapterId": "ch03",
    "headingZh": "從沙子到高純度多晶矽",
    "headingEn": "From sand to high-purity polysilicon",
    "type": "flow",
    "captionZh": "石英砂純化成電子級多晶矽、再進入長晶的順序",
    "captionEn": "Purifying quartz sand into electronic-grade polysilicon before crystal growth",
    "steps": [
      {
        "zh": "冶金級矽",
        "en": "Metallurgical-grade silicon",
        "noteZh": "石英砂與碳經電弧爐去氧",
        "noteEn": "Sand + carbon in arc furnace, oxygen removed"
      },
      {
        "zh": "與氯化氫反應",
        "en": "React with hydrogen chloride",
        "noteZh": "變成易揮發的含氯化合物",
        "noteEn": "Forms a volatile chlorine compound"
      },
      {
        "zh": "多次蒸餾",
        "en": "Distill many times",
        "noteZh": "去除雜質",
        "noteEn": "Removes impurities"
      },
      {
        "zh": "高溫分解",
        "en": "Decompose at high temperature",
        "noteZh": "沉積回固態的矽",
        "noteEn": "Deposits solid silicon again"
      },
      {
        "zh": "電子級多晶矽",
        "en": "Electronic-grade polysilicon",
        "noteZh": "很純但原子排列雜亂",
        "noteEn": "Very pure, but atoms point many ways"
      },
      {
        "zh": "長晶",
        "en": "Crystal growth",
        "noteZh": "變成排列整齊的單晶矽",
        "noteEn": "Becomes neatly ordered single crystal"
      }
    ]
  },
  {
    "chapterId": "ch03",
    "headingZh": "從晶棒到晶圓",
    "headingEn": "From ingot to wafer",
    "type": "flow",
    "captionZh": "晶棒依序加工成為可出貨晶圓的流程",
    "captionEn": "The steps that turn an ingot into a wafer ready to ship",
    "steps": [
      {
        "zh": "晶棒整形",
        "en": "Shape the ingot",
        "noteZh": "切頭尾、磨外徑、刻晶格方向記號",
        "noteEn": "Cut ends, grind diameter, mark orientation"
      },
      {
        "zh": "切片",
        "en": "Slice",
        "noteZh": "線鋸一次切成數百片",
        "noteEn": "A wire saw cuts hundreds at once"
      },
      {
        "zh": "研磨與倒角",
        "en": "Lap and edge-round",
        "noteZh": "表面磨平、邊緣磨圓避免崩裂",
        "noteEn": "Grind flat; round edges to avoid chipping"
      },
      {
        "zh": "蝕刻",
        "en": "Etch",
        "noteZh": "化學去除表面損傷層",
        "noteEn": "Chemicals remove the damaged surface layer"
      },
      {
        "zh": "拋光",
        "en": "Polish",
        "noteZh": "表面像鏡子一樣平滑",
        "noteEn": "Smooth as a mirror"
      },
      {
        "zh": "清洗與檢驗",
        "en": "Clean and inspect",
        "noteZh": "查平坦度、微粒與金屬污染",
        "noteEn": "Flatness, particles, metal contamination"
      }
    ]
  },
  {
    "chapterId": "ch03",
    "headingZh": "特殊晶圓",
    "headingEn": "Special wafers",
    "type": "compare",
    "captionZh": "兩種常見特殊晶圓的結構與用途對照",
    "captionEn": "Structure and use of the two common special wafer types",
    "columns": [
      {
        "titleZh": "磊晶晶圓",
        "titleEn": "Epitaxial wafer",
        "items": [
          {
            "zh": "拋光晶圓表面再長一層單晶矽",
            "en": "Single-crystal silicon grown on a polished wafer"
          },
          {
            "zh": "新長的單晶矽品質更好",
            "en": "The added layer is higher quality"
          }
        ]
      },
      {
        "titleZh": "SOI 晶圓",
        "titleEn": "SOI wafer",
        "items": [
          {
            "zh": "薄矽下面埋一層絕緣層",
            "en": "Insulating layer buried under thin silicon"
          },
          {
            "zh": "可以減少漏電",
            "en": "Reduces leakage"
          },
          {
            "zh": "常用在射頻等特殊產品",
            "en": "Often used in special products such as RF"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch03",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "type": "branch",
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
    "type": "compare",
    "captionZh": "微影工程師最常講的兩個詞：CD 與 Overlay",
    "captionEn": "CD and overlay, the two terms lithography engineers use most",
    "columns": [
      {
        "titleZh": "CD 關鍵尺寸",
        "titleEn": "CD (critical dimension)",
        "items": [
          {
            "zh": "圖形最需要控制的尺寸",
            "en": "The pattern dimension that most needs control"
          },
          {
            "zh": "例如線寬",
            "en": "For example, line width"
          },
          {
            "zh": "不等於製程節點的奈米",
            "en": "Not the nanometer in a node name"
          }
        ]
      },
      {
        "titleZh": "Overlay 對準誤差",
        "titleEn": "Overlay",
        "items": [
          {
            "zh": "這一層與前一層的對準誤差",
            "en": "Alignment error to the previous layer"
          },
          {
            "zh": "先進製程只容許幾奈米",
            "en": "Advanced processes allow only a few nanometers"
          },
          {
            "zh": "偏掉會斷路或短路",
            "en": "A shift can cause opens or shorts"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch04",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "type": "branch",
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
    "chapterId": "ch05",
    "headingZh": "熱氧化：讓矽自己長出氧化層",
    "headingEn": "Thermal oxidation: letting silicon grow its own oxide",
    "type": "compare",
    "captionZh": "乾式與濕式熱氧化的氣體、生長速度與特點對照",
    "captionEn": "Dry and wet thermal oxidation compared by gas, growth speed and main traits",
    "columns": [
      {
        "titleZh": "乾式氧化",
        "titleEn": "Dry oxidation",
        "items": [
          {
            "zh": "使用氧氣",
            "en": "Uses oxygen"
          },
          {
            "zh": "生長慢",
            "en": "Grows slowly"
          },
          {
            "zh": "品質非常好",
            "en": "Excellent quality"
          }
        ]
      },
      {
        "titleZh": "濕式氧化",
        "titleEn": "Wet oxidation",
        "items": [
          {
            "zh": "使用水蒸氣",
            "en": "Uses steam"
          },
          {
            "zh": "生長快",
            "en": "Grows fast"
          },
          {
            "zh": "適合需要較厚氧化層處",
            "en": "Suits places that need thicker oxide"
          }
        ]
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
        "noteEn": "Strike the target in a vacuum chamber"
      },
      {
        "zh": "靶材原子被撞出",
        "en": "Atoms knocked off the target"
      },
      {
        "zh": "飛到晶圓上",
        "en": "Atoms fly onto the wafer"
      },
      {
        "zh": "堆積成薄膜",
        "en": "Build up a film",
        "noteZh": "主要是鋁、鈦等金屬",
        "noteEn": "Mainly metals such as aluminum, titanium"
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
        "noteEn": "Covers one layer, then stops by itself"
      },
      {
        "zh": "抽乾淨",
        "en": "Purge the chamber"
      },
      {
        "zh": "通入第二種氣體",
        "en": "Second gas flows in",
        "noteZh": "與表面那層反應",
        "noteEn": "Reacts with that layer"
      }
    ],
    "centerZh": "每一輪約長一層原子",
    "centerEn": "About one atomic layer per cycle"
  },
  {
    "chapterId": "ch05",
    "headingZh": "薄膜要看哪些指標",
    "headingEn": "What to measure in a thin film",
    "type": "branch",
    "captionZh": "階梯覆蓋的常見混淆：填窄溝時兩種長法的結果",
    "captionEn": "Step coverage pitfall: two ways to fill a narrow trench and their results",
    "root": {
      "zh": "填滿窄溝時",
      "en": "Filling a narrow trench"
    },
    "branches": [
      {
        "zh": "側壁同時長厚",
        "en": "Sidewalls thicken at the same rate",
        "leafZh": "開口可能先封住而留下空洞",
        "leafEn": "The opening may close first, leaving a void"
      },
      {
        "zh": "從底部往上長",
        "en": "Grow from the bottom up",
        "leafZh": "填溝時反而希望如此",
        "leafEn": "What you actually want for gap fill"
      }
    ]
  },
  {
    "chapterId": "ch05",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "type": "branch",
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
    "chapterId": "ch06",
    "headingZh": "蝕刻在做什麼",
    "headingEn": "What etching does",
    "type": "branch",
    "captionZh": "蝕刻時光阻蓋住與未蓋住區域的不同結果",
    "captionEn": "What happens to covered and uncovered areas when the pattern is etched",
    "root": {
      "zh": "蝕刻轉印光阻圖形",
      "en": "Etch transfers the resist pattern",
      "noteZh": "微影後圖形只在光阻上",
      "noteEn": "Pattern exists only in the resist"
    },
    "branches": [
      {
        "zh": "被光阻蓋住的地方",
        "en": "Areas covered by resist",
        "leafZh": "受到保護",
        "leafEn": "Protected"
      },
      {
        "zh": "沒被光阻蓋住的地方",
        "en": "Areas not covered",
        "leafZh": "被去除",
        "leafEn": "Removed"
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
        "noteEn": "Oxygen plasma burns off the resist"
      },
      {
        "zh": "清洗",
        "en": "Clean"
      },
      {
        "zh": "AEI 蝕刻後檢查",
        "en": "After etch inspection (AEI)",
        "noteZh": "量測線寬與缺陷",
        "noteEn": "Measure line width and defects"
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
    "type": "branch",
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
    "chapterId": "ch07",
    "headingZh": "兩個最重要的參數",
    "headingEn": "The two most important parameters",
    "type": "compare",
    "captionZh": "劑量決定濃度，能量決定深度",
    "captionEn": "Dose sets the concentration; energy sets the depth.",
    "columns": [
      {
        "titleZh": "劑量",
        "titleEn": "Dose",
        "items": [
          {
            "zh": "每單位面積植入的原子數",
            "en": "Atoms implanted per unit area"
          },
          {
            "zh": "決定摻雜的濃度",
            "en": "Sets the doping concentration"
          },
          {
            "zh": "原子數量由劑量決定",
            "en": "The number of atoms is set by dose"
          }
        ]
      },
      {
        "titleZh": "能量",
        "titleEn": "Energy",
        "items": [
          {
            "zh": "離子的速度有多快",
            "en": "How fast the ions travel"
          },
          {
            "zh": "決定打得多深",
            "en": "Sets how deep they go"
          },
          {
            "zh": "越高越深，不是原子更多",
            "en": "Higher means deeper, not more atoms"
          }
        ]
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
        "en": "Ions slam into the silicon"
      },
      {
        "zh": "矽原子被撞亂",
        "en": "Silicon atoms knocked out of place",
        "noteZh": "雜質尚未就定位",
        "noteEn": "Impurities not yet in position"
      },
      {
        "zh": "退火：加熱晶圓",
        "en": "Anneal: heat the wafer"
      },
      {
        "zh": "晶格修復、雜質就定位",
        "en": "Lattice repairs; impurities settle",
        "noteZh": "開始導電，稱為活化",
        "noteEn": "They start conducting: activation"
      }
    ]
  },
  {
    "chapterId": "ch07",
    "headingZh": "熱預算：加熱是有額度的",
    "headingEn": "Thermal budget: heat comes with a limit",
    "type": "flow",
    "captionZh": "每次高溫都讓雜質再擴散，最終影響電性",
    "captionEn": "Every high-temperature step adds diffusion, leading to leakage and Vt shift.",
    "steps": [
      {
        "zh": "每一次高溫步驟",
        "en": "Every high-temperature step"
      },
      {
        "zh": "雜質再擴散一點",
        "en": "Implanted impurities diffuse more",
        "noteZh": "擴散會累積",
        "noteEn": "Diffusion adds up"
      },
      {
        "zh": "先前的摻雜區變形",
        "en": "Earlier doped regions distort",
        "noteZh": "源汲極摻雜太深、太寬",
        "noteEn": "Source/drain doping too deep and wide"
      },
      {
        "zh": "漏電變大、Vt 偏移",
        "en": "Leakage goes up, Vt shifts"
      }
    ]
  },
  {
    "chapterId": "ch07",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "type": "flow",
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
    "type": "branch",
    "captionZh": "補不補假圖形，決定 CMP 能否磨平",
    "captionEn": "Whether dummy fill is added decides whether CMP polishes flat.",
    "root": {
      "zh": "圖形太少的空曠區域",
      "en": "Empty areas with few patterns",
      "noteZh": "研磨速度與圖形密度有關",
      "noteEn": "Polishing rate depends on pattern density"
    },
    "branches": [
      {
        "zh": "補上假圖形",
        "en": "Dummy fill added",
        "leafZh": "密度平均，磨得均勻",
        "leafEn": "Even density, even polishing"
      },
      {
        "zh": "不補假圖形",
        "en": "No dummy fill",
        "leafZh": "表面不平，失焦或短路",
        "leafEn": "Uneven surface: defocus or shorts"
      }
    ]
  },
  {
    "chapterId": "ch08",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "type": "branch",
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
    "type": "flow",
    "captionZh": "微量銅如何演變成大範圍良率損失",
    "captionEn": "How a trace of copper in a front-end tool turns into widespread yield loss.",
    "steps": [
      {
        "zh": "微量銅帶進前段機台",
        "en": "Copper carried into front-end tool"
      },
      {
        "zh": "污染之後經過的所有晶圓",
        "en": "Contaminates every later wafer"
      },
      {
        "zh": "銅跑進電晶體區域",
        "en": "Copper reaches the transistor area",
        "noteZh": "銅在矽中擴散極快",
        "noteEn": "Copper diffuses very fast in silicon"
      },
      {
        "zh": "電晶體漏電、良率大降",
        "en": "Transistors leak, yield drops",
        "noteZh": "源頭很難追查",
        "noteEn": "Source is very hard to trace"
      }
    ]
  },
  {
    "chapterId": "ch09",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "type": "branch",
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
    "type": "branch",
    "captionZh": "導線變細帶來的兩大問題",
    "captionEn": "Two problems that grow as wires get thinner.",
    "root": {
      "zh": "導線越做越細",
      "en": "Wires get thinner"
    },
    "branches": [
      {
        "zh": "電阻變高",
        "en": "Higher resistance",
        "leafZh": "阻障層占比大、電子易散射",
        "leafEn": "Barrier share up, more scattering"
      },
      {
        "zh": "電遷移",
        "en": "Electromigration",
        "leafZh": "原子被推走，形成空洞斷線",
        "leafEn": "Atoms pushed out; voids break wire"
      }
    ]
  },
  {
    "chapterId": "ch10",
    "headingZh": "定量物理定律與 3D 製程視窗",
    "headingEn": "Quantitative Governing Laws & 3D Process Windows",
    "type": "branch",
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
    "chapterId": "ch12",
    "headingZh": "平面電晶體的極限",
    "headingEn": "The limits of the planar transistor",
    "type": "branch",
    "captionZh": "平面電晶體縮小後的兩個漏電問題",
    "captionEn": "The two leakage problems that appear as planar transistors shrink.",
    "root": {
      "zh": "平面電晶體縮小",
      "en": "Shrinking planar transistors",
      "noteZh": "解法：換材料、換結構",
      "noteEn": "Fixes: change materials, change structure"
    },
    "branches": [
      {
        "zh": "閘極只從上方控制",
        "en": "Gate controls only from above",
        "leafZh": "下方深處電流偷溜過去",
        "leafEn": "Current sneaks through deeper down"
      },
      {
        "zh": "絕緣層越做越薄",
        "en": "Gate insulator keeps thinning",
        "leafZh": "電子直接穿過，造成漏電",
        "leafEn": "Electrons tunnel through: leakage"
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
    "type": "flow",
    "captionZh": "GAA 奈米片的關鍵製程順序",
    "captionEn": "The key process sequence for building GAA nanosheet transistors.",
    "steps": [
      {
        "zh": "交替磊晶矽與矽鍺",
        "en": "Alternate silicon and SiGe epitaxy"
      },
      {
        "zh": "做出鰭狀結構",
        "en": "Form fin-shaped stacks"
      },
      {
        "zh": "做假閘極",
        "en": "Build dummy gate"
      },
      {
        "zh": "做內側間隔物",
        "en": "Form inner spacers"
      },
      {
        "zh": "挖掉矽鍺、釋放通道",
        "en": "Remove SiGe, release channels",
        "noteZh": "最關鍵的一步，高選擇比蝕刻",
        "noteEn": "Most critical: high-selectivity etch"
      },
      {
        "zh": "填入閘極材料",
        "en": "Fill in the gate",
        "noteZh": "ALD 把絕緣層與金屬填入縫隙",
        "noteEn": "ALD fills insulator and metal between sheets"
      }
    ]
  },
  {
    "chapterId": "ch12",
    "headingZh": "背面供電：把電源線搬到背面",
    "headingEn": "Backside power delivery: moving the power lines to the back",
    "type": "flow",
    "captionZh": "背面供電把電源網路搬到晶圓背面的步驟",
    "captionEn": "The steps that move the power network to the back of the wafer.",
    "steps": [
      {
        "zh": "正面接合承載晶圓",
        "en": "Bond front to a carrier wafer"
      },
      {
        "zh": "翻過來",
        "en": "Flip the stack over"
      },
      {
        "zh": "磨薄原本的晶圓",
        "en": "Thin the original wafer",
        "noteZh": "磨到極薄",
        "noteEn": "Until it is extremely thin"
      },
      {
        "zh": "背面做出電源導線",
        "en": "Build power wiring on the back"
      },
      {
        "zh": "正面留給訊號線",
        "en": "Front left for signal wiring",
        "noteZh": "電源也更穩定",
        "noteEn": "Power supply more stable"
      }
    ]
  },
  {
    "chapterId": "ch13",
    "headingZh": "HBM：把 DRAM 疊起來",
    "headingEn": "HBM: stacking DRAM",
    "type": "flow",
    "captionZh": "製作 HBM 的主要步驟",
    "captionEn": "The main steps in making HBM.",
    "steps": [
      {
        "zh": "做出 TSV",
        "en": "Build the TSVs",
        "noteZh": "穿過晶片的垂直導線",
        "noteEn": "Vertical wires through the dies"
      },
      {
        "zh": "晶圓磨薄",
        "en": "Thin the wafers",
        "noteZh": "只剩幾十微米",
        "noteEn": "Down to a few dozen micrometers"
      },
      {
        "zh": "做出微小凸塊",
        "en": "Form tiny bumps"
      },
      {
        "zh": "堆疊並接合晶片",
        "en": "Stack and bond the dies",
        "noteZh": "多顆 DRAM 晶片垂直疊起",
        "noteEn": "Several DRAM dies stacked vertically"
      }
    ]
  },
  {
    "chapterId": "ch13",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "type": "branch",
    "captionZh": "記憶體三大致命異常與表中列出的一項對策",
    "captionEn": "Three critical memory failure modes and one listed countermeasure for each.",
    "root": {
      "zh": "記憶體致命異常",
      "en": "Critical memory failure modes"
    },
    "branches": [
      {
        "zh": "DRAM 保持時間變異",
        "en": "DRAM variable retention time",
        "leafZh": "晶粒內建 ECC",
        "leafEn": "On-die ECC"
      },
      {
        "zh": "NAND 字元線置換空洞",
        "en": "NAND wordline replacement voids",
        "leafZh": "無氟 ALD 鉬取代鎢",
        "leafEn": "Fluorine-free ALD Mo instead of W"
      },
      {
        "zh": "HBM 微凸塊橋接",
        "en": "HBM micro-bump solder bridging",
        "leafZh": "無凸塊銅對銅混合鍵合",
        "leafEn": "Bumpless Cu-Cu hybrid bonding"
      }
    ]
  },
  {
    "chapterId": "ch14",
    "headingZh": "名稱的由來",
    "headingEn": "Where the names came from",
    "type": "flow",
    "captionZh": "節點名稱從對應實際尺寸到變成世代代號",
    "captionEn": "How node names went from matching real dimensions to being generation labels.",
    "steps": [
      {
        "zh": "名稱對應實際尺寸",
        "en": "Names match real dimensions",
        "noteZh": "約等於閘極長度或線寬",
        "noteEn": "About the gate length or densest line width"
      },
      {
        "zh": "每代按比例縮小",
        "en": "Shrink every generation",
        "noteZh": "面積約減半，電晶體加倍",
        "noteEn": "Area roughly halves, twice the transistors"
      },
      {
        "zh": "結構越來越複雜",
        "en": "Structures grow more complex",
        "noteZh": "實際尺寸跟不上名稱",
        "noteEn": "Real dimensions can't keep up with names"
      },
      {
        "zh": "名稱與尺寸脫鉤",
        "en": "Names and dimensions come apart"
      },
      {
        "zh": "部分改用「埃」命名",
        "en": "Some switch to angstroms",
        "noteZh": "同樣只是世代代號",
        "noteEn": "Likewise just generation labels"
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
      "noteEn": "No common standard; each names its own"
    },
    "branches": [
      {
        "zh": "名稱相同",
        "en": "Same name",
        "leafZh": "密度可能差很多",
        "leafEn": "Density can differ a lot"
      },
      {
        "zh": "名稱數字較大",
        "en": "Larger number in the name",
        "leafZh": "密度可能反而更高",
        "leafEn": "Can even be denser"
      },
      {
        "zh": "同一世代多個版本",
        "en": "Several versions per generation",
        "leafZh": "特性不完全相同",
        "leafEn": "Characteristics not all the same"
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
        ]
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
        ]
      }
    ]
  },
  {
    "chapterId": "ch14",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "type": "branch",
    "captionZh": "三大 DTCO 瓶頸與表中列出的一項對策",
    "captionEn": "Three primary DTCO failure modes and one listed countermeasure for each.",
    "root": {
      "zh": "三大 DTCO 瓶頸",
      "en": "Three primary DTCO failure modes"
    },
    "branches": [
      {
        "zh": "矮單元繞線擁塞與壓降",
        "en": "Low-track cell congestion, IR drop",
        "leafZh": "電源移到晶圓背面",
        "leafEn": "Move power to the wafer backside"
      },
      {
        "zh": "導線與通孔電阻暴增",
        "en": "Interconnect resistivity explosion",
        "leafZh": "改用釕、鉬無阻障金屬",
        "leafEn": "Barrierless Ru or Mo"
      },
      {
        "zh": "光罩錯誤增強因子失控",
        "en": "MEEF runaway",
        "leafZh": "High-NA EUV",
        "leafEn": "High-NA EUV"
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
        "en": "An important step is done"
      },
      {
        "zh": "機台確認",
        "en": "Tools check the wafer",
        "noteZh": "厚度、線寬、有沒有缺陷",
        "noteEn": "Thickness, line width, any defects"
      },
      {
        "zh": "產生數據",
        "en": "Data is produced",
        "noteZh": "製程控制與良率分析的基礎",
        "noteEn": "Basis of process control and yield analysis"
      },
      {
        "zh": "決定晶圓能否往下走",
        "en": "Decide whether the wafer moves on"
      }
    ]
  },
  {
    "chapterId": "ch15",
    "headingZh": "抽樣：不是每片都量",
    "headingEn": "Sampling: not every wafer is measured",
    "type": "compare",
    "captionZh": "抽樣比例是在風險與成本之間取捨",
    "captionEn": "Sampling rate is a trade-off between risk and cost.",
    "columns": [
      {
        "titleZh": "量得多",
        "titleEn": "Measure more",
        "items": [
          {
            "zh": "越能及早發現問題",
            "en": "Catches problems earlier"
          },
          {
            "zh": "量測要花時間和機台產能",
            "en": "Costs time and tool capacity"
          },
          {
            "zh": "量太多會拖慢整座工廠",
            "en": "Too much slows down the whole fab"
          },
          {
            "zh": "適用新產品、剛保養完的機台",
            "en": "For new products, tools fresh from maintenance",
            "noteZh": "以及最近出過問題的製程",
            "noteEn": "and processes that recently had problems"
          }
        ]
      },
      {
        "titleZh": "量得少",
        "titleEn": "Measure less",
        "items": [
          {
            "zh": "產出越快",
            "en": "Speeds up output"
          },
          {
            "zh": "風險越高",
            "en": "Raises the risk"
          },
          {
            "zh": "異常晶圓可能流到後面才被發現",
            "en": "Abnormal wafers may flow far down the line",
            "noteZh": "影響的批數也更多",
            "noteEn": "and more lots are affected"
          },
          {
            "zh": "適用穩定的製程",
            "en": "For stable processes"
          }
        ]
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
    "type": "compare",
    "captionZh": "R2R 與 FDC 同屬先進製程控制，但時機與依據不同",
    "captionEn": "R2R and FDC are both part of APC, but act at different times on different data.",
    "columns": [
      {
        "titleZh": "Run-to-Run",
        "titleEn": "Run-to-run",
        "items": [
          {
            "zh": "批與批之間的調整",
            "en": "Adjusts between runs"
          },
          {
            "zh": "根據前幾批的量測結果",
            "en": "Based on previous lots' measurements"
          },
          {
            "zh": "自動微調下一批的 Recipe",
            "en": "Fine-tunes the next lot's recipe",
            "noteZh": "例如線寬偏大就調曝光能量",
            "noteEn": "e.g. line width large: adjust exposure dose"
          },
          {
            "zh": "像洗澡時把熱水轉大",
            "en": "Like turning up hot water in a cold shower"
          }
        ]
      },
      {
        "titleZh": "FDC",
        "titleEn": "FDC",
        "items": [
          {
            "zh": "製程進行中的監控",
            "en": "Monitors during the run"
          },
          {
            "zh": "根據機台感測器數據",
            "en": "Based on tool sensor data",
            "noteZh": "壓力、溫度、功率、氣體流量",
            "noteEn": "Pressure, temperature, power, gas flow"
          },
          {
            "zh": "曲線不正常就立刻警報",
            "en": "Alarms as soon as a trace looks abnormal"
          },
          {
            "zh": "像汽車儀表板上的警示燈",
            "en": "Like the warning lights on a dashboard"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch17",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "type": "branch",
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
    "chapterId": "ch18",
    "headingZh": "異常一定會發生",
    "headingEn": "Abnormalities will happen",
    "type": "flow",
    "captionZh": "異常處理的基本順序：從發現異常到防止再發",
    "captionEn": "The basic order for handling an abnormality, step by step.",
    "steps": [
      {
        "zh": "發現異常",
        "en": "Detect"
      },
      {
        "zh": "擋住影響",
        "en": "Contain"
      },
      {
        "zh": "找出範圍",
        "en": "Find the scope"
      },
      {
        "zh": "判定處置",
        "en": "Disposition"
      },
      {
        "zh": "找出根本原因",
        "en": "Find the root cause"
      },
      {
        "zh": "防止再發",
        "en": "Prevent recurrence"
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
    "type": "flow",
    "captionZh": "影響範圍從上一次確認正常的時間點開始往後追查",
    "captionEn": "The suspect scope starts from the last point the tool was confirmed normal.",
    "steps": [
      {
        "zh": "發現機台異常",
        "en": "A tool is found abnormal"
      },
      {
        "zh": "找最後確認正常的時間點",
        "en": "Find the last known good point",
        "noteZh": "例如上次控片量測合格",
        "noteEn": "e.g. the last time a monitor wafer passed"
      },
      {
        "zh": "查出之後經過機台的晶圓",
        "en": "Find wafers run on the tool since",
        "noteZh": "靠系統記錄的履歷",
        "noteEn": "Using the history the factory systems record"
      },
      {
        "zh": "全部列入可疑範圍",
        "en": "Treat them all as suspect",
        "noteZh": "檢查越頻繁，範圍越小",
        "noteEn": "More frequent checks mean a smaller scope"
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
        "noteEn": "Electrical behavior, yield and reliability"
      },
      {
        "zh": "用實驗批驗證",
        "en": "Verify with experimental lots"
      },
      {
        "zh": "必要時做可靠度測試",
        "en": "Run reliability tests when needed"
      },
      {
        "zh": "通過審核才正式上線",
        "en": "Production only after approval",
        "noteZh": "重大變更須事先通知客戶",
        "noteEn": "Major changes: notify customers in advance"
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
            "noteZh": "測什麼",
            "noteEn": "What it tests"
          },
          {
            "zh": "確認製程是否正常",
            "en": "Confirms the process was normal",
            "noteZh": "目的",
            "noteEn": "Purpose"
          },
          {
            "zh": "檢查製程做得對不對",
            "en": "Checks: was the process done right",
            "noteZh": "簡單來說",
            "noteEn": "Put simply"
          }
        ]
      },
      {
        "titleZh": "CP",
        "titleEn": "CP",
        "items": [
          {
            "zh": "每一顆晶粒的功能",
            "en": "The function of every die",
            "noteZh": "測什麼",
            "noteEn": "What it tests"
          },
          {
            "zh": "找出哪些晶粒是好的",
            "en": "Finds out which dies are good",
            "noteZh": "目的",
            "noteEn": "Purpose"
          },
          {
            "zh": "檢查每顆晶片能不能用",
            "en": "Checks: does each chip work",
            "noteZh": "簡單來說",
            "noteEn": "Put simply"
          }
        ]
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
    "type": "branch",
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
            "noteZh": "常見用途",
            "noteEn": "Typical use"
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
            "noteZh": "常見用途",
            "noteEn": "Typical use"
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
            "noteZh": "常見用途",
            "noteEn": "Typical use"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch20",
    "headingZh": "常見異常",
    "headingEn": "Common problems",
    "type": "branch",
    "captionZh": "封裝常見異常與各自造成的結果",
    "captionEn": "Common packaging problems and the result each one leads to.",
    "root": {
      "zh": "封裝常見異常",
      "en": "Common packaging problems"
    },
    "branches": [
      {
        "zh": "崩邊",
        "en": "Chipping",
        "leafZh": "邊緣破損，可能成裂痕",
        "leafEn": "Damaged edges may grow into cracks"
      },
      {
        "zh": "打線黏不上",
        "en": "Non-stick on wire bond",
        "leafZh": "斷路",
        "leafEn": "Open circuits"
      },
      {
        "zh": "沖線",
        "en": "Wire sweep",
        "leafZh": "相鄰導線短路",
        "leafEn": "Shorts between neighboring wires"
      },
      {
        "zh": "脫層",
        "en": "Delamination",
        "leafZh": "可靠度問題",
        "leafEn": "Reliability problems"
      },
      {
        "zh": "空洞",
        "en": "Voids",
        "leafZh": "散熱變差",
        "leafEn": "Poorer heat dissipation"
      }
    ]
  },
  {
    "chapterId": "ch20",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "type": "branch",
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
    "type": "compare",
    "captionZh": "晶圓對晶圓與晶粒對晶圓兩種鍵合方式的取捨",
    "captionEn": "Trade-offs between wafer-to-wafer and die-to-wafer bonding.",
    "columns": [
      {
        "titleZh": "晶圓對晶圓鍵合",
        "titleEn": "Wafer-to-wafer bonding",
        "items": [
          {
            "zh": "兩片完整晶圓整片對準鍵合",
            "en": "Two full wafers aligned and bonded at once"
          },
          {
            "zh": "吞吐量極高",
            "en": "Highest throughput"
          },
          {
            "zh": "上下晶粒面積須完全相同",
            "en": "Requires identical die sizes"
          },
          {
            "zh": "無法預先剔除壞晶粒",
            "en": "Cannot pre-screen bad dies"
          }
        ]
      },
      {
        "titleZh": "晶粒對晶圓鍵合",
        "titleEn": "Die-to-wafer bonding",
        "items": [
          {
            "zh": "先測試篩出已知良好晶粒",
            "en": "Pre-tested known good dies are picked"
          },
          {
            "zh": "逐顆或群組貼合至底層晶圓",
            "en": "Bonded individually or in groups onto a wafer"
          },
          {
            "zh": "可用不同尺寸與製程節點",
            "en": "Allows different die sizes and process nodes"
          },
          {
            "zh": "只把好晶粒疊上去保全良率",
            "en": "Stacks only good dies, avoiding yield loss"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "ch21",
    "headingZh": "小晶片（Chiplet）",
    "headingEn": "Chiplets",
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
      "en": "Challenges of advanced packaging"
    },
    "branches": [
      {
        "zh": "散熱",
        "en": "Heat",
        "leafZh": "熱更難散出去",
        "leafEn": "Heat is harder to get out"
      },
      {
        "zh": "翹曲",
        "en": "Warpage",
        "leafZh": "封裝越大越容易彎曲",
        "leafEn": "Larger packages bend more"
      },
      {
        "zh": "測試",
        "en": "Test",
        "leafZh": "中間晶片很難單獨測試",
        "leafEn": "Hard to test middle chips alone"
      },
      {
        "zh": "良率相乘",
        "en": "Multiplied yield",
        "leafZh": "任一失敗，整個封裝受影響",
        "leafEn": "Any failure affects the package"
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
    "chapterId": "ch23",
    "headingZh": "防呆：讓錯誤無法發生",
    "headingEn": "Interlocks: making mistakes impossible",
    "type": "branch",
    "captionZh": "各條防呆規則在條件不符時由系統自動擋下",
    "captionEn": "Each interlock rule automatically stops the lot when its condition is not met",
    "root": {
      "zh": "防呆規則",
      "en": "Interlock rules",
      "noteZh": "由系統自動擋下",
      "noteEn": "Enforced automatically by the system"
    },
    "branches": [
      {
        "zh": "晶圓不在這一站",
        "en": "Lot should not be at this step",
        "leafZh": "不能進站",
        "leafEn": "Cannot track in"
      },
      {
        "zh": "機台沒有通過驗證",
        "en": "Tool not qualified",
        "leafZh": "不能做這個產品",
        "leafEn": "Cannot run this product"
      },
      {
        "zh": "Recipe 版本不對",
        "en": "Wrong recipe version",
        "leafZh": "不能開始",
        "leafEn": "Processing cannot start"
      },
      {
        "zh": "Q-Time 超過",
        "en": "Q-time expired",
        "leafZh": "不能繼續",
        "leafEn": "Cannot continue"
      },
      {
        "zh": "接觸過銅的晶圓盒",
        "en": "Carrier that touched copper",
        "leafZh": "不能放上前段機台",
        "leafEn": "Cannot go on a front-end tool"
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
      "noteEn": "Sensor, measurement and test data"
    },
    "branches": [
      {
        "zh": "預測性保養",
        "en": "Predictive maintenance",
        "leafZh": "預測零件何時更換",
        "leafEn": "Predict when parts need replacing"
      },
      {
        "zh": "虛擬量測",
        "en": "Virtual metrology",
        "leafZh": "推估量測結果",
        "leafEn": "Estimate measurement results"
      },
      {
        "zh": "人工智慧分析",
        "en": "AI analysis",
        "leafZh": "辨識晶圓圖型態",
        "leafEn": "Recognize wafer map patterns"
      },
      {
        "zh": "自動化派工",
        "en": "Automated dispatching",
        "leafZh": "決定最佳生產順序",
        "leafEn": "Decide the best production order"
      }
    ]
  },
  {
    "chapterId": "ch23",
    "headingZh": "現場異常徵兆與跨站根因排查",
    "headingEn": "Fab Failure Signatures & Root-Cause Diagnostics",
    "type": "branch",
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
        "noteEn": "Speed and leakage differ slightly"
      },
      {
        "zh": "測試時寫入熔絲",
        "en": "Written into fuses during test",
        "noteZh": "特性或校正值",
        "noteEn": "Characteristics or calibration values"
      },
      {
        "zh": "韌體開機時讀取",
        "en": "Firmware reads them at boot"
      },
      {
        "zh": "設定電壓和頻率",
        "en": "Sets voltage and frequency",
        "noteZh": "每顆晶片最適合的值",
        "noteEn": "The most suitable for each chip"
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
    "type": "branch",
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
        "leafZh": "自適應時脈展頻",
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
      "en": "Floor emergency callout"
    },
    "branches": [
      {
        "zh": "Q-Time 快爆了",
        "en": "Q-Time about to blow",
        "leafZh": "關閉上游清洗站進站",
        "leafEn": "Block track-in at the clean step"
      },
      {
        "zh": "FDC 亮紅燈鎖批",
        "en": "FDC Auto-Hold tripped",
        "leafZh": "攔截所有姊妹批",
        "leafEn": "Future Hold on all sister lots"
      },
      {
        "zh": "ADI 疊對偏移",
        "en": "ADI overlay shift",
        "leafZh": "轉入黃光重工",
        "leafEn": "Route to photo rework"
      },
      {
        "zh": "CP 外圍環帶死粒",
        "en": "CP edge-ring failing dies",
        "leafZh": "嫌疑腔體切 Down",
        "leafEn": "Take the offending chamber down"
      }
    ]
  }
];
