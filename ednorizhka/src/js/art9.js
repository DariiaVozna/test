'use strict';
/* ===== Частина 9: припливи, північне сяйво, грозові хмари, Місяць, Восьминіжка Ласунка ===== */

function drawTurtle(c, e, t, flash) {
  const cx = e.x + e.w / 2, gy = e.y + e.h, shell = e.state === 'shell' || e.state === 'slide';
  c.save(); c.translate(cx, gy); c.scale(e.dir || 1, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.1;
  if (!shell) {
    const step = Math.sin(t * 8) * 1.5;
    c.fillStyle = flash ? '#fff' : '#9be36a';
    for (const [lx, s] of [[-7, 1], [5, -1]]) { ell(c, lx + step * s * 0.4, -2, 3.4, 2.4); c.fill(); c.stroke(); }
    ell(c, 11, -8, 5, 4.4); c.fill(); c.stroke();
    c.fillStyle = '#fff'; circ(c, 12.4, -9.4, 1.9); c.fill(); c.fillStyle = INK; circ(c, 13, -9.2, 1); c.fill();
    c.beginPath(); c.arc(13, -6.6, 1.6, 0.1 * Math.PI, 0.8 * Math.PI); c.stroke();
  }
  if (e.state === 'slide') c.rotate(Math.sin(t * 40) * 0.08);
  c.fillStyle = flash ? '#fff' : '#3fbf7f'; c.beginPath(); c.moveTo(-11, -3); c.quadraticCurveTo(-11, -17, 0, -17); c.quadraticCurveTo(11, -17, 11, -3); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.fillRect(-11, -4, 22, 3); c.strokeRect(-11, -4, 22, 3);
  c.fillStyle = 'rgba(255,255,255,.35)'; for (const [hx, hy] of [[-5, -11], [2, -13], [6, -8], [-2, -7]]) { c.beginPath(); for (let k = 0; k < 6; k++) { const a = k * TAU / 6; c.lineTo(hx + Math.cos(a) * 2.6, hy + Math.sin(a) * 2.6); } c.closePath(); c.fill(); }
  if (e.state === 'shell') { c.fillStyle = INK; c.beginPath(); c.arc(-3, -9, 1.8, 0.1 * Math.PI, 0.9 * Math.PI); c.moveTo(4.8, -9); c.arc(3, -9, 1.8, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); }
  if (e.state === 'slide') for (let i = 0; i < 3; i++) { c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-15 - i * 5, -12 + i * 4); c.lineTo(-20 - i * 5, -12 + i * 4); c.stroke(); }
  c.restore();
}
function drawAlien(c, x, gy, dir, t, air, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const sq = air ? 1.12 : 0.92 + Math.abs(Math.sin(t * 3)) * 0.06, body = flash ? '#fff' : '#7fe08a';
  c.scale(1 / sq, sq);
  c.strokeStyle = INK; c.lineWidth = 1.1;
  c.fillStyle = body; ell(c, -5, -1, 3, 2); c.fill(); c.stroke(); ell(c, 5, -1, 3, 2); c.fill(); c.stroke();
  ell(c, 0, -8, 9, 8); c.fill(); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(0, -16); c.quadraticCurveTo(2, -21, 5, -22); c.stroke();
  c.fillStyle = '#ff7ab8'; circ(c, 5.5, -22.5, 2); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 1, -9, 4.4); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 2, -9, 2.2); c.fill(); c.fillStyle = '#fff'; circ(c, 2.8, -10, 0.8); c.fill();
  c.strokeStyle = INK; c.beginPath(); c.arc(1, -3.6, 2, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
  c.restore();
}
/* Крижаний кубик із замороженим ворогом */
function drawIceBlock(c, m, t) {
  if (m.state === 'gone') return;
  const k = m.st / m.life, warn = k > 0.75, sh = warn ? Math.sin(t * 40) * 0.8 : 0;
  c.save(); c.translate(m.x + sh, m.y); c.lineJoin = 'round';
  c.globalAlpha = warn ? 0.65 + 0.35 * Math.abs(Math.sin(t * 10)) : 1;
  c.fillStyle = 'rgba(200,240,255,.9)'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, 0, 0, m.w, 24, 5); c.fill(); c.stroke();
  c.fillStyle = m.col; c.globalAlpha *= 0.55; ell(c, m.w / 2, 13, 7, 6); c.fill(); c.globalAlpha = warn ? 0.8 : 1;
  c.fillStyle = 'rgba(255,255,255,.9)'; c.beginPath(); c.moveTo(4, 4); c.lineTo(11, 4); c.lineTo(4, 11); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(m.w - 9, 19); c.lineTo(m.w - 4, 14); c.stroke();
  if (warn) { c.fillStyle = 'rgba(150,210,255,.9)'; for (let i = 0; i < 3; i++) { const dy = ((t * 1.5 + i / 3) % 1) * 8; circ(c, 5 + i * (m.w - 10) / 2, 24 + dy, 1.4); c.fill(); } }
  c.restore();
}
/* Грозова хмарка */
function drawStormCloud(c, s, t, gt) {
  const ph = (gt + s.ph) % s.per, warn = ph > s.per - 1.25 && ph < s.per - 0.35, strike = ph >= s.per - 0.35;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  if (strike) {
    const g = c.createLinearGradient(s.x, s.y, s.x, s.gy); g.addColorStop(0, 'rgba(255,250,200,.6)'); g.addColorStop(1, 'rgba(255,250,200,.15)');
    c.fillStyle = g; c.fillRect(s.x - 16, s.y, 32, s.gy - s.y);
    c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(s.x, s.y + 12);
    const seg = 7, R = rng(Math.floor(gt * 20) + s.x);
    for (let i = 1; i <= seg; i++) c.lineTo(s.x + (i === seg ? 0 : (R() - 0.5) * 18), s.y + 12 + (s.gy - s.y - 12) * i / seg);
    c.stroke(); c.strokeStyle = '#ffe14d'; c.lineWidth = 3.4; c.stroke(); c.strokeStyle = '#ffffff'; c.lineWidth = 1.2; c.stroke();
  }
  const dark = warn || strike;
  c.fillStyle = dark ? '#7a7aa0' : '#a8b4d6'; c.strokeStyle = INK; c.lineWidth = 1.6;
  const puffs = [[-20, 4, 12], [-6, -4, 15], [10, -2, 14], [22, 6, 11], [0, 8, 13]];
  c.lineWidth = 3; for (const [px, py, r] of puffs) { circ(c, s.x + px, s.y + py, r); c.stroke(); }
  for (const [px, py, r] of puffs) { circ(c, s.x + px, s.y + py, r); c.fill(); }
  c.fillStyle = 'rgba(255,255,255,.35)'; ell(c, s.x - 8, s.y - 8, 7, 3); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (dark) { c.beginPath(); c.moveTo(s.x - 10, s.y - 1); c.lineTo(s.x - 4, s.y + 2); c.moveTo(s.x + 10, s.y - 1); c.lineTo(s.x + 4, s.y + 2); c.stroke(); c.fillStyle = INK; circ(c, s.x - 6, s.y + 4, 1.6); c.fill(); circ(c, s.x + 6, s.y + 4, 1.6); c.fill(); c.beginPath(); c.arc(s.x, s.y + 12, 3, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke(); }
  else { c.beginPath(); c.arc(s.x - 6, s.y + 3, 2.2, 0.1 * Math.PI, 0.9 * Math.PI); c.moveTo(s.x + 8.2, s.y + 3); c.arc(s.x + 6, s.y + 3, 2.2, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); }
  if (warn) for (let i = 0; i < 3; i++) sparkle(c, s.x - 14 + i * 14, s.y + 20 + Math.sin(t * 30 + i) * 3, 2 + Math.sin(t * 25 + i), '#ffe14d');
  c.strokeStyle = 'rgba(120,170,255,.7)'; c.lineWidth = 1.2;
  if (!strike) for (let i = 0; i < 5; i++) { const ry = ((t * 1.6 + i * 0.21) % 1) * 60; c.beginPath(); c.moveTo(s.x - 18 + i * 9, s.y + 16 + ry); c.lineTo(s.x - 20 + i * 9, s.y + 22 + ry); c.stroke(); }
  c.restore();
}
/* Зона невагомості */
function drawLowGrav(c, z, t) {
  c.save();
  const w = z.x1 - z.x0, g = c.createLinearGradient(z.x0, 0, z.x1, 0);
  g.addColorStop(0, 'rgba(185,154,255,0)'); g.addColorStop(0.15, 'rgba(185,154,255,.22)'); g.addColorStop(0.85, 'rgba(185,154,255,.22)'); g.addColorStop(1, 'rgba(185,154,255,0)');
  c.fillStyle = g; c.fillRect(z.x0, 0, w, VIEW_H);
  for (let i = 0; i < Math.ceil(w / 14); i++) {
    const x = z.x0 + ((i * 37) % w), y = VIEW_H - ((t * (18 + (i % 4) * 6) + i * 53) % VIEW_H);
    if (i % 3 === 0) { c.fillStyle = 'rgba(255,255,255,.75)'; starPath(c, x, y, 3, 1.3, t + i); c.fill(); }
    else { c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1; circ(c, x, y, 2 + (i % 3)); c.stroke(); }
  }
  c.restore();
}

/* Восьминіжка Ласунка та її щупальця */
function drawTentacle(c, tn, t, gy) {
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  if (tn.phase === 'warn') {
    for (let i = 0; i < 5; i++) { const k = (t * 2.5 + i / 5) % 1; c.fillStyle = `rgba(255,255,255,${0.85 * (1 - k)})`; circ(c, tn.x + (i - 2) * 5, gy - 3 - k * 18, 2 + k * 2.4); c.fill(); }
    c.fillStyle = 'rgba(122,90,217,.5)'; ell(c, tn.x, gy - 1, 14, 3); c.fill();
  } else if (tn.h > 2) {
    const top = gy - tn.h, sw = Math.sin(t * 6 + tn.x) * 6;
    c.fillStyle = '#e86fb4'; c.strokeStyle = INK; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(tn.x - 11, gy); c.quadraticCurveTo(tn.x - 12 + sw * 0.3, gy - tn.h * 0.5, tn.x - 4 + sw, top + 6);
    c.quadraticCurveTo(tn.x + sw, top - 6, tn.x + 6 + sw, top + 6); c.quadraticCurveTo(tn.x + 12 + sw * 0.3, gy - tn.h * 0.5, tn.x + 11, gy); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ffd6ea'; for (let y = gy - 10; y > top + 10; y -= 14) { const k = (gy - y) / tn.h; ell(c, tn.x + 4 + sw * k, y, 3, 2.4); c.fill(); c.lineWidth = 0.8; c.stroke(); }
  }
  c.restore();
}
function drawOctopus(c, B, t) {
  const st = B.state, flash = B.flash > 0, suck = st === 'suck', happy = st === 'happy';
  c.save(); c.translate(B.x, B.y); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.6;
  for (let i = 0; i < 6; i++) {
    const bx = -20 + i * 8, sw = Math.sin(t * 4 + i) * 5;
    c.fillStyle = flash ? '#fff' : '#d97ad9';
    c.beginPath(); c.moveTo(bx - 4, 10); c.quadraticCurveTo(bx - 5 + sw, 26, bx + sw * 1.4, 34); c.quadraticCurveTo(bx + 6 + sw, 28, bx + 4, 10); c.closePath(); c.fill(); c.stroke();
  }
  c.fillStyle = flash ? '#fff' : '#e693e6'; circ(c, 0, -4, 28); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.4)'; ell(c, -10, -18, 8, 4, -0.5); c.fill();
  c.fillStyle = '#c95fc9'; for (const [sx, sy, r] of [[12, -18, 3], [17, -9, 2], [-16, -2, 2.4]]) { circ(c, sx, sy, r); c.fill(); }
  c.fillStyle = '#ff5c7a'; c.strokeStyle = INK; c.lineWidth = 1;
  c.beginPath(); c.moveTo(8, -30); c.lineTo(2, -38); c.lineTo(14, -36); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(8, -30); c.lineTo(18, -40); c.lineTo(20, -30); c.closePath(); c.fill(); c.stroke(); circ(c, 9, -31, 2.4); c.fill(); c.stroke();
  c.lineWidth = 1.6;
  if (happy) { c.beginPath(); c.arc(-9, -6, 4, 1.1 * Math.PI, 1.9 * Math.PI); c.moveTo(13, -6); c.arc(9, -6, 4, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); c.beginPath(); c.arc(0, 4, 6, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); }
  else {
    c.fillStyle = '#fff'; ell(c, -9, -8, 5.4, 6.4); c.fill(); c.stroke(); ell(c, 9, -8, 5.4, 6.4); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, -8, -7, 2.8); c.fill(); circ(c, 10, -7, 2.8); c.fill(); c.fillStyle = '#fff'; circ(c, -7, -8.4, 1); c.fill(); circ(c, 11, -8.4, 1); c.fill();
    if (suck) { c.fillStyle = '#5a2a5a'; ell(c, 0, 8, 7, 6 + Math.sin(t * 20) * 1); c.fill(); c.stroke(); c.fillStyle = '#ff9fbf'; ell(c, 0, 11, 4, 2); c.fill(); }
    else { c.beginPath(); c.arc(0, 5, 4, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }
  }
  c.fillStyle = 'rgba(255,110,170,.5)'; circ(c, -17, 2, 3.4); c.fill(); circ(c, 17, 2, 3.4); c.fill();
  c.strokeStyle = 'rgba(200,235,255,.75)'; c.lineWidth = 2.4; circ(c, 0, -4, 35); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 2; c.beginPath(); c.arc(0, -4, 31, 3.6, 4.3); c.stroke();
  c.restore();
  if (suck) { c.save(); c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1.6; c.lineCap = 'round';
    for (let i = 0; i < 8; i++) { const a = i * TAU / 8 + t * 2, k = 1 - ((t * 1.8 + i / 8) % 1), r = 40 + k * 70; c.beginPath(); c.moveTo(B.x + Math.cos(a) * r, B.y + 8 + Math.sin(a) * r * 0.6); c.lineTo(B.x + Math.cos(a) * (r - 14), B.y + 8 + Math.sin(a) * (r - 14) * 0.6); c.stroke(); } c.restore(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, B.y - 46 - k * 30, 9); c.fillStyle = '#ff7ab8'; c.fill(); c.restore(); }
}

