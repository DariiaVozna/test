'use strict';
/* ===== Частина 15: Мильне озеро, Горіховий гай, Морський форт, Мотузковий парк, Лисяча нора ===== */
Object.assign(THEMES, {
  soaplake: { sky: ['#c9e6ff', '#e6f2ff', '#ffeaf6'], panel: '#2a4a7a', top: '#8fe0c8', topHi: '#c4f5e4', topLo: '#4fb89a', fill: '#b9a8ff', fillLo: '#9d8aef', dots: ['#ffffff', '#d6f3ff', '#ffd6f0'], block: 'soapblock', ice: false, topStyle: 'grass', dotShape: 'dot' },
  nutgrove: { sky: ['#ffd9a8', '#ffe9c9', '#fff6e6'], panel: '#4a2a10', top: '#e88a3d', topHi: '#ffb36a', topLo: '#b85a20', fill: '#9a6040', fillLo: '#7a4a30', dots: ['#c98d55', '#5a3a24', '#e6bf8f'], block: 'nutblock', ice: false, topStyle: 'leaves', dotShape: 'pebble' },
  seafort: { sky: ['#ff9f8a', '#ffc9a0', '#ffe9c4'], panel: '#3a1a3a', top: '#f2d08a', topHi: '#fff0c0', topLo: '#c9a35a', fill: '#d9c3a0', fillLo: '#b89f7a', dots: [], block: 'fortblock', ice: false, topStyle: 'sand', fillStyle: 'bricks' },
  ropepark: { sky: ['#bff0d0', '#e0f8e8', '#fffbe6'], panel: '#1a4a2a', top: '#6fcf6a', topHi: '#a8ef9a', topLo: '#3a9a4a', fill: '#c98d55', fillLo: '#8a5a30', dots: [], block: 'ropeblock', ice: false, topStyle: 'grass', fillStyle: 'planks' },
  foxden: { sky: ['#141a3a', '#283060', '#4a4a8a'], panel: '#0d0a24', top: '#4f9a6b', topHi: '#7fcf8f', topLo: '#2a6345', fill: '#5a3a5a', fillLo: '#45294a', dots: ['#6e4a6e', '#8a6a8a', '#ffd36a'], block: 'denblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
});
Object.assign(PLANKS, { ropepark: ['#c98d55', '#8a5a30'], nutgrove: ['#c98d55', '#8a5a30'] });

/* ===== Вороги ===== */
function drawMoth(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round';
  const f = Math.sin(t * 16);
  c.strokeStyle = INK; c.lineWidth = 1;
  for (const s of [-1, 1]) {
    c.save(); c.scale(1, 1); c.rotate(s * (0.3 + f * 0.35));
    c.fillStyle = flash ? '#fff' : '#e6dcff'; ell(c, -2, s * -8, 9, 6, s * 0.4); c.fill(); c.stroke();
    c.fillStyle = '#b9a8ff'; circ(c, -3, s * -8, 2.4); c.fill();
    c.restore();
  }
  c.fillStyle = flash ? '#fff' : '#c9b08a'; ell(c, 0, 0, 7, 4.4); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(59,31,79,.35)'; c.beginPath(); c.moveTo(-3, -3.6); c.lineTo(-3, 3.6); c.moveTo(0, -4.2); c.lineTo(0, 4.2); c.stroke();
  c.fillStyle = '#fff'; circ(c, 5, -1, 2); c.fill(); c.fillStyle = INK; circ(c, 5.6, -1, 1); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.9; c.beginPath(); c.moveTo(6, -3); c.quadraticCurveTo(9, -9, 12, -8); c.moveTo(5, -3.5); c.quadraticCurveTo(6, -10, 9, -11); c.stroke();
  c.restore();
}
function drawCrayfish(c, x, gy, dir, t, flash) {
  // рак ходить задом наперед: голова дивиться проти руху
  c.save(); c.translate(x, gy); c.scale(-dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const body = flash ? '#fff' : '#ff6b4a', snap = Math.max(0, Math.sin(t * 5)) * 0.5;
  c.strokeStyle = INK; c.lineWidth = 1.1;
  for (const lx of [-6, -1, 4]) { c.beginPath(); c.moveTo(lx, -5); c.lineTo(lx - 2 + Math.sin(t * 12 + lx) * 1.5, 0); c.stroke(); }
  c.fillStyle = body;
  for (let i = 0; i < 3; i++) { ell(c, -8 - i * 4.5, -6 + i * 0.6, 3.6 - i * 0.5, 3.4 - i * 0.4); c.fill(); c.stroke(); }
  c.beginPath(); c.moveTo(-21, -5); c.lineTo(-25, -9); c.lineTo(-25, -1); c.closePath(); c.fill(); c.stroke();
  ell(c, 2, -7, 8, 5.4); c.fill(); c.stroke();
  for (const s of [-1, 1]) {
    c.save(); c.translate(9, -9 + s * 2); c.rotate(s * -0.5);
    c.beginPath(); c.moveTo(0, 0); c.lineTo(5, -2 * s); c.stroke();
    c.save(); c.translate(7, -3 * s); c.fillStyle = body;
    c.beginPath(); c.moveTo(0, 0); c.lineTo(6, -3 - snap * 3); c.lineTo(7, 0); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(0, 0); c.lineTo(6, 3 + snap * 3); c.lineTo(7, 0); c.closePath(); c.fill(); c.stroke();
    c.restore(); c.restore();
  }
  c.fillStyle = '#fff'; circ(c, 6, -13, 2.2); c.fill(); c.stroke(); circ(c, 1, -13, 2.2); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 6.6, -13, 1.1); c.fill(); circ(c, 1.6, -13, 1.1); c.fill();
  c.restore();
}
function drawEnemy11(c, e, cx, fl) {
  switch (e.k) {
    case 'moth': drawMoth(c, cx, e.y + e.h / 2, e.t, e.dir, fl); return true;
    case 'crayfish': drawCrayfish(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
  }
  return drawEnemy12(c, e, cx, fl);
}

/* ===== Плитки: місток із колеса, ворота, поручні ===== */
Object.assign(TILE7, { thornV: 1, nutPlank: 1, nutPlankW: 1, nutSlot: 1, gate: 1, gateW: 1, gateOpen: 1, barL: 1, barR: 1, barM: 1, barLR: 1 });
function tileKind11(v, tx, ty) {
  if (v >= 36) return tileKind12(v, tx, ty);
  const w = G.wheelOf && G.wheelOf.get(ty * G.Wt + tx), blink = w && w.warn && Math.floor(G.t * 8) % 2;
  if (v === 31) return blink ? 'nutPlankW' : 'nutPlank';
  if (v === 32) return 'nutSlot';
  if (v === 33) return blink ? 'gateW' : 'gate';
  if (v === 34) return 'gateOpen';
  const l = tileAt(tx - 1, ty) === 35, r = tileAt(tx + 1, ty) === 35;
  return l && r ? 'barM' : l ? 'barR' : r ? 'barL' : 'barLR';
}
function drawTile11(c, kind) {
  c.lineJoin = 'round'; c.lineCap = 'round';
  if (kind === 'nutPlank' || kind === 'nutPlankW') {
    c.globalAlpha = kind === 'nutPlankW' ? 0.45 : 1;
    c.fillStyle = '#d9a36c'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, 0.5, 1, T - 1, 9, 2); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(2, 2.5, T - 4, 1.6);
    c.strokeStyle = '#a8743f'; c.lineWidth = 1; c.beginPath(); c.moveTo(8, 3); c.lineTo(8, 9); c.moveTo(16, 3); c.lineTo(16, 9); c.stroke();
    c.fillStyle = INK; circ(c, 4, 5.5, 0.8); c.fill(); circ(c, 20, 5.5, 0.8); c.fill();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, 11); c.quadraticCurveTo(T / 2, 17, T, 11); c.stroke();
    c.globalAlpha = 1;
  } else if (kind === 'nutSlot') {
    c.strokeStyle = 'rgba(138,90,48,.5)'; c.lineWidth = 1.2; c.setLineDash([3, 3]); rr(c, 0.5, 1, T - 1, 9, 2); c.stroke(); c.setLineDash([]);
  } else if (kind === 'gate' || kind === 'gateW') {
    c.globalAlpha = kind === 'gateW' ? 0.45 : 1;
    c.strokeStyle = INK; c.lineWidth = 1.2;
    for (const bx of [3, 10.5, 18]) { c.fillStyle = '#a8743f'; rr(c, bx, 0, 4, T, 1.5); c.fill(); c.stroke(); }
    c.fillStyle = '#8a5a30'; rr(c, 0.5, 9, T - 1, 5, 1.5); c.fill(); c.stroke();
    c.fillStyle = '#c9d2e6'; for (const bx of [5, 12.5, 20]) { circ(c, bx, 11.5, 1.3); c.fill(); }
    c.globalAlpha = 1;
  } else if (kind === 'gateOpen') {
    c.strokeStyle = 'rgba(138,90,48,.28)'; c.lineWidth = 1; c.setLineDash([2, 3]);
    for (const bx of [5, 12.5, 20]) { c.beginPath(); c.moveTo(bx, 0); c.lineTo(bx, T); c.stroke(); }
    c.setLineDash([]);
  } else if (kind === 'thornV') {
    // колюча ожина, що росте стовпчиком: колючки в обидва боки
    c.fillStyle = '#3f6a30'; c.strokeStyle = INK; c.lineWidth = 1.1;
    for (const y0 of [0, 12]) for (const s of [-1, 1]) { c.beginPath(); c.moveTo(12 + s * 3, y0 + 2); c.lineTo(12 + s * 11, y0 + 4 + (s > 0 ? 2 : 0)); c.lineTo(12 + s * 3, y0 + 9); c.closePath(); c.fill(); c.stroke(); }
    c.fillStyle = '#5a8a3a'; rr(c, 8.5, -1, 7, T + 2, 3); c.fill(); c.beginPath(); c.moveTo(8.5, -1); c.lineTo(8.5, T + 1); c.moveTo(15.5, -1); c.lineTo(15.5, T + 1); c.stroke();
    c.fillStyle = '#b48cff'; c.strokeStyle = INK; c.lineWidth = 0.8; circ(c, 12, 6, 2.2); c.fill(); c.stroke(); circ(c, 12, 18, 2.2); c.fill(); c.stroke();
  } else if (kind.startsWith('bar')) {
    const L = kind === 'barL' || kind === 'barLR', R = kind === 'barR' || kind === 'barLR';
    c.strokeStyle = '#a8743f'; c.lineWidth = 1.6;
    c.beginPath(); if (L) { c.moveTo(4, 0); c.lineTo(4, 5); } if (R) { c.moveTo(T - 4, 0); c.lineTo(T - 4, 5); } if (!L && !R) { c.moveTo(12, 0); c.lineTo(12, 5); } c.stroke();
    const x0 = L ? 2 : 0, x1 = R ? T - 2 : T;
    c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1.1; rr(c, x0, 4.5, x1 - x0, 4, 2); c.fill(); c.stroke();
    c.strokeStyle = '#ff7ab8'; c.lineWidth = 1.2; c.beginPath(); for (let x = x0 + 3; x < x1 - 1; x += 5) { c.moveTo(x, 4.8); c.lineTo(x + 2, 8.2); } c.stroke();
  } else drawTile12(c, kind);
}

