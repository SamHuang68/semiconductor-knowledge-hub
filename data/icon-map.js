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
