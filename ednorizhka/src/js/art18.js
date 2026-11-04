'use strict';
/* ===== Частина 18: Повітряна куля, Сніжна долина, Крижана рівнина, Санна траса, Айсберг Пінгвіна ===== */
Object.assign(THEMES, {
  hotair: { sky: ['#7fc8ff', '#bfe6ff', '#fff1f8'], panel: '#1f3a6a', top: '#ffffff', topHi: '#ffffff', topLo: '#cfe0f5', fill: '#b9a3e8', fillLo: '#9f88d6', dots: ['#d6c8ff', '#ffffff', '#ffd6f0'], block: 'balloonblock', ice: false, topStyle: 'snow', dotShape: 'dot' },
  snowvalley: { sky: ['#9fd0ff', '#d6ecff', '#ffffff'], panel: '#24506f', top: '#ffffff', topHi: '#ffffff', topLo: '#c9e0f5', fill: '#8fb8e6', fillLo: '#7aa4d6', dots: ['#c9e4ff', '#ffffff', '#a8c8f0'], block: 'snowbrick', ice: false, topStyle: 'snow', dotShape: 'dot' },
  polarice: { sky: ['#0f1a45', '#1d3a6a', '#2f6a8a'], panel: '#0a1230', top: '#e6f4ff', topHi: '#ffffff', topLo: '#a8c8e8', fill: '#4a6aa8', fillLo: '#3a5490', dots: ['#7a9ad9', '#c9e4ff', '#9fffe0'], block: 'icecube', ice: false, topStyle: 'snow', dotShape: 'dot' },
  sledtrack: { sky: ['#b3dcff', '#e0f2ff', '#ffffff'], panel: '#1f4a6a', top: '#ffffff', topHi: '#ffffff', topLo: '#cfe2f5', fill: '#a8c4e6', fillLo: '#93b0d9', dots: ['#d6e8ff', '#ffffff', '#ff9fc4'], block: 'snowbrick', ice: false, topStyle: 'snow', dotShape: 'dot' },
  iceberg: { sky: ['#8fd0ff', '#c9ecff', '#f2fbff'], panel: '#14385a', top: '#ffffff', topHi: '#ffffff', topLo: '#bfe4f5', fill: '#7fc4e8', fillLo: '#5fb0dc', dots: ['#bfe8ff', '#ffffff', '#9fd8f5'], block: 'icebrick', ice: false, topStyle: 'snow', fillStyle: 'streaks' },
});

