'use strict';
/* ===== Частина 2: нові вороги, пружинки, вода, карамель, Пан Колючка ===== */
const CARAMEL_Y = 10.55 * T;

function drawBee(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const f = Math.abs(Math.sin(t * 28));
  c.fillStyle = 'rgba(255,255,255,.85)'; c.strokeStyle = INK; c.lineWidth = 0.8;
  c.save(); c.translate(-1, -6); c.rotate(-0.5); c.scale(1, 0.4 + f * 0.6); ell(c, -2, -4, 3.6, 6); c.fill(); c.stroke(); c.restore();
  c.save(); c.translate(2, -6); c.rotate(0.3); c.scale(1, 0.4 + f * 0.6); ell(c, 1, -4, 3, 5); c.fill(); c.stroke(); c.restore();
  c.fillStyle = INK; c.beginPath(); c.moveTo(-8.5, -1); c.lineTo(-12.5, 0.5); c.lineTo(-8.5, 2); c.closePath(); c.fill();
  c.fillStyle = flash ? '#fff' : '#ffd23f'; c.lineWidth = 1.1; ell(c, 0, 0, 9, 7); c.fill(); c.stroke();
  c.save(); ell(c, 0, 0, 9, 7); c.clip(); c.fillStyle = INK; c.fillRect(-5.5, -8, 2.6, 16); c.fillRect(-0.5, -8, 2.6, 16); c.restore();
  c.strokeStyle = INK; c.lineWidth = 0.9;
  c.beginPath(); c.moveTo(5, -5); c.quadraticCurveTo(6, -9, 8.5, -10); c.moveTo(7, -4.5); c.quadraticCurveTo(9, -8, 11, -8); c.stroke();
  c.fillStyle = INK; circ(c, 8.5, -10, 1); c.fill(); circ(c, 11, -8, 1); c.fill();
  c.fillStyle = '#fff'; circ(c, 5.6, -1, 2.2); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 6.2, -0.8, 1.1); c.fill();
  c.beginPath(); c.moveTo(3.6, -4.2); c.lineTo(7.4, -3.2); c.stroke();
  c.restore();
}

function drawUfo(c, x, y, t, flash) {
  c.save(); c.translate(x, y + Math.sin(t * 3) * 1.2); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = flash ? '#fff' : '#8ee68a'; circ(c, 0, -3.2, 3.8); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, -1.4, -3.2, 0.85); c.fill(); circ(c, 1.4, -3.2, 0.85); c.fill();
  c.lineWidth = 0.8; c.beginPath(); c.moveTo(-2.8, -5.4); c.lineTo(-0.6, -4.6); c.moveTo(2.8, -5.4); c.lineTo(0.6, -4.6); c.stroke();
  c.lineWidth = 1;
  c.fillStyle = 'rgba(190,235,255,.5)'; c.beginPath(); c.arc(0, -0.5, 8, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.75)'; ell(c, -4, -4.5, 1.4, 2.4, 0.5); c.fill();
  c.fillStyle = flash ? '#fff' : '#bdb5dd'; ell(c, 0, 1.5, 15, 5); c.fill(); c.stroke();
  c.fillStyle = '#8d84b8'; ell(c, 0, 4.2, 8, 2.2); c.fill(); c.stroke();
  for (let i = 0; i < 5; i++) { c.fillStyle = RAINBOW[(i + Math.floor(t * 6)) % 6]; circ(c, -10 + i * 5, 1.8, 1.3); c.fill(); }
  c.restore();
}

function drawFish(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const w = Math.sin(t * 10) * 2;
  c.fillStyle = flash ? '#fff' : '#ff9f5a'; c.strokeStyle = INK; c.lineWidth = 1;
  c.beginPath(); c.moveTo(-7, 0); c.lineTo(-14, -5 + w * 0.5); c.lineTo(-12.5, 0); c.lineTo(-14, 5 - w * 0.5); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#c86a1e'; c.lineWidth = 1.2;
  for (let i = 0; i < 9; i++) { const a = -Math.PI * 0.85 + i * Math.PI * 1.7 / 8; c.beginPath(); c.moveTo(Math.cos(a) * 8.5, Math.sin(a) * 8.5); c.lineTo(Math.cos(a) * 11, Math.sin(a) * 11); c.stroke(); }
  c.fillStyle = flash ? '#fff' : '#ffc06b'; c.strokeStyle = INK; c.lineWidth = 1.1; circ(c, 0, 0, 9); c.fill(); c.stroke();
  c.fillStyle = '#fff3c9'; ell(c, 1, 4.2, 6, 3.4); c.fill();
  c.fillStyle = '#ff9f5a'; ell(c, -2, 1, 3, 1.8, 0.6 + w * 0.05); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 4, -2.6, 2.6); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 4.8, -2.4, 1.3); c.fill();
  c.beginPath(); c.moveTo(1.4, -6); c.lineTo(5.8, -5.4); c.stroke();
  c.fillStyle = '#ff6f8a'; circ(c, 8.4, 1.6, 1.4); c.fill(); c.stroke();
  c.restore();
}

