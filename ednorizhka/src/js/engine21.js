'use strict';
/* ===== Частина 26 «Базар і хованки»: список покупок, друзі в кущах, двері-фігури й Хом'ячок Жуйко ===== */
Object.assign(TUNES, {
  fruitmarket: { base: 587.33, ms: 170, n: [0, 4, 7, 4, 9, 7, 4, null, 2, 5, 9, 5, 7, null, null, null, 0, 4, 7, 12, 11, 9, 7, null, 5, 4, 2, 4, 0, null, null, null], b: [0, -5, -3, -7] },
  hideforest: { base: 523.25, ms: 190, n: [0, null, 7, null, 4, 5, 7, null, 9, null, 7, null, 5, 4, 2, null, 0, null, 7, null, 4, 5, 7, null, 12, null, 11, 9, 7, null, null, null], b: [0, -5, -3, -7] },
  shapetown: { base: 659.25, ms: 165, n: [0, 7, 4, 7, 0, 7, 4, 7, 2, 9, 5, 9, 2, 9, 5, 9, 4, 11, 7, 11, 4, 11, 7, 11, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
  bigshop: { base: 698.46, ms: 160, n: [0, 4, 7, 9, 7, 4, 0, null, 2, 5, 9, 11, 9, 5, 2, null, 4, 7, 11, 12, 11, 7, 4, null, 12, 11, 9, 7, 5, 4, 2, null], b: [0, -5, -3, -7] },
  hamsterhole: { base: 493.88, ms: 185, n: [0, 3, 7, 3, 0, null, 5, 8, 12, 8, 5, null, 7, 10, 14, 10, 7, null, 5, null, 3, null, 2, null, 0, null, null, null, 7, null, null, null], b: [0, -5, -2, -7] },
});
const ITEM_UA = { apple: 'яблуко', pear: 'груша', banana: 'банан', carrot: 'морква', cheese: 'сир', bread: 'хліб', milk: 'молоко', grapes: 'виноград' };
const PAL_UA = { bunny: 'Зайчик', hedgehog: 'Їжачок', fox: 'Лисичка', squirrel: 'Білочка', mouse: 'Мишка', duck: 'Каченя' };
const SHAPE_UA = { circle: 'червоне коло', square: 'синій квадрат', triangle: 'зелений трикутник', star: 'жовта зірка', heart: 'рожеве сердечко' };
const SHAPE_COL = { circle: '#ff4d4d', square: '#3f8fff', triangle: '#4cc35a', star: '#ffd23f', heart: '#ff7ab8' };

/* ===== Підготовка рівня ===== */
function initLevel21(G, L) {
  const P = G.P; P.shape26 = null;
  G.shops26 = (L.shops26 || []).map(s => Object.assign({ got: [], done: false, hintT: 0 }, s, { items: s.items.map(i => Object.assign({ taken: false, wob: 0 }, i)) }));
  G.hiders = (L.hiders || []).map(h => Object.assign({ found: false, pop: 0 }, h));
  G.fgates = (L.fgates || []).map(g => Object.assign({ open: false, hintT: 0 }, g));
  G.shapes26 = (L.shapes26 || []).map(s => Object.assign({ taken: false, touch: false, joy: 0 }, s));
  G.sdoors = (L.sdoors || []).map(d => Object.assign({ open: false, hintT: 0 }, d));
  G.pals26 = []; G.trail26 = [];
}

/* ===== Список покупок: збери все зі списку в будь-якому порядку ===== */
function updateShops(dt) {
  const P = G.P;
  for (const s of G.shops26) {
    if (s.hintT > 0) s.hintT -= dt;
    for (const it of s.items) if (it.wob > 0) it.wob -= dt;
    if (s.done) continue;
    if (!(s.hintT > 0) && doorTouch(s.door, s.top)) { s.hintT = 4; say('Каса відчиниться, коли збереш усе зі списку: ' + s.list.map(k => ITEM_UA[k]).join(', '), 3.4); }
    for (const it of s.items) {
      if (it.taken || !overlap(P, { x: it.x - 11, y: it.y - 11, w: 22, h: 22 })) continue;
      if (s.list.includes(it.k) && !s.got.includes(it.k)) {
        it.taken = true; s.got.push(it.k); G.points++; Snd.star(s.got.length); burst(it.x, it.y, 10, RAINBOW, 110); floatText(it.x, it.y - 14, ITEM_UA[it.k], '#4cc35a');
        if (s.got.length >= s.list.length) { s.done = true; openColumn(s.door, s.top); G.points += 3; Snd.seq([0, 4, 7, 12, 16], 587, 0.07, 'triangle', 0.08); say('Усе зі списку в кошику! Каса відчинилася', 2.8); }
      } else if (it.wob <= 0) {
        it.wob = 0.6; Snd.tone(260, 0.15, 'triangle', 0.05, 200);
        if (s.hintT <= 0) { s.hintT = 2.5; say(s.got.includes(it.k) ? ITEM_UA[it.k][0].toUpperCase() + ITEM_UA[it.k].slice(1) + ' вже є в кошику' : 'Цього немає в списку. Подивись на дошку', 2.2); }
      }
    }
  }
}

/* ===== Хованки: торкнися куща — і друг піде за тобою ===== */
function updateHiders(dt) {
  const P = G.P;
  for (const h of G.hiders) {
    if (h.pop > 0) h.pop -= dt;
    if (h.found || !overlap(P, { x: h.x - 14, y: h.gy - 26, w: 28, h: 26 })) continue;
    h.found = true; h.pop = 0.8; G.points++;
    G.pals26.push({ k: h.k, x: h.x, y: h.gy, dir: 1 });
    Snd.seq([0, 7, 12], 784, 0.06, 'triangle', 0.08); burst(h.x, h.gy - 14, 14, ['#7fd46a', '#b4f08e', '#ffffff'], 130);
    floatText(h.x, h.gy - 34, PAL_UA[h.k] + '!', '#ff7ab8');
    say(PAL_UA[h.k] + ' знайшовся! Тепер ' + (h.k === 'fox' || h.k === 'squirrel' || h.k === 'mouse' ? 'вона' : 'він') + ' іде з тобою', 2.4);
  }
  // друзі йдуть слідом за єдиноріжкою
  const fx = P.x + P.w / 2, fy = P.flip ? P.y : P.y + P.h, last = G.trail26[G.trail26.length - 1];
  if (last && Math.hypot(fx - last.x, fy - last.y) > 80) { G.trail26 = []; for (const p of G.pals26) { p.x = fx; p.y = fy; } }
  if (!last || Math.hypot(fx - last.x, fy - last.y) > 3) { G.trail26.push({ x: fx, y: fy }); if (G.trail26.length > 160) G.trail26.shift(); }
  G.pals26.forEach((p, i) => {
    const tp = G.trail26[Math.max(0, G.trail26.length - 1 - (i + 1) * 9)];
    if (!tp) return;
    const nx = p.x + (tp.x - p.x) * Math.min(1, dt * 10);
    if (Math.abs(nx - p.x) > 0.3) p.dir = nx > p.x ? 1 : -1;
    p.x = nx; p.y += (tp.y - p.y) * Math.min(1, dt * 10);
  });
  const found = G.hiders.filter(h => h.found).length;
  for (const g of G.fgates) {
    if (g.hintT > 0) g.hintT -= dt;
    if (g.open) continue;
    if (found >= g.n) { g.open = true; openColumn(g.x, g.top); G.points += 2; Snd.seq([0, 4, 7, 12], 659, 0.07, 'triangle', 0.08); say('Усі друзі разом! Будиночок відчинився', 2.4); }
    else if (g.hintT <= 0 && doorTouch(g.x, g.top)) { g.hintT = 4; say('Будиночок друзів відчиниться, коли знайдеш ' + g.n + ' друзів. Зараз — ' + found + '. Зазирни в кущі!', 3.2); }
  }
}

/* ===== Фігури: принеси до дверей фігуру, як дірка на них ===== */
function updateShapes(dt) {
  const P = G.P;
  for (const s of G.shapes26) {
    if (s.joy > 0) s.joy -= dt;
    if (s.taken) continue;
    const touch = overlap(P, { x: s.x - 11, y: s.y - 11, w: 22, h: 22 });
    if (touch && !s.touch) {
      const old = P.shape26;
      P.shape26 = s.s; Snd.tone(600, 0.12, 'sine', 0.06, 900); burst(s.x, s.y, 8, [SHAPE_COL[s.s], '#ffffff'], 100);
      floatText(P.x + P.w / 2, P.y - 14, SHAPE_UA[s.s], SHAPE_COL[s.s]);
      if (old) { s.s = old; s.joy = 0.6; } else s.taken = true;
      if (!G.shapeHint) { G.shapeHint = true; say('Ти несеш ' + SHAPE_UA[P.shape26] + '. Неси до дверей із такою самою діркою', 2.8); }
    }
    s.touch = touch;
  }
  for (const d of G.sdoors) {
    if (d.hintT > 0) d.hintT -= dt;
    if (d.open || !doorTouch(d.x, d.top)) continue;
    if (P.shape26 === d.s) { d.open = true; P.shape26 = null; openColumn(d.x, d.top); G.points += 2; Snd.seq([0, 4, 7, 12], 659, 0.07, 'triangle', 0.08); say('Фігура підійшла! Двері відчинилися', 2.2); }
    else if (d.hintT <= 0) { d.hintT = 3.4; say('На дверях дірка — ' + SHAPE_UA[d.s] + '. ' + (P.shape26 ? 'А в тебе — ' + SHAPE_UA[P.shape26] + '. Поміняй фігуру' : 'Знайди таку фігуру'), 3.2); }
  }
}

function update21(dt) {
  updateShops(dt);
  updateHiders(dt);
  updateShapes(dt);
}

/* ===== Хом'ячок Жуйко — ще один бігун: кидає насінинки, а наївшись, дрімає ===== */
RUNNERS.hamster = { name: "Хом'ячок Жуйко", acc: "Хом'ячка Жуйка", win: ' Він поділився всіма запасами, і на базарі знову свято.', bolt: 'sunseed', hello: "Хом'ячок Жуйко: «Усе моє! Усе в мої щічки!»", rest: 'Жуйко наївся й задрімав! Стріляй або стрибни на нього', arm: 'Жуйко надто швидкий! Стріляй, коли він задрімає', restText: 'Хрум-хрум… хр-р-р' };
BOSS2.hamster = L => ({ kind: 'hamster', name: RUNNERS.hamster.name, acc: RUNNERS.hamster.acc, win: RUNNERS.hamster.win, x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 26, hw: 28, hh: 26, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, n: 0, tx: 0, vy: 0, hop: 0 });
