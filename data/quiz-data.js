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
    },
    {
      questionZh: "晶片製造全流程中，KGD (Known Good Die) 是在何種關鍵測試步驟後被判定標記？",
      questionEn: "In the wafer-to-package pipeline, at which critical testing stage is a die certified as KGD (Known Good Die)?",
      optionsZh: ["線上關鍵尺寸量測 (CD-SEM)","晶圓針測分類 (CP / Wafer Probe)","終端封裝後測試 (Final FT)","可靠度老化加速 (HTOL)"],
      optionsEn: ["Inline CD-SEM Metrology","Circuit Probing (CP / Wafer Probe)","Final Test after Packaging (FT)","High-Temp Operating Life (HTOL)"],
      answer: 1,
      explanationZh: "在 2.5D/3D 異質整合先進封裝前，必須在晶圓針測 (CP) 階段以探針卡進行全功能高速電性篩檢，確認為良好晶粒 (KGD) 後才進行堆疊鍵合。",
      explanationEn: "KGD certification occurs during Circuit Probing (CP) using probe cards to screen known-good dies before expensive 2.5D/3D bonding."
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
    },
    {
      questionZh: "無塵室中，超純水 (UPW) 的理論物理極限電阻率在 25°C 時是多少？",
      questionEn: "In semiconductor cleanrooms, what is the theoretical maximum resistivity of Ultra-Pure Water (UPW) at 25°C?",
      optionsZh: ["1.0 MΩ·cm","10.5 MΩ·cm","18.24 MΩ·cm","50.0 MΩ·cm"],
      optionsEn: ["1.0 MΩ·cm","10.5 MΩ·cm","18.24 MΩ·cm","50.0 MΩ·cm"],
      answer: 2,
      explanationZh: "超純水去除非水離子後，僅剩水分子自身的極微量解離 (H+ 與 OH-)，25°C 時理論電阻率極限為 18.24 MΩ·cm。",
      explanationEn: "At 25°C, complete deionization leaves only intrinsic H+ and OH- ions, resulting in a theoretical limit of 18.24 MOhm*cm."
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
    },
    {
      questionZh: "在先進製程中，MOSFET 閘極介電層以高介電係數材料 (High-k, 如 HfO2) 取代 SiO2 的核心目的為何？",
      questionEn: "In advanced nodes, why is SiO2 replaced by High-k materials (e.g., HfO2) for the gate dielectric?",
      optionsZh: ["降低製程熱預算","在維持極薄等效氧化厚度 (EOT) 同時增加物理厚度，抑制量子穿隧漏電","提升矽晶圓導熱率","加速電子在通道內的漂移速度"],
      optionsEn: ["Reduce process thermal budget","Increase physical thickness to suppress direct quantum tunneling while keeping thin EOT","Improve wafer thermal conductivity","Accelerate channel carrier drift velocity"],
      answer: 1,
      explanationZh: "當 SiO2 厚度小於 1.5nm 時會產生嚴重的量子直接穿隧漏電流；改用 High-k 可物理性增厚薄膜，同時維持足夠的閘極電容與靜電控制。",
      explanationEn: "High-k materials allow physically thicker films to block quantum tunneling while preserving high capacitive gate control (low EOT)."
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
    },
    {
      questionZh: "柴氏長晶法 (Czochralski) 生長單晶矽錠時，偏析係數 (k0 < 1) 會造成晶錠頭部與尾部的摻雜濃度如何變化？",
      questionEn: "In Czochralski silicon crystal pulling, how does a segregation coefficient k0 < 1 affect dopant distribution from seed to tail?",
      optionsZh: ["頭部尾部完全均勻","晶錠尾部摻雜濃度顯著高於頭部","晶錠頭部摻雜濃度顯著高於尾部","中心濃度高於邊緣但軸向均勻"],
      optionsEn: ["Completely uniform throughout","Tail end has significantly higher dopant concentration than seed end","Seed end has higher concentration than tail end","Center is higher but axially uniform"],
      answer: 1,
      explanationZh: "根據 Scheil 偏析方程式，當 k0 < 1 時，雜質偏好留在液相矽熔湯中，隨著結晶結晶體積增加，熔湯雜質濃度上升，使晶錠尾部摻雜最高。",
      explanationEn: "Per Scheil equation, k0 < 1 causes dopants to partition preferentially into the melt, enriching the tail end as crystallization progresses."
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
    },
    {
      questionZh: "極紫外光微影 (EUV, 13.5nm) 光學系統之所以必須在高度真空環境中運作，核心物理原因為何？",
      questionEn: "Why must Extreme Ultraviolet (EUV, 13.5nm) exposure optical systems operate in high vacuum?",
      optionsZh: ["防止無塵室氣流引起光罩微震","大氣中之氧氣、水分子與氮氣對 13.5nm 光子具有強烈吸收","降低多層膜反射鏡的熱膨脹","防止光阻氣相揮發物沉積在晶圓上"],
      optionsEn: ["Prevent cleanroom airflow vibrations","Ambient oxygen, water vapor, and nitrogen strongly absorb 13.5nm EUV photons","Minimize thermal expansion of mirrors","Prevent resist outgassing on wafers"],
      answer: 1,
      explanationZh: "13.5nm 極短波長光子在空氣中的穿透深度僅有微米級，所有氣體皆會強烈吸收 EUV 光束，因此整條光路與晶圓台必須維持高度真空。",
      explanationEn: "13.5nm EUV photons are strongly absorbed by virtually all gases within micrometers, necessitating a high-vacuum chamber environment."
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
    },
    {
      questionZh: "原子層沉積 (ALD) 能在超高深寬比 (>100:1) 結構中達到近乎 100% 階梯覆蓋率的核心化學機制為何？",
      questionEn: "What chemical mechanism enables Atomic Layer Deposition (ALD) to achieve near 100% step coverage in ultra-high aspect ratio structures?",
      optionsZh: ["高速熱對流輸送","自限制表面化學吸附反應 (Self-Limiting Surface Reaction)","高能電漿離子垂直轟擊","催化劑表面張力驅動"],
      optionsEn: ["High-speed thermal convective delivery","Self-limiting surface chemisorption saturation reactions","High-energy directional plasma ion bombardment","Catalytic surface tension Marangoni flow"],
      answer: 1,
      explanationZh: "ALD 透過交替脈衝的前驅物氣體，在晶圓表面產生單層飽和化學吸附，多餘氣體不反應並被吹洗，因而具備完美的自對準厚度均勻性。",
      explanationEn: "ALD relies on sequential, self-limiting half-reactions where precursors saturate available surface sites without gas-phase parasitic deposition."
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
    },
    {
      questionZh: "在電漿乾蝕刻中，深寬比相依蝕刻延遲 (ARDE / RIE Lag) 的主要物理成因是什麼？",
      questionEn: "What is the primary physical mechanism responsible for Aspect Ratio Dependent Etching (ARDE / RIE Lag)?",
      optionsZh: ["晶圓邊緣射頻電場畸變","高深寬比槽底的中性反應自由基受克努森擴散 (Knudsen Diffusion) 輸送限制","光阻在高深寬比下硬化","靜電吸盤溫度分佈不均"],
      optionsEn: ["Wafer edge RF field distortion","Knudsen diffusion transport limitation of neutral etchant radicals into deep feature bottoms","Resist thermal hardening at high AR","Electrostatic chuck thermal non-uniformity"],
      answer: 1,
      explanationZh: "當孔槽深寬比大幅升高時，分子平均自由程大於孔徑，氣體分子與側壁頻繁碰撞（克努森擴散），導致槽底反應物通量下降，蝕刻速率變慢。",
      explanationEn: "At high AR, Knudsen diffusion limits molecular transport of neutral etchants to the bottom, causing etch rates to decrease with depth."
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
    },
    {
      questionZh: "在極淺接面 (USJ) 製程中，為何普遍採用毫秒閃光 (FLA) 或雷射退火 (LSA) 取代傳統 RTA 退火？",
      questionEn: "For Ultra-Shallow Junction (USJ) formation, why is millisecond flash (FLA) or laser annealing (LSA) preferred over rapid thermal annealing (RTA)?",
      optionsZh: ["設備購置成本較低","在達成 100% 電性活化同時實現摻雜原子近乎「零熱擴散 (Zero Diffusion)」","增加矽基底晶格滑移線密度","大幅提升晶圓產出率 (UPH)"],
      optionsEn: ["Lower tool capital expenditure","Achieves 100% dopant electrical activation while maintaining near-zero thermal diffusion","Increases silicon slip line density","Dramatically boosts raw tool throughput"],
      answer: 1,
      explanationZh: "奈秒至毫秒級的超短脈衝加熱可使晶圓表層達千度活化摻雜原子，但時間極短不足以讓雜質進行固態擴散，保持陡峭的奈米接面。",
      explanationEn: "Sub-millisecond heating provides sufficient thermal energy for lattice substitution and activation while freezing solid-state diffusion."
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
    },
    {
      questionZh: "化學機械平坦化 (CMP) 中，當氧化鈰 (Ceria) 研磨液遇見氮化矽 (Si3N4) 膜層時研磨速率遽降，此物理化學特性稱為？",
      questionEn: "In CMP, the phenomenon where a ceria-based slurry polishes SiO2 rapidly but stops on Si3N4 is known as:",
      optionsZh: ["研磨墊碟化 (Dishing)","高選擇比化學阻擋特性 (High-Selectivity Stop-on-Nitride)","過研磨侵蝕 (Erosion)","表面流場紊流 (Turbulent Flow)"],
      optionsEn: ["Platen Dishing","High-Selectivity Stop-on-Nitride (HSN) characteristics","Over-polish Oxide Erosion","Surface Turbulent Shearing"],
      answer: 1,
      explanationZh: "Ceria 磨粒對 SiO2 具備化學鍵合切削活性，但對 Si3N4 惰性，使選擇比高達 30:1 以上，作為淺溝槽隔離 (STI) 的完美終點研磨阻擋層。",
      explanationEn: "Ceria slurries selectively form chemical bonds with SiO2 but not Si3N4, yielding >30:1 selectivity for self-stopping planarization."
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
    },
    {
      questionZh: "清洗小於 10nm 高深寬比微細圖案時，為避免水相乾燥時表面張力拉扯造成「圖案倒塌」，業界標準對策為何？",
      questionEn: "When cleaning <10nm high-aspect-ratio features, what process is used to eliminate capillary forces that cause pattern collapse?",
      optionsZh: ["提高離心甩乾轉速至 5000 RPM","超臨界二氧化碳乾燥 (Supercritical CO2, SCCO2)","強酸高溫烘烤","純氫氣電漿灰化"],
      optionsEn: ["Increase spin drying speed to 5000 RPM","Supercritical CO2 (SCCO2) zero-surface-tension drying","Concentrated hot acid baking","Pure hydrogen plasma ashing"],
      answer: 1,
      explanationZh: "超臨界流體狀態下液氣介面消失，表面張力 γ = 0，拉普拉斯毛細壓力為零，徹底杜絕微結構受液滴收縮拉倒的缺陷。",
      explanationEn: "Supercritical CO2 eliminates the liquid-gas phase boundary, reducing surface tension to zero and completely preventing capillary collapse."
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
    },
    {
      questionZh: "在雙鑲嵌 (Dual-Damascene) 銅導線製程中，為何必須在低介電絕緣層與銅之間沉積 Ta/TaN 阻障層？",
      questionEn: "In copper dual-damascene interconnects, why must a Ta/TaN barrier layer be deposited between low-k dielectric and copper?",
      optionsZh: ["增加導線導電率","防止銅原子在熱應力與電場下快速擴散至介電層造成漏電擊穿","提升電鍍銅沉積速率","作為化學研磨拋光指示層"],
      optionsEn: ["Increase overall wire conductivity","Prevent fast copper atomic diffusion into dielectric under bias-temperature stress","Boost electroplating deposition rate","Serve as CMP optical end-point indicator"],
      answer: 1,
      explanationZh: "銅在二氧化矽與 low-k 介電材料中擴散係數極高，無阻障層時銅離子會迅速穿透介電層引發短路與可靠度失效。",
      explanationEn: "Copper diffuses rapidly through SiO2 and low-k materials, requiring refractory Ta/TaN liners to block copper ion migration and leakage."
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
    },
    {
      questionZh: "在現代先進 CMOS 流程跨層熱預算 (Thermal Budget) 梯級管理中，製程允許承受的最高溫度排序為何？",
      questionEn: "In advanced CMOS fabrication thermal budget management, what is the correct hierarchy of allowable maximum temperatures?",
      optionsZh: ["BEOL (後段) > MOL (中段) > FEOL (前段)","FEOL (前段) > MOL (中段) > BEOL (後段)","MOL (中段) > BEOL (後段) > FEOL (前段)","三者均受限於 400°C 以下"],
      optionsEn: ["BEOL > MOL > FEOL","FEOL > MOL > BEOL","MOL > BEOL > FEOL","All three stages are strictly capped below 400°C"],
      answer: 1,
      explanationZh: "前段 FEOL 包含高溫長晶與活化退火 (>1000°C)；中段接觸孔約 500-600°C；後段 BEOL 含有銅金屬與多孔 low-k 介電質，嚴格限制在 400°C 以下。",
      explanationEn: "FEOL permits >1000°C for anneals; MOL is limited to ~550°C; BEOL must remain <400°C to preserve copper liners and fragile low-k polymers."
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
    },
    {
      questionZh: "在 2nm 及次世代電晶體中，晶圓背面供電網路 (BSPDN, 如 PowerVia) 的最核心系統工程價值是什麼？",
      questionEn: "In sub-2nm nodes, what is the primary architectural benefit of Backside Power Delivery Networks (BSPDN / PowerVia)?",
      optionsZh: ["降低晶圓封裝厚度","將高功耗電源網絡移至背面，大幅降低 IR Drop 壓降並釋放正面信號繞線空間","增加電晶體閘極寬度","完全消除次臨界漏電流"],
      optionsEn: ["Decrease overall wafer packaging profile","Relocate power mesh to the backside, drastically reducing IR drop and unlocking frontside routing tracks","Increase physical gate channel width","Completely eliminate subthreshold leakage"],
      answer: 1,
      explanationZh: "傳統正面同時走電源與信號會造成金屬層擁擠與巨大 IR Drop 壓降；BSPDN 透過背面埋入導線直接供電，信號繞線自由度提高 20% 以上。",
      explanationEn: "Separating power delivery to the backside removes resistive voltage drops (IR drop) and frees dense metal tracks for logic routing."
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
    },
    {
      questionZh: "在 3D NAND 快閃記憶體製造中，垂直通道孔貫穿超過 200 層字元線 (Wordline) 堆疊的核心極限技術為何？",
      questionEn: "In 3D NAND fabrication, what is the critical enabling technology for etching vertical channel holes through 200+ stacked layers?",
      optionsZh: ["濕式化學回蝕","極低溫高深寬比電漿蝕刻 (Cryogenic High Aspect Ratio Etch, Cryo-HAR)","機械雷射鑽孔","超音波震盪銑削"],
      optionsEn: ["Wet chemical isotropic etch","Cryogenic High-Aspect-Ratio (Cryo-HAR) plasma etching at -60°C to -80°C","Mechanical laser micro-drilling","Ultrasonic rotational milling"],
      answer: 1,
      explanationZh: "3D NAND 垂直孔深寬比超過 80:1，常溫下側壁會過度腐蝕；採用極低溫 (-60°C) 電漿蝕刻可凍結側壁反應，維持垂直直筒輪廓。",
      explanationEn: "Cryogenic HAR etching (-60°C to -80°C) freezes lateral sidewall reactions, enabling perfectly vertical profiles at aspect ratios exceeding 80:1."
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
    },
    {
      questionZh: "在先進節點微縮放緩後，業界從傳統尺寸微縮延伸發展出的 STCO 全名與意涵是什麼？",
      questionEn: "As classical geometric scaling slows, what does STCO stand for in modern semiconductor roadmap planning?",
      optionsZh: ["Silicon Thermal Control Operation (矽熱控制運算)","System-Technology Co-Optimization (系統技術協同最佳化)","Single Transistor Current Output (單電晶體電流輸出)","Standard Testing Compliance Organization (標準測試認證組織)"],
      optionsEn: ["Silicon Thermal Control Operation","System-Technology Co-Optimization (STCO)","Single Transistor Current Output","Standard Testing Compliance Organization"],
      answer: 1,
      explanationZh: "STCO 是在小晶片 (Chiplet) 與 3D 封裝架構下，從工作負載系統架構層面反向定義製程技術組合，達成效能、功耗與成本最佳化。",
      explanationEn: "STCO co-optimizes the entire system partition (chiplets, 3D stacking, cooling) with underlying process technologies to bypass planar scaling walls."
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
    },
    {
      questionZh: "光學薄膜測厚儀 (Ellipsometer, 橢偏儀) 是透過分析入射光束在晶圓表面反射後的何種狀態變化來推算厚度？",
      questionEn: "Spectroscopic Ellipsometry determines thin-film thickness and refractive index by measuring what property change in reflected light?",
      optionsZh: ["光的波長頻移 (Doppler Shift)","偏振光振幅比 (Ψ) 與相位差 (Δ) 的變化","光通量強度的單純衰減","反射光的同位素放射性"],
      optionsEn: ["Doppler wavelength frequency shift","Changes in polarization amplitude ratio (Psi) and phase difference (Delta)","Simple linear attenuation of light intensity","Isotopic radioactivity of reflected photons"],
      answer: 1,
      explanationZh: "橢偏儀量測線偏振光經薄膜反射後變為橢圓偏振光的振幅比 Ψ 與相位延遲 Δ，透過菲涅耳方程擬合奈米甚至次奈米級薄膜厚度。",
      explanationEn: "Ellipsometry measures the change in polarization state (Psi and Delta) upon reflection, fitting Fresnel equations to extract thickness and index."
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
    },
    {
      questionZh: "在大型晶片 (Die Area > 400 mm²) 良率預測中，產線實務上為何偏好採用負二項良率模型 (Negative Binomial Model)？",
      questionEn: "For large die areas (>400 mm²), why do fab yield engineers prefer the Negative Binomial model over the Poisson model?",
      optionsZh: ["計算公式較簡單","Poisson 假設缺陷完全隨機散布，忽略了實際產線中嚴重的「缺陷群聚效應 (Defect Clustering)」","負二項模型預測良率永遠比實際高","不需要任何歷史良率參數"],
      optionsEn: ["Formulas are simpler to solve","Poisson assumes pure random distribution, failing to capture severe defect clustering in actual fabs","Negative binomial guarantees higher yields","No historical calibration parameters required"],
      answer: 1,
      explanationZh: "晶圓缺陷往往聚集在特定區域（群聚效應）；Poisson 模型未考慮群聚會過度悲觀估算大晶片良率，負二項模型引入群聚參數 α，預測更精確。",
      explanationEn: "Real defect mechanisms cause clustering; Poisson severely underestimates large die yields, whereas Negative Binomial models cluster factor alpha."
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
    },
    {
      questionZh: "在 SPC 統計製程管制中，當製程能力指數 Cpk 等於 1.33 時，對應的雙側超出規格邊界缺陷率約為多少？",
      questionEn: "In Statistical Process Control (SPC), a process capability index Cpk of 1.33 corresponds to approximately what double-sided defect rate?",
      optionsZh: ["約 2700 PPM (3-sigma)","約 63 PPM (4-sigma)","約 0.002 PPM (6-sigma)","約 10% (1-sigma)"],
      optionsEn: ["~2,700 PPM (3-sigma)","~63 PPM (4-sigma)","~0.002 PPM (6-sigma)","~10% (1-sigma)"],
      answer: 1,
      explanationZh: "Cpk = 1.33 代表製程分佈中心至最近規格界線剛好為 4 倍標準差 (4-sigma)，在常態分佈下對應的不良率約為 63 PPM。",
      explanationEn: "Cpk = 1.33 corresponds to a 4-sigma margin to specification limits, which yields an expected defect rate of ~63 PPM in normal distributions."
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
    },
    {
      questionZh: "晶圓廠遭遇良率異常啟動 OCAP 應變時，第一步採取的「章魚防堵法 (Octopus Containment)」其核心動作為何？",
      questionEn: "When an excursion triggers an Out-of-Control Action Plan (OCAP), what is the key action of the \"Octopus Containment\" protocol?",
      optionsZh: ["立即修改生產 Recipe","全面清查並 Hold 住該問題機台當前批次、前後各數批關聯在製品與同一製程路徑晶圓","直接將整批晶圓報廢","更換所有機台操作工程師"],
      optionsEn: ["Immediately alter production recipe","Trace and quarantine the suspect lot, preceding/succeeding 5 lots on the tool, and common-path WIP","Directly scrap all active wafers","Replace all fab shift operators"],
      answer: 1,
      explanationZh: "章魚防堵法如章魚觸角般，快速鎖定並隔離可能受害的「同機台、同配方、同腔體」前後關聯批次，防止不良晶圓流入下游封裝。",
      explanationEn: "The Octopus protocol radiates like tentacles to freeze all wafers on the suspect tool, adjacent lots, and same recipe chambers to stop spillover."
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
    },
    {
      questionZh: "在晶圓允收測試 (WAT) 中，量測毫歐姆級 (mΩ) 極微小金屬接觸電阻時，為消除探針接觸阻抗，必須採用何種量測技術？",
      questionEn: "In Wafer Acceptance Testing (WAT), what technique is required to measure milliohm-level contact resistance free of probe parasitic resistance?",
      optionsZh: ["傳統兩線式萬用表量測","四線式凱爾文電阻量測法 (4-Wire Kelvin Method)","高壓交流電容式量測","高頻射頻網路分析儀"],
      optionsEn: ["Standard two-wire multimeter measurement","4-Wire Kelvin Sensing Method (Force Current, Sense Voltage)","High-voltage AC capacitive sensing","High-frequency RF network analyzer"],
      answer: 1,
      explanationZh: "凱爾文四線法將「激勵電流迴路 (Force)」與「電壓量測迴路 (Sense)」完全分離，量測電壓表的輸入阻抗極高使電流近乎為零，徹底消除探針接觸電阻。",
      explanationEn: "Kelvin sensing separates current force and voltage sense pairs; high voltmeter impedance prevents current in sense leads, eliminating probe resistance."
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
    },
    {
      questionZh: "覆晶封裝 (Flip-Chip) 相較於傳統打線封裝 (Wire Bonding)，在高速運算晶片中最關鍵的電性效能優勢為何？",
      questionEn: "Compared to traditional wire bonding, what is the most critical electrical performance advantage of Flip-Chip packaging for HPC chips?",
      optionsZh: ["封裝體重量更輕","大幅縮短晶粒與基板間的互連長度，將寄生電感降至最小，支援數十 GHz 高頻信號與大電流供電","不需要使用環氧樹脂封膠","可在常溫下直接手動組裝"],
      optionsEn: ["Lighter overall package mass","Drastically shortens interconnect length, slashing parasitic inductance to support >50 GHz signals and high transient current","Eliminates need for epoxy underfill","Can be manually assembled at room temp"],
      answer: 1,
      explanationZh: "打線的金屬線具有數個 nH 的寄生電感，限制了信號頻寬並造成供電震盪；覆晶凸塊高度僅數十微米，電感降至 0.1nH 以下。",
      explanationEn: "Bond wires introduce several nH of parasitic inductance; flip-chip micro-bumps shorten the path to <50um, slashing inductance below 0.1nH."
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
    },
    {
      questionZh: "在先進封裝中，台積電 CoWoS-S 與 CoWoS-L 的最關鍵物理結構差異為何？",
      questionEn: "In advanced packaging, what is the key architectural difference between TSMC CoWoS-S and CoWoS-L?",
      optionsZh: ["CoWoS-S 不支援 HBM 記憶體","CoWoS-S 採用整片被動全矽中介層 (Full Silicon Interposer)，CoWoS-L 採用有機 RDL 載板搭配局部嵌入微型矽橋 (LSI Bridge)","CoWoS-L 只能在 200mm 晶圓製作","CoWoS-S 沒有使用微凸塊"],
      optionsEn: ["CoWoS-S does not support HBM","CoWoS-S uses a full monolithic silicon interposer; CoWoS-L uses an organic RDL substrate with embedded local silicon interconnect (LSI) bridges","CoWoS-L is restricted to 200mm wafers","CoWoS-S completely eliminates bumps"],
      answer: 1,
      explanationZh: "CoWoS-S 採用面積龐大的全矽中介層，成本與面積受光罩極限限制；CoWoS-L 採用低成本重佈線有機層，僅在晶粒高速交握處嵌入高密度矽橋 (LSI)。",
      explanationEn: "CoWoS-S utilizes a monolithic silicon interposer; CoWoS-L employs cost-effective organic RDL with localized silicon bridges for high-density die-to-die links."
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
    },
    {
      questionZh: "在半導體高溫運轉壽命 (HTOL) 加速測試中，用來計算熱應力加速因子的經典統御方程式是什麼？",
      questionEn: "In High-Temperature Operating Life (HTOL) testing, what governing equation is used to calculate the thermal acceleration factor (AF)?",
      optionsZh: ["納維-斯托克斯方程式 (Navier-Stokes)","阿瑞尼斯模型 (Arrhenius Model: AF = exp[Ea/k * (1/T_use - 1/T_stress)])","薛丁格方程式 (Schrodinger Eq)","馬克士威電磁方程組"],
      optionsEn: ["Navier-Stokes hydrodynamic equation","Arrhenius Model: AF = exp[(Ea/k) * (1/T_use - 1/T_stress)]","Time-dependent Schrodinger equation","Maxwell electromagnetic wave equations"],
      answer: 1,
      explanationZh: "半導體內部多數缺陷（如熱載子衰退、氧化層擊穿、電遷移）皆受熱活化能 Ea 支配，利用 Arrhenius 方程式可將 125°C 測試等效回推至 55°C 正常運作壽命。",
      explanationEn: "Thermally-activated degradation mechanisms obey Arrhenius kinetics, allowing acceleration factors to extrapolate 125°C burn-in data to 55°C field lifetime."
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
    },
    {
      questionZh: "在晶圓廠自動化搬運中，控制無塵室天車 (OHT) 與機台裝載埠 (Load Port) 安全交接 FOUP 的光學交握標準協定為？",
      questionEn: "In semiconductor automation, what standard optical protocol governs optical sensor handshakes between AMHS OHT vehicles and tool load ports?",
      optionsZh: ["SEMI E84 載具搬運交握標準","TCP/IP 乙太網協定","RS-232 序列傳輸","Bluetooth 5.0 無線通訊"],
      optionsEn: ["SEMI E84 Carrier Handshake Standard","TCP/IP Ethernet Standard","RS-232 Serial Communication","Bluetooth Low Energy Standard"],
      answer: 0,
      explanationZh: "SEMI E84 規範了天車手臂伸出前與機台間的光電感測交握信號 (如 TR_REQ, BUSY, COMP 等)，以硬體互鎖徹底杜絕晶圓盒掉落事故。",
      explanationEn: "SEMI E84 defines infrared optical sensor interlock handshakes ensuring mechanical clamping before vehicle hoist release to prevent FOUP drops."
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
    },
    {
      questionZh: "在軟硬體協同視角中，DRAM 記憶體因連續快速訪問相鄰實體列 (Wordline) 誘發鄰近電容漏電翻轉位元的硬體缺陷被稱為？",
      questionEn: "In software-hardware co-design, what DRAM hardware vulnerability occurs when rapid back-to-back activation of a row induces bit flips in adjacent rows?",
      optionsZh: ["幽靈漏洞 (Spectre)","行錘擊穿 (Row Hammer)","熔斷漏洞 (Meltdown)","電磁脈衝攻擊 (EMP)"],
      optionsEn: ["Spectre Speculative Attack","Row Hammer Bit-Flip Vulnerability","Meltdown Out-of-Order Exploit","Electromagnetic Pulse Attack"],
      answer: 1,
      explanationZh: "隨 DRAM 節點微縮，電容間距小於 10nm，頻繁開關相鄰字元線會透過電容寄生耦合加速鄰近未選取單元的電荷洩漏，引發記憶體位元翻轉。",
      explanationEn: "Row Hammer exploits parasitic capacitive coupling in dense DRAM cells: hammering an aggressor row leaks charge from victim rows, inducing bit flips."
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
    },
    {
      questionZh: "在半導體微影與先進圖形轉移領域中，EPE 代表什麼極關鍵的幾何公差預算？",
      questionEn: "In advanced photolithography and multi-patterning, what does the critical metric EPE stand for?",
      optionsZh: ["Edge Placement Error (邊緣放置誤差)","Electronic Power Efficiency (電子功耗效率)","Epitaxial Purity Element (磊晶純度元素)","Etch Pressure Equilibrium (蝕刻氣壓平衡)"],
      optionsEn: ["Edge Placement Error (EPE)","Electronic Power Efficiency","Epitaxial Purity Element","Etch Pressure Equilibrium"],
      answer: 0,
      explanationZh: "EPE 綜合了微影曝光光學近似效應 (OPC)、光罩誤差 (MEEF)、晶圓疊對誤差 (Overlay) 與蝕刻偏差，是次 3nm 幾何圖形對齊的終極預算指標。",
      explanationEn: "EPE synthesizes CD error, optical proximity, reticle error, overlay shift, and etch bias as the ultimate metric for nanometer pattern alignment."
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
    },
    {
      questionZh: "半導體晶圓廠現場工程師口中所謂的「養腔 (Chamber Seasoning)」是指什麼操作？",
      questionEn: "In fab operations jargon, what does \"Chamber Seasoning\" refer to following scheduled chamber maintenance (PM)?",
      optionsZh: ["加熱腔體至 800°C 殺菌","在 PM 開腔保養或清洗後，投入多片 Dummy 擋片進行試跑沉積，使腔體內壁達到化學與電漿穩態","加入香精測試排氣管路氣密性","用酒精手動擦拭腔體表面"],
      optionsEn: ["Heating chamber to 800°C for sterilization","Running multiple dummy wafers post-PM to deposit a seasoning passivation layer, stabilizing chamber impedance and chemistry","Injecting tracer fragrance to test exhaust leaks","Manually wiping platen with isopropyl alcohol"],
      answer: 1,
      explanationZh: "新清洗或更換零件後的電漿腔體內壁暴露裸露表面，容易吸收自由基導致製程漂移；養腔是在內壁預先沉積保護薄膜以達到電漿阻抗穩定。",
      explanationEn: "Seasoning coats fresh chamber walls with process byproduct film, stabilizing RF impedance and radical consumption prior to running production lots."
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
    },
    {
      questionZh: "被全球半導體界公認為 VLSI 製程技術經典必讀聖經《Silicon Processing for the VLSI Era》的作者是誰？",
      questionEn: "Who are the legendary authors of the classic semiconductor handbook \"Silicon Processing for the VLSI Era\"?",
      optionsZh: ["Stanley Wolf & Richard N. Tauber","Gordon Moore & Robert Noyce","Andrew Grove & Bill Gates","Jack Kilby & Morris Chang"],
      optionsEn: ["Stanley Wolf & Richard N. Tauber","Gordon Moore & Robert Noyce","Andrew Grove & Bill Gates","Jack Kilby & Morris Chang"],
      answer: 0,
      explanationZh: "Wolf 與 Tauber 所著的《Silicon Processing for the VLSI Era》（共 4 冊）被譽為半導體製造工程的四庫全書，涵蓋了深度的物理機制與製程化學。",
      explanationEn: "Stanley Wolf and Richard N. Tauber authored the seminal multi-volume treatise \"Silicon Processing for the VLSI Era\", the definitive industry bible."
    }
  ]
};


