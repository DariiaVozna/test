'use strict';
/* ===== Частина 18: повітряна куля, сніжка, що росте, зірочки-втікачки, санчата, Пінгвін Ковзанчик ===== */
Object.assign(TUNES, {
  hotair: { base: 587.33, ms: 210, n: [0, null, 4, null, 7, null, 11, null, 12, null, 11, null, 7, null, null, null, 5, null, 9, null, 12, null, 14, null, 12, null, 9, null, 7, null, null, null], b: [0, -5, -3, -7] },
  snowvalley: { base: 659.25, ms: 190, n: [12, null, 7, 9, 7, null, 4, null, 5, null, 7, null, 4, null, null, null, 9, null, 7, 9, 12, null, 11, null, 9, null, 7, null, 4, null, null, null], b: [0, -3, -7, -5] },
  aurora: { base: 523.25, ms: 240, n: [0, null, null, 7, null, null, 12, null, 11, null, null, 7, null, null, 4, null, 5, null, null, 9, null, null, 12, null, 14, null, null, 12, null, null, 7, null], b: [0, -5, -3, -7] },
  sledtrack: { base: 587.33, ms: 150, n: [0, 4, 7, 12, 7, 4, 0, null, 2, 5, 9, 14, 9, 5, 2, null, 4, 7, 11, 16, 11, 7, 4, null, 5, 9, 12, 17, 12, 9, 5, null], b: [0, -5, -3, -7] },
  iceberg: { base: 493.88, ms: 190, n: [0, null, 3, null, 7, null, 12, null, 10, null, 7, null, 3, null, null, null, 5, null, 8, null, 12, null, 15, null, 14, null, 12, null, 7, null, null, null], b: [0, -4, -5, -7] },
});
Object.assign(WALKERS, { seal: 1 });
Object.assign(HOVER, { flake: 1 });
Object.assign(THORN_MSG, { sledtrack: 'Ой, крижані шипи! Перестрибуй їх на санчатах' });

function spawnEnemy14(e, b, hover, g) {
  switch (e.k) {
    case 'seal': return g(28, 18, { speed: 22 });
    case 'flake': return hover(20, 20, 2.5, 0.6, 8);
  }
  return spawnEnemy15(e, b, hover, g);
}
function updateEnemy14(e, dt) { return updateEnemy15(e, dt); }

/* ===== Підготовка рівня ===== */
function initLevel14(G, L) {
  const P = G.P; P.hotair = null; P.sled = null; P.sledStun = 0;
  G.runners = (L.runners || []).map(r => Object.assign({ state: 'idle', t: Math.random() * 3, freeze: 0, dir: 1, hop: 0 }, r, { hx: r.x }));
  G.sleds = (L.sleds || []).map(s => Object.assign({ state: 'idle', hx: s.x, hgy: s.gy }, s));
  for (const m of G.movers) if (m.snowball) { m.cx = m.hx; m.r = m.r0; m.vy = 0; m.fall = false; snowGeom(m); m.dx = m.dy = 0; m.pdx = m.pdy = 0; }
  initLevel15(G, L);
}

