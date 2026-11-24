'use strict';
/* ===== Частина 36 «Ящики й сова»: теми, ящики, кнопки й ворота, Сова-сторож, шматочки пазла, Робот-пилосос ===== */
Object.assign(THEMES, {
  cratefarm: Object.assign({}, THEMES.farm, { sky: ['#ffe0a8', '#fff0d0', '#fffaee'] }),
  owlwatch: Object.assign({}, THEMES.owlwood, {}),
  icecrates: Object.assign({}, THEMES.ice, { sky: ['#b8e4ff', '#e0f4ff', '#ffffff'] }),
  nightmuseum: Object.assign({}, THEMES.observatory, {}),
  robohome: Object.assign({}, THEMES.toys, { sky: ['#d0e8ff', '#e8f4ff', '#fbfdff'] }),
});
Object.assign(BG2, {
  cratefarm: (c, viewW, camX, t) => drawBackground(c, 'farm', camX, viewW, t, 0),
  owlwatch: (c, viewW, camX, t) => drawBackground(c, 'owlwood', camX, viewW, t, 0),
  icecrates: (c, viewW, camX, t) => drawBackground(c, 'ice', camX, viewW, t, 0),
  nightmuseum: (c, viewW, camX, t) => drawBackground(c, 'observatory', camX, viewW, t, 0),
  robohome: (c, viewW, camX, t) => drawBackground(c, 'toys', camX, viewW, t, 0),
});

/* ===== Нові наліпки ===== */
function drawSticker35(c, k) {
  c.strokeStyle = INK; c.lineWidth = 1.3;
  if (k === 'sunflower') {
    c.fillStyle = '#ffd23f'; for (let i = 0; i < 10; i++) { const a = i * TAU / 10; ell(c, Math.cos(a) * 8.5, Math.sin(a) * 8.5 - 2, 4.5, 2.4, a); c.fill(); }
    c.fillStyle = '#8a5a2a'; circ(c, 0, -2, 6); c.fill(); c.stroke();
    c.fillStyle = '#5a3a1a'; for (let i = 0; i < 5; i++) { circ(c, -2.5 + (i % 3) * 2.5, -4 + Math.floor(i / 3) * 3, 0.9); c.fill(); }
    c.strokeStyle = '#4f9a3a'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 5); c.lineTo(0, 15); c.stroke();
  } else if (k === 'owl') {
    c.fillStyle = '#b07a4a'; ell(c, 0, 2, 11, 12); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-9, -6); c.lineTo(-10, -13); c.lineTo(-4, -8); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(9, -6); c.lineTo(10, -13); c.lineTo(4, -8); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#f4dcb8'; ell(c, 0, 6, 6.5, 6); c.fill();
    c.fillStyle = '#ffffff'; circ(c, -4.5, -2, 4); c.fill(); c.stroke(); circ(c, 4.5, -2, 4); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, -4.5, -2, 1.8); c.fill(); circ(c, 4.5, -2, 1.8); c.fill();
    c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(-1.5, 1); c.lineTo(1.5, 1); c.lineTo(0, 4); c.closePath(); c.fill();
  } else if (k === 'penguin') {
    c.fillStyle = '#2a2438'; ell(c, 0, 1, 10, 13); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; ell(c, 0, 3, 6.5, 9.5); c.fill();
    c.fillStyle = '#ffffff'; circ(c, -3, -5, 2); c.fill(); circ(c, 3, -5, 2); c.fill();
    c.fillStyle = INK; circ(c, -3, -5, 1); c.fill(); circ(c, 3, -5, 1); c.fill();
    c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(-2, -2); c.lineTo(2, -2); c.lineTo(0, 1); c.closePath(); c.fill();
    ell(c, -4, 14, 3.5, 1.6); c.fill(); ell(c, 4, 14, 3.5, 1.6); c.fill();
    c.fillStyle = '#ff9fc4'; circ(c, -5.5, -1, 1.4); c.fill(); circ(c, 5.5, -1, 1.4); c.fill();
  } else if (k === 'dino') {
    c.fillStyle = '#7ed957'; c.beginPath(); c.moveTo(-12, 10); c.quadraticCurveTo(-14, 0, -6, -1); c.lineTo(-2, -8); c.quadraticCurveTo(2, -14, 9, -11); c.quadraticCurveTo(13, -8, 9, -5); c.lineTo(3, -4); c.quadraticCurveTo(9, 2, 8, 10); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-9 + i * 3.5, -1 - i * 2); c.lineTo(-7.5 + i * 3.5, -5 - i * 2); c.lineTo(-6 + i * 3.5, -1 - i * 2); c.closePath(); c.fill(); }
    c.fillStyle = INK; circ(c, 5.5, -9, 1.2); c.fill();
    c.fillStyle = '#4fb83a'; circ(c, -5, 4, 1.6); c.fill(); circ(c, 1, 6, 1.4); c.fill();
  } else if (k === 'robot') {
    c.fillStyle = '#9fd8ff'; rr(c, -9, -10, 18, 14, 3); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; circ(c, -4, -3, 2.6); c.fill(); circ(c, 4, -3, 2.6); c.fill();
    c.fillStyle = INK; circ(c, -4, -3, 1.2); c.fill(); circ(c, 4, -3, 1.2); c.fill();
    c.beginPath(); c.moveTo(0, -10); c.lineTo(0, -14); c.stroke(); c.fillStyle = '#ff4f5e'; circ(c, 0, -15, 2); c.fill();
    c.fillStyle = '#c8c4d8'; rr(c, -7, 5, 14, 9, 2); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; circ(c, 0, 9.5, 2); c.fill();
  } else drawSticker36(c, k);
}

