/**
 * quiz-data.js
 * 半導體製造核心觀念隨堂快測 (Concept Quick-Quiz Database)
 * 滿貫覆蓋全站 25 正式章 (Ch 00 ~ 24) 與 3 篇附錄 (A/B/C) 共 28 篇高階實務四重奏題庫 (共 112 題大滿貫)
 */

export const CONCEPT_QUIZZES = {
  ch00: [
    {
      questionZh: "在現代 300mm 晶圓製造中，晶圓邊緣通常採用何種機械特徵進行晶向定位？",
      questionEn: "In modern 300mm wafer fabrication, what edge feature is standardized for crystallographic orientation?",
      optionsZh: ["平邊 (Flat Edge)","圓弧缺口 (Notch)","雙直角凹痕 (Double Flat)","雷射條碼孔 (Bar Hole)"],
      optionsEn: ["Flat Edge","Alignment Notch","Double Flat","Laser Bar Hole"],
      answer: 1,
      explanationZh: "300mm (12吋) 晶圓統一採用 Notch (定位缺口) 取代早期 200mm 以下的 Flat (平邊)，以大幅增加晶圓可用有效面積。",
      explanationEn: "300mm wafers standardize on orientation notches instead of flats to maximize usable active edge area."
    },
    {
      questionZh: "晶片製造全流程中，KGD (Known Good Die) 是在何種關鍵測試步驟後被判定標記？",
      questionEn: "In the wafer-to-package pipeline, at which critical testing stage is a die certified as KGD (Known Good Die)?",
      optionsZh: ["線上關鍵尺寸量測 (CD-SEM)","晶圓針測分類 (CP / Wafer Probe)","終端封裝後測試 (Final FT)","可靠度老化加速 (HTOL)"],
      optionsEn: ["Inline CD-SEM Metrology","Circuit Probing (CP / Wafer Probe)","Final Test after Packaging (FT)","High-Temp Operating Life (HTOL)"],
      answer: 1,
      explanationZh: "在 2.5D/3D 異質整合先進封裝前，必須在晶圓針測 (CP) 階段以探針卡進行全功能高速電性篩檢，確認為良好晶粒 (KGD) 後才進行堆疊鍵合。",
      explanationEn: "KGD certification occurs during Circuit Probing (CP) using probe cards to screen known-good dies before expensive 2.5D/3D bonding."
    },
    {
      questionZh: "半導體產業鏈中，純晶圓代工 (Pure-Play Foundry) 與傳統垂直整合 IDM 模式的核心差異為何？",
      questionEn: "In the semiconductor ecosystem, what is the defining business difference between a Pure-Play Foundry and an IDM?",
      optionsZh: ["代工廠專注製造服務而不販售自有品牌晶片","代工廠只做封裝測試不做晶圓製造","IDM 模式不需要光罩","代工廠只生產 200mm 以下晶圓"],
      optionsEn: ["Pure-play foundries strictly provide manufacturing services without marketing own-brand ICs","Foundries only handle packaging and test","IDMs eliminate mask tooling costs","Foundries are restricted to <=200mm wafers"],
      answer: 0,
      explanationZh: "純晶圓代工模式 (如台積電) 恪守不與客戶競爭原則，專精於製程技術代工，客戶提供 IC 設計光罩。",
      explanationEn: "Pure-play foundries do not design or sell branded ICs, eliminating competitive conflict with fabless customers."
    },
    {
      questionZh: "在現代先進晶圓廠推動綠色製造中，PFC (全氟化合物) 氣體之所以需配備高溫電漿燃燒洗滌塔 (Burn-wet Scrubber)，主要環境考量為何？",
      questionEn: "In green semiconductor manufacturing, why must Perfluorocarbon (PFC) gases be abated via high-temperature burn-wet scrubbers?",
      optionsZh: ["PFC 氣體具有高爆炸性","PFC 具有極高全球暖化潛勢 (GWP) 且大氣半衰期長達數千年","PFC 會直接侵蝕不鏽鋼輸送管路","PFC 會與矽晶圓自發劇烈燃燒"],
      optionsEn: ["PFC gases are pyrophoric explosives","PFCs possess extreme Global Warming Potential (GWP) with atmospheric lifetimes spanning thousands of years","PFCs rapidly corrode stainless steel lines","PFCs spontaneously combust upon silicon contact"],
      answer: 1,
      explanationZh: "NF3、CF4、C4F8 等 PFC 氣體雖然毒性相對低，但 GWP 值常高達二氧化碳的數千至萬倍以上，且在大氣中極難自然分解，必須於排氣端高溫裂解。",
      explanationEn: "PFC gases exhibit atmospheric lifetimes of thousands of years and GWP values up to 10,000x greater than CO2, requiring high-temperature destruction."
    }
  ],

  ch01: [
    {
      questionZh: "晶圓廠無塵室黃光曝光區之所以採用 500nm 以上黃光濾波照明，主要物理目的為何？",
      questionEn: "Why do photolithography cleanrooms strictly use filtered amber/yellow lighting above 500nm?",
      optionsZh: ["降低工程師視覺疲勞","避免化學增幅光阻劑 (CAR) 發生非預期意外感光","提升無塵衣導電排靜電效率","抑制無塵室空氣微粒懸浮"],
      optionsEn: ["Reduce operator eye fatigue","Prevent unintended exposure of chemically amplified photoresists","Improve bunny suit static dissipation","Suppress airborne particle suspension"],
      answer: 1,
      explanationZh: "光阻劑的感光波長多集中在紫外光 (UV) 至 450nm 以下，黃光（500nm 以上）無法引發光酸產生劑 (PAG) 分解，確保光阻穩定性。",
      explanationEn: "Photoresists are UV-sensitive; amber light above 500nm lacks photon energy to trigger photoacid generators."
    },
    {
      questionZh: "無塵室中，超純水 (UPW) 的理論物理極限電阻率在 25°C 時是多少？",
      questionEn: "In semiconductor cleanrooms, what is the theoretical maximum resistivity of Ultra-Pure Water (UPW) at 25°C?",
      optionsZh: ["1.0 MΩ·cm","10.5 MΩ·cm","18.24 MΩ·cm","50.0 MΩ·cm"],
      optionsEn: ["1.0 MΩ·cm","10.5 MΩ·cm","18.24 MΩ·cm","50.0 MΩ·cm"],
      answer: 2,
      explanationZh: "超純水去除非水離子後，僅剩水分子自身的極微量解離 (H+ 與 OH-)，25°C 時理論電阻率極限為 18.24 MΩ·cm。",
      explanationEn: "At 25°C, complete deionization leaves only intrinsic H+ and OH- ions, resulting in a theoretical limit of 18.24 MOhm*cm."
    },
    {
      questionZh: "在 ISO 14644-1 潔淨室標準中，Class 1 無塵室每立方米允許大於等於 0.1 µm 的微粒上限是多少？",
      questionEn: "Under the ISO 14644-1 standard, what is the maximum allowable particle concentration (>=0.1 µm) per cubic meter for an ISO Class 1 cleanroom?",
      optionsZh: ["1 顆","10 顆","100 顆","1000 顆"],
      optionsEn: ["1 particle","10 particles","100 particles","1,000 particles"],
      answer: 1,
      explanationZh: "ISO Class 1 規範每立方米 >=0.1 µm 微粒不得超過 10 顆，是半導體先進黃光微影室的極限潔淨度指標。",
      explanationEn: "ISO Class 1 permits a maximum of 10 particles/m³ sized >=0.1 µm, standard for critical lithography exposure bays."
    },
    {
      questionZh: "無塵室空氣中若存在極微量 (<1 ppb) 的 Category B 氣態分子污染物 (如 NH3 或胺類)，最容易在微影製程中引發何種致命缺陷？",
      questionEn: "In cleanroom environments, airborne molecular contamination (AMC) of Category B bases (e.g. NH3 or amines) at sub-ppb levels induces which critical lithography defect?",
      optionsZh: ["矽晶圓基底碎裂","化學增幅光阻 (CAR) 頂部光酸中和造成 T-topping 橋接短路","光罩保護膜 (Pellicle) 瞬間剝落","金屬互連線路電遷移"],
      optionsEn: ["Wafer substrate fracture","T-topping resist profile and bridge shorting caused by surface photo-acid neutralization in CAR","Instant pellicle detachment","Interconnect electromigration"],
      answer: 1,
      explanationZh: "化學增幅光阻 (CAR) 依賴曝光產生的微量光酸進行連鎖脫保護反應；空氣中的微量鹼性胺類氣體會中和光阻表層光酸，使表層無法溶解而形成蕈狀 T-topping。",
      explanationEn: "Base contaminants neutralize surface photo-generated acids in chemically amplified resists, inhibiting top dissolution and causing mushroom-like T-topping."
    }
  ],

  ch02: [
    {
      questionZh: "根據固態物理理論，在室溫 (300K) 下傳統 MOSFET 次臨界擺幅 (Subthreshold Swing, SS) 的熱力學物理極限約為多少？",
      questionEn: "According to solid-state physics, what is the thermodynamic limit of MOSFET subthreshold swing (SS) at 300K?",
      optionsZh: ["30 mV/dec","60 mV/dec (59.6 mV/dec)","90 mV/dec","120 mV/dec"],
      optionsEn: ["30 mV/dec","60 mV/dec (59.6 mV/dec)","90 mV/dec","120 mV/dec"],
      answer: 1,
      explanationZh: "由 SS = (kT/q)·ln(10) 計算，室溫下約為 59.6 mV/dec，此為熱載子波茲曼分佈所決定的傳統電晶體開關極限。",
      explanationEn: "Derived from SS = (kT/q)*ln(10), yielding ~59.6 mV/dec at 300K, set by the Boltzmann energy distribution."
    },
    {
      questionZh: "在先進製程中，MOSFET 閘極介電層以高介電係數材料 (High-k, 如 HfO2) 取代 SiO2 的核心目的為何？",
      questionEn: "In advanced nodes, why is SiO2 replaced by High-k materials (e.g., HfO2) for the gate dielectric?",
      optionsZh: ["降低製程熱預算","在維持極薄等效氧化厚度 (EOT) 同時增加物理厚度，抑制量子穿隧漏電","提升矽晶圓導熱率","加速電子在通道內的漂移速度"],
      optionsEn: ["Reduce process thermal budget","Increase physical thickness to suppress direct quantum tunneling while keeping thin EOT","Improve wafer thermal conductivity","Accelerate channel carrier drift velocity"],
      answer: 1,
      explanationZh: "當 SiO2 厚度小於 1.5nm 時會產生嚴重的量子直接穿隧漏電流；改用 High-k 可物理性增厚薄膜，同時維持足夠的閘極電容與靜電控制。",
      explanationEn: "High-k materials allow physically thicker films to block quantum tunneling while preserving high capacitive gate control (low EOT)."
    },
    {
      questionZh: "在經典 CMOS 反相器 (Inverter) 中，當輸入端為高電位 (Vin = Vdd) 時，NMOS 與 PMOS 的開關狀態為何？",
      questionEn: "In a standard CMOS inverter, when the input is high (Vin = Vdd), what are the conduction states of the NMOS and PMOS?",
      optionsZh: ["NMOS 導通、PMOS 截止","NMOS 截止、PMOS 導通","兩者皆導通產生短路","兩者皆截止"],
      optionsEn: ["NMOS is ON, PMOS is OFF","NMOS is OFF, PMOS is ON","Both are ON, creating crowbar current","Both are OFF"],
      answer: 0,
      explanationZh: "高電位使 NMOS 通道形成電子反轉層而導通，PMOS 則無電洞反轉層而截止，將輸出端平穩拉至接地 (Vout = 0V)。",
      explanationEn: "A high input creates an electron inversion layer in NMOS turning it ON, while shutting OFF the PMOS, pulling Vout to ground."
    },
    {
      questionZh: "現代應變矽 (Strained Silicon) 技術中，在 PMOS 汲極與源極嵌入 SiGe 磊晶，主要利用何種物理機制提高電洞遷移率？",
      questionEn: "In strained silicon technology, embedding SiGe into PMOS source and drain regions boosts hole mobility via which physical mechanism?",
      optionsZh: ["增加晶圓厚度","SiGe 晶格常數大於 Si，對矽通道施加雙軸壓應力 (Compressive Strain)","直接在通道內引入超高濃度磷摻雜","降低熱氧化生長溫度"],
      optionsEn: ["Increasing wafer thickness","SiGe has a larger lattice constant than Si, exerting compressive channel strain that splits valence subbands","Introducing ultra-high phosphorus doping directly into the channel","Lowering thermal oxidation temperatures"],
      answer: 1,
      explanationZh: "鍺 (Ge) 的晶格常數大於矽，在 PMOS 嵌埋 SiGe 會迫使通道矽原子受壓，引發價帶 (Valence Band) 簡併態能帶分裂，大幅減輕電洞有效質量並提升電洞遷移率。",
      explanationEn: "SiGe lattice parameter exceeds silicon, inducing uniaxial compressive strain along the PMOS channel which lifts valence band degeneracy and reduces hole effective mass."
    }
  ],

  ch03: [
    {
      questionZh: "在柴氏長晶法 (Czochralski Method) 中，石英坩堝高溫熔融主要會向單晶矽熔湯中引入何種原生非金屬雜質？",
      questionEn: "In Czochralski growth, what primary intrinsic non-metallic impurity is dissolved from the quartz crucible into silicon melt?",
      optionsZh: ["碳 (Carbon)","氧 (Oxygen)","氮 (Nitrogen)","硫 (Sulfur)"],
      optionsEn: ["Carbon","Oxygen","Nitrogen","Sulfur"],
      answer: 1,
      explanationZh: "石英坩堝 (SiO2) 在高溫熔矽中微量分解，將間隙氧 (Oi) 引入晶棒中；適量氧可提供內部吸雜 (Internal Gettering)，但過量易形成微缺陷。",
      explanationEn: "Crucible SiO2 dissolves into the melt, introducing interstitial oxygen which enables intrinsic gettering."
    },
    {
      questionZh: "柴氏長晶法 (Czochralski) 生長單晶矽錠時，偏析係數 (k0 < 1) 會造成晶錠頭部與尾部的摻雜濃度如何變化？",
      questionEn: "In Czochralski silicon crystal pulling, how does a segregation coefficient k0 < 1 affect dopant distribution from seed to tail?",
      optionsZh: ["頭部尾部完全均勻","晶錠尾部摻雜濃度顯著高於頭部","晶錠頭部摻雜濃度顯著高於尾部","中心濃度高於邊緣但軸向均勻"],
      optionsEn: ["Completely uniform throughout","Tail end has significantly higher dopant concentration than seed end","Seed end has higher concentration than tail end","Center is higher but axially uniform"],
      answer: 1,
      explanationZh: "根據 Scheil 偏析方程式，當 k0 < 1 時，雜質偏好留在液相矽熔湯中，隨著結晶結晶體積增加，熔湯雜質濃度上升，使晶錠尾部摻雜最高。",
      explanationEn: "Per Scheil equation, k0 < 1 causes dopants to partition preferentially into the melt, enriching the tail end as crystallization progresses."
    },
    {
      questionZh: "在長晶拉晶過程中，施加垂直強磁場 (MCZ, Magnetic Czochralski) 的主要物理目的為何？",
      questionEn: "In single-crystal silicon pulling, what is the primary metallurgical purpose of applying Magnetic Czochralski (MCZ)?",
      optionsZh: ["降低石英坩堝融化溫度","利用勞侖茲力抑制高溫矽熔湯熱對流，大幅降低氧雜質起伏","加速晶錠冷卻拉出速度","增加矽錠磁性"],
      optionsEn: ["Lower quartz crucible melting point","Damp thermal melt convection via Lorentz forces to suppress oxygen incorporation fluctuations","Accelerate ingot pull rates","Impart ferromagnetic properties to silicon"],
      answer: 1,
      explanationZh: "液態矽為高導電熔湯，強磁場感應逆向勞侖茲力阻尼熱對流亂流，精確控制坩堝釋放的氧原子濃度。",
      explanationEn: "Lorentz forces in conductive molten silicon damp convective turbulence, minimizing quartz crucible oxygen dissolution."
    },
    {
      questionZh: "柴氏長晶法 (CZ) 矽單晶晶圓在後續熱製程中形成的微量氧析出物 (BMD)，在製程中具備何種重要「內吸雜 (Internal Gettering)」功能？",
      questionEn: "In Czochralski (CZ) silicon wafers, Bulk Micro-Defects (BMD) formed by oxygen precipitation serve what critical Internal Gettering (IG) role?",
      optionsZh: ["做為重金屬雜質的深層陷阱，避免雜質擴散至晶圓表面主動元件區","加速薄膜沉積沈積速率","防止晶圓在化學機械研磨時磨損","提升光阻劑在晶圓表面的附著力"],
      optionsEn: ["Acting as bulk trapping sinks for deleterious transition metal impurities away from the active surface zone","Accelerating CVD deposition rates","Preventing wafer abrasion during CMP","Enhancing photoresist surface adhesion"],
      answer: 0,
      explanationZh: "CZ 晶圓內含過飽和間隙氧，在晶圓內部經熱退火析出為 SiO2 晶核 (BMD)，能將晶圓加工中滲入的有害重金屬 (如 Cu, Fe, Ni) 捕捉束縛在基底深處，保持表面無缺陷潔淨 (Denuded Zone)。",
      explanationEn: "Oxygen precipitate BMDs located in the bulk wafer getter detrimental fast-diffusing transition metals away from the top active device region."
    }
  ],

  ch04: [
    {
      questionZh: "根據瑞利判據公式 R = k1 · (λ / NA)，下列哪項措施能有效縮小微影最小線寬 R？",
      questionEn: "According to Rayleigh criteria R = k1 * (λ / NA), which modification reduces minimum feature size R?",
      optionsZh: ["降低曝光透鏡數值孔徑 NA","使用更短的曝光光源波長 λ (例如換用 13.5nm EUV)","提高製程因子 k1","增加浸潤式液體的吸光率"],
      optionsEn: ["Decrease numerical aperture NA","Use shorter exposure wavelength λ (e.g., 13.5nm EUV)","Increase process factor k1","Increase liquid absorbance"],
      answer: 1,
      explanationZh: "解析度 R 與波長 λ 成正比，波長越短（如從 193nm 縮短至 13.5nm EUV）或 NA 越大，最小解析線寬 R 越小。",
      explanationEn: "Resolution R is directly proportional to wavelength λ; shrinking λ or increasing NA yields tighter pitches."
    },
    {
      questionZh: "極紫外光微影 (EUV, 13.5nm) 光學系統之所以必須在高度真空環境中運作，核心物理原因為何？",
      questionEn: "Why must Extreme Ultraviolet (EUV, 13.5nm) exposure optical systems operate in high vacuum?",
      optionsZh: ["防止無塵室氣流引起光罩微震","大氣中之氧氣、水分子與氮氣對 13.5nm 光子具有強烈吸收","降低多層膜反射鏡的熱膨脹","防止光阻氣相揮發物沉積在晶圓上"],
      optionsEn: ["Prevent cleanroom airflow vibrations","Ambient oxygen, water vapor, and nitrogen strongly absorb 13.5nm EUV photons","Minimize thermal expansion of mirrors","Prevent resist outgassing on wafers"],
      answer: 1,
      explanationZh: "13.5nm 極短波長光子在空氣中的穿透深度僅有微米級，所有氣體皆會強烈吸收 EUV 光束，因此整條光路與晶圓台必須維持高度真空。",
      explanationEn: "13.5nm EUV photons are strongly absorbed by virtually all gases within micrometers, necessitating a high-vacuum chamber environment."
    },
    {
      questionZh: "浸潤式微影 (193i) 利用高純度水 (折射率 n=1.44) 填充透鏡與晶圓之間，能將曝光鏡頭數值孔徑 (NA) 推升至最高多少？",
      questionEn: "By filling the lens-wafer gap with purified water (n = 1.44), immersion lithography pushes the effective numerical aperture (NA) up to:",
      optionsZh: ["0.85 NA","0.93 NA","1.35 NA","1.75 NA"],
      optionsEn: ["0.85 NA","0.93 NA","1.35 NA","1.75 NA"],
      answer: 2,
      explanationZh: "空氣中極限 NA < 1.0；介質折射率 n=1.44 使光學系統突破乾式極限，量產掃描機最高達到 1.35 NA。",
      explanationEn: "Dry lithography is capped at NA < 1.0; water immersion (n = 1.44) enables commercial scanner optics to reach ~1.35 NA."
    },
    {
      questionZh: "在極紫外光 (EUV) 化學增幅光阻 (CAR) 的曝光後烘烤 (PEB) 中，擴大酸擴散長度 (Acid Diffusion Length) 會面臨何種不可兼得的物理權衡 (Trade-off)？",
      questionEn: "During post-exposure bake (PEB) in EUV chemically amplified resists, increasing the acid diffusion length imposes what fundamental physical trade-off?",
      optionsZh: ["雖然能消除光子散粒噪聲降低線邊粗糙度 (LWR)，但會嚴重破壞光學圖形解析度 (Resolution Blur)","會使晶圓厚度縮小","會完全阻止顯影液溶解光阻","會使雷射光源波長發生偏移"],
      optionsEn: ["It smooths photon shot noise and reduces Line Width Roughness (LWR), but degrades resolution blur and pattern contrast","It physically shrinks wafer substrate thickness","It permanently halts developer dissolution","It shifts the EUV laser source wavelength"],
      answer: 0,
      explanationZh: "此即半導體微影著名的 RLS 鐵律 (Resolution, Line-width roughness, Sensitivity)：酸擴散過大會平滑化線條粗糙度，但擴散過度會模糊圖形邊緣、降低極限解析度。",
      explanationEn: "The fundamental RLS trade-off dictates that longer acid diffusion blurs fine pitch resolution while reducing photon shot-noise induced LWR."
    }
  ],

  ch05: [
    {
      questionZh: "原子層沉積 (ALD) 相較於傳統化學氣相沉積 (CVD)，其最核心的物理自限制特徵為何？",
      questionEn: "What is the fundamental self-limiting characteristic of Atomic Layer Deposition (ALD) over CVD?",
      optionsZh: ["連續性氣體混合反應","飽和化學吸附 (Saturated Chemisorption) 與半反應分步前進","極高的沉積溫度與熱解","依賴電漿連續轟擊產生"],
      optionsEn: ["Continuous precursor gas mixing","Saturated chemisorption & alternating half-reaction pulses","Extremely high thermal pyrolysis","Continuous plasma bombardment"],
      answer: 1,
      explanationZh: "ALD 採用脈衝式交替通入前驅物與反應氣體，每次脈衝在表面吸附一層飽和分子即自發停止，達成埃米級厚度精確控制與 100% 階梯覆蓋率。",
      explanationEn: "ALD relies on alternating precursor pulses that self-terminate once a monolayer chemisorbs, ensuring 100% conformality."
    },
    {
      questionZh: "原子層沉積 (ALD) 能在超高深寬比 (>100:1) 結構中達到近乎 100% 階梯覆蓋率的核心化學機制為何？",
      questionEn: "What chemical mechanism enables Atomic Layer Deposition (ALD) to achieve near 100% step coverage in ultra-high aspect ratio structures?",
      optionsZh: ["高速熱對流輸送","自限制表面化學吸附反應 (Self-Limiting Surface Reaction)","高能電漿離子垂直轟擊","催化劑表面張力驅動"],
      optionsEn: ["High-speed thermal convective delivery","Self-limiting surface chemisorption saturation reactions","High-energy directional plasma ion bombardment","Catalytic surface tension Marangoni flow"],
      answer: 1,
      explanationZh: "ALD 透過交替脈衝的前驅物氣體，在晶圓表面產生單層飽和化學吸附，多餘氣體不反應並被吹洗，因而具備完美的自對準厚度均勻性。",
      explanationEn: "ALD relies on sequential, self-limiting half-reactions where precursors saturate available surface sites without gas-phase parasitic deposition."
    },
    {
      questionZh: "在雙鑲嵌金屬化前沉積層間介電層時，電漿增強化學氣相沉積 (PECVD) 相對於低壓熱 CVD 的最大優勢為何？",
      questionEn: "When depositing inter-layer dielectrics over copper interconnects, what is the chief advantage of PECVD over thermal LPCVD?",
      optionsZh: ["薄膜密度高十倍","利用電漿活化反應氣體，可在 <400°C 低溫下沉積以符合後段熱預算","不需要任何前驅物氣體","薄膜具有超導特性"],
      optionsEn: ["Ten-fold higher film density","Plasma excitation enables lower deposition temperatures (<400°C) to respect BEOL thermal budgets","Eliminates chemical precursors","Produces superconducting dielectric films"],
      answer: 1,
      explanationZh: "後段金屬化含有銅線與 low-k 介電材料，溫度超過 400°C 會引發銅擴散與介電層崩塌，PECVD 能在低溫下完成優質沉積。",
      explanationEn: "BEOL copper and porous low-k layers degrade above 400°C; PECVD supplies RF plasma energy to drive deposition at lower wafer temperatures."
    },
    {
      questionZh: "在矽熱氧化 Deal-Grove 模型中，當乾氧氧化厚度小於 20-25nm 時，實驗生長速率遠高於經典理論預測，此現象主要由何種修正模型描述？",
      questionEn: "In silicon thermal oxidation Deal-Grove kinetics, thin dry oxides (<20-25nm) grow significantly faster than classical theory predicts. Which model captures this anomaly?",
      optionsZh: ["Massoud 早期指數增強模型 (Massoud Thin-Oxide Enhancement)","Arrhenius 熱傳導模型","Moore 定律外推方程","Stoney 翹曲模型"],
      optionsEn: ["Massoud Exponential Thin-Oxide Enhancement Model","Arrhenius Heat Conduction Model","Moore Law Extrapolation","Stoney Warpage Model"],
      answer: 0,
      explanationZh: "Massoud 提出在氧化初期極薄層時，氧氣在近界面處具有額外的表面過渡增強反應速率項，以指數衰減修正項納入微分生長方程式。",
      explanationEn: "Massoud added empirical exponential decay rate terms to the oxidation rate equation to match observed rapid growth kinetics below 25nm."
    }
  ],

  ch06: [
    {
      questionZh: "在反應離子蝕刻 (RIE) 中，若欲獲得高度垂直且平整的側壁輪廓（高非等向性），最主要依賴何種機制？",
      questionEn: "In Reactive Ion Etching (RIE), what primary mechanism delivers highly anisotropic vertical sidewalls?",
      optionsZh: ["純化學自由基各向同性自發腐蝕","離子垂直定向轟擊去除底部保護鈍化層 (Passivation Layer)","大幅提高晶圓溫度至 500°C","完全阻斷反應腔體電漿放電"],
      optionsEn: ["Pure isotropic chemical radical etching","Directional energetic ion bombardment removing horizontal passivation","Heating wafer above 500°C","Extinguishing plasma discharge"],
      answer: 1,
      explanationZh: "射頻偏壓引導帶正電離子垂直加速轟擊，快速打破水平底面的鈍化層，而側壁因無垂直轟擊而受鈍化層保護，形成非等向性陡峭垂直溝槽。",
      explanationEn: "RF-directed ions bombard and clear inhibitor films on trench floors while sidewalls remain chemically protected."
    },
    {
      questionZh: "在電漿乾蝕刻中，深寬比相依蝕刻延遲 (ARDE / RIE Lag) 的主要物理成因是什麼？",
      questionEn: "What is the primary physical mechanism responsible for Aspect Ratio Dependent Etching (ARDE / RIE Lag)?",
      optionsZh: ["晶圓邊緣射頻電場畸變","高深寬比槽底的中性反應自由基受克努森擴散 (Knudsen Diffusion) 輸送限制","光阻在高深寬比下硬化","靜電吸盤溫度分佈不均"],
      optionsEn: ["Wafer edge RF field distortion","Knudsen diffusion transport limitation of neutral etchant radicals into deep feature bottoms","Resist thermal hardening at high AR","Electrostatic chuck thermal non-uniformity"],
      answer: 1,
      explanationZh: "當孔槽深寬比大幅升高時，分子平均自由程大於孔徑，氣體分子與側壁頻繁碰撞（克努森擴散），導致槽底反應物通量下降，蝕刻速率變慢。",
      explanationEn: "At high AR, Knudsen diffusion limits molecular transport of neutral etchants to the bottom, causing etch rates to decrease with depth."
    },
    {
      questionZh: "波希深矽蝕刻技術 (Bosch DRIE) 是透過交替循環哪兩種製程步驟，實現 3D TSV 高深寬比垂直深槽？",
      questionEn: "The Bosch deep reactive-ion etching (DRIE) process achieves high aspect ratio vertical TSV profiles by alternating between which two steps?",
      optionsZh: ["SF6 電漿化學蝕刻與 C4F8 聚合物側壁鈍化 (Passivation)","強酸浸泡與純水沖洗","高溫熱氧化與乾式回蝕","離子佈植與退火"],
      optionsEn: ["SF6 isotropic chemical etch and C4F8 fluorocarbon sidewall polymer passivation","Concentrated acid bath and water rinse","Thermal oxidation and dry strip","Ion implant and thermal drive-in"],
      answer: 0,
      explanationZh: "Bosch 製程交替執行 SF6 快速矽蝕刻與 C4F8 沉積氟碳聚合物保護側壁，垂直離子轟擊打穿底部繼續下蝕，維持垂直輪廓。",
      explanationEn: "Bosch DRIE alternates SF6 isotropic etching with C4F8 polymer deposition; directional ions clear trench bottoms while protecting sidewalls."
    },
    {
      questionZh: "在雙頻容性耦合電漿 (DF-CCP) 蝕刻機台架構中，採用 60MHz 源頻率與 2MHz 偏壓頻率搭配，其核心物理設計優勢為何？",
      questionEn: "In Dual-Frequency Capacitively Coupled Plasma (DF-CCP) etchers, pairing a 60MHz source frequency with a 2MHz bias frequency offers what primary physical advantage?",
      optionsZh: ["使腔體內不再需要任何反應氣體","實現電漿電子密度 (Plasma Density) 與離子轟擊能量 (Ion Energy) 的獨立解耦調控","完全消除任何電漿發光現象","使蝕刻速率變為零以防止過度蝕刻"],
      optionsEn: ["Eliminating the need for process gases","Decoupling plasma electron density control (via high freq) from ion bombardment energy control (via low freq)","Completely extinguishing plasma glow","Freezing etch rates to zero to prevent over-etching"],
      answer: 1,
      explanationZh: "高頻 (如 60MHz) 電子振盪效率極高，專責提升電漿離子化密度；低頻 (如 2MHz) 離子能跟上 RF 週期穿越鞘層，專責控制垂直離子動能與 IEDF 分佈。",
      explanationEn: "High RF frequency efficiently controls electron density and plasma ionization, whereas low RF frequency independently sets ion sheath bombardment energy."
    }
  ],

  ch07: [
    {
      questionZh: "離子佈植 (Ion Implantation) 完成後，晶圓必須進行高溫退火 (RTA/Annealing) 製程，其最核心的兩大物理目的為何？",
      questionEn: "Following ion implantation, why must wafers undergo thermal annealing (RTA)?",
      optionsZh: ["增加光阻厚度並消除晶圓翹曲","修復晶格受損非晶層並活化置換摻雜原子 (Activation)","在表面快速生成熱氧化層","將金屬導線由固態熔化為液態"],
      optionsEn: ["Increase photoresist thickness","Recrystallize damaged lattice and electrically activate dopants","Grow thick thermal oxide","Melt metal wires into liquid"],
      answer: 1,
      explanationZh: "離子轟擊會打碎單晶矽晶格形成非晶層 (Amorphization)，高溫退火提供熱能使晶格重新生長對準，並促使摻雜原子佔據矽原子格點以提供自由載子。",
      explanationEn: "Thermal budget recrystallizes damaged lattice damage and moves dopant atoms into substitutional lattice sites."
    },
    {
      questionZh: "在極淺接面 (USJ) 製程中，為何普遍採用毫秒閃光 (FLA) 或雷射退火 (LSA) 取代傳統 RTA 退火？",
      questionEn: "For Ultra-Shallow Junction (USJ) formation, why is millisecond flash (FLA) or laser annealing (LSA) preferred over rapid thermal annealing (RTA)?",
      optionsZh: ["設備購置成本較低","在達成 100% 電性活化同時實現摻雜原子近乎「零熱擴散 (Zero Diffusion)」","增加矽基底晶格滑移線密度","大幅提升晶圓產出率 (UPH)"],
      optionsEn: ["Lower tool capital expenditure","Achieves 100% dopant electrical activation while maintaining near-zero thermal diffusion","Increases silicon slip line density","Dramatically boosts raw tool throughput"],
      answer: 1,
      explanationZh: "奈秒至毫秒級的超短脈衝加熱可使晶圓表層達千度活化摻雜原子，但時間極短不足以讓雜質進行固態擴散，保持陡峭的奈米接面。",
      explanationEn: "Sub-millisecond heating provides sufficient thermal energy for lattice substitution and activation while freezing solid-state diffusion."
    },
    {
      questionZh: "離子佈植中，當入射離子束剛好與晶體內部對稱軸或低指數晶面平行時，會發生的「通道效應 (Channeling Effect)」是指？",
      questionEn: "In ion implantation, what does the \"Channeling Effect\" describe when ion beams align with major crystal axes?",
      optionsZh: ["離子完全被晶圓表面反射","離子只受微弱電子阻擋長驅直入晶格深處，導致摻雜縱深超出預期無法控制","離子在晶圓表面產生火花放電","離子使矽晶圓瞬間熔化"],
      optionsEn: ["Total ion reflection at surface","Ions penetrate deeply along open crystallographic channels with minimal nuclear stopping, skewing depth profiles","Surface micro-arcing discharge","Instantaneous localized silicon melting"],
      answer: 1,
      explanationZh: "沿著晶向開放通道前進的離子碰撞截面積極小，射程顯著加深；實務上透過晶圓預先傾角 7° 或預先非晶化 (PAI) 杜絕通道效應。",
      explanationEn: "Ions aligned with crystal channels experience reduced nuclear scattering and travel far beyond projected range Rp; solved via 7° tilt or PAI."
    },
    {
      questionZh: "離子佈植後在 700°C~900°C 快速熱退火 (RTA) 初期，硼 (Boron) 會出現超乎正常熱擴散數十倍的暫態增強擴散 (TED)，其微觀物理機制為何？",
      questionEn: "During rapid thermal annealing (RTA) at 700°C-900°C following ion implantation, Boron exhibits Transient Enhanced Diffusion (TED) driven by which microscopic defect mechanism?",
      optionsZh: ["佈植誘導產生的 {311} 矽自填隙缺陷團簇 (Self-Interstitial Clusters) 崩解釋放大量過飽和填隙原子","晶圓表面微裂紋的機械擴展","光阻劑直接碳化滲入晶格","氮氣保護氣體在晶格中形成空洞"],
      optionsEn: ["Dissolution of implant-induced {311} silicon self-interstitial clusters releasing a burst of supersaturated free interstitials","Mechanical micro-crack propagation","Direct carbonization from photoresists","Nitrogen purge gas micro-void precipitation"],
      answer: 0,
      explanationZh: "離子撞擊會使矽原子脫離晶格形成 {311} 柱狀缺陷團簇；退火初期團簇熔解，游離的過飽和矽填隙原子與硼配對，引發短暫且極快的間隙輔助擴散。",
      explanationEn: "Implantation damage aggregates into {311} self-interstitial defects; during thermal ramping, their dissolution floods the lattice with interstitials that super-diffuse boron."
    }
  ],

  ch08: [
    {
      questionZh: "依據 Preston 方程式 MRR = Kp · P · V，若將化學機械研磨 (CMP) 的下壓力 P 增加一倍，材料移除率理論上會？",
      questionEn: "According to Preston law MRR = Kp * P * V, if CMP downforce P is doubled, material removal rate will theoretically:",
      optionsZh: ["降低為原本的一半","維持不變","增加為原本的 2 倍","增加為原本的 4 倍"],
      optionsEn: ["Halve","Remain unchanged","Double","Quadruple"],
      answer: 2,
      explanationZh: "Preston 定律中材料移除率 MRR 與壓力 P 及相對速度 V 呈一階線性正比關係，因此下壓力加倍，移除速率亦加倍。",
      explanationEn: "MRR scales linearly with pressure P and velocity V; doubling downforce doubles the instantaneous removal rate."
    },
    {
      questionZh: "化學機械平坦化 (CMP) 中，當氧化鈰 (Ceria) 研磨液遇見氮化矽 (Si3N4) 膜層時研磨速率遽降，此物理化學特性稱為？",
      questionEn: "In CMP, the phenomenon where a ceria-based slurry polishes SiO2 rapidly but stops on Si3N4 is known as:",
      optionsZh: ["研磨墊碟化 (Dishing)","高選擇比化學阻擋特性 (High-Selectivity Stop-on-Nitride)","過研磨侵蝕 (Erosion)","表面流場紊流 (Turbulent Flow)"],
      optionsEn: ["Platen Dishing","High-Selectivity Stop-on-Nitride (HSN) characteristics","Over-polish Oxide Erosion","Surface Turbulent Shearing"],
      answer: 1,
      explanationZh: "Ceria 磨粒對 SiO2 具備化學鍵合切削活性，但對 Si3N4 惰性，使選擇比高達 30:1 以上，作為淺溝槽隔離 (STI) 的完美終點研磨阻擋層。",
      explanationEn: "Ceria slurries selectively form chemical bonds with SiO2 but not Si3N4, yielding >30:1 selectivity for self-stopping planarization."
    },
    {
      questionZh: "化學機械平坦化 (CMP) 後，較寬的金屬走線區域中心因研磨墊微觀彈性彎曲而低於介電層表面，此缺陷稱為？",
      questionEn: "In chemical mechanical planarization, what is the defect where wide metal lines dip below the surrounding dielectric surface?",
      optionsZh: ["小丘 (Hillock)","碟化 (Dishing)","滑移 (Slip)","裂片 (Delamination)"],
      optionsEn: ["Hillock protrusion","Metal Dishing","Crystallographic Slip","Dielectric Delamination"],
      answer: 1,
      explanationZh: "彈性研磨墊壓入寬金屬槽內部過度切削，導致金屬中央向下凹陷稱為 Dishing，會增加導線電阻並惡化拓撲平坦度。",
      explanationEn: "Elastic CMP pads deform into wide metal trenches causing center thinning known as dishing, which raises wire sheet resistance."
    },
    {
      questionZh: "在銅化學機械平坦化 (CMP) 雙鑲嵌製程中，大面積寬金屬導線比細窄導線更容易產生嚴重的碟形下凹 (Dishing)，其根本力學原因為何？",
      questionEn: "In copper CMP dual-damascene processing, wide metal lines suffer drastically worse dishing than narrow lines due to which mechanical phenomenon?",
      optionsZh: ["寬金屬線的晶體熔點比窄線低","研磨墊 (Polishing Pad) 在壓力下產生微觀彈性形變，下陷彎入寬銅溝槽內部持續研磨","銅原子在寬金屬線內擴散速度較慢","寬金屬線的化學蝕刻速度自動降為零"],
      optionsEn: ["Wide metal traces have lower melting temperatures","The resilient polishing pad elastically deforms and bulges into wide copper trenches under downforce pressure","Copper atoms diffuse slower in wide features","Chemical slurry reaction rates drop to zero in wide features"],
      answer: 1,
      explanationZh: "研磨墊具備彈性模數，當跨過大線寬 (>10um) 金屬溝槽時，剛性不足以跨橋支撐，因而凹陷深入溝槽內部，持續切削軟質銅金屬。",
      explanationEn: "The polishing pad bends elastically into the recessed topography of wide metal features, causing localized overpolishing and concave dishing."
    }
  ],

  ch09: [
    {
      questionZh: "在半導體經典 RCA 清洗流程中，SC-1 溶液 (NH4OH + H2O2 + H2O) 主要用於去除晶圓表面的何種污染物？",
      questionEn: "In standard RCA clean, what is the primary target of SC-1 (NH4OH + H2O2 + H2O) solution?",
      optionsZh: ["重金屬離子 (Fe, Cu)","表面次微米微粒與有機殘留 (Particles & Organics)","天然氧化層 (Native Oxide)","厚銅金屬層"],
      optionsEn: ["Heavy metallic ions","Sub-micron particles and organic residue","Native silicon oxide","Thick copper layers"],
      answer: 1,
      explanationZh: "SC-1 藉由雙氧水微氧化矽表面、氨水微溶蝕氧化層產生下切作用，搭配負 Zeta 電位斥力脫附表面微粒與有機物。",
      explanationEn: "SC-1 uses controlled oxidation and slight etching with like-charge zeta repulsion to remove particles and organics."
    },
    {
      questionZh: "清洗小於 10nm 高深寬比微細圖案時，為避免水相乾燥時表面張力拉扯造成「圖案倒塌」，業界標準對策為何？",
      questionEn: "When cleaning <10nm high-aspect-ratio features, what process is used to eliminate capillary forces that cause pattern collapse?",
      optionsZh: ["提高離心甩乾轉速至 5000 RPM","超臨界二氧化碳乾燥 (Supercritical CO2, SCCO2)","強酸高溫烘烤","純氫氣電漿灰化"],
      optionsEn: ["Increase spin drying speed to 5000 RPM","Supercritical CO2 (SCCO2) zero-surface-tension drying","Concentrated hot acid baking","Pure hydrogen plasma ashing"],
      answer: 1,
      explanationZh: "超臨界流體狀態下液氣介面消失，表面張力 γ = 0，拉普拉斯毛細壓力為零，徹底杜絕微結構受液滴收縮拉倒的缺陷。",
      explanationEn: "Supercritical CO2 eliminates the liquid-gas phase boundary, reducing surface tension to zero and completely preventing capillary collapse."
    },
    {
      questionZh: "半導體濕式清洗經典配方 SC-1 (Standard Clean 1, 又名 APM) 的主要化學成分與清洗目標為何？",
      questionEn: "What are the chemical components and primary cleaning target of the classic SC-1 (APM) wet bench clean?",
      optionsZh: ["NH4OH + H2O2 + H2O，利用氧化與微蝕刻去除表面顆粒微粒與有機殘留物","HCl + H2O2 + H2O，去除金屬離子","HF + H2O，剝除二氧化矽","H2SO4 + H2O2，去除厚光阻"],
      optionsEn: ["NH4OH + H2O2 + H2O: removes surface particles and light organic contamination via gentle etching","HCl + H2O2 + H2O: removes metallic ions","HF + H2O: strips silicon dioxide","H2SO4 + H2O2: strips thick bulk resist"],
      answer: 0,
      explanationZh: "SC-1 是氨水與雙氧水混合液，雙氧水氧化矽表面，氨水微溶氧化物，在微觀剝離中藉由 Zeta 負電位排斥脫附微粒。",
      explanationEn: "SC-1 oxidizes and slightly etches the silicon surface, establishing a repulsive negative zeta potential that lifts particles off."
    },
    {
      questionZh: "在兆聲波 (Megasonic Cleaning, ~1 MHz) 晶圓濕式清洗中，之所以能有效清除 20nm 以下微小顆粒而不震斷脆弱的超細微 FinFET 閘極，關鍵在於何種聲學控制？",
      questionEn: "In megasonic cleaning (~1 MHz), what acoustic control mechanism enables removal of sub-20nm particles without fracturing delicate FinFET/GAA gate structures?",
      optionsZh: ["完全關閉清洗液水流","嚴格控制聲功率以誘發「穩態微流聲空化 (Stable Acoustic Cavitation)」，避免產生劇烈破壞性的「暫態空化 (Transient Cavitation)」","將清洗液溫度加熱至 300°C","直接採用純王水進行超音波震盪"],
      optionsEn: ["Completely halting cleaning liquid flow","Carefully tuning acoustic power density to promote stable microstreaming cavitation while suppressing violent transient collapse cavitation","Heating the chemical bath to 300°C","Utilizing boiling aqua regia under ultrasonic transducer vibration"],
      answer: 1,
      explanationZh: "高頻兆聲波藉由微泡表面振動形成的微流 (Microstreaming) 剪切力剝離奈米微粒；若聲功率過高引發氣泡暴烈崩陷 (Transient Cavitation)，產生的微射流會直接衝斷微觀結構。",
      explanationEn: "Stable cavitation produces acoustic microstreaming shear stress to dislodge nanoparticles, whereas uncontrolled transient bubble collapse yields destructive shockwaves that damage fragile fins."
    }
  ],

  ch10: [
    {
      questionZh: "在先進製程後段銅金屬化中，之所以採用雙鑲嵌 (Dual Damascene) 搭配 CMP 而非傳統 RIE 乾蝕刻的原因是？",
      questionEn: "Why does copper metallization adopt Dual Damascene CMP instead of conventional RIE etching?",
      optionsZh: ["銅金屬原物料過於廉價","銅鹵化物在低溫下揮發性極低，無法形成氣態副產物排出","電漿反應會使銅金屬昇華爆炸","銅金屬完全無法被酸性化學液拋光"],
      optionsEn: ["Copper is too inexpensive","Copper halides have extremely low volatility at fab temperatures","Plasma causes copper to explode","Copper cannot be polished by slurry"],
      answer: 1,
      explanationZh: "銅的氯化物 (CuClx) 沸點高達數百度，在常溫電漿下無法氣化抽出，因此必須改用「先刻介電層溝槽、再電鍍填銅、最後以 CMP 磨平」之鑲嵌工法。",
      explanationEn: "Copper halides possess low volatility under normal plasma temps, requiring damascene electroplating and CMP."
    },
    {
      questionZh: "在雙鑲嵌 (Dual-Damascene) 銅導線製程中，為何必須在低介電絕緣層與銅之間沉積 Ta/TaN 阻障層？",
      questionEn: "In copper dual-damascene interconnects, why must a Ta/TaN barrier layer be deposited between low-k dielectric and copper?",
      optionsZh: ["增加導線導電率","防止銅原子在熱應力與電場下快速擴散至介電層造成漏電擊穿","提升電鍍銅沉積速率","作為化學研磨拋光指示層"],
      optionsEn: ["Increase overall wire conductivity","Prevent fast copper atomic diffusion into dielectric under bias-temperature stress","Boost electroplating deposition rate","Serve as CMP optical end-point indicator"],
      answer: 1,
      explanationZh: "銅在二氧化矽與 low-k 介電材料中擴散係數極高，無阻障層時銅離子會迅速穿透介電層引發短路與可靠度失效。",
      explanationEn: "Copper diffuses rapidly through SiO2 and low-k materials, requiring refractory Ta/TaN liners to block copper ion migration and leakage."
    },
    {
      questionZh: "在 1nm 及次世代金屬互連中，為解決超細銅線電遷移 (EM) 與介面電子散射阻抗暴增，業界積極評估取代銅的候選金屬為？",
      questionEn: "In sub-2nm interconnects, which candidate metals are actively researched to replace copper due to lower electron mean free paths and zero barrier need?",
      optionsZh: ["金 (Au) 與銀 (Ag)","釕 (Ru)、鈷 (Co) 與鉬 (Mo)","鋁 (Al) 與鐵 (Fe)","鉛 (Pb) 與錫 (Sn)"],
      optionsEn: ["Gold (Au) and Silver (Ag)","Ruthenium (Ru), Cobalt (Co), and Molybdenum (Mo)","Aluminum (Al) and Iron (Fe)","Lead (Pb) and Tin (Sn)"],
      answer: 1,
      explanationZh: "釕 (Ru) 與鉬 (Mo) 電子平均自由程短，且不需要高電阻的 TaN 阻障層，在小於 12nm 金屬線寬時電阻率與可靠度反超傳統銅導線。",
      explanationEn: "Ru, Co, and Mo have shorter electron mean free paths and do not require high-resistivity liners, outperforming Cu at <12nm dimensions."
    },
    {
      questionZh: "在先進金屬層間介電質 (IMD) 整合中，多孔性低介電常數 (Porous Low-k / SiCOH) 薄膜在遭遇熱循環時最容易發生的破壞模式為何？",
      questionEn: "In advanced interconnect integration, porous low-k (SiCOH) dielectric stacks subjected to thermal cycling are most susceptible to which mechanical failure mode?",
      optionsZh: ["薄膜自發結晶化變為純金屬導體","介面結合力脆弱 (Gc < 3 J/m^2) 導致低介電層間發生界面剝離 (Delamination) 或龜裂","薄膜密度瞬間增加 10 倍","銅原子完全停止導電"],
      optionsEn: ["Spontaneous crystallization into metallic conductors","Interface delamination and cohesive channeling fracture due to poor adhesion energy (Gc < 3 J/m^2) under thermal shear stress","Instant 10-fold density compaction","Permanent loss of copper electrical conductivity"],
      answer: 1,
      explanationZh: "Low-k 為了降低介電常數引入微孔隙，導致機械楊氏模數與介面結合能 Gc 急遽劣化，在封裝與回焊的熱膨脹失配剪切應力下極易分層剝離。",
      explanationEn: "Porosity introduced into low-k films significantly lowers fracture toughness (Gc) and adhesion, promoting delamination under CTE thermal mismatch stresses."
    }
  ],

  ch11: [
    {
      questionZh: "在 CMOS 跨層流程整合中，製程溫度安排通常嚴格遵循下列何種原則？",
      questionEn: "What thermal rule governs modern CMOS process integration sequence from FEOL to BEOL?",
      optionsZh: ["由前段 FEOL 往後段 BEOL 溫度逐漸升高","前段到後段溫度嚴格遞減 (由 >1000°C 降至 <400°C)","全站點固定維持在 800°C 以上","完全不需受熱預算限制"],
      optionsEn: ["Temperature rises sequentially","Thermal budget strictly decreases from >1000°C to <400°C","Constant 800°C throughout","Unrestricted thermal budget"],
      answer: 1,
      explanationZh: "前段氧化退火需 1000°C 以上；中段矽化物 (>500°C 凝聚) 與後段銅導線/低介電材料 (ULK) 最高只能承受 ~400°C，否則金屬擴散與介電孔洞瓦解。",
      explanationEn: "BEOL copper and ultra-low-k dielectrics degrade above 400°C, imposing a strictly descending thermal budget."
    },
    {
      questionZh: "在現代先進 CMOS 流程跨層熱預算 (Thermal Budget) 梯級管理中，製程允許承受的最高溫度排序為何？",
      questionEn: "In advanced CMOS fabrication thermal budget management, what is the correct hierarchy of allowable maximum temperatures?",
      optionsZh: ["BEOL (後段) > MOL (中段) > FEOL (前段)","FEOL (前段) > MOL (中段) > BEOL (後段)","MOL (中段) > BEOL (後段) > FEOL (前段)","三者均受限於 400°C 以下"],
      optionsEn: ["BEOL > MOL > FEOL","FEOL > MOL > BEOL","MOL > BEOL > FEOL","All three stages are strictly capped below 400°C"],
      answer: 1,
      explanationZh: "前段 FEOL 包含高溫長晶與活化退火 (>1000°C)；中段接觸孔約 500-600°C；後段 BEOL 含有銅金屬與多孔 low-k 介電質，嚴格限制在 400°C 以下。",
      explanationEn: "FEOL permits >1000°C for anneals; MOL is limited to ~550°C; BEOL must remain <400°C to preserve copper liners and fragile low-k polymers."
    },
    {
      questionZh: "自對準接觸孔 (Self-Aligned Contact, SAC) 是利用閘極上方與側壁的何種材質硬遮罩對氧化層的極高蝕刻選擇比？",
      questionEn: "Self-Aligned Contact (SAC) etching relies on high etch selectivity between SiO2 ILD and what protective cap material over the gate?",
      optionsZh: ["單晶矽 (Si)","氮化矽 (Si3N4 / SiN)","純銅金屬 (Cu)","聚苯乙烯 (PS)"],
      optionsEn: ["Monocrystalline Silicon","Silicon Nitride (Si3N4 / SiN)","Metallic Copper","Polystyrene Polymer"],
      answer: 1,
      explanationZh: "閘極上方覆蓋 SiN 冠頂 (Nitride Cap)，接觸孔蝕刻時即便光學對齊略微偏移，氟碳電漿只蝕刻 SiO2 而停在 SiN 上，防止接觸孔與閘極短路。",
      explanationEn: "Si3N4 dielectric hard caps protect gate tops; contact oxide etching stops selectively on SiN, preventing shorts even with overlay error."
    },
    {
      questionZh: "在自對準雙重曝光 (SADP) 與四重曝光 (SAQP) 製程中，最終圖形的關鍵尺寸 (CD) 與間距均勻性主要取決於何種製程工序，而非光學微影的曝光機精度？",
      questionEn: "In Self-Aligned Spacer Pitch Splitting (SADP/SAQP), the final pattern CD uniformity is primarily governed by which process step rather than scanner lithography optics?",
      optionsZh: ["側壁間隙壁薄膜 (Spacer) 的保形沉積 (ALD) 厚度控制","晶圓背面的雷射刻字深淺","化學機械研磨的研磨液攪拌轉速","無塵室人員行走步頻"],
      optionsEn: ["Conformal spacer deposition (ALD) thickness precision along the mandrel sidewall","Wafer backside laser marking depth","CMP slurry agitation speed","Cleanroom operator walking cadence"],
      answer: 0,
      explanationZh: "自對準間隙壁技術利用原子層沉積 (ALD) 極致的厚度精準度 (<0.2nm) 披覆於心軸 (Mandrel) 側壁，隨後回蝕心軸，線寬完全由 ALD 薄膜沉積厚度定義。",
      explanationEn: "Final critical dimension in SADP/SAQP is defined by the conformal atomic layer deposition (ALD) spacer thickness rather than optical lithography limits."
    }
  ],

  ch12: [
    {
      questionZh: "先進 GAA (Gate-All-Around) 奈米片電晶體相較於傳統 FinFET，其最主要的靜電控制優勢為何？",
      questionEn: "What is the primary electrostatic advantage of GAA nanosheets over conventional FinFETs?",
      optionsZh: ["閘極完全 360 度四面包覆通道，徹底抑制短通道效應與次臨界漏電","完全不使用金屬閘極材料","通道長度放寬至微米級","取消源極與汲極摻雜"],
      optionsEn: ["Gate wraps 360 degrees around channel nanosheets, suppressing short-channel effects","Eliminates all metal gate materials","Relaxes channel length to microns","Eliminates source/drain dopants"],
      answer: 0,
      explanationZh: "FinFET 僅能從三面控制鰭片通道，而 GAA 閘極全方位 360 度包覆奈米片，極大化閘極電容與靜電控制力，大幅壓制漏電流。",
      explanationEn: "GAA surrounds the channel on all 4 sides, achieving superior electrostatic gate control over sub-3nm channel leakage."
    },
    {
      questionZh: "在 2nm 及次世代電晶體中，晶圓背面供電網路 (BSPDN, 如 PowerVia) 的最核心系統工程價值是什麼？",
      questionEn: "In sub-2nm nodes, what is the primary architectural benefit of Backside Power Delivery Networks (BSPDN / PowerVia)?",
      optionsZh: ["降低晶圓封裝厚度","將高功耗電源網絡移至背面，大幅降低 IR Drop 壓降並釋放正面信號繞線空間","增加電晶體閘極寬度","完全消除次臨界漏電流"],
      optionsEn: ["Decrease overall wafer packaging profile","Relocate power mesh to the backside, drastically reducing IR drop and unlocking frontside routing tracks","Increase physical gate channel width","Completely eliminate subthreshold leakage"],
      answer: 1,
      explanationZh: "傳統正面同時走電源與信號會造成金屬層擁擠與巨大 IR Drop 壓降；BSPDN 透過背面埋入導線直接供電，信號繞線自由度提高 20% 以上。",
      explanationEn: "Separating power delivery to the backside removes resistive voltage drops (IR drop) and frees dense metal tracks for logic routing."
    },
    {
      questionZh: "在全環繞閘極 (GAA / Nanosheet) 電晶體中，垂直堆疊多層奈米片的最主要工程目的為何？",
      questionEn: "In Gate-All-Around (GAA) nanosheet transistors, what is the primary benefit of vertically stacking multiple nanosheet ribbons?",
      optionsZh: ["減少晶圓加工道數","在相同晶片覆蓋面積 (Footprint) 下大幅倍增有效通道寬度 (Weff)，提供更強驅動電流","增加閘極介電層厚度","完全消除熱膨脹"],
      optionsEn: ["Reduce processing step count","Multiply effective channel width (Weff) per footprint area, driving higher transistor drive currents","Thicken gate oxide dielectric","Completely eliminate thermal expansion"],
      answer: 1,
      explanationZh: "垂直堆疊 3~4 層奈米片使總通道周長與有效寬度 Weff 翻倍，打破平面與 FinFET 幾何面積限制，在極小單元內輸出充足電流。",
      explanationEn: "Stacking 3-4 sheets multiplies effective channel width Weff within the standard cell footprint, delivering higher drive current per unit area."
    },
    {
      questionZh: "在 3nm/2nm 環繞式閘極 (GAA / Nanosheet) 電晶體製程中，於最底層奈米片下方導入「底部介電質隔離 (Bottom Dielectric Isolation, BDI)」的主要電性目的為何？",
      questionEn: "In advanced 3nm/2nm Gate-All-Around (GAA Nanosheet) architectures, introducing Bottom Dielectric Isolation (BDI) serves what critical electrical purpose?",
      optionsZh: ["增加晶圓機械重量","徹底阻斷源極與汲極穿過矽基底深層的次表面寄生漏電流 (Sub-fin Leakage)","將電晶體運作電壓提升至 50V","取代所有的前端金屬導線"],
      optionsEn: ["Increasing wafer mechanical mass","Completely isolating parasitic punch-through and sub-fin leakage currents from source/drain into the underlying substrate","Boosting transistor operating voltage to 50V","Replacing all front-end copper interconnect traces"],
      answer: 1,
      explanationZh: "在全環繞閘極中，源極/汲極磊晶會深入基底；底部介電隔離 (BDI, 如 SiN/SiC) 嵌在通道下方，切斷傳統 FinFET 下方未受閘極控制區域的寄生穿透漏電路徑。",
      explanationEn: "BDI physically terminates the bottom of the source/drain junctions, eliminating parasitic sub-channel punch-through leakage currents into the bulk silicon substrate."
    }
  ],

  ch13: [
    {
      questionZh: "3D NAND 快閃記憶體相較於傳統 2D 平面 NAND，能夠突破微縮極限達到數百層垂直堆疊的核心架構轉向為何？",
      questionEn: "What key architectural transition enabled 3D NAND to scale vertically beyond planar limits?",
      optionsZh: ["由導電浮閘轉向電荷陷阱 (Charge Trap, CTF) 絕緣層與垂直通道通孔","取消位元線與字元線","全面採用機械微機電開關","改用玻璃基板"],
      optionsEn: ["Transition from floating gate to Charge Trap (CTF) and vertical channel holes","Eliminating bitlines entirely","Using MEMS switches","Glass substrates"],
      answer: 0,
      explanationZh: "3D NAND 捨棄相鄰單元電容耦合嚴重的導電浮閘，改用氮化矽絕緣電荷陷阱 (CTF) 膜與高深寬比穿透垂直孔，實現垂直多層堆疊。",
      explanationEn: "3D NAND adopted insulating charge-trap silicon nitride layers and high-aspect-ratio vertical channel holes."
    },
    {
      questionZh: "在 3D NAND 快閃記憶體製造中，垂直通道孔貫穿超過 200 層字元線 (Wordline) 堆疊的核心極限技術為何？",
      questionEn: "In 3D NAND fabrication, what is the critical enabling technology for etching vertical channel holes through 200+ stacked layers?",
      optionsZh: ["濕式化學回蝕","極低溫高深寬比電漿蝕刻 (Cryogenic High Aspect Ratio Etch, Cryo-HAR)","機械雷射鑽孔","超音波震盪銑削"],
      optionsEn: ["Wet chemical isotropic etch","Cryogenic High-Aspect-Ratio (Cryo-HAR) plasma etching at -60°C to -80°C","Mechanical laser micro-drilling","Ultrasonic rotational milling"],
      answer: 1,
      explanationZh: "3D NAND 垂直孔深寬比超過 80:1，常溫下側壁會過度腐蝕；採用極低溫 (-60°C) 電漿蝕刻可凍結側壁反應，維持垂直直筒輪廓。",
      explanationEn: "Cryogenic HAR etching (-60°C to -80°C) freezes lateral sidewall reactions, enabling perfectly vertical profiles at aspect ratios exceeding 80:1."
    },
    {
      questionZh: "在 HBM (High Bandwidth Memory) 3D 堆疊記憶體中，垂直穿透矽晶圓提供數千條高速並列傳輸通道的核心結構為？",
      questionEn: "In High Bandwidth Memory (HBM) 3D die stacks, what microscopic vertical through-silicon structures provide thousands of high-speed interconnects?",
      optionsZh: ["打線金屬線 (Gold Wire)","矽穿孔 (Through-Silicon Via, TSV)","表面外延導線","機械同軸電纜"],
      optionsEn: ["Bonding Wires","Through-Silicon Vias (TSV)","Surface Epitaxial Rails","Coaxial Micro-Cables"],
      answer: 1,
      explanationZh: "TSV 是貫穿矽晶粒內部的微型垂直導電柱，配合微凸塊或混合鍵合，提供超過 1024-bit 甚至 2048-bit 超寬並列頻寬。",
      explanationEn: "TSVs are copper-filled vertical vias etched through thinned silicon dies, enabling high-density parallel buses (>1024-bit) with minimal latency."
    },
    {
      questionZh: "在 200 層以上 3D NAND 快閃記憶體的超深通道孔 (HARC Etch, Aspect Ratio > 50:1) 蝕刻中，離子角度分佈散射最容易在垂直孔洞內部造成何種異常輪廓？",
      questionEn: "In >200-layer 3D NAND fabrication, etching High-Aspect-Ratio Channel holes (HARC, AR > 50:1) with ion angular scattering frequently produces which profile anomaly?",
      optionsZh: ["孔洞完全自動填平","腰身鼓脹 (Bowing) 與底部孔徑過度微縮 (Bottom Tapering / Necking)","通道孔在深處彎折 90 度橫向生長","氧化矽層自發轉化為金屬鎢"],
      optionsEn: ["Spontaneous complete hole refilling","Sidewall bowing (barrel deformation) and severe bottom CD pinch-off/tapering","Channel holes executing 90-degree lateral right turns","Silicon oxide layers transforming into metallic tungsten"],
      answer: 1,
      explanationZh: "高深寬比蝕刻中，帶電離子偏離垂直角度撞擊上部孔壁發生鏡面反射，引發上中部孔壁劇烈蝕刻擴張 (Bowing)；同時孔底因離子與自由基通量衰減而微縮變小。",
      explanationEn: "Scattering of glancing ions off mask sidewalls widens the upper channel (bowing), while Knudsen radical diffusion starvation narrows bottom critical dimensions."
    }
  ],

  ch14: [
    {
      questionZh: "在 90nm 節點後，傳統 Dennard 微縮定律宣告崩潰，其最根本的物理限制為何？",
      questionEn: "Why did classical Dennard scaling break down below the 90nm node?",
      optionsZh: ["光罩無法製造","閘極穿隧漏電與次臨界漏電劇增導致靜態功耗密度攀升 (Leakage Wall)","晶圓尺寸過小","銅導線電阻降為零"],
      optionsEn: ["Reticles impossible to build","Quantum tunneling and subthreshold leakage caused power density runaway","Wafers too small","Zero copper resistance"],
      answer: 1,
      explanationZh: "當閘極氧化層薄至原子尺度引發量子穿隧，且工作電壓無法等比例縮減（受次臨界擺幅限制），靜態漏電大幅增加造成「功耗牆」。",
      explanationEn: "Gate oxide tunneling and inability to scale threshold voltage created the thermal power dissipation wall."
    },
    {
      questionZh: "在先進節點微縮放緩後，業界從傳統尺寸微縮延伸發展出的 STCO 全名與意涵是什麼？",
      questionEn: "As classical geometric scaling slows, what does STCO stand for in modern semiconductor roadmap planning?",
      optionsZh: ["Silicon Thermal Control Operation (矽熱控制運算)","System-Technology Co-Optimization (系統技術協同最佳化)","Single Transistor Current Output (單電晶體電流輸出)","Standard Testing Compliance Organization (標準測試認證組織)"],
      optionsEn: ["Silicon Thermal Control Operation","System-Technology Co-Optimization (STCO)","Single Transistor Current Output","Standard Testing Compliance Organization"],
      answer: 1,
      explanationZh: "STCO 是在小晶片 (Chiplet) 與 3D 封裝架構下，從工作負載系統架構層面反向定義製程技術組合，達成效能、功耗與成本最佳化。",
      explanationEn: "STCO co-optimizes the entire system partition (chiplets, 3D stacking, cooling) with underlying process technologies to bypass planar scaling walls."
    },
    {
      questionZh: "2005 年左右 Dennard 微縮定律終結的核心物理瓶頸是什麼？",
      questionEn: "Around 2005, what physical breakdown brought an end to classic Dennard MOSFET scaling?",
      optionsZh: ["全球矽礦砂資源耗盡","次臨界漏電流無法隨尺寸等比例縮減，導致工作電壓 (Vdd) 無法再大幅降低，引發「功耗牆 (Power Wall)」","晶圓切割機精度不足","光學微影波長無法小於 1 微米"],
      optionsEn: ["Global silicon sand exhaustion","Subthreshold leakage stopped scaling, stalling supply voltage (Vdd) reductions and hitting the \"Power Wall\"","Dicing saw mechanical inaccuracies","Lithography wavelengths hit a 1 µm barrier"],
      answer: 1,
      explanationZh: "室溫下波茲曼次臨界擺幅限制在 60mV/dec，門檻電壓 Vth 無法無限降低，Vdd 停滯在 ~0.7V，晶片動態與靜態散熱功率飆升撞上功耗牆。",
      explanationEn: "Boltzmann statistics fixed subthreshold swing at ~60 mV/dec, preventing further Vdd scaling and causing heat dissipation to hit the power wall."
    },
    {
      questionZh: "在 2nm 及更先進邏輯節點引入的「晶背供電網路 (Backside Power Delivery Network, BSPDN / PowerVia)」，其核心結構特徵與系統優勢為何？",
      questionEn: "Backside Power Delivery Network (BSPDN / PowerVia) introduced at the 2nm logic node features which structural architecture and system benefit?",
      optionsZh: ["將所有電晶體全部移到晶圓背面製造","將粗重的厚金屬供電網移至晶圓背面，透過微奈米矽穿孔 (Nano-TSV) 直接供電，徹底消除正面的電源 IR Drop 並釋放正面訊號佈線空間","取消所有晶圓背面研磨薄化程序","使晶片不再需要任何電源接地線"],
      optionsEn: ["Fabricating all active transistors on the wafer backside","Relocating power delivery grids to the wafer backside, feeding transistors via Nano-TSVs to drastically cut IR drop and unclutter frontside signal routing","Eliminating wafer backside thinning processes","Operating chips without ground reference rails"],
      answer: 1,
      explanationZh: "傳統正面供電需穿越 15~20 層金屬層，電壓降 (IR Drop) 嚴重且搶佔訊號繞線面積；BSPDN 薄化晶圓後直接由背面供電，阻抗大幅降低 30% 以上。",
      explanationEn: "BSPDN routes power rails on the backside of thinned wafers directly to transistors via sub-micron TSVs, slashing resistive IR drops and freeing top metallization layers."
    }
  ],

  ch15: [
    {
      questionZh: "光學關鍵尺寸量測 (OCD / Scatterometry) 相較於傳統 CD-SEM，在 3nm 世代最顯著的量測優勢為何？",
      questionEn: "What key advantage does Optical Critical Dimension (OCD) offer over CD-SEM at 3nm?",
      optionsZh: ["空間解析度達到原子級","能無損、高速且同時解析深層 3D 結構輪廓（側壁傾角、底層線寬、高深寬比）","完全不需要光學理論模型反演","能夠直接拍攝缺陷照片"],
      optionsEn: ["Atomic spatial resolution","Non-destructive, high-speed 3D profile extraction (SWA, depth, bottom CD)","Requires no rigorous optical models","Direct defect photography"],
      answer: 1,
      explanationZh: "CD-SEM 僅能拍攝俯視二維尺寸且電子束易收縮光阻；OCD 透過寬光譜偏振散射與嚴格電磁波理論 (RCWA) 擬合，可精確測量完整 3D 剖面。",
      explanationEn: "OCD non-destructively extracts vertical 3D sidewall angles and depth via rigorous coupled-wave analysis (RCWA)."
    },
    {
      questionZh: "光學薄膜測厚儀 (Ellipsometer, 橢偏儀) 是透過分析入射光束在晶圓表面反射後的何種狀態變化來推算厚度？",
      questionEn: "Spectroscopic Ellipsometry determines thin-film thickness and refractive index by measuring what property change in reflected light?",
      optionsZh: ["光的波長頻移 (Doppler Shift)","偏振光振幅比 (Ψ) 與相位差 (Δ) 的變化","光通量強度的單純衰減","反射光的同位素放射性"],
      optionsEn: ["Doppler wavelength frequency shift","Changes in polarization amplitude ratio (Psi) and phase difference (Delta)","Simple linear attenuation of light intensity","Isotopic radioactivity of reflected photons"],
      answer: 1,
      explanationZh: "橢偏儀量測線偏振光經薄膜反射後變為橢圓偏振光的振幅比 Ψ 與相位延遲 Δ，透過菲涅耳方程擬合奈米甚至次奈米級薄膜厚度。",
      explanationEn: "Ellipsometry measures the change in polarization state (Psi and Delta) upon reflection, fitting Fresnel equations to extract thickness and index."
    },
    {
      questionZh: "在先進封裝無損檢測中，能穿透矽基底與樹脂檢測 TSV 微空洞與介面脫層 (Delamination) 的聲學檢測技術為？",
      questionEn: "In non-destructive advanced packaging inspection, which acoustic technique penetrates silicon and mold to detect internal voids and delamination?",
      optionsZh: ["超音波掃描顯微鏡 (Scanning Acoustic Microscopy, C-SAM)","光學干涉儀","雷達衛星成像","熱像儀"],
      optionsEn: ["Scanning Acoustic Microscopy (C-SAM)","Optical Profilometer","Radar Interferometry","Infrared Thermography"],
      answer: 0,
      explanationZh: "C-SAM 利用高頻超音波 (20~300 MHz) 在不同材料聲阻抗 (Acoustic Impedance) 介面產生反射波，對空氣隙、空洞與脫層極度敏感。",
      explanationEn: "C-SAM uses high-frequency ultrasonic waves reflected at acoustic impedance mismatches, achieving high sensitivity to air gaps and voids."
    },
    {
      questionZh: "在以關鍵尺寸掃描電子顯微鏡 (CD-SEM) 量測先進光阻圖形時，電子束長時間照射通常會引發何種量測偽影 (Metrology Artifact)？",
      questionEn: "During critical dimension CD-SEM metrology of advanced photoresist patterns, prolonged electron-beam exposure commonly induces which measurement artifact?",
      optionsZh: ["光阻完全蒸發且晶圓融化","光阻收縮 (Resist Shrinkage / Slimming) 導致測得尺寸隨照射時間虛假變小","電子束使光阻永久膨脹變粗 5 倍","光阻顏色由透明變為純金色"],
      optionsEn: ["Total resist vaporization and substrate meltdown","Resist shrinkage (slimming) causing measured critical dimensions to artificially decrease with e-beam scan dwell time","Electron exposure expanding resist CD by 500%","Resist color transforming into shiny gold"],
      answer: 1,
      explanationZh: "高能電子束照射光阻會打斷碳氫主鏈或引發局部脫保護揮發，造成光阻材料體積收縮 (Resist Slimming)，因此量測時需校正單點電子束停留時間 (Dwell Time)。",
      explanationEn: "E-beam irradiation breaks polymer backbones and desorbs volatile species, causing physical volume contraction (slimming) of the resist line."
    }
  ],

  ch16: [
    {
      questionZh: "雙束聚焦離子束 (Dual-Beam FIB-SEM) 在晶圓廠良率失效分析 (FA) 中的最核心任務為何？",
      questionEn: "What is the primary role of Dual-Beam FIB-SEM in fab Failure Analysis?",
      optionsZh: ["進行全晶圓高速光學掃描","對特定奈米缺陷定位處進行精密離子切片並製備 <50nm TEM 超薄試片","執行離子佈植摻雜","測量晶圓表面反射率"],
      optionsEn: ["Full-wafer optical scanning","Site-specific nanoscale cross-sectioning and TEM lamella sample prep","Production ion doping","Reflectance metrology"],
      answer: 1,
      explanationZh: "FIB 利用鎵 (Ga+) 或氙 (Xe+) 離子束精確切削目標奈米缺陷點，製備出數十奈米厚度的超薄試片，供穿透式電顯 (TEM) 觀察原子排差。",
      explanationEn: "FIB precisely mills target sub-micron failure sites into thin lamellae (<50nm) for atomic-scale TEM/STEM imaging."
    },
    {
      questionZh: "在大型晶片 (Die Area > 400 mm²) 良率預測中，產線實務上為何偏好採用負二項良率模型 (Negative Binomial Model)？",
      questionEn: "For large die areas (>400 mm²), why do fab yield engineers prefer the Negative Binomial model over the Poisson model?",
      optionsZh: ["計算公式較簡單","Poisson 假設缺陷完全隨機散布，忽略了實際產線中嚴重的「缺陷群聚效應 (Defect Clustering)」","負二項模型預測良率永遠比實際高","不需要任何歷史良率參數"],
      optionsEn: ["Formulas are simpler to solve","Poisson assumes pure random distribution, failing to capture severe defect clustering in actual fabs","Negative binomial guarantees higher yields","No historical calibration parameters required"],
      answer: 1,
      explanationZh: "晶圓缺陷往往聚集在特定區域（群聚效應）；Poisson 模型未考慮群聚會過度悲觀估算大晶片良率，負二項模型引入群聚參數 α，預測更精確。",
      explanationEn: "Real defect mechanisms cause clustering; Poisson severely underestimates large die yields, whereas Negative Binomial models cluster factor alpha."
    },
    {
      questionZh: "聚焦離子束與電子顯微鏡雙束系統 (Dual-Beam FIB-SEM) 在晶片失效分析 (FA) 中的主要功能為何？",
      questionEn: "In semiconductor failure analysis (FA), what is the primary capability of a Dual-Beam FIB-SEM system?",
      optionsZh: ["大量生產晶圓","以聚焦離子束精確奈米級微割切片，並同步以電子顯微鏡進行高解析斷面成像","測量晶圓重量","清洗晶圓表面"],
      optionsEn: ["High-volume wafer fab manufacturing","Precise site-specific nanometer FIB cross-sectioning combined with simultaneous high-resolution SEM imaging","Precision wafer mass measurement","Substrate chemical decontamination"],
      answer: 1,
      explanationZh: "FIB-SEM 整合鎵/氙離子槍進行定點物理微切割，SEM 電子束同時對切面做百萬倍放大顯微觀察，是定位短路與斷線的終極利器。",
      explanationEn: "Dual-beam FIB-SEM pairs an ion beam for precision cross-sectional milling with an SEM for real-time nanometer imaging of failure sites."
    },
    {
      questionZh: "利用全反射 X 光螢光光譜儀 (TXRF) 檢測晶圓表面重金屬污染時，之所以能達到次 ppb (<1e9 atoms/cm^2) 的超高靈敏度，關鍵光學物理條件為何？",
      questionEn: "In Total Reflection X-Ray Fluorescence (TXRF) wafer surface metal metrology, achieving sub-ppb (<1e9 atoms/cm^2) sensitivity relies on which optical condition?",
      optionsZh: ["X 光入射角小於矽晶圓的全反射臨界角 (Critical Angle, ~0.18°)，使 X 光全反射而不穿透基底深處，最大化表面訊噪比","將 X 光功率放大至 100 萬瓦","在晶圓表面塗抹螢光染劑","使用肉眼直接觀察繞射圖樣"],
      optionsEn: ["Incident X-ray beam angle is held strictly below the total external reflection critical angle (~0.18°), preventing penetration into bulk silicon and maximizing surface SNR","Increasing X-ray power to 1 Megawatt","Applying fluorescent liquid dye onto the wafer","Observing diffraction rings with the naked eye"],
      answer: 0,
      explanationZh: "當 X 光以掠射角 (<0.2度) 入射時，X 光幾乎全反射，基底矽的背景散射訊號被強烈壓制，僅激發晶圓最表面 3-5nm 的金屬雜質原子螢光。",
      explanationEn: "Grazing incidence below the critical angle produces total external reflection, virtually eliminating bulk silicon background scatter while selectively exciting surface impurities."
    }
  ],

  ch17: [
    {
      questionZh: "在 SPC 統計管制圖中，若管制點連續 9 點落在中心線 (CL) 的同一側，其代表的統計工程意義為何？",
      questionEn: "In SPC control charts, what does 9 consecutive points on one side of the center line indicate?",
      optionsZh: ["製程完全處於統計控制下","製程中心平均值已發生非隨機的異常漂移 (Process Shift)","量測儀器完全故障","樣本數不足需刪除數據"],
      optionsEn: ["Process perfectly in control","A non-random process mean shift has occurred","Gauge completely broken","Insufficient sample size"],
      answer: 1,
      explanationZh: "常態隨機分佈下連續 9 點落在同一側的機率低於 0.2%，屬於經典特殊原因變異（WECO 規則 2），代表製程中心產生偏移，須觸發 OCAP。",
      explanationEn: "Probability of 9 consecutive points on one side is <0.2%, signaling a special cause process shift under WECO Rule 2."
    },
    {
      questionZh: "在 SPC 統計製程管制中，當製程能力指數 Cpk 等於 1.33 時，對應的雙側超出規格邊界缺陷率約為多少？",
      questionEn: "In Statistical Process Control (SPC), a process capability index Cpk of 1.33 corresponds to approximately what double-sided defect rate?",
      optionsZh: ["約 2700 PPM (3-sigma)","約 63 PPM (4-sigma)","約 0.002 PPM (6-sigma)","約 10% (1-sigma)"],
      optionsEn: ["~2,700 PPM (3-sigma)","~63 PPM (4-sigma)","~0.002 PPM (6-sigma)","~10% (1-sigma)"],
      answer: 1,
      explanationZh: "Cpk = 1.33 代表製程分佈中心至最近規格界線剛好為 4 倍標準差 (4-sigma)，在常態分佈下對應的不良率約為 63 PPM。",
      explanationEn: "Cpk = 1.33 corresponds to a 4-sigma margin to specification limits, which yields an expected defect rate of ~63 PPM in normal distributions."
    },
    {
      questionZh: "SPC 統計製程管制中，當量測點出現連續 9 點落在中心線同一側 (Nelson Rule 2) 時，通常代表產線發生了什麼現象？",
      questionEn: "In Statistical Process Control (SPC), what process deviation is signaled when 9 consecutive points fall on one side of the center line (Nelson Rule 2)?",
      optionsZh: ["機台零件瞬間斷裂","製程平均值發生了非隨機的系統性偏移 (Process Mean Shift / Drift)","量測儀器電量耗盡","晶圓數量不足"],
      optionsEn: ["Instantaneous catastrophic tooling failure","A non-random systematic process mean shift or baseline drift","Metrology tool battery depletion","Wafer lot count shortage"],
      answer: 1,
      explanationZh: "連續 9 點偏向單側在純隨機分佈下的機率為 (1/2)^9 = 1/512，屬於極小機率事件，代表腔體沈積速率漂移或化學液消耗等系統性偏漂。",
      explanationEn: "The probability of 9 consecutive points on one side is (0.5)^9 = 0.002, indicating a statistically significant process mean shift."
    },
    {
      questionZh: "在晶圓廠多變量統計製程管制 (Multivariate SPC) 中，當多項製程參數個別看都在單變量管制界限內，但聯合分佈已嚴重偏移時，應採用何種指標檢出？",
      questionEn: "In semiconductor multivariate statistical process control (MSPC), when multiple parameters are within individual univariate limits yet their joint correlation drifts, which metric detects the violation?",
      optionsZh: ["純計數的 Defect Count","霍特林 T-平方統計量 (Hotelling’s T^2 Metric)","晶圓外觀顏色明度對比","無塵室當日累積用電量"],
      optionsEn: ["Raw defect count","Hotelling’s T-squared (T^2) statistic accounting for covariance matrix Mahalanobis distance","Wafer color visual brightness contrast","Cleanroom daily power consumption tally"],
      answer: 1,
      explanationZh: "多變量常態分佈需考慮參數間的共變異數矩陣 (Covariance Matrix)；霍特林 T^2 透過馬氏距離 (Mahalanobis Distance) 能靈敏捕捉單變量看似正常但關聯已崩潰的異常。",
      explanationEn: "Hotelling’s T^2 maps multivariate observations through the inverse covariance matrix, spotting anomalous deviations along correlated multidimensional trajectories."
    }
  ],

  ch18: [
    {
      questionZh: "在半導體品質 8D 問題解決流程中，D3（緊急防堵圍堵行動）與 D5（根本原因與失效機制驗證）的核心區別為？",
      questionEn: "In 8D methodology, what is the fundamental difference between D3 (Containment) and D5 (Root Cause Validation)?",
      optionsZh: ["D3 是徹底更換零件，D5 是通報客戶","D3 旨在第一時間止血隔離受影響批次防止流出，D5 是在實驗室驗證真正物理根因","兩者完全相同","D3 僅適用於軟體錯誤"],
      optionsEn: ["D3 replaces parts, D5 notifies customer","D3 isolates and stops the bleeding immediately; D5 experimentally proves the root cause","Both are identical","D3 only applies to software"],
      answer: 1,
      explanationZh: "D3 是立即止血措施（如 Lot Hold、暫停投片），防止不良晶圓繼續流出；D5 則是運用實驗驗證失效機理，不可將暫時止血誤當根本修復。",
      explanationEn: "D3 contains defect propagation immediately (lot holds); D5 identifies and proves the physical failure mechanism."
    },
    {
      questionZh: "晶圓廠遭遇良率異常啟動 OCAP 應變時，第一步採取的「章魚防堵法 (Octopus Containment)」其核心動作為何？",
      questionEn: "When an excursion triggers an Out-of-Control Action Plan (OCAP), what is the key action of the \"Octopus Containment\" protocol?",
      optionsZh: ["立即修改生產 Recipe","全面清查並 Hold 住該問題機台當前批次、前後各數批關聯在製品與同一製程路徑晶圓","直接將整批晶圓報廢","更換所有機台操作工程師"],
      optionsEn: ["Immediately alter production recipe","Trace and quarantine the suspect lot, preceding/succeeding 5 lots on the tool, and common-path WIP","Directly scrap all active wafers","Replace all fab shift operators"],
      answer: 1,
      explanationZh: "章魚防堵法如章魚觸角般，快速鎖定並隔離可能受害的「同機台、同配方、同腔體」前後關聯批次，防止不良晶圓流入下游封裝。",
      explanationEn: "The Octopus protocol radiates like tentacles to freeze all wafers on the suspect tool, adjacent lots, and same recipe chambers to stop spillover."
    },
    {
      questionZh: "在 8D 品質異常處置架構中，緊急防堵對策 (ICA, D3) 與永久改善對策 (PCA, D5) 的本質差異為何？",
      questionEn: "In the 8D root-cause problem solving methodology, what is the fundamental difference between ICA (D3) and PCA (D5)?",
      optionsZh: ["ICA 是暫時阻斷不良品擴散流入下游客戶；PCA 是從物理源頭徹底消除根本原因","ICA 耗費成本較高","PCA 由作業員執行，ICA 由廠長執行","兩者完全相同"],
      optionsEn: ["ICA acts as a temporary containment to isolate defect leakage; PCA permanently eliminates the underlying physical root cause","ICA has higher CAPEX costs","PCA is executed by operators; ICA by fab directors","Both actions are functionally identical"],
      answer: 0,
      explanationZh: "D3 緊急防堵是止血措施（隔離、Hold 機、篩檢）；D5 永久對策是修正根本原因（更換零件、修改 Recipe、硬體防呆互鎖）。",
      explanationEn: "ICA contains the immediate bleeding to shield customers; PCA targets the physical root cause validated in D4 to eliminate recurrence."
    },
    {
      questionZh: "在晶圓驗收測試 (WAT) 劃線區結構中，若發現相鄰兩條平行金屬走線之間的漏電流 (Leakage Current) 超標數個數量級，OCAP 處置樹優先排查的根本原因應為何？",
      questionEn: "In Wafer Acceptance Testing (WAT) scribe-line test keys, if leakage current between adjacent parallel metal lines exceeds limits by orders of magnitude, which root cause takes highest OCAP priority?",
      optionsZh: ["金屬沉積厚度太薄","CMP 研磨不足產生殘留金屬微絲橋接 (Cu Residual / Under-polish) 或光阻顯影不良 (Scumming)","離子佈植退火溫度太高","晶圓封裝膠體老化"],
      optionsEn: ["Metal deposition thickness being excessively thin","CMP under-polishing leaving residual copper micro-bridges or lithographic scumming between lines","Implant anneal temperature being slightly excessive","Packaging molding compound degradation"],
      answer: 1,
      explanationZh: "平行梳狀電極 (Comb-Comb Structure) 漏電劇增通常源自金屬層未拋淨殘留 (Metal Bridging) 或微影光阻殘留 (Scumming)，屬典型物理短路或微漏電通道。",
      explanationEn: "Comb-comb test leakage spikes signify conductive residual bridges between adjacent metal fingers, typical of CMP under-polish or lithography scum defects."
    }
  ],

  ch19: [
    {
      questionZh: "在晶圓針測 (CP) 與 WAT 電性測試中，為了消除測試機台引線與探針本身的串聯電阻誤差，必須採用何種量測技術？",
      questionEn: "What measurement scheme eliminates probe and wire resistance errors in wafer CP and WAT testing?",
      optionsZh: ["雙線簡易迴路法","四線 Kelvin 量測架構 (分開電流施加 Force 與電壓感測 Sense)","無接觸微波探測法","光學熱成像法"],
      optionsEn: ["2-wire standard loop","4-wire Kelvin sensing (separating Force current and Sense voltage leads)","Contactless microwave probe","Optical thermal imaging"],
      answer: 1,
      explanationZh: "四線 Kelvin 架構將電流源回路 (Force) 與電壓計回路 (Sense) 分開，由於高阻抗電壓計幾乎無電流通過，完全消除了線路與接觸電阻壓降誤差。",
      explanationEn: "4-wire Kelvin sensing isolates current carrying Force paths from Sense leads, eliminating line IR drop."
    },
    {
      questionZh: "在晶圓允收測試 (WAT) 中，量測毫歐姆級 (mΩ) 極微小金屬接觸電阻時，為消除探針接觸阻抗，必須採用何種量測技術？",
      questionEn: "In Wafer Acceptance Testing (WAT), what technique is required to measure milliohm-level contact resistance free of probe parasitic resistance?",
      optionsZh: ["傳統兩線式萬用表量測","四線式凱爾文電阻量測法 (4-Wire Kelvin Method)","高壓交流電容式量測","高頻射頻網路分析儀"],
      optionsEn: ["Standard two-wire multimeter measurement","4-Wire Kelvin Sensing Method (Force Current, Sense Voltage)","High-voltage AC capacitive sensing","High-frequency RF network analyzer"],
      answer: 1,
      explanationZh: "凱爾文四線法將「激勵電流迴路 (Force)」與「電壓量測迴路 (Sense)」完全分離，量測電壓表的輸入阻抗極高使電流近乎為零，徹底消除探針接觸電阻。",
      explanationEn: "Kelvin sensing separates current force and voltage sense pairs; high voltmeter impedance prevents current in sense leads, eliminating probe resistance."
    },
    {
      questionZh: "在晶圓針測 (CP) 與 WAT 測試中，探針扎入銲墊留下的接觸痕跡被稱為？",
      questionEn: "In wafer circuit probing (CP) and WAT, what is the microscopic physical indentation left on the pad by the probe needle called?",
      optionsZh: ["熱痕 (Heat Mark)","針痕 (Probe Mark)","氣流紋 (Air Streak)","光斑 (Spot)"],
      optionsEn: ["Thermal Heat Mark","Probe Mark","Air Flow Streak","Optical Spot"],
      answer: 1,
      explanationZh: "探針接觸需施加適度超下壓 (Overdrive) 刺破鋁或金屬氧化層以確保電性導通，留下的壓痕稱為 Probe Mark，需嚴格檢測其大小與居中度。",
      explanationEn: "Probes require scrub overdrive to break native oxide, leaving a microscopic probe mark that must be inspected for area and centering."
    },
    {
      questionZh: "在晶圓針測 (Circuit Probing / CP) 測試高速先進處理器晶片時，相較於傳統懸臂式探針 (Cantilever)，垂直式 MEMS 探針卡的核心技術優勢為何？",
      questionEn: "In Circuit Probing (CP) wafer sorting of advanced high-speed processors, what is the core advantage of vertical MEMS probe cards over legacy cantilever probes?",
      optionsZh: ["MEMS 探針完全不需要任何電力驅動","超短針長具備極低寄生電感 (<0.5nH)、超高針數密度 (>50,000 pins) 且探針垂直下壓對鋁/銅墊破壞極小","探針壽命永久不壞","探針可直接焊接在晶圓表面"],
      optionsEn: ["MEMS probes require zero electrical excitation","Extremely short pin lengths minimize parasitic inductance (<0.5nH), support ultra-high pin counts (>50,000 pins), and minimize pad scrub damage","MEMS probes exhibit infinite mechanical fatigue life","Probes are permanently soldered directly to the wafer"],
      answer: 1,
      explanationZh: "先進 SoC 具備數萬個微間距焊墊且工作頻率極高；垂直 MEMS 探針以微影與電鍍成形，訊號迴路極短、寄生電容電感極低，且垂直壓縮不會刮傷敏感的 Low-k 墊層結構。",
      explanationEn: "Vertical MEMS probe cards feature uniform spring constant, high density, and ultra-short signal paths that reduce parasitic inductance for multi-GHz testing without pad cratering."
    }
  ],

  ch20: [
    {
      questionZh: "在高速晶片封裝中，覆晶 (Flip-Chip) 凸塊技術取代傳統金屬打線 (Wire-Bonding) 最根本的電氣優勢為何？",
      questionEn: "What is the primary electrical advantage of Flip-Chip bumping over wire-bonding in high-speed chips?",
      optionsZh: ["大幅縮短互連路徑，顯著降低寄生電感 (L) 與高頻信號損耗","完全不需要底部填膠 (Underfill)","可降低載板佈線層數要求","封裝外殼硬度增加"],
      optionsEn: ["Shortens interconnect path, drastically cutting parasitic inductance (L) and signal loss","Eliminates underfill entirely","Reduces substrate layers","Hardens package mold"],
      answer: 0,
      explanationZh: "打線金線長度可達數毫米，帶來數 nH 寄生電感；覆晶凸塊高度僅數十微米，互連路徑縮短 90% 以上，大幅改善供電噪訊與高頻訊號完整性。",
      explanationEn: "Wire bonds add several nH of parasitic inductance; micro-bumps reduce loop inductance by >90% for high-speed signals."
    },
    {
      questionZh: "覆晶封裝 (Flip-Chip) 相較於傳統打線封裝 (Wire Bonding)，在高速運算晶片中最關鍵的電性效能優勢為何？",
      questionEn: "Compared to traditional wire bonding, what is the most critical electrical performance advantage of Flip-Chip packaging for HPC chips?",
      optionsZh: ["封裝體重量更輕","大幅縮短晶粒與基板間的互連長度，將寄生電感降至最小，支援數十 GHz 高頻信號與大電流供電","不需要使用環氧樹脂封膠","可在常溫下直接手動組裝"],
      optionsEn: ["Lighter overall package mass","Drastically shortens interconnect length, slashing parasitic inductance to support >50 GHz signals and high transient current","Eliminates need for epoxy underfill","Can be manually assembled at room temp"],
      answer: 1,
      explanationZh: "打線的金屬線具有數個 nH 的寄生電感，限制了信號頻寬並造成供電震盪；覆晶凸塊高度僅數十微米，電感降至 0.1nH 以下。",
      explanationEn: "Bond wires introduce several nH of parasitic inductance; flip-chip micro-bumps shorten the path to <50um, slashing inductance below 0.1nH."
    },
    {
      questionZh: "晶圓級晶粒尺寸封裝 (WLCSP / Fan-In) 相較於傳統打線封裝的最顯著封裝外觀優勢為何？",
      questionEn: "What is the chief dimensional packaging advantage of Fan-In Wafer Level Chip Scale Packaging (WLCSP) over leadframe wire bonding?",
      optionsZh: ["封裝體積與裸晶 (Bare Die) 完全相同，達成 1:1 極致小巧","可以在高溫 500°C 下運作","不需要任何錫球","重量比裸晶重十倍"],
      optionsEn: ["Package footprint is identical to the bare silicon die (1:1 ratio), achieving maximum miniaturization","Capable of sustained operation at 500°C","Eliminates all solder bumps","Ten times heavier than bare die"],
      answer: 0,
      explanationZh: "Fan-In WLCSP 直接在晶圓狀態完成 RDL 重佈線與植球後切割，封裝尺寸等於晶粒尺寸 (Die Size = Package Size)。",
      explanationEn: "WLCSP processes RDL and bump placement directly on the wafer before dicing, resulting in a true 1:1 die-to-package form factor."
    },
    {
      questionZh: "在先進覆晶 (Flip-Chip) 封裝微凸塊 (Micro-bump) 高溫加速老化試驗中，Cu3Sn 金屬間化合物層內部形成柯肯達爾孔洞 (Kirkendall Voids) 的冶金熱力學原因為何？",
      questionEn: "In flip-chip micro-bump thermal reliability aging, Kirkendall void formation inside the Cu3Sn intermetallic compound layer is driven by which metallurgical mechanism?",
      optionsZh: ["錫原子與空氣中的氮氣發生自燃反應","銅原子在 Cu3Sn 中的向外擴散通量顯著高於錫原子的反向擴散通量 (J_Cu >> J_Sn)，導致晶格空位聚集","封裝環氧樹脂發生熱熔化","凸塊受到外加高電壓直接電離擊穿"],
      optionsEn: ["Tin atoms spontaneously reacting with atmospheric nitrogen","Diffusional flux imbalance where copper atoms diffuse outward much faster than tin diffuses inward (J_Cu >> J_Sn), condensing vacancies into voids","Thermal melting of the epoxy mold compound","Direct dielectric breakdown under high voltage"],
      answer: 1,
      explanationZh: "柯肯達爾效應指兩種金屬互擴散速率不同；在 Cu-Sn 介面，銅往錫擴散速度遠快於錫反向補充，淨空位通量在 Cu3Sn 介面聚集凝結為奈米微孔洞，劣化剪切抗力。",
      explanationEn: "Unequal interdiffusion rates cause net copper flux outward into the solder to outpace inward tin diffusion, leaving condensed lattice vacancies that coalesce into Kirkendall voids."
    }
  ],

  ch21: [
    {
      questionZh: "在 CoWoS 等 2.5D 先進封裝中，矽中介層 (Silicon Interposer) 內部用來貫穿矽晶圓厚度傳遞垂直電氣訊號的微結構稱為？",
      questionEn: "In 2.5D packaging like CoWoS, what vertical micro-structure routes signals through the silicon interposer substrate?",
      optionsZh: ["微凸塊 (Micro-bump)","矽穿孔 (Through-Silicon Via, TSV)","重佈線層 (RDL)","導線架 (Leadframe)"],
      optionsEn: ["Micro-bump","Through-Silicon Via (TSV)","Redistribution Layer (RDL)","Leadframe"],
      answer: 1,
      explanationZh: "TSV (Through-Silicon Via 矽穿孔) 透過在矽基板刻蝕微孔並電鍍填充銅，提供最短路徑的高密度垂直導電互連。",
      explanationEn: "TSVs are copper-filled vertical vias etched through silicon, enabling high-density interconnects across interposers."
    },
    {
      questionZh: "在先進封裝中，台積電 CoWoS-S 與 CoWoS-L 的最關鍵物理結構差異為何？",
      questionEn: "In advanced packaging, what is the key architectural difference between TSMC CoWoS-S and CoWoS-L?",
      optionsZh: ["CoWoS-S 不支援 HBM 記憶體","CoWoS-S 採用整片被動全矽中介層 (Full Silicon Interposer)，CoWoS-L 採用有機 RDL 載板搭配局部嵌入微型矽橋 (LSI Bridge)","CoWoS-L 只能在 200mm 晶圓製作","CoWoS-S 沒有使用微凸塊"],
      optionsEn: ["CoWoS-S does not support HBM","CoWoS-S uses a full monolithic silicon interposer; CoWoS-L uses an organic RDL substrate with embedded local silicon interconnect (LSI) bridges","CoWoS-L is restricted to 200mm wafers","CoWoS-S completely eliminates bumps"],
      answer: 1,
      explanationZh: "CoWoS-S 採用面積龐大的全矽中介層，成本與面積受光罩極限限制；CoWoS-L 採用低成本重佈線有機層，僅在晶粒高速交握處嵌入高密度矽橋 (LSI)。",
      explanationEn: "CoWoS-S utilizes a monolithic silicon interposer; CoWoS-L employs cost-effective organic RDL with localized silicon bridges for high-density die-to-die links."
    },
    {
      questionZh: "次世代 3D 混合鍵合 (Hybrid Bonding / SoIC-X) 是指在常溫或中溫下同時完成哪兩種材料的直接無凸塊接合？",
      questionEn: "Next-generation direct 3D Hybrid Bonding (e.g., TSMC SoIC-X) simultaneously bonds which two material interfaces at sub-micron pitch?",
      optionsZh: ["介電層 (SiO2-SiO2) 與金屬導體 (Cu-Cu)","塑膠與鋁","金屬錫與金","石墨與矽"],
      optionsEn: ["Dielectric-to-dielectric (SiO2-SiO2) and metal-to-metal (Cu-Cu)","Plastic-to-aluminum","Solder-to-gold","Graphite-to-silicon"],
      answer: 0,
      explanationZh: "混合鍵合在平坦化極致表面 (Ra < 0.5nm) 上，先透過親水性水分子鍵合 SiO2 介電層，後續退火使銅金屬熱膨脹擴散鍵合，無任何錫球凸塊。",
      explanationEn: "Hybrid bonding bonds hydrophilic SiO2 dielectric surfaces at room temp, followed by anneal causing Cu-Cu thermal expansion and fusion."
    },
    {
      questionZh: "在台積電 CoWoS 或 InFO 等大尺寸先進封裝中，矽中介層 (Silicon Interposer) 與有機載板 (Substrate) 在 260°C 回焊時產生劇烈翹曲 (Warpage) 的根本力學驅動力為何？",
      questionEn: "In large-body advanced packaging (e.g. CoWoS or InFO), what fundamental mechanical mismatch drives severe thermal warpage during 260°C solder reflow?",
      optionsZh: ["有機載板與矽晶片的熱膨脹係數 (CTE) 存在巨大差異 (有機板約 15 ppm/K vs 矽約 2.6 ppm/K)","大氣壓力隨樓層高度發生變化","微凸塊受重力作用自然下沉","晶圓切片時的晶向標記方向不對稱"],
      optionsEn: ["Severe Coefficient of Thermal Expansion (CTE) mismatch between the organic substrate (~15 ppm/K) and silicon chiplet (~2.6 ppm/K)","Atmospheric barometric pressure variations across cleanroom floors","Micro-bumps sagging strictly under gravitational pull","Asymmetric wafer notch orientation"],
      answer: 0,
      explanationZh: "依據 Stoney 雙金屬片熱應力原理，有機載板隨溫度膨脹收縮率遠高於矽晶片 (CTE 差近 6 倍)，加熱與冷卻時產生強大的熱應力彎矩，導致凸塊開路或基板龜裂。",
      explanationEn: "Bi-material thermal stress governed by Stoney mechanics occurs because organic substrates expand ~6x faster than silicon, inducing severe warping moments across reflow cycles."
    }
  ],

  ch22: [
    {
      questionZh: "描述半導體晶片可靠度生命週期的經典「浴缸曲線 (Bathtub Curve)」，由左至右包含哪三個連續物理階段？",
      questionEn: "What are the three consecutive physical phases of the classic semiconductor Bathtub Curve over time?",
      optionsZh: ["研發期、量產期、衰退期","早期失效期 (Infant Mortality)、偶發失效期 (Useful Life)、磨損耗損期 (Wear-out)","低溫期、常溫期、高溫期","電阻期、電容期、電感期"],
      optionsEn: ["R&D, Ramp, Decline","Infant Mortality, Useful Life (Constant Failure Rate), Wear-out","Cryo, Ambient, High Temp","Resistive, Capacitive, Inductive"],
      answer: 1,
      explanationZh: "浴缸曲線依序為：早期失效期（製程潛在缺陷，以高溫預燒 Burn-in 剔除）、偶發期（低失效率常數）、耗損期（介電崩潰與電遷移疲勞失效）。",
      explanationEn: "The Bathtub curve spans Infant Mortality (screened via burn-in), Useful Life (constant FIT rate), and Wear-out (TDDB, EM)."
    },
    {
      questionZh: "在半導體高溫運轉壽命 (HTOL) 加速測試中，用來計算熱應力加速因子的經典統御方程式是什麼？",
      questionEn: "In High-Temperature Operating Life (HTOL) testing, what governing equation is used to calculate the thermal acceleration factor (AF)?",
      optionsZh: ["納維-斯托克斯方程式 (Navier-Stokes)","阿瑞尼斯模型 (Arrhenius Model: AF = exp[Ea/k * (1/T_use - 1/T_stress)])","薛丁格方程式 (Schrodinger Eq)","馬克士威電磁方程組"],
      optionsEn: ["Navier-Stokes hydrodynamic equation","Arrhenius Model: AF = exp[(Ea/k) * (1/T_use - 1/T_stress)]","Time-dependent Schrodinger equation","Maxwell electromagnetic wave equations"],
      answer: 1,
      explanationZh: "半導體內部多數缺陷（如熱載子衰退、氧化層擊穿、電遷移）皆受熱活化能 Ea 支配，利用 Arrhenius 方程式可將 125°C 測試等效回推至 55°C 正常運作壽命。",
      explanationEn: "Thermally-activated degradation mechanisms obey Arrhenius kinetics, allowing acceleration factors to extrapolate 125°C burn-in data to 55°C field lifetime."
    },
    {
      questionZh: "在半導體靜電放電 (ESD) 防護驗證中，用來模擬帶電人體接觸晶片引腳瞬間放電的經典標準測試模型為？",
      questionEn: "In semiconductor electrostatic discharge (ESD) testing, what standard model simulates discharge from a human body contacting a pin?",
      optionsZh: ["人體放電模型 (Human Body Model, HBM: 100pF / 1500Ω)","機器放電模型 (Machine Model)","元件充電模型 (CDM)","雷擊放電模型"],
      optionsEn: ["Human Body Model (HBM: 100pF capacitor / 1500Ω resistor)","Machine Model (MM)","Charged Device Model (CDM)","Lightning Surge Model"],
      answer: 0,
      explanationZh: "HBM 規範由 100pF 電容透過 1500Ω 電阻對待測元件放電，標準工業規範通常要求引腳耐受度達 2000V (2kV) 以上。",
      explanationEn: "HBM discharges a 100pF capacitor through a 1500-ohm resistor into the DUT, typically requiring >2kV qualification."
    },
    {
      questionZh: "在評估金屬導線電遷移 (Electromigration, EM) 壽命的 Black 方程中，電流密度指數 n 在高電流密度 (>1 MA/cm^2) 下通常會從 1-2 攀升至更大數值，主要原因為何？",
      questionEn: "In Black’s equation for metal electromigration (EM) median-time-to-failure (MTTF), why does the current density exponent n escalate above 2 at high current densities (>1 MA/cm^2)?",
      optionsZh: ["金屬電阻自動降為零","高電流密度引發劇烈焦耳熱 (Joule Heating)，使導線局部實際溫度大幅飆高並產生強烈熱梯度力 (Thermal Gradient Force)","金屬原子停止移動","晶圓表面產生靜電屏障"],
      optionsEn: ["Metal wire resistance spontaneously dropping to zero","Intense Joule heating causes significant localized temperature rise and sharp thermal gradients that accelerate atom migration","Complete cessation of metal atom transport","Static electrostatic barrier forming on the wafer"],
      answer: 1,
      explanationZh: "高電流密度下 $I^2 R$ 焦耳自發熱效應劇烈，金屬線內部溫度升高加速擴散，同時急遽的熱梯度產生熱遷移 (Thermomigration)，使壽命衰退比純電風力更為陡峭。",
      explanationEn: "Severe Joule self-heating elevates localized temperature and induces thermal gradients, superimposing thermomigration onto electron wind forces and accelerating failure."
    }
  ],

  ch23: [
    {
      questionZh: "晶圓廠無塵室自動化派工中，機台 (Equipment) 與製造執行系統 (MES) 之間傳遞配方與狀態控制的國際半導體標準通訊協定為？",
      questionEn: "What standard communications protocol suite interfaces fab tools with MES for automated recipe download and control?",
      optionsZh: ["Modbus TCP","SEMI SECS-II / GEM (E5 / E30 / E37 HSMS)","MQTT 物聯網協議","CANopen 車用通訊"],
      optionsEn: ["Modbus TCP","SEMI SECS-II / GEM (E5 / E30 / E37 HSMS)","MQTT Protocol","CANopen Bus"],
      answer: 1,
      explanationZh: "SEMI 制定之 SECS-II (E5) 與 GEM (E30) 搭配 TCP/IP 上的 HSMS (E37)，為全球半導體廠設備狀態監控與自動化派工的標準通訊架構。",
      explanationEn: "SECS-II/GEM over HSMS (SEMI E5/E30/E37) is the standard interface protocol governing fab automation and recipe control."
    },
    {
      questionZh: "在晶圓廠自動化搬運中，控制無塵室天車 (OHT) 與機台裝載埠 (Load Port) 安全交接 FOUP 的光學交握標準協定為？",
      questionEn: "In semiconductor automation, what standard optical protocol governs optical sensor handshakes between AMHS OHT vehicles and tool load ports?",
      optionsZh: ["SEMI E84 載具搬運交握標準","TCP/IP 乙太網協定","RS-232 序列傳輸","Bluetooth 5.0 無線通訊"],
      optionsEn: ["SEMI E84 Carrier Handshake Standard","TCP/IP Ethernet Standard","RS-232 Serial Communication","Bluetooth Low Energy Standard"],
      answer: 0,
      explanationZh: "SEMI E84 規範了天車手臂伸出前與機台間的光電感測交握信號 (如 TR_REQ, BUSY, COMP 等)，以硬體互鎖徹底杜絕晶圓盒掉落事故。",
      explanationEn: "SEMI E84 defines infrared optical sensor interlock handshakes ensuring mechanical clamping before vehicle hoist release to prevent FOUP drops."
    },
    {
      questionZh: "在晶圓廠電腦整合製造 (CIM) 系統中，MES 與機台設備連線進行 Recipe 自動下載與即時資料採集的 SEMI 通訊協議為？",
      questionEn: "In semiconductor Computer Integrated Manufacturing (CIM), which SEMI standard protocols govern automated recipe management and equipment data collection?",
      optionsZh: ["SEMI SECS-II (E5) 與 GEM (E30)","HTTP / RESTful API","FTP 檔案傳輸","MQTT 物聯網協議"],
      optionsEn: ["SEMI SECS-II (E5) and GEM (E30 / GEM300)","Standard HTTP / RESTful APIs","Plain FTP File Transfer","Lightweight MQTT Protocol"],
      answer: 0,
      explanationZh: "SEMI SECS/GEM 是全球晶圓廠設備控制的通用標準語法，規範了 S1F1 (Ping)、S7F1 (Recipe 傳輸) 等嚴格的雙向握手流程。",
      explanationEn: "SECS-II (E5) and GEM (E30) define the standardized message exchange grammar for fab automation, host recipe downline, and telemetry."
    },
    {
      questionZh: "在晶圓廠自動化排程派工 (Dispatching) 中，臨界比率法 (Critical Ratio, CR) 的數值若小於 1.0 (CR < 1.0)，代表該在製品晶圓批次處於何種生產狀態？",
      questionEn: "In fab automated dispatching heuristics, if a wafer lot’s Critical Ratio is less than 1.0 (CR < 1.0), what is its operational manufacturing status?",
      optionsZh: ["該批次生產進度嚴重超前","預估交期剩餘時間小於剩餘製程加工所需工時，屬於潛在延遲急件，系統應自動提高其派工優先級","該批晶圓必須立即作報廢 (Scrap) 處理","該批次不需要再經過任何檢測機台"],
      optionsEn: ["The lot is drastically ahead of target delivery schedule","Remaining time until promised delivery is less than total remaining processing time (behind schedule), requiring urgent priority escalation","The lot must be immediately scrapped","The lot skips all subsequent inline inspection steps"],
      answer: 1,
      explanationZh: "$CR = (\\text{Due Date} - \\text{Current Time}) / \\text{Remaining Work}$；CR < 1.0 意味即使扣除所有等待時間也可能逾期交貨，排程演算法會將其動態升級為急件優先派工。",
      explanationEn: "A Critical Ratio < 1.0 indicates that remaining processing time exceeds time until due date, triggering automatic dispatch prioritization to mitigate customer shipment delays."
    }
  ],

  ch24: [
    {
      questionZh: "在現代高密度 DRAM 記憶體中，引發「列錘漏洞 (Row Hammer)」硬體故障的根本物理機制為何？",
      questionEn: "What is the root physical mechanism enabling DRAM Row Hammer disturbance errors?",
      optionsZh: ["軟體驅動程式崩潰","頻繁連續存取特定字元線造成相鄰單元電容漏電加速與位元翻轉 (Bit Flip)","晶片表面遭受雷擊","散熱膏導熱係數衰減"],
      optionsEn: ["Software driver bug","Rapid consecutive wordline toggling induces capacitive crosstalk leakage causing bit flips","Lightning strike","Thermal paste dry-out"],
      answer: 1,
      explanationZh: "記憶體單元微縮使相鄰字元線物理間距小於數十奈米，高頻切換電場引發相鄰儲存單元電容漏電加速，未刷新前電荷流失導致位元狀態翻轉。",
      explanationEn: "Aggressive pitch scaling causes capacitive coupling between adjacent wordlines; rapid toggling leaks stored charge."
    },
    {
      questionZh: "在軟硬體協同視角中，DRAM 記憶體因連續快速訪問相鄰實體列 (Wordline) 誘發鄰近電容漏電翻轉位元的硬體缺陷被稱為？",
      questionEn: "In software-hardware co-design, what DRAM hardware vulnerability occurs when rapid back-to-back activation of a row induces bit flips in adjacent rows?",
      optionsZh: ["幽靈漏洞 (Spectre)","行錘擊穿 (Row Hammer)","熔斷漏洞 (Meltdown)","電磁脈衝攻擊 (EMP)"],
      optionsEn: ["Spectre Speculative Attack","Row Hammer Bit-Flip Vulnerability","Meltdown Out-of-Order Exploit","Electromagnetic Pulse Attack"],
      answer: 1,
      explanationZh: "隨 DRAM 節點微縮，電容間距小於 10nm，頻繁開關相鄰字元線會透過電容寄生耦合加速鄰近未選取單元的電荷洩漏，引發記憶體位元翻轉。",
      explanationEn: "Row Hammer exploits parasitic capacitive coupling in dense DRAM cells: hammering an aggressor row leaks charge from victim rows, inducing bit flips."
    },
    {
      questionZh: "在晶片軟硬體協同架構中，內部供電網絡 IR Drop 電壓降過大，在時序 (Timing) 視角上會引發什麼致命錯誤？",
      questionEn: "In hardware-software co-design, how does excessive internal power-grid IR Drop directly degrade logic circuit performance?",
      optionsZh: ["電晶體有效閘極過驅動電壓降低導致開關延遲暴增，引發時序違規 (Timing Violation / Setup Time Failure)","晶片引腳熔斷","晶片時鐘頻率自動歸零","記憶體容量減半"],
      optionsEn: ["Reduced overdrive voltage increases transistor gate propagation delays, triggering setup timing violations and bit errors","Physical bonding pin fusion","Clock oscillator frequency drops to zero","Memory capacity spontaneously halves"],
      answer: 0,
      explanationZh: "反向驅動電流與導線電阻造成局部供電壓降，使電晶體充放電速度變慢，信號無法在下一個時鐘邊緣抵達正反器，產生致命計算錯誤。",
      explanationEn: "IR drop lowers effective Vdd at gates, increasing propagation delays; signals fail to arrive before clock edges, causing setup timing faults."
    },
    {
      questionZh: "在現代高效能 DRAM 記憶體中，攻擊者透過高頻反覆讀取相鄰字元線引發「列錘擊 (Row Hammer)」位元翻轉漏洞，硬體製造商主要導入何種晶片內防禦架構？",
      questionEn: "In advanced DRAM architectures, malicious high-frequency access of victim wordlines induces Row Hammer bit-flips. What on-die hardware countermeasure do vendors deploy?",
      optionsZh: ["將所有 DRAM 晶片降速至 1 MHz","目標列刷新 (Targeted Row Refresh, TRR) 結合片內計數器，在字元線激發次數超標前強制對相鄰列進行預警式電荷補充電荷刷新","永久移除記憶體內的電容儲存單元","將晶片封裝成完全絕緣體"],
      optionsEn: ["Underclocking all DRAM modules to 1 MHz","Targeted Row Refresh (TRR) tracking activation counters to autonomously refresh adjacent victim capacitor rows before leakage flips bits","Permanently removing capacitor storage cells from the silicon","Encapsulating the entire chip inside solid dielectric shielding"],
      answer: 1,
      explanationZh: "Row Hammer 源於相鄰電容的漏電串擾與電磁干擾；TRR 機制在晶片內部監控各 Row 被啟動 (Activate) 的頻率，一旦超過防禦閾值立即對相鄰 Victim Row 執行額外充電刷新。",
      explanationEn: "TRR hardware counters monitor wordline activation counts, issuing directed refresh cycles to adjacent victim rows before leakage across dielectric barriers flips stored capacitor bits."
    }
  ],

  'app-glossary': [
    {
      questionZh: "在先進半導體製程術語中，常提到的「EOT (Equivalent Oxide Thickness)」中文意涵為何？",
      questionEn: "In advanced semiconductor terminology, what does EOT (Equivalent Oxide Thickness) designate?",
      optionsZh: ["高介電材料 (High-k) 相對於純熱氧化矽 (SiO2) 之等效電容物理厚度","晶圓最外層邊緣禁區厚度","化學蝕刻過蝕刻深度","電子顯微鏡聚焦深度"],
      optionsEn: ["High-k dielectric physical thickness equivalent to SiO2 capacitance","Wafer edge exclusion zone width","Over-etching depth","SEM focal depth"],
      answer: 0,
      explanationZh: "EOT 是將高介電常數薄膜的電容值換算為傳統二氧化矽所需厚度：EOT = (k_SiO2 / k_high-k) · t_phys，反映閘極靜電控制能力。",
      explanationEn: "EOT measures high-k physical thickness normalized to equivalent SiO2 capacitance: EOT = (3.9 / k) * t_phys."
    },
    {
      questionZh: "在半導體微影與先進圖形轉移領域中，EPE 代表什麼極關鍵的幾何公差預算？",
      questionEn: "In advanced photolithography and multi-patterning, what does the critical metric EPE stand for?",
      optionsZh: ["Edge Placement Error (邊緣放置誤差)","Electronic Power Efficiency (電子功耗效率)","Epitaxial Purity Element (磊晶純度元素)","Etch Pressure Equilibrium (蝕刻氣壓平衡)"],
      optionsEn: ["Edge Placement Error (EPE)","Electronic Power Efficiency","Epitaxial Purity Element","Etch Pressure Equilibrium"],
      answer: 0,
      explanationZh: "EPE 綜合了微影曝光光學近似效應 (OPC)、光罩誤差 (MEEF)、晶圓疊對誤差 (Overlay) 與蝕刻偏差，是次 3nm 幾何圖形對齊的終極預算指標。",
      explanationEn: "EPE synthesizes CD error, optical proximity, reticle error, overlay shift, and etch bias as the ultimate metric for nanometer pattern alignment."
    },
    {
      questionZh: "在半導體機台綜合設備總合效率 (OEE) 指標中，其計算公式由哪三項關鍵比率相乘而成？",
      questionEn: "Overall Equipment Effectiveness (OEE) for semiconductor tools is mathematically the product of which three key operational ratios?",
      optionsZh: ["可用率 (Availability) × 性能稼動率 (Performance) × 良品率 (Quality)","機台成本 × 晶圓面積 × 缺陷數","電壓 × 電流 × 功率","無塵室面積 × 天車數量 × 速度"],
      optionsEn: ["Availability Rate × Performance Efficiency × Quality Yield","Tool Capex × Wafer Area × Defect Count","Voltage × Current × Power Factor","Cleanroom Bay Area × OHT Vehicle Fleet × Speed"],
      answer: 0,
      explanationZh: "OEE = Availability (稼動時間比) × Performance (實際產速 vs 理論 UPH) × Quality (良品晶圓比率)，全面量化機台生產效益。",
      explanationEn: "OEE = Availability (uptime) × Performance (run speed vs theoretical UPH) × Quality (good wafers / total wafers processed)."
    },
    {
      questionZh: "在半導體製造指標中，設備綜合效率 (OEE, Overall Equipment Effectiveness) 是由哪三大關鍵維度的乘積所定義？",
      questionEn: "In semiconductor manufacturing metrics, Overall Equipment Effectiveness (OEE) is defined as the mathematical product of which three operational dimensions?",
      optionsZh: ["用電量 × 用水量 × 氣體量","設備稼動率 (Availability) × 生產效能 (Performance) × 良率品質 (Quality)","機台重量 × 機台長度 × 機台高度","工程師人數 × 班別時數 × 晶圓直徑"],
      optionsEn: ["Power consumption × Water usage × Gas flow","Availability Rate × Performance Efficiency × Quality Yield","Equipment weight × Machine length × System height","Headcount × Shift duration × Wafer diameter"],
      answer: 1,
      explanationZh: "OEE = Availability × Performance × Quality；反映機台是否在線運轉、運轉時是否達到設計產出速度 (Throughput)，以及產出的晶片是否為合格無缺陷晶圓。",
      explanationEn: "OEE evaluates total equipment productivity by compounding operational uptime (Availability), speed efficiency (Performance), and defect-free output percentage (Quality)."
    }
  ],

  'app-jargon': [
    {
      questionZh: "晶圓廠現場工程師口語交接時常提及的「跑控片 (Monitor Wafer)」主要實務目的為何？",
      questionEn: "In fab floor slang, what is the primary purpose of running a Monitor Wafer?",
      optionsZh: ["供工程師練習晶圓手動搬運","在量產晶圓投片前，確認機台微粒數 (Particles)、膜厚或蝕刻率合規 (Qual)","作為給訪客的紀念贈品","測試無塵室天車最高速度"],
      optionsEn: ["Manual handling practice","Verify tool particle count, film thickness, or etch rate compliance (Tool Qual)","Souvenir gift for visitors","Testing maximum OHT speed"],
      answer: 1,
      explanationZh: "控片 (Monitor Wafer) 表面平整無圖形，定期投入機台測量物理變數，確認機台狀態合格 (Qual Passed) 後，才放行高價值量產晶圓 (Prime Lot)。",
      explanationEn: "Blank monitor wafers verify tool health (particles, rates) during tool qualification before running high-value product lots."
    },
    {
      questionZh: "半導體晶圓廠現場工程師口中所謂的「養腔 (Chamber Seasoning)」是指什麼操作？",
      questionEn: "In fab operations jargon, what does \"Chamber Seasoning\" refer to following scheduled chamber maintenance (PM)?",
      optionsZh: ["加熱腔體至 800°C 殺菌","在 PM 開腔保養或清洗後，投入多片 Dummy 擋片進行試跑沉積，使腔體內壁達到化學與電漿穩態","加入香精測試排氣管路氣密性","用酒精手動擦拭腔體表面"],
      optionsEn: ["Heating chamber to 800°C for sterilization","Running multiple dummy wafers post-PM to deposit a seasoning passivation layer, stabilizing chamber impedance and chemistry","Injecting tracer fragrance to test exhaust leaks","Manually wiping platen with isopropyl alcohol"],
      answer: 1,
      explanationZh: "新清洗或更換零件後的電漿腔體內壁暴露裸露表面，容易吸收自由基導致製程漂移；養腔是在內壁預先沉積保護薄膜以達到電漿阻抗穩定。",
      explanationEn: "Seasoning coats fresh chamber walls with process byproduct film, stabilizing RF impedance and radical consumption prior to running production lots."
    },
    {
      questionZh: "在晶圓廠生產排程行話中，工程師所稱的「Split (實驗分批)」是指何種作業流程？",
      questionEn: "In wafer fab dispatch jargon, what operational action does a \"Split\" lot instruction represent?",
      optionsZh: ["把晶圓沿中線切成兩半","將同一個 Lot (通常 25 片) 分拆為多個子批次，分別套用不同條件 (DOE) 進行工程驗證","取消整批生產並報廢","手動搬運晶圓盒"],
      optionsEn: ["Physically sawing a wafer in half","Splitting a 25-wafer lot into sub-lots to run split-table DOE experiments with varied recipe parameters","Canceling the production order","Manually hand-carrying the carrier"],
      answer: 1,
      explanationZh: "Split 是晶圓廠最常見的工程實驗手法，例如 25 片拆成 5 片 A 條件、5 片 B 條件，後續再合併 (Merge) 比對實驗結果。",
      explanationEn: "A Split separates a 25-wafer carrier into DOE groups to test recipe variations under identical substrate and previous-step conditions."
    },
    {
      questionZh: "在晶圓廠交接與機台異常處置行話中，工程師常說的「把機台 Down 下來並上 Hold Lot」，其真實的現場作業意義為何？",
      questionEn: "In semiconductor fab floor jargon, what is the precise operational protocol when an engineer declares: \"Down the tool and put lots on Hold\"?",
      optionsZh: ["將機台推倒並報廢所有晶圓","將設備狀態標記為非生產 (Unscheduled Down) 暫停進料，並將曾經過該機台的受疑晶圓批次在 MES 系統鎖定凍結，防止瑕疵品流至下一站","給機台灌水降溫並讓產線人員放假","將機台轉速加快兩倍以沖銷產能"],
      optionsEn: ["Physically knocking down the tool and trashing wafers","Changing machine state to Unscheduled Down in CIM to halt feeding, while locking affected lots in MES to prevent contaminated flow","Flooding the chamber with cold water and sending staff home","Doubling machine speed to recover throughput"],
      answer: 1,
      explanationZh: "這是晶圓廠標準防堵隔離程序：Down 機停止生產避免產生更多異常品，Hold Lot 將可疑批次在製造執行系統 (MES) 鎖住禁止過帳，等待工程抽檢與處置。",
      explanationEn: "This standard containment procedure sets the machine status to unscheduled down in CIM and locks suspect lots in MES to prevent defective material from progressing downstream."
    }
  ],

  'app-reading': [
    {
      questionZh: "半導體微電子與元件物理領域被全球產業界與學界譽為「半導體聖經」的經典著作作者為？",
      questionEn: "Who is the author of the authoritative semiconductor engineering bible \"Physics of Semiconductor Devices\"?",
      optionsZh: ["高登·摩爾 (Gordon Moore)","施敏博士 (Dr. S. M. Sze)","安迪·葛洛夫 (Andy Grove)","羅伯特·諾伊斯 (Robert Noyce)"],
      optionsEn: ["Gordon Moore","Dr. S. M. Sze (Simon M. Sze)","Andy Grove","Robert Noyce"],
      answer: 1,
      explanationZh: "施敏 (Simon M. Sze) 博士所著《Physics of Semiconductor Devices》被公認為全球半導體元件物理最權威的殿堂級經典聖經。",
      explanationEn: "Dr. Simon M. Sze authored \"Physics of Semiconductor Devices\", universally regarded as the gold-standard semiconductor bible."
    },
    {
      questionZh: "被全球半導體界公認為 VLSI 製程技術經典必讀聖經《Silicon Processing for the VLSI Era》的作者是誰？",
      questionEn: "Who are the legendary authors of the classic semiconductor handbook \"Silicon Processing for the VLSI Era\"?",
      optionsZh: ["Stanley Wolf & Richard N. Tauber","Gordon Moore & Robert Noyce","Andrew Grove & Bill Gates","Jack Kilby & Morris Chang"],
      optionsEn: ["Stanley Wolf & Richard N. Tauber","Gordon Moore & Robert Noyce","Andrew Grove & Bill Gates","Jack Kilby & Morris Chang"],
      answer: 0,
      explanationZh: "Wolf 與 Tauber 所著的《Silicon Processing for the VLSI Era》（共 4 冊）被譽為半導體製造工程的四庫全書，涵蓋了深度的物理機制與製程化學。",
      explanationEn: "Stanley Wolf and Richard N. Tauber authored the seminal multi-volume treatise \"Silicon Processing for the VLSI Era\", the definitive industry bible."
    },
    {
      questionZh: "預言積體電路上可容納之電晶體數量約每 18 至 24 個月翻倍的「摩爾定律 (Moore's Law)」，最早由 Gordon Moore 於哪一年提出？",
      questionEn: "In what year did Gordon Moore publish the landmark paper predicting that transistor density on integrated circuits would double every ~2 years?",
      optionsZh: ["1947 年","1965 年","1985 年","2001 年"],
      optionsEn: ["1947","1965","1985","2001"],
      answer: 1,
      explanationZh: "Gordon Moore 於 1965 年在《Electronics》雜誌發表專文，觀察到微晶片元件數量呈現指數型成長趨勢，奠定了現代半導體微縮技術藍圖。",
      explanationEn: "Gordon Moore published his seminal observation in the April 19, 1965 issue of Electronics magazine, guiding six decades of scaling."
    },
    {
      questionZh: "施敏 (S. M. Sze) 教授的經典半導體著作《半導體元件物理學 (Physics of Semiconductor Devices)》中，解析載子傳輸現象最核心的基礎方程式架構為何？",
      questionEn: "In S. M. Sze’s landmark treatise \"Physics of Semiconductor Devices\", which foundational set of partial differential equations governs charge carrier transport?",
      optionsZh: ["愛因斯坦相對論質能方程","波茲曼傳輸方程 (BTE) 與結合漂移-擴散 (Drift-Diffusion)、卜瓦松 (Poisson) 及連續性方程 (Continuity Equations) 的自洽體系","熱力學理想氣體狀態方程式","納維-斯托克斯流體流動方程"],
      optionsEn: ["Einstein relativistic mass-energy equivalence","The self-consistent framework coupling Poisson equation, Drift-Diffusion transport, and Continuity equations derived from the Boltzmann Transport Equation","Ideal gas thermodynamic equation of state","Navier-Stokes fluid dynamic equations"],
      answer: 1,
      explanationZh: "半導體元件物理的核心骨架是卜瓦松方程式 (靜電勢)、連續性方程式 (電荷守恆) 與漂移-擴散方程式 (載子通量) 的聯立自洽求解，是當代所有 TCAD 模擬器的基石。",
      explanationEn: "Modern semiconductor device simulation rests on the coupled self-consistent solution of Poisson’s equation, carrier continuity equations, and drift-diffusion equations."
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
