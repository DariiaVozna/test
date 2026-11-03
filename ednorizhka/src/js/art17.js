'use strict';
/* ===== Частина 17: Вітрильне озеро, Зоопарк, Співоча галявина, Скарбовий пагорб, Банановий гай ===== */
Object.assign(THEMES, {
  sailake: { sky: ['#8fd8ff', '#c9f0ff', '#f0fbff'], panel: '#1a3a5a', top: '#7fdc8a', topHi: '#b4f2b0', topLo: '#4fb85a', fill: '#d9b98a', fillLo: '#c09a68', dots: ['#e8cfa6', '#a8845a', '#f5e3c4'], block: 'sailblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  zoo: { sky: ['#ffe9b8', '#fff3d6', '#fffaf0'], panel: '#4a3010', top: '#9fd86a', topHi: '#c9f09a', topLo: '#6aa848', fill: '#c9a06a', fillLo: '#a8824f', dots: ['#d9b380', '#8a6a3a', '#e8cfa6'], block: 'zooblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  songmeadow: { sky: ['#e6d6ff', '#f3eaff', '#fff6fb'], panel: '#3a2060', top: '#8fe0a8', topHi: '#c0f5cf', topLo: '#5ab87a', fill: '#b9a0e6', fillLo: '#9d84d6', dots: ['#ffffff', '#ffd6f0', '#fff3a8'], block: 'noteblock', ice: false, topStyle: 'grass', dotShape: 'dot' },
  treasure: { sky: ['#ffe0b8', '#ffeed6', '#fff8ea'], panel: '#4a2a10', top: '#a8d86a', topHi: '#d0f09a', topLo: '#78a848', fill: '#8a5a30', fillLo: '#6a4424', dots: ['#a8743f', '#5a3a24', '#ffd23f'], block: 'chestblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  bananagrove: { sky: ['#c9f5d0', '#e6fbe8', '#fffbe0'], panel: '#1a4a2a', top: '#6fcf5a', topHi: '#a8ef8a', topLo: '#3a9a3a', fill: '#9a6a40', fillLo: '#7a5030', dots: ['#b8865a', '#5a3a24', '#ffd23f'], block: 'bananablock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
});

/* ===== Вороги ===== */
function drawSwan(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y + 4); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = flash ? '#fff' : '#ffffff';
  c.beginPath(); c.moveTo(-13, -2); c.quadraticCurveTo(-14, -12, -4, -11); c.quadraticCurveTo(6, -10, 10, -4); c.quadraticCurveTo(6, 4, -6, 4); c.quadraticCurveTo(-12, 4, -13, -2); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(6, -6); c.quadraticCurveTo(14, -12, 9, -20); c.quadraticCurveTo(7, -25, 11, -27); c.stroke();
  c.strokeStyle = '#ffffff'; c.lineWidth = 3.4; c.stroke(); c.strokeStyle = INK; c.lineWidth = 1.2;
  circ(c, 11, -26, 3.4); c.fill(); c.stroke();
  c.fillStyle = '#ff9a3d'; c.beginPath(); c.moveTo(14, -27); c.lineTo(19, -25.5); c.lineTo(14, -24); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 12, -27, 0.9); c.fill();
  c.strokeStyle = 'rgba(59,31,79,.3)'; c.beginPath(); c.moveTo(-8, -5); c.quadraticCurveTo(-2, -2, 4, -5); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-16 + Math.sin(t * 3) * 2, 6); c.lineTo(-8, 6); c.moveTo(4, 6); c.lineTo(12 + Math.sin(t * 3 + 1) * 2, 6); c.stroke();
  c.restore();
}
function drawMosquito(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 0.9;
  const f = Math.sin(t * 50) * 0.5;
  for (const s of [-1, 1]) { c.save(); c.rotate(s * (0.5 + f)); c.fillStyle = 'rgba(220,240,255,.75)'; ell(c, -2, -6, 3, 6); c.fill(); c.stroke(); c.restore(); }
  c.fillStyle = flash ? '#fff' : '#8a7aa8'; ell(c, -4, 0, 6, 3); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(59,31,79,.4)'; c.beginPath(); c.moveTo(-6, -2.6); c.lineTo(-6, 2.6); c.moveTo(-3, -3); c.lineTo(-3, 3); c.stroke();
  c.strokeStyle = INK; c.fillStyle = flash ? '#fff' : '#a898c8'; circ(c, 4, -1, 3); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(6.5, 0); c.lineTo(12, 2); c.stroke();
  c.fillStyle = '#ff5c7a'; circ(c, 4.6, -1.8, 1.2); c.fill();
  for (const lx of [-5, -1, 2]) { c.beginPath(); c.moveTo(lx, 2); c.lineTo(lx - 2, 8); c.stroke(); }
  c.restore();
}
function drawEnemy13(c, e, cx, fl) {
  switch (e.k) {
    case 'swan': drawSwan(c, cx, e.y + e.h / 2, e.t, e.dir, fl); return true;
    case 'mosquito': drawMosquito(c, cx, e.y + e.h / 2, e.t, e.dir, fl); return true;
  }
  return drawEnemy14(c, e, cx, fl);
}

