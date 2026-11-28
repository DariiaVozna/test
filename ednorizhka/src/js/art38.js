'use strict';
/* ===== Частина 39 «Свято Миколая»: теми, бурульки й крижані сходинки, ривок, «Що буває взимку?», Гном Бурчик ===== */
Object.assign(THEMES, {
  gingertown: Object.assign({}, THEMES.winterfest, { sky: ['#ffd8c8', '#ffeee0', '#fffaf4'] }),
  deerpath: Object.assign({}, THEMES.snowvalley, { sky: ['#b8dcff', '#e0f0ff', '#fffaf4'] }),
  iciclecave: Object.assign({}, THEMES.icepalace, {}),
  nicholasfair: Object.assign({}, THEMES.winterfest, { sky: ['#c8d8ff', '#e4ecff', '#fff4e8'] }),
  gnomeattic: Object.assign({}, THEMES.toyworks, { sky: ['#ffd8e8', '#fff0f4', '#fffaf6'] }),
});
Object.assign(BG2, {
  gingertown: (c, viewW, camX, t) => drawBackground(c, 'winterfest', camX, viewW, t, 0),
  deerpath: (c, viewW, camX, t) => drawBackground(c, 'snowvalley', camX, viewW, t, 0),
  iciclecave: (c, viewW, camX, t) => drawBackground(c, 'icepalace', camX, viewW, t, 0),
  nicholasfair: (c, viewW, camX, t) => drawBackground(c, 'winterfest', camX, viewW, t, 0),
  gnomeattic: (c, viewW, camX, t) => drawBackground(c, 'toys', camX, viewW, t, 0),
});

