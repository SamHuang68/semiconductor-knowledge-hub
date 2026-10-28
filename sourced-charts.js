const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function group(value) {
  const [whole, frac] = String(value).split('.');
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return frac ? `${withCommas}.${frac}` : withCommas;
}

function bars(points, valueKey, textKey, unit, labelKey = 'year') {
  const max = Math.max(...points.map(point => point[valueKey]));
  return points.map(point => {
    const width = max > 0 ? (point[valueKey] / max) * 100 : 0;
    const label = String(point[labelKey]);
    const wide = label.length > 4 ? ' sourced-bar-wide' : '';
    return `<div class="sourced-bar${wide}"><span class="sourced-bar-year">${esc(label)}</span><span class="sourced-bar-track"><span class="sourced-bar-fill" style="width:${width.toFixed(2)}%"></span></span><span class="sourced-bar-value">${esc(point[textKey])} ${esc(unit)}</span></div>`;
  }).join('');
}

const WAFER_URL = 'https://www.prnewswire.com/news-releases/worldwide-silicon-wafer-shipments-and-revenue-start-recovery-in-late-2024-semi-reports-302375339.html';
const TSMC_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001046179.json';
const WSTS_PAGE = 'https://www.wsts.org/67/Historical-Billings-Report';
const WSTS_XLSX = 'https://www.wsts.org/esraCMS/extension/media/f/WST/7803/WSTS-Historical-Billings-Report-Aug_2026.xlsx';
const ASML_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000937966.json';
const LAM_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000707549.json';
const AMAT_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000006951.json';
const AXCELIS_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001113232.json';
const MICRON_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000723125.json';
const KLA_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000319201.json';
const ENTG_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001101302.json';
const ACMR_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001680062.json';
const FORM_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001039399.json';
const AMKR_URL = 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001047127.json';

const waferPoints = [
  { year: '2020', areaValue: 12407, areaText: '12,407', revenueValue: 11.2, revenueText: '11.2' },
  { year: '2021', areaValue: 14165, areaText: '14,165', revenueValue: 12.6, revenueText: '12.6' },
  { year: '2022', areaValue: 14713, areaText: '14,713', revenueValue: 13.8, revenueText: '13.8' },
  { year: '2023', areaValue: 12602, areaText: '12,602', revenueValue: 12.3, revenueText: '12.3' },
  { year: '2024', areaValue: 12266, areaText: '12,266', revenueValue: 11.5, revenueText: '11.5' }
];

const ppePoints = [
  { year: '2017', usd: 11153400000, filed: '2018-04-19', accn: '0001193125-18-121866' },
  { year: '2018', usd: 10309800000, filed: '2019-04-17', accn: '0001193125-19-108390' },
  { year: '2019', usd: 15393600000, filed: '2020-04-15', accn: '0001193125-20-107579' },
  { year: '2020', usd: 18064100000, filed: '2021-04-16', accn: '0001193125-21-118512' },
  { year: '2021', usd: 30252200000, filed: '2022-04-14', accn: '0001193125-22-104891' },
  { year: '2022', usd: 35231800000, filed: '2023-04-20', accn: '0001193125-23-107214' },
  { year: '2023', usd: 31019500000, filed: '2024-04-18', accn: '0001193125-24-099840' },
  { year: '2024', usd: 29155400000, filed: '2025-04-17', accn: '0001193125-25-083423' }
].map(point => ({ ...point, usdText: group(point.usd), usdValue: point.usd }));

export const wstsWorldwidePoints = [
  { year: '1986', row: 10, cell: 'N10', usdThousand: 26355359 },
  { year: '1987', row: 16, cell: 'N16', usdThousand: 32530452 },
  { year: '1988', row: 22, cell: 'N22', usdThousand: 45004809 },
  { year: '1989', row: 28, cell: 'N28', usdThousand: 48762926 },
  { year: '1990', row: 34, cell: 'N34', usdThousand: 50518932 },
  { year: '1991', row: 40, cell: 'N40', usdThousand: 54607454 },
  { year: '1992', row: 46, cell: 'N46', usdThousand: 59864958 },
  { year: '1993', row: 52, cell: 'N52', usdThousand: 77309681 },
  { year: '1994', row: 58, cell: 'N58', usdThousand: 101878593 },
  { year: '1995', row: 64, cell: 'N64', usdThousand: 144403681 },
  { year: '1996', row: 70, cell: 'N70', usdThousand: 131966432 },
  { year: '1997', row: 76, cell: 'N76', usdThousand: 137203120 },
  { year: '1998', row: 82, cell: 'N82', usdThousand: 125611999 },
  { year: '1999', row: 88, cell: 'N88', usdThousand: 149378551 },
  { year: '2000', row: 94, cell: 'N94', usdThousand: 204393623 },
  { year: '2001', row: 100, cell: 'N100', usdThousand: 138962610 },
  { year: '2002', row: 106, cell: 'N106', usdThousand: 140713320 },
  { year: '2003', row: 112, cell: 'N112', usdThousand: 166425522 },
  { year: '2004', row: 118, cell: 'N118', usdThousand: 213026836 },
  { year: '2005', row: 124, cell: 'N124', usdThousand: 227484137 },
  { year: '2006', row: 130, cell: 'N130', usdThousand: 247716193 },
  { year: '2007', row: 136, cell: 'N136', usdThousand: 255645338 },
  { year: '2008', row: 142, cell: 'N142', usdThousand: 248602812 },
  { year: '2009', row: 148, cell: 'N148', usdThousand: 226313366 },
  { year: '2010', row: 154, cell: 'N154', usdThousand: 298315115 },
  { year: '2011', row: 160, cell: 'N160', usdThousand: 299521338 },
  { year: '2012', row: 166, cell: 'N166', usdThousand: 291562116 },
  { year: '2013', row: 172, cell: 'N172', usdThousand: 305583864 },
  { year: '2014', row: 178, cell: 'N178', usdThousand: 335842917 },
  { year: '2015', row: 184, cell: 'N184', usdThousand: 335167861 },
  { year: '2016', row: 190, cell: 'N190', usdThousand: 338930855 },
  { year: '2017', row: 196, cell: 'N196', usdThousand: 412220944 },
  { year: '2018', row: 202, cell: 'N202', usdThousand: 468778285 },
  { year: '2019', row: 208, cell: 'N208', usdThousand: 412306976 },
  { year: '2020', row: 214, cell: 'N214', usdThousand: 440389358 },
  { year: '2021', row: 220, cell: 'N220', usdThousand: 555892514 },
  { year: '2022', row: 226, cell: 'N226', usdThousand: 574084194 },
  { year: '2023', row: 232, cell: 'N232', usdThousand: 526885425 },
  { year: '2024', row: 238, cell: 'N238', usdThousand: 630548606 },
  { year: '2025', row: 244, cell: 'N244', usdThousand: 795640305 }
].map(point => ({ ...point, usdText: group(point.usdThousand), usdValue: point.usdThousand }));

export const wstsRegionPoints = [
  { year: '2024', region: 'Americas', cell: 'N234', usdThousand: 195122507 },
  { year: '2024', region: 'Europe', cell: 'N235', usdThousand: 51250218 },
  { year: '2024', region: 'Japan', cell: 'N236', usdThousand: 46739287 },
  { year: '2024', region: 'Asia Pacific', cell: 'N237', usdThousand: 337436594 },
  { year: '2025', region: 'Americas', cell: 'N240', usdThousand: 256476450 },
  { year: '2025', region: 'Europe', cell: 'N241', usdThousand: 54694054 },
  { year: '2025', region: 'Japan', cell: 'N242', usdThousand: 44723219 },
  { year: '2025', region: 'Asia Pacific', cell: 'N243', usdThousand: 439746582 }
].map(point => ({
  ...point,
  barLabel: `${point.year} ${point.region}`,
  usdText: group(point.usdThousand),
  usdValue: point.usdThousand
}));

function rdPoints(rows) {
  return rows.map(([end, value, filed, accn]) => ({
    end,
    year: end.slice(0, 4),
    value,
    valueText: group(value),
    filed,
    accn
  }));
}