/* ===== Плитка: м'яка земля ===== */
Object.assign(TILE7, { dirt: 1 });
function tileKind13(v, tx, ty) { return v === 39 ? 'dirt' : tileKind14(v, tx, ty); }
function drawTile13(c, kind) {
  if (kind !== 'dirt') return drawTile14(c, kind);
  c.fillStyle = '#c48a52'; c.fillRect(0, 0, T, T);
  c.fillStyle = '#d9a46a'; c.beginPath(); c.moveTo(0, 3); c.quadraticCurveTo(6, 0, 12, 3); c.quadraticCurveTo(18, 6, T, 2); c.lineTo(T, 0); c.lineTo(0, 0); c.closePath(); c.fill();
  c.fillStyle = '#8a5a30'; for (const [x, y, r] of [[5, 8, 1.8], [16, 6, 1.4], [10, 15, 2.2], [20, 18, 1.6], [4, 20, 1.2]]) { circ(c, x, y, r); c.fill(); }
  c.fillStyle = '#e8c08a'; for (const [x, y] of [[13, 10], [7, 14], [19, 12]]) { circ(c, x, y, 0.9); c.fill(); }
  c.strokeStyle = 'rgba(90,58,36,.55)'; c.lineWidth = 1; c.setLineDash([2, 2]); c.strokeRect(0.5, 0.5, T - 1, T - 1); c.setLineDash([]);
}

