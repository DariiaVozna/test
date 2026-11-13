'use strict';
/* ===== Частина 29 «Сад і двір»: сортування сміття, чарівна квасоля, класики й Гусак Шипун ===== */
Object.assign(TUNES, {
  recyclepark: { base: 587.33, ms: 175, n: [0, 4, 7, 4, 5, 9, 12, 9, 7, 11, 14, 11, 12, null, null, null, 0, 4, 7, 4, 5, 9, 12, 9, 7, 5, 4, 2, 0, null, null, null], b: [0, -5, -3, -7] },
  beanstalk: { base: 523.25, ms: 185, n: [0, null, 4, null, 7, null, 12, null, 11, null, 7, null, 9, null, null, null, 0, null, 4, null, 7, null, 12, null, 14, null, 12, null, 16, null, null, null], b: [0, -5, -3, -7] },
  hopscotch: { base: 659.25, ms: 160, n: [0, 2, 4, 5, 7, 5, 4, 2, 0, 2, 4, 5, 7, null, 7, null, 9, 7, 5, 4, 2, 4, 5, 7, 0, null, 0, null, 0, null, null, null], b: [0, -5, -3, -7] },
  gardenyard: { base: 698.46, ms: 165, n: [0, 4, 7, 9, 7, 4, 0, null, 2, 5, 9, 11, 9, 5, 2, null, 4, 7, 11, 12, 11, 7, 4, null, 12, 11, 9, 7, 5, 4, 2, null], b: [0, -5, -3, -7] },
  goosemeadow: { base: 466.16, ms: 180, n: [0, 3, 7, null, 5, 8, 12, null, 7, 10, 14, null, 12, 10, 7, null, 5, null, 3, null, 2, null, 0, null, 7, 5, 3, 2, 0, null, null, null], b: [0, -4, -2, -5] },
});
const TRASH_BIN = { bottle: 'yellow', can: 'yellow', paper: 'blue', box: 'blue', peel: 'green', core: 'green' };
const TRASH_UA = { bottle: 'пляшка', can: 'бляшанка', paper: 'папірець', box: 'коробочка', peel: 'шкірка банана', core: 'огризок' };
const TRASH_ACC = { bottle: 'пляшку', can: 'бляшанку', paper: 'папірець', box: 'коробочку', peel: 'шкірку банана', core: 'огризок' };
const BIN_UA = { yellow: 'жовтий — для пластику й бляшанок', blue: 'синій — для паперу', green: 'зелений — для очистків' };
const BIN_COL = { yellow: '#ffd23f', blue: '#3f8fff', green: '#4cc35a' };

/* ===== Підготовка рівня ===== */
function initLevel24(G, L) {
  const P = G.P; P.trash = null; P.seeds = 0;
  G.trashes = (L.trashes || []).map(o => Object.assign({ taken: false, touch: false, joy: 0 }, o));
  G.bins = (L.bins || []).map(b => Object.assign({ touch: false, joy: 0, bad: 0 }, b));
  G.cleangates = (L.cleangates || []).map(g => Object.assign({ open: false, hintT: 0 }, g));
  G.sorted = 0;
  G.seeds29 = (L.seeds29 || []).map(s => Object.assign({ taken: false }, s));
  G.soils = (L.soils || []).map(s => Object.assign({ grown: 0, growing: false, done: false, hintT: 0, gt: 0 }, s));
  G.hops = (L.hops || []).map(h => Object.assign({ next: 1, done: false, hintT: 0, okT: 0, badN: 0, badT: 0 }, h));
}

/* ===== Чистий парк: віднеси сміття в контейнер свого кольору ===== */
function updateTrash(dt) {
  const P = G.P;
  for (const o of G.trashes) {
    if (o.joy > 0) o.joy -= dt;
    if (o.taken) continue;
    const touch = overlap(P, { x: o.x - 11, y: o.y - 11, w: 22, h: 22 });
    if (touch && !o.touch) {
      const old = P.trash;
      P.trash = o.k; Snd.tone(620, 0.1, 'sine', 0.05, 900); burst(o.x, o.y, 6, ['#ffffff', '#c8e8ff'], 80);
      floatText(P.x + P.w / 2, P.y - 14, TRASH_UA[o.k], '#4a8a3a');
      if (old) { o.k = old; o.joy = 0.6; } else o.taken = true;
      if (!G.trashHint) { G.trashHint = true; say('Ти підняла ' + TRASH_ACC[P.trash] + '. Віднеси в контейнер ' + BIN_UA[TRASH_BIN[P.trash]], 3); }
    }
    o.touch = touch;
  }
  for (const b of G.bins) {
    if (b.joy > 0) b.joy -= dt; if (b.bad > 0) b.bad -= dt;
    const touch = overlap(P, { x: b.x - 13, y: b.gy - 30, w: 26, h: 30 });
    if (touch && !b.touch && P.trash) {
      if (TRASH_BIN[P.trash] === b.c) {
        G.sorted++; b.joy = 0.8; G.points++; Snd.star(G.sorted); burst(b.x, b.gy - 30, 12, [BIN_COL[b.c], '#ffffff'], 120);
        floatText(b.x, b.gy - 44, 'Дякую!', '#2f9a3a'); P.trash = null;
      } else {
        b.bad = 0.6; Snd.tone(240, 0.15, 'triangle', 0.05, 200);
        say('Ні, ' + TRASH_ACC[P.trash] + ' сюди не кладемо. Неси в контейнер ' + BIN_UA[TRASH_BIN[P.trash]], 3);
      }
    }
    b.touch = touch;
  }
  for (const g of G.cleangates) {
    if (g.hintT > 0) g.hintT -= dt;
    if (g.open) continue;
    if (G.sorted >= g.n) { g.open = true; openColumn(g.x, g.top); G.points += 3; Snd.seq([0, 4, 7, 12, 16], 587, 0.07, 'triangle', 0.08); say('Парк чистий! Ворота відчинилися', 2.4); }
    else if (g.hintT <= 0 && doorTouch(g.x, g.top)) { g.hintT = 4; say('Ворота відчиняться, коли в контейнерах буде ' + g.n + ' речей. Зараз — ' + G.sorted + '. Збери сміття!', 3.2); }
  }
}

