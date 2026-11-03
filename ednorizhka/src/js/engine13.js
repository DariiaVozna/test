'use strict';
/* ===== Частина 17: вітрильник, годування звірят у зоопарку, барабани-повторюшки, м'яка земля, Мавпочка Шкода ===== */
Object.assign(TUNES, {
  sailake: { base: 523.25, ms: 200, n: [0, null, 4, null, 7, 9, 7, null, 4, null, 2, null, 0, null, null, null, 5, null, 9, null, 12, 14, 12, null, 9, null, 7, null, 4, null, null, null], b: [0, -5, -3, -7] },
  zoo: { base: 587.33, ms: 180, n: [0, 4, 7, 4, 0, null, 7, null, 5, 9, 12, 9, 5, null, 12, null, 4, 7, 11, 7, 4, null, 11, null, 2, 5, 9, 5, 0, null, null, null], b: [0, -5, -7, -5] },
  songmeadow: { base: 659.25, ms: 190, n: [0, null, 4, null, 7, null, 12, null, 11, null, 7, null, 9, null, null, null, 5, null, 9, null, 12, null, 16, null, 14, null, 12, null, 7, null, null, null], b: [0, -5, -3, -7] },
  treasure: { base: 493.88, ms: 200, n: [0, 3, 7, null, 3, null, 0, null, 5, 8, 12, null, 8, null, 5, null, 7, 10, 14, null, 10, null, 7, null, 5, 3, 2, null, 0, null, null, null], b: [0, -4, -5, -7] },
  bananagrove: { base: 587.33, ms: 175, n: [0, 4, 7, null, 9, 7, 4, null, 2, 5, 9, null, 12, 9, 5, null, 4, 7, 11, null, 12, 11, 7, null, 5, 4, 2, null, 0, null, null, null], b: [0, -5, -3, -7] },
});
Object.assign(HOVER, { swan: 1 });
Object.assign(ENEMY2, { mosquito: 1 });
Object.assign(FLYERS, { mosquito: 1 });
Object.assign(SHOOTABLE, { banana: 1 });
Object.assign(THORN_MSG, { treasure: 'Ой, колючки! Пошукай, де можна прокопати обхід' });

/* Плитки: 39 — м'яка земля, яку можна копати. Ворота за барабанами — плитки 33/34 */
const FOOD_FOR = { hippo: 'melon', giraffe: 'apple', elephant: 'bun' };
const FOOD_NAME = { melon: 'кавун', apple: 'яблуко', bun: 'булочку' };
const ANIMAL_NAME = { hippo: 'Бегемотик', giraffe: 'Жирафа', elephant: 'Слоник' };

function spawnEnemy13(e, b, hover, g) {
  switch (e.k) {
    case 'swan': return hover(26, 20, 3, 0.7, 2);
    case 'mosquito': return Object.assign(hover(16, 12, 1, 1, 3), { mx: e.tx * T + 12, my: e.ty * T + 12 });
  }
  return null;
}
function updateEnemy13(e, dt) {
  if (e.k === 'mosquito') {
    // комар дзижчить зигзагами й летить до єдиноріжки, але від дому далеко не відлітає
    const P = G.P, pcx = P.x + P.w / 2, pcy = P.y + P.h / 2;
    let tx = e.hx, ty = e.hy;
    if (Math.hypot(pcx - e.mx, pcy - e.my) < 150 && Math.hypot(pcx - e.hx, pcy - e.hy) < 200) { tx = pcx; ty = pcy - 6; }
    const dx = tx - e.mx, dy = ty - e.my, d = Math.hypot(dx, dy) || 1;
    e.mx += dx / d * Math.min(d, 52 * dt); e.my += dy / d * Math.min(d, 52 * dt);
    e.x = e.mx + Math.sin(e.t * 9) * 10 - e.w / 2; e.y = e.my + Math.cos(e.t * 13) * 6 - e.h / 2;
    if (Math.abs(dx) > 2) e.dir = dx > 0 ? 1 : -1;
    if (G.t % 0.5 < dt && Math.abs(e.mx - pcx) < 200) Snd.tone(880 + Math.random() * 60, 0.05, 'sawtooth', 0.008);
    return true;
  }
  return false;
}

