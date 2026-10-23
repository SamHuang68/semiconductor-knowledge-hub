/**
 * data/process-stack-data.js
 * 互動式半導體薄膜微觀沉積與蝕刻微步演進器 (Process Stacking Visualizer)
 * 50 輪深度工程優化 Stage 12 (Rounds 56–60)
 * 
 * 定義 Planar MOSFET、FinFET 與 GAA 奈米片從矽基底到第一層金屬 (M1) 的
 * 8 大微觀橫截面薄膜堆疊與刻蝕步驟，支援微步步進與無塵室淺色系視覺化。
 */

export const PROCESS_STACK_ARCHITECTURES = {
  planar_mosfet: {
    titleZh: 'Planar MOSFET 平面金氧半場效電晶體 (28nm 世代)',
    titleEn: 'Planar MOSFET (28nm Node Baseline)',
    steps: [
      {
        stepNum: 1,
        nameZh: 'P 型單晶矽基底準備 (Si Substrate)',
        nameEn: 'P-type Bulk Silicon Substrate Prep',
        action: 'substrate',
        descriptionZh: '高純度 P 型單晶矽晶圓，電阻率約 10~20 Ω·cm，表面經 RCA 清洗與原生氧化層剝除。',
        descriptionEn: 'High-purity P-type monocrystalline silicon wafer, RCA cleaned with native oxide stripped.',
        layers: [
          { material: 'Si', nameZh: 'P 型矽基底', nameEn: 'P-Silicon Substrate', color: '#e2e8f0', stroke: '#94a3b8', height: 120 }
        ]
      },
      {
        stepNum: 2,
        nameZh: 'STI 淺溝槽隔離形成 (Shallow Trench Isolation)',
        nameEn: 'Shallow Trench Isolation (STI) Formation',
        action: 'etch_cmp',
        descriptionZh: '微影定義隔離槽，乾式非等向蝕刻深入基底 300nm，沉積 SiO2 氧化物後經 CMP 研磨平坦化。',
        descriptionEn: 'Litho defined trenches, dry anisotropic etched 300nm, filled with SiO2 and CMP planarized.',
        layers: [
          { material: 'Si', nameZh: '主動區矽島', nameEn: 'Active Si Island', color: '#e2e8f0', stroke: '#94a3b8', height: 100 },
          { material: 'SiO2', nameZh: 'STI 隔離氧化層', nameEn: 'STI Field Oxide', color: '#bae6fd', stroke: '#0284c7', height: 40 }
        ]
      },
      {
        stepNum: 3,
        nameZh: '井區與閾值電壓離子佈植 (Well & Vt Implant)',
        nameEn: 'Well & Vt Adjustment Ion Implantation',
        action: 'implant',
        descriptionZh: '注入硼 (Boron) 或磷 (Phosphorus) 離子調控通道載子濃度與 Vt，經毫秒級高溫雷射退火活化。',
        descriptionEn: 'B or P ion implantation to tune channel carrier concentration, activated by millisecond laser anneal.',
        layers: [
          { material: 'Si', nameZh: 'P-Well 井區通道', nameEn: 'P-Well Channel', color: '#cbd5e1', stroke: '#64748b', height: 100 },
          { material: 'SiO2', nameZh: 'STI 隔離氧化層', nameEn: 'STI Field Oxide', color: '#bae6fd', stroke: '#0284c7', height: 40 }
        ]
      },
      {
        stepNum: 4,
        nameZh: 'High-k 閘極介電層與多晶矽閘極堆疊 (HKMG Gate)',
        nameEn: 'High-k Dielectric & Gate Electrode Stack',
        action: 'deposition_etch',
        descriptionZh: '原子層沉積 (ALD) 沉積 1.2nm HfO2 高介電薄膜與 TiN 功函數金屬，微影蝕刻成型 Gate。',
        descriptionEn: 'ALD 1.2nm HfO2 high-k dielectric with TiN work-function metal, etched to form gate electrode.',
        layers: [
          { material: 'Si', nameZh: 'P-Well 通道', nameEn: 'P-Well Channel', color: '#cbd5e1', stroke: '#64748b', height: 80 },
          { material: 'HfO2', nameZh: 'High-k 閘極氧化層 (1.2nm)', nameEn: 'HfO2 Gate Dielectric', color: '#fef08a', stroke: '#ca8a04', height: 8 },
          { material: 'TiN/Poly', nameZh: '金屬閘極電極 (Gate)', nameEn: 'Metal Gate Electrode', color: '#fed7aa', stroke: '#ea580c', height: 45 }
        ]
      },
      {
        stepNum: 5,
        nameZh: '側壁間隔層 (Spacer Formation)',
        nameEn: 'Dielectric Spacer Formation',
        action: 'deposition_etch',
        descriptionZh: '保形沉積 Si3N4 氮化矽薄膜，利用非等向乾蝕刻回蝕，於閘極兩側留下自對準間隔層。',
        descriptionEn: 'Conformal Si3N4 deposition followed by anisotropic etch-back, forming self-aligned spacers.',
        layers: [
          { material: 'Si', nameZh: 'P-Well 通道', nameEn: 'P-Well Channel', color: '#cbd5e1', stroke: '#64748b', height: 80 },
          { material: 'Spacer', nameZh: 'Si3N4 側壁間隔層', nameEn: 'Si3N4 Spacers', color: '#ddd6fe', stroke: '#7c3aed', height: 45 },
          { material: 'Gate', nameZh: '金屬閘極', nameEn: 'Metal Gate', color: '#fed7aa', stroke: '#ea580c', height: 45 }
        ]
      },
      {
        stepNum: 6,
        nameZh: '源極/汲極選擇性磊晶與高濃度重摻雜 (S/D Epi)',
        nameEn: 'Source/Drain Selective Epitaxy & HDD Implant',
        action: 'epi_implant',
        descriptionZh: '選擇性外延生長 SiGe (PMOS) 施加壓縮應力，或重摻砷/磷離子形成極低接觸電阻的 S/D 接面。',
        descriptionEn: 'Selective SiGe epitaxy for compressive strain and heavy As/P implant for ultra-low resistance S/D.',
        layers: [
          { material: 'Si', nameZh: '基底', nameEn: 'Substrate', color: '#cbd5e1', stroke: '#64748b', height: 80 },
          { material: 'SiGe_SD', nameZh: '應變源汲極 (S/D)', nameEn: 'Strained S/D Epi', color: '#bbf7d0', stroke: '#16a34a', height: 35 },
          { material: 'Gate', nameZh: '金屬閘極', nameEn: 'Metal Gate', color: '#fed7aa', stroke: '#ea580c', height: 45 }
        ]
      },
      {
        stepNum: 7,
        nameZh: '層間介電層沉積與鎢插塞接觸孔 (ILD & W-Plug)',
        nameEn: 'Inter-Layer Dielectric & Tungsten Plug',
        action: 'cmp_contact',
        descriptionZh: '低壓 CVD 沉積 SiO2 ILD0 絕緣層，RIE 蝕刻直通源極、汲極與閘極之高深寬比 Contact 孔，填入鎢金屬 (W)。',
        descriptionEn: 'CVD SiO2 ILD0 deposition, RIE contact hole etch, filled with CVD tungsten plugs and CMP.',
        layers: [
          { material: 'ILD', nameZh: 'SiO2 層間介電層', nameEn: 'SiO2 ILD0 Layer', color: '#f1f5f9', stroke: '#cbd5e1', height: 70 },
          { material: 'W_Plug', nameZh: '鎢導電插塞 (W-Plug)', nameEn: 'Tungsten Contacts', color: '#94a3b8', stroke: '#475569', height: 65 }
        ]
      },
      {
        stepNum: 8,
        nameZh: '第一層銅導線雙鑲嵌平坦化 (M1 Dual-Damascene)',
        nameEn: 'Metal-1 (M1) Copper Dual-Damascene',
        action: 'damascene',
        descriptionZh: '沉積 low-k 介電層，蝕刻走線槽溝，濺鍍 TaN 阻障層與銅晶種，電鍍銅超填後經 CMP 平坦化。',
        descriptionEn: 'Low-k dielectric etch, TaN barrier / Cu seed sputter, ECD copper bottom-up superfill and CMP.',
        layers: [
          { material: 'Cu_M1', nameZh: 'M1 銅金屬互連導線', nameEn: 'M1 Copper Wire', color: '#fdba74', stroke: '#c2410c', height: 40 },
          { material: 'LowK', nameZh: 'Low-k 介電絕緣層', nameEn: 'Low-k Dielectric', color: '#e0f2fe', stroke: '#38bdf8', height: 40 },
          { material: 'ILD', nameZh: '底層接觸介電層', nameEn: 'Bottom ILD', color: '#f1f5f9', stroke: '#cbd5e1', height: 60 }
        ]
      }
    ]
  },

  finfet: {
    titleZh: 'FinFET 3D 鰭式場效電晶體 (7nm / 5nm 世代)',
    titleEn: 'FinFET 3D Tri-Gate Transistor (7nm / 5nm Node)',
    steps: [
      {
        stepNum: 1,
        nameZh: '自對準多重圖案化 (SADP 矽鰭片蝕刻)',
        nameEn: 'Self-Aligned Double Patterning (Fin RIE)',
        action: 'sadp_etch',
        descriptionZh: '利用 SADP 間隔層微影技術，突破光學極限，垂直蝕刻形成寬度 6nm、高度 50nm 之極微細 3D 矽鰭片 (Fin)。',
        descriptionEn: 'SADP spacer litho to etch ultra-narrow 6nm width, 50nm height vertical silicon fins.',
        layers: [
          { material: 'Si_Fin', nameZh: '垂直單晶矽鰭片 (Fin)', nameEn: '3D Silicon Fin', color: '#93c5fd', stroke: '#2563eb', height: 90 },
          { material: 'Si_Sub', nameZh: '基底矽體', nameEn: 'Silicon Bulk', color: '#e2e8f0', stroke: '#94a3b8', height: 40 }
        ]
      },
      {
        stepNum: 2,
        nameZh: '三面環繞閘極跨越 (Tri-Gate HKMG Wrapping)',
        nameEn: 'Tri-Gate High-k / Metal Gate Wrapping',
        action: 'tri_gate_wrap',
        descriptionZh: '金屬閘極自鰭片左、頂、右三面 3D 環繞跨越，大幅增強靜電控制能力，有效壓制短通道效應 (SCE)。',
        descriptionEn: 'Metal gate wraps around three sides of the fin, drastically suppressing short-channel effects.',
        layers: [
          { material: 'Gate_Wrap', nameZh: '三面環繞金屬閘極', nameEn: 'Tri-Gate Metal Wrap', color: '#fed7aa', stroke: '#ea580c', height: 60 },
          { material: 'Si_Fin', nameZh: '鰭片通道 (Fin Channel)', nameEn: 'Fin Channel Core', color: '#93c5fd', stroke: '#2563eb', height: 50 }
        ]
      }
    ]
  },

  gaa_nanosheet: {
    titleZh: 'GAA 奈米片全環繞閘極電晶體 (2nm 世代 / CFET)',
    titleEn: 'Gate-All-Around (GAA) Nanosheet (2nm Node / CFET)',
    steps: [
      {
        stepNum: 1,
        nameZh: 'Si/SiGe 多層超晶格磊晶 (Superlattice Epi)',
        nameEn: 'Si / SiGe Multi-layer Superlattice Epitaxy',
        action: 'superlattice_epi',
        descriptionZh: '交替磊晶沉積 3 層高應變 SiGe 犧牲層與 3 層單晶矽奈米片 (Nanosheet)，厚度控制於 5nm ±0.2nm。',
        descriptionEn: 'Alternating epitaxy of 3 SiGe sacrificial layers and 3 Si nanosheets, controlled to 5nm thickness.',
        layers: [
          { material: 'Si_Sheet', nameZh: '矽奈米片 (3 層)', nameEn: 'Si Nanosheets (3x)', color: '#60a5fa', stroke: '#1d4ed8', height: 60 },
          { material: 'SiGe_Sac', nameZh: 'SiGe 犧牲釋放層', nameEn: 'SiGe Sacrificial Layers', color: '#fbcfe8', stroke: '#db2777', height: 50 }
        ]
      },
      {
        stepNum: 2,
        nameZh: '原子層選擇性化學蝕刻釋放 (Nanosheet Release)',
        nameEn: 'Selective Isotropic SiGe Release (ALE)',
        action: 'nanosheet_release',
        descriptionZh: '高選擇比氣相原子層蝕刻 (ALE) 完全掏空 SiGe 犧牲層，使 3 條奈米片悬空，形成 360° 全環繞通道。',
        descriptionEn: 'High-selectivity isotropic gas-phase etch completely hollows out SiGe, suspending 3 nanosheets.',
        layers: [
          { material: 'Suspended_Sheets', nameZh: '悬空 3D 奈米通道', nameEn: 'Suspended Nanosheet Channels', color: '#60a5fa', stroke: '#1d4ed8', height: 75 }
        ]
      },
      {
        stepNum: 3,
        nameZh: '360° 四面全包覆閘極 (Gate-All-Around Wrapping)',
        nameEn: '360-degree Gate-All-Around Metal Fill',
        action: 'gaa_wrap',
        descriptionZh: 'ALD 沉積金屬完全填滿奈米片之間極窄縫隙，實現 360 度四面包覆，達成史上最完美靜電約束 (Weff 倍增)。',
        descriptionEn: 'ALD metal fills tiny gaps between nanosheets, achieving 360-degree electrostatic gate control.',
        layers: [
          { material: 'GAA_Metal', nameZh: '四面包覆金屬閘極 (GAA)', nameEn: 'All-Around Metal Gate', color: '#fed7aa', stroke: '#ea580c', height: 85 },
          { material: 'Suspended_Sheets', nameZh: '內部被包覆奈米片', nameEn: 'Embedded Nanosheet Channels', color: '#60a5fa', stroke: '#1d4ed8', height: 60 }
        ]
      }
    ]
  }
};
