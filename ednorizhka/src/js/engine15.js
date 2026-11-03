'use strict';
/* ===== Частина 19: лелеки-перевізники, пого-стрибунець, насоси й надувні мости, хмаринкова майстерня, Гусениця Ненажерка ===== */
Object.assign(TUNES, {
  storks: { base: 587.33, ms: 200, n: [0, null, 4, 7, 9, null, 7, null, 4, null, 2, null, 0, null, null, null, 5, null, 9, 12, 14, null, 12, null, 9, null, 7, null, 4, null, null, null], b: [0, -5, -3, -7] },
  pogopark: { base: 659.25, ms: 160, n: [0, 7, 0, 7, 4, 9, 4, 9, 5, 12, 5, 12, 7, null, 12, null, 0, 7, 0, 7, 4, 11, 4, 11, 2, 9, 7, 5, 4, null, null, null], b: [0, -5, -3, -7] },
  inflatables: { base: 523.25, ms: 180, n: [0, 4, 7, null, 12, null, 7, null, 9, 5, 9, null, 12, null, null, null, 7, 4, 7, null, 11, null, 7, null, 5, 2, 5, null, 0, null, null, null], b: [0, -5, -7, -5] },
  cloudshop: { base: 698.46, ms: 210, n: [0, null, 4, null, 7, null, 11, null, 12, null, 7, null, 4, null, null, null, 2, null, 5, null, 9, null, 12, null, 14, null, 12, null, 9, null, null, null], b: [0, -5, -3, -7] },
  cabbage: { base: 587.33, ms: 190, n: [0, 2, 4, null, 7, null, 4, null, 5, 7, 9, null, 12, null, 9, null, 7, 5, 4, null, 2, null, 4, null, 0, null, -3, null, 0, null, null, null], b: [0, -5, -3, -7] },
});
Object.assign(WALKERS, { ladybug: 1 });
Object.assign(HOVER, { butterfly: 1 });
Object.assign(SHOOTABLE, { leaf: 1 });
Object.assign(THORN_MSG, { pogopark: 'Ой, колючки! Візьми пого-стрибунець — на ньому по колючках можна скакати' });

function spawnEnemy15(e, b, hover, g) {
  switch (e.k) {
    case 'ladybug': return g(22, 14, { speed: 30 });
    case 'butterfly': return hover(22, 18, 3, 0.9, 10);
  }
  return null;
}
function updateEnemy15(e, dt) { return false; }

/* ===== Підготовка рівня ===== */
function initLevel15(G, L) {
  const P = G.P; P.pogoT = 0; P.cloudN = 0; P.cloudFill = false; P.lastPump = null;
  G.bridges19 = (L.bridges19 || []).map(b => Object.assign({ on: false, t: 0 }, b, { tiles: b.tiles.map(q => q.slice()) }));
  for (const m of G.movers) if (m.pump) { m.level = 0; m.press = 0; m.target = m.lift != null ? G.movers[m.lift] : G.bridges19[m.bridge]; }
  for (const m of G.movers) if (m.lift19) { m.level = 0; m.wait = 0; }
  for (const m of G.movers) if (m.stork) { m.state = 'wait'; m.seg = 0; m.on = 0; m.off = 0; m.flap = 0; }
}

/* ===== Бонуси: пого-стрибунець і пляшечка з хмаринками ===== */
function powerUp15(P, p) {
  if (p.k === 'pogo') { P.pogoT = 25; say(G.pogoHint ? 'Знову пого-стрибунець!' : 'Пого-стрибунець! Ти стрибаєш сама. Тримай «Стрибок» — скачеш вище, а колючки тепер не страшні', 3.2); G.pogoHint = true; }
  else { P.cloudN = 3; P.cloudFill = true; say(G.cloudHint ? 'Ще три хмаринки!' : 'Пляшечка з хмаринками! У стрибку тисни «Ріг» — під ногами з\'явиться хмаринка', 3.2); G.cloudHint = true; }
}

