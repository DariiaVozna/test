'use strict';
/* ===== Частина 3: осінь, повітряні кульки, іграшки, пустеля, Дракон Чхун ===== */
const LEAF_COLS = ['#ff8a3d', '#ffb347', '#e85d3a', '#ffd23f'];

function drawSquirrel(c, x, gy, dir, t, throwing, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = flash ? '#fff' : '#c96f2c';
  c.beginPath(); c.moveTo(-4, -4); c.bezierCurveTo(-17, -3, -19, -19, -11, -25 + Math.sin(t * 3)); c.bezierCurveTo(-4, -29, 2, -23, -4, -18); c.bezierCurveTo(-8, -14, -6, -8, -2, -8); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#ffd6a8'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(-10, -9); c.quadraticCurveTo(-15, -16, -10, -22); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = flash ? '#fff' : '#d9823b'; ell(c, 0, -8, 7, 8); c.fill(); c.stroke();
  c.fillStyle = '#ffd6a8'; ell(c, 2.2, -7, 4, 5.5); c.fill();
  c.fillStyle = flash ? '#fff' : '#d9823b'; circ(c, 4, -18, 6); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(1.5, -22.5); c.lineTo(2.5, -28); c.lineTo(6, -23); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffd6a8'; ell(c, 7, -16, 3.2, 2.4); c.fill();
  c.fillStyle = INK; circ(c, 6, -19.5, 1.2); c.fill(); circ(c, 10, -17, 1); c.fill();
  c.lineWidth = 0.9; c.beginPath(); c.moveTo(3.8, -22); c.lineTo(7.4, -21); c.stroke();
  c.fillStyle = '#d9823b'; c.lineWidth = 1;
  if (throwing) { c.save(); c.translate(5, -12); c.rotate(-2.2); rr(c, -1.5, 0, 3, 8, 1.5); c.fill(); c.stroke(); c.restore(); }
  else { rr(c, 3, -11, 6, 3, 1.5); c.fill(); c.stroke(); drawAcorn(c, 8, -9, 0); }
  c.fillStyle = '#b5652a'; ell(c, -2, -0.5, 3.2, 1.6); c.fill(); c.stroke(); ell(c, 4, -0.5, 3.2, 1.6); c.fill(); c.stroke();
  c.restore();
}
function drawAcorn(c, x, y, a) {
  c.save(); c.translate(x, y); c.rotate(a || 0); c.strokeStyle = INK; c.lineWidth = 0.8;
  c.fillStyle = '#c47a3c'; ell(c, 0, 1.5, 3.4, 4); c.fill(); c.stroke();
  c.fillStyle = '#7a4a24'; ell(c, 0, -1.6, 4.2, 2.4); c.fill(); c.stroke();
  c.fillRect(-0.5, -5, 1, 2);
  c.restore();
}
function drawBird(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const f = Math.sin(t * 14);
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = flash ? '#fff' : '#3f95e0'; c.beginPath(); c.moveTo(-7, -1); c.lineTo(-14, -5); c.lineTo(-13, 3); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#5fb8ff'; ell(c, 0, 0, 9, 7); c.fill(); c.stroke();
  c.fillStyle = '#dff3ff'; ell(c, 2, 2.4, 5, 3.6); c.fill();
  c.fillStyle = flash ? '#fff' : '#3f95e0'; ell(c, -2, -3 - f * 3, 6, 3 + f * 1.5, -0.4); c.fill(); c.stroke();
  c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(8, -1.5); c.lineTo(13.5, 0.5); c.lineTo(8, 2.2); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 4, -2.5, 2.3); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 4.7, -2.3, 1.1); c.fill();
  c.beginPath(); c.moveTo(1.6, -5.6); c.lineTo(6, -4.8); c.stroke();
  c.restore();
}
function drawMushWalker(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const step = Math.sin(t * 10) * 1.5;
  c.strokeStyle = INK; c.lineWidth = 1; c.fillStyle = '#fff1dc';
  ell(c, -4 + step, -1.2, 3, 1.8); c.fill(); c.stroke(); ell(c, 4 - step, -1.2, 3, 1.8); c.fill(); c.stroke();
  rr(c, -6, -12, 12, 11, 4); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#ff6b6b';
  c.beginPath(); c.moveTo(-11.5, -10.5); c.quadraticCurveTo(-11.5, -23, 0, -23); c.quadraticCurveTo(11.5, -23, 11.5, -10.5); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, -5, -16, 2.1); c.fill(); circ(c, 3, -19, 1.6); c.fill(); circ(c, 6.5, -13.5, 1.4); c.fill();
  c.fillStyle = INK; circ(c, -1.8, -7, 1); c.fill(); circ(c, 2.8, -7, 1); c.fill();
  c.lineWidth = 0.8; c.beginPath(); c.moveTo(-3.6, -9.4); c.lineTo(-0.8, -8.6); c.moveTo(4.6, -9.4); c.lineTo(1.8, -8.6); c.stroke();
  c.beginPath(); c.arc(0.5, -3.4, 1.5, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke();
  c.restore();
}
function drawSoldier(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const step = Math.sin(t * 9) * 1.6;
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = '#2d3a8c'; rr(c, -4.2 + step * 0.5, -10, 3.6, 9, 1.2); c.fill(); c.stroke(); rr(c, 0.6 - step * 0.5, -10, 3.6, 9, 1.2); c.fill(); c.stroke();
  c.fillStyle = INK; rr(c, -4.6 + step * 0.5, -2.2, 4.4, 2.4, 1); c.fill(); rr(c, 0.4 - step * 0.5, -2.2, 4.4, 2.4, 1); c.fill();
  c.fillStyle = flash ? '#fff' : '#ff4f6d'; rr(c, -5.5, -20, 11, 11, 2); c.fill(); c.stroke();
  c.fillStyle = '#fff'; c.fillRect(-5.5, -12.6, 11, 1.6);
  c.fillStyle = '#ffd23f'; circ(c, 0, -17.5, 0.9); c.fill(); circ(c, 0, -14.8, 0.9); c.fill();
  c.fillStyle = flash ? '#fff' : '#ff4f6d'; c.save(); c.translate(4.5, -19); c.rotate(-0.25 + Math.sin(t * 9) * 0.2); rr(c, -1.5, 0, 3, 8, 1.5); c.fill(); c.stroke(); c.restore();
  c.fillStyle = '#ffd9b8'; circ(c, 0, -24, 4.2); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,120,150,.6)'; circ(c, 2.4, -22.6, 1.2); c.fill();
  c.fillStyle = INK; circ(c, 1.8, -24.6, 0.9); c.fill();
  c.fillStyle = '#2b2140'; rr(c, -4.4, -36, 8.8, 10.5, 2); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.fillRect(-4.4, -28.4, 8.8, 1.6);
  c.fillStyle = '#ff4f6d'; circ(c, 0, -37, 1.6); c.fill();
  c.restore();
}
function drawMouse(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1;
  c.strokeStyle = '#ff9fcb'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-10, -3); c.quadraticCurveTo(-15, -2, -16, -7); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = flash ? '#fff' : '#b9b2cf'; c.beginPath(); c.moveTo(-10, -1); c.quadraticCurveTo(-10, -12, 2, -12); c.quadraticCurveTo(10, -12, 11.5, -1); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffc0d6'; circ(c, 3, -12, 3.4); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 7, -7, 1.1); c.fill(); c.fillStyle = '#ff6f9a'; circ(c, 11.4, -2.5, 1.3); c.fill();
  c.fillStyle = '#5b5470'; circ(c, -5, 0, 2); c.fill(); circ(c, 5, 0, 2); c.fill();
  c.save(); c.translate(-3, -12.5); c.rotate(t * 8); c.fillStyle = '#ffcc33'; c.strokeStyle = '#a86f00';
  c.fillRect(-0.8, -6, 1.6, 6); ell(c, -2.8, -7, 2.6, 1.6); c.fill(); c.stroke(); ell(c, 2.8, -7, 2.6, 1.6); c.fill(); c.stroke();
  c.restore();
  c.restore();
}
function drawScorp(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const body = flash ? '#fff' : '#e09a4a';
  c.strokeStyle = INK; c.lineWidth = 1.2;
  for (let i = 0; i < 3; i++) { const ph = Math.sin(t * 14 + i * 2) * 1.2; c.beginPath(); c.moveTo(-4 + i * 4, -4); c.lineTo(-6 + i * 4 + ph, 0); c.stroke(); }
  c.fillStyle = body; c.lineWidth = 1;
  for (const [cx, cy, r] of [[-9, -6, 3.2], [-11, -10.5, 3], [-10, -15, 2.8], [-6.5, -18.5, 2.6]]) { circ(c, cx, cy, r); c.fill(); c.stroke(); }
  c.fillStyle = '#b5652a'; c.beginPath(); c.moveTo(-4.5, -19); c.lineTo(-1, -17); c.lineTo(-4.4, -15.6); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = body; ell(c, 0, -5, 10, 4.5); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(59,31,79,.35)'; c.beginPath(); c.moveTo(-3, -9); c.lineTo(-3, -1); c.moveTo(2, -9); c.lineTo(2, -1); c.stroke();
  c.strokeStyle = INK; c.fillStyle = body;
  const snap = Math.abs(Math.sin(t * 6)) * 0.4;
  c.beginPath(); c.moveTo(8, -6); c.lineTo(12, -9); c.stroke();
  c.save(); c.translate(13, -9.5); c.rotate(-snap); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(3, -4, 5, -1); c.closePath(); c.fill(); c.stroke(); c.restore();
  c.save(); c.translate(13, -9.5); c.rotate(snap); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(4, 2, 5, -0.5); c.closePath(); c.fill(); c.stroke(); c.restore();
  c.fillStyle = INK; circ(c, 6.5, -7.4, 1); c.fill(); circ(c, 8.6, -7, 0.9); c.fill();
  c.restore();
}
function drawCactus(c, x, gy, t) {
  c.save(); c.translate(x, gy); c.lineJoin = 'round';
  c.fillStyle = '#5cbf6a'; c.strokeStyle = INK; c.lineWidth = 1.1;
  rr(c, -11, -21, 5, 11, 2.5); c.fill(); c.stroke(); rr(c, -11, -13, 8, 4, 2); c.fill(); c.stroke();
  rr(c, 6, -25, 5, 11, 2.5); c.fill(); c.stroke(); rr(c, 3, -17, 8, 4, 2); c.fill(); c.stroke();
  rr(c, -5, -28, 10, 28, 5); c.fill(); c.stroke();
  c.strokeStyle = '#3f9e4f'; c.lineWidth = 1; c.beginPath(); c.moveTo(-1.5, -24); c.lineTo(-1.5, -2); c.moveTo(1.8, -24); c.lineTo(1.8, -2); c.stroke();
  c.strokeStyle = '#fff'; c.lineWidth = 0.8;
  for (const [sx, sy] of [[-5, -20], [5, -14], [-5, -8], [5, -24], [-9, -18], [9, -21]]) { c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx + (sx < 0 ? -2 : 2), sy - 1); c.stroke(); }
  flower(c, 0, -29, 1.4, '#ff7ab8');
  c.fillStyle = INK; circ(c, -2, -16, 1); c.fill(); circ(c, 2.4, -16, 1); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(-3.6, -18.6); c.lineTo(-0.8, -17.8); c.moveTo(4, -18.6); c.lineTo(1.4, -17.8); c.moveTo(-1, -12.6); c.lineTo(1.6, -12.6); c.stroke();
  c.restore();
}
function drawPuff(c, x, y, t) {
  c.save(); c.translate(x, y); c.rotate(Math.sin(t * 6) * 0.2); c.lineJoin = 'round';
  const puffs = [[-5, 1, 5], [0, -2, 6], [5, 1, 5]];
  c.strokeStyle = INK; c.lineWidth = 2; for (const p of puffs) { circ(c, p[0], p[1], p[2]); c.stroke(); }
  c.fillStyle = '#efe6ff'; for (const p of puffs) { circ(c, p[0], p[1], p[2]); c.fill(); }
  c.fillStyle = INK; circ(c, -2, -1, 0.9); c.fill(); circ(c, 2, -1, 0.9); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.8; circ(c, 0, 2.4, 1.2); c.stroke();
  c.restore();
}

