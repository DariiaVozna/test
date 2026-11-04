'use strict';
/* ===== Частина 19: Лелечий хутір, Пого-парк, Надувне містечко, Хмаринкова майстерня, Капустяний город ===== */
Object.assign(THEMES, {
  storks: { sky: ['#a8dcff', '#d9f0ff', '#fffbe8'], panel: '#24506f', top: '#8fd86a', topHi: '#c0f09a', topLo: '#5fb04a', fill: '#c9a06a', fillLo: '#a8824f', dots: ['#d9b380', '#8a6a3a', '#e8cfa6'], block: 'nestblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  pogopark: { sky: ['#ffd0ea', '#ffeaf6', '#fffaf2'], panel: '#5a2050', top: '#9fe07a', topHi: '#c9f5a8', topLo: '#6ab84a', fill: '#e6a8d0', fillLo: '#d48cbf', dots: ['#ffffff', '#ffd6f0', '#b48cff'], block: 'springblock', ice: false, topStyle: 'grass', dotShape: 'dot' },
  inflatables: { sky: ['#bfeaff', '#e6f7ff', '#fffef0'], panel: '#1f4a6a', top: '#7fd46a', topHi: '#b4f0a0', topLo: '#4fb04a', fill: '#9fc4f0', fillLo: '#86afe3', dots: ['#ffffff', '#ffd23f', '#ff9fc4'], block: 'rubberblock', ice: false, topStyle: 'grass', dotShape: 'dot' },
  cloudshop: { sky: ['#9fc0ff', '#cfdcff', '#ffeefa'], panel: '#2a3a7a', top: '#ffffff', topHi: '#ffffff', topLo: '#dfe6ff', fill: '#c4cff5', fillLo: '#afbcec', dots: ['#ffffff', '#e8edff', '#ffd6f0'], block: 'cloudbox', ice: false, topStyle: 'snow', dotShape: 'dot' },
  cabbage: { sky: ['#cdf2c0', '#ebfae2', '#fffde6'], panel: '#2a4a1a', top: '#7fcf5a', topHi: '#b0ef8a', topLo: '#4f9f3a', fill: '#8a5a30', fillLo: '#6a4424', dots: ['#a8743f', '#5a3a24', '#c98d55'], block: 'cabbageblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
});

/* ===== Вороги ===== */
function drawLadybug(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.1;
  for (const lx of [-6, 0, 6]) { c.beginPath(); c.moveTo(lx, -3); c.lineTo(lx - 2 + Math.sin(t * 16 + lx) * 1.5, 0); c.stroke(); }
  c.fillStyle = flash ? '#fff' : '#ff4f5e'; c.beginPath(); c.arc(0, -4, 10, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(0, -14); c.lineTo(0, -4); c.stroke();
  c.fillStyle = INK; for (const [sx, sy] of [[-5, -9], [4, -10], [-6, -5], [6, -6]]) { circ(c, sx, sy, 1.6); c.fill(); }
  c.fillStyle = INK; circ(c, 10, -6, 4); c.fill();
  c.fillStyle = '#fff'; circ(c, 11.4, -7, 1.2); c.fill();
  c.restore();
}
function drawButterflyFoe(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 0.9;
  const f = Math.abs(Math.sin(t * 9));
  for (const s of [-1, 1]) {
    c.save(); c.scale(1, 1); c.rotate(s * 0.15);
    c.fillStyle = flash ? '#fff' : s < 0 ? '#ffb347' : '#ff7ab8';
    c.beginPath(); c.ellipse(-2, s * 6 * (0.4 + f * 0.6), 8, 6 * (0.4 + f * 0.6), -0.5 * s, 0, TAU); c.fill(); c.stroke();
    c.restore();
  }
  c.fillStyle = '#5a3a6a'; ell(c, 0, 0, 7, 2.2); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(6, -1); c.quadraticCurveTo(10, -6, 12, -5); c.moveTo(6, 0); c.quadraticCurveTo(11, -2, 12, -1); c.stroke();
  c.restore();
}
function drawEnemy15(c, e, cx, fl) {
  switch (e.k) {
    case 'ladybug': drawLadybug(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
    case 'butterfly': drawButterflyFoe(c, cx, e.y + e.h / 2, e.t, e.dir, fl); return true;
  }
  return drawEnemy16(c, e, cx, fl);
}

/* ===== Плитки: надувний місток (41 — здутий, 42 — надутий) ===== */
Object.assign(TILE7, { rubberFlat: 1, rubberFull: 1 });
function tileKind15(v) { return v === 42 ? 'rubberFull' : 'rubberFlat'; }
function drawTile15(c, kind) {
  c.lineJoin = 'round'; c.lineCap = 'round';
  if (kind === 'rubberFull') {
    c.fillStyle = '#ff7ab8'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, -1, 2, T + 2, T - 6, 9); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; c.fillRect(0, 9, T, 4);
    c.fillStyle = 'rgba(255,255,255,.55)'; ell(c, 8, 6, 6, 2, -0.1); c.fill();
  } else if (kind === 'rubberFlat') {
    c.strokeStyle = 'rgba(214,90,150,.75)'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 6); c.quadraticCurveTo(T / 2, 14, T, 6); c.stroke();
    c.strokeStyle = 'rgba(255,210,63,.8)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, 7); c.quadraticCurveTo(T / 2, 15, T, 7); c.stroke();
  }
}

/* ===== Рухомі: лелека, насос, надувна кулька-ліфт, хмаринка ===== */
function drawStork(c, m, t) {
  const fly = m.state === 'fly' || m.state === 'back', d = m.face || 1, cx = m.x + m.w / 2, y = m.y;
  c.save(); c.translate(cx, y); c.scale(d, 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  // ноги
  c.strokeStyle = '#ff7a3d'; c.lineWidth = 2.2; c.beginPath();
  if (fly) { c.moveTo(-6, 12); c.lineTo(-30, 18); c.moveTo(-2, 12); c.lineTo(-28, 21); }
  else { c.moveTo(-5, 14); c.lineTo(-6, 26); c.moveTo(4, 14); c.lineTo(5, 26); }
  c.stroke(); c.strokeStyle = INK; c.lineWidth = 1.4;
  // крила
  const f = fly ? Math.sin(m.flap) : 0.1;
  c.fillStyle = '#ffffff';
  c.save(); c.translate(-2, 2); c.rotate(-0.3 - f * 0.9); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-14, -24, -30, -14); c.quadraticCurveTo(-18, -4, 0, 4); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#3b3060'; c.beginPath(); c.moveTo(-22, -16); c.quadraticCurveTo(-28, -16, -30, -14); c.quadraticCurveTo(-26, -9, -20, -8); c.closePath(); c.fill(); c.restore();
  // тулуб (спинка — верх, на ній стоїть єдиноріжка)
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-24, 4); c.quadraticCurveTo(-20, -2, 0, 0); c.quadraticCurveTo(20, -2, 22, 6); c.quadraticCurveTo(18, 16, 0, 16); c.quadraticCurveTo(-16, 16, -24, 4); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#3b3060'; c.beginPath(); c.moveTo(-24, 4); c.lineTo(-30, 2); c.lineTo(-26, 9); c.closePath(); c.fill(); c.stroke();
  // шия й голова
  c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(18, 6); c.quadraticCurveTo(30, -2, 28, -18); c.stroke();
  c.strokeStyle = '#ffffff'; c.lineWidth = 3.8; c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = '#ffffff'; circ(c, 28, -21, 5.4); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 30, -22, 1.2); c.fill();
  c.fillStyle = '#ff7a3d'; c.beginPath(); c.moveTo(32, -23); c.lineTo(46, -19); c.lineTo(32, -18); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,120,170,.5)'; circ(c, 27, -18, 1.4); c.fill();
  c.restore();
}
function drawPump(c, m, t) {
  const x = m.x, w = m.w, cx = x + w / 2, gy = m.gy || m.y + 22, push = m.press > 0 ? 6 * (m.press / 0.25) : 0, hy = m.y + push;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  // шланг до того, що накачуємо
  const tg = m.target; if (tg) { const tx = tg.lift19 ? tg.x + tg.w / 2 : tg.tiles[0][0] * T + 4, ty = tg.lift19 ? tg.y + 10 : (tg.tiles[0][1] + 1) * T; c.strokeStyle = '#4cb6ff'; c.lineWidth = 3; c.beginPath(); c.moveTo(cx + 8, gy - 6); c.quadraticCurveTo((cx + tx) / 2, gy + 6, tx, ty); c.stroke(); c.strokeStyle = INK; c.lineWidth = 1.4; }
  c.fillStyle = '#ff5c7a'; rr(c, cx - 8, gy - 18, 16, 18, 4); c.fill(); c.stroke();
  c.fillStyle = '#c9d2e6'; c.fillRect(cx - 1.5, hy + 4, 3, gy - 18 - hy - 4);
  c.strokeRect(cx - 1.5, hy + 4, 3, Math.max(0, gy - 18 - hy - 4));
  c.fillStyle = '#ffd23f'; rr(c, x + 2, hy, w - 4, 6, 3); c.fill(); c.stroke();
  for (let i = 0; i < 3; i++) { c.fillStyle = i < m.level ? '#7fd46a' : '#ffffff'; circ(c, cx - 5 + i * 5, gy - 10, 1.8); c.fill(); c.lineWidth = 0.8; c.stroke(); c.lineWidth = 1.4; }
  c.restore();
}
function drawLift19(c, m, t) {
  const cx = m.x + m.w / 2, k = Math.min(1, m.level / 3), r = 6 + k * 20, by = m.y - 14 - r;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = '#8a5a30'; c.lineWidth = 1.1;
  c.beginPath(); c.moveTo(m.x + 4, m.y); c.lineTo(cx - r * 0.5, by + r * 0.8); c.moveTo(m.x + m.w - 4, m.y); c.lineTo(cx + r * 0.5, by + r * 0.8); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = ['#ffb3d6', '#ff9fd0', '#ff7ab8', '#ff5c9a'][m.level] || '#ff5c9a';
  if (k < 0.34) { c.beginPath(); c.moveTo(cx - 6, m.y - 4); c.quadraticCurveTo(cx - 9, by, cx, by - 4); c.quadraticCurveTo(cx + 9, by, cx + 6, m.y - 4); c.closePath(); c.fill(); c.stroke(); }
  else { ell(c, cx, by, r, r * 1.1); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.5)'; ell(c, cx - r * 0.4, by - r * 0.4, r * 0.25, r * 0.15, -0.6); c.fill(); }
  c.fillStyle = '#d9a36c'; c.strokeStyle = INK; rr(c, m.x, m.y, m.w, 12, 3); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(90,58,36,.5)'; c.lineWidth = 1; c.beginPath(); for (let k2 = 6; k2 < m.w; k2 += 7) { c.moveTo(m.x + k2, m.y + 2); c.lineTo(m.x + k2, m.y + 10); } c.stroke();
  c.restore();
}
function drawTmpCloud(c, m, t) {
  if (m.state === 'gone') return;
  c.save(); if (m.life < 1) c.globalAlpha = 0.45 + 0.55 * Math.abs(Math.sin(t * 14));
  const x = m.x, y = m.y, w = m.w;
  c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(x + 4, y + 10); c.arc(x + 10, y + 6, 7, Math.PI * 0.9, Math.PI * 1.7); c.arc(x + w / 2, y + 2, 9, Math.PI * 1.15, Math.PI * 1.85); c.arc(x + w - 10, y + 6, 7, Math.PI * 1.3, Math.PI * 0.1); c.lineTo(x + 4, y + 12); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#e6ecff'; rr(c, x + 4, y + 8, w - 8, 5, 2.5); c.fill();
  c.restore();
}
function drawMover15(c, m) {
  if (m.stork) { drawStork(c, m, G.t); return true; }
  if (m.pump) { drawPump(c, m, G.t); return true; }
  if (m.lift19) { drawLift19(c, m, G.t); return true; }
  if (m.tmpCloud) { drawTmpCloud(c, m, G.t); return true; }
  return drawMover16(c, m);
}

