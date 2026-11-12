'use strict';
/* ===== Частина 25 «Розумна країна»: приклади на дверях, англійські слова, змішування фарб і Клякса Бризка ===== */
Object.assign(TUNES, {
  numberland: { base: 587.33, ms: 175, n: [0, 2, 4, 5, 7, null, 7, null, 9, 7, 5, 4, 2, null, null, null, 4, 5, 7, 9, 11, null, 11, null, 12, 11, 9, 7, 5, null, null, null], b: [0, -5, -3, -7] },
  abcmeadow: { base: 523.25, ms: 180, n: [0, 0, 7, 7, 9, 9, 7, null, 5, 5, 4, 4, 2, 2, 0, null, 7, 7, 5, 5, 4, 4, 2, null, 7, 7, 5, 5, 4, 4, 2, null], b: [0, -5, -3, -7] },
  colorlab: { base: 659.25, ms: 170, n: [0, 4, 7, 12, 11, 7, 4, null, 2, 5, 9, 14, 12, 9, 5, null, 4, 7, 11, 16, 14, 11, 7, null, 12, null, 7, null, 0, null, null, null], b: [0, -5, -3, -7] },
  smartschool: { base: 698.46, ms: 165, n: [0, 4, 7, 4, 0, 4, 7, 12, 11, 7, 4, 7, 2, null, null, null, 5, 9, 12, 9, 5, 9, 12, 17, 16, 12, 9, 12, 7, null, null, null], b: [0, -5, -3, -7] },
  inkwell: { base: 440, ms: 200, n: [0, null, 3, 7, 10, null, 7, 3, 5, null, 8, 12, 15, null, 12, 8, 7, null, 10, 14, 17, null, 14, 10, 12, null, null, null, 0, null, null, null], b: [0, -4, -2, -5] },
});
const COLORS25 = { red: '#ff4d4d', yellow: '#ffd23f', blue: '#3f8fff', orange: '#ff9a2a', green: '#4cc35a', purple: '#a05ad8' };
const COLOR_UA = { red: 'червоний', yellow: 'жовтий', blue: 'синій', orange: 'помаранчевий', green: 'зелений', purple: 'фіолетовий' };
const COLOR_PL = { red: 'червоні', yellow: 'жовті', blue: 'сині', orange: 'помаранчеві', green: 'зелені', purple: 'фіолетові' };
const MIX_HINT = { orange: 'Помаранчевий — це червона й жовта фарби разом', green: 'Зелений — це жовта й синя фарби разом', purple: 'Фіолетовий — це червона й синя фарби разом', red: 'Потрібна червона фарба', yellow: 'Потрібна жовта фарба', blue: 'Потрібна синя фарба' };
const WORD_UA = { CAT: 'кіт', DOG: 'собака', SUN: 'сонце', FISH: 'рибка', STAR: 'зірка', BEE: 'бджілка' };
function mixName(m) {
  if (!m || !m.length) return '';
  if (m.length === 1) return m[0];
  const s = [...m].sort().join('+');
  return { 'red+yellow': 'orange', 'blue+yellow': 'green', 'blue+red': 'purple' }[s] || m[1];
}

/* ===== Підготовка рівня ===== */
function initLevel20(G, L) {
  const P = G.P; P.mixC = [];
  G.quizzes = (L.quizzes || []).map(q => Object.assign({ solved: false, wrongT: 0, wrongTx: -1, okT: 0 }, q));
  G.words25 = (L.words25 || []).map(w => Object.assign({ got: 0, done: false, hintT: 0 }, w, { letters: w.letters.map(l => Object.assign({ taken: false, wob: 0 }, l)), decoys: w.decoys.map(d => Object.assign({ wob: 0 }, d)) }));
  G.pots = (L.pots || []).map(p => Object.assign({ touch: false, joy: 0 }, p));
  G.cgates = (L.cgates || []).map(g => Object.assign({ open: false, hintT: 0 }, g));
  initLevel21(G, L);
}
function doorTouch(x, top) { const P = G.P; return overlap(P, { x: x * T - 4, y: top * T, w: T + 8, h: (10 - top) * T }); }
function openColumn(x, top) { for (let y = top; y < 10; y++) if (tileAt(x, y) === 2) { G.map[y * G.Wt + x] = 0; burst(x * T + 12, y * T + 12, 5, RAINBOW, 90); } floatText(x * T + 12, 7 * T, 'Відчинено!', '#4cc35a'); }

/* ===== Приклади: стукни знизу кубик із правильною відповіддю ===== */
function updateQuizzes(dt) {
  const P = G.P, h = P.headHit;
  for (const q of G.quizzes) {
    if (q.wrongT > 0) q.wrongT -= dt; if (q.okT > 0) q.okT -= dt; if (q.hintT > 0) q.hintT -= dt;
    if (!q.solved && !(q.hintT > 0) && doorTouch(q.door, q.top)) { q.hintT = 4; say(quizMsg(q, 'hint'), 3.4); }
    if (q.solved || !h || P.flip) continue;
    const o = q.opts.find(o => o.tx === h.tx && o.ty === h.ty);
    if (!o) continue;
    if (o.n === q.ans) {
      q.solved = true; q.okT = 1.5; openColumn(q.door, q.top);
      G.points += 3; floatText(o.tx * T + 12, o.ty * T - 10, '+3', '#4cc35a'); Snd.seq([0, 4, 7, 12], 659, 0.07, 'triangle', 0.08); burst(o.tx * T + 12, o.ty * T, 18, RAINBOW, 150);
      say(quizMsg(q, 'ok'), 2.6);
    } else if (q.wrongT <= 0.3) {
      q.wrongT = 0.8; q.wrongTx = o.tx; Snd.tone(220, 0.2, 'triangle', 0.05, 180);
      say(quizMsg(q, 'bad'), 2.2);
    }
  }
}

