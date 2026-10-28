'use strict';
/* ===== Частина 10: колоди на річці, повітряні змії, пінбол, країна догори дриґом, Сорока Блискітка ===== */
Object.assign(TUNES, {
  river: { base: 523.25, ms: 210, n: [0, null, 4, null, 7, null, 4, null, 9, null, 7, null, 4, null, 2, null, 0, null, 4, null, 7, null, 12, null, 11, null, 9, null, 7, null, null, null], b: [0, -5, -3, -7] },
  kites: { base: 587.33, ms: 190, n: [0, null, null, 7, null, 12, null, 9, null, 7, null, 4, null, null, null, null, 5, null, null, 9, null, 14, null, 12, null, 9, null, 7, null, null, null, null], b: [0, -5, -3, -7] },
  pinball: { base: 659.25, ms: 150, n: [0, 4, 7, 12, null, 7, 4, null, 0, 4, 7, 12, null, 14, 12, null, 5, 9, 12, 17, null, 12, 9, null, 7, 11, 14, 19, null, 14, null, null], b: [0, -3, -7, -5] },
  upside: { base: 523.25, ms: 220, n: [12, null, 7, null, 4, null, 7, null, 12, null, 16, null, 14, null, null, null, 11, null, 7, null, 2, null, 7, null, 11, null, 14, null, 12, null, null, null], b: [0, -5, -7, -3] },
  nest: { base: 493.88, ms: 190, n: [0, null, 3, null, 7, null, 10, 7, null, 5, null, 3, null, null, null, null, 0, null, 3, null, 8, null, 7, 5, null, 3, null, 2, null, null, null, null], b: [0, -4, -2, -5] },
});
Object.assign(WALKERS, { beaver: 1, marble: 1 });
Object.assign(ENEMY2, { leaper: 1, sparrow: 1 });
Object.assign(FLYERS, { sparrow: 1 });
Object.assign(SWIMMERS, { leaper: 1 });
Object.assign(SHOOTABLE, { cone: 1 });

function spawnEnemy6(e, b, hover, g) {
  switch (e.k) {
    case 'beaver': return g(24, 20, { speed: 30, hp: 2 });
    case 'marble': return g(18, 18, { speed: 95 });
    case 'leaper': { const base = e.ty * T + 20; return Object.assign(b, { w: 18, h: 16, x: e.tx * T + 3, y: base, baseY: base, state: 'wait', st: Math.random() * 1.6, period: 2.3, ghost: true, dir: e.tx % 2 ? -1 : 1 }); }
    case 'sparrow': return Object.assign(b, { w: 20, h: 14, x: e.tx * T, y: e.ty * T + 5, hy: e.ty * T + 12, x0: (e.tx - 14) * T, x1: (e.tx + 3) * T, speed: 80, dir: -1 });
  }
  return spawnEnemy7(e, b, hover, g);
}
/* Повертає true, якщо ворог із цієї частини */
function updateEnemy6(e, dt) {
  if (e.k === 'leaper') {
    e.st += dt;
    if (e.state === 'wait') { e.ghost = true; e.y = e.baseY; if (e.st > e.period) { e.state = 'warn'; e.st = 0; } }
    else if (e.state === 'warn') {
      e.ghost = true; e.y = e.baseY - 2 + Math.sin(e.st * 30) * 1.5;
      if (e.st > 0.6) { e.state = 'air'; e.st = 0; e.vy = -500; e.vx = e.dir * 60; e.ghost = false; if (Math.abs(e.x - G.P.x) < 360) Snd.splash(); }
    } else {
      e.vy += GRAV * 0.75 * dt; e.x += e.vx * dt; e.y += e.vy * dt; e.dir = e.vx >= 0 ? 1 : -1;
      if (e.vy > 0 && e.y >= e.baseY) { e.state = 'wait'; e.st = 0; e.y = e.baseY; e.dir *= -1; e.ghost = true; if (Math.abs(e.x - G.P.x) < 360) Snd.splash(); }
    }
    return true;
  }
  if (e.k === 'sparrow') {
    e.x += e.dir * e.speed * dt; if (e.x < e.x0) e.x = e.x1;
    e.y = e.hy + Math.sin(e.t * 3) * 7 - e.h / 2;
    e.ghost = e.x - e.x0 < 20 || e.x1 - e.x < 20;   // напівпрозорий на краях — не чіпляє
    return true;
  }
  return updateEnemy7(e, dt);
}

