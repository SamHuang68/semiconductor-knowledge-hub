/**
 * 工程物件.js
 * Semiconductor Knowledge Hub — 製程工程物件與微觀機制模型控制器
 * 
 * 包含四大製程核心之高質感幾何向量與微觀物理模型：
 * 1. Ch 04 微影 (Lithography)：曝光機光路透鏡縮放、Rayleigh 物理公式與光阻化學反應模型
 * 2. Ch 05 薄膜沉積 (Thin Films)：PVD 濺鍍 vs CVD 熱反應 vs ALD 原子層自限循環模型
 * 3. Ch 06 蝕刻 (Etch)：ICP 雙頻解耦電漿腔體與非等向性溝槽輪廓模型
 * 4. Ch 12 電晶體演進 (Transistor Evolution)：2D Planar -> 3D FinFET -> 3D GAA Nanosheet 立體等角模型
 * 
 * 特色：
 * - 零外部相依、零中系庫、100% 原生 SVG/DOM/CSS 動畫
 * - 中英雙語無縫支援
 * - 具備即時互動、狀態切換與微觀參數模擬
 * - 遵守 WCAG AA 無障礙標準與我不留名規範
 */

const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// 雙語字典
const TEXTS = {
  zh: {
    badge_prefix: '製程工程物件 · PROCESS OBJECT',
    live_sim: '互動幾何模型 · LIVE SIMULATION',
    btn_next_step: '單步前進 →',
    btn_auto_play: '自動循環 ▶',
    btn_pause: '暫停 ⏸',
    btn_reset: '重設計數 ↺',
    legend_title: '材料與光路標記：',

    // Ch 04 微影
    ch04_title: '曝光機光學縮放光路與光阻微觀反應模型',
    ch04_sub: '探索 ASML 雙載台曝光機 4:1 投影物鏡縮小、Rayleigh 解析度極限公式與光阻光化學反應機制',
    ch04_tab_path: '光學縮放光路 (4:1 Reduction)',
    ch04_tab_pr: '光阻光化學機制 (PR Chemistry)',
    ch04_tab_scan: '步進掃描對準 (Step-and-Scan)',
    ch04_mode_dry: 'DUV 乾式 (193nm Dry)',
    ch04_mode_imm: 'DUV 浸潤式 (ArFi 193nm / 水 n=1.44)',
    ch04_mode_euv: 'EUV 微影 (13.5nm / 0.33 NA)',
    ch04_mode_high_na: 'High-NA EUV (13.5nm / 0.55 NA)',
    ch04_laser_source: '準分子雷射光源',
    ch04_illuminator: '照明光瞳 (Quasar / Annular)',
    ch04_reticle: '光罩載台 (Reticle 4x 圖案)',
    ch04_proj_lens: '投影物鏡組 (4:1 縮小聚焦)',
    ch04_imm_water: '超純水浸潤層 (UPW, n=1.44)',
    ch04_wafer_stage: '晶圓載台與光阻層 (1x 晶圓圖案)',
    ch04_metric_res: 'Rayleigh 解析度極限 R',
    ch04_metric_dof: '焦深範圍 DOF',
    ch04_metric_na: '數值孔徑 NA',
    ch04_metric_scale: '物像縮小比',
    ch04_formula_note: '公式依據 Rayleigh 準則：R = k₁·(λ/NA)，DOF = k₂·(λ/NA²)。浸潤式藉由水折射率 (n=1.44) 將 NA 突破 1.0 極限至 1.35；EUV 則利用極短波長 (13.5nm) 與反射光學在超高真空中曝光。',
    ch04_pr_pos: '正光阻 (Positive Tone: 光照區可溶)',
    ch04_pr_neg: '負光阻 (Negative Tone: 光照區交聯硬化)',
    ch04_pr_car: 'EUV 化學增幅光阻 (CAR / PAG 酸催化)',

    // Ch 05 薄膜
    ch05_title: '薄膜沉積機制對比與 ALD 原子層自限循環模型',
    ch05_sub: '微觀對比 PVD 物理濺鍍、CVD 熱化學氣相沉積及 ALD 原子層四步自限循環在高深寬比深孔中的階梯覆蓋率',
    ch05_tab_pvd: 'PVD 物理濺鍍 (Sputtering)',
    ch05_tab_cvd: 'CVD 化學氣相沉積 (Chemical Vapor)',
    ch05_tab_ald: 'ALD 四步自限循環 (Atomic Layer)',
    ch05_step_1: '步驟 1: 前驅物 A 脈衝吸附 (Pulse A)',
    ch05_step_2: '步驟 2: 惰性氣體吹掃 (Purge A)',
    ch05_step_3: '步驟 3: 前驅物 B 反應物脈衝 (Pulse B)',
    ch05_step_4: '步驟 4: 惰性氣體吹掃副產物 (Purge B)',
    ch05_ald_cycle_count: '已完成循環數：',
    ch05_ald_thickness: '累計薄膜厚度：',
    ch05_ald_conformality: '階梯覆蓋率 (Conformality)：',
    ch05_metric_rate: '沉積速率',
    ch05_metric_coverage: '階梯覆蓋率',
    ch05_metric_temp: '典型加工溫度',
    ch05_metric_uniformity: '原子層級厚度控制',
    ch05_pvd_desc: 'PVD 濺鍍為視線傳播 (Line-of-Sight)，金屬原子被撞擊後筆直飛行，容易在深孔入口形成「懸垂 (Overhang)」阻擋後續填入，孔底嚴重不足，容易形成空洞 (Void)。',
    ch05_cvd_desc: 'CVD 利用前驅氣體擴散與表面熱化學反應，階梯覆蓋率達 65%-85%，沉積速率高，但在超高深寬比 (>15:1) 結構中頂部仍比底部厚。',
    ch05_ald_desc: 'ALD 透過自限性表面化學反應 (Self-Limiting Surface Reaction)，每次循環僅精確沉積 1 個原子單分子層 (~0.1nm/cycle)，實現 100% 完美階梯覆蓋與零空洞！',

    // Ch 06 蝕刻
    ch06_title: '電漿蝕刻反應腔體結構與非等向性溝槽輪廓模型',
    ch06_sub: '解析感應耦合電漿 (ICP) 雙頻電源解耦控制、垂直離子轟擊與側壁鈍化保護膜之協同作用',
    ch06_tab_chamber: '電漿腔體系統 (ICP/CCP Chamber)',
    ch06_tab_profile: '非等向性蝕刻微觀機制 (Anisotropic Etch)',
    ch06_tab_anomalies: '微負載效應與異常 (Etch Anomalies & RIE Lag)',
    ch06_rf_source_label: 'RF Source Power (控制電漿離子密度 / Flux):',
    ch06_rf_bias_label: 'RF Bias Power (控制自偏壓與離子轟擊能量 / Energy):',
    ch06_showerhead: '氣體噴淋頭 (Showerhead Gas Inlet: CF₄, Cl₂, HBr, Ar)',
    ch06_source_coil: 'ICP 高頻感應線圈 (13.56 MHz: 激發高密度電漿)',
    ch06_plasma_glow: '高密度發光電漿區 (離子 + 自由基)',
    ch06_sheath: '電漿鞘層 (暗區電場加速區)',
    ch06_esc: '靜電吸盤 (ESC) + 背面氦氣冷卻 (Backside He Cooling)',
    ch06_bias_gen: '低頻 RF 偏壓電源 (2 MHz: 產生負向自偏壓 -Vdc)',
    ch06_profile_ideal: '理想垂直非等向性輪廓 (90°)',
    ch06_profile_undercut: '側壁掏空底切 (Undercutting: 鈍化不足)',
    ch06_profile_bowing: '側壁鼓出凹陷 (Bowing: 離子散射)',
    ch06_profile_lag: 'RIE 延遲 / 微負載效應 (窄孔蝕刻速度慢)',
    ch06_etch_footer: 'ICP 的關鍵突破在於將電漿密度 (Source) 與離子轟擊動能 (Bias) 徹底解耦：上部線圈產生大量反應離子，下部電極垂直加速轟擊，搭配側壁鈍化層保護，精準刻劃奈米深槽。',

    // Ch 12 電晶體演進
    ch12_title: '電晶體立體架構演進等角模型 (Planar → FinFET → GAA Nanosheet)',
    ch12_sub: '探索從 2D 平面 MOSFET 突破短通道效應瓶頸，邁向 3D FinFET 三面包覆與 2nm GAA 全環繞奈米片的立體幾何演進',
    ch12_tab_planar: '2D 平面電晶體 (Planar MOSFET, 28nm ~ 20nm)',
    ch12_tab_finfet: '3D 鰭式電晶體 (3D FinFET, 16nm ~ 3nm)',
    ch12_tab_gaa: '3D 環繞式閘極奈米片 (GAA Nanosheet, 2nm ~ A16)',
    ch12_gate_wrap: '閘極靜電包覆面數',
    ch12_ss_metric: '次臨界擺幅 (Subthreshold Swing SS)',
    ch12_drive_curr: '通道驅動電流能力 (Ion)',
    ch12_node_span: '主流應用製程節點',
    ch12_planar_desc: 'Planar MOSFET 閘極僅覆蓋二維通道頂部 (單面控制)。通道微縮至 20nm 時，汲極電場穿透引發嚴重 DIBL (汲極引致能障降低) 與次臨界漏電，物理微縮面臨極限。',
    ch12_finfet_desc: 'FinFET 將矽通道立體「豎起」成鰭片，金屬閘極三面包覆 (Tri-Gate)，等效通道寬度 Weff = 2·Hfin + Wfin 大幅增加，通道靜電控制力倍增，漏電降低 10 倍以上。',
    ch12_gaa_desc: 'GAA Nanosheet 將垂直鰭片改為 3-4 層水平超薄矽奈米片，閘極 360° 全方位環繞穿插四周，次臨界擺幅逼近理論極限 (63 mV/dec)，搭配背面供電網路 (BSPDN) 釋放正面互連瓶頸！',

    // Ch 07 離子佈植與退火
    ch07_title: '離子佈植機電磁光路偏轉與晶格退火活化模型',
    ch07_sub: '探索 90° 分析磁鐵質量分離、高能光束線加速、微觀晶格非晶化損傷與高溫快速退火 (RTA) 活化機制',
    ch07_tab_beamline: '離子光路與磁場偏轉 (Beamline)',
    ch07_tab_anneal: '晶格損傷與退火活化 (Lattice Damage & RTA)',
    ch07_tab_channeling: '通道效應與 7° 傾角 (Channeling & 7° Tilt)',
    ch07_ion_source: '離子源產生室 (BF₃ / PH₃ / AsH₃ 電漿)',
    ch07_magnet: '90° 質量分析磁鐵 (Mass Analyzer Magnet)',
    ch07_slit: '質量分析狹縫 (Mass Resolving Slit)',
    ch07_accel: '後級高壓加速管 (100-500 keV)',
    ch07_scanner: '靜電 X-Y 偏轉掃描極板',
    ch07_endstation: '真空終端晶圓盤 (Wafer Endstation)',
    ch07_species_b: '硼離子 B⁺ (m/z=11, 質輕 R小)',
    ch07_species_p: '磷離子 P⁺ (m/z=31)',
    ch07_species_as: '砷離子 As⁺ (m/z=75, 質重 R大)',
    ch07_dose_label: '離子劑量 (Dose Φ)',
    ch07_range_label: '投影平均射程 (Projected Range Rp)',
    ch07_energy_label: '加速能量 (Beam Energy)',
    ch07_beamline_desc: '利用磁場勞侖茲力 F = q(v × B)，不同質量電荷比 (m/z) 的離子在均勻磁場中偏轉半徑 r = mv / (qB) 不同。透過精確狹縫濾除雜質，僅讓目標摻質（如純 ¹¹B⁺）進入加速管射入晶圓。',
    ch07_anneal_desc: '高速離子注入將原本整齊的單晶矽晶格撞擊成混亂非晶層 (Amorphized Layer)，此時摻質未進入格位且無電性。透過快速熱退火 (RTA ~1050°C 數秒) 提供熱能，觸發固相磊晶再結晶，摻質取代矽原子格位達成 95% 以上電性活化！',
    ch07_channeling_desc: '當離子束沿著晶軸（如 <110>）直射時，將穿過原子間隙長驅直入（通道效應），產生無法控制的過深尾端。工廠標準做法是將晶圓傾斜 7° (Tilt) 並偏轉 27° (Twist)，打亂對齊確保淺接面輪廓受控。',

    // Ch 08 CMP 化學機械研磨
    ch08_title: '化學機械研磨 (CMP) 運動學與全域平坦化微觀機制模型',
    ch08_sub: '解析多區壓力研磨頭、Preston 方程材料移除率、化學水解腐蝕與奈米磨粒微磨削之協同作用',
    ch08_tab_kinematics: 'CMP 機台運動學 (Carrier Head & Pad)',
    ch08_tab_micro: '化學+機械協同平坦化 (Chemical + Mechanical)',
    ch08_tab_defects: '研磨缺陷與假圖形 (Dishing & Dummy Fill)',
    ch08_pad_label: '旋轉研磨墊 (Polyurethane Pad ~100 RPM)',
    ch08_head_label: '晶圓研磨頭 (Multi-Zone Carrier Head)',
    ch08_slurry_arm: '研磨液滴注臂 (SiO₂/CeO₂ Slurry + H₂O₂)',
    ch08_conditioner: '鑽石修整盤 (Diamond Conditioner Disk)',
    ch08_mrr_label: '材料移除率 (MRR)',
    ch08_preston_note: '依據 Preston 方程：MRR = Kp · P · V。多區氣囊精確調控晶圓中心至邊緣之接觸壓力 P，研磨墊與研磨頭同向等速旋轉維持相對速度 V 恆定，實現晶圓級全域平坦化。',
    ch08_micro_desc: '化學氧化劑（如雙氧水）在金屬表面反應生成一層數奈米厚的疏鬆水合氧化薄膜（化學軟化）；突出高點承受磨粒強烈摩擦被刮除，低窪處則受鈍化膜保護免於腐蝕，實現「只磨高處、不磨低處」的平坦化。',
    ch08_defects_desc: '大寬度銅導線因彈性研磨墊下陷易產生「碟化 (Dishing)」；密集導線區易產生「介電層侵蝕 (Erosion)」。透過在空曠區填入「假圖形 (Dummy Metal Fill)」平衡圖形密度在 30%-50%，是現代晶圓廠必備之微影平坦化對策。',

    // Ch 10 金屬化與雙載子鑲嵌
    ch10_title: '銅導線雙載子鑲嵌 (Dual Damascene) 與電遷移 (EM) 微觀模型',
    ch10_sub: '探索 10+ 層金屬互連線雙鑲嵌自底向上電鍍超填 (Superfilling)、Low-k 介電層與電子風推擠效應',
    ch10_tab_damascene: '雙載子鑲嵌流程 (Dual Damascene Flow)',
    ch10_tab_superfill: '電鍍銅由底向上超填 (ECD Superfill)',
    ch10_tab_em: '電遷移可靠度機制 (Electromigration EM)',
    ch10_step_dama_1: '1. 沉積 Low-k 介電層 (SiCOH, k~2.5)',
    ch10_step_dama_2: '2. 微影蝕刻通孔 (Via) 與溝槽 (Trench)',
    ch10_step_dama_3: '3. 沉積 Ta/TaN 擴散阻擋層 (1.5nm)',
    ch10_step_dama_4: '4. PVD 沉積薄銅晶種層 (Cu Seed)',
    ch10_step_dama_5: '5. 電鍍銅自底向上超填 (ECD Superfilling)',
    ch10_step_dama_6: '6. 銅 CMP 磨平並覆蓋介電帽層 (SiCN Cap)',
    ch10_damascene_desc: '銅無法像鋁一樣進行乾式電漿蝕刻（無室溫揮發性副產物），因此採用「先挖凹槽、再填銅、最後磨平」的大馬士革製程 (Damascene)；雙載子鑲嵌更將導通孔與上方溝槽一次填銅，大幅降低接觸阻抗。',
    ch10_superfill_desc: '電鍍液中添加「抑制劑 (Suppressor)」在大孔口抑制沉積，而「加速劑 (Accelerator)」在孔底微小曲率處大量累積，使銅由孔底噴泉式向上生長，杜絕深孔中途閉合形成縫隙 (Seam) 或空洞 (Void)！',
    ch10_em_desc: '在電流密度 > 10⁶ A/cm² 下，高速電子流對銅原子產生衝撞力（電子風 Electron Wind）。銅原子沿晶界遷移，上游形成孔洞 (Void) 引發斷路，下游堆積成凸起 (Hillock) 刺穿相鄰線路引發短路。',

    // Ch 21 先進封裝
    ch21_title: '2.5D CoWoS 矽中介層與 3D SoIC 混合鍵合立體架構模型',
    ch21_sub: '探索台積電 2.5D CoWoS 矽中介層 (TSV)、HBM 堆疊微凸塊、與次世代 3D SoIC <1µm 無凸塊銅對銅混合鍵合',
    ch21_tab_cowos: '2.5D CoWoS 矽中介層架構 (CoWoS-S)',
    ch21_tab_soic: '3D SoIC 無凸塊混合鍵合 (Cu-Cu Hybrid)',
    ch21_tab_density: '各世代互連密度對比 (Density & Pitch)',
    ch21_cowos_desc: '2.5D CoWoS (Chip-on-Wafer-on-Substrate) 透過大面積矽中介層 (Silicon Interposer) 內部超密高頻微導線與垂直矽穿孔 (TSV)，將 SoC 算力晶片與 4~8 顆 HBM 高頻寬記憶體緊密並排互連，頻寬突破數個 TB/s！',
    ch21_soic_desc: '3D SoIC 徹底拋棄傳統焊錫微凸塊，透過奈米級平坦化表面，在常溫下以介電層分子鍵合 (SiO₂-SiO₂)，再經熱退火使銅金屬原子跨介面互相擴散 (Cu-Cu)，接點間距 < 1µm，互連密度較傳統提升 1500 倍！',
    ch21_density_desc: '封裝互連演進：傳統打線/BGA (間距 1000µm) → 覆晶 C4 (間距 150µm) → 2.5D 微凸塊 (間距 35µm) → 3D SoIC 混合鍵合 (間距 0.9µm)，晶片間通訊能耗降低 90%，延遲逼近單一晶粒。',

    // Ch 03 沙子到晶圓
    ch03_title: '柴氏長晶爐 (CZ) 提拉單晶矽與晶圓切割拋光幾何模型',
    ch03_sub: '探索 1425°C 石英坩堝雙向旋轉熔體對流、<100> 籽晶縮頸提拉、金剛石線鋸超薄切片與雙面拋光原子級平坦化',
    ch03_tab_cz: 'CZ 柴氏長晶爐 (Crystal Puller)',
    ch03_tab_saw: '金剛石線鋸切片 (Wire Sawing)',
    ch03_tab_polish: '邊緣倒角與雙面拋光 (Bevel & DSP)',
    ch03_crucible: '高純度石英坩堝 (Quartz Crucible @ 1425°C)',
    ch03_seed: '單晶籽晶 (<100> Seed Crystal)',
    ch03_ingot: '300mm 單晶矽晶棒 (Silicon Ingot)',
    ch03_melt: '液態矽熔體 (Silicon Melt)',
    ch03_heater: '石墨加熱器 (Graphite Heater)',
    ch03_mcz: '超導磁場線圈 (MCZ: 抑制熔體對流與氧缺陷)',
    ch03_metric_purity: '晶棒純度 (Purity)',
    ch03_metric_pull: '提拉速率 (Pull Rate)',
    ch03_metric_thick: '300mm 晶圓標準厚度',
    ch03_metric_roughness: '表面原子級粗糙度 RMS',
    ch03_cz_desc: '柴氏長晶法 (Czochralski Method) 先將電子級多晶矽於 1425°C 熔化，浸入 <100> 籽晶後以反向旋轉提拉。初期高速提拉形成細頸 (Dash Necking) 徹底排除晶格差排，再降低速率放肩、等徑拉出直徑 300mm、重達數百公斤的完美無差排單晶矽棒。',
    ch03_saw_desc: '利用數百條金剛石微粒電鍍鋼線以 30~50 m/s 高速往復運動，將單晶棒一次切割成上百片晶圓。切縫損耗 (Kerf Loss) 控制在 ~100 µm，並精確調控張力以壓低晶圓翹曲 (Warp/Bow)。',
    ch03_polish_desc: '晶圓邊緣經過 CNC 鑽石砂輪研磨出精確圓弧倒角 (Bevel Edge)，防止後續碎裂與光阻積聚；接著透過行星齒輪帶動上下研磨盤進行雙面研磨 (Double-Side Lapping) 與化學機械雙面拋光 (DSP)，將表面微觀起伏降至原子級 (<0.1nm RMS)！',

    // Ch 09 清洗與微污染
    ch09_title: 'RCA 濕式清洗化學反應、兆聲波音流與 Marangoni 乾燥模型',
    ch09_sub: '微觀解析 SC-1 表面蝕刻與 Zeta 電位排斥、SC-2 金屬錯離子清除、1MHz 兆聲波邊界層空化微流與表面張力梯度無水痕乾燥',
    ch09_tab_rca: '經典 RCA 雙步驟清洗 (SC-1 / DHF / SC-2)',
    ch09_tab_megasonic: '兆聲波音流除微粒 (Megasonic Streaming)',
    ch09_tab_marangoni: 'Marangoni 表面張力差乾燥 (Marangoni Drying)',
    ch09_metric_pre: '微粒去除率 (PRE > 20nm)',
    ch09_metric_metal: '表面金屬離子殘留',
    ch09_metric_boundary: '聲學邊界層厚度 δ',
    ch09_metric_watermark: '乾燥晶圓水痕殘留',
    ch09_rca_desc: 'SC-1 (NH₄OH/H₂O₂/H₂O @ 70°C) 微蝕刻矽表面氧化層，使顆粒與晶圓表面同時帶強烈負 Zeta 電位，產生強大靜電排斥力防止微粒回附；DHF 咬除化學氧化層；SC-2 (HCl/H₂O₂/H₂O @ 70°C) 則將 Fe、Cu 等重金屬離子轉化為可溶性氯錯離子，徹底溶解重金屬污染。',
    ch09_megasonic_desc: '傳統流體邊界層 (Boundary Layer) 會保護微米與奈米級微粒免於沖刷。兆聲波 (Megasonic ~1MHz) 在液體中引發聲波微流 (Acoustic Microstreaming) 與受控空化，將水動力邊界層厚度劇烈壓縮至 0.5µm 以下，產生極高表面剪切應力將 10nm 顆粒硬生生扯離表面！',
    ch09_marangoni_desc: '晶圓由超純水 (UPW) 慢速拉出時注入異丙醇 (IPA) 蒸氣。IPA 溶於頂部彎月面降低液膜表面張力，形成由低表面張力區指向高表面張力區 (Marangoni 效應) 的強大向下毛細拉力，將水膜順暢拉回主液體槽中，達成瞬間乾燥且完全杜絕蒸發水痕 (Water Marks)！',

    // Ch 11 CMOS 完整整合流程
    ch11_title: 'CMOS 積體電路完整整合剖面與步進製造流程模型 (FEOL → MOL → BEOL)',
    ch11_sub: '透過全動態微觀剖面展示 NMOS 與 PMOS 對稱結構：淺溝槽隔離 (STI)、雙井離子佈植、High-k 金屬閘極、源汲極磊晶應變、矽化物接點與後段多層銅導線',
    ch11_tab_feol: '前段製程 (FEOL: 做出電晶體本體)',
    ch11_tab_mol: '中段製程 (MOL: 接觸孔與接腳引出)',
    ch11_tab_beol: '後段製程 (BEOL: 10+ 層金屬互連線)',
    ch11_step_1: '步驟 1: 淺溝槽隔離 (STI) 隔離元件活性區',
    ch11_step_2: '步驟 2: 雙井區離子佈植 (Twin-Well: N-Well & P-Well)',
    ch11_step_3: '步驟 3: High-k 介電質 (HfO₂) 與金屬閘極 (HKMG Stack)',
    ch11_step_4: '步驟 4: 源極/汲極選擇性磊晶 (SiGe for PMOS, Si:C for NMOS)',
    ch11_step_5: '步驟 5: 自對準矽化物 (NiSi) 與鎢插塞接觸孔 (Tungsten Contact Plug)',
    ch11_step_6: '步驟 6: 後段雙鑲嵌 10+ 層銅導線 (Dual Damascene Cu M1-M12)',
    ch11_metric_masks: '典型先進製程光罩層數',
    ch11_metric_steps: '完整製造工序步數',
    ch11_metric_cycle: '晶圓廠生產週期 (CT)',
    ch11_metric_yield: '成熟量產晶圓良率',
    ch11_feol_desc: 'FEOL (前段製程) 是晶圓廠最精密神經外科手術：在矽基板上鑿出淺溝槽 (STI) 灌入氧化物隔絕相鄰元件，打入硼與磷形成雙井，沉積數奈米級 High-k 氧化鉿與功函數金屬做為開關閘極，再磊晶生長應變應力源汲極。',
    ch11_mol_desc: 'MOL (中段製程) 是奈米電晶體與微米金屬線的樞紐橋樑：利用自對準矽化物降低寄生電阻，蝕刻高深寬比接觸孔 (Contact)，充填金屬鎢 (W-Plugs)，將數十億顆電晶體的閘極、源極與汲極精確引出。',
    ch11_beol_desc: 'BEOL (後段製程) 打造晶片內部摩天高速公路：堆疊 10 至 15 層雙載子鑲嵌銅導線與 Low-k 絕緣介電質，底層極細 (M1-M3, 局部短距訊號傳輸) 到頂層粗厚 (M10-M12, 全域時脈分配與電源供電)，最後完成打線引腳平坦化。',

    // Ch 13 記憶體製程技術
    ch13_title: '三大記憶體架構微觀立體模型 (DRAM 1T1C、3D NAND 200+層階梯、HBM 3D TSV)',
    ch13_sub: '解析 DRAM 1T1C 超高深寬比圓柱電容與漏電刷新、3D NAND Flash 垂直字元線交替堆疊階梯穿孔、與 HBM 3D TSV 微凸塊高頻寬堆疊架構',
    ch13_tab_dram: 'DRAM 1T1C 圓柱電容 (DRAM Architecture)',
    ch13_tab_nand: '3D NAND 200+ 層階梯穿孔 (3D NAND Staircase)',
    ch13_tab_hbm: 'HBM 3D TSV 高頻寬記憶體堆疊 (HBM 3D Stacking)',
    ch13_metric_dram_ar: 'DRAM 圓柱電容深寬比',
    ch13_metric_nand_layers: '3D NAND 量產堆疊層數',
    ch13_metric_hbm_bw: 'HBM3e 單顆晶片頻寬',
    ch13_metric_retention: 'DRAM 刷新週期 (tREFI)',
    ch13_dram_desc: 'DRAM 每個記憶胞僅由 1 個存取電晶體與 1 個垂直圓柱微型電容構成 (1T1C)。為克服尺寸縮小帶來的電容值衰減，工程師打造深寬比超過 50:1 的柱狀電容，表面覆蓋超薄高介電 ZAZ (ZrO₂/Al₂O₃/ZrO₂) 薄膜，每 64ms 必須重新刷新電荷避免資料流失。',
    ch13_nand_desc: '3D NAND 擺脫 2D 平面微縮極限，在晶圓表面交替沉積 200+ 層 SiO₂/Si₃N₄ 薄膜，以極高能量電漿一次貫穿數微米深孔 (HAR Etching)，外圍蝕刻成金字塔階梯狀引出數百條字元線 (Word-Lines)，透過電荷陷阱 (Charge Trap CTF) 儲存電子，實現 TB 級非揮發儲存。',
    ch13_hbm_desc: 'HBM (High Bandwidth Memory) 打破傳統 DDR 匯流排頻寬牆：將 4~16 顆 DRAM 裸晶透過數萬個穿矽孔 (TSV) 與微凸塊 (Micro-bumps) 垂直三維堆疊在邏輯控制基底 (Base Die) 上，提供 1024-bit 超寬並行匯流排，為 AI 算力加速器提供極致吞吐量！',

    // Ch 15 量測與檢測
    ch15_title: 'CD-SEM 臨界尺寸掃描電鏡、光學明暗場缺陷與橢偏儀薄膜量測模型',
    ch15_sub: '解析電子束邊緣二次電子尖峰測量奈米線寬、斜角雷射瑞利散射點亮 15nm 微粒、與偏振光干涉擬合埃級膜厚',
    ch15_tab_cdsem: 'CD-SEM 電子束臨界尺寸 (CD-SEM)',
    ch15_tab_optical: '明場 vs 暗場光學檢測 (Bright/Dark Field)',
    ch15_tab_ellipsometry: '光譜橢偏儀薄膜量測 (Ellipsometry)',
    ch15_metric_cd_res: 'CD-SEM 測量重複精度',
    ch15_metric_darkfield: '暗場雷射缺陷檢出極限',
    ch15_metric_film_thick: '橢偏儀薄膜厚度解析度',
    ch15_cdsem_desc: 'CD-SEM 採用 300-800 eV 超低著陸能量電子束以防止光阻收縮。當電子束掃描越過垂直奈米圖案側壁時，因表面逃逸深度效應引發二次電子 (SE) 劇烈發射（邊緣效應 Edge Blooming），在偵測器形成特徵雙峰輪廓，精確提取底部臨界尺寸 (Bottom CD) 與線寬粗糙度 (LWR)。',
    ch15_optical_desc: '明場檢測 (Bright-Field) 收集垂直反射光，高數值孔徑對比度擅長抓取圖案變形與微小橋接；暗場檢測 (Dark-Field) 則以斜角雷射掠射，光滑矽表面鏡面反射避開透鏡，唯獨微粒與凹凸產生瑞利散射 (Rayleigh Scattering) 進入收集器，在漆黑背景中瞬間點亮 15nm 孤立微粒！',
    ch15_ellipsometry_desc: '橢偏儀利用線偏振光以布魯斯特角 (~70°) 入射多層介電薄膜，反射光因層間干涉轉化為橢圓偏振光。透過精準測量振幅比 Ψ 與相位差 Δ，配合麥克斯韋方程擬合模型，可同時且非破壞性解出多層奈米薄膜的物理厚度與光學折射率 (n, k)。',

    // Ch 16 良率與故障分析
    ch16_title: '16 種晶圓缺陷圖譜空間分佈、FIB 奈米微割與 TEM 結晶分析模型',
    ch16_sub: '交互診斷環狀、邊緣、刮痕等晶圓圖缺陷物理根因，微觀探索聚焦離子束原位切片與原子級穿透電鏡 (HR-TEM) 缺陷解析',
    ch16_tab_wafermap: '晶圓缺陷空間圖譜 (Wafer Map Patterns)',
    ch16_tab_fib: '雙束 FIB 奈米切片 (Dual-Beam FIB)',
    ch16_tab_tem: 'HR-TEM 原子級晶格解析 (HR-TEM Lattice)',
    ch16_metric_yield: '典型先進製程成熟良率',
    ch16_metric_lamella: 'FIB 試樣薄片厚度',
    ch16_metric_tem_res: 'TEM 空間解析度',
    ch16_wafermap_desc: '晶圓圖空間分佈是製程機台的指紋：環狀 (Ring) 常見於 CMP 壓力不均或旋塗乾燥；邊緣 (Edge) 指向光阻邊緣去膠 (EBR) 異常或電漿邊界效應；刮痕 (Scratch) 來自機械手臂或傳送盒摩擦；聚集 (Cluster) 警示微粒爆發。良率工程師透過空間特徵能直接鎖定出問題的腔體。',
    ch16_fib_desc: 'Dual-Beam FIB 整合高能鎵離子束 (Ga⁺ FIB) 與掃描電鏡 (SEM)：先在失效晶粒上方沉積保護性鉑 (Pt) 沉積層，再利用離子束高速物理濺鍍掏空兩側，切出一片厚度僅 20~30 nm 的微型薄片 (TEM Lamella)，並由奈米機械手臂 (Omniprobe) 原位提取出來。',
    ch16_tem_desc: '穿透式電子顯微鏡 (TEM @ 200kV) 讓極高能電子束穿透超薄樣片，電子與晶格原子核發生繞射干涉，產生原子級對比像 (HR-TEM)。工程師能親眼看見矽原子柱排列、閘極氧化層穿隧擊穿針孔 (Pinhole) 與晶格差排滑移，為重大良率事故提供定讞證據。',

    // Ch 17 製程控制
    ch17_title: 'SPC Shewhart 管制圖、Cpk 製程能力常態分佈與 R2R 閉環補償模型',
    ch17_sub: '探索 3σ/6σ 管制界限與判異規則、Cp/Cpk 製程能力動態漂移計算、與機台批次 Run-to-Run (R2R) 即時配方補償',
    ch17_tab_spc: 'Shewhart 管制圖與判異 (Control Chart)',
    ch17_tab_cpk: '製程能力指數 Cpk 動態分佈 (Cpk Capability)',
    ch17_tab_r2r: 'Run-to-Run (R2R) 閉環回饋補償 (R2R Feedback)',
    ch17_metric_cpk_target: '晶圓廠六標準差 Cpk 目標',
    ch17_metric_sigma: '製程管制界限',
    ch17_metric_ooc: '統計判異 (OOC) 規則數',
    ch17_spc_desc: '統計製程控制 (SPC) 透過監控均值與標準差，將製程波動嚴格限制於 UCL (+3σ) 與 LCL (-3σ) 內。依據 Western Electric (WECO) 規則，任何單點出界或連續 9 點落於中心線同一側，機台將立即觸發警報並自動停機 (Hold)，防止批量晶圓報廢。',
    ch17_cpk_desc: 'Cp 衡量製程離散度 (USL - LSL)/6σ；Cpk 則綜合考量中心偏移：Cpk = min((USL-μ)/3σ, (μ-LSL)/3σ)。當 Cpk < 1.0 時不良率高達 0.27%；先進晶圓廠嚴格要求 Cpk ≥ 1.67，確保製程即便受到日常溫度氣壓微小擾動，產出不良率依然低於十億分之幾 (ppb)！',
    ch17_r2r_desc: '先進製程控制 (APC) 中的 R2R 利用前一批晶圓在線量測結果 (如蝕刻深淺或薄膜厚度偏差)，透過 EWMA 指數平滑演算法動態計算修正量，在下一批晶圓進爐前自動調整配方 (如增減 1.5 秒蝕刻時間)，將機台老化漂移完全撫平在閉環控制中。',

    // Ch 19 晶圓測試
    ch19_title: 'WAT 劃線區參數測試與 CP 晶粒針測 (Probe Card Touchdown) 模型',
    ch19_sub: '解析劃線道 PCM 測試鍵對 FEOL/BEOL 晶體特性的參數化驗收、垂直探針卡高頻觸地針測與 Bin Map 晶粒分類圖',
    ch19_tab_wat: 'WAT 劃線區參數測試 (WAT / PCM)',
    ch19_tab_cp: 'CP 晶粒針測與觸地 (CP Probe Card)',
    ch19_tab_binmap: 'Bin Map 晶粒分類圖 (Die Bin Map)',
    ch19_metric_pins: '高階探針卡針數',
    ch19_metric_force: '單針觸地接觸壓力',
    ch19_metric_freq: 'CP 高頻數位測試時脈',
    ch19_wat_desc: 'WAT (晶圓驗收測試) 在晶圓製造完成後，直接在切割劃線道 (Scribe-line) 的 PCM 測試鍵上量測電晶體飽和電流 (Ion)、關斷漏電 (Ioff)、臨界電壓 (Vth) 與接觸電阻 (Rc)。WAT 是晶圓廠出廠前的嚴格成績單，唯有全數過關才能將晶圓放行交給客戶或後段測試。',
    ch19_cp_desc: 'CP (晶片針測) 透過垂直式多層微彈簧探針卡 (Vertical Probe Card)，一次對數個或十數個晶粒 (Multi-Site) 的微凸塊施加數萬支微針接觸 (Touchdown)。在數 GHz 高頻下灌入全套功能性測試向量 (Scan Test / BIST)，精確標記每一顆晶粒的好壞。',
    ch19_binmap_desc: 'CP 測試完成後生成電子晶圓圖 (Wafer Bin Map)：綠色 Bin 1 (全功能良品)、黃色 Bin 2 (降頻/部分核心可用)、紅色 Bin 7/8/9 (開路、短路或靜態功耗超標)。這份電子地圖隨晶圓送往封裝廠，自動揀晶機 (Die Bonder) 只吸取合格晶粒進行高成本先進封裝。'
  },
  en: {
    badge_prefix: 'PROCESS OBJECT · ENGINEERING MODEL',
    live_sim: 'LIVE SIMULATION & DYNAMICS',
    btn_next_step: 'Next Step →',
    btn_auto_play: 'Auto Cycle ▶',
    btn_pause: 'Pause ⏸',
    btn_reset: 'Reset ↺',
    legend_title: 'Materials & Optical Key:',

    // Ch 04 Lithography
    ch04_title: 'Scanner Optical Path & Photoresist Photochemistry Model',
    ch04_sub: 'Explore 4:1 projection lens reduction, Rayleigh resolution limit formulas, and photoresist chemical mechanisms',
    ch04_tab_path: 'Optical Path (4:1 Reduction)',
    ch04_tab_pr: 'PR Photochemistry Mechanism',
    ch04_tab_scan: 'Step-and-Scan Slit Motion',
    ch04_mode_dry: 'DUV Dry (193nm Dry)',
    ch04_mode_imm: 'DUV Immersion (ArFi 193nm / Water n=1.44)',
    ch04_mode_euv: 'EUV Lithography (13.5nm / 0.33 NA)',
    ch04_mode_high_na: 'High-NA EUV (13.5nm / 0.55 NA)',
    ch04_laser_source: 'Excimer Laser / Plasma Source',
    ch04_illuminator: 'Illuminator Pupil (Quasar / Annular)',
    ch04_reticle: 'Reticle Stage (4x Mask Pattern)',
    ch04_proj_lens: 'Projection Optics Column (4:1 Reduction)',
    ch04_imm_water: 'Ultrapure Water Immersion Layer (n=1.44)',
    ch04_wafer_stage: 'Wafer Stage & Photoresist (1x Printed Pattern)',
    ch04_metric_res: 'Rayleigh Resolution Limit R',
    ch04_metric_dof: 'Depth of Focus DOF',
    ch04_metric_na: 'Numerical Aperture NA',
    ch04_metric_scale: 'Optical Demagnification',
    ch04_formula_note: 'Physics based on Rayleigh criteria: R = k₁·(λ/NA), DOF = k₂·(λ/NA²). Immersion water (n=1.44) breaks the 1.0 NA barrier up to 1.35; EUV exploits extremely short 13.5nm wavelength with reflective Bragg mirrors under high vacuum.',
    ch04_pr_pos: 'Positive Tone (Exposed area dissolves in TMAH)',
    ch04_pr_neg: 'Negative Tone (Exposed area cross-links & hardens)',
    ch04_pr_car: 'EUV Chemically Amplified Resist (CAR / PAG Acid Catalysis)',

    // Ch 05 Thin Films
    ch05_title: 'Thin Film Deposition Mechanisms & ALD Self-Limiting Model',
    ch05_sub: 'Compare step coverage across PVD physical sputtering, CVD thermal reaction, and 4-step ALD self-limiting cycles in high-aspect-ratio vias',
    ch05_tab_pvd: 'PVD Sputtering (Physical Vapor)',
    ch05_tab_cvd: 'CVD Chemical Vapor Deposition',
    ch05_tab_ald: 'ALD 4-Step Self-Limiting Cycle',
    ch05_step_1: 'Step 1: Precursor A Pulse Chemisorption',
    ch05_step_2: 'Step 2: Inert Gas Purge A (N₂/Ar)',
    ch05_step_3: 'Step 3: Precursor B Reactant Pulse (H₂O)',
    ch05_step_4: 'Step 4: Inert Gas Purge Byproducts (N₂)',
    ch05_ald_cycle_count: 'Completed Cycles:',
    ch05_ald_thickness: 'Accumulated Thickness:',
    ch05_ald_conformality: 'Step Coverage (Conformality):',
    ch05_metric_rate: 'Deposition Rate',
    ch05_metric_coverage: 'Step Coverage',
    ch05_metric_temp: 'Typical Process Temp',
    ch05_metric_uniformity: 'Atomic Thickness Control',
    ch05_pvd_desc: 'PVD sputtering is line-of-sight: knocked metal atoms travel straight, causing rapid overhang at trench mouth, starving lower sidewalls and bottom, leading to keyholes/voids.',
    ch05_cvd_desc: 'CVD utilizes precursor gas diffusion and thermal surface reactions, providing 65%-85% step coverage. However, in very high aspect ratios (>15:1), openings remain thicker than bottoms.',
    ch05_ald_desc: 'ALD uses self-limiting surface chemical reactions: each cycle strictly deposits a single atomic monolayer (~0.1nm/cycle), achieving 100% perfect conformality and zero voids.',

    // Ch 06 Etch
    ch06_title: 'Plasma Etch Reactor Architecture & Anisotropic Profile Model',
    ch06_sub: 'Explore dual-frequency ICP decoupling, vertical ion bombardment, and sidewall passivation polymer synergy',
    ch06_tab_chamber: 'Plasma Chamber (ICP/CCP Architecture)',
    ch06_tab_profile: 'Anisotropic Microscopic Mechanism',
    ch06_tab_anomalies: 'Etch Anomalies & RIE Lag',
    ch06_rf_source_label: 'RF Source Power (Controls Plasma Density / Radical Flux):',
    ch06_rf_bias_label: 'RF Bias Power (Controls Self-Bias & Ion Bombardment Energy):',
    ch06_showerhead: 'Showerhead Gas Inlet (CF₄, Cl₂, HBr, Ar)',
    ch06_source_coil: 'ICP RF Source Coil (13.56 MHz: Generates High-Density Plasma)',
    ch06_plasma_glow: 'High-Density Plasma Glow (Ions & Radicals)',
    ch06_sheath: 'Plasma Sheath (Dark space acceleration zone)',
    ch06_esc: 'Electrostatic Chuck (ESC) + Backside Helium Cooling',
    ch06_bias_gen: 'Low-Frequency RF Bias Generator (2 MHz: Generates -Vdc)',
    ch06_profile_ideal: 'Ideal Vertical Anisotropic Profile (90°)',
    ch06_profile_undercut: 'Sidewall Undercutting (Insufficient passivation)',
    ch06_profile_bowing: 'Sidewall Bowing (Ion scattering from mask)',
    ch06_profile_lag: 'RIE Lag / ARDE (Narrow holes etch slower)',
    ch06_etch_footer: 'The key breakthrough of ICP is decoupling plasma density (Source) from ion bombardment kinetic energy (Bias): top coil generates dense reactive ions while bottom chuck accelerates them vertically with sidewall passivation.',

    // Ch 12 Transistor Evolution
    ch12_title: 'Transistor Architecture Evolution Isometric 3D Model',
    ch12_sub: 'Explore the structural evolution overcoming short-channel limits from 2D Planar to 3D FinFET Tri-Gate and 2nm Gate-All-Around Nanosheet',
    ch12_tab_planar: '2D Planar MOSFET (28nm ~ 20nm)',
    ch12_tab_finfet: '3D FinFET (16nm ~ 3nm)',
    ch12_tab_gaa: '3D GAA Nanosheet (2nm ~ A16)',
    ch12_gate_wrap: 'Gate Electrostatic Wrapping',
    ch12_ss_metric: 'Subthreshold Swing (SS)',
    ch12_drive_curr: 'Channel Drive Current (Ion)',
    ch12_node_span: 'Leading Production Nodes',
    ch12_planar_desc: 'Planar MOSFET gates only control the top 2D surface of the channel. Scaling below 20nm leads to catastrophic DIBL and punch-through leakage, halting planar scaling.',
    ch12_finfet_desc: 'FinFET stands the silicon channel up as a 3D fin, with the metal gate wrapping over 3 sides (Tri-Gate). Weff = 2·Hfin + Wfin triples drive current while slashing leakage by >10x.',
    ch12_gaa_desc: 'GAA Nanosheet divides the fin into 3-4 vertically stacked horizontal nanosheets, wrapped 360° on all 4 sides by the gate. SS approaches 63 mV/dec, paired with Backside Power Delivery (BSPDN).',

    // Ch 07 Ion Implantation
    ch07_title: 'Ion Implanter Beamline Magnetics & Lattice Anneal Model',
    ch07_sub: 'Explore 90° mass analyzer selection, beamline acceleration, lattice amorphization, and rapid thermal anneal (RTA)',
    ch07_tab_beamline: 'Beamline & Mass Separation',
    ch07_tab_anneal: 'Lattice Damage & RTA Activation',
    ch07_tab_channeling: 'Channeling & 7° Tilt Angle',
    ch07_ion_source: 'Ion Source Plasma Chamber (BF₃ / PH₃ / AsH₃)',
    ch07_magnet: '90° Mass Analyzer Magnet (Lorentz Force)',
    ch07_slit: 'Mass Resolving Slit',
    ch07_accel: 'Post-Acceleration Column (100-500 keV)',
    ch07_scanner: 'Electrostatic X-Y Deflection Plates',
    ch07_endstation: 'High-Vacuum Wafer Endstation',
    ch07_species_b: 'Boron B⁺ (m/z=11, light, small radius)',
    ch07_species_p: 'Phosphorus P⁺ (m/z=31)',
    ch07_species_as: 'Arsenic As⁺ (m/z=75, heavy, large radius)',
    ch07_dose_label: 'Implant Dose (Φ)',
    ch07_range_label: 'Projected Range (Rp)',
    ch07_energy_label: 'Beam Energy',
    ch07_beamline_desc: 'Based on Lorentz force F = q(v × B), ions with different mass-to-charge ratios (m/z) bend with distinct radii r = mv / (qB) in a magnetic field. Resolving slits filter out unwanted contaminants, selecting only target dopants.',
    ch07_anneal_desc: 'Energetic ion collisions shatter the crystalline silicon into an amorphous damaged layer with zero electrical activity. Rapid Thermal Annealing (RTA ~1050°C) triggers Solid Phase Epitaxial Regrowth, placing dopants into substitution lattice sites (>95% activation).',
    ch07_channeling_desc: 'Ions incident along major crystal axes (<110>) steer down open atomic corridors without nuclear collisions (channeling effect). Tilting wafers by 7° with a 27° twist de-aligns the axes, ensuring tight, controlled Gaussian profiles.',

    // Ch 08 CMP
    ch08_title: 'Chemical Mechanical Planarization (CMP) Model',
    ch08_sub: 'Analyze multi-zone carrier heads, Preston equation kinematics, chemical softening, and abrasive planarization mechanisms',
    ch08_tab_kinematics: 'CMP Tool Kinematics (Carrier Head & Pad)',
    ch08_tab_micro: 'Chemical + Mechanical Synergy',
    ch08_tab_defects: 'Dishing, Erosion & Dummy Fill',
    ch08_pad_label: 'Rotating Polishing Pad (~100 RPM)',
    ch08_head_label: 'Wafer Carrier Head (Multi-Zone Air Bladders)',
    ch08_slurry_arm: 'Slurry Delivery Arm (SiO₂/CeO₂ + H₂O₂)',
    ch08_conditioner: 'Diamond Conditioner Disk',
    ch08_mrr_label: 'Material Removal Rate (MRR)',
    ch08_preston_note: 'Governed by Preston equation: MRR = Kp · P · V. Multi-zone air bladders tune down-force P from center to edge, while synchronized head and pad rotation keeps relative velocity V constant across the 300mm wafer.',
    ch08_micro_desc: 'Oxidizers chemically react with metal surfaces to form a soft, porous nanometer-thin oxide layer. Abrasives under pressure polish off high-spot peaks, while recessed valleys remain protected by the passivation film, achieving true global planarization.',
    ch08_defects_desc: 'Pad elasticity causes dishing in wide metal lines and erosion in dense arrays. Inserting non-functional dummy metal fill tiles keeps pattern density uniform at 30%-50%, eliminating topography variations across the die.',

    // Ch 10 BEOL & Dual Damascene
    ch10_title: 'Copper Dual Damascene & Electromigration (EM) Model',
    ch10_sub: 'Explore multi-level BEOL metallization, bottom-up ECD superfilling, low-k dielectrics, and electron wind electromigration',
    ch10_tab_damascene: 'Dual Damascene Process Flow',
    ch10_tab_superfill: 'ECD Bottom-Up Superfilling',
    ch10_tab_em: 'Electromigration Reliability (EM)',
    ch10_step_dama_1: '1. Deposit Low-k Dielectric (SiCOH, k~2.5)',
    ch10_step_dama_2: '2. Litho & Etch Vias & Trenches',
    ch10_step_dama_3: '3. Deposit Ta/TaN Diffusion Barrier (1.5nm)',
    ch10_step_dama_4: '4. PVD Deposit Thin Copper Seed Layer',
    ch10_step_dama_5: '5. ECD Bottom-Up Copper Superfilling',
    ch10_step_dama_6: '6. Copper CMP & Dielectric Capping (SiCN)',
    ch10_damascene_desc: 'Copper lacks volatile byproducts for dry plasma etching, necessitating the Damascene process: etch trenches first, electroplate copper, then polish flat. Dual Damascene fills vias and trenches simultaneously.',
    ch10_superfill_desc: 'Plating additives orchestrate seamless filling: Suppressors retard deposition at upper openings, while Accelerators concentrate at concave trench bottoms, driving fountain-like bottom-up growth with zero seams or voids.',
    ch10_em_desc: 'At extreme current densities (> 10⁶ A/cm²), momentum transfer from drifting electrons (Electron Wind) nudges copper atoms along grain boundaries. Atoms migrate away forming voids (opens), or pile up forming hillocks (shorts).',

    // Ch 21 Advanced Packaging
    ch21_title: '2.5D CoWoS Interposer & 3D SoIC Hybrid Bonding Model',
    ch21_sub: 'Explore TSV silicon interposers, HBM micro-bumps, and sub-micron bumpless Cu-Cu hybrid bonding',
    ch21_tab_cowos: '2.5D CoWoS Silicon Interposer (CoWoS-S)',
    ch21_tab_soic: '3D SoIC Bumpless Cu-Cu Hybrid Bonding',
    ch21_tab_density: 'Interconnect Density & Pitch Comparison',
    ch21_cowos_desc: '2.5D CoWoS bridges high-power SoC/GPU compute dies with 4-8 HBM stacks across a large silicon interposer packed with sub-micron RDL wires and Through-Silicon Vias (TSVs), delivering multi-terabyte/s bandwidth.',
    ch21_soic_desc: '3D SoIC eliminates solder micro-bumps entirely: atomic-flat dielectric surfaces bond at room temperature (SiO₂-SiO₂), followed by thermal annealing where copper contacts diffuse together (Cu-Cu) with <1µm pitch and 1500x density!',
    ch21_density_desc: 'Interconnect evolution: Wire-Bonding/BGA (1000µm pitch) → Flip-Chip C4 (150µm) → 2.5D Micro-Bump (35µm) → 3D SoIC Hybrid Bonding (0.9µm), slashing communication energy by 90% with near-monolithic latency.',

    // Ch 03 Silicon Ingot & Wafer Fabrication
    ch03_title: 'Czochralski (CZ) Silicon Ingot Puller & Wafer Slicing Model',
    ch03_sub: 'Explore 1425°C quartz crucible counter-rotation, <100> seed necking dislocation-free pulling, diamond wire sawing, and double-side polishing',
    ch03_tab_cz: 'CZ Crystal Puller & Melt Dynamics',
    ch03_tab_saw: 'Diamond Wire Sawing & Kerf',
    ch03_tab_polish: 'Edge Beveling & Double-Side Polish',
    ch03_crucible: 'Quartz Crucible (@ 1425°C)',
    ch03_seed: '<100> Seed Crystal',
    ch03_ingot: '300mm Monocrystalline Silicon Ingot',
    ch03_melt: 'Liquid Silicon Melt',
    ch03_heater: 'Graphite Resistance Heater',
    ch03_mcz: 'Superconducting Magnet (MCZ: Damps Melt Convection)',
    ch03_metric_purity: 'Ingot Purity',
    ch03_metric_pull: 'Pull Rate',
    ch03_metric_thick: '300mm Wafer Thickness',
    ch03_metric_roughness: 'Surface Roughness RMS',
    ch03_cz_desc: 'The Czochralski (CZ) technique melts 11N electronic-grade polysilicon at 1425°C. A <100> seed crystal dips into the melt and counter-rotates. High-speed Dash necking eliminates dislocations, followed by crown flaring and body growth into a 300mm single-crystal ingot.',
    ch03_saw_desc: 'Hundreds of high-tensile steel wires electroplated with diamond particles oscillate at 30-50 m/s to slice the ingot into hundreds of pristine wafers simultaneously. Kerf loss is minimized to ~100 µm while maintaining ultra-low warp and bow.',
    ch03_polish_desc: 'CNC diamond wheels bevel the wafer edges to prevent chipping and resist beading. Planetary double-side lapping and chemical mechanical double-side polishing (DSP) then flatten surface roughness down to sub-angstrom atomic smoothness (<0.1 nm RMS).',

    // Ch 09 Wet Cleaning & Microcontamination
    ch09_title: 'RCA Wet Cleaning Chemistry, Megasonics & Marangoni Drying Model',
    ch09_sub: 'Microscopic analysis of SC-1 zeta potential repulsion, SC-2 metal complexing, 1MHz megasonic acoustic streaming, and surface tension gradient drying',
    ch09_tab_rca: 'RCA Clean Chemistry (SC-1 / DHF / SC-2)',
    ch09_tab_megasonic: 'Megasonic Acoustic Streaming',
    ch09_tab_marangoni: 'Marangoni Surface Tension Drying',
    ch09_metric_pre: 'Particle Removal Efficiency (PRE > 20nm)',
    ch09_metric_metal: 'Surface Metal Residue',
    ch09_metric_boundary: 'Acoustic Boundary Layer δ',
    ch09_metric_watermark: 'Drying Watermark Residue',
    ch09_rca_desc: 'SC-1 (NH₄OH/H₂O₂/H₂O @ 70°C) oxidizes and micro-etches silicon, establishing a strong negative zeta potential on both particles and substrate to prevent re-adhesion. DHF strips oxide, and SC-2 (HCl/H₂O₂/H₂O @ 70°C) chelates alkali and heavy metals into soluble chloride complexes.',
    ch09_megasonic_desc: 'Traditional hydrodynamic boundary layers shield sub-micron particles from bulk fluid drag. High-frequency megasonics (~1 MHz) induce acoustic microstreaming and controlled acoustic cavitation, compressing the boundary layer to <0.5 µm and shearing off 10nm particles.',
    ch09_marangoni_desc: 'As wafers are slowly withdrawn from ultrapure water (UPW), IPA vapor is introduced. IPA dissolution creates a surface tension gradient, generating downward Marangoni capillary force that pulls the water film smoothly back into the bath with zero watermark defects.',

    // Ch 11 CMOS Integrated Process Flow
    ch11_title: 'Full CMOS Integrated Process Cross-Section & Stepper Model (FEOL → MOL → BEOL)',
    ch11_sub: 'Step-by-step cross-sectional visualization of complementary NMOS & PMOS: STI isolation, twin-wells, HKMG gate stacks, S/D epitaxy, contact plugs, and multi-tier BEOL copper metallization',
    ch11_tab_feol: 'FEOL (Front-End-of-Line: Transistors)',
    ch11_tab_mol: 'MOL (Middle-of-Line: Contacts)',
    ch11_tab_beol: 'BEOL (Back-End-of-Line: Interconnects)',
    ch11_step_1: 'Step 1: Shallow Trench Isolation (STI) isolates active regions',
    ch11_step_2: 'Step 2: Twin-Well Ion Implantation (N-Well & P-Well)',
    ch11_step_3: 'Step 3: High-k Dielectric (HfO₂) & Metal Gate Stack (HKMG)',
    ch11_step_4: 'Step 4: Source/Drain Selective Epitaxy (SiGe PMOS, Si:C NMOS)',
    ch11_step_5: 'Step 5: Self-Aligned Silicide (NiSi) & Tungsten Contact Plugs',
    ch11_step_6: 'Step 6: Dual Damascene Multi-Layer Copper Interconnects (M1-M12)',
    ch11_metric_masks: 'Typical Advanced Mask Count',
    ch11_metric_steps: 'Total Manufacturing Steps',
    ch11_metric_cycle: 'Fab Cycle Time (CT)',
    ch11_metric_yield: 'Mature Production Yield',
    ch11_feol_desc: 'FEOL (Front-End-of-Line) forms the microscopic transistor switches: etching shallow trench isolation (STI) backfilled with oxide, implanting dopants for twin-wells, laying atomic-thin HfO₂ high-k gates, and epitaxially growing strained source/drain regions.',
    ch11_mol_desc: 'MOL (Middle-of-Line) provides the electrical bridge between nanoscale transistor terminals and microscale copper wiring: using self-aligned silicide to drop contact resistance, etching vertical contact vias, and plugging with CVD tungsten (W).',
    ch11_beol_desc: 'BEOL (Back-End-of-Line) constructs the multi-level highway network: stacking 10 to 15 layers of dual damascene copper wires separated by low-k dielectric, from dense tight-pitch M1-M3 to thick top-level power distribution rails (M10-M12).',

    // Ch 13 Memory Technologies
    ch13_title: 'Three Major Memory Architectures 3D Model (DRAM 1T1C, 3D NAND Staircase, HBM 3D TSV)',
    ch13_sub: 'Examine DRAM 1T1C ultra-high-aspect capacitor and refresh kinetics, 3D NAND vertical multi-tier staircase HAR etching, and HBM 3D TSV micro-bump wide-bus stacking',
    ch13_tab_dram: 'DRAM 1T1C Cylinder Capacitor',
    ch13_tab_nand: '3D NAND 200+ Layer Staircase',
    ch13_tab_hbm: 'HBM 3D TSV High-Bandwidth Stacking',
    ch13_metric_dram_ar: 'DRAM Capacitor Aspect Ratio',
    ch13_metric_nand_layers: '3D NAND Production Layers',
    ch13_metric_hbm_bw: 'HBM3e Stack Bandwidth',
    ch13_metric_retention: 'DRAM Refresh Cycle (tREFI)',
    ch13_dram_desc: 'DRAM stores data using 1 access transistor and 1 vertical cylinder capacitor (1T1C). To preserve capacitance as cell area shrinks, capacitors feature extreme >50:1 aspect ratios lined with ZAZ (ZrO₂/Al₂O₃/ZrO₂) high-k films, requiring 64ms refresh cycles to replenish leakage.',
    ch13_nand_desc: '3D NAND overcomes 2D planar lithography scaling by vertically stacking 200+ alternating SiO₂/Si₃N₄ tiers. High-aspect-ratio (HAR) plasma etching drills vertical channel holes through the entire stack, while staircase word-line landings contact individual flash gates.',
    ch13_hbm_desc: 'HBM (High Bandwidth Memory) shatters traditional memory bus bottlenecks by stacking 4 to 16 DRAM dies atop a base logic die via thousands of Through-Silicon Vias (TSVs) and micro-bumps, providing a massive 1024-bit wide interface exceeding 1.2 TB/s for AI acceleration.',

    // Ch 15 Metrology & Inspection
    ch15_title: 'CD-SEM Metrology, Bright/Dark-Field Inspection & Ellipsometry Model',
    ch15_sub: 'Analyze low-energy secondary electron edge bloom for CD/LWR, grazing laser Rayleigh scattering for 15nm defects, and polarized interferometry for angstrom film thickness',
    ch15_tab_cdsem: 'CD-SEM Electron Beam Metrology',
    ch15_tab_optical: 'Bright-Field vs Dark-Field Inspection',
    ch15_tab_ellipsometry: 'Spectroscopic Ellipsometry',
    ch15_metric_cd_res: 'CD-SEM Measurement Repeatability',
    ch15_metric_darkfield: 'Dark-Field Laser Defect Detection Limit',
    ch15_metric_film_thick: 'Ellipsometry Film Thickness Resolution',
    ch15_cdsem_desc: 'CD-SEM uses an ultra-low landing energy (300-800 eV) electron beam to prevent photoresist shrinkage. When scanning across steep pattern sidewalls, the escape depth blooming of secondary electrons creates a characteristic double-peak profile, precisely extracting bottom CD and line width roughness (LWR).',
    ch15_optical_desc: 'Bright-field inspection captures normal specular reflections, with high numerical aperture contrast excelling at pattern deformities and bridging. Dark-field inspection uses grazing-angle laser illumination: pristine planar surfaces reflect light away, while 15nm particles scatter light into detectors, glowing brightly against a pitch-black background.',
    ch15_ellipsometry_desc: 'Spectroscopic ellipsometry illuminates dielectric thin films with linearly polarized light near Brewster angle (~70°). Interfacial reflections transform it into elliptically polarized light. Measuring amplitude ratio Ψ and phase shift Δ enables simultaneous, non-destructive extraction of multi-layer thickness and complex refractive indices (n, k).',

    // Ch 16 Yield & Failure Analysis
    ch16_title: 'Wafer Defect Spatial Signatures, FIB In-Situ Milling & TEM Failure Analysis Model',
    ch16_sub: 'Diagnose ring, edge, scratch defect signatures on 300mm wafer maps, and examine Dual-Beam FIB lamella lift-out and HR-TEM lattice imaging',
    ch16_tab_wafermap: 'Wafer Map Spatial Signatures',
    ch16_tab_fib: 'Dual-Beam FIB In-Situ Milling',
    ch16_tab_tem: 'HR-TEM Atomic Lattice Analysis',
    ch16_metric_yield: 'Typical Advanced Node Mature Yield',
    ch16_metric_lamella: 'FIB Lamella Thickness',
    ch16_metric_tem_res: 'TEM Spatial Resolution',
    ch16_wafermap_desc: 'Wafer map spatial signatures serve as process equipment fingerprints: Rings indicate CMP slurry distribution or spin-dry anomalies; Edge defects point to edge bead removal (EBR) issues; Scratches indicate robotic handler abrasion; Clusters reveal particle showers. Spatial classification directs engineers straight to faulty chambers.',
    ch16_fib_desc: 'Dual-Beam FIB pairs a focused Gallium ion beam (Ga⁺ FIB) with high-resolution SEM. It deposits protective Platinum (Pt) over the defective transistor, sputters trenches on both flanks to mill out a 20-30nm ultra-thin lamella, which a robotic micromanipulator lifts out in-situ for TEM grid mounting.',
    ch16_tem_desc: 'Transmission Electron Microscopy (TEM @ 200kV) directs highly energetic electrons through the sub-30nm lamella. Diffraction interference with crystalline atomic columns generates sub-angstrom phase-contrast images (HR-TEM), revealing individual atomic lattices, gate dielectric breakdown pinholes, and dislocations.',

    // Ch 17 Statistical Process Control
    ch17_title: 'SPC Shewhart Charts, Cpk Normal Distribution & R2R Closed-Loop Control Model',
    ch17_sub: 'Explore 3σ/6σ control limits, Western Electric rules, dynamic Cpk shift/spread, and real-time Run-to-Run recipe feedback compensation',
    ch17_tab_spc: 'Shewhart Chart & OOC Rules',
    ch17_tab_cpk: 'Process Capability (Cp & Cpk)',
    ch17_tab_r2r: 'Run-to-Run Closed-Loop Control',
    ch17_metric_cpk_target: 'Fab 6-Sigma Cpk Target',
    ch17_metric_sigma: 'Statistical Control Limits',
    ch17_metric_ooc: 'Out-of-Control Rules',
    ch17_spc_desc: 'Statistical Process Control (SPC) continuously monitors process mean and dispersion, bounding natural variation within Upper (+3σ) and Lower (-3σ) Control Limits. Violations of Western Electric (WECO) rules trigger immediate automated tool holds, preventing catastrophic scrap events.',
    ch17_cpk_desc: 'Cp gauges potential capability: (USL - LSL)/6σ. Cpk accounts for mean centering: min((USL-μ)/3σ, (μ-LSL)/3σ). While Cpk < 1.0 yields 2700 ppm defects, advanced foundries enforce Cpk ≥ 1.67, ensuring defect rates remain below parts-per-billion even under thermal or barometric drifts.',
    ch17_r2r_desc: 'Run-to-Run (R2R) control exploits metrology feedback from immediately preceding wafer lots. An Exponentially Weighted Moving Average (EWMA) algorithm calculates optimal recipe offsets (e.g. trimming etch duration by 1.2s), continuously steering chamber drift back to baseline.',

    // Ch 19 Wafer Testing
    ch19_title: 'WAT Parametric Test & CP Die Sort Probe Card Touchdown Model',
    ch19_sub: 'Examine scribe-line PCM parametric electrical verification, vertical probe card high-frequency touchdown, and pass/fail die Bin Mapping',
    ch19_tab_wat: 'WAT Scribe-Line PCM Test',
    ch19_tab_cp: 'CP Die Sort Touchdown',
    ch19_tab_binmap: 'Wafer Bin Map Classification',
    ch19_metric_pins: 'Probe Card Pin Count',
    ch19_metric_force: 'Single-Pin Touchdown Force',
    ch19_metric_freq: 'CP High-Speed Test Clock',
    ch19_wat_desc: 'Wafer Acceptance Test (WAT) directly tests Process Control Monitor (PCM) test keys in scribe-line streets post-fab, verifying saturation drive current (Ion), subthreshold leakage (Ioff), threshold voltage (Vth), and contact resistance (Rc). Only 100% compliant wafers are released for sorting.',
    ch19_cp_desc: 'Chip Probing (CP) uses multi-layer vertical probe cards with tens of thousands of microscopic spring needles to contact die micro-bumps (touchdown). Automated Test Equipment (ATE) injects gigahertz scan vectors and BIST algorithms to validate complete digital logic, SRAM cells, and analog interfaces.',
    ch19_binmap_desc: 'CP results produce an electronic Wafer Bin Map: Green Bin 1 (Prime passing dies), Yellow Bin 2 (Speed-binned / degraded core functional dies), Red Bins (Short, open, or excessive leakage dies). This map guides high-speed automated die bonders during advanced packaging assembly.'
  }
};

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 1. Ch 04 微影光路與光阻反應模型 (Lithography Optical & PR Model)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderLithoOpticalObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'path'; // 'path' | 'pr' | 'scan'
  let activeOpticalMode = 'imm'; // 'dry' | 'imm' | 'euv' | 'high_na'
  let activePRMode = 'pos'; // 'pos' | 'neg' | 'car'

  // 光學參數設定
  const OPTICAL_PRESETS = {
    dry: { lambda: 193, na: 0.93, k1: 0.35, k2: 0.50, r: '72.6 nm', dof: '111.5 nm', scale: '4 : 1' },
    imm: { lambda: 193, na: 1.35, k1: 0.28, k2: 0.50, r: '40.0 nm', dof: '52.9 nm', scale: '4 : 1' },
    euv: { lambda: 13.5, na: 0.33, k1: 0.32, k2: 0.50, r: '13.1 nm', dof: '62.0 nm', scale: '4 : 1' },
    high_na: { lambda: 13.5, na: 0.55, k1: 0.32, k2: 0.50, r: '7.9 nm', dof: '22.3 nm', scale: '8 : 4 (Anamorphic)' }
  };

  function update() {
    const cur = OPTICAL_PRESETS[activeOpticalMode];

    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'path') {
      controlsHtml = `
        <div class="eng-obj-tab-group" role="tablist">
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'dry' ? 'is-active' : ''}" data-mode="dry">${t.ch04_mode_dry}</button>
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'imm' ? 'is-active' : ''}" data-mode="imm">${t.ch04_mode_imm}</button>
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'euv' ? 'is-active' : ''}" data-mode="euv">${t.ch04_mode_euv}</button>
          <button type="button" class="eng-obj-tab ${activeOpticalMode === 'high_na' ? 'is-active' : ''}" data-mode="high_na">${t.ch04_mode_high_na}</button>
        </div>
      `;

      const isEUV = activeOpticalMode === 'euv' || activeOpticalMode === 'high_na';
      const isImm = activeOpticalMode === 'imm';
      const beamColor = isEUV ? '#38bdf8' : '#71ece3';
      const beamCore = isEUV ? '#e0f2fe' : '#ccfbf1';

      viewportHtml = `
        <svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scanner Optical Path 4x Reduction">
          <defs>
            <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${beamColor}" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="${beamColor}" stop-opacity="0.25"/>
            </linearGradient>
            <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#0284c7" stop-opacity="0.7"/>
              <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0.7"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- 背景格線標註 -->
          <g stroke="#1e293b" stroke-width="0.75" stroke-dasharray="3 3">
            <line x1="60" y1="50" x2="740" y2="50"/>
            <line x1="60" y1="130" x2="740" y2="130"/>
            <line x1="60" y1="210" x2="740" y2="210"/>
            <line x1="60" y1="350" x2="740" y2="350"/>
            <line x1="400" y1="30" x2="400" y2="430" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="6 4"/>
          </g>

          <!-- 1. 光源部 (Laser/EUV Source) -->
          <rect x="330" y="24" width="140" height="36" rx="4" fill="#0f172a" stroke="${beamColor}" stroke-width="1.5"/>
          <text x="400" y="47" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700" font-family="sans-serif">${t.ch04_laser_source} (${cur.lambda} nm)</text>
          
          <!-- 出射光束錐 -->
          <polygon points="370,60 430,60 480,110 320,110" fill="url(#beamGrad)" opacity="0.6"/>
          <line x1="400" y1="60" x2="400" y2="110" stroke="${beamCore}" stroke-width="2" class="anim-beam"/>

          <!-- 2. 照明光瞳 (Illuminator) -->
          <rect x="310" y="110" width="180" height="12" rx="2" fill="#334155" stroke="#64748b"/>
          <text x="510" y="120" fill="#94a3b8" font-size="11" font-family="sans-serif">${t.ch04_illuminator}</text>

          <!-- 光罩入射光 -->
          <polygon points="320,122 480,122 470,150 330,150" fill="url(#beamGrad)" opacity="0.7"/>

          <!-- 3. 光罩載台 (Reticle Stage, 4x Scale) -->
          <rect x="250" y="150" width="300" height="16" rx="2" fill="#1e293b" stroke="#e2e8f0" stroke-width="1.2"/>
          <!-- 光罩鉻層微圖形 (4x 圖元) -->
          <g fill="#f59e0b">
            <rect x="340" y="152" width="20" height="12"/>
            <rect x="380" y="152" width="20" height="12"/>
            <rect x="420" y="152" width="20" height="12"/>
          </g>
          <text x="570" y="162" fill="#f59e0b" font-size="12" font-weight="700" font-family="sans-serif">${t.ch04_reticle} [4x: 112nm Pitch]</text>

          <!-- 4. 4:1 縮小投影物鏡系統 (Projection Lens Column) -->
          <!-- 投影光錐 4:1 收束折射 -->
          <polygon points="330,166 470,166 450,230 350,230" fill="url(#beamGrad)" opacity="0.75"/>
          
          <!-- 雙凸透鏡 1 -->
          <path d="M 320,230 Q 400,215 480,230 Q 400,245 320,230 Z" fill="url(#lensGrad)" stroke="#38bdf8" stroke-width="1"/>
          
          <!-- 光闌 Aperture Stop (NA 控制器) -->
          <rect x="310" y="255" width="60" height="8" fill="#475569"/>
          <rect x="430" y="255" width="60" height="8" fill="#475569"/>
          <text x="510" y="262" fill="#38bdf8" font-size="11" font-family="sans-serif">NA Aperture Stop (${cur.na})</text>

          <!-- 雙凸透鏡 2 與收斂光錐 -->
          <path d="M 340,280 Q 400,268 460,280 Q 400,292 340,280 Z" fill="url(#lensGrad)" stroke="#38bdf8" stroke-width="1"/>
          <polygon points="360,290 440,290 405,372 395,372" fill="url(#beamGrad)" opacity="0.9" filter="url(#glow)"/>
          
          <!-- 投影透鏡組說明 -->
          <text x="180" y="245" text-anchor="end" fill="#94a3b8" font-size="11.5" font-family="sans-serif">${t.ch04_proj_lens}</text>
          <path d="M 190,242 L 315,242" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>

          <!-- 5. 浸潤式水層 (Immersion Layer) 若為 ArFi -->
          ${isImm ? `
            <rect x="320" y="360" width="160" height="14" rx="2" fill="rgba(56, 189, 248, 0.35)" stroke="#38bdf8" stroke-width="1"/>
            <text x="500" y="371" fill="#71ece3" font-size="11.5" font-weight="600" font-family="sans-serif">${t.ch04_imm_water}</text>
          ` : ''}

          <!-- 6. 晶圓載台與 1x 光阻成像層 (Wafer Stage) -->
          <rect x="260" y="376" width="280" height="32" rx="3" fill="#1e293b" stroke="#0284c7" stroke-width="1.5"/>
          <rect x="280" y="376" width="240" height="6" fill="#f59e0b"/>
          <!-- 縮小成像圖案 1x (28nm Pitch) -->
          <g fill="#38bdf8">
            <rect x="390" y="376" width="5" height="6"/>
            <rect x="400" y="376" width="5" height="6"/>
            <rect x="410" y="376" width="5" height="6"/>
          </g>
          <text x="400" y="399" text-anchor="middle" fill="#f8fafc" font-size="12" font-weight="700" font-family="sans-serif">${t.ch04_wafer_stage} [1x: 28nm Pitch]</text>
          <text x="560" y="392" fill="#38bdf8" font-size="11.5" font-weight="700" font-family="sans-serif">Focus DOF: ±${cur.dof}</text>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_res}</div>
          <div class="eng-obj-metric-value">${cur.r}</div>
          <div class="eng-obj-metric-note">R = k₁·(λ/NA) · k₁=${cur.k1}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_dof}</div>
          <div class="eng-obj-metric-value">${cur.dof}</div>
          <div class="eng-obj-metric-note">DOF = k₂·(λ/NA²) · k₂=${cur.k2}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_na}</div>
          <div class="eng-obj-metric-value">${cur.na}</div>
          <div class="eng-obj-metric-note">${isImm ? 'Immersion Water (n=1.44)' : (isEUV ? 'Mo/Si Reflective Optics' : 'Standard Dry Air Lens')}</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch04_metric_scale}</div>
          <div class="eng-obj-metric-value">${cur.scale}</div>
          <div class="eng-obj-metric-note">Reticle to Wafer Magnification</div>
        </div>
      `;

      footerNote = t.ch04_formula_note;
    } else if (activeTab === 'pr') {
      controlsHtml = `
        <div class="eng-obj-tab-group" role="tablist">
          <button type="button" class="eng-obj-tab ${activePRMode === 'pos' ? 'is-active' : ''}" data-prmode="pos">${t.ch04_pr_pos}</button>
          <button type="button" class="eng-obj-tab ${activePRMode === 'neg' ? 'is-active' : ''}" data-prmode="neg">${t.ch04_pr_neg}</button>
          <button type="button" class="eng-obj-tab ${activePRMode === 'car' ? 'is-active' : ''}" data-prmode="car">${t.ch04_pr_car}</button>
        </div>
      `;

      const isPos = activePRMode === 'pos';
      const isCar = activePRMode === 'car';

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Photoresist Mechanism">
          <!-- 步驟 1: 曝光照光 -->
          <g transform="translate(40, 40)">
            <rect x="0" y="0" width="210" height="300" rx="6" fill="#131e2b" stroke="#334155"/>
            <text x="105" y="28" text-anchor="middle" fill="#38bdf8" font-size="13.5" font-weight="700">1. 曝光照射 (Exposure)</text>
            <!-- 光罩遮擋 -->
            <rect x="15" y="55" width="60" height="8" fill="#e2e8f0"/>
            <rect x="135" y="55" width="60" height="8" fill="#e2e8f0"/>
            <text x="105" y="50" text-anchor="middle" fill="#94a3b8" font-size="10.5">光罩開口 (Mask)</text>
            <!-- 光束線束 -->
            <g stroke="#71ece3" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.85">
              <line x1="85" y1="65" x2="85" y2="150"/>
              <line x1="105" y1="65" x2="105" y2="150"/>
              <line x1="125" y1="65" x2="125" y2="150"/>
            </g>
            <!-- 光阻層 -->
            <rect x="15" y="150" width="180" height="60" fill="#f59e0b" opacity="0.85"/>
            <!-- 照光感光區 -->
            <rect x="75" y="150" width="60" height="60" fill="${isPos ? '#38bdf8' : '#059669'}" opacity="0.9"/>
            <text x="105" y="185" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${isCar ? 'PAG 產酸 H⁺' : (isPos ? '光解去保護' : '交聯聚合')}</text>
            <!-- 矽基板 -->
            <rect x="15" y="210" width="180" height="40" fill="#334155"/>
            <text x="105" y="235" text-anchor="middle" fill="#94a3b8" font-size="11">矽基板 (Si Substrate)</text>
          </g>

          <!-- 步驟 2: 後烘烤 (PEB) -->
          <g transform="translate(295, 40)">
            <rect x="0" y="0" width="210" height="300" rx="6" fill="#131e2b" stroke="#334155"/>
            <text x="105" y="28" text-anchor="middle" fill="#f59e0b" font-size="13.5" font-weight="700">2. 後烘烤 (PEB ~110°C)</text>
            <text x="105" y="60" text-anchor="middle" fill="#cbd5e1" font-size="11">${isCar ? '酸催化連鎖放大反應' : '熱致化學均勻擴散'}</text>
            <!-- 熱波指示 -->
            <path d="M 60,95 Q 75,80 90,95 T 120,95 T 150,95" fill="none" stroke="#f59e0b" stroke-width="2"/>
            <!-- 光阻層與擴散 -->
            <rect x="15" y="150" width="180" height="60" fill="#f59e0b" opacity="0.85"/>
            <rect x="73" y="150" width="64" height="60" fill="${isPos ? '#0284c7' : '#047857'}" opacity="0.95"/>
            <text x="105" y="185" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">${isCar ? '1 個 H⁺ 催化 100+ 鍵' : (isPos ? '溶解度倍增區' : '耐溶交聯區')}</text>
            <rect x="15" y="210" width="180" height="40" fill="#334155"/>
            <text x="105" y="235" text-anchor="middle" fill="#94a3b8" font-size="11">矽基板 (Si Substrate)</text>
          </g>

          <!-- 步驟 3: 顯影洗淨 (Development) -->
          <g transform="translate(550, 40)">
            <rect x="0" y="0" width="210" height="300" rx="6" fill="#131e2b" stroke="#334155"/>
            <text x="105" y="28" text-anchor="middle" fill="#10b981" font-size="13.5" font-weight="700">3. 顯影洗淨 (TMAH 2.38%)</text>
            <text x="105" y="60" text-anchor="middle" fill="#cbd5e1" font-size="11">${isPos ? '光照區溶解 · 留下開口' : '未照光區溶解 · 留下立柱'}</text>
            
            <!-- 顯影後光阻殘留圖形 -->
            ${isPos ? `
              <!-- 正光阻：中間照光區被溶掉形成開口 -->
              <rect x="15" y="150" width="60" height="60" fill="#f59e0b"/>
              <rect x="135" y="150" width="60" height="60" fill="#f59e0b"/>
              <text x="105" y="185" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="700">開口 (Opening)</text>
            ` : `
              <!-- 負光阻：中間照光區留存，兩側溶掉 -->
              <rect x="75" y="150" width="60" height="60" fill="#047857"/>
              <text x="105" y="185" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">立柱 (Island)</text>
            `}
            <rect x="15" y="210" width="180" height="40" fill="#334155"/>
            <text x="105" y="235" text-anchor="middle" fill="#94a3b8" font-size="11">矽基板 (Si Substrate)</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">顯影液規格 (Developer)</div>
          <div class="eng-obj-metric-value">2.38% TMAH</div>
          <div class="eng-obj-metric-note">氫氧化四甲基銨強鹼水溶液</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">對比度 Contrast (γ)</div>
          <div class="eng-obj-metric-value">&gt; 12.0</div>
          <div class="eng-obj-metric-note">高陡直度側壁輪廓必備指標</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">線邊粗糙度 (LER / LWR)</div>
          <div class="eng-obj-metric-value">&lt; 1.2 nm</div>
          <div class="eng-obj-metric-note">受酸擴散長度與光子散粒噪聲影響</div>
        </div>
      `;

      footerNote = '化學增幅型抗蝕劑 (CAR) 透過微量 PAG 光酸產生劑引發後烘烤連鎖脫保護反應，將光量子靈敏度提升數百倍，是 7nm 以下極紫外光 (EUV) 微影克服光源功率不足的關鍵技術。';
    } else {
      // Step-and-Scan Slit
      controlsHtml = '';
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Step and Scan">
          <!-- 光罩載台掃描運動 (向左 4v) -->
          <g transform="translate(150, 40)">
            <rect x="0" y="0" width="500" height="80" rx="4" fill="#131e2b" stroke="#334155"/>
            <text x="20" y="26" fill="#f59e0b" font-size="13" font-weight="700">光罩台 (Reticle Stage) · 速度: 4v ← 掃描</text>
            <rect x="180" y="38" width="140" height="28" fill="#334155" stroke="#f59e0b" stroke-width="1.5"/>
            <!-- 掃描狹縫 (Exposure Slit) -->
            <rect x="230" y="38" width="40" height="28" fill="#38bdf8" opacity="0.8"/>
            <text x="250" y="56" text-anchor="middle" fill="#09131b" font-size="10.5" font-weight="700">狹縫 Slit</text>
          </g>

          <!-- 光學縮小投影中心箭頭 -->
          <path d="M 400,130 L 400,210" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 4"/>
          <text x="420" y="175" fill="#38bdf8" font-size="12" font-family="sans-serif">4:1 反向同步投影</text>

          <!-- 晶圓載台掃描運動 (向右 v) -->
          <g transform="translate(150, 220)">
            <rect x="0" y="0" width="500" height="90" rx="4" fill="#131e2b" stroke="#0284c7"/>
            <text x="20" y="26" fill="#38bdf8" font-size="13" font-weight="700">晶圓台 (Wafer Stage) · 速度: v → 步進掃描</text>
            <circle cx="250" cy="56" r="30" fill="#1e293b" stroke="#64748b"/>
            <!-- 曝光區域 (Die Exposure Field) -->
            <rect x="235" y="44" width="30" height="24" fill="#38bdf8" opacity="0.8"/>
            <text x="250" y="59" text-anchor="middle" fill="#09131b" font-size="9" font-weight="700">Die 1x</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">掃描視場 (Field Size)</div>
          <div class="eng-obj-metric-value">26 × 33 mm</div>
          <div class="eng-obj-metric-note">單次掃描最大標準曝光面積</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">套準精度 (Overlay Accuracy)</div>
          <div class="eng-obj-metric-value">&lt; 1.5 nm</div>
          <div class="eng-obj-metric-note">雙載台干涉儀即時反饋校正</div>
        </div>
      `;
      footerNote = '步進掃描 (Step-and-Scan) 讓光罩台與晶圓台以 4:1 的精確速度比反向高速動態掃描，僅透過狹窄的光學最佳像差中心狹縫 (Slit) 進行曝光，大幅降低大面積透鏡邊緣畸變。';
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh04Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 04</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh04Title">${t.ch04_title}</h2>
          <p class="eng-obj-subtitle">${t.ch04_sub}</p>
        </header>
        
        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'path' ? 'is-active' : ''}" data-tab="path">${t.ch04_tab_path}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'pr' ? 'is-active' : ''}" data-tab="pr">${t.ch04_tab_pr}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'scan' ? 'is-active' : ''}" data-tab="scan">${t.ch04_tab_scan}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
    container.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeOpticalMode = btn.getAttribute('data-mode');
        update();
      });
    });
    container.querySelectorAll('[data-prmode]').forEach(btn => {
      btn.addEventListener('click', () => {
        activePRMode = btn.getAttribute('data-prmode');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 2. Ch 05 薄膜沉積機制對比與 ALD 自限模型 (Thin Films & ALD Model)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderDepositionMechanismObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'ald'; // 'pvd' | 'cvd' | 'ald'
  let aldStep = 1; // 1 | 2 | 3 | 4
  let aldCycleCount = 1;
  let isAutoPlaying = false;
  let timerId = null;

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    let stepperBarHtml = '';

    if (activeTab === 'pvd') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PVD Sputtering Mechanism">
          <!-- 上方靶材 (Sputter Target) -->
          <rect x="250" y="30" width="300" height="28" rx="3" fill="#b45309" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="400" y="49" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">金屬靶材 (Sputter Target: Cu / Ti)</text>

          <!-- 氬離子轟擊與濺射原子粒子 (Line of sight) -->
          <g opacity="0.85">
            <!-- Ar+ 離子向上轟擊 -->
            <path d="M 320,110 L 340,65 M 480,110 L 460,65" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 3"/>
            <text x="310" y="125" fill="#38bdf8" font-size="11">Ar⁺ 離子轟擊</text>
            <!-- 濺射原子向下噴發 (視線直進) -->
            <path d="M 350,60 L 370,220 M 400,60 L 400,220 M 450,60 L 430,220" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" class="anim-ion"/>
          </g>

          <!-- 下方高深寬比深溝槽 (Trench Aspect Ratio 8:1) -->
          <g transform="translate(250, 190)">
            <!-- 矽基底邊框 -->
            <path d="M 20,20 L 100,20 L 100,210 L 200,210 L 200,20 L 280,20 L 280,230 L 20,230 Z" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            
            <!-- PVD 薄膜沉積輪廓 (明顯懸垂 Overhang 與孔底覆蓋不足) -->
            <!-- 表面平坦區：厚 (25px) -->
            <rect x="20" y="5" width="80" height="15" fill="#f59e0b"/>
            <rect x="200" y="5" width="80" height="15" fill="#f59e0b"/>
            
            <!-- 開口處懸垂 (Overhang / Pinch-off) -->
            <path d="M 90,20 Q 120,35 100,75 L 100,20 Z" fill="#d97706"/>
            <path d="M 210,20 Q 180,35 200,75 L 200,20 Z" fill="#d97706"/>
            
            <!-- 側壁中下段極薄 (3-5px) -->
            <rect x="100" y="75" width="4" height="135" fill="#f59e0b" opacity="0.6"/>
            <rect x="196" y="75" width="4" height="135" fill="#f59e0b" opacity="0.6"/>
            
            <!-- 底部沉積較薄 (6px) -->
            <rect x="100" y="204" width="100" height="6" fill="#f59e0b" opacity="0.7"/>

            <!-- 標註懸垂與空洞風險 -->
            <text x="320" y="50" fill="#f59e0b" font-size="12" font-weight="700">開口懸垂 (Overhang)</text>
            <path d="M 310,47 L 215,35" stroke="#f59e0b" stroke-width="1.2"/>
            <text x="150" y="140" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">空洞風險 (Void)</text>
            <text x="320" y="200" fill="#94a3b8" font-size="11.5">孔底覆蓋率僅 15-20%</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_coverage}</div>
          <div class="eng-obj-metric-value" style="color: #ef4444;">15% - 25%</div>
          <div class="eng-obj-metric-note">視線沉積導致深孔底部覆蓋嚴重不足</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_rate}</div>
          <div class="eng-obj-metric-value">0.5 - 2.0 nm/s</div>
          <div class="eng-obj-metric-note">高速金屬導體沉積</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_temp}</div>
          <div class="eng-obj-metric-value">室溫 ~ 150°C</div>
          <div class="eng-obj-metric-note">熱預算負擔低</div>
        </div>
      `;
      footerNote = t.ch05_pvd_desc;
    } else if (activeTab === 'cvd') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CVD Mechanism">
          <!-- 上方氣體前驅物分子雲 -->
          <g transform="translate(250, 30)">
            <rect x="0" y="0" width="300" height="35" rx="3" fill="#0284c7" stroke="#38bdf8"/>
            <text x="150" y="22" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700">前驅反應氣體 (SiH₄ + O₂ / WF₆ + H₂)</text>
          </g>

          <!-- 擴散氣體分子 (擴散進孔內) -->
          <g fill="#38bdf8" opacity="0.75">
            <circle cx="360" cy="100" r="4"/><circle cx="430" cy="110" r="4"/>
            <circle cx="390" cy="140" r="4"/><circle cx="410" cy="170" r="4"/>
            <circle cx="380" cy="220" r="3"/><circle cx="420" cy="260" r="3"/>
          </g>

          <!-- 下方高深寬比深溝槽 (CVD 階梯覆蓋約 75%) -->
          <g transform="translate(250, 170)">
            <path d="M 20,20 L 100,20 L 100,210 L 200,210 L 200,20 L 280,20 L 280,230 L 20,230 Z" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            
            <!-- CVD 薄膜 (較均勻，但頂部仍略厚於底部) -->
            <!-- 表面：厚 16px -->
            <rect x="20" y="4" width="80" height="16" fill="#0284c7"/>
            <rect x="200" y="4" width="80" height="16" fill="#0284c7"/>
            <!-- 側壁：厚 12px (上段) 漸變至 9px (下段) -->
            <path d="M 100,20 L 112,20 L 109,210 L 100,210 Z" fill="#0284c7"/>
            <path d="M 200,20 L 188,20 L 191,210 L 200,210 Z" fill="#0284c7"/>
            <!-- 底部：厚 10px -->
            <rect x="100" y="200" width="100" height="10" fill="#0284c7"/>

            <text x="310" y="80" fill="#38bdf8" font-size="12" font-weight="700">表面反應擴散成膜</text>
            <text x="310" y="110" fill="#94a3b8" font-size="11.5">階梯覆蓋率約 70% - 85%</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_coverage}</div>
          <div class="eng-obj-metric-value" style="color: #0284c7;">70% - 85%</div>
          <div class="eng-obj-metric-note">分子擴散提供良好階梯覆蓋</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_rate}</div>
          <div class="eng-obj-metric-value">10 - 100 nm/min</div>
          <div class="eng-obj-metric-note">介電層與多晶矽主流成膜技術</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_temp}</div>
          <div class="eng-obj-metric-value">350°C ~ 750°C</div>
          <div class="eng-obj-metric-note">需考量元件熱預算 (Thermal Budget)</div>
        </div>
      `;
      footerNote = t.ch05_cvd_desc;
    } else {
      // ALD 4-Step Self-Limiting Cycle
      const thicknessNm = (aldCycleCount * 0.11).toFixed(2);
      const stepTitle = t[`ch05_step_${aldStep}`];

      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ALD 4-Step Cycle">
          <!-- 步驟標題指示 -->
          <rect x="200" y="25" width="400" height="34" rx="4" fill="#0f766e" stroke="#14b8a6"/>
          <text x="400" y="47" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">${stepTitle}</text>

          <!-- 4 步驟進度膠囊 -->
          <g transform="translate(240, 75)">
            <rect x="0" y="0" width="70" height="8" rx="2" fill="${aldStep === 1 ? '#14b8a6' : '#334155'}"/>
            <rect x="80" y="0" width="70" height="8" rx="2" fill="${aldStep === 2 ? '#14b8a6' : '#334155'}"/>
            <rect x="160" y="0" width="70" height="8" rx="2" fill="${aldStep === 3 ? '#14b8a6' : '#334155'}"/>
            <rect x="240" y="0" width="70" height="8" rx="2" fill="${aldStep === 4 ? '#14b8a6' : '#334155'}"/>
          </g>

          <!-- 下方高深寬比深溝槽 (ALD 100% 保形性，等厚度沉積) -->
          <g transform="translate(250, 140)">
            <path d="M 20,20 L 100,20 L 100,230 L 200,230 L 200,20 L 280,20 L 280,250 L 20,250 Z" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            
            <!-- 累計等厚原子層 (100% 完美保形) -->
            <!-- 根據 aldCycleCount 繪製均勻薄層 (每循環增加 3px) -->
            <path d="M 20,${20 - aldCycleCount * 3} L 100,${20 - aldCycleCount * 3} L 100,230 L 200,230 L 200,${20 - aldCycleCount * 3} L 280,${20 - aldCycleCount * 3} L 280,20 L 200,20 L 200,${230 - aldCycleCount * 3} L 100,${230 - aldCycleCount * 3} L 100,20 L 20,20 Z" fill="#14b8a6" opacity="0.9"/>

            <!-- 步驟動態指示微觀球體 -->
            ${aldStep === 1 ? `
              <!-- Pulse A 前驅物分子飽和吸附 -->
              <g fill="#f59e0b">
                <circle cx="60" cy="15" r="4"/><circle cx="85" cy="15" r="4"/><circle cx="215" cy="15" r="4"/><circle cx="240" cy="15" r="4"/>
                <circle cx="104" cy="60" r="4"/><circle cx="104" cy="120" r="4"/><circle cx="104" cy="180" r="4"/>
                <circle cx="196" cy="60" r="4"/><circle cx="196" cy="120" r="4"/><circle cx="196" cy="180" r="4"/>
                <circle cx="130" cy="226" r="4"/><circle cx="170" cy="226" r="4"/>
              </g>
              <text x="310" y="80" fill="#f59e0b" font-size="12" font-weight="700">前驅物 A 自限單分子吸附</text>
              <text x="310" y="105" fill="#94a3b8" font-size="11.5">表面活性位點飽和後反應自動停止</text>
            ` : ''}

            ${aldStep === 2 ? `
              <!-- Purge A 吹掃 -->
              <g stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 3">
                <line x1="150" y1="50" x2="150" y2="200"/>
              </g>
              <text x="310" y="80" fill="#38bdf8" font-size="12" font-weight="700">N₂ 吹除未吸附多餘分子</text>
              <text x="310" y="105" fill="#94a3b8" font-size="11.5">避免前驅物在氣相中提早反應</text>
            ` : ''}

            ${aldStep === 3 ? `
              <!-- Pulse B 反應物形成單原子層 -->
              <g fill="#38bdf8">
                <circle cx="104" cy="80" r="4"/><circle cx="104" cy="140" r="4"/>
                <circle cx="196" cy="80" r="4"/><circle cx="196" cy="140" r="4"/>
                <circle cx="150" cy="226" r="4"/>
              </g>
              <text x="310" y="80" fill="#14b8a6" font-size="12" font-weight="700">前驅物 B 化學鍵結成膜</text>
              <text x="310" y="105" fill="#94a3b8" font-size="11.5">反應生成 Al-O 單一原子層</text>
            ` : ''}

            ${aldStep === 4 ? `
              <!-- Purge B 吹掃副產物 -->
              <text x="310" y="80" fill="#10b981" font-size="12" font-weight="700">吹除反應副產物 (CH₄)</text>
              <text x="310" y="105" fill="#94a3b8" font-size="11.5">恢復表面活性羥基，完成 1 循環！</text>
            ` : ''}

            <text x="150" y="160" text-anchor="middle" fill="#14b8a6" font-size="12" font-weight="700">100% 完美保形階梯覆蓋</text>
          </g>
        </svg>
      `;

      stepperBarHtml = `
        <div class="eng-obj-stepper-bar">
          <div class="eng-obj-stepper-actions">
            <button type="button" class="eng-obj-btn eng-obj-btn-primary" id="aldNextBtn">${t.btn_next_step}</button>
            <button type="button" class="eng-obj-btn" id="aldPlayBtn">${isAutoPlaying ? t.btn_pause : t.btn_auto_play}</button>
            <button type="button" class="eng-obj-btn" id="aldResetBtn">${t.btn_reset}</button>
          </div>
          <div class="eng-obj-stepper-info">
            <span>${t.ch05_ald_cycle_count} <strong>${aldCycleCount}</strong></span>
            <span>${t.ch05_ald_thickness} <strong>${thicknessNm} nm</strong></span>
            <span>${t.ch05_ald_conformality} <strong style="color: var(--semi-teal);">100%</strong></span>
          </div>
        </div>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_coverage}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">100% 完美保形</div>
          <div class="eng-obj-metric-note">側壁、孔底、角落厚度完全等厚</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch05_metric_uniformity}</div>
          <div class="eng-obj-metric-value">0.11 nm / cycle</div>
          <div class="eng-obj-metric-note">精確單原子分子層成長控制 (GPC)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">主要關鍵應用</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">HKMG 閘極介電層</div>
          <div class="eng-obj-metric-note">3D NAND 高深寬比穿孔、DRAM 電容</div>
        </div>
      `;

      footerNote = t.ch05_ald_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh05Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 05</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh05Title">${t.ch05_title}</h2>
          <p class="eng-obj-subtitle">${t.ch05_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'pvd' ? 'is-active' : ''}" data-tab="pvd">${t.ch05_tab_pvd}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'cvd' ? 'is-active' : ''}" data-tab="cvd">${t.ch05_tab_cvd}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'ald' ? 'is-active' : ''}" data-tab="ald">${t.ch05_tab_ald}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        ${stepperBarHtml}

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (timerId) clearInterval(timerId);
        isAutoPlaying = false;
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    const nextBtn = container.querySelector('#aldNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        aldStep++;
        if (aldStep > 4) {
          aldStep = 1;
          aldCycleCount++;
        }
        update();
      });
    }

    const playBtn = container.querySelector('#aldPlayBtn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        isAutoPlaying = !isAutoPlaying;
        if (isAutoPlaying) {
          timerId = setInterval(() => {
            aldStep++;
            if (aldStep > 4) {
              aldStep = 1;
              aldCycleCount++;
              if (aldCycleCount > 6) aldCycleCount = 1;
            }
            update();
          }, 850);
        } else {
          if (timerId) clearInterval(timerId);
        }
        update();
      });
    }

    const resetBtn = container.querySelector('#aldResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (timerId) clearInterval(timerId);
        isAutoPlaying = false;
        aldStep = 1;
        aldCycleCount = 1;
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 3. Ch 06 電漿蝕刻腔體結構與非等向性輪廓模型 (Plasma Etch & Profile Model)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderPlasmaEtchObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'chamber'; // 'chamber' | 'profile' | 'anomalies'
  let rfSourcePower = 80; // 0 ~ 100
  let rfBiasPower = 60;   // 0 ~ 100

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'chamber') {
      const plasmaBrightness = 0.4 + (rfSourcePower / 100) * 0.55;
      const biasVoltage = Math.round(150 + (rfBiasPower / 100) * 550);
      const ionSpeedY = Math.round(18 + (rfBiasPower / 100) * 14);

      viewportHtml = `
        <svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ICP Plasma Chamber">
          <!-- 腔體外壁 (Chamber Wall) -->
          <rect x="180" y="20" width="440" height="420" rx="8" fill="#09131b" stroke="#334155" stroke-width="2"/>

          <!-- 頂部氣體噴淋板 (Showerhead) -->
          <rect x="240" y="30" width="320" height="20" rx="3" fill="#334155" stroke="#64748b"/>
          <!-- 噴淋小孔與氣體通入 -->
          <g fill="#38bdf8">
            <circle cx="280" cy="40" r="2.5"/><circle cx="320" cy="40" r="2.5"/><circle cx="360" cy="40" r="2.5"/>
            <circle cx="400" cy="40" r="2.5"/><circle cx="440" cy="40" r="2.5"/><circle cx="480" cy="40" r="2.5"/><circle cx="520" cy="40" r="2.5"/>
          </g>
          <text x="400" y="24" text-anchor="middle" fill="#94a3b8" font-size="11">${t.ch06_showerhead}</text>

          <!-- ICP 高頻感應線圈 (13.56 MHz Coil) -->
          <g stroke="#f59e0b" stroke-width="3" fill="none">
            <circle cx="220" cy="110" r="14"/><circle cx="220" cy="150" r="14"/>
            <circle cx="580" cy="110" r="14"/><circle cx="580" cy="150" r="14"/>
          </g>
          <text x="160" y="135" text-anchor="end" fill="#f59e0b" font-size="11.5" font-weight="700">ICP RF Source Coil</text>
          <text x="160" y="150" text-anchor="end" fill="#94a3b8" font-size="10.5">13.56 MHz (密度控制)</text>

          <!-- 高密度電漿輝光區 (Plasma Glow Discharge) -->
          <ellipse cx="400" cy="170" rx="170" ry="85" fill="rgba(113, 236, 227, ${plasmaBrightness})" filter="drop-shadow(0 0 16px rgba(56, 189, 248, 0.7))" class="anim-plasma"/>
          <text x="400" y="165" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700">${t.ch06_plasma_glow}</text>
          <text x="400" y="185" text-anchor="middle" fill="#e0f2fe" font-size="11.5">離子: Ar⁺, CF₃⁺ | 自由基: F*, Cl* (密度: 10¹¹ cm⁻³)</text>

          <!-- 電漿鞘層 (Plasma Sheath - 暗區電壓降) -->
          <rect x="240" y="270" width="320" height="24" fill="rgba(15, 23, 42, 0.6)" stroke="#0284c7" stroke-dasharray="4 3"/>
          <text x="575" y="286" fill="#38bdf8" font-size="11">${t.ch06_sheath} (-Vdc: ${biasVoltage} V)</text>

          <!-- 離子加速垂直箭頭 -->
          <g stroke="#71ece3" stroke-width="${1.5 + (rfBiasPower / 100) * 1.5}" opacity="0.85">
            <line x1="320" y1="260" x2="320" y2="${260 + ionSpeedY}"/>
            <line x1="400" y1="260" x2="400" y2="${260 + ionSpeedY}"/>
            <line x1="480" y1="260" x2="480" y2="${260 + ionSpeedY}"/>
          </g>

          <!-- 300mm 晶圓載台與靜電吸盤 (ESC) -->
          <rect x="250" y="295" width="300" height="8" rx="2" fill="#38bdf8"/>
          <text x="160" y="302" text-anchor="end" fill="#38bdf8" font-size="12" font-weight="700">300mm 晶圓</text>
          
          <rect x="230" y="305" width="340" height="45" rx="3" fill="#1e293b" stroke="#0284c7" stroke-width="1.5"/>
          <text x="400" y="325" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700">${t.ch06_esc}</text>
          <text x="400" y="342" text-anchor="middle" fill="#94a3b8" font-size="11">He 背面氦氣冷卻 (10 Torr, 25°C)</text>

          <!-- 下方 RF 偏壓產生器 (RF Bias Generator) -->
          <rect x="330" y="365" width="140" height="30" rx="3" fill="#0f172a" stroke="#0284c7"/>
          <text x="400" y="384" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="700">RF Bias (2 MHz)</text>
          <path d="M 400,350 L 400,365" stroke="#0284c7" stroke-width="2"/>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">RF Source Power (${rfSourcePower}%)</div>
          <div class="eng-obj-metric-value">${(rfSourcePower * 15).toFixed(0)} W</div>
          <div class="eng-obj-metric-note">直接調控電漿離子通量 (Ion Density)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">自偏壓 Self-Bias (-Vdc)</div>
          <div class="eng-obj-metric-value" style="color: #f59e0b;">-${biasVoltage} V</div>
          <div class="eng-obj-metric-note">垂直加速正離子之轟擊動能</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">RF 雙頻解耦架構</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">獨立解耦</div>
          <div class="eng-obj-metric-note">同時滿足高速蝕刻與高選擇比垂直側壁</div>
        </div>
      `;

      footerNote = t.ch06_etch_footer;
    } else if (activeTab === 'profile') {
      // 非等向性蝕刻微觀機制
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anisotropic Etch Profile">
          <g transform="translate(180, 40)">
            <!-- 矽基底與垂直溝槽 -->
            <path d="M 20,40 L 130,40 L 130,280 L 310,280 L 310,40 L 420,40 L 420,320 L 20,320 Z" fill="#1e293b" stroke="#334155" stroke-width="2"/>

            <!-- 光阻遮罩 (Photoresist Mask) -->
            <rect x="20" y="0" width="110" height="40" fill="#f59e0b" opacity="0.9"/>
            <rect x="310" y="0" width="110" height="40" fill="#f59e0b" opacity="0.9"/>
            <text x="75" y="25" text-anchor="middle" fill="#09131b" font-size="12" font-weight="700">光阻遮罩 (PR)</text>
            <text x="365" y="25" text-anchor="middle" fill="#09131b" font-size="12" font-weight="700">光阻遮罩 (PR)</text>

            <!-- 側壁鈍化聚合物膜 (Passivation Polymer Film, 如 CFx) -->
            <rect x="127" y="40" width="7" height="240" fill="#10b981"/>
            <rect x="306" y="40" width="7" height="240" fill="#10b981"/>
            <text x="145" y="160" fill="#10b981" font-size="11.5" font-weight="700">側壁鈍化層 (CFx)</text>
            <text x="145" y="176" fill="#94a3b8" font-size="10">阻止自由基側向掏空</text>

            <!-- 垂直高能離子轟擊 (打擊底部，打散鍵結) -->
            <g stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arrow)">
              <line x1="200" y1="20" x2="200" y2="265" class="anim-ion"/>
              <line x1="240" y1="20" x2="240" y2="265" class="anim-ion"/>
            </g>
            <text x="220" y="110" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">正離子垂直轟擊 (Ar⁺, CF₃⁺)</text>

            <!-- 自由基中性擴散反應 (F*, Cl*) -->
            <g fill="#e0f2fe" opacity="0.8">
              <circle cx="180" cy="230" r="3"/><circle cx="260" cy="230" r="3"/>
              <circle cx="210" cy="270" r="3"/><circle cx="230" cy="270" r="3"/>
            </g>

            <!-- 底部化學揮發反應揮發出氣體 (SiF4) -->
            <text x="220" y="274" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">化學反應脫附 (SiF₄ ↑)</text>
            
            <!-- 90° 垂直陡直標註 -->
            <path d="M 310,260 L 295,260 L 295,280" stroke="#f59e0b" stroke-width="1.5" fill="none"/>
            <text x="275" y="255" fill="#f59e0b" font-size="12" font-weight="700">89.8° 垂直</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">側壁垂直度 (Profile Angle)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">89.5° ~ 90.0°</div>
          <div class="eng-obj-metric-note">極致非等向性 (Anisotropic) 輪廓</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">矽對光阻選擇比 (Selectivity)</div>
          <div class="eng-obj-metric-value">&gt; 25 : 1</div>
          <div class="eng-obj-metric-note">保護遮罩在長蝕刻時間下不被穿透</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">側壁保護機制</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">碳氟聚合物 (CFx)</div>
          <div class="eng-obj-metric-note">離子只打底部，側壁免於側蝕</div>
        </div>
      `;
      footerNote = '非等向性蝕刻的核心在於「物理離子轟擊打碎底部晶格 + 化學自由基結合揮發 + 側壁鈍化膜保護免於橫向掏空」，三位一體實現深寬比超過 20:1 的筆直奈米溝槽。';
    } else {
      // 異常與微負載效應 (Anomalies & RIE Lag)
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Etch Anomalies">
          <!-- 1. 正常垂直 (Ideal) -->
          <g transform="translate(60, 40)">
            <text x="70" y="20" text-anchor="middle" fill="#10b981" font-size="12" font-weight="700">${t.ch06_profile_ideal}</text>
            <path d="M 10,40 L 45,40 L 45,220 L 95,220 L 95,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
            <rect x="10" y="25" width="35" height="15" fill="#f59e0b"/>
            <rect x="95" y="25" width="35" height="15" fill="#f59e0b"/>
          </g>

          <!-- 2. 底切掏空 (Undercut) -->
          <g transform="translate(240, 40)">
            <text x="70" y="20" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">${t.ch06_profile_undercut}</text>
            <path d="M 10,40 L 45,40 Q 20,110 45,220 L 95,220 Q 120,110 95,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <rect x="10" y="25" width="35" height="15" fill="#f59e0b"/>
            <rect x="95" y="25" width="35" height="15" fill="#f59e0b"/>
          </g>

          <!-- 3. 側壁鼓出 (Bowing) -->
          <g transform="translate(420, 40)">
            <text x="70" y="20" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="700">${t.ch06_profile_bowing}</text>
            <path d="M 10,40 L 45,40 Q 30,100 45,220 L 95,220 Q 110,100 95,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <rect x="10" y="25" width="35" height="15" fill="#f59e0b"/>
            <rect x="95" y="25" width="35" height="15" fill="#f59e0b"/>
          </g>

          <!-- 4. RIE 延遲 (RIE Lag) -->
          <g transform="translate(600, 40)">
            <text x="70" y="20" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">${t.ch06_profile_lag}</text>
            <!-- 寬槽 (深) -->
            <path d="M 10,40 L 30,40 L 30,220 L 70,220 L 70,40 L 85,40 L 85,150 L 105,150 L 105,40 L 130,40 L 130,240 L 10,240 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="50" y="235" text-anchor="middle" fill="#38bdf8" font-size="10">寬槽深</text>
            <text x="95" y="165" text-anchor="middle" fill="#ef4444" font-size="10">窄孔淺</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">RIE Lag 根本成因</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">Knudsen 分子擴散受限</div>
          <div class="eng-obj-metric-note">窄高深寬比孔徑使中性氣體交換速率驟降</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">終點偵測技術 (EPD)</div>
          <div class="eng-obj-metric-value">OES 光發射光譜</div>
          <div class="eng-obj-metric-note">監控特定反應波長突變精準停止蝕刻</div>
        </div>
      `;
      footerNote = '在同片晶圓上，大面積開口蝕刻速度快、深寬比大的微小穿孔蝕刻速度慢，稱為 RIE 延遲 (RIE Lag)；需仰賴過蝕刻 (Over-Etch) 與終點偵測 (EPD) 確保所有孔洞完全貫穿。';
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh06Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 06</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh06Title">${t.ch06_title}</h2>
          <p class="eng-obj-subtitle">${t.ch06_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'chamber' ? 'is-active' : ''}" data-tab="chamber">${t.ch06_tab_chamber}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'profile' ? 'is-active' : ''}" data-tab="profile">${t.ch06_tab_profile}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'anomalies' ? 'is-active' : ''}" data-tab="anomalies">${t.ch06_tab_anomalies}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 4. Ch 12 電晶體架構演進立體等角模型 (Planar -> FinFET -> GAA Nanosheet)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderTransistor3DObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeGen = 'finfet'; // 'planar' | 'finfet' | 'gaa'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeGen === 'planar') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2D Planar MOSFET 3D Cutaway">
          <g transform="translate(180, 80)">
            <!-- 3D 等角投影基底 (Silicon Substrate Base) -->
            <!-- 頂面 -->
            <polygon points="220,40 380,120 180,220 20,140" fill="#334155" stroke="#475569" stroke-width="1.2"/>
            <!-- 正側面 -->
            <polygon points="20,140 180,220 180,260 20,180" fill="#1e293b" stroke="#334155"/>
            <!-- 右側面 -->
            <polygon points="180,220 380,120 380,160 180,260" fill="#0f172a" stroke="#334155"/>

            <!-- 源極 (Source N+) 與汲極 (Drain N+) -->
            <polygon points="60,120 120,150 90,165 30,135" fill="#f59e0b"/>
            <text x="50" y="145" fill="#09131b" font-size="10.5" font-weight="700">Source (N⁺)</text>

            <polygon points="280,100 340,130 310,145 250,115" fill="#f59e0b"/>
            <text x="310" y="125" fill="#09131b" font-size="10.5" font-weight="700">Drain (N⁺)</text>

            <!-- 2D 通道 (Channel - 僅限表面單一平面薄層) -->
            <polygon points="140,110 240,160 210,175 110,125" fill="#0284c7" opacity="0.85"/>
            <text x="175" y="145" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">2D 表面通道 (單面控制)</text>

            <!-- 閘極氧化層與金屬閘極 (Gate Electrode) -->
            <!-- 閘極立體方塊跨在頂部表面 -->
            <polygon points="175,70 235,100 175,130 115,100" fill="#64748b" stroke="#94a3b8"/>
            <polygon points="115,100 175,130 175,145 115,115" fill="#475569" stroke="#64748b"/>
            <polygon points="175,130 235,100 235,115 175,145" fill="#334155" stroke="#64748b"/>
            <text x="175" y="95" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">Gate 閘極</text>

            <!-- 漏電路徑標註 -->
            <path d="M 100,165 Q 180,210 260,135" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
            <text x="180" y="205" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700">基底短通道穿透漏電 (DIBL Leakage)</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_gate_wrap}</div>
          <div class="eng-obj-metric-value">1 面控制 (Top Single Gate)</div>
          <div class="eng-obj-metric-note">僅覆蓋二維通道頂部表面</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_ss_metric}</div>
          <div class="eng-obj-metric-value" style="color: #ef4444;">85 - 100 mV/dec</div>
          <div class="eng-obj-metric-note">次臨界漏電高，開關關不緊</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_node_span}</div>
          <div class="eng-obj-metric-value">28nm ~ 20nm 以前</div>
          <div class="eng-obj-metric-note">微縮至 20nm 遭遇物理極限</div>
        </div>
      `;
      footerNote = t.ch12_planar_desc;
    } else if (activeGen === 'finfet') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D FinFET Isometric Cutaway">
          <g transform="translate(180, 80)">
            <!-- 3D 矽基底 (Substrate) -->
            <polygon points="220,50 380,130 180,230 20,150" fill="#334155" stroke="#475569" stroke-width="1.2"/>
            <polygon points="20,150 180,230 180,270 20,190" fill="#1e293b" stroke="#334155"/>
            <polygon points="180,230 380,130 380,170 180,270" fill="#0f172a" stroke="#334155"/>

            <!-- 垂直立起的立體矽鰭片 (Vertical Silicon Fin: 高度 45nm, 寬度 6nm) -->
            <polygon points="80,100 320,70 320,150 80,180" fill="#0284c7" opacity="0.6"/>
            <!-- 鰭片頂部與前端 -->
            <polygon points="80,100 120,80 320,70 280,90" fill="#38bdf8"/>
            <polygon points="80,100 80,180 120,160 120,80" fill="#0369a1"/>

            <!-- 閘極立體三面包覆 (Tri-Gate: 跨坐包覆頂面、左側面、右側面) -->
            <!-- 閘極橫跨在鰭片中間 -->
            <polygon points="180,40 240,70 240,170 180,140" fill="#64748b" opacity="0.9" stroke="#94a3b8"/>
            <polygon points="180,40 200,30 260,60 240,70" fill="#94a3b8"/>
            <polygon points="240,70 260,60 260,160 240,170" fill="#475569"/>

            <!-- 標註立體三面包覆 -->
            <text x="210" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">Tri-Gate (三面包覆閘極)</text>
            <path d="M 210,32 L 210,65" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2 2"/>

            <!-- 源極與汲極磊晶塊 (Raised Epitaxial S/D) -->
            <polygon points="90,110 130,90 140,140 100,160" fill="#f59e0b"/>
            <text x="75" y="165" fill="#f59e0b" font-size="11" font-weight="700">Source Fin</text>

            <polygon points="270,75 310,55 320,105 280,125" fill="#f59e0b"/>
            <text x="325" y="70" fill="#f59e0b" font-size="11" font-weight="700">Drain Fin</text>

            <!-- 標註等效通道寬度 Weff = 2*Hfin + Wfin -->
            <text x="200" y="210" text-anchor="middle" fill="#71ece3" font-size="12" font-weight="700">Weff = 2·H_fin + W_fin (大驅動電流 / 漏電驟降)</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_gate_wrap}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">3 面立體包覆 (Tri-Gate)</div>
          <div class="eng-obj-metric-note">頂部 + 兩側鰭片垂直立體控制</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_ss_metric}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">68 - 72 mV/dec</div>
          <div class="eng-obj-metric-note">靜電抑制力極佳，漏電流大幅下降 10 倍</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_node_span}</div>
          <div class="eng-obj-metric-value">16nm ~ 3nm 世代</div>
          <div class="eng-obj-metric-note">台積電 / Intel / 三星黃金十年主力架構</div>
        </div>
      `;
      footerNote = t.ch12_finfet_desc;
    } else {
      // 3D GAA Nanosheet
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D GAA Nanosheet Isometric Cutaway">
          <g transform="translate(180, 80)">
            <!-- 3D 矽基底 (Substrate) -->
            <polygon points="220,50 380,130 180,230 20,150" fill="#334155" stroke="#475569" stroke-width="1.2"/>
            <polygon points="20,150 180,230 180,270 20,190" fill="#1e293b" stroke="#334155"/>
            <polygon points="180,230 380,130 380,170 180,270" fill="#0f172a" stroke="#334155"/>

            <!-- 垂直堆疊的 3 層超薄水平奈米片通道 (Stacked Nanosheets: 厚 5nm, 寬 30nm) -->
            <!-- 奈米片 3 (頂層) -->
            <polygon points="90,70 310,40 330,50 110,80" fill="#38bdf8"/>
            <!-- 奈米片 2 (中層) -->
            <polygon points="90,95 310,65 330,75 110,105" fill="#38bdf8"/>
            <!-- 奈米片 1 (底層) -->
            <polygon points="90,120 310,90 330,100 110,130" fill="#38bdf8"/>

            <!-- 閘極金屬 360° 全方位穿插環繞包覆 (Gate-All-Around) -->
            <!-- 環繞每片奈米片四周 -->
            <path d="M 180,30 L 240,60 L 240,160 L 180,130 Z" fill="#64748b" opacity="0.8" stroke="#38bdf8" stroke-width="1.2"/>
            <!-- 穿插在奈米片間隙中的閘極金屬 -->
            <rect x="195" y="75" width="30" height="8" fill="#10b981" opacity="0.9"/>
            <rect x="195" y="100" width="30" height="8" fill="#10b981" opacity="0.9"/>

            <text x="210" y="20" text-anchor="middle" fill="#10b981" font-size="12" font-weight="700">GAA 360° 全環繞閘極 (Gate-All-Around)</text>
            <text x="345" y="45" fill="#38bdf8" font-size="11" font-weight="700">3層堆疊奈米片</text>

            <!-- 次世代背面供電網路 (Backside Power Delivery Network - BSPDN) -->
            <path d="M 100,240 L 100,275 M 260,190 L 260,275" stroke="#f59e0b" stroke-width="3"/>
            <text x="180" y="260" text-anchor="middle" fill="#f59e0b" font-size="11.5" font-weight="700">背面供電網路 (BSPDN / SuperPower Rail)</text>
            <text x="180" y="278" text-anchor="middle" fill="#94a3b8" font-size="10.5">電源線移至晶圓背部 · 正面純繞訊號</text>
          </g>
        </svg>
      `;
      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_gate_wrap}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">4 面 360° 全環繞 (GAA)</div>
          <div class="eng-obj-metric-note">穿插環繞多層奈米片四周，消除漏電盲區</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_ss_metric}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">63 - 65 mV/dec</div>
          <div class="eng-obj-metric-note">逼近熱力學極限 (60 mV/dec)，開關極度敏捷</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch12_node_span}</div>
          <div class="eng-obj-metric-value">2nm (N2 / A16 / 18A)</div>
          <div class="eng-obj-metric-note">結合背面供電 (BSPDN) 邁入埃米 (Angstrom) 時代</div>
        </div>
      `;
      footerNote = t.ch12_gaa_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh12Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 12</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh12Title">${t.ch12_title}</h2>
          <p class="eng-obj-subtitle">${t.ch12_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeGen === 'planar' ? 'is-active' : ''}" data-gen="planar">${t.ch12_tab_planar}</button>
            <button type="button" class="eng-obj-tab ${activeGen === 'finfet' ? 'is-active' : ''}" data-gen="finfet">${t.ch12_tab_finfet}</button>
            <button type="button" class="eng-obj-tab ${activeGen === 'gaa' ? 'is-active' : ''}" data-gen="gaa">${t.ch12_tab_gaa}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-gen]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeGen = btn.getAttribute('data-gen');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 5. Ch 07 離子佈植機光路偏轉與晶格退火活化模型 (Ion Implantation & Anneal)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderIonImplantObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'beamline'; // 'beamline' | 'anneal' | 'channeling'
  let activeSpecies = 'b'; // 'b' | 'p' | 'as'

  const SPECIES_CONFIG = {
    b: { name: '¹¹B⁺ (硼)', mass: 11, radius: 100, range: '85 nm', dose: '2.0 × 10¹⁵ cm⁻²', energy: '30 keV', color: '#38bdf8' },
    p: { name: '³¹P⁺ (磷)', mass: 31, radius: 135, range: '45 nm', dose: '1.0 × 10¹⁵ cm⁻²', energy: '30 keV', color: '#f59e0b' },
    as: { name: '⁷⁵As⁺ (砷)', mass: 75, radius: 170, range: '25 nm', dose: '3.5 × 10¹⁵ cm⁻²', energy: '30 keV', color: '#10b981' }
  };

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    const cur = SPECIES_CONFIG[activeSpecies];

    if (activeTab === 'beamline') {
      controlsHtml = `
        <div class="eng-obj-tab-group" role="tablist">
          <button type="button" class="eng-obj-tab ${activeSpecies === 'b' ? 'is-active' : ''}" data-species="b">${t.ch07_species_b}</button>
          <button type="button" class="eng-obj-tab ${activeSpecies === 'p' ? 'is-active' : ''}" data-species="p">${t.ch07_species_p}</button>
          <button type="button" class="eng-obj-tab ${activeSpecies === 'as' ? 'is-active' : ''}" data-species="as">${t.ch07_species_as}</button>
        </div>
      `;

      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ion Implanter Beamline">
          <!-- 1. 離子源 (Ion Source) -->
          <rect x="40" y="50" width="110" height="70" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <circle cx="95" cy="85" r="16" fill="rgba(56, 189, 248, 0.4)" filter="drop-shadow(0 0 8px #38bdf8)" class="anim-plasma"/>
          <text x="95" y="68" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">離子源室</text>
          <text x="95" y="112" text-anchor="middle" fill="#94a3b8" font-size="9.5">電弧放電電漿</text>

          <!-- 取出電極與初始離子束 -->
          <line x1="150" y1="85" x2="220" y2="85" stroke="${cur.color}" stroke-width="3" stroke-dasharray="6 3" class="anim-beam"/>

          <!-- 2. 90° 質量分析磁鐵 (Mass Analyzer Magnet) -->
          <path d="M 220,40 L 340,40 A 150 150 0 0 1 340,240 L 220,240 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" opacity="0.85"/>
          <text x="270" y="135" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="700">90° 分析磁鐵</text>
          <text x="270" y="152" text-anchor="middle" fill="#94a3b8" font-size="10">r = mv / qB</text>

          <!-- 磁場內偏轉離子軌跡 (B vs P vs As) -->
          <!-- 輕離子 (Boron) 偏轉半徑小 -->
          <path d="M 220,85 Q 280,85 280,210" fill="none" stroke="#38bdf8" stroke-width="${activeSpecies === 'b' ? 3.5 : 1.2}" stroke-dasharray="${activeSpecies === 'b' ? 'none' : '3 3'}" opacity="${activeSpecies === 'b' ? 1 : 0.4}"/>
          <!-- 中離子 (Phosphorus) -->
          <path d="M 220,85 Q 310,85 310,210" fill="none" stroke="#f59e0b" stroke-width="${activeSpecies === 'p' ? 3.5 : 1.2}" stroke-dasharray="${activeSpecies === 'p' ? 'none' : '3 3'}" opacity="${activeSpecies === 'p' ? 1 : 0.4}"/>
          <!-- 重離子 (Arsenic) 偏轉半徑大 -->
          <path d="M 220,85 Q 340,85 340,210" fill="none" stroke="#10b981" stroke-width="${activeSpecies === 'as' ? 3.5 : 1.2}" stroke-dasharray="${activeSpecies === 'as' ? 'none' : '3 3'}" opacity="${activeSpecies === 'as' ? 1 : 0.4}"/>

          <!-- 3. 質量分析狹縫 (Resolving Slit) -->
          <rect x="250" y="210" width="${activeSpecies === 'b' ? 20 : (activeSpecies === 'p' ? 50 : 80)}" height="10" fill="#64748b"/>
          <rect x="${activeSpecies === 'b' ? 290 : (activeSpecies === 'p' ? 320 : 350)}" y="210" width="80" height="10" fill="#64748b"/>
          <text x="400" y="218" fill="#e2e8f0" font-size="11">質量分析狹縫 (濾除雜質)</text>

          <!-- 選中目標離子束向下進入加速管 -->
          <line x1="${activeSpecies === 'b' ? 280 : (activeSpecies === 'p' ? 310 : 340)}" y1="220" x2="480" y2="340" stroke="${cur.color}" stroke-width="3" stroke-dasharray="4 2" class="anim-beam"/>

          <!-- 4. 線性加速管 (Post-Acceleration Column) -->
          <g transform="translate(430, 290)">
            <rect x="0" y="0" width="130" height="70" rx="3" fill="#131e2b" stroke="#0284c7" stroke-width="1.2"/>
            <text x="65" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">高壓加速管</text>
            <text x="65" y="42" text-anchor="middle" fill="#94a3b8" font-size="9.5">+300 kV 加速極板</text>
            <!-- 加速電極環 -->
            <line x1="20" y1="52" x2="110" y2="52" stroke="#64748b" stroke-width="3"/>
          </g>

          <!-- 5. 掃描板與終端晶圓盤 (Wafer Endstation) -->
          <g transform="translate(630, 280)">
            <rect x="0" y="0" width="130" height="90" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
            <!-- 傾斜 7° 晶圓盤 -->
            <g transform="rotate(-7, 65, 45)">
              <ellipse cx="65" cy="45" rx="35" ry="12" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="65" y="49" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">300mm 晶圓</text>
            </g>
            <text x="65" y="76" text-anchor="middle" fill="#f59e0b" font-size="10.5" font-weight="700">7° 傾角防通道效應</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch07_dose_label}</div>
          <div class="eng-obj-metric-value" style="color: ${cur.color};">${cur.dose}</div>
          <div class="eng-obj-metric-note">法拉第杯精確計數離子累積電荷</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch07_range_label}</div>
          <div class="eng-obj-metric-value">${cur.range}</div>
          <div class="eng-obj-metric-note">高斯摻雜濃度峰值深度 (Rp)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch07_energy_label}</div>
          <div class="eng-obj-metric-value">${cur.energy}</div>
          <div class="eng-obj-metric-note">${cur.name} 質量電荷比分離</div>
        </div>
      `;

      footerNote = t.ch07_beamline_desc;
    } else if (activeTab === 'anneal') {
      viewportHtml = `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lattice Anneal & Activation">
          <!-- 左側：佈植後晶格損傷 (As-Implanted) -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="310" height="280" rx="4" fill="#131e2b" stroke="#ef4444"/>
            <text x="155" y="26" text-anchor="middle" fill="#ef4444" font-size="13" font-weight="700">1. 佈植後非晶化損傷 (As-Implanted)</text>
            <text x="155" y="46" text-anchor="middle" fill="#94a3b8" font-size="11">晶格碎裂 · 摻質無電性</text>

            <!-- 非晶混亂層 (Amorphized Layer) -->
            <rect x="25" y="70" width="260" height="75" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-dasharray="3 3"/>
            <text x="155" y="112" text-anchor="middle" fill="#ef4444" font-size="11.5" font-weight="700">非晶破壞層 (空位與間隙原子)</text>

            <!-- 亂七八糟的原子點陣 -->
            <g fill="#94a3b8">
              <circle cx="50" cy="85" r="3"/><circle cx="90" cy="120" r="3"/><circle cx="140" cy="90" r="3"/>
              <circle cx="190" cy="125" r="3"/><circle cx="240" cy="85" r="3"/>
            </g>
            <!-- 未活化摻質 (紅點不在格位) -->
            <g fill="#f59e0b">
              <circle cx="80" cy="95" r="4"/><circle cx="170" cy="105" r="4"/><circle cx="220" cy="95" r="4"/>
            </g>

            <!-- 底層完整單晶矽 (Crystalline Si) -->
            <rect x="25" y="145" width="260" height="95" fill="#1e293b"/>
            <!-- 整齊晶格點 -->
            <g fill="#38bdf8">
              <circle cx="50" cy="170" r="3"/><circle cx="90" cy="170" r="3"/><circle cx="130" cy="170" r="3"/><circle cx="170" cy="170" r="3"/><circle cx="210" cy="170" r="3"/><circle cx="250" cy="170" r="3"/>
              <circle cx="50" cy="205" r="3"/><circle cx="90" cy="205" r="3"/><circle cx="130" cy="205" r="3"/><circle cx="170" cy="205" r="3"/><circle cx="210" cy="205" r="3"/><circle cx="250" cy="205" r="3"/>
            </g>
            <text x="155" y="225" text-anchor="middle" fill="#38bdf8" font-size="11">完整單晶矽底層 (Substrate)</text>
          </g>

          <!-- 右側：RTA 高溫退火後 (Post-Anneal 1050°C) -->
          <g transform="translate(430, 40)">
            <rect x="0" y="0" width="310" height="280" rx="4" fill="#131e2b" stroke="#10b981"/>
            <text x="155" y="26" text-anchor="middle" fill="#10b981" font-size="13" font-weight="700">2. RTA 快速退火活化 (1050°C 3s)</text>
            <text x="155" y="46" text-anchor="middle" fill="#94a3b8" font-size="11">固相磊晶再結晶 · 活化率 &gt;95%</text>

            <!-- 熱脈衝指示 -->
            <path d="M 30,65 Q 155,50 280,65" stroke="#f59e0b" stroke-width="2" class="anim-heat"/>

            <!-- 完整修復之整齊晶格 -->
            <rect x="25" y="70" width="260" height="170" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
            <g fill="#38bdf8">
              <circle cx="50" cy="95" r="3"/><circle cx="130" cy="95" r="3"/><circle cx="210" cy="95" r="3"/><circle cx="250" cy="95" r="3"/>
              <circle cx="50" cy="130" r="3"/><circle cx="90" cy="130" r="3"/><circle cx="170" cy="130" r="3"/><circle cx="250" cy="130" r="3"/>
              <circle cx="50" cy="165" r="3"/><circle cx="90" cy="165" r="3"/><circle cx="130" cy="165" r="3"/><circle cx="210" cy="165" r="3"/><circle cx="250" cy="165" r="3"/>
              <circle cx="50" cy="200" r="3"/><circle cx="90" cy="200" r="3"/><circle cx="130" cy="200" r="3"/><circle cx="170" cy="200" r="3"/><circle cx="210" cy="200" r="3"/><circle cx="250" cy="200" r="3"/>
            </g>
            <!-- 摻質原子成功取代格位 (Substitutional Sites) -->
            <g fill="#10b981">
              <circle cx="90" cy="95" r="4.5"/><circle cx="170" cy="95" r="4.5"/><circle cx="130" cy="130" r="4.5"/><circle cx="210" cy="130" r="4.5"/>
            </g>
            <text x="155" y="115" text-anchor="middle" fill="#10b981" font-size="11.5" font-weight="700">摻質進入矽晶格格位提供自由載子</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">電性活化率 (Activation)</div>
          <div class="eng-obj-metric-value" style="color: #10b981;">&gt; 95%</div>
          <div class="eng-obj-metric-note">摻質取代矽原子格位釋放自由電子/電洞</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">熱預算控制 (Thermal Budget)</div>
          <div class="eng-obj-metric-value">1050°C · 1-3 秒</div>
          <div class="eng-obj-metric-note">抑制摻質側向熱擴散，確保超淺接面</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">接面深度 (Junction Depth Xj)</div>
          <div class="eng-obj-metric-value">&lt; 20 nm</div>
          <div class="eng-obj-metric-note">先進節點配合雷射尖峰退火 (LSA)</div>
        </div>
      `;

      footerNote = t.ch07_anneal_desc;
    } else {
      // Channeling
      controlsHtml = '';
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Channeling Effect">
          <!-- 0° 垂直入射：通道效應 (嚴重尾端) -->
          <g transform="translate(80, 40)">
            <rect x="0" y="0" width="280" height="260" rx="4" fill="#131e2b" stroke="#ef4444"/>
            <text x="140" y="26" text-anchor="middle" fill="#ef4444" font-size="12.5" font-weight="700">0° 垂直入射：通道效應 (Channeling)</text>
            <!-- 直穿原子間隙光束 -->
            <line x1="140" y1="45" x2="140" y2="230" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4 2"/>
            <text x="140" y="245" text-anchor="middle" fill="#ef4444" font-size="11">離子無核碰撞長驅直入 · 接面過深</text>
            <!-- 兩側原子牆 -->
            <g fill="#64748b">
              <circle cx="100" cy="80" r="4"/><circle cx="100" cy="130" r="4"/><circle cx="100" cy="180" r="4"/>
              <circle cx="180" cy="80" r="4"/><circle cx="180" cy="130" r="4"/><circle cx="180" cy="180" r="4"/>
            </g>
          </g>

          <!-- 7° 傾角入射：隨機核碰撞 (受控高斯輪廓) -->
          <g transform="translate(440, 40)">
            <rect x="0" y="0" width="280" height="260" rx="4" fill="#131e2b" stroke="#10b981"/>
            <text x="140" y="26" text-anchor="middle" fill="#10b981" font-size="12.5" font-weight="700">7° 傾角 + 27° 旋轉：隨機散射</text>
            <!-- 傾斜光束撞擊原子停止 -->
            <line x1="100" y1="45" x2="150" y2="140" stroke="#10b981" stroke-width="2.5" stroke-dasharray="4 2"/>
            <circle cx="150" cy="140" r="6" fill="#f59e0b"/>
            <text x="140" y="245" text-anchor="middle" fill="#10b981" font-size="11">打亂晶軸對稱 · 停在預定高斯深度</text>
            <!-- 偏位原子點陣 -->
            <g fill="#64748b">
              <circle cx="100" cy="80" r="4"/><circle cx="100" cy="130" r="4"/><circle cx="100" cy="180" r="4"/>
              <circle cx="180" cy="80" r="4"/><circle cx="180" cy="130" r="4"/><circle cx="180" cy="180" r="4"/>
            </g>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">晶圓標準傾角 (Tilt)</div>
          <div class="eng-obj-metric-value">7°</div>
          <div class="eng-obj-metric-note">避免離子直接沿 &lt;110&gt; 晶軸通道射入</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">晶圓方位角旋轉 (Twist)</div>
          <div class="eng-obj-metric-value">22° ~ 27°</div>
          <div class="eng-obj-metric-note">打破面內高對稱通道，均勻散射</div>
        </div>
      `;

      footerNote = t.ch07_channeling_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh07Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 07</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh07Title">${t.ch07_title}</h2>
          <p class="eng-obj-subtitle">${t.ch07_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'beamline' ? 'is-active' : ''}" data-tab="beamline">${t.ch07_tab_beamline}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'anneal' ? 'is-active' : ''}" data-tab="anneal">${t.ch07_tab_anneal}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'channeling' ? 'is-active' : ''}" data-tab="channeling">${t.ch07_tab_channeling}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
    container.querySelectorAll('[data-species]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSpecies = btn.getAttribute('data-species');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 6. Ch 08 CMP 化學機械研磨運動學與微觀平坦化模型 (CMP Kinematics & Planarization)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderCMPObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'kinematics'; // 'kinematics' | 'micro' | 'defects'
  let pressure = 3.0; // psi (1.0 ~ 5.0)
  let speed = 90;     // RPM (40 ~ 120)

  function update() {
    let controlsHtml = '';
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    const mrr = Math.round(1.5 * pressure * speed);

    if (activeTab === 'kinematics') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CMP Tool Kinematics">
          <!-- 1. 旋轉研磨大盤 (Polishing Pad, 直徑 760mm) -->
          <g transform="translate(320, 220)">
            <circle cx="0" cy="0" r="180" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            <!-- 研磨墊同心圓與同向旋轉動畫 -->
            <g class="anim-rotate-pad">
              <circle cx="0" cy="0" r="140" fill="none" stroke="#334155" stroke-dasharray="8 6"/>
              <circle cx="0" cy="0" r="100" fill="none" stroke="#334155" stroke-dasharray="8 6"/>
              <circle cx="0" cy="0" r="60" fill="none" stroke="#334155" stroke-dasharray="8 6"/>
              <line x1="-180" y1="0" x2="180" y2="0" stroke="#38bdf8" stroke-width="1.2" opacity="0.6"/>
              <line x1="0" y1="-180" x2="0" y2="180" stroke="#38bdf8" stroke-width="1.2" opacity="0.6"/>
            </g>
            <text x="-120" y="150" fill="#94a3b8" font-size="11.5">${t.ch08_pad_label}</text>
          </g>

          <!-- 2. 晶圓研磨頭 (Carrier Head, 倒扣 300mm 晶圓) -->
          <g transform="translate(420, 170)">
            <circle cx="0" cy="0" r="80" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
            <!-- 研磨頭旋轉與分區環 -->
            <g class="anim-rotate-head">
              <circle cx="0" cy="0" r="60" fill="none" stroke="#38bdf8" stroke-dasharray="4 4"/>
              <circle cx="0" cy="0" r="35" fill="none" stroke="#38bdf8" stroke-dasharray="4 4"/>
              <circle cx="0" cy="0" r="8" fill="#f59e0b"/>
            </g>
            <text x="0" y="-88" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">${t.ch08_head_label}</text>
            <text x="0" y="98" text-anchor="middle" fill="#94a3b8" font-size="10.5">300mm 晶圓 (下向壓 P: ${pressure.toFixed(1)} psi)</text>
          </g>

          <!-- 3. 研磨液滴注臂 (Slurry Delivery Arm) -->
          <g transform="translate(180, 70)">
            <rect x="0" y="0" width="160" height="14" rx="2" fill="#475569" stroke="#64748b"/>
            <circle cx="150" cy="7" r="5" fill="#38bdf8"/>
            <!-- 滴落研磨液滴 -->
            <circle cx="150" cy="30" r="4" fill="#38bdf8" opacity="0.8"/>
            <circle cx="150" cy="60" r="5" fill="#38bdf8" opacity="0.85"/>
            <text x="0" y="-8" fill="#38bdf8" font-size="11">${t.ch08_slurry_arm}</text>
          </g>

          <!-- 4. 鑽石修整器 (Diamond Conditioner Disk) -->
          <g transform="translate(190, 290)">
            <circle cx="0" cy="0" r="38" fill="#334155" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="0" y="4" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="700">鑽石修整盤</text>
            <text x="0" y="52" text-anchor="middle" fill="#94a3b8" font-size="9.5">去除釉質 / 粗糙化</text>
          </g>

          <!-- 速度與 Preston 標註 -->
          <text x="680" y="80" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="700">Preston 方程</text>
          <text x="680" y="105" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="600">MRR = Kp · P · V</text>
          <text x="680" y="130" text-anchor="middle" fill="#38bdf8" font-size="16" font-weight="750">≈ ${mrr} nm/min</text>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch08_mrr_label}</div>
          <div class="eng-obj-metric-value">${mrr} nm/min</div>
          <div class="eng-obj-metric-note">材料移除速率 (Preston Kp=1.5)</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">接觸壓力 P (Down-Force)</div>
          <div class="eng-obj-metric-value">${pressure.toFixed(1)} psi</div>
          <div class="eng-obj-metric-note">多區氣囊分區調控晶圓平坦度</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">相對研磨轉速 V (Platen Speed)</div>
          <div class="eng-obj-metric-value">${speed} RPM</div>
          <div class="eng-obj-metric-note">同向旋轉確保全晶圓相對速度均勻</div>
        </div>
      `;

      footerNote = t.ch08_preston_note;
    } else if (activeTab === 'micro') {
      viewportHtml = `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CMP Chemical Mechanical Mechanism">
          <!-- 上方旋轉聚氨酯研磨墊 (Pad Asperities 微孔微突起) -->
          <g transform="translate(100, 30)">
            <rect x="0" y="0" width="600" height="40" fill="#334155" stroke="#64748b"/>
            <!-- 墊表面粗糙微峰 (Asperities) -->
            <path d="M 0,40 Q 50,55 100,40 Q 150,55 200,40 Q 250,55 300,40 Q 350,55 400,40 Q 450,55 500,40 Q 550,55 600,40 Z" fill="#475569"/>
            <text x="300" y="24" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="700">聚氨酯研磨墊粗糙微峰 (Pad Asperities 下壓磨削)</text>
          </g>

          <!-- 研磨液納米磨粒 (CeO2 / SiO2 Abrasive Particles) -->
          <g fill="#38bdf8">
            <circle cx="220" cy="115" r="7"/><circle cx="350" cy="118" r="7"/><circle cx="480" cy="116" r="7"/>
            <circle cx="280" cy="140" r="6"/><circle cx="410" cy="142" r="6"/>
          </g>
          <text x="650" y="125" fill="#38bdf8" font-size="11">奈米磨粒 (SiO₂ / CeO₂)</text>

          <!-- 下方晶圓表面微觀輪廓：突出高點 vs 低窪處 -->
          <g transform="translate(100, 180)">
            <!-- 矽基底 -->
            <path d="M 0,140 L 0,80 L 150,80 L 150,40 L 300,40 L 300,80 L 450,80 L 450,40 L 600,40 L 600,140 Z" fill="#1e293b" stroke="#334155" stroke-width="2"/>
            
            <!-- 表面水合鈍化層 (Chemical Passivation Layer ~3nm) -->
            <!-- 高點：鈍化層被磨粒強烈磨除 (露出純銅繼續氧化) -->
            <rect x="150" y="36" width="150" height="6" fill="#f59e0b" opacity="0.6"/>
            <rect x="450" y="36" width="150" height="6" fill="#f59e0b" opacity="0.6"/>
            <!-- 低窪處：鈍化層完好無損，阻擋化學溶蝕 -->
            <rect x="0" y="76" width="150" height="6" fill="#10b981"/>
            <rect x="300" y="76" width="150" height="6" fill="#10b981"/>

            <text x="225" y="25" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">高點受壓：機械磨除氧化層</text>
            <text x="75" y="115" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">低處不承受壓力：鈍化保護</text>
            <text x="375" y="115" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">低處不承受壓力：鈍化保護</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">化學作用 (Chemical)</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">氧化鈍化軟化</div>
          <div class="eng-obj-metric-note">生成疏鬆 CuO/Cu(OH)₂ 水合膜</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">機械作用 (Mechanical)</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">高點選擇性磨除</div>
          <div class="eng-obj-metric-note">奈米磨粒擦碰刮除微峰凸起</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">全域平坦化能力</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">Planarization &gt; 95%</div>
          <div class="eng-obj-metric-note">微影焦深 (DOF) 唯一定焦保障技術</div>
        </div>
      `;

      footerNote = t.ch08_micro_desc;
    } else {
      // Defects & Dummy Fill
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CMP Defects">
          <!-- 1. 碟化 (Dishing) -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="310" height="260" rx="4" fill="#131e2b" stroke="#ef4444"/>
            <text x="155" y="26" text-anchor="middle" fill="#ef4444" font-size="13" font-weight="700">寬導線碟化 (Dishing)</text>
            <!-- 介電層 -->
            <rect x="25" y="80" width="70" height="140" fill="#334155"/>
            <rect x="215" y="80" width="70" height="140" fill="#334155"/>
            <!-- 寬銅導線中央下陷 -->
            <path d="M 95,80 Q 155,105 215,80 L 215,220 L 95,220 Z" fill="#f59e0b"/>
            <text x="155" y="125" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700">研磨墊彈性下彎造成中央凹陷</text>
          </g>

          <!-- 2. 假圖形填補 (Dummy Metal Fill) -->
          <g transform="translate(430, 40)">
            <rect x="0" y="0" width="310" height="260" rx="4" fill="#131e2b" stroke="#10b981"/>
            <text x="155" y="26" text-anchor="middle" fill="#10b981" font-size="13" font-weight="700">假圖形填補 (Dummy Metal Fill)</text>
            <!-- 均勻平整表面 -->
            <rect x="25" y="80" width="260" height="140" fill="#334155"/>
            <!-- 均勻分佈之虛擬金屬方塊 -->
            <g fill="#10b981">
              <rect x="45" y="80" width="25" height="140"/><rect x="85" y="80" width="25" height="140"/>
              <rect x="125" y="80" width="25" height="140"/><rect x="165" y="80" width="25" height="140"/>
              <rect x="205" y="80" width="25" height="140"/><rect x="245" y="80" width="25" height="140"/>
            </g>
            <text x="155" y="125" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">金屬密度平衡在 30%-50% · 完美平坦</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">圖形密度規範 (Pattern Density)</div>
          <div class="eng-obj-metric-value">35% ~ 50%</div>
          <div class="eng-obj-metric-note">晶片全域金屬覆蓋率嚴格約束</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">最大允許碟化深度 (Dishing Spec)</div>
          <div class="eng-obj-metric-value">&lt; 15 nm</div>
          <div class="eng-obj-metric-note">避免上層微影對焦不良與阻抗波動</div>
        </div>
      `;

      footerNote = t.ch08_defects_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh08Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 08</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh08Title">${t.ch08_title}</h2>
          <p class="eng-obj-subtitle">${t.ch08_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'kinematics' ? 'is-active' : ''}" data-tab="kinematics">${t.ch08_tab_kinematics}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'micro' ? 'is-active' : ''}" data-tab="micro">${t.ch08_tab_micro}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'defects' ? 'is-active' : ''}" data-tab="defects">${t.ch08_tab_defects}</button>
          </div>
          ${controlsHtml}
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 7. Ch 10 金屬化雙載子鑲嵌與電遷移模型 (BEOL Dual Damascene & EM)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderInterconnectObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'damascene'; // 'damascene' | 'superfill' | 'em'
  let damaStep = 1; // 1 ~ 6

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';
    let stepperBarHtml = '';

    if (activeTab === 'damascene') {
      const stepTitle = t[`ch10_step_dama_${damaStep}`];

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dual Damascene Flow">
          <!-- 步驟標題指示膠囊 -->
          <rect x="180" y="25" width="440" height="34" rx="4" fill="#0284c7" stroke="#38bdf8"/>
          <text x="400" y="47" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">${stepTitle}</text>

          <!-- 步驟進度膠囊 -->
          <g transform="translate(190, 75)">
            ${[1, 2, 3, 4, 5, 6].map(i => `
              <rect x="${(i - 1) * 72}" y="0" width="60" height="8" rx="2" fill="${damaStep >= i ? '#38bdf8' : '#334155'}"/>
            `).join('')}
          </g>

          <!-- 雙鑲嵌微觀剖面演進 -->
          <g transform="translate(260, 120)">
            <!-- 下層金屬層 M(n-1) -->
            <rect x="0" y="180" width="280" height="50" fill="#b45309"/>
            <text x="140" y="210" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">下層金屬線 M(n-1) 銅導線</text>

            <!-- 介電層 (Low-k SiCOH) -->
            <rect x="0" y="0" width="280" height="180" fill="#1e293b" stroke="#334155" stroke-width="2"/>

            <!-- 步驟 1: 介電層實體 -->
            ${damaStep === 1 ? `
              <text x="140" y="90" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">Low-k 介電層 (SiCOH, k=2.5)</text>
            ` : ''}

            <!-- 步驟 2 以上：挖出通孔 (Via) 與上方金屬溝槽 (Trench) -->
            ${damaStep >= 2 ? `
              <!-- 溝槽開口 (上段寬 160px, 深 70px) -->
              <rect x="60" y="0" width="160" height="70" fill="#09131b"/>
              <!-- 通孔開口 (下段窄 60px, 深 110px) -->
              <rect x="110" y="70" width="60" height="110" fill="#09131b"/>
            ` : ''}

            <!-- 步驟 3: 沉積 Ta/TaN 阻擋層 (1.5nm 綠色線) -->
            ${damaStep >= 3 ? `
              <path d="M 60,0 L 60,70 L 110,70 L 110,180 L 170,180 L 170,70 L 220,70 L 220,0" fill="none" stroke="#10b981" stroke-width="3"/>
            ` : ''}

            <!-- 步驟 4: 沉積 Cu Seed 晶種層 (薄橘線) -->
            ${damaStep >= 4 ? `
              <path d="M 63,0 L 63,67 L 113,67 L 113,177 L 167,177 L 167,67 L 217,67 L 217,0" fill="none" stroke="#f59e0b" stroke-width="2"/>
            ` : ''}

            <!-- 步驟 5: 電化學電鍍填滿銅 (ECD Cu) -->
            ${damaStep === 5 ? `
              <rect x="60" y="0" width="160" height="70" fill="#f59e0b" opacity="0.95"/>
              <rect x="110" y="70" width="60" height="110" fill="#f59e0b" opacity="0.95"/>
              <!-- 頂部過載鍍銅層 (Overburden) -->
              <rect x="0" y="-15" width="280" height="15" fill="#f59e0b"/>
              <text x="140" y="-3" text-anchor="middle" fill="#09131b" font-size="10" font-weight="700">電鍍過載銅層 (Overburden)</text>
            ` : ''}

            <!-- 步驟 6: CMP 磨平與覆蓋頂部帽層 (SiCN Cap) -->
            ${damaStep === 6 ? `
              <rect x="60" y="0" width="160" height="70" fill="#f59e0b"/>
              <rect x="110" y="70" width="60" height="110" fill="#f59e0b"/>
              <!-- 頂部 SiCN 介電遮罩帽層 -->
              <rect x="0" y="-6" width="280" height="6" fill="#0f766e"/>
              <text x="140" y="40" text-anchor="middle" fill="#09131b" font-size="12" font-weight="700">金屬溝槽 Trench (Mn)</text>
              <text x="140" y="125" text-anchor="middle" fill="#09131b" font-size="11" font-weight="700">導通孔 Via (Vn)</text>
            ` : ''}
          </g>
        </svg>
      `;

      stepperBarHtml = `
        <div class="eng-obj-stepper-bar">
          <div class="eng-obj-stepper-actions">
            <button type="button" class="eng-obj-btn eng-obj-btn-primary" id="damaNextBtn">${t.btn_next_step}</button>
            <button type="button" class="eng-obj-btn" id="damaResetBtn">${t.btn_reset}</button>
          </div>
          <div class="eng-obj-stepper-info">
            <span>雙鑲嵌步驟：<strong>${damaStep} / 6</strong></span>
          </div>
        </div>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">介電常數 Low-k (SiCOH)</div>
          <div class="eng-obj-metric-value">k ≈ 2.4 ~ 2.7</div>
          <div class="eng-obj-metric-note">大幅降低相鄰金屬線間寄生電容</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">擴散阻擋層 (Barrier)</div>
          <div class="eng-obj-metric-value">1.5 nm Ta/TaN</div>
          <div class="eng-obj-metric-note">阻止銅原子熱擴散進入介電層</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">雙鑲嵌核心優勢</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">孔與溝槽一體成型</div>
          <div class="eng-obj-metric-note">免除接觸介面，接觸電阻降低 40%</div>
        </div>
      `;

      footerNote = t.ch10_damascene_desc;
    } else if (activeTab === 'superfill') {
      viewportHtml = `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ECD Superfilling">
          <g transform="translate(250, 40)">
            <rect x="0" y="0" width="300" height="280" rx="4" fill="#131e2b" stroke="#334155" stroke-width="2"/>
            
            <!-- 挖空的深孔 (HAR Via) -->
            <rect x="90" y="0" width="120" height="230" fill="#09131b"/>
            
            <!-- 底部銅自底向上噴泉生長 -->
            <path d="M 90,160 Q 150,110 210,160 L 210,230 L 90,230 Z" fill="#f59e0b"/>
            <text x="150" y="195" text-anchor="middle" fill="#09131b" font-size="12" font-weight="700">自底向上電鍍生長</text>

            <!-- 抑制劑 Suppressor 在孔口邊角 -->
            <g fill="#ef4444">
              <rect x="75" y="0" width="20" height="12" rx="2"/>
              <rect x="205" y="0" width="20" height="12" rx="2"/>
            </g>
            <text x="150" y="-12" text-anchor="middle" fill="#ef4444" font-size="11.5" font-weight="700">抑制劑 Suppressor (開口阻生長)</text>

            <!-- 加速劑 Accelerator 在孔底高曲率處累積 -->
            <g fill="#10b981">
              <circle cx="110" cy="175" r="4"/><circle cx="150" cy="155" r="4"/><circle cx="190" cy="175" r="4"/>
            </g>
            <text x="150" y="255" text-anchor="middle" fill="#10b981" font-size="11.5" font-weight="700">加速劑 Accelerator (孔底加速填平)</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">電鍍填孔模式</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">無縫超填 (Superfilling)</div>
          <div class="eng-obj-metric-note">孔底成長速率為孔口的 5 倍以上</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">空洞與接縫 (Voids/Seams)</div>
          <div class="eng-obj-metric-value">0% 零缺陷</div>
          <div class="eng-obj-metric-note">徹底消除高深寬比接觸窗孔洞斷線</div>
        </div>
      `;

      footerNote = t.ch10_superfill_desc;
    } else {
      // Electromigration (EM)
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Electromigration">
          <g transform="translate(150, 60)">
            <rect x="0" y="0" width="500" height="160" rx="4" fill="#131e2b" stroke="#334155" stroke-width="2"/>
            
            <!-- 銅導線 -->
            <rect x="40" y="45" width="420" height="70" fill="#b45309" stroke="#f59e0b" stroke-width="1.5"/>

            <!-- 電子風方向 (向右大量電子流) -->
            <g stroke="#38bdf8" stroke-width="2" class="anim-electron">
              <line x1="80" y1="80" x2="160" y2="80"/>
              <line x1="220" y1="80" x2="300" y2="80"/>
              <line x1="360" y1="80" x2="440" y2="80"/>
            </g>
            <text x="250" y="30" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">電子風 (Electron Wind Force → 高電流密度 J &gt; 10⁶ A/cm²)</text>

            <!-- 上游形成空洞 (Void - 斷路風險) -->
            <path d="M 80,45 Q 110,80 80,115 Z" fill="#09131b"/>
            <text x="75" y="135" fill="#ef4444" font-size="11.5" font-weight="700">空洞 (Void: 斷路)</text>

            <!-- 下游擠出金屬丘陵 (Hillock - 短路風險) -->
            <path d="M 420,45 Q 445,15 455,45 Z" fill="#f59e0b"/>
            <text x="430" y="20" fill="#f59e0b" font-size="11.5" font-weight="700">丘陵 (Hillock: 短路)</text>

            <text x="250" y="105" text-anchor="middle" fill="#ffffff" font-size="11">銅原子受碰撞沿晶界遷移 (Grain Boundary Drift)</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">極限電流密度 (Current Density)</div>
          <div class="eng-obj-metric-value">&gt; 1.0 × 10⁶ A/cm²</div>
          <div class="eng-obj-metric-note">電子衝量足以克服銅金屬擴散活化能</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">Black 方程預測壽命 (MTTF)</div>
          <div class="eng-obj-metric-value">MTTF ∝ J⁻ⁿ · exp(Ea/kT)</div>
          <div class="eng-obj-metric-note">高溫與高電流大幅加速失效</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">抗電遷移鍍層對策</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">鈷/釕金屬帽層 (Co/Ru)</div>
          <div class="eng-obj-metric-note">封閉頂部介面，EM 壽命提升 100 倍</div>
        </div>
      `;

      footerNote = t.ch10_em_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh10Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 10</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh10Title">${t.ch10_title}</h2>
          <p class="eng-obj-subtitle">${t.ch10_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'damascene' ? 'is-active' : ''}" data-tab="damascene">${t.ch10_tab_damascene}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'superfill' ? 'is-active' : ''}" data-tab="superfill">${t.ch10_tab_superfill}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'em' ? 'is-active' : ''}" data-tab="em">${t.ch10_tab_em}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        ${stepperBarHtml}

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    const nextBtn = container.querySelector('#damaNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        damaStep = (damaStep % 6) + 1;
        update();
      });
    }

    const resetBtn = container.querySelector('#damaResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        damaStep = 1;
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 8. Ch 21 先進封裝 2.5D CoWoS 與 3D SoIC 混合鍵合模型 (Advanced Packaging)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderAdvancedPackagingObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'cowos'; // 'cowos' | 'soic' | 'density'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'cowos') {
      viewportHtml = `
        <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2.5D CoWoS Architecture">
          <!-- 頂層晶片群組 (Top Die Tier) -->
          <!-- 左側 HBM 堆疊 (4-16 層 DRAM) -->
          <g transform="translate(100, 50)">
            <rect x="0" y="0" width="140" height="90" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <!-- 內部 TSV 穿孔指示 -->
            <line x1="30" y1="10" x2="30" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="70" y1="10" x2="70" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="110" y1="10" x2="110" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <text x="70" y="42" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">HBM3e 記憶體</text>
            <text x="70" y="58" text-anchor="middle" fill="#f59e0b" font-size="10">8-16 層 3D TSV 堆疊</text>
          </g>

          <!-- 中央高效能運算邏輯晶片 (SoC / GPU Die) -->
          <g transform="translate(280, 40)">
            <rect x="0" y="0" width="240" height="100" rx="3" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
            <text x="120" y="45" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="750">先進運算核心 (SoC / GPU)</text>
            <text x="120" y="65" text-anchor="middle" fill="#38bdf8" font-size="11">3nm / 4nm 邏輯晶片</text>
          </g>

          <!-- 右側 HBM 堆疊 -->
          <g transform="translate(560, 50)">
            <rect x="0" y="0" width="140" height="90" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <line x1="30" y1="10" x2="30" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="70" y1="10" x2="70" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="110" y1="10" x2="110" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <text x="70" y="42" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">HBM3e 記憶體</text>
            <text x="70" y="58" text-anchor="middle" fill="#f59e0b" font-size="10">8-16 層 3D TSV 堆疊</text>
          </g>

          <!-- 微凸塊層 (Micro-Bumps: 間距 35µm) -->
          <g transform="translate(80, 140)">
            ${Array.from({ length: 28 }, (_, i) => `
              <circle cx="${i * 23 + 10}" cy="8" r="3.5" fill="#e2e8f0"/>
            `).join('')}
            <text x="320" y="12" fill="#94a3b8" font-size="10.5">微凸塊 Micro-Bumps (Pitch 35µm)</text>
          </g>

          <!-- 中層：大面積矽中介層 (Silicon Interposer, 內含超密 RDL 導線與 TSV) -->
          <g transform="translate(60, 160)">
            <rect x="0" y="0" width="680" height="60" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <!-- 表面高密 RDL 金屬線 -->
            <path d="M 40,8 L 640,8" stroke="#10b981" stroke-width="2"/>
            <path d="M 40,14 L 640,14" stroke="#10b981" stroke-width="2"/>
            <!-- 垂直 TSV 穿孔貫穿中介層 -->
            ${Array.from({ length: 12 }, (_, i) => `
              <line x1="${i * 55 + 40}" y1="15" x2="${i * 55 + 40}" y2="55" stroke="#f59e0b" stroke-width="3"/>
            `).join('')}
            <text x="340" y="38" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="750">2.5D 矽中介層 (Silicon Interposer with TSVs)</text>
          </g>

          <!-- C4 凸塊層 (C4 Bumps: 間距 150µm) -->
          <g transform="translate(80, 220)">
            ${Array.from({ length: 14 }, (_, i) => `
              <circle cx="${i * 48 + 15}" cy="10" r="6" fill="#f59e0b"/>
            `).join('')}
            <text x="320" y="15" fill="#f59e0b" font-size="11">C4 Bumps (Pitch 150µm)</text>
          </g>

          <!-- 底層：大型 ABF 封裝基板 (Organic Substrate) -->
          <g transform="translate(40, 245)">
            <rect x="0" y="0" width="720" height="50" rx="3" fill="#0f172a" stroke="#64748b" stroke-width="1.5"/>
            <text x="360" y="30" text-anchor="middle" fill="#cbd5e1" font-size="12" font-weight="700">ABF 封裝基板 (Package Substrate)</text>
          </g>

          <!-- BGA 錫球 (Ball Grid Array 連接至 PCB 主機板) -->
          <g transform="translate(60, 295)">
            ${Array.from({ length: 12 }, (_, i) => `
              <circle cx="${i * 58 + 25}" cy="16" r="10" fill="#94a3b8"/>
            `).join('')}
            <text x="340" y="22" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">BGA 錫球 (Pitch 1.0 mm → PCB 主機板)</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">HBM 互連總頻寬</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 1.2 TB/s · 堆疊</div>
          <div class="eng-obj-metric-note">1024-bit 匯流排超寬平行傳輸</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">中介層面積 (Interposer Size)</div>
          <div class="eng-obj-metric-value">&gt; 3.3× 光罩視場</div>
          <div class="eng-obj-metric-note">台積電 CoWoS-S 突破單光罩限制</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">微凸塊間距 (Micro-Bump Pitch)</div>
          <div class="eng-obj-metric-value">25 - 40 µm</div>
          <div class="eng-obj-metric-note">每平方毫米數百個高密度接點</div>
        </div>
      `;

      footerNote = t.ch21_cowos_desc;
    } else if (activeTab === 'soic') {
      viewportHtml = `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D SoIC Bumpless Hybrid Bonding">
          <!-- 上晶片 (Top Chip) -->
          <g transform="translate(200, 50)">
            <rect x="0" y="0" width="400" height="90" rx="3" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
            <text x="200" y="45" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">上層晶片 (Top Chip: 例如 SRAM 快取)</text>
            <!-- 表面微銅接點 (Cu Pads, 直徑 0.5µm, 間距 0.9µm) -->
            ${Array.from({ length: 9 }, (_, i) => `
              <rect x="${i * 42 + 25}" y="76" width="20" height="14" fill="#f59e0b"/>
            `).join('')}
          </g>

          <!-- 混合鍵合介面 (Hybrid Bonding Interface: <1µm Pitch, 無凸塊 Bumpless) -->
          <g transform="translate(200, 140)">
            <rect x="0" y="0" width="400" height="16" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" stroke-dasharray="3 3"/>
            <text x="200" y="12" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">無凸塊混合鍵合介面 (SiO₂-SiO₂ 親水鍵合 + Cu-Cu 熱擴散)</text>
          </g>

          <!-- 下晶片 (Bottom Chip) -->
          <g transform="translate(200, 156)">
            <!-- 表面微銅接點精確對齊 -->
            ${Array.from({ length: 9 }, (_, i) => `
              <rect x="${i * 42 + 25}" y="0" width="20" height="14" fill="#f59e0b"/>
            `).join('')}
            <rect x="0" y="14" width="400" height="90" rx="3" fill="#1e293b" stroke="#0284c7" stroke-width="1.5"/>
            <text x="200" y="65" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">下層運算邏輯晶片 (Bottom Compute Die)</text>
          </g>

          <!-- 說明指標 -->
          <text x="400" y="300" text-anchor="middle" fill="#10b981" font-size="13" font-weight="750">無焊錫 · 無底部填充膠 · 接點間距 &lt; 1.0 µm</text>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">互連間距 (Bonding Pitch)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&lt; 0.9 µm</div>
          <div class="eng-obj-metric-note">比傳統微凸塊縮小 40 倍以上</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">互連密度 (Interconnect Density)</div>
          <div class="eng-obj-metric-value">&gt; 1,200,000 / mm²</div>
          <div class="eng-obj-metric-note">實現晶粒級單晶片超低延遲</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">通訊能耗改善</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&lt; 0.05 pJ / bit</div>
          <div class="eng-obj-metric-note">寄生電容劇降，能耗僅傳統封裝 10%</div>
        </div>
      `;

      footerNote = t.ch21_soic_desc;
    } else {
      // Density comparison
      viewportHtml = `
        <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Packaging Interconnect Density Comparison">
          <!-- 橫向柱狀對照圖 -->
          <g transform="translate(180, 50)">
            <!-- 1. BGA -->
            <rect x="0" y="0" width="8" height="28" fill="#64748b"/>
            <text x="-15" y="19" text-anchor="end" fill="#94a3b8" font-size="12">打線 / BGA</text>
            <text x="20" y="19" fill="#e2e8f0" font-size="11.5">間距 1000 µm · 密度 1 / mm²</text>

            <!-- 2. Flip-Chip C4 -->
            <rect x="0" y="55" width="30" height="28" fill="#0284c7"/>
            <text x="-15" y="74" text-anchor="end" fill="#94a3b8" font-size="12">覆晶 (Flip-Chip C4)</text>
            <text x="42" y="74" fill="#e2e8f0" font-size="11.5">間距 150 µm · 密度 40 / mm²</text>

            <!-- 3. 2.5D CoWoS 微凸塊 -->
            <rect x="0" y="110" width="110" height="28" fill="#f59e0b"/>
            <text x="-15" y="129" text-anchor="end" fill="#f59e0b" font-size="12">2.5D CoWoS 微凸塊</text>
            <text x="122" y="129" fill="#e2e8f0" font-size="11.5">間距 35 µm · 密度 800 / mm²</text>

            <!-- 4. 3D SoIC 混合鍵合 -->
            <rect x="0" y="165" width="460" height="34" fill="#10b981"/>
            <text x="-15" y="187" text-anchor="end" fill="#10b981" font-size="13" font-weight="700">3D SoIC 混合鍵合</text>
            <text x="475" y="187" fill="#10b981" font-size="13" font-weight="750">&lt; 0.9 µm · 1,200,000 / mm² (↑1500倍)</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">互連密度躍升幅度</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">1,500 倍</div>
          <div class="eng-obj-metric-note">從 2.5D 微凸塊邁向 3D Cu-Cu 混合鍵合</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">小晶片 (Chiplet) 戰略意義</div>
          <div class="eng-obj-metric-value" style="font-size: 15px;">打破摩爾定律物理極限</div>
          <div class="eng-obj-metric-note">算力、快取與高頻寬記憶體異質整合</div>
        </div>
      `;

      footerNote = t.ch21_density_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh21Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 21</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh21Title">${t.ch21_title}</h2>
          <p class="eng-obj-subtitle">${t.ch21_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'cowos' ? 'is-active' : ''}" data-tab="cowos">${t.ch21_tab_cowos}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'soic' ? 'is-active' : ''}" data-tab="soic">${t.ch21_tab_soic}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'density' ? 'is-active' : ''}" data-tab="density">${t.ch21_tab_density}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    // 綁定事件
    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 9. Ch 03 柴氏長晶提拉與晶圓切片拋光幾何模型 (CZ Ingot Puller & Wafer Slicing)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderIngotWaferObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'cz'; // 'cz' | 'saw' | 'polish'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'cz') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Czochralski Crystal Pulling Furnace">
          <defs>
            <linearGradient id="czMeltGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.95"/>
              <stop offset="50%" stop-color="#ea580c" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#b45309" stop-opacity="0.85"/>
            </linearGradient>
            <linearGradient id="czIngotGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#64748b"/>
              <stop offset="50%" stop-color="#94a3b8"/>
              <stop offset="100%" stop-color="#475569"/>
            </linearGradient>
            <radialGradient id="czHeaterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ef4444" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- 爐體外壁 (Water-Cooled Double Chamber Wall) -->
          <rect x="120" y="20" width="560" height="380" rx="16" fill="#0f172a" stroke="#334155" stroke-width="2"/>
          <text x="140" y="48" fill="#64748b" font-size="11" font-family="monospace">CZ FURNACE VACUUM CHAMBER · Ar PURGE 10-30 Torr</text>

          <!-- 外圍超導磁體線圈 (MCZ Coils: 產生水平/尖峰磁場抑制對流) -->
          <g transform="translate(60, 160)">
            <rect x="0" y="0" width="50" height="150" rx="6" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
            <text x="25" y="80" text-anchor="middle" fill="#38bdf8" font-size="11" transform="rotate(-90 25 80)">MCZ 磁場線圈</text>
          </g>
          <g transform="translate(690, 160)">
            <rect x="0" y="0" width="50" height="150" rx="6" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
            <text x="25" y="80" text-anchor="middle" fill="#38bdf8" font-size="11" transform="rotate(90 25 80)">MCZ 磁場線圈</text>
          </g>

          <!-- 左右兩側石墨電阻加熱器 (Graphite Heaters @ 1450°C) -->
          <g transform="translate(200, 170)">
            <rect x="0" y="0" width="24" height="150" rx="4" fill="#dc2626" stroke="#f87171" stroke-width="1.5" class="anim-heat"/>
            <text x="12" y="80" text-anchor="middle" fill="#ffffff" font-size="10" transform="rotate(-90 12 80)">石墨加熱器</text>
          </g>
          <g transform="translate(576, 170)">
            <rect x="0" y="0" width="24" height="150" rx="4" fill="#dc2626" stroke="#f87171" stroke-width="1.5" class="anim-heat"/>
            <text x="12" y="80" text-anchor="middle" fill="#ffffff" font-size="10" transform="rotate(90 12 80)">石墨加熱器</text>
          </g>

          <!-- 石英坩堝外層碳-碳複合托杯與支持軸 (Crucible Shaft with Rotation) -->
          <g transform="translate(240, 180)">
            <!-- 石英坩堝主體 (Quartz Crucible) -->
            <path d="M 20,0 C 20,130 50,150 160,150 C 270,150 300,130 300,0 Z" fill="#1e293b" stroke="#cbd5e1" stroke-width="2.5"/>
            <!-- 內部液態矽熔體 (Liquid Silicon Melt @ 1425°C) -->
            <path d="M 25,20 C 25,125 55,145 160,145 C 265,145 295,125 295,20 Z" fill="url(#czMeltGrad)"/>
            <!-- 熔體表面波紋與微觀熱對流渦旋 -->
            <ellipse cx="160" cy="22" rx="135" ry="12" fill="#fbbf24" opacity="0.6"/>
            <!-- 坩堝旋轉標示 (Crucible Rotation CW) -->
            <line x1="160" y1="150" x2="160" y2="210" stroke="#94a3b8" stroke-width="6"/>
            <text x="160" y="200" text-anchor="middle" fill="#38bdf8" font-size="11">坩堝順時針旋轉 ↻ (5-15 RPM)</text>
          </g>

          <!-- 頂部提拉纜繩、夾頭與單晶晶棒 (Ingot with Dash Necking & Pull Motion) -->
          <g transform="translate(400, 30)" class="anim-crystal-pull">
            <!-- 提拉鉬軸纜繩 (Pull Cable) -->
            <line x1="0" y1="0" x2="0" y2="40" stroke="#e2e8f0" stroke-width="3"/>
            <!-- 籽晶夾頭 (Seed Holder) -->
            <rect x="-12" y="40" width="24" height="15" rx="2" fill="#475569" stroke="#94a3b8" stroke-width="1"/>
            <!-- <100> 單晶籽晶 (Seed Crystal) -->
            <rect x="-4" y="55" width="8" height="18" fill="#e2e8f0"/>
            <!-- 消除差排之細頸 (Dash Necking: 直徑 3-4mm, 長度 > 50mm) -->
            <path d="M -4,73 C -2,85 -2,95 -2,105 L 2,105 C 2,95 2,85 4,73 Z" fill="#94a3b8"/>
            <text x="15" y="92" fill="#38bdf8" font-size="10.5">Dash 細頸 (消除晶格差排)</text>

            <!-- 放肩錐形 (Shoulder / Crown) -->
            <path d="M -2,105 L -60,140 L 60,140 L 2,105 Z" fill="url(#czIngotGrad)" stroke="#cbd5e1" stroke-width="1"/>
            <!-- 300mm 單晶矽棒主體 (Crystal Ingot Body) -->
            <rect x="-60" y="140" width="120" height="140" fill="url(#czIngotGrad)" stroke="#cbd5e1" stroke-width="1"/>
            <!-- 晶棒反向旋轉標示 (Ingot Counter-Rotation CCW) -->
            <text x="0" y="200" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="750">300mm 單晶矽棒</text>
            <text x="0" y="218" text-anchor="middle" fill="#f8fafc" font-size="10.5">&lt;100&gt; 晶向 · 逆時針旋轉 ↺</text>
            <text x="0" y="235" text-anchor="middle" fill="#38bdf8" font-size="10">向上提拉 ↑ (1.2 mm/min)</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch03_metric_purity}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">11N (99.999999999%)</div>
          <div class="eng-obj-metric-note">電子級多晶矽 (EGS) 高溫熔融</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch03_metric_pull}</div>
          <div class="eng-obj-metric-value">1.0 ~ 1.5 mm/min</div>
          <div class="eng-obj-metric-note">Dash 縮頸高速提拉徹底排擠差排</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">超導磁場控制 (MCZ)</div>
          <div class="eng-obj-metric-value">0.3 ~ 0.4 Tesla</div>
          <div class="eng-obj-metric-note">勞侖茲阻尼強力抑制熔體熱對流</div>
        </div>
      `;

      footerNote = t.ch03_cz_desc;
    } else if (activeTab === 'saw') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diamond Wire Sawing Ingot into Wafers">
          <defs>
            <pattern id="sawWirePattern" width="16" height="40" patternUnits="userSpaceOnUse">
              <line x1="8" y1="0" x2="8" y2="40" stroke="#38bdf8" stroke-width="1.5"/>
            </pattern>
          </defs>

          <!-- 頂部進給架與進給單晶矽棒 (300mm Ingot Downward Feed) -->
          <g transform="translate(200, 30)">
            <rect x="0" y="0" width="400" height="130" rx="8" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
            <text x="200" y="45" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">300mm 單晶矽晶棒 (Silicon Ingot)</text>
            <text x="200" y="65" text-anchor="middle" fill="#38bdf8" font-size="11">垂直微進給 ↓ (Feed Rate ~0.5 mm/min)</text>
            <!-- 切割切痕線條 (Slits being cut) -->
            ${Array.from({ length: 18 }, (_, i) => `
              <line x1="${i * 20 + 30}" y1="80" x2="${i * 20 + 30}" y2="130" stroke="#0f172a" stroke-width="2.5"/>
            `).join('')}
          </g>

          <!-- 中段金剛石多線鋸切割網 (Diamond Multi-Wire Web) -->
          <g transform="translate(160, 160)" class="anim-saw-wire">
            <!-- 左右兩側主導向滾輪 (Guide Rollers) -->
            <circle cx="10" cy="40" r="30" fill="#334155" stroke="#64748b" stroke-width="2"/>
            <circle cx="470" cy="40" r="30" fill="#334155" stroke="#64748b" stroke-width="2"/>
            <!-- 金剛石線鋸束 (Diamond Wires Web: 數百條高張力金剛石鋼線) -->
            ${Array.from({ length: 24 }, (_, i) => `
              <line x1="20" y1="${i * 3 + 10}" x2="460" y2="${i * 3 + 10}" stroke="#0ea5e9" stroke-width="1.8"/>
            `).join('')}
            <text x="240" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">⇄ 金剛石鋸線高速往復運動 (Wire Speed: 40 m/s)</text>
            <text x="240" y="112" text-anchor="middle" fill="#94a3b8" font-size="11">電鍍金剛石顆粒 (8-12 µm 磨料) + 冷卻研磨切削液</text>
          </g>

          <!-- 下方落入之高精度切片晶圓陣列 (Sliced Wafers) -->
          <g transform="translate(200, 290)">
            <rect x="0" y="0" width="400" height="90" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            ${Array.from({ length: 20 }, (_, i) => `
              <rect x="${i * 18 + 25}" y="15" width="8" height="60" rx="1.5" fill="#94a3b8" stroke="#38bdf8" stroke-width="1"/>
            `).join('')}
            <text x="200" y="48" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">一次切出 400+ 片超薄晶圓</text>
            <text x="200" y="66" text-anchor="middle" fill="#38bdf8" font-size="11">單片厚度 ~775 µm · 切縫損耗 Kerf Loss ~110 µm</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch03_metric_thick}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">775 ± 20 µm</div>
          <div class="eng-obj-metric-note">SEMI 標準 300mm 晶圓規格</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">切縫損耗 (Kerf Loss)</div>
          <div class="eng-obj-metric-value">~ 110 µm</div>
          <div class="eng-obj-metric-note">超細金剛石鋼線大幅降低矽材浪費</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">晶圓翹曲度 (Warp / Bow)</div>
          <div class="eng-obj-metric-value">&lt; 25 µm</div>
          <div class="eng-obj-metric-note">恆定線張力控制確保平直切削面</div>
        </div>
      `;

      footerNote = t.ch03_saw_desc;
    } else if (activeTab === 'polish') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wafer Bevel Grinding and Double-Side Polishing">
          <!-- 左側：晶圓邊緣倒角研磨 (Edge Beveling & Profiling) -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="320" height="340" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <text x="160" y="32" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">晶圓邊緣倒角研磨 (Edge Beveling)</text>
            <text x="160" y="50" text-anchor="middle" fill="#94a3b8" font-size="10.5">消除尖銳直角 · 防碎邊與光阻堆積</text>

            <!-- 晶圓截面放大 (銳角尖端 vs 圓弧 R 倒角) -->
            <g transform="translate(60, 90)">
              <!-- 原始未處理直角易裂輪廓 (Sharp Edge) -->
              <path d="M 0,40 L 80,40 L 80,100 L 0,100" fill="#334155" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
              <text x="90" y="50" fill="#f87171" font-size="10">未倒角尖銳邊緣 (應力集中易碎)</text>

              <!-- 鑽石砂輪 CNC 研磨後的標準圓弧輪廓 (SEMI T-Profile) -->
              <path d="M 0,140 L 50,140 C 75,140 85,150 85,170 C 85,190 75,200 50,200 L 0,200 Z" fill="#64748b" stroke="#10b981" stroke-width="2"/>
              <text x="95" y="165" fill="#34d399" font-size="10.5" font-weight="700">圓弧 R 倒角 (R-Profile)</text>
              <text x="95" y="182" fill="#94a3b8" font-size="9.5">Bevel Radius R ~ 250 µm</text>
            </g>
          </g>

          <!-- 右側：化學機械雙面拋光 (DSP: Double-Side Polishing) -->
          <g transform="translate(420, 40)">
            <rect x="0" y="0" width="320" height="340" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <text x="160" y="32" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">雙面化學機械拋光 (DSP)</text>
            <text x="160" y="50" text-anchor="middle" fill="#38bdf8" font-size="10.5">行星齒輪夾持 · 兩面同時超鏡面拋光</text>

            <!-- 上下旋轉拋光盤與微觀晶圓夾持 -->
            <g transform="translate(30, 80)">
              <!-- 上拋光盤 (Top Plate) -->
              <rect x="0" y="0" width="260" height="30" rx="3" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
              <text x="130" y="20" text-anchor="middle" fill="#cbd5e1" font-size="11">上研磨盤 (Top Polishing Plate ↓ 壓力)</text>

              <!-- 中間游星輪 (Planetary Carrier) 與被拋光矽晶圓 -->
              <g transform="translate(20, 45)">
                <rect x="0" y="0" width="220" height="40" rx="4" fill="#09131b" stroke="#0ea5e9" stroke-width="1.5"/>
                <!-- 旋轉運動箭頭 -->
                <circle cx="110" cy="20" r="16" fill="#38bdf8" opacity="0.3"/>
                <text x="110" y="25" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">矽晶圓 (自轉 + 公轉)</text>
              </g>

              <!-- 下拋光盤 (Bottom Plate) -->
              <rect x="0" y="100" width="260" height="30" rx="3" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
              <text x="130" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">下研磨盤 (Bottom Plate ↺ 旋轉)</text>

              <!-- 表面奈米粗糙度放大對比 -->
              <g transform="translate(0, 160)">
                <rect x="0" y="0" width="260" height="75" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                <text x="10" y="22" fill="#94a3b8" font-size="10.5">拋光前：線鋸機械刮痕 RMS ~ 1 µm</text>
                <path d="M 10,32 Q 30,22 50,32 T 90,32 T 130,32 T 170,32 T 210,32 T 250,32" fill="none" stroke="#f87171" stroke-width="1.5"/>
                <text x="10" y="55" fill="#34d399" font-size="10.5" font-weight="700">拋光後：原子級光滑鏡面 RMS &lt; 0.1 nm</text>
                <line x1="10" y1="65" x2="250" y2="65" stroke="#10b981" stroke-width="2"/>
              </g>
            </g>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch03_metric_roughness}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&lt; 0.1 nm (次埃級)</div>
          <div class="eng-obj-metric-note">原子級超平整表面滿足 EUV 微影景深</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">全域平坦度 (GBIR / SFQR)</div>
          <div class="eng-obj-metric-value">&lt; 0.05 µm</div>
          <div class="eng-obj-metric-note">整片 300mm 晶圓奈米級厚度一致性</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">邊緣倒角形狀</div>
          <div class="eng-obj-metric-value">SEMI T-Profile</div>
          <div class="eng-obj-metric-note">預防高溫製程熱應力碎裂及晶邊脫膜</div>
        </div>
      `;

      footerNote = t.ch03_polish_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh03Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 03</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh03Title">${t.ch03_title}</h2>
          <p class="eng-obj-subtitle">${t.ch03_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'cz' ? 'is-active' : ''}" data-tab="cz">${t.ch03_tab_cz}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'saw' ? 'is-active' : ''}" data-tab="saw">${t.ch03_tab_saw}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'polish' ? 'is-active' : ''}" data-tab="polish">${t.ch03_tab_polish}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 10. Ch 09 RCA 濕式清洗化學反應、兆聲波與 Marangoni 乾燥模型 (Wet Clean & Megasonics)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderWetCleanObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'rca'; // 'rca' | 'megasonic' | 'marangoni'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'rca') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RCA Cleans Chemistry Mechanism">
          <!-- 背景三區域劃分 -->
          <rect x="20" y="20" width="240" height="370" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <rect x="280" y="20" width="240" height="370" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
          <rect x="540" y="20" width="240" height="370" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>

          <!-- 區域 1: SC-1 (RCA-1) 鹼性去微粒 -->
          <g transform="translate(30, 30)">
            <text x="110" y="25" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="750">1. SC-1 (RCA-1 清洗)</text>
            <text x="110" y="45" text-anchor="middle" fill="#94a3b8" font-size="10.5">NH₄OH : H₂O₂ : H₂O @ 70°C</text>

            <!-- 晶圓矽基板 -->
            <rect x="10" y="230" width="200" height="40" fill="#334155" rx="3"/>
            <text x="110" y="255" text-anchor="middle" fill="#cbd5e1" font-size="11">Si 基底 (帶負電 ζ ≈ -40mV)</text>

            <!-- 表面微蝕刻氧化層與 Zeta 電位排斥機制 -->
            <rect x="10" y="215" width="200" height="15" fill="#38bdf8" opacity="0.3"/>
            <text x="110" y="205" text-anchor="middle" fill="#38bdf8" font-size="10">微蝕刻脫落氧化層 (~0.5 nm)</text>

            <!-- 漂浮顆粒與排斥電場 -->
            <circle cx="110" cy="120" r="24" fill="#f87171" stroke="#ffffff" stroke-width="1.5"/>
            <text x="110" y="125" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">微粒 (-)</text>
            <!-- 負電排斥箭頭 (Repulsion) -->
            <path d="M 110,150 L 110,190" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)"/>
            <text x="110" y="175" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">⇡ 靜電排斥力 ⇣</text>
            <text x="110" y="320" text-anchor="middle" fill="#38bdf8" font-size="10.5">去除有機物與次微米微粒</text>
          </g>

          <!-- 區域 2: DHF 稀氫氟酸洗去原生氧化層 -->
          <g transform="translate(290, 30)">
            <text x="110" y="25" text-anchor="middle" fill="#34d399" font-size="13" font-weight="750">2. DHF 稀氫氟酸浸泡</text>
            <text x="110" y="45" text-anchor="middle" fill="#94a3b8" font-size="10.5">HF : H₂O (1:50 ~ 1:100)</text>

            <!-- 晶圓矽基板 -->
            <rect x="10" y="230" width="200" height="40" fill="#334155" rx="3"/>
            <text x="110" y="255" text-anchor="middle" fill="#cbd5e1" font-size="11">Si 基底 (氫鍵鈍化 Si-H)</text>

            <!-- SiO2 溶解消失動態 -->
            <g transform="translate(20, 140)">
              <text x="100" y="20" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">SiO₂ + 6HF → H₂SiF₆ + 2H₂O</text>
              <text x="100" y="45" text-anchor="middle" fill="#94a3b8" font-size="10">化學氧化層快速被溶解咬除</text>
              <line x1="20" y1="65" x2="180" y2="65" stroke="#10b981" stroke-width="2" stroke-dasharray="4 3"/>
              <text x="100" y="85" text-anchor="middle" fill="#34d399" font-size="11">形成疏水性 (Hydrophobic) 表面</text>
            </g>
            <text x="110" y="320" text-anchor="middle" fill="#34d399" font-size="10.5">移除氧化層中之殘留雜質</text>
          </g>

          <!-- 區域 3: SC-2 (RCA-2) 酸性金屬離子錯化 -->
          <g transform="translate(550, 30)">
            <text x="110" y="25" text-anchor="middle" fill="#f59e0b" font-size="13" font-weight="750">3. SC-2 (RCA-2 清洗)</text>
            <text x="110" y="45" text-anchor="middle" fill="#94a3b8" font-size="10.5">HCl : H₂O₂ : H₂O @ 70°C</text>

            <!-- 晶圓矽基板 -->
            <rect x="10" y="230" width="200" height="40" fill="#334155" rx="3"/>
            <text x="110" y="255" text-anchor="middle" fill="#cbd5e1" font-size="11">Si 基底 (生成潔淨鈍化氧化膜)</text>

            <!-- 金屬離子螯合絡合物反應 -->
            <g transform="translate(20, 110)">
              <circle cx="40" cy="30" r="16" fill="#e11d48"/>
              <text x="40" y="34" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">Fe³⁺</text>
              <circle cx="160" cy="30" r="16" fill="#e11d48"/>
              <text x="160" y="34" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">Cu²⁺</text>

              <path d="M 60,30 L 140,30" stroke="#f59e0b" stroke-width="2"/>
              <text x="100" y="24" text-anchor="middle" fill="#fbbf24" font-size="10">+ 6Cl⁻</text>
              <text x="100" y="70" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">[FeCl₆]³⁻ 可溶性氯錯離子</text>
              <text x="100" y="90" text-anchor="middle" fill="#94a3b8" font-size="10">永遠溶入清洗液，不再沉積</text>
            </g>
            <text x="110" y="320" text-anchor="middle" fill="#f59e0b" font-size="10.5">金屬離子殘留 &lt; 1E10 atoms/cm²</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch09_metric_pre}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 99.8%</div>
          <div class="eng-obj-metric-note">SC-1 表面同極性負電排斥脫附</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch09_metric_metal}</div>
          <div class="eng-obj-metric-value">&lt; 1×10¹⁰ atoms/cm²</div>
          <div class="eng-obj-metric-note">SC-2 鹽酸螯合鐵/銅重金屬離子</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">Zeta 電位 (ζ-potential)</div>
          <div class="eng-obj-metric-value">-40 ~ -50 mV</div>
          <div class="eng-obj-metric-note">強烈庫侖排斥杜絕顆粒二次吸附</div>
        </div>
      `;

      footerNote = t.ch09_rca_desc;
    } else if (activeTab === 'megasonic') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Megasonic Acoustic Streaming and Boundary Layer">
          <!-- 上方兆聲波石英發振器 (Megasonic Transducer Array @ 1MHz) -->
          <g transform="translate(100, 30)">
            <rect x="0" y="0" width="600" height="35" rx="4" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
            <text x="300" y="22" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">兆聲波壓電換能器陣列 (Megasonic Transducer: 0.8 ~ 2.0 MHz)</text>
          </g>

          <!-- 高頻縱波聲壓震盪場 (Acoustic Wavefronts) -->
          <g transform="translate(120, 80)" class="anim-acoustic">
            ${Array.from({ length: 6 }, (_, i) => `
              <line x1="0" y1="${i * 24 + 10}" x2="560" y2="${i * 24 + 10}" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="6 4" opacity="${0.9 - i * 0.1}"/>
            `).join('')}
            <text x="280" y="80" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="600">高頻聲波壓力場與聲微流 (Acoustic Microstreaming)</text>
          </g>

          <!-- 下方晶圓表面邊界層微觀剖面 -->
          <g transform="translate(100, 240)">
            <!-- 水動力邊界層對照區 -->
            <rect x="0" y="0" width="280" height="130" fill="#0f172a" stroke="#ef4444" stroke-width="1.5" rx="4"/>
            <text x="140" y="24" text-anchor="middle" fill="#f87171" font-size="11" font-weight="700">普通清洗水流：厚邊界層 (δ ~ 10µm)</text>
            <!-- 邊界層死區 -->
            <rect x="10" y="40" width="260" height="40" fill="#ef4444" opacity="0.2"/>
            <text x="140" y="65" text-anchor="middle" fill="#f87171" font-size="10">水流停滯死區 (微粒受保護無法沖刷)</text>
            <!-- 躲在死區內的微粒 -->
            <circle cx="80" cy="70" r="8" fill="#f87171"/>
            <circle cx="160" cy="72" r="6" fill="#f87171"/>
            <circle cx="210" cy="68" r="9" fill="#f87171"/>
            <rect x="10" y="90" width="260" height="30" fill="#334155"/>
            <text x="140" y="110" text-anchor="middle" fill="#cbd5e1" font-size="10.5">晶圓表面 (Wafer Surface)</text>

            <!-- 兆聲波清洗區：壓縮邊界層 -->
            <rect x="320" y="0" width="280" height="130" fill="#0f172a" stroke="#10b981" stroke-width="1.5" rx="4"/>
            <text x="460" y="24" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">兆聲波清洗：壓縮邊界層 (δ &lt; 0.5µm)</text>
            <!-- 薄邊界層 -->
            <rect x="330" y="75" width="260" height="10" fill="#10b981" opacity="0.3"/>
            <text x="460" y="70" text-anchor="middle" fill="#34d399" font-size="10">超薄邊界層 (產生極高剪切應力)</text>
            <!-- 被聲流硬生生扯離的微粒 -->
            <g transform="translate(460, 45)">
              <circle cx="-30" cy="-5" r="7" fill="#34d399"/>
              <path d="M -30,-5 L -10,-25" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
              <circle cx="30" cy="5" r="6" fill="#34d399"/>
              <path d="M 30,5 L 50,-15" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
              <text x="0" y="-12" text-anchor="middle" fill="#38bdf8" font-size="10">微粒被音流剝離捲走 ↗</text>
            </g>
            <rect x="330" y="90" width="260" height="30" fill="#334155"/>
            <text x="460" y="110" text-anchor="middle" fill="#cbd5e1" font-size="10.5">晶圓表面 (Wafer Surface)</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">兆聲波頻率 (Frequency)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">0.8 ~ 2.0 MHz</div>
          <div class="eng-obj-metric-note">避免超音波 (20-40kHz) 崩塌破壞奈米線結構</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch09_metric_boundary}</div>
          <div class="eng-obj-metric-value">&lt; 0.5 µm (壓縮 95%)</div>
          <div class="eng-obj-metric-note">音流突破微觀水流滯留死區</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">微粒脫附剪切應力</div>
          <div class="eng-obj-metric-value">&gt; 10⁴ N/m²</div>
          <div class="eng-obj-metric-note">直接粉碎凡得瓦爾 (van der Waals) 吸附力</div>
        </div>
      `;

      footerNote = t.ch09_megasonic_desc;
    } else if (activeTab === 'marangoni') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Marangoni Surface Tension Gradient Drying">
          <!-- 水槽槽體 (UPW Bath) -->
          <rect x="80" y="180" width="640" height="210" rx="4" fill="#0284c7" opacity="0.25" stroke="#0ea5e9" stroke-width="2"/>
          <text x="400" y="360" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">超純水槽 (Ultrapure Water UPW Bath: 表面張力 γ_high ≈ 72 mN/m)</text>

          <!-- 頂部注入 IPA 蒸氣 (IPA Vapor Injection) -->
          <g transform="translate(180, 30)">
            <rect x="0" y="0" width="440" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="220" y="20" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">IPA (異丙醇蒸氣) + N₂ 載氣噴入</text>
            <!-- IPA 氣流向下流動 -->
            <path d="M 120,35 L 120,75" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3"/>
            <path d="M 220,35 L 220,75" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3"/>
            <path d="M 320,35 L 320,75" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3"/>
          </g>

          <!-- 緩慢向上提拉的晶圓 (Wafer Slow Pulling Up) -->
          <g transform="translate(360, 60)">
            <rect x="0" y="0" width="80" height="260" rx="3" fill="#64748b" stroke="#cbd5e1" stroke-width="2"/>
            <text x="40" y="100" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700" transform="rotate(-90 40 100)">晶圓緩慢向上提拉 ↑ (1-2 mm/s)</text>
            <text x="40" y="60" text-anchor="middle" fill="#34d399" font-size="10.5">100% 潔淨乾爽</text>
          </g>

          <!-- 彎月面 (Meniscus) 表面張力差驅動微觀流動 (Marangoni Effect) -->
          <g transform="translate(440, 150)" class="anim-liquid-flow">
            <!-- 彎月水膜弧線 -->
            <path d="M 0,20 Q 30,30 60,60" fill="none" stroke="#38bdf8" stroke-width="4"/>
            <!-- IPA 融入使得頂部表面張力低 -->
            <text x="75" y="25" fill="#fbbf24" font-size="11" font-weight="700">頂部低表面張力 (γ_low ≈ 22 mN/m)</text>
            <!-- 底部純水表面張力高 -->
            <text x="75" y="70" fill="#38bdf8" font-size="11" font-weight="700">槽內高表面張力 (γ_high ≈ 72 mN/m)</text>
            <!-- Marangoni 向下拉力箭頭 -->
            <path d="M 25,25 L 45,55" stroke="#10b981" stroke-width="3" marker-end="url(#arrow)"/>
            <text x="75" y="48" fill="#34d399" font-size="11.5" font-weight="750">⇓ Marangoni 表面張力梯度拉回力</text>
            <text x="75" y="95" fill="#cbd5e1" font-size="10">水膜自發被向下吸回水槽，無水滴殘留蒸發</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch09_metric_watermark}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">0 Defects (零水痕)</div>
          <div class="eng-obj-metric-note">杜絕水滴蒸發析出二氧化矽殘斑</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">表面張力梯度差 (Δγ)</div>
          <div class="eng-obj-metric-value">~ 50 mN/m</div>
          <div class="eng-obj-metric-note">強大毛細收縮力牽引液膜下洩</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">晶圓提拉速率</div>
          <div class="eng-obj-metric-value">1.0 ~ 2.0 mm/s</div>
          <div class="eng-obj-metric-note">慢速等速脫附形成連續均勻彎月面</div>
        </div>
      `;

      footerNote = t.ch09_marangoni_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh09Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 09</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh09Title">${t.ch09_title}</h2>
          <p class="eng-obj-subtitle">${t.ch09_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'rca' ? 'is-active' : ''}" data-tab="rca">${t.ch09_tab_rca}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'megasonic' ? 'is-active' : ''}" data-tab="megasonic">${t.ch09_tab_megasonic}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'marangoni' ? 'is-active' : ''}" data-tab="marangoni">${t.ch09_tab_marangoni}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 11. Ch 11 CMOS 完整整合剖面與步進模型 (Full CMOS Integrated Stepper Model)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderCMOSFlowObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeStep = 1; // 1 to 6

  function update() {
    let stepTitle = '';
    let stepDesc = '';
    let sectionTag = '';

    if (activeStep === 1) {
      stepTitle = t.ch11_step_1;
      stepDesc = '淺溝槽隔離 (STI)：在 P 型基板上透過微影蝕刻出 300nm 溝槽，沉積高密度電漿氧化物 (HDP-CVD SiO₂) 充填，再以 CMP 研磨平整，將相鄰 NMOS 與 PMOS 活性區徹底絕緣隔開。';
      sectionTag = t.ch11_tab_feol;
    } else if (activeStep === 2) {
      stepTitle = t.ch11_step_2;
      stepDesc = '雙井區離子佈植 (Twin-Well)：光阻遮蔽左側 PMOS 區，高能注入磷 (P⁺) 形成 N-Well；光阻遮蔽右側 NMOS 區，注入硼 (B⁺) 形成 P-Well，界定不同極性電晶體的背底基板。';
      sectionTag = t.ch11_tab_feol;
    } else if (activeStep === 3) {
      stepTitle = t.ch11_step_3;
      stepDesc = 'High-k 金屬閘極 (HKMG Stack)：沉積 1.5nm 超薄氧化鉿 (HfO₂, k~25) 介電層，上方覆蓋功函數調節金屬層 (TiN/TaN) 與鎢閘極，兩側形成氮化矽 (Si₃N₄) 間隔側牆 (Spacers)。';
      sectionTag = t.ch11_tab_feol;
    } else if (activeStep === 4) {
      stepTitle = t.ch11_step_4;
      stepDesc = '源極/汲極應變磊晶與佈植：PMOS 區選擇性磊晶成長 SiGe (引入雙軸壓縮應力，電洞遷移率提升 60%)；NMOS 區磊晶 Si:C (引入伸張應力，電子遷移率提升 50%) 並注入重摻雜離子。';
      sectionTag = t.ch11_tab_feol;
    } else if (activeStep === 5) {
      stepTitle = t.ch11_step_5;
      stepDesc = '中段製程 (MOL: Contact & Plugs)：源汲極表面反應生成低阻抗自對準矽化鎳 (NiSi)；覆蓋層間介電質 (ILD0) 後蝕刻高深寬比接觸孔，並以 CVD 鎢 (Tungsten W) 填滿接腳。';
      sectionTag = t.ch11_tab_mol;
    } else if (activeStep === 6) {
      stepTitle = t.ch11_step_6;
      stepDesc = '後段製程 (BEOL: 10+ 層金屬互連線)：以雙載子鑲嵌 (Dual Damascene) 工藝依序堆疊 M1 至 M10+ 層銅導線與通孔 (Vias)，並由極低介電常數 (Low-k) 材料隔離，完成全功能晶片！';
      sectionTag = t.ch11_tab_beol;
    }

    const viewportHtml = `
      <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CMOS Integrated Process Step Cross-Section">
        <!-- 頂部步進標示 -->
        <rect x="40" y="15" width="720" height="35" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="60" y="38" fill="#38bdf8" font-size="12" font-weight="750">[${sectionTag}] ${stepTitle}</text>
        <text x="730" y="38" text-anchor="end" fill="#94a3b8" font-size="11">工步 ${activeStep} / 6</text>

        <!-- 矽基底本體 (P-Substrate @ 底部) -->
        <g transform="translate(60, 60)">
          <!-- 矽基板 -->
          <rect x="0" y="240" width="680" height="90" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
          <text x="340" y="295" text-anchor="middle" fill="#94a3b8" font-size="12">P-Type 矽基底 (P-Substrate &lt;100&gt;)</text>

          <!-- 步驟 1+: STI 隔離槽 (中間與兩側) -->
          <rect x="0" y="200" width="80" height="40" fill="#0284c7" opacity="0.7"/>
          <rect x="300" y="200" width="80" height="40" fill="#0284c7" opacity="0.7"/>
          <rect x="600" y="200" width="80" height="40" fill="#0284c7" opacity="0.7"/>
          <text x="340" y="225" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">STI (SiO₂)</text>

          <!-- 步驟 2+: 雙井區 (N-Well 左側 PMOS, P-Well 右側 NMOS) -->
          ${activeStep >= 2 ? `
            <rect x="80" y="190" width="220" height="90" fill="#f59e0b" opacity="0.25" stroke="#f59e0b" stroke-dasharray="2 2"/>
            <text x="190" y="260" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="700">N-Well (PMOS 區域)</text>

            <rect x="380" y="190" width="220" height="90" fill="#10b981" opacity="0.25" stroke="#10b981" stroke-dasharray="2 2"/>
            <text x="490" y="260" text-anchor="middle" fill="#34d399" font-size="12" font-weight="700">P-Well (NMOS 區域)</text>
          ` : `
            <text x="190" y="225" text-anchor="middle" fill="#64748b" font-size="11">活性區 1 (待做 PMOS)</text>
            <text x="490" y="225" text-anchor="middle" fill="#64748b" font-size="11">活性區 2 (待做 NMOS)</text>
          `}

          <!-- 步驟 3+: HKMG 閘極堆疊 -->
          ${activeStep >= 3 ? `
            <!-- PMOS 閘極 -->
            <g transform="translate(160, 145)">
              <rect x="0" y="50" width="60" height="5" fill="#38bdf8"/>
              <rect x="0" y="15" width="60" height="35" fill="#64748b" stroke="#cbd5e1" stroke-width="1.5"/>
              <!-- Spacers -->
              <rect x="-8" y="15" width="8" height="40" fill="#475569"/>
              <rect x="60" y="15" width="8" height="40" fill="#475569"/>
              <text x="30" y="38" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">Gate</text>
            </g>
            <!-- NMOS 閘極 -->
            <g transform="translate(460, 145)">
              <rect x="0" y="50" width="60" height="5" fill="#38bdf8"/>
              <rect x="0" y="15" width="60" height="35" fill="#64748b" stroke="#cbd5e1" stroke-width="1.5"/>
              <!-- Spacers -->
              <rect x="-8" y="15" width="8" height="40" fill="#475569"/>
              <rect x="60" y="15" width="8" height="40" fill="#475569"/>
              <text x="30" y="38" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">Gate</text>
            </g>
          ` : ''}

          <!-- 步驟 4+: 源汲極應變磊晶 (SiGe / Si:C) -->
          ${activeStep >= 4 ? `
            <!-- PMOS SiGe S/D -->
            <rect x="90" y="190" width="55" height="15" fill="#e11d48" rx="2"/>
            <rect x="235" y="190" width="55" height="15" fill="#e11d48" rx="2"/>
            <text x="117" y="202" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">SiGe S</text>
            <text x="262" y="202" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">SiGe D</text>

            <!-- NMOS Si:C S/D -->
            <rect x="390" y="190" width="55" height="15" fill="#059669" rx="2"/>
            <rect x="535" y="190" width="55" height="15" fill="#059669" rx="2"/>
            <text x="417" y="202" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">Si:C S</text>
            <text x="562" y="202" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">Si:C D</text>
          ` : ''}

          <!-- 步驟 5+: MOL 接觸孔與鎢插塞 (W-Plugs) -->
          ${activeStep >= 5 ? `
            <!-- ILD0 介電層 -->
            <rect x="0" y="80" width="680" height="80" fill="#0f172a" opacity="0.5" stroke="#334155" stroke-dasharray="2 2"/>
            <!-- 垂直金屬鎢插塞 (Tungsten Plugs) -->
            ${[117, 190, 262, 417, 490, 562].map(x => `
              <rect x="${x - 5}" y="80" width="10" height="80" fill="#cbd5e1" stroke="#f59e0b" stroke-width="1"/>
            `).join('')}
            <text x="340" y="115" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">MOL Contact 鎢插塞 (W-Plugs)</text>
          ` : ''}

          <!-- 步驟 6+: BEOL 銅導線 (M1) -->
          ${activeStep >= 6 ? `
            <g transform="translate(0, 20)">
              <rect x="0" y="0" width="680" height="60" fill="#09131b" stroke="#38bdf8" stroke-width="1.5"/>
              <!-- M1 銅導線區塊 -->
              <rect x="100" y="10" width="70" height="40" rx="3" fill="#ea580c" stroke="#f97316" stroke-width="1.5"/>
              <rect x="230" y="10" width="100" height="40" rx="3" fill="#ea580c" stroke="#f97316" stroke-width="1.5"/>
              <rect x="400" y="10" width="120" height="40" rx="3" fill="#ea580c" stroke="#f97316" stroke-width="1.5"/>
              <rect x="550" y="10" width="60" height="40" rx="3" fill="#ea580c" stroke="#f97316" stroke-width="1.5"/>
              <text x="340" y="35" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">BEOL M1 / M2 雙鑲嵌銅導線 (Cu Interconnects)</text>
            </g>
          ` : ''}
        </g>
      </svg>
    `;

    const dashboardHtml = `
      <div class="eng-obj-metric-card">
        <div class="eng-obj-metric-label">${t.ch11_metric_masks}</div>
        <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">60 ~ 80+ 層</div>
        <div class="eng-obj-metric-note">DUV/EUV 多重曝光精確疊對</div>
      </div>
      <div class="eng-obj-metric-card">
        <div class="eng-obj-metric-label">${t.ch11_metric_steps}</div>
        <div class="eng-obj-metric-value">1,200 ~ 1,500 步</div>
        <div class="eng-obj-metric-note">包含薄膜、微影、蝕刻、佈植與 CMP 循環</div>
      </div>
      <div class="eng-obj-metric-card">
        <div class="eng-obj-metric-label">${t.ch11_metric_cycle}</div>
        <div class="eng-obj-metric-value">2.5 ~ 3.5 個月</div>
        <div class="eng-obj-metric-note">晶圓在全自動無塵室中穿越數千台設備</div>
      </div>
    `;

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh11Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 11</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh11Title">${t.ch11_title}</h2>
          <p class="eng-obj-subtitle">${t.ch11_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-stepper-bar" style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${[1, 2, 3, 4, 5, 6].map(i => `
              <button type="button" class="eng-obj-tab ${activeStep === i ? 'is-active' : ''}" data-step="${i}">
                ${lang === 'zh' ? `工步 ${i}` : `Step ${i}`}
              </button>
            `).join('')}
            <button type="button" class="eng-obj-btn eng-obj-btn-primary" data-action="next" style="margin-left: auto;">
              ${t.btn_next_step}
            </button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${stepDesc}</div>
        </footer>
      </section>
    `;

    container.querySelectorAll('[data-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeStep = parseInt(btn.getAttribute('data-step'), 10);
        update();
      });
    });

    const nextBtn = container.querySelector('[data-action="next"]');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        activeStep = activeStep < 6 ? activeStep + 1 : 1;
        update();
      });
    }
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 12. Ch 13 三大記憶體技術微觀立體模型 (DRAM 1T1C, 3D NAND Staircase, HBM 3D)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderMemoryTechObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'dram'; // 'dram' | 'nand' | 'hbm'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'dram') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DRAM 1T1C High-Aspect Capacitor Structure">
          <!-- 上方超高深寬比圓柱電容陣列 (Aspect Ratio > 50:1) -->
          <g transform="translate(100, 30)">
            <rect x="0" y="0" width="600" height="230" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5" rx="6"/>
            <text x="300" y="25" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="750">DRAM 圓柱狀立體儲存電容矩陣 (Aspect Ratio &gt; 50:1)</text>

            <!-- 垂直圓柱電容結構 (Cylinder Capacitors with High-k ZAZ Film) -->
            ${[60, 150, 240, 330, 420, 510].map((x, idx) => `
              <g transform="translate(${x}, 40)">
                <!-- 外層金屬電極 (Outer TiN Plate) -->
                <rect x="-16" y="0" width="32" height="170" rx="4" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
                <!-- 中間高介電薄膜 (High-k ZAZ: ZrO₂ / Al₂O₃ / ZrO₂) -->
                <rect x="-12" y="2" width="24" height="166" rx="3" fill="#0284c7" opacity="0.6"/>
                <!-- 內層金屬電極 (Inner TiN Node) -->
                <rect x="-6" y="5" width="12" height="160" rx="2" fill="#ea580c"/>
                <!-- 電荷儲存指示 (+) -->
                <text x="0" y="80" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="800">Q</text>
                <text x="0" y="195" text-anchor="middle" fill="#38bdf8" font-size="9.5">Cap ${idx + 1}</text>
              </g>
            `).join('')}
            <text x="300" y="222" text-anchor="middle" fill="#94a3b8" font-size="10.5">TiN 內外金屬電極 + 2nm ZrO₂/Al₂O₃/ZrO₂ 高介電絕緣質</text>
          </g>

          <!-- 下方 1T 存取電晶體與埋入式字元線 (Buried Word-Line bWL) -->
          <g transform="translate(100, 280)">
            <rect x="0" y="0" width="600" height="110" fill="#1e293b" stroke="#334155" stroke-width="1.5" rx="6"/>
            <!-- 埋入式字元線 (bWL) -->
            <rect x="40" y="40" width="220" height="30" rx="3" fill="#475569" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="150" y="60" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">埋入式字元線 (Buried Word-Line)</text>
            <!-- 位元線 (Bit-Line BL) -->
            <rect x="340" y="40" width="220" height="30" rx="3" fill="#475569" stroke="#10b981" stroke-width="1.5"/>
            <text x="450" y="60" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">垂直位元線 (Bit-Line BL)</text>
            <text x="300" y="95" text-anchor="middle" fill="#94a3b8" font-size="10.5">1T1C 架構：每 64ms 刷新週期 (tREFI) 補充電荷漏電</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch13_metric_dram_ar}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 50:1</div>
          <div class="eng-obj-metric-note">極高深寬比維持 ~25 fF/cell 足額電容</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch13_metric_retention}</div>
          <div class="eng-obj-metric-value">64 ms</div>
          <div class="eng-obj-metric-note">動態刷新電路補償介電質穿隧漏電</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">記憶體單元面積</div>
          <div class="eng-obj-metric-value">6F²</div>
          <div class="eng-obj-metric-note">4F² 3D DRAM 是下世代研發目標</div>
        </div>
      `;

      footerNote = t.ch13_dram_desc;
    } else if (activeTab === 'nand') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D NAND Flash 200+ Layer Staircase Architecture">
          <!-- 左側：交替疊層與垂直通道孔 (Alternating Stack & HAR Etch) -->
          <g transform="translate(60, 30)">
            <rect x="0" y="0" width="340" height="350" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5" rx="6"/>
            <text x="170" y="28" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="750">200+ 層交替堆疊與 HAR 穿孔</text>

            <!-- 多層交替氧化層與鎢閘極 (SiO2 / W pairs) -->
            ${Array.from({ length: 14 }, (_, i) => `
              <rect x="20" y="${i * 18 + 45}" width="300" height="8" fill="#334155"/>
              <rect x="20" y="${i * 18 + 53}" width="300" height="10" fill="#ea580c" opacity="0.85"/>
            `).join('')}

            <!-- 貫穿垂直深孔通道 (HAR Etch Channel Holes) -->
            ${[90, 170, 250].map(x => `
              <rect x="${x - 6}" y="45" width="12" height="250" rx="3" fill="#38bdf8" stroke="#ffffff" stroke-width="1"/>
            `).join('')}
            <text x="170" y="325" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">HAR 垂直通道孔 (深寬比 &gt; 80:1)</text>
            <text x="170" y="340" text-anchor="middle" fill="#94a3b8" font-size="9.5">內含電荷陷阱層 (CTF: ONO) + 多晶矽通道</text>
          </g>

          <!-- 右側：金字塔階梯狀接點引出 (Word-Line Staircase Contact Pads) -->
          <g transform="translate(420, 30)">
            <rect x="0" y="0" width="320" height="350" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
            <text x="160" y="28" text-anchor="middle" fill="#fbbf24" font-size="12.5" font-weight="750">字元線階梯狀引出 (Staircase Pads)</text>

            <!-- 階梯幾何形狀 (逐層向後退縮) -->
            ${Array.from({ length: 8 }, (_, i) => `
              <rect x="30" y="${i * 30 + 55}" width="${260 - i * 28}" height="24" fill="#ea580c" rx="2" stroke="#fbbf24" stroke-width="1"/>
              <!-- 垂直接觸插塞 (Contact Vias) 落在每個階梯上 -->
              <line x1="${260 - i * 28 + 15}" y1="40" x2="${260 - i * 28 + 15}" y2="${i * 30 + 55}" stroke="#cbd5e1" stroke-width="2.5"/>
              <circle cx="${260 - i * 28 + 15}" cy="${i * 30 + 55}" r="3" fill="#ffffff"/>
            `).join('')}
            <text x="160" y="325" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">微影「修切 (Trim)」工藝製成微型階梯</text>
            <text x="160" y="340" text-anchor="middle" fill="#94a3b8" font-size="9.5">數百條 Word-Line 分層引出至金屬互連線</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch13_metric_nand_layers}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">232 ~ 300+ 層</div>
          <div class="eng-obj-metric-note">雙層對準堆疊 (Double-Stack) 工藝</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">HAR 孔深寬比</div>
          <div class="eng-obj-metric-value">&gt; 80:1</div>
          <div class="eng-obj-metric-note">一刀穿透數微米交替介電層</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">單顆裸晶儲存容量</div>
          <div class="eng-obj-metric-value">1 ~ 2 Tb</div>
          <div class="eng-obj-metric-note">TLC (3-bit) / QLC (4-bit) 電荷精準量化</div>
        </div>
      `;

      footerNote = t.ch13_nand_desc;
    } else if (activeTab === 'hbm') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HBM 3D TSV High-Bandwidth Stacking">
          <!-- 底層邏輯控制基底 (Base Die) -->
          <g transform="translate(150, 310)">
            <rect x="0" y="0" width="500" height="50" rx="4" fill="#0f172a" stroke="#0ea5e9" stroke-width="2"/>
            <text x="250" y="30" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">底層邏輯控制晶粒 (Base Logic Die / Buffer Die)</text>
            <text x="250" y="44" text-anchor="middle" fill="#38bdf8" font-size="10">內建 BIST 自我檢測、修復電路與 1024-bit PHY 介面</text>
          </g>

          <!-- 垂直堆疊 4 層 DRAM Core Dies (以 TSV 貫穿) -->
          ${[1, 2, 3, 4].map((layer, idx) => `
            <g transform="translate(180, ${260 - idx * 55})">
              <!-- DRAM Die -->
              <rect x="0" y="0" width="440" height="42" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="220" y="24" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">DRAM Core Die #${5 - layer} (~30 µm 超薄削磨)</text>
              <!-- 貫穿 TSV 柱與微凸塊 -->
              ${[40, 100, 160, 220, 280, 340, 400].map(tx => `
                <line x1="${tx}" y1="0" x2="${tx}" y2="42" stroke="#38bdf8" stroke-width="2.5"/>
                <circle cx="${tx}" cy="46" r="3" fill="#fbbf24"/>
              `).join('')}
            </g>
          `).join('')}

          <!-- 側邊標記與匯流排流向 -->
          <g transform="translate(640, 100)">
            <path d="M 10,20 L 40,20 L 40,220 L 10,220" fill="none" stroke="#38bdf8" stroke-width="2"/>
            <text x="50" y="120" fill="#38bdf8" font-size="11.5" font-weight="700">1024-bit</text>
            <text x="50" y="136" fill="#38bdf8" font-size="10">超寬並行總線</text>
            <text x="50" y="152" fill="#34d399" font-size="11" font-weight="700">&gt; 1.2 TB/s</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch13_metric_hbm_bw}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&gt; 1.2 TB/s</div>
          <div class="eng-obj-metric-note">HBM3e 提供 AI GPU 充足記憶體頻寬</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">匯流排位元寬度 (Bus Width)</div>
          <div class="eng-obj-metric-value">1024-bit</div>
          <div class="eng-obj-metric-note">傳統 DDR5 (32-bit/ch) 難以企及之平行度</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">裸晶厚度 (Die Thinning)</div>
          <div class="eng-obj-metric-value">~ 30 µm</div>
          <div class="eng-obj-metric-note">精密背磨與微凸塊熱壓鍵合 (TCB)</div>
        </div>
      `;

      footerNote = t.ch13_hbm_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh13Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 13</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh13Title">${t.ch13_title}</h2>
          <p class="eng-obj-subtitle">${t.ch13_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'dram' ? 'is-active' : ''}" data-tab="dram">${t.ch13_tab_dram}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'nand' ? 'is-active' : ''}" data-tab="nand">${t.ch13_tab_nand}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'hbm' ? 'is-active' : ''}" data-tab="hbm">${t.ch13_tab_hbm}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 13. Ch 15 CD-SEM 臨界尺寸掃描電鏡、光學明暗場缺陷與橢偏儀薄膜量測模型 (Metrology & Inspection)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderMetrologyInspectionObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'cdsem'; // 'cdsem' | 'optical' | 'ellipsometry'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'cdsem') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CD-SEM Electron Beam Metrology and Line Profile">
          <!-- 上方低能電子槍與磁透鏡組 (FEG @ 500 eV) -->
          <g transform="translate(300, 20)">
            <rect x="50" y="0" width="100" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="100" y="22" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="750">場發射電子槍 (FEG)</text>
            <text x="100" y="48" text-anchor="middle" fill="#94a3b8" font-size="9.5">低著陸能量 500 eV (防光阻收縮)</text>

            <!-- 電磁聚焦透鏡與偏轉掃描極板 (Deflection Plates) -->
            <polygon points="70,55 130,55 110,80 90,80" fill="#334155" stroke="#cbd5e1" stroke-width="1"/>
            <rect x="65" y="85" width="15" height="20" fill="#f59e0b"/>
            <rect x="120" y="85" width="15" height="20" fill="#f59e0b"/>
            <text x="100" y="100" text-anchor="middle" fill="#ffffff" font-size="9">X-Y 掃描極板</text>

            <!-- 聚焦電子束微探針 (Focused E-Beam Probe: 直徑 < 1nm) -->
            <line x1="100" y1="105" x2="100" y2="180" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 2"/>
            <circle cx="100" cy="180" r="3" fill="#38bdf8"/>
          </g>

          <!-- 中段：晶圓奈米溝槽微觀剖面與二次電子 (SE) 逃逸 -->
          <g transform="translate(150, 180)">
            <!-- 矽基底 -->
            <rect x="0" y="60" width="500" height="40" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <text x="250" y="85" text-anchor="middle" fill="#94a3b8" font-size="11">矽晶圓基板 (Silicon Wafer Substrate)</text>

            <!-- 奈米線條光阻/金屬圖案 (Line/Space Pattern) -->
            <g transform="translate(180, 0)">
              <rect x="0" y="0" width="140" height="60" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="70" y="35" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750">奈米圖案 (Line)</text>
              <text x="70" y="50" text-anchor="middle" fill="#38bdf8" font-size="9.5">CD = 14.2 nm</text>

              <!-- 側壁二次電子逃逸 (Edge Blooming) -->
              <circle cx="2" cy="30" r="4" fill="#fbbf24"/>
              <line x1="2" y1="30" x2="-25" y2="10" stroke="#fbbf24" stroke-width="1.5" marker-end="url(#arrow)"/>
              <circle cx="138" cy="30" r="4" fill="#fbbf24"/>
              <line x1="138" y1="30" x2="165" y2="10" stroke="#fbbf24" stroke-width="1.5" marker-end="url(#arrow)"/>
              <text x="-35" y="5" fill="#fbbf24" font-size="9.5">SE 二次電子逃逸</text>
            </g>
          </g>

          <!-- 下方：二次電子信號強度波形圖 (SE Intensity Profile: 經典雙峰曲線) -->
          <g transform="translate(150, 290)">
            <rect x="0" y="0" width="500" height="100" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <text x="250" y="20" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">二次電子信號強度波形 (SE Signal Profile)</text>
            <!-- 雙峰波形曲線 (Peaks at edges due to blooming) -->
            <path d="M 20,70 L 150,70 Q 170,70 178,30 Q 182,75 190,65 L 310,65 Q 318,75 322,30 Q 330,70 350,70 L 480,70" fill="none" stroke="#10b981" stroke-width="2.5"/>
            <!-- 標註兩峰值與量測 CD -->
            <line x1="178" y1="25" x2="178" y2="85" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="322" y1="25" x2="322" y2="85" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
            <line x1="178" y1="85" x2="322" y2="85" stroke="#f59e0b" stroke-width="2"/>
            <text x="250" y="80" text-anchor="middle" fill="#fbbf24" font-size="10.5" font-weight="750">← 演算法提取 Bottom CD (14.2 nm) →</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch15_metric_cd_res}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">± 0.1 nm (3σ)</div>
          <div class="eng-obj-metric-note">亞埃級電子束聚焦探針量測重複性</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">電子著陸能量 (Landing Energy)</div>
          <div class="eng-obj-metric-value">300 ~ 800 eV</div>
          <div class="eng-obj-metric-note">低能量電子避免 EUV 有機光阻微觀灼傷收縮</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">線寬邊緣粗糙度 (LWR / LER)</div>
          <div class="eng-obj-metric-value">1.8 nm</div>
          <div class="eng-obj-metric-note">直接影響電晶體通道漏電與飽和電流分佈</div>
        </div>
      `;

      footerNote = t.ch15_cdsem_desc;
    } else if (activeTab === 'optical') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bright-field vs Dark-field Wafer Defect Inspection">
          <!-- 左側：明場光學檢測 (Bright-field Inspection) -->
          <g transform="translate(60, 30)">
            <rect x="0" y="0" width="320" height="350" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" rx="6"/>
            <text x="160" y="28" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="750">明場檢測 (Bright-Field: 垂直入射)</text>
            <text x="160" y="46" text-anchor="middle" fill="#94a3b8" font-size="10">高 NA 透鏡 · 收集正向反射光 · 偵測圖案變形</text>

            <!-- 光路結構 -->
            <g transform="translate(160, 60)">
              <!-- 光源與物鏡 -->
              <rect x="-40" y="0" width="80" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="3"/>
              <text x="0" y="18" text-anchor="middle" fill="#ffffff" font-size="10">明場物鏡 (NA 0.95)</text>
              <!-- 垂直光線 -->
              <line x1="0" y1="35" x2="0" y2="120" stroke="#38bdf8" stroke-width="3"/>
              <line x1="-15" y1="35" x2="-15" y2="120" stroke="#38bdf8" stroke-width="1.5"/>
              <line x1="15" y1="35" x2="15" y2="120" stroke="#38bdf8" stroke-width="1.5"/>
            </g>

            <!-- 晶圓表面圖案與橋接缺陷 (Bridge Defect) -->
            <g transform="translate(40, 200)">
              <rect x="0" y="40" width="240" height="30" fill="#1e293b"/>
              <rect x="30" y="10" width="40" height="30" fill="#64748b"/>
              <rect x="170" y="10" width="40" height="30" fill="#64748b"/>
              <!-- 缺陷短路橋 (Bridging Pattern Defect) -->
              <rect x="70" y="20" width="100" height="15" fill="#ef4444" stroke="#f87171" stroke-width="1"/>
              <text x="120" y="14" text-anchor="middle" fill="#f87171" font-size="10" font-weight="700">短路橋接缺陷 (Bridge Defect)</text>
              <text x="120" y="90" text-anchor="middle" fill="#38bdf8" font-size="10">反射光強度改變 → 灰階影像對比抓取</text>
            </g>
          </g>

          <!-- 右側：暗場雷射散射檢測 (Dark-field Inspection) -->
          <g transform="translate(420, 30)">
            <rect x="0" y="0" width="320" height="350" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
            <text x="160" y="28" text-anchor="middle" fill="#fbbf24" font-size="12.5" font-weight="750">暗場檢測 (Dark-Field: 斜角掠射)</text>
            <text x="160" y="46" text-anchor="middle" fill="#94a3b8" font-size="10">雷射斜射 · 鏡面反射避開透鏡 · 偵測微小微粒</text>

            <!-- 斜入射雷射 (Grazing Angle Laser) -->
            <line x1="20" y1="70" x2="150" y2="210" stroke="#f59e0b" stroke-width="2.5"/>
            <text x="40" y="65" fill="#fbbf24" font-size="10">雷射斜入射 ↘</text>

            <!-- 鏡面反射光被傾斜擋板濾除 -->
            <line x1="150" y1="210" x2="280" y2="70" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3"/>
            <text x="270" y="65" fill="#64748b" font-size="9.5">鏡面反射光 (不入透鏡)</text>

            <!-- 頂部高靈敏光學收集透鏡與 PMT -->
            <g transform="translate(160, 60)">
              <rect x="-40" y="0" width="80" height="30" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="3"/>
              <text x="0" y="18" text-anchor="middle" fill="#34d399" font-size="10">暗場收集器 (PMT)</text>
            </g>

            <!-- 表面微粒與瑞利散射 (Rayleigh Scattering) -->
            <g transform="translate(40, 210)">
              <rect x="0" y="0" width="240" height="30" fill="#1e293b"/>
              <!-- 15nm 孤立微粒 (Particle) -->
              <circle cx="110" cy="0" r="5" fill="#ef4444" stroke="#ffffff" stroke-width="1"/>
              <!-- 向上發散的瑞利散射光 -->
              <path d="M 110,0 L 110,-120" stroke="#34d399" stroke-width="2.5"/>
              <path d="M 110,0 L 95,-120" stroke="#34d399" stroke-width="1.5"/>
              <path d="M 110,0 L 125,-120" stroke="#34d399" stroke-width="1.5"/>
              <text x="110" y="-40" text-anchor="middle" fill="#34d399" font-size="10" font-weight="700">瑞利散射光 ⇡</text>
              <text x="120" y="55" text-anchor="middle" fill="#fbbf24" font-size="10.5" font-weight="750">漆黑背景下瞬間點亮 15nm 孤立微粒！</text>
            </g>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch15_metric_darkfield}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&lt; 15 nm 微粒</div>
          <div class="eng-obj-metric-note">DUV 266nm 紫外雷射暗場瑞利散射</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">晶圓掃描檢測吞吐量</div>
          <div class="eng-obj-metric-value">&gt; 60 Wafers/hr</div>
          <div class="eng-obj-metric-note">光學全檢能在幾分鐘內掃描百億晶粒</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">明場缺陷辨識率</div>
          <div class="eng-obj-metric-value">&gt; 99.5%</div>
          <div class="eng-obj-metric-note">Die-to-Database 即時影像對照演算法</div>
        </div>
      `;

      footerNote = t.ch15_optical_desc;
    } else if (activeTab === 'ellipsometry') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spectroscopic Ellipsometry for Thin Film Metrology">
          <!-- 入射光源與起偏器 (Polarizer @ 70° Brewster Angle) -->
          <g transform="translate(100, 50)">
            <rect x="0" y="0" width="120" height="35" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="60" y="22" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">寬頻光源 + 起偏器</text>
            <!-- 照射光線 -->
            <line x1="120" y1="35" x2="300" y2="220" stroke="#38bdf8" stroke-width="2.5"/>
            <text x="170" y="110" fill="#38bdf8" font-size="10">線偏振光 (Linearly Polarized)</text>
            <text x="250" y="195" fill="#f59e0b" font-size="11" font-weight="700">θ = 70°</text>
          </g>

          <!-- 晶圓多層薄膜微觀干涉區 (Thin Film Stack) -->
          <g transform="translate(250, 220)">
            <!-- 頂部超薄介電薄膜 (Film to measure: 例如 1.8nm HfO2) -->
            <rect x="0" y="0" width="300" height="20" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="150" y="14" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">待測超薄薄膜 (High-k Film: d = 1.82 nm, n = 2.05)</text>

            <!-- 中間介面層 (Interfacial SiO2 layer) -->
            <rect x="0" y="20" width="300" height="15" fill="#334155"/>
            <text x="150" y="31" text-anchor="middle" fill="#94a3b8" font-size="9">介面氧化層 (IL SiO₂ ~0.8 nm)</text>

            <!-- 矽基底 (Si Substrate) -->
            <rect x="0" y="35" width="300" height="40" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
            <text x="150" y="60" text-anchor="middle" fill="#cbd5e1" font-size="11">矽晶圓基板 (Si Substrate)</text>
          </g>

          <!-- 反射光路、檢偏器與光譜儀 (Analyzer & Spectrometer) -->
          <g transform="translate(550, 50)">
            <line x1="-150" y1="170" x2="30" y2="35" stroke="#f59e0b" stroke-width="2.5"/>
            <!-- 橢圓偏振光標示 -->
            <ellipse cx="-50" cy="110" rx="14" ry="7" fill="none" stroke="#f59e0b" stroke-width="1.5" transform="rotate(-35 -50 110)"/>
            <text x="-40" y="90" fill="#fbbf24" font-size="10">橢圓偏振光 (Elliptically Polarized)</text>

            <rect x="30" y="10" width="130" height="40" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="95" y="28" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="750">檢偏器 + CCD 光譜儀</text>
            <text x="95" y="42" text-anchor="middle" fill="#94a3b8" font-size="9.5">測量 Ψ (振幅) 與 Δ (相位)</text>
          </g>

          <!-- 下方：擬合曲線說明 -->
          <g transform="translate(180, 320)">
            <rect x="0" y="0" width="440" height="60" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1"/>
            <text x="220" y="24" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">tan(Ψ)·e^(iΔ) = R_p / R_s (麥克斯韋電磁場嚴密擬合)</text>
            <text x="220" y="45" text-anchor="middle" fill="#cbd5e1" font-size="10">同時精準解算多層奈米薄膜物理厚度 (d) 與複數折射率 (n, k)</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch15_metric_film_thick}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">± 0.01 nm (0.1 Å)</div>
          <div class="eng-obj-metric-note">光波干涉相位超高靈敏度</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">折射率測量精度</div>
          <div class="eng-obj-metric-value">± 0.001</div>
          <div class="eng-obj-metric-note">即時反演材料化學計量比與緻密度</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">量測特性</div>
          <div class="eng-obj-metric-value">100% 非破壞性</div>
          <div class="eng-obj-metric-note">晶圓量測完畢後可直接進入下一站繼續加工</div>
        </div>
      `;

      footerNote = t.ch15_ellipsometry_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh15Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 15</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh15Title">${t.ch15_title}</h2>
          <p class="eng-obj-subtitle">${t.ch15_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'cdsem' ? 'is-active' : ''}" data-tab="cdsem">${t.ch15_tab_cdsem}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'optical' ? 'is-active' : ''}" data-tab="optical">${t.ch15_tab_optical}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'ellipsometry' ? 'is-active' : ''}" data-tab="ellipsometry">${t.ch15_tab_ellipsometry}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 14. Ch 16 晶圓缺陷圖譜空間分佈、雙束 FIB 與 HR-TEM 結晶分析模型 (Yield & FA)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderYieldFailureAnalysisObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'wafermap'; // 'wafermap' | 'fib' | 'tem'
  let activePattern = 'ring'; // 'ring' | 'edge' | 'scratch' | 'cluster'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'wafermap') {
      // 動態生成 300mm 晶圓圖上的晶粒矩陣
      const dies = [];
      const rows = 9;
      const cols = 9;
      const rLimit = 3.8;

      for (let r = -4; r <= 4; r++) {
        for (let c = -4; c <= 4; c++) {
          const dist = Math.sqrt(r * r + c * c);
          if (dist <= rLimit) {
            let isDefect = false;
            if (activePattern === 'ring') {
              isDefect = dist >= 2.0 && dist <= 2.8;
            } else if (activePattern === 'edge') {
              isDefect = dist >= 3.0;
            } else if (activePattern === 'scratch') {
              isDefect = Math.abs(r - c * 0.8) < 0.6 && c >= -2 && c <= 3;
            } else if (activePattern === 'cluster') {
              isDefect = Math.sqrt((r + 1.8) ** 2 + (c - 1.5) ** 2) < 1.6;
            }
            dies.push({ x: c * 26 + 180, y: r * 26 + 180, isDefect });
          }
        }
      }

      let patternName = '';
      let patternCause = '';
      let patternAction = '';
      if (activePattern === 'ring') {
        patternName = lang === 'zh' ? '同心圓環狀缺陷 (Ring Signature)' : 'Concentric Ring Defect Signature';
        patternCause = lang === 'zh' ? 'CMP 研磨頭多區氣囊壓力失衡、研磨液離心分佈或光阻旋塗乾燥不均' : 'CMP multi-zone carrier pressure imbalance or spin-dry air turbulence';
        patternAction = lang === 'zh' ? '校正 CMP 研磨墊調節器切削深度與各區氣壓' : 'Calibrate CMP pad conditioner profile & carrier zone pressure';
      } else if (activePattern === 'edge') {
        patternName = lang === 'zh' ? '晶圓邊緣失效 (Edge Ring Signature)' : 'Wafer Edge Exclusion Signature';
        patternCause = lang === 'zh' ? '光阻邊緣去膠 (EBR) 噴嘴角度偏斜、蝕刻機邊緣聚焦環 (Focus Ring) 磨耗' : 'EBR nozzle alignment shift or plasma edge focus ring erosion';
        patternAction = lang === 'zh' ? '更換電漿腔體邊緣 Focus Ring 與校準光阻塗佈去膠線' : 'Replace chamber edge focus ring and re-align EBR dispense line';
      } else if (activePattern === 'scratch') {
        patternName = lang === 'zh' ? '弧形劃痕 (Scratch Signature)' : 'Curved Handling Scratch Signature';
        patternCause = lang === 'zh' ? '自動化晶圓機械手臂真空吸盤夾爪微粒摩擦或 FOUP 晶圓盒導軌刮碰' : 'Robotic handler end-effector particle drag or FOUP cassette contact';
        patternAction = lang === 'zh' ? '立即停機檢查機器人搬送軌跡 (Teach) 並清潔機械手接觸墊' : 'Check robot transfer trajectory & clean end-effector vacuum pads';
      } else if (activePattern === 'cluster') {
        patternName = lang === 'zh' ? '局部團塊缺陷 (Cluster Signature)' : 'Localized Cluster Defect Signature';
        patternCause = lang === 'zh' ? '製程腔體內部微粒爆發 (Flaking) 或清洗液滴噴嘴冷凝物掉落' : 'Chamber wall polymer flaking or chemical spray nozzle condensation drip';
        patternAction = lang === 'zh' ? '執行腔體乾蝕刻清機 (Dry Clean) 或定期濕式 PM 保養' : 'Execute chamber plasma dry clean or schedule immediate wet PM';
      }

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wafer Defect Spatial Signatures Interactive Map">
          <!-- 左側：300mm 晶圓圖繪製區 -->
          <g transform="translate(60, 30)">
            <!-- 晶圓邊界圓形 (Notch 缺口位於下方) -->
            <circle cx="180" cy="180" r="170" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5"/>
            <!-- 下方 Notch 凹口 -->
            <polygon points="175,348 185,348 180,356" fill="#38bdf8"/>
            <text x="180" y="372" text-anchor="middle" fill="#64748b" font-size="10">SEMI 300mm Notch</text>

            <!-- 晶粒陣列 (Die Grid) -->
            ${dies.map(d => `
              <rect x="${d.x - 10}" y="${d.y - 10}" width="20" height="20" rx="2"
                    fill="${d.isDefect ? '#ef4444' : '#10b981'}"
                    stroke="#0f172a" stroke-width="1.5"/>
            `).join('')}
          </g>

          <!-- 右側：缺陷特徵診斷資訊面板 -->
          <g transform="translate(450, 40)">
            <rect x="0" y="0" width="300" height="340" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <text x="20" y="35" fill="#38bdf8" font-size="13" font-weight="750">${patternName}</text>

            <!-- 模式選擇按鈕 -->
            <g transform="translate(20, 55)">
              <text x="0" y="15" fill="#94a3b8" font-size="11">切換圖案 (Pattern Select):</text>
              <g transform="translate(0, 25)">
                ${['ring', 'edge', 'scratch', 'cluster'].map((p, idx) => `
                  <rect x="${idx * 65}" y="0" width="60" height="26" rx="3"
                        fill="${activePattern === p ? '#0284c7' : '#1e293b'}"
                        stroke="${activePattern === p ? '#38bdf8' : '#475569'}"
                        style="cursor: pointer;" data-pattern="${p}"/>
                  <text x="${idx * 65 + 30}" y="17" text-anchor="middle"
                        fill="${activePattern === p ? '#ffffff' : '#94a3b8'}"
                        font-size="10.5" font-weight="700" style="pointer-events: none;">${p.toUpperCase()}</text>
                `).join('')}
              </g>
            </g>

            <!-- 診斷說明卡片 -->
            <g transform="translate(20, 135)">
              <rect x="0" y="0" width="260" height="85" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
              <text x="12" y="24" fill="#fbbf24" font-size="11" font-weight="750">可能物理根因 (Root Cause):</text>
              <foreignObject x="12" y="32" width="236" height="48">
                <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 11px; color: #cbd5e1; line-height: 1.4;">
                  ${patternCause}
                </div>
              </foreignObject>
            </g>

            <g transform="translate(20, 235)">
              <rect x="0" y="0" width="260" height="85" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
              <text x="12" y="24" fill="#34d399" font-size="11" font-weight="750">工程排查行動 (Action Plan):</text>
              <foreignObject x="12" y="32" width="236" height="48">
                <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 11px; color: #cbd5e1; line-height: 1.4;">
                  ${patternAction}
                </div>
              </foreignObject>
            </g>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">晶圓整體評估良率</div>
          <div class="eng-obj-metric-value" style="color: ${activePattern === 'cluster' ? '#f59e0b' : 'var(--semi-teal)'};">
            ${activePattern === 'cluster' ? '86.4%' : '92.8%'}
          </div>
          <div class="eng-obj-metric-note">圖譜分類演算法自動對齊機台日誌</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">共通性分析 (Commonality)</div>
          <div class="eng-obj-metric-value">99.8% 匹配腔體</div>
          <div class="eng-obj-metric-note">快速排除其它 90% 無辜設備</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">良率停損反應時間</div>
          <div class="eng-obj-metric-value">&lt; 15 分鐘</div>
          <div class="eng-obj-metric-note">即時攔截整批晶圓防止連續報廢</div>
        </div>
      `;

      footerNote = t.ch16_wafermap_desc;
    } else if (activeTab === 'fib') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dual-Beam FIB In-situ Lamella Preparation">
          <!-- 雙束 FIB 系統結構：Ga+ 離子束 (52° 傾角) + 垂直 SEM 電子束 -->
          <g transform="translate(400, 30)">
            <!-- 垂直 SEM 電子束柱 (Vertical SEM Column) -->
            <rect x="-40" y="0" width="80" height="40" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="3"/>
            <text x="0" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">SEM 電子束柱 (監控)</text>
            <line x1="0" y1="40" x2="0" y2="180" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 2"/>

            <!-- 52° 傾角 Ga+ 聚焦離子束柱 (FIB Column @ 30kV) -->
            <g transform="rotate(52 0 180)">
              <rect x="-35" y="0" width="70" height="40" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="3"/>
              <text x="0" y="24" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="700">Ga⁺ FIB 離子柱</text>
              <line x1="0" y1="40" x2="0" y2="180" stroke="#f59e0b" stroke-width="3"/>
            </g>
          </g>

          <!-- 樣品表面奈米微切剖面 (In-Situ Milling & Lamella) -->
          <g transform="translate(180, 210)">
            <!-- 矽晶片主體 -->
            <rect x="0" y="40" width="440" height="120" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <text x="220" y="145" text-anchor="middle" fill="#94a3b8" font-size="11">失效晶粒基底 (Defective Die Area)</text>

            <!-- 兩側被 Ga+ 離子束物理掏空的深坑 (Trench Cross-Sections) -->
            <polygon points="120,40 160,110 80,110" fill="#09131b" stroke="#f59e0b" stroke-width="1.5"/>
            <polygon points="280,40 320,110 240,110" fill="#09131b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="120" y="80" text-anchor="middle" fill="#f59e0b" font-size="9.5">離子掏空深坑</text>
            <text x="280" y="80" text-anchor="middle" fill="#f59e0b" font-size="9.5">離子掏空深坑</text>

            <!-- 中間留下的超薄樣品薄片 (TEM Lamella: 厚度 25nm) -->
            <rect x="195" y="20" width="10" height="90" fill="#cbd5e1" stroke="#38bdf8" stroke-width="1.5"/>
            <!-- 頂部保護性鉑沉積層 (Pt Protective Cap) -->
            <rect x="190" y="10" width="20" height="10" fill="#94a3b8" stroke="#ffffff" stroke-width="1"/>
            <text x="200" y="0" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="750">Pt 保護帽層</text>
            <text x="200" y="70" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700" transform="rotate(-90 200 70)">TEM Lamella (&lt; 25nm)</text>

            <!-- 奈米機械手鎢探針 (Omniprobe Needle) 提取薄片 -->
            <path d="M 380,0 L 210,18" stroke="#10b981" stroke-width="3"/>
            <circle cx="210" cy="18" r="4" fill="#34d399"/>
            <text x="360" y="-10" fill="#34d399" font-size="11" font-weight="700">奈米機械手臂 (Omniprobe 提取)</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch16_metric_lamella}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">&lt; 25 nm</div>
          <div class="eng-obj-metric-note">使 200kV 高能電子束完全透射</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">切片定位精度</div>
          <div class="eng-obj-metric-value">± 5 nm</div>
          <div class="eng-obj-metric-note">精準直擊單一電晶體閘極擊穿點</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">樣品製備時間</div>
          <div class="eng-obj-metric-value">&lt; 1.5 小時</div>
          <div class="eng-obj-metric-note">原位提取 (In-situ Lift-Out) 大幅加速 FA 流程</div>
        </div>
      `;

      footerNote = t.ch16_fib_desc;
    } else if (activeTab === 'tem') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HR-TEM Atomic Lattice and Gate Dielectric Breakdown">
          <!-- HR-TEM 高分辨晶格視野 (Atomic Columns Grid) -->
          <g transform="translate(100, 30)">
            <rect x="0" y="0" width="600" height="340" fill="#09131b" stroke="#334155" stroke-width="2" rx="6"/>

            <!-- 矽基底單晶原子陣列 (<110> 晶帶軸原子柱) -->
            ${Array.from({ length: 11 }, (_, r) => 
              Array.from({ length: 16 }, (_, c) => `
                <circle cx="${c * 35 + 40}" cy="${r * 22 + 100}" r="4" fill="#64748b" opacity="0.8"/>
              `).join('')
            ).join('')}
            <text x="300" y="315" text-anchor="middle" fill="#94a3b8" font-size="11">單晶矽基底原子柱陣列 (Si Lattice Columns &lt;110&gt;)</text>

            <!-- 閘極 High-k 氧化層 (1.5nm HfO2) -->
            <rect x="30" y="55" width="540" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 2"/>
            <text x="140" y="74" fill="#38bdf8" font-size="11" font-weight="700">High-k 閘極介電層 (1.5nm HfO₂)</text>

            <!-- 介電層原子擊穿針孔 (Dielectric Breakdown Pinhole: 漏電根因) -->
            <g transform="translate(380, 50)">
              <circle cx="15" cy="20" r="16" fill="#ef4444" opacity="0.6"/>
              <!-- 晶格畸變與熔穿短路通道 -->
              <path d="M 5,5 Q 15,35 25,10" stroke="#f87171" stroke-width="2.5"/>
              <text x="15" y="-12" text-anchor="middle" fill="#f87171" font-size="11" font-weight="800">擊穿熔孔 (Breakdown Pinhole)</text>
              <text x="15" y="4" text-anchor="middle" fill="#fbbf24" font-size="9.5">原子穿隧短路通道 (Short Circuit)</text>
            </g>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch16_metric_tem_res}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&lt; 0.05 nm (次埃級)</div>
          <div class="eng-obj-metric-note">球差校正 (Cs-Corrected) 透射電鏡</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">電子束加速電壓</div>
          <div class="eng-obj-metric-value">200 ~ 300 kV</div>
          <div class="eng-obj-metric-note">極短德布羅意波長解析原子間距</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">失效分析判定</div>
          <div class="eng-obj-metric-value" style="color: #ef4444;">TDDB 介電質擊穿</div>
          <div class="eng-obj-metric-note">物理定讞證據指向局部電場過高</div>
        </div>
      `;

      footerNote = t.ch16_tem_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh16Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 16</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh16Title">${t.ch16_title}</h2>
          <p class="eng-obj-subtitle">${t.ch16_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'wafermap' ? 'is-active' : ''}" data-tab="wafermap">${t.ch16_tab_wafermap}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'fib' ? 'is-active' : ''}" data-tab="fib">${t.ch16_tab_fib}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'tem' ? 'is-active' : ''}" data-tab="tem">${t.ch16_tab_tem}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    container.querySelectorAll('[data-pattern]').forEach(btn => {
      btn.addEventListener('click', () => {
        activePattern = btn.getAttribute('data-pattern');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 15. Ch 17 統計製程控制 (SPC)、Cpk 常態分佈與 R2R 閉環模型 (Process Control)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderProcessControlObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'spc'; // 'spc' | 'cpk' | 'r2r'
  let spcMode = 'normal'; // 'normal' | 'shift' | 'drift'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'spc') {
      // 產生 18 個批次點
      const points = [];
      for (let i = 0; i < 18; i++) {
        let val = 150; // 中心線 CL
        if (spcMode === 'normal') {
          val += Math.sin(i * 1.5) * 18 + (i % 2 === 0 ? 8 : -8);
        } else if (spcMode === 'shift') {
          // 後 9 點連續在 CL 上方 (WECO Rule 2)
          val += i < 8 ? (Math.sin(i) * 15) : (25 + (i % 3) * 6);
        } else if (spcMode === 'drift') {
          // 連續遞增出界 (WECO Rule 3)
          val += (i - 8) * 8;
        }
        points.push({ x: i * 36 + 80, y: 300 - val });
      }

      const pathStr = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');

      let oocMessage = lang === 'zh' ? '製程受控 (In-Control): 數據均勻隨機分佈在中心線兩側' : 'Process In-Control: Natural random variation around center line';
      let oocColor = '#10b981';
      if (spcMode === 'shift') {
        oocMessage = lang === 'zh' ? '警報觸發: WECO 規則 2 (連續 9 點在中心線同側，均值發生位移！)' : 'ALARM: WECO Rule 2 (9 consecutive points on same side of center line)';
        oocColor = '#ef4444';
      } else if (spcMode === 'drift') {
        oocMessage = lang === 'zh' ? '警報觸發: WECO 規則 1 & 3 (連續 6 點遞增且單點超出 +3σ 管制上限！)' : 'ALARM: WECO Rule 1 & 3 (6 points trending up & point exceeds +3σ UCL)';
        oocColor = '#ef4444';
      }

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SPC Shewhart Control Chart and Western Electric Rules">
          <!-- 圖表繪製區背景 -->
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="680" height="300" fill="#0f172a" stroke="#334155" stroke-width="1.5" rx="6"/>

            <!-- 管制界限與規格線 -->
            <!-- UCL (+3σ) -->
            <line x1="20" y1="60" x2="660" y2="60" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="5 3"/>
            <text x="665" y="64" fill="#f87171" font-size="10.5" font-weight="700">UCL (+3σ)</text>

            <!-- CL (中心線) -->
            <line x1="20" y1="150" x2="660" y2="150" stroke="#38bdf8" stroke-width="2"/>
            <text x="665" y="154" fill="#38bdf8" font-size="11" font-weight="750">CL (目標值)</text>

            <!-- LCL (-3σ) -->
            <line x1="20" y1="240" x2="660" y2="240" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="5 3"/>
            <text x="665" y="244" fill="#f87171" font-size="10.5" font-weight="700">LCL (-3σ)</text>

            <!-- 時序數據折線與數據點 -->
            <path d="${pathStr}" fill="none" stroke="${oocColor}" stroke-width="2.5"/>
            ${points.map(p => `
              <circle cx="${p.x}" cy="${p.y}" r="4.5" fill="${p.y < 60 || p.y > 240 ? '#ef4444' : '#38bdf8'}" stroke="#ffffff" stroke-width="1.5"/>
            `).join('')}

            <!-- 狀態文字條 -->
            <rect x="40" y="265" width="600" height="26" rx="3" fill="#1e293b" stroke="${oocColor}" stroke-width="1"/>
            <text x="340" y="282" text-anchor="middle" fill="${oocColor}" font-size="11" font-weight="750">${oocMessage}</text>
          </g>

          <!-- 模式控制按鈕 -->
          <g transform="translate(180, 360)">
            ${[
              { id: 'normal', zh: '正常受控 (Normal)', en: 'In-Control' },
              { id: 'shift', zh: '均值偏移 (Mean Shift)', en: 'Mean Shift' },
              { id: 'drift', zh: '腔體磨損漂移 (Drift)', en: 'Tool Drift' }
            ].map((m, idx) => `
              <rect x="${idx * 160}" y="0" width="140" height="28" rx="4"
                    fill="${spcMode === m.id ? '#0284c7' : '#1e293b'}"
                    stroke="${spcMode === m.id ? '#38bdf8' : '#475569'}"
                    style="cursor: pointer;" data-spc-mode="${m.id}"/>
              <text x="${idx * 160 + 70}" y="18" text-anchor="middle"
                    fill="${spcMode === m.id ? '#ffffff' : '#94a3b8'}"
                    font-size="11" font-weight="700" style="pointer-events: none;">${lang === 'zh' ? m.zh : m.en}</text>
            `).join('')}
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch17_metric_sigma}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">± 3σ (99.73%)</div>
          <div class="eng-obj-metric-note">自然常態分佈管制界限</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch17_metric_ooc}</div>
          <div class="eng-obj-metric-value">WECO 8 大規則</div>
          <div class="eng-obj-metric-note">靈敏捕捉均值位移、趨勢與週期異常</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">自動停機機制 (Auto-Hold)</div>
          <div class="eng-obj-metric-value" style="color: ${spcMode === 'normal' ? 'var(--semi-teal)' : '#ef4444'};">
            ${spcMode === 'normal' ? 'READY (正常)' : 'HOLD (機台鎖定)'}
          </div>
          <div class="eng-obj-metric-note">杜絕異常批次晶圓向下流竄</div>
        </div>
      `;

      footerNote = t.ch17_spc_desc;
    } else if (activeTab === 'cpk') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Process Capability Cpk Gaussian Distribution">
          <!-- 高斯常態分佈曲線 (Gaussian Bell Curves Comparison) -->
          <g transform="translate(100, 40)">
            <rect x="0" y="0" width="600" height="320" fill="#0f172a" stroke="#334155" stroke-width="1.5" rx="6"/>

            <!-- 規格界限 (USL / LSL) -->
            <line x1="80" y1="40" x2="80" y2="280" stroke="#f59e0b" stroke-width="2.5"/>
            <text x="80" y="32" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="800">LSL (規格下限)</text>

            <line x1="520" y1="40" x2="520" y2="280" stroke="#f59e0b" stroke-width="2.5"/>
            <text x="520" y="32" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="800">USL (規格上限)</text>

            <!-- 目標中心線 Target -->
            <line x1="300" y1="40" x2="300" y2="280" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3 3"/>
            <text x="300" y="32" text-anchor="middle" fill="#94a3b8" font-size="10.5">Target (目標中心 μ)</text>

            <!-- 綠色：Cpk = 1.67+ 優秀分佈 (緊縮於中央，零超出) -->
            <path d="M 160,270 Q 260,270 290,90 Q 300,60 310,90 Q 340,270 440,270" fill="none" stroke="#10b981" stroke-width="3"/>
            <text x="300" y="95" text-anchor="middle" fill="#34d399" font-size="11" font-weight="750">Cpk = 1.67 (六標準差卓越製程)</text>
            <text x="300" y="112" text-anchor="middle" fill="#34d399" font-size="9.5">不良率 &lt; 3.4 PPB (十億分之 3.4)</text>

            <!-- 紅色：Cpk = 0.8 不合格分佈 (寬鬆散漫，溢出 LSL/USL) -->
            <path d="M 20,270 Q 150,260 250,160 Q 300,140 350,160 Q 450,260 580,270" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3"/>
            <text x="470" y="170" fill="#f87171" font-size="10.5" font-weight="700">Cpk = 0.8 (能力不足)</text>
            <text x="470" y="185" fill="#f87171" font-size="9.5">不良率 ~ 1.6% (大量報廢)</text>

            <!-- 陰影溢出標記 -->
            <polygon points="20,270 80,270 80,225 20,270" fill="#ef4444" opacity="0.4"/>
            <text x="45" y="260" text-anchor="middle" fill="#f87171" font-size="9">報廢品</text>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch17_metric_cpk_target}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">&ge; 1.67 (6-Sigma)</div>
          <div class="eng-obj-metric-note">半導體量產放行之黃金標準門檻</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">Cp 與 Cpk 的差異</div>
          <div class="eng-obj-metric-value">考慮中心偏移 |μ - T|</div>
          <div class="eng-obj-metric-note">Cp 代表潛在能力，Cpk 代表真實水準</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">預期不良率 (Defect Rate)</div>
          <div class="eng-obj-metric-value">&lt; 3.4 PPB</div>
          <div class="eng-obj-metric-note">百億顆電晶體集成的良率基石</div>
        </div>
      `;

      footerNote = t.ch17_cpk_desc;
    } else if (activeTab === 'r2r') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Run-to-Run Closed-Loop Feedback Control">
          <!-- 閉環控制方塊圖 (Closed-Loop Diagram) -->
          <!-- 1. 機台加工 (Process Chamber) -->
          <g transform="translate(100, 100)">
            <rect x="0" y="0" width="160" height="70" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="80" y="32" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">1. 機台加工</text>
            <text x="80" y="52" text-anchor="middle" fill="#cbd5e1" font-size="10">蝕刻 / 沉積 (Recipe)</text>
          </g>

          <line x1="260" y1="135" x2="330" y2="135" stroke="#38bdf8" stroke-width="3" marker-end="url(#arrow)"/>

          <!-- 2. 在線量測 (In-line Metrology) -->
          <g transform="translate(340, 100)">
            <rect x="0" y="0" width="160" height="70" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <text x="80" y="32" text-anchor="middle" fill="#34d399" font-size="12" font-weight="750">2. 在線量測</text>
            <text x="80" y="52" text-anchor="middle" fill="#cbd5e1" font-size="10">CD-SEM / 橢偏儀</text>
          </g>

          <line x1="500" y1="135" x2="570" y2="135" stroke="#10b981" stroke-width="3" marker-end="url(#arrow)"/>

          <!-- 3. R2R 控制器 (EWMA Algorithm) -->
          <g transform="translate(580, 100)">
            <rect x="0" y="0" width="160" height="70" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
            <text x="80" y="32" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="750">3. R2R 控制核心</text>
            <text x="80" y="52" text-anchor="middle" fill="#cbd5e1" font-size="10">EWMA 指數平滑反饋</text>
          </g>

          <!-- 閉環回饋回路 (Feedback Loop) -->
          <path d="M 660,170 L 660,260 L 180,260 L 180,175" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#arrow)"/>
          <text x="420" y="285" text-anchor="middle" fill="#fbbf24" font-size="11.5" font-weight="750">⇦ 即時配方補償 (動態調整下一批蝕刻時間 -1.2s 或沉積氣體流量) ⇦</text>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">閉環控制演算法</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">EWMA (λ = 0.3)</div>
          <div class="eng-obj-metric-note">兼顧響應靈敏度與濾除單次量測雜訊</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">腔體漂移抑制率</div>
          <div class="eng-obj-metric-value">&gt; 90%</div>
          <div class="eng-obj-metric-note">徹底撫平聚合物沉積造成的腔體老化衰減</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">控制響應週期</div>
          <div class="eng-obj-metric-value">1 Run (即時補償)</div>
          <div class="eng-obj-metric-note">晶圓批次間自動閉環下發更新配方</div>
        </div>
      `;

      footerNote = t.ch17_r2r_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh17Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 17</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh17Title">${t.ch17_title}</h2>
          <p class="eng-obj-subtitle">${t.ch17_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'spc' ? 'is-active' : ''}" data-tab="spc">${t.ch17_tab_spc}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'cpk' ? 'is-active' : ''}" data-tab="cpk">${t.ch17_tab_cpk}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'r2r' ? 'is-active' : ''}" data-tab="r2r">${t.ch17_tab_r2r}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });

    container.querySelectorAll('[data-spc-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        spcMode = btn.getAttribute('data-spc-mode');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 16. Ch 19 WAT 劃線區參數測試與 CP 晶粒針測模型 (WAT & CP Die Sort)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function renderWaferTestObject(container, lang = 'zh') {
  const t = TEXTS[lang] || TEXTS.zh;
  let activeTab = 'wat'; // 'wat' | 'cp' | 'binmap'

  function update() {
    let viewportHtml = '';
    let dashboardHtml = '';
    let footerNote = '';

    if (activeTab === 'wat') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="WAT Scribe-line PCM Test Pattern and Probes">
          <!-- 晶圓切割劃線道 (Scribe-Line Street @ 80µm 寬) -->
          <g transform="translate(60, 40)">
            <!-- 左右兩相鄰實體晶片 (Adjacent Product Dies) -->
            <rect x="0" y="0" width="180" height="320" fill="#0f172a" stroke="#334155" stroke-width="1.5" rx="4"/>
            <text x="90" y="160" text-anchor="middle" fill="#64748b" font-size="12" font-weight="700">產品晶粒 A (Die A)</text>

            <rect x="500" y="0" width="180" height="320" fill="#0f172a" stroke="#334155" stroke-width="1.5" rx="4"/>
            <text x="590" y="160" text-anchor="middle" fill="#64748b" font-size="12" font-weight="700">產品晶粒 B (Die B)</text>

            <!-- 中間劃線道 (Scribe-Line PCM Street) -->
            <rect x="200" y="0" width="280" height="320" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4"/>
            <text x="340" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="750">劃線道 PCM 測試鍵 (Process Control Monitor)</text>

            <!-- PCM 測試結構矩陣與探針下壓 (Test Pads & Probes) -->
            <g transform="translate(230, 45)">
              ${[
                { name: 'NMOS Ion/Ioff', y: 0 },
                { name: 'PMOS Ion/Ioff', y: 65 },
                { name: 'Kelvin Contact Rc', y: 130 },
                { name: 'Comb-Serpentine', y: 195 }
              ].map(item => `
                <g transform="translate(0, ${item.y})">
                  <rect x="0" y="0" width="220" height="50" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1"/>
                  <!-- 4 個測試焊墊 (Test Pads: 40µm x 40µm) -->
                  <rect x="15" y="15" width="20" height="20" fill="#f59e0b" rx="2"/>
                  <rect x="45" y="15" width="20" height="20" fill="#f59e0b" rx="2"/>
                  <rect x="75" y="15" width="20" height="20" fill="#f59e0b" rx="2"/>
                  <rect x="105" y="15" width="20" height="20" fill="#f59e0b" rx="2"/>
                  <!-- 垂直探針接觸 (Probes) -->
                  <line x1="25" y1="-10" x2="25" y2="15" stroke="#e2e8f0" stroke-width="2"/>
                  <line x1="55" y1="-10" x2="55" y2="15" stroke="#e2e8f0" stroke-width="2"/>
                  <text x="160" y="30" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700">${item.name}</text>
                </g>
              `).join('')}
            </g>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">電晶體飽和驅動電流 (Ion)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">1.25 mA/µm (PASS)</div>
          <div class="eng-obj-metric-note">符合設計規範模型標稱值</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">次臨界關斷漏電 (Ioff)</div>
          <div class="eng-obj-metric-value">&lt; 15 pA/µm</div>
          <div class="eng-obj-metric-note">短通道效應與 DIBL 抑制良好</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">WAT 晶圓出廠檢驗判定</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">100% 合格放行</div>
          <div class="eng-obj-metric-note">晶圓製造完成之正式結案成績單</div>
        </div>
      `;

      footerNote = t.ch19_wat_desc;
    } else if (activeTab === 'cp') {
      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CP Probe Card Touchdown on Die Micro-Bumps">
          <!-- 上方探針卡基板 (Probe Card PCB & Space Transformer) -->
          <g transform="translate(100, 30)">
            <rect x="0" y="0" width="600" height="40" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="300" y="25" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="750">探針卡主體 (Vertical Probe Card: 數萬微彈簧針)</text>
          </g>

          <!-- 微彈簧垂直探針束 (Micro-Spring Cantilever Probes) -->
          <g transform="translate(140, 70)">
            ${Array.from({ length: 16 }, (_, i) => `
              <g transform="translate(${i * 34 + 10}, 0)">
                <!-- 彈簧針主體 -->
                <line x1="0" y1="0" x2="0" y2="90" stroke="#cbd5e1" stroke-width="2.5"/>
                <!-- 針尖微彎曲下壓 (Overdrive Touchdown) -->
                <path d="M 0,90 Q 5,100 0,110" fill="none" stroke="#f59e0b" stroke-width="2"/>
                <circle cx="0" cy="112" r="3" fill="#fbbf24"/>
              </g>
            `).join('')}
            <text x="260" y="60" text-anchor="middle" fill="#94a3b8" font-size="11">數萬針高密度微間距 (Pitch 35µm) · 觸地壓力 3.5 gf/pin</text>
          </g>

          <!-- 下方被測晶粒微凸塊 (Die Micro-Bumps) 與晶圓 -->
          <g transform="translate(100, 200)">
            <!-- 晶片凸塊陣列 (Micro-Bumps) -->
            ${Array.from({ length: 16 }, (_, i) => `
              <circle cx="${i * 34 + 50}" cy="10" r="7" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>
            `).join('')}

            <!-- 被測晶粒主體 (DUT: Device Under Test) -->
            <rect x="20" y="18" width="560" height="90" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
            <text x="300" y="55" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="750">待測晶片 (Die Under Test: CPU/GPU 核心)</text>
            <text x="300" y="75" text-anchor="middle" fill="#34d399" font-size="11">高速測試向量激勵 (2.4 GHz Clock · Scan Chain · BIST 自檢)</text>
          </g>

          <!-- 下方晶圓真空吸盤 (Wafer Chuck) -->
          <rect x="80" y="320" width="640" height="30" fill="#334155" rx="3"/>
          <text x="400" y="340" text-anchor="middle" fill="#cbd5e1" font-size="11">晶圓真空吸盤載台 (Wafer Prober Chuck with Thermal Control -40°C ~ 125°C)</text>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch19_metric_pins}</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-blue-dark);">45,000+ 針</div>
          <div class="eng-obj-metric-note">垂直 MEMS 微彈簧針高密度佈置</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">${t.ch19_metric_freq}</div>
          <div class="eng-obj-metric-value">&gt; 2.4 GHz</div>
          <div class="eng-obj-metric-note">高速信號完整性 (SI) 匹配與受控阻抗</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">並行測試站數 (Multi-Site)</div>
          <div class="eng-obj-metric-value">16 Dies / 觸地</div>
          <div class="eng-obj-metric-note">大幅壓低單顆晶片測試成本 (CoT)</div>
        </div>
      `;

      footerNote = t.ch19_cp_desc;
    } else if (activeTab === 'binmap') {
      // 繪製完整的 Bin Map 晶粒分類圖
      const dies = [];
      const rows = 8;
      const cols = 8;
      for (let r = -3; r <= 3; r++) {
        for (let c = -3; c <= 3; c++) {
          if (r * r + c * c <= 11) {
            let bin = 1; // 預設良品
            if (r === 2 && c === 2) bin = 7; // 短路
            else if (r === -2 && c === 1) bin = 9; // 漏電
            else if (r === 0 && c === -3) bin = 2; // 降頻
            dies.push({ x: c * 32 + 180, y: r * 32 + 180, bin });
          }
        }
      }

      viewportHtml = `
        <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wafer Bin Map Classification Diagram">
          <!-- 左側：晶圓 Bin Map 分類圖 -->
          <g transform="translate(60, 30)">
            <circle cx="180" cy="180" r="160" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
            <polygon points="175,338 185,338 180,344" fill="#38bdf8"/>

            ${dies.map(d => {
              let fill = '#10b981'; // Bin 1
              if (d.bin === 2) fill = '#f59e0b'; // Bin 2
              else if (d.bin === 7) fill = '#ef4444'; // Bin 7
              else if (d.bin === 9) fill = '#8b5cf6'; // Bin 9
              return `
                <rect x="${d.x - 12}" y="${d.y - 12}" width="24" height="24" rx="2" fill="${fill}" stroke="#0f172a" stroke-width="1.5"/>
              `;
            }).join('')}
          </g>

          <!-- 右側：Bin 分類圖例與封裝對接說明 -->
          <g transform="translate(440, 40)">
            <rect x="0" y="0" width="310" height="320" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <text x="20" y="32" fill="#38bdf8" font-size="13" font-weight="750">CP 晶粒分類結果 (Bin Classification)</text>

            <g transform="translate(20, 55)">
              <!-- Bin 1 -->
              <rect x="0" y="0" width="20" height="20" fill="#10b981" rx="2"/>
              <text x="30" y="15" fill="#34d399" font-size="11" font-weight="750">Bin 1: Prime 良品 (全功能通過 · 94.2%)</text>

              <!-- Bin 2 -->
              <rect x="0" y="35" width="20" height="20" fill="#f59e0b" rx="2"/>
              <text x="30" y="50" fill="#fbbf24" font-size="11" font-weight="750">Bin 2: Speed Bin (降頻/部分核心可用 · 3.1%)</text>

              <!-- Bin 7 -->
              <rect x="0" y="70" width="20" height="20" fill="#ef4444" rx="2"/>
              <text x="30" y="85" fill="#f87171" font-size="11" font-weight="750">Bin 7: Gross Fail (開路/短路失效 · 1.8%)</text>

              <!-- Bin 9 -->
              <rect x="0" y="105" width="20" height="20" fill="#8b5cf6" rx="2"/>
              <text x="30" y="120" fill="#a78bfa" font-size="11" font-weight="750">Bin 9: Parametric Fail (漏電超標 · 0.9%)</text>
            </g>

            <!-- 封裝揀晶對接流程 -->
            <g transform="translate(20, 205)">
              <rect x="0" y="0" width="270" height="95" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
              <text x="12" y="24" fill="#38bdf8" font-size="11" font-weight="750">傳送至先進封裝廠 (To Assembly):</text>
              <foreignObject x="12" y="32" width="246" height="55">
                <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 11px; color: #cbd5e1; line-height: 1.4;">
                  電子 Bin Map XML 隨晶圓出貨。自動揀晶機 (Die Bonder) 只吸取綠色 Bin 1 良品進入 2.5D/3D 封裝，杜絕浪費高價中介層！
                </div>
              </foreignObject>
            </g>
          </g>
        </svg>
      `;

      dashboardHtml = `
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">CP 晶粒合格良率 (Prime Yield)</div>
          <div class="eng-obj-metric-value" style="color: var(--semi-teal);">94.2% (584 / 620 顆)</div>
          <div class="eng-obj-metric-note">成熟旗艦節點的高良率量產典範</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">次級可用晶粒 (Bin 2)</div>
          <div class="eng-obj-metric-value">3.1% (可做降頻版)</div>
          <div class="eng-obj-metric-note">熔斷禁用瑕疵運算單元 (eFuse) 轉售市場</div>
        </div>
        <div class="eng-obj-metric-card">
          <div class="eng-obj-metric-label">封裝對接格式</div>
          <div class="eng-obj-metric-value">SEMI E142 XML</div>
          <div class="eng-obj-metric-note">晶圓圖座標直接驅動高精度固晶機</div>
        </div>
      `;

      footerNote = t.ch19_binmap_desc;
    }

    container.innerHTML = `
      <section class="eng-obj-card" aria-labelledby="engObjCh19Title">
        <header class="eng-obj-header">
          <div class="eng-obj-badge-row">
            <span class="eng-obj-badge">${t.badge_prefix} · CH 19</span>
            <span class="eng-obj-status">${t.live_sim}</span>
          </div>
          <h2 class="eng-obj-title" id="engObjCh19Title">${t.ch19_title}</h2>
          <p class="eng-obj-subtitle">${t.ch19_sub}</p>
        </header>

        <div class="eng-obj-controls">
          <div class="eng-obj-tab-group" role="tablist">
            <button type="button" class="eng-obj-tab ${activeTab === 'wat' ? 'is-active' : ''}" data-tab="wat">${t.ch19_tab_wat}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'cp' ? 'is-active' : ''}" data-tab="cp">${t.ch19_tab_cp}</button>
            <button type="button" class="eng-obj-tab ${activeTab === 'binmap' ? 'is-active' : ''}" data-tab="binmap">${t.ch19_tab_binmap}</button>
          </div>
        </div>

        <div class="eng-obj-viewport">
          ${viewportHtml}
        </div>

        <div class="eng-obj-dashboard">
          ${dashboardHtml}
        </div>

        <footer class="eng-obj-footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>${footerNote}</div>
        </footer>
      </section>
    `;

    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        update();
      });
    });
  }

  update();
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 總調度入口 (Unified Mount Orchestrator)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export function mountEngineeringObject(chId, container, lang = 'zh') {
  if (!container) return;
  if (chId === 'ch03') {
    renderIngotWaferObject(container, lang);
  } else if (chId === 'ch04') {
    renderLithoOpticalObject(container, lang);
  } else if (chId === 'ch05') {
    renderDepositionMechanismObject(container, lang);
  } else if (chId === 'ch06') {
    renderPlasmaEtchObject(container, lang);
  } else if (chId === 'ch07') {
    renderIonImplantObject(container, lang);
  } else if (chId === 'ch08') {
    renderCMPObject(container, lang);
  } else if (chId === 'ch09') {
    renderWetCleanObject(container, lang);
  } else if (chId === 'ch10') {
    renderInterconnectObject(container, lang);
  } else if (chId === 'ch11') {
    renderCMOSFlowObject(container, lang);
  } else if (chId === 'ch12') {
    renderTransistor3DObject(container, lang);
  } else if (chId === 'ch13') {
    renderMemoryTechObject(container, lang);
  } else if (chId === 'ch15') {
    renderMetrologyInspectionObject(container, lang);
  } else if (chId === 'ch16') {
    renderYieldFailureAnalysisObject(container, lang);
  } else if (chId === 'ch17') {
    renderProcessControlObject(container, lang);
  } else if (chId === 'ch19') {
    renderWaferTestObject(container, lang);
  } else if (chId === 'ch21') {
    renderAdvancedPackagingObject(container, lang);
  }
}



