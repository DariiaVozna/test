'use strict';
/* ===== Частина 22: скакалки, ракети-феєрверки, чарівні рукавички й Сова Ухнюшка ===== */
Object.assign(TUNES, {
  schoolyard: { base: 587.33, ms: 170, n: [0, 4, 7, 4, 0, 4, 7, 4, 2, 5, 9, 5, 2, 5, 9, 5, 4, 7, 11, 7, 4, 7, 12, null, 11, 9, 7, 5, 4, null, null, null], b: [0, -5, -3, -7] },
  fireworks: { base: 523.25, ms: 200, n: [0, null, 7, null, 12, null, 16, null, 14, 12, 11, null, 7, null, null, null, 5, null, 9, null, 12, null, 17, null, 16, 14, 12, null, 7, null, null, null], b: [0, -7, -5, -3] },
  climbwall: { base: 659.25, ms: 180, n: [0, 2, 4, 7, 9, 7, 4, 2, 0, 2, 4, 7, 12, null, null, null, 9, 7, 9, 12, 14, 12, 9, 7, 5, 4, 2, 0, null, null, null, null], b: [0, -5, -3, -7] },
  festsquare: { base: 698.46, ms: 160, n: [0, 4, 7, 12, 7, 4, 0, null, 2, 5, 9, 14, 9, 5, 2, null, 4, 7, 11, 16, 11, 7, 4, null, 12, 11, 9, 7, 5, 4, 2, null], b: [0, -5, -3, -7] },
  owlwood: { base: 440, ms: 230, n: [0, null, 3, null, 7, null, 3, null, 5, null, 8, null, 12, null, null, null, 10, null, 7, null, 3, null, 5, null, 7, null, 3, null, 0, null, null, null], b: [0, -4, -2, -5] },
});
const POW18 = { gloves: 1 };
const GLOVE_TIME = 25, ROPE_W = TAU / 1.6;

/* ===== Підготовка рівня ===== */
function initLevel18(G, L) {
  const P = G.P; P.gloveT = 0; P.climbing = false;
  G.ropes = (L.ropes || []).map(r => Object.assign({ combo: 0, prevTh: null }, r));
  G.rockets = (L.rockets || []).map(r => Object.assign({ state: 'idle', t: 0, ry: 0, by: 0 }, r));
  initLevel19(G, L);
}
function powerUp18(P, p) {
  if (p.k === 'gloves') { P.gloveT = GLOVE_TIME; say(G.gloveHint ? 'Знову чарівні рукавички!' : 'Чарівні рукавички! Стрибни до стіни й тримай «Стрибок» — полізеш угору, як павучок', 3.6); G.gloveHint = true; }
}

/* ===== Скакалка: 0 — внизу. Зачепила — відкидає назад; перестрибнула — зірочка ===== */
function ropePhase(r) { return ((G.t * ROPE_W + r.ph) % TAU + TAU) % TAU; }
function updateRopes(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const r of G.ropes) {
    const th = ropePhase(r), prev = r.prevTh == null ? th : r.prevTh; r.prevTh = th;
    const inZone = pcx > r.x0 + 4 && pcx < r.x1 - 4, low = Math.cos(th) > 0.9, onFloor = P.y + P.h > r.gy - 12;
    if (inZone && low && onFloor && !P.flip) {
      // зачепилася — відлітає туди, звідки прийшла, серце не забирається
      P.x = pcx < (r.x0 + r.x1) / 2 ? r.x0 - P.w - 6 : r.x1 + 6; P.vy = -230; P.onGround = false; P.onMover = null; P.cut = true;
      Snd.bump(); burst(pcx, r.gy - 6, 6, ['#ffffff', '#ff5c7a'], 80); r.combo = 0;
      if (!G.ropeHint) { G.ropeHint = true; say('Ой! Стрибай, коли скакалка внизу', 2.2); }
    }
    if (prev > th + 1 && inZone && !onFloor) {
      r.combo++; G.points++; Snd.star(r.combo); burst(pcx, r.gy - 6, 8, RAINBOW, 90);
      floatText(pcx, P.y - 8, '+1', '#ff4fa3');
      if (r.combo === 3) { G.points += 3; floatText(pcx, P.y - 26, 'Молодець! +3', '#ff4fa3'); Snd.seq([0, 4, 7, 12], 659, 0.06, 'triangle', 0.07); }
    }
  }
}

