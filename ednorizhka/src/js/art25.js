'use strict';
/* ===== Частина 26 «Базар і хованки»: Фруктовий базар, Ліс хованок, Містечко фігур, Великий магазин, Комора Жуйка ===== */
Object.assign(THEMES, {
  fruitmarket: { sky: ['#ffe2a8', '#fff0cc', '#fffbea'], panel: '#5a3010', top: '#8fd07a', topHi: '#bdf09e', topLo: '#5aa04a', fill: '#e0b080', fillLo: '#c89868', dots: ['#ff7a5a', '#ffd23f', '#7fd46a'], block: 'crateblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  hideforest: { sky: ['#bfeacc', '#dff6e4', '#f6fff2'], panel: '#1f4a2a', top: '#6ccf62', topHi: '#a4ee8e', topLo: '#3e9a48', fill: '#9a7050', fillLo: '#84603f', dots: ['#ffffff', '#ffd23f', '#ff9fc4'], block: 'leafblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  shapetown: { sky: ['#cfe0ff', '#e6eeff', '#fbfcff'], panel: '#22306a', top: '#ffcf5a', topHi: '#ffe89a', topLo: '#e0a830', fill: '#a8b8f0', fillLo: '#909fe0', dots: ['#ff4d4d', '#3f8fff', '#4cc35a'], block: 'shapeblock', ice: false, topStyle: 'plank', dotShape: 'sprinkle' },
  bigshop: { sky: ['#e6f6ff', '#f2fbff', '#ffffff'], panel: '#1f3a5a', top: '#d8e4ee', topHi: '#f4f9ff', topLo: '#b0c0d0', fill: '#c0ccd8', fillLo: '#a8b6c4', dots: ['#ff7a9a', '#4cb6ff', '#ffd23f'], block: 'shelfblock', ice: false, topStyle: 'plank', dotShape: 'pebble' },
  hamsterhole: { sky: ['#e8c89a', '#f2dcb8', '#fbefd8'], panel: '#4a2a10', top: '#c8945a', topHi: '#e4b47a', topLo: '#a0703e', fill: '#a87a4e', fillLo: '#926640', dots: ['#ffe08a', '#8a5a30', '#ffffff'], block: 'sackblock', ice: false, topStyle: 'stone', dotShape: 'pebble' },
});

/* ===== Товари ===== */
function drawItem26(c, k, x, y, s, t) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  if (k === 'apple') { c.fillStyle = '#ff4d4d'; c.beginPath(); c.arc(-3, 1, 6.5, 0, TAU); c.arc(3, 1, 6.5, 0, TAU); c.fill(); ell(c, 0, 1, 8.5, 7); c.fill(); c.stroke(); c.strokeStyle = '#8a5a30'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, -5); c.lineTo(1, -9); c.stroke(); c.fillStyle = '#4cc35a'; ell(c, 4, -8, 3.5, 1.8, -0.4); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, -4, -2, 2, 3, 0.3); c.fill(); }
  else if (k === 'pear') { c.fillStyle = '#b8e04a'; c.beginPath(); c.arc(0, 3, 7, 0, TAU); c.fill(); c.stroke(); circ(c, 0, -3, 4.5); c.fill(); c.stroke(); circ(c, 0, 3, 6.3); c.fill(); c.strokeStyle = '#8a5a30'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, -7); c.lineTo(1, -11); c.stroke(); }
  else if (k === 'banana') { c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(-9, -4); c.quadraticCurveTo(-4, 9, 9, 3); c.quadraticCurveTo(9, 6, 6, 7); c.quadraticCurveTo(-8, 10, -10, -3); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#8a5a30'; circ(c, -9.5, -3.5, 1.4); c.fill(); }
  else if (k === 'carrot') { c.fillStyle = '#ff9a2a'; c.beginPath(); c.moveTo(-4, -6); c.lineTo(4, -6); c.lineTo(0, 10); c.closePath(); c.fill(); c.stroke(); c.strokeStyle = '#c86a10'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(-2, -2); c.lineTo(0, -2); c.moveTo(1, 2); c.lineTo(2.5, 2); c.stroke(); c.fillStyle = '#4cc35a'; c.strokeStyle = INK; for (const a of [-0.5, 0, 0.5]) { c.save(); c.translate(0, -6); c.rotate(a); ell(c, 0, -4, 1.8, 4); c.fill(); c.restore(); } }
  else if (k === 'cheese') { c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(-9, 6); c.lineTo(9, 6); c.lineTo(9, -2); c.lineTo(-9, -6); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#e8b020'; circ(c, -3, 1, 1.8); c.fill(); circ(c, 4, 2, 1.4); c.fill(); circ(c, 2, -2, 1); c.fill(); }
  else if (k === 'bread') { c.fillStyle = '#d99a52'; c.beginPath(); c.moveTo(-9, 6); c.lineTo(-9, -1); c.quadraticCurveTo(-9, -7, 0, -7); c.quadraticCurveTo(9, -7, 9, -1); c.lineTo(9, 6); c.closePath(); c.fill(); c.stroke(); c.strokeStyle = '#a86a2a'; c.lineWidth = 1; for (const sx of [-4, 0, 4]) { c.beginPath(); c.moveTo(sx - 1.5, -5); c.lineTo(sx + 1.5, -2); c.stroke(); } }
  else if (k === 'milk') { c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-6, 9); c.lineTo(-6, -3); c.lineTo(-3, -8); c.lineTo(3, -8); c.lineTo(6, -3); c.lineTo(6, 9); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#4cb6ff'; c.fillRect(-6, 1, 12, 5); c.fillStyle = '#ffffff'; ell(c, 0, 3.5, 3, 1.6); c.fill(); }
  else if (k === 'grapes') { c.fillStyle = '#a05ad8'; for (const [gx, gy] of [[-4, -3], [0, -3], [4, -3], [-2, 1], [2, 1], [0, 5]]) { circ(c, gx, gy, 2.8); c.fill(); c.stroke(); } c.fillStyle = '#4cc35a'; ell(c, 2, -8, 3.5, 1.8, -0.3); c.fill(); }
  c.restore();
}
function drawShopBoard(c, s, t) {
  const x = s.bx, gy = s.gy, n = s.list.length, bw = 24 + n * 26, bh = 58, top = gy - 26 - bh;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#a8683a'; for (const px of [x - bw / 2 + 6, x + bw / 2 - 11]) { c.fillRect(px, top + bh, 5, gy - top - bh); c.strokeRect(px, top + bh, 5, gy - top - bh); }
  c.fillStyle = s.done ? '#e8ffe0' : '#fffaf0'; rr(c, x - bw / 2, top, bw, bh, 7); c.fill(); c.stroke();
  txt24(c, 'КУПИТИ', x, top + 11, 10, '#a8683a');
  s.list.forEach((k, i) => {
    const ix = x - (n - 1) * 13 + i * 26, iy = top + 34, got = s.got.includes(k);
    c.fillStyle = got ? '#d8f8d0' : '#f4ece0'; rr(c, ix - 11, iy - 13, 22, 26, 4); c.fill(); c.lineWidth = 1; c.stroke();
    drawItem26(c, k, ix, iy, 0.95, t);
    if (got) { c.strokeStyle = '#2f9a3a'; c.lineWidth = 2.6; c.beginPath(); c.moveTo(ix - 7, iy + 2); c.lineTo(ix - 2, iy + 8); c.lineTo(ix + 8, iy - 6); c.stroke(); c.strokeStyle = INK; }
  });
  c.restore();
}
function drawShopItem(c, it, t) {
  const bob = Math.sin(t * 3 + it.x * 0.05) * 2, dx = it.wob > 0 ? Math.sin(it.wob * 40) * 3 : 0;
  c.save(); c.globalAlpha = 0.5; c.fillStyle = '#ffffff'; circ(c, it.x + dx, it.y + bob, 13); c.fill(); c.restore();
  drawItem26(c, it.k, it.x + dx, it.y + bob, 1.05, t);
}

/* ===== Друзі й кущі ===== */
function drawPal26(c, k, x, y, dir, t, s) {
  c.save(); c.translate(x, y); c.scale(dir * s, s); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  const hop = Math.abs(Math.sin(t * 8 + x * 0.1)) * 1.5;
  c.translate(0, -hop);
  const eye = (ex, ey) => { c.fillStyle = INK; circ(c, ex, ey, 1.3); c.fill(); c.fillStyle = '#fff'; circ(c, ex - 0.4, ey - 0.5, 0.5); c.fill(); };
  if (k === 'bunny') {
    c.fillStyle = '#ffffff'; ell(c, -3, -24, 2.6, 7, -0.15); c.fill(); c.stroke(); ell(c, 3, -24, 2.6, 7, 0.15); c.fill(); c.stroke();
    ell(c, 0, -6, 8, 6.5); c.fill(); c.stroke(); circ(c, 2, -14, 6.5); c.fill(); c.stroke(); c.fillStyle = '#ffb0c8'; circ(c, 8.2, -13, 1.3); c.fill(); eye(5, -15.5); circ(c, -8, -6, 2.6); c.fillStyle = '#ffffff'; c.fill(); c.stroke();
  } else if (k === 'hedgehog') {
    c.fillStyle = '#8a5a30'; c.beginPath(); for (let i = 0; i <= 8; i++) { const a = Math.PI + i * Math.PI / 8, r = i % 2 ? 9 : 12; c.lineTo(Math.cos(a) * r - 1, -6 + Math.sin(a) * r); } c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#f0c890'; ell(c, 6, -5, 5, 4.5); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 11, -5, 1.4); c.fill(); eye(7, -7);
  } else if (k === 'fox') {
    c.fillStyle = '#ff8a3a'; c.beginPath(); c.moveTo(-6, -5); c.quadraticCurveTo(-16, -8, -15, -16); c.quadraticCurveTo(-10, -10, -5, -9); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#ffffff'; circ(c, -15, -15.5, 2); c.fill();
    c.fillStyle = '#ff8a3a'; ell(c, -1, -6, 7, 5.5); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-1, -16); c.lineTo(1, -23); c.lineTo(4, -17); c.moveTo(6, -16); c.lineTo(9, -22); c.lineTo(10, -15); c.fill(); c.stroke();
    circ(c, 5, -13, 6); c.fill(); c.stroke(); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(5, -11); c.quadraticCurveTo(10, -7, 13, -11); c.quadraticCurveTo(9, -10, 5, -11); c.fill(); c.fillStyle = INK; circ(c, 12.5, -11, 1.2); c.fill(); eye(7, -14);
  } else if (k === 'squirrel') {
    c.fillStyle = '#c8783a'; c.beginPath(); c.moveTo(-5, -3); c.quadraticCurveTo(-17, -4, -12, -18); c.quadraticCurveTo(-6, -25, -3, -16); c.quadraticCurveTo(-8, -12, -4, -8); c.closePath(); c.fill(); c.stroke();
    ell(c, 1, -6, 6, 5.5); c.fill(); c.stroke(); circ(c, 4, -14, 5.5); c.fill(); c.stroke(); c.beginPath(); c.moveTo(2, -18); c.lineTo(3, -23); c.lineTo(5, -19); c.fill(); c.stroke(); c.fillStyle = '#f4d0a0'; ell(c, 3, -5, 2.6, 3.5); c.fill(); eye(6, -15); c.fillStyle = '#8a5a30'; ell(c, 6, -7, 2.4, 3); c.fill(); c.stroke();
  } else if (k === 'mouse') {
    c.strokeStyle = '#ff9fbf'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(-7, -4); c.quadraticCurveTo(-14, -2, -13, -9); c.stroke(); c.strokeStyle = INK; c.lineWidth = 1.2;
    c.fillStyle = '#b8b8c8'; ell(c, 0, -5, 7, 5); c.fill(); c.stroke(); circ(c, 5, -16, 3.6); c.fill(); c.stroke(); c.fillStyle = '#ffc0d4'; circ(c, 5, -16, 2); c.fill(); c.fillStyle = '#b8b8c8'; ell(c, 6, -9, 5, 4.5); c.fill(); c.stroke(); c.fillStyle = '#ff7a9a'; circ(c, 11, -9, 1.3); c.fill(); eye(8, -11);
  } else if (k === 'duck') {
    c.fillStyle = '#ffd23f'; ell(c, -1, -6, 8, 6); c.fill(); c.stroke(); circ(c, 5, -15, 5.5); c.fill(); c.stroke(); c.fillStyle = '#ff9a2a'; c.beginPath(); c.moveTo(9, -15); c.lineTo(14, -13); c.lineTo(9, -12); c.closePath(); c.fill(); c.stroke(); eye(6, -16); c.fillStyle = '#ffc020'; ell(c, -3, -6, 4, 2.5, -0.3); c.fill();
  }
  c.restore();
}
function drawBush26(c, h, t) {
  const x = h.x, gy = h.gy, box = G.theme === 'bigshop', sh = h.found ? 0 : Math.sin(t * 9) * (Math.sin(t * 1.3 + x) > 0.6 ? 1.6 : 0);
  c.save(); c.translate(x + sh, gy); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  if (!h.found && Math.sin(t * 1.1 + x * 0.3) > 0.2) {
    // визирає кінчик вушка чи хвостика
    const peek = Math.min(1, (Math.sin(t * 1.1 + x * 0.3) - 0.2) * 3);
    c.save(); c.beginPath(); c.rect(-20, -60, 40, 40); c.clip(); drawPal26(c, h.k, 4, -8 + (1 - peek) * 14, 1, t, 1); c.restore();
  }
  if (box) {
    c.fillStyle = '#d9a86a'; rr(c, -15, -24, 30, 24, 2); c.fill(); c.stroke(); c.strokeStyle = '#a8783a'; c.beginPath(); c.moveTo(-15, -17); c.lineTo(15, -17); c.stroke();
    c.fillStyle = '#c08a4a'; c.fillRect(-4, -24, 8, 7); txt24(c, '?', 0, -8, 11, h.found ? 'rgba(59,31,79,.25)' : '#8a5a30');
  } else {
    c.fillStyle = h.found ? '#8ad87a' : '#5cc05a';
    c.beginPath(); c.arc(-9, -9, 9, 0, TAU); c.arc(9, -9, 9, 0, TAU); c.arc(0, -16, 11, 0, TAU); c.fill();
    c.beginPath(); c.arc(-9, -9, 9, Math.PI * 0.55, Math.PI * 1.6); c.arc(0, -16, 11, Math.PI * 1.1, Math.PI * 1.9); c.arc(9, -9, 9, Math.PI * 1.4, Math.PI * 0.45); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.35)'; circ(c, -4, -20, 3); c.fill();
    if (!h.found) { c.fillStyle = '#ff7a9a'; circ(c, -10, -12, 1.8); c.fill(); circ(c, 8, -6, 1.8); c.fill(); }
  }
  c.restore();
  if (h.pop > 0) { c.save(); c.globalAlpha = Math.min(1, h.pop * 2); txt24(c, '!', x, gy - 44 - (0.8 - h.pop) * 20, 18, '#ff4f9a', '#ffffff', 3); c.restore(); }
}

