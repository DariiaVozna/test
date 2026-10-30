'use strict';
/* ===== Частина 12: Курячий хутір, Ярмарок, Гарбузова ніч, Кубикове місто, Котяче горище ===== */
Object.assign(THEMES, {
  farm: { sky: ['#9fd8ff', '#d6f0ff', '#fff5c8'], panel: '#4a3a20', top: '#7fd46a', topHi: '#b0ef9a', topLo: '#4f9a48', fill: '#b97a4f', fillLo: '#9a6040', dots: ['#d9a273', '#8a5434', '#e6bf8f'], block: 'hay', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  fair: { sky: ['#ffc9e4', '#ffe6f0', '#fff6dc'], panel: '#5a1f4a', top: '#c98d55', topHi: '#e3b07a', topLo: '#8a5a30', fill: '#fff3e0', fillLo: '#9fd8ff', dots: [], block: 'fairbox', ice: false, topStyle: 'plank', fillStyle: 'stripes' },
  pumpkin: { sky: ['#1d1340', '#3a2470', '#6a3a8e'], panel: '#140a2a', top: '#5f9a4a', topHi: '#8fcf6a', topLo: '#3f6a30', fill: '#4a3058', fillLo: '#3a2448', dots: ['#5b4777', '#6e5a8c', '#ffb347'], block: 'jackblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  bricks: { sky: ['#bfe8ff', '#e6f7ff', '#fffbe6'], panel: '#2a3a6a', top: '#54d68c', topHi: '#9ff0c4', topLo: '#2fa66a', fill: '#ffe08a', fillLo: '#ffd23f', dots: [], block: 'toyblock', ice: false, topStyle: 'stone', fillStyle: 'checker' },
  attic: { sky: ['#e9c9a0', '#f2dcc0', '#fff0dc'], panel: '#4a2a1a', top: '#c98d55', topHi: '#e3b07a', topLo: '#8a5a30', fill: '#a8743f', fillLo: '#8a5a30', dots: [], block: 'trunk', ice: false, topStyle: 'plank', fillStyle: 'planks' },
});
Object.assign(PLANKS, { fair: ['#ff9fd0', '#e0608f'], pumpkin: ['#8a6a9a', '#5a3a6a'], attic: ['#d9a86c', '#a8743f'] });
const BRICK_COLS = [['#ff5c7a', '#ffa0b0'], ['#4cb6ff', '#a8dcff'], ['#ffd23f', '#fff0a0'], ['#54d68c', '#a8f0c8']];

/* ===== Вороги ===== */
function drawGoose(c, x, gy, dir, t, state, flash) {
  const run = state === 'run', honk = state === 'honk';
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = '#ff9a3d'; c.lineWidth = 2;
  const st = run ? Math.sin(t * 22) * 4 : state === 'walk' ? Math.sin(t * 8) * 2 : 0;
  c.beginPath(); c.moveTo(-2, -6); c.lineTo(-2 + st, 0); c.moveTo(4, -6); c.lineTo(4 - st, 0); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = flash ? '#fff' : '#ffffff';
  c.beginPath(); c.moveTo(-13, -12); c.quadraticCurveTo(-14, -4, -4, -4); c.lineTo(8, -4); c.quadraticCurveTo(13, -6, 11, -12); c.quadraticCurveTo(4, -18, -6, -16); c.lineTo(-15, -18); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#e6ebf5'; c.beginPath(); c.moveTo(-8, -13); c.quadraticCurveTo(0, -16, 5, -10); c.quadraticCurveTo(-2, -8, -8, -13); c.fill();
  // шия: витягується, коли гусак біжить
  const nx = run || honk ? 12 : 8, ny = run ? -14 : -24;
  c.strokeStyle = INK; c.lineWidth = 6.4; c.beginPath(); c.moveTo(6, -12); c.quadraticCurveTo(10, -16, nx, ny); c.stroke();
  c.strokeStyle = '#fff'; c.lineWidth = 4.2; c.stroke();
  c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 1.1; circ(c, nx + 1, ny - 2, 4.4); c.fill(); c.stroke();
  c.fillStyle = '#ff9a3d'; c.beginPath(); c.moveTo(nx + 4, ny - 3.4); c.lineTo(nx + (honk ? 11 : 10), ny - (honk ? 4.6 : 2)); c.lineTo(nx + 4, ny + 0.4); c.closePath(); c.fill(); c.stroke();
  if (honk) { c.beginPath(); c.moveTo(nx + 4, ny - 1.4); c.lineTo(nx + 10, ny + 1.6); c.stroke(); }
  c.fillStyle = INK; circ(c, nx + 2, ny - 3, 1.1); c.fill();
  if (run) { c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(nx - 0.6, ny - 5.6); c.lineTo(nx + 3.4, ny - 4.4); c.stroke(); }
  c.restore();
  if (honk) { c.save(); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 2.2; c.font = '900 9px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.strokeText('Га-га!', x + dir * 18, gy - 34); c.fillText('Га-га!', x + dir * 18, gy - 34); c.restore(); }
}
function drawTop(c, x, gy, t, flash) {
  c.save(); c.translate(x, gy); c.rotate(Math.sin(t * 5) * 0.12); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(0, 0); c.lineTo(-11, -10); c.quadraticCurveTo(0, -19, 11, -10); c.closePath();
  c.fillStyle = flash ? '#fff' : '#ff7ab8'; c.fill();
  c.save(); c.clip(); const sh = (t * 40) % 8;
  for (let i = -3; i < 4; i++) { c.fillStyle = i % 2 ? '#ffd23f' : '#4cb6ff'; c.beginPath(); c.moveTo(i * 8 - sh, -20); c.lineTo(i * 8 + 4 - sh, -20); c.lineTo(0, 0); c.closePath(); c.fill(); }
  c.restore(); c.stroke();
  c.fillStyle = '#c98d55'; rr(c, -1.6, -22, 3.2, 6, 1.4); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, -3, -10, 2.2); c.fill(); circ(c, 3, -10, 2.2); c.fill();
  const lx = Math.sin(t * 9) * 0.8; c.fillStyle = INK; circ(c, -3 + lx, -10, 1.1); c.fill(); circ(c, 3 + lx, -10, 1.1); c.fill();
  c.beginPath(); c.arc(0, -7, 2, 0.1 * Math.PI, 0.9 * Math.PI); c.lineWidth = 1; c.stroke();
  c.restore();
  c.strokeStyle = 'rgba(59,31,79,.35)'; c.lineWidth = 1; for (let i = 0; i < 2; i++) { const a = t * 9 + i * Math.PI; c.beginPath(); c.arc(x, gy - 10, 15, a, a + 0.8); c.stroke(); }
}
function drawBoo(c, x, y, t, dir, shy, flash) {
  c.save(); c.translate(x, y); c.globalAlpha = shy ? 0.7 : 0.95; c.lineJoin = 'round';
  c.fillStyle = flash ? '#ffe0f0' : '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(-12, 8); c.quadraticCurveTo(-14, -12, 0, -12); c.quadraticCurveTo(14, -12, 12, 8);
  for (let i = 0; i < 4; i++) { const wx = 12 - (i + 1) * 6; c.quadraticCurveTo(wx + 3, 12 + Math.sin(t * 6 + i) * 2, wx, 8); }
  c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,150,190,.55)'; circ(c, -6, 2, 2.4); c.fill(); circ(c, 6, 2, 2.4); c.fill();
  if (shy) {
    // закрив очі ручками
    c.fillStyle = '#fff'; c.strokeStyle = INK;
    for (const s of [-1, 1]) { ell(c, s * 4.6, -3, 4.6, 3.2, s * 0.3); c.fill(); c.stroke(); }
    c.beginPath(); c.arc(0, 4, 1.6, 0, Math.PI); c.stroke();
  } else {
    c.save(); c.scale(dir, 1);
    c.fillStyle = INK; ell(c, 1, -3, 2, 3); c.fill(); ell(c, 7, -3, 2, 3); c.fill();
    c.fillStyle = '#fff'; circ(c, 1.6, -4.2, 0.8); c.fill(); circ(c, 7.6, -4.2, 0.8); c.fill();
    c.fillStyle = '#ff7a95'; c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.arc(4, 3, 3, 0, Math.PI); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#fff'; c.strokeStyle = INK; for (const s of [-1, 1]) { ell(c, s * 13 - 2, 2, 3.4, 2.4, s * 0.6); c.fill(); c.stroke(); }
    c.restore();
  }
  c.restore();
}
function drawEnemy8(c, e, cx, fl) {
  switch (e.k) {
    case 'goose': drawGoose(c, cx, e.y + e.h, e.dir, e.t, e.state, fl); return true;
    case 'top': drawTop(c, cx, e.y + e.h, e.t, fl); return true;
    case 'boo': drawBoo(c, cx, e.y + e.h / 2, e.t, e.dir, e.shy, fl); return true;
  }
  return drawEnemy9(c, e, cx, fl);
}

/* ===== Плитки: колючки й кубики ===== */
Object.assign(TILE7, { thorn: 1, brick0: 1, brick1: 1, brick2: 1, brick3: 1, box: 1 });
function tileKind8(v, tx, ty) {
  if (v >= 24) return tileKind9(v);
  if (v === 22) return 'thorn';
  return G.theme === 'attic' ? 'box' : 'brick' + (((tx || 0) + (ty || 0) * 2) % 4);
}
function drawTile8(c, kind) {
  c.lineJoin = 'round'; c.lineCap = 'round';
  if (kind === 'thorn') {
    const th = THEMES[G.theme] || THEMES.pumpkin, attic = G.theme === 'attic';
    c.fillStyle = th.fill; c.fillRect(0, 8, T, T - 8);
    if (attic) {
      c.fillStyle = '#ff5c7a'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, 0.5, 8, T - 1, 10, 5); c.fill(); c.stroke();
      c.strokeStyle = '#ffa0b0'; c.lineWidth = 1; c.beginPath(); c.moveTo(4, 13); c.lineTo(T - 4, 13); c.stroke();
      for (const [px, h, col] of [[5, 9, '#4cb6ff'], [12, 11, '#ffd23f'], [19, 8, '#54d68c']]) {
        c.strokeStyle = '#c9d2e6'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(px, 10); c.lineTo(px + 1, 10 - h); c.stroke();
        c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 0.8; circ(c, px + 1, 10 - h, 2.2); c.fill(); c.stroke();
      }
    } else {
      c.fillStyle = '#3f6a30'; c.strokeStyle = INK; c.lineWidth = 1.1;
      c.beginPath(); c.moveTo(0, 12);
      for (let i = 0; i < 4; i++) { const x0 = i * 6; c.lineTo(x0 + 1.5, 2 + (i % 2) * 2); c.lineTo(x0 + 3, 8); c.lineTo(x0 + 4.5, 1 + ((i + 1) % 2) * 3); c.lineTo(x0 + 6, 10); }
      c.lineTo(T, 12); c.lineTo(T, 14); c.lineTo(0, 14); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#b48cff'; for (const px of [6, 18]) { circ(c, px, 4, 2.2); c.fill(); c.stroke(); }
      c.fillStyle = '#8fcf6a'; c.fillRect(0, 12, T, 2.4);
    }
  } else if (kind === 'box') {
    c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = '#d9a86a'; c.fill(); c.stroke();
    c.fillStyle = '#f2d6a8'; c.fillRect(T / 2 - 3, 1.5, 6, T - 3);
    c.strokeStyle = '#a8743f'; c.lineWidth = 1; c.beginPath(); c.moveTo(3, 8); c.lineTo(8, 4); c.moveTo(T - 3, 16); c.lineTo(T - 8, 20); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(3, 3, 5, 1.4);
  } else if (kind.slice(0, 5) === 'brick') {
    const col = BRICK_COLS[+kind[5]];
    c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, 1, 4, T - 2, T - 5, 3); c.fillStyle = col[0]; c.fill(); c.stroke();
    for (const sx of [7, 17]) { c.fillStyle = col[0]; rr(c, sx - 3.6, 0.8, 7.2, 4.4, 1.6); c.fill(); c.stroke(); c.fillStyle = col[1]; c.fillRect(sx - 2.4, 1.6, 2, 1.6); }
    c.fillStyle = col[1]; c.globalAlpha = 0.7; c.fillRect(3.5, 6.5, T - 7, 2); c.globalAlpha = 1;
    c.fillStyle = 'rgba(59,31,79,.18)'; c.fillRect(3, T - 5, T - 6, 2);
  } else drawTile9(c, kind);
}

