'use strict';
/* ===== Частина 20: паперові літачки, морозиво, що тане, веселкова доріжка, морський коник, Жабка Квакуша ===== */
Object.assign(TUNES, {
  paperplanes: { base: 587.33, ms: 190, n: [0, null, 7, null, 12, null, 7, null, 9, null, 5, null, 4, null, null, null, 2, null, 7, null, 11, null, 7, null, 12, null, 9, null, 7, null, null, null], b: [0, -5, -3, -7] },
  icecream: { base: 698.46, ms: 170, n: [0, 4, 7, 12, 7, 4, 0, null, 2, 5, 9, 14, 9, 5, 2, null, 4, 7, 11, 16, 11, 7, 4, null, 5, 4, 2, 0, null, null, null, null], b: [0, -5, -3, -7] },
  rainbowroad: { base: 523.25, ms: 200, n: [0, null, 4, null, 7, null, 12, null, 16, null, 12, null, 7, null, null, null, 2, null, 5, null, 9, null, 14, null, 17, null, 14, null, 9, null, null, null], b: [0, -5, -7, -3] },
  seahorse: { base: 493.88, ms: 230, n: [0, null, null, 4, null, 7, null, null, 9, null, 7, null, 4, null, null, null, 2, null, null, 5, null, 9, null, null, 12, null, 9, null, 5, null, null, null], b: [0, -3, -7, -5] },
  pond: { base: 587.33, ms: 180, n: [0, null, 0, 7, null, 7, 9, 7, null, 5, null, 5, 4, null, 2, null, 0, null, 0, 7, null, 7, 9, 7, null, 5, 4, 2, 0, null, null, null], b: [0, -5, -3, -7] },
});
Object.assign(WALKERS, { icecone: 1 });
Object.assign(HOVER, { goldfish: 1 });

function spawnEnemy16(e, b, hover, g) {
  switch (e.k) {
    case 'icecone': return g(18, 26, { speed: 26 });
    case 'goldfish': return hover(22, 14, 3, 0.8, 6);
  }
  return null;
}
function updateEnemy16(e, dt) { return false; }

/* ===== Підготовка рівня ===== */
function initLevel16(G, L) {
  const P = G.P; P.plane = null; P.rainbowT = 0; P.rbY = null; P.seahorse = null;
  G.planeRings = (L.planeRings || []).map(r => Object.assign({ got: false, t: 0 }, r));
  G.seahorses = (L.seahorses || []).map(s => Object.assign({ state: 'free', t: Math.random() * 3, hx: s.x, hy: s.y, ox: s.x, oy: s.y, dir: 1 }, s));
  for (const m of G.movers) if (m.scoop) { m.life = 1; m.state = 'full'; m.t = 0; }
  for (const m of G.movers) if (m.plane) { m.state = 'idle'; m.vy = 0; m.puffs = 3; m.t = 0; }
}
function powerUp16(P, p) {
  P.rainbowT = 10; P.rbY = P.onGround ? P.y + P.h : null;
  say(G.rainbowHint ? 'Знову веселкова доріжка!' : 'Веселкова доріжка! Над ямою під ногами з\'явиться веселка — іди просто по повітрю', 3.2); G.rainbowHint = true;
}

