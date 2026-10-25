'use strict';
/* ===== Частина 8: канатні гори, вітряки, країна велетенських квітів, гойдалки, Будильник Дзеленчик ===== */

function drawGoat(c, x, gy, dir, t, flash, charge) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const step = Math.sin(t * (charge ? 22 : 9)) * 2, wool = flash ? '#fff' : '#fbf7f2', dark = flash ? '#fff' : '#b8a6a0';
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = dark; for (const [lx, s] of [[-7, 1], [-2, -1], [4, 1], [8, -1]]) { rr(c, lx + step * s * 0.5 - 1.3, -7, 2.6, 7, 1.2); c.fill(); c.stroke(); }
  c.fillStyle = wool; for (const [bx, by, r] of [[-7, -11, 5], [-1, -13, 6], [5, -11, 5], [0, -9, 6]]) { circ(c, bx, by, r); c.fill(); c.stroke(); }
  c.fillStyle = wool; for (const [bx, by, r] of [[-7, -11, 4], [-1, -13, 5], [5, -11, 4], [0, -9, 5]]) { circ(c, bx, by, r); c.fill(); }
  c.save(); c.translate(10, charge ? -10 : -15); c.rotate(charge ? 0.5 : 0);
  c.fillStyle = '#efe6e0'; ell(c, 2, 0, 5.4, 4.4); c.fill(); c.stroke();
  c.strokeStyle = '#c9a07a'; c.lineWidth = 2; c.beginPath(); c.arc(-1, -4, 4, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); c.beginPath(); c.arc(2, -5, 4, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
  c.fillStyle = '#ffb3c6'; ell(c, 6.4, 1.4, 1.8, 1.4); c.fill();
  c.fillStyle = INK; circ(c, 3, -1.4, 1); c.fill();
  c.fillStyle = '#fbf7f2'; c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(3, 4); c.lineTo(4, 8); c.lineTo(5.4, 4); c.fill(); c.stroke();
  c.restore();
  if (charge) for (let i = 0; i < 3; i++) { c.fillStyle = 'rgba(200,180,160,.6)'; circ(c, -12 - i * 5, -2 - (i % 2) * 2, 2.4 - i * 0.5); c.fill(); }
  c.restore();
}
function drawSpider(c, x, y, t, flash, top) {
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, top); c.lineTo(x, y - 7); c.stroke();
  c.translate(x, y);
  c.strokeStyle = INK; c.lineWidth = 1.4;
  for (const s of [-1, 1]) for (let i = 0; i < 4; i++) { const a = (i - 1.5) * 0.45 + Math.sin(t * 6 + i) * 0.12; c.beginPath(); c.moveTo(s * 5, 0); c.quadraticCurveTo(s * 11, -5 + i * 2, s * (13 + Math.cos(a) * 2), 3 + i * 2.4); c.stroke(); }
  c.fillStyle = flash ? '#fff' : '#9a7ad9'; c.lineWidth = 1.1; circ(c, 0, 0, 7.5); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, -2.6, -1, 2.4); c.fill(); circ(c, 2.6, -1, 2.4); c.fill();
  c.fillStyle = INK; circ(c, -2.3, -0.6, 1.2); c.fill(); circ(c, 2.9, -0.6, 1.2); c.fill();
  c.fillStyle = 'rgba(255,110,170,.6)'; circ(c, -4.6, 2.6, 1.3); c.fill(); circ(c, 4.6, 2.6, 1.3); c.fill();
  c.fillStyle = '#ff7ab8'; c.strokeStyle = INK; c.lineWidth = 0.8;
  c.beginPath(); c.moveTo(0, -7); c.lineTo(-5, -10); c.lineTo(-5, -4.5); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(0, -7); c.lineTo(5, -10); c.lineTo(5, -4.5); c.closePath(); c.fill(); c.stroke();
  circ(c, 0, -7.2, 1.4); c.fill(); c.stroke();
  c.restore();
}
function drawAnt(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const body = flash ? '#fff' : '#e8604a', step = Math.sin(t * 16) * 1.6;
  c.strokeStyle = INK; c.lineWidth = 1;
  for (let i = 0; i < 3; i++) { const lx = -4 + i * 4; c.beginPath(); c.moveTo(lx, -5); c.lineTo(lx + (i % 2 ? step : -step), 0); c.stroke(); }
  c.fillStyle = body; ell(c, -6, -6, 4.4, 3.6); c.fill(); c.stroke(); ell(c, -0.5, -6, 2.6, 2.2); c.fill(); c.stroke(); circ(c, 5, -7, 3.6); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(6, -10); c.quadraticCurveTo(8, -15, 11, -14); c.moveTo(7.5, -9.5); c.quadraticCurveTo(11, -12, 13, -10); c.stroke();
  c.fillStyle = '#fff'; circ(c, 6, -8, 1.3); c.fill(); c.fillStyle = INK; circ(c, 6.4, -8, 0.7); c.fill();
  c.fillStyle = '#7fd46a'; c.lineWidth = 0.8; ell(c, -4, -12, 5, 2.4, -0.3); c.fill(); c.stroke();
  c.restore();
}

