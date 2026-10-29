'use strict';
/* ===== Частина 11: фарби, кам'яні кубики й кнопки, дельфіни й кити, стрілки-прискорювачі, тріснуті скелі, Хамелеон Барвик ===== */
Object.assign(TUNES, {
  paint: { base: 587.33, ms: 180, n: [0, null, 4, 7, null, 4, 9, null, 7, null, 4, null, 2, null, null, null, 0, null, 4, 7, null, 12, 11, null, 9, null, 7, null, 4, null, null, null], b: [0, -5, -3, -7] },
  temple: { base: 440, ms: 210, n: [0, null, 3, null, 7, null, 8, 7, null, 3, null, 2, 0, null, null, null, 5, null, 8, null, 12, null, 10, 8, null, 7, null, 3, 2, null, null, null], b: [0, -4, -5, -2] },
  bay: { base: 523.25, ms: 230, n: [0, null, null, 4, null, 7, 9, null, 7, null, null, 4, null, 2, null, null, 0, null, null, 4, null, 9, 12, null, 11, null, null, 9, null, 7, null, null], b: [0, -5, -3, -7] },
  quarry: { base: 493.88, ms: 160, n: [0, 0, 7, null, 5, null, 7, null, 0, 0, 7, null, 10, null, 7, null, 5, 5, 12, null, 10, null, 7, null, 5, null, 3, null, 0, null, null, null], b: [0, -5, -2, -7] },
  studio: { base: 659.25, ms: 200, n: [0, null, 4, null, 7, null, 11, null, 12, null, 7, null, 4, null, null, null, 2, null, 5, null, 9, null, 12, null, 14, null, 9, null, 5, null, null, null], b: [0, -3, -5, -7] },
});
Object.assign(WALKERS, { snake: 1, car: 1 });
Object.assign(ENEMY2, { urchin: 1 });
Object.assign(HOVER, { puffer: 1 });
Object.assign(SWIMMERS, { puffer: 1 });
Object.assign(NO_STOMP, { urchin: 1 });
Object.assign(IMMUNE, { urchin: 1 });
Object.assign(SHOOTABLE, { paintball: 1 });

/* Фарби: червона, синя, жовта. Стіни 14–16, кам'яний кубик 17, тріснута скеля 18, двері храму 19–21 */
const PAINTS = ['red', 'blue', 'yellow'];
const PAINT = {
  red: { col: '#ff4f5e', lo: '#c9233a', mane: ['#e8304a', '#ff6b7a', '#ffb0b8'], name: 'червона', ins: 'червоною' },
  blue: { col: '#3f8fff', lo: '#1f5fc9', mane: ['#1f6fe8', '#5fa6ff', '#b0d6ff'], name: 'синя', ins: 'синьою' },
  yellow: { col: '#ffd23f', lo: '#d9a000', mane: ['#f5a800', '#ffd23f', '#fff3a0'], name: 'жовта', ins: 'жовтою' },
};
function solid7(v) {
  if (v >= 14 && v <= 16) return G.paint !== PAINTS[v - 14];
  if (v === 17 || v === 18) return true;
  if (v >= 19 && v <= 21) return !G.doorOpen[v - 19];
  return v === 22 || v === 23;
}

function spawnEnemy7(e, b, hover, g) {
  switch (e.k) {
    case 'blob': return g(20, 16, { cool: 0.8 + Math.random(), air: false, col: PAINTS[Math.floor(Math.random() * 3)] });
    case 'snake': return g(26, 12, { speed: 28 });
    case 'car': return g(26, 16, { speed: 105 });
    case 'urchin': return g(20, 18, {});
    case 'puffer': return Object.assign(hover(22, 18, 2.6, 0.8, 5), { puff: 0 });
  }
  return spawnEnemy8(e, b, hover, g);
}
function updateEnemy7(e, dt) {
  if (e.k === 'urchin') return true;
  return updateEnemy8(e, dt);
}