/* Платформи: листяна гілка, що падає, і кошик із кульками */
function drawCrumble(c, m, t, theme) {
  if (m.state === 'gone') return;
  const shake = m.state === 'shake' ? Math.sin(t * 60) * 1.2 : 0;
  c.save(); c.translate(m.x + shake, m.y);
  if (m.state === 'fall') { c.translate(m.w / 2, 6); c.rotate(Math.min(0.35, m.st * 0.5)); c.translate(-m.w / 2, -6); }
  c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  if (theme === 'tower') {
    c.fillStyle = '#e6a9bf'; rr(c, 0, 1, m.w, 11, 3); c.fill(); c.stroke();
    c.strokeStyle = '#a85d7a'; c.lineWidth = 1; c.beginPath(); c.moveTo(m.w * 0.3, 1); c.lineTo(m.w * 0.36, 6); c.lineTo(m.w * 0.3, 12); c.moveTo(m.w * 0.7, 1); c.lineTo(m.w * 0.64, 7); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(3, 2.5, m.w - 6, 1.4);
  } else if (theme === 'snow') {
    c.fillStyle = '#c7ecff'; rr(c, 0, 1, m.w, 11, 4); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; rr(c, 1, 0, m.w - 2, 4, 2); c.fill();
    c.strokeStyle = '#7fb8e6'; c.lineWidth = 1; c.beginPath(); c.moveTo(m.w * 0.35, 4); c.lineTo(m.w * 0.42, 8); c.lineTo(m.w * 0.36, 12); c.moveTo(m.w * 0.7, 4); c.lineTo(m.w * 0.64, 9); c.stroke();
    c.fillStyle = '#ffffff'; for (let x = 4; x < m.w - 2; x += 9) { c.beginPath(); c.moveTo(x, 12); c.lineTo(x + 3, 12); c.lineTo(x + 1.5, 16); c.closePath(); c.fill(); }
  } else {
    c.fillStyle = '#8a5a3a'; rr(c, 0, 4, m.w, 7, 3.5); c.fill(); c.stroke();
    c.lineWidth = 0.8;
    const n = Math.max(3, Math.round(m.w / 7));
    for (let i = 0; i < n; i++) { c.fillStyle = LEAF_COLS[i % 4]; ell(c, 4 + i * (m.w - 8) / (n - 1), 3 + (i % 2), 4.2, 2.2, (i % 2 ? 0.5 : -0.5)); c.fill(); c.stroke(); }
  }
  c.restore();
}
function drawBalloonLift(c, m, t) {
  if (m.state === 'gone') return;
  const cx = m.x + m.w / 2, sway = Math.sin(t * 2 + m.bx) * 1.5;
  c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = 'rgba(59,31,79,.6)'; c.lineWidth = 0.8;
  const bs = [[-9, -34, '#ff5c8a'], [0, -44, '#ffd23f'], [9, -34, '#4cb6ff']];
  c.beginPath(); for (const b of bs) { c.moveTo(cx + b[0] * 0.3, m.y - 1); c.lineTo(cx + b[0] + sway, m.y + b[1] + 10); } c.stroke();
  for (const b of bs) {
    const bx = cx + b[0] + sway, by = m.y + b[1];
    c.fillStyle = b[2]; c.strokeStyle = INK; c.lineWidth = 1; ell(c, bx, by, 7.5, 9.5); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, bx - 2.6, by - 3.5, 2, 3, 0.4); c.fill();
    c.fillStyle = b[2]; c.beginPath(); c.moveTo(bx - 1.6, by + 10.5); c.lineTo(bx, by + 9); c.lineTo(bx + 1.6, by + 10.5); c.closePath(); c.fill();
  }
  c.fillStyle = '#c98d4a'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, m.x + 4, m.y + 1, m.w - 8, 11, 3); c.fill(); c.stroke();
  c.strokeStyle = '#9a6a35'; c.lineWidth = 0.9; c.beginPath();
  for (let x = m.x + 9; x < m.x + m.w - 5; x += 5) { c.moveTo(x, m.y + 2); c.lineTo(x, m.y + 11); }
  c.stroke();
  c.fillStyle = '#a8743f'; c.strokeStyle = INK; rr(c, m.x + 2, m.y - 1, m.w - 4, 3.6, 1.5); c.fill(); c.stroke();
}
function drawBelt(c, b, t) {
  const x = b.x, y = b.y, w = b.w;
  c.save(); c.lineJoin = 'round';
  c.fillStyle = '#5b5470'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, x, y + 0.5, w, T - 1, 9); c.fill(); c.stroke();
  c.save(); rr(c, x + 2, y + 2, w - 4, 7, 3.5); c.clip();
  c.fillStyle = '#8a82a6'; c.fillRect(x, y, w, 10);
  c.strokeStyle = '#ffd86b'; c.lineWidth = 1.8;
  const off = ((t * 70 * b.dir) % 14 + 14) % 14;
  for (let px = x - 14 + off; px < x + w + 14; px += 14) { c.beginPath(); c.moveTo(px - b.dir * 2.5, y + 3); c.lineTo(px + b.dir * 1.5, y + 5.5); c.lineTo(px - b.dir * 2.5, y + 8); c.stroke(); }
  c.restore();
  for (const rx of [x + 10, x + w - 10]) {
    c.fillStyle = '#c9c3e6'; c.strokeStyle = INK; c.lineWidth = 1; circ(c, rx, y + 15.5, 5.5); c.fill(); c.stroke();
    c.save(); c.translate(rx, y + 15.5); c.rotate(t * 6 * b.dir); c.beginPath(); c.moveTo(-4, 0); c.lineTo(4, 0); c.moveTo(0, -4); c.lineTo(0, 4); c.stroke(); c.restore();
  }
  c.restore();
}
function drawWind(c, z, t, theme) {
  const w = z.x1 - z.x0, cx = (z.x0 + z.x1) / 2, bottom = Math.min(z.y1, VIEW_H);
  c.save(); c.lineCap = 'round';
  if (theme === 'desert') {
    for (let i = 0; i <= 14; i++) {
      const k = i / 14, y = bottom - k * (bottom - z.y), rx = 5 + k * w * 0.44, off = Math.sin(t * 5 + i * 0.7) * 4;
      c.strokeStyle = `rgba(214,160,90,${0.6 - k * 0.3})`; c.lineWidth = 3; c.beginPath(); c.ellipse(cx + off, y, rx, rx * 0.22, 0, 0, TAU); c.stroke();
    }
  }
  c.strokeStyle = theme === 'desert' ? 'rgba(255,240,210,.75)' : 'rgba(255,255,255,.65)'; c.lineWidth = 1.6;
  const span = bottom - z.y;
  for (let k = 0; k < 6; k++) { const sx = z.x0 + (k + 0.5) * w / 6 + Math.sin(t * 3 + k) * 3, sy = bottom - ((t * 170 + k * 47) % span); c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx, sy - 12); c.stroke(); }
  if (z.fanY != null) {
    const fy = z.fanY;
    c.fillStyle = '#8a7bb3'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, cx - 18, fy - 4, 36, 12, 4); c.fill(); c.stroke();
    c.save(); c.translate(cx, fy - 4); c.scale(1, 0.35);
    for (let i = 0; i < 3; i++) { const a = t * 18 + i * TAU / 3; c.fillStyle = '#c9c3e6'; ell(c, Math.cos(a) * 9, Math.sin(a) * 9, 9, 3.6, a); c.fill(); c.stroke(); }
    c.restore();
    c.fillStyle = '#ffd86b'; circ(c, cx, fy - 4, 2.4); c.fill();
  }
  c.restore();
}