/* ===== Ракета: стань поруч і натисни «Ріг» — за пів секунди злетиш ===== */
function updateRockets(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const r of G.rockets) {
    r.t += dt;
    if (r.state === 'idle') {
      if (P.onGround && Math.abs(pcx - r.x) < 18 && Math.abs(P.y + P.h - r.gy) < 6 && In.shootP) {
        r.state = 'fuse'; r.t = 0; P.charging = false; Snd.tone(900, 0.45, 'sawtooth', 0.03, 1500);
        if (!G.rocketHint) { G.rocketHint = true; say('Ш-ш-ш… Зараз злетиш!', 1.6); }
      }
    } else if (r.state === 'fuse') {
      if (r.t > 0.5) {
        r.state = 'fly'; r.t = 0; r.ry = 0;
        if (Math.abs(pcx - r.x) < 26 && Math.abs(P.y + P.h - r.gy) < 10) {
          const h = Math.max(40, P.y + P.h - r.top + 12);
          P.vy = -Math.sqrt(2 * GRAV * h); P.cut = true; P.onGround = false; P.onMover = null; P.coyote = 0; P.jumpBuf = 0;
        }
        Snd.tone(220, 0.7, 'sawtooth', 0.06, 1600);
      }
    } else if (r.state === 'fly') {
      r.ry -= (520 + r.t * 500) * dt;
      if (r.gy + r.ry < r.top - 40) {
        r.state = 'gone'; r.t = 0; r.by = r.gy + r.ry;
        burst(r.x, r.by, 34, RAINBOW, 230); Snd.seq([0, 7, 12, 19], 784, 0.05, 'triangle', 0.07); G.flash = Math.max(G.flash, 0.08);
      }
    } else if (r.state === 'gone') {
      if (r.t > 3 && Math.abs(pcx - r.x) > 40) { r.state = 'idle'; r.t = 0; burst(r.x, r.gy - 14, 8, ['#ffffff', '#ffd23f'], 60); }
    }
  }
}

/* ===== Чарівні рукавички: біля стіни в стрибку тримаєш «Стрибок» — лізеш угору ===== */
function updateGloves(P, dt) {
  P.climbing = false;
  for (const p of G.powers) if (p.k === 'gloves' && p.got) { p.reT = (p.reT || 0) + dt; if (p.reT > 4 && Math.abs(P.x + P.w / 2 - p.x) > 60) { p.got = false; p.reT = 0; } }
  if (!(P.gloveT > 0)) return;
  P.gloveT -= dt;
  if (P.gloveT <= 0) { P.gloveT = 0; say('Рукавички зникли. Пошукай нові!', 2); return; }
  if (P.onGround || P.flip || P.hotair || P.plane || P.bub || P.hang || P.zip || P.kite || P.swing || P.mount) return;
  const d = In.right ? 1 : In.left ? -1 : 0; if (!d) return;
  const sx = Math.floor((d > 0 ? P.x + P.w + 1 : P.x - 1) / T);
  const wall = solid(tileAt(sx, Math.floor((P.y + P.h * 0.5) / T))) || solid(tileAt(sx, Math.floor((P.y + P.h - 2) / T)));
  if (!wall) return;
  P.climbing = true; P.dir = d;
  P.vy = In.jump ? -150 : 45;
  if (!G.climbHint) { G.climbHint = true; say('Тримай «Стрибок» — і лізь угору!', 2); }
}

function update18(dt) {
  updateRopes(dt);
  updateRockets(dt);
  updateGloves(G.P, dt);
  update19(dt);
}
function updatePlatform18(m, dt) { }
function respawn18(P) { P.climbing = false; respawn19(P); }

