'use strict';
/* ===== Частина 36 «Ящики й сова»: ящики, які можна штовхати, Сова-сторож, пазли-наліпки і Робот-пилосос Хрумчик ===== */
Object.assign(TUNES, {
  cratefarm: { base: 587.33, ms: 165, n: [0, 4, 7, 4, 5, 9, 7, null, 4, 7, 12, 7, 9, 5, 4, null, 2, 5, 9, 5, 7, 4, 2, null, 0, 2, 4, 5, 4, 2, 0, null], b: [0, -5, -3, -7] },
  owlwatch: { base: 493.88, ms: 210, n: [0, null, 3, null, 7, null, null, null, 5, null, 3, null, 0, null, null, null, 7, null, 8, null, 10, null, null, null, 8, null, 7, null, 3, null, null, null], b: [0, -4, -2, -5] },
  icecrates: { base: 659.25, ms: 180, n: [12, null, 7, 9, 11, null, 7, null, 12, null, 14, 12, 11, null, 7, null, 9, null, 5, 7, 9, null, 4, null, 7, 5, 4, 2, 0, null, null, null], b: [0, -5, -3, -7] },
  nightmuseum: { base: 440, ms: 195, n: [0, 3, 7, null, 5, 8, 12, null, 3, 7, 10, null, 7, 5, 3, null, 0, 3, 7, 12, 10, 7, 5, null, 3, 2, 0, null, null, null, null, null], b: [0, -4, -2, -5] },
  robohome: { base: 523.25, ms: 150, n: [0, 0, 7, 7, 4, 4, 0, null, 2, 2, 9, 9, 5, 5, 2, null, 4, 4, 11, 11, 7, 7, 4, null, 12, 7, 4, 0, null, null, null, null], b: [0, -5, -3, -7] },
});
STICKERS.push(
  { id: 'cratefarm', k: 'sunflower', name: 'Соняшник' },
  { id: 'owlwatch', k: 'owl', name: 'Сова' },
  { id: 'icecrates', k: 'penguin', name: 'Пінгвін' },
  { id: 'nightmuseum', k: 'dino', name: 'Динозаврик' },
  { id: 'robohome', k: 'robot', name: 'Робот' },
);

/* ===== Підготовка рівня ===== */
function initLevel31(G, L) {
  G.crates = (L.crates || []).map(c => ({ x: c.x, y: c.y, x0: c.x, y0: c.y, goal: c.goal, ox: 0, oy: 0, push: 0, pdir: 0, slide: 0, fallT: 0 }));
  for (const c of G.crates) G.map[c.y * G.Wt + c.x] = 2;
  G.bplates = (L.bplates || []).map(p => Object.assign({ down: false }, p));
  G.bgates = (L.bgates || []).map(g => Object.assign({ open: false, hold: 0 }, g));
  G.owls = (L.owls || []).map(o => Object.assign({ ph: 'green', t: 0, dur: 3.2, done: false, caughtT: 0, grace: 0, seen: false }, o));
  const def = G.def || {}, st = stickerOf(def.id);
  G.pieces = (L.pieces || []).map((p, i) => ({ x: p.x, y: p.y, i, got: false }));
  G.pieceHad = hasSticker(def.id); G.pieceSt = st;
  initLevel32(G, L);
}

