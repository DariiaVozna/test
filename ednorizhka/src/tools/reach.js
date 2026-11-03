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
var save = { profile: { name: 'АБВГДЕЖЗ', body: 'white', mane: 'rainbow', acc: [], friend: 'none', easy: true }, unlocked: 99, best: {}, bestR: {}, bestF: {}, record: 0 };
var viewW = 600; function showLose() {} function showWin() {} function writeSave() {}
burst = function () {}; floatText = function () {}; bubbles = function () {};
function snap() { const L = G.L, def = G.def; G.L = null; G.def = null; const s = structuredClone(G); G.L = L; G.def = def; s.L = L; s.def = def; return s; }
const ACTS = [];
for (const d of [1, -1]) { ACTS.push({ walk: 0.2, dir: d }); ACTS.push({ walk: 0.5, dir: d }); }
for (const d of [1, -1, 0]) for (const hold of [0.06, 0.16, 0.3, 1]) ACTS.push({ jump: true, dir: d, hold });
for (const d of [1, -1]) { ACTS.push({ jump: true, dir: d, hold: 1, dd: 0.25 }); ACTS.push({ jump: true, dir: d, hold: 1, back: 0.3 }); }
ACTS.push({ wait: 0.7 }); ACTS.push({ wait: 1.6 }); ACTS.push({ wait: 0.2 });
for (const d of [1, -1, 0]) ACTS.push({ swim: true, dir: d });
ACTS.push({ climb: true });
for (const d of [1, -1]) ACTS.push({ big: true, dir: d });
// звичайний постріл на місці й постріл на верхівці стрибка (для дзеркалець і зір-обмінниць)
for (const d of [1, -1]) ACTS.push({ shoot: true, dir: d });
for (const d of [1, 0]) ACTS.push({ jump: true, dir: d, hold: 1, shootAt: 0.36 });
// хмаринки з пляшечки: ставимо в різні моменти стрибка
for (const at of [0.55, 0.75]) ACTS.push({ jump: true, dir: 1, hold: 1, shootAt: at, cloud: true });
function act(a) {
  const P = G.P, h0 = P.hearts; let t = 0, left = false;
  const bub0 = !!P.bub, hang0 = !!P.hang, can0 = !!P.inCannon;
  const T_MAX = a.wait || (a.swim ? 1.1 : a.climb ? 2 : a.big ? 1.1 : a.shoot ? 0.3 : 2.6);
  while (t < T_MAX) {
    In.left = In.right = In.jumpP = In.shootP = In.shootR = In.shoot = false; In.jump = false;
    let d = a.dir || 0; if (a.dd && t < a.dd) d = 0; if (a.back && t > a.back) d = -d;
    if (d < 0) In.left = true; if (d > 0) In.right = true;
    if (a.jump) { In.jump = t < a.hold; In.jumpP = t === 0; }
    if (a.swim) { In.jump = true; In.jumpP = Math.floor(t / STEP) % 15 === 0; }
    if (a.climb) In.jump = true;
    if (a.shoot) { In.left = In.right = false; P.dir = a.dir; if (t === 0) { In.shootP = true; In.shoot = true; } else if (t < STEP * 1.5) In.shootR = true; }
    if (a.shootAt != null) { if (Math.abs(t - a.shootAt) < STEP / 2) { In.shootP = true; In.shoot = true; } else if (Math.abs(t - a.shootAt - STEP) < STEP / 2) In.shootR = true; }
    if (a.big) { In.left = In.right = false; P.dir = a.dir; if (t === 0) { In.shootP = true; In.shoot = true; } else if (t < 0.65) In.shoot = true; else if (t < 0.65 + STEP * 1.5) In.shootR = true; }
    P.inv = 99; P.wingsT = 0; P.magnetT = 0; P.candyT = 0; P.frostT = 0; P.shield = false;
    update(STEP); t += STEP;
    if (P.hearts < h0 || P.y > VIEW_H + 30) return false;
    if (G.done) return true;
    if (!P.onGround) left = true;
    if (a.walk) { if (t >= a.walk) break; }
    else if ((a.jump) && left && P.onGround && t > 0.1) break;
    if (a.jump && P.cling && t > 0.05) break;
    // сіли в бульбашку чи гармату або вхопилися за поручні — зупиняємося, щоб далі вибирати нову дію
    if (t > 0.05 && ((P.bub && !bub0) || (P.hang && !hang0) || (P.inCannon && !can0))) break;
  }
  In.left = In.right = In.jump = false;
  // постріл ще летить — чекаємо, поки він у щось влучить, інакше новий стан не відрізнити від старого
  for (let extra = 0; G.shots.length && extra < 1.4; extra += STEP) {
    In.left = In.right = In.jumpP = In.shootP = In.shootR = In.shoot = false; In.jump = false;
    update(STEP);
    if (P.hearts < h0 || P.y > VIEW_H + 30) return false;
  }
  return true;
}
function keyOf(TB) {
  const P = G.P, wz = waterAt(P.x + P.w / 2, P.y + P.h / 2);
  let mv = -1; if (P.onMover) mv = G.movers.indexOf(P.onMover);
  if (G._sc == null) G._sc = G.map.some(v => v === 17 || v === 18 || v === 23 || v === 24 || v === 39);
  let st = ''; if (G._sc) for (let i = 0; i < G.map.length; i++) if (G.map[i] === 17 || G.map[i] === 18 || G.map[i] === 23 || G.map[i] === 24 || G.map[i] === 39) st += i + (G.map[i] === 18 ? 'c' : '') + ';';
  let mv8 = ''; for (const m of G.movers) { if (m.ball) mv8 += Math.round(m.x / 12) + 'b;'; else if (m.coaster) mv8 += m.state[0] + Math.round(m.cx / 48) + ';'; }
  return [Math.round(P.x / 7), Math.round(P.y / 7), mv, P.vine ? 1 : 0, P.mini ? 1 : 0, wz ? 1 : 0, G.keysHeld, G.sw ? 1 : 0, TB ? Math.floor(G.t / TB) % 8 : 0, G.paint || '', (G.doorOpen || []).map(Number).join(''), st, P.boostT > 0 ? 1 : 0, P.big ? Math.ceil(P.bigT / 3) : 0, mv8, G.season || '', P.mount ? 1 : 0, P.swing ? G.rings.indexOf(P.swing) + ':' + Math.round(P.swing.th * 4) + ':' + Math.round(P.swing.om) : '', P.cling || 0, G.crystals.map(c => Math.ceil(c.t / 2)).join(''), G.movers.filter(m => m.pulley && m.lead).map(m => Math.round(m.y / 8)).join('.'), Math.ceil((G.timeStop || 0) / 2), P.bub ? 'b' + G.soaps.indexOf(P.bub) : '', G.soaps.map(q => q.state === 'idle' ? 1 : 0).join(''), P.hang ? 'h' : '', G.nutWheels.map(w => Math.round(w.p * 8) + (w.full ? 'f' + Math.ceil(w.hold) : '')).join('.'), P.inCannon && P.inCannon.swc ? Math.round(P.inCannon.ang * 12) : '', P.tramp + (P.trampT > 0 ? 't' : ''), G.balls12.map(b => Math.round(b.x / 12) + ':' + Math.round(b.y / 12)).join('.'), G.goals.map(g => g.scored ? 1 : 0).join(''), G.mirrors.map(m => m.d > 0 ? 1 : 0).join(''), G.suns.map(q => q.on ? 1 : 0).join(''), G.swappers.map(w => Math.round(w.x / 12) + ':' + Math.round(w.y / 12)).join('.'), G.movers.filter(m => m.sailboat).map(m => Math.round(m.x / 12) + ':' + Math.round(m.vx / 50)).join('.'), G.foods.map(f => f.state[0]).join(''), G.animals.map(a => (a.fed ? 1 : 0) + (a.m ? (a.m.hippo ? a.m.state[0] : Math.round(a.m.y / 12)) : '')).join('.'), G.padSets.map(q => q.solved ? 's' : q.prog).join(''), P.hotair ? 'H' + Math.round(P.hotair.vy / 30) : '', G.movers.filter(m => m.hotair).map(m => m.state[0] + Math.round(m.x / 8) + ':' + Math.round(m.y / 8)).join('.'), G.movers.filter(m => m.snowball).map(m => Math.round(m.cx / 8) + ':' + Math.round(m.r / 3)).join('.'), G.runners.map(r => r.state === 'caught' ? 'c' : Math.round(r.x / 12)).join('.'), P.sled ? 'S' + Math.round(P.sledStun * 4) : '', G.sleds.map(q => q.state[0]).join(''), Math.ceil((P.pogoT || 0) / 2), P.cloudN || 0, G.movers.filter(m => m.pump).map(m => m.level).join(''), G.bridges19.map(b => b.on ? Math.ceil(b.t / 2) : 0).join(''), G.movers.filter(m => m.lift19 || m.stork).map(m => (m.state || '')[0] + Math.round(m.x / 8) + ':' + Math.round(m.y / 8) + (m.level || '')).join('.'), G.movers.filter(m => m.tmpCloud && m.state !== 'gone').map(m => Math.round(m.x / 8) + ':' + Math.round(m.y / 8) + ':' + Math.ceil(m.life)).join('.')].join(',');
}
function explore(idx, opts) {
  opts = opts || {};
  startLevel(idx); mode = 'play';
  G.enemies = []; G.powers = G.powers.filter(p => p.k === 'mini' || p.k === 'big' || p.k === 'pogo' || p.k === 'cloud');
  for (const [i, v] of G.qContent) if (v !== 'mini' && v !== 'big' && v !== 'star' && v !== 'star5' && v !== 'rainbow') G.qContent.set(i, 'star');
  const limitX = G.arena ? G.arena.x0 : Infinity;
  // дати рівню «осісти»
  for (let i = 0; i < 20; i++) { G.P.inv = 99; update(STEP); }
  const stars = G.stars.length, got = new Uint8Array(stars), qb = new Set(), seen = new Set(), gotC = new Uint8Array(G.chicks.length), gotL = new Uint8Array(G.letters.length);
  let gate = false, maxX = 0;
  const queue = [snap()]; seen.add(keyOf(opts.tb));
  const qStart = []; for (let i = 0; i < G.map.length; i++) if (G.map[i] === 7) qStart.push(i);
  let n = 0;
  while (queue.length && n < (opts.max || 40000)) {
    const s = queue.shift(); n++;
    for (const a of ACTS) {
      if (a.swim && !waterAt(s.P.x + s.P.w / 2, s.P.y + s.P.h / 2)) continue;
      if (a.climb && !s.vines.length) continue;
      const sail = s.movers.some(m => m.sailboat);
      if (a.big && s.map.indexOf(18) < 0 && !s.crystals.length && !s.mirrors.length && !s.swappers.length) continue;
      const cl = s.P.cloudN > 0;
      if (a.cloud && !cl) continue;
      if ((a.shoot || a.shootAt != null) && !s.mirrors.length && !s.swappers.length && !(sail && s.P.onMover && s.P.onMover.sailboat) && !cl) continue;
      if ((a.wait) && !(s.movers.length || s.hasDirt || s.water.some(z => z.tide) || s.storms.length || s.map.indexOf(13) >= 0 || s.P.swing || s.P.inCannon || s.P.bub || s.P.hang || s.nutWheels.some(w => w.p > 0) || s.soaps.some(q => q.state === 'gone') || s.balls12.some(b => !b.done && (Math.abs(b.vx) > 1 || !b.onGround)))) continue;
      G = structuredClone(Object.assign({}, s, { L: null, def: null })); G.L = s.L; G.def = s.def;
      if (!act(a)) continue;
      G.stars.forEach((st, i) => { if (st.got) got[i] = 1; });
      G.chicks.forEach((ch, i) => { if (ch.state !== 'home') gotC[i] = 1; });
      G.letters.forEach((l, i) => { if (l.got) gotL[i] = 1; });
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
  const missC = []; L.chicks.forEach((ch, i) => { if (!gotC[i]) missC.push(Math.floor(ch.x / T) + ':' + Math.floor(ch.y / T)); });
  return { idx: idx + 1, name: LEVELS[idx].name, states: n, gate, maxX: Math.round(maxX / T), stars: stars - missS.length + '/' + stars, missS, missQ, chicks: L.chicks.length ? (L.chicks.length - missC.length) + '/' + L.chicks.length : undefined, missC: missC.length ? missC : undefined, letters: G.letters.length ? (gotL.reduce((a, b) => a + b, 0)) + '/' + G.letters.length : undefined };
}
const want = (process.argv[2] || '').split(',').filter(Boolean).flatMap(p => { const m = p.split('-').map(Number); return m.length > 1 ? Array.from({ length: m[1] - m[0] + 1 }, (_, i) => m[0] + i) : m; });
const list = want.length ? want.map(n => n - 1) : LEVELS.map((_, i) => i);
for (const i of list) { const t0 = Date.now(); const r = explore(i, { tb: +process.env.TB || 0 }); r.sec = ((Date.now() - t0) / 1000).toFixed(1); console.log(JSON.stringify(r)); }
`;
const ctx = vm.createContext({ Math, console, Map, Set, Array, Object, JSON, Number, Int8Array, Uint8Array, process, structuredClone, Date, setInterval: () => 0, clearInterval: () => 0, setTimeout: () => 0, window: {}, performance: { now: () => 0 } });
vm.runInContext(src, ctx, { filename: 'game' });
