'use strict';
/* ===== Частина 6: музика, цирк, динозаврики, сніжне містечко, фабрика Робота Брязкала ===== */

function noteShape(c, x, y, s, col) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = col; c.strokeStyle = col; c.lineWidth = 1.8; c.lineCap = 'round';
  ell(c, -2, 4, 3.4, 2.5, -0.4); c.fill();
  c.beginPath(); c.moveTo(1.2, 3.4); c.lineTo(1.2, -7); c.quadraticCurveTo(5, -5, 5.5, -1.5); c.stroke();
  c.restore();
}
function drawNoteE(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y + Math.sin(t * 6) * 1.2); c.scale(dir, 1); c.rotate(Math.sin(t * 4) * 0.12); c.lineJoin = 'round'; c.lineCap = 'round';
  const col = flash ? '#fff' : '#7a5ad9';
  c.strokeStyle = INK; c.lineWidth = 4.4; c.beginPath(); c.moveTo(4, 4); c.lineTo(4, -12); c.quadraticCurveTo(11, -9, 11, -2); c.stroke();
  c.strokeStyle = col; c.lineWidth = 2.6; c.stroke();
  c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 1.2; ell(c, -1, 5, 7, 5.4, -0.35); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, -3.4, 4, 1.8); c.fill(); circ(c, 1.4, 3, 1.8); c.fill();
  c.fillStyle = INK; circ(c, -2.8, 4.3, 0.9); c.fill(); circ(c, 2, 3.3, 0.9); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.9; c.beginPath(); c.moveTo(-5.4, 1.4); c.lineTo(-2, 2.2); c.moveTo(3.4, 0.4); c.lineTo(0.4, 1.4); c.stroke();
  c.beginPath(); c.arc(-0.8, 7.6, 1.6, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke();
  c.restore();
}
function drawBouncer(c, x, gy, t, flash, vy, onGround) {
  const sq = onGround ? 0.82 : Math.max(0.9, Math.min(1.12, 1 + Math.abs(vy) / 2600));
  c.save(); c.translate(x, gy); c.scale(1 / sq, sq); c.lineJoin = 'round';
  const r = 10, cy = -r;
  c.save(); circ(c, 0, cy, r); c.clip();
  c.fillStyle = flash ? '#fff' : '#fffaf2'; c.fillRect(-r, cy - r, r * 2, r * 2);
  if (!flash) { const rot = t * 3; for (let i = 0; i < 3; i++) { c.fillStyle = ['#ff4f6d', '#ffd23f', '#4cb6ff'][i]; c.beginPath(); c.moveTo(0, cy); c.arc(0, cy, r + 1, rot + i * TAU / 3, rot + i * TAU / 3 + TAU / 6); c.closePath(); c.fill(); } }
  c.restore();
  c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, 0, cy, r); c.stroke();
  c.fillStyle = '#fff'; rr(c, -6, cy - 5, 12, 7, 3.5); c.fill(); c.lineWidth = 0.8; c.stroke();
  c.fillStyle = INK; circ(c, -2.6, cy - 1.6, 1.3); c.fill(); circ(c, 2.6, cy - 1.6, 1.3); c.fill();
  c.lineWidth = 0.9; c.beginPath(); c.moveTo(-5, cy - 4.6); c.lineTo(-1.4, cy - 3.6); c.moveTo(5, cy - 4.6); c.lineTo(1.4, cy - 3.6); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.7)'; ell(c, -5, cy - 6, 2.4, 1.2, -0.6); c.fill();
  c.restore();
}
function drawDino(c, x, gy, dir, t, flash, hurt) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const step = Math.sin(t * 9), body = flash ? '#fff' : hurt ? '#ffb347' : '#7fd46a', belly = flash ? '#fff' : '#e9f7b0';
  c.strokeStyle = INK; c.lineWidth = 1.1;
  c.fillStyle = body; rr(c, -7 + step * 1.5, -7, 5, 7, 2); c.fill(); c.stroke(); rr(c, 2 - step * 1.5, -7, 5, 7, 2); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-6, -10); c.quadraticCurveTo(-16, -8, -18, -3 + Math.sin(t * 5) * 1.5); c.quadraticCurveTo(-12, -6, -4, -5); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ff9fcb'; for (const [px, py] of [[-8, -15], [-3, -18], [2, -18]]) { c.beginPath(); c.moveTo(px - 2.6, py + 2.4); c.quadraticCurveTo(px, py - 3.4, px + 2.6, py + 2.4); c.closePath(); c.fill(); c.stroke(); }
  c.fillStyle = body; ell(c, -1, -10, 9, 7); c.fill(); c.stroke();
  c.fillStyle = belly; ell(c, 1, -8, 5, 4.4); c.fill();
  ell(c, 8, -17, 7, 5.6); c.fillStyle = body; c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 9, -19, 2.4); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 9.8, -19, 1.2); c.fill();
  c.fillStyle = INK; circ(c, 13.5, -17, 0.6); c.fill();
  c.beginPath(); c.arc(10.5, -15.4, 2, 0.1 * Math.PI, 0.8 * Math.PI); c.stroke();
  c.fillStyle = 'rgba(255,110,170,.45)'; circ(c, 6, -15, 1.6); c.fill();
  c.restore();
}
function drawPtero(c, x, y, t, dir, flash, hang) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const f = Math.sin(t * (hang ? 6 : 13)), body = flash ? '#fff' : '#b48cff', wing = flash ? '#fff' : '#d6c4ff';
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = wing;
  c.beginPath(); c.moveTo(-2, -1); c.quadraticCurveTo(-10, -10 - f * 6, -16, -4 - f * 7); c.quadraticCurveTo(-10, -1, -2, 3); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(2, -1); c.quadraticCurveTo(10, -10 - f * 6, 16, -4 - f * 7); c.quadraticCurveTo(10, -1, 2, 3); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = body; ell(c, 0, 1, 5, 4.4); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(3, -4); c.lineTo(-5, -9); c.lineTo(1, -2); c.closePath(); c.fill(); c.stroke();
  circ(c, 4, -3, 4); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(7, -4); c.lineTo(14, -2); c.lineTo(7, -0.4); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 4.6, -4, 1.7); c.fill(); c.fillStyle = INK; circ(c, 5.1, -4, 0.9); c.fill();
  c.restore();
}
function drawSnowman(c, x, gy, dir, t, throwing, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const w = flash ? '#fff' : '#fbfdff';
  c.strokeStyle = '#8a5a3a'; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(-6, -15); c.lineTo(-13, -19); c.moveTo(-11, -18); c.lineTo(-12, -22);
  if (throwing) { c.moveTo(5, -16); c.lineTo(9, -26); } else { c.moveTo(6, -15); c.lineTo(13, -12); } c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.1; c.fillStyle = w;
  circ(c, 0, -8, 8); c.fill(); c.stroke(); circ(c, 0, -20, 6.4); c.fill(); c.stroke();
  c.fillStyle = '#ff5c7a'; rr(c, -6, -15.6, 12, 3, 1.5); c.fill(); c.stroke(); rr(c, -5, -15, 3, 7, 1.5); c.fill(); c.stroke();
  c.fillStyle = '#3a3448'; rr(c, -5.6, -27.6, 11.2, 2.4, 1); c.fill(); rr(c, -3.8, -33, 7.6, 6, 1.4); c.fill();
  c.fillStyle = '#4cb6ff'; c.fillRect(-3.8, -28.8, 7.6, 1.6);
  c.fillStyle = INK; circ(c, -1.6, -21.6, 0.9); c.fill(); circ(c, 2.6, -21.6, 0.9); c.fill();
  c.fillStyle = '#ff8a3d'; c.beginPath(); c.moveTo(1, -20); c.lineTo(8, -19); c.lineTo(1, -18.4); c.closePath(); c.fill();
  c.fillStyle = INK; for (const yy of [-10, -6]) { circ(c, 0, yy, 0.9); c.fill(); }
  c.lineWidth = 0.8; c.beginPath(); c.arc(0.6, -17.6, 2, 0.15 * Math.PI, 0.8 * Math.PI); c.stroke();
  c.restore();
}
function drawPenguin(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.rotate(Math.sin(t * 12) * 0.08); c.lineJoin = 'round';
  const dark = flash ? '#fff' : '#3d4a7a';
  c.strokeStyle = INK; c.lineWidth = 1.1;
  c.fillStyle = '#ff9a3d'; ell(c, -3, -1, 3.4, 1.6); c.fill(); c.stroke(); ell(c, 4, -1, 3.4, 1.6); c.fill(); c.stroke();
  c.fillStyle = dark; ell(c, 0, -10, 8, 10); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#ffffff'; ell(c, 2, -8.6, 5, 7.4); c.fill();
  c.fillStyle = dark; ell(c, -7, -9, 2.6, 6, 0.4); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 3, -14, 2); c.fill(); c.fillStyle = INK; circ(c, 3.6, -14, 1); c.fill();
  c.fillStyle = '#ff9a3d'; c.beginPath(); c.moveTo(6, -13); c.lineTo(11, -12); c.lineTo(6, -10.6); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ff5c7a'; rr(c, -7, -19.4, 14, 3, 1.5); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,110,170,.5)'; circ(c, 6, -10, 1.4); c.fill();
  c.restore();
}
function drawSnowball(c, x, y) { c.save(); c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1; circ(c, x, y, 4.6); c.fill(); c.stroke(); c.fillStyle = '#d6e4ff'; circ(c, x + 1.4, y + 1.4, 1.6); c.fill(); c.restore(); }
function gearPath(c, x, y, r, n, rot) {
  c.beginPath();
  for (let i = 0; i < n * 2; i++) { const a = rot + i * Math.PI / n, rr2 = i % 2 ? r * 0.78 : r; c.lineTo(x + Math.cos(a - 0.12) * rr2, y + Math.sin(a - 0.12) * rr2); c.lineTo(x + Math.cos(a + 0.12) * rr2, y + Math.sin(a + 0.12) * rr2); }
  c.closePath();
}
function drawGearBolt(c, x, y, t) {
  c.save(); c.fillStyle = '#ffb347'; c.strokeStyle = INK; c.lineWidth = 1; gearPath(c, x, y, 7, 6, t * 8); c.fill(); c.stroke();
  c.fillStyle = '#fff3d6'; circ(c, x, y, 2.4); c.fill(); c.stroke(); c.restore();
}
function drawWave(c, x, y, t, dir) {
  c.save(); c.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    c.globalAlpha = 0.9 - i * 0.25; c.strokeStyle = i === 0 ? '#ffe14d' : '#fff'; c.lineWidth = 3.4 - i;
    c.beginPath(); c.arc(x - dir * i * 6, y + 7, 9 - i, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
  }
  c.globalAlpha = 1; sparkle(c, x, y - 3, 2 + Math.sin(t * 20), '#fff');
  c.restore();
}

