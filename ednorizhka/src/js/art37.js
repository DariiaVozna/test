'use strict';
/* ===== Частина 38 «Морські пригоди»: теми, мушлі з перлинками, мушля-сурма, золоті кільця й мотузка, «Хто живе в морі?», Акуленя Зубчик ===== */
Object.assign(THEMES, {
  pearlbay: Object.assign({}, THEMES.lagoon, { sky: ['#8fe0f8', '#c8f2ff', '#fff4dc'] }),
  piratepier: Object.assign({}, THEMES.pirate, { sky: ['#9fdcff', '#cdeeff', '#fff4dc'] }),
  coralreef: Object.assign({}, THEMES.sea, { sky: ['#4ab4e0', '#7cd2ec', '#b0eaf4'] }),
  shipwreck: Object.assign({}, THEMES.pirate, { sky: ['#7cc4ec', '#b4e0f8', '#f2f0e0'] }),
  sharkreef: Object.assign({}, THEMES.tide, { sky: ['#86d4fa', '#c4ecff', '#fff4dc'] }),
});
Object.assign(BG2, {
  pearlbay: (c, viewW, camX, t) => drawBackground(c, 'lagoon', camX, viewW, t, 0),
  piratepier: (c, viewW, camX, t) => drawBackground(c, 'pirate', camX, viewW, t, 0),
  coralreef: (c, viewW, camX, t) => drawBackground(c, 'sea', camX, viewW, t, 0),
  shipwreck: (c, viewW, camX, t) => drawBackground(c, 'pirate', camX, viewW, t, 0),
  sharkreef: (c, viewW, camX, t) => drawBackground(c, 'tide', camX, viewW, t, 0),
});