export const asmlRdPoints = rdPoints([
  ['2011-12-31', 590270000, '2012-02-14', '0001193125-12-058548'],
  ['2012-12-31', 589182000, '2013-02-13', '0001193125-13-053249'],
  ['2013-12-31', 882029000, '2014-02-12', '0001193125-14-046822'],
  ['2014-12-31', 1074035000, '2015-02-11', '0001193125-15-042676'],
  ['2019-12-31', 1968500000, '2020-02-12', '0000937966-20-000011'],
  ['2020-12-31', 2200800000, '2021-02-10', '0000937966-21-000007'],
  ['2021-12-31', 2547000000, '2022-02-09', '0000937966-22-000013'],
  ['2022-12-31', 3253500000, '2023-02-15', '0000937966-23-000014'],
  ['2023-12-31', 3980600000, '2024-02-14', '0000937966-24-000008'],
  ['2024-12-31', 4303700000, '2025-03-05', '0000937966-25-000009'],
  ['2025-12-31', 4698800000, '2026-02-25', '0001628280-26-011378']
]);

export const lamRdPoints = rdPoints([
  ['2011-06-26', 373293000, '2011-08-19', '0001193125-11-227691'],
  ['2012-06-24', 444559000, '2012-08-22', '0001193125-12-365446'],
  ['2013-06-30', 683688000, '2013-08-27', '0001193125-13-348269'],
  ['2014-06-29', 716471000, '2014-08-26', '0001193125-14-321759'],
  ['2015-06-28', 825242000, '2015-08-13', '0001193125-15-290023'],
  ['2016-06-26', 913712000, '2016-08-17', '0000707549-16-000050'],
  ['2017-06-25', 1033742000, '2017-08-15', '0000707549-17-000100'],
  ['2018-06-24', 1189514000, '2018-08-14', '0000707549-18-000115'],
  ['2019-06-30', 1191320000, '2019-08-20', '0000707549-19-000124'],
  ['2020-06-28', 1252412000, '2020-08-18', '0000707549-20-000138'],
  ['2021-06-27', 1493408000, '2021-08-17', '0000707549-21-000136'],
  ['2022-06-26', 1604248000, '2022-08-24', '0000707549-22-000107'],
  ['2023-06-25', 1727162000, '2023-08-15', '0000707549-23-000102'],
  ['2024-06-30', 1902444000, '2024-08-29', '0000707549-24-000106'],
  ['2025-06-29', 2096387000, '2025-08-11', '0000707549-25-000075'],
  ['2026-06-28', 2375873000, '2026-08-07', '0000707549-26-000037']
]);

export const tsmcRdPoints = rdPoints([
  ['2017-12-31', 80732500000, '2018-04-19', '0001193125-18-121866'],
  ['2018-12-31', 85895600000, '2019-04-17', '0001193125-19-108390'],
  ['2019-12-31', 91418700000, '2020-04-15', '0001193125-20-107579'],
  ['2020-12-31', 109486000000, '2021-04-16', '0001193125-21-118512'],
  ['2021-12-31', 124734800000, '2022-04-14', '0001193125-22-104891'],
  ['2022-12-31', 163262200000, '2023-04-20', '0001193125-23-107214'],
  ['2023-12-31', 182370200000, '2024-04-18', '0001193125-24-099840'],
  ['2024-12-31', 204181800000, '2025-04-17', '0001193125-25-083423']
]);

export const amatRdPoints = rdPoints([
  ['2011-10-30', 1118000000, '2011-12-06', '0001193125-11-332050'],
  ['2012-10-28', 1237000000, '2012-12-05', '0000006951-12-000018'],
  ['2013-10-27', 1320000000, '2013-12-04', '0000006951-13-000044'],
  ['2014-10-26', 1428000000, '2014-12-17', '0000006951-14-000037'],
  ['2015-10-25', 1451000000, '2015-12-09', '0000006951-15-000034'],
  ['2016-10-30', 1540000000, '2016-12-15', '0000006951-16-000068'],
  ['2019-10-27', 2054000000, '2019-12-13', '0000006951-19-000046'],
  ['2020-10-25', 2234000000, '2020-12-11', '0000006951-20-000048'],
  ['2021-10-31', 2485000000, '2021-12-17', '0000006951-21-000043'],
  ['2022-10-30', 2771000000, '2022-12-16', '0000006951-22-000043'],
  ['2023-10-29', 3102000000, '2023-12-15', '0000006951-23-000041'],
  ['2024-10-27', 3233000000, '2024-12-13', '0000006951-24-000044'],
  ['2025-10-26', 3570000000, '2025-12-12', '0001628280-25-056742']
]);

export const axcelisRdPoints = rdPoints([
  ['2011-12-31', 47176000, '2012-02-29', '0001047469-12-001874'],
  ['2012-12-31', 40401000, '2013-03-01', '0001047469-13-002045'],
  ['2013-12-31', 34756000, '2014-03-03', '0001047469-14-001681'],
  ['2015-12-31', 32586000, '2016-03-04', '0001047469-16-010788'],
  ['2016-12-31', 34402000, '2017-03-14', '0001558370-17-001778'],
  ['2017-12-31', 43071000, '2018-03-14', '0001558370-18-002060'],
  ['2018-12-31', 51876000, '2019-03-11', '0001558370-19-001791'],
  ['2019-12-31', 53931000, '2020-03-02', '0001558370-20-001858'],
  ['2020-12-31', 61833000, '2021-02-26', '0001558370-21-001972'],
  ['2021-12-31', 65431000, '2022-02-25', '0001558370-22-002096'],
  ['2022-12-31', 78356000, '2023-02-24', '0001558370-23-002006'],
  ['2023-12-31', 96907000, '2024-02-23', '0001558370-24-001628'],
  ['2024-12-31', 105497000, '2025-02-28', '0001558370-25-001855'],
  ['2025-12-31', 108958000, '2026-02-26', '0001104659-26-020461']
]);

export const micronRevenuePoints = [
  ['2018-08-31', '2019-08-29', 23406000000, '2019-10-17', '0000723125-19-000094'],
  ['2019-08-30', '2020-09-03', 21435000000, '2020-10-19', '0000723125-20-000082'],
  ['2020-09-04', '2021-09-02', 27705000000, '2021-10-08', '0000723125-21-000065'],
  ['2021-09-03', '2022-09-01', 30758000000, '2022-10-07', '0000723125-22-000048'],
  ['2022-09-02', '2023-08-31', 15540000000, '2023-10-06', '0000723125-23-000054'],
  ['2023-09-01', '2024-08-29', 25111000000, '2024-10-04', '0000723125-24-000027'],
  ['2024-08-30', '2025-08-28', 37378000000, '2025-10-03', '0000723125-25-000028'],
  ['2025-08-29', '2026-09-03', 133188000000, '2026-10-09', '0000723125-26-000023']
].map(([start, end, value, filed, accn]) => ({
  start,
  end,
  year: end.slice(0, 4),
  value,
  valueText: group(value),
  filed,
  accn
}));

export const entgRdPoints = rdPoints([
  ['2011-12-31', 47980000, '2012-02-24', '0001193125-12-078423'],
  ['2012-12-31', 50940000, '2013-02-22', '0001193125-13-071771'],
  ['2013-12-31', 55320000, '2014-02-20', '0001101302-14-000002'],
  ['2014-12-31', 87711000, '2015-02-26', '0001101302-15-000002'],
  ['2015-12-31', 105900000, '2016-02-29', '0001101302-16-000012'],
  ['2016-12-31', 106991000, '2017-02-17', '0001101302-17-000005'],
  ['2017-12-31', 106951000, '2018-02-15', '0001101302-18-000008'],
  ['2018-12-31', 118456000, '2019-02-11', '0001101302-19-000010'],
  ['2019-12-31', 121140000, '2020-02-07', '0001101302-20-000013'],
  ['2020-12-31', 136057000, '2021-02-05', '0001101302-21-000011'],
  ['2021-12-31', 167632000, '2022-02-04', '0001101302-22-000010'],
  ['2022-12-31', 228994000, '2023-02-23', '0001101302-23-000021'],
  ['2025-12-31', 329000000, '2026-02-11', '0001101302-26-000012']
]);

export const acmrRdPoints = rdPoints([
  ['2017-12-31', 5138000, '2018-03-23', '0001654954-18-002950'],
  ['2018-12-31', 10380000, '2019-03-14', '0001654954-19-002737'],
  ['2019-12-31', 12900000, '2020-03-24', '0001140361-20-006743'],
  ['2020-12-31', 19119000, '2021-03-01', '0001140361-21-006683'],
  ['2021-12-31', 34207000, '2022-03-01', '0001140361-22-007348'],
  ['2022-12-31', 62226000, '2023-03-02', '0001140361-23-009508'],
  ['2023-12-31', 92709000, '2024-02-28', '0001680062-24-000008'],
  ['2024-12-31', 105473000, '2025-03-03', '0001680062-25-000003'],
  ['2025-12-31', 144989000, '2026-03-02', '0001628280-26-013231']
]);

