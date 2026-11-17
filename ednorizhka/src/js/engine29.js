'use strict';
/* ===== Частина 34 «Перегони й тіні»: зайчик Шустрик, тінь-подружка, альбом наліпок і Кролик Фокус-Покус ===== */
Object.assign(TUNES, {
  racestadium: { base: 659.25, ms: 140, n: [0, 4, 7, 12, 7, 4, 0, 4, 2, 5, 9, 14, 9, 5, 2, 5, 4, 7, 11, 16, 11, 7, 4, 7, 12, null, 12, null, 0, null, null, null], b: [0, -5, -3, -7] },
  shadowcastle: { base: 440, ms: 190, n: [0, null, 3, null, 7, 8, 7, null, 3, null, 0, null, -2, null, 0, null, 3, null, 7, null, 10, 12, 10, null, 7, null, 3, null, 0, null, null, null], b: [0, -4, -2, -5] },
  balloonvalley: { base: 587.33, ms: 175, n: [0, 4, 7, 9, 7, 4, 2, null, 4, 7, 9, 12, 9, 7, 4, null, 5, 9, 12, 14, 12, 9, 5, null, 4, 2, 0, null, 0, null, null, null], b: [0, -5, -3, -7] },
  snowrace: { base: 698.46, ms: 145, n: [0, 2, 4, 7, 4, 2, 0, null, 0, 2, 4, 7, 9, 7, 4, null, 5, 7, 9, 12, 9, 7, 5, null, 4, 5, 7, 12, 7, null, null, null], b: [0, -5, -3, -7] },
  magicshow: { base: 523.25, ms: 160, n: [0, 3, 7, 3, 8, 7, 3, null, 0, 3, 7, 12, 10, 8, 7, null, 5, 8, 12, 8, 10, 8, 7, null, 3, 2, 0, null, -5, null, 0, null], b: [0, -5, -4, -7] },
});
Object.assign(THORN_MSG, { snowrace: 'Ой, крижані шипи! Перестрибуй їх на санчатах', balloonvalley: 'Ой, колючки! Через них перелітай на повітряній кулі' });

/* ===== Наліпки: по одній у кожній країні частин 33 і 34 ===== */
const STICKERS = [
  { id: 'sunmoonvale', k: 'sunmoon', name: 'Сонце й місяць' },
  { id: 'secretwood', k: 'key', name: 'Золотий ключик' },
  { id: 'wavebeach', k: 'shell', name: 'Мушля' },
  { id: 'nightfair', k: 'icecream', name: 'Морозиво' },
  { id: 'bamboogrove', k: 'panda', name: 'Панда' },
  { id: 'racestadium', k: 'medal', name: 'Медаль' },
  { id: 'shadowcastle', k: 'crown', name: 'Корона' },
  { id: 'balloonvalley', k: 'balloon', name: 'Повітряна куля' },
  { id: 'snowrace', k: 'snowflake', name: 'Сніжинка' },
  { id: 'magicshow', k: 'rabbit', name: 'Кролик у капелюсі' },
];
function stickerOf(id) { return STICKERS.find(s => s.id === id) || null; }
function hasSticker(id) { return !!(save.stickers && save.stickers[id]); }

/* ===== Підготовка рівня ===== */
const RACE_V = 128, TWIN_D = 1.3;
function initLevel29(G, L) {
  G.races = (L.races || []).map(r => ({ x0: r.x0, x1: r.x1, state: 'wait', st: 0, won: null, b: { x: r.x0 * T + 30, y: r.gy - 26, w: 18, h: 26, vx: 0, vy: 0, onGround: true }, safe: null, lastX: 0, stuck: 0, t: 0, jumpT: 0 }));
  G.twins = (L.twins || []).map(w => Object.assign({}, w));
  G.twin = null;
  G.splates = (L.splates || []).map(p => Object.assign({ down: false, dt: 0 }, p));
  G.sgates = (L.sgates || []).map(g => Object.assign({ open: false }, g));
  const def = G.def || {}, st = stickerOf(def.id);
  G.stickers = (L.stickers || []).map(s => ({ x: s.x, y: s.y, k: st ? st.k : 'medal', name: st ? st.name : '', got: false, had: hasSticker(def.id) }));
}