/* ===== Повітряна куля: тримай «Стрибок» — пальник гріє, куля піднімається ===== */
const HOT_ENV = 30, HOT_GAP = 16, HOT_BASKET = 18;
function hotairBox(m) {
  // конверт кулі (коло) і кошик — точки, якими перевіряємо зіткнення з плитками
  const cx = m.x + m.w / 2, ecy = m.y - HOT_GAP - HOT_ENV;
  return { cx, ecy, top: ecy - HOT_ENV, bot: m.y + HOT_BASKET, left: cx - HOT_ENV, right: cx + HOT_ENV };
}
function hotairHits(m, x, y) {
  const ox = m.x, oy = m.y; m.x = x; m.y = y; const b = hotairBox(m); m.x = ox; m.y = oy;
  const pts = [[b.cx, b.top + 2], [b.left + 6, b.ecy - 18], [b.right - 6, b.ecy - 18], [b.left + 1, b.ecy], [b.right - 1, b.ecy], [b.left + 6, b.ecy + 18], [b.right - 6, b.ecy + 18], [x + 2, y + 2], [x + m.w - 2, y + 2], [x + 2, b.bot], [x + m.w - 2, b.bot], [b.cx, b.bot]];
  for (const [px, py] of pts) if (py >= 0 && solid(tileAt(Math.floor(px / T), Math.floor(py / T)))) return true;
  return false;
}
function hotairStep(P, dt) {
  const m = P.hotair;
  if (m.state === 'fly') {
    const want = In.jump ? -78 : 46;
    m.vy += clamp(want - m.vy, -150 * dt, 150 * dt);
    m.burn = In.jump ? Math.min(1, (m.burn || 0) + dt * 6) : Math.max(0, (m.burn || 0) - dt * 4);
    if (In.jump && G.t % 0.25 < dt) Snd.tone(110 + Math.random() * 30, 0.2, 'sawtooth', 0.025, 70);
    let nx = m.x, ny = m.y + m.vy * dt;
    const b = hotairBox(m);
    if (ny - HOT_GAP - HOT_ENV * 2 < 8 && m.vy < 0) { ny = 8 + HOT_GAP + HOT_ENV * 2; m.vy = 0; }
    if (ny + HOT_BASKET > VIEW_H - 6) { ny = VIEW_H - 6 - HOT_BASKET; m.vy = 0; }
    if (hotairHits(m, nx, ny)) { ny = m.y; if (Math.abs(m.vy) > 30) Snd.bump(); m.vy = 0; }
    m.ground = hotairHits(m, nx, ny + 2) && m.vy >= 0;
    // вітер несе праворуч, якщо куля не сидить на землі й попереду не хмара
    if (!m.ground) { const tx = nx + 62 * dt; if (!hotairHits(m, tx, ny)) nx = tx; else if (!m.bumpT || m.bumpT <= 0) { m.bumpT = 0.6; Snd.bump(); } }
    if (m.bumpT > 0) m.bumpT -= dt;
    m.dx = nx - m.x; m.dy = ny - m.y; m.x = nx; m.y = ny;
    if (m.x + m.w >= m.x1) { m.state = 'land'; say('Приземляємося!', 1.6); }
    if (!G.hotHint) { G.hotHint = true; say('Тримай «Стрибок» — куля полетить угору, відпусти — опуститься', 3); }
  } else if (m.state === 'land') {
    let ny = m.y + 60 * dt; m.vy = 60;
    if (hotairHits(m, m.x, ny)) { ny = m.y; m.state = 'done'; m.vy = 0; Snd.seq([0, 4, 7, 12], 523, 0.08, 'triangle', 0.08); }
    if (ny + HOT_BASKET > VIEW_H - 6) ny = VIEW_H - 6 - HOT_BASKET;
    m.dx = 0; m.dy = ny - m.y; m.y = ny;
  }
  P.x = m.x + m.w / 2 - P.w / 2; P.y = m.y - P.h + 6; P.vx = 0; P.vy = 0; P.onGround = true; P.onMover = null; P.coyote = 0; P.jumpBuf = 0;
  if (m.state === 'done') { P.hotair = null; P.y = m.y - P.h; P.onMover = m; }
  P.t += dt * 0.3;
  if (P.inv > 0) P.inv -= dt;
  P.shootCd -= dt;
  if (In.shootP) { P.charging = true; P.charge = 0; } if (In.shootR && P.charging) { fire(false); P.charging = false; }
}
function updateHotairIdle(m, dt) {
  m.dx = 0; m.dy = 0;
  if (m.state === 'idle' && G.P.onMover === m && !G.P.hotair) { G.P.hotair = m; m.state = 'fly'; m.vy = 0; Snd.seq([0, 7, 12], 392, 0.08, 'triangle', 0.08); }
}