/* Канатна дорога */
function drawZip(c, z, t) {
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
  for (const [px, py, gy] of [[z.x0, z.y0, z.gy0], [z.x1, z.y1, z.gy1]]) {
    c.fillStyle = '#8a5a30'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, px - 3, py - 8, 6, gy - py + 8, 2); c.fill(); c.stroke();
    c.fillStyle = '#c98d55'; rr(c, px - 9, py - 10, 18, 5, 2); c.fill(); c.stroke();
  }
  c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(z.x0, z.y0); c.lineTo(z.x1, z.y1); c.stroke();
  c.strokeStyle = '#e6d6c0'; c.lineWidth = 1.4; c.stroke();
  const hx = z.hx, hy = z.hy;
  c.fillStyle = '#c9d2e6'; c.strokeStyle = INK; c.lineWidth = 1; circ(c, hx, hy - 8, 3.4); c.fill(); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.moveTo(hx, hy - 5); c.lineTo(hx, hy); c.stroke();
  c.fillStyle = '#ff7ab8'; rr(c, hx - 8, hy - 1, 16, 4, 2); c.fill(); c.lineWidth = 1; c.stroke();
  if (z.state === 'idle') sparkle(c, hx + 10, hy - 10 + Math.sin(t * 4) * 2, 1.8 + Math.sin(t * 6) * 0.5, '#fff8c0');
  c.restore();
}
/* Попутний вітер */
function drawBreeze(c, z, t) {
  c.save(); c.lineCap = 'round';
  const w = z.x1 - z.x0;
  for (let i = 0; i < Math.ceil(w / 16); i++) {
    const k = ((t * 0.9 + i * 0.37) % 1), x = z.x0 + ((i * 53) % w + k * 120) % w, y = 30 + ((i * 71) % 200);
    c.globalAlpha = Math.sin(k * Math.PI) * 0.7; c.strokeStyle = '#ffffff'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(x - 18, y); c.quadraticCurveTo(x - 9, y - 3, x, y); c.stroke();
    if (i % 4 === 0) { c.fillStyle = ['#7fd46a', '#ffd23f', '#ff9a7a'][i % 3]; ell(c, x + 4, y - 2 + Math.sin(t * 6 + i) * 2, 3, 1.5, t * 4 + i); c.fill(); }
  }
  c.globalAlpha = 1; c.restore();
}
/* Гойдалки, овечки й лопаті вітряків */
function drawMover3(c, m, theme) {
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  if (m.swing) {
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(m.px, m.py); c.lineTo(m.x + 5, m.y); c.moveTo(m.px, m.py); c.lineTo(m.x + m.w - 5, m.y); c.stroke();
    c.fillStyle = '#8a5a30'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, m.px, m.py, 4); c.fill(); c.stroke();
    c.fillStyle = '#c98d55'; rr(c, m.x, m.y, m.w, 8, 3); c.fill(); c.stroke();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1; c.beginPath(); c.moveTo(m.x + m.w / 2, m.y + 1); c.lineTo(m.x + m.w / 2, m.y + 7); c.stroke();
    c.fillStyle = '#ff7ab8'; heartPath(c, m.x + m.w / 2, m.y + 12, 6); c.fill();
  } else if (m.sheep) {
    const d = m.dir || 1, bob = Math.abs(Math.sin(G.t * 5 + m.bx)) * 1.2;
    c.translate(m.x + m.w / 2, m.y - bob);
    c.fillStyle = '#6e5f80'; c.strokeStyle = INK; c.lineWidth = 1;
    for (const lx of [-14, -6, 6, 14]) { rr(c, lx - 2, 22, 4, 12 + bob, 2); c.fill(); c.stroke(); }
    c.fillStyle = '#ffffff';
    const puffs = [[-16, 10, 9], [-6, 6, 10], [6, 6, 10], [16, 10, 9], [-10, 18, 9], [10, 18, 9], [0, 14, 10]];
    c.lineWidth = 2.4; for (const [px, py, r] of puffs) { circ(c, px, py, r); c.stroke(); }
    for (const [px, py, r] of puffs) { circ(c, px, py, r); c.fill(); }
    c.save(); c.scale(d, 1);
    c.fillStyle = '#6e5f80'; c.lineWidth = 1; ell(c, 22, 12, 7, 6); c.fill(); c.stroke();
    c.fillStyle = '#fff'; circ(c, 20, 6, 3.4); c.fill();
    c.strokeStyle = '#fff'; c.lineWidth = 1.2; c.beginPath(); c.arc(23, 11, 1.6, 0.1 * Math.PI, 0.9 * Math.PI); c.moveTo(27.4, 11); c.arc(26, 11, 1.4, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();
    c.restore();
    c.fillStyle = '#fff'; c.font = '900 9px Nunito, system-ui, sans-serif'; c.textAlign = 'center';
    const zk = (G.t * 0.5 + m.bx * 0.01) % 1; c.globalAlpha = 1 - zk; c.fillText('z', d * 24 + zk * 6, -6 - zk * 14);
  } else if (m.circ) {
    c.fillStyle = '#c98d55'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, m.x, m.y + 1, m.w, 9, 3); c.fill(); c.stroke();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1; c.beginPath(); for (let x = m.x + 8; x < m.x + m.w - 2; x += 8) { c.moveTo(x, m.y + 2); c.lineTo(x, m.y + 9); } c.stroke();
  } else { c.restore(); return false; }
  c.restore();
  return true;
}
function drawWindmillStruct(c, w, t) {
  const cx = w.cx, cy = w.cy, gy = 10 * T;
  c.save(); c.lineJoin = 'round';
  c.fillStyle = '#fff3e0'; c.strokeStyle = INK; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(cx - 30, gy); c.lineTo(cx - 14, cy + 6); c.lineTo(cx + 14, cy + 6); c.lineTo(cx + 30, gy); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#c98d55'; rr(c, cx - 8, gy - 26, 16, 26, 7); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; circ(c, cx, cy + 34, 6); c.fill(); c.stroke();
  c.fillStyle = '#ff5c7a'; c.beginPath(); c.moveTo(cx - 18, cy + 8); c.lineTo(cx, cy - 12); c.lineTo(cx + 18, cy + 8); c.closePath(); c.fill(); c.stroke();
  for (let i = 0; i < w.n; i++) {
    const a = t * TAU / w.period + i * TAU / w.n;
    c.save(); c.translate(cx, cy); c.rotate(a);
    c.fillStyle = 'rgba(255,255,255,.85)'; c.strokeStyle = 'rgba(59,31,79,.6)'; c.lineWidth = 1.2; c.fillRect(10, -7, w.r - 18, 14); c.strokeRect(10, -7, w.r - 18, 14);
    c.strokeStyle = 'rgba(138,90,48,.7)'; c.beginPath(); for (let x = 18; x < w.r - 8; x += 9) { c.moveTo(x, -7); c.lineTo(x, 7); } c.moveTo(4, 0); c.lineTo(w.r, 0); c.stroke();
    c.restore();
  }
  c.fillStyle = '#8a5a30'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, cx, cy, 6); c.fill(); c.stroke();
  c.restore();
}

