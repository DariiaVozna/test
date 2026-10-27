'use strict';
/* ===== Частина 10: Боброва річка, Луг повітряних зміїв, Зоряний пінбол, Країна догори дриґом, Гніздо Сороки ===== */
Object.assign(THEMES, {
  river: { sky: ['#9fdcff', '#d6f2ff', '#f0ffe6'], panel: '#24503a', top: '#7fd46a', topHi: '#b0ef9a', topLo: '#4f9a48', fill: '#9a6a42', fillLo: '#7e5432', dots: ['#c99060', '#6e4428', '#e0b080'], block: 'logblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  kites: { sky: ['#8fd3ff', '#c9ecff', '#fff6dc'], panel: '#2a5d8a', top: '#8fe36a', topHi: '#c6f5a8', topLo: '#4fb055', fill: '#f0c38a', fillLo: '#dca66a', dots: ['#ffe1b0', '#c98d55', '#ffffff'], block: 'kitebox', ice: false, topStyle: 'grass', dotShape: 'dot' },
  pinball: { sky: ['#1d1450', '#3a2480', '#6a3aa8'], panel: '#0f0a2e', top: '#ff7ab8', topHi: '#ffc4e0', topLo: '#c9307a', fill: '#3a2a7a', fillLo: '#2a1f5e', dots: [], block: 'neon', ice: false, topStyle: 'plank', fillStyle: 'checker' },
  upside: { sky: ['#ffe9c4', '#ffd6ec', '#c9e6ff'], panel: '#3a2a5a', top: '#9be36a', topHi: '#c6f5a8', topLo: '#5fb055', fill: '#b98ad9', fillLo: '#9a6ac0', dots: ['#e0c9ff', '#ffffff', '#ffd6ec'], block: 'swirl', ice: false, topStyle: 'grass', dotShape: 'dot', ceil: true },
  nest: { sky: ['#ffc98a', '#ffe2b8', '#fff4dc'], panel: '#4a3020', top: '#8fcf5a', topHi: '#b8ef8a', topLo: '#5a9a3a', fill: '#a8743f', fillLo: '#8a5a30', dots: ['#c98d55', '#6e4428', '#e0b080'], block: 'twigs', ice: false, topStyle: 'leaves', dotShape: 'pebble' },
});
Object.assign(PLANKS, { river: ['#c98d55', '#8a5a30'], nest: ['#b07a46', '#7a4f2a'], pinball: ['#ff9fd0', '#c9307a'] });

/* ===== Вороги ===== */
function drawBeaver(c, x, gy, dir, t, flash, hurt) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const step = Math.sin(t * 9) * 1.6, fur = flash ? '#fff' : '#b8783e', dark = flash ? '#fff' : '#8a5a30';
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = dark; c.save(); c.translate(-11, -6); c.rotate(-0.5 + Math.sin(t * 4) * 0.1); ell(c, -5, 0, 7, 3.6); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(59,31,79,.4)'; c.beginPath(); c.moveTo(-10, -1); c.lineTo(0, 1); c.moveTo(-9, 2); c.lineTo(-1, 2.5); c.stroke(); c.restore();
  c.strokeStyle = INK; c.fillStyle = dark;
  for (const [lx, s] of [[-6, 1], [5, -1]]) { ell(c, lx + step * s * 0.5, -2, 3.4, 2.4); c.fill(); c.stroke(); }
  c.fillStyle = fur; ell(c, -1, -9, 10, 8); c.fill(); c.stroke();
  c.fillStyle = '#e6c49a'; ell(c, 1, -6, 6, 4.4); c.fill();
  c.fillStyle = fur; circ(c, 8, -13, 6.4); c.fill(); c.stroke();
  c.fillStyle = dark; circ(c, 5, -19, 2.2); c.fill(); c.stroke();
  c.fillStyle = '#ffd6b0'; ell(c, 12.4, -11.4, 3.4, 2.6); c.fill(); c.stroke();
  c.fillStyle = INK; ell(c, 14.4, -12.4, 1.3, 1); c.fill();
  c.fillStyle = '#fff'; c.lineWidth = 0.8; rr(c, 11, -9.4, 3.4, 4, 0.8); c.fill(); c.stroke(); c.beginPath(); c.moveTo(12.7, -9.4); c.lineTo(12.7, -5.4); c.stroke();
  if (hurt) { c.lineWidth = 1.2; c.beginPath(); c.moveTo(6.4, -15.2); c.lineTo(9.6, -14); c.stroke(); }
  else { c.fillStyle = '#fff'; circ(c, 8.6, -15, 2.1); c.fill(); c.fillStyle = INK; circ(c, 9.2, -14.8, 1.1); c.fill(); }
  c.fillStyle = 'rgba(255,120,150,.45)'; circ(c, 9, -10, 1.6); c.fill();
  c.restore();
}
function drawMarble(c, x, gy, t, flash, dir, vx) {
  c.save(); c.translate(x, gy - 9); c.lineJoin = 'round';
  const rot = (x / 9) % TAU;
  const g = c.createRadialGradient(-3, -4, 1, 0, 0, 10); g.addColorStop(0, '#ffffff'); g.addColorStop(0.35, flash ? '#ffffff' : '#c9d2e6'); g.addColorStop(1, flash ? '#ffffff' : '#7d8aa6');
  c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, 0, 0, 9); c.fill(); c.stroke();
  c.save(); c.rotate(rot); c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.4; c.beginPath(); c.arc(0, 0, 6, 0.3, 1.6); c.stroke(); c.restore();
  c.fillStyle = '#fff'; circ(c, dir * 2 - 2.6, -1.4, 2.4); c.fill(); circ(c, dir * 2 + 2.6, -1.4, 2.4); c.fill();
  c.fillStyle = INK; circ(c, dir * 2.8 - 2.6, -1.2, 1.2); c.fill(); circ(c, dir * 2.8 + 2.6, -1.2, 1.2); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.arc(dir * 2, 2.4, 2.2, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
  c.restore();
  c.fillStyle = 'rgba(59,31,79,.18)'; ell(c, x, gy - 0.5, 8, 1.6); c.fill();
}
function drawLeaper(c, e, t, flash) {
  const x = e.x + e.w / 2, y = e.y + e.h / 2;
  if (e.state !== 'air') {
    if (e.state === 'warn') for (let i = 0; i < 4; i++) { const k = (t * 3 + i / 4) % 1; c.fillStyle = `rgba(255,255,255,${0.85 * (1 - k)})`; circ(c, x + (i - 1.5) * 5, e.baseY - 12 - k * 12, 1.6 + k * 1.6); c.fill(); }
    return;
  }
  c.save(); c.translate(x, y); c.rotate(Math.atan2(e.vy, Math.abs(e.vx) + 1) * 0.6 * (e.dir || 1)); c.scale(e.dir || 1, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const w = Math.sin(t * 16) * 2;
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = flash ? '#fff' : '#5fb8ff'; c.beginPath(); c.moveTo(-6, 0); c.lineTo(-13, -5 + w); c.lineTo(-11, 0); c.lineTo(-13, 5 - w); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#9fe0ff'; ell(c, 0, 0, 9, 6.4); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; ell(c, 1, 2.6, 6, 2.6); c.fill();
  c.fillStyle = '#ff9fd0'; c.beginPath(); c.moveTo(-3, -5.6); c.quadraticCurveTo(0, -11, 4, -5.8); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 4.4, -1.6, 2.4); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 5, -1.4, 1.2); c.fill();
  c.beginPath(); c.arc(7, 1.6, 1.4, -0.3, 1.6); c.stroke();
  c.restore();
  c.fillStyle = 'rgba(255,255,255,.8)'; for (let i = 0; i < 3; i++) circ(c, x - (e.dir || 1) * (12 + i * 5), y + 4 + i * 3, 1.6 - i * 0.4), c.fill();
}
function drawSparrow(c, e, t, flash) {
  const x = e.x + e.w / 2, y = e.y + e.h / 2, fade = Math.min(1, (e.x - e.x0) / 40, (e.x1 - e.x) / 40);
  c.save(); c.globalAlpha = Math.max(0, fade); c.translate(x, y); c.scale(e.dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const f = Math.sin(t * 18);
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = flash ? '#fff' : '#8a5a30'; c.beginPath(); c.moveTo(-6, 0); c.lineTo(-13, -3); c.lineTo(-12, 3); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#c98d55'; ell(c, 0, 0, 8.4, 6); c.fill(); c.stroke();
  c.fillStyle = '#f5e6d0'; ell(c, 2, 2.4, 5, 3); c.fill();
  c.fillStyle = flash ? '#fff' : '#8a5a30'; ell(c, -2, -2 - f * 3.4, 5.6, 2.6 + f * 1.4, -0.4); c.fill(); c.stroke();
  c.fillStyle = '#6e4428'; ell(c, 3, -4.4, 3.6, 2, 0.2); c.fill();
  c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(7.6, -1.4); c.lineTo(12, 0); c.lineTo(7.6, 1.4); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 4.6, -1.8, 2); c.fill(); c.fillStyle = INK; circ(c, 5.1, -1.6, 1); c.fill();
  c.fillStyle = 'rgba(255,120,150,.5)'; circ(c, 4.4, 1.4, 1.2); c.fill();
  c.restore();
}
function drawEnemy6(c, e, cx, fl) {
  switch (e.k) {
    case 'beaver': drawBeaver(c, cx, e.y + e.h, e.dir, e.t, fl, e.hp < 2); return true;
    case 'marble': drawMarble(c, cx, e.y + e.h, e.t, fl, e.dir); return true;
    case 'leaper': drawLeaper(c, e, e.t, fl); return true;
    case 'sparrow': drawSparrow(c, e, e.t, fl); return true;
  }
  return false;
}