/* ===== Світ: стовпчики містків, капуста на арені ===== */
function drawCabbage(c, x, gy, s) {
  c.save(); c.translate(x, gy); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#7fcf5a'; ell(c, -18, -16, 18, 16, -0.4); c.fill(); c.stroke(); ell(c, 18, -16, 18, 16, 0.4); c.fill(); c.stroke();
  c.fillStyle = '#a8e88a'; circ(c, 0, -26, 24); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(59,110,40,.6)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, -4); c.quadraticCurveTo(-4, -26, 0, -46); c.moveTo(-6, -8); c.quadraticCurveTo(-18, -24, -14, -40); c.moveTo(6, -8); c.quadraticCurveTo(18, -24, 14, -40); c.stroke();
  c.restore();
}
function drawWorld15(c, t, vis) {
  for (const b of G.bridges19) {
    const [x0, y0] = b.tiles[0], [x1] = b.tiles[b.tiles.length - 1];
    for (const px of [x0 * T - 3, (x1 + 1) * T + 3]) if (vis(px)) { c.fillStyle = '#c98d55'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, px - 3, y0 * T - 6, 6, 3 * T, 2); c.fill(); c.stroke(); }
    if (b.on && b.t < 2.5 && Math.sin(t * 16) > 0) { c.fillStyle = 'rgba(255,255,255,.45)'; c.fillRect(x0 * T, y0 * T + 2, (x1 - x0 + 1) * T, T - 6); }
  }
  const B = G.boss;
  if (B && B.kind === 'caterpillar' && G.arena) { drawCabbage(c, G.arena.x0 + 6, B.gy, 1.1); drawCabbage(c, G.arena.x1 - 6, B.gy, 1.1); }
  drawWorld16(c, t, vis);
}
function drawUnder15(c, P, t) {
  if (P.pogoT > 0) {
    const x = P.x + P.w / 2, y = P.y + P.h;
    c.save(); c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 3.4; c.beginPath(); c.moveTo(x, y - 18); c.lineTo(x, y + 12); c.stroke();
    c.strokeStyle = '#4cb6ff'; c.lineWidth = 2; c.stroke();
    c.strokeStyle = '#ffd23f'; c.lineWidth = 1.6; c.beginPath(); for (let k = 0; k < 4; k++) { c.moveTo(x - 4, y + 2 + k * 2.6); c.lineTo(x + 4, y + 3.3 + k * 2.6); } c.stroke();
    c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 8, y - 2); c.lineTo(x + 8, y - 2); c.stroke();
    c.fillStyle = '#ff5c7a'; circ(c, x, y + 13, 2.6); c.fill();
    c.restore();
  }
  drawUnder16(c, P, t);
}
function drawOver15(c, P, t) {
  if (P.cloudN > 0) for (let i = 0; i < P.cloudN; i++) { const x = P.x + P.w / 2 - 12 + i * 12, y = P.y - 30; c.save(); c.globalAlpha = 0.95; c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 0.8; circ(c, x - 2.4, y, 3); c.fill(); c.stroke(); circ(c, x + 2.4, y, 3); c.fill(); c.stroke(); circ(c, x, y - 2, 3.4); c.fill(); c.restore(); }
  drawOver16(c, P, t);
}
function drawPowerIcon19(c, kind, t) {
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1;
  if (kind === 'pogo') {
    c.lineWidth = 2.6; c.beginPath(); c.moveTo(0, -8); c.lineTo(0, 7); c.stroke(); c.strokeStyle = '#4cb6ff'; c.lineWidth = 1.4; c.stroke();
    c.strokeStyle = '#ffd23f'; c.lineWidth = 1.2; c.beginPath(); for (let k = 0; k < 3; k++) { c.moveTo(-3, 1 + k * 2); c.lineTo(3, 2 + k * 2); } c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-5, -3); c.lineTo(5, -3); c.moveTo(-4, -8); c.lineTo(4, -8); c.stroke();
  } else if (kind === 'cloud') {
    c.fillStyle = 'rgba(220,235,255,.8)'; rr(c, -5, -6, 10, 13, 3); c.fill(); c.stroke();
    c.fillStyle = '#c98d55'; rr(c, -2.6, -9, 5.2, 3.4, 1); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; circ(c, -1.6, 1, 2.4); c.fill(); circ(c, 1.8, 1, 2.4); c.fill(); circ(c, 0, -1, 2.6); c.fill();
  } else drawPowerIcon20(c, kind, t);
}

