'use strict';
/* ===== Частина 16: батути, футбольний м'яч і ворота, дзеркала й сонячний промінь, зорі-обмінниці, Павич Пишнохвіст ===== */
Object.assign(TUNES, {
  trampoline: { base: 587.33, ms: 170, n: [0, 7, 12, null, 7, null, 0, 7, 4, 9, 12, null, 9, null, 4, null, 5, 9, 12, null, 9, null, 5, 9, 7, 11, 14, null, 12, null, null, null], b: [0, -5, -3, -7] },
  football: { base: 523.25, ms: 180, n: [0, null, 0, 4, 7, null, 4, null, 5, null, 5, 9, 12, null, 9, null, 7, null, 7, 11, 14, null, 11, null, 12, null, 7, null, 0, null, null, null], b: [0, -7, -5, -7] },
  mirrors: { base: 659.25, ms: 200, n: [0, 4, 7, 11, 12, null, 11, 7, 9, null, 5, null, 4, null, null, null, 2, 5, 9, 12, 14, null, 12, 9, 7, null, 4, null, 0, null, null, null], b: [0, -5, -3, -5] },
  observatory: { base: 493.88, ms: 220, n: [0, null, 7, null, 12, null, 11, null, 9, null, 7, null, 4, null, null, null, 5, null, 9, null, 12, null, 14, null, 12, null, 7, null, 9, null, null, null], b: [0, -5, -7, -3] },
  peacock: { base: 587.33, ms: 190, n: [0, null, 4, 7, 9, null, 7, 4, 2, null, 5, 9, 12, null, 9, null, 7, null, 11, 14, 12, null, 11, 7, 9, null, 5, null, 4, null, null, null], b: [0, -5, -3, -7] },
});
Object.assign(ENEMY2, { dragonfly: 1, bunny: 1 });
Object.assign(FLYERS, { dragonfly: 1 });
Object.assign(SHOOTABLE, { feather: 1 });
Object.assign(THORN_MSG, { trampoline: 'Ой, колючки! Через них перестрибуй із батута', observatory: 'Ой, колючки! Через них переносить зоря-обмінниця' });

/* Плитки: 36 — батут, 37 — сонячні двері (зачинені), 38 — сонячні двері (відчинені). Ворота за футбольною брамою — плитки 33/34 */
const TRAMP_V = [0, 560, 700, 830];

function spawnEnemy12(e, b, hover, g) {
  switch (e.k) {
    case 'dragonfly': return Object.assign(hover(24, 12, 3, 1, 3), { px: e.tx * T + 12, py: e.ty * T + 12, vxd: 1, wait: 0 });
    case 'bunny': return g(20, 20, { cool: 0.6 + (e.tx % 3) * 0.4, air: false });
  }
  return spawnEnemy13(e, b, hover, g);
}
function updateEnemy12(e, dt) {
  if (e.k === 'dragonfly') {
    // бабка мчить уздовж прямої, на краях зависає
    if (e.wait > 0) e.wait -= dt;
    else { e.px += e.vxd * 150 * dt; if (Math.abs(e.px - e.hx) > e.range) { e.px = e.hx + Math.sign(e.px - e.hx) * e.range; e.vxd *= -1; e.wait = 0.6; } }
    e.dir = e.vxd; e.x = e.px - e.w / 2; e.y = e.py + Math.sin(e.t * 6) * 3 - e.h / 2;
    return true;
  }
  if (e.k === 'bunny') {
    // зайчик підстрибує на місці: під ним можна пробігти, коли він угорі
    const P = G.P; e.dir = P.x + P.w / 2 < e.x + e.w / 2 ? -1 : 1;
    if (e.onGround) { e.air = false; e.cool -= dt; if (e.cool <= 0) { e.vy = -520; e.cool = 1.3; e.air = true; } }
    e.vx = 0; e.vy = Math.min(e.vy + GRAV * dt, 600); moveBody(e, dt);
    if (e.y > VIEW_H + 40) e.dead = true;
    return true;
  }
  return updateEnemy13(e, dt);
}

