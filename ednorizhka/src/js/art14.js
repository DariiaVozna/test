'use strict';
/* ===== Частина 14: Медовий вулик, Кришталева ущелина, Небесна пральня, Годинникова вежа, Пасіка Бурмила ===== */
Object.assign(THEMES, {
  hive: { sky: ['#ffe9a8', '#fff3c9', '#fffaf0'], panel: '#5a3a10', top: '#ffc93d', topHi: '#ffe48a', topLo: '#d99a1a', fill: '#e8a93a', fillLo: '#cf8f22', dots: ['#ffd36a', '#b8781a', '#fff0b0'], block: 'comb', ice: false, topStyle: 'drip', dotShape: 'dot' },
  crystal: { sky: ['#1d1650', '#3a2a7a', '#6a4aa8'], panel: '#110c30', top: '#9fb8ff', topHi: '#d6e0ff', topLo: '#6a7ad9', fill: '#4a3a8e', fillLo: '#3a2c75', dots: ['#7a6ad9', '#c9b6ff', '#9fe0ff'], block: 'gemblock', ice: false, topStyle: 'crystal', fillStyle: 'facets' },
  laundry: { sky: ['#a8dcff', '#d6f0ff', '#fff6fa'], panel: '#2a4a7a', top: '#ffffff', topHi: '#ffffff', topLo: '#c5dcf7', fill: '#e4f0ff', fillLo: '#cadff7', dots: ['#ffffff', '#ffd2ea', '#c9f0ff'], block: 'basketblock', ice: false, topStyle: 'snow', dotShape: 'dot' },
  clocktower: { sky: ['#f2d6a8', '#fae8c8', '#fff6e6'], panel: '#4a2a1a', top: '#c98d55', topHi: '#e3b07a', topLo: '#8a5a30', fill: '#a8743f', fillLo: '#8a5a30', dots: [], block: 'clockblock', ice: false, topStyle: 'plank', fillStyle: 'planks' },
  apiary: { sky: ['#bfe8ff', '#e6f7ff', '#fffbe0'], panel: '#3a4a1a', top: '#8fd46a', topHi: '#c0f09a', topLo: '#5aa848', fill: '#b97a4f', fillLo: '#9a6040', dots: ['#d9a273', '#8a5434', '#e6bf8f'], block: 'hivebox', ice: false, topStyle: 'grass', dotShape: 'pebble' },
});
Object.assign(PLANKS, { hive: ['#ffc93d', '#d99a1a'], clocktower: ['#c98d55', '#8a5a30'], apiary: ['#d9a36c', '#a8743f'] });

