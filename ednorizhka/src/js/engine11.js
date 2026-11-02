'use strict';
/* ===== Частина 15: мильні бульбашки, колесо білочки з містками, гармати-гойдалки, поручні, Лис Хитрик ===== */
Object.assign(TUNES, {
  soaplake: { base: 587.33, ms: 190, n: [0, null, 4, 7, 12, null, 7, 4, 5, null, 9, 12, 14, null, 12, 9, 7, null, 4, 7, 11, null, 7, 4, 2, null, 4, null, 0, null, null, null], b: [0, -5, -3, -7] },
  nutgrove: { base: 523.25, ms: 200, n: [0, 4, 7, null, 4, null, 0, null, 2, 5, 9, null, 5, null, 2, null, 4, 7, 11, null, 7, null, 4, null, 5, 4, 2, null, 0, null, null, null], b: [0, -7, -5, -3] },
  seafort: { base: 493.88, ms: 185, n: [0, null, 0, 4, 7, null, 7, null, 5, null, 5, 9, 12, null, 12, null, 11, null, 9, 7, 5, null, 4, null, 2, null, 4, 2, 0, null, null, null], b: [0, -5, -7, -5] },
  ropepark: { base: 659.25, ms: 175, n: [0, 2, 4, null, 7, null, 9, 7, 4, null, 2, null, 0, null, null, null, 5, 7, 9, null, 12, null, 9, 7, 5, null, 4, null, 2, null, null, null], b: [0, -5, -3, -7] },
  foxden: { base: 440, ms: 210, n: [0, null, 3, null, 7, null, 10, null, 8, null, 7, null, 3, null, null, null, 5, null, 8, null, 12, null, 10, null, 8, null, 7, null, 5, null, null, null], b: [0, -4, -5, -7] },
});
Object.assign(ENEMY2, { moth: 1 });
Object.assign(FLYERS, { moth: 1 });
Object.assign(WALKERS, { crayfish: 1 });
// що казати, коли єдиноріжка стала на колючки
const THORN_MSG = { soaplake: 'Ой, колючки! Облітай їх у бульбашці', nutgrove: 'Ой, колючки! Чекай, поки висунеться місток', ropepark: 'Ой, колючки! Над ними тримайся за поручні', seafort: 'Ой, колючки! Перелітай їх із гармати', foxden: 'Ой, колючки! Обходь їх стороною' };

/* Плитки: 31 — місток із колеса (висунутий), 32 — місток (схований), 33 — ворота-решітка (зачинені), 34 — ворота (відчинені), 35 — поручні */
const SOAP_LIFE = 9, SOAP_BACK = 1.8, WHEEL_FILL = 1.6, WHEEL_HOLD = 6, WHEEL_BACK = 4, CANNON_V = 720;

function spawnEnemy11(e, b, hover, g) {
  switch (e.k) {
    case 'moth': return Object.assign(hover(20, 16, 1, 1, 4), { mx: e.tx * T + 12, my: e.ty * T + 12 });
    case 'crayfish': return g(24, 14, { speed: 30 });
  }
  return spawnEnemy12(e, b, hover, g);
}
function updateEnemy11(e, dt) {
  if (e.k === 'moth') {
    // нічний метелик повільно летить до єдиноріжки, але далеко від дому не відлітає
    const P = G.P, pcx = P.x + P.w / 2, pcy = P.y + P.h / 2;
    let tx = e.hx, ty = e.hy;
    if (Math.hypot(pcx - e.mx, pcy - e.my) < 170 && Math.hypot(pcx - e.hx, pcy - e.hy) < 240) { tx = pcx; ty = pcy - 8; }
    const dx = tx - e.mx, dy = ty - e.my, d = Math.hypot(dx, dy) || 1;
    e.mx += dx / d * Math.min(d, 36 * dt); e.my += dy / d * Math.min(d, 36 * dt);
    e.x = e.mx + Math.sin(e.t * 3) * 8 - e.w / 2; e.y = e.my + Math.sin(e.t * 5) * 5 - e.h / 2;
    if (Math.abs(dx) > 2) e.dir = dx > 0 ? 1 : -1;
    return true;
  }
  return updateEnemy12(e, dt);
}