/* ===== Рухомі об'єкти: вітрильник, бегемотик, голова жирафи, барабани ===== */
function drawSailboat(c, m, t) {
  const x = m.x, y = m.y + Math.sin(t * 2 + m.bx) * 1.2, w = m.w, puff = m.puff > 0 ? m.puff / 0.3 : 0;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#c98d55'; c.beginPath(); c.moveTo(x - 4, y); c.lineTo(x + w + 4, y); c.lineTo(x + w - 8, y + 16); c.lineTo(x + 8, y + 16); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#8a5a30'; c.lineWidth = 1; c.beginPath(); c.moveTo(x + 2, y + 6); c.lineTo(x + w - 2, y + 6); c.stroke();
  c.fillStyle = '#ffffff'; c.strokeStyle = INK; for (let k = 0; k < 3; k++) { circ(c, x + 14 + k * 20, y + 10, 2.2); c.fill(); c.stroke(); }
  const mx = x + w * 0.62;
  c.strokeStyle = '#8a5a30'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(mx, y); c.lineTo(mx, y - 52); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = '#ffffff';
  const bulge = 6 + puff * 8;
  c.beginPath(); c.moveTo(mx + 2, y - 50); c.quadraticCurveTo(mx + 14 + bulge, y - 28, mx + 2, y - 6); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(mx + 3, y - 30); c.quadraticCurveTo(mx + 9 + bulge * 0.6, y - 20, mx + 3, y - 10); c.closePath(); c.fill();
  c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(mx, y - 52); c.lineTo(mx + 10, y - 49); c.lineTo(mx, y - 46); c.closePath(); c.fill(); c.stroke();
  c.restore();
}
function drawHippoBack(c, x, y, w, t) {
  // спина бегемотика над водою (верх спини — y, вода трохи нижче), голова праворуч
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.5;
  c.fillStyle = '#a89ad9'; ell(c, x + w / 2, y + 15, w / 2 + 2, 15); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.35)'; ell(c, x + w * 0.42, y + 5, w * 0.28, 3); c.fill();
  c.fillStyle = 'rgba(59,31,79,.12)'; for (const k of [0.25, 0.5, 0.7]) { circ(c, x + w * k, y + 9 + (k * 7 % 3), 2.2); c.fill(); }
  const hx = x + w + 4, hy = y + 8;
  c.fillStyle = '#a89ad9'; circ(c, hx - 9, hy - 10, 3.6); c.fill(); c.stroke(); circ(c, hx + 7, hy - 11, 3.6); c.fill(); c.stroke();
  c.fillStyle = '#ff9fbf'; circ(c, hx - 9, hy - 10, 1.6); c.fill(); circ(c, hx + 7, hy - 11, 1.6); c.fill();
  c.fillStyle = '#a89ad9'; ell(c, hx, hy, 13, 11); c.fill(); c.stroke();
  c.fillStyle = '#c4b8ec'; ell(c, hx + 9, hy + 4, 9, 7); c.fill(); c.stroke();
  c.fillStyle = INK; ell(c, hx + 7, hy + 2, 1.2, 1.8); c.fill(); ell(c, hx + 12, hy + 2, 1.2, 1.8); c.fill();
  c.fillStyle = '#fff'; circ(c, hx - 4, hy - 5, 3.4); c.fill(); c.stroke(); circ(c, hx + 3, hy - 6, 3.4); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, hx - 3.2, hy - 4.6, 1.5); c.fill(); circ(c, hx + 3.8, hy - 5.6, 1.5); c.fill();
  c.fillStyle = '#ff9fbf'; ell(c, hx - 7, hy + 2, 2.6, 1.6); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1.6; c.beginPath();
  for (const [a, b] of [[x - 8, x + 6], [x + w * 0.4, x + w * 0.6], [hx + 14, hx + 24]]) { const o = Math.sin(t * 2 + a) * 2; c.moveTo(a + o, y + 17); c.lineTo(b + o, y + 17); }
  c.stroke();
  c.restore();
}
function drawGiraffeHead(c, m, t) {
  const x = m.x, y = m.y, w = m.w;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#ffc94d'; rr(c, x, y, w, 14, 7); c.fill(); c.stroke();
  c.fillStyle = '#c98d55'; for (const [dx, dy, r] of [[8, 5, 2.6], [22, 8, 2], [34, 4, 2.4]]) { circ(c, x + dx, y + dy, r); c.fill(); }
  c.fillStyle = '#ffc94d'; ell(c, x + w + 4, y + 10, 8, 6); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, x + w + 8, y + 9, 0.9); c.fill(); circ(c, x + w + 5, y + 12, 0.9); c.fill();
  c.fillStyle = '#fff'; circ(c, x + w - 4, y + 5, 3.2); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, x + w - 3.4, y + 5.4, 1.4); c.fill();
  for (const ox of [6, 14]) { c.strokeStyle = '#a8743f'; c.lineWidth = 2; c.beginPath(); c.moveTo(x + ox, y); c.lineTo(x + ox, y - 7); c.stroke(); c.fillStyle = '#a8743f'; c.strokeStyle = INK; c.lineWidth = 1; circ(c, x + ox, y - 8, 2.2); c.fill(); c.stroke(); }
  c.restore();
}
function drawDrum(c, m, t) {
  const x = m.x, y = m.y, w = m.w, col = DRUM_COLS[m.idx || 0], lit = m.lit > 0 ? m.lit / 0.45 : 0;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  if (lit > 0) { const g = c.createRadialGradient(x + w / 2, y, 2, x + w / 2, y, 34); g.addColorStop(0, `rgba(255,255,255,${0.9 * lit})`); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; circ(c, x + w / 2, y, 34); c.fill(); }
  if (m.gy) { c.strokeStyle = '#8a5a30'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(x + 10, y + 18); c.lineTo(x + 4, m.gy); c.moveTo(x + w - 10, y + 18); c.lineTo(x + w - 4, m.gy); c.moveTo(x + w / 2, y + 18); c.lineTo(x + w / 2, m.gy - 6); c.stroke(); c.strokeStyle = INK; c.lineWidth = 1.4; }
  c.fillStyle = col; rr(c, x + 2, y + 2, w - 4, 18, 4); c.fill(); c.stroke();
  c.strokeStyle = '#ffffff'; c.lineWidth = 1.2; c.beginPath(); for (let k = 0; k < 4; k++) { c.moveTo(x + 6 + k * 11, y + 4); c.lineTo(x + 11 + k * 11, y + 18); } c.stroke();
  c.fillStyle = lit > 0 ? '#ffffff' : '#fff8e8'; c.strokeStyle = INK; c.lineWidth = 1.2; ell(c, x + w / 2, y + 2, w / 2 - 1, 4); c.fill(); c.stroke();
  if (lit > 0) { c.globalAlpha = lit; c.fillStyle = col; c.font = '900 13px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('♪', x + w / 2 + 6, y - 10 - (1 - lit) * 10); c.globalAlpha = 1; }
  c.restore();
}
function drawMover13(c, m) {
  if (m.sailboat) { drawSailboat(c, m, G.t); return true; }
  if (m.hippo) { if (m.state !== 'gone') drawHippoBack(c, m.x, m.y, m.w, G.t); return true; }
  if (m.giraffe) { drawGiraffeHead(c, m, G.t); return true; }
  if (m.drum) { drawDrum(c, m, G.t); return true; }
  return drawMover14(c, m);
}

/* ===== Їжа й звірятка ===== */
function drawFoodItem(c, kind, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s || 1, s || 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  if (kind === 'melon') {
    c.fillStyle = '#5fbf4a'; ell(c, 0, 0, 9, 8); c.fill(); c.stroke();
    c.strokeStyle = '#2f8a2a'; c.lineWidth = 1.4; for (const dx of [-5, 0, 5]) { c.beginPath(); c.moveTo(dx, -7); c.quadraticCurveTo(dx * 1.4, 0, dx, 7); c.stroke(); }
    c.fillStyle = 'rgba(255,255,255,.4)'; ell(c, -3, -4, 2.6, 1.4, -0.5); c.fill();
  } else if (kind === 'apple') {
    c.fillStyle = '#ff4f5e'; circ(c, -2.4, 0, 6); c.fill(); circ(c, 2.4, 0, 6); c.fill(); c.beginPath(); c.arc(0, 0.4, 7.4, 0, TAU); c.stroke();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, -6); c.lineTo(1, -10); c.stroke();
    c.fillStyle = '#7fd46a'; c.strokeStyle = INK; c.lineWidth = 0.8; ell(c, 4, -9, 3.4, 1.8, -0.4); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.5)'; ell(c, -3, -3, 1.8, 1, -0.5); c.fill();
  } else {
    c.fillStyle = '#f2b45a'; ell(c, 0, 1, 9, 6.4); c.fill(); c.stroke();
    c.fillStyle = '#ffd98a'; ell(c, 0, -1, 7, 3.6); c.fill();
    c.fillStyle = '#ffffff'; for (const dx of [-4, 0, 4]) { ell(c, dx, -2, 1.2, 0.7); c.fill(); }
  }
  c.restore();
}
function thought(c, x, y, kind, t) {
  c.save(); const bob = Math.sin(t * 2.5) * 2;
  c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.1;
  circ(c, x - 10, y + 16 + bob, 2.2); c.fill(); c.stroke(); circ(c, x - 6, y + 10 + bob, 3.2); c.fill(); c.stroke();
  ell(c, x, y + bob, 15, 11); c.fill(); c.stroke();
  drawFoodItem(c, kind, x, y + bob, 0.9);
  c.restore();
}
function drawHippoSit(c, x, gy, t, eat) {
  c.save(); c.translate(x, gy); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.5;
  c.fillStyle = '#a89ad9'; ell(c, -4, -18, 22, 17); c.fill(); c.stroke();
  for (const lx of [-18, -4, 8]) { rr(c, lx - 4, -6, 9, 7, 3); c.fill(); c.stroke(); }
  ell(c, 16, -28, 14, 12); c.fill(); c.stroke();
  c.fillStyle = '#c4b8ec'; ell(c, 24, -24 + (eat ? Math.sin(t * 14) * 1.5 : 0), 10, 8); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 22, -26, 1.2); c.fill(); circ(c, 28, -26, 1.2); c.fill();
  c.fillStyle = '#fff'; circ(c, 12, -36, 3.4); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 13, -36, 1.6); c.fill();
  c.fillStyle = '#a89ad9'; circ(c, 6, -40, 3); c.fill(); c.stroke(); circ(c, 16, -42, 3); c.fill(); c.stroke();
  c.fillStyle = '#ff9fbf'; ell(c, 8, -28, 3, 1.8); c.fill();
  c.restore();
}
function drawGiraffeBody(c, a, m, t) {
  const x = a.x, gy = a.gy, hx = m.x + m.w * 0.55, hy = m.y + 10;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 12; c.beginPath(); c.moveTo(x + 6, gy - 46); c.lineTo(hx, hy); c.stroke();
  c.strokeStyle = '#ffc94d'; c.lineWidth = 9.6; c.stroke();
  const len = Math.hypot(hx - x - 6, hy - gy + 46), n = Math.floor(len / 14);
  c.fillStyle = '#c98d55'; for (let i = 1; i < n; i++) { const k = i / n; circ(c, x + 6 + (hx - x - 6) * k + (i % 2 ? 1.5 : -1.5), gy - 46 + (hy - gy + 46) * k, 2.4); c.fill(); }
  c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = '#ffc94d';
  for (const lx of [-14, -6, 6, 14]) { rr(c, x + lx - 2.6, gy - 30, 5.2, 30, 2); c.fill(); c.stroke(); }
  ell(c, x, gy - 36, 20, 12); c.fill(); c.stroke();
  c.fillStyle = '#c98d55'; for (const [dx, dy] of [[-10, -38], [2, -40], [10, -34], [-4, -32]]) { circ(c, x + dx, gy + dy, 2.6); c.fill(); }
  c.restore();
}
function drawElephant(c, a, t) {
  const x = a.x, gy = a.gy, spray = a.fed;
  c.save(); c.translate(x, gy); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.5;
  c.fillStyle = '#b8c4d9';
  for (const lx of [-16, -6, 6, 14]) { rr(c, lx - 4, -14, 9, 14, 3); c.fill(); c.stroke(); }
  ell(c, -2, -26, 22, 16); c.fill(); c.stroke();
  ell(c, 16, -34, 13, 12); c.fill(); c.stroke();
  c.fillStyle = '#d6dcea'; ell(c, 8, -32, 8, 11); c.fill(); c.stroke();
  c.fillStyle = '#b8c4d9'; c.lineWidth = 7; c.strokeStyle = INK;
  c.beginPath(); c.moveTo(25, -32); if (spray) c.quadraticCurveTo(34, -38, 32, -52); else c.quadraticCurveTo(32, -20, 26, -12); c.stroke();
  c.strokeStyle = '#b8c4d9'; c.lineWidth = 5; c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = '#fff'; circ(c, 18, -38, 2.6); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 18.6, -38, 1.2); c.fill();
  c.fillStyle = '#ff9fbf'; ell(c, 14, -30, 2.6, 1.6); c.fill();
  c.restore();
}
function drawFountain(c, z, t) {
  c.save();
  const cx = (z.x0 + z.x1) / 2, w = z.x1 - z.x0;
  const g = c.createLinearGradient(0, z.y, 0, z.y1); g.addColorStop(0, 'rgba(159,224,255,.25)'); g.addColorStop(1, 'rgba(76,182,255,.6)');
  c.fillStyle = g; rr(c, cx - w / 2 + 6, z.y + 10, w - 12, z.y1 - z.y - 10, 8); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1.6;
  for (let i = 0; i < 4; i++) { const k = ((t * 1.4 + i / 4) % 1); const yy = z.y1 - (z.y1 - z.y) * k; c.beginPath(); c.moveTo(cx - 8, yy); c.quadraticCurveTo(cx, yy - 6, cx + 8, yy); c.stroke(); }
  for (let i = 0; i < 6; i++) { const a = t * 3 + i, r = 10 + (i % 3) * 4; c.fillStyle = 'rgba(255,255,255,.9)'; circ(c, cx + Math.cos(a) * r, z.y + 8 + Math.sin(a * 1.3) * 5, 2); c.fill(); }
  c.restore();
}
function drawPeel(c, x, y, t, fall) {
  c.save(); c.translate(x, y); if (fall) c.rotate(t * 6); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = '#ffd23f';
  for (const a of [-0.9, 0, 0.9]) { c.save(); c.rotate(a); c.beginPath(); c.moveTo(0, -1); c.quadraticCurveTo(-3, -6, 0, -10); c.quadraticCurveTo(3, -6, 0, -1); c.fill(); c.stroke(); c.restore(); }
  c.fillStyle = '#fff3a8'; circ(c, 0, -1, 2.4); c.fill(); c.stroke();
  c.restore();
}
function drawWorld13(c, t, vis) {
  for (const z of G.winds) if (z.fountain && vis(z.x0, 60)) drawFountain(c, z, t);
  for (const a of G.animals) {
    if (!vis(a.x, 140)) continue;
    if (a.kind === 'hippo') {
      if (!a.fed) { drawHippoSit(c, a.x, a.gy, t, false); thought(c, a.x + 14, a.gy - 70, 'melon', t); }
      else if (a.m.state === 'gone') { const k = Math.min(1, a.walk / 1.4); c.save(); c.globalAlpha = 1 - k * 0.6; drawHippoSit(c, a.x + (a.m.x + a.m.w / 2 - a.x) * k, a.gy + 20 * k * k, t, true); c.restore(); }
    } else if (a.kind === 'giraffe') {
      drawGiraffeBody(c, a, a.m, t);
      if (!a.fed) thought(c, a.m.x + a.m.w + 26, a.m.y - 26, 'apple', t);
    } else {
      drawElephant(c, a, t);
      if (a.fed) {
        // струмінь із хобота падає в басейн, звідки б'є фонтан
        const sx = a.x + 32, sy = a.gy - 52, ex = (a.fx0 + a.fx1) / 2, ey = a.gy - 4, mx = (sx + ex) / 2, my = sy - 34;
        c.save(); c.lineCap = 'round'; c.strokeStyle = 'rgba(120,200,255,.8)'; c.lineWidth = 4; c.beginPath(); c.moveTo(sx, sy); c.quadraticCurveTo(mx, my, ex, ey); c.stroke();
        c.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) { const k = (t * 1.5 + i / 5) % 1, u = 1 - k; circ(c, u * u * sx + 2 * u * k * mx + k * k * ex, u * u * sy + 2 * u * k * my + k * k * ey, 1.8); c.fill(); }
        c.restore();
      }
      if (!a.fed) thought(c, a.x + 6, a.gy - 78, 'bun', t);
    }
  }
  for (const f of G.foods) if (f.state === 'idle' && vis(f.hx)) { drawFoodItem(c, f.kind, f.hx, f.hy + Math.sin(f.t * 3) * 2, 1); sparkle(c, f.hx + 9, f.hy - 9, 1.6, '#ffffff'); }
  for (const q of G.peels) if (vis(q.x)) drawPeel(c, q.x, q.y, q.t, q.fall);
  // під час мелодії над єдиноріжкою з'являється нота кольору барабана, що звучить (навіть якщо він за краєм екрана)
  for (const s of G.padSets) if (s.show) for (const d of s.drums) if (d.lit > 0) {
    const P = G.P, k = d.lit / 0.45, x = P.x + P.w / 2, y = P.y - 34 - (1 - k) * 8;
    c.save(); c.globalAlpha = Math.min(1, k * 1.6); c.fillStyle = DRUM_COLS[d.idx]; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, x, y, 10); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; c.font = '900 14px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('♪', x, y + 1); c.restore();
  }
  const B = G.boss;
  if (B && B.kind === 'monkey' && G.arena) {
    c.save(); c.strokeStyle = '#3a9a3a'; c.lineWidth = 3; c.beginPath();
    for (let x = G.arena.x0; x <= G.arena.x1; x += 12) { const y = B.top - 62 + Math.sin(x * 0.05) * 4; if (x === G.arena.x0) c.moveTo(x, y); else c.lineTo(x, y); }
    c.stroke(); c.fillStyle = '#6fcf5a';
    for (let x = G.arena.x0 + 10; x < G.arena.x1; x += 34) { const y = B.top - 62 + Math.sin(x * 0.05) * 4; ell(c, x, y + 4, 6, 3, 0.6); c.fill(); }
    c.restore();
  }
  drawWorld14(c, t, vis);
}
function drawCarry(c, P, t) { if (P.carry) drawFoodItem(c, P.carry.kind, P.carry.x, P.carry.y, 0.9); }

