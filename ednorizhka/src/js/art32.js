'use strict';
/* ===== Частина 33 «Таємниці й погоні»: теми, сонячні й місячні кубики, таємні ходи, хвиля й злива, Панда Бамбуся ===== */
Object.assign(THEMES, {
  sunmoonvale: Object.assign({}, THEMES.meadow, { sky: ['#ffd6a8', '#ffeccc', '#fff8e6'], dots: ['#fff', '#ffe066', '#7f8cff', '#ffb347'] }),
  secretwood: Object.assign({}, THEMES.autumn, { sky: ['#c8e8b0', '#e6f4cc', '#fff6e0'] }),
  wavebeach: Object.assign({}, THEMES.tide, { sky: ['#7fd0f8', '#c0ecff', '#fff3d6'] }),
  nightfair: Object.assign({}, THEMES.circus, { sky: ['#ffc98a', '#ffe0bc', '#fff4e6'] }),
  bamboogrove: Object.assign({}, THEMES.jungle, { sky: ['#b8ecd0', '#dcf7e4', '#fff8dc'] }),
});
// день і ніч: небо темнішає, виходять зорі й місяць
function dnSky(c, viewW, t) {
  const k = typeof G !== 'undefined' && G && G.dnBlocks && G.dnBlocks.length ? G.dnK || 0 : 0;
  if (k < 0.01) return;
  c.save(); c.globalAlpha = k;
  const g = c.createLinearGradient(0, 0, 0, VIEW_H); g.addColorStop(0, 'rgba(18,16,66,.86)'); g.addColorStop(0.7, 'rgba(40,32,104,.6)'); g.addColorStop(1, 'rgba(60,40,120,.35)');
  c.fillStyle = g; c.fillRect(0, 0, viewW + 1, VIEW_H);
  for (let i = 0; i < 28; i++) { const x = (i * 97.3) % (viewW + 10), y = 8 + (i * 53.7) % 130; c.globalAlpha = k * (0.55 + 0.45 * Math.sin(t * 2.2 + i * 1.7)); sparkle(c, x, y, 1.4 + (i % 3) * 0.7, '#fff8d0'); }
  c.globalAlpha = k;
  const mx = viewW * 0.78, my = 52, mg = c.createRadialGradient(mx, my, 6, mx, my, 44); mg.addColorStop(0, 'rgba(255,248,210,.55)'); mg.addColorStop(1, 'rgba(255,248,210,0)');
  c.fillStyle = mg; circ(c, mx, my, 44); c.fill();
  c.fillStyle = '#fff6cc'; circ(c, mx, my, 17); c.fill(); c.fillStyle = '#efe0a8'; circ(c, mx - 5, my - 4, 3.5); c.fill(); circ(c, mx + 6, my + 3, 2.6); c.fill(); circ(c, mx - 1, my + 8, 2); c.fill();
  c.restore();
}
Object.assign(BG2, {
  sunmoonvale: (c, viewW, camX, t) => { drawBackground(c, 'meadow', camX, viewW, t, 0); dnSky(c, viewW, t); },
  secretwood: (c, viewW, camX, t) => drawBackground(c, 'autumn', camX, viewW, t, 0),
  wavebeach: (c, viewW, camX, t) => drawBackground(c, 'tide', camX, viewW, t, 0),
  nightfair: (c, viewW, camX, t) => { drawBackground(c, 'circus', camX, viewW, t, 0); dnSky(c, viewW, t); },
  bamboogrove: (c, viewW, camX, t) => drawBackground(c, 'jungle', camX, viewW, t, 0),
});