/* ===== Вороги ===== */
function drawSock(c, x, y, t, dir, flash, col) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.rotate(Math.sin(t * 6) * 0.15); c.lineJoin = 'round';
  c.fillStyle = flash ? '#fff' : (col || '#ff7ab8'); c.strokeStyle = INK; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(-6, -11); c.lineTo(4, -11); c.lineTo(4, 3); c.quadraticCurveTo(12, 3, 12, 8); c.quadraticCurveTo(12, 12, 4, 12); c.lineTo(-2, 12); c.quadraticCurveTo(-6, 12, -6, 6); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; c.fillRect(-6, -11, 10, 4); c.strokeRect(-6, -11, 10, 4);
  c.fillStyle = 'rgba(255,255,255,.6)'; for (const yy of [-3, 3]) c.fillRect(-5, yy, 8, 2);
  c.fillStyle = '#fff'; circ(c, 0, -2, 2.2); c.fill(); c.fillStyle = INK; circ(c, 0.6, -2, 1.1); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1.4; const f = Math.sin(t * 18) * 3; c.beginPath(); c.moveTo(-6, -8); c.quadraticCurveTo(-12, -12 + f, -16, -6 + f); c.moveTo(-6, -4); c.quadraticCurveTo(-11, -6 - f, -14, 0 - f); c.stroke();
  c.restore();
}
function drawCuckoo(c, e, t, flash) {
  const hx = e.hx + 11, gy = e.y + e.h;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  c.fillStyle = '#a8743f'; c.beginPath(); c.moveTo(hx - 12, gy); c.lineTo(hx - 12, gy - 22); c.lineTo(hx, gy - 32); c.lineTo(hx + 12, gy - 22); c.lineTo(hx + 12, gy); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff3e0'; circ(c, hx, gy - 12, 6); c.fill(); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(hx, gy - 12); c.lineTo(hx, gy - 16); c.moveTo(hx, gy - 12); c.lineTo(hx + 3, gy - 12); c.stroke();
  c.fillStyle = '#5a3a24'; rr(c, hx - 4, gy - 27, 8, 7, 1.5); c.fill(); c.stroke();
  if (e.out > 0.05) {
    const bx = hx - e.out * 18;
    c.strokeStyle = '#c98d55'; c.lineWidth = 1.4; c.beginPath(); for (let i = 0; i < 4; i++) { c.lineTo(hx - 2 - i * (e.out * 4), gy - 23 + (i % 2 ? 3 : -3)); } c.stroke();
    c.fillStyle = flash ? '#fff' : '#7fd4ff'; c.strokeStyle = INK; c.lineWidth = 1.1; ell(c, bx, gy - 23, 7, 5); c.fill(); c.stroke();
    c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(bx - 6, gy - 24); c.lineTo(bx - 11, gy - 22.5); c.lineTo(bx - 6, gy - 21); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, bx - 3, gy - 24.5, 1); c.fill();
    if (e.out > 0.9) { c.font = '900 8px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.fillStyle = '#fff'; c.lineWidth = 2; c.strokeText('Ку-ку!', bx, gy - 34); c.fillText('Ку-ку!', bx, gy - 34); }
  }
  c.restore();
}
function drawEnemy10(c, e, cx, fl) {
  switch (e.k) {
    case 'sock': drawSock(c, cx, e.y + e.h / 2, e.t, e.dir, fl, e.col); return true;
    case 'cuckoo': drawCuckoo(c, e, e.t, fl); return true;
  }
  return false;
}

/* ===== Плитки: медова стіна, світловий міст ===== */
Object.assign(TILE7, { honey: 1, light: 1, lightW: 1, lightGhost: 1 });
function tileKind10(v, tx, ty) {
  if (v === 28) return 'honey';
  if (v === 29) { const cr = G.bridgeOf.get(ty * G.Wt + tx); return cr && cr.t < 1.5 && Math.floor(G.t * 8) % 2 ? 'lightW' : 'light'; }
  return 'lightGhost';
}
function drawTile10(c, kind) {
  c.lineJoin = 'round'; c.lineCap = 'round';
  if (kind === 'honey') {
    c.fillStyle = '#ffb400'; c.fillRect(0, 0, T, T);
    c.strokeStyle = '#e09000'; c.lineWidth = 1.2;
    const hex = (cx, cy, r) => { c.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } c.closePath(); c.stroke(); };
    hex(6, 6, 5.4); hex(18, 6, 5.4); hex(12, 16, 5.4); hex(0, 16, 5.4); hex(24, 16, 5.4);
    c.fillStyle = 'rgba(255,255,255,.35)'; ell(c, 6, 4, 2.4, 1.2); c.fill(); ell(c, 15, 14, 2, 1); c.fill();
    c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(4, T); c.quadraticCurveTo(5, T - 5, 7, T); c.fill(); c.beginPath(); c.moveTo(16, T); c.quadraticCurveTo(17, T - 7, 19, T); c.fill();
    c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0.6, 0); c.lineTo(0.6, T); c.moveTo(T - 0.6, 0); c.lineTo(T - 0.6, T); c.stroke();
  } else if (kind === 'light' || kind === 'lightW') {
    const g = c.createLinearGradient(0, 0, T, 0); for (let i = 0; i < 6; i++) g.addColorStop(i / 5, RAINBOW[i]);
    c.globalAlpha = kind === 'lightW' ? 0.45 : 0.9; c.fillStyle = g; rr(c, 0, 4, T, 10, 4); c.fill();
    c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(1, 5.5, T - 2, 2.4); c.globalAlpha = 1;
    c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 1.2; rr(c, 0.5, 4, T - 1, 10, 4); c.stroke();
  } else if (kind === 'lightGhost') {
    c.strokeStyle = 'rgba(201,182,255,.55)'; c.lineWidth = 1.2; c.setLineDash([3, 3]); rr(c, 0.5, 4, T - 1, 10, 4); c.stroke(); c.setLineDash([]);
  }
}

