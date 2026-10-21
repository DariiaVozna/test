'use strict';
/* ===== Частина 4: печера, портали, кнопки, ключики, Чарівник Плутанко ===== */
const PORTAL_COLS = [['#ff5cc8', '#ffd1f2'], ['#4cb6ff', '#d1ecff'], ['#54d68c', '#d6ffe6']];

function drawFrog(c, x, gy, dir, t, air, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const body = flash ? '#fff' : '#6fd46f';
  c.strokeStyle = INK; c.lineWidth = 1; c.fillStyle = flash ? '#fff' : '#4fb055';
  if (air) { ell(c, -9, -3, 7, 2.4, 0.5); c.fill(); c.stroke(); } else { ell(c, -8, -3, 5, 3.4); c.fill(); c.stroke(); }
  c.fillStyle = body; ell(c, 0, -7, 10, 7); c.fill(); c.stroke();
  c.fillStyle = '#e6ffd6'; ell(c, 2.5, -4.6, 6, 3.8); c.fill();
  for (const ex of [-3, 4]) { c.fillStyle = body; circ(c, ex, -14, 3.8); c.fill(); c.stroke(); c.fillStyle = '#fff'; circ(c, ex + 0.3, -14.3, 2.5); c.fill(); c.fillStyle = INK; circ(c, ex + 0.9, -14.2, 1.3); c.fill(); }
  c.beginPath(); c.arc(3, -8, 5, 0.15 * Math.PI, 0.8 * Math.PI); c.stroke();
  c.fillStyle = 'rgba(255,120,160,.55)'; circ(c, 8, -7, 1.6); c.fill();
  c.fillStyle = flash ? '#fff' : '#4fb055'; ell(c, 7, -1, 3, 1.8); c.fill(); c.stroke();
  c.restore();
}
function drawGhost(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round';
  const g = c.createRadialGradient(0, 0, 2, 0, 0, 20); g.addColorStop(0, 'rgba(230,220,255,.55)'); g.addColorStop(1, 'rgba(230,220,255,0)');
  c.fillStyle = g; circ(c, 0, 0, 20); c.fill();
  c.globalAlpha = 0.9;
  c.fillStyle = flash ? '#ffffff' : '#f6f2ff'; c.strokeStyle = INK; c.lineWidth = 1;
  c.beginPath(); c.moveTo(-9, 7); c.lineTo(-9, -2); c.arc(0, -2, 9, Math.PI, 0); c.lineTo(9, 7);
  for (let i = 0; i < 3; i++) { const x0 = 9 - i * 6, w = Math.sin(t * 6 + i) * 1.5; c.quadraticCurveTo(x0 - 1.5, 10 + w, x0 - 3, 7); c.quadraticCurveTo(x0 - 4.5, 4 - w, x0 - 6, 7); }
  c.closePath(); c.fill(); c.stroke();
  c.globalAlpha = 1;
  c.fillStyle = INK; ell(c, -2.6, -3, 1.3, 1.9); c.fill(); ell(c, 3.4, -3, 1.3, 1.9); c.fill();
  c.lineWidth = 0.8; c.beginPath(); c.moveTo(-4.6, -6.4); c.lineTo(-1.4, -5.4); c.moveTo(5.4, -6.4); c.lineTo(2.2, -5.4); c.stroke();
  c.fillStyle = 'rgba(255,140,190,.6)'; circ(c, -5, 0.5, 1.6); c.fill(); circ(c, 6, 0.5, 1.6); c.fill();
  c.strokeStyle = INK; circ(c, 0.6, 2, 1.3); c.stroke();
  c.restore();
}
function drawBeetle(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.2;
  for (let i = 0; i < 3; i++) { const ph = Math.sin(t * 14 + i * 2) * 1.4; c.beginPath(); c.moveTo(-5 + i * 5, -3); c.lineTo(-6 + i * 5 + ph, 0); c.stroke(); }
  c.fillStyle = INK; circ(c, 9, -5, 4.2); c.fill();
  c.lineWidth = 0.9; c.beginPath(); c.moveTo(10, -8.5); c.quadraticCurveTo(12, -12, 14, -12); c.moveTo(11.5, -7.5); c.quadraticCurveTo(14.5, -9.5, 16, -9); c.stroke();
  c.fillStyle = '#fff'; circ(c, 10.6, -6, 1.5); c.fill(); c.fillStyle = INK; circ(c, 11.1, -5.8, 0.7); c.fill();
  c.fillStyle = flash ? '#fff' : '#ff4f4f'; c.lineWidth = 1.1; ell(c, 0, -6, 10, 7); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(1, -13); c.lineTo(1, 1); c.stroke();
  c.fillStyle = INK; for (const [dx, dy, r] of [[-4.5, -8, 2], [5, -9, 1.7], [-4, -3, 1.6], [5.4, -3.4, 1.5]]) { circ(c, dx, dy, r); c.fill(); }
  c.fillStyle = 'rgba(255,255,255,.55)'; ell(c, -3, -11, 3, 1.2, -0.3); c.fill();
  c.restore();
}
function drawKey(c, x, y, t) {
  c.save(); c.translate(x, y + Math.sin(t * 3) * 2); c.rotate(Math.sin(t * 2) * 0.15); c.lineCap = 'round';
  const g = c.createRadialGradient(0, 0, 1, 0, 0, 16); g.addColorStop(0, 'rgba(255,240,150,.7)'); g.addColorStop(1, 'rgba(255,240,150,0)');
  c.fillStyle = g; circ(c, 0, 0, 16); c.fill();
  const path = () => { c.beginPath(); c.arc(-5, 0, 4.5, 0, TAU); c.moveTo(-0.5, 0); c.lineTo(10, 0); c.moveTo(7, 0); c.lineTo(7, 4); c.moveTo(10, 0); c.lineTo(10, 3); };
  c.strokeStyle = INK; c.lineWidth = 4.4; path(); c.stroke();
  c.strokeStyle = '#ffcc33'; c.lineWidth = 2.6; path(); c.stroke();
  sparkle(c, 6 + Math.sin(t * 4) * 2, -6, 1.6, '#fff');
  c.restore();
}
function drawPortal(c, p, t) {
  const cols = PORTAL_COLS[p.pair % PORTAL_COLS.length];
  c.save(); c.translate(p.x, p.gy - 22);
  const g = c.createRadialGradient(0, 0, 2, 0, 0, 30); g.addColorStop(0, cols[1]); g.addColorStop(0.5, cols[1] + '99'); g.addColorStop(1, cols[1] + '00');
  c.fillStyle = g; ell(c, 0, 0, 22, 30); c.fill();
  c.save(); ell(c, 0, 0, 11, 20); c.clip();
  c.fillStyle = 'rgba(255,255,255,.65)'; c.fillRect(-12, -21, 24, 42);
  c.strokeStyle = cols[0]; c.lineWidth = 2; c.globalAlpha = 0.7;
  for (let k = 0; k < 3; k++) { c.beginPath(); c.ellipse(0, 0, 9 - k * 3, 17 - k * 5, 0, t * 4 + k, t * 4 + k + 3.6); c.stroke(); }
  c.restore();
  c.strokeStyle = INK; c.lineWidth = 6.6; ell(c, 0, 0, 12, 21); c.stroke();
  c.strokeStyle = cols[0]; c.lineWidth = 4.4; ell(c, 0, 0, 12, 21); c.stroke();
  for (let i = 0; i < 4; i++) { const a = t * 2.5 + i * TAU / 4; sparkle(c, Math.cos(a) * 15, Math.sin(a) * 25, 1.6, '#fff'); }
  c.fillStyle = '#8a7bb3'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, -11, 20, 22, 4, 2); c.fill(); c.stroke();
  c.restore();
}
function drawButton(c, b, sw, t) {
  c.save(); c.translate(b.x, b.gy); c.lineJoin = 'round';
  const h = b.pt > 0 ? 3 : 7, col = sw ? '#ff7ab8' : '#4cb6ff';
  c.fillStyle = '#8a7bb3'; c.strokeStyle = INK; c.lineWidth = 1.1; rr(c, -13, -5, 26, 5, 2); c.fill(); c.stroke();
  c.fillStyle = col; rr(c, -9, -5 - h, 18, h + 1.5, 4); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.6)'; rr(c, -6, -4 - h, 7, 1.6, 0.8); c.fill();
  if (b.pt <= 0) { c.fillStyle = '#fff'; c.font = '900 7px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('!', 0, -8); }
  c.restore();
}
function drawMagic(c, x, y, t) {
  c.save(); c.translate(x, y);
  const g = c.createRadialGradient(0, 0, 0, 0, 0, 12); g.addColorStop(0, 'rgba(255,200,240,.9)'); g.addColorStop(1, 'rgba(200,150,255,0)');
  c.fillStyle = g; circ(c, 0, 0, 12); c.fill();
  c.rotate(t * 8); c.fillStyle = '#ff7ad9'; c.strokeStyle = INK; c.lineWidth = 0.9; starPath(c, 0, 0, 6.5, 3, 0); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 0, 0, 1.6); c.fill();
  c.restore();
}

