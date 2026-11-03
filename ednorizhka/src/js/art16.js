'use strict';
/* ===== Частина 16: Батутне містечко, Футбольне поле, Дзеркальна майстерня, Обсерваторія, Сад Павича ===== */
Object.assign(THEMES, {
  trampoline: { sky: ['#ffd6f0', '#ffe9f6', '#fff6e0'], panel: '#5a1f4f', top: '#9fe08a', topHi: '#c9f5b0', topLo: '#5fb85a', fill: '#ffb3d6', fillLo: '#f28cbc', dots: ['#ffffff', '#ffe066', '#9fe0ff'], block: 'trampblock', ice: false, topStyle: 'grass', dotShape: 'sprinkle' },
  football: { sky: ['#9fd8ff', '#cfeeff', '#f0fbff'], panel: '#1a3a5a', top: '#5fcf5f', topHi: '#9fef8a', topLo: '#3a9a3a', fill: '#b97a4f', fillLo: '#9a6040', dots: ['#d9a273', '#8a5434', '#e6bf8f'], block: 'fieldblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  mirrors: { sky: ['#fff1d6', '#fff8ea', '#fffdf6'], panel: '#4a2a10', top: '#d9a36c', topHi: '#f2c48f', topLo: '#a8743f', fill: '#b8865a', fillLo: '#8a5a30', dots: [], block: 'glassblock', ice: false, topStyle: 'plank', fillStyle: 'planks' },
  observatory: { sky: ['#1a1240', '#2e2370', '#4f3fa0'], panel: '#0d0a24', top: '#c9d2e6', topHi: '#ffffff', topLo: '#8a96b8', fill: '#5a5a8a', fillLo: '#45457a', dots: [], block: 'starblock', ice: false, topStyle: 'snow', fillStyle: 'bricks' },
  peacock: { sky: ['#c9f0e0', '#e6f8f0', '#fffbe8'], panel: '#1a4a3a', top: '#5fcf8a', topHi: '#9fefb0', topLo: '#3a9a5a', fill: '#c98d55', fillLo: '#a8743f', dots: ['#d9a273', '#8a5434', '#e6bf8f'], block: 'peablock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
});
Object.assign(PLANKS, { mirrors: ['#d9a36c', '#a8743f'] });

/* ===== Вороги ===== */
function drawDragonfly(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 0.9;
  const f = Math.sin(t * 40) * 0.4;
  for (const [ox, s] of [[-1, 1], [3, 1], [-1, -1], [3, -1]]) { c.save(); c.translate(ox, -1); c.rotate(s * (0.35 + f)); c.fillStyle = 'rgba(200,240,255,.75)'; ell(c, 0, s * -7, 3.4, 7.5); c.fill(); c.stroke(); c.restore(); }
  c.fillStyle = flash ? '#fff' : '#3fbfa8'; c.lineWidth = 1.1;
  rr(c, -15, -1.8, 14, 3.6, 1.8); c.fill(); c.stroke();
  ell(c, 2, 0, 5, 3.4); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#7fdcff'; circ(c, 8, -0.5, 3.4); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 9.2, -1.4, 1); c.fill();
  c.restore();
}
function drawBunny(c, x, gy, dir, t, air, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.1;
  const fur = flash ? '#fff' : '#f2e6d9';
  c.fillStyle = fur;
  for (const ex of [1, 6]) { c.save(); c.translate(ex, -20); c.rotate((ex - 3) * 0.06 + (air ? -0.3 : Math.sin(t * 3) * 0.08)); ell(c, 0, -6, 2.6, 7); c.fill(); c.stroke(); c.fillStyle = '#ffb3c6'; ell(c, 0, -6, 1.2, 4.6); c.fill(); c.fillStyle = fur; c.restore(); }
  ell(c, -2, -7, 9, 7); c.fill(); c.stroke();
  circ(c, 5, -15, 6); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; circ(c, -10, -8, 3); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 7, -16, 1.1); c.fill();
  c.fillStyle = '#ff7a95'; circ(c, 10.5, -14, 1.2); c.fill();
  c.fillStyle = fur; if (air) { ell(c, -4, -1, 4, 2); c.fill(); c.stroke(); } else { ell(c, 2, -1, 4, 2); c.fill(); c.stroke(); }
  c.restore();
}
function drawEnemy12(c, e, cx, fl) {
  switch (e.k) {
    case 'dragonfly': drawDragonfly(c, cx, e.y + e.h / 2, e.t, e.dir, fl); return true;
    case 'bunny': drawBunny(c, cx, e.y + e.h, e.dir, e.t, e.air, fl); return true;
  }
  return drawEnemy13(c, e, cx, fl);
}

/* ===== Плитки: батут, сонячні двері ===== */
Object.assign(TILE7, { tramp: 1, sunDoor: 1, sunDoorOpen: 1 });
function tileKind12(v, tx, ty) {
  if (v >= 39) return tileKind13(v, tx, ty);
  if (v === 36) return 'tramp';
  if (v === 37) return 'sunDoor';
  return 'sunDoorOpen';
}
function drawTile12(c, kind) {
  c.lineJoin = 'round'; c.lineCap = 'round';
  if (kind === 'tramp') {
    c.fillStyle = '#5a6a9a'; c.fillRect(0, 14, T, T - 14);
    c.strokeStyle = '#c9d2e6'; c.lineWidth = 1.4; c.beginPath(); for (const sx of [5, 12, 19]) { c.moveTo(sx, 8); for (let k = 0; k < 3; k++) c.lineTo(sx + (k % 2 ? 2 : -2), 10 + k * 2); c.lineTo(sx, 15); } c.stroke();
    c.fillStyle = '#4cb6ff'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, -1, 2, T + 2, 6, 3); c.fill(); c.stroke();
    c.fillStyle = '#ff7ab8'; c.fillRect(0, 2.5, T, 1.6);
    c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(2, 4.8, T - 4, 1.2);
  } else if (kind === 'sunDoor') {
    c.fillStyle = '#ffc93d'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, 1, 0, T - 2, T, 2); c.fill(); c.stroke();
    c.strokeStyle = '#d99a1a'; c.lineWidth = 1; c.beginPath(); c.moveTo(T / 2, 0); c.lineTo(T / 2, T); c.stroke();
    c.fillStyle = '#fff3a8'; circ(c, T / 2, T / 2, 4.6); c.fill(); c.strokeStyle = '#d99a1a'; c.stroke();
    c.strokeStyle = '#ff9a3d'; c.lineWidth = 1; c.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; c.moveTo(T / 2 + Math.cos(a) * 6, T / 2 + Math.sin(a) * 6); c.lineTo(T / 2 + Math.cos(a) * 9, T / 2 + Math.sin(a) * 9); } c.stroke();
  } else if (kind === 'sunDoorOpen') {
    c.strokeStyle = 'rgba(217,154,26,.3)'; c.lineWidth = 1; c.setLineDash([2, 3]); rr(c, 1.5, 0.5, T - 3, T - 1, 2); c.stroke(); c.setLineDash([]);
  } else drawTile13(c, kind);
}

