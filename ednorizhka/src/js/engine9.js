'use strict';
/* ===== Частина 13: кенгуру, літо й зима, кільця-тарзанки, доміно й літери, Кубик Кидайло ===== */
Object.assign(TUNES, {
  savanna: { base: 523.25, ms: 190, n: [0, null, 4, 7, null, 7, 9, null, 7, null, 4, null, 2, null, 0, null, 5, null, 9, 12, null, 12, 14, null, 12, null, 9, null, 7, null, null, null], b: [0, -5, -3, -7] },
  seasonS: { base: 587.33, ms: 200, n: [0, null, 4, null, 7, null, 12, null, 11, null, 7, null, 9, null, null, null, 5, null, 9, null, 12, null, 16, null, 14, null, 12, null, 7, null, null, null], b: [0, -5, -7, -3] },
  seasonW: { base: 523.25, ms: 240, n: [12, null, 11, null, 7, null, 4, null, 7, null, 11, null, 12, null, null, null, 9, null, 7, null, 4, null, 2, null, 4, null, 7, null, 0, null, null, null], b: [0, -3, -5, -7] },
  rings: { base: 493.88, ms: 180, n: [0, 4, null, 7, null, 4, 9, null, 7, null, 4, 2, null, 0, null, null, 5, 9, null, 12, null, 9, 14, null, 12, null, 9, 7, null, 5, null, null], b: [0, -5, -2, -7] },
  board: { base: 659.25, ms: 170, n: [0, null, 7, null, 4, null, 7, null, 2, null, 7, null, 4, null, null, null, 0, null, 9, null, 5, null, 9, null, 7, null, 11, null, 12, null, null, null], b: [0, -4, -7, -5] },
  dicecastle: { base: 440, ms: 180, n: [0, null, 3, 7, null, 3, 8, null, 7, null, 5, 3, null, 2, null, null, 0, null, 3, 7, null, 12, 10, null, 8, null, 7, 5, null, 3, null, null], b: [0, -4, -5, -2] },
});
Object.assign(WALKERS, { echidna: 1 });
Object.assign(NO_STOMP, { echidna: 1 });
Object.assign(IMMUNE, { echidna: 1 });
Object.assign(ENEMY2, { knight: 1 });
Object.assign(SHOOTABLE, { minidie: 1 });

/* Плитки: 24 — доміно (малюються окремо), 25 — лід на озері (зимою), 26 — квітка-сходинка (влітку), 27 — снігова сходинка (зимою) */
const MOUNT_W = 26, MOUNT_H = 44, MOUNT_JUMP = 690;

function spawnEnemy9(e, b, hover, g) {
  switch (e.k) {
    case 'echidna': return g(24, 16, { speed: 22 });
    case 'knight': return g(20, 26, { cool: 0.8 + Math.random(), air: false, ph: 0 });
  }
  return null;
}
function updateEnemy9(e, dt) {
  if (e.k === 'knight') {
    // шаховий коник стрибає літерою «Г»: спершу вгору, потім убік
    const P = G.P, pcx = P.x + P.w / 2, cx = e.x + e.w / 2;
    if (e.onGround && !e.air) {
      e.vx = 0; e.cool -= dt;
      if (e.cool <= 0 && Math.abs(pcx - cx) < 280) { e.dir = pcx < cx ? -1 : 1; e.vy = -540; e.air = true; e.ph = 0; e.cool = 1.5; if (Math.abs(pcx - cx) < 400) Snd.tone(600, 0.12, 'triangle', 0.04, 900); }
    }
    if (e.air) { e.ph += dt; e.vx = e.ph < 0.2 ? 0 : e.dir * 120; }
    e.vy = Math.min(e.vy + GRAV * dt, 600);
    if (moveBody(e, dt)) { e.dir *= -1; }
    if (e.onGround && e.air && e.ph > 0.1) { e.air = false; e.vx = 0; }
    if (e.y > VIEW_H + 40) e.dead = true;
    return true;
  }
  return false;
}
/* Верхи на кенгуру: наземних ворогів кенгуру відкидає лапами */
function touchHook9(e) {
  const P = G.P;
  if (P.mount && !FLYERS[e.k] && !HOVER[e.k] && !SWIMMERS[e.k]) { defeat(e); Snd.bump(); return true; }
  return false;
}