/* Будильник Дзеленчик */
function drawClockBoss(c, B, t) {
  const st = B.state, flash = B.flash > 0, sleep = st === 'sleep' || st === 'yawn', happy = st === 'happy';
  const shake = st === 'ring' || st === 'wake' ? Math.sin(t * 60) * 2 : 0;
  const sq = st === 'land' ? 0.88 : 1;
  c.save(); c.translate(B.x + shake, B.y + 34); c.scale(1, sq); c.translate(0, -34); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#ffd23f'; for (const s of [-1, 1]) { ell(c, s * 14, 32, 8, 4); c.fill(); c.stroke(); }
  for (const s of [-1, 1]) {
    c.save(); c.translate(s * 17, -27); c.rotate(s * 0.45 + (st === 'ring' ? Math.sin(t * 50 + s) * 0.25 : 0));
    c.fillStyle = flash ? '#fff' : '#ffd23f'; c.beginPath(); c.arc(0, 0, 10, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#fff8c0'; ell(c, -3, -5, 3, 1.5, -0.4); c.fill();
    c.restore();
  }
  c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -30); c.lineTo(0, -40); c.stroke(); c.fillStyle = '#ffd23f'; c.lineWidth = 1.2; circ(c, 0, -41, 3); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#ff7a95'; c.lineWidth = 1.6; circ(c, 0, 0, 30); c.fill(); c.stroke();
  c.fillStyle = '#fffaf2'; circ(c, 0, 0, 23); c.fill(); c.lineWidth = 1.2; c.stroke();
  c.fillStyle = '#c9b6ff'; for (let i = 0; i < 12; i++) { const a = i * TAU / 12; circ(c, Math.cos(a) * 19, Math.sin(a) * 19, i % 3 ? 1 : 1.8); c.fill(); }
  const spd = sleep ? 0.2 : happy ? 1 : 4;
  c.strokeStyle = '#7a5ad9'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(t * spd - 1.6) * 14, Math.sin(t * spd - 1.6) * 14); c.stroke();
  c.strokeStyle = '#ff5c7a'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(t * spd * 6) * 17, Math.sin(t * spd * 6) * 17); c.stroke();
  c.fillStyle = INK; circ(c, 0, 0, 2); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1.6;
  if (sleep) { c.beginPath(); c.arc(-9, -7, 3.4, 0.1 * Math.PI, 0.9 * Math.PI); c.moveTo(12.4, -7); c.arc(9, -7, 3.4, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); c.fillStyle = '#ff9fbf'; ell(c, 0, 11, 3, 2.4); c.fill(); }
  else if (happy) { c.beginPath(); c.arc(-9, -6, 3.4, 1.1 * Math.PI, 1.9 * Math.PI); c.moveTo(12.4, -6); c.arc(9, -6, 3.4, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); c.beginPath(); c.arc(0, 7, 6, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); }
  else {
    c.fillStyle = '#fff'; circ(c, -9, -7, 4.4); c.fill(); c.stroke(); circ(c, 9, -7, 4.4); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, -8.4, -6.4, 2); c.fill(); circ(c, 9.6, -6.4, 2); c.fill();
    c.beginPath(); c.moveTo(-14, -14); c.lineTo(-5, -11); c.moveTo(14, -14); c.lineTo(5, -11); c.stroke();
    if (st === 'ring' || st === 'wake') { c.fillStyle = '#ff5c7a'; ell(c, 0, 11, 5, 4); c.fill(); c.stroke(); } else { c.beginPath(); c.arc(0, 13, 4, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke(); }
  }
  c.fillStyle = 'rgba(255,110,170,.45)'; circ(c, -16, 4, 3.4); c.fill(); circ(c, 16, 4, 3.4); c.fill();
  c.restore();
  if (sleep) { c.save(); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 2.4; c.font = '900 14px Nunito, system-ui, sans-serif'; c.textAlign = 'center';
    for (let i = 0; i < 3; i++) { const k = (t * 0.6 + i / 3) % 1; c.globalAlpha = 1 - k; const zx = B.x + 26 + k * 18 + i * 3, zy = B.y - 40 - k * 36; c.strokeText('Z', zx, zy); c.fillText('Z', zx, zy); } c.restore(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, B.y - 46 - k * 30, 9); c.fillStyle = '#ff7ab8'; c.fill(); c.restore(); }
}
function drawRingWave(c, b) {
  c.save(); c.lineCap = 'round';
  const d = b.vx > 0 ? 1 : -1, col = b.high ? '#7fc8ff' : '#ffd23f';
  for (let i = 0; i < 3; i++) {
    c.globalAlpha = 1 - i * 0.28; c.strokeStyle = INK; c.lineWidth = 4.2 - i; c.beginPath(); c.arc(b.x - d * i * 5, b.y, 8 - i * 1.5, d > 0 ? -1.1 : Math.PI - 1.1, d > 0 ? 1.1 : Math.PI + 1.1); c.stroke();
    c.strokeStyle = col; c.lineWidth = 2.6 - i * 0.6; c.stroke();
  }
  c.globalAlpha = 1; noteShape(c, b.x - d * 4, b.y - 9 + Math.sin(b.t * 10) * 2, 0.7, col);
  c.restore();
}

