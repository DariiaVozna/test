'use strict';
/* ===== Частина 35 «Костюми й бульбашки»: теми, шафи з костюмами, костюми на єдиноріжці, стіни привидів, Мильний Бульбах ===== */
Object.assign(THEMES, {
  catroofs: Object.assign({}, THEMES.climbwall, { sky: ['#ffd0b0', '#ffe8d4', '#fff8ee'] }),
  frogpond: Object.assign({}, THEMES.pond, { sky: ['#bff0d0', '#e0f8e8', '#fffbe8'] }),
  ghosthouse: Object.assign({}, THEMES.attic, { sky: ['#c8b8e8', '#e4dcf4', '#f8f4ff'] }),
  costumeparty: Object.assign({}, THEMES.partyhall, { sky: ['#ffd0f0', '#ffe8f8', '#fff8fc'] }),
  soapfactory: Object.assign({}, THEMES.laundry, { sky: ['#bfe8ff', '#e0f4ff', '#fbfeff'] }),
});
Object.assign(BG2, {
  catroofs: (c, viewW, camX, t) => drawBackground(c, 'climbwall', camX, viewW, t, 0),
  frogpond: (c, viewW, camX, t) => drawBackground(c, 'pond', camX, viewW, t, 0),
  ghosthouse: (c, viewW, camX, t) => drawBackground(c, 'attic', camX, viewW, t, 0),
  costumeparty: (c, viewW, camX, t) => drawBackground(c, 'partyhall', camX, viewW, t, 0),
  soapfactory: (c, viewW, camX, t) => drawBackground(c, 'laundry', camX, viewW, t, 0),
});

/* ===== Нові наліпки ===== */
function drawSticker34(c, k) {
  c.strokeStyle = INK; c.lineWidth = 1.3;
  if (k === 'cat') {
    c.fillStyle = '#ffb347';
    c.beginPath(); c.moveTo(-11, -3); c.lineTo(-10, -14); c.lineTo(-3, -8); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(11, -3); c.lineTo(10, -14); c.lineTo(3, -8); c.closePath(); c.fill(); c.stroke();
    ell(c, 0, 1, 11.5, 9.5); c.fill(); c.stroke();
    c.fillStyle = INK; ell(c, -4.5, 0, 1.6, 2.4); c.fill(); ell(c, 4.5, 0, 1.6, 2.4); c.fill();
    c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(-1.6, 3.5); c.lineTo(1.6, 3.5); c.lineTo(0, 5.2); c.closePath(); c.fill();
    c.lineWidth = 0.9; c.beginPath(); c.moveTo(-3, 5); c.lineTo(-12, 4); c.moveTo(-3, 6); c.lineTo(-12, 8); c.moveTo(3, 5); c.lineTo(12, 4); c.moveTo(3, 6); c.lineTo(12, 8); c.stroke();
  } else if (k === 'frog') {
    c.fillStyle = '#7ed957'; circ(c, -6, -7, 5); c.fill(); c.stroke(); circ(c, 6, -7, 5); c.fill(); c.stroke();
    ell(c, 0, 3, 12, 8.5); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; circ(c, -6, -7, 3); c.fill(); circ(c, 6, -7, 3); c.fill();
    c.fillStyle = INK; circ(c, -5.5, -6.5, 1.5); c.fill(); circ(c, 6.5, -6.5, 1.5); c.fill();
    c.beginPath(); c.arc(0, 2, 6, 0.2, Math.PI - 0.2); c.stroke();
    c.fillStyle = 'rgba(255,140,180,.6)'; circ(c, -8, 5, 2); c.fill(); circ(c, 8, 5, 2); c.fill();
  } else if (k === 'ghost') {
    c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-10, 12); c.lineTo(-10, -2); c.arc(0, -2, 10, Math.PI, 0); c.lineTo(10, 12);
    for (let i = 0; i < 4; i++) c.quadraticCurveTo(7.5 - i * 5, 8, 5 - i * 5, 12); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = INK; ell(c, -3.5, -2, 1.8, 2.6); c.fill(); ell(c, 3.5, -2, 1.8, 2.6); c.fill();
    c.fillStyle = '#ff9fc4'; circ(c, -6.5, 2.5, 1.6); c.fill(); circ(c, 6.5, 2.5, 1.6); c.fill();
    c.beginPath(); c.arc(0, 2.5, 2, 0, Math.PI); c.stroke();
  } else if (k === 'mask') {
    c.fillStyle = '#b06bff'; c.beginPath(); c.moveTo(-13, -3); c.quadraticCurveTo(-7, -9, 0, -4); c.quadraticCurveTo(7, -9, 13, -3); c.quadraticCurveTo(12, 6, 5, 5); c.quadraticCurveTo(0, 2, -5, 5); c.quadraticCurveTo(-12, 6, -13, -3); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; ell(c, -6, -1, 3.5, 2.4); c.fill(); c.stroke(); ell(c, 6, -1, 3.5, 2.4); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; starPath(c, 0, -9, 3, 1.4, 0); c.fill(); c.stroke();
    c.strokeStyle = '#ff4fa3'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(13, -3); c.quadraticCurveTo(17, 4, 13, 11); c.stroke();
  } else if (k === 'bubble') {
    const g = c.createRadialGradient(-4, -5, 2, 0, 0, 13); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(0.6, 'rgba(190,230,255,.7)'); g.addColorStop(1, 'rgba(255,180,230,.8)');
    c.fillStyle = g; circ(c, 0, 0, 12); c.fill(); c.strokeStyle = '#7fb8e8'; c.stroke();
    c.fillStyle = '#ffffff'; ell(c, -5, -5, 3, 1.8, -0.6); c.fill();
    c.fillStyle = INK; circ(c, -3, 1, 1.3); c.fill(); circ(c, 3, 1, 1.3); c.fill();
    c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.arc(0, 3.5, 2, 0.2, Math.PI - 0.2); c.stroke();
  } else drawSticker35(c, k);
}

