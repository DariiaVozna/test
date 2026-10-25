'use strict';
/* ===== Частини 5–6: нові вороги, механіки й боси (доповнює engine.js) ===== */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

Object.assign(TUNES, {
  jungle: { base: 523.25, ms: 180, n: [0, null, 4, 7, null, 9, 7, null, 4, null, 2, 4, null, null, null, null, 5, null, 9, 12, null, 9, 7, null, 5, 4, 2, null, 0, null, null, null], b: [0, -5, -3, -7] },
  bubbles: { base: 659.25, ms: 210, n: [0, null, 7, null, 12, null, 7, null, 9, null, 5, null, 4, null, null, null, 0, null, 7, null, 14, null, 12, null, 9, null, 7, null, 4, null, null, null], b: [0, -3, -5, -7] },
  bakery: { base: 587.33, ms: 190, n: [0, 2, 4, null, 7, null, 4, null, 5, 4, 2, null, 0, null, null, null, 4, 5, 7, null, 9, null, 7, null, 5, 4, 2, null, 4, null, null, null], b: [0, -5, -3, -7] },
  pirate: { base: 440, ms: 170, n: [0, null, 0, 3, null, 5, 7, null, 5, null, 3, null, 2, null, null, null, 0, null, 0, 3, null, 5, 7, null, 10, null, 7, 5, 3, null, null, null], b: [0, -4, -2, -5] },
  sea: { base: 523.25, ms: 240, n: [0, null, null, 4, null, null, 7, null, 11, null, null, 9, null, 7, null, null, 5, null, null, 9, null, null, 12, null, 11, null, 7, null, 4, null, null, null], b: [0, -3, -7, -5] },
  music: { base: 523.25, ms: 200, n: [0, null, null, null, 7, null, null, null, 5, null, null, null, 4, null, null, null, 2, null, null, null, 7, null, null, null, 0, null, null, null, null, null, null, null], b: [0, -5, -3, -7] },
  circus: { base: 587.33, ms: 150, n: [0, null, 4, null, 7, null, 4, null, 0, 2, 4, 5, 7, null, null, null, 9, null, 7, null, 5, null, 4, null, 2, 4, 2, 0, -1, null, null, null], b: [0, -5, -7, -5] },
  dino: { base: 440, ms: 200, n: [0, null, 3, null, 5, 7, null, 5, 3, null, 0, null, -2, null, null, null, 0, null, 3, null, 7, 10, null, 7, 5, null, 3, null, 0, null, null, null], b: [0, -4, -2, -5] },
  snow: { base: 659.25, ms: 210, n: [7, null, 4, null, 0, null, 4, 7, null, 12, null, 11, null, 9, null, null, 5, null, 9, null, 12, null, 9, 7, null, 4, null, 2, 0, null, null, null], b: [0, -5, -3, -7] },
  factory: { base: 523.25, ms: 160, n: [0, null, 7, null, 12, null, 7, null, 3, null, 10, null, 15, null, 10, null, 5, null, 12, null, 17, null, 12, null, 7, null, 14, null, 19, null, null, null], b: [0, -4, -2, -5] },
});

Object.assign(WALKERS, { ginger: 1, penguin: 1, dino: 1 });
Object.assign(HOVER, { parrot: 1, gull: 1, note: 1 });
Object.assign(FLYERS, { parrot: 1, gull: 1, note: 1, ptero: 1 });
const ENEMY2 = { monkey: 1, snowman: 1, cannon: 1, bouncer: 1, mole: 1 };
const SHOOTABLE = { puff: 1, magic: 1, bub: 1, ball: 1, snowball: 1, rock: 1 };

function spawnEnemy2(e, b, hover) {
  const g = (w, h, o) => Object.assign(b, { w, h, x: e.tx * T + (T - w) / 2, y: e.ty * T - h }, o);
  switch (e.k) {
    case 'monkey': return g(18, 24, { cool: 1 + Math.random(), throwT: 0 });
    case 'snowman': return g(20, 28, { cool: 1.3 + Math.random(), throwT: 0, hp: 2 });
    case 'ginger': return g(16, 26, { speed: 36 });
    case 'penguin': return g(18, 20, { speed: 80 });
    case 'dino': return g(26, 22, { speed: 30, hp: 2 });
    case 'cannon': return g(24, 22, { cool: 1.4 + Math.random(), hp: 2, rec: 0 });
    case 'bouncer': return g(20, 20, { speed: 48 });
    case 'parrot': case 'gull': return hover(22, 16, 3.5, 0.8, 6);
    case 'note': return hover(18, 20, 2.4, 1.1, 10);
    case 'ptero': return Object.assign(b, { w: 26, h: 16, hx: e.tx * T + 12, hy: e.ty * T + 12, x: e.tx * T - 1, y: e.ty * T + 4, state: 'hang', st: 0, cool: 0 });
  }
  return spawnEnemy3(e, b, hover, g);
}