/* ===== Лелека-перевізник: стань йому на спину — і він перенесе ===== */
function storkPoint(m, i) { const p = m.path[i]; return [p[0] - m.w / 2, p[1]]; }
function updateStork(m, dt) {
  const P = G.P, on = P.onMover === m;
  m.flap += dt * (m.state === 'wait' || m.state === 'arrive' ? 2 : 9);
  let nx = m.x, ny = m.y;
  if (m.state === 'wait') {
    if (on) { m.on += dt; if (m.on > 0.4) { m.state = 'fly'; m.seg = 0; Snd.seq([0, 7, 12], 523, 0.08, 'triangle', 0.07); if (!G.storkHint) { G.storkHint = true; say('Лелека несе тебе! Можна зістрибнути в будь-який момент', 2.6); } } }
    else m.on = 0;
  } else if (m.state === 'fly' || m.state === 'back') {
    const back = m.state === 'back', last = m.path.length - 1;
    const ti = back ? last - 1 - m.seg : m.seg + 1;
    const [tx, ty] = storkPoint(m, ti);
    const dx = tx - m.x, dy = ty - m.y, d = Math.hypot(dx, dy), sp = (back ? 110 : 85) * dt;
    if (d <= sp) { nx = tx; ny = ty; m.seg++; if (m.seg >= last) { m.state = back ? 'wait' : 'arrive'; m.seg = 0; m.off = 0; m.on = 0; } }
    else { nx = m.x + dx / d * sp; ny = m.y + dy / d * sp; }
    m.dir = dx >= 0 ? (back ? -1 : 1) : (back ? 1 : -1);
    if (Math.abs(dx) > 1) m.face = Math.sign(dx);
  } else if (m.state === 'arrive') {
    if (on) m.off = 0; else { m.off += dt; if (m.off > 2.5) { m.state = 'back'; m.seg = 0; } }
  }
  m.dx = nx - m.x; m.dy = ny - m.y; m.x = nx; m.y = ny;
}

/* ===== Насоси: стрибай на ручку — накачуєш ===== */
function pressPump(m) {
  m.press = 0.25;
  if (m.level >= 3) return;
  m.level++; Snd.tone(300 + m.level * 120, 0.18, 'square', 0.04, 500 + m.level * 150);
  burst(m.x + m.w / 2, m.y + 4, 6, ['#ffffff', '#ff9fd0'], 70);
  if (!G.pumpHint) { G.pumpHint = true; say('Насос! Стрибни на ручку тричі — і накачаєш', 2.6); }
  if (m.level >= 3) {
    const tg = m.target;
    Snd.seq([0, 4, 7, 12], 523, 0.07, 'triangle', 0.08);
    if (tg.lift19) { tg.level = 3; say('Кулька надулася! Стань у кошик — і вона підніме тебе', 2.6); }
    else { tg.on = true; tg.t = 10; for (const [tx, ty] of tg.tiles) G.map[ty * G.Wt + tx] = 42; say('Надувний місток готовий! Біжи, поки не здувся', 2.6); }
  }
}
function updatePumps(P, dt) {
  const cur = P.onMover && P.onMover.pump ? P.onMover : null;
  if (cur && cur !== P.lastPump) pressPump(cur);
  P.lastPump = cur;
  for (const m of G.movers) if (m.pump) {
    if (m.press > 0) m.press -= dt;
    // коли місток здувся або кулька спустилася — насос знову порожній
    const tg = m.target;
    if (m.level >= 3 && ((tg.lift19 && tg.level === 0) || (!tg.lift19 && !tg.on))) m.level = 0;
  }
  for (const b of G.bridges19) if (b.on) {
    b.t -= dt;
    if (b.t <= 0) { b.on = false; for (const [tx, ty] of b.tiles) G.map[ty * G.Wt + tx] = 41; Snd.tone(500, 0.6, 'sine', 0.04, 150); }
  }
}
function updateLift19(m, dt) {
  const P = G.P, on = P.onMover === m;
  let ny = m.y;
  if (m.level >= 3) {
    if (on && m.y > m.yTop + 0.5) { ny = Math.max(m.yTop, m.y - 70 * dt); m.wait = 0; }
    else if (!on) { m.wait += dt; if (m.wait > 2 && m.y < m.yBot) ny = Math.min(m.yBot, m.y + 70 * dt); if (m.wait > 2 && m.y >= m.yBot - 0.5 && m.y !== m.yTop) { m.level = 0; ny = m.yBot; Snd.tone(500, 0.6, 'sine', 0.04, 150); } }
  } else ny = m.yBot;
  m.dx = 0; m.dy = ny - m.y; m.y = ny;
}