/* ===== Підготовка рівня ===== */
function initLevel13(G, L) {
  const P = G.P; P.carry = null; P.digT = 0; P.digDownT = 0; P.lastDrum = null; P.slipT = 0;
  G.foods = (L.foods || []).map(f => Object.assign({ x: f.hx, y: f.hy, state: 'idle', t: 0 }, f));
  G.animals = (L.animals || []).map(a => Object.assign({ fed: false, t: 0, eat: 0, hintT: 0 }, a));
  for (const a of G.animals) if (a.mover != null) { a.m = G.movers[a.mover]; a.m.animal = a; }
  G.hasDirt = L.map.indexOf(39) >= 0;
  G.padSets = (L.padSets || []).map(s => Object.assign({ prog: 0, solved: false, show: null, idle: 0, shown: false, waitShow: 0 }, s, { drums: s.drums.map(i => G.movers[i]), door: s.door.map(q => q.slice()) }));
  for (const s of G.padSets) s.drums.forEach((d, i) => { d.set = s; d.idx = i; d.lit = 0; let y = Math.floor(d.y / T) + 1; while (y < ROWS && !solid(tileAt(Math.floor((d.x + d.w / 2) / T), y))) y++; d.gy = y * T; });
  G.peels = [];
}

/* ===== Вітрильник: постріл у вітрило штовхає човен ===== */
function updatePlatform13(m, dt) {
  if (m.sailboat) {
    const P = G.P, on = P.onMover === m;
    m.idle = on ? 0 : (m.idle || 0) + dt;
    // порожній човен повертається до свого берега
    if (!on && m.idle > 2.5 && Math.abs(m.x - m.bx) > 2) m.vx += (Math.sign(m.bx - m.x) * 45 - m.vx) * Math.min(1, dt * 2);
    m.vx *= Math.pow(0.55, dt);
    let nx = m.x + m.vx * dt;
    if (nx < m.x0) { nx = m.x0; m.vx = 0; } if (nx > m.x1 - m.w) { nx = m.x1 - m.w; m.vx = 0; }
    // палуба завжди врівень із берегом, гойдається тільки малюнок
    m.dx = nx - m.x; m.dy = 0; m.x = nx; m.y = m.by;
    if (m.puff > 0) m.puff -= dt;
    // постріл у вітрило
    const sx0 = m.x + m.w * 0.5, sx1 = m.x + m.w * 0.92, sy0 = m.y - 50, sy1 = m.y - 4;
    for (const s of G.shots) if (s.life > 0 && s.x > sx0 - s.r && s.x < sx1 + s.r && s.y > sy0 && s.y < sy1) {
      s.life = 0; m.vx = clamp(m.vx + Math.sign(s.vx) * (s.big ? 150 : 95), -190, 190); m.puff = 0.3;
      Snd.tone(330, 0.12, 'triangle', 0.05, 520); for (let i = 0; i < 3; i++) G.parts.push({ k: 'wind', x: m.x + m.w * 0.4, y: m.y - 14 - i * 12, vx: Math.sign(s.vx) * 120, vy: 0, t: 0, life: 0.4, dir: Math.sign(s.vx) });
      if (!G.sailHint) { G.sailHint = true; say('Постріл надуває вітрило — і човен пливе! Стріляй ще', 2.6); }
    }
    return;
  }
  if (m.hippo) {
    m.dx = 0; const ny = m.by + Math.sin(G.t * 1.6 + m.bx) * 1.6; m.dy = m.state === 'gone' ? 0 : ny - m.y; m.y = ny;
    return;
  }
  if (m.giraffe) {
    // жирафа після частування стає ліфтом: стань їй на голову — підніме на уступ
    const P = G.P, on = P.onMover === m, a = m.animal;
    let ty = m.y;
    if (!a.fed) ty = m.yTop;
    else if (on && m.y > m.yTop + 0.5) { ty = Math.max(m.yTop, m.y - 85 * dt); m.wait = 0; }
    else if (!on) { m.wait = (m.wait || 0) + dt; if (m.wait > 1.2) ty = Math.min(m.yBot, m.y + 85 * dt); }
    m.dx = 0; m.dy = ty - m.y; m.y = ty;
    return;
  }
}