/* ===== Морські тваринки (для дверей «Хто живе в морі?» і наліпок) ===== */
function seaEye38(c, x, y, r) { c.fillStyle = '#ffffff'; circ(c, x, y, r); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, x + r * 0.2, y, r * 0.55); c.fill(); c.fillStyle = '#ffffff'; circ(c, x - r * 0.05, y - r * 0.3, r * 0.25); c.fill(); }
function drawSeaIcon38(c, k, x, y, s, t) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2 / s;
  const w = Math.sin(t * 4) * 0.08;
  if (k === 'fish') {
    c.fillStyle = '#ff9a2a';
    c.beginPath(); c.moveTo(-7, 0); c.lineTo(-13, -6 - w * 20); c.lineTo(-13, 6 + w * 20); c.closePath(); c.fill(); c.stroke();
    ell(c, 0, 0, 10, 7); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-2, -6.6); c.lineTo(1, 6.6); c.lineTo(3, 6.2); c.lineTo(0.5, -6.8); c.closePath(); c.fill();
    seaEye38(c, 5, -1.5, 2.4);
  } else if (k === 'crab') {
    c.fillStyle = '#ff5c4a';
    for (const d of [-1, 1]) {
      c.beginPath(); c.moveTo(d * 7, 1); c.lineTo(d * 12, -3); c.stroke();
      ell(c, d * 12.5, -6, 3.4, 3, d * 0.4); c.fill(); c.stroke();
      c.fillStyle = '#ffd0c8'; c.beginPath(); c.moveTo(d * 12.5, -6); c.lineTo(d * 15.5, -9); c.stroke(); c.fillStyle = '#ff5c4a';
      for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(d * 6, 3 + i * 1.4); c.lineTo(d * (10 + i), 7 + i * 1.6); c.stroke(); }
    }
    ell(c, 0, 1, 9, 6); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-3, -4); c.lineTo(-3, -8); c.moveTo(3, -4); c.lineTo(3, -8); c.stroke();
    seaEye38(c, -3, -9, 2); seaEye38(c, 3, -9, 2);
    c.beginPath(); c.arc(0, 2, 3, 0.2, Math.PI - 0.2); c.stroke();
  } else if (k === 'octopus') {
    c.fillStyle = '#c77dff';
    for (let i = 0; i < 5; i++) { const a = -0.9 + i * 0.45, wv = Math.sin(t * 5 + i) * 1.5; c.beginPath(); c.moveTo(Math.sin(a) * 5, 2); c.quadraticCurveTo(Math.sin(a) * 9 + wv, 8, Math.sin(a) * 12, 11); c.lineWidth = 3.2 / s; c.strokeStyle = INK; c.stroke(); c.lineWidth = 2 / s; c.strokeStyle = '#c77dff'; c.stroke(); }
    c.strokeStyle = INK; c.lineWidth = 1.2 / s;
    c.beginPath(); c.moveTo(-9, 3); c.quadraticCurveTo(-10, -12, 0, -12); c.quadraticCurveTo(10, -12, 9, 3); c.closePath(); c.fill(); c.stroke();
    seaEye38(c, -3.4, -3, 2.3); seaEye38(c, 3.4, -3, 2.3);
    c.fillStyle = '#ff9fc4'; circ(c, -6, 0.5, 1.4); c.fill(); circ(c, 6, 0.5, 1.4); c.fill();
  } else if (k === 'starfish') {
    c.fillStyle = '#ffa63d'; starPath(c, 0, 0, 12, 5.4, -Math.PI / 2 + w); c.fill(); c.stroke();
    c.fillStyle = '#ffd08a'; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * TAU / 5; circ(c, Math.cos(a) * 6.5, Math.sin(a) * 6.5, 0.9); c.fill(); }
    seaEye38(c, -2.2, -1, 1.6); seaEye38(c, 2.2, -1, 1.6);
    c.beginPath(); c.arc(0, 1.5, 1.8, 0.2, Math.PI - 0.2); c.stroke();
  } else if (k === 'seahorse') {
    c.fillStyle = '#ffd23f';
    c.beginPath(); c.moveTo(2, -12); c.quadraticCurveTo(9, -11, 7, -5); c.quadraticCurveTo(4, -2, 5, 3); c.quadraticCurveTo(6, 10, 0, 12); c.quadraticCurveTo(-5, 12, -3, 8); c.quadraticCurveTo(0, 7, -1, 4);
    c.quadraticCurveTo(-5, 0, -3, -5); c.quadraticCurveTo(-2, -10, 2, -12); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(6, -9); c.lineTo(12, -8); c.lineTo(11.5, -6); c.lineTo(6.5, -6.5); c.fill(); c.stroke();
    c.fillStyle = '#ffb000'; c.beginPath(); c.moveTo(-3, -3); c.lineTo(-7, -1); c.lineTo(-3, 2); c.fill(); c.stroke();
    seaEye38(c, 3, -8, 1.8);
  } else if (k === 'whale') {
    c.fillStyle = '#5a9be0';
    c.beginPath(); c.moveTo(-10, 0); c.lineTo(-15, -6); c.lineTo(-14, 2); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-11, 2); c.quadraticCurveTo(-12, -9, 1, -9); c.quadraticCurveTo(13, -9, 13, 1); c.quadraticCurveTo(12, 7, 0, 7); c.quadraticCurveTo(-9, 7, -11, 2); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#dcefff'; c.beginPath(); c.moveTo(-6, 4); c.quadraticCurveTo(3, 9, 12, 2); c.quadraticCurveTo(4, 5, -6, 4); c.fill();
    seaEye38(c, 6, -2, 1.9);
    c.strokeStyle = '#7fd0ff'; c.lineWidth = 1.6 / s; c.beginPath(); c.moveTo(1, -10); c.quadraticCurveTo(-1, -15, -4, -15); c.moveTo(1, -10); c.quadraticCurveTo(3, -15, 6, -15); c.stroke();
  } else if (k === 'turtle') {
    c.fillStyle = '#9be07f';
    for (const [fx, fy] of [[-8, 5], [8, 5], [-7, -4], [7, -4]]) { ell(c, fx, fy, 3.4, 2.2, fx * fy > 0 ? 0.6 : -0.6); c.fill(); c.stroke(); }
    ell(c, 11, -1, 3.6, 3); c.fill(); c.stroke();
    c.fillStyle = '#3fa64f'; c.beginPath(); c.moveTo(-9, 2); c.quadraticCurveTo(-9, -9, 0, -9); c.quadraticCurveTo(9, -9, 9, 2); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = '#a8ec8a'; c.beginPath(); c.moveTo(-4, -7); c.lineTo(-2, -2); c.lineTo(2, -2); c.lineTo(4, -7); c.moveTo(-2, -2); c.lineTo(-5, 1); c.moveTo(2, -2); c.lineTo(5, 1); c.stroke();
    c.strokeStyle = INK; seaEye38(c, 12, -2, 1.3);
  } else if (k === 'jelly') {
    c.fillStyle = 'rgba(255,159,212,.85)';
    for (let i = 0; i < 4; i++) { const x0 = -6 + i * 4; c.beginPath(); c.moveTo(x0, 1); c.quadraticCurveTo(x0 + Math.sin(t * 5 + i) * 2, 6, x0, 11); c.stroke(); }
    c.beginPath(); c.moveTo(-10, 2); c.quadraticCurveTo(-10, -11, 0, -11); c.quadraticCurveTo(10, -11, 10, 2); c.quadraticCurveTo(5, 0, 0, 2); c.quadraticCurveTo(-5, 0, -10, 2); c.closePath(); c.fill(); c.stroke();
    seaEye38(c, -3, -4, 1.7); seaEye38(c, 3, -4, 1.7);
  }
  c.restore();
}