/* ===== Перегони із зайчиком Шустриком ===== */
function raceGround(x) {
  for (let tx = Math.floor(x / T) + 1; tx < Math.floor(x / T) + 14; tx++)
    for (let ty = 2; ty < 12; ty++) if (solid(tileAt(tx, ty)) && !solid(tileAt(tx, ty - 1)) && !solid(tileAt(tx, ty - 2))) return { x: tx * T + 3, y: ty * T - 26 };
  return null;
}
function updateRaces(dt) {
  const P = G.P, pcx = P.x + P.w / 2;
  for (const r of G.races) {
    const b = r.b; r.t += dt;
    if (r.state === 'wait') {
      b.vy = Math.min(b.vy + GRAV * dt, 620); b.vx = 0; moveBody(b, dt);
      if (pcx > r.x0 * T - T && pcx < r.x1 * T) {
        r.state = 'run'; r.st = 0; r.safe = { x: b.x, y: b.y }; r.lastX = b.x;
        Snd.seq([0, 0, 7], 523.25, 0.12, 'square', 0.05);
        say(G.raceHint ? 'Шустрик: «Знову наввипередки! Руш!»' : 'Зайчик Шустрик: «Наввипередки до прапорця з написом ФІНІШ! Руш!»', 2.6); G.raceHint = true;
      }
      continue;
    }
    if (r.state === 'run') {
      r.st += dt;
      if (pcx < r.x0 * T - 4 * T) { r.state = 'wait'; b.x = r.x0 * T + 30; b.y = r.safe ? r.safe.y : b.y; b.vx = 0; continue; }
      b.vx = RACE_V; r.jumpT -= dt;
      if (b.onGround && r.jumpT <= 0) {
        const fx = Math.floor((b.x + b.w + 8) / T), feet = Math.floor((b.y + b.h + 2) / T);
        const wall = solid(tileAt(fx, Math.floor((b.y + b.h - 4) / T))) || solid(tileAt(fx, Math.floor((b.y + 6) / T)));
        let gap = true; for (let k = 0; k < 3; k++) { const v = tileAt(Math.floor((b.x + b.w + 12) / T), feet + k); if (solid(v) || v === 3) { gap = false; break; } }
        if (wall || gap) { b.vy = -JUMP; b.onGround = false; r.jumpT = 0.2; }
      }
      b.vy = Math.min(b.vy + GRAV * dt, 620);
      moveBody(b, dt);
      if (b.onGround && solid(tileAt(Math.floor((b.x + b.w / 2) / T), Math.floor((b.y + b.h + 2) / T)))) r.safe = { x: b.x, y: b.y };
      // застряг або впав — стрибне далі
      r.stuck = b.x - r.lastX < 0.4 ? r.stuck + dt : 0; r.lastX = b.x;
      if (r.stuck > 0.6 && b.onGround) { b.vy = -760; b.onGround = false; }
      if (r.stuck > 1.6 || b.y > VIEW_H + 30) { const g = raceGround(r.safe ? r.safe.x : b.x); if (g) { b.x = g.x; b.y = g.y; b.vy = 0; burst(b.x + 9, b.y + 13, 8, ['#ffffff', '#ffd0e0'], 90); } r.stuck = 0; }
      if (pcx > r.x1 * T + 12 && r.won == null) {
        r.won = true; r.state = 'slow';
        const s = { x: pcx, y: P.y + 6, rainbow: true, got: false }; G.stars.push(s); collect(s);
        Snd.seq([0, 4, 7, 12, 16], 659.25, 0.08, 'triangle', 0.07); burst(pcx, P.y, 22, RAINBOW, 170);
        say('Ура! Ти обігнала Шустрика! Тримай веселкову зірочку', 2.8);
      } else if (b.x > r.x1 * T + 12 && r.won == null) {
        r.won = false; r.state = 'done'; Snd.seq([7, 4, 0], 523.25, 0.1, 'triangle', 0.05);
        say('Шустрик добіг першим! Нічого, наступного разу пощастить', 2.6);
      }
    } else if (r.state === 'slow') {
      // програв — ще трохи біжить і зупиняється біля фінішу
      b.vx = Math.max(0, Math.min(RACE_V, (r.x1 * T + 40 - b.x) * 3)); b.vy = Math.min(b.vy + GRAV * dt, 620); moveBody(b, dt);
      if (b.y > VIEW_H + 30) { const g = raceGround(b.x); if (g) { b.x = g.x; b.y = g.y; } }
    } else if (r.state === 'done') {
      b.vx = 0; b.vy = Math.min(b.vy + GRAV * dt, 620); moveBody(b, dt);
    }
  }
}

