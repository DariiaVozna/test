'use strict';
/* ===== Частина 27 «День народження»: Свічки на торті, Країна подарунків, Міст із дощечок, Велике свято, Нора Шкодька ===== */
Object.assign(THEMES, {
  cakehill: { sky: ['#ffd0e4', '#ffe6f0', '#fff8fb'], panel: '#5a1f3a', top: '#fff4fa', topHi: '#ffffff', topLo: '#ffc8e0', fill: '#f4c890', fillLo: '#e0b07a', dots: ['#ff7a9a', '#ffd23f', '#7fd0ff'], block: 'cakeblock', ice: false, topStyle: 'snow', dotShape: 'sprinkle' },
  giftland: { sky: ['#dcd0ff', '#ece6ff', '#fbf9ff'], panel: '#3a2a6a', top: '#8fd07a', topHi: '#bdf09e', topLo: '#5aa04a', fill: '#c8a0e8', fillLo: '#b088d4', dots: ['#ffffff', '#ffd23f', '#ff7ab8'], block: 'giftblock', ice: false, topStyle: 'grass', dotShape: 'sprinkle' },
  plankbridge: { sky: ['#a8dcff', '#d0ecff', '#f4fbff'], panel: '#1f3a5a', top: '#7fd46a', topHi: '#b4f08e', topLo: '#4f9f4a', fill: '#b08a60', fillLo: '#9a7650', dots: ['#ffffff', '#ffd23f', '#a8683a'], block: 'plankblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  partyhall: { sky: ['#fff0c0', '#fff6dc', '#fffdf4'], panel: '#5a2a10', top: '#ff9fc4', topHi: '#ffd0e4', topLo: '#e07aa0', fill: '#ffd8a8', fillLo: '#f4c090', dots: ['#ff4d4d', '#3f8fff', '#4cc35a'], block: 'partyblock', ice: false, topStyle: 'plank', dotShape: 'sprinkle' },
  raccoonden: { sky: ['#3a3a6a', '#6a5a8a', '#c8a0b0'], panel: '#1a1a3a', top: '#5a9a5a', topHi: '#7fc07a', topLo: '#3a7a40', fill: '#6a5040', fillLo: '#584234', dots: ['#ffd23f', '#a8a0c8', '#ffffff'], block: 'stumpblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
});

/* ===== Свічки й торт ===== */
function drawCandle26(c, k, t) {
  const x = k.x, gy = k.gy, col = ['#7fd0ff', '#ff9fc4', '#b4f08e', '#ffe066'][Math.floor(x / T) % 4];
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#ffffff'; c.fillRect(x - 4, gy - 22, 8, 22); c.strokeRect(x - 4, gy - 22, 8, 22);
  c.fillStyle = col; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(x - 4, gy - 4 - i * 6); c.lineTo(x + 4, gy - 8 - i * 6); c.lineTo(x + 4, gy - 5 - i * 6); c.lineTo(x - 4, gy - 1 - i * 6); c.closePath(); c.fill(); }
  c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, gy - 22); c.lineTo(x, gy - 26); c.stroke();
  if (k.lit) {
    const f = 1 + Math.sin(t * 18 + x) * 0.12;
    c.save(); c.globalAlpha = 0.35; c.fillStyle = '#ffd23f'; circ(c, x, gy - 31, 10); c.fill(); c.restore();
    c.fillStyle = '#ff9a2a'; c.beginPath(); c.moveTo(x, gy - 40 * f + 4); c.quadraticCurveTo(x + 6, gy - 30, x, gy - 25); c.quadraticCurveTo(x - 6, gy - 30, x, gy - 40 * f + 4); c.fill();
    c.fillStyle = '#ffe066'; c.beginPath(); c.moveTo(x, gy - 34 * f + 2); c.quadraticCurveTo(x + 3, gy - 29, x, gy - 26); c.quadraticCurveTo(x - 3, gy - 29, x, gy - 34 * f + 2); c.fill();
  } else {
    c.globalAlpha = 0.5 + 0.4 * Math.sin(t * 5 + x); c.fillStyle = '#ffffff'; starPath(c, x + 6, gy - 30, 3.5, 1.5, t); c.fill(); c.globalAlpha = 1;
  }
  c.restore();
  if (k.pop > 0) { c.save(); c.globalAlpha = Math.min(1, k.pop * 2); c.strokeStyle = '#ffd23f'; c.lineWidth = 2; c.beginPath(); c.arc(x, gy - 30, 14 + (0.8 - k.pop) * 20, 0, TAU); c.stroke(); c.restore(); }
}
function drawCakeSign(c, x, y, lit, n, t) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  c.fillStyle = '#f4c890'; rr(c, -15, -2, 30, 14, 3); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-15, 2); c.quadraticCurveTo(-12, 7, -9, 2); c.quadraticCurveTo(-6, 7, -3, 2); c.quadraticCurveTo(0, 7, 3, 2); c.quadraticCurveTo(6, 7, 9, 2); c.quadraticCurveTo(12, 7, 15, 2); c.lineTo(15, -2); c.lineTo(-15, -2); c.closePath(); c.fill();
  c.fillStyle = '#ff7a9a'; rr(c, -12, -12, 24, 10, 3); c.fill(); c.stroke();
  for (const cx of [-6, 0, 6]) { c.fillStyle = '#ffffff'; c.fillRect(cx - 1.2, -18, 2.4, 6); if (lit >= n) { c.fillStyle = '#ff9a2a'; ell(c, cx, -20, 1.6, 2.6 + Math.sin(t * 15 + cx) * 0.4); c.fill(); } }
  c.restore();
  txt24(c, Math.min(lit, n) + '/' + n, x, y + 22, 10, lit >= n ? '#2f9a3a' : '#a8683a', '#ffffff', 3);
}