/* ===== Сонячні й місячні кубики ===== */
function sunIcon(c, x, y, r) {
  c.strokeStyle = '#ff9f1c'; c.lineWidth = 1.6;
  for (let i = 0; i < 8; i++) { const a = i * TAU / 8; c.beginPath(); c.moveTo(x + Math.cos(a) * (r + 1.5), y + Math.sin(a) * (r + 1.5)); c.lineTo(x + Math.cos(a) * (r + 4), y + Math.sin(a) * (r + 4)); c.stroke(); }
  c.fillStyle = '#ff9f1c'; circ(c, x, y, r); c.fill(); c.fillStyle = '#ffd86a'; circ(c, x - r * 0.25, y - r * 0.25, r * 0.5); c.fill();
}
function moonIcon(c, x, y, r, back) {
  c.fillStyle = '#fff6cc'; circ(c, x, y, r); c.fill();
  c.fillStyle = back; circ(c, x + r * 0.5, y - r * 0.35, r * 0.85); c.fill();
}
function drawDnBlock(c, b, t) {
  const x = b.x * T, y = b.y * T, sun = b.c === 'sun', on = dnSolidC(b.c) && tileAt(b.x, b.y) === 2;
  c.save(); c.lineJoin = 'round';
  if (on) {
    const warn = G.dnLeft < 1 && Math.floor(t * 8) % 2 === 0;
    c.fillStyle = sun ? '#ffd23f' : '#5a64d8'; rr(c, x + 1, y + 1, T - 2, T - 2, 4); c.fill(); c.strokeStyle = INK; c.lineWidth = 1.4; c.stroke();
    c.fillStyle = sun ? '#fff3a0' : '#8f9cff'; rr(c, x + 4, y + 3, T - 8, 3.5, 1.5); c.fill();
    if (sun) sunIcon(c, x + 12, y + 13.5, 3.8); else { moonIcon(c, x + 11, y + 13.5, 5.2, '#5a64d8'); c.fillStyle = '#fff6cc'; starPath(c, x + 18, y + 8, 2.4, 1, 0); c.fill(); }
    if (warn) { c.globalAlpha = 0.45; c.fillStyle = '#ffffff'; rr(c, x + 1, y + 1, T - 2, T - 2, 4); c.fill(); }
  } else {
    c.globalAlpha = 0.5; c.strokeStyle = sun ? '#e0a000' : '#7f8cff'; c.lineWidth = 1.4; c.setLineDash([3, 3]); rr(c, x + 3, y + 3, T - 6, T - 6, 3); c.stroke(); c.setLineDash([]);
    c.globalAlpha = 0.35; if (sun) sunIcon(c, x + 12, y + 12, 3); else moonIcon(c, x + 11, y + 12, 4.4, 'rgba(255,255,255,0)');
  }
  c.restore();
}
function drawWorld32(c, t, vis) {
  if (G.dnBlocks) for (const b of G.dnBlocks) if (vis(b.x * T + 12)) drawDnBlock(c, b, t);
  drawWorld33(c, t, vis);
}
// HUD: сонечко чи місяць і скільки ще триватиме
function drawDnHud(c, x, top, H) {
  const w = 70, cy = top + H / 2, night = G.dnNight, k = Math.max(0, Math.min(1, G.dnLeft / DN_HALF));
  hudPill(c, x, top, w, H, night ? 'rgba(70,72,160,.92)' : 'rgba(255,246,210,.95)');
  const ix = x + 22;
  c.save();
  c.strokeStyle = night ? 'rgba(255,255,255,.25)' : 'rgba(59,31,79,.15)'; c.lineWidth = 3.4; c.beginPath(); c.arc(ix, cy, 14, 0, TAU); c.stroke();
  c.strokeStyle = night ? '#fff6cc' : '#ff9f1c'; c.beginPath(); c.arc(ix, cy, 14, -Math.PI / 2, -Math.PI / 2 + TAU * k); c.stroke();
  if (night) moonIcon(c, ix - 1, cy, 8, 'rgba(70,72,160,1)'); else sunIcon(c, ix, cy, 5.5);
  c.globalAlpha = 0.5; c.fillStyle = night ? '#ffffff' : INK; c.beginPath(); c.moveTo(x + 41, cy - 4); c.lineTo(x + 46, cy); c.lineTo(x + 41, cy + 4); c.closePath(); c.fill();
  c.globalAlpha = 0.75; if (night) sunIcon(c, x + 56, cy, 3.6); else moonIcon(c, x + 55, cy, 6, 'rgba(255,246,210,1)');
  c.restore();
}

