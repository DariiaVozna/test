'use strict';
/* ===== Частина 31 «Абетка й порядок»: перша буква, більше чи менше, повтори за мною й Крокодильчик Буквоїд ===== */
Object.assign(TUNES, {
  letterland: { base: 587.33, ms: 175, n: [0, 2, 4, 0, 0, 2, 4, 0, 4, 5, 7, null, 4, 5, 7, null, 7, 9, 7, 5, 4, null, 0, null, 7, 9, 7, 5, 4, null, 0, null], b: [0, -5, -3, -7] },
  compareland: { base: 523.25, ms: 170, n: [0, 4, 7, 12, null, 12, 7, 4, 0, null, 2, 5, 9, 14, null, 14, 9, 5, 2, null, 4, 7, 11, 16, null, 16, 11, 7, 4, null, null, null], b: [0, -5, -3, -7] },
  memorylane: { base: 659.25, ms: 180, n: [0, null, 4, null, 7, null, 4, null, 0, 4, 7, 12, null, null, null, null, 2, null, 5, null, 9, null, 5, null, 2, 5, 9, 14, null, null, null, null], b: [0, -5, -3, -7] },
  brainyard: { base: 698.46, ms: 160, n: [0, 4, 7, 4, 0, 4, 7, 12, 11, 7, 4, 7, 2, null, null, null, 5, 9, 12, 9, 5, 9, 12, 17, 16, 12, 9, 12, 7, null, null, null], b: [0, -5, -3, -7] },
  crocswamp: { base: 440, ms: 190, n: [0, 3, 7, null, 5, 8, 12, null, 7, 10, 14, null, 12, 10, 7, null, 5, null, 3, null, 2, null, 0, null, 7, 5, 3, 2, 0, null, null, null], b: [0, -4, -2, -5] },
});
const FIRST_WORD = { apple: 'ЯБЛУКО', banana: 'БАНАН', carrot: 'МОРКВА', cheese: 'СИР', bread: 'ХЛІБ', milk: 'МОЛОКО', grapes: 'ВИНОГРАД', pear: 'ГРУША', cat: 'КІТ', dog: 'СОБАКА', duck: 'КАЧКА', hen: 'КУРКА', pig: 'СВИНКА' };
const PIC_ANIMAL = { cat: 1, dog: 1, duck: 1, hen: 1, pig: 1 };
const SEQ_NOM = { cat: 'кіт', dog: 'собака', duck: 'качка', hen: 'курка', pig: 'свинка' };
const CMP_UA = { '<': 'менше', '>': 'більше', '=': 'дорівнює' };

/* ===== Тексти для нових дверей-завдань ===== */
const quizMsg25 = quizMsg;
quizMsg = function (q, what) {
  if (q.kind === 'letter') {
    const w = FIRST_WORD[q.pic], word = w[0] + w.slice(1).toLowerCase();
    return {
      hint: 'Що це? З якої букви починається слово? Стукни головою знизу кубик із цією буквою',
      ok: 'Правильно! «' + word + '» починається з букви ' + q.ans + '. Двері відчинилися',
      bad: 'Ой, ні. Скажи слово вголос і послухай перший звук',
    }[what];
  }
  if (q.kind === 'compare') return {
    hint: 'Де більше? Порівняй числа й стукни знак: «<» — менше, «>» — більше, «=» — порівну',
    ok: 'Правильно! ' + q.a + ' ' + q.ans + ' ' + q.b + ': ' + q.a + ' ' + CMP_UA[q.ans] + ' ' + (q.ans === '=' ? '' : 'ніж ') + q.b + '. Двері відчинилися',
    bad: 'Ой, ні. Гострий кінчик знака дивиться на менше число, а відкритий — на більше',
  }[what];
  return quizMsg25(q, what);
};

/* ===== Підготовка рівня ===== */
function initLevel26(G, L) {
  G.seqs = (L.seqs || []).map(s => Object.assign({ step: 0, done: false, hintT: 0, wrongT: 0, wrongTx: -1, okT: 0, okTx: -1 }, s));
  initLevel28(G, L);
}

/* ===== Повтори за мною: стукай кубики з тваринками в тому порядку, що на дошці ===== */
function updateSeqs(dt) {
  const P = G.P, h = P.headHit;
  for (const s of G.seqs) {
    if (s.hintT > 0) s.hintT -= dt; if (s.wrongT > 0) s.wrongT -= dt; if (s.okT > 0) s.okT -= dt;
    if (s.done) continue;
    if (!(s.hintT > 0) && doorTouch(s.door, s.top)) { s.hintT = 4; say('Повтори за дошкою: стукни головою знизу кубики по черзі — ' + s.order.map(k => SEQ_NOM[k]).join(', '), 3.4); }
    if (!h || P.flip) continue;
    const card = s.cards.find(c => c.tx === h.tx && c.ty === h.ty);
    if (!card || (s.okT > 0.3 && s.okTx === card.tx)) continue;
    if (card.k === s.order[s.step]) {
      s.step++; s.okT = 0.6; s.okTx = card.tx; G.points++; Snd.star(s.step); burst(card.tx * T + 12, card.ty * T, 10, RAINBOW, 110);
      floatText(card.tx * T + 12, card.ty * T - 12, String(s.step), '#ff4fa3');
      if (s.step >= s.order.length) { s.done = true; openColumn(s.door, s.top); G.points += 3; Snd.seq([0, 4, 7, 12, 16], 659, 0.07, 'triangle', 0.08); say('Усе по порядку! Двері відчинилися', 2.4); }
    } else if (s.wrongT <= 0.3) {
      s.wrongT = 0.8; s.wrongTx = card.tx; s.step = 0; Snd.tone(220, 0.2, 'triangle', 0.05, 180);
      say('Ой, збилася. Почни спочатку: спершу ' + SEQ_NOM[s.order[0]], 2.4);
    }
  }
}

function update26(dt) {
  updateSeqs(dt);
  update28(dt);
}

/* ===== Крокодильчик Буквоїд — ще один бігун: плюється буквами, а об'ївшись, гикає ===== */
RUNNERS.croc = { name: 'Крокодильчик Буквоїд', acc: 'Крокодильчика Буквоїда', win: ' Він повернув усі букви й тепер сам вчиться читати.', bolt: 'letterbit', hello: 'Крокодильчик Буквоїд: «Ням-ням! З’їм усі букви з абетки!»', rest: 'Буквоїд об’ївся букв і гикає! Стріляй або стрибни на нього', arm: 'Буквоїд надто швидкий! Стріляй, коли він гикатиме', restText: 'Ік! Ік!' };
BOSS2.croc = L => ({ kind: 'croc', name: RUNNERS.croc.name, acc: RUNNERS.croc.acc, win: RUNNERS.croc.win, x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 26, hw: 30, hh: 22, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, n: 0, tx: 0, vy: 0, hop: 0 });