/* ===== Курчатка й курник ===== */
function drawChick(c, x, gy, dir, t, air, s) {
  s = s || 1;
  c.save(); c.translate(x, gy); c.scale(dir * s, s); c.lineJoin = 'round'; c.lineCap = 'round';
  const hop = air ? 0 : Math.abs(Math.sin(t * 7)) * 1.2;
  c.strokeStyle = '#ff9a3d'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-2, -2 - hop); c.lineTo(-2, 0); c.moveTo(2, -2 - hop); c.lineTo(2, 0); c.stroke();
  c.translate(0, -hop);
  c.fillStyle = '#ffe14d'; c.strokeStyle = INK; c.lineWidth = 1;
  ell(c, 0, -6, 6, 5); c.fill(); c.stroke();
  circ(c, 3, -11, 3.8); c.fill(); c.stroke();
  c.fillStyle = '#ffd000'; const fl = air ? Math.sin(t * 30) * 2 : 0; ell(c, -1.6, -6 - fl * 0.5, 3, 2 + Math.abs(fl) * 0.4, -0.4); c.fill();
  c.fillStyle = '#ff9a3d'; c.beginPath(); c.moveTo(6.2, -11.6); c.lineTo(9, -10.6); c.lineTo(6.2, -9.6); c.closePath(); c.fill();
  c.fillStyle = INK; circ(c, 4.4, -12, 0.9); c.fill();
  c.strokeStyle = '#ffd000'; c.lineWidth = 1; c.beginPath(); c.moveTo(2.4, -14.6); c.lineTo(1.6, -16.6); c.moveTo(3.6, -14.8); c.lineTo(4, -16.8); c.stroke();
  c.restore();
}
function drawCoop(c, co, t) {
  const x = co.x, gy = co.gy;
  c.save(); c.lineJoin = 'round';
  if (co.pulse > 0) { c.fillStyle = `rgba(255,236,120,${co.pulse})`; circ(c, x, gy - 26, 34); c.fill(); }
  c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#c94a4a'; c.fillRect(x - 22, gy - 34, 44, 34); c.strokeRect(x - 22, gy - 34, 44, 34);
  c.strokeStyle = '#a83a3a'; c.lineWidth = 1; c.beginPath(); for (let yy = gy - 28; yy < gy; yy += 7) { c.moveTo(x - 22, yy); c.lineTo(x + 22, yy); } c.stroke();
  c.fillStyle = '#8a5a30'; c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x - 28, gy - 32); c.lineTo(x, gy - 52); c.lineTo(x + 28, gy - 32); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff3d6'; c.beginPath(); c.moveTo(x - 9, gy); c.lineTo(x - 9, gy - 16); c.arc(x, gy - 16, 9, Math.PI, TAU); c.lineTo(x + 9, gy); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#5a3a24'; c.beginPath(); c.moveTo(x - 6, gy); c.lineTo(x - 6, gy - 15); c.arc(x, gy - 15, 6, Math.PI, TAU); c.lineTo(x + 6, gy); c.closePath(); c.fill();
  c.strokeStyle = '#fff'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x - 18, gy - 30); c.lineTo(x - 12, gy - 24); c.moveTo(x - 12, gy - 30); c.lineTo(x - 18, gy - 24); c.moveTo(x + 12, gy - 30); c.lineTo(x + 18, gy - 24); c.moveTo(x + 18, gy - 30); c.lineTo(x + 12, gy - 24); c.stroke();
  drawChick(c, x, gy - 38, 1, t, false, 0.7);
  c.restore();
}