/* ===== Вороги ===== */
function drawSeal(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  const b = Math.sin(t * 6) * 1.5;
  c.fillStyle = flash ? '#fff' : '#9fb0c9';
  c.beginPath(); c.moveTo(-14, -2); c.quadraticCurveTo(-16, -12, -4, -13 + b); c.quadraticCurveTo(8, -14 + b, 11, -6); c.quadraticCurveTo(13, 0, 6, 0); c.lineTo(-10, 0); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-13, -3); c.lineTo(-19, -7); c.lineTo(-18, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#c9d4e6'; ell(c, 1, -4, 6, 3); c.fill();
  c.fillStyle = INK; circ(c, 6, -9 + b, 1.3); c.fill();
  c.fillStyle = '#5a5a7a'; circ(c, 11, -6, 1.4); c.fill();
  c.strokeStyle = 'rgba(59,31,79,.5)'; c.lineWidth = 0.7; c.beginPath(); c.moveTo(10, -5); c.lineTo(15, -6); c.moveTo(10, -4.5); c.lineTo(15, -3.5); c.stroke();
  c.fillStyle = '#ff9fbf'; circ(c, 4, -6 + b, 1.2); c.fill();
  c.restore();
}
function drawFlake(c, x, y, t, flash) {
  c.save(); c.translate(x, y); c.rotate(t * 1.2); c.lineCap = 'round';
  c.strokeStyle = flash ? '#fff' : '#7fc8ff'; c.lineWidth = 3.4;
  for (let i = 0; i < 3; i++) { c.save(); c.rotate(i * Math.PI / 3); c.beginPath(); c.moveTo(-10, 0); c.lineTo(10, 0); c.stroke(); c.restore(); }
  c.strokeStyle = '#ffffff'; c.lineWidth = 1.6;
  for (let i = 0; i < 6; i++) { c.save(); c.rotate(i * Math.PI / 3); c.beginPath(); c.moveTo(0, 0); c.lineTo(9, 0); c.moveTo(6, 0); c.lineTo(8.5, -2.6); c.moveTo(6, 0); c.lineTo(8.5, 2.6); c.stroke(); c.restore(); }
  c.rotate(-t * 1.2); c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 0.9; circ(c, 0, 0, 4.4); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, -1.4, -0.6, 0.7); c.fill(); circ(c, 1.4, -0.6, 0.7); c.fill();
  c.restore();
}
function drawEnemy14(c, e, cx, fl) {
  switch (e.k) {
    case 'seal': drawSeal(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
    case 'flake': drawFlake(c, cx, e.y + e.h / 2, e.t, fl); return true;
  }
  return drawEnemy15(c, e, cx, fl);
}

/* ===== Плитки: крижані шипи ===== */
Object.assign(TILE7, { icespike: 1 });
function tileKind14(v, tx, ty) { return tileKind15(v, tx, ty); }
function drawTile14(c, kind) {
  if (kind === 'icespike') {
    const th = THEMES[G.theme] || THEMES.ice;
    c.fillStyle = th.fill; c.fillRect(0, 12, T, T - 12);
    c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1;
    for (const [x0, h] of [[0, 14], [8, 18], [16, 13]]) {
      c.fillStyle = '#dff4ff'; c.beginPath(); c.moveTo(x0, 14); c.lineTo(x0 + 4, 14 - h + 2); c.lineTo(x0 + 8, 14); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.9)'; c.beginPath(); c.moveTo(x0 + 2.4, 13); c.lineTo(x0 + 4, 16 - h); c.lineTo(x0 + 4, 13); c.closePath(); c.fill();
    }
    return;
  }
  drawTile15(c, kind);
}