/* ===== Двері «Хто живе в морі?» ===== */
function drawSeaBoard38(c, q, t) {
  const o = q.opts[1], cx = o.tx * T + 12, y = 2 * T - 6, w = 96, h = 70;
  c.save(); c.lineJoin = 'round';
  c.strokeStyle = '#8a6a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(cx - 30, y); c.lineTo(cx - 24, y - 22); c.moveTo(cx + 30, y); c.lineTo(cx + 24, y - 22); c.stroke();
  c.fillStyle = '#2f7ab0'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, cx - w / 2 - 4, y - 4, w + 8, h + 8, 7); c.fill(); c.stroke();
  const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, q.solved ? '#e8ffe0' : '#e6f8ff'); g.addColorStop(1, q.solved ? '#c8f4c0' : '#9fdcff');
  c.fillStyle = g; rr(c, cx - w / 2, y, w, h, 5); c.fill();
  // хвилі внизу дошки
  c.save(); rr(c, cx - w / 2, y, w, h, 5); c.clip();
  c.fillStyle = 'rgba(76,182,255,.55)'; c.beginPath(); c.moveTo(cx - w / 2, y + h);
  for (let i = 0; i <= 12; i++) { const xx = cx - w / 2 + i * w / 12; c.lineTo(xx, y + h - 14 + Math.sin(i * 1.4 + t * 2) * 2.5); }
  c.lineTo(cx + w / 2, y + h); c.closePath(); c.fill();
  c.restore();
  txt24(c, 'Хто живе', cx, y + 14, 12, '#1f4f80', '#ffffff', 3);
  txt24(c, 'в морі?', cx, y + 29, 12, '#1f4f80', '#ffffff', 3);
  if (q.solved) drawSeaIcon38(c, q.ans, cx, y + h - 18, 1.15, t);
  else { c.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4); txt24(c, '?', cx, y + h - 18, 22, '#ff4fa3', '#ffffff', 3); c.globalAlpha = 1; }
  c.restore();
}
function drawSeaCard38(c, q, o, t) {
  const good = q.solved && o.n === q.ans, bad = q.wrongT > 0 && q.wrongTx === o.tx, wob = bad ? Math.sin(q.wrongT * 40) * 3 : 0;
  const x = o.tx * T + 12 + wob, y = o.ty * T;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = good ? '#7fe08a' : bad ? '#ffb0b0' : '#fff6dc';
  rr(c, x - 17, y - 10, 34, T + 10, 6); c.fill(); c.stroke();
  if (SEA_NOM[o.n]) drawSeaIcon38(c, o.n, x, y + T / 2 - 4, 1, t);
  else drawAnimal27(c, o.n, x, y + T - 1, 1, t, 1, false);
  if (!q.solved) { c.globalAlpha = 0.4 + 0.3 * Math.sin(t * 5 + o.tx); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(x - 4, y + T + 3); c.lineTo(x + 4, y + T + 3); c.lineTo(x, y + T + 8); c.closePath(); c.fill(); }
  c.restore();
}
const drawQuizBoardBase38 = drawQuizBoard;
drawQuizBoard = function (c, q, t) { if (q.kind === 'sea') return drawSeaBoard38(c, q, t); return drawQuizBoardBase38(c, q, t); };
const drawAnswerCardBase38 = drawAnswerCard;
drawAnswerCard = function (c, q, o, t) { if (q.kind === 'sea') return drawSeaCard38(c, q, o, t); return drawAnswerCardBase38(c, q, o, t); };