/* ===== Мильні бульбашки ===== */
function soapBall(c, x, y, r, t, warn) {
  c.save();
  const g = c.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
  g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(0.6, warn ? 'rgba(255,200,220,.18)' : 'rgba(200,235,255,.14)'); g.addColorStop(1, warn ? 'rgba(255,140,180,.45)' : 'rgba(170,140,255,.4)');
  c.fillStyle = g; circ(c, x, y, r); c.fill();
  c.lineWidth = 1.6;
  for (let i = 0; i < 6; i++) { c.strokeStyle = RAINBOW[i]; c.globalAlpha = 0.45; c.beginPath(); c.arc(x, y, r - 0.6, t * 0.8 + i * 1.05, t * 0.8 + i * 1.05 + 0.9); c.stroke(); }
  c.globalAlpha = 1; c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 1.2; circ(c, x, y, r); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.9)'; ell(c, x - r * 0.42, y - r * 0.45, r * 0.22, r * 0.13, -0.6); c.fill();
  circ(c, x + r * 0.35, y + r * 0.42, r * 0.07); c.fill();
  c.restore();
}
function drawSoapIdle(c, s, t) {
  if (s.state === 'idle') { soapBall(c, s.x, s.y, 17, t, false); sparkle(c, s.x + 14, s.y - 16 + Math.sin(t * 4 + s.hx) * 2, 1.8, '#ffffff'); }
  else if (s.state === 'gone' && s.t > SOAP_BACK - 0.5) { const k = (s.t - (SOAP_BACK - 0.5)) / 0.5; soapBall(c, s.hx, s.hy, 17 * k, t, false); }
}
function drawSoapRide(c, P, t) {
  const s = P.bub, warn = s.life > SOAP_LIFE - 2, wob = warn ? Math.sin(t * 22) * 1.5 : Math.sin(t * 4) * 0.8;
  soapBall(c, P.x + P.w / 2, P.y + P.h / 2 - 2, 21 + wob, t, warn && Math.floor(t * 6) % 2);
}

