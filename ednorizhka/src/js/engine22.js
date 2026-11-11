'use strict';
/* ===== Частина 27 «День народження»: свічки на торті, подарунки з ключиком, міст із дощечок і Єнот Шкодько ===== */
Object.assign(TUNES, {
  cakehill: { base: 523.25, ms: 175, n: [0, 0, 2, 0, 5, 4, null, null, 0, 0, 2, 0, 7, 5, null, null, 0, 0, 12, 9, 5, 4, 2, null, 10, 10, 9, 5, 7, 5, null, null], b: [0, -7, -5, -7] },
  giftland: { base: 587.33, ms: 170, n: [0, 4, 7, 12, 7, 4, 0, null, 2, 5, 9, 14, 9, 5, 2, null, 4, 7, 11, 16, 11, 7, 4, null, 12, null, 12, null, 0, null, null, null], b: [0, -5, -3, -7] },
  plankbridge: { base: 493.88, ms: 180, n: [0, null, 4, null, 7, 7, 4, null, 5, null, 9, null, 12, 12, 9, null, 7, null, 4, null, 2, 2, 0, null, 4, 5, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
  partyhall: { base: 659.25, ms: 160, n: [0, 4, 7, 4, 9, 7, 4, 0, 2, 5, 9, 5, 11, 9, 5, 2, 4, 7, 11, 7, 12, 11, 7, 4, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
  raccoonden: { base: 440, ms: 190, n: [0, 3, 7, null, 5, 8, 12, null, 7, 10, 14, null, 12, 10, 7, null, 5, null, 3, null, 2, null, 0, null, 7, 5, 3, 2, 0, null, null, null], b: [0, -4, -2, -5] },
});
const PLANK_PER_TILE = 2; // одна дощечка — дві клітинки мосту

/* ===== Підготовка рівня ===== */
function initLevel22(G, L) {
  const P = G.P; P.planks = 0;
  G.candles = (L.candles || []).map(c => Object.assign({ lit: false, pop: 0 }, c));
  G.cakes = (L.cakes || []).map(c => Object.assign({ open: false, hintT: 0 }, c));
  G.gifts = (L.gifts || []).map(g => Object.assign({ open: false, wob: 0 }, g));
  G.kdoors = (L.kdoors || []).map(d => Object.assign({ open: false, hintT: 0 }, d));
  G.planks = (L.planks || []).map(p => Object.assign({ taken: false }, p));
  G.pbridges = (L.pbridges || []).map(b => Object.assign({ built: 0, building: false, done: false, hintT: 0, bt: 0 }, b));
}

/* ===== Свічки: торкнися або стрельни — засвітиться ===== */
function updateCandles(dt) {
  const P = G.P;
  for (const c of G.candles) {
    if (c.pop > 0) c.pop -= dt;
    if (c.lit) continue;
    const box = { x: c.x - 8, y: c.gy - 34, w: 16, h: 34 };
    if (overlap(P, box) || cheerShot(box.x, box.y, box.x + box.w, box.y + box.h)) {
      c.lit = true; c.pop = 0.8; G.points++;
      const n = G.candles.filter(k => k.lit).length;
      Snd.star(n); burst(c.x, c.gy - 30, 12, ['#ffd23f', '#ff9a2a', '#ffffff'], 110); floatText(c.x, c.gy - 44, String(n), '#ff9a2a');
      if (!G.candleHint) { G.candleHint = true; say('Свічка засвітилася! Можна торкнутися свічки або стрельнути в неї рогом', 2.6); }
    }
  }
  const lit = G.candles.filter(k => k.lit).length;
  for (const k of G.cakes) {
    if (k.hintT > 0) k.hintT -= dt;
    if (k.open) continue;
    if (lit >= k.n) { k.open = true; openColumn(k.x, k.top); G.points += 3; Snd.seq([0, 4, 7, 12, 16], 523, 0.07, 'triangle', 0.08); say('З днем народження! Усі свічки горять, торт-двері відчинилися', 2.8); }
    else if (k.hintT <= 0 && doorTouch(k.x, k.top)) { k.hintT = 4; say('Торт чекає ' + k.n + ' свічок, а горить ' + lit + '. Запали ще ' + (k.n - lit) + '!', 3); }
  }
}

/* ===== Подарунки: стукни знизу — відкриється; в одному ключик ===== */
const SURPRISE = ['Конфеті!', 'Сюрприз!', 'Ура!', 'Хлопавка!'];
function updateGifts(dt) {
  const P = G.P, h = P.headHit;
  for (const g of G.gifts) if (g.wob > 0) g.wob -= dt;
  for (const d of G.kdoors) {
    if (d.hintT > 0) d.hintT -= dt;
    if (!d.open && d.hintT <= 0 && doorTouch(d.x, d.top)) { d.hintT = 4; say('Двері замкнені. Ключик сховався в одному з подарунків — стукни їх головою знизу', 3.2); }
  }
  if (!h || P.flip) return;
  const g = G.gifts.find(g => !g.open && g.tx === h.tx && g.ty === h.ty);
  if (!g) return;
  g.open = true; g.wob = 0.6; G.points++;
  burst(g.tx * T + 12, g.ty * T, 18, RAINBOW, 150);
  if (g.key) {
    const d = G.kdoors.find(d => d.group === g.group);
    if (d && !d.open) { d.open = true; openColumn(d.x, d.top); }
    G.points += 3; Snd.seq([0, 4, 7, 12, 16], 659, 0.07, 'triangle', 0.08); floatText(g.tx * T + 12, g.ty * T - 12, 'Ключик!', '#ffb020');
    say('Ключик! Двері відчинилися', 2.4);
  } else {
    Snd.seq([0, 7], 784, 0.06, 'square', 0.05); floatText(g.tx * T + 12, g.ty * T - 12, SURPRISE[(g.tx + g.ty) % SURPRISE.length], '#ff4fa3');
    const d = G.kdoors.find(d => d.group === g.group);
    if (d && !d.open) say('Тут сюрприз, а ключика немає. Спробуй інший подарунок', 2.2);
  }
}

/* ===== Дощечки й міст ===== */
function updatePlanks(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const p of G.planks) {
    if (p.taken || !overlap(P, { x: p.x - 12, y: p.y - 9, w: 24, h: 18 })) continue;
    p.taken = true; P.planks++; G.points++; Snd.star(P.planks); burst(p.x, p.y, 8, ['#d9a86a', '#ffe0a8', '#ffffff'], 90);
    floatText(p.x, p.y - 14, 'Дощечок: ' + P.planks, '#a8683a');
    if (!G.plankHint) { G.plankHint = true; say('Дощечка! Збирай їх — з дощечок збудуємо міст через яму', 2.6); }
  }
  for (const b of G.pbridges) {
    if (b.hintT > 0) b.hintT -= dt;
    if (b.done) continue;
    if (b.building) {
      b.bt -= dt;
      while (b.bt <= 0 && b.built < b.x1 - b.x0) {
        const x = b.x0 + b.built; G.map[10 * G.Wt + x] = 2; b.built++; b.bt += 0.09;
        Snd.tone(300 + b.built * 40, 0.06, 'square', 0.04); burst(x * T + 12, 10 * T, 5, ['#d9a86a', '#ffffff'], 70);
      }
      if (b.built >= b.x1 - b.x0) { b.done = true; G.points += 2; Snd.seq([0, 4, 7, 12], 523, 0.07, 'triangle', 0.08); say('Міст готовий! Можна йти', 2); }
      continue;
    }
    const near = P.onGround && pcx > (b.x0 - 4) * T && pcx < b.x0 * T;
    if (!near) continue;
    if (P.planks >= b.need) { P.planks -= b.need; b.building = true; b.bt = 0; say('Будуємо міст із ' + b.need + ' дощечок!', 2); }
    else if (b.hintT <= 0) { b.hintT = 4; say('Для мосту треба ' + b.need + ' дощечки, а в тебе ' + P.planks + '. Пошукай ще!', 3); }
  }
}

function update22(dt) {
  updateCandles(dt);
  updateGifts(dt);
  updatePlanks(dt);
}

/* ===== Єнот Шкодько — ще один бігун: кидається тістечками, а потім заплутується у стрічці ===== */
RUNNERS.raccoon = { name: 'Єнот Шкодько', acc: 'Єнота Шкодька', win: ' Він повернув усі подарунки й попросився на свято. Звісно, його запросили!', bolt: 'cakebit', hello: 'Єнот Шкодько: «Усі подарунки мої! І торт теж мій!»', rest: 'Шкодько заплутався у стрічці! Стріляй або стрибни на нього', arm: 'Шкодько надто спритний! Стріляй, коли він заплутається у стрічці', restText: 'Ой, стрічка…' };
BOSS2.raccoon = L => ({ kind: 'raccoon', name: RUNNERS.raccoon.name, acc: RUNNERS.raccoon.acc, win: RUNNERS.raccoon.win, x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 26, hw: 28, hh: 26, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, n: 0, tx: 0, vy: 0, hop: 0 });