/* ===== Фігури ===== */
function shapePath26(c, s, r) {
  c.beginPath();
  if (s === 'circle') c.arc(0, 0, r, 0, TAU);
  else if (s === 'square') c.rect(-r * 0.85, -r * 0.85, r * 1.7, r * 1.7);
  else if (s === 'triangle') { c.moveTo(0, -r); c.lineTo(r * 0.95, r * 0.75); c.lineTo(-r * 0.95, r * 0.75); c.closePath(); }
  else if (s === 'star') { for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr2 = i % 2 ? r * 0.45 : r; c.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2); } c.closePath(); }
  else if (s === 'heart') { c.moveTo(0, r * 0.9); c.bezierCurveTo(-r * 1.3, -r * 0.1, -r * 0.6, -r * 1.1, 0, -r * 0.4); c.bezierCurveTo(r * 0.6, -r * 1.1, r * 1.3, -r * 0.1, 0, r * 0.9); c.closePath(); }
}
function drawShapePiece(c, s, x, y, r, t) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.fillStyle = SHAPE_COL[s]; c.strokeStyle = INK; c.lineWidth = 1.5;
  shapePath26(c, s, r); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.55)'; circ(c, -r * 0.35, -r * 0.3, r * 0.22); c.fill();
  c.restore();
}
function drawShapeDoor(c, d, t) {
  drawDoorCol(c, d.x, d.top, 'shape', '#b8c4e8', t);
  if (tileAt(d.x, 8) !== 2) return;
  const cx = d.x * T + 12, cy = 5 * T + 12;
  c.save(); c.translate(cx, cy); const pulse = 1 + 0.08 * Math.sin(t * 4); c.scale(pulse, pulse); c.fillStyle = '#3b2a5a'; shapePath26(c, d.s, 12); c.fill(); c.fillStyle = SHAPE_COL[d.s]; shapePath26(c, d.s, 10); c.fill();
  c.strokeStyle = '#ffffff'; c.lineWidth = 2; c.setLineDash([3, 2]); c.lineDashOffset = -t * 8; c.stroke(); c.restore();
}

