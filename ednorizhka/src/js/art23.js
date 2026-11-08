'use strict';
/* ===== Частини 23–24: Місто (пошта, пожежна, будмайданчик, нічне місто, собачий парк) і Країна винаходів (ранці, перемикачі, невидимі мости, виставка, нора Клацика) ===== */
Object.assign(THEMES, {
  postoffice: { sky: ['#a8dcff', '#d4eeff', '#f6fbff'], panel: '#1f3a5a', top: '#c9c9d6', topHi: '#e8e8f0', topLo: '#9a9aae', fill: '#d8b48a', fillLo: '#bf9a6e', dots: ['#e8c9a0', '#a07a54', '#ffffff'], block: 'boxblock', ice: false, topStyle: 'stone', dotShape: 'pebble' },
  firestation: { sky: ['#ffc9a8', '#ffe6d2', '#fff7ef'], panel: '#5a1a1a', top: '#a8a8b8', topHi: '#d0d0dc', topLo: '#7a7a8e', fill: '#c97a5a', fillLo: '#a85e42', dots: ['#e09a7a', '#7a3a2a', '#f2c4a8'], block: 'redbrick', ice: false, topStyle: 'stone', dotShape: 'pebble' },
  construction: { sky: ['#ffe08a', '#fff0c0', '#fffbea'], panel: '#5a3a0a', top: '#d9b06a', topHi: '#f2d49a', topLo: '#b08a4a', fill: '#b8956a', fillLo: '#9a7a52', dots: ['#d6b48a', '#7a5a3a', '#ffffff'], block: 'girder', ice: false, topStyle: 'sand', dotShape: 'pebble' },
  citynight: { sky: ['#1a1f4a', '#2f3a7a', '#5a5aa0'], panel: '#0f1230', top: '#8a8aa8', topHi: '#b4b4cc', topLo: '#5e5e7a', fill: '#4a4a6a', fillLo: '#38385a', dots: ['#6a6a8e', '#2a2a44', '#ffd23f'], block: 'nightblock', ice: false, topStyle: 'stone', dotShape: 'dot' },
  dogpark: { sky: ['#b8e6ff', '#dcf3ff', '#f8fdff'], panel: '#1f4a2a', top: '#7fd46a', topHi: '#b4f08e', topLo: '#4f9f4a', fill: '#a07850', fillLo: '#86603c', dots: ['#c09a70', '#6a4a2a', '#ffffff'], block: 'boneblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  jetlab: { sky: ['#c8f0ff', '#e6f8ff', '#ffffff'], panel: '#1a3a4a', top: '#5cc8ff', topHi: '#a8e4ff', topLo: '#2f9ad8', fill: '#b0bccc', fillLo: '#95a2b4', dots: ['#d0d8e4', '#6a7a8e', '#ffd23f'], block: 'metalblock', ice: false, topStyle: 'plank', dotShape: 'dot' },
  switchworks: { sky: ['#ffd6e0', '#e8e0ff', '#f6f4ff'], panel: '#2a1f4a', top: '#c9b6ff', topHi: '#e4d9ff', topLo: '#9a86d8', fill: '#a8a0c8', fillLo: '#8c84ac', dots: ['#ff5c5c', '#4c8dff', '#ffffff'], block: 'metalblock', ice: false, topStyle: 'plank', dotShape: 'dot' },
  glassbridge: { sky: ['#b8f0e8', '#dcfaf4', '#f6fffd'], panel: '#14403a', top: '#7fe0c8', topHi: '#b8f4e4', topLo: '#4fb89e', fill: '#8ab8b0', fillLo: '#6e9c94', dots: ['#b8e0da', '#4a7a72', '#ffffff'], block: 'glassblock', ice: false, topStyle: 'crystal', dotShape: 'dot' },
  inventfair: { sky: ['#ffe0b8', '#fff0dc', '#fffaf2'], panel: '#4a2a0a', top: '#ffb84c', topHi: '#ffd894', topLo: '#e0902a', fill: '#c8a888', fillLo: '#ac8c6c', dots: ['#ff7ab8', '#4cb6ff', '#ffd23f'], block: 'metalblock', ice: false, topStyle: 'plank', dotShape: 'dot' },
  gearden: { sky: ['#d8c8a8', '#ece2cc', '#faf6ec'], panel: '#3a2a10', top: '#c9a24a', topHi: '#e8c87a', topLo: '#9a7a2a', fill: '#8a7a6a', fillLo: '#6e6052', dots: ['#ffd23f', '#5a4a3a', '#c9b49a'], block: 'gearblock', ice: false, topStyle: 'plank', dotShape: 'pebble' },
});

/* ===== Посилка, поштомат, шлагбаум ===== */
function drawParcelBox(c, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s || 1, s || 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  c.fillStyle = '#d9a86a'; rr(c, -9, -8, 18, 16, 2); c.fill(); c.stroke();
  c.fillStyle = '#c08a4a'; c.fillRect(-9, -8, 18, 4); c.strokeRect(-9, -8, 18, 4);
  c.fillStyle = '#ff5c7a'; c.fillRect(-1.5, -8, 3, 16);
  c.fillStyle = '#ffffff'; rr(c, 2, 0, 6, 5, 1); c.fill(); c.fillStyle = '#ffd23f'; starPath(c, 5, 2.5, 2, 0.9, 0); c.fill();
  c.restore();
}
function drawLocker(c, l, t) {
  const x = l.x, gy = l.gy, w = 2 * T, h = 44, bob = l.joy > 0 ? Math.sin(l.joy * 20) * 1.5 : 0;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.5;
  c.fillStyle = '#ff6a4c'; rr(c, x + 1, gy - h + bob, w - 2, h - bob, 4); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; rr(c, x + 5, gy - h + 4 + bob, w - 10, 9, 2); c.fill(); c.stroke();
  c.fillStyle = l.open ? '#7fd46a' : '#4cb6ff'; c.font = '900 7px Nunito, sans-serif'; c.textAlign = 'center'; c.fillText(l.open ? 'ДЯКУЮ!' : 'ПОШТА', x + w / 2, gy - h + 11 + bob);
  for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) { c.fillStyle = '#ffd0c4'; rr(c, x + 5 + i * 20, gy - h + 16 + j * 8 + bob, 17, 6, 1.5); c.fill(); c.lineWidth = 0.8; c.stroke(); }
  if (!l.open && G.P.parcel) { c.globalAlpha = 0.6 + 0.4 * Math.sin(t * 6); c.fillStyle = '#ffd23f'; starPath(c, x + w / 2, gy - h - 8, 6, 2.6, 0); c.fill(); c.globalAlpha = 1; }
  c.restore();
}
function drawWorld23(c, t, vis) {
  if (G.lockers) for (const l of G.lockers) if (vis(l.x + T)) drawLocker(c, l, t);
  if (G.parcels) for (const p of G.parcels) if (p.state === 'idle' && vis(p.x)) drawParcelBox(c, p.x, p.y + Math.sin(t * 3 + p.x) * 1.5, 1);
  // шлагбауми поверх плиток дверей
  if (G.pdoors) for (const d of G.pdoors) for (let y = d.top; y < 10; y++) if (tileAt(d.x, y) === 2 && vis(d.x * T + 12)) {
    const x = d.x * T, yy = y * T; c.save(); c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, x + 1, yy, T - 2, T, 2); c.fill();
    c.save(); rr(c, x + 1, yy, T - 2, T, 2); c.clip(); c.fillStyle = '#ff5c5c'; for (let k = -T; k < T * 2; k += 10) { c.beginPath(); c.moveTo(x + k, yy); c.lineTo(x + k + 5, yy); c.lineTo(x + k + 5 - T, yy + T); c.lineTo(x + k - T, yy + T); c.closePath(); c.fill(); } c.restore();
    rr(c, x + 1, yy, T - 2, T, 2); c.stroke(); c.restore();
  }
  // вогонь
  if (G.fires) for (const f of G.fires) if (vis(f.x * T + 12)) drawFire23(c, f, t);
  // перемикачі й червоні/сині кубики
  if (G.swBlocks) for (const b of G.swBlocks) if (vis(b.x * T + 12)) drawSwBlock(c, b, t);
  if (G.switches) for (const s of G.switches) if (vis(s.x)) drawSwitch23(c, s, t);
  // невидимі містки
  if (G.ghosts) for (const g of G.ghosts) if (vis(g.x * T + 12)) drawGhostTile(c, g, t);
  const B = G.boss;
  if (B && B.kind === 'mouse' && G.arena) for (let k = 0; k < 4; k++) { const x = G.arena.x0 + (6 + k * 10) * T; if (vis(x)) drawGear(c, x, 3 * T + 10, 16, t * (k % 2 ? 0.4 : -0.4), 'rgba(201,162,74,.5)'); }
}
function drawFire23(c, f, t) {
  const x = f.x * T, y0 = f.row * T, h = f.h * T;
  if (f.out) { if (f.outT < 1.5) { c.save(); c.globalAlpha = 1 - f.outT / 1.5; c.fillStyle = '#ffffff'; for (let i = 0; i < 3; i++) { circ(c, x + 12 + Math.sin(i * 2 + f.outT * 3) * 6, y0 + h - 10 - f.outT * 30 - i * 8, 6 + f.outT * 4); c.fill(); } c.restore(); }
    c.fillStyle = 'rgba(60,40,40,.35)'; ell(c, x + 12, y0 + h - 2, 10, 3); c.fill(); return; }
  c.save(); c.lineJoin = 'round';
  const k = f.hp / (2 + f.h);
  for (const [col, sc] of [['#ff5c2a', 1], ['#ffa13d', 0.72], ['#ffe14d', 0.42]]) {
    c.fillStyle = col; c.beginPath(); c.moveTo(x + 12 - 11 * sc, y0 + h);
    const n = 3;
    for (let i = 0; i <= n; i++) { const fx = x + 12 - 11 * sc + i * 22 * sc / n, fy = y0 + h - h * sc * (0.55 + 0.45 * k) * (0.75 + 0.25 * Math.sin(t * 9 + i * 1.7 + f.x)); c.quadraticCurveTo(fx - 4 * sc, fy + h * 0.25 * sc, fx, fy); }
    c.lineTo(x + 12 + 11 * sc, y0 + h); c.closePath(); c.fill();
  }
  for (let i = 0; i < 3; i++) { const ph = (t * 1.3 + i * 0.33 + f.x * 0.1) % 1; c.globalAlpha = 1 - ph; c.fillStyle = '#ffd23f'; circ(c, x + 12 + Math.sin(i * 3 + t * 4) * 8, y0 + h * (1 - ph) - 4, 1.6); c.fill(); }
  c.restore();
}
function drawSwBlock(c, b, t) {
  const x = b.x * T, y = b.y * T, on = b.c === G.rbSw, col = b.c === 'R' ? ['#ff5c5c', '#ffa0a0', '#c03a3a'] : ['#4c8dff', '#a0c4ff', '#2a5ac0'];
  c.save(); c.lineJoin = 'round';
  if (on && tileAt(b.x, b.y) === 2) {
    c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, x + 1, y + 1, T - 2, T - 2, 3); c.fillStyle = col[0]; c.fill(); c.stroke();
    c.fillStyle = col[1]; rr(c, x + 4, y + 4, T - 8, 4, 2); c.fill(); c.fillStyle = col[2]; rr(c, x + 4, y + T - 7, T - 8, 3, 1.5); c.fill();
    c.fillStyle = '#ffffff'; c.globalAlpha = 0.85; if (b.c === 'R') { c.fillRect(x + 9, y + 9, 6, 6); } else { circ(c, x + 12, y + 12, 3.4); c.fill(); }
  } else {
    c.strokeStyle = col[0]; c.globalAlpha = 0.55; c.lineWidth = 1.4; c.setLineDash([3, 3]); rr(c, x + 3, y + 3, T - 6, T - 6, 3); c.stroke(); c.setLineDash([]);
  }
  c.restore();
}
function drawSwitch23(c, s, t) {
  const x = s.x, gy = s.gy, red = G.rbSw === 'R';
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#e4e0f0'; rr(c, x - 10, gy - 16, 20, 16, 3); c.fill(); c.stroke();
  c.fillStyle = red ? '#ff5c5c' : '#4c8dff'; circ(c, x, gy - 8, 5); c.fill(); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 2.4; c.beginPath(); c.moveTo(x, gy - 16); c.lineTo(x + (red ? -7 : 7), gy - 27); c.stroke();
  c.fillStyle = red ? '#ff5c5c' : '#4c8dff'; c.lineWidth = 1.2; circ(c, x + (red ? -7 : 7), gy - 28, 3.4); c.fill(); c.stroke();
  c.restore();
}
function drawGhostTile(c, g, t) {
  const x = g.x * T, y = g.y * T, on = tileAt(g.x, g.y) === 2;
  c.save();
  if (on) {
    const warn = G.P.glassT > 0 && G.P.glassT < 2.5 && Math.floor(G.t * 8) % 2 === 0;
    c.globalAlpha = warn ? 0.45 : 0.9; c.lineJoin = 'round';
    c.fillStyle = 'rgba(160,240,255,.75)'; c.strokeStyle = '#3fb0d0'; c.lineWidth = 1.4; rr(c, x + 1, y + 1, T - 2, T - 2, 4); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.moveTo(x + 4, y + 16); c.lineTo(x + 14, y + 4); c.lineTo(x + 18, y + 4); c.lineTo(x + 8, y + 16); c.closePath(); c.fill();
  } else {
    // ледь помітний відблиск, щоб було з чого здогадатися
    c.globalAlpha = 0.25 + 0.15 * Math.sin(t * 2 + g.x); sparkle(c, x + 12, y + 8, 1.6, '#ffffff');
  }
  c.restore();
}
function drawGear(c, x, y, r, a, col) {
  c.save(); c.translate(x, y); c.rotate(a); c.fillStyle = col; c.beginPath();
  for (let i = 0; i < 16; i++) { const aa = i * TAU / 16, rr2 = i % 2 ? r : r * 0.78; c.lineTo(Math.cos(aa) * rr2, Math.sin(aa) * rr2); }
  c.closePath(); c.fill(); c.globalCompositeOperation = 'destination-out'; circ(c, 0, 0, r * 0.3); c.fill(); c.restore();
}

