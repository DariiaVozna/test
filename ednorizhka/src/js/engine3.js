'use strict';
/* ===== Частина 7: чарівні квасолини, ліхтарики, веселкові блоки, вагонетки, кроти й Король Кротів ===== */
Object.assign(TUNES, {
  beans: { base: 587.33, ms: 180, n: [0, null, 2, 4, null, 7, null, 4, 5, null, 4, 2, 0, null, null, null, 2, null, 4, 5, null, 9, null, 7, 5, 4, 2, null, 0, null, null, null], b: [0, -5, -3, -7] },
  lantern: { base: 523.25, ms: 260, n: [0, null, 4, null, 7, null, 12, null, 11, null, 7, null, 9, null, null, null, 5, null, 9, null, 12, null, 14, null, 12, null, 7, null, 4, null, null, null], b: [0, -3, -7, -5] },
  rainbow: { base: 659.25, ms: 170, n: [0, 4, 7, null, 12, null, 11, 7, 9, null, 5, null, 7, null, null, null, 0, 4, 7, null, 14, null, 12, 11, 12, null, 7, null, 4, null, null, null], b: [0, -5, -3, -7] },
  mine: { base: 440, ms: 180, n: [0, null, 3, null, 7, 5, 3, null, 0, null, -2, null, 0, null, null, null, 3, null, 7, null, 10, 8, 7, null, 5, null, 3, null, 2, null, null, null], b: [0, -4, -2, -5] },
  burrow: { base: 392, ms: 190, n: [0, null, 0, 3, null, 5, 3, null, 7, null, 5, 3, 0, null, null, null, 0, null, 0, 3, null, 5, 7, null, 10, null, 8, 7, 5, null, null, null], b: [0, -4, -2, -5] },
});
Object.assign(WALKERS, { worm: 1 });
Object.assign(FLYERS, { owl: 1 });
const LANTERN_COLS = ['#ff9a7a', '#ffd23f', '#ff7ab8', '#9fe0ff', '#b99aff'];

function spawnEnemy3(e, b, hover, g) {
  switch (e.k) {
    case 'worm': return g(26, 14, { speed: 28 });
    case 'mole': return g(22, 18, { state: 'hide', st: Math.random() * 1.5, k: 0, ghost: true });
    case 'owl': return Object.assign(b, { w: 22, h: 22, hx: e.tx * T + 12, hy: e.ty * T + 12, x: e.tx * T + 1, y: e.ty * T + 1, state: 'hang', st: 0, cool: 0.5 });
  }
  return null;
}

/* Кротик: ховається в нірці, визирає, вилазить. Поки він у нірці, його не зачепиш */
function updateMole(e, dt) {
  const P = G.P, d = Math.abs(P.x + P.w / 2 - (e.x + e.w / 2));
  e.st += dt; e.dir = P.x + P.w / 2 < e.x + e.w / 2 ? -1 : 1;
  if (e.state === 'hide') { e.k = 0; if (e.st > 1.6 && d < 320) { e.state = 'peek'; e.st = 0; } }
  else if (e.state === 'peek') { e.k = 0; if (e.st > 0.55) { e.state = 'up'; e.st = 0; if (d < 300) Snd.tone(520, 0.12, 'triangle', 0.05, 820); } }
  else if (e.state === 'up') { e.k = Math.min(1, e.st / 0.2); if (e.st > 1.9) { e.state = 'down'; e.st = 0; } }
  else { e.k = Math.max(0, 1 - e.st / 0.25); if (e.st > 0.25) { e.state = 'hide'; e.st = 0; } }
  e.ghost = e.k < 0.55;
}