/* Блоки восьмої частини */
function drawBlock5(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'rockblock') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#b8aa9a'; c.fill(); c.stroke();
    c.fillStyle = '#fffaf2'; c.beginPath(); c.moveTo(2, 7); c.quadraticCurveTo(2, 2, 7, 2); c.lineTo(T - 7, 2); c.quadraticCurveTo(T - 2, 2, T - 2, 7); c.lineTo(T - 6, 6); c.lineTo(T - 10, 9); c.lineTo(14, 6); c.lineTo(8, 9); c.closePath(); c.fill();
    c.fillStyle = '#9c8e7e'; ell(c, 8, 15, 3, 1.6); c.fill(); ell(c, 16, 18, 2.4, 1.3); c.fill();
  } else if (b === 'haybale') {
    rr(c, 1, 2, T - 2, T - 3, 6); c.fillStyle = '#ffd86b'; c.fill(); c.stroke();
    c.strokeStyle = '#d9a83a'; c.lineWidth = 1; c.beginPath(); for (let y = 7; y < T - 2; y += 4) { c.moveTo(3, y); c.lineTo(T - 3, y); } c.stroke();
    c.fillStyle = '#ff5c7a'; c.fillRect(T / 2 - 2, 2, 4, T - 3);
  } else if (b === 'trunk') {
    c.fillStyle = '#9a6a42'; c.fillRect(0, 0, T, T);
    c.strokeStyle = '#6e4428'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(5, 0); c.quadraticCurveTo(8, T / 2, 5, T); c.moveTo(14, 0); c.quadraticCurveTo(11, T / 2, 15, T); c.moveTo(20, 4); c.lineTo(20, 14); c.stroke();
    c.fillStyle = '#7fd46a'; ell(c, 10, 6, 2.6, 1.4, 0.4); c.fill();
    c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(0.7, 0); c.lineTo(0.7, T); c.moveTo(T - 0.7, 0); c.lineTo(T - 0.7, T); c.stroke();
  } else if (b === 'pillowblock') {
    c.fillStyle = '#e6dcff'; c.beginPath(); c.moveTo(2, 4); c.quadraticCurveTo(T / 2, 7, T - 2, 4); c.quadraticCurveTo(T - 5, T / 2, T - 2, T - 3); c.quadraticCurveTo(T / 2, T - 6, 2, T - 3); c.quadraticCurveTo(5, T / 2, 2, 4); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#b99aff'; circ(c, T / 2, T / 2, 2); c.fill();
    c.fillStyle = 'rgba(255,255,255,.7)'; ell(c, 8, 8, 3, 1.3, -0.3); c.fill();
  } else return false;
  return true;
}
function drawPillowTile(c) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#fff0fa'; c.beginPath(); c.moveTo(1, 6); c.quadraticCurveTo(T / 2, 1, T - 1, 6); c.lineTo(T - 1, T - 2); c.quadraticCurveTo(T / 2, T - 5, 1, T - 2); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ff9fd0'; c.fillRect(2, 13, T - 4, 3);
  c.fillStyle = '#ffd23f'; starPath(c, T / 2, 9, 3, 1.4, 0); c.fill();
}