/* Робот Брязкало */
function drawRobot(c, B, t) {
  const st = B.state, flash = B.flash > 0;
  const sq = st === 'crouch' ? 0.84 : st === 'jump' ? 1.08 : st === 'land' ? 0.88 : 1;
  c.save(); c.translate(B.x, B.y + 32); c.scale(B.dir * (2 - sq) * 0.5 + B.dir * 0.5, sq); c.lineJoin = 'round'; c.lineCap = 'round';
  const metal = flash ? '#fff' : '#a8c4e6', dark = flash ? '#fff' : '#6e86b3', pink = flash ? '#fff' : '#ff7ab8';
  c.strokeStyle = INK; c.lineWidth = 1.6;
  // ноги-пружинки
  for (const lx of [-10, 10]) {
    c.strokeStyle = '#7d8aa6'; c.lineWidth = 2.4; c.beginPath(); for (let k = 0; k < 5; k++) c.lineTo(lx + (k % 2 ? 4 : -4), -16 + k * 3); c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = dark; rr(c, lx - 7, -5, 14, 5, 2.5); c.fill(); c.stroke();
  }
  // руки
  const wave = st === 'walk' ? Math.sin(t * 6) * 0.4 : st === 'happy' ? -1.8 + Math.sin(t * 8) * 0.3 : st === 'open' ? 0.6 : 0;
  for (const [ax, s] of [[-23, -1], [23, 1]]) {
    c.save(); c.translate(ax, -36); c.rotate(s * (0.25 + wave * (s > 0 ? 1 : -1)));
    c.fillStyle = metal; rr(c, -3.5, 0, 7, 14, 3.5); c.fill(); c.stroke();
    c.fillStyle = pink; circ(c, 0, 16, 4.4); c.fill(); c.stroke(); c.restore();
  }
  // тулуб
  c.fillStyle = metal; rr(c, -22, -48, 44, 32, 7); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.45)'; rr(c, -19, -45, 6, 22, 3); c.fill();
  for (const [bx, by] of [[-18, -21], [18, -21], [-18, -44], [18, -44]]) { c.fillStyle = dark; circ(c, bx, by, 1.4); c.fill(); }
  // віконце на животі
  const open = st === 'open';
  c.fillStyle = '#3a3448'; rr(c, -10, -42, 20, 18, 4); c.fill(); c.stroke();
  if (open) {
    const pulse = 1 + Math.sin(t * 10) * 0.12;
    const g = c.createRadialGradient(0, -33, 1, 0, -33, 12); g.addColorStop(0, 'rgba(255,240,150,1)'); g.addColorStop(1, 'rgba(255,120,180,0)');
    c.fillStyle = g; circ(c, 0, -33, 12); c.fill();
    c.save(); c.translate(0, -33); c.scale(pulse, pulse); heartPath(c, 0, 0, 13); c.fillStyle = '#ff4f86'; c.fill(); c.lineWidth = 1.2; c.stroke(); c.restore();
    c.fillStyle = dark; c.save(); c.translate(-10, -42); c.rotate(-1.9); rr(c, 0, -20, 18, 20, 4); c.fill(); c.lineWidth = 1.4; c.stroke(); c.restore();
  } else {
    c.fillStyle = dark; rr(c, -10, -42, 20, 18, 4); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; circ(c, 6, -33, 1.6); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-7, -39); c.lineTo(-2, -39); c.stroke();
  }
  // голова
  c.strokeStyle = INK; c.lineWidth = 1.6;
  c.fillStyle = metal; rr(c, -15, -68, 30, 21, 7); c.fill(); c.stroke();
  c.strokeStyle = '#7d8aa6'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -68); c.lineTo(0, -75); c.stroke();
  const bulb = st === 'open' ? '#ff4f86' : st === 'happy' ? '#7dffb0' : (Math.sin(t * 6) > 0 ? '#ffe14d' : '#ffb347');
  c.fillStyle = flash ? '#fff' : bulb; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, 0, -77, 3.6); c.fill(); c.stroke();
  c.fillStyle = '#2a2a48'; rr(c, -12, -64, 24, 13, 5); c.fill();
  c.fillStyle = '#7dffe0';
  if (st === 'happy') { c.strokeStyle = '#7dffe0'; c.lineWidth = 1.8; c.beginPath(); c.arc(-5, -57, 2.6, 1.1 * Math.PI, 1.9 * Math.PI); c.moveTo(7.6, -57); c.arc(5, -57, 2.6, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); }
  else if (st === 'open') { c.strokeStyle = '#7dffe0'; c.lineWidth = 1.5; for (const ex of [-5, 5]) { c.beginPath(); c.moveTo(ex - 2.4, -60); c.lineTo(ex + 2.4, -55); c.moveTo(ex + 2.4, -60); c.lineTo(ex - 2.4, -55); c.stroke(); } }
  else { rr(c, -8, -61, 5, 6, 1.5); c.fill(); rr(c, 3, -61, 5, 6, 1.5); c.fill(); c.fillStyle = '#2a2a48'; c.fillRect(-8, -61, 5, 2); c.fillRect(3, -61, 5, 2); }
  c.fillStyle = 'rgba(255,110,170,.6)'; circ(c, -12, -53, 2); c.fill(); circ(c, 12, -53, 2); c.fill();
  c.restore();
  if (st === 'open') for (let i = 0; i < 3; i++) { const k = (t * 1.2 + i / 3) % 1; c.fillStyle = `rgba(255,255,255,${0.7 * (1 - k)})`; circ(c, B.x + (i - 1) * 12 + Math.sin(t * 3 + i) * 3, B.y - 46 - k * 30, 4 + k * 6); c.fill(); }
  if (st === 'happy') for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 16, B.y - 50 - k * 34, 9); c.fillStyle = '#ff7ab8'; c.fill(); c.restore(); }
}

