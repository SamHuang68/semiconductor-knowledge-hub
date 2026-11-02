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
  '頻寬需求暴增': 'bandwidth', 'Bandwidth demand has exploded': 'bandwidth'
};