/* ===== Повітряна куля ===== */
function drawHotair(c, m, t) {
  const cx = m.x + m.w / 2, ecy = m.y - HOT_GAP - HOT_ENV, r = HOT_ENV;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  // мотузки
  c.strokeStyle = '#8a5a30'; c.lineWidth = 1.2; c.beginPath();
  c.moveTo(m.x + 4, m.y); c.lineTo(cx - r * 0.55, ecy + r * 0.8); c.moveTo(m.x + m.w - 4, m.y); c.lineTo(cx + r * 0.55, ecy + r * 0.8);
  c.moveTo(cx - 6, m.y); c.lineTo(cx - 4, ecy + r); c.moveTo(cx + 6, m.y); c.lineTo(cx + 4, ecy + r); c.stroke();
  // полум'я пальника
  const f = m.burn || 0;
  if (f > 0.05) { c.save(); c.globalAlpha = f; const fl = 8 + Math.sin(t * 40) * 3; c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(cx - 5, m.y - 6); c.quadraticCurveTo(cx, m.y - 8 - fl * 1.6, cx + 5, m.y - 6); c.closePath(); c.fill(); c.fillStyle = '#fff3a8'; c.beginPath(); c.moveTo(cx - 2.4, m.y - 6); c.quadraticCurveTo(cx, m.y - 8 - fl, cx + 2.4, m.y - 6); c.closePath(); c.fill(); c.restore(); }
  c.fillStyle = '#8a8aa8'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, cx - 5, m.y - 6, 10, 5, 1.5); c.fill(); c.stroke();
  // конверт у смужки
  c.save(); c.beginPath(); c.moveTo(cx - r * 0.42, ecy + r * 0.96); c.bezierCurveTo(cx - r * 1.25, ecy + r * 0.3, cx - r * 1.15, ecy - r * 1.05, cx, ecy - r); c.bezierCurveTo(cx + r * 1.15, ecy - r * 1.05, cx + r * 1.25, ecy + r * 0.3, cx + r * 0.42, ecy + r * 0.96); c.closePath(); c.clip();
  const cols = ['#ff5c7a', '#ffd23f', '#4cb6ff', '#7fd46a', '#b48cff'];
  for (let i = -3; i <= 3; i++) { c.fillStyle = cols[(i + 10) % cols.length]; c.fillRect(cx + i * 10 - 5, ecy - r - 2, 10, r * 2 + 4); }
  c.fillStyle = 'rgba(255,255,255,.35)'; ell(c, cx - r * 0.45, ecy - r * 0.45, r * 0.22, r * 0.4, 0.3); c.fill();
  c.restore();
  c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(cx - r * 0.42, ecy + r * 0.96); c.bezierCurveTo(cx - r * 1.25, ecy + r * 0.3, cx - r * 1.15, ecy - r * 1.05, cx, ecy - r); c.bezierCurveTo(cx + r * 1.15, ecy - r * 1.05, cx + r * 1.25, ecy + r * 0.3, cx + r * 0.42, ecy + r * 0.96); c.closePath(); c.stroke();
  c.fillStyle = '#ff7ab8'; rr(c, cx - r * 0.42, ecy + r * 0.9, r * 0.84, 5, 2); c.fill(); c.stroke();
  // кошик (задня стінка)
  drawBasket14(c, m.x, m.y, m.w, false);
  c.restore();
}
function drawBasket14(c, x, y, w, front) {
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = front ? '#d9a36c' : '#b8844f'; rr(c, x, y + (front ? 4 : 0), w, HOT_BASKET - (front ? 4 : 0), 3); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(90,58,36,.55)'; c.lineWidth = 1; c.beginPath();
  for (let k = 6; k < w; k += 7) { c.moveTo(x + k, y + (front ? 6 : 2)); c.lineTo(x + k, y + HOT_BASKET - 2); } c.moveTo(x + 2, y + 11); c.lineTo(x + w - 2, y + 11); c.stroke();
  if (front) { c.fillStyle = '#8a5a30'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, x - 2, y + 3, w + 4, 4, 2); c.fill(); c.stroke(); }
  c.restore();
}

/* ===== Сніжка ===== */
function drawSnowballBig(c, m, t) {
  const cx = m.cx, cy = m.gy - m.r, r = m.r, a = cx / Math.max(6, r);
  c.save(); c.lineJoin = 'round';
  c.fillStyle = 'rgba(59,31,79,.15)'; ell(c, cx, m.gy - 1, r * 0.9, 3); c.fill();
  c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.4; circ(c, cx, cy, r); c.fill(); c.stroke();
  c.save(); circ(c, cx, cy, r); c.clip();
  c.fillStyle = '#d6e8ff'; ell(c, cx + r * 0.35, cy + r * 0.4, r * 0.9, r * 0.75); c.fill();
  c.fillStyle = 'rgba(160,190,230,.6)';
  for (let i = 0; i < 5; i++) { const ang = a + i * 1.26, rr2 = r * (0.3 + (i % 3) * 0.2); circ(c, cx + Math.cos(ang) * rr2, cy + Math.sin(ang) * rr2, Math.max(1.4, r * 0.09)); c.fill(); }
  c.restore();
  c.fillStyle = 'rgba(255,255,255,.95)'; ell(c, cx - r * 0.4, cy - r * 0.45, r * 0.25, r * 0.15, -0.6); c.fill();
  if (m.r >= m.rMax - 0.5) sparkle(c, cx + r * 0.6, cy - r * 0.7, 2.4, '#bfefff');
  c.restore();
}

