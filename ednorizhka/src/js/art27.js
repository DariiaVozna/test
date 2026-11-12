'use strict';
/* ===== Частина 28 «Розумна ферма»: Котра година?, Лічильна галявина, Де моя мама?, Розумна ферма, Гребля Тріска ===== */
Object.assign(THEMES, {
  clockvillage: { sky: ['#c8e4ff', '#e2f0ff', '#fbfdff'], panel: '#22306a', top: '#8fd07a', topHi: '#bdf09e', topLo: '#5aa04a', fill: '#d8b088', fillLo: '#c49a72', dots: ['#ffffff', '#ffd23f', '#7fb8ff'], block: 'clockblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  countmeadow: { sky: ['#fff2b0', '#fff8d8', '#fffef4'], panel: '#4a3a10', top: '#7fd46a', topHi: '#b4f08e', topLo: '#4f9f4a', fill: '#c8a070', fillLo: '#b08a5a', dots: ['#ff7ab8', '#ffffff', '#ffd23f'], block: 'beadblock', ice: false, topStyle: 'grass', dotShape: 'sprinkle' },
  mamafarm: { sky: ['#bfe8ff', '#e0f4ff', '#fffbe8'], panel: '#5a2a10', top: '#8fd07a', topHi: '#bdf09e', topLo: '#5aa04a', fill: '#b88a5a', fillLo: '#a07648', dots: ['#ffffff', '#ffd23f', '#ff9a8a'], block: 'hayblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  smartfarm: { sky: ['#ffe0c0', '#fff0dc', '#fffbf2'], panel: '#5a2a10', top: '#a0d87a', topHi: '#c8f0a0', topLo: '#6aa850', fill: '#c89a6a', fillLo: '#b08454', dots: ['#ffffff', '#ff7a5a', '#ffd23f'], block: 'barnblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  beaverdam: { sky: ['#a8d8f0', '#cfe8f4', '#f0f8fc'], panel: '#1f3a4a', top: '#6ac06a', topHi: '#9ae08a', topLo: '#3e8a4a', fill: '#8a6a4a', fillLo: '#765a3e', dots: ['#c8a070', '#ffffff', '#ffd23f'], block: 'logblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
});

/* ===== Дошки: годинник і лічилка ===== */
function drawClockFace(c, cx, cy, r, hour, t, solved) {
  c.save(); c.translate(cx, cy); c.lineJoin = 'round'; c.lineCap = 'round';
  c.fillStyle = solved ? '#e8ffe0' : '#ffffff'; c.strokeStyle = INK; c.lineWidth = 2; circ(c, 0, 0, r); c.fill(); c.stroke();
  c.strokeStyle = '#ff7ab8'; c.lineWidth = 3; circ(c, 0, 0, r - 2.5); c.stroke();
  for (let i = 1; i <= 12; i++) {
    const a = i * TAU / 12 - Math.PI / 2;
    if (r >= 24) txt24(c, String(i), Math.cos(a) * (r - 11), Math.sin(a) * (r - 11) + 0.5, i % 3 === 0 ? 11 : 9, i % 3 === 0 ? INK : '#6a5a8a');
    else { c.fillStyle = INK; circ(c, Math.cos(a) * (r - 5), Math.sin(a) * (r - 5), i % 3 === 0 ? 1.4 : 0.8); c.fill(); }
  }
  // хвилинна стрілка на 12, годинна на hour
  c.strokeStyle = '#3f5aff'; c.lineWidth = r >= 24 ? 2.4 : 1.6; c.beginPath(); c.moveTo(0, 2); c.lineTo(0, -(r - 7)); c.stroke();
  const ha = hour * TAU / 12 - Math.PI / 2;
  c.strokeStyle = '#ff4d4d'; c.lineWidth = r >= 24 ? 4.2 : 2.6; c.beginPath(); c.moveTo(-Math.cos(ha) * 2, -Math.sin(ha) * 2); c.lineTo(Math.cos(ha) * (r * 0.5), Math.sin(ha) * (r * 0.5)); c.stroke();
  c.fillStyle = INK; circ(c, 0, 0, 2.4); c.fill();
  c.restore();
}
function drawCountPic(c, k, x, y, t, i) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1;
  if (k === 'butterfly') { const f = Math.abs(Math.sin(t * 8 + i)) * 0.5 + 0.5; c.fillStyle = RAINBOW[i % 6]; ell(c, -3.5 * f, -2, 3.5 * f, 3.4); c.fill(); c.stroke(); ell(c, 3.5 * f, -2, 3.5 * f, 3.4); c.fill(); c.stroke(); ell(c, -2.6 * f, 3, 2.4 * f, 2.2); c.fill(); ell(c, 2.6 * f, 3, 2.4 * f, 2.2); c.fill(); c.fillStyle = INK; c.fillRect(-0.8, -4, 1.6, 9); }
  else if (k === 'apple') { c.restore(); drawItem26(c, 'apple', x, y, 0.62, t); return; }
  else if (k === 'flower') { c.fillStyle = ['#ff7ab8', '#ffd23f', '#7fb8ff', '#ff9a5a'][i % 4]; for (let p = 0; p < 5; p++) { const a = p * TAU / 5; circ(c, Math.cos(a) * 3.4, Math.sin(a) * 3.4, 2.6); c.fill(); } c.fillStyle = '#ffe066'; circ(c, 0, 0, 2.2); c.fill(); c.stroke(); }
  else if (k === 'fish') { c.fillStyle = ['#ff9a2a', '#4cb6ff', '#ff7ab8'][i % 3]; c.beginPath(); c.moveTo(4, 0); c.lineTo(8, -3.5); c.lineTo(8, 3.5); c.closePath(); c.fill(); c.stroke(); ell(c, 0, 0, 5.5, 3.6); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, -2.6, -0.6, 0.9); c.fill(); }
  c.restore();
}
function drawQuizBoard27(c, q, t) {
  const o = q.opts[1], cx = o.tx * T + 12;
  c.save(); c.lineJoin = 'round';
  if (q.kind === 'clock') {
    const cy = 2 * T + 30;
    c.strokeStyle = '#8a6a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(cx, cy - 40); c.lineTo(cx, cy - 56); c.stroke();
    c.fillStyle = '#a8683a'; c.strokeStyle = INK; c.lineWidth = 1.4; circ(c, cx, cy, 40); c.fill(); c.stroke();
    drawClockFace(c, cx, cy, 36, q.ans, t, q.solved);
    if (q.solved) txt24(c, q.ans + ':00', cx + 64, cy, 18, '#2f9a3a', '#ffffff', 4);
    else { c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 4); txt24(c, '?', cx + 56, cy, 26, '#ffd23f', INK, 3); c.globalAlpha = 1; }
  } else {
    const n = q.ans, cols = Math.min(5, n), rows = Math.ceil(n / 5), w = 24 + cols * 28, h = 16 + rows * 28, y = 2 * T - 4;
    c.strokeStyle = '#8a6a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(cx - w / 3, y); c.lineTo(cx - w / 3 + 6, y - 26); c.moveTo(cx + w / 3, y); c.lineTo(cx + w / 3 - 6, y - 26); c.stroke();
    c.fillStyle = '#a8683a'; c.strokeStyle = INK; rr(c, cx - w / 2 - 4, y - 4, w + 8, h + 8, 6); c.fill(); c.stroke();
    c.fillStyle = q.solved ? '#e8ffe0' : '#fffaf0'; rr(c, cx - w / 2, y, w, h, 4); c.fill();
    for (let i = 0; i < n; i++) { const r = Math.floor(i / 5), k = i % 5, inRow = Math.min(5, n - r * 5), px = cx - (inRow - 1) * 14 + k * 28, py = y + 22 + r * 28 + Math.sin(t * 2 + i) * 1; c.save(); c.translate(px, py); c.scale(1.5, 1.5); drawCountPic(c, q.pic, 0, 0, t, i); c.restore(); }
    if (q.solved) txt24(c, String(q.ans), cx + w / 2 + 18, y + h / 2, 18, '#2f9a3a', '#ffffff', 4);
    else { c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 4); txt24(c, '?', cx + w / 2 + 16, y + h / 2, 22, '#ffd23f', INK, 3); c.globalAlpha = 1; }
  }
  c.restore();
}