/* ===== Подарунки ===== */
function drawGift26(c, g, t) {
  const x = g.tx * T, y = g.ty * T, k = g.tx % 4, box = ['#ff7ab8', '#7fb8ff', '#ffd23f', '#9fe08a'][k], rib = ['#ffd23f', '#ff4d4d', '#a05ad8', '#ff7ab8'][k];
  const wob = g.wob > 0 ? Math.sin(g.wob * 40) * 2 : 0;
  c.save(); c.translate(x + wob, y); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  c.fillStyle = box; c.fillRect(0, 0, T, T);
  if (!g.open) {
    c.fillStyle = box; rr(c, 1, 3, T - 2, T - 3, 3); c.fill(); c.stroke();
    c.fillStyle = rib; c.fillRect(10, 3, 4, T - 3); c.fillRect(1, 11, T - 2, 4);
    c.beginPath(); ell(c, 8, 2, 5, 3, -0.4); c.fill(); c.stroke(); ell(c, 16, 2, 5, 3, 0.4); c.fill(); c.stroke();
    c.globalAlpha = 0.4 + 0.3 * Math.sin(t * 5 + g.tx); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(8, T + 3); c.lineTo(16, T + 3); c.lineTo(12, T + 8); c.closePath(); c.fill();
  } else {
    c.fillStyle = box; rr(c, 1, 3, T - 2, T - 3, 3); c.fill(); c.stroke();
    c.fillStyle = 'rgba(59,31,79,.35)'; c.fillRect(3, 4, T - 6, 4);
    c.fillStyle = rib; c.fillRect(10, 8, 4, T - 8);
    c.save(); c.translate(19, 1); c.rotate(0.6); c.fillStyle = box; rr(c, -10, -3, 20, 5, 1.5); c.fill(); c.stroke(); c.restore();
    if (g.key) { c.save(); c.translate(12, -4 + Math.sin(t * 3) * 2); drawKey26(c, 0.9); c.restore(); }
    else for (let i = 0; i < 4; i++) { c.fillStyle = RAINBOW[(i + g.tx) % 6]; c.fillRect(5 + i * 4, 3 + Math.sin(t * 4 + i) * 2, 2.5, 2.5); }
  }
  c.restore();
}
function drawKey26(c, s) {
  c.save(); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = '#ffc830';
  circ(c, -6, 0, 5); c.fill(); c.stroke(); c.fillStyle = '#fff0b0'; circ(c, -6, 0, 2); c.fill();
  c.fillStyle = '#ffc830'; c.fillRect(-1, -1.6, 12, 3.2); c.strokeRect(-1, -1.6, 12, 3.2); c.fillRect(7, 1.6, 2.4, 3); c.strokeRect(7, 1.6, 2.4, 3); c.fillRect(3.5, 1.6, 2.4, 2.4); c.strokeRect(3.5, 1.6, 2.4, 2.4);
  c.restore();
}

