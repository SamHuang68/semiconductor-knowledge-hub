/**
 * quiz-data.js
 * 半導體製造核心觀念隨堂快測 (Concept Quick-Quiz Database)
 * 涵蓋微影、薄膜、蝕刻、CMP、佈植、擴散、電晶體、先進封裝等精選高鑑別度實務考題
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
  ]
};