/* ===== Мавпочка Шкода ===== */
function drawMonkeyBoss(c, B, t) {
  const st = B.state, flash = B.flash > 0, happy = B.dead, d = B.dir || 1;
  const fur = flash ? '#fff' : '#9a6a40', face = '#f2d6a8', top = st === 'swing' || st === 'peel' || (st === 'climb' && B.fy < B.top + 40);
  c.save(); c.translate(B.x, B.fy); c.scale(d, 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.5;
  if (top && !happy) {
    // висить на ліані однією лапою
    c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(4, -26); c.lineTo(6, -58); c.stroke(); c.strokeStyle = fur; c.lineWidth = 4.6; c.stroke(); c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = face; circ(c, 6, -59, 3.6); c.fill(); c.stroke();
  }
  const dizzy = st === 'dizzy' || st === 'slip';
  if (dizzy) c.rotate(-1.2 + Math.sin(t * 4) * 0.08);
  // хвіст
  c.strokeStyle = fur; c.lineWidth = 3.4; c.beginPath(); c.moveTo(-10, -10); c.quadraticCurveTo(-26, -6 + Math.sin(t * 4) * 4, -22, -24); c.quadraticCurveTo(-18, -30, -14, -24); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = fur;
  const run = st === 'run' && B.st >= 0.5 ? Math.sin(t * 24) : 0;
  for (const [lx, s] of [[-6, 1], [5, -1]]) { c.save(); c.translate(lx, -8); c.rotate(run * 0.6 * s); rr(c, -2.6, 0, 5.2, 9, 2.4); c.fill(); c.stroke(); c.restore(); }
  ell(c, 0, -18, 12, 12); c.fill(); c.stroke();
  c.fillStyle = face; ell(c, 2, -15, 7, 7); c.fill();
  c.fillStyle = fur; if (!top || happy) { c.save(); c.translate(-9, -20); c.rotate(-0.6 + run * 0.5); rr(c, -2.4, 0, 4.8, 11, 2.4); c.fill(); c.stroke(); c.restore(); }
  c.save(); c.translate(10, -20); c.rotate(st === 'swing' && B.st > 0.6 ? -1.6 : 0.5 - run * 0.5); rr(c, -2.4, 0, 4.8, 11, 2.4); c.fill(); c.stroke(); c.restore();
  // голова
  c.save(); c.translate(4, -36);
  c.fillStyle = fur; circ(c, -12, -2, 5); c.fill(); c.stroke(); circ(c, 12, -2, 5); c.fill(); c.stroke();
  c.fillStyle = face; circ(c, -12, -2, 2.6); c.fill(); circ(c, 12, -2, 2.6); c.fill();
  c.fillStyle = fur; circ(c, 0, 0, 11); c.fill(); c.stroke();
  c.fillStyle = face; ell(c, 2, 3, 8.6, 7); c.fill(); ell(c, -3, -3, 3.6, 3.4); c.fill(); ell(c, 5, -3, 3.6, 3.4); c.fill();
  if (dizzy) {
    c.lineWidth = 1.3; for (const ex of [-3, 5]) { c.beginPath(); c.moveTo(ex - 2, -5); c.lineTo(ex + 2, -1); c.moveTo(ex + 2, -5); c.lineTo(ex - 2, -1); c.stroke(); }
    c.beginPath(); c.arc(2, 7, 2.4, 0, TAU); c.stroke();
  } else if (happy) {
    c.lineWidth = 1.4; for (const ex of [-3, 5]) { c.beginPath(); c.arc(ex, -2, 2, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); }
    c.beginPath(); c.arc(2, 4, 4, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();
  } else {
    c.fillStyle = INK; circ(c, -2.4, -3, 1.6); c.fill(); circ(c, 5.6, -3, 1.6); c.fill();
    c.lineWidth = 1.3; c.beginPath(); c.arc(2, 4, 4.4, 0.05 * Math.PI, 0.95 * Math.PI); c.stroke();
    c.fillStyle = '#ff7a95'; ell(c, 2, 7.4, 2.2, 1.4); c.fill();
  }
  c.fillStyle = INK; circ(c, 0.6, 2, 0.8); c.fill(); circ(c, 3.4, 2, 0.8); c.fill();
  c.restore();
  if (st === 'swing' && B.st > 0.4) { c.save(); c.translate(14, -28); c.rotate(-0.6); drawBanana(c, 0, 0, 0); c.restore(); }
  c.restore();
  if (dizzy) for (let i = 0; i < 3; i++) { const a = t * 4 + i * TAU / 3; c.fillStyle = '#ffd23f'; starPath(c, B.x + Math.cos(a) * 16, B.fy - 32 + Math.sin(a) * 5, 4, 1.8, a); c.fill(); c.strokeStyle = INK; c.lineWidth = 0.7; c.stroke(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, B.fy - 70 - k * 30, 9); c.fillStyle = ['#ff7ab8', '#ffd23f', '#ff5c8a'][i]; c.fill(); c.restore(); }
}

/* ===== Блоки ===== */
function drawBlock14(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'sailblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#d9a36c'; c.fill(); c.stroke();
    c.strokeStyle = '#ffffff'; c.lineWidth = 2.4; circ(c, 12, 12, 6.4); c.stroke(); c.strokeStyle = '#ff5c7a'; c.lineWidth = 2.4; c.setLineDash([3, 3.6]); circ(c, 12, 12, 6.4); c.stroke(); c.setLineDash([]);
  } else if (b === 'zooblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#e3b26b'; c.fill(); c.stroke();
    c.fillStyle = '#8a5a30'; ell(c, 12, 15, 4.2, 3.4); c.fill(); for (const [dx, dy] of [[-5, -3], [-1.6, -6.4], [2, -6.4], [5.4, -3]]) { circ(c, 12 + dx, 13 + dy, 1.6); c.fill(); }
  } else if (b === 'noteblock') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#c9b6ff'; c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; c.font = '900 14px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('♪', 12, 13);
  } else if (b === 'chestblock') {
    rr(c, 1, 3, T - 2, T - 4, 3); c.fillStyle = '#a8743f'; c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; c.fillRect(2, 9, T - 4, 3); rr(c, 9, 10, 6, 6, 1.5); c.fill(); c.stroke();
  } else if (b === 'bananablock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#7fcf6a'; c.fill(); c.stroke();
    c.save(); c.translate(12, 13); c.rotate(-0.5); drawBanana(c, 0, 0, 0); c.restore();
  } else return drawBlock15(c, b);
  return true;
}

