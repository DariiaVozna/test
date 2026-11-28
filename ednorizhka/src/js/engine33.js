'use strict';
/* ===== Частина 38 «Морські пригоди»: мушлі з перлинками, мушля-сурма, гачок-кішка, «Хто живе в морі?» і Акуленя Зубчик ===== */
Object.assign(TUNES, {
  pearlbay: { base: 587.33, ms: 200, n: [0, null, 4, 7, null, 9, 7, null, 4, null, 2, 4, null, 7, null, null, 5, null, 9, 12, null, 14, 12, null, 9, null, 7, 4, null, 0, null, null], b: [0, -5, -3, -7] },
  piratepier: { base: 440, ms: 165, n: [0, 0, 3, null, 5, 7, null, 5, 3, null, 0, null, 2, 3, 5, null, 7, 7, 10, null, 12, 10, null, 7, 5, null, 3, 2, 0, null, null, null], b: [0, -4, -2, -5] },
  coralreef: { base: 523.25, ms: 210, n: [0, 4, 7, null, 11, null, 9, 7, 4, null, 5, 9, 12, null, 11, 9, 7, null, 4, 7, 9, null, 7, 4, 2, null, 4, null, 0, null, null, null], b: [0, -3, -7, -5] },
  shipwreck: { base: 493.88, ms: 190, n: [0, null, 3, 5, 7, null, 5, 3, 0, null, 7, 8, 10, null, 8, 7, 5, null, 3, 5, 7, null, 3, 2, 0, null, null, 0, null, null, null, null], b: [0, -5, -3, -7] },
  sharkreef: { base: 554.37, ms: 175, n: [0, 7, 0, 7, 5, null, 3, 5, 0, 7, 0, 7, 10, null, 8, 7, 5, 12, 5, 12, 10, null, 8, 7, 5, 3, 2, 0, null, null, null, null], b: [0, -5, -3, -7] },
});
STICKERS.push(
  { id: 'pearlbay', k: 'pearl', name: 'Перлинка' },
  { id: 'piratepier', k: 'anchor38', name: 'Якір' },
  { id: 'coralreef', k: 'coral', name: 'Корал' },
  { id: 'shipwreck', k: 'chest38', name: 'Скриня зі скарбами' },
  { id: 'sharkreef', k: 'shark', name: 'Акуленя' },
);
const SEA_NOM = { fish: 'Рибка', crab: 'Краб', octopus: 'Восьминіжка', starfish: 'Морська зірка', seahorse: 'Морський коник', whale: 'Кит', turtle: 'Морська черепаха', jelly: 'Медуза' };
const CLAM_CLOSED = 2.0, CLAM_OPEN = 1.8, CONCH_RISE = 2, CONCH_HIGH = 9, CONCH_FALL = 2;
const HOOK_RANGE = 8 * T, HOOK_PULL = 420;

/* ===== Підготовка рівня ===== */
function initLevel33(G, L) {
  G.clams = (L.clams || []).map((c, i) => Object.assign({ open: false, op: 0, t: 0.6 + (i * 0.9) % 2.4, pearl: true, i, hintT: 0 }, c));
  G.pearlDone = false; G.clamHint = false;
  G.conches = (L.conches || []).map(c => Object.assign({ state: 'low', st: 0, zone: G.water[c.z], warned: false, hintT: 0 }, c));
  G.anchors = (L.anchors || []).map(a => Object.assign({}, a));
  G.P.hookPow = false; G.P.hook = null; G.P.hookCd = 0;
  initLevel34(G, L);
}