/* ===== Підготовка рівня ===== */
function initLevel11(G, L) {
  const P = G.P; P.bub = null; P.hang = null; P.hangCd = 0;
  G.soaps = (L.soaps || []).map(s => Object.assign({ x: s.hx, y: s.hy, state: 'idle', t: 0, life: 0 }, s));
  G.nutWheels = (L.nutWheels || []).map(w => Object.assign({ p: 0, hold: 0, ang: 0, idle: 0, run: false, full: false }, w, { tiles: w.tiles.map(q => q.slice()) }));
  G.wheelOf = new Map(); for (const w of G.nutWheels) for (const [tx, ty] of w.tiles) G.wheelOf.set(ty * G.Wt + tx, w);
  G.swc = (L.swCannons || []).map(c => Object.assign({ swc: true, state: 'idle', st: 0, ang: (c.a0 + c.a1) / 2 }, c));
}

/* ===== Мильні бульбашки: усередині пливеш угору, «Стрибок» лопає ===== */
function soapTouchesThorn(P) {
  const cx = P.x + P.w / 2, cy = P.y + P.h / 2 - 2, r = 19;
  for (let tx = Math.floor((cx - r) / T); tx <= Math.floor((cx + r) / T); tx++) for (let ty = Math.floor((cy - r) / T); ty <= Math.floor((cy + r) / T); ty++) {
    if (tileAt(tx, ty) !== 22) continue;
    const nx = clamp(cx, tx * T, tx * T + T), ny = clamp(cy, ty * T, ty * T + T);
    if ((cx - nx) ** 2 + (cy - ny) ** 2 < r * r) return true;
  }
  return false;
}
function popSoap(s, vy) {
  const P = G.P;
  s.state = 'gone'; s.t = 0; P.bub = null; P.vy = vy; P.cut = true; P.jumpBuf = 0;
  Snd.pop(); burst(s.x, s.y, 12, ['#ffffff', '#c9f0ff', '#ffd6f0'], 120); bubbles(s.x, s.y + 6, 6);
}
function soapStep(P, dt) {
  const s = P.bub, ax = (In.right ? 1 : 0) - (In.left ? 1 : 0);
  if (P.hurtT > 0) { popSoap(s, P.vy); return; }
  if (In.jumpP) { popSoap(s, -330); Snd.jump(); return; }
  if (ax) P.dir = ax;
  P.vx += (ax * 100 - P.vx) * Math.min(1, dt * 4);
  const tvy = P.y < 34 ? 0 : -62;
  P.vy += (tvy - P.vy) * Math.min(1, dt * 3);
  moveBody(P, dt);
  P.onGround = false; P.onMover = null;
  s.x = P.x + P.w / 2; s.y = P.y + P.h / 2 - 2; s.life += dt;
  if (In.shootP) { P.charging = true; P.charge = 0; P.chargeSnd = false; }
  if (P.charging) { P.charge += dt; if (P.charge >= 0.55 && !P.chargeSnd) { P.chargeSnd = true; Snd.charged(); } }
  if (In.shootR && P.charging) { fire(P.charge >= 0.55); P.charging = false; P.charge = 0; }
  P.shootCd -= dt; if (P.inv > 0) P.inv -= dt; P.t += dt * 0.4;
  if (P.headHit || soapTouchesThorn(P) || s.life > SOAP_LIFE) popSoap(s, 0);
}
function updateSoaps(dt) {
  const P = G.P, pcx = P.x + P.w / 2, pcy = P.y + P.h / 2;
  for (const s of G.soaps) {
    s.t += dt;
    if (s.state === 'gone') { if (s.t > SOAP_BACK) { s.state = 'idle'; s.t = 0; s.x = s.hx; s.y = s.hy; } continue; }
    if (s.state !== 'idle') continue;
    s.x = s.hx; s.y = s.hy + Math.sin(G.t * 2 + s.hx * 0.03) * 3;
    if (!P.bub && !P.hang && !P.swing && !P.inCannon && !P.kite && !P.zip && P.hurtT <= 0 && Math.hypot(pcx - s.x, pcy - s.y) < 22) {
      s.state = 'ride'; s.life = 0; P.bub = s; P.vx *= 0.4; P.vy = Math.min(P.vy, 0) * 0.3; P.onGround = false; P.onMover = null; P.launchT = 0;
      Snd.tone(700, 0.15, 'sine', 0.05, 1000);
      if (!G.soapHint) { G.soapHint = true; say('Ти в бульбашці! Вона пливе вгору, кнопками керуй, а «Стрибок» її лопне', 3); }
    }
  }
}