/* ===== Шафа з костюмом ===== */
function costumeIcon(c, k, x, y, sc) {
  c.save(); c.translate(x, y); c.scale(sc, sc); c.lineJoin = 'round'; drawSticker34(c, k === 'cat' ? 'cat' : k === 'frog' ? 'frog' : 'ghost'); c.restore();
}
function drawWardrobe(c, w, t) {
  const x = w.x * T, gy = w.gy, on = G.P.costume === w.k;
  const col = { cat: '#ffb347', frog: '#7ed957', ghost: '#b8a8f0' }[w.k] || '#ffb3e6';
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#c8884a'; rr(c, x - 2, gy - 46, 28, 46, 4); c.fill(); c.stroke();
  c.fillStyle = col; rr(c, x + 1, gy - 43, 22, 38, 3); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(x + 12, gy - 43); c.lineTo(x + 12, gy - 5); c.stroke();
  c.fillStyle = '#ffd23f'; circ(c, x + 9.5, gy - 24, 1.6); c.fill(); circ(c, x + 14.5, gy - 24, 1.6); c.fill();
  c.fillStyle = '#ffffff'; circ(c, x + 12, gy - 58 + Math.sin(t * 3 + w.x) * 2, 11); c.fill(); c.strokeStyle = '#e8d8f0'; c.stroke();
  costumeIcon(c, w.k, x + 12, gy - 58 + Math.sin(t * 3 + w.x) * 2, 0.62);
  c.restore();
  if (on) txt24(c, '✓', x + 22, gy - 66, 11, '#3fa35a', '#ffffff', 2);
  else if ((t * 1.4 + w.x) % 1.8 < 0.4) sparkle(c, x + 25, gy - 64, 3, '#ffe14d');
}

/* ===== Стіни привидів ===== */
function drawGhostWall(c, b, t) {
  const x = b.x * T, y = b.y * T, solidNow = tileAt(b.x, b.y) === 2;
  c.save();
  if (solidNow) {
    c.fillStyle = 'rgba(150,120,230,.85)'; c.fillRect(x, y, T, T);
    c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(x + 2, y + 2, T - 4, 4);
    c.strokeStyle = 'rgba(80,50,160,.8)'; c.lineWidth = 1.2; c.strokeRect(x + 0.5, y + 0.5, T - 1, T - 1);
    if ((b.x + b.y) % 3 === 0) { c.fillStyle = 'rgba(255,255,255,.8)'; ell(c, x + 8.5, y + 11 + Math.sin(t * 2 + b.y) * 1.2, 1.8, 2.6); c.fill(); ell(c, x + 15.5, y + 11 + Math.sin(t * 2 + b.y) * 1.2, 1.8, 2.6); c.fill(); }
  } else {
    c.globalAlpha = 0.3 + 0.1 * Math.sin(t * 3 + b.y); c.fillStyle = '#c8b8ff'; c.fillRect(x + 2, y + 2, T - 4, T - 4);
  }
  c.restore();
}
function drawWorld34(c, t, vis) {
  if (G.gwalls) for (const b of G.gwalls) if (vis(b.x * T + 12)) drawGhostWall(c, b, t);
  if (G.wardrobes) for (const w of G.wardrobes) if (vis(w.x * T + 12)) drawWardrobe(c, w, t);
  drawWorld35(c, t, vis);
}