/* ===== Підготовка рівня ===== */
function initLevel12(G, L) {
  const P = G.P; P.tramp = 0; P.trampT = 0;
  G.tramps = L.tramps || [];
  G.balls12 = (L.balls12 || []).map(b => Object.assign({ x: b.hx, y: b.hy, vx: 0, vy: 0, w: 20, h: 20, cd: 0, rot: 0, onGround: false }, b));
  G.goals = (L.goals || []).map(g => Object.assign({ scored: false, t: 0 }, g, { tiles: g.tiles.map(q => q.slice()) }));
  G.mirrors = (L.mirrors || []).map(m => Object.assign({ spin: 0 }, m));
  G.mirrorAt = new Map(); for (const m of G.mirrors) G.mirrorAt.set(m.ty * G.Wt + m.tx, m);
  G.lamps = (L.lamps || []).map(l => Object.assign({}, l));
  G.suns = (L.suns || []).map(s => Object.assign({ on: false, t: 0 }, s, { door: s.door.map(q => q.slice()) }));
  G.sunAt = new Map(); for (const s of G.suns) G.sunAt.set(s.ty * G.Wt + s.tx, s);
  G.beams = [];
  G.swappers = (L.swappers || []).map(s => Object.assign({ cd: 0, used: false, t: 0, hx: s.x, hy: s.y }, s));
}

/* ===== Батут: кожен наступний стрибок вищий (до трьох разів) ===== */
function trampStep(P, dt) {
  if (P.trampT > 0) P.trampT -= dt;
  if (!P.onGround) return;
  if (P.groundTile !== 36) { P.tramp = 0; return; }
  P.tramp = Math.min(3, (P.trampT > 0 ? P.tramp : 0) + 1); P.trampT = 1.6;
  const ty = Math.floor((P.y + P.h + 2) / T); let bx = Math.floor((P.x + P.w / 2) / T);
  if (tileAt(bx, ty) !== 36) bx = tileAt(Math.floor(P.x / T), ty) === 36 ? Math.floor(P.x / T) : Math.floor((P.x + P.w - 0.01) / T);
  G.bumps.set(ty * G.Wt + bx, 0.18);
  P.vy = -(TRAMP_V[P.tramp] + (In.jump ? 50 : 0)); P.onGround = false; P.cut = true; P.coyote = 0; P.onMover = null;
  Snd.tone(220 + P.tramp * 110, 0.18, 'sine', 0.08, 440 + P.tramp * 160);
  burst(P.x + P.w / 2, P.y + P.h, 6 + P.tramp * 3, P.tramp === 3 ? RAINBOW : ['#ffffff', '#9fe0ff', '#ff9fd0'], 80 + P.tramp * 30);
  if (P.tramp === 3) floatText(P.x + P.w / 2, P.y - 10, 'Ух!', '#ff4fa3');
  if (!G.trampHint) { G.trampHint = true; say('Батут! Кожен стрибок вищий за попередній — аж до трьох разів', 2.8); }
}

/* ===== Футбол: м'яч котиться, відскакує, а гол відчиняє ворота ===== */
function updateBalls12(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const b of G.balls12) {
    // забитий м'яч лежить у сітці
    if (b.done) { b.vx = 0; b.rot += dt * 0.5; continue; }
    b.cd -= dt;
    const vx0 = b.vx, vy0 = b.vy;
    b.vy = Math.min(b.vy + 1300 * dt, 700);
    moveBody(b, dt);
    if (b.sideHit) b.vx = -vx0 * 0.55;
    if (b.headHit) b.vy = Math.abs(vy0) * 0.3;
    if (b.onGround) { if (vy0 > 150) { b.vy = -vy0 * 0.5; b.onGround = false; if (vy0 > 300) Snd.tone(160, 0.06, 'triangle', 0.04); } b.vx *= Math.pow(0.35, dt); if (Math.abs(b.vx) < 4) b.vx = 0; }
    b.rot += b.vx * dt / 10;
    if (b.y > VIEW_H + 20) { b.x = b.hx; b.y = b.hy; b.vx = b.vy = 0; burst(b.x + 10, b.y + 10, 10, ['#ffffff', '#3b1f4f'], 90); if (!G.ballPitHint) { G.ballPitHint = true; say('М\'яч упав у яму й повернувся на місце', 2.2); } }
    // удар: біжиш у м'яч — він летить уперед, у стрибку — вище
    const box = { x: b.x - 2, y: b.y - 2, w: b.w + 4, h: b.h + 4 };
    if (b.cd <= 0 && !P.inCannon && overlap(P, box)) {
      const bcx = b.x + b.w / 2, top = P.vy > 60 && P.y + P.h < b.y + 9;
      const dir = top ? P.dir : (bcx >= pcx ? 1 : -1);
      b.vx = dir * Math.max(240, Math.abs(P.vx) * 1.7); b.vy = P.onGround ? -250 : Math.min(-360, P.vy - 120); b.cd = 0.25;
      if (top) { P.vy = -320; P.cut = true; }
      Snd.tone(330, 0.07, 'square', 0.05, 200); G.parts.push({ k: 'puff', x: bcx, y: b.y + 14, vx: 0, vy: 0, t: 0, life: 0.3, r: 5 });
      if (!G.kickHint) { G.kickHint = true; say('Біжи в м\'яч — і він полетить! У стрибку він летить вище', 2.6); }
    }
    // м'яч збиває ворогів
    if (Math.abs(b.vx) > 140 || Math.abs(b.vy) > 200) for (const e of G.enemies) if (!e.dead && !e.ghost && !IMMUNE[e.k] && overlap(b, e)) { defeat(e); b.vx *= -0.4; }
    // гол
    for (const g of G.goals) {
      if (g.scored) continue;
      const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
      if (cx > g.x0 && cx < g.x1 && cy > g.gy - 70 && cy < g.gy) {
        g.scored = true; g.t = 0; b.vx = 0; b.done = true; b.y = g.gy - b.h; b.x = clamp(b.x, g.x0, g.x1 - b.w);
        for (const [tx, ty] of g.tiles) if (G.map[ty * G.Wt + tx] === 33) G.map[ty * G.Wt + tx] = 34;
        Snd.seq([0, 4, 7, 12, 16, 19], 659, 0.07, 'triangle', 0.08); G.flash = 0.2; burst(cx, cy - 20, 30, RAINBOW, 190);
        for (let i = 0; i < 3; i++) G.drops.push({ x: cx - 10 + i * 10, y: cy - 30, vx: (i - 1) * 60, vy: -260, t: 0, got: false });
        say('Го-о-ол! Ворота відчинилися', 2.2);
      }
    }
  }
  for (const g of G.goals) if (g.scored) g.t += dt;
}