function drawJelly(c, x, y, t, flash) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = flash ? '#fff' : '#e86fb4'; c.lineWidth = 1.6;
  for (let i = 0; i < 4; i++) { const bx = -6 + i * 4; c.beginPath(); c.moveTo(bx, 3); for (let k = 1; k <= 4; k++) c.lineTo(bx + Math.sin(t * 4 + i + k) * 1.8, 3 + k * 3.2); c.stroke(); }
  const sq = 1 + Math.sin(t * 2.2) * 0.06;
  c.save(); c.scale(1 / sq, sq);
  c.fillStyle = flash ? '#fff' : 'rgba(255,160,215,.92)'; c.strokeStyle = INK; c.lineWidth = 1.1;
  c.beginPath(); c.moveTo(-10, 3); c.quadraticCurveTo(-11, -11, 0, -11); c.quadraticCurveTo(11, -11, 10, 3);
  for (let i = 0; i < 4; i++) { const x0 = 10 - i * 5; c.quadraticCurveTo(x0 - 2.5, 5.5, x0 - 5, 3); }
  c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, -4.5, -6, 2.8, 1.5, -0.4); c.fill();
  c.fillStyle = INK; circ(c, -3, -2.5, 1.1); c.fill(); circ(c, 3, -2.5, 1.1); c.fill();
  c.lineWidth = 0.9; c.beginPath(); c.moveTo(-5, -5.2); c.lineTo(-1.8, -4.2); c.moveTo(5, -5.2); c.lineTo(1.8, -4.2); c.stroke();
  c.beginPath(); c.arc(0, 1.6, 1.8, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke();
  c.restore(); c.restore();
}

function drawCrab(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.lineJoin = 'round'; c.lineCap = 'round';
  const body = flash ? '#fff' : '#ff6b5a';
  c.strokeStyle = INK; c.lineWidth = 1.4;
  for (const s of [-1, 1]) for (let i = 0; i < 3; i++) {
    const ph = Math.sin(t * 14 + i * 2 + (s > 0 ? 1 : 0)) * 1.5;
    c.beginPath(); c.moveTo(s * (4 + i * 2.5), -5); c.lineTo(s * (9 + i * 2.5), -3 + ph * 0.3); c.lineTo(s * (10 + i * 2.5) + ph, 0); c.stroke();
  }
  const snap = Math.abs(Math.sin(t * 7)) * 0.5;
  for (const s of [-1, 1]) {
    c.save(); c.translate(s * 11, -12); c.scale(s, 1);
    c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(-5, 5); c.lineTo(-1, 1); c.stroke();
    c.fillStyle = body; c.lineWidth = 1;
    c.save(); c.rotate(-snap); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(2, -6, 6.5, -4); c.quadraticCurveTo(4, -1.5, 0, 0); c.closePath(); c.fill(); c.stroke(); c.restore();
    c.save(); c.rotate(snap * 0.6); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(4, 2, 6.5, -1); c.quadraticCurveTo(3, -2, 0, 0); c.closePath(); c.fill(); c.stroke(); c.restore();
    c.restore();
  }
  c.fillStyle = body; c.strokeStyle = INK; c.lineWidth = 1.2; ell(c, 0, -7, 10.5, 6.5); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.45)'; ell(c, -3, -10, 4, 1.6, -0.2); c.fill();
  c.beginPath(); c.moveTo(-3, -12); c.lineTo(-4, -16.5); c.moveTo(3, -12); c.lineTo(4, -16.5); c.stroke();
  c.fillStyle = '#fff'; circ(c, -4, -18, 2.4); c.fill(); c.stroke(); circ(c, 4, -18, 2.4); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, -3.6 + dir * 0.5, -17.8, 1.1); c.fill(); circ(c, 4.4 + dir * 0.5, -17.8, 1.1); c.fill();
  c.lineWidth = 1; c.beginPath(); c.moveTo(-6.5, -21.5); c.lineTo(-2.5, -20.2); c.moveTo(6.5, -21.5); c.lineTo(2.5, -20.2); c.stroke();
  c.beginPath(); c.arc(0, -3.5, 2.2, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke();
  c.restore();
}