/* ===== Зимові й літні картинки для дверей «Що буває взимку?» ===== */
function drawSeasonIcon39(c, k, x, y, s, t) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2 / s;
  if (k === 'snowman') {
    c.fillStyle = '#ffffff'; circ(c, 0, 6, 7); c.fill(); c.stroke(); circ(c, 0, -5, 5); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, -1.8, -6, 0.9); c.fill(); circ(c, 1.8, -6, 0.9); c.fill();
    c.fillStyle = '#ff8a3d'; c.beginPath(); c.moveTo(0, -4.5); c.lineTo(5, -3.5); c.lineTo(0, -3); c.closePath(); c.fill();
    c.fillStyle = '#ff4f7a'; c.fillRect(-5, -1.5, 10, 2.4); c.strokeRect(-5, -1.5, 10, 2.4);
    c.fillStyle = '#3a3a5a'; c.fillRect(-4, -12, 8, 3); c.fillRect(-2.6, -16, 5.2, 4);
  } else if (k === 'sled') {
    c.strokeStyle = '#c0303a'; c.lineWidth = 2 / s; c.beginPath(); c.moveTo(-11, 7); c.lineTo(9, 7); c.quadraticCurveTo(13, 7, 12, 3); c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1 / s; c.beginPath(); c.moveTo(-7, 2); c.lineTo(-7, 7); c.moveTo(6, 2); c.lineTo(6, 7); c.stroke();
    c.fillStyle = '#d99a5a'; rr(c, -11, -1, 20, 4, 1.4); c.fill(); c.stroke();
    c.strokeStyle = '#ffd23f'; c.lineWidth = 1.4 / s; c.beginPath(); c.moveTo(-11, 0); c.quadraticCurveTo(-15, -6, -9, -8); c.stroke();
  } else if (k === 'mittens') {
    for (const [dx, col] of [[-5, '#4cb6ff'], [5, '#ff4f7a']]) {
      c.save(); c.translate(dx, 0); c.rotate(dx * 0.03);
      c.fillStyle = col; c.beginPath(); c.moveTo(-4, 9); c.lineTo(-4, -3); c.quadraticCurveTo(-4, -9, 1, -9); c.quadraticCurveTo(5, -9, 5, -3); c.lineTo(5, 9); c.closePath(); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(-4, 0); c.quadraticCurveTo(-8, -1, -7, -4); c.quadraticCurveTo(-6, -6, -4, -4); c.fill(); c.stroke();
      c.fillStyle = '#ffffff'; c.fillRect(-4, 6, 9, 3); c.strokeRect(-4, 6, 9, 3);
      c.restore();
    }
  } else if (k === 'firtree') {
    c.fillStyle = '#8a5a3a'; c.fillRect(-2, 7, 4, 5); c.strokeRect(-2, 7, 4, 5);
    c.fillStyle = '#3fa64f';
    for (const [w, y0] of [[11, 8], [9, 2], [6, -4]]) { c.beginPath(); c.moveTo(-w, y0); c.lineTo(0, y0 - 9); c.lineTo(w, y0); c.closePath(); c.fill(); c.stroke(); }
    c.fillStyle = '#ffe14d'; starPath(c, 0, -13, 3.4, 1.5, -Math.PI / 2); c.fill(); c.stroke();
    for (const [bx, by, col] of [[-5, 5, '#ff4f7a'], [4, 3, '#4cb6ff'], [-2, -2, '#ffd23f'], [5, 7, '#c77dff']]) { c.fillStyle = col; circ(c, bx, by, 1.6); c.fill(); }
  } else if (k === 'watermelon') {
    c.fillStyle = '#3fa64f'; c.beginPath(); c.arc(0, -2, 12, 0.05, Math.PI - 0.05); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ff5c6a'; c.beginPath(); c.arc(0, -2, 9.5, 0.05, Math.PI - 0.05); c.closePath(); c.fill();
    c.fillStyle = INK; for (const [sx, sy] of [[-5, 1], [0, 3], [5, 1], [-2, 5.5], [3, 5.5]]) { ell(c, sx, sy, 0.8, 1.3); c.fill(); }
  } else if (k === 'sunflower') {
    c.strokeStyle = '#3fa64f'; c.lineWidth = 2 / s; c.beginPath(); c.moveTo(0, 4); c.lineTo(0, 12); c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1 / s; c.fillStyle = '#ffd23f';
    for (let i = 0; i < 10; i++) { const a = i * TAU / 10; ell(c, Math.cos(a) * 6.5, -2 + Math.sin(a) * 6.5, 3.4, 1.8, a); c.fill(); c.stroke(); }
    c.fillStyle = '#8a5a3a'; circ(c, 0, -2, 4.4); c.fill(); c.stroke();
  } else if (k === 'butterfly') {
    const f = 0.7 + 0.3 * Math.abs(Math.sin(t * 6));
    c.fillStyle = '#ff9fc4'; for (const d of [-1, 1]) { ell(c, d * 6 * f, -4, 6 * f, 5, d * 0.4); c.fill(); c.stroke(); c.fillStyle = '#c77dff'; ell(c, d * 5 * f, 5, 4 * f, 3.6, -d * 0.3); c.fill(); c.stroke(); c.fillStyle = '#ff9fc4'; }
    c.fillStyle = '#5a3a2a'; ell(c, 0, 0, 1.6, 8); c.fill();
    c.beginPath(); c.moveTo(0, -7); c.lineTo(-3, -12); c.moveTo(0, -7); c.lineTo(3, -12); c.stroke();
  } else if (k === 'sunhat') {
    c.fillStyle = '#ffd890'; ell(c, 0, 3, 13, 4); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-7, 3); c.quadraticCurveTo(-7, -7, 0, -7); c.quadraticCurveTo(7, -7, 7, 3); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ff4f7a'; c.fillRect(-7, -1, 14, 3); c.strokeRect(-7, -1, 14, 3);
    c.fillStyle = '#ffe14d'; circ(c, 8, -11, 3); c.fill();
  }
  c.restore();
}
function drawWinterBoard39(c, q, t) {
  const o = q.opts[1], cx = o.tx * T + 12, y = 2 * T - 6, w = 96, h = 70;
  c.save(); c.lineJoin = 'round';
  c.strokeStyle = '#8a6a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(cx - 30, y); c.lineTo(cx - 24, y - 22); c.moveTo(cx + 30, y); c.lineTo(cx + 24, y - 22); c.stroke();
  c.fillStyle = '#3a5a9a'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, cx - w / 2 - 4, y - 4, w + 8, h + 8, 7); c.fill(); c.stroke();
  const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, q.solved ? '#e8ffe0' : '#eef6ff'); g.addColorStop(1, q.solved ? '#c8f4c0' : '#cfe4ff');
  c.fillStyle = g; rr(c, cx - w / 2, y, w, h, 5); c.fill();
  // сніжок на дошці
  c.fillStyle = '#ffffff'; rr(c, cx - w / 2 - 5, y - 8, w + 10, 7, 4); c.fill(); c.strokeStyle = 'rgba(59,31,79,.35)'; c.lineWidth = 1; c.stroke();
  for (let i = 0; i < 5; i++) { const fx = cx - 40 + i * 20, fy = y + 6 + ((t * 14 + i * 13) % (h - 12)); c.fillStyle = 'rgba(255,255,255,.9)'; circ(c, fx, fy, 1.4); c.fill(); }
  txt24(c, 'Що буває', cx, y + 14, 12, '#1f3a6a', '#ffffff', 3);
  txt24(c, 'взимку?', cx, y + 29, 12, '#1f3a6a', '#ffffff', 3);
  if (q.solved) drawSeasonIcon39(c, q.ans, cx, y + h - 18, 1.1, t);
  else { c.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4); txt24(c, '?', cx, y + h - 18, 22, '#ff4fa3', '#ffffff', 3); c.globalAlpha = 1; }
  c.restore();
}
function drawWinterCard39(c, q, o, t) {
  const good = q.solved && o.n === q.ans, bad = q.wrongT > 0 && q.wrongTx === o.tx, wob = bad ? Math.sin(q.wrongT * 40) * 3 : 0;
  const x = o.tx * T + 12 + wob, y = o.ty * T;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = good ? '#7fe08a' : bad ? '#ffb0b0' : '#f4f8ff';
  rr(c, x - 17, y - 10, 34, T + 10, 6); c.fill(); c.stroke();
  drawSeasonIcon39(c, o.n, x, y + T / 2 - 4, 1, t);
  if (!q.solved) { c.globalAlpha = 0.4 + 0.3 * Math.sin(t * 5 + o.tx); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(x - 4, y + T + 3); c.lineTo(x + 4, y + T + 3); c.lineTo(x, y + T + 8); c.closePath(); c.fill(); }
  c.restore();
}
const drawQuizBoardBase39 = drawQuizBoard;
drawQuizBoard = function (c, q, t) { if (q.kind === 'winter') return drawWinterBoard39(c, q, t); return drawQuizBoardBase39(c, q, t); };
const drawAnswerCardBase39 = drawAnswerCard;
drawAnswerCard = function (c, q, o, t) { if (q.kind === 'winter') return drawWinterCard39(c, q, o, t); return drawAnswerCardBase39(c, q, o, t); };