/* ===== Ящики: штовхаєш, коли йдеш у нього по землі; падає, якщо під ним порожньо; на льоду ковзає ===== */
function crateAt(x, y) { return G.crates.find(c => c.x === x && c.y === y); }
function crateFree(x, y) { return tileAt(x, y) === 0 && !overlap(G.P, { x: x * T, y: y * T, w: T, h: T }); }
function crateMove(c, dx, dy) {
  G.map[c.y * G.Wt + c.x] = 0; c.x += dx; c.y += dy; G.map[c.y * G.Wt + c.x] = 2;
  c.ox -= dx * T; c.oy -= dy * T;
}
function updateCrates(dt) {
  const P = G.P, iceTheme = THEMES[G.theme].ice;
  for (const c of G.crates) {
    // плавно доїжджаємо до своєї клітинки
    c.ox = Math.abs(c.ox) < 1 ? 0 : c.ox - Math.sign(c.ox) * Math.min(Math.abs(c.ox), 190 * dt);
    c.oy = Math.abs(c.oy) < 1 ? 0 : c.oy - Math.sign(c.oy) * Math.min(Math.abs(c.oy), 420 * dt);
    if (c.ox || c.oy) continue;
    // падає, якщо під ним порожньо
    if (c.y < 11 && tileAt(c.x, c.y + 1) === 0 && crateFree(c.x, c.y + 1)) { crateMove(c, 0, 1); if (!c.falling) { c.falling = true; } continue; }
    if (c.falling) { c.falling = false; Snd.tone(110, 0.1, 'triangle', 0.06, 70); burst(c.x * T + 12, c.y * T + T, 6, ['#d8b080', '#ffffff'], 70); }
    if (c.y >= 11 && tileAt(c.x, c.y + 1) === 0) { /* лежить на самому дні */ }
    // ковзає по льоду
    if (c.slide && iceTheme && tileAt(c.x, c.y + 1) === 1 && crateFree(c.x + c.slide, c.y)) { crateMove(c, c.slide, 0); continue; }
    c.slide = 0;
  }
  // штовхаємо
  if (P.onGround && !P.mount && !P.sled) {
    const dir = In.right ? 1 : In.left ? -1 : 0;
    const fx = Math.floor((dir > 0 ? P.x + P.w + 1 : P.x - 1) / T), fy = Math.floor((P.y + P.h - 4) / T);
    const c = dir ? G.crates.find(k => k.x === fx && k.y === fy && !k.ox && !k.oy) : null;
    for (const k of G.crates) if (k !== c) k.push = 0;
    if (c) {
      if (c.pdir !== dir) { c.push = 0; c.pdir = dir; }
      c.push += dt;
      if (c.push > 0.16) {
        c.push = 0;
        const above = crateAt(c.x, c.y - 1);
        if (!above && crateFree(c.x + dir, c.y)) {
          crateMove(c, dir, 0); Snd.tone(150, 0.07, 'square', 0.03, 120);
          if (iceTheme && tileAt(c.x, c.y + 1) === 1) c.slide = dir;
          if (!G.crateHint) { G.crateHint = true; say('Ящик їде! Штовхай його, куди треба', 2); }
        } else if (!c.stuckHint && c.x !== c.goal) { c.stuckHint = true; say('Далі ящик не їде — там перешкода', 1.8); }
      }
    }
  }
  // упав за край екрана — повертається на своє місце
  for (const c of G.crates) if (c.y >= 12) { G.map[c.y * G.Wt + c.x] = 0; c.x = c.x0; c.y = c.y0; G.map[c.y * G.Wt + c.x] = 2; c.ox = c.oy = 0; }
}

/* ===== Кнопки під ящик і ворота ===== */
function updateBoxGates(dt) {
  const P = G.P;
  for (const p of G.bplates) {
    const byCrate = !!crateAt(p.x, p.row - 1), byP = overlap(P, { x: p.x * T + 2, y: p.row * T - 6, w: T - 4, h: 8 });
    const was = p.down; p.down = byCrate || byP; p.crate = byCrate;
    if (p.down && !was) Snd.tone(330, 0.1, 'square', 0.05, 220);
  }
  for (const g of G.bgates) {
    const p = G.bplates.find(q => q.id === g.plate), want = !!(p && p.down);
    if (want) g.hold = 0.35; else if (g.hold > 0) g.hold -= dt;
    const open = want || g.hold > 0;
    if (open && !g.open) {
      g.open = true; for (let y = 1; y < 10; y++) G.map[y * G.Wt + g.x] = 0; Snd.seq([0, 7, 12], 523.25, 0.06, 'triangle', 0.05);
      if (p && p.crate && !g.said) { g.said = true; say('Ящик тисне на кнопку — ворота відчинені!', 2.2); }
    } else if (!open && g.open && !overlap(P, { x: g.x * T, y: 0, w: T, h: 10 * T })) {
      g.open = false; for (let y = 1; y < 10; y++) G.map[y * G.Wt + g.x] = 2; Snd.tone(200, 0.1, 'square', 0.04, 140);
      if (!g.hintClose) { g.hintClose = true; say('Ворота зачинилися, щойно ти зійшла з кнопки. Посунь на кнопку ящик!', 2.8); }
    }
    if (!g.open && doorTouch(g.x, 1) && !(g.hintT > 0)) { g.hintT = 4; say('Ворота відчиняє кнопка. Поклади на неї ящик!', 2.4); }
    if (g.hintT > 0) g.hintT -= dt;
  }
}