/* ===== Паперовий літачок: летить сам і повільно спускається, «Стрибок» підкидає вгору ===== */
const PLANE_V = 125;
function planeHits(m, x, y) {
  // літачок разом з єдиноріжкою на ньому: перевіряємо кілька точок
  const pts = [[x + 2, y + 8], [x + m.w - 2, y + 8], [x + m.w + 4, y + 2], [x + m.w + 2, y - 24], [x + m.w / 2, y - 30], [x + 6, y - 24], [x + m.w / 2, y + 10]];
  for (const [px, py] of pts) if (py >= 0 && solid(tileAt(Math.floor(px / T), Math.floor(py / T)))) return true;
  return false;
}
// один крок польоту; s = { x, y, vy }. Повертає null, 'landed', 'bounce' або 'crash'
function planeRunway(m, x, y) {
  // садимося лише на широку землю, а з вузького стовпчика відскакуємо
  const row = Math.floor((y + 11) / T), c0 = Math.floor((x + 2) / T);
  for (let c = c0; c < c0 + 4; c++) if (!solid(tileAt(c, row))) return false;
  return true;
}
function planeAdvance(m, s, dt) {
  s.vy = Math.min(55, s.vy + 140 * dt);
  const nx = s.x + PLANE_V * dt, ny = s.y + s.vy * dt;
  if (planeHits(m, nx, ny)) {
    if (s.vy > 0 && !planeHits(m, nx, s.y) && planeHits(m, s.x, ny)) {
      if (planeRunway(m, s.x, ny)) return 'landed';
      s.vy = -90; s.x = nx; return 'bounce';
    }
    if (s.vy < 0 && !planeHits(m, nx, s.y)) { s.vy = 0; s.x = nx; return null; }
    return 'crash';
  }
  s.x = nx; s.y = ny;
  if (s.y < 40) { s.y = 40; s.vy = Math.max(0, s.vy); }
  return s.y > VIEW_H - 14 ? 'crash' : null;
}
function planeStep(P, dt) {
  const m = P.plane;
  m.t += dt;
  if (In.jumpP && m.puffs > 0) { m.puffs--; m.vy = -150; Snd.tone(600, 0.15, 'triangle', 0.06, 900); for (let i = 0; i < 4; i++) G.parts.push({ k: 'spark', x: m.x + 4, y: m.y + 6, vx: -60 - Math.random() * 60, vy: (Math.random() - 0.5) * 40, t: 0, life: 0.4, col: '#ffffff', r: 2 }); }
  const st = { x: m.x, y: m.y, vy: m.vy }, ev = planeAdvance(m, st, dt);
  m.x = st.x; m.y = st.y; m.vy = st.vy;
  const landed = ev === 'landed', crash = ev === 'crash';
  if (ev === 'bounce') { Snd.boing(); burst(m.x + m.w / 2, m.y + 10, 6, ['#ffffff', '#cfe0ff'], 70); }
  for (const r of G.planeRings) if (!r.got && Math.abs(m.x + m.w / 2 - r.x) < 24 && Math.abs(m.y - 10 - r.y) < 26) {
    r.got = true; m.puffs = Math.min(3, m.puffs + 2); m.vy = Math.min(m.vy, -60); Snd.seq([0, 7, 12], 784, 0.05, 'triangle', 0.07); burst(r.x, r.y, 12, RAINBOW, 120);
    if (!G.ringHint) { G.ringHint = true; say('Кільце! Літачок отримав ще два підкидання', 2.4); }
  }
  if (!G.planeHint) { G.planeHint = true; say('Літачок летить сам і помалу знижується. Тисни «Стрибок» — підкинеш його вгору (три рази)', 3.4); }
  P.x = m.x + m.w / 2 - P.w / 2; P.y = m.y - P.h + 2; P.vx = 0; P.vy = 0; P.onGround = true; P.onMover = null; P.coyote = 0; P.jumpBuf = 0; P.dir = 1;
  if (landed) { m.state = 'landed'; m.vy = 0; P.plane = null; P.onMover = m; P.y = m.y - P.h; Snd.seq([0, 4, 7], 523, 0.07, 'triangle', 0.07); }
  if (crash) {
    m.state = 'gone'; m.crashed = true; m.t = 0; P.plane = null; P.vx = -120; P.vy = -200; P.onGround = false; P.launchT = 0.3;
    Snd.tone(300, 0.3, 'sawtooth', 0.05, 120); burst(m.x + m.w, m.y, 10, ['#ffffff', '#cfe0ff'], 100);
    if (!G.crashHint20) { G.crashHint20 = true; say('Ой! Літачок зім\'явся. Новий чекає на старті', 2.4); }
  }
  if (P.inv > 0) P.inv -= dt;
  P.shootCd -= dt; P.t += dt * 0.3;
  if (In.shootP) { P.charging = true; P.charge = 0; } if (In.shootR && P.charging) { fire(false); P.charging = false; }
}
function updatePlane(m, dt) {
  m.dx = 0; m.dy = 0;
  if (m.state === 'idle' && G.P.onMover === m && !G.P.plane) { G.P.plane = m; m.state = 'fly'; m.vy = -140; m.puffs = 3; m.t = 0; Snd.seq([0, 7, 12], 523, 0.06, 'triangle', 0.07); for (const r of G.planeRings) r.got = false; }
  // зім'ятий літачок падає (на ньому не можна стояти), а за мить новий з'являється на старті
  else if (m.state === 'gone') { m.t += dt; m.y = Math.min(VIEW_H + 20, m.y + 160 * dt); if (m.t > 1.2) { m.x = m.bx; m.y = m.by; m.state = 'idle'; m.crashed = false; } }
  else if (m.state === 'landed') { m.t += dt; if (G.P.onMover !== m && m.t > 2) { m.t = 0; m.x = m.bx; m.y = m.by; m.state = 'idle'; } }
}