/* ===== Хмаринки під ногами ===== */
function updateClouds19(P, dt) {
  if (P.cloudN > 0 && !P.onGround && In.shootP && !P.hotair && !P.bub && !P.hang) {
    P.cloudN--; P.charging = false;
    const x = P.x + P.w / 2 - T, y = P.y + P.h + 1;
    G.movers.push({ special15: true, tmpCloud: true, x, y, bx: x, by: y, w: 2 * T, dx: 0, dy: 0, life: 4, ax: 0, ay: 0, period: 1 });
    if (P.vy > 0) P.vy = Math.min(P.vy, 60);
    Snd.tone(700, 0.2, 'sine', 0.06, 1100); burst(P.x + P.w / 2, y + 6, 10, ['#ffffff', '#e8eeff'], 80);
  }
}

/* ===== Пого-стрибунець ===== */
function updatePogo(P, dt) {
  if (P.pogoT > 0) {
    P.pogoT -= dt; if (P.pogoT <= 0) { P.pogoT = 0; say('Пого-стрибунець зламався. Шукай новий!', 2); }
    const wz = waterAt(P.x + P.w / 2, P.y + P.h / 2);
    if (P.onGround && !wz && !P.hotair && !P.sled) {
      P.vy = -(In.jump ? 760 : 560); P.onGround = false; P.onMover = null; P.cut = true; P.coyote = 0;
      Snd.tone(300, 0.12, 'triangle', 0.06, 700);
      G.parts.push({ k: 'puff', x: P.x + P.w / 2, y: P.y + P.h, vx: 0, vy: 0, t: 0, life: 0.3, r: 5 });
    }
  }
  // пого-стрибунець підхоплюємо й тоді, коли пролітаємо просто над ним
  for (const p of G.powers) if (p.k === 'pogo' && !p.got && Math.abs(P.x + P.w / 2 - p.x) < 16 && P.y + P.h < p.y + 10) { p.got = true; p.reT = 0; Snd.power(); burst(p.x, p.y, 16, RAINBOW, 140); powerUp15(P, p); }
  for (const p of G.powers) if ((p.k === 'pogo' || p.k === 'cloud') && p.got) { p.reT = (p.reT || 0) + dt; if (p.reT > 4 && Math.abs(P.x + P.w / 2 - p.x) > 60) { p.got = false; p.reT = 0; } }
}

function update15(dt) {
  const P = G.P;
  updatePogo(P, dt);
  updatePumps(P, dt);
  updateClouds19(P, dt);
}
function updatePlatform15(m, dt) {
  if (m.stork) return updateStork(m, dt);
  if (m.lift19) return updateLift19(m, dt);
  if (m.tmpCloud) { m.dx = 0; m.dy = 0; if (m.state !== 'gone') { m.life -= dt; if (m.life <= 0) { m.state = 'gone'; burst(m.x + m.w / 2, m.y + 6, 8, ['#ffffff'], 60); } } return; }
  if (m.pump) { m.dx = 0; m.dy = 0; return; }
}
function respawn15(P) { P.pogoT = 0; }