/* ===== Річка: колоди й течія ===== */
function drawLog(c, m, t) {
  if (m.state === 'gone') {
    for (let i = 0; i < 3; i++) { const k = (t * 1.5 + i / 3) % 1; c.fillStyle = `rgba(255,255,255,${0.7 * (1 - k)})`; circ(c, m.x + 14 + i * 20, m.by + 10 - k * 8, 1.4 + k * 1.4); c.fill(); }
    return;
  }
  const deep = m.y - m.by, a = m.state === 'sink' ? 1 - Math.min(1, deep / 16) * 0.6 : m.state === 'rise' ? 1 - Math.min(1, deep / 16) * 0.6 : 1;
  c.save(); c.globalAlpha = a; c.lineJoin = 'round'; c.lineCap = 'round';
  const x = m.x, y = m.y, w = m.w, h = 14;
  c.fillStyle = '#b8783e'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, x + 3, y, w - 6, h, 7); c.fill(); c.stroke();
  c.strokeStyle = '#8a5a30'; c.lineWidth = 1.1; c.beginPath(); c.moveTo(x + 12, y + 4); c.lineTo(x + w - 18, y + 4); c.moveTo(x + 18, y + 9.5); c.lineTo(x + w - 10, y + 9.5); c.stroke();
  c.fillStyle = '#e6b878'; c.strokeStyle = INK; c.lineWidth = 1.2; ell(c, x + w - 5, y + h / 2, 5, 7); c.fill(); c.stroke();
  c.strokeStyle = '#b8783e'; c.lineWidth = 0.9; ell(c, x + w - 5, y + h / 2, 2.6, 4); c.stroke();
  c.fillStyle = '#7fd46a'; c.strokeStyle = INK; c.lineWidth = 0.8; ell(c, x + w * 0.4, y - 1, 4, 2, -0.3); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.35)'; rr(c, x + 8, y + 1.5, w - 26, 2, 1); c.fill();
  c.restore();
  c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1.2;
  for (let i = 0; i < 2; i++) { const k = (t * 1.2 + i * 0.5) % 1; c.globalAlpha = 1 - k; c.beginPath(); c.moveTo(x - 4 - k * 12, m.by + 9); c.lineTo(x + 2 - k * 12, m.by + 9); c.stroke(); }
  c.globalAlpha = 1;
}
function drawRiverFlow(c, z, t, camX, vw) {
  const x0 = Math.max(z.x0, camX - 20), x1 = Math.min(z.x1, camX + vw + 20); if (x1 <= x0) return;
  c.save(); c.beginPath(); c.rect(z.x0, z.y, z.x1 - z.x0, VIEW_H - z.y); c.clip();
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.4; c.lineCap = 'round';
  const span = z.x1 - z.x0;
  for (let i = 0; i < span / 40; i++) {
    const x = z.x0 + ((i * 67 + t * z.flow) % span), y = z.y + 12 + ((i * 29) % 50);
    if (x < x0 - 30 || x > x1 + 30) continue;
    c.beginPath(); c.moveTo(x - 12, y); c.quadraticCurveTo(x - 6, y - 2.4, x, y); c.stroke();
  }
  c.restore();
}

