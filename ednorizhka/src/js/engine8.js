'use strict';
/* ===== Частина 12: курчатка й курники, американські гірки й тир, гарбузи й колючки, гриб-велетень і кубики, Кіт Мурко ===== */
Object.assign(TUNES, {
  farm: { base: 523.25, ms: 200, n: [0, null, 0, 4, null, 7, null, 4, 5, null, 5, 9, null, 12, null, null, 7, null, 7, 11, null, 14, null, 11, 12, null, 7, null, 4, null, null, null], b: [0, -7, -5, -3] },
  fair: { base: 587.33, ms: 170, n: [0, 4, 7, null, 12, null, 7, 4, 5, 9, 12, null, 17, null, 12, 9, 7, 11, 14, null, 19, null, 14, 11, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
  pumpkin: { base: 440, ms: 230, n: [0, null, 3, null, 7, null, 6, null, 7, null, 10, null, 7, null, null, null, 5, null, 8, null, 12, null, 11, null, 7, null, 3, null, 2, null, null, null], b: [0, -4, -2, -5] },
  bricks: { base: 523.25, ms: 160, n: [0, null, 4, null, 7, null, 12, 12, null, 11, null, 7, null, 4, null, null, 5, null, 9, null, 12, null, 17, 17, null, 16, null, 12, null, 9, null, null], b: [0, -5, -7, -3] },
  attic: { base: 493.88, ms: 210, n: [0, null, 4, null, 7, 9, null, 7, null, 4, null, 2, 0, null, null, null, 0, null, 5, null, 9, 12, null, 9, null, 5, null, 4, 2, null, null, null], b: [0, -5, -3, -7] },
});
Object.assign(WALKERS, { top: 1 });
Object.assign(ENEMY2, { goose: 1, boo: 1 });
Object.assign(FLYERS, { boo: 1 });

/* Плитки: 22 — колючки (ранять, якщо торкнутися), 23 — кубики, які ламає тільки велика єдиноріжка */
const BIG_W = 34, BIG_H = 46, BIG_TIME = 12;

function spawnEnemy8(e, b, hover, g) {
  switch (e.k) {
    case 'goose': return g(26, 24, { speed: 26, state: 'walk', st: 0 });
    case 'top': return g(20, 20, { speed: 80, flipT: 1 + Math.random() * 1.5 });
    case 'boo': return Object.assign(b, { w: 24, h: 22, x: e.tx * T, y: e.ty * T, shy: true });
  }
  return spawnEnemy9(e, b, hover, g);
}
function updateEnemy8(e, dt) {
  const P = G.P, pcx = P.x + P.w / 2, pcy = P.y + P.h / 2, cx = e.x + e.w / 2, cy = e.y + e.h / 2;
  if (e.k === 'goose') {
    e.st += dt;
    const ahead = (pcx - cx) * e.dir, near = ahead > 0 && ahead < 150 && Math.abs(P.y + P.h - (e.y + e.h)) < 30;
    if (e.state === 'walk') { e.vx = e.dir * e.speed; if (near && e.st > 0.6) { e.state = 'honk'; e.st = 0; if (Math.abs(cx - pcx) < 400) Snd.tone(420, 0.2, 'square', 0.05, 300); } }
    else if (e.state === 'honk') { e.vx = 0; if (e.st > 0.45) { e.state = 'run'; e.st = 0; } }
    else if (e.state === 'run') { e.vx = e.dir * 150; if (e.st > 1.3) { e.state = 'rest'; e.st = 0; } }
    else { e.vx = 0; if (e.st > 1.1) { e.state = 'walk'; e.st = 0; } }
    e.vy = Math.min(e.vy + GRAV * dt, 600);
    const stop = () => { e.dir *= -1; if (e.state === 'run') { e.state = 'rest'; e.st = 0; } };
    if (moveBody(e, dt)) stop();
    else if (e.onGround && e.vx) { const ax = e.dir > 0 ? e.x + e.w + 2 : e.x - 2; const v = tileAt(Math.floor(ax / T), Math.floor((e.y + e.h + 4) / T)); if (!(solid(v) || v === 3) || v === 22) stop(); }
    if (e.y > VIEW_H + 40) e.dead = true;
    return true;
  }
  if (e.k === 'boo') {
    const d = Math.hypot(pcx - cx, pcy - cy) || 1;
    const looking = (pcx < cx) === (P.dir > 0);
    e.dir = pcx < cx ? -1 : 1;
    e.shy = looking || d > 300;
    if (!e.shy) {
      e.x += (pcx - cx) / d * 52 * dt; e.y += (pcy - cy) / d * 52 * dt;
      if (!G.booHint && d < 240) { G.booHint = true; say('Привид підкрадається, коли ти відвертаєшся! Обернись до нього — і він засоромиться', 3); }
    } else e.y += Math.sin(e.t * 2.2) * 8 * dt;
    e.y = clamp(e.y, -10, VIEW_H - 40);
    return true;
  }
  return updateEnemy9(e, dt);
}
/* Дотик до ворога без стрибка: велика єдиноріжка перемагає всіх, сором'язливий привид не ранить */
function touchHook8(e) {
  if (G.P.big) { defeat(e); Snd.bump(); return true; }
  if (e.k === 'boo' && e.shy) return true;
  return touchHook9(e);
}

/* ===== Підготовка рівня ===== */
function initLevel8(G, L) {
  G.chicks = (L.chicks || []).map((c, i) => ({ i, hx: c.x, hy: c.y, x: c.x, y: c.y, state: 'home', t: i * 0.7, dir: -1, air: false, delay: 0 }));
  G.coops = (L.coops || []).map(c => Object.assign({ pulse: 0 }, c));
  G.flock = []; G.trail = []; G.chicksIn = 0;
  G.duckSets = (L.duckSets || []).map(s => Object.assign({}, s, { ducks: s.ducks.map(d => Object.assign({}, d)), done: false }));
  G.P.big = false; G.P.bigT = 0; G.P.bigWait = 0;
}

/* ===== Гриб-велетень ===== */
function setBig(P, on, time) {
  if (on) {
    if (P.mini) setMini(P, false);
    if (P.mount) setMount(P, null);
    if (!P.big) {
      // росте вгору; біля стіни зсувається вбік, а якщо місця немає — чекає
      const ny = P.y - (BIG_H - P.h), nx = [P.x - (BIG_W - P.w) / 2, P.x - (BIG_W - P.w), P.x].find(x => !boxSolid(x, ny, BIG_W, BIG_H));
      if (nx == null) { P.bigWait = time || BIG_TIME; return false; }
      P.big = true; P.x = nx; P.y = ny; P.w = BIG_W; P.h = BIG_H;
      burst(P.x + P.w / 2, P.y + P.h / 2, 20, ['#ff9a3d', '#ffe14d', '#ffffff'], 160); Snd.seq([0, 4, 7, 12, 16, 19], 262, 0.06, 'square', 0.06); G.flash = Math.max(G.flash, 0.15);
    }
    P.bigT = time || BIG_TIME; P.bigWait = 0;
  } else if (P.big) {
    P.big = false; P.x += (BIG_W - 22) / 2; P.y += BIG_H - 30; P.w = 22; P.h = 30; P.bigT = 0;
    burst(P.x + 11, P.y + 15, 12, ['#ff9a3d', '#ffffff'], 110); Snd.tone(500, 0.3, 'triangle', 0.06, 200);
  }
  return true;
}
function breakBrick(tx, ty) {
  const i = ty * G.Wt + tx; if (G.map[i] !== 23) return;
  G.map[i] = 0;
  const cols = G.theme === 'attic' ? ['#d9a86a', '#b8864a', '#fff3d6'] : [BRICK_COLS[(tx + ty) % 4][0], '#ffffff', '#ffe14d'];
  burst(tx * T + 12, ty * T + 12, 10, cols, 150);
  G.parts.push({ k: 'puff', x: tx * T + 12, y: ty * T + 14, vx: (Math.random() - 0.5) * 30, vy: -10, t: 0, life: 0.45, r: 7 });
  Snd.tone(180 + (ty % 3) * 40, 0.12, 'square', 0.05, 90);
  if ((tx * 7 + ty * 3) % 4 === 0) G.drops.push({ x: tx * T + 12, y: ty * T + 6, vx: (Math.random() - 0.5) * 80, vy: -240, t: 0, got: false });
}

/* ===== Американські гірки: вагончик їде по рейках вгору й униз ===== */
function railY(pts, x) {
  if (x <= pts[0].x) return pts[0].y;
  for (let i = 1; i < pts.length; i++) if (x <= pts[i].x) { const a = pts[i - 1], b = pts[i], k = (x - a.x) / (b.x - a.x); return a.y + (b.y - a.y) * (1 - Math.cos(k * Math.PI)) / 2; }
  return pts[pts.length - 1].y;
}
function railSlope(pts, x) {
  for (let i = 1; i < pts.length; i++) if (x <= pts[i].x) { const a = pts[i - 1], b = pts[i], k = (x - a.x) / (b.x - a.x); return (b.y - a.y) * Math.PI / 2 * Math.sin(k * Math.PI) / (b.x - a.x); }
  return 0;
}
function updateCoaster(m, dt) {
  const P = G.P, x0 = m.x, y0 = m.y; m.st += dt;
  if (m.state === 'idle') {
    m.cx = m.c0;
    if (P.onMover === m) {
      m.state = 'go'; m.st = 0; m.v = 90; P.ride = m; Snd.seq([0, 4, 7], 392, 0.08, 'square', 0.05);
      if (!G.coasterHint) { G.coasterHint = true; say('Поїхали-и-и! На гірці можна підстрибувати', 2.4); }
    }
  } else if (m.state === 'go') {
    m.v = clamp(m.v + railSlope(m.pts, m.cx) * 700 * dt - 25 * dt, 90, 320);
    m.cx += m.v * dt;
    if (m.st % 0.25 < dt) Snd.tone(200 + m.v, 0.04, 'square', 0.012);
    if (m.cx >= m.c1) { m.cx = m.c1; m.state = 'end'; m.st = 0; m.v = 0; Snd.bump(); burst(m.cx + 24, m.y, 10, ['#ffffff', '#ff7ab8', '#ffe14d'], 100); }
  } else if (m.state === 'end') {
    if (P.onMover !== m && Math.abs(P.x + P.w / 2 - m.cx) > 130) { m.state = 'back'; m.st = 0; }
  } else {
    m.cx = Math.max(m.c0, m.cx - 240 * dt);
    if (m.cx <= m.c0) { m.state = 'idle'; m.st = 0; }
  }
  m.x = m.cx - m.w / 2; m.y = railY(m.pts, m.cx) - 18;
  m.dx = m.x - x0; m.dy = m.y - y0;
}

/* ===== Гарбуз (на горищі — клубок): на ньому котишся через колючки ===== */
function updateBall(m, dt) {
  const P = G.P, x0 = m.x, y0 = m.y, on = P.onMover === m;
  if (on) {
    const ax = (In.right ? 1 : 0) - (In.left ? 1 : 0);
    m.vx += clamp(ax * 125 - m.vx, -300 * dt, 300 * dt);
    if (!G.ballHint) { G.ballHint = true; say(G.theme === 'attic' ? 'Котися на клубку! Іди вперед — і він покотиться' : 'Котися на гарбузі! Іди вперед — і він покотиться', 2.4); }
  } else m.vx += clamp(-m.vx, -260 * dt, 260 * dt);
  m.vy = Math.min(m.vy + GRAV * dt, 600);
  const b = { x: m.x + 3, y: m.y, w: m.w - 6, h: m.h, vx: m.vx, vy: m.vy };
  moveBody(b, dt);
  m.x = b.x - 3; m.y = b.y; m.vx = b.vx; m.vy = b.vy;
  m.rot += (m.x - x0) / (m.h / 2);
  if (Math.abs(m.vx) > 30) for (const e of G.enemies) if (!e.dead && !e.ghost && overlap(e, { x: m.x + 2, y: m.y + 4, w: m.w - 4, h: m.h - 4 })) defeat(e);
  if (m.y > VIEW_H + 40) { m.x = m.bx; m.y = m.by; m.vx = m.vy = 0; burst(m.x + m.w / 2, m.y + m.h / 2, 14, ['#ffffff', '#ffb347'], 120); }
  m.dx = m.x - x0; m.dy = m.y - y0;
}
/* Гарбуз можна підштовхнути, якщо йти в нього збоку */
function pushBalls(P) {
  const pcx = P.x + P.w / 2;
  for (const m of G.movers) {
    if (!m.ball || P.onMover === m) continue;
    const box = { x: m.x + 3, y: m.y + 8, w: m.w - 6, h: m.h - 8 };
    if (!overlap(P, box) || P.y + P.h <= m.y + 8) continue;
    if (pcx < m.x + m.w / 2) { P.x = box.x - P.w; if (In.right) m.vx = Math.max(m.vx, 85); }
    else { P.x = box.x + box.w; if (In.left) m.vx = Math.min(m.vx, -85); }
    P.vx = 0;
  }
}
/* Поки єдиноріжка на гарбузі, вона не йде сама: її везе гарбуз (виклик із updatePlayer) */
function rideStep(P) {
  if (P.onMover && P.onMover.ball && P.onGround) P.vx = 0;
}

function update8(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  // гриб-велетень
  if (P.bigWait > 0 && !P.big) setBig(P, true, P.bigWait);
  if (P.big) {
    P.bigT -= dt; if (P.bigT <= 0) setBig(P, false);
    if (P.big) {
      if (P.sideHit && tileAt(P.sideHit.tx, P.sideHit.ty) === 23) { const tx = P.sideHit.tx; for (let ty = Math.floor(P.y / T); ty <= Math.floor((P.y + P.h - 0.01) / T); ty++) breakBrick(tx, ty); }
      if (P.headHit) for (let tx = Math.floor(P.x / T); tx <= Math.floor((P.x + P.w - 0.01) / T); tx++) breakBrick(tx, P.headHit.ty);
      if (P.onGround && P.wasAir8 && P.prevVy8 > 300) { G.flash = Math.max(G.flash, 0.05); Snd.bump(); for (const s of [-1, 1]) G.parts.push({ k: 'puff', x: pcx + s * 12, y: P.y + P.h - 2, vx: s * 60, vy: 0, t: 0, life: 0.4, r: 7 }); }
    }
  } else if (P.sideHit && tileAt(P.sideHit.tx, P.sideHit.ty) === 23 && (!G.brickHint || G.brickHint < G.t - 6)) {
    G.brickHint = G.t; say('Ці кубики ламає тільки велика єдиноріжка. Пошукай гриб-велетень!', 2.6);
  }
  P.wasAir8 = !P.onGround; P.prevVy8 = P.vy;
  // колючки — як яма: серце менше, повертаємося на край, а гарбуз котиться на своє місце
  if (!P.big && P.onGround && !P.onMover && P.groundTile === 22) {
    hurtPlayer(true); P.x = P.safe.x; P.y = P.safe.y - 2; P.vx = P.vy = 0; P.onGround = false;
    burst(P.x + P.w / 2, P.y + P.h / 2, 10, ['#fff', '#ffe14d'], 100);
    for (const m of G.movers) if (m.ball) { m.x = m.bx; m.y = m.by; m.vx = m.vy = 0; }
    say(G.theme === 'attic' ? 'Ой, голочки! Через них котися на клубку' : 'Ой, колючки! Через них котися на гарбузі', 2.4);
  }
  pushBalls(P);
  // дзиги крутяться й часом розвертаються
  for (const e of G.enemies) if (e.k === 'top' && !e.dead) { e.flipT -= dt; if (e.flipT <= 0) { e.dir *= -1; e.flipT = 1 + Math.random() * 1.6; } }
  // клубки Кота Мурка відскакують від стіни арени один раз
  if (G.arena) for (const b of G.bolts) if (b.kind === 'yarn' && !b.bounced && ((b.vx < 0 && b.x < G.arena.x0 + 14) || (b.vx > 0 && b.x > G.arena.x1 - 14))) { b.vx = -b.vx; b.bounced = true; Snd.bump(); }
  updateChicks(P, dt);
  updateDucks(dt);
  update9(dt);
}

/* ===== Курчатка: ідуть за єдиноріжкою слідом, а в курнику дають зірочки ===== */
function updateChicks(P, dt) {
  if (!G.chicks.length) return;
  const pcx = P.x + P.w / 2, fx = pcx, fy = P.y + P.h, last = G.trail[G.trail.length - 1];
  if (!last || Math.hypot(fx - last.x, fy - last.y) > 4) {
    if (last && Math.hypot(fx - last.x, fy - last.y) > 80) { G.trail = []; for (const ch of G.flock) { ch.x = fx; ch.y = fy; } }
    G.trail.push({ x: fx, y: fy, g: P.onGround }); if (G.trail.length > 240) G.trail.shift();
  }
  for (const ch of G.chicks) {
    ch.t += dt;
    if (ch.state === 'home') {
      if (Math.abs(pcx - ch.x) < 20 && P.y + P.h > ch.y - 16 && P.y < ch.y) {
        ch.state = 'follow'; G.flock.push(ch); Snd.tone(1500, 0.07, 'sine', 0.06, 1900); Snd.tone(1700, 0.07, 'sine', 0.05, 2100, 0.09);
        burst(ch.x, ch.y - 8, 8, ['#ffe14d', '#ffffff'], 80);
        say(G.chickHint ? 'Пі-пі! Курчат за тобою: ' + G.flock.length : 'Пі-пі! Курчатко йде за тобою. Відведи його в курник!', 2.2); G.chickHint = true;
      }
    } else if (ch.state === 'follow') {
      const k = G.flock.indexOf(ch), tp = G.trail[Math.max(0, G.trail.length - 1 - (k + 1) * 6)];
      if (tp) { const ox = ch.x; ch.x += (tp.x - ch.x) * Math.min(1, dt * 12); ch.y += (tp.y - ch.y) * Math.min(1, dt * 12); if (Math.abs(ch.x - ox) > 0.2) ch.dir = ch.x > ox ? 1 : -1; ch.air = !tp.g; }
    } else if (ch.state === 'in') {
      if (ch.delay > 0) { ch.delay -= dt; continue; }
      const c = ch.coop, d = c.x - ch.x; ch.dir = d >= 0 ? 1 : -1; ch.air = false;
      ch.x += Math.sign(d) * Math.min(Math.abs(d), 140 * dt); ch.y += (c.gy - ch.y) * Math.min(1, dt * 10);
      if (Math.abs(d) < 2) {
        ch.state = 'done'; G.chicksIn++; G.points += 2; c.pulse = 0.5;
        floatText(c.x, c.gy - 50, '+2', '#ff8a3d'); Snd.star(G.chicksIn); burst(c.x, c.gy - 30, 10, ['#ffe14d', '#ffffff', '#ff9fd0'], 110);
        if (G.chicksIn === G.chicks.length) { G.points += 10; G.rainbows++; Snd.rainbow(); floatText(c.x, c.gy - 66, '+10', '#ff4fa3'); burst(c.x, c.gy - 40, 24, RAINBOW, 170); say('Усі курчатка вдома! Веселкова зірочка +10', 3); }
      }
    }
  }
  for (const c of G.coops) {
    if (c.pulse > 0) c.pulse -= dt;
    if (G.flock.length && Math.abs(pcx - c.x) < 42 && Math.abs(P.y + P.h - c.gy) < 40) {
      G.flock.forEach((ch, i) => { ch.state = 'in'; ch.coop = c; ch.delay = i * 0.25; });
      say(G.flock.length > 1 ? 'Курчатка біжать у курник!' : 'Курчатко біжить у курник!', 2); G.flock = [];
    }
  }
}

/* ===== Тир: качечки їздять туди-сюди, постріл — зірочка, усі — веселкова ===== */
function duckPos(s, d) { const span = s.x1 - s.x0; return s.x0 + ((d.off + G.t * s.speed) % span + span) % span; }
function updateDucks(dt) {
  for (const s of G.duckSets) {
    for (const d of s.ducks) {
      if (d.down) { d.fall = Math.min(1, d.fall + dt * 4); continue; }
      const x = duckPos(s, d);
      for (const sh of G.shots) {
        if (sh.life <= 0 || Math.abs(sh.x - x) > 10 + sh.r || Math.abs(sh.y - s.y) > 11 + sh.r) continue;
        d.down = true; d.fall = 0; d.x = x; if (!sh.big) sh.life = 0;
        giveStar(x, s.y - 14); Snd.pop(); burst(x, s.y, 8, ['#ffe14d', '#ffffff'], 90);
        if (!G.duckHint) { G.duckHint = true; say('Влучила! Збий усі качечки — і буде веселкова зірочка', 2.4); }
        break;
      }
    }
    if (!s.done && s.ducks.every(d => d.down)) {
      s.done = true; const cx = (s.x0 + s.x1) / 2;
      G.points += 10; G.rainbows++; Snd.rainbow(); floatText(cx, s.y - 40, '+10', '#ff4fa3'); burst(cx, s.y - 30, 24, RAINBOW, 170);
      say('Влучила в усі качечки! Веселкова зірочка +10', 2.6);
    }
  }
}

/* ===== Кіт Мурко: стрибає, кидає клубки, а коли вмивається — у нього можна влучити ===== */
Object.assign(BOSS2, {
  cat: L => ({ kind: 'cat', name: 'Кіт Мурко', acc: 'Кота Мурка', win: ' Тепер він муркоче зірочкам колискові.', x: L.arena.x0 + 30 * T, gy: 10 * T, fy: 10 * T, y: 10 * T - 22, hw: 30, hh: 22, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, vx: 0, vy: 0, acts: 0, pounces: 0, thrown: false, crouchHint: false, groomHint: false }),
});
function updateCatBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; B.fy = B.gy; B.y = B.gy - 22; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'walk'; B.st = 0; Music.start('boss'); say('Кіт Мурко: «Мур-р! Ці блискучі зірочки тепер мої!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 50, right = A.x1 - 50;
  if (B.state === 'walk') {
    B.dir = pcx < B.x ? -1 : 1;
    if (Math.abs(pcx - B.x) > 110) B.x += B.dir * (angry ? 70 : 55) * dt;
    if (B.st > (angry ? 0.8 : 1.1)) {
      B.st = 0;
      if (B.acts >= 3) {
        B.state = 'groom'; B.acts = 0; Snd.seq([7, 4, 0], 392, 0.14, 'sine', 0.06);
        if (!B.groomHint) { B.groomHint = true; say('Мурко вмивається й нічого не бачить! Стріляй у нього', 2.6); }
      } else {
        B.state = B.acts % 2 === 0 ? 'crouch' : 'swipe'; B.pounces = angry ? 2 : 1; B.thrown = false; B.acts++;
      }
    }
  } else if (B.state === 'crouch') {
    B.dir = pcx < B.x ? -1 : 1;
    if (!B.crouchHint) { B.crouchHint = true; say('Мурко присів — зараз стрибне! Відбіжи або вилізь на хмаринку', 2.6); }
    if (B.st > (angry ? 0.5 : 0.7)) { B.state = 'pounce'; B.st = 0; const tx = clamp(pcx, left, right); B.vy = -560; B.vx = (tx - B.x) / 0.75; Snd.tone(500, 0.2, 'triangle', 0.06, 1000); }
  } else if (B.state === 'pounce') {
    B.vy += 1500 * dt; B.x += B.vx * dt; B.fy += B.vy * dt;
    if (B.vy > 0 && B.fy >= B.gy) {
      B.fy = B.gy; B.state = 'land'; B.st = 0; Snd.bump(); G.flash = Math.max(G.flash, 0.06);
      for (const s of [-1, 1]) G.parts.push({ k: 'puff', x: B.x + s * 22, y: B.gy - 4, vx: s * 70, vy: 0, t: 0, life: 0.45, r: 8 });
    }
  } else if (B.state === 'land') {
    if (B.st > 0.35) { B.pounces--; if (B.pounces > 0) { B.state = 'crouch'; B.st = 0.25; } else { B.state = 'walk'; B.st = 0; } }
  } else if (B.state === 'swipe') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > 0.45 && !B.thrown) {
      B.thrown = true; Snd.tone(300, 0.15, 'triangle', 0.06, 600);
      for (const v of angry ? [200, 125] : [190]) G.bolts.push({ kind: 'yarn', r: 10, x: B.x + B.dir * 30, y: B.gy - 10, vx: B.dir * v, vy: 0, t: 0, col: ['#ff7ab8', '#4cb6ff', '#ffd23f', '#7fd46a'][Math.floor(Math.random() * 4)] });
    }
    if (B.st > 0.8) { B.state = 'walk'; B.st = 0; }
  } else if (B.state === 'groom') {
    if (B.st > (angry ? 2.1 : 2.7)) { B.state = 'walk'; B.st = 0; }
  }
  B.x = clamp(B.x, left, right);
  B.y = B.fy - 22;
  const box = { x: B.x - 28, y: B.fy - 40, w: 56, h: 40 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (B.state === 'groom') { if (stomp) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else if (stomp && B.state !== 'pounce') { P.vy = -430; P.cut = true; Snd.tink(); }
    else hurtPlayer(false);
  }
}
function armored8(s, B) {
  if (B.kind === 'cat' && B.state !== 'groom') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Мурко спритно відбиває лапкою! Стріляй, коли він умиватиметься', 2.6); }
    return true;
  }
  return false;
}
function resetBoss8(B) {
  if (B.kind === 'cat') { B.state = 'walk'; B.st = 0; B.fy = B.gy; B.vy = 0; B.x = Math.max(B.x, G.arena.x0 + 14 * T); }
}