/* ===== Гусениця Ненажерка: повзе з капусти в капусту, плюється листям, а тоді жує листочок ===== */
const CAT_SEGS = 6, CAT_GAP = 22;
Object.assign(BOSS2, {
  caterpillar: L => ({ kind: 'caterpillar', name: 'Гусениця Ненажерка', acc: 'Гусеницю Ненажерку', win: ' Вона перетворилася на метелика й роздає зірочки всім довкола.', x: L.arena.x1 - 2 * T, gy: 10 * T, fy: 10 * T, y: 10 * T - 16, hw: 16, hh: 16, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, rear: 0, spits: 0, stops: 0, hideX: 99999, hideSide: 'R' }),
});
function catSegs(B) {
  // сегменти тіла йдуть слідом за головою на відстані CAT_GAP один від одного
  const out = [];
  for (let i = 1; i <= CAT_SEGS; i++) { const x = B.x - B.dir * i * CAT_GAP; out.push({ x, y: B.gy - 13 - Math.max(0, Math.sin(B.t * 6 - i * 0.9)) * (B.state === 'crawl' ? 7 : 2), r: 13, shown: B.state !== 'gone' && (B.hideSide === 'L' ? x > B.hideX : x < B.hideX) }); }
  return out;
}
function updateCaterpillarBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'emerge'; B.st = 0; B.x = A.x1 - 20; Music.start('boss'); say('Гусениця Ненажерка: «Ням-ням! Зірочки — найсолодші листочки! Не віддам!»', 2.8); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const angry = B.hp <= B.max / 2, left = A.x0 + 30, right = A.x1 - 30;
  if (B.state === 'emerge') {
    // вилазить із правої капусти
    B.dir = -1; B.x -= 80 * dt; B.hideX = right + 6; B.hideSide = 'R';
    if (B.x < right - 40) { B.state = 'crawl'; B.st = 0; B.stops = 0; }
  } else if (B.state === 'crawl') {
    B.x += B.dir * (angry ? 100 : 82) * dt;
    // зупиняється між хмарками, щоб до голови можна було дістати з землі
    if (B.stops === 0 && B.x < A.x0 + (angry ? 27 : 25.5) * T) { B.state = 'rear'; B.st = 0; B.spits = 0; B.stops = 1; }
    if (B.x < left - 10) { B.state = 'burrow'; B.st = 0; B.hideX = left - 6; B.hideSide = 'L'; Snd.tone(200, 0.4, 'sine', 0.05, 90); }
    if (!B.crawlHint && B.st > 0.5) { B.crawlHint = true; say('Гусениця повзе! Застрибни на хмарку або скачи їй по спинці', 2.6); }
  } else if (B.state === 'rear') {
    B.rear = Math.min(1, B.rear + dt * 3);
    if (B.st > 0.7) {
      B.st = 0; B.spits++;
      const pcx = P.x + P.w / 2, tf = 0.9, vx = clamp((pcx - B.x) / tf, -260, 260), vy = (-(B.gy - 52) + (P.y + P.h - 8) - 0.5 * 800 * tf * tf) / tf;
      G.bolts.push({ kind: 'leaf', r: 7, x: B.x + B.dir * 10, y: B.gy - 52, vx, vy, g: 800, t: 0 });
      Snd.tone(700, 0.1, 'triangle', 0.05, 400);
      if (B.spits >= (angry ? 3 : 2)) { B.state = 'munch'; B.st = 0; }
    }
  } else if (B.state === 'munch') {
    B.rear = Math.max(0, B.rear - dt * 3);
    if (!B.munchHint && B.st > 0.3) { B.munchHint = true; say('Гусениця жує листочок і нічого не бачить! Стріляй їй у голову', 2.6); }
    if (B.st > (angry ? 2.5 : 3)) { B.state = 'crawl'; B.st = 0; }
  } else if (B.state === 'burrow') {
    // пірнає в ліву капусту, а за мить вилазить із правої
    B.x += B.dir * 110 * dt;
    if (B.x < left - 10 - (CAT_SEGS + 1) * CAT_GAP) { B.state = 'gone'; B.st = 0; }
  } else if (B.state === 'gone') {
    B.x = right + 60;
    if (B.st > 0.8) { B.state = 'emerge'; B.st = 0; B.x = right + 20; B.hideX = right + 6; B.hideSide = 'R'; }
  }
  if (B.state !== 'rear') B.rear = Math.max(0, B.rear - dt * 2);
  B.y = B.gy - 16 - B.rear * 26;
  // зіткнення: зверху — відскок, збоку — боляче
  const headShown = B.state !== 'gone' && (B.hideSide === 'L' ? B.x > B.hideX : B.x < B.hideX);
  B.headShown = headShown;
  const parts = catSegs(B).filter(s => s.shown);
  if (headShown) parts.unshift({ x: B.x, y: B.y, r: 16, head: true });
  for (const s of parts) {
    const box = { x: s.x - s.r + 2, y: s.y - s.r, w: s.r * 2 - 4, h: s.r * 2 };
    if (!overlap(P, box)) continue;
    const stomp = P.vy > 40 && P.y + P.h - box.y < 16;
    if (stomp) {
      if (s.head && B.state === 'munch') { hitBoss(2); P.vy = -480; P.cut = true; }
      else { P.vy = -440; P.cut = true; Snd.boing(); }
    } else hurtPlayer(false);
    break;
  }
}
function armored15(s, B) {
  if (B.kind === 'caterpillar' && B.state !== 'munch') {
    Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
    if (!B.armHint) { B.armHint = true; say('Гусениця ховає голову! Стріляй, коли вона жуватиме листочок', 2.6); }
    return true;
  }
  return false;
}
function resetBoss15(B) {
  if (B.kind === 'caterpillar') { B.state = 'gone'; B.st = 0; B.rear = 0; B.hideSide = 'R'; B.hideX = G.arena.x1 - 24; }
}
