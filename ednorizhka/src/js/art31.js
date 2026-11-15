'use strict';
/* ===== Частина 32 «Пригоди без меж»: теми на основі старих фонів і Хмара Буркотуха ===== */
Object.assign(THEMES, {
  skyharbor: Object.assign({}, THEMES.balloons, { sky: ['#9fd8ff', '#d4f0ff', '#fff4e0'] }),
  gemmine: Object.assign({}, THEMES.mine, { dots: ['#ff7ab8', '#7fffd4', '#ffe14d'] }),
  aquapark: Object.assign({}, THEMES.lagoon, { sky: ['#8fe0ff', '#c8f4ff', '#fff6e0'] }),
  toyworks: Object.assign({}, THEMES.toys, { sky: ['#ffe0ec', '#fff0f4', '#fffaf6'] }),
  stormcastle: Object.assign({}, THEMES.clouds, { sky: ['#8a9ac8', '#b8c4e4', '#e4e8f8'] }),
});
Object.assign(BG2, {
  skyharbor: (c, viewW, camX, t) => drawBackground(c, 'balloons', camX, viewW, t, 0),
  gemmine: (c, viewW, camX, t) => drawBackground(c, 'mine', camX, viewW, t, 0),
  aquapark: (c, viewW, camX, t) => drawBackground(c, 'lagoon', camX, viewW, t, 0),
  toyworks: (c, viewW, camX, t) => drawBackground(c, 'toys', camX, viewW, t, 0),
  stormcastle: (c, viewW, camX, t) => drawBackground(c, 'clouds', camX, viewW, t, 0),
});

/* ===== Хмара Буркотуха ===== */
function drawGrumpBoss(c, B, t) {
  const tired = B.state === 'tired' && !B.dead, fl = B.flash > 0, x = B.x, y = B.y;
  const body = fl ? '#ffffff' : B.dead || tired ? '#e8eef8' : B.state === 'thunder' ? '#5a6488' : '#7a86a8';
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.8;
  // дощ під хмарою, коли літає
  if (B.state === 'fly') { c.strokeStyle = 'rgba(120,180,255,.7)'; c.lineWidth = 1.6; for (let i = 0; i < 6; i++) { const rx = -30 + i * 12, ry = 22 + ((t * 90 + i * 13) % 26); c.beginPath(); c.moveTo(rx, ry); c.lineTo(rx - 2, ry + 6); c.stroke(); } c.strokeStyle = INK; c.lineWidth = 1.8; }
  // хмара з кількох кругів
  c.fillStyle = body;
  c.beginPath(); c.arc(-22, 4, 16, 0, TAU); c.arc(0, -8, 22, 0, TAU); c.arc(24, 2, 17, 0, TAU); c.arc(4, 10, 18, 0, TAU); c.fill();
  c.beginPath(); c.arc(-22, 4, 16, Math.PI * 0.5, Math.PI * 1.55); c.arc(0, -8, 22, Math.PI * 1.15, Math.PI * 1.95); c.arc(24, 2, 17, Math.PI * 1.45, Math.PI * 0.5); c.stroke();
  c.beginPath(); c.moveTo(-22, 20); c.quadraticCurveTo(4, 32, 24, 19); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.35)'; ell(c, -8, -18, 10, 5, -0.3); c.fill();
  // обличчя
  if (tired) { c.lineWidth = 1.6; c.beginPath(); c.arc(-9, -2, 4, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); c.beginPath(); c.arc(9, -2, 4, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }
  else { c.fillStyle = '#ffffff'; ell(c, -9, -3, 5, 6); c.fill(); ell(c, 9, -3, 5, 6); c.fill(); c.fillStyle = INK; circ(c, -9 + B.dir * 1.5, -2, 2.6); c.fill(); circ(c, 9 + B.dir * 1.5, -2, 2.6); c.fill();
    c.lineWidth = 2.2; c.beginPath(); c.moveTo(-15, -12); c.lineTo(-4, -9); c.moveTo(15, -12); c.lineTo(4, -9); c.stroke(); }
  c.lineWidth = 1.8; c.beginPath();
  if (B.dead || tired) c.arc(0, 8, 6, 0.1 * Math.PI, 0.9 * Math.PI); else if (B.state === 'thunder') { c.moveTo(-7, 12); c.lineTo(-3, 9); c.lineTo(1, 12); c.lineTo(5, 9); c.lineTo(8, 12); } else { c.moveTo(-8, 12); c.quadraticCurveTo(0, 6, 8, 12); }
  c.stroke();
  if (B.dead || tired) { c.fillStyle = 'rgba(255,140,180,.55)'; circ(c, -17, 6, 3.4); c.fill(); circ(c, 17, 6, 3.4); c.fill(); }
  // блискавка під час грому
  if (B.state === 'thunder' && Math.sin(t * 30) > 0) { c.fillStyle = '#ffe14d'; c.beginPath(); c.moveTo(30, 10); c.lineTo(22, 26); c.lineTo(28, 26); c.lineTo(20, 42); c.lineTo(36, 22); c.lineTo(30, 22); c.lineTo(36, 10); c.closePath(); c.fill(); c.lineWidth = 1; c.stroke(); }
  // веселка, коли втомилася
  if (tired || B.dead) { c.lineWidth = 3; for (let i = 0; i < 5; i++) { c.strokeStyle = RAINBOW[i]; c.beginPath(); c.arc(0, -10, 40 - i * 3, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); } }
  c.restore();
  if (tired) txt24(c, 'z', x + 30, y - 40 - (t * 10) % 10, 12, '#5a6aa8', '#ffffff', 2);
}
