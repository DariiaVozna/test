'use strict';
/* ===== Частина 37 «Фарби, гніздечка й фото»: теми, плитки для розфарбовування, речі й ті, кому їх нести, звірятка в кущиках, Пітьмик ===== */
Object.assign(THEMES, {
  paintpark: Object.assign({}, THEMES.paint, { sky: ['#ffe0f0', '#fff0f8', '#fffaf6'] }),
  nestvalley: Object.assign({}, THEMES.nest, { sky: ['#c8ecff', '#e4f6ff', '#fffbe8'] }),
  photosafari: Object.assign({}, THEMES.savanna, { sky: ['#ffd9a0', '#ffecc8', '#fff8e6'] }),
  colorfactory: Object.assign({}, THEMES.factory, { sky: ['#e0d8ff', '#efeaff', '#fbf9ff'] }),
  gloomtower: Object.assign({}, THEMES.tower, { sky: ['#b8b0e8', '#d8d0f4', '#f4f0ff'] }),
});
Object.assign(BG2, {
  paintpark: (c, viewW, camX, t) => drawBackground(c, 'paint', camX, viewW, t, 0),
  nestvalley: (c, viewW, camX, t) => drawBackground(c, 'nest', camX, viewW, t, 0),
  photosafari: (c, viewW, camX, t) => drawBackground(c, 'savanna', camX, viewW, t, 0),
  colorfactory: (c, viewW, camX, t) => drawBackground(c, 'factory', camX, viewW, t, 0),
  gloomtower: (c, viewW, camX, t) => drawBackground(c, 'tower', camX, viewW, t, 0),
});

/* ===== Нові наліпки ===== */
function drawSticker36(c, k) {
  c.strokeStyle = INK; c.lineWidth = 1.3;
  if (k === 'brush') {
    c.save(); c.rotate(-0.7);
    c.fillStyle = '#c8884a'; rr(c, -2.5, -2, 5, 16, 2); c.fill(); c.stroke();
    c.fillStyle = '#c8c4d8'; c.fillRect(-3.5, -6, 7, 5); c.strokeRect(-3.5, -6, 7, 5);
    c.fillStyle = '#ff5c7a'; c.beginPath(); c.moveTo(-3.5, -6); c.quadraticCurveTo(-4, -13, 0, -16); c.quadraticCurveTo(4, -13, 3.5, -6); c.closePath(); c.fill(); c.stroke();
    c.restore();
    c.fillStyle = '#4cb6ff'; circ(c, 8, 8, 2.4); c.fill(); c.fillStyle = '#ffd23f'; circ(c, 10, 2, 1.8); c.fill(); c.fillStyle = '#7ed957'; circ(c, 4, 11, 1.6); c.fill();
  } else if (k === 'bird') {
    c.fillStyle = '#c8884a'; ell(c, 0, 9, 12, 4); c.fill(); c.stroke();
    c.fillStyle = '#4cb6ff'; ell(c, 0, -1, 9, 8); c.fill(); c.stroke();
    c.fillStyle = '#9fd8ff'; ell(c, -3, 1, 4, 3, 0.4); c.fill();
    c.fillStyle = '#ffffff'; circ(c, 3, -4, 2.4); c.fill(); c.fillStyle = INK; circ(c, 3.5, -4, 1.2); c.fill();
    c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(8, -2); c.lineTo(13, -1); c.lineTo(8, 1); c.closePath(); c.fill();
    c.fillStyle = '#fff6e0'; ell(c, -5, 7, 2.6, 2); c.fill(); ell(c, 5, 7, 2.6, 2); c.fill();
  } else if (k === 'camera') {
    c.fillStyle = '#4a4458'; rr(c, -12, -6, 24, 16, 3); c.fill(); c.stroke();
    c.fillStyle = '#6a6478'; rr(c, -6, -10, 9, 5, 1.5); c.fill(); c.stroke();
    c.fillStyle = '#9fd8ff'; circ(c, 1, 2, 6); c.fill(); c.stroke(); c.fillStyle = '#ffffff'; circ(c, -1, 0, 2); c.fill();
    c.fillStyle = '#ff5c7a'; circ(c, 8, -3, 1.6); c.fill();
  } else if (k === 'palette') {
    c.fillStyle = '#f4dcb8'; c.beginPath(); c.moveTo(0, -12); c.quadraticCurveTo(13, -12, 13, 0); c.quadraticCurveTo(13, 11, 2, 11); c.quadraticCurveTo(-2, 11, -2, 7); c.quadraticCurveTo(-2, 4, -6, 5); c.quadraticCurveTo(-13, 6, -12, -2); c.quadraticCurveTo(-11, -12, 0, -12); c.closePath(); c.fill(); c.stroke();
    [['#ff5c7a', -6, -5], ['#ffd23f', 0, -8], ['#7ed957', 6, -5], ['#4cb6ff', 8, 2], ['#a05ad8', 4, 7]].forEach(([col, x, y]) => { c.fillStyle = col; circ(c, x, y, 2.4); c.fill(); });
  } else if (k === 'lamp') {
    c.fillStyle = 'rgba(255,230,120,.4)'; circ(c, 0, -3, 12); c.fill();
    c.fillStyle = '#fff3a0'; c.beginPath(); c.arc(0, -4, 8, Math.PI * 0.8, Math.PI * 2.2); c.lineTo(3.5, 5); c.lineTo(-3.5, 5); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#c8c4d8'; rr(c, -4, 5, 8, 6, 1.5); c.fill(); c.stroke();
    c.strokeStyle = '#ff9f1c'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-2, 2); c.lineTo(-1, -4); c.lineTo(1, -2); c.lineTo(2, 2); c.stroke();
  }
}

