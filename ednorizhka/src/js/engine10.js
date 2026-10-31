'use strict';
/* ===== Частина 14: медові стіни, кришталеві мости, кошики на мотузках, маятники й пісочний годинник, Ведмідь Бурмило ===== */
Object.assign(TUNES, {
  hive: { base: 523.25, ms: 190, n: [0, 2, 4, null, 7, null, 4, 2, 0, null, 4, null, 7, 9, 7, null, 5, 7, 9, null, 12, null, 9, 7, 5, null, 4, null, 2, null, null, null], b: [0, -5, -3, -7] },
  crystal: { base: 659.25, ms: 210, n: [0, null, 7, null, 12, null, 16, null, 14, null, 12, null, 7, null, null, null, 5, null, 9, null, 12, null, 17, null, 16, null, 12, null, 9, null, null, null], b: [0, -5, -7, -3] },
  laundry: { base: 587.33, ms: 180, n: [0, null, 4, 7, null, 4, 0, null, 2, null, 5, 9, null, 5, 2, null, 4, null, 7, 11, null, 7, 4, null, 5, null, 2, null, 0, null, null, null], b: [0, -5, -3, -7] },
  clocktower: { base: 493.88, ms: 200, n: [0, null, 7, null, 0, null, 7, null, 5, null, 12, null, 5, null, 12, null, 4, null, 11, null, 4, null, 11, null, 2, null, 9, null, 7, null, null, null], b: [0, -5, -7, -4] },
  apiary: { base: 523.25, ms: 200, n: [0, null, 4, null, 7, 9, null, 7, null, 4, null, 2, 4, null, null, null, 5, null, 9, null, 12, 14, null, 12, null, 9, null, 7, 9, null, null, null], b: [0, -5, -3, -7] },
});
Object.assign(HOVER, { sock: 1 });
Object.assign(FLYERS, { sock: 1 });
Object.assign(ENEMY2, { cuckoo: 1 });
Object.assign(NO_STOMP, { cuckoo: 1 });
Object.assign(SHOOTABLE, { pot: 1, comb: 1 });

/* Плитки: 28 — медова стіна, 29 — світловий міст (горить), 30 — світловий міст (згас) */
const STOP_TIME = 6;

function spawnEnemy10(e, b, hover, g) {
  switch (e.k) {
    case 'sock': return Object.assign(hover(20, 22, 2.6, 1.1, 8), { col: ['#ff7ab8', '#4cb6ff', '#ffd23f', '#7fd46a'][(e.tx + e.ty) % 4] });
    case 'cuckoo': return Object.assign(g(22, 20, { st: (e.tx % 4) * 0.6, out: 0, dir: -1 }), { hx: e.tx * T + 1 });
  }
  return null;
}
function updateEnemy10(e, dt) {
  if (e.k === 'cuckoo') {
    // зозуля з годинника: ховається, а тоді вискакує вперед і дзьобає
    e.st += dt; const ph = e.st % 2.8;
    e.out = ph < 1.6 ? 0 : ph < 1.8 ? (ph - 1.6) / 0.2 : ph < 2.6 ? 1 : (2.8 - ph) / 0.2;
    e.ghost = e.out < 0.5;
    e.x = e.hx + e.dir * e.out * 16;
    if (ph >= 1.6 && ph - dt < 1.6 && Math.abs(e.x - G.P.x) < 360) Snd.seq([12, 7], 784, 0.12, 'sine', 0.05);
    return true;
  }
  return false;
}

/* ===== Підготовка рівня ===== */
function initLevel10(G, L) {
  G.mt = 0; G.timeStop = 0; G.P.stopT = 0; G.P.cling = 0; G.P.sticky = false;
  G.crystals = (L.crystals || []).map(c => Object.assign({ t: 0, glow: 0 }, c));
  G.bridgeOf = new Map();
  for (const c of G.crystals) for (const [x0, x1, row] of c.segs) for (let x = x0; x < x1; x++) G.bridgeOf.set(row * G.Wt + x, c);
  G.pendulums = (L.pendulums || []).map(p => Object.assign({ th: 0, bx: p.ax, by: p.ay + p.len }, p));
  G.puddles = [];
}

/* ===== Кришталеві мости ===== */
function lightCrystal(c) {
  const fresh = c.t <= 0;
  c.t = c.dur; c.glow = 0.6;
  for (const [x0, x1, row] of c.segs) for (let x = x0; x < x1; x++) { const i = row * G.Wt + x; if (G.map[i] === 30) G.map[i] = 29; }
  if (fresh) { Snd.seq([0, 4, 7, 12, 16], 784, 0.05, 'triangle', 0.07); burst(c.x, c.y, 18, ['#ffffff', '#c9b6ff', '#9fe0ff', '#ffd6f0'], 150); }
  if (!G.crystalHint) { G.crystalHint = true; say('Кристал засяяв, і з\'явився світловий міст! Біжи, поки він не згас', 2.8); }
}
function updateCrystals(dt) {
  for (const c of G.crystals) {
    if (c.glow > 0) c.glow -= dt;
    for (const s of G.shots) if (s.life > 0 && Math.abs(s.x - c.x) < 12 + s.r && Math.abs(s.y - c.y) < 16 + s.r) { lightCrystal(c); s.life = 0; }
    if (c.t > 0) {
      const was = c.t; c.t -= dt;
      if (was > 1.5 && c.t <= 1.5) Snd.tone(600, 0.3, 'sine', 0.05, 300);
      if (c.t <= 0) { c.t = 0; for (const [x0, x1, row] of c.segs) for (let x = x0; x < x1; x++) { const i = row * G.Wt + x; if (G.map[i] === 29) G.map[i] = 30; } Snd.tone(400, 0.25, 'sine', 0.05, 200); }
    }
  }
}