/* ===== Колесо білочки: біжиш у ньому — висувається місток або піднімаються ворота ===== */
function applyWheel(w) {
  const P = G.P, n = w.tiles.length, k = Math.min(n, Math.floor(w.p * n + 1e-6));
  const box = { x: P.x + 1, y: P.y + 1, w: P.w - 2, h: P.h - 2 };
  for (let i = 0; i < n; i++) {
    const [tx, ty, kd] = w.tiles[i], idx = ty * G.Wt + tx, open = i < k;
    const want = kd === 'b' ? (open ? 31 : 32) : (open ? 34 : 33);
    if (G.map[idx] === want) continue;
    // ворота не зачиняються просто на єдиноріжці
    if (want === 33 && overlap(box, { x: tx * T, y: ty * T, w: T, h: T })) continue;
    G.map[idx] = want;
  }
}
function onWheelBridge(w) {
  const P = G.P; if (!P.onGround) return false;
  const ty = Math.floor((P.y + P.h + 2) / T);
  for (const x of [P.x + 2, P.x + P.w - 2]) { const tx = Math.floor(x / T); if (w.tiles.some(q => q[0] === tx && q[1] === ty && q[2] === 'b')) return true; }
  return false;
}
function inWheel(w) { const P = G.P; return P.onGround && !P.mini && Math.abs(P.x + P.w / 2 - w.x) < 16 && Math.abs(P.y + P.h - w.gy) < 4; }
function updateNutWheels(dt) {
  const P = G.P, ax = (In.right ? 1 : 0) - (In.left ? 1 : 0);
  for (const w of G.nutWheels) {
    const inW = inWheel(w);
    w.run = inW && ax !== 0 && !w.full;
    if (w.run) {
      // колесо крутиться, а єдиноріжка біжить на місці
      P.x = clamp(P.x, w.x - P.w / 2 - 6, w.x - P.w / 2 + 6);
      w.p = Math.min(1, w.p + dt / WHEEL_FILL); w.ang += ax * dt * 7; w.idle = 0;
      if (G.t % 0.18 < dt) Snd.tone(420 + w.p * 520, 0.04, 'triangle', 0.03);
      if (!G.wheelHint) { G.wheelHint = true; say('Біжи в колесі, і місток висувається! Коли він готовий, біжи по ньому', 2.8); }
      if (w.p >= 1) {
        w.p = 1; w.full = true; w.hold = WHEEL_HOLD;
        Snd.seq([0, 4, 7, 12], 659, 0.06, 'triangle', 0.07); burst(w.x, w.gy - 40, 14, ['#ffd23f', '#ffffff', '#c98d55'], 120);
      }
    } else if (w.full) {
      w.ang += dt * 1.5;
      // поки єдиноріжка на містку, він не зникає
      if (!(inW || onWheelBridge(w))) w.hold -= dt;
      if (w.hold <= 0) { w.full = false; w.idle = 9; Snd.tone(420, 0.3, 'sine', 0.05, 220); }
    } else if (w.p > 0) {
      w.idle += dt;
      if (w.idle > 0.8) w.p = Math.max(0, w.p - dt / WHEEL_BACK);
    }
    w.warn = (w.full && w.hold < 1.5) || (!w.full && !w.run && w.p > 0 && w.idle > 0.8);
    applyWheel(w);
  }
}