/* Декор восьмої частини */
function drawDecor8(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'wheat':
      c.strokeStyle = '#d9a83a'; c.lineWidth = 1.4;
      for (let i = -1; i <= 1; i++) { const sw = Math.sin(t * 2 + x + i) * 1.5; c.beginPath(); c.moveTo(x + i * 4, y); c.lineTo(x + i * 4 + sw, y - 16); c.stroke(); c.fillStyle = '#ffd86b'; ell(c, x + i * 4 + sw, y - 19, 2, 4, 0.1 * i); c.fill(); }
      break;
    case 'dewdrop': {
      const g = c.createRadialGradient(x - 2, y - 8, 1, x, y - 6, 7); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(150,220,255,.5)');
      c.fillStyle = g; c.beginPath(); c.moveTo(x, y - 15); c.quadraticCurveTo(x + 7, y - 6, x, y - 1); c.quadraticCurveTo(x - 7, y - 6, x, y - 15); c.fill(); c.strokeStyle = 'rgba(59,31,79,.4)'; c.stroke(); break;
    }
    case 'clover':
      c.strokeStyle = '#3f9e4f'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 8); c.stroke();
      c.fillStyle = '#6fcf5a'; c.strokeStyle = INK; c.lineWidth = 0.8; for (const a of [-2.2, -0.9, 0.4]) { circ(c, x + Math.cos(a) * 3.4, y - 10 + Math.sin(a) * 3.4, 3); c.fill(); c.stroke(); } break;
    case 'zzz': {
      const k = (t * 0.4 + x * 0.01) % 1; c.save(); c.globalAlpha = 0.8 * (1 - k); c.fillStyle = '#ffffff'; c.font = '900 11px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('z', x + k * 8, y - 10 - k * 20); c.restore(); break;
    }
    case 'edelweiss':
      c.strokeStyle = '#6fcf5a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 9); c.stroke();
      c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 0.7; for (let i = 0; i < 6; i++) { const a = i * TAU / 6; ell(c, x + Math.cos(a) * 3.2, y - 11 + Math.sin(a) * 3.2, 2.6, 1.3, a); c.fill(); c.stroke(); }
      c.fillStyle = '#ffd23f'; circ(c, x, y - 11, 1.6); c.fill(); break;
  }
}

