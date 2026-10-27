'use strict';
/* ===== Частина 9: припливи, панцирики, сніжинка-заморожувач, грозові хмари, невагомість, Восьминіжка Ласунка ===== */
Object.assign(TUNES, {
  tide: { base: 587.33, ms: 220, n: [0, null, 4, null, 7, null, 9, null, 7, null, 4, null, 2, null, null, null, 0, null, 4, null, 9, null, 12, null, 11, null, 9, null, 7, null, null, null], b: [0, -5, -3, -7] },
  aurora: { base: 659.25, ms: 250, n: [0, null, null, 7, null, null, 12, null, 11, null, null, 7, null, null, 4, null, 5, null, null, 9, null, null, 14, null, 12, null, null, 7, null, null, null, null], b: [0, -3, -7, -5] },
  storm: { base: 440, ms: 180, n: [0, null, 3, null, 7, null, 3, null, 8, null, 7, null, 3, null, null, null, 0, null, 3, null, 10, null, 8, null, 7, null, 5, null, 3, null, null, null], b: [0, -4, -2, -5] },
  moon: { base: 523.25, ms: 240, n: [0, null, 7, null, 12, null, 16, null, 14, null, 12, null, 7, null, null, null, 2, null, 9, null, 14, null, 17, null, 16, null, 12, null, 9, null, null, null], b: [0, -5, -3, -7] },
  station: { base: 587.33, ms: 170, n: [0, 4, 7, null, 12, null, 7, 4, 2, null, 5, null, 9, null, null, null, 0, 4, 7, null, 12, null, 14, 12, 11, null, 7, null, 4, null, null, null], b: [0, -5, -3, -7] },
});
Object.assign(ENEMY2, { turtle: 1 });

function spawnEnemy5(e, b, hover, g) {
  if (e.k === 'turtle') return g(22, 18, { speed: 22, state: 'walk', st: 0 });
  if (e.k === 'alien') return Object.assign(b, { w: 20, h: 18, x: e.tx * T + 2, y: e.ty * T - 18, cool: 0.6 + Math.random(), air: false });
  return spawnEnemy6(e, b, hover, g);
}

/* Черепашка: стрибни — сховається в панцирик; штовхни панцирик — він покотиться й зіб'є ворогів */
function updateTurtle(e, dt) {
  e.st += dt;
  const spd = e.state === 'walk' ? e.speed : e.state === 'slide' ? 270 : 0;
  e.vx = e.dir * spd; e.vy = Math.min(e.vy + GRAV * dt, 600);
  if (moveBody(e, dt)) { e.dir *= -1; if (e.state === 'slide' && Math.abs(e.x - G.P.x) < 400) Snd.bump(); }
  else if (e.onGround && e.state === 'walk') { const ax = e.dir > 0 ? e.x + e.w + 2 : e.x - 2, v = tileAt(Math.floor(ax / T), Math.floor((e.y + e.h + 4) / T)); if (!(solid(v) || v === 3)) e.dir *= -1; }
  if (e.state === 'shell' && e.st > 6) { e.state = 'walk'; e.st = 0; }
  if (e.state === 'slide') {
    for (const o of G.enemies) if (o !== e && !o.dead && !o.ghost && !IMMUNE[o.k] && overlap(e, o)) defeat(o);
    if (e.st > 8) defeat(e);
  }
  if (e.y > VIEW_H + 40) e.dead = true;
}
function kickShell(e) {
  const P = G.P; e.state = 'slide'; e.st = 0; e.dir = (e.x + e.w / 2) >= (P.x + P.w / 2) ? 1 : -1;
  Snd.tone(300, 0.1, 'square', 0.06, 900); burst(e.x + e.w / 2, e.y + e.h, 6, ['#ffffff', '#9be36a'], 90);
}
function stompHook(e) {
  if (e.k !== 'turtle') return false;
  if (e.state === 'shell') kickShell(e);
  else {
    e.state = 'shell'; e.st = 0; e.vx = 0; Snd.tone(500, 0.12, 'square', 0.05, 300); burst(e.x + e.w / 2, e.y, 8, ['#ffffff', '#ffe14d'], 100);
    if (!G.shellHint) { G.shellHint = true; say('Панцирик! Штовхни його — він покотиться й зіб\'є ворогів', 2.4); }
  }
  return true;
}
function touchHook(e) {
  if (e.k !== 'turtle') return false;
  if (e.state === 'shell') { kickShell(e); return true; }
  return e.state === 'slide';
}

/* Сніжинка: постріл заморожує ворога в крижаний кубик. Кубик падає на землю, і на нього можна стати,
   щоб дострибнути на одну сходинку вище, ніж із землі */