/* ===== Сова-сторож: поки спить — іди, коли розплющує очі — завмри ===== */
function updateOwls(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const o of G.owls) {
    const inside = pcx > o.x0 * T - T && pcx < o.x1 * T;
    if (o.done) continue;
    if (pcx > o.x1 * T + T) {
      o.done = true; G.points += 3; floatText(pcx, P.y - 16, '+3', '#ff8a3d'); Snd.seq([0, 4, 7, 12], 659.25, 0.07, 'triangle', 0.06);
      say('Ти тихенько прокралася повз сову!', 2.4); continue;
    }
    if (!inside && o.ph === 'green') { o.t = 0; continue; }
    if (!o.seen && inside) { o.seen = true; say('Сова-сторож! Поки вона спить — іди. Коли прокидається — завмри й не стрибай!', 3.2); }
    o.t += dt; if (o.caughtT > 0) o.caughtT -= dt;
    if (o.ph === 'green' && o.t > o.dur) { o.ph = 'yellow'; o.t = 0; Snd.seq([7, 5], 392, 0.12, 'triangle', 0.05); }
    else if (o.ph === 'yellow' && o.t > 0.9) { o.ph = 'red'; o.t = 0; o.grace = 0.3; Snd.seq([0, 12], 330, 0.1, 'square', 0.05); }
    else if (o.ph === 'red' && o.t > 2.2) { o.ph = 'green'; o.t = 0; o.dur = 2.6 + Math.random() * 1.6; }
    o.left = o.ph === 'green' ? o.dur - o.t : o.ph === 'yellow' ? 0.9 - o.t : 2.2 - o.t;
    if (o.ph === 'red' && inside) {
      if (o.grace > 0) { o.grace -= dt; continue; }
      if (Math.abs(P.vx) > 25 || !P.onGround) {
        o.caughtT = 1.2; o.caught = (o.caught || 0) + 1;
        burst(pcx, P.y + 10, 12, ['#ffffff', '#c8b8ff'], 120);
        P.x = o.x0 * T - T - P.w / 2; P.y = o.gy - P.h - 1; P.vx = P.vy = 0; P.safe = { x: P.x, y: P.y };
        burst(P.x + P.w / 2, P.y + 10, 12, ['#ffffff', '#c8b8ff'], 120); Snd.tone(220, 0.25, 'square', 0.05, 140);
        say(o.caught === 1 ? 'У-гу! Сова побачила, що ти рухалась. Повертайся на старт і пробуй знову' : 'Сова побачила! Ще раз — і уважно дивись на сову', 2.6);
        o.ph = 'green'; o.t = 0; o.dur = 2.4;
      }
    }
  }
}

/* ===== Пазл-наліпка: чотири шматочки складаються в наліпку ===== */
function updatePieces(dt) {
  const P = G.P;
  for (const p of G.pieces) {
    if (p.got || !overlap(P, { x: p.x - 12, y: p.y - 12, w: 24, h: 24 })) continue;
    p.got = true; G.points += 2; burst(p.x, p.y, 12, RAINBOW, 120); Snd.star(p.i + 3);
    const n = G.pieces.filter(q => q.got).length;
    floatText(p.x, p.y - 16, n + '/' + G.pieces.length, '#a05ad8');
    if (n === G.pieces.length && G.pieceSt) {
      Snd.seq([0, 4, 7, 12, 16, 19], 784, 0.06, 'triangle', 0.07); burst(P.x + P.w / 2, P.y, 24, RAINBOW, 170);
      if (G.pieceHad) say('Пазл зібрано! Наліпка «' + G.pieceSt.name + '» вже є в альбомі', 2.6);
      else {
        save.stickers = save.stickers || {}; save.stickers[G.def.id] = 1; writeSave();
        say('Пазл зібрано! Наліпка «' + G.pieceSt.name + '» тепер у твоєму альбомі. Зібрано ' + Object.keys(save.stickers).length + ' з ' + STICKERS.length, 3.2);
      }
    } else if (n === 1) say('Шматочок пазла! Збери всі чотири — і складеться наліпка', 2.6);
  }
}

function update31(dt) {
  updateCrates(dt);
  updateBoxGates(dt);
  updateOwls(dt);
  updatePieces(dt);
  update32(dt);
}