/* ===== Зоопарк: неси звірятку його смаколик ===== */
function feedAnimal(a) {
  const P = G.P;
  a.fed = true; a.eat = 1.2; P.carry.state = 'eaten'; P.carry = null;
  Snd.seq([0, 4, 7, 12], 523, 0.08, 'triangle', 0.07);
  for (let i = 0; i < 5; i++) G.parts.push({ k: 'starpop', x: a.x + (Math.random() - 0.5) * 30, y: a.gy - 50, vx: (Math.random() - 0.5) * 40, vy: -60, t: 0, life: 1 });
  if (a.kind === 'hippo') { a.walk = 0; say('Бегемотик наївся й ліг у воду — тепер по ньому можна пройти!', 2.8); }
  else if (a.kind === 'giraffe') say('Жирафа нахилила голову! Стань на неї — і вона підніме тебе нагору', 2.8);
  else { G.winds.push({ x0: a.fx0, x1: a.fx1, y: a.ftop, y1: a.gy, fountain: true }); say('Слоник пустив фонтан! Стань у воду — і злетиш нагору', 2.8); }
}
function updateZoo(dt) {
  const P = G.P, pcx = P.x + P.w / 2, pcy = P.y + P.h / 2;
  for (const f of G.foods) {
    f.t += dt;
    if (f.state === 'idle' && !P.carry && Math.hypot(pcx - f.hx, pcy - f.hy) < 24) {
      f.state = 'carried'; P.carry = f; Snd.power();
      if (!G.carryHint) { G.carryHint = true; say('Ти несеш ' + FOOD_NAME[f.kind] + '! Віднеси звірятку, яке на нього чекає', 2.6); }
    }
    if (f.state === 'carried') { f.x = pcx + P.dir * 17; f.y = P.y + 4 + Math.sin(G.t * 5) * 1.5; }
  }
  for (const a of G.animals) {
    a.t += dt; if (a.eat > 0) a.eat -= dt; if (a.hintT > 0) a.hintT -= dt;
    if (a.kind === 'hippo' && a.fed && a.m.state === 'gone') { a.walk += dt; if (a.walk > 1.4) { a.m.state = 'float'; burst(a.m.x + a.m.w / 2, a.m.y, 14, ['#ffffff', '#bfefff'], 110); Snd.splash(); } }
    if (a.fed) continue;
    if (Math.abs(pcx - a.x) < 34 && pcy > a.gy - 80 && pcy < a.gy + 10) {
      if (P.carry && P.carry.kind === FOOD_FOR[a.kind]) feedAnimal(a);
      else if (a.hintT <= 0) { a.hintT = 4; say(ANIMAL_NAME[a.kind] + ' голодн' + (a.kind === 'giraffe' ? 'а' : 'ий') + '. Принеси ' + FOOD_NAME[FOOD_FOR[a.kind]] + '!', 2.4); }
    }
  }
}