/* ===== Англійські слова: збирай літери по черзі ===== */
function updateWords(dt) {
  const P = G.P;
  for (const w of G.words25) {
    if (w.hintT > 0) w.hintT -= dt;
    for (const l of w.letters) if (l.wob > 0) l.wob -= dt;
    for (const d of w.decoys) if (d.wob > 0) d.wob -= dt;
    if (w.done) continue;
    const need = w.w[w.got];
    if (!(w.hintT > 0) && doorTouch(w.door, w.top)) { w.hintT = 4; say('Ці двері відчинить слово ' + w.w + '. Збери літери по черзі: ' + [...w.w].join(', '), 3.4); }
    for (let i = 0; i < w.letters.length; i++) {
      const l = w.letters[i];
      if (l.taken || !overlap(P, { x: l.x - 11, y: l.y - 11, w: 22, h: 22 })) continue;
      if (i === w.got) {
        l.taken = true; w.got++; Snd.star(w.got); burst(l.x, l.y, 10, RAINBOW, 110); G.points++; floatText(l.x, l.y - 14, l.ch, '#3f8fff');
        if (w.got >= w.w.length) { w.done = true; openColumn(w.door, w.top); G.points += 5; Snd.seq([0, 4, 7, 12, 16], 523, 0.07, 'triangle', 0.08); say(w.w + ' — це «' + (WORD_UA[w.w] || '') + '»! Двері відчинилися', 3); }
      } else if (l.wob <= 0) { l.wob = 0.6; wordHint(w, need); }
    }
    for (const d of w.decoys) if (d.wob <= 0 && overlap(P, { x: d.x - 11, y: d.y - 11, w: 22, h: 22 })) { d.wob = 0.6; wordHint(w, need); }
  }
}
function wordHint(w, need) {
  Snd.tone(260, 0.15, 'triangle', 0.05, 200);
  if (w.hintT <= 0) { w.hintT = 2.5; say('Не та літера. Шукай «' + need + '»', 2); }
}

/* ===== Фарби: торкнися двох відерець — вони змішаються ===== */
function updatePots(dt) {
  const P = G.P;
  for (const p of G.pots) {
    if (p.joy > 0) p.joy -= dt;
    const touch = overlap(P, { x: p.x - 11, y: p.gy - 22, w: 22, h: 22 });
    if (touch && !p.touch) {
      const m = P.mixC;
      if (m.includes(p.c)) { p.touch = touch; continue; }
      if (m.length < 2) m.push(p.c); else P.mixC = [p.c];
      p.joy = 0.6; Snd.tone(500, 0.12, 'sine', 0.05, 800); burst(p.x, p.gy - 18, 10, [COLORS25[p.c], '#ffffff'], 100);
      const mix = mixName(P.mixC);
      floatText(P.x + P.w / 2, P.y - 12, COLOR_UA[mix], COLORS25[mix]);
      if (!G.potHint) { G.potHint = true; say('Фарба на гриві! Торкнися ще одного відерця — і фарби змішаються', 2.8); }
    }
    p.touch = touch;
  }
  for (const g of G.cgates) {
    if (g.hintT > 0) g.hintT -= dt;
    if (g.open) continue;
    if (!doorTouch(g.x, g.top)) continue;
    if (mixName(P.mixC) === g.c) { g.open = true; openColumn(g.x, g.top); P.mixC = []; G.points += 2; Snd.seq([0, 7, 12], 659, 0.07, 'triangle', 0.08); say(COLOR_UA[g.c][0].toUpperCase() + COLOR_UA[g.c].slice(1) + '! Ворота забрали фарбу й відчинилися', 2.4); }
    else if (g.hintT <= 0) { g.hintT = 3; say('Ці ворота — ' + COLOR_PL[g.c] + '. ' + MIX_HINT[g.c], 3.4); }
  }
}

function update20(dt) {
  updateQuizzes(dt);
  updateWords(dt);
  updatePots(dt);
  update21(dt);
}

/* ===== Клякса Бризка — ще одна бігунка: бризкає чорнилом, а висохнувши, застигає ===== */
RUNNERS.blot = { name: 'Клякса Бризка', acc: 'Кляксу Бризку', win: ' Тепер вона стала гарним малюнком, а всі підказки знову чисті.', bolt: 'ink', hello: 'Клякса Бризка: «Бризь-бризь! Заляпаю всі приклади!»', rest: 'Клякса висохла й застигла! Стріляй або стрибни на неї', arm: 'Клякса надто мокра й слизька! Стріляй, коли вона висохне', restText: 'Сохну…' };
BOSS2.blot = L => ({ kind: 'blot', name: RUNNERS.blot.name, acc: RUNNERS.blot.acc, win: RUNNERS.blot.win, x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 26, hw: 28, hh: 26, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, n: 0, tx: 0, vy: 0, hop: 0 });