/* ===== Робот-пилосос Хрумчик: їздить ареною, а потім засмоктує; влучай рогом у трубу, коли він тягне ===== */
BOSS2.vacuum = L => ({ kind: 'vacuum', name: 'Робот-пилосос Хрумчик', acc: 'Робота-пилососа Хрумчика', win: ' Тепер він прибирає тільки сміття й крихти після свята.', x: L.arena.x0 + 22 * T, gy: 10 * T, y: 10 * T - 22, hw: 24, hh: 22, hp: 24, max: 24, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, vx: 0, gulps: 0, spin: 0, dust: [] });
function vacNozzle(B) { return { x: B.dir > 0 ? B.x + 18 : B.x - 18 - 40, y: B.gy - 34, w: 40, h: 34 }; }
function updateVacuumBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena, left = A.x0 + 40, right = A.x0 + 25 * T;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'roam'; B.st = 0; Music.start('boss'); say('Робот-пилосос Хрумчик: «Ж-ж-ж! Зараз усе засмокчу!»', 2.8); G.flash = 0.3; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2;
  for (const d of B.dust) d.t += dt; B.dust = B.dust.filter(d => d.t < d.life);
  if (B.state === 'roam') {
    B.dir = pcx < B.x ? -1 : 1;
    B.vx += (B.dir * (angry ? 135 : 105) - B.vx) * Math.min(1, dt * 3);
    B.x += B.vx * dt; B.spin += B.vx * dt / 10;
    if (B.x < left) { B.x = left; B.vx = Math.abs(B.vx); } if (B.x > right) { B.x = right; B.vx = -Math.abs(B.vx); }
    if (B.st > (angry ? 2.2 : 2.8)) { B.state = 'aim'; B.st = 0; B.vx = 0; Snd.seq([0, 4, 7], 220, 0.1, 'sawtooth', 0.04); }
  } else if (B.state === 'aim') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > 0.6) { B.state = 'suck'; B.st = 0; B.gulps = 0; if (!B.suckHint) { B.suckHint = true; say('Хрумчик засмоктує! Влуч рогом йому в трубу — він подавиться. Але не дай себе затягти', 3); } }
  } else if (B.state === 'suck') {
    // тягне до себе: що ближче, то сильніше
    const d = (B.x - pcx) * B.dir;
    if (d < 0 && d > -10 * T && Math.abs(P.y + P.h - B.gy) < 3 * T) {
      const pull = (angry ? 95 : 75) * (1 + (10 * T + d) / (10 * T) * 0.5), nx = P.x - B.dir * pull * dt;
      const tx = Math.floor((B.dir > 0 ? nx : nx + P.w) / T);
      if (!solid(tileAt(tx, Math.floor((P.y + 6) / T))) && !solid(tileAt(tx, Math.floor((P.y + P.h - 4) / T)))) P.x = nx;
    }
    if (Math.random() < dt * 14) B.dust.push({ x: B.x + B.dir * (60 + Math.random() * 120), y: B.gy - 4 - Math.random() * 40, t: 0, life: 0.5 });
    if ((B.st * 10 | 0) % 3 === 0) Snd.tone(90 + Math.random() * 20, 0.08, 'sawtooth', 0.015);
    const nz = vacNozzle(B);
    for (const s of G.shots) if (s.life > 0 && circleRect(s, nz, 4)) {
      s.life = 0; B.gulps++; hitBoss(1); burst(s.x, s.y, 6, ['#ffffff', '#ffe14d'], 90); floatText(B.x, B.gy - 60, 'Гульк!', '#ff7a3d');
      if (B.dead) return;
      if (B.gulps >= 3) { B.state = 'choke'; B.st = 0; Snd.seq([12, 7, 0], 330, 0.1, 'square', 0.05); say(B.chokeHint ? 'Хрумчик подавився! Стрибай на нього!' : 'Апчхи! Хрумчик подавився й зупинився. Стрибни на нього згори!', 2.6); B.chokeHint = true; break; }
    }
    if (B.state === 'suck' && B.st > (angry ? 3.6 : 3.2)) { B.state = 'roam'; B.st = 0; }
  } else if (B.state === 'choke') {
    if (Math.random() < dt * 8) B.dust.push({ x: B.x - B.dir * 10 + (Math.random() - 0.5) * 20, y: B.gy - 50, t: 0, life: 0.9, smoke: true });
    if (B.st > 2.6) { B.state = 'roam'; B.st = 0; }
  }
  // дотик
  const box = { x: B.x - 26, y: B.gy - 44, w: 52, h: 44 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (stomp && B.state === 'choke') { hitBoss(3); P.vy = -480; P.cut = true; if (!B.dead) { B.state = 'roam'; B.st = 0; B.vx = 0; } }
    else if (stomp) { P.vy = -430; P.cut = true; Snd.boing(); }
    else if (B.state === 'roam' || B.state === 'suck') { hurtPlayer(false); P.vx = (pcx < B.x ? -1 : 1) * 280; P.launchT = 0.3; if (B.state === 'suck') { B.state = 'roam'; B.st = 0; } }
  }
}
const armored19base36 = armored19;
armored19 = function (s, B) {
  if (B.kind === 'vacuum') {
    if (B.state === 'choke') return false;
    Snd.tink(); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint && B.state !== 'suck') { B.armHint = true; say('Хрумчик залізний! Чекай, поки він почне засмоктувати, і влуч у трубу', 2.6); }
    return true;
  }
  return armored19base36(s, B);
};
const resetBoss19base36 = resetBoss19;
resetBoss19 = function (B) {
  if (B.kind === 'vacuum') { B.state = 'roam'; B.st = 0; B.vx = 0; const pcx = G.P.x + G.P.w / 2; if (Math.abs(B.x - pcx) < 8 * T) B.x = G.arena.x0 + 22 * T; return; }
  resetBoss19base36(B);
};