/* ===== Дощечки й міст ===== */
function drawPlank26(c, x, y, a, s) {
  c.save(); c.translate(x, y); c.rotate(a); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#d9a86a'; rr(c, -12, -4.5, 24, 9, 2); c.fill(); c.stroke();
  c.strokeStyle = '#a8783a'; c.lineWidth = 0.9; c.beginPath(); c.moveTo(-8, -1); c.quadraticCurveTo(0, -2.5, 8, -0.5); c.moveTo(-6, 2); c.quadraticCurveTo(2, 1, 9, 2.5); c.stroke();
  c.fillStyle = '#8a8a9a'; circ(c, -9, 0, 1.2); c.fill(); circ(c, 9, 0, 1.2); c.fill();
  c.restore();
}
function drawBridge26(c, b, t) {
  const n = b.x1 - b.x0, y = 10 * T;
  for (let i = 0; i < n; i++) {
    const x = (b.x0 + i) * T;
    if (i < b.built) {
      c.save(); c.fillStyle = '#c8945a'; c.fillRect(x, y, T, T);
      c.strokeStyle = '#8a5a30'; c.lineWidth = 2; c.beginPath(); c.moveTo(x + 2, y + 10); c.lineTo(x + T - 2, y + T - 1); c.moveTo(x + T - 2, y + 10); c.lineTo(x + 2, y + T - 1); c.stroke();
      c.fillStyle = '#d9a86a'; c.strokeStyle = INK; c.lineWidth = 1.2; c.fillRect(x, y, T, 9); c.strokeRect(x, y, T, 9); c.strokeRect(x, y, T, T);
      c.strokeStyle = '#a8783a'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x + 3, y + 4); c.lineTo(x + T - 3, y + 5); c.stroke(); c.restore();
    } else { c.save(); c.globalAlpha = 0.28 + 0.12 * Math.sin(t * 3 + i); c.strokeStyle = '#a8683a'; c.lineWidth = 1.5; c.setLineDash([4, 3]); c.strokeRect(x + 1, y + 1, T - 2, 8); c.restore(); }
  }
  // мотузки-поручні
  c.save(); c.strokeStyle = '#8a5a30'; c.lineWidth = 2.4;
  for (const px of [b.x0 * T - 2, b.x1 * T + 2]) { c.beginPath(); c.moveTo(px, y); c.lineTo(px, y - 22); c.stroke(); }
  if (b.built > 0) { c.lineWidth = 1.4; c.beginPath(); c.moveTo(b.x0 * T - 2, y - 20); c.quadraticCurveTo((b.x0 + b.built / 2) * T, y - 10, (b.x0 + b.built) * T, y - (b.done ? 20 : 4)); c.stroke(); }
  c.restore();
  if (!b.done && !b.building) {
    const sx = (b.x0 - 1) * T + 12;
    c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3; c.fillStyle = '#a8683a'; c.fillRect(sx - 2, y - 30, 4, 30); c.strokeRect(sx - 2, y - 30, 4, 30);
    c.fillStyle = '#fffaf0'; rr(c, sx - 20, y - 52, 40, 24, 4); c.fill(); c.stroke();
    drawPlank26(c, sx - 8, y - 40, -0.2, 0.55); txt24(c, '×' + b.need, sx + 9, y - 40, 11, '#a8683a'); c.restore();
  }
}