/* ===== Костюм поверх єдиноріжки ===== */
function drawOver34(c, P, t) {
  if (!P.costume || P.hotair || P.inCannon) return;
  const s = P.mini ? 0.42 : P.big ? 1.24 : 0.8, pcx = P.x + P.w / 2, fy = P.y + P.h + 1 - (P.mount ? 17 : 0);
  const run = P.onGround && !P.mount ? Math.min(1, Math.abs(P.vx) / SPEED) : 0, air = !P.onGround && !P.mount;
  const by = air ? 0 : -Math.abs(Math.sin(P.t * 11)) * 1.6 * run;
  c.save(); c.translate(pcx, fy); c.scale(P.dir * s, s); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  if (P.costume === 'cat') {
    c.fillStyle = '#ffb347';
    c.beginPath(); c.moveTo(5, -31 + by); c.lineTo(5, -43 + by); c.lineTo(12, -35 + by); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(19, -33 + by); c.lineTo(26, -40 + by); c.lineTo(24, -29 + by); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ffb3c6'; c.beginPath(); c.moveTo(6.5, -33 + by); c.lineTo(6.5, -39.5 + by); c.lineTo(10, -35 + by); c.closePath(); c.fill();
    c.lineWidth = 0.9; c.beginPath(); c.moveTo(23, -24 + by); c.lineTo(30, -26 + by); c.moveTo(23, -22.5 + by); c.lineTo(30, -22 + by); c.moveTo(22.5, -21 + by); c.lineTo(29, -18.5 + by); c.stroke();
    c.lineWidth = 1.3; c.fillStyle = '#ff4f5e'; rr(c, 4, -18 + by, 10, 3, 1.5); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; circ(c, 9, -13.5 + by, 2.4); c.fill(); c.stroke();
    // смугастий хвостик
    const tw = Math.sin(P.t * 6) * 3;
    c.strokeStyle = '#ffb347'; c.lineWidth = 4; c.beginPath(); c.moveTo(-17, -18 + by); c.quadraticCurveTo(-28, -24 + tw, -24, -36 + tw); c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(-17, -18 + by); c.quadraticCurveTo(-28, -24 + tw, -24, -36 + tw); c.stroke();
    if (P.catCling) { c.fillStyle = '#ffffff'; for (let i = 0; i < 3; i++) { circ(c, 27, -6 - i * 6, 1.4); c.fill(); } }
  } else if (P.costume === 'frog') {
    c.fillStyle = '#7ed957'; c.beginPath(); c.moveTo(4, -27 + by); c.quadraticCurveTo(6, -38 + by, 14, -38.5 + by); c.quadraticCurveTo(20, -38 + by, 21, -31 + by); c.quadraticCurveTo(13, -33 + by, 4, -27 + by); c.closePath(); c.fill(); c.stroke();
    for (const ex of [6, 12.5]) { c.fillStyle = '#7ed957'; circ(c, ex, -40 + by, 4.6); c.fill(); c.stroke(); c.fillStyle = '#ffffff'; circ(c, ex + 0.5, -40.5 + by, 2.8); c.fill(); c.fillStyle = INK; circ(c, ex + 1.2, -40.5 + by, 1.4); c.fill(); }
    c.fillStyle = '#4fb83a'; circ(c, -8, -22 + by, 2.4); c.fill(); circ(c, -2, -18 + by, 1.8); c.fill(); circ(c, -13, -17 + by, 1.6); c.fill();
  } else if (P.costume === 'ghost') {
    const wv = Math.sin(P.t * 5) * 1.5;
    c.fillStyle = 'rgba(255,255,255,.85)'; c.strokeStyle = 'rgba(160,140,220,.9)';
    c.beginPath(); c.moveTo(-19, -9 + wv); c.lineTo(-19, -24 + by); c.quadraticCurveTo(-18, -36 + by, -7, -35 + by); c.quadraticCurveTo(3, -34 + by, 4, -25 + by); c.lineTo(4, -9 - wv);
    for (let i = 0; i < 4; i++) c.quadraticCurveTo(1 - i * 6, (i % 2 ? -13 : -5) + wv, -2 - i * 6 + (i === 3 ? -2 : 0), -9 + (i % 2 ? wv : -wv));
    c.closePath(); c.fill(); c.stroke();
    c.fillStyle = INK; ell(c, -10, -26 + by, 1.6, 2.4); c.fill(); ell(c, -4, -26 + by, 1.6, 2.4); c.fill();
    c.fillStyle = '#ff9fc4'; circ(c, -13, -22 + by, 1.4); c.fill(); circ(c, -1.5, -22 + by, 1.4); c.fill();
  }
  c.restore();
}