/* Дракон Чхун. st: sleep | takeoff | fly | land | inhale | sneeze | tired | happy */
function drawDragonBoss(c, x, y, t, st, dir, flash, stT) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const body = flash ? '#ffffff' : '#9b7bff', wingCol = flash ? '#eeeeee' : '#c9b6ff';
  const fly = st === 'fly' || st === 'takeoff', flap = fly ? Math.sin(t * 9) : -0.3;
  const puff = st === 'inhale' ? Math.min(1, stT / 1.2) : 0;
  const wing = (wx, wy, sc) => {
    c.save(); c.translate(wx, wy); c.rotate(-0.5 + flap * 0.6); c.scale(sc, sc);
    c.fillStyle = wingCol; c.strokeStyle = INK; c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-6, -22, -26, -26); c.quadraticCurveTo(-20, -18, -24, -12); c.quadraticCurveTo(-16, -12, -16, -4); c.quadraticCurveTo(-8, -6, 0, 0); c.closePath(); c.fill(); c.stroke();
    c.restore();
  };
  // хвіст
  const tailPath = () => { c.beginPath(); c.moveTo(-20, 8); c.quadraticCurveTo(-40, 14, -46, 0 + Math.sin(t * 3) * 4); };
  c.strokeStyle = INK; c.lineWidth = 10; tailPath(); c.stroke();
  c.strokeStyle = body; c.lineWidth = 7; tailPath(); c.stroke();
  c.fillStyle = '#ff7ab8'; c.strokeStyle = INK; c.lineWidth = 1;
  const ty = Math.sin(t * 3) * 4;
  c.beginPath(); c.moveTo(-44, ty - 1); c.lineTo(-54, ty - 8); c.lineTo(-52, ty + 4); c.closePath(); c.fill(); c.stroke();
  wing(-4, -12, 0.9);
  if (!fly) { c.fillStyle = body; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, -16, 14, 9, 11, 4); c.fill(); c.stroke(); rr(c, 6, 14, 9, 11, 4); c.fill(); c.stroke(); }
  c.fillStyle = body; c.strokeStyle = INK; c.lineWidth = 1.4; ell(c, 0, 4, 26, 21); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#ffe9b8'; ell(c, 7, 9, 14, 13); c.fill();
  c.strokeStyle = '#e8c98a'; c.lineWidth = 1.2; c.beginPath(); for (const yy of [3, 9, 15]) { c.moveTo(-3, yy); c.lineTo(17, yy); } c.stroke();
  // шарф
  c.fillStyle = '#5fd3b8'; c.strokeStyle = INK; c.lineWidth = 1.1;
  c.save(); c.translate(14, -8); c.rotate(0.35); rr(c, -11, -4, 22, 8, 4); c.fill(); c.stroke();
  c.fillStyle = '#ff7ab8'; c.fillRect(-6, -4, 3, 8); c.fillRect(2, -4, 3, 8); c.restore();
  c.fillStyle = '#5fd3b8'; c.save(); c.translate(9, -7); c.rotate(1.0 + Math.sin(t * 4) * 0.15); rr(c, -3, 0, 6, 15, 2.5); c.fill(); c.stroke(); c.fillStyle = '#ff7ab8'; c.fillRect(-3, 5, 6, 3); c.restore();
  // голова
  c.save(); c.translate(24, -18); c.scale(1 + puff * 0.15, 1 + puff * 0.15);
  c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1;
  c.beginPath(); c.moveTo(-8, -10); c.lineTo(-10, -20); c.lineTo(-3, -13); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(1, -13); c.lineTo(2, -23); c.lineTo(6, -13); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = body; c.lineWidth = 1.3; circ(c, 0, 0, 15); c.fill(); c.stroke();
  c.fillStyle = body; ell(c, 13, 5, 11 + puff * 2, 8.5 + puff * 2); c.fill(); c.stroke();
  if (puff > 0) { c.fillStyle = 'rgba(255,150,190,.55)'; circ(c, 9, 9, 4 + puff * 2); c.fill(); }
  const nose = st === 'happy' ? '#ff9fcb' : '#ff5c7a';
  if (st === 'inhale') { const g = c.createRadialGradient(22, 3, 0, 22, 3, 9); g.addColorStop(0, 'rgba(255,120,150,.8)'); g.addColorStop(1, 'rgba(255,120,150,0)'); c.fillStyle = g; circ(c, 22, 3, 9); c.fill(); }
  c.fillStyle = nose; circ(c, 22, 3, 3.6); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 17, 6, 0.9); c.fill();
  c.lineWidth = 1.1;
  if (st === 'sleep') { c.beginPath(); c.arc(2, -2, 3, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); }
  else if (st === 'inhale') { c.beginPath(); c.moveTo(-1, -4); c.lineTo(4, -2); c.lineTo(-1, 0); c.stroke(); }
  else if (st === 'tired') { c.beginPath(); c.moveTo(-1, -1); c.lineTo(5, -1); c.stroke(); c.fillStyle = INK; ell(c, 2, 0.5, 2.4, 1.2); c.fill(); }
  else if (st === 'happy') { c.beginPath(); c.arc(2, -1, 3, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); c.fillStyle = 'rgba(255,120,180,.55)'; circ(c, 6, 6, 3); c.fill(); }
  else { c.fillStyle = '#fff'; circ(c, 2, -2, 4); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 3.2, -1.6, 2); c.fill(); c.fillStyle = '#fff'; circ(c, 3.8, -2.4, 0.7); c.fill(); }
  c.strokeStyle = INK; c.lineWidth = 1.1;
  if (st === 'sneeze') { c.fillStyle = '#7a3b5a'; ell(c, 15, 11, 5, 4); c.fill(); c.stroke(); }
  else if (st === 'happy') { c.beginPath(); c.arc(13, 9, 4, 0.1 * Math.PI, 0.8 * Math.PI); c.stroke(); }
  else if (st === 'tired') { c.beginPath(); c.moveTo(10, 11); c.quadraticCurveTo(14, 13, 18, 11); c.stroke(); c.fillStyle = '#ff9fcb'; ell(c, 15, 13, 2, 2.4); c.fill(); }
  else { c.beginPath(); c.moveTo(9, 11); c.quadraticCurveTo(13, 12, 17, 10); c.stroke(); }
  c.restore();
  wing(4, -10, 1.05);
  c.restore();
  // написи над драконом
  c.save(); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
  if (st === 'inhale') {
    c.font = '900 12px Nunito, system-ui, sans-serif'; const txt = 'А' + '-а'.repeat(1 + Math.floor(stT * 3) % 3) + '...';
    c.lineWidth = 3; c.strokeStyle = '#fff'; c.strokeText(txt, x + dir * 20, y - 52); c.fillStyle = '#7a5ad9'; c.fillText(txt, x + dir * 20, y - 52);
  } else if (st === 'sleep') {
    c.font = '800 11px Nunito, system-ui, sans-serif'; c.globalAlpha = 0.65; c.fillStyle = INK;
    c.fillText('z', x + dir * 34, y - 40 - (t * 6) % 8); c.fillText('Z', x + dir * 42, y - 52 - (t * 6) % 8); c.globalAlpha = 1;
  } else if (st === 'tired') {
    c.fillStyle = '#7fd6ff'; c.strokeStyle = INK; c.lineWidth = 0.8;
    const sx = x + dir * 10, sy = y - 38 + (t * 10) % 6;
    c.beginPath(); c.moveTo(sx, sy - 5); c.quadraticCurveTo(sx + 3.5, sy, sx, sy + 2.5); c.quadraticCurveTo(sx - 3.5, sy, sx, sy - 5); c.fill(); c.stroke();
  } else if (st === 'happy') {
    for (let i = 0; i < 3; i++) { const hy = y - 40 - ((t * 20 + i * 12) % 30); c.globalAlpha = 1 - ((t * 20 + i * 12) % 30) / 30; c.fillStyle = '#ff7ab8'; heartPath(c, x + dir * (14 + i * 9), hy, 8); c.fill(); }
    c.globalAlpha = 1;
  }
  c.restore();
}