/* ===== Над єдиноріжкою: скільки дощечок ===== */
function drawOver26(c, P, t) {
  drawOver27(c, P, t);
  if (!P.planks) return;
  const cx = P.x + P.w / 2, y = (P.flip ? P.y + P.h + 40 : P.y - 40) + Math.sin(t * 4) * 1.5;
  c.save(); c.globalAlpha = 0.6; c.fillStyle = '#ffffff'; rr(c, cx - 22, y - 10, 44, 20, 8); c.fill(); c.restore();
  drawPlank26(c, cx - 8, y, -0.15, 0.6); txt24(c, '×' + P.planks, cx + 11, y + 1, 11, '#a8683a');
}

function drawWorld26(c, t, vis) {
  if (G.candles) for (const k of G.candles) if (vis(k.x)) drawCandle26(c, k, t);
  if (G.cakes) {
    const lit = G.candles ? G.candles.filter(k => k.lit).length : 0;
    for (const k of G.cakes) if (vis(k.x * T + 12) && tileAt(k.x, 8) === 2) { drawDoorCol(c, k.x, k.top, 'cake', '#ffb0d0', t); drawCakeSign(c, k.x * T + 12, 4 * T + 6, lit, k.n, t); }
  }
  if (G.gifts) for (const g of G.gifts) if (vis(g.tx * T + 12)) drawGift26(c, g, t);
  if (G.kdoors) for (const d of G.kdoors) if (vis(d.x * T + 12) && tileAt(d.x, 8) === 2) {
    drawDoorCol(c, d.x, d.top, 'key', '#ffd08a', t);
    c.save(); c.translate(d.x * T + 12, 5 * T + 12); c.fillStyle = '#3b2a5a'; circ(c, 0, -3, 4); c.fill(); c.beginPath(); c.moveTo(-2.5, -1); c.lineTo(2.5, -1); c.lineTo(3.5, 8); c.lineTo(-3.5, 8); c.closePath(); c.fill(); c.restore();
  }
  if (G.planks) for (const p of G.planks) if (!p.taken && vis(p.x)) drawPlank26(c, p.x, p.y + Math.sin(t * 3 + p.x) * 2, Math.sin(t * 2 + p.x) * 0.15, 1);
  if (G.pbridges) for (const b of G.pbridges) if (vis((b.x0 + b.x1) / 2 * T, (b.x1 - b.x0) * T)) drawBridge26(c, b, t);
  drawWorld27(c, t, vis);
}