/* ===== Тінь-подружка: повторює все за єдиноріжкою й натискає тіньові кнопки ===== */
function updateTwin(dt) {
  const P = G.P;
  for (const w of G.twins) if (!w.used && overlap(P, { x: w.x * T - 2, y: w.gy - 40, w: 28, h: 40 })) {
    w.used = true;
    if (!G.twin) {
      G.twin = { hist: [], t: 0, x: P.x, y: P.y, dir: P.dir, air: false, run: 0, pt: 0, k: 0 };
      Snd.seq([12, 7, 3, 0], 392, 0.09, 'triangle', 0.06); burst(P.x + 11, P.y + 15, 18, ['#7a5ad8', '#c8b8ff', '#ffffff'], 140);
      say('Тінь-подружка! Вона повторює все за тобою. Темні кнопки з місяцем може натиснути тільки вона', 3.6);
    }
  }
  const tw = G.twin; if (!tw) return;
  tw.t += dt; tw.k = Math.min(1, tw.k + dt * 2);
  tw.hist.push({ t: tw.t, x: P.x, y: P.y, dir: P.dir, air: !P.onGround, run: P.onGround ? Math.min(1, Math.abs(P.vx) / SPEED) : 0, pt: P.t });
  while (tw.hist.length > 2 && tw.hist[1].t <= tw.t - TWIN_D) tw.hist.shift();
  const h = tw.hist[0];
  // після падіння в яму тінь не стрибає назад через пів екрана — з'являється поруч
  if (Math.abs(h.x - tw.x) > 3 * T || Math.abs(h.y - tw.y) > 3 * T) burst(h.x + 11, h.y + 15, 6, ['#7a5ad8', '#c8b8ff'], 80);
  tw.x = h.x; tw.y = h.y; tw.dir = h.dir; tw.air = h.air; tw.run = h.run; tw.pt = h.pt;
  const box = { x: tw.x, y: tw.y, w: P.w, h: P.h };
  for (const p of G.splates) {
    const on = overlap(box, { x: p.x * T + 2, y: p.gy - 6, w: T - 4, h: 8 });
    if (on && !p.down) {
      p.down = true; Snd.tone(330, 0.1, 'square', 0.05, 220);
      for (const g of G.sgates) if (g.plate === p.id && !g.open) {
        g.open = true; openColumn(g.x, 1);
        say(G.twinGateHint ? 'Тінь відчинила ворота!' : 'Тінь натиснула кнопку — ворота відчинилися!', 2.2); G.twinGateHint = true;
      }
    }
  }
  // підказка, якщо єдиноріжка стоїть біля зачинених тіньових воріт без тіні
  for (const g of G.sgates) if (!g.open && doorTouch(g.x, 1) && !(g.hintT > 0)) { g.hintT = 4; say('Ці ворота відчиняє тіньова кнопка. Зачекай, поки тінь на неї стане', 2.6); }
  for (const g of G.sgates) if (g.hintT > 0) g.hintT -= dt;
}
function updateTwinGates0(dt) {
  if (G.twin) return;
  for (const g of G.sgates) { if (g.hintT > 0) g.hintT -= dt; if (!g.open && doorTouch(g.x, 1) && !(g.hintT > 0)) { g.hintT = 4; say('Ці ворота відчиняє тільки тінь. Знайди чарівне дзеркальце — і тінь піде за тобою', 2.8); } }
}

