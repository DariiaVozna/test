// Перевірка досяжності: пошук у ширину зі справжньою фізикою гри.
// Для кожного рівня шукає, до яких зірочок і скриньок можна дістатися без бонусів (крил, магніту) і без ворогів.
// Запуск з кореня репозиторію: node ednorizhka/src/tools/reach.js [номери рівнів через кому, з 1]
// Приклад: node ednorizhka/src/tools/reach.js 42,46-50
'use strict';
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, '..', 'js');
const order = fs.readFileSync(path.join(__dirname, '..', 'build.sh'), 'utf8').match(/^JS="([^"]+)"/m)[1].split(/\s+/).map(f => f.replace('js/', '')).filter(f => f !== 'ui.js');
let src = order.map(f => fs.readFileSync(path.join(dir, f), 'utf8').replace(/^'use strict';$/m, '')).join('\n');
src += `
var save = { profile: { name: 'Тест', body: 'white', mane: 'rainbow', acc: [], friend: 'none', easy: true }, unlocked: 99, best: {}, bestR: {}, bestF: {}, record: 0 };
var viewW = 600; function showLose() {} function showWin() {} function writeSave() {}
burst = function () {}; floatText = function () {}; bubbles = function () {};
function snap() { const L = G.L, def = G.def; G.L = null; G.def = null; const s = structuredClone(G); G.L = L; G.def = def; s.L = L; s.def = def; return s; }
const ACTS = [];
for (const d of [1, -1]) { ACTS.push({ walk: 0.2, dir: d }); ACTS.push({ walk: 0.5, dir: d }); }
for (const d of [1, -1, 0]) for (const hold of [0.06, 0.16, 0.3, 1]) ACTS.push({ jump: true, dir: d, hold });
for (const d of [1, -1]) { ACTS.push({ jump: true, dir: d, hold: 1, dd: 0.25 }); ACTS.push({ jump: true, dir: d, hold: 1, back: 0.3 }); }
ACTS.push({ wait: 0.7 }); ACTS.push({ wait: 1.6 });
for (const d of [1, -1, 0]) ACTS.push({ swim: true, dir: d });
ACTS.push({ climb: true });
for (const d of [1, -1]) ACTS.push({ big: true, dir: d });
function act(a) {
  const P = G.P, h0 = P.hearts; let t = 0, left = false;
  const T_MAX = a.wait || (a.swim ? 1.1 : a.climb ? 2 : a.big ? 1.1 : 2.6);
  while (t < T_MAX) {
    In.left = In.right = In.jumpP = In.shootP = In.shootR = In.shoot = false; In.jump = false;
    let d = a.dir || 0; if (a.dd && t < a.dd) d = 0; if (a.back && t > a.back) d = -d;
    if (d < 0) In.left = true; if (d > 0) In.right = true;
    if (a.jump) { In.jump = t < a.hold; In.jumpP = t === 0; }
    if (a.swim) { In.jump = true; In.jumpP = Math.floor(t / STEP) % 15 === 0; }
    if (a.climb) In.jump = true;
    if (a.big) { In.left = In.right = false; P.dir = a.dir; if (t === 0) { In.shootP = true; In.shoot = true; } else if (t < 0.65) In.shoot = true; else if (t < 0.65 + STEP * 1.5) In.shootR = true; }
    P.inv = 99; P.wingsT = 0; P.magnetT = 0; P.candyT = 0; P.frostT = 0; P.shield = false;
    update(STEP); t += STEP;
    if (P.hearts < h0 || P.y > VIEW_H + 30) return false;
    if (G.done) return true;
    if (!P.onGround) left = true;
    if (a.walk) { if (t >= a.walk) break; }
    else if ((a.jump) && left && P.onGround && t > 0.1) break;
  }
  In.left = In.right = In.jump = false;
  return true;
}
function keyOf(TB) {
  const P = G.P, wz = waterAt(P.x + P.w / 2, P.y + P.h / 2);
  let mv = -1; if (P.onMover) mv = G.movers.indexOf(P.onMover);
  if (G._sc == null) G._sc = G.map.some(v => v === 17 || v === 18);
  let st = ''; if (G._sc) for (let i = 0; i < G.map.length; i++) if (G.map[i] === 17 || G.map[i] === 18) st += i + (G.map[i] === 18 ? 'c' : '') + ';';
  return [Math.round(P.x / 7), Math.round(P.y / 7), mv, P.vine ? 1 : 0, P.mini ? 1 : 0, wz ? 1 : 0, G.keysHeld, G.sw ? 1 : 0, TB ? Math.floor(G.t / TB) % 8 : 0, G.paint || '', (G.doorOpen || []).map(Number).join(''), st, P.boostT > 0 ? 1 : 0].join(',');
}
function explore(idx, opts) {
  opts = opts || {};
  startLevel(idx); mode = 'play';
  G.enemies = []; G.powers = G.powers.filter(p => p.k === 'mini');
  for (const [i, v] of G.qContent) if (v !== 'mini' && v !== 'star' && v !== 'star5' && v !== 'rainbow') G.qContent.set(i, 'star');
  const limitX = G.arena ? G.arena.x0 : Infinity;
  // дати рівню «осісти»
  for (let i = 0; i < 20; i++) { G.P.inv = 99; update(STEP); }
  const stars = G.stars.length, got = new Uint8Array(stars), qb = new Set(), seen = new Set();
  let gate = false, maxX = 0;
  const queue = [snap()]; seen.add(keyOf(opts.tb));
  const qStart = []; for (let i = 0; i < G.map.length; i++) if (G.map[i] === 7) qStart.push(i);
  let n = 0;
  while (queue.length && n < (opts.max || 40000)) {
    const s = queue.shift(); n++;
    for (const a of ACTS) {
      if (a.swim && !waterAt(s.P.x + s.P.w / 2, s.P.y + s.P.h / 2)) continue;
      if (a.climb && !s.vines.length) continue;
      if (a.big && s.map.indexOf(18) < 0) continue;
      if ((a.wait) && !(s.movers.length || s.water.some(z => z.tide) || s.storms.length || s.map.indexOf(13) >= 0)) continue;
      G = structuredClone(Object.assign({}, s, { L: null, def: null })); G.L = s.L; G.def = s.def;
      if (!act(a)) continue;
      G.stars.forEach((st, i) => { if (st.got) got[i] = 1; });
      for (const i of qStart) if (G.map[i] !== 7 || G.qLeft.has(i)) qb.add(i);
      if (G.done || (G.gate && Math.abs(G.P.x + G.P.w / 2 - G.gate.x) < 20)) { gate = true; continue; }
      maxX = Math.max(maxX, G.P.x);
      if (G.P.x > limitX) continue;
      const k = keyOf(opts.tb);
      if (seen.has(k)) continue;
      seen.add(k); queue.push(snap());
    }
  }
  const L = buildLevel(idx), W = L.W;
  const missS = [], missQ = [];
  L.stars.forEach((st, i) => { if (!got[i] && st.x < limitX) missS.push((st.rainbow ? 'R' : '') + Math.floor(st.x / T) + ':' + Math.floor(st.y / T)); });
  for (const i of qStart) if (!qb.has(i) && (i % W) * T < limitX) missQ.push((i % W) + ':' + Math.floor(i / W) + '(' + L.qContent.get(i) + ')');
  return { idx: idx + 1, name: LEVELS[idx].name, states: n, gate, maxX: Math.round(maxX / T), stars: stars - missS.length + '/' + stars, missS, missQ };
}
const want = (process.argv[2] || '').split(',').filter(Boolean).flatMap(p => { const m = p.split('-').map(Number); return m.length > 1 ? Array.from({ length: m[1] - m[0] + 1 }, (_, i) => m[0] + i) : m; });
const list = want.length ? want.map(n => n - 1) : LEVELS.map((_, i) => i);
for (const i of list) { const t0 = Date.now(); const r = explore(i, { tb: +process.env.TB || 0 }); r.sec = ((Date.now() - t0) / 1000).toFixed(1); console.log(JSON.stringify(r)); }
`;
const ctx = vm.createContext({ Math, console, Map, Set, Array, Object, JSON, Number, Int8Array, Uint8Array, process, structuredClone, Date, setInterval: () => 0, clearInterval: () => 0, setTimeout: () => 0, window: {}, performance: { now: () => 0 } });
vm.runInContext(src, ctx, { filename: 'game' });