/* ===== Колесо білочки ===== */
function drawNutWheel(c, w, t) {
  const cx = w.x, gy = w.gy, cy = gy - 27, R = 25;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = '#a8743f';
  for (const s of [-1, 1]) { c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + s * 20, gy); c.lineTo(cx + s * 15, gy); c.closePath(); c.fill(); c.stroke(); }
  c.strokeStyle = '#8a5a30'; c.lineWidth = 2;
  for (let i = 0; i < 4; i++) { const a = w.ang + i * Math.PI / 2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); c.stroke(); }
  c.strokeStyle = INK; c.lineWidth = 5.4; circ(c, cx, cy, R); c.stroke();
  c.strokeStyle = '#d9a36c'; c.lineWidth = 3.6; circ(c, cx, cy, R); c.stroke();
  c.fillStyle = '#ffe08a'; c.strokeStyle = INK; c.lineWidth = 0.8;
  for (let i = 0; i < 14; i++) { const a = w.ang + i * TAU / 14; c.save(); c.translate(cx + Math.cos(a) * R, cy + Math.sin(a) * R); c.rotate(a); rr(c, -1.6, -2.4, 3.2, 4.8, 1); c.fill(); c.stroke(); c.restore(); }
  c.fillStyle = '#c9d2e6'; c.lineWidth = 1.2; circ(c, cx, cy, 3.4); c.fill(); c.stroke();
  // жолудь на верхівці й шкала, скільки висунулося
  c.fillStyle = '#c98d55'; ell(c, cx, cy - R - 9, 5, 6); c.fill(); c.stroke();
  c.fillStyle = '#8a5a30'; ell(c, cx, cy - R - 13, 6, 3); c.fill(); c.stroke();
  c.lineWidth = 3; c.strokeStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.arc(cx, cy - R - 9, 10, 0, TAU); c.stroke();
  const k = w.full ? w.hold / WHEEL_HOLD : w.p;
  c.strokeStyle = w.full ? '#7fd46a' : '#ffb400'; c.beginPath(); c.arc(cx, cy - R - 9, 10, -Math.PI / 2, -Math.PI / 2 + TAU * k); c.stroke();
  c.restore();
}