/* ===== Ящик ===== */
function drawCrate(c, k) {
  const x = k.x * T + k.ox, y = k.y * T + k.oy;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#d8a060'; rr(c, x + 0.5, y + 0.5, T - 1, T - 1, 2); c.fill(); c.stroke();
  c.fillStyle = '#e8b878'; c.fillRect(x + 3, y + 3, T - 6, 4); c.fillRect(x + 3, y + T - 7, T - 6, 4);
  c.strokeStyle = '#8a5a2a'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x + 4, y + 7); c.lineTo(x + T - 4, y + T - 7); c.moveTo(x + T - 4, y + 7); c.lineTo(x + 4, y + T - 7); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1; c.strokeRect(x + 3, y + 7, T - 6, T - 14);
  if (k.goal != null && k.x !== k.goal && !k.ox) { c.globalAlpha = 0.5 + 0.3 * Math.sin(G.t * 5); c.fillStyle = '#ffffff'; c.beginPath(); const d = k.goal > k.x ? 1 : -1, ax = x + 12 + d * 15; c.moveTo(ax + d * 5, y + 12); c.lineTo(ax - d * 2, y + 7); c.lineTo(ax - d * 2, y + 17); c.closePath(); c.fill(); }
  c.restore();
}
function drawBoxPlate(c, p, t) {
  const x = p.x * T, gy = p.row * T, d = p.down;
  c.save(); c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = d ? '#7ed957' : '#ff7a8a'; rr(c, x + 2, gy - (d ? 3 : 6), T - 4, d ? 3 : 6, 2); c.fill(); c.stroke();
  if (!d) { c.globalAlpha = 0.4 + 0.3 * Math.sin(t * 4); c.fillStyle = '#ffffff'; c.fillRect(x + 6, gy - 4.5, T - 12, 1.6); }
  c.restore();
}
function drawWorld35(c, t, vis) {
  if (G.bplates) for (const p of G.bplates) if (vis(p.x * T + 12)) drawBoxPlate(c, p, t);
  if (G.bgates) for (const g of G.bgates) if (vis(g.x * T + 12) && tileAt(g.x, 8) === 2) { drawDoorCol(c, g.x, 1, 'box', '#ff7a8a', t); c.save(); c.fillStyle = '#d8a060'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, g.x * T + 5, 8 * T + 5, 14, 14, 2); c.fill(); c.stroke(); c.restore(); }
  if (G.crates) for (const k of G.crates) if (vis(k.x * T + 12)) drawCrate(c, k);
  if (G.owls) for (const o of G.owls) if (vis(o.x1 * T + 12) || vis(o.x1 * T - 200)) drawOwlGuard(c, o, t);
  if (G.pieces) for (const p of G.pieces) if (!p.got && vis(p.x)) drawPiece(c, p, t);
  drawWorld36(c, t, vis);
}