/* ===== Повітряний змій ===== */
function drawKiteShape(c, x, y, t, col) {
  c.save(); c.translate(x, y); c.rotate(Math.sin(t * 2.2) * 0.15); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = col[0]; c.beginPath(); c.moveTo(0, -18); c.lineTo(13, -2); c.lineTo(0, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = col[1]; c.beginPath(); c.moveTo(0, -18); c.lineTo(-13, -2); c.lineTo(0, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = col[2]; c.beginPath(); c.moveTo(-13, -2); c.lineTo(0, 20); c.lineTo(0, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = col[3]; c.beginPath(); c.moveTo(13, -2); c.lineTo(0, 20); c.lineTo(0, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, -3.6, -4, 1.8); c.fill(); circ(c, 3.6, -4, 1.8); c.fill();
  c.fillStyle = INK; circ(c, -3.4, -3.8, 0.9); c.fill(); circ(c, 3.8, -3.8, 0.9); c.fill();
  c.beginPath(); c.arc(0, 1.4, 2.2, 0.15 * Math.PI, 0.85 * Math.PI); c.lineWidth = 1; c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(0, 20);
  for (let i = 1; i <= 4; i++) c.quadraticCurveTo(-6 + Math.sin(t * 4 + i) * 4, 20 + i * 7 - 3.5, Math.sin(t * 4 + i + 1) * 3, 20 + i * 7);
  c.stroke();
  for (let i = 1; i <= 3; i++) { const by = 20 + i * 8, bx = Math.sin(t * 4 + i + 1) * 3; c.fillStyle = RAINBOW[(i * 2) % 6]; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - 4, by - 3); c.lineTo(bx - 4, by + 3); c.closePath(); c.moveTo(bx, by); c.lineTo(bx + 4, by - 3); c.lineTo(bx + 4, by + 3); c.closePath(); c.fill(); c.lineWidth = 0.7; c.stroke(); }
  c.restore();
}
const KITE_COLS = [['#ff7ab8', '#ffd23f', '#4cb6ff', '#7fd46a'], ['#a67bff', '#ff9a3d', '#ff5c8a', '#4cb6ff'], ['#54d68c', '#ff7ab8', '#ffe14d', '#a67bff']];
function drawKite(c, k, t, i) {
  const col = KITE_COLS[i % KITE_COLS.length];
  let kx = k.kx, ky = k.ky;
  if (k.state === 'back') { const u = Math.min(1, k.st / 1.4); kx = k.kx + (k.x0 + 36 - k.kx) * u; ky = k.ky + (k.gy - 120 - k.ky) * u; }
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
  // кілочок
  c.fillStyle = '#c98d55'; c.strokeStyle = INK; c.lineWidth = 1.1; rr(c, k.x0 - 3, k.gy - 18, 6, 18, 2); c.fill(); c.stroke();
  c.fillStyle = '#ff7ab8'; circ(c, k.x0, k.gy - 19, 3.4); c.fill(); c.stroke();
  const riding = k.state === 'ride';
  const hx = riding ? k.hx : k.state === 'idle' ? k.hx : k.x0 + 6, hy = riding ? k.hy : k.state === 'idle' ? k.hy : k.gy - 24;
  c.strokeStyle = 'rgba(59,31,79,.75)'; c.lineWidth = 1; c.beginPath(); c.moveTo(hx, hy); c.quadraticCurveTo((hx + kx) / 2 + 10, (hy + ky) / 2 + 12, kx, ky + 2); c.stroke();
  if (!riding) { c.beginPath(); c.moveTo(k.x0, k.gy - 18); c.lineTo(hx, hy); c.stroke(); }
  if (k.state !== 'back' || k.st > 0.2) {
    c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, hx - 7, hy - 2.4, 14, 5, 2.4); c.fill(); c.stroke();
  }
  drawKiteShape(c, kx, ky, t + i, col);
  if (k.state === 'idle') sparkle(c, hx + 11, hy - 8 + Math.sin(t * 4) * 2, 1.8 + Math.sin(t * 6) * 0.5, '#fff8c0');
  c.restore();
}

/* ===== Пінбол ===== */
function drawBumper(c, b, t) {
  const glow = b.glow > 0, k = glow ? 1 + b.glow * 0.5 : 1;
  c.save(); c.translate(b.x, b.y); c.lineJoin = 'round';
  if (glow) { const g = c.createRadialGradient(0, 0, 4, 0, 0, 30); g.addColorStop(0, 'rgba(255,240,150,.8)'); g.addColorStop(1, 'rgba(255,240,150,0)'); c.fillStyle = g; circ(c, 0, 0, 30); c.fill(); }
  c.scale(k, k);
  c.strokeStyle = INK; c.lineWidth = 1.6;
  c.fillStyle = '#ff5c8a'; circ(c, 0, 0, b.r); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 0, 0, b.r - 4); c.fill(); c.lineWidth = 1; c.stroke();
  c.fillStyle = glow ? '#ffe14d' : '#ffcf2e'; starPath(c, 0, 0.6, 6.4, 3, t * 0.6); c.fill(); c.strokeStyle = '#c98200'; c.lineWidth = 1; c.stroke();
  for (let i = 0; i < 3; i++) { const a = -Math.PI / 2 + (i - 1) * 0.9; c.fillStyle = i < b.hits ? '#ffe14d' : 'rgba(255,255,255,.5)'; c.strokeStyle = INK; c.lineWidth = 0.8; circ(c, Math.cos(a) * (b.r + 4), Math.sin(a) * (b.r + 4), 2.4); c.fill(); c.stroke(); }
  c.fillStyle = 'rgba(255,255,255,.75)'; ell(c, -5, -7, 3, 1.4, -0.6); c.fill();
  c.restore();
}
function drawLamps(c, s, t) {
  for (const l of s.lamps) {
    c.save(); c.translate(l.x, l.gy);
    if (l.on || s.done) { const g = c.createRadialGradient(0, -4, 1, 0, -4, 16); g.addColorStop(0, 'rgba(255,240,150,.85)'); g.addColorStop(1, 'rgba(255,240,150,0)'); c.fillStyle = g; circ(c, 0, -4, 16); c.fill(); }
    c.fillStyle = '#2a1f5e'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, -8, -4, 16, 5, 2); c.fill(); c.stroke();
    const on = l.on || (s.done && Math.sin(t * 8 + l.x) > -0.3);
    c.fillStyle = on ? '#ffe14d' : 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(-6, -4); c.lineTo(0, -10); c.lineTo(6, -4); c.closePath(); c.fill(); c.stroke();
    c.restore();
  }
}