/* ===== Кристали, кошики, маятники, калюжі ===== */
function drawCrystal(c, cr, t) {
  const x = cr.x, y = cr.y + 12, on = cr.t > 0;
  c.save(); c.lineJoin = 'round';
  if (on || cr.glow > 0) { const g = c.createRadialGradient(x, y - 14, 2, x, y - 14, 30); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(201,182,255,0)'); c.fillStyle = g; circ(c, x, y - 14, 30); c.fill(); }
  c.fillStyle = '#6a5aa8'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, x - 9, y - 5, 18, 5, 2); c.fill(); c.stroke();
  const col = on ? '#e6dcff' : '#a88cff';
  c.fillStyle = col; c.beginPath(); c.moveTo(x, y - 30); c.lineTo(x + 8, y - 16); c.lineTo(x + 5, y - 5); c.lineTo(x - 5, y - 5); c.lineTo(x - 8, y - 16); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.65)'; c.beginPath(); c.moveTo(x - 1, y - 27); c.lineTo(x - 5, y - 16); c.lineTo(x - 2, y - 8); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(59,31,79,.4)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x - 8, y - 16); c.lineTo(x + 8, y - 16); c.moveTo(x, y - 30); c.lineTo(x, y - 5); c.stroke();
  if (on) { const k = cr.t / cr.dur; c.strokeStyle = '#ffffff'; c.lineWidth = 2.4; c.beginPath(); c.arc(x, y - 40, 6, -Math.PI / 2, -Math.PI / 2 + TAU * k); c.stroke(); }
  else sparkle(c, x + 10, y - 30 + Math.sin(t * 4 + x) * 2, 1.8, '#fff8c0');
  c.restore();
}
function drawPulleyRig(c, m) {
  if (!m.lead) return;
  const B = G.movers[m.mate], wy = m.wheelY;
  c.save(); c.lineCap = 'round';
  const ax = m.x + m.w / 2, bx = B.x + B.w / 2;
  c.strokeStyle = '#8a5a30'; c.lineWidth = 2; c.beginPath(); c.moveTo(ax, m.y - 10); c.lineTo(ax, wy); c.lineTo(bx, wy); c.lineTo(bx, B.y - 10); c.stroke();
  for (const wx of [ax, bx]) { c.fillStyle = '#c9d2e6'; c.strokeStyle = INK; c.lineWidth = 1.4; circ(c, wx, wy, 7); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, wx, wy, 1.6); c.fill(); }
  c.restore();
}
function drawBasket(c, m) {
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  const x = m.x, y = m.y, w = m.w;
  c.strokeStyle = '#8a5a30'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x + 4, y); c.lineTo(x + w / 2, y - 10); c.lineTo(x + w - 4, y); c.stroke();
  c.fillStyle = '#e3b26b'; c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); c.lineTo(x + w, y); c.lineTo(x + w - 5, y + 16); c.lineTo(x + 5, y + 16); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#a8743f'; c.lineWidth = 1; c.beginPath(); for (let xx = x + 6; xx < x + w - 4; xx += 6) { c.moveTo(xx, y + 1); c.lineTo(xx - 1, y + 15); } c.moveTo(x + 3, y + 8); c.lineTo(x + w - 3, y + 8); c.stroke();
  c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 0.8; ell(c, x + w * 0.3, y - 1, 6, 2.4); c.fill(); c.stroke(); c.fillStyle = '#ff9fd0'; ell(c, x + w * 0.65, y - 1, 5, 2.2); c.fill(); c.stroke();
  c.restore();
}
function drawPendulum(c, p) {
  c.save(); c.lineCap = 'round';
  c.fillStyle = '#c9a06a'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, p.ax, p.ay + 3, 5); c.fill(); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(p.ax, p.ay + 3); c.lineTo(p.bx, p.by); c.stroke();
  c.strokeStyle = '#ffd23f'; c.lineWidth = 2; c.stroke();
  c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1.6; circ(c, p.bx, p.by, 13); c.fill(); c.stroke();
  c.fillStyle = '#ffe98a'; circ(c, p.bx - 3, p.by - 3, 6); c.fill();
  c.fillStyle = INK; circ(c, p.bx - 4, p.by - 1, 1.4); c.fill(); circ(c, p.bx + 4, p.by - 1, 1.4); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath(); c.arc(p.bx, p.by + 2, 3.4, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
  c.restore();
}
function drawPuddle(c, q, t) {
  const gy = G.boss ? G.boss.gy : 10 * T, k = Math.min(1, q.t / 0.6);
  c.save(); c.globalAlpha = k;
  c.fillStyle = '#ffb400'; c.strokeStyle = '#d98a00'; c.lineWidth = 1.2; ell(c, q.x, gy - 2, q.w / 2, 5); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.5)'; ell(c, q.x - q.w / 5, gy - 4, q.w / 7, 1.4); c.fill();
  c.restore();
}
function drawWorld10(c, t, vis) {
  for (const m of G.movers) if (m.pulley && m.lead) drawPulleyRig(c, m);
  for (const cr of G.crystals) if (vis(cr.x)) drawCrystal(c, cr, t);
  for (const p of G.pendulums) if (vis(p.ax, 220)) drawPendulum(c, p);
  for (const q of G.puddles) if (vis(q.x, 60)) drawPuddle(c, q, t);
}
/* Синюватий серпанок, поки час зупинено */
function drawTimeStop(c, t) {
  const k = Math.min(1, G.timeStop / 0.5);
  c.save(); c.globalAlpha = 0.2 * k; c.fillStyle = '#7a9cff'; c.fillRect(G.cam - 10, -60, viewW + 20, VIEW_H + 120);
  c.globalAlpha = 0.55 * k; c.strokeStyle = '#ffffff'; c.lineWidth = 2;
  const cx = G.cam + viewW - 60, cy = 92; circ(c, cx, cy, 18); c.stroke();
  c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx, cy - 12); c.moveTo(cx, cy); c.lineTo(cx + 8, cy + 4); c.stroke();
  c.restore();
}

