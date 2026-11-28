'use strict';
/* ===== Частина 39 «Свято Миколая»: Підкови Оленятка (ривок), бурульки-сходинки, «Що буває взимку?» і Гном Бурчик ===== */
Object.assign(TUNES, {
  gingertown: { base: 659.25, ms: 170, n: [0, 0, 0, null, 0, 0, 0, null, 0, 3, -4, -2, 0, null, null, null, 1, 1, 1, 1, 1, 0, 0, 0, 0, -2, -2, 0, -2, null, 3, null], b: [0, -4, -7, -5] },
  deerpath: { base: 587.33, ms: 185, n: [0, 4, 7, null, 12, null, 7, 4, 5, null, 9, null, 7, null, null, null, 4, 7, 12, null, 11, 9, 7, null, 5, 4, 2, null, 0, null, null, null], b: [0, -5, -3, -7] },
  iciclecave: { base: 493.88, ms: 220, n: [12, null, 7, null, 11, null, 7, null, 9, null, 4, null, 7, null, null, null, 12, 14, 12, 11, 9, null, 7, null, 4, 5, 7, null, 0, null, null, null], b: [0, -3, -7, -5] },
  // «Щедрик» Миколи Леонтовича (1916) — головний мотив
  nicholasfair: { base: 554.37, ms: 190, n: [0, -1, 0, -3, 0, -1, 0, -3, 0, -1, 0, -3, 0, -1, 0, -3, 5, 4, 5, 2, 5, 4, 5, 2, 3, 2, 3, 0, 3, 2, 3, 0], b: [0, 0, -4, -5] },
  gnomeattic: { base: 523.25, ms: 160, n: [0, 4, 7, 4, 0, null, 7, null, 5, 9, 12, 9, 5, null, 12, null, 4, 7, 11, 7, 4, null, 11, null, 2, 5, 9, 5, 7, null, null, null], b: [0, -3, -5, -7] },
});
STICKERS.push(
  { id: 'gingertown', k: 'ginger39', name: 'Пряничок' },
  { id: 'deerpath', k: 'horseshoe39', name: 'Підкова Оленятка' },
  { id: 'iciclecave', k: 'icicle39', name: 'Бурулька' },
  { id: 'nicholasfair', k: 'mitten39', name: 'Рукавичка' },
  { id: 'gnomeattic', k: 'gnome39', name: 'Гном Бурчик' },
);
const WINTER_OK = { snowman: 'Сніговика ліплять узимку', sled: 'На санчатах катаються взимку', mittens: 'Рукавички вдягають узимку', firtree: 'Ялинку прикрашають узимку' };
const DASH_T = 0.24, DASH_SPEED = 520, ICICLE_SHAKE = 0.7, ICICLE_LEN = 30;

/* ===== Підготовка рівня ===== */
function initLevel34(G, L) {
  G.icicles = (L.icicles || []).map(q => ({ col: q.col, x: q.col * T + 12, y0: q.row * T, y: q.row * T, vy: 0, state: 'hang', st: 0, shard: 0, n: q.n || 1, made: 0 }));
  G.iceBlocks = [];
  G.iceHint = false;
  G.P.dashPow = false; G.P.dashT = 0; G.P.dashUsed = false;
}

/* ===== Підкови Оленятка: у стрибку «Ріг» — ривок уперед ===== */
function dashStep(P, dt) {
  P.dashT -= dt; P.shootCd -= dt; if (P.inv > 0) P.inv -= dt;
  const sp = DASH_SPEED * P.dir * dt;
  if (boxSolid(P.x + sp, P.y, P.w, P.h) || P.x + sp < 0 || P.x + sp + P.w > G.L.w * T) { P.dashT = 0; }
  else P.x += sp;
  if (G.arenaLock && G.arena) P.x = Math.max(G.arena.x0, Math.min(G.arena.x1 - P.w, P.x));
  P.vx = P.dir * SPEED; P.vy = 0; P.onGround = false; P.onMover = null; P.t += dt * 1.5;
  if (Math.random() < dt * 50) burst(P.x + P.w / 2 - P.dir * 10, P.y + P.h / 2 + (Math.random() - 0.5) * 16, 1, ['#ffe14d', '#ffffff', '#ffb0d8'], 30);
}
function updateDash(dt) {
  const P = G.P;
  if (P.onGround || P.hang || P.hook || P.vine || waterAt(P.x + P.w / 2, P.y + P.h / 2)) P.dashUsed = false;
  if (!P.dashPow || !In.shootP || P.onGround || P.dashUsed || P.dashT > 0) return;
  if (P.inCannon || P.zip || P.kite || P.swing || P.bub || P.hotair || P.plane || P.hang || P.hook || P.flip || P.sled || P.mount) return;
  if (waterAt(P.x + P.w / 2, P.y + P.h / 2)) return;
  P.dashT = DASH_T; P.dashUsed = true; P.charging = false; P.charge = 0; P.vy = 0;
  Snd.tone(500, 0.14, 'triangle', 0.06, 1100); Snd.tone(1200, 0.08, 'sine', 0.03, 1800);
  burst(P.x + P.w / 2, P.y + P.h / 2, 8, ['#ffe14d', '#ffffff', '#ffb0d8'], 90);
  if (!G.dashHint) { G.dashHint = true; say('Ривок! Підкови Оленятка штовхнули вперед. На землі вони знову готові', 2.6); }
}