/* ===== Бурульки й крижані сходинки ===== */
function drawIcicleCone39(c, x, y, len, s) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2 / s;
  const g = c.createLinearGradient(-7, 0, 7, 0); g.addColorStop(0, '#9fdcff'); g.addColorStop(0.45, '#eaf8ff'); g.addColorStop(1, '#7fc4f0');
  c.fillStyle = g; c.beginPath(); c.moveTo(-7, 0); c.quadraticCurveTo(-4, len * 0.5, 0, len); c.quadraticCurveTo(4, len * 0.5, 7, 0); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 1.4 / s; c.beginPath(); c.moveTo(-3, 3); c.quadraticCurveTo(-2, len * 0.4, -0.5, len * 0.7); c.stroke();
  c.restore();
}
function drawIceBlock39(c, col, row, t) {
  const x = col * T, y = row * T;
  c.save(); c.lineJoin = 'round';
  const g = c.createLinearGradient(x, y, x + T, y + T); g.addColorStop(0, '#eaf8ff'); g.addColorStop(0.5, '#b8e4ff'); g.addColorStop(1, '#8ccaf0');
  c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 1.3; rr(c, x - 1, y - 1, T + 2, T + 2, 4); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x + 4, y + 7); c.lineTo(x + 4, y + 4); c.lineTo(x + 9, y + 4); c.stroke();
  c.strokeStyle = 'rgba(80,150,210,.55)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x + 14, y + 6); c.lineTo(x + 11, y + 12); c.lineTo(x + 16, y + 16); c.stroke();
  c.fillStyle = '#ffffff'; rr(c, x - 1, y - 3, T + 2, 5, 2.5); c.fill();
  if ((t * 1.2 + col * 0.37) % 2.4 < 0.3) sparkle(c, x + 18, y + 6, 2.6, '#ffffff');
  c.restore();
}
function drawIcicle39(c, q, t) {
  // засніжений карниз, на якому висить бурулька
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#a8743f'; rr(c, q.x - 14, q.y0 - 9, 28, 7, 2); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(q.x - 16, q.y0 - 8); c.quadraticCurveTo(q.x - 10, q.y0 - 15, q.x, q.y0 - 12); c.quadraticCurveTo(q.x + 10, q.y0 - 16, q.x + 16, q.y0 - 8); c.closePath(); c.fill(); c.stroke();
  c.restore();
  if (q.state === 'hang') drawIcicle39cone(c, q.x, q.y0 - 2, 1);
  else if (q.state === 'shake') { const k = q.st / ICICLE_SHAKE; drawIcicle39cone(c, q.x + Math.sin(t * 60) * (1 + k * 2), q.y0 - 2, 1); if (Math.floor(t * 8) % 2) { c.save(); c.fillStyle = '#ff4f7a'; txt24(c, '!', q.x + 12, q.y0 + 8, 13, '#ff4f7a', '#ffffff', 3); c.restore(); } }
  else if (q.state === 'fall') drawIcicle39cone(c, q.x, q.y, 1);
  else if (q.state === 'regrow') { const k = Math.min(1, q.st / 2.6); if (k > 0.05) drawIcicle39cone(c, q.x, q.y0 - 2, k); }
}
function drawIcicle39cone(c, x, y, k) { drawIcicleCone39(c, x, y, ICICLE_LEN, k); }