/* Чарівник Плутанко. st: wait | vanish | appear | cast | laugh | happy */
function drawWizard(c, x, fy, t, st, stT, dir, alpha, flash, real) {
  if (alpha <= 0.02) return;
  c.save(); c.translate(x, fy); c.globalAlpha = alpha; c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const robe = flash ? '#ffffff' : '#6a4ad9', skin = '#ffd9b8';
  c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = robe; c.beginPath(); c.moveTo(-13, 0); c.lineTo(-7, -27); c.lineTo(7, -27); c.lineTo(13, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; rr(c, -13, -3, 26, 3, 1.5); c.fill();
  c.fillStyle = '#ffd23f'; for (const [sx, sy, r] of [[-5, -9, 2.2], [4, -16, 1.8], [6, -6, 1.5], [-3, -19, 1.4]]) { starPath(c, sx, sy, r, r * 0.45, 0); c.fill(); }
  const castK = st === 'cast' ? Math.min(1, stT / 0.5) : 0;
  const ang = -0.5 - castK * 1.0 + (st === 'laugh' ? Math.sin(t * 12) * 0.25 : 0);
  c.save(); c.translate(5, -21); c.rotate(ang);
  c.fillStyle = robe; rr(c, -2, -2.5, 12, 5, 2.5); c.fill(); c.stroke();
  c.fillStyle = skin; circ(c, 11, 0, 2.3); c.fill(); c.stroke();
  c.strokeStyle = '#8a5a3a'; c.lineWidth = 2; c.beginPath(); c.moveTo(12, 0); c.lineTo(25, 0); c.stroke();
  if (st === 'cast') { const g = c.createRadialGradient(27, 0, 0, 27, 0, 12); g.addColorStop(0, 'rgba(255,240,150,.95)'); g.addColorStop(1, 'rgba(255,200,240,0)'); c.fillStyle = g; circ(c, 27, 0, 12); c.fill(); }
  c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 0.9; starPath(c, 27, 0, 4.2, 1.9, t * 3); c.fill(); c.stroke();
  c.restore();
  c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = skin; circ(c, 0, -32, 7); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-6.5, -31); c.quadraticCurveTo(-10, -20, -3, -13); c.quadraticCurveTo(0, -10, 3, -13); c.quadraticCurveTo(10, -20, 6.5, -31); c.quadraticCurveTo(0, -27, -6.5, -31); c.closePath(); c.fill(); c.stroke();
  c.lineWidth = 0.9; c.beginPath(); c.arc(0, -20, 2.4, 0, TAU * 0.85); c.moveTo(-3, -24); c.quadraticCurveTo(-5, -18, -1, -16); c.stroke();
  c.fillStyle = '#ffb3c6'; circ(c, 5.5, -31.5, 2.1); c.fill(); c.stroke();
  c.lineWidth = 0.9; circ(c, -1.5, -34, 2.4); c.stroke(); circ(c, 3.6, -34, 2.4); c.stroke();
  c.beginPath(); c.moveTo(0.9, -34); c.lineTo(1.2, -34); c.stroke();
  if (st === 'laugh' || st === 'happy') { c.beginPath(); c.arc(-1.5, -33.4, 1.2, 1.1 * Math.PI, 1.9 * Math.PI); c.moveTo(4.8, -33.4); c.arc(3.6, -33.4, 1.2, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); }
  else { c.fillStyle = INK; circ(c, -1.2, -34, 0.9); c.fill(); circ(c, 3.9, -34, 0.9); c.fill(); }
  c.fillStyle = flash ? '#fff' : '#4a32b0'; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(-11, -38); c.lineTo(11, -38); c.lineTo(4, -50); c.quadraticCurveTo(0, -60, 9 + Math.sin(t * 2) * 2, -64); c.quadraticCurveTo(-4, -60, -4, -49); c.closePath(); c.fill(); c.stroke();
  ell(c, 0, -38, 12.5, 2.6); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.fillRect(-7.5, -42.5, 15, 2.4);
  if (real) {
    const g = c.createRadialGradient(1, -48, 0, 1, -48, 10); g.addColorStop(0, 'rgba(255,240,150,.9)'); g.addColorStop(1, 'rgba(255,240,150,0)'); c.fillStyle = g; circ(c, 1, -48, 10); c.fill();
    c.fillStyle = '#ffd23f';
  } else c.fillStyle = '#d9d2ef';
  c.strokeStyle = INK; c.lineWidth = 0.8; starPath(c, 1, -48, 4, 1.8, 0); c.fill(); c.stroke();
  c.restore();
  c.save(); c.globalAlpha = alpha; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
  if (st === 'laugh' && real) { c.font = '900 11px Nunito, system-ui, sans-serif'; c.lineWidth = 3; c.strokeStyle = '#fff'; c.strokeText('Хі-хі!', x + dir * 18, fy - 70); c.fillStyle = '#6a4ad9'; c.fillText('Хі-хі!', x + dir * 18, fy - 70); }
  if (st === 'happy') { for (let i = 0; i < 3; i++) { const k = (t * 20 + i * 12) % 30; c.globalAlpha = 1 - k / 30; c.fillStyle = '#ff7ab8'; heartPath(c, x + dir * (10 + i * 8), fy - 66 - k, 8); c.fill(); } }
  c.restore();
}