/* ===== Футбол ===== */
function drawBall12(c, b) {
  const x = b.x + b.w / 2, y = b.y + b.h / 2;
  c.save(); c.translate(x, y); c.rotate(b.rot); c.strokeStyle = INK; c.lineWidth = 1.3;
  c.fillStyle = '#ffffff'; circ(c, 0, 0, 10); c.fill(); c.stroke();
  c.fillStyle = INK; c.beginPath(); for (let i = 0; i < 5; i++) { const a = i * TAU / 5 - Math.PI / 2; c.lineTo(Math.cos(a) * 3.8, Math.sin(a) * 3.8); } c.closePath(); c.fill();
  c.lineWidth = 0.9; for (let i = 0; i < 5; i++) { const a = i * TAU / 5 - Math.PI / 2; c.beginPath(); c.moveTo(Math.cos(a) * 3.8, Math.sin(a) * 3.8); c.lineTo(Math.cos(a) * 9.6, Math.sin(a) * 9.6); c.stroke(); c.fillStyle = INK; circ(c, Math.cos(a + 0.63) * 8.6, Math.sin(a + 0.63) * 8.6, 1.6); c.fill(); }
  c.restore();
}
function drawGoal(c, g, t) {
  const x0 = g.x0 - 4, x1 = g.x1 - 2, gy = g.gy, top = gy - 72;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 0.8;
  for (let x = x0 + 6; x < x1; x += 6) { c.beginPath(); c.moveTo(x, top); c.lineTo(x + 4, gy); c.stroke(); }
  for (let y = top + 6; y < gy; y += 6) { c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); }
  c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(x0, gy); c.lineTo(x0, top); c.lineTo(x1, top); c.lineTo(x1, gy); c.stroke();
  c.strokeStyle = '#ffffff'; c.lineWidth = 3; c.stroke();
  if (g.scored && g.t < 2.5) {
    c.font = '900 14px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.lineWidth = 3; c.strokeStyle = INK; c.fillStyle = '#ffd23f';
    const y = top - 10 - Math.min(1, g.t * 3) * 8; c.globalAlpha = Math.min(1, (2.5 - g.t) * 2); c.strokeText('ГОЛ!', (x0 + x1) / 2, y); c.fillText('ГОЛ!', (x0 + x1) / 2, y);
  }
  c.restore();
}