/* ===== Сова-сторож ===== */
function drawOwlGuard(c, o, t) {
  const x = o.x1 * T + 12, gy = o.gy, top = gy - 3 * T, ph = o.done ? 'green' : o.ph;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  // промінь погляду, коли дивиться
  if (ph === 'red' && !o.done) { const g = c.createLinearGradient(x, top - 20, x - 9 * T, gy); g.addColorStop(0, 'rgba(255,90,90,.35)'); g.addColorStop(1, 'rgba(255,90,90,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(x - 6, top - 22); c.lineTo(x - (o.x1 - o.x0) * T - T, gy - 4); c.lineTo(x - (o.x1 - o.x0) * T - T, gy - 3 * T); c.closePath(); c.fill(); }
  c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#a8784a'; rr(c, x - 4, top, 8, gy - top, 2); c.fill(); c.stroke();
  c.fillStyle = '#8a5a2a'; rr(c, x - 14, top - 3, 28, 5, 2); c.fill(); c.stroke();
  const oy = top - 22, wob = ph === 'yellow' ? Math.sin(t * 20) * 1.5 : 0;
  c.save(); c.translate(x + wob, oy);
  c.fillStyle = '#b07a4a'; ell(c, 0, 4, 15, 17); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-12, -8); c.lineTo(-14, -18); c.lineTo(-5, -11); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(12, -8); c.lineTo(14, -18); c.lineTo(5, -11); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#f4dcb8'; ell(c, 0, 10, 9, 9); c.fill();
  for (const ex of [-6, 6]) {
    c.fillStyle = '#ffffff'; circ(c, ex, -2, 5.5); c.fill(); c.stroke();
    if (ph === 'green') { c.beginPath(); c.arc(ex, -2, 4, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }
    else if (ph === 'yellow') { c.fillStyle = '#b07a4a'; c.fillRect(ex - 5.5, -8, 11, 5); c.beginPath(); c.moveTo(ex - 5.5, -3); c.lineTo(ex + 5.5, -3); c.stroke(); c.fillStyle = INK; circ(c, ex - 1, -0.5, 1.8); c.fill(); }
    else { c.fillStyle = INK; circ(c, ex - 1.5, -2, 2.6); c.fill(); c.fillStyle = '#ffffff'; circ(c, ex - 0.5, -3, 0.9); c.fill(); }
  }
  c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(-2.5, 3); c.lineTo(2.5, 3); c.lineTo(0, 7); c.closePath(); c.fill(); c.stroke();
  c.restore();
  c.restore();
  if (ph === 'green' && !o.done) txt24(c, 'z', x + 18, oy - 16 - (t * 8) % 8, 11, '#5a6aa8', '#ffffff', 2);
  if (ph === 'red' && !o.done) txt24(c, '!', x + 18, oy - 20, 15, '#ff4f5e', '#ffffff', 2);
  if (o.caughtT > 0) txt24(c, 'У-гу!', x, oy - 36, 12, '#a05a2a', '#ffffff', 2);
}

/* ===== Шматочок пазла ===== */
function piecePath(c, x, y, s) {
  c.beginPath(); c.moveTo(x - s, y - s); c.lineTo(x - s * 0.25, y - s); c.arc(x, y - s, s * 0.3, Math.PI, 0); c.lineTo(x + s, y - s);
  c.lineTo(x + s, y - s * 0.25); c.arc(x + s, y, s * 0.3, -Math.PI / 2, Math.PI / 2); c.lineTo(x + s, y + s); c.lineTo(x - s, y + s); c.closePath();
}
function drawPiece(c, p, t) {
  const bob = Math.sin(t * 2.6 + p.x) * 2.5, cols = ['#ff7ab8', '#4cb6ff', '#ffd23f', '#7ed957'];
  c.save(); if (G.pieceHad) c.globalAlpha = 0.5;
  const g = c.createRadialGradient(p.x, p.y + bob, 3, p.x, p.y + bob, 18); g.addColorStop(0, 'rgba(255,255,255,.8)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; circ(c, p.x, p.y + bob, 18); c.fill();
  c.translate(p.x, p.y + bob); c.rotate(Math.sin(t * 1.8 + p.i) * 0.15);
  c.fillStyle = cols[p.i % 4]; c.strokeStyle = INK; c.lineWidth = 1.4; c.lineJoin = 'round'; piecePath(c, -1, 1, 8); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.5)'; ell(c, -4, -3, 3, 1.6, -0.5); c.fill();
  c.restore();
}

/* ===== HUD: сова-світлофор або пазл ===== */
function drawHud36(c, x, top, H) {
  const P = G.P, pcx = P.x + P.w / 2;
  const o = G.owls && G.owls.find(q => !q.done && pcx > q.x0 * T - 2 * T && pcx < q.x1 * T + T);
  if (o) {
    const w = 96, cy = top + H / 2;
    hudPill(c, x, top, w, H);
    const lights = [['red', '#ff4f5e'], ['yellow', '#ffc83a'], ['green', '#4fd06a']];
    lights.forEach(([ph, col], i) => { const cx = x + 18 + i * 24, on = o.ph === ph; c.save(); c.globalAlpha = on ? 1 : 0.22; c.fillStyle = col; circ(c, cx, cy, on ? 9 : 7); c.fill(); if (on) { c.strokeStyle = INK; c.lineWidth = 1.2; c.stroke(); } c.restore(); });
    return true;
  }
  if (G.pieces && G.pieces.length) {
    const w = 64, cy = top + H / 2, cols = ['#ff7ab8', '#4cb6ff', '#ffd23f', '#7ed957'];
    hudPill(c, x, top, w, H);
    for (let i = 0; i < 4; i++) {
      const p = G.pieces[i]; if (!p) continue;
      const px = x + 22 + (i % 2) * 16, py = cy - 8 + Math.floor(i / 2) * 16;
      c.save(); c.fillStyle = p.got || G.pieceHad ? cols[i] : 'rgba(59,31,79,.12)'; c.fillRect(px - 7, py - 7, 15, 15); c.restore();
    }
    c.save(); c.strokeStyle = INK; c.lineWidth = 1; c.strokeRect(x + 15, cy - 15, 31, 31); c.restore();
    if (G.pieceHad || G.pieces.every(p => p.got)) txt24(c, '✓', x + 54, cy, 11, '#3fa35a', '#ffffff', 2);
    return true;
  }
  return false;
}

/* ===== Робот-пилосос Хрумчик ===== */
function drawVacuumBoss(c, B, t) {
  const x = B.x, gy = B.gy, fl = B.flash > 0, choke = B.state === 'choke' && !B.dead, suck = B.state === 'suck' && !B.dead;
  for (const d of B.dust) {
    const k = d.t / d.life;
    c.save(); c.globalAlpha = 0.6 * (1 - k);
    if (d.smoke) { c.fillStyle = '#c8c4d8'; circ(c, d.x, d.y - k * 30, 5 + k * 8); c.fill(); }
    else { const tx = B.x + B.dir * 30, ty = gy - 18, px = d.x + (tx - d.x) * k, py = d.y + (ty - d.y) * k; c.strokeStyle = '#b8c8e8'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(px, py); c.lineTo(px + (d.x - tx) * 0.12, py + (d.y - ty) * 0.12); c.stroke(); }
    c.restore();
  }
  c.save(); c.translate(x, gy); if (B.dir < 0) c.scale(-1, 1);
  const shake = suck ? Math.sin(t * 60) * 0.8 : choke ? Math.sin(t * 25) * 1.5 : 0;
  c.translate(shake, 0); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.6;
  // колеса
  for (const wx of [-14, 12]) { c.save(); c.translate(wx, -7); c.rotate(B.spin); c.fillStyle = '#4a4458'; circ(c, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#c8c4d8'; c.fillRect(-1, -6, 2, 12); c.restore(); }
  // тулуб
  c.fillStyle = fl ? '#ffffff' : choke ? '#c8c4d8' : '#9fd8ff'; rr(c, -24, -46, 44, 38, 10); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.45)'; rr(c, -19, -42, 10, 22, 4); c.fill();
  // екран з очима
  c.fillStyle = '#2a2438'; rr(c, -14, -40, 26, 15, 5); c.fill();
  if (choke) { c.strokeStyle = '#ffd23f'; c.lineWidth = 1.6; for (const ex of [-6, 5]) { c.beginPath(); c.moveTo(ex - 3, -36); c.lineTo(ex + 3, -29); c.moveTo(ex + 3, -36); c.lineTo(ex - 3, -29); c.stroke(); } }
  else { c.fillStyle = suck ? '#ff7a8a' : '#7fffd4'; const blink = (t % 3) < 0.12; for (const ex of [-6, 5]) { if (blink) c.fillRect(ex - 3, -33, 6, 1.6); else { rr(c, ex - 3, -36, 6, 7, 2); c.fill(); } } if (suck) { c.strokeStyle = '#ff7a8a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-10, -39); c.lineTo(-3, -36); c.moveTo(9, -39); c.lineTo(2, -36); c.stroke(); } }
  // антена
  c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-2, -46); c.lineTo(-2, -54); c.stroke(); c.fillStyle = suck ? '#ff4f5e' : '#ffd23f'; circ(c, -2, -56, 3); c.fill(); c.stroke();
  // кнопка на маківці
  c.fillStyle = choke ? '#ff4f5e' : '#ff9fc4'; rr(c, 4, -50, 10, 5, 2); c.fill(); c.stroke();
  // труба-сопло
  c.fillStyle = '#c8c4d8'; c.beginPath(); c.moveTo(18, -26); c.lineTo(30, -20); c.lineTo(30, -6); c.lineTo(18, -10); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = suck ? '#2a2438' : '#6a6478'; ell(c, 31, -13, 3.5 + (suck ? 1.5 : 0), 8 + (suck ? 2 : 0)); c.fill(); c.stroke();
  if (choke) { c.fillStyle = '#ffffff'; circ(c, 33, -13, 3); c.fill(); }
  c.restore();
  if (choke) txt24(c, 'Апчхи!', x, gy - 70 - (B.st * 10) % 6, 11, '#5a6488', '#ffffff', 2);
}
