// 只收錄 2026-10-27 以 Chrome 開啟、HTTP 狀態 200，且標題與附錄 C 對得上的來源。
const BOOKS = 'https://books.google.com/books?vid=ISBN';

function book(title, authors, isbn, detailZh, detailEn) {
  return { type: 'book', title, authors, isbn, url: `${BOOKS}${isbn}`, detailZh, detailEn };
}

function link(type, title, url, detailZh, detailEn) {
  return { type, title, url, detailZh, detailEn };
}

const SOURCES = {
  ch00: [
    book('Microchip Fabrication: A Practical Guide to Semiconductor Processing', 'Peter Van Zant', '9780070672505', '附錄 C 把這本書列為涵蓋整條製造流程的入門書。', 'Appendix C lists this book as an introduction to the whole manufacturing flow.'),
    book('Semiconductor Manufacturing Technology', 'Michael Quirk, Julian Serda', '9780130815200', '附錄 C 把這本書列為全書的實務讀本。', 'Appendix C lists this book as a practical companion for the whole text.')
  ],
  ch01: [
    link('standard', 'ISO 14644-1:2015', 'https://www.iso.org/standard/53394.html', '附錄 C 把這份標準列在第 1 章，用來說明潔淨室等級。', 'Appendix C lists this standard under chapter 1 for cleanroom classification.'),
    book('Factory Physics', 'Wallace J. Hopp, Mark L. Spearman', '9781577667391', '附錄 C 把這本書列在工廠運作，對應第 1、23 章。', 'Appendix C lists this book for fab operations, chapters 1 and 23.')
  ],
  ch02: [
    book('Semiconductor Devices: Physics and Technology', 'S. M. Sze, M. K. Lee', '9789971513955', '附錄 C 把這本書列為第 2、12 章的元件物理讀本。', 'Appendix C lists this book for device physics in chapters 2 and 12.'),
    link('conference', 'IEEE IEDM', 'https://ieee-iedm.org/', '附錄 C 把 IEDM 列為電晶體與元件技術的會議。', 'Appendix C lists IEDM for transistor and device technology.')
  ],
  ch03: [
    book('Microchip Fabrication: A Practical Guide to Semiconductor Processing', 'Peter Van Zant', '9780070672505', '附錄 C 把這本書列為涵蓋整條製造流程的入門書。', 'Appendix C lists this book as an introduction to the whole manufacturing flow.')
  ],
  ch04: [
    book('Fundamental Principles of Optical Lithography: The Science of Microfabrication', 'Chris Mack', '9780470018934', '附錄 C 把這本書列為第 4 章的微影讀本。', 'Appendix C lists this book for lithography in chapter 4.'),
    link('conference', 'SPIE Advanced Lithography + Patterning', 'https://spie.org/conferences-and-exhibitions/advanced-lithography-and-patterning', '附錄 C 把這個會議列為微影與圖形化的場合。', 'Appendix C lists this conference for lithography and patterning.')
  ],
  ch05: [
    book('Introduction to Semiconductor Manufacturing Technology', 'Hong Xiao', '9780130224040', '附錄 C 把這本書列在第 2 部的製程模組。', 'Appendix C lists this book for the process modules in part 2.'),
    book('Silicon VLSI Technology', 'James D. Plummer, Michael D. Deal, Peter B. Griffin', '9780136141563', '附錄 C 把這本書列在第 2、3 部。', 'Appendix C lists this book for parts 2 and 3.')
  ],
  ch09: [
    book('Handbook of Silicon Wafer Cleaning Technology', 'Karen A. Reinhardt, Werner Kern', '9780323510851', '附錄 C 把這本書列為第 9 章的清洗讀本。', 'Appendix C lists this handbook for wafer cleaning in chapter 9.')
  ],
  ch11: [
    book('Silicon VLSI Technology', 'James D. Plummer, Michael D. Deal, Peter B. Griffin', '9780136141563', '附錄 C 說這本書有一條完整的 CMOS 流程，並列在第 2、3 部。', 'Appendix C says this book walks through a CMOS flow and lists it for parts 2 and 3.')
  ],
  ch12: [
    book('Semiconductor Devices: Physics and Technology', 'S. M. Sze, M. K. Lee', '9789971513955', '附錄 C 把這本書列為第 2、12 章的元件物理讀本。', 'Appendix C lists this book for device physics in chapters 2 and 12.'),
    link('consortium', 'IEEE IRDS editions', 'https://irds.ieee.org/editions/', '附錄 C 把 IEEE IRDS 列為第 12、14 章的微縮路線圖。', 'Appendix C lists the IEEE IRDS for scaling in chapters 12 and 14.'),
    link('conference', 'Symposium on VLSI Technology and Circuits', 'https://www.vlsisymposium.org/', '附錄 C 把這個會議列為先進製程與電路的場合。', 'Appendix C lists this symposium for advanced process and circuit papers.')
  ],
  ch13: [
    book('Inside NAND Flash Memories', 'Rino Micheloni, Luca Crippa, Alessia Marelli', '9789400798342', '附錄 C 把這本書列在第 13、24 章。', 'Appendix C lists this book for chapters 13 and 24.')
  ],
  ch14: [
    link('consortium', 'IEEE IRDS editions', 'https://irds.ieee.org/editions/', '附錄 C 把 IEEE IRDS 列為第 12、14 章的微縮路線圖。', 'Appendix C lists the IEEE IRDS for scaling in chapters 12 and 14.'),
    link('conference', 'Symposium on VLSI Technology and Circuits', 'https://www.vlsisymposium.org/', '附錄 C 把這個會議列為先進製程與電路的場合。', 'Appendix C lists this symposium for advanced process and circuit papers.')
  ],
  ch15: [
    book('Handbook of Silicon Semiconductor Metrology', 'Alain C. Diebold', '9781135554842', '附錄 C 把這本書列為第 15 章的量測讀本。', 'Appendix C lists this handbook for metrology in chapter 15.')
  ],
  ch16: [
    book('Fundamentals of Semiconductor Manufacturing and Process Control', 'Gary S. May, Costas J. Spanos', '9780471784067', '附錄 C 把這本書列在第 16、17、18 章。', 'Appendix C lists this book for chapters 16, 17, and 18.')
  ],
  ch17: [
    book('Fundamentals of Semiconductor Manufacturing and Process Control', 'Gary S. May, Costas J. Spanos', '9780471784067', '附錄 C 把這本書列在第 16、17、18 章。', 'Appendix C lists this book for chapters 16, 17, and 18.'),
    book('Introduction to Statistical Quality Control', 'Douglas C. Montgomery', '0471529931', '附錄 C 把這本書列為第 17 章的統計品管讀本。', 'Appendix C lists this book for statistical quality control in chapter 17.')
  ],
  ch18: [
    book('Fundamentals of Semiconductor Manufacturing and Process Control', 'Gary S. May, Costas J. Spanos', '9780471784067', '附錄 C 把這本書列在第 16、17、18 章。', 'Appendix C lists this book for chapters 16, 17, and 18.')
  ],
  ch19: [
    book('Essentials of Electronic Testing for Digital, Memory and Mixed-Signal VLSI Circuits', 'Michael L. Bushnell, Vishwani D. Agrawal', '9780792379911', '附錄 C 把這本書列為第 19 章的測試讀本。', 'Appendix C lists this book for chip test in chapter 19.')
  ],
  ch20: [
    book('Fundamentals of Microsystems Packaging', 'Rao R. Tummala', '9780071371698', '附錄 C 把這本書列為第 20 章的封裝讀本。', 'Appendix C lists this book for packaging in chapter 20.'),
    link('conference', 'IEEE ECTC', 'https://ectc.net/', '附錄 C 把 ECTC 列為封裝技術的會議。', 'Appendix C lists ECTC for packaging technology.')
  ],
  ch21: [
    book('Semiconductor Advanced Packaging', 'John H. Lau', '9789811613760', '附錄 C 把這本書列為第 21 章的先進封裝讀本。', 'Appendix C lists this book for advanced packaging in chapter 21.'),
    link('consortium', 'UCIe Consortium', 'https://www.uciexpress.org/', '附錄 C 把 UCIe 列為小晶片互連的公開規格入口。', 'Appendix C lists UCIe as the public chiplet interconnect specification.'),
    link('conference', 'IEEE ECTC', 'https://ectc.net/', '附錄 C 把 ECTC 列為封裝技術的會議。', 'Appendix C lists ECTC for packaging technology.')
  ],
  ch22: [
    book('Reliability Physics and Engineering: Time-To-Failure Modeling', 'J. W. McPherson', '9783319936826', '附錄 C 把這本書列為第 22 章的可靠度讀本。', 'Appendix C lists this book for reliability in chapter 22.'),
    link('conference', 'IEEE IRPS', 'https://www.irps.org/', '附錄 C 把 IRPS 列為可靠度物理的會議。', 'Appendix C lists IRPS for reliability physics.'),
    link('consortium', 'AEC documents, including AEC-Q100', 'http://www.aecouncil.com/AECDocuments.html', '附錄 C 把 AEC-Q100 列為車用積體電路的可靠度驗證。這一頁是 AEC 公開的文件清單。', 'Appendix C lists AEC-Q100 for automotive IC qualification. This page is the AEC public document list.')
  ],
  ch23: [
    book('Factory Physics', 'Wallace J. Hopp, Mark L. Spearman', '9781577667391', '附錄 C 把這本書列在工廠運作，對應第 1、23 章。', 'Appendix C lists this book for fab operations, chapters 1 and 23.'),
    book('Manufacturing Execution Systems (MES): Optimal Design, Planning, and Deployment', 'Heiko Meyer, Franz Fuchs, Klaus Thiel', '9780071623834', '附錄 C 把這本書列為第 23 章的製造執行系統讀本。', 'Appendix C lists this book for manufacturing execution systems in chapter 23.')
  ],
  ch24: [
    book('Inside NAND Flash Memories', 'Rino Micheloni, Luca Crippa, Alessia Marelli', '9789400798342', '附錄 C 把這本書列在第 13、24 章。', 'Appendix C lists this book for chapters 13 and 24.'),
    link('paper', 'Flipping Bits in Memory Without Accessing Them: An Experimental Study of DRAM Disturbance Errors', 'https://users.ece.cmu.edu/~yoonguk/papers/kim-isca14.pdf', '附錄 C 把 Yoongu Kim 等人的 ISCA 2014 論文列為 Row Hammer 的出處。這個網址是作者放在卡內基美隆大學頁面上的 PDF。', 'Appendix C cites the Yoongu Kim et al. ISCA 2014 paper for Row Hammer. This URL is the author PDF on the Carnegie Mellon page.')
  ]
};