/* ===== Барабани-повторюшки: запам'ятай мелодію й застрибни на барабани в тому ж порядку ===== */
const DRUM_NOTES = [0, 4, 7, 12], DRUM_COLS = ['#ff5c7a', '#ffd23f', '#4cb6ff', '#7fd46a'];
function drumNote(i) { Snd.tone(392 * Math.pow(2, DRUM_NOTES[i] / 12), 0.28, 'triangle', 0.08); }
function pressDrum(d) {
  const s = d.set; d.lit = 0.45; drumNote(d.idx); s.idle = 0;
  burst(d.x + d.w / 2, d.y - 4, 6, [DRUM_COLS[d.idx], '#ffffff'], 80);
  if (s.solved) return;
  s.show = null;
  if (s.seq[s.prog] === d.idx) {
    s.prog++;
    if (s.prog >= s.seq.length) {
      s.solved = true;
      for (const [tx, ty] of s.door) if (G.map[ty * G.Wt + tx] === 33) G.map[ty * G.Wt + tx] = 34;
      Snd.seq([0, 4, 7, 12, 16], 659, 0.08, 'triangle', 0.08); G.flash = 0.15; burst(d.x + d.w / 2, d.y - 20, 24, RAINBOW, 170);
      for (let i = 0; i < 3; i++) G.drops.push({ x: d.x + d.w / 2 - 10 + i * 10, y: d.y - 30, vx: (i - 1) * 60, vy: -260, t: 0, got: false });
      say('Правильно! Ворота відчинилися', 2.2);
    }
  } else {
    s.prog = 0; s.waitShow = 0.9;
    Snd.tone(150, 0.3, 'sawtooth', 0.05, 110);
    say('Ой, не той барабан. Послухай мелодію ще раз', 2.2);
  }
}
function updateDrums(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  const cur = P.onMover && P.onMover.drum ? P.onMover : null;
  if (cur && cur !== P.lastDrum) pressDrum(cur);
  P.lastDrum = cur;
  for (const s of G.padSets) {
    for (const d of s.drums) if (d.lit > 0) d.lit -= dt;
    if (s.solved) continue;
    const near = pcx > s.drums[0].x - 8 * T && pcx < s.drums[s.drums.length - 1].x + 3 * T;
    s.idle += dt;
    if (s.waitShow > 0) { s.waitShow -= dt; if (s.waitShow <= 0) s.show = { i: 0, t: 0 }; }
    if (near && (!s.shown || s.idle > 9) && !s.show) { s.shown = true; s.idle = 0; s.show = { i: 0, t: 0 }; if (!G.drumHint) { G.drumHint = true; say('Послухай мелодію барабанів і застрибни на них у тому ж порядку', 3); } }
    if (s.show) {
      s.show.t -= dt;
      if (s.show.t <= 0) {
        if (s.show.i >= s.seq.length) s.show = null;
        else { const d = s.drums[s.seq[s.show.i]]; d.lit = 0.45; drumNote(d.idx); s.show.i++; s.show.t = 0.65; }
      }
    }
  }
}

/* ===== М'яка земля: штовхай — прокопаєш, постій на ній — копаєш униз ===== */
function digTile(tx, ty) {
  if (tileAt(tx, ty) !== 39) return false;
  G.map[ty * G.Wt + tx] = 0;
  for (let i = 0; i < 6; i++) G.parts.push({ k: 'spark', x: tx * T + 12, y: ty * T + 12, vx: (Math.random() - 0.5) * 120, vy: -60 - Math.random() * 80, t: 0, life: 0.5, col: ['#c48a52', '#8a5a30', '#e6bf8f'][i % 3], r: 2.2 });
  return true;
}
function updateDig(P, dt) {
  if (!G.hasDirt) return;
  const ax = (In.right ? 1 : 0) - (In.left ? 1 : 0);
  // убік
  if (P.sideHit && tileAt(P.sideHit.tx, P.sideHit.ty) === 39 && ax) {
    P.digT += dt;
    if (P.digT > 0.18) {
      P.digT = 0; let any = false;
      for (let ty = Math.floor(P.y / T); ty <= Math.floor((P.y + P.h - 1) / T); ty++) any = digTile(P.sideHit.tx, ty) || any;
      if (any) { Snd.tone(180, 0.08, 'square', 0.03, 120); if (!G.digHint) { G.digHint = true; say('М\'яка земля! Штовхай її — прокопаєш, а постій на ній — копатимеш униз', 3); } }
    }
  } else P.digT = 0;
  // угору головою
  if (P.headHit && tileAt(P.headHit.tx, P.headHit.ty) === 39) { digTile(P.headHit.tx, P.headHit.ty); Snd.tone(220, 0.06, 'square', 0.03); }
  // униз
  if (P.onGround && !P.onMover && P.groundTile === 39 && !ax && !In.jump) {
    P.digDownT += dt;
    if (G.t % 0.15 < dt) G.parts.push({ k: 'spark', x: P.x + P.w / 2 + (Math.random() - 0.5) * 16, y: P.y + P.h, vx: (Math.random() - 0.5) * 80, vy: -80, t: 0, life: 0.4, col: '#c48a52', r: 2 });
    if (P.digDownT > 0.55) {
      P.digDownT = 0; const ty = Math.floor((P.y + P.h + 2) / T);
      for (const x of [P.x + 2, P.x + P.w / 2, P.x + P.w - 2]) digTile(Math.floor(x / T), ty);
      Snd.tone(160, 0.1, 'square', 0.04, 100);
    }
  } else P.digDownT = 0;
}

