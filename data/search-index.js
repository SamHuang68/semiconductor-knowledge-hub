/**
 * Route-split search shards. The full text lives in data/search/<id>.js and loads when a search runs.
 */
export const SEARCH_IDS = ["ch00","ch01","ch02","ch03","ch04","ch05","ch06","ch07","ch08","ch09","ch10","ch11","ch12","ch13","ch14","ch15","ch16","ch17","ch18","ch19","ch20","ch21","ch22","ch23","ch24","app-glossary","app-jargon","app-reading"];

let pending = null;

export function loadSearchIndex() {
  if (!pending) {
    pending = Promise.all(SEARCH_IDS.map(id => import(`./search/${id}.js`).then(mod => mod.entry)));
  }
  return pending;
}
