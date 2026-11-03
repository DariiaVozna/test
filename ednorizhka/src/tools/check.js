// Автоматична перевірка: бот проходить кожен рівень, симуляція б'ється з кожним босом.
// Запуск з кореня репозиторію: node ednorizhka/src/tools/check.js
// Нічого не малює, тому не потребує браузера чи бібліотек.
'use strict';
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, '..', 'js');
const order = ['art.js', 'world.js', 'art2.js', 'art3.js', 'art4.js', 'art5.js', 'art6.js', 'art7.js', 'art8.js', 'art9.js', 'art10.js', 'art11.js', 'art12.js', 'art13.js', 'art14.js', 'art15.js', 'art16.js', 'art17.js', 'art18.js', 'art19.js', 'levels.js', 'engine.js', 'engine2.js', 'engine3.js', 'engine4.js', 'engine5.js', 'engine6.js', 'engine7.js', 'engine8.js', 'engine9.js', 'engine10.js', 'engine11.js', 'engine12.js', 'engine13.js', 'engine14.js', 'engine15.js'].filter(f => fs.existsSync(path.join(dir, f)));
let src = order.map(f => fs.readFileSync(path.join(dir, f), 'utf8').replace(/^'use strict';$/m, '')).join('\n');
src += `
var save = { profile: { name: 'Тест', body: 'white', mane: 'rainbow', acc: [], friend: 'cat', easy: true }, unlocked: 99, best: {}, bestR: {}, bestF: {}, record: 0 };
var viewW = 600; function showLose() {} function showWin() {} function writeSave() {}
function press(k) { In.jumpP = k; }
function runLevel(idx, maxT) {
  startLevel(idx); mode = 'play';
  const P = G.P; let t = 0, cool = 0, stuck = 0, lastX = 0, back = 0;
  const pcxB = () => P.x + P.w / 2;
  while (t < maxT && !G.done) {
    In.left = false; In.right = true; In.jumpP = false; In.shootP = false; In.shootR = false;
    if (stuck > 3 && G.hasDoors && G.keysHeld === 0) { back = 2.5; stuck = 0; }
    // двері храму зачинені — повертаємося по кубик, щоб доштовхати його на кнопку
    const dt7 = tileAt(Math.floor((P.x + P.w + 4) / T), Math.floor((P.y + P.h - 4) / T));
    if (stuck > 2 && dt7 >= 19 && dt7 <= 21) { back = 4; stuck = 0; }
    if (back > 0) { back -= STEP; In.left = true; In.right = false; }
    const wz = waterAt(P.x + P.w / 2, P.y + P.h / 2);
    const wallTile = tileAt(Math.floor((P.x + P.w + 4) / T), Math.floor((P.flip ? P.y + 4 : P.y + P.h - 4) / T));
    const wall = solid(wallTile) && wallTile !== 39 && !((wallTile === 17 || wallTile === 24) && stuck < 0.8);
    let gap = false;
    for (let d = 2; d <= 14; d += 4) {
      const gx = Math.floor((P.x + P.w + d) / T); let g = true;
      if (P.flip) { for (let yy = Math.floor((P.y - 1) / T); yy >= 0; yy--) if (solid(tileAt(gx, yy))) { g = false; break; } }
      // колючки під поручнями — теж яма: туди не йдемо, а стрибаємо до поручнів
      else for (let yy = Math.floor((P.y + P.h) / T); yy < ROWS; yy++) { const v = tileAt(gx, yy); if ((solid(v) || v === 3) && !(v === 22 && [4, 5, 6, 7, 8].some(r => tileAt(gx, r) === 35))) { g = false; break; } }
      // вагончик американських гірок на станції — це підлога, а не яма
      if (g && G.movers.some(m => ((m.coaster && m.state === 'idle') || (m.pulley && P.onMover === m)) && gx * T + 12 > m.x && gx * T + 12 < m.x + m.w && Math.abs(m.y - (P.y + P.h)) < 6)) g = false;
      if (g) { gap = true; break; }
    }
    if (G.water.some(z => P.x + P.w + 10 > z.x0 && P.x < z.x1)) gap = false;
    let foe = null; for (const e of G.enemies) { const dx = e.x - P.x; if (dx > 0 && dx < 90 && Math.abs((e.y + e.h / 2) - (P.y + P.h / 2)) < 40) { foe = e; break; } }
    if (!foe && G.beans) for (const bn of G.beans) if (!bn.grown && bn.x - P.x > 0 && bn.x - P.x < 90) { foe = { x: bn.x - 10, y: bn.gy - 20, w: 20, h: 20 }; break; }
    if (foe && Math.floor(t * 10) % 2 === 0) { if (!In.shoot) { In.shootP = true; In.shoot = true; } else { In.shootR = true; In.shoot = false; } }
    // упали в озеро з течією — випливаємо до берега, звідки прийшли
    if (wz && wz.flow < 0) { In.right = false; In.left = true; }
    if (wz) { In.jump = P.y + P.h > 250 || stuck > 0.3 || wall; if ((stuck > 0.3 || wall) && Math.floor(t * 6) % 2 === 0 && cool <= 0) { In.jumpP = true; cool = 0.2; } }
    else {
      // гарбуз попереду — застрибуємо на нього, щоб перекотитися через колючки
      const ball = G.movers.find(m => m.ball && P.onMover !== m && m.x - (P.x + P.w) > 0 && m.x - (P.x + P.w) < 40 && Math.abs(m.y + m.h - (P.y + P.h)) < 10);
      // тотем пір року попереду, а потрібна інша пора — застрибуємо на нього
      const tm = G.totems.find(q => q.want && q.want !== G.season && q.x - (P.x + P.w / 2) > 10 && q.x - (P.x + P.w / 2) < 60);
      const want = P.onGround && (wall || gap || ball || tm || (foe && foe.x - P.x < 50 && wallTile !== 17 && wallTile !== 24) || stuck > 1);
      In.jump = !P.onGround && (P.flip ? P.vy > 0 : P.vy < 0);
      if (want && cool <= 0) { In.jumpP = true; In.jump = true; cool = 0.35; if (ball) G._bt = ball; else if (tm) G._bt = { x: tm.x - 20, w: 40, totem: true }; }
      // над гарбузом гальмуємо, щоб приземлитися на нього, а не перелетіти
      if (G._bt) { if (P.onGround && P.onMover !== G._bt && P.vy === 0 && cool < 0.2) G._bt = null; else if (!P.onGround && P.x + P.w / 2 > G._bt.x + G._bt.w / 2 - (G._bt.totem ? 12 : 8)) { In.right = false; In.left = true; } if (P.onMover === G._bt) G._bt = null; }
    }
    // прилипли до медової стіни — відштовхуємося вгору
    if (P.cling && cool <= 0) { In.jumpP = true; In.jump = true; cool = 0.2; }
    // кристал попереду ще не світить — стріляємо в нього, а біля прірви чекаємо на міст
    const cr = G.crystals.find(c => c.t <= 0.3 && c.x - (P.x + P.w / 2) > 0 && c.x - (P.x + P.w / 2) < 300 && Math.abs(c.y - (P.y + P.h - 15)) < 30);
    if (cr) { if (!In.shoot) { In.shootP = true; In.shoot = true; } else { In.shootR = true; In.shoot = false; } if (gap) { In.right = false; In.jumpP = false; } }
    // на кільці: розгойдуємося в бік руху й відпускаємо, коли летимо вперед і вгору
    if (P.swing) { const r = P.swing; In.right = r.om > -0.3; In.left = !In.right; In.jumpP = r.th > 0.35 && r.om > 0 && r.om * r.len > 200; }
    // тріснута скеля попереду — заряджаємо велику кулю
    let crack = false; for (let d = 4; d <= 90; d += 12) if (tileAt(Math.floor((P.x + P.w + d) / T), Math.floor((P.y + P.h - 15) / T)) === 18) crack = true;
    if (crack) { In.shootR = false; if (!P.charging) { In.shootP = true; In.shoot = true; } else if (P.charge >= 0.6) { In.shootP = false; In.shootR = true; In.shoot = false; } else { In.shootP = false; In.shoot = true; } }
    // мильна бульбашка: летимо до цілі й лопаємо бульбашку над нею (без цілі — одразу лопаємо)
    if (P.bub) {
      const s = P.bub, pcx = P.x + P.w / 2; In.left = In.right = false; In.jumpP = false;
      if (s.to == null) In.jumpP = true;
      else {
        const tx = Math.floor(s.to / T); let top = ROWS * T;
        for (let yy = 0; yy < ROWS; yy++) { const v = tileAt(tx, yy); if (solid(v) || v === 3) { top = yy * T; break; } }
        if (pcx < s.to - 6) In.right = true; else if (pcx > s.to + 6) In.left = true;
        if (Math.abs(pcx - s.to) < 12 && P.y + P.h < top - 6) In.jumpP = true;
      }
    }
    // гармата-гойдалка: стріляємо, коли пунктир показує на ціль
    if (P.inCannon && P.inCannon.swc) { const cn = P.inCannon, land = cannonPath(cn, cn.ang); In.jumpP = !!(land && land.ok && Math.abs(land.x - cn.aim) < 26 && cn.st > 0.3); }
    // поручні: перебираємо вперед, а дійшовши до кінця, відпускаємо
    if (P.hang) { In.left = false; In.right = true; In.jumpP = false; if (tileAt(Math.floor((P.x + P.w / 2 + 14) / T), P.hang.row) !== 35 && Math.abs(P.vx) < 1 && cool <= 0) { In.jumpP = true; cool = 0.3; } }
    // колесо білочки: біжимо в ньому, поки місток не висунеться
    if (G.nutWheels.some(w => !w.full && inWheel(w))) { In.right = true; In.left = false; In.jumpP = false; In.jump = false; }
    // батут: підскакуємо на місці, поки не наберемо потрібну висоту, а тоді летимо праворуч
    const tr = G.tramps.find(q => q.need && pcxB() > q.x0 - 4 && pcxB() < q.x1 + 4 && P.y + P.h <= q.row * T + 2);
    if (tr && P.tramp < tr.need && !(P.tramp === tr.need - 1 && P.vy < -200)) { const mid = (tr.x0 + tr.x1) / 2; In.right = pcxB() < mid - 6; In.left = pcxB() > mid + 6; In.jumpP = false; }
    else if (tr) { In.right = true; In.left = false; }
    if (tr || (P.tramp > 0 && !P.onGround)) In.jump = true;
    // футбол: якщо м'яч для найближчих воріт позаду — обходимо його, щоб ударити вперед
    const gi = G.goals.findIndex(g => !g.scored && g.x0 > pcxB() - 20), gb = gi >= 0 ? G.balls12[gi] : null;
    if (gb && gb.x + 10 < pcxB() - 4) { In.right = false; In.left = true; if (P.onGround && pcxB() - (gb.x + 10) < 46 && cool <= 0) { In.jumpP = true; In.jump = true; cool = 0.4; } G._ballBack = true; }
    else if (gb && G._ballBack && gb.x + 10 < pcxB() + 14) { In.right = false; In.left = true; }
    else G._ballBack = false;
    // дзеркальце попереду повернуте не так — стріляємо (якщо перед ним немає іншого дзеркальця)
    const sh = P.y + P.h - 15;
    const mAhead = G.mirrors.filter(m => Math.abs(m.ty * T + 12 - sh) < 14 && m.tx * T + 12 - pcxB() > 8 && m.tx * T + 12 - pcxB() < 300).sort((a, b) => a.tx - b.tx)[0];
    if (mAhead && mAhead.d !== mAhead.want && P.onGround && !G.suns.every(s => s.on)) { if (!In.shoot) { In.shootP = true; In.shoot = true; } else { In.shootR = true; In.shoot = false; } }
    // зоря-обмінниця попереду на висоті пострілу — стріляємо (біля ями не стрибаємо)
    const swp = G.swappers.find(w => !w.used && w.x - pcxB() > 20 && w.x - pcxB() < 330 && Math.abs(w.y - sh) < 14);
    if (swp && P.onGround) { if (gap) { In.right = false; In.jumpP = false; } if (!In.shoot) { In.shootP = true; In.shoot = true; } else { In.shootR = true; In.shoot = false; } }
    // зоря-обмінниця вгорі — стрибаємо й стріляємо на верхівці стрибка
    const swU = G.swappers.find(w => !w.used && w.x - pcxB() > 20 && w.x - pcxB() < 140 && sh - w.y > -20 && sh - w.y < 140 && !(P.onGround && sh - w.y < 70));
    if (swU) { In.right = false; if (P.onGround && cool <= 0) { In.jumpP = true; In.jump = true; cool = 0.5; } else if (!P.onGround && Math.abs(sh - swU.y) < 14) { if (!In.shoot) { In.shootP = true; In.shoot = true; } else { In.shootR = true; In.shoot = false; } } }
    // озеро з течією назад: на вітрильнику стоїмо позаду щогли й стріляємо у вітрило; бегемотика чекаємо й перестрибуємо по ньому
    const lake = G.water.find(z => z.flow < 0 && P.x + P.w > z.x0 - 40 && P.x < z.x0 && P.y + P.h <= z.y);
    const boat = P.onMover && P.onMover.sailboat ? P.onMover : null;
    if (boat) {
      In.left = false; In.jumpP = false;
      if (boat.x < boat.x1 - boat.w - 2) { In.right = pcxB() < boat.x + 14; if (!In.shoot) { In.shootP = true; In.shoot = true; } else { In.shootR = true; In.shoot = false; } }
      else In.right = true;
    } else if (lake && P.onGround) {
      const bt = G.movers.find(m => m.sailboat && m.x0 === lake.x0), hp = G.movers.find(m => m.hippo && m.x > lake.x0 && m.x < lake.x1);
      if (bt) { In.jumpP = false; if (bt.x - bt.x0 > 6) In.right = P.x + P.w < lake.x0 - 30; }
      else if (hp) { if (hp.state === 'gone') { In.right = P.x + P.w < lake.x0 - 6; In.jumpP = false; } else if (P.x + P.w > lake.x0 - 6 && cool <= 0) { In.jumpP = true; In.jump = true; cool = 0.4; } }
    }
    if (P.onMover && P.onMover.hippo && P.x + P.w > P.onMover.x + P.onMover.w - 6 && cool <= 0) { In.jumpP = true; In.jump = true; cool = 0.4; }
    // голова жирафи піднімає — стоїмо, поки не доїде нагору
    if (P.onMover && P.onMover.giraffe && P.onMover.y > P.onMover.yTop + 1) { In.right = In.left = In.jumpP = In.jump = false; }
    // барабани: стрибаємо на той, що наступний у мелодії
    const ps = G.padSets.find(s => !s.solved && pcxB() > s.drums[0].x - 3 * T && pcxB() < s.door[0][0] * T);
    if (ps) {
      const d = ps.drums[ps.seq[ps.prog]], tx = d.x + d.w / 2; In.jumpP = false;
      if (P.onMover === d) { In.right = In.left = false; }
      else {
        In.right = pcxB() < tx - 4; In.left = pcxB() > tx + 4;
        if (P.onGround && P.onMover !== d && Math.abs(pcxB() - tx) < 10 && cool <= 0) { In.jumpP = true; In.jump = true; cool = 0.4; }
        if (!P.onGround) In.jump = P.vy < 0;
      }
    }
    // повітряна куля: застрибуємо в кошик, а в польоті тримаємо кулю посередині вільного проходу попереду
    const hb = G.movers.find(m => m.hotair && m.state === 'idle' && m.x - (P.x + P.w) > -10 && m.x - (P.x + P.w) < 30);
    if (hb && P.onGround && !P.hotair && cool <= 0) { In.jumpP = true; In.jump = true; cool = 0.4; G._bt = { x: hb.x, w: hb.w }; }
    if (P.hotair) {
      const m = P.hotair, b = hotairBox(m), h = b.bot - b.top, cy = (b.top + b.bot) / 2;
      let target = null;
      for (let dx = 4; dx <= 130 && target == null; dx += 12) {
        const col = Math.floor((b.right + dx) / T);
        let hit = false; for (let y = Math.max(0, b.top - 6); y <= b.bot + 10; y += 6) if (solid(tileAt(col, Math.floor(y / T)))) hit = true;
        if (!hit) continue;
        let bestC = null, r0 = -1;
        for (let r = 0; r <= ROWS; r++) {
          const free = r < ROWS && !solid(tileAt(col, r));
          if (free && r0 < 0) r0 = r;
          if (!free && r0 >= 0) { const y0 = r0 * T, y1 = r * T; if (y1 - y0 >= h + 6) { const cc = clamp(cy, y0 + h / 2 + 8, y1 - h / 2 - 10); if (bestC == null || Math.abs(cc - cy) < Math.abs(bestC - cy)) bestC = cc; } r0 = -1; }
        }
        target = bestC;
      }
      if (target == null) target = cy > 160 ? 150 : cy;
      In.left = In.right = false; In.jumpP = false;
      In.jump = m.ground || cy > target + 3 || (Math.abs(cy - target) <= 3 && m.vy > 10);
    }
    // санчата: стрибаємо трохи раніше, бо їдемо швидко
    if (P.sled && P.onGround && cool <= 0) {
      let danger = false; const row = Math.floor((P.y + P.h + 2) / T);
      for (let d = 22; d <= 46; d += 6) { const gx = Math.floor((P.x + P.w + d) / T); if (solid(tileAt(gx, Math.floor((P.y + P.h - 4) / T)))) danger = true; }
      for (let d = 4; d <= 20; d += 4) { const gx = Math.floor((P.x + P.w + d) / T); const v = tileAt(gx, row); if (v === 22 || !(solid(v) || v === 3)) danger = true; }
      if (danger) { In.jumpP = true; In.jump = true; cool = 0.3; }
    }
    // лелека: застрибуємо на спинку й летимо, нічого не натискаючи
    const sk = G.movers.find(m => m.stork && m.state === 'wait' && m.x - (P.x + P.w) > -24 && m.x - (P.x + P.w) < 30);
    if (sk && P.onGround && P.onMover !== sk && cool <= 0) { In.jumpP = true; In.jump = true; cool = 0.4; G._bt = { x: sk.x, w: sk.w }; }
    if (P.onMover && P.onMover.stork && P.onMover.state !== 'arrive') { In.left = In.right = In.jumpP = In.jump = false; }
    // пого: завжди тримаємо «Стрибок», щоб скакати якнайвище
    if (P.pogoT > 0) In.jump = true;
    // насос: стрибаємо на ручку, доки не накачаємо, а на кульці-ліфті стоїмо, доки не підніме
    const pm = G.movers.find(m => m.pump && m.level < 3 && m.x + m.w / 2 > pcxB() - 40 && m.x + m.w / 2 - pcxB() < 100);
    if (pm) {
      const tx = pm.x + pm.w / 2; In.jumpP = false;
      if (P.onMover === pm) { In.right = In.left = false; In.jumpP = P.onGround; In.jump = true; }
      else { In.right = pcxB() < tx - 3; In.left = pcxB() > tx + 3; if (P.onGround && Math.abs(pcxB() - tx) < 26) { In.jumpP = true; In.jump = true; } }
    }
    if (P.onMover && P.onMover.lift19 && P.onMover.level >= 3 && P.onMover.y > P.onMover.yTop + 1) { In.left = In.right = In.jumpP = In.jump = false; }
    // хмаринки: падаємо над ямою або впираємося в стіну — ставимо хмаринку під ноги
    if (P.cloudN > 0 && !P.onGround && P.vy > 30) {
      let pit = true; for (let yy = Math.floor((P.y + P.h) / T); yy < ROWS; yy++) { const v = tileAt(Math.floor((P.x + P.w / 2) / T), yy); if (solid(v) || v === 3) { pit = false; break; } }
      const wallAhead = solid(tileAt(Math.floor((P.x + P.w + 6) / T), Math.floor((P.y + P.h - 4) / T)));
      if (((pit && P.y + P.h > 7 * T) || wallAhead) && !In.shoot) { In.shootP = true; In.shoot = true; } else if (In.shoot) { In.shootR = true; In.shoot = false; }
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
      if (((B.state === 'roll' || B.state === 'dash' || (B.kind === 'peacock' && B.state === 'peck' && B.st > 0.3)) && Math.abs(dx) < 90) || danger) { if (P.onGround) { In.jumpP = true; In.jump = true; } }
      if (Math.abs(dx) > 70) { if (dx > 0) In.right = true; else In.left = true; }
      else if (Math.abs(dx) < 40) { if (dx > 0) In.left = true; else In.right = true; }
      // лис цілиться шишкою — відбігаємо від місця, куди вона впаде
      if (B.kind === 'fox' && B.aimX != null && Math.abs(pcx - B.aimX) < 56) { In.left = B.aimX > pcx; In.right = !In.left; }
      // на поручнях пересиджуємо розгін лиса, а потім зістрибуємо
      if (P.hang && B.state !== 'dash' && B.state !== 'crouch') In.jumpP = true;
      if (B.kind === 'wizard' && B.y < 200 && P.onGround && Math.abs(dx) < 120) { In.jumpP = true; In.jump = true; }
      if (B.kind === 'medusa' && B.state === 'float' && P.onGround && Math.abs(dx) < 140 && Math.abs(dx) > 36) { In.jumpP = true; In.jump = true; }
      // пінгвін мчить на животику — стрибаємо так, щоб приземлитися йому на спину
      if (B.kind === 'penguin' && B.state === 'slide') {
        const app = Math.sign(pcx - B.x) === B.dir, d = Math.abs(dx);
        In.left = In.right = false; In.jumpP = false;
        if (app && d < 150 && d > 112 && P.onGround) { In.jumpP = true; In.jump = true; }
      }
      // гусениця повзе — скачемо їй по спинці
      if (B.kind === 'caterpillar') {
        const near = catSegs(B).some(sg => sg.shown && Math.abs(sg.x - pcx) < 48) || (B.headShown && Math.abs(B.x - pcx) < 56);
        if ((B.state === 'crawl' || B.state === 'emerge' || B.state === 'burrow') && near && P.onGround) { In.jumpP = true; In.jump = true; }
        if (!P.onGround) In.jump = true;
        // жує листочок — біжимо до голови й стрибаємо на неї (або стріляємо)
        if (B.state === 'munch') { const hx = B.x - pcx; In.right = hx > 6; In.left = hx < -6; if (P.onGround && Math.abs(hx) < 34) { In.jumpP = true; In.jump = true; } }
      }
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
// Випадковість (вороги, бульбашки) робимо однаковою в кожному запуску, щоб результат повторювався
const M = Object.create(Math); let seed = 12345; M.random = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x80000000; };
const ctx = vm.createContext({ Math: M, console, Map, Set, Array, Object, JSON, Number, Int8Array, Uint8Array, process, setInterval: () => 0, clearInterval: () => 0, setTimeout: () => 0, window: {}, performance: { now: () => 0 } });
vm.runInContext(src, ctx, { filename: 'game' });