function update3(dt) {
  const P = G.P;
  // веселкові блоки: 2,8 с є, 1,4 с немає; перед зникненням блимають
  const ph = G.t % 4.2, on = ph < 2.8;
  G.blinkWarn = on && ph > 2.05;
  if (on !== G.blinkOn) {
    G.blinkOn = on;
    if (on) for (let k = 0; k < 3; k++) {
      let top = -1;
      for (let ty = Math.floor(P.y / T); ty <= Math.floor((P.y + P.h - 0.01) / T); ty++) for (let tx = Math.floor(P.x / T); tx <= Math.floor((P.x + P.w - 0.01) / T); tx++) if (tileAt(tx, ty) === 13 && (top < 0 || ty < top)) top = ty;
      if (top < 0) break;
      P.y = top * T - P.h; P.vy = Math.min(P.vy, 0);
    }
  }
  // чарівні квасолини: постріл — і виростає стебло з листочками
  for (const b of G.beans) {
    if (!b.grown) {
      for (const s of G.shots) if (s.life > 0 && Math.abs(s.x - b.x) < 12 + s.r && s.y > b.gy - 28 - s.r && s.y < b.gy + 4) {
        s.life = 0; b.grown = true; b.t = 0; b.placed = 0; Snd.power(); burst(b.x, b.gy - 12, 18, ['#9be36a', '#ffffff', '#b48cff'], 140);
        if (!G.beanHint) { G.beanHint = true; say('Стебло росте! Стрибай по листочках угору', 2.2); }
        break;
      }
    } else {
      b.t += dt;
      while (b.placed < b.h && b.t > (b.placed + 1) * 0.3) {
        b.placed++; const row = b.row - 2 * b.placed;
        for (let dx = -1; dx <= 1; dx++) { const i = row * G.Wt + b.tx + dx; if (row >= 0 && G.map[i] === 0) G.map[i] = 3; }
        burst(b.x, row * T + 6, 8, ['#9be36a', '#ffffff'], 90); Snd.tone(500 + b.placed * 120, 0.12, 'triangle', 0.06);
      }
    }
  }
  // ліхтарики: постріл запалює, а за кожен — зірочка
  for (const l of G.lanterns) {
    if (l.lit) continue;
    for (const s of G.shots) if (s.life > 0 && Math.abs(s.x - l.x) < 9 + s.r && Math.abs(s.y - l.y) < 12 + s.r) {
      l.lit = true; s.life = 0; giveStar(l.x, l.y - 16); burst(l.x, l.y, 16, ['#ffe9a8', '#ffffff', l.col], 140); Snd.check();
      if (!G.lanternHint) { G.lanternHint = true; say('Світло! За кожен ліхтарик — зірочка', 2); }
      break;
    }
  }
  // вагонетка: поки їде, єдиноріжка всередині, навіть коли підстрибує
  if (P.ride) {
    const m = P.ride;
    if (m.state !== 'go' || Math.abs(P.x + P.w / 2 - (m.x + m.w / 2)) > 70) P.ride = null;
    else { if (P.onMover !== m) P.x += m.dx; P.x = clamp(P.x, m.x + 3, m.x + m.w - P.w - 3); }
  }
}

function updateCart(m, dt) {
  const P = G.P, x0 = m.x; m.dy = 0; m.st += dt;
  if (m.state === 'idle') {
    m.v = 0;
    if (P.onMover === m) {
      m.state = 'go'; m.st = 0; P.ride = m; Snd.tone(300, 0.3, 'square', 0.04, 500);
      if (!G.cartHint) { G.cartHint = true; say('Поїхали! У вагонетці можна підстрибувати', 2.2); }
    }
  } else if (m.state === 'go') {
    m.v = Math.min(140, (m.v || 0) + 260 * dt); m.x += m.v * dt;
    if (m.st % 0.3 < dt) Snd.tone(240, 0.04, 'square', 0.015);
    if (m.x + m.w >= m.x1) { m.x = m.x1 - m.w; m.state = 'end'; m.st = 0; m.v = 0; Snd.bump(); burst(m.x + m.w, m.y, 8, ['#ffffff', '#ffd23f'], 90); }
  } else if (m.state === 'end') {
    if (P.onMover !== m && P.x + P.w < m.x - 100) { m.state = 'back'; m.st = 0; }
  } else {
    m.x = Math.max(m.bx, m.x - 160 * dt);
    if (m.x <= m.bx) { m.state = 'idle'; m.st = 0; }
  }
  m.dx = m.x - x0;
}

