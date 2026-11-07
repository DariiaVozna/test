'use strict';
/* ===== Частина 21: сумні хмаринки, парасолька, лоскотні квіточки, кубики-смайлики, рівень Маші й Сумний Смайлик ===== */
Object.assign(TUNES, {
  rainvalley: { base: 523.25, ms: 220, n: [0, null, 4, null, 7, null, 4, null, 2, null, 5, null, 9, null, null, null, 7, null, 5, null, 4, null, 2, null, 0, null, 2, null, 4, null, null, null], b: [0, -5, -3, -7] },
  umbrellas: { base: 587.33, ms: 190, n: [0, 4, 7, null, 9, null, 7, null, 12, null, 9, 7, 4, null, null, null, 2, 5, 9, null, 11, null, 9, null, 7, null, 5, 4, 2, null, null, null], b: [0, -5, -7, -5] },
  ticklegarden: { base: 659.25, ms: 170, n: [0, 7, 4, 7, 0, 7, 4, 7, 2, 9, 5, 9, 2, 9, 5, 9, 4, 11, 7, 11, 4, 12, 7, 12, 5, 4, 2, 0, null, null, null, null], b: [0, -5, -3, -7] },
  smiletown: { base: 523.25, ms: 180, n: [0, null, 0, 4, 7, null, 7, 9, 7, null, 4, null, 2, null, null, null, 5, null, 5, 9, 12, null, 12, 14, 12, null, 9, null, 7, null, null, null], b: [0, -5, -3, -7] },
  mashaland: { base: 698.46, ms: 175, n: [0, 4, 7, 12, 7, 4, 0, null, 5, 9, 12, 17, 12, 9, 5, null, 7, 11, 14, 19, 14, 11, 7, null, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
});
const POW17 = { heart: 1, air: 1, umbrella: 1, potbig: 1, potsmall: 1 };
const AIR_TIME = 12, UMB_TIME = 25;

function spawnEnemy17(e, b, hover, g) { return null; }
function updateEnemy17(e, dt) { return false; }

/* ===== Підготовка рівня ===== */
function initLevel17(G, L) {
  const P = G.P; P.umbT = 0; P.airT = 0; P.airY = null; P.heartPow = false;
  G.sadClouds = (L.sadClouds || []).map(q => Object.assign({ happy: false, joy: 0 }, q));
  G.tickles = (L.tickles || []).map(q => Object.assign({ happy: false, joy: 0, spring: null }, q));
  G.mcol = L.mcol && L.mcol.size ? L.mcol : null;
  for (const m of G.movers) if (m.mood) { m.state = 'sad'; m.joy = 0; }
  initLevel18(G, L);
}

/* ===== Бонуси: серце-суперсила, зілля, парасолька, великий і маленький пузирки ===== */
function powerUp17(P, p) {
  if (p.k === 'heart') { P.heartPow = true; Snd.seq([0, 4, 7, 12, 16], 523, 0.07, 'triangle', 0.08); say('Серце-суперсила! Тепер ріг перемагає навіть їжачків. Діє до кінця рівня', 3.6); }
  else if (p.k === 'air') { P.airT = AIR_TIME; P.airY = null; say(G.airHint ? 'Знову чарівне зілля!' : 'Чарівне зілля! Підстрибни й натисни «Ріг» — і підеш просто по повітрю', 3.6); G.airHint = true; }
  else if (p.k === 'umbrella') { P.umbT = UMB_TIME; say(G.umbHint ? 'Знову парасолька!' : 'Парасолька! У стрибку тримай «Стрибок» — і повільно опускатимешся, як пір\'їнка', 3.4); G.umbHint = true; }
  else if (p.k === 'potbig') { setBig(P, true, BIG_TIME); say(G.potBigHint ? 'Знову велетень!' : 'Великий пузирок! Ти велетень: ламай стіни з кубиків і перемагай ворогів', 3.2); G.potBigHint = true; }
  else if (p.k === 'potsmall') { setMini(P, true, 14); say(G.potSmallHint ? 'Знову крихітка!' : 'Маленький пузирок! Ти крихітна й пролізеш у нірку', 3); G.potSmallHint = true; }
}

/* ===== Постріл, що розвеселяє: повертає постріл, який влучив у прямокутник ===== */
function cheerShot(x0, y0, x1, y1) {
  for (const s of G.shots) if (s.life > 0 && s.x + s.r > x0 && s.x - s.r < x1 && s.y + s.r > y0 && s.y - s.r < y1) { s.life = 0; return s; }
  return null;
}
function cheerFx(x, y, text) {
  Snd.seq([0, 4, 7, 12], 659, 0.06, 'triangle', 0.07); burst(x, y, 16, RAINBOW, 140); floatText(x, y - 14, text || 'Хі-хі!', '#ff4fa3');
}

/* ===== Сумні хмаринки: постріл — і хмаринка усміхається й стає містком ===== */
function updateSadClouds(dt) {
  for (const q of G.sadClouds) {
    if (q.joy > 0) q.joy -= dt;
    if (q.happy) continue;
    const x0 = q.x0 * T, x1 = (q.x0 + q.w) * T, y = q.row * T;
    if (cheerShot(x0 - 4, y - 20, x1 + 4, y + 40)) cheerCloud(q);
  }
}
function cheerCloud(q) {
  q.happy = true; q.joy = 1.2;
  for (let i = 0; i < q.w; i++) G.map[q.row * G.Wt + q.x0 + i] = 3;
  cheerFx((q.x0 + q.w / 2) * T, q.row * T + 6, 'Ура!');
  if (!G.cloudCheerHint) { G.cloudCheerHint = true; say('Хмаринка усміхнулася! Тепер по ній можна пройти', 2.6); }
}

/* ===== Лоскотні квіточки: постріл — і квіточка сміється й підкидає вгору ===== */
function updateTickles(dt) {
  for (const f of G.tickles) {
    if (f.joy > 0) f.joy -= dt;
    if (f.happy) {
      // підкинула — сміється
      const s = f.spring; if (s && s.sq > 0.2 && !f.laughed) { f.laughed = true; f.joy = 0.6; floatText(f.x, f.gy - 44, 'Хі-хі!', '#ff4fa3'); } else if (s && s.sq <= 0) f.laughed = false;
      continue;
    }
    if (cheerShot(f.x - 16, f.gy - 36, f.x + 16, f.gy + 4)) {
      f.happy = true; f.joy = 1.4;
      f.spring = { x: f.x, gy: f.gy, sq: 0, flower: true };
      G.springs.push(f.spring);
      cheerFx(f.x, f.gy - 26, 'Хі-хі-хі!');
      if (!G.tickleHint) { G.tickleHint = true; say('Квіточка засміялася! Стрибни на неї — вона підкине високо', 2.8); }
    }
  }
}

/* ===== Кубики-смайлики: постріл — і кубик піднімається сходинкою ===== */
function updateMood(m, dt) {
  m.dx = 0; m.dy = 0; if (m.joy > 0) m.joy -= dt;
  if (m.state === 'sad') {
    if (cheerShot(m.x - 2, m.y - 12, m.x + m.w + 2, m.y + 30)) {
      m.state = 'rise'; m.joy = 1.2; cheerFx(m.x + m.w / 2, m.y, 'Ура!');
      if (!G.moodHint) { G.moodHint = true; say('Кубик повеселішав і піднімається! Застрибуй на нього', 2.6); }
    }
  } else if (m.state === 'rise') {
    const ty = m.by - m.rise, ny = Math.max(ty, m.y - 75 * dt);
    m.dy = ny - m.y; m.y = ny;
    if (ny <= ty) { m.state = 'happy'; Snd.tone(880, 0.12, 'triangle', 0.05, 1200); }
  }
}

/* ===== Парасолька й чарівне зілля ===== */
function updateUmbrella(P, dt) {
  if (P.umbT > 0) { P.umbT -= dt; if (P.umbT <= 0) { P.umbT = 0; say('Парасолька закрилася. Пошукай нову!', 2); } }
  for (const p of G.powers) if (p.k === 'umbrella' && p.got) { p.reT = (p.reT || 0) + dt; if (p.reT > 4 && Math.abs(P.x + P.w / 2 - p.x) > 60) { p.got = false; p.reT = 0; } }
}
function updateAirWalk(P, dt) {
  for (const p of G.powers) if ((p.k === 'air' || p.k === 'potbig' || p.k === 'potsmall') && p.got) { p.reT = (p.reT || 0) + dt; if (p.reT > 4 && Math.abs(P.x + P.w / 2 - p.x) > 60) { p.got = false; p.reT = 0; } }
  if (!(P.airT > 0)) return;
  P.airT -= dt;
  if (P.airT <= 0) { P.airT = 0; P.airY = null; say('Зілля скінчилося', 1.8); return; }
  if (P.hotair || P.plane || P.bub || P.hang || P.zip || P.kite || P.swing) return;
  // у стрибку «Ріг» — і під ногами з'являється повітряна доріжка на цій висоті
  if (!P.onGround && In.shootP) {
    P.airY = P.y + P.h; P.charging = false;
    Snd.seq([0, 7, 12], 784, 0.05, 'sine', 0.06); burst(P.x + P.w / 2, P.airY, 12, ['#ffffff', '#d9b8ff', '#ffe14d'], 90);
    if (!G.airWalkHint) { G.airWalkHint = true; say('Ти йдеш по повітрю!', 2); }
  }
  if (P.airY == null || P.vy < 0 || waterAt(P.x + P.w / 2, P.y + P.h / 2)) return;
  const feet = P.y + P.h, cx = P.x + P.w / 2;
  if (feet <= P.airY + 1 && feet + P.vy * dt * 1.6 >= P.airY - 1 && pitBelow(cx, P.airY + 2)) {
    const x = cx - 20, old = G.movers.find(m => m.airSeg && m.state === 'gone');
    if (old) Object.assign(old, { x, y: P.airY, bx: x, by: P.airY, life: 1.2, state: undefined, dx: 0, dy: 0 });
    else G.movers.push({ special15: true, airSeg: true, x, y: P.airY, bx: x, by: P.airY, w: 40, dx: 0, dy: 0, life: 1.2, ax: 0, ay: 0, period: 1 });
  }
}

function update17(dt) {
  const P = G.P;
  updateSadClouds(dt);
  updateTickles(dt);
  updateUmbrella(P, dt);
  updateAirWalk(P, dt);
  update18(dt);
}
function updatePlatform17(m, dt) {
  if (m.mood) return updateMood(m, dt);
  if (m.airSeg) { m.dx = 0; m.dy = 0; if (m.state !== 'gone') { m.life -= dt; if (m.life <= 0) m.state = 'gone'; } return; }
  return updatePlatform18(m, dt);
}
function respawn17(P) { P.airY = null; respawn18(P); }

/* ===== Сумний Смайлик: стрибає, піднімається й плаче, а потім сідає поплакати — тоді в нього можна влучити ===== */
Object.assign(BOSS2, {
  smiley: L => ({ kind: 'smiley', name: 'Сумний Смайлик', acc: 'Сумного Смайлика', win: ' Тепер він Веселий Смайлик і всім-всім усміхається.', x: L.arena.x0 + 28 * T, gy: 10 * T, R: 36, cy: 10 * T - 36, y: 10 * T - 36, hw: 34, hh: 34, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, vx: 0, vy: 0, hops: 0, squash: 0, tearT: 0, side: 1 }),
});
function updateSmileyBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt; if (B.squash > 0) B.squash = Math.max(0, B.squash - dt * 1.4);
  const floor = B.gy - B.R;
  if (B.dead) {
    // веселий Смайлик підстрибує від радості
    B.st += dt;
    if (B.cy < floor || B.vy < 0) { B.vy += 1500 * dt; B.cy = Math.min(floor, B.cy + B.vy * dt); if (B.cy >= floor) { B.vy = 0; B.squash = 0.25; } }
    else if (B.st > 0.9) { B.st = 0; B.vy = -380; }
    B.y = B.cy; return;
  }
  if (!G.bossActive) {
    B.cy = floor + Math.sin(B.t * 2) * 1.5; B.y = B.cy;
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'hop'; B.st = 0; B.hops = 0; Music.start('boss'); say('Сумний Смайлик: «Ой-ой… Мені так сумно! Не віддам зірочки!»', 3); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 50, right = A.x1 - 50;
  if (B.state === 'hop') {
    if (B.cy >= floor && B.vy >= 0) {
      B.cy = floor;
      if (B.st > (angry ? 0.25 : 0.4)) {
        let tx = clamp(pcx, left, right);
        if (Math.abs(tx - B.x) < 50) tx = clamp(B.x + (B.x < (left + right) / 2 ? 140 : -140), left, right);
        B.vy = -540; B.vx = (tx - B.x) / 0.72; B.dir = Math.sign(tx - B.x) || B.dir; B.st = 0; B.cy -= 1; Snd.boing();
      }
    } else {
      B.vy += 1500 * dt; B.x += B.vx * dt; B.cy += B.vy * dt;
      if (B.cy >= floor) {
        B.cy = floor; B.vy = 0; B.vx = 0; B.st = 0; B.squash = 0.35; B.hops++; G.flash = Math.max(G.flash, 0.1); Snd.bump();
        for (const d of [-1, 1]) G.bolts.push({ kind: 'wave', r: 7, x: B.x + d * 34, y: B.gy - 8, vx: d * (angry ? 180 : 150), vy: 0, t: 0 });
        if (!B.waveHint) { B.waveHint = true; say('Смайлик стрибає, і бризкають хвилі сліз! Перестрибуй їх', 2.6); }
        if (B.hops >= (angry ? 4 : 3)) { B.state = 'rise'; B.st = 0; }
      }
    }
  } else if (B.state === 'rise') {
    B.cy = Math.max(4 * T, B.cy - 130 * dt);
    if (B.cy <= 4 * T) { B.state = 'cry'; B.st = 0; B.tearT = 0.3; }
  } else if (B.state === 'cry') {
    // летить над єдиноріжкою й плаче сльозами
    const d = pcx - B.x; B.dir = Math.sign(d) || B.dir;
    B.x = clamp(B.x + Math.sign(d) * Math.min(Math.abs(d), (angry ? 70 : 52) * dt), left, right);
    B.cy = 4 * T + Math.sin(B.st * 3) * 6;
    B.tearT -= dt;
    if (B.tearT <= 0) { B.tearT = angry ? 0.3 : 0.42; B.side = -B.side; G.bolts.push({ kind: 'tear', x: B.x + B.side * 13, y: B.cy + 10, vx: 0, vy: 20, g: 480, r: 6, t: 0 }); Snd.tone(500 + Math.random() * 200, 0.08, 'sine', 0.03, 300); }
    if (B.st > 0.4 && G.t % 1.2 < dt) floatText(B.x, B.cy - B.R - 8, 'Ой-ой…', '#3f8fff');
    if (!B.cryHint && B.st > 0.6) { B.cryHint = true; say('Смайлик плаче! Не стій під сльозами', 2.4); }
    if (B.st > (angry ? 4.2 : 3.6)) { B.state = 'fall'; B.st = 0; }
  } else if (B.state === 'fall') {
    B.cy = Math.min(floor, B.cy + 300 * dt);
    if (B.cy >= floor) { B.state = 'sob'; B.st = 0; B.squash = 0.35; Snd.bump(); G.flash = Math.max(G.flash, 0.1); }
  } else if (B.state === 'sob') {
    B.cy = floor;
    if (B.st > 0.3 && G.t % 0.9 < dt) floatText(B.x + (Math.random() - 0.5) * 30, B.cy - B.R - 6, 'Хнык…', '#3f8fff');
    if (!B.sobHint && B.st > 0.3) { B.sobHint = true; say('Смайлик сів поплакати. Стріляй або стрибни на нього — і він повеселішає!', 3); }
    if (B.st > (angry ? 2.3 : 2.9)) { B.state = 'hop'; B.st = 0; B.hops = 0; }
  }
  B.x = clamp(B.x, left - 10, right + 10);
  B.y = B.cy;
  const box = { x: B.x - 30, y: B.cy - 32, w: 60, h: 64 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 18;
    if (stomp && B.state === 'sob') { hitBoss(2); P.vy = -480; P.cut = true; }
    else if (stomp) { P.vy = -440; P.cut = true; Snd.boing(); }
    else if (B.state !== 'sob') hurtPlayer(false);
  }
}
function armored17(s, B) {
  if (B.kind === 'smiley' && B.state !== 'sob') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Смайлик зараз не слухає… Стріляй, коли він сяде поплакати', 2.6); }
    return true;
  }
  return armored18(s, B);
}
function resetBoss17(B) {
  if (B.kind === 'smiley') { B.state = 'hop'; B.st = 0; B.hops = 0; B.vy = 0; B.vx = 0; B.cy = B.gy - B.R; B.y = B.cy; }
  resetBoss18(B);
}
