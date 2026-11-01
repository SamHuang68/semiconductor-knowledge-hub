/**
 * real-photos.js
 * 晶圓廠真實設備、物理電顯 (SEM/TEM) 與晶圓封裝實體照片資料庫 (中英雙語對照)
 * 收錄全站 25 章正文與 3 篇附錄之高解析實物圖鑑、計量規格 (Metrology) 與物理微觀熱點 (Hotspots)
 */
export const REAL_PHOTOS_DATA = {
  "ch00": {
    "id": "ch00",
    "src": "assets/photos/ch00-wafer-300mm.jpg",
    "categoryZh": "圖樣晶圓參考照片",
    "categoryEn": "Patterned Wafer Reference",
    "titleZh": "重複矩形圖樣與彩色反光",
    "titleEn": "Repeated Rectangular Patterns and Colored Reflections",
    "scaleZh": "照片無尺標；直徑與製程規格未確認",
    "scaleEn": "No visible scale; diameter and process specifications unverified",
    "captionZh": "可見圓形樣品、重複矩形圖樣與彩色反光。原始來源、授權、材質、用途及實際尺寸未確認；照片不能證明晶向、WAT或矽光子結構。",
    "captionEn": "A circular sample with repeated rectangular patterns and colored reflections is visible. Original source, license, material, purpose and dimensions are unverified; the photo does not establish crystal orientation, WAT or silicon-photonics structures.",
    "matchZh": "輔助觀察晶圓與重複晶粒版圖概念；照片不驗證左側示意的製程節點、步數或性能。",
    "matchEn": "A visual reference for wafer and repeated-die-layout concepts; it does not validate the process node, step count or performance in the schematic.",
    "metrology": {
      "voltage": "Imaging conditions unverified",
      "voltageZh": "成像條件未確認",
      "mag": "Unverified",
      "magZh": "未確認",
      "fov": "Unverified",
      "fovZh": "未確認",
      "techniqueZh": "攝影方式與設備規格未確認",
      "techniqueEn": "Imaging technique and equipment specifications unverified"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 35,
        "labelZh": "重複矩形圖樣",
        "labelEn": "Repeated Rectangular Patterns",
        "detailZh": "可見多個重複矩形區塊及反光差異，無法由照片確認其電路用途或製程節點。",
        "detailEn": "Repeated rectangular regions and varying reflections are visible; circuit function and process node cannot be confirmed from this photo."
      },
      {
        "x": 50,
        "y": 92,
        "labelZh": "下方圓形邊緣",
        "labelEn": "Lower Circular Edge",
        "detailZh": "圖釘落在樣品下緣；此處不足以確認定位缺口、晶向或實際直徑。",
        "detailEn": "The pin marks the lower edge of the sample; it does not establish an alignment notch, crystal orientation or actual diameter."
      },
      {
        "x": 62,
        "y": 48,
        "labelZh": "圖樣區域邊界",
        "labelEn": "Patterned-Region Boundaries",
        "detailZh": "可見相鄰圖樣區塊的邊界；是否為切割道、WAT或對位結構尚未確認。",
        "detailEn": "Boundaries between patterned regions are visible; scribe lanes, WAT and alignment structures remain unconfirmed."
      }
    ]
  },
  "ch01": {
    "id": "ch01",
    "src": "assets/photos/ch01-cleanroom-amhs.jpg",
    "categoryZh": "作業環境參考照片",
    "categoryEn": "Work-Area Reference Photo",
    "titleZh": "黃光房間中的人員、工作檯與設備",
    "titleEn": "People, Workbenches and Equipment in a Yellow-Lit Room",
    "scaleZh": "潔淨分級、設備與成像規格未確認",
    "scaleEn": "Cleanliness class, equipment and imaging specifications unverified",
    "captionZh": "可見偏黃照明、穿連身防護衣的人員、工作桌及設備。原始來源與授權未確認；照片不能證明潔淨分級、壓差、FFU或AMHS配置。",
    "captionEn": "Yellow-tinted lighting, people in coveralls, worktables and equipment are visible. Original source and license are unverified; the photo does not establish cleanliness class, pressure difference, FFU or AMHS configuration.",
    "matchZh": "輔助理解受控作業環境的外觀；不是左側氣流、過濾或自動搬運模型的量測證據。",
    "matchEn": "A visual reference for a controlled work area; it is not measurement evidence for the airflow, filtration or automated transport models.",
    "metrology": {
      "voltage": "Imaging conditions unverified",
      "voltageZh": "成像條件未確認",
      "mag": "Unverified",
      "magZh": "未確認",
      "fov": "Unverified",
      "fovZh": "未確認",
      "techniqueZh": "攝影方式與設備規格未確認",
      "techniqueEn": "Imaging technique and equipment specifications unverified"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 15,
        "labelZh": "天花板區域",
        "labelEn": "Ceiling Area",
        "detailZh": "圖釘位於可見天花板板件附近；此處未確認有OHT軌道，亦不能判定過濾效率。",
        "detailEn": "The pin is near visible ceiling panels; an OHT track is not confirmed here, and filtration efficiency cannot be inferred."
      },
      {
        "x": 40,
        "y": 65,
        "labelZh": "工作桌與紙張區域",
        "labelEn": "Worktable and Papers",
        "detailZh": "圖釘落在工作桌與紙張附近，並非人員位置；設備功能與現場程序未確認。",
        "detailEn": "The pin marks the worktable and papers rather than a person; equipment functions and local procedures are unverified."
      },
      {
        "x": 18,
        "y": 45,
        "labelZh": "左側工作檯與手部區域",
        "labelEn": "Left Workbench and Hand Area",
        "detailZh": "可見左側人員的手部及工作檯附近區域；照明光譜、防護等級與製程用途未確認。",
        "detailEn": "The area near a person’s hand and the left workbench is visible; lighting spectrum, protection rating and process purpose are unverified."
      }
    ]
  },
  "ch02": {
    "id": "ch02",
    "src": "assets/photos/ch02-mosfet-sem.jpg",
    "categoryZh": "平面電路影像",
    "categoryEn": "Plan-View Circuit Image",
    "titleZh": "帶有 50 µm 尺標的重複電路圖樣",
    "titleEn": "Repeated Circuit Patterns with a 50 µm Scale Bar",
    "scaleZh": "影像標示 50 µm；成像方式與製程節點未確認",
    "scaleEn": "Image scale bar: 50 µm; imaging method and process node unverified",
    "captionZh": "可見平面重複矩形圖樣、水平線帶與 50 µm 尺標。原始來源、授權及成像條件未確認；此圖無法辨識閘極截面、介電材料或源汲極摻雜。",
    "captionEn": "Repeated rectangular patterns, horizontal bands and a 50 µm scale bar are visible in plan view. Original source, license and imaging conditions are unverified; gate cross-sections, dielectric material and source/drain doping cannot be identified here.",
    "matchZh": "作為電路圖樣的外觀參考，不是能帶、反轉層或接面物理的量測證據。",
    "matchEn": "A visual reference for circuit patterns, not measurement evidence for band diagrams, inversion layers or junction physics.",
    "metrology": {
      "voltage": "Imaging conditions unverified",
      "voltageZh": "成像條件未確認",
      "mag": "Unverified",
      "magZh": "未確認",
      "fov": "Unverified",
      "fovZh": "未確認",
      "techniqueZh": "成像方式與設備規格未確認",
      "techniqueEn": "Imaging method and equipment specifications unverified"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 28,
        "labelZh": "中央水平線帶",
        "labelEn": "Central Horizontal Bands",
        "detailZh": "圖釘位於水平平行線帶；無法據此確認金屬閘極。",
        "detailEn": "The pin lies on horizontal parallel bands; a metal gate cannot be identified from this view."
      },
      {
        "x": 50,
        "y": 46,
        "labelZh": "中央重複矩形區",
        "labelEn": "Central Repeated Rectangles",
        "detailZh": "可見重複矩形邊界；介電層材料與厚度未確認。",
        "detailEn": "Repeated rectangular boundaries are visible; dielectric material and thickness are unverified."
      },
      {
        "x": 30,
        "y": 70,
        "labelZh": "下方密集圖樣區",
        "labelEn": "Lower Dense Pattern Region",
        "detailZh": "可見密集電路圖樣；源汲極位置、摻雜與退火條件未確認。",
        "detailEn": "Dense circuit patterns are visible; source/drain locations, doping and anneal conditions are unverified."
      }
    ]
  },
  "ch03": {
    "id": "ch03",
    "src": "assets/photos/ch03-silicon-boule.jpg",
    "categoryZh": "展示品參考照片",
    "categoryEn": "Exhibit Reference Photo",
    "titleZh": "展示櫃中的反光晶棒與相鄰樣品",
    "titleEn": "Reflective Boule and Adjacent Samples in a Display Case",
    "scaleZh": "實際尺寸、重量、純度與生長條件未確認",
    "scaleEn": "Dimensions, mass, purity and growth conditions unverified",
    "captionZh": "可見具窄頸、寬肩與反光主體的展示品，以及周圍標牌和其他樣品。原始來源與授權未確認；照片不能證明純度、無差排或長晶爐操作條件。",
    "captionEn": "An exhibit with a narrow neck, broad shoulder and reflective body is visible, with placards and adjacent samples. Original source and license are unverified; purity, absence of dislocations and crystal-puller operating conditions are not established by the photo.",
    "matchZh": "輔助觀察晶棒外形；照片是展示情境，並非熔湯、旋轉或提拉過程的紀錄。",
    "matchEn": "A reference for boule shape; this is a display setting, not a record of molten silicon, rotation or pulling.",
    "metrology": {
      "voltage": "Imaging conditions unverified",
      "voltageZh": "成像條件未確認",
      "mag": "Unverified",
      "magZh": "未確認",
      "fov": "Unverified",
      "fovZh": "未確認",
      "techniqueZh": "成像方式與設備規格未確認",
      "techniqueEn": "Imaging method and equipment specifications unverified"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 15,
        "labelZh": "上方窄頸與肩部",
        "labelEn": "Upper Neck and Shoulder",
        "detailZh": "可見狹窄頂部向寬肩過渡，不能由外觀判定差排是否消除。",
        "detailEn": "A narrow top transitions into a wider shoulder; removal of dislocations cannot be inferred from appearance."
      },
      {
        "x": 50,
        "y": 55,
        "labelZh": "反光展示品主體",
        "labelEn": "Reflective Exhibit Body",
        "detailZh": "可見表面反光與環狀紋理；純度、晶向及缺陷密度未確認。",
        "detailEn": "Reflections and ring-like surface texture are visible; purity, crystal orientation and defect density are unverified."
      },
      {
        "x": 50,
        "y": 88,
        "labelZh": "下方展示標牌區",
        "labelEn": "Lower Display Placard Area",
        "detailZh": "圖釘位於展示標牌附近，不是熔融矽液面；圖片不提供可驗證的熔湯溫度。",
        "detailEn": "The pin lies near a display placard, not a molten-silicon surface; the image provides no verifiable melt temperature."
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
    "categoryZh": "晶片區塊參考圖",
    "categoryEn": "Chip-Region Reference Image",
    "titleZh": "晶片區塊影像（成像規格未確認）",
    "titleEn": "Chip-Region Image (Imaging Specifications Unverified)",
    "scaleZh": "可見尺標 50 µm · 非電晶體截面證據",
    "scaleEn": "Visible scale bar: 50 µm · Not evidence of a transistor cross-section",
    "captionZh": "可見重複長方形區塊、橫向平行帶狀圖樣與右下的 50 µm 尺標。本輪未核實原始來源、成像方式或量測規格；不能據此辨識奈米片、HfO₂ 介電層或 SiGe 材料。",
    "captionEn": "Repeated rectangular blocks, horizontal bands and a 50 µm scale bar at the lower right are visible. Original provenance, imaging method and measurement settings are unverified in this review; the image does not identify nanosheets, HfO₂ dielectric or SiGe material.",
    "matchZh": "此圖提供晶片區塊層級的參考。旁側 Planar／FinFET／GAA 是獨立原理示意；三個熱點不代表電晶體截面，也不是漏電或遷移率的量測證據。",
    "matchEn": "This image provides chip-region context. The adjacent Planar/FinFET/GAA diagrams are separate teaching schematics; the three markers do not identify transistor cross-sections or establish leakage or mobility measurements.",
    "metrology": {
      "voltage": "Unverified",
      "voltageZh": "未確認",
      "mag": "Unverified",
      "magZh": "未確認",
      "fov": "Unverified",
      "fovZh": "未確認",
      "techniqueZh": "未確認（僅描述可見圖樣）",
      "techniqueEn": "Unverified (visible features only)"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 30,
        "labelZh": "橫向平行帶狀圖樣",
        "labelEn": "Horizontal Parallel Bands",
        "detailZh": "標記附近可見多條橫向平行帶狀圖樣。本圖不足以判定其電路功能或截面結構。",
        "detailEn": "Several horizontal parallel bands are visible near the marker. Their circuit function and cross-sectional structure cannot be established from this image."
      },
      {
        "x": 50,
        "y": 58,
        "labelZh": "中央長方形排列區",
        "labelEn": "Central Rectangular Pattern Region",
        "detailZh": "標記附近可見長方形區域與重複線條。無法由此判定閘極介電層成分或厚度。",
        "detailEn": "A rectangular region with repeated lines is visible near the marker. Gate-dielectric composition or thickness cannot be determined here."
      },
      {
        "x": 25,
        "y": 72,
        "labelZh": "左下密集圖樣區",
        "labelEn": "Lower-Left Dense Pattern Region",
        "detailZh": "標記附近可見密集且形狀多樣的圖樣。此影像不能辨識 SiGe 應變源，也不能證明遷移率增益。",
        "detailEn": "Dense patterns with varied shapes are visible near the marker. This image does not identify a SiGe stressor or demonstrate a mobility gain."
      }
    ]
  },
  "ch13": {
    "id": "ch13",
    "src": "assets/photos/ch13-nand-flash-die.jpg",
    "categoryZh": "晶片圖樣參考照片",
    "categoryEn": "Chip-Pattern Reference Photo",
    "titleZh": "晶片圖樣照片（結構與規格未確認）",
    "titleEn": "Chip-Pattern Photo (Structure and Specifications Unverified)",
    "scaleZh": "尺寸與倍率未確認 · 不作為立體結構證據",
    "scaleEn": "Dimensions and magnification unverified · Not evidence of 3D structure",
    "captionZh": "照片可見彩色線條、密集重複圖樣及方形區域。本輪未核實原始來源、晶片種類或成像規格；不能從此圖判定 DRAM／NAND、堆疊層數、材料或晶粒面積。",
    "captionEn": "Colored lines, dense repeated patterns and square regions are visible. Original provenance, chip type and imaging specifications are unverified in this review; the image does not establish DRAM/NAND identity, stack count, materials or die area.",
    "matchZh": "此圖提供晶片外觀參考。旁側 DRAM／3D NAND／HBM 為獨立教學示意；三個圖釘只標示可見區域，不代表已辨識的記憶胞、階梯接觸或陣列下邏輯。",
    "matchEn": "This photo provides chip-pattern context. The adjacent DRAM/3D NAND/HBM diagrams are separate teaching schematics; the three markers identify visible regions, not verified memory cells, staircase contacts or logic beneath an array.",
    "metrology": {
      "voltage": "Unverified",
      "mag": "Unverified",
      "fov": "Unverified",
      "techniqueZh": "未確認（僅描述可見外觀）",
      "techniqueEn": "Unverified (visible features only)",
      "voltageZh": "未確認",
      "magZh": "未確認",
      "fovZh": "未確認"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 40,
        "labelZh": "中央縱向圖樣",
        "labelEn": "Central Vertical Pattern",
        "detailZh": "圖釘附近可見縱向線條與相鄰色帶。此照片不能確認其記憶胞種類或堆疊層數。",
        "detailEn": "Vertical lines and adjacent colored bands are visible near the marker. The photo does not establish memory-cell type or stack count."
      },
      {
        "x": 82,
        "y": 40,
        "labelZh": "右側密集圖樣區",
        "labelEn": "Right-Hand Patterned Region",
        "detailZh": "圖釘附近可見密集線條與重複圖樣。無法由此確認階梯接觸結構或字元線連接。",
        "detailEn": "Dense lines and repeated patterns are visible near the marker. Staircase contacts or word-line connections cannot be confirmed here."
      },
      {
        "x": 50,
        "y": 88,
        "labelZh": "下方中央區域",
        "labelEn": "Lower Central Region",
        "detailZh": "圖釘標示照片下方中央的圖樣區域。此平面外觀不能證明陣列下方有 CMOS 邏輯。",
        "detailEn": "The marker identifies a patterned area near the lower center. This surface view does not establish CMOS logic beneath an array."
      }
    ]
  },
  "ch14": {
    "id": "ch14",
    "src": "assets/photos/ch14-node-pitch-scaling.jpg",
    "categoryZh": "設備環境參考照片",
    "categoryEn": "Equipment Reference Photo",
    "titleZh": "黃光環境設備照片（機型與規格未確認）",
    "titleEn": "Equipment in Yellow Lighting (Model and Specifications Unverified)",
    "scaleZh": "機型、尺寸與對位精度未確認",
    "scaleEn": "Equipment model, dimensions and alignment accuracy unverified",
    "captionZh": "照片可見黃光環境中的設備外殼、中央平台與螢幕。本輪未核實原始來源、機型或規格；無法由畫面確認曝光方式、干涉儀配置、支援節點或奈米級對位精度。",
    "captionEn": "Equipment housings, a central platform and screens are visible under yellow lighting. Original provenance, equipment model and specifications are unverified in this review; the photo does not establish exposure method, interferometer configuration, supported nodes or nanometer alignment accuracy.",
    "matchZh": "此圖提供設備環境參考。旁側 CPP／M1 節距與標準單元軌道圖是獨立教學示意；照片及圖釘不是這些尺寸的量測證據。",
    "matchEn": "This photo provides equipment context. The adjacent CPP/M1 pitch and standard-cell track diagrams are separate teaching schematics; the photo and markers are not measurements of those dimensions.",
    "metrology": {
      "voltage": "Unverified",
      "mag": "Unverified",
      "fov": "Unverified",
      "techniqueZh": "未確認（僅描述可見外觀）",
      "techniqueEn": "Unverified (visible features only)",
      "voltageZh": "未確認",
      "magZh": "未確認",
      "fovZh": "未確認"
    },
    "hotspots": [
      {
        "x": 30,
        "y": 40,
        "labelZh": "左側設備外殼",
        "labelEn": "Left-Hand Equipment Housing",
        "detailZh": "圖釘附近可見淺色設備外殼。此區域不是電晶體閘極節距的量測圖。",
        "detailEn": "A light-colored equipment housing is visible near the marker. This region is not a measurement of transistor gate pitch."
      },
      {
        "x": 50,
        "y": 65,
        "labelZh": "中央平台區域",
        "labelEn": "Central Platform Area",
        "detailZh": "圖釘標示中央平台附近的外觀。無法據此確認載台機構或金屬導線節距。",
        "detailEn": "The marker identifies the area around the central platform. Stage mechanisms or metal-line pitch cannot be established from this view."
      },
      {
        "x": 75,
        "y": 35,
        "labelZh": "後方設備外殼區域",
        "labelEn": "Rear Housing Area",
        "detailZh": "圖釘附近可見後方設備外殼。此照片不能確認標準單元軌道高度、功耗或面積效益。",
        "detailEn": "Rear equipment housing is visible near the marker. The photo does not establish standard-cell track height, power consumption or area benefits."
      }
    ]
  },
  "ch15": {
    "id": "ch15",
    "src": "assets/photos/ch15-metrology-profilometer.jpg",
    "categoryZh": "桌面設備參考照片",
    "categoryEn": "Desktop Equipment Reference Photo",
    "titleZh": "桌面儀器與顯示器（機型與規格未確認）",
    "titleEn": "Desktop Instrument and Display (Model and Specifications Unverified)",
    "scaleZh": "探測方式、精度與掃描範圍未確認",
    "scaleEn": "Probe method, precision and scan range unverified",
    "captionZh": "照片可見上方顯示器、設備前窗內的圓形台、外殼、鍵盤與右側電腦。本輪未核實原始來源、機型或規格；不能據此確認接觸式探針、干涉量測方式或奈米級能力。",
    "captionEn": "The photo shows an upper display, a circular platform behind the front window, housing, a keyboard and a computer on the right. Original provenance, model and specifications are unverified; the photo does not establish a contact probe, interferometry or nanometer capability.",
    "matchZh": "此照片只提供設備外觀參考。旁側 CD-SEM、明暗場與橢偏圖為獨立教學示意，不能將其結構或性能直接對應到這台設備。",
    "matchEn": "This photo provides equipment appearance only. The adjacent CD-SEM, bright/dark-field and ellipsometry diagrams are independent teaching schematics; their structures and performance cannot be assigned to this instrument.",
    "metrology": {
      "voltage": "Unverified",
      "voltageZh": "未確認",
      "mag": "Unverified",
      "magZh": "未確認",
      "fov": "Unverified",
      "fovZh": "未確認",
      "techniqueZh": "未確認（僅描述可見外觀）",
      "techniqueEn": "Unverified (visible features only)"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 25,
        "labelZh": "上方顯示器",
        "labelEn": "Upper Display",
        "detailZh": "圖釘位於上方顯示器，畫面可見曲線。曲線的量測對象與單位未確認；此位置不是已辨識的干涉物鏡。",
        "detailEn": "The marker lies on the upper display, where curves are visible. Their measured quantity and units are unverified; this is not an identified interferometric objective."
      },
      {
        "x": 50,
        "y": 65,
        "labelZh": "下方前側外殼",
        "labelEn": "Lower Front Housing",
        "detailZh": "圖釘位於前側外殼下緣、鍵盤上方。畫面無法確認壓電掃描台或致動器精度。",
        "detailEn": "The marker lies on the lower front housing above the keyboard. The image does not establish a piezoelectric scanner or actuator precision."
      },
      {
        "x": 80,
        "y": 55,
        "labelZh": "右側電腦機殼",
        "labelEn": "Right Computer Enclosure",
        "detailZh": "圖釘位於右側電腦的前面板附近，可見通風開口。此處不是已確認的視覺定位鏡頭。",
        "detailEn": "The marker lies near the right computer front panel, where ventilation openings are visible. It is not an identified alignment camera."
      }
    ]
  },
  "ch16": {
    "id": "ch16",
    "src": "assets/photos/ch16-defect-inspection-him.jpg",
    "categoryZh": "灰階影像參考圖",
    "categoryEn": "Grayscale Reference Images",
    "titleZh": "雙幅球狀紋理影像（材料與成像規格未確認）",
    "titleEn": "Two Images of Spherical Textures (Material and Imaging Specifications Unverified)",
    "scaleZh": "未見尺標 · 尺寸、倍率與成像方式未確認",
    "scaleEn": "No visible scale bar · Dimensions, magnification and imaging method unverified",
    "captionZh": "圖中左右兩幅灰階影像呈現多個球狀外觀與表面紋理，中間以白色直帶分隔。原始來源、材料、尺寸及成像方式未確認；不能據此指認氦離子設備、晶圓缺陷或次表面金屬空洞。",
    "captionEn": "Two grayscale panels show spherical forms and surface textures separated by a white vertical band. Original provenance, material, dimensions and imaging method are unverified; these images do not identify helium-ion equipment, wafer defects or subsurface metal voids.",
    "matchZh": "此圖僅示範可見影像區域。旁側晶圓圖譜、FIB 與 TEM 為獨立教學示意；照片與圖釘不是半導體缺陷、設備性能或失效機制的證據。",
    "matchEn": "These images provide visible-image context only. The adjacent wafer-map, FIB and TEM diagrams are independent teaching schematics; the images and markers are not evidence of semiconductor defects, equipment performance or a failure mechanism.",
    "metrology": {
      "voltage": "Unverified",
      "voltageZh": "未確認",
      "mag": "Unverified",
      "magZh": "未確認",
      "fov": "Unverified",
      "fovZh": "未確認",
      "techniqueZh": "未確認（僅描述可見外觀）",
      "techniqueEn": "Unverified (visible features only)"
    },
    "hotspots": [
      {
        "x": 45,
        "y": 40,
        "labelZh": "左幅紋理區域",
        "labelEn": "Left-Panel Texture Region",
        "detailZh": "圖釘附近可見左幅影像中的球狀外觀與細部紋理。材料、尺寸及成像束斑未確認。",
        "detailEn": "Spherical forms and fine textures are visible near this marker in the left panel. Material, dimensions and imaging spot size are unverified."
      },
      {
        "x": 55,
        "y": 50,
        "labelZh": "中央白色分隔帶",
        "labelEn": "Central White Divider",
        "detailZh": "圖釘位於兩幅影像之間的白色分隔帶附近，不能將此區域解讀為金屬介層孔中的空洞。",
        "detailEn": "The marker lies near the white divider between the panels. This region cannot be interpreted as a void in a metal via."
      },
      {
        "x": 80,
        "y": 35,
        "labelZh": "右幅紋理區域",
        "labelEn": "Right-Panel Texture Region",
        "detailZh": "圖釘附近可見右幅影像的球狀表面與紋理。畫面未顯示已辨識的偵測器或設備構件。",
        "detailEn": "Spherical surfaces and textures are visible near this marker in the right panel. The image does not show an identified detector or equipment component."
      }
    ]
  },
  "ch17": {
    "id": "ch17",
    "src": "assets/photos/ch17-parametric-test-spc.jpg",
    "categoryZh": "實驗室工作區參考圖",
    "categoryEn": "Laboratory Work Area Reference",
    "titleZh": "顯微鏡與桌面設備工作區",
    "titleEn": "Microscopes and Bench Equipment",
    "scaleZh": "機型、量測功能與效能未確認",
    "scaleEn": "Instrument Models, Functions and Performance Unverified",
    "captionZh": "畫面可見多組顯微鏡、螢幕、桌面設備與線材。不能由此辨認自動參數測試、SPC 軟體或量測精度；原始來源與授權資訊尚未確認。",
    "captionEn": "Several microscopes, monitors, bench instruments and cables are visible. Automated parametric testing, SPC software and measurement accuracy cannot be established from this image. Original source and licensing information remain unverified.",
    "matchZh": "僅作數據蒐集工作環境的概念參考，不是特定 SPC 系統整合或效能證據。",
    "matchEn": "Concept reference for a data-collection work area, not evidence of a specific SPC integration or performance.",
    "metrology": {
      "voltage": "Not verified",
      "voltageZh": "未確認",
      "mag": "Not verified",
      "magZh": "未確認",
      "fov": "Not verified",
      "fovZh": "未確認",
      "techniqueZh": "外觀參考；設備規格未確認",
      "techniqueEn": "Visual Reference; Instrument Specifications Unverified"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 30,
        "labelZh": "工作桌旁線材",
        "labelEn": "Cables Beside a Workbench",
        "detailZh": "圖釘附近可見工作桌旁的線材；無法確認低漏電矩陣、切換速度或電流解析度。",
        "detailEn": "Cables are visible near the workbench. A low-leakage matrix, switching speed and current resolution are not identifiable."
      },
      {
        "x": 50,
        "y": 60,
        "labelZh": "桌架與下層設備區",
        "labelEn": "Bench Frame and Lower Shelf",
        "detailZh": "圖釘落在桌架與下層設備一帶，不能由此認定四線式探針或接觸電阻補償功能。",
        "detailEn": "The pin is near the bench frame and lower shelf; it does not identify four-wire probes or contact-resistance compensation."
      },
      {
        "x": 75,
        "y": 70,
        "labelZh": "椅腳與地面區",
        "labelEn": "Stool Base and Floor",
        "detailZh": "此處是椅腳與地面區，並非可辨識的 SPC 螢幕；未確認任何 Cpk 或閉鎖功能。",
        "detailEn": "This is a stool-base and floor area, not an identifiable SPC display. No Cpk calculation or interlock function is established."
      }
    ]
  },
  "ch18": {
    "id": "ch18",
    "src": "assets/photos/ch18-foup-wafer-carrier.jpg",
    "categoryZh": "透明載具參考圖",
    "categoryEn": "Transparent Carrier Reference",
    "titleZh": "透明載具與槽形支撐結構",
    "titleEn": "Transparent Carrier and Slotted Supports",
    "scaleZh": "尺寸、容量、密封與吹氣規格未確認",
    "scaleEn": "Dimensions, Capacity, Sealing and Purge Specifications Unverified",
    "captionZh": "畫面可見透明外盒、堆疊片狀物邊緣與兩側支撐槽。無法據此確認 FOUP 型式、300mm、25片容量、氮氣吹氣或潔淨等級；原始來源與授權資訊尚未確認。",
    "captionEn": "A transparent enclosure, stacked disc edges and slotted supports are visible. FOUP type, 300mm size, 25-wafer capacity, nitrogen purge and cleanliness class are not established by this image. Original source and licensing information remain unverified.",
    "matchZh": "僅作晶圓載運／隔離的概念參考；照片本身不能證明 MES Hold、OHT 搬運或自動互鎖。",
    "matchEn": "Concept reference for wafer transport and containment; the photo does not establish MES Hold, OHT transport or automated interlocks.",
    "metrology": {
      "voltage": "Not verified",
      "voltageZh": "未確認",
      "mag": "Not verified",
      "magZh": "未確認",
      "fov": "Not verified",
      "fovZh": "未確認",
      "techniqueZh": "外觀參考；載具規格未確認",
      "techniqueEn": "Visual Reference; Carrier Specifications Unverified"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 35,
        "labelZh": "上方片狀物區域",
        "labelEn": "Upper Stacked-Disc Area",
        "detailZh": "圖釘靠近載具內上方片狀物；不能由此辨識氣密門封或其材料與潔淨能力。",
        "detailEn": "The pin is near the upper stacked discs; a hermetic door gasket, its material and cleanliness performance are not identifiable."
      },
      {
        "x": 50,
        "y": 65,
        "labelZh": "下方片緣與槽位",
        "labelEn": "Lower Disc Edges and Slots",
        "detailZh": "可見下方片狀物邊緣與槽位；未顯示可確認的氮氣吹氣閥或氧化防護功能。",
        "detailEn": "Lower disc edges and slots are visible; no identifiable nitrogen-purge valve or oxidation-protection function is shown."
      },
      {
        "x": 25,
        "y": 75,
        "labelZh": "左側槽形支撐",
        "labelEn": "Left Slotted Support",
        "detailZh": "可見左側槽形支撐結構；此位置不能確認底部三點 V 溝或對接精度。",
        "detailEn": "A slotted support is visible on the left; this location does not establish bottom three-point V-grooves or docking precision."
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
    "categoryZh": "實驗作業參考照片",
    "categoryEn": "Laboratory Work Reference Photo",
    "titleZh": "人員操作開啟圓蓋的實驗設備",
    "titleEn": "Operator Using Laboratory Equipment with an Open Circular Lid",
    "scaleZh": "設備型號、測試方法與靈敏度未確認",
    "scaleEn": "Equipment model, test method and sensitivity unverified",
    "captionZh": "可見穿白色工作衣的人員、開啟的圓蓋及圓形槽體。原始來源與授權未確認；照片不能確認氦氣檢漏、質譜分析、真空等級或偵測下限。",
    "captionEn": "An operator in a white coat, an open circular lid and a round vessel are visible. Original source and license are unverified; helium leak testing, mass spectrometry, vacuum level and detection limits cannot be established from the image.",
    "matchZh": "僅供觀察實驗設備操作情境；不是浴缸曲線、加速因子或失效率的量測證據。",
    "matchEn": "A reference for a laboratory operating context, not measurement evidence for the bathtub curve, acceleration factor or failure rate.",
    "metrology": {
      "voltage": "Imaging conditions unverified",
      "voltageZh": "成像條件未確認",
      "mag": "Unverified",
      "magZh": "未確認",
      "fov": "Unverified",
      "fovZh": "未確認",
      "techniqueZh": "成像方式與設備規格未確認",
      "techniqueEn": "Imaging method and equipment specifications unverified"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 35,
        "labelZh": "背景座椅與工作區",
        "labelEn": "Background Chair and Work Area",
        "detailZh": "圖釘位於背景座椅附近；不能標定為氦氣加壓室。",
        "detailEn": "The pin is near a background chair; this location cannot be identified as a helium bombing chamber."
      },
      {
        "x": 50,
        "y": 65,
        "labelZh": "槽內圓形支架",
        "labelEn": "Circular Holder in the Vessel",
        "detailZh": "可見槽內圓形支架；內部質譜元件與分析方法未確認。",
        "detailEn": "A circular holder is visible inside the vessel; mass-spectrometer components and the analytical method are unverified."
      },
      {
        "x": 20,
        "y": 55,
        "labelZh": "圓槽左側邊緣",
        "labelEn": "Left Edge of the Circular Vessel",
        "detailZh": "可見槽體邊緣與附近結構；此處無法確認旁通閥或幫浦型式。",
        "detailEn": "The vessel edge and nearby structure are visible; a bypass valve or pump type cannot be identified here."
      }
    ]
  },
  "ch23": {
    "id": "ch23",
    "src": "assets/photos/ch23-cim-fab-automation.jpg",
    "categoryZh": "潔淨作業參考照片",
    "categoryEn": "Clean Work-Area Reference Photo",
    "titleZh": "防護衣人員與金屬組件裝配工作區",
    "titleEn": "Personnel in Coveralls and a Metal-Assembly Work Area",
    "scaleZh": "潔淨分級、自動化程度與設備用途未確認",
    "scaleEn": "Cleanliness class, automation level and equipment purpose unverified",
    "captionZh": "可見穿連身防護衣的人員、工具、金屬組件與工作平台。原始來源與授權未確認；照片不證明為 300mm 晶圓廠，也未顯示可辨識的 OHT 調度或 MES 介面。",
    "captionEn": "Personnel in coveralls, hand tools, metal components and work platforms are visible. Original source and license are unverified; the image does not establish a 300mm fab or show identifiable OHT dispatching or MES interfaces.",
    "matchZh": "輔助觀察受控環境中的作業情境；不是 Q-Time、防呆互鎖或 OEE 效能的驗證。",
    "matchEn": "A visual reference for work in a controlled environment, not validation of Q-Time controls, interlocks or OEE performance.",
    "metrology": {
      "voltage": "Imaging conditions unverified",
      "voltageZh": "成像條件未確認",
      "mag": "Unverified",
      "magZh": "未確認",
      "fov": "Unverified",
      "fovZh": "未確認",
      "techniqueZh": "成像方式與設備規格未確認",
      "techniqueEn": "Imaging method and equipment specifications unverified"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 15,
        "labelZh": "後方窗面與結構",
        "labelEn": "Rear Window and Structure",
        "detailZh": "圖釘落在後方窗面及結構附近，不能確認為 OHT 軌道。",
        "detailEn": "The pin is near a rear window and structural members; an OHT track is not confirmed."
      },
      {
        "x": 50,
        "y": 55,
        "labelZh": "前方人員手部與工具",
        "labelEn": "Foreground Hands and Tool",
        "detailZh": "可見人員使用工具；不能由照片確認 SECS/GEM 或 APC 介面。",
        "detailEn": "An operator is using a tool; SECS/GEM or APC interfaces cannot be established from the photo."
      },
      {
        "x": 80,
        "y": 70,
        "labelZh": "前方金屬組件與支架",
        "labelEn": "Foreground Metal Assembly and Supports",
        "detailZh": "可見金屬組件及支架；不能確認為氮氣晶圓儲存倉。",
        "detailEn": "Metal components and supports are visible; a nitrogen-purged wafer stocker cannot be identified here."
      }
    ]
  },
  "ch24": {
    "id": "ch24",
    "src": "assets/photos/ch24-decapped-cpu-die.jpg",
    "categoryZh": "晶粒平面參考照片",
    "categoryEn": "Plan-View Die Reference Photo",
    "titleZh": "矩形電路圖樣與周邊導線",
    "titleEn": "Rectangular Circuit Patterns and Peripheral Wires",
    "scaleZh": "實際尺寸、電晶體數及功能區域未確認",
    "scaleEn": "Dimensions, transistor count and functional regions unverified",
    "captionZh": "可見多個規則矩形圖樣、不規則線路區及周邊導線。原始來源與授權未確認；沒有電路配置圖，不能將圖釘直接標為 CPU 核心、L3 快取或去耦電容。",
    "captionEn": "Regular rectangular patterns, irregular routing regions and peripheral wires are visible. Original source and license are unverified; without a floorplan, the pins cannot be assigned to CPU cores, L3 cache or decoupling capacitors.",
    "matchZh": "輔助理解實體晶片具有複雜佈局；照片不能驗證 RowHammer、壓降或時序性能。",
    "matchEn": "A reference for the complexity of physical chip layouts; the photo does not validate RowHammer behavior, voltage drop or timing performance.",
    "metrology": {
      "voltage": "Imaging conditions unverified",
      "voltageZh": "成像條件未確認",
      "mag": "Unverified",
      "magZh": "未確認",
      "fov": "Unverified",
      "fovZh": "未確認",
      "techniqueZh": "成像方式與設備規格未確認",
      "techniqueEn": "Imaging method and equipment specifications unverified"
    },
    "hotspots": [
      {
        "x": 45,
        "y": 30,
        "labelZh": "上方密集線路區",
        "labelEn": "Upper Dense Routing Region",
        "detailZh": "可見密集線路與區塊邊界，執行單元與工作頻率未確認。",
        "detailEn": "Dense routing and block boundaries are visible; execution units and operating frequency are unverified."
      },
      {
        "x": 55,
        "y": 55,
        "labelZh": "中央規則圖樣區",
        "labelEn": "Central Regular Pattern Region",
        "detailZh": "可見規則重複圖樣；無法確認記憶體層級、容量或單元電路。",
        "detailEn": "Regular repeated patterns are visible; memory level, capacity and cell circuit cannot be confirmed."
      },
      {
        "x": 20,
        "y": 75,
        "labelZh": "左下矩形陣列",
        "labelEn": "Lower-Left Rectangular Array",
        "detailZh": "可見矩形重複陣列；不能確認其為去耦電容或推論電源穩定效果。",
        "detailEn": "A repeated rectangular array is visible; it cannot be identified as decoupling capacitors or used to infer power-stability performance."
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
