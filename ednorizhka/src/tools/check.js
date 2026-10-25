// Автоматична перевірка: бот проходить кожен рівень, симуляція б'ється з кожним босом.
// Запуск з кореня репозиторію: node ednorizhka/src/tools/check.js
// Нічого не малює, тому не потребує браузера чи бібліотек.
'use strict';
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, '..', 'js');
const order = ['art.js', 'world.js', 'art2.js', 'art3.js', 'art4.js', 'art5.js', 'art6.js', 'art7.js', 'art8.js', 'levels.js', 'engine.js', 'engine2.js', 'engine3.js', 'engine4.js'].filter(f => fs.existsSync(path.join(dir, f)));
let src = order.map(f => fs.readFileSync(path.join(dir, f), 'utf8').replace(/^'use strict';$/m, '')).join('\n');
src += `
var save = { profile: { name: 'Тест', body: 'white', mane: 'rainbow', acc: [], friend: 'cat', easy: true }, unlocked: 99, best: {}, bestR: {}, bestF: {}, record: 0 };
var viewW = 600; function showLose() {} function showWin() {} function writeSave() {}
function press(k) { In.jumpP = k; }
function runLevel(idx, maxT) {
  startLevel(idx); mode = 'play';
  const P = G.P; let t = 0, cool = 0, stuck = 0, lastX = 0, back = 0;
  while (t < maxT && !G.done) {
    In.left = false; In.right = true; In.jumpP = false; In.shootP = false; In.shootR = false;
    if (stuck > 3 && G.hasDoors && G.keysHeld === 0) { back = 2.5; stuck = 0; }
    if (back > 0) { back -= STEP; In.left = true; In.right = false; }
    const wz = waterAt(P.x + P.w / 2, P.y + P.h / 2);
    const wall = solid(tileAt(Math.floor((P.x + P.w + 4) / T), Math.floor((P.y + P.h - 4) / T)));
    let gap = false;
    for (let d = 2; d <= 14; d += 4) { const gx = Math.floor((P.x + P.w + d) / T); let g = true; for (let yy = Math.floor((P.y + P.h) / T); yy < ROWS; yy++) { const v = tileAt(gx, yy); if (solid(v) || v === 3) { g = false; break; } } if (g) { gap = true; break; } }
    if (G.water.some(z => P.x + P.w + 10 > z.x0 && P.x < z.x1)) gap = false;
    let foe = null; for (const e of G.enemies) { const dx = e.x - P.x; if (dx > 0 && dx < 90 && Math.abs((e.y + e.h / 2) - (P.y + P.h / 2)) < 40) { foe = e; break; } }
    if (!foe && G.beans) for (const bn of G.beans) if (!bn.grown && bn.x - P.x > 0 && bn.x - P.x < 90) { foe = { x: bn.x - 10, y: bn.gy - 20, w: 20, h: 20 }; break; }
    if (foe && Math.floor(t * 10) % 2 === 0) { if (!In.shoot) { In.shootP = true; In.shoot = true; } else { In.shootR = true; In.shoot = false; } }
    if (wz) { In.jump = P.y + P.h > 250 || stuck > 0.3 || wall; if ((stuck > 0.3 || wall) && Math.floor(t * 6) % 2 === 0 && cool <= 0) { In.jumpP = true; cool = 0.2; } }
    else {
      const want = P.onGround && (wall || gap || (foe && foe.x - P.x < 50) || stuck > 1);
      In.jump = !P.onGround && P.vy < 0;
      if (want && cool <= 0) { In.jumpP = true; In.jump = true; cool = 0.35; }
    }
    if (typeof checkHooks === 'function') checkHooks(t);
    cool -= STEP; update(STEP); t += STEP;
    if (Math.abs(P.x - lastX) < 0.2) stuck += STEP; else stuck = 0; lastX = P.x;
  }
  return { idx, name: LEVELS[idx].name, done: G.done, t: +t.toFixed(1), points: G.points, need: G.need };
}
function fightBoss(idx) {
  startLevel(idx); mode = 'play';
  const P = G.P, B = G.boss; P.x = G.arena.x0 + 3 * T; P.y = 10 * T - 30; P.safe = { x: P.x, y: P.y };
  let t = 0;
  for (let i = 0; i < 60 * 180 && !G.done; i++) {
    In.left = In.right = In.jumpP = In.shootP = In.shootR = In.jump = false;
    const pcx = P.x + P.w / 2;
    if (G.bossActive && !B.dead) {
      const dx = B.x - pcx; P.dir = dx > 0 ? 1 : -1;
      const danger = G.bolts.find(b => !b.high && Math.abs(b.x - pcx) < 50 && Math.abs(b.y - (P.y + P.h / 2)) < 60);
      if ((B.state === 'roll' && Math.abs(dx) < 80) || danger) { if (P.onGround) { In.jumpP = true; In.jump = true; } }
      if (Math.abs(dx) > 70) { if (dx > 0) In.right = true; else In.left = true; }
      else if (Math.abs(dx) < 40) { if (dx > 0) In.left = true; else In.right = true; }
      if (B.kind === 'wizard' && B.y < 200 && P.onGround && Math.abs(dx) < 120) { In.jumpP = true; In.jump = true; }
      if (B.kind === 'medusa' && B.state === 'float' && P.onGround && Math.abs(dx) < 140 && Math.abs(dx) > 36) { In.jumpP = true; In.jump = true; }
      if (i % 10 === 0) fire(false);
      if (!P.onGround && P.vy < 0) In.jump = true;
    } else if (!G.bossActive) In.right = true;
    else { if (G.gate.x > pcx) In.right = true; else In.left = true; }
    update(STEP); t += STEP;
  }
  return { idx, boss: B.name, done: G.done, beaten: B.dead, t: +t.toFixed(1) };
}
const out = [];
for (let i = 0; i < LEVELS.length; i++) out.push(LEVELS[i].boss ? fightBoss(i) : runLevel(i, 240));
console.log(out.map(r => JSON.stringify(r)).join('\\n'));
const bad = out.filter(r => !r.done);
console.log(bad.length ? 'НЕ ПРОЙДЕНО: ' + bad.map(r => r.idx + 1).join(', ') : 'Усі рівні пройдено');
process.exitCode = bad.length ? 1 : 0;
`;
const ctx = vm.createContext({ Math, console, Map, Set, Array, Object, JSON, Number, Int8Array, Uint8Array, process, setInterval: () => 0, clearInterval: () => 0, setTimeout: () => 0, window: {}, performance: { now: () => 0 } });
vm.runInContext(src, ctx, { filename: 'game' });