/* Блоки дев'ятої частини */
function drawBlock6(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'driftwood') {
    rr(c, 1, 2, T - 2, T - 3, 6); c.fillStyle = '#d9b48a'; c.fill(); c.stroke();
    c.strokeStyle = '#a8865e'; c.lineWidth = 1.1; c.beginPath(); c.moveTo(3, 8); c.quadraticCurveTo(12, 6, T - 3, 9); c.moveTo(3, 15); c.quadraticCurveTo(12, 18, T - 3, 15); c.stroke();
    c.fillStyle = '#fffaf2'; c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(16, 3); c.lineTo(20, 7); c.lineTo(15, 8); c.closePath(); c.fill(); c.stroke();
  } else if (b === 'iceglow') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#bfe9ff'; c.fill(); c.stroke();
    c.fillStyle = '#7fdcb0'; c.globalAlpha = 0.5; c.beginPath(); c.moveTo(1, 16); c.quadraticCurveTo(12, 8, T - 1, 14); c.lineTo(T - 1, 19); c.quadraticCurveTo(12, 13, 1, 21); c.closePath(); c.fill(); c.globalAlpha = 1;
    c.fillStyle = 'rgba(255,255,255,.9)'; c.beginPath(); c.moveTo(4, 4); c.lineTo(11, 4); c.lineTo(4, 11); c.closePath(); c.fill();
  } else if (b === 'thunder') {
    rr(c, 1, 1, T - 2, T - 2, 8); c.fillStyle = '#a8b4d6'; c.fill(); c.stroke();
    c.fillStyle = '#ffe14d'; c.beginPath(); c.moveTo(13, 3); c.lineTo(7, 13); c.lineTo(12, 13); c.lineTo(10, 21); c.lineTo(17, 10); c.lineTo(12, 10); c.closePath(); c.fill(); c.lineWidth = 0.9; c.stroke();
  } else if (b === 'moonrock') {
    rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#c9c4d6'; c.fill(); c.stroke();
    c.fillStyle = '#a8a2ba'; ell(c, 8, 9, 4, 3); c.fill(); ell(c, 16, 16, 3, 2.2); c.fill();
    c.fillStyle = 'rgba(255,255,255,.4)'; ell(c, 7.4, 8, 2.4, 1.2); c.fill();
  } else if (b === 'panel') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#d6dcf0'; c.fill(); c.stroke();
    c.fillStyle = '#8f9cc8'; rr(c, 4, 4, T - 8, 7, 2); c.fill();
    c.fillStyle = '#7dffe0'; circ(c, 7, 16, 1.6); c.fill(); c.fillStyle = '#ff7ab8'; circ(c, 12, 16, 1.6); c.fill(); c.fillStyle = '#ffd23f'; circ(c, 17, 16, 1.6); c.fill();
  } else return false;
  return true;
}
function drawDecor9(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'palmS':
      c.strokeStyle = '#a8743f'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 4, y - 12, x + 2, y - 24); c.stroke();
      c.fillStyle = '#4fbf5a'; c.strokeStyle = INK; c.lineWidth = 0.8;
      for (const a of [-2.6, -1.9, -1.2, -0.5]) { c.save(); c.translate(x + 2, y - 24); c.rotate(a + Math.sin(t * 2 + x) * 0.06); ell(c, 9, 0, 9, 2.6); c.fill(); c.stroke(); c.restore(); }
      break;
    case 'igloo':
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(x, y, 11, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = '#bfd9f5'; c.beginPath(); c.arc(x, y, 7, Math.PI, TAU); c.moveTo(x - 11, y - 5); c.lineTo(x + 11, y - 5); c.stroke();
      c.fillStyle = '#5a6a9a'; c.beginPath(); c.arc(x + 4, y, 3.4, Math.PI, TAU); c.closePath(); c.fill(); break;
    case 'puddle':
      c.fillStyle = 'rgba(160,200,255,.7)'; ell(c, x, y - 1, 9, 2.4); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.8)'; const k = (t * 1.5 + x * 0.01) % 1; c.beginPath(); c.ellipse(x, y - 1, 2 + k * 7, 0.6 + k * 1.8, 0, 0, TAU); c.globalAlpha = 1 - k; c.stroke(); c.globalAlpha = 1; break;
    case 'antenna':
      c.strokeStyle = '#8f9cc8'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 18); c.stroke();
      c.fillStyle = '#d6dcf0'; c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.arc(x, y - 18, 6, 0.1 * Math.PI, 0.9 * Math.PI); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = Math.sin(t * 4 + x) > 0 ? '#ff5c7a' : '#ffd23f'; circ(c, x, y - 26, 2); c.fill(); break;
  }
}