/* ===== Мушля з перлинкою ===== */
function clamShell38(c, w, h, col, colHi) {
  c.beginPath(); c.moveTo(-w, 0); c.quadraticCurveTo(-w, -h, 0, -h); c.quadraticCurveTo(w, -h, w, 0); c.closePath();
  c.fillStyle = col; c.fill(); c.stroke();
  c.save(); c.clip(); c.strokeStyle = colHi; c.lineWidth = 1.4;
  for (let i = -3; i <= 3; i++) { c.beginPath(); c.moveTo(0, 2); c.lineTo(i * w / 3.2, -h - 2); c.stroke(); }
  c.restore();
}
function drawClam38(c, q, t) {
  const x = q.x, gy = q.gy, op = q.op, shake = !q.open && q.t < 0.45 && q.pearl ? Math.sin(t * 50) * 0.8 : 0;
  c.save(); c.translate(x + shake, gy); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = 'rgba(59,31,79,.15)'; ell(c, 0, 0, 17, 3); c.fill();
  // нижня стулка
  c.save(); c.scale(1, -0.55); clamShell38(c, 15, 15, '#ff9fc4', '#ffd0e4'); c.restore();
  // перлинка
  if (q.pearl && op > 0.15) {
    c.save(); c.globalAlpha = Math.min(1, op * 1.5);
    const pg = c.createRadialGradient(-2, -9, 1, 0, -7, 6); pg.addColorStop(0, '#ffffff'); pg.addColorStop(0.6, '#f4ecff'); pg.addColorStop(1, '#d8c8f0');
    c.fillStyle = pg; circ(c, 0, -6, 5.2); c.fill(); c.stroke();
    if (op > 0.8 && (t * 2 + x) % 1.2 < 0.35) sparkle(c, 4, -11, 3, '#ffffff');
    c.restore();
  }
  // верхня стулка відкривається на завісі ззаду
  c.save(); c.translate(-14, -2); c.rotate(-op * 1.05); c.translate(14, 0); clamShell38(c, 15, 13, '#ff7ab8', '#ffc0dc'); c.restore();
  if (q.joy > 0) { c.globalAlpha = Math.min(1, q.joy); c.fillStyle = '#ff4f9a'; c.save(); c.translate(0, -26 - (1.2 - q.joy) * 14); heart21(c, 0, 0, 0.45); c.fill(); c.restore(); c.globalAlpha = 1; }
  c.restore();
}

