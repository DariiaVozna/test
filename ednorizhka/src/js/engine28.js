'use strict';
/* ===== Частина 33 «Таємниці й погоні»: день і ніч, таємні ходи, хвиля, що наздоганяє, і Панда Бамбуся ===== */
Object.assign(TUNES, {
  sunmoonvale: { base: 587.33, ms: 170, n: [0, 4, 7, 4, 9, 7, 4, null, 0, 4, 7, 12, 11, 7, 4, null, 5, 9, 12, 9, 7, 4, 2, null, 0, 2, 4, 7, 4, 2, 0, null], b: [0, -5, -3, -7] },
  secretwood: { base: 493.88, ms: 185, n: [0, null, 3, 5, 7, null, 5, 3, 0, null, 3, 5, 3, null, 0, null, 7, null, 8, 10, 12, null, 10, 8, 7, null, 5, 3, 0, null, null, null], b: [0, -4, -2, -5] },
  wavebeach: { base: 659.25, ms: 150, n: [0, 2, 4, 7, 9, 7, 4, 2, 0, 2, 4, 7, 12, 9, 7, null, 4, 5, 7, 9, 11, 9, 7, 5, 4, 7, 12, 14, 12, null, null, null], b: [0, -5, -3, -7] },
  nightfair: { base: 523.25, ms: 165, n: [0, 7, 4, 7, 0, 7, 4, 7, 2, 9, 5, 9, 2, 9, 5, 9, 4, 11, 7, 11, 4, 11, 7, 11, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
  bamboogrove: { base: 440, ms: 175, n: [0, 3, 5, 7, 10, 7, 5, 3, 0, null, 3, null, 5, null, 7, null, 12, 10, 7, 5, 3, 5, 7, null, 0, 3, 0, null, -2, null, 0, null], b: [0, -5, -2, -7] },
});

Object.assign(THORN_MSG, { secretwood: 'Ой, колючки! Пошукай таємну стежку знизу, у самому пагорбі', bamboogrove: 'Ой, колючки! Через перші перенесе лелека, а через другі — пого-стрибунець' });

/* ===== Підготовка рівня ===== */
function initLevel28(G, L) {
  G.dnBlocks = (L.dnBlocks || []).slice(); G.dnT = 0; G.dnNight = false; G.dnK = 0; G.dnLeft = DN_HALF; G.dnPending = []; G.dnHint = 0;
  if (G.dnBlocks.length) applyDn(true);
  G.secrets = (L.secrets || []).map(s => Object.assign({ a: 1, found: false }, s)); G.secretsFound = 0;
  G.chases = (L.chases || []).map(c => Object.assign({ state: 'wait', front: 0, st: 0, rumble: 0, a: 1 }, c));
  initLevel29(G, L);
}

/* ===== День і ніч: сонячні кубики тверді вдень, місячні — уночі ===== */
const DN_HALF = 4.5;
function dnSolidC(c) { return (c === 'moon') === !!G.dnNight; }
function applyDn(first) {
  const P = G.P; G.dnPending = [];
  for (const b of G.dnBlocks) {
    const i = b.y * G.Wt + b.x;
    if (!dnSolidC(b.c)) { G.map[i] = 0; continue; }
    if (!first && overlap(P, { x: b.x * T, y: b.y * T, w: T, h: T })) { G.dnPending.push(b); continue; }
    G.map[i] = 2;
  }
}
function updateDayNight(dt) {
  if (!G.dnBlocks.length) return;
  // пісочний годинник зупиняє і день, і ніч
  if (!(G.timeStop > 0)) G.dnT += dt;
  const p = G.dnT % (2 * DN_HALF), night = p >= DN_HALF;
  G.dnLeft = DN_HALF - (p % DN_HALF);
  if (night !== G.dnNight) {
    G.dnNight = night; applyDn(false);
    Snd.seq(night ? [12, 7, 4, 0] : [0, 4, 7, 12], night ? 392 : 523.25, 0.08, 'triangle', 0.05);
    if (G.dnHint < 2) { G.dnHint++; say(night ? 'Настала ніч! Сонячні кубики сховалися, а місячні з’явилися' : 'Знову день! Тепер тверді сонячні кубики', 2.6); }
  }
  G.dnK += ((night ? 1 : 0) - G.dnK) * Math.min(1, dt * 3);
  const P = G.P;
  G.dnPending = G.dnPending.filter(b => {
    if (!dnSolidC(b.c)) return false;
    if (overlap(P, { x: b.x * T, y: b.y * T, w: T, h: T })) return true;
    G.map[b.y * G.Wt + b.x] = 2; return false;
  });
}

/* ===== Таємні ходи: стіна намальована, але крізь неї можна пройти ===== */
function updateSecrets(dt) {
  const P = G.P;
  for (const s of G.secrets) {
    const inside = overlap(P, { x: s.x * T - 2, y: s.y * T, w: s.w * T + 4, h: s.h * T });
    if (inside && !s.found) {
      s.found = true; G.secretsFound++; G.points += 2;
      Snd.seq([0, 7, 12, 16, 19], 784, 0.06, 'triangle', 0.06); burst(P.x + P.w / 2, P.y + 10, 16, RAINBOW, 130);
      floatText(P.x + P.w / 2, P.y - 14, 'Таємний хід!', '#a05ad8');
      say(G.secretsFound === 1 ? 'Таємний хід! Ця стіна несправжня, а за нею сховані скарби' : 'Ще один таємний хід!', 2.6);
    }
    const want = inside ? 0.22 : s.found ? 0.62 : 1;
    s.a += (want - s.a) * Math.min(1, dt * 6);
  }
}

/* ===== Погоня: хвиля (або злива) котиться слідом, треба бігти вперед ===== */
function updateChases(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const ch of G.chases) {
    if (ch.state === 'wait') {
      if (pcx > ch.x0 && pcx < ch.x1) {
        ch.state = 'run'; ch.front = P.x - 6 * T; ch.st = 0; G.flash = 0.2;
        Snd.seq([12, 7, 3, 0], 330, 0.09, 'sawtooth', 0.05);
        say(ch.kind === 'storm' ? 'Ой! Злива наздоганяє! Біжи праворуч і не зупиняйся!' : 'Ой! Велика хвиля! Біжи праворуч і не зупиняйся!', 2.8);
      }
      continue;
    }
    if (ch.state === 'run') {
      ch.st += dt;
      // повернулася на прапорець перед погонею — погоня почнеться знову
      if (pcx < ch.x0 - 3 * T) { ch.state = 'wait'; continue; }
      if (!(G.timeStop > 0)) ch.front += ch.speed * dt;
      if (pcx > ch.x1) {
        ch.state = 'end'; ch.st = 0; G.points += 3; floatText(pcx, P.y - 16, '+3', '#ff8a3d');
        Snd.seq([0, 4, 7, 12], 659.25, 0.07, 'triangle', 0.06); burst(pcx, P.y, 16, ['#ffffff', '#9fe0ff', '#ffd23f'], 140);
        say(ch.kind === 'storm' ? 'Встигла! Злива вщухла, і визирнуло сонечко' : 'Встигла! Хвиля відкотилася назад у море', 2.6);
        continue;
      }
      if (ch.front > P.x + 6) {
        hurtPlayer(false); ch.front = P.x - 6 * T;
        burst(pcx, P.y + 10, 14, ch.kind === 'storm' ? ['#ffffff', '#9fb4e0'] : ['#ffffff', '#7fd0ff'], 150);
        if (!ch.caught) { ch.caught = true; say(ch.kind === 'storm' ? 'Злива намочила! Біжи швидше вперед' : 'Хвиля намочила! Біжи швидше вперед', 2.2); }
      }
      // чим ближче хвиля, тим гучніше шумить
      ch.rumble -= dt;
      const gapPx = P.x - ch.front;
      if (ch.rumble <= 0 && gapPx < 7 * T) { ch.rumble = 0.45; Snd.tone(70 + Math.random() * 30, 0.22, 'sawtooth', 0.03, 50); }
    } else if (ch.state === 'end') {
      ch.st += dt; ch.front -= 60 * dt; ch.a = Math.max(0, 1 - ch.st / 1.6);
    }
  }
}

function update28(dt) {
  // на арену з пого-стрибунцем не заходимо: битва з босом — на своїх ніжках
  if (G.arenaLock && G.P.pogoT > 0) G.P.pogoT = 0;
  updateDayNight(dt);
  updateSecrets(dt);
  updateChases(dt);
  update29(dt);
}

/* ===== Панда Бамбуся: подає м'ячик, а відбитий рогом м'ячик летить назад і приголомшує її ===== */
BOSS2.panda = L => ({ kind: 'panda', name: 'Панда Бамбуся', acc: 'Панду Бамбусю', win: ' Тепер вона грає з усіма в пінг-понг по-доброму й ділиться бамбуком.', x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 28, hw: 26, hh: 28, hp: 24, max: 24, t: 0, st: 0, state: 'sit', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, serves: 0, tx: 0, swing: 0, roll: 0, vx: 0, dz: 2, backs: [] });
function pandaSpot(B) {
  // стає на 7–10 клітинок від єдиноріжки, щоб її було видно на екрані, — там, де більше місця
  const A = G.arena, P = G.P, pcx = P.x + P.w / 2, left = A.x0 + 70, right = A.x1 - 70;
  const d = (7 + Math.random() * 3) * T, side = (right - pcx >= d) && (pcx - left < d || right - pcx > pcx - left || Math.random() < 0.5) ? 1 : -1;
  B.tx = Math.max(left, Math.min(right, pcx + side * d));
}
function pandaServe(B, angry) {
  const P = G.P, pcx = P.x + P.w / 2, A = G.arena;
  const toP = pcx < B.x ? -1 : 1, x0 = B.x + toP * 22, y0 = B.gy - 66;
  // м'ячик падає трохи перед єдиноріжкою, а сердита Бамбуся іноді цілить просто в неї
  const smash = angry && B.serves % 2 === 1;
  let tx = pcx - toP * (smash ? 0 : 54);
  tx = Math.max(A.x0 + 20, Math.min(A.x1 - 20, tx));
  const g = 560, tau = Math.max(0.85, Math.min(1.7, Math.abs(tx - x0) / 320)), yl = B.gy - 8;
  G.bolts.push({ kind: 'pingball', x: x0, y: y0, vx: (tx - x0) / tau, vy: (yl - y0 - 0.5 * g * tau * tau) / tau, g, r: 8, t: 0, land: tx });
  B.serves++; B.swing = 0.3; Snd.tone(620, 0.07, 'square', 0.05, 900);
}
function updatePandaBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt; if (B.swing > 0) B.swing -= dt;
  if (B.dead) { B.deadT += dt; B.backs = []; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'walk'; B.st = 0; pandaSpot(B); Music.start('boss'); say('Панда Бамбуся: «Пінь-понь! А хто відіб’є мій м’ячик?»', 2.8); G.flash = 0.3; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 40, right = A.x1 - 40;
  // відбиваємо м'ячики: пострілом рога або головою в стрибку
  let hitAny = false;
  for (const b of G.bolts) {
    if (b.kind !== 'pingball' || b.dead) continue;
    let hit = false;
    for (const s of G.shots) if (s.life > 0 && Math.abs(s.x - b.x) < 20 + s.r && Math.abs(s.y - b.y) < 22 + s.r) { hit = true; if (!s.big) s.life = 0; break; }
    if (!hit && P.vy < -40 && overlap(P, { x: b.x - 11, y: b.y - 11, w: 22, h: 22 })) hit = true;
    if (hit) {
      b.dead = true; hitAny = true; B.backs.push({ x: b.x, y: b.y, t: 0 });
      Snd.tone(880, 0.08, 'square', 0.06, 1320); burst(b.x, b.y, 10, ['#ffffff', '#ffb347'], 110); floatText(b.x, b.y - 14, 'Бам!', '#ff7a3d');
      if (!G.pingHint) { G.pingHint = true; say('Відбила! М’ячик полетів назад до Бамбусі', 2); }
    }
  }
  if (hitAny) G.bolts = G.bolts.filter(b => !b.dead);
  for (const k of B.backs) {
    k.t += dt;
    const dx = B.x - k.x, dy = (B.gy - 34) - k.y, d = Math.hypot(dx, dy) || 1, sp = 430;
    k.x += dx / d * sp * dt; k.y += dy / d * sp * dt;
    if (d < 26) {
      k.done = true; hitBoss(2);
      if (!B.dead) {
        B.state = 'dizzy'; B.st = 0; B.dz = 2.6; B.serves = 0; B.vx = 0;
        if (!B.dizzyHint) { B.dizzyHint = true; say('Бамбуся не встигла відбити й запаморочилась! Стріляй або стрибни на неї', 2.6); }
      }
    }
    if (k.t > 3) k.done = true;
  }
  B.backs = B.backs.filter(k => !k.done);
  if (B.dead) return;

  if (B.state === 'walk') {
    const d = B.tx - B.x;
    if (Math.abs(d) > 3) { B.x += Math.sign(d) * Math.min(Math.abs(d), (angry ? 140 : 110) * dt); }
    B.dir = pcx < B.x ? -1 : 1;
    if (Math.abs(d) <= 3 || B.st > 2.4) { B.state = 'toss'; B.st = 0; }
  } else if (B.state === 'toss') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > (angry ? 0.45 : 0.6)) { pandaServe(B, angry); B.state = 'watch'; B.st = 0; }
  } else if (B.state === 'watch') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > (angry ? 0.8 : 1.15)) {
      B.st = 0;
      if (B.serves >= (angry ? 3 : 2)) { B.state = 'curl'; Snd.seq([7, 4, 0], 330, 0.08, 'square', 0.04); }
      else if (angry) B.state = 'toss';
      else { B.state = 'walk'; pandaSpot(B); }
    }
  } else if (B.state === 'curl') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > 0.6) { B.state = 'roll'; B.st = 0; B.vx = B.dir * (angry ? 280 : 240); if (!B.rollHint) { B.rollHint = true; say('Бамбуся котиться клубочком! Перестрибни її', 2); } }
  } else if (B.state === 'roll') {
    B.x += B.vx * dt; B.roll += B.vx * dt / 18;
    if (B.x <= left || B.x >= right) {
      B.x = Math.max(left, Math.min(right, B.x)); B.state = 'dizzy'; B.st = 0; B.dz = 1.8; B.serves = 0; B.vx = 0;
      Snd.bossHit(); burst(B.x + B.dir * 20, B.gy - 20, 10, ['#ffffff', '#9be36a'], 120); G.flash = 0.15;
      if (!B.bumpHint) { B.bumpHint = true; say('Бамбуся вдарилася об бамбук і бачить зірочки! Стріляй або стрибни на неї', 2.6); }
    }
  } else if (B.state === 'dizzy') {
    if (B.st > B.dz) { B.state = 'walk'; B.st = 0; pandaSpot(B); }
  }
  B.x = Math.max(left, Math.min(right, B.x));
  const box = B.state === 'roll' ? { x: B.x - 18, y: B.gy - 36, w: 36, h: 36 } : { x: B.x - 22, y: B.gy - 54, w: 44, h: 54 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (stomp && B.state === 'dizzy') { hitBoss(2); P.vy = -480; P.cut = true; }
    else if (stomp) { P.vy = -440; P.cut = true; Snd.boing(); }
    else if (B.state === 'roll') hurtPlayer(false);
    else if (B.state !== 'dizzy') { P.vx = (pcx < B.x ? -1 : 1) * 200; P.launchT = 0.2; }
  }
}
// поки Бамбуся не запаморочилась, вона відбиває постріли ракеткою
const armored19base = armored19;
armored19 = function (s, B) {
  if (B.kind === 'panda' && B.state !== 'dizzy') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Бамбуся відбиває ракеткою! Влуч рогом у її м’ячик — він полетить назад', 2.8); }
    return true;
  }
  return armored19base(s, B);
};
const resetBoss19base = resetBoss19;
resetBoss19 = function (B) {
  if (B.kind === 'panda') { B.state = 'walk'; B.st = 0; B.serves = 0; B.backs = []; B.vx = 0; pandaSpot(B); return; }
  resetBoss19base(B);
};