/* ===== Плитки для розфарбовування ===== */
function drawPaintTile(c, p, t) {
  const x = p.x * T, y = p.y * T;
  c.save();
  if (p.done) {
    const col = PAINT_COLS[p.i % PAINT_COLS.length];
    c.fillStyle = col; c.globalAlpha = 0.9;
    c.beginPath(); c.moveTo(x + 1, y + 6); c.quadraticCurveTo(x + 4, y + 1, x + 12, y + 1.5); c.quadraticCurveTo(x + 20, y + 0.5, x + 23, y + 5); c.lineTo(x + 23, y + 9); c.quadraticCurveTo(x + 17, y + 12, x + 12, y + 8); c.quadraticCurveTo(x + 6, y + 12, x + 1, y + 9); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,.55)'; ell(c, x + 8, y + 3.5, 3, 1.2); c.fill();
    if (p.flash > 0) { c.globalAlpha = p.flash * 2; sparkle(c, x + 12, y - 6, 5, '#ffffff'); }
  } else {
    c.fillStyle = '#a8a2bc'; rr(c, x + 1, y - 1, T - 2, 9, 2); c.fill();
    c.strokeStyle = '#ffffff'; c.lineWidth = 1.4; c.setLineDash([3, 2]); rr(c, x + 2, y, T - 4, 7, 2); c.stroke(); c.setLineDash([]);
    // крапелька фарби підстрибує над сірою плиткою
    const k = (t * 1.4 + p.i * 0.23) % 1, hop = Math.sin(k * Math.PI) * 6;
    c.globalAlpha = 0.85; c.fillStyle = PAINT_COLS[p.i % PAINT_COLS.length]; c.beginPath(); c.moveTo(x + 12, y - 9 - hop); c.quadraticCurveTo(x + 15.5, y - 4 - hop, x + 12, y - 2.5 - hop); c.quadraticCurveTo(x + 8.5, y - 4 - hop, x + 12, y - 9 - hop); c.fill();
  }
  c.restore();
}