/* ===== Дзеркала, сонячні лампи, квіти й промені ===== */
function drawBeams(c, t) {
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  for (const b of G.beams) {
    const p = b.pts; if (p.length < 4) continue;
    c.beginPath(); c.moveTo(p[0], p[1]); for (let i = 2; i < p.length; i += 2) c.lineTo(p[i], p[i + 1]);
    c.strokeStyle = 'rgba(255,150,30,.3)'; c.lineWidth = 9 + Math.sin(t * 6) * 1.5; c.stroke();
    c.strokeStyle = '#ffc93d'; c.lineWidth = 3.6; c.stroke();
    c.strokeStyle = '#fff8d0'; c.lineWidth = 1.2; c.stroke();
    // іскорка біжить уздовж променя
    let len = 0; for (let i = 2; i < p.length; i += 2) len += Math.hypot(p[i] - p[i - 2], p[i + 1] - p[i - 1]);
    let d = (t * 160) % Math.max(1, len);
    for (let i = 2; i < p.length; i += 2) { const sl = Math.hypot(p[i] - p[i - 2], p[i + 1] - p[i - 1]); if (d <= sl) { const k = d / sl; sparkle(c, p[i - 2] + (p[i] - p[i - 2]) * k, p[i - 1] + (p[i + 1] - p[i - 1]) * k, 3, '#ffffff'); break; } d -= sl; }
  }
  c.restore();
}
function drawMirror(c, m, t) {
  const x = m.tx * T + 12, y = m.ty * T + 12, k = m.spin > 0 ? m.spin / 0.25 : 0;
  c.save(); c.translate(x, y);
  c.fillStyle = '#a8743f'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, -2, 6, 4, 6, 1); c.fill(); c.stroke();
  c.rotate((m.d === 1 ? -Math.PI / 4 : Math.PI / 4) + k * Math.PI / 2 * (m.d === 1 ? 1 : -1));
  c.fillStyle = '#c98d55'; c.lineWidth = 1.2; rr(c, -13, -3.6, 26, 7.2, 3); c.fill(); c.stroke();
  const g = c.createLinearGradient(-11, -2, 11, 2); g.addColorStop(0, '#e6f6ff'); g.addColorStop(0.5, '#ffffff'); g.addColorStop(1, '#bfe6ff');
  c.fillStyle = g; rr(c, -11, -2, 22, 4, 2); c.fill();
  c.restore();
  sparkle(c, x + 8, y - 10 + Math.sin(t * 3 + x) * 2, 1.6, '#ffffff');
}
function drawLamp(c, l, t) {
  const x = l.tx * T + 12, y = l.ty * T + 12;
  c.save(); c.translate(x, y); c.lineJoin = 'round';
  c.rotate(Math.atan2(l.dy, l.dx));
  c.fillStyle = '#8a96b8'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, -12, -7, 14, 14, 3); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(2, -9); c.lineTo(12, -11); c.lineTo(12, 11); c.lineTo(2, 9); c.closePath(); c.fill(); c.stroke();
  c.restore();
  c.save(); c.globalAlpha = 0.5 + Math.sin(t * 5) * 0.2; c.fillStyle = '#fff3a8'; circ(c, x - 4 * l.dx, y - 4 * l.dy, 4); c.fill(); c.restore();
}
function drawSunflower(c, s, t) {
  const x = s.tx * T + 12, y = s.ty * T + 12, k = s.on ? Math.min(1, s.t * 3) : 0;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK;
  c.strokeStyle = '#3a9a4a'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y + 12); c.lineTo(x, y + 2); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 0.9;
  if (k > 0) {
    for (let i = 0; i < 10; i++) { const a = i * TAU / 10 + t * 0.5; c.fillStyle = '#ffd23f'; ell(c, x + Math.cos(a) * 6 * k, y - 2 + Math.sin(a) * 6 * k, 4 * k, 2.2 * k, a); c.fill(); c.stroke(); }
    c.fillStyle = '#8a5a30'; circ(c, x, y - 2, 4.6 * k); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, x - 1.5, y - 3, 0.8); c.fill(); circ(c, x + 1.5, y - 3, 0.8); c.fill();
  } else {
    c.fillStyle = '#7fd46a'; c.beginPath(); c.moveTo(x - 5, y + 2); c.quadraticCurveTo(x, y - 12, x + 5, y + 2); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(x - 2, y - 3); c.lineTo(x, y - 8); c.lineTo(x + 2, y - 3); c.closePath(); c.fill();
    sparkle(c, x + 8, y - 8 + Math.sin(t * 4) * 2, 1.6, '#fff3a8');
  }
  c.restore();
}
function drawSwapper(c, w, t) {
  const pulse = 1 + Math.sin(w.t * 4) * 0.08;
  c.save(); c.translate(w.x, w.y);
  const g = c.createRadialGradient(0, 0, 2, 0, 0, 20); g.addColorStop(0, 'rgba(255,255,255,.8)'); g.addColorStop(1, 'rgba(201,182,255,0)'); c.fillStyle = g; circ(c, 0, 0, 20); c.fill();
  c.strokeStyle = '#ffffff'; c.lineWidth = 1.6;
  for (let i = 0; i < 2; i++) { const a = w.t * 2 + i * Math.PI; c.beginPath(); c.arc(0, 0, 14, a, a + 1.9); c.stroke(); const ex = Math.cos(a + 1.9) * 14, ey = Math.sin(a + 1.9) * 14; c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex + Math.cos(a + 1.9 + 2.3) * 4, ey + Math.sin(a + 1.9 + 2.3) * 4); c.stroke(); }
  c.scale(pulse, pulse); c.fillStyle = '#c9b6ff'; c.strokeStyle = INK; c.lineWidth = 1.2; starPath(c, 0, 0, 9, 4, w.t * 0.8); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, -2.5, -1, 0.9); c.fill(); circ(c, 2.5, -1, 0.9); c.fill();
  c.restore();
}
function drawWorld12(c, t, vis) {
  for (const g of G.goals) if (vis(g.x0, 80)) drawGoal(c, g, t);
  if (G.beams.length) drawBeams(c, t);
  for (const l of G.lamps) if (vis(l.tx * T)) drawLamp(c, l, t);
  for (const m of G.mirrors) if (vis(m.tx * T)) drawMirror(c, m, t);
  for (const s of G.suns) if (vis(s.tx * T)) drawSunflower(c, s, t);
  for (const w of G.swappers) if (vis(w.x)) drawSwapper(c, w, t);
  for (const b of G.balls12) if (vis(b.x)) drawBall12(c, b);
}