/* ===== Сніжка: штовхай — котиться й росте ===== */
function snowGeom(m) { m.w = m.r * 1.2; m.x = m.cx - m.w / 2; m.y = m.gy - 2 * m.r; }
function groundUnder(x, fromY) { for (let ty = Math.max(0, Math.floor(fromY / T)); ty < ROWS; ty++) { const v = tileAt(Math.floor(x / T), ty); if (solid(v)) return ty * T; } return null; }
function snowBlocked(m, cx, r) {
  // чи впирається сніжка в стіну, якщо поставити її центр у cx
  const gy = m.gy;
  for (const yy of [gy - 4, gy - r, gy - 2 * r + 4]) for (const xx of [cx - r + 2, cx + r - 2]) if (solid(tileAt(Math.floor(xx / T), Math.floor(yy / T)))) return true;
  return false;
}
function moveSnowball(m, want) {
  // котимо крок за кроком, щоб не проскочити крізь стіну
  let moved = 0; const s = Math.sign(want);
  for (let left = Math.abs(want); left > 0.01;) {
    const step = Math.min(2, left), nx = m.cx + s * step;
    if (snowBlocked(m, nx, m.r)) break;
    m.cx = nx; moved += step; left -= step;
    if (m.r < m.rMax) m.r = Math.min(m.rMax, m.r + step * 0.06);
  }
  return moved * s;
}
function updateSnowballs(P, dt) {
  for (const m of G.movers) {
    if (!m.snowball) continue;
    const x0 = m.x, y0 = m.y;
    if (m.fall) {
      m.vy += 1500 * dt; m.gy += m.vy * dt;
      if (m.gy > VIEW_H + 80) { m.cx = m.hx; m.r = m.r0; m.fall = false; m.vy = 0; m.gy = groundUnder(m.cx, 0) || 10 * T; burst(m.cx, m.gy - 20, 12, ['#ffffff', '#d6ecff'], 100); }
    } else {
      // єдиноріжка збоку штовхає сніжку
      const onTop = P.onMover === m;
      if (!onTop && !P.hotair && P.y + P.h > m.y + 8 && P.y < m.gy - 2) {
        const pl = P.x, pr = P.x + P.w, bl = m.cx - m.r, br = m.cx + m.r;
        if (pr > bl && pl < br) {
          if (P.x + P.w / 2 < m.cx) { const got = moveSnowball(m, pr - bl); if (got < pr - bl - 0.01) { P.x = m.cx - m.r - P.w; if (P.vx > 0) P.vx = 0; } }
          else { const got = moveSnowball(m, -(br - pl)); if (-got < br - pl - 0.01) { P.x = m.cx + m.r; if (P.vx < 0) P.vx = 0; } }
          if (!G.snowHint) { G.snowHint = true; say('Штовхай сніжку — котячись по снігу, вона росте! Велика сніжка — це сходинка', 3); }
          if (G.t % 0.2 < dt) Snd.tone(200 + Math.random() * 40, 0.06, 'triangle', 0.025);
        }
      }
      const g = groundUnder(m.cx, m.gy - 4);
      if (g == null || g > m.gy + 6) { m.fall = true; m.vy = 0; }
      else m.gy = g;
      // сніжка, що котиться, збиває ворогів
      if (Math.abs(m.x - x0) > 0.2) for (const e of G.enemies) if (!e.dead && !FLYERS[e.k] && !HOVER[e.k] && Math.abs(e.x + e.w / 2 - m.cx) < m.r + e.w / 2 && e.y + e.h > m.gy - 2 * m.r) defeat(e);
    }
    snowGeom(m);
    m.pdx += m.x - x0; m.pdy += m.y - y0;
  }
}

/* ===== Зірочки-втікачки: тікають від єдиноріжки, але далеко не втечуть ===== */
function updateRunners(P, dt) {
  const pcx = P.x + P.w / 2, pcy = P.y + P.h / 2;
  for (const r of G.runners) {
    if (r.state === 'caught') continue;
    r.t += dt; if (r.freeze > 0) r.freeze -= dt;
    for (const s of G.shots) if (s.life > 0 && Math.abs(s.x - r.x) < 14 + s.r && Math.abs(s.y - (r.gy - 12)) < 16 + s.r) { s.life = 0; r.freeze = 2.2; burst(r.x, r.gy - 12, 8, ['#ffffff', '#bfefff'], 80); Snd.tone(1400, 0.15, 'sine', 0.05, 900); if (!G.runFreezeHint) { G.runFreezeHint = true; say('Зірочка застигла! Хапай її, поки не втекла', 2.4); } }
    const close = Math.abs(pcx - r.x) < 110 && Math.abs(pcy - (r.gy - 12)) < 70;
    if (close && r.freeze <= 0) {
      r.dir = r.x >= pcx ? 1 : -1;
      const nx = clamp(r.x + r.dir * 125 * dt, r.x0 + 10, r.x1 - 10);
      r.cornered = Math.abs(nx - r.x) < 0.5; r.x = nx; r.hop += dt * 9;
      if (r.state !== 'run') { r.state = 'run'; Snd.tone(900, 0.1, 'triangle', 0.05, 1300); if (!G.runHint) { G.runHint = true; say('Зірочка-втікачка! Заганяй її в куток або постріль — вона застигне', 3); } }
    } else { r.state = 'idle'; r.cornered = false; r.hop += dt * 2; }
    if (Math.abs(pcx - r.x) < 18 && P.y + P.h > r.gy - 30 && P.y < r.gy) {
      r.state = 'caught'; Snd.rainbow(); burst(r.x, r.gy - 14, 20, RAINBOW, 150);
      for (let i = 0; i < 3; i++) G.drops.push({ x: r.x - 10 + i * 10, y: r.gy - 30, vx: (i - 1) * 50, vy: -240, t: 0, got: false });
      floatText(r.x, r.gy - 40, 'Спіймала!', '#ff4fa3');
    }
  }
}