/* ===== Дзеркала й сонячний промінь ===== */
function traceBeam(l) {
  let x = l.tx, y = l.ty, dx = l.dx, dy = l.dy, hit = null;
  const pts = [x * T + 12, y * T + 12];
  for (let i = 0; i < 160; i++) {
    x += dx; y += dy;
    if (x < 0 || x >= G.Wt || y < -1 || y >= ROWS) { pts.push(x * T + 12 - dx * 12, y * T + 12 - dy * 12); break; }
    const m = G.mirrorAt.get(y * G.Wt + x);
    if (m) { pts.push(x * T + 12, y * T + 12); if (m.d === 1) { const t = dx; dx = -dy; dy = -t; } else { const t = dx; dx = dy; dy = t; } continue; }
    const s = G.sunAt.get(y * G.Wt + x);
    if (s) { pts.push(x * T + 12, y * T + 12); hit = s; break; }
    if (solid(tileAt(x, y))) { pts.push(x * T + 12 - dx * 12, y * T + 12 - dy * 12); break; }
  }
  return { pts, hit };
}
function updateMirrors(dt) {
  for (const m of G.mirrors) {
    if (m.spin > 0) m.spin -= dt;
    const cx = m.tx * T + 12, cy = m.ty * T + 12;
    for (const s of G.shots) if (s.life > 0 && Math.abs(s.x - cx) < 10 + s.r && Math.abs(s.y - cy) < 12 + s.r) {
      s.life = 0; m.d *= -1; m.spin = 0.25; Snd.tone(900, 0.08, 'triangle', 0.05, 1300); burst(cx, cy, 6, ['#ffffff', '#c9f0ff'], 70);
      if (!G.mirrorHint) { G.mirrorHint = true; say('Дзеркальце повернулося! Спрямуй сонячний промінь на квітку', 2.6); }
    }
  }
  G.beams = G.lamps.map(traceBeam);
  for (const b of G.beams) {
    const s = b.hit;
    if (s && !s.on) {
      s.on = true; s.t = 0;
      for (const [tx, ty] of s.door) if (G.map[ty * G.Wt + tx] === 37) G.map[ty * G.Wt + tx] = 38;
      Snd.seq([0, 7, 12, 16, 19, 24], 784, 0.06, 'triangle', 0.08); burst(s.tx * T + 12, s.ty * T + 12, 22, ['#ffd23f', '#ffffff', '#ff9fd0'], 160);
      say('Квітка розквітла, і сонячні двері відчинилися!', 2.4);
    }
  }
  for (const s of G.suns) if (s.on) s.t += dt;
}