/* ===== Чарівна квасоля: посади зернятко — виросте стебло-драбинка ===== */
function updateBeans(dt) {
  const P = G.P;
  for (const s of G.seeds29) {
    if (s.taken || !overlap(P, { x: s.x - 10, y: s.y - 10, w: 20, h: 20 })) continue;
    s.taken = true; P.seeds++; G.points++; Snd.star(P.seeds); burst(s.x, s.y, 8, ['#7fd46a', '#ffd23f'], 90);
    floatText(s.x, s.y - 14, 'Зернятко!', '#4a8a3a');
    if (!G.seedHint) { G.seedHint = true; say('Чарівне зернятко! Посади його в грядку біля високої скелі', 2.6); }
  }
  for (const s of G.soils) {
    if (s.hintT > 0) s.hintT -= dt;
    if (s.done) continue;
    if (s.growing) {
      s.gt -= dt;
      while (s.gt <= 0 && s.grown < s.h) {
        const x = s.x + 1 + s.grown, y = 9 - s.grown;
        G.map[y * G.Wt + x] = 2; s.grown++; s.gt += 0.14;
        if (overlap(P, { x: x * T, y: y * T, w: T, h: T })) { P.y = y * T - P.h; P.vy = 0; }
        Snd.tone(400 + s.grown * 60, 0.08, 'sine', 0.05, 600 + s.grown * 60); burst(x * T + 12, y * T + 12, 6, ['#7fd46a', '#b4f08e'], 80);
      }
      if (s.grown >= s.h) { s.done = true; G.points += 2; Snd.seq([0, 4, 7, 12], 523, 0.07, 'triangle', 0.08); say('Квасоля виросла! Стрибай по листочках нагору', 2.4); }
      continue;
    }
    const near = overlap(P, { x: s.x * T - 6, y: 10 * T - 30, w: T + 12, h: 30 });
    if (!near) continue;
    if (P.seeds > 0) { P.seeds--; s.growing = true; s.gt = 0.3; burst(s.x * T + 12, 10 * T - 6, 10, ['#8a5a30', '#7fd46a'], 90); say('Посадили зернятко… Дивись, росте!', 2); }
    else if (s.hintT <= 0) { s.hintT = 4; say('Тут грядка для чарівної квасолі. Знайди зернятко!', 2.6); }
  }
}

/* ===== Класики: стрибай по клітинках із числами по порядку ===== */
function updateHops(dt) {
  const P = G.P, cx = Math.floor((P.x + P.w / 2) / T);
  for (const h of G.hops) {
    if (h.hintT > 0) h.hintT -= dt; if (h.okT > 0) h.okT -= dt; if (h.badT > 0) h.badT -= dt;
    if (h.done) continue;
    if (h.hintT <= 0 && doorTouch(h.door, h.top)) { h.hintT = 4; say('Двері відчиняться, коли пройдеш класики по порядку: ' + h.nums.slice().sort((a, b) => a - b).join(', ') + '. Зараз шукай ' + h.next, 3.2); }
    if (!P.onGround) continue;
    const i = h.cols.indexOf(cx);
    if (i < 0) continue;
    const n = h.nums[i];
    if (n === h.next) {
      h.next++; h.okT = 0.6; G.points++; Snd.star(n); burst(cx * T + 12, 10 * T - 4, 10, RAINBOW, 110); floatText(cx * T + 12, 10 * T - 30, String(n), '#ff4fa3');
      if (h.next > h.nums.length) { h.done = true; openColumn(h.door, h.top); G.points += 3; Snd.seq([0, 4, 7, 12, 16], 659, 0.07, 'triangle', 0.08); say('Класики пройдено! Двері відчинилися', 2.4); }
    } else if (n > h.next && !(h.badT > 0 && h.badN === n)) {
      h.badN = n; h.badT = 1.5; Snd.tone(260, 0.15, 'triangle', 0.05, 200);
      say('Це ' + n + '. Спершу знайди клітинку ' + h.next, 2.2);
    }
  }
}

function update24(dt) {
  updateTrash(dt);
  updateBeans(dt);
  updateHops(dt);
}

/* ===== Гусак Шипун — ще один бігун: кидається пір'їнами, а потім ховає голову під крило ===== */
RUNNERS.biggoose = { name: 'Гусак Шипун', acc: 'Гусака Шипуна', win: ' Він перестав шипіти й тепер охороняє сад разом із друзями.', bolt: 'feather', hello: 'Гусак Шипун: «Ш-ш-ш! Це мій двір! Нікого не пущу!»', rest: 'Шипун сховав голову під крило! Стріляй або стрибни на нього', arm: 'Шипун надто швидкий! Стріляй, коли він сховає голову', restText: 'Ш-ш-ш… втомився' };
BOSS2.biggoose = L => ({ kind: 'biggoose', name: RUNNERS.biggoose.name, acc: RUNNERS.biggoose.acc, win: RUNNERS.biggoose.win, x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 26, hw: 28, hh: 26, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, n: 0, tx: 0, vy: 0, hop: 0 });