/* ===== Бананові шкірки: на них ковзають і єдиноріжка, і Мавпочка ===== */
function updatePeels(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  const gy = G.boss ? G.boss.gy : 10 * T;
  // шкірки падають згори (вони не боляче б'ють, але на підлозі слизькі)
  for (const q of G.peels) {
    q.t += dt;
    if (q.fall) { q.vy += 700 * dt; q.y += q.vy * dt; if (q.y >= gy - 2) { q.y = gy; q.fall = false; q.t = 0; Snd.tone(300, 0.06, 'triangle', 0.03); } }
  }
  G.peels = G.peels.filter(q => (q.fall || q.t < 9) && !q.used);
  if (P.slipT > 0) { P.slipT -= dt; if (P.slipT > 0.15) P.vx = P.slipDir * 230; }
  for (const q of G.peels) if (!q.fall && q.t > 0.3 && P.onGround && Math.abs(pcx - q.x) < 11 && P.slipT <= 0) {
    q.used = true; P.slipT = 0.6; P.slipDir = (P.vx || P.dir) > 0 ? 1 : -1; P.dir = P.slipDir; P.vy = -200; P.onGround = false;
    Snd.tone(600, 0.25, 'sine', 0.05, 200); floatText(pcx, P.y - 6, 'Ой!', '#ff9a3d');
    if (!G.peelHint) { G.peelHint = true; say('Бананова шкірка слизька! Перестрибуй шкірки', 2.4); }
  }
}

function update13(dt) {
  const P = G.P;
  updateZoo(dt);
  updateDrums(dt);
  updateDig(P, dt);
  updatePeels(dt);
}

