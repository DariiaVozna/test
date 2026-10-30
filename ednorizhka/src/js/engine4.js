'use strict';
/* ===== Частина 8: канатні дороги, попутний вітер, гриб-зменшувач, гойдалки, овечки, Будильник Дзеленчик ===== */
Object.assign(TUNES, {
  peaks: { base: 523.25, ms: 190, n: [0, null, 4, 7, null, 12, null, 7, 4, null, 7, null, 0, null, null, null, 2, null, 5, 9, null, 14, null, 9, 5, null, 7, null, 4, null, null, null], b: [0, -5, -3, -7] },
  windmill: { base: 587.33, ms: 200, n: [0, null, 4, null, 7, null, 9, 7, null, 4, null, 2, 0, null, null, null, 5, null, 9, null, 12, null, 11, 9, null, 7, null, 4, 2, null, null, null], b: [0, -5, -3, -7] },
  tiny: { base: 783.99, ms: 170, n: [0, 2, 4, null, 2, 0, null, null, 4, 5, 7, null, 5, 4, null, null, 7, 9, 11, null, 12, null, 7, null, 4, 2, 0, null, null, null, null, null], b: [0, -5, -3, -5] },
  swing: { base: 523.25, ms: 230, n: [0, null, null, 4, null, null, 7, null, 9, null, null, 7, null, null, 4, null, 5, null, null, 9, null, null, 12, null, 11, null, null, 7, null, null, null, null], b: [0, -3, -5, -7] },
  dream: { base: 659.25, ms: 280, n: [7, null, 4, null, 0, null, 4, null, 7, null, 12, null, 11, null, null, null, 9, null, 5, null, 2, null, 5, null, 7, null, 4, null, 0, null, null, null], b: [0, -5, -3, -7] },
});
Object.assign(WALKERS, { ant: 1 });
Object.assign(FLYERS, { spider: 1 });
Object.assign(ENEMY2, { goat: 1, spider: 1 });

function spawnEnemy4(e, b, hover, g) {
  switch (e.k) {
    case 'goat': return g(24, 22, { speed: 26, hp: 2, state: 'walk', st: 0 });
    case 'ant': return g(18, 10, { speed: 40 });
    case 'spider': return Object.assign(b, { w: 16, h: 16, x: e.tx * T + 4, y: e.ty * T, hx: e.tx * T + 12, hy: e.ty * T, top: Math.max(0, e.ty * T - 60), range: 3 * T });
  }
  return spawnEnemy5(e, b, hover, g);
}
function updateEnemy4(e, dt) {
  if (updateEnemy6(e, dt)) return;
  if (e.k === 'turtle') return updateTurtle(e, dt);
  if (e.k === 'spider') { e.x = e.hx - e.w / 2; e.y = e.hy + (0.5 - 0.5 * Math.cos(e.t * 1.3)) * e.range - e.h / 2; return; }
  if (e.k !== 'goat') return;
  const P = G.P, pcx = P.x + P.w / 2, cx = e.x + e.w / 2;
  e.st += dt; let spd = 0;
  if (e.state === 'walk') {
    spd = e.speed;
    if (e.st > 0.4 && Math.abs((P.y + P.h) - (e.y + e.h)) < 30 && (pcx - cx) * e.dir > 0 && Math.abs(pcx - cx) < 160) { e.state = 'prep'; e.st = 0; }
  } else if (e.state === 'prep') { if (e.st > 0.45) { e.state = 'charge'; e.st = 0; if (Math.abs(pcx - cx) < 300) Snd.tone(300, 0.15, 'square', 0.04, 200); } }
  else if (e.state === 'charge') { spd = 150; if (e.st > 1.3) { e.state = 'rest'; e.st = 0; } }
  else if (e.st > 0.9) { e.state = 'walk'; e.st = 0; }
  e.vx = e.dir * spd; e.vy = Math.min(e.vy + GRAV * dt, 600);
  if (moveBody(e, dt)) { e.dir *= -1; if (e.state === 'charge') { e.state = 'rest'; e.st = 0; } }
  else if (e.onGround) {
    const ax = e.dir > 0 ? e.x + e.w + 2 : e.x - 2, v = tileAt(Math.floor(ax / T), Math.floor((e.y + e.h + 4) / T));
    if (!(solid(v) || v === 3)) { e.dir *= -1; if (e.state === 'charge') { e.state = 'rest'; e.st = 0; } }
  }
  if (e.y > VIEW_H + 40) e.dead = true;
}

