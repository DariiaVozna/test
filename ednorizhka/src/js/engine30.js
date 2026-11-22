'use strict';
/* ===== Частина 35 «Костюми й бульбашки»: костюми котика, жабки й привидки, стіни привидів і Мильний Бульбах ===== */
Object.assign(TUNES, {
  catroofs: { base: 587.33, ms: 160, n: [0, 4, 7, 4, 0, null, 7, null, 5, 9, 12, 9, 5, null, 12, null, 4, 7, 11, 7, 4, null, 11, null, 12, 11, 9, 7, 5, 4, 2, null], b: [0, -5, -3, -7] },
  frogpond: { base: 523.25, ms: 175, n: [0, null, 0, 4, 7, null, 7, 4, 5, null, 5, 9, 12, null, 12, 9, 7, null, 7, 4, 0, null, 2, 4, 5, 4, 2, null, 0, null, null, null], b: [0, -5, -3, -7] },
  ghosthouse: { base: 440, ms: 200, n: [0, 3, 7, 10, 7, 3, 0, null, -2, 2, 5, 8, 5, 2, -2, null, 0, 3, 7, 12, 10, 7, 3, null, 5, 3, 2, 0, null, null, null, null], b: [0, -4, -2, -5] },
  costumeparty: { base: 659.25, ms: 145, n: [0, 4, 7, 12, 11, 7, 4, 0, 2, 5, 9, 14, 12, 9, 5, 2, 4, 7, 11, 16, 14, 11, 7, 4, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
  soapfactory: { base: 554.37, ms: 165, n: [0, 7, 12, 7, 4, 7, 12, null, 2, 9, 14, 9, 5, 9, 14, null, 4, 11, 16, 11, 7, 11, 16, null, 12, 7, 4, 0, null, null, null, null], b: [0, -5, -3, -7] },
});
STICKERS.push(
  { id: 'catroofs', k: 'cat', name: 'Котик' },
  { id: 'frogpond', k: 'frog', name: 'Жабка' },
  { id: 'ghosthouse', k: 'ghost', name: 'Привидко' },
  { id: 'costumeparty', k: 'mask', name: 'Карнавальна маска' },
  { id: 'soapfactory', k: 'bubble', name: 'Мильна бульбашка' },
);
const COSTUME_MSG = {
  cat: 'Костюм котика! Біля високої стіни тримай стрілку до неї й тисни «Стрибок» ще й ще — котик видряпається нагору',
  frog: 'Костюм жабки! Тепер ти стрибаєш дуже-дуже високо',
  ghost: 'Костюм привидки! Тепер ти проходиш крізь фіолетові стіни привидів',
};

/* ===== Підготовка рівня ===== */
function initLevel30(G, L) {
  G.wardrobes = (L.wardrobes || []).map(w => Object.assign({ used: 0 }, w));
  G.gwalls = (L.gwalls || []).slice(); G.gwOpen = false; G.gwPending = [];
  G.P.costume = null; G.P.catCling = false; G.P.frogJ = false;
  initLevel31(G, L);
}

/* ===== Стіни привидів: тверді для всіх, крім єдиноріжки в костюмі привидки ===== */
function applyGhostWalls() {
  const P = G.P, open = P.costume === 'ghost'; G.gwOpen = open; G.gwPending = [];
  for (const b of G.gwalls) {
    const i = b.y * G.Wt + b.x;
    if (open) G.map[i] = 0;
    else if (overlap(P, { x: b.x * T, y: b.y * T, w: T, h: T })) G.gwPending.push(b);
    else G.map[i] = 2;
  }
}

/* ===== Шафи з костюмами й самі костюми ===== */
function updateCostumes(dt) {
  const P = G.P;
  for (const w of G.wardrobes) {
    if (w.used > 0) w.used -= dt;
    if (P.costume === w.k || w.used > 0 || !overlap(P, { x: w.x * T - 2, y: w.gy - 44, w: 28, h: 44 })) continue;
    P.costume = w.k; w.used = 1; P.catCling = false; P.frogJ = true;
    Snd.seq([0, 4, 7, 12, 7, 12], 659.25, 0.06, 'triangle', 0.06); burst(P.x + P.w / 2, P.y + 10, 20, RAINBOW, 150);
    floatText(P.x + P.w / 2, P.y - 16, 'Костюм!', '#ff4fa3');
    say(COSTUME_MSG[w.k], 3.6);
  }
  if (G.gwalls.length && (P.costume === 'ghost') !== G.gwOpen) applyGhostWalls();
  if (G.gwPending.length) G.gwPending = G.gwPending.filter(b => {
    if (G.gwOpen) return false;
    if (overlap(P, { x: b.x * T, y: b.y * T, w: T, h: T })) return true;
    G.map[b.y * G.Wt + b.x] = 2; return false;
  });
  // котик чіпляється за стіну, до якої тиснеш стрілку, повільно сповзає й може стрибнути знову
  P.catCling = false;
  if (P.costume === 'cat' && !P.onGround && !P.hotair && !P.sled && !P.mount && !P.inCannon && !P.zip && !P.vine && !P.swing && !P.ride) {
    const dir = In.right ? 1 : In.left ? -1 : 0;
    if (dir) {
      const tx = Math.floor((dir > 0 ? P.x + P.w + 2 : P.x - 2) / T);
      if (solid(tileAt(tx, Math.floor((P.y + 6) / T))) || solid(tileAt(tx, Math.floor((P.y + P.h - 6) / T)))) {
        P.catCling = true; P.coyote = 0.14; if (P.vy > 55) P.vy = 55;
        if (!G.catHint) { G.catHint = true; say('Котик тримається за стіну! Тисни «Стрибок» — і дряпайся вище', 2.6); }
      }
    }
  }
  // жабка: кожен стрибок із землі набагато вищий
  if (P.onGround) P.frogJ = false;
  else if (P.costume === 'frog' && !P.frogJ && P.vy < -450 && P.vy > -600) { P.vy *= 1.32; P.frogJ = true; }
}

function update30(dt) {
  updateCostumes(dt);
  update31(dt);
}

/* ===== Мильний Бульбах: велика бульбашка, що розпадається на менші ===== */
const SOAP_R = [0, 13, 22, 34], SOAP_VY = [0, 360, 400, 430], SOAP_VX = [0, 100, 85, 70];
BOSS2.soapy = L => ({ kind: 'soapy', name: 'Мильний Бульбах', acc: 'Мильного Бульбаха', win: ' Тепер він пускає для всіх веселі мильні бульбашки.', x: L.arena.x0 + 16 * T, gy: 10 * T, y: -999, hw: 2, hh: 2, hp: 21, max: 21, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, balls: [], lx: L.arena.x0 + 16 * T, ly: 10 * T - 60 });
function updateSoapBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena, gy = B.gy, left = A.x0 + 2 * T, right = A.x0 + 25 * T;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) {
      G.bossActive = true; G.arenaLock = true; B.state = 'fight'; Music.start('boss'); G.flash = 0.3;
      B.balls = [{ x: A.x0 + 18 * T, y: gy - 150, vx: -SOAP_VX[3], vy: 0, s: 3, t: 0, inv: 0.5, sq: 0 }];
      say('Мильний Бульбах: «Буль-буль! А ну, спробуй мене лопнути!»', 2.8);
    }
    return;
  }
  B.st += dt;
  const born = [];
  for (const b of B.balls) {
    b.t += dt; if (b.inv > 0) b.inv -= dt; if (b.sq > 0) b.sq -= dt;
    const r = SOAP_R[b.s];
    b.vy += 600 * dt; b.x += b.vx * dt; b.y += b.vy * dt;
    if (b.y + r > gy) { b.y = gy - r; b.vy = -SOAP_VY[b.s]; b.sq = 0.14; }
    if (b.x - r < left) { b.x = left + r; b.vx = Math.abs(b.vx); }
    if (b.x + r > right) { b.x = right - r; b.vx = -Math.abs(b.vx); }
    if (b.y - r < 6) { b.y = 6 + r; b.vy = Math.abs(b.vy); }
    let hit = false;
    if (!(b.inv > 0)) for (const s of G.shots) if (s.life > 0 && Math.hypot(s.x - b.x, s.y - b.y) < r + s.r + 3) { hit = true; if (!s.big) s.life = 0; break; }
    const pb = { x: b.x - r * 0.78, y: b.y - r * 0.78, w: r * 1.56, h: r * 1.56 };
    if (!hit && !(b.inv > 0) && overlap(P, pb)) {
      if (P.vy > 40 && P.y + P.h - (b.y - r) < 16) { hit = true; P.vy = -470; P.cut = true; }
      else hurtPlayer(false);
    }
    if (hit) {
      b.dead = true;
      if (b.s > 1) for (const d of [-1, 1]) born.push({ x: b.x + d * 6, y: b.y, vx: d * SOAP_VX[b.s - 1], vy: -330, s: b.s - 1, t: 0, inv: 0.3, sq: 0 });
      burst(b.x, b.y, 8 + b.s * 5, ['#ffffff', '#c8f0ff', '#ffb3e6', '#fff3a0'], 150);
      Snd.tone(900 - b.s * 150, 0.08, 'triangle', 0.07, 1400 - b.s * 150);
      B.lx = b.x; B.ly = b.y; B.x = b.x; B.y = b.y; hitBoss(3); B.y = -999;
      if (B.dead) { B.balls = []; B.x = B.lx; B.y = B.ly; return; }
      if (b.s === 3) say('Бульбах розділився! Лопни всі бульбашки — і великі, і маленькі', 2.6);
      else if (b.s === 1 && !B.popHint) { B.popHint = true; say('Лоп! Маленькі бульбашки лопаються зовсім', 2); }
    }
  }
  B.balls = B.balls.filter(b => !b.dead).concat(born);
  if (B.balls.length) { const pcx = P.x + P.w / 2; let nb = B.balls[0]; for (const b of B.balls) if (Math.abs(b.x - pcx) < Math.abs(nb.x - pcx)) nb = b; B.x = nb.x; }
}
const armored19base35 = armored19;
armored19 = function (s, B) {
  if (B.kind === 'soapy') return true;
  return armored19base35(s, B);
};
const resetBoss19base35 = resetBoss19;
resetBoss19 = function (B) {
  if (B.kind === 'soapy') {
    const pcx = G.P.x + G.P.w / 2, far = G.arena.x0 + 22 * T;
    for (const b of B.balls) if (Math.abs(b.x - pcx) < 7 * T) { b.x = far; b.y = B.gy - 140; b.vy = 0; b.inv = 0.6; }
    return;
  }
  resetBoss19base35(B);
};