/* ===== Тир із качечками ===== */
function drawDuckBooth(c, s, t) {
  const x0 = s.x0 - 18, x1 = s.x1 + 18, top = s.y - 58, cy = s.y + 12;
  c.save(); c.lineJoin = 'round';
  c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(x0, top + 14, x1 - x0, cy - top - 14);
  c.strokeStyle = INK; c.lineWidth = 1.4;
  for (const px of [x0, x1]) { c.fillStyle = '#fff3e0'; c.fillRect(px - 3, top, 6, cy - top + 18); c.strokeRect(px - 3, top, 6, cy - top + 18); }
  const n = Math.max(4, Math.round((x1 - x0) / 18));
  for (let i = 0; i < n; i++) { const a = x0 + i * (x1 - x0) / n, b = a + (x1 - x0) / n; c.fillStyle = i % 2 ? '#ffffff' : '#ff5c7a'; c.beginPath(); c.moveTo(a, top); c.lineTo(b, top); c.lineTo(b, top + 10); c.quadraticCurveTo((a + b) / 2, top + 18, a, top + 10); c.closePath(); c.fill(); c.stroke(); }
  c.strokeStyle = '#8a5a30'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, s.y + 10); c.lineTo(x1, s.y + 10); c.stroke();
  for (const d of s.ducks) {
    const x = d.down ? d.x : duckPos(s, d);
    c.save(); c.translate(x, s.y + 10);
    if (d.down) c.scale(1, 1 - d.fall * 0.75);
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -4); c.stroke();
    c.fillStyle = d.down ? '#e6c25a' : '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1.1;
    ell(c, 0, -9, 8, 5.4); c.fill(); c.stroke(); circ(c, 5, -16, 4.2); c.fill(); c.stroke();
    c.fillStyle = '#ff9a3d'; c.beginPath(); c.moveTo(8.6, -16.4); c.lineTo(12, -15); c.lineTo(8.6, -14); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, 6, -17, 1); c.fill();
    c.fillStyle = '#fff'; circ(c, -1, -9, 3); c.fill(); c.fillStyle = '#ff5c7a'; circ(c, -1, -9, 1.6); c.fill();
    c.restore();
  }
  c.fillStyle = '#c98d55'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, x0 - 4, cy - 2, x1 - x0 + 8, 10, 3); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; for (let x = x0 + 10; x < x1 - 4; x += 22) { starPath(c, x, cy + 3, 3, 1.4, 0); c.fill(); }
  c.restore();
}