/* ===== Морозиво, що тане: постоїш — розтане, а потім виросте знову ===== */
function updateScoop(m, dt) {
  m.dx = 0; m.dy = 0;
  const on = G.P.onMover === m;
  if (m.state === 'full' || m.state === 'melt') {
    if (on) { m.state = 'melt'; m.life -= dt / 1.8; if (G.t % 0.3 < dt) G.parts.push({ k: 'spark', x: m.x + Math.random() * m.w, y: m.y + 10, vx: 0, vy: 40, t: 0, life: 0.6, col: m.col || '#ff9fd0', r: 2 }); if (!G.scoopHint) { G.scoopHint = true; say('Морозиво тане під ногами! Не стій довго', 2.4); } }
    else if (m.life < 1) { m.life = Math.min(1, m.life + dt / 4); if (m.life >= 1) m.state = 'full'; }
    if (m.life <= 0) { m.state = 'gone'; m.t = 0; Snd.tone(400, 0.3, 'sine', 0.04, 200); }
  } else if (m.state === 'gone') {
    m.t += dt;
    const P = G.P, over = P.x + P.w > m.x && P.x < m.x + m.w && P.y + P.h > m.y - 4 && P.y < m.y + 20;
    if (m.t > 3 && !over) { m.state = 'full'; m.life = 1; Snd.tone(700, 0.15, 'triangle', 0.04, 1000); }
  }
}

/* ===== Веселкова доріжка: над ямою під ногами з'являється веселка ===== */
function pitBelow(x, fromY) {
  for (let ty = Math.max(0, Math.floor(fromY / T)); ty < ROWS; ty++) { const v = tileAt(Math.floor(x / T), ty); if (solid(v) || v === 3) return false; }
  for (const z of G.water) if (x >= z.x0 && x <= z.x1) return false;
  return true;
}
function updateRainbow(P, dt) {
  if (!(P.rainbowT > 0)) return;
  P.rainbowT -= dt; if (P.rainbowT <= 0) { P.rainbowT = 0; say('Веселкова доріжка скінчилася', 1.8); return; }
  if (P.hotair || P.plane || waterAt(P.x + P.w / 2, P.y + P.h / 2)) return;
  if (P.onGround) { P.rbY = P.y + P.h; return; }
  if (P.rbY == null || P.vy < 0) return;
  const feet = P.y + P.h, cx = P.x + P.w / 2;
  if (feet <= P.rbY + 1 && feet + P.vy * dt * 1.6 >= P.rbY - 1 && pitBelow(cx, P.rbY + 2)) {
    const x = cx - 20;
    // згаслі шматочки веселки використовуємо знову, щоб не накопичувалися
    const old = G.movers.find(m => m.rbSeg && m.state === 'gone');
    if (old) Object.assign(old, { x, y: P.rbY, bx: x, by: P.rbY, life: 2.5, state: undefined, dx: 0, dy: 0 });
    else G.movers.push({ special15: true, rbSeg: true, x, y: P.rbY, bx: x, by: P.rbY, w: 40, dx: 0, dy: 0, life: 2.5, ax: 0, ay: 0, period: 1 });
    if (G.t % 0.2 < dt) Snd.tone(900 + Math.random() * 300, 0.08, 'sine', 0.03);
  }
}