/* Чи перетинає прямокутник тверді плитки */
function boxSolid(x, y, w, h) {
  for (let ty = Math.floor((y + 0.5) / T); ty <= Math.floor((y + h - 0.5) / T); ty++) for (let tx = Math.floor((x + 0.5) / T); tx <= Math.floor((x + w - 0.5) / T); tx++) if (solid(tileAt(tx, ty))) return true;
  return false;
}
/* Гриб-зменшувач */
function setMini(P, on, time) {
  if (on) {
    if (P.big) setBig(P, false);
    if (P.mount) setMount(P, null);
    if (!P.mini) { P.mini = true; P.x += 5; P.y += 14; P.w = 12; P.h = 16; burst(P.x + 6, P.y + 8, 12, ['#ff5c7a', '#ffffff'], 110); Snd.tone(900, 0.25, 'triangle', 0.06, 400); }
    P.miniT = time || 14;
  } else if (P.mini) {
    P.mini = false; P.x -= 5; P.y -= 14; P.w = 22; P.h = 30; P.miniT = 0;
    burst(P.x + 11, P.y + 15, 12, ['#ff5c7a', '#ffffff'], 110); Snd.tone(400, 0.25, 'triangle', 0.06, 900);
  }
}

/* Канатна дорога: ручка везе по тросу, «Стрибок» — зіскочити раніше */
function rideZip(P, dt) {
  const z = P.zip;
  z.v = Math.min(210, z.v + 320 * dt); z.d = Math.min(z.len, z.d + z.v * dt);
  const k = z.d / z.len; z.hx = z.x0 + (z.x1 - z.x0) * k; z.hy = z.y0 + (z.y1 - z.y0) * k + 8;
  P.dir = z.x1 >= z.x0 ? 1 : -1;
  P.x = z.hx - P.w / 2; P.y = z.hy + 2; P.vx = 0; P.vy = 0; P.onGround = false; P.onMover = null;
  if (In.shootP) { P.charging = true; P.charge = 0; P.chargeSnd = false; }
  if (P.charging) { P.charge += dt; if (P.charge >= 0.55 && !P.chargeSnd) { P.chargeSnd = true; Snd.charged(); } }
  if (In.shootR && P.charging) { fire(P.charge >= 0.55); P.charging = false; P.charge = 0; }
  P.shootCd -= dt; if (P.inv > 0) P.inv -= dt; P.t += dt * 0.6;
  const end = z.d >= z.len;
  if (In.jumpP || end) {
    P.zip = null; z.state = 'back'; P.vx = P.dir * (end ? 120 : 150); P.vy = end ? 0 : -380; P.cut = true;
    if (end) Snd.tone(600, 0.1, 'triangle', 0.05); else Snd.jump();
  }
}
function breezeAt(P) {
  const cx = P.x + P.w / 2;
  for (const z of G.breezes) if (cx > z.x0 && cx < z.x1) return z.p;
  return 0;
}
function updateSheep(m, dt) {
  const x0 = m.x; m.dy = 0;
  m.x += m.dir * m.speed * dt;
  if (m.x + m.w >= m.maxX) { m.x = m.maxX - m.w; m.dir = -1; } else if (m.x <= m.minX) { m.x = m.minX; m.dir = 1; }
  m.dx = m.x - x0;
}

function update4(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const z of G.zips) {
    if (z.state === 'idle') {
      z.d = 0;
      if (!P.zip && !P.inCannon && Math.abs(pcx - z.x0) < 16 && z.y0 + 8 > P.y - 8 && z.y0 + 8 < P.y + P.h) {
        P.zip = z; z.state = 'ride'; z.v = 0; P.vine = null; P.ride = null; Snd.tone(500, 0.2, 'triangle', 0.06, 900);
        if (!G.zipHint) { G.zipHint = true; say('Тримайся! «Стрибок» — щоб зіскочити раніше', 2.2); }
      }
    } else if (z.state === 'ride') { if (P.zip !== z) z.state = 'back'; }
    else { z.d = Math.max(0, z.d - 260 * dt); if (z.d <= 0) z.state = 'idle'; }
    const k = z.d / z.len; z.hx = z.x0 + (z.x1 - z.x0) * k; z.hy = z.y0 + (z.y1 - z.y0) * k + 8;
  }
  for (const p of G.powers) if ((p.k === 'mini' || p.k === 'big') && p.got) { p.reT = (p.reT || 0) + dt; if (p.reT > 4 && Math.abs(pcx - p.x) > 60) { p.got = false; p.reT = 0; } }
  if (P.mini) { P.miniT -= dt; if (P.miniT <= 0) { if (!boxSolid(P.x - 5, P.y - 14, 22, 30)) setMini(P, false); else P.miniT = 0.15; } }
  else if (!P.zip && !P.inCannon && !P.swing && boxSolid(P.x, P.y, P.w, P.h)) setMini(P, true, 2);
  update5(dt);
}