/* ===== Сова Ухнюшка: ухає звуковими хвилями, пікірує, а потім дрімає на пеньку — тоді в неї можна влучити ===== */
Object.assign(BOSS2, {
  owl: L => ({ kind: 'owl', name: 'Сова Ухнюшка', acc: 'Сову Ухнюшку', win: ' Тепер вона виспалась, а вночі світить зірочками святкове небо.', x: L.arena.x0 + 30 * T, gy: 10 * T, y: 3 * T, hw: 24, hh: 26, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, n: 0, tx: 0, ty: 0, stumpX: L.arena.x0 + 21 * T }),
});
function owlMove(B, x, y, sp, dt) {
  const dx = x - B.x, dy = y - B.y, d = Math.hypot(dx, dy);
  if (d < sp * dt || d < 1) { B.x = x; B.y = y; return true; }
  B.x += dx / d * sp * dt; B.y += dy / d * sp * dt; if (Math.abs(dx) > 2) B.dir = Math.sign(dx); return false;
}
function updateOwlBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 60, right = A.x1 - 60, perchY = 3 * T, sitY = B.gy - 10 - 28;
  if (B.dead) { B.deadT += dt; owlMove(B, B.x, perchY + Math.sin(B.t * 2) * 6, 80, dt); return; }
  if (!G.bossActive) {
    B.y = perchY + Math.sin(B.t * 1.5) * 2;
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'hoot'; B.st = 0; B.n = 0; Music.start('boss'); say('Сова Ухнюшка: «Ух-ух! Хто тут галасує? Я вдень сплю!»', 3); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  if (B.state === 'hoot') {
    // летить над єдиноріжкою й ухає хвилями
    owlMove(B, clamp(pcx + (B.x < pcx ? -90 : 90), left, right), perchY + Math.sin(B.t * 2.4) * 8, 120, dt);
    if (B.st > (angry ? 0.55 : 0.75)) {
      B.st = 0; B.n++;
      const dx = pcx - B.x, dy = (P.y + P.h / 2) - B.y, d = Math.hypot(dx, dy) || 1, sp = angry ? 190 : 160;
      G.bolts.push({ kind: 'hoot', x: B.x, y: B.y + 6, vx: dx / d * sp, vy: dy / d * sp, r: 9, t: 0 });
      Snd.tone(330, 0.18, 'sine', 0.06, 260); Snd.tone(300, 0.22, 'sine', 0.05, 240);
      if (!B.hootHint) { B.hootHint = true; say('Сова ухає звуковими хвилями! Відбігай або перестрибуй', 2.6); }
      if (B.n >= (angry ? 5 : 3)) { B.state = 'windup'; B.st = 0; B.n = 0; B.tx = clamp(pcx, left, right); }
    }
  } else if (B.state === 'windup') {
    // примірюється: на землі видно тінь, куди пікіруватиме
    B.y = perchY - Math.min(1, B.st * 2) * 14;
    if (B.st > 0.6) { B.state = 'dive'; B.st = 0; B.ty = B.gy - 26; Snd.tone(700, 0.3, 'sine', 0.05, 300); }
  } else if (B.state === 'dive') {
    if (owlMove(B, B.tx, B.ty, angry ? 420 : 340, dt)) { B.state = 'climb'; B.st = 0; B.n++; B.ex = clamp(B.x + (B.x < (left + right) / 2 ? 150 : -150), left, right); G.flash = Math.max(G.flash, 0.08); Snd.bump(); }
  } else if (B.state === 'climb') {
    if (owlMove(B, B.ex, perchY, 230, dt) || B.st > 3) {
      if (B.n >= (angry ? 3 : 2)) { B.state = 'nap'; B.st = 0; B.n = 0; }
      else { B.state = 'windup'; B.st = 0; B.tx = clamp(pcx, left, right); }
    }
  } else if (B.state === 'nap') {
    if (owlMove(B, B.stumpX, sitY, 200, dt)) { B.state = 'sleep'; B.st = 0; }
  } else if (B.state === 'sleep') {
    B.y = sitY + Math.sin(B.t * 3) * 1;
    if (!B.sleepHint && B.st > 0.3) { B.sleepHint = true; say('Сова задрімала на пеньку! Стріляй або стрибни на неї', 2.8); }
    if (B.st > (angry ? 2.3 : 2.9)) { B.state = 'hoot'; B.st = 0; B.n = 0; Snd.tone(500, 0.2, 'sine', 0.05, 700); }
  }
  const box = { x: B.x - 22, y: B.y - 26, w: 44, h: 54 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (stomp && B.state === 'sleep') { hitBoss(2); P.vy = -480; P.cut = true; }
    else if (stomp) { P.vy = -440; P.cut = true; Snd.boing(); }
    else if (B.state !== 'sleep') hurtPlayer(false);
  }
}
function armored18(s, B) {
  if (B.kind === 'owl' && B.state !== 'sleep') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Сова ухиляється! Стріляй, коли вона задрімає на пеньку', 2.6); }
    return true;
  }
  return armored19(s, B);
}
function resetBoss18(B) {
  if (B.kind === 'owl') { B.state = 'hoot'; B.st = 0; B.n = 0; B.y = 3 * T; }
  resetBoss19(B);
}