/* ===== Американські гірки ===== */
function drawCoasterTrack(c, m) {
  const xa = m.pts[0].x, xb = m.pts[m.pts.length - 1].x;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  for (let x = xa + 12; x < xb; x += 36) {
    const y = railY(m.pts, x) + 4;
    if (y > VIEW_H - 4) continue;
    c.strokeStyle = INK; c.lineWidth = 4.4; c.beginPath(); c.moveTo(x, y); c.lineTo(x, VIEW_H + 4); c.stroke();
    c.strokeStyle = '#fff3fa'; c.lineWidth = 2.6; c.stroke();
    c.strokeStyle = 'rgba(255,122,184,.55)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x - 10, Math.min(VIEW_H, y + 30)); c.lineTo(x, y + 6); c.lineTo(x + 10, Math.min(VIEW_H, y + 30)); c.stroke();
  }
  const path = off => { c.beginPath(); for (let x = xa; x <= xb; x += 6) { const y = railY(m.pts, x) + off; if (x === xa) c.moveTo(x, y); else c.lineTo(x, y); } };
  for (let x = xa + 4; x < xb; x += 12) { const y = railY(m.pts, x); c.fillStyle = '#c98d55'; c.fillRect(x - 3, y - 1, 6, 6); }
  path(0); c.strokeStyle = INK; c.lineWidth = 5; c.stroke(); c.strokeStyle = '#ff7ab8'; c.lineWidth = 3; c.stroke();
  c.setLineDash([5, 5]); c.strokeStyle = '#ffffff'; c.lineWidth = 3; c.stroke(); c.setLineDash([]);
  path(5); c.strokeStyle = 'rgba(59,31,79,.5)'; c.lineWidth = 1.4; c.stroke();
  c.restore();
}
function drawCoasterCart(c, m, t) {
  c.save(); c.lineJoin = 'round';
  const ry = railY(m.pts, m.x + m.w / 2), spin = m.x * 0.3;
  for (const wx of [m.x + 9, m.x + m.w - 9]) {
    const wy = railY(m.pts, wx) - 4;
    c.fillStyle = '#3b1f4f'; c.strokeStyle = INK; c.lineWidth = 1; circ(c, wx, wy, 4.4); c.fill(); c.stroke();
    c.strokeStyle = '#ffd23f'; c.lineWidth = 1.1; c.beginPath(); c.moveTo(wx + Math.cos(spin) * 3, wy + Math.sin(spin) * 3); c.lineTo(wx - Math.cos(spin) * 3, wy - Math.sin(spin) * 3); c.stroke();
  }
  c.fillStyle = '#4cb6ff'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, m.x + 1, m.y - 1, m.w - 2, Math.max(8, ry - 6 - m.y), 4); c.fill(); c.stroke();
  c.fillStyle = '#ff7ab8'; rr(c, m.x - 2, m.y - 20, 8, 22, 3); c.fill(); c.stroke();
  c.restore();
}
function coasterFront(c, m) {
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(m.x + 2, m.y - 9); c.lineTo(m.x + m.w - 6, m.y - 9); c.quadraticCurveTo(m.x + m.w + 4, m.y - 8, m.x + m.w, m.y + 6); c.lineTo(m.x + 2, m.y + 6); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; c.fillRect(m.x + 4, m.y - 6, m.w - 12, 2.4);
  c.fillStyle = '#ffd23f'; starPath(c, m.x + m.w / 2, m.y + 1, 4.4, 2, 0); c.fill(); c.lineWidth = 0.9; c.stroke();
  c.restore();
}

/* ===== Гарбуз і клубок ===== */
function drawRollBall(c, m, t) {
  const r = m.h / 2, cx = m.x + m.w / 2, cy = m.y + r;
  c.save(); c.translate(cx, cy); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.5;
  if (G.theme === 'attic') {
    c.fillStyle = '#ff7ab8'; circ(c, 0, 0, r); c.fill(); c.stroke();
    c.save(); circ(c, 0, 0, r - 1); c.clip(); c.rotate(m.rot);
    c.strokeStyle = '#ffb3d6'; c.lineWidth = 2;
    for (let i = -3; i <= 3; i++) { c.beginPath(); c.ellipse(i * 5, 0, 4, r + 2, 0.5, 0, TAU); c.stroke(); }
    c.strokeStyle = '#e0508f'; c.lineWidth = 1.4; for (let i = -2; i <= 2; i++) { c.beginPath(); c.ellipse(0, i * 6, r + 2, 3, -0.4, 0, TAU); c.stroke(); }
    c.restore();
    c.strokeStyle = '#ff7ab8'; c.lineWidth = 2; c.beginPath(); c.moveTo(-r * 0.7, r * 0.7); c.quadraticCurveTo(-r - 6, r + 2, -r - 12, r - 2); c.stroke();
  } else {
    c.save(); c.rotate(m.rot);
    c.fillStyle = '#ff9a3d'; circ(c, 0, 0, r); c.fill(); c.stroke();
    c.strokeStyle = '#e0701a'; c.lineWidth = 1.4; for (const k of [-0.55, 0, 0.55]) { c.beginPath(); c.ellipse(k * r, 0, r * 0.32, r - 1, 0, 0, TAU); c.stroke(); }
    c.fillStyle = '#5f9a4a'; c.strokeStyle = INK; c.lineWidth = 1.1; rr(c, -2.4, -r - 5, 4.8, 7, 2); c.fill(); c.stroke();
    c.fillStyle = '#7fd46a'; ell(c, 5, -r - 2, 5, 2.4, -0.4); c.fill(); c.stroke();
    c.restore();
    c.fillStyle = 'rgba(255,255,255,.3)'; ell(c, -r * 0.4, -r * 0.45, r * 0.3, r * 0.16, -0.6); c.fill();
  }
  c.restore();
}
function drawYarnBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.lineCap = 'round';
  c.strokeStyle = b.col || '#ff7ab8'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, 6); c.quadraticCurveTo(-Math.sign(b.vx) * 14, 12, -Math.sign(b.vx) * 26, 9 + Math.sin(b.t * 12) * 2); c.stroke();
  c.rotate(b.t * Math.sign(b.vx) * 14);
  c.fillStyle = b.col || '#ff7ab8'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, 0, 0, b.r); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1.2; for (let i = -1; i <= 1; i++) { c.beginPath(); c.ellipse(i * 3.4, 0, 2.6, b.r - 1, 0.5, 0, TAU); c.stroke(); }
  c.restore();
}

function drawWorld8(c, t, vis) {
  for (const m of G.movers) if (m.coaster && m.pts[m.pts.length - 1].x > G.cam - 40 && m.pts[0].x < G.cam + viewW + 40) drawCoasterTrack(c, m);
  for (const s of G.duckSets) if (s.x1 > G.cam - 60 && s.x0 < G.cam + viewW + 60) drawDuckBooth(c, s, t);
  for (const co of G.coops) if (vis(co.x, 60)) drawCoop(c, co, t);
  for (const ch of G.chicks) if (ch.state !== 'done' && vis(ch.x)) {
    drawChick(c, ch.x - (ch.state === 'follow' ? 0 : 0), ch.y, ch.dir, ch.t, ch.air);
    if (ch.state === 'home') sparkle(c, ch.x + 8, ch.y - 22 + Math.sin(ch.t * 4) * 2, 1.6, '#fff8c0');
  }
}

