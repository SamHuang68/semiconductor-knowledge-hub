const routes = {
  'ch00': () => import('./engineering/ch00.js'),
  'ch01': () => import('./engineering/ch01.js'),
  'ch02': () => import('./engineering/ch02.js'),
  'ch03': () => import('./engineering/ch03.js'),
  'ch04': () => import('./engineering/ch04.js'),
  'ch05': () => import('./engineering/ch05.js'),
  'ch06': () => import('./engineering/ch06.js'),
  'ch07': () => import('./engineering/ch07.js'),
  'ch08': () => import('./engineering/ch08.js'),
  'ch09': () => import('./engineering/ch09.js'),
  'ch10': () => import('./engineering/ch10.js'),
  'ch11': () => import('./engineering/ch11.js'),
  'ch12': () => import('./engineering/ch12.js'),
  'ch13': () => import('./engineering/ch13.js'),
  'ch14': () => import('./engineering/ch14.js'),
  'ch15': () => import('./engineering/ch15.js'),
  'ch16': () => import('./engineering/ch16.js'),
  'ch17': () => import('./engineering/ch17.js'),
  'ch18': () => import('./engineering/ch18.js'),
  'ch19': () => import('./engineering/ch19.js'),
  'ch20': () => import('./engineering/ch20.js'),
  'ch21': () => import('./engineering/ch21.js'),
  'ch22': () => import('./engineering/ch22.js'),
  'ch23': () => import('./engineering/ch23.js'),
  'ch24': () => import('./engineering/ch24.js'),
  'app-glossary': () => import('./engineering/app-glossary.js'),
  'app-jargon': () => import('./engineering/app-jargon.js'),
  'app-reading': () => import('./engineering/app-reading.js')
};

export async function mountEngineeringObject(chId, container, lang = 'zh') {
  if (!container) return () => {};
  if (container.setAttribute) {
    container.setAttribute('data-ch-id', chId);
    container.setAttribute('data-lang', lang);
  }
  const load = routes[chId];
  if (!load) return () => {};
  const [{ disposeEngineeringObject }, mod] = await Promise.all([
    import('./engineering-object-controls.js'),
    load()
  ]);
  mod.render(container, lang);
  return () => disposeEngineeringObject(container);
}