/* Декор третьої частини */
function drawDecor3(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'leafpile':
      for (let i = 0; i < 6; i++) { c.fillStyle = LEAF_COLS[(i + Math.round(x)) % 4]; ell(c, x - 7 + i * 2.8, y - 2 - (i % 3) * 1.6, 3.6, 1.8, (i % 2 ? 0.5 : -0.4)); c.fill(); c.stroke(); }
      break;
    case 'pumpkin':
      c.fillStyle = '#ff8a3d'; ell(c, x - 3, y - 5, 4, 5); c.fill(); c.stroke(); ell(c, x + 3, y - 5, 4, 5); c.fill(); c.stroke(); ell(c, x, y - 5, 4, 5.4); c.fill(); c.stroke();
      c.fillStyle = '#3f9e4f'; c.fillRect(x - 0.8, y - 12.5, 1.6, 3); break;
    case 'ball':
      c.fillStyle = '#fff'; circ(c, x, y - 6, 6); c.fill(); c.stroke();
      c.save(); circ(c, x, y - 6, 6); c.clip(); c.fillStyle = '#ff5c8a'; c.fillRect(x - 6, y - 12, 4, 12); c.fillStyle = '#4cb6ff'; c.fillRect(x + 2, y - 12, 4, 12); c.restore();
      circ(c, x, y - 6, 6); c.stroke(); break;
    case 'duck':
      c.fillStyle = '#ffd23f'; ell(c, x, y - 4, 6.5, 4); c.fill(); c.stroke(); circ(c, x + 4, y - 10, 3.6); c.fill(); c.stroke();
      c.fillStyle = '#ff8a3d'; ell(c, x + 8, y - 9.5, 2.4, 1.2); c.fill(); c.fillStyle = INK; circ(c, x + 5, y - 11, 0.7); c.fill(); break;
    case 'cactusS':
      c.fillStyle = '#6fcf7a'; rr(c, x - 2.5, y - 12, 5, 12, 2.5); c.fill(); c.stroke(); rr(c, x - 7, y - 9, 4, 6, 2); c.fill(); c.stroke();
      c.fillStyle = '#ff9fcb'; circ(c, x, y - 12.5, 1.6); c.fill(); break;
    case 'tuft':
      c.strokeStyle = '#c9a05a'; c.lineWidth = 1.4; c.beginPath();
      for (let i = -2; i <= 2; i++) { c.moveTo(x + i * 1.5, y); c.lineTo(x + i * 3 + Math.sin(t * 2 + i) * 0.8, y - 7 - (2 - Math.abs(i)) * 2); }
      c.stroke(); break;
    default: drawDecor5(c, d, t);
  }
}