/* ===== Зорі-обмінниці: влучиш — і помінялася з нею місцями ===== */
function updateSwappers(dt) {
  const P = G.P;
  for (const w of G.swappers) {
    w.t += dt; if (w.cd > 0) w.cd -= dt;
    if (w.cd > 0) continue;
    for (const s of G.shots) {
      if (s.life <= 0 || Math.abs(s.x - w.x) > 12 + s.r || Math.abs(s.y - w.y) > 12 + s.r) continue;
      s.life = 0;
      const ox = P.x + P.w / 2, oy = P.y + P.h - 12;
      burst(ox, oy - 6, 14, ['#ffffff', '#c9b6ff', '#ffd23f'], 130); burst(w.x, w.y, 14, ['#ffffff', '#c9b6ff', '#ffd23f'], 130);
      P.x = w.x - P.w / 2; P.y = w.y + 12 - P.h; P.vx = 0; P.vy = 0; P.onMover = null; P.launchT = 0; P.onGround = false; P.vine = null;
      w.x = ox; w.y = oy; w.cd = 0.5; w.used = true;
      Snd.portal();
      if (!G.swapHint) { G.swapHint = true; say('Ти помінялася місцями із зорею! Стріляй у зорю ще, щоб повернутися', 2.8); }
      break;
    }
  }
}

function update12(dt) {
  const P = G.P;
  trampStep(P, dt);
  updateBalls12(dt);
  updateMirrors(dt);
  updateSwappers(dt);
  update13(dt);
}

/* ===== Павич Пишнохвіст: розпускає хвіст і пускає пір'їнки, клює, а тоді милується собою в дзеркальці ===== */
Object.assign(BOSS2, {
  peacock: L => ({ kind: 'peacock', name: 'Павич Пишнохвіст', acc: 'Павича Пишнохвоста', win: ' Тепер він знає, що найгарніший той, хто ділиться.', x: L.arena.x0 + 30 * T, gy: 10 * T, fy: 10 * T, y: 10 * T - 26, hw: 22, hh: 26, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, acts: 0, fired: false, lunge: 0 }),
});
function updatePeacockBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; B.fy = B.gy; B.y = B.gy - 26; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'strut'; B.st = 0; Music.start('boss'); say('Павич Пишнохвіст: «Зірочки так пасують до мого хвоста!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 40, right = A.x1 - 40;
  if (B.state === 'strut') {
    B.dir = pcx < B.x ? -1 : 1;
    if (Math.abs(pcx - B.x) > 110) B.x += B.dir * (angry ? 66 : 50) * dt;
    if (B.st > (angry ? 0.8 : 1.1)) {
      B.st = 0;
      if (B.acts >= 3) { B.state = 'admire'; B.acts = 0; Snd.seq([12, 16, 19], 784, 0.1, 'sine', 0.05); if (!B.admireHint) { B.admireHint = true; say('Павич милується собою в дзеркальці й нічого не бачить! Стріляй у нього', 2.6); } }
      else { B.state = B.acts % 2 === 0 ? 'fan' : 'peck'; B.fired = false; B.lunge = 0; B.acts++; }
    }
  } else if (B.state === 'fan') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > 0.55 && !B.fired) {
      B.fired = true; Snd.tone(700, 0.2, 'triangle', 0.06, 1100);
      const angs = angry ? [-0.42, -0.24, -0.08, 0.06, 0.18] : [-0.3, -0.12, 0.05];
      for (const a of angs) G.bolts.push({ kind: 'feather', r: 6, x: B.x + B.dir * 10, y: B.fy - 58, vx: B.dir * 230 * Math.cos(a), vy: 230 * Math.sin(a) + 40, t: 0 });
      if (!B.fanHint) { B.fanHint = true; say('Пір\'їнки летять! Перестрибни їх або збий пострілом', 2.4); }
    }
    if (B.st > 1.1) { B.state = 'strut'; B.st = 0; }
  } else if (B.state === 'peck') {
    if (B.st < 0.45) B.dir = pcx < B.x ? -1 : 1;
    else if (B.st < 0.8) { const d = B.dir * (angry ? 340 : 290) * dt; if (B.lunge < 120) { B.x += d; B.lunge += Math.abs(d); } }
    else { B.state = 'strut'; B.st = 0; }
  } else if (B.state === 'admire') {
    if (B.st > (angry ? 2.3 : 2.9)) { B.state = 'strut'; B.st = 0; }
  }
  B.x = clamp(B.x, left, right);
  B.fy = B.gy; B.y = B.gy - 26;
  const box = { x: B.x - 20, y: B.gy - 52, w: 40, h: 52 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (B.state === 'admire') { if (stomp) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else if (stomp && B.state !== 'peck') { P.vy = -430; P.cut = true; Snd.tink(); }
    else hurtPlayer(false);
  }
}
function armored12(s, B) {
  if (B.kind === 'peacock' && B.state !== 'admire') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Павич ховається за пишним хвостом! Стріляй, коли він милується собою', 2.6); }
    return true;
  }
  return false;
}
function resetBoss12(B) {
  if (B.kind === 'peacock') { B.state = 'strut'; B.st = 0; B.acts = 0; B.fy = B.gy; B.x = Math.max(B.x, G.arena.x0 + 14 * T); }
}