/* ===== Гармата-гойдалка: пунктир показує, куди полетиш ===== */
function cannonMuzzle(cn, ang) { return { x: cn.x + Math.cos(ang) * 22 * (cn.dir || 1), y: cn.gy - 14 - Math.sin(ang) * 22 }; }
function cannonPath(cn, ang, pts) {
  const P = G.P, m = cannonMuzzle(cn, ang), d = cn.dir || 1;
  let x = m.x - P.w / 2, y = m.y - P.h / 2, vx = CANNON_V * Math.cos(ang) * d, vy = -CANNON_V * Math.sin(ang);
  for (let i = 0; i < 240; i++) {
    vy = Math.min(vy + GRAV * G.grav * STEP, 620);
    x += vx * STEP; y += vy * STEP;
    if (pts && i % 3 === 0) pts.push(x + P.w / 2, y + P.h / 2);
    const wy = Math.floor((y + P.h / 2) / T);
    if (solid(tileAt(Math.floor((d > 0 ? x + P.w : x) / T), wy))) return { x: x + P.w / 2, y: y + P.h, ok: false, wall: true };
    if (y < -60) continue;
    if (vy > 0) {
      const fy = Math.floor((y + P.h) / T);
      for (const xx of [x + 3, x + P.w - 3]) { const v = tileAt(Math.floor(xx / T), fy); if (solid(v) || (v === 3 && y + P.h - fy * T < 12)) return { x: x + P.w / 2, y: fy * T, ok: true }; }
    }
    if (y > VIEW_H + 20) return { x: x + P.w / 2, y, ok: false };
  }
  return null;
}
function fireSwCannon(cn) {
  const P = G.P, m = cannonMuzzle(cn, cn.ang), d = cn.dir || 1;
  P.inCannon = null; cn.state = 'cool'; cn.st = 0;
  P.x = m.x - P.w / 2; P.y = m.y - P.h / 2;
  P.vx = CANNON_V * Math.cos(cn.ang) * d; P.vy = -CANNON_V * Math.sin(cn.ang);
  P.launchT = 3; P.cut = true; P.onGround = false; P.onMover = null; P.dir = d; P.jumpBuf = 0;
  Snd.big(); G.flash = 0.1; burst(m.x, m.y, 16, RAINBOW, 160);
  G.parts.push({ k: 'puff', x: m.x, y: m.y, vx: 0, vy: 0, t: 0, life: 0.5, r: 9 });
}
function updateSwCannons(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const cn of G.swc) {
    cn.st += dt;
    const mid = (cn.a0 + cn.a1) / 2, amp = (cn.a1 - cn.a0) / 2;
    cn.ang = mid + amp * Math.sin(G.mt * TAU / cn.period + (cn.ph || 0));
    if (cn.state === 'idle') {
      if (!P.inCannon && !P.bub && !P.hang && P.vy >= 0 && Math.abs(pcx - cn.x) < 14 && P.y + P.h > cn.gy - 36 && P.y + P.h <= cn.gy + 2) {
        cn.state = 'load'; cn.st = 0; P.inCannon = cn; P.vine = null; P.vx = 0;
        Snd.tone(300, 0.3, 'triangle', 0.08, 600);
        if (!G.swcHint) { G.swcHint = true; say('Гармата гойдається! Коли пунктир покаже туди, куди треба, тисни «Стрибок»', 3.2); }
      }
    } else if (cn.state === 'load') {
      if (P.inCannon !== cn) { cn.state = 'cool'; cn.st = 0; }
      else if (In.jumpP && cn.st > 0.2) fireSwCannon(cn);
    } else if (cn.st > 0.9) cn.state = 'idle';
  }
}