/* ===== Мушлі з перлинками: мушля то відкривається, то закривається ===== */
function updateClams(dt) {
  const P = G.P;
  for (const c of G.clams) {
    c.t -= dt; if (c.hintT > 0) c.hintT -= dt;
    if (c.t <= 0) { c.open = !c.open; c.t = c.open ? CLAM_OPEN : CLAM_CLOSED; if (c.open && c.pearl && Math.abs(c.x - (P.x + P.w / 2)) < 8 * T) Snd.tone(880, 0.06, 'sine', 0.03, 1320); }
    c.op += ((c.open ? 1 : 0) - c.op) * Math.min(1, dt * 9);
    if (!c.pearl) continue;
    const box = { x: c.x - 14, y: c.gy - 26, w: 28, h: 26 };
    if (!overlap(P, box)) continue;
    if (c.op > 0.7) {
      c.pearl = false; c.joy = 1.2; G.points += 3;
      floatText(c.x, c.gy - 30, '+3', '#ff8a3d'); burst(c.x, c.gy - 12, 14, ['#ffffff', '#ffe8f4', '#e8f4ff'], 120);
      Snd.seq([0, 7, 12, 16], 784, 0.05, 'triangle', 0.06);
      const n = G.clams.filter(q => !q.pearl).length;
      say('Перлинка! ' + n + ' з ' + G.clams.length, 1.8);
      if (n === G.clams.length && !G.pearlDone) {
        G.pearlDone = true;
        const st = { x: P.x + P.w / 2, y: P.y + 6, rainbow: true, got: false }; G.stars.push(st); collect(st);
        Snd.seq([0, 4, 7, 12, 16], 659.25, 0.08, 'triangle', 0.07); say('Усі перлинки зібрано! Тримай веселкову зірочку', 2.8);
      }
    } else if (!(c.hintT > 0)) {
      c.hintT = 4;
      if (!G.clamHint) { G.clamHint = true; say('Мушля закрита. Зачекай трохи: коли вона відкриється, перлинка твоя', 2.6); }
    }
  }
  for (const c of G.clams) if (c.joy > 0) c.joy -= dt;
}

/* ===== Мушля-сурма: покликала — і вода в лагуні піднімається ===== */
function updateConches(dt) {
  const P = G.P;
  for (const c of G.conches) {
    const z = c.zone, cz = z.conch, ease = k => k < 0.5 ? 2 * k * k : 1 - 2 * (1 - k) * (1 - k);
    c.st += dt;
    if (c.state === 'low') {
      z.y = cz.lo;
      if (overlap(P, { x: c.x - 14, y: c.gy - 28, w: 28, h: 28 })) {
        c.state = 'rise'; c.st = 0; c.warned = false; c.toot = 1;
        Snd.seq([0, 0, 7, 12], 196, 0.16, 'sawtooth', 0.05); Snd.seq([0, 7], 392, 0.24, 'triangle', 0.05);
        say(G.conchHint ? 'Ту-ту-у! Вода піднімається!' : 'Ту-ту-у! Мушля-сурма покликала воду — лагуна наповнюється. Пливи нагору!', 2.8); G.conchHint = true;
      }
    } else if (c.state === 'rise') {
      z.y = cz.lo + (cz.hi - cz.lo) * ease(Math.min(1, c.st / CONCH_RISE));
      if (Math.random() < dt * 20) bubbles(z.x0 + Math.random() * (z.x1 - z.x0), z.y + 30 + Math.random() * 60, 1);
      if (c.st >= CONCH_RISE) { c.state = 'high'; c.st = 0; }
    } else if (c.state === 'high') {
      z.y = cz.hi;
      if (c.st > CONCH_HIGH - 2 && !c.warned) { c.warned = true; if (waterAt(P.x + P.w / 2, P.y + P.h / 2) === z) say('Вода скоро спаде! Швидше пливи нагору', 2); }
      if (c.st >= CONCH_HIGH) { c.state = 'fall'; c.st = 0; }
    } else if (c.state === 'fall') {
      z.y = cz.hi + (cz.lo - cz.hi) * ease(Math.min(1, c.st / CONCH_FALL));
      if (c.st >= CONCH_FALL) { c.state = 'low'; c.st = 0; }
    }
    if (c.toot > 0) c.toot -= dt;
    // вода низька, а єдиноріжка в лагуні біля скелі — підказуємо про мушлю
    if (c.hintT > 0) c.hintT -= dt;
    else if (c.state === 'low' && (c.cliff != null ? c.cliff : (c.cliff = solid(tileAt(Math.floor((z.x1 + 4) / T), Math.floor(z.conch.hi / T) + 1)))) && waterAt(P.x + P.w / 2, P.y + P.h / 2) === z && P.x + P.w > z.x1 - 2 * T) { c.hintT = 6; say('Скеля зависока! Доторкнися до мушлі-сурми на березі — і вода підніметься', 2.8); }
  }
}

