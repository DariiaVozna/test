'use strict';
/* ===== Частина 5: джунглі, бульбашки, пекарня, піратська бухта, Медуза Желейка ===== */

function drawMonkey(c, x, gy, dir, t, throwing, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const fur = flash ? '#fff' : '#a8744f', face = '#f2cda4';
  c.strokeStyle = INK; c.lineWidth = 1;
  c.strokeStyle = fur; c.lineWidth = 2.6; c.beginPath(); c.moveTo(-6, -6); c.quadraticCurveTo(-16, -6, -14, -16); c.quadraticCurveTo(-12, -20, -9, -17); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = fur; ell(c, 0, -8, 7, 8); c.fill(); c.stroke();
  c.fillStyle = face; ell(c, 1.5, -7, 4, 5); c.fill();
  circ(c, -6, -21, 3); c.fillStyle = fur; c.fill(); c.stroke(); c.fillStyle = face; circ(c, -6, -21, 1.6); c.fill();
  c.fillStyle = fur; circ(c, 2, -19, 7); c.fill(); c.stroke();
  c.fillStyle = face; ell(c, 4, -18, 5, 4.4); c.fill();
  c.fillStyle = INK; circ(c, 3, -20, 1); c.fill(); circ(c, 6.6, -20, 1); c.fill(); circ(c, 6, -16.6, 0.6); c.fill();
  c.lineWidth = 0.8; c.beginPath(); c.moveTo(1.4, -22.4); c.lineTo(4, -21.6); c.moveTo(8, -22.4); c.lineTo(5.6, -21.6); c.stroke();
  c.beginPath(); c.arc(5, -14.8, 1.6, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();
  c.lineWidth = 1; c.fillStyle = fur;
  if (throwing) { c.save(); c.translate(5, -11); c.rotate(-2.2); rr(c, -1.6, 0, 3.2, 8, 1.6); c.fill(); c.stroke(); c.restore(); }
  else { rr(c, 3, -11, 7, 3, 1.5); c.fill(); c.stroke(); drawBanana(c, 9, -10, 0.3); }
  c.fillStyle = fur; ell(c, -3, -0.6, 3, 1.6); c.fill(); c.stroke(); ell(c, 4, -0.6, 3, 1.6); c.fill(); c.stroke();
  c.restore();
}
function drawBanana(c, x, y, a) {
  c.save(); c.translate(x, y); c.rotate(a || 0); c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 4.6; c.beginPath(); c.arc(0, -4, 6, 0.25 * Math.PI, 0.8 * Math.PI); c.stroke();
  c.strokeStyle = '#ffd23f'; c.lineWidth = 3; c.beginPath(); c.arc(0, -4, 6, 0.25 * Math.PI, 0.8 * Math.PI); c.stroke();
  c.restore();
}
function drawParrot(c, x, y, t, dir, flash, gull) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round';
  const f = Math.sin(t * 14);
  const body = flash ? '#fff' : gull ? '#ffffff' : '#ff4f6d', wing = flash ? '#fff' : gull ? '#c9d6e6' : '#4cb6ff';
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = gull ? '#c9d6e6' : '#54d68c'; c.beginPath(); c.moveTo(-7, 0); c.lineTo(-15, gull ? -2 : 3); c.lineTo(-13, gull ? 3 : 7); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = body; ell(c, 0, 0, 9, 6.5); c.fill(); c.stroke();
  c.fillStyle = wing; ell(c, -2, -3 - f * 3, 6.5, 3 + f * 1.5, -0.4); c.fill(); c.stroke();
  c.fillStyle = gull ? '#ffb347' : '#ffd23f'; c.beginPath(); c.moveTo(7.5, -2); c.quadraticCurveTo(13, -1, 11, 3.5); c.lineTo(7.5, 2); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 4.2, -2.4, 2.2); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 4.8, -2.2, 1.1); c.fill();
  c.beginPath(); c.moveTo(1.6, -5.6); c.lineTo(6, -4.6); c.stroke();
  c.restore();
}
function drawGinger(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const step = Math.sin(t * 10) * 1.6, dough = flash ? '#fff' : '#c98d55';
  c.strokeStyle = INK; c.lineWidth = 1; c.fillStyle = dough;
  rr(c, -6 + step * 0.4, -7, 5, 7, 2.5); c.fill(); c.stroke(); rr(c, 1 - step * 0.4, -7, 5, 7, 2.5); c.fill(); c.stroke();
  rr(c, -6, -17, 12, 11, 4); c.fill(); c.stroke();
  c.save(); c.translate(-5, -15); c.rotate(0.6 + Math.sin(t * 10) * 0.2); rr(c, -2, 0, 4, 7, 2); c.fill(); c.stroke(); c.restore();
  c.save(); c.translate(5, -15); c.rotate(-0.6 - Math.sin(t * 10) * 0.2); rr(c, -2, 0, 4, 7, 2); c.fill(); c.stroke(); c.restore();
  circ(c, 0, -22, 6); c.fill(); c.stroke();
  c.strokeStyle = '#fff'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-4, -8); c.lineTo(-2, -9.5); c.lineTo(0, -8); c.lineTo(2, -9.5); c.lineTo(4, -8); c.stroke();
  c.fillStyle = '#ff7ab8'; circ(c, 0, -14, 1.2); c.fill(); c.fillStyle = '#7fd6ff'; circ(c, 0, -11, 1.2); c.fill();
  c.fillStyle = INK; circ(c, -2, -23, 0.9); c.fill(); circ(c, 2.4, -23, 0.9); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(-3.6, -25.4); c.lineTo(-1, -24.6); c.moveTo(4, -25.4); c.lineTo(1.4, -24.6); c.stroke();
  c.strokeStyle = '#fff'; c.lineWidth = 1; c.beginPath(); c.arc(0.2, -20, 2, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
  c.restore();
}
function drawCannon(c, x, gy, dir, t, flash, recoil) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.1;
  c.fillStyle = flash ? '#fff' : '#a8743f'; rr(c, -11, -9, 20, 8, 2); c.fill(); c.stroke();
  for (const wx of [-7, 5]) { c.fillStyle = '#7a4a24'; circ(c, wx, -2, 4); c.fill(); c.stroke(); c.fillStyle = '#c98d55'; circ(c, wx, -2, 1.4); c.fill(); }
  c.save(); c.translate(-2 + (recoil || 0) * 3, -13); c.rotate(-0.15);
  c.fillStyle = flash ? '#fff' : '#5b5470'; rr(c, -6, -5, 20, 10, 5); c.fill(); c.stroke();
  c.fillStyle = '#3a3448'; ell(c, 14, 0, 2.4, 4.4); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.fillRect(2, -5, 2, 10);
  c.fillStyle = '#fff'; circ(c, 0, -1.5, 1.8); c.fill(); c.fillStyle = INK; circ(c, 0.5, -1.4, 0.9); c.fill();
  c.restore();
  c.restore();
}
function drawCannonball(c, x, y) {
  c.save(); c.fillStyle = '#3a3448'; c.strokeStyle = INK; c.lineWidth = 1; circ(c, x, y, 5); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.45)'; circ(c, x - 1.6, y - 1.6, 1.4); c.fill(); c.restore();
}
function drawVine(c, v, t) {
  c.save(); c.lineCap = 'round';
  const top = v.y0, bot = v.y1, x = v.x;
  c.strokeStyle = '#2f8a3c'; c.lineWidth = 4; c.beginPath();
  for (let y = top; y <= bot; y += 6) c.lineTo(x + Math.sin(y * 0.08 + t * 1.5) * 2, y);
  c.stroke();
  c.strokeStyle = '#4fbf5a'; c.lineWidth = 2; c.stroke();
  c.fillStyle = '#5fd46a'; c.strokeStyle = INK; c.lineWidth = 0.7;
  for (let y = top + 10; y < bot; y += 16) { const s = (y / 16) % 2 ? 1 : -1, lx = x + Math.sin(y * 0.08 + t * 1.5) * 2; ell(c, lx + s * 5, y, 5, 2.2, s * 0.5); c.fill(); c.stroke(); }
  c.fillStyle = '#ff7ab8'; circ(c, x, top + 2, 2.4); c.fill();
  c.restore();
}
/* Бульбашка-платформа: стоїть недовго, тоді лопається й виростає знову */
function drawBubblePlat(c, m, t) {
  const cx = m.x + m.w / 2;
  if (m.state === 'gone') {
    c.save();
    if (m.st < 0.3) { const k = m.st / 0.3; c.globalAlpha = 1 - k; c.strokeStyle = '#fff'; c.lineWidth = 2; circ(c, cx, m.by + 14, 14 + k * 12); c.stroke(); }
    else if (m.st > 1.9) { const k = Math.min(1, (m.st - 1.9) / 0.7); c.globalAlpha = 0.25 + k * 0.4; c.strokeStyle = '#fff'; c.lineWidth = 1.2; circ(c, cx, m.by + 14, 3 + 11 * k); c.stroke(); }
    c.restore(); return;
  }
  const wob = m.state === 'wobble' ? Math.sin(t * 38) * (0.8 + m.st * 2) : 0;
  const rx = 15 + wob, ry = 14 - wob * 0.5, cy = m.y + ry;
  c.save();
  const g = c.createRadialGradient(cx - 5, cy - 6, 1, cx, cy, rx);
  g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(0.45, 'rgba(210,240,255,.35)'); g.addColorStop(0.8, 'rgba(255,180,235,.5)'); g.addColorStop(1, 'rgba(140,190,255,.8)');
  c.fillStyle = g; ell(c, cx, cy, rx, ry); c.fill();
  c.strokeStyle = 'rgba(59,31,79,.55)'; c.lineWidth = 1.2; c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 2; c.beginPath(); c.ellipse(cx, cy, rx - 4, ry - 4, 0, 3.5, 4.4); c.stroke();
  c.fillStyle = '#fff'; circ(c, cx + 6, cy + 5, 1.5); c.fill();
  c.restore();
}
function drawMedusa(c, B, t) {
  const x = B.x, y = B.y, st = B.state, flash = B.flash > 0;
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = flash ? '#fff' : '#e86fb4'; c.lineWidth = 2.6;
  for (let i = 0; i < 6; i++) { const bx = -15 + i * 6; c.beginPath(); c.moveTo(bx, 8); for (let k = 1; k <= 6; k++) c.lineTo(bx + Math.sin(t * 3 + i + k) * 3, 8 + k * 5); c.stroke(); }
  c.fillStyle = flash ? '#fff' : 'rgba(255,150,210,.95)'; c.strokeStyle = INK; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(-22, 8); c.quadraticCurveTo(-24, -24, 0, -24); c.quadraticCurveTo(24, -24, 22, 8);
  for (let i = 0; i < 5; i++) { const x0 = 22 - i * 8.8; c.quadraticCurveTo(x0 - 4.4, 13, x0 - 8.8, 8); }
  c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.55)'; ell(c, -9, -13, 6, 3, -0.4); c.fill();
  c.save(); c.translate(0, -26); c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1;
  c.beginPath(); c.moveTo(-9, 3); c.lineTo(-10, -6); c.lineTo(-4, -1); c.lineTo(0, -8); c.lineTo(4, -1); c.lineTo(10, -6); c.lineTo(9, 3); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#4cb6ff'; circ(c, 0, -1, 1.6); c.fill(); c.restore();
  c.strokeStyle = INK; c.lineWidth = 1.2;
  if (st === 'stun') { for (const ex of [-7, 7]) { c.beginPath(); for (let a = 0; a < 2.6 * TAU; a += 0.4) { const r = 0.3 + a * 0.22; c.lineTo(ex + Math.cos(a + t * 8) * r, -6 + Math.sin(a + t * 8) * r); } c.stroke(); } }
  else if (st === 'happy') { c.beginPath(); c.arc(-7, -5, 2.4, 1.1 * Math.PI, 1.9 * Math.PI); c.moveTo(9.4, -5); c.arc(7, -5, 2.4, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); c.beginPath(); c.arc(0, 0, 4, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); }
  else { c.fillStyle = INK; ell(c, -7, -6, 2, 2.8); c.fill(); ell(c, 7, -6, 2, 2.8); c.fill(); c.fillStyle = '#fff'; circ(c, -6.4, -7, 0.8); c.fill(); circ(c, 7.6, -7, 0.8); c.fill(); c.beginPath(); c.moveTo(-11, -11); c.lineTo(-4, -9); c.moveTo(11, -11); c.lineTo(4, -9); c.stroke(); c.beginPath(); c.arc(0, 3, 3, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke(); }
  c.fillStyle = 'rgba(255,110,170,.5)'; circ(c, -13, -1, 3); c.fill(); circ(c, 13, -1, 3); c.fill();
  c.restore();
  if (B.shield > 0 && st !== 'stun' && st !== 'happy') {
    const r = 38 + Math.sin(t * 3) * 1.5, a = 0.25 + 0.15 * B.shield;
    const g = c.createRadialGradient(x - 10, y - 12, 4, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${a})`); g.addColorStop(0.7, 'rgba(180,230,255,.1)'); g.addColorStop(1, `rgba(150,210,255,${a + 0.2})`);
    c.fillStyle = g; circ(c, x, y, r); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r - 4, 3.5, 4.5); c.stroke();
    c.strokeStyle = `rgba(120,180,255,${0.4 + 0.15 * B.shield})`; c.lineWidth = 1.5; circ(c, x, y, r); c.stroke();
  }
}
function drawBub(c, x, y, t) {
  c.save(); const g = c.createRadialGradient(x - 2, y - 2, 0, x, y, 6); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,150,220,.55)');
  c.fillStyle = g; circ(c, x, y, 6); c.fill(); c.strokeStyle = 'rgba(232,111,180,.9)'; c.lineWidth = 1.2; c.stroke(); c.restore();
}

/* Фони п'ятої частини */
function bgJungle(c, viewW, camX, t) {
  const sx = viewW * 0.7, sg = c.createRadialGradient(sx, 50, 4, sx, 50, 56);
  sg.addColorStop(0, 'rgba(255,250,210,1)'); sg.addColorStop(0.35, 'rgba(255,240,170,.75)'); sg.addColorStop(1, 'rgba(255,240,170,0)');
  c.fillStyle = sg; circ(c, sx, 50, 56); c.fill();
  for (const [f, base, col, sp, h] of [[0.15, 190, '#5fb36a', 80, 90], [0.35, 214, '#3f9a52', 64, 60]]) {
    for (let i = -1; i < viewW / sp + 2; i++) {
      const wx = i * sp + wrapX(-camX * f, sp);
      c.fillStyle = '#7a5236'; c.fillRect(wx - 3, base - h + 20, 6, h);
      c.fillStyle = col;
      for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.55; ell(c, wx + Math.cos(a) * 16, base - h + 18 + Math.sin(a) * 8, 18, 5, a + Math.PI / 2); c.fill(); }
    }
    c.fillStyle = col; c.fillRect(0, base + 10, viewW + 1, VIEW_H);
  }
  c.strokeStyle = 'rgba(47,138,60,.35)'; c.lineWidth = 2;
  for (let i = 0; i < 8; i++) { const x = wrapX(i * 97 - camX * 0.25, viewW + 60) - 30; c.beginPath(); c.moveTo(x, 0); for (let y = 0; y < 70 + (i % 3) * 20; y += 8) c.lineTo(x + Math.sin(y * 0.1 + t + i) * 3, y); c.stroke(); }
}
function bgBubbles(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.12 + t * 4, viewW + 240) - 120; puffCloud(c, x, 32 + (i % 3) * 20, 0.85, 'rgba(255,255,255,.9)'); }
  hill(c, viewW, 196, 10, 0.016, 0.6, camX * 0.2, '#bfe9f7');
  hill(c, viewW, 216, 8, 0.024, 1.6, camX * 0.38, '#9fdcf0');
  for (let i = 0; i < 18; i++) {
    const x = wrapX(i * 67 - camX * 0.3 + Math.sin(t + i) * 10, viewW + 40) - 20, y = wrapX(VIEW_H - (t * (14 + (i % 4) * 6) + i * 41), VIEW_H + 40) - 20, r = 4 + (i % 4) * 3;
    const g = c.createRadialGradient(x - r / 3, y - r / 3, 0, x, y, r); g.addColorStop(0, 'rgba(255,255,255,.8)'); g.addColorStop(1, 'rgba(255,180,230,.25)');
    c.fillStyle = g; circ(c, x, y, r); c.fill(); c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1; c.stroke();
  }
}
function bgBakery(c, viewW, camX, t) {
  c.fillStyle = 'rgba(255,200,170,.25)';
  const ws = 40, wo = wrapX(-camX * 0.1, ws);
  for (let x = -ws + wo; x < viewW + ws; x += ws) c.fillRect(x, 0, 20, VIEW_H);
  const span = 300;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span);
    c.fillStyle = '#c98d55'; rr(c, wx, 120, 180, 8, 3); c.fill();
    c.fillStyle = '#ffb3c6'; rr(c, wx + 14, 92, 34, 28, 6); c.fill(); c.fillStyle = '#fff5fb'; rr(c, wx + 14, 90, 34, 9, 4); c.fill(); c.fillStyle = '#ff4f6d'; circ(c, wx + 31, 86, 4); c.fill();
    c.fillStyle = '#e09a5a'; circ(c, wx + 80, 106, 14); c.fill(); c.fillStyle = '#7a4430'; for (const [dx, dy] of [[-5, -4], [4, -6], [2, 4], [-6, 5]]) { circ(c, wx + 80 + dx, 106 + dy, 1.8); c.fill(); }
    c.fillStyle = '#fff0f6'; rr(c, wx + 112, 96, 46, 24, 8); c.fill(); c.fillStyle = '#ff9fcb'; rr(c, wx + 112, 96, 46, 8, 4); c.fill();
  }
  c.fillStyle = '#ffe2c4'; c.fillRect(0, 196, viewW + 1, VIEW_H);
  c.fillStyle = '#f5c99c'; c.fillRect(0, 194, viewW + 1, 5);
  for (let i = 0; i < 10; i++) { const x = wrapX(i * 83 - camX * 0.3, viewW + 40) - 20; c.fillStyle = ['#ff7ab8', '#7fd6ff', '#ffe14d'][i % 3]; rr(c, x, 210 + (i % 3) * 8, 6, 2, 1); c.fill(); }
}
function bgPirate(c, viewW, camX, t) {
  const sx = viewW * 0.8, sg = c.createRadialGradient(sx, 46, 4, sx, 46, 54);
  sg.addColorStop(0, 'rgba(255,250,215,1)'); sg.addColorStop(0.35, 'rgba(255,240,180,.8)'); sg.addColorStop(1, 'rgba(255,240,180,0)');
  c.fillStyle = sg; circ(c, sx, 46, 54); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.12 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 20, 0.85, 'rgba(255,255,255,.9)'); }
  const sea = c.createLinearGradient(0, 140, 0, VIEW_H); sea.addColorStop(0, '#7fd8f0'); sea.addColorStop(1, '#2f9fd0');
  c.fillStyle = sea; c.fillRect(0, 140, viewW + 1, VIEW_H - 140);
  const span = 420;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.12, span) + 120, wy = 140 + Math.sin(t * 1.2 + i) * 2;
    c.fillStyle = '#8a5a3a'; c.beginPath(); c.moveTo(wx - 46, wy - 14); c.lineTo(wx + 46, wy - 14); c.lineTo(wx + 36, wy + 4); c.lineTo(wx - 36, wy + 4); c.closePath(); c.fill();
    c.fillStyle = '#5a3a24'; c.fillRect(wx - 2, wy - 72, 4, 60);
    c.fillStyle = '#fff8ec'; c.beginPath(); c.moveTo(wx + 3, wy - 68); c.quadraticCurveTo(wx + 30, wy - 50, wx + 3, wy - 22); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(wx - 3, wy - 62); c.quadraticCurveTo(wx - 26, wy - 46, wx - 3, wy - 28); c.closePath(); c.fill();
    c.fillStyle = '#ff4f6d'; c.beginPath(); c.moveTo(wx + 2, wy - 72); c.lineTo(wx + 16, wy - 68); c.lineTo(wx + 2, wy - 64); c.closePath(); c.fill();
  }
  c.strokeStyle = 'rgba(255,255,255,.65)'; c.lineWidth = 1.4;
  for (let i = 0; i < 14; i++) { const x = wrapX(i * 61 - camX * 0.25 + Math.sin(t + i) * 6, viewW + 40) - 20, y = 150 + (i % 4) * 12; c.beginPath(); c.moveTo(x - 5, y); c.lineTo(x + 5, y); c.stroke(); }
}
function bgSea(c, viewW, camX, t) {
  for (let i = 0; i < 6; i++) {
    const x = wrapX(i * 140 - camX * 0.1, viewW + 200) - 100;
    const g = c.createLinearGradient(x, 0, x + 40, VIEW_H); g.addColorStop(0, 'rgba(255,255,255,.18)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g; c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 26, 0); c.lineTo(x + 70, VIEW_H); c.lineTo(x + 40, VIEW_H); c.closePath(); c.fill();
  }
  const span = 360;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.14, span) + 100;
    c.fillStyle = 'rgba(255,190,230,.55)'; rr(c, wx - 40, 90, 80, 150, 6); c.fill();
    for (const dx of [-40, -14, 14, 40]) { c.beginPath(); c.arc(wx + dx * 0.9, 92, 12, Math.PI, TAU); c.fill(); }
    c.fillStyle = 'rgba(255,240,250,.7)'; for (const [dx, dy] of [[-20, 120], [10, 120], [-6, 160], [20, 190]]) { rr(c, wx + dx, dy, 9, 14, 4.5); c.fill(); }
  }
  for (let i = 0; i < 9; i++) {
    const x = wrapX(i * 101 - camX * 0.35, viewW + 60) - 30;
    c.strokeStyle = i % 2 ? 'rgba(80,200,150,.7)' : 'rgba(60,170,130,.7)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, VIEW_H);
    for (let k = 1; k <= 6; k++) c.lineTo(x + Math.sin(t * 1.5 + k + i) * 4, VIEW_H - k * 14); c.stroke();
  }
  for (let i = 0; i < 14; i++) { const x = wrapX(i * 71 - camX * 0.3, viewW + 40) - 20, y = wrapX(VIEW_H - (t * (16 + (i % 4) * 5) + i * 37), VIEW_H); c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1; circ(c, x, y, 1.5 + (i % 3)); c.stroke(); }
}

/* Блоки нових країн (викликається з tileSprite). Повертає true, якщо намалював */
function drawBlock2(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'bamboo') {
    for (const [x0, w] of [[1, 7.5], [8.5, 7.5], [16, 7]]) {
      rr(c, x0, 1, w, T - 2, 2.5); c.fillStyle = '#8fd46a'; c.fill(); c.stroke();
      c.fillStyle = '#b8ef8f'; c.fillRect(x0 + 1.6, 3, 1.6, T - 6);
      c.strokeStyle = '#4f9a3a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x0 + 0.8, 9 + x0 % 3); c.lineTo(x0 + w - 0.8, 9 + x0 % 3); c.moveTo(x0 + 0.8, 17 - x0 % 2); c.lineTo(x0 + w - 0.8, 17 - x0 % 2); c.stroke();
      c.strokeStyle = INK; c.lineWidth = 1.4;
    }
  } else if (b === 'soap') {
    rr(c, 1, 1, T - 2, T - 2, 7); c.fillStyle = '#c9ecff'; c.fill(); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 1.2;
    for (const [x, y, r] of [[8, 9, 4], [16, 15, 3], [15, 7, 2], [8, 17, 2]]) { circ(c, x, y, r); c.stroke(); }
    c.fillStyle = 'rgba(255,190,235,.55)'; ell(c, 17, 18, 3, 1.5); c.fill();
  } else if (b === 'cake') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#ffd9a8'; c.fill(); c.stroke();
    c.fillStyle = '#ff9fcb'; c.fillRect(2, 9, T - 4, 3.5); c.fillRect(2, 16, T - 4, 3.5);
    c.fillStyle = '#fffafc'; c.beginPath(); c.moveTo(1.5, 6); c.lineTo(1.5, 3); c.quadraticCurveTo(1.5, 1.5, 4, 1.5); c.lineTo(T - 4, 1.5); c.quadraticCurveTo(T - 1.5, 1.5, T - 1.5, 3); c.lineTo(T - 1.5, 6);
    for (let x = T - 1.5; x > 2; x -= 5) c.quadraticCurveTo(x - 2.5, 9.5, x - 5, 6);
    c.closePath(); c.fill(); c.lineWidth = 1; c.stroke();
    c.fillStyle = '#ff4f6d'; circ(c, T / 2, 2.5, 2.2); c.fill(); c.stroke();
  } else if (b === 'barrel') {
    c.fillStyle = '#c98d55'; c.beginPath(); c.moveTo(4, 1); c.lineTo(T - 4, 1); c.quadraticCurveTo(T, T / 2, T - 4, T - 1); c.lineTo(4, T - 1); c.quadraticCurveTo(0, T / 2, 4, 1); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1; c.beginPath(); c.moveTo(9, 2); c.quadraticCurveTo(7, T / 2, 9, T - 2); c.moveTo(15, 2); c.quadraticCurveTo(17, T / 2, 15, T - 2); c.stroke();
    c.fillStyle = '#7d8aa6'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, 1.6, 5, T - 3.2, 3, 1); c.fill(); c.stroke(); rr(c, 1.6, 16, T - 3.2, 3, 1); c.fill(); c.stroke();
  } else if (b === 'pearl') {
    rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#ffc4d6'; c.fill(); c.stroke();
    c.strokeStyle = '#e88aa6'; c.lineWidth = 1.1; c.beginPath();
    for (let i = -2; i <= 2; i++) { c.moveTo(T / 2, T - 3); c.lineTo(T / 2 + i * 4.5, 4); } c.stroke();
    c.fillStyle = '#fffaf2'; c.strokeStyle = INK; c.lineWidth = 0.9; circ(c, T / 2, T / 2 + 1, 3.6); c.fill(); c.stroke();
    c.fillStyle = '#fff'; circ(c, T / 2 - 1.2, T / 2, 1); c.fill();
  } else return drawBlock3(c, b);
  return true;
}

/* Плитка, що підкидає: желе в пекарні, барабан у музичній країні */
function drawBounceTile(c, theme) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (theme === 'music' || theme === 'circus') {
    rr(c, 1, 5, T - 2, T - 6, 3); c.fillStyle = theme === 'music' ? '#ff5c7a' : '#4cb6ff'; c.fill(); c.stroke();
    c.strokeStyle = '#ffd23f'; c.lineWidth = 1.2; c.beginPath(); for (let x = 2; x < T - 4; x += 5) { c.moveTo(x, 8); c.lineTo(x + 5, T - 3); c.moveTo(x + 5, 8); c.lineTo(x, T - 3); } c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = '#fffaf2'; ell(c, T / 2, 5, T / 2 - 1, 3.6); c.fill(); c.stroke();
    c.fillStyle = 'rgba(0,0,0,.08)'; ell(c, T / 2, 5.4, 6, 1.6); c.fill();
  } else {
    const g = c.createLinearGradient(0, 0, 0, T); g.addColorStop(0, '#ffb3dd'); g.addColorStop(1, '#ff6fb8');
    c.beginPath(); c.moveTo(1, T - 1); c.lineTo(1, 6); c.quadraticCurveTo(1, 1, 6, 1.5); c.quadraticCurveTo(T / 2, 3.5, T - 6, 1.5); c.quadraticCurveTo(T - 1, 1, T - 1, 6); c.lineTo(T - 1, T - 1); c.closePath();
    c.fillStyle = g; c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.75)'; ell(c, 7, 6, 3.6, 1.6, -0.2); c.fill(); circ(c, 16, 12, 1.4); c.fill();
    c.fillStyle = 'rgba(255,255,255,.35)'; ell(c, 13, 17, 4, 2); c.fill();
  }
}
/* Верх клавіш піаніно */
function drawPianoTop(c) {
  c.fillStyle = '#fffaf2'; c.fillRect(0, 0, T + 1, 19);
  c.fillStyle = '#e9e0f2'; c.fillRect(0, 17, T + 1, 2.4);
  c.fillStyle = '#2a1f3a'; rr(c, -3.5, -1, 7, 12, 1.5); c.fill(); rr(c, T - 3.5, -1, 7, 12, 1.5); c.fill();
  c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(-1.5, 0, 1.2, 9); c.fillRect(T - 1.5, 0, 1.2, 9);
  c.strokeStyle = '#b8aac9'; c.lineWidth = 1; c.beginPath(); c.moveTo(0.5, 11); c.lineTo(0.5, 19); c.stroke();
}

/* Декор п'ятої частини */
function drawDecor5(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'fern':
      for (const a of [-1.1, -0.5, 0.1, 0.7]) {
        c.save(); c.translate(x, y); c.rotate(a + Math.sin(t * 1.5 + x) * 0.05);
        c.fillStyle = d.c || '#4fbf5a'; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(4, -9, 0, -18); c.quadraticCurveTo(-4, -9, 0, 0); c.fill(); c.stroke();
        c.restore();
      }
      break;
    case 'hibiscus':
      c.strokeStyle = '#3f9e4f'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 10); c.stroke();
      c.strokeStyle = INK; c.lineWidth = 0.8; c.fillStyle = d.c;
      for (let i = 0; i < 5; i++) { const a = i * TAU / 5 + 0.3; ell(c, x + Math.cos(a) * 4, y - 13 + Math.sin(a) * 4, 3.6, 2.4, a); c.fill(); c.stroke(); }
      c.fillStyle = '#ffe14d'; circ(c, x, y - 13, 1.6); c.fill(); break;
    case 'cupcake':
      c.fillStyle = '#ffd9a8'; c.beginPath(); c.moveTo(x - 6, y - 8); c.lineTo(x + 6, y - 8); c.lineTo(x + 4.5, y); c.lineTo(x - 4.5, y); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = d.c; circ(c, x - 3.5, y - 9.5, 3.4); c.fill(); c.stroke(); circ(c, x + 3.5, y - 9.5, 3.4); c.fill(); c.stroke(); circ(c, x, y - 12.5, 4); c.fill(); c.stroke();
      c.fillStyle = '#ff4f6d'; circ(c, x, y - 17, 1.8); c.fill(); break;
    case 'anchor':
      c.strokeStyle = '#5b5470'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y - 2); c.lineTo(x, y - 15); c.moveTo(x - 4, y - 12); c.lineTo(x + 4, y - 12); c.stroke();
      c.beginPath(); c.arc(x, y - 6, 5, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); circ(c, x, y - 17, 2); c.stroke(); break;
    case 'chest':
      c.fillStyle = '#b8783e'; rr(c, x - 7, y - 9, 14, 9, 2); c.fill(); c.stroke();
      c.fillStyle = '#ffd23f'; c.beginPath(); c.arc(x, y - 9, 7, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#ffd23f'; c.fillRect(x - 1.5, y - 8, 3, 4); sparkle(c, x + 4, y - 15, 1.4 + Math.sin(t * 4 + x) * 0.5, '#fff'); break;
    default: drawDecor6(c, d, t);
  }
}