/* ===== Санчата ===== */
function drawSled(c, x, gy, dir) {
  c.save(); c.translate(x, gy); c.scale(dir || 1, 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  c.strokeStyle = '#ff4f6d'; c.lineWidth = 2.6; c.beginPath(); c.moveTo(-15, -1); c.lineTo(12, -1); c.quadraticCurveTo(18, -1, 17, -7); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(-15, 0.4); c.lineTo(12, 0.4); c.stroke();
  c.strokeStyle = '#8a5a30'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-10, -1); c.lineTo(-10, -5); c.moveTo(8, -1); c.lineTo(8, -5); c.stroke();
  c.fillStyle = '#d9a36c'; c.strokeStyle = INK; c.lineWidth = 1.1; rr(c, -14, -8, 26, 4, 2); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(90,58,36,.5)'; c.beginPath(); c.moveTo(-6, -7.5); c.lineTo(-6, -4.5); c.moveTo(2, -7.5); c.lineTo(2, -4.5); c.stroke();
  c.restore();
}

/* ===== Зірочка-втікачка ===== */
function drawRunner(c, r, t) {
  const hop = r.state === 'run' ? Math.abs(Math.sin(r.hop)) * 8 : Math.abs(Math.sin(r.hop)) * 2, shake = r.cornered ? Math.sin(t * 50) * 1.4 : 0;
  const x = r.x + shake, y = r.gy - 14 - hop, fr = r.freeze > 0;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  c.fillStyle = 'rgba(59,31,79,.18)'; ell(c, r.x, r.gy - 1, 9 - hop * 0.4, 2.4); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1.6;
  const lg = r.state === 'run' ? Math.sin(r.hop * 2) * 4 : 0;
  c.beginPath(); c.moveTo(x - 3, y + 7); c.lineTo(x - 4 - lg, y + 13 + hop * 0.3); c.moveTo(x + 3, y + 7); c.lineTo(x + 4 + lg, y + 13 + hop * 0.3); c.stroke();
  const g = c.createRadialGradient(x, y, 2, x, y, 22); g.addColorStop(0, 'rgba(255,240,150,.6)'); g.addColorStop(1, 'rgba(255,240,150,0)'); c.fillStyle = g; circ(c, x, y, 22); c.fill();
  c.fillStyle = fr ? '#bfefff' : '#ffd23f'; c.lineWidth = 1.4; starPath(c, x, y, 13, 6, Math.sin(t * 2) * 0.1); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, x - 4, y - 5, 2.6, 1.6, -0.5); c.fill();
  c.fillStyle = INK;
  if (r.cornered) { c.lineWidth = 1.2; c.beginPath(); c.arc(x - 3, y - 1, 1.6, 0, TAU); c.stroke(); c.beginPath(); c.arc(x + 3, y - 1, 1.6, 0, TAU); c.stroke(); }
  else { circ(c, x - 3, y - 1, 1.3); c.fill(); circ(c, x + 3, y - 1, 1.3); c.fill(); }
  c.lineWidth = 1.1; c.beginPath(); if (r.state === 'run') c.arc(x, y + 3, 2, 0, TAU); else c.arc(x, y + 1.6, 2.4, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
  c.fillStyle = '#ff9fbf'; circ(c, x - 6, y + 2, 1.4); c.fill(); circ(c, x + 6, y + 2, 1.4); c.fill();
  if (fr) { c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 1.2; for (let i = 0; i < 4; i++) { const a = t * 2 + i * 1.6; c.beginPath(); c.moveTo(x + Math.cos(a) * 15, y + Math.sin(a) * 15); c.lineTo(x + Math.cos(a) * 19, y + Math.sin(a) * 19); c.stroke(); } }
  c.restore();
}