/* ===== На єдиноріжці: фігура над головою ===== */
function drawOver25(c, P, t) {
  if (!P.shape26) return;
  const cx = P.x + P.w / 2, y = (P.flip ? P.y + P.h + 40 : P.y - 40) + Math.sin(t * 4) * 1.5;
  c.save(); c.globalAlpha = 0.5; c.fillStyle = '#ffffff'; circ(c, cx, y, 12); c.fill(); c.restore();
  drawShapePiece(c, P.shape26, cx, y, 9, t);
}

function drawWorld25(c, t, vis) {
  if (G.shops26) for (const s of G.shops26) {
    if (vis(s.bx, 120)) drawShopBoard(c, s, t);
    if (!s.done) for (const it of s.items) if (!it.taken && vis(it.x)) drawShopItem(c, it, t);
    if (vis(s.door * T + 12) && tileAt(s.door, 8) === 2) {
      drawDoorCol(c, s.door, s.top, 'shop', '#7fd0a0', t);
      c.save(); c.translate(s.door * T + 12, 4 * T + 12); c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, -15, -8, 30, 16, 4); c.fill(); c.stroke(); txt24(c, 'КАСА', 0, 0.5, 8, '#2f9a3a'); c.restore();
    }
  }
  if (G.hiders) for (const h of G.hiders) if (vis(h.x)) drawBush26(c, h, t);
  if (G.fgates) {
    const found = G.hiders ? G.hiders.filter(h => h.found).length : 0;
    for (const g of G.fgates) if (vis(g.x * T + 12) && tileAt(g.x, 8) === 2) {
      drawDoorCol(c, g.x, g.top, 'friend', '#ffb07a', t);
      c.save(); c.translate(g.x * T + 12, 4 * T + 10); c.strokeStyle = INK; c.lineWidth = 1.3; c.fillStyle = '#ff6a6a';
      c.beginPath(); c.moveTo(-14, 0); c.lineTo(0, -12); c.lineTo(14, 0); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#fff6dc'; rr(c, -11, 0, 22, 16, 2); c.fill(); c.stroke();
      txt24(c, Math.min(found, g.n) + '/' + g.n, 0, 8.5, 9, found >= g.n ? '#2f9a3a' : '#a8683a');
      c.restore();
    }
  }
  if (G.shapes26) for (const s of G.shapes26) if (!s.taken && vis(s.x)) { const j = s.joy > 0 ? Math.sin(s.joy * 20) * 2 : 0; drawShapePiece(c, s.s, s.x, s.y + Math.sin(t * 3 + s.x) * 2 - j, 9, t); }
  if (G.sdoors) for (const d of G.sdoors) if (vis(d.x * T + 12)) drawShapeDoor(c, d, t);
  if (G.pals26) for (const p of G.pals26) if (vis(p.x)) drawPal26(c, p.k, p.x, p.y, p.dir, t, 0.85);
}