/* ===== Підготовка рівня ===== */
function initLevel7(G, L) {
  G.paint = null; G.doorOpen = [false, false, false];
  G.buckets = (L.buckets || []).map(b => Object.assign({}, b));
  G.plates = (L.plates || []).map(p => Object.assign({}, p));
  G.boosts = (L.boosts || []).map(b => Object.assign({}, b));
  G.stoneOff = new Map(); G.stoneHome = (L.stones || []).slice(); G.stoneFallT = new Map();
  G.P.boostT = 0; G.P.pushT = 0;
}

/* ===== Кам'яні кубики: штовхаються тільки вперед (праворуч), падають, якщо під ними порожньо ===== */
function pushStone(P, tx, ty, dt) {
  if (!P.onGround || !In.right || P.x + P.w / 2 > tx * T) return;
  P.pushing = true; P.pushT = (P.pushT || 0) + dt;
  if (!G.pushHint) { G.pushHint = true; say('Штовхай кубик — він посунеться вперед', 2); }
  if (P.pushT < 0.15) return;
  if (tileAt(tx + 1, ty) !== 0 || tileAt(tx, ty - 1) === 17 || G.stoneFallT.has(ty * G.Wt + tx)) return;
  moveStone(tx, ty, tx + 1, ty);
  P.pushT = 0; Snd.tone(140, 0.12, 'triangle', 0.08, 90);
  G.parts.push({ k: 'puff', x: tx * T + 4, y: ty * T + T - 2, vx: -20, vy: 0, t: 0, life: 0.35, r: 5 });
}
function moveStone(tx, ty, nx, ny) {
  const W = G.Wt, i = ty * W + tx, j = ny * W + nx;
  G.map[i] = 0; G.map[j] = 17;
  const o = G.stoneOff.get(i) || { x: 0, y: 0 }; G.stoneOff.delete(i);
  G.stoneOff.set(j, { x: o.x + (tx - nx) * T, y: o.y + (ty - ny) * T });
  for (const e of G.enemies) if (!e.dead && e.x + e.w > nx * T + 2 && e.x < nx * T + T - 2 && e.y + e.h > ny * T + 2 && e.y < ny * T + T - 2) defeat(e);
}
function updateStones(dt) {
  for (const [i, o] of G.stoneOff) {
    const k = Math.min(1, dt * 14);
    o.x -= o.x * k; o.y -= o.y * k;
    if (Math.abs(o.x) < 0.3 && Math.abs(o.y) < 0.3) G.stoneOff.delete(i);
  }
  // падіння: кожен кубик, під яким порожньо, опускається на клітинку
  const W = G.Wt, x0 = Math.max(0, Math.floor(G.cam / T) - 20), x1 = Math.min(W - 1, Math.floor((G.cam + viewW) / T) + 20);
  for (let tx = x0; tx <= x1; tx++) for (let ty = ROWS - 1; ty >= 0; ty--) {
    const i = ty * W + tx;
    if (G.map[i] !== 17) continue;
    if (ty === ROWS - 1 || G.map[i + W] === 0) {
      const ft = (G.stoneFallT.get(i) || 0) + dt;
      if (ft < 0.07) { G.stoneFallT.set(i, ft); continue; }
      G.stoneFallT.delete(i);
      if (ty === ROWS - 1) { G.map[i] = 0; G.stoneOff.delete(i); respawnStone(tx); continue; }
      moveStone(tx, ty, tx, ty + 1); G.stoneFallT.set(i + W, 0);
      const P = G.P; if (P.x + P.w > tx * T && P.x < tx * T + T && P.y + P.h > (ty + 1) * T && P.y < (ty + 2) * T) hurtPlayer(false);
    } else if (G.stoneFallT.has(i)) { G.stoneFallT.delete(i); if (Math.abs(tx * T - G.P.x) < 400) Snd.bump(); }
  }
}
/* Кубик, що впав у прірву, повертається на своє місце */
function respawnStone(fromTx) {
  let best = null;
  for (const h of G.stoneHome) if (h.x <= fromTx && (!best || h.x > best.x)) best = h;
  if (!best) return;
  const i = best.y * G.Wt + best.x;
  if (G.map[i] !== 0) return;
  G.map[i] = 17; burst(best.x * T + 12, best.y * T + 12, 14, ['#ffffff', '#ffe14d'], 120);
}