/* ===== Світ і поверх єдиноріжки ===== */
function drawWorld38(c, t, vis) {
  if (G.iceBlocks) for (const b of G.iceBlocks) if (vis(b.col * T + 12)) drawIceBlock39(c, b.col, b.row, t);
  if (G.icicles) for (const q of G.icicles) if (vis(q.x)) drawIcicle39(c, q, t);
}
const drawWorld37base39 = drawWorld37;
drawWorld37 = function (c, t, vis) { drawWorld37base39(c, t, vis); drawWorld38(c, t, vis); };
function drawOver38(c, P, t) {
  if (!(P.dashT > 0)) return;
  c.save(); c.lineCap = 'round';
  for (let i = 0; i < 4; i++) {
    const y = P.y + 6 + i * 7, len = 16 + ((t * 90 + i * 7) % 14);
    c.strokeStyle = ['rgba(255,225,77,.85)', 'rgba(255,255,255,.9)', 'rgba(255,176,216,.85)', 'rgba(255,255,255,.8)'][i]; c.lineWidth = 2.4;
    const x0 = P.dir > 0 ? P.x - 4 : P.x + P.w + 4;
    c.beginPath(); c.moveTo(x0, y); c.lineTo(x0 - P.dir * len, y); c.stroke();
  }
  c.restore();
}
const drawOver37base39 = drawOver37;
drawOver37 = function (c, P, t) { drawOver37base39(c, P, t); drawOver38(c, P, t); };