/* ===== Гусениця Ненажерка ===== */
function drawLeafBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(b.t * 7); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = '#7fd46a'; c.beginPath(); c.moveTo(-8, 0); c.quadraticCurveTo(0, -7, 8, 0); c.quadraticCurveTo(0, 7, -8, 0); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#3f8a2a'; c.beginPath(); c.moveTo(-7, 0); c.lineTo(7, 0); c.stroke();
  c.restore();
}
function drawCaterpillarBoss(c, B, t) {
  const fl = B.flash > 0;
  if (B.dead) {
    // стала метеликом
    const k = Math.min(1, B.deadT / 0.8), x = B.x, y = B.gy - 40 - k * 30 + Math.sin(t * 3) * 4;
    c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
    const f = 0.5 + 0.5 * Math.abs(Math.sin(t * 6));
    for (const s of [-1, 1]) {
      c.fillStyle = ['#ff7ab8', '#ffb347'][s < 0 ? 0 : 1];
      c.beginPath(); c.ellipse(x + s * 16 * f, y - 10, 16 * f, 14, s * 0.4, 0, TAU); c.fill(); c.stroke();
      c.fillStyle = ['#b48cff', '#4cb6ff'][s < 0 ? 0 : 1];
      c.beginPath(); c.ellipse(x + s * 12 * f, y + 10, 11 * f, 9, -s * 0.3, 0, TAU); c.fill(); c.stroke();
      c.fillStyle = '#fff3a8'; circ(c, x + s * 16 * f, y - 10, 4 * f); c.fill();
    }
    c.fillStyle = '#7fd46a'; ell(c, x, y, 4, 16); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; circ(c, x - 2, y - 12, 2); c.fill(); circ(c, x + 2, y - 12, 2); c.fill(); c.fillStyle = INK; circ(c, x - 2, y - 12, 1); c.fill(); circ(c, x + 2, y - 12, 1); c.fill();
    c.beginPath(); c.moveTo(x - 1, y - 16); c.quadraticCurveTo(x - 6, y - 26, x - 9, y - 26); c.moveTo(x + 1, y - 16); c.quadraticCurveTo(x + 6, y - 26, x + 9, y - 26); c.stroke();
    c.restore();
    for (let i = 0; i < 3; i++) { const kk = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - kk; heartPath(c, x + (i - 1) * 22, y - 40 - kk * 30, 9); c.fillStyle = ['#ff7ab8', '#ffd23f', '#7fd46a'][i]; c.fill(); c.restore(); }
    return;
  }
  const segs = catSegs(B);
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  for (let i = segs.length - 1; i >= 0; i--) {
    const s = segs[i]; if (!s.shown) continue;
    c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.moveTo(s.x - 5, s.y + 8); c.lineTo(s.x - 6 + Math.sin(t * 12 + i) * 2, B.gy); c.moveTo(s.x + 5, s.y + 8); c.lineTo(s.x + 6 - Math.sin(t * 12 + i) * 2, B.gy); c.stroke();
    c.lineWidth = 1.4; c.fillStyle = fl ? '#fff' : i % 2 ? '#7fd46a' : '#9fe07a'; circ(c, s.x, s.y, s.r); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; circ(c, s.x - 3, s.y - 5, 3); c.fill(); c.fillStyle = 'rgba(255,255,255,.4)'; ell(c, s.x - 4, s.y - 8, 4, 2, -0.4); c.fill();
  }
  if (B.headShown) {
    const hx = B.x, hy = B.y, d = B.dir || -1, munch = B.state === 'munch';
    c.save(); c.translate(hx, hy); c.scale(-d, 1);
    if (B.rear > 0) { c.fillStyle = fl ? '#fff' : '#7fd46a'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, -8, 6, 16, B.rear * 26, 6); c.fill(); c.stroke(); }
    c.fillStyle = fl ? '#fff' : '#5fbf4a'; c.strokeStyle = INK; c.lineWidth = 1.5; circ(c, 0, 0, 16); c.fill(); c.stroke();
    c.lineWidth = 1.4; c.beginPath(); c.moveTo(-4, -14); c.quadraticCurveTo(-10, -26, -14, -26); c.moveTo(4, -14); c.quadraticCurveTo(4, -28, 0, -30); c.stroke();
    c.fillStyle = '#ff7ab8'; circ(c, -14, -26, 3); c.fill(); c.stroke(); circ(c, 0, -30, 3); c.fill(); c.stroke();
    if (munch) {
      c.lineWidth = 1.4; c.beginPath(); c.arc(-7, -4, 2.6, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); c.beginPath(); c.arc(3, -4, 2.6, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke();
      c.save(); c.translate(-12, 7); c.rotate(Math.sin(t * 10) * 0.2); c.fillStyle = '#a8e88a'; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-10, -10, -18, 0); c.quadraticCurveTo(-10, 10, 0, 0); c.closePath(); c.fill(); c.stroke(); c.restore();
      c.fillStyle = INK; ell(c, -4, 7 + Math.sin(t * 14) * 1.2, 4, 2.4); c.fill();
    } else {
      c.fillStyle = '#ffffff'; circ(c, -7, -4, 4.6); c.fill(); c.stroke(); circ(c, 3, -4, 4.6); c.fill(); c.stroke();
      c.fillStyle = INK; circ(c, -8.4, -3.6, 2.2); c.fill(); circ(c, 1.6, -3.6, 2.2); c.fill();
      c.fillStyle = '#fff'; circ(c, -9, -4.6, 0.8); c.fill(); circ(c, 1, -4.6, 0.8); c.fill();
      c.lineWidth = 1.4; c.beginPath(); c.arc(-3, 6, 4, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();
    }
    c.fillStyle = 'rgba(255,110,170,.55)'; circ(c, -12, 4, 2.4); c.fill(); circ(c, 9, 4, 2.4); c.fill();
    c.restore();
  }
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock16(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'nestblock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#d9a36c'; c.fill(); c.stroke();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1.2; c.beginPath(); for (let k = 0; k < 4; k++) { c.moveTo(2, 5 + k * 5); c.quadraticCurveTo(12, 2 + k * 5, 22, 6 + k * 5); } c.stroke();
  } else if (b === 'springblock') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#b48cff'; c.fill(); c.stroke();
    c.strokeStyle = '#ffffff'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(6, 18); for (let k = 0; k < 5; k++) c.lineTo(k % 2 ? 6 : 18, 16 - k * 2.6); c.stroke();
  } else if (b === 'rubberblock') {
    rr(c, 1, 1, T - 2, T - 2, 8); c.fillStyle = '#4cb6ff'; c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; c.fillRect(2, 10, T - 4, 4); c.fillStyle = 'rgba(255,255,255,.55)'; ell(c, 8, 6, 5, 2, -0.2); c.fill();
  } else if (b === 'cloudbox') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#e6c8a8'; c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; circ(c, 9, 12, 4); c.fill(); circ(c, 15, 12, 4); c.fill(); circ(c, 12, 9, 4.6); c.fill();
  } else if (b === 'cabbageblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#c98d55'; c.fill(); c.stroke();
    c.fillStyle = '#9fe07a'; circ(c, 12, 12, 7); c.fill(); c.stroke(); c.strokeStyle = 'rgba(59,110,40,.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(12, 18); c.lineTo(12, 6); c.stroke();
  } else return drawBlock17(c, b);
  return true;
}

