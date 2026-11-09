'use strict';
/* ===== Частини 23–24: посилки й поштомати, пожежний шланг, будівельна каска, реактивний ранець, перемикачі, чарівні окуляри; боси Цуцик Гавчик і Мишеня Клацик ===== */
Object.assign(TUNES, {
  postoffice: { base: 587.33, ms: 180, n: [0, 4, 7, null, 7, 9, 7, 4, 2, null, 5, null, 9, null, null, null, 7, 11, 14, null, 12, 11, 9, 7, 5, null, 4, 2, 0, null, null, null], b: [0, -5, -3, -7] },
  firestation: { base: 523.25, ms: 170, n: [0, 0, 7, 7, 9, 9, 7, null, 5, 5, 4, 4, 2, 2, 0, null, 7, 7, 5, 5, 4, 4, 2, null, 7, 7, 5, 5, 4, 4, 2, null], b: [0, -5, -7, -5] },
  construction: { base: 440, ms: 190, n: [0, null, 0, 3, 5, null, 5, 7, 8, null, 7, 5, 3, null, null, null, 0, null, 0, 3, 5, null, 8, 10, 12, null, 10, 8, 7, null, null, null], b: [0, -4, -2, -5] },
  citynight: { base: 493.88, ms: 200, n: [0, null, 4, null, 7, null, 11, null, 12, null, 11, 7, 4, null, null, null, 5, null, 9, null, 12, null, 16, null, 14, null, 12, 9, 7, null, null, null], b: [0, -5, -3, -7] },
  dogpark: { base: 587.33, ms: 160, n: [0, 4, 7, 4, 9, 7, 4, null, 2, 5, 9, 5, 11, 9, 5, null, 4, 7, 12, 7, 11, 9, 7, null, 5, 4, 2, 0, null, null, null, null], b: [0, -5, -3, -7] },
  jetlab: { base: 659.25, ms: 170, n: [0, 7, 12, 7, 0, 7, 12, 7, 2, 9, 14, 9, 2, 9, 14, 9, 4, 11, 16, 11, 4, 11, 16, null, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
  switchworks: { base: 523.25, ms: 160, n: [0, null, 12, null, 0, null, 12, null, 5, null, 17, null, 5, null, 17, null, 7, null, 19, null, 7, null, 19, null, 12, 11, 9, 7, 5, 4, 2, null], b: [0, -7, -5, -3] },
  glassbridge: { base: 783.99, ms: 210, n: [0, null, 4, 7, 12, null, 7, 4, 5, null, 9, 12, 17, null, 12, 9, 7, null, 11, 14, 19, null, 14, 11, 12, null, null, null, 0, null, null, null], b: [0, -5, -3, -7] },
  inventfair: { base: 698.46, ms: 160, n: [0, 4, 7, 12, 7, 4, 0, null, 5, 9, 12, 17, 12, 9, 5, null, 7, 11, 14, 19, 14, 11, 7, null, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
  gearden: { base: 440, ms: 180, n: [0, 3, 7, 3, 0, 3, 7, 10, 8, null, 7, null, 5, null, 3, null, 0, 3, 7, 3, 0, 3, 7, 12, 10, null, 8, null, 7, null, null, null], b: [0, -4, -2, -5] },
});
const POW19 = { hose: 1, helmet: 1, jetpack: 1, glasses: 1 };
const JET_TIME = 30, JET_FUEL = 2, GLASS_TIME = 15;

/* ===== Підготовка рівня ===== */
function initLevel19(G, L) {
  const P = G.P; P.parcel = null; P.hose = false; P.helmet = false; P.pound = false; P.jetT = 0; P.fuel = JET_FUEL; P.jetOn = false; P.glassT = 0;
  G.parcels = (L.parcels || []).map(p => Object.assign({ state: 'idle' }, p));
  G.lockers = (L.lockers || []).map(l => Object.assign({ got: 0, open: false, joy: 0 }, l));
  G.pdoors = L.pdoors || [];
  G.fires = (L.fires || []).map(f => Object.assign({ hp: 2 + f.h, out: false, outT: 0 }, f));
  G.switches = (L.switches || []).map(s => Object.assign({ cd: 0, touch: false }, s));
  G.swBlocks = L.swBlocks || []; G.rbSw = 'R'; G.swPending = [];
  G.ghosts = L.ghosts || []; G.ghostOn = false; G.ghostPending = [];
  applySwitch(true);
  initLevel20(G, L);
}
function powerUp19(P, p) {
  if (p.k === 'hose') { P.hose = true; say('Пожежний шланг! Тепер ріг стріляє водою — гаси вогонь', 3.2); }
  else if (p.k === 'helmet') { P.helmet = true; say('Будівельна каска! У стрибку натисни «Ріг» — гупнеш згори й розіб\'єш тріснуту плиту', 3.6); }
  else if (p.k === 'jetpack') { P.jetT = JET_TIME; P.fuel = JET_FUEL; say(G.jetHint ? 'Знову ранець!' : 'Реактивний ранець! У стрибку тримай «Стрибок» — і полетиш угору. Паливо набирається на землі', 3.6); G.jetHint = true; }
  else if (p.k === 'glasses') { P.glassT = GLASS_TIME; setGhosts(true); say(G.glassHint ? 'Знову окуляри!' : 'Чарівні окуляри! Тепер видно невидимі містки. Поспішай, поки окуляри діють', 3.4); G.glassHint = true; }
}

/* ===== Посилки й поштомати ===== */
function updateParcels(dt) {
  const P = G.P;
  for (const p of G.parcels) {
    if (p.state === 'idle' && !P.parcel && overlap(P, { x: p.x - 10, y: p.y - 10, w: 20, h: 20 })) { p.state = 'carry'; P.parcel = p; Snd.pop(); if (!G.parcelHint) { G.parcelHint = true; say('Посилка! Віднеси її в поштомат', 2.2); } }
  }
  for (const l of G.lockers) {
    if (l.joy > 0) l.joy -= dt;
    if (P.parcel && overlap(P, { x: l.x - 4, y: l.gy - 44, w: 2 * T + 8, h: 44 })) {
      P.parcel.state = 'done'; P.parcel = null; l.got++; l.joy = 1;
      G.points += 3; floatText(l.x + T, l.gy - 50, '+3', '#ff8a3d'); Snd.seq([0, 4, 7, 12], 659, 0.06, 'triangle', 0.07); burst(l.x + T, l.gy - 30, 16, RAINBOW, 140);
      if (!l.open && l.got >= (l.need || 1)) {
        l.open = true;
        for (const d of G.pdoors) if (d.id === l.id) for (let y = d.top; y < 10; y++) { if (tileAt(d.x, y) === 2) { G.map[y * G.Wt + d.x] = 0; burst(d.x * T + 12, y * T + 12, 6, ['#ff5c5c', '#ffffff'], 90); } }
        say('Посилку доставлено! Шлагбаум відчинився', 2.2);
      }
    }
  }
}

/* ===== Вогонь і пожежний шланг ===== */
function updateFires(dt) {
  const P = G.P;
  if (P.hose) for (const s of G.shots) if (!s.water && s.t < 0.05) s.water = true;
  for (const f of G.fires) {
    if (f.out) { f.outT += dt; continue; }
    const box = { x: f.x * T + 3, y: f.row * T + 6, w: T - 6, h: f.h * T - 6 };
    const s = cheerShot(box.x - 2, box.y - 4, box.x + box.w + 2, box.y + box.h);
    if (s) {
      if (!P.hose) { Snd.tink(); if (!G.fireHint || G.fireHint < G.t - 6) { G.fireHint = G.t; say('Вогонь іскорками не загасиш. Потрібен пожежний шланг!', 2.6); } }
      else { f.hp -= s.big ? 3 : 1; Snd.tone(300, 0.15, 'sine', 0.04, 150); for (let i = 0; i < 4; i++) G.parts.push({ k: 'puff', x: box.x + box.w / 2 + (Math.random() - 0.5) * 12, y: box.y + Math.random() * box.h, vx: (Math.random() - 0.5) * 30, vy: -40, t: 0, life: 0.6, r: 6 });
        if (f.hp <= 0) { f.out = true; f.outT = 0; G.points += 1; floatText(box.x + box.w / 2, box.y - 6, 'Загашено! +1', '#3f8fff'); Snd.seq([0, 5, 9], 523, 0.05, 'sine', 0.06); } }
    }
    if (overlap(P, box)) hurtPlayer(false);
  }
}

/* ===== Будівельна каска: у стрибку «Ріг» — гуп! ===== */
function updatePound(P, dt) {
  if (!P.helmet) return;
  if (!P.onGround && !P.pound && In.shootP && !P.hang && !P.bub && !P.swing && !P.zip) {
    P.pound = true; P.vy = 760; P.charging = false; Snd.tone(500, 0.2, 'square', 0.04, 120);
  }
  if (P.pound && !P.onGround) P.vy = Math.max(P.vy, 700);
  if (P.pound && P.onGround) {
    const ty = Math.floor((P.y + P.h + 2) / T); let broke = false;
    for (let tx = Math.floor((P.x - 2) / T); tx <= Math.floor((P.x + P.w + 1) / T); tx++) if (tileAt(tx, ty) === 18) {
      G.map[ty * G.Wt + tx] = 0; broke = true;
      burst(tx * T + 12, ty * T + 12, 10, ['#c9b49a', '#8f7a64', '#ffffff'], 150);
      G.parts.push({ k: 'puff', x: tx * T + 12, y: ty * T + 12, vx: 0, vy: -20, t: 0, life: 0.6, r: 9 });
    }
    G.flash = Math.max(G.flash, 0.12); Snd.tone(90, 0.35, 'sawtooth', 0.1, 40);
    floatText(P.x + P.w / 2, P.y - 6, 'Гуп!', '#e07a20');
    // струс приголомшує ворогів поруч
    for (const e of G.enemies) if (!e.dead && Math.abs(e.x + e.w / 2 - P.x - P.w / 2) < 80 && Math.abs(e.y + e.h - P.y - P.h) < 16 && !IMMUNE[e.k]) defeat(e);
    if (broke) { P.onGround = false; P.vy = 300; if (!G.poundHint) { G.poundHint = true; say('Плита розсипалася! Униз!', 1.8); } }
    else P.pound = false;
  }
}

/* ===== Реактивний ранець ===== */
function updateJet(P, dt) {
  for (const p of G.powers) if ((p.k === 'jetpack' || p.k === 'glasses') && p.got) { p.reT = (p.reT || 0) + dt; if (p.reT > 4 && Math.abs(P.x + P.w / 2 - p.x) > 60) { p.got = false; p.reT = 0; } }
  P.jetOn = false;
  if (!(P.jetT > 0)) return;
  P.jetT -= dt; if (P.jetT <= 0) { P.jetT = 0; say('Ранець вимкнувся. Пошукай новий!', 2); return; }
  if (P.onGround) { P.fuel = Math.min(JET_FUEL, P.fuel + dt * 2); return; }
  if (In.jump && P.fuel > 0 && P.vy > -200 && !P.hang && !P.bub && !P.swing && !P.zip && !P.flip) {
    P.vy = Math.max(P.vy - 2600 * dt, -200); P.fuel = Math.max(0, P.fuel - dt); P.jetOn = true;
    if (Math.random() < 0.5) G.parts.push({ k: 'spark', x: P.x + P.w / 2 - P.dir * 8, y: P.y + P.h - 2, vx: -P.dir * 20, vy: 120, t: 0, life: 0.35, r: 2.2, col: Math.random() < 0.5 ? '#ffd23f' : '#ff7a3d' });
  }
}

/* ===== Перемикачі: торкнешся (або стрельнеш) — червоні й сині кубики міняються місцями ===== */
function applySwitch(first) {
  G.swPending = [];
  const P = G.P;
  for (const b of G.swBlocks) {
    const on = b.c === G.rbSw, i = b.y * G.Wt + b.x;
    if (!on) { G.map[i] = 0; continue; }
    if (!first && overlap(P, { x: b.x * T, y: b.y * T, w: T, h: T })) { G.swPending.push(b); continue; }
    G.map[i] = 2;
  }
}
function updateSwitches(dt) {
  const P = G.P;
  for (const s of G.switches) {
    if (s.cd > 0) s.cd -= dt;
    const box = { x: s.x - 11, y: s.gy - 40, w: 22, h: 40 }, touch = overlap(P, box);
    const shot = cheerShot(box.x, box.y, box.x + box.w, box.y + box.h);
    if (((touch && !s.touch) || shot) && s.cd <= 0) {
      G.rbSw = G.rbSw === 'R' ? 'B' : 'R'; s.cd = 0.6; applySwitch(false);
      Snd.seq([0, 7], G.rbSw === 'R' ? 440 : 660, 0.06, 'square', 0.05); burst(s.x, s.gy - 20, 10, [G.rbSw === 'R' ? '#ff5c5c' : '#4c8dff', '#ffffff'], 110);
      if (!G.swHint) { G.swHint = true; say('Клац! Червоні й сині кубики помінялися', 2.2); }
    }
    s.touch = touch;
  }
  G.swPending = G.swPending.filter(b => { if (overlap(P, { x: b.x * T, y: b.y * T, w: T, h: T }) || b.c !== G.rbSw) return b.c === G.rbSw; G.map[b.y * G.Wt + b.x] = 2; return false; });
}

/* ===== Чарівні окуляри: невидимі містки, поки окуляри діють ===== */
function setGhosts(on) {
  G.ghostOn = on; G.ghostPending = [];
  const P = G.P;
  for (const g of G.ghosts) {
    const i = g.y * G.Wt + g.x;
    if (!on) { G.map[i] = 0; continue; }
    if (overlap(P, { x: g.x * T, y: g.y * T, w: T, h: T })) { G.ghostPending.push(g); continue; }
    G.map[i] = 2;
  }
}
function updateGlasses(P, dt) {
  if (G.ghostOn && G.ghostPending.length) G.ghostPending = G.ghostPending.filter(g => { if (overlap(P, { x: g.x * T, y: g.y * T, w: T, h: T })) return true; G.map[g.y * G.Wt + g.x] = 2; return false; });
  if (!(P.glassT > 0)) return;
  P.glassT -= dt;
  if (P.glassT <= 0) { P.glassT = 0; setGhosts(false); say('Окуляри зникли — містки знову невидимі', 2); }
}

function update19(dt) {
  const P = G.P;
  updateParcels(dt);
  updateFires(dt);
  updatePound(P, dt);
  updateJet(P, dt);
  updateSwitches(dt);
  updateGlasses(P, dt);
  update20(dt);
}
function respawn19(P) { P.pound = false; }

/* ===== Боси-бігуни: Цуцик Гавчик і Мишеня Клацик — бігають, кидаються, а потім відпочивають ===== */
const RUNNERS = {
  puppy: { name: 'Цуцик Гавчик', acc: 'Цуцика Гавчика', win: ' Тепер він віддав усі посилки й радісно махає хвостиком.', bolt: 'bone', hello: 'Цуцик Гавчик: «Гав! Це мої коробки! Гав-гав!»', rest: 'Цуцик ліг на спинку й важко дихає. Стріляй або стрибни йому на пузико!', arm: 'Цуцик бігає надто швидко! Стріляй, коли він ляже відпочити' },
  mouse: { name: 'Мишеня Клацик', acc: 'Мишеня Клацика', win: ' Тепер його ключик крутиться весело, а зірочки знову сяють.', bolt: 'gear', hello: 'Мишеня Клацик: «Клац-клац! Усі зірочки — у мої шестерні!»', rest: 'Ключик зупинився — Мишеня завмерло! Стріляй або стрибни на нього', arm: 'Мишеня крутиться надто швидко! Стріляй, коли ключик зупиниться' },
};
for (const k of Object.keys(RUNNERS)) BOSS2[k] = L => ({ kind: k, name: RUNNERS[k].name, acc: RUNNERS[k].acc, win: RUNNERS[k].win, x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 26, hw: 28, hh: 26, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, n: 0, tx: 0, vy: 0, hop: 0 });
function updateRunnerBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena, R = RUNNERS[B.kind];
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 50, right = A.x1 - 50;
  // невеликі підскоки
  if (B.hop > 0 || B.vy < 0) { B.vy += 1500 * dt; B.hop = Math.max(0, B.hop - B.vy * dt); if (B.hop <= 0) { B.hop = 0; B.vy = 0; } }
  B.y = B.gy - 26 - B.hop;
  if (B.dead) { B.deadT += dt; if (B.hop <= 0 && B.deadT % 0.8 < dt) { B.vy = -300; B.hop = 0.1; } return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'dash'; B.st = 0; B.n = 0; B.tx = B.x < (left + right) / 2 ? right : left; Music.start('boss'); say(R.hello, 3); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  if (B.state === 'dash') {
    const d = B.tx - B.x; B.dir = Math.sign(d) || B.dir;
    B.x += Math.sign(d) * Math.min(Math.abs(d), (angry ? 300 : 250) * dt);
    if (B.hop <= 0 && B.st % 0.35 < dt) { B.vy = -200; B.hop = 0.1; }
    if (Math.abs(d) < 2) { B.n++; B.st = 0; if (B.n >= (angry ? 3 : 2)) { B.state = 'throw'; B.n = 0; } else { B.state = 'turn'; } }
  } else if (B.state === 'turn') {
    if (B.st > 0.4) { B.state = 'dash'; B.st = 0; B.tx = B.x < (left + right) / 2 ? right : left; }
  } else if (B.state === 'throw') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > (angry ? 0.45 : 0.65)) {
      B.st = 0; B.n++;
      const fl = 0.9, vx = clamp((pcx - B.x) / fl, -260, 260);
      G.bolts.push({ kind: R.bolt, x: B.x + B.dir * 16, y: B.y - 20, vx, vy: -450, g: 1000, r: 7, t: 0 });
      Snd.tone(600, 0.12, 'triangle', 0.05, 900);
      if (B.n >= (angry ? 4 : 3)) { B.state = 'rest'; B.st = 0; B.n = 0; }
    }
  } else if (B.state === 'rest') {
    if (!B.restHint && B.st > 0.3) { B.restHint = true; say(R.rest, 3); }
    if (B.st > 0.3 && G.t % 1 < dt) floatText(B.x, B.y - 34, R.restText || (B.kind === 'puppy' ? 'Хек-хек…' : 'Клац… клац…'), '#8a5a30');
    if (B.st > (angry ? 2.3 : 2.9)) { B.state = 'dash'; B.st = 0; B.n = 0; B.tx = B.x < (left + right) / 2 ? right : left; }
  }
  const box = { x: B.x - 26, y: B.y - 24, w: 52, h: 48 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (stomp && B.state === 'rest') { hitBoss(2); P.vy = -480; P.cut = true; }
    else if (stomp) { P.vy = -440; P.cut = true; Snd.boing(); }
    else if (B.state !== 'rest') hurtPlayer(false);
  }
}
function armored19(s, B) {
  if (RUNNERS[B.kind] && B.state !== 'rest') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say(RUNNERS[B.kind].arm, 2.6); }
    return true;
  }
  return false;
}
function resetBoss19(B) {
  if (RUNNERS[B.kind]) { B.state = 'dash'; B.st = 0; B.n = 0; B.hop = 0; B.vy = 0; B.tx = B.x < (G.arena.x0 + G.arena.x1) / 2 ? G.arena.x1 - 50 : G.arena.x0 + 50; }
}