/* ===== Мушля-сурма ===== */
function drawConch38(c, q, t) {
  const x = q.x, gy = q.gy;
  c.save(); c.translate(x, gy); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#c98d55'; rr(c, -10, -6, 20, 6, 2); c.fill(); c.stroke();
  const bob = q.state === 'low' ? Math.sin(t * 2.5) * 1 : 0;
  c.translate(0, -12 + bob); c.rotate(-0.25);
  c.fillStyle = '#ffb38a';
  c.beginPath(); c.moveTo(-12, 3); c.quadraticCurveTo(-6, -10, 6, -8); c.quadraticCurveTo(14, -6, 13, 0); c.quadraticCurveTo(10, 7, -2, 6); c.quadraticCurveTo(-9, 6, -12, 3); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffe0cc'; c.beginPath(); c.moveTo(-12, 3); c.lineTo(-17, -2); c.lineTo(-16, 6); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#e07a50'; c.lineWidth = 1.1;
  for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(7, -1, 2.5 + i * 2.4, Math.PI * 0.6, Math.PI * 1.7); c.stroke(); }
  c.fillStyle = '#ff7ab8'; c.strokeStyle = INK; c.lineWidth = 1; ell(c, -1, 1, 4, 2.4, 0.2); c.fill(); c.stroke();
  c.restore();
  // ноти, коли сурмить, і кружечок часу, поки вода висока
  if (q.toot > 0) for (let i = 0; i < 3; i++) { const k = 1 - q.toot, nx = x - 18 - i * 9 - k * 14, ny = gy - 22 - i * 6 - k * 18; c.save(); c.globalAlpha = Math.max(0, q.toot); noteShape(c, nx, ny, 0.9, ['#ff4fa3', '#4cb6ff', '#ffb000'][i]); c.restore(); }
  if (q.state !== 'low') {
    const left = q.state === 'rise' ? 1 : q.state === 'high' ? 1 - q.st / CONCH_HIGH : 0;
    c.save(); c.translate(x, gy - 42);
    c.fillStyle = 'rgba(255,255,255,.9)'; circ(c, 0, 0, 9); c.fill();
    c.strokeStyle = q.state === 'high' && left < 0.25 && Math.floor(t * 6) % 2 ? '#ff5c7a' : '#4cb6ff'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 7, -Math.PI / 2, -Math.PI / 2 + TAU * Math.max(0, left)); c.stroke();
    c.fillStyle = '#4cb6ff'; c.beginPath(); c.moveTo(0, -4.5); c.quadraticCurveTo(3.5, 0, 3, 1.6); c.arc(0, 1.6, 3, 0, Math.PI); c.quadraticCurveTo(-3.5, 0, 0, -4.5); c.fill();
    c.restore();
  }
}

/* ===== Золоте кільце для гачка ===== */
function drawAnchorRing38(c, a, t, target) {
  c.save(); c.translate(a.x, a.y); c.lineCap = 'round'; c.lineJoin = 'round';
  // кілочок і мотузочка, на якій висить кільце
  c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = '#a8743f'; rr(c, -6, -14, 12, 5, 2); c.fill(); c.stroke();
  c.strokeStyle = '#c98d55'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -9); c.lineTo(0, -6); c.stroke();
  if (target) {
    const k = 0.5 + 0.5 * Math.sin(t * 8);
    c.fillStyle = 'rgba(255,230,120,' + (0.25 + k * 0.25) + ')'; circ(c, 0, 1, 13 + k * 3); c.fill();
    c.strokeStyle = 'rgba(255,79,163,' + (0.5 + k * 0.4) + ')'; c.lineWidth = 1.6; c.setLineDash([3, 3]); circ(c, 0, 1, 15 + k * 2); c.stroke(); c.setLineDash([]);
  }
  c.strokeStyle = INK; c.lineWidth = 5.4; circ(c, 0, 1, 6.5); c.stroke();
  c.strokeStyle = '#ffd23f'; c.lineWidth = 3.4; circ(c, 0, 1, 6.5); c.stroke();
  c.strokeStyle = '#fff3a8'; c.lineWidth = 1.2; c.beginPath(); c.arc(0, 1, 6.5, Math.PI * 1.1, Math.PI * 1.5); c.stroke();
  if ((t * 1.3 + a.x * 0.01) % 2 < 0.3) sparkle(c, 5, -4, 2.6, '#ffffff');
  c.restore();
}
function drawGrapple38(c, x, y, rot, s) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.lineCap = 'round'; c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 3.6;
  c.beginPath(); c.moveTo(0, -6); c.lineTo(0, 5); c.moveTo(-5, 1); c.quadraticCurveTo(-5, 6, 0, 6); c.quadraticCurveTo(5, 6, 5, 1); c.moveTo(0, 5); c.lineTo(0, 8); c.stroke();
  c.strokeStyle = '#b8c4d4'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(0, -6); c.lineTo(0, 5); c.moveTo(-5, 1); c.quadraticCurveTo(-5, 6, 0, 6); c.quadraticCurveTo(5, 6, 5, 1); c.moveTo(0, 5); c.lineTo(0, 8); c.stroke();
  c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1; circ(c, 0, -7, 2.2); c.fill(); c.stroke();
  c.restore();
}