/* ===== Гармата-гойдалка й пунктир ===== */
function drawSwCannon(c, cn, t) {
  const d = cn.dir || 1, load = cn.state === 'load';
  c.save(); c.translate(cn.x, cn.gy); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.save(); c.translate(0, -14); c.scale(d, 1); c.rotate(-cn.ang);
  c.fillStyle = '#5a6a9a'; rr(c, -8, -8, 32, 16, 6); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; rr(c, 20, -9.5, 6, 19, 2.5); c.fill(); c.stroke();
  c.fillStyle = '#3a3448'; ell(c, 26, 0, 2.4, 6.5); c.fill();
  c.fillStyle = '#ffd23f'; starPath(c, 6, 0, 4.6, 2, 0); c.fill(); c.lineWidth = 0.8; c.stroke();
  c.restore();
  c.fillStyle = '#c98d55'; c.lineWidth = 1.4; rr(c, -15, -13, 30, 9, 3); c.fill(); c.stroke();
  for (const wx of [-9, 9]) { c.fillStyle = '#8a5a30'; circ(c, wx, -3, 5.4); c.fill(); c.stroke(); c.fillStyle = '#ffd23f'; circ(c, wx, -3, 1.8); c.fill(); }
  if (load) sparkle(c, d * 4, -26 + Math.sin(t * 10) * 2, 2.2, '#ffffff');
  c.restore();
}
function drawCannonAim(c, cn, t) {
  const pts = [], land = cannonPath(cn, cn.ang, pts);
  c.save();
  for (let i = 0; i < pts.length; i += 2) {
    const k = i / pts.length;
    c.globalAlpha = 0.95 - k * 0.35; c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 0.8;
    circ(c, pts[i], pts[i + 1], 2.6 - k); c.fill(); c.stroke();
  }
  c.globalAlpha = 1;
  if (land && land.ok) {
    const pulse = 1 + Math.sin(t * 8) * 0.12;
    c.strokeStyle = '#ff4fa3'; c.lineWidth = 2; ell(c, land.x, land.y - 1, 12 * pulse, 4 * pulse); c.stroke();
    c.fillStyle = '#ffcf2e'; starPath(c, land.x, land.y - 12, 5, 2.2, t); c.fill(); c.strokeStyle = INK; c.lineWidth = 0.8; c.stroke();
  }
  c.restore();
}
function drawHangGrip(c, P, t) {
  const cx = P.x + P.w / 2, by = P.hang.row * T + 6.5;
  c.save(); c.strokeStyle = INK; c.lineWidth = 1; c.fillStyle = '#ffffff';
  for (const s of [-5, 5]) { c.beginPath(); c.moveTo(cx + s * 0.6 + P.dir * 3, P.y + 10); c.lineTo(cx + s, by); c.strokeStyle = '#ffffff'; c.lineWidth = 3; c.stroke(); c.strokeStyle = INK; c.lineWidth = 1; c.stroke(); circ(c, cx + s, by, 2.6); c.fill(); c.stroke(); }
  c.restore();
}
function drawWorld11(c, t, vis) {
  for (const w of G.nutWheels) if (vis(w.x, 60)) drawNutWheel(c, w, t);
  for (const cn of G.swc) if (vis(cn.x, 60)) drawSwCannon(c, cn, t);
  for (const s of G.soaps) if (vis(s.hx, 40)) drawSoapIdle(c, s, t);
  const P = G.P;
  if (P.inCannon && P.inCannon.swc) drawCannonAim(c, P.inCannon, t);
  const B = G.boss;
  if (B && B.kind === 'fox' && B.path && B.path.length && !B.dead) {
    c.save();
    for (let i = 0; i < B.path.length; i += 2) { c.globalAlpha = 0.85; c.fillStyle = '#ffb36a'; c.strokeStyle = INK; c.lineWidth = 0.8; circ(c, B.path[i], B.path[i + 1], 2.2); c.fill(); c.stroke(); }
    c.globalAlpha = 0.6 + Math.sin(t * 12) * 0.3; c.strokeStyle = '#ff5c3a'; c.lineWidth = 2; ell(c, B.aimX, B.gy - 1, 15, 4.5); c.stroke();
    c.restore();
  }
}