/* ===== Кіт Мурко ===== */
function drawCatBoss(c, B, t) {
  const st = B.state, flash = B.flash > 0, happy = B.dead || st === 'happy', groom = st === 'groom';
  const d = B.dir || 1, fur = flash ? '#fff' : '#ffb347', dark = '#e0782a', belly = '#fff3e0';
  c.save(); c.translate(B.x, B.fy); c.scale(d, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.5;
  const sit = groom || happy;
  // хвіст
  const sway = Math.sin(t * (st === 'crouch' ? 14 : 3)) * (st === 'crouch' ? 6 : 4);
  c.strokeStyle = INK; c.lineWidth = 8; c.beginPath();
  if (sit) { c.moveTo(-10, -4); c.quadraticCurveTo(-30, 0, -28 + sway * 0.5, -16); }
  else { c.moveTo(-22, -20); c.quadraticCurveTo(-38, -24, -36 + sway, -44); }
  c.stroke(); c.strokeStyle = fur; c.lineWidth = 5.4; c.stroke();
  if (sit) {
    // сидить і вмивається (або муркоче після перемоги)
    c.fillStyle = fur; c.strokeStyle = INK; c.lineWidth = 1.5;
    ell(c, 0, -20, 16, 20); c.fill(); c.stroke();
    c.fillStyle = belly; ell(c, 5, -16, 8, 13); c.fill();
    c.fillStyle = fur; for (const lx of [-8, 8]) { ell(c, lx, -2, 6, 3.4); c.fill(); c.stroke(); }
    c.save(); c.translate(4, -46); c.rotate(groom ? Math.sin(t * 6) * 0.08 - 0.15 : 0);
    catHead(c, fur, dark, belly, flash, 'closed', t);
    c.restore();
    if (groom) {
      const k = Math.sin(t * 9);
      c.fillStyle = fur; c.strokeStyle = INK; c.lineWidth = 1.3; ell(c, 16, -38 + k * 2, 5, 4); c.fill(); c.stroke();
      c.fillStyle = '#ff9fbf'; ell(c, 13, -40 + k * 2, 2.6, 1.4); c.fill();
    }
  } else {
    const crouch = st === 'crouch', air = st === 'pounce', land = st === 'land';
    const by = crouch ? -12 : land ? -14 : -18, rear = crouch ? Math.sin(t * 30) * 2 : 0;
    // лапи
    c.fillStyle = fur; c.strokeStyle = INK; c.lineWidth = 1.2;
    const step = st === 'walk' ? Math.sin(t * 9) * 3 : 0;
    const legs = air ? [[-18, -12, 0.9], [-10, -10, 0.7], [12, -12, -0.9], [20, -14, -1.1]] : [[-16 + step, 0, 0], [-8 - step, 0, 0], [10 - step, 0, 0], [18 + step, 0, 0]];
    for (const [lx, ly, rot] of legs) { c.save(); c.translate(lx, ly + (air ? 0 : by + 18 - 8)); c.rotate(rot); rr(c, -3, 0, 6, air ? 10 : 8 - (crouch ? 0 : 0), 3); c.fill(); c.stroke(); c.restore(); }
    // тіло
    c.save(); c.translate(rear * 0.3, 0); c.rotate(crouch ? 0.12 : air ? -0.08 : 0);
    c.fillStyle = fur; c.lineWidth = 1.6; ell(c, 0, by, 25, crouch ? 11 : 13); c.fill(); c.stroke();
    c.fillStyle = belly; ell(c, 4, by + 6, 15, 5); c.fill();
    c.strokeStyle = dark; c.lineWidth = 2.2; for (const sx of [-14, -6, 2]) { c.beginPath(); c.moveTo(sx, by - 12); c.quadraticCurveTo(sx + 3, by - 6, sx, by - 1); c.stroke(); }
    c.restore();
    if (st === 'swipe') {
      const up = B.st < 0.45, ax = up ? 26 : 36, ay = up ? -46 : -14;
      c.fillStyle = fur; c.strokeStyle = INK; c.lineWidth = 1.3; c.beginPath(); c.moveTo(18, by - 4); c.lineTo(ax, ay); c.lineWidth = 8; c.stroke(); c.strokeStyle = fur; c.lineWidth = 5.4; c.stroke();
      c.fillStyle = fur; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, ax, ay, 4.6); c.fill(); c.stroke();
      c.fillStyle = '#ff9fbf'; circ(c, ax + 1, ay + 1, 1.8); c.fill();
    }
    c.save(); c.translate(24, by - 12 + (crouch ? 4 : 0));
    catHead(c, fur, dark, belly, flash, crouch || air ? 'wide' : st === 'swipe' ? 'cheeky' : 'open', t);
    c.restore();
  }
  c.restore();
  if (groom) { c.save(); c.font = '900 10px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.lineWidth = 2.4; c.strokeStyle = INK; c.fillStyle = '#fff'; const k = (t * 0.7) % 1; c.globalAlpha = 1 - k; c.strokeText('мур-мур', B.x, B.fy - 70 - k * 14); c.fillText('мур-мур', B.x, B.fy - 70 - k * 14); c.restore(); }
  if (st === 'crouch') { c.save(); c.globalAlpha = 0.5 + 0.4 * Math.sin(t * 20); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 1.2; c.font = '900 14px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.strokeText('!', B.x + d * 24, B.fy - 52); c.fillText('!', B.x + d * 24, B.fy - 52); c.restore(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, B.fy - 70 - k * 30, 9); c.fillStyle = ['#ff7ab8', '#ffb347', '#ff5c8a'][i]; c.fill(); c.restore(); }
}
function catHead(c, fur, dark, belly, flash, eyes, t) {
  c.fillStyle = fur; c.strokeStyle = INK; c.lineWidth = 1.5;
  for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 4 - 1, -9); c.lineTo(s * 10 - 1, -19); c.lineTo(s * 12 - 1, -5); c.closePath(); c.fill(); c.stroke(); }
  c.fillStyle = '#ff9fbf'; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 6 - 1, -9); c.lineTo(s * 10 - 1, -15); c.lineTo(s * 10.6 - 1, -7); c.closePath(); c.fill(); }
  c.fillStyle = fur; ell(c, 0, 0, 14, 12); c.fill(); c.stroke();
  c.strokeStyle = dark; c.lineWidth = 1.8; c.beginPath(); c.moveTo(-3, -11); c.lineTo(-2, -7); c.moveTo(1, -12); c.lineTo(1, -7); c.moveTo(5, -11); c.lineTo(4, -7); c.stroke();
  c.fillStyle = belly; ell(c, 4, 5, 8, 5.4); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1.3;
  if (eyes === 'closed') { for (const ex of [0, 8]) { c.beginPath(); c.arc(ex, -1, 2.6, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); } }
  else {
    const big = eyes === 'wide';
    for (const ex of [0, 8]) { c.fillStyle = '#b8f070'; ell(c, ex, -1, big ? 3.4 : 3, big ? 4 : 3.4); c.fill(); c.stroke(); c.fillStyle = INK; ell(c, ex + 0.6, -0.6, big ? 2 : 1, big ? 3 : 2.6); c.fill(); c.fillStyle = '#fff'; circ(c, ex + 1.4, -2, 0.8); c.fill(); }
  }
  c.fillStyle = '#ff7a95'; c.beginPath(); c.moveTo(4, 3); c.lineTo(7, 3); c.lineTo(5.5, 5); c.closePath(); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(5.5, 5); c.quadraticCurveTo(5, 8, 2.6, 7.4); c.moveTo(5.5, 5); c.quadraticCurveTo(6.4, 8, 9, 7.4); c.stroke();
  if (eyes === 'cheeky') { c.fillStyle = '#ff7a95'; ell(c, 6, 9, 2, 1.6); c.fill(); }
  c.strokeStyle = 'rgba(59,31,79,.7)'; c.lineWidth = 0.8; c.beginPath(); for (const s of [-1, 1]) { c.moveTo(10, 5 + s); c.lineTo(18, 4 + s * 3); } c.moveTo(-2, 5); c.lineTo(-10, 4); c.stroke();
}