/* ===== Бурульки: тремтять, падають і стають крижаною сходинкою ===== */
function icicleLand(q) {
  const ty = Math.floor((q.y + ICICLE_LEN) / T);
  return solid(tileAt(q.col, ty)) ? ty : -1;
}
function updateIcicles(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const q of G.icicles) {
    q.st += dt; if (q.shard > 0) q.shard -= dt;
    if (q.state === 'hang' || q.state === 'shake') {
      // постріл збиває бурульку одразу
      for (const s of G.shots) if (s.life > 0 && Math.abs(s.x - q.x) < 10 + (s.r || 4) && s.y > q.y0 - 4 && s.y < q.y0 + ICICLE_LEN + 4) { s.life = 0; q.state = 'fall'; q.st = 0; q.vy = 60; Snd.tink(); }
    }
    if (q.state === 'hang') {
      if (Math.abs(pcx - q.x) < 1.4 * T && P.y > q.y0) {
        q.state = 'shake'; q.st = 0; Snd.tone(1500, 0.18, 'triangle', 0.04, 1700);
        if (!G.iceHint) { G.iceHint = true; say('Бурулька тремтить — відійди! Де вона встромиться в сніг, там буде крижана сходинка', 3); }
      }
    } else if (q.state === 'shake') {
      if (q.st >= ICICLE_SHAKE) { q.state = 'fall'; q.st = 0; q.vy = 40; Snd.tone(900, 0.2, 'sine', 0.04, 300); }
    } else if (q.state === 'fall') {
      q.vy = Math.min(900, q.vy + 1400 * dt); q.y += q.vy * dt;
      const hit = { x: q.x - 6, y: q.y + 4, w: 12, h: ICICLE_LEN - 4 };
      if (overlap(P, hit)) { hurtPlayer(false); q.state = 'regrow'; q.st = 0; q.shard = 0.6; burst(q.x, q.y + ICICLE_LEN, 12, ['#ffffff', '#cfeeff', '#9fdcff'], 140); Snd.tink(); continue; }
      const ty = icicleLand(q);
      if (ty >= 0) {
        const br = ty - 1, box = { x: q.col * T, y: br * T, w: T, h: T };
        if (br < 1 || overlap(P, box) || solid(tileAt(q.col, br))) { q.state = 'regrow'; q.st = 0; q.shard = 0.6; burst(q.x, ty * T, 12, ['#ffffff', '#cfeeff'], 140); Snd.tink(); continue; }
        // крижана сходинка; якщо бурулька ще відросте — наступна ляже зверху
        G.map[br * G.Wt + q.col] = 2; G.iceBlocks.push({ col: q.col, row: br }); q.made++; q.st = 0; q.y = q.y0;
        q.state = q.made < q.n ? 'regrow' : 'done';
        if (q.made === 2 && !G.stackHint) { G.stackHint = true; say('Дві бурульки — висока крижана сходинка!', 2.2); }
        Snd.tone(300, 0.12, 'square', 0.05, 160); burst(q.x, ty * T, 14, ['#ffffff', '#cfeeff', '#9fdcff'], 150);
      }
      if (q.y > VIEW_H + 40) { q.state = 'regrow'; q.st = 0; }
    } else if (q.state === 'regrow') {
      q.y = q.y0;
      if (q.st > 2.6) { q.state = 'hang'; q.st = 0; }
    }
  }
}

function update34(dt) {
  updateDash(dt);
  updateIcicles(dt);
}

/* ===== Бонус «Підкови Оленятка» ===== */
POW17.dash = 1;
const powerUp17base39 = powerUp17;
powerUp17 = function (P, p) {
  if (p.k === 'dash') { P.dashPow = true; Snd.seq([0, 4, 7, 12, 16], 587, 0.06, 'triangle', 0.07); say('Підкови Оленятка! Стрибни й у повітрі натисни «Ріг» — буде ривок уперед. Діють до кінця рівня', 3.6); return; }
  powerUp17base39(P, p);
};