/* ===== Наліпки ===== */
function updateStickers(dt) {
  const P = G.P;
  for (const s of G.stickers) {
    if (s.got || !overlap(P, { x: s.x - 13, y: s.y - 13, w: 26, h: 26 })) continue;
    s.got = true; G.points += 3; burst(s.x, s.y, 20, RAINBOW, 150); floatText(s.x, s.y - 18, 'Наліпка!', '#ff4fa3');
    Snd.seq([0, 4, 7, 12, 16, 19], 784, 0.06, 'triangle', 0.07);
    if (s.had) say('Наліпка «' + s.name + '» вже є в альбомі. Молодець, знову знайшла!', 2.6);
    else {
      save.stickers = save.stickers || {}; save.stickers[G.def.id] = 1; writeSave();
      const n = Object.keys(save.stickers).length;
      say('Наліпка «' + s.name + '»! Вона вже в альбомі на мапі. Зібрано ' + n + ' з ' + STICKERS.length, 3);
    }
  }
}

function update29(dt) {
  updateRaces(dt);
  updateTwin(dt); updateTwinGates0(dt);
  updateStickers(dt);
}

/* ===== Кролик Фокус-Покус: ховається під одним із трьох капелюхів і перемішує їх ===== */
SHOOTABLE.dove = 1;
const HAT_SWAPS = [3, 4, 5, 5, 6, 7, 7, 8];
BOSS2.hatrabbit = L => {
  const x0 = L.arena.x0, hx = [x0 + 8 * T, x0 + 11.5 * T, x0 + 15 * T];
  return { kind: 'hatrabbit', name: 'Кролик Фокус-Покус', acc: 'Кролика Фокус-Покуса', win: ' Тепер він показує всім добрі фокуси й дістає з капелюха цукерки.', x: hx[1], gy: 10 * T, y: 10 * T - 70, hw: 4, hh: 4, hp: 24, max: 24, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1,
    slots: hx, hats: hx.map((x, i) => ({ x, y: 0, slot: i, lift: 0, wig: 0 })), hat: 1, round: 0, swaps: 0, sw: null, pick: -1, peek: 0, laugh: 0, pop: 0 };
};
function hatBox(B, h) { return { x: h.x - 20, y: B.gy - 34 + h.y - h.lift * 48, w: 40, h: 34 }; }
function hatPick(B, i) {
  if (B.state !== 'pick') return;
  B.pick = i; B.st = 0;
  if (i === B.hat) {
    B.state = 'found'; hitBoss(4);
    if (!B.dead) { Snd.seq([0, 4, 7, 12], 659.25, 0.07, 'triangle', 0.07); say(B.round === 0 ? 'Знайшла! Кролик запаморочився від здивування' : ['Знайшла!', 'Ура, вгадала!', 'Знову знайшла!'][B.round % 3], 2); }
  } else {
    B.state = 'miss'; Snd.seq([4, 0], 330, 0.1, 'square', 0.05);
    const P = G.P, h = B.hats[i], dir = P.x + P.w / 2 < h.x ? -1 : 1, n = B.hp <= B.max / 2 ? 2 : 1;
    for (let k = 0; k < n; k++) G.bolts.push({ kind: 'dove', x: h.x, y: B.gy - 46 - k * 26, vx: dir * (150 + k * 30), vy: 0, r: 9, t: 0 });
    say('Ой, порожньо! Звідти вилетів голуб — перестрибни його або влуч рогом', 2.4);
  }
}
function updateHatBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt; if (B.laugh > 0) B.laugh -= dt;
  for (const h of B.hats) { h.lift = Math.max(0, h.lift - dt * 3); if (h.wig > 0) h.wig -= dt; }
  const rabbitHat = B.hats[B.hat];
  B.x = rabbitHat.x;
  if (B.dead) { B.deadT += dt; rabbitHat.lift = 1; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'show'; B.st = 0; Music.start('boss'); say('Кролик Фокус-Покус: «Я сховаюся під капелюхом. А ти слідкуй, під яким!»', 3); G.flash = 0.3; }
    return;
  }
  B.st += dt;
  const fast = B.hp <= B.max / 2;
  if (B.state === 'show') {
    rabbitHat.lift = 1; B.pop = Math.min(1, B.st * 4);
    if (B.st > 1.5) { B.state = 'hide'; B.st = 0; }
  } else if (B.state === 'hide') {
    rabbitHat.lift = Math.max(0, 1 - B.st * 3); B.pop = Math.max(0, 1 - B.st * 3);
    if (B.st > 0.5) { B.state = 'shuffle'; B.st = 0; B.swaps = HAT_SWAPS[Math.min(HAT_SWAPS.length - 1, B.round)]; B.sw = null; }
  } else if (B.state === 'shuffle') {
    const dur = Math.max(0.32, (fast ? 0.55 : 0.75) - B.round * 0.04);
    if (!B.sw) {
      if (B.swaps <= 0) { B.state = 'pick'; B.st = 0; B.peek = 0; say(B.round === 0 ? 'Де кролик? Стрибни на капелюх або влуч у нього рогом' : 'Де кролик?', 2.2); }
      else {
        let a = Math.floor(Math.random() * 3), b2 = (a + 1 + Math.floor(Math.random() * 2)) % 3;
        const ia = B.hats.findIndex(h => h.slot === a), ib = B.hats.findIndex(h => h.slot === b2);
        B.sw = { ia, ib, xa: B.hats[ia].x, xb: B.hats[ib].x, t: 0, dur }; B.swaps--; Snd.tone(520 + Math.random() * 120, 0.06, 'triangle', 0.04);
      }
    }
    if (B.sw) {
      const s = B.sw; s.t += dt; const k = Math.min(1, s.t / s.dur), e = k * k * (3 - 2 * k);
      const ha = B.hats[s.ia], hb = B.hats[s.ib];
      ha.x = s.xa + (s.xb - s.xa) * e; ha.y = -Math.sin(Math.PI * e) * 34;
      hb.x = s.xb + (s.xa - s.xb) * e; hb.y = 0;
      if (k >= 1) { const sa = ha.slot; ha.slot = hb.slot; hb.slot = sa; ha.x = B.slots[ha.slot]; hb.x = B.slots[hb.slot]; ha.y = hb.y = 0; B.sw = null; }
    }
  } else if (B.state === 'pick') {
    // давно не вибирає — з потрібного капелюха визирають вушка
    if (B.st > 7 && B.peek === 0) { B.peek = 1; say('Ой, з одного капелюха визирнули вушка!', 2.2); }
    if (B.peek) rabbitHat.wig = 0.2;
    for (let i = 0; i < 3; i++) {
      const hb = hatBox(B, B.hats[i]);
      for (const s of G.shots) if (s.life > 0 && circleRect(s, hb, 2)) { s.life = 0; hatPick(B, i); break; }
      if (B.state !== 'pick') break;
      if (overlap(P, hb) && P.vy > 40 && P.y + P.h - hb.y < 18) { P.vy = -470; P.cut = true; hatPick(B, i); break; }
    }
  } else if (B.state === 'found') {
    rabbitHat.lift = 1; B.pop = 1;
    if (B.st > 1.8) { B.round++; B.state = 'hide'; B.st = 0; }
  } else if (B.state === 'miss') {
    B.hats[B.pick].lift = Math.min(1, B.st * 4);
    if (B.st > 0.6) { rabbitHat.lift = 1; B.pop = 1; if (B.laugh <= 0 && B.st < 0.7) B.laugh = 1.2; }
    if (B.st > 2.2) { B.state = 'hide'; B.st = 0; }
  }
  // капелюхи можна перестрибувати, а збоку вони не заважають; у стрибку на капелюх під час перемішування — просто відскакуєш
  if (B.state !== 'pick') for (const h of B.hats) { const hb = hatBox(B, h); if (overlap(P, hb) && P.vy > 40 && P.y + P.h - hb.y < 16) { P.vy = -430; P.cut = true; Snd.boing(); if (B.state === 'shuffle' && !B.waitHint) { B.waitHint = true; say('Зачекай, поки капелюхи зупиняться', 2); } } }
}
const armored19base34 = armored19;
armored19 = function (s, B) {
  if (B.kind === 'hatrabbit') return true;
  return armored19base34(s, B);
};
const resetBoss19base34 = resetBoss19;
resetBoss19 = function (B) {
  if (B.kind === 'hatrabbit') { if (B.state === 'shuffle' || B.state === 'pick') { B.state = 'show'; B.st = 0; } for (const h of B.hats) { h.x = B.slots[h.slot]; h.y = 0; } B.sw = null; return; }
  resetBoss19base34(B);
};