/* ===== Тваринки: малюки й мами ===== */
function drawAnimal27(c, k, x, gy, dir, t, s, baby) {
  c.save(); c.translate(x, gy); c.scale(dir * s, s); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3 / s * (baby ? 0.8 : 1);
  const hop = baby ? Math.abs(Math.sin(t * 7 + x * 0.1)) * 1.5 : 0; c.translate(0, -hop);
  const eye = (ex, ey, r) => { c.fillStyle = INK; circ(c, ex, ey, r); c.fill(); c.fillStyle = '#fff'; circ(c, ex - r * 0.35, ey - r * 0.4, r * 0.4); c.fill(); };
  const er = baby ? 1.8 : 1.4;
  if (k === 'duck') {
    c.fillStyle = baby ? '#ffe066' : '#ffffff'; ell(c, -2, -7, 10, 7); c.fill(); c.stroke(); circ(c, 6, -17, 6); c.fill(); c.stroke();
    c.fillStyle = '#ff9a2a'; c.beginPath(); c.moveTo(11, -17); c.lineTo(16, -15); c.lineTo(11, -13.5); c.closePath(); c.fill(); c.stroke();
    eye(7.5, -18.5, er); c.fillStyle = baby ? '#ffd23f' : '#e8e8f0'; ell(c, -4, -7, 5, 3, -0.3); c.fill();
    c.fillStyle = '#ff9a2a'; c.fillRect(-4, -1, 2, 2); c.fillRect(1, -1, 2, 2);
  } else if (k === 'cat') {
    c.fillStyle = baby ? '#ffc890' : '#ff9a4a'; c.lineWidth *= 1;
    c.beginPath(); c.moveTo(-10, -6); c.quadraticCurveTo(-18, -10, -15, -20); c.stroke();
    ell(c, -2, -7, 10, 7); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(1, -20); c.lineTo(3, -27); c.lineTo(7, -22); c.moveTo(9, -22); c.lineTo(13, -27); c.lineTo(13, -19); c.fill(); c.stroke();
    circ(c, 7, -17, 7); c.fill(); c.stroke(); eye(5, -18, er); eye(10, -18, er); c.fillStyle = '#ff7a9a'; circ(c, 8, -15, 1.1); c.fill();
    c.strokeStyle = '#c86a20'; c.lineWidth = 1; c.beginPath(); c.moveTo(-6, -12); c.lineTo(-5, -8); c.moveTo(-1, -13); c.lineTo(0, -9); c.stroke();
  } else if (k === 'dog') {
    c.fillStyle = baby ? '#f0d0a0' : '#d9a86a';
    c.beginPath(); c.moveTo(-10, -9); c.quadraticCurveTo(-16, -14 + Math.sin(t * 12) * 2, -13, -18); c.stroke();
    ell(c, -2, -7, 10, 7); c.fill(); c.stroke(); circ(c, 7, -17, 7); c.fill(); c.stroke();
    c.fillStyle = '#8a5a30'; ell(c, 2, -16, 3, 6, 0.3); c.fill(); c.stroke(); ell(c, 12.5, -15, 3, 5.5, -0.3); c.fill(); c.stroke();
    eye(6, -18, er); eye(10, -18, er); c.fillStyle = INK; ell(c, 8, -13.5, 2, 1.5); c.fill();
  } else if (k === 'hen') {
    if (baby) { c.fillStyle = '#ffe066'; circ(c, 0, -7, 7); c.fill(); c.stroke(); circ(c, 5, -14, 5); c.fill(); c.stroke(); c.fillStyle = '#ff9a2a'; c.beginPath(); c.moveTo(9, -14); c.lineTo(13, -13); c.lineTo(9, -11.5); c.closePath(); c.fill(); eye(6, -15, er); }
    else {
      c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-12, -14); c.lineTo(-16, -22); c.lineTo(-9, -16); c.closePath(); c.fill(); c.stroke();
      ell(c, -2, -8, 11, 8); c.fill(); c.stroke(); circ(c, 7, -18, 6); c.fill(); c.stroke();
      c.fillStyle = '#ff4d4d'; circ(c, 5, -25, 2.4); c.fill(); circ(c, 8.5, -25, 2.4); c.fill(); ell(c, 12, -14, 1.6, 2.6); c.fill();
      c.fillStyle = '#ffb030'; c.beginPath(); c.moveTo(12, -19); c.lineTo(16, -17); c.lineTo(12, -16); c.closePath(); c.fill(); eye(8.5, -19.5, er);
    }
  } else if (k === 'pig') {
    c.fillStyle = baby ? '#ffd0dc' : '#ffb0c8';
    ell(c, -2, -8, 11, 8); c.fill(); c.stroke(); circ(c, 7, -15, 7); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(3, -21); c.lineTo(4, -26); c.lineTo(8, -22); c.fill(); c.stroke();
    c.fillStyle = '#ff8aa8'; ell(c, 13, -14, 3.4, 3); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 12.2, -14, 0.7); c.fill(); circ(c, 13.8, -14, 0.7); c.fill(); eye(8, -17.5, er);
    c.strokeStyle = '#ff8aa8'; c.lineWidth = 1.2; c.beginPath(); c.arc(-14, -10, 2.4, 0, Math.PI * 1.6); c.stroke();
  }
  // ніжки
  if (k !== 'duck') { c.strokeStyle = INK; c.lineWidth = 1.2 / s; for (const fx of [-6, 3]) { c.beginPath(); c.moveTo(fx, -1); c.lineTo(fx, 0); c.stroke(); } }
  c.restore();
}
function drawMomGate(c, m, t) {
  // хвірточка-паркан і мама за нею
  const x = m.x * T, gy = m.gy;
  if (tileAt(m.x, 8) === 2) {
    for (let y = m.top; y < 10; y++) if (tileAt(m.x, y) === 2) {
      c.save(); c.fillStyle = '#f4ead8'; c.strokeStyle = INK; c.lineWidth = 1.2; c.fillRect(x + 2, y * T, T - 4, T); c.strokeRect(x + 2, y * T, T - 4, T);
      c.fillStyle = '#e8d8b8'; c.fillRect(x + 4, y * T + 2, 3, T - 4); c.restore();
    }
    c.save(); c.fillStyle = '#c8945a'; c.strokeStyle = INK; c.lineWidth = 1.2; for (const yy of [5.4, 8.4]) { c.fillRect(x - 2, yy * T, T + 4, 5); c.strokeRect(x - 2, yy * T, T + 4, 5); } c.restore();
    // бульбашка з малюком: кого шукає мама
    const bx = (m.x + 1.6) * T, by = gy - 64 + Math.sin(t * 2 + m.x) * 2;
    c.save(); c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, bx, by, 15); c.fill(); c.stroke(); c.beginPath(); c.moveTo(bx - 4, by + 13); c.lineTo(bx - 8, by + 22); c.lineTo(bx + 2, by + 14); c.fill(); c.restore();
    drawAnimal27(c, m.k, bx, by + 10, -1, t, 0.75, true);
  }
  const dir = m.open ? -1 : -1, jump = m.happy > 0 ? Math.abs(Math.sin(m.happy * 12)) * 5 : 0;
  drawAnimal27(c, m.k, (m.x + 1.6) * T, gy - jump, dir, t, 1.25, false);
  if (m.open) drawAnimal27(c, m.k, (m.x + 0.6) * T, gy, 1, t, 0.75, true);
  if (m.happy > 0) { c.save(); c.globalAlpha = Math.min(1, m.happy); for (let i = 0; i < 3; i++) { heart21 && heart21(c, (m.x + 1) * T + Math.sin(i * 2 + t * 3) * 10, gy - 40 - (2 - m.happy) * 20 - i * 10, 4); } c.restore(); }
}

