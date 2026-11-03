// 條列標籤 → 圖示名稱（icons.js）。固定標籤全站共用；正文條列只收有語意對應的標籤，
// 一組條列只要有一個標籤查不到，整組改用序號，不用通用圓點湊數。
export const LABEL_ICONS = {
  // 名詞卡
  '定義': 'definition', 'Definition': 'definition',
  '現場用法': 'usage', 'On the floor': 'usage',
  '相關名詞': 'terms', 'Related terms': 'terms',
  '常見混淆': 'confusion', 'Common confusion': 'confusion',
  // Know-how
  '情境': 'situation', 'Situation': 'situation',
  '做法': 'practice', 'Practice': 'practice',
  '為什麼': 'why', 'Why': 'why',
  '沒做會怎樣': 'risk', 'If you skip it': 'risk',
  '相關章節': 'related', 'Related chapters': 'related',
  // ch05 薄膜
  '絕緣': 'insulator', 'Insulation': 'insulator',
  '導電': 'conductor', 'Conduction': 'conductor',
  '輔助製程': 'layers', 'Process support': 'layers',
  '乾式氧化': 'gas', 'Dry oxidation': 'gas',
  '濕式氧化': 'drop', 'Wet oxidation': 'drop',
  '膜厚': 'thickness', 'Thickness': 'thickness',
  '均勻度': 'uniform', 'Uniformity': 'uniform',
  '階梯覆蓋': 'step', 'Step coverage': 'step',
  '應力': 'stress', 'Stress': 'stress',
  '微粒': 'particle', 'Particles': 'particle',
  // ch13 記憶體
  '記憶陣列': 'array', 'Memory array': 'array',
  '周邊電路': 'circuit', 'Periphery': 'circuit',
  // ch21 先進封裝
  '晶粒不能無限大': 'reticle', 'A die cannot grow without limit': 'reticle',
  '大晶粒良率低': 'defect', 'Large dies have low yield': 'defect',
  '不同功能適合不同製程': 'chiplets', 'Different functions suit different processes': 'chiplets',
  '頻寬需求暴增': 'bandwidth', 'Bandwidth demand has exploded': 'bandwidth',
  // ch00
  '前段': 'fab', 'Front end': 'fab',
  '後段': 'package', 'Back end': 'package',
  // ch01 樓層、ch10 金屬層：同樣叫上層／中層／下層，用不指定內容的層級圖示
  '上層': 'level-top', 'Top level': 'level-top', 'Upper layers': 'level-top',
  '中層': 'level-mid', 'Middle level': 'level-mid', 'Middle layers': 'level-mid',
  '下層': 'level-bottom', 'Bottom level': 'level-bottom', 'Lower layers': 'level-bottom',
  '天車（OHT）': 'oht', 'Overhead hoist transport (OHT)': 'oht',
  '倉儲（Stocker）': 'stocker', 'Stocker': 'stocker',
  'Load Port': 'loadport', 'Load port': 'loadport',
  '單片式': 'single-wafer', 'Single-wafer tools': 'single-wafer', '單片式清洗機': 'single-wafer', 'Single-wafer cleaners': 'single-wafer',
  '批次式': 'batch', 'Batch tools': 'batch', '批次式濕式清洗槽': 'batch', 'Batch wet benches': 'batch',
  '超純水': 'drop', 'Ultrapure water': 'drop',
  '特殊氣體與化學品': 'gas-cylinder', 'Specialty gases and chemicals': 'gas-cylinder',
  '電力': 'conductor', 'Electric power': 'conductor',
  '排氣與廢水處理': 'exhaust', 'Exhaust and wastewater treatment': 'exhaust',
  '溫濕度與振動控制': 'thermometer', 'Temperature, humidity and vibration control': 'thermometer',
  '生產週期（Cycle Time）': 'clock', 'Cycle time': 'clock',
  '良率（Yield）': 'yield', 'Yield': 'yield',
  '產出（Output）': 'output', 'Output': 'output',
  // ch02
  '源極（Source）': 'mos-source', 'Source': 'mos-source',
  '汲極（Drain）': 'mos-drain', 'Drain': 'mos-drain',
  '閘極（Gate）': 'mos-gate', 'Gate': 'mos-gate',
  '閘極氧化層': 'mos-oxide', 'Gate oxide': 'mos-oxide',
  '通道（Channel）': 'mos-channel', 'Channel': 'mos-channel',
  'NMOS': 'nmos', 'PMOS': 'pmos',
  // ch04
  '浸潤式微影': 'immersion', 'Immersion lithography': 'immersion',
  'OPC': 'opc',
  '多重曝光': 'multi-pattern', 'Multiple patterning': 'multi-pattern',
  // ch06
  '蝕刻率': 'rate', 'Etch rate': 'rate',
  '選擇比': 'selectivity', 'Selectivity': 'selectivity',
  '輪廓': 'profile', 'Profile': 'profile',
  'CD 變化': 'cd', 'CD change': 'cd',
  // ch07（英文版是條列，中文版不是）
  'Dose': 'dose', 'Energy': 'depth',
  // ch08
  '微影對不準焦': 'focus', 'Lithography cannot focus': 'focus',
  '多餘的材料去不掉': 'excess', 'Excess material cannot be removed': 'excess',
  'Polishing pad': 'pad', 'Slurry': 'drop', 'Polishing head': 'polish-head', 'Conditioner': 'conditioner',
  // ch10
  '電阻變高': 'resistance', 'Higher resistance': 'resistance',
  '電遷移': 'electromigration', 'Electromigration': 'electromigration',
  // ch12
  '應變矽': 'strain', 'Strained silicon': 'strain',
  'HKMG': 'hkmg',
  // ch16
  '隨機性': 'random', 'Random': 'random',
  '系統性': 'systematic', 'Systematic': 'systematic',
  'Line yield': 'line-yield', 'Die yield': 'array', 'Final test yield': 'tester',
  // ch17
  '規格界限': 'spec-limit', 'Specification limits': 'spec-limit',
  '管制界限': 'control-limit', 'Control limits': 'control-limit',
  // ch19
  '探針卡': 'probe-card', 'Probe card': 'probe-card',
  '針測機': 'prober', 'Prober': 'prober',
  '測試機': 'tester', 'Tester': 'tester',
  // ch20
  '保護': 'insulator', 'Protection': 'insulator',
  '連接': 'related', 'Connection': 'related',
  '散熱': 'heat', 'Heat dissipation': 'heat',
  '支撐': 'support', 'Support': 'support',
  // ch22 浴缸曲線三段
  '早期失效期': 'early', 'Early failure period': 'early',
  '穩定期': 'stable', 'Stable period': 'stable',
  '老化期': 'wearout', 'Wear-out period': 'wearout',
  // ch23
  '預測性保養': 'maintenance', 'Predictive maintenance': 'maintenance',
  '虛擬量測': 'virtual-metrology', 'Virtual metrology': 'virtual-metrology',
  '人工智慧分析': 'ai', 'AI analysis': 'ai',
  '自動化派工': 'dispatch', 'Automated dispatching': 'dispatch'
};

