/**
 * chapters-data.js
 * 半導體製造知識庫 25 章完整結構化內容
 */
export const CHAPTERS_DATA = [
  {
    "id": "ch00",
    "part": "第 0 部　開始之前",
    "partId": "part-0",
    "num": 0,
    "shortTitle": "半導體製造全景",
    "fullTitle": "第 0 章　半導體製造全景：一顆晶片的一生",
    "category": "overview",
    "waferTrack": "- 前一站：還沒出發\r\n- **本章：鳥瞰一顆晶片從設計到出貨的完整旅程**\r\n- 下一站：走進晶圓廠，看看它怎麼運作",
    "headings": [
      {
        "text": "一片晶圓的旅程",
        "id": "一片晶圓的旅程"
      },
      {
        "text": "誰負責什麼：半導體產業的分工",
        "id": "誰負責什麼半導體產業的分工"
      },
      {
        "text": "旅程地圖",
        "id": "旅程地圖"
      },
      {
        "text": "前段與後段",
        "id": "前段與後段"
      },
      {
        "text": "晶圓、晶粒與晶片",
        "id": "晶圓晶粒與晶片"
      },
      {
        "text": "工廠裡的三個基本單位",
        "id": "工廠裡的三個基本單位"
      },
      {
        "text": "不斷重複的循環",
        "id": "不斷重複的循環"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-0-章-半導體製造全景一顆晶片的一生\" class=\"heading-anchor\">第 0 章　半導體製造全景：一顆晶片的一生<a class=\"anchor-link\" href=\"#第-0-章-半導體製造全景一顆晶片的一生\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：還沒出發</li><li><strong>本章：鳥瞰一顆晶片從設計到出貨的完整旅程</strong></li><li>下一站：走進晶圓廠，看看它怎麼運作</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"一片晶圓的旅程\" class=\"heading-anchor\">一片晶圓的旅程<a class=\"anchor-link\" href=\"#一片晶圓的旅程\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">手機、電腦、汽車、家電，裡面都有晶片。一顆指甲大小的晶片上，可能有數十億到上千億個電晶體，而這些電晶體全部是在一片薄薄的矽晶圓上「做」出來的。</p>\n<p class=\"semi-p\">半導體製造是人類最複雜的製造工作之一：一片晶圓要經過數百到上千個步驟、花上好幾個月，才能變成可以使用的晶片。這本書會跟著<strong>一片晶圓</strong>，從它還是空白的矽片開始，一站一站走完整趟旅程。</p>\n<p class=\"semi-p\">本章先給你一張地圖。之後每一章開頭的「📍 晶圓位置」，都會告訴你晶圓現在走到地圖上的哪裡。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"誰負責什麼半導體產業的分工\" class=\"heading-anchor\">誰負責什麼：半導體產業的分工<a class=\"anchor-link\" href=\"#誰負責什麼半導體產業的分工\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">一顆晶片從無到有，通常由好幾種公司分工完成：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>角色</th><th>做什麼</th></tr></thead><tbody><tr><td>IC 設計公司（Fabless）</td><td>設計晶片的電路，但沒有自己的工廠</td></tr><tr><td>晶圓代工廠（Foundry）</td><td>接受設計公司委託，在晶圓上把電路製造出來</td></tr><tr><td>整合元件製造廠（IDM）</td><td>從設計、製造到銷售都自己來</td></tr><tr><td>封裝測試廠（OSAT）</td><td>把晶圓切成一顆顆晶片、封裝並測試</td></tr><tr><td>設備與材料供應商</td><td>提供製造用的機台、化學品、氣體、晶圓等</td></tr></tbody></table></div>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜晶圓代工（Foundry）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：不設計自己的晶片產品，專門替客戶製造晶片的商業模式。</li><li><strong>現場用法</strong>：「這個產品是客戶投片進來的」，代工廠習慣把每個客戶的設計稱為一個產品。</li><li><strong>相關名詞</strong>：Fabless、IDM、OSAT</li><li><strong>常見混淆</strong>：IDM 和代工廠都有晶圓廠，差別在於 IDM 主要製造自己設計的產品，代工廠則替別人製造。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"旅程地圖\" class=\"heading-anchor\">旅程地圖<a class=\"anchor-link\" href=\"#旅程地圖\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>設計 → 光罩製作 → 投片 → 前段製程 → 晶圓測試 → 封裝 → 最終測試 → 出貨</strong></p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>階段</th><th>發生什麼事</th><th>本書章節</th></tr></thead><tbody><tr><td>設計</td><td>工程師用軟體設計電路，最後轉成每一層的圖形</td><td><a href=\"#node-14\" class=\"semi-link\">第 14 章</a>稍有提及</td></tr><tr><td>光罩製作</td><td>把每一層圖形做成一片光罩</td><td><a href=\"#node-04\" class=\"semi-link\">第 4 章</a></td></tr><tr><td>投片</td><td>空白晶圓放進工廠，正式開始生產</td><td><a href=\"#node-03\" class=\"semi-link\">第 3 章</a></td></tr><tr><td>前段製程</td><td>在晶圓上一層一層做出電晶體和金屬導線</td><td><a href=\"../../2-process-modules/README.md\" class=\"semi-link\">第 4～18 章</a></td></tr><tr><td>晶圓測試</td><td>檢查晶圓上每一顆晶片的好壞</td><td><a href=\"#node-19\" class=\"semi-link\">第 19 章</a></td></tr><tr><td>封裝</td><td>把晶圓切開，把好的晶片包裝起來</td><td><a href=\"#node-20\" class=\"semi-link\">第 20、21 章</a></td></tr><tr><td>最終測試</td><td>封裝後再測一次，並確保晶片能用很多年</td><td><a href=\"#node-22\" class=\"semi-link\">第 22 章</a></td></tr></tbody></table></div>\n<p class=\"semi-p\"><!-- 圖：晶片的一生全景圖（設計、光罩、晶圓廠、測試、封裝、出貨，依序排列） --></p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"前段與後段\" class=\"heading-anchor\">前段與後段<a class=\"anchor-link\" href=\"#前段與後段\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">半導體製造最常見的分法是<strong>前段</strong>和<strong>後段</strong>：</p>\n<ul class=\"semi-ul\"><li><strong>前段</strong>：在晶圓廠裡，把電路一層一層做在晶圓上。這是本書第 2 到第 4 部的主題，也是最花時間的部分，通常要兩到三個月甚至更久。</li><li><strong>後段</strong>：把做好的晶圓測試、切割、封裝成一顆顆可以焊到電路板上的晶片。</li></ul>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜前段與後段</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：前段指晶圓製造，後段指封裝與測試。</li><li><strong>現場用法</strong>：「他在前段做製程」「這顆晶片卡在後段」。</li><li><strong>相關名詞</strong>：FEOL、BEOL、封測</li><li><strong>常見混淆</strong>：「前段、後段」有兩種意思。除了晶圓製造與封測的分法，晶圓廠內部也會把製造電晶體的步驟叫前段（FEOL），把做金屬導線的步驟叫後段（BEOL），見<a href=\"#node-11\" class=\"semi-link\">第 11 章</a>。聽到時要看上下文判斷。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"晶圓晶粒與晶片\" class=\"heading-anchor\">晶圓、晶粒與晶片<a class=\"anchor-link\" href=\"#晶圓晶粒與晶片\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">一片晶圓上會整齊排列很多個相同的電路，每一個電路叫做一個<strong>晶粒</strong>（Die）。晶粒之間留有窄窄的<strong>切割道</strong>，最後沿著切割道把晶圓切開，再把晶粒封裝起來，就成了我們平常看到的<strong>晶片</strong>（Chip）。</p>\n<p class=\"semi-p\">一片 300 mm 晶圓可以做出幾十顆到上萬顆晶粒，數量取決於晶粒的大小。</p>\n<p class=\"semi-p\"><!-- 圖：晶圓、晶粒、晶片的關係（整片晶圓 → 放大一顆晶粒 → 封裝後的晶片） --></p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"工廠裡的三個基本單位\" class=\"heading-anchor\">工廠裡的三個基本單位<a class=\"anchor-link\" href=\"#工廠裡的三個基本單位\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">在晶圓廠裡，有三個詞幾乎每天都會聽到：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>名詞</th><th>意思</th><th>比喻</th></tr></thead><tbody><tr><td>Lot（批）</td><td>一起移動、一起生產的一組晶圓，最多 25 片，裝在同一個晶圓盒裡</td><td>一盒雞蛋</td></tr><tr><td>Route（流程）</td><td>一個產品從頭到尾要經過的所有步驟和順序</td><td>食譜的步驟清單</td></tr><tr><td>Recipe（配方）</td><td>某個步驟在機台上要用的參數，例如溫度、時間、氣體流量</td><td>烤箱的溫度與時間設定</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"不斷重複的循環\" class=\"heading-anchor\">不斷重複的循環<a class=\"anchor-link\" href=\"#不斷重複的循環\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">前段製程雖然有數百到上千個步驟，但大部分都是同一組動作在反覆循環：</p>\n<p class=\"semi-p\"><strong>鋪上材料 → 用微影定義圖形 → 蝕刻或佈植 → 清洗 → 量測</strong></p>\n<p class=\"semi-p\">就像蓋大樓一樣，每一層都要經過類似的工序，然後再往上蓋下一層。本書第 2 部會逐一介紹這些動作，第 3 部再把它們串成一條完整的流程。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜晶片為什麼不能說加產就加產？</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：市場對某種晶片的需求突然增加。</li><li><strong>做法</strong>：晶片通常要提前好幾個月下單投片，工廠也要提前規劃產能。</li><li><strong>為什麼</strong>：一片晶圓從投片到出貨，前段加上後段往往要三、四個月以上，而且生產線上隨時都有大量還在半路上的晶圓。</li><li><strong>沒做會怎樣</strong>：需求突然增加時，就算立刻投片，也要好幾個月後才拿得到晶片。這也是晶片短缺時，供貨無法馬上恢復的原因之一。</li><li><strong>相關章節</strong>：<a href=\"#node-01\" class=\"semi-link\">第 1 章 晶圓廠如何運作</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜晶圓是圓的，晶片卻是方的</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：晶圓邊緣只放得下不完整的晶粒。</li><li><strong>做法</strong>：設計晶粒在晶圓上的排列方式時，會盡量讓一片晶圓擺進最多顆完整的晶粒。</li><li><strong>為什麼</strong>：晶圓是從圓柱狀的晶棒切下來的，所以是圓的；晶粒則要方形才方便排列和切割。邊緣不完整的晶粒不能當作產品。</li><li><strong>沒做會怎樣</strong>：浪費的面積變多，每顆晶片的成本就變高。這也是產業一直改用更大尺寸晶圓的原因之一。</li><li><strong>相關章節</strong>：<a href=\"#node-03\" class=\"semi-link\">第 3 章 從沙子到晶圓</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>一顆晶片要經過設計、光罩、前段製程、測試、封裝等階段，由不同角色分工完成。</li><li>前段在晶圓上製造電路，後段負責封裝與測試；「前段、後段」也可能指晶圓廠內部的 FEOL 與 BEOL。</li><li>一片晶圓上有很多相同的晶粒，切開並封裝後才成為晶片。</li><li>Lot、Route、Recipe 是晶圓廠最基本的三個單位。</li><li>前段製程是「鋪材料、定義圖形、蝕刻或佈植、清洗、量測」的反覆循環。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Peter Van Zant，《Microchip Fabrication》，第 1 章</li><li>Michael Quirk、Julian Serda，《Semiconductor Manufacturing Technology》，第 1 章</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-01\" class=\"semi-link\">下一章：第 1 章 晶圓廠如何運作 →</a></p>"
  },
  {
    "id": "ch01",
    "part": "第 0 部　開始之前",
    "partId": "part-0",
    "num": 1,
    "shortTitle": "晶圓廠如何運作",
    "fullTitle": "第 1 章　晶圓廠如何運作：無塵室、自動搬運、機台與人",
    "category": "overview",
    "waferTrack": "- 前一站：看完整趟旅程的地圖\r\n- **本章：認識晶圓廠這個「場地」，以及它如何日夜運轉**\r\n- 下一站：認識我們要製造的東西：電晶體",
    "headings": [
      {
        "text": "晶圓廠長什麼樣子",
        "id": "晶圓廠長什麼樣子"
      },
      {
        "text": "無塵室：比手術室還乾淨",
        "id": "無塵室比手術室還乾淨"
      },
      {
        "text": "晶圓怎麼移動：FOUP 與自動搬運",
        "id": "晶圓怎麼移動foup-與自動搬運"
      },
      {
        "text": "機台：工廠的主角",
        "id": "機台工廠的主角"
      },
      {
        "text": "工廠的血液：廠務系統",
        "id": "工廠的血液廠務系統"
      },
      {
        "text": "誰在晶圓廠裡工作",
        "id": "誰在晶圓廠裡工作"
      },
      {
        "text": "工廠怎麼衡量表現",
        "id": "工廠怎麼衡量表現"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-1-章-晶圓廠如何運作無塵室自動搬運機台與人\" class=\"heading-anchor\">第 1 章　晶圓廠如何運作：無塵室、自動搬運、機台與人<a class=\"anchor-link\" href=\"#第-1-章-晶圓廠如何運作無塵室自動搬運機台與人\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：看完整趟旅程的地圖</li><li><strong>本章：認識晶圓廠這個「場地」，以及它如何日夜運轉</strong></li><li>下一站：認識我們要製造的東西：電晶體</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"晶圓廠長什麼樣子\" class=\"heading-anchor\">晶圓廠長什麼樣子<a class=\"anchor-link\" href=\"#晶圓廠長什麼樣子\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶圓廠（Fab）從外面看像一棟巨大的方形建築，裡面大致分成上中下三層：</p>\n<ul class=\"semi-ul\"><li><strong>上層</strong>：巨大的空調與過濾系統，負責把乾淨的空氣送下來</li><li><strong>中層</strong>：無塵室，機台和晶圓都在這裡</li><li><strong>下層</strong>：密密麻麻的管線、真空幫浦和化學品供應設備，支援上面的機台</li></ul>\n<p class=\"semi-p\">真正生產晶圓的無塵室，只是整棟建築的一部分，其他空間都在「服務」它。</p>\n<p class=\"semi-p\"><!-- 圖：晶圓廠剖面示意（上層空調與過濾、中層無塵室、下層管線與附屬設備） --></p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"無塵室比手術室還乾淨\" class=\"heading-anchor\">無塵室：比手術室還乾淨<a class=\"anchor-link\" href=\"#無塵室比手術室還乾淨\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶片上的電路線寬只有幾十奈米甚至更小，一顆比細菌還小的微粒落在晶圓上，就可能讓整顆晶粒報廢。所以晶圓必須在極乾淨的環境中製造。</p>\n<p class=\"semi-p\">一般辦公室的空氣中，每立方英尺有數十萬到上百萬顆 0.5 微米以上的微粒；無塵室的關鍵區域則要壓到個位數以下。空氣從天花板的濾網往下吹，穿過有孔的地板被抽走，讓微粒一直被往下帶走。</p>\n<p class=\"semi-p\">人是無塵室最大的污染源：皮屑、頭髮、汗水、化妝品都會帶來微粒和污染。所以進無塵室前要穿上全身包覆的無塵衣，再經過風淋室吹掉身上的灰塵。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜無塵室（Cleanroom）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：嚴格控制微粒、溫度、濕度與氣流的生產空間，正式名稱是潔淨室。</li><li><strong>現場用法</strong>：「進無塵室前記得換無塵衣」「這區是 Class 1」。</li><li><strong>相關名詞</strong>：無塵衣、風淋室、迷你環境</li><li><strong>常見混淆</strong>：無塵室不是完全沒有灰塵，而是依每單位體積的微粒數量分級。現場仍常用舊標準的「Class 1」「Class 10」來稱呼等級，數字越小越乾淨。</li></ul></div></div>\n<p class=\"semi-p\">現代晶圓廠還有一個重要觀念：<strong>迷你環境</strong>。晶圓大部分時間都待在密封的晶圓盒裡，只有在機台內部才會打開，而機台前端本身也是一個小型的超潔淨空間。所以不需要讓整個廠房都達到最高等級，只要晶圓「經過的地方」夠乾淨就好。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"晶圓怎麼移動foup-與自動搬運\" class=\"heading-anchor\">晶圓怎麼移動：FOUP 與自動搬運<a class=\"anchor-link\" href=\"#晶圓怎麼移動foup-與自動搬運\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">在 300 mm 晶圓廠裡，晶圓裝在一種叫 <strong>FOUP</strong> 的密封盒子裡移動，一盒最多 25 片。裝滿的 FOUP 大約有八公斤重，不適合靠人搬一整天，所以搬運交給自動化系統：</p>\n<ul class=\"semi-ul\"><li><strong>天車（OHT）</strong>：在天花板的軌道上行駛，把 FOUP 從一台機台送到另一台。</li><li><strong>倉儲（Stocker）</strong>：暫時存放還在等待的 FOUP。</li><li><strong>Load Port</strong>：機台前方放 FOUP 的平台，機台從這裡取出晶圓。</li></ul>\n<p class=\"semi-p\"><!-- 圖：天車在天花板軌道上，把 FOUP 放到機台 Load Port 的示意圖 --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜FOUP（Front Opening Unified Pod，前開式晶圓傳送盒）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：300 mm 晶圓廠用來裝載、保護與搬運晶圓的密封盒，最多裝 25 片。</li><li><strong>現場用法</strong>：「那個 FOUP 還在 Stocker 裡，要先叫下來。」</li><li><strong>相關名詞</strong>：Lot、OHT、Stocker、Load Port</li><li><strong>常見混淆</strong>：FOUP 是「盒子」，Lot 是「一批晶圓」。通常一個 Lot 裝在一個 FOUP 裡，但兩者不是同一件事，晶圓也可能換盒。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"機台工廠的主角\" class=\"heading-anchor\">機台：工廠的主角<a class=\"anchor-link\" href=\"#機台工廠的主角\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶圓廠裡有上千台機台，通常依照製程類型分區擺放，例如黃光區（微影）、蝕刻區、爐管區、薄膜區、離子佈植區、CMP 區、濕式清洗區和量測區。</p>\n<p class=\"semi-p\">機台大致分成兩種：</p>\n<ul class=\"semi-ul\"><li><strong>單片式</strong>：一次處理一片晶圓，例如曝光機、大部分的蝕刻機。</li><li><strong>批次式</strong>：一次處理很多片晶圓，例如爐管，一次可以放進上百片。</li></ul>\n<p class=\"semi-p\">機台不會一直在生產。除了正常運轉和待機，它還會定期停下來做<strong>保養</strong>（PM，Preventive Maintenance），也可能突然<strong>故障</strong>（現場叫「Down 機」）。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜保養完的機台不能馬上跑產品</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：機台完成保養，零件換新、腔體清潔過。</li><li><strong>做法</strong>：先跑測試用的晶圓，檢查微粒、膜厚、蝕刻率等是否正常，確認合格後才開放生產。這個確認過程現場常叫「Qual」。</li><li><strong>為什麼</strong>：保養會改變機台內部的狀態，新零件和剛清潔過的腔體不一定馬上穩定。</li><li><strong>沒做會怎樣</strong>：如果機台其實有問題，第一批跑進去的產品晶圓可能整批報廢。</li><li><strong>相關章節</strong>：<a href=\"#node-06\" class=\"semi-link\">第 6 章 蝕刻</a>、<a href=\"#node-15\" class=\"semi-link\">第 15 章 量測與檢測</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"工廠的血液廠務系統\" class=\"heading-anchor\">工廠的血液：廠務系統<a class=\"anchor-link\" href=\"#工廠的血液廠務系統\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">機台要運轉，需要大量穩定的資源供應，這些由<strong>廠務</strong>負責：</p>\n<ul class=\"semi-ul\"><li><strong>超純水</strong>：清洗晶圓用，純度遠高於飲用水，用量非常大。</li><li><strong>特殊氣體與化學品</strong>：很多具有毒性、腐蝕性或易燃性，需要專門的供應與偵測系統。</li><li><strong>電力</strong>：一次極短暫的電壓不穩，就可能讓正在加工的晶圓報廢。</li><li><strong>排氣與廢水處理</strong>：處理製程產生的廢氣與廢液。</li><li><strong>溫濕度與振動控制</strong>：曝光機等精密機台對環境變化非常敏感。</li></ul>\n<p class=\"semi-p\">---</p>\n<h2 id=\"誰在晶圓廠裡工作\" class=\"heading-anchor\">誰在晶圓廠裡工作<a class=\"anchor-link\" href=\"#誰在晶圓廠裡工作\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶圓廠 24 小時、全年無休地運轉，技術員和部分工程師需要輪班。常見的職務如下：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>職務</th><th>主要工作</th></tr></thead><tbody><tr><td>製程工程師（PE）</td><td>負責某一類製程的 Recipe 與品質，處理製程異常</td></tr><tr><td>設備工程師（EE）</td><td>負責機台的保養、維修與穩定運作</td></tr><tr><td>製程整合工程師（PIE）</td><td>從整條流程看產品，協調各製程，確保電性與良率達標</td></tr><tr><td>良率工程師（YE）</td><td>分析良率與缺陷資料，找出良率損失的原因</td></tr><tr><td>製造部（MFG）</td><td>安排生產、操作與監控機台，讓晶圓準時產出</td></tr><tr><td>廠務工程師</td><td>維持水、電、氣體、化學品與無塵室環境的穩定</td></tr><tr><td>品保工程師（QA）</td><td>負責品質系統、可靠度驗證與客戶品質問題</td></tr><tr><td>CIM 工程師</td><td>開發與維護工廠的自動化與資訊系統</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"工廠怎麼衡量表現\" class=\"heading-anchor\">工廠怎麼衡量表現<a class=\"anchor-link\" href=\"#工廠怎麼衡量表現\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶圓廠最常看的三個指標：</p>\n<ul class=\"semi-ul\"><li><strong>生產週期（Cycle Time）</strong>：一批晶圓從投片到完成要花多久。</li><li><strong>良率（Yield）</strong>：做出來的晶片有多少比例是好的。</li><li><strong>產出（Output）</strong>：一段時間內完成多少片晶圓。</li></ul>\n<p class=\"semi-p\">還有一個重要概念是<strong>在製品</strong>（WIP，Work in Process），也就是還在生產線上、尚未完成的晶圓。WIP 越多，每片晶圓排隊等機台的時間就越長，就像車越多，高速公路越塞。</p>\n<p class=\"semi-p\">這麼多晶圓、步驟和機台，不可能靠人記。工廠的資訊系統會記錄每一片晶圓走過的每一站、用了哪台機台、量到什麼數據，這部分在<a href=\"#node-23\" class=\"semi-link\">第 23 章</a>介紹。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜急件越多，工廠越慢</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：有些晶圓被設定為急件（Hot Lot），在每一站都可以優先使用機台。</li><li><strong>做法</strong>：工廠會嚴格限制急件的數量。</li><li><strong>為什麼</strong>：每一批急件插隊，其他晶圓就得多等一下；批次式機台還可能為了急件不等湊滿就開機，降低效率。</li><li><strong>沒做會怎樣</strong>：如果每批都是急件，就等於沒有急件，整座工廠的生產週期反而變長。</li><li><strong>相關章節</strong>：<a href=\"#node-23\" class=\"semi-link\">第 23 章 工廠如何被系統管理</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>晶圓廠分成上中下三層，真正生產的無塵室需要整棟建築的支援。</li><li>無塵室嚴格控制微粒，而人是最大的污染源。</li><li>晶圓裝在 FOUP 裡，由天車和倉儲自動搬運。</li><li>機台分成單片式與批次式，保養後必須確認合格才能生產。</li><li>生產週期、良率和產出是工廠最重要的三個指標，WIP 越多生產週期越長。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Peter Van Zant，《Microchip Fabrication》，污染控制相關章節</li><li>Wallace J. Hopp、Mark L. Spearman，《Factory Physics》，生產週期與在製品的觀念</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-00\" class=\"semi-link\">← 上一章：第 0 章 半導體製造全景</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-02\" class=\"semi-link\">下一章：第 2 章 從物理到電晶體 →</a></p>"
  },
  {
    "id": "ch02",
    "part": "第 1 部　基礎",
    "partId": "part-1",
    "num": 2,
    "shortTitle": "從物理到電晶體",
    "fullTitle": "第 2 章　從物理到電晶體：認識我們要製造的東西",
    "category": "fundamentals",
    "waferTrack": "- 前一站：認識晶圓廠這個場地\r\n- **本章：認識晶圓廠要製造的東西：電晶體**\r\n- 下一站：準備原料，做出一片空白晶圓",
    "headings": [
      {
        "text": "先認識要做的東西",
        "id": "先認識要做的東西"
      },
      {
        "text": "半導體：可以控制的導體",
        "id": "半導體可以控制的導體"
      },
      {
        "text": "摻雜：N 型與 P 型",
        "id": "摻雜n-型與-p-型"
      },
      {
        "text": "MOSFET：晶片裡的開關",
        "id": "mosfet晶片裡的開關"
      },
      {
        "text": "NMOS、PMOS 與 CMOS",
        "id": "nmospmos-與-cmos"
      },
      {
        "text": "從電晶體到晶片",
        "id": "從電晶體到晶片"
      },
      {
        "text": "微縮：越做越小",
        "id": "微縮越做越小"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-2-章-從物理到電晶體認識我們要製造的東西\" class=\"heading-anchor\">第 2 章　從物理到電晶體：認識我們要製造的東西<a class=\"anchor-link\" href=\"#第-2-章-從物理到電晶體認識我們要製造的東西\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：認識晶圓廠這個場地</li><li><strong>本章：認識晶圓廠要製造的東西：電晶體</strong></li><li>下一站：準備原料，做出一片空白晶圓</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"先認識要做的東西\" class=\"heading-anchor\">先認識要做的東西<a class=\"anchor-link\" href=\"#先認識要做的東西\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶片上的電路，說穿了只有兩種東西：<strong>電晶體</strong>和<strong>連接電晶體的金屬導線</strong>。後面幾十個章節介紹的製程，全都是為了把這兩樣東西做出來。</p>\n<p class=\"semi-p\">本章不講深奧的物理，只說明製程需要的程度：電晶體長什麼樣子、為什麼要這樣做。理解了要做的東西，後面每一個製程步驟就比較容易明白它的目的。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"半導體可以控制的導體\" class=\"heading-anchor\">半導體：可以控制的導體<a class=\"anchor-link\" href=\"#半導體可以控制的導體\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">金屬很容易導電，玻璃幾乎不導電，<strong>半導體</strong>的導電能力則介於兩者之間。半導體最重要的特性是：<strong>它的導電能力可以被控制</strong>，例如加入少量的其他元素，或是施加電壓。</p>\n<p class=\"semi-p\">矽是最主要的半導體材料，原因包括：</p>\n<ul class=\"semi-ul\"><li>地球上的含量非常豐富，沙子的主要成分就是矽的氧化物。</li><li>矽的表面可以長出一層穩定的二氧化矽，這是品質很好的絕緣層，製程上非常好用。</li></ul>\n<p class=\"semi-p\">---</p>\n<h2 id=\"摻雜n-型與-p-型\" class=\"heading-anchor\">摻雜：N 型與 P 型<a class=\"anchor-link\" href=\"#摻雜n-型與-p-型\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">純矽的導電能力很差。矽原子最外層有 4 個電子，和旁邊的矽原子緊緊相連。如果加入少量其他元素，情況就不同了：</p>\n<ul class=\"semi-ul\"><li>加入<strong>磷</strong>或<strong>砷</strong>（最外層有 5 個電子）：多出一個可以自由移動的電子，稱為 <strong>N 型</strong>。</li><li>加入<strong>硼</strong>（最外層有 3 個電子）：少了一個電子，留下一個空位，稱為<strong>電洞</strong>，這種矽稱為 <strong>P 型</strong>。</li></ul>\n<p class=\"semi-p\">即使只是在幾百萬個矽原子中加入一個雜質原子，導電能力也會大幅改變。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜摻雜（Doping）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：刻意在半導體中加入少量特定元素，改變它的導電特性。</li><li><strong>現場用法</strong>：「這一區的摻雜濃度偏高」「這層是 N 型摻雜」。</li><li><strong>相關名詞</strong>：N 型、P 型、離子佈植、退火</li><li><strong>常見混淆</strong>：摻雜是刻意、精準控制的加入；不想要的雜質（例如金屬）進入晶圓則是污染，見<a href=\"#node-09\" class=\"semi-link\">第 9 章</a>。</li></ul></div></div>\n<p class=\"semi-p\">當 P 型和 N 型區域相鄰，交界處就形成 <strong>PN 接面</strong>。PN 接面讓電流容易往一個方向流、很難往另一個方向流，這就是二極體的原理，也是電晶體的重要組成。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"mosfet晶片裡的開關\" class=\"heading-anchor\">MOSFET：晶片裡的開關<a class=\"anchor-link\" href=\"#mosfet晶片裡的開關\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">現代晶片中最主要的電晶體是 <strong>MOSFET</strong>。它的構造可以想像成一個水閘門：</p>\n<ul class=\"semi-ul\"><li><strong>源極（Source）</strong>：電流的入口，像水源</li><li><strong>汲極（Drain）</strong>：電流的出口，像出水口</li><li><strong>閘極（Gate）</strong>：控制開關的閘門</li><li><strong>閘極氧化層</strong>：閘極和矽之間一層極薄的絕緣層</li><li><strong>通道（Channel）</strong>：閘極下方、源極和汲極之間的區域</li></ul>\n<p class=\"semi-p\">當閘極加上足夠的電壓，通道就像閘門打開一樣讓電流通過；拿掉電壓，閘門關閉，電流停止。讓閘門打開所需的最低電壓，叫做<strong>臨界電壓</strong>（Vt）。</p>\n<p class=\"semi-p\">開與關，對應到數位世界的 1 和 0。數十億個這樣的開關組合起來，就能做運算和儲存資料。</p>\n<p class=\"semi-p\"><!-- 圖：MOSFET 剖面圖，標出源極、汲極、閘極、閘極氧化層、通道（以編號標示） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜MOSFET（金屬氧化物半導體場效電晶體）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：用閘極電壓控制通道導通與否的電晶體，是現代晶片最基本的元件。</li><li><strong>現場用法</strong>：通常簡稱 MOS，例如「這顆 NMOS 的 Vt 偏高」。</li><li><strong>相關名詞</strong>：NMOS、PMOS、CMOS、臨界電壓</li><li><strong>常見混淆</strong>：名稱中的「金屬、氧化物」來自早期結構。後來閘極改用多晶矽，現在又改回金屬，絕緣層也不只是氧化矽，但名稱一直沿用。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"nmospmos-與-cmos\" class=\"heading-anchor\">NMOS、PMOS 與 CMOS<a class=\"anchor-link\" href=\"#nmospmos-與-cmos\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">MOSFET 有兩種：</p>\n<ul class=\"semi-ul\"><li><strong>NMOS</strong>：靠電子導電，閘極加高電壓時打開。</li><li><strong>PMOS</strong>：靠電洞導電，閘極加低電壓時打開。</li></ul>\n<p class=\"semi-p\">把 NMOS 和 PMOS 成對使用，就是 <strong>CMOS</strong>（互補式金屬氧化物半導體）。CMOS 電路在不切換狀態時，總有一個電晶體是關著的，所以幾乎不耗電。這是 CMOS 成為現代晶片主流的原因。</p>\n<p class=\"semi-p\">對製造來說，CMOS 代表同一片晶圓上要同時做出兩種電晶體：NMOS 做在 P 型區域（P 井），PMOS 做在 N 型區域（N 井）。這就需要多次的微影和離子佈植，分別處理不同區域，見<a href=\"#node-07\" class=\"semi-link\">第 7 章</a>和<a href=\"#node-11\" class=\"semi-link\">第 11 章</a>。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"從電晶體到晶片\" class=\"heading-anchor\">從電晶體到晶片<a class=\"anchor-link\" href=\"#從電晶體到晶片\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">幾個電晶體組成一個邏輯閘，許多邏輯閘組成運算電路，再用好幾層金屬導線把它們連起來，就成了一顆晶片。</p>\n<p class=\"semi-p\">所以晶圓廠的工作可以分成兩大段：先在矽的表面做出電晶體，再在上方一層一層蓋出金屬導線。這就是第 0 章提到的 FEOL 與 BEOL。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"微縮越做越小\" class=\"heading-anchor\">微縮：越做越小<a class=\"anchor-link\" href=\"#微縮越做越小\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">過去幾十年，晶片上的電晶體數量大約每兩年增加一倍，這個趨勢被稱為<strong>摩爾定律</strong>。電晶體越小，就能做得越快、越省電，同一面積放進更多電晶體，每個電晶體的成本也更低。</p>\n<p class=\"semi-p\">但電晶體縮小到一定程度後，問題就出現了：閘極越來越難完全控制通道，關掉時仍有電流漏過去，就像水龍頭關不緊。為了解決這個問題，電晶體的結構從平面走向立體，見<a href=\"#node-12\" class=\"semi-link\">第 12 章</a>。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜同一個製程，可以做出快的和省電的電晶體</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：一顆手機晶片同時需要高速運算，也需要在待機時盡量省電。</li><li><strong>做法</strong>：同一個製程通常會提供幾種不同 Vt 的電晶體：低 Vt 的開關快但漏電多，高 Vt 的開關慢但很省電。設計者可以在同一顆晶片上混合使用。</li><li><strong>為什麼</strong>：不同電路的需求不同，運算核心要速度，待機電路要省電。</li><li><strong>沒做會怎樣</strong>：只能在「全部快但耗電」和「全部省電但慢」之間二選一。代價是每多一種 Vt，就要多幾道微影和佈植步驟，成本也會增加。</li><li><strong>相關章節</strong>：<a href=\"#node-07\" class=\"semi-link\">第 7 章 離子佈植與熱處理</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜製程偏一點，電性就偏一點</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：閘極的線寬做得比目標小了一點。</li><li><strong>做法</strong>：每片晶圓完成前段製程後，都會量測電晶體的電性參數，例如 Vt、導通電流和漏電流。</li><li><strong>為什麼</strong>：線寬、氧化層厚度、摻雜濃度只要稍微改變，電晶體的電性就會跟著改變。電性參數是製程結果最直接的「成績單」。</li><li><strong>沒做會怎樣</strong>：製程慢慢偏移卻沒有發現，最後晶片速度或耗電不符合規格，甚至到客戶端才出問題。</li><li><strong>相關章節</strong>：<a href=\"#node-19\" class=\"semi-link\">第 19 章 晶圓測試</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>晶片由電晶體和金屬導線組成，所有製程都是為了做出這兩樣東西。</li><li>半導體的導電能力可以控制，摻雜讓矽變成 N 型或 P 型。</li><li>MOSFET 是用閘極電壓控制的開關，臨界電壓（Vt）是最重要的參數之一。</li><li>CMOS 把 NMOS 和 PMOS 成對使用，非常省電，但製造時要分別處理兩種區域。</li><li>電晶體越做越小，漏電等問題促使結構從平面走向立體。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>S. M. Sze、M. K. Lee，《Semiconductor Devices: Physics and Technology》</li><li>Michael Quirk、Julian Serda，《Semiconductor Manufacturing Technology》，半導體材料與元件相關章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-01\" class=\"semi-link\">← 上一章：第 1 章 晶圓廠如何運作</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-03\" class=\"semi-link\">下一章：第 3 章 從沙子到晶圓 →</a></p>"
  },
  {
    "id": "ch03",
    "part": "第 1 部　基礎",
    "partId": "part-1",
    "num": 3,
    "shortTitle": "從沙子到晶圓",
    "fullTitle": "第 3 章　從沙子到晶圓：一切的起點",
    "category": "fundamentals",
    "waferTrack": "- 前一站：知道要製造的是電晶體\r\n- **本章：做出一片空白的矽晶圓**\r\n- 下一站：投片進入晶圓廠，開始一連串的製程模組",
    "headings": [
      {
        "text": "一切從沙子開始",
        "id": "一切從沙子開始"
      },
      {
        "text": "從沙子到高純度多晶矽",
        "id": "從沙子到高純度多晶矽"
      },
      {
        "text": "長晶：拉出一根完美的單晶",
        "id": "長晶拉出一根完美的單晶"
      },
      {
        "text": "從晶棒到晶圓",
        "id": "從晶棒到晶圓"
      },
      {
        "text": "晶圓尺寸",
        "id": "晶圓尺寸"
      },
      {
        "text": "特殊晶圓",
        "id": "特殊晶圓"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-3-章-從沙子到晶圓一切的起點\" class=\"heading-anchor\">第 3 章　從沙子到晶圓：一切的起點<a class=\"anchor-link\" href=\"#第-3-章-從沙子到晶圓一切的起點\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：知道要製造的是電晶體</li><li><strong>本章：做出一片空白的矽晶圓</strong></li><li>下一站：投片進入晶圓廠，開始一連串的製程模組</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"一切從沙子開始\" class=\"heading-anchor\">一切從沙子開始<a class=\"anchor-link\" href=\"#一切從沙子開始\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶片的原料是矽，而矽最常見的來源是石英砂。但從沙子到一片可以用來做晶片的晶圓，中間要經過非常嚴格的純化和加工。</p>\n<p class=\"semi-p\">晶圓通常不是由晶圓廠自己做的，而是向專門的<strong>晶圓供應商</strong>購買。晶圓廠拿到的，是一片表面像鏡子一樣平滑、純度極高的空白矽晶圓。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"從沙子到高純度多晶矽\" class=\"heading-anchor\">從沙子到高純度多晶矽<a class=\"anchor-link\" href=\"#從沙子到高純度多晶矽\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li><strong>冶金級矽</strong>：把石英砂和碳一起放進高溫電弧爐，去除氧，得到純度約 98% 到 99% 的矽。這個純度對晶片來說還遠遠不夠。</li><li><strong>純化</strong>：讓矽和氯化氫反應，變成容易揮發的含氯化合物，經過多次蒸餾去除雜質，再在高溫下讓它分解，沉積回固態的矽。</li><li><strong>電子級多晶矽</strong>：純度可以達到 99.999999999%，也就是「11 個 9」，相當於一千億個矽原子中，雜質不到一個。</li></ol>\n<p class=\"semi-p\">這時的矽雖然很純，但原子的排列方向是雜亂的一小塊一小塊，稱為<strong>多晶矽</strong>。晶片需要的是原子排列完全整齊的<strong>單晶矽</strong>，所以還要再經過長晶。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜單晶與多晶（Single Crystal / Polycrystalline）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：單晶是整塊材料的原子都依照同一個方向整齊排列；多晶則是由許多排列方向不同的小晶粒組成。</li><li><strong>現場用法</strong>：「晶圓本身是單晶矽」「這層是 Poly」，Poly 是多晶矽的簡稱。</li><li><strong>相關名詞</strong>：長晶、晶棒、磊晶</li><li><strong>常見混淆</strong>：多晶矽在半導體業有兩種用途，一是長晶用的原料，二是晶片裡的一層薄膜，例如早期的閘極材料。兩者是不同場合的同一種材料。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"長晶拉出一根完美的單晶\" class=\"heading-anchor\">長晶：拉出一根完美的單晶<a class=\"anchor-link\" href=\"#長晶拉出一根完美的單晶\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">最常見的長晶方法是<strong>柴可拉斯基法</strong>（Czochralski，簡稱 CZ 法）：</p>\n<ol class=\"semi-ol\"><li>把多晶矽放進石英坩堝，加熱到 1,400 °C 以上熔化。</li><li>把一小塊單晶矽做成的<strong>晶種</strong>，輕輕接觸熔化的矽。</li><li>一邊旋轉、一邊非常緩慢地往上拉。矽在晶種下方凝固時，會沿著晶種的原子排列方向生長。</li><li>最後拉出一根圓柱狀的單晶<strong>晶棒</strong>。</li></ol>\n<p class=\"semi-p\">一根 300 mm 晶棒可以長達兩公尺左右、重達數百公斤。長晶時還會在熔融的矽中加入少量硼或磷，讓晶圓一開始就是 P 型或 N 型，並且有指定的電阻值。</p>\n<p class=\"semi-p\"><!-- 圖：CZ 長晶示意（坩堝、熔融矽、晶種、旋轉上拉的晶棒） --></p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"從晶棒到晶圓\" class=\"heading-anchor\">從晶棒到晶圓<a class=\"anchor-link\" href=\"#從晶棒到晶圓\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>晶棒整形 → 切片 → 研磨與倒角 → 蝕刻 → 拋光 → 清洗與檢驗</strong></p>\n<ol class=\"semi-ol\"><li><strong>晶棒整形</strong>：切掉頭尾，把外徑磨成標準尺寸，並在側面刻出標示晶格方向的記號。</li><li><strong>切片</strong>：用線鋸把晶棒一次切成數百片。300 mm 晶圓最後的成品厚度大約是 775 微米。</li><li><strong>研磨與倒角</strong>：把表面磨平，並把邊緣磨圓，避免邊緣在後續搬運時崩裂。</li><li><strong>蝕刻</strong>：用化學方式去除切割和研磨時留下的表面損傷層。</li><li><strong>拋光</strong>：把表面拋光到像鏡子一樣平滑。</li><li><strong>清洗與檢驗</strong>：檢查平坦度、微粒和金屬污染，合格後才出貨。</li></ol>\n<p class=\"semi-p\">每片晶圓上還會用雷射刻上一組編號（Wafer ID）。這組編號讓工廠能追蹤每一片晶圓走過的每一站，見<a href=\"#node-23\" class=\"semi-link\">第 23 章</a>。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜晶圓邊緣的小缺口</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：仔細看 300 mm 晶圓，邊緣有一個很小的 V 形缺口，稱為 Notch。</li><li><strong>做法</strong>：機台在處理晶圓前，會先找到 Notch，把晶圓轉到固定的方向。</li><li><strong>為什麼</strong>：矽晶體在不同方向上的性質不同，例如蝕刻速度和電晶體的表現都會受影響。每一層圖形都必須以相同的方向對齊晶格。</li><li><strong>沒做會怎樣</strong>：晶圓方向放錯，圖形的方向和位置就會錯，後續的對準也會失敗。</li><li><strong>相關章節</strong>：<a href=\"#node-04\" class=\"semi-link\">第 4 章 微影</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"晶圓尺寸\" class=\"heading-anchor\">晶圓尺寸<a class=\"anchor-link\" href=\"#晶圓尺寸\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>直徑</th><th>俗稱</th><th>常見用途</th></tr></thead><tbody><tr><td>150 mm</td><td>6 吋</td><td>功率元件、化合物半導體等特殊產品</td></tr><tr><td>200 mm</td><td>8 吋</td><td>成熟製程，例如類比、功率、感測器</td></tr><tr><td>300 mm</td><td>12 吋</td><td>先進邏輯、記憶體，以及大量成熟製程</td></tr></tbody></table></div>\n<p class=\"semi-p\">晶圓越大，一片能做出的晶粒就越多。300 mm 晶圓的面積是 200 mm 的 2.25 倍，但加工一片晶圓的成本並沒有增加那麼多，所以平均每顆晶粒更便宜。產業也曾研究 450 mm 晶圓，但因為設備開發成本太高而沒有普及。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"特殊晶圓\" class=\"heading-anchor\">特殊晶圓<a class=\"anchor-link\" href=\"#特殊晶圓\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">除了一般的拋光晶圓，還有兩種常見的特殊晶圓：</p>\n<ul class=\"semi-ul\"><li><strong>磊晶晶圓</strong>：在拋光晶圓表面再長一層品質更好的單晶矽，見<a href=\"#node-05\" class=\"semi-link\">第 5 章</a>。</li><li><strong>SOI 晶圓</strong>（絕緣層上覆矽）：在一層薄矽下面埋一層絕緣層，可以減少漏電，常用在射頻等特殊產品。</li></ul>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜工廠裡很多晶圓不是產品</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：新人常發現機台裡跑著沒有任何電路的空白晶圓。</li><li><strong>做法</strong>：工廠會使用大量<strong>控片</strong>（Monitor Wafer）檢查機台狀態，例如量測膜厚或微粒；也會用<strong>擋片</strong>（Dummy Wafer）填滿批次式機台的空位。用過的控片和擋片可以研磨後回收再用，稱為再生晶圓。</li><li><strong>為什麼</strong>：不能拿產品晶圓去冒險測試機台，而批次式機台需要放滿晶圓，溫度和氣流才會均勻。</li><li><strong>沒做會怎樣</strong>：機台的問題要等到產品出事才發現，代價是整批產品報廢。</li><li><strong>相關章節</strong>：<a href=\"#node-05\" class=\"semi-link\">第 5 章 薄膜</a>、<a href=\"#node-15\" class=\"semi-link\">第 15 章 量測與檢測</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>晶圓的原料來自石英砂，要純化到「11 個 9」的電子級多晶矽。</li><li>長晶把多晶矽變成原子排列整齊的單晶晶棒，最常用的是 CZ 法。</li><li>晶棒經過切片、研磨、蝕刻、拋光和檢驗，才成為晶圓。</li><li>晶圓越大，每顆晶粒的成本越低，目前最先進的工廠使用 300 mm 晶圓。</li><li>工廠裡除了產品晶圓，還有大量用來監控機台的控片和擋片。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Peter Van Zant，《Microchip Fabrication》，晶體成長與晶圓製備章節</li><li>James D. Plummer、Michael D. Deal、Peter B. Griffin，《Silicon VLSI Technology》，晶體成長章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-02\" class=\"semi-link\">← 上一章：第 2 章 從物理到電晶體</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-04\" class=\"semi-link\">下一章：第 4 章 微影 →</a></p>"
  },
  {
    "id": "ch04",
    "part": "第 2 部　製程模組",
    "partId": "part-2",
    "num": 4,
    "shortTitle": "微影",
    "fullTitle": "第 4 章　微影：把電路圖「印」到晶圓上",
    "category": "modules",
    "waferTrack": "- 前一站：薄膜沉積，晶圓表面已經鋪好一層材料\r\n- **本章：微影，在這層材料上定義出電路圖形**\r\n- 下一站：蝕刻，依照圖形把材料挖出形狀",
    "headings": [
      {
        "text": "為什麼微影這麼重要",
        "id": "為什麼微影這麼重要"
      },
      {
        "text": "微影的三個主角",
        "id": "微影的三個主角"
      },
      {
        "text": "微影的流程",
        "id": "微影的流程"
      },
      {
        "text": "怎麼印得更小",
        "id": "怎麼印得更小"
      },
      {
        "text": "EUV：最先進的微影",
        "id": "euv最先進的微影"
      },
      {
        "text": "對準：每一層都要對得剛好",
        "id": "對準每一層都要對得剛好"
      },
      {
        "text": "常見異常",
        "id": "常見異常"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-4-章-微影把電路圖印到晶圓上\" class=\"heading-anchor\">第 4 章　微影：把電路圖「印」到晶圓上<a class=\"anchor-link\" href=\"#第-4-章-微影把電路圖印到晶圓上\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：薄膜沉積，晶圓表面已經鋪好一層材料</li><li><strong>本章：微影，在這層材料上定義出電路圖形</strong></li><li>下一站：蝕刻，依照圖形把材料挖出形狀</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"為什麼微影這麼重要\" class=\"heading-anchor\">為什麼微影這麼重要<a class=\"anchor-link\" href=\"#為什麼微影這麼重要\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶片上的電路是由幾十層圖形一層一層疊起來的，每一層都要經過一次微影，決定「哪裡留下材料、哪裡去掉材料」。</p>\n<p class=\"semi-p\">微影很像攝影：</p>\n<ul class=\"semi-ul\"><li><strong>光罩</strong>就像底片，上面有電路圖形</li><li><strong>光阻</strong>就像相紙，照到光的地方會起化學變化</li><li><strong>曝光機</strong>就像相機，把光罩上的圖形縮小投影到晶圓上</li></ul>\n<p class=\"semi-p\">不同的是，微影印出來的圖形要精準到奈米等級，而且每一層都要和前一層對得剛剛好。所以微影是整個製程中最昂貴、最關鍵的步驟。</p>\n<p class=\"semi-p\"><!-- 圖：攝影與微影的對照圖（光源、底片／光罩、鏡頭、相紙／光阻） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜微影（Lithography）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：利用光把光罩上的圖形轉移到晶圓光阻上的製程。</li><li><strong>現場用法</strong>：微影區使用黃色照明，現場通常直接叫「黃光」，例如「這批卡在黃光」。</li><li><strong>相關名詞</strong>：光罩、光阻、曝光機</li><li><strong>常見混淆</strong>：微影只負責「定義圖形」，真正把材料挖掉的是下一站的蝕刻。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"微影的三個主角\" class=\"heading-anchor\">微影的三個主角<a class=\"anchor-link\" href=\"#微影的三個主角\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>光罩（Reticle / Mask）</strong>：一片帶有電路圖形的石英板。每一層電路都需要一片自己的光罩，一個先進產品可能需要數十片。曝光機會把光罩上的圖形縮小四倍投影到晶圓上。</p>\n<p class=\"semi-p\"><strong>光阻（Photoresist，簡稱 PR）</strong>：一種對光敏感的材料。塗在晶圓上曝光後，照到光的區域化學性質會改變，再用顯影液溶掉一部分，留下圖形。</p>\n<p class=\"semi-p\"><strong>曝光機（Scanner）</strong>：一次曝光晶圓上的一小塊區域（稱為一個<strong>曝光區</strong>），曝完一塊再移到下一塊，一片晶圓要重複上百次才能曝完。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"微影的流程\" class=\"heading-anchor\">微影的流程<a class=\"anchor-link\" href=\"#微影的流程\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">微影不只是「曝光」一個動作，而是一連串步驟。負責塗佈和顯影的機台會和曝光機直接相連，晶圓在中間自動傳送。</p>\n<p class=\"semi-p\"><strong>表面處理 → 塗佈光阻 → 軟烤 → 對準與曝光 → 曝後烤 → 顯影 → 檢查</strong></p>\n<ol class=\"semi-ol\"><li><strong>表面處理</strong>：讓晶圓表面變得容易讓光阻附著。</li><li><strong>塗佈光阻</strong>：把光阻滴在晶圓中心，高速旋轉讓它均勻攤開。</li><li><strong>軟烤</strong>：加熱趕走光阻裡的溶劑。</li><li><strong>對準與曝光</strong>：先找到前一層留下的對準記號，確定位置後再曝光。</li><li><strong>曝後烤</strong>：加熱讓光阻的化學反應完成，溫度和時間會直接影響圖形尺寸。</li><li><strong>顯影</strong>：用顯影液溶掉不要的光阻，圖形就出現了。</li><li><strong>檢查（ADI）</strong>：量測圖形的尺寸、對準程度，以及有沒有缺陷。</li></ol>\n<p class=\"semi-p\"><!-- 圖：微影流程示意（塗佈、曝光、顯影三個階段的晶圓剖面） --></p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜微影是「可以重來」的最後機會</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：檢查發現圖形尺寸或對準不合格。</li><li><strong>做法</strong>：把光阻全部去掉，重新塗佈、曝光，這叫 <strong>Rework</strong>。</li><li><strong>為什麼</strong>：這時晶圓上只多了一層光阻，底下的材料還沒被動過。</li><li><strong>沒做會怎樣</strong>：一旦進入蝕刻，錯誤的圖形就會永久刻進材料裡，晶圓可能只能報廢。所以工廠的系統會在檢查不合格時自動擋下這批晶圓。</li><li><strong>相關章節</strong>：<a href=\"#node-06\" class=\"semi-link\">第 6 章 蝕刻</a>、<a href=\"#node-18\" class=\"semi-link\">第 18 章 異常處理與工程變更</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"怎麼印得更小\" class=\"heading-anchor\">怎麼印得更小<a class=\"anchor-link\" href=\"#怎麼印得更小\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">想印出更細的圖形，最直接的方法是<strong>用波長更短的光</strong>，就像用更細的筆可以寫出更小的字。</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>光源</th><th>波長</th></tr></thead><tbody><tr><td>汞燈</td><td>436、365 nm</td></tr><tr><td>KrF 雷射（DUV）</td><td>248 nm</td></tr><tr><td>ArF 雷射（DUV）</td><td>193 nm</td></tr><tr><td>EUV（極紫外光）</td><td>13.5 nm</td></tr></tbody></table></div>\n<p class=\"semi-p\">193 nm 用了很多年，產業在這期間也發展出各種技巧繼續往下縮：</p>\n<ul class=\"semi-ul\"><li><strong>浸潤式微影</strong>：在鏡頭和晶圓之間加一層水，讓解析能力再提升。</li><li><strong>OPC</strong>：光通過極小的圖形時會變形，所以故意把光罩上的圖形畫歪，讓它印出來剛好正確。</li><li><strong>多重曝光</strong>：一次印不出來，就拆成兩次或更多次來做，代價是步驟和成本都增加。</li></ul>\n<p class=\"semi-p\">---</p>\n<h2 id=\"euv最先進的微影\" class=\"heading-anchor\">EUV：最先進的微影<a class=\"anchor-link\" href=\"#euv最先進的微影\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">EUV 的波長只有 13.5 nm，可以印出極細的圖形，但它非常難做：空氣和玻璃都會吸收 EUV，所以整台機器的光路必須在真空中，而且不能用透鏡，只能用特殊的反射鏡。EUV 從研究到量產花了二十多年。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜EUV（Extreme Ultraviolet，極紫外光微影）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：使用 13.5 nm 波長光源的微影技術，最先進製程的關鍵層都依賴它。</li><li><strong>現場用法</strong>：「這層是 EUV 層」代表這層圖形最細、成本最高。</li><li><strong>相關名詞</strong>：DUV（深紫外光，指 248 nm 和 193 nm 的光源）、反射式光罩</li><li><strong>常見混淆</strong>：一個產品並不是每層都用 EUV，只有最關鍵的幾層才用，其他層仍然用 DUV 以控制成本。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"對準每一層都要對得剛好\" class=\"heading-anchor\">對準：每一層都要對得剛好<a class=\"anchor-link\" href=\"#對準每一層都要對得剛好\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">電路一層疊一層，例如金屬線必須準確接到下面的接觸點。如果某一層偏掉了，上下層就接不起來，電路會斷路或短路。</p>\n<p class=\"semi-p\">在先進製程中，層與層之間容許的對準誤差只有幾奈米，大約是幾十個原子的寬度。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜CD 與 Overlay</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：CD（Critical Dimension，關鍵尺寸）是圖形最需要控制的尺寸，例如線寬；Overlay 是這一層和前一層的對準誤差。</li><li><strong>現場用法</strong>：「CD 偏大 2 nm」「Overlay 往 X 方向偏」，這是微影工程師最常講的兩個詞。</li><li><strong>相關名詞</strong>：ADI、對準記號</li><li><strong>常見混淆</strong>：CD 不等於製程節點的「幾奈米」，見<a href=\"#node-14\" class=\"semi-link\">第 14 章</a>。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見異常\" class=\"heading-anchor\">常見異常<a class=\"anchor-link\" href=\"#常見異常\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>異常</th><th>可能原因</th><th>結果</th></tr></thead><tbody><tr><td>CD 偏大或偏小</td><td>曝光能量偏移、曝後烤異常</td><td>線寬不合格</td></tr><tr><td>局部失焦</td><td>晶圓背面有顆粒把晶圓頂高</td><td>局部圖形模糊</td></tr><tr><td>Overlay 超規</td><td>機台對準誤差、晶圓變形</td><td>上下層接不上</td></tr><tr><td>光阻缺陷</td><td>塗佈時有氣泡或顆粒</td><td>圖形缺損</td></tr></tbody></table></div>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜為什麼微影區是黃色的？</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：第一次進晶圓廠的人，常會注意到微影區的燈光是黃色的。</li><li><strong>做法</strong>：微影區的照明會濾掉短波長的光，只留下黃光。</li><li><strong>為什麼</strong>：光阻對紫外光和藍光敏感，一般白光就足以讓它起反應，黃光則幾乎不會。</li><li><strong>沒做會怎樣</strong>：還沒曝光的光阻被環境光照到，圖形品質會變差。</li><li><strong>相關章節</strong>：<a href=\"#node-01\" class=\"semi-link\">第 1 章 晶圓廠如何運作</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>微影負責在晶圓上定義圖形，每一層電路都要經過一次。</li><li>流程包括塗佈光阻、曝光、顯影和檢查，不只是曝光一個動作。</li><li>波長越短，能印的圖形越細，最先進的是 EUV。</li><li>CD 看尺寸、Overlay 看對準，是微影最重要的兩個指標。</li><li>微影是唯一可以重來的關卡，一旦進入蝕刻就無法挽回。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Peter Van Zant，《Microchip Fabrication》，微影相關章節</li><li>James D. Plummer、Michael D. Deal、Peter B. Griffin，《Silicon VLSI Technology》，微影章節</li><li>Chris Mack，《Fundamental Principles of Optical Lithography》</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-03\" class=\"semi-link\">← 上一章：第 3 章 從沙子到晶圓</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-05\" class=\"semi-link\">下一章：第 5 章 薄膜 →</a></p>"
  },
  {
    "id": "ch05",
    "part": "第 2 部　製程模組",
    "partId": "part-2",
    "num": 5,
    "shortTitle": "薄膜",
    "fullTitle": "第 5 章　薄膜：一層一層鋪上材料",
    "category": "modules",
    "waferTrack": "- 前一站：清洗，晶圓表面已經處理乾淨\r\n- **本章：薄膜沉積，在晶圓表面鋪上一層新材料**\r\n- 下一站：微影，在這層材料上定義圖形",
    "headings": [
      {
        "text": "為什麼需要薄膜",
        "id": "為什麼需要薄膜"
      },
      {
        "text": "熱氧化：讓矽自己長出氧化層",
        "id": "熱氧化讓矽自己長出氧化層"
      },
      {
        "text": "CVD：用氣體「長」出薄膜",
        "id": "cvd用氣體長出薄膜"
      },
      {
        "text": "PVD：把原子「撞」下來",
        "id": "pvd把原子撞下來"
      },
      {
        "text": "ALD：一次只鋪一層原子",
        "id": "ald一次只鋪一層原子"
      },
      {
        "text": "磊晶：長出延續晶格的單晶",
        "id": "磊晶長出延續晶格的單晶"
      },
      {
        "text": "薄膜要看哪些指標",
        "id": "薄膜要看哪些指標"
      },
      {
        "text": "常見異常",
        "id": "常見異常"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-5-章-薄膜一層一層鋪上材料\" class=\"heading-anchor\">第 5 章　薄膜：一層一層鋪上材料<a class=\"anchor-link\" href=\"#第-5-章-薄膜一層一層鋪上材料\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：清洗，晶圓表面已經處理乾淨</li><li><strong>本章：薄膜沉積，在晶圓表面鋪上一層新材料</strong></li><li>下一站：微影，在這層材料上定義圖形</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"為什麼需要薄膜\" class=\"heading-anchor\">為什麼需要薄膜<a class=\"anchor-link\" href=\"#為什麼需要薄膜\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶片是由許多層不同的材料疊起來的，每一層都是一層<strong>薄膜</strong>，厚度從幾個原子到幾微米不等。這些薄膜各有用途：</p>\n<ul class=\"semi-ul\"><li><strong>絕緣</strong>：例如氧化矽、氮化矽，把導線和元件隔開</li><li><strong>導電</strong>：例如金屬和多晶矽，用來傳遞訊號</li><li><strong>輔助製程</strong>：例如硬遮罩、蝕刻停止層，幫助後續步驟做得更準</li></ul>\n<p class=\"semi-p\">可以把薄膜想像成在蛋糕上一層一層抹上不同的餡料，只是每一層的厚度都要精準到奈米，甚至原子等級。</p>\n<p class=\"semi-p\">鋪薄膜的方法有好幾種，各有適合的材料和場合。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"熱氧化讓矽自己長出氧化層\" class=\"heading-anchor\">熱氧化：讓矽自己長出氧化層<a class=\"anchor-link\" href=\"#熱氧化讓矽自己長出氧化層\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">把晶圓放進高溫的<strong>爐管</strong>中，通入氧氣或水蒸氣，矽表面就會和氧反應，長出一層二氧化矽。</p>\n<ul class=\"semi-ul\"><li><strong>乾式氧化</strong>：使用氧氣，生長慢，但品質非常好。</li><li><strong>濕式氧化</strong>：使用水蒸氣，生長快，適合需要較厚氧化層的地方。</li></ul>\n<p class=\"semi-p\">熱氧化的特別之處是，氧化層是「吃掉」一部分矽長出來的，所以和矽之間的介面品質特別好。爐管屬於批次式機台，一次可以處理上百片晶圓。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"cvd用氣體長出薄膜\" class=\"heading-anchor\">CVD：用氣體「長」出薄膜<a class=\"anchor-link\" href=\"#cvd用氣體長出薄膜\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>化學氣相沉積</strong>（CVD）是用途最廣的薄膜方法：把幾種氣體通進腔體，讓它們在晶圓表面發生化學反應，留下固態的薄膜，反應後的廢氣則被抽走。這有點像冬天窗戶上結霜，氣體在表面變成固體；不同的是，CVD 靠的是化學反應，而不只是單純的凝結。</p>\n<p class=\"semi-p\">依照提供反應能量的方式，常見的 CVD 有兩種：</p>\n<ul class=\"semi-ul\"><li><strong>LPCVD</strong>（低壓 CVD）：靠高溫提供能量，薄膜均勻、品質好，但溫度高。</li><li><strong>PECVD</strong>（電漿輔助 CVD）：用電漿提供能量，可以在較低溫度下沉積，適合已經有金屬的晶圓，因為金屬承受不了高溫。</li></ul>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜CVD（Chemical Vapor Deposition，化學氣相沉積）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：讓氣體在晶圓表面發生化學反應，形成固態薄膜的方法。</li><li><strong>現場用法</strong>：「這層氮化矽是 CVD 長的」，現場常把沉積薄膜說成「長膜」。</li><li><strong>相關名詞</strong>：LPCVD、PECVD、ALD、磊晶</li><li><strong>常見混淆</strong>：CVD 是一大類方法的總稱。ALD 和磊晶從原理上看也屬於 CVD 的特殊形式，但現場通常把它們當成獨立的製程來稱呼。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"pvd把原子撞下來\" class=\"heading-anchor\">PVD：把原子「撞」下來<a class=\"anchor-link\" href=\"#pvd把原子撞下來\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>物理氣相沉積</strong>（PVD）最常見的形式是<strong>濺鍍</strong>：在真空腔體中，用帶電的氬離子撞擊一塊材料（稱為<strong>靶材</strong>），被撞出來的原子飛到晶圓上，堆積成薄膜。就像用撞球去撞一堆球，被撞飛的球落到晶圓上。</p>\n<p class=\"semi-p\">PVD 主要用來沉積金屬，例如鋁、鈦、氮化鈦，以及銅製程中的阻障層和晶種層，見<a href=\"#node-10\" class=\"semi-link\">第 10 章</a>。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"ald一次只鋪一層原子\" class=\"heading-anchor\">ALD：一次只鋪一層原子<a class=\"anchor-link\" href=\"#ald一次只鋪一層原子\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>原子層沉積</strong>（ALD）把兩種反應氣體輪流通入：第一種氣體會在表面鋪滿一層後就自動停止，抽乾淨後再通第二種氣體與它反應。每一輪只長出大約一層原子厚的薄膜。</p>\n<p class=\"semi-p\">這就像鋪磁磚，一次鋪一層，鋪滿了就自然停下來。ALD 的薄膜極度均勻，連深孔的側壁和底部都能鋪得一樣厚，但速度很慢，所以只用在需要極薄、極精準的地方，例如先進電晶體的閘極絕緣層。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"磊晶長出延續晶格的單晶\" class=\"heading-anchor\">磊晶：長出延續晶格的單晶<a class=\"anchor-link\" href=\"#磊晶長出延續晶格的單晶\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>磊晶</strong>是一種特殊的 CVD，新長出的薄膜會延續底下晶圓的原子排列，成為單晶。磊晶除了用來做磊晶晶圓，也用在先進電晶體中，例如交替堆疊的矽與矽鍺層，見<a href=\"#node-12\" class=\"semi-link\">第 12 章</a>。</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>方法</th><th>原理</th><th>典型用途</th><th>特點</th></tr></thead><tbody><tr><td>熱氧化</td><td>矽和氧反應</td><td>高品質氧化層</td><td>品質好，需要高溫</td></tr><tr><td>CVD</td><td>氣體在表面反應</td><td>氧化矽、氮化矽、多晶矽、鎢</td><td>用途最廣</td></tr><tr><td>PVD</td><td>撞出靶材的原子</td><td>金屬、阻障層</td><td>適合金屬，深孔較難覆蓋</td></tr><tr><td>ALD</td><td>一次一層原子</td><td>極薄膜、閘極絕緣層</td><td>最均勻，但速度慢</td></tr><tr><td>磊晶</td><td>延續晶格生長</td><td>磊晶矽、矽鍺</td><td>可以長出單晶</td></tr></tbody></table></div>\n<p class=\"semi-p\"><!-- 圖：四種沉積方式的示意對照（熱氧化、CVD、PVD、ALD） --></p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"薄膜要看哪些指標\" class=\"heading-anchor\">薄膜要看哪些指標<a class=\"anchor-link\" href=\"#薄膜要看哪些指標\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li><strong>膜厚</strong>：厚度是否符合目標。</li><li><strong>均勻度</strong>：同一片晶圓不同位置、不同晶圓之間的厚度是否一致。</li><li><strong>階梯覆蓋</strong>：在高低不平的表面上，薄膜能不能均勻地蓋住。</li><li><strong>應力</strong>：薄膜內部的拉扯力量，太大會讓晶圓翹曲或薄膜剝落。</li><li><strong>微粒</strong>：沉積過程中有沒有帶進顆粒。</li></ul>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\">[!NOTE]</p>\n<p class=\"semi-p\"><strong>📖 名詞｜階梯覆蓋（Step Coverage）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：在有溝槽或孔洞的表面上，薄膜在頂部、側壁和底部的厚度是否一致。</li><li><strong>現場用法</strong>：「這個孔的覆蓋不好，底部太薄。」</li><li><strong>相關名詞</strong>：保形性（Conformality）、深寬比、空洞（Void）</li><li><strong>常見混淆</strong>：覆蓋均勻不一定是好事。要把窄溝填滿時，如果側壁同時長厚，開口可能先被封住，裡面就留下空洞，所以填溝時反而希望從底部往上長。</li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜清洗完要趕快進爐管</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：晶圓完成爐前清洗，正在等待進入氧化爐管。</li><li><strong>做法</strong>：兩站之間設定等待時間上限（Q-Time），超過時間就必須重新清洗。</li><li><strong>為什麼</strong>：清洗後的矽表面很「新鮮」，放久了會重新長出一層原生氧化層，也會吸附空氣中的污染物。</li><li><strong>沒做會怎樣</strong>：長出來的氧化層品質變差，影響電晶體的電性和可靠度。</li><li><strong>相關章節</strong>：<a href=\"#node-09\" class=\"semi-link\">第 9 章 清洗與污染控制</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜爐管一次決定上百片晶圓的命運</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：爐管一次處理好幾批晶圓，一跑就是好幾個小時。</li><li><strong>做法</strong>：進爐前，系統會檢查同一爐的晶圓是否都在相同步驟、使用相同的 Recipe；爐內也會放幾片控片，事後量測膜厚，確認這一爐的結果。</li><li><strong>為什麼</strong>：批次式機台一旦開始就無法中途修正，而且薄膜沉積通常無法重做。</li><li><strong>沒做會怎樣</strong>：只要一個設定出錯，同一爐的好幾批晶圓會同時受影響。</li><li><strong>相關章節</strong>：<a href=\"#node-23\" class=\"semi-link\">第 23 章 工廠如何被系統管理</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見異常\" class=\"heading-anchor\">常見異常<a class=\"anchor-link\" href=\"#常見異常\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>異常</th><th>可能原因</th><th>結果</th></tr></thead><tbody><tr><td>膜厚偏厚或偏薄</td><td>溫度、時間或氣體流量偏移</td><td>影響電性與後續蝕刻</td></tr><tr><td>均勻度差</td><td>腔體內的氣流或溫度分佈不均</td><td>晶圓不同位置的晶粒表現不同</td></tr><tr><td>微粒</td><td>腔體內壁的沉積物剝落</td><td>缺陷、良率下降</td></tr><tr><td>薄膜剝落或龜裂</td><td>應力太大、附著力不足</td><td>結構損壞</td></tr><tr><td>空洞</td><td>填溝時開口先被封住</td><td>斷路或可靠度問題</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>晶片由許多層薄膜組成，分別負責絕緣、導電和輔助製程。</li><li>熱氧化讓矽直接長出高品質氧化層，CVD 用氣體反應沉積各種材料。</li><li>PVD 主要用來沉積金屬，ALD 一次一層原子，最均勻但最慢。</li><li>磊晶可以長出延續晶格的單晶薄膜。</li><li>膜厚、均勻度、階梯覆蓋和應力，是判斷薄膜好壞的主要指標。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Peter Van Zant，《Microchip Fabrication》，氧化與沉積相關章節</li><li>Hong Xiao，《Introduction to Semiconductor Manufacturing Technology》，CVD 與 PVD 章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-04\" class=\"semi-link\">← 上一章：第 4 章 微影</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-06\" class=\"semi-link\">下一章：第 6 章 蝕刻 →</a></p>"
  },
  {
    "id": "ch06",
    "part": "第 2 部　製程模組",
    "partId": "part-2",
    "num": 6,
    "shortTitle": "蝕刻",
    "fullTitle": "第 6 章　蝕刻：照著圖形把材料挖掉",
    "category": "modules",
    "waferTrack": "- 前一站：微影，光阻上已經有電路圖形\r\n- **本章：蝕刻，照著光阻的圖形把底下的材料挖掉**\r\n- 下一站：去除光阻、清洗，然後量測",
    "headings": [
      {
        "text": "蝕刻在做什麼",
        "id": "蝕刻在做什麼"
      },
      {
        "text": "濕蝕刻與乾蝕刻",
        "id": "濕蝕刻與乾蝕刻"
      },
      {
        "text": "電漿：蝕刻的工具",
        "id": "電漿蝕刻的工具"
      },
      {
        "text": "蝕刻要看哪些指標",
        "id": "蝕刻要看哪些指標"
      },
      {
        "text": "怎麼知道什麼時候該停",
        "id": "怎麼知道什麼時候該停"
      },
      {
        "text": "蝕刻之後",
        "id": "蝕刻之後"
      },
      {
        "text": "越挖越深：高深寬比蝕刻",
        "id": "越挖越深高深寬比蝕刻"
      },
      {
        "text": "常見異常",
        "id": "常見異常"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-6-章-蝕刻照著圖形把材料挖掉\" class=\"heading-anchor\">第 6 章　蝕刻：照著圖形把材料挖掉<a class=\"anchor-link\" href=\"#第-6-章-蝕刻照著圖形把材料挖掉\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：微影，光阻上已經有電路圖形</li><li><strong>本章：蝕刻，照著光阻的圖形把底下的材料挖掉</strong></li><li>下一站：去除光阻、清洗，然後量測</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"蝕刻在做什麼\" class=\"heading-anchor\">蝕刻在做什麼<a class=\"anchor-link\" href=\"#蝕刻在做什麼\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">微影完成後，電路圖形只存在於光阻上。<strong>蝕刻</strong>的任務，是把這個圖形「轉印」到底下的材料：被光阻蓋住的地方受到保護，沒有被蓋住的地方就被去除。</p>\n<p class=\"semi-p\">可以想像在玻璃上貼一張鏤空的貼紙，再用噴砂把沒有被貼住的地方磨掉。撕掉貼紙後，圖案就留在玻璃上了。光阻就是那張貼紙。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"濕蝕刻與乾蝕刻\" class=\"heading-anchor\">濕蝕刻與乾蝕刻<a class=\"anchor-link\" href=\"#濕蝕刻與乾蝕刻\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>濕蝕刻</strong>是把晶圓泡在化學溶液中，讓溶液溶掉材料，例如用氫氟酸溶掉氧化矽。濕蝕刻往各個方向的速度都差不多，會從側面往光阻底下「吃」進去，所以不適合做很細的圖形，通常用在去除整層材料或清洗。</p>\n<p class=\"semi-p\"><strong>乾蝕刻</strong>則是用<strong>電漿</strong>來蝕刻。帶電的離子被電場加速，幾乎垂直地撞向晶圓，所以主要往下挖，可以做出筆直的側壁。現代晶片的細微圖形，幾乎都靠乾蝕刻完成。</p>\n<p class=\"semi-p\"><!-- 圖：等向蝕刻與非等向蝕刻的剖面對照（側壁形狀、光阻下方的側蝕） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜等向與非等向（Isotropic / Anisotropic）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：等向蝕刻往各方向的速度相同；非等向蝕刻主要往單一方向（通常是往下）進行。</li><li><strong>現場用法</strong>：「這道要非等向，側壁要直。」</li><li><strong>相關名詞</strong>：乾蝕刻、濕蝕刻、側蝕、輪廓</li><li><strong>常見混淆</strong>：乾蝕刻不一定都是非等向。有些乾蝕刻會刻意調成等向，用來從側面去除材料，結果取決於製程條件。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"電漿蝕刻的工具\" class=\"heading-anchor\">電漿：蝕刻的工具<a class=\"anchor-link\" href=\"#電漿蝕刻的工具\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>電漿</strong>是氣體被高能量激發後的狀態，裡面混合了離子、電子和非常活潑的原子團，常被稱為物質的第四態。蝕刻機台在真空腔體中通入特定氣體，再用射頻電力把它變成電漿，腔體裡會發出微弱的光。</p>\n<p class=\"semi-p\">電漿中的活潑原子團負責和材料發生化學反應，離子則負責提供方向，兩者合作，才能又快又準地往下挖。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"蝕刻要看哪些指標\" class=\"heading-anchor\">蝕刻要看哪些指標<a class=\"anchor-link\" href=\"#蝕刻要看哪些指標\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li><strong>蝕刻率</strong>：每分鐘可以挖多深。</li><li><strong>均勻度</strong>：晶圓上不同位置挖得是否一樣。</li><li><strong>選擇比</strong>：要挖的材料和不想挖的材料，蝕刻速度差多少。</li><li><strong>輪廓</strong>：側壁是不是筆直，有沒有往內縮或往外凸。</li><li><strong>CD 變化</strong>：蝕刻後的線寬和微影後相比，變了多少。</li></ul>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜選擇比（Selectivity）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：目標材料的蝕刻速度，和其他材料蝕刻速度的比值。選擇比越高，越能只挖想挖的材料。</li><li><strong>現場用法</strong>：「這道對氮化矽的選擇比不夠，停止層被吃穿了。」</li><li><strong>相關名詞</strong>：蝕刻停止層、過度蝕刻、光阻消耗</li><li><strong>常見混淆</strong>：講選擇比時一定要說清楚是「對什麼材料」。對光阻的選擇比和對下層材料的選擇比，是兩個不同的數字。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"怎麼知道什麼時候該停\" class=\"heading-anchor\">怎麼知道什麼時候該停<a class=\"anchor-link\" href=\"#怎麼知道什麼時候該停\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">蝕刻挖穿目標材料、碰到下一層時，電漿中的化學成分會改變，發出的光的顏色和強度也跟著改變。機台持續監測這個光，就能判斷什麼時候挖到底了，這叫做<strong>終點偵測</strong>（Endpoint Detection）。</p>\n<p class=\"semi-p\">到達終點後，通常還會再多蝕刻一點點，確保整片晶圓上的材料都清乾淨，這叫<strong>過度蝕刻</strong>（Over Etch）。挖不夠會留下殘留，挖太多則會傷到下層。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"蝕刻之後\" class=\"heading-anchor\">蝕刻之後<a class=\"anchor-link\" href=\"#蝕刻之後\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">蝕刻完成後，先用氧電漿把光阻燒掉，稱為<strong>去光阻</strong>（Ashing 或 Strip），再經過清洗，接著量測線寬和缺陷，這個檢查稱為 <strong>AEI</strong>（After Etch Inspection）。</p>\n<p class=\"semi-p\">和微影不同，蝕刻做壞了通常無法重來，因為材料已經被挖掉了。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"越挖越深高深寬比蝕刻\" class=\"heading-anchor\">越挖越深：高深寬比蝕刻<a class=\"anchor-link\" href=\"#越挖越深高深寬比蝕刻\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">記憶體等產品需要挖出非常深又非常窄的孔，深度可以是寬度的數十倍。孔越深，離子越難抵達底部，蝕刻速度會變慢，孔也可能變彎、扭曲，或是中段被挖得比較寬。這是目前最困難的製程之一，見<a href=\"#node-13\" class=\"semi-link\">第 13 章</a>。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜清潔完的腔體要先「養」一下</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：蝕刻腔體剛做完保養，內壁被清潔得乾乾淨淨。</li><li><strong>做法</strong>：先跑一些擋片，讓腔體內壁蓋上一層穩定的沉積物，再開始跑產品。這個步驟現場叫 <strong>Seasoning</strong>。</li><li><strong>為什麼</strong>：電漿會和腔體內壁互相作用。內壁的狀態不同，電漿的成分就不同，蝕刻率也會跟著變。</li><li><strong>沒做會怎樣</strong>：保養後的前幾批晶圓蝕刻結果偏移，可能造成線寬或深度異常。</li><li><strong>相關章節</strong>：<a href=\"#node-01\" class=\"semi-link\">第 1 章 晶圓廠如何運作</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜同一台機台，不同腔體也要比對</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：一台蝕刻機通常有好幾個腔體，同一批晶圓會分散到不同腔體處理。</li><li><strong>做法</strong>：工程師會定期比對各腔體的結果，讓它們盡量一致，系統也會記錄每片晶圓是在哪個腔體做的。</li><li><strong>為什麼</strong>：腔體之間的微小差異，會讓晶圓之間出現系統性的差異。</li><li><strong>沒做會怎樣</strong>：同一批晶圓中有幾片表現特別差，卻查不出原因。有腔體紀錄，才能找出「問題都出在同一個腔體」。</li><li><strong>相關章節</strong>：<a href=\"#node-16\" class=\"semi-link\">第 16 章 良率與故障分析</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見異常\" class=\"heading-anchor\">常見異常<a class=\"anchor-link\" href=\"#常見異常\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>異常</th><th>可能原因</th><th>結果</th></tr></thead><tbody><tr><td>蝕刻不足</td><td>時間或功率不足、終點判斷錯誤</td><td>殘留材料，造成斷路</td></tr><tr><td>過度蝕刻</td><td>選擇比不足、時間太長</td><td>傷到下層材料</td></tr><tr><td>CD 偏移</td><td>側壁輪廓改變、光阻消耗太多</td><td>線寬不合格</td></tr><tr><td>微粒</td><td>腔體內壁的沉積物剝落</td><td>缺陷、短路</td></tr><tr><td>負載效應</td><td>圖形密的地方和疏的地方蝕刻速度不同</td><td>同一顆晶粒內深度不一致</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>蝕刻把光阻上的圖形轉印到底下的材料上。</li><li>濕蝕刻是等向的，乾蝕刻用電漿可以做到非等向，現代細微圖形主要靠乾蝕刻。</li><li>選擇比決定能不能「只挖想挖的材料」。</li><li>終點偵測透過電漿發出的光，判斷什麼時候該停。</li><li>蝕刻做壞通常無法重來，所以腔體狀態的管理特別重要。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Peter Van Zant，《Microchip Fabrication》，蝕刻相關章節</li><li>James D. Plummer、Michael D. Deal、Peter B. Griffin，《Silicon VLSI Technology》，蝕刻章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-05\" class=\"semi-link\">← 上一章：第 5 章 薄膜</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-07\" class=\"semi-link\">下一章：第 7 章 離子佈植與熱處理 →</a></p>"
  },
  {
    "id": "ch07",
    "part": "第 2 部　製程模組",
    "partId": "part-2",
    "num": 7,
    "shortTitle": "離子佈植與熱處理",
    "fullTitle": "第 7 章　離子佈植與熱處理：改變矽的電性",
    "category": "modules",
    "waferTrack": "- 前一站：微影，光阻已經擋住不需要佈植的區域\r\n- **本章：離子佈植與退火，在指定區域加入雜質，改變電性**\r\n- 下一站：去除光阻、清洗",
    "headings": [
      {
        "text": "為什麼要佈植",
        "id": "為什麼要佈植"
      },
      {
        "text": "佈植機怎麼運作",
        "id": "佈植機怎麼運作"
      },
      {
        "text": "兩個最重要的參數",
        "id": "兩個最重要的參數"
      },
      {
        "text": "退火：修復與活化",
        "id": "退火修復與活化"
      },
      {
        "text": "熱預算：加熱是有額度的",
        "id": "熱預算加熱是有額度的"
      },
      {
        "text": "常見異常",
        "id": "常見異常"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-7-章-離子佈植與熱處理改變矽的電性\" class=\"heading-anchor\">第 7 章　離子佈植與熱處理：改變矽的電性<a class=\"anchor-link\" href=\"#第-7-章-離子佈植與熱處理改變矽的電性\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：微影，光阻已經擋住不需要佈植的區域</li><li><strong>本章：離子佈植與退火，在指定區域加入雜質，改變電性</strong></li><li>下一站：去除光阻、清洗</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"為什麼要佈植\" class=\"heading-anchor\">為什麼要佈植<a class=\"anchor-link\" href=\"#為什麼要佈植\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">第 2 章提到，矽要加入少量雜質才會變成 N 型或 P 型。電晶體需要很多不同的摻雜區域，例如 N 井、P 井、源極、汲極，而且每一區的<strong>位置、濃度和深度</strong>都要精準控制。</p>\n<p class=\"semi-p\">早期的做法是把晶圓放在高溫的雜質氣體中，讓雜質慢慢擴散進矽裡，但很難精準控制。現代製程改用<strong>離子佈植</strong>：把雜質原子變成離子，加速後直接「射」進矽裡。就像用一把能精準控制子彈數量和速度的槍，把雜質打到指定的位置和深度。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"佈植機怎麼運作\" class=\"heading-anchor\">佈植機怎麼運作<a class=\"anchor-link\" href=\"#佈植機怎麼運作\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>離子源 → 質量分析 → 加速 → 掃描 → 晶圓</strong></p>\n<ol class=\"semi-ol\"><li><strong>離子源</strong>：把含有硼、磷或砷的氣體變成帶電的離子。</li><li><strong>質量分析</strong>：讓離子通過磁場，不同重量的離子轉彎的程度不同，只有需要的那一種離子能通過。</li><li><strong>加速</strong>：用電場把離子加速到需要的能量。</li><li><strong>掃描</strong>：讓離子束均勻地掃過整片晶圓。</li></ol>\n<p class=\"semi-p\">晶圓上有光阻覆蓋的地方，離子會被光阻擋住，所以只有光阻開口的區域會被佈植。這就是為什麼佈植前要先做一次微影。</p>\n<p class=\"semi-p\"><!-- 圖：離子佈植機示意（離子源、質量分析磁鐵、加速段、掃描、晶圓） --></p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"兩個最重要的參數\" class=\"heading-anchor\">兩個最重要的參數<a class=\"anchor-link\" href=\"#兩個最重要的參數\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li><strong>劑量</strong>（Dose）：每單位面積打進多少個原子，決定摻雜的濃度。</li><li><strong>能量</strong>（Energy）：離子的速度有多快，決定打得多深。</li></ul>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜劑量與能量（Dose / Energy）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：劑量是單位面積植入的原子數量，能量是離子被加速的程度。</li><li><strong>現場用法</strong>：「這道的劑量是 1E15」，意思是每平方公分植入 10 的 15 次方個原子。</li><li><strong>相關名詞</strong>：佈植角度、片電阻、Vt 調整</li><li><strong>常見混淆</strong>：能量越高是打得越深，不是打進越多原子。原子的數量由劑量決定。</li></ul></div></div>\n<p class=\"semi-p\">矽的晶體裡有排列整齊的「隧道」。如果離子剛好沿著隧道方向射入，就會一路滑得太深，稱為<strong>通道效應</strong>。所以佈植時通常會讓晶圓稍微傾斜一個角度，避開這些隧道。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"退火修復與活化\" class=\"heading-anchor\">退火：修復與活化<a class=\"anchor-link\" href=\"#退火修復與活化\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">離子高速撞進矽裡，會把原本整齊排列的矽原子撞亂，而且剛打進去的雜質原子還沒有「就定位」，無法發揮作用。所以佈植之後要<strong>退火</strong>：把晶圓加熱，讓晶格修復，雜質原子也移到正確的位置，開始導電，這叫做<strong>活化</strong>。</p>\n<p class=\"semi-p\">常見的退火方式從長到短：</p>\n<ul class=\"semi-ul\"><li><strong>爐管退火</strong>：在爐管中加熱數十分鐘以上。</li><li><strong>快速熱退火</strong>（RTA）：用強光在幾秒內把晶圓加熱到高溫。</li><li><strong>毫秒級退火</strong>：用雷射或閃光燈，在極短的時間內只加熱晶圓表面。</li></ul>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜退火（Anneal）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：透過加熱修復晶格損傷，並讓雜質活化的製程。</li><li><strong>現場用法</strong>：「佈植完還要過一道 RTA。」</li><li><strong>相關名詞</strong>：活化、擴散、熱預算、RTA</li><li><strong>常見混淆</strong>：退火不只會修復晶格，也會讓雜質往外擴散。溫度越高、時間越長，雜質跑得越遠，所以退火永遠是在「活化」和「擴散」之間取得平衡。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"熱預算加熱是有額度的\" class=\"heading-anchor\">熱預算：加熱是有額度的<a class=\"anchor-link\" href=\"#熱預算加熱是有額度的\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶圓在整個製程中經歷的高溫總量，稱為<strong>熱預算</strong>（Thermal Budget）。每一次高溫步驟，都會讓之前佈植的雜質再擴散一點。對尺寸只有幾十奈米的電晶體來說，雜質多跑幾奈米就可能影響電性。</p>\n<p class=\"semi-p\">而且一旦晶圓上有了金屬導線，溫度就必須大幅降低，否則金屬和周圍的材料會受損。這也是製程順序必須仔細安排的原因之一。</p>\n<p class=\"semi-p\">完成佈植和退火後，工廠通常會用控片量測<strong>片電阻</strong>（Sheet Resistance），確認摻雜的結果是否正確。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜佈植做錯，眼睛看不出來</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：一片佈植錯誤的晶圓，外觀和正確的晶圓一模一樣。</li><li><strong>做法</strong>：佈植機台的 Recipe 和參數受到特別嚴格的管控，系統會在開機前再次確認佈植的元素、劑量和能量，機台也會即時監測劑量。</li><li><strong>為什麼</strong>：佈植的錯誤無法用肉眼或一般顯微鏡看出來，往往要等到幾週後的電性測試才會發現，而且無法重做。</li><li><strong>沒做會怎樣</strong>：錯誤一路被帶到製程後段才發現，前面所有加工都白費，還可能已經影響了很多批晶圓。</li><li><strong>相關章節</strong>：<a href=\"#node-19\" class=\"semi-link\">第 19 章 晶圓測試</a>、<a href=\"#node-23\" class=\"semi-link\">第 23 章 工廠如何被系統管理</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜高溫步驟要盡量排在前面</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：規劃一個產品的完整製程流程。</li><li><strong>做法</strong>：需要高溫的步驟盡量安排在前面，越後面的步驟溫度越低；退火也盡量使用時間最短的方式。</li><li><strong>為什麼</strong>：雜質的擴散會累積。後面的每一次加熱，都會讓前面做好的摻雜區域變形。</li><li><strong>沒做會怎樣</strong>：源極和汲極的摻雜擴散得太深、太寬，電晶體的漏電變大、Vt 偏移。</li><li><strong>相關章節</strong>：<a href=\"#node-11\" class=\"semi-link\">第 11 章 走一遍完整的 CMOS 流程</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見異常\" class=\"heading-anchor\">常見異常<a class=\"anchor-link\" href=\"#常見異常\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>異常</th><th>可能原因</th><th>結果</th></tr></thead><tbody><tr><td>劑量偏移</td><td>Recipe 設定錯誤、劑量量測異常</td><td>Vt 與電阻偏移</td></tr><tr><td>佈錯元素或能量</td><td>Recipe 或氣體錯誤</td><td>電性完全錯誤，通常只能報廢</td></tr><tr><td>佈植不均勻</td><td>離子束掃描異常</td><td>晶圓不同位置的電性不同</td></tr><tr><td>光阻阻擋不足</td><td>光阻太薄或有缺陷</td><td>不該佈植的區域被佈植</td></tr><tr><td>退火溫度偏移</td><td>加熱系統異常</td><td>活化不足或擴散過度</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>離子佈植把雜質原子加速後射進矽裡，精準控制摻雜的位置、濃度和深度。</li><li>劑量決定濃度，能量決定深度。</li><li>佈植會破壞晶格，必須經過退火來修復並活化雜質。</li><li>熱預算有限，高溫會讓雜質擴散，所以製程順序要仔細安排。</li><li>佈植錯誤無法用眼睛看出、也無法重做，因此管控特別嚴格。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>James D. Plummer、Michael D. Deal、Peter B. Griffin，《Silicon VLSI Technology》，離子佈植與擴散章節</li><li>Peter Van Zant，《Microchip Fabrication》，摻雜相關章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-06\" class=\"semi-link\">← 上一章：第 6 章 蝕刻</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-08\" class=\"semi-link\">下一章：第 8 章 CMP →</a></p>"
  },
  {
    "id": "ch08",
    "part": "第 2 部　製程模組",
    "partId": "part-2",
    "num": 8,
    "shortTitle": "CMP",
    "fullTitle": "第 8 章　CMP：把晶圓磨平",
    "category": "modules",
    "waferTrack": "- 前一站：薄膜沉積，表面因為底下的圖形而高低不平\r\n- **本章：CMP，把晶圓表面磨平**\r\n- 下一站：清洗，然後進行下一層微影",
    "headings": [
      {
        "text": "為什麼要磨平",
        "id": "為什麼要磨平"
      },
      {
        "text": "CMP 怎麼運作",
        "id": "cmp-怎麼運作"
      },
      {
        "text": "CMP 用在哪裡",
        "id": "cmp-用在哪裡"
      },
      {
        "text": "磨到哪裡該停",
        "id": "磨到哪裡該停"
      },
      {
        "text": "磨平的麻煩：碟化與侵蝕",
        "id": "磨平的麻煩碟化與侵蝕"
      },
      {
        "text": "假圖形：為了磨得平",
        "id": "假圖形為了磨得平"
      },
      {
        "text": "常見異常",
        "id": "常見異常"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-8-章-cmp把晶圓磨平\" class=\"heading-anchor\">第 8 章　CMP：把晶圓磨平<a class=\"anchor-link\" href=\"#第-8-章-cmp把晶圓磨平\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：薄膜沉積，表面因為底下的圖形而高低不平</li><li><strong>本章：CMP，把晶圓表面磨平</strong></li><li>下一站：清洗，然後進行下一層微影</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"為什麼要磨平\" class=\"heading-anchor\">為什麼要磨平<a class=\"anchor-link\" href=\"#為什麼要磨平\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">每做完一層圖形再鋪上薄膜，表面就會順著底下的圖形起伏。層數一多，晶圓表面就像丘陵地一樣高低不平。</p>\n<p class=\"semi-p\">這會帶來兩個問題：</p>\n<ul class=\"semi-ul\"><li><strong>微影對不準焦</strong>：第 4 章提到，圖形越細，曝光時能清楚成像的焦距範圍越淺。表面高低差太大，高處和低處無法同時清楚。</li><li><strong>多餘的材料去不掉</strong>：例如銅導線的做法，是先把銅鋪滿整片晶圓，再把溝槽外多餘的銅去掉，見<a href=\"#node-10\" class=\"semi-link\">第 10 章</a>。</li></ul>\n<p class=\"semi-p\"><strong>化學機械研磨</strong>（CMP）就是用來解決這些問題的。就像蓋房子時，每一層樓板都要先抹平，才能繼續往上蓋。CMP 的出現，讓晶片能夠堆疊越來越多層金屬導線。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"cmp-怎麼運作\" class=\"heading-anchor\">CMP 怎麼運作<a class=\"anchor-link\" href=\"#cmp-怎麼運作\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">CMP 機台的主要零件：</p>\n<ul class=\"semi-ul\"><li><strong>研磨墊</strong>：貼在旋轉平台上的特殊墊子。</li><li><strong>研磨液</strong>（Slurry）：含有微小研磨顆粒和化學品的液體。</li><li><strong>研磨頭</strong>：把晶圓正面朝下壓在研磨墊上，並控制不同區域的壓力。</li><li><strong>修整器</strong>：表面有鑽石顆粒的圓盤，持續刮磨研磨墊，讓它保持粗糙。</li></ul>\n<p class=\"semi-p\">研磨時，研磨液中的化學品先讓晶圓表面變軟或起反應，研磨顆粒再把這層變軟的材料磨掉。凸起的地方受到的壓力比較大，磨得比較快，所以表面會越磨越平。</p>\n<p class=\"semi-p\"><!-- 圖：CMP 機台示意（旋轉平台、研磨墊、研磨頭、研磨液噴嘴、修整器） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜CMP（Chemical Mechanical Planarization，化學機械研磨）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：結合化學反應與機械研磨，把晶圓表面磨平或去除多餘材料的製程。</li><li><strong>現場用法</strong>：「這層 CMP 磨過頭了」，現場也常直接說「研磨」。</li><li><strong>相關名詞</strong>：研磨液、研磨墊、Dishing、Erosion</li><li><strong>常見混淆</strong>：CMP 不只是用砂紙磨東西，化學作用同樣重要。不同材料要用不同配方的研磨液，才能磨得又快又平。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"cmp-用在哪裡\" class=\"heading-anchor\">CMP 用在哪裡<a class=\"anchor-link\" href=\"#cmp-用在哪裡\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>種類</th><th>做什麼</th><th>相關章節</th></tr></thead><tbody><tr><td>STI CMP</td><td>隔離溝槽填入氧化矽後，把多餘的氧化矽磨掉</td><td><a href=\"#node-11\" class=\"semi-link\">第 11 章</a></td></tr><tr><td>介電層 CMP</td><td>把絕緣層的表面磨平</td><td>本章</td></tr><tr><td>鎢 CMP</td><td>去除接觸窗以外多餘的鎢</td><td><a href=\"#node-10\" class=\"semi-link\">第 10 章</a></td></tr><tr><td>銅 CMP</td><td>去除導線以外多餘的銅</td><td><a href=\"#node-10\" class=\"semi-link\">第 10 章</a></td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"磨到哪裡該停\" class=\"heading-anchor\">磨到哪裡該停<a class=\"anchor-link\" href=\"#磨到哪裡該停\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">CMP 也需要終點偵測。當研磨從一種材料磨到另一種材料時，摩擦力會改變，表面的反光也會改變，機台可以據此判斷是否磨到目標。很多製程還會在下方先鋪一層比較耐磨的<strong>停止層</strong>，讓研磨在碰到它時自然慢下來。</p>\n<p class=\"semi-p\">研磨墊和研磨液都是消耗品，研磨墊用久了，研磨速度會慢慢改變。工廠通常會根據前幾批的量測結果，自動微調下一批的研磨時間，見<a href=\"#node-17\" class=\"semi-link\">第 17 章</a>。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"磨平的麻煩碟化與侵蝕\" class=\"heading-anchor\">磨平的麻煩：碟化與侵蝕<a class=\"anchor-link\" href=\"#磨平的麻煩碟化與侵蝕\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">CMP 並不是在任何地方都磨得一樣多。軟的材料比硬的材料容易磨，圖形密的區域和疏的區域也磨得不一樣，因此會出現兩種典型的問題：</p>\n<p class=\"semi-p\"><!-- 圖：Dishing 與 Erosion 的剖面對照 --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜碟化與侵蝕（Dishing / Erosion）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：碟化是較寬的金屬導線中間被磨得凹下去，像一個盤子；侵蝕是導線密集的整個區域被磨得比周圍低。</li><li><strong>現場用法</strong>：「大面積金屬的 Dishing 太嚴重。」</li><li><strong>相關名詞</strong>：圖形密度、假圖形、過度研磨</li><li><strong>常見混淆</strong>：碟化發生在「單一條寬導線」內部，侵蝕則是「一整片密集區域」一起變低，兩者的原因和解法不同。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"假圖形為了磨得平\" class=\"heading-anchor\">假圖形：為了磨得平<a class=\"anchor-link\" href=\"#假圖形為了磨得平\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">為了讓 CMP 磨得均勻，晶片上圖形太少的空曠區域，會被自動補上一些<strong>不通電的假圖形</strong>（Dummy Fill），讓整顆晶片的圖形密度盡量平均。設計晶片時也必須遵守圖形密度的規則。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜晶片裡有很多不通電的圖形</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：用顯微鏡觀察晶片，會發現很多沒有連到任何電路的小方塊。</li><li><strong>做法</strong>：設計流程的最後，軟體會在空曠的區域自動補上假圖形，讓各區的圖形密度落在規定範圍內。</li><li><strong>為什麼</strong>：CMP 的研磨速度和圖形密度有關，密度不均勻，就會磨得一邊高一邊低。</li><li><strong>沒做會怎樣</strong>：表面不平，導致微影失焦、導線厚度不一致，甚至金屬殘留造成短路。</li><li><strong>相關章節</strong>：<a href=\"#node-04\" class=\"semi-link\">第 4 章 微影</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜CMP 之後要馬上清洗</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：晶圓剛磨完，表面沾滿研磨液和研磨顆粒。</li><li><strong>做法</strong>：CMP 機台內部通常整合了清洗模組，晶圓磨完後立刻刷洗、沖淨並烘乾，乾乾淨淨地離開機台，現場稱為「乾進乾出」。</li><li><strong>為什麼</strong>：研磨液一旦在晶圓表面乾掉，顆粒會牢牢黏住，很難再洗掉。</li><li><strong>沒做會怎樣</strong>：殘留的顆粒變成缺陷，影響後續的薄膜和微影，造成良率損失。</li><li><strong>相關章節</strong>：<a href=\"#node-09\" class=\"semi-link\">第 9 章 清洗與污染控制</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見異常\" class=\"heading-anchor\">常見異常<a class=\"anchor-link\" href=\"#常見異常\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>異常</th><th>可能原因</th><th>結果</th></tr></thead><tbody><tr><td>磨過頭或磨不夠</td><td>研磨速度改變、終點判斷錯誤</td><td>膜厚不合格</td></tr><tr><td>碟化與侵蝕</td><td>圖形密度不均、過度研磨</td><td>導線變薄、電阻變高</td></tr><tr><td>刮傷</td><td>研磨液中有大顆粒、研磨墊異常</td><td>斷路或短路</td></tr><tr><td>金屬殘留</td><td>金屬沒有磨乾淨</td><td>相鄰導線短路</td></tr><tr><td>腐蝕</td><td>銅表面接觸化學品太久</td><td>導線損傷</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>層數一多表面就不平，CMP 讓微影能對準焦，也能去除多餘的金屬。</li><li>CMP 靠化學作用讓表面變軟，再靠研磨顆粒把它磨掉。</li><li>摩擦力或反光的變化可以判斷終點，停止層也能幫助研磨停在正確位置。</li><li>碟化和侵蝕是 CMP 的典型問題，假圖形可以讓圖形密度更平均。</li><li>研磨液乾掉就很難清除，所以 CMP 後要立即清洗。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Peter Van Zant，《Microchip Fabrication》，平坦化相關章節</li><li>Hong Xiao，《Introduction to Semiconductor Manufacturing Technology》，CMP 章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-07\" class=\"semi-link\">← 上一章：第 7 章 離子佈植與熱處理</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-09\" class=\"semi-link\">下一章：第 9 章 清洗與污染控制 →</a></p>"
  },
  {
    "id": "ch09",
    "part": "第 2 部　製程模組",
    "partId": "part-2",
    "num": 9,
    "shortTitle": "清洗與污染控制",
    "fullTitle": "第 9 章　清洗與污染控制：看不見的敵人",
    "category": "modules",
    "waferTrack": "- 前一站：幾乎任何一個製程步驟\r\n- **本章：清洗，去除晶圓表面的污染**\r\n- 下一站：下一個製程步驟",
    "headings": [
      {
        "text": "看不見的敵人",
        "id": "看不見的敵人"
      },
      {
        "text": "污染有哪幾種",
        "id": "污染有哪幾種"
      },
      {
        "text": "怎麼洗",
        "id": "怎麼洗"
      },
      {
        "text": "Q-Time：清洗的效果會過期",
        "id": "q-time清洗的效果會過期"
      },
      {
        "text": "交叉污染：有些東西不能混用",
        "id": "交叉污染有些東西不能混用"
      },
      {
        "text": "常見異常",
        "id": "常見異常"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-9-章-清洗與污染控制看不見的敵人\" class=\"heading-anchor\">第 9 章　清洗與污染控制：看不見的敵人<a class=\"anchor-link\" href=\"#第-9-章-清洗與污染控制看不見的敵人\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：幾乎任何一個製程步驟</li><li><strong>本章：清洗，去除晶圓表面的污染</strong></li><li>下一站：下一個製程步驟</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"看不見的敵人\" class=\"heading-anchor\">看不見的敵人<a class=\"anchor-link\" href=\"#看不見的敵人\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">在奈米尺度下，一顆肉眼看不見的微粒、極微量的金屬原子，都足以讓電晶體失效。所以清洗是整個製程中出現次數最多的步驟之一：幾乎每做完一個步驟、或是開始重要步驟之前，都要清洗一次。</p>\n<p class=\"semi-p\">清洗看起來不起眼，卻直接決定了良率。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"污染有哪幾種\" class=\"heading-anchor\">污染有哪幾種<a class=\"anchor-link\" href=\"#污染有哪幾種\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>種類</th><th>常見來源</th><th>影響</th></tr></thead><tbody><tr><td>微粒</td><td>機台、環境、人</td><td>圖形缺陷，造成短路或斷路</td></tr><tr><td>金屬污染</td><td>化學品、機台零件、人體</td><td>漏電，電晶體特性改變</td></tr><tr><td>有機物</td><td>光阻殘留、人體油脂</td><td>薄膜附著不良</td></tr><tr><td>原生氧化層</td><td>矽表面接觸空氣後自然長出</td><td>影響接觸電阻與薄膜品質</td></tr></tbody></table></div>\n<p class=\"semi-p\">其中金屬污染特別麻煩。例如汗水中的鈉離子，進入閘極氧化層後會到處移動，讓電晶體的 Vt 漂移。這也是無塵室嚴格要求穿著無塵衣的原因之一。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"怎麼洗\" class=\"heading-anchor\">怎麼洗<a class=\"anchor-link\" href=\"#怎麼洗\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">最經典的清洗方法是 <strong>RCA 清洗</strong>，雖然是 1960 年代發展出來的，至今仍是很多清洗配方的基礎：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>名稱</th><th>主要成分</th><th>用途</th></tr></thead><tbody><tr><td>SC1</td><td>氨水、雙氧水、水</td><td>去除微粒和有機物</td></tr><tr><td>SC2</td><td>鹽酸、雙氧水、水</td><td>去除金屬污染</td></tr><tr><td>DHF</td><td>稀釋的氫氟酸</td><td>去除薄薄的氧化層</td></tr><tr><td>SPM</td><td>硫酸、雙氧水</td><td>去除有機物和光阻</td></tr></tbody></table></div>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜RCA 清洗（RCA Clean）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：以 SC1、SC2 為核心的標準晶圓清洗流程。</li><li><strong>現場用法</strong>：「爐管前要先過一道 RCA。」</li><li><strong>相關名詞</strong>：SC1、SC2、DHF、爐前清洗</li><li><strong>常見混淆</strong>：RCA 是最早發表這套方法的實驗室名稱，不是某種化學品。</li></ul></div></div>\n<p class=\"semi-p\">清洗的機台主要有兩種：</p>\n<ul class=\"semi-ul\"><li><strong>批次式濕式清洗槽</strong>：把整批晶圓依序浸入一排化學槽和清水槽，像洗車的流水線。</li><li><strong>單片式清洗機</strong>：一次處理一片晶圓，一邊旋轉一邊噴灑化學品。控制更精準，也能避免晶圓之間互相污染，先進製程越來越常使用。</li></ul>\n<p class=\"semi-p\"><!-- 圖：批次式濕式清洗槽與單片式旋轉清洗的對照 --></p>\n<p class=\"semi-p\">清洗用的水是<strong>超純水</strong>，幾乎不含任何離子、微粒和細菌，純度遠遠超過飲用水。晶圓廠每天要用掉大量的超純水。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"q-time清洗的效果會過期\" class=\"heading-anchor\">Q-Time：清洗的效果會過期<a class=\"anchor-link\" href=\"#q-time清洗的效果會過期\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">清洗完的晶圓表面非常乾淨，但這個狀態不會維持太久：表面會慢慢長出原生氧化層，也會吸附空氣中的污染物。所以清洗後，必須在規定時間內進入下一個步驟。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜Q-Time（Queue Time，等待時間限制）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：兩個製程步驟之間允許等待的最長時間。</li><li><strong>現場用法</strong>：「這批 Q-Time 快到了，先跑它」「Q-Time 超過了，要重洗」。</li><li><strong>相關名詞</strong>：Hold、重工、派工</li><li><strong>常見混淆</strong>：Q-Time 不是製程本身花的時間，而是「兩站之間可以等多久」。它也不只用在清洗，例如銅 CMP 之後到鋪上覆蓋層之間，同樣有 Q-Time 限制。</li></ul></div></div>\n<p class=\"semi-p\">工廠的系統會自動計算每一批晶圓的 Q-Time。快到期的晶圓會被優先派工；超過時間的則會被自動擋下，由工程師決定要重洗還是另作處理。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"交叉污染有些東西不能混用\" class=\"heading-anchor\">交叉污染：有些東西不能混用<a class=\"anchor-link\" href=\"#交叉污染有些東西不能混用\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">銅在矽中擴散得非常快，只要一點點跑進電晶體所在的區域，就會造成漏電甚至失效。因此，銅製程使用的機台、晶圓盒，甚至鑷子和手套，都要和前段製程嚴格分開。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜接觸過銅的東西，不能回到前段</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：晶圓進入金屬導線製程後，開始接觸銅。</li><li><strong>做法</strong>：工廠會把機台和晶圓盒分成不同的污染等級，常用顏色或標籤區分。系統也會檢查晶圓盒和機台的等級是否相符，不符就禁止進機台。</li><li><strong>為什麼</strong>：微量的銅一旦被帶進前段機台，就會污染之後經過那台機台的所有晶圓。</li><li><strong>沒做會怎樣</strong>：大範圍的晶圓受到銅污染，電晶體漏電，良率大幅下降，而且很難追查源頭。</li><li><strong>相關章節</strong>：<a href=\"#node-10\" class=\"semi-link\">第 10 章 金屬化</a>、<a href=\"#node-23\" class=\"semi-link\">第 23 章 工廠如何被系統管理</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜晶圓背面也要乾淨</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：晶圓背面沾了一顆微粒。</li><li><strong>做法</strong>：清洗和檢查不能只顧正面，背面的微粒和污染同樣要控制。</li><li><strong>為什麼</strong>：曝光時晶圓平貼在機台上，背面的微粒會把晶圓局部頂高，造成失焦；微粒還可能留在機台上，傳給下一片晶圓。</li><li><strong>沒做會怎樣</strong>：同一個位置反覆出現失焦的缺陷，而且一台機台可能污染許多批晶圓。</li><li><strong>相關章節</strong>：<a href=\"#node-04\" class=\"semi-link\">第 4 章 微影</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見異常\" class=\"heading-anchor\">常見異常<a class=\"anchor-link\" href=\"#常見異常\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>異常</th><th>可能原因</th><th>結果</th></tr></thead><tbody><tr><td>清洗後微粒反而增加</td><td>化學槽變髒、過濾器失效</td><td>缺陷增加</td></tr><tr><td>水痕</td><td>乾燥不完全</td><td>表面殘留</td></tr><tr><td>金屬污染</td><td>化學品純度不足、零件腐蝕</td><td>漏電、良率下降</td></tr><tr><td>薄膜被吃掉太多</td><td>氫氟酸濃度或時間異常</td><td>膜厚不足</td></tr><tr><td>圖形倒塌</td><td>乾燥時液體的表面張力拉倒細高的結構</td><td>結構損壞</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>清洗幾乎出現在每個製程步驟前後，直接決定良率。</li><li>污染分為微粒、金屬、有機物和原生氧化層，各有不同的影響。</li><li>RCA 清洗是經典的清洗方法，至今仍是很多配方的基礎。</li><li>清洗的效果會過期，所以要用 Q-Time 管控兩站之間的等待時間。</li><li>銅等污染物必須嚴格分區管理，避免交叉污染。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Karen A. Reinhardt、Werner Kern 編，《Handbook of Silicon Wafer Cleaning Technology》</li><li>Peter Van Zant，《Microchip Fabrication》，污染控制相關章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-08\" class=\"semi-link\">← 上一章：第 8 章 CMP</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-10\" class=\"semi-link\">下一章：第 10 章 金屬化 →</a></p>"
  },
  {
    "id": "ch10",
    "part": "第 2 部　製程模組",
    "partId": "part-2",
    "num": 10,
    "shortTitle": "金屬化",
    "fullTitle": "第 10 章　金屬化：把電晶體連起來",
    "category": "modules",
    "waferTrack": "- 前一站：電晶體已經做好，完整順序見第 11 章\r\n- **本章：金屬化，做出連接電晶體的金屬導線**\r\n- 下一站：一層一層往上疊，最後鋪上保護層",
    "headings": [
      {
        "text": "把數十億個電晶體連起來",
        "id": "把數十億個電晶體連起來"
      },
      {
        "text": "接觸窗與導通孔",
        "id": "接觸窗與導通孔"
      },
      {
        "text": "從鋁到銅",
        "id": "從鋁到銅"
      },
      {
        "text": "大馬士革製程",
        "id": "大馬士革製程"
      },
      {
        "text": "低介電常數材料",
        "id": "低介電常數材料"
      },
      {
        "text": "越來越細的挑戰",
        "id": "越來越細的挑戰"
      },
      {
        "text": "常見異常",
        "id": "常見異常"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-10-章-金屬化把電晶體連起來\" class=\"heading-anchor\">第 10 章　金屬化：把電晶體連起來<a class=\"anchor-link\" href=\"#第-10-章-金屬化把電晶體連起來\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：電晶體已經做好，完整順序見第 11 章</li><li><strong>本章：金屬化，做出連接電晶體的金屬導線</strong></li><li>下一站：一層一層往上疊，最後鋪上保護層</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"把數十億個電晶體連起來\" class=\"heading-anchor\">把數十億個電晶體連起來<a class=\"anchor-link\" href=\"#把數十億個電晶體連起來\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">電晶體做好之後，還要用金屬導線把它們連成電路。一顆先進晶片上有數十億個電晶體，一層導線根本不夠用，所以導線會疊成好幾層，先進晶片甚至超過十層。</p>\n<p class=\"semi-p\">這些導線很像城市的道路系統：</p>\n<ul class=\"semi-ul\"><li><strong>下層</strong>：又細又密，像巷弄，負責連接鄰近的電晶體。</li><li><strong>中層</strong>：較寬，像市區道路，連接不同的電路區塊。</li><li><strong>上層</strong>：最粗最寬，像高速公路，負責長距離傳送訊號和供應電源。</li></ul>\n<p class=\"semi-p\"><!-- 圖：多層金屬導線剖面（下層細密、上層粗寬，層與層之間以導通孔連接） --></p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"接觸窗與導通孔\" class=\"heading-anchor\">接觸窗與導通孔<a class=\"anchor-link\" href=\"#接觸窗與導通孔\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">電晶體和第一層金屬之間，隔著一層絕緣層。要讓它們連通，先在絕緣層上挖出小孔，再填入金屬，這些小孔叫做<strong>接觸窗</strong>（Contact）。接觸窗通常填的是<strong>鎢</strong>，因為鎢能用 CVD 把又小又深的孔填滿，填完再用 CMP 把多餘的鎢磨掉。</p>\n<p class=\"semi-p\">金屬層與金屬層之間的連接孔，則叫做<strong>導通孔</strong>（Via）。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜接觸窗與導通孔（Contact / Via）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：接觸窗連接電晶體和第一層金屬；導通孔連接上下兩層金屬。</li><li><strong>現場用法</strong>：「這顆 Via 開不通」，意思是導通孔沒有接好，形成斷路。</li><li><strong>相關名詞</strong>：鎢栓塞、阻障層、Via Chain</li><li><strong>常見混淆</strong>：兩者都是「填滿金屬的孔」，差別在連接的位置：接觸窗在電晶體上方，導通孔在金屬層之間。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"從鋁到銅\" class=\"heading-anchor\">從鋁到銅<a class=\"anchor-link\" href=\"#從鋁到銅\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">早期的導線使用<strong>鋁</strong>：先用 PVD 把鋁鋪滿整片晶圓，再用微影和蝕刻把不要的鋁去掉，留下導線。</p>\n<p class=\"semi-p\">1990 年代末期，產業開始改用<strong>銅</strong>。銅的電阻比鋁低，比較不容易因為長期通電而損壞。但銅有一個大問題：很難用乾蝕刻挖出圖形。於是產業改用一種完全相反的做法：<strong>先挖溝，再填銅</strong>。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"大馬士革製程\" class=\"heading-anchor\">大馬士革製程<a class=\"anchor-link\" href=\"#大馬士革製程\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">這種做法的名字來自古代大馬士革的鑲嵌工藝：在器物表面刻出凹槽，填入金屬，再把表面磨平。銅導線的做法幾乎一模一樣：</p>\n<p class=\"semi-p\"><strong>鋪絕緣層 → 挖出導通孔和溝槽 → 鋪阻障層與晶種層 → 電鍍銅 → 退火 → 銅 CMP → 鋪覆蓋層</strong></p>\n<ol class=\"semi-ol\"><li><strong>鋪絕緣層</strong>：用 CVD 鋪上一層絕緣材料。</li><li><strong>挖洞</strong>：用微影和蝕刻挖出導通孔和導線溝槽。</li><li><strong>阻障層與晶種層</strong>：先鋪一層極薄的阻障層，防止銅擴散出去；再鋪一層薄薄的銅，作為電鍍的起點。</li><li><strong>電鍍銅</strong>：把晶圓放進電鍍液，讓銅填滿孔洞和溝槽。</li><li><strong>退火</strong>：加熱讓銅的結構穩定下來。</li><li><strong>銅 CMP</strong>：把溝槽以外多餘的銅磨掉。</li><li><strong>鋪覆蓋層</strong>：在銅的表面蓋上一層薄薄的覆蓋層，防止銅氧化或擴散。</li></ol>\n<p class=\"semi-p\">如果導通孔和溝槽一起填銅，就稱為<strong>雙大馬士革</strong>（Dual Damascene），可以少做一次填充和研磨。每一層金屬都重複這個流程，一層一層往上蓋。</p>\n<p class=\"semi-p\"><!-- 圖：雙大馬士革流程剖面（挖洞 → 阻障層 → 電鍍 → CMP → 覆蓋層） --></p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\">[!NOTE]</p>\n<p class=\"semi-p\"><strong>📖 名詞｜大馬士革製程（Damascene）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：先在絕緣層挖出溝槽，填入金屬，再用 CMP 磨掉多餘部分的導線製作方法。</li><li><strong>現場用法</strong>：「這幾層是銅的雙大馬士革。」</li><li><strong>相關名詞</strong>：電鍍、阻障層、晶種層、銅 CMP</li><li><strong>常見混淆</strong>：鋁導線是「先鋪金屬再蝕刻」，銅導線是「先挖溝再填金屬」，兩者順序剛好相反。</li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜電鍍銅要從底部往上填</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：要把又窄又深的溝槽完全填滿銅。</li><li><strong>做法</strong>：電鍍液中會加入特殊的添加劑，讓孔洞底部的銅長得比開口處快，由下往上填滿。</li><li><strong>為什麼</strong>：如果開口處的銅長得比較快，開口會先被封住。</li><li><strong>沒做會怎樣</strong>：導線內部留下空洞，電阻變高，長期使用時也更容易斷線。</li><li><strong>相關章節</strong>：<a href=\"#node-05\" class=\"semi-link\">第 5 章 薄膜</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"低介電常數材料\" class=\"heading-anchor\">低介電常數材料<a class=\"anchor-link\" href=\"#低介電常數材料\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">導線之間隔著絕緣層，兩條靠得很近的導線就像一個小電容，會拖慢訊號、增加耗電。為了減少這個影響，先進製程使用<strong>低介電常數材料</strong>（Low-k）作為導線之間的絕緣層。</p>\n<p class=\"semi-p\">低介電常數材料常常帶有微小的孔洞，結構比較脆弱，在蝕刻、CMP 和封裝時都容易受損，需要特別小心處理。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"越來越細的挑戰\" class=\"heading-anchor\">越來越細的挑戰<a class=\"anchor-link\" href=\"#越來越細的挑戰\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">導線越做越細，問題也越來越多：</p>\n<ul class=\"semi-ul\"><li><strong>電阻變高</strong>：導線太細時，阻障層占的比例變大，電子也更容易被散射，產業正在研究以其他金屬製作最細的導線。</li><li><strong>電遷移</strong>：電流長時間流過時，會把金屬原子一點一點推走，最後形成空洞而斷線，見<a href=\"#node-22\" class=\"semi-link\">第 22 章</a>。</li></ul>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜銅磨完之後不能放太久</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：銅 CMP 完成，晶圓表面的銅直接暴露在空氣中。</li><li><strong>做法</strong>：CMP 到鋪上覆蓋層之間設有 Q-Time 限制，超過時間要由工程師判斷處理方式。</li><li><strong>為什麼</strong>：裸露的銅很容易氧化和腐蝕。</li><li><strong>沒做會怎樣</strong>：銅表面劣化，導通孔的接觸電阻變高，可靠度也會下降。</li><li><strong>相關章節</strong>：<a href=\"#node-09\" class=\"semi-link\">第 9 章 清洗與污染控制</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見異常\" class=\"heading-anchor\">常見異常<a class=\"anchor-link\" href=\"#常見異常\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>異常</th><th>可能原因</th><th>結果</th></tr></thead><tbody><tr><td>銅填充空洞</td><td>電鍍條件異常、開口太窄</td><td>電阻變高、可靠度問題</td></tr><tr><td>銅殘留</td><td>CMP 研磨不足</td><td>導線短路</td></tr><tr><td>導通孔不通</td><td>蝕刻不足、孔底殘留</td><td>斷路</td></tr><tr><td>阻障層失效</td><td>阻障層太薄或不連續</td><td>銅擴散，造成漏電</td></tr><tr><td>低介電材料損傷</td><td>蝕刻、CMP 或封裝的應力</td><td>漏電、結構剝離</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>晶片用多層金屬導線連接電晶體，下層細密、上層粗寬。</li><li>接觸窗連接電晶體與第一層金屬，導通孔連接金屬層與金屬層。</li><li>銅取代鋁之後，導線改用「先挖溝、再填銅、再磨平」的大馬士革製程。</li><li>阻障層防止銅擴散，低介電常數材料降低導線之間的干擾。</li><li>導線越細，電阻和電遷移的問題越嚴重。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>James D. Plummer、Michael D. Deal、Peter B. Griffin，《Silicon VLSI Technology》，後段製程章節</li><li>Hong Xiao，《Introduction to Semiconductor Manufacturing Technology》，金屬化章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-09\" class=\"semi-link\">← 上一章：第 9 章 清洗與污染控制</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-11\" class=\"semi-link\">下一章：第 11 章 走一遍完整的 CMOS 流程 →</a></p>"
  },
  {
    "id": "ch11",
    "part": "第 3 部　製程整合",
    "partId": "part-3",
    "num": 11,
    "shortTitle": "走一遍完整的 CMOS 流程",
    "fullTitle": "第 11 章　走一遍完整的 CMOS 流程：把模組串起來",
    "category": "integration",
    "waferTrack": "- 前一站：認識了各個製程模組\r\n- **本章：把模組串成一條完整的 CMOS 流程**\r\n- 下一站：看電晶體如何從平面走向立體",
    "headings": [
      {
        "text": "把零件組成整台機器",
        "id": "把零件組成整台機器"
      },
      {
        "text": "一個反覆出現的循環",
        "id": "一個反覆出現的循環"
      },
      {
        "text": "第一段：FEOL，做出電晶體",
        "id": "第一段feol做出電晶體"
      },
      {
        "text": "第二段：MOL，把電晶體接出來",
        "id": "第二段mol把電晶體接出來"
      },
      {
        "text": "第三段：BEOL，蓋出導線",
        "id": "第三段beol蓋出導線"
      },
      {
        "text": "光罩層數",
        "id": "光罩層數"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-11-章-走一遍完整的-cmos-流程把模組串起來\" class=\"heading-anchor\">第 11 章　走一遍完整的 CMOS 流程：把模組串起來<a class=\"anchor-link\" href=\"#第-11-章-走一遍完整的-cmos-流程把模組串起來\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：認識了各個製程模組</li><li><strong>本章：把模組串成一條完整的 CMOS 流程</strong></li><li>下一站：看電晶體如何從平面走向立體</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"把零件組成整台機器\" class=\"heading-anchor\">把零件組成整台機器<a class=\"anchor-link\" href=\"#把零件組成整台機器\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">前面幾章介紹的製程模組，就像一塊塊積木。本章要把它們組起來，走一遍一顆 CMOS 晶片從空白晶圓到完成的流程。</p>\n<p class=\"semi-p\">這裡介紹的是簡化過的平面電晶體流程。真實的先進製程步驟多出很多，但骨架是一樣的。看懂這條骨架，之後看到任何製程流程，都能大致知道每一步在做什麼。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"一個反覆出現的循環\" class=\"heading-anchor\">一個反覆出現的循環<a class=\"anchor-link\" href=\"#一個反覆出現的循環\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">整條流程雖然很長，但大部分都是同一個循環：</p>\n<p class=\"semi-p\"><strong>鋪上材料 → 微影定義圖形 → 蝕刻或佈植 → 去光阻、清洗 → 量測</strong></p>\n<p class=\"semi-p\">每做一次微影，就要用到一片光罩，稱為一個<strong>光罩層</strong>。整條流程可以依照目的分成三大段：FEOL、MOL 和 BEOL。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜FEOL、MOL、BEOL</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：FEOL（Front End of Line）負責做出電晶體；MOL（Middle of Line）負責把電晶體接出來；BEOL（Back End of Line）負責做多層金屬導線。</li><li><strong>現場用法</strong>：「這是 BEOL 的問題，跟 FEOL 無關。」</li><li><strong>相關名詞</strong>：前段、後段、接觸窗、金屬層</li><li><strong>常見混淆</strong>：三段的分界在不同工廠略有不同，MOL 有時會被併入 FEOL 或 BEOL。另外要注意，這裡的「前段、後段」都發生在晶圓廠內，和封裝測試的「後段」不同，見<a href=\"#node-00\" class=\"semi-link\">第 0 章</a>。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"第一段feol做出電晶體\" class=\"heading-anchor\">第一段：FEOL，做出電晶體<a class=\"anchor-link\" href=\"#第一段feol做出電晶體\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li><strong>隔離</strong>：在每個電晶體的周圍挖出淺溝槽，填入氧化矽，再用 CMP 磨平，讓相鄰的電晶體互不干擾。</li><li><strong>做出井</strong>：用微影和佈植，分別做出 P 井（給 NMOS）和 N 井（給 PMOS），再退火。</li><li><strong>做閘極</strong>：長出一層極薄的閘極絕緣層，鋪上閘極材料，再用微影和蝕刻定義出閘極。閘極的長度是整條流程最關鍵的尺寸之一。</li><li><strong>淺摻雜</strong>：在閘極兩側做一次淺而輕的佈植。</li><li><strong>側壁間隔物</strong>：鋪上一層薄膜再全面往下蝕刻，只留下閘極兩側的一小段，稱為 <strong>Spacer</strong>。</li><li><strong>源極與汲極</strong>：做一次深而重的佈植。Spacer 讓這次佈植和閘極保持一點距離，接著退火活化。</li><li><strong>金屬矽化物</strong>：鋪上一層金屬並加熱，讓它和源極、汲極、閘極表面的矽反應，形成電阻很低的化合物，方便後續接線。</li></ol>\n<p class=\"semi-p\"><!-- 圖：FEOL 剖面演進（隔離 → 井 → 閘極 → Spacer → 源汲極 → 金屬矽化物） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜STI（Shallow Trench Isolation，淺溝槽隔離）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：在電晶體之間挖出淺溝槽並填入絕緣材料，把元件彼此隔開的結構。</li><li><strong>現場用法</strong>：「STI 的深度偏淺」「STI CMP 磨完要確認氮化矽的厚度」。</li><li><strong>相關名詞</strong>：主動區（Active Area）、CMP、隔離</li><li><strong>常見混淆</strong>：STI 通常是流程中最早做的結構之一，雖然它不會導電，但它的形狀會影響電晶體的特性和漏電。</li></ul></div></div>\n<h3 id=\"現代閘極的做法\" class=\"heading-anchor\">現代閘極的做法<a class=\"anchor-link\" href=\"#現代閘極的做法\" aria-hidden=\"true\">#</a></h3>\n<p class=\"semi-p\">先進製程的閘極不再使用氧化矽和多晶矽，而是改用<strong>高介電常數絕緣層</strong>加上<strong>金屬閘極</strong>（HKMG）。由於金屬閘極承受不了源極、汲極退火的高溫，常見的做法是先用多晶矽做一個「假閘極」佔住位置，等高溫步驟結束後，再把它挖掉換成真正的金屬閘極。這種「先做假的、再換成真的」的思維，在先進製程中非常常見，見<a href=\"#node-12\" class=\"semi-link\">第 12 章</a>。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"第二段mol把電晶體接出來\" class=\"heading-anchor\">第二段：MOL，把電晶體接出來<a class=\"anchor-link\" href=\"#第二段mol把電晶體接出來\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">在電晶體上方鋪一層絕緣層，用微影和蝕刻挖出接觸窗，對準源極、汲極和閘極，再填入鎢並用 CMP 磨平。這一步讓電晶體有了連到外面的「插座」。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"第三段beol蓋出導線\" class=\"heading-anchor\">第三段：BEOL，蓋出導線<a class=\"anchor-link\" href=\"#第三段beol蓋出導線\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">接著用第 10 章的大馬士革製程，一層一層做出銅導線。最上面幾層的導線最粗，最後鋪上<strong>保護層</strong>，只在<strong>焊墊</strong>（Pad）的位置開口，讓之後的測試探針和封裝打線可以接觸到晶片。</p>\n<p class=\"semi-p\">完成後，晶圓就離開晶圓廠，進入測試階段，見<a href=\"#node-19\" class=\"semi-link\">第 19 章</a>。</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>階段</th><th>主要做什麼</th><th>用到的模組</th></tr></thead><tbody><tr><td>FEOL</td><td>隔離、井、閘極、源極與汲極</td><td>薄膜、微影、蝕刻、佈植、熱處理、CMP</td></tr><tr><td>MOL</td><td>接觸窗</td><td>微影、蝕刻、鎢沉積、CMP</td></tr><tr><td>BEOL</td><td>多層導線、保護層、焊墊</td><td>薄膜、微影、蝕刻、電鍍、CMP</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"光罩層數\" class=\"heading-anchor\">光罩層數<a class=\"anchor-link\" href=\"#光罩層數\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">一個簡單的 CMOS 製程大約需要二十層左右的光罩；最先進的製程加上多重曝光，光罩層數可以達到數十層以上。每多一層，就多一輪「沉積、微影、蝕刻、清洗、量測」，成本和生產週期都會增加。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜用「每層光罩幾天」比較生產效率</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：要比較兩個光罩層數不同的產品，哪一個生產得比較有效率。</li><li><strong>做法</strong>：把生產週期除以光罩層數，得到「平均每層光罩花幾天」，業界常用這個指標比較工廠的效率，常見水準大約在每層一到兩天之間，數字越小代表效率越好。</li><li><strong>為什麼</strong>：光罩層數越多，步驟就越多，總天數自然越長。除以層數之後，才能公平比較。</li><li><strong>沒做會怎樣</strong>：只看總天數，會誤以為層數多的產品生產效率比較差。</li><li><strong>相關章節</strong>：<a href=\"#node-01\" class=\"semi-link\">第 1 章 晶圓廠如何運作</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜同一台機台，晶圓會回來很多次</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：一片晶圓在整個流程中，要回到微影區數十次。</li><li><strong>做法</strong>：派工時要考慮每批晶圓在流程中的位置，並讓最忙碌的機台（通常是微影）盡量不要閒置。</li><li><strong>為什麼</strong>：剛投片的晶圓和快完成的晶圓，會搶同一批機台。這種「重複進入」的流程，是晶圓廠排程特別複雜的原因。</li><li><strong>沒做會怎樣</strong>：晶圓在瓶頸機台前大量堆積，整座工廠的生產週期變長。</li><li><strong>相關章節</strong>：<a href=\"#node-23\" class=\"semi-link\">第 23 章 工廠如何被系統管理</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>整條流程由「鋪材料、微影、蝕刻或佈植、清洗、量測」的循環組成。</li><li>FEOL 做出電晶體，MOL 把電晶體接出來，BEOL 做出多層導線。</li><li>先進製程常用「先做假閘極、再換成金屬閘極」的做法。</li><li>光罩層數越多，成本和生產週期越高。</li><li>晶圓會反覆回到同一類機台，讓排程變得非常複雜。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>James D. Plummer、Michael D. Deal、Peter B. Griffin，《Silicon VLSI Technology》，第 2 章（完整的 CMOS 流程介紹）</li><li>Michael Quirk、Julian Serda，《Semiconductor Manufacturing Technology》，製程整合相關章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-10\" class=\"semi-link\">← 上一章：第 10 章 金屬化</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-12\" class=\"semi-link\">下一章：第 12 章 先進電晶體結構 →</a></p>"
  },
  {
    "id": "ch12",
    "part": "第 3 部　製程整合",
    "partId": "part-3",
    "num": 12,
    "shortTitle": "先進電晶體結構",
    "fullTitle": "第 12 章　先進電晶體結構：從平面到立體",
    "category": "integration",
    "waferTrack": "- 前一站：走完一條平面電晶體的 CMOS 流程\r\n- **本章：電晶體結構如何從平面走向立體**\r\n- 下一站：看記憶體的製程",
    "headings": [
      {
        "text": "平面電晶體的極限",
        "id": "平面電晶體的極限"
      },
      {
        "text": "換材料：應變矽與 HKMG",
        "id": "換材料應變矽與-hkmg"
      },
      {
        "text": "FinFET：讓通道站起來",
        "id": "finfet讓通道站起來"
      },
      {
        "text": "GAA：閘極完全包住通道",
        "id": "gaa閘極完全包住通道"
      },
      {
        "text": "背面供電：把電源線搬到背面",
        "id": "背面供電把電源線搬到背面"
      },
      {
        "text": "結構演進一覽",
        "id": "結構演進一覽"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-12-章-先進電晶體結構從平面到立體\" class=\"heading-anchor\">第 12 章　先進電晶體結構：從平面到立體<a class=\"anchor-link\" href=\"#第-12-章-先進電晶體結構從平面到立體\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：走完一條平面電晶體的 CMOS 流程</li><li><strong>本章：電晶體結構如何從平面走向立體</strong></li><li>下一站：看記憶體的製程</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"平面電晶體的極限\" class=\"heading-anchor\">平面電晶體的極限<a class=\"anchor-link\" href=\"#平面電晶體的極限\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">第 2 章提到，電晶體縮小到一定程度後，閘極會越來越難控制通道。原因是在平面電晶體中，閘極只從<strong>上方</strong>控制通道。當源極和汲極靠得太近，下方較深的地方就會有電流「偷偷溜過去」，即使閘極關閉也一樣，就像水龍頭關不緊。</p>\n<p class=\"semi-p\">另一個問題是閘極絕緣層。為了讓閘極控制得更好，絕緣層越做越薄，最後薄到只剩幾層原子，電子會直接穿過去，造成漏電。</p>\n<p class=\"semi-p\">產業的解法分成兩條路：<strong>換材料</strong>和<strong>換結構</strong>。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"換材料應變矽與-hkmg\" class=\"heading-anchor\">換材料：應變矽與 HKMG<a class=\"anchor-link\" href=\"#換材料應變矽與-hkmg\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li><strong>應變矽</strong>：把矽的晶格輕微拉開或擠壓，讓電子和電洞跑得更快。例如在 PMOS 的源極和汲極長入矽鍺，擠壓通道。</li><li><strong>HKMG</strong>：改用高介電常數的絕緣層，可以用比較厚的絕緣層達到同樣的控制力，減少漏電；閘極也從多晶矽改回金屬，見<a href=\"#node-11\" class=\"semi-link\">第 11 章</a>。</li></ul>\n<p class=\"semi-p\">---</p>\n<h2 id=\"finfet讓通道站起來\" class=\"heading-anchor\">FinFET：讓通道站起來<a class=\"anchor-link\" href=\"#finfet讓通道站起來\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>FinFET</strong> 把通道做成一片垂直豎立的薄「鰭」，閘極從<strong>三面</strong>包住它。控制的面積變多，漏電就大幅減少。FinFET 在 2010 年代初期進入量產，成為十多年來先進製程的主流。</p>\n<p class=\"semi-p\">鰭的間距非常小，通常要用第 4 章提到的多重曝光技巧才做得出來。而且一個電晶體的驅動能力，取決於它用了幾根鰭，所以設計時只能選擇「一根、兩根、三根」，無法任意調整。</p>\n<p class=\"semi-p\"><!-- 圖：平面電晶體、FinFET、GAA 的立體對照（閘極包覆通道的面數） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜FinFET（鰭式場效電晶體）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：通道做成垂直鰭狀、閘極從三面包覆通道的電晶體結構。</li><li><strong>現場用法</strong>：「這個元件用了三根 Fin。」</li><li><strong>相關名詞</strong>：Fin、多重曝光、GAA</li><li><strong>常見混淆</strong>：FinFET 的名稱來自形狀像魚鰭，和材料無關。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"gaa閘極完全包住通道\" class=\"heading-anchor\">GAA：閘極完全包住通道<a class=\"anchor-link\" href=\"#gaa閘極完全包住通道\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">當 FinFET 也縮到極限，下一步是讓閘極從<strong>四面</strong>完全包住通道，稱為 <strong>GAA</strong>（Gate-All-Around）。目前主流的 GAA 把通道做成幾片水平堆疊的薄片，稱為<strong>奈米片</strong>（Nanosheet），在 2020 年代開始進入量產。</p>\n<p class=\"semi-p\">它的關鍵製程大致如下：</p>\n<p class=\"semi-p\"><strong>交替磊晶矽與矽鍺 → 做出鰭狀結構 → 做假閘極 → 做內側間隔物 → 挖掉矽鍺、釋放通道 → 填入閘極材料</strong></p>\n<p class=\"semi-p\">最關鍵的一步是「挖掉矽鍺」：用選擇比極高的蝕刻，只把夾在中間的矽鍺層移除，留下一片片懸空的矽通道，再用 ALD 把閘極絕緣層和金屬填進片與片之間的縫隙。</p>\n<p class=\"semi-p\">奈米片的寬度可以調整，所以設計者不再像 FinFET 一樣只能選擇鰭的數量。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜GAA 與奈米片（Gate-All-Around / Nanosheet）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：GAA 是閘極完全包住通道的電晶體結構；奈米片是目前最主流的 GAA 做法，通道是幾片水平堆疊的薄片。</li><li><strong>現場用法</strong>：「這一代改成 GAA，Sheet 疊了三層。」</li><li><strong>相關名詞</strong>：矽鍺、通道釋放、內側間隔物</li><li><strong>常見混淆</strong>：GAA 是概念，奈米片是實現方式之一。還有奈米線等其他形式，名稱經常被混用。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"背面供電把電源線搬到背面\" class=\"heading-anchor\">背面供電：把電源線搬到背面<a class=\"anchor-link\" href=\"#背面供電把電源線搬到背面\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">傳統上，訊號線和電源線全部擠在晶圓正面的金屬層中。電晶體越密集，導線就越擁擠，電源線太細還會造成電壓下降。</p>\n<p class=\"semi-p\"><strong>背面供電</strong>的做法，是把電源網路搬到晶圓的背面：先把晶圓正面接合到另一片承載晶圓上，翻過來，把原本的晶圓磨到極薄，再在背面做出電源導線。這樣正面就能留給訊號線使用，電源也更穩定。這項技術在 2020 年代中期開始導入量產。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"結構演進一覽\" class=\"heading-anchor\">結構演進一覽<a class=\"anchor-link\" href=\"#結構演進一覽\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>結構</th><th>閘極包覆通道</th><th>開始量產</th><th>主要製程挑戰</th></tr></thead><tbody><tr><td>平面電晶體</td><td>一面</td><td>很早期，成熟製程仍廣泛使用</td><td>漏電、短通道效應</td></tr><tr><td>FinFET</td><td>三面</td><td>2010 年代</td><td>鰭的形狀與均勻度</td></tr><tr><td>GAA 奈米片</td><td>四面</td><td>2020 年代</td><td>選擇性蝕刻、內側間隔物</td></tr></tbody></table></div>\n<p class=\"semi-p\">再往下走，產業正在研究把 NMOS 和 PMOS 上下疊在一起的結構，以及用新材料作為通道。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜先做一個假的，再換成真的</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：新人常常疑惑，為什麼很多材料鋪上去之後又被挖掉。</li><li><strong>做法</strong>：先進製程大量使用<strong>犧牲層</strong>：例如先做假閘極再換成金屬閘極、先長矽鍺再把它挖掉，以及多重曝光中先做出、之後再移除的輔助圖形。</li><li><strong>為什麼</strong>：最終要的材料可能承受不了前面步驟的高溫，或者根本無法直接做成那個形狀，只好先用容易加工的材料「佔位」。</li><li><strong>沒做會怎樣</strong>：很多先進結構根本做不出來。理解這個思維，就比較容易看懂複雜的製程流程。</li><li><strong>相關章節</strong>：<a href=\"#node-04\" class=\"semi-link\">第 4 章 微影</a>、<a href=\"#node-13\" class=\"semi-link\">第 13 章 記憶體製程</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜結構越立體，量測越困難</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：GAA 的通道藏在閘極裡面，從上方根本看不到。</li><li><strong>做法</strong>：改用光學模型推算立體結構的尺寸，並定期把晶圓切開，用電子顯微鏡觀察剖面。</li><li><strong>為什麼</strong>：平面結構從上往下看就能量線寬，立體結構卻有高度、側壁角度、每一層的厚度要確認。</li><li><strong>沒做會怎樣</strong>：結構異常無法在製程中被即時發現，要等到電性測試才知道。</li><li><strong>相關章節</strong>：<a href=\"#node-15\" class=\"semi-link\">第 15 章 量測與檢測</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>平面電晶體縮小後，閘極控制力不足，漏電越來越嚴重。</li><li>應變矽和 HKMG 從材料面改善電晶體效能。</li><li>FinFET 讓閘極從三面包住通道，GAA 則從四面完全包住。</li><li>背面供電把電源線搬到晶圓背面，讓正面留給訊號線。</li><li>先進製程大量使用「先做假的、再換成真的」的犧牲層做法。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>IEEE IRDS（International Roadmap for Devices and Systems），More Moore 章節</li><li>IEEE IEDM（International Electron Devices Meeting）歷年論文</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-11\" class=\"semi-link\">← 上一章：第 11 章 走一遍完整的 CMOS 流程</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-13\" class=\"semi-link\">下一章：第 13 章 記憶體製程 →</a></p>"
  },
  {
    "id": "ch13",
    "part": "第 3 部　製程整合",
    "partId": "part-3",
    "num": 13,
    "shortTitle": "記憶體製程",
    "fullTitle": "第 13 章　記憶體製程：DRAM、3D NAND 與 HBM",
    "category": "integration",
    "waferTrack": "- 前一站：認識邏輯晶片的電晶體結構\r\n- **本章：記憶體的製程：DRAM、3D NAND 與 HBM**\r\n- 下一站：讀懂製程的「幾奈米」",
    "headings": [
      {
        "text": "記憶體和邏輯晶片有什麼不同",
        "id": "記憶體和邏輯晶片有什麼不同"
      },
      {
        "text": "DRAM：一個電晶體加一個電容",
        "id": "dram一個電晶體加一個電容"
      },
      {
        "text": "3D NAND：往上蓋大樓",
        "id": "3d-nand往上蓋大樓"
      },
      {
        "text": "HBM：把 DRAM 疊起來",
        "id": "hbm把-dram-疊起來"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-13-章-記憶體製程dram3d-nand-與-hbm\" class=\"heading-anchor\">第 13 章　記憶體製程：DRAM、3D NAND 與 HBM<a class=\"anchor-link\" href=\"#第-13-章-記憶體製程dram3d-nand-與-hbm\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：認識邏輯晶片的電晶體結構</li><li><strong>本章：記憶體的製程：DRAM、3D NAND 與 HBM</strong></li><li>下一站：讀懂製程的「幾奈米」</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"記憶體和邏輯晶片有什麼不同\" class=\"heading-anchor\">記憶體和邏輯晶片有什麼不同<a class=\"anchor-link\" href=\"#記憶體和邏輯晶片有什麼不同\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">邏輯晶片（例如處理器）裡有各式各樣的電路，需要很多層金屬導線，追求的是速度。記憶體則是由數十億個<strong>完全相同的記憶單元</strong>排成巨大的陣列，追求的是<strong>密度和每個位元的成本</strong>。</p>\n<p class=\"semi-p\">一顆記憶體晶片通常包含兩個部分：</p>\n<ul class=\"semi-ul\"><li><strong>記憶陣列</strong>：存放資料的記憶單元，占晶片大部分的面積。</li><li><strong>周邊電路</strong>：負責讀寫、選擇位址等工作的邏輯電路。</li></ul>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>種類</th><th>斷電後資料</th><th>主要用途</th><th>特色</th></tr></thead><tbody><tr><td>DRAM</td><td>消失</td><td>電腦、手機的主記憶體</td><td>速度快，但要不斷刷新</td></tr><tr><td>NAND Flash</td><td>保留</td><td>固態硬碟、手機儲存空間</td><td>容量大、成本低</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"dram一個電晶體加一個電容\" class=\"heading-anchor\">DRAM：一個電晶體加一個電容<a class=\"anchor-link\" href=\"#dram一個電晶體加一個電容\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">DRAM 的每個記憶單元，由<strong>一個電晶體和一個電容</strong>組成：電晶體是開關，電容是一個存放電荷的小水桶，有電荷代表 1，沒有代表 0。</p>\n<p class=\"semi-p\">這個水桶會慢慢漏水，所以 DRAM 必須定期把資料讀出來再寫回去，稱為<strong>刷新</strong>（Refresh），見<a href=\"#node-24\" class=\"semi-link\">第 24 章</a>。</p>\n<p class=\"semi-p\">DRAM 製程最大的挑戰在電容。單元的面積越來越小，但電容仍然要存得下足夠的電荷，所以只能往上長：現代 DRAM 的電容是高度為寬度數十倍的細長圓柱，像一根根摩天大樓。要挖出和填滿這麼深的結構，需要極高深寬比的蝕刻和沉積。</p>\n<p class=\"semi-p\">為了節省面積，DRAM 的電晶體閘極也被埋進矽裡，稱為<strong>埋入式字元線</strong>。</p>\n<p class=\"semi-p\"><!-- 圖：DRAM 記憶單元剖面（埋入式字元線、位元線、高聳的圓柱電容） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜DRAM（Dynamic Random Access Memory，動態隨機存取記憶體）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：以電容儲存電荷來記錄資料的記憶體，速度快，但需要定期刷新，斷電後資料會消失。</li><li><strong>現場用法</strong>：「這一代 DRAM 是 1β。」</li><li><strong>相關名詞</strong>：1T1C、電容、字元線、位元線、刷新</li><li><strong>常見混淆</strong>：DRAM 的世代用 1x、1y、1z、1α、1β、1γ 等代號命名，代表都屬於 10 奈米級，和邏輯製程的「幾奈米」不能直接比較，見<a href=\"#node-14\" class=\"semi-link\">第 14 章</a>。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"3d-nand往上蓋大樓\" class=\"heading-anchor\">3D NAND：往上蓋大樓<a class=\"anchor-link\" href=\"#3d-nand往上蓋大樓\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">NAND Flash 把電荷存放在一層特殊的儲存層中，斷電後電荷仍然留著，所以資料不會消失。</p>\n<p class=\"semi-p\">早期的 NAND 是平面的，縮小到一定程度後，每個單元能存的電子太少，相鄰單元也會互相干擾。於是產業改變思路：<strong>不再縮小，而是往上疊</strong>，這就是 <strong>3D NAND</strong>。它的主要流程如下：</p>\n<p class=\"semi-p\"><strong>交替堆疊氧化層與氮化層 → 挖出通道孔 → 鋪上儲存層與通道 → 做出階梯 → 把氮化層換成金屬</strong></p>\n<ol class=\"semi-ol\"><li><strong>堆疊</strong>：交替鋪上氧化層和氮化層，疊成數百層。</li><li><strong>通道孔</strong>：一口氣挖穿整個堆疊，孔又深又窄，常常要分成幾段來挖再接起來。</li><li><strong>儲存層與通道</strong>：沿著孔壁依序鋪上儲存層和通道材料。</li><li><strong>階梯</strong>：把堆疊的邊緣做成一階一階的形狀，讓上方的接觸窗能分別接到每一層。</li><li><strong>字元線置換</strong>：把氮化層挖掉，換成金屬，成為控制每一層記憶單元的字元線。</li></ol>\n<p class=\"semi-p\">很多 3D NAND 還會把周邊電路做在記憶陣列的<strong>正下方</strong>，進一步節省面積。</p>\n<p class=\"semi-p\"><!-- 圖：3D NAND 剖面（交替堆疊層、垂直通道孔、邊緣的階梯結構） --></p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\">[!NOTE]</p>\n<p class=\"semi-p\"><strong>📖 名詞｜3D NAND</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：把記憶單元沿著垂直方向堆疊的 NAND Flash，靠增加層數提高容量。</li><li><strong>現場用法</strong>：「這一代又多疊了好幾十層。」</li><li><strong>相關名詞</strong>：通道孔、階梯、字元線置換、高深寬比蝕刻</li><li><strong>常見混淆</strong>：層數不是唯一的指標。每個單元存幾個位元、單元的大小、周邊電路的位置，都會影響實際的容量密度和成本。</li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜疊得越高，晶圓越容易彎</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：3D NAND 要在晶圓上堆疊數百層薄膜。</li><li><strong>做法</strong>：仔細調整每一層薄膜的應力，讓拉力和壓力互相抵銷，並持續量測晶圓的彎曲程度，必要時在晶圓背面鋪上補償用的薄膜。</li><li><strong>為什麼</strong>：每一層薄膜都有一點應力，數百層累積起來，就足以讓整片晶圓翹曲。</li><li><strong>沒做會怎樣</strong>：晶圓無法平貼在曝光機上，造成對準誤差；嚴重時機械手臂甚至無法正常取放晶圓。</li><li><strong>相關章節</strong>：<a href=\"#node-05\" class=\"semi-link\">第 5 章 薄膜</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"hbm把-dram-疊起來\" class=\"heading-anchor\">HBM：把 DRAM 疊起來<a class=\"anchor-link\" href=\"#hbm把-dram-疊起來\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">人工智慧運算需要在處理器和記憶體之間搬運大量資料。<strong>HBM</strong>（High Bandwidth Memory，高頻寬記憶體）把多顆 DRAM 晶片垂直疊在一起，緊貼在處理器旁邊，讓資料傳輸的頻寬大幅提升。</p>\n<p class=\"semi-p\">疊起來的 DRAM 晶片之間，靠穿過晶片的垂直導線連接，稱為 <strong>TSV</strong>。製作 HBM 的主要步驟包括：做出 TSV、把晶圓磨薄到只剩幾十微米、做出微小的凸塊，再把 8 顆、12 顆甚至更多晶片疊起來接合。HBM 和處理器的整合方式，見<a href=\"#node-21\" class=\"semi-link\">第 21 章</a>。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\">[!NOTE]</p>\n<p class=\"semi-p\"><strong>📖 名詞｜TSV（Through-Silicon Via，矽穿孔）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：垂直貫穿整顆晶片、填滿金屬的導線，讓上下疊在一起的晶片可以直接連通。</li><li><strong>現場用法</strong>：「TSV 的孔太深，銅沒有填滿。」</li><li><strong>相關名詞</strong>：HBM、晶圓薄化、微凸塊、3D 堆疊</li><li><strong>常見混淆</strong>：TSV 和晶片內部的導通孔（Via）不同。Via 只連接晶片內相鄰的金屬層，TSV 則貫穿整個矽基板。</li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜記憶體裡藏著備用電路</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：一顆記憶體有數十億個記憶單元，幾乎不可能每個都完美。</li><li><strong>做法</strong>：設計時預留備用的行與列。測試時找到壞掉的單元，就用熔絲把它切換到備用電路上，稱為<strong>修補</strong>（Repair）。</li><li><strong>為什麼</strong>：只要壞掉的數量在可修補範圍內，整顆晶片就能「救回來」。</li><li><strong>沒做會怎樣</strong>：只要有一個單元壞掉，整顆晶片就得報廢，記憶體的良率會低到無法接受。</li><li><strong>相關章節</strong>：<a href=\"#node-19\" class=\"semi-link\">第 19 章 晶圓測試</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>記憶體由大量相同的記憶單元組成，追求密度和每個位元的成本。</li><li>DRAM 用一個電晶體加一個電容存放資料，電容必須做成又細又高的結構。</li><li>3D NAND 不再縮小單元，而是把記憶單元往上堆疊到數百層。</li><li>HBM 用 TSV 把多顆 DRAM 疊在一起，提供極高的頻寬。</li><li>記憶體靠備用電路修補壞掉的單元，提高良率。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Rino Micheloni、Luca Crippa、Alessia Marelli，《Inside NAND Flash Memories》</li><li>Bruce Jacob、Spencer W. Ng、David T. Wang，《Memory Systems: Cache, DRAM, Disk》</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-12\" class=\"semi-link\">← 上一章：第 12 章 先進電晶體結構</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-14\" class=\"semi-link\">下一章：第 14 章 「幾奈米」是什麼意思 →</a></p>"
  },
  {
    "id": "ch14",
    "part": "第 3 部　製程整合",
    "partId": "part-3",
    "num": 14,
    "shortTitle": "「幾奈米」是什麼意思",
    "fullTitle": "第 14 章　「幾奈米」是什麼意思：讀懂製程節點",
    "category": "integration",
    "waferTrack": "- 前一站：認識了邏輯和記憶體的各種結構\r\n- **本章：讀懂新聞裡常聽到的「幾奈米製程」**\r\n- 下一站：進入品質與良率的世界",
    "headings": [
      {
        "text": "「3 奈米」裡沒有 3 奈米",
        "id": "3-奈米裡沒有-3-奈米"
      },
      {
        "text": "名稱的由來",
        "id": "名稱的由來"
      },
      {
        "text": "真正該看的尺寸",
        "id": "真正該看的尺寸"
      },
      {
        "text": "為什麼不同公司的「幾奈米」不能直接比",
        "id": "為什麼不同公司的幾奈米不能直接比"
      },
      {
        "text": "微縮不只靠製程",
        "id": "微縮不只靠製程"
      },
      {
        "text": "成熟製程一樣重要",
        "id": "成熟製程一樣重要"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-14-章-幾奈米是什麼意思讀懂製程節點\" class=\"heading-anchor\">第 14 章　「幾奈米」是什麼意思：讀懂製程節點<a class=\"anchor-link\" href=\"#第-14-章-幾奈米是什麼意思讀懂製程節點\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：認識了邏輯和記憶體的各種結構</li><li><strong>本章：讀懂新聞裡常聽到的「幾奈米製程」</strong></li><li>下一站：進入品質與良率的世界</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"3-奈米裡沒有-3-奈米\" class=\"heading-anchor\">「3 奈米」裡沒有 3 奈米<a class=\"anchor-link\" href=\"#3-奈米裡沒有-3-奈米\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">新聞常說某顆晶片使用「3 奈米製程」，很多人以為晶片上有某個東西只有 3 奈米寬。事實上，在 3 奈米世代的晶片上，電晶體閘極之間的距離大約是四、五十奈米，找不到任何一個結構是 3 奈米。</p>\n<p class=\"semi-p\">「幾奈米」其實是一個<strong>世代的名稱</strong>，而不是實際的尺寸。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"名稱的由來\" class=\"heading-anchor\">名稱的由來<a class=\"anchor-link\" href=\"#名稱的由來\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">在半導體發展的早期，節點名稱大致等於電晶體閘極的長度，或是最密集線路的寬度，名稱和實際尺寸是對得上的。</p>\n<p class=\"semi-p\">產業習慣每一代把尺寸縮小到大約 0.7 倍。長和寬都乘以 0.7，面積就變成大約一半，同樣面積可以放進兩倍的電晶體。所以節點名稱一路沿著 180、130、90、65、45、32、22、14、10、7、5、3 奈米這樣的數列往下走，中間還穿插了 40、28、20、16 奈米等「半世代」節點。</p>\n<p class=\"semi-p\">後來電晶體的結構越來越複雜，實際尺寸的縮小速度跟不上名稱，兩者就逐漸脫鉤了。近年也有公司改用「埃」（Å，0.1 奈米）來命名新世代，同樣只是世代代號。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜製程節點（Process Node / Technology Node）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：代表某一代製程技術的名稱，通常以「幾奈米」表示。</li><li><strong>現場用法</strong>：「這個產品要從 7 奈米移到 5 奈米。」</li><li><strong>相關名詞</strong>：微縮、摩爾定律、電晶體密度</li><li><strong>常見混淆</strong>：節點名稱是世代代號，不是晶片上任何結構的實際尺寸，也和微影量測的 CD 是不同的東西。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"真正該看的尺寸\" class=\"heading-anchor\">真正該看的尺寸<a class=\"anchor-link\" href=\"#真正該看的尺寸\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">要比較兩個製程，比較有意義的是以下幾個數字：</p>\n<ul class=\"semi-ul\"><li><strong>閘極間距</strong>（CPP，Contacted Poly Pitch）：相鄰兩個閘極之間的距離。</li><li><strong>最小金屬間距</strong>（MMP，Minimum Metal Pitch）：最密集那層金屬導線的間距。</li><li><strong>電晶體密度</strong>：每平方毫米能放進多少個電晶體，常用「百萬個電晶體／平方毫米」表示。</li><li><strong>SRAM 單元面積</strong>：一個 SRAM 記憶單元的大小，常被拿來當作密度的參考。</li></ul>\n<p class=\"semi-p\"><!-- 圖：閘極間距與金屬間距示意（從上方看的閘極與導線排列，標出間距） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜間距（Pitch）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：重複排列的圖形中，一條線加上一個間隔的總寬度。</li><li><strong>現場用法</strong>：「這層的 Pitch 太小，一次曝光做不出來。」</li><li><strong>相關名詞</strong>：CPP、MMP、半間距、CD</li><li><strong>常見混淆</strong>：Pitch 是「線寬加間隔」，CD 通常只指線寬本身。Pitch 的一半稱為半間距。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"為什麼不同公司的幾奈米不能直接比\" class=\"heading-anchor\">為什麼不同公司的「幾奈米」不能直接比<a class=\"anchor-link\" href=\"#為什麼不同公司的幾奈米不能直接比\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">節點名稱沒有統一的標準，每家公司都用自己的方式命名。名稱相同的製程，密度可能差很多；名稱數字較大的製程，密度也可能反而更高。</p>\n<p class=\"semi-p\">另外，同一個世代通常會推出好幾個版本，例如效能加強版、低功耗版、低成本版，彼此的特性也不完全相同。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"微縮不只靠製程\" class=\"heading-anchor\">微縮不只靠製程<a class=\"anchor-link\" href=\"#微縮不只靠製程\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">近年的微縮，很大一部分來自<strong>設計與製程的共同最佳化</strong>（DTCO）。例如重新設計標準元件的排列方式、減少每個元件需要的金屬導線軌道數，在製程尺寸沒有縮小太多的情況下，也能讓晶片面積變小。</p>\n<p class=\"semi-p\">晶圓廠會提供設計者一套資料，包括必須遵守的<strong>設計規則</strong>和電晶體的電性模型，稱為 <strong>PDK</strong>（Process Design Kit）。設計者依照 PDK 設計，才能確保晶片做得出來，而且符合預期。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜比較製程時，看密度和間距，不看名字</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：新聞說某家的「N 奈米」打敗另一家的「M 奈米」。</li><li><strong>做法</strong>：比較電晶體密度、閘極間距、金屬間距、SRAM 面積，以及在相同條件下的效能與功耗。</li><li><strong>為什麼</strong>：節點名稱沒有統一定義，只看數字容易被誤導。</li><li><strong>沒做會怎樣</strong>：得出錯誤的結論，例如以為數字小的製程一定比較密、比較好。</li><li><strong>相關章節</strong>：<a href=\"#node-12\" class=\"semi-link\">第 12 章 先進電晶體結構</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"成熟製程一樣重要\" class=\"heading-anchor\">成熟製程一樣重要<a class=\"anchor-link\" href=\"#成熟製程一樣重要\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">最先進的製程雖然最受矚目，但世界上大量的晶片仍然使用二十多奈米以上的<strong>成熟製程</strong>，例如汽車電子、電源管理、微控制器、感測器和顯示器驅動晶片。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜不是每顆晶片都需要最先進的製程</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：一個新產品要決定使用哪一代製程。</li><li><strong>做法</strong>：依照效能需求、成本、產量、類比或高電壓的需求來選擇，而不是一味追求最新世代。</li><li><strong>為什麼</strong>：先進製程的光罩和設計成本非常高，只有銷量大、對效能要求高的產品才划算。很多類比和高電壓電路在成熟製程上反而表現更好，可靠度也經過長期驗證。</li><li><strong>沒做會怎樣</strong>：產品成本過高而失去競爭力，或者無法滿足類比、耐壓與可靠度的需求。</li><li><strong>相關章節</strong>：<a href=\"#node-22\" class=\"semi-link\">第 22 章 最終測試與可靠度</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>「幾奈米」是世代名稱，不是晶片上任何結構的實際尺寸。</li><li>早期節點名稱對應實際尺寸，後來逐漸脫鉤。</li><li>比較製程應該看閘極間距、金屬間距、電晶體密度和 SRAM 面積。</li><li>微縮也靠設計與製程的共同最佳化，PDK 是兩者之間的橋樑。</li><li>成熟製程仍然支撐著大量的晶片產品。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>IEEE IRDS（International Roadmap for Devices and Systems），More Moore 章節</li><li>WikiChip 網站的技術節點相關頁面</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-13\" class=\"semi-link\">← 上一章：第 13 章 記憶體製程</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-15\" class=\"semi-link\">下一章：第 15 章 量測與檢測 →</a></p>"
  },
  {
    "id": "ch15",
    "part": "第 4 部　品質與良率",
    "partId": "part-4",
    "num": 15,
    "shortTitle": "量測與檢測",
    "fullTitle": "第 15 章　量測與檢測：工廠的眼睛",
    "category": "quality",
    "waferTrack": "- 前一站：任何一個重要的製程步驟完成之後\r\n- **本章：量測與檢測，確認這一步做得對不對**\r\n- 下一站：合格就繼續下一站，不合格就被擋下來處理",
    "headings": [
      {
        "text": "工廠的眼睛",
        "id": "工廠的眼睛"
      },
      {
        "text": "量測與檢測不一樣",
        "id": "量測與檢測不一樣"
      },
      {
        "text": "常見的量測",
        "id": "常見的量測"
      },
      {
        "text": "缺陷檢測",
        "id": "缺陷檢測"
      },
      {
        "text": "抽樣：不是每片都量",
        "id": "抽樣不是每片都量"
      },
      {
        "text": "破壞性分析",
        "id": "破壞性分析"
      },
      {
        "text": "量測常見的陷阱",
        "id": "量測常見的陷阱"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-15-章-量測與檢測工廠的眼睛\" class=\"heading-anchor\">第 15 章　量測與檢測：工廠的眼睛<a class=\"anchor-link\" href=\"#第-15-章-量測與檢測工廠的眼睛\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：任何一個重要的製程步驟完成之後</li><li><strong>本章：量測與檢測，確認這一步做得對不對</strong></li><li>下一站：合格就繼續下一站，不合格就被擋下來處理</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"工廠的眼睛\" class=\"heading-anchor\">工廠的眼睛<a class=\"anchor-link\" href=\"#工廠的眼睛\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶片上的結構只有幾奈米到幾十奈米，用肉眼根本看不見。每完成一個重要步驟，工廠都需要用各種機台確認：厚度對不對、線寬對不對、有沒有缺陷。</p>\n<p class=\"semi-p\">這些機台就是工廠的眼睛。它們產生的數據，決定了晶圓能不能往下走，也是製程控制和良率分析的基礎。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"量測與檢測不一樣\" class=\"heading-anchor\">量測與檢測不一樣<a class=\"anchor-link\" href=\"#量測與檢測不一樣\" aria-hidden=\"true\">#</a></h2>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜量測與檢測（Metrology / Inspection）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：量測是測量具體的數值，例如膜厚、線寬；檢測是在晶圓上尋找缺陷，例如微粒、刮傷、圖形異常。</li><li><strong>現場用法</strong>：「這站只有量膜厚，沒有做缺陷掃描。」</li><li><strong>相關名詞</strong>：CD-SEM、膜厚量測、缺陷掃描、複檢</li><li><strong>常見混淆</strong>：現場常把兩者都籠統地叫「量測」。但量測的結果是一組數字，檢測的結果是一張標出缺陷位置的分佈圖，用途不同。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見的量測\" class=\"heading-anchor\">常見的量測<a class=\"anchor-link\" href=\"#常見的量測\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>量什麼</th><th>怎麼量</th><th>常見時機</th></tr></thead><tbody><tr><td>膜厚</td><td>用光照射薄膜，分析反射光的變化</td><td>薄膜沉積、CMP 之後</td></tr><tr><td>線寬（CD）</td><td>用電子顯微鏡從上方量測，稱為 CD-SEM</td><td>微影、蝕刻之後</td></tr><tr><td>立體輪廓</td><td>分析光的散射，搭配模型推算形狀，稱為 OCD</td><td>先進結構的關鍵步驟</td></tr><tr><td>對準（Overlay）</td><td>量測上下兩層的對準記號</td><td>微影之後</td></tr><tr><td>片電阻</td><td>用四根探針接觸表面量測</td><td>佈植、退火、金屬沉積之後</td></tr></tbody></table></div>\n<p class=\"semi-p\">很多量測不是在真正的電路上進行，而是在晶粒之間的<strong>切割道</strong>或特定位置上，放置專門設計的量測圖形。這樣既不會碰到電路，量測結果也比較穩定。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"缺陷檢測\" class=\"heading-anchor\">缺陷檢測<a class=\"anchor-link\" href=\"#缺陷檢測\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">缺陷檢測通常分成兩步：</p>\n<ol class=\"semi-ol\"><li><strong>掃描</strong>：用光學或電子束掃過整片晶圓。機台會比對相鄰晶粒的影像，因為每顆晶粒應該長得一模一樣，所以有差異的地方，就可能是缺陷。</li><li><strong>複檢</strong>：用電子顯微鏡對找到的缺陷拍攝近照，判斷它是什麼種類，例如微粒、刮傷或圖形橋接。</li></ol>\n<p class=\"semi-p\">最後會得到一張缺陷分佈圖，標出每個缺陷在晶圓上的位置和種類。</p>\n<p class=\"semi-p\"><!-- 圖：缺陷檢測流程（全片掃描 → 比對相鄰晶粒 → 標出差異 → 電子顯微鏡複檢） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜缺陷（Defect）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：晶圓上任何不該出現的異常，例如微粒、刮傷、殘留、圖形變形或斷裂。</li><li><strong>現場用法</strong>：「這片的 Defect 數突然跳高，先 Hold 起來。」</li><li><strong>相關名詞</strong>：缺陷掃描、複檢、Killer Defect、缺陷分佈圖</li><li><strong>常見混淆</strong>：不是每個缺陷都會讓晶片壞掉。會造成晶片失效的稱為致命缺陷（Killer Defect），其他的則可能無傷大雅，見<a href=\"#node-16\" class=\"semi-link\">第 16 章</a>。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"抽樣不是每片都量\" class=\"heading-anchor\">抽樣：不是每片都量<a class=\"anchor-link\" href=\"#抽樣不是每片都量\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">如果每一片晶圓的每一個步驟都量，量測機台會大塞車，生產週期也會大幅拉長。所以工廠通常採用<strong>抽樣</strong>：只量部分批次、每批中的部分晶圓、每片晶圓上的部分位置。</p>\n<p class=\"semi-p\">穩定的製程可以降低抽樣比例；新產品、剛保養完的機台、最近出過問題的製程，則會提高抽樣比例。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜抽樣是在風險和成本之間取捨</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：要決定一個步驟多久量一次、每次量幾片。</li><li><strong>做法</strong>：依照製程的穩定度和重要性訂定抽樣規則，並由系統自動執行，例如每幾批抽一批、每批量哪幾片。</li><li><strong>為什麼</strong>：量得越多，越能及早發現問題，但量測要花時間和機台產能；量得越少，產出越快，但風險越高。</li><li><strong>沒做會怎樣</strong>：量太多會拖慢整座工廠；量太少則可能讓異常的晶圓一路流到後面才被發現，影響的批數也更多。</li><li><strong>相關章節</strong>：<a href=\"#node-18\" class=\"semi-link\">第 18 章 異常處理與工程變更</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"破壞性分析\" class=\"heading-anchor\">破壞性分析<a class=\"anchor-link\" href=\"#破壞性分析\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">有些資訊必須把晶圓切開才看得到，例如立體結構的剖面、每一層的厚度和形狀。這時會用電子顯微鏡觀察剖面。這種分析會破壞晶圓，所以主要用在製程開發和故障分析，見<a href=\"#node-16\" class=\"semi-link\">第 16 章</a>。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜量測機台本身也要被管理</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：兩台量測機台量同一片晶圓，得到不一樣的結果。</li><li><strong>做法</strong>：量測機台要定期校正，確認同一台機台重複量測的一致性，也要讓不同機台的結果互相匹配。</li><li><strong>為什麼</strong>：所有的製程判斷都建立在量測數據上。如果量測本身不準，後面的決策都會跟著錯。</li><li><strong>沒做會怎樣</strong>：好的晶圓被誤判為不合格，或不合格的晶圓被放行；自動調整製程的系統也會根據錯誤的數據「越調越歪」。</li><li><strong>相關章節</strong>：<a href=\"#node-17\" class=\"semi-link\">第 17 章 製程控制</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"量測常見的陷阱\" class=\"heading-anchor\">量測常見的陷阱<a class=\"anchor-link\" href=\"#量測常見的陷阱\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>陷阱</th><th>說明</th></tr></thead><tbody><tr><td>量到錯的位置</td><td>量測點偏離目標結構，數據失真</td></tr><tr><td>機台之間有差異</td><td>不同機台量同一片晶圓，結果不同</td></tr><tr><td>量測本身造成影響</td><td>例如電子束照射讓光阻輕微收縮</td></tr><tr><td>抽樣漏掉異常</td><td>異常剛好發生在沒有被量測的晶圓上</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>量測得到數值，檢測找出缺陷，兩者都是工廠判斷晶圓狀態的依據。</li><li>常見的量測包括膜厚、線寬、立體輪廓、對準和片電阻。</li><li>缺陷檢測透過比對相鄰晶粒找出差異，再用電子顯微鏡複檢分類。</li><li>量測採用抽樣，需要在風險和成本之間取捨。</li><li>量測機台本身也必須校正和匹配，否則數據會誤導決策。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Alain C. Diebold 編，《Handbook of Silicon Semiconductor Metrology》</li><li>Michael Quirk、Julian Serda，《Semiconductor Manufacturing Technology》，量測與檢測相關章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-14\" class=\"semi-link\">← 上一章：第 14 章 「幾奈米」是什麼意思</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-16\" class=\"semi-link\">下一章：第 16 章 良率與故障分析 →</a></p>"
  },
  {
    "id": "ch16",
    "part": "第 4 部　品質與良率",
    "partId": "part-4",
    "num": 16,
    "shortTitle": "良率與故障分析",
    "fullTitle": "第 16 章　良率與故障分析：找出晶片壞掉的原因",
    "category": "quality",
    "waferTrack": "- 前一站：晶圓完成製程，並經過電性測試\r\n- **本章：分析良率，找出晶片壞掉的原因**\r\n- 下一站：把找到的原因回饋給製程，持續改善",
    "headings": [
      {
        "text": "良率就是錢",
        "id": "良率就是錢"
      },
      {
        "text": "良率怎麼算",
        "id": "良率怎麼算"
      },
      {
        "text": "缺陷和晶粒大小",
        "id": "缺陷和晶粒大小"
      },
      {
        "text": "從晶圓圖看出線索",
        "id": "從晶圓圖看出線索"
      },
      {
        "text": "共通性分析",
        "id": "共通性分析"
      },
      {
        "text": "故障分析：找到「兇手」",
        "id": "故障分析找到兇手"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-16-章-良率與故障分析找出晶片壞掉的原因\" class=\"heading-anchor\">第 16 章　良率與故障分析：找出晶片壞掉的原因<a class=\"anchor-link\" href=\"#第-16-章-良率與故障分析找出晶片壞掉的原因\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：晶圓完成製程，並經過電性測試</li><li><strong>本章：分析良率，找出晶片壞掉的原因</strong></li><li>下一站：把找到的原因回饋給製程，持續改善</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"良率就是錢\" class=\"heading-anchor\">良率就是錢<a class=\"anchor-link\" href=\"#良率就是錢\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">一片晶圓的製造成本大致是固定的。上面的好晶片越多，每顆晶片的成本就越低。所以良率直接決定了晶片的成本和工廠的獲利。</p>\n<p class=\"semi-p\">一個新製程剛開始量產時，良率通常不高，工程師要一個一個找出問題、解決問題，良率才會逐步爬升，這個過程稱為<strong>良率學習曲線</strong>。誰能讓良率爬得更快，誰就更有競爭力。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"良率怎麼算\" class=\"heading-anchor\">良率怎麼算<a class=\"anchor-link\" href=\"#良率怎麼算\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">良率通常分成幾個階段來看：</p>\n<ul class=\"semi-ul\"><li><strong>晶圓良率</strong>（Line Yield）：投入的晶圓中，有多少片順利完成前段製程，沒有在中途報廢。</li><li><strong>晶粒良率</strong>（Die Yield）：一片晶圓上，有多少比例的晶粒通過晶圓測試。</li><li><strong>最終測試良率</strong>：封裝後的晶片中，有多少比例通過最終測試。</li></ul>\n<p class=\"semi-p\">整體良率是這幾個階段相乘。例如 98% × 90% × 99%，整體良率大約只剩 87%。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜良率（Yield）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：產出的好產品占全部產品的比例。</li><li><strong>現場用法</strong>：「這批的 CP 良率掉到八成。」</li><li><strong>相關名詞</strong>：晶圓良率、晶粒良率、最終測試良率、良率學習曲線</li><li><strong>常見混淆</strong>：聽到「良率」一定要先確認是哪一種。晶圓良率 98% 和晶粒良率 98% 代表的意義完全不同。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"缺陷和晶粒大小\" class=\"heading-anchor\">缺陷和晶粒大小<a class=\"anchor-link\" href=\"#缺陷和晶粒大小\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">可以把缺陷想像成隨機落在晶圓上的雨滴。晶粒越大，被雨滴打中的機率就越高。所以在同樣的缺陷密度下，大晶粒的良率會比小晶粒低很多。這也是近年把大晶片拆成多顆小晶片的原因之一，見<a href=\"#node-21\" class=\"semi-link\">第 21 章</a>。</p>\n<p class=\"semi-p\"><!-- 圖：同樣的缺陷分佈下，大晶粒與小晶粒的良率差異 --></p>\n<p class=\"semi-p\">良率損失大致分成兩類：</p>\n<ul class=\"semi-ul\"><li><strong>隨機性</strong>：例如微粒隨機落在晶圓上，只能靠提高整體潔淨度慢慢降低。</li><li><strong>系統性</strong>：有固定的原因，例如某種圖形特別容易出問題、某台機台異常、晶圓邊緣控制不好。找到原因，往往就能一次解決。</li></ul>\n<p class=\"semi-p\">---</p>\n<h2 id=\"從晶圓圖看出線索\" class=\"heading-anchor\">從晶圓圖看出線索<a class=\"anchor-link\" href=\"#從晶圓圖看出線索\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶圓測試後，每一顆晶粒的好壞會畫成一張<strong>晶圓圖</strong>。壞晶粒的分佈形狀，常常就是找出原因的第一條線索。</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>圖形特徵</th><th>可能的方向</th></tr></thead><tbody><tr><td>集中在晶圓中心</td><td>沉積、蝕刻或研磨在中心與周圍的差異</td></tr><tr><td>環狀，或集中在邊緣</td><td>晶圓邊緣的製程控制問題</td></tr><tr><td>一條直線或弧線</td><td>刮傷</td></tr><tr><td>每個曝光區的相同位置</td><td>光罩缺陷或曝光問題</td></tr><tr><td>群聚成一團</td><td>局部污染或局部異常</td></tr><tr><td>隨機散佈</td><td>微粒等隨機缺陷</td></tr></tbody></table></div>\n<p class=\"semi-p\"><figure class=\"semi-figure\"><img src=\"assets/16-wafer-map-patterns.svg\" alt=\"六種常見的晶圓圖型態：集中在中心、環狀集中在邊緣、弧線狀的刮痕、每個曝光區的相同位置、群聚成一團、隨機散佈\" class=\"semi-img\" loading=\"lazy\" /><figcaption>六種常見的晶圓圖型態：集中在中心、環狀集中在邊緣、弧線狀的刮痕、每個曝光區的相同位置、群聚成一團、隨機散佈</figcaption></figure></p>\n<p class=\"semi-p\"><em>圖：常見的晶圓圖型態。藍色是好的晶粒，橘色是壞的晶粒。① 集中在中心 ② 環狀集中在邊緣 ③ 弧線狀的刮痕 ④ 每個曝光區的相同位置（白線是曝光區的邊界） ⑤ 群聚成一團 ⑥ 隨機散佈。</em></p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\">[!NOTE]</p>\n<p class=\"semi-p\"><strong>📖 名詞｜晶圓圖（Wafer Map）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：把晶圓上每一顆晶粒的測試結果，依照位置畫出來的分佈圖。</li><li><strong>現場用法</strong>：「這片的 Map 有一條刮痕。」</li><li><strong>相關名詞</strong>：Bin、晶圓測試、缺陷分佈圖</li><li><strong>常見混淆</strong>：晶圓圖是電性測試的結果，缺陷分佈圖則是缺陷檢測的結果。把兩張圖疊起來比對，可以判斷哪些缺陷真的造成晶片失效。</li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜每個曝光區都壞在同一個位置，先查光罩</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：晶圓圖上的壞晶粒，在每一個曝光區裡都出現在相同的位置。</li><li><strong>做法</strong>：優先檢查這一層使用的光罩，以及相關的曝光條件。</li><li><strong>為什麼</strong>：曝光機每次曝光都使用同一片光罩，光罩上的缺陷會被「複製」到每一個曝光區。</li><li><strong>沒做會怎樣</strong>：如果把它當成一般的隨機缺陷，會花很多時間在錯誤的方向上，而有問題的光罩還會持續影響後面的晶圓。</li><li><strong>相關章節</strong>：<a href=\"#node-04\" class=\"semi-link\">第 4 章 微影</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"共通性分析\" class=\"heading-anchor\">共通性分析<a class=\"anchor-link\" href=\"#共通性分析\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">當幾批晶圓的良率特別差，最有效的第一步，是找出這些晶圓的<strong>共同點</strong>：它們是不是都經過同一台機台、同一個腔體？是不是在同一段時間生產？是不是用了同一批化學品？</p>\n<p class=\"semi-p\">這種分析叫做<strong>共通性分析</strong>，靠的是工廠系統記錄下來的每片晶圓的完整履歷，見<a href=\"#node-23\" class=\"semi-link\">第 23 章</a>。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜先找共同點，再找原因</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：好幾批晶圓良率異常，但原因不明。</li><li><strong>做法</strong>：把良率差的晶圓和良率正常的晶圓，逐站比對經過的機台、腔體、時間與材料，找出只有壞晶圓才有的共同點。</li><li><strong>為什麼</strong>：一片晶圓要經過數百站，不可能每站都詳細調查。共通性分析能快速把範圍縮小到少數幾站。</li><li><strong>沒做會怎樣</strong>：調查漫無目標，問題持續影響更多晶圓。</li><li><strong>相關章節</strong>：<a href=\"#node-06\" class=\"semi-link\">第 6 章 蝕刻</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"故障分析找到兇手\" class=\"heading-anchor\">故障分析：找到「兇手」<a class=\"anchor-link\" href=\"#故障分析找到兇手\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">統計分析只能告訴我們「可能是哪裡」，最後還需要<strong>故障分析</strong>（FA，Failure Analysis）找到實際的證據：</p>\n<ol class=\"semi-ol\"><li><strong>電性定位</strong>：用電性測試和特殊的影像技術，找出晶片上發生故障的位置。例如故障點常會發出微弱的光或熱。</li><li><strong>逐層剝除</strong>：把晶片上方的材料一層一層去掉，逐層觀察。</li><li><strong>精準切割</strong>：用<strong>聚焦離子束</strong>（FIB）在故障位置精準地切出剖面。</li><li><strong>觀察與分析</strong>：用電子顯微鏡觀察結構，必要時分析材料成分，確認是短路、斷路、空洞還是污染。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>良率直接決定晶片成本，新製程要經歷良率逐步爬升的學習曲線。</li><li>良率分成晶圓、晶粒和最終測試等階段，整體良率是它們相乘。</li><li>晶粒越大越容易被缺陷打中，良率越低。</li><li>晶圓圖的形狀是找出原因的第一條線索，共通性分析能快速縮小範圍。</li><li>故障分析透過電性定位和物理分析，找到故障的實際證據。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Gary S. May、Costas J. Spanos，《Fundamentals of Semiconductor Manufacturing and Process Control》，良率相關章節</li><li>EDFAS／ASM International，《Microelectronics Failure Analysis Desk Reference》</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-15\" class=\"semi-link\">← 上一章：第 15 章 量測與檢測</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-17\" class=\"semi-link\">下一章：第 17 章 製程控制 →</a></p>"
  },
  {
    "id": "ch17",
    "part": "第 4 部　品質與良率",
    "partId": "part-4",
    "num": 17,
    "shortTitle": "製程控制",
    "fullTitle": "第 17 章　製程控制：用數據讓製程保持穩定",
    "category": "quality",
    "waferTrack": "- 前一站：量測與檢測產生了大量數據\r\n- **本章：用這些數據讓製程保持穩定**\r\n- 下一站：當數據出現異常時，工廠如何處理",
    "headings": [
      {
        "text": "每一次都會有一點不同",
        "id": "每一次都會有一點不同"
      },
      {
        "text": "規格界限與管制界限",
        "id": "規格界限與管制界限"
      },
      {
        "text": "SPC：把數據畫成管制圖",
        "id": "spc把數據畫成管制圖"
      },
      {
        "text": "製程能力：Cpk",
        "id": "製程能力cpk"
      },
      {
        "text": "實驗設計與分批實驗",
        "id": "實驗設計與分批實驗"
      },
      {
        "text": "自動控制：R2R 與 FDC",
        "id": "自動控制r2r-與-fdc"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-17-章-製程控制用數據讓製程保持穩定\" class=\"heading-anchor\">第 17 章　製程控制：用數據讓製程保持穩定<a class=\"anchor-link\" href=\"#第-17-章-製程控制用數據讓製程保持穩定\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：量測與檢測產生了大量數據</li><li><strong>本章：用這些數據讓製程保持穩定</strong></li><li>下一站：當數據出現異常時，工廠如何處理</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"每一次都會有一點不同\" class=\"heading-anchor\">每一次都會有一點不同<a class=\"anchor-link\" href=\"#每一次都會有一點不同\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">同一台機台、同一個 Recipe，做出來的結果每一次都會有一點點不同。機台零件會磨損、化學品會老化、環境溫度會變化，這些都會讓製程慢慢偏移。</p>\n<p class=\"semi-p\">製程控制的目標不是消除所有變化，而是<strong>讓變化保持在小而穩定的範圍內</strong>，並且在偏移變嚴重之前就發現它。越早發現，受影響的晶圓就越少。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"規格界限與管制界限\" class=\"heading-anchor\">規格界限與管制界限<a class=\"anchor-link\" href=\"#規格界限與管制界限\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">製程控制有兩組非常重要的界限：</p>\n<ul class=\"semi-ul\"><li><strong>規格界限</strong>：產品要求的範圍，超出就代表產品不合格。</li><li><strong>管制界限</strong>：根據製程平常的表現計算出來的範圍，通常比規格界限窄。超出代表製程「不像平常」，可能有異常。</li></ul>\n<p class=\"semi-p\">可以用開車來比喻：規格界限是路的邊緣，開出去就會出事；管制界限是車道線，一壓線就該修正方向，不必等到快掉出路面。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜OOC 與 OOS（Out of Control / Out of Spec）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：OOC 是數據超出管制界限，代表製程出現異常訊號；OOS 是數據超出規格界限，代表產品不符合要求。</li><li><strong>現場用法</strong>：「這點 OOC 了，照 OCAP 先檢查機台」「OOS 的話要開 MRB 判定」。</li><li><strong>相關名詞</strong>：管制界限、規格界限、OCAP、SPC</li><li><strong>常見混淆</strong>：OOC 不代表產品不合格，但代表製程可能正在變壞，必須處理；OOS 則是產品本身已經不合格。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"spc把數據畫成管制圖\" class=\"heading-anchor\">SPC：把數據畫成管制圖<a class=\"anchor-link\" href=\"#spc把數據畫成管制圖\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>統計製程管制</strong>（SPC）把每一次的量測結果，依照時間順序畫在一張<strong>管制圖</strong>上，圖上有中心線和上下管制界限。</p>\n<p class=\"semi-p\">工程師會依照一些判斷規則找出異常，例如：</p>\n<ul class=\"semi-ul\"><li>有一點超出管制界限。</li><li>連續好幾點都落在中心線的同一側，代表平均值可能偏移了。</li><li>連續好幾點一路往上或往下，代表製程正在漂移。</li></ul>\n<p class=\"semi-p\">這些規則的重點是：即使每一點都還在規格內，只要「形狀」不對，就值得注意。</p>\n<p class=\"semi-p\"><!-- 圖：管制圖示意（中心線、管制界限、規格界限，以及超出界限和連續偏移的例子） --></p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"製程能力cpk\" class=\"heading-anchor\">製程能力：Cpk<a class=\"anchor-link\" href=\"#製程能力cpk\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>製程能力指標</strong>（Cpk）用一個數字描述製程「有多從容」地落在規格之內。</p>\n<p class=\"semi-p\">可以想像停車：規格是停車格，製程的變化範圍是車子的寬度。車子越窄、停得越置中，離兩邊的線越遠，Cpk 就越高。Cpk 高，代表就算製程稍微偏移，也不容易超出規格。</p>\n<p class=\"semi-p\">業界常見的要求是 Cpk 至少 1.33，車用等要求更高的產品，標準會更嚴格。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"實驗設計與分批實驗\" class=\"heading-anchor\">實驗設計與分批實驗<a class=\"anchor-link\" href=\"#實驗設計與分批實驗\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">要找出最好的製程條件，不能一次只改一個參數慢慢試。<strong>實驗設計</strong>（DOE）用系統化的方式同時改變多個因子，用最少的實驗次數找出最佳組合。</p>\n<p class=\"semi-p\">晶圓廠最常用的實驗方式是<strong>分批實驗</strong>（Split Lot）：把同一批晶圓分成幾組，每組使用不同的條件，其他步驟完全相同。因為同一批晶圓的經歷幾乎一樣，比較起來最公平。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"自動控制r2r-與-fdc\" class=\"heading-anchor\">自動控制：R2R 與 FDC<a class=\"anchor-link\" href=\"#自動控制r2r-與-fdc\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">先進工廠會讓系統自動控制製程，最常見的有兩種：</p>\n<ul class=\"semi-ul\"><li><strong>R2R</strong>（Run-to-Run）：根據前幾批的量測結果，自動微調下一批的 Recipe。例如線寬偏大，就自動調整下一批的曝光能量；研磨墊磨損讓研磨變慢，就自動延長研磨時間。就像洗澡時感覺水溫偏冷，就把熱水轉大一點。</li><li><strong>FDC</strong>（Fault Detection and Classification）：在製程進行時，即時監看機台感測器的數據，例如壓力、溫度、功率、氣體流量。一旦曲線不正常，就立刻發出警報，甚至在量測之前就攔下問題。就像汽車儀表板上的警示燈。</li></ul>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\">[!NOTE]</p>\n<p class=\"semi-p\"><strong>📖 名詞｜R2R 與 FDC</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：R2R 是根據量測結果自動調整下一批製程參數的控制方法；FDC 是即時監控機台感測器數據、偵測異常的系統。兩者都屬於先進製程控制（APC）。</li><li><strong>現場用法</strong>：「R2R 這幾批一直往上補」「FDC 抓到 RF 功率異常，機台自動停了」。</li><li><strong>相關名詞</strong>：APC、SPC、感測器數據、Recipe</li><li><strong>常見混淆</strong>：R2R 是「批與批之間」的調整，根據的是量測結果；FDC 是「製程進行中」的監控，根據的是機台的感測器數據。</li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜壓線就要修，不要等出界</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：一個量測點超出管制界限，但仍在規格以內。</li><li><strong>做法</strong>：依照事先定好的處理步驟，立即檢查機台和製程，而不是因為「產品還合格」就忽略。</li><li><strong>為什麼</strong>：管制界限的作用就是提早預警。現在只是 OOC，下一批可能就變成 OOS。</li><li><strong>沒做會怎樣</strong>：等到真的超出規格時，可能已經有很多批晶圓受到影響。</li><li><strong>相關章節</strong>：<a href=\"#node-18\" class=\"semi-link\">第 18 章 異常處理與工程變更</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜自動補償會把問題藏起來</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：R2R 系統讓量測結果一直維持在目標附近，看起來一切正常。</li><li><strong>做法</strong>：除了看量測結果，也要監控 R2R 的「調整量」本身，例如曝光能量是不是被越調越多。</li><li><strong>為什麼</strong>：R2R 會不斷補償機台的偏移，結果雖然正常，但機台可能正在持續惡化。</li><li><strong>沒做會怎樣</strong>：等到調整量用盡、補不回來時，問題才一次爆發，而且已經拖了很久。</li><li><strong>相關章節</strong>：<a href=\"#node-15\" class=\"semi-link\">第 15 章 量測與檢測</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>製程一定會有變化，控制的目標是讓變化小而穩定，並及早發現偏移。</li><li>管制界限比規格界限窄，OOC 是預警，OOS 是產品不合格。</li><li>SPC 管制圖不只看單點是否出界，也看連續的趨勢。</li><li>Cpk 描述製程落在規格內的從容程度，DOE 和分批實驗用來找出最佳條件。</li><li>R2R 自動調整製程，FDC 即時監控機台，但自動補償也可能掩蓋問題。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Douglas C. Montgomery，《Introduction to Statistical Quality Control》</li><li>Gary S. May、Costas J. Spanos，《Fundamentals of Semiconductor Manufacturing and Process Control》</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-16\" class=\"semi-link\">← 上一章：第 16 章 良率與故障分析</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-18\" class=\"semi-link\">下一章：第 18 章 異常處理與工程變更 →</a></p>"
  },
  {
    "id": "ch18",
    "part": "第 4 部　品質與良率",
    "partId": "part-4",
    "num": 18,
    "shortTitle": "異常處理與工程變更",
    "fullTitle": "第 18 章　異常處理與工程變更：出事時工廠怎麼反應",
    "category": "quality",
    "waferTrack": "- 前一站：製程控制發出了異常訊號\r\n- **本章：處理異常，並管理製程的變更**\r\n- 下一站：晶圓完成前段製程，準備進入測試",
    "headings": [
      {
        "text": "異常一定會發生",
        "id": "異常一定會發生"
      },
      {
        "text": "OCAP：事先寫好的應變步驟",
        "id": "ocap事先寫好的應變步驟"
      },
      {
        "text": "Hold：先擋下來",
        "id": "hold先擋下來"
      },
      {
        "text": "找出影響範圍",
        "id": "找出影響範圍"
      },
      {
        "text": "判定：放行、重工或報廢",
        "id": "判定放行重工或報廢"
      },
      {
        "text": "工程變更：改變也是一種風險",
        "id": "工程變更改變也是一種風險"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-18-章-異常處理與工程變更出事時工廠怎麼反應\" class=\"heading-anchor\">第 18 章　異常處理與工程變更：出事時工廠怎麼反應<a class=\"anchor-link\" href=\"#第-18-章-異常處理與工程變更出事時工廠怎麼反應\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：製程控制發出了異常訊號</li><li><strong>本章：處理異常，並管理製程的變更</strong></li><li>下一站：晶圓完成前段製程，準備進入測試</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"異常一定會發生\" class=\"heading-anchor\">異常一定會發生<a class=\"anchor-link\" href=\"#異常一定會發生\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶圓廠裡有上千台機台、數百個步驟，異常一定會發生：數據超出管制界限、機台發出警報、缺陷數突然增加、作業出錯。重點不是「永遠不出錯」，而是<strong>出錯時能快速、一致地處理</strong>，把損失降到最低。</p>\n<p class=\"semi-p\">處理異常的基本順序如下：</p>\n<p class=\"semi-p\"><strong>發現異常 → 擋住影響 → 找出範圍 → 判定處置 → 找出根本原因 → 防止再發</strong></p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"ocap事先寫好的應變步驟\" class=\"heading-anchor\">OCAP：事先寫好的應變步驟<a class=\"anchor-link\" href=\"#ocap事先寫好的應變步驟\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">異常可能發生在半夜，當班的人不一定是最熟悉這個製程的工程師。所以工廠會為每一種常見的異常，事先寫好處理步驟。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜OCAP（Out of Control Action Plan，異常處理計畫）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：針對特定異常，事先規定好「要檢查什麼、要做什麼、要通知誰」的處理步驟。</li><li><strong>現場用法</strong>：「這個 OOC 照 OCAP 走，先停機台、量控片。」</li><li><strong>相關名詞</strong>：OOC、Hold、SPC</li><li><strong>常見混淆</strong>：OCAP 不是事後的檢討報告，而是異常發生「當下」的行動指引。它讓不同班別、不同的人都用同樣的方式處理。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"hold先擋下來\" class=\"heading-anchor\">Hold：先擋下來<a class=\"anchor-link\" href=\"#hold先擋下來\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">發現異常後，第一個動作通常是 <strong>Hold</strong>：把可能受影響的晶圓擋下來，暫停生產；有問題的機台也會被停用，不讓更多晶圓進去。</p>\n<p class=\"semi-p\">Hold 有幾個特點：</p>\n<ul class=\"semi-ul\"><li>每一個 Hold 都要記錄原因和負責人。</li><li>只有被授權的人才能解除 Hold。</li><li>也可以設定<strong>預約 Hold</strong>（Future Hold）：讓晶圓先繼續生產，等走到指定的步驟時再自動擋下，例如等下一站的量測結果出來再判斷。</li></ul>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜第一件事是擋住，不是修好</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：發現某台機台的結果異常。</li><li><strong>做法</strong>：先停機台、Hold 可疑的晶圓，再開始調查原因。</li><li><strong>為什麼</strong>：調查原因可能要花好幾個小時。如果邊查邊讓機台繼續生產，受影響的晶圓會越來越多。</li><li><strong>沒做會怎樣</strong>：原本只影響一兩批的問題，擴大成十幾批甚至更多，損失成倍增加。</li><li><strong>相關章節</strong>：<a href=\"#node-17\" class=\"semi-link\">第 17 章 製程控制</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"找出影響範圍\" class=\"heading-anchor\">找出影響範圍<a class=\"anchor-link\" href=\"#找出影響範圍\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">擋住之後，要確定<strong>哪些晶圓可能受到影響</strong>。這時工廠系統記錄的履歷就派上用場：查出在異常期間，有哪些晶圓經過這台機台、這個腔體。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜影響範圍從「上一次確認正常」開始算</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：機台在今天下午被發現異常，但不知道是從什麼時候開始的。</li><li><strong>做法</strong>：往回找到這台機台最後一次確認正常的時間點，例如上一次控片量測合格的時間。從那之後經過這台機台的所有晶圓，都列入可疑範圍。</li><li><strong>為什麼</strong>：異常可能早在被發現之前就開始了。只擋發現當下的晶圓，會漏掉更早受影響的晶圓。</li><li><strong>沒做會怎樣</strong>：有問題的晶圓被放行，到測試甚至客戶端才發現。這也是機台需要定期檢查的原因：檢查越頻繁，可疑的範圍就越小。</li><li><strong>相關章節</strong>：<a href=\"#node-23\" class=\"semi-link\">第 23 章 工廠如何被系統管理</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"判定放行重工或報廢\" class=\"heading-anchor\">判定：放行、重工或報廢<a class=\"anchor-link\" href=\"#判定放行重工或報廢\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">確定範圍後，要決定每一批晶圓的命運：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>處置</th><th>意思</th><th>適用情況</th></tr></thead><tbody><tr><td>放行（Release）</td><td>確認沒有影響，繼續生產</td><td>異常不影響產品品質</td></tr><tr><td>重工（Rework）</td><td>去除部分結果，重新做一次</td><td>可以重做的步驟，主要是微影</td></tr><tr><td>報廢（Scrap）</td><td>晶圓不再繼續生產</td><td>損壞無法挽回，或繼續做的風險太高</td></tr><tr><td>有條件放行</td><td>繼續生產，但加強後續檢查或特別標記</td><td>影響還不確定，需要更多數據</td></tr></tbody></table></div>\n<p class=\"semi-p\">影響較大或不確定的情況，會召開<strong>物料審查會議</strong>（MRB，Material Review Board），由製程、整合、品保等部門共同決定，必要時也會通知客戶。</p>\n<p class=\"semi-p\">決定處置之後，還要找出<strong>根本原因</strong>、執行改善對策，並確認同樣的問題不會再發生。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"工程變更改變也是一種風險\" class=\"heading-anchor\">工程變更：改變也是一種風險<a class=\"anchor-link\" href=\"#工程變更改變也是一種風險\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">不只異常需要管理，「改變」本身也是風險。修改 Recipe、調整流程、更換材料或供應商、新增機台，都可能影響產品的電性、良率和可靠度。</p>\n<p class=\"semi-p\">所以任何變更都要經過正式的流程：評估風險、用實驗批驗證、必要時做可靠度測試，通過審核才能正式上線。重大的變更還必須事先通知客戶。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜ECN 與 PCN（Engineering Change Notice / Process Change Notification）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：ECN 是工廠內部的工程變更通知與審核流程；PCN 是對客戶發出的製程或產品變更通知。</li><li><strong>現場用法</strong>：「這個 Recipe 改動要走 ECN」「換材料要發 PCN 給客戶」。</li><li><strong>相關名詞</strong>：變更管理、驗證、可靠度測試、分批實驗</li><li><strong>常見混淆</strong>：不是只有大改動才要走流程。看起來很小的修改，例如調整一個溫度參數，也可能影響可靠度，所以同樣要經過評估。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>異常一定會發生，重點是快速、一致地處理。</li><li>處理順序是：擋住影響、找出範圍、判定處置、找出根本原因、防止再發。</li><li>OCAP 讓不同班別的人都用同樣的步驟處理異常。</li><li>影響範圍要從上一次確認正常的時間點開始計算。</li><li>任何工程變更都要經過評估與驗證，重大變更還要通知客戶。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>JEDEC，J-STD-046《Customer Notification Standard for Product/Process Changes by Electronic Product Suppliers》</li><li>Gary S. May、Costas J. Spanos，《Fundamentals of Semiconductor Manufacturing and Process Control》</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-17\" class=\"semi-link\">← 上一章：第 17 章 製程控制</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-19\" class=\"semi-link\">下一章：第 19 章 晶圓測試 →</a></p>"
  },
  {
    "id": "ch19",
    "part": "第 5 部　後段：測試與封裝",
    "partId": "part-5",
    "num": 19,
    "shortTitle": "晶圓測試",
    "fullTitle": "第 19 章　晶圓測試：WAT 與 CP",
    "category": "backend",
    "waferTrack": "- 前一站：前段製程完成，晶圓離開晶圓廠\r\n- **本章：晶圓測試，確認製程是否正常、每顆晶粒是好是壞**\r\n- 下一站：封裝",
    "headings": [
      {
        "text": "兩種晶圓測試",
        "id": "兩種晶圓測試"
      },
      {
        "text": "WAT：製程的成績單",
        "id": "wat製程的成績單"
      },
      {
        "text": "CP：一顆一顆測",
        "id": "cp一顆一顆測"
      },
      {
        "text": "測試也是成本",
        "id": "測試也是成本"
      },
      {
        "text": "晶圓圖交給封裝",
        "id": "晶圓圖交給封裝"
      },
      {
        "text": "常見異常",
        "id": "常見異常"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-19-章-晶圓測試wat-與-cp\" class=\"heading-anchor\">第 19 章　晶圓測試：WAT 與 CP<a class=\"anchor-link\" href=\"#第-19-章-晶圓測試wat-與-cp\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：前段製程完成，晶圓離開晶圓廠</li><li><strong>本章：晶圓測試，確認製程是否正常、每顆晶粒是好是壞</strong></li><li>下一站：封裝</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"兩種晶圓測試\" class=\"heading-anchor\">兩種晶圓測試<a class=\"anchor-link\" href=\"#兩種晶圓測試\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶圓完成前段製程後，在切割之前會先經過兩種測試：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>測試</th><th>測什麼</th><th>目的</th></tr></thead><tbody><tr><td>WAT</td><td>切割道上的測試結構</td><td>確認製程是否正常</td></tr><tr><td>CP</td><td>每一顆晶粒的功能</td><td>找出哪些晶粒是好的</td></tr></tbody></table></div>\n<p class=\"semi-p\">簡單來說，WAT 檢查的是「製程做得對不對」，CP 檢查的是「每顆晶片能不能用」。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"wat製程的成績單\" class=\"heading-anchor\">WAT：製程的成績單<a class=\"anchor-link\" href=\"#wat製程的成績單\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶粒和晶粒之間的切割道上，放著許多專門用來測試的小結構，稱為<strong>測試鍵</strong>（Test Key），例如單獨的電晶體、電阻、電容和一長串的導通孔。</p>\n<p class=\"semi-p\">WAT 用探針接觸這些測試鍵，量測電晶體的 Vt、導通電流、漏電流，以及電阻、接觸電阻、電容等參數。這些參數直接反映了製程的結果，例如線寬、膜厚和摻雜濃度有沒有偏移。WAT 不合格的晶圓，通常不會出貨。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜WAT（Wafer Acceptance Test，晶圓允收測試）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：量測切割道上測試鍵的電性參數，確認晶圓的製程結果符合規格。</li><li><strong>現場用法</strong>：「這批 WAT 的 Vt 偏高，要請整合工程師看一下。」</li><li><strong>相關名詞</strong>：測試鍵、切割道、Vt、片電阻</li><li><strong>常見混淆</strong>：WAT 測的是測試鍵，不是產品電路本身。它代表製程正常，但不保證每顆晶粒都是好的。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"cp一顆一顆測\" class=\"heading-anchor\">CP：一顆一顆測<a class=\"anchor-link\" href=\"#cp一顆一顆測\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>CP</strong>（Chip Probing，晶圓針測）要測試晶圓上的每一顆晶粒。它需要三個主要設備：</p>\n<ul class=\"semi-ul\"><li><strong>探針卡</strong>：上面有許多極細的探針，排列方式對應晶粒上焊墊的位置。</li><li><strong>針測機</strong>：負責移動晶圓，讓探針精準地落在每一顆晶粒的焊墊上。</li><li><strong>測試機</strong>：送出測試訊號，判斷晶粒的反應是否正確。</li></ul>\n<p class=\"semi-p\">每一顆晶粒測完後，會依照結果被分到不同的類別，稱為 <strong>Bin</strong>。所有晶粒的 Bin 依照位置排列，就成了第 16 章提到的晶圓圖。</p>\n<p class=\"semi-p\"><!-- 圖：CP 測試示意（測試機、探針卡、針測機與晶圓的相對位置） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜Bin（分類）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：測試後依照結果把晶粒分成的類別，通常一個 Bin 代表合格，其他 Bin 代表不同的失效原因。</li><li><strong>現場用法</strong>：「這片的 Bin 5 特別多，查一下是哪個測試項目沒過。」</li><li><strong>相關名詞</strong>：晶圓圖、測試程式、良率</li><li><strong>常見混淆</strong>：Bin 的編號和意義由各產品的測試程式自己定義，同一個編號在不同產品上可能代表不同的失效原因。</li></ul></div></div>\n<p class=\"semi-p\">記憶體在 CP 階段還會進行<strong>修補</strong>：找出壞掉的記憶單元，用熔絲切換到備用電路，再重新測試一次，見<a href=\"#node-13\" class=\"semi-link\">第 13 章</a>。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"測試也是成本\" class=\"heading-anchor\">測試也是成本<a class=\"anchor-link\" href=\"#測試也是成本\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">測試機台非常昂貴，每顆晶粒的測試時間都直接轉換成成本。所以測試工程師要在「測得夠完整」和「測得夠快」之間取捨，也常同時測試好幾顆晶粒，提高效率。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜WAT 過了，不代表每顆晶粒都是好的</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：一片晶圓的 WAT 全部合格，但 CP 良率卻很差。</li><li><strong>做法</strong>：把 WAT 當成製程的健康檢查，把 CP 當成產品的實際體檢，兩者一起看。</li><li><strong>為什麼</strong>：WAT 只量切割道上少數幾個位置的測試鍵，無法代表整片晶圓上每一顆晶粒的狀況，例如隨機分佈的缺陷就不一定會被測到。</li><li><strong>沒做會怎樣</strong>：只看 WAT 會誤以為晶圓沒問題，錯過良率異常的線索。</li><li><strong>相關章節</strong>：<a href=\"#node-16\" class=\"semi-link\">第 16 章 良率與故障分析</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"晶圓圖交給封裝\" class=\"heading-anchor\">晶圓圖交給封裝<a class=\"anchor-link\" href=\"#晶圓圖交給封裝\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">CP 完成後，晶圓圖會以電子資料的形式，跟著晶圓一起送到封裝廠。封裝時，機台只會挑出被標為合格的晶粒，這些晶粒稱為 <strong>KGD</strong>（Known Good Die，已知良好晶粒）。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜晶圓圖必須和晶圓一一對應</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：晶圓送到封裝廠，機台要依照晶圓圖挑出好的晶粒。</li><li><strong>做法</strong>：用晶圓編號確認資料和實體晶圓是同一片，並用晶圓上的記號確認方向，確保圖上的每個位置都對應到正確的晶粒。</li><li><strong>為什麼</strong>：晶圓圖只是一份資料，如果對應錯了，機台會依照錯誤的資料挑晶粒。</li><li><strong>沒做會怎樣</strong>：壞的晶粒被封裝、出貨，好的晶粒反而被丟掉，問題往往要到客戶端才發現。</li><li><strong>相關章節</strong>：<a href=\"#node-23\" class=\"semi-link\">第 23 章 工廠如何被系統管理</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見異常\" class=\"heading-anchor\">常見異常<a class=\"anchor-link\" href=\"#常見異常\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>異常</th><th>可能原因</th><th>結果</th></tr></thead><tbody><tr><td>接觸不良</td><td>探針磨損或沾污、焊墊表面異常</td><td>好的晶粒被誤判為壞的</td></tr><tr><td>針痕過深</td><td>探針壓力太大、重複測試太多次</td><td>焊墊受損，影響後續打線</td></tr><tr><td>測試機台之間有差異</td><td>不同機台或探針卡的特性不同</td><td>良率因機台而異</td></tr><tr><td>晶圓圖錯置</td><td>晶圓編號或方向對應錯誤</td><td>封裝時挑錯晶粒</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>晶圓測試分成 WAT 和 CP，前者檢查製程，後者檢查每一顆晶粒。</li><li>WAT 量測切割道上測試鍵的電性參數，是製程的成績單。</li><li>CP 用探針卡逐顆測試，結果分成不同的 Bin，形成晶圓圖。</li><li>記憶體在 CP 階段會修補壞掉的單元。</li><li>晶圓圖會跟著晶圓送到封裝廠，用來挑出好的晶粒。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Michael L. Bushnell、Vishwani D. Agrawal，《Essentials of Electronic Testing for Digital, Memory and Mixed-Signal VLSI Circuits》</li><li>Peter Van Zant，《Microchip Fabrication》，晶圓測試相關章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-18\" class=\"semi-link\">← 上一章：第 18 章 異常處理與工程變更</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-20\" class=\"semi-link\">下一章：第 20 章 封裝 →</a></p>"
  },
  {
    "id": "ch20",
    "part": "第 5 部　後段：測試與封裝",
    "partId": "part-5",
    "num": 20,
    "shortTitle": "封裝",
    "fullTitle": "第 20 章　封裝：讓晶片能被使用",
    "category": "backend",
    "waferTrack": "- 前一站：晶圓測試，已經知道哪些晶粒是好的\r\n- **本章：封裝，把晶粒變成可以裝到電路板上的晶片**\r\n- 下一站：最終測試",
    "headings": [
      {
        "text": "為什麼要封裝",
        "id": "為什麼要封裝"
      },
      {
        "text": "傳統封裝的流程",
        "id": "傳統封裝的流程"
      },
      {
        "text": "覆晶：把晶片翻過來",
        "id": "覆晶把晶片翻過來"
      },
      {
        "text": "常見的封裝形式",
        "id": "常見的封裝形式"
      },
      {
        "text": "常見異常",
        "id": "常見異常"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-20-章-封裝讓晶片能被使用\" class=\"heading-anchor\">第 20 章　封裝：讓晶片能被使用<a class=\"anchor-link\" href=\"#第-20-章-封裝讓晶片能被使用\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：晶圓測試，已經知道哪些晶粒是好的</li><li><strong>本章：封裝，把晶粒變成可以裝到電路板上的晶片</strong></li><li>下一站：最終測試</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"為什麼要封裝\" class=\"heading-anchor\">為什麼要封裝<a class=\"anchor-link\" href=\"#為什麼要封裝\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">剛從晶圓上切下來的晶粒又小又脆弱，上面的焊墊也小到無法直接焊到電路板上。<strong>封裝</strong>就像替晶粒蓋一間房子，它有四個主要任務：</p>\n<ul class=\"semi-ul\"><li><strong>保護</strong>：隔絕濕氣、灰塵和外力。</li><li><strong>連接</strong>：把晶粒上微小的焊墊，轉接成電路板能焊接的接腳或錫球。</li><li><strong>散熱</strong>：把晶片運作時產生的熱帶走。</li><li><strong>支撐</strong>：提供足夠的機械強度，方便搬運和組裝。</li></ul>\n<p class=\"semi-p\">---</p>\n<h2 id=\"傳統封裝的流程\" class=\"heading-anchor\">傳統封裝的流程<a class=\"anchor-link\" href=\"#傳統封裝的流程\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>晶背研磨 → 切割 → 黏晶 → 打線 → 封膠 → 印字 → 植球或電鍍接腳 → 切單 → 檢查</strong></p>\n<ol class=\"semi-ol\"><li><strong>晶背研磨</strong>：從背面把晶圓磨薄，好放進輕薄的封裝裡。</li><li><strong>切割</strong>：把晶圓貼在膠膜上，沿著切割道用鑽石刀或雷射切開。也有一種做法是用雷射在晶圓內部打出一層改質層，再把膠膜撐開，讓晶粒沿著改質層分開，稱為隱形切割。</li><li><strong>黏晶</strong>：依照晶圓圖，只挑出好的晶粒，黏到導線架或基板上。</li><li><strong>打線</strong>：用比頭髮還細的金線或銅線，把晶粒的焊墊連到導線架或基板上。</li><li><strong>封膠</strong>：用環氧樹脂等材料把晶粒和導線包起來。</li><li><strong>印字</strong>：用雷射在表面印上產品型號和批號。</li><li><strong>植球或電鍍接腳</strong>：在底部植上錫球，或在接腳表面電鍍。</li><li><strong>切單</strong>：把一整條基板上的封裝切成一顆顆獨立的晶片。</li></ol>\n<p class=\"semi-p\"><!-- 圖：打線封裝剖面（晶粒、金屬線、導線架或基板、封膠） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜打線接合（Wire Bonding）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：用極細的金屬線連接晶粒焊墊與封裝接點的技術，是最傳統、最普遍的封裝連接方式。</li><li><strong>現場用法</strong>：「這批打線的拉力測試沒過。」</li><li><strong>相關名詞</strong>：焊墊、導線架、覆晶</li><li><strong>常見混淆</strong>：打線雖然是傳統技術，但至今仍是數量最多的封裝方式，因為成本低、技術成熟。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"覆晶把晶片翻過來\" class=\"heading-anchor\">覆晶：把晶片翻過來<a class=\"anchor-link\" href=\"#覆晶把晶片翻過來\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>覆晶</strong>（Flip Chip）的做法完全不同：先在晶粒的焊墊上做出凸起的金屬凸塊，再把晶粒翻過來、正面朝下，讓凸塊直接焊到基板上。最後在晶粒和基板之間的縫隙填入膠材，稱為<strong>底部填充</strong>（Underfill），用來分散應力、保護凸塊。</p>\n<p class=\"semi-p\">和打線相比，覆晶的連接路徑更短，可以在晶粒整個表面布滿接點，電性和散熱也更好，所以處理器和繪圖晶片大多採用覆晶。</p>\n<p class=\"semi-p\"><!-- 圖：覆晶封裝剖面（翻轉的晶粒、凸塊、底部填充、基板、錫球） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜覆晶（Flip Chip）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：把晶粒正面朝下，透過凸塊直接與基板連接的封裝方式。</li><li><strong>現場用法</strong>：「這顆是覆晶封裝，要確認底部填充有沒有空洞。」</li><li><strong>相關名詞</strong>：凸塊（Bump）、底部填充、基板、BGA</li><li><strong>常見混淆</strong>：凸塊和錫球不一樣。凸塊連接晶粒和基板，錫球則在封裝的底部，連接封裝和電路板。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見的封裝形式\" class=\"heading-anchor\">常見的封裝形式<a class=\"anchor-link\" href=\"#常見的封裝形式\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>形式</th><th>特色</th><th>常見用途</th></tr></thead><tbody><tr><td>導線架封裝</td><td>成本低，接腳在四周或底部周圍</td><td>微控制器、電源管理晶片</td></tr><tr><td>BGA（球柵陣列）</td><td>底部整面布滿錫球，接點多</td><td>處理器、繪圖晶片</td></tr><tr><td>晶圓級封裝</td><td>直接在晶圓上完成封裝，尺寸接近晶粒本身</td><td>手機中的小型晶片</td></tr></tbody></table></div>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜晶片也會「受潮」</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：封裝好的晶片放在一般環境中，封裝材料會慢慢吸收空氣中的水氣。</li><li><strong>做法</strong>：晶片依照對濕氣的敏感程度分級，出貨時用防潮袋加乾燥劑真空包裝。拆封後超過規定時間沒用完，焊接前要先烘烤除濕。</li><li><strong>為什麼</strong>：焊接到電路板時溫度會急速升高，封裝內的水氣瞬間汽化膨脹。</li><li><strong>沒做會怎樣</strong>：封裝內部脫層甚至爆裂，這種現象被形象地稱為「爆米花效應」。</li><li><strong>相關章節</strong>：<a href=\"#node-22\" class=\"semi-link\">第 22 章 最終測試與可靠度</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜磨薄的晶圓非常脆弱</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：晶圓經過晶背研磨後，可能只剩一百微米左右甚至更薄，像紙一樣會彎曲。</li><li><strong>做法</strong>：研磨前先在正面貼上保護膠膜或接合到承載晶圓上，之後的搬運也使用專用的機構支撐。</li><li><strong>為什麼</strong>：薄晶圓很容易破裂和翹曲，內部的應力也會讓它彎曲變形。</li><li><strong>沒做會怎樣</strong>：晶圓破片，或是產生肉眼看不見的微小裂痕，等到晶片使用一段時間後才失效。</li><li><strong>相關章節</strong>：<a href=\"#node-21\" class=\"semi-link\">第 21 章 先進封裝</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"常見異常\" class=\"heading-anchor\">常見異常<a class=\"anchor-link\" href=\"#常見異常\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>異常</th><th>可能原因</th><th>結果</th></tr></thead><tbody><tr><td>崩邊</td><td>切割刀磨損、切割參數不當</td><td>晶粒邊緣破損，可能延伸成裂痕</td></tr><tr><td>打線黏不上</td><td>焊墊污染、針痕過深</td><td>斷路</td></tr><tr><td>沖線</td><td>封膠時的流動把細線推彎</td><td>相鄰導線短路</td></tr><tr><td>脫層</td><td>材料之間附著不良、吸濕</td><td>可靠度問題</td></tr><tr><td>空洞</td><td>封膠或底部填充沒有填滿</td><td>散熱變差、可靠度問題</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>封裝負責保護晶粒、連接外部、散熱和提供支撐。</li><li>傳統封裝流程包括研磨、切割、黏晶、打線、封膠、印字、植球和切單。</li><li>覆晶把晶粒翻過來，用凸塊直接連接基板，電性和散熱更好。</li><li>封裝會吸收濕氣，焊接前要注意防潮和烘烤。</li><li>磨薄的晶圓非常脆弱，需要特別的支撐和搬運方式。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Rao R. Tummala，《Fundamentals of Microsystems Packaging》</li><li>Peter Van Zant，《Microchip Fabrication》，封裝相關章節</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-19\" class=\"semi-link\">← 上一章：第 19 章 晶圓測試</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-21\" class=\"semi-link\">下一章：第 21 章 先進封裝 →</a></p>"
  },
  {
    "id": "ch21",
    "part": "第 5 部　後段：測試與封裝",
    "partId": "part-5",
    "num": 21,
    "shortTitle": "先進封裝",
    "fullTitle": "第 21 章　先進封裝：把多顆晶片整合在一起",
    "category": "backend",
    "waferTrack": "- 前一站：晶圓測試，挑出了好的晶粒\r\n- **本章：先進封裝，把多顆晶片整合成一個系統**\r\n- 下一站：最終測試",
    "headings": [
      {
        "text": "為什麼需要先進封裝",
        "id": "為什麼需要先進封裝"
      },
      {
        "text": "2.5D：並排放在中介層上",
        "id": "25d並排放在中介層上"
      },
      {
        "text": "扇出型封裝",
        "id": "扇出型封裝"
      },
      {
        "text": "3D 堆疊：往上疊",
        "id": "3d-堆疊往上疊"
      },
      {
        "text": "小晶片（Chiplet）",
        "id": "小晶片chiplet"
      },
      {
        "text": "先進封裝的挑戰",
        "id": "先進封裝的挑戰"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-21-章-先進封裝把多顆晶片整合在一起\" class=\"heading-anchor\">第 21 章　先進封裝：把多顆晶片整合在一起<a class=\"anchor-link\" href=\"#第-21-章-先進封裝把多顆晶片整合在一起\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：晶圓測試，挑出了好的晶粒</li><li><strong>本章：先進封裝，把多顆晶片整合成一個系統</strong></li><li>下一站：最終測試</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"為什麼需要先進封裝\" class=\"heading-anchor\">為什麼需要先進封裝<a class=\"anchor-link\" href=\"#為什麼需要先進封裝\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">過去，提升晶片效能主要靠微縮電晶體。但現在這條路越走越難、越走越貴，還遇到幾個限制：</p>\n<ul class=\"semi-ul\"><li><strong>晶粒不能無限大</strong>：一顆晶粒的大小，受限於曝光機一次能曝光的範圍，大約 26 mm × 33 mm。</li><li><strong>大晶粒良率低</strong>：第 16 章提到，晶粒越大，越容易被缺陷打中。</li><li><strong>不同功能適合不同製程</strong>：運算核心適合最先進的製程，類比和輸入輸出電路用成熟製程就夠了，記憶體則需要專門的製程。</li><li><strong>頻寬需求暴增</strong>：人工智慧運算需要在處理器和記憶體之間搬運大量資料。</li></ul>\n<p class=\"semi-p\">於是產業開始把一顆大晶片拆成幾顆小晶片，各自用最適合的製程製造，再用先進封裝把它們緊密地整合在一起，讓它們像一顆晶片一樣運作。封裝不再只是「保護」，而成了提升效能的關鍵。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"25d並排放在中介層上\" class=\"heading-anchor\">2.5D：並排放在中介層上<a class=\"anchor-link\" href=\"#25d並排放在中介層上\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>2.5D 封裝</strong>把好幾顆晶片並排放在一片<strong>中介層</strong>上。中介層本身通常是一片矽，上面有非常細密的導線，讓晶片之間可以高速、大量地互相溝通；中介層再透過 TSV 連到下方的封裝基板。</p>\n<p class=\"semi-p\">最典型的例子，是把處理器和多組 HBM 記憶體並排放在同一片中介層上。中介層甚至可以透過多次曝光拼接，做得比單次曝光的範圍還大。</p>\n<p class=\"semi-p\"><!-- 圖：2.5D 封裝剖面（處理器與 HBM 並排於中介層上，中介層下方為基板） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜中介層（Interposer）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：放在晶片和封裝基板之間的一層轉接板，上面有細密的導線，讓多顆晶片之間能高速連接。</li><li><strong>現場用法</strong>：「這個產品的中介層超過一個曝光範圍，要用拼接的方式做。」</li><li><strong>相關名詞</strong>：2.5D、TSV、微凸塊、HBM</li><li><strong>常見混淆</strong>：中介層不一定是矽，也有使用有機材料，或只在晶片之間埋入一小塊矽橋的做法，成本和效能各有取捨。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"扇出型封裝\" class=\"heading-anchor\">扇出型封裝<a class=\"anchor-link\" href=\"#扇出型封裝\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>扇出型封裝</strong>不使用傳統的基板：先把晶粒排列在一片承載板上，用封膠把它們包成一片「重組晶圓」，再在上面做出<strong>重佈線層</strong>（RDL），把接點從晶粒往外「扇」出去，擴展到比晶粒更大的面積。這種封裝又薄又小，常用在手機等輕薄的產品中。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"3d-堆疊往上疊\" class=\"heading-anchor\">3D 堆疊：往上疊<a class=\"anchor-link\" href=\"#3d-堆疊往上疊\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>3D 堆疊</strong>把晶片直接疊在另一顆晶片上，透過 TSV 上下連通，HBM 就是一個例子。晶片之間的連接方式也在演進：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>連接方式</th><th>接點間距</th><th>代表應用</th></tr></thead><tbody><tr><td>覆晶凸塊</td><td>一百微米以上</td><td>一般的處理器封裝</td></tr><tr><td>微凸塊</td><td>數十微米</td><td>2.5D 封裝、HBM 堆疊</td></tr><tr><td>混合鍵合</td><td>十微米以下</td><td>高密度的 3D 晶片堆疊</td></tr></tbody></table></div>\n<p class=\"semi-p\">接點間距越小，同樣面積內的連接點越多，晶片之間能傳輸的資料就越多。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜混合鍵合（Hybrid Bonding）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：不使用凸塊，讓兩顆晶片表面的銅接點直接接合，同時周圍的絕緣層也互相黏合的技術。</li><li><strong>現場用法</strong>：「改用混合鍵合之後，接點密度提高很多。」</li><li><strong>相關名詞</strong>：3D 堆疊、微凸塊、CMP、晶圓接合</li><li><strong>常見混淆</strong>：混合鍵合的「混合」，指的是金屬和絕緣層兩種材料同時接合，而不是混合使用兩種封裝方式。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"小晶片chiplet\" class=\"heading-anchor\">小晶片（Chiplet）<a class=\"anchor-link\" href=\"#小晶片chiplet\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">把一顆大型晶片拆成多顆功能獨立的小晶片，再封裝在一起，這種設計方式稱為 <strong>Chiplet</strong>。產業也在推動晶片之間互相連接的標準介面，目標是讓不同來源的小晶片能像積木一樣組合使用。</p>\n<p class=\"semi-p\">隨著先進封裝大量使用微影、電鍍、CMP 等原本屬於晶圓廠的製程，前段製造和後段封裝之間的界線也越來越模糊。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜一顆壞晶片，拖垮整個封裝</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：一個先進封裝裡放了八顆晶片。</li><li><strong>做法</strong>：每一顆晶片在封裝前都要經過充分測試，確保是已知良好晶粒（KGD），封裝過程中也盡量安排可以檢查的步驟。</li><li><strong>為什麼</strong>：良率會相乘。就算每顆晶片的良率都是 99%，八顆全部都好的機率也只剩大約 92%。</li><li><strong>沒做會怎樣</strong>：只要一顆晶片有問題，整個昂貴的封裝連同其他好晶片都一起報廢。</li><li><strong>相關章節</strong>：<a href=\"#node-19\" class=\"semi-link\">第 19 章 晶圓測試</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜混合鍵合需要前段等級的乾淨和平坦</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：兩顆晶片要用混合鍵合直接接合。</li><li><strong>做法</strong>：接合面要經過極精密的 CMP，接合前的清洗和環境控制也要達到晶圓廠的等級。</li><li><strong>為什麼</strong>：兩個表面之間沒有凸塊可以緩衝，一顆微粒就會撐出一個空隙，表面稍微不平也會接合不良。</li><li><strong>沒做會怎樣</strong>：一顆微粒可能讓周圍大量接點同時失效。</li><li><strong>相關章節</strong>：<a href=\"#node-08\" class=\"semi-link\">第 8 章 CMP</a>、<a href=\"#node-09\" class=\"semi-link\">第 9 章 清洗與污染控制</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"先進封裝的挑戰\" class=\"heading-anchor\">先進封裝的挑戰<a class=\"anchor-link\" href=\"#先進封裝的挑戰\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>挑戰</th><th>說明</th></tr></thead><tbody><tr><td>散熱</td><td>晶片緊密排列或疊在一起，熱更難散出去</td></tr><tr><td>翹曲</td><td>不同材料受熱膨脹的程度不同，封裝越大越容易彎曲</td></tr><tr><td>測試</td><td>晶片疊起來之後，中間的晶片很難再單獨測試</td></tr><tr><td>良率相乘</td><td>任何一顆晶片或一個接點失敗，整個封裝都受影響</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>微縮越來越難，先進封裝成為提升效能的新方向。</li><li>2.5D 封裝把多顆晶片並排在中介層上，常見於處理器加 HBM。</li><li>扇出型封裝用重佈線層把接點往外擴展，適合輕薄產品。</li><li>3D 堆疊從微凸塊走向混合鍵合，接點密度越來越高。</li><li>良率會相乘，所以每顆晶片都必須是已知良好晶粒。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>John H. Lau，《Semiconductor Advanced Packaging》</li><li>IEEE ECTC（Electronic Components and Technology Conference）歷年論文</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-20\" class=\"semi-link\">← 上一章：第 20 章 封裝</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-22\" class=\"semi-link\">下一章：第 22 章 最終測試與可靠度 →</a></p>"
  },
  {
    "id": "ch22",
    "part": "第 5 部　後段：測試與封裝",
    "partId": "part-5",
    "num": 22,
    "shortTitle": "最終測試與可靠度",
    "fullTitle": "第 22 章　最終測試與可靠度：確保晶片能用很多年",
    "category": "backend",
    "waferTrack": "- 前一站：封裝完成\r\n- **本章：最終測試與可靠度，確保晶片現在能用、未來也能用很多年**\r\n- 下一站：出貨，裝進產品裡",
    "headings": [
      {
        "text": "封裝後為什麼還要再測",
        "id": "封裝後為什麼還要再測"
      },
      {
        "text": "最終測試",
        "id": "最終測試"
      },
      {
        "text": "預燒：提早篩掉體質不好的晶片",
        "id": "預燒提早篩掉體質不好的晶片"
      },
      {
        "text": "可靠度：能用多久",
        "id": "可靠度能用多久"
      },
      {
        "text": "晶片怎麼老化",
        "id": "晶片怎麼老化"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-22-章-最終測試與可靠度確保晶片能用很多年\" class=\"heading-anchor\">第 22 章　最終測試與可靠度：確保晶片能用很多年<a class=\"anchor-link\" href=\"#第-22-章-最終測試與可靠度確保晶片能用很多年\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：封裝完成</li><li><strong>本章：最終測試與可靠度，確保晶片現在能用、未來也能用很多年</strong></li><li>下一站：出貨，裝進產品裡</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"封裝後為什麼還要再測\" class=\"heading-anchor\">封裝後為什麼還要再測<a class=\"anchor-link\" href=\"#封裝後為什麼還要再測\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶圓測試時已經挑過一次好晶粒，但封裝過程本身可能造成損傷，例如打線不良或封裝應力。而且有些特性必須在封裝後、在不同溫度下才測得到。所以出貨前，每一顆晶片都要再經過<strong>最終測試</strong>。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"最終測試\" class=\"heading-anchor\">最終測試<a class=\"anchor-link\" href=\"#最終測試\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">最終測試由<strong>分類機</strong>（Handler）把封裝好的晶片放進測試座，再由測試機進行功能和電性測試。常見的做法包括：</p>\n<ul class=\"semi-ul\"><li>在高溫和低溫下分別測試，確認晶片在各種環境都能正常工作。</li><li>依照實際能跑的速度或功耗，把同一種晶片分成不同等級，稱為<strong>分級</strong>。同一個設計的晶片，可能因此以不同的規格出售。</li></ul>\n<p class=\"semi-p\">有些產品還會進行<strong>系統級測試</strong>（SLT），把晶片放進接近真實產品的環境中，執行實際的軟體來測試。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜FT（Final Test，最終測試）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：晶片封裝完成後、出貨前的功能與電性測試。</li><li><strong>現場用法</strong>：「這批在 FT 的高溫測試掉了不少。」</li><li><strong>相關名詞</strong>：CP、分類機、分級、SLT</li><li><strong>常見混淆</strong>：CP 是在晶圓上測晶粒，FT 是測封裝好的晶片。兩者的測試項目和目的不完全相同。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"預燒提早篩掉體質不好的晶片\" class=\"heading-anchor\">預燒：提早篩掉體質不好的晶片<a class=\"anchor-link\" href=\"#預燒提早篩掉體質不好的晶片\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶片的失效率隨時間的變化，常用一條形狀像浴缸的曲線來描述：</p>\n<ul class=\"semi-ul\"><li><strong>早期失效期</strong>：剛開始使用時，有些體質不好的晶片很快就壞了。</li><li><strong>穩定期</strong>：之後很長一段時間，失效率低而穩定。</li><li><strong>老化期</strong>：用了很多年之後，材料開始老化，失效率再度上升。</li></ul>\n<p class=\"semi-p\"><strong>預燒</strong>（Burn-in）就是在出貨前，讓晶片在高溫和較高電壓下運作一段時間，讓體質不好的晶片提早在工廠裡壞掉、被篩掉，而不是在客戶手上壞掉。</p>\n<p class=\"semi-p\"><!-- 圖：浴缸曲線（早期失效期、穩定期、老化期） --></p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜浴缸曲線（Bathtub Curve）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：描述產品失效率隨時間變化的曲線，兩端高、中間低，形狀像浴缸。</li><li><strong>現場用法</strong>：「預燒就是把浴缸左邊那段先燒掉。」</li><li><strong>相關名詞</strong>：預燒、早期失效、老化、可靠度</li><li><strong>常見混淆</strong>：預燒只能篩掉早期失效，無法讓晶片更耐用，也無法解決設計或製程造成的老化問題。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"可靠度能用多久\" class=\"heading-anchor\">可靠度：能用多久<a class=\"anchor-link\" href=\"#可靠度能用多久\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\"><strong>可靠度</strong>是指晶片在預定的使用條件下，能正常工作多久。一般消費性產品可能要求好幾年，車用晶片則要求十幾年。</p>\n<p class=\"semi-p\">但我們不可能真的等十年再出貨，所以可靠度測試採用<strong>加速</strong>的方式：用更高的溫度、電壓或濕度，讓失效更快發生，再透過模型推算正常使用下的壽命。常見的測試如下：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>測試</th><th>做法</th><th>模擬什麼</th></tr></thead><tbody><tr><td>高溫操作壽命（HTOL）</td><td>在高溫下持續通電運作上千小時</td><td>長期使用造成的老化</td></tr><tr><td>溫度循環</td><td>反覆在高溫和低溫之間切換</td><td>開關機與環境變化造成的熱脹冷縮</td></tr><tr><td>高加速溫濕度測試（HAST）</td><td>高溫、高濕、加壓</td><td>濕氣入侵封裝</td></tr><tr><td>靜電放電測試（ESD）</td><td>施加模擬的靜電放電</td><td>人體或機器接觸時的靜電</td></tr></tbody></table></div>\n<p class=\"semi-p\">這些測試的條件，多半依照 JEDEC 等國際組織訂定的標準；車用晶片則另有更嚴格的標準，例如 AEC-Q100。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"晶片怎麼老化\" class=\"heading-anchor\">晶片怎麼老化<a class=\"anchor-link\" href=\"#晶片怎麼老化\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶片的老化，來自製程中做出來的材料和結構，長期承受電流、電壓和溫度的結果：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>失效機制</th><th>發生了什麼</th></tr></thead><tbody><tr><td>電遷移（EM）</td><td>電流長期推動金屬原子，導線形成空洞而斷線</td></tr><tr><td>介電層崩潰（TDDB）</td><td>絕緣層長期承受電場，最後被擊穿</td></tr><tr><td>熱載子效應（HCI）</td><td>高能量的電子撞進閘極絕緣層，電晶體特性慢慢改變</td></tr><tr><td>偏壓溫度不穩定（BTI）</td><td>高溫加上電壓，讓 Vt 隨時間漂移</td></tr></tbody></table></div>\n<p class=\"semi-p\">這些機制和前面的章節息息相關，例如導線的品質見<a href=\"#node-10\" class=\"semi-link\">第 10 章</a>，閘極絕緣層見<a href=\"#node-12\" class=\"semi-link\">第 12 章</a>。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜可靠度是統計問題</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：客戶問：「這顆晶片會不會壞？」</li><li><strong>做法</strong>：用失效率來描述可靠度，常用的單位是 <strong>FIT</strong>，代表每十億個元件小時中發生幾次失效。</li><li><strong>為什麼</strong>：無法預測某一顆晶片哪一天會壞，但可以從大量樣本的測試結果，推算一群晶片的失效機率。</li><li><strong>沒做會怎樣</strong>：無法和客戶用相同的語言討論品質，也無法估計產品上市後會有多少失效。</li><li><strong>相關章節</strong>：<a href=\"#node-17\" class=\"semi-link\">第 17 章 製程控制</a></li></ul>\n<p class=\"semi-p\"><strong>🔧 Know-how｜車用晶片的要求更嚴格</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：同一種製程，要同時生產消費性晶片和車用晶片。</li><li><strong>做法</strong>：車用晶片採用更嚴格的驗證標準和更多的篩選測試，也要求更寬的工作溫度範圍和更長的壽命，目標是「零缺陷」。</li><li><strong>為什麼</strong>：車用晶片要在引擎旁的高溫或寒冬的低溫下工作十幾年，而且一旦失效，可能影響行車安全。</li><li><strong>沒做會怎樣</strong>：晶片在車上失效，代價遠高於消費性產品，可能導致大規模的召回。</li><li><strong>相關章節</strong>：<a href=\"#node-14\" class=\"semi-link\">第 14 章 「幾奈米」是什麼意思</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>封裝後的晶片要在不同溫度下再測一次，並依照效能分級。</li><li>浴缸曲線描述失效率隨時間的變化，預燒用來篩掉早期失效的晶片。</li><li>可靠度測試用加速的方式，在短時間內推估晶片的長期壽命。</li><li>電遷移、介電層崩潰、熱載子效應和 BTI 是主要的老化機制。</li><li>可靠度是統計問題，車用晶片的要求比消費性產品更嚴格。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>J. W. McPherson，《Reliability Physics and Engineering: Time-To-Failure Modeling》</li><li>JEDEC，JESD47《Stress-Test-Driven Qualification of Integrated Circuits》</li><li>Automotive Electronics Council，AEC-Q100</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-21\" class=\"semi-link\">← 上一章：第 21 章 先進封裝</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-23\" class=\"semi-link\">下一章：第 23 章 工廠如何被系統管理 →</a></p>"
  },
  {
    "id": "ch23",
    "part": "第 6 部　走出晶圓廠",
    "partId": "part-6",
    "num": 23,
    "shortTitle": "工廠如何被系統管理",
    "fullTitle": "第 23 章　工廠如何被系統管理：一片晶圓為什麼不會走錯路",
    "category": "systems",
    "waferTrack": "- 前一站：跟著晶圓走完了整趟旅程\r\n- **本章：從系統的角度重新看一次工廠**\r\n- 下一站：晶片出貨後，製程如何影響韌體",
    "headings": [
      {
        "text": "一座不可能靠人記住的工廠",
        "id": "一座不可能靠人記住的工廠"
      },
      {
        "text": "工廠裡的主要系統",
        "id": "工廠裡的主要系統"
      },
      {
        "text": "一批晶圓到站時，發生了什麼事",
        "id": "一批晶圓到站時發生了什麼事"
      },
      {
        "text": "防呆：讓錯誤無法發生",
        "id": "防呆讓錯誤無法發生"
      },
      {
        "text": "履歷：每一片晶圓的完整紀錄",
        "id": "履歷每一片晶圓的完整紀錄"
      },
      {
        "text": "數據與智慧製造",
        "id": "數據與智慧製造"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-23-章-工廠如何被系統管理一片晶圓為什麼不會走錯路\" class=\"heading-anchor\">第 23 章　工廠如何被系統管理：一片晶圓為什麼不會走錯路<a class=\"anchor-link\" href=\"#第-23-章-工廠如何被系統管理一片晶圓為什麼不會走錯路\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：跟著晶圓走完了整趟旅程</li><li><strong>本章：從系統的角度重新看一次工廠</strong></li><li>下一站：晶片出貨後，製程如何影響韌體</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"一座不可能靠人記住的工廠\" class=\"heading-anchor\">一座不可能靠人記住的工廠<a class=\"anchor-link\" href=\"#一座不可能靠人記住的工廠\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">想像一下：工廠裡同時有數千批晶圓在生產，每一批都要經過數百個步驟；上千台機台各有自己的狀態和 Recipe；而且工廠 24 小時不停運轉。任何一批晶圓走錯一站、用錯一個 Recipe，都可能整批報廢。</p>\n<p class=\"semi-p\">這樣的工廠不可能靠人記住一切。現代晶圓廠裡，晶圓的每一個動作幾乎都由系統指揮和記錄，就像機場的塔台和物流中心的結合。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"工廠裡的主要系統\" class=\"heading-anchor\">工廠裡的主要系統<a class=\"anchor-link\" href=\"#工廠裡的主要系統\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>系統</th><th>負責什麼</th><th>比喻</th></tr></thead><tbody><tr><td>MES（製造執行系統）</td><td>記錄每批晶圓在哪裡、下一步是什麼，控制每一次進出站</td><td>工廠的大腦和帳本</td></tr><tr><td>機台自動化系統</td><td>連接機台與 MES，下載 Recipe、啟動製程、收集數據</td><td>機台的翻譯員</td></tr><tr><td>物料搬運系統</td><td>指揮天車和倉儲，把晶圓盒送到正確的位置</td><td>物流中心</td></tr><tr><td>派工系統</td><td>決定每台機台下一批要做哪一批晶圓</td><td>交通號誌</td></tr><tr><td>Recipe 管理系統</td><td>管理每台機台的 Recipe 和版本</td><td>食譜資料庫</td></tr><tr><td>製程控制系統</td><td>SPC、FDC、R2R，監控與控制製程品質</td><td>品管員</td></tr><tr><td>良率分析系統</td><td>整合製程和測試數據，分析良率</td><td>偵探</td></tr></tbody></table></div>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜MES（Manufacturing Execution System，製造執行系統）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：管理生產現場的核心系統，記錄每批晶圓的位置、狀態與歷程，並控制晶圓能不能進入下一個步驟。</li><li><strong>現場用法</strong>：「MES 上這批顯示 Hold，要先查原因。」</li><li><strong>相關名詞</strong>：Track-in、Track-out、Route、Hold、派工</li><li><strong>常見混淆</strong>：MES 不等於工廠的所有系統。它是核心，但機台連線、搬運、派工、製程控制通常由其他系統負責，彼此互相配合。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"一批晶圓到站時發生了什麼事\" class=\"heading-anchor\">一批晶圓到站時，發生了什麼事<a class=\"anchor-link\" href=\"#一批晶圓到站時發生了什麼事\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">以一批晶圓抵達一台蝕刻機為例：</p>\n<ol class=\"semi-ol\"><li>天車把晶圓盒放到機台的 Load Port，機台讀取晶圓盒上的編號。</li><li>系統逐一確認：這批晶圓現在應該在這一站嗎？這台機台可以做這個產品嗎？機台狀態正常嗎？晶圓有沒有被 Hold？Q-Time 有沒有超過？晶圓盒的污染等級和機台相符嗎？</li><li>全部確認通過後，系統把正確版本的 Recipe 下載到機台，並記錄<strong>進站</strong>。</li><li>機台開始加工，同時把感測器數據即時送給 FDC 監控。</li><li>加工完成後記錄<strong>出站</strong>，把使用的機台、腔體、Recipe、時間等資料寫入這批晶圓的履歷。</li><li>系統決定下一站，搬運系統把晶圓盒送過去，或先送進倉儲等待。</li></ol>\n<div class=\"mermaid-diagram\" data-mermaid=\"sequenceDiagram\n    participant AMHS as 搬運系統\n    participant EQ as 機台\n    participant EAP as 機台自動化系統\n    participant MES as MES\n    participant FDC as FDC\n    AMHS->>EQ: 把晶圓盒放到 Load Port\n    EQ->>EAP: 回報讀到的晶圓盒編號\n    EAP->>MES: 這批晶圓可以在這台機台進站嗎？\n    MES-->>EAP: 檢查通過，記錄進站，指定 Recipe 版本\n    EAP->>EQ: 下載 Recipe，開始加工\n    EQ-->>FDC: 加工中即時送出感測器數據\n    EQ->>EAP: 加工完成\n    EAP->>MES: 記錄出站，寫入履歷\n    MES->>AMHS: 指定下一站，送出晶圓盒\"><pre class=\"code-pre\"><code>sequenceDiagram\n    participant AMHS as 搬運系統\n    participant EQ as 機台\n    participant EAP as 機台自動化系統\n    participant MES as MES\n    participant FDC as FDC\n    AMHS-&gt;&gt;EQ: 把晶圓盒放到 Load Port\n    EQ-&gt;&gt;EAP: 回報讀到的晶圓盒編號\n    EAP-&gt;&gt;MES: 這批晶圓可以在這台機台進站嗎？\n    MES--&gt;&gt;EAP: 檢查通過，記錄進站，指定 Recipe 版本\n    EAP-&gt;&gt;EQ: 下載 Recipe，開始加工\n    EQ--&gt;&gt;FDC: 加工中即時送出感測器數據\n    EQ-&gt;&gt;EAP: 加工完成\n    EAP-&gt;&gt;MES: 記錄出站，寫入履歷\n    MES-&gt;&gt;AMHS: 指定下一站，送出晶圓盒</code></pre></div>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜進站與出站（Track-in / Track-out）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：進站是晶圓開始在某一站加工時，在系統上的登記；出站是完成加工後的登記，並把晶圓推進到下一個步驟。</li><li><strong>現場用法</strong>：「這批進站之後機台就 Down 了，要處理一下帳。」</li><li><strong>相關名詞</strong>：MES、Route、履歷</li><li><strong>常見混淆</strong>：系統上的狀態和實體晶圓必須一致。系統顯示已出站、但晶圓其實還沒做完，就是現場說的「帳實不符」，必須立即處理。</li></ul></div></div>\n<p class=\"semi-p\">機台來自世界各地不同的廠商，為了讓系統能用同樣的方式和每一台機台溝通，產業制定了共同的通訊標準，最常見的是 <strong>SECS/GEM</strong>。它就像機台與系統之間的共同語言。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"防呆讓錯誤無法發生\" class=\"heading-anchor\">防呆：讓錯誤無法發生<a class=\"anchor-link\" href=\"#防呆讓錯誤無法發生\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">上面第 2 步的每一項確認，都是一條<strong>防呆規則</strong>。例如：</p>\n<ul class=\"semi-ul\"><li>晶圓不在這一站，就不能進站。</li><li>機台沒有通過驗證，就不能做這個產品。</li><li>Recipe 版本不對，就不能開始。</li><li>Q-Time 超過、或晶圓被 Hold，就不能繼續。</li><li>接觸過銅的晶圓盒，不能放上前段的機台。</li></ul>\n<p class=\"semi-p\">以前很多確認靠人工核對，現在則寫成系統規則，由系統自動擋下。人會疲倦、會分心，但系統每一次都會檢查。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜每一條防呆規則背後，通常都有一次事故</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：急件趕著出貨，有人希望暫時跳過某個系統檢查。</li><li><strong>做法</strong>：例外處理必須經過正式的申請和核准，並且留下紀錄，事後也要檢討規則是否需要調整。</li><li><strong>為什麼</strong>：很多規則都是從過去的事故學來的。規則看起來麻煩，往往是因為它擋下的錯誤很少再發生，大家已經忘了它為什麼存在。</li><li><strong>沒做會怎樣</strong>：同樣的事故再次發生，而且因為規則被跳過，事後也很難追查。</li><li><strong>相關章節</strong>：<a href=\"#node-18\" class=\"semi-link\">第 18 章 異常處理與工程變更</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"履歷每一片晶圓的完整紀錄\" class=\"heading-anchor\">履歷：每一片晶圓的完整紀錄<a class=\"anchor-link\" href=\"#履歷每一片晶圓的完整紀錄\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">系統會為每一片晶圓留下完整的<strong>履歷</strong>：經過哪些步驟、用了哪台機台和腔體、哪個 Recipe 版本、什麼時間、量測結果是多少。</p>\n<p class=\"semi-p\">這些紀錄是整座工廠的記憶，用在很多地方：</p>\n<ul class=\"semi-ul\"><li>良率異常時，做共通性分析，找出共同點，見<a href=\"#node-16\" class=\"semi-link\">第 16 章</a>。</li><li>機台出問題時，找出受影響的範圍，見<a href=\"#node-18\" class=\"semi-link\">第 18 章</a>。</li><li>客戶回報問題時，從一顆晶片一路追溯到它的晶圓、批次和每一站的生產條件。</li></ul>\n<p class=\"semi-p\">---</p>\n<h2 id=\"數據與智慧製造\" class=\"heading-anchor\">數據與智慧製造<a class=\"anchor-link\" href=\"#數據與智慧製造\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">一座晶圓廠每天產生的數據量非常龐大，包括機台感測器的數據、量測結果、測試結果和生產紀錄。這些數據正被用來做更多事情：</p>\n<ul class=\"semi-ul\"><li><strong>預測性保養</strong>：從機台數據的變化，預測零件什麼時候需要更換。</li><li><strong>虛擬量測</strong>：根據機台在加工時的數據，推估量測結果，減少實際量測的次數。</li><li><strong>人工智慧分析</strong>：自動辨識晶圓圖的型態、找出良率損失的原因。</li><li><strong>自動化派工</strong>：根據即時狀態，自動決定最佳的生產順序。</li></ul>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜系統停擺，工廠就停擺</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：MES 突然當機。</li><li><strong>做法</strong>：核心系統採用備援架構，系統的修改要經過完整測試，並安排在影響最小的時段上線；工廠也會事先準備系統停擺時的應變程序。</li><li><strong>為什麼</strong>：晶圓的每一次進出站都要經過系統，系統一停，機台就算正常也無法繼續生產。</li><li><strong>沒做會怎樣</strong>：整座工廠停線，正在等待的晶圓還可能因為超過 Q-Time 而需要重工或報廢。</li><li><strong>相關章節</strong>：<a href=\"#node-09\" class=\"semi-link\">第 9 章 清洗與污染控制</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>晶圓廠的複雜度遠超過人力能掌握，每一個動作都由系統指揮和記錄。</li><li>MES 是核心，搭配機台自動化、搬運、派工、Recipe 管理和製程控制等系統。</li><li>晶圓進站前，系統會檢查步驟、機台、Recipe、Q-Time、Hold 和污染等級。</li><li>每片晶圓的完整履歷，是良率分析、異常處理和客戶追溯的基礎。</li><li>工廠數據正被用在預測性保養、虛擬量測和人工智慧分析上。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Heiko Meyer、Franz Fuchs、Klaus Thiel，《Manufacturing Execution Systems: Optimal Design, Planning, and Deployment》</li><li>Wallace J. Hopp、Mark L. Spearman，《Factory Physics》</li><li>SEMI 的機台通訊相關標準（SECS/GEM）</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-22\" class=\"semi-link\">← 上一章：第 22 章 最終測試與可靠度</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"#node-24\" class=\"semi-link\">下一章：第 24 章 製程如何影響韌體 →</a></p>"
  },
  {
    "id": "ch24",
    "part": "第 6 部　走出晶圓廠",
    "partId": "part-6",
    "num": 24,
    "shortTitle": "製程如何影響韌體",
    "fullTitle": "第 24 章　製程如何影響韌體：給軟韌體工程師的硬體真相",
    "category": "systems",
    "waferTrack": "- 前一站：晶片出貨，裝進了產品裡\r\n- **本章：晶片開始工作後，製程如何影響韌體和軟體**\r\n- 下一站：旅程結束，附錄有術語總表與延伸閱讀",
    "headings": [
      {
        "text": "軟體看不見的硬體真相",
        "id": "軟體看不見的硬體真相"
      },
      {
        "text": "DRAM 為什麼要刷新",
        "id": "dram-為什麼要刷新"
      },
      {
        "text": "Row Hammer：記憶單元靠得太近",
        "id": "row-hammer記憶單元靠得太近"
      },
      {
        "text": "ECC：錯誤一定會發生",
        "id": "ecc錯誤一定會發生"
      },
      {
        "text": "NAND Flash 的脾氣",
        "id": "nand-flash-的脾氣"
      },
      {
        "text": "每一顆晶片都不一樣",
        "id": "每一顆晶片都不一樣"
      },
      {
        "text": "Errata 與晶片改版",
        "id": "errata-與晶片改版"
      },
      {
        "text": "本章重點",
        "id": "本章重點"
      },
      {
        "text": "延伸閱讀",
        "id": "延伸閱讀"
      }
    ],
    "contentHtml": "<h1 id=\"第-24-章-製程如何影響韌體給軟韌體工程師的硬體真相\" class=\"heading-anchor\">第 24 章　製程如何影響韌體：給軟韌體工程師的硬體真相<a class=\"anchor-link\" href=\"#第-24-章-製程如何影響韌體給軟韌體工程師的硬體真相\" aria-hidden=\"true\">#</a></h1>\n<div class=\"callout callout-wafer-pos\"><div class=\"callout-badge\">📍 WAFER TRACK 晶圓站點</div><div class=\"callout-body\"><p class=\"semi-p\">📍 <strong>晶圓位置</strong></p>\n<ul class=\"semi-ul\"><li>前一站：晶片出貨，裝進了產品裡</li><li><strong>本章：晶片開始工作後，製程如何影響韌體和軟體</strong></li><li>下一站：旅程結束，附錄有術語總表與延伸閱讀</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"軟體看不見的硬體真相\" class=\"heading-anchor\">軟體看不見的硬體真相<a class=\"anchor-link\" href=\"#軟體看不見的硬體真相\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">寫韌體或驅動程式的工程師，常常會遇到一些「規定」：記憶體要定期刷新、要開 ECC、快閃記憶體要做平均抹寫、某顆晶片有一份長長的勘誤清單。這些規定看起來像是硬體的脾氣，其實大多來自製程的物理限制。</p>\n<p class=\"semi-p\">本章把前面學到的製程知識，和軟韌體工程師每天面對的問題連起來。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"dram-為什麼要刷新\" class=\"heading-anchor\">DRAM 為什麼要刷新<a class=\"anchor-link\" href=\"#dram-為什麼要刷新\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">第 13 章提到，DRAM 用電容存放電荷，而電容會慢慢漏電。所以記憶體控制器必須定期把每一列資料讀出來再寫回去，通常每幾十毫秒就要把所有資料刷新一輪。</p>\n<p class=\"semi-p\">溫度越高，漏電越快。所以在高溫環境下，刷新的頻率通常要提高。刷新期間記憶體無法正常存取，也會消耗電力，所以刷新是 DRAM 效能和功耗的固定成本。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜刷新（Refresh）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：定期讀出 DRAM 中的資料再寫回，補充電容流失的電荷，避免資料消失。</li><li><strong>現場用法</strong>：「高溫時刷新頻率加倍，頻寬會掉一些。」</li><li><strong>相關名詞</strong>：DRAM、電容、資料保存時間、記憶體控制器</li><li><strong>常見混淆</strong>：刷新是由記憶體控制器和 DRAM 在背景自動進行的，不是作業系統或應用程式在做，但韌體會設定相關的參數。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"row-hammer記憶單元靠得太近\" class=\"heading-anchor\">Row Hammer：記憶單元靠得太近<a class=\"anchor-link\" href=\"#row-hammer記憶單元靠得太近\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">DRAM 的記憶單元越做越密，相鄰的單元之間也越容易互相干擾。研究人員在 2014 年公開發表：只要反覆、快速地存取同一列記憶體，就可能讓<strong>相鄰列</strong>的資料翻轉，這個現象稱為 <strong>Row Hammer</strong>。</p>\n<p class=\"semi-p\">這不只是可靠度問題，也是安全問題，因為攻擊者可能利用它修改不該修改的資料。現在的 DRAM 和記憶體控制器，都加入了偵測與額外刷新相鄰列的機制來防範。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"ecc錯誤一定會發生\" class=\"heading-anchor\">ECC：錯誤一定會發生<a class=\"anchor-link\" href=\"#ecc錯誤一定會發生\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">即使晶片完全正常，資料也可能偶爾出錯。例如封裝材料中微量的放射性物質，或來自宇宙射線的粒子，都可能打翻一個位元，這種錯誤稱為<strong>軟錯誤</strong>。再加上製程變異造成的體質較弱的單元，錯誤是無法完全避免的。</p>\n<div class=\"callout callout-glossary\"><div class=\"callout-badge\">📖 GLOSSARY 核心名詞</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>📖 名詞｜ECC（Error Correction Code，錯誤更正碼）</strong></p>\n<ul class=\"semi-ul\"><li><strong>定義</strong>：在資料中加入額外的檢查位元，讓系統能偵測並更正少量的位元錯誤。</li><li><strong>現場用法</strong>：「這台伺服器的記憶體一定要開 ECC。」</li><li><strong>相關名詞</strong>：軟錯誤、位元翻轉、同位檢查</li><li><strong>常見混淆</strong>：ECC 有能力上限，只能更正一定數量的錯誤，錯誤太多時只能偵測、無法更正。新一代 DRAM 晶片內部的 ECC，和系統層級的 ECC 也是兩件不同的事。</li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"nand-flash-的脾氣\" class=\"heading-anchor\">NAND Flash 的脾氣<a class=\"anchor-link\" href=\"#nand-flash-的脾氣\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">第 13 章介紹的 3D NAND，有幾個來自物理的限制，每一個都對應到韌體裡的一項功能：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>NAND 的物理限制</th><th>韌體的對策</th></tr></thead><tbody><tr><td>不能直接覆寫，必須先抹除；而且抹除的單位很大</td><td>位址對應表（FTL）與垃圾回收</td></tr><tr><td>每次抹寫都會讓儲存層耗損，次數有限</td><td>平均抹寫（Wear Leveling）</td></tr><tr><td>出廠時就有壞區塊，使用中還會增加</td><td>壞區塊管理</td></tr><tr><td>電荷會慢慢流失，讀取也會干擾相鄰單元</td><td>強力 ECC、讀取重試、定期搬移資料</td></tr></tbody></table></div>\n<p class=\"semi-p\">每個記憶單元存的位元越多，代表要分辨的電荷狀態越多、彼此的間隔越窄，可以抹寫的次數就越少，需要的 ECC 也越強。這就是 SLC、MLC、TLC、QLC 等規格在耐用度上差異的來源。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"每一顆晶片都不一樣\" class=\"heading-anchor\">每一顆晶片都不一樣<a class=\"anchor-link\" href=\"#每一顆晶片都不一樣\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">製程有變異，所以同一個設計做出來的晶片，速度和漏電都不完全相同。第 22 章提到的分級，就是因為這個原因。</p>\n<p class=\"semi-p\">有些晶片會在測試時，把每顆晶片的特性或校正值寫進晶片內的熔絲，韌體開機時讀取這些資料，為每顆晶片設定最適合的電壓和頻率。晶片的溫度和長期老化，也讓韌體需要做溫度保護，並在規格中保留安全餘裕。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜韌體裡的「魔術數字」常常來自製程</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：韌體程式碼裡有一些看不出道理的時序參數、電壓值或等待時間。</li><li><strong>做法</strong>：修改之前，先找出這些數字的來源，例如晶片規格書、特性量測報告或廠商的建議值。</li><li><strong>為什麼</strong>：這些數字通常是根據大量晶片在不同溫度、電壓下的實測結果訂出來的，並且已經考慮了製程變異和老化的餘裕。</li><li><strong>沒做會怎樣</strong>：在實驗室的幾片樣品上看起來沒問題，量產後卻在某些晶片、某些溫度下出現難以重現的錯誤。</li><li><strong>相關章節</strong>：<a href=\"#node-22\" class=\"semi-link\">第 22 章 最終測試與可靠度</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"errata-與晶片改版\" class=\"heading-anchor\">Errata 與晶片改版<a class=\"anchor-link\" href=\"#errata-與晶片改版\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">晶片量產後，仍可能發現設計上的錯誤。廠商會把已知的問題和建議的避開方法整理成<strong>勘誤表</strong>（Errata），很多問題要靠韌體或驅動程式繞過。</p>\n<p class=\"semi-p\">真正修正問題，則需要推出新版本的晶片，版本通常稱為 <strong>Stepping</strong>。常見的命名慣例是：字母改變（例如 A 改成 B）代表底層的電晶體也有修改，需要重做大部分光罩；數字改變（例如 A0 改成 A1）代表只修改上層的金屬導線。實際規則依各公司而定。</p>\n<div class=\"callout callout-knowhow\"><div class=\"callout-badge\">🔧 FAB KNOW-HOW 現場實務</div><div class=\"callout-body\"><p class=\"semi-p\"><strong>🔧 Know-how｜只改金屬層，修正又快又省</strong></p>\n<ul class=\"semi-ul\"><li><strong>情境</strong>：晶片發現一個設計錯誤，需要盡快推出修正版。</li><li><strong>做法</strong>：設計時預先在晶片各處埋入一些備用的邏輯閘。發現錯誤後，只要修改上層幾道金屬層的光罩，就能把這些備用閘接進電路。工廠甚至可以先把一些晶圓停在金屬層之前等待，修正版光罩一到就繼續生產。</li><li><strong>為什麼</strong>：底層電晶體的光罩最多、最貴，製程時間也最長；只改上層金屬，可以省下大量的成本和時間。</li><li><strong>沒做會怎樣</strong>：每一次修正都要從頭重做，等待好幾個月，成本也高出許多。</li><li><strong>相關章節</strong>：<a href=\"#node-11\" class=\"semi-link\">第 11 章 走一遍完整的 CMOS 流程</a>、<a href=\"#node-18\" class=\"semi-link\">第 18 章 異常處理與工程變更</a></li></ul></div></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"本章重點\" class=\"heading-anchor\">本章重點<a class=\"anchor-link\" href=\"#本章重點\" aria-hidden=\"true\">#</a></h2>\n<ol class=\"semi-ol\"><li>DRAM 的電容會漏電，所以必須定期刷新，溫度越高刷新越頻繁。</li><li>記憶單元越密，越容易互相干擾，Row Hammer 是代表性的例子。</li><li>軟錯誤無法完全避免，ECC 是重要的保護。</li><li>NAND 的物理限制，對應到 FTL、平均抹寫、壞區塊管理和 ECC 等韌體功能。</li><li>晶片改版時，只改金屬層比重做全部光罩快得多、也省得多。</li></ol>\n<p class=\"semi-p\">---</p>\n<h2 id=\"延伸閱讀\" class=\"heading-anchor\">延伸閱讀<a class=\"anchor-link\" href=\"#延伸閱讀\" aria-hidden=\"true\">#</a></h2>\n<ul class=\"semi-ul\"><li>Bruce Jacob、Spencer W. Ng、David T. Wang，《Memory Systems: Cache, DRAM, Disk》</li><li>Rino Micheloni、Luca Crippa、Alessia Marelli，《Inside NAND Flash Memories》</li><li>Yoongu Kim 等，〈Flipping Bits in Memory Without Accessing Them: An Experimental Study of DRAM Disturbance Errors〉，ISCA 2014</li></ul>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-23\" class=\"semi-link\">← 上一章：第 23 章 工廠如何被系統管理</a> ｜ <a href=\"../../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"../../appendix/glossary.md\" class=\"semi-link\">下一站：附錄 A 術語總表 →</a></p>"
  },
  {
    "id": "app-glossary",
    "part": "附錄",
    "partId": "part-app",
    "num": 25,
    "shortTitle": "附錄 A　術語總表",
    "fullTitle": "附錄 A　術語總表",
    "category": "appendix",
    "waferTrack": "",
    "headings": [],
    "contentHtml": "<h1 id=\"附錄-a-術語總表\" class=\"heading-anchor\">附錄 A　術語總表<a class=\"anchor-link\" href=\"#附錄-a-術語總表\" aria-hidden=\"true\">#</a></h1>\n<p class=\"semi-p\">本表收錄書中出現的主要術語，依英文字母排序。「章節」欄是該術語主要出現或說明的章節編號。</p>\n<p class=\"semi-p\">這份術語表也是全書用詞的<strong>單一來源</strong>：撰寫或翻譯時，請以本表的用詞為準。新增語言時，在表格中加上該語言的欄位即可，詳見 <a href=\"../../TRANSLATIONS.md\" class=\"semi-link\">TRANSLATIONS.md</a>。</p>\n<p class=\"semi-p\">想知道現場怎麼講這些詞，可以參考<a href=\"fab-jargon.md\" class=\"semi-link\">附錄 B 現場行話</a>。</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>英文</th><th>縮寫</th><th>繁體中文</th><th>說明</th><th>章節</th></tr></thead><tbody><tr><td>Activation</td><td>—</td><td>活化</td><td>透過退火讓植入的雜質原子進入晶格位置、開始導電</td><td>7</td></tr><tr><td>Advanced Process Control</td><td>APC</td><td>先進製程控制</td><td>R2R、FDC 等自動化製程控制方法的統稱</td><td>17</td></tr><tr><td>After Develop Inspection</td><td>ADI</td><td>顯影後檢查</td><td>微影完成後量測線寬、對準與缺陷</td><td>4</td></tr><tr><td>After Etch Inspection</td><td>AEI</td><td>蝕刻後檢查</td><td>蝕刻完成後量測線寬與缺陷</td><td>6</td></tr><tr><td>Alignment Mark</td><td>—</td><td>對準記號</td><td>前一層留下、供曝光機確認位置的圖形</td><td>4、15</td></tr><tr><td>Angstrom</td><td>Å</td><td>埃</td><td>0.1 奈米，部分新世代節點的命名單位</td><td>14</td></tr><tr><td>Anisotropic</td><td>—</td><td>非等向</td><td>主要往單一方向進行的蝕刻</td><td>6</td></tr><tr><td>Anneal</td><td>—</td><td>退火</td><td>加熱修復晶格並活化雜質</td><td>7</td></tr><tr><td>Ashing</td><td>—</td><td>去光阻（灰化）</td><td>用氧電漿去除光阻</td><td>6</td></tr><tr><td>Aspect Ratio</td><td>—</td><td>深寬比</td><td>孔洞或溝槽的深度與寬度之比</td><td>6、13</td></tr><tr><td>Atomic Layer Deposition</td><td>ALD</td><td>原子層沉積</td><td>一次只長一層原子、極均勻的沉積方法</td><td>5</td></tr><tr><td>Automated Material Handling System</td><td>AMHS</td><td>自動物料搬運系統</td><td>由天車與倉儲組成，自動搬運晶圓盒</td><td>1、23</td></tr><tr><td>Back End of Line</td><td>BEOL</td><td>後段製程</td><td>晶圓廠內製作多層金屬導線的階段</td><td>11</td></tr><tr><td>Backside Power Delivery</td><td>—</td><td>背面供電</td><td>把電源導線做在晶圓背面</td><td>12</td></tr><tr><td>Bad Block Management</td><td>—</td><td>壞區塊管理</td><td>標記並避開 NAND 中無法使用的區塊</td><td>24</td></tr><tr><td>Ball Grid Array</td><td>BGA</td><td>球柵陣列</td><td>底部布滿錫球的封裝形式</td><td>20</td></tr><tr><td>Barrier Layer</td><td>—</td><td>阻障層</td><td>防止銅擴散到絕緣層與矽中的薄層</td><td>10</td></tr><tr><td>Batch Tool</td><td>—</td><td>批次式機台</td><td>一次處理多片晶圓的機台，例如爐管</td><td>1、5</td></tr><tr><td>Bathtub Curve</td><td>—</td><td>浴缸曲線</td><td>失效率隨時間變化的曲線，兩端高、中間低</td><td>22</td></tr><tr><td>Bias Temperature Instability</td><td>BTI</td><td>偏壓溫度不穩定性</td><td>高溫與電壓讓 Vt 隨時間漂移</td><td>22</td></tr><tr><td>Bin</td><td>—</td><td>分類</td><td>測試後依結果把晶粒分成的類別</td><td>19</td></tr><tr><td>Binning</td><td>—</td><td>分級</td><td>依速度或功耗把同一種晶片分成不同等級</td><td>22、24</td></tr><tr><td>Bit Line</td><td>—</td><td>位元線</td><td>記憶陣列中負責讀寫資料的導線</td><td>13</td></tr><tr><td>Bond Pad</td><td>Pad</td><td>焊墊</td><td>晶片上供測試探針與封裝連接的金屬接點</td><td>11、19、20</td></tr><tr><td>Bump</td><td>—</td><td>凸塊</td><td>覆晶封裝中連接晶粒與基板的金屬凸點</td><td>20、21</td></tr><tr><td>Burn-in</td><td>—</td><td>預燒</td><td>在高溫與較高電壓下運作，篩除早期失效</td><td>22</td></tr><tr><td>Cap Layer</td><td>—</td><td>覆蓋層</td><td>銅 CMP 後蓋在銅表面、防止氧化與擴散的薄膜</td><td>10</td></tr><tr><td>CD-SEM</td><td>—</td><td>線寬量測電子顯微鏡</td><td>用電子顯微鏡從上方量測線寬</td><td>15</td></tr><tr><td>Chamber</td><td>—</td><td>腔體</td><td>機台中實際進行製程的密閉空間</td><td>6</td></tr><tr><td>Channel</td><td>—</td><td>通道</td><td>電晶體中源極與汲極之間、受閘極控制的區域</td><td>2</td></tr><tr><td>Channel Hole</td><td>—</td><td>通道孔</td><td>3D NAND 中貫穿整個堆疊的垂直孔</td><td>13</td></tr><tr><td>Channeling</td><td>—</td><td>通道效應</td><td>離子沿著晶格的空隙鑽得太深的現象</td><td>7</td></tr><tr><td>Chemical Mechanical Planarization</td><td>CMP</td><td>化學機械研磨</td><td>結合化學與機械作用，把表面磨平或去除多餘材料</td><td>8</td></tr><tr><td>Chemical Vapor Deposition</td><td>CVD</td><td>化學氣相沉積</td><td>讓氣體在晶圓表面反應形成薄膜</td><td>5</td></tr><tr><td>Chip Probing</td><td>CP</td><td>晶圓針測</td><td>在晶圓上逐顆測試晶粒的功能</td><td>19</td></tr><tr><td>Chiplet</td><td>—</td><td>小晶片</td><td>把大型晶片拆成多顆功能獨立的小晶片</td><td>21</td></tr><tr><td>Cleanroom</td><td>—</td><td>無塵室（潔淨室）</td><td>嚴格控制微粒與環境的生產空間</td><td>1</td></tr><tr><td>Commonality Analysis</td><td>—</td><td>共通性分析</td><td>找出異常晶圓共同經過的機台、腔體或時間</td><td>16、23</td></tr><tr><td>Complementary Metal-Oxide-Semiconductor</td><td>CMOS</td><td>互補式金屬氧化物半導體</td><td>NMOS 與 PMOS 成對使用的電路技術</td><td>2、11</td></tr><tr><td>Contact</td><td>—</td><td>接觸窗</td><td>連接電晶體與第一層金屬的金屬孔</td><td>10、11</td></tr><tr><td>Contacted Poly Pitch</td><td>CPP</td><td>閘極間距</td><td>相鄰兩個閘極之間的距離</td><td>14</td></tr><tr><td>Control Limit</td><td>—</td><td>管制界限</td><td>根據製程平常的表現算出的範圍，用來判斷製程是否異常</td><td>17</td></tr><tr><td>Critical Dimension</td><td>CD</td><td>關鍵尺寸</td><td>圖形最需要控制的尺寸，例如線寬</td><td>4、15</td></tr><tr><td>Cycle Time</td><td>—</td><td>生產週期</td><td>一批晶圓從投片到完成所需的時間</td><td>1、11</td></tr><tr><td>Czochralski Method</td><td>CZ</td><td>柴可拉斯基長晶法</td><td>從熔融矽中拉出單晶晶棒的方法</td><td>3</td></tr><tr><td>Damascene</td><td>—</td><td>大馬士革製程</td><td>先挖溝、再填金屬、最後研磨的導線做法</td><td>10</td></tr><tr><td>Days per Mask Layer</td><td>—</td><td>每層光罩天數</td><td>生產週期除以光罩層數，用來比較生產效率</td><td>11</td></tr><tr><td>Deep Ultraviolet</td><td>DUV</td><td>深紫外光</td><td>248 nm 與 193 nm 的微影光源</td><td>4</td></tr><tr><td>Defect</td><td>—</td><td>缺陷</td><td>晶圓上任何不該出現的異常</td><td>15</td></tr><tr><td>Defect Review</td><td>—</td><td>複檢</td><td>用電子顯微鏡拍攝缺陷近照並分類</td><td>15</td></tr><tr><td>Design of Experiments</td><td>DOE</td><td>實驗設計</td><td>系統化地同時改變多個因子，找出最佳條件</td><td>17</td></tr><tr><td>Design-Technology Co-Optimization</td><td>DTCO</td><td>設計與製程共同最佳化</td><td>同時調整設計與製程，提升密度與效能</td><td>14</td></tr><tr><td>Develop</td><td>—</td><td>顯影</td><td>用顯影液溶掉不要的光阻，讓圖形出現</td><td>4</td></tr><tr><td>Dicing</td><td>—</td><td>切割</td><td>沿著切割道把晶圓切成晶粒</td><td>20</td></tr><tr><td>Die</td><td>—</td><td>晶粒</td><td>晶圓上一個個相同的電路單元</td><td>0</td></tr><tr><td>Dishing</td><td>—</td><td>碟化</td><td>寬金屬導線中央被磨得凹陷</td><td>8</td></tr><tr><td>Doping</td><td>—</td><td>摻雜</td><td>刻意加入少量元素，改變半導體的導電特性</td><td>2</td></tr><tr><td>Dose</td><td>—</td><td>劑量</td><td>離子佈植時單位面積植入的原子數量</td><td>7</td></tr><tr><td>Drain</td><td>—</td><td>汲極</td><td>電晶體中電流流出的一端</td><td>2</td></tr><tr><td>Dry Etch</td><td>—</td><td>乾蝕刻</td><td>用電漿進行的蝕刻</td><td>6</td></tr><tr><td>Dummy Fill</td><td>—</td><td>假圖形</td><td>為了讓圖形密度均勻而加入的不通電圖形</td><td>8</td></tr><tr><td>Dummy Wafer</td><td>—</td><td>擋片</td><td>用來填補機台空位或調整機台狀態的非產品晶圓</td><td>3</td></tr><tr><td>Dynamic Random Access Memory</td><td>DRAM</td><td>動態隨機存取記憶體</td><td>以電容存放電荷、需要定期刷新的記憶體</td><td>13、24</td></tr><tr><td>Early Failure</td><td>—</td><td>早期失效</td><td>使用初期就發生的失效，可用預燒篩除</td><td>22</td></tr><tr><td>Electromigration</td><td>EM</td><td>電遷移</td><td>電流長期推動金屬原子，造成導線斷裂</td><td>10、22</td></tr><tr><td>Electroplating</td><td>—</td><td>電鍍</td><td>在電鍍液中讓金屬沉積到晶圓上</td><td>10</td></tr><tr><td>Electrostatic Discharge</td><td>ESD</td><td>靜電放電</td><td>靜電瞬間放電造成的損傷，也是可靠度測試項目</td><td>22</td></tr><tr><td>Endpoint Detection</td><td>—</td><td>終點偵測</td><td>判斷蝕刻或研磨是否到達目標的方法</td><td>6、8</td></tr><tr><td>Engineering Change Notice</td><td>ECN</td><td>工程變更通知</td><td>工廠內部的變更申請與審核流程</td><td>18</td></tr><tr><td>Epitaxy</td><td>—</td><td>磊晶</td><td>長出延續底層晶格的單晶薄膜</td><td>5、12</td></tr><tr><td>Erosion</td><td>—</td><td>侵蝕</td><td>導線密集的整個區域被磨得比周圍低</td><td>8</td></tr><tr><td>Errata</td><td>—</td><td>勘誤表</td><td>晶片已知問題與避開方法的清單</td><td>24</td></tr><tr><td>Error Correction Code</td><td>ECC</td><td>錯誤更正碼</td><td>偵測並更正少量位元錯誤的編碼</td><td>24</td></tr><tr><td>Etch Rate</td><td>—</td><td>蝕刻率</td><td>單位時間內蝕刻的深度</td><td>6</td></tr><tr><td>Etch Stop Layer</td><td>—</td><td>蝕刻停止層</td><td>讓蝕刻停在正確位置的耐蝕刻薄層</td><td>5、6</td></tr><tr><td>Exposure Field</td><td>Shot</td><td>曝光區</td><td>曝光機一次曝光的區域</td><td>4、16</td></tr><tr><td>Extreme Ultraviolet</td><td>EUV</td><td>極紫外光</td><td>波長 13.5 nm 的微影光源</td><td>4</td></tr><tr><td>Fab</td><td>—</td><td>晶圓廠</td><td>製造晶圓的工廠</td><td>1</td></tr><tr><td>Fabless</td><td>—</td><td>IC 設計公司</td><td>只設計晶片、沒有自己工廠的公司</td><td>0</td></tr><tr><td>Failure Analysis</td><td>FA</td><td>故障分析</td><td>找出晶片失效位置與原因的分析</td><td>16</td></tr><tr><td>Failures In Time</td><td>FIT</td><td>—</td><td>每十億個元件小時中發生的失效次數</td><td>22</td></tr><tr><td>Fan-Out Packaging</td><td>—</td><td>扇出型封裝</td><td>用重佈線層把接點擴展到晶粒範圍外的封裝</td><td>21</td></tr><tr><td>Fault Detection and Classification</td><td>FDC</td><td>錯誤偵測與分類</td><td>即時監控機台感測器數據、偵測異常的系統</td><td>17</td></tr><tr><td>Fin Field-Effect Transistor</td><td>FinFET</td><td>鰭式場效電晶體</td><td>閘極從三面包覆鰭狀通道的電晶體</td><td>12</td></tr><tr><td>Final Test</td><td>FT</td><td>最終測試</td><td>封裝後、出貨前的功能與電性測試</td><td>22</td></tr><tr><td>Flash Translation Layer</td><td>FTL</td><td>快閃記憶體轉換層</td><td>管理 NAND 邏輯位址與實體位址對應的韌體</td><td>24</td></tr><tr><td>Flip Chip</td><td>—</td><td>覆晶</td><td>晶粒正面朝下，以凸塊直接連接基板</td><td>20</td></tr><tr><td>Focused Ion Beam</td><td>FIB</td><td>聚焦離子束</td><td>在指定位置精準切割的分析工具</td><td>16</td></tr><tr><td>Foundry</td><td>—</td><td>晶圓代工</td><td>替客戶製造晶片的商業模式</td><td>0</td></tr><tr><td>Front End of Line</td><td>FEOL</td><td>前段製程</td><td>晶圓廠內製作電晶體的階段</td><td>11</td></tr><tr><td>Front Opening Unified Pod</td><td>FOUP</td><td>前開式晶圓傳送盒</td><td>300 mm 晶圓的密封搬運盒，最多裝 25 片</td><td>1</td></tr><tr><td>Furnace</td><td>—</td><td>爐管</td><td>用於氧化、退火與部分 CVD 的高溫批次式機台</td><td>5、7</td></tr><tr><td>Fuse</td><td>—</td><td>熔絲</td><td>用來切換備用電路或記錄晶片資料的可程式元件</td><td>13、19、24</td></tr><tr><td>Future Hold</td><td>—</td><td>預約 Hold</td><td>讓晶圓走到指定步驟時自動被擋下</td><td>18</td></tr><tr><td>Garbage Collection</td><td>—</td><td>垃圾回收</td><td>NAND 韌體整理無效資料、回收可用空間的機制</td><td>24</td></tr><tr><td>Gate</td><td>—</td><td>閘極</td><td>控制電晶體開關的電極</td><td>2</td></tr><tr><td>Gate Oxide</td><td>—</td><td>閘極氧化層</td><td>閘極與通道之間的薄絕緣層</td><td>2</td></tr><tr><td>Gate-All-Around</td><td>GAA</td><td>環繞式閘極</td><td>閘極從四面包覆通道的電晶體結構</td><td>12</td></tr><tr><td>Half Pitch</td><td>—</td><td>半間距</td><td>間距的一半</td><td>14</td></tr><tr><td>Handler</td><td>—</td><td>分類機</td><td>最終測試時搬運並分類封裝晶片的機台</td><td>22</td></tr><tr><td>Hard Mask</td><td>—</td><td>硬遮罩</td><td>比光阻更耐蝕刻的遮罩薄膜</td><td>5</td></tr><tr><td>High Bandwidth Memory</td><td>HBM</td><td>高頻寬記憶體</td><td>以 TSV 堆疊多顆 DRAM 的記憶體</td><td>13、21</td></tr><tr><td>High Temperature Operating Life</td><td>HTOL</td><td>高溫操作壽命測試</td><td>在高溫下長時間通電運作的可靠度測試</td><td>22</td></tr><tr><td>High-k Metal Gate</td><td>HKMG</td><td>高介電常數金屬閘極</td><td>高介電常數絕緣層搭配金屬閘極的結構</td><td>11、12</td></tr><tr><td>Highly Accelerated Stress Test</td><td>HAST</td><td>高加速溫濕度測試</td><td>以高溫、高濕與加壓加速濕氣入侵的可靠度測試</td><td>22</td></tr><tr><td>Hold</td><td>—</td><td>扣留</td><td>暫停晶圓或機台的生產，現場直接說 Hold</td><td>18</td></tr><tr><td>Hot Carrier Injection</td><td>HCI</td><td>熱載子注入</td><td>高能量電子進入閘極絕緣層，造成電晶體老化</td><td>22</td></tr><tr><td>Hot Lot</td><td>—</td><td>急件</td><td>被設定為優先生產的批次</td><td>1</td></tr><tr><td>Hybrid Bonding</td><td>—</td><td>混合鍵合</td><td>銅接點與絕緣層同時直接接合的晶片堆疊技術</td><td>21</td></tr><tr><td>Immersion Lithography</td><td>—</td><td>浸潤式微影</td><td>在鏡頭與晶圓之間加水，提升解析能力</td><td>4</td></tr><tr><td>Ingot</td><td>—</td><td>晶棒</td><td>長晶拉出的圓柱狀單晶矽</td><td>3</td></tr><tr><td>Inner Spacer</td><td>—</td><td>內側間隔物</td><td>GAA 結構中隔開閘極與源極、汲極的內部絕緣層</td><td>12</td></tr><tr><td>Inspection</td><td>—</td><td>檢測</td><td>在晶圓上尋找缺陷</td><td>15</td></tr><tr><td>Integrated Device Manufacturer</td><td>IDM</td><td>整合元件製造廠</td><td>自行設計、製造與銷售晶片的公司</td><td>0</td></tr><tr><td>Interlock</td><td>—</td><td>防呆</td><td>讓錯誤操作無法發生的系統檢查規則</td><td>23</td></tr><tr><td>Interposer</td><td>—</td><td>中介層</td><td>連接多顆晶片與封裝基板的轉接板</td><td>21</td></tr><tr><td>Ion Implantation</td><td>—</td><td>離子佈植</td><td>把雜質離子加速後射入矽中</td><td>7</td></tr><tr><td>Isotropic</td><td>—</td><td>等向</td><td>往各方向速度相同的蝕刻</td><td>6</td></tr><tr><td>Killer Defect</td><td>—</td><td>致命缺陷</td><td>會造成晶片失效的缺陷</td><td>15、16</td></tr><tr><td>Known Good Die</td><td>KGD</td><td>已知良好晶粒</td><td>經過測試確認良好的晶粒</td><td>19、21</td></tr><tr><td>Leadframe</td><td>—</td><td>導線架</td><td>承載晶粒並提供外部接腳的金屬框架</td><td>20</td></tr><tr><td>Lithography</td><td>—</td><td>微影</td><td>用光把光罩圖形轉移到光阻上的製程，現場常叫黃光</td><td>4</td></tr><tr><td>Load Port</td><td>—</td><td>晶圓盒裝載埠</td><td>機台前方放置晶圓盒的平台</td><td>1</td></tr><tr><td>Loading Effect</td><td>—</td><td>負載效應</td><td>圖形疏密不同，造成蝕刻速度不同</td><td>6</td></tr><tr><td>Lot</td><td>—</td><td>批</td><td>一起生產的一組晶圓，最多 25 片</td><td>0</td></tr><tr><td>Lot History</td><td>—</td><td>履歷</td><td>晶圓經過的步驟、機台、時間與量測結果的完整紀錄</td><td>16、18、23</td></tr><tr><td>Low Pressure CVD</td><td>LPCVD</td><td>低壓化學氣相沉積</td><td>靠高溫提供能量、薄膜品質好的 CVD</td><td>5</td></tr><tr><td>Low-k Dielectric</td><td>Low-k</td><td>低介電常數材料</td><td>用來降低導線之間干擾的絕緣材料</td><td>10</td></tr><tr><td>Manufacturing Execution System</td><td>MES</td><td>製造執行系統</td><td>管理生產現場、記錄晶圓狀態與歷程的核心系統</td><td>23</td></tr><tr><td>Mask / Reticle</td><td>—</td><td>光罩</td><td>帶有一層電路圖形的石英板</td><td>4</td></tr><tr><td>Material Review Board</td><td>MRB</td><td>物料審查會議</td><td>跨部門判定不合格品處置方式的會議</td><td>18</td></tr><tr><td>Mature Node</td><td>—</td><td>成熟製程</td><td>已量產多年、成本較低的製程世代</td><td>14</td></tr><tr><td>Metal-Oxide-Semiconductor Field-Effect Transistor</td><td>MOSFET</td><td>金屬氧化物半導體場效電晶體</td><td>以閘極電壓控制通道導通的電晶體</td><td>2</td></tr><tr><td>Metrology</td><td>—</td><td>量測</td><td>測量膜厚、線寬等具體數值</td><td>15</td></tr><tr><td>Micro Bump</td><td>—</td><td>微凸塊</td><td>間距約數十微米的細小凸塊，用於晶片堆疊</td><td>13、21</td></tr><tr><td>Middle of Line</td><td>MOL</td><td>中段製程</td><td>把電晶體接到金屬層的階段</td><td>11</td></tr><tr><td>Mini-environment</td><td>—</td><td>迷你環境</td><td>只讓晶圓所在的小空間維持極高潔淨度的設計</td><td>1</td></tr><tr><td>Minimum Metal Pitch</td><td>MMP</td><td>最小金屬間距</td><td>最密集那層金屬導線的間距</td><td>14</td></tr><tr><td>Moisture Sensitivity Level</td><td>MSL</td><td>濕度敏感等級</td><td>依封裝對濕氣的敏感程度所做的分級</td><td>20</td></tr><tr><td>Monitor Wafer</td><td>—</td><td>控片</td><td>用來檢查機台狀態的非產品晶圓</td><td>3</td></tr><tr><td>Moore's Law</td><td>—</td><td>摩爾定律</td><td>晶片上的電晶體數量大約每兩年增加一倍的趨勢</td><td>2、14</td></tr><tr><td>NAND Flash</td><td>—</td><td>NAND 快閃記憶體</td><td>斷電後資料仍會保留的記憶體</td><td>13、24</td></tr><tr><td>Nanosheet</td><td>—</td><td>奈米片</td><td>GAA 電晶體中水平堆疊的薄片通道</td><td>12</td></tr><tr><td>Native Oxide</td><td>—</td><td>原生氧化層</td><td>矽表面接觸空氣後自然長出的薄氧化層</td><td>5、9</td></tr><tr><td>Notch</td><td>—</td><td>晶圓缺口</td><td>晶圓邊緣標示方向的小缺口</td><td>3</td></tr><tr><td>Optical Critical Dimension</td><td>OCD</td><td>光學關鍵尺寸量測</td><td>分析光的散射，搭配模型推算立體輪廓</td><td>15</td></tr><tr><td>Optical Proximity Correction</td><td>OPC</td><td>光學鄰近效應修正</td><td>修改光罩圖形，補償成像時的變形</td><td>4</td></tr><tr><td>Out of Control</td><td>OOC</td><td>超出管制界限</td><td>數據超出管制界限，代表製程出現異常訊號</td><td>17</td></tr><tr><td>Out of Control Action Plan</td><td>OCAP</td><td>異常處理計畫</td><td>異常發生時事先規定好的處理步驟</td><td>18</td></tr><tr><td>Out of Spec</td><td>OOS</td><td>超出規格</td><td>數據超出規格界限，代表產品不合格</td><td>17</td></tr><tr><td>Outsourced Semiconductor Assembly and Test</td><td>OSAT</td><td>封裝測試廠</td><td>提供封裝與測試服務的公司</td><td>0</td></tr><tr><td>Over Etch</td><td>—</td><td>過度蝕刻</td><td>到達終點後再多蝕刻一點，確保材料清乾淨</td><td>6</td></tr><tr><td>Overhead Hoist Transport</td><td>OHT</td><td>天車</td><td>在天花板軌道上搬運晶圓盒的設備</td><td>1</td></tr><tr><td>Overlay</td><td>—</td><td>疊對誤差</td><td>上下兩層圖形之間的對準誤差</td><td>4</td></tr><tr><td>Particle</td><td>—</td><td>微粒</td><td>落在晶圓上的微小顆粒，是最常見的缺陷來源</td><td>1、9</td></tr><tr><td>Passivation</td><td>—</td><td>保護層</td><td>晶片最上方保護電路、只在焊墊處開口的絕緣層</td><td>11</td></tr><tr><td>Photoresist</td><td>PR</td><td>光阻</td><td>對光敏感、用來轉印圖形的材料</td><td>4</td></tr><tr><td>Physical Vapor Deposition</td><td>PVD</td><td>物理氣相沉積</td><td>以濺鍍等物理方式沉積薄膜</td><td>5</td></tr><tr><td>Pitch</td><td>—</td><td>間距</td><td>重複圖形中一條線加上一個間隔的總寬度</td><td>14</td></tr><tr><td>Plasma</td><td>—</td><td>電漿</td><td>被激發成離子、電子與活潑原子團混合的氣體</td><td>6</td></tr><tr><td>Plasma-Enhanced CVD</td><td>PECVD</td><td>電漿輔助化學氣相沉積</td><td>用電漿提供能量、可以在較低溫度進行的 CVD</td><td>5</td></tr><tr><td>PN Junction</td><td>—</td><td>PN 接面</td><td>P 型與 N 型區域的交界</td><td>2</td></tr><tr><td>Polysilicon</td><td>Poly</td><td>多晶矽</td><td>由許多排列方向不同的小晶粒組成的矽</td><td>3、11</td></tr><tr><td>Post-Exposure Bake</td><td>PEB</td><td>曝後烤</td><td>曝光後加熱，讓光阻的化學反應完成</td><td>4</td></tr><tr><td>Predictive Maintenance</td><td>—</td><td>預測性保養</td><td>從機台數據預測零件何時需要更換</td><td>23</td></tr><tr><td>Preventive Maintenance</td><td>PM</td><td>預防保養</td><td>定期停機保養機台</td><td>1</td></tr><tr><td>Probe Card</td><td>—</td><td>探針卡</td><td>晶圓測試時接觸晶粒焊墊的探針組</td><td>19</td></tr><tr><td>Prober</td><td>—</td><td>針測機</td><td>CP 測試時移動晶圓、讓探針對準晶粒的機台</td><td>19</td></tr><tr><td>Process Capability Index</td><td>Cpk</td><td>製程能力指標</td><td>描述製程落在規格內的從容程度</td><td>17</td></tr><tr><td>Process Design Kit</td><td>PDK</td><td>製程設計套件</td><td>晶圓廠提供給設計者的設計規則與電性模型</td><td>14</td></tr><tr><td>Process Node</td><td>—</td><td>製程節點</td><td>代表某一代製程技術的名稱</td><td>14</td></tr><tr><td>Product / Process Change Notification</td><td>PCN</td><td>產品／製程變更通知</td><td>通知客戶產品或製程的變更</td><td>18</td></tr><tr><td>Queue Time</td><td>Q-Time</td><td>等待時間限制</td><td>兩個步驟之間允許等待的最長時間</td><td>9</td></tr><tr><td>Rapid Thermal Anneal</td><td>RTA</td><td>快速熱退火</td><td>在幾秒內完成的高溫退火</td><td>7</td></tr><tr><td>Re-entrant Flow</td><td>—</td><td>重複進入流程</td><td>晶圓在流程中多次回到同一類機台的生產方式</td><td>11</td></tr><tr><td>Recipe</td><td>—</td><td>配方</td><td>機台執行製程時使用的參數組合</td><td>0</td></tr><tr><td>Redistribution Layer</td><td>RDL</td><td>重佈線層</td><td>把接點重新分佈到其他位置的導線層</td><td>21</td></tr><tr><td>Redundancy Repair</td><td>—</td><td>修補</td><td>用備用電路取代壞掉的記憶單元</td><td>13、19</td></tr><tr><td>Refresh</td><td>—</td><td>刷新</td><td>定期重寫 DRAM 資料，避免電荷流失</td><td>13、24</td></tr><tr><td>Release</td><td>—</td><td>放行</td><td>解除 Hold，讓晶圓繼續生產</td><td>18</td></tr><tr><td>Reliability</td><td>—</td><td>可靠度</td><td>晶片在預定的使用條件下能正常工作多久</td><td>22</td></tr><tr><td>Rework</td><td>—</td><td>重工</td><td>去除部分結果後重新製作</td><td>4、18</td></tr><tr><td>Root Cause</td><td>—</td><td>根本原因</td><td>造成異常的最根本原因</td><td>18</td></tr><tr><td>Route</td><td>—</td><td>流程</td><td>產品從頭到尾要經過的步驟與順序</td><td>0、11</td></tr><tr><td>Row Hammer</td><td>—</td><td>—</td><td>反覆存取 DRAM 的同一列，造成相鄰列的位元翻轉</td><td>24</td></tr><tr><td>Run-to-Run Control</td><td>R2R</td><td>批次間控制</td><td>根據量測結果自動調整下一批的製程參數</td><td>17</td></tr><tr><td>Sacrificial Layer</td><td>—</td><td>犧牲層</td><td>先做出來佔住位置、之後再移除的材料</td><td>12</td></tr><tr><td>Sampling</td><td>—</td><td>抽樣</td><td>只量測部分批次、晶圓或位置</td><td>15</td></tr><tr><td>Scanner</td><td>—</td><td>曝光機</td><td>把光罩圖形縮小投影到晶圓上的機台</td><td>4</td></tr><tr><td>Scrap</td><td>—</td><td>報廢</td><td>晶圓不再繼續生產</td><td>18</td></tr><tr><td>Scribe Line</td><td>—</td><td>切割道</td><td>晶粒之間預留給切割與測試鍵的區域</td><td>0、19</td></tr><tr><td>Seasoning</td><td>—</td><td>腔體調理</td><td>保養後先跑擋片，讓腔體狀態穩定</td><td>6</td></tr><tr><td>SECS/GEM</td><td>—</td><td>機台通訊標準</td><td>機台與工廠系統之間的共同通訊標準</td><td>23</td></tr><tr><td>Seed Layer</td><td>—</td><td>晶種層</td><td>電鍍前先鋪的一層薄金屬，作為電鍍的起點</td><td>10</td></tr><tr><td>Selectivity</td><td>—</td><td>選擇比</td><td>目標材料與其他材料的蝕刻速度比</td><td>6</td></tr><tr><td>Shallow Trench Isolation</td><td>STI</td><td>淺溝槽隔離</td><td>以填滿絕緣材料的淺溝槽隔開元件</td><td>11</td></tr><tr><td>Sheet Resistance</td><td>Rs</td><td>片電阻</td><td>薄層的電阻值，反映摻雜或膜厚</td><td>7、15</td></tr><tr><td>Short-Channel Effect</td><td>SCE</td><td>短通道效應</td><td>通道太短時閘極控制力下降、漏電增加</td><td>12</td></tr><tr><td>Silicide</td><td>—</td><td>金屬矽化物</td><td>金屬與矽反應形成的低電阻化合物</td><td>11</td></tr><tr><td>Silicon on Insulator</td><td>SOI</td><td>絕緣層上覆矽</td><td>薄矽層下方埋有絕緣層的晶圓</td><td>3</td></tr><tr><td>SLC / MLC / TLC / QLC</td><td>—</td><td>單層／多層／三層／四層式儲存單元</td><td>NAND 每個記憶單元分別存 1、2、3、4 個位元</td><td>24</td></tr><tr><td>Slurry</td><td>—</td><td>研磨液</td><td>CMP 使用、含研磨顆粒與化學品的液體</td><td>8</td></tr><tr><td>Soft Error</td><td>—</td><td>軟錯誤</td><td>由輻射粒子等造成、非永久性的位元錯誤</td><td>24</td></tr><tr><td>Source</td><td>—</td><td>源極</td><td>電晶體中電流流入的一端</td><td>2</td></tr><tr><td>Spacer</td><td>—</td><td>側壁間隔物</td><td>閘極兩側的絕緣結構</td><td>11</td></tr><tr><td>Specification Limit</td><td>—</td><td>規格界限</td><td>產品要求的範圍，超出就代表不合格</td><td>17</td></tr><tr><td>Split Lot</td><td>—</td><td>分批實驗</td><td>把同一批晶圓分組，使用不同條件的實驗</td><td>17</td></tr><tr><td>Sputtering</td><td>—</td><td>濺鍍</td><td>用離子撞擊靶材，沉積金屬薄膜</td><td>5</td></tr><tr><td>Staircase</td><td>—</td><td>階梯結構</td><td>3D NAND 邊緣一階一階的結構，讓接觸窗分別接到每一層</td><td>13</td></tr><tr><td>Static Random-Access Memory</td><td>SRAM</td><td>靜態隨機存取記憶體</td><td>常被拿來比較製程密度的記憶單元</td><td>14</td></tr><tr><td>Statistical Process Control</td><td>SPC</td><td>統計製程管制</td><td>以管制圖監控製程的穩定性</td><td>17</td></tr><tr><td>Stealth Dicing</td><td>—</td><td>隱形切割</td><td>用雷射在晶圓內部形成改質層，再讓晶粒分開</td><td>20</td></tr><tr><td>Step Coverage</td><td>—</td><td>階梯覆蓋</td><td>薄膜在高低起伏表面上的覆蓋均勻度</td><td>5</td></tr><tr><td>Stepping</td><td>—</td><td>晶片版本</td><td>晶片修正設計後的版本代號</td><td>24</td></tr><tr><td>Stocker</td><td>—</td><td>倉儲</td><td>暫時存放晶圓盒的自動倉庫</td><td>1</td></tr><tr><td>Strained Silicon</td><td>—</td><td>應變矽</td><td>讓矽晶格輕微變形，使電子或電洞跑得更快</td><td>12</td></tr><tr><td>System Level Test</td><td>SLT</td><td>系統級測試</td><td>在接近實際產品的環境中測試晶片</td><td>22</td></tr><tr><td>Target</td><td>—</td><td>靶材</td><td>PVD 濺鍍時被離子撞擊的材料來源</td><td>5</td></tr><tr><td>Temperature Cycling</td><td>TC</td><td>溫度循環</td><td>反覆在高溫與低溫之間切換的可靠度測試</td><td>22</td></tr><tr><td>Test Key</td><td>—</td><td>測試鍵</td><td>切割道上專供電性量測的測試結構</td><td>19</td></tr><tr><td>Tester</td><td>—</td><td>測試機</td><td>送出測試訊號並判斷晶片反應的機台</td><td>19、22</td></tr><tr><td>Thermal Budget</td><td>—</td><td>熱預算</td><td>晶圓在製程中經歷的高溫總量</td><td>7</td></tr><tr><td>Thermal Oxidation</td><td>—</td><td>熱氧化</td><td>在高溫下讓矽表面長出氧化層</td><td>5</td></tr><tr><td>Threshold Voltage</td><td>Vt</td><td>臨界電壓</td><td>讓電晶體導通所需的最低閘極電壓</td><td>2、19</td></tr><tr><td>Through-Silicon Via</td><td>TSV</td><td>矽穿孔</td><td>垂直貫穿晶片的金屬導線</td><td>13、21</td></tr><tr><td>Time-Dependent Dielectric Breakdown</td><td>TDDB</td><td>時間相依介電崩潰</td><td>絕緣層長期承受電場後被擊穿</td><td>22</td></tr><tr><td>Track-in / Track-out</td><td>—</td><td>進站與出站</td><td>在系統上登記開始加工與完成加工</td><td>23</td></tr><tr><td>Ultrapure Water</td><td>UPW</td><td>超純水</td><td>幾乎不含任何雜質的清洗用水</td><td>1、9</td></tr><tr><td>Underfill</td><td>—</td><td>底部填充</td><td>填入覆晶晶粒與基板之間的膠材</td><td>20</td></tr><tr><td>Via</td><td>—</td><td>導通孔</td><td>連接上下兩層金屬的金屬孔</td><td>10</td></tr><tr><td>Virtual Metrology</td><td>VM</td><td>虛擬量測</td><td>用機台加工時的數據推估量測結果</td><td>23</td></tr><tr><td>Wafer</td><td>—</td><td>晶圓</td><td>用來製造晶片的圓形矽薄片</td><td>3</td></tr><tr><td>Wafer Acceptance Test</td><td>WAT</td><td>晶圓允收測試</td><td>量測切割道上的測試鍵，確認製程結果</td><td>19</td></tr><tr><td>Wafer ID</td><td>—</td><td>晶圓編號</td><td>雷射刻在晶圓上、用來追蹤每一片晶圓的編號</td><td>3</td></tr><tr><td>Wafer Map</td><td>—</td><td>晶圓圖</td><td>晶圓上每顆晶粒測試結果的分佈圖</td><td>16、19</td></tr><tr><td>Wafer Start</td><td>—</td><td>投片</td><td>把空白晶圓投入生產</td><td>0</td></tr><tr><td>Wafer-Level Packaging</td><td>WLP</td><td>晶圓級封裝</td><td>直接在晶圓上完成封裝，尺寸接近晶粒本身</td><td>20</td></tr><tr><td>Wear Leveling</td><td>—</td><td>平均抹寫</td><td>讓 NAND 各區塊磨損平均的韌體技術</td><td>24</td></tr><tr><td>Well</td><td>—</td><td>井</td><td>為了做出 NMOS 或 PMOS 而摻雜的區域</td><td>2、11</td></tr><tr><td>Wet Etch</td><td>—</td><td>濕蝕刻</td><td>用化學溶液進行的蝕刻</td><td>6</td></tr><tr><td>Wire Bonding</td><td>—</td><td>打線接合</td><td>用細金屬線連接晶粒與封裝</td><td>20</td></tr><tr><td>Word Line</td><td>—</td><td>字元線</td><td>記憶陣列中控制記憶單元開關的導線</td><td>13</td></tr><tr><td>Work in Process</td><td>WIP</td><td>在製品</td><td>還在生產線上、尚未完成的晶圓</td><td>1</td></tr><tr><td>Yield</td><td>—</td><td>良率</td><td>好產品占全部產品的比例</td><td>16</td></tr><tr><td>Yield Learning Curve</td><td>—</td><td>良率學習曲線</td><td>新製程良率隨時間逐步爬升的過程</td><td>16</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"#node-24\" class=\"semi-link\">← 第 24 章 製程如何影響韌體</a> ｜ <a href=\"../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"fab-jargon.md\" class=\"semi-link\">附錄 B 現場行話 →</a></p>"
  },
  {
    "id": "app-jargon",
    "part": "附錄",
    "partId": "part-app",
    "num": 26,
    "shortTitle": "附錄 B　現場行話",
    "fullTitle": "附錄 B　現場行話",
    "category": "appendix",
    "waferTrack": "",
    "headings": [
      {
        "text": "晶圓與批次",
        "id": "晶圓與批次"
      },
      {
        "text": "機台",
        "id": "機台"
      },
      {
        "text": "系統與流程",
        "id": "系統與流程"
      },
      {
        "text": "品質與異常",
        "id": "品質與異常"
      },
      {
        "text": "區域與人",
        "id": "區域與人"
      }
    ],
    "contentHtml": "<h1 id=\"附錄-b-現場行話\" class=\"heading-anchor\">附錄 B　現場行話<a class=\"anchor-link\" href=\"#附錄-b-現場行話\" aria-hidden=\"true\">#</a></h1>\n<p class=\"semi-p\">晶圓廠的日常溝通，常常是中文夾雜英文術語，例如「這批 Q-Time 快到了，先跑它」。剛入行的人第一次聽到，常常一頭霧水。</p>\n<p class=\"semi-p\">本附錄收錄晶圓廠裡常聽到的說法，並附上例句。各公司的習慣用語不完全相同，這裡整理的是業界普遍的講法。正式的術語定義請見<a href=\"glossary.md\" class=\"semi-link\">附錄 A 術語總表</a>。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"晶圓與批次\" class=\"heading-anchor\">晶圓與批次<a class=\"anchor-link\" href=\"#晶圓與批次\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>行話</th><th>意思</th><th>例句</th></tr></thead><tbody><tr><td>Lot</td><td>一批晶圓，最多 25 片</td><td>「這個 Lot 今天要出貨。」</td></tr><tr><td>投片（Wafer Start）</td><td>把空白晶圓投入生產</td><td>「這個月的投片量增加了。」</td></tr><tr><td>Fab Out</td><td>晶圓完成前段製程，離開晶圓廠</td><td>「這批預計下週 Fab Out。」</td></tr><tr><td>Hot Lot</td><td>優先生產的急件</td><td>「這批是 Hot Lot，到站先跑。」</td></tr><tr><td>Split</td><td>把一批晶圓分成幾組，做不同條件</td><td>「這批要 Split 成三組條件。」</td></tr><tr><td>Merge</td><td>把分開的晶圓合回同一批</td><td>「實驗做完就 Merge 回去。」</td></tr><tr><td>Bank</td><td>讓晶圓暫停在某個步驟等待</td><td>「這批先 Bank 在金屬層前面。」</td></tr><tr><td>WIP</td><td>還在生產線上的晶圓</td><td>「黃光前面的 WIP 堆太多了。」</td></tr><tr><td>Move</td><td>一段時間內晶圓完成的步驟數，用來衡量產出</td><td>「今天全廠的 Move 有達標嗎？」</td></tr><tr><td>控片</td><td>用來檢查機台狀態的測試晶圓（Monitor Wafer）</td><td>「先跑一片控片確認膜厚。」</td></tr><tr><td>擋片</td><td>用來填補空位或調整機台的晶圓（Dummy Wafer）</td><td>「爐管空位記得補擋片。」</td></tr><tr><td>破片</td><td>晶圓破裂</td><td>「機械手臂取片時破片了。」</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"機台\" class=\"heading-anchor\">機台<a class=\"anchor-link\" href=\"#機台\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>行話</th><th>意思</th><th>例句</th></tr></thead><tbody><tr><td>Recipe</td><td>機台執行製程用的參數組合</td><td>「這道的 Recipe 換新版本了。」</td></tr><tr><td>PM</td><td>定期保養</td><td>「這台今天下午排 PM。」</td></tr><tr><td>Down（Down 機）</td><td>機台故障或停用</td><td>「蝕刻機 Down 了，已經通知 EE。」</td></tr><tr><td>復機</td><td>機台修好、恢復生產</td><td>「這台預計晚上復機。」</td></tr><tr><td>Qual</td><td>確認機台狀態合格的驗證</td><td>「PM 完要先 Qual 過才能跑貨。」</td></tr><tr><td>Seasoning</td><td>保養後先跑擋片，讓腔體穩定</td><td>「先 Season 二十片擋片。」</td></tr><tr><td>Chamber</td><td>機台中實際做製程的腔體</td><td>「這片是在 B 腔做的。」</td></tr><tr><td>Idle</td><td>機台閒置、沒有晶圓可跑</td><td>「這台 Idle 很久了。」</td></tr><tr><td>綁機（Dedication）</td><td>指定晶圓只能在特定機台上做</td><td>「這層要綁同一台曝光機。」</td></tr><tr><td>Load Port</td><td>機台前方放晶圓盒的平台</td><td>「Load Port 讀不到 FOUP 的編號。」</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"系統與流程\" class=\"heading-anchor\">系統與流程<a class=\"anchor-link\" href=\"#系統與流程\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>行話</th><th>意思</th><th>例句</th></tr></thead><tbody><tr><td>進站（Track-in）</td><td>在系統上登記開始加工</td><td>「貨放上去記得先進站。」</td></tr><tr><td>出站（Track-out）</td><td>在系統上登記完成加工</td><td>「機台跑完了，記得出站。」</td></tr><tr><td>Hold</td><td>暫停晶圓或機台的生產</td><td>「這批被 Hold 了，原因是 Q-Time 超過。」</td></tr><tr><td>Release</td><td>解除 Hold，放行繼續生產</td><td>「工程師確認沒問題，可以 Release。」</td></tr><tr><td>Q-Time</td><td>兩站之間允許等待的時間</td><td>「這批 Q-Time 快到了，先跑它。」</td></tr><tr><td>派工</td><td>決定機台下一批要跑哪一批晶圓</td><td>「派工系統把這批排在最前面。」</td></tr><tr><td>跑貨</td><td>讓產品晶圓在機台上生產</td><td>「這台現在可以跑貨了嗎？」</td></tr><tr><td>帳實不符</td><td>系統紀錄和實際狀況不一致</td><td>「系統顯示已出站，晶圓卻還在機台裡，帳實不符。」</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"品質與異常\" class=\"heading-anchor\">品質與異常<a class=\"anchor-link\" href=\"#品質與異常\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>行話</th><th>意思</th><th>例句</th></tr></thead><tbody><tr><td>OOC</td><td>數據超出管制界限</td><td>「這點 OOC 了，照 OCAP 處理。」</td></tr><tr><td>OOS</td><td>數據超出規格</td><td>「膜厚 OOS，要開 MRB。」</td></tr><tr><td>Rework</td><td>重新製作，主要用在微影</td><td>「ADI 沒過，要 Rework。」</td></tr><tr><td>Scrap</td><td>報廢</td><td>「這片破片了，只能 Scrap。」</td></tr><tr><td>Excursion</td><td>突發的品質異常事件</td><td>「昨天那次缺陷的 Excursion 影響了三批。」</td></tr><tr><td>MRB</td><td>跨部門判定不合格品處置的會議</td><td>「這批要開 MRB 決定。」</td></tr><tr><td>Map</td><td>晶圓圖</td><td>「看一下這片的 Map 有沒有刮痕。」</td></tr><tr><td>Particle</td><td>微粒</td><td>「這片的 Particle 數超標。」</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"區域與人\" class=\"heading-anchor\">區域與人<a class=\"anchor-link\" href=\"#區域與人\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>行話</th><th>意思</th><th>例句</th></tr></thead><tbody><tr><td>黃光</td><td>微影區，因照明是黃色而得名</td><td>「這批卡在黃光。」</td></tr><tr><td>爐管</td><td>氧化、退火等批次式高溫機台的區域</td><td>「爐管今天組批比較慢。」</td></tr><tr><td>Wet</td><td>濕式清洗與濕蝕刻區</td><td>「這道要先到 Wet 洗一下。」</td></tr><tr><td>PE、EE、PIE、YE</td><td>製程、設備、製程整合、良率工程師</td><td>「這個問題要找 PIE 判斷。」</td></tr><tr><td>交接</td><td>換班時說明機台與晶圓的狀況</td><td>「交接時要講清楚這台還在觀察。」</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"glossary.md\" class=\"semi-link\">← 附錄 A 術語總表</a> ｜ <a href=\"../README.md\" class=\"semi-link\">目錄</a> ｜ <a href=\"further-reading.md\" class=\"semi-link\">附錄 C 延伸閱讀 →</a></p>"
  },
  {
    "id": "app-reading",
    "part": "附錄",
    "partId": "part-app",
    "num": 27,
    "shortTitle": "附錄 C　延伸閱讀",
    "fullTitle": "附錄 C　延伸閱讀",
    "category": "appendix",
    "waferTrack": "",
    "headings": [
      {
        "text": "入門與綜合",
        "id": "入門與綜合"
      },
      {
        "text": "元件物理",
        "id": "元件物理"
      },
      {
        "text": "製程模組與量測",
        "id": "製程模組與量測"
      },
      {
        "text": "良率、統計與製程控制",
        "id": "良率統計與製程控制"
      },
      {
        "text": "測試、封裝與可靠度",
        "id": "測試封裝與可靠度"
      },
      {
        "text": "記憶體與韌體",
        "id": "記憶體與韌體"
      },
      {
        "text": "工廠運作與系統",
        "id": "工廠運作與系統"
      },
      {
        "text": "產業與歷史",
        "id": "產業與歷史"
      },
      {
        "text": "產業標準",
        "id": "產業標準"
      },
      {
        "text": "研討會",
        "id": "研討會"
      },
      {
        "text": "網站",
        "id": "網站"
      }
    ],
    "contentHtml": "<h1 id=\"附錄-c-延伸閱讀\" class=\"heading-anchor\">附錄 C　延伸閱讀<a class=\"anchor-link\" href=\"#附錄-c-延伸閱讀\" aria-hidden=\"true\">#</a></h1>\n<p class=\"semi-p\">本附錄整理書中各章引用的參考資料，以及想深入了解時可以參考的書籍、標準與研討會。這些資料大多是英文，閱讀時可以搭配<a href=\"glossary.md\" class=\"semi-link\">附錄 A 術語總表</a>。</p>\n<p class=\"semi-p\">---</p>\n<h2 id=\"入門與綜合\" class=\"heading-anchor\">入門與綜合<a class=\"anchor-link\" href=\"#入門與綜合\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>資料</th><th>說明</th><th>相關章節</th></tr></thead><tbody><tr><td>Peter Van Zant，《Microchip Fabrication: A Practical Guide to Semiconductor Processing》</td><td>涵蓋整個製造流程的經典入門書</td><td>全書</td></tr><tr><td>Hong Xiao，《Introduction to Semiconductor Manufacturing Technology》</td><td>以製程模組為架構，圖解清楚</td><td>第 2 部</td></tr><tr><td>Michael Quirk、Julian Serda，《Semiconductor Manufacturing Technology》</td><td>偏重實務與設備，適合準備入行的讀者</td><td>全書</td></tr><tr><td>James D. Plummer、Michael D. Deal、Peter B. Griffin，《Silicon VLSI Technology: Fundamentals, Practice, and Modeling》</td><td>理論較深，第 2 章完整介紹一條 CMOS 流程</td><td>第 2、3 部</td></tr></tbody></table></div>\n<h2 id=\"元件物理\" class=\"heading-anchor\">元件物理<a class=\"anchor-link\" href=\"#元件物理\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>資料</th><th>說明</th><th>相關章節</th></tr></thead><tbody><tr><td>S. M. Sze、M. K. Lee，《Semiconductor Devices: Physics and Technology》</td><td>半導體元件的標準教科書</td><td>2、12</td></tr><tr><td>IEEE IRDS（International Roadmap for Devices and Systems），More Moore 章節</td><td>電晶體與製程微縮的發展路線圖</td><td>12、14</td></tr></tbody></table></div>\n<h2 id=\"製程模組與量測\" class=\"heading-anchor\">製程模組與量測<a class=\"anchor-link\" href=\"#製程模組與量測\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>資料</th><th>說明</th><th>相關章節</th></tr></thead><tbody><tr><td>Chris Mack，《Fundamental Principles of Optical Lithography》</td><td>微影原理</td><td>4</td></tr><tr><td>Karen A. Reinhardt、Werner Kern 編，《Handbook of Silicon Wafer Cleaning Technology》</td><td>晶圓清洗技術手冊</td><td>9</td></tr><tr><td>Alain C. Diebold 編，《Handbook of Silicon Semiconductor Metrology》</td><td>量測技術手冊</td><td>15</td></tr></tbody></table></div>\n<h2 id=\"良率統計與製程控制\" class=\"heading-anchor\">良率、統計與製程控制<a class=\"anchor-link\" href=\"#良率統計與製程控制\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>資料</th><th>說明</th><th>相關章節</th></tr></thead><tbody><tr><td>Gary S. May、Costas J. Spanos，《Fundamentals of Semiconductor Manufacturing and Process Control》</td><td>良率、統計與製程控制</td><td>16、17、18</td></tr><tr><td>Douglas C. Montgomery，《Introduction to Statistical Quality Control》</td><td>統計品管的標準教科書</td><td>17</td></tr><tr><td>EDFAS／ASM International，《Microelectronics Failure Analysis Desk Reference》</td><td>故障分析的技術手冊</td><td>16</td></tr></tbody></table></div>\n<h2 id=\"測試封裝與可靠度\" class=\"heading-anchor\">測試、封裝與可靠度<a class=\"anchor-link\" href=\"#測試封裝與可靠度\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>資料</th><th>說明</th><th>相關章節</th></tr></thead><tbody><tr><td>Michael L. Bushnell、Vishwani D. Agrawal，《Essentials of Electronic Testing for Digital, Memory and Mixed-Signal VLSI Circuits》</td><td>晶片測試</td><td>19</td></tr><tr><td>Rao R. Tummala，《Fundamentals of Microsystems Packaging》</td><td>封裝基礎</td><td>20</td></tr><tr><td>John H. Lau，《Semiconductor Advanced Packaging》</td><td>先進封裝</td><td>21</td></tr><tr><td>J. W. McPherson，《Reliability Physics and Engineering: Time-To-Failure Modeling》</td><td>可靠度物理與壽命模型</td><td>22</td></tr></tbody></table></div>\n<h2 id=\"記憶體與韌體\" class=\"heading-anchor\">記憶體與韌體<a class=\"anchor-link\" href=\"#記憶體與韌體\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>資料</th><th>說明</th><th>相關章節</th></tr></thead><tbody><tr><td>Rino Micheloni、Luca Crippa、Alessia Marelli，《Inside NAND Flash Memories》</td><td>NAND Flash 的結構與操作</td><td>13、24</td></tr><tr><td>Bruce Jacob、Spencer W. Ng、David T. Wang，《Memory Systems: Cache, DRAM, Disk》</td><td>記憶體系統</td><td>13、24</td></tr><tr><td>Yoongu Kim 等，〈Flipping Bits in Memory Without Accessing Them: An Experimental Study of DRAM Disturbance Errors〉，ISCA 2014</td><td>首次系統性揭露 Row Hammer 的論文</td><td>24</td></tr></tbody></table></div>\n<h2 id=\"工廠運作與系統\" class=\"heading-anchor\">工廠運作與系統<a class=\"anchor-link\" href=\"#工廠運作與系統\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>資料</th><th>說明</th><th>相關章節</th></tr></thead><tbody><tr><td>Wallace J. Hopp、Mark L. Spearman，《Factory Physics》</td><td>生產週期、在製品與產能的基本觀念</td><td>1、23</td></tr><tr><td>Heiko Meyer、Franz Fuchs、Klaus Thiel，《Manufacturing Execution Systems: Optimal Design, Planning, and Deployment》</td><td>製造執行系統</td><td>23</td></tr></tbody></table></div>\n<h2 id=\"產業與歷史\" class=\"heading-anchor\">產業與歷史<a class=\"anchor-link\" href=\"#產業與歷史\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>資料</th><th>說明</th></tr></thead><tbody><tr><td>Chris Miller，《Chip War: The Fight for the World's Most Critical Technology》（繁體中文版書名《晶片戰爭》）</td><td>半導體產業的發展史</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<h2 id=\"產業標準\" class=\"heading-anchor\">產業標準<a class=\"anchor-link\" href=\"#產業標準\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>標準</th><th>內容</th><th>相關章節</th></tr></thead><tbody><tr><td>ISO 14644-1</td><td>潔淨室的等級分類</td><td>1</td></tr><tr><td>SEMI E10</td><td>設備可靠度、可用率與狀態的定義</td><td>1、23</td></tr><tr><td>SEMI E5、E30、E37</td><td>機台通訊標準（SECS-II、GEM、HSMS）</td><td>23</td></tr><tr><td>IPC/JEDEC J-STD-020</td><td>封裝的濕度敏感等級分類</td><td>20</td></tr><tr><td>IPC/JEDEC J-STD-033</td><td>濕度敏感元件的包裝、運送與使用</td><td>20</td></tr><tr><td>JEDEC J-STD-046</td><td>產品與製程變更的客戶通知</td><td>18</td></tr><tr><td>JEDEC JESD47</td><td>積體電路的可靠度驗證</td><td>22</td></tr><tr><td>AEC-Q100</td><td>車用積體電路的可靠度驗證</td><td>22</td></tr></tbody></table></div>\n<h2 id=\"研討會\" class=\"heading-anchor\">研討會<a class=\"anchor-link\" href=\"#研討會\" aria-hidden=\"true\">#</a></h2>\n<p class=\"semi-p\">想知道最新的技術進展，可以關注以下研討會發表的論文：</p>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>研討會</th><th>主題</th></tr></thead><tbody><tr><td>IEEE IEDM（International Electron Devices Meeting）</td><td>電晶體與元件技術</td></tr><tr><td>Symposium on VLSI Technology and Circuits</td><td>先進製程與電路</td></tr><tr><td>SPIE Advanced Lithography + Patterning</td><td>微影與圖形化技術</td></tr><tr><td>IEEE ECTC（Electronic Components and Technology Conference）</td><td>封裝技術</td></tr><tr><td>IEEE IRPS（International Reliability Physics Symposium）</td><td>可靠度物理</td></tr><tr><td>ISTFA（International Symposium for Testing and Failure Analysis）</td><td>測試與故障分析</td></tr></tbody></table></div>\n<h2 id=\"網站\" class=\"heading-anchor\">網站<a class=\"anchor-link\" href=\"#網站\" aria-hidden=\"true\">#</a></h2>\n<div class=\"table-container\"><table class=\"semi-table\"><thead><tr><th>網站</th><th>說明</th><th>相關章節</th></tr></thead><tbody><tr><td>WikiChip</td><td>製程節點與晶片架構的整理</td><td>14</td></tr></tbody></table></div>\n<p class=\"semi-p\">---</p>\n<p class=\"semi-p\"><a href=\"fab-jargon.md\" class=\"semi-link\">← 附錄 B 現場行話</a> ｜ <a href=\"../README.md\" class=\"semi-link\">目錄</a></p>"
  }
];