/* ===== «Що буває взимку?» ===== */
const quizMsg38 = quizMsg;
quizMsg = function (q, what) {
  if (q.kind === 'winter') return {
    hint: 'Що з цього буває взимку? Стукни головою знизу кубик із зимовою річчю',
    ok: 'Правильно! ' + WINTER_OK[q.ans] + '. Двері відчинилися',
    bad: 'Ой, ні. Це буває влітку. Пошукай зимове',
  }[what];
  return quizMsg38(q, what);
};

/* ===== Гном Бурчик: ховається в одній із трьох коробок і тасує їх ===== */
const GBOX_W = 44, GBOX_H = 40;
BOSS2.gnome = L => {
  const x0 = L.arena.x0, slots = [x0 + 8 * T, x0 + 12 * T, x0 + 16 * T];
  return { kind: 'gnome', name: 'Гном Бурчик', acc: 'Гнома Бурчика', win: ' Тепер Бурчик допомагає Миколаю пакувати подарунки.', x: slots[1], y: 10 * T - GBOX_H - 18, gy: 10 * T, hw: 14, hh: 18, hp: 24, max: 24, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1,
    slots, boxes: slots.map((s, i) => ({ x: s, y: 0, slot: i, jack: 0, wig: 0, col: i })), box: 1, swaps: [], n: 0, hx: slots[1], hy: 0 };
};
function gnomeHide(B, to) {
  B.state = 'hide'; B.st = 0; B.hx0 = B.x; B.hy0 = B.y; B.box = to; B.y = B.y;
}
function gnomeShuffle(B) {
  const angry = B.hp <= B.max / 2, n = angry ? 5 : 3; B.swaps = [];
  let last = -1;
  for (let i = 0; i < n; i++) { let a, b; do { a = Math.floor(Math.random() * 3); b = (a + 1 + Math.floor(Math.random() * 2)) % 3; } while (a * 3 + b === last); last = a * 3 + b; B.swaps.push([a, b]); }
  B.state = 'shuffle'; B.st = 0; B.si = 0; B.sdur = angry ? 0.46 : 0.62;
  for (const b of B.boxes) b.sx = b.x;
}
function gnomeJudge(B, i) {
  const b = B.boxes[i];
  if (i === B.box) {
    B.state = 'dizzy'; B.st = 0; B.hpB = B.hp; B.x = b.x - 30 * (b.x > (B.slots[0] + B.slots[2]) / 2 ? 1 : -1); B.y = B.gy - 18;
    b.jack = 0.01; Snd.seq([0, 7, 12], 523, 0.07, 'square', 0.05); burst(b.x, B.gy - GBOX_H, 16, ['#ffe14d', '#ff7ab8', '#ffffff'], 160);
    say(G.gnomeHit ? 'Знайшла Бурчика!' : 'Знайшла! Бурчик запаморочився — стріляй або стрибай на нього!', 2.6); G.gnomeHit = true;
  } else {
    b.jack = 1.4; Snd.boing(); say('Порожньо! Там лише іграшка на пружинці. Бурчик в іншій коробці', 2.4);
    gnomeTease(B);
  }
}
function gnomeTease(B) {
  const b = B.boxes[B.box]; B.state = 'tease'; B.st = 0; B.x = b.x; B.y = B.gy - GBOX_H - 18; B.shots = 0; b.jack = Math.max(b.jack, 0.01);
}
function updateGnomeBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena, pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  for (const b of B.boxes) { if (b.jack > 0 && b.jack < 5) b.jack = Math.max(0, b.jack - dt); if (b.wig > 0) b.wig -= dt; }
  if (B.dead) {
    B.deadT += dt; B.state = 'happy'; B.y += (B.gy - 18 - B.y) * Math.min(1, dt * 4);
    for (const b of B.boxes) b.jack = 9; return;
  }
  if (!G.bossActive) {
    B.x = B.boxes[1].x; B.y = B.gy - GBOX_H - 18;
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'intro'; B.st = 0; Music.start('boss'); G.flash = 0.3; say('Гном Бурчик: «Хе-хе! Подарунки Миколая тепер мої! Вгадай, у якій я коробці!»', 3); }
    return;
  }
  B.st += dt;
  if (B.state === 'intro') { B.dir = pcx > B.x ? 1 : -1; if (B.st > 1.8) gnomeHide(B, Math.floor(Math.random() * 3)); }
  else if (B.state === 'hide') {
    // стрибає дугою в коробку, кришка закривається
    const b = B.boxes[B.box], k = Math.min(1, B.st / 0.6);
    B.x = B.hx0 + (b.x - B.hx0) * k; B.y = B.hy0 + ((B.gy - GBOX_H + 6) - B.hy0) * k - Math.sin(k * Math.PI) * 50;
    if (k >= 1) { Snd.tone(300, 0.08, 'square', 0.04); gnomeShuffle(B); B.y = -500; }
  } else if (B.state === 'shuffle') {
    B.y = -500;
    const sw = B.swaps[B.si];
    if (!sw) { B.state = 'guess'; B.st = 0; B.nextWig = 1.5; if (!G.gnomeGuessHint) { G.gnomeGuessHint = true; say('Де Бурчик? Стрельни в коробку або стрибни на неї зверху!', 2.8); } for (const b of B.boxes) { b.y = 0; b.sx = b.x; } return; }
    const k = Math.min(1, (B.st) / B.sdur), [ia, ib] = sw, ba = B.boxes[ia], bb = B.boxes[ib];
    if (B.st < dt * 1.5) Snd.tone(700 + B.si * 60, 0.06, 'triangle', 0.035);
    const e = k < 0.5 ? 2 * k * k : 1 - 2 * (1 - k) * (1 - k);
    ba.x = ba.sx + (bb.sx - ba.sx) * e; bb.x = bb.sx + (ba.sx - bb.sx) * e;
    ba.y = -Math.sin(k * Math.PI) * 46; bb.y = -Math.sin(k * Math.PI) * 10;
    if (k >= 1) { ba.x = bb.sx; bb.x = ba.sx; ba.y = bb.y = 0; ba.sx = ba.x; bb.sx = bb.x; B.si++; B.st = 0; }
  } else if (B.state === 'guess') {
    B.y = -500;
    // коробка з Бурчиком час від часу підстрибує й хихикає
    if (B.st > B.nextWig) { B.nextWig = B.st + 1.6; B.boxes[B.box].wig = 0.35; Snd.tone(1300, 0.05, 'sine', 0.03, 1600); }
    for (let i = 0; i < 3; i++) {
      const b = B.boxes[i], top = B.gy - GBOX_H, rect = { x: b.x - GBOX_W / 2, y: top, w: GBOX_W, h: GBOX_H };
      let hit = false;
      for (const s of G.shots) if (s.life > 0 && s.x > rect.x - (s.r || 4) && s.x < rect.x + rect.w + (s.r || 4) && s.y > rect.y && s.y < rect.y + rect.h) { s.life = 0; hit = true; }
      if (!hit && P.vy > 60 && P.x + P.w > rect.x + 4 && P.x < rect.x + rect.w - 4 && P.y + P.h >= top - 2 && P.y + P.h <= top + 16) { hit = true; P.vy = -440; P.y = top - P.h; P.cut = true; }
      if (hit) { gnomeJudge(B, i); return; }
    }
    if (B.st > 7) { say('Бурчик: «Хе-хе, не вгадала!»', 2); gnomeTease(B); }
  } else if (B.state === 'tease') {
    const b = B.boxes[B.box]; B.x = b.x; B.y = B.gy - GBOX_H - 18; B.dir = pcx > B.x ? 1 : -1;
    if (B.st > 0.45 + B.shots * 0.4 && B.shots < (angry ? 4 : 3)) {
      B.shots++;
      const tt = 0.9, vx = Math.max(-240, Math.min(240, (pcx - B.x) / tt));
      G.bolts.push({ kind: 'bauble', x: B.x, y: B.y - 10, vx, vy: -380, g: 760, r: 7, t: 0, c: ['#ff4f7a', '#4cb6ff', '#ffd23f', '#7fe08a'][B.shots % 4] });
      Snd.tone(900, 0.08, 'triangle', 0.04, 600);
    }
    if (B.st > 2.1) gnomeHide(B, Math.floor(Math.random() * 3));
  } else if (B.state === 'dizzy') {
    B.dir = pcx > B.x ? 1 : -1;
    const box = { x: B.x - 16, y: B.y - 18, w: 32, h: 36 };
    if (overlap(P, box) && P.vy > 40 && P.y + P.h - box.y < 18) { hitBoss(3); P.vy = -480; P.cut = true; }
    if (B.st > (angry ? 2.8 : 3.2) || B.hpB - B.hp >= 8) { B.boxes[B.box].jack = 0; gnomeHide(B, Math.floor(Math.random() * 3)); }
  }
}
SHOOTABLE.bauble = 1;
const armored19base39 = armored19;
armored19 = function (s, B) {
  if (B.kind === 'gnome') {
    if (B.state === 'dizzy' && !(B.hpB - B.hp >= 8)) return false;
    Snd.tink(); s.life = 0; return true;
  }
  return armored19base39(s, B);
};
const resetBoss19base39 = resetBoss19;
resetBoss19 = function (B) {
  if (B.kind === 'gnome') return;
  resetBoss19base39(B);
};