/* ===== Тріснуті скелі: їх розбиває велика куля рогу ===== */
function crackHit(tx, ty, s) {
  if (!s.big) {
    Snd.tink();
    if (!G.crackHint || G.crackHint < G.t - 6) { G.crackHint = G.t; say('Тріснута скеля! Затисни «Ріг», а потім відпусти — велика куля її розіб\'є', 2.8); }
    return;
  }
  let y0 = ty; while (y0 > 0 && tileAt(tx, y0 - 1) === 18) y0--;
  for (let y = y0; y < ROWS && tileAt(tx, y) === 18; y++) {
    G.map[y * G.Wt + tx] = 0;
    burst(tx * T + 12, y * T + 12, 8, ['#c9b49a', '#8f7a64', '#ffffff'], 140);
    G.parts.push({ k: 'puff', x: tx * T + 12, y: y * T + 12, vx: (Math.random() - 0.5) * 40, vy: -20, t: 0, life: 0.6, r: 8 });
  }
  G.flash = Math.max(G.flash, 0.15); Snd.tone(110, 0.4, 'sawtooth', 0.09, 50); Snd.pop();
  G.drops.push({ x: tx * T + 12, y: ty * T, vx: 60, vy: -260, t: 0, got: false });
}

function paintProf() {
  const c = PAINT[G.paint];
  if (!G.paintProfCache || G.paintProfCache.c !== c || G.paintProfCache.p !== save.profile) G.paintProfCache = { c, p: save.profile, prof: Object.assign({}, save.profile, { maneC: c.mane }) };
  return G.paintProfCache.prof;
}

function update7(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  if (!P.pushing) P.pushT = 0; P.pushing = false;
  if (P.sideHit && tileAt(P.sideHit.tx, P.sideHit.ty) === 18 && (!G.crackHint || G.crackHint < G.t - 6)) { G.crackHint = G.t; say('Тріснута скеля! Затисни «Ріг», а потім відпусти — велика куля її розіб\'є', 2.8); }
  // відра з фарбою
  for (const b of G.buckets) {
    if (b.splash > 0) b.splash -= dt;
    if (G.paint === b.color || Math.abs(pcx - b.x) > 16 || P.y + P.h < b.gy - 34 || P.y > b.gy) continue;
    G.paint = b.color; b.splash = 0.5; Snd.tone(300, 0.18, 'sine', 0.08, 700); Snd.tone(900, 0.12, 'triangle', 0.05, null, 0.08);
    burst(pcx, P.y + 8, 18, [PAINT[b.color].col, '#ffffff'], 150);
    say(G.paintHint ? 'Тепер грива ' + PAINT[b.color].name + '!' : 'Грива стала ' + PAINT[b.color].ins + '! Тепер ' + PAINT[b.color].name + ' стіна тебе пропустить', 2.4);
    G.paintHint = true;
  }
  // кнопки й двері храму
  for (const p of G.plates) {
    const stone = tileAt(p.tx, p.row) === 17;
    const stand = P.onGround && Math.abs(pcx - p.x) < 15 && Math.abs(P.y + P.h - p.gy) < 3;
    const on = stone || stand;
    if (on !== p.on) {
      p.on = on; G.doorOpen[p.id] = on; Snd.click(); if (on) Snd.door();
      if (!on) {
        // двері зачинилися: якщо єдиноріжка стояла в прорізі, вона відступає назад
        const v = 19 + p.id;
        for (let ty = Math.floor(P.y / T); ty <= Math.floor((P.y + P.h - 0.01) / T); ty++) for (let tx = Math.floor(P.x / T); tx <= Math.floor((P.x + P.w - 0.01) / T); tx++) if (tileAt(tx, ty) === v) { P.x = tx * T - P.w - 0.5; P.vx = 0; }
        if (!G.plateHint2) { G.plateHint2 = true; say('Двері тримаються, поки на кнопці щось стоїть. Підсунь туди кубик!', 2.6); }
      }
      if (on && !G.plateHint) { G.plateHint = true; say(stone ? 'Кубик натиснув кнопку — двері відчинилися!' : 'Кнопка тримає двері, поки на ній щось стоїть. Постав на неї кубик!', 2.6); }
    }
  }
  // стрілки-прискорювачі
  for (const b of G.boosts) {
    if (b.glow > 0) b.glow -= dt;
    if (P.onGround && Math.abs(pcx - b.x) < 22 && Math.abs(P.y + P.h - b.gy) < 3 && (P.boostT <= 0.9 || P.boostDir !== b.dir)) {
      P.boostT = 1.3; P.boostDir = b.dir; P.dir = b.dir; b.glow = 0.4;
      Snd.seq([0, 4, 7, 12, 16], 523, 0.035, 'square', 0.05);
      if (!G.boostHint) { G.boostHint = true; say('Ж-ж-жух! Із розгону стрибай через широку яму', 2.2); }
    }
  }
  if (P.boostT > 0 && P.prevOG && !P.onGround && P.vy >= 0 && !P.onMover) { P.vy = -520; P.cut = true; }
  if (P.boostT > 0) { P.boostT -= dt; G.parts.push({ k: 'wind', x: P.x + P.w / 2 - P.boostDir * 16, y: P.y + 8 + Math.random() * 18, vx: -P.boostDir * 120, vy: 0, t: 0, life: 0.25, dir: P.boostDir }); }
  P.prevOG = P.onGround;
  if (G.stoneHome.length || G.stoneOff.size) updateStones(dt);
  for (const b of G.bolts) if (b.kind === 'paintball' && !b.col) b.col = PAINTS[Math.floor(Math.random() * 3)];
  update8(dt);
}
/* Прискорювач тримає швидкість і на землі, і в повітрі (виклик із updatePlayer) */
function boostStep(P, dt) {
  if (!(P.boostT > 0)) return;
  if (P.sideHit) { P.boostT = 0; return; }
  P.vx = P.boostDir * 330;
}