/* ===== Декор ===== */
function drawDecor19(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'hayS':
      c.fillStyle = '#ffd56a'; rr(c, x - 10, y - 12, 20, 12, 3); c.fill(); c.stroke();
      c.strokeStyle = '#d9a03a'; c.beginPath(); c.moveTo(x - 8, y - 8); c.lineTo(x + 8, y - 8); c.moveTo(x - 8, y - 4); c.lineTo(x + 8, y - 4); c.stroke();
      break;
    case 'cabbageS': drawCabbage(c, x, y, 0.3); break;
    case 'carrotS':
      c.fillStyle = '#ff9a3d'; c.beginPath(); c.moveTo(x - 3, y - 4); c.lineTo(x + 3, y - 4); c.lineTo(x, y + 2); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = '#4fbf5a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y - 4); c.lineTo(x - 3, y - 11); c.moveTo(x, y - 4); c.lineTo(x, y - 12); c.moveTo(x, y - 4); c.lineTo(x + 3, y - 11); c.stroke();
      break;
    case 'cloudpuffS':
      c.fillStyle = 'rgba(255,255,255,.95)'; circ(c, x - 5, y - 5, 5); c.fill(); circ(c, x + 5, y - 5, 5); c.fill(); circ(c, x, y - 9, 6); c.fill();
      break;
    default: drawDecor20(c, d, t);
  }
}