/* ===== Блоки ===== */
function drawBlock9(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'hay') {
    rr(c, 1, 2, T - 2, T - 3, 4); c.fillStyle = '#f2cf5a'; c.fill(); c.stroke();
    c.strokeStyle = '#d9a83a'; c.lineWidth = 1; c.beginPath(); for (const y of [7, 12, 17]) { c.moveTo(3, y); c.lineTo(T - 3, y + 1); } c.stroke();
    c.strokeStyle = '#c94a4a'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(8, 2); c.lineTo(8, T - 1); c.moveTo(16, 2); c.lineTo(16, T - 1); c.stroke();
  } else if (b === 'fairbox') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#9fd8ff'; c.fill(); c.stroke();
    c.save(); rr(c, 1, 1, T - 2, T - 2, 4); c.clip(); c.fillStyle = '#ffffff'; for (let x = -T; x < T * 2; x += 8) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 4, 0); c.lineTo(x + 4 - T, T); c.lineTo(x - T, T); c.closePath(); c.fill(); } c.restore();
    rr(c, 1, 1, T - 2, T - 2, 4); c.stroke();
    c.fillStyle = '#ff5c7a'; starPath(c, T / 2, T / 2 + 0.5, 5.4, 2.4, 0); c.fill(); c.lineWidth = 1; c.stroke();
  } else if (b === 'jackblock') {
    rr(c, 1, 2, T - 2, T - 3, 7); c.fillStyle = '#ff9a3d'; c.fill(); c.stroke();
    c.strokeStyle = '#e0701a'; c.lineWidth = 1; c.beginPath(); c.moveTo(8, 3); c.quadraticCurveTo(5, 12, 8, 21); c.moveTo(16, 3); c.quadraticCurveTo(19, 12, 16, 21); c.stroke();
    c.fillStyle = '#ffe14d'; c.beginPath(); c.moveTo(6, 9); c.lineTo(9, 7); c.lineTo(10, 11); c.closePath(); c.fill(); c.beginPath(); c.moveTo(18, 9); c.lineTo(15, 7); c.lineTo(14, 11); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(6, 14); c.quadraticCurveTo(12, 21, 18, 14); c.quadraticCurveTo(12, 17, 6, 14); c.fill();
  } else if (b === 'toyblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#ffffff'; c.fill(); c.stroke();
    c.fillStyle = '#4cb6ff'; rr(c, 4, 4, T - 8, T - 8, 2); c.fill();
    c.fillStyle = '#fff'; c.font = '900 12px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('А', T / 2, T / 2 + 1);
  } else if (b === 'trunk') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#b8783e'; c.fill(); c.stroke();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1; c.beginPath(); c.moveTo(2, 9); c.lineTo(T - 2, 9); c.stroke();
    c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 0.9; for (const [x, y] of [[1.5, 1.5], [T - 6.5, 1.5], [1.5, T - 6.5], [T - 6.5, T - 6.5]]) { c.fillRect(x, y, 5, 5); c.strokeRect(x, y, 5, 5); }
    rr(c, T / 2 - 3, 7, 6, 6, 1.4); c.fill(); c.stroke();
  } else return drawBlock10(c, b);
  return true;
}

/* ===== Декор ===== */
function drawDecor12(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'fence':
      c.fillStyle = '#fffaf2'; for (const dx of [-8, 0, 8]) { c.beginPath(); c.moveTo(x + dx - 2.6, y); c.lineTo(x + dx - 2.6, y - 13); c.lineTo(x + dx, y - 16); c.lineTo(x + dx + 2.6, y - 13); c.lineTo(x + dx + 2.6, y); c.closePath(); c.fill(); c.stroke(); }
      c.fillRect(x - 11, y - 10, 22, 2.4); c.strokeRect(x - 11, y - 10, 22, 2.4);
      break;
    case 'hen':
      c.fillStyle = '#ffffff'; ell(c, x, y - 6, 8, 6); c.fill(); c.stroke(); circ(c, x + 6, y - 12, 4); c.fill(); c.stroke();
      c.fillStyle = '#ff5c7a'; circ(c, x + 6, y - 16.6, 1.6); c.fill(); circ(c, x + 4.4, y - 16, 1.4); c.fill();
      c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(x + 9.6, y - 12.6); c.lineTo(x + 12, y - 11.6); c.lineTo(x + 9.6, y - 10.8); c.closePath(); c.fill();
      c.fillStyle = INK; circ(c, x + 7, y - 12.6, 0.8); c.fill();
      c.fillStyle = '#ffe14d'; ell(c, x - 9, y - 1.4, 3, 1.6); c.fill();
      break;
    case 'balloonS':
      c.strokeStyle = 'rgba(59,31,79,.6)'; c.lineWidth = 0.8; c.beginPath(); for (const dx of [-5, 0, 5]) { c.moveTo(x, y); c.lineTo(x + dx, y - 18); } c.stroke();
      c.strokeStyle = INK;
      for (const [dx, dy, col] of [[-5, -22, '#ff5c7a'], [5, -23, '#4cb6ff'], [0, -28, '#ffd23f']]) { c.fillStyle = col; ell(c, x + dx + Math.sin(t * 2 + dx) * 0.8, y + dy, 4.4, 5.4); c.fill(); c.stroke(); }
      break;
    case 'candle':
      c.fillStyle = '#fff3e0'; rr(c, x - 2.6, y - 11, 5.2, 11, 1.4); c.fill(); c.stroke();
      { const f = Math.sin(t * 9 + x) * 0.6; c.fillStyle = 'rgba(255,220,120,.35)'; circ(c, x, y - 14, 6); c.fill(); c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(x, y - 18 + f); c.quadraticCurveTo(x + 2.6, y - 13, x, y - 11.4); c.quadraticCurveTo(x - 2.6, y - 13, x, y - 18 + f); c.fill(); }
      break;
    case 'candybowl':
      c.fillStyle = '#ff5c7a'; circ(c, x - 3, y - 7, 2.4); c.fill(); c.fillStyle = '#ffd23f'; circ(c, x + 2, y - 8, 2.4); c.fill(); c.fillStyle = '#4cb6ff'; circ(c, x + 5, y - 6, 2); c.fill();
      c.fillStyle = '#b48cff'; c.beginPath(); c.moveTo(x - 8, y - 6); c.quadraticCurveTo(x, y + 3, x + 8, y - 6); c.closePath(); c.fill(); c.stroke();
      break;
    case 'toystack':
      for (const [dx, dy, i] of [[-5, 0, 0], [5, 0, 1], [0, -7, 2]]) { const col = BRICK_COLS[(i + Math.floor(x)) % 4]; c.fillStyle = col[0]; rr(c, x + dx - 5, y + dy - 6, 10, 6, 1.4); c.fill(); c.stroke(); c.fillRect(x + dx - 3, y + dy - 7.6, 2.4, 1.6); c.fillRect(x + dx + 0.6, y + dy - 7.6, 2.4, 1.6); }
      break;
    case 'yarnS':
      c.strokeStyle = '#c98d55'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x - 6, y - 14); c.lineTo(x + 4, y - 2); c.moveTo(x + 6, y - 14); c.lineTo(x - 4, y - 2); c.stroke();
      c.strokeStyle = INK; c.lineWidth = 0.8; c.fillStyle = d.c || '#4cb6ff'; circ(c, x, y - 5, 5); c.fill(); c.stroke();
      c.strokeStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(x, y - 5, 3, 0.4, 2.6); c.stroke();
      break;
    case 'bookstack':
      for (const [i, col] of [[0, '#ff5c7a'], [1, '#54d68c'], [2, '#4cb6ff']]) { c.fillStyle = col; rr(c, x - 8 + i, y - 4 - i * 4, 16 - i * 2, 4, 1); c.fill(); c.stroke(); }
      break;
    default: drawDecor13(c, d, t);
  }
}