/* ===== Мильний Бульбах ===== */
function drawSoapBall(c, b, t, big) {
  const r = SOAP_R[b.s], sq = b.sq > 0 ? b.sq / 0.14 : 0, sx = 1 + sq * 0.14, sy = 1 - sq * 0.14;
  c.save(); c.translate(b.x, b.y + r * (1 - sy)); c.scale(sx, sy);
  const g = c.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r);
  g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(0.5, 'rgba(200,236,255,.55)'); g.addColorStop(0.85, 'rgba(255,190,240,.6)'); g.addColorStop(1, 'rgba(190,160,255,.85)');
  c.fillStyle = g; circ(c, 0, 0, r); c.fill();
  c.strokeStyle = 'rgba(110,140,220,.9)'; c.lineWidth = 1.6; circ(c, 0, 0, r); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = r * 0.09; c.beginPath(); c.arc(0, 0, r * 0.72, Math.PI * 1.1, Math.PI * 1.45); c.stroke();
  // обличчя
  const ey = -r * 0.1, ex = r * 0.3, er = Math.max(1.6, r * 0.1);
  c.fillStyle = INK; ell(c, -ex, ey, er, er * 1.4); c.fill(); ell(c, ex, ey, er, er * 1.4); c.fill();
  c.fillStyle = '#ffffff'; circ(c, -ex + er * 0.4, ey - er * 0.5, er * 0.4); c.fill(); circ(c, ex + er * 0.4, ey - er * 0.5, er * 0.4); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath();
  if (big) { c.moveTo(-ex * 1.6, ey - er * 2.4); c.lineTo(-ex * 0.5, ey - er * 1.7); c.moveTo(ex * 1.6, ey - er * 2.4); c.lineTo(ex * 0.5, ey - er * 1.7); }
  c.stroke();
  c.beginPath(); c.arc(0, r * 0.22, r * 0.2, 0.15, Math.PI - 0.15); c.stroke();
  c.fillStyle = 'rgba(255,140,180,.5)'; circ(c, -r * 0.5, r * 0.18, r * 0.11); c.fill(); circ(c, r * 0.5, r * 0.18, r * 0.11); c.fill();
  c.restore();
}
function drawSoapBoss(c, B, t) {
  if (B.dead) {
    const k = Math.min(1, B.deadT / 1.2);
    for (let i = 0; i < 8; i++) { const a = i * TAU / 8 + t, rr2 = 10 + k * 40; c.save(); c.globalAlpha = 0.7 * (1 - k * 0.5); drawSoapBall(c, { x: B.lx + Math.cos(a) * rr2, y: B.ly - 20 + Math.sin(a) * rr2 * 0.6 - k * 30, s: 1, sq: 0 }, t, false); c.restore(); }
    return;
  }
  for (const b of B.balls) {
    c.save(); c.globalAlpha = 0.18; c.fillStyle = INK; const sh = Math.max(0.3, 1 - (B.gy - b.y) / 200); ell(c, b.x, B.gy - 2, SOAP_R[b.s] * sh, 3 * sh); c.fill(); c.restore();
    if (b.inv > 0 && Math.floor(b.inv * 20) % 2) continue;
    drawSoapBall(c, b, t, b.s === 3);
  }
}