/* Гармата-катапульта в цирку */
function drawLauncher(c, L, t) {
  const shake = L.state === 'load' ? Math.sin(t * 50) * 1.2 : 0;
  c.save(); c.translate(L.x + shake, L.gy); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.4;
  c.save(); c.translate(-2, -14); c.rotate(-0.62);
  c.fillStyle = '#ff5c7a'; rr(c, -8, -9, 34, 18, 6); c.fill(); c.stroke();
  c.save(); rr(c, -8, -9, 34, 18, 6); c.clip(); c.fillStyle = '#fffaf2'; for (let x = -4; x < 30; x += 10) c.fillRect(x, -9, 4, 18); c.restore();
  rr(c, -8, -9, 34, 18, 6); c.stroke();
  c.fillStyle = '#3a3448'; ell(c, 26, 0, 3.4, 8); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; starPath(c, 8, 0, 5, 2.2, 0); c.fill(); c.lineWidth = 0.8; c.stroke();
  c.restore();
  c.fillStyle = '#4cb6ff'; rr(c, -14, -12, 26, 9, 3); c.fill(); c.stroke();
  for (const wx of [-9, 7]) { c.fillStyle = '#ffd23f'; circ(c, wx, -3, 5); c.fill(); c.stroke(); c.fillStyle = '#ff5c7a'; circ(c, wx, -3, 1.6); c.fill(); }
  if (L.state === 'load') { const fl = Math.sin(t * 30) * 1.5; sparkle(c, -16, -18 + fl, 3, '#ffe14d'); sparkle(c, -18, -21, 2, '#fff'); }
  c.restore();
}