/* ===== Єдиноріжка з посилкою, шлангом, каскою, ранцем, окулярами ===== */
function drawOver23(c, P, t) {
  const cx = P.x + P.w / 2, s = P.big ? 1.3 : P.mini ? 0.6 : 1;
  if (P.parcel) drawParcelBox(c, cx, P.y - 10 * s, 0.8 * s);
  if (P.helmet) { c.save(); c.translate(cx + P.dir * 4 * s, P.y + 2); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.1; c.fillStyle = '#ffcc1f'; c.beginPath(); c.arc(0, 0, 8, Math.PI, TAU); c.closePath(); c.fill(); c.stroke(); c.fillRect(-10, -1, 20, 2.4); c.strokeRect(-10, -1, 20, 2.4); c.restore(); }
  if (P.hose) { c.save(); c.translate(cx - P.dir * 9 * s, P.y + 14 * s); c.scale(s, s); c.strokeStyle = '#c0392b'; c.lineWidth = 2.6; c.lineCap = 'round'; c.beginPath(); c.arc(0, 0, 5, 0, TAU); c.stroke(); c.restore(); }
  if (P.jetT > 0) {
    c.save(); c.translate(cx - P.dir * 10 * s, P.y + 10 * s); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.1;
    c.fillStyle = '#b0bccc'; rr(c, -5, -8, 10, 15, 3); c.fill(); c.stroke(); c.fillStyle = '#ff5c7a'; rr(c, -5, -8, 10, 4, 2); c.fill(); c.stroke();
    if (P.jetOn) { const f = 8 + Math.sin(t * 50) * 3; c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(-4, 7); c.quadraticCurveTo(0, 7 + f + 4, 4, 7); c.closePath(); c.fill(); c.fillStyle = '#ff7a3d'; c.beginPath(); c.moveTo(-2, 7); c.quadraticCurveTo(0, 7 + f, 2, 7); c.closePath(); c.fill(); }
    // паливо
    c.fillStyle = 'rgba(59,31,79,.35)'; rr(c, 7, -8, 3, 15, 1.5); c.fill(); c.fillStyle = P.fuel > 0.3 ? '#7fd46a' : '#ff5c5c'; const fh = 15 * P.fuel / JET_FUEL; rr(c, 7, 7 - fh, 3, fh, 1.5); c.fill();
    c.restore();
  }
  if (P.glassT > 0) { c.save(); c.translate(cx + P.dir * 9 * s, P.y + 9 * s); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = 'rgba(127,224,255,.6)'; circ(c, -3, 0, 3.4); c.fill(); c.stroke(); circ(c, 4, 0, 3.4); c.fill(); c.stroke(); c.restore(); }
}
function drawPowerIcon23(c, kind, t) {
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1;
  if (kind === 'hose') { c.strokeStyle = '#c0392b'; c.lineWidth = 2.6; c.beginPath(); c.arc(-1, 1, 5.5, 0, TAU); c.stroke(); c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, 3, -8, 4, 7, 1.5); c.fill(); c.stroke(); c.fillStyle = '#7fd0ff'; circ(c, 5, -10, 1.6); c.fill(); }
  else if (kind === 'helmet') { c.fillStyle = '#ffcc1f'; c.beginPath(); c.arc(0, 3, 8, Math.PI, TAU); c.closePath(); c.fill(); c.stroke(); c.fillRect(-10, 2, 20, 3); c.strokeRect(-10, 2, 20, 3); c.strokeStyle = '#e0a000'; c.beginPath(); c.moveTo(0, -5); c.lineTo(0, 2); c.stroke(); }
  else if (kind === 'jetpack') { c.fillStyle = '#b0bccc'; rr(c, -6, -8, 5, 13, 2); c.fill(); c.stroke(); rr(c, 1, -8, 5, 13, 2); c.fill(); c.stroke(); c.fillStyle = '#ff7a3d'; c.beginPath(); c.moveTo(-5, 5); c.lineTo(-3.5, 10); c.lineTo(-2, 5); c.closePath(); c.fill(); c.beginPath(); c.moveTo(2, 5); c.lineTo(3.5, 10); c.lineTo(5, 5); c.closePath(); c.fill(); }
  else if (kind === 'glasses') { c.fillStyle = 'rgba(127,224,255,.75)'; c.lineWidth = 1.4; circ(c, -4.5, 0, 4); c.fill(); c.stroke(); circ(c, 4.5, 0, 4); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-0.5, -1); c.lineTo(0.5, -1); c.stroke(); sparkle(c, 6, -5, 1.6, '#ffffff'); }
  else return false;
  return true;
}