/* ===== Речі й ті, кому їх нести ===== */
function drawCarryItem(c, k, x, y, t) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  if (k === 'egg') { c.fillStyle = '#fff6e0'; ell(c, 0, 0, 6.5, 8.5); c.fill(); c.stroke(); c.fillStyle = '#9fd8ff'; circ(c, -2, -2, 1.4); c.fill(); circ(c, 2, 2.5, 1.2); c.fill(); circ(c, 2.5, -3.5, 1); c.fill(); }
  else if (k === 'bone') { c.fillStyle = '#fff8ec'; rr(c, -7, -2.2, 14, 4.4, 2); c.fill(); c.stroke(); for (const sx of [-7, 7]) { circ(c, sx, -2.5, 2.8); c.fill(); c.stroke(); circ(c, sx, 2.5, 2.8); c.fill(); c.stroke(); } c.fillStyle = '#fff8ec'; c.fillRect(-6, -1.6, 12, 3.2); }
  else if (k === 'apple') { c.fillStyle = '#ff5c5c'; circ(c, 0, 1, 7); c.fill(); c.stroke(); c.strokeStyle = '#6a4020'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, -5); c.lineTo(1, -9); c.stroke(); c.fillStyle = '#7ed957'; ell(c, 3.5, -7, 3, 1.6, -0.5); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, -2.5, -1.5, 1.8, 1.2, -0.5); c.fill(); }
  c.restore();
}
function drawCarryTarget(c, q, t) {
  const x = q.tx * T + 12, gy = q.ty * T, joy = q.done, hop = joy && q.joy > 0 ? Math.abs(Math.sin(t * 12)) * 4 : 0;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  if (q.k === 'egg') {
    c.fillStyle = '#c8884a'; ell(c, x, gy - 6, 16, 7); c.fill(); c.stroke();
    c.strokeStyle = '#8a5a2a'; c.lineWidth = 1; for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(x - 14, gy - 6 + i * 1.5); c.quadraticCurveTo(x, gy - 2 + i * 2, x + 14, gy - 7 + i * 1.5); c.stroke(); }
    if (joy) { c.fillStyle = '#fff6e0'; c.strokeStyle = INK; c.lineWidth = 1.2; ell(c, x - 3, gy - 12, 5, 6.5); c.fill(); c.stroke(); }
    c.strokeStyle = INK; c.lineWidth = 1.4;
    c.fillStyle = '#4cb6ff'; ell(c, x + 6, gy - 22 - hop, 9, 8); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; circ(c, x + 9, gy - 25 - hop, 2.4); c.fill(); c.fillStyle = INK; circ(c, x + 9.5, gy - 25 - hop, 1.2); c.fill();
    c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(x + 14, gy - 23 - hop); c.lineTo(x + 19, gy - 22 - hop); c.lineTo(x + 14, gy - 20 - hop); c.closePath(); c.fill();
    if (!joy && Math.sin(t * 3) > 0.6) txt24(c, '?', x + 6, gy - 40, 11, '#4cb6ff', '#ffffff', 2);
  } else if (q.k === 'bone') {
    c.fillStyle = '#d8a060'; ell(c, x, gy - 10, 11, 9); c.fill(); c.stroke();
    c.fillStyle = '#d8a060'; circ(c, x + 9, gy - 20 - hop, 8); c.fill(); c.stroke();
    c.fillStyle = '#8a5a2a'; ell(c, x + 4, gy - 24 - hop, 3, 6, 0.4); c.fill(); ell(c, x + 14, gy - 24 - hop, 3, 6, -0.4); c.fill();
    c.fillStyle = INK; circ(c, x + 8, gy - 21 - hop, 1.3); c.fill(); circ(c, x + 12, gy - 21 - hop, 1.3); c.fill(); ell(c, x + 10, gy - 17 - hop, 1.8, 1.3); c.fill();
    const wag = joy ? Math.sin(t * 20) * 0.6 : Math.sin(t * 4) * 0.2; c.save(); c.translate(x - 10, gy - 12); c.rotate(-0.8 + wag); c.fillStyle = '#d8a060'; rr(c, -1.5, -9, 3, 9, 1.5); c.fill(); c.stroke(); c.restore();
    if (joy) drawCarryItem(c, 'bone', x + 9, gy - 13 - hop, t);
    else if (Math.sin(t * 3) > 0.6) txt24(c, '?', x + 9, gy - 38, 11, '#a0602a', '#ffffff', 2);
  } else {
    c.fillStyle = '#8a6a4a'; ell(c, x, gy - 9, 12, 9); c.fill(); c.stroke();
    c.strokeStyle = '#5a3a1a'; c.lineWidth = 1.2; for (let i = 0; i < 6; i++) { const a = Math.PI * (1.05 + i * 0.14); c.beginPath(); c.moveTo(x + Math.cos(a) * 9, gy - 9 + Math.sin(a) * 7); c.lineTo(x + Math.cos(a) * 15, gy - 9 + Math.sin(a) * 12); c.stroke(); }
    c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = '#f4dcb8'; ell(c, x + 10, gy - 8 - hop, 5, 4); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, x + 11, gy - 9 - hop, 1.1); c.fill(); circ(c, x + 15, gy - 8 - hop, 1.2); c.fill();
    if (joy) drawCarryItem(c, 'apple', x - 2, gy - 22 - hop, t);
    else if (Math.sin(t * 3) > 0.6) txt24(c, '?', x + 8, gy - 30, 11, '#8a6a4a', '#ffffff', 2);
  }
  c.restore();
}