export const formfactorRdPoints = rdPoints([
  ['2011-12-31', 43544000, '2012-02-21', '0001039399-12-000006'],
  ['2012-12-29', 40130000, '2013-03-13', '0001445305-13-000585'],
  ['2013-12-28', 42139000, '2014-03-07', '0001039399-14-000007'],
  ['2014-12-27', 42725000, '2015-03-06', '0001039399-15-000005'],
  ['2015-12-26', 44184000, '2016-03-04', '0001039399-16-000037'],
  ['2016-12-31', 57453000, '2017-03-15', '0001039399-17-000009'],
  ['2017-12-30', 73807000, '2018-02-27', '0001039399-18-000014'],
  ['2018-12-29', 74976000, '2019-02-26', '0001039399-19-000010'],
  ['2019-12-28', 81499000, '2020-02-21', '0001039399-20-000011'],
  ['2020-12-26', 89034000, '2021-02-22', '0001039399-21-000009'],
  ['2021-12-25', 100937000, '2022-02-18', '0001039399-22-000014'],
  ['2022-12-31', 109222000, '2023-02-24', '0001039399-23-000010'],
  ['2023-12-30', 115765000, '2024-02-23', '0001039399-24-000007'],
  ['2024-12-28', 121938000, '2025-02-21', '0001039399-25-000023'],
  ['2025-12-27', 115682000, '2026-02-20', '0001039399-26-000009']
]);

export const amkorRdPoints = rdPoints([
  ['2010-12-31', 47534000, '2011-02-24', '0000950123-11-017901'],
  ['2011-12-31', 50386000, '2012-02-24', '0001445305-12-000428'],
  ['2012-12-31', 54118000, '2013-03-08', '0001047127-13-000007'],
  ['2013-12-31', 64625000, '2014-02-28', '0001047127-14-000006'],
  ['2014-12-31', 76864000, '2015-02-19', '0001047127-15-000010'],
  ['2015-12-31', 82017000, '2016-02-22', '0001047127-16-000049'],
  ['2018-12-31', 157182000, '2019-02-22', '0001047127-19-000007'],
  ['2019-12-31', 137638000, '2020-02-19', '0001047127-20-000006'],
  ['2020-12-31', 140727000, '2021-02-19', '0001047127-21-000010'],
  ['2021-12-31', 166037000, '2022-02-18', '0001047127-22-000006'],
  ['2022-12-31', 149429000, '2023-02-22', '0001047127-23-000009'],
  ['2023-12-31', 177473000, '2024-02-16', '0001047127-24-000019'],
  ['2024-12-31', 162951000, '2025-02-21', '0001047127-25-000030'],
  ['2025-12-31', 166743000, '2026-02-20', '0001047127-26-000014']
]);

export const klaRdPoints = rdPoints([
  ['2011-06-30', 386163000, '2011-08-05', '0001445305-11-002394'],
  ['2012-06-30', 452937000, '2012-08-06', '0000319201-12-000008'],
  ['2013-06-30', 487832000, '2013-08-08', '0000319201-13-000033'],
  ['2014-06-30', 539469000, '2014-08-08', '0000319201-14-000038'],
  ['2015-06-30', 530616000, '2015-08-07', '0000319201-15-000053'],
  ['2016-06-30', 481258000, '2016-08-05', '0000319201-16-000090'],
  ['2019-06-30', 711030000, '2019-08-16', '0000319201-19-000031'],
  ['2020-06-30', 863864000, '2020-08-10', '0000319201-20-000047'],
  ['2021-06-30', 928487000, '2021-08-06', '0000319201-21-000029'],
  ['2022-06-30', 1105254000, '2022-08-05', '0000319201-22-000023'],
  ['2023-06-30', 1296727000, '2023-08-04', '0000319201-23-000031'],
  ['2024-06-30', 1278981000, '2024-08-05', '0000319201-24-000021'],
  ['2025-06-30', 1360334000, '2025-08-08', '0000319201-25-000024'],
  ['2026-06-30', 1532118000, '2026-08-06', '0000319201-26-000027']
]);

function rdFigure(chart, lang, points, unit) {
  const en = lang === 'en';
  const hasStart = points.some(point => point.start);
  const startLabel = en ? 'Period start' : '期初';
  const endLabel = en ? 'Period end' : '期末';
  const valueLabel = en ? chart.valueEn : chart.valueZh;
  const filedLabel = en ? 'Annual report filed' : '年報申報日';
  const rows = points.map(point => {
    const lead = hasStart
      ? `<th scope="row">${point.start}</th><td>${point.end}</td>`
      : `<th scope="row">${point.end}</th>`;
    return `<tr>${lead}<td>${point.valueText}</td><td>${point.filed}</td><td>${point.accn}</td></tr>`;
  }).join('');
  const head = hasStart
    ? `<th scope="col">${startLabel}</th><th scope="col">${endLabel}</th>`
    : `<th scope="col">${endLabel}</th>`;
  return `<figure class="sourced-chart" id="chart-${chart.id}">
    <figcaption>
      <span class="sourced-badge">${en ? 'Published data' : '公開數據'}</span>
      <span class="figure-caption">${esc(en ? chart.titleEn : chart.titleZh)}</span>
      <span class="figure-source">${esc(en ? chart.noteEn : chart.noteZh)}</span>
      <span class="figure-source"><a href="${esc(chart.url)}" rel="noopener noreferrer">SEC Company Facts JSON</a></span>
      <span class="sourced-url">${esc(chart.url)}</span>
      <span class="figure-source">${esc(en ? chart.locatorEn : chart.locatorZh)}</span>
    </figcaption>
    <div class="sourced-plot" aria-hidden="true">
      <p class="sourced-plot-title">${esc(valueLabel)}</p>
      ${bars(points, 'value', 'valueText', unit)}
    </div>
    <div class="table-container">
      <table class="semi-table sourced-data-table">
        <caption>${esc(en ? chart.titleEn : chart.titleZh)}</caption>
        <thead><tr>${head}<th scope="col">${esc(valueLabel)}</th><th scope="col">${filedLabel}</th><th scope="col">accession</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="figure-source">${esc(en ? chart.footnoteEn : chart.footnoteZh)}</p>
  </figure>`;
}