/* ===== Морський коник: з ним пливеш швидко й навіть проти течії ===== */
function updateSeahorses(P, dt) {
  const wz = waterAt(P.x + P.w / 2, P.y + P.h / 2), pcx = P.x + P.w / 2, pcy = P.y + P.h / 2;
  for (const s of G.seahorses) {
    s.t += dt;
    if (s.state === 'free') {
      // коник підпливає до єдиноріжки, коли вона поруч у воді, а інакше вертається на своє місце
      const near = !P.seahorse && wz && Math.abs(pcx - s.ox) < 120 && Math.abs(pcy - s.oy) < 100;
      const tx = near ? pcx : s.ox, ty = near ? pcy : s.oy, dx = tx - s.hx, dy = ty - s.hy, d = Math.hypot(dx, dy), sp = (near ? 90 : 40) * dt;
      if (d > sp) { s.hx += dx / d * sp; s.hy += dy / d * sp; } else { s.hx = tx; s.hy = ty; }
      if (Math.abs(dx) > 3) s.dir = Math.sign(dx);
      s.y = s.hy + Math.sin(s.t * 2) * 4; s.x = s.hx;
      if (!P.seahorse && wz && Math.abs(pcx - s.x) < 22 && Math.abs(pcy - s.y) < 40) {
        P.seahorse = s; s.state = 'ride'; Snd.seq([0, 4, 7, 12], 587, 0.06, 'triangle', 0.07);
        if (!G.horseHint) { G.horseHint = true; say('Морський коник! З ним пливеш швидко й навіть проти течії', 3); }
      }
    }
  }
  if (P.seahorse) {
    const s = P.seahorse;
    // вийшла на берег — коник повертається додому
    if (!wz && P.onGround) { s.state = 'free'; s.hx = s.ox; s.hy = s.oy; s.x = s.ox; s.y = s.oy; P.seahorse = null; burst(pcx, P.y + P.h, 8, ['#ffb84d', '#fff'], 80); }
    else { s.x = pcx - P.dir * 2; s.y = P.y + P.h - 4; s.dir = P.dir; if (wz && G.t % 0.4 < dt) bubbles(pcx - P.dir * 10, P.y + P.h, 1); }
  }
}

function update16(dt) {
  const P = G.P;
  updateRainbow(P, dt);
  updateSeahorses(P, dt);
  // веселкова підставка з'являється знову, коли відійдеш
  for (const p of G.powers) if (p.k === 'rainbow' && p.got) { p.reT = (p.reT || 0) + dt; if (p.reT > 4 && Math.abs(P.x + P.w / 2 - p.x) > 60) { p.got = false; p.reT = 0; } }
}
function updatePlatform16(m, dt) {
  if (m.plane) return updatePlane(m, dt);
  if (m.scoop) return updateScoop(m, dt);
  if (m.rbSeg) { m.dx = 0; m.dy = 0; if (m.state !== 'gone') { m.life -= dt; if (m.life <= 0) m.state = 'gone'; } return; }
}
function respawn16(P) {
  if (P.plane) { const m = P.plane; m.state = 'idle'; m.x = m.bx; m.y = m.by; P.plane = null; }
  for (const m of G.movers) if (m.plane && m.state !== 'idle') { m.state = 'idle'; m.crashed = false; m.x = m.bx; m.y = m.by; }
  P.rainbowT = 0;
  if (P.seahorse) { const s = P.seahorse; s.state = 'free'; s.hx = s.x = s.ox; s.hy = s.y = s.oy; P.seahorse = null; }
}