/* Колесо огляду та шестерні-платформи */
function drawWheelStruct(c, w, t, theme) {
  const cx = w.cx, cy = w.cy, gy = 10 * T;
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
  if (theme === 'factory') {
    c.fillStyle = 'rgba(110,122,150,.55)'; c.strokeStyle = 'rgba(59,31,79,.45)'; c.lineWidth = 2;
    gearPath(c, cx, cy, w.r * 0.55, 10, t * TAU / w.period); c.fill(); c.stroke();
    c.fillStyle = '#c9d2e6'; circ(c, cx, cy, 7); c.fill(); c.stroke();
  } else {
    c.strokeStyle = '#c9304f'; c.lineWidth = 5; c.beginPath(); c.moveTo(cx - 34, gy); c.lineTo(cx, cy); c.lineTo(cx + 34, gy); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 3; circ(c, cx, cy, w.r); c.stroke();
    c.strokeStyle = 'rgba(255,92,122,.6)'; c.lineWidth = 1.2; circ(c, cx, cy, w.r - 5); c.stroke();
    for (let i = 0; i < 16; i++) { const a = i * TAU / 16 + t * TAU / w.period; c.fillStyle = RAINBOW[i % 6]; circ(c, cx + Math.cos(a) * w.r, cy + Math.sin(a) * w.r, 2); c.fill(); }
  }
  c.strokeStyle = theme === 'factory' ? 'rgba(80,90,120,.8)' : 'rgba(255,255,255,.9)'; c.lineWidth = 2;
  for (let i = 0; i < w.n; i++) { const a = t * TAU / w.period + i * TAU / w.n; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(a) * w.r, cy + Math.sin(a) * w.r); c.stroke(); }
  c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, cx, cy, 4); c.fill(); c.stroke();
  c.restore();
}
function drawMover2(c, m, theme) {
  if (m.bubble) { drawBubblePlat(c, m, G.t); return true; }
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  if (m.circ && theme !== 'factory') {
    const cx = m.x + m.w / 2;
    c.fillStyle = '#fffaf2'; circ(c, cx, m.y + 1, 2.4); c.fill(); c.stroke();
    c.fillStyle = '#ff5c7a'; rr(c, m.x, m.y, m.w, 8, 3); c.fill(); c.stroke();
    c.save(); rr(c, m.x, m.y, m.w, 8, 3); c.clip(); c.fillStyle = '#fffaf2'; for (let x = m.x + 3; x < m.x + m.w; x += 9) c.fillRect(x, m.y, 4, 8); c.restore(); rr(c, m.x, m.y, m.w, 8, 3); c.stroke();
    c.fillStyle = '#4cb6ff'; rr(c, m.x + 7, m.y + 8, m.w - 14, 9, 3); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; starPath(c, cx, m.y + 12.5, 3, 1.4, 0); c.fill();
  } else if (m.circ || theme === 'factory') {
    c.fillStyle = '#c9d2e6'; rr(c, m.x, m.y + 1, m.w, 10, 3); c.fill(); c.stroke();
    c.save(); rr(c, m.x, m.y + 1, m.w, 10, 3); c.clip(); c.fillStyle = '#ffd23f'; for (let x = m.x - 6; x < m.x + m.w; x += 10) { c.beginPath(); c.moveTo(x, m.y + 11); c.lineTo(x + 5, m.y + 1); c.lineTo(x + 9, m.y + 1); c.lineTo(x + 4, m.y + 11); c.closePath(); c.fill(); } c.restore();
    c.fillStyle = '#e6ebf5'; c.fillRect(m.x + 2, m.y + 2.5, m.w - 4, 3);
    rr(c, m.x, m.y + 1, m.w, 10, 3); c.stroke();
    c.fillStyle = '#6e7a96'; circ(c, m.x + 4, m.y + 8, 1.2); c.fill(); circ(c, m.x + m.w - 4, m.y + 8, 1.2); c.fill();
  } else if (theme === 'pirate' || theme === 'jungle') {
    c.fillStyle = '#c98d55'; rr(c, m.x, m.y + 2, m.w, 9, 3); c.fill(); c.stroke();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1; c.beginPath(); for (let x = m.x + 8; x < m.x + m.w - 2; x += 8) { c.moveTo(x, m.y + 3); c.lineTo(x, m.y + 10); } c.stroke();
    c.strokeStyle = theme === 'jungle' ? '#4fae5a' : '#e6c27a'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(m.x + 4, m.y + 6.5); c.lineTo(m.x + m.w - 4, m.y + 6.5); c.stroke();
  } else if (theme === 'dino') {
    c.fillStyle = '#b8a088'; rr(c, m.x, m.y + 1, m.w, 11, 5); c.fill(); c.stroke();
    c.fillStyle = '#7fd46a'; rr(c, m.x + 1, m.y, m.w - 2, 4, 2); c.fill();
    c.fillStyle = '#9c8670'; ell(c, m.x + m.w * 0.3, m.y + 8, 3, 1.6); c.fill(); ell(c, m.x + m.w * 0.7, m.y + 7, 2.2, 1.2); c.fill();
  } else { c.restore(); return false; }
  c.restore();
  return true;
}