/* ===== Фони ===== */
function bgFarm(c, viewW, camX, t) {
  const sx = viewW * 0.8, sg = c.createRadialGradient(sx, 48, 4, sx, 48, 56);
  sg.addColorStop(0, 'rgba(255,250,200,1)'); sg.addColorStop(0.35, 'rgba(255,240,170,.8)'); sg.addColorStop(1, 'rgba(255,240,170,0)');
  c.fillStyle = sg; circ(c, sx, 48, 56); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.9)'); }
  hill(c, viewW, 176, 14, 0.012, 0.5, camX * 0.15, '#bfe6a8');
  const span = 360;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 80;
    c.fillStyle = '#e06a5a'; c.fillRect(wx, 150, 54, 46); c.fillStyle = '#c94a4a'; c.beginPath(); c.moveTo(wx - 6, 152); c.lineTo(wx + 27, 128); c.lineTo(wx + 60, 152); c.closePath(); c.fill();
    c.strokeStyle = '#fff'; c.lineWidth = 2; c.strokeRect(wx + 17, 168, 20, 28); c.beginPath(); c.moveTo(wx + 17, 168); c.lineTo(wx + 37, 196); c.moveTo(wx + 37, 168); c.lineTo(wx + 17, 196); c.stroke();
    c.fillStyle = '#d6dce8'; rr(c, wx + 66, 132, 18, 64, 9); c.fill(); c.fillStyle = '#b8c0d0'; c.beginPath(); c.arc(wx + 75, 136, 9, Math.PI, TAU); c.fill();
  }
  hill(c, viewW, 200, 8, 0.02, 2, camX * 0.35, '#9fd88a');
  c.strokeStyle = 'rgba(79,154,72,.35)'; c.lineWidth = 2;
  for (let i = 0; i < 10; i++) { const x = wrapX(i * 80 - camX * 0.35, viewW + 80) - 40; c.beginPath(); c.moveTo(x, 214); c.lineTo(x + 30, 200); c.stroke(); }
}
function bgFair(c, viewW, camX, t) {
  const span = 420;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.12, span) + 140, wy = 110, r = 70;
    c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 3; circ(c, wx, wy, r); c.stroke();
    c.lineWidth = 1.4; for (let k = 0; k < 10; k++) { const a = t * 0.3 + k * TAU / 10; c.beginPath(); c.moveTo(wx, wy); c.lineTo(wx + Math.cos(a) * r, wy + Math.sin(a) * r); c.stroke(); c.fillStyle = RAINBOW[k % 6]; c.globalAlpha = 0.75; rr(c, wx + Math.cos(a) * r - 6, wy + Math.sin(a) * r, 12, 9, 3); c.fill(); c.globalAlpha = 1; }
    c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 3; c.beginPath(); c.moveTo(wx - 30, 214); c.lineTo(wx, wy); c.lineTo(wx + 30, 214); c.stroke();
  }
  const ts = 220;
  for (let i = -1; i < viewW / ts + 2; i++) {
    const wx = i * ts + wrapX(-camX * 0.3, ts) + 40;
    c.fillStyle = 'rgba(255,255,255,.95)'; c.fillRect(wx - 34, 176, 68, 40);
    c.fillStyle = ['#ff7ab8', '#4cb6ff', '#ffb347'][((i % 3) + 3) % 3]; for (let k = 0; k < 4; k++) c.fillRect(wx - 34 + k * 17, 176, 8, 40);
    c.beginPath(); c.moveTo(wx - 40, 178); c.lineTo(wx, 146); c.lineTo(wx + 40, 178); c.closePath(); c.fill();
    c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(wx, 146); c.lineTo(wx, 132); c.lineTo(wx + 10, 136); c.lineTo(wx, 140); c.fill();
  }
  c.strokeStyle = 'rgba(59,31,79,.35)'; c.lineWidth = 1;
  const bs = 160;
  for (let i = -1; i < viewW / bs + 2; i++) {
    const wx = i * bs + wrapX(-camX * 0.5, bs);
    c.beginPath(); c.moveTo(wx, 18); c.quadraticCurveTo(wx + bs / 2, 40, wx + bs, 18); c.stroke();
    for (let k = 1; k < 8; k++) { const fx = wx + k * bs / 8, fy = 18 + Math.sin(k / 8 * Math.PI) * 11; c.fillStyle = RAINBOW[(k + i * 3 + 60) % 6]; c.beginPath(); c.moveTo(fx - 5, fy); c.lineTo(fx + 5, fy); c.lineTo(fx, fy + 10); c.closePath(); c.fill(); }
  }
}
function bgPumpkin(c, viewW, camX, t) {
  const mx = viewW * 0.76, mg = c.createRadialGradient(mx, 58, 4, mx, 58, 64);
  mg.addColorStop(0, 'rgba(255,240,200,1)'); mg.addColorStop(0.5, 'rgba(255,230,170,.95)'); mg.addColorStop(0.56, 'rgba(255,230,170,.25)'); mg.addColorStop(1, 'rgba(255,230,170,0)');
  c.fillStyle = mg; circ(c, mx, 58, 64); c.fill();
  const R = rng(31);
  for (let i = 0; i < 40; i++) { const x = wrapX(R() * 1400 - camX * 0.05, viewW + 20) - 10, y = R() * 140, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); c.fillStyle = `rgba(255,250,230,${0.3 + tw * 0.6})`; circ(c, x, y, 0.6 + R() * 0.9); c.fill(); }
  for (let i = 0; i < 4; i++) {
    const k = ((t * 0.06 + i * 0.27) % 1), bx = wrapX(k * (viewW + 200) - camX * 0.08 + i * 90, viewW + 200) - 100, byy = 50 + i * 22 + Math.sin(t * 2 + i) * 8, f = Math.sin(t * 14 + i) * 4;
    c.fillStyle = 'rgba(29,19,64,.85)'; c.beginPath(); c.moveTo(bx, byy); c.quadraticCurveTo(bx - 6, byy - 6 - f, bx - 12, byy - 2); c.quadraticCurveTo(bx - 6, byy + 1, bx, byy + 3); c.quadraticCurveTo(bx + 6, byy + 1, bx + 12, byy - 2); c.quadraticCurveTo(bx + 6, byy - 6 - f, bx, byy); c.fill();
  }
  hill(c, viewW, 182, 16, 0.012, 0.5, camX * 0.15, '#2a1a52');
  const span = 380;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span) + 120;
    c.fillStyle = '#20143f'; c.fillRect(wx, 132, 44, 60); c.beginPath(); c.moveTo(wx - 6, 134); c.lineTo(wx + 22, 108); c.lineTo(wx + 50, 134); c.closePath(); c.fill();
    c.fillRect(wx + 30, 112, 8, 14);
    c.fillStyle = '#ffd86b'; for (const [dx, dy] of [[8, 146], [26, 146], [8, 166]]) c.fillRect(wx + dx, dy, 9, 10);
  }
  hill(c, viewW, 206, 10, 0.02, 2, camX * 0.35, '#3a2464');
  for (let i = 0; i < 8; i++) { const x = wrapX(i * 110 - camX * 0.35, viewW + 110) - 50, y = 206 + Math.sin((x + camX * 0.35) * 0.02 + 2) * 10 - 4; c.fillStyle = '#ff9a3d'; ell(c, x, y, 7, 5.4); c.fill(); c.fillStyle = '#ffe14d'; c.globalAlpha = 0.6 + 0.3 * Math.sin(t * 3 + i); c.fillRect(x - 3, y - 2, 2, 2); c.fillRect(x + 1, y - 2, 2, 2); c.fillRect(x - 2.6, y + 1, 5.2, 1.4); c.globalAlpha = 1; }
}
function bgBricks(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 200 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 18, 0.85, 'rgba(255,255,255,.95)'); }
  for (const [f, base, sc] of [[0.15, 110, 0.75], [0.3, 140, 1]]) {
    const span = 150 * sc;
    for (let i = -1; i < viewW / span + 2; i++) {
      const wx = i * span + wrapX(-camX * f, span), ci = ((i + Math.floor(camX * f / span)) % 4 + 4) % 4, h = (60 + ((ci * 37) % 50)) * sc;
      const col = BRICK_COLS[ci];
      c.globalAlpha = sc < 1 ? 0.45 : 0.7;
      c.fillStyle = col[0]; c.fillRect(wx + 10, base + 80 - h, 60 * sc, h + 40);
      for (let k = 0; k < 3; k++) rr(c, wx + 14 + k * 19 * sc, base + 74 - h, 12 * sc, 7, 2), c.fill();
      c.fillStyle = 'rgba(255,255,255,.6)'; for (let r = 0; r < h / 24; r++) for (let k = 0; k < 2; k++) c.fillRect(wx + 18 + k * 24 * sc, base + 90 - h + r * 24, 10 * sc, 12);
      c.globalAlpha = 1;
    }
  }
  hill(c, viewW, 222, 5, 0.03, 1.2, camX * 0.4, '#9ff0c4');
}
function bgAttic(c, viewW, camX, t) {
  c.fillStyle = 'rgba(201,141,85,.25)';
  for (let x = wrapX(-camX * 0.2, 40) - 40; x < viewW + 40; x += 40) c.fillRect(x, 0, 2, VIEW_H);
  const span = 420;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.15, span) + 160;
    c.fillStyle = '#8a5a30'; c.beginPath(); c.moveTo(wx - 210, 0); c.lineTo(wx - 190, 0); c.lineTo(wx + 10, 150); c.lineTo(wx - 10, 150); c.closePath(); c.fill();
    c.fillStyle = '#a8743f'; circ(c, wx + 110, 80, 36); c.fill();
    const wg = c.createLinearGradient(0, 50, 0, 110); wg.addColorStop(0, '#2a1f5a'); wg.addColorStop(1, '#5a3a8e');
    c.fillStyle = wg; circ(c, wx + 110, 80, 30); c.fill();
    c.fillStyle = '#fff3c4'; circ(c, wx + 120, 70, 8); c.fill(); c.fillStyle = '#2a1f5a'; circ(c, wx + 124, 67, 7); c.fill();
    c.fillStyle = '#fff'; for (const [dx, dy] of [[-12, 66], [-4, 92], [8, 88], [-16, 84]]) { circ(c, wx + 110 + dx, dy, 0.9); c.fill(); }
    c.strokeStyle = '#a8743f'; c.lineWidth = 3; c.beginPath(); c.moveTo(wx + 80, 80); c.lineTo(wx + 140, 80); c.moveTo(wx + 110, 50); c.lineTo(wx + 110, 110); c.stroke();
    c.strokeStyle = 'rgba(59,31,79,.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(wx + 250, 0); c.lineTo(wx + 250, 60 + Math.sin(t) * 2); c.stroke();
    const lg = c.createRadialGradient(wx + 250, 66, 2, wx + 250, 66, 40); lg.addColorStop(0, 'rgba(255,240,170,.8)'); lg.addColorStop(1, 'rgba(255,240,170,0)');
    c.fillStyle = lg; circ(c, wx + 250, 66, 40); c.fill(); c.fillStyle = '#fff3c4'; circ(c, wx + 250, 66 + Math.sin(t) * 2, 6); c.fill();
  }
  const bs = 260;
  for (let i = -1; i < viewW / bs + 2; i++) {
    const wx = i * bs + wrapX(-camX * 0.35, bs);
    c.fillStyle = 'rgba(168,116,63,.55)'; c.fillRect(wx + 20, 176, 50, 44); c.fillRect(wx + 30, 150, 34, 26); c.fillStyle = 'rgba(242,214,168,.5)'; c.fillRect(wx + 42, 176, 6, 44);
    c.fillStyle = 'rgba(138,90,48,.5)'; rr(c, wx + 140, 186, 70, 34, 6); c.fill();
  }
}
Object.assign(BG2, { farm: bgFarm, fair: bgFair, pumpkin: bgPumpkin, bricks: bgBricks, attic: bgAttic });
