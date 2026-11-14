'use strict';
/* ===== Частина 30 «Зимове свято»: зліпи сніговика, хто як говорить, чия це тінь і Сніговик Хрумко ===== */
Object.assign(TUNES, {
  snowmanhill: { base: 659.25, ms: 170, n: [4, 4, 4, null, 4, 4, 4, null, 4, 7, 0, 2, 4, null, null, null, 5, 5, 5, 5, 5, 4, 4, 4, 4, 2, 2, 4, 2, null, 7, null], b: [0, -5, -3, -7] },
  animalsounds: { base: 587.33, ms: 175, n: [0, 0, 0, 7, 9, 9, 7, null, 4, 4, 2, 2, 0, null, null, null, 7, 7, 0, 0, 9, 9, 7, null, 5, 5, 4, 4, 2, 2, 0, null], b: [0, -5, -3, -7] },
  shadowtheater: { base: 523.25, ms: 185, n: [0, null, 3, null, 7, null, 3, null, 5, null, 8, null, 12, null, 8, null, 7, null, 10, null, 14, null, 10, null, 12, null, 7, null, 0, null, null, null], b: [0, -4, -2, -5] },
  winterfest: { base: 698.46, ms: 160, n: [0, 4, 7, 12, 7, 4, 0, null, 2, 5, 9, 14, 9, 5, 2, null, 4, 7, 11, 16, 11, 7, 4, null, 12, 11, 9, 7, 5, 4, 2, null], b: [0, -5, -3, -7] },
  icepalace: { base: 493.88, ms: 180, n: [0, 4, 7, 12, 11, 7, 4, null, 2, 5, 9, 14, 12, 9, 5, null, 4, 7, 11, 16, 14, 11, 7, null, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
});
const SNOW_PARTS = ['base', 'mid', 'head', 'nose', 'hat', 'scarf'];
const SNOW_UA = { base: 'велика сніжка', mid: 'середня сніжка', head: 'маленька сніжка', nose: 'морквина', hat: 'відерце', scarf: 'шарфик' };
const ANIMAL_SOUND = { duck: 'Кря', cat: 'Мяу', dog: 'Гав', hen: 'Ко-ко', pig: 'Хрю' };
const ANIMAL_NOM = { duck: 'Качка', cat: 'Кішка', dog: 'Собака', hen: 'Курка', pig: 'Свинка' };
const ANIMAL_GEN = { duck: 'качки', cat: 'кішки', dog: 'собаки', hen: 'курки', pig: 'свинки' };

/* ===== Тексти для нових дверей-завдань ===== */
const quizMsg24 = quizMsg;
quizMsg = function (q, what) {
  if (q.kind === 'sound') return {
    hint: 'Хто це? А як він говорить? Прочитай слова на кубиках і стукни головою знизу правильний',
    ok: 'Правильно! ' + ANIMAL_NOM[q.animal] + ' каже «' + q.ans + '». Двері відчинилися',
    bad: 'Ой, ні. Прочитай слова ще раз і подумай, хто так говорить',
  }[what];
  if (q.kind === 'shadow') return {
    hint: 'Чия це тінь? Подивись на вушка, дзьобик і хвостик. Стукни головою знизу кубик із тим, чия вона',
    ok: 'Правильно! Це тінь ' + ANIMAL_GEN[q.ans] + '. Двері відчинилися',
    bad: 'Ой, ні. Придивись до тіні: вушка, дзьобик, хвостик',
  }[what];
  return quizMsg24(q, what);
};

/* ===== Підготовка рівня ===== */
function initLevel25(G, L) {
  G.snowkits = (L.snowkits || []).map(s => Object.assign({ got: [], done: false, hintT: 0, wave: 0 }, s, { items: s.items.map(i => Object.assign({ taken: false }, i)) }));
}

/* ===== Зліпи сніговика: збери всі частинки в будь-якому порядку ===== */
function updateSnowkits(dt) {
  const P = G.P;
  for (const s of G.snowkits) {
    if (s.hintT > 0) s.hintT -= dt;
    if (s.wave > 0) s.wave -= dt;
    if (s.done) continue;
    if (!(s.hintT > 0) && doorTouch(s.door, s.top)) {
      const left = s.items.filter(i => !i.taken).map(i => SNOW_UA[i.k]);
      s.hintT = 4; say('Сніговик ще не готовий. Знайди: ' + left.join(', '), 3.4);
    }
    for (const it of s.items) {
      if (it.taken || !overlap(P, { x: it.x - 12, y: it.y - 12, w: 24, h: 24 })) continue;
      it.taken = true; s.got.push(it.k); G.points++; Snd.star(s.got.length); burst(it.x, it.y, 12, ['#ffffff', '#c8e8ff', '#ffd23f'], 110);
      floatText(it.x, it.y - 16, SNOW_UA[it.k], '#3f8fff');
      if (s.got.length >= s.items.length) {
        s.done = true; s.wave = 3; openColumn(s.door, s.top); G.points += 3;
        Snd.seq([0, 4, 7, 12, 16], 659, 0.07, 'triangle', 0.08); burst(s.x, s.gy - 50, 24, ['#ffffff', '#c8e8ff', '#ff7ab8'], 160);
        say('Сніговик готовий! Він махає тобі й відчиняє ворота', 2.8);
      } else if (!G.snowHint) { G.snowHint = true; say('Частинка сніговика! Збери всі — і сніговик оживе', 2.6); }
    }
  }
}

function update25(dt) {
  updateSnowkits(dt);
}

/* ===== Сніговик Хрумко — ювілейний бос: кидає сніжки, а на сонечку трохи підтає ===== */
RUNNERS.bigsnowman = { name: 'Сніговик Хрумко', acc: 'Сніговика Хрумка', win: ' Він більше не бешкетує, а катає всіх на санчатах. Ура, 150 рівнів!', bolt: 'snowball', hello: 'Сніговик Хрумко: «Хрум-хрум! Засиплю всіх сніжками!»', rest: 'Хрумко підтанув на сонечку! Стріляй або стрибни на нього', arm: 'Хрумко надто швидкий! Стріляй, коли він підтане', restText: 'Ой, тану…' };
BOSS2.bigsnowman = L => ({ kind: 'bigsnowman', name: RUNNERS.bigsnowman.name, acc: RUNNERS.bigsnowman.acc, win: RUNNERS.bigsnowman.win, x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 26, hw: 28, hh: 26, hp: 24, max: 24, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, n: 0, tx: 0, vy: 0, hop: 0 });