function drawMover14(c, m) {
  if (m.hotair) { drawHotair(c, m, G.t); return true; }
  if (m.snowball) { drawSnowballBig(c, m, G.t); return true; }
  return drawMover15(c, m);
}
function drawWorld14(c, t, vis) {
  for (const s of G.sleds) if (s.state !== 'ride' && vis(s.x)) drawSled(c, s.x, s.gy, 1);
  for (const s of G.sleds) if (s.state === 'idle' && vis(s.x1)) { c.save(); c.strokeStyle = '#8a5a30'; c.lineWidth = 2; c.beginPath(); c.moveTo(s.x1, s.gy); c.lineTo(s.x1, s.gy - 40); c.stroke(); c.fillStyle = '#ff5c7a'; c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(s.x1, s.gy - 40); c.lineTo(s.x1 + 18, s.gy - 34); c.lineTo(s.x1, s.gy - 28); c.closePath(); c.fill(); c.stroke(); c.restore(); }
  for (const r of G.runners) if (r.state !== 'caught' && vis(r.x)) drawRunner(c, r, t);
  drawWorld15(c, t, vis);
}
function drawUnderPlayer(c, P, t) {
  if (P.sled) drawSled(c, P.x + P.w / 2, P.y + P.h + 1, 1);
  drawUnder15(c, P, t);
}
function drawOverPlayer(c, P, t) {
  if (P.hotair) drawBasket14(c, P.hotair.x, P.hotair.y, P.hotair.w, true);
  drawOver15(c, P, t);
}

/* ===== Пінгвін Ковзанчик ===== */
function drawPenguinBoss(c, B, t) {
  const st = B.state, fl = B.flash > 0, dark = fl ? '#fff' : '#2f3a66', happy = B.dead, d = B.dir || 1;
  c.save(); c.translate(B.x, B.gy); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.6;
  if (st === 'slide' || st === 'spin') {
    if (st === 'spin') c.rotate(B.spin);
    c.scale(d, 1);
    c.fillStyle = dark; ell(c, 0, -11, 24, 11); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; ell(c, 2, -6, 18, 6); c.fill();
    c.fillStyle = '#4cb6ff'; rr(c, 10, -20, 8, 6, 3); c.fill(); c.stroke();
    c.fillStyle = '#fff'; circ(c, 20, -15, 3); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 21, -15, 1.4); c.fill();
    c.fillStyle = '#ff9a3d'; c.beginPath(); c.moveTo(24, -13); c.lineTo(32, -11); c.lineTo(24, -9); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ff9a3d'; ell(c, -24, -10, 4, 2.4, 0.3); c.fill(); c.stroke(); ell(c, -24, -5, 4, 2.4, -0.3); c.fill(); c.stroke();
    c.fillStyle = dark; ell(c, 0, -20, 9, 3, -0.2); c.fill(); c.stroke();
    c.restore(); return;
  }
  c.scale(d, 1);
  const bob = st === 'prep' ? 6 : 0, dizzy = st === 'dizzy';
  c.fillStyle = '#ff9a3d'; ell(c, -7, -2, 6, 3); c.fill(); c.stroke(); ell(c, 8, -2, 6, 3); c.fill(); c.stroke();
  c.fillStyle = dark; ell(c, 0, -24 + bob * 0.5, 17, 23 - bob * 0.5); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; ell(c, 3, -20 + bob * 0.5, 11, 17 - bob * 0.4); c.fill();
  // крила
  const wing = st === 'throw' && B.st > 0.5 ? -1.4 : happy ? -1 + Math.sin(t * 8) * 0.3 : 0.3;
  c.save(); c.translate(13, -30 + bob); c.rotate(wing); c.fillStyle = dark; ell(c, 3, 8, 4.4, 12); c.fill(); c.stroke(); c.restore();
  c.save(); c.translate(-14, -30 + bob); c.rotate(-0.3); c.fillStyle = dark; ell(c, -2, 8, 4.4, 12); c.fill(); c.stroke(); c.restore();
  // шарф
  c.fillStyle = '#4cb6ff'; rr(c, -12, -38 + bob, 24, 6, 3); c.fill(); c.stroke();
  c.fillStyle = '#ff5c7a'; rr(c, -14, -36 + bob, 6, 13, 3); c.fill(); c.stroke();
  // голова
  c.fillStyle = dark; circ(c, 0, -46 + bob, 13); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; ell(c, 4, -45 + bob, 8, 7); c.fill();
  if (dizzy) { c.lineWidth = 1.3; for (const ex of [1, 8]) { c.beginPath(); c.moveTo(ex - 2, -49 + bob); c.lineTo(ex + 2, -45 + bob); c.moveTo(ex + 2, -49 + bob); c.lineTo(ex - 2, -45 + bob); c.stroke(); } }
  else if (happy) { c.lineWidth = 1.4; for (const ex of [1, 8]) { c.beginPath(); c.arc(ex, -46 + bob, 2, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); } }
  else { c.fillStyle = INK; circ(c, 1.5, -47 + bob, 1.7); c.fill(); circ(c, 8, -47 + bob, 1.7); c.fill(); c.fillStyle = '#fff'; circ(c, 2, -47.6 + bob, 0.6); c.fill(); circ(c, 8.5, -47.6 + bob, 0.6); c.fill(); }
  c.fillStyle = '#ff9a3d'; c.strokeStyle = INK; c.lineWidth = 1.3; c.beginPath(); c.moveTo(9, -43 + bob); c.lineTo(19, -41 + bob); c.lineTo(9, -38 + bob); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,110,170,.55)'; circ(c, 11, -37 + bob, 1.8); c.fill();
  // шапочка з помпоном
  c.fillStyle = '#ff5c7a'; c.beginPath(); c.moveTo(-12, -53 + bob); c.quadraticCurveTo(0, -70 + bob, 11, -55 + bob); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; circ(c, -1, -66 + bob, 4); c.fill(); c.stroke();
  if (st === 'throw' && B.st > 0.4) { c.save(); c.translate(17, -42); drawSnowball(c, 0, 0); c.restore(); }
  c.restore();
  if (dizzy) for (let i = 0; i < 3; i++) { const a = t * 4 + i * TAU / 3; c.fillStyle = '#ffd23f'; starPath(c, B.x + Math.cos(a) * 16, B.gy - 66 + Math.sin(a) * 5, 4, 1.8, a); c.fill(); c.strokeStyle = INK; c.lineWidth = 0.7; c.stroke(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, B.gy - 86 - k * 30, 9); c.fillStyle = ['#ff7ab8', '#ffd23f', '#4cb6ff'][i]; c.fill(); c.restore(); }
}