/* ===== Над єдиноріжкою: малюк, якого несеш ===== */
function drawOver27(c, P, t) {
  if (!P.baby) return;
  const cx = P.x + P.w / 2, y = (P.flip ? P.y + P.h + 40 : P.y - 40) + Math.sin(t * 4) * 1.5;
  c.save(); c.globalAlpha = 0.55; c.fillStyle = '#ffffff'; circ(c, cx, y, 14); c.fill(); c.restore();
  drawAnimal27(c, P.baby, cx, y + 10, P.dir, t, 0.75, true);
}

function drawWorld27(c, t, vis) {
  if (G.babies) for (const b of G.babies) if (!b.taken && vis(b.x)) { const j = b.joy > 0 ? Math.abs(Math.sin(b.joy * 20)) * 4 : 0; drawAnimal27(c, b.k, b.x, b.y - j, -1, t, 0.85, true); }
  if (G.moms) for (const m of G.moms) if (vis((m.x + 1) * T, 120)) drawMomGate(c, m, t);
}

/* ===== Бобер Тріско ===== */
function drawBeaverBoss(c, B, t) {
  const rest = B.state === 'rest' && !B.dead, fl = B.flash > 0, run = B.state === 'dash' && !B.dead;
  c.save(); c.translate(B.x, B.gy - (run ? Math.abs(Math.sin(t * 16)) * 3 : 0)); c.scale(2.3, 2.3);
  drawBeaver(c, 0, 0, B.dir > 0 ? 1 : -1, run ? t * 2 : t, fl, B.dead);
  c.restore();
  if (rest) {
    const lx = B.x + (B.dir > 0 ? 34 : -34);
    c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = '#a8783e'; rr(c, lx - 16, B.gy - 16, 32, 16, 7); c.fill(); c.stroke();
    c.fillStyle = '#e8c890'; ell(c, lx + (B.dir > 0 ? -16 : 16), B.gy - 8, 4, 8); c.fill(); c.stroke();
    for (let i = 0; i < 3; i++) { c.fillStyle = '#e8c890'; c.save(); c.translate(lx + Math.sin(t * 9 + i * 2) * 14, B.gy - 22 - ((t * 40 + i * 12) % 26)); c.rotate(t * 6 + i); c.fillRect(-2.5, -1.2, 5, 2.4); c.restore(); }
    c.restore();
  }
  if (B.dead) { c.save(); c.fillStyle = 'rgba(255,120,170,.6)'; circ(c, B.x - 14, B.gy - 30, 3); c.fill(); circ(c, B.x + 14, B.gy - 30, 3); c.fill(); c.restore(); }
}
function drawChipBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(b.t * 12); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = '#e8c890';
  c.beginPath(); c.moveTo(-8, -2); c.lineTo(6, -4); c.lineTo(8, 2); c.lineTo(-6, 4); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#a8783e'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(-5, 0); c.lineTo(5, -1); c.stroke();
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock27(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'clockblock') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#ffe0a0'; c.fill(); c.stroke(); c.fillStyle = '#ffffff'; circ(c, 12, 12, 7.5); c.fill(); c.lineWidth = 1; c.stroke(); c.beginPath(); c.moveTo(12, 12); c.lineTo(12, 7); c.moveTo(12, 12); c.lineTo(15.5, 12); c.stroke(); }
  else if (b === 'beadblock') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#c8e8ff'; c.fill(); c.stroke(); for (let i = 0; i < 4; i++) { c.fillStyle = RAINBOW[i]; circ(c, 5 + i * 4.6, 12, 2.2); c.fill(); } c.strokeStyle = '#8a8a9a'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(2, 12); c.lineTo(T - 2, 12); c.stroke(); }
  else if (b === 'hayblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#ffd86a'; c.fill(); c.stroke(); c.strokeStyle = '#d0a830'; c.lineWidth = 1; for (const yy of [6, 11, 16]) { c.beginPath(); c.moveTo(3, yy); c.lineTo(T - 3, yy + 1); c.stroke(); } c.strokeStyle = '#c86a30'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(7, 1.5); c.lineTo(7, T - 1.5); c.moveTo(17, 1.5); c.lineTo(17, T - 1.5); c.stroke(); }
  else if (b === 'barnblock') { rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = '#e05a4a'; c.fill(); c.stroke(); c.strokeStyle = '#ffffff'; c.lineWidth = 1.8; c.beginPath(); c.moveTo(3, 3); c.lineTo(T - 3, T - 3); c.moveTo(T - 3, 3); c.lineTo(3, T - 3); c.stroke(); c.strokeRect(3, 3, T - 6, T - 6); }
  else if (b === 'logblock') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#a8783e'; c.fill(); c.stroke(); c.fillStyle = '#e8c890'; circ(c, 12, 12, 7); c.fill(); c.lineWidth = 0.8; c.strokeStyle = '#a8783e'; circ(c, 12, 12, 4); c.stroke(); circ(c, 12, 12, 1.5); c.stroke(); }
  else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor27(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'clockS': c.fillStyle = '#a8683a'; c.fillRect(x - 1.5, y - 14, 3, 14); drawClockFace(c, x, y - 20, 8, (Math.floor(x) % 12) + 1, t, false); break;
    case 'butterS': drawCountPic(c, 'butterfly', x + Math.sin(t * 2 + x) * 4, y - 14 + Math.cos(t * 3 + x) * 3, t, Math.floor(x)); break;
    case 'fenceS': c.fillStyle = '#f4ead8'; for (const fx of [-8, 0, 8]) { c.beginPath(); c.moveTo(x + fx - 3, y); c.lineTo(x + fx - 3, y - 12); c.lineTo(x + fx, y - 15); c.lineTo(x + fx + 3, y - 12); c.lineTo(x + fx + 3, y); c.closePath(); c.fill(); c.stroke(); } c.fillStyle = '#c8945a'; c.fillRect(x - 12, y - 9, 24, 3); break;
    case 'logS': c.fillStyle = '#a8783e'; rr(c, x - 10, y - 7, 20, 7, 3.5); c.fill(); c.stroke(); c.fillStyle = '#e8c890'; ell(c, x + 10, y - 3.5, 2.4, 3.5); c.fill(); c.stroke(); break;
  }
}

