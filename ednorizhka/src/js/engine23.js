'use strict';
/* ===== Частина 28 «Розумна ферма»: котра година, лічилка, малюки шукають маму й Бобер Тріско ===== */
Object.assign(TUNES, {
  clockvillage: { base: 587.33, ms: 180, n: [0, null, 7, null, 0, null, 7, null, 4, 5, 7, null, 12, null, 7, null, 0, null, 7, null, 0, null, 7, null, 5, 4, 2, null, 0, null, null, null], b: [0, -5, -3, -7] },
  countmeadow: { base: 523.25, ms: 170, n: [0, 2, 4, 5, 7, null, 7, null, 9, 9, 9, 9, 7, null, null, null, 5, 5, 5, 5, 4, null, 4, null, 2, 2, 2, 2, 0, null, null, null], b: [0, -5, -3, -7] },
  mamafarm: { base: 659.25, ms: 175, n: [0, 0, 7, 7, 9, 9, 7, null, 5, 5, 4, 4, 2, 2, 0, null, 7, 7, 5, 5, 4, 4, 2, null, 7, 7, 5, 5, 4, 4, 2, null], b: [0, -5, -3, -7] },
  smartfarm: { base: 698.46, ms: 165, n: [0, 4, 7, 4, 0, 4, 7, 12, 11, 7, 4, 7, 2, null, null, null, 5, 9, 12, 9, 5, 9, 12, 17, 16, 12, 9, 12, 7, null, null, null], b: [0, -5, -3, -7] },
  beaverdam: { base: 466.16, ms: 185, n: [0, 3, 7, null, 5, 8, 12, null, 7, 10, 14, null, 12, 10, 7, null, 5, null, 3, null, 2, null, 0, null, 7, 5, 3, 2, 0, null, null, null], b: [0, -4, -2, -5] },
});
const COUNT_GEN = { butterfly: 'метеликів', apple: 'яблучок', flower: 'квіточок', fish: 'рибок' };
const BABY_UA = { duck: 'каченя', cat: 'кошеня', dog: 'цуценя', hen: 'курча', pig: 'порося' };
const MOM_UA = { duck: 'мама-качка', cat: 'мама-кішка', dog: 'мама-собака', hen: 'мама-курка', pig: 'мама-свинка' };
function hourWord(h) { return h + ' ' + (h === 1 ? 'година' : h >= 2 && h <= 4 ? 'години' : 'годин'); }

/* ===== Тексти для дверей-завдань: приклад, годинник, лічилка ===== */
function quizMsg(q, what) {
  if (q.kind === 'clock') return {
    hint: 'Котра година на годиннику? Коротка стрілка показує годину. Стукни головою знизу кубик із правильним числом',
    ok: 'Правильно! Зараз ' + hourWord(q.ans) + '. Двері відчинилися',
    bad: 'Ой, ні. Подивись, на яке число показує коротка стрілка',
  }[what];
  if (q.kind === 'count') return {
    hint: 'Скільки ' + COUNT_GEN[q.pic] + ' на дошці? Порахуй по одному й стукни головою знизу кубик із правильним числом',
    ok: 'Правильно! Їх ' + q.ans + '. Двері відчинилися',
    bad: 'Ой, ні. Порахуй ще раз, по одному',
  }[what];
  const e = q.a + ' ' + q.op + ' ' + q.b;
  return {
    hint: 'Двері з прикладом! Порахуй ' + e + ' і стукни головою знизу кубик із правильною відповіддю',
    ok: 'Правильно! ' + e + ' = ' + q.ans + '. Двері відчинилися',
    bad: 'Ой, ні. Порахуй ще раз: ' + e + ' = ?',
  }[what];
}

/* ===== Підготовка рівня ===== */
function initLevel23(G, L) {
  const P = G.P; P.baby = null;
  G.babies = (L.babies || []).map(b => Object.assign({ taken: false, touch: false, joy: 0 }, b));
  G.moms = (L.moms || []).map(m => Object.assign({ open: false, hintT: 0, happy: 0 }, m));
  initLevel24(G, L);
}

/* ===== Малюки шукають маму: неси малюка до його мами ===== */
function updateBabies(dt) {
  const P = G.P;
  for (const b of G.babies) {
    if (b.joy > 0) b.joy -= dt;
    if (b.taken) continue;
    const touch = overlap(P, { x: b.x - 12, y: b.y - 22, w: 24, h: 22 });
    if (touch && !b.touch) {
      const old = P.baby;
      P.baby = b.k; Snd.tone(700, 0.12, 'sine', 0.06, 1000); burst(b.x, b.y - 10, 8, ['#ffd23f', '#ffffff'], 90);
      floatText(P.x + P.w / 2, P.y - 14, BABY_UA[b.k], '#ff7ab8');
      if (old) { b.k = old; b.joy = 0.6; } else b.taken = true;
      if (!G.babyHint) { G.babyHint = true; say('Ти несеш ' + BABY_UA[P.baby] + '. Допоможи знайти його маму!', 2.8); }
    }
    b.touch = touch;
  }
  for (const m of G.moms) {
    if (m.hintT > 0) m.hintT -= dt;
    if (m.happy > 0) m.happy -= dt;
    if (m.open || !doorTouch(m.x, m.top)) continue;
    if (P.baby === m.k) {
      m.open = true; m.happy = 2; P.baby = null; openColumn(m.x, m.top); G.points += 3;
      Snd.seq([0, 4, 7, 12, 16], 659, 0.07, 'triangle', 0.08);
      const B = BABY_UA[m.k]; say(B[0].toUpperCase() + B.slice(1) + ' знайшло маму! Хвірточка відчинилася', 2.6);
    } else if (m.hintT <= 0) {
      m.hintT = 3.4;
      say('Тут чекає ' + MOM_UA[m.k] + '. Вона шукає своє ' + BABY_UA[m.k] + (P.baby ? ', а в тебе ' + BABY_UA[P.baby] + '. Поміняй малюка' : '. Знайди його'), 3.2);
    }
  }
}

function update23(dt) {
  updateBabies(dt);
  update24(dt);
}

/* ===== Бобер Тріско — ще один бігун: кидає тріски, а потім гризе колоду ===== */
RUNNERS.bigbeaver = { name: 'Бобер Тріско', acc: 'Бобра Тріска', win: ' Тепер він будує для звіряток місток, а не греблю поперек дороги.', bolt: 'woodchip', hello: 'Бобер Тріско: «Гриз-гриз! Перегороджу всю ферму!»', rest: 'Тріско засів гризти колоду! Стріляй або стрибни на нього', arm: 'Тріско надто швидкий! Стріляй, коли він гризтиме колоду', restText: 'Гриз-гриз…' };
BOSS2.bigbeaver = L => ({ kind: 'bigbeaver', name: RUNNERS.bigbeaver.name, acc: RUNNERS.bigbeaver.acc, win: RUNNERS.bigbeaver.win, x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 26, hw: 28, hh: 26, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, n: 0, tx: 0, vy: 0, hop: 0 });