/* ===== Жабка Квакуша: стріляє язиком, стрибає з хвилями, а потім співає «Ква!» ===== */
Object.assign(BOSS2, {
  frog: L => ({ kind: 'frog', name: 'Жабка Квакуша', acc: 'Жабку Квакушу', win: ' Тепер вона співає «Ква!» лише на добраніч і світить зірочками, як світлячками.', x: L.arena.x0 + 20 * T, gy: 10 * T, fy: 10 * T, y: 10 * T - 24, hw: 24, hh: 22, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, tongue: 0, tongues: 0, vx: 0, vy: 0, sac: 0 }),
});
function frogTongueBox(B) {
  const len = B.tongue; if (len <= 4) return null;
  const x0 = B.x + B.dir * 22, x1 = x0 + B.dir * len;
  return { x: Math.min(x0, x1), y: B.gy - 16, w: Math.abs(x1 - x0), h: 8 };
}
function updateFrogBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.fy = B.gy; B.y = B.fy - 24; B.tongue = 0; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'sit'; B.st = 0; Music.start('boss'); say('Жабка Квакуша: «Ква! Зірочки — мої світлячки! Не віддам!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 40, right = A.x1 - 40;
  if (B.state === 'sit') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > (angry ? 0.5 : 0.8)) { B.state = 'tongue'; B.st = 0; Snd.tone(500, 0.12, 'square', 0.04, 900); if (!B.tongueHint) { B.tongueHint = true; say('Квакуша стріляє язиком! Перестрибуй його', 2.4); } }
  } else if (B.state === 'tongue') {
    const out = 0.3, hold = 0.15, back = 0.3, max = angry ? 240 : 200;
    if (B.st < out) B.tongue = max * B.st / out;
    else if (B.st < out + hold) B.tongue = max;
    else if (B.st < out + hold + back) B.tongue = max * (1 - (B.st - out - hold) / back);
    else { B.tongue = 0; B.tongues++; B.st = 0; const nT = 2; B.state = B.tongues >= nT ? 'crouch' : 'sit'; if (B.tongues >= nT) { B.tongues = 0; B.hops = 0; } }
  } else if (B.state === 'crouch') {
    // присідає перед стрибком на інший бік
    // стрибає через єдиноріжку й приземляється з іншого боку від неї
    if (B.st > 0.6) {
      const s = pcx < B.x ? -1 : 1;
      let tx = pcx + s * 150;
      if (tx < left || tx > right) tx = pcx - s * 150;
      tx = clamp(tx, left, right);
      if (Math.abs(tx - B.x) < 60) tx = clamp(B.x + (B.x < (left + right) / 2 ? 200 : -200), left, right);
      B.state = 'leap'; B.st = 0; B.vy = -720; B.vx = (tx - B.x) / 0.96; B.dir = Math.sign(tx - B.x) || B.dir; Snd.boing();
    }
  } else if (B.state === 'leap') {
    B.vy += 1500 * dt; B.x += B.vx * dt; B.fy += B.vy * dt;
    if (B.fy >= B.gy && B.vy > 0) {
      B.fy = B.gy; B.x = clamp(B.x, left, right); G.flash = Math.max(G.flash, 0.12); Snd.bump();
      // сердита жабка стрибає двічі поспіль, а тоді вже співає
      if (angry && !B.hops) { B.hops = 1; B.state = 'crouch'; B.st = 0.25; } else { B.state = 'croak'; B.st = 0; }
      for (const d of [-1, 1]) G.bolts.push({ kind: 'wave', r: 7, x: B.x + d * 30, y: B.gy - 8, vx: d * (angry ? 190 : 160), vy: 0, t: 0 });
      if (!B.waveHint) { B.waveHint = true; say('Хвилі! Перестрибни їх', 2); }
    }
  } else if (B.state === 'croak') {
    B.sac = 0.5 + 0.5 * Math.sin(B.st * 9);
    if (B.st > 0.3 && G.t % 0.5 < dt) { floatText(B.x + B.dir * 10, B.fy - 60, 'Ква!', '#3f9a3a'); Snd.tone(220, 0.25, 'square', 0.05, 160); }
    if (!B.croakHint && B.st > 0.4) { B.croakHint = true; say('Квакуша співає й заплющила очі! Стріляй або стрибни на неї', 2.6); }
    if (B.st > (angry ? 2.2 : 2.8)) { B.state = 'sit'; B.st = 0; B.sac = 0; }
  }
  if (B.state !== 'tongue') B.tongue = 0;
  B.x = clamp(B.x, left - 10, right + 10);
  B.y = B.fy - 24;
  const box = { x: B.x - 24, y: B.fy - 40, w: 48, h: 40 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (stomp && B.state === 'croak') { hitBoss(2); P.vy = -480; P.cut = true; }
    else if (stomp) { P.vy = -440; P.cut = true; Snd.boing(); }
    else if (B.state !== 'croak') hurtPlayer(false);
  }
  const tb = frogTongueBox(B);
  if (tb && overlap(P, tb)) hurtPlayer(false);
}
function armored16(s, B) {
  if (B.kind === 'frog' && B.state !== 'croak') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Квакуша надто швидка! Стріляй, коли вона співає «Ква!»', 2.6); }
    return true;
  }
  return false;
}
function resetBoss16(B) {
  if (B.kind === 'frog') { B.state = 'sit'; B.st = 0; B.tongue = 0; B.tongues = 0; B.fy = B.gy; B.vy = 0; B.sac = 0; }
}