/* ===== Король Кротів Копайло: вилазить із різних нірок і кидається камінцями ===== */
Object.assign(BOSS2, {
  moleking: L => {
    const A = L.arena, holes = [7, 14, 21, 28, 35].map(k => A.x0 + k * T + 12);
    return { kind: 'moleking', name: 'Король Кротів Копайло', acc: 'Короля Кротів Копайла', win: ' Тепер він копає тунелі для потягів із зірочками.', holes, hole: 2, x: holes[2], tx: holes[2], gy: 10 * T, y: 10 * T - 24, k: 1, hw: 26, hh: 24, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, hinted: false, thrown: false };
  },
});
function updateMoleBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2;
  const setY = () => { B.y = B.gy + 30 - 54 * B.k; };
  if (B.dead) { B.deadT += dt; B.k = Math.min(1, B.k + dt * 3); setY(); B.dir = pcx < B.x ? -1 : 1; return; }
  if (!G.bossActive) {
    B.dir = pcx < B.x ? -1 : 1; setY();
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'laugh'; B.st = 0; Music.start('boss'); say('Копайло: «Усі зірочки — в мою нору! Спіймай мене, якщо зможеш!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  if (B.state === 'laugh') { B.dir = pcx < B.x ? -1 : 1; if (B.st > 1.2) { B.state = 'dig'; B.st = 0; } }
  else if (B.state === 'dig') {
    B.k = Math.max(0, B.k - dt / 0.35);
    if (B.k <= 0) {
      B.state = 'move'; B.st = 0;
      const opts = B.holes.map((h, i) => i).filter(i => i !== B.hole);
      let pick = opts[Math.floor(Math.random() * opts.length)];
      if (Math.random() < 0.55) {
        const near = opts.slice().sort((a, b) => Math.abs(B.holes[a] - pcx) - Math.abs(B.holes[b] - pcx));
        pick = Math.abs(B.holes[near[0]] - pcx) < 30 ? near[1] : near[0];
      }
      B.hole = pick; B.tx = B.holes[pick];
    }
  } else if (B.state === 'move') {
    const sp = angry ? 330 : 250, d = B.tx - B.x;
    B.dir = d < 0 ? -1 : 1; B.x += clamp(d, -sp * dt, sp * dt);
    if (Math.abs(B.tx - B.x) < 1) { B.x = B.tx; B.state = 'warn'; B.st = 0; Snd.tone(140, 0.4, 'sawtooth', 0.04, 90); if (!B.hinted) { B.hinted = true; say('Земля трясеться! Зараз він вилізе — готуй ріг', 2); } }
  } else if (B.state === 'warn') {
    if (B.st > (angry ? 0.45 : 0.65)) { B.state = 'up'; B.st = 0; Snd.tone(400, 0.15, 'square', 0.05, 800); burst(B.x, B.gy - 4, 14, ['#a8743f', '#7a4f30', '#ffffff'], 150); }
  } else if (B.state === 'up' || B.state === 'throw') {
    B.k = Math.min(1, B.k + dt / 0.22); B.dir = pcx < B.x ? -1 : 1;
    if (B.state === 'up' && B.st > 0.45) { B.state = 'throw'; B.thrown = false; B.st = 0; }
    if (B.state === 'throw' && !B.thrown && B.st > 0.15) {
      B.thrown = true; const n = angry ? 3 : 2;
      for (let i = 0; i < n; i++) G.bolts.push({ kind: 'rock', r: 6, x: B.x + B.dir * 18, y: B.gy - 44, vx: clamp((pcx - B.x) / 0.85 + (i - (n - 1) / 2) * 50, -240, 240), vy: -420, g: 900, t: 0 });
      Snd.tone(300, 0.15, 'square', 0.05, 200);
    }
    if (B.state === 'throw' && B.st > (angry ? 1.4 : 2.0)) { B.state = 'dig'; B.st = 0; }
  }
  setY();
  if (B.k > 0.55) {
    const box = { x: B.x - 22, y: B.y - 24, w: 44, h: 48 };
    if (overlap(P, box)) {
      if (P.vy > 40 && P.y + P.h - box.y < 18) { hitBoss(2); P.vy = -480; P.cut = true; if (!B.dead) { B.state = 'dig'; B.st = 0; } }
      else hurtPlayer(false);
    }
  }
}