const ICE_H = 30, ICE_LIFE = 8;
function freezeEnemy(e) {
  if (e.k === 'spark' || e.k === 'leaper') return false;
  const cx = e.x + e.w / 2, w = 30;
  e.dead = true; G.defeated++;
  const col = ['#ff9fd0', '#ffd54a', '#9fe0ff', '#c5a8ff', '#9ff0c4'][Math.floor(Math.random() * 5)];
  const y = Math.min(e.y + e.h, VIEW_H) - ICE_H;
  G.movers.push({ ice: true, x: cx - w / 2, y, bx: cx - w / 2, by: y, w, h: ICE_H, dx: 0, dy: 0, vy: 0, st: 0, life: ICE_LIFE, state: 'fall', col, fly: !!(FLYERS[e.k] || HOVER[e.k]), ax: 0, ay: 0, period: 1 });
  Snd.tone(1200, 0.25, 'triangle', 0.06, 1800); burst(cx, e.y + e.h / 2, 12, ['#ffffff', '#bfefff', '#9fe0ff'], 120);
  if (!G.frostHint) { G.frostHint = true; say('Крижаний кубик! Стань на нього — і дострибнеш вище', 2.4); }
  return true;
}
/* Кубик падає, доки не стане на землю, хмаринку чи інший кубик */
function iceLands(m, prevB) {
  const bot = m.y + m.h, l = Math.floor((m.x + 4) / T), r = Math.floor((m.x + m.w - 4) / T), ty = Math.floor(bot / T);
  for (let tx = l; tx <= r; tx++) { const v = tileAt(tx, ty); if (solid(v) || (v === 3 && prevB <= ty * T + 0.5)) return ty * T; }
  for (const o of G.movers) if (o !== m && o.ice && o.state === 'idle' && prevB <= o.y + 0.5 && bot >= o.y && m.x + m.w > o.x + 6 && m.x < o.x + o.w - 6) return o.y;
  return null;
}
function updateIce(m, dt) {
  const y0 = m.y; m.dx = 0; m.dy = 0; m.st += dt;
  if (m.state === 'fall') {
    const prevB = m.y + m.h;
    m.vy = Math.min(m.vy + 1400 * dt, 600); m.y += m.vy * dt;
    const top = iceLands(m, prevB);
    if (top != null) { m.y = top - m.h; m.vy = 0; m.state = 'idle'; if (m.st > 0.1 && Math.abs(m.x - G.P.x) < 400) Snd.bump(); }
    else if (m.y > VIEW_H + 40) { m.state = 'gone'; return; }
    m.dy = m.y - y0;
  }
  if (m.state !== 'gone' && m.st > m.life) {
    m.state = 'gone'; const cx = m.x + m.w / 2, cy = m.y + m.h / 2;
    if (Math.abs(cx - G.P.x) < 400) Snd.pop(); burst(cx, cy, 14, ['#ffffff', '#bfefff'], 120);
    if (m.fly) G.flys.push({ x: cx, y: cy, vx: (Math.random() - 0.5) * 40, t: 0, col: m.col }); else G.flowers.push({ x: cx, gy: m.y + m.h, col: m.col, t: 0 });
    G.drops.push({ x: cx, y: cy, vx: (Math.random() - 0.5) * 70, vy: -230, t: 0, got: false });
  }
}

function lowGravAt(P) {
  const cx = P.x + P.w / 2;
  for (const z of G.lowgravs) if (cx > z.x0 && cx < z.x1) return 0.55;
  return 1;
}
function pullAt(P) {
  if (!G.pull) return 0;
  const d = G.pull.x - (P.x + P.w / 2);
  return Math.abs(d) < 62 ? 0 : Math.sign(d) * G.pull.f;
}

function update5(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  // сніжинка з'являється знову, щоб можна було повернутися й спробувати ще раз
  for (const p of G.powers) if (p.k === 'frost' && p.got) { p.reT = (p.reT || 0) + dt; if (p.reT > 5 && Math.abs(pcx - p.x) > 60) { p.got = false; p.reT = 0; } }
  for (const z of G.water) if (z.tide) { const td = z.tide; z.y = (td.lo + td.hi) / 2 + (td.lo - td.hi) / 2 * Math.cos(G.t * TAU / td.per); }
  for (const s of G.storms) {
    const ph = (G.t + s.ph) % s.per, strike = ph >= s.per - 0.35;
    if (strike && !s.struck) { s.struck = true; if (Math.abs(s.x - pcx) < 360) { Snd.tone(90, 0.45, 'sawtooth', 0.08, 40); Snd.tone(1600, 0.08, 'square', 0.03); G.flash = Math.max(G.flash, 0.12); } }
    else if (!strike) s.struck = false;
    if (strike && Math.abs(pcx - s.x) < 17 && P.y + P.h > s.y + 20) hurtPlayer(false);
    if (!G.stormHint && Math.abs(s.x - pcx) < 200) { G.stormHint = true; say('Хмарка блимає — зараз блискавка! Перечекай і пробігай', 2.4); }
  }
  const B = G.boss;
  if (B && B.kind === 'octopus') for (const tn of B.tents) {
    if (tn.phase !== 'up' || tn.h < 20) continue;
    for (const s of G.shots) if (s.life > 0 && Math.abs(s.x - tn.x) < 10 + s.r && s.y > B.gy - tn.h && s.y < B.gy) { tn.phase = 'down'; tn.st = 0; s.life = 0; Snd.pop(); burst(tn.x, s.y, 10, ['#ffffff', '#e86fb4'], 110); break; }
  }
  update6(dt);
}