/* ===== Декор ===== */
function drawDecor17(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'lifebuoy':
      c.lineWidth = 4; c.strokeStyle = '#ffffff'; circ(c, x, y - 8, 6); c.stroke(); c.strokeStyle = '#ff5c7a'; c.setLineDash([3, 3.2]); c.stroke(); c.setLineDash([]);
      c.strokeStyle = INK; c.lineWidth = 0.8; circ(c, x, y - 8, 8); c.stroke(); circ(c, x, y - 8, 4); c.stroke();
      break;
    case 'pawprint':
      c.fillStyle = 'rgba(138,90,48,.55)'; ell(c, x, y - 2, 3.4, 2); c.fill(); for (const dx of [-3, 0, 3]) { circ(c, x + dx, y - 5, 1.1); c.fill(); }
      break;
    case 'bananaS':
      c.strokeStyle = '#3a9a3a'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 16); c.stroke();
      c.fillStyle = '#6fcf5a'; c.strokeStyle = INK; c.lineWidth = 0.7; ell(c, x - 6, y - 17, 7, 2.4, 0.5); c.fill(); c.stroke(); ell(c, x + 6, y - 17, 7, 2.4, -0.5); c.fill(); c.stroke();
      c.save(); c.translate(x + 2, y - 12); c.rotate(0.3); c.scale(0.7, 0.7); drawBanana(c, 0, 0, 0); c.restore();
      break;
    case 'gemS2':
      c.fillStyle = d.c || '#ff7ab8'; c.beginPath(); c.moveTo(x, y - 10); c.lineTo(x + 5, y - 5); c.lineTo(x, y); c.lineTo(x - 5, y - 5); c.closePath(); c.fill(); c.stroke();
      sparkle(c, x + 4, y - 10, 1.4, '#ffffff');
      break;
    default: drawDecor18(c, d, t);
  }
}