function drawSpark(c, x, y, t, st, stT, vy) {
  if (st === 'wait') return;
  if (st === 'warn') {
    const k = Math.min(1, stT / 0.7);
    c.fillStyle = `rgba(255,245,190,${0.35 + k * 0.5})`; ell(c, x, CARAMEL_Y + 1, 5 + k * 6, 2 + k * 2); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1;
    for (let i = 0; i < 3; i++) { const by = CARAMEL_Y - ((t * 30 + i * 6) % 14); circ(c, x - 4 + i * 4, by, 1.4 + k); c.stroke(); }
    return;
  }
  c.save(); c.translate(x, y); c.lineJoin = 'round';
  const tail = vy < 0 ? 1 : -1;
  const g = c.createRadialGradient(0, 0, 1, 0, 0, 13); g.addColorStop(0, 'rgba(255,240,160,.9)'); g.addColorStop(1, 'rgba(255,140,60,0)');
  c.fillStyle = g; circ(c, 0, 0, 13); c.fill();
  c.fillStyle = '#ff8a3d'; c.strokeStyle = INK; c.lineWidth = 1;
  c.beginPath(); c.moveTo(-6, 0); c.quadraticCurveTo(-4, tail * 10, 0, tail * (15 + Math.sin(t * 20) * 1.5)); c.quadraticCurveTo(4, tail * 10, 6, 0); c.closePath(); c.fill(); c.stroke();
  const bg = c.createRadialGradient(-2, -2, 1, 0, 0, 7); bg.addColorStop(0, '#fff3a0'); bg.addColorStop(0.6, '#ffb547'); bg.addColorStop(1, '#ff6f5a');
  c.fillStyle = bg; circ(c, 0, 0, 7); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, -2.4, -0.6, 1); c.fill(); circ(c, 2.4, -0.6, 1); c.fill();
  c.lineWidth = 0.9; c.beginPath(); c.moveTo(-4, -3.4); c.lineTo(-1.3, -2.4); c.moveTo(4, -3.4); c.lineTo(1.3, -2.4); c.stroke();
  c.beginPath(); c.arc(0, 3.2, 1.6, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke();
  c.restore();
}

function drawSpring(c, x, gy, sq, theme) {
  c.save(); c.translate(x, gy); c.lineJoin = 'round'; c.lineCap = 'round';
  const k = sq > 0 ? 0.5 + (0.22 - sq) * 2 : 1;
  const h = 11 * Math.min(1, Math.max(0.45, k));
  c.fillStyle = '#8a7bb3'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, -8, -3, 16, 3.5, 1.5); c.fill(); c.stroke();
  const coil = () => { c.beginPath(); c.moveTo(0, -3); for (let i = 1; i <= 5; i++) c.lineTo(i % 2 ? -5 : 5, -3 - h * i / 5); c.lineTo(0, -3 - h); };
  c.strokeStyle = INK; c.lineWidth = 3.4; coil(); c.stroke();
  c.strokeStyle = '#eef0f8'; c.lineWidth = 1.8; coil(); c.stroke();
  const ty = -3 - h;
  c.strokeStyle = INK; c.lineWidth = 0.9;
  if (theme === 'garden') {
    for (let i = 0; i < 6; i++) { const a = i * TAU / 6; c.fillStyle = i % 2 ? '#ff9fcb' : '#ff7ab8'; ell(c, Math.cos(a) * 7, ty - 3 + Math.sin(a) * 2.6, 4.6, 2.8, a); c.fill(); c.stroke(); }
    c.fillStyle = '#ffe14d'; ell(c, 0, ty - 3, 4.4, 2.4); c.fill(); c.stroke();
  } else if (theme === 'volcano') {
    c.fillStyle = '#fff3f8'; rr(c, -10, ty - 8, 20, 8, 4); c.fill(); c.stroke();
    c.fillStyle = '#ff9fcb'; c.fillRect(-9, ty - 4.8, 18, 1.6);
  } else {
    c.fillStyle = '#bfe6ff'; c.beginPath(); c.moveTo(-10, ty); c.lineTo(-6, ty - 6); c.lineTo(6, ty - 6); c.lineTo(10, ty); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.moveTo(-6, ty - 1); c.lineTo(-3.5, ty - 5); c.lineTo(0, ty - 5); c.lineTo(-2.5, ty - 1); c.closePath(); c.fill();
  }
  c.restore();
}

function drawSpike(c, x, y, a) {
  c.save(); c.translate(x, y); c.rotate(a); c.lineJoin = 'round';
  c.fillStyle = '#5f3d2b'; c.strokeStyle = INK; c.lineWidth = 1;
  c.beginPath(); c.moveTo(8, 0); c.lineTo(-5, -3.2); c.lineTo(-3, 0); c.lineTo(-5, 3.2); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ff9fcb'; circ(c, -4, 0, 1.4); c.fill();
  c.restore();
}