/* ===== Єнот Шкодько ===== */
function drawRaccoonBoss(c, B, t) {
  const x = B.x, y = B.y, fl = B.flash > 0, rest = B.state === 'rest' && !B.dead, run = B.state === 'dash' && !B.dead;
  c.save(); c.translate(x, y + 4); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.6;
  if (B.dir > 0) c.scale(-1, 1);
  const fur = fl ? '#ffffff' : B.dead ? '#e0d0f0' : '#9a96a8', dark = fl ? '#dddddd' : '#3a3644', light = fl ? '#ffffff' : '#ece8f4';
  if (run) c.translate(0, -Math.abs(Math.sin(t * 18)) * 3);
  // смугастий хвіст
  c.save(); c.translate(22, 4); c.rotate(-0.6 + Math.sin(t * (run ? 14 : 3)) * 0.2);
  for (let i = 0; i < 5; i++) { c.fillStyle = i % 2 ? dark : fur; ell(c, 6 + i * 5, 0, 6, 7 - i * 0.6); c.fill(); c.stroke(); }
  c.restore();
  // лапки
  c.fillStyle = dark; for (const fx of [-14, 10]) { ell(c, fx + (run ? Math.sin(t * 18 + fx) * 3 : 0), 22, 6, 3.5); c.fill(); c.stroke(); }
  c.fillStyle = fur; ell(c, 0, 4, 24, 20); c.fill(); c.stroke();
  c.fillStyle = light; ell(c, -2, 10, 12, 11); c.fill();
  // голова
  c.fillStyle = fur; c.beginPath(); c.moveTo(-22, -12); c.lineTo(-16, -30); c.lineTo(-8, -18); c.moveTo(6, -18); c.lineTo(12, -30); c.lineTo(16, -12); c.fill(); c.stroke();
  ell(c, -4, -10, 20, 14); c.fill(); c.stroke();
  c.fillStyle = light; c.beginPath(); c.moveTo(-24, -6); c.quadraticCurveTo(-14, 6, -4, -2); c.quadraticCurveTo(6, 6, 14, -6); c.quadraticCurveTo(-4, 4, -24, -6); c.fill();
  // маска
  c.fillStyle = dark; ell(c, -12, -12, 8, 5, -0.2); c.fill(); ell(c, 4, -12, 8, 5, 0.2); c.fill();
  if (rest) { c.strokeStyle = '#ffffff'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-15, -12); c.lineTo(-9, -12); c.moveTo(1, -12); c.lineTo(7, -12); c.stroke(); c.strokeStyle = INK; }
  else { c.fillStyle = '#ffffff'; circ(c, -12, -12, 3.2); c.fill(); circ(c, 4, -12, 3.2); c.fill(); c.fillStyle = INK; circ(c, -13, -12, 1.8); c.fill(); circ(c, 3, -12, 1.8); c.fill(); }
  c.fillStyle = INK; ell(c, -4, -3, 3, 2.2); c.fill();
  c.lineWidth = 1.4; c.beginPath(); if (B.dead) c.arc(-4, 0, 4, 0.1 * Math.PI, 0.9 * Math.PI); else { c.moveTo(-8, 2); c.quadraticCurveTo(-4, 5, 0, 2); } c.stroke();
  // подарунок у лапах
  if (!rest && !B.dead) { c.fillStyle = '#ff7ab8'; rr(c, -22, 4, 13, 12, 2); c.fill(); c.stroke(); c.fillStyle = '#ffd23f'; c.fillRect(-17, 4, 3, 12); }
  // заплутався у стрічці
  if (rest) { c.strokeStyle = '#ff4fa3'; c.lineWidth = 3; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(-24, -4 + i * 9); c.quadraticCurveTo(0, 4 + i * 9 + Math.sin(t * 4 + i) * 3, 24, -8 + i * 9); c.stroke(); } c.fillStyle = '#ff4fa3'; c.strokeStyle = INK; c.lineWidth = 1.2; ell(c, 10, -2, 5, 3, -0.4); c.fill(); c.stroke(); ell(c, 18, -2, 5, 3, 0.4); c.fill(); c.stroke(); }
  if (B.dead) { c.fillStyle = 'rgba(255,120,170,.6)'; circ(c, -20, -4, 3); c.fill(); circ(c, 12, -4, 3); c.fill(); }
  c.restore();
}
function drawCakeBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(Math.sin(b.t * 8) * 0.4); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#ffb0d0'; c.beginPath(); c.moveTo(-6, 0); c.lineTo(6, 0); c.lineTo(4.5, 7); c.lineTo(-4.5, 7); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; c.beginPath(); c.arc(0, 0, 6.5, Math.PI, TAU); c.fill(); c.stroke();
  c.fillStyle = '#ff4d4d'; circ(c, 0, -6.5, 2); c.fill();
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock26(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'cakeblock') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#f4c890'; c.fill(); c.stroke(); c.fillStyle = '#ff9fc4'; c.fillRect(1.5, 10, T - 3, 4); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(1.5, 1.5); c.lineTo(T - 1.5, 1.5); c.lineTo(T - 1.5, 5); c.quadraticCurveTo(18, 9, 15, 5); c.quadraticCurveTo(9, 10, 6, 5); c.quadraticCurveTo(3, 8, 1.5, 5); c.closePath(); c.fill(); }
  else if (b === 'giftblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#c8a0e8'; c.fill(); c.stroke(); c.fillStyle = '#ffd23f'; c.fillRect(10, 1.5, 4, T - 3); c.fillRect(1.5, 10, T - 3, 4); }
  else if (b === 'plankblock') { rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = '#d9a86a'; c.fill(); c.stroke(); c.strokeStyle = '#a8783a'; c.lineWidth = 1; for (const yy of [8, 16]) { c.beginPath(); c.moveTo(2, yy); c.lineTo(T - 2, yy); c.stroke(); } c.fillStyle = '#8a8a9a'; circ(c, 5, 4, 1); c.fill(); circ(c, 19, 12, 1); c.fill(); }
  else if (b === 'partyblock') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#ffffff'; c.fill(); c.stroke(); for (let i = 0; i < 6; i++) { c.fillStyle = RAINBOW[i]; c.fillRect(4 + (i * 7) % 16, 4 + Math.floor(i / 3) * 9 + (i % 2) * 3, 3, 3); } }
  else if (b === 'stumpblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#8a6040'; c.fill(); c.stroke(); c.fillStyle = '#c8a070'; ell(c, 12, 5, 9, 3.5); c.fill(); c.strokeStyle = '#8a6040'; c.lineWidth = 0.8; ell(c, 12, 5, 5, 2); c.stroke(); }
  else return drawBlock27(c, b);
  return true;
}