function updateEnemy2(e, dt) {
  const P = G.P, pcx = P.x + P.w / 2, cx = e.x + e.w / 2, d = Math.abs(pcx - cx);
  if (e.k === 'monkey' || e.k === 'snowman') {
    e.dir = pcx < cx ? -1 : 1; e.cool -= dt; if (e.throwT > 0) e.throwT -= dt;
    if (e.cool <= 0 && d < 240 && d > 24) {
      e.cool = e.k === 'snowman' ? 2.6 : 2.2; e.throwT = 0.3;
      G.bolts.push({ kind: e.k === 'snowman' ? 'snowball' : 'banana', r: 5, x: cx + e.dir * 6, y: e.y + 4, vx: clamp((pcx - cx) / 0.75, -220, 220), vy: -330, g: 900, t: 0 });
    }
  } else if (e.k === 'cannon') {
    e.dir = pcx < cx ? -1 : 1; e.cool -= dt; if (e.rec > 0) e.rec = Math.max(0, e.rec - dt * 3);
    if (e.cool <= 0 && d < 300 && d > 30) {
      e.cool = 2.8; e.rec = 1;
      G.bolts.push({ kind: 'ball', r: 5, x: cx + e.dir * 16, y: e.y + e.h - 14, vx: e.dir * 140, vy: 0, t: 0 });
      if (d < 260) Snd.tone(160, 0.25, 'sawtooth', 0.06, 60);
      G.parts.push({ k: 'puff', x: cx + e.dir * 18, y: e.y + e.h - 12, vx: e.dir * 20, vy: 0, t: 0, life: 0.45, r: 6 });
    }
  } else if (e.k === 'bouncer') {
    e.vx = e.dir * e.speed; e.vy = Math.min(e.vy + GRAV * dt, 600);
    if (moveBody(e, dt)) e.dir *= -1;
    else if (e.onGround) {
      const ax = e.dir > 0 ? e.x + e.w + 2 : e.x - 2, v = tileAt(Math.floor(ax / T), Math.floor((e.y + e.h + 4) / T));
      if (!(solid(v) || v === 3)) e.dir *= -1;
      e.vy = -330;
    }
    if (e.y > VIEW_H + 40) e.dead = true;
  } else if (e.k === 'mole') updateMole(e, dt);
  else updateEnemy4(e, dt);
}

/* Ліани: тримай «Стрибок», щоб лізти; вбік, щоб зістрибнути */
function vineStep(P, ax, dt) {
  if (!G.vines.length) return false;
  if (P.vineCd > 0) P.vineCd -= dt;
  if (P.hurtT > 0) { if (P.vine) { P.vine = null; P.vineCd = 0.5; } return false; }
  const pcx = P.x + P.w / 2;
  if (!P.vine) {
    if (P.onGround || P.vineCd > 0 || !In.jump) return false;
    const v = G.vines.find(v => Math.abs(pcx - v.x) < 10 && P.y + P.h > v.y0 + 10 && P.y < v.y1 - 12);
    if (!v) return false;
    P.vine = v; P.vineT = 0; Snd.tone(600, 0.08, 'triangle', 0.05, 900);
    if (!G.vineHint) { G.vineHint = true; say('Тримай «Стрибок», щоб лізти вгору. Вбік — зістрибнути', 2.8); }
  }
  const v = P.vine; P.vineT += dt; P.onMover = null; P.cut = true; P.jumpBuf = 0;
  if (ax && P.vineT > 0.2) {
    P.vine = null; P.vineCd = 0.35; P.vx = ax * SPEED * 0.8;
    if (In.jumpP) { P.vy = -470; Snd.jump(); } else P.vy = 0;
    return true;
  }
  P.vx = 0; P.x += (v.x - P.w / 2 - P.x) * Math.min(1, dt * 12);
  const top = v.y0 - 8;
  if (In.jump) { P.vy = -115; if (P.y <= top) { P.y = top; P.vy = 0; } } else P.vy = 0;
  if (In.jumpP && P.y <= top + 2) { P.vine = null; P.vineCd = 0.35; P.vy = -470; Snd.jump(); }
  return true;
}