/* ===== Хом'ячок Жуйко ===== */
function drawHamsterBoss(c, B, t) {
  const x = B.x, y = B.y, fl = B.flash > 0, rest = B.state === 'rest' && !B.dead, run = B.state === 'dash' && !B.dead;
  c.save(); c.translate(x, y + 4); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.6;
  if (B.dir > 0) c.scale(-1, 1);
  const fur = fl ? '#ffffff' : B.dead ? '#ffd0a0' : '#f0a85a', belly = fl ? '#ffffff' : '#fff0d8';
  if (run) c.translate(0, -Math.abs(Math.sin(t * 18)) * 3);
  // лапки
  c.fillStyle = '#ffb0a0'; for (const fx of [-14, 12]) { ell(c, fx + (run ? Math.sin(t * 18 + fx) * 3 : 0), 22, 6, 3.5); c.fill(); c.stroke(); }
  // тулуб
  c.fillStyle = fur; ell(c, 0, 2, 30, 24); c.fill(); c.stroke();
  c.fillStyle = belly; ell(c, -4, 9, 16, 13); c.fill();
  // вушка
  c.fillStyle = fur; circ(c, -16, -20, 7); c.fill(); c.stroke(); circ(c, 8, -22, 7); c.fill(); c.stroke();
  c.fillStyle = '#ffb0c0'; circ(c, -16, -20, 3.5); c.fill(); circ(c, 8, -22, 3.5); c.fill();
  // щічки, напхані насінням
  const cheek = rest ? 10 : 8 + Math.sin(t * 6) * 0.8;
  c.fillStyle = belly; ell(c, -20, 2, cheek, cheek * 0.85); c.fill(); c.stroke(); ell(c, 10, 3, cheek * 0.9, cheek * 0.8); c.fill(); c.stroke();
  // очі
  if (rest) { c.lineWidth = 1.6; c.beginPath(); c.arc(-11, -6, 3.5, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); c.beginPath(); c.arc(1, -7, 3.5, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }
  else { c.fillStyle = INK; circ(c, -11, -7, 3.4); c.fill(); circ(c, 1, -8, 3.4); c.fill(); c.fillStyle = '#fff'; circ(c, -12, -8.5, 1.2); c.fill(); circ(c, 0, -9.5, 1.2); c.fill(); }
  // носик і зубки
  c.fillStyle = '#ff7a9a'; ell(c, -5, -1, 2.6, 2); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; c.fillRect(-7, 3, 2.6, 4); c.strokeRect(-7, 3, 2.6, 4); c.fillRect(-4.4, 3, 2.6, 4); c.strokeRect(-4.4, 3, 2.6, 4);
  // вусики
  c.lineWidth = 0.8; c.beginPath(); c.moveTo(-9, 0); c.lineTo(-24, -3); c.moveTo(-9, 2); c.lineTo(-24, 4); c.moveTo(-1, 0); c.lineTo(12, -4); c.stroke();
  if (B.dead) { c.fillStyle = 'rgba(255,120,170,.6)'; circ(c, -22, 8, 3); c.fill(); circ(c, 14, 8, 3); c.fill(); }
  if (rest) { c.restore(); c.save(); txt24(c, 'z', x + 18, y - 34 - (t * 10) % 10, 12, '#8a5a30', '#ffffff', 2); c.restore(); return; }
  c.restore();
}
function drawSeedBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(b.t * 10); c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = '#3a3030';
  c.beginPath(); c.moveTo(0, -8); c.quadraticCurveTo(6, 0, 0, 8); c.quadraticCurveTo(-6, 0, 0, -8); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#e8e0d0'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-1.5, -5); c.quadraticCurveTo(-3, 0, -1.5, 5); c.moveTo(1.5, -5); c.quadraticCurveTo(3, 0, 1.5, 5); c.stroke();
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock25(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'crateblock') { rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = '#d9a86a'; c.fill(); c.stroke(); c.strokeStyle = '#a8783a'; c.lineWidth = 1; for (const yy of [8, 16]) { c.beginPath(); c.moveTo(2, yy); c.lineTo(T - 2, yy); c.stroke(); } c.fillStyle = '#ff4d4d'; circ(c, 8, 5, 2.6); c.fill(); c.fillStyle = '#ffd23f'; circ(c, 15, 5, 2.6); c.fill(); }
  else if (b === 'leafblock') { rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#5cc05a'; c.fill(); c.stroke(); c.fillStyle = '#8ad87a'; circ(c, 8, 8, 4); c.fill(); circ(c, 16, 14, 3.4); c.fill(); c.fillStyle = '#ff7a9a'; circ(c, 15, 7, 1.6); c.fill(); }
  else if (b === 'shapeblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#ffffff'; c.fill(); c.stroke(); c.fillStyle = '#ff4d4d'; circ(c, 7, 7, 3.4); c.fill(); c.fillStyle = '#3f8fff'; c.fillRect(13, 4, 7, 7); c.fillStyle = '#4cc35a'; c.beginPath(); c.moveTo(12, 13); c.lineTo(17, 21); c.lineTo(7, 21); c.closePath(); c.fill(); }
  else if (b === 'shelfblock') { rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = '#e8eef4'; c.fill(); c.stroke(); c.fillStyle = '#b0c0d0'; c.fillRect(1.5, 18, T - 3, 4); c.fillStyle = '#ff7a9a'; rr(c, 4, 7, 5, 11, 1); c.fill(); c.fillStyle = '#4cb6ff'; rr(c, 10, 9, 5, 9, 1); c.fill(); c.fillStyle = '#ffd23f'; rr(c, 16, 6, 4, 12, 1); c.fill(); }
  else if (b === 'sackblock') { rr(c, 1, 2, T - 2, T - 3, 7); c.fillStyle = '#e8d4a8'; c.fill(); c.stroke(); c.strokeStyle = '#a8783a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(6, 6); c.lineTo(18, 6); c.stroke(); c.fillStyle = '#3a3030'; for (const [a, d] of [[8, 13], [14, 15], [11, 18]]) { ell(c, a, d, 1.6, 2.6, 0.4); c.fill(); } }
  else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor25(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'basketS': c.fillStyle = '#c8945a'; c.beginPath(); c.moveTo(-9 + x, y - 9); c.lineTo(9 + x, y - 9); c.lineTo(7 + x, y); c.lineTo(-7 + x, y); c.closePath(); c.fill(); c.stroke(); drawItem26(c, d.it || 'apple', x - 3, y - 11, 0.55, t); drawItem26(c, 'pear', x + 4, y - 11, 0.5, t); c.strokeStyle = '#8a5a30'; c.lineWidth = 1.2; c.beginPath(); c.arc(x, y - 9, 8, Math.PI, TAU); c.stroke(); break;
    case 'mushS': c.fillStyle = '#f4ead8'; c.fillRect(x - 2, y - 7, 4, 7); c.strokeRect(x - 2, y - 7, 4, 7); c.fillStyle = '#ff5a5a'; c.beginPath(); c.arc(x, y - 7, 7, Math.PI, TAU); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#fff'; circ(c, x - 3, y - 10, 1.3); c.fill(); circ(c, x + 3, y - 9, 1.1); c.fill(); break;
    case 'shapeS': drawShapePiece(c, d.s || 'circle', x, y - 7, 6, t); break;
    case 'cartS': c.strokeStyle = '#8a9ab0'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x - 12, y - 16); c.lineTo(x - 8, y - 16); c.lineTo(x - 5, y - 5); c.lineTo(x + 9, y - 5); c.lineTo(x + 11, y - 13); c.lineTo(x - 7, y - 13); c.stroke(); c.fillStyle = INK; circ(c, x - 3, y - 2, 1.8); c.fill(); circ(c, x + 7, y - 2, 1.8); c.fill(); break;
    case 'seedS': c.fillStyle = '#3a3030'; for (let i = 0; i < 4; i++) { ell(c, x - 5 + i * 3.5, y - 1.5 - (i % 2), 1.4, 2.4, 0.5 + i); c.fill(); } break;
  }
}

/* ===== Фони ===== */
function bgFruitmarket(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 170;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 30, k = ((i % 3) + 3) % 3, cols = [['#ff6a6a', '#ffffff'], ['#4cb6ff', '#ffffff'], ['#7fd46a', '#fffbe0']][k];
    c.fillStyle = '#a8683a'; c.fillRect(wx + 2, 150, 4, 72); c.fillRect(wx + 94, 150, 4, 72);
    for (let s = 0; s < 6; s++) { c.fillStyle = cols[s % 2]; c.beginPath(); c.moveTo(wx + s * 17, 140); c.lineTo(wx + s * 17 + 17, 140); c.lineTo(wx + s * 17 + 17, 156); c.quadraticCurveTo(wx + s * 17 + 8.5, 162, wx + s * 17, 156); c.closePath(); c.fill(); }
    c.fillStyle = '#d9a86a'; c.fillRect(wx, 196, 100, 26);
    for (let f = 0; f < 7; f++) { c.fillStyle = ['#ff4d4d', '#ffd23f', '#ff9a2a', '#b8e04a'][(f + k) % 4]; circ(c, wx + 10 + f * 13, 194, 6); c.fill(); }
  }
  hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#b8e090');
}
function bgHideforest(c, viewW, camX, t) {
  for (let i = 0; i < 3; i++) { const x = wrapX(i * 300 - camX * 0.08 + t * 4, viewW + 300) - 150; puffCloud(c, x, 34 + (i % 2) * 20, 0.8, 'rgba(255,255,255,.9)'); }
  const span = 120;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.22, span) + 20, h = 90 + ((i * 37) % 3 + 3) % 3 * 18;
    c.fillStyle = '#9a7050'; c.fillRect(wx - 5, 222 - h + 30, 10, h - 30);
    c.fillStyle = '#7fcf86'; circ(c, wx, 222 - h + 20, 30); c.fill(); circ(c, wx - 20, 222 - h + 40, 22); c.fill(); circ(c, wx + 20, 222 - h + 38, 22); c.fill();
  }
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#5cbf62');
}
function bgShapetown(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 110, SH = ['circle', 'square', 'triangle', 'star', 'heart'];
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 30, k = ((i % 5) + 5) % 5, h = 60 + (k % 3) * 18;
    c.fillStyle = ['#ffd6d6', '#d6e4ff', '#d8f4d0', '#fff2c0', '#ffd8ec'][k]; c.fillRect(wx, 222 - h, 60, h);
    c.fillStyle = ['#ff8a8a', '#7fa8ff', '#7fd47a', '#ffd23f', '#ff9fc4'][k];
    c.beginPath(); if (k % 2) { c.moveTo(wx - 6, 222 - h); c.lineTo(wx + 30, 222 - h - 28); c.lineTo(wx + 66, 222 - h); } else { c.arc(wx + 30, 222 - h, 30, Math.PI, TAU); } c.closePath(); c.fill();
    c.save(); c.globalAlpha = 0.9; c.translate(wx + 30, 222 - h + 26); c.fillStyle = '#ffffff'; shapePath26(c, SH[k], 9); c.fill(); c.restore();
  }
}
function bgBigshop(c, viewW, camX, t) {
  c.fillStyle = 'rgba(255,255,255,.7)'; for (let i = 0; i < viewW / 160 + 2; i++) { const lx = i * 160 + wrapX(-camX * 0.1, 160); c.fillRect(lx, 18, 90, 6); }
  const span = 140;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 10;
    c.fillStyle = '#c8d4e0'; c.fillRect(wx, 120, 110, 102); c.fillStyle = '#e8eef4';
    for (let r = 0; r < 4; r++) { c.fillStyle = '#a8b6c4'; c.fillRect(wx, 140 + r * 22, 110, 3); for (let p = 0; p < 8; p++) { c.fillStyle = ['#ff7a9a', '#4cb6ff', '#ffd23f', '#7fd46a', '#ff9a2a'][(p + r + i * 3 + 50) % 5]; rr(c, wx + 4 + p * 13, 126 + r * 22, 10, 14, 2); c.fill(); } }
  }
  c.fillStyle = '#ffffff'; c.fillRect(0, 216, viewW, 6);
}
function bgHamsterhole(c, viewW, camX, t) {
  c.fillStyle = 'rgba(160,110,60,.25)'; for (let i = 0; i < viewW / 90 + 2; i++) { const rx = i * 90 + wrapX(-camX * 0.15, 90); ell(c, rx, 60 + (i % 3) * 30, 24, 14); c.fill(); }
  const span = 130;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 30;
    c.fillStyle = '#e8d4a8'; rr(c, wx - 18, 180, 36, 42, 12); c.fill(); c.fillStyle = '#c8b088'; c.fillRect(wx - 8, 176, 16, 6);
    c.fillStyle = '#3a3030'; for (let s = 0; s < 6; s++) { ell(c, wx - 14 + s * 6, 178 - (s % 2) * 2, 1.6, 2.6, s); c.fill(); }
    c.fillStyle = '#ffd23f'; circ(c, wx + 40, 206, 10); c.fill(); c.fillStyle = '#8a5a30'; circ(c, wx + 40, 206, 5); c.fill();
  }
  hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#b88a5a');
}
Object.assign(BG2, { fruitmarket: bgFruitmarket, hideforest: bgHideforest, shapetown: bgShapetown, bigshop: bgBigshop, hamsterhole: bgHamsterhole });