/* ===== Підготовка рівня ===== */
function initLevel6(G, L) {
  G.kites = (L.kites || []).map(k => Object.assign({}, k));
  G.bumpers = (L.bumpers || []).map(b => Object.assign({}, b));
  G.lightSets = (L.lightSets || []).map(s => ({ done: false, lamps: s.lamps.map(l => Object.assign({}, l)) }));
  G.flips = L.flips || [];
  G.P.flip = false; G.P.kite = null;
}

/* ===== Річка: течія штовхає вперед, колоди пливуть і пірнають ===== */
function flowAt(P) {
  const z = waterAt(P.x + P.w / 2, P.y + P.h / 2);
  return z && z.flow ? z.flow : 0;
}
function updateLog(m, dt) {
  const x0 = m.x, y0 = m.y; m.st += dt;
  const bob = Math.sin(G.t * 2.2 + m.ph) * 1.5;
  let jump = false;
  if (m.state === 'float') { m.x += m.v * dt; m.y = m.by + bob; if (m.x + m.w >= m.xEnd) { m.state = 'sink'; m.st = 0; } }
  else if (m.state === 'sink') {
    m.x += m.v * 0.5 * dt; m.y = m.by + bob + Math.min(1, m.st / 0.5) * 16;
    if (m.st > 0.5) { m.state = 'gone'; m.st = 0; if (G.P.onMover === m) G.P.onMover = null; if (Math.abs(m.x - G.P.x) < 420) Snd.tone(300, 0.2, 'sine', 0.05, 150); }
  } else if (m.state === 'gone') { m.y = m.by + 16; if (m.st > 0.8) { m.state = 'rise'; m.st = 0; m.x = m.xStart; jump = true; } }
  else { m.x += m.v * 0.5 * dt; m.y = m.by + bob + (1 - Math.min(1, m.st / 0.5)) * 16; if (m.st > 0.5) { m.state = 'float'; m.st = 0; } }
  m.dx = (m.state === 'gone' || jump) ? 0 : m.x - x0; m.dy = jump ? 0 : m.y - y0;
}

/* ===== Повітряний змій: тримай «Стрибок» — вище, відпусти — нижче ===== */
const KITE_SPEED = 120;
function rideKite(P, dt) {
  const k = P.kite;
  const want = In.jump ? -130 : 75;
  k.vy += (want - k.vy) * Math.min(1, dt * 3.5);
  P.y += k.vy * dt;
  if (P.y < k.yMin) { P.y = k.yMin; k.vy = Math.max(0, k.vy); }
  if (P.y > k.yMax) { P.y = k.yMax; k.vy = Math.min(0, k.vy); }
  P.x += KITE_SPEED * dt; P.dir = 1; P.vx = 0; P.vy = 0; P.onGround = false; P.onMover = null;
  k.hx = P.x + P.w / 2; k.hy = P.y - 2;
  k.kx = k.hx + 34 + Math.sin(G.t * 2) * 5; k.ky = Math.max(10, k.hy - 84 + Math.sin(G.t * 2.6) * 6);
  if (In.shootP) { P.charging = true; P.charge = 0; P.chargeSnd = false; }
  if (P.charging) { P.charge += dt; if (P.charge >= 0.55 && !P.chargeSnd) { P.chargeSnd = true; Snd.charged(); } }
  if (In.shootR && P.charging) { fire(P.charge >= 0.55); P.charging = false; P.charge = 0; }
  P.shootCd -= dt; if (P.inv > 0) P.inv -= dt; if (P.hurtT > 0) P.hurtT -= dt; P.t += dt * 0.6;
  if (k.hx >= k.x1) { P.kite = null; k.state = 'back'; k.st = 0; P.vx = 90; P.vy = 0; P.cut = true; P.launchT = 0; Snd.tone(600, 0.12, 'triangle', 0.05); }
}