/* Фони дев'ятої частини */
function bgTide(c, viewW, camX, t) {
  const sx = viewW * 0.75, sg = c.createRadialGradient(sx, 46, 4, sx, 46, 54);
  sg.addColorStop(0, 'rgba(255,250,215,1)'); sg.addColorStop(0.35, 'rgba(255,240,180,.8)'); sg.addColorStop(1, 'rgba(255,240,180,0)');
  c.fillStyle = sg; circ(c, sx, 46, 54); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 18, 0.85, 'rgba(255,255,255,.9)'); }
  const sea = c.createLinearGradient(0, 150, 0, VIEW_H); sea.addColorStop(0, '#7fd8f0'); sea.addColorStop(1, '#3aa6d6');
  c.fillStyle = sea; c.fillRect(0, 150, viewW + 1, VIEW_H - 150);
  const span = 380;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.15, span) + 150;
    c.fillStyle = '#ffe2a8'; ell(c, wx, 152, 70, 10); c.fill();
    c.strokeStyle = '#a8743f'; c.lineWidth = 4; c.beginPath(); c.moveTo(wx - 10, 150); c.quadraticCurveTo(wx - 4, 120, wx + 6, 96); c.stroke();
    c.fillStyle = '#5fbf6a'; for (const a of [-2.7, -2, -1.2, -0.4]) { c.save(); c.translate(wx + 6, 96); c.rotate(a); ell(c, 16, 0, 16, 4); c.fill(); c.restore(); }
  }
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1.4;
  for (let i = 0; i < 12; i++) { const x = wrapX(i * 71 - camX * 0.25 + Math.sin(t + i) * 6, viewW + 40) - 20, y = 170 + (i % 4) * 14; c.beginPath(); c.moveTo(x - 6, y); c.lineTo(x + 6, y); c.stroke(); }
}
function bgAurora(c, viewW, camX, t) {
  const R = rng(51);
  for (let i = 0; i < 50; i++) { const x = wrapX(R() * 1400 - camX * 0.04, viewW + 20) - 10, y = R() * 140, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); c.fillStyle = `rgba(255,255,240,${0.3 + tw * 0.6})`; circ(c, x, y, 0.6 + R() * 0.9); c.fill(); }
  for (const [col, base, amp, ph] of [['rgba(120,255,190,.32)', 60, 20, 0], ['rgba(255,140,220,.24)', 84, 16, 2], ['rgba(140,200,255,.24)', 40, 14, 4]]) {
    c.fillStyle = col; c.beginPath(); c.moveTo(0, base + 40);
    for (let x = 0; x <= viewW + 10; x += 10) c.lineTo(x, base + Math.sin((x + camX * 0.08) * 0.012 + t * 0.4 + ph) * amp);
    for (let x = viewW + 10; x >= 0; x -= 10) c.lineTo(x, base + 46 + Math.sin((x + camX * 0.08) * 0.015 + t * 0.5 + ph) * amp * 0.6);
    c.closePath(); c.fill();
  }
  hill(c, viewW, 196, 14, 0.012, 0.6, camX * 0.18, '#c9d6f5');
  hill(c, viewW, 216, 10, 0.02, 2, camX * 0.35, '#e6edff');
  for (let i = 0; i < 30; i++) { const x = wrapX(i * 37 + Math.sin(t + i) * 10 - camX * 0.3, viewW + 20) - 10, y = wrapX(i * 53 + t * (10 + (i % 5) * 3), VIEW_H); c.fillStyle = 'rgba(255,255,255,.85)'; circ(c, x, y, 0.8 + (i % 3) * 0.5); c.fill(); }
}
function bgStorm(c, viewW, camX, t) {
  for (let i = 0; i < 7; i++) { const x = wrapX(i * 160 - camX * 0.12 + t * 8, viewW + 260) - 130; puffCloud(c, x, 34 + (i % 3) * 26, 1.2 + (i % 2) * 0.3, 'rgba(120,130,170,.45)'); }
  hill(c, viewW, 200, 12, 0.014, 0.5, camX * 0.2, '#9fb0d6');
  hill(c, viewW, 220, 9, 0.024, 1.6, camX * 0.38, '#b8c6e6');
  c.strokeStyle = 'rgba(200,220,255,.55)'; c.lineWidth = 1;
  for (let i = 0; i < 40; i++) { const x = wrapX(i * 29 - camX * 0.3 - t * 40, viewW + 20) - 10, y = wrapX(i * 47 + t * 240, VIEW_H + 20) - 20; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 3, y + 9); c.stroke(); }
  const fl = (t % 6.3); if (fl < 0.12) { c.fillStyle = 'rgba(255,255,240,.25)'; c.fillRect(0, 0, viewW + 1, VIEW_H); }
}
function bgMoon(c, viewW, camX, t) {
  const R = rng(61);
  for (let i = 0; i < 70; i++) { const x = wrapX(R() * 1400 - camX * 0.04, viewW + 20) - 10, y = R() * 200, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); c.fillStyle = `rgba(255,255,255,${0.35 + tw * 0.6})`; circ(c, x, y, 0.6 + R()); c.fill(); }
  const ex = viewW * 0.22, ey = 60;
  c.fillStyle = '#4cb6ff'; circ(c, ex, ey, 24); c.fill(); c.fillStyle = '#7fdc8a'; ell(c, ex - 6, ey - 4, 9, 6, 0.4); c.fill(); ell(c, ex + 9, ey + 8, 6, 4, -0.3); c.fill();
  c.fillStyle = 'rgba(255,255,255,.7)'; ell(c, ex + 2, ey - 14, 10, 3); c.fill();
  hill(c, viewW, 200, 12, 0.013, 0.8, camX * 0.2, '#6a6488');
  const span = 300;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 90;
    c.fillStyle = 'rgba(200,235,255,.55)'; c.beginPath(); c.arc(wx, 214, 34, Math.PI, TAU); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 2; c.beginPath(); c.arc(wx, 214, 28, 3.6, 4.4); c.stroke();
    c.fillStyle = '#8f9cc8'; c.fillRect(wx + 60, 170, 4, 44); c.fillStyle = Math.sin(t * 3 + i) > 0 ? '#ff5c7a' : '#ffd23f'; circ(c, wx + 62, 168, 3); c.fill();
  }
  c.fillStyle = '#857fa0'; c.fillRect(0, 214, viewW + 1, VIEW_H);
}
function bgStation(c, viewW, camX, t) {
  c.fillStyle = '#c9d0e8'; c.fillRect(0, 0, viewW + 1, VIEW_H);
  const span = 220;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span);
    c.fillStyle = '#1d1450'; rr(c, wx + 20, 40, 150, 110, 40); c.fill();
    const R = rng(71 + ((i + Math.floor(camX * 0.2 / span)) % 7 + 7) % 7);
    for (let k = 0; k < 14; k++) { c.fillStyle = 'rgba(255,255,255,.85)'; circ(c, wx + 30 + R() * 130, 50 + R() * 90, 0.6 + R()); c.fill(); }
    c.fillStyle = ['#ffb347', '#7fd6ff', '#ff9fd0'][((i % 3) + 3) % 3]; circ(c, wx + 60 + Math.sin(t * 0.2 + i) * 6, 100, 16); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 2; c.beginPath(); c.ellipse(wx + 60 + Math.sin(t * 0.2 + i) * 6, 100, 24, 6, -0.3, 0, TAU); c.stroke();
    c.strokeStyle = '#8f9cc8'; c.lineWidth = 6; rr(c, wx + 20, 40, 150, 110, 40); c.stroke();
    c.fillStyle = '#aab4d6'; c.fillRect(wx + 186, 0, 14, VIEW_H);
    for (let k = 0; k < 4; k++) { c.fillStyle = Math.sin(t * 3 + i + k) > 0.3 ? '#7dffe0' : '#5a6a9a'; circ(c, wx + 193, 30 + k * 40, 2.6); c.fill(); }
  }
  c.fillStyle = '#aab4d6'; c.fillRect(0, 214, viewW + 1, VIEW_H);
}
Object.assign(BG2, { tide: bgTide, aurora: bgAurora, storm: bgStorm, moon: bgMoon, station: bgStation });

function drawEnemy5(c, e, cx, fl) {
  if (e.k === 'turtle') { drawTurtle(c, e, e.t, fl); return true; }
  if (e.k === 'alien') { drawAlien(c, cx, e.y + e.h, e.dir, e.t, e.air, fl); return true; }
  return false;
}