/* ===== Кошики на мотузках: станеш на один — він опускається, а другий піднімається ===== */
function updatePulley(m, dt) {
  if (!m.lead) return;
  const A = m, B = G.movers[m.mate], P = G.P, ya = A.y;
  // над землею кошик не провалюється в неї
  if (A.lim == null) for (const X of [A, B]) X.lim = solid(tileAt(Math.floor((X.x + X.w / 2) / T), 10)) ? 10 * T - 16 : X.maxY;
  const on = P.onMover === A ? 1 : P.onMover === B ? -1 : 0;
  let ny = ya + on * 75 * dt;
  // коли на кошиках нікого немає, вони потроху вертаються на місце, щоб не застрягнути внизу
  if (!on && Math.abs(ya - A.by) > 0.5) ny = ya + Math.sign(A.by - ya) * Math.min(Math.abs(A.by - ya), 40 * dt);
  ny = clamp(ny, Math.max(A.minY, A.sum - B.lim), Math.min(A.lim, A.sum - B.minY));
  A.dx = 0; A.dy = ny - ya; A.y = ny;
  const yb = B.y; B.y = A.sum - ny; B.dx = 0; B.dy = B.y - yb;
  if (on && Math.abs(A.dy) > 0.01 && G.t % 0.35 < dt) Snd.tone(260, 0.05, 'triangle', 0.02);
  if (on && !G.pulleyHint) { G.pulleyHint = true; say('Кошик опускається, а сусідній піднімається! Перестрибуй на вищий', 2.8); }
}

/* ===== Мед: прилипаєш до медової стіни й відштовхуєшся вгору ===== */
function honeyStep(P, dt) {
  if (P.onGround || P.swing || P.kite || P.zip || P.inCannon || P.flip) { P.cling = 0; return; }
  const mid = Math.floor((P.y + P.h / 2) / T);
  const right = tileAt(Math.floor((P.x + P.w + 1) / T), mid) === 28, left = tileAt(Math.floor((P.x - 1) / T), mid) === 28;
  if ((right || left) && P.vy > -150) {
    if (!P.cling) { Snd.tone(300, 0.08, 'sine', 0.04, 200); if (!G.honeyHint) { G.honeyHint = true; say('Прилипла до меду! Тисни «Стрибок» — відштовхнешся вгору', 2.6); } }
    P.cling = right ? 1 : -1; P.vy = Math.min(P.vy, 45); P.dir = P.cling;
    if (Math.random() < dt * 6) G.parts.push({ k: 'spark', x: P.x + (P.cling > 0 ? P.w : 0), y: P.y + P.h - 6, vx: 0, vy: 30, t: 0, life: 0.5, col: '#ffb400', r: 1.8 });
    if (P.jumpBuf > 0) {
      P.vy = -540; P.vx = -P.cling * 170; P.launchT = 0.15; P.dir = -P.cling; P.jumpBuf = 0; P.cut = false; P.cling = 0; Snd.jump();
      burst(P.x + P.w / 2, P.y + P.h / 2, 6, ['#ffd23f', '#ffb400'], 70);
    }
  } else P.cling = 0;
}

function update10(dt) {
  const P = G.P;
  // пісочний годинник
  if (P.stopT > 0) { P.stopT -= dt; if (P.stopT <= 0) { P.stopT = 0; Snd.seq([12, 7, 0], 523, 0.08, 'triangle', 0.06); } else if (G.t % 0.5 < dt) Snd.tone(1200, 0.03, 'square', 0.02); }
  G.timeStop = P.stopT;
  honeyStep(P, dt);
  updateCrystals(dt);
  // маятники
  for (const p of G.pendulums) {
    p.th = p.amp * Math.sin(G.mt * TAU / p.period + p.ph);
    p.bx = p.ax + Math.sin(p.th) * p.len; p.by = p.ay + Math.cos(p.th) * p.len;
    if (circleRect({ x: p.bx, y: p.by, r: 13 }, { x: P.x + 3, y: P.y + 3, w: P.w - 6, h: P.h - 4 })) hurtPlayer(false);
  }
  // медові калюжі Бурмила
  for (const q of G.puddles) q.t -= dt;
  G.puddles = G.puddles.filter(q => q.t > 0);
  const pcx = P.x + P.w / 2;
  P.sticky = P.onGround && G.puddles.some(q => pcx > q.x - q.w / 2 && pcx < q.x + q.w / 2);
  if (P.sticky && !G.stickyHint) { G.stickyHint = true; say('Липкий мед! Тут іти повільно — перестрибуй калюжі', 2.2); }
  for (const b of G.bolts) if (b.kind === 'pot' && b.vy > 0 && b.y >= (G.boss ? G.boss.gy : 10 * T) - 22) {
    G.puddles.push({ x: b.x, w: 64, t: 4.5 }); b.y = VIEW_H + 100; b.dead = true;
    Snd.tone(200, 0.2, 'sine', 0.06, 120); burst(b.x, (G.boss ? G.boss.gy : 10 * T) - 6, 10, ['#ffd23f', '#ffb400', '#ffffff'], 110);
  }
}