/* Гейзер: б'є вгору по черзі */
function drawGeyser(c, z, t, gt) {
  const ph = (gt + z.ph) % z.cyc, on = ph < z.on, warn = !on && z.cyc - ph < 0.8;
  const cx = (z.x0 + z.x1) / 2, w = z.x1 - z.x0, gy = Math.min(z.y1, VIEW_H);
  c.save(); c.lineJoin = 'round';
  if (on) {
    const k = Math.min(1, ph / 0.2), top = gy - (gy - z.y + 14) * k;
    const g = c.createLinearGradient(0, top, 0, gy); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(140,220,255,.85)');
    c.fillStyle = g; c.beginPath(); c.moveTo(cx - w * 0.22, gy);
    for (let y = gy; y > top; y -= 8) c.lineTo(cx - w * 0.22 - Math.sin(y * 0.2 + t * 14) * 2.5, y);
    c.lineTo(cx, top - 6); for (let y = top; y < gy; y += 8) c.lineTo(cx + w * 0.22 + Math.sin(y * 0.2 + t * 14 + 1) * 2.5, y);
    c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,.9)'; for (let i = 0; i < 6; i++) { const a = t * 6 + i; circ(c, cx + Math.sin(a * 1.7) * w * 0.4, top + Math.abs(Math.sin(a)) * 10, 3 + (i % 3)); c.fill(); }
  } else if (warn) {
    for (let i = 0; i < 4; i++) { const k = (t * 3 + i / 4) % 1; c.fillStyle = `rgba(255,255,255,${0.8 * (1 - k)})`; circ(c, cx + (i - 1.5) * 5, gy - 4 - k * 16, 2 + k * 2); c.fill(); }
  }
  c.fillStyle = '#9c8670'; c.strokeStyle = INK; c.lineWidth = 1.2;
  for (const dx of [-w * 0.42, w * 0.42]) { ell(c, cx + dx, gy - 3, 6, 4.6); c.fill(); c.stroke(); }
  c.fillStyle = '#5a4a3a'; ell(c, cx, gy - 1, w * 0.3, 2.6); c.fill();
  c.restore();
}

/* Блоки шостої частини */
function drawBlock3(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'speaker') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#7a5ad9'; c.fill(); c.stroke();
    c.fillStyle = '#3a2a6a'; circ(c, T / 2, T / 2 + 2, 7); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; circ(c, T / 2, T / 2 + 2, 2.6); c.fill();
    c.fillStyle = '#c9b6ff'; circ(c, T / 2, 5, 1.8); c.fill();
  } else if (b === 'circus') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#fffaf2'; c.fill();
    c.save(); rr(c, 1, 1, T - 2, T - 2, 4); c.clip(); c.strokeStyle = '#ff5c7a'; c.lineWidth = 4; for (let i = -T; i < T * 2; i += 9) { c.beginPath(); c.moveTo(i, T); c.lineTo(i + T, 0); c.stroke(); } c.restore();
    c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, 1, 1, T - 2, T - 2, 4); c.stroke();
    c.fillStyle = '#ffd23f'; starPath(c, T / 2, T / 2 + 0.5, 5.4, 2.4, 0); c.fill(); c.lineWidth = 0.9; c.stroke();
  } else if (b === 'fossil') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#c9b49a'; c.fill(); c.stroke();
    c.strokeStyle = '#fffaf2'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(7, 15); c.lineTo(17, 9); c.stroke();
    c.fillStyle = '#fffaf2'; for (const [x, y] of [[6, 13.5], [7.5, 17], [16, 7], [18.5, 10.5]]) { circ(c, x, y, 2); c.fill(); }
    c.fillStyle = '#a8927a'; circ(c, 6, 6, 1.4); c.fill(); circ(c, 18, 18, 1.1); c.fill();
  } else if (b === 'metal') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#b8c4dc'; c.fill(); c.stroke();
    c.fillStyle = '#d6deee'; rr(c, 3.5, 3.5, T - 7, 5, 2); c.fill();
    c.fillStyle = '#7d8aa6'; for (const [x, y] of [[5, 5], [19, 5], [5, 19], [19, 19]]) { circ(c, x, y, 1.3); c.fill(); }
    c.strokeStyle = '#8f9cb8'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(6, 13); c.lineTo(18, 13); c.stroke();
  } else return false;
  return true;
}