/* ===== Над єдиноріжкою: таємні ходи, хвиля чи злива ===== */
function drawOver32(c, P, t) {
  if (G.secrets) for (const s of G.secrets) {
    if ((s.x + s.w) * T < G.cam - 40 || s.x * T > G.cam + viewW + 40 || s.a < 0.02) continue;
    // несправжні плитки малюємо так само, як справжні: у пікселях екрана, щоб не було швів
    const camPx = Math.round(G.cam * ps), by = Math.round(bandY * dpr);
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = s.a;
    for (let i = 0; i < s.w; i++) for (let j = 0; j < s.h; j++) {
      const tx = s.x + i, ty = s.y + j, v = s.tiles[j * s.w + i] || (G.map[ty * G.Wt + tx] ? 1 : 0);
      if (!v) continue;
      const up = j > 0 ? 1 : (ty > 0 ? G.map[(ty - 1) * G.Wt + tx] : 0);
      const kind = v === 2 ? 'block' : (up === 1 || up === 2 || up === 7 || up === 8 || up === 22) ? 'fill' : 'top';
      c.drawImage(tileSprite(G.theme, kind, false, false, ps), Math.round(tx * T * ps) - camPx, by + Math.round(ty * T * ps));
    }
    c.restore();
    if (!s.found) { const k = (t * 0.9 + s.x * 0.37) % 2.2; if (k < 0.7) { const a = 1 - Math.abs(k - 0.35) / 0.35; c.save(); c.globalAlpha = a; sparkle(c, s.x * T + 5, (s.y + s.h - 0.7) * T, 3.4, '#ffffff'); sparkle(c, s.x * T + 9, (s.y + s.h - 1.6) * T, 2.2, '#ffe14d'); c.restore(); } }
  }
  if (G.chases) for (const ch of G.chases) if (ch.state !== 'wait') drawChase(c, ch, t);
}
function waveEyes(c, x, y, t, col) {
  const bl = (t % 3.2) < 0.12;
  c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.4;
  for (const dx of [-24, -6]) { ell(c, x + dx, y, 6, bl ? 1.2 : 7.5); c.fill(); c.stroke(); if (!bl) { c.fillStyle = INK; circ(c, x + dx + 2.5, y + 1, 3); c.fill(); c.fillStyle = '#fff'; circ(c, x + dx + 3.5, y - 0.5, 1); c.fill(); c.fillStyle = '#ffffff'; } }
  c.strokeStyle = col; c.lineWidth = 2.4; c.beginPath(); c.moveTo(x - 32, y - 12); c.lineTo(x - 18, y - 9); c.moveTo(x - 12, y - 9); c.lineTo(x + 1, y - 13); c.stroke();
  c.fillStyle = '#c0306a'; ell(c, x - 15, y + 17, 7, 5 + Math.sin(t * 8) * 1.5); c.fill(); c.strokeStyle = INK; c.lineWidth = 1.3; c.stroke();
}
function drawChase(c, ch, t) {
  const f = ch.front;
  if (ch.state === 'run' && f < G.cam - 4) {
    // хвиля ще за краєм екрана — край світиться, і що ближче, то яскравіше
    const k = Math.max(0, Math.min(1, 1 - (G.cam - f) / (12 * T)));
    if (k <= 0) return;
    c.save(); const g = c.createLinearGradient(G.cam, 0, G.cam + 40, 0), col = ch.kind === 'storm' ? '90,100,150' : '60,150,230';
    g.addColorStop(0, 'rgba(' + col + ',' + (0.35 + 0.3 * k + 0.1 * Math.sin(t * 8)) + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
    c.fillStyle = g; c.fillRect(G.cam, 0, 40, VIEW_H);
    c.globalAlpha = 0.6 + 0.4 * k; txt24(c, '!', G.cam + 12, VIEW_H * 0.45, 18, '#ffffff', ch.kind === 'storm' ? '#5a6488' : '#2f8fd8', 3);
    c.restore(); return;
  }
  if (f < G.cam - 40 || ch.a <= 0) return;
  const x0 = Math.max(G.cam - 20, f - 900);
  c.save(); c.globalAlpha = ch.a; c.lineJoin = 'round';
  if (ch.kind === 'storm') {
    const g = c.createLinearGradient(f - 260, 0, f, 0); g.addColorStop(0, '#4a5478'); g.addColorStop(1, '#7a86a8');
    c.fillStyle = g; c.beginPath(); c.moveTo(x0, VIEW_H); c.lineTo(x0, 0); c.lineTo(f - 20, 0);
    for (let y = 0; y <= 150; y += 25) c.arc(f - 8, y + 12, 14 + Math.sin(y + t * 3) * 2, -Math.PI / 2, Math.PI / 2);
    c.lineTo(f - 30, 165); c.lineTo(x0 + 40, 165); c.lineTo(x0, 165); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 1.6; c.stroke();
    // дощ під хмарою
    c.strokeStyle = 'rgba(150,200,255,.75)'; c.lineWidth = 1.6;
    for (let i = 0; i < 40; i++) { const rx = f - 20 - ((i * 37) % 300), ry = 170 + ((t * 260 + i * 41) % (VIEW_H - 170)); if (rx < x0) continue; c.beginPath(); c.moveTo(rx, ry); c.lineTo(rx - 3, ry + 9); c.stroke(); }
    if (Math.sin(t * 9) > 0.85) { c.fillStyle = '#ffe14d'; c.beginPath(); c.moveTo(f - 60, 160); c.lineTo(f - 74, 190); c.lineTo(f - 64, 190); c.lineTo(f - 78, 226); c.lineTo(f - 52, 184); c.lineTo(f - 62, 184); c.lineTo(f - 50, 160); c.closePath(); c.fill(); c.lineWidth = 1; c.strokeStyle = INK; c.stroke(); }
    waveEyes(c, f - 18, 78, t, '#2a3050');
  } else {
    const g = c.createLinearGradient(f - 260, 0, f, 0); g.addColorStop(0, '#2a7fd0'); g.addColorStop(1, '#5fc4f2');
    c.fillStyle = g; c.beginPath(); c.moveTo(x0, VIEW_H); c.lineTo(x0, 40);
    for (let x = x0; x < f - 40; x += 14) c.lineTo(x, 40 + Math.sin(x * 0.05 + t * 4) * 6);
    c.quadraticCurveTo(f + 4, 18, f + 22, 52); c.quadraticCurveTo(f + 4, 50, f + 6, 74);
    for (let y = 74; y <= VIEW_H; y += 12) c.lineTo(f + Math.sin(y * 0.08 + t * 6) * 5, y);
    c.lineTo(x0, VIEW_H); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 1.6; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.25)'; for (let i = 0; i < 6; i++) { const yy = 90 + i * 30; if (f - 120 > x0) { ell(c, f - 70 - (i % 2) * 40, yy, 26, 3, 0); c.fill(); } }
    c.fillStyle = '#ffffff';
    for (let y = 80; y < VIEW_H; y += 15) { circ(c, f + Math.sin(y * 0.08 + t * 6) * 5 - 1, y, 4.5 + Math.sin(y + t * 9) * 1.4); c.fill(); }
    for (let x = f - 36; x > Math.max(x0, f - 300); x -= 18) { circ(c, x, 40 + Math.sin(x * 0.05 + t * 4) * 6, 4 + Math.sin(x + t * 7)); c.fill(); }
    circ(c, f + 18, 50, 5); c.fill(); circ(c, f + 10, 40, 4); c.fill();
    waveEyes(c, f - 16, 112, t, '#1f5f9f');
  }
  c.restore();
}