/* Після руху: желе й барабани підкидають, клавіші піаніно грають */
const NOTE_COLS = ['#ff7ab8', '#7a5ad9', '#4cb6ff', '#ff9a3d', '#3fbf7f'];
function afterMove2(P) {
  if (P.onGround && P.groundTile === 12) {
    const ty = Math.floor((P.y + P.h + 2) / T);
    let bx = Math.floor((P.x + P.w / 2) / T);
    if (tileAt(bx, ty) !== 12) bx = tileAt(Math.floor(P.x / T), ty) === 12 ? Math.floor(P.x / T) : Math.floor((P.x + P.w - 0.01) / T);
    G.bumps.set(ty * G.Wt + bx, 0.18);
    P.vy = In.jump ? -760 : -620; P.onGround = false; P.cut = true; P.coyote = 0; P.onMover = null; P.vine = null;
    if (G.theme === 'music' || G.theme === 'circus') { Snd.tone(110, 0.25, 'sine', 0.18, 60); Snd.tone(330, 0.06, 'square', 0.03); } else Snd.boing();
    burst(P.x + P.w / 2, P.y + P.h, 6, G.theme === 'bakery' ? ['#ffb3dd', '#fff'] : ['#ffd23f', '#fff'], 90);
    if (!G.bounceHint) { G.bounceHint = true; say((G.theme === 'bakery' ? 'Желе' : 'Барабан') + ' підкидає! Тримай «Стрибок», щоб вище', 2.2); }
  } else if (G.theme === 'music' && P.onGround && P.groundTile === 1) {
    const tx = Math.floor((P.x + P.w / 2) / T);
    if (!P.wasGround || tx !== P.noteTx) {
      P.noteTx = tx;
      const i = ((tx % 8) + 8) % 8, f = 523.25 * Math.pow(2, [0, 2, 4, 5, 7, 9, 11, 12][i] / 12);
      Snd.tone(f, 0.3, 'triangle', P.wasGround ? 0.06 : 0.1); Snd.tone(f * 2, 0.15, 'sine', 0.025);
      G.parts.push({ k: 'note', x: tx * T + 12, y: P.y + P.h - 6, vx: (Math.random() - 0.5) * 20, vy: -45, t: 0, life: 0.9, col: NOTE_COLS[i % 5] });
    }
  }
  P.wasGround = P.onGround;
}

/* Циркова гармата */
function holdInCannon(P, dt) {
  const L = P.inCannon;
  P.x = L.x - P.w / 2; P.y = L.gy - P.h - 6; P.vx = P.vy = 0; P.onGround = false; P.onMover = null;
  P.inv = Math.max(P.inv, 0.4); P.charging = false; P.shootCd -= dt;
}
function update2(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const L of G.launchers) {
    L.st += dt;
    if (L.state === 'idle') {
      if (!P.inCannon && Math.abs(pcx - L.x) < 14 && P.y + P.h > L.gy - 36 && P.y + P.h <= L.gy + 2) {
        L.state = 'load'; L.st = 0; P.inCannon = L; P.vine = null; Snd.tone(300, 0.3, 'triangle', 0.08, 600);
        if (!G.launchHint) { G.launchHint = true; say('Бум! Гармата перекине через яму', 2); }
      }
    } else if (L.state === 'load') {
      if (L.st > 0.55) {
        L.state = 'cool'; L.st = 0; P.inCannon = null;
        P.x = L.x + 10 - P.w / 2; P.y = L.gy - 46; P.vx = 330; P.vy = -600; P.launchT = 1.6; P.cut = true; P.onGround = false; P.dir = 1;
        Snd.big(); G.flash = 0.12; burst(L.x + 18, L.gy - 34, 18, RAINBOW, 170);
        G.parts.push({ k: 'puff', x: L.x + 20, y: L.gy - 36, vx: 0, vy: 0, t: 0, life: 0.5, r: 9 });
      }
    } else if (L.st > 1.2) L.state = 'idle';
  }
  update3(dt);
}