/* ===== Підкова (значок бонуса й наліпка) ===== */
function drawHorseshoe39(c, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineCap = 'round';
  const path = () => { c.beginPath(); c.moveTo(-6, 7); c.lineTo(-6, -1); c.arc(0, -1, 6, Math.PI, 0); c.lineTo(6, 7); };
  c.strokeStyle = INK; c.lineWidth = 6.2; path(); c.stroke();
  c.strokeStyle = '#ffd23f'; c.lineWidth = 4; path(); c.stroke();
  c.fillStyle = INK; for (const [hx, hy] of [[-6, 4], [-5.4, -3], [6, 4], [5.4, -3]]) { circ(c, hx, hy, 0.8); c.fill(); }
  c.strokeStyle = '#fff3a8'; c.lineWidth = 1.2; c.beginPath(); c.arc(0, -1, 6, Math.PI * 1.1, Math.PI * 1.45); c.stroke();
  c.restore();
}
const drawPowerIcon23base39 = drawPowerIcon23;
drawPowerIcon23 = function (c, kind, t) {
  if (kind === 'dash') { drawHorseshoe39(c, -1, 1, 1); sparkle(c, 7, -6, 3 + Math.sin(t * 6), '#ffffff'); return true; }
  return drawPowerIcon23base39(c, kind, t);
};

/* ===== Наліпки ===== */
const drawSticker36base39 = drawSticker36;
drawSticker36 = function (c, k) {
  c.strokeStyle = INK; c.lineWidth = 1.3; c.lineJoin = 'round'; c.lineCap = 'round';
  if (k === 'ginger39') {
    c.fillStyle = '#c98d55';
    c.beginPath(); c.arc(0, -8, 6, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-5, -3); c.lineTo(-12, -1); c.lineTo(-11, 3); c.lineTo(-5, 2); c.lineTo(-7, 12); c.lineTo(-2, 13); c.lineTo(0, 6); c.lineTo(2, 13); c.lineTo(7, 12); c.lineTo(5, 2); c.lineTo(11, 3); c.lineTo(12, -1); c.lineTo(5, -3); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = '#ffffff'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-11, 0.5); c.lineTo(-8, 0.5); c.moveTo(8, 0.5); c.lineTo(11, 0.5); c.moveTo(-6, 10); c.lineTo(-3, 10.5); c.moveTo(3, 10.5); c.lineTo(6, 10); c.stroke();
    c.fillStyle = INK; circ(c, -2, -9, 1); c.fill(); circ(c, 2, -9, 1); c.fill(); c.beginPath(); c.arc(0, -7, 2.4, 0.3, Math.PI - 0.3); c.stroke();
    c.fillStyle = '#ff4f7a'; circ(c, 0, -0.5, 1.4); c.fill(); c.fillStyle = '#4cb6ff'; circ(c, 0, 3, 1.4); c.fill();
  } else if (k === 'horseshoe39') { drawHorseshoe39(c, 0, 1, 1.6); sparkle(c, 10, -10, 4, '#ffe14d'); }
  else if (k === 'icicle39') {
    c.fillStyle = '#ffffff'; rr(c, -14, -14, 28, 6, 3); c.fill(); c.stroke();
    drawIcicleCone39(c, -6, -9, 18, 1); drawIcicleCone39(c, 3, -9, 24, 1); drawIcicleCone39(c, 10, -9, 12, 0.8);
  } else if (k === 'mitten39') {
    c.save(); c.rotate(-0.15); c.fillStyle = '#ff4f7a';
    c.beginPath(); c.moveTo(-6, 12); c.lineTo(-6, -4); c.quadraticCurveTo(-6, -13, 1, -13); c.quadraticCurveTo(8, -13, 8, -4); c.lineTo(8, 12); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-6, 0); c.quadraticCurveTo(-12, -1, -11, -6); c.quadraticCurveTo(-9, -9, -6, -6); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; c.fillRect(-6, 8, 14, 4); c.strokeRect(-6, 8, 14, 4);
    c.strokeStyle = '#ffffff'; c.lineWidth = 1.4; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(-3 + i * 4, -2); c.lineTo(-1 + i * 4, 1); c.lineTo(1 + i * 4, -2); c.stroke(); }
    c.restore();
  } else if (k === 'gnome39') { c.save(); c.scale(0.75, 0.75); c.translate(0, 6); drawGnomeBody39(c, 0, 'happy', 1); c.restore(); }
  else drawSticker36base39(c, k);
};