/* ===== Гачок-кішка: «Ріг» біля золотого кільця — і мотузка підтягує ===== */
function findAnchor38(P, except, minDx) {
  const cx = P.x + P.w / 2, cy = P.y + P.h / 2; let best = null, bd = 1e9;
  for (const a of G.anchors) {
    if (a === except) continue;
    const dx = (a.x - cx) * P.dir, dy = a.y - cy;
    if (dx < (minDx == null ? -T : minDx) || dx > HOOK_RANGE || dy < -HOOK_RANGE || dy > 2 * T) continue;
    const d = Math.hypot(dx, dy); if (d < bd) { bd = d; best = a; }
  }
  return best;
}
function startHook(P, a) {
  P.hook = { a, x: a.x, y: a.y, phase: 'throw', t: 0, fx: P.x + P.w / 2 + P.dir * 10, fy: P.y + 6 };
  P.charging = false; P.charge = 0; P.hang = null; P.vine = null; P.cling = null;
  Snd.tone(900, 0.08, 'triangle', 0.05, 1400);
  if (!G.hookHint) { G.hookHint = true; say('Висиш на кільці! «Стрибок» — відпустити, «Ріг» — до наступного кільця', 2.6); }
}
function hookStep(P, dt) {
  const h = P.hook, ax = (In.right ? 1 : 0) - (In.left ? 1 : 0);
  h.t += dt; P.shootCd -= dt; if (P.inv > 0) P.inv -= dt;
  P.onGround = false; P.onMover = null; P.vx = 0; P.vy = 0;
  if (P.hurtT > 0) { P.hook = null; P.hookCd = 0.4; return; }
  if (h.phase === 'throw') { if (h.t >= 0.12) { h.phase = 'pull'; h.t = 0; Snd.tone(600, 0.1, 'square', 0.03, 300); } return; }
  const tx = h.x - P.w / 2, ty = h.y + 10;
  if (h.phase === 'pull') {
    const dx = tx - P.x, dy = ty - P.y, d = Math.hypot(dx, dy), sp = HOOK_PULL * dt;
    if (Math.abs(dx) > 2) P.dir = dx > 0 ? 1 : -1;
    if (d <= sp) { P.x = tx; P.y = ty; h.phase = 'hang'; h.t = 0; Snd.tone(1200, 0.05, 'triangle', 0.04); }
    else {
      // летимо прямо до кільця; якщо заважає палуба чи стеля — ковзаємо вздовж неї
      const sx = dx / d * sp, sy = dy / d * sp;
      if (!boxSolid(P.x + sx, P.y + sy, P.w, P.h)) { P.x += sx; P.y += sy; }
      else if (Math.abs(dx) > 1 && !boxSolid(P.x + Math.sign(dx) * sp, P.y, P.w, P.h)) P.x += Math.sign(dx) * sp;
      else if (Math.abs(dy) > 1 && !boxSolid(P.x, P.y + Math.sign(dy) * sp, P.w, P.h)) P.y += Math.sign(dy) * sp;
      else { P.hook = null; P.hookCd = 0.3; return; }
    }
    P.t += dt * 0.6;
    return;
  }
  // висимо під кільцем і трохи гойдаємося
  if (ax) P.dir = ax;
  const sw = Math.sin(h.t * 2.4) * 2; P.x = boxSolid(tx + sw, ty, P.w, P.h) ? tx : tx + sw; P.y = ty;
  if (In.jumpP) { P.hook = null; P.hookCd = 0.25; P.vy = -330; P.vx = (ax || P.dir) * SPEED; P.cut = true; P.jumpBuf = 0; Snd.jump(); return; }
  if (In.shootP) {
    const a = findAnchor38(P, h.a, T);
    if (a) { startHook(P, a); return; }
    fire(false);
  }
  P.t += dt * 0.2;
}
function updateHook(dt) {
  const P = G.P;
  if (P.hookCd > 0) P.hookCd -= dt;
  if (!P.hookPow || P.hook || !In.shootP || P.hookCd > 0) return;
  if (P.inCannon || P.zip || P.kite || P.swing || P.bub || P.hotair || P.plane || P.hang || P.flip || P.sled) return;
  const a = findAnchor38(P);
  if (a) startHook(P, a);
}

function update33(dt) {
  updateClams(dt);
  updateConches(dt);
  updateHook(dt);
  update34(dt);
}

/* ===== Бонус «Гачок-кішка» ===== */
POW17.hook = 1;
const powerUp17base38 = powerUp17;
powerUp17 = function (P, p) {
  if (p.k === 'hook') { P.hookPow = true; Snd.seq([0, 4, 7, 12], 523, 0.07, 'triangle', 0.07); say('Гачок-кішка! Біля золотого кільця натисни «Ріг» — і мотузка підтягне тебе до нього. Діє до кінця рівня', 3.6); return; }
  powerUp17base38(P, p);
};

/* ===== «Хто живе в морі?» ===== */
const quizMsg37 = quizMsg;
quizMsg = function (q, what) {
  if (q.kind === 'sea') return {
    hint: 'Хто з них живе в морі? Стукни головою знизу кубик із морською тваринкою',
    ok: 'Правильно! ' + SEA_NOM[q.ans] + ' живе в морі. Двері відчинилися',
    bad: 'Ой, ні. Ця тваринка живе на суші. Пошукай того, хто плаває в морі',
  }[what];
  return quizMsg37(q, what);
};