/* ===== Поручні: підстрибни — вхопишся, перебирай уперед, «Стрибок» — відпустити ===== */
function barRowAt(P) {
  const cx = Math.floor((P.x + P.w / 2) / T);
  for (let r = Math.floor((P.y - 12) / T); r <= Math.floor((P.y + 12) / T); r++) if (tileAt(cx, r) === 35 && Math.abs(P.y - (r * T + 8)) < 12) return r;
  return -1;
}
function hangStep(P, dt) {
  const ax = (In.right ? 1 : 0) - (In.left ? 1 : 0), r = P.hang.row;
  if (In.jumpP || P.hurtT > 0) {
    P.hang = null; P.hangCd = 0.35; P.cut = true; P.jumpBuf = 0;
    if (P.hurtT <= 0) { P.vy = -300; P.vx = ax * SPEED; Snd.jump(); }
    return;
  }
  if (ax) P.dir = ax;
  P.vx += clamp(ax * 110 - P.vx, -900 * dt, 900 * dt);
  P.vy = 0; P.y = r * T + 8;
  const nx = P.x + P.vx * dt, edge = P.vx > 0 ? nx + P.w : nx;
  if (tileAt(Math.floor((nx + P.w / 2) / T), r) === 35 && !solid(tileAt(Math.floor(edge / T), Math.floor((P.y + P.h / 2) / T)))) P.x = nx; else P.vx = 0;
  P.onGround = false; P.onMover = null;
  if (In.shootP) { P.charging = true; P.charge = 0; P.chargeSnd = false; }
  if (P.charging) { P.charge += dt; if (P.charge >= 0.55 && !P.chargeSnd) { P.chargeSnd = true; Snd.charged(); } }
  if (In.shootR && P.charging) { fire(P.charge >= 0.55); P.charging = false; P.charge = 0; }
  P.shootCd -= dt; if (P.inv > 0) P.inv -= dt;
  P.t += dt * (Math.abs(P.vx) > 10 ? 1.2 : 0.2);
}
function grabBars(P, dt) {
  if (P.hangCd > 0) P.hangCd -= dt;
  if (P.hang || P.onGround || P.bub || P.swing || P.inCannon || P.kite || P.zip || P.flip || P.mount || P.hangCd > 0 || P.hurtT > 0) return;
  const r = barRowAt(P);
  if (r < 0) return;
  P.hang = { row: r }; P.vy = 0; P.y = r * T + 8; P.vx *= 0.5; P.launchT = 0; P.cling = 0;
  Snd.tone(520, 0.08, 'triangle', 0.05, 700);
  if (!G.barHint) { G.barHint = true; say('Тримаєшся! Перебирай уперед, а «Стрибок» — щоб відпустити', 2.8); }
}

function update11(dt) {
  const P = G.P;
  updateSoaps(dt);
  updateNutWheels(dt);
  updateSwCannons(dt);
  grabBars(P, dt);
  update12(dt);
}