/* ===== Дельфін і кит ===== */
function updateDolphin(m, dt) {
  const x0 = m.x, y0 = m.y; m.st += dt;
  m.x += m.dir * m.speed * dt;
  if (m.x + m.w >= m.maxX) { m.x = m.maxX - m.w; m.dir = -1; } else if (m.x <= m.minX) { m.x = m.minX; m.dir = 1; }
  if (m.air) {
    m.vy += 1000 * dt; m.y += m.vy * dt;
    if (m.vy > 0 && m.y >= m.by) { m.y = m.by; m.air = false; m.jumpT = 2.4 + Math.random() * 1.2; if (Math.abs(m.x - G.P.x) < 400) Snd.splash(); }
  } else {
    m.y = m.by + Math.sin(m.st * 3) * 2; m.jumpT -= dt;
    if (m.jumpT <= 0) { m.air = true; m.vy = -430; if (Math.abs(m.x - G.P.x) < 400) Snd.tone(700, 0.15, 'sine', 0.06, 1200); }
  }
  m.dx = m.x - x0; m.dy = m.y - y0;
}
function updateWhale(m, dt) {
  const y0 = m.y; m.st += dt; m.y = m.by + Math.sin(m.st * 1.6) * 1.5; m.dx = 0; m.dy = m.y - y0;
}

