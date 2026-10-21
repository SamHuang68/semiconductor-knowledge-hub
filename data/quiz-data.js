/**
 * quiz-data.js
 * 半導體製造核心觀念隨堂快測 (Concept Quick-Quiz Database)
 * 滿貫覆蓋全站 25 正式章 (Ch 00 ~ 24) 與 3 篇附錄 (A/B/C) 共 28 篇高鑑別度實務題庫
 */

export const CONCEPT_QUIZZES = {
  ch00: [
    {
      questionZh: '在現代 300mm 晶圓製造中，晶圓邊緣通常採用何種機械特徵進行晶向定位？',
      questionEn: 'In modern 300mm wafer fabrication, what edge feature is standardized for crystallographic orientation?',
      optionsZh: ['平邊 (Flat Edge)', '圓弧缺口 (Notch)', '雙直角凹痕 (Double Flat)', '雷射條碼孔 (Bar Hole)'],
      optionsEn: ['Flat Edge', 'Alignment Notch', 'Double Flat', 'Laser Bar Hole'],
      answer: 1,
      explanationZh: '300mm (12吋) 晶圓統一採用 Notch (定位缺口) 取代早期 200mm 以下的 Flat (平邊)，以大幅增加晶圓可用有效面積。',
      explanationEn: '300mm wafers standardize on orientation notches instead of flats to maximize usable active edge area.'
    }
  ],

  ch01: [
    {
      questionZh: '晶圓廠無塵室黃光曝光區之所以採用 500nm 以上黃光濾波照明，主要物理目的為何？',
      questionEn: 'Why do photolithography cleanrooms strictly use filtered amber/yellow lighting above 500nm?',
      optionsZh: ['降低工程師視覺疲勞', '避免化學增幅光阻劑 (CAR) 發生非預期意外感光', '提升無塵衣導電排靜電效率', '抑制無塵室空氣微粒懸浮'],
      optionsEn: ['Reduce operator eye fatigue', 'Prevent unintended exposure of chemically amplified photoresists', 'Improve bunny suit static dissipation', 'Suppress airborne particle suspension'],
      answer: 1,
      explanationZh: '光阻劑的感光波長多集中在紫外光 (UV) 至 450nm 以下，黃光（500nm 以上）無法引發光酸產生劑 (PAG) 分解，確保光阻穩定性。',
      explanationEn: 'Photoresists are UV-sensitive; amber light above 500nm lacks photon energy to trigger photoacid generators.'
    }
  ],

  ch02: [
    {
      questionZh: '根據固態物理理論，在室溫 (300K) 下傳統 MOSFET 次臨界擺幅 (Subthreshold Swing, SS) 的熱力學物理極限約為多少？',
      questionEn: 'According to solid-state physics, what is the thermodynamic limit of MOSFET subthreshold swing (SS) at 300K?',
      optionsZh: ['30 mV/dec', '60 mV/dec (59.6 mV/dec)', '90 mV/dec', '120 mV/dec'],
      optionsEn: ['30 mV/dec', '60 mV/dec (59.6 mV/dec)', '90 mV/dec', '120 mV/dec'],
      answer: 1,
      explanationZh: '由 SS = (kT/q)·ln(10) 計算，室溫下約為 59.6 mV/dec，此為熱載子波茲曼分佈所決定的傳統電晶體開關極限。',
      explanationEn: 'Derived from SS = (kT/q)*ln(10), yielding ~59.6 mV/dec at 300K, set by the Boltzmann energy distribution.'
    }
  ],

  ch03: [
    {
      questionZh: '在柴氏長晶法 (Czochralski Method) 中，石英坩堝高溫熔融主要會向單晶矽熔湯中引入何種原生非金屬雜質？',
      questionEn: 'In Czochralski growth, what primary intrinsic non-metallic impurity is dissolved from the quartz crucible into silicon melt?',
      optionsZh: ['碳 (Carbon)', '氧 (Oxygen)', '氮 (Nitrogen)', '硫 (Sulfur)'],
      optionsEn: ['Carbon', 'Oxygen', 'Nitrogen', 'Sulfur'],
      answer: 1,
      explanationZh: '石英坩堝 (SiO2) 在高溫熔矽中微量分解，將間隙氧 (Oi) 引入晶棒中；適量氧可提供內部吸雜 (Internal Gettering)，但過量易形成微缺陷。',
      explanationEn: 'Crucible SiO2 dissolves into the melt, introducing interstitial oxygen which enables intrinsic gettering.'
    }
  ],

  ch04: [
    {
      questionZh: '根據瑞利判據公式 R = k1 · (λ / NA)，下列哪項措施能有效縮小微影最小線寬 R？',
      questionEn: 'According to Rayleigh criteria R = k1 * (λ / NA), which modification reduces minimum feature size R?',
      optionsZh: ['降低曝光透鏡數值孔徑 NA', '使用更短的曝光光源波長 λ (例如換用 13.5nm EUV)', '提高製程因子 k1', '增加浸潤式液體的吸光率'],
      optionsEn: ['Decrease numerical aperture NA', 'Use shorter exposure wavelength λ (e.g., 13.5nm EUV)', 'Increase process factor k1', 'Increase liquid absorbance'],
      answer: 1,
      explanationZh: '解析度 R 與波長 λ 成正比，波長越短（如從 193nm 縮短至 13.5nm EUV）或 NA 越大，最小解析線寬 R 越小。',
      explanationEn: 'Resolution R is directly proportional to wavelength λ; shrinking λ or increasing NA yields tighter pitches.'
    }
  ],

  ch05: [
    {
      questionZh: '原子層沉積 (ALD) 相較於傳統化學氣相沉積 (CVD)，其最核心的物理自限制特徵為何？',
      questionEn: 'What is the fundamental self-limiting characteristic of Atomic Layer Deposition (ALD) over CVD?',
      optionsZh: ['連續性氣體混合反應', '飽和化學吸附 (Saturated Chemisorption) 與半反應分步前進', '極高的沉積溫度與熱解', '依賴電漿連續轟擊產生'],
      optionsEn: ['Continuous precursor gas mixing', 'Saturated chemisorption & alternating half-reaction pulses', 'Extremely high thermal pyrolysis', 'Continuous plasma bombardment'],
      answer: 1,
      explanationZh: 'ALD 採用脈衝式交替通入前驅物與反應氣體，每次脈衝在表面吸附一層飽和分子即自發停止，達成埃米級厚度精確控制與 100% 階梯覆蓋率。',
      explanationEn: 'ALD relies on alternating precursor pulses that self-terminate once a monolayer chemisorbs, ensuring 100% conformality.'
    }
  ],

  ch06: [
    {
      questionZh: '在反應離子蝕刻 (RIE) 中，若欲獲得高度垂直且平整的側壁輪廓（高非等向性），最主要依賴何種機制？',
      questionEn: 'In Reactive Ion Etching (RIE), what primary mechanism delivers highly anisotropic vertical sidewalls?',
      optionsZh: ['純化學自由基各向同性自發腐蝕', '離子垂直定向轟擊去除底部保護鈍化層 (Passivation Layer)', '大幅提高晶圓溫度至 500°C', '完全阻斷反應腔體電漿放電'],
      optionsEn: ['Pure isotropic chemical radical etching', 'Directional energetic ion bombardment removing horizontal passivation', 'Heating wafer above 500°C', 'Extinguishing plasma discharge'],
      answer: 1,
      explanationZh: '射頻偏壓引導帶正電離子垂直加速轟擊，快速打破水平底面的鈍化層，而側壁因無垂直轟擊而受鈍化層保護，形成非等向性陡峭垂直溝槽。',
      explanationEn: 'RF-directed ions bombard and clear inhibitor films on trench floors while sidewalls remain chemically protected.'
    }
  ],

  ch07: [
    {
      questionZh: '離子佈植 (Ion Implantation) 完成後，晶圓必須進行高溫退火 (RTA/Annealing) 製程，其最核心的兩大物理目的為何？',
      questionEn: 'Following ion implantation, why must wafers undergo thermal annealing (RTA)?',
      optionsZh: ['增加光阻厚度並消除晶圓翹曲', '修復晶格受損非晶層並活化置換摻雜原子 (Activation)', '在表面快速生成熱氧化層', '將金屬導線由固態熔化為液態'],
      optionsEn: ['Increase photoresist thickness', 'Recrystallize damaged lattice and electrically activate dopants', 'Grow thick thermal oxide', 'Melt metal wires into liquid'],
      answer: 1,
      explanationZh: '離子轟擊會打碎單晶矽晶格形成非晶層 (Amorphization)，高溫退火提供熱能使晶格重新生長對準，並促使摻雜原子佔據矽原子格點以提供自由載子。',
      explanationEn: 'Thermal budget recrystallizes damaged lattice damage and moves dopant atoms into substitutional lattice sites.'
    }
  ],

  ch08: [
    {
      questionZh: '依據 Preston 方程式 MRR = Kp · P · V，若將化學機械研磨 (CMP) 的下壓力 P 增加一倍，材料移除率理論上會？',
      questionEn: 'According to Preston law MRR = Kp * P * V, if CMP downforce P is doubled, material removal rate will theoretically:',
      optionsZh: ['降低為原本的一半', '維持不變', '增加為原本的 2 倍', '增加為原本的 4 倍'],
      optionsEn: ['Halve', 'Remain unchanged', 'Double', 'Quadruple'],
      answer: 2,
      explanationZh: 'Preston 定律中材料移除率 MRR 與壓力 P 及相對速度 V 呈一階線性正比關係，因此下壓力加倍，移除速率亦加倍。',
      explanationEn: 'MRR scales linearly with pressure P and velocity V; doubling downforce doubles the instantaneous removal rate.'
    }
  ],

  ch09: [
    {
      questionZh: '在半導體經典 RCA 清洗流程中，SC-1 溶液 (NH4OH + H2O2 + H2O) 主要用於去除晶圓表面的何種污染物？',
      questionEn: 'In standard RCA clean, what is the primary target of SC-1 (NH4OH + H2O2 + H2O) solution?',
      optionsZh: ['重金屬離子 (Fe, Cu)', '表面次微米微粒與有機殘留 (Particles & Organics)', '天然氧化層 (Native Oxide)', '厚銅金屬層'],
      optionsEn: ['Heavy metallic ions', 'Sub-micron particles and organic residue', 'Native silicon oxide', 'Thick copper layers'],
      answer: 1,
      explanationZh: 'SC-1 藉由雙氧水微氧化矽表面、氨水微溶蝕氧化層產生下切作用，搭配負 Zeta 電位斥力脫附表面微粒與有機物。',
      explanationEn: 'SC-1 uses controlled oxidation and slight etching with like-charge zeta repulsion to remove particles and organics.'
    }
  ],

  ch10: [
    {
      questionZh: '在先進製程後段銅金屬化中，之所以採用雙鑲嵌 (Dual Damascene) 搭配 CMP 而非傳統 RIE 乾蝕刻的原因是？',
      questionEn: 'Why does copper metallization adopt Dual Damascene CMP instead of conventional RIE etching?',
      optionsZh: ['銅金屬原物料過於廉價', '銅鹵化物在低溫下揮發性極低，無法形成氣態副產物排出', '電漿反應會使銅金屬昇華爆炸', '銅金屬完全無法被酸性化學液拋光'],
      optionsEn: ['Copper is too inexpensive', 'Copper halides have extremely low volatility at fab temperatures', 'Plasma causes copper to explode', 'Copper cannot be polished by slurry'],
      answer: 1,
      explanationZh: '銅的氯化物 (CuClx) 沸點高達數百度，在常溫電漿下無法氣化抽出，因此必須改用「先刻介電層溝槽、再電鍍填銅、最後以 CMP 磨平」之鑲嵌工法。',
      explanationEn: 'Copper halides possess low volatility under normal plasma temps, requiring damascene electroplating and CMP.'
    }
  ],

  ch11: [
    {
      questionZh: '在 CMOS 跨層流程整合中，製程溫度安排通常嚴格遵循下列何種原則？',
      questionEn: 'What thermal rule governs modern CMOS process integration sequence from FEOL to BEOL?',
      optionsZh: ['由前段 FEOL 往後段 BEOL 溫度逐漸升高', '前段到後段溫度嚴格遞減 (由 >1000°C 降至 <400°C)', '全站點固定維持在 800°C 以上', '完全不需受熱預算限制'],
      optionsEn: ['Temperature rises sequentially', 'Thermal budget strictly decreases from >1000°C to <400°C', 'Constant 800°C throughout', 'Unrestricted thermal budget'],
      answer: 1,
      explanationZh: '前段氧化退火需 1000°C 以上；中段矽化物 (>500°C 凝聚) 與後段銅導線/低介電材料 (ULK) 最高只能承受 ~400°C，否則金屬擴散與介電孔洞瓦解。',
      explanationEn: 'BEOL copper and ultra-low-k dielectrics degrade above 400°C, imposing a strictly descending thermal budget.'
    }
  ],

  ch12: [
    {
      questionZh: '先進 GAA (Gate-All-Around) 奈米片電晶體相較於傳統 FinFET，其最主要的靜電控制優勢為何？',
      questionEn: 'What is the primary electrostatic advantage of GAA nanosheets over conventional FinFETs?',
      optionsZh: ['閘極完全 360 度四面包覆通道，徹底抑制短通道效應與次臨界漏電', '完全不使用金屬閘極材料', '通道長度放寬至微米級', '取消源極與汲極摻雜'],
      optionsEn: ['Gate wraps 360 degrees around channel nanosheets, suppressing short-channel effects', 'Eliminates all metal gate materials', 'Relaxes channel length to microns', 'Eliminates source/drain dopants'],
      answer: 0,
      explanationZh: 'FinFET 僅能從三面控制鰭片通道，而 GAA 閘極全方位 360 度包覆奈米片，極大化閘極電容與靜電控制力，大幅壓制漏電流。',
      explanationEn: 'GAA surrounds the channel on all 4 sides, achieving superior electrostatic gate control over sub-3nm channel leakage.'
    }
  ],

  ch13: [
    {
      questionZh: '3D NAND 快閃記憶體相較於傳統 2D 平面 NAND，能夠突破微縮極限達到數百層垂直堆疊的核心架構轉向為何？',
      questionEn: 'What key architectural transition enabled 3D NAND to scale vertically beyond planar limits?',
      optionsZh: ['由導電浮閘轉向電荷陷阱 (Charge Trap, CTF) 絕緣層與垂直通道通孔', '取消位元線與字元線', '全面採用機械微機電開關', '改用玻璃基板'],
      optionsEn: ['Transition from floating gate to Charge Trap (CTF) and vertical channel holes', 'Eliminating bitlines entirely', 'Using MEMS switches', 'Glass substrates'],
      answer: 0,
      explanationZh: '3D NAND 捨棄相鄰單元電容耦合嚴重的導電浮閘，改用氮化矽絕緣電荷陷阱 (CTF) 膜與高深寬比穿透垂直孔，實現垂直多層堆疊。',
      explanationEn: '3D NAND adopted insulating charge-trap silicon nitride layers and high-aspect-ratio vertical channel holes.'
    }
  ],

  ch14: [
    {
      questionZh: '在 90nm 節點後，傳統 Dennard 微縮定律宣告崩潰，其最根本的物理限制為何？',
      questionEn: 'Why did classical Dennard scaling break down below the 90nm node?',
      optionsZh: ['光罩無法製造', '閘極穿隧漏電與次臨界漏電劇增導致靜態功耗密度攀升 (Leakage Wall)', '晶圓尺寸過小', '銅導線電阻降為零'],
      optionsEn: ['Reticles impossible to build', 'Quantum tunneling and subthreshold leakage caused power density runaway', 'Wafers too small', 'Zero copper resistance'],
      answer: 1,
      explanationZh: '當閘極氧化層薄至原子尺度引發量子穿隧，且工作電壓無法等比例縮減（受次臨界擺幅限制），靜態漏電大幅增加造成「功耗牆」。',
      explanationEn: 'Gate oxide tunneling and inability to scale threshold voltage created the thermal power dissipation wall.'
    }
  ],

  ch15: [
    {
      questionZh: '光學關鍵尺寸量測 (OCD / Scatterometry) 相較於傳統 CD-SEM，在 3nm 世代最顯著的量測優勢為何？',
      questionEn: 'What key advantage does Optical Critical Dimension (OCD) offer over CD-SEM at 3nm?',
      optionsZh: ['空間解析度達到原子級', '能無損、高速且同時解析深層 3D 結構輪廓（側壁傾角、底層線寬、高深寬比）', '完全不需要光學理論模型反演', '能夠直接拍攝缺陷照片'],
      optionsEn: ['Atomic spatial resolution', 'Non-destructive, high-speed 3D profile extraction (SWA, depth, bottom CD)', 'Requires no rigorous optical models', 'Direct defect photography'],
      answer: 1,
      explanationZh: 'CD-SEM 僅能拍攝俯視二維尺寸且電子束易收縮光阻；OCD 透過寬光譜偏振散射與嚴格電磁波理論 (RCWA) 擬合，可精確測量完整 3D 剖面。',
      explanationEn: 'OCD non-destructively extracts vertical 3D sidewall angles and depth via rigorous coupled-wave analysis (RCWA).'
    }
  ],

  ch16: [
    {
      questionZh: '雙束聚焦離子束 (Dual-Beam FIB-SEM) 在晶圓廠良率失效分析 (FA) 中的最核心任務為何？',
      questionEn: 'What is the primary role of Dual-Beam FIB-SEM in fab Failure Analysis?',
      optionsZh: ['進行全晶圓高速光學掃描', '對特定奈米缺陷定位處進行精密離子切片並製備 <50nm TEM 超薄試片', '執行離子佈植摻雜', '測量晶圓表面反射率'],
      optionsEn: ['Full-wafer optical scanning', 'Site-specific nanoscale cross-sectioning and TEM lamella sample prep', 'Production ion doping', 'Reflectance metrology'],
      answer: 1,
      explanationZh: 'FIB 利用鎵 (Ga+) 或氙 (Xe+) 離子束精確切削目標奈米缺陷點，製備出數十奈米厚度的超薄試片，供穿透式電顯 (TEM) 觀察原子排差。',
      explanationEn: 'FIB precisely mills target sub-micron failure sites into thin lamellae (<50nm) for atomic-scale TEM/STEM imaging.'
    }
  ],

  ch17: [
    {
      questionZh: '在 SPC 統計管制圖中，若管制點連續 9 點落在中心線 (CL) 的同一側，其代表的統計工程意義為何？',
      questionEn: 'In SPC control charts, what does 9 consecutive points on one side of the center line indicate?',
      optionsZh: ['製程完全處於統計控制下', '製程中心平均值已發生非隨機的異常漂移 (Process Shift)', '量測儀器完全故障', '樣本數不足需刪除數據'],
      optionsEn: ['Process perfectly in control', 'A non-random process mean shift has occurred', 'Gauge completely broken', 'Insufficient sample size'],
      answer: 1,
      explanationZh: '常態隨機分佈下連續 9 點落在同一側的機率低於 0.2%，屬於經典特殊原因變異（WECO 規則 2），代表製程中心產生偏移，須觸發 OCAP。',
      explanationEn: 'Probability of 9 consecutive points on one side is <0.2%, signaling a special cause process shift under WECO Rule 2.'
    }
  ],

  ch18: [
    {
      questionZh: '在半導體品質 8D 問題解決流程中，D3（緊急防堵圍堵行動）與 D5（根本原因與失效機制驗證）的核心區別為？',
      questionEn: 'In 8D methodology, what is the fundamental difference between D3 (Containment) and D5 (Root Cause Validation)?',
      optionsZh: ['D3 是徹底更換零件，D5 是通報客戶', 'D3 旨在第一時間止血隔離受影響批次防止流出，D5 是在實驗室驗證真正物理根因', '兩者完全相同', 'D3 僅適用於軟體錯誤'],
      optionsEn: ['D3 replaces parts, D5 notifies customer', 'D3 isolates and stops the bleeding immediately; D5 experimentally proves the root cause', 'Both are identical', 'D3 only applies to software'],
      answer: 1,
      explanationZh: 'D3 是立即止血措施（如 Lot Hold、暫停投片），防止不良晶圓繼續流出；D5 則是運用實驗驗證失效機理，不可將暫時止血誤當根本修復。',
      explanationEn: 'D3 contains defect propagation immediately (lot holds); D5 identifies and proves the physical failure mechanism.'
    }
  ],

  ch19: [
    {
      questionZh: '在晶圓針測 (CP) 與 WAT 電性測試中，為了消除測試機台引線與探針本身的串聯電阻誤差，必須採用何種量測技術？',
      questionEn: 'What measurement scheme eliminates probe and wire resistance errors in wafer CP and WAT testing?',
      optionsZh: ['雙線簡易迴路法', '四線 Kelvin 量測架構 (分開電流施加 Force 與電壓感測 Sense)', '無接觸微波探測法', '光學熱成像法'],
      optionsEn: ['2-wire standard loop', '4-wire Kelvin sensing (separating Force current and Sense voltage leads)', 'Contactless microwave probe', 'Optical thermal imaging'],
      answer: 1,
      explanationZh: '四線 Kelvin 架構將電流源回路 (Force) 與電壓計回路 (Sense) 分開，由於高阻抗電壓計幾乎無電流通過，完全消除了線路與接觸電阻壓降誤差。',
      explanationEn: '4-wire Kelvin sensing isolates current carrying Force paths from Sense leads, eliminating line IR drop.'
    }
  ],

  ch20: [
    {
      questionZh: '在高速晶片封裝中，覆晶 (Flip-Chip) 凸塊技術取代傳統金屬打線 (Wire-Bonding) 最根本的電氣優勢為何？',
      questionEn: 'What is the primary electrical advantage of Flip-Chip bumping over wire-bonding in high-speed chips?',
      optionsZh: ['大幅縮短互連路徑，顯著降低寄生電感 (L) 與高頻信號損耗', '完全不需要底部填膠 (Underfill)', '可降低載板佈線層數要求', '封裝外殼硬度增加'],
      optionsEn: ['Shortens interconnect path, drastically cutting parasitic inductance (L) and signal loss', 'Eliminates underfill entirely', 'Reduces substrate layers', 'Hardens package mold'],
      answer: 0,
      explanationZh: '打線金線長度可達數毫米，帶來數 nH 寄生電感；覆晶凸塊高度僅數十微米，互連路徑縮短 90% 以上，大幅改善供電噪訊與高頻訊號完整性。',
      explanationEn: 'Wire bonds add several nH of parasitic inductance; micro-bumps reduce loop inductance by >90% for high-speed signals.'
    }
  ],

  ch21: [
    {
      questionZh: '在 CoWoS 等 2.5D 先進封裝中，矽中介層 (Silicon Interposer) 內部用來貫穿矽晶圓厚度傳遞垂直電氣訊號的微結構稱為？',
      questionEn: 'In 2.5D packaging like CoWoS, what vertical micro-structure routes signals through the silicon interposer substrate?',
      optionsZh: ['微凸塊 (Micro-bump)', '矽穿孔 (Through-Silicon Via, TSV)', '重佈線層 (RDL)', '導線架 (Leadframe)'],
      optionsEn: ['Micro-bump', 'Through-Silicon Via (TSV)', 'Redistribution Layer (RDL)', 'Leadframe'],
      answer: 1,
      explanationZh: 'TSV (Through-Silicon Via 矽穿孔) 透過在矽基板刻蝕微孔並電鍍填充銅，提供最短路徑的高密度垂直導電互連。',
      explanationEn: 'TSVs are copper-filled vertical vias etched through silicon, enabling high-density interconnects across interposers.'
    }
  ],

  ch22: [
    {
      questionZh: '描述半導體晶片可靠度生命週期的經典「浴缸曲線 (Bathtub Curve)」，由左至右包含哪三個連續物理階段？',
      questionEn: 'What are the three consecutive physical phases of the classic semiconductor Bathtub Curve over time?',
      optionsZh: ['研發期、量產期、衰退期', '早期失效期 (Infant Mortality)、偶發失效期 (Useful Life)、磨損耗損期 (Wear-out)', '低溫期、常溫期、高溫期', '電阻期、電容期、電感期'],
      optionsEn: ['R&D, Ramp, Decline', 'Infant Mortality, Useful Life (Constant Failure Rate), Wear-out', 'Cryo, Ambient, High Temp', 'Resistive, Capacitive, Inductive'],
      answer: 1,
      explanationZh: '浴缸曲線依序為：早期失效期（製程潛在缺陷，以高溫預燒 Burn-in 剔除）、偶發期（低失效率常數）、耗損期（介電崩潰與電遷移疲勞失效）。',
      explanationEn: 'The Bathtub curve spans Infant Mortality (screened via burn-in), Useful Life (constant FIT rate), and Wear-out (TDDB, EM).'
    }
  ],

  ch23: [
    {
      questionZh: '晶圓廠無塵室自動化派工中，機台 (Equipment) 與製造執行系統 (MES) 之間傳遞配方與狀態控制的國際半導體標準通訊協定為？',
      questionEn: 'What standard communications protocol suite interfaces fab tools with MES for automated recipe download and control?',
      optionsZh: ['Modbus TCP', 'SEMI SECS-II / GEM (E5 / E30 / E37 HSMS)', 'MQTT 物聯網協議', 'CANopen 車用通訊'],
      optionsEn: ['Modbus TCP', 'SEMI SECS-II / GEM (E5 / E30 / E37 HSMS)', 'MQTT Protocol', 'CANopen Bus'],
      answer: 1,
      explanationZh: 'SEMI 制定之 SECS-II (E5) 與 GEM (E30) 搭配 TCP/IP 上的 HSMS (E37)，為全球半導體廠設備狀態監控與自動化派工的標準通訊架構。',
      explanationEn: 'SECS-II/GEM over HSMS (SEMI E5/E30/E37) is the standard interface protocol governing fab automation and recipe control.'
    }
  ],

  ch24: [
    {
      questionZh: '在現代高密度 DRAM 記憶體中，引發「列錘漏洞 (Row Hammer)」硬體故障的根本物理機制為何？',
      questionEn: 'What is the root physical mechanism enabling DRAM Row Hammer disturbance errors?',
      optionsZh: ['軟體驅動程式崩潰', '頻繁連續存取特定字元線造成相鄰單元電容漏電加速與位元翻轉 (Bit Flip)', '晶片表面遭受雷擊', '散熱膏導熱係數衰減'],
      optionsEn: ['Software driver bug', 'Rapid consecutive wordline toggling induces capacitive crosstalk leakage causing bit flips', 'Lightning strike', 'Thermal paste dry-out'],
      answer: 1,
      explanationZh: '記憶體單元微縮使相鄰字元線物理間距小於數十奈米，高頻切換電場引發相鄰儲存單元電容漏電加速，未刷新前電荷流失導致位元狀態翻轉。',
      explanationEn: 'Aggressive pitch scaling causes capacitive coupling between adjacent wordlines; rapid toggling leaks stored charge.'
    }
  ],

  'app-glossary': [
    {
      questionZh: '在先進半導體製程術語中，常提到的「EOT (Equivalent Oxide Thickness)」中文意涵為何？',
      questionEn: 'In advanced semiconductor terminology, what does EOT (Equivalent Oxide Thickness) designate?',
      optionsZh: ['高介電材料 (High-k) 相對於純熱氧化矽 (SiO2) 之等效電容物理厚度', '晶圓最外層邊緣禁區厚度', '化學蝕刻過蝕刻深度', '電子顯微鏡聚焦深度'],
      optionsEn: ['High-k dielectric physical thickness equivalent to SiO2 capacitance', 'Wafer edge exclusion zone width', 'Over-etching depth', 'SEM focal depth'],
      answer: 0,
      explanationZh: 'EOT 是將高介電常數薄膜的電容值換算為傳統二氧化矽所需厚度：EOT = (k_SiO2 / k_high-k) · t_phys，反映閘極靜電控制能力。',
      explanationEn: 'EOT measures high-k physical thickness normalized to equivalent SiO2 capacitance: EOT = (3.9 / k) * t_phys.'
    }
  ],

  'app-jargon': [
    {
      questionZh: '晶圓廠現場工程師口語交接時常提及的「跑控片 (Monitor Wafer)」主要實務目的為何？',
      questionEn: 'In fab floor slang, what is the primary purpose of running a Monitor Wafer?',
      optionsZh: ['供工程師練習晶圓手動搬運', '在量產晶圓投片前，確認機台微粒數 (Particles)、膜厚或蝕刻率合規 (Qual)', '作為給訪客的紀念贈品', '測試無塵室天車最高速度'],
      optionsEn: ['Manual handling practice', 'Verify tool particle count, film thickness, or etch rate compliance (Tool Qual)', 'Souvenir gift for visitors', 'Testing maximum OHT speed'],
      answer: 1,
      explanationZh: '控片 (Monitor Wafer) 表面平整無圖形，定期投入機台測量物理變數，確認機台狀態合格 (Qual Passed) 後，才放行高價值量產晶圓 (Prime Lot)。',
      explanationEn: 'Blank monitor wafers verify tool health (particles, rates) during tool qualification before running high-value product lots.'
    }
  ],

  'app-reading': [
    {
      questionZh: '半導體微電子與元件物理領域被全球產業界與學界譽為「半導體聖經」的經典著作作者為？',
      questionEn: 'Who is the author of the authoritative semiconductor engineering bible "Physics of Semiconductor Devices"?',
      optionsZh: ['高登·摩爾 (Gordon Moore)', '施敏博士 (Dr. S. M. Sze)', '安迪·葛洛夫 (Andy Grove)', '羅伯特·諾伊斯 (Robert Noyce)'],
      optionsEn: ['Gordon Moore', 'Dr. S. M. Sze (Simon M. Sze)', 'Andy Grove', 'Robert Noyce'],
      answer: 1,
      explanationZh: '施敏 (Simon M. Sze) 博士所著《Physics of Semiconductor Devices》被公認為全球半導體元件物理最權威的殿堂級經典聖經。',
      explanationEn: 'Dr. Simon M. Sze authored "Physics of Semiconductor Devices", universally regarded as the gold-standard semiconductor bible.'
    }
  ]
};