/* ===== Звірятка в кущиках ===== */
function drawCritterBody(c, k, x, y) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  const face = (col) => { c.fillStyle = INK; circ(c, -3, -1, 1.2); c.fill(); circ(c, 3, -1, 1.2); c.fill(); c.fillStyle = 'rgba(255,140,180,.55)'; circ(c, -5, 2, 1.5); c.fill(); circ(c, 5, 2, 1.5); c.fill(); };
  if (k === 'hedgehog') { c.fillStyle = '#8a6a4a'; for (let i = 0; i < 7; i++) { const a = Math.PI * (1.05 + i * 0.15); c.beginPath(); c.moveTo(Math.cos(a) * 6, Math.sin(a) * 6); c.lineTo(Math.cos(a) * 12, Math.sin(a) * 12); c.lineTo(Math.cos(a + 0.2) * 6, Math.sin(a + 0.2) * 6); c.fill(); } c.fillStyle = '#f4dcb8'; circ(c, 0, 0, 7); c.fill(); c.stroke(); face(); c.fillStyle = INK; circ(c, 0, 2, 1.2); c.fill(); }
  else if (k === 'squirrel') { c.fillStyle = '#ff9f4a'; ell(c, 9, -6, 5, 9, 0.5); c.fill(); c.stroke(); circ(c, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-5, -5); c.lineTo(-5, -11); c.lineTo(-1, -6); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(5, -5); c.lineTo(5, -11); c.lineTo(1, -6); c.closePath(); c.fill(); c.stroke(); face(); }
  else if (k === 'mole') { c.fillStyle = '#6a5a6a'; circ(c, 0, 0, 7.5); c.fill(); c.stroke(); c.fillStyle = '#ff9fc4'; circ(c, 0, 2, 2.2); c.fill(); face(); c.strokeStyle = '#ffffff'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(2, 2); c.lineTo(8, 1); c.moveTo(-2, 2); c.lineTo(-8, 1); c.stroke(); }
  else if (k === 'fox') { c.fillStyle = '#ff8a3d'; c.beginPath(); c.moveTo(-7, -2); c.lineTo(-8, -12); c.lineTo(-2, -6); c.lineTo(2, -6); c.lineTo(8, -12); c.lineTo(7, -2); c.quadraticCurveTo(0, 9, -7, -2); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-5, 0); c.quadraticCurveTo(0, 7, 5, 0); c.quadraticCurveTo(0, 3, -5, 0); c.fill(); face(); c.fillStyle = INK; circ(c, 0, 3, 1.1); c.fill(); }
  else if (k === 'meerkat') { c.fillStyle = '#d8b080'; ell(c, 0, 0, 6, 8); c.fill(); c.stroke(); c.fillStyle = '#6a4a2a'; ell(c, -3, -1, 2, 2.6); c.fill(); ell(c, 3, -1, 2, 2.6); c.fill(); c.fillStyle = '#ffffff'; circ(c, -3, -1.5, 0.8); c.fill(); circ(c, 3, -1.5, 0.8); c.fill(); c.fillStyle = INK; circ(c, 0, 3, 1.1); c.fill(); }
  else { c.fillStyle = '#ffe14d'; circ(c, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(-2, 1); c.lineTo(2, 1); c.lineTo(0, 4); c.closePath(); c.fill(); face(); }
  c.restore();
}
function drawCritter(c, k, t) {
  const x = k.x, gy = k.y;
  if (k.up > 0.02) drawCritterBody(c, k.k, x, gy - 6 - k.up * 18);
  c.save(); c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#4fb83a'; for (const [dx, r] of [[-10, 8], [0, 10], [10, 8]]) { circ(c, x + dx, gy - 6, r); c.fill(); }
  c.beginPath(); c.arc(x - 10, gy - 6, 8, Math.PI * 0.9, Math.PI * 1.75); c.arc(x, gy - 6, 10, Math.PI * 1.2, Math.PI * 1.8); c.arc(x + 10, gy - 6, 8, Math.PI * 1.25, Math.PI * 2.1); c.stroke();
  c.fillStyle = '#7ed957'; circ(c, x - 3, gy - 11, 3); c.fill(); circ(c, x + 7, gy - 8, 2.4); c.fill();
  if (k.shot) { c.fillStyle = '#ffffff'; circ(c, x + 12, gy - 16, 4); c.fill(); c.stroke(); txt24(c, '✓', x + 12, gy - 16, 7, '#3fa35a', '#ffffff', 0); }
  c.restore();
  if (k.card > 0) {
    const a = Math.min(1, k.card), y = gy - 40 - (2.2 - k.card) * 14;
    c.save(); c.globalAlpha = a; c.translate(x, y); c.rotate(-0.1);
    c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, -14, -16, 28, 32, 2); c.fill(); c.stroke();
    c.fillStyle = '#c8ecff'; c.fillRect(-11, -13, 22, 20); drawCritterBody(c, k.k, 0, -1);
    c.restore();
  }
}