/* Фони третьої частини */
const hillY = (base, amp, freq, phase, wx) => base + Math.sin(wx * freq + phase) * amp + Math.sin(wx * freq * 2.7 + phase * 2) * amp * 0.35;
function bgAutumn(c, viewW, camX, t) {
  const sx = viewW * 0.25, sg = c.createRadialGradient(sx, 70, 4, sx, 70, 60);
  sg.addColorStop(0, 'rgba(255,245,200,1)'); sg.addColorStop(0.35, 'rgba(255,220,160,.8)'); sg.addColorStop(1, 'rgba(255,220,160,0)');
  c.fillStyle = sg; circ(c, sx, 70, 60); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.14 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 20, 0.9, 'rgba(255,250,240,.85)'); }
  const off = camX * 0.18;
  hill(c, viewW, 170, 12, 0.012, 0.8, off, '#f2c18c');
  for (let i = 0; i < 10; i++) {
    const x = wrapX(i * 90 - off, viewW + 120) - 60, y = hillY(170, 12, 0.012, 0.8, x + off) + 4;
    c.fillStyle = '#9a6a45'; c.fillRect(x - 2, y - 18, 4, 18);
    c.fillStyle = LEAF_COLS[i % 4]; circ(c, x, y - 26, 12); c.fill(); circ(c, x - 9, y - 19, 9); c.fill(); circ(c, x + 9, y - 19, 9); c.fill();
  }
  hill(c, viewW, 206, 9, 0.02, 2.0, camX * 0.38, '#e6a86a');
  for (let i = 0; i < 18; i++) {
    const x = wrapX(i * 67 + t * 25 - camX * 0.6, viewW + 40) - 20, y = wrapX(i * 41 + t * (30 + (i % 4) * 8), VIEW_H);
    c.fillStyle = LEAF_COLS[i % 4]; ell(c, x, y, 3, 1.6, t * 2 + i); c.fill();
  }
}
function drawHotAir(c, x, y, s, c1, c2) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.beginPath(); c.moveTo(0, -26); c.bezierCurveTo(18, -26, 20, -4, 6, 10); c.lineTo(-6, 10); c.bezierCurveTo(-20, -4, -18, -26, 0, -26); c.closePath();
  c.fillStyle = c1; c.fill(); c.save(); c.clip(); c.fillStyle = c2; ell(c, 0, -8, 6, 22); c.fill(); c.restore();
  c.strokeStyle = 'rgba(59,31,79,.5)'; c.lineWidth = 1; c.beginPath(); c.moveTo(-6, 10); c.lineTo(-4, 18); c.moveTo(6, 10); c.lineTo(4, 18); c.stroke();
  c.fillStyle = '#a8743f'; rr(c, -5, 18, 10, 7, 1.5); c.fill();
  c.restore();
}
function bgBalloons(c, viewW, camX, t) {
  const sx = viewW * 0.8, sg = c.createRadialGradient(sx, 46, 4, sx, 46, 54);
  sg.addColorStop(0, 'rgba(255,252,220,1)'); sg.addColorStop(0.35, 'rgba(255,240,180,.8)'); sg.addColorStop(1, 'rgba(255,240,180,0)');
  c.fillStyle = sg; circ(c, sx, 46, 54); c.fill();
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 170 - camX * 0.15 + t * 5, viewW + 220) - 110; puffCloud(c, x, 34 + (i % 3) * 24, 0.85 + (i % 2) * 0.3, 'rgba(255,255,255,.9)'); }
  const cols = [['#ff5c8a', '#ffd23f'], ['#4cb6ff', '#ffffff'], ['#a67bff', '#ffb3e6'], ['#54d68c', '#fff3a0'], ['#ffa83b', '#ff5c8a']];
  for (let i = 0; i < 5; i++) {
    const f = 0.08 + (i % 3) * 0.06, x = wrapX(i * 210 + 60 - camX * f, viewW + 160) - 80, y = 60 + (i % 3) * 34 + Math.sin(t * 0.8 + i) * 6;
    drawHotAir(c, x, y, 0.7 + (i % 3) * 0.25, cols[i][0], cols[i][1]);
  }
  hill(c, viewW, 198, 10, 0.014, 0.6, camX * 0.22, '#bfe9a8');
  hill(c, viewW, 216, 8, 0.022, 1.8, camX * 0.42, '#9fdd8a');
}
function bgToys(c, viewW, camX, t) {
  c.fillStyle = 'rgba(255,190,215,.3)';
  const ws = 36, wo = wrapX(-camX * 0.1, ws);
  for (let x = -ws + wo; x < viewW + ws; x += ws) c.fillRect(x, 0, 18, VIEW_H);
  for (let i = 0; i < 24; i++) { const x = wrapX(i * 53 - camX * 0.1, viewW + 40) - 20, y = 18 + (i * 37) % 170; sparkle(c, x, y, 1.6, 'rgba(255,200,90,.55)'); }
  const span = 560;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.08, span) + 60;
    const g = c.createLinearGradient(0, 30, 0, 120); g.addColorStop(0, '#bfe6ff'); g.addColorStop(1, '#eaf7ff');
    c.fillStyle = '#ffffff'; rr(c, wx - 6, 24, 132, 102, 8); c.fill();
    c.fillStyle = g; rr(c, wx, 30, 120, 90, 4); c.fill();
    puffCloud(c, wx + 40 + Math.sin(t * 0.3) * 10, 62, 0.8, 'rgba(255,255,255,.95)');
    c.fillStyle = '#ffffff'; c.fillRect(wx + 58, 30, 4, 90); c.fillRect(wx, 73, 120, 4);
    c.fillStyle = 'rgba(255,150,190,.75)'; rr(c, wx - 16, 20, 22, 112, 8); c.fill(); rr(c, wx + 114, 20, 22, 112, 8); c.fill();
  }
  const sspan = 330;
  for (let i = -1; i < viewW / sspan + 2; i++) {
    const wx = i * sspan + wrapX(-camX * 0.22, sspan);
    c.fillStyle = '#c98d55'; rr(c, wx - 70, 150, 160, 8, 3); c.fill();
    c.fillStyle = '#ff7ab8'; rr(c, wx - 60, 128, 22, 22, 3); c.fill(); c.fillStyle = '#7fd6ff'; rr(c, wx - 36, 134, 16, 16, 3); c.fill();
    c.fillStyle = '#fff'; c.font = '900 14px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('А', wx - 49, 140); c.font = '900 10px Nunito, system-ui, sans-serif'; c.fillText('Б', wx - 28, 143);
    c.fillStyle = '#a8744f'; circ(c, wx + 20, 138, 11); c.fill(); circ(c, wx + 12, 126, 5); c.fill(); circ(c, wx + 28, 126, 5); c.fill(); circ(c, wx + 20, 124, 8); c.fill();
    c.fillStyle = '#ffd23f'; circ(c, wx + 56, 141, 9); c.fill(); c.fillStyle = '#ff5c8a'; c.fillRect(wx + 53, 132, 6, 18);
  }
  c.fillStyle = '#f7e3cf'; c.fillRect(0, 206, viewW + 1, VIEW_H);
  c.fillStyle = '#e8c9a8'; c.fillRect(0, 204, viewW + 1, 5);
}
function bgDesert(c, viewW, camX, t) {
  const sx = viewW * 0.7, sg = c.createRadialGradient(sx, 60, 6, sx, 60, 74);
  sg.addColorStop(0, 'rgba(255,255,235,1)'); sg.addColorStop(0.35, 'rgba(255,240,180,.85)'); sg.addColorStop(1, 'rgba(255,240,180,0)');
  c.fillStyle = sg; circ(c, sx, 60, 74); c.fill();
  const span = 380;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.1, span);
    for (const [dx, h, w] of [[0, 104, 92], [130, 70, 62]]) {
      c.fillStyle = '#f0c27a'; c.beginPath(); c.moveTo(wx + dx - w, 214); c.lineTo(wx + dx, 214 - h); c.lineTo(wx + dx + w, 214); c.closePath(); c.fill();
      c.fillStyle = '#d9a35e'; c.beginPath(); c.moveTo(wx + dx, 214 - h); c.lineTo(wx + dx + w, 214); c.lineTo(wx + dx + w * 0.25, 214); c.closePath(); c.fill();
    }
  }
  const off = camX * 0.25;
  hill(c, viewW, 196, 12, 0.014, 1.0, off, '#f5cf8a');
  for (let i = 0; i < 6; i++) {
    const x = wrapX(i * 150 + 40 - off, viewW + 120) - 60, y = hillY(196, 12, 0.014, 1.0, x + off) + 3;
    c.fillStyle = '#8fb36a'; rr(c, x - 3, y - 26, 6, 26, 3); c.fill(); rr(c, x - 10, y - 20, 4, 10, 2); c.fill(); rr(c, x - 10, y - 13, 8, 3, 1.5); c.fill(); rr(c, x + 6, y - 22, 4, 9, 2); c.fill(); rr(c, x + 2, y - 15, 8, 3, 1.5); c.fill();
  }
  hill(c, viewW, 218, 8, 0.022, 2.2, camX * 0.45, '#eebd73');
}
function bgTower(c, viewW, camX, t) {
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 170 - camX * 0.12 + t * 5, viewW + 240) - 120; puffCloud(c, x, 36 + (i % 3) * 22, 1 + (i % 2) * 0.3, 'rgba(255,235,242,.85)'); }
  hill(c, viewW, 182, 22, 0.009, 0.5, camX * 0.1, '#d9a0c4');
  const span = 560;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.14, span) + 140;
    c.fillStyle = '#b8718c'; c.fillRect(wx - 26, 70, 52, 170);
    c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 1;
    for (let y = 80; y < 240; y += 12) { c.beginPath(); c.moveTo(wx - 26, y); c.lineTo(wx + 26, y); c.stroke(); }
    c.fillStyle = '#7a5ad9'; c.beginPath(); c.moveTo(wx - 34, 72); c.lineTo(wx, 22); c.lineTo(wx + 34, 72); c.closePath(); c.fill();
    c.strokeStyle = '#5b4a85'; c.lineWidth = 2; c.beginPath(); c.moveTo(wx, 22); c.lineTo(wx, 4); c.stroke();
    c.fillStyle = '#5fd3b8'; c.beginPath(); c.moveTo(wx, 4); c.quadraticCurveTo(wx + 12, 6 + Math.sin(t * 4) * 2, wx + 20, 6); c.lineTo(wx + 20, 14); c.quadraticCurveTo(wx + 12, 14 + Math.sin(t * 4) * 2, wx, 12); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,214,110,.85)'; for (const [dx, dy] of [[-12, 96], [8, 120], [-10, 150], [10, 182]]) { rr(c, wx + dx, dy, 7, 11, 3.5); c.fill(); }
  }
  hill(c, viewW, 212, 9, 0.02, 1.2, camX * 0.35, '#e3a2bd');
}