/* Бульбашки-платформи */
function updateBubble(m, dt) {
  const y0 = m.y; m.dx = 0; m.st += dt;
  const bob = Math.sin(G.t * 2.2 + m.bx * 0.05) * 3;
  if (m.state === 'idle') { m.y = m.by + bob; if (G.P.onMover === m) { m.state = 'wobble'; m.st = 0; Snd.tone(760, 0.18, 'sine', 0.05, 1100); } }
  else if (m.state === 'wobble') {
    m.y = m.by + bob;
    if (m.st > 0.8) { m.state = 'gone'; m.st = 0; if (Math.abs(m.x - G.P.x) < 420) Snd.pop(); burst(m.x + m.w / 2, m.y + 14, 14, ['#ffffff', '#bfefff', '#ffc4ec'], 130); }
  } else if (m.st > 2.6) { m.state = 'idle'; m.st = 0; m.y = m.by + bob; }
  m.dy = m.state === 'gone' ? 0 : m.y - y0;
}

/* ===== Боси ===== */
const BOSS2 = {
  medusa: L => ({ kind: 'medusa', name: 'Медуза Желейка', acc: 'Медузу Желейку', win: ' Тепер вона пускає тільки веселі бульбашки.', x: (L.arena.x0 + L.arena.x1) / 2, y: 128, hw: 36, hh: 36, hp: 20, max: 20, t: 0, st: 0, state: 'wait', shield: 3, flash: 0, dead: false, deadT: 0, alpha: 1, bubT: 2, hx: null, hinted: false }),
  robot: L => ({ kind: 'robot', name: 'Робот Брязкало', acc: 'Робота Брязкала', win: ' Тепер він майструє іграшки для всіх.', x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 32, vx: 0, vy: 0, hw: 24, hh: 30, hp: 24, max: 24, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, gearT: 1.5, hinted: false, openHint: false }),
};

function updateMedusaBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; B.y += (130 + Math.sin(B.t * 1.5) * 8 - B.y) * Math.min(1, dt * 2); return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'float'; B.st = 0; Music.start('boss'); say('Медуза Желейка! Стрибай і лопни її бульбашковий щит', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 70, right = A.x1 - 70;
  if (B.state === 'float') {
    const swing = Math.min((right - left) / 2, viewW * 0.3), home = clamp(pcx, left + swing, right - swing);
    B.hx = B.hx == null ? B.x : B.hx + (home - B.hx) * Math.min(1, dt * 0.8);
    B.x = B.hx + Math.sin(B.t * (angry ? 0.8 : 0.6)) * swing;
    B.y += (128 + Math.sin(B.t * 1.8) * 10 - B.y) * Math.min(1, dt * 3);
    B.bubT -= dt;
    if (B.bubT <= 0) {
      B.bubT = angry ? 1.6 : 2.3; const n = angry ? 3 : 2;
      for (let i = 0; i < n; i++) { const k = i - (n - 1) / 2; G.bolts.push({ kind: 'bub', r: 6, x: B.x + k * 16, y: B.y + 22, vx: clamp((pcx - B.x) * 0.4, -80, 80) + k * 28, vy: 0, sink: 32, t: 0 }); }
      Snd.tone(900, 0.15, 'sine', 0.06, 1400);
    }
  } else if (B.state === 'stun') {
    B.y += (200 - B.y) * Math.min(1, dt * 3);
    if (B.st > (angry ? 3 : 3.6)) { B.state = 'rise'; B.st = 0; }
  } else if (B.state === 'rise') {
    B.y += (128 - B.y) * Math.min(1, dt * 2.5);
    if (B.st > 0.8) { B.state = 'float'; B.st = 0; B.shield = 3; B.bubT = 1.2; Snd.tone(500, 0.3, 'sine', 0.06, 1200); burst(B.x, B.y, 16, ['#ffffff', '#bfefff'], 120); }
  }
  B.x = clamp(B.x, left, right);
  const big = B.shield > 0 && B.state !== 'stun'; B.hw = big ? 36 : 22; B.hh = big ? 36 : 26;
  const box = { x: B.x - 20, y: B.y - 24, w: 40, h: 50 };
  if (overlap(P, box)) {
    if (B.state === 'stun' || B.state === 'rise') { if (P.vy > 40 && P.y + P.h - box.y < 18) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else hurtPlayer(false);
  }
}

function updateRobotBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  const ground = B.gy - 32;
  if (B.dead) { B.deadT += dt; B.y += (ground - B.y) * Math.min(1, dt * 6); return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'walk'; B.st = 0; Music.start('boss'); say('Робот Брязкало: «Брязь-брязь! Усі зірочки — на мою фабрику!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 50, right = A.x1 - 50;
  if (B.state === 'walk') {
    B.dir = pcx < B.x ? -1 : 1;
    if (Math.abs(pcx - B.x) > 30) B.x += B.dir * (angry ? 60 : 45) * dt;
    B.y = ground - Math.abs(Math.sin(B.t * 8)) * 2;
    if (angry) {
      B.gearT -= dt;
      if (B.gearT <= 0) { B.gearT = 1.7; G.bolts.push({ kind: 'gear', r: 6, x: B.x + B.dir * 20, y: B.y - 30, vx: clamp((pcx - B.x) * 0.9, -190, 190), vy: -420, g: 900, t: 0 }); Snd.tone(900, 0.1, 'square', 0.04, 500); }
    }
    if (B.st > (angry ? 1.8 : 2.4)) { B.state = 'crouch'; B.st = 0; Snd.tone(200, 0.4, 'sawtooth', 0.04, 500); }
  } else if (B.state === 'crouch') {
    B.y = ground;
    if (B.st > 0.55) { B.state = 'jump'; B.st = 0; B.vy = -640; B.vx = clamp((pcx - B.x) / 0.85, -210, 210); B.dir = B.vx < 0 ? -1 : 1; Snd.jump(); }
  } else if (B.state === 'jump') {
    B.vy += GRAV * dt; B.x += B.vx * dt; B.y += B.vy * dt;
    if (B.x <= left || B.x >= right) B.vx = 0;
    if (B.vy > 0 && B.y >= ground) {
      B.y = ground; B.state = 'land'; B.st = 0; G.flash = 0.15; Snd.bossHit(); Snd.tone(80, 0.4, 'sawtooth', 0.08, 40);
      burst(B.x, B.gy - 4, 16, ['#ffffff', '#c9d2e6'], 140);
      for (const d of [-1, 1]) G.bolts.push({ kind: 'wave', r: 7, x: B.x + d * 30, y: B.gy - 8, vx: d * (angry ? 190 : 160), vy: 0, t: 0 });
    }
  } else if (B.state === 'land') {
    B.y = ground;
    if (B.st > 0.35) { B.state = 'open'; B.st = 0; Snd.tone(600, 0.3, 'triangle', 0.06, 300); if (!B.openHint) { B.openHint = true; say('Віконце відчинилося! Стріляй у сердечко!', 2.2); } }
  } else if (B.state === 'open') {
    B.y = ground; if (B.st > (angry ? 2.4 : 2.9)) { B.state = 'close'; B.st = 0; Snd.tone(300, 0.2, 'square', 0.05, 600); }
  } else if (B.state === 'close') {
    B.y = ground; if (B.st > 0.4) { B.state = 'walk'; B.st = 0; }
  }
  B.x = clamp(B.x, left, right);
  const box = { x: B.x - 22, y: B.y - 34, w: 44, h: 66 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 18;
    if (B.state === 'open') { if (stomp) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else if (stomp && B.state !== 'jump') { P.vy = -430; P.cut = true; Snd.tink(); }
    else hurtPlayer(false);
  }
}

/* Броня й щити: повертає true, якщо постріл не поранив боса */
function armored2(s, B) {
  if (B.kind === 'medusa' && B.shield > 0 && B.state !== 'stun' && B.state !== 'rise') {
    B.shield--; s.life = 0; Snd.pop(); burst(s.x, s.y, 12, ['#ffffff', '#bfefff', '#ffc4ec'], 130); B.flash = 0.08;
    if (B.shield <= 0) { B.state = 'stun'; B.st = 0; G.bolts = G.bolts.filter(b => b.kind !== 'bub'); say('Щит лопнув! Стріляй і стрибай на Медузу!', 2); }
    else if (!B.hinted) { B.hinted = true; say('Бульбашковий щит тоншає! Ще ' + B.shield + '!', 1.6); }
    return true;
  }
  if (B.kind === 'clock' && B.state !== 'sleep' && B.state !== 'yawn') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Дзеленчик не спить! Зачекай, поки він задрімає', 2.4); }
    return true;
  }
  if (B.kind === 'robot' && B.state !== 'open') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.hinted) { B.hinted = true; say('Броня! Стріляй, коли на животі відчиниться віконце', 2.6); }
    return true;
  }
  return false;
}
function resetBoss2(B) {
  if (B.kind === 'medusa') { B.state = 'float'; B.st = 0; }
  if (B.kind === 'moleking') { B.state = 'dig'; B.st = 0; }
  if (B.kind === 'clock') { B.state = 'wake'; B.st = 0; B.air = false; B.y = B.gy - 34; }
  if (B.kind === 'robot') { B.state = 'walk'; B.st = 0; B.y = B.gy - 32; B.vx = B.vy = 0; B.x = Math.max(B.x, G.arena.x0 + 14 * T); }
}