/* ===== Санчата: їдуть самі, а ти перестрибуєш перешкоди ===== */
function updateSleds(P, dt) {
  const pcx = P.x + P.w / 2;
  if (P.sledStun > 0) P.sledStun -= dt;
  for (const s of G.sleds) {
    if (s.state === 'idle' && !P.sled && !P.hotair && P.onGround && Math.abs(pcx - s.x) < 14 && Math.abs(P.y + P.h - s.gy) < 6) {
      P.sled = s; s.state = 'ride'; Snd.seq([0, 4, 7, 12], 523, 0.06, 'square', 0.05);
      if (!G.sledHint) { G.sledHint = true; say('Санчата їдуть самі! Тисни «Стрибок» перед камінцями, ямами й шипами', 3); }
    }
  }
  const s = P.sled; if (!s) return;
  s.x = pcx; s.gy = P.y + P.h;
  if (P.sideHit && P.sledStun <= 0) {
    // врізалися в перешкоду — відкидає назад, але санчата лишаються
    P.sledStun = 0.6; P.x -= 4; P.vx = -170; P.vy = -260; P.onGround = false; P.launchT = 0.35; P.cut = true;
    Snd.tone(160, 0.25, 'square', 0.06, 80); burst(P.x + P.w, P.y + P.h - 6, 10, ['#ffffff', '#d6ecff'], 110); floatText(pcx, P.y - 6, 'Бух!', '#4cb6ff');
    if (!G.crashHint) { G.crashHint = true; say('Бух! Перед перешкодою тисни «Стрибок»', 2.4); }
  }
  if (P.onGround && G.t % 0.12 < dt) G.parts.push({ k: 'spark', x: P.x + 2, y: P.y + P.h, vx: -60 - Math.random() * 40, vy: -30 - Math.random() * 30, t: 0, life: 0.4, col: '#ffffff', r: 2 });
  if (pcx >= s.x1) { P.sled = null; s.state = 'parked'; s.x = s.x1; Snd.seq([0, 4, 7, 12, 16], 523, 0.07, 'triangle', 0.08); say('Приїхали! Далі пішки', 2); }
}

// після «ще раз» від прапорця: санчата й куля повертаються на свої місця
function respawn14(P) {
  if (P.sled) { P.sled.state = 'idle'; P.sled.x = P.sled.hx; P.sled.gy = P.sled.hgy; P.sled = null; }
  if (P.hotair) { const m = P.hotair; m.state = 'idle'; m.x = m.bx; m.y = m.by; m.vy = 0; P.hotair = null; }
  if (typeof respawn15 === 'function') respawn15(P);
}
function update14(dt) {
  const P = G.P;
  updateSnowballs(P, dt);
  updateRunners(P, dt);
  updateSleds(P, dt);
  update15(dt);
}
function updatePlatform14(m, dt) {
  if (m.hotair) { if (G.P.hotair !== m) updateHotairIdle(m, dt); return; }
  if (m.snowball) { m.dx = m.pdx || 0; m.dy = m.pdy || 0; m.pdx = m.pdy = 0; return; }
  return updatePlatform15(m, dt);
}