/* ===== Лис Хитрик: стріляє шишками з гармати, розганяється вздовж підлоги, а потім захекується ===== */
Object.assign(BOSS2, {
  fox: L => ({ kind: 'fox', name: 'Лис Хитрик', acc: 'Лиса Хитрика', win: ' Тепер він показує друзям фокуси й ділиться зірочками.', x: L.arena.x0 + 32 * T, gy: 10 * T, fy: 10 * T, y: 10 * T - 20, hw: 26, hh: 22, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, ang: 0.8, shots: 0, aimX: null, aim: null, path: [], dashes: 0 }),
});
function foxBallPath(B, out) {
  // шишка летить по дузі й падає туди, де була єдиноріжка, коли лис прицілився
  const d = B.dir, mx = B.x + d * 30, my = B.fy - 30, tf = 1.05, g = 700;
  const vx = (B.aimX - mx) / tf, vy = ((B.gy - 9) - my - 0.5 * g * tf * tf) / tf;
  if (out) for (let t = 0.08; t < tf; t += 0.08) out.push(mx + vx * t, my + vy * t + 0.5 * g * t * t);
  return { mx, my, vx, vy, g };
}
function updateFoxBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; B.fy = B.gy; B.y = B.gy - 20; B.aimX = null; B.path = []; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'aim'; B.st = 0; Music.start('boss'); say('Лис Хитрик: «Хі-хі! Зірочки тепер мої, спробуй забрати!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt; if (B.wake > 0) B.wake -= dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 40, right = A.x1 - 40;
  if (B.state === 'aim') {
    B.dir = pcx < B.x ? -1 : 1;
    B.ang = 0.75 + Math.sin(B.t * 3) * 0.25;
    if (B.st > 0.35 && !B.locked) { B.locked = true; B.aimX = clamp(pcx, A.x0 + 24, A.x1 - 24); B.path = []; foxBallPath(B, B.path); }
    if (B.st > (angry ? 0.95 : 1.3)) {
      const q = foxBallPath(B);
      G.bolts.push({ kind: 'cone', r: 9, x: q.mx, y: q.my, vx: q.vx, vy: q.vy, g: q.g, t: 0 });
      Snd.tone(220, 0.2, 'sawtooth', 0.06, 110); G.parts.push({ k: 'puff', x: q.mx, y: q.my, vx: 0, vy: 0, t: 0, life: 0.4, r: 7 });
      B.shots++; B.st = 0; B.path = []; B.locked = false;
      if (!B.coneHint) { B.coneHint = true; say('Пунктир показує, куди впаде шишка. Відбіжи!', 2.4); }
      if (B.shots >= (angry ? 3 : 2)) { B.state = 'crouch'; B.st = 0; B.shots = 0; }
    }
  } else if (B.state === 'crouch') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > 0.75) {
      B.state = 'dash'; B.st = 0; B.dashes = 0; Snd.tone(300, 0.3, 'sawtooth', 0.05, 700);
      if (!B.dashHint) { B.dashHint = true; say('Лис мчить по підлозі! Застрибни на хмарку або вхопися за поручні', 2.8); }
    }
  } else if (B.state === 'dash') {
    B.x += B.dir * (angry ? 380 : 320) * dt;
    if (G.t % 0.06 < dt) G.parts.push({ k: 'puff', x: B.x - B.dir * 26, y: B.gy - 4, vx: 0, vy: 0, t: 0, life: 0.35, r: 4 });
    if ((B.dir < 0 && B.x <= left) || (B.dir > 0 && B.x >= right)) {
      B.x = clamp(B.x, left, right); B.dashes++;
      if (angry && B.dashes < 2) { B.dir *= -1; Snd.tone(300, 0.2, 'sawtooth', 0.05, 700); }
      else { B.state = 'tired'; B.st = 0; Snd.seq([7, 4, 0], 392, 0.1, 'sine', 0.05); if (!B.tiredHint) { B.tiredHint = true; say('Лис захекався й відпочиває! Стріляй у нього', 2.4); } }
    }
  } else if (B.state === 'tired') {
    if (B.st > (angry ? 2.4 : 3)) { B.state = 'aim'; B.st = 0; B.aimX = null; B.wake = 0.7; }
  }
  // шишка впала — місце падіння більше не потрібне
  if (!B.locked && !G.bolts.some(b => b.kind === 'cone')) B.aimX = null;
  B.x = clamp(B.x, left, right);
  B.fy = B.gy; B.y = B.gy - 20;
  const box = { x: B.x - 24, y: B.gy - (B.state === 'crouch' ? 24 : 32), w: 48, h: B.state === 'crouch' ? 24 : 32 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (B.state === 'tired') { if (stomp) { hitBoss(2); P.vy = -480; P.cut = true; } }
    // щойно прокинувся — ще не кусається, а тільки відштовхує
    else if (B.wake > 0) { P.vx = (pcx < B.x ? -1 : 1) * 200; P.launchT = 0.2; }
    else if (stomp && B.state !== 'dash') { P.vy = -430; P.cut = true; Snd.tink(); }
    else hurtPlayer(false);
  }
}
function armored11(s, B) {
  if (B.kind === 'fox' && B.state !== 'tired') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Лис Хитрик спритно ухиляється! Стріляй, коли він захекається', 2.6); }
    return true;
  }
  return false;
}
function resetBoss11(B) {
  if (B.kind === 'fox') { B.state = 'aim'; B.st = 0; B.shots = 0; B.aimX = null; B.locked = false; B.path = []; B.fy = B.gy; B.x = Math.max(B.x, G.arena.x0 + 14 * T); }
}