/**
 * 8 大工程修煉領域分類與題庫掌握度對應 (Stage 13 / Rounds 61-65)
 */
export const DOMAIN_MASTERY_CATEGORIES = {
  materials: {
    id: 'materials',
    nameZh: '晶圓基板與材料物理',
    nameEn: 'Wafer Materials & Substrate Physics',
    chapters: ['ch00', 'ch03', 'app-glossary']
  },
  cleanroom_fab: {
    id: 'cleanroom_fab',
    nameZh: '廠務設施與無塵室自動化',
    nameEn: 'Cleanroom Facilities & Automation',
    chapters: ['ch01', 'ch18', 'ch23', 'app-jargon']
  },
  physics_transistor: {
    id: 'physics_transistor',
    nameZh: '固態物理與先進電晶體',
    nameEn: 'Solid-State Physics & Advanced Transistors',
    chapters: ['ch02', 'ch12', 'ch14']
  },
  litho_pattern: {
    id: 'litho_pattern',
    nameZh: '微影曝光與圖形轉移',
    nameEn: 'Photolithography & Pattern Transfer',
    chapters: ['ch04', 'ch10']
  },
  thinfilm_plasma: {
    id: 'thinfilm_plasma',
    nameZh: '薄膜沉積、蝕刻與平坦化',
    nameEn: 'Thin Film, Etch, Implant & CMP',
    chapters: ['ch05', 'ch06', 'ch07', 'ch08', 'ch09']
  },
  memory_integration: {
    id: 'memory_integration',
    nameZh: '記憶體架構與 CMOS 整合',
    nameEn: 'Memory Technologies & CMOS Integration',
    chapters: ['ch11', 'ch13', 'ch24']
  },
  metrology_yield: {
    id: 'metrology_yield',
    nameZh: '計量檢測、良率分析與 SPC',
    nameEn: 'Metrology, Yield & SPC Analytics',
    chapters: ['ch15', 'ch16', 'ch17', 'ch19']
  },
  packaging_reliability: {
    id: 'packaging_reliability',
    nameZh: '先進封裝、測試與可靠度',
    nameEn: 'Advanced Packaging & Reliability',
    chapters: ['ch20', 'ch21', 'ch22', 'app-reading']
  }
};