/* Пан Колючка: st = wait | walk | curl | roll | dizzy | happy */
function drawBigHedgehog(c, x, gy, dir, t, st, flash, rot) {
  c.save(); c.translate(x, gy); c.lineJoin = 'round'; c.lineCap = 'round';
  const spikeCol = flash ? '#eeeeee' : '#5f3d2b';
  if (st === 'roll' || st === 'curl') {
    const shake = st === 'curl' ? Math.sin(t * 70) * 1.6 : 0;
    c.translate(shake, -24); c.rotate(rot || 0);
    c.fillStyle = spikeCol; c.strokeStyle = INK; c.lineWidth = 1.5;
    const n = 16; c.beginPath();
    for (let i = 0; i < n; i++) { const a = i * TAU / n, a2 = a + Math.PI / n; c.lineTo(Math.cos(a) * 20, Math.sin(a) * 20); c.lineTo(Math.cos(a2) * 31, Math.sin(a2) * 31); }
    c.closePath(); c.fill(); c.stroke();
    c.fillStyle = flash ? '#fff' : '#7a5236'; circ(c, 0, 0, 21); c.fill(); c.stroke();
    c.strokeStyle = '#a8744f'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 12, 0.3, 2.3); c.stroke();
    c.fillStyle = '#f2cda4'; c.strokeStyle = INK; c.lineWidth = 1; circ(c, 9, 7, 5); c.fill(); c.stroke();
    c.fillStyle = '#ff6fa8'; circ(c, 12, 9, 1.8); c.fill();
    c.restore(); return;
  }
  c.save(); c.scale(dir * 2.3, 2.3);
  c.lineWidth = 0.8; c.strokeStyle = INK;
  const step = st === 'walk' ? Math.sin(t * 9) * 1.2 : 0;
  c.fillStyle = '#5a3a2a'; rr(c, -8 + step, -3, 4, 4, 1.5); c.fill(); c.stroke(); rr(c, 3 - step, -3, 4, 4, 1.5); c.fill(); c.stroke();
  c.fillStyle = spikeCol; c.beginPath(); c.moveTo(-13, -3);
  const tips = [];
  for (let i = 0; i <= 8; i++) {
    const a = Math.PI + i * Math.PI / 8 * 0.85;
    c.lineTo(-1 + Math.cos(a) * 11, -4 + Math.sin(a) * 11 * 0.95);
    const tx = -1 + Math.cos(a + 0.12) * 17, ty = -4 + Math.sin(a + 0.12) * 17 * 0.9;
    c.lineTo(tx, ty); tips.push([tx, ty]);
  }
  c.lineTo(9, -6); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#a8744f'; ell(c, -1, -5, 10, 6.5); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#f2cda4'; c.beginPath(); c.moveTo(4, -10); c.quadraticCurveTo(15, -8, 15, -3); c.quadraticCurveTo(9, 0, 3, -1); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ff6fa8'; circ(c, 15, -3.5, 1.6); c.fill();
  c.lineWidth = 0.7;
  if (st === 'wait') { c.beginPath(); c.arc(9, -6.8, 1.3, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); }
  else if (st === 'dizzy') { c.beginPath(); for (let a = 0; a < 3 * TAU; a += 0.4) { const r = 0.25 + a * 0.12; c.lineTo(9 + Math.cos(a + t * 8) * r, -6.5 + Math.sin(a + t * 8) * r); } c.stroke(); }
  else if (st === 'happy') { c.beginPath(); c.arc(9, -6, 1.4, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); c.fillStyle = 'rgba(255,120,180,.6)'; circ(c, 11.5, -3.5, 1.5); c.fill(); }
  else { c.fillStyle = INK; circ(c, 9, -6.5, 1.3); c.fill(); c.fillStyle = '#fff'; circ(c, 9.4, -7, 0.45); c.fill(); c.beginPath(); c.moveTo(6.8, -9.6); c.lineTo(10.8, -8.2); c.stroke(); }
  c.save(); c.translate(6.5, -11.2); c.rotate(-0.18);
  c.fillStyle = '#7b3dff'; c.lineWidth = 0.6; ell(c, 0, 0, 4.4, 1); c.fill(); c.stroke();
  rr(c, -2.6, -5.4, 5.2, 5.4, 0.8); c.fill(); c.stroke();
  c.fillStyle = '#ff7ab8'; c.fillRect(-2.6, -1.9, 5.2, 1.2);
  c.restore();
  if (st === 'happy') { const fc = ['#ff7ab8', '#ffe14d', '#a6dcff', '#c9b6ff']; [1, 3, 5, 7].forEach((k, i) => flower(c, tips[k][0], tips[k][1], 1.1, fc[i])); }
  c.restore();
  if (st === 'dizzy') {
    for (let i = 0; i < 3; i++) { const a = t * 4 + i * TAU / 3; c.fillStyle = '#ffe14d'; c.strokeStyle = INK; c.lineWidth = 0.8; starPath(c, dir * 12 + Math.cos(a) * 16, -54 + Math.sin(a) * 5, 4, 1.8, a); c.fill(); c.stroke(); }
  }
  if (st === 'wait') { c.fillStyle = INK; c.font = '800 10px Nunito, system-ui, sans-serif'; c.globalAlpha = 0.6; c.fillText('z', dir * 30, -46 - (t * 6) % 8); c.fillText('Z', dir * 37, -57 - (t * 6) % 8); c.globalAlpha = 1; }
  c.restore();
}