/* ===== Будильник Дзеленчик: стрибає, дзвонить хвилями, а потім засинає ===== */
Object.assign(BOSS2, {
  clock: L => ({ kind: 'clock', name: 'Будильник Дзеленчик', acc: 'Будильника Дзеленчика', win: ' Тепер він дзвонить тільки тоді, коли пора гратися.', x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 34, vx: 0, vy: 0, air: false, hw: 28, hh: 32, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, hops: 0, rings: 0, ringT: 0, hinted: false, sleepHint: false }),
});
function updateClockBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  const ground = B.gy - 34;
  if (B.dead) { B.deadT += dt; B.y += (ground - B.y) * Math.min(1, dt * 6); return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'wake'; B.st = 0; Music.start('boss'); say('Будильник Дзеленчик: «Дзелень-дзелень! Ніхто не спатиме!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 50, right = A.x1 - 50;
  if (B.state === 'wake') { B.y = ground; if (B.st > 0.6) { B.state = 'hop'; B.st = 0; B.hops = angry ? 4 : 3; B.air = false; B.vy = 0; } }
  else if (B.state === 'hop') {
    if (!B.air) {
      B.y = ground;
      if (B.st > 0.3) {
        if (B.hops <= 0) { B.state = 'ring'; B.st = 0; B.rings = angry ? 4 : 3; B.ringT = 0.3; }
        else { B.hops--; B.air = true; B.dir = pcx < B.x ? -1 : 1; B.vy = -400; B.vx = B.dir * (angry ? 150 : 115); Snd.tone(300, 0.1, 'triangle', 0.05, 500); }
      }
    } else {
      B.vy += GRAV * dt; B.x += B.vx * dt; B.y += B.vy * dt;
      if (B.vy > 0 && B.y >= ground) { B.y = ground; B.air = false; B.st = 0; Snd.bump(); burst(B.x, B.gy - 2, 8, ['#ffffff', '#e6dcff'], 90); }
    }
  } else if (B.state === 'ring') {
    B.y = ground; B.dir = pcx < B.x ? -1 : 1; B.ringT -= dt;
    if (B.ringT <= 0) {
      if (B.rings <= 0) { B.state = 'yawn'; B.st = 0; Snd.tone(400, 0.6, 'sine', 0.06, 200); }
      else {
        B.rings--; B.ringT = angry ? 0.5 : 0.65; const high = B.rings % 2 === 1;
        G.bolts.push({ kind: 'ringw', r: 8, high, x: B.x + B.dir * 34, y: high ? B.gy - 54 : B.gy - 11, vx: B.dir * (angry ? 175 : 150), vy: 0, t: 0 });
        Snd.seq([12, 16, 12, 16], 880, 0.04, 'square', 0.04);
        if (!B.hinted) { B.hinted = true; say('Низьку хвилю перестрибуй, а під високою просто стій!', 2.6); }
      }
    }
  } else if (B.state === 'yawn') {
    B.y = ground;
    if (B.st > 0.7) { B.state = 'sleep'; B.st = 0; if (!B.sleepHint) { B.sleepHint = true; say('Дзеленчик задрімав! Стріляй і стрибай на нього!', 2.2); } }
  } else if (B.state === 'sleep') {
    B.y = ground;
    if (B.st > (angry ? 2.6 : 3.2)) { B.state = 'wake'; B.st = 0; Snd.seq([0, 4, 0, 4, 0, 4], 1046, 0.05, 'square', 0.05); G.flash = 0.1; }
  }
  B.x = clamp(B.x, left, right);
  const box = { x: B.x - 26, y: B.y - 30, w: 52, h: 64 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 18;
    if (B.state === 'sleep' || B.state === 'yawn') { if (stomp) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else if (stomp && !B.air) { P.vy = -430; P.cut = true; Snd.tink(); }
    else hurtPlayer(false);
  }
}