/* ===== Акуленя Зубчик: вистрибує з басейну на пісок, а там безпорадно бовтається ===== */
BOSS2.shark = L => {
  const z = L.water.find(w => w.x0 >= L.arena.x0 && w.x1 <= L.arena.x1) || { x0: L.arena.x0 + 8 * T, x1: L.arena.x0 + 18 * T, y: 8 * T + 6 };
  return { kind: 'shark', name: 'Акуленя Зубчик', acc: 'Акуленя Зубчика', win: ' Тепер Зубчик катає малят на спинці й щоранку чистить зубки.', x: (z.x0 + z.x1) / 2, gy: 10 * T, sy: z.y, px0: z.x0, px1: z.x1, y: z.y + 24, hw: 30, hh: 16, hp: 24, max: 24, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, n: 0, rot: 0, vx: 0, vy: 0, tx: 0, side: -1 };
};
// кут для малюнка: носик дивиться туди, куди летить (з урахуванням дзеркала, коли пливе ліворуч)
function sharkAng(vx, vy) { let a = Math.atan2(vy, vx); if (vx < 0) a -= Math.PI; if (a < -Math.PI) a += TAU; return a; }
function sharkBeach(B, side) {
  const A = G.arena;
  return side < 0 ? [A.x0 + 2 * T + 20, B.px0 - 30] : [B.px1 + 30, B.px1 + 9 * T];
}
function updateSharkBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena, pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  const under = B.sy + 26, edge = s => s < 0 ? B.px0 + 28 : B.px1 - 28;
  if (B.dead) {
    B.deadT += dt; B.state = 'happy';
    const hx = (B.px0 + B.px1) / 2;
    B.x += (hx - B.x) * Math.min(1, dt * 2); B.y += (B.sy + 6 + Math.sin(B.t * 3) * 3 - B.y) * Math.min(1, dt * 3); B.rot *= 0.9;
    return;
  }
  if (!G.bossActive) {
    B.y = under; B.x = (B.px0 + B.px1) / 2 + Math.sin(B.t * 0.8) * 60; B.dir = Math.cos(B.t * 0.8) > 0 ? 1 : -1;
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'swim'; B.st = 0; Music.start('boss'); G.flash = 0.3; say('Акуленя Зубчик: «Хап-хап! Хто це на моєму пляжі?»', 2.8); }
    return;
  }
  B.st += dt;
  const inPool = waterAt(pcx, P.y + P.h / 2) && pcx > B.px0 && pcx < B.px1;
  if (B.state === 'swim') {
    B.y += (under - B.y) * Math.min(1, dt * 4); B.rot *= 0.85;
    const sp = angry ? 120 : 90;
    if (inPool) { B.dir = pcx > B.x ? 1 : -1; B.x += B.dir * sp * 1.4 * dt; }
    else { B.x += B.dir * sp * dt; if (B.x > B.px1 - 34) B.dir = -1; if (B.x < B.px0 + 34) B.dir = 1; }
    B.x = Math.max(B.px0 + 30, Math.min(B.px1 - 30, B.x));
    if (inPool && overlap(P, { x: B.x - 28, y: B.y - 16, w: 56, h: 30 })) { hurtPlayer(false); if (P.hurtT > 0) P.vy = -460; }
    if (B.st > (angry ? 1.8 : 2.4) && !inPool) { B.st = 0; B.state = angry && B.n % 2 === 1 ? 'spout' : 'aim'; B.side = pcx < (B.px0 + B.px1) / 2 ? -1 : 1; B.shots = 0; }
  } else if (B.state === 'spout') {
    B.y += (B.sy + 4 - B.y) * Math.min(1, dt * 5); B.dir = pcx > B.x ? 1 : -1;
    if (B.st > 0.35 + B.shots * 0.35 && B.shots < 3) {
      B.shots++;
      const tt = 0.95, dx = Math.max(-230, Math.min(230, (pcx - B.x) / tt));
      G.bolts.push({ kind: 'squirt', x: B.x + B.dir * 10, y: B.sy - 10, vx: dx, vy: -360, g: 760, r: 6, t: 0 });
      Snd.splash();
    }
    if (B.st > 1.5) { B.state = 'aim'; B.st = 0; B.side = pcx < (B.px0 + B.px1) / 2 ? -1 : 1; }
  } else if (B.state === 'aim') {
    const [b0, b1] = sharkBeach(B, B.side);
    B.tx = Math.max(b0, Math.min(b1, pcx));
    const ex = edge(B.side); B.dir = B.side;
    B.x += Math.sign(ex - B.x) * Math.min(Math.abs(ex - B.x), 220 * dt);
    B.y += (B.sy + 8 - B.y) * Math.min(1, dt * 5);
    if (!G.sharkHint) { G.sharkHint = true; say('Акуленя цілиться! Тінь на піску показує, куди воно стрибне. Відбіжи!', 2.8); }
    if (B.st > (angry ? 0.8 : 1.05)) {
      B.state = 'leap'; B.st = 0;
      const tf = 0.95, y0 = B.sy, y1 = B.gy - 16;
      B.lx0 = B.x; B.ly0 = y0; B.vx = (B.tx - B.x) / tf; B.vy = (y1 - y0 - 0.5 * 900 * tf * tf) / tf; B.tf = tf; B.y = y0;
      Snd.splash(); burst(B.x, B.sy, 14, ['#ffffff', '#bfefff'], 150);
    }
  } else if (B.state === 'leap') {
    const k = Math.min(B.st, B.tf);
    B.x = B.lx0 + B.vx * k; B.y = B.ly0 + B.vy * k + 450 * k * k; B.rot = sharkAng(B.vx, B.vy + 900 * k) * 0.6; B.dir = B.vx >= 0 ? 1 : -1;
    if (overlap(P, { x: B.x - 26, y: B.y - 14, w: 52, h: 28 })) hurtPlayer(false);
    if (B.st >= B.tf) {
      B.state = 'beached'; B.st = 0; B.hpB = B.hp; B.y = B.gy - 16; B.rot = 0;
      Snd.bump(); burst(B.x, B.gy - 2, 16, ['#ffe2a8', '#fff2cc', '#e2b56d'], 140); G.flash = 0.12;
      say(G.beachHint ? 'Акуленя на піску!' : 'Ой-ой! Акуленя застрягло на піску! Стріляй або стрибай на нього, поки воно не повернулося у воду', 3); G.beachHint = true;
    }
  } else if (B.state === 'beached') {
    B.y = B.gy - 16 - Math.abs(Math.sin(B.st * 7)) * 5; B.rot = Math.sin(B.st * 7) * 0.12;
    if (B.st > (angry ? 3.0 : 3.4) || B.hpB - B.hp >= 8) {
      B.state = 'back'; B.st = 0; B.lx0 = B.x; B.ly0 = B.y;
      const ex = B.side < 0 ? B.px0 + 44 : B.px1 - 44, tf = 0.7; B.vx = (ex - B.x) / tf; B.vy = (under - B.y - 0.5 * 900 * tf * tf) / tf; B.tf = tf; B.dir = B.vx >= 0 ? 1 : -1;
      Snd.boing();
    }
    const box = { x: B.x - 28, y: B.y - 16, w: 56, h: 30 };
    if (overlap(P, box) && P.vy > 40 && P.y + P.h - box.y < 18) { hitBoss(3); P.vy = -480; P.cut = true; }
  } else if (B.state === 'back') {
    const k = Math.min(B.st, B.tf);
    B.x = B.lx0 + B.vx * k; B.y = B.ly0 + B.vy * k + 450 * k * k; B.rot = sharkAng(B.vx, B.vy + 900 * k) * 0.5;
    if (B.st >= B.tf) { B.state = 'swim'; B.st = 0; B.n++; B.y = under; B.rot = 0; Snd.splash(); burst(B.x, B.sy, 14, ['#ffffff', '#bfefff'], 150); }
  }
}
SHOOTABLE.squirt = 1;
const armored19base38 = armored19;
armored19 = function (s, B) {
  if (B.kind === 'shark') {
    if (B.state === 'beached') { if (B.hpB - B.hp >= 8) { Snd.tink(); s.life = 0; return true; } return false; }
    Snd.tink(); s.life = 0;
    if (!B.armHint) { B.armHint = true; say('Акуленя у воді, туди постріл не дістане. Чекай, поки воно застрибне на пісок!', 2.8); }
    return true;
  }
  return armored19base38(s, B);
};
const resetBoss19base38 = resetBoss19;
resetBoss19 = function (B) {
  if (B.kind === 'shark') { if (B.state !== 'beached') { B.state = 'swim'; B.st = 0; B.y = B.sy + 26; B.rot = 0; } return; }
  resetBoss19base38(B);
};