/* ===== Хамелеон Барвик: ховається, стріляє язиком, а коли язик прилипне — у нього можна влучити ===== */
Object.assign(BOSS2, {
  chameleon: L => ({ kind: 'chameleon', name: 'Хамелеон Барвик', acc: 'Хамелеона Барвика', win: ' Тепер він розфарбовує світ у веселі кольори.', x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 22, hw: 30, hh: 20, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, tongue: 0, tmax: 0, tx: 0, cycle: 0, aimHint: false, stuckHint: false }),
});
function updateChameleonBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  B.y = B.gy - 22;
  if (B.dead) { B.deadT += dt; B.alpha = Math.min(1, B.alpha + dt * 2); B.tongue = Math.max(0, B.tongue - 400 * dt); return; }
  if (!G.bossActive) {
    B.alpha = 0.25 + 0.15 * Math.sin(B.t * 2);
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'walk'; B.st = 0; B.alpha = 1; Music.start('boss'); say('Хамелеон Барвик: «Хі-хі! Спробуй мене знайти!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 50, right = A.x1 - 50;
  if (B.state === 'walk') {
    B.alpha = Math.min(1, B.alpha + dt * 3); B.dir = pcx < B.x ? -1 : 1;
    if (Math.abs(pcx - B.x) > 90) B.x += B.dir * 45 * dt;
    if (B.st > 1.2) { B.state = 'hide'; B.st = 0; B.tx = clamp(pcx + (Math.random() < 0.5 ? -1 : 1) * (130 + Math.random() * 70), left, right); Snd.tone(600, 0.4, 'sine', 0.05, 200); }
  } else if (B.state === 'hide') {
    B.alpha = Math.max(0.1, B.alpha - dt * 2.2);
    const d = B.tx - B.x; B.dir = d >= 0 ? 1 : -1;
    if (Math.abs(d) > 3) B.x += Math.sign(d) * Math.min(Math.abs(d), 110 * dt);
    if (B.st > (angry ? 1.6 : 2.2)) { B.state = 'aim'; B.st = 0; B.dir = pcx < B.x ? -1 : 1; Snd.tone(300, 0.3, 'triangle', 0.06, 700); }
  } else if (B.state === 'aim') {
    B.alpha = Math.min(1, B.alpha + dt * 4); B.dir = pcx < B.x ? -1 : 1;
    if (!B.aimHint) { B.aimHint = true; say('Хамелеон надув щоки — зараз вистрілить язиком! Перестрибни його', 2.6); }
    if (B.st > (angry ? 0.55 : 0.75)) { B.state = 'tongue'; B.st = 0; B.tongue = 0; B.tmax = clamp(Math.abs(pcx - B.x) + 40, 120, 230); Snd.tone(900, 0.2, 'square', 0.04, 300); }
  } else if (B.state === 'tongue') {
    B.tongue = Math.min(B.tmax, B.tongue + 750 * dt);
    if (B.tongue >= B.tmax) { B.state = 'stuck'; B.st = 0; Snd.tone(200, 0.3, 'sawtooth', 0.05, 120); if (!B.stuckHint) { B.stuckHint = true; say('Язик прилип! Стріляй у Хамелеона, поки він не відклеївся', 2.4); } }
  } else if (B.state === 'stuck') {
    if (B.st > (angry ? 2.0 : 2.5)) { B.state = 'retract'; B.st = 0; }
  } else if (B.state === 'retract') {
    B.tongue = Math.max(0, B.tongue - 600 * dt);
    if (B.tongue <= 0) {
      B.cycle++; B.st = 0;
      if (B.cycle % 2 === 0 || angry) {
        B.state = 'spit'; B.dir = pcx < B.x ? -1 : 1;
        for (const k of angry ? [0.6, 0.85, 1.1] : [0.7, 1.0]) G.bolts.push({ kind: 'paintball', r: 6, x: B.x + B.dir * 26, y: B.y - 10, vx: clamp((pcx - B.x) / k, -260, 260), vy: -360, g: 700, t: 0 });
        Snd.tone(500, 0.15, 'triangle', 0.06, 900);
      } else B.state = 'walk';
    }
  } else if (B.state === 'spit') { if (B.st > 0.7) { B.state = 'walk'; B.st = 0; } }
  B.x = clamp(B.x, left, right);
  // язик
  if (B.state === 'tongue' && B.tongue > 10) {
    const tx0 = B.dir > 0 ? B.x + 22 : B.x - 22 - B.tongue;
    if (overlap(P, { x: tx0, y: B.gy - 16, w: B.tongue, h: 10 })) hurtPlayer(false);
  }
  const busy = B.state === 'stuck';
  const box = { x: B.x - 26, y: B.y - 18, w: 52, h: 40 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (busy) { if (stomp) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else if (B.state === 'hide') { B.state = 'aim'; B.st = 0; B.alpha = 1; }
    else if (stomp) { P.vy = -430; P.cut = true; Snd.tink(); }
    else hurtPlayer(false);
  }
}