/* Декор шостої частини */
function drawDecor6(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'noteS': {
      const b = Math.sin(t * 3 + x) * 1.5;
      c.strokeStyle = '#3f9e4f'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x - 2, y - 5, x, y - 8); c.stroke();
      noteShape(c, x, y - 15 + b, 1.2, d.c); break;
    }
    case 'flag':
      c.strokeStyle = '#7d8aa6'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 22); c.stroke();
      c.fillStyle = d.c; c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x, y - 22); c.quadraticCurveTo(x + 6, y - 20 + Math.sin(t * 5 + x), x + 12, y - 18); c.lineTo(x, y - 14); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#ffd23f'; circ(c, x, y - 23, 1.6); c.fill(); break;
    case 'popcorn':
      c.fillStyle = '#fffaf2'; for (const [dx, dy] of [[-3, -11], [0, -13], [3, -11], [-1.5, -9], [1.5, -9]]) { circ(c, x + dx, y + dy, 2.6); c.fill(); c.stroke(); }
      c.fillStyle = '#ff5c7a'; c.beginPath(); c.moveTo(x - 5, y - 9); c.lineTo(x + 5, y - 9); c.lineTo(x + 3.6, y); c.lineTo(x - 3.6, y); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#fff'; c.fillRect(x - 1, y - 8.5, 2, 8); break;
    case 'egg':
      c.fillStyle = '#fff5e0'; ell(c, x, y - 7, 5, 7); c.fill(); c.stroke();
      c.fillStyle = d.c; for (const [dx, dy, r] of [[-2, -9, 1.4], [2, -6, 1.2], [-1, -3.5, 1], [1.6, -11, 0.9]]) { circ(c, x + dx, y + dy, r); c.fill(); }
      break;
    case 'snowmanS':
      c.fillStyle = '#fff'; circ(c, x, y - 5, 5); c.fill(); c.stroke(); circ(c, x, y - 13, 3.8); c.fill(); c.stroke();
      c.fillStyle = '#ff8a3d'; c.beginPath(); c.moveTo(x + 1, y - 13); c.lineTo(x + 5, y - 12.4); c.lineTo(x + 1, y - 12); c.fill();
      c.fillStyle = INK; circ(c, x - 1.2, y - 14, 0.6); c.fill(); circ(c, x + 1.4, y - 14, 0.6); c.fill();
      c.fillStyle = '#ff5c7a'; rr(c, x - 4, y - 10.4, 8, 1.8, 0.9); c.fill(); break;
    case 'lamp': {
      c.strokeStyle = '#3a3448'; c.lineWidth = 1.8; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 24); c.stroke();
      c.fillStyle = '#ffe9a8'; c.strokeStyle = INK; c.lineWidth = 0.9; rr(c, x - 3.5, y - 31, 7, 8, 2); c.fill(); c.stroke();
      c.fillStyle = '#3a3448'; c.beginPath(); c.moveTo(x - 5, y - 31); c.lineTo(x, y - 35); c.lineTo(x + 5, y - 31); c.closePath(); c.fill();
      const g = c.createRadialGradient(x, y - 27, 0, x, y - 27, 22); g.addColorStop(0, 'rgba(255,230,150,.45)'); g.addColorStop(1, 'rgba(255,230,150,0)'); c.fillStyle = g; circ(c, x, y - 27, 22); c.fill(); break;
    }
    case 'gearS':
      c.fillStyle = d.c; c.lineWidth = 0.9; gearPath(c, x, y - 7, 7, 7, t * (x % 2 ? 1 : -1)); c.fill(); c.stroke();
      c.fillStyle = '#fff'; circ(c, x, y - 7, 2); c.fill(); c.stroke(); break;
    case 'crate2':
      c.fillStyle = '#e3b26b'; rr(c, x - 7, y - 12, 14, 12, 2); c.fill(); c.stroke();
      c.strokeStyle = '#a8743f'; c.beginPath(); c.moveTo(x - 7, y - 6); c.lineTo(x + 7, y - 6); c.stroke();
      c.fillStyle = '#ff7ab8'; heartPath(c, x, y - 9, 5); c.fill(); break;
  }
}