/* ===== Гном Бурчик і три коробки ===== */
function drawGnomeBody39(c, t, mood, dir) {
  c.save(); c.scale(dir || 1, 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  // чобітки й кожушок
  c.fillStyle = '#6a3a1a'; ell(c, -5, 16, 5, 3); c.fill(); c.stroke(); ell(c, 6, 16, 5, 3); c.fill(); c.stroke();
  c.fillStyle = '#3a6ad0'; c.beginPath(); c.moveTo(-10, 14); c.quadraticCurveTo(-11, 0, 0, -1); c.quadraticCurveTo(11, 0, 10, 14); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.fillRect(-2, 5, 4, 3);
  // ручки
  c.fillStyle = '#ffd0b0'; circ(c, -11, 7, 2.6); c.fill(); c.stroke(); circ(c, 11, 7, 2.6); c.fill(); c.stroke();
  // бородa
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-9, -6); c.quadraticCurveTo(-10, 8, 0, 10); c.quadraticCurveTo(10, 8, 9, -6); c.closePath(); c.fill(); c.stroke();
  // обличчя
  c.fillStyle = '#ffd8c0'; ell(c, 0, -8, 8, 6); c.fill(); c.stroke();
  c.fillStyle = '#ff9a9a'; circ(c, 0, -6, 3); c.fill(); c.stroke();
  if (mood === 'dizzy') {
    c.lineWidth = 1.2; for (const ex of [-4, 4]) { c.beginPath(); c.arc(ex, -10, 2, 0, TAU * 0.8); c.stroke(); }
  } else {
    c.fillStyle = INK; circ(c, -3.5, -10, 1.3); c.fill(); circ(c, 3.5, -10, 1.3); c.fill();
    c.lineWidth = 1.6; c.beginPath();
    if (mood === 'grumpy') { c.moveTo(-6, -14); c.lineTo(-2, -12.5); c.moveTo(6, -14); c.lineTo(2, -12.5); }
    else { c.moveTo(-6, -13); c.quadraticCurveTo(-4, -14.5, -2, -13); c.moveTo(6, -13); c.quadraticCurveTo(4, -14.5, 2, -13); }
    c.stroke();
  }
  if (mood === 'happy') { c.lineWidth = 1.3; c.beginPath(); c.arc(0, -3, 3, 0.2, Math.PI - 0.2); c.stroke(); }
  // ковпак із помпоном
  const sw = Math.sin(t * 3) * 2;
  c.fillStyle = '#e0303a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-9, -12); c.quadraticCurveTo(-4, -26, 4 + sw, -32); c.quadraticCurveTo(6, -22, 9, -12); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; rr(c, -10, -14, 20, 4, 2); c.fill(); c.stroke(); circ(c, 4 + sw, -33, 3); c.fill(); c.stroke();
  c.restore();
}
function drawGiftBox39(c, b, t, open, B) {
  const x = b.x, gy = B.gy + b.y - (b.wig > 0 ? Math.sin((0.35 - b.wig) / 0.35 * Math.PI) * 6 : 0), top = gy - GBOX_H;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.5;
  c.fillStyle = 'rgba(59,31,79,.15)'; ell(c, x, B.gy, GBOX_W / 2 + 2, 3.5); c.fill();
  c.fillStyle = '#e0303a'; rr(c, x - GBOX_W / 2, top + 6, GBOX_W, GBOX_H - 6, 3); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.fillRect(x - 4, top + 6, 8, GBOX_H - 6); c.strokeRect(x - 4, top + 6, 8, GBOX_H - 6);
  c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x - GBOX_W / 2 + 3, top + 9, 5, GBOX_H - 13);
  // пружинка з іграшкою, коли коробка порожня
  if (b.jack > 0 && b.jack < 5) {
    const k = Math.min(1, (1.4 - b.jack) * 6), hgt = 26 * k + Math.sin(t * 18) * 3 * k;
    c.strokeStyle = '#8a8aa0'; c.lineWidth = 2; c.beginPath();
    for (let i = 0; i <= 8; i++) { const yy = top + 4 - hgt * i / 8; c.lineTo(x + (i % 2 ? 5 : -5), yy); } c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1.3; c.fillStyle = '#ffe14d'; circ(c, x, top - hgt - 4, 7); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, -2.4 + x, top - hgt - 5, 1); c.fill(); circ(c, 2.4 + x, top - hgt - 5, 1); c.fill();
    c.beginPath(); c.arc(x, top - hgt - 3, 2.6, 0.2, Math.PI - 0.2); c.stroke();
    c.fillStyle = '#ff4f7a'; circ(c, x, top - hgt - 3.6, 1.4); c.fill();
  }
  // кришка з бантиком
  c.save(); c.translate(x - GBOX_W / 2 - 2, top + 6); c.rotate(open ? -0.9 : 0);
  c.fillStyle = '#ff4f5a'; c.strokeStyle = INK; c.lineWidth = 1.5; rr(c, 0, -8, GBOX_W + 4, 9, 3); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.fillRect(GBOX_W / 2 - 2, -8, 8, 9); c.strokeRect(GBOX_W / 2 - 2, -8, 8, 9);
  c.beginPath(); ell(c, GBOX_W / 2 - 4, -12, 6, 4, -0.4); c.fill(); c.stroke(); c.beginPath(); ell(c, GBOX_W / 2 + 8, -12, 6, 4, 0.4); c.fill(); c.stroke();
  circ(c, GBOX_W / 2 + 2, -10, 2.6); c.fill(); c.stroke();
  c.restore();
  c.restore();
}
function drawGnomeBoss(c, B, t) {
  const st = B.state;
  for (let i = 0; i < 3; i++) {
    const b = B.boxes[i], open = B.dead || b.jack > 0 || (st === 'tease' && i === B.box) || (st === 'hide' && i === B.box && B.st < 0.55) || st === 'intro' && i === 1 || st === 'wait' && i === 1;
    drawGiftBox39(c, b, t, open, B);
  }
  if (B.y > -100) {
    const mood = B.dead ? 'happy' : st === 'dizzy' ? 'dizzy' : 'grumpy';
    c.save(); c.translate(B.x, B.y); if (B.flash > 0) c.globalAlpha = 0.6;
    if (st === 'dizzy') c.rotate(Math.sin(t * 6) * 0.12);
    drawGnomeBody39(c, t, mood, B.dir);
    c.restore();
    if (st === 'dizzy' && !B.dead) for (let i = 0; i < 3; i++) { const a = t * 5 + i * TAU / 3; c.save(); c.fillStyle = '#ffe14d'; c.strokeStyle = INK; c.lineWidth = 0.8; starPath(c, B.x + Math.cos(a) * 14, B.y - 40 + Math.sin(a) * 4, 4, 1.8, a); c.fill(); c.stroke(); c.restore(); }
    if (B.dead) { c.save(); c.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4); c.fillStyle = '#ff4f9a'; c.translate(B.x + 6, B.y - 46 + Math.sin(t * 2) * 4); heart21(c, 0, 0, 0.6); c.fill(); c.restore(); }
  }
}
function drawBauble39(c, b) {
  c.save(); c.translate(b.x, b.y); c.lineJoin = 'round';
  c.fillStyle = b.c || '#ff4f7a'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, 0, 1, 6.5); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.fillRect(-2.4, -7, 4.8, 3); c.strokeRect(-2.4, -7, 4.8, 3);
  c.fillStyle = 'rgba(255,255,255,.8)'; ell(c, -2.2, -1.4, 1.8, 2.6, 0.5); c.fill();
  c.restore();
}