/* Вода та карамель — у координатах світу */
function drawWater(c, z, camX, viewW, t) {
  const x0 = Math.max(z.x0, camX - 10), x1 = Math.min(z.x1, camX + viewW + 10);
  if (x1 <= x0) return;
  const surf = x => z.y + Math.sin(x * 0.09 + t * 3) * 1.5;
  c.save();
  const g = c.createLinearGradient(0, z.y, 0, VIEW_H); g.addColorStop(0, 'rgba(80,200,250,.34)'); g.addColorStop(1, 'rgba(30,110,200,.52)');
  c.fillStyle = g; c.beginPath(); c.moveTo(x0, VIEW_H);
  for (let x = x0; x <= x1; x += 6) c.lineTo(x, surf(x));
  c.lineTo(x1, surf(x1)); c.lineTo(x1, VIEW_H); c.closePath(); c.fill();
  c.beginPath(); c.rect(x0, z.y, x1 - x0, VIEW_H - z.y); c.clip();
  c.fillStyle = 'rgba(255,255,255,.08)';
  const span = z.x1 - z.x0 + 60;
  for (let i = 0; i < 6; i++) { const rx = z.x0 + ((i * 97 + t * 8) % span) - 30; c.beginPath(); c.moveTo(rx, z.y); c.lineTo(rx + 14, z.y); c.lineTo(rx + 40, VIEW_H); c.lineTo(rx + 22, VIEW_H); c.closePath(); c.fill(); }
  c.restore();
  c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 1.8; c.beginPath();
  for (let x = x0; x <= x1; x += 6) c.lineTo(x, surf(x));
  c.lineTo(x1, surf(x1)); c.stroke();
}
function drawCaramel(c, camX, viewW, t) {
  const x0 = camX - 10, x1 = camX + viewW + 10, y0 = CARAMEL_Y;
  const g = c.createLinearGradient(0, y0, 0, VIEW_H); g.addColorStop(0, '#ffc75a'); g.addColorStop(1, '#e07b2a');
  c.fillStyle = g; c.beginPath(); c.moveTo(x0, VIEW_H);
  for (let x = x0; x <= x1; x += 8) c.lineTo(x, y0 + Math.sin(x * 0.05 + t * 2) * 1.6);
  c.lineTo(x1, VIEW_H); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 1.4; c.beginPath();
  for (let x = x0; x <= x1; x += 8) c.lineTo(x, y0 + 2.5 + Math.sin(x * 0.05 + t * 2) * 1.6);
  c.stroke();
  c.fillStyle = 'rgba(255,240,200,.75)';
  for (let i = 0; i < 9; i++) { const bx = Math.floor(camX / 90) * 90 + i * 90 + 30, ph = (t * 0.8 + i * 0.37) % 1; circ(c, bx + Math.sin(i) * 20, y0 + 10 - ph * 6, 1 + ph * 2.5); c.fill(); }
}