/* ===== Павич Пишнохвіст ===== */
function drawPeacockBoss(c, B, t) {
  const st = B.state, flash = B.flash > 0, happy = B.dead, d = B.dir || 1;
  const blue = flash ? '#fff' : '#3f7fd9', teal = '#2fb8a8', fan = st === 'fan' || happy, admire = st === 'admire';
  c.save(); c.translate(B.x, B.fy); c.scale(d, 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  const eye = (x, y, s) => { c.fillStyle = '#ffd23f'; ell(c, x, y, 4.6 * s, 5.6 * s); c.fill(); c.fillStyle = teal; ell(c, x, y, 3.2 * s, 4 * s); c.fill(); c.fillStyle = '#1f3f8a'; ell(c, x, y + 0.6 * s, 1.8 * s, 2.4 * s); c.fill(); };
  if (fan) {
    const open = st === 'fan' ? Math.min(1, B.st * 4) : 1;
    for (let i = 0; i < 13; i++) {
      const a = -Math.PI + (i + 0.5) / 13 * Math.PI, r = 58 * (0.5 + 0.5 * open);
      c.save(); c.translate(-6, -34); c.rotate(a + Math.PI / 2);
      c.fillStyle = '#4fbf6a'; ell(c, 0, -r / 2, 7, r / 2); c.fill(); c.lineWidth = 0.8; c.stroke();
      eye(0, -r + 7, 1);
      if (!happy && i % 4 === 1) { c.fillStyle = '#ffd23f'; starPath(c, 0, -r - 4, 4, 1.8, t * 2 + i); c.fill(); c.lineWidth = 0.6; c.stroke(); }
      c.restore();
    }
  } else {
    // складений хвіст тягнеться позаду
    c.fillStyle = '#4fbf6a'; c.beginPath(); c.moveTo(-6, -26); c.quadraticCurveTo(-34, -24, -56, -6); c.lineTo(-52, 0); c.quadraticCurveTo(-30, -6, -4, -14); c.closePath(); c.fill(); c.stroke();
    eye(-44, -7, 0.8); eye(-30, -13, 0.8); eye(-18, -17, 0.7);
    if (!happy) for (const [sx, sy] of [[-50, -14], [-36, -20]]) { c.fillStyle = '#ffd23f'; starPath(c, sx, sy, 3.6, 1.6, t * 2 + sx); c.fill(); c.lineWidth = 0.6; c.stroke(); c.lineWidth = 1.4; }
  }
  // ноги
  c.strokeStyle = '#8a96b8'; c.lineWidth = 2.2;
  const step = st === 'strut' ? Math.sin(t * 8) * 3 : 0;
  c.beginPath(); c.moveTo(-3, -12); c.lineTo(-3 + step, 0); c.moveTo(4, -12); c.lineTo(4 - step, 0); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.4;
  // тулуб
  c.fillStyle = blue; ell(c, 0, -22, 13, 13); c.fill(); c.stroke();
  // шия й голова
  const peck = st === 'peck' && B.st > 0.45 && B.st < 0.8, lean = st === 'peck' && B.st <= 0.45;
  const hx = peck ? 22 : lean ? 2 : 8, hy = peck ? -32 : lean ? -48 : -50;
  c.fillStyle = blue; c.beginPath(); c.moveTo(2, -32); c.quadraticCurveTo(hx - 2, (hy - 32) / 2 - 8, hx - 3, hy + 4); c.lineTo(hx + 4, hy + 4); c.quadraticCurveTo(hx + 4, (hy - 32) / 2, 10, -28); c.closePath(); c.fill(); c.stroke();
  circ(c, hx, hy, 7); c.fill(); c.stroke();
  c.strokeStyle = blue; c.lineWidth = 1.2; for (const k of [-1, 0, 1]) { c.beginPath(); c.moveTo(hx + k * 2, hy - 6); c.lineTo(hx + k * 4, hy - 14); c.stroke(); c.fillStyle = teal; circ(c, hx + k * 4, hy - 14, 1.8); c.fill(); }
  c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#ffffff'; ell(c, hx + 2, hy - 1, 3.4, 2.6); c.fill();
  if (admire || happy) { c.beginPath(); c.arc(hx + 2.4, hy - 0.5, 2, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); }
  else { c.fillStyle = INK; circ(c, hx + 3, hy - 1, 1.3); c.fill(); c.lineWidth = 1.4; c.beginPath(); c.moveTo(hx - 1, hy - 4.5); c.lineTo(hx + 5, hy - 3.5); c.stroke(); }
  c.fillStyle = '#ffb347'; c.lineWidth = 1; c.beginPath(); c.moveTo(hx + 6, hy - 1); c.lineTo(hx + 12, hy + 1); c.lineTo(hx + 6, hy + 3); c.closePath(); c.fill(); c.stroke();
  if (admire) {
    // дзеркальце в крилі
    c.strokeStyle = '#c98d55'; c.lineWidth = 2; c.beginPath(); c.moveTo(10, -20); c.lineTo(hx + 12, hy + 10); c.stroke();
    c.fillStyle = '#e6f6ff'; c.strokeStyle = '#c98d55'; c.lineWidth = 2.4; circ(c, hx + 16, hy + 4, 6); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.9)'; ell(c, hx + 14, hy + 2, 2, 1.2, -0.6); c.fill();
  }
  c.fillStyle = flash ? '#fff' : '#2f5fb0'; c.strokeStyle = INK; c.lineWidth = 1.2; ell(c, -4, -22, 8, 6, 0.3); c.fill(); c.stroke();
  c.restore();
  if (admire) { c.save(); c.font = '900 10px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.lineWidth = 2.4; c.strokeStyle = INK; c.fillStyle = '#fff'; const k = (t * 0.6) % 1; c.globalAlpha = 1 - k; c.strokeText('ах, який красень!', B.x, B.fy - 78 - k * 12); c.fillText('ах, який красень!', B.x, B.fy - 78 - k * 12); c.restore(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, B.fy - 96 - k * 30, 9); c.fillStyle = ['#ff7ab8', '#ffd23f', '#ff5c8a'][i]; c.fill(); c.restore(); }
}
function drawFeatherBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(Math.atan2(b.vy, b.vx)); c.lineJoin = 'round';
  c.fillStyle = '#4fbf6a'; c.strokeStyle = INK; c.lineWidth = 0.9; ell(c, -3, 0, 9, 3.4); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; ell(c, 4, 0, 3.2, 2.6); c.fill(); c.fillStyle = '#2fb8a8'; ell(c, 4, 0, 2, 1.7); c.fill(); c.fillStyle = '#1f3f8a'; circ(c, 4.3, 0, 0.9); c.fill();
  c.strokeStyle = '#3a9a4a'; c.beginPath(); c.moveTo(-14, 0); c.lineTo(-6, 0); c.stroke();
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock13(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'trampblock') {
    rr(c, 1, 1, T - 2, T - 2, 7); c.fillStyle = '#ff9fd0'; c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, 8, 7, 4, 2.4, -0.4); c.fill();
    c.strokeStyle = '#ff7ab8'; c.lineWidth = 1; c.beginPath(); c.moveTo(12, 3); c.lineTo(12, T - 3); c.moveTo(3, 12); c.lineTo(T - 3, 12); c.stroke();
  } else if (b === 'fieldblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#ffffff'; c.fill(); c.stroke();
    c.fillStyle = INK; c.beginPath(); for (let i = 0; i < 5; i++) { const a = i * TAU / 5 - Math.PI / 2; c.lineTo(12 + Math.cos(a) * 5, 12 + Math.sin(a) * 5); } c.closePath(); c.fill();
  } else if (b === 'glassblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#d6f0ff'; c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.8)'; c.beginPath(); c.moveTo(4, 4); c.lineTo(12, 4); c.lineTo(4, 14); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(76,182,255,.5)'; c.lineWidth = 1; rr(c, 4, 4, T - 8, T - 8, 2); c.stroke();
  } else if (b === 'starblock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#4a3a8e'; c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; starPath(c, 12, 12, 6, 2.6, 0); c.fill(); c.lineWidth = 0.8; c.stroke();
    c.fillStyle = '#ffffff'; circ(c, 6, 6, 0.9); c.fill(); circ(c, 18, 17, 0.9); c.fill();
  } else if (b === 'peablock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#3f7fd9'; c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; ell(c, 12, 12, 6, 7); c.fill(); c.fillStyle = '#2fb8a8'; ell(c, 12, 12, 4, 5); c.fill(); c.fillStyle = '#1f3f8a'; ell(c, 12, 12.6, 2.2, 3); c.fill();
  } else return drawBlock14(c, b);
  return true;
}