/* ===== Ведмідь Бурмило: кидає горщики з медом, тупає так, що падають стільники, а потім сідає ласувати ===== */
Object.assign(BOSS2, {
  bear: L => ({ kind: 'bear', name: 'Ведмідь Бурмило', acc: 'Ведмедя Бурмила', win: ' Тепер він ділиться медом із бджілками й друзями.', x: L.arena.x0 + 30 * T, gy: 10 * T, fy: 10 * T, y: 10 * T - 28, hw: 30, hh: 28, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, vy: 0, acts: 0, thrown: false, eatHint: false, stompHint: false }),
});
function updateBearBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; B.fy = B.gy; B.y = B.gy - 28; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'walk'; B.st = 0; Music.start('boss'); say('Ведмідь Бурмило: «Р-р-р! Мед і зірочки — мої!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 50, right = A.x1 - 50;
  if (B.state === 'walk') {
    B.dir = pcx < B.x ? -1 : 1;
    if (Math.abs(pcx - B.x) > 100) B.x += B.dir * (angry ? 62 : 48) * dt;
    if (B.st > (angry ? 0.8 : 1.1)) {
      B.st = 0;
      if (B.acts >= 3) { B.state = 'eat'; B.acts = 0; Snd.seq([4, 7, 4, 0], 392, 0.12, 'sine', 0.06); if (!B.eatHint) { B.eatHint = true; say('Бурмило сів їсти мед і нічого не помічає! Стріляй у нього', 2.6); } }
      else { B.state = B.acts % 2 === 0 ? 'throw' : 'stomp'; B.thrown = false; B.acts++; if (B.state === 'stomp') { B.vy = -520; Snd.tone(150, 0.3, 'sawtooth', 0.06, 90); } }
    }
  } else if (B.state === 'throw') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > 0.5 && !B.thrown) {
      B.thrown = true; Snd.tone(400, 0.15, 'triangle', 0.06, 700);
      for (const k of angry ? [0.8, 1.15] : [0.95]) G.bolts.push({ kind: 'pot', r: 8, x: B.x + B.dir * 24, y: B.fy - 50, vx: clamp((pcx - B.x) / k, -280, 280), vy: -420, g: 880, t: 0 });
    }
    if (B.st > 0.9) { B.state = 'walk'; B.st = 0; }
  } else if (B.state === 'stomp') {
    B.vy += 1500 * dt; B.fy += B.vy * dt;
    if (B.vy > 0 && B.fy >= B.gy) {
      B.fy = B.gy; B.state = 'land'; B.st = 0; Snd.bump(); G.flash = Math.max(G.flash, 0.12);
      const xs = angry ? [-90, -30, 30, 90] : [-60, 0, 60];
      for (const dx of xs) G.bolts.push({ kind: 'comb', r: 9, x: clamp(pcx + dx, A.x0 + 20, A.x1 - 20), y: -40 - Math.abs(dx) * 0.3, vx: 0, vy: 0, g: 620, t: 0 });
      if (!B.stompHint) { B.stompHint = true; say('Бурмило тупнув — зі стелі падають стільники! Відбіжи від тіні', 2.6); }
    }
  } else if (B.state === 'land') {
    if (B.st > 0.5) { B.state = 'walk'; B.st = 0; }
  } else if (B.state === 'eat') {
    if (B.st > (angry ? 2.2 : 2.8)) { B.state = 'walk'; B.st = 0; }
  }
  B.x = clamp(B.x, left, right);
  B.y = B.fy - 28;
  const box = { x: B.x - 28, y: B.fy - 54, w: 56, h: 54 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (B.state === 'eat') { if (stomp) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else if (stomp && B.state !== 'stomp') { P.vy = -430; P.cut = true; Snd.tink(); }
    else hurtPlayer(false);
  }
}
function armored10(s, B) {
  if (B.kind === 'bear' && B.state !== 'eat') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Бурмило в густій шерсті! Стріляй, коли він сяде їсти мед', 2.6); }
    return true;
  }
  return false;
}
function resetBoss10(B) {
  if (B.kind === 'bear') { B.state = 'walk'; B.st = 0; B.fy = B.gy; B.vy = 0; B.x = Math.max(B.x, G.arena.x0 + 14 * T); G.puddles = []; }
}