/* ===== Лис Хитрик ===== */
function drawFoxBoss(c, B, t) {
  const st = B.state, flash = B.flash > 0, happy = B.dead, d = B.dir || 1;
  const fur = flash ? '#fff' : '#f28c38', dark = '#5a3a24', cream = '#fff3e0';
  const crouch = st === 'crouch', dash = st === 'dash', tired = st === 'tired';
  c.save(); c.translate(B.x, B.fy); c.scale(d, 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.5;
  const lift = crouch ? 7 : happy ? 4 : 0, run = dash ? Math.sin(t * 30) : st === 'aim' ? 0 : Math.sin(t * 3) * 0.2;
  // хвіст із зірочками
  c.save(); c.translate(-16, -18 + lift); c.rotate(dash ? 0.9 : tired ? 1.25 : 0.4 + Math.sin(t * 3) * 0.12);
  c.fillStyle = fur; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-10, -26, -2, -38); c.quadraticCurveTo(12, -30, 8, -4); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = cream; c.beginPath(); c.moveTo(-5, -31); c.quadraticCurveTo(-2, -40, 4, -37); c.quadraticCurveTo(4, -32, -5, -31); c.fill(); c.stroke();
  if (!happy) for (let i = 0; i < 3; i++) { c.fillStyle = '#ffd23f'; starPath(c, 1 + i * 2, -10 - i * 8, 2.8, 1.2, t * 2 + i); c.fill(); c.lineWidth = 0.6; c.stroke(); c.lineWidth = 1.5; }
  c.restore();
  // лапи
  c.fillStyle = dark;
  if (happy) { ell(c, 6, -2, 6, 3); c.fill(); c.stroke(); ell(c, 16, -2, 6, 3); c.fill(); c.stroke(); }
  else for (const [lx, s] of [[-12, 1], [-5, -1], [9, 1], [15, -1]]) { c.save(); c.translate(lx, -10 + lift * 0.6); c.rotate(run * 0.6 * s); rr(c, -2.4, 0, 4.8, 10 - lift * 0.5, 2); c.fill(); c.stroke(); c.restore(); }
  // тулуб
  c.fillStyle = fur; ell(c, 1, -17 + lift, dash ? 23 : 20, crouch ? 9 : 11); c.fill(); c.stroke();
  c.fillStyle = cream; ell(c, 10, -13 + lift, 8, 6); c.fill();
  // голова
  c.save(); c.translate(dash ? 24 : 20, (happy ? -34 : -27) + lift + (crouch ? 3 : 0));
  c.fillStyle = fur; c.strokeStyle = INK;
  for (const ex of [-6, 5]) { c.beginPath(); c.moveTo(ex - 4, -7); c.lineTo(ex, -19); c.lineTo(ex + 4, -7); c.closePath(); c.fill(); c.stroke(); c.fillStyle = dark; c.beginPath(); c.moveTo(ex - 1.8, -8); c.lineTo(ex, -15); c.lineTo(ex + 1.8, -8); c.closePath(); c.fill(); c.fillStyle = fur; }
  c.beginPath(); c.moveTo(-9, -6); c.quadraticCurveTo(-4, -12, 6, -9); c.quadraticCurveTo(12, -6, 16, 1); c.quadraticCurveTo(8, 7, -2, 6); c.quadraticCurveTo(-10, 4, -9, -6); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = cream; c.beginPath(); c.moveTo(2, 2); c.quadraticCurveTo(10, 0, 16, 1); c.quadraticCurveTo(9, 7, 0, 6); c.closePath(); c.fill();
  c.fillStyle = INK; circ(c, 16, 0.5, 2.2); c.fill();
  if (tired) {
    c.lineWidth = 1.4; c.beginPath(); c.moveTo(1, -4); c.lineTo(5, -2); c.moveTo(1, -1); c.lineTo(5, -2); c.stroke();
    c.fillStyle = '#ff7a95'; c.strokeStyle = INK; c.lineWidth = 1; ell(c, 11, 7 + Math.sin(t * 10), 2.6, 4); c.fill(); c.stroke();
  } else if (happy) {
    c.lineWidth = 1.4; c.beginPath(); c.arc(3, -2, 2.6, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke();
    c.beginPath(); c.arc(9, 3.5, 3.2, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();
  } else {
    c.fillStyle = '#ffe14d'; ell(c, 3, -2.6, 3, 2.4); c.fill(); c.stroke();
    c.fillStyle = INK; ell(c, 3.8, -2.4, 1.2, 1.9); c.fill();
    c.lineWidth = 1.6; c.beginPath(); c.moveTo(-1, -6.5); c.lineTo(6.5, -5); c.stroke();
    c.lineWidth = 1.2; c.beginPath(); c.moveTo(8, 4); c.quadraticCurveTo(11, 5.5, 14, 3.5); c.stroke();
  }
  c.restore();
  // гармата для шишок
  if (st === 'aim') {
    c.save(); c.translate(30, -12); c.rotate(-B.ang); c.fillStyle = '#5a6a9a'; c.strokeStyle = INK; c.lineWidth = 1.3; rr(c, -5, -5, 20, 10, 4); c.fill(); c.stroke(); c.fillStyle = '#ffd23f'; rr(c, 13, -6, 4, 12, 2); c.fill(); c.stroke(); c.restore();
    c.fillStyle = '#8a5a30'; c.strokeStyle = INK; circ(c, 30, -5, 4.4); c.fill(); c.stroke();
  }
  c.restore();
  if (crouch) { c.save(); c.font = '900 16px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.lineWidth = 3; c.strokeStyle = INK; c.fillStyle = '#ffd23f'; const by = B.fy - 52 + Math.sin(t * 20) * 2; c.strokeText('!', B.x, by); c.fillText('!', B.x, by); c.restore(); }
  if (tired) for (let i = 0; i < 2; i++) { const k = (t * 1.2 + i * 0.5) % 1; c.save(); c.globalAlpha = 1 - k; c.fillStyle = '#9fe0ff'; c.strokeStyle = INK; c.lineWidth = 0.8; const sx = B.x + d * (14 + i * 8), sy = B.fy - 46 + k * 14; c.beginPath(); c.moveTo(sx, sy - 4); c.quadraticCurveTo(sx + 3, sy, sx, sy + 2); c.quadraticCurveTo(sx - 3, sy, sx, sy - 4); c.fill(); c.stroke(); c.restore(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, B.fy - 70 - k * 30, 9); c.fillStyle = ['#ff7ab8', '#ffd23f', '#ff5c8a'][i]; c.fill(); c.restore(); }
}
function drawConeBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(b.t * 7); c.lineJoin = 'round';
  c.fillStyle = '#a8743f'; c.strokeStyle = INK; c.lineWidth = 1.2; ell(c, 0, 0, 6.5, 9); c.fill(); c.stroke();
  c.strokeStyle = '#6a4424'; c.lineWidth = 1; c.beginPath();
  for (const y of [-5, -1, 3]) { c.moveTo(-5, y); c.lineTo(0, y + 3); c.lineTo(5, y); }
  c.stroke();
  c.fillStyle = '#5a3a24'; rr(c, -1.2, -12, 2.4, 4, 1); c.fill();
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock12(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'soapblock') {
    rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#ffd6f0'; c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.75)'; for (const [x, y, r] of [[8, 8, 3.4], [16, 14, 2.4], [8, 17, 1.6], [17, 6, 1.4]]) { circ(c, x, y, r); c.fill(); }
    c.strokeStyle = 'rgba(157,138,239,.6)'; c.lineWidth = 1; rr(c, 4, 4, T - 8, T - 8, 4); c.stroke();
  } else if (b === 'nutblock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#c98d55'; c.fill(); c.stroke();
    c.fillStyle = '#8a5a30'; ell(c, 12, 10, 6, 3); c.fill(); c.stroke();
    c.fillStyle = '#e6bf8f'; ell(c, 12, 15, 4.6, 5); c.fill(); c.stroke();
  } else if (b === 'fortblock') {
    rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = '#c9b08a'; c.fill(); c.stroke();
    c.strokeStyle = '#a08a68'; c.lineWidth = 1; c.beginPath(); c.moveTo(1, 9); c.lineTo(T - 1, 9); c.moveTo(1, 16); c.lineTo(T - 1, 16); c.moveTo(12, 1); c.lineTo(12, 9); c.moveTo(7, 9); c.lineTo(7, 16); c.moveTo(17, 9); c.lineTo(17, 16); c.moveTo(12, 16); c.lineTo(12, T - 1); c.stroke();
  } else if (b === 'ropeblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#d9a36c'; c.fill(); c.stroke();
    c.strokeStyle = '#a8743f'; c.lineWidth = 1; c.beginPath(); c.moveTo(1, 8); c.lineTo(T - 1, 8); c.moveTo(1, 16); c.lineTo(T - 1, 16); c.stroke();
    c.strokeStyle = '#fff3d6'; c.lineWidth = 2; c.beginPath(); c.moveTo(3, 3); c.lineTo(T - 3, T - 3); c.moveTo(T - 3, 3); c.lineTo(3, T - 3); c.stroke();
  } else if (b === 'denblock') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#7a5a8a'; c.fill(); c.stroke();
    c.fillStyle = '#ffd36a'; starPath(c, 12, 12, 5, 2.2, 0); c.fill(); c.lineWidth = 0.8; c.stroke();
  } else return drawBlock13(c, b);
  return true;
}

/* ===== Декор ===== */
function drawDecor15(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'bubbleS':
      for (const [dx, dy, r] of [[0, -8, 5], [6, -16, 3.4], [-4, -18, 2.4]]) { const by = y + dy + Math.sin(t * 2 + x + dx) * 1.5; c.fillStyle = 'rgba(255,255,255,.35)'; circ(c, x + dx, by, r); c.fill(); c.strokeStyle = 'rgba(157,138,239,.8)'; c.stroke(); c.fillStyle = 'rgba(255,255,255,.9)'; circ(c, x + dx - r * 0.35, by - r * 0.35, r * 0.25); c.fill(); }
      break;
    case 'duckS':
      c.fillStyle = '#ffd23f'; ell(c, x, y - 5, 7, 4.6); c.fill(); c.stroke(); circ(c, x + 4, y - 11, 3.6); c.fill(); c.stroke();
      c.fillStyle = '#ff9a3d'; c.beginPath(); c.moveTo(x + 7, y - 11.5); c.lineTo(x + 10.5, y - 10.5); c.lineTo(x + 7, y - 9.5); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = INK; circ(c, x + 5, y - 12, 0.8); c.fill();
      break;
    case 'acornS':
      c.fillStyle = '#c98d55'; ell(c, x, y - 5, 4, 5); c.fill(); c.stroke();
      c.fillStyle = '#8a5a30'; ell(c, x, y - 9, 5, 2.6); c.fill(); c.stroke(); c.beginPath(); c.moveTo(x, y - 11); c.lineTo(x + 1, y - 13.5); c.stroke();
      c.fillStyle = '#c98d55'; ell(c, x + 8, y - 4, 3.4, 4); c.fill(); c.stroke(); c.fillStyle = '#8a5a30'; ell(c, x + 8, y - 7.5, 4, 2); c.fill(); c.stroke();
      break;
    case 'cannonballs':
      c.fillStyle = '#4a4a6a'; for (const [dx, dy] of [[-5, -4], [5, -4], [0, -11]]) { circ(c, x + dx, y + dy, 4.6); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.35)'; circ(c, x + dx - 1.5, y + dy - 1.5, 1.4); c.fill(); c.fillStyle = '#4a4a6a'; }
      break;
    case 'ropecoil':
      c.strokeStyle = '#c98d55'; c.lineWidth = 2.2; for (let i = 0; i < 3; i++) { ell(c, x, y - 2 - i * 3, 8 - i, 3); c.stroke(); }
      c.strokeStyle = INK; c.lineWidth = 0.6; ell(c, x, y - 2, 9, 4); c.stroke();
      break;
    case 'moonflower':
      c.strokeStyle = '#3a9a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 12); c.stroke();
      c.save(); c.globalAlpha = 0.5 + Math.sin(t * 2 + x) * 0.2; c.fillStyle = '#fff8c0'; circ(c, x, y - 14, 8); c.fill(); c.restore();
      c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 0.8; for (let i = 0; i < 5; i++) { const a = i * TAU / 5 + 0.3; ell(c, x + Math.cos(a) * 3.4, y - 14 + Math.sin(a) * 3.4, 3, 2, a); c.fill(); c.stroke(); }
      c.fillStyle = '#ffd36a'; circ(c, x, y - 14, 1.8); c.fill();
      break;
    default: drawDecor16(c, d, t);
  }
}