/* Фони шостої частини */
function bgMusic(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) {
    const x = wrapX(i * 230 - camX * 0.08, viewW + 300) - 150;
    const g = c.createLinearGradient(x, 0, x + 60, 200); g.addColorStop(0, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g; c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 30, 0); c.lineTo(x + 110, 220); c.lineTo(x + 40, 220); c.closePath(); c.fill();
  }
  c.strokeStyle = 'rgba(122,90,217,.35)'; c.lineWidth = 1.4;
  for (let k = 0; k < 5; k++) { c.beginPath(); for (let x = 0; x <= viewW + 8; x += 8) c.lineTo(x, 70 + k * 9 + Math.sin((x + camX * 0.15) * 0.012 + t * 0.5) * 14); c.stroke(); }
  const cols = ['#ff7ab8', '#7a5ad9', '#4cb6ff', '#ff9a3d', '#3fbf7f'];
  for (let i = 0; i < 9; i++) {
    const wx = wrapX(i * 97 - camX * 0.15, viewW + 60) - 30, k = Math.floor(i * 1.7) % 5;
    noteShape(c, wx, 74 + k * 9 + Math.sin((wx + camX * 0.15) * 0.012 + t * 0.5) * 14 - 2 + Math.sin(t * 3 + i) * 1.5, 1.5, cols[i % 5]);
  }
  hill(c, viewW, 200, 10, 0.014, 0.4, camX * 0.25, '#d9c9ff');
  const span = 52, off = wrapX(-camX * 0.4, span);
  c.fillStyle = '#b8a6f0'; c.fillRect(0, 222, viewW + 1, VIEW_H);
  for (let x = -span + off; x < viewW + span; x += span) { c.fillStyle = '#fffaf2'; rr(c, x, 214, span - 3, 30, 3); c.fill(); c.fillStyle = '#5a4a8a'; rr(c, x + span - 12, 214, 16, 16, 2); c.fill(); }
}
function bgCircus(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 3, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 18, 0.8, 'rgba(255,255,255,.85)'); }
  const span = 380;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.18, span) + 150, base = 215;
    c.save(); c.beginPath(); c.moveTo(wx - 110, base); c.lineTo(wx - 95, base - 70); c.lineTo(wx, base - 120); c.lineTo(wx + 95, base - 70); c.lineTo(wx + 110, base); c.closePath(); c.clip();
    for (let k = -6; k <= 6; k++) { c.fillStyle = k % 2 ? '#ff7a95' : '#fff3f6'; c.beginPath(); c.moveTo(wx, base - 120); c.lineTo(wx + k * 22 - 11, base); c.lineTo(wx + k * 22 + 11, base); c.closePath(); c.fill(); }
    c.restore();
    c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(wx, base - 120); c.lineTo(wx, base - 140); c.lineTo(wx + 16, base - 134); c.lineTo(wx, base - 128); c.fill();
    c.fillStyle = '#ffd6a0'; c.beginPath(); c.moveTo(wx - 18, base); c.quadraticCurveTo(wx, base - 50, wx + 18, base); c.closePath(); c.fill();
  }
  const bspan = 26, boff = wrapX(-camX * 0.3, bspan);
  c.strokeStyle = 'rgba(90,31,42,.5)'; c.lineWidth = 1; c.beginPath();
  for (let x = -bspan + boff; x < viewW + bspan; x += bspan) { c.moveTo(x, 12); c.quadraticCurveTo(x + bspan / 2, 20, x + bspan, 12); } c.stroke();
  for (let x = -bspan + boff, i = Math.floor(camX * 0.3 / bspan); x < viewW + bspan; x += bspan, i++) { c.fillStyle = RAINBOW[((i % 6) + 6) % 6]; c.beginPath(); c.moveTo(x + 6, 15); c.lineTo(x + 20, 15); c.lineTo(x + 13, 28); c.closePath(); c.fill(); }
  c.fillStyle = '#ffd6a0'; c.fillRect(0, 214, viewW + 1, VIEW_H);
}
function bgDino(c, viewW, camX, t) {
  const vx = wrapX(viewW * 0.65 - camX * 0.06, viewW + 400) - 100;
  c.fillStyle = '#c9a0b8'; c.beginPath(); c.moveTo(vx - 120, 200); c.lineTo(vx - 26, 92); c.lineTo(vx + 26, 92); c.lineTo(vx + 120, 200); c.closePath(); c.fill();
  c.fillStyle = '#ff9a7a'; c.beginPath(); c.moveTo(vx - 26, 92); c.lineTo(vx - 14, 104); c.lineTo(vx - 4, 96); c.lineTo(vx + 8, 108); c.lineTo(vx + 26, 92); c.closePath(); c.fill();
  for (let i = 0; i < 4; i++) { const k = (t * 0.12 + i / 4) % 1; c.fillStyle = `rgba(255,255,255,${0.75 * (1 - k)})`; circ(c, vx + Math.sin(i * 2 + t * 0.3) * 10 + k * 30, 82 - k * 70, 10 + k * 18); c.fill(); }
  hill(c, viewW, 190, 14, 0.012, 1.2, camX * 0.2, '#b8dca0');
  const span = 120;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.35, span), h = 70 + (((i + Math.floor(camX * 0.35 / span)) * 37) % 3) * 12;
    c.strokeStyle = '#8a6a48'; c.lineWidth = 5; c.beginPath(); c.moveTo(wx, 230); c.quadraticCurveTo(wx + 8, 230 - h / 2, wx + 4, 230 - h); c.stroke();
    c.fillStyle = '#5fb36a';
    for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * 0.6; c.save(); c.translate(wx + 4, 230 - h); c.rotate(a + Math.PI / 2); ell(c, 0, -16, 5, 17); c.fill(); c.restore(); }
  }
  c.fillStyle = '#9fd08a'; c.fillRect(0, 226, viewW + 1, VIEW_H);
  for (let i = 0; i < 2; i++) { const x = wrapX(i * 420 + t * 18 - camX * 0.1, viewW + 200) - 100; drawPtero(c, x, 40 + i * 22, t + i, 1, false, false); }
}
function bgSnow(c, viewW, camX, t) {
  const mx = viewW * 0.18, mg = c.createRadialGradient(mx, 46, 3, mx, 46, 40); mg.addColorStop(0, 'rgba(255,250,230,1)'); mg.addColorStop(0.4, 'rgba(255,250,230,.9)'); mg.addColorStop(0.45, 'rgba(255,250,230,.25)'); mg.addColorStop(1, 'rgba(255,250,230,0)');
  c.fillStyle = mg; circ(c, mx, 46, 40); c.fill();
  hill(c, viewW, 170, 18, 0.01, 0.8, camX * 0.12, '#e6ecff');
  const span = 150;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span), n = ((i + Math.floor(camX * 0.3 / span)) % 3 + 3) % 3, w = 54 + n * 8, h = 40 + n * 10, base = 214;
    c.fillStyle = ['#ffb3c6', '#a8d8ff', '#ffe1a8'][n]; c.fillRect(wx, base - h, w, h);
    c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(wx - 8, base - h + 2); c.lineTo(wx + w / 2, base - h - 26); c.lineTo(wx + w + 8, base - h + 2); c.closePath(); c.fill();
    c.fillStyle = '#ffe680'; rr(c, wx + 9, base - h + 12, 11, 12, 2); c.fill(); rr(c, wx + w - 20, base - h + 12, 11, 12, 2); c.fill();
    c.fillStyle = '#8a5a3a'; rr(c, wx + w / 2 - 6, base - 18, 12, 18, 5); c.fill();
    c.fillStyle = '#4fa58a'; c.beginPath(); c.moveTo(wx + w + 24, base); c.lineTo(wx + w + 34, base - 40); c.lineTo(wx + w + 44, base); c.closePath(); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.moveTo(wx + w + 30, base - 24); c.lineTo(wx + w + 34, base - 40); c.lineTo(wx + w + 38, base - 24); c.closePath(); c.fill();
  }
  c.fillStyle = '#f2f5ff'; c.fillRect(0, 212, viewW + 1, VIEW_H);
  for (let i = 0; i < 45; i++) { const x = wrapX(i * 37 + Math.sin(t * 0.8 + i) * 14 - camX * 0.3, viewW + 20) - 10, y = wrapX(i * 53 + t * (12 + (i % 5) * 4), VIEW_H); c.fillStyle = 'rgba(255,255,255,.95)'; circ(c, x, y, 1 + (i % 3) * 0.6); c.fill(); }
}
function bgFactory(c, viewW, camX, t) {
  const span = 260;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.12, span);
    c.fillStyle = '#c9d2e6'; c.fillRect(wx + 20, 70, 26, 150); c.fillRect(wx + 150, 100, 22, 120);
    c.fillStyle = '#ff9fcb'; c.fillRect(wx + 20, 80, 26, 6); c.fillStyle = '#9fd8ff'; c.fillRect(wx + 150, 108, 22, 6);
    for (let k = 0; k < 3; k++) { const kk = (t * 0.25 + k / 3) % 1; c.fillStyle = `rgba(255,255,255,${0.85 * (1 - kk)})`; circ(c, wx + 33 + kk * 20, 64 - kk * 50, 8 + kk * 12); c.fill(); }
  }
  for (let i = 0; i < 4; i++) {
    const x = wrapX(i * 210 + 60 - camX * 0.22, viewW + 200) - 100, y = 120 + (i % 2) * 40, r = 26 + (i % 2) * 10;
    c.fillStyle = 'rgba(150,165,200,.55)'; gearPath(c, x, y, r, 9, t * (i % 2 ? 0.6 : -0.6)); c.fill();
    c.fillStyle = 'rgba(230,236,248,.9)'; circ(c, x, y, r * 0.35); c.fill();
  }
  c.strokeStyle = '#aab4cc'; c.lineWidth = 8; c.beginPath(); c.moveTo(0, 168); c.lineTo(viewW + 1, 168); c.stroke();
  const bs = 70, bo = wrapX(-camX * 0.3 + t * 30, bs);
  for (let x = -bs + bo; x < viewW + bs; x += bs) { c.fillStyle = '#ffd6a0'; rr(c, x, 150, 16, 14, 2); c.fill(); c.fillStyle = '#ff7ab8'; heartPath(c, x + 8, 156, 7); c.fill(); }
  c.fillStyle = '#9aa6c0'; c.fillRect(0, 172, viewW + 1, 4);
  hill(c, viewW, 222, 4, 0.03, 0, camX * 0.4, '#b8c4dc');
}