/* ===== Світ і поверх єдиноріжки ===== */
function drawWorld37(c, t, vis) {
  if (G.clams) for (const q of G.clams) if (vis(q.x)) drawClam38(c, q, t);
  if (G.conches) for (const q of G.conches) if (vis(q.x, 60)) drawConch38(c, q, t);
  if (G.anchors && G.anchors.length) {
    const P = G.P, tg = P.hookPow && !P.hook ? findAnchor38(P) : P.hook && P.hook.phase === 'hang' ? findAnchor38(P, P.hook.a, T) : null;
    for (const a of G.anchors) if (vis(a.x)) drawAnchorRing38(c, a, t, a === tg);
  }
}
const drawWorld36base38 = drawWorld36;
drawWorld36 = function (c, t, vis) { drawWorld36base38(c, t, vis); drawWorld37(c, t, vis); };
function drawOver37(c, P, t) {
  const h = P.hook; if (!h) return;
  const fx = P.x + P.w / 2 + P.dir * 8, fy = P.y + 4;
  const k = h.phase === 'throw' ? Math.min(1, h.t / 0.12) : 1, hx = fx + (h.x - fx) * k, hy = fy + (h.y + 4 - fy) * k;
  c.save(); c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(fx, fy); c.lineTo(hx, hy); c.stroke();
  c.strokeStyle = '#e8c48a'; c.lineWidth = 1.8; c.beginPath(); c.moveTo(fx, fy); c.lineTo(hx, hy); c.stroke();
  c.strokeStyle = '#a8743f'; c.lineWidth = 1; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(fx, fy); c.lineTo(hx, hy); c.stroke(); c.setLineDash([]);
  c.restore();
  drawGrapple38(c, hx, hy, Math.atan2(hy - fy, hx - fx) - Math.PI / 2, 0.8);
}
const drawOver36base38 = drawOver36;
drawOver36 = function (c, P, t) { drawOver36base38(c, P, t); drawOver37(c, P, t); };

/* ===== Значок бонуса «Гачок-кішка» ===== */
const drawPowerIcon23base38 = drawPowerIcon23;
drawPowerIcon23 = function (c, kind, t) {
  if (kind === 'hook') {
    c.save(); c.strokeStyle = '#c98d55'; c.lineWidth = 2; c.beginPath(); c.arc(-3, 3, 4.5, 0, TAU); c.stroke(); c.restore();
    drawGrapple38(c, 3, -1, 0.35, 0.95);
    return true;
  }
  return drawPowerIcon23base38(c, kind, t);
};

/* ===== Наліпки ===== */
const drawSticker36base38 = drawSticker36;
drawSticker36 = function (c, k) {
  c.strokeStyle = INK; c.lineWidth = 1.3; c.lineJoin = 'round';
  if (k === 'pearl') {
    c.save(); c.translate(0, 9); c.scale(1, -0.5); clamShell38(c, 13, 13, '#ff9fc4', '#ffd0e4'); c.restore();
    const pg = c.createRadialGradient(-3, -3, 1, 0, 0, 8); pg.addColorStop(0, '#ffffff'); pg.addColorStop(1, '#d8c8f0');
    c.fillStyle = pg; circ(c, 0, 1, 7); c.fill(); c.stroke();
    c.save(); c.translate(-12, 6); c.rotate(-0.9); c.translate(12, 0); clamShell38(c, 13, 11, '#ff7ab8', '#ffc0dc'); c.restore();
  } else if (k === 'anchor38') {
    c.lineCap = 'round'; c.lineWidth = 5; c.strokeStyle = INK;
    const path = () => { c.beginPath(); c.moveTo(0, -9); c.lineTo(0, 11); c.moveTo(-7, -5); c.lineTo(7, -5); c.moveTo(-11, 4); c.quadraticCurveTo(-10, 12, 0, 12); c.quadraticCurveTo(10, 12, 11, 4); };
    path(); c.stroke(); c.lineWidth = 3; c.strokeStyle = '#5a7ab0'; path(); c.stroke();
    c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, 0, -12, 3.4); c.fill(); c.stroke();
  } else if (k === 'coral') {
    c.lineCap = 'round';
    const br = (w, col) => { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(0, 12); c.lineTo(0, 0); c.lineTo(-6, -8); c.moveTo(0, 2); c.lineTo(7, -6); c.lineTo(9, -12); c.moveTo(-6, -8); c.lineTo(-9, -13); c.moveTo(-6, -8); c.lineTo(-2, -13); c.moveTo(7, -6); c.lineTo(3, -11); c.stroke(); };
    br(6, INK); br(3.8, '#ff6f8a');
    c.fillStyle = '#ffd08a'; c.strokeStyle = INK; c.lineWidth = 1; ell(c, 0, 12, 11, 3); c.fill(); c.stroke();
  } else if (k === 'chest38') {
    c.fillStyle = '#a8743f'; rr(c, -12, -2, 24, 13, 2); c.fill(); c.stroke();
    c.fillStyle = '#c98d55'; c.beginPath(); c.moveTo(-12, -2); c.quadraticCurveTo(-12, -11, 0, -11); c.quadraticCurveTo(12, -11, 12, -2); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; c.fillRect(-12, -3, 24, 2.4); c.strokeRect(-12, -3, 24, 2.4); rr(c, -3, -4, 6, 7, 1.5); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; circ(c, -6, -11, 2.2); c.fill(); c.stroke(); c.fillStyle = '#ffe14d'; starPath(c, 6, -12, 3, 1.3, 0); c.fill(); c.stroke();
  } else if (k === 'shark') {
    c.save(); c.scale(0.42, 0.42); drawSharkBody38(c, 0, 'happy'); c.restore();
  } else drawSticker36base38(c, k);
};