/* ===== Пітьмик і лампи ===== */
function drawGloomLamps(c, B, t) {
  for (const l of B.lamps) {
    const on = B.light > 0 && B.lit === l, x = l.x;
    c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
    c.strokeStyle = '#6a6478'; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 2 * T); c.stroke();
    c.strokeStyle = INK; c.fillStyle = '#ff9fc4'; c.beginPath(); c.moveTo(x - 16, 2 * T + 14); c.lineTo(x - 8, 2 * T); c.lineTo(x + 8, 2 * T); c.lineTo(x + 16, 2 * T + 14); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = on ? '#fff6a0' : '#d8d4e4'; circ(c, x, 2 * T + 16, 6); c.fill(); c.stroke();
    // ланцюжок із ручкою
    const sw = Math.sin(t * 2 + x) * 2;
    c.strokeStyle = '#c8c4d8'; c.lineWidth = 1.6; c.setLineDash([2, 2]); c.beginPath(); c.moveTo(x + 10, 2 * T + 12); c.lineTo(x + 10 + sw, 6 * T); c.stroke(); c.setLineDash([]);
    c.fillStyle = l.cd > 0 && !on ? '#9a94b0' : '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, x + 10 + sw, 6 * T + 4, 5); c.fill(); c.stroke();
    if (on) { const g = c.createRadialGradient(x, 2 * T + 18, 4, x, 2 * T + 18, 200); g.addColorStop(0, 'rgba(255,246,160,.45)'); g.addColorStop(1, 'rgba(255,246,160,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(x - 14, 2 * T + 16); c.lineTo(x - 160, 10 * T); c.lineTo(x + 160, 10 * T); c.lineTo(x + 14, 2 * T + 16); c.closePath(); c.fill(); }
    c.restore();
  }
}
function drawGloomBoss(c, B, t) {
  drawGloomLamps(c, B, t);
  const x = B.x, y = B.y, s = B.dead ? 0.7 : B.sc, fl = B.flash > 0, lit = B.light > 0;
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round';
  const wob = Math.sin(t * 4) * 2;
  c.fillStyle = fl ? '#c8b8ff' : B.dead ? '#b8a8e8' : '#2e2050'; c.globalAlpha = B.dead ? 0.85 : 0.95;
  c.beginPath(); c.moveTo(-22, 14); c.quadraticCurveTo(-28, -10, -12, -22 + wob); c.quadraticCurveTo(0, -30, 12, -22 - wob); c.quadraticCurveTo(28, -10, 22, 14);
  for (let i = 0; i < 4; i++) c.quadraticCurveTo(17 - i * 11, 22 + (i % 2) * 4 + wob, 11 - i * 11, 14);
  c.closePath(); c.fill(); c.globalAlpha = 1; c.strokeStyle = '#140c2a'; c.lineWidth = 1.6; c.stroke();
  // очі світяться, рот
  const ec = B.dead ? '#ffffff' : lit ? '#ffffff' : '#ffe14d';
  for (const ex of [-8, 8]) { c.fillStyle = ec; ell(c, ex, -6, 5, lit ? 6.5 : 4.5); c.fill(); if (!B.dead) { c.fillStyle = '#140c2a'; circ(c, ex + B.dir * 1.5, -5, lit ? 1.6 : 2.2); c.fill(); } }
  c.strokeStyle = ec; c.lineWidth = 1.6; c.beginPath();
  if (lit && !B.dead) { c.arc(0, 8, 4, 0, TAU); } else if (B.dead) { c.arc(0, 4, 6, 0.15, Math.PI - 0.15); } else { c.moveTo(-8, 5); c.lineTo(-4, 8); c.lineTo(0, 5); c.lineTo(4, 8); c.lineTo(8, 5); }
  c.stroke();
  c.restore();
  if (lit && !B.dead) txt24(c, 'Ой!', x, y - 34, 11, '#5a3aa8', '#ffffff', 2);
  // світла для темряви: ручки ламп і очі Пітьмика
  if (G.extraLights && !lit && !B.dead) {
    for (const l of B.lamps) { G.extraLights.push({ x: l.x + 10, y: 6 * T + 4, r: l.cd > 0 ? 24 : 40, a: 0.9 }); G.extraLights.push({ x: l.x, y: 2 * T + 16, r: 22, a: 0.55 }); }
    G.extraLights.push({ x: B.x, y: B.y - 5, r: 30, a: 0.75 });
  }
}
function drawGloomOrb(c, b) {
  c.save(); c.fillStyle = 'rgba(46,32,80,.9)'; circ(c, b.x, b.y, 7); c.fill();
  c.strokeStyle = 'rgba(200,184,255,.8)'; c.lineWidth = 1.2; c.stroke();
  c.fillStyle = '#ffe14d'; circ(c, b.x - 2, b.y - 1, 1.2); c.fill(); circ(c, b.x + 2, b.y - 1, 1.2); c.fill();
  c.restore();
}

/* ===== Світ і поверх єдиноріжки ===== */
function drawWorld36(c, t, vis) {
  // у темряві плитки, речі, звірятка й ворота трохи світяться, щоб їх було видно
  const Lg = G.extraLights = G.dark ? [] : null;
  if (Lg) {
    if (G.ptiles) for (const p of G.ptiles) Lg.push({ x: p.x * T + 12, y: p.y * T + 2, r: p.done ? 22 : 16, a: p.done ? 0.8 : 0.6 });
    if (G.carries) for (const q of G.carries) { Lg.push({ x: q.tx * T + 12, y: q.ty * T - 16, r: 36, a: 0.8 }); if (q.state !== 'given') Lg.push({ x: q.x, y: q.y, r: 26, a: 0.9 }); }
    if (G.critters) for (const k of G.critters) Lg.push({ x: k.x, y: k.y - 12, r: 22 + k.up * 10, a: 0.5 + k.up * 0.4 });
    for (const g of (G.pgates || []).concat(G.dgates || [])) if (!g.open) Lg.push({ x: g.x * T + 12, y: 7 * T + 12, r: 30, a: 0.7 });
  }
  if (G.ptiles) for (const p of G.ptiles) if (vis(p.x * T + 12)) drawPaintTile(c, p, t);
  if (G.pgates) for (const g of G.pgates) if (vis(g.x * T + 12) && tileAt(g.x, 8) === 2) {
    drawDoorCol(c, g.x, g.top, 'paint', '#ff9fc4', t);
    const left = G.ptiles.filter(q => q.g === g.g && !q.done).length;
    c.save(); c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, g.x * T + 12, 6 * T + 12, 8); c.fill(); c.stroke(); c.restore();
    txt24(c, String(left), g.x * T + 12, 6 * T + 12, 11, '#ff4fa3', '#ffffff', 2);
  }
  if (G.dgates) for (const g of G.dgates) if (vis(g.x * T + 12) && tileAt(g.x, 8) === 2) { drawDoorCol(c, g.x, g.top, 'carry', '#9fd8ff', t); const q = G.carries.find(k => k.id === g.c); if (q) { c.save(); c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, g.x * T + 12, 6 * T + 12, 10); c.fill(); c.stroke(); c.restore(); drawCarryItem(c, q.k, g.x * T + 12, 6 * T + 12, t); } }
  if (G.carries) for (const q of G.carries) {
    if (vis(q.tx * T + 12)) drawCarryTarget(c, q, t);
    if (q.state === 'idle' || q.state === 'fall') if (vis(q.x)) { const bob = q.state === 'idle' ? Math.sin(t * 3 + q.x) * 1.5 : 0; drawCarryItem(c, q.k, q.x, q.y + bob, t); if (q.state === 'idle' && (t * 1.5 + q.x) % 1.6 < 0.4) sparkle(c, q.x + 9, q.y - 9, 2.6, '#ffe14d'); }
  }
  if (G.critters) for (const k of G.critters) if (vis(k.x)) drawCritter(c, k, t);
}
function drawOver36(c, P, t) {
  if (P.hold && P.hold.state === 'held') { const x = P.x + P.w / 2, y = P.y - 40 + Math.sin(t * 4) * 1.5; c.save(); c.globalAlpha = 0.9; c.fillStyle = '#ffffff'; c.strokeStyle = 'rgba(59,31,79,.35)'; c.lineWidth = 1.5; circ(c, x, y, 13); c.fill(); c.stroke(); c.restore(); drawCarryItem(c, P.hold.k, x, y, t); }
}