/* ===== Догори дриґом ===== */
function flipAt(P) {
  const cx = P.x + P.w / 2;
  for (const z of G.flips) if (cx > z.x0 && cx < z.x1) return true;
  return false;
}
/* Викликається на початку руху: вмикає й вимикає перевернуту гравітацію */
function flipCheck(P) {
  if (!G.flips.length) return;
  const fl = flipAt(P);
  if (fl === !!P.flip) return;
  P.flip = fl; P.onGround = false; P.coyote = 0; P.onMover = null; P.cut = true;
  Snd.tone(fl ? 400 : 800, 0.25, 'sine', 0.06, fl ? 800 : 400);
  if (fl && !G.flipHint) { G.flipHint = true; say('Догори дриґом! Тут усе падає вгору — ходи по стелі', 2.6); }
}

/* ===== Пінбол: кульки-відбивачі й вогники ===== */
function updatePinball(P, dt) {
  const pcx = P.x + P.w / 2, pcy = P.y + P.h / 2;
  for (const b of G.bumpers) {
    if (b.cd > 0) b.cd -= dt; if (b.glow > 0) b.glow -= dt;
    const dx = pcx - b.x, dy = pcy - b.y, d = Math.hypot(dx, dy);
    if (b.cd > 0 || d > b.r + 14 || P.kite || P.inCannon) continue;
    const nx = d > 0.01 ? dx / d : 0, ny = d > 0.01 ? dy / d : -1;
    // знизу (головою) — відштовхує вниз; згори й збоку — підкидає високо, як пружинка
    if (ny > 0.45) { P.vy = 260; P.vx = clamp(P.vx + nx * 120, -SPEED, SPEED); }
    else { P.vy = In.jump ? -760 : -660; P.vx = clamp(P.vx + nx * 80, -SPEED, SPEED); }
    P.cut = true; P.onGround = false; P.onMover = null; P.coyote = 0;
    b.cd = 0.22; b.glow = 0.35;
    Snd.tone(880, 0.12, 'square', 0.05, 1320); Snd.tone(1320, 0.1, 'triangle', 0.05, null, 0.06);
    burst(b.x, b.y, 10, ['#ffffff', '#ffe14d', '#ff7ab8'], 130);
    if (b.hits < 3) { b.hits++; giveStar(b.x, b.y - 24); }
    if (!G.bumpHint) { G.bumpHint = true; say('Дзинь! Кожна кулька дає три зірочки й підкидає високо', 2.4); }
  }
  for (const s of G.lightSets) {
    if (s.done) continue;
    for (const l of s.lamps) if (!l.on && Math.abs(pcx - l.x) < 12 && P.y + P.h > l.gy - 6 && P.y + P.h <= l.gy + 2) {
      l.on = true; const n = s.lamps.filter(q => q.on).length;
      Snd.tone(660 * Math.pow(2, n * 2 / 12), 0.14, 'triangle', 0.07); burst(l.x, l.gy - 4, 6, ['#ffe14d', '#ffffff'], 80);
      if (!G.lampHint) { G.lampHint = true; say('Пробіжи по всіх вогниках — і отримаєш веселкову зірочку!', 2.4); }
    }
    if (s.lamps.every(l => l.on)) {
      s.done = true; const mid = s.lamps[Math.floor(s.lamps.length / 2)];
      G.points += 10; G.rainbows++; Snd.rainbow(); floatText(mid.x, mid.gy - 50, '+10', '#ff4fa3'); burst(mid.x, mid.gy - 30, 26, RAINBOW, 180);
    }
  }
}

