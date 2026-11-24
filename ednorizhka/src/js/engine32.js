'use strict';
/* ===== Частина 37 «Фарби, гніздечка й фото»: розфарбуй плитки, віднеси річ, сфотографуй звірятко і Пітьмик ===== */
Object.assign(TUNES, {
  paintpark: { base: 587.33, ms: 160, n: [0, 4, 7, 12, 9, 7, 4, null, 2, 5, 9, 14, 12, 9, 5, null, 4, 7, 11, 16, 14, 11, 7, null, 12, 9, 7, 4, 0, null, null, null], b: [0, -5, -3, -7] },
  nestvalley: { base: 659.25, ms: 175, n: [0, 2, 4, null, 7, 4, 2, null, 0, 2, 4, 7, 9, 7, 4, null, 5, 7, 9, null, 12, 9, 7, null, 4, 2, 0, null, null, null, null, null], b: [0, -5, -3, -7] },
  photosafari: { base: 523.25, ms: 165, n: [0, null, 4, 7, 9, null, 7, 4, 5, null, 9, 12, 14, null, 12, 9, 7, null, 11, 14, 16, null, 14, 11, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
  colorfactory: { base: 554.37, ms: 150, n: [0, 7, 4, 7, 0, 7, 4, 7, 2, 9, 5, 9, 2, 9, 5, 9, 4, 11, 7, 11, 4, 11, 7, 11, 12, 7, 4, 0, null, null, null, null], b: [0, -5, -3, -7] },
  gloomtower: { base: 440, ms: 200, n: [0, 3, 7, null, 8, 7, 3, null, 0, 3, 7, 12, 10, 8, 7, null, 5, 8, 12, null, 10, 8, 7, null, 3, 2, 0, null, null, null, null, null], b: [0, -4, -2, -5] },
});
STICKERS.push(
  { id: 'paintpark', k: 'brush', name: 'Пензлик' },
  { id: 'nestvalley', k: 'bird', name: 'Пташка' },
  { id: 'photosafari', k: 'camera', name: 'Фотоапарат' },
  { id: 'colorfactory', k: 'palette', name: 'Палітра' },
  { id: 'gloomtower', k: 'lamp', name: 'Лампочка' },
);
const CARRY_UA = { egg: 'яєчко', bone: 'кісточку', apple: 'яблучко' };
const CARRY_TO = { egg: 'мами-пташки', bone: 'цуцика', apple: 'їжачка' };
const CRITTER_UA = { hedgehog: 'Їжачок', squirrel: 'Білочка', mole: 'Кротик', fox: 'Лисеня', chick: 'Курчатко', zebra: 'Зебра', meerkat: 'Сурикат' };
const PAINT_COLS = ['#ff5c7a', '#ffb347', '#ffd23f', '#7ed957', '#4cb6ff', '#a05ad8', '#ff7ab8'];

/* ===== Підготовка рівня ===== */
function initLevel32(G, L) {
  G.ptiles = (L.ptiles || []).map((p, i) => Object.assign({ done: false, i, flash: 0 }, p));
  G.pgates = (L.pgates || []).map(g => Object.assign({ open: false, hintT: 0 }, g));
  G.carries = (L.carries || []).map(c => Object.assign({ state: 'idle', x: c.x0, y: c.y0, vy: 0, done: false }, c));
  G.dgates = (L.dgates || []).map(g => Object.assign({ open: false, hintT: 0 }, g));
  G.critters = (L.critters || []).map((k, i) => Object.assign({ up: 0, t: 1 + i * 0.7, show: false, shot: false, i }, k));
  G.photoDone = false; G.lastHearts = G.P.hearts; G.P.hold = null;
}

/* ===== Розфарбуй плитки: стань на кожну — і ворота відчиняться ===== */
function updatePaint(dt) {
  const P = G.P;
  for (const p of G.ptiles) if (p.flash > 0) p.flash -= dt;
  if (P.onGround) {
    const fy = Math.floor((P.y + P.h + 2) / T);
    for (const fx of [Math.floor((P.x + 3) / T), Math.floor((P.x + P.w - 3) / T)]) {
      const p = G.ptiles.find(q => !q.done && q.x === fx && q.y === fy);
      if (!p) continue;
      p.done = true; p.flash = 0.4; G.points++;
      const grp = G.ptiles.filter(q => q.g === p.g), n = grp.filter(q => q.done).length;
      Snd.tone(392 * Math.pow(2, (n % 8) / 8), 0.08, 'triangle', 0.05); burst(p.x * T + 12, p.y * T, 6, [PAINT_COLS[p.i % PAINT_COLS.length], '#ffffff'], 70);
      if (!G.paintHint) { G.paintHint = true; say('Плитка розфарбувалася! Розфарбуй усі сірі плитки — і ворота відчиняться', 3); }
      if (n === grp.length) {
        const g = G.pgates.find(q => q.g === p.g);
        if (g && !g.open) { g.open = true; openColumn(g.x, g.top); Snd.seq([0, 4, 7, 12, 16], 659.25, 0.07, 'triangle', 0.07); say('Усе розфарбовано! Ворота відчинилися', 2.4); }
      }
    }
  }
  for (const g of G.pgates) {
    if (g.hintT > 0) g.hintT -= dt;
    if (!g.open && doorTouch(g.x, g.top) && !(g.hintT > 0)) {
      const left = G.ptiles.filter(q => q.g === g.g && !q.done).length;
      g.hintT = 4; say('Ще ' + left + ' ' + (left === 1 ? 'сіра плитка' : left < 5 ? 'сірі плитки' : 'сірих плиток') + '. Пострибай по них — і ворота відчиняться', 2.6);
    }
  }
}

/* ===== Віднеси річ: яєчко в гніздечко, кісточку цуцикові, яблучко їжачкові ===== */
function carryGround(x, y) {
  const tx = Math.floor(x / T);
  for (let ty = Math.max(0, Math.floor(y / T)); ty < 12; ty++) if (solid(tileAt(tx, ty))) return ty * T - 10;
  return null;
}
function updateCarry(dt) {
  const P = G.P, hurt = P.hearts < G.lastHearts; G.lastHearts = P.hearts;
  for (const c of G.carries) {
    if (c.done) continue;
    if (c.state === 'idle') {
      if (!P.hold && overlap(P, { x: c.x - 12, y: c.y - 12, w: 24, h: 24 })) {
        c.state = 'held'; P.hold = c; Snd.seq([0, 7], 659.25, 0.06, 'triangle', 0.05);
        say('Ти взяла ' + CARRY_UA[c.k] + '! Віднеси до ' + CARRY_TO[c.k], 2.6);
      }
    } else if (c.state === 'held') {
      c.x = P.x + P.w / 2; c.y = P.y - 12;
      if (hurt) {
        c.state = 'fall'; c.vy = -120; P.hold = null; say('Ой, впустила! Підніми ще раз', 1.8);
      } else if (overlap(P, { x: c.tx * T - 10, y: c.ty * T - 40, w: T + 20, h: 50 })) {
        c.done = true; c.state = 'given'; P.hold = null; G.points += 3; c.joy = 2;
        floatText(c.tx * T + 12, c.ty * T - 40, '+3', '#ff8a3d'); burst(c.tx * T + 12, c.ty * T - 20, 18, RAINBOW, 140);
        Snd.seq([0, 4, 7, 12, 16], 784, 0.06, 'triangle', 0.07);
        say({ egg: 'Мама-пташка дякує! Яєчко знову в гніздечку', bone: 'Цуцик радіє кісточці й махає хвостиком!', apple: 'Їжачок дякує за яблучко!' }[c.k], 2.6);
        const g = G.dgates.find(q => q.c === c.id);
        if (g && !g.open) { g.open = true; openColumn(g.x, g.top); }
      }
    } else if (c.state === 'fall') {
      c.vy += 900 * dt; c.y += c.vy * dt;
      const gy = carryGround(c.x, c.y - 10);
      if (gy == null || c.y > VIEW_H) { c.x = c.x0; c.y = c.y0; c.state = 'idle'; }
      else if (c.vy > 0 && c.y >= gy) { c.y = gy; c.state = 'idle'; }
    }
  }
  for (const c of G.carries) if (c.joy > 0) c.joy -= dt;
  for (const g of G.dgates) {
    if (g.hintT > 0) g.hintT -= dt;
    if (!g.open && doorTouch(g.x, g.top) && !(g.hintT > 0)) { const c = G.carries.find(q => q.id === g.c); g.hintT = 4; if (c) say('Ворота відчиняться, коли віднесеш ' + CARRY_UA[c.k] + ' до ' + CARRY_TO[c.k], 2.6); }
  }
}

/* ===== Фотополювання: звірятко визирає — влуч рогом, і клац! ===== */
function updateCritters(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const k of G.critters) {
    if (k.shot) { k.up = Math.max(0, k.up - dt * 2); if (k.card > 0) k.card -= dt; continue; }
    const near = Math.abs(k.x - pcx) < 10 * T;
    k.t -= dt;
    if (k.show) { k.up = Math.min(1, k.up + dt * 5); if (k.t <= 0) { k.show = false; k.t = 2 + Math.random() * 1.5; } }
    else { k.up = Math.max(0, k.up - dt * 5); if (k.t <= 0 && near) { k.show = true; k.t = 1.8; if (!G.critterHint) { G.critterHint = true; say('Ой, хтось визирнув із кущика! Влуч рогом, поки видно, — і буде фото', 2.8); } } }
    if (k.up > 0.6) for (const s of G.shots) if (s.life > 0 && Math.abs(s.x - k.x) < 14 + s.r && Math.abs(s.y - (k.y - 10)) < 16 + s.r) {
      s.life = 0; k.shot = true; k.card = 2.2; G.points += 2; G.flash = 0.12;
      Snd.seq([12, 0], 1046, 0.05, 'square', 0.05); burst(k.x, k.y - 12, 10, ['#ffffff', '#fff6cc'], 120);
      const n = G.critters.filter(q => q.shot).length;
      say('Клац! ' + CRITTER_UA[k.k] + ' у фотоальбомі. Фото ' + n + ' з ' + G.critters.length, 2.2);
      if (n === G.critters.length && !G.photoDone) {
        G.photoDone = true;
        const st = { x: pcx, y: P.y + 6, rainbow: true, got: false }; G.stars.push(st); collect(st);
        Snd.seq([0, 4, 7, 12, 16], 659.25, 0.08, 'triangle', 0.07); say('Усі звірятка сфотографовано! Тримай веселкову зірочку', 2.8);
      }
      break;
    }
  }
}

function update32(dt) {
  updatePaint(dt);
  updateCarry(dt);
  updateCritters(dt);
}

/* ===== Пітьмик: у темряві його не взяти, а від світла лампи він злякано меншає ===== */
BOSS2.gloom = L => ({ kind: 'gloom', name: 'Пітьмик', acc: 'Пітьмика', win: ' Тепер він не боїться світла й світить ліхтариком усім, хто заблукав.', x: L.arena.x0 + 17 * T, gy: 10 * T, y: 10 * T - 80, hw: 22, hh: 22, hp: 24, max: 24, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, light: 0, throwT: 2, lamps: [{ x: L.arena.x0 + 5 * T, cd: 0 }, { x: L.arena.x0 + 15 * T, cd: 0 }], sc: 1, bx: 0 });
function lampHandle(l) { return { x: l.x, y: 6 * T - 6, w: 20, h: 24 }; }
function updateGloomBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena, left = A.x0 + 2 * T, right = A.x0 + 19 * T, pcx = P.x + P.w / 2;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; B.light = Math.max(B.light, 1); G.dark = false; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'dark'; B.st = 0; Music.start('boss'); G.flash = 0.3; say('Пітьмик: «Хі-хі! Я вимкнув світло. Тепер мене не видно!»', 2.8); }
    return;
  }
  B.st += dt;
  for (const l of B.lamps) {
    if (l.cd > 0) l.cd -= dt;
    if (B.light <= 0 && l.cd <= 0 && overlap(P, lampHandle(l))) {
      B.light = 4.5; l.cd = 7; B.lit = l; B.hpLit = B.hp; Snd.seq([0, 7, 12, 19], 523.25, 0.06, 'triangle', 0.07); G.flash = 0.25;
      say(B.litHint ? 'Світло!' : 'Світло! Пітьмик злякався й зменшився — стріляй або стрибай на нього, поки світить лампа', 2.8); B.litHint = true;
    }
  }
  if (B.dashT > 0) B.dashT -= dt;
  // за одне світло Пітьмика можна влучити не більше шести разів — тоді він дмухає на лампу
  if (B.light > 0 && B.hpLit - B.hp >= 6) { B.light = 0.001; B.blew = true; for (const l of B.lamps) l.cd = Math.max(l.cd, 2.5); }
  if (B.inv > 0) B.inv -= dt;
  if (B.light > 0) { B.light -= dt; if (B.light <= 0) { B.light = 0; G.flash = 0.15; Snd.tone(300, 0.2, 'sine', 0.05, 150); say(B.blew ? 'Пітьмик дмухнув на лампу — фух, і темно! Смикни ланцюжок іншої лампи' : 'Лампа згасла. Смикни ланцюжок іншої лампи!', 2.4); B.blew = false; } }
  const lit = B.light > 0;
  G.dark = !lit; B.hw = B.hh = 22 * B.sc;
  B.sc += ((lit ? 0.62 : 1) - B.sc) * Math.min(1, dt * 4);
  if (lit) {
    // тікає від лампи, низенько, щоб можна було на нього стрибнути
    const ty = B.gy - 26;
    if (B.dashT > 0) { B.x += B.dashDir * 250 * dt; B.dir = B.dashDir; }
    else { const away = B.x < B.lit.x ? -1 : 1; B.x += away * 70 * dt; B.dir = away; }
    B.y += (ty - B.y) * Math.min(1, dt * 3);
  } else {
    // у темряві підлітає до єдиноріжки й кидає клубочки темряви
    const ty = B.gy - 80 + Math.sin(B.t * 2) * 12;
    B.dir = pcx < B.x ? -1 : 1;
    const dd = Math.abs(pcx - B.x);
    if (dd > 5 * T) B.x += B.dir * 60 * dt; else if (dd < 3 * T) B.x -= B.dir * 100 * dt;
    B.y += (ty - B.y) * Math.min(1, dt * 2);
    B.throwT -= dt;
    if (B.throwT <= 0 && dd > 2.5 * T) {
      B.throwT = B.hp <= B.max / 2 ? 1.4 : 1.9;
      const dx = pcx - B.x, dy = (P.y + 12) - B.y, d = Math.hypot(dx, dy) || 1, sp = 130;
      G.bolts.push({ kind: 'gloomorb', x: B.x, y: B.y, vx: dx / d * sp, vy: dy / d * sp, r: 7, t: 0 });
      Snd.tone(180, 0.12, 'sine', 0.04, 120);
    }
  }
  B.x = Math.max(left, Math.min(right, B.x));
  const box = { x: B.x - 22 * B.sc, y: B.y - 22 * B.sc, w: 44 * B.sc, h: 44 * B.sc };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (stomp && lit && !(B.dashT > 0)) {
      hitBoss(3); P.vy = -480; P.cut = true;
      // після удару швиденько відлітає туди, де від єдиноріжки далі
      B.dashT = 0.8; B.dashDir = pcx - left > right - pcx ? -1 : 1;
    }
    else if (stomp) { P.vy = -430; P.cut = true; Snd.boing(); }
    else if (!lit) hurtPlayer(false);
  }
}
SHOOTABLE.gloomorb = 1;
const armored19base37 = armored19;
armored19 = function (s, B) {
  if (B.kind === 'gloom') {
    if (B.light > 0) { if (B.inv > 0 || B.dashT > 0) { Snd.tink(); s.life = 0; return true; } B.inv = 0.35; return false; }
    Snd.tink(); s.life = 0;
    if (!B.armHint) { B.armHint = true; say('У темряві Пітьмика не влучиш. Потягни за ланцюжок лампи!', 2.6); }
    return true;
  }
  return armored19base37(s, B);
};
const resetBoss19base37 = resetBoss19;
resetBoss19 = function (B) {
  if (B.kind === 'gloom') { B.light = 0; for (const l of B.lamps) l.cd = 0; const pcx = G.P.x + G.P.w / 2; if (Math.abs(B.x - pcx) < 6 * T) B.x = pcx < G.arena.x0 + 10 * T ? G.arena.x0 + 17 * T : G.arena.x0 + 4 * T; return; }
  resetBoss19base37(B);
};