/* ===== Панда Бамбуся ===== */
function drawPingBall(c, b) {
  if (b.land != null) { c.save(); c.globalAlpha = 0.25 + 0.15 * Math.sin(b.t * 14); c.fillStyle = INK; ell(c, b.land, 10 * T - 2, 11, 3); c.fill(); c.restore(); }
  pingBall(c, b.x, b.y, b.t);
}
function pingBall(c, x, y, t) {
  c.save(); c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#ffffff'; circ(c, x, y, 7); c.fill(); c.stroke();
  c.strokeStyle = '#ff8a3d'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, 4.6, t * 8, t * 8 + 2.2); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.9)'; circ(c, x - 2.4, y - 2.6, 1.6); c.fill();
  c.restore();
}
function drawPandaBoss(c, B, t) {
  const K = B.flash > 0 ? '#ff9fc4' : '#2a2438', Wc = B.flash > 0 ? '#ffe0ec' : '#ffffff', dizzy = B.state === 'dizzy' && !B.dead;
  for (const k of B.backs) { c.save(); c.globalAlpha = 0.35; c.fillStyle = '#ffb347'; circ(c, k.x - (B.x - k.x) * 0.04, k.y, 9); c.fill(); c.restore(); pingBall(c, k.x, k.y, k.t * 3); }
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.6;
  if (!B.dead && (B.state === 'roll' || (B.state === 'curl' && B.st > 0.3))) {
    // клубочок
    c.translate(B.x, B.gy - 19); c.rotate(B.state === 'roll' ? B.roll : Math.sin(t * 30) * 0.15);
    c.fillStyle = Wc; circ(c, 0, 0, 19); c.fill(); c.stroke();
    c.fillStyle = K; c.beginPath(); c.arc(0, 0, 19, 0.2, 1.4); c.lineTo(0, 0); c.closePath(); c.fill();
    c.beginPath(); c.arc(0, 0, 19, Math.PI + 0.2, Math.PI + 1.4); c.lineTo(0, 0); c.closePath(); c.fill();
    circ(c, 0, 0, 19); c.stroke();
    c.fillStyle = K; circ(c, -8, -13, 5); c.fill(); circ(c, 9, -12, 5); c.fill();
    c.restore();
    if (B.state === 'roll') for (let i = 0; i < 3; i++) { c.save(); c.globalAlpha = 0.5; c.fillStyle = '#e8dcc0'; circ(c, B.x - B.dir * (22 + i * 9), B.gy - 4 - i * 2, 4 - i); c.fill(); c.restore(); }
    return;
  }
  c.translate(B.x, B.gy); if (B.dir < 0) c.scale(-1, 1);
  const sit = B.state === 'sit' || B.dead, bob = B.state === 'walk' ? Math.abs(Math.sin(t * 10)) * 3 : 0, wob = dizzy ? Math.sin(t * 6) * 0.08 : 0;
  c.translate(0, -bob); c.rotate(wob);
  // лапки
  c.fillStyle = K; if (sit) { ell(c, -13, -6, 9, 6, -0.3); c.fill(); c.stroke(); ell(c, 13, -6, 9, 6, 0.3); c.fill(); c.stroke(); }
  else { const st = B.state === 'walk' ? Math.sin(t * 10) * 3 : 0; rr(c, -14 + st, -14, 10, 14, 4); c.fill(); c.stroke(); rr(c, 4 - st, -14, 10, 14, 4); c.fill(); c.stroke(); }
  // тулуб
  c.fillStyle = Wc; ell(c, 0, -26, 21, 19); c.fill(); c.stroke();
  c.fillStyle = K; c.beginPath(); c.moveTo(-19, -34); c.quadraticCurveTo(0, -46, 19, -34); c.quadraticCurveTo(0, -38, -19, -34); c.closePath(); c.fill();
  // задня лапка
  c.fillStyle = K; ell(c, -17, -28, 6, 10, 0.4); c.fill(); c.stroke();
  // передня лапка з ракеткою (або з бамбуком, коли сидить)
  const sw = B.swing > 0 ? -1.2 + (0.3 - B.swing) / 0.3 * 2.2 : B.state === 'toss' ? -0.6 : 0.3;
  c.save(); c.translate(15, -32); c.rotate(sw);
  c.fillStyle = K; ell(c, 6, 0, 10, 6); c.fill(); c.stroke();
  if (sit) { c.fillStyle = '#7fcf5a'; rr(c, 10, -26, 6, 34, 3); c.fill(); c.stroke(); c.strokeStyle = '#4f9a3a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(10, -12); c.lineTo(16, -12); c.moveTo(10, 2); c.lineTo(16, 2); c.stroke(); c.fillStyle = '#9be36a'; ell(c, 20, -24, 7, 3, -0.5); c.fill(); }
  else { c.fillStyle = '#a8683a'; rr(c, 14, -3, 10, 6, 2); c.fill(); c.stroke(); c.fillStyle = '#ff4f5e'; circ(c, 31, 0, 10); c.fill(); c.stroke(); c.fillStyle = '#ff8a95'; circ(c, 28, -3, 3.5); c.fill(); }
  c.restore();
  // м'ячик над лапкою перед подачею
  if (B.state === 'toss') { const k = Math.min(1, B.st / 0.5); pingBall(c, 26, -46 - Math.sin(k * Math.PI) * 26, t); }
  // голова
  c.fillStyle = K; circ(c, -12, -64, 7); c.fill(); c.stroke(); circ(c, 13, -64, 7); c.fill(); c.stroke();
  c.fillStyle = Wc; ell(c, 0, -52, 18, 16); c.fill(); c.stroke();
  c.fillStyle = K; ell(c, -7, -53, 5.5, 7, 0.5); c.fill(); ell(c, 8, -53, 5.5, 7, -0.5); c.fill();
  if (dizzy) {
    c.strokeStyle = '#ffffff'; c.lineWidth = 1.3;
    for (const ex of [-7, 8]) { c.beginPath(); for (let a = 0; a < 9; a += 0.4) { const r = a * 0.42; c.lineTo(ex + Math.cos(a + t * 8) * r, -53 + Math.sin(a + t * 8) * r); } c.stroke(); }
  } else if (B.dead || sit) {
    c.strokeStyle = '#ffffff'; c.lineWidth = 1.6; c.beginPath(); c.arc(-7, -52, 2.6, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); c.beginPath(); c.arc(8, -52, 2.6, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
  } else { c.fillStyle = '#ffffff'; circ(c, -6, -54, 2.4); c.fill(); circ(c, 9, -54, 2.4); c.fill(); c.fillStyle = INK; circ(c, -5.4, -53.6, 1.3); c.fill(); circ(c, 9.6, -53.6, 1.3); c.fill(); }
  c.fillStyle = INK; ell(c, 1, -45, 3, 2); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1.3; c.beginPath();
  if (B.state === 'curl' || B.state === 'roll') { c.arc(1, -40, 2.5, 0, TAU); } else if (sit && !B.dead) { c.moveTo(-3, -41); c.quadraticCurveTo(1, -38 + Math.sin(t * 9) * 1.5, 5, -41); } else { c.moveTo(-4, -42); c.quadraticCurveTo(1, -38, 6, -42); }
  c.stroke();
  c.fillStyle = 'rgba(255,140,180,.5)'; circ(c, -13, -46, 3); c.fill(); circ(c, 14, -46, 3); c.fill();
  c.restore();
  if (dizzy) for (let i = 0; i < 3; i++) { const a = t * 4 + i * TAU / 3; c.save(); c.fillStyle = '#ffe14d'; c.strokeStyle = INK; c.lineWidth = 0.8; starPath(c, B.x + Math.cos(a) * 18, B.gy - 78 + Math.sin(a) * 5, 4.5, 2, a); c.fill(); c.stroke(); c.restore(); }
  if (B.state === 'sit' && !B.dead) txt24(c, 'хрум', B.x + 26, B.gy - 74 - (t * 8) % 8, 9, '#4f9a3a', '#ffffff', 2);
}

/* ===== Декор ===== */
function drawDecor32(c, d, t) {
  const x = d.x, y = d.y;
  if (d.k !== 'bambooS' && d.k !== 'moonflowerS') return drawDecor33(c, d, t);
  if (d.k === 'bambooS') {
    for (const [dx, h] of [[-4, 22], [1, 30], [5, 18]]) {
      c.fillStyle = '#7fcf5a'; c.strokeStyle = INK; c.lineWidth = 0.8; rr(c, x + dx - 1.6, y - h, 3.2, h, 1.2); c.fill(); c.stroke();
      c.strokeStyle = '#4f9a3a'; for (let k = 8; k < h; k += 8) { c.beginPath(); c.moveTo(x + dx - 1.6, y - k); c.lineTo(x + dx + 1.6, y - k); c.stroke(); }
      c.fillStyle = '#9be36a'; ell(c, x + dx + 4, y - h + 2, 4, 1.6, -0.5 + Math.sin(t * 2 + x) * 0.1); c.fill();
    }
  } else if (d.k === 'moonflowerS') {
    c.strokeStyle = '#4f9a3a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 9); c.stroke();
    const night = G && G.dnNight; c.fillStyle = night ? '#8f9cff' : '#ffd23f';
    for (let i = 0; i < 5; i++) { const a = i * TAU / 5 + t * 0.3; ell(c, x + Math.cos(a) * 3, y - 11 + Math.sin(a) * 3, 2.6, 1.8, a); c.fill(); }
    c.fillStyle = night ? '#fff6cc' : '#ff9f1c'; circ(c, x, y - 11, 1.8); c.fill();
  }
}