/* ===== Декор ===== */
function drawDecor16(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'ballS':
      c.fillStyle = d.c || '#ff7ab8'; circ(c, x, y - 6, 6); c.fill(); c.stroke();
      c.strokeStyle = '#ffffff'; c.lineWidth = 1.4; c.beginPath(); c.arc(x, y - 6, 4, -2.4, -0.8); c.stroke();
      break;
    case 'cornerflag':
      c.strokeStyle = '#ffffff'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 22); c.stroke();
      c.fillStyle = d.c || '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x, y - 22); c.lineTo(x + 10 + Math.sin(t * 5 + x) * 1.5, y - 18); c.lineTo(x, y - 14); c.closePath(); c.fill(); c.stroke();
      break;
    case 'jar':
      c.fillStyle = 'rgba(214,240,255,.85)'; rr(c, x - 5, y - 13, 10, 13, 3); c.fill(); c.stroke();
      c.fillStyle = d.c || '#ffd23f'; circ(c, x, y - 5, 2.4); c.fill(); sparkle(c, x, y - 5, 2, '#ffffff');
      c.fillStyle = '#c98d55'; rr(c, x - 4, y - 15, 8, 3, 1); c.fill(); c.stroke();
      break;
    case 'telescopeS':
      c.strokeStyle = '#8a96b8'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 4, y - 10); c.moveTo(x, y); c.lineTo(x + 4, y - 10); c.stroke();
      c.save(); c.translate(x, y - 11); c.rotate(-0.6); c.fillStyle = '#c9b6ff'; c.strokeStyle = INK; c.lineWidth = 0.8; rr(c, -8, -3, 16, 6, 2); c.fill(); c.stroke(); c.fillStyle = '#ffd23f'; rr(c, 6, -3.6, 3, 7.2, 1); c.fill(); c.stroke(); c.restore();
      break;
    case 'featherS':
      c.save(); c.translate(x, y - 10); c.rotate(-0.25 + Math.sin(t * 2 + x) * 0.08);
      c.strokeStyle = '#3a9a4a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, 10); c.lineTo(0, -6); c.stroke();
      c.fillStyle = '#4fbf6a'; c.strokeStyle = INK; c.lineWidth = 0.7; ell(c, 0, -4, 3.6, 8); c.fill(); c.stroke();
      c.fillStyle = '#ffd23f'; ell(c, 0, -8, 2.2, 2.6); c.fill(); c.fillStyle = '#1f3f8a'; circ(c, 0, -8, 1); c.fill();
      c.restore();
      break;
    default: drawDecor17(c, d, t);
  }
}