/* ===== Блоки ===== */
function drawBlock15(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'balloonblock') {
    // щільна грозова хмаринка: крізь неї куля не пролетить
    c.fillStyle = '#d9d2f5'; rr(c, 0.5, 0.5, T - 1, T - 1, 9); c.fill(); c.stroke();
    c.fillStyle = '#eeeaff'; circ(c, 7, 8, 5); c.fill(); circ(c, 15, 7, 6); c.fill();
    c.fillStyle = '#ffffff'; ell(c, 9, 6, 3, 1.6, -0.4); c.fill();
    c.fillStyle = 'rgba(120,100,180,.35)'; ell(c, 12, 18, 8, 2.4); c.fill();
  } else if (b === 'snowbrick') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#e6f2ff'; c.fill(); c.stroke();
    c.strokeStyle = 'rgba(120,160,210,.7)'; c.lineWidth = 1; c.beginPath(); c.moveTo(1, 12); c.lineTo(T - 1, 12); c.moveTo(12, 1); c.lineTo(12, 12); c.moveTo(6, 12); c.lineTo(6, T - 1); c.moveTo(18, 12); c.lineTo(18, T - 1); c.stroke();
    c.fillStyle = '#ffffff'; rr(c, 1, 1, T - 2, 4, 2); c.fill();
  } else if (b === 'icebrick') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#bfe8ff'; c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.moveTo(4, 18); c.lineTo(10, 4); c.lineTo(13, 4); c.lineTo(7, 18); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.moveTo(13, 20); c.lineTo(18, 9); c.lineTo(20, 9); c.lineTo(15, 20); c.closePath(); c.fill();
  } else return drawBlock16(c, b);
  return true;
}