/* ===== Догори дриґом ===== */
function drawFlipZone(c, z, t) {
  c.save();
  const w = z.x1 - z.x0, g = c.createLinearGradient(z.x0, 0, z.x1, 0);
  g.addColorStop(0, 'rgba(140,80,255,.08)'); g.addColorStop(0.08, 'rgba(140,80,255,.26)'); g.addColorStop(0.92, 'rgba(140,80,255,.26)'); g.addColorStop(1, 'rgba(140,80,255,.08)');
  c.fillStyle = g; c.fillRect(z.x0, 0, w, VIEW_H);
  c.strokeStyle = 'rgba(122,70,230,.55)'; c.lineWidth = 2; c.setLineDash([6, 6]); c.lineDashOffset = -t * 20;
  c.beginPath(); c.moveTo(z.x0, 0); c.lineTo(z.x0, VIEW_H); c.moveTo(z.x1, 0); c.lineTo(z.x1, VIEW_H); c.stroke(); c.setLineDash([]);
  c.lineCap = 'round'; c.lineJoin = 'round';
  for (let i = 0; i < Math.ceil(w / 36); i++) {
    const x = z.x0 + 18 + i * 36, y = VIEW_H - ((t * 45 + i * 77) % (VIEW_H + 20));
    c.globalAlpha = 0.55 + 0.35 * Math.sin(t * 3 + i);
    c.strokeStyle = '#7a46e6'; c.lineWidth = 4; c.beginPath(); c.moveTo(x - 5, y + 5); c.lineTo(x, y); c.lineTo(x + 5, y + 5); c.moveTo(x, y); c.lineTo(x, y + 12); c.stroke();
    c.strokeStyle = '#ffffff'; c.lineWidth = 2; c.stroke();
  }
  c.globalAlpha = 1;
  c.restore();
}