/* ===== Декор ===== */
function drawDecor26(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'balloonS': { const bx = x + Math.sin(t * 1.5 + x) * 2; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 3, y - 10, bx, y - 18); c.stroke(); c.fillStyle = d.c || '#ff7ab8'; ell(c, bx, y - 24, 6, 7); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.6)'; circ(c, bx - 2, y - 27, 1.6); c.fill(); break; }
    case 'presentS': c.fillStyle = d.c || '#7fb8ff'; rr(c, x - 6, y - 10, 12, 10, 1.5); c.fill(); c.stroke(); c.fillStyle = '#ffd23f'; c.fillRect(x - 1, y - 10, 2, 10); ell(c, x - 3, y - 11, 3, 1.8, -0.4); c.fill(); ell(c, x + 3, y - 11, 3, 1.8, 0.4); c.fill(); break;
    case 'confS': for (let i = 0; i < 5; i++) { c.fillStyle = RAINBOW[(i + Math.floor(x)) % 6]; c.fillRect(x - 8 + i * 4, y - 2 - (i % 2) * 2, 2.5, 2.5); } break;
    case 'stumpS': c.fillStyle = '#8a6040'; c.fillRect(x - 6, y - 8, 12, 8); c.strokeRect(x - 6, y - 8, 12, 8); c.fillStyle = '#c8a070'; ell(c, x, y - 8, 6, 2.4); c.fill(); c.stroke(); break;
    default: drawDecor27(c, d, t); break;
  }
}