/* Малювання нових ворогів, снарядів і частинок (з ui.js) */
function drawEnemy2(c, e, cx, fl) {
  switch (e.k) {
    case 'monkey': drawMonkey(c, cx, e.y + e.h, e.dir, e.t, e.throwT > 0, fl); return true;
    case 'parrot': drawParrot(c, cx, e.y + e.h / 2, e.t, e.dir, fl, false); return true;
    case 'gull': drawParrot(c, cx, e.y + e.h / 2, e.t, e.dir, fl, true); return true;
    case 'ginger': drawGinger(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
    case 'cannon': drawCannon(c, cx, e.y + e.h, e.dir, e.t, fl, e.rec); return true;
    case 'note': drawNoteE(c, cx, e.y + e.h / 2, e.t, e.dir, fl); return true;
    case 'bouncer': drawBouncer(c, cx, e.y + e.h, e.t, fl, e.vy, e.onGround); return true;
    case 'dino': drawDino(c, cx, e.y + e.h, e.dir, e.t, fl, e.hp < 2); return true;
    case 'ptero': drawPtero(c, cx, e.y + e.h / 2, e.t, e.dir, fl, e.state === 'hang'); return true;
    case 'snowman': drawSnowman(c, cx, e.y + e.h, e.dir, e.t, e.throwT > 0, fl); return true;
    case 'penguin': drawPenguin(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
  }
  return false;
}
function drawBolt2(c, b) {
  switch (b.kind) {
    case 'banana': drawBanana(c, b.x, b.y + 4, b.t * 10); return true;
    case 'ball': drawCannonball(c, b.x, b.y); return true;
    case 'bub': drawBub(c, b.x, b.y, b.t); return true;
    case 'snowball': drawSnowball(c, b.x, b.y); return true;
    case 'gear': drawGearBolt(c, b.x, b.y, b.t); return true;
    case 'wave': drawWave(c, b.x, b.y, b.t, b.vx > 0 ? 1 : -1); return true;
  }
  return false;
}
function drawPart2(c, p, k) {
  if (p.k === 'note') { c.globalAlpha = Math.min(1, k * 1.5); noteShape(c, p.x, p.y, 1.1, p.col); }
}

const BG2 = { jungle: bgJungle, bubbles: bgBubbles, bakery: bgBakery, pirate: bgPirate, sea: bgSea, music: bgMusic, circus: bgCircus, dino: bgDino, snow: bgSnow, factory: bgFactory };