/* ===== Мавпочка Шкода: кидає банани згори, розкидає шкірки, а тоді біжить підлогою й сама на них послизається ===== */
Object.assign(BOSS2, {
  monkey: L => ({ kind: 'monkey', name: 'Мавпочка Шкода', acc: 'Мавпочку Шкоду', win: ' Тепер вона ділиться бананами й нічого не хапає без дозволу.', x: L.arena.x0 + 30 * T, gy: 10 * T, top: 132, fy: 132, y: 112, hw: 18, hh: 20, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, vy: 0, throws: 0, drops: 0, passes: 0 }),
});
function updateMonkeyBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; B.vy += 1300 * dt; B.fy = Math.min(B.gy, B.fy + B.vy * dt); B.y = B.fy - 20; return; }
  if (!G.bossActive) {
    B.fy = B.top + Math.sin(B.t * 2) * 4; B.y = B.fy - 20;
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'swing'; B.st = 0; Music.start('boss'); say('Мавпочка Шкода: «Ух-ух! Зірочки блискучі, як банани! Спіймай мене, якщо зможеш!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 36, right = A.x1 - 36;
  if (B.state === 'swing') {
    B.fy = B.top + Math.sin(B.t * 4) * 6;
    const tx = clamp(pcx, left, right); B.dir = tx < B.x ? -1 : 1;
    B.x += clamp(tx - B.x, -100 * dt, 100 * dt);
    if (B.st > 0.85) {
      B.st = 0; B.throws++;
      const tf = 0.9, vx = (pcx - B.x) / tf, vy = ((B.gy - 10) - (B.fy + 10) - 0.5 * 900 * tf * tf) / tf;
      G.bolts.push({ kind: 'banana', r: 7, x: B.x, y: B.fy + 10, vx, vy, g: 900, t: 0 });
      Snd.tone(500, 0.12, 'triangle', 0.05, 800);
      if (B.throws >= (angry ? 3 : 2)) { B.state = 'peel'; B.st = 0; B.throws = 0; B.drops = 0; B.dir = B.x < (left + right) / 2 ? 1 : -1; }
    }
  } else if (B.state === 'peel') {
    B.fy = B.top + Math.sin(B.t * 4) * 6;
    B.x += B.dir * 150 * dt;
    if (B.x < left || B.x > right) { B.x = clamp(B.x, left, right); B.dir *= -1; }
    if (B.st > 0.45) { B.st = 0; B.drops++; G.peels.push({ x: B.x, y: B.fy + 12, vy: 0, fall: true, t: 0 }); Snd.tone(420, 0.08, 'sine', 0.04, 300); if (!B.peelHint) { B.peelHint = true; say('Мавпочка розкидає бананові шкірки! Не наступи', 2.4); } }
    if (B.drops >= (angry ? 4 : 3)) { B.state = 'drop'; B.st = 0; B.vy = -200; }
  } else if (B.state === 'drop') {
    B.vy += 1300 * dt; B.fy += B.vy * dt;
    if (B.fy >= B.gy) { B.fy = B.gy; B.state = 'run'; B.st = 0; B.passes = 0; B.dir = pcx < B.x ? -1 : 1; Snd.bump(); if (!B.runHint) { B.runHint = true; say('Мавпочка біжить! Застрибни на хмарку, а вона хай послизнеться на шкірці', 2.8); } }
  } else if (B.state === 'run') {
    // спершу коротко присідає й дивиться на єдиноріжку — є час відбігти
    if (B.st < 0.5) { B.dir = pcx < B.x ? -1 : 1; B.y = B.fy - 20; return; }
    B.x += B.dir * (angry ? 260 : 220) * dt;
    const pe = G.peels.find(q => !q.fall && q.t > 0.3 && Math.abs(q.x - B.x) < 12);
    if (pe) { pe.used = true; B.state = 'slip'; B.st = 0; B.vy = -320; Snd.tone(600, 0.3, 'sine', 0.06, 200); floatText(B.x, B.fy - 50, 'Ой-ой!', '#ff9a3d'); }
    else if (B.x < left || B.x > right) { B.x = clamp(B.x, left, right); B.dir *= -1; B.passes++; if (B.passes >= 2) { B.state = 'climb'; B.st = 0; B.vy = -720; } }
  } else if (B.state === 'slip') {
    B.vy += 1300 * dt; B.fy = Math.min(B.gy, B.fy + B.vy * dt); B.x += B.dir * 90 * dt;
    if (B.st > 0.45 && B.fy >= B.gy) { B.state = 'dizzy'; B.st = 0; if (!B.dizzyHint) { B.dizzyHint = true; say('Мавпочка послизнулася й бачить зірочки! Стріляй у неї', 2.4); } }
  } else if (B.state === 'dizzy') {
    B.fy = B.gy;
    if (B.st > (angry ? 2.1 : 2.7)) { B.state = 'climb'; B.st = 0; B.vy = -720; }
  } else if (B.state === 'climb') {
    B.vy += 1300 * dt; B.fy += B.vy * dt;
    if (B.vy > 0 && B.fy <= B.top + 30) { B.fy = B.top; B.state = 'swing'; B.st = 0; }
    if (B.fy < B.top) { B.fy = B.top; B.state = 'swing'; B.st = 0; }
  }
  B.x = clamp(B.x, left, right);
  B.y = B.fy - 20;
  const low = B.fy > B.top + 40;
  const box = { x: B.x - 16, y: B.fy - 40, w: 32, h: 40 };
  if (low && overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (B.state === 'dizzy' || B.state === 'slip') { if (stomp) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else hurtPlayer(false);
  }
}
function armored13(s, B) {
  if (B.kind === 'monkey' && B.state !== 'dizzy' && B.state !== 'slip') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Мавпочка надто спритна! Стріляй, коли вона послизнеться на шкірці', 2.6); }
    return true;
  }
  return false;
}
function resetBoss13(B) {
  if (B.kind === 'monkey') { B.state = 'swing'; B.st = 0; B.fy = B.top; B.vy = 0; B.throws = 0; G.peels = []; }
}