/* ===== Восьминіжка Ласунка: щупальця з-під підлоги, а потім втягує все до себе ===== */
Object.assign(BOSS2, {
  octopus: L => ({ kind: 'octopus', name: 'Восьминіжка Ласунка', acc: 'Восьминіжку Ласунку', win: ' Тепер вона ділиться зоряними цукерками з усіма.', x: (L.arena.x0 + L.arena.x1) / 2, y: 100, gy: 10 * T, hw: 30, hh: 28, hp: 24, max: 24, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, tents: [], tentLeft: 0, tentT: 0, hinted: false, tentHint: false }),
});
function updateOctoBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  for (const tn of B.tents) {
    tn.st += dt;
    if (tn.phase === 'warn') { if (tn.st > 0.75) { tn.phase = 'up'; tn.st = 0; if (Math.abs(tn.x - P.x) < 400) Snd.tone(220, 0.2, 'triangle', 0.05, 500); } }
    else if (tn.phase === 'up') { tn.h = Math.min(100, tn.h + 700 * dt); if (tn.st > 1.0) { tn.phase = 'down'; tn.st = 0; } }
    else { tn.h = Math.max(0, tn.h - 400 * dt); if (tn.h <= 0) tn.gone = true; }
  }
  B.tents = B.tents.filter(tn => !tn.gone);
  for (const tn of B.tents) if (tn.phase === 'up' && tn.h > 20 && overlap(P, { x: tn.x - 10, y: B.gy - tn.h, w: 20, h: tn.h })) hurtPlayer(false);
  if (B.dead) { B.deadT += dt; B.y += (110 + Math.sin(B.t * 1.5) * 8 - B.y) * Math.min(1, dt * 2); return; }
  if (!G.bossActive) {
    B.y = 100 + Math.sin(B.t * 1.6) * 6;
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'float'; B.st = 0; Music.start('boss'); say('Восьминіжка Ласунка: «Ням-ням! Усі зоряні цукерки — мої!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 60, right = A.x1 - 60;
  const hover = () => { B.y += (100 + Math.sin(B.t * 1.6) * 8 - B.y) * Math.min(1, dt * 3); };
  if (B.state === 'float') {
    const tx = clamp(pcx + Math.sin(B.t * 0.9) * 90, left, right); B.x += (tx - B.x) * Math.min(1, dt * 0.9); hover();
    if (B.st > (angry ? 2 : 2.6)) { B.state = 'tent'; B.st = 0; B.tentLeft = angry ? 4 : 3; B.tentT = 0; }
  } else if (B.state === 'tent') {
    hover(); B.tentT -= dt;
    if (B.tentLeft > 0 && B.tentT <= 0) {
      B.tentLeft--; B.tentT = 0.6;
      B.tents.push({ x: clamp(pcx + (Math.random() - 0.5) * 40, A.x0 + 20, A.x1 - 20), st: 0, phase: 'warn', h: 0 });
      if (!B.tentHint) { B.tentHint = true; say('Пухирці на підлозі — зараз вилізе щупальце! Відбіжи або стрельни в нього', 2.6); }
    }
    if (B.tentLeft <= 0 && B.tents.length === 0) { B.state = 'dive'; B.st = 0; }
  } else if (B.state === 'dive') {
    B.y += (200 - B.y) * Math.min(1, dt * 3);
    if (B.st > 0.7) {
      B.state = 'suck'; B.st = 0; G.pull = { x: B.x, f: angry ? 130 : 100 }; Snd.tone(300, 0.6, 'sine', 0.06, 120);
      if (!B.hinted) { B.hinted = true; say('Вона відкрила ротик! Стріляй, поки тягне до себе', 2.4); }
    }
  } else if (B.state === 'suck') {
    B.y = 200 + Math.sin(B.t * 3) * 2; if (G.pull) G.pull.x = B.x;
    if (B.st > (angry ? 1.9 : 2.3)) { B.state = 'rise'; B.st = 0; G.pull = null; }
  } else if (B.state === 'rise') {
    B.y += (100 - B.y) * Math.min(1, dt * 2.5);
    if (B.st > 0.8) { B.state = 'float'; B.st = 0; }
  }
  const box = { x: B.x - 26, y: B.y - 30, w: 52, h: 56 };
  if (overlap(P, box)) {
    if (B.state === 'suck' && P.vy > 40 && P.y + P.h - box.y < 18) { hitBoss(2); P.vy = -480; P.cut = true; }
    else { hurtPlayer(false); if (B.state === 'suck') { B.state = 'rise'; B.st = 0; G.pull = null; Snd.tone(200, 0.3, 'sawtooth', 0.05, 400); } }
  }
}