/* Декор нових світів */
function drawDecor2(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round';
  switch (d.k) {
    case 'tulip':
      c.strokeStyle = '#3aa65a'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 1.5, y - 7, x, y - 13); c.stroke();
      c.fillStyle = '#5fcf6a'; ell(c, x + 3, y - 5, 3, 1.2, -0.6); c.fill();
      c.fillStyle = d.c; c.strokeStyle = INK; c.lineWidth = 0.7;
      c.beginPath(); c.moveTo(x - 4, y - 18); c.lineTo(x - 2, y - 15); c.lineTo(x, y - 19); c.lineTo(x + 2, y - 15); c.lineTo(x + 4, y - 18);
      c.quadraticCurveTo(x + 4.5, y - 11, x, y - 11.5); c.quadraticCurveTo(x - 4.5, y - 11, x - 4, y - 18); c.closePath(); c.fill(); c.stroke();
      break;
    case 'shell':
      c.fillStyle = d.c; c.strokeStyle = INK; c.lineWidth = 0.8;
      c.beginPath(); c.moveTo(x, y - 1); c.arc(x, y - 1, 6, Math.PI * 1.05, Math.PI * 1.95); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = 'rgba(59,31,79,.4)'; c.beginPath();
      for (let i = 1; i < 5; i++) { const a = Math.PI + i * Math.PI / 5; c.moveTo(x, y - 1); c.lineTo(x + Math.cos(a) * 5.5, y - 1 + Math.sin(a) * 5.5); }
      c.stroke(); break;
    case 'starfish':
      c.fillStyle = '#ff8a5c'; c.strokeStyle = INK; c.lineWidth = 0.8; starPath(c, x, y - 4, 5.5, 2.4, 0.2); c.fill(); c.stroke();
      c.fillStyle = '#ffd1a8'; circ(c, x - 1, y - 5, 0.6); c.fill(); circ(c, x + 1.5, y - 3.5, 0.6); c.fill(); break;
    case 'weed':
      for (let i = 0; i < 3; i++) {
        const bx = x - 4 + i * 4, h = 14 + (i % 2) * 6;
        c.strokeStyle = i % 2 ? '#2fbf8a' : '#22a37a'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(bx, y);
        for (let k = 1; k <= 4; k++) c.lineTo(bx + Math.sin(t * 2 + k + i) * 2, y - h * k / 4);
        c.stroke();
      }
      break;
    case 'gumdrop':
      c.fillStyle = d.c; c.strokeStyle = INK; c.lineWidth = 0.9;
      c.beginPath(); c.moveTo(x - 6, y); c.quadraticCurveTo(x - 6, y - 9, x, y - 9); c.quadraticCurveTo(x + 6, y - 9, x + 6, y); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.85)'; for (const [dx, dy] of [[-2.5, -5], [1, -6.5], [2.5, -3]]) { circ(c, x + dx, y + dy, 0.7); c.fill(); }
      break;
    case 'rock':
      c.fillStyle = '#a69dd6'; c.strokeStyle = INK; c.lineWidth = 0.9; ell(c, x, y - 3, 7, 4); c.fill(); c.stroke();
      c.fillStyle = '#8d84bf'; ell(c, x + 2, y - 4, 2, 1); c.fill(); break;
    case 'gem': {
      const g = c.createRadialGradient(x, y - 8, 0, x, y - 8, 14); g.addColorStop(0, 'rgba(255,200,255,.45)'); g.addColorStop(1, 'rgba(255,200,255,0)');
      c.fillStyle = g; circ(c, x, y - 8, 14); c.fill();
      c.strokeStyle = INK; c.lineWidth = 0.9;
      for (const [dx, h, col] of [[-4, 10, '#c9b6ff'], [0, 15, d.c], [4.5, 8, '#bfe6ff']]) {
        c.fillStyle = col; c.beginPath(); c.moveTo(x + dx - 2.4, y); c.lineTo(x + dx - 2.4, y - h + 3); c.lineTo(x + dx, y - h); c.lineTo(x + dx + 2.4, y - h + 3); c.lineTo(x + dx + 2.4, y); c.closePath(); c.fill(); c.stroke();
      }
      c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(x - 1.2, y - 11, 1, 7);
      break;
    }
    default: drawDecor3(c, d, t);
  }
}

