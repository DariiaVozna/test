'use strict';
/* ===== Частина 32 «Пригоди без меж»: рівні з багатьма механіками й Хмара Буркотуха — бос, що літає, а не бігає ===== */
Object.assign(TUNES, {
  skyharbor: { base: 587.33, ms: 165, n: [0, 4, 7, 12, 7, 4, 0, null, 2, 5, 9, 14, 9, 5, 2, null, 4, 7, 11, 16, 11, 7, 4, null, 12, 14, 16, 19, 16, 12, 7, null], b: [0, -5, -3, -7] },
  gemmine: { base: 493.88, ms: 180, n: [0, null, 3, 5, 7, null, 10, 7, 5, null, 3, 5, 3, null, 0, null, 0, null, 3, 5, 7, null, 12, 10, 7, null, 5, 3, 2, null, null, null], b: [0, -4, -2, -5] },
  aquapark: { base: 659.25, ms: 160, n: [0, 4, 7, 9, 7, 4, 0, 4, 2, 5, 9, 11, 9, 5, 2, 5, 4, 7, 11, 12, 11, 7, 4, 7, 12, null, 11, null, 9, null, 7, null], b: [0, -5, -3, -7] },
  toyworks: { base: 698.46, ms: 170, n: [0, 0, 4, 4, 7, 7, 4, null, 5, 5, 4, 4, 2, 2, 0, null, 7, 7, 5, 5, 4, 4, 2, null, 7, 7, 5, 5, 4, 4, 2, null], b: [0, -5, -3, -7] },
  stormcastle: { base: 440, ms: 175, n: [0, 3, 7, 10, 12, 10, 7, 3, 5, 8, 12, 15, 17, 15, 12, 8, 7, 10, 14, 17, 19, 17, 14, 10, 12, null, 7, null, 0, null, null, null], b: [0, -4, -2, -5] },
});

/* ===== Хмара Буркотуха: літає вгорі й кидає краплі, потім сідає, гримить хвилями й утомлюється ===== */
BOSS2.grumpcloud = L => ({ kind: 'grumpcloud', name: 'Хмара Буркотуха', acc: 'Хмару Буркотуху', win: ' Вона виплакала всі дощі й тепер усміхається веселкою.', x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 26, hw: 34, hh: 22, hp: 24, max: 24, t: 0, st: 0, state: 'sleep', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, dropT: 1.2 });
function updateGrumpBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  const ground = B.gy - 26;
  if (B.dead) { B.deadT += dt; B.y += (ground - B.y) * Math.min(1, dt * 3); return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'takeoff'; B.st = 0; Music.start('boss'); say('Хмара Буркотуха: «Бур-бур! Залию все дощем!»', 2.6); G.flash = 0.3; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 60, right = A.x1 - 60;
  if (B.state === 'takeoff') { B.y += (66 - B.y) * Math.min(1, dt * 2.5); if (B.st > 0.9) { B.state = 'fly'; B.st = 0; B.hx = B.x; } }
  else if (B.state === 'fly') {
    if (B.hx == null || isNaN(B.hx)) B.hx = B.x;
    const swing = Math.min((right - left) / 2, viewW * 0.32), home = Math.max(left + swing, Math.min(right - swing, pcx));
    B.hx += (home - B.hx) * Math.min(1, dt * 0.8);
    const nx = B.hx + Math.sin(B.st * (angry ? 0.95 : 0.75)) * swing;
    if (Math.abs(nx - B.x) > 0.3) B.dir = nx > B.x ? 1 : -1;
    B.x = nx; B.y = 66 + Math.sin(B.t * 2) * 10;
    B.dropT -= dt;
    if (B.dropT <= 0) { B.dropT = angry ? 1.0 : 1.5; G.bolts.push({ kind: 'tear', fall: true, x: B.x + (Math.random() - 0.5) * 40, y: B.y + 20, vx: 0, vy: 60, g: 420, t: 0 }); }
    if (B.st > (angry ? 4 : 5.5)) { B.state = 'land'; B.st = 0; }
  } else if (B.state === 'land') {
    B.y += (ground - B.y) * Math.min(1, dt * 3.2); B.dir = pcx < B.x ? -1 : 1;
    if (B.st > 0.8) { B.y = ground; B.state = 'thunder'; B.st = 0; Snd.bossHit(); burst(B.x, B.gy - 4, 12, ['#ffffff', '#c8d8f0'], 120); }
  } else if (B.state === 'thunder') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > (angry ? 0.9 : 1.3) && !B.boomed) {
      B.boomed = true; G.flash = 0.25; Snd.tone(90, 0.4, 'sawtooth', 0.08, 50);
      floatText(B.x, B.y - 44, 'БУР-Р-Р!', '#5a6aa8');
      for (const s of [-1, 1]) G.bolts.push({ kind: 'tear', x: B.x + s * 44, y: B.gy - 9, vx: s * 140, vy: 0, t: 0 });
    }
    if (B.st > (angry ? 1.4 : 1.8)) { B.state = 'tired'; B.st = 0; B.boomed = false; say('Буркотуха втомилася й задрімала! Стрибни на неї або стріляй', 2); }
  } else if (B.state === 'tired') { if (B.st > (angry ? 2.2 : 2.8)) { B.state = 'takeoff'; B.st = 0; } }
  B.x = Math.max(left, Math.min(right, B.x));
  const box = { x: B.x - 32, y: B.y - 20, w: 64, h: 42 };
  if (overlap(P, box)) {
    if (P.vy > 40 && P.y + P.h - box.y < 18) { hitBoss(2); P.vy = -480; P.cut = true; }
    else if (B.state !== 'tired') hurtPlayer(false);
  }
}