SOURCES.ch06 = SOURCES.ch05;
SOURCES.ch07 = SOURCES.ch05;
SOURCES.ch08 = SOURCES.ch05;
SOURCES.ch10 = SOURCES.ch05;

const TYPE_LABEL = {
  zh: { book: '教科書', standard: '標準', conference: '會議', consortium: '聯盟文件', paper: '論文' },
  en: { book: 'Textbook', standard: 'Standard', conference: 'Conference', consortium: 'Consortium', paper: 'Paper' }
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

export function renderFurtherReading(chapterId, lang) {
  const sources = SOURCES[chapterId];
  if (!sources?.length) return '';
  const isEn = lang === 'en';
  const labels = TYPE_LABEL[isEn ? 'en' : 'zh'];
  const items = sources.map(source => {
    const meta = [
      labels[source.type] || source.type,
      source.authors,
      source.isbn ? `ISBN ${source.isbn}` : ''
    ].filter(Boolean).map(escapeHtml).join(' · ');
    const detail = isEn ? source.detailEn : source.detailZh;
    return `<li><a href="${escapeHtml(source.url)}" rel="noopener noreferrer">${escapeHtml(source.title)}</a><span class="further-meta">${meta}</span><span>${escapeHtml(detail)}</span></li>`;
  }).join('');
  return `<section class="further-reading" aria-labelledby="further-${chapterId}"><h2 id="further-${chapterId}">${isEn ? 'Sources you can check' : '可核對的來源'}</h2><p>${isEn
    ? 'These are public sources already named in Appendix C, or the official page for one of them. Each URL returned HTTP 200 when opened on 27 October 2026. Sources that could not be checked are left out.'
    : '這裡只放附錄 C 已經點名的公開來源，或該來源的官方頁面。2026-10-27 以瀏覽器開啟時，每個網址都回傳 HTTP 200。沒有核對到的來源就不列。'}</p><ul>${items}</ul></section>`;
}