/* ===== Ведмідь Бурмило ===== */
function drawBearBoss(c, B, t) {
  const st = B.state, flash = B.flash > 0, happy = B.dead, eat = st === 'eat';
  const fur = flash ? '#fff' : '#a8743f', lite = '#e6c08a', d = B.dir || 1;
  c.save(); c.translate(B.x, B.fy); c.scale(d, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.6;
  const sit = eat || happy;
  const wob = st === 'walk' ? Math.sin(t * 7) * 2 : 0;
  // лапи
  c.fillStyle = fur;
  if (sit) { ell(c, -12, -4, 9, 5); c.fill(); c.stroke(); ell(c, 12, -4, 9, 5); c.fill(); c.stroke(); }
  else { for (const [lx, s] of [[-16, 1], [-6, -1], [8, 1], [18, -1]]) { rr(c, lx - 4 + wob * s * 0.5, -12, 8, 12, 3); c.fill(); c.stroke(); } }
  // тулуб
  ell(c, 0, sit ? -26 : -26, sit ? 22 : 27, sit ? 24 : 20); c.fill(); c.stroke();
  c.fillStyle = lite; ell(c, sit ? 2 : 6, sit ? -22 : -20, sit ? 13 : 15, sit ? 15 : 10); c.fill();
  // голова
  c.save(); c.translate(sit ? 4 : 24, sit ? -54 : -40 + (st === 'throw' && B.st < 0.5 ? -4 : 0));
  c.fillStyle = fur; c.strokeStyle = INK; c.lineWidth = 1.5;
  for (const ex of [-10, 10]) { circ(c, ex, -12, 6); c.fill(); c.stroke(); c.fillStyle = '#ff9fbf'; circ(c, ex, -12, 3); c.fill(); c.fillStyle = fur; }
  circ(c, 0, 0, 15); c.fill(); c.stroke();
  c.fillStyle = lite; ell(c, 5, 5, 9, 7); c.fill(); c.stroke();
  c.fillStyle = INK; ell(c, 8, 2, 3.4, 2.4); c.fill();
  if (eat || happy) { c.lineWidth = 1.6; for (const ex of [-4, 6]) { c.beginPath(); c.arc(ex, -4, 2.8, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); } }
  else { for (const ex of [-4, 6]) { c.fillStyle = '#fff'; circ(c, ex, -5, 3); c.fill(); c.fillStyle = INK; circ(c, ex + 1, -5, 1.6); c.fill(); } c.lineWidth = 1.8; c.beginPath(); c.moveTo(-8, -10); c.lineTo(-1, -8); c.moveTo(10, -10); c.lineTo(3, -8); c.stroke(); }
  c.lineWidth = 1.2; c.beginPath(); c.arc(6, 8, 3.4, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
  if (eat) { c.fillStyle = '#ff7a95'; ell(c, 10, 11 + Math.sin(t * 12) * 1.5, 2.6, 2); c.fill(); }
  c.restore();
  // горщик із медом у лапах
  if (eat || (st === 'throw' && !B.thrown)) {
    const px = eat ? 14 : 26, py = eat ? -32 : -58;
    c.fillStyle = '#d98d55'; c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(px - 9, py - 8); c.lineTo(px + 9, py - 8); c.quadraticCurveTo(px + 13, py + 4, px + 7, py + 10); c.lineTo(px - 7, py + 10); c.quadraticCurveTo(px - 13, py + 4, px - 9, py - 8); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ffb400'; ell(c, px, py - 8, 9, 3); c.fill(); c.stroke();
    c.fillStyle = '#fff3d6'; c.font = '900 7px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.save(); c.translate(px, py + 3); c.scale(d, 1); c.fillText('МЕД', 0, 0); c.restore();
  }
  c.restore();
  if (eat) { c.save(); c.font = '900 10px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.lineWidth = 2.4; c.strokeStyle = INK; c.fillStyle = '#fff'; const k = (t * 0.7) % 1; c.globalAlpha = 1 - k; c.strokeText('ням-ням', B.x, B.fy - 86 - k * 14); c.fillText('ням-ням', B.x, B.fy - 86 - k * 14); c.restore(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, B.fy - 86 - k * 30, 9); c.fillStyle = ['#ff7ab8', '#ffd23f', '#ff5c8a'][i]; c.fill(); c.restore(); }
}
function drawPotBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(b.t * 6); c.lineJoin = 'round';
  c.fillStyle = '#d98d55'; c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-6, -5); c.lineTo(6, -5); c.quadraticCurveTo(9, 3, 5, 7); c.lineTo(-5, 7); c.quadraticCurveTo(-9, 3, -6, -5); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffb400'; ell(c, 0, -5, 6, 2.2); c.fill(); c.stroke();
  c.restore();
}
function drawCombBolt(c, b) {
  const gy = G.boss ? G.boss.gy : 10 * T, k = clamp((b.y + 40) / (gy + 40), 0, 1);
  c.save(); c.fillStyle = `rgba(59,31,79,${0.15 + k * 0.25})`; ell(c, b.x, gy - 1, 6 + k * 8, 2 + k * 2); c.fill(); c.restore();
  c.save(); c.translate(b.x, b.y); c.lineJoin = 'round';
  c.fillStyle = '#ffc93d'; c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + Math.PI / 6; c.lineTo(Math.cos(a) * 9, Math.sin(a) * 9); } c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#d99a1a'; c.lineWidth = 1; c.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + Math.PI / 6; c.lineTo(Math.cos(a) * 4.5, Math.sin(a) * 4.5); } c.closePath(); c.stroke();
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock11(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'comb') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#ffc93d'; c.fill(); c.stroke();
    c.strokeStyle = '#d99a1a'; c.lineWidth = 1; for (const [cx, cy] of [[7, 8], [17, 8], [12, 17]]) { c.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; c.lineTo(cx + Math.cos(a) * 4.5, cy + Math.sin(a) * 4.5); } c.closePath(); c.stroke(); }
  } else if (b === 'gemblock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#7a6ad9'; c.fill(); c.stroke();
    c.fillStyle = '#c9b6ff'; c.beginPath(); c.moveTo(12, 4); c.lineTo(19, 12); c.lineTo(12, 20); c.lineTo(5, 12); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.moveTo(12, 4); c.lineTo(8, 12); c.lineTo(12, 12); c.closePath(); c.fill();
  } else if (b === 'basketblock') {
    rr(c, 1, 2, T - 2, T - 3, 4); c.fillStyle = '#e3b26b'; c.fill(); c.stroke();
    c.strokeStyle = '#a8743f'; c.lineWidth = 1; c.beginPath(); for (let x = 5; x < T - 2; x += 5) { c.moveTo(x, 3); c.lineTo(x, T - 2); } c.moveTo(2, 12); c.lineTo(T - 2, 12); c.stroke();
  } else if (b === 'clockblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#c98d55'; c.fill(); c.stroke();
    c.fillStyle = '#fff3e0'; circ(c, T / 2, T / 2, 7); c.fill(); c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(T / 2, T / 2); c.lineTo(T / 2, T / 2 - 5); c.moveTo(T / 2, T / 2); c.lineTo(T / 2 + 4, T / 2); c.stroke();
  } else if (b === 'hivebox') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#ffe08a'; c.fill(); c.stroke();
    c.strokeStyle = '#d9a83a'; c.lineWidth = 1; c.beginPath(); c.moveTo(2, 8); c.lineTo(T - 2, 8); c.moveTo(2, 16); c.lineTo(T - 2, 16); c.stroke();
    c.fillStyle = '#5a3a24'; rr(c, T / 2 - 3, 17, 6, 4, 1.5); c.fill();
  } else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor14(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'honeypot':
      c.fillStyle = '#d98d55'; c.beginPath(); c.moveTo(x - 6, y - 12); c.lineTo(x + 6, y - 12); c.quadraticCurveTo(x + 9, y - 4, x + 5, y); c.lineTo(x - 5, y); c.quadraticCurveTo(x - 9, y - 4, x - 6, y - 12); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#ffb400'; ell(c, x, y - 12, 6, 2); c.fill(); c.stroke(); c.beginPath(); c.moveTo(x + 3, y - 12); c.quadraticCurveTo(x + 4, y - 7, x + 5, y - 6); c.lineWidth = 2; c.strokeStyle = '#ffb400'; c.stroke();
      break;
    case 'beeS': {
      const bx = x + Math.sin(t * 2 + x) * 8, by = y - 20 + Math.sin(t * 3 + x) * 4;
      c.fillStyle = '#ffd23f'; ell(c, bx, by, 4, 3); c.fill(); c.stroke(); c.fillStyle = INK; c.fillRect(bx - 1, by - 3, 1.4, 6);
      c.fillStyle = 'rgba(255,255,255,.8)'; ell(c, bx - 1, by - 4, 2.4, 1.6, -0.5); c.fill();
      break;
    }
    case 'gemS':
      c.fillStyle = d.c || '#c9b6ff'; c.beginPath(); c.moveTo(x, y - 14); c.lineTo(x + 5, y - 6); c.lineTo(x + 3, y); c.lineTo(x - 3, y); c.lineTo(x - 5, y - 6); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.moveTo(x, y - 12); c.lineTo(x - 3, y - 6); c.lineTo(x, y - 3); c.closePath(); c.fill();
      break;
    case 'peg':
      c.strokeStyle = '#c98d55'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 16); c.stroke();
      c.fillStyle = d.c || '#ff7ab8'; c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x - 6, y - 16); c.lineTo(x + 6, y - 16); c.lineTo(x + 4, y - 28); c.lineTo(x - 4, y - 28); c.closePath(); c.fill(); c.stroke();
      break;
    case 'gearS':
      c.save(); c.translate(x, y - 8); c.rotate(t * (d.s || 1)); c.fillStyle = d.c || '#c9d2e6'; c.beginPath(); for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, r = i % 2 ? 6 : 8; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath(); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 0, 0, 1.6); c.fill(); c.restore();
      break;
    case 'hiveS':
      c.fillStyle = '#ffd36a'; for (let i = 0; i < 3; i++) { ell(c, x, y - 4 - i * 6, 8 - i * 1.6, 3.4); c.fill(); c.stroke(); }
      c.fillStyle = '#5a3a24'; ell(c, x, y - 4, 2, 1.4); c.fill();
      break;
  }
}