/* ===== Декор ===== */
function drawDecor18(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'slalom':
      c.strokeStyle = '#8a5a30'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 22); c.stroke();
      c.fillStyle = d.c || '#ff5c7a'; c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x, y - 22); c.lineTo(x + 11, y - 18 + Math.sin(t * 4 + x) * 1.5); c.lineTo(x, y - 14); c.closePath(); c.fill(); c.stroke();
      break;
    case 'fishS':
      c.fillStyle = '#9fd8ff'; ell(c, x, y - 4, 6, 3); c.fill(); c.stroke(); c.beginPath(); c.moveTo(x - 5, y - 4); c.lineTo(x - 10, y - 7); c.lineTo(x - 10, y - 1); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = INK; circ(c, x + 3, y - 5, 0.8); c.fill();
      break;
    case 'iglooS':
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(x, y, 12, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = 'rgba(120,160,210,.8)'; c.beginPath(); c.moveTo(x - 11, y - 5); c.lineTo(x + 11, y - 5); c.moveTo(x - 6, y - 10); c.lineTo(x + 6, y - 10); c.stroke();
      c.fillStyle = '#5a6a9a'; c.strokeStyle = INK; c.beginPath(); c.arc(x, y, 4, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
      break;
    default: drawDecor19(c, d, t);
  }
}