export const SOURCED_CHARTS = [
  {
    id: 'semi-wafer-shipments',
    chapterId: 'ch03',
    headingZh: '晶圓尺寸',
    headingEn: 'Wafer sizes',
    titleZh: '全球矽晶圓出貨面積與營收',
    titleEn: 'Worldwide silicon wafer shipments and revenue',
    noteZh: '這張表是出貨面積與營收，不是晶圓直徑。數字只取自下面這張表，沒有把增減百分比再算一次。',
    noteEn: 'This table is shipment area and revenue, not wafer diameter. The numbers are copied from the cited table, with no recalculated percentages.',
    url: WAFER_URL,
    locatorZh: 'SEMI Silicon Manufacturers Group 年終分析，2025 年 2 月。表格名稱 Annual Silicon* Industry Trends。Source: SEMI (www.semi.org), February 2025。這份 SEMI 新聞稿由 PR Newswire 刊出，上列網址回傳這張表。',
    locatorEn: 'SEMI Silicon Manufacturers Group year-end analysis, February 2025. Table name: Annual Silicon* Industry Trends. Source line: SEMI (www.semi.org), February 2025. This SEMI release is published on PR Newswire, and the URL above returns that table.',
    footnoteZh: '新聞稿註記：數據包含晶圓廠商出給終端使用者的拋光矽晶圓（含全新測試晶圓）、磊晶矽晶圓，以及未拋光矽晶圓。只計半導體用途，不含太陽能。',
    footnoteEn: 'Release note: the data include polished silicon wafers, including virgin test wafers, epitaxial silicon wafers, and non-polished silicon wafers shipped by wafer manufacturers to end users. Shipments are for semiconductor applications only and do not include solar applications.',
    render(lang) {
      const en = lang === 'en';
      const areaLabel = en ? 'Area shipments (million square inches)' : '出貨面積（百萬平方英吋）';
      const revenueLabel = en ? 'Revenue (US$ billion)' : '營收（十億美元）';
      const yearLabel = en ? 'Year' : '年';
      const rows = waferPoints.map(point => `<tr><th scope="row">${point.year}</th><td>${point.areaText}</td><td>${point.revenueText}</td></tr>`).join('');
      return `<figure class="sourced-chart" id="chart-${this.id}">
        <figcaption>
          <span class="sourced-badge">${en ? 'Published data' : '公開數據'}</span>
          <span class="figure-caption">${esc(en ? this.titleEn : this.titleZh)}</span>
          <span class="figure-source">${esc(en ? this.noteEn : this.noteZh)}</span>
          <span class="figure-source"><a href="${esc(this.url)}" rel="noopener noreferrer">${en ? 'SEMI release on PR Newswire' : 'SEMI 新聞稿（PR Newswire）'}</a></span>
          <span class="sourced-url">${esc(this.url)}</span>
          <span class="figure-source">${esc(en ? this.locatorEn : this.locatorZh)}</span>
        </figcaption>
        <div class="sourced-plot" aria-hidden="true">
          <p class="sourced-plot-title">${esc(areaLabel)}</p>
          ${bars(waferPoints, 'areaValue', 'areaText', en ? 'MSI' : '百萬平方英吋')}
          <p class="sourced-plot-title">${esc(revenueLabel)}</p>
          ${bars(waferPoints, 'revenueValue', 'revenueText', en ? 'US$ billion' : '十億美元')}
        </div>
        <div class="table-container">
          <table class="semi-table sourced-data-table">
            <caption>${esc(en ? this.titleEn : this.titleZh)}</caption>
            <thead><tr><th scope="col">${yearLabel}</th><th scope="col">${esc(areaLabel)}</th><th scope="col">${esc(revenueLabel)}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p class="figure-source">${esc(en ? this.footnoteEn : this.footnoteZh)}</p>
      </figure>`;
    }
  },
  {
    id: 'tsmc-ppe-purchases',
    chapterId: 'ch01',
    headingZh: '機台：工廠的主角',
    headingEn: 'Tools: the stars of the fab',
    titleZh: '台積電購置不動產、廠房及設備付出的現金',
    titleEn: 'Cash TSMC paid to acquire property, plant and equipment',
    noteZh: '這是合併報表現金流量表上的購置金額，單位是美元。它不是單一機台的價格，也不是另一套名為資本支出的口徑。',
    noteEn: 'This is the consolidated cash-flow amount paid to acquire property, plant and equipment, in US dollars. It is not the price of one tool, and it is not a different figure labeled capital expenditure.',
    url: TSMC_URL,
    locatorZh: 'SEC Company Facts，CIK 0001046179。路徑 facts.ifrs-full.PurchaseOfPropertyPlantAndEquipmentClassifiedAsInvestingActivities.units.USD。只取 form 為 20-F、fp 為 FY 的列。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0001046179. Path: facts.ifrs-full.PurchaseOfPropertyPlantAndEquipmentClassifiedAsInvestingActivities.units.USD. Only rows with form 20-F and fp FY are used. The amount, filing date, and accession are in the table.',
    fxNoteZh: '台積電以新台幣編製報表。表上的美元是各年 20-F 依年底匯率做的方便換算，年與年的變化有一部分來自匯率。',
    fxNoteEn: 'TSMC reports in NT dollars. The US dollar amounts are the 20-F convenience translations at each year-end exchange rate, so year-over-year changes partly reflect currency moves.',
    render(lang) {
      const en = lang === 'en';
      const yearLabel = en ? 'Fiscal year' : '會計年度';
      const usdLabel = en ? 'US dollars' : '美元';
      const filedLabel = en ? '20-F filed' : '20-F 申報日';
      const rows = ppePoints.map(point => `<tr><th scope="row">${point.year}</th><td>${point.usdText}</td><td>${point.filed}</td><td>${point.accn}</td></tr>`).join('');
      return `<figure class="sourced-chart" id="chart-${this.id}">
        <figcaption>
          <span class="sourced-badge">${en ? 'Published data' : '公開數據'}</span>
          <span class="figure-caption">${esc(en ? this.titleEn : this.titleZh)}</span>
          <span class="figure-source">${esc(en ? this.noteEn : this.noteZh)}</span>
          <span class="figure-source"><a href="${esc(this.url)}" rel="noopener noreferrer">${en ? 'SEC Company Facts JSON' : 'SEC Company Facts JSON'}</a></span>
          <span class="sourced-url">${esc(this.url)}</span>
          <span class="figure-source">${esc(en ? this.locatorEn : this.locatorZh)}</span>
        </figcaption>
        <div class="sourced-plot" aria-hidden="true">
          <p class="sourced-plot-title">${esc(usdLabel)}</p>
          ${bars(ppePoints, 'usd', 'usdText', 'USD')}
        </div>
        <div class="table-container">
          <table class="semi-table sourced-data-table">
            <caption>${esc(en ? this.titleEn : this.titleZh)}</caption>
            <thead><tr><th scope="col">${yearLabel}</th><th scope="col">${esc(usdLabel)}</th><th scope="col">${filedLabel}</th><th scope="col">accession</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p class="figure-source">${esc(en ? this.fxNoteEn : this.fxNoteZh)}</p>
      </figure>`;
    }
  },
  {
    id: 'wsts-worldwide-billings',
    chapterId: 'ch00',
    headingZh: '誰負責什麼：半導體產業的分工',
    headingEn: 'Who does what: how the industry divides the work',
    titleZh: 'WSTS 全球半導體帳單金額（完整年度）',
    titleEn: 'WSTS worldwide semiconductor billings, full years',
    noteZh: '這是 WSTS Blue Book 的全球帳單金額，不是晶圓廠產能，也不是某一家公司的營收。單位沿用試算表寫的 1000 US$（千美元）。表上的整數就是 Total Year 儲存格，沒有改成十億美元，也沒有把各月再加一次。',
    noteEn: 'These are WSTS Blue Book worldwide billings, not fab capacity and not one company’s revenue. The unit is the workbook’s 1000 US$. Each integer is the Total Year cell, not a conversion into billions and not a sum of the months.',
    url: WSTS_PAGE,
    fileUrl: WSTS_XLSX,
    locatorZh: '頁面 Historical Billings Report 上的免費檔 WSTS-Historical-Billings-Report-Aug_2026.xlsx。工作表 Monthly Data。第 3 列寫 All numbers are in 1000 US$. 第 4 列的 Total Year 是第 14 欄（欄名 N）。每一列的列名是 Worldwide。只收 December 有數字的年度：1986 到 2025。',
    locatorEn: 'Free file WSTS-Historical-Billings-Report-Aug_2026.xlsx on the Historical Billings Report page. Sheet: Monthly Data. Row 3 says All numbers are in 1000 US$. Row 4 names Total Year in column 14 (column N). Each row label is Worldwide. Only years with a December value are included: 1986 through 2025.',
    footnoteZh: '同一檔還有 2026 年的列，但 December 是空的，Total Year 不是完整年度，所以沒有畫進來。3MMA 工作表是三個月移動平均，這張圖不用那一張。',
    footnoteEn: 'The same file has 2026 rows, but December is empty, so that Total Year is not a full year and is left out. The 3MMA sheet is a three-month moving average and is not used here.',
    render(lang) {
      const en = lang === 'en';
      const yearLabel = en ? 'Year' : '年';
      const cellLabel = en ? 'Cell' : '儲存格';
      const valueLabel = en ? 'Thousands of US dollars' : '千美元';
      const rows = wstsWorldwidePoints.map(point => `<tr><th scope="row">${point.year}</th><td>${point.cell}</td><td>${point.usdText}</td></tr>`).join('');
      return `<figure class="sourced-chart" id="chart-${this.id}">
        <figcaption>
          <span class="sourced-badge">${en ? 'Published data' : '公開數據'}</span>
          <span class="figure-caption">${esc(en ? this.titleEn : this.titleZh)}</span>
          <span class="figure-source">${esc(en ? this.noteEn : this.noteZh)}</span>
          <span class="figure-source"><a href="${esc(this.url)}" rel="noopener noreferrer">${en ? 'WSTS Historical Billings Report' : 'WSTS Historical Billings Report'}</a></span>
          <span class="sourced-url">${esc(this.url)}</span>
          <span class="figure-source"><a href="${esc(this.fileUrl)}" rel="noopener noreferrer">${en ? 'Workbook .xlsx' : '試算表 .xlsx'}</a></span>
          <span class="sourced-url">${esc(this.fileUrl)}</span>
          <span class="figure-source">${esc(en ? this.locatorEn : this.locatorZh)}</span>
        </figcaption>
        <div class="sourced-plot" aria-hidden="true">
          <p class="sourced-plot-title">${esc(valueLabel)}</p>
          ${bars(wstsWorldwidePoints, 'usdValue', 'usdText', en ? 'US$ thousand' : '千美元')}
        </div>
        <div class="table-container">
          <table class="semi-table sourced-data-table">
            <caption>${esc(en ? this.titleEn : this.titleZh)}</caption>
            <thead><tr><th scope="col">${yearLabel}</th><th scope="col">${cellLabel}</th><th scope="col">${esc(valueLabel)}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p class="figure-source">${esc(en ? this.footnoteEn : this.footnoteZh)}</p>
      </figure>`;
    }
  },
  {
    id: 'wsts-region-billings',
    chapterId: 'ch00',
    headingZh: '價值鏈與 Foundry 2.0 條例總覽',
    headingEn: 'Value Chain & Foundry 2.0 Clauses',
    titleZh: 'WSTS 各地區半導體帳單金額（2024 與 2025）',
    titleEn: 'WSTS semiconductor billings by region, 2024 and 2025',
    noteZh: '地區名稱沿用試算表的列名。這是帳單地區，不是晶圓廠所在地，也不是產能占比。2024 年四區相加等於 Worldwide 儲存格 N238；2025 年四區相加等於 N244。',
    noteEn: 'Region names are the workbook row labels. These are billing regions, not fab locations and not capacity share. The four 2024 regions add up to the Worldwide cell N238; the four 2025 regions add up to N244.',
    url: WSTS_PAGE,
    fileUrl: WSTS_XLSX,
    locatorZh: '同一份 WSTS-Historical-Billings-Report-Aug_2026.xlsx，工作表 Monthly Data，Total Year 欄（第 14 欄，欄名 N）。列名是 Americas、Europe、Japan、Asia Pacific。單位是 1000 US$。只列 December 有數字、而且四區相加等於 Worldwide 的 2024 與 2025。',
    locatorEn: 'The same WSTS-Historical-Billings-Report-Aug_2026.xlsx, sheet Monthly Data, Total Year column (column 14, column N). Row labels: Americas, Europe, Japan, Asia Pacific. Unit: 1000 US$. Only 2024 and 2025 are shown: December is filled in, and the four regions add up to Worldwide.',
    render(lang) {
      const en = lang === 'en';
      const yearLabel = en ? 'Year' : '年';
      const regionLabel = en ? 'Row label' : '列名';
      const cellLabel = en ? 'Cell' : '儲存格';
      const valueLabel = en ? 'Thousands of US dollars' : '千美元';
      const rows = wstsRegionPoints.map(point => `<tr><th scope="row">${point.year}</th><td>${esc(point.region)}</td><td>${point.cell}</td><td>${point.usdText}</td></tr>`).join('');
      return `<figure class="sourced-chart" id="chart-${this.id}">
        <figcaption>
          <span class="sourced-badge">${en ? 'Published data' : '公開數據'}</span>
          <span class="figure-caption">${esc(en ? this.titleEn : this.titleZh)}</span>
          <span class="figure-source">${esc(en ? this.noteEn : this.noteZh)}</span>
          <span class="figure-source"><a href="${esc(this.url)}" rel="noopener noreferrer">${en ? 'WSTS Historical Billings Report' : 'WSTS Historical Billings Report'}</a></span>
          <span class="sourced-url">${esc(this.url)}</span>
          <span class="figure-source"><a href="${esc(this.fileUrl)}" rel="noopener noreferrer">${en ? 'Workbook .xlsx' : '試算表 .xlsx'}</a></span>
          <span class="sourced-url">${esc(this.fileUrl)}</span>
          <span class="figure-source">${esc(en ? this.locatorEn : this.locatorZh)}</span>
        </figcaption>
        <div class="sourced-plot" aria-hidden="true">
          <p class="sourced-plot-title">${esc(valueLabel)}</p>
          ${bars(wstsRegionPoints, 'usdValue', 'usdText', en ? 'US$ thousand' : '千美元', 'barLabel')}
        </div>
        <div class="table-container">
          <table class="semi-table sourced-data-table">
            <caption>${esc(en ? this.titleEn : this.titleZh)}</caption>
            <thead><tr><th scope="col">${yearLabel}</th><th scope="col">${regionLabel}</th><th scope="col">${cellLabel}</th><th scope="col">${esc(valueLabel)}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </figure>`;
    }
  },
  {
    id: 'asml-rd-expense',
    chapterId: 'ch04',
    headingZh: 'EUV：最先進的微影',
    headingEn: 'EUV: the most advanced lithography',
    titleZh: 'ASML 研究發展費用',
    titleEn: 'ASML research and development expense',
    noteZh: '這是 ASML 合併損益表的研究發展費用，單位是歐元。它不是一台 EUV 曝光機的售價，也不是晶圓廠的微影成本。',
    noteEn: 'This is ASML’s consolidated research and development expense, in euros. It is not the price of one EUV scanner, and it is not a fab’s lithography cost.',
    url: ASML_URL,
    valueZh: '歐元',
    valueEn: 'Euros',
    locatorZh: 'SEC Company Facts，CIK 0000937966，ASML HOLDING NV。路徑 facts.us-gaap.ResearchAndDevelopmentExpense.units.EUR。只取 form 為 20-F、fp 為 FY，而且 fy 等於該列期末年度的那一筆。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0000937966, ASML HOLDING NV. Path: facts.us-gaap.ResearchAndDevelopmentExpense.units.EUR. Only the row with form 20-F, fp FY, and fy equal to the period-end year is used. The amount, filing date, and accession are in the table.',
    footnoteZh: '2011 到 2013 是該年自己的 20-F 全年列，較晚 20-F 的比較欄金額相同，所以畫進來。2014 只出現在該年自己的 20-F，較晚的 20-F 沒有這一列，圖上仍用當年那一份。2015 與 2016 在這份 Company Facts 沒有這個科目的全年列。2017 與 2018 只出現在較晚 20-F 的比較欄，沒有 fy 等於該年的 20-F，所以不畫。表上 2014 的下一列是 2019。',
    footnoteEn: '2011 through 2013 are that year’s own 20-F full-year rows, and the comparative columns in later 20-Fs show the same amounts, so they are included. 2014 appears only in that year’s own 20-F. Later 20-Fs do not repeat that row, and the chart still uses the 2014 filing. 2015 and 2016 have no full-year row for this concept in this Company Facts file. 2017 and 2018 appear only as comparative columns in a later 20-F, with no 20-F whose fy equals that year, so they are left out. The row after 2014 is 2019.',
    render(lang) {
      return rdFigure(this, lang, asmlRdPoints, 'EUR');
    }
  },
  {
    id: 'lam-rd-expense',
    chapterId: 'ch06',
    headingZh: '電漿：蝕刻的工具',
    headingEn: 'Plasma: the etching tool',
    titleZh: 'Lam Research 研究發展費用',
    titleEn: 'Lam Research research and development expense',
    noteZh: '這是 Lam Research 合併損益表的研究發展費用，單位是美元。它不是一台蝕刻機的售價。會計年度在 6 月結束，表上的日期是期末，不是日曆年 12 月 31 日。',
    noteEn: 'This is Lam Research’s consolidated research and development expense, in US dollars. It is not the price of one etch tool. The fiscal year ends in June. The date in the table is the period end, not calendar 31 December.',
    url: LAM_URL,
    valueZh: '美元',
    valueEn: 'US dollars',
    locatorZh: 'SEC Company Facts，CIK 0000707549，LAM RESEARCH CORPORATION。路徑 facts.us-gaap.ResearchAndDevelopmentExpense.units.USD。只取 form 為 10-K、fp 為 FY，而且 fy 等於該列期末年度的那一筆。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0000707549, LAM RESEARCH CORPORATION. Path: facts.us-gaap.ResearchAndDevelopmentExpense.units.USD. Only the row with form 10-K, fp FY, and fy equal to the period-end year is used. The amount, filing date, and accession are in the table.',
    footnoteZh: '同一年度若在較晚的 10-K 又出現一次，金額與這裡相同。表上用的是該會計年度自己的 10-K。',
    footnoteEn: 'Where a later 10-K repeats the same year, the amount matches the row shown here. The table uses that fiscal year’s own 10-K.',
    render(lang) {
      return rdFigure(this, lang, lamRdPoints, 'USD');
    }
  },
  {
    id: 'tsmc-rd-expense',
    chapterId: 'ch14',
    headingZh: '微縮不只靠製程',
    headingEn: 'Scaling is not only about the process',
    titleZh: '台積電研究發展費用',
    titleEn: 'TSMC research and development expense',
    noteZh: '這是台積電合併損益表的研究發展費用，單位是新台幣。它不是某一奈米節點的成本，也不是 20-F 另做的美元方便換算。',
    noteEn: 'This is TSMC’s consolidated research and development expense, in NT dollars. It is not the cost of one nanometer node, and it is not the 20-F convenience translation into US dollars.',
    url: TSMC_URL,
    valueZh: '新台幣',
    valueEn: 'NT dollars',
    locatorZh: 'SEC Company Facts，CIK 0001046179。路徑 facts.ifrs-full.ResearchAndDevelopmentExpense.units.TWD。只取 form 為 20-F、fp 為 FY，而且 fy 等於該列期末年度的那一筆。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0001046179. Path: facts.ifrs-full.ResearchAndDevelopmentExpense.units.TWD. Only the row with form 20-F, fp FY, and fy equal to the period-end year is used. The amount, filing date, and accession are in the table.',
    footnoteZh: '2016 年只出現在較晚 20-F 的比較欄，所以這張圖從 2017 年那份 20-F 起算。美元列沒有畫進來。',
    footnoteEn: '2016 appears only as a comparative column in a later 20-F, so the chart starts with the 2017 20-F. The US dollar rows are not shown.',
    render(lang) {
      return rdFigure(this, lang, tsmcRdPoints, 'TWD');
    }
  },
  {
    id: 'amat-rd-expense',
    chapterId: 'ch05',
    headingZh: '為什麼需要薄膜',
    headingEn: 'Why thin films are needed',
    titleZh: 'Applied Materials 研究發展費用',
    titleEn: 'Applied Materials research and development expense',
    noteZh: '這是 Applied Materials 合併損益表的研究發展費用，單位是美元。它不是一台 CVD、PVD 或 ALD 機台的售價。這家公司也賣薄膜以外的設備，數字是整家公司的，沒有拆成薄膜部門。會計年度在 10 月結束，表上的日期是期末。',
    noteEn: 'This is Applied Materials’ consolidated research and development expense, in US dollars. It is not the price of one CVD, PVD, or ALD tool. The company also sells equipment outside thin films, and this figure is for the whole company, not a thin-film segment. The fiscal year ends in October. The date in the table is the period end.',
    url: AMAT_URL,
    valueZh: '美元',
    valueEn: 'US dollars',
    locatorZh: 'SEC Company Facts，CIK 0000006951，APPLIED MATERIALS INC /DE。路徑 facts.us-gaap.ResearchAndDevelopmentExpense.units.USD。只取 form 為 10-K、fp 為 FY、fy 等於該列期末年度，而且期初到期末至少 300 天的那一筆。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0000006951, APPLIED MATERIALS INC /DE. Path: facts.us-gaap.ResearchAndDevelopmentExpense.units.USD. Only the row with form 10-K, fp FY, fy equal to the period-end year, and a start-to-end span of at least 300 days is used. The amount, filing date, and accession are in the table.',
    footnoteZh: '2017 年當年 10-K 是 1,774,000,000 美元（申報日 2017-12-15，accession 0000006951-17-000038），2019 年 10-K 的比較欄是 1,781,000,000 美元（申報日 2019-12-13，accession 0000006951-19-000046）。2018 年當年 10-K 是 2,019,000,000 美元（申報日 2018-12-13，accession 0000006951-18-000041），2019 年 10-K 與 2020 年 10-K 的比較欄是 2,022,000,000 美元（2020 年那份申報日 2020-12-11，accession 0000006951-20-000048）。這兩年兩套數字不一樣，所以不畫。2009 年當年 10-K 是 934,115,000 美元（申報日 2009-12-11，accession 0000950123-09-070205），較晚的 10-K 寫成 934,000,000。2010 年當年 10-K 是 1,143,521,000 美元（申報日 2010-12-10，accession 0000950123-10-112754），較晚的 10-K 寫成 1,143,000,000。整數對不上，所以 2009 與 2010 也不畫。表上 2016 的下一列是 2019。',
    footnoteEn: 'The fiscal 2017 10-K reports 1,774,000,000 US dollars (filed 2017-12-15, accession 0000006951-17-000038). The comparative column in the fiscal 2019 10-K reports 1,781,000,000 (filed 2019-12-13, accession 0000006951-19-000046). The fiscal 2018 10-K reports 2,019,000,000 (filed 2018-12-13, accession 0000006951-18-000041). The comparative columns in the fiscal 2019 and fiscal 2020 10-Ks report 2,022,000,000 (the fiscal 2020 filing date is 2020-12-11, accession 0000006951-20-000048). Those two years disagree, so they are left out. The fiscal 2009 10-K reports 934,115,000 (filed 2009-12-11, accession 0000950123-09-070205); a later 10-K prints 934,000,000. The fiscal 2010 10-K reports 1,143,521,000 (filed 2010-12-10, accession 0000950123-10-112754); a later 10-K prints 1,143,000,000. The integers do not match, so 2009 and 2010 are left out too. The row after 2016 is 2019.',
    render(lang) {
      return rdFigure(this, lang, amatRdPoints, 'USD');
    }
  },
  {
    id: 'axcelis-rd-expense',
    chapterId: 'ch07',
    headingZh: '佈植機怎麼運作',
    headingEn: 'How an implanter works',
    titleZh: 'Axcelis 研究發展費用',
    titleEn: 'Axcelis research and development expense',
    noteZh: '這是 Axcelis Technologies 合併損益表的研究發展費用，單位是美元。它不是一台離子佈植機的售價。會計年度在 12 月 31 日結束。',
    noteEn: 'This is Axcelis Technologies’ consolidated research and development expense, in US dollars. It is not the price of one ion implanter. The fiscal year ends on 31 December.',
    url: AXCELIS_URL,
    valueZh: '美元',
    valueEn: 'US dollars',
    locatorZh: 'SEC Company Facts，CIK 0001113232，AXCELIS TECHNOLOGIES INC。路徑 facts.us-gaap.ResearchAndDevelopmentExpense.units.USD。只取 form 為 10-K、fp 為 FY、fy 等於該列期末年度，而且期初到期末至少 300 天的那一筆。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0001113232, AXCELIS TECHNOLOGIES INC. Path: facts.us-gaap.ResearchAndDevelopmentExpense.units.USD. Only the row with form 10-K, fp FY, fy equal to the period-end year, and a start-to-end span of at least 300 days is used. The amount, filing date, and accession are in the table.',
    footnoteZh: '2014 年沒有 fy 等於 2014 的 10-K 全年列。Company Facts 裡當年的全年列是 10-K/A，金額 33,533,000 美元，期末 2014-12-31，申報日 2015-03-12，accession 0001047469-15-002063。較晚的 10-K 比較欄是同一個金額（fy 為 2015 的 10-K，申報日 2016-03-04，accession 0001047469-16-010788），但那不是 2014 年自己的 10-K。這張圖只收 10-K，所以 2014 不畫。表上 2013 的下一列是 2015。',
    footnoteEn: '2014 has no 10-K full-year row whose fy equals 2014. The full-year row for that year in Company Facts is a 10-K/A: 33,533,000 US dollars, period end 2014-12-31, filed 2015-03-12, accession 0001047469-15-002063. A later 10-K comparative column shows the same amount (the 10-K with fy 2015, filed 2016-03-04, accession 0001047469-16-010788), but that is not 2014’s own 10-K. This chart uses only 10-K rows, so 2014 is left out. The row after 2013 is 2015.',
    render(lang) {
      return rdFigure(this, lang, axcelisRdPoints, 'USD');
    }
  },
  {
    id: 'micron-contract-revenue',
    chapterId: 'ch13',
    headingZh: '記憶體和邏輯晶片有什麼不同',
    headingEn: 'How memory differs from logic',
    titleZh: 'Micron 來自客戶合約的收入',
    titleEn: 'Micron revenue from contracts with customers',
    noteZh: '這是 Micron Technology 合併報表的來自客戶合約的收入，不含稅，單位是美元。它把 DRAM、NAND 與其他產品合在一起，不是單列 DRAM，也不是單列 NAND，更不是每一顆位元的價格。會計年度在 8 月底或 9 月初結束，不是日曆年 12 月 31 日。',
    noteEn: 'This is Micron Technology’s consolidated revenue from contracts with customers, excluding assessed tax, in US dollars. It combines DRAM, NAND, and other products. It is not DRAM alone, not NAND alone, and not a price per bit. The fiscal year ends in late August or early September, not on calendar 31 December.',
    url: MICRON_URL,
    valueZh: '美元',
    valueEn: 'US dollars',
    locatorZh: 'SEC Company Facts，CIK 0000723125，Micron Technology, Inc.。路徑 facts.us-gaap.RevenueFromContractWithCustomerExcludingAssessedTax.units.USD。只取 form 為 10-K、fp 為 FY、fy 等於期末年度，而且期初到期末至少 300 天的那一筆。期初、期末、金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0000723125, Micron Technology, Inc. Path: facts.us-gaap.RevenueFromContractWithCustomerExcludingAssessedTax.units.USD. Only the row with form 10-K, fp FY, fy equal to the period-end year, and a start-to-end span of at least 300 days is used. The period start, period end, amount, filing date, and accession are in the table.',
    footnoteZh: '同一期末若還有一筆約 90 天、而且也被標成 fp FY 的金額，那是季度數，沒有採用。2018 會計年度在這個科目沒有 fy 等於 2018 的 10-K 全年列，只出現在較晚 10-K 的比較欄，所以表從 2019 會計年度起。更早的年度用的是別的 XBRL 科目，沒有混進來。',
    footnoteEn: 'Where the same period end also has an amount of about 90 days that is tagged fp FY, that amount is a quarter and is not used. Fiscal 2018 has no 10-K full-year row for this concept whose fy equals 2018. It appears only as a comparative column in a later 10-K, so the table starts with fiscal 2019. Earlier years use a different XBRL concept and are not mixed in.',
    render(lang) {
      return rdFigure(this, lang, micronRevenuePoints, 'USD');
    }
  },
  {
    id: 'kla-rd-expense',
    chapterId: 'ch15',
    headingZh: '量測與檢測不一樣',
    headingEn: 'Metrology and inspection are not the same',
    titleZh: 'KLA 研究發展費用',
    titleEn: 'KLA research and development expense',
    noteZh: '這是 KLA Corporation 合併損益表的研究發展費用，單位是美元。它不是一台量測機或檢測機的售價，也沒有拆成量測部門與檢測部門。會計年度在 6 月 30 日結束，表上的日期是期末。',
    noteEn: 'This is KLA Corporation’s consolidated research and development expense, in US dollars. It is not the price of one metrology or inspection tool, and it is not split into a metrology segment and an inspection segment. The fiscal year ends on 30 June. The date in the table is the period end.',
    url: KLA_URL,
    valueZh: '美元',
    valueEn: 'US dollars',
    locatorZh: 'SEC Company Facts，CIK 0000319201，KLA Corporation。路徑 facts.us-gaap.ResearchAndDevelopmentExpense.units.USD。只取 form 為 10-K、fp 為 FY、fy 等於該列期末年度，而且期初到期末至少 300 天的那一筆。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0000319201, KLA Corporation. Path: facts.us-gaap.ResearchAndDevelopmentExpense.units.USD. Only the row with form 10-K, fp FY, fy equal to the period-end year, and a start-to-end span of at least 300 days is used. The amount, filing date, and accession are in the table.',
    footnoteZh: '2017 年當年 10-K 是 526,870,000 美元（申報日 2017-08-04，accession 0000319201-17-000034），2019 年 10-K 的比較欄是 526,688,000 美元（申報日 2019-08-16，accession 0000319201-19-000031）。2018 年當年 10-K 是 608,712,000 美元（申報日 2018-08-06，accession 0000319201-18-000045），2019 年與 2020 年 10-K 的比較欄是 608,531,000 美元（2020 年那份申報日 2020-08-10，accession 0000319201-20-000047）。這兩年兩套數字不一樣，所以不畫。表上 2016 的下一列是 2019。',
    footnoteEn: 'The fiscal 2017 10-K reports 526,870,000 US dollars (filed 2017-08-04, accession 0000319201-17-000034). The comparative column in the fiscal 2019 10-K reports 526,688,000 (filed 2019-08-16, accession 0000319201-19-000031). The fiscal 2018 10-K reports 608,712,000 (filed 2018-08-06, accession 0000319201-18-000045). The comparative columns in the fiscal 2019 and fiscal 2020 10-Ks report 608,531,000 (the fiscal 2020 filing date is 2020-08-10, accession 0000319201-20-000047). Those two years disagree, so they are left out. The row after 2016 is 2019.',
    render(lang) {
      return rdFigure(this, lang, klaRdPoints, 'USD');
    }
  },
  {
    id: 'entg-rd-expense',
    chapterId: 'ch08',
    headingZh: 'CMP 怎麼運作',
    headingEn: 'How CMP works',
    titleZh: 'Entegris 研究發展費用',
    titleEn: 'Entegris research and development expense',
    noteZh: '這是 Entegris 合併損益表的研究發展費用，單位是美元。它不是一片研磨墊或研磨液的價格。年報把 CMP 研磨液與研磨墊放在材料部門，另外還有過濾與污染控制部門，這張圖是整家公司的費用，沒有拆成 CMP。會計年度在 12 月 31 日結束。',
    noteEn: 'This is Entegris’ consolidated research and development expense, in US dollars. It is not the price of one polishing pad or of slurry. The annual report places CMP slurries and pads in the materials segment and also reports a filtration and contamination-control segment. This figure is the whole company, not a CMP segment. The fiscal year ends on 31 December.',
    url: ENTG_URL,
    valueZh: '美元',
    valueEn: 'US dollars',
    locatorZh: 'SEC Company Facts，CIK 0001101302，Entegris, Inc.。路徑 facts.us-gaap.ResearchAndDevelopmentExpense.units.USD。只取 form 為 10-K、fp 為 FY、fy 等於該列期末年度，而且期初到期末至少 300 天的那一筆。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0001101302, Entegris, Inc. Path: facts.us-gaap.ResearchAndDevelopmentExpense.units.USD. Only the row with form 10-K, fp FY, fy equal to the period-end year, and a start-to-end span of at least 300 days is used. The amount, filing date, and accession are in the table.',
    footnoteZh: '2023 年當年 10-K 是 277,313,000 美元（申報日 2024-02-15，accession 0001101302-24-000009）。2024 年 10-K 的比較欄仍是 277,313,000 美元（申報日 2025-02-12，accession 0001101302-25-000015），2025 年 10-K 的比較欄是 277,300,000 美元（申報日 2026-02-11，accession 0001101302-26-000012）。2024 年當年 10-K 是 316,111,000 美元（申報日 2025-02-12，accession 0001101302-25-000015），2025 年 10-K 的比較欄是 316,100,000 美元（同一份，accession 0001101302-26-000012）。這兩年兩套數字不一樣，所以不畫。表上 2022 的下一列是 2025。',
    footnoteEn: 'The fiscal 2023 10-K reports 277,313,000 US dollars (filed 2024-02-15, accession 0001101302-24-000009). The comparative column in the fiscal 2024 10-K still reports 277,313,000 (filed 2025-02-12, accession 0001101302-25-000015). The comparative column in the fiscal 2025 10-K reports 277,300,000 (filed 2026-02-11, accession 0001101302-26-000012). The fiscal 2024 10-K reports 316,111,000 (filed 2025-02-12, accession 0001101302-25-000015). The comparative column in the fiscal 2025 10-K reports 316,100,000 (same filing, accession 0001101302-26-000012). Those two years disagree, so they are left out. The row after 2022 is 2025.',
    render(lang) {
      return rdFigure(this, lang, entgRdPoints, 'USD');
    }
  },
  {
    id: 'acmr-rd-expense',
    chapterId: 'ch09',
    headingZh: '怎麼洗',
    headingEn: 'How wafers are cleaned',
    titleZh: 'ACM Research 研究發展費用',
    titleEn: 'ACM Research research and development expense',
    noteZh: '這是 ACM Research 合併損益表的研究發展費用，單位是美元。它不是一台清洗機的售價。年報寫目前的業務以濕式清洗、電鍍與先進封裝為主，數字是整家公司的，沒有拆成清洗。會計年度在 12 月 31 日結束。',
    noteEn: 'This is ACM Research’s consolidated research and development expense, in US dollars. It is not the price of one cleaning tool. The annual report says the current business is mainly wet cleaning, plating, and advanced packaging. This figure is the whole company, not a cleaning segment. The fiscal year ends on 31 December.',
    url: ACMR_URL,
    valueZh: '美元',
    valueEn: 'US dollars',
    locatorZh: 'SEC Company Facts，CIK 0001680062，ACM Research, Inc.。路徑 facts.us-gaap.ResearchAndDevelopmentExpense.units.USD。只取 form 為 10-K、fp 為 FY、fy 等於該列期末年度，而且期初到期末至少 300 天的那一筆。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0001680062, ACM Research, Inc. Path: facts.us-gaap.ResearchAndDevelopmentExpense.units.USD. Only the row with form 10-K, fp FY, fy equal to the period-end year, and a start-to-end span of at least 300 days is used. The amount, filing date, and accession are in the table.',
    footnoteZh: '2016 年沒有 fy 等於 2016 的 10-K 全年列，只出現在較晚 10-K 的比較欄：3,259,000 美元，期末 2016-12-31，申報日 2018-03-23，accession 0001654954-18-002950（fy 為 2017 的 10-K）。所以表從 2017 年那份 10-K 起算。同一年度若在較晚的 10-K 又出現一次，金額與這裡相同。表上用的是該會計年度自己的 10-K。',
    footnoteEn: '2016 has no 10-K full-year row whose fy equals 2016. It appears only as a comparative column in a later 10-K: 3,259,000 US dollars, period end 2016-12-31, filed 2018-03-23, accession 0001654954-18-002950 (the 10-K with fy 2017). The table therefore starts with the 2017 10-K. Where a later 10-K repeats a year that is on the chart, the amount matches the row shown here. The table uses that fiscal year’s own 10-K.',
    render(lang) {
      return rdFigure(this, lang, acmrRdPoints, 'USD');
    }
  },
  {
    id: 'formfactor-rd-expense',
    chapterId: 'ch19',
    headingZh: 'CP：一顆一顆測',
    headingEn: 'CP: testing die by die',
    titleZh: 'FormFactor 研究發展費用',
    titleEn: 'FormFactor research and development expense',
    noteZh: '這是 FormFactor 合併損益表的研究發展費用，單位是美元。它不是一張探針卡的售價。年報列的產品有探針卡、分析探針、探針台、溫控系統與低溫系統，數字是整家公司的，沒有拆開。會計年度在 12 月結束，表上的日期是期末，不是每一年的 12 月 31 日。',
    noteEn: 'This is FormFactor’s consolidated research and development expense, in US dollars. It is not the price of one probe card. The annual report lists probe cards, analytical probes, probe stations, thermal systems, and cryogenic systems, and this figure is the whole company, not one product line. The fiscal year ends in December. The date in the table is the period end, not 31 December in every year.',
    url: FORM_URL,
    valueZh: '美元',
    valueEn: 'US dollars',
    locatorZh: 'SEC Company Facts，CIK 0001039399，FormFactor, Inc.。路徑 facts.us-gaap.ResearchAndDevelopmentExpense.units.USD。只取 form 為 10-K、fp 為 FY、fy 等於該列期末年度，而且期初到期末至少 300 天的那一筆。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0001039399, FormFactor, Inc. Path: facts.us-gaap.ResearchAndDevelopmentExpense.units.USD. Only the row with form 10-K, fp FY, fy equal to the period-end year, and a start-to-end span of at least 300 days is used. The amount, filing date, and accession are in the table.',
    footnoteZh: '同一年度若在較晚的 10-K 又出現一次，金額與這裡相同。表上用的是該會計年度自己的 10-K。同一期末若還有一筆約 90 天、而且也被標成 fp FY 的金額，那是季度數，沒有採用。',
    footnoteEn: 'Where a later 10-K repeats the same year, the amount matches the row shown here. The table uses that fiscal year’s own 10-K. Where the same period end also has an amount of about 90 days that is tagged fp FY, that amount is a quarter and is not used.',
    render(lang) {
      return rdFigure(this, lang, formfactorRdPoints, 'USD');
    }
  },
  {
    id: 'amkor-rd-expense',
    chapterId: 'ch20',
    headingZh: '為什麼要封裝',
    headingEn: 'Why chips need packages',
    titleZh: 'Amkor 研究發展費用',
    titleEn: 'Amkor research and development expense',
    noteZh: '這是 Amkor Technology 合併損益表的研究發展費用，單位是美元。它不是一顆封裝的價格。年報把這家公司寫成委外封裝與測試服務，數字含封裝與測試，沒有拆開。會計年度在 12 月 31 日結束。',
    noteEn: 'This is Amkor Technology’s consolidated research and development expense, in US dollars. It is not the price of one package. The annual report describes the company as an outsourced semiconductor packaging and test service provider, and this figure combines packaging and test. The fiscal year ends on 31 December.',
    url: AMKR_URL,
    valueZh: '美元',
    valueEn: 'US dollars',
    locatorZh: 'SEC Company Facts，CIK 0001047127，AMKOR TECHNOLOGY, INC.。路徑 facts.us-gaap.ResearchAndDevelopmentExpense.units.USD。只取 form 為 10-K、fp 為 FY、fy 等於該列期末年度，而且期初到期末至少 300 天的那一筆。金額、申報日與 accession 見下表。',
    locatorEn: 'SEC Company Facts, CIK 0001047127, AMKOR TECHNOLOGY, INC. Path: facts.us-gaap.ResearchAndDevelopmentExpense.units.USD. Only the row with form 10-K, fp FY, fy equal to the period-end year, and a start-to-end span of at least 300 days is used. The amount, filing date, and accession are in the table.',
    footnoteZh: '2016 年當年 10-K 是 117,206,000 美元（申報日 2017-02-24，accession 0001047127-17-000011）。2017 年 10-K 的比較欄仍是 117,206,000 美元（申報日 2018-02-23，accession 0001047127-18-000009），2018 年 10-K 的比較欄是 117,210,000 美元（申報日 2019-02-22，accession 0001047127-19-000007）。2017 年當年 10-K 是 166,614,000 美元（申報日 2018-02-23，accession 0001047127-18-000009）。2018 年與 2019 年 10-K 的比較欄是 166,627,000 美元（2019 年那份申報日 2020-02-19，accession 0001047127-20-000006）。這兩年兩套數字不一樣，所以不畫。表上 2015 的下一列是 2018。',
    footnoteEn: 'The fiscal 2016 10-K reports 117,206,000 US dollars (filed 2017-02-24, accession 0001047127-17-000011). The comparative column in the fiscal 2017 10-K still reports 117,206,000 (filed 2018-02-23, accession 0001047127-18-000009). The comparative column in the fiscal 2018 10-K reports 117,210,000 (filed 2019-02-22, accession 0001047127-19-000007). The fiscal 2017 10-K reports 166,614,000 (filed 2018-02-23, accession 0001047127-18-000009). The comparative columns in the fiscal 2018 and fiscal 2019 10-Ks report 166,627,000 (the fiscal 2019 filing date is 2020-02-19, accession 0001047127-20-000006). Those two years disagree, so they are left out. The row after 2015 is 2018.',
    render(lang) {
      return rdFigure(this, lang, amkorRdPoints, 'USD');
    }
  }
];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function insertSourcedCharts(html, chapterId, lang) {
  let next = String(html);
  const en = lang === 'en';
  for (const chart of SOURCED_CHARTS) {
    if (chart.chapterId !== chapterId) continue;
    const heading = en ? chart.headingEn : chart.headingZh;
    const pattern = new RegExp(`(<h2\\b[^>]*>[\\s\\S]*?${escapeRegExp(heading)}[\\s\\S]*?</h2>)`);
    // 函式型 replacer：圖表內容若含 `$&`、`$1`（例如美元金額）不會被當成替換樣式（見 8D 陷阱 0028）
    next = next.replace(pattern, match => match + chart.render(lang));
  }
  return next;
}