/* ===== Фони ===== */
function bgStorks(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 210 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 190, 12, 0.012, 0.4, camX * 0.12, '#cdeab0');
  const span = 240;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 60;
    c.fillStyle = '#a8865a'; c.fillRect(wx, 120, 5, 90);
    c.fillStyle = '#c98d55'; ell(c, wx + 2, 120, 16, 6); c.fill();
    c.fillStyle = '#ffffff'; ell(c, wx + 4, 110, 8, 6); c.fill(); c.fillStyle = '#ff7a3d'; c.beginPath(); c.moveTo(wx + 10, 106); c.lineTo(wx + 18, 108); c.lineTo(wx + 10, 110); c.closePath(); c.fill();
    c.fillStyle = '#f2e0b0'; for (let k = 0; k < 3; k++) { c.fillRect(wx + 60 + k * 26, 190, 18, 20); }
  }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#b4e090');
}
function bgPogopark(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 210 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 196, 10, 0.012, 0.4, camX * 0.12, '#f5d0ea');
  const span = 200;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 40, h = 50 + (i % 3 + 3) % 3 * 14, b = Math.abs(Math.sin(t * 3 + i)) * 10;
    c.strokeStyle = '#b48cff'; c.lineWidth = 3; c.beginPath(); c.moveTo(wx, 210); for (let k = 0; k < 6; k++) c.lineTo(wx + (k % 2 ? 8 : -8), 210 - (k + 1) * (h - b) / 6); c.stroke();
    c.fillStyle = '#ffd23f'; circ(c, wx, 210 - h + b - 6, 7); c.fill();
  }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#b4eaa0');
}
function bgInflatables(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 260;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 40, wob = Math.sin(t * 2 + i) * 2;
    const cols = ['#ff9fd0', '#9fe0ff', '#ffe08a'], k = ((i % 3) + 3) % 3;
    c.fillStyle = cols[k]; rr(c, wx, 150 + wob, 120, 60, 14); c.fill();
    for (let j = 0; j < 4; j++) { c.fillStyle = cols[(k + 1) % 3]; rr(c, wx + 6 + j * 30, 124 + wob, 18, 34, 9); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,.5)'; rr(c, wx + 40, 170 + wob, 40, 40, 12); c.fill();
  }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#a8e890');
}
function bgCloudshop(c, viewW, camX, t) {
  for (let i = 0; i < 7; i++) { const x = wrapX(i * 170 - camX * 0.12 + t * 6, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 4) * 26, 1, 'rgba(255,255,255,.9)'); }
  const span = 280;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 60;
    c.fillStyle = '#e6c8a8'; rr(c, wx, 140, 110, 70, 8); c.fill(); c.fillStyle = '#c98d55'; c.fillRect(wx + 20, 104, 16, 40); c.fillRect(wx + 70, 112, 14, 32);
    for (let k = 0; k < 3; k++) { const kk = (t * 0.4 + k / 3) % 1; c.fillStyle = `rgba(255,255,255,${0.9 - kk * 0.7})`; circ(c, wx + 28 + kk * 20, 100 - kk * 60, 8 + kk * 10); c.fill(); }
    c.fillStyle = '#ffffff'; rr(c, wx + 44, 160, 22, 26, 4); c.fill();
  }
  hill(c, viewW, 216, 6, 0.03, 1.2, camX * 0.45, '#e8edff');
}
function bgCabbage(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 186, 10, 0.012, 0.4, camX * 0.12, '#c9ecb0');
  const span = 60;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.35, span) + 20; c.fillStyle = '#8fd86a'; circ(c, wx, 200, 12); c.fill(); c.fillStyle = '#b8f09a'; circ(c, wx, 196, 7); c.fill(); }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#a8e080');
}
Object.assign(BG2, { storks: bgStorks, pogopark: bgPogopark, inflatables: bgInflatables, cloudshop: bgCloudshop, cabbage: bgCabbage });