/* ===== Фони ===== */
function bgSailake(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 200 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 160, 14, 0.01, 0.3, camX * 0.1, '#9fd8b0');
  c.fillStyle = '#6ac4f0'; c.fillRect(0, 172, viewW, VIEW_H - 172);
  const span = 300;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 80, by = 176 + Math.sin(t * 1.5 + i) * 1.5;
    c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(wx, by - 4); c.lineTo(wx, by - 40); c.lineTo(wx + 22, by - 6); c.closePath(); c.fill();
    c.fillStyle = ['#ff9fd0', '#ffd23f', '#9fe0ff'][((i % 3) + 3) % 3]; c.beginPath(); c.moveTo(wx - 2, by - 6); c.lineTo(wx - 2, by - 32); c.lineTo(wx - 18, by - 8); c.closePath(); c.fill();
    c.fillStyle = '#c98d55'; c.beginPath(); c.moveTo(wx - 20, by - 4); c.lineTo(wx + 26, by - 4); c.lineTo(wx + 18, by + 2); c.lineTo(wx - 14, by + 2); c.closePath(); c.fill();
  }
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1.4;
  for (let row = 0; row < 3; row++) { c.beginPath(); for (let x = -20; x < viewW + 20; x += 6) { const y = 190 + row * 14 + Math.sin(x * 0.05 + t * 1.6 + row * 2) * 2; if (x === -20) c.moveTo(x, y); else c.lineTo(x, y); } c.stroke(); }
}
function bgZoo(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 180, 10, 0.012, 0.5, camX * 0.12, '#d6eaa8');
  const span = 240;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 30;
    c.fillStyle = '#c98d55'; c.fillRect(wx, 150, 6, 60); c.fillRect(wx + 110, 150, 6, 60); c.fillRect(wx, 150, 116, 6);
    c.fillStyle = '#ffffff'; rr(c, wx + 20, 120, 76, 26, 6); c.fill(); c.fillStyle = '#ff9fc4'; ell(c, wx + 58, 136, 6, 5); c.fill(); for (const [dx, dy] of [[-8, -5], [-3, -9], [3, -9], [8, -5]]) { circ(c, wx + 58 + dx, 136 + dy, 2.4); c.fill(); }
    c.strokeStyle = 'rgba(138,90,48,.6)'; c.lineWidth = 2; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(wx + 10 + k * 18, 160); c.lineTo(wx + 10 + k * 18, 210); c.stroke(); }
    c.fillStyle = '#7fcf5a'; circ(c, wx + 170, 150, 26); c.fill(); circ(c, wx + 150, 162, 18); c.fill(); c.fillStyle = '#8a5a30'; c.fillRect(wx + 166, 168, 8, 44);
  }
  hill(c, viewW, 212, 6, 0.03, 1.2, camX * 0.45, '#c0e88a');
}
function bgSongMeadow(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 200 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 36 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 186, 12, 0.012, 0.4, camX * 0.12, '#d6c6f5');
  c.font = '900 16px Nunito, system-ui, sans-serif'; c.textAlign = 'center';
  for (let i = 0; i < 9; i++) { const x = wrapX(i * 120 - camX * 0.25 + Math.sin(t + i) * 10, viewW + 40) - 20, y = 70 + (i % 4) * 22 + Math.sin(t * 1.5 + i) * 8; c.fillStyle = ['rgba(255,122,184,.6)', 'rgba(76,182,255,.6)', 'rgba(255,210,63,.7)', 'rgba(127,212,106,.6)'][i % 4]; c.fillText(i % 2 ? '♪' : '♫', x, y); }
  hill(c, viewW, 212, 6, 0.03, 1.2, camX * 0.45, '#b0ecc0');
}
function bgTreasure(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 32 + (i % 2) * 20, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 260;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span) + 60;
    c.fillStyle = '#d9b380'; c.beginPath(); c.moveTo(wx - 110, 210); c.quadraticCurveTo(wx, 70, wx + 110, 210); c.closePath(); c.fill();
    c.fillStyle = '#8a5a30'; ell(c, wx, 196, 16, 14); c.fill();
    c.fillStyle = '#ffd23f'; for (let k = 0; k < 3; k++) { const a = t * 2 + k * 2; circ(c, wx - 30 + k * 30, 150 + Math.sin(a) * 2, 2); c.fill(); }
  }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#c8e08a');
}
function bgBananaGrove(c, viewW, camX, t) {
  hill(c, viewW, 176, 14, 0.01, 0.3, camX * 0.1, '#bfeccf');
  const span = 150;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 30;
    c.fillStyle = '#a8865a'; c.beginPath(); c.moveTo(wx - 5, 214); c.quadraticCurveTo(wx + 4, 150, wx, 100); c.lineTo(wx + 8, 100); c.quadraticCurveTo(wx + 12, 150, wx + 5, 214); c.closePath(); c.fill();
    c.fillStyle = '#5fbf5a'; for (let k = 0; k < 5; k++) { c.save(); c.translate(wx + 4, 100); c.rotate(-1.4 + k * 0.7 + Math.sin(t + i + k) * 0.05); ell(c, 0, -26, 8, 28); c.fill(); c.restore(); }
    c.fillStyle = '#ffd23f'; for (let k = 0; k < 3; k++) { c.save(); c.translate(wx + 2 + k * 4, 112 + k * 2); c.rotate(0.4); ell(c, 0, 0, 2.6, 7); c.fill(); c.restore(); }
  }
  hill(c, viewW, 212, 6, 0.03, 1.2, camX * 0.45, '#9fe08a');
}
Object.assign(BG2, { sailake: bgSailake, zoo: bgZoo, songmeadow: bgSongMeadow, treasure: bgTreasure, bananagrove: bgBananaGrove });