/* ===== Сорока Блискітка ===== */
function drawBauble(c, bb, t) {
  c.save(); c.translate(bb.x, bb.y);
  const g = c.createRadialGradient(-2, -3, 1, 0, 0, 9); g.addColorStop(0, '#ffffff'); g.addColorStop(0.4, '#9fe0ff'); g.addColorStop(1, '#a67bff');
  c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, 0, 0, 8); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; rr(c, -3, -11, 6, 4, 1.4); c.fill(); c.stroke();
  for (let i = 0; i < 4; i++) { const a = t * 2 + i * TAU / 4, r = 13 + Math.sin(t * 4 + i) * 2; sparkle(c, Math.cos(a) * r, Math.sin(a) * r - 2, 1.6 + Math.sin(t * 6 + i) * 0.5, i % 2 ? '#fff' : '#ffe14d'); }
  c.restore();
}
function drawMagpie(c, B, t) {
  const st = B.state, flash = B.flash > 0, happy = st === 'happy' || B.dead, onGround = st === 'peck' || st === 'grab' || happy, swoop = st === 'swoop';
  if (st === 'aim' || swoop) { const k = st === 'aim' ? Math.min(1, B.st / 0.6) : 1; c.fillStyle = `rgba(59,31,79,${0.15 + 0.15 * k})`; ell(c, swoop ? B.x : B.tx, B.gy - 1, 18 + k * 8, 4); c.fill(); }
  if (B.bauble) drawBauble(c, B.bauble, t);
  c.save(); c.translate(B.x, B.y); c.scale(B.dir || 1, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const flap = onGround ? 0.15 : swoop ? -0.9 : Math.sin(t * 12) * 0.8, peck = st === 'peck' ? Math.max(0, Math.sin(t * 9)) * 6 : 0;
  c.strokeStyle = INK; c.lineWidth = 1.4;
  // хвіст
  c.fillStyle = flash ? '#fff' : '#2a2a5a'; c.beginPath(); c.moveTo(-14, -2); c.lineTo(-40, -10 + (onGround ? 6 : 0)); c.lineTo(-38, -2 + (onGround ? 6 : 0)); c.lineTo(-14, 6); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#4cd6c4'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-18, 0); c.lineTo(-36, -4 + (onGround ? 6 : 0)); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.4;
  // лапки
  if (onGround) { c.strokeStyle = '#3b1f4f'; c.lineWidth = 1.6; for (const lx of [-3, 4]) { c.beginPath(); c.moveTo(lx, 12); c.lineTo(lx, 20); c.moveTo(lx - 3, 20); c.lineTo(lx + 3, 20); c.stroke(); } c.strokeStyle = INK; c.lineWidth = 1.4; }
  // тіло
  c.fillStyle = flash ? '#fff' : '#2a2a5a'; ell(c, 0, 0, 17, 13); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; ell(c, 2, 4, 11, 8); c.fill();
  // крило
  c.save(); c.translate(-3, -4); c.rotate(flap);
  c.fillStyle = flash ? '#fff' : '#3a4ab8'; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-6, -22, -24, -18); c.quadraticCurveTo(-14, -8, -16, 2); c.quadraticCurveTo(-6, 6, 0, 0); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#4cd6c4'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-4, -2); c.quadraticCurveTo(-10, -14, -20, -15); c.stroke();
  c.fillStyle = '#ffffff'; ell(c, -7, -3, 4, 2.4, -0.4); c.fill();
  c.restore();
  // голова
  c.save(); c.translate(14, -10 + peck); c.rotate(peck * 0.06);
  c.fillStyle = flash ? '#fff' : '#2a2a5a'; c.strokeStyle = INK; c.lineWidth = 1.4; circ(c, 0, 0, 10); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(8, -3); c.lineTo(19, 1); c.lineTo(8, 4); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 0.9; c.beginPath(); c.moveTo(8, 0.6); c.lineTo(16, 1); c.stroke();
  if (happy) { c.strokeStyle = '#fff'; c.lineWidth = 1.6; c.beginPath(); c.arc(2, -2, 3, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); }
  else {
    c.fillStyle = '#fff'; circ(c, 2.4, -2.4, 3.8); c.fill(); c.strokeStyle = INK; c.lineWidth = 1; c.stroke();
    const look = st === 'peck' ? 1.4 : 0.6;
    c.fillStyle = INK; circ(c, 3 + look, -2 + (st === 'peck' ? 1 : 0), 1.9); c.fill(); c.fillStyle = '#fff'; circ(c, 3.6 + look, -2.8, 0.7); c.fill();
    if (st === 'aim' || swoop) { c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-2, -7); c.lineTo(6, -5); c.stroke(); }
    if (st === 'peck') { c.fillStyle = '#ff7ab8'; heartPath(c, 3, -2, 3.2); c.fill(); }
  }
  c.fillStyle = 'rgba(255,120,170,.5)'; circ(c, 4, 3.4, 2.2); c.fill();
  c.restore();
  c.restore();
  if (st === 'peck') for (let i = 0; i < 2; i++) { const k = (t * 0.9 + i / 2) % 1; c.save(); c.globalAlpha = 1 - k; c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 2.4; c.font = '900 12px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.strokeText('ох!', B.x - B.dir * 22 + i * 10, B.y - 30 - k * 18); c.fillText('ох!', B.x - B.dir * 22 + i * 10, B.y - 30 - k * 18); c.restore(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, B.y - 38 - k * 30, 9); c.fillStyle = '#ff7ab8'; c.fill(); c.restore(); }
}
function drawCone(c, x, y, t) {
  c.save(); c.translate(x, y); c.rotate(Math.sin(t * 6) * 0.3); c.lineJoin = 'round';
  c.fillStyle = '#a8743f'; c.strokeStyle = INK; c.lineWidth = 1.1; ell(c, 0, 0, 5.4, 7); c.fill(); c.stroke();
  c.strokeStyle = '#6e4428'; c.lineWidth = 0.9; for (let i = -1; i <= 1; i++) { c.beginPath(); c.moveTo(-4.6, i * 3.4); c.quadraticCurveTo(0, i * 3.4 + 2, 4.6, i * 3.4); c.stroke(); }
  c.fillStyle = '#7fd46a'; c.strokeStyle = INK; c.lineWidth = 0.8; ell(c, 0, -7.6, 2.4, 1.4); c.fill(); c.stroke();
  c.restore();
}

/* Усе, що малюється у світі за персонажами (виклик із ui.js) */
function drawWorld6(c, t, vis) {
  for (const z of G.flips) if (z.x1 > G.cam - 20 && z.x0 < G.cam + viewW + 20) drawFlipZone(c, z, t);
  for (const s of G.lightSets) if (vis(s.lamps[0].x, 200)) drawLamps(c, s, t);
  for (const b of G.bumpers) if (vis(b.x, 40)) drawBumper(c, b, t);
  G.kites.forEach((k, i) => { if (vis(k.state === 'ride' ? k.hx : k.x0, 120)) drawKite(c, k, t, i); });
}
function drawWater6(c, t) {
  for (const z of G.water) if (z.flow) drawRiverFlow(c, z, t, G.cam, viewW);
}