/* ===== Пінгвін Ковзанчик: кидає сніжки, а тоді мчить на животику ===== */
Object.assign(BOSS2, {
  penguin: L => ({ kind: 'penguin', name: 'Пінгвін Ковзанчик', acc: 'Пінгвіна Ковзанчика', win: ' Тепер він катає малечу на животику по льоду.', x: L.arena.x0 + 30 * T, gy: 10 * T, fy: 10 * T, y: 10 * T - 22, hw: 18, hh: 22, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, throws: 0, vy: 0, spin: 0 }),
});
function updatePenguinBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.fy = B.gy; B.y = B.fy - 22; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'throw'; B.st = 0; Music.start('boss'); say('Пінгвін Ковзанчик: «Зірочки — мої сніжинки, які не тануть! Не віддам!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 30, right = A.x1 - 30;
  if (B.state === 'throw') {
    B.dir = pcx < B.x ? -1 : 1; B.fy = B.gy;
    if (B.st > 0.8) {
      B.st = 0; B.throws++;
      const tf = 0.8, vx = clamp((pcx - B.x) / tf, -320, 320), vy = (-(B.gy - 36) + (P.y + P.h - 10) - 0.5 * 900 * tf * tf) / tf;
      G.bolts.push({ kind: 'snowball', r: 5, x: B.x + B.dir * 10, y: B.gy - 36, vx, vy, g: 900, t: 0 });
      Snd.tone(600, 0.1, 'triangle', 0.05, 900);
      if (B.throws >= (angry ? 4 : 3)) { B.state = 'prep'; B.st = 0; B.throws = 0; }
    }
  } else if (B.state === 'prep') {
    // присідає перед розгоном — час підготуватися
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > 0.7) { B.state = 'slide'; B.st = 0; Snd.tone(300, 0.4, 'sawtooth', 0.04, 600); if (!B.slideHint) { B.slideHint = true; say('Ковзанчик мчить на животику! Стрибни на нього згори', 2.6); } }
  } else if (B.state === 'slide') {
    B.x += B.dir * (angry ? 215 : 180) * dt;
    if (G.t % 0.08 < dt) G.parts.push({ k: 'spark', x: B.x - B.dir * 16, y: B.gy - 2, vx: -B.dir * 50, vy: -30, t: 0, life: 0.4, col: '#ffffff', r: 2 });
    if (B.x < left || B.x > right) { B.x = clamp(B.x, left, right); B.state = 'getup'; B.st = 0; Snd.bump(); B.dir *= -1; }
  } else if (B.state === 'spin') {
    B.spin += dt * 18; B.x += B.dir * 90 * dt * Math.max(0, 1 - B.st);
    if (B.st > 0.8) { B.state = 'dizzy'; B.st = 0; if (!B.dizzyHint) { B.dizzyHint = true; say('Ковзанчик закрутився й бачить зірочки! Стріляй у нього', 2.4); } }
  } else if (B.state === 'dizzy') {
    if (B.st > (angry ? 2.2 : 2.8)) { B.state = 'getup'; B.st = 0; }
  } else if (B.state === 'getup') {
    if (B.st > 0.6) { B.state = 'throw'; B.st = 0; }
  }
  B.x = clamp(B.x, left, right);
  B.y = B.fy - (B.state === 'slide' || B.state === 'spin' ? 10 : 22);
  const low = B.state === 'slide' || B.state === 'spin' || B.state === 'dizzy';
  const box = low ? { x: B.x - 20, y: B.gy - 20, w: 40, h: 20 } : { x: B.x - 14, y: B.gy - 44, w: 28, h: 44 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 18;
    if (stomp && B.state === 'slide') { B.state = 'spin'; B.st = 0; B.spin = 0; P.vy = -480; P.cut = true; Snd.boing(); burst(B.x, B.gy - 20, 12, ['#ffffff', '#bfefff'], 120); }
    else if (stomp && B.state === 'dizzy') { hitBoss(2); P.vy = -480; P.cut = true; }
    else if (stomp) { P.vy = -420; P.cut = true; }
    else if (B.state === 'slide') hurtPlayer(false);
    else if (B.state !== 'dizzy' && B.state !== 'spin' && B.state !== 'getup') hurtPlayer(false);
  }
}
function armored14(s, B) {
  if (B.kind === 'penguin' && B.state !== 'dizzy') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Ковзанчик ховає дзьоб у крила! Спершу стрибни на нього, коли він ковзає', 2.6); }
    return true;
  }
  return armored15(s, B);
}
function resetBoss14(B) {
  if (B.kind === 'penguin') { B.state = 'throw'; B.st = 0; B.throws = 0; B.fy = B.gy; }
  resetBoss15(B);
}