function update6(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const k of G.kites) {
    k.st += dt;
    if (k.state === 'idle') {
      k.hx = k.x0 + 6; k.hy = k.gy - 24 + Math.sin(G.t * 2) * 2;
      k.kx = k.x0 + 36 + Math.sin(G.t * 1.3) * 6; k.ky = k.gy - 120 + Math.sin(G.t * 1.7) * 6;
      if (!P.kite && !P.zip && !P.inCannon && P.hurtT <= 0 && Math.abs(pcx - k.hx) < 16 && k.hy > P.y - 8 && k.hy < P.y + P.h + 60) {
        P.kite = k; k.state = 'ride'; k.vy = -40; P.vine = null; P.charging = false;
        Snd.seq([0, 4, 7, 12], 660, 0.05, 'triangle', 0.07);
        if (!G.kiteHint) { G.kiteHint = true; say('Летимо! Тримай «Стрибок» — вище, відпусти — нижче', 2.6); }
      }
    } else if (k.state === 'ride') { if (P.kite !== k) { k.state = 'back'; k.st = 0; } }
    else if (k.st > 1.4) k.state = 'idle';
  }
  if (G.bumpers.length || G.lightSets.length) updatePinball(P, dt);
  const B = G.boss;
  if (B && B.kind === 'magpie' && B.bauble && !B.bauble.landed) {
    const bb = B.bauble; bb.vy = Math.min(bb.vy + 900 * dt, 500); bb.y += bb.vy * dt;
    if (bb.y >= B.gy - 9) { bb.y = B.gy - 9; bb.landed = true; Snd.tink(); burst(bb.x, bb.y, 10, ['#ffffff', '#9fe0ff', '#ffe14d'], 100); }
  }
  update7(dt);
}

