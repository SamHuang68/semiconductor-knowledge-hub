# 生成圖規格（2026-10-27）

這六張圖全部是**示意（illustrative）**。它們不是量測、機台驗收、產品拆解、AMHS 配置圖，也不是指名晶圓廠的照片。頁面圖說會標「示意 Illustrative」。

把檔案放到下列路徑後，探索頁 `#explore` 會顯示圖片。檔案還沒到時，框內改顯示檔名與替代文字，不出現破圖圖示。不要改檔名；`hub-visuals.js` 的 `alt` 與這裡對齊。

## 共通限制

- 比例 16:9。建議輸出 1600×900 的 WebP，放在 `assets/generated/`。
- 畫面裡不要可讀的廠牌、logo、序號、批號、螢幕數字或尺寸標註。
- 不要真人正臉；若需要人員，只放遠景、失焦、看不到五官的剪影。
- 色調靠近本站識別：矽藍 `#075985`、晶圓青綠 `#0f766e`、金屬琥珀 `#9a3412`，底保持亮，不要整張暗房。
- 幾何與光色可以像真實工廠或教科書剖面，但不得被讀成某一座廠、某一批貨或某一份量測報告。

提示詞用英文，方便圖像模型。替代文字中英都要保留，頁面依介面語言擇一。

## 1. hero-cleanroom-aisle.webp

- 路徑：`assets/generated/hero-cleanroom-aisle.webp`
- 替代文字（zh）：無塵室走道與天車的示意畫面，不是指名晶圓廠的照片。
- 替代文字（en）：Illustrative cleanroom aisle with overhead transport, not a photograph of a named fab.
- 圖說（zh）：示意用無塵室走道，不是量測影像，也不是特定工廠。
- 圖說（en）：Illustrative cleanroom aisle. Not a metrology image and not a specific factory.

Prompt:

```
Photorealistic 16:9 corporate photograph of a semiconductor cleanroom aisle, eye-level, looking down a long bay. Raised perforated metal floor, white modular walls, cool overhead lighting with a faint amber reflection from a side bay. A ceiling rail carries a small overhead hoist and one plain white FOUP pod with no logos, no labels, and no serial numbers. Process tools are anonymous stainless enclosures; screens are dark or blank, with no readable UI and no brand marks. No people, no text, no numbers, no watermarks. High-end annual-report lighting, sharp but not a documentary of a named factory. Illustrative only.
```

## 2. wafer-notch-macro.webp

- 路徑：`assets/generated/wafer-notch-macro.webp`
- 替代文字（zh）：矽晶圓缺口與切割道的示意近拍。
- 替代文字（en）：Illustrative macro of a silicon wafer notch and die streets.
- 圖說（zh）：示意用晶圓表面，不是批次照片。
- 圖說（en）：Illustrative wafer surface. Not a lot photograph.

Prompt:

```
Photorealistic 16:9 macro of the edge of a polished 300 mm silicon wafer. Mirror-gray surface with a faint rectangular die-street grid, a single notch centered on the near edge, cool blue-gray studio reflections. No lot code, no laser mark, no text, no fingers, no scale bar. Clean and quiet, like a materials catalog plate, explicitly illustrative and not a lot photograph.
```

## 3. litho-scanner-bay.webp

- 路徑：`assets/generated/litho-scanner-bay.webp`
- 替代文字（zh）：黃光區曝光機台的示意場景，沒有可讀廠牌。
- 替代文字（en）：Illustrative lithography scanner bay in yellow light, without readable brand marks.
- 圖說（zh）：示意用曝光機台區，不是機台驗收照片。
- 圖說（en）：Illustrative scanner bay. Not a tool acceptance photo.

Prompt:

```
Photorealistic 16:9 view inside a semiconductor lithography bay under 500 nm amber safelight. One large anonymous scanner enclosure, pale yellow walls, a track of plain FOUP pods, no brand logos, no model names, no readable displays, no specification plates. If a person is present, only a distant blurred silhouette with no face. Warm amber light, professional, calm. Illustrative scanner bay, not a tool-acceptance photograph.
```

## 4. finfet-cutaway-illustrative.webp

- 路徑：`assets/generated/finfet-cutaway-illustrative.webp`
- 替代文字（zh）：FinFET 剖面示意，可見鰭片、閘極與源汲，未按比例。
- 替代文字（en）：Illustrative FinFET cutaway showing fin, gate, and source-drain, not to scale.
- 圖說（zh）：示意用元件剖面，幾何不是實測切面。
- 圖說（en）：Illustrative device cutaway. Geometry is not a measured cross-section.

Prompt:

```
Clean technical cutaway illustration, 16:9, light background #f8fafc, not a TEM micrograph. A single silicon fin rises from a silicon substrate, a high-k metal gate wraps the fin, source and drain regions sit on either side of the gate. Materials use silicon blue #075985, wafer teal #0f766e, and metal amber #e1ad70. No dimensions, no nanometer callouts, no brand, no scale bar, and no claim of a real process node. Geometry is simplified and not to scale. Small caption area left empty. Illustrative device teaching plate.
```

## 5. cowos-stack-illustrative.webp

- 路徑：`assets/generated/cowos-stack-illustrative.webp`
- 替代文字（zh）：2.5D 封裝堆疊示意，含中介層與堆疊記憶體，未按比例。
- 替代文字（en）：Illustrative 2.5D package stack with interposer and stacked memory, not to scale.
- 圖說（zh）：示意用封裝堆疊，不是產品拆解。
- 圖說（en）：Illustrative package stack. Not a product teardown.

Prompt:

```
Clean technical exploded cutaway, 16:9, light background. From bottom to top: an organic package substrate, a silicon interposer, one large logic die, and a short stack of memory dies sitting on the interposer beside the logic die. Microbumps suggested as small repeating dots, no measurements, no vendor names, no product names, no solder-brand marks. Palette: substrate gray-blue, interposer #bae6fd, logic #57bdb3, memory #99f6e4, bumps #d9ac73. Not to scale. Illustrative package teaching plate, not a teardown photo.
```

## 6. oht-foup-bay.webp

- 路徑：`assets/generated/oht-foup-bay.webp`
- 替代文字（zh）：天車吊運 FOUP 經過機台的示意畫面。
- 替代文字（en）：Illustrative overhead hoist carrying a FOUP above process tools.
- 圖說（zh）：示意用自動搬運，不是 AMHS 配置圖。
- 圖說（en）：Illustrative automated transport. Not an AMHS layout drawing.

Prompt:

```
Photorealistic 16:9 cleanroom scene of an overhead hoist on a ceiling rail carrying one plain white FOUP above a row of anonymous process tools. No route arrows, no station numbers, no layout legend, no logos, no readable screens. Cool white light, perforated floor, professional and uncluttered. Illustrative automated transport, not an AMHS layout drawing and not a specific factory.
```

## 放入後要核對

- 六個 `<img data-illustrative="true">` 都載得到，圖說仍有「示意 Illustrative」。
- 中英文替代文字與本檔一致。
- 圖裡沒有可讀廠牌或假量測數字。
- 窄螢幕（360、390）沒有水平溢位。