/* ===== Підготовка рівня ===== */
function initLevel9(G, L) {
  G.roos = (L.roos || []).map(r => Object.assign({ state: 'home', t: r.x * 0.1, poof: 0 }, r));
  G.rooStops = L.rooStops || [];
  G.totems = (L.totems || []).map(t => Object.assign({ armed: true, glow: 0 }, t));
  G.season = L.def.theme === 'seasonW' ? 'winter' : 'summer';
  for (const z of G.water) z.frozen = !!(L.def.seasons && G.season === 'winter');
  G.rings = (L.rings || []).map(r => Object.assign({ th: 0, om: 0, held: false }, r));
  ringPos(G);
  G.dominoes = (L.dominoes || []).map(d => Object.assign({ state: 'stand', a: 0, va: 0 }, d));
  const word = nameWord(), spots = L.letterSpots || [], k = Math.min(word.length, spots.length);
  G.word = spots.length ? word.slice(0, k) : '';
  G.letters = [];
  for (let j = 0; j < k; j++) { const s = spots[k > 1 ? Math.round(j * (spots.length - 1) / (k - 1)) : 0]; G.letters.push({ x: s.x, y: s.y, ch: G.word[j], got: false, t: j }); }
  G.P.mount = null; G.P.swing = null; G.P.swingCd = 0;
}
/* Слово з імені: літери, які можна зібрати (якщо ім'я незвичне — «ЗІРКА») */
function nameWord() {
  const n = (save.profile.name || '').trim().toUpperCase().replace(/['’ʼ`-]/g, '');
  return /^[A-ZА-ЯІЇЄҐЁ]{2,8}$/.test(n) ? n : 'ЗІРКА';
}

/* ===== Кенгуру ===== */
function setMount(P, roo) {
  if (roo) {
    if (P.mini) setMini(P, false);
    if (P.big) setBig(P, false);
    const ny = P.y + P.h - MOUNT_H, nx = [P.x - (MOUNT_W - P.w) / 2, P.x - (MOUNT_W - P.w), P.x].find(x => !boxSolid(x, ny, MOUNT_W, MOUNT_H));
    if (nx == null) return false;
    P.mount = roo; roo.state = 'ridden'; P.x = nx; P.y = ny; P.w = MOUNT_W; P.h = MOUNT_H;
    Snd.seq([0, 7, 12], 392, 0.07, 'triangle', 0.07); burst(P.x + P.w / 2, P.y + P.h - 10, 14, ['#ffb347', '#ffffff'], 120);
    say(G.rooHint ? 'Знову верхи!' : 'Верхи на кенгуру! Тримай «Стрибок» — і стрибнеш дуже високо', 2.6); G.rooHint = true;
    return true;
  }
  if (!P.mount) return false;
  const r = P.mount; P.mount = null;
  // кенгуру чекає на останньому безпечному місці, щоб по нього завжди можна було повернутися
  r.state = 'back'; r.t = 0; r.poof = 0.4; burst(P.x + P.w / 2, P.y + P.h - 10, 14, ['#ffb347', '#ffffff'], 140);
  if (P.safe) { r.x = P.safe.x + (P.safe.w || P.w) / 2; r.gy = P.safe.y + (P.safe.h || P.h); }
  P.x += (MOUNT_W - 22) / 2; P.y += MOUNT_H - 30; P.w = 22; P.h = 30;
  return true;
}
/* Удар, коли сидиш на кенгуру: серце ціле, а кенгуру стрибає додому */
function mountHurt(P) {
  setMount(P, null); P.inv = 1.4; P.rooCd = 1.4; P.vy = -300; P.cut = true; Snd.tone(400, 0.25, 'triangle', 0.06, 200);
  say('Кенгуру злякалося й зістрибнуло. Підійди до нього знову!', 2.4);
}

/* ===== Літо й зима ===== */
function toggleSeason() {
  const winter = G.season !== 'winter';
  G.season = winter ? 'winter' : 'summer'; G.theme = winter ? 'seasonW' : 'seasonS';
  for (const z of G.water) z.frozen = winter;
  G.flash = 0.35; Music.start(G.theme); Snd.seq(winter ? [12, 7, 4, 0] : [0, 4, 7, 12], 523, 0.07, 'triangle', 0.08);
  const P = G.P;
  for (let k = 0; k < 4; k++) {
    let top = -1;
    for (let ty = Math.floor(P.y / T); ty <= Math.floor((P.y + P.h - 0.01) / T); ty++) for (let tx = Math.floor(P.x / T); tx <= Math.floor((P.x + P.w - 0.01) / T); tx++) if (solid(tileAt(tx, ty)) && (top < 0 || ty < top)) top = ty;
    if (top < 0) break;
    P.y = top * T - P.h; P.vy = Math.min(P.vy, 0);
  }
  for (let i = 0; i < 30; i++) G.parts.push({ k: 'spark', x: G.cam + Math.random() * viewW, y: Math.random() * 120, vx: (Math.random() - 0.5) * 40, vy: 40 + Math.random() * 40, t: 0, life: 1.4, col: winter ? '#ffffff' : ['#ff7ab8', '#ffd23f', '#9fe0ff'][i % 3], r: 2 });
  say(winter ? 'Зима! Озеро замерзло, по ньому можна йти, а зі снігу виросли сходинки' : 'Літо! Лід розтанув, а квіти стали сходинками', 2.8);
}

/* ===== Кільця-тарзанки ===== */
function ringPos(G) { for (const r of G.rings) { r.x = r.ax + Math.sin(r.th) * r.len; r.y = r.ay + Math.cos(r.th) * r.len; } }
function swingStep(P, dt) {
  const r = P.swing, ax = (In.right ? 1 : 0) - (In.left ? 1 : 0);
  if (ax) P.dir = ax;
  r.om += (-(GRAV / r.len) * Math.sin(r.th) + ax * 3.2 * Math.cos(r.th)) * dt; r.om *= 1 - 0.15 * dt;
  r.th += r.om * dt;
  if (Math.abs(r.th) > 1.45) { r.th = Math.sign(r.th) * 1.45; r.om = 0; }
  r.x = r.ax + Math.sin(r.th) * r.len; r.y = r.ay + Math.cos(r.th) * r.len;
  P.x = r.x - P.w / 2; P.y = r.y - 2; P.vx = 0; P.vy = 0; P.onGround = false; P.onMover = null;
  if (In.shootP) { P.charging = true; P.charge = 0; P.chargeSnd = false; }
  if (P.charging) { P.charge += dt; if (P.charge >= 0.55 && !P.chargeSnd) { P.chargeSnd = true; Snd.charged(); } }
  if (In.shootR && P.charging) { fire(P.charge >= 0.55); P.charging = false; P.charge = 0; }
  P.shootCd -= dt; if (P.inv > 0) P.inv -= dt; P.t += dt * 0.6;
  if (In.jumpP || P.hurtT > 0) {
    const v = r.om * r.len;
    P.swing = null; r.held = false; P.swingCd = 0.35;
    P.vx = clamp(v * Math.cos(r.th), -340, 340); P.vy = -v * Math.sin(r.th) - 200; P.launchT = Math.abs(P.vx) > 160 ? 0.9 : 0; P.cut = true; P.jumpBuf = 0;
    if (P.hurtT <= 0) Snd.jump();
  }
}

/* ===== Доміно: падає праворуч і лягає містком ===== */
function dominoAt(tx, ty) { return G.dominoes.find(d => d.state === 'stand' && d.x === tx && ty >= d.base - 3 && ty < d.base); }
function toppleDomino(d) {
  if (!d || d.state !== 'stand') return;
  d.state = 'fall'; d.a = 0; d.va = 1.2;
  for (let y = d.base - 3; y < d.base; y++) if (G.map[y * G.Wt + d.x] === 24) G.map[y * G.Wt + d.x] = 0;
  Snd.tone(300 + (d.i % 5) * 60, 0.12, 'triangle', 0.06, 200);
  if (!G.domHint) { G.domHint = true; say('Доміно падає й лягає містком!', 2.2); }
}
function updateDominoes(dt) {
  for (const d of G.dominoes) {
    if (d.state !== 'fall') continue;
    d.va += 9 * dt; d.a += d.va * dt;
    if (d.a > 0.9 && !d.passed) { d.passed = true; toppleDomino(G.dominoes.find(n => n.state === 'stand' && n.x > d.x && n.x - d.x <= 4)); }
    if (d.a >= Math.PI / 2) {
      d.a = Math.PI / 2; d.state = 'down';
      const y = d.base - 1;
      for (let x = d.x + 1; x <= d.x + 3; x++) if (tileAt(x, y) === 0) G.map[y * G.Wt + x] = 24;
      for (const e of G.enemies) if (!e.dead && e.x + e.w > (d.x + 1) * T && e.x < (d.x + 4) * T && e.y + e.h > y * T && e.y < d.base * T) defeat(e);
      Snd.bump(); G.parts.push({ k: 'puff', x: (d.x + 3) * T, y: d.base * T - 6, vx: 30, vy: 0, t: 0, life: 0.4, r: 7 });
    }
  }
}

function update9(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  // кенгуру
  for (const r of G.roos) {
    r.t += dt; if (r.poof > 0) r.poof -= dt;
    if (r.state === 'back' && r.t > 0.5) { r.state = 'home'; r.poof = 0.4; burst(r.x, r.gy - 16, 12, ['#ffb347', '#ffffff'], 110); }
    if (r.state === 'home' && !P.mount && !P.swing && !P.big && !(P.rooCd > 0) && Math.abs(pcx - r.x) < 18 && P.y + P.h > r.gy - 40 && P.y < r.gy) setMount(P, r);
  }
  if (P.rooCd > 0) P.rooCd -= dt;
  // далі кенгуру не скаче: зістрибує й чекає тут
  if (P.mount && P.onGround && G.rooStops.some(s => pcx > s && pcx < s + 2 * T)) { setMount(P, null); P.rooCd = 1; say('Далі кенгуру не скаче — він почекає тут. Хапайся за кільця!', 2.6); }
  // тотеми пір року: на тотем треба застрибнути згори, як на кнопку
  for (const tm of G.totems) {
    if (tm.glow > 0) tm.glow -= dt;
    const top = tm.gy - 54, on = P.vy >= 0 && P.y + P.h >= top - 4 && P.y + P.h <= top + 10 && Math.abs(pcx - tm.x) < 18;
    if (on && tm.armed) { tm.armed = false; tm.glow = 0.8; P.vy = -300; P.cut = true; P.onGround = false; toggleSeason(); }
    else if (!on && (P.onGround || Math.abs(pcx - tm.x) > 30)) tm.armed = true;
  }
  // кільця
  if (P.swingCd > 0) P.swingCd -= dt;
  for (const r of G.rings) {
    if (P.swing === r) continue;
    r.om += -(GRAV / r.len) * Math.sin(r.th) * dt; r.om *= 1 - 1.2 * dt; r.th += r.om * dt;
    r.x = r.ax + Math.sin(r.th) * r.len; r.y = r.ay + Math.cos(r.th) * r.len;
    if (!P.swing && !P.zip && !P.kite && !P.onGround && P.swingCd <= 0 && Math.abs(pcx - r.x) < 18 && Math.abs(P.y + 2 - r.y) < 22) {
      if (P.mount) setMount(P, null);
      P.swing = r; r.held = true;
      r.om = clamp((P.vx * Math.cos(r.th) - P.vy * Math.sin(r.th)) / r.len, -4, 4);
      P.charging = false; Snd.tone(700, 0.1, 'triangle', 0.05, 1000);
      if (!G.ringHint) { G.ringHint = true; say('Тримаєшся за кільце! Розгойдуйся вліво-вправо, а «Стрибок» — відпустити', 3); }
    }
  }
  // доміно: штовхнути, підійшовши зліва
  if (P.sideHit && In.right && tileAt(P.sideHit.tx, P.sideHit.ty) === 24) toppleDomino(dominoAt(P.sideHit.tx, P.sideHit.ty));
  updateDominoes(dt);
  // літери
  for (const l of G.letters) {
    if (l.got) continue; l.t += dt;
    if (l.x > P.x - 10 && l.x < P.x + P.w + 10 && l.y > P.y - 14 && l.y < P.y + P.h + 10) {
      l.got = true; G.points += 1; Snd.star(G.letters.filter(q => q.got).length + 2); burst(l.x, l.y, 10, ['#fff', '#ffe14d', '#ff9fd0'], 110);
      floatText(l.x, l.y - 12, l.ch, '#ff4fa3');
      if (G.letters.every(q => q.got)) { G.points += 10; G.rainbows++; Snd.rainbow(); burst(l.x, l.y, 24, RAINBOW, 170); say('Ти склала слово «' + G.word + '»! Веселкова зірочка +10', 3.2); }
      else if (!G.letterHint) { G.letterHint = true; say('Літера «' + l.ch + '»! Збери всі — і складеться слово', 2.4); }
    }
  }
}

/* ===== Кубик Кидайло: котиться, показує число й робить стільки, скільки випало ===== */
const DICE_FACES = [3, 5, 1, 4, 6, 2];
const DICE_SAY = ['', 'Випало 1! Кубик запаморочився — стріляй!', 'Випало 2! Кубик запаморочився — стріляй!', 'Випало 3! Летять 3 маленькі кубики', 'Випало 4! Летять 4 маленькі кубики', 'Випало 5! Великий стрибок — перестрибни хвилю', 'Випало 6! Два великі стрибки — перестрибуй хвилі'];
function tumbleStart(B) { B.state = 'tumble'; B.st = 0; B.hx0 = B.x; B.dir = G.P.x + G.P.w / 2 < B.x ? -1 : 1; }
Object.assign(BOSS2, {
  dice: L => ({ kind: 'dice', name: 'Кубик Кидайло', acc: 'Кубика Кидайла', win: ' Тепер він грає з друзями тільки чесно.', x: L.arena.x0 + 30 * T, gy: 10 * T, fy: 10 * T, y: 10 * T - 26, hw: 26, hh: 26, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, face: 6, seq: 0, rot: 0, hop: 0, hx0: 0, vy: 0, thrown: 0, said: 0, dizzyHint: false }),
});
function updateDiceBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; B.fy = B.gy; B.y = B.gy - 26; B.rot = 0; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; tumbleStart(B); B.hop = 0; Music.start('boss'); say('Кубик Кидайло: «Зіграймо! Що випаде — те й буде!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 40, right = A.x1 - 40, ht = angry ? 0.32 : 0.4;
  if (B.state === 'tumble') {
    const k = Math.min(1, B.st / ht);
    B.x = clamp(B.hx0 + B.dir * 48 * k, left, right); B.fy = B.gy - Math.sin(k * Math.PI) * 18; B.rot = B.dir * k * Math.PI / 2;
    if (k >= 1) {
      B.rot = 0; B.fy = B.gy; B.hop++; Snd.bump(); tumbleStart(B);
      if (B.hop >= 2 || Math.abs(pcx - B.x) < 70 || B.x <= left || B.x >= right) {
        B.hop = 0; B.state = 'show'; B.face = DICE_FACES[B.seq % 6]; B.seq++;
        Snd.seq(Array.from({ length: B.face }, (_, i) => i * 2), 660, 0.09, 'triangle', 0.07);
        floatText(B.x, B.fy - 70, String(B.face), '#ff4fa3');
        if (B.said < 6) { B.said++; say(DICE_SAY[B.face], 2.4); }
      }
    }
  } else if (B.state === 'show') {
    if (B.st > 0.8) {
      B.st = 0;
      if (B.face <= 2) B.state = 'dizzy';
      else if (B.face <= 4) { B.state = 'throw'; B.thrown = 0; }
      else { B.state = 'jump'; B.vy = -560; B.jumps = B.face === 6 ? 2 : 1; }
    }
  } else if (B.state === 'throw') {
    if (B.st > 0.28) {
      B.st = 0; B.thrown++;
      const d = pcx < B.x ? -1 : 1, kk = 0.6 + (B.thrown % 3) * 0.18;
      G.bolts.push({ kind: 'minidie', r: 7, x: B.x + d * 20, y: B.fy - 40, vx: clamp((pcx - B.x) / kk, -260, 260), vy: -380, g: 900, t: 0, n: B.thrown });
      Snd.tone(800 + B.thrown * 60, 0.08, 'square', 0.04);
      if (B.thrown >= B.face) { B.state = 'rest'; B.st = 0; }
    }
  } else if (B.state === 'jump') {
    B.vy += 1500 * dt; B.fy += B.vy * dt;
    if (B.vy > 0 && B.fy >= B.gy) {
      B.fy = B.gy; Snd.bump(); G.flash = Math.max(G.flash, 0.1);
      for (const d of [-1, 1]) G.bolts.push({ kind: 'wave', r: 7, x: B.x + d * 30, y: B.gy - 8, vx: d * (angry ? 190 : 160), vy: 0, t: 0 });
      B.jumps--; if (B.jumps > 0) { B.vy = -560; } else { B.state = 'rest'; B.st = 0; }
    }
  } else if (B.state === 'rest') {
    if (B.st > 0.5) tumbleStart(B);
  } else if (B.state === 'dizzy') {
    if (B.st > (angry ? 2.2 : 2.8)) tumbleStart(B);
  }
  B.y = B.fy - 26;
  const box = { x: B.x - 24, y: B.fy - 48, w: 48, h: 48 };
  if (overlap(P, box)) {
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (B.state === 'dizzy') { if (stomp) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else if (stomp && B.state !== 'jump') { P.vy = -430; P.cut = true; Snd.tink(); }
    else hurtPlayer(false);
  }
}
function armored9(s, B) {
  if (B.kind === 'dice' && B.state !== 'dizzy') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Кубик твердий! Стріляй, коли випаде 1 або 2 — тоді він запаморочиться', 2.8); }
    return true;
  }
  return false;
}
function resetBoss9(B) {
  if (B.kind === 'dice') { B.hop = 0; B.fy = B.gy; B.rot = 0; B.x = Math.max(B.x, G.arena.x0 + 14 * T); tumbleStart(B); }
}