/* ===== Боси: Цуцик Гавчик і Мишеня Клацик ===== */
function drawPuppyBoss(c, B, t) {
  const x = B.x, y = B.y, fl = B.flash > 0, rest = B.state === 'rest' && !B.dead, run = B.state === 'dash' && !B.dead;
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.6;
  if (B.dir > 0) c.scale(-1, 1);
  const body = fl ? '#ffffff' : '#f2d2a0', patch = fl ? '#ffffff' : '#a8683a';
  if (rest) {
    // лежить на спинці, лапки догори
    c.fillStyle = body; ell(c, 0, 10, 30, 15); c.fill(); c.stroke();
    c.fillStyle = '#ffe8d0'; ell(c, 0, 6, 18, 8); c.fill();
    for (const lx of [-16, -6, 6, 16]) { c.fillStyle = body; rr(c, lx - 3, -8 + Math.sin(t * 8 + lx) * 2, 6, 14, 3); c.fill(); c.stroke(); }
    c.fillStyle = body; circ(c, -30, 6, 13); c.fill(); c.stroke();
    c.fillStyle = patch; ell(c, -36, -2, 6, 9, 0.6); c.fill(); c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.arc(-27, 2, 2.6, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); c.beginPath(); c.arc(-35, 6, 2.4, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();
    c.fillStyle = '#ff7a9a'; ell(c, -38, 16 + Math.sin(t * 10) * 1.5, 3, 5); c.fill(); c.stroke();
  } else {
    const leg = run ? Math.sin(t * 22) * 6 : 0;
    c.fillStyle = body;
    for (const [lx, ph] of [[-16, 1], [-8, -1], [10, -1], [18, 1]]) { rr(c, lx - 3 + leg * ph * 0.4, 12, 6, 13, 3); c.fill(); c.stroke(); }
    ell(c, 0, 4, 26, 15); c.fill(); c.stroke();
    c.fillStyle = patch; ell(c, 8, -2, 9, 6, 0.3); c.fill();
    // хвостик махає
    c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(24, 0); c.quadraticCurveTo(34, -6, 32 + Math.sin(t * (B.dead ? 20 : 12)) * 5, -16); c.stroke(); c.strokeStyle = body; c.lineWidth = 2.4; c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1.6;
    c.fillStyle = body; circ(c, -24, -10, 15); c.fill(); c.stroke();
    c.fillStyle = patch; ell(c, -30, -22, 6, 11, 0.5 + (run ? Math.sin(t * 20) * 0.3 : 0)); c.fill(); c.stroke();
    c.fillStyle = body; ell(c, -34, -6, 9, 7); c.fill(); c.stroke();
    c.fillStyle = INK; ell(c, -41, -8, 3.4, 2.6); c.fill();
    if (B.dead) { c.lineWidth = 1.8; c.beginPath(); c.arc(-24, -14, 3, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke(); }
    else { c.fillStyle = INK; circ(c, -24, -14, 2.6); c.fill(); c.fillStyle = '#fff'; circ(c, -25, -15, 0.9); c.fill(); }
    c.fillStyle = '#ff7a9a'; ell(c, -36, 0 + (run ? 2 : 0), 2.6, 4 + (run ? 2 : 0)); c.fill(); c.stroke();
    c.fillStyle = '#4cb6ff'; rr(c, -18, -2, 6, 6, 2); c.fill(); c.stroke();
  }
  c.restore();
  if (B.dead) for (let i = 0; i < 6; i++) { const a = t * 1.6 + i * TAU / 6; c.save(); c.globalAlpha = 0.85; heart21(c, x + Math.cos(a) * 44, y - 6 + Math.sin(a) * 26, 0.55); c.fillStyle = '#ff7ab8'; c.fill(); c.restore(); }
}
function drawMouseBoss(c, B, t) {
  const x = B.x, y = B.y, fl = B.flash > 0, rest = B.state === 'rest' && !B.dead, run = B.state === 'dash' && !B.dead;
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.6;
  if (B.dir > 0) c.scale(-1, 1);
  const body = fl ? '#ffffff' : '#b8bcc8', dark = fl ? '#ffffff' : '#8a90a0';
  // колеса
  for (const wx of [-14, 14]) { c.fillStyle = '#5a5a6a'; circ(c, wx, 20, 6); c.fill(); c.stroke(); c.strokeStyle = '#d0d0d8'; c.lineWidth = 1.2; const a = run ? t * 30 : 0; c.beginPath(); c.moveTo(wx + Math.cos(a) * 4, 20 + Math.sin(a) * 4); c.lineTo(wx - Math.cos(a) * 4, 20 - Math.sin(a) * 4); c.stroke(); c.strokeStyle = INK; c.lineWidth = 1.6; }
  // хвіст-пружинка
  c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); for (let i = 0; i <= 12; i++) { const k = i / 12; c.lineTo(26 + k * 18, 8 + Math.sin(k * 12 + t * 6) * 3 - k * 6); } c.stroke();
  c.fillStyle = body; c.beginPath(); c.moveTo(-34, 10); c.quadraticCurveTo(-30, -18, 4, -18); c.quadraticCurveTo(30, -18, 30, 6); c.quadraticCurveTo(30, 16, 18, 16); c.lineTo(-24, 16); c.quadraticCurveTo(-34, 16, -34, 10); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = dark; for (let i = 0; i < 3; i++) { rr(c, -8 + i * 10, -12, 3, 24, 1.5); c.fill(); }
  // вушка
  c.fillStyle = body; circ(c, -14, -20, 9); c.fill(); c.stroke(); c.fillStyle = '#ffb3c8'; circ(c, -14, -20, 5); c.fill();
  // ніс і вусики
  c.fillStyle = '#ff7ab8'; circ(c, -35, 8, 3); c.fill(); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 0.9; c.beginPath(); c.moveTo(-34, 10); c.lineTo(-44, 8); c.moveTo(-34, 11); c.lineTo(-44, 13); c.stroke();
  // око
  c.lineWidth = 1.6;
  if (rest) { c.beginPath(); c.arc(-22, -2, 3, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); }
  else if (B.dead) { c.beginPath(); c.arc(-22, -1, 3, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke(); }
  else { c.fillStyle = INK; circ(c, -22, -2, 3); c.fill(); c.fillStyle = '#fff'; circ(c, -23, -3, 1); c.fill(); }
  // заводний ключик: крутиться, а коли відпочиває — стоїть
  const ka = rest ? 0 : t * (run ? 14 : 6);
  c.save(); c.translate(8, -20); c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1.3; rr(c, -2, -8, 4, 8, 1); c.fill(); c.stroke();
  c.translate(0, -10); c.scale(Math.cos(ka), 1); ell(c, -6, 0, 5, 3.6); c.fill(); c.stroke(); ell(c, 6, 0, 5, 3.6); c.fill(); c.stroke(); c.restore();
  c.restore();
  if (B.dead) for (let i = 0; i < 6; i++) { const a = t * 1.5 + i * TAU / 6; sparkle(c, x + Math.cos(a) * 46, y - 4 + Math.sin(a) * 28, 2.2, RAINBOW[i]); }
}
function drawBoneBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(b.t * 12); c.strokeStyle = INK; c.lineWidth = 1.1; c.fillStyle = '#fffaf0';
  rr(c, -7, -2, 14, 4, 2); c.fill(); c.stroke(); for (const s of [-1, 1]) { circ(c, s * 7, -2.4, 2.6); c.fill(); c.stroke(); circ(c, s * 7, 2.4, 2.6); c.fill(); c.stroke(); }
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock23(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'boxblock') { rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = '#d9a86a'; c.fill(); c.stroke(); c.fillStyle = '#c08a4a'; c.fillRect(1, 1, T - 2, 5); c.fillStyle = '#ff5c7a'; c.fillRect(10.5, 1, 3, T - 2); }
  else if (b === 'redbrick') { rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = '#c0503a'; c.fill(); c.stroke(); c.strokeStyle = 'rgba(255,220,200,.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(1, 8); c.lineTo(T - 1, 8); c.moveTo(1, 16); c.lineTo(T - 1, 16); c.moveTo(12, 1); c.lineTo(12, 8); c.moveTo(6, 8); c.lineTo(6, 16); c.moveTo(18, 8); c.lineTo(18, 16); c.moveTo(12, 16); c.lineTo(12, T - 1); c.stroke(); }
  else if (b === 'girder') { rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = '#ff9a2a'; c.fill(); c.stroke(); c.strokeStyle = '#c06a10'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(3, 3); c.lineTo(T - 3, T - 3); c.moveTo(T - 3, 3); c.lineTo(3, T - 3); c.stroke(); c.fillStyle = '#5a3a1a'; for (const [a, d] of [[4, 4], [20, 4], [4, 20], [20, 20]]) { circ(c, a, d, 1.3); c.fill(); } }
  else if (b === 'nightblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#5a5a8a'; c.fill(); c.stroke(); c.fillStyle = '#ffd23f'; rr(c, 5, 5, 6, 6, 1); c.fill(); c.fillStyle = '#3a3a5e'; rr(c, 13, 5, 6, 6, 1); c.fill(); c.fillStyle = '#ffe9a0'; rr(c, 5, 13, 6, 6, 1); c.fill(); }
  else if (b === 'boneblock') { rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#8fd07a'; c.fill(); c.stroke(); c.fillStyle = '#fffaf0'; c.strokeStyle = INK; c.lineWidth = 0.9; rr(c, 6, 10, 12, 4, 2); c.fill(); c.stroke(); for (const s of [6, 18]) { circ(c, s, 10, 2); c.fill(); c.stroke(); circ(c, s, 14, 2); c.fill(); c.stroke(); } }
  else if (b === 'metalblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#b8c4d4'; c.fill(); c.stroke(); c.fillStyle = '#dce4ee'; rr(c, 3.5, 3.5, T - 7, 4, 2); c.fill(); c.fillStyle = '#6a7a8e'; for (const [a, d] of [[5, 5], [19, 5], [5, 19], [19, 19]]) { circ(c, a, d, 1.3); c.fill(); } }
  else if (b === 'glassblock') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#9fd8cc'; c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.moveTo(4, 14); c.lineTo(12, 4); c.lineTo(16, 4); c.lineTo(8, 14); c.closePath(); c.fill(); }
  else if (b === 'gearblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#a89070'; c.fill(); c.stroke(); drawGear(c, 12, 12, 8, 0.3, '#ffd23f'); }
  else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor23(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'coneS': c.fillStyle = '#ff8a2a'; c.beginPath(); c.moveTo(x - 6, y); c.lineTo(x, y - 14); c.lineTo(x + 6, y); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#fff'; c.fillRect(x - 3.2, y - 8, 6.4, 2.4); break;
    case 'hydrantS': c.fillStyle = '#e0392b'; rr(c, x - 4, y - 12, 8, 12, 2); c.fill(); c.stroke(); c.beginPath(); c.arc(x, y - 12, 4, Math.PI, TAU); c.fill(); c.stroke(); rr(c, x - 7, y - 9, 14, 3, 1); c.fill(); c.stroke(); break;
    case 'mailS': c.fillStyle = '#4c8dff'; rr(c, x - 6, y - 16, 12, 10, 4); c.fill(); c.stroke(); c.fillStyle = '#8a6a4a'; c.fillRect(x - 1, y - 6, 2, 6); c.fillStyle = '#ffd23f'; c.fillRect(x - 3, y - 13, 6, 1.6); break;
    case 'lampS': c.strokeStyle = '#4a4a6a'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 26); c.stroke(); c.fillStyle = '#ffe9a0'; circ(c, x, y - 28, 4); c.fill(); c.save(); c.globalAlpha = 0.25; circ(c, x, y - 28, 14); c.fill(); c.restore(); break;
    case 'boneS': c.fillStyle = '#fffaf0'; rr(c, x - 6, y - 4, 12, 3, 1.5); c.fill(); c.stroke(); for (const s of [-6, 6]) { circ(c, x + s, y - 4, 1.8); c.fill(); c.stroke(); circ(c, x + s, y - 1, 1.8); c.fill(); c.stroke(); } break;
    case 'gearS': drawGear(c, x, y - 8, 7, t * 0.8 + x, d.c || '#c9a24a'); break;
  }
}

/* ===== Фони ===== */
function bgCity(c, viewW, camX, t, night) {
  if (night) { c.fillStyle = 'rgba(255,255,255,.8)'; for (let i = 0; i < 30; i++) { circ(c, wrapX(i * 83 - camX * 0.04, viewW + 20) - 10, (i * 41) % 140, 0.9); c.fill(); } c.fillStyle = '#fff6c8'; circ(c, viewW * 0.8, 50, 16); c.fill(); }
  else for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 80, cols = night ? ['#3a3a6a', '#2f2f5a', '#45457a'] : ['#c4cce0', '#d8c4b0', '#b8d0c8'];
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span), k = ((i % 3) + 3) % 3, h = 90 + k * 30;
    c.fillStyle = cols[k]; c.fillRect(wx + 6, 222 - h, 64, h);
    for (let a = 0; a < 3; a++) for (let b = 0; b < Math.floor(h / 26); b++) { const lit = night ? ((a * 7 + b * 3 + i) % 3 !== 0) : false; c.fillStyle = lit ? '#ffe08a' : night ? '#2a2a4a' : 'rgba(255,255,255,.75)'; c.fillRect(wx + 14 + a * 18, 222 - h + 10 + b * 26, 10, 14); }
  }
}
function bgPostoffice(c, viewW, camX, t) { bgCity(c, viewW, camX, t, false); hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#d0d0dc'); }
function bgFirestation(c, viewW, camX, t) {
  bgCity(c, viewW, camX, t, false);
  const fx = wrapX(240 - camX * 0.2, viewW + 260) - 130;
  c.fillStyle = '#d0503a'; c.fillRect(fx, 120, 120, 102); c.fillStyle = '#fff'; c.fillRect(fx + 12, 150, 40, 72); c.fillRect(fx + 66, 150, 40, 72);
  c.strokeStyle = '#d0503a'; c.lineWidth = 2; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(fx + 12, 160 + k * 16); c.lineTo(fx + 52, 160 + k * 16); c.moveTo(fx + 66, 160 + k * 16); c.lineTo(fx + 106, 160 + k * 16); c.stroke(); }
  c.fillStyle = '#ffd23f'; circ(c, fx + 60, 134, 8); c.fill();
  hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#c8c8d4');
}
function bgConstruction(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const kx = wrapX(300 - camX * 0.15, viewW + 400) - 200;
  c.strokeStyle = '#ffa020'; c.lineWidth = 4; c.beginPath(); c.moveTo(kx, 222); c.lineTo(kx, 60); c.lineTo(kx + 160, 60); c.moveTo(kx - 40, 60); c.lineTo(kx, 60); c.stroke();
  c.lineWidth = 1.5; for (let y = 70; y < 222; y += 16) { c.beginPath(); c.moveTo(kx - 6, y); c.lineTo(kx + 6, y + 16); c.stroke(); }
  const hx = kx + 60 + Math.sin(t * 0.6) * 60; c.strokeStyle = '#5a4a3a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(hx, 60); c.lineTo(hx, 120); c.stroke(); c.fillStyle = '#ff9a2a'; c.fillRect(hx - 14, 120, 28, 10);
  c.fillStyle = '#c9b6a0'; c.fillRect(wrapX(80 - camX * 0.25, viewW + 200) - 100, 150, 90, 72);
  hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#e8cc96');
}
function bgCitynight(c, viewW, camX, t) { bgCity(c, viewW, camX, t, true); hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#2a2a4a'); }
function bgDogpark(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 190, 10, 0.012, 0.4, camX * 0.12, '#bfe8b0');
  const span = 130; for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.3, span) + 40; c.fillStyle = '#7a5a3e'; c.fillRect(wx - 4, 170, 8, 52); c.fillStyle = '#6fc75a'; circ(c, wx, 160, 24); c.fill(); circ(c, wx - 16, 172, 16); c.fill(); circ(c, wx + 16, 172, 16); c.fill(); }
  hill(c, viewW, 218, 6, 0.03, 1.2, camX * 0.45, '#9fe08a');
}
function bgLab(c, viewW, camX, t, tint) {
  c.strokeStyle = tint; c.lineWidth = 1; for (let x = -((camX * 0.2) % 40); x < viewW; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 222); c.stroke(); } for (let y = 20; y < 222; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(viewW, y); c.stroke(); }
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 170 + 60 - camX * 0.25, viewW + 180) - 90; drawGear(c, x, 70 + (i % 3) * 40, 18 + (i % 2) * 10, t * (i % 2 ? 0.5 : -0.5), 'rgba(140,150,170,.35)'); }
}
function bgJetlab(c, viewW, camX, t) { bgLab(c, viewW, camX, t, 'rgba(76,182,255,.15)'); for (let i = 0; i < 3; i++) { const x = wrapX(i * 260 + t * 40 - camX * 0.3, viewW + 200) - 100, y = 60 + i * 30 + Math.sin(t * 2 + i) * 10; c.fillStyle = 'rgba(255,122,61,.5)'; circ(c, x - 10, y + 6, 4); c.fill(); c.fillStyle = 'rgba(176,188,204,.8)'; rr(c, x - 6, y - 8, 12, 16, 4); c.fill(); } hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#c8e4f4'); }
function bgSwitchworks(c, viewW, camX, t) { bgLab(c, viewW, camX, t, 'rgba(154,134,216,.18)'); const span = 120; for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.3, span) + 30, on = (Math.floor(t * 1.5) + i) % 2 === 0; c.fillStyle = on ? 'rgba(255,92,92,.45)' : 'rgba(76,141,255,.45)'; rr(c, wx, 130, 22, 22, 4); c.fill(); } hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#ddd4f4'); }
function bgGlassbridge(c, viewW, camX, t) { for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.9)'); } const span = 100; for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.25, span) + 30, h = 60 + (((i % 3) + 3) % 3) * 30; c.fillStyle = 'rgba(127,224,200,.35)'; c.beginPath(); c.moveTo(wx, 222); c.lineTo(wx + 18, 222 - h); c.lineTo(wx + 36, 222); c.closePath(); c.fill(); } hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#c4f0e4'); }
function bgInventfair(c, viewW, camX, t) { bgLab(c, viewW, camX, t, 'rgba(255,184,76,.15)'); for (let i = -1; i < viewW / 90 + 2; i++) { const wx = i * 90 + wrapX(-camX * 0.3, 90); c.strokeStyle = 'rgba(74,42,10,.4)'; c.lineWidth = 1; c.beginPath(); c.moveTo(wx, 50); c.quadraticCurveTo(wx + 45, 64, wx + 90, 50); c.stroke(); for (let j = 0; j < 5; j++) { c.fillStyle = RAINBOW[(j + i * 3 + 30) % 6]; const fx = wx + 10 + j * 17, fy = 52 + Math.sin((j + 0.5) / 5 * Math.PI) * 10; c.beginPath(); c.moveTo(fx - 5, fy); c.lineTo(fx + 5, fy); c.lineTo(fx, fy + 9); c.closePath(); c.fill(); } } hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#f4dcb8'); }
function bgGearden(c, viewW, camX, t) { bgLab(c, viewW, camX, t, 'rgba(154,122,42,.18)'); hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#e0d0a8'); }
Object.assign(BG2, { postoffice: bgPostoffice, firestation: bgFirestation, construction: bgConstruction, citynight: bgCitynight, dogpark: bgDogpark, jetlab: bgJetlab, switchworks: bgSwitchworks, glassbridge: bgGlassbridge, inventfair: bgInventfair, gearden: bgGearden });