/* ===== Фони ===== */
function bgSoapLake(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 200 - camX * 0.1 + t * 4, viewW + 240) - 120; puffCloud(c, x, 36 + (i % 3) * 20, 0.9, 'rgba(255,255,255,.9)'); }
  const R = rng(73);
  for (let i = 0; i < 22; i++) {
    const bx = wrapX(R() * 1600 - camX * (0.2 + R() * 0.2), viewW + 60) - 30, by = (VIEW_H + 40 - ((t * (12 + R() * 14) + R() * 400) % (VIEW_H + 80))), r = 3 + R() * 9;
    c.fillStyle = 'rgba(255,255,255,.22)'; circ(c, bx, by, r); c.fill(); c.strokeStyle = 'rgba(185,168,255,.55)'; c.lineWidth = 1; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.75)'; circ(c, bx - r * 0.35, by - r * 0.35, r * 0.22); c.fill();
  }
  hill(c, viewW, 196, 10, 0.012, 0.6, camX * 0.15, '#d6ccff');
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.35, '#bfeedd');
}
function bgNutGrove(c, viewW, camX, t) {
  hill(c, viewW, 190, 12, 0.012, 0.4, camX * 0.12, '#ffd2a0');
  const span = 110;
  for (const [f, base, cols] of [[0.2, 200, ['#ffb36a', '#ff9a4a', '#ffc46a']], [0.38, 214, ['#e8742d', '#d95a2a', '#f2a03d']]]) {
    for (let i = -1; i < viewW / span + 2; i++) {
      const wx = i * span + wrapX(-camX * f, span) + (f > 0.3 ? 40 : 0), k = ((i + Math.floor(camX * f / span)) % 3 + 3) % 3;
      c.fillStyle = f > 0.3 ? '#8a5a30' : '#b8865a'; c.fillRect(wx - 4, base - 60, 8, 70);
      c.fillStyle = cols[k]; circ(c, wx, base - 70, 26); c.fill(); circ(c, wx - 18, base - 58, 18); c.fill(); circ(c, wx + 18, base - 58, 18); c.fill();
    }
  }
  for (let i = 0; i < 10; i++) { const lx = wrapX(i * 97 - camX * 0.5 + Math.sin(t + i) * 20, viewW + 40) - 20, ly = (t * 24 + i * 53) % (VIEW_H + 20) - 10; c.save(); c.translate(lx, ly); c.rotate(t * 2 + i); c.fillStyle = ['#ff8a3d', '#e85d3a', '#ffd23f'][i % 3]; ell(c, 0, 0, 4, 2); c.fill(); c.restore(); }
}
function bgSeaFort(c, viewW, camX, t) {
  const sx = viewW * 0.72, sg = c.createRadialGradient(sx, 150, 6, sx, 150, 70);
  sg.addColorStop(0, 'rgba(255,240,180,1)'); sg.addColorStop(0.4, 'rgba(255,200,140,.85)'); sg.addColorStop(1, 'rgba(255,180,140,0)');
  c.fillStyle = sg; circ(c, sx, 150, 70); c.fill();
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 3, viewW + 240) - 120; puffCloud(c, x, 40 + (i % 2) * 26, 0.8, 'rgba(255,230,220,.85)'); }
  c.fillStyle = '#6aa8d9'; c.fillRect(0, 168, viewW, VIEW_H - 168);
  c.fillStyle = 'rgba(255,230,180,.6)'; for (let i = 0; i < 6; i++) { const wx = sx - 40 + Math.sin(t * 1.5 + i) * 6 + (i % 2) * 20; c.fillRect(wx, 174 + i * 6, 50 - i * 6, 2); }
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.4;
  for (let row = 0; row < 3; row++) { c.beginPath(); for (let x = -20; x < viewW + 20; x += 6) { const y = 180 + row * 16 + Math.sin(x * 0.05 + t * 1.6 + row * 2 + camX * 0.002 * (row + 1)) * 2.4; if (x === -20) c.moveTo(x, y); else c.lineTo(x, y); } c.stroke(); }
  const span = 380;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span) + 60;
    c.fillStyle = 'rgba(160,120,130,.55)'; c.fillRect(wx, 120, 34, 50); c.fillRect(wx + 34, 140, 60, 30); c.fillRect(wx + 94, 112, 30, 58);
    for (const tx of [wx, wx + 94]) for (let k = 0; k < 3; k++) c.fillRect(tx + k * 12, (tx === wx ? 112 : 104), 8, 8);
    c.strokeStyle = 'rgba(160,120,130,.8)'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(wx + 109, 104); c.lineTo(wx + 109, 84); c.stroke();
    c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(wx + 109, 84); c.lineTo(wx + 109 + 14 + Math.sin(t * 4 + i) * 2, 88); c.lineTo(wx + 109, 93); c.closePath(); c.fill();
  }
}
function bgRopePark(c, viewW, camX, t) {
  hill(c, viewW, 170, 14, 0.01, 0.3, camX * 0.1, '#cdeec0');
  const span = 160;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 20;
    c.fillStyle = '#b8865a'; c.fillRect(wx - 9, 0, 18, VIEW_H);
    c.fillStyle = 'rgba(138,90,48,.4)'; c.fillRect(wx - 3, 0, 3, VIEW_H);
    c.fillStyle = '#8fd46a'; circ(c, wx, 8, 34); c.fill(); circ(c, wx - 26, 22, 24); c.fill(); circ(c, wx + 26, 22, 24); c.fill();
    c.fillStyle = '#c98d55'; c.fillRect(wx - 22, 120, 44, 6);
    c.strokeStyle = 'rgba(138,90,48,.7)'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(wx + 22, 122); c.quadraticCurveTo(wx + span / 2, 140, wx + span - 22, 122); c.stroke();
    for (let k = 1; k < 6; k++) { const px = wx + 22 + k * (span - 44) / 6, py = 122 + Math.sin(k / 6 * Math.PI) * 9; c.beginPath(); c.moveTo(px, py); c.lineTo(px, py - 10); c.stroke(); }
  }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#a8e08a');
}
function bgFoxDen(c, viewW, camX, t) {
  const R = rng(91);
  for (let i = 0; i < 46; i++) { const x = wrapX(R() * 1400 - camX * 0.04, viewW + 20) - 10, y = R() * 140, tw = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7); c.fillStyle = `rgba(255,250,220,${0.3 + tw * 0.6})`; circ(c, x, y, 0.6 + R() * 1); c.fill(); }
  const mx = viewW * 0.78; c.fillStyle = 'rgba(255,248,200,.25)'; circ(c, mx, 56, 34); c.fill(); c.fillStyle = '#fff6cc'; circ(c, mx, 56, 22); c.fill(); c.fillStyle = 'rgba(230,220,170,.8)'; circ(c, mx - 7, 51, 4); c.fill(); circ(c, mx + 6, 62, 3); c.fill();
  for (const [f, base, col] of [[0.15, 200, '#202a5a'], [0.35, 216, '#16204a']]) {
    const span = 70;
    for (let i = -1; i < viewW / span + 2; i++) {
      const wx = i * span + wrapX(-camX * f, span), h = 60 + ((i * 41 + Math.floor(camX * f / span) * 41) % 40 + 40) % 40;
      c.fillStyle = col; c.beginPath(); c.moveTo(wx - 22, base); c.lineTo(wx, base - h); c.lineTo(wx + 22, base); c.closePath(); c.fill(); c.fillRect(wx - 3, base - 4, 6, 20);
    }
  }
  for (let i = 0; i < 10; i++) { const fx = wrapX(i * 83 - camX * 0.4 + Math.sin(t * 0.7 + i) * 26, viewW + 20) - 10, fy = 120 + Math.sin(t * 1.3 + i * 2) * 40 + (i % 3) * 20, a = 0.5 + 0.5 * Math.sin(t * 3 + i); c.fillStyle = `rgba(255,240,140,${0.25 * a})`; circ(c, fx, fy, 6); c.fill(); c.fillStyle = `rgba(255,250,200,${0.6 + 0.4 * a})`; circ(c, fx, fy, 1.6); c.fill(); }
}
Object.assign(BG2, { soaplake: bgSoapLake, nutgrove: bgNutGrove, seafort: bgSeaFort, ropepark: bgRopePark, foxden: bgFoxDen });