/* ===== Фони ===== */
function bgTrampoline(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 210 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 36 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.9)'); }
  const span = 260;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 40, cols = ['#ffb3d6', '#9fe0ff', '#ffe08a'], k = ((i + Math.floor(camX * 0.25 / span)) % 3 + 3) % 3;
    c.fillStyle = cols[k]; c.fillRect(wx, 140, 110, 70);
    for (let j = 0; j < 4; j++) { c.fillRect(wx + j * 32, 120, 18, 22); c.beginPath(); c.arc(wx + j * 32 + 9, 120, 9, Math.PI, 0); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,.45)'; for (let j = 0; j < 3; j++) c.fillRect(wx + 14 + j * 32, 150, 8, 50);
    const bx = wx + 170, by = 80 + Math.sin(t * 1.5 + i) * 10; c.strokeStyle = 'rgba(90,60,90,.5)'; c.lineWidth = 1; c.beginPath(); c.moveTo(bx, by + 12); c.lineTo(bx + 3, by + 50); c.stroke(); c.fillStyle = RAINBOW[(k * 2 + 1) % 6]; ell(c, bx, by, 9, 12); c.fill();
  }
  hill(c, viewW, 212, 6, 0.03, 1.2, camX * 0.4, '#c9f5b0');
}
function bgFootball(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  c.fillStyle = '#8a9ac8'; c.fillRect(0, 110, viewW, 70);
  const R = rng(17), span = 400;
  for (let row = 0; row < 5; row++) {
    c.fillStyle = row % 2 ? '#7a8ab8' : '#6a7aa8'; c.fillRect(0, 112 + row * 14, viewW, 12);
    for (let i = 0; i < 70; i++) { const x = wrapX(i * 13 + row * 7 - camX * 0.2, viewW + 20) - 10; c.fillStyle = ['#ff7ab8', '#ffd23f', '#ffffff', '#4cb6ff', '#7fd46a'][(i + row * 3) % 5]; circ(c, x, 116 + row * 14 + Math.sin(t * 6 + i + row) * (i % 4 === 0 ? 1.5 : 0), 3); c.fill(); }
  }
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.2, span) + 80; c.strokeStyle = '#ffffff'; c.lineWidth = 2; c.beginPath(); c.moveTo(wx, 110); c.lineTo(wx, 70); c.stroke(); c.fillStyle = RAINBOW[((i % 6) + 6) % 6]; c.beginPath(); c.moveTo(wx, 70); c.lineTo(wx + 18 + Math.sin(t * 4 + i) * 2, 76); c.lineTo(wx, 82); c.closePath(); c.fill(); }
  c.fillStyle = '#7fd46a'; c.fillRect(0, 180, viewW, VIEW_H - 180);
  c.fillStyle = 'rgba(255,255,255,.12)'; for (let i = -1; i < viewW / 60 + 2; i++) { const wx = i * 60 + wrapX(-camX * 0.5, 120); c.fillRect(wx, 180, 30, VIEW_H - 180); }
  void R;
}
function bgMirrors(c, viewW, camX, t) {
  const span = 220;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span) + 30;
    c.fillStyle = '#e8c89a'; c.fillRect(wx - 6, 40, 92, 110);
    c.fillStyle = '#bfe6ff'; c.fillRect(wx, 46, 80, 98);
    c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.moveTo(wx + 6, 52); c.lineTo(wx + 30, 52); c.lineTo(wx + 6, 90); c.closePath(); c.fill();
    c.fillStyle = '#e8c89a'; c.fillRect(wx + 37, 46, 6, 98); c.fillRect(wx, 92, 80, 6);
    c.save(); c.globalAlpha = 0.18 + Math.sin(t + i) * 0.04; c.fillStyle = '#fff3a8'; c.beginPath(); c.moveTo(wx, 46); c.lineTo(wx + 80, 46); c.lineTo(wx + 150, VIEW_H); c.lineTo(wx + 40, VIEW_H); c.closePath(); c.fill(); c.restore();
    c.fillStyle = '#c98d55'; c.fillRect(wx + 110, 120, 90, 6);
    for (let k = 0; k < 4; k++) { c.fillStyle = ['rgba(255,159,208,.8)', 'rgba(159,224,255,.8)', 'rgba(255,224,138,.8)', 'rgba(201,182,255,.8)'][k]; rr(c, wx + 116 + k * 21, 100 - (k % 2) * 6, 12, 20 + (k % 2) * 6, 3); c.fill(); }
  }
}
function bgObservatory(c, viewW, camX, t) {
  const R = rng(29);
  for (let i = 0; i < 60; i++) { const x = wrapX(R() * 1500 - camX * 0.04, viewW + 20) - 10, y = R() * 170, tw = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.3); c.fillStyle = `rgba(255,250,230,${0.3 + tw * 0.6})`; circ(c, x, y, 0.6 + R() * 1.1); c.fill(); }
  const px = wrapX(viewW * 0.25 - camX * 0.03, viewW + 200) - 100; c.fillStyle = '#ffb36a'; circ(c, px, 60, 16); c.fill(); c.strokeStyle = 'rgba(255,230,180,.8)'; c.lineWidth = 2.4; ell(c, px, 60, 28, 6, -0.3); c.stroke();
  c.fillStyle = '#9fe0ff'; circ(c, viewW * 0.82, 40, 7); c.fill();
  const span = 360;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span) + 100;
    c.fillStyle = '#3a2f70'; c.fillRect(wx - 50, 150, 100, 70); c.beginPath(); c.arc(wx, 150, 50, Math.PI, 0); c.fill();
    c.fillStyle = '#2a2058'; c.fillRect(wx - 6, 100, 12, 50);
    c.save(); c.translate(wx, 118); c.rotate(-0.7 + Math.sin(t * 0.3 + i) * 0.1); c.fillStyle = '#6a5ad9'; rr(c, -6, -40, 12, 44, 4); c.fill(); c.restore();
    c.fillStyle = 'rgba(255,240,170,.7)'; for (let k = 0; k < 3; k++) c.fillRect(wx - 36 + k * 28, 170, 12, 16);
  }
}
function bgPeacock(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 240 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 2) * 20, 0.85, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 186, 10, 0.012, 0.5, camX * 0.12, '#bfeccf');
  const span = 150;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 20;
    c.fillStyle = '#5fbf7a'; rr(c, wx, 170, 60, 40, 14); c.fill();
    c.save(); c.translate(wx + 100, 200);
    for (let k = 0; k < 7; k++) { const a = -Math.PI + (k + 0.5) / 7 * Math.PI; c.save(); c.rotate(a + Math.PI / 2); c.fillStyle = 'rgba(79,191,106,.55)'; ell(c, 0, -22, 5, 22); c.fill(); c.fillStyle = 'rgba(255,210,63,.7)'; ell(c, 0, -40, 3.4, 4); c.fill(); c.fillStyle = 'rgba(31,63,138,.6)'; circ(c, 0, -40, 1.6); c.fill(); c.restore(); }
    c.restore();
  }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#9fe0b0');
}
Object.assign(BG2, { trampoline: bgTrampoline, football: bgFootball, mirrors: bgMirrors, observatory: bgObservatory, peacock: bgPeacock });