/* ===== Сорока Блискітка: літає, кидає шишки, пікірує, а побачивши блискітку — забуває про все ===== */
Object.assign(BOSS2, {
  magpie: L => ({ kind: 'magpie', name: 'Сорока Блискітка', acc: 'Сороку Блискітку', win: ' Тепер вона повернула всі зірочки й дарує друзям блискітки.', x: (L.arena.x0 + L.arena.x1) / 2, y: 64, gy: 10 * T, hw: 24, hh: 18, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, hx: null, coneT: 1.4, cycle: 0, swoops: 0, sx: 0, sy: 0, tx: 0, bauble: null, side: 1, swoopHint: false, peckHint: false }),
});
function updateMagpieBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  const ground = B.gy - 20;
  if (B.dead) { B.deadT += dt; B.bauble = null; B.y += (ground - B.y) * Math.min(1, dt * 3); return; }
  if (!G.bossActive) {
    B.y = 64 + Math.sin(B.t * 2) * 4;
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'fly'; B.st = 0; B.hx = B.x; Music.start('boss'); say('Сорока Блискітка: «Кра-кра! Усе, що блищить, — моє!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 60, right = A.x1 - 60;
  if (B.hx == null) B.hx = B.x;
  if (B.state === 'fly') {
    const swing = Math.min((right - left) / 2, viewW * 0.3), home = clamp(pcx, left + swing, right - swing);
    B.hx += (home - B.hx) * Math.min(1, dt * 0.8);
    const nx = B.hx + Math.sin(B.st * (angry ? 1.0 : 0.8)) * swing;
    if (Math.abs(nx - B.x) > 0.3) B.dir = nx > B.x ? 1 : -1;
    B.x += (nx - B.x) * Math.min(1, dt * 4); B.y += (74 + Math.sin(B.t * 2.4) * 6 - B.y) * Math.min(1, dt * 3);
    B.coneT -= dt;
    if (B.coneT <= 0) { B.coneT = angry ? 1.1 : 1.6; G.bolts.push({ kind: 'cone', x: B.x, y: B.y + 16, vx: 0, vy: 30, g: 520, t: 0 }); Snd.tone(500, 0.1, 'triangle', 0.04, 300); }
    if (B.st > (angry ? 3.4 : 4.4)) {
      B.cycle++; B.st = 0;
      if (B.cycle % 2 === 1) {
        B.state = 'aim'; B.tx = clamp(pcx, left, right); B.swoops = angry ? 2 : 1;
        if (!B.swoopHint) { B.swoopHint = true; say('Тінь на землі — Сорока зараз пікірує! Відбіжи вбік', 2.4); }
      } else {
        B.state = 'carry'; B.side = pcx < (A.x0 + A.x1) / 2 ? 1 : -1;
        B.tx = clamp(pcx + B.side * 170, left, right);
      }
    }
  } else if (B.state === 'aim') {
    B.y += (66 - B.y) * Math.min(1, dt * 3); B.dir = B.tx > B.x ? 1 : -1;
    if (B.st < 0.45) B.tx += (clamp(pcx, left, right) - B.tx) * Math.min(1, dt * 4);
    if (B.st > (angry ? 0.8 : 1.0)) { B.state = 'swoop'; B.st = 0; B.sx = B.x; B.sy = B.y; Snd.tone(1100, 0.25, 'sawtooth', 0.05, 500); floatText(B.x, B.y - 30, 'КРА!', '#3b1f4f'); }
  } else if (B.state === 'swoop') {
    const dur = angry ? 0.95 : 1.15, u = Math.min(1, B.st / dur), ex = clamp(B.tx + (B.tx - B.sx), left - 30, right + 30);
    B.x = B.sx + (ex - B.sx) * u; B.y = B.sy + (ground - 4 - B.sy) * Math.sin(u * Math.PI);
    B.dir = ex >= B.sx ? 1 : -1;
    if (u >= 1) {
      B.swoops--;
      if (B.swoops > 0) { B.state = 'aim'; B.st = 0.35; B.tx = clamp(pcx, left, right); }
      else { B.state = 'fly'; B.st = 0; B.hx = B.x; }
    }
  } else if (B.state === 'carry') {
    B.dir = B.tx > B.x ? 1 : -1;
    B.x += (B.tx - B.x) * Math.min(1, dt * 2.2); B.y += (62 - B.y) * Math.min(1, dt * 3);
    if (B.st > 0.9) {
      B.bauble = { x: B.x, y: B.y + 16, vy: 0, landed: false, t: 0 }; B.state = 'wait2'; B.st = 0; Snd.seq([12, 16, 19], 880, 0.05, 'triangle', 0.06);
    }
  } else if (B.state === 'wait2') {
    B.y += (60 + Math.sin(B.t * 3) * 4 - B.y) * Math.min(1, dt * 3);
    if (B.bauble && B.bauble.landed && B.st > 0.4) { B.state = 'go'; B.st = 0; B.side = B.x < B.bauble.x ? -1 : 1; }
  } else if (B.state === 'go') {
    const bb = B.bauble, tx = bb.x + B.side * 26, dx = tx - B.x, dy = ground - B.y, d = Math.hypot(dx, dy) || 1, sp = 300 * dt;
    B.dir = dx >= 0 ? 1 : -1;
    if (d <= sp) { B.x = tx; B.y = ground; B.state = 'peck'; B.st = 0; B.dir = -B.side; if (!B.peckHint) { B.peckHint = true; say('Сорока милується блискіткою! Стріляй, поки вона не дивиться', 2.6); } }
    else { B.x += dx / d * sp; B.y += dy / d * sp; }
  } else if (B.state === 'peck') {
    B.y = ground; B.dir = -B.side;
    if (B.st > (angry ? 2.6 : 3.2)) { B.state = 'grab'; B.st = 0; }
  } else if (B.state === 'grab') {
    B.y = ground;
    if (B.st > 0.35) { B.bauble = null; B.state = 'rise'; B.st = 0; Snd.tone(700, 0.2, 'triangle', 0.05, 1200); }
  } else if (B.state === 'rise') {
    B.y += (74 - B.y) * Math.min(1, dt * 2.5);
    if (B.st > 0.8) { B.state = 'fly'; B.st = 0; B.hx = B.x; }
  }
  const busy = B.state === 'peck' || B.state === 'grab';
  const box = { x: B.x - 22, y: B.y - 16, w: 44, h: 34 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (busy) { if (stomp) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else if (stomp && (B.state === 'go' || B.state === 'rise')) { P.vy = -430; P.cut = true; Snd.tink(); }
    else hurtPlayer(false);
  }
}
