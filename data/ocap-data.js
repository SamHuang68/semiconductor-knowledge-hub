/**
 * ocap-data.js
 * 晶圓廠異常反應處置程序 (Out-of-Control Action Plan, OCAP) 決策樹資料庫
 * 涵蓋全站 25 章正文與 3 篇附錄之標準異常觸發、緊急防堵 (Containment)、根因分析 (RCA) 與處置決策流程
 */
export const OCAP_TREES = {
  "ch00": {
    "id": "ch00",
    "titleZh": "晶圓全景出貨外觀與劃線區缺陷 OCAP",
    "titleEn": "Wafer Outgoing Visual & Scribe Line Defect OCAP",
    "triggerZh": "出貨全檢 AOI 檢出晶圓邊緣碎裂 (Bevel Chipping) 或劃線區金屬刮痕 (Scratch) > 5 處。",
    "triggerEn": "Automated optical inspection flags edge bevel chipping or scribe line scratches > 5 counts.",
    "containmentZh": "全數凍結該批次 (Lot Hold)，停止出貨包裝並將該 FOUP 移至專用排查工位。",
    "containmentEn": "Execute immediate lot hold; isolate FOUP from automated pack line to quarantine bay.",
    "rcaZh": "查核晶圓搬運機械手臂（Robot End-Effector）真空吸力傳感器與傳輸導軌同軸度。",
    "rcaEn": "Inspect robot end-effector vacuum sensor logs and transfer rail mechanical alignment.",
    "dispositionZh": "邊緣崩裂未侵入 Active Area 且 WAT 測試全綠者，放行轉次級封裝；若裂紋貫穿 Active Die 則判定報廢。",
    "dispositionEn": "Release to non-critical assembly if cracks avoid active die; scrap if cracks breach active circuits.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "AOI 檢出晶圓邊界崩角 > 100µm",
        "textEn": "AOI flags edge chipping > 100µm"
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統鎖定全批 25 片晶圓",
        "textEn": "MES lot-hold on all 25 wafers"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "調取機械手臂真空軌跡與震動記錄",
        "textEn": "Review end-effector vibration logs"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估裂紋是否蔓延至晶粒工作區？",
        "textEn": "Check if cracks breach active area"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "侵入：局部報廢並調整夾爪；未侵入：監控放行",
        "textEn": "Breached: Scrap & recalibrate; Intact: Pass with alert"
      }
    ],
    "preventionZh": "每週執行機械手臂接觸力感測校正，於 SECS/GEM 增設機械手臂異常震動互鎖。",
    "preventionEn": "Weekly robot end-effector force calibration and interlock on abnormal vibration signatures."
  },
  "ch01": {
    "id": "ch01",
    "titleZh": "無塵室落塵微粒超標與正壓喪失 OCAP",
    "titleEn": "Cleanroom Airborne Particle Spike & Pressure Drop OCAP",
    "triggerZh": "無塵室粒子計數器 (Particle Counter) 0.1µm 微粒連續 3 次超過 Class 10 上限 (10 counts/ft³)。",
    "triggerEn": "Aerosol particle counter reports 0.1µm counts > 10/ft³ for 3 consecutive intervals.",
    "containmentZh": "立即暫停該 Bay 區所有敞開式站點作業，機台負載口 (Load Port) 全面關閉並鎖定 FOUP。",
    "containmentEn": "Halt all exposed operations in bay; seal tool load ports and freeze wafer FOUP doors.",
    "rcaZh": "排查天花板 FFU 濾網風速、高架地板回風氣流流向，確認是否有外部未更衣人員或施工震動。",
    "rcaEn": "Inspect ceiling FFU airflow velocity, perforated raised floor drafts, and maintenance logs.",
    "dispositionZh": "微粒回落至 1 count/ft³ 並經乾淨氮氣置換 2 小時後重啟；敞開晶圓需送清洗機台 RCA-1 洗淨。",
    "dispositionEn": "Resume bay after particle purge to < 1 count/ft³; reroute exposed lots to RCA-1 wet clean.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "粒子監控傳感器閃爍紅燈超標",
        "textEn": "Particle counter alarms red status"
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "廣播通報並閉鎖該 Bay 機台門扉",
        "textEn": "Broadcast warning & lock bay doors"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "煙霧筆測試層流 (Laminar Flow) 是否紊亂",
        "textEn": "Smoke pencil test for laminar turbulence"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "FFU 濾網破損或馬達故障？",
        "textEn": "Damaged HEPA filter or motor fault?"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "更換濾網、正壓恢復、受測批送洗後放行",
        "textEn": "Replace filter, restore pressure, clean & release"
      }
    ],
    "preventionZh": "建立 FFU 濾網壓差微感測預警系統，出入口人員風淋室 (Air Shower) 強制加裝靜電除塵檢測。",
    "preventionEn": "Install differential pressure sensors across FFUs; enforce ESD checks at personnel air showers."
  },
  "ch02": {
    "id": "ch02",
    "titleZh": "固態物理通道載子移動率與漏電異常 OCAP",
    "titleEn": "Carrier Mobility Degradation & Junction Leakage OCAP",
    "triggerZh": "WAT 測試晶粒次臨界擺幅 SS > 95 mV/dec，或接面逆向漏電流 Ileak > 10⁻¹⁰ A/µm。",
    "triggerEn": "WAT measures subthreshold swing SS > 95 mV/dec or junction leakage > 10⁻¹⁰ A/µm.",
    "containmentZh": "鎖定同批次磊晶與退火製程批次，暫停後續金屬化製程。",
    "containmentEn": "Hold current lot and freeze related epitaxy & spike annealing runs pending analysis.",
    "rcaZh": "進行二次離子質譜 (SIMS) 雜質深度剖面分析，排查通道內是否有過量氧或重金屬污染。",
    "rcaEn": "Run SIMS depth profiling to detect oxygen precipitates or metallic contamination in channel.",
    "dispositionZh": "若為熱退火活化不足，可追加二次低溫熱修補退火；若為重金屬穿透則判定全批報廢。",
    "dispositionEn": "If incomplete activation, dispatch recovery anneal; scrap if deep-level metal traps detected.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "WAT 測試晶體載子遷移率衰退 > 25%",
        "textEn": "WAT flags mobility degradation > 25%"
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "阻斷後段金屬化 (BEOL) 流水線",
        "textEn": "Halt dispatch to BEOL metallization"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "SIMS 深度分析與高解析 TEM 晶格觀測",
        "textEn": "Run SIMS profiling & HR-TEM imaging"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "介面陷阱過多或雜質擴散？",
        "textEn": "Interface traps vs dopant diffusion?"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "修復退火製程配方；無法補救者報廢",
        "textEn": "Tune annealing recipe; scrap non-recoverable"
      }
    ],
    "preventionZh": "在熱處理製程前段增設 ICP-MS 表面金屬離子快篩，定期檢驗長晶高純矽原料純度。",
    "preventionEn": "In-line ICP-MS metallic screening before thermal steps; enforce 11N polysilicon feed stock QA."
  },
  "ch03": {
    "id": "ch03",
    "titleZh": "柴氏長晶氧含量偏高與差排缺陷 OCAP",
    "titleEn": "CZ Ingot Oxygen Contamination & Dislocation OCAP",
    "triggerZh": "FTIR 傅立葉紅外光譜量測矽晶圓間隙氧含量 Oi > 1.2×10¹⁸ atoms/cm³。",
    "triggerEn": "FTIR spectroscopy measures interstitial oxygen Oi > 1.2×10¹⁸ atoms/cm³.",
    "containmentZh": "阻斷該長晶爐同批矽棒（Ingot）切片派工，抽驗相鄰晶圓之微缺陷 (BMD)。",
    "containmentEn": "Halt slicing of matching ingot; inspect bulk micro-defect (BMD) levels on neighboring wafers.",
    "rcaZh": "檢查石英坩堝轉速、氬氣排氣流量與橫向磁場 (MCZ) 強度是否衰退。",
    "rcaEn": "Verify quartz crucible rotation speed, argon purge purge flow, and MCZ magnetic field strength.",
    "dispositionZh": "氧含量偏高但均勻者，降規調配至對內部吸雜 (IG) 要求較高之 DRAM 產品線；嚴重者回爐重熔。",
    "dispositionEn": "Reroute to DRAM lines requiring strong internal gettering; remelt if severe precipitation occurs.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "FTIR 警報間隙氧 Oi 超過管制線",
        "textEn": "FTIR alarms interstitial oxygen Oi UCL"
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "鎖定矽棒流水號，暫停滾圓切片",
        "textEn": "Hold ingot ID, stop grinding & wire saw"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "檢查長晶爐磁場與坩堝侵蝕深度",
        "textEn": "Inspect MCZ magnet coils & crucible erosion"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "是否具備足夠吸雜餘裕？",
        "textEn": "Does wafer retain safe gettering margin?"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "調整產品分流或退回多晶矽熔融重抽",
        "textEn": "Reroute product tier or remelt in CZ furnace"
      }
    ],
    "preventionZh": "導入超導磁場 Czochralski (MCZ) 系統，抑制熱對流；石英坩堝使用壽命到期強制更換。",
    "preventionEn": "Standardize superconducting MCZ thermal dampening; enforce mandatory quartz crucible lifespan limits."
  },
  "ch04": {
    "id": "ch04",
    "titleZh": "微影關鍵尺寸 CD 偏移與套刻對準 OCAP",
    "titleEn": "Photolithography CD Bias & Overlay Alignment OCAP",
    "triggerZh": "CD-SEM 量測關鍵尺寸偏離目標值 > 5% 或光學套刻誤差 (Overlay) > 1.5 nm。",
    "triggerEn": "CD-SEM measures CD deviation > 5% or optical overlay error > 1.5 nm.",
    "containmentZh": "立即鎖定當前曝光機台與曝光批次 (Lot Hold)，機台自動切換為檢修狀態。",
    "containmentEn": "Trigger immediate lot hold; transition scanner to offline diagnostics mode.",
    "rcaZh": "排查光罩污染、曝光劑量感測器 (Dose Sensor) 校準、雷射波長穩定性與工件台雷射干涉儀。",
    "rcaEn": "Inspect reticle pellicle, dose sensor calibration, laser stability, and stage interferometer mirrors.",
    "dispositionZh": "若未進行蝕刻，一律執行光阻剝除重工 (Rework Strip & Recoat)；若已進入蝕刻則判定局部報廢。",
    "dispositionEn": "Un-etched wafers route to photoresist strip and recoat rework; etched wafers scrap.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "CD-SEM 檢測線寬超出 ±1.2nm 上下限",
        "textEn": "CD-SEM detects CD outside ±1.2nm limit"
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "全自動停線 (E-Stop) 並通報黃光工程師",
        "textEn": "E-stop scanner dispatch & alert photo PE"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "量測光罩穿透率與晶圓平坦度對焦圖",
        "textEn": "Measure reticle transmission & wafer focus map"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "晶圓是否已過蝕刻反應腔？",
        "textEn": "Has wafer undergone dry etch?"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "未蝕刻：電漿去阻洗淨重照；已蝕刻：判廢",
        "textEn": "Pre-etch: Ash & rework; Post-etch: Scrap"
      }
    ],
    "preventionZh": "每 50 批強制執行自動光罩自檢 (Pellicle Inspection)，並以 APC 閉迴路自動微調曝光能量。",
    "preventionEn": "Enforce reticle pellicle inspection every 50 lots; apply APC closed-loop dose/focus feedback."
  },
  "ch05": {
    "id": "ch05",
    "titleZh": "薄膜沉積膜厚不均勻度與顆粒異物 OCAP",
    "titleEn": "Thin Film Thickness Non-Uniformity & Particle OCAP",
    "triggerZh": "橢圓偏光儀量測薄膜厚度非均勻度 (NU%) > 2.5% 或光學表面檢出微粒 > 15 顆。",
    "triggerEn": "Ellipsometer measures non-uniformity > 2.5% or particle counter detects > 15 adders.",
    "containmentZh": "鎖定沉積腔體 (Chamber Lockout)，暫停所有排程批次進入該腔體。",
    "containmentEn": "Lock down process chamber; pause automated lot dispatch to affected module.",
    "rcaZh": "檢查氣體分流頭 (Showerhead) 噴孔是否堵塞、RF 阻抗匹配電容值與加熱吸盤溫度場。",
    "rcaEn": "Inspect gas showerhead orifice fouling, RF impedance match, and heater pedestal thermal distribution.",
    "dispositionZh": "若膜厚不足可追加同配方沉積微調；若膜厚過厚且為氧化層可 CMP 微拋修整；若顆粒超標送清洗。",
    "dispositionEn": "If thin, run recipe top-up; if thick, CMP touch-up planarization; if particles, wet clean.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "光學量測膜厚多點測量均勻度失真",
        "textEn": "Multi-point ellipsometry flags poor uniformity"
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "腔體鎖定，切換測試 Dummy 晶圓",
        "textEn": "Lock chamber, load bare dummy wafer"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "執行腔體乾式電漿潔淨 (Chamber Clean)",
        "textEn": "Execute NF3 in-situ chamber plasma clean"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "Dummy 晶圓量測是否回到規格內？",
        "textEn": "Does dummy wafer meet baseline spec?"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "合格：解鎖放行；不合格：破真空換蓮蓬頭",
        "textEn": "Passed: Release; Failed: Vent chamber & swap part"
      }
    ],
    "preventionZh": "設定 RF 射頻累積放電小時預防保養閥值 (RF Hour PM)，定期原位 NF3 電漿潔淨腔壁。",
    "preventionEn": "Implement RF hour accumulation thresholds for in-situ NF3 plasma chamber clean cycles."
  },
  "ch06": {
    "id": "ch06",
    "titleZh": "電漿蝕刻深度不足與微觀負載效應 OCAP",
    "titleEn": "Plasma Etch Under-Etch & Micro-Loading OCAP",
    "triggerZh": "光學發射光譜 (OES) 終點偵測失效，或階梯輪廓儀測得蝕刻深度偏低 > 8%。",
    "triggerEn": "Optical Emission Spectroscopy (OES) endpoint detection fails or depth is > 8% shallow.",
    "containmentZh": "產線自動截停後續批次進入該蝕刻槽，鎖定當前批晶圓並標記重工屬性。",
    "containmentEn": "Halt downstream lots; lock current lot in MES with rework classification.",
    "rcaZh": "分析 OES 特徵波長信號強度、靜電吸盤氦氣背冷壓力洩漏率與渦輪分子泵閥門開度。",
    "rcaEn": "Analyze OES spectral intensity, ESC backside helium leak rate, and throttle valve angle.",
    "dispositionZh": "若為蝕刻不足 (Under-etch) 且光阻未損耗殆盡，可計算時間追加二次修補蝕刻；若過蝕刻則判定報廢。",
    "dispositionEn": "If under-etched with photoresist intact, run trimmed touch-up etch; if over-etched, scrap.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "OES 終點判讀訊噪比異常或逾時未降",
        "textEn": "OES endpoint timeout or abnormal SNR"
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "機台發出 Audible Alarm 並凍結傳輸",
        "textEn": "Audible tool alarm & transfer interlock"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "檢查反應氣體質量流量控制器 (MFC)",
        "textEn": "Verify gas MFC mass flow calibrations"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "光阻厚度是否仍具備蝕刻耐受餘量？",
        "textEn": "Does remaining photoresist have etch margin?"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "有餘量：微調參數二次補刻；無餘量：判廢",
        "textEn": "Margin exists: Touch-up etch; Exhausted: Scrap"
      }
    ],
    "preventionZh": "導入雙光譜多頻 OES 演算法防止單一光譜漂移，靜電吸盤加裝實時氦氣微洩漏警示器。",
    "preventionEn": "Multi-wavelength OES algorithm preventing false endpoints; real-time backside He leak monitor."
  },
  "ch07": {
    "id": "ch07",
    "titleZh": "離子佈植束流偏差與晶格非晶化過度 OCAP",
    "titleEn": "Ion Beam Energy Deviation & Over-Amorphization OCAP",
    "triggerZh": "四探針薄層電阻 (Rs) 量測偏離基準線 > 4% 或熱波儀 (Thermal Wave) 晶格損傷超標。",
    "triggerEn": "Four-point probe sheet resistance (Rs) drifts > 4% or thermal wave damage exceeds UCL.",
    "containmentZh": "停機離子佈植機，隔離該機台當日處理之所有晶圓批次。",
    "containmentEn": "Halt implanter; quarantine all lots processed within current shift.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "四探針薄層電阻 (Rs) 量測偏離基準線 > 4% 或熱波儀 (Thermal Wave) 晶格損傷超標。",
        "textEn": "Four-point probe sheet resistance (Rs) drifts > 4% or thermal wave damage exceeds UCL."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "停機離子佈植機，隔離該機台當日處理之所有晶圓批次。",
        "textEn": "Halt implanter; quarantine all lots processed within current shift."
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch08": {
    "id": "ch08",
    "titleZh": "化學機械研磨微刮痕與平坦度凹陷 OCAP",
    "titleEn": "CMP Micro-Scratch & Dishing/Erosion OCAP",
    "triggerZh": "暗場表面檢測機檢出密集同心圓微刮痕 (Micro-scratches) > 20 條或金屬 Dishing 深度超標。",
    "triggerEn": "Dark-field inspection flags concentric micro-scratches > 20 counts or excessive copper dishing.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "暗場表面檢測機檢出密集同心圓微刮痕 (Micro-scratches) > 20 條或金屬 Dishing 深度超標。",
        "textEn": "Dark-field inspection flags concentric micro-scratches > 20 counts or excessive copper dishing."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch09": {
    "id": "ch09",
    "titleZh": "晶圓清洗化學品濃度失衡與水痕殘留 OCAP",
    "titleEn": "Wet Chemical Bath Depletion & Watermark OCAP",
    "triggerZh": "滴定分析 SC-1 藥液過氧化氫濃度不足或 Marangoni 乾燥後檢出乾燥水痕 (Watermark)。",
    "triggerEn": "In-line titration reports H2O2 depletion in SC-1 or watermark defects found post-dry.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "滴定分析 SC-1 藥液過氧化氫濃度不足或 Marangoni 乾燥後檢出乾燥水痕 (Watermark)。",
        "textEn": "In-line titration reports H2O2 depletion in SC-1 or watermark defects found post-dry."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch10": {
    "id": "ch10",
    "titleZh": "後段金屬化雙鑲嵌孔洞填補空泡 OCAP",
    "titleEn": "BEOL Metallization Voiding & Barrier Breach OCAP",
    "triggerZh": "X-Ray 或聚焦離子束 (FIB) 切片發現雙鑲嵌銅導線介層孔底部存在微米級未填滿空泡 (Void)。",
    "triggerEn": "X-ray or FIB cross-section reveals copper via bottom voids or barrier breaches.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "X-Ray 或聚焦離子束 (FIB) 切片發現雙鑲嵌銅導線介層孔底部存在微米級未填滿空泡 (Void)。",
        "textEn": "X-ray or FIB cross-section reveals copper via bottom voids or barrier breaches."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch11": {
    "id": "ch11",
    "titleZh": "高溫擴散爐管平坦區溫控失真 OCAP",
    "titleEn": "Thermal Diffusion Furnace Thermal Zone Drift OCAP",
    "triggerZh": "熱電偶 (Thermocouple) 檢出中央平坦區溫度飄移 > 0.5°C 或氧化層厚度跨晶舟梯度超標。",
    "triggerEn": "Profile thermocouple detects flat zone temp drift > 0.5°C or boat-to-boat thickness gradient.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "熱電偶 (Thermocouple) 檢出中央平坦區溫度飄移 > 0.5°C 或氧化層厚度跨晶舟梯度超標。",
        "textEn": "Profile thermocouple detects flat zone temp drift > 0.5°C or boat-to-boat thickness gradient."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch12": {
    "id": "ch12",
    "titleZh": "先進 GAA 奈米片通道坍塌與橋接 OCAP",
    "titleEn": "Advanced GAA Nanosheet Sticking & Channel Bridge OCAP",
    "triggerZh": "TEM 橫切面電顯檢測發現矽奈米片通道在釋放蝕刻後發生垂直相黏坍塌 (Channel Sticking)。",
    "triggerEn": "TEM cross-section discovers vertical nanosheet channel sticking or bridge defect post-release.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "TEM 橫切面電顯檢測發現矽奈米片通道在釋放蝕刻後發生垂直相黏坍塌 (Channel Sticking)。",
        "textEn": "TEM cross-section discovers vertical nanosheet channel sticking or bridge defect post-release."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch13": {
    "id": "ch13",
    "titleZh": "3D NAND 深穿孔傾斜與接觸阻抗異常 OCAP",
    "titleEn": "3D NAND HAR Channel Hole Tilting & Contact Resistance OCAP",
    "triggerZh": "高深寬比 (HAR) 通道孔底部對位偏移 > 3nm，或字元線階梯接觸阻抗劇增 > 30%。",
    "triggerEn": "HAR channel hole bottom misaligns > 3nm or staircase word-line contact resistance surges > 30%.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "高深寬比 (HAR) 通道孔底部對位偏移 > 3nm，或字元線階梯接觸阻抗劇增 > 30%。",
        "textEn": "HAR channel hole bottom misaligns > 3nm or staircase word-line contact resistance surges > 30%."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch14": {
    "id": "ch14",
    "titleZh": "製程微縮金屬線熱載子與電遷移失效 OCAP",
    "titleEn": "Scaling Electromigration & Hot Carrier Degradation OCAP",
    "triggerZh": "高溫加速電遷移壽命測試（EM-ALT）導線阻抗增加 10% 之時間低於 1000 小時規格線。",
    "triggerEn": "EM-ALT indicates 10% resistance increase occurs prematurely under 1000-hr spec limit.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "高溫加速電遷移壽命測試（EM-ALT）導線阻抗增加 10% 之時間低於 1000 小時規格線。",
        "textEn": "EM-ALT indicates 10% resistance increase occurs prematurely under 1000-hr spec limit."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch15": {
    "id": "ch15",
    "titleZh": "計量量測光學基準偏移與對焦重現性 OCAP",
    "titleEn": "Metrology Reference Drift & Optical Focus Reproducibility OCAP",
    "triggerZh": "標準校準晶圓 (Golden Wafer) 重複性量測標準差 3σ 超過儀器規格上限 0.1nm。",
    "triggerEn": "Golden wafer measurement repeatability 3-sigma exceeds tool spec limit of 0.1nm.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "標準校準晶圓 (Golden Wafer) 重複性量測標準差 3σ 超過儀器規格上限 0.1nm。",
        "textEn": "Golden wafer measurement repeatability 3-sigma exceeds tool spec limit of 0.1nm."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch16": {
    "id": "ch16",
    "titleZh": "全晶圓良率空間分佈環狀缺陷群聚 OCAP",
    "titleEn": "Wafer Map Ring & Radial Defect Clustering OCAP",
    "triggerZh": "晶圓圖譜 (Wafer Map) 出現明顯邊緣環狀 (Ring) 缺陷或中心同心圓聚集，良率突降 > 8%。",
    "triggerEn": "Wafer map detects ring pattern defect clustering accompanied by yield drop > 8%.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "晶圓圖譜 (Wafer Map) 出現明顯邊緣環狀 (Ring) 缺陷或中心同心圓聚集，良率突降 > 8%。",
        "textEn": "Wafer map detects ring pattern defect clustering accompanied by yield drop > 8%."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch17": {
    "id": "ch17",
    "titleZh": "統計製程管制 Cpk 降級與判異規則觸發 OCAP",
    "titleEn": "SPC Process Capability Cpk Drop & Nelson Rule Alert OCAP",
    "triggerZh": "管制圖連續 8 點落在中心線同一側（Nelson Rule 2），或製程能力指數 Cpk < 1.33。",
    "triggerEn": "SPC chart triggers Nelson Rule 2 (8 points on one side of center) or Cpk drops below 1.33.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "管制圖連續 8 點落在中心線同一側（Nelson Rule 2），或製程能力指數 Cpk < 1.33。",
        "textEn": "SPC chart triggers Nelson Rule 2 (8 points on one side of center) or Cpk drops below 1.33."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch18": {
    "id": "ch18",
    "titleZh": "異常防堵溯源與重工次數超限 OCAP",
    "titleEn": "Containment Traceability & Max Rework Violation OCAP",
    "triggerZh": "批次重工次數達 2 次上限（Max Rework Limit），或異常批次受影響範圍未明。",
    "triggerEn": "Wafer lot reaches max rework count (2x) or containment trace scope remains indeterminate.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "批次重工次數達 2 次上限（Max Rework Limit），或異常批次受影響範圍未明。",
        "textEn": "Wafer lot reaches max rework count (2x) or containment trace scope remains indeterminate."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch19": {
    "id": "ch19",
    "titleZh": "晶圓針測探針磨損氧化與接觸不良 OCAP",
    "titleEn": "Wafer Sort Probe Pin Wear & High Contact Resistance OCAP",
    "triggerZh": "針測機連續 5 顆晶粒開路 (Open Fail)，探針卡接觸阻抗 Cres 超過 2.0 Ω。",
    "triggerEn": "Prober reports 5 consecutive open fails or probe contact resistance Cres > 2.0 ohms.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "針測機連續 5 顆晶粒開路 (Open Fail)，探針卡接觸阻抗 Cres 超過 2.0 Ω。",
        "textEn": "Prober reports 5 consecutive open fails or probe contact resistance Cres > 2.0 ohms."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch20": {
    "id": "ch20",
    "titleZh": "打線封裝金線拉力不足與焊球脫落 OCAP",
    "titleEn": "Wire Bonding Wire Pull Strength & Ball Lift OCAP",
    "triggerZh": "破壞性拉力測試 (Wire Pull Test) 金線拉斷力 < 4.0 克，或球焊點剝離 (Ball Lift)。",
    "triggerEn": "Destructive wire pull test measures strength < 4.0 grams or ball bond interface lifts.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "破壞性拉力測試 (Wire Pull Test) 金線拉斷力 < 4.0 克，或球焊點剝離 (Ball Lift)。",
        "textEn": "Destructive wire pull test measures strength < 4.0 grams or ball bond interface lifts."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch21": {
    "id": "ch21",
    "titleZh": "3D 矽穿孔 TSV 填孔空洞與微凸塊共面性 OCAP",
    "titleEn": "3D TSV Voiding & Micro-Bump Non-Coplanarity OCAP",
    "triggerZh": "聲學掃描顯微鏡 (C-SAM) 檢出中介層底部微凸塊橋接短路或晶粒底部填充膠空泡 (Underfill Void)。",
    "triggerEn": "Acoustic microscopy detects micro-bump bridging or underfill voiding in 2.5D/3D interposer stack.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "聲學掃描顯微鏡 (C-SAM) 檢出中介層底部微凸塊橋接短路或晶粒底部填充膠空泡 (Underfill Void)。",
        "textEn": "Acoustic microscopy detects micro-bump bridging or underfill voiding in 2.5D/3D interposer stack."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch22": {
    "id": "ch22",
    "titleZh": "封裝氣密檢漏氦洩漏率超標 OCAP",
    "titleEn": "Hermetic Seal Helium Leak Rate Exceeded OCAP",
    "triggerZh": "質譜檢漏儀測出封裝氦氣洩漏率 > 1.0×10⁻⁸ atm·cc/s（MIL-STD-883 標準超標）。",
    "triggerEn": "Mass spec measures helium leak rate > 1.0e-8 atm-cc/s, breaching MIL-STD-883 threshold.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "質譜檢漏儀測出封裝氦氣洩漏率 > 1.0×10⁻⁸ atm·cc/s（MIL-STD-883 標準超標）。",
        "textEn": "Mass spec measures helium leak rate > 1.0e-8 atm-cc/s, breaching MIL-STD-883 threshold."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch23": {
    "id": "ch23",
    "titleZh": "智慧製造 Q-Time 逾時與天車排程壅塞 OCAP",
    "titleEn": "Smart Fab Q-Time Violation & AMHS Grid Congestion OCAP",
    "triggerZh": "晶圓於微影至蝕刻間之暫存時間超過 Q-Time 4 小時上限，MES 自動警報停擺。",
    "triggerEn": "Wafer lot transit between litho and etch exceeds 4-hour Q-time window limit.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "晶圓於微影至蝕刻間之暫存時間超過 Q-Time 4 小時上限，MES 自動警報停擺。",
        "textEn": "Wafer lot transit between litho and etch exceeds 4-hour Q-time window limit."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "ch24": {
    "id": "ch24",
    "titleZh": "處理器 Rowhammer 擾動與暫態 IR Drop OCAP",
    "titleEn": "Rowhammer Disturbance & Transient IR Drop Voltage Dip OCAP",
    "triggerZh": "系統級測試 (SLT) 在極限模式下檢出記憶體位元翻轉 (Bit Flip) 或暫態電源壓降 > 15%。",
    "triggerEn": "System-Level Test detects Rowhammer bit flips or transient IR drop dip > 15% Vdd.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "系統級測試 (SLT) 在極限模式下檢出記憶體位元翻轉 (Bit Flip) 或暫態電源壓降 > 15%。",
        "textEn": "System-Level Test detects Rowhammer bit flips or transient IR drop dip > 15% Vdd."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "app-glossary": {
    "id": "app-glossary",
    "titleZh": "橢圓偏光量測雷射偏振相位差校準 OCAP",
    "titleEn": "Ellipsometer Laser Phase Angle Calibration OCAP",
    "triggerZh": "標準二氧化矽校準片量測相位差 Δ 偏離標準值 > 0.05 度。",
    "triggerEn": "Delta phase angle on SiO2 reference standard drifts > 0.05 degrees.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "標準二氧化矽校準片量測相位差 Δ 偏離標準值 > 0.05 度。",
        "textEn": "Delta phase angle on SiO2 reference standard drifts > 0.05 degrees."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "app-jargon": {
    "id": "app-jargon",
    "titleZh": "無塵室跨班交接與重要黃卡 Hot Lot 脫鏈 OCAP",
    "titleEn": "Shift Handover & Critical Hot Lot Tracking OCAP",
    "triggerZh": "跨班交接未完成電子簽核，或特定 Hot Lot 停留同一工位超過 2 小時未派工。",
    "triggerEn": "Electronic shift handover unsigned or designated Hot Lot idles > 2 hours.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "跨班交接未完成電子簽核，或特定 Hot Lot 停留同一工位超過 2 小時未派工。",
        "textEn": "Electronic shift handover unsigned or designated Hot Lot idles > 2 hours."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  },
  "app-reading": {
    "id": "app-reading",
    "titleZh": "矽晶圓厚度全域變化量 TTV 超標 OCAP",
    "titleEn": "Wafer Total Thickness Variation (TTV) OCAP",
    "triggerZh": "300mm 晶圓全域厚度變化量 TTV > 1.0 µm，平坦度超出先進微影機工件台吸附補償上限。",
    "triggerEn": "Wafer TTV > 1.0 µm, exceeding scanner chuck electrostatic leveling compensation margin.",
    "steps": [
      {
        "step": 1,
        "type": "trigger",
        "textZh": "300mm 晶圓全域厚度變化量 TTV > 1.0 µm，平坦度超出先進微影機工件台吸附補償上限。",
        "textEn": "Wafer TTV > 1.0 µm, exceeding scanner chuck electrostatic leveling compensation margin."
      },
      {
        "step": 2,
        "type": "hold",
        "textZh": "MES 系統立即鎖定該批號",
        "textEn": "Immediate lot hold via MES"
      },
      {
        "step": 3,
        "type": "investigate",
        "textZh": "查核機台日誌與感測器數據",
        "textEn": "Audit tool logs and sensor traces"
      },
      {
        "step": 4,
        "type": "decision",
        "textZh": "評估是否符合重工或降規放行條件？",
        "textEn": "Assess rework vs scrap criteria"
      },
      {
        "step": 5,
        "type": "action",
        "textZh": "處置執行並更新 FDC 防呆閉鎖",
        "textEn": "Execute disposition & update FDC interlocks"
      }
    ],
    "containmentZh": "MES 系統執行批號凍結 (Lot Hold)，隔離受影響晶圓盒。",
    "containmentEn": "Execute MES lot hold and quarantine affected wafer carriers.",
    "rcaZh": "排查關鍵機台參數與前道工藝日誌。",
    "rcaEn": "Audit critical tool parameters and upstream process logs.",
    "dispositionZh": "工程師評估重工可行性，不可逆損傷則報廢。",
    "dispositionEn": "PE evaluates rework feasibility; scrap if unrecoverable.",
    "preventionZh": "更新 FDC 故障偵測管制界限，增設防呆互鎖。",
    "preventionEn": "Update FDC control limits and implement automated interlocks."
  }
};
