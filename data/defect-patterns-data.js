/**
 * data/defect-patterns-data.js
 * 晶圓缺陷圖譜 16 模式互動解碼與 8D 處置指引矩陣 (Interactive Wafer Map Defect Matrix)
 * 50 輪深度工程優化 Stage 10 (Rounds 46–50)
 * 
 * 結構化收錄 16 種半導體晶圓廠經典缺陷圖譜空間分佈、
 * 嫌疑製程機台、物理肇因、SPC 關聯與 8D 防堵處置指引。
 */

export const DEFECT_PATTERNS_DATA = [
  {
    id: 'ring',
    nameZh: '同心圓環狀 (Ring Pattern)',
    nameEn: 'Concentric Ring Pattern',
    categoryZh: '熱場與氣流異常',
    categoryEn: 'Thermal & Gas Flow Anomaly',
    spcRule: 'Nelson Rule 2 (9 points on one side)',
    suspectModulesZh: ['高溫爐管 (Furnace / RTP)', '電漿蝕刻機 (ICP/CCP Etch)', '旋轉塗佈機 (Coater)'],
    suspectModulesEn: ['Furnace / RTP', 'Plasma Etcher (ICP/CCP)', 'Spin Coater'],
    physicalRootCauseZh: '氣相沉積邊界層受阻、RTP 燈管加熱圈放射溫差梯度或旋塗去膠回濺，造成膜厚或摻雜同心圓不均勻。',
    physicalRootCauseEn: 'Gas-phase boundary layer disruption, RTP lamp heating ring temperature gradient, or spin-coating photoresist striation causing concentric non-uniformity.',
    containmentZh: '立即 Hold 同爐管/腔體批次，校驗多區加熱燈管功率配比與氣體分配噴盤 (Showerhead) 均勻度。',
    containmentEn: 'Hold all lots processed in the furnace/chamber; recalibrate multi-zone heating lamp power ratio and showerhead gas distribution uniformity.'
  },
  {
    id: 'donut',
    nameZh: '甜甜圈空心環 (Donut Pattern)',
    nameEn: 'Donut Annular Pattern',
    categoryZh: '電漿阻抗失衡',
    categoryEn: 'Plasma Impedance Mismatch',
    spcRule: 'Nelson Rule 3 (6 consecutive increasing/decreasing)',
    suspectModulesZh: ['高密度電漿 CVD (HDP-CVD)', '反應性離子蝕刻 (RIE)', '磁控濺鍍 (PVD)'],
    suspectModulesEn: ['High-Density Plasma CVD (HDP-CVD)', 'Reactive Ion Etcher (RIE)', 'Magnetron Sputter PVD'],
    physicalRootCauseZh: '電漿鞘層邊緣效應導致電子密度呈甜甜圈分佈，中心與外環離子轟擊能量失衡。',
    physicalRootCauseEn: 'Plasma sheath edge effect leading to annular electron density profile, causing ion bombardment energy imbalance between center and outer ring.',
    containmentZh: '檢測 RF Matchbox 匹配器阻抗反射率，檢查腔體內襯 (Focus Ring) 磨耗程度並更換介電環。',
    containmentEn: 'Inspect RF matchbox impedance reflectivity, check chamber focus ring wear and replace ceramic/silicon edge ring if eroded.'
  },
  {
    id: 'scratch',
    nameZh: '機械刮痕 (Scratch Pattern)',
    nameEn: 'Mechanical Scratch Pattern',
    categoryZh: '機械接觸損傷',
    categoryEn: 'Mechanical Contact Damage',
    spcRule: 'Nelson Rule 1 (1 point > 3 sigma)',
    suspectModulesZh: ['化學機械研磨 (CMP)', '天車手臂夾爪 (AMHS Robot Arm)', '晶圓傳送載台 (Chuck Handler)'],
    suspectModulesEn: ['Chemical Mechanical Planarization (CMP)', 'AMHS Robot End-Effector', 'Wafer Transfer Chuck Handler'],
    physicalRootCauseZh: 'CMP 研磨液 (Slurry) 聚集粗大研磨粒、修整盤鑽石顆粒脫落或機械手臂真空吸盤附著微粒劃傷晶圓。',
    physicalRootCauseEn: 'Agglomerated large abrasive particles in CMP slurry, diamond conditioner grit drop, or particle contamination on robot vacuum end-effector.',
    containmentZh: '緊急停機攔截！隔離當前拋光機台，檢查研磨墊表面與過濾器壓差，全面清洗機械手臂 Chuck 承載盤。',
    containmentEn: 'Emergency tool halt! Quarantine polishing platen, inspect pad surface and slurry filter delta-P, deep-clean robot chucks.'
  },
  {
    id: 'edge_ring',
    nameZh: '邊緣環狀缺陷 (Edge Ring)',
    nameEn: 'Wafer Edge Exclusion Ring',
    categoryZh: '周邊氣流與夾持',
    categoryEn: 'Periphery Flow & Clamping',
    spcRule: 'Nelson Rule 5 (2 out of 3 > 2 sigma)',
    suspectModulesZh: ['光阻邊緣去除 (EBR)', '浸潤式微影 (193i Immersion Hood)', '晶圓邊緣拋光 (Bevel Polish)'],
    suspectModulesEn: ['Edge Bead Removal (EBR)', '193i Immersion Lithography Hood', 'Wafer Bevel Polisher'],
    physicalRootCauseZh: '晶圓斜角 (Bevel) 殘留光阻崩塌、浸潤式微影水膜殘留水痕 (Water Mark) 或靜電吸盤 (ESC) 邊緣電場畸變。',
    physicalRootCauseEn: 'Bevel edge bead resist flaking, immersion litho water puddle residue (water marks), or electrostatic chuck (ESC) edge field distortion.',
    containmentZh: '校驗 EBR 溶劑噴嘴位置與沖洗流量，檢查微影機浸潤式水流抽取噴嘴氣壓，防止水滴拖曳至有效曝光區。',
    containmentEn: 'Calibrate EBR solvent nozzle positioning and rinse flow, verify immersion water suction nozzle pressure to eliminate droplet drag.'
  },
  {
    id: 'center',
    nameZh: '晶圓中心聚集 (Center Spot)',
    nameEn: 'Center Hotspot Cluster',
    categoryZh: '中心熱點與注入',
    categoryEn: 'Center Hotspot & Injection',
    spcRule: 'Nelson Rule 1 (Severe Excursion)',
    suspectModulesZh: ['旋塗機 (Coater / Developer)', '單片清洗機 (Single Wafer Clean)', '垂直離子佈植機'],
    suspectModulesEn: ['Spin Coater / Developer', 'Single Wafer Cleaning Tool', 'Vertical Ion Implanter'],
    physicalRootCauseZh: '旋轉中心流速為零導致藥液殘留、靜態滴膠中心擴散延遲或旋轉轉軸共振引起中心局部缺陷。',
    physicalRootCauseEn: 'Zero rotational velocity at wafer center leading to puddle residue, delayed static dispense spreading, or spindle vibration resonance.',
    containmentZh: '更換動態滴液噴嘴移動軌跡 (Dynamic Dispense Recipe)，檢查主軸轉速馬達編碼器與水平度。',
    containmentEn: 'Reconfigure dynamic dispense trajectory recipe, verify spindle motor encoder accuracy and chuck planarity.'
  },
  {
    id: 'cluster',
    nameZh: '區域密集群聚 (Cluster Pattern)',
    nameEn: 'Localized Cluster Pattern',
    categoryZh: '微粒掉落與飛濺',
    categoryEn: 'Particle Shedding & Splatter',
    spcRule: 'Nelson Rule 1 (Out of Control)',
    suspectModulesZh: ['PVD 濺鍍靶材 (Sputter Target)', '電漿腔體內壁剝落', '化學氣相沉積 (LPCVD)'],
    suspectModulesEn: ['PVD Sputter Target', 'Chamber Wall Flaking', 'Low-Pressure CVD (LPCVD)'],
    physicalRootCauseZh: '靶材毒化微弧放電 (Micro-Arcing) 噴發熔融金屬球，或沉積腔體內壁堆積膜層應力過大剝落砸向晶圓。',
    physicalRootCauseEn: 'Target poisoning micro-arcing ejecting molten metal macro-particles, or accumulated film stress flaking from chamber shielding.',
    containmentZh: '立即開腔保養 (PM)，更換 Shield 防護罩並執行 Clean & Seasoning 養腔放行測試。',
    containmentEn: 'Initiate unscheduled PM, replace chamber shielding kit, and perform chamber seasoning dummy runs prior to release.'
  },
  {
    id: 'repeat_die',
    nameZh: '步進重複晶粒 (Repeat Die / Reticle)',
    nameEn: 'Repeating Reticle Defect',
    categoryZh: '微影光罩缺陷',
    categoryEn: 'Photomask / Reticle Defect',
    spcRule: 'Nelson Rule 8 (Non-random periodic)',
    suspectModulesZh: ['步進曝光機 (Scanner / Stepper)', '光罩傳送載盒 (Reticle Pod)', '光罩護膜 (Pellicle)'],
    suspectModulesEn: ['Exposure Scanner / Stepper', 'Reticle Pod (RSP / EUV Pod)', 'Reticle Pellicle'],
    physicalRootCauseZh: '光罩表面附著微粒 (Haze / Particle) 或光罩石英破損，導致每個曝光場 (Shot) 同一晶粒位置 100% 複製缺陷。',
    physicalRootCauseEn: 'Particle adhesion or quartz defect on reticle surface replicating 100% at identical die coordinates across every exposure field.',
    containmentZh: '極速中斷！立刻退回光罩至檢測機，執行光罩表面雷射掃描與深紫外線 (DUV) 兆聲波光罩清洗。',
    containmentEn: 'Urgent halt! Unload reticle immediately, run reticle defect laser inspection and megasonic DUV mask cleaning.'
  },
  {
    id: 'random',
    nameZh: '全域隨機散布 (Random Particle)',
    nameEn: 'Random Particle Distribution',
    categoryZh: '環境微粒與無塵室',
    categoryEn: 'Cleanroom Ambient Particle',
    spcRule: 'Nelson Rule 4 (14 points alternating up/down)',
    suspectModulesZh: ['無塵室濾網 (FFU / ULPA)', '晶圓傳送載具 (FOUP / Pod)', '管路超純水/化學品雜質'],
    suspectModulesEn: ['Cleanroom ULPA Filters', 'FOUP / Front Opening Pod', 'UPW / Bulk Chemical Piping'],
    physicalRootCauseZh: '無塵室潔淨度劣化、FOUP 內壁摩擦起塵或化學藥液過濾器破裂釋放懸浮微粒。',
    physicalRootCauseEn: 'Cleanroom class degradation, FOUP interior slot wear particles, or chemical filter membrane rupture release.',
    containmentZh: '執行 ISO 14644-1 空間微粒計數掃描，全數批次更換至已通過潔淨清洗的合格 FOUP，抽檢化學品微粒數。',
    containmentEn: 'Run ISO 14644-1 airborne particle count survey, transfer wafers to certified clean FOUPs, sample chemical line particles.'
  },
  {
    id: 'radial',
    nameZh: '放射狀放射紋 (Radial / Spoke)',
    nameEn: 'Radial Streak / Spoke Pattern',
    categoryZh: '高速旋轉流體異常',
    categoryEn: 'High-Speed Fluid Dynamics',
    spcRule: 'Nelson Rule 6 (4 of 5 > 1 sigma)',
    suspectModulesZh: ['光阻塗佈機 (Coater)', '晶圓甩乾機 (Spin Dryer)', '濕式旋轉清洗 (SST)'],
    suspectModulesEn: ['Spin Coater', 'Spin Rinser Dryer (SRD)', 'Single-Wafer Spin Clean'],
    physicalRootCauseZh: '高速旋轉時排氣風道亂流、溶劑揮發不均或晶圓吸盤頂針高度偏差造成流動阻抗。',
    physicalRootCauseEn: 'Exhaust turbulence during high-speed spin, non-uniform solvent flash-off, or wafer chuck pin height deviation.',
    containmentZh: '量測塗佈杯內負壓排氣風速 (Exhaust Flow Vel)，檢查溶劑預潤濕 (RRC) 噴霧覆蓋完整度。',
    containmentEn: 'Verify spin cup exhaust airflow face velocity, inspect reduced resist coating (RRC) pre-wetting mist coverage.'
  },
  {
    id: 'slip_line',
    nameZh: '晶格滑移線 (Slip Lines)',
    nameEn: 'Crystallographic Slip Lines',
    categoryZh: '高溫熱應力裂解',
    categoryEn: 'High-Temperature Thermal Stress',
    spcRule: 'Nelson Rule 1 (Catastrophic Stress)',
    suspectModulesZh: ['磊晶反應爐 (Epi Reactor)', '快速熱退火 (RTA / Flash FLA)', '高溫氧化爐 (Oxidation)'],
    suspectModulesEn: ['Epitaxy Reactor', 'Rapid Thermal Annealing (RTA / FLA)', 'High-Temp Oxidation Furnace'],
    physicalRootCauseZh: '高溫製程 (>1000°C) 升降溫速率過快引發晶圓徑向巨大熱應力，超過矽單晶剪應力極限沿 (111) 晶面滑移。',
    physicalRootCauseEn: 'Excessive ramp-up/down rates (>1000°C) inducing thermal stress exceeding silicon critical resolved shear stress along (111) planes.',
    containmentZh: '調降升降溫速率斜率 (Ramp Rate Slope)，增加高溫保溫過渡台階，檢測晶圓支撐石英爪平坦度。',
    containmentEn: 'Lower thermal ramp-up/down slopes, introduce soak plateau stabilization steps, inspect quartz boat contact support.'
  },
  {
    id: 'haze',
    nameZh: '晶圓微霧靄 (Haze / Fogging)',
    nameEn: 'Surface Micro-Haze / Fogging',
    categoryZh: '表面化學吸附與氧化',
    categoryEn: 'Chemical Adsorption & Oxidation',
    spcRule: 'Nelson Rule 7 (15 points within 1 sigma)',
    suspectModulesZh: ['清洗機 (RCA Clean)', '晶圓儲存區 (FOUP Storage / N2 Stocker)', '黃光微影化學品區'],
    suspectModulesEn: ['Wet Bench (RCA Clean)', 'N2 Purge Wafer Stocker', 'Photolithography Track'],
    physicalRootCauseZh: '大氣環境微量揮發性有機物 (VOC) 或氨氣 (NH3) 與氟化物反應生成硫酸銨結晶微霧，造成光阻中毒與霧化。',
    physicalRootCauseEn: 'Airborne molecular contamination (AMC, NH3/VOCs) reacting to form ammonium sulfate crystalline haze, causing resist T-topping.',
    containmentZh: '全面檢查化學濾網 (Chemical Filter) 破耗狀態，啟用 FOUP 充氮除濕 (N2 Purge) 系統以阻絕氧氣與濕度。',
    containmentEn: 'Audit chemical filter breakthrough status, activate continuous N2 purging in FOUPs/stockers to suppress ambient humidity.'
  },
  {
    id: 'edge_exclusion',
    nameZh: '邊緣崩缺掉落 (Edge Flaking)',
    nameEn: 'Edge Delamination & Flaking',
    categoryZh: '膜層應力與邊緣剝落',
    categoryEn: 'Film Stress & Peeling',
    spcRule: 'Nelson Rule 2 (Process Drift)',
    suspectModulesZh: ['化學氣相沉積 (CVD / ALD)', '電鍍銅 (ECD)', '背面研磨 (Backgrinding)'],
    suspectModulesEn: ['CVD / ALD Thin Film', 'Electroplating Copper (ECD)', 'Backgrinding / Wafer Thinning'],
    physicalRootCauseZh: '厚膜層累積過大張應力或壓應力，在晶圓未去除邊緣處與基底結合力不足產生脆裂脫層與碎屑掉落。',
    physicalRootCauseEn: 'Accumulated tensile/compressive stress in thick films causing adhesion failure and particulate flaking at non-excluded edges.',
    containmentZh: '擴大邊緣裁切寬度 (Edge Exclusion Zone 2mm -> 3mm)，優化退火消除膜層熱膨脹係數 (CTE) 應力。',
    containmentEn: 'Expand edge exclusion margin (2mm -> 3mm), optimize post-deposition anneal to relieve coefficient of thermal expansion stress.'
  },
  {
    id: 'streak',
    nameZh: '氣流拋光紋 (Streak / Flow Mark)',
    nameEn: 'Gas Flow Streak / Polish Mark',
    categoryZh: '氣體動力流向紊亂',
    categoryEn: 'Fluidic Jetting & Slurry Stream',
    spcRule: 'Nelson Rule 3 (Trend Excursion)',
    suspectModulesZh: ['化學機械研磨 (CMP)', '噴霧顯影機 (Puddle Developer)', '原子層蝕刻 (ALE)'],
    suspectModulesEn: ['CMP Tool', 'Spray/Puddle Developer Track', 'Atomic Layer Etch (ALE)'],
    physicalRootCauseZh: '研磨液滴灑手臂噴嘴堵塞導致供液偏向、顯影液流速衝擊不均或電漿進氣噴嘴偏斜造成條狀流痕。',
    physicalRootCauseEn: 'Slurry dispensing nozzle partial clog causing biased stream, developer fluid velocity jet impact, or tilted gas injector streaks.',
    containmentZh: '疏通噴嘴管路並以超音波清洗，檢查研磨液流速流量計 (Flow Meter) 與搖臂擺動週期 (Oscillation Speed)。',
    containmentEn: 'Ultrasonically purge dispense nozzles, verify slurry flow meter calibration and arm sweep oscillation profiles.'
  },
  {
    id: 'grid_shot',
    nameZh: '曝光場邊界網格 (Grid Shot)',
    nameEn: 'Grid Shot Boundary Anomaly',
    categoryZh: '步進曝光拼接異常',
    categoryEn: 'Exposure Stepping & Stitching',
    spcRule: 'Nelson Rule 8 (Spatial Periodicity)',
    suspectModulesZh: ['EUV / DUV 步進曝光機 (Scanner)', '雷射干涉對準系統 (Laser Stage)', '自動量測 (CD-SEM)'],
    suspectModulesEn: ['EUV / DUV Step-and-Scan Tool', 'Laser Interferometer Stage', 'Metrology (CD-SEM)'],
    physicalRootCauseZh: '掃描機雙工載台 (TwinScan Stage) 干涉儀鏡面熱漂移、鏡像場邊界縫合失真或步進馬達微步失步。',
    physicalRootCauseEn: 'Interferometer mirror thermal drift on twin wafer stages, reticle stitching field distortion, or micro-stepping motor tracking error.',
    containmentZh: '暫停機台進行基座雷射校正 (Stage Grid Baseline Calibration) 與晶圓夾盤平整度全圖掃描。',
    containmentEn: 'Halt scanner to run stage grid baseline calibration and full chuck surface flatness topology mapping.'
  },
  {
    id: 'hotspot',
    nameZh: '微影 OPC 光學熱點 (OPC Hotspot)',
    nameEn: 'Optical Proximity Hotspot',
    categoryZh: '奈米圖案幾何弱點',
    categoryEn: 'Layout Topology & OPC Pinching',
    spcRule: 'Nelson Rule 1 (Localized Pinch/Bridge)',
    suspectModulesZh: ['先進微影光學修正 (OPC)', '電子束檢測 (E-Beam Inspection)', '極紫外光 (EUV)'],
    suspectModulesEn: ['Computational Lithography / OPC', 'E-Beam Voltage Contrast (EBI)', 'High-NA EUV'],
    physicalRootCauseZh: '金屬線狹窄間距處繞射光干涉增強或光子散粒雜訊 (Shot Noise) 造成微斷線 (Pinching) 或微橋接 (Bridging)。',
    physicalRootCauseEn: 'Constructive diffraction interference or EUV photon shot noise causing stochastic nano-pinching or bridging at critical line ends.',
    containmentZh: '回饋至 EDA 計算微影團隊微調 SRAF (次解析度輔助圖案) 模型，提高局部照明劑量 (Dose Margin)。',
    containmentEn: 'Feedback coordinates to EDA computational lithography team to re-optimize SRAF shapes and boost local dose margin.'
  },
  {
    id: 'checkerboard',
    nameZh: '棋盤週期異常 (Checkerboard)',
    nameEn: 'Checkerboard Periodic Excursion',
    categoryZh: '多重曝光與自對準',
    categoryEn: 'Multi-Patterning (SADP / SAQP)',
    spcRule: 'Nelson Rule 8 (Multi-Patterning Split)',
    suspectModulesZh: ['間隔層沉積 (Spacer CVD)', '間隔層非等向蝕刻 (Spacer RIE)', '雙重曝光 (LELE)'],
    suspectModulesEn: ['Spacer Atomic Layer Deposition', 'Spacer Reactive Ion Etch', 'Double Patterning (LELE/SADP)'],
    physicalRootCauseZh: '自對準四重曝光 (SAQP) 中，Mandrel 與 Non-Mandrel 間隔厚度差異導致線寬呈「奇數線寬、偶數線窄」交替棋盤狀。',
    physicalRootCauseEn: 'In self-aligned quadruple patterning (SAQP), mandrel vs spacer thickness mismatch creating alternating pitch walking (checkerboard CD bimodality).',
    containmentZh: '精確調控間隔層 ALD 沉積循環次數以修正 Pitch Walking，校驗蝕刻終點偵測 (OES) 避免過蝕刻。',
    containmentEn: 'Fine-tune ALD spacer deposition cycle count to eliminate pitch walking; recalibrate OES endpoint detection to prevent over-etch.'
  }
];

/**
 * 依 ID 檢索缺陷圖譜資料
 * @param {string} id
 * @returns {typeof DEFECT_PATTERNS_DATA[0] | undefined}
 */
export function getDefectPattern(id) {
  return DEFECT_PATTERNS_DATA.find(p => p.id === id);
}