/* ===== Фони ===== */
function bgClockvillage(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 180;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.22, span) + 40, h = 90 + ((i % 2) + 2) % 2 * 20;
    c.fillStyle = '#f0d8b8'; c.fillRect(wx, 222 - h, 44, h); c.fillStyle = '#d06a5a'; c.beginPath(); c.moveTo(wx - 6, 222 - h); c.lineTo(wx + 22, 222 - h - 30); c.lineTo(wx + 50, 222 - h); c.closePath(); c.fill();
    drawClockFace(c, wx + 22, 222 - h + 22, 15, ((i % 12) + 12) % 12 + 1, t, false);
    c.fillStyle = '#9fd8ff'; c.fillRect(wx + 14, 222 - h + 48, 16, 18);
  }
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#a8dc90');
}
function bgCountmeadow(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  for (let i = 0; i < 10; i++) { const x = wrapX(i * 91 + 30 - camX * 0.18 + Math.sin(t + i) * 8, viewW + 100) - 50, y = 80 + ((i * 37) % 70) + Math.cos(t * 1.3 + i) * 6; c.save(); c.globalAlpha = 0.5; drawCountPic(c, 'butterfly', x, y, t, i); c.restore(); }
  hill(c, viewW, 200, 10, 0.012, 0.4, camX * 0.12, '#d8f0a8');
  hill(c, viewW, 218, 6, 0.03, 1.2, camX * 0.45, '#a8dc80');
}
function bgMamafarm(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const bx = wrapX(300 - camX * 0.2, viewW + 360) - 180;
  c.fillStyle = '#e05a4a'; c.fillRect(bx, 130, 120, 92); c.fillStyle = '#b04030'; c.beginPath(); c.moveTo(bx - 10, 132); c.lineTo(bx + 60, 90); c.lineTo(bx + 130, 132); c.closePath(); c.fill();
  c.fillStyle = '#ffffff'; c.fillRect(bx + 40, 170, 40, 52); c.strokeStyle = '#e05a4a'; c.lineWidth = 3; c.beginPath(); c.moveTo(bx + 40, 170); c.lineTo(bx + 80, 222); c.moveTo(bx + 80, 170); c.lineTo(bx + 40, 222); c.stroke();
  c.fillStyle = '#ffd86a'; c.fillRect(bx + 52, 110, 16, 16);
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#a8dc90');
}
function bgSmartfarm(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 150;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 30;
    c.fillStyle = '#ffd86a'; rr(c, wx, 190, 40, 32, 10); c.fill(); c.strokeStyle = '#d0a830'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(wx + 4, 200); c.lineTo(wx + 36, 202); c.moveTo(wx + 4, 210); c.lineTo(wx + 36, 212); c.stroke();
    c.fillStyle = '#a8683a'; c.fillRect(wx + 80, 150, 6, 72); drawClockFace(c, wx + 83, 146, 12, ((i % 12) + 12) % 12 + 1, t, false);
  }
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#b8e090');
}
function bgBeaverdam(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 190, 10, 0.012, 0.4, camX * 0.12, '#9ad0a0');
  c.fillStyle = '#7ac0e8'; c.fillRect(0, 200, viewW, 30);
  const span = 220;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.3, span); for (let l = 0; l < 4; l++) { c.fillStyle = l % 2 ? '#8a6040' : '#a8783e'; rr(c, wx + l * 8, 182 + l * 7, 90 - l * 10, 8, 4); c.fill(); } }
}
Object.assign(BG2, { clockvillage: bgClockvillage, countmeadow: bgCountmeadow, mamafarm: bgMamafarm, smartfarm: bgSmartfarm, beaverdam: bgBeaverdam });
