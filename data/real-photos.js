/**
 * real-photos.js
 * 晶圓廠真實設備、物理電顯 (SEM/TEM) 與晶圓封裝實體照片資料庫 (中英雙語對照)
 * 收錄全站 25 章正文與 3 篇附錄之高解析實物圖鑑、計量規格 (Metrology) 與物理微觀熱點 (Hotspots)
 */
export const REAL_PHOTOS_DATA = {
  "ch00": {
    "id": "ch00",
    "src": "assets/photos/ch00-wafer-300mm.jpg",
    "categoryZh": "晶圓成品實拍",
    "categoryEn": "Finished Wafer Macro Photo",
    "titleZh": "300mm 矽光子與邏輯微處理器晶圓實體",
    "titleEn": "300mm Patterned Silicon Photonics & Logic Wafer",
    "scaleZh": "直徑 300 mm (12 吋) · 數百顆晶粒陣列",
    "scaleEn": "300 mm (12-inch) Diameter · Hundreds of Die Array",
    "captionZh": "實體 300mm 晶圓表面密集排列著微縮晶粒（Die），在潔淨室光源下呈現微影光柵繞射的彩虹色彩。邊緣可見晶圓缺口（Notch）與劃線區（Scribe Line）。",
    "captionEn": "Real 300mm patterned silicon wafer showing hundreds of microchips reflecting rainbow diffraction under cleanroom lighting, complete with wafer notch and scribe lines.",
    "matchZh": "對應左側晶片一生全景旅程：由砂石提煉、切片、微影蝕刻數百道循環後之最終晶圓實體。",
    "matchEn": "Corresponds to the Life of a Chip journey: the physical culmination of hundreds of litho/etch/thin-film loops.",
    "metrology": {
      "voltage": "Optical (Visible)",
      "mag": "Macro 1:1",
      "fov": "300 mm",
      "techniqueZh": "無塵室超廣角遠心光學微距攝影",
      "techniqueEn": "Cleanroom Telecentric Macro Photography"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 35,
        "labelZh": "微處理器晶粒陣列 (Die Grid)",
        "labelEn": "Logic Die Array",
        "detailZh": "數百顆經過微影沉積蝕刻完成的矽光子與邏輯晶粒，在光線下呈現繞射光澤。",
        "detailEn": "Hundreds of fully processed logic dies exhibiting diffraction spectra under lighting."
      },
      {
        "x": 50,
        "y": 92,
        "labelZh": "晶圓缺口 (Wafer Notch)",
        "labelEn": "Wafer Notch",
        "detailZh": "300mm 標準定位缺口，用於黃光曝光機台與 AMHS 天車精確對準晶向 [110]。",
        "detailEn": "300mm standard alignment notch orienting the [110] crystal plane."
      },
      {
        "x": 62,
        "y": 48,
        "labelZh": "切割劃線區 (Scribe Line)",
        "labelEn": "Scribe Line",
        "detailZh": "晶粒之間的間隙，內含 WAT 電性測試鍵與微影光學對位標記。",
        "detailEn": "Inter-die lanes containing WAT parametric test structures and alignment marks."
      }
    ]
  },
  "ch01": {
    "id": "ch01",
    "src": "assets/photos/ch01-cleanroom-amhs.jpg",
    "categoryZh": "晶圓廠無塵室實景",
    "categoryEn": "Fab Cleanroom Environment",
    "titleZh": "晶圓廠無塵室黃光與微影作業區實景",
    "titleEn": "Semiconductor Cleanroom Photolithography Bay",
    "scaleZh": "ISO 14644-1 Class 1 ~ Class 1000 潔淨標準",
    "scaleEn": "ISO 14644-1 Class 1 to Class 1000 Cleanliness",
    "captionZh": "現代晶圓廠無塵室內部實拍，工程師穿著全套抗靜電無塵衣（Bunny Suit），天花板上方配置全自動物料搬送系統 (AMHS) 天車高架軌道網。",
    "captionEn": "State-of-the-art semiconductor cleanroom interior with bunny-suited operators and overhead automated material handling system (AMHS) track networks.",
    "matchZh": "對應左側無塵室與天車 AMHS 模型：實證正壓氣流、FFU 濾網與 FOUP 自動化吊運。",
    "matchEn": "Direct match with the cleanroom & OHT model: demonstrates positive airflow, FFU filtration, and automated transport.",
    "metrology": {
      "voltage": "Optical (Ambient)",
      "mag": "Wide Angle 24mm",
      "fov": "15 m Bay",
      "techniqueZh": "ISO 14644-1 Class 1000 無塵室作業實拍",
      "techniqueEn": "ISO Class 1000 Photolithography Cleanroom Bay"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 15,
        "labelZh": "天車高架軌道 (AMHS Track)",
        "labelEn": "OHT AMHS Track",
        "detailZh": "無塵室天花板頂部全自動物料搬送系統，負責懸掛 FOUP 晶圓盒在百台機台間極速穿梭。",
        "detailEn": "Automated material handling track transporting FOUPs across fab bays."
      },
      {
        "x": 40,
        "y": 65,
        "labelZh": "無塵衣工程師 (Bunny Suit)",
        "labelEn": "Operator in Bunny Suit",
        "detailZh": "全套防靜電連身無塵衣、高效防護面罩與導電靴，防止人體毛屑與鈉鉀離子污染晶圓。",
        "detailEn": "Full static-dissipative cleanroom garment preventing human particle shedding."
      },
      {
        "x": 18,
        "y": 45,
        "labelZh": "黃光防爆照明 (Yellow Safe Light)",
        "labelEn": "Amber Safety Lighting",
        "detailZh": "微影曝光區域嚴格採用 500nm 以上黃光濾波照明，防止化學增幅光阻劑非預期感光。",
        "detailEn": "Filtered yellow lighting above 500nm preventing accidental photoresist exposure."
      }
    ]
  },
  "ch02": {
    "id": "ch02",
    "src": "assets/photos/ch02-mosfet-sem.jpg",
    "categoryZh": "電子顯微鏡 (SEM)",
    "categoryEn": "Scanning Electron Microscope (SEM)",
    "titleZh": "電子顯微鏡下微處理器奈米電晶體截面",
    "titleEn": "Processor Nanoscale Transistors under SEM",
    "scaleZh": "8K 超高解析電顯 · 奈米級閘極線寬",
    "scaleEn": "8K SEM Resolution · Nanometer Gate Dimensions",
    "captionZh": "掃描式電子顯微鏡 (SEM) 拍攝之實體微處理器截面，清晰展示金屬閘極堆疊、源極/汲極擴散區、隔離氧化層與接觸窗鎢插塞（W-Plug）互連。",
    "captionEn": "Scanning Electron Microscope (SEM) cross-section showing metal gate stacks, source/drain junctions, isolation oxides, and tungsten contact plugs.",
    "matchZh": "對應左側 MOSFET 閘極控制能帶模型：實體驗證閘極電壓反轉通道與源/汲極歐姆接觸。",
    "matchEn": "Validates theoretical MOSFET band diagrams with real cross-sectional physical gate stacks and channel junctions.",
    "metrology": {
      "voltage": "5.0 kV",
      "mag": "85,000×",
      "fov": "1.2 µm",
      "techniqueZh": "場發射穿透式電子顯微鏡 (FE-TEM)",
      "techniqueEn": "Field Emission TEM Cross-Section"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 28,
        "labelZh": "多晶矽/金屬閘極 (Gate)",
        "labelEn": "Metal Gate Electrode",
        "detailZh": "電晶體控制端，施加閘極電壓以在下方矽通道感應出電子反轉層導電通道。",
        "detailEn": "Control electrode modulating channel inversion layer carrier density."
      },
      {
        "x": 50,
        "y": 46,
        "labelZh": "閘極介電層 (Gate Dielectric)",
        "labelEn": "High-k Dielectric Layer",
        "detailZh": "亞奈米級絕緣層，具備超高介電常數以抑制量子穿隧漏電流。",
        "detailEn": "Sub-nanometer insulating layer with high-k material suppressing tunneling leakage."
      },
      {
        "x": 30,
        "y": 70,
        "labelZh": "源極/汲極擴散區 (Source/Drain)",
        "labelEn": "Source/Drain Junction",
        "detailZh": "高濃度摻雜之載子發射與收集端，經離子佈植與毫秒高溫退火活化而成。",
        "detailEn": "Heavily doped regions formed by ion implantation and millisecond laser annealing."
      }
    ]
  },
  "ch03": {
    "id": "ch03",
    "src": "assets/photos/ch03-silicon-boule.jpg",
    "categoryZh": "長晶晶棒實體",
    "categoryEn": "Single-Crystal Ingot Artifact",
    "titleZh": "柴式提拉法單晶矽晶棒實體 (Silicon Boule)",
    "titleEn": "Czochralski Monocrystalline Silicon Boule Ingot",
    "scaleZh": "長度 > 1.5 公尺 · 重量 > 100 公斤 · 99.9999999% 純度",
    "scaleEn": "Length > 1.5 m · Weight > 100 kg · 9N+ Purity",
    "captionZh": "柴可拉斯基法 (Czochralski) 自矽熔融液提拉結晶之高純度單晶矽晶棒，表面具有特定晶體生長稜線，經過外徑研磨（Grinding）即可滾圓成標準直徑。",
    "captionEn": "Monocrystalline silicon boule ingot pulled from molten quartz crucible via Czochralski crystal growth, showing distinctive crystal habit lines before OD grinding.",
    "matchZh": "對應左側柴氏長晶生長模型：晶種自旋提拉與圓柱切片拋光之真實宏觀實體。",
    "matchEn": "Physical counterpart to the CZ crystal puller simulation, illustrating seed rotation and boule geometry.",
    "metrology": {
      "voltage": "Optical (Macro)",
      "mag": "Macro 1:1",
      "fov": "1.5 m Ingot",
      "techniqueZh": "柴氏提拉長晶爐拉晶實景",
      "techniqueEn": "Czochralski (CZ) Ingot Pulling Environment"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 15,
        "labelZh": "引晶細頸 (Seed Neck)",
        "labelEn": "Dash Neck",
        "detailZh": "長晶初期直徑僅數毫米的 Dash 細頸，藉由熱震誘導排除所有差排缺陷。",
        "detailEn": "Narrow neck eliminating dislocations via Dash technique during initial seeding."
      },
      {
        "x": 50,
        "y": 55,
        "labelZh": "單晶矽棒晶體主體 (Single Crystal Body)",
        "labelEn": "Single Crystal Ingot",
        "detailZh": "純度達 99.999999999% (11N) 之高純度單晶矽棒，具有極致完美的金剛石晶體結構。",
        "detailEn": "Electronic-grade silicon ingot with 11N purity and defect-free diamond cubic lattice."
      },
      {
        "x": 50,
        "y": 88,
        "labelZh": "矽熔湯液面 (Molten Silicon Meniscus)",
        "labelEn": "Molten Silicon Surface",
        "detailZh": "1420°C 高溫石英坩堝熔融矽液面，以毫米/小時速度緩慢旋轉提拉。",
        "detailEn": "Liquid silicon at 1420°C in quartz crucible rotated and pulled under argon."
      }
    ]
  },
  "ch04": {
    "id": "ch04",
    "src": "assets/photos/ch04-stepper-scanner.jpg",
    "categoryZh": "微影對準曝光設備",
    "categoryEn": "Lithography alignment equipment",
    "titleZh": "LAAS-CNRS 的 EVG-620 與 MA-150",
    "titleEn": "EVG-620 and MA-150 at LAAS-CNRS",
    "scaleZh": "設備外觀參考 · 無校準比例",
    "scaleEn": "Equipment reference · no calibrated scale",
    "captionZh": "來源辨識左側為 EVG-620、右側為 MA-150，攝於 LAAS-CNRS 黃光環境。此圖呈現機台外觀，不能據此辨認內部投影光路、雙工件台或浸潤水層。",
    "captionEn": "The source identifies an EVG-620 on the left and an MA-150 on the right at LAAS-CNRS under yellow lighting. This exterior view does not identify internal projection optics, dual wafer stages or an immersion-water layer.",
    "matchZh": "與本章共同說明微影設備的使用情境；不是旁側 DUV／EUV 投影模型的同型機台或結構剖面。",
    "matchEn": "A reference for the lithography environment, not a matching machine or cross-section of the adjacent DUV/EUV projection model.",
    "metrology": {
      "voltage": "Not reported by source",
      "voltageZh": "來源未提供",
      "mag": "Not reported by source",
      "magZh": "來源未提供",
      "fov": "Not reported by source",
      "fovZh": "來源未提供",
      "techniqueZh": "可見光設備照片",
      "techniqueEn": "Visible-light equipment photograph"
    },
    "hotspots": [
      {
        "x": 34,
        "y": 39,
        "labelZh": "左側 EVG-620 設備",
        "labelEn": "EVG-620 equipment on the left",
        "detailZh": "機台名稱依原始照片說明；標記指向左側設備外觀，不指認內部光學元件。",
        "detailEn": "Equipment identity follows the source caption. The marker identifies the exterior, not an internal optical component."
      },
      {
        "x": 66,
        "y": 46,
        "labelZh": "右側 MA-150 設備",
        "labelEn": "MA-150 equipment on the right",
        "detailZh": "機台名稱依原始照片說明；照片不足以推定曝光波長、縮小倍率或晶圓載台機構。",
        "detailEn": "Equipment identity follows the source caption. Wavelength, reduction ratio and wafer-stage design cannot be inferred from this view."
      },
      {
        "x": 14,
        "y": 18,
        "labelZh": "黃光作業環境",
        "labelEn": "Yellow-light working environment",
        "detailZh": "來源描述為不感光照明環境；照片的顏色不是曝光波長或照明光譜的量測結果。",
        "detailEn": "The source describes inactinic lighting. The photograph colour is not a measurement of exposure wavelength or lighting spectrum."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:EVG-620_%26_MA-150_steppers_at_LAAS_(FDLS_2007)_0430.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片；本站另加熱點與圖說。原始頁亦提供 GFDL 授權。來源未提供本圖的曝光波長、倍率或校準視場。",
      "noteEn": "Existing local photo retained; markers and captions added by this site. The source also offers GFDL. Exposure wavelength, magnification and calibrated field of view are not reported."
    },
    "diagramReference": {
      "noteZh": "原理示意・非按比例。DUV 使用透鏡；EUV 使用反射式光罩與鏡面。High-NA 的兩軸縮小率為 4×／8×。光線路徑及鏡面數量為教學簡化，不是機台光學處方。",
      "noteEn": "Principle diagram · not to scale. DUV uses lenses; EUV uses a reflective mask and mirrors. High-NA demagnifies by 4× / 8× on its two axes. Paths and mirror count are simplified, not an optical prescription.",
      "links": [
        {
          "label": "ASML · lenses / mirrors",
          "url": "https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors"
        },
        {
          "label": "ASML · High-NA",
          "url": "https://www.asml.com/en/company/stories/2024/5-things-high-na-euv"
        }
      ]
    }
  },
  "ch05": {
    "id": "ch05",
    "src": "assets/photos/ch05-pecvd-ald.jpg",
    "categoryZh": "薄膜機台實景",
    "categoryEn": "Thin Film Deposition Tool",
    "titleZh": "電漿增強型化學氣相沉積機台 (STS Multiplex PECVD)",
    "titleEn": "STS Multiplex PECVD Thin-Film Deposition Tool",
    "scaleZh": "多反應腔叢集架構 (Cluster Tool) · 真空度 10⁻³ Torr",
    "scaleEn": "Cluster Tool Architecture · 10⁻³ Torr Vacuum",
    "captionZh": "半導體真空 PECVD 多腔體叢集機台，具備中央傳輸腔（Transfer Chamber）、真空機械手臂與獨立高頻電漿沉積反應室，確保高膜厚均勻性。",
    "captionEn": "Vacuum PECVD cluster tool equipped with central vacuum robotic transfer chamber and RF plasma deposition reactors for ultra-conformal films.",
    "matchZh": "對應左側 ALD/CVD 動力學模型：氣相前驅物化學反應與自限制沉積之實體機台。",
    "matchEn": "Direct physical proof of CVD/ALD precursor delivery and vacuum reaction chambers.",
    "metrology": {
      "voltage": "RF 13.56 MHz",
      "mag": "Cluster Tool View",
      "fov": "3 m Platform",
      "techniqueZh": "高密度電漿增強化學氣相沉積 (PECVD/ALD)",
      "techniqueEn": "High-Density Plasma-Enhanced CVD Platform"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 30,
        "labelZh": "氣體分流蓮蓬頭 (Showerhead)",
        "labelEn": "Gas Dispersion Showerhead",
        "detailZh": "多孔陽極化分流面罩，將前驅氣體均勻噴灑於晶圓上方形成均勻氣流場。",
        "detailEn": "Precision drilled plate delivering uniform precursor gas distribution."
      },
      {
        "x": 48,
        "y": 60,
        "labelZh": "射頻加熱基座 (Heated RF Chuck)",
        "labelEn": "RF-Biased Heating Pedestal",
        "detailZh": "維持 200°C~450°C 恆溫並提供射頻偏壓，精準控制沉積膜層應力與均勻性。",
        "detailEn": "Temperature-controlled pedestal with RF bias tuning film stress and density."
      },
      {
        "x": 80,
        "y": 45,
        "labelZh": "真空傳輸機械手臂 (Vacuum Transfer Arm)",
        "labelEn": "Central Vacuum Robot",
        "detailZh": "中央傳輸腔內的雙臂機械手，在高真空環境下無縫接駁不同製程腔體。",
        "detailEn": "Dual-blade robotic arm shuttling wafers under continuous high vacuum."
      }
    ]
  },
  "ch06": {
    "id": "ch06",
    "src": "assets/photos/ch06-rie-plasma-etch.jpg",
    "categoryZh": "蝕刻機台實景",
    "categoryEn": "Plasma Etch Tool",
    "titleZh": "反應離子電漿乾式蝕刻系統 (Reactive-Ion Etching RIE)",
    "titleEn": "Reactive-Ion Etching (RIE) Plasma Tool",
    "scaleZh": "高頻 13.56 MHz RF 產生源 · 自偏壓離子轟擊",
    "scaleEn": "13.56 MHz RF Source · Self-Bias Ion Bombardment",
    "captionZh": "乾式電漿蝕刻機台後端架構，展示高頻射頻匹配網路（RF Matcher）、反應氣體質量流量控制器（MFC）與渦輪分子真空幫浦排氣系統。",
    "captionEn": "Industrial RIE plasma etcher showing automatic RF impedance matching network, mass flow controllers, and turbo-molecular vacuum pumps.",
    "matchZh": "對應左側電漿腔體與 90° 垂直異向性模型：雙頻射頻解耦與電漿鞘層加速實體載體。",
    "matchEn": "Hardware infrastructure behind RF plasma sheath generation and anisotropic vertical ion etching.",
    "metrology": {
      "voltage": "ICP 2 MHz / Bias 13.56 MHz",
      "mag": "Chamber Interior",
      "fov": "450 mm Chamber",
      "techniqueZh": "感應耦合電漿反應離子蝕刻機 (ICP-RIE)",
      "techniqueEn": "Inductively Coupled Plasma Reactive Ion Etcher"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 35,
        "labelZh": "高密度電漿輝光區 (Plasma Glow Discharge)",
        "labelEn": "Dense Plasma Discharge",
        "detailZh": "電離之氟碳離子與自由基在此劇烈碰撞，產生特徵光譜並執行垂直方向非等向性轟擊。",
        "detailEn": "Glow discharge containing reactive radicals and ions for anisotropic etching."
      },
      {
        "x": 50,
        "y": 75,
        "labelZh": "氦氣背冷靜電吸盤 (ESC with He Cooling)",
        "labelEn": "Helium-Cooled ESC Chuck",
        "detailZh": "陶瓷靜電吸盤背面通入高純氦氣進行熱傳導，確保晶圓在電漿轟擊下不致過熱燒焦光阻。",
        "detailEn": "Electrostatic chuck with backside helium gas cooling controlling wafer temperature."
      },
      {
        "x": 82,
        "y": 70,
        "labelZh": "排氣與壓強調節蝶閥 (Throttle Valve & Turbo)",
        "labelEn": "Downstream Pressure Throttle",
        "detailZh": "高速伺服蝶閥搭配磁浮渦輪分子泵，在毫秒級反應速度內精確維持腔體毫托爾級氣壓。",
        "detailEn": "Fast-response throttle valve regulating mTorr chamber pressure with turbopump."
      }
    ]
  },
  "ch07": {
    "id": "ch07",
    "src": "assets/photos/ch07-ion-implanter.jpg",
    "categoryZh": "離子佈植機",
    "categoryEn": "Ion Implantation Equipment",
    "titleZh": "大電流離子佈植機高能束流管線 (Ion Implanter Beamline)",
    "titleEn": "High-Current Ion Implantation Beamline System",
    "scaleZh": "加速能量 10 keV ~ 500 keV · 電磁偏轉磁鐵",
    "scaleEn": "Acceleration Energy 10-500 keV · Mass Analyzer Magnet",
    "captionZh": "實體離子佈植機台束流分析區，包含高壓電離室、90 度勞侖茲力質量分析磁鐵、狹縫過濾器與晶圓真空終端靶室（Endstation）。",
    "captionEn": "Ion implanter beamline section showing plasma ionization source, 90° Lorentz mass analyzer magnet, and vacuum endstation wafer chuck.",
    "matchZh": "對應左側 90° 偏轉磁鐵與 LSS 理論：荷質比篩選摻雜離子之真實機台管線。",
    "matchEn": "Physical embodiment of Lorentz force mass filtering and beamline electrostatic deflection.",
    "metrology": {
      "voltage": "Extraction 80 kV",
      "mag": "Beamline Macro",
      "fov": "4 m Beamline",
      "techniqueZh": "大束流高能量離子佈植機 (High-Current Implanter)",
      "techniqueEn": "High-Current Ion Implantation Beamline"
    },
    "hotspots": [
      {
        "x": 18,
        "y": 40,
        "labelZh": "離子源產生室 (Arc Discharge Source)",
        "labelEn": "Freeman Ion Source",
        "detailZh": "利用燈絲弧光放電將三氟化硼或磷化氫氣體離子化，產生帶正電之高密度電漿束。",
        "detailEn": "Arc discharge chamber ionizing BF3 or PH3 gas into dense ion plasma."
      },
      {
        "x": 45,
        "y": 42,
        "labelZh": "分析磁鐵偏轉器 (Mass Analyzer Magnet)",
        "labelEn": "Mass Analyzing Magnet",
        "detailZh": "強磁場將具有特定質荷比（例如 B-11 或 P-31）的目標離子彎折 90 度，濾除同位素雜質。",
        "detailEn": "Dipole magnet selecting precise charge-to-mass ratio while filtering impurities."
      },
      {
        "x": 82,
        "y": 45,
        "labelZh": "靜電聚焦與掃描管 (Electrostatic Scanner)",
        "labelEn": "Electrostatic Beam Scanner",
        "detailZh": "高壓靜電掃描板驅動離子束在高速自轉晶圓上進行二維光柵式均勻掃描。",
        "detailEn": "High-voltage deflection plates rastering the ion beam uniformly across wafer."
      }
    ]
  },
  "ch08": {
    "id": "ch08",
    "src": "assets/photos/ch08-cmp-conditioner.jpg",
    "categoryZh": "CMP 實體配件",
    "categoryEn": "CMP Hardware Component",
    "titleZh": "CMP 研磨墊鑽石修整盤實物 (Pad Diamond Conditioner)",
    "titleEn": "CMP Diamond Conditioner Disk for Pad Regeneration",
    "scaleZh": "直徑 ~100 mm · 電鍍微米級鑽石顆粒",
    "scaleEn": "Diameter ~100 mm · Electroplated Diamond Grits",
    "captionZh": "化學機械平坦化（CMP）機台之實體鑽石修整盤，以超硬金剛石微粒在高速旋轉下微刻研磨墊，防止研磨墊孔隙玻璃化鈍化，維持 Preston 研磨速率。",
    "captionEn": "CMP diamond conditioner disk coated with micro-diamond abrasives, sweeping rotating polyurethane pads to dress pad pores and sustain MRR.",
    "matchZh": "對應左側 Preston 運動學與晶圓研磨頭：維持研磨墊粗糙度與材料移除率之核心元件。",
    "matchEn": "Crucial mechanical component preserving pad roughness in the Preston kinematic planarization loop.",
    "metrology": {
      "voltage": "Mechanical 5 psi",
      "mag": "Platen Macro",
      "fov": "800 mm Platen",
      "techniqueZh": "旋轉多研磨頭化學機械平坦化機台 (CMP Polisher)",
      "techniqueEn": "Rotary Chemical Mechanical Planarization Station"
    },
    "hotspots": [
      {
        "x": 45,
        "y": 35,
        "labelZh": "鑽石修整碟盤 (Diamond Conditioner)",
        "labelEn": "Diamond Conditioning Disk",
        "detailZh": "表面鑲嵌微米鑽石顆粒的高速旋轉盤，原位銼削聚氨酯研磨墊以維持表面微孔開孔率。",
        "detailEn": "Diamond grit disk micro-cutting pad surface to regenerate slurry pores."
      },
      {
        "x": 55,
        "y": 65,
        "labelZh": "微孔聚氨酯研磨墊 (Polyurethane Pad)",
        "labelEn": "Grooved Polyurethane Pad",
        "detailZh": "具備同心圓微凹槽之高分子發泡研磨墊，負責乘載膠體二氧化矽奈米研磨液。",
        "detailEn": "Porous polymer pad with concentric grooves transporting chemical slurry."
      },
      {
        "x": 25,
        "y": 50,
        "labelZh": "研磨液滴注搖臂 (Slurry Dispense Arm)",
        "labelEn": "Slurry Injection Arm",
        "detailZh": "蠕動泵以精密毫升級流速將化學腐蝕劑與研磨顆粒混合液均勻輸送至研磨墊中心。",
        "detailEn": "Precision peristaltic arm delivering tailored chemical-abrasive mixture."
      }
    ]
  },
  "ch09": {
    "id": "ch09",
    "src": "assets/photos/ch09-wet-bench-clean.jpg",
    "categoryZh": "晶圓清洗機台",
    "categoryEn": "Wafer Wet Bench Tool",
    "titleZh": "無塵室全自動濕式酸槽清洗機台 (Wet Chemical Bench)",
    "titleEn": "Cleanroom Automated Wet Chemical Cleaning Bench",
    "scaleZh": "配置 6 吋/8 吋/12 吋晶圓批次槽 · 耐強酸強鹼石英槽",
    "scaleEn": "Quartz Tanks for 6/8/12-inch Wafers · PFA Acid Resistant",
    "captionZh": "晶圓清洗區自動酸槽設備，採用耐酸鹼石英與聚四氟乙烯槽體，搭載高純度 SC-1/SC-2 RCA 藥液、兆聲波振動器與馬蘭哥尼（Marangoni）IPA 快速乾燥模組。",
    "captionEn": "Automated wet bench cleaning system featuring quartz tanks, circulating RCA chemistry, megasonic transducers, and Marangoni IPA dryers.",
    "matchZh": "對應左側 RCA 清洗化學動力學：去除金屬離子、有機物與微粒之真實潔淨酸槽。",
    "matchEn": "Direct physical counterpart to SC-1/SC-2 chemical baths and megasonic boundary-layer cleaning.",
    "metrology": {
      "voltage": "Megasonic 1.0 MHz",
      "mag": "Bench View",
      "fov": "2.5 m Bench",
      "techniqueZh": "全自動全氟石英槽晶圓濕式清洗機台 (Wet Bench)",
      "techniqueEn": "Automated Quartz Wet Chemical Cleaning Station"
    },
    "hotspots": [
      {
        "x": 45,
        "y": 40,
        "labelZh": "RCA-1 / SC-1 化學槽 (SC-1 Quartz Bath)",
        "labelEn": "SC-1 Standard Clean Bath",
        "detailZh": "加熱至 70°C 的 NH4OH + H2O2 + H2O 混合液，溶解表面顆粒並生長保護性均勻氧化層。",
        "detailEn": "Ammonium hydroxide and peroxide bath removing organic particles and micro-contaminants."
      },
      {
        "x": 45,
        "y": 70,
        "labelZh": "兆聲波壓電換能器 (Megasonic Transducer)",
        "labelEn": "Megasonic Array",
        "detailZh": "百萬赫茲高頻聲波產生微空化氣泡破裂微射流，克服微米次微米微粒之凡得瓦吸引力。",
        "detailEn": "MHz-frequency acoustic transducer generating controlled cavitations."
      },
      {
        "x": 80,
        "y": 35,
        "labelZh": "馬蘭哥尼 IPA 乾燥腔 (Marangoni Dryer)",
        "labelEn": "Marangoni Vapor Dryer",
        "detailZh": "利用異丙醇蒸氣降低液膜表面張力梯度，晶圓緩慢提拉時達成無水痕完美乾燥。",
        "detailEn": "IPA vapor gradient drying chamber preventing water-mark residue."
      }
    ]
  },
  "ch10": {
    "id": "ch10",
    "src": "assets/photos/ch10-metal-deposition.jpg",
    "categoryZh": "金屬化設備",
    "categoryEn": "BEOL Metallization Tool",
    "titleZh": "高真空電子束蒸發與金屬導線沉積設備",
    "titleEn": "High-Vacuum Metal Thin-Film Deposition Tool",
    "scaleZh": "超高真空 10⁻⁷ Torr · 奈米金屬阻擋層",
    "scaleEn": "Ultra-High Vacuum 10⁻⁷ Torr · Barrier Layer Deposition",
    "captionZh": "後段金屬化製程沉積機台，用於沉積鉭/氮化鉭 (Ta/TaN) 擴散阻擋層、銅晶種層（Cu Seed）與雙鑲嵌導線互連結構，防止銅原子擴散造成漏電。",
    "captionEn": "BEOL metallization chamber depositing barrier/seed layers (Ta/TaN/Cu) before electroplating to prevent copper migration.",
    "matchZh": "對應左側雙鑲嵌銅導線與接觸窗結構：實際物理沉積 Ta/TaN 阻擋層與 Cu Seed 晶種層之高真空機台腔體。",
    "matchEn": "Physical counterpart to the Dual Damascene interconnect model: chamber depositing barrier and seed layers before Cu plating.",
    "metrology": {
      "voltage": "10 kV E-Beam",
      "mag": "Chamber View",
      "fov": "1 m Chamber",
      "techniqueZh": "後段金屬化雙鑲嵌導線高真空沉積系統",
      "techniqueEn": "BEOL Dual Damascene Metallization Chamber"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 25,
        "labelZh": "Ta/TaN 擴散阻擋層 (Barrier Layer)",
        "labelEn": "Ta/TaN Barrier Layer",
        "detailZh": "物理氣相沉積超薄氮化鉭/鉭層，緊密包覆介電質孔洞，杜絕銅原子熱擴散進入矽晶體。",
        "detailEn": "PVD Ta/TaN thin film preventing copper electromigration and dielectric poisoning."
      },
      {
        "x": 48,
        "y": 48,
        "labelZh": "銅晶種層 (Cu Seed Layer)",
        "labelEn": "Cu Seed Layer",
        "detailZh": "連續且均勻的奈米銅晶種導電薄膜，為後續電化學電鍍填充提供低阻抗導電迴路。",
        "detailEn": "Continuous thin Cu film providing low-resistance path for electrochemical plating."
      },
      {
        "x": 75,
        "y": 65,
        "labelZh": "電子束蒸鍍靶座 (Electron Beam Crucible)",
        "labelEn": "E-Beam Water-Cooled Hearth",
        "detailZh": "磁場彎折高能電子束聚焦熔化高熔點難熔金屬靶材，實現高純度金屬化鍍膜。",
        "detailEn": "Water-cooled copper hearth focusing 270-degree bent e-beam on metal target."
      }
    ]
  },
  "ch11": {
    "id": "ch11",
    "src": "assets/photos/ch11-diffusion-furnace.jpg",
    "categoryZh": "擴散爐管實景",
    "categoryEn": "Thermal Diffusion Furnace",
    "titleZh": "高溫熱氧化與熱退火臥式石英爐管陣列",
    "titleEn": "Horizontal Thermal Oxidation & Diffusion Quartz Furnaces",
    "scaleZh": "操作溫度 800°C ~ 1150°C · 恆溫區精度 ±0.5°C",
    "scaleEn": "Temperature 800-1150°C · Flat Zone Accuracy ±0.5°C",
    "captionZh": "晶圓廠高溫氧化擴散爐管陣列，在超高純度氧氣與氮氣環境中精確生長二氧化矽閘極介電層，並執行離子佈植後之晶格熱修復與雜質活化。",
    "captionEn": "Horizontal quartz tube furnace array providing ultra-uniform thermal oxidation, well annealing, and dopant activation at >1000°C.",
    "matchZh": "對應左側 CMOS 完整整合流程：第一段 FEOL 形成井區、隔離與閘極氧化層之真實熱製程。",
    "matchEn": "Physical tool performing Stage 1 FEOL thermal gate oxidation and drive-in diffusion.",
    "metrology": {
      "voltage": "Thermal 1050°C",
      "mag": "Tube Array",
      "fov": "3 m Bay",
      "techniqueZh": "超高純臥式石英擴散與乾氧高溫氧化爐管",
      "techniqueEn": "Horizontal Quartz Diffusion & Thermal Oxidation Furnaces"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 30,
        "labelZh": "高純石英反應爐管 (Quartz Process Tube)",
        "labelEn": "Fused Silica Quartz Tube",
        "detailZh": "耐高溫 1200°C 高純石英管，通入乾燥高純氧氣與氫氯酸氣體進行乾氧熱氧化。",
        "detailEn": "High-purity fused silica tube operating up to 1200°C for dry oxidation."
      },
      {
        "x": 50,
        "y": 55,
        "labelZh": "懸臂式自動裝載晶舟 (SiC Cantilever Boat)",
        "labelEn": "Silicon Carbide Wafer Boat",
        "detailZh": "碳化矽材質剛性懸臂托架，承載上百片 300mm 晶圓並以非接觸方式平穩送入爐膛。",
        "detailEn": "Non-contact SiC cantilever paddle loading 100+ wafers without tube rubbing."
      },
      {
        "x": 22,
        "y": 45,
        "labelZh": "五溫區獨立加熱線圈 (5-Zone Heating Coils)",
        "labelEn": "Multi-Zone Heating Elements",
        "detailZh": "微電腦伺服控制多溫區加熱線圈，整支爐管平坦區溫度均勻度達到 ±0.2°C 極致標準。",
        "detailEn": "Microprocessor-controlled coils achieving ±0.2°C flat-zone uniformity."
      }
    ]
  },
  "ch12": {
    "id": "ch12",
    "src": "assets/photos/ch12-transistor-micrograph.jpg",
    "categoryZh": "電晶體電顯 (SEM/TEM)",
    "categoryEn": "Transistor Micrograph",
    "titleZh": "奈米尺度微處理器電晶體通道截面電顯影像",
    "titleEn": "Nanoscale Transistor Channel Cross-Section Micrograph",
    "scaleZh": "奈米尺度解析度 · 多向閘極立體包覆",
    "scaleEn": "Nanoscale Resolution · 3D Multi-Gate Channel Wrapping",
    "captionZh": "電子顯微鏡下高倍率真實晶片通道截面，清楚顯示多層微縮金屬線（M1-M4）與底層立體微型電晶體結構，具備極高深寬比與極低次臨界擺幅漏電特性。",
    "captionEn": "High-resolution electron micrograph showing multiple metal interconnect levels above 3D nanoscale transistor channels with superior gate control.",
    "matchZh": "對應左側 Planar -> FinFET -> GAA 演進模型：真實微觀電顯晶體通道與金屬閘極截面。",
    "matchEn": "Brings theoretical 3D FinFET fins and GAA nanosheet cross-sections into concrete physical reality.",
    "metrology": {
      "voltage": "300 kV STEM",
      "mag": "250,000×",
      "fov": "180 nm",
      "techniqueZh": "球面像差校正掃描穿透式電顯 (Cs-Corrected STEM)",
      "techniqueEn": "Aberration-Corrected STEM Transistor Cross-Section"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 30,
        "labelZh": "環繞閘極通道 (GAA / Nanosheet Channel)",
        "labelEn": "GAA Nanosheet Channel",
        "detailZh": "數層水平疊加之單晶矽奈米片，閘極全方位 360 度包覆，徹底消除次臨界漏電流。",
        "detailEn": "Vertically stacked silicon nanosheets wrapped 360 degrees by gate electrode."
      },
      {
        "x": 50,
        "y": 58,
        "labelZh": "高介電閘極材料 (High-k Gate Dielectric)",
        "labelEn": "HfO2 Dielectric Interface",
        "detailZh": "原子層沉積之二氧化鉿 (HfO2) 與金屬閘極，提供超大單位面積閘極電容。",
        "detailEn": "ALD-grown hafnium oxide and TiN metal gate offering high capacitance."
      },
      {
        "x": 25,
        "y": 72,
        "labelZh": "源極/汲極應力磊晶 (SiGe Source/Drain Stressor)",
        "labelEn": "Embedded SiGe Stressor",
        "detailZh": "選擇性外延生長之矽鍺結晶，對電晶體通道施加單軸應變，使電洞移動率提升 2 倍以上。",
        "detailEn": "Epitaxial SiGe inducing uniaxial compressive strain to boost hole mobility."
      }
    ]
  },
  "ch13": {
    "id": "ch13",
    "src": "assets/photos/ch13-nand-flash-die.jpg",
    "categoryZh": "記憶體晶粒實拍",
    "categoryEn": "Memory Die Micrograph",
    "titleZh": "快閃記憶體內部密集存儲單元晶粒實物微觀",
    "titleEn": "Decapped NAND Flash Memory Silicon Die Photo",
    "scaleZh": "晶粒尺寸 ~80 mm² · 密集立體存儲單元",
    "scaleEn": "Die Area ~80 mm² · Dense 3D Storage Array",
    "captionZh": "快閃記憶體晶片開蓋微觀實拍，展現密集記憶體陣列區（Memory Array）、字元線解碼電路（Row Decoder）、感測放大器（Sense Amp）與周邊邏輯電路。",
    "captionEn": "Decapped optical macro photo of a NAND Flash memory chip showing dense memory arrays, wordline decoders, and sense amplifier circuits.",
    "matchZh": "對應左側 DRAM/3D NAND 結構模型：立體垂直通道孔與記憶胞高密度排布之真實晶片。",
    "matchEn": "Physical reality behind 3D NAND vertical memory strings and DRAM charge-storage arrays.",
    "metrology": {
      "voltage": "Optical Macro",
      "mag": "Macro 5:1",
      "fov": "12×15 mm Die",
      "techniqueZh": "3D NAND Flash 裸晶開蓋金相顯微全覽",
      "techniqueEn": "Decapped 3D NAND Flash Die Macro Photo"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 40,
        "labelZh": "記憶胞陣列層 (Memory Cell Array)",
        "labelEn": "3D NAND Cell Array Core",
        "detailZh": "超過 200 層垂直堆疊之 Charge Trap 浮閘記憶體單元，實現超大容量固態儲存。",
        "detailEn": "Over 200 vertically stacked charge trap layers maximizing storage density."
      },
      {
        "x": 82,
        "y": 40,
        "labelZh": "字元線階梯接觸區 (Staircase Contact Pad)",
        "labelEn": "Word-Line Staircase Region",
        "detailZh": "微影階梯蝕刻而成之梯級結構，垂直貫穿的導電接觸孔在此精準連接每層字元線。",
        "detailEn": "Terraced staircase contact pads enabling vertical via routing to each deck."
      },
      {
        "x": 50,
        "y": 88,
        "labelZh": "周邊電路基底 (CuA / CMOS under Array)",
        "labelEn": "CMOS Under Array Logic",
        "detailZh": "將感測放大器與解碼驅動電路藏於記憶胞陣列正下方，極大化矽晶粒面積利用率。",
        "detailEn": "Peripheral read/write logic integrated directly beneath memory array stack."
      }
    ]
  },
  "ch14": {
    "id": "ch14",
    "src": "assets/photos/ch14-node-pitch-scaling.jpg",
    "categoryZh": "先進投影曝光機",
    "categoryEn": "Advanced Projection Stepper",
    "titleZh": "先進微縮節點精密投影曝光與晶圓步進對位機",
    "titleEn": "Advanced Node Projection Stepper & Multi-Patterning Alignment",
    "scaleZh": "次微米重疊對準精度 Overlay < 2 nm",
    "scaleEn": "Sub-micron Overlay Alignment Accuracy < 2 nm",
    "captionZh": "晶圓廠無塵室高階步進曝光機台，具備雙干涉儀晶圓載台與超低熱膨脹光學反射鏡組，支撐 10nm/7nm/5nm 多重曝光與自對準節距微縮（SADP/SAQP）。",
    "captionEn": "Advanced projection stepper featuring dual interferometer wafer stages and ultra-low thermal drift mirrors supporting tight overlay tolerances.",
    "matchZh": "對應左側製程節點微縮尺規：多重曝光節距分割之真實對準曝光機具。",
    "matchEn": "Hardware driver behind pitch division scaling and multi-patterning overlay requirements.",
    "metrology": {
      "voltage": "Optical Scale",
      "mag": "Scaling Chart",
      "fov": "1 µm to 2 nm",
      "techniqueZh": "半導體製程節點微縮步階圖譜實例",
      "techniqueEn": "Semiconductor Process Node Scaling Ruler"
    },
    "hotspots": [
      {
        "x": 30,
        "y": 40,
        "labelZh": "接觸多晶矽節距 (CPP Gate Pitch)",
        "labelEn": "Contacted Poly Pitch (CPP)",
        "detailZh": "量測電晶體閘極間隔的關鍵物理尺度，從微米級一路微縮至當前 45nm 以下。",
        "detailEn": "Fundamental metric defining distance between adjacent transistor gates."
      },
      {
        "x": 50,
        "y": 65,
        "labelZh": "金屬導線節距 (Metal Pitch M1)",
        "labelEn": "Minimum Metal Pitch (M1)",
        "detailZh": "最底層金屬導線之最小間距，決定標準邏輯單元的佈局密度極限。",
        "detailEn": "Tightest interconnect pitch determining standard cell height and routing."
      },
      {
        "x": 75,
        "y": 35,
        "labelZh": "標準單元軌道高度 (Track Height)",
        "labelEn": "Cell Track Height",
        "detailZh": "由 9T、7.5T 微縮至 6T 與 5T 超微縮邏輯單元，大幅削減晶片功耗與面積。",
        "detailEn": "Scaling from 9T to 5T standard cell architectures reducing active silicon area."
      }
    ]
  },
  "ch15": {
    "id": "ch15",
    "src": "assets/photos/ch15-metrology-profilometer.jpg",
    "categoryZh": "量測儀器實景",
    "categoryEn": "Metrology & Profilometry Tool",
    "titleZh": "無塵室精密表面輪廓量測儀 (Contact Profilometer)",
    "titleEn": "Cleanroom Precision Stylus Surface Profilometer",
    "scaleZh": "垂直解析度 < 0.1 nm · 掃描長度 50 mm",
    "scaleEn": "Vertical Resolution < 0.1 nm · 50 mm Scan Length",
    "captionZh": "線上薄膜輪廓儀實體機台，探針以精確微牛頓接觸力掃描晶圓表面，繪製次埃米級步階高度、CMP 平坦化殘留應力與薄膜翹曲度（Warpage）。",
    "captionEn": "Cleanroom stylus profilometer measuring sub-angstrom step heights, CMP post-polish dishing, and wafer warpage non-destructively.",
    "matchZh": "對應左側 CD-SEM 與光學量測模型：非破壞線上量測晶圓物理尺寸之真實機具。",
    "matchEn": "Direct physical tool corresponding to CD metrology and surface topography verification.",
    "metrology": {
      "voltage": "White Light / Laser",
      "mag": "Interferometer",
      "fov": "10 mm Scan",
      "techniqueZh": "非接觸式光學表面輪廓量測儀 (Optical Profilometer)",
      "techniqueEn": "Non-Contact Optical Surface Profilometer"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 25,
        "labelZh": "白光干涉物鏡頭 (Interferometric Objective)",
        "labelEn": "Mirau Interferometer Lens",
        "detailZh": "精密光學干涉鏡頭，利用光程差產生納米級等高干涉條紋，量測晶圓表面粗糙度。",
        "detailEn": "Optical lens generating nanometer-scale interference fringes for topography."
      },
      {
        "x": 50,
        "y": 65,
        "labelZh": "壓電式微動掃描台 (Piezoelectric Z-Stage)",
        "labelEn": "Piezoelectric Scanner",
        "detailZh": "皮米級步進壓電致動器，驅動鏡頭垂直微步掃描，建構三維立體高程圖形。",
        "detailEn": "Picometer-resolution actuator providing vertical scanning for 3D mapping."
      },
      {
        "x": 80,
        "y": 55,
        "labelZh": "即時視覺定位鏡頭 (High-Res Alignment Camera)",
        "labelEn": "Pattern Recognition Vision",
        "detailZh": "同軸光學輔助相機，自動比對晶圓圖案座標並自動導航至量測目標特徵。",
        "detailEn": "Machine vision camera recognizing die patterns for automated navigation."
      }
    ]
  },
  "ch16": {
    "id": "ch16",
    "src": "assets/photos/ch16-defect-inspection-him.jpg",
    "categoryZh": "缺陷檢測顯微儀",
    "categoryEn": "Defect Inspection Microscope",
    "titleZh": "氦離子顯微鏡與高解析奈米缺陷分析儀 (HIM / SEM)",
    "titleEn": "Helium Ion & Scanning Electron Defect Inspection System",
    "scaleZh": "亞奈米束流聚焦 · 次表面奈米缺陷定位",
    "scaleEn": "Sub-Nanometer Spot Size · Subsurface Defect Isolation",
    "captionZh": "先進半導體故障分析顯微儀器，具備高對比離子與電子成像模式，可穿透氧化層精確定位奈米顆粒微裂紋、金屬空洞（Void）與電晶體短路位置。",
    "captionEn": "Advanced helium ion microscope providing sub-nanometer imaging to isolate particle shorts, electromigration voids, and lattice dislocations.",
    "matchZh": "對應左側晶圓缺陷圖譜與 FIB 切片模型：尋找良率殺手之尖端分析顯微機台。",
    "matchEn": "Physical tool behind FIB cross-sectioning and physical defect failure analysis.",
    "metrology": {
      "voltage": "He+ 30 kV",
      "mag": "500,000×",
      "fov": "500 nm",
      "techniqueZh": "氦離子顯微鏡 (Helium Ion Microscope HIM)",
      "techniqueEn": "Sub-Nanometer Helium Ion Defect Inspection"
    },
    "hotspots": [
      {
        "x": 45,
        "y": 40,
        "labelZh": "次奈米聚焦氦離子束斑 (Helium Ion Spot)",
        "labelEn": "Sub-nm He+ Beam Spot",
        "detailZh": "單原子尖端場發射源產生之 0.25nm 極微束斑，具備超大景深與無荷電效應優勢。",
        "detailEn": "Gas field ion source producing 0.25nm spot for high-contrast defect inspection."
      },
      {
        "x": 55,
        "y": 50,
        "labelZh": "微小開路缺陷空洞 (Sub-surface Void Defect)",
        "labelEn": "Sub-surface Void Flaw",
        "detailZh": "後段金屬介層孔沉積不完全形成的微小空泡，導致金屬互連電阻劇增與良率折損。",
        "detailEn": "Microscopic void in via fill causing resistance anomalies and killer defects."
      },
      {
        "x": 80,
        "y": 35,
        "labelZh": "背向散射離子偵測器 (Everhart-Thornley Detector)",
        "labelEn": "Backscatter Ion Collector",
        "detailZh": "超靈敏離子偵測陣列，精確接收晶圓表面逸出之二次電子與反散射離子信號。",
        "detailEn": "High-gain secondary electron and ion detector mapping surface material topography."
      }
    ]
  },
  "ch17": {
    "id": "ch17",
    "src": "assets/photos/ch17-parametric-test-spc.jpg",
    "categoryZh": "電性測試機台",
    "categoryEn": "Parametric Test & SPC Station",
    "titleZh": "晶圓參數測試工作站與 SPC 即時監控平台",
    "titleEn": "Wafer Parametric Characterization Bench & SPC Interface",
    "scaleZh": "百萬級量測數據吞吐 · 即時 Cpk 演算",
    "scaleEn": "Million-Data-Point Throughput · Real-Time Cpk Engine",
    "captionZh": "無塵室晶圓參數電性測試站，整合半導體參數分析儀、自動針測治具與 SPC 監控軟體，即時監控薄膜電阻、電容與漏電流的分佈離散度。",
    "captionEn": "Cleanroom parametric characterization station integrating automated probe fixtures and SPC analytics to track sheet resistance and leakage drift.",
    "matchZh": "對應左側 SPC 管制圖與判異規則：蒐集實機物理電性訊號並計算管制界限之來源工作站。",
    "matchEn": "Hardware source feeding data into Shewhart SPC charts and Western Electric anomaly detection.",
    "metrology": {
      "voltage": "Parametric Multi-Pin",
      "mag": "Tester View",
      "fov": "Full Wafer",
      "techniqueZh": "晶圓廠全自動參數電性量測機台 (Parametric Tester)",
      "techniqueEn": "Automated In-Line Parametric & SPC Workstation"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 30,
        "labelZh": "低漏電針測矩陣開關 (Low-Leakage Matrix Switch)",
        "labelEn": "Sub-fA Switching Matrix",
        "detailZh": "飛安培 (fA) 級超低漏電矩陣開關，在數微秒內切換不同測試針腳量測 Ion 與 Vth。",
        "detailEn": "High-speed matrix switch routing picoamp signals to SMU test instruments."
      },
      {
        "x": 50,
        "y": 60,
        "labelZh": "開爾文四線式探針 (Kelvin 4-Wire Probes)",
        "labelEn": "Kelvin 4-Wire Contact",
        "detailZh": "分離式激勵電流線與電壓量測線，徹底消除接觸阻抗與導線電阻對量測結果的干擾。",
        "detailEn": "Separate force and sense leads eliminating cable and contact resistance."
      },
      {
        "x": 75,
        "y": 70,
        "labelZh": "即時 SPC 管制圖儀表 (Live SPC Control Dashboard)",
        "labelEn": "Real-time SPC Control Chart",
        "detailZh": "即時計算 Cpk 數值與 Western Electric 判異規則，超標立即觸發產線自動閉鎖。",
        "detailEn": "Automated SPC console calculating Cpk and triggering interlocks on out-of-spec runs."
      }
    ]
  },
  "ch18": {
    "id": "ch18",
    "src": "assets/photos/ch18-foup-wafer-carrier.jpg",
    "categoryZh": "FOUP 晶圓載具實體",
    "categoryEn": "FOUP Transport Carrier Artifact",
    "titleZh": "300mm 前開式晶圓傳送盒實體 (300mm FOUP Pod)",
    "titleEn": "300mm Front Opening Unified Pod (FOUP) Carrier",
    "scaleZh": "容納 25 片 300mm 晶圓 · 氣密氮氣填充充氣閥",
    "scaleEn": "Holds 25x 300mm Wafers · Hermetic N₂ Purge Port",
    "captionZh": "晶圓廠實體 300mm FOUP 傳送盒正面視圖，具備精密封閉門片、晶圓支撐齒軌與頂部天車機械手夾爪，當站點觸發 OCAP 時由系統自動閉鎖隔離。",
    "captionEn": "Front view of an authentic 300mm FOUP showing robotic hoist flange, hermetic door seal, and wafer teeth holding 25 production wafers safely.",
    "matchZh": "對應左側異常處理 OCAP 與 Hold 站點互鎖：晶圓廠物理搬運與受控隔離之核心容器。",
    "matchEn": "Physical container governed by MES Hold interlocks and automated OHT routing during excursions.",
    "metrology": {
      "voltage": "Cleanliness Class 1",
      "mag": "Carrier Macro",
      "fov": "300 mm Carrier",
      "techniqueZh": "300mm 晶圓密閉傳輸盒 (FOUP) 實體實拍",
      "techniqueEn": "300mm Front Opening Unified Pod (FOUP)"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 35,
        "labelZh": "氣密前門密封圈 (Hermetic Door Gasket)",
        "labelEn": "Front Door Hermetic Seal",
        "detailZh": "耐磨高分子彈性體密封條，在天車運送過程中隔絕無塵室外在環境微粒與有機氣態分子。",
        "detailEn": "Elastomer seal keeping internal environment Class 0.1 during transit."
      },
      {
        "x": 50,
        "y": 65,
        "labelZh": "高純氮氣破真空吹氣閥 (N2 Purge Breathing Port)",
        "labelEn": "N2 Purge Purifier Valve",
        "detailZh": "底部四點定位吹氣閥，在機台 Loadport 自動注入超純乾燥氮氣，抑制晶圓表面銅氧化。",
        "detailEn": "Bottom check valves purging nitrogen to suppress humidity and copper oxidation."
      },
      {
        "x": 25,
        "y": 75,
        "labelZh": "機械手定位定位錐孔 (Kinematic Coupling Pins)",
        "labelEn": "Kinematic Coupling V-Grooves",
        "detailZh": "底座精密三點 V 型導引凹槽，確保 FOUP 與機台裝載口對接重複定位精度在微米以內。",
        "detailEn": "Three kinematic grooves ensuring sub-micron docking repeatability at load ports."
      }
    ]
  },
  "ch19": {
    "id": "ch19",
    "src": "assets/photos/ch19-probe-card-testing.jpg",
    "categoryZh": "探針卡實體",
    "categoryEn": "Wafer Test Probe Card",
    "titleZh": "半導體晶圓測試探針卡實體 (Semiconductor Probe Card)",
    "titleEn": "Semiconductor Wafer Circuit Probing (CP) Probe Card",
    "scaleZh": "數千根微米級鎢探針 · 高密度多層 PCB 基板",
    "scaleEn": "Thousands of Micro-Tungsten Needles · Multi-Layer PCB",
    "captionZh": "實體晶圓針測（CP）探針卡，圓形多層印刷電路板中央排列著密集如梳的垂直鎢合金微探針，在顯微鏡下精確接觸晶粒焊墊以進行電性良品篩選。",
    "captionEn": "Real Circuit Probing (CP) card featuring an array of micro-machined vertical tungsten probe needles contacting die pads simultaneously.",
    "matchZh": "對應左側 WAT 劃線區與 CP 針測模型：在晶圓切割前篩選已知良品（KGD）之實體測試工具。",
    "matchEn": "Physical hardware interface executing wafer-level sort and Known Good Die (KGD) classification.",
    "metrology": {
      "voltage": "High-Density Probe",
      "mag": "Probe Array Macro",
      "fov": "100 mm Array",
      "techniqueZh": "垂直式微機電探針卡 (Vertical MEMS Probe Card)",
      "techniqueEn": "Vertical MEMS Multi-Die Probe Card Array"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 35,
        "labelZh": "微機電垂直彈性探針 (Vertical MEMS Probes)",
        "labelEn": "Vertical Cobra MEMS Pins",
        "detailZh": "鎢鈷合金微機電垂直探針陣列，可承受數萬次微米級下壓行程並刺穿晶粒鋁/銅焊墊氧化層。",
        "detailEn": "Tungsten-alloy vertical pins providing consistent overdrive scrub on pads."
      },
      {
        "x": 50,
        "y": 60,
        "labelZh": "多層陶瓷空間轉換器 (MLC Space Transformer)",
        "labelEn": "Multi-Layer Ceramic Interposer",
        "detailZh": "高剛性高密度多層陶瓷基板，將微米級探針間距轉換發散至公厘級測試機台電路板。",
        "detailEn": "Co-fired ceramic substrate translating fine pitch to PCB test-head contacts."
      },
      {
        "x": 20,
        "y": 40,
        "labelZh": "晶圓對位光學標記 (Optical Alignment Fiducials)",
        "labelEn": "Laser Alignment Marks",
        "detailZh": "探針卡邊緣的高反射率雷射十字標記，供自動機台光學鏡頭即時校正角度與共面性。",
        "detailEn": "Precision fiducials guiding high-speed automated theta/Z planarization."
      }
    ]
  },
  "ch20": {
    "id": "ch20",
    "src": "assets/photos/ch20-wire-bonding-micro.jpg",
    "categoryZh": "打線微觀顯微實拍",
    "categoryEn": "Wire Bonding Micrograph",
    "titleZh": "晶片打線封裝金線球焊微觀實拍 (Gold Wire Bonding)",
    "titleEn": "Gold Ball-Wedge Wire Bonding Micrograph",
    "scaleZh": "金線直徑 15 ~ 25 µm · 超音波熱壓焊點",
    "scaleEn": "Wire Diameter 15-25 µm · Thermosonic Ball Bond",
    "captionZh": "高倍率光學顯微鏡下拍攝之實體晶片打線照片，金線透過超音波熱壓在晶片鋁焊墊上形成球形焊接（Ball Bond），弧形延伸至導線架引腳形成楔形焊點。",
    "captionEn": "High-magnification micrograph of gold thermosonic wire bonding showing gold ball bonds on aluminum die pads arching to leadframe fingers.",
    "matchZh": "對應左側傳統封裝與覆晶模型：第一代晶片電性對外互連之實體金線微觀照片。",
    "matchEn": "Microscopic proof of wire bonding geometry vs. modern area-array flip-chip bumps.",
    "metrology": {
      "voltage": "Optical Stereo Zoom",
      "mag": "40× Stereo",
      "fov": "5 mm Field",
      "techniqueZh": "超音波熱壓金線球焊顯微特寫 (Wire Bonding)",
      "techniqueEn": "Thermosonic Gold Ball Wire Bonding Micrograph"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 25,
        "labelZh": "超音波金球焊接頸 (Ball Bond Neck)",
        "labelEn": "Melted Gold Ball Neck",
        "detailZh": "高壓放電在金線末端熔成真球度極佳的自由空氣球，在超音波震動與加熱下與晶粒焊墊共晶結合。",
        "detailEn": "Free air ball bonded thermosonically to die pad forming Au-Al intermetallic."
      },
      {
        "x": 55,
        "y": 50,
        "labelZh": "金線弧形跨距 (Wire Loop Trajectory)",
        "labelEn": "Controlled Wire Loop Profile",
        "detailZh": "精密微電腦焊頭控制金線提拉與彎折軌跡，確保金線在封膠模壓時不致因樹脂流速而倒線短路。",
        "detailEn": "Algorithmically controlled loop arc preventing wire sweep during transfer molding."
      },
      {
        "x": 25,
        "y": 75,
        "labelZh": "導線架引腳鍵合點 (Lead Frame Wedge Bond)",
        "labelEn": "Lead Frame Finger Bond",
        "detailZh": "金線尾端在銅合金鍍銀導線架上進行楔形壓接，引出晶片電氣輸入輸出引腳。",
        "detailEn": "Wedge bond stitching gold wire to silver-plated leadframe fingers."
      }
    ]
  },
  "ch21": {
    "id": "ch21",
    "src": "assets/photos/ch21-advanced-3d-packaging.jpg",
    "categoryZh": "封裝研究樣品",
    "categoryEn": "Packaging research sample",
    "titleZh": "3D Orthogonal Quilt Packaging 樣品",
    "titleEn": "3D Orthogonal Quilt Packaging sample",
    "scaleZh": "附公分尺規 · 非微結構量測",
    "scaleEn": "Centimetre ruler · not a microstructure measurement",
    "captionZh": "原始照片名為 3D Orthogonal Quilt Packaging。可見水平放置的方形樣品、中央直立結構及前方尺規；來源未指認 HBM、TSV、C4 或 RDL，也未提供封裝尺寸與放大倍率。",
    "captionEn": "The source names this sample 3D Orthogonal Quilt Packaging. A horizontal square sample, an upright structure and a ruler are visible. The source does not identify HBM, TSVs, C4 or RDL, or report package dimensions or magnification.",
    "matchZh": "用來觀察立體組裝的外觀。旁側 CoWoS／SoIC 圖為獨立原理示意，不能把圖中的中介層、記憶體或接點對號到這張照片。",
    "matchEn": "An exterior example of three-dimensional assembly. The adjacent CoWoS/SoIC diagrams are separate teaching models; their interposer, memory and contacts cannot be mapped onto this photo.",
    "metrology": {
      "voltage": "Not reported by source",
      "voltageZh": "來源未提供",
      "mag": "Not reported by source",
      "magZh": "來源未提供",
      "fov": "Not reported by source",
      "fovZh": "來源未提供",
      "techniqueZh": "可見光樣品照片",
      "techniqueEn": "Visible-light sample photograph"
    },
    "hotspots": [
      {
        "x": 43,
        "y": 43,
        "labelZh": "水平放置的樣品",
        "labelEn": "Horizontal sample",
        "detailZh": "可見方形表面與金色圖樣；來源未說明其電路功能，不能據此認定為矽中介層或 TSV。",
        "detailEn": "A square surface with gold-coloured patterns is visible. Their circuit function is not identified; this is not evidence of a silicon interposer or TSVs."
      },
      {
        "x": 51,
        "y": 28,
        "labelZh": "中央直立結構",
        "labelEn": "Central upright structure",
        "detailZh": "可見相對於底面直立的薄片結構；來源未將其辨識為 HBM 或多層 DRAM。",
        "detailEn": "A thin structure stands upright relative to the base. The source does not identify it as HBM or stacked DRAM."
      },
      {
        "x": 50,
        "y": 80,
        "labelZh": "公分尺規",
        "labelEn": "Centimetre ruler",
        "detailZh": "照片前方標有 cm 的尺規，提供外觀尺度參考。此處不是 C4 凸塊或 RDL；透視照片不可當作微結構節距量測。",
        "detailEn": "The ruler marked cm provides a visual size reference. This is not a C4 bump or RDL array; a perspective photograph is not a microstructure-pitch measurement."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:3D_Orthogonal_Quilt_Packaging.jpg",
      "author": "Jacksontlu",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "noteZh": "沿用現有照片；本站另加熱點與圖說。來源未提供拍攝倍率、校準視場或接點節距。",
      "noteEn": "Existing local photo retained; markers and captions added by this site. Magnification, calibrated field of view and contact pitch are not reported."
    },
    "diagramReference": {
      "noteZh": "剖面原理示意・非按比例。CoWoS-S 的中介層互連與 SoIC 的垂直鍵合分開呈現；顯示數值為既有教學案例，不是照片量測值，也不是所有產品的規格。",
      "noteEn": "Conceptual cross-section · not to scale. CoWoS-S interposer connections and SoIC vertical bonding are separate models. Values are existing teaching examples, not photo measurements or specifications for every product.",
      "links": [
        {
          "label": "TSMC · off-chip interconnect",
          "url": "https://research.tsmc.com/page/off-chip-interconnect/1.html"
        }
      ]
    }
  },
  "ch22": {
    "id": "ch22",
    "src": "assets/photos/ch22-reliability-leak-test.jpg",
    "categoryZh": "可靠度機台實景",
    "categoryEn": "Reliability Test Tool",
    "titleZh": "半導體封裝氣密檢漏與可靠度環境測試機台",
    "titleEn": "Packaging Hermetic Seal Leak Detection & Stress Station",
    "scaleZh": "氦氣質譜檢漏靈敏度 10⁻¹⁰ mbar·L/s",
    "scaleEn": "Helium Leak Sensitivity 10⁻¹⁰ mbar·L/s",
    "captionZh": "晶片封裝可靠度檢漏設備，利用氦氣加壓滲透與質譜分析，嚴格檢驗封裝膠體與陶瓷管殼的微觀縫隙，防止濕氣侵入引發電化學腐蝕。",
    "captionEn": "Helium mass spectrometer leak detector inspecting packaged semiconductor hermeticity against moisture penetration and corrosion.",
    "matchZh": "對應左側浴缸曲線與失效分析模型：早期失效率篩檢與環境加速老化測試機具。",
    "matchEn": "Hardware station executing infant mortality screening and hermetic seal qualification.",
    "metrology": {
      "voltage": "High Vacuum 10⁻⁵ Torr",
      "mag": "Chamber View",
      "fov": "1.2 m Station",
      "techniqueZh": "封裝氣密性檢漏與氦質譜儀真空分析機台",
      "techniqueEn": "Helium Mass Spectrometer Hermetic Leak Tester"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 35,
        "labelZh": "加壓充氦加壓室 (Helium Bombing Chamber)",
        "labelEn": "Pressurized Helium Bombing Tank",
        "detailZh": "將被測密封晶片浸置於數個大氣壓之高純氦氣腔體中，迫使氣體經微裂紋滲透至封裝內部。",
        "detailEn": "Chamber forcing tracer helium gas into micro-leaks under multi-bar pressure."
      },
      {
        "x": 50,
        "y": 65,
        "labelZh": "磁偏轉質譜分析室 (Helium Mass Spectrometer)",
        "labelEn": "Mass Spectrometer Cell",
        "detailZh": "調諧至質量數 4 (He+) 的超靈敏質譜檢測計，偵測下限可達 10⁻¹² atm·cc/s 航太級氣密標準。",
        "detailEn": "Magnetic sector cell detecting trace helium down to 10⁻¹² atm-cc/sec."
      },
      {
        "x": 20,
        "y": 55,
        "labelZh": "快速抽真空旁通閥 (Quick Vacuum Bypass)",
        "labelEn": "High-Vacuum Turbo Bypass",
        "detailZh": "多級乾式羅茨泵與渦輪分子泵，在數秒內將檢測腔抽至高真空以進行快速批次判定。",
        "detailEn": "Fast roughing and turbomolecular pumping sequence for high-throughput testing."
      }
    ]
  },
  "ch23": {
    "id": "ch23",
    "src": "assets/photos/ch23-cim-fab-automation.jpg",
    "categoryZh": "智慧製造自動化",
    "categoryEn": "Smart CIM Automation",
    "titleZh": "300mm 智慧製造全自動無塵室走廊 (GigaFab Cleanroom)",
    "titleEn": "Automated 300mm GigaFab Bay & Overhead OHT Highway",
    "scaleZh": "天車車速 > 5 m/s · 千台天車同步調度 · 零微粒污染",
    "scaleEn": "OHT Speed > 5 m/s · Fleet Dispatching · Zero Contamination",
    "captionZh": "現代 300mm 晶圓廠 Class 1 超潔淨作業區，全廠由電腦整合製造系統（CIM）集中調度，天車在天花板鋼軌上以每秒 5 公尺高速運送 FOUP 晶圓盒。",
    "captionEn": "Modern 300mm Class-1 cleanroom bay orchestrated by Computer Integrated Manufacturing (CIM), with overhead OHT vehicles speeding on ceiling tracks.",
    "matchZh": "對應左側 Q-Time 與智慧防呆模型：CIM 派工、物料自動搬送與防呆互鎖之宏觀實景。",
    "matchEn": "Macro-scale view of SECS/GEM and OHT fleet scheduling eliminating human handling error.",
    "metrology": {
      "voltage": "Smart Fab 24/7",
      "mag": "Cleanroom Panoramic",
      "fov": "30 m Bay",
      "techniqueZh": "全自動現代化晶圓代工廠智慧製造無塵室全景",
      "techniqueEn": "Automated 300mm Smart Foundry Cleanroom"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 15,
        "labelZh": "OHT 智慧調度天車軌道 (Overhead Hoist Track)",
        "labelEn": "Smart OHT Rail Grid",
        "detailZh": "全天候無人運作的立體軌道網絡，由 AI 演算法即時調度天車車流避免交通節點擁塞。",
        "detailEn": "Continuous 3D track network dynamically balanced by dispatch AI algorithms."
      },
      {
        "x": 50,
        "y": 55,
        "labelZh": "百萬級設備叢集陣列 (Tool Cluster Bays)",
        "labelEn": "Standard Tool Bay Array",
        "detailZh": "標準化機台工作站排列，各腔體具備 SECS/GEM 與 APC 進階製程即時閉迴路控制。",
        "detailEn": "Equipments equipped with SECS/GEM interface and advanced process control (APC)."
      },
      {
        "x": 80,
        "y": 70,
        "labelZh": "氣鎖物料緩衝站 (Stocker Buffer Station)",
        "labelEn": "Automated Wafer Stocker",
        "detailZh": "具備微正壓高純氮氣環境的大型晶圓自動儲存倉，為產線動態平衡提供即時晶圓暫存。",
        "detailEn": "Nitrogen-purged automated high-bay warehouse buffering FOUPs between steps."
      }
    ]
  },
  "ch24": {
    "id": "ch24",
    "src": "assets/photos/ch24-decapped-cpu-die.jpg",
    "categoryZh": "矽晶粒微觀實拍",
    "categoryEn": "Decapped Silicon Die Photo",
    "titleZh": "微處理器開蓋矽晶粒電路全景實拍 (Decapped CPU Die)",
    "titleEn": "Decapped Microprocessor Silicon Die Architecture",
    "scaleZh": "百萬電晶體電路巨集 · 算術單元與匯流排總線",
    "scaleEn": "Million-Transistor Macro · ALU & Bus Architecture",
    "captionZh": "實體矽晶粒開蓋顯微全景照片，清晰呈現內部指令快取記憶體、暫存器陣列、算術邏輯單元（ALU）與時脈分配樹，揭示軟體指令底層運行的物理實體。",
    "captionEn": "Optical macro photograph of a decapped microprocessor die revealing on-chip memory banks, execution units, and clock distribution trees.",
    "matchZh": "對應左側軟韌體視角硬體真相：Row Hammer、IR Drop 與記憶單元干擾之物理電路本體。",
    "matchEn": "The real physical silicon underlying software abstractions, Rowhammer disturbance, and voltage drops.",
    "metrology": {
      "voltage": "Optical Die Panoramic",
      "mag": "Macro 10:1",
      "fov": "14×20 mm Die",
      "techniqueZh": "去封裝開蓋處理器晶粒微架構全覽 (Decapped Die)",
      "techniqueEn": "Decapped Microprocessor Silicon Die Architecture"
    },
    "hotspots": [
      {
        "x": 45,
        "y": 30,
        "labelZh": "超純運算核心區 (Compute Core Array)",
        "labelEn": "CPU Execution Cores",
        "detailZh": "包含算術邏輯單元 (ALU)、向量暫存器與分枝預測單元，由數億顆奈米電晶體緊密聚合。",
        "detailEn": "Dense computational logic executing instructions clocked at multi-GHz frequencies."
      },
      {
        "x": 55,
        "y": 55,
        "labelZh": "三級共用高速快取 (Shared L3 SRAM Cache)",
        "labelEn": "Shared L3 SRAM Array",
        "detailZh": "超高密度的 6T-SRAM 靜態隨機存取單元，負責抵禦記憶體讀寫延遲並緩衝頻寬衝擊。",
        "detailEn": "High-density 6T-SRAM blocks cushioning CPU pipelines against DRAM memory latency."
      },
      {
        "x": 20,
        "y": 75,
        "labelZh": "晶片週邊去耦電容網 (Decoupling Capacitor Grid)",
        "labelEn": "On-Die Decoupling Caps",
        "detailZh": "分佈於核心周圍的溝槽電容陣列，即時穩定奈米瞬態大電流並壓制 IR Drop 電源噪聲。",
        "detailEn": "Integrated trench capacitors buffering fast transient currents to prevent IR drop."
      }
    ]
  },
  "app-glossary": {
    "id": "app-glossary",
    "src": "assets/photos/app-glossary-ellipsometer.jpg",
    "categoryZh": "光學計量設備",
    "categoryEn": "Optical Metrology Reference Tool",
    "titleZh": "半導體薄膜橢圓偏光量測儀 (Optical Ellipsometer)",
    "titleEn": "Spectroscopic Ellipsometer Thin-Film Measurement Tool",
    "scaleZh": "波長 190 ~ 1000 nm · 膜厚精度 0.01 nm (0.1 Å)",
    "scaleEn": "Wavelength 190-1000 nm · Film Accuracy 0.01 nm",
    "captionZh": "附錄 A 術語字典對應之光學橢圓偏光儀，以偏振光干涉原理非破壞量測折射率（n）、消光係數（k）與奈米級薄膜厚度，定義半導體計量之通用物理基準。",
    "captionEn": "Spectroscopic ellipsometer measuring optical constants (n, k) and sub-nanometer film thicknesses, anchoring the physical definitions in Appendix A.",
    "matchZh": "對應附錄 A 術語拓撲星系：為 245 筆半導體計量名詞提供真實物理基準。",
    "matchEn": "Anchors the 245 terminology definitions with precision optical measurement hardware.",
    "metrology": {
      "voltage": "Laser 632.8 nm",
      "mag": "Optical Analysis",
      "fov": "10 mm Sample",
      "techniqueZh": "高精度分光光度橢圓偏光量測儀實機",
      "techniqueEn": "High-Precision Spectroscopic Ellipsometer"
    },
    "hotspots": [
      {
        "x": 30,
        "y": 35,
        "labelZh": "偏振起偏鏡發射組 (Polarizer Arm)",
        "labelEn": "Polarizer Transmitter Arm",
        "detailZh": "發射已知線性偏振態之寬光譜雷射，以布魯斯特角（Brewster Angle）入射晶圓表面。",
        "detailEn": "Generates known polarization state laser incident on wafer at oblique angles."
      },
      {
        "x": 70,
        "y": 35,
        "labelZh": "偏振檢偏鏡接收器 (Analyzer Detector)",
        "labelEn": "Rotating Analyzer Detector",
        "detailZh": "高靈敏光度檢測計量測反射光振幅比 Ψ 與相位差 Δ，反算埃米級薄膜厚度與折射率。",
        "detailEn": "Measures psi and delta angles to extract sub-angstrom film thickness and refractive index."
      },
      {
        "x": 50,
        "y": 75,
        "labelZh": "真空吸附晶圓載台 (Vacuum Wafer Chuck)",
        "labelEn": "Vacuum Sample Stage",
        "detailZh": "高平坦度樣品吸附台，具備傾角自動微調補償，消除晶圓微小翹曲對光程分析之干擾。",
        "detailEn": "Flat vacuum stage with automated tilt leveling correcting for wafer warpage."
      }
    ]
  },
  "app-jargon": {
    "id": "app-jargon",
    "src": "assets/photos/app-jargon-fab-tool.jpg",
    "categoryZh": "現場作業機台",
    "categoryEn": "Fab Floor Operations Workstation",
    "titleZh": "光阻塗佈顯影機台與現場操作控制台 (Coater-Developer Track)",
    "titleEn": "Wafer Photoresist Coater-Developer Track Workstation",
    "scaleZh": "全自動旋轉塗佈 · 邊緣清洗 EBR · 烘烤熱板",
    "scaleEn": "Spin Coating · Edge Bead Removal (EBR) · Chill/Bake Plates",
    "captionZh": "附錄 B 晶圓廠日常交接、Run 貨、Check-in、Pass 貨與機台調校（Recipe）之真實工作站與無塵室機台操作人機界面（HMI）。",
    "captionEn": "Actual cleanroom wafer track console where daily shift handoffs, lot processing, recipe tweaking, and tool check-ins take place.",
    "matchZh": "對應附錄 B 晶圓廠現場行話：真實機台操作現場口語與交接作息之實景對照。",
    "matchEn": "Physical setting for the 43 fab slangs, lot check-ins, and shift-turnover meetings.",
    "metrology": {
      "voltage": "Cluster System",
      "mag": "Bay Macro",
      "fov": "4 m Platform",
      "techniqueZh": "晶圓廠全自動多腔體群集設備實景",
      "techniqueEn": "Multi-Chamber Semiconductor Cluster Architecture"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 25,
        "labelZh": "中央傳輸真空腔 (Central Transfer Core)",
        "labelEn": "Central Vacuum Backbone",
        "detailZh": "中央六角形超高真空主幹，機械手臂由此將晶圓在蝕刻、清洗與量測腔之間高速分派。",
        "detailEn": "Central hexagonal chamber routing wafers between processing modules under vacuum."
      },
      {
        "x": 20,
        "y": 55,
        "labelZh": "裝載互鎖預抽室 (Loadlock Air-lock)",
        "labelEn": "Dual Loadlock Chambers",
        "detailZh": "由大氣大於 1 atm 快速粗抽至 10⁻³ Torr 之氣閘腔，避免外界空氣倒灌進入製程真空區。",
        "detailEn": "Dual airlocks cycling between atmosphere and vacuum preventing fab air ingress."
      },
      {
        "x": 78,
        "y": 55,
        "labelZh": "製程反應獨立小腔 (Independent Process Modules)",
        "labelEn": "Dedicated Process Facets",
        "detailZh": "模組化反應腔體，各司其職完成特定化學反應，支援個別腔體離線維護不影響整體運轉。",
        "detailEn": "Modular chambers running isolated recipes allowing hot-swappable maintenance."
      }
    ]
  },
  "app-reading": {
    "id": "app-reading",
    "src": "assets/photos/app-reading-silicon-wafer.jpg",
    "categoryZh": "製造技術結晶",
    "categoryEn": "Manufacturing Milestone Artifact",
    "titleZh": "現代半導體製造工程結晶 300mm 晶圓實體",
    "titleEn": "Modern Semiconductor Manufacturing Milestone 300mm Wafer",
    "scaleZh": "頂級製造工藝產物 · 數百億電晶體異質整合",
    "scaleEn": "Peak Manufacturing Craft · Billions of Transistors Integrated",
    "captionZh": "附錄 C 半導體工程師修煉技能樹與經典研讀指南對應之現代高階製程 300mm 晶圓實物，代表材料科學、量子物理、精密光學與控制工程的終極融合。",
    "captionEn": "Modern 300mm silicon wafer embodying the culmination of semiconductor literature, quantum physics, precision optics, and control theory.",
    "matchZh": "對應附錄 C 四階工程修煉地圖：經典教科書理論轉化為百億電晶體晶圓之終極實體。",
    "matchEn": "The real-world manifestation of the engineering skill tree and classic textbook principles.",
    "metrology": {
      "voltage": "Optical Mirror 1:1",
      "mag": "Macro Mirror",
      "fov": "300 mm Mirror",
      "techniqueZh": "300mm 超鏡面半導體高純矽晶圓實體",
      "techniqueEn": "300mm Prime Mirror-Polished Silicon Substrate"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 35,
        "labelZh": "原子級超鏡面晶圓表面 (Atomic Mirror Surface)",
        "labelEn": "Atomically Flat Polished Surface",
        "detailZh": "表面粗糙度小於 0.1nm 之極致單晶矽基底，如同一面完美鏡子倒映周圍晶圓廠環境。",
        "detailEn": "Sub-angstrom surface roughness Ra < 0.1nm reflecting cleanroom lighting flawlessly."
      },
      {
        "x": 80,
        "y": 45,
        "labelZh": "晶圓邊緣拋光倒角 (Chamfered Bevel Edge)",
        "labelEn": "Edge Bevel Profile",
        "detailZh": "精密拋光成圓弧狀的邊緣輪廓，能極大化分散機械夾持應力並防止矽材料崩角破片。",
        "detailEn": "Cross-sectional round edge bevel preventing silicon micro-chipping and stress cracks."
      },
      {
        "x": 50,
        "y": 92,
        "labelZh": "晶圓定向缺口 (Orientation Notch)",
        "labelEn": "Laser Alignment Notch",
        "detailZh": "精密雷射切割定位缺口，標定晶體晶向並引導自動化設備實現全方位旋轉同軸對稱。",
        "detailEn": "Standard mechanical datum notch defining crystallographic orientation for litho stages."
      }
    ]
  }
};