/* ===== Фони ===== */
function peaks18(c, viewW, camX, k, base, h, col, snow) {
  const span = 180;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * k, span);
    c.fillStyle = col; c.beginPath(); c.moveTo(wx - 20, base); c.lineTo(wx + 70, base - h - (i % 2 ? 0 : 18)); c.lineTo(wx + 160, base); c.closePath(); c.fill();
    if (snow) { c.fillStyle = snow; c.beginPath(); const tx = wx + 70, ty = base - h - (i % 2 ? 0 : 18); c.moveTo(tx, ty); c.lineTo(tx - 22, ty + 26); c.lineTo(tx - 8, ty + 20); c.lineTo(tx + 2, ty + 28); c.lineTo(tx + 12, ty + 20); c.lineTo(tx + 22, ty + 26); c.closePath(); c.fill(); }
  }
}
function bgHotair(c, viewW, camX, t) {
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 190 - camX * 0.12 + t * 8, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 30, 1, 'rgba(255,255,255,.95)'); }
  for (let i = 0; i < 4; i++) {
    const x = wrapX(i * 260 - camX * 0.2 + t * 6, viewW + 120) - 60, y = 60 + (i % 2) * 40 + Math.sin(t * 0.8 + i) * 6, col = ['#ffd23f', '#ff9fd0', '#9fe0ff', '#b8f0a8'][i];
    c.fillStyle = col; circ(c, x, y, 9); c.fill(); c.fillStyle = '#c98d55'; c.fillRect(x - 3, y + 12, 6, 4); c.strokeStyle = 'rgba(138,90,48,.6)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x - 6, y + 5); c.lineTo(x - 3, y + 12); c.moveTo(x + 6, y + 5); c.lineTo(x + 3, y + 12); c.stroke();
  }
  peaks18(c, viewW, camX, 0.15, 230, 90, '#b8c4e6', '#ffffff');
  peaks18(c, viewW, camX + 90, 0.3, 250, 60, '#9fb0d9', '#f2f8ff');
}
function bgSnowvalley(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  peaks18(c, viewW, camX, 0.12, 200, 80, '#c9d8f0', '#ffffff');
  hill(c, viewW, 200, 10, 0.012, 0.4, camX * 0.25, '#e6f0ff');
  const span = 120;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.35, span) + 30; c.fillStyle = '#5a9a7a'; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(wx - 14 + k * 3, 200 - k * 12); c.lineTo(wx, 176 - k * 12); c.lineTo(wx + 14 - k * 3, 200 - k * 12); c.closePath(); c.fill(); } c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(wx - 6, 168); c.lineTo(wx, 152); c.lineTo(wx + 6, 168); c.closePath(); c.fill(); }
  c.fillStyle = 'rgba(255,255,255,.9)'; for (let i = 0; i < 40; i++) { const x = wrapX(i * 97 - camX * 0.5 + Math.sin(t + i) * 10, viewW + 20) - 10, y = (i * 53 + t * (14 + i % 5 * 3)) % VIEW_H; circ(c, x, y, 1 + (i % 3) * 0.5); c.fill(); }
}
function bgPolarice(c, viewW, camX, t) {
  const R = rng(77);
  for (let i = 0; i < 70; i++) { const x = wrapX(R() * 1500 - camX * 0.04, viewW + 20) - 10, y = R() * 160, tw = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.3); c.fillStyle = `rgba(255,255,255,${0.3 + tw * 0.6})`; circ(c, x, y, 0.6 + R() * 1.1); c.fill(); }
  for (let b = 0; b < 3; b++) {
    const col = ['rgba(120,255,190,.32)', 'rgba(150,170,255,.28)', 'rgba(255,140,220,.22)'][b];
    c.fillStyle = col; c.beginPath();
    for (let x = -20; x <= viewW + 20; x += 12) { const y = 50 + b * 22 + Math.sin(x * 0.012 + t * 0.6 + b * 2 - camX * 0.002) * 18; if (x === -20) c.moveTo(x, y); else c.lineTo(x, y); }
    for (let x = viewW + 20; x >= -20; x -= 12) { const y = 90 + b * 22 + Math.sin(x * 0.01 + t * 0.5 + b - camX * 0.002) * 14; c.lineTo(x, y); }
    c.closePath(); c.fill();
  }
  peaks18(c, viewW, camX, 0.12, 220, 70, '#2a4a7a', '#c9e0ff');
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.4, '#3a5a8a');
}
function bgSledtrack(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  peaks18(c, viewW, camX, 0.1, 210, 110, '#c4d4ee', '#ffffff');
  const span = 220;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.3, span); c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 6; c.beginPath(); c.moveTo(wx, 150); c.quadraticCurveTo(wx + 80, 170, wx + 200, 215); c.stroke(); for (let k = 0; k < 3; k++) { const fx = wx + 40 + k * 60, fy = 156 + k * 18; c.strokeStyle = '#8a5a30'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(fx, fy); c.lineTo(fx, fy - 14); c.stroke(); c.fillStyle = k % 2 ? '#4cb6ff' : '#ff5c7a'; c.fillRect(fx, fy - 14, 7, 5); } }
  hill(c, viewW, 212, 6, 0.03, 1.2, camX * 0.45, '#eef5ff');
}
function bgIceberg(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  c.fillStyle = '#4aa8dc'; c.fillRect(0, 176, viewW, VIEW_H - 176);
  const span = 260;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.25, span) + 50; c.fillStyle = '#eaf8ff'; c.beginPath(); c.moveTo(wx - 40, 178); c.lineTo(wx - 20, 130); c.lineTo(wx + 4, 140); c.lineTo(wx + 26, 112); c.lineTo(wx + 50, 178); c.closePath(); c.fill(); c.fillStyle = '#bfe4f5'; c.beginPath(); c.moveTo(wx + 26, 112); c.lineTo(wx + 50, 178); c.lineTo(wx + 20, 178); c.closePath(); c.fill(); }
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1.4;
  for (let row = 0; row < 3; row++) { c.beginPath(); for (let x = -20; x < viewW + 20; x += 6) { const y = 188 + row * 16 + Math.sin(x * 0.05 + t * 1.6 + row * 2) * 2; if (x === -20) c.moveTo(x, y); else c.lineTo(x, y); } c.stroke(); }
}
Object.assign(BG2, { hotair: bgHotair, snowvalley: bgSnowvalley, polarice: bgPolarice, sledtrack: bgSledtrack, iceberg: bgIceberg });