/* ===== Блоки ===== */
function drawBlock7(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'logblock') {
    rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#e6b878'; c.fill(); c.stroke();
    c.strokeStyle = '#b8783e'; c.lineWidth = 1.1; for (const r0 of [8, 5, 2.4]) { circ(c, T / 2, T / 2, r0); c.stroke(); }
    c.fillStyle = '#7fd46a'; ell(c, 6, 3, 3, 1.5, -0.3); c.fill();
  } else if (b === 'kitebox') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#fff3d6'; c.fill(); c.stroke();
    c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(T / 2, 3); c.lineTo(T - 5, T / 2); c.lineTo(T / 2, T - 3); c.lineTo(5, T / 2); c.closePath(); c.fill(); c.lineWidth = 1; c.stroke();
    c.fillStyle = '#4cb6ff'; c.beginPath(); c.moveTo(T / 2, 3); c.lineTo(T / 2, T - 3); c.lineTo(5, T / 2); c.closePath(); c.fill();
    c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(T / 2, 3); c.lineTo(T / 2, T - 3); c.moveTo(5, T / 2); c.lineTo(T - 5, T / 2); c.stroke();
  } else if (b === 'neon') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#2a1f5e'; c.fill(); c.stroke();
    c.strokeStyle = '#ff7ab8'; c.lineWidth = 2; rr(c, 4.5, 4.5, T - 9, T - 9, 3); c.stroke();
    c.fillStyle = '#7dffe0'; circ(c, T / 2, T / 2, 2.4); c.fill();
  } else if (b === 'swirl') {
    rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#e6d6ff'; c.fill(); c.stroke();
    c.strokeStyle = '#a67bff'; c.lineWidth = 1.8; c.beginPath(); for (let i = 0; i < 26; i++) { const a = i * 0.5, r = 1 + i * 0.32; c.lineTo(T / 2 + Math.cos(a) * r, T / 2 + Math.sin(a) * r); } c.stroke();
    c.fillStyle = 'rgba(255,255,255,.7)'; ell(c, 7, 6, 3, 1.3, -0.4); c.fill();
  } else if (b === 'twigs') {
    rr(c, 1, 1, T - 2, T - 2, 8); c.fillStyle = '#c98d55'; c.fill(); c.stroke();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(3, 7); c.lineTo(T - 4, 11); c.moveTo(4, 15); c.lineTo(T - 3, 9); c.moveTo(3, 19); c.lineTo(T - 5, 17); c.stroke();
    c.strokeStyle = '#e6b878'; c.lineWidth = 0.9; c.beginPath(); c.moveTo(6, 4); c.lineTo(T - 6, 6); c.stroke();
  } else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor10(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'reed':
      for (let i = -1; i <= 1; i++) { const sw = Math.sin(t * 1.6 + x * 0.1 + i) * 1.5, h = 16 + (i + 1) * 4; c.strokeStyle = '#4fae5a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x + i * 4, y); c.quadraticCurveTo(x + i * 4, y - h / 2, x + i * 4 + sw, y - h); c.stroke(); if (i !== 0) { c.fillStyle = '#8a5a30'; c.strokeStyle = INK; c.lineWidth = 0.7; rr(c, x + i * 4 + sw - 1.8, y - h - 7, 3.6, 8, 1.8); c.fill(); c.stroke(); } }
      break;
    case 'stump':
      c.fillStyle = '#b8783e'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, x - 7, y - 9, 14, 9, 2); c.fill(); c.stroke();
      c.fillStyle = '#e6b878'; ell(c, x, y - 9, 7, 2.6); c.fill(); c.stroke(); c.strokeStyle = '#b8783e'; c.lineWidth = 0.7; ell(c, x, y - 9, 3.6, 1.2); c.stroke();
      break;
    case 'dandelion':
      c.strokeStyle = '#5fb36a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 2, y - 7, x, y - 14); c.stroke();
      c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 0.8; for (let i = 0; i < 10; i++) { const a = i * TAU / 10 + Math.sin(t + x) * 0.1; c.beginPath(); c.moveTo(x, y - 14); c.lineTo(x + Math.cos(a) * 5.4, y - 14 + Math.sin(a) * 5.4); c.stroke(); }
      c.fillStyle = '#fff'; circ(c, x, y - 14, 1.6); c.fill();
      { const k = (t * 0.3 + x * 0.003) % 1; c.globalAlpha = 1 - k; c.strokeStyle = '#fff'; c.beginPath(); c.moveTo(x + k * 30, y - 16 - k * 26); c.lineTo(x + k * 30 + 3, y - 18 - k * 26); c.stroke(); c.globalAlpha = 1; }
      break;
    case 'pinwheel':
      c.strokeStyle = '#c98d55'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 16); c.stroke();
      c.save(); c.translate(x, y - 17); c.rotate(t * 3 + x);
      for (let i = 0; i < 4; i++) { c.rotate(TAU / 4); c.fillStyle = RAINBOW[(i + Math.floor(x)) % 6]; c.strokeStyle = INK; c.lineWidth = 0.7; c.beginPath(); c.moveTo(0, 0); c.lineTo(7, -2); c.lineTo(5, 3); c.closePath(); c.fill(); c.stroke(); }
      c.restore(); c.fillStyle = '#ffd23f'; circ(c, x, y - 17, 1.4); c.fill();
      break;
    case 'bulb': {
      c.strokeStyle = '#8f9cc8'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 12); c.stroke();
      const on = Math.sin(t * 5 + x * 0.3) > 0;
      if (on) { const g = c.createRadialGradient(x, y - 16, 0, x, y - 16, 12); g.addColorStop(0, 'rgba(255,240,150,.7)'); g.addColorStop(1, 'rgba(255,240,150,0)'); c.fillStyle = g; circ(c, x, y - 16, 12); c.fill(); }
      c.fillStyle = on ? '#ffe14d' : '#7a6ab8'; c.strokeStyle = INK; c.lineWidth = 0.8; circ(c, x, y - 16, 4); c.fill(); c.stroke();
      break;
    }
    case 'arrowlamp': {
      const k = Math.floor(t * 4 + x * 0.05) % 3;
      for (let i = 0; i < 3; i++) { c.fillStyle = i === k ? '#7dffe0' : 'rgba(125,255,224,.25)'; c.beginPath(); c.moveTo(x - 6 + i * 5, y - 9); c.lineTo(x - 2 + i * 5, y - 5); c.lineTo(x - 6 + i * 5, y - 1); c.closePath(); c.fill(); }
      break;
    }
    case 'hangflower':
      c.save(); c.translate(x, y); c.scale(1, -1); drawFlowerDecor(c, 0, 0, d.c, 0.85); c.restore();
      break;
    case 'hangvine':
      c.strokeStyle = '#5fb36a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); for (let i = 1; i <= 4; i++) c.lineTo(x + Math.sin(t * 1.5 + i + x) * 2, y + i * 5); c.stroke();
      c.fillStyle = '#8fe36a'; c.strokeStyle = INK; c.lineWidth = 0.6; for (let i = 1; i <= 3; i++) { ell(c, x + (i % 2 ? 3 : -3) + Math.sin(t * 1.5 + i + x) * 2, y + i * 5, 2.8, 1.4, i % 2 ? 0.5 : -0.5); c.fill(); c.stroke(); }
      break;
    case 'feather':
      c.save(); c.translate(x, y - 3); c.rotate(-0.4 + Math.sin(t + x) * 0.05);
      c.fillStyle = '#2a2a5a'; c.strokeStyle = INK; c.lineWidth = 0.7; ell(c, 0, -6, 2.8, 7); c.fill(); c.stroke();
      c.strokeStyle = '#4cd6c4'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(0, 1); c.lineTo(0, -12); c.stroke();
      c.restore(); break;
    case 'nestegg':
      c.fillStyle = '#c98d55'; c.strokeStyle = INK; c.lineWidth = 0.8; ell(c, x, y - 3, 9, 3.4); c.fill(); c.stroke();
      c.fillStyle = d.c; ell(c, x - 3, y - 6, 2.8, 3.6); c.fill(); c.stroke(); ell(c, x + 3, y - 6, 2.8, 3.6); c.fill(); c.stroke();
      break;
  }
}

