/**
 * Route-split chapter loader. HTML stays in data/chapters/<id>.js and is imported on demand.
 * Content digest is checked by scripts/verify-navigation-contract.mjs.
 */
export const CHAPTER_CATALOG = [
  {
    "id": "ch00",
    "part": "第 0 部　開始之前",
    "partEn": "Part 0: Before You Start",
    "partId": "part-0",
    "num": 0,
    "shortTitle": "半導體製造全景",
    "shortTitleEn": "The Big Picture",
    "fullTitle": "第 0 章　半導體製造全景：一顆晶片的一生",
    "fullTitleEn": "Chapter 0: The Big Picture — The Life of a Chip",
    "category": "overview"
  },
  {
    "id": "ch01",
    "part": "第 0 部　開始之前",
    "partEn": "Part 0: Before You Start",
    "partId": "part-0",
    "num": 1,
    "shortTitle": "晶圓廠如何運作",
    "shortTitleEn": "How a Fab Works",
    "fullTitle": "第 1 章　晶圓廠如何運作：無塵室、自動搬運、機台與人",
    "fullTitleEn": "Chapter 1: How a Fab Works — Cleanrooms, Automation, Tools and People",
    "category": "overview"
  },
  {
    "id": "ch02",
    "part": "第 1 部　基礎",
    "partEn": "Part 1: Fundamentals",
    "partId": "part-1",
    "num": 2,
    "shortTitle": "從物理到電晶體",
    "shortTitleEn": "From Physics to Transistors",
    "fullTitle": "第 2 章　從物理到電晶體：認識我們要製造的東西",
    "fullTitleEn": "Chapter 2: From Physics to Transistors — Meet What We Are Building",
    "category": "fundamentals"
  },
  {
    "id": "ch03",
    "part": "第 1 部　基礎",
    "partEn": "Part 1: Fundamentals",
    "partId": "part-1",
    "num": 3,
    "shortTitle": "從沙子到晶圓",
    "shortTitleEn": "From Sand to Wafer",
    "fullTitle": "第 3 章　從沙子到晶圓：一切的起點",
    "fullTitleEn": "Chapter 3: From Sand to Wafer — Where It All Begins",
    "category": "fundamentals"
  },
  {
    "id": "ch04",
    "part": "第 2 部　製程模組",
    "partEn": "Part 2: Process Modules",
    "partId": "part-2",
    "num": 4,
    "shortTitle": "微影",
    "shortTitleEn": "Lithography",
    "fullTitle": "第 4 章　微影：把電路圖「印」到晶圓上",
    "fullTitleEn": "Chapter 4: Lithography — Printing the Circuit onto the Wafer",
    "category": "modules"
  },
  {
    "id": "ch05",
    "part": "第 2 部　製程模組",
    "partEn": "Part 2: Process Modules",
    "partId": "part-2",
    "num": 5,
    "shortTitle": "薄膜",
    "shortTitleEn": "Thin Films",
    "fullTitle": "第 5 章　薄膜：一層一層鋪上材料",
    "fullTitleEn": "Chapter 5: Thin Films — Building Up Layer by Layer",
    "category": "modules"
  },
  {
    "id": "ch06",
    "part": "第 2 部　製程模組",
    "partEn": "Part 2: Process Modules",
    "partId": "part-2",
    "num": 6,
    "shortTitle": "蝕刻",
    "shortTitleEn": "Etching",
    "fullTitle": "第 6 章　蝕刻：照著圖形把材料挖掉",
    "fullTitleEn": "Chapter 6: Etching — Carving Out the Pattern",
    "category": "modules"
  },
  {
    "id": "ch07",
    "part": "第 2 部　製程模組",
    "partEn": "Part 2: Process Modules",
    "partId": "part-2",
    "num": 7,
    "shortTitle": "離子佈植與熱處理",
    "shortTitleEn": "Ion Implantation & Anneal",
    "fullTitle": "第 7 章　離子佈植與熱處理：改變矽的電性",
    "fullTitleEn": "Chapter 7: Ion Implantation and Thermal Processing — Changing How Silicon Conducts",
    "category": "modules"
  },
  {
    "id": "ch08",
    "part": "第 2 部　製程模組",
    "partEn": "Part 2: Process Modules",
    "partId": "part-2",
    "num": 8,
    "shortTitle": "CMP",
    "shortTitleEn": "CMP",
    "fullTitle": "第 8 章　CMP：把晶圓磨平",
    "fullTitleEn": "Chapter 8: CMP — Polishing the Wafer Flat",
    "category": "modules"
  },
  {
    "id": "ch09",
    "part": "第 2 部　製程模組",
    "partEn": "Part 2: Process Modules",
    "partId": "part-2",
    "num": 9,
    "shortTitle": "清洗與污染控制",
    "shortTitleEn": "Cleaning & Contamination Control",
    "fullTitle": "第 9 章　清洗與污染控制：看不見的敵人",
    "fullTitleEn": "Chapter 9: Cleaning and Contamination Control — The Invisible Enemy",
    "category": "modules"
  },
  {
    "id": "ch10",
    "part": "第 2 部　製程模組",
    "partEn": "Part 2: Process Modules",
    "partId": "part-2",
    "num": 10,
    "shortTitle": "金屬化",
    "shortTitleEn": "Metallization",
    "fullTitle": "第 10 章　金屬化：把電晶體連起來",
    "fullTitleEn": "Chapter 10: Metallization — Wiring the Transistors Together",
    "category": "modules"
  },
  {
    "id": "ch11",
    "part": "第 3 部　製程整合",
    "partEn": "Part 3: Process Integration",
    "partId": "part-3",
    "num": 11,
    "shortTitle": "走一遍完整的 CMOS 流程",
    "shortTitleEn": "CMOS Process Flow",
    "fullTitle": "第 11 章　走一遍完整的 CMOS 流程：把模組串起來",
    "fullTitleEn": "Chapter 11: A Complete CMOS Process Flow — Putting the Modules Together",
    "category": "integration"
  },
  {
    "id": "ch12",
    "part": "第 3 部　製程整合",
    "partEn": "Part 3: Process Integration",
    "partId": "part-3",
    "num": 12,
    "shortTitle": "先進電晶體結構",
    "shortTitleEn": "Advanced Transistors",
    "fullTitle": "第 12 章　先進電晶體結構：從平面到立體",
    "fullTitleEn": "Chapter 12: Advanced Transistor Structures — From Planar to 3D",
    "category": "integration"
  },
  {
    "id": "ch13",
    "part": "第 3 部　製程整合",
    "partEn": "Part 3: Process Integration",
    "partId": "part-3",
    "num": 13,
    "shortTitle": "記憶體製程",
    "shortTitleEn": "Memory Processes",
    "fullTitle": "第 13 章　記憶體製程：DRAM、3D NAND 與 HBM",
    "fullTitleEn": "Chapter 13: Memory Processes — DRAM, 3D NAND and HBM",
    "category": "integration"
  },
  {
    "id": "ch14",
    "part": "第 3 部　製程整合",
    "partEn": "Part 3: Process Integration",
    "partId": "part-3",
    "num": 14,
    "shortTitle": "「幾奈米」是什麼意思",
    "shortTitleEn": "Process Nodes",
    "fullTitle": "第 14 章　「幾奈米」是什麼意思：讀懂製程節點",
    "fullTitleEn": "Chapter 14: What Does \"3 nm\" Really Mean? — Understanding Process Nodes",
    "category": "integration"
  },
  {
    "id": "ch15",
    "part": "第 4 部　品質與良率",
    "partEn": "Part 4: Quality & Yield",
    "partId": "part-4",
    "num": 15,
    "shortTitle": "量測與檢測",
    "shortTitleEn": "Metrology & Inspection",
    "fullTitle": "第 15 章　量測與檢測：工廠的眼睛",
    "fullTitleEn": "Chapter 15: Metrology and Inspection — The Eyes of the Fab",
    "category": "quality"
  },
  {
    "id": "ch16",
    "part": "第 4 部　品質與良率",
    "partEn": "Part 4: Quality & Yield",
    "partId": "part-4",
    "num": 16,
    "shortTitle": "良率與故障分析",
    "shortTitleEn": "Yield & Failure Analysis",
    "fullTitle": "第 16 章　良率與故障分析：找出晶片壞掉的原因",
    "fullTitleEn": "Chapter 16: Yield and Failure Analysis — Finding Out Why Chips Fail",
    "category": "quality"
  },
  {
    "id": "ch17",
    "part": "第 4 部　品質與良率",
    "partEn": "Part 4: Quality & Yield",
    "partId": "part-4",
    "num": 17,
    "shortTitle": "製程控制",
    "shortTitleEn": "Process Control",
    "fullTitle": "第 17 章　製程控制：用數據讓製程保持穩定",
    "fullTitleEn": "Chapter 17: Process Control — Keeping the Process Stable with Data",
    "category": "quality"
  },
  {
    "id": "ch18",
    "part": "第 4 部　品質與良率",
    "partEn": "Part 4: Quality & Yield",
    "partId": "part-4",
    "num": 18,
    "shortTitle": "異常處理與工程變更",
    "shortTitleEn": "Abnormality Handling & Changes",
    "fullTitle": "第 18 章　異常處理與工程變更：出事時工廠怎麼反應",
    "fullTitleEn": "Chapter 18: Handling Abnormalities and Engineering Changes — How the Fab Responds When Things Go Wrong",
    "category": "quality"
  },
  {
    "id": "ch19",
    "part": "第 5 部　後段：測試與封裝",
    "partEn": "Part 5: Backend & Packaging",
    "partId": "part-5",
    "num": 19,
    "shortTitle": "晶圓測試",
    "shortTitleEn": "Wafer Test",
    "fullTitle": "第 19 章　晶圓測試：WAT 與 CP",
    "fullTitleEn": "Chapter 19: Wafer Test — WAT and CP",
    "category": "backend"
  },
  {
    "id": "ch20",
    "part": "第 5 部　後段：測試與封裝",
    "partEn": "Part 5: Backend & Packaging",
    "partId": "part-5",
    "num": 20,
    "shortTitle": "封裝",
    "shortTitleEn": "Packaging",
    "fullTitle": "第 20 章　封裝：讓晶片能被使用",
    "fullTitleEn": "Chapter 20: Packaging — Making the Chip Usable",
    "category": "backend"
  },
  {
    "id": "ch21",
    "part": "第 5 部　後段：測試與封裝",
    "partEn": "Part 5: Backend & Packaging",
    "partId": "part-5",
    "num": 21,
    "shortTitle": "先進封裝",
    "shortTitleEn": "Advanced Packaging",
    "fullTitle": "第 21 章　先進封裝：把多顆晶片整合在一起",
    "fullTitleEn": "Chapter 21: Advanced Packaging — Integrating Multiple Chips into One",
    "category": "backend"
  },
  {
    "id": "ch22",
    "part": "第 5 部　後段：測試與封裝",
    "partEn": "Part 5: Backend & Packaging",
    "partId": "part-5",
    "num": 22,
    "shortTitle": "最終測試與可靠度",
    "shortTitleEn": "Final Test & Reliability",
    "fullTitle": "第 22 章　最終測試與可靠度：確保晶片能用很多年",
    "fullTitleEn": "Chapter 22: Final Test and Reliability — Making Sure Chips Last for Years",
    "category": "backend"
  },
  {
    "id": "ch23",
    "part": "第 6 部　走出晶圓廠",
    "partEn": "Part 6: Beyond the Fab",
    "partId": "part-6",
    "num": 23,
    "shortTitle": "工廠如何被系統管理",
    "shortTitleEn": "Fab Systems",
    "fullTitle": "第 23 章　工廠如何被系統管理：一片晶圓為什麼不會走錯路",
    "fullTitleEn": "Chapter 23: How Systems Run the Fab — Why a Wafer Never Takes a Wrong Turn",
    "category": "systems"
  },
  {
    "id": "ch24",
    "part": "第 6 部　走出晶圓廠",
    "partEn": "Part 6: Beyond the Fab",
    "partId": "part-6",
    "num": 24,
    "shortTitle": "製程如何影響韌體",
    "shortTitleEn": "Process & Firmware",
    "fullTitle": "第 24 章　製程如何影響韌體：給軟韌體工程師的硬體真相",
    "fullTitleEn": "Chapter 24: How the Process Shapes Firmware — Hardware Truths for Software and Firmware Engineers",
    "category": "systems"
  },
  {
    "id": "app-glossary",
    "part": "附錄",
    "partEn": "Appendices",
    "partId": "part-app",
    "num": 25,
    "shortTitle": "附錄 A　術語總表",
    "shortTitleEn": "Appendix A: Glossary",
    "fullTitle": "附錄 A　術語總表",
    "fullTitleEn": "Appendix A: Glossary",
    "category": "appendix"
  },
  {
    "id": "app-jargon",
    "part": "附錄",
    "partEn": "Appendices",
    "partId": "part-app",
    "num": 26,
    "shortTitle": "附錄 B　現場行話",
    "shortTitleEn": "Appendix B: Fab Jargon",
    "fullTitle": "附錄 B　現場行話",
    "fullTitleEn": "Appendix B: Fab Jargon",
    "category": "appendix"
  },
  {
    "id": "app-reading",
    "part": "附錄",
    "partEn": "Appendices",
    "partId": "part-app",
    "num": 27,
    "shortTitle": "附錄 C　延伸閱讀",
    "shortTitleEn": "Appendix C: Further Reading",
    "fullTitle": "附錄 C　延伸閱讀",
    "fullTitleEn": "Appendix C: Further Reading",
    "category": "appendix"
  }
];

const cache = new Map();

export function loadChapterRecord(id) {
  const key = CHAPTER_CATALOG.some(chapter => chapter.id === id) ? id : CHAPTER_CATALOG[0].id;
  if (!cache.has(key)) {
    cache.set(key, import(`./chapters/${key}.js`).then(mod => mod.chapter));
  }
  return cache.get(key);
}

export async function loadAllChapters() {
  return Promise.all(CHAPTER_CATALOG.map(chapter => loadChapterRecord(chapter.id)));
}