/* ===== Акуленя Зубчик ===== */
function drawSharkBody38(c, t, mood) {
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.6;
  const tw = Math.sin(t * (mood === 'beached' ? 14 : 6)) * (mood === 'beached' ? 6 : 3);
  // хвіст
  c.fillStyle = '#6fa8d8';
  c.beginPath(); c.moveTo(-24, -2); c.lineTo(-40, -16 + tw); c.quadraticCurveTo(-36, -2, -40, 12 + tw); c.closePath(); c.fill(); c.stroke();
  // спинний плавець
  c.beginPath(); c.moveTo(-8, -12); c.quadraticCurveTo(-2, -30, 6, -31); c.quadraticCurveTo(4, -20, 10, -12); c.closePath(); c.fill(); c.stroke();
  // тіло
  const g = c.createLinearGradient(0, -16, 0, 16); g.addColorStop(0, '#8cc4ee'); g.addColorStop(1, '#6fa8d8');
  c.fillStyle = g;
  c.beginPath(); c.moveTo(-26, -2); c.quadraticCurveTo(-18, -16, 6, -15); c.quadraticCurveTo(28, -14, 34, -2); c.quadraticCurveTo(34, 10, 18, 13); c.quadraticCurveTo(-4, 16, -26, 4); c.closePath(); c.fill(); c.stroke();
  // біле пузико
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-18, 5); c.quadraticCurveTo(0, 15, 20, 11); c.quadraticCurveTo(30, 8, 32, 2); c.quadraticCurveTo(20, 7, 4, 7); c.quadraticCurveTo(-8, 7, -18, 5); c.closePath(); c.fill();
  // зябра
  c.strokeStyle = '#4a7fb0'; c.lineWidth = 1.2; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(6 - i * 4, -6); c.quadraticCurveTo(4 - i * 4, -1, 6 - i * 4, 4); c.stroke(); }
  // бічний плавець
  c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = '#6fa8d8';
  c.beginPath(); c.moveTo(0, 8); c.quadraticCurveTo(-6, 18 + tw * 0.5, -12, 20 + tw * 0.5); c.quadraticCurveTo(-6, 12, -4, 7); c.closePath(); c.fill(); c.stroke();
  // око
  if (mood === 'beached') {
    c.lineWidth = 1.8; c.beginPath(); c.moveTo(14, -9); c.lineTo(19, -6); c.lineTo(14, -3); c.stroke();
    c.fillStyle = '#9fe0ff'; c.beginPath(); c.moveTo(24, -16); c.quadraticCurveTo(27, -11, 24, -9); c.quadraticCurveTo(21, -11, 24, -16); c.fill(); c.lineWidth = 1; c.stroke();
  } else {
    c.fillStyle = '#ffffff'; circ(c, 17, -6, 5.6); c.fill(); c.lineWidth = 1.3; c.stroke();
    c.fillStyle = INK; circ(c, 18.6, -5.6, mood === 'angry' ? 2.6 : 3.2); c.fill();
    c.fillStyle = '#ffffff'; circ(c, 17.4, -7.4, 1.2); c.fill();
    if (mood === 'angry') { c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(12, -13); c.lineTo(21, -11); c.stroke(); }
  }
  c.fillStyle = 'rgba(255,140,180,.6)'; ell(c, 22, 1, 3.4, 2); c.fill();
  // ротик із зубками
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (mood === 'happy') {
    c.fillStyle = '#ff7a9a'; c.beginPath(); c.moveTo(20, 4); c.quadraticCurveTo(27, 11, 33, 2); c.closePath(); c.fill(); c.stroke();
  } else {
    c.beginPath(); c.moveTo(20, 5); c.quadraticCurveTo(27, 9, 33, 2); c.stroke();
    c.fillStyle = '#ffffff'; c.lineWidth = 0.8;
    for (const [tx, ty] of [[23, 6.6], [26.5, 7], [30, 5.2]]) { c.beginPath(); c.moveTo(tx - 1.6, ty - 0.6); c.lineTo(tx, ty + 2.6); c.lineTo(tx + 1.6, ty - 0.6); c.closePath(); c.fill(); c.stroke(); }
  }
}
function drawSharkBoss(c, B, t) {
  // тінь на піску там, куди Акуленя стрибне
  if ((B.state === 'aim' || B.state === 'leap') && !B.dead) {
    const k = B.state === 'aim' ? 0.5 + 0.5 * Math.min(1, B.st / 1) : 1, pul = 0.5 + 0.5 * Math.sin(t * 12);
    c.save(); c.fillStyle = 'rgba(30,40,80,' + (0.18 + 0.14 * k) + ')'; ell(c, B.tx, B.gy - 1, 22 + 10 * k, 5); c.fill();
    c.strokeStyle = 'rgba(255,79,122,' + (0.4 + 0.4 * pul) + ')'; c.lineWidth = 2; c.setLineDash([5, 4]); ell(c, B.tx, B.gy - 1, 30 + 4 * pul, 7); c.stroke(); c.setLineDash([]); c.restore();
  }
  // хвилі від плавця, коли пливе під водою
  if ((B.state === 'swim' || B.state === 'wait' || B.state === 'spout' || B.state === 'aim') && !B.dead) {
    c.save(); c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1.6;
    for (let i = 0; i < 2; i++) { const r = 8 + ((t * 20 + i * 9) % 18); c.globalAlpha = 1 - r / 26; c.beginPath(); c.arc(B.x - B.dir * (r * 0.6), B.sy + 1, r, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); }
    c.restore();
  }
  const mood = B.dead ? 'happy' : B.state === 'beached' ? 'beached' : B.hp <= B.max / 2 ? 'angry' : 'calm';
  c.save(); c.translate(B.x, B.y); c.rotate(B.rot); c.scale(B.dir, 1);
  if (B.flash > 0) c.globalAlpha = 0.6;
  drawSharkBody38(c, t, mood);
  c.restore();
  if (B.state === 'beached' && !B.dead) {
    for (let i = 0; i < 3; i++) { const a = t * 5 + i * TAU / 3; c.save(); c.fillStyle = '#ffe14d'; c.strokeStyle = INK; c.lineWidth = 0.8; starPath(c, B.x + Math.cos(a) * 18, B.y - 26 + Math.sin(a) * 5, 4, 1.8, a); c.fill(); c.stroke(); c.restore(); }
  }
  if (B.dead) { c.save(); c.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4); c.fillStyle = '#ff4f9a'; c.translate(B.x + 8, B.y - 40 + Math.sin(t * 2) * 4); heart21(c, 0, 0, 0.6); c.fill(); c.restore(); }
}
function drawSquirt(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
  c.fillStyle = '#7fd0ff'; c.strokeStyle = INK; c.lineWidth = 1.1;
  c.beginPath(); c.moveTo(0, -8); c.quadraticCurveTo(6, 0, 5, 3); c.arc(0, 3, 5, 0, Math.PI); c.quadraticCurveTo(-6, 0, 0, -8); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; ell(c, -1.6, 2, 1.4, 2.2, 0.3); c.fill();
  c.restore();
}