/* ===== Фони ===== */
function bgRiver(c, viewW, camX, t) {
  const sx = viewW * 0.8, sg = c.createRadialGradient(sx, 50, 4, sx, 50, 56);
  sg.addColorStop(0, 'rgba(255,250,215,1)'); sg.addColorStop(0.35, 'rgba(255,240,180,.8)'); sg.addColorStop(1, 'rgba(255,240,180,0)');
  c.fillStyle = sg; circ(c, sx, 50, 56); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 18, 0.85, 'rgba(255,255,255,.9)'); }
  hill(c, viewW, 170, 14, 0.012, 0.3, camX * 0.12, '#bfe3a8');
  const span = 70;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.22, span), h = 34 + (((i + Math.floor(camX * 0.22 / span)) * 29 % 3 + 3) % 3) * 10;
    c.fillStyle = '#7fbf6a'; c.beginPath(); c.moveTo(wx - 16, 196); c.lineTo(wx, 196 - h - 20); c.lineTo(wx + 16, 196); c.closePath(); c.fill();
    c.fillStyle = '#8a6a48'; c.fillRect(wx - 2, 190, 4, 8);
  }
  c.fillStyle = '#9fdcf5'; c.fillRect(0, 198, viewW + 1, 14);
  c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1.2;
  for (let i = 0; i < 10; i++) { const x = wrapX(i * 83 - camX * 0.3 + t * 18, viewW + 40) - 20; c.beginPath(); c.moveTo(x, 204); c.lineTo(x + 10, 204); c.stroke(); }
  hill(c, viewW, 214, 6, 0.03, 1.1, camX * 0.35, '#a8d98f');
}
function bgKites(c, viewW, camX, t) {
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 170 - camX * 0.08 + t * 8, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 22, 0.9, 'rgba(255,255,255,.92)'); }
  for (let i = 0; i < 7; i++) {
    const x = wrapX(i * 137 - camX * 0.15 + Math.sin(t * 0.6 + i) * 10, viewW + 100) - 50, y = 50 + (i % 3) * 28 + Math.sin(t * 1.3 + i) * 6;
    c.save(); c.globalAlpha = 0.6; c.strokeStyle = 'rgba(59,31,79,.35)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x, y + 8); c.quadraticCurveTo(x + 10, y + 60, x - 6, 200); c.stroke();
    c.translate(x, y); c.scale(0.45, 0.45); c.rotate(Math.sin(t * 2 + i) * 0.2);
    const col = KITE_COLS[i % 3];
    c.fillStyle = col[0]; c.beginPath(); c.moveTo(0, -18); c.lineTo(13, -2); c.lineTo(0, 20); c.closePath(); c.fill();
    c.fillStyle = col[1]; c.beginPath(); c.moveTo(0, -18); c.lineTo(-13, -2); c.lineTo(0, 20); c.closePath(); c.fill();
    c.restore();
  }
  hill(c, viewW, 190, 16, 0.011, 0.6, camX * 0.18, '#c6eaa0');
  hill(c, viewW, 214, 10, 0.02, 2.2, camX * 0.36, '#a8df8a');
  for (let i = 0; i < 16; i++) { const x = wrapX(i * 61 - camX * 0.36, viewW + 40) - 20; c.fillStyle = ['#ffffff', '#ffd23f', '#ff9fd0'][i % 3]; circ(c, x, 220 + (i % 3) * 4, 1.8); c.fill(); }
}
function bgPinball(c, viewW, camX, t) {
  const R = rng(83);
  for (let i = 0; i < 50; i++) { const x = wrapX(R() * 1400 - camX * 0.05, viewW + 20) - 10, y = R() * 200, tw = 0.5 + 0.5 * Math.sin(t * 3 + i); c.fillStyle = `rgba(255,255,255,${0.25 + tw * 0.6})`; circ(c, x, y, 0.6 + R()); c.fill(); }
  c.strokeStyle = 'rgba(255,122,184,.18)'; c.lineWidth = 1;
  const gs = 40, go = wrapX(-camX * 0.2, gs);
  for (let x = go - gs; x < viewW + gs; x += gs) { c.beginPath(); c.moveTo(x, 120); c.lineTo(x - 60, VIEW_H); c.stroke(); }
  for (let y = 130; y < VIEW_H; y += 18) { c.beginPath(); c.moveTo(0, y); c.lineTo(viewW + 1, y); c.stroke(); }
  const span = 230;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 80, wy = 80 + (i % 2) * 30;
    for (let k = 0; k < 3; k++) { c.strokeStyle = ['rgba(125,255,224,.5)', 'rgba(255,122,184,.5)', 'rgba(255,225,77,.5)'][k]; c.lineWidth = 3; circ(c, wx, wy, 16 + k * 9 + Math.sin(t * 2 + i + k) * 1.5); c.stroke(); }
    const on = Math.floor(t * 3 + i) % 2 === 0; c.fillStyle = on ? 'rgba(255,225,77,.9)' : 'rgba(255,225,77,.35)'; starPath(c, wx, wy, 8, 3.6, t * 0.4); c.fill();
  }
}
function bgUpside(c, viewW, camX, t) {
  // небо внизу, пагорби звисають згори
  const sx = viewW * 0.3, sy = 214, sg = c.createRadialGradient(sx, sy, 4, sx, sy, 60);
  sg.addColorStop(0, 'rgba(255,250,215,1)'); sg.addColorStop(0.35, 'rgba(255,240,180,.75)'); sg.addColorStop(1, 'rgba(255,240,180,0)');
  c.fillStyle = sg; circ(c, sx, sy, 60); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 200 - camX * 0.1 - t * 5, viewW + 240) - 120; puffCloud(c, x, 200 - (i % 3) * 20, 0.9, 'rgba(255,255,255,.85)'); }
  c.save(); c.translate(0, VIEW_H); c.scale(1, -1);
  hill(c, viewW, 196, 14, 0.013, 0.4, camX * 0.16, '#d6c4f5');
  hill(c, viewW, 222, 9, 0.022, 1.8, camX * 0.32, '#c9b0ee');
  const span = 120;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.32, span) + 40;
    c.fillStyle = '#9a6ac0'; c.fillRect(wx - 3, 200, 6, 26);
    c.fillStyle = '#a8e892'; circ(c, wx, 196, 14); c.fill(); circ(c, wx - 10, 202, 9); c.fill(); circ(c, wx + 10, 202, 9); c.fill();
  }
  c.restore();
  for (let i = 0; i < 20; i++) { const x = wrapX(i * 53 + Math.sin(t + i) * 8 - camX * 0.3, viewW + 20) - 10, y = VIEW_H - wrapX(i * 41 + t * (12 + (i % 4) * 4), VIEW_H); c.fillStyle = 'rgba(255,255,255,.8)'; circ(c, x, y, 1 + (i % 3) * 0.5); c.fill(); }
}
function bgNest(c, viewW, camX, t) {
  const sx = viewW * 0.75, sg = c.createRadialGradient(sx, 70, 4, sx, 70, 70);
  sg.addColorStop(0, 'rgba(255,240,200,1)'); sg.addColorStop(0.35, 'rgba(255,210,150,.75)'); sg.addColorStop(1, 'rgba(255,210,150,0)');
  c.fillStyle = sg; circ(c, sx, 70, 70); c.fill();
  const span = 260;
  for (const [f, trunk, leaf] of [[0.15, '#b89a7a', 'rgba(150,200,110,.55)'], [0.35, '#8a6a48', 'rgba(110,170,80,.75)']]) {
    for (let i = -1; i < viewW / span + 2; i++) {
      const wx = i * span + wrapX(-camX * f, span) + (f > 0.3 ? 130 : 0);
      c.fillStyle = trunk; c.fillRect(wx - 14, 0, 28, VIEW_H);
      c.strokeStyle = trunk; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(wx, 120); c.quadraticCurveTo(wx + 40, 100, wx + 90, 110); c.moveTo(wx, 70); c.quadraticCurveTo(wx - 40, 50, wx - 80, 60); c.stroke();
      c.fillStyle = leaf; for (const [dx, dy, r] of [[90, 104, 22], [-80, 54, 20], [20, 20, 34], [-30, 140, 18]]) { circ(c, wx + dx, dy, r); c.fill(); }
    }
  }
  for (let i = 0; i < 10; i++) { const x = wrapX(i * 97 - camX * 0.3 + Math.sin(t * 0.8 + i) * 20, viewW + 40) - 20, y = wrapX(i * 47 + t * (14 + i % 3 * 5), VIEW_H); c.save(); c.translate(x, y); c.rotate(t * 2 + i); c.fillStyle = ['#ffb347', '#e85d3a', '#ffd23f'][i % 3]; ell(c, 0, 0, 4, 2); c.fill(); c.restore(); }
}
Object.assign(BG2, { river: bgRiver, kites: bgKites, pinball: bgPinball, upside: bgUpside, nest: bgNest });