/* Фони нових світів (координати екрана) */
const wrapX = (x, span) => ((x % span) + span) % span;
function bgGarden(c, viewW, camX, t) {
  const sx = viewW * 0.22, sg = c.createRadialGradient(sx, 48, 4, sx, 48, 58);
  sg.addColorStop(0, 'rgba(255,248,190,1)'); sg.addColorStop(0.35, 'rgba(255,236,150,.85)'); sg.addColorStop(1, 'rgba(255,236,150,0)');
  c.fillStyle = sg; circ(c, sx, 48, 58); c.fill();
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 160 - camX * 0.16 + t * 5, viewW + 220) - 110; puffCloud(c, x, 30 + (i % 3) * 22, 0.9 + (i % 2) * 0.3, 'rgba(255,255,255,.92)'); }
  const off = camX * 0.2, hy = wx => 178 + Math.sin(wx * 0.012 + 1.3) * 14 + Math.sin(wx * 0.012 * 2.7 + 2.6) * 14 * 0.35;
  hill(c, viewW, 178, 14, 0.012, 1.3, off, '#c6ecb4');
  for (let i = 0; i < 10; i++) {
    const x = wrapX(i * 83 - off, viewW + 100) - 50, y = hy(x + off) + 6, h = 22 + (i % 3) * 6, fy = y - h;
    c.strokeStyle = '#7cc46e'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, fy); c.stroke();
    c.fillStyle = i % 3 === 0 ? '#ffd6ea' : '#ffffff';
    for (let k = 0; k < 8; k++) { const a = k * TAU / 8; ell(c, x + Math.cos(a) * 5, fy + Math.sin(a) * 5, 3.4, 1.8, a); c.fill(); }
    c.fillStyle = '#ffd23f'; circ(c, x, fy, 3); c.fill();
  }
  const span = 74;
  c.fillStyle = '#93d488';
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.4, span); circ(c, wx, 214, 20); c.fill(); circ(c, wx + 22, 208, 24); c.fill(); circ(c, wx + 46, 216, 18); c.fill(); }
  c.fillRect(0, 214, viewW + 1, VIEW_H);
  for (let i = 0; i < 18; i++) { const x = wrapX(i * 47 - camX * 0.4, viewW + 40) - 20; c.fillStyle = ['#ff9fcb', '#ffffff', '#ffd23f'][i % 3]; circ(c, x, 204 + (i % 3) * 8, 2); c.fill(); }
}
function bgLagoon(c, viewW, camX, t) {
  const sx = viewW * 0.78, sg = c.createRadialGradient(sx, 44, 4, sx, 44, 56);
  sg.addColorStop(0, 'rgba(255,250,210,1)'); sg.addColorStop(0.35, 'rgba(255,240,180,.85)'); sg.addColorStop(1, 'rgba(255,240,180,0)');
  c.fillStyle = sg; circ(c, sx, 44, 56); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.14 + t * 4, viewW + 240) - 120; puffCloud(c, x, 28 + (i % 3) * 18, 0.85, 'rgba(255,255,255,.9)'); }
  const sea = c.createLinearGradient(0, 126, 0, VIEW_H); sea.addColorStop(0, '#9be9f8'); sea.addColorStop(0.35, '#4fc3e8'); sea.addColorStop(1, '#2f9fd0');
  c.fillStyle = sea; c.fillRect(0, 126, viewW + 1, VIEW_H - 126);
  for (let i = 0; i < 2; i++) {
    const wx = wrapX(i * 430 + 140 - camX * 0.1, viewW + 300) - 150;
    c.fillStyle = '#f6d48f'; ell(c, wx, 128, 60, 10); c.fill();
    for (const p of [-22, 14]) {
      c.strokeStyle = '#a8743f'; c.lineWidth = 3.5; c.beginPath(); c.moveTo(wx + p, 124); c.quadraticCurveTo(wx + p + 7, 102, wx + p + 2, 84); c.stroke();
      c.fillStyle = '#3fb36a';
      for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.62; ell(c, wx + p + 2 + Math.cos(a) * 9, 87 + Math.sin(a) * 4, 10, 3, a + Math.PI / 2); c.fill(); }
    }
  }
  c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1.4;
  for (let i = 0; i < 16; i++) { const x = wrapX(i * 61 - camX * 0.25 + Math.sin(t + i) * 6, viewW + 40) - 20, y = 134 + (i % 4) * 9; c.beginPath(); c.moveTo(x - 5, y); c.lineTo(x + 5, y); c.stroke(); }
  c.strokeStyle = 'rgba(59,31,79,.55)';
  for (let i = 0; i < 3; i++) { const x = wrapX(i * 230 + t * 18 - camX * 0.2, viewW + 100) - 50, y = 40 + i * 16 + Math.sin(t * 2 + i) * 3; c.beginPath(); c.moveTo(x - 6, y); c.quadraticCurveTo(x - 3, y - 4, x, y); c.quadraticCurveTo(x + 3, y - 4, x + 6, y); c.stroke(); }
}
function bgVolcano(c, viewW, camX, t) {
  const sx = viewW * 0.7, sg = c.createRadialGradient(sx, 112, 4, sx, 112, 54);
  sg.addColorStop(0, 'rgba(255,245,200,1)'); sg.addColorStop(0.45, 'rgba(255,225,170,.7)'); sg.addColorStop(1, 'rgba(255,225,170,0)');
  c.fillStyle = sg; circ(c, sx, 112, 54); c.fill();
  const span = 330, f = 0.12;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * f, span);
    c.fillStyle = '#c4705c'; c.beginPath(); c.moveTo(wx - 130, 240); c.lineTo(wx - 26, 92); c.lineTo(wx + 26, 92); c.lineTo(wx + 130, 240); c.closePath(); c.fill();
    c.fillStyle = '#ffb547'; c.beginPath(); c.moveTo(wx - 26, 92); c.lineTo(wx + 26, 92); c.lineTo(wx + 33, 103); c.lineTo(wx + 24, 116); c.lineTo(wx + 15, 105); c.lineTo(wx + 5, 122); c.lineTo(wx - 5, 105); c.lineTo(wx - 15, 114); c.lineTo(wx - 33, 103); c.closePath(); c.fill();
    for (let k = 0; k < 4; k++) { const ph = (t * 0.25 + k / 4) % 1; puffCloud(c, wx + Math.sin(t + k) * 6, 84 - ph * 60, 0.3 + ph * 0.45, `rgba(255,230,240,${0.75 * (1 - ph)})`); }
  }
  hill(c, viewW, 208, 10, 0.02, 0.4, camX * 0.35, '#9a5440');
  for (let i = 0; i < 20; i++) { const x = wrapX(i * 53 - camX * 0.5 + Math.sin(t + i) * 8, viewW + 20) - 10, y = wrapX(VIEW_H - (t * (18 + (i % 5) * 5) + i * 37), VIEW_H); c.fillStyle = 'rgba(255,200,110,.85)'; circ(c, x, y, 1.2); c.fill(); }
}
function bgSpace(c, viewW, camX, t) {
  for (const [nx, ny, r, col] of [[0.25, 70, 120, 'rgba(255,120,200,.22)'], [0.75, 150, 140, 'rgba(110,160,255,.2)']]) {
    const x = viewW * nx - camX * 0.02 % 60, g = c.createRadialGradient(x, ny, 0, x, ny, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(x - r, ny - r, r * 2, r * 2);
  }
  const R = rng(21);
  for (let i = 0; i < 80; i++) { const x = wrapX(R() * 1600 - camX * 0.04, viewW + 20) - 10, y = R() * 230, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); c.fillStyle = `rgba(255,255,255,${0.35 + tw * 0.6})`; circ(c, x, y, 0.6 + R() * 1); c.fill(); }
  const px = wrapX(viewW * 0.72 - camX * 0.03, viewW + 240) - 120, py = 66;
  c.save(); c.translate(px, py); c.rotate(-0.35); c.strokeStyle = '#ffe7a8'; c.lineWidth = 3; c.beginPath(); c.ellipse(0, 0, 42, 10, 0, Math.PI, TAU); c.stroke(); c.restore();
  const pg = c.createRadialGradient(px - 8, py - 8, 2, px, py, 26); pg.addColorStop(0, '#ffd0ec'); pg.addColorStop(1, '#c86cff');
  c.fillStyle = pg; circ(c, px, py, 26); c.fill();
  c.save(); c.translate(px, py); c.rotate(-0.35); c.strokeStyle = '#ffe7a8'; c.lineWidth = 3; c.beginPath(); c.ellipse(0, 0, 42, 10, 0, 0, Math.PI); c.stroke(); c.restore();
  const qx = wrapX(viewW * 0.25 - camX * 0.05, viewW + 200) - 100, qy = 118;
  c.save(); circ(c, qx, qy, 11); c.fillStyle = '#7fd6ff'; c.fill(); c.clip(); c.fillStyle = 'rgba(20,30,90,.35)'; circ(c, qx + 5, qy + 3, 11); c.fill(); c.restore();
  const ph = (t % 7) / 7;
  if (ph < 0.12) { const k = ph / 0.12, sx = viewW * (0.15 + k * 0.5), sy = 30 + k * 50, lg = c.createLinearGradient(sx - 34, sy - 14, sx, sy); lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(255,255,255,.95)'); c.strokeStyle = lg; c.lineWidth = 2; c.beginPath(); c.moveTo(sx - 34, sy - 14); c.lineTo(sx, sy); c.stroke(); }
  hill(c, viewW, 212, 12, 0.015, 0.7, camX * 0.3, '#2a2163');
}
function bgPalace(c, viewW, camX, t) {
  const cols = ['rgba(150,255,220,.3)', 'rgba(255,170,230,.28)', 'rgba(170,200,255,.28)'];
  for (let k = 0; k < 3; k++) {
    c.strokeStyle = cols[k]; c.lineWidth = 16; c.beginPath();
    for (let x = -10; x <= viewW + 10; x += 10) c.lineTo(x, 34 + k * 20 + Math.sin((x + camX * 0.05) * 0.012 + t * 0.6 + k * 1.7) * 12);
    c.stroke();
  }
  const span = 210, f = 0.15;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * f, span);
    for (const [dx, h, w] of [[-50, 110, 16], [-18, 150, 20], [22, 120, 16], [56, 90, 12]]) {
      const bx = wx + dx, top = 236 - h;
      c.fillStyle = '#dcc8ff'; c.beginPath(); c.moveTo(bx - w, 236); c.lineTo(bx - w, top + w * 1.4); c.lineTo(bx, top); c.lineTo(bx + w, top + w * 1.4); c.lineTo(bx + w, 236); c.closePath(); c.fill();
      c.fillStyle = '#efe4ff'; c.beginPath(); c.moveTo(bx - w, 236); c.lineTo(bx - w, top + w * 1.4); c.lineTo(bx, top); c.lineTo(bx, 236); c.closePath(); c.fill();
      sparkle(c, bx, top - 6 - Math.sin(t * 3 + dx) * 2, 1.4 + Math.sin(t * 4 + dx) * 0.5, '#ffffff');
    }
  }
  const R = rng(5);
  for (let i = 0; i < 24; i++) { const x = wrapX(R() * 1400 - camX * 0.08, viewW + 20) - 10, y = R() * 180, tw = 0.5 + 0.5 * Math.sin(t * 3 + i); sparkle(c, x, y, 0.6 + tw, `rgba(255,255,255,${0.4 + tw * 0.5})`); }
  hill(c, viewW, 214, 8, 0.02, 0.3, camX * 0.35, '#d2bdf7');
}
