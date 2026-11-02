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
    "scaleZh": "照片無尺標；來源標示為 300mm，製程規格未確認",
    "scaleEn": "No visible scale; the source labels it 300mm; process specifications unverified",
    "captionZh": "來源標示為矽光子 300mm 晶圓（Silicon Photonics 300mm wafer）。可見圓形晶圓、重複矩形圖樣與彩色反光；照片不能辨識晶向、WAT 測試結構或個別元件。",
    "captionEn": "The source labels this a silicon-photonics 300mm wafer. A circular wafer with repeated rectangular patterns and colored reflections is visible; the photo does not identify crystal orientation, WAT test structures or individual devices.",
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Silicon_Photonics_300mm_wafer.JPG",
      "author": "Ehsanshahoseini",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
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
    "captionZh": "來源為 NASA Glenn 研究中心微製造實驗室的無塵室。可見偏黃照明、穿連身防護衣的人員、工作桌及設備；照片不能證明潔淨分級、壓差、FFU 或 AMHS 配置。",
    "captionEn": "The source is a clean room in the NASA Glenn Research Center microfabrication laboratory. Yellow-tinted lighting, people in coveralls, worktables and equipment are visible; the photo does not establish cleanliness class, pressure difference, FFU or AMHS configuration.",
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Clean_room.jpg",
      "author": "NASA Glenn Research Center",
      "license": "Public domain (PD-USGov-NASA)",
      "licenseUrl": "https://commons.wikimedia.org/wiki/Template:PD-USGov-NASA",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。原始出處為 NASA Glenn 研究中心微製造實驗室（GRC-1998-C-01261）。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site. Originally from the NASA Glenn Research Center microfabrication laboratory (GRC-1998-C-01261)."
    }
  },
  "ch02": {
    "id": "ch02",
    "src": "assets/photos/ch02-mosfet-sem.jpg",
    "categoryZh": "平面電路影像",
    "categoryEn": "Plan-View Circuit Image",
    "titleZh": "帶有 50 µm 尺標的重複電路圖樣",
    "titleEn": "Repeated Circuit Patterns with a 50 µm Scale Bar",
    "scaleZh": "影像標示 50 µm；來源說明為 SEM 影像，未說明製程節點",
    "scaleEn": "Image scale bar: 50 µm; the source describes an SEM image; process node not stated",
    "captionZh": "來源說明這是 Intel Celeron D 320 處理器在掃描式電子顯微鏡（SEM）下的影像，可看到微影圖樣。畫面可見平面重複矩形圖樣、水平線帶與 50 µm 尺標；這是晶片表面的平面影像，不能辨識閘極截面、介電材料或源汲極摻雜。",
    "captionEn": "The source describes this as an Intel Celeron D 320 processor imaged in a scanning electron microscope (SEM), showing its lithographic patterns. Repeated rectangular patterns, horizontal bands and a 50 µm scale bar are visible in plan view; this is a surface view of the chip, and gate cross-sections, dielectric material and source/drain doping cannot be identified here.",
    "matchZh": "作為電路圖樣的外觀參考，不是能帶、反轉層或接面物理的量測證據。",
    "matchEn": "A visual reference for circuit patterns, not measurement evidence for band diagrams, inversion layers or junction physics.",
    "metrology": {
      "voltage": "Not reported by source",
      "voltageZh": "來源未提供",
      "mag": "Not reported by source",
      "magZh": "來源未提供",
      "fov": "Not reported by source",
      "fovZh": "來源未提供",
      "techniqueZh": "SEM（依來源說明）",
      "techniqueEn": "SEM (per source)"
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Intel_Celeron_D320_in_scanning_electron_microscope_8k.png",
      "author": "Piotr Krzemiński",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
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
    "captionZh": "來源說明這是德國柏林自然史博物館展出的單晶矽晶棒。可見窄頸、寬肩與反光主體，以及周圍標牌和其他樣品；照片不能證明純度、無差排或長晶爐操作條件。",
    "captionEn": "The source identifies this as a single-crystal silicon boule on display at the Museum für Naturkunde, Berlin. A narrow neck, broad shoulder and reflective body are visible, with placards and adjacent samples; purity, absence of dislocations and crystal-puller operating conditions are not established by the photo.",
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Single-crystal_silicon_boule.jpg",
      "author": "Sebastian Wallroth",
      "license": "Public domain (PD-self)",
      "licenseUrl": "https://commons.wikimedia.org/wiki/Template:PD-self",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。攝於德國柏林自然史博物館。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site. Photographed at the Museum für Naturkunde, Berlin."
    }
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:STS_multiplex_PECVD_machine_at_LAAS_0495.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Reactive-ion_etching_system_back_end_at_LAAS_0503.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
  },
  "ch07": {
    "id": "ch07",
    "src": "assets/photos/ch07-ion-implanter.jpg",
    "categoryZh": "離子佈植機",
    "categoryEn": "Ion Implantation Equipment",
    "titleZh": "LAAS-CNRS 的離子佈植機前端",
    "titleEn": "Ion Implantation Machine Front End at LAAS-CNRS",
    "scaleZh": "設備外觀參考 · 無校準比例",
    "scaleEn": "Equipment reference · no calibrated scale",
    "captionZh": "來源說明這是 LAAS-CNRS 技術平台的離子佈植機前端。照片可見機櫃、控制面板與透明門機櫃；外觀照片看不到離子源、質量分析磁鐵、狹縫或終端靶室，也不能確認加速能量。",
    "captionEn": "The source identifies this as the front end of an ion implantation machine at the LAAS-CNRS technology facility. Cabinets, a control panel and a glass-door cabinet are visible; this exterior view does not show the ion source, analyzing magnet, slits or end station, and does not establish the acceleration energy.",
    "matchZh": "與本章共同說明離子佈植設備的使用情境；左側 90° 偏轉磁鐵與 LSS 理論是教學模型，不是這台機台的內部結構。",
    "matchEn": "A reference for ion implantation equipment in use; the adjacent 90° analyzing magnet and LSS theory are a teaching model, not the internal structure of this machine.",
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
        "x": 18,
        "y": 40,
        "labelZh": "左側機櫃開口",
        "labelEn": "Left cabinet opening",
        "detailZh": "標記指向左側機櫃的開口。照片無法確認內部是否為離子源；離子源通常以弧光放電把 BF₃ 或 PH₃ 等氣體離子化，這張外觀照看不到。",
        "detailEn": "The marker points to an opening in the left cabinet. The photo does not show whether an ion source is inside; ion sources typically ionize gases such as BF3 or PH3 by arc discharge, which this exterior view cannot show."
      },
      {
        "x": 45,
        "y": 42,
        "labelZh": "中央控制面板與螢幕",
        "labelEn": "Central control panel and screen",
        "detailZh": "可見控制面板與螢幕。質量分析磁鐵依荷質比篩選離子（例如 B-11、P-31），但照片無法看出磁鐵的位置或偏轉角度。",
        "detailEn": "A control panel and screen are visible. An analyzing magnet selects ions by charge-to-mass ratio (for example B-11 or P-31), but the photo does not show where a magnet sits or its deflection angle."
      },
      {
        "x": 82,
        "y": 45,
        "labelZh": "右側透明門機櫃",
        "labelEn": "Glass-door cabinet on the right",
        "detailZh": "可見透明門後的機櫃內部構件。照片無法確認是否為束流掃描或終端靶室；掃描系統負責讓離子束均勻掃過晶圓。",
        "detailEn": "Components behind a glass door are visible. The photo cannot confirm a beam scanner or end station; a scanning system is what sweeps the ion beam uniformly across the wafer."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ion_implantation_machine_at_LAAS_0521.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Chemical-mechanical_polishing_(CMP-108,_conditioner).jpg",
      "author": "cpxmn",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
  },
  "ch09": {
    "id": "ch09",
    "src": "assets/photos/ch09-wet-bench-clean.jpg",
    "categoryZh": "晶圓清洗機台",
    "categoryEn": "Wafer Wet Bench Tool",
    "titleZh": "LAAS-CNRS 的 6 吋濕式蝕刻酸槽",
    "titleEn": "6-inch Wet Etching Tanks at LAAS-CNRS",
    "scaleZh": "來源標示用於 6 吋晶圓批次 · 無校準比例",
    "scaleEn": "Source states 6-inch wafer batches · no calibrated scale",
    "captionZh": "來源說明這組酸槽在 LAAS-CNRS 用於 6 吋晶圓批次的 Piranha、氫氟酸（HF）或 RCA 清洗。照片可見通風罩下的槽體、前方面板與下方櫃體；不能確認自動化程度、槽體材質，或是否配備兆聲波與 Marangoni IPA 乾燥。",
    "captionEn": "The source states these tanks are used for Piranha, hydrofluoric acid (HF) or RCA cleans on 6-inch wafer batches at LAAS-CNRS. Tanks under a ventilated hood, a front panel and lower cabinets are visible; the degree of automation, tank materials, and whether megasonics or Marangoni IPA drying are fitted cannot be established.",
    "matchZh": "與本章 RCA 清洗化學共同說明濕式清洗情境；來源支持此機台用於 RCA 清洗，但 SC-1／SC-2 的配比、溫度與兆聲波條件是教學內容，不是這台機台的規格。",
    "matchEn": "A reference for wet cleaning alongside the chapter's RCA chemistry; the source supports RCA cleans on this bench, but SC-1/SC-2 ratios, temperatures and megasonic conditions are teaching content, not this bench's specifications.",
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
        "x": 45,
        "y": 40,
        "labelZh": "通風罩下的槽體區",
        "labelEn": "Tank area under the hood",
        "detailZh": "來源說明這些槽用於 Piranha、HF 或 RCA 清洗。照片看不出哪一槽裝哪種藥液；RCA 的 SC-1 通常是加熱的 NH₄OH、H₂O₂ 與水混合液。",
        "detailEn": "The source states these tanks are used for Piranha, HF or RCA cleans. The photo does not show which tank holds which chemistry; RCA SC-1 is typically a heated mixture of NH4OH, H2O2 and water."
      },
      {
        "x": 45,
        "y": 70,
        "labelZh": "前方面板與下方櫃體",
        "labelEn": "Front panel and lower cabinets",
        "detailZh": "可見前方操作面板、管線與下方櫃門。照片不能確認是否裝有兆聲波換能器；兆聲波清洗以 MHz 聲波協助移除微粒。",
        "detailEn": "The front control panel, hoses and lower cabinet doors are visible. The photo cannot confirm megasonic transducers; megasonic cleaning uses MHz sound to help remove particles."
      },
      {
        "x": 80,
        "y": 35,
        "labelZh": "右側相鄰設備",
        "labelEn": "Adjacent equipment on the right",
        "detailZh": "標記落在右側相鄰的設備與層架附近。照片不能確認是否有 Marangoni IPA 乾燥腔；這類乾燥以 IPA 蒸氣降低表面張力，減少水痕。",
        "detailEn": "The marker sits near adjacent equipment and shelving on the right. The photo cannot confirm a Marangoni IPA dryer; such dryers use IPA vapor to lower surface tension and reduce water marks."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Wet_etching_tanks_at_LAAS_(6_inches)_0468.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
  },
  "ch10": {
    "id": "ch10",
    "src": "assets/photos/ch10-metal-deposition.jpg",
    "categoryZh": "金屬化設備",
    "categoryEn": "Metallization Equipment",
    "titleZh": "LAAS-CNRS 的金屬化蒸鍍機",
    "titleEn": "Metallization Evaporator at LAAS-CNRS",
    "scaleZh": "設備外觀參考 · 無校準比例",
    "scaleEn": "Equipment reference · no calibrated scale",
    "captionZh": "來源說明這是 LAAS-CNRS 技術平台用於金屬化的蒸鍍機。照片可見真空腔體、觀察窗、側邊管路與控制機櫃；來源沒有說明蒸鍍方式（電子束或熱蒸鍍）或鍍膜材料。先進製程的 Ta/TaN 阻擋層與銅晶種層通常以濺鍍（PVD）沉積，不是用這類蒸鍍機製作。",
    "captionEn": "The source identifies this as an evaporation machine used for metallization at the LAAS-CNRS technology facility. The vacuum chamber, a viewport, side piping and a control cabinet are visible; the source does not state the evaporation method (electron-beam or thermal) or the deposited materials. In advanced processes, Ta/TaN barriers and Cu seed layers are usually deposited by sputtering (PVD), not by this kind of evaporator.",
    "matchZh": "與本章共同說明金屬薄膜沉積設備；左側雙鑲嵌銅導線是教學模型，此機台不是用來沉積其 Ta/TaN 阻擋層或銅晶種層的設備。",
    "matchEn": "A reference for metal thin-film deposition equipment; the adjacent dual-damascene copper interconnect is a teaching model, and this machine is not the tool that deposits its Ta/TaN barrier or Cu seed layers.",
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
        "x": 48,
        "y": 25,
        "labelZh": "腔體頂部",
        "labelEn": "Top of the chamber",
        "detailZh": "標記指向真空腔體頂部與上方元件。照片不能確認腔體內的蒸鍍源配置或真空度。",
        "detailEn": "The marker points to the top of the vacuum chamber and the parts above it. The photo does not establish the evaporation-source arrangement or vacuum level inside."
      },
      {
        "x": 48,
        "y": 48,
        "labelZh": "腔體觀察窗",
        "labelEn": "Chamber viewport",
        "detailZh": "可見腔體側面的圓形觀察窗。照片看不到腔內的基板或坩堝，也不能確認是否使用電子束加熱。",
        "detailEn": "A round viewport on the chamber side is visible. Substrates and crucibles inside are not visible, and electron-beam heating cannot be confirmed."
      },
      {
        "x": 66,
        "y": 60,
        "labelZh": "側邊管路",
        "labelEn": "Side piping",
        "detailZh": "可見腔體右側的管路與閥件。照片不能確認這些管路用於抽氣、冷卻或供氣。",
        "detailEn": "Piping and valves on the right of the chamber are visible. The photo does not establish whether they serve pumping, cooling or gas supply."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Coating_deposition_machine_by_evaporation_at_LAAS_0475.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Centrotherm_diffusion_furnaces_at_LAAS_0481.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
  },
  "ch12": {
    "id": "ch12",
    "src": "assets/photos/ch12-transistor-micrograph.jpg",
    "categoryZh": "晶片區塊參考圖",
    "categoryEn": "Chip-Region Reference Image",
    "titleZh": "Intel Celeron D 320 晶片區塊的 SEM 影像",
    "titleEn": "SEM Image of Chip Regions on an Intel Celeron D 320",
    "scaleZh": "可見尺標 50 µm · 非電晶體截面證據",
    "scaleEn": "Visible scale bar: 50 µm · Not evidence of a transistor cross-section",
    "captionZh": "來源說明這是 Intel Celeron D 320 處理器的掃描式電子顯微鏡（SEM）影像，與第 02 章為同一張照片。可見重複長方形區塊、橫向平行帶狀圖樣與右下的 50 µm 尺標；這是晶片表面的平面影像，不能據此辨識奈米片、HfO₂ 介電層或 SiGe 材料。",
    "captionEn": "The source describes this as a scanning electron microscope (SEM) image of an Intel Celeron D 320 processor; it is the same photo as Chapter 02. Repeated rectangular blocks, horizontal bands and a 50 µm scale bar at the lower right are visible; this is a surface view of the chip and does not identify nanosheets, HfO₂ dielectric or SiGe material.",
    "matchZh": "此圖提供晶片區塊層級的參考。旁側 Planar／FinFET／GAA 是獨立原理示意；三個熱點不代表電晶體截面，也不是漏電或遷移率的量測證據。",
    "matchEn": "This image provides chip-region context. The adjacent Planar/FinFET/GAA diagrams are separate teaching schematics; the three markers do not identify transistor cross-sections or establish leakage or mobility measurements.",
    "metrology": {
      "voltage": "Not reported by source",
      "voltageZh": "來源未提供",
      "mag": "Not reported by source",
      "magZh": "來源未提供",
      "fov": "Not reported by source",
      "fovZh": "來源未提供",
      "techniqueZh": "SEM（依來源說明）",
      "techniqueEn": "SEM (per source)"
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Intel_Celeron_D320_in_scanning_electron_microscope_8k.png",
      "author": "Piotr Krzemiński",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。與第 02 章為同一張照片。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site. Same photo as Chapter 02."
    }
  },
  "ch13": {
    "id": "ch13",
    "src": "assets/photos/ch13-nand-flash-die.jpg",
    "categoryZh": "邏輯閘晶片照片",
    "categoryEn": "Logic-Gate Chip Photo",
    "titleZh": "4 輸入 TTL NAND 邏輯閘晶片（不是 NAND 快閃記憶體）",
    "titleEn": "4-Input TTL NAND Logic-Gate Chip (Not NAND Flash Memory)",
    "scaleZh": "來源標示最小線寬 20 µm · 照片無尺標",
    "scaleEn": "Source states a 20 µm minimum feature size · No visible scale bar",
    "captionZh": "來源說明這是電晶體－電晶體邏輯（TTL）的 4 輸入 NAND 邏輯閘晶片，晶片上有 7 個電晶體，最小線寬 20 µm。它是邏輯電路，不是 NAND 快閃記憶體：兩者都以 NAND 邏輯命名，但快閃記憶體是由大量記憶胞串接成的陣列。照片可見彩色區域、淺色線路與方形焊墊。",
    "captionEn": "The source describes this as a 4-input NAND logic-gate chip in transistor-transistor logic (TTL), with 7 transistors on the chip and a 20 µm minimum feature size. It is a logic circuit, not NAND flash memory: both are named after NAND logic, but flash memory is an array of many memory cells connected in strings. Colored regions, pale traces and square pads are visible.",
    "matchZh": "這張是邏輯閘晶片，不是記憶體晶片；本章保留它作為晶片表面圖樣的參考。旁側 DRAM／3D NAND／HBM 為獨立教學示意，照片中沒有記憶胞、堆疊層、階梯接觸或陣列下邏輯。",
    "matchEn": "This is a logic-gate chip, not a memory chip; the chapter keeps it as a reference for chip surface patterns. The adjacent DRAM/3D NAND/HBM diagrams are separate teaching schematics, and the photo contains no memory cells, stacked layers, staircase contacts or logic beneath an array.",
    "metrology": {
      "voltage": "Not reported by source",
      "voltageZh": "來源未提供",
      "mag": "Not reported by source",
      "magZh": "來源未提供",
      "fov": "Not reported by source",
      "fovZh": "來源未提供",
      "techniqueZh": "來源未說明成像方式",
      "techniqueEn": "Imaging method not stated by source"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 40,
        "labelZh": "中央縱向線路",
        "labelEn": "Central Vertical Trace",
        "detailZh": "圖釘位於中央的淺色縱向線路，連接上下的電路區塊。這是邏輯閘晶片的連線，不是記憶胞或堆疊層。",
        "detailEn": "The marker sits on the pale central vertical trace that links the upper and lower circuit blocks. It is wiring on a logic-gate chip, not a memory cell or a stacked layer."
      },
      {
        "x": 82,
        "y": 40,
        "labelZh": "右側條狀圖樣與方塊",
        "labelEn": "Right-Hand Stripes and Block",
        "detailZh": "圖釘附近可見並排的長條圖樣與右側較大的淺色方塊。來源沒有逐一標示元件位置；這裡沒有階梯接觸或字元線。",
        "detailEn": "Side-by-side stripes and a larger pale block on the right are visible near the marker. The source does not label individual devices; there are no staircase contacts or word lines here."
      },
      {
        "x": 50,
        "y": 88,
        "labelZh": "下方中央線路",
        "labelEn": "Lower Central Trace",
        "detailZh": "圖釘位於下方中央的淺色線路附近。TTL 是平面的雙極電晶體邏輯電路，沒有陣列下方的 CMOS 邏輯。",
        "detailEn": "The marker sits near a pale trace at the lower center. TTL is a planar bipolar-transistor logic circuit, with no CMOS logic beneath an array."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:4-fach-NAND-C10.JPG",
      "author": "Dgarte",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
  },
  "ch14": {
    "id": "ch14",
    "src": "assets/photos/ch14-node-pitch-scaling.jpg",
    "categoryZh": "設備環境參考照片",
    "categoryEn": "Equipment Reference Photo",
    "titleZh": "LAAS-CNRS 黃光區的 MA-150 設備",
    "titleEn": "MA-150 Equipment in the Yellow-Light Area at LAAS-CNRS",
    "scaleZh": "設備外觀參考 · 無校準比例",
    "scaleEn": "Equipment reference · no calibrated scale",
    "captionZh": "來源辨識為 LAAS-CNRS 不感光照明下的 MA-150（來源稱為 stepper）。照片可見設備外殼、中央平台與螢幕；無法由畫面確認曝光方式、干涉儀配置、支援節點或奈米級對位精度。",
    "captionEn": "The source identifies this as an MA-150 (described there as a stepper) under inactinic light at LAAS-CNRS. Equipment housings, a central platform and screens are visible; the photo does not establish exposure method, interferometer configuration, supported nodes or nanometer alignment accuracy.",
    "matchZh": "此圖提供設備環境參考。旁側 CPP／M1 節距與標準單元軌道圖是獨立教學示意；照片及圖釘不是這些尺寸的量測證據。",
    "matchEn": "This photo provides equipment context. The adjacent CPP/M1 pitch and standard-cell track diagrams are separate teaching schematics; the photo and markers are not measurements of those dimensions.",
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:MA-150_steppers_at_LAAS_(FDLS_2007)_0441.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
  },
  "ch15": {
    "id": "ch15",
    "src": "assets/photos/ch15-metrology-profilometer.jpg",
    "categoryZh": "桌面設備參考照片",
    "categoryEn": "Desktop Equipment Reference Photo",
    "titleZh": "LAAS-CNRS 的接觸式輪廓儀",
    "titleEn": "Contact Profilometer at LAAS-CNRS",
    "scaleZh": "探測方式、精度與掃描範圍未確認",
    "scaleEn": "Probe method, precision and scan range unverified",
    "captionZh": "來源辨識為 LAAS-CNRS 無塵室中的接觸式輪廓儀。照片可見上方顯示器、前窗內的圓形台、外殼、鍵盤與右側電腦；不能據此確認探針規格、量測精度或奈米級能力。",
    "captionEn": "The source identifies this as a contact profilometer in the LAAS-CNRS clean room. An upper display, a circular stage behind the front window, the housing, a keyboard and a computer on the right are visible; probe specifications, measurement precision and nanometer capability are not established by the photo.",
    "matchZh": "此照片只提供設備外觀參考。旁側 CD-SEM、明暗場與橢偏圖為獨立教學示意，不能將其結構或性能直接對應到這台設備。",
    "matchEn": "This photo provides equipment appearance only. The adjacent CD-SEM, bright/dark-field and ellipsometry diagrams are independent teaching schematics; their structures and performance cannot be assigned to this instrument.",
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Contact_profilometer_at_LAAS_0419.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
  },
  "ch16": {
    "id": "ch16",
    "src": "assets/photos/ch16-defect-inspection-him.jpg",
    "categoryZh": "顯微影像對照",
    "categoryEn": "Microscope Image Comparison",
    "titleZh": "SEM 與氦離子顯微鏡的影像對照（NIST）",
    "titleEn": "SEM vs. Helium Ion Microscope Images (NIST)",
    "scaleZh": "未見尺標 · 樣品是錫上的金，不是晶圓",
    "scaleEn": "No visible scale bar · The sample is gold on tin, not a wafer",
    "captionZh": "來源為美國國家標準與技術研究院（NIST）：左幅是掃描式電子顯微鏡（SEM）拍攝錫上金原子的影像，景深較淺，只有部分清楚；右幅是氦離子顯微鏡影像，整張都清楚。NIST 研究氦離子顯微鏡，是為了改善半導體與奈米製造需要的奈米級量測。樣品不是晶圓，照片也不顯示缺陷或次表面空洞。",
    "captionEn": "The source is the US National Institute of Standards and Technology (NIST): the left panel is a scanning electron microscope (SEM) image of gold atoms on tin with shallow depth of field, so only parts are sharp; the right panel is a helium ion microscope image that is sharp throughout. NIST studies helium ion microscopes to improve the nanoscale measurements needed in semiconductor and nanomanufacturing. The sample is not a wafer, and the images show no defects or subsurface voids.",
    "matchZh": "此圖說明不同顯微成像方式的景深差異。旁側晶圓圖譜、FIB 與 TEM 為獨立教學示意；照片與圖釘不是半導體缺陷、設備性能或失效機制的證據。",
    "matchEn": "These images show how depth of field differs between imaging methods. The adjacent wafer-map, FIB and TEM diagrams are independent teaching schematics; the images and markers are not evidence of semiconductor defects, equipment performance or a failure mechanism.",
    "metrology": {
      "voltage": "Not reported by source",
      "voltageZh": "來源未提供",
      "mag": "Not reported by source",
      "magZh": "來源未提供",
      "fov": "Not reported by source",
      "fovZh": "來源未提供",
      "techniqueZh": "SEM（左）與氦離子顯微鏡（右），依來源說明",
      "techniqueEn": "SEM (left) and helium ion microscope (right), per source"
    },
    "hotspots": [
      {
        "x": 45,
        "y": 40,
        "labelZh": "左幅 SEM 影像",
        "labelEn": "Left Panel: SEM Image",
        "detailZh": "來源說明左幅為 SEM 影像，景深較淺，只有部分區域清楚對焦。樣品是錫上的金，不是晶圓缺陷。",
        "detailEn": "Per the source, the left panel is an SEM image with shallow depth of field, so only parts are in sharp focus. The sample is gold on tin, not a wafer defect."
      },
      {
        "x": 55,
        "y": 50,
        "labelZh": "中央白色分隔帶",
        "labelEn": "Central White Divider",
        "detailZh": "圖釘位於兩幅影像之間的白色分隔帶，這不是樣品的一部分，也不能解讀為金屬介層孔中的空洞。",
        "detailEn": "The marker lies on the white divider between the panels. It is not part of the sample and cannot be interpreted as a void in a metal via."
      },
      {
        "x": 80,
        "y": 35,
        "labelZh": "右幅氦離子顯微鏡影像",
        "labelEn": "Right Panel: Helium Ion Microscope Image",
        "detailZh": "來源說明右幅為氦離子顯微鏡影像，整張都清楚對焦。畫面未顯示設備構件或偵測器。",
        "detailEn": "Per the source, the right panel is a helium ion microscope image that is in sharp focus throughout. No equipment components or detectors are shown."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Helium_Ion_Microscope_(5887833384).jpg",
      "author": "National Institute of Standards and Technology (NIST)",
      "license": "Public domain (PD-USGov-NIST)",
      "licenseUrl": "https://commons.wikimedia.org/wiki/Template:PD-USGov-NIST",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
  },
  "ch17": {
    "id": "ch17",
    "src": "assets/photos/ch17-parametric-test-spc.jpg",
    "categoryZh": "實驗室工作區參考圖",
    "categoryEn": "Laboratory Work Area Reference",
    "titleZh": "LAAS-CNRS 的量測工作台",
    "titleEn": "Characterization Bench at LAAS-CNRS",
    "scaleZh": "機型、量測功能與效能未確認",
    "scaleEn": "Instrument Models, Functions and Performance Unverified",
    "captionZh": "來源說明這是 LAAS-CNRS 的量測工作台，包含顯微鏡、橢偏儀、接觸式與光學輪廓儀。畫面可見多組顯微鏡、螢幕、桌面設備與線材；不能由此辨認自動參數測試、SPC 軟體或量測精度。",
    "captionEn": "The source describes this as a characterization bench at LAAS-CNRS with microscopes, an ellipsometer and contact and optical profilometers. Several microscopes, monitors, bench instruments and cables are visible; automated parametric testing, SPC software and measurement accuracy cannot be established from this image.",
    "matchZh": "僅作數據蒐集工作環境的概念參考，不是特定 SPC 系統整合或效能證據。",
    "matchEn": "Concept reference for a data-collection work area, not evidence of a specific SPC integration or performance.",
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Characterization_bench_at_LAAS_0479.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
  },
  "ch18": {
    "id": "ch18",
    "src": "assets/photos/ch18-foup-wafer-carrier.jpg",
    "categoryZh": "晶圓出貨盒照片",
    "categoryEn": "Wafer Shipping Box Photo",
    "titleZh": "前開式晶圓出貨盒（FOSB）",
    "titleEn": "Front Opening Shipping Box (FOSB)",
    "scaleZh": "來源標示可放 25 片 300mm 晶圓 · 照片無尺標",
    "scaleEn": "Source states capacity for 25 × 300mm wafers · No visible scale",
    "captionZh": "來源說明這是前開式出貨盒（FOSB）的正面，最多可放 25 片 300mm 晶圓，拍攝時放了 8 片不同的矽晶圓。FOSB 用於晶圓出貨運送；晶圓廠內在機台之間搬運通常使用 FOUP，兩者外觀相似但用途不同。照片不能確認氮氣吹氣、密封或潔淨等級。",
    "captionEn": "The source describes this as the front of a front opening shipping box (FOSB) that holds up to 25 300mm wafers, with 8 different silicon wafers loaded. FOSBs are used to ship wafers; transport between tools inside a fab normally uses FOUPs, which look similar but serve a different purpose. Nitrogen purge, sealing and cleanliness class are not established by this photo.",
    "matchZh": "作為晶圓載具的外觀參考；照片是出貨盒，不是廠內 FOUP，也不能證明 MES Hold、OHT 搬運或自動互鎖。",
    "matchEn": "A visual reference for wafer carriers; the photo shows a shipping box, not an in-fab FOUP, and does not establish MES Hold, OHT transport or automated interlocks.",
    "metrology": {
      "voltage": "Not reported by source",
      "voltageZh": "來源未提供",
      "mag": "Not reported by source",
      "magZh": "來源未提供",
      "fov": "Not reported by source",
      "fovZh": "來源未提供",
      "techniqueZh": "可見光照片（外觀參考）",
      "techniqueEn": "Visible-light photograph (visual reference)"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 35,
        "labelZh": "上方晶圓",
        "labelEn": "Upper Wafers",
        "detailZh": "圖釘靠近盒內上方的晶圓。這是出貨盒，照片不能辨識門封材質或潔淨能力。",
        "detailEn": "The marker is near the upper wafers in the box. This is a shipping box, and the photo does not identify the door seal material or cleanliness performance."
      },
      {
        "x": 50,
        "y": 65,
        "labelZh": "晶圓邊緣與槽位",
        "labelEn": "Wafer Edges and Slots",
        "detailZh": "可見晶圓邊緣與一格格的槽位；來源說明最多可放 25 片。照片未顯示氮氣吹氣閥或氧化防護功能。",
        "detailEn": "Wafer edges and individual slots are visible; the source states the box holds up to 25 wafers. No nitrogen-purge valve or oxidation-protection function is shown."
      },
      {
        "x": 25,
        "y": 75,
        "labelZh": "左側槽形支撐",
        "labelEn": "Left Slotted Support",
        "detailZh": "可見左側槽形支撐結構；此位置不能確認底部三點 V 溝或對接精度。",
        "detailEn": "A slotted support is visible on the left; this location does not establish bottom three-point V-grooves or docking precision."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Front_opening_shipping_box_(front_side).jpg",
      "author": "Cepheiden",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Probe_card.JPG",
      "author": "Ajoones",
      "license": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
  },
  "ch20": {
    "id": "ch20",
    "src": "assets/photos/ch20-wire-bonding-micro.jpg",
    "categoryZh": "打線參考照片",
    "categoryEn": "Wire-Bonding Reference Photo",
    "titleZh": "07R01 積體電路的球楔打線",
    "titleEn": "Ball-Wedge Wire Bonds on a 07R01 IC",
    "scaleZh": "照片無尺標；來源未說明線徑與焊點規格",
    "scaleEn": "No visible scale; wire diameter and bond specifications not stated by source",
    "captionZh": "來源說明這是 Motorola GM350 無線電收發機中 07R01 中頻放大／解調積體電路的局部，檔名標示為球楔打線（ball-wedge bonding）。可見左側晶片上的焊點，多條金色導線以弧形延伸到右側大面積的金色焊墊；來源沒有說明導線與焊墊材質、打線條件或放大倍率。",
    "captionEn": "The source describes this as part of the 07R01 IF amplifier/demodulator IC in a Motorola GM350 transceiver, and the file name labels it ball-wedge bonding. Bond points on the chip at left are visible, with several gold-colored wires arching to large gold-colored pads on the right; the source does not state wire or pad materials, bonding conditions or magnification.",
    "matchZh": "輔助觀察打線的導線弧形與兩端焊點；左側傳統封裝與覆晶模型是教學示意，照片不是其尺寸或製程條件的證據。",
    "matchEn": "A visual reference for wire loops and the bonds at each end; the adjacent wire-bond and flip-chip models are teaching schematics, and the photo is not evidence of their dimensions or process conditions.",
    "metrology": {
      "voltage": "Not reported by source",
      "voltageZh": "來源未提供",
      "mag": "Not reported by source",
      "magZh": "來源未提供",
      "fov": "Not reported by source",
      "fovZh": "來源未提供",
      "techniqueZh": "來源未說明成像方式",
      "techniqueEn": "Imaging method not stated by source"
    },
    "hotspots": [
      {
        "x": 48,
        "y": 25,
        "labelZh": "導線弧段",
        "labelEn": "Wire loop",
        "detailZh": "可見導線從左側焊點拉起後的弧段。打線時會控制線弧形狀，避免封膠時導線被沖倒（wire sweep），但照片不能確認這條線弧的控制方式。",
        "detailEn": "The arc of a wire rising from a bond at left is visible. Loop shape is controlled during bonding to avoid wire sweep during molding, but the photo does not show how this loop was controlled."
      },
      {
        "x": 55,
        "y": 50,
        "labelZh": "導線末端與右側焊墊",
        "labelEn": "Wire end and right-side pad",
        "detailZh": "導線延伸到右側較大的金色焊墊。依來源檔名，這是球楔打線：晶片端為球形焊點，另一端為楔形焊點；照片不能確認焊墊屬於導線架或基板。",
        "detailEn": "The wire runs to a larger gold-colored pad on the right. Per the source file name this is ball-wedge bonding, with a ball bond on the chip and a wedge bond at the other end; the photo does not establish whether the pad belongs to a lead frame or a substrate."
      },
      {
        "x": 25,
        "y": 75,
        "labelZh": "導線下方的金色區域",
        "labelEn": "Gold-colored area beneath the wires",
        "detailZh": "可見大面積金色表面。來源沒有說明是鍍金或其他金屬，左側晶片邊緣的球形焊點也無法量測尺寸。",
        "detailEn": "A large gold-colored surface is visible. The source does not state whether it is gold plating or another metal, and the ball bonds at the chip edge cannot be measured."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:07R01_(cropped_ball-wedge_bonding).jpg",
      "author": "Mister rf",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
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
    "categoryZh": "早期晶圓廠作業照片",
    "categoryEn": "Early Fab Operation Photo",
    "titleZh": "早期 Intel 晶圓廠的 Veeco 檢漏機",
    "titleEn": "Veeco Leak Detector in an Early Intel Fab",
    "scaleZh": "設備外觀參考 · 來源未說明檢漏靈敏度",
    "scaleEn": "Equipment reference · leak sensitivity not stated by source",
    "captionZh": "來源為 Intel Free Press 的早期照片：穿 Intel 工作服的晶圓廠技術員正在操作當時稱為 Veeco Leak Detector 的檢漏機。來源說明的做法是把半導體元件放進水中再抽真空，封裝有漏洞的元件會進水損壞，在測試時被判為不良品。這是浸水抽真空的方法，不是氦氣質譜檢漏；照片也不能確認真空等級或偵測下限。",
    "captionEn": "The source is an early Intel Free Press photo: a fab technician in an Intel smock operates what was then called a Veeco Leak Detector. Per the source, semiconductors were placed in water and a vacuum was drawn; a leaky package let water in, destroying the circuit so it failed at testing. This is a water-immersion vacuum method, not helium mass-spectrometer leak testing; vacuum level and detection limits cannot be established from the photo.",
    "matchZh": "呈現早期封裝檢漏的作業情境；不是浴缸曲線、加速因子或失效率的量測證據。",
    "matchEn": "A reference for early package leak testing in practice, not measurement evidence for the bathtub curve, acceleration factor or failure rate.",
    "metrology": {
      "voltage": "Not reported by source",
      "voltageZh": "來源未提供",
      "mag": "Not reported by source",
      "magZh": "來源未提供",
      "fov": "Not reported by source",
      "fovZh": "來源未提供",
      "techniqueZh": "可見光照片（早期檔案照片）",
      "techniqueEn": "Visible-light photograph (archival)"
    },
    "hotspots": [
      {
        "x": 50,
        "y": 35,
        "labelZh": "背景座椅與工作區",
        "labelEn": "Background Chair and Work Area",
        "detailZh": "圖釘位於背景座椅附近。來源描述的檢漏方式是浸水抽真空，這裡不是氦氣加壓室。",
        "detailEn": "The pin is near a background chair. The source describes water-immersion vacuum testing, so this is not a helium bombing chamber."
      },
      {
        "x": 50,
        "y": 65,
        "labelZh": "槽內圓形支架",
        "labelEn": "Circular Holder in the Vessel",
        "detailZh": "可見槽內圓形支架。來源說明元件放在水中後抽真空，但沒有說明這個支架的用途。",
        "detailEn": "A circular holder is visible inside the vessel. The source says parts were placed in water under vacuum but does not describe this holder."
      },
      {
        "x": 20,
        "y": 55,
        "labelZh": "圓槽左側邊緣",
        "labelEn": "Left Edge of the Circular Vessel",
        "detailZh": "可見槽體邊緣與附近結構；來源沒有說明幫浦或閥件的型式。",
        "detailEn": "The vessel edge and nearby structure are visible; the source does not describe the pump or valve type."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Leak_Detection_Machine.jpg",
      "author": "Intel Free Press",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。原始出處為 Intel Free Press 的 Flickr 相簿。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site. Originally published by Intel Free Press on Flickr."
    }
  },
  "ch23": {
    "id": "ch23",
    "src": "assets/photos/ch23-cim-fab-automation.jpg",
    "categoryZh": "潔淨作業參考照片",
    "categoryEn": "Clean Work-Area Reference Photo",
    "titleZh": "防護衣人員與金屬組件裝配工作區",
    "titleEn": "Personnel in Coveralls and a Metal-Assembly Work Area",
    "scaleZh": "潔淨分級未確認；來源為粒子加速器元件的無塵室",
    "scaleEn": "Cleanliness class unverified; the source is a particle-accelerator component clean room",
    "captionZh": "來源說明這是 Jefferson Lab 超導射頻（SRF）測試實驗室的主無塵室，技術人員正在組裝鈮製腔體；這不是半導體晶圓廠。本章借用它呈現受控環境中的作業情境，照片不顯示 OHT 調度或 MES 介面。",
    "captionEn": "The source describes the main clean room of the Jefferson Lab SRF Test Lab, where a technician is assembling a niobium cavity; this is not a semiconductor fab. The chapter uses it to show work in a controlled environment; the photo does not show OHT dispatching or MES interfaces.",
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Semiconductor_clean_room.jpg",
      "author": "Aileen Devlin / Jefferson Lab",
      "license": "Public domain (Public Domain Mark)",
      "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。原始出處為 Jefferson Lab 的 Flickr 相簿；畫面是粒子加速器元件的無塵室，不是半導體晶圓廠。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site. Originally from Jefferson Lab on Flickr; the scene is a particle-accelerator component clean room, not a semiconductor fab."
    }
  },
  "ch24": {
    "id": "ch24",
    "src": "assets/photos/ch24-decapped-cpu-die.jpg",
    "categoryZh": "晶粒平面參考照片",
    "categoryEn": "Plan-View Die Reference Photo",
    "titleZh": "Intel 80286 處理器晶粒",
    "titleEn": "Intel 80286 Processor Die",
    "scaleZh": "來源未說明實際尺寸；圖釘只標示可見區域",
    "scaleEn": "Dimensions not stated by source; markers show visible regions only",
    "captionZh": "來源說明這是 Intel 80286 微處理器（8 MHz 版）的晶粒照片。可見多個規則矩形圖樣、不規則線路區及周邊導線；來源沒有附電路配置圖，因此圖釘不標示功能單元。80286 是 1980 年代初期的處理器，晶片上沒有快取記憶體，這張照片不能用來說明現代 CPU 的 L3 快取或去耦電容。",
    "captionEn": "The source describes this as a die photo of the Intel 80286 microprocessor (8 MHz version). Regular rectangular patterns, irregular routing regions and peripheral wires are visible; the source provides no floorplan, so the pins do not label functional units. The 80286 is an early-1980s processor with no on-chip cache, so this photo cannot illustrate a modern CPU's L3 cache or decoupling capacitors.",
    "matchZh": "輔助理解實體晶片具有複雜佈局；照片不能驗證 RowHammer、壓降或時序性能。",
    "matchEn": "A reference for the complexity of physical chip layouts; the photo does not validate RowHammer behavior, voltage drop or timing performance.",
    "metrology": {
      "voltage": "Not reported by source",
      "voltageZh": "來源未提供",
      "mag": "Not reported by source",
      "magZh": "來源未提供",
      "fov": "Not reported by source",
      "fovZh": "來源未提供",
      "techniqueZh": "晶粒照片（來源未說明成像條件）",
      "techniqueEn": "Die photograph (imaging conditions not stated)"
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
        "detailZh": "可見規則重複圖樣；來源沒有標示這是哪個功能單元，80286 晶片上也沒有快取記憶體。",
        "detailEn": "Regular repeated patterns are visible; the source does not say which functional unit this is, and the 80286 has no on-chip cache."
      },
      {
        "x": 20,
        "y": 75,
        "labelZh": "左下矩形陣列",
        "labelEn": "Lower-Left Rectangular Array",
        "detailZh": "可見矩形重複陣列；來源沒有標示其功能，不能認定為去耦電容或推論電源穩定效果。",
        "detailEn": "A repeated rectangular array is visible; the source does not label its function, so it cannot be identified as decoupling capacitors or used to infer power-stability performance."
      }
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Intel_80286_die.JPG",
      "author": "Pauli Rautakorpi",
      "license": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ellipsometer_at_LAAS.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:EVG_120_resist_coater-developer_at_LAAS_0434.jpg",
      "author": "Guillaume Paumier",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site."
    }
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
    ],
    "reference": {
      "sourceTitle": "Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Silicon_Photonics_300mm_wafer.JPG",
      "author": "Ehsanshahoseini",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "noteZh": "沿用現有照片並縮小尺寸；本站另加熱點與圖說。與第 00 章為同一張照片。",
      "noteEn": "Existing local photo retained at reduced size; markers and captions added by this site. Same photo as Chapter 00."
    }
  }
};