// 介面圖示（2.17.0）：側欄、章節標頭、翻頁、各部頁與首頁共用同一組章節圖示；
// data/fab-flow.js 與 data/scenario-paths.js 有雜湊鎖或既有契約，對應表放這裡，不改原資料
export const CHAPTER_ICONS = {
  ch00: 'circuit', ch01: 'fab', ch02: 'transistor', ch03: 'ingot', ch04: 'litho', ch05: 'layers', ch06: 'etch',
  ch07: 'implant', ch08: 'pad', ch09: 'clean', ch10: 'interconnect', ch11: 'route', ch12: 'gaa', ch13: 'array',
  ch14: 'ruler', ch15: 'microscope', ch16: 'defect', ch17: 'control-limit', ch18: 'risk', ch19: 'probe-card',
  ch20: 'package', ch21: 'chiplets', ch22: 'bathtub', ch23: 'network', ch24: 'firmware',
  'app-glossary': 'term', 'app-jargon': 'usage', 'app-reading': 'books'
};

export const PART_ICONS = {
  'part-0': 'map', 'part-1': 'atom', 'part-2': 'modules', 'part-3': 'puzzle',
  'part-4': 'shield-check', 'part-5': 'box', 'part-6': 'door', 'part-app': 'appendix'
};

// 首頁十二站依站號對應：熱氧化與薄膜沉積同在第 5 章，各用自己的圖示
export const STATION_ICONS = {
  '01': 'ingot', '02': 'furnace', '03': 'litho', '04': 'etch', '05': 'implant', '06': 'layers',
  '07': 'pad', '08': 'clean', '09': 'interconnect', '10': 'gaa', '11': 'microscope', '12': 'probe-card'
};

// 情境探索：情境卡用主題圖示（取代原本代表圖型種類的符號字元，圖型種類仍由卡片文字說明）
export const SCENARIO_ICONS = { journey: 'wafer', pattern: 'litho', quality: 'control-limit', packaging: 'chiplets', dispatch: 'fab' };

// 流程節點依節點 id；沒有列出的節點沿用其教材章節的圖示
export const SCENARIO_NODE_ICONS = {
  wafer: 'wafer', transistor: 'transistor', wiring: 'interconnect', probe: 'probe-card', package: 'package',
  film: 'layers', resist: 'drop', expose: 'litho', etch: 'etch', clean: 'clean', measure: 'microscope',
  signal: 'microscope', decision: 'why', monitor: 'control-limit', hold: 'risk', cause: 'defect', release: 'check',
  single: 'package', interposer: 'chiplets', stack: 'layers',
  route: 'network', dispatch: 'dispatch', transport: 'oht', recipe: 'practice', record: 'definition'
};