/* ===== Фони ===== */
function bgHive(c, viewW, camX, t) {
  const hexR = 26;
  for (let row = 0; row < 7; row++) for (let i = -1; i < viewW / (hexR * 1.75) + 2; i++) {
    const x = i * hexR * 1.75 + (row % 2) * hexR * 0.87 + wrapX(-camX * 0.15, hexR * 1.75), y = row * hexR * 1.5;
    c.fillStyle = (row + i) % 5 === 0 ? 'rgba(255,190,40,.35)' : 'rgba(255,220,120,.25)';
    c.beginPath(); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + Math.PI / 6; c.lineTo(x + Math.cos(a) * hexR, y + Math.sin(a) * hexR); } c.closePath(); c.fill();
    c.strokeStyle = 'rgba(217,154,26,.35)'; c.lineWidth = 2; c.stroke();
  }
  for (let i = 0; i < 6; i++) { const bx = wrapX(i * 140 - camX * 0.3 + Math.sin(t + i) * 30, viewW + 40) - 20, by = 60 + (i % 3) * 40 + Math.sin(t * 2 + i) * 10; c.fillStyle = 'rgba(255,210,63,.9)'; ell(c, bx, by, 5, 3.6); c.fill(); c.fillStyle = 'rgba(59,31,79,.6)'; c.fillRect(bx - 1, by - 3, 1.6, 6); c.fillStyle = 'rgba(255,255,255,.7)'; ell(c, bx - 1, by - 5, 3, 2); c.fill(); }
}
function bgCrystal(c, viewW, camX, t) {
  const R = rng(51);
  for (let i = 0; i < 40; i++) { const x = wrapX(R() * 1400 - camX * 0.05, viewW + 20) - 10, y = R() * 150, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); c.fillStyle = `rgba(230,220,255,${0.3 + tw * 0.6})`; circ(c, x, y, 0.6 + R() * 0.9); c.fill(); }
  for (const [f, base, cols] of [[0.15, 160, ['#3a2a7a', '#4a3a9a']], [0.35, 196, ['#5a4ab8', '#6a5ad9']]]) {
    const span = 90;
    for (let i = -1; i < viewW / span + 2; i++) {
      const wx = i * span + wrapX(-camX * f, span), h = 40 + ((i * 37 + Math.floor(camX * f / span) * 37) % 50 + 50) % 50;
      c.fillStyle = cols[((i % 2) + 2) % 2]; c.beginPath(); c.moveTo(wx, VIEW_H); c.lineTo(wx + 10, base - h); c.lineTo(wx + 26, base - h - 18); c.lineTo(wx + 40, base - h); c.lineTo(wx + 50, VIEW_H); c.closePath(); c.fill();
      c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.moveTo(wx + 26, base - h - 18); c.lineTo(wx + 18, base - h); c.lineTo(wx + 26, VIEW_H); c.closePath(); c.fill();
    }
  }
}
function bgLaundry(c, viewW, camX, t) {
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 170 - camX * 0.1 + t * 6, viewW + 240) - 120; puffCloud(c, x, 40 + (i % 3) * 24, 1, 'rgba(255,255,255,.9)'); }
  const span = 260;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span);
    c.strokeStyle = 'rgba(138,90,48,.6)'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(wx, 70); c.quadraticCurveTo(wx + span / 2, 96, wx + span, 70); c.stroke();
    const items = ['#ff9fd0', '#9fe0ff', '#ffe08a', '#c5a8ff', '#a8f0c8'];
    for (let k = 0; k < 5; k++) {
      const kx = wx + 30 + k * 46, ky = 70 + Math.sin((k + 0.5) / 5 * Math.PI) * 24, sw = Math.sin(t * 2 + k + i) * 0.1;
      c.save(); c.translate(kx, ky); c.rotate(sw); c.fillStyle = items[(k + i + 50) % 5];
      if (k % 2) { c.beginPath(); c.moveTo(-10, 0); c.lineTo(10, 0); c.lineTo(12, 8); c.lineTo(7, 8); c.lineTo(7, 24); c.lineTo(-7, 24); c.lineTo(-7, 8); c.lineTo(-12, 8); c.closePath(); c.fill(); }
      else { c.fillRect(-5, 0, 8, 16); c.beginPath(); c.moveTo(-5, 16); c.lineTo(3, 16); c.quadraticCurveTo(10, 16, 10, 21); c.lineTo(-5, 21); c.closePath(); c.fill(); }
      c.restore();
    }
  }
  hill(c, viewW, 222, 6, 0.03, 1.2, camX * 0.4, 'rgba(255,255,255,.85)');
}
function bgClockTower(c, viewW, camX, t) {
  const span = 300;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.15, span) + 120;
    c.save(); c.translate(wx, 90); c.rotate(t * 0.2 * (i % 2 ? 1 : -1)); c.fillStyle = 'rgba(168,116,63,.3)'; c.beginPath(); for (let k = 0; k < 24; k++) { const a = k * Math.PI / 12, r = k % 2 ? 50 : 60; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath(); c.fill(); c.fillStyle = 'rgba(255,243,224,.6)'; circ(c, 0, 0, 20); c.fill(); c.restore();
    c.save(); c.translate(wx + 150, 150); c.rotate(-t * 0.35); c.fillStyle = 'rgba(168,116,63,.22)'; c.beginPath(); for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, r = k % 2 ? 26 : 34; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath(); c.fill(); c.restore();
  }
  const cs = 420;
  for (let i = -1; i < viewW / cs + 2; i++) {
    const wx = i * cs + wrapX(-camX * 0.3, cs) + 280;
    c.fillStyle = 'rgba(255,250,240,.85)'; circ(c, wx, 70, 34); c.fill(); c.strokeStyle = 'rgba(138,90,48,.7)'; c.lineWidth = 3; c.stroke();
    c.lineWidth = 2.4; c.beginPath(); c.moveTo(wx, 70); c.lineTo(wx + Math.cos(t * 0.5) * 20, 70 + Math.sin(t * 0.5) * 20); c.moveTo(wx, 70); c.lineTo(wx + Math.cos(t * 0.04) * 14, 70 + Math.sin(t * 0.04) * 14); c.stroke();
  }
}
function bgApiary(c, viewW, camX, t) {
  const sx = viewW * 0.8, sg = c.createRadialGradient(sx, 48, 4, sx, 48, 56);
  sg.addColorStop(0, 'rgba(255,250,200,1)'); sg.addColorStop(0.35, 'rgba(255,240,170,.8)'); sg.addColorStop(1, 'rgba(255,240,170,0)');
  c.fillStyle = sg; circ(c, sx, 48, 56); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.9)'); }
  hill(c, viewW, 182, 12, 0.012, 0.5, camX * 0.15, '#c6efbd');
  const span = 120;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 30;
    c.fillStyle = ['#ffe08a', '#ffd6ea', '#d6ecff'][((i % 3) + 3) % 3]; c.fillRect(wx - 14, 176, 28, 26); c.fillStyle = '#c98d55'; c.fillRect(wx - 17, 172, 34, 5); c.fillRect(wx - 12, 202, 4, 10); c.fillRect(wx + 8, 202, 4, 10);
    c.fillStyle = '#5a3a24'; c.fillRect(wx - 4, 196, 8, 3);
  }
  hill(c, viewW, 210, 6, 0.03, 1.2, camX * 0.4, '#9fd88a');
}
Object.assign(BG2, { hive: bgHive, crystal: bgCrystal, laundry: bgLaundry, clocktower: bgClockTower, apiary: bgApiary });