/* ===== Фони ===== */
function bgCakehill(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 260;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span) + 40;
    c.fillStyle = '#f4d8b0'; rr(c, wx, 150, 170, 72, 10); c.fill(); c.fillStyle = '#ffc0d8'; c.fillRect(wx, 176, 170, 8);
    c.fillStyle = '#fff4fa'; rr(c, wx + 30, 110, 110, 44, 10); c.fill(); c.fillStyle = '#ffd0e4'; c.fillRect(wx + 30, 130, 110, 6);
    for (let k = 0; k < 4; k++) { const cx = wx + 48 + k * 25; c.fillStyle = '#ffffff'; c.fillRect(cx - 3, 92, 6, 18); c.fillStyle = '#ffb040'; ell(c, cx, 86 + Math.sin(t * 9 + k) * 1, 3, 5); c.fill(); }
  }
}
function bgGiftland(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 120;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 20, k = ((i % 4) + 4) % 4, h = 50 + k * 14;
    c.fillStyle = ['#ffc0dc', '#c8dcff', '#fff0a8', '#c8f0c0'][k]; c.fillRect(wx, 222 - h, 70, h);
    c.fillStyle = ['#ff7ab8', '#7fa8ff', '#ffd23f', '#7fd47a'][k]; c.fillRect(wx + 31, 222 - h, 8, h); c.fillRect(wx, 222 - h + h / 2 - 4, 70, 8);
    ell(c, wx + 27, 222 - h - 5, 10, 6, -0.4); c.fill(); ell(c, wx + 43, 222 - h - 5, 10, 6, 0.4); c.fill();
  }
}
function bgPlankbridge(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 196, 10, 0.012, 0.4, camX * 0.12, '#c8e8b8');
  c.fillStyle = '#5ab8f0'; c.fillRect(0, 214, viewW, 300);
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 2; for (let i = 0; i < viewW / 60 + 2; i++) { const wx = i * 60 + wrapX(-camX * 0.5 + t * 20, 60); c.beginPath(); c.moveTo(wx, 230 + (i % 3) * 14); c.quadraticCurveTo(wx + 10, 226 + (i % 3) * 14, wx + 20, 230 + (i % 3) * 14); c.stroke(); }
}
function bgPartyhall(c, viewW, camX, t) {
  c.fillStyle = '#ffe8c8'; c.fillRect(0, 150, viewW, 72);
  for (let row = 0; row < 2; row++) {
    const y0 = 30 + row * 50, span = 200;
    for (let i = -1; i < viewW / span + 2; i++) {
      const wx = i * span + wrapX(-camX * (0.15 + row * 0.08), span);
      c.strokeStyle = '#a8683a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(wx, y0); c.quadraticCurveTo(wx + 100, y0 + 30, wx + 200, y0); c.stroke();
      for (let f = 0; f < 8; f++) { const fx = wx + 12 + f * 23, fy = y0 + Math.sin((f + 0.5) / 8 * Math.PI) * 15 + 2; c.fillStyle = RAINBOW[(f + i + row) % 6]; c.beginPath(); c.moveTo(fx - 6, fy); c.lineTo(fx + 6, fy); c.lineTo(fx, fy + 12); c.closePath(); c.fill(); }
    }
  }
  for (let i = 0; i < 6; i++) { const bx = wrapX(i * 150 + 40 - camX * 0.3, viewW + 150) - 75, by = 160 - ((t * 12 + i * 40) % 40); c.strokeStyle = '#8a8a9a'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(bx, by + 10); c.lineTo(bx + 2, by + 40); c.stroke(); c.fillStyle = RAINBOW[i % 6]; ell(c, bx, by, 10, 12); c.fill(); }
}
function bgRaccoonden(c, viewW, camX, t) {
  c.fillStyle = '#fff4c8'; circ(c, wrapX(viewW * 0.75 - camX * 0.03, viewW + 100) - 50, 60, 22); c.fill();
  for (let i = 0; i < 14; i++) { c.fillStyle = 'rgba(255,255,255,' + (0.4 + 0.4 * Math.sin(t * 2 + i)) + ')'; circ(c, (i * 97 + 30) % viewW, 20 + (i * 53) % 90, 1.2); c.fill(); }
  const span = 110;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.22, span) + 20, h = 100 + ((i * 41) % 3 + 3) % 3 * 16; c.fillStyle = '#2a3a4a'; c.beginPath(); c.moveTo(wx - 34, 222); c.lineTo(wx, 222 - h); c.lineTo(wx + 34, 222); c.closePath(); c.fill(); }
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#3a5a4a');
}
Object.assign(BG2, { cakehill: bgCakehill, giftland: bgGiftland, plankbridge: bgPlankbridge, partyhall: bgPartyhall, raccoonden: bgRaccoonden });