/* Фони восьмої частини */
function bgPeaks(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 18, 0.85, 'rgba(255,255,255,.9)'); }
  for (const [f, base, col, sp, h] of [[0.1, 190, '#c9d6ec', 160, 130], [0.25, 214, '#a9bcd9', 110, 90]]) {
    for (let i = -1; i < viewW / sp + 2; i++) {
      const wx = i * sp + wrapX(-camX * f, sp), hh = h * (0.75 + (((i + Math.floor(camX * f / sp)) * 53 % 4 + 4) % 4) * 0.08);
      c.fillStyle = col; c.beginPath(); c.moveTo(wx - sp * 0.8, base + 40); c.lineTo(wx, base - hh); c.lineTo(wx + sp * 0.8, base + 40); c.closePath(); c.fill();
      c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(wx - hh * 0.24, base - hh * 0.72); c.lineTo(wx, base - hh); c.lineTo(wx + hh * 0.24, base - hh * 0.72); c.lineTo(wx + hh * 0.1, base - hh * 0.66); c.lineTo(wx - hh * 0.06, base - hh * 0.74); c.closePath(); c.fill();
    }
    c.fillStyle = col; c.fillRect(0, base + 38, viewW + 1, VIEW_H);
  }
  const cs = 360, co = wrapX(-camX * 0.18, cs);
  c.strokeStyle = 'rgba(59,31,79,.35)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, 96); c.lineTo(viewW + 1, 120); c.stroke();
  for (let x = -cs + co; x < viewW + cs; x += cs) { const y = 96 + x / viewW * 24; c.fillStyle = '#ff7a95'; rr(c, x - 9, y + 6, 18, 14, 4); c.fill(); c.fillStyle = '#d6f0ff'; c.fillRect(x - 6, y + 9, 12, 5); c.strokeStyle = 'rgba(59,31,79,.5)'; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 6); c.stroke(); }
}
function bgWindmill(c, viewW, camX, t) {
  const sx = viewW * 0.8, sg = c.createRadialGradient(sx, 46, 4, sx, 46, 54);
  sg.addColorStop(0, 'rgba(255,250,210,1)'); sg.addColorStop(0.35, 'rgba(255,240,170,.8)'); sg.addColorStop(1, 'rgba(255,240,170,0)');
  c.fillStyle = sg; circ(c, sx, 46, 54); c.fill();
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 170 - camX * 0.1 + t * 14, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 20, 0.8, 'rgba(255,255,255,.9)'); }
  hill(c, viewW, 190, 14, 0.012, 0.4, camX * 0.15, '#c6eaa0');
  const span = 240;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.15, span) + 60, base = 196;
    c.fillStyle = '#fff3e0'; c.beginPath(); c.moveTo(wx - 12, base); c.lineTo(wx - 6, base - 50); c.lineTo(wx + 6, base - 50); c.lineTo(wx + 12, base); c.closePath(); c.fill();
    c.fillStyle = '#ff7a95'; c.beginPath(); c.moveTo(wx - 9, base - 50); c.lineTo(wx, base - 60); c.lineTo(wx + 9, base - 50); c.closePath(); c.fill();
    c.save(); c.translate(wx, base - 52); c.rotate(t * 1.4 + i);
    c.fillStyle = 'rgba(255,255,255,.9)'; for (let k = 0; k < 4; k++) { c.rotate(TAU / 4); c.fillRect(3, -3, 26, 6); }
    c.restore();
  }
  hill(c, viewW, 214, 8, 0.02, 1.4, camX * 0.35, '#ffe08a');
  c.strokeStyle = 'rgba(217,168,58,.6)'; c.lineWidth = 1;
  for (let i = 0; i < 30; i++) { const x = wrapX(i * 29 - camX * 0.35, viewW + 20) - 10; c.beginPath(); c.moveTo(x, 232); c.lineTo(x + Math.sin(t * 2 + i) * 2, 218); c.stroke(); }
}
function bgTiny(c, viewW, camX, t) {
  const span = 90;
  for (const [f, col, h] of [[0.15, 'rgba(120,200,110,.45)', 200], [0.35, 'rgba(90,180,90,.6)', 150]]) {
    for (let i = -1; i < viewW / span + 2; i++) {
      const wx = i * span + wrapX(-camX * f, span) + (f > 0.2 ? 30 : 0), hh = h - (((i + Math.floor(camX * f / span)) * 37 % 3 + 3) % 3) * 30;
      c.fillStyle = col; c.beginPath(); c.moveTo(wx - 10, VIEW_H); c.quadraticCurveTo(wx - 4, VIEW_H - hh * 0.6, wx + 8, VIEW_H - hh); c.quadraticCurveTo(wx + 2, VIEW_H - hh * 0.5, wx + 10, VIEW_H); c.closePath(); c.fill();
    }
  }
  const fs = 260;
  for (let i = -1; i < viewW / fs + 2; i++) {
    const wx = i * fs + wrapX(-camX * 0.25, fs) + 120, fy = 70 + (i % 2) * 20;
    c.strokeStyle = '#5fb36a'; c.lineWidth = 8; c.beginPath(); c.moveTo(wx, VIEW_H); c.quadraticCurveTo(wx + 10, 160, wx, fy); c.stroke();
    c.fillStyle = (i % 2) ? '#ffd6ea' : '#ffffff'; for (let k = 0; k < 12; k++) { const a = k * TAU / 12 + t * 0.1; ell(c, wx + Math.cos(a) * 26, fy + Math.sin(a) * 26, 16, 7, a); c.fill(); }
    c.fillStyle = '#ffd23f'; circ(c, wx, fy, 15); c.fill();
  }
  for (let i = 0; i < 8; i++) { const x = wrapX(i * 113 - camX * 0.3, viewW + 40) - 20, y = 120 + (i % 3) * 30; const g = c.createRadialGradient(x - 2, y - 2, 0, x, y, 6); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(150,220,255,.35)'); c.fillStyle = g; circ(c, x, y, 6); c.fill(); }
}
function bgSwing(c, viewW, camX, t) {
  const sx = viewW * 0.25, sg = c.createRadialGradient(sx, 80, 4, sx, 80, 70);
  sg.addColorStop(0, 'rgba(255,230,180,1)'); sg.addColorStop(0.35, 'rgba(255,200,150,.7)'); sg.addColorStop(1, 'rgba(255,200,150,0)');
  c.fillStyle = sg; circ(c, sx, 80, 70); c.fill();
  const span = 150;
  for (const [f, col, trunk] of [[0.18, '#c9dca0', '#b89a7a'], [0.38, '#9fc87f', '#8a6a48']]) {
    for (let i = -1; i < viewW / span + 2; i++) {
      const wx = i * span + wrapX(-camX * f, span) + (f > 0.3 ? 70 : 0);
      c.fillStyle = trunk; c.fillRect(wx - 6, 90, 12, 160);
      c.fillStyle = col; for (const [dx, dy, r] of [[0, 70, 36], [-26, 86, 26], [26, 84, 28], [0, 46, 24]]) { circ(c, wx + dx, dy, r); c.fill(); }
      if (f > 0.3) { c.strokeStyle = 'rgba(138,90,48,.7)'; c.lineWidth = 1; const a = Math.sin(t * 1.6 + i) * 0.4; c.beginPath(); c.moveTo(wx + 22, 100); c.lineTo(wx + 22 + Math.sin(a) * 60, 100 + Math.cos(a) * 60); c.stroke(); c.fillStyle = '#c98d55'; c.fillRect(wx + 14 + Math.sin(a) * 60, 98 + Math.cos(a) * 60, 16, 4); }
    }
    c.fillStyle = col; c.fillRect(0, 226, viewW + 1, VIEW_H);
  }
}
function bgDream(c, viewW, camX, t) {
  const mx = viewW * 0.78; const mg = c.createRadialGradient(mx, 56, 4, mx, 56, 60); mg.addColorStop(0, 'rgba(255,248,215,.55)'); mg.addColorStop(1, 'rgba(255,248,215,0)');
  c.fillStyle = mg; circ(c, mx, 56, 60); c.fill();
  c.fillStyle = '#fff6c8'; circ(c, mx, 56, 26); c.fill(); c.fillStyle = '#4a3a8e'; circ(c, mx + 12, 48, 24); c.fill();
  const R = rng(41);
  for (let i = 0; i < 50; i++) { const x = wrapX(R() * 1400 - camX * 0.05, viewW + 20) - 10, y = R() * 170, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); c.fillStyle = `rgba(255,255,240,${0.3 + tw * 0.6})`; if (i % 7 === 0) { starPath(c, x, y, 3, 1.3, 0); c.fill(); } else { circ(c, x, y, 0.7 + R() * 0.9); c.fill(); } }
  for (let i = 0; i < 5; i++) {
    const x = wrapX(i * 210 - camX * 0.14 + t * 3, viewW + 260) - 130, y = 120 + (i % 3) * 22;
    puffCloud(c, x, y, 1.1, 'rgba(230,220,255,.55)');
    c.strokeStyle = 'rgba(90,74,160,.6)'; c.lineWidth = 1.2; c.beginPath(); c.arc(x - 5, y + 3, 2.4, 0.1 * Math.PI, 0.9 * Math.PI); c.moveTo(x + 9.4, y + 3); c.arc(x + 7, y + 3, 2.4, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();
  }
  hill(c, viewW, 220, 8, 0.02, 0.5, camX * 0.35, '#7a6ac0');
}
Object.assign(BG2, { peaks: bgPeaks, windmill: bgWindmill, tiny: bgTiny, swing: bgSwing, dream: bgDream });

function drawEnemy4(c, e, cx, fl) {
  switch (e.k) {
    case 'goat': drawGoat(c, cx, e.y + e.h, e.dir, e.t, fl, e.state === 'charge'); return true;
    case 'spider': drawSpider(c, cx, e.y + e.h / 2, e.t, fl, e.top); return true;
    case 'ant': drawAnt(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
  }
  return false;
}