/* Фони четвертої частини */
function bgCave(c, viewW, camX, t) {
  const span = 120;
  c.fillStyle = '#100a24';
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span);
    for (const [dx, h, w] of [[0, 52, 14], [40, 30, 10], [78, 64, 16]]) { c.beginPath(); c.moveTo(wx + dx - w, 0); c.lineTo(wx + dx, h); c.lineTo(wx + dx + w, 0); c.closePath(); c.fill(); }
  }
  const cspan = 260;
  for (let i = -1; i < viewW / cspan + 2; i++) {
    const wx = i * cspan + wrapX(-camX * 0.3, cspan) + 60, cy = 150 + (i % 2) * 18;
    const col = i % 2 ? '120,240,220' : '255,150,220';
    const g = c.createRadialGradient(wx, cy, 0, wx, cy, 46); g.addColorStop(0, `rgba(${col},.35)`); g.addColorStop(1, `rgba(${col},0)`);
    c.fillStyle = g; circ(c, wx, cy, 46); c.fill();
    c.fillStyle = `rgba(${col},.8)`;
    for (const [dx, h] of [[-8, 18], [0, 28], [8, 14]]) { c.beginPath(); c.moveTo(wx + dx - 4, cy + 12); c.lineTo(wx + dx, cy + 12 - h); c.lineTo(wx + dx + 4, cy + 12); c.closePath(); c.fill(); }
  }
  hill(c, viewW, 206, 14, 0.016, 0.9, camX * 0.38, '#1c1436');
  for (let i = 0; i < 22; i++) {
    const x = wrapX(i * 59 - camX * 0.5 + Math.sin(t * 0.7 + i) * 14, viewW + 40) - 20, y = 60 + Math.sin(t * 1.1 + i * 2) * 30 + (i % 5) * 30;
    const a = 0.4 + 0.6 * Math.abs(Math.sin(t * 2.5 + i));
    const g = c.createRadialGradient(x, y, 0, x, y, 6); g.addColorStop(0, `rgba(200,255,170,${a})`); g.addColorStop(1, 'rgba(200,255,170,0)'); c.fillStyle = g; circ(c, x, y, 6); c.fill();
  }
}
function bgPortal(c, viewW, camX, t) {
  const mx = viewW * 0.78, mg = c.createRadialGradient(mx, 50, 4, mx, 50, 44);
  mg.addColorStop(0, 'rgba(255,255,255,1)'); mg.addColorStop(0.4, 'rgba(255,250,240,.85)'); mg.addColorStop(0.45, 'rgba(255,250,240,.25)'); mg.addColorStop(1, 'rgba(255,250,240,0)');
  c.fillStyle = mg; circ(c, mx, 50, 44); c.fill();
  const span = 260;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.12, span) + 40, wy = 70 + (i % 2) * 40 + Math.sin(t * 0.8 + i) * 5;
    c.fillStyle = '#8f7fe0'; c.beginPath(); c.moveTo(wx - 40, wy); c.quadraticCurveTo(wx, wy + 44, wx + 40, wy); c.closePath(); c.fill();
    c.fillStyle = '#9fe6c8'; ell(c, wx, wy, 41, 7); c.fill();
    c.fillStyle = '#7a5ad9'; c.fillRect(wx + 10, wy - 22, 3, 22); c.fillStyle = '#ff9fd9'; circ(c, wx + 11.5, wy - 26, 9); c.fill();
    c.strokeStyle = 'rgba(255,92,200,.6)'; c.lineWidth = 2; ell(c, wx - 14, wy - 12, 5, 9); c.stroke();
  }
  for (let i = 0; i < 20; i++) { const x = wrapX(i * 71 - camX * 0.2, viewW + 20) - 10, y = 30 + (i * 43) % 170, tw = 0.5 + 0.5 * Math.sin(t * 3 + i); sparkle(c, x, y, 0.8 + tw, `rgba(255,255,255,${0.4 + tw * 0.5})`); }
  hill(c, viewW, 200, 12, 0.016, 0.4, camX * 0.25, '#b9a8f2');
  hill(c, viewW, 218, 8, 0.024, 1.6, camX * 0.42, '#a593e8');
}
function bgButton(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.12 + t * 5, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 22, 0.9, 'rgba(255,255,255,.92)'); }
  const rx = wrapX(320 - camX * 0.06, viewW + 700) - 200;
  for (let i = 0; i < 6; i++) { c.strokeStyle = RAINBOW[i]; c.globalAlpha = 0.45; c.lineWidth = 6; c.beginPath(); c.arc(rx, 230, 140 - i * 6, Math.PI, TAU); c.stroke(); }
  c.globalAlpha = 1;
  const cols = ['#ffc6e0', '#c6e6ff', '#fff0b3', '#d6c6ff', '#c6f5e0'];
  const span = 300;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.22, span);
    [[0, 70, 40], [50, 100, 34], [96, 56, 44], [150, 86, 36], [200, 66, 42]].forEach(([dx, h, w], k) => {
      const bx = wx + dx, top = 214 - h;
      c.fillStyle = cols[(k + i + 10) % 5]; rr(c, bx, top, w, h + 4, 6); c.fill();
      c.beginPath(); c.arc(bx + w / 2, top + 2, w / 2, Math.PI, TAU); c.fill();
      c.fillStyle = 'rgba(255,255,255,.75)';
      for (let yy = top + 10; yy < 206; yy += 16) for (let xx = bx + 6; xx < bx + w - 8; xx += 12) { rr(c, xx, yy, 6, 8, 2); c.fill(); }
      c.fillStyle = k % 2 ? '#ff7ab8' : '#4cb6ff'; circ(c, bx + w / 2, top - w / 2 + 6, 4); c.fill();
    });
  }
  hill(c, viewW, 220, 6, 0.024, 1.1, camX * 0.4, '#bfe9a8');
}
function bgMaze(c, viewW, camX, t) {
  const sx = viewW * 0.2, sg = c.createRadialGradient(sx, 48, 4, sx, 48, 54);
  sg.addColorStop(0, 'rgba(255,252,220,1)'); sg.addColorStop(0.35, 'rgba(255,240,180,.8)'); sg.addColorStop(1, 'rgba(255,240,180,0)');
  c.fillStyle = sg; circ(c, sx, 48, 54); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 200 - camX * 0.14 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 22, 0.85, 'rgba(255,255,255,.9)'); }
  for (const [f, top, col, sp] of [[0.18, 150, '#7cc47a', 90], [0.36, 178, '#5fae68', 120]]) {
    for (let i = -1; i < viewW / sp + 2; i++) {
      const wx = i * sp + wrapX(-camX * f, sp);
      c.fillStyle = col; rr(c, wx, top, sp - 26, 240 - top, 10); c.fill();
      if (f < 0.3) { circ(c, wx + (sp - 26) / 2, top - 12, 12); c.fill(); c.fillRect(wx + (sp - 26) / 2 - 2, top - 6, 4, 8); }
    }
    c.fillRect(0, top + 40, viewW + 1, VIEW_H);
  }
  for (let i = 0; i < 14; i++) { const x = wrapX(i * 61 - camX * 0.36, viewW + 40) - 20, y = 190 + (i % 3) * 9; c.fillStyle = ['#ff9fcb', '#ffffff', '#ffd23f'][i % 3]; circ(c, x, y, 2.2); c.fill(); }
}
function bgWizard(c, viewW, camX, t) {
  const R = rng(31);
  for (let i = 0; i < 70; i++) { const x = wrapX(R() * 1600 - camX * 0.04, viewW + 20) - 10, y = R() * 200, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); c.fillStyle = `rgba(255,255,240,${0.35 + tw * 0.6})`; circ(c, x, y, 0.6 + R()); c.fill(); }
  const mx = viewW * 0.22, my = 58;
  c.fillStyle = '#fff3c4'; circ(c, mx, my, 22); c.fill();
  c.fillStyle = '#26206a'; circ(c, mx + 10, my - 6, 20); c.fill();
  const span = 520;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.12, span) + 300;
    c.fillStyle = '#3a2c75'; c.fillRect(wx - 24, 80, 48, 160);
    c.beginPath(); c.moveTo(wx - 34, 84); c.lineTo(wx + 2, 18); c.quadraticCurveTo(wx + 14, 8, wx + 22, 14); c.quadraticCurveTo(wx + 10, 22, wx + 34, 84); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,214,110,.85)'; for (const [dx, dy] of [[-10, 104], [6, 134], [-8, 168], [8, 196]]) { rr(c, wx + dx, dy, 7, 11, 3.5); c.fill(); }
    sparkle(c, wx + 22, 12, 2.2 + Math.sin(t * 4) * 0.6, '#ffd23f');
  }
  for (let i = 0; i < 16; i++) { const x = wrapX(i * 83 - camX * 0.3 + Math.sin(t + i) * 10, viewW + 40) - 20, y = 120 + Math.sin(t * 1.3 + i) * 40; sparkle(c, x, y, 1.2, `rgba(255,170,240,${0.4 + 0.4 * Math.sin(t * 3 + i)})`); }
  hill(c, viewW, 210, 10, 0.02, 0.8, camX * 0.35, '#2e2466');
}
