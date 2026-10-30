'use strict';
/* ===== Частина 13: Савана кенгуру, Долина пір року, Острів тарзанок, Країна настільних ігор, Замок Кубика ===== */
Object.assign(THEMES, {
  savanna: { sky: ['#ffc98a', '#ffe2b0', '#fff4d6'], panel: '#5a3a1a', top: '#d9c45a', topHi: '#f2e08a', topLo: '#a8923a', fill: '#c9784a', fillLo: '#a85f36', dots: ['#e09a6a', '#8a4a2a', '#f2c09a'], block: 'termite', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  seasonS: { sky: ['#9fdcff', '#d6f2ff', '#f6ffe0'], panel: '#24502f', top: '#6fcf5a', topHi: '#a8ef8f', topLo: '#3f9e4f', fill: '#9a6a42', fillLo: '#7a4f30', dots: ['#b8865a', '#5a3a24', '#d9a878'], block: 'leafbox', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  seasonW: { sky: ['#a8c4ee', '#d6e6ff', '#f4f8ff'], panel: '#2a3a6a', top: '#ffffff', topHi: '#ffffff', topLo: '#cfdaf5', fill: '#8a7aa8', fillLo: '#766896', dots: ['#c9d2ff', '#ffffff', '#b8c4f5'], block: 'snowbox', ice: false, topStyle: 'snow', dotShape: 'dot' },
  rings: { sky: ['#7fe0e8', '#c4f4f0', '#fff6dc'], panel: '#135a5a', top: '#fff0c4', topHi: '#ffffff', topLo: '#e9c886', fill: '#f3cf8e', fillLo: '#e2b56d', dots: ['#fff4d6', '#f5a3b5', '#ffffff', '#d9a86a'], block: 'bamboo', ice: false, topStyle: 'sand', dotShape: 'dot' },
  board: { sky: ['#d6ecff', '#eaf4ff', '#fff6ec'], panel: '#2a2a5a', top: '#7a5ad9', topHi: '#a88cff', topLo: '#5a3ab8', fill: '#fff3e0', fillLo: '#2a2a4a', dots: [], block: 'dieblock', ice: false, topStyle: 'stone', fillStyle: 'checker' },
  dicecastle: { sky: ['#ffb8c9', '#ffd9e0', '#fff0e6'], panel: '#4a1f3a', top: '#d6c8e6', topHi: '#f0e8ff', topLo: '#a898c4', fill: '#8a7aa8', fillLo: '#766896', dots: [], block: 'reddie', ice: false, topStyle: 'stone', fillStyle: 'bricks' },
});
Object.assign(PLANKS, { rings: ['#d9a36c', '#a8743f'], board: ['#ffffff', '#ff5c7a'], dicecastle: ['#c98d55', '#8a5a30'], savanna: ['#c98d55', '#8a5a30'] });

/* ===== Вороги ===== */
function drawEchidna(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1;
  for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + i * 0.1), r0 = 8, r1 = 15 + (i % 2) * 2; c.fillStyle = i % 2 ? '#fff3e0' : '#5a3a24'; c.beginPath(); c.moveTo(Math.cos(a - 0.08) * r0 - 2, -2 + Math.sin(a - 0.08) * r0); c.lineTo(Math.cos(a) * r1 - 2, -2 + Math.sin(a) * r1); c.lineTo(Math.cos(a + 0.08) * r0 - 2, -2 + Math.sin(a + 0.08) * r0); c.closePath(); c.fill(); c.stroke(); }
  c.fillStyle = flash ? '#fff' : '#8a5a30'; ell(c, -1, -5, 11, 6); c.fill(); c.stroke();
  c.fillStyle = '#c9a07a'; c.beginPath(); c.moveTo(7, -6); c.quadraticCurveTo(16, -5, 19, -2); c.quadraticCurveTo(15, -1, 7, -2); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 8, -7, 1.1); c.fill();
  const st = Math.sin(t * 9) * 1.6; c.fillStyle = '#5a3a24'; ell(c, -6 + st, -0.6, 2.4, 1.4); c.fill(); ell(c, 4 - st, -0.6, 2.4, 1.4); c.fill();
  c.restore();
}
function drawKnight(c, x, gy, dir, t, air, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.3;
  c.fillStyle = flash ? '#fff' : '#3b3060';
  rr(c, -9, -5, 18, 5, 2); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-7, -5); c.lineTo(-6, -12); c.quadraticCurveTo(-9, -20, -4, -25); c.lineTo(0, -27); c.quadraticCurveTo(6, -26, 9, -20); c.lineTo(11, -15); c.lineTo(5, -14); c.quadraticCurveTo(2, -10, 7, -5); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#a88cff'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-5, -24); c.quadraticCurveTo(-9, -18, -6, -11); c.stroke();
  c.fillStyle = '#fff'; circ(c, 3, -20, 2.2); c.fill(); c.fillStyle = INK; circ(c, 3.6, -20, 1.1); c.fill();
  c.fillStyle = '#ff9fbf'; circ(c, 8, -16, 1.2); c.fill();
  c.restore();
  if (air) { c.fillStyle = 'rgba(59,31,79,.18)'; ell(c, x, gy + 2, 9, 2); c.fill(); }
}
function drawEnemy9(c, e, cx, fl) {
  switch (e.k) {
    case 'echidna': drawEchidna(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
    case 'knight': drawKnight(c, cx, e.y + e.h, e.dir, e.t, e.air, fl); return true;
  }
  return false;
}

/* ===== Плитки пір року ===== */
Object.assign(TILE7, { blank: 1, iceTop: 1, flower: 1, bud: 1, snowstep: 1, snowGhost: 1 });
function tileKind9(v) {
  if (v === 24) return 'blank';
  if (v === 25) return G.season === 'winter' ? 'iceTop' : 'blank';
  if (v === 26) return G.season === 'summer' ? 'flower' : 'bud';
  return G.season === 'winter' ? 'snowstep' : 'snowGhost';
}
function drawTile9(c, kind) {
  c.lineJoin = 'round'; c.lineCap = 'round';
  if (kind === 'iceTop') {
    c.fillStyle = '#d6f0ff'; c.strokeStyle = '#8fc6ee'; c.lineWidth = 1.2; c.fillRect(0, 2, T, T - 2); c.beginPath(); c.moveTo(0, 2); c.lineTo(T, 2); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(4, 8); c.lineTo(10, 6); c.moveTo(14, 14); c.lineTo(20, 11); c.stroke();
  } else if (kind === 'flower') {
    c.strokeStyle = INK; c.lineWidth = 1.2;
    c.fillStyle = '#ff7ab8'; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ell(c, T / 2 + Math.cos(a) * 7, 8 + Math.sin(a) * 3, 6, 3.4, a); c.fill(); c.stroke(); }
    c.fillStyle = '#ffd23f'; ell(c, T / 2, 8, 5, 3); c.fill(); c.stroke();
    c.strokeStyle = '#4f9a48'; c.lineWidth = 2; c.beginPath(); c.moveTo(T / 2, 12); c.lineTo(T / 2, T); c.stroke();
  } else if (kind === 'bud') {
    c.strokeStyle = 'rgba(79,154,72,.5)'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(T / 2, 12); c.lineTo(T / 2, T); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.75)'; ell(c, T / 2, 10, 4, 3); c.fill();
    c.fillStyle = 'rgba(255,122,184,.45)'; ell(c, T / 2, 12, 3, 3.6); c.fill();
  } else if (kind === 'snowstep') {
    c.strokeStyle = '#a8c4ee'; c.lineWidth = 1.3; rr(c, 1, 2, T - 2, T - 3, 7); c.fillStyle = '#ffffff'; c.fill(); c.stroke();
    c.fillStyle = '#e6f0ff'; ell(c, T / 2, T - 6, 8, 3); c.fill();
    c.fillStyle = '#c9dcff'; circ(c, 7, 8, 1.2); c.fill(); circ(c, 16, 12, 1); c.fill();
  } else if (kind === 'snowGhost') {
    c.strokeStyle = 'rgba(168,196,238,.55)'; c.lineWidth = 1.3; c.setLineDash([3, 3]); rr(c, 1.5, 2.5, T - 3, T - 4, 7); c.stroke(); c.setLineDash([]);
  }
}

/* ===== Кенгуру ===== */
function drawKangaroo(c, x, gy, dir, t, hop, rider) {
  c.save(); c.translate(x, gy - hop); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.4; const fur = '#d9925a', light = '#f6d3a8';
  c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(-8, -6); c.quadraticCurveTo(-22, -2, -26, 2); c.stroke(); c.strokeStyle = fur; c.lineWidth = 4; c.stroke();
  c.fillStyle = fur; c.strokeStyle = INK; c.lineWidth = 1.3;
  rr(c, -6 - (hop > 2 ? 2 : 0), -4, 14, 4, 2); c.fill(); c.stroke();
  ell(c, -2, -10, 10, 9); c.fill(); c.stroke();
  c.fillStyle = light; ell(c, 2, -9, 5, 6); c.fill();
  if (!rider) {
    ell(c, 6, -20, 6, 8, 0.3); c.fillStyle = fur; c.fill(); c.stroke();
    c.save(); c.translate(9, -28); c.fillStyle = fur;
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(-1 + s * 2, -4); c.lineTo(s * 4 - 1, -13); c.lineTo(s * 5 + 2, -4); c.closePath(); c.fill(); c.stroke(); }
    ell(c, 0, 0, 7, 6); c.fill(); c.stroke();
    c.fillStyle = light; ell(c, 4, 2, 4, 3); c.fill();
    c.fillStyle = INK; circ(c, 2, -1.4, 1.2); c.fill(); circ(c, 7.4, 1.2, 1.1); c.fill();
    c.restore();
  } else {
    c.save(); c.translate(14, -16); c.fillStyle = fur;
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(-1 + s * 2, -4); c.lineTo(s * 4 - 1, -12); c.lineTo(s * 5 + 2, -4); c.closePath(); c.fill(); c.stroke(); }
    ell(c, 0, 0, 6.4, 5.4); c.fill(); c.stroke();
    c.fillStyle = light; ell(c, 3.6, 1.6, 3.6, 2.6); c.fill();
    c.fillStyle = INK; circ(c, 1.6, -1.2, 1.1); c.fill(); circ(c, 6.6, 1, 1); c.fill();
    c.restore();
  }
  c.restore();
}
function drawRooRide(c, P, t) {
  const hop = P.onGround && Math.abs(P.vx) > 20 ? Math.abs(Math.sin(t * 9)) * 4 : 0;
  drawKangaroo(c, P.x + P.w / 2, P.y + P.h + 1, P.dir, t, hop, true);
}
function drawTotem(c, tm, t) {
  const x = tm.x, gy = tm.gy, w = G.season === 'winter';
  c.save(); c.lineJoin = 'round';
  if (tm.glow > 0) { c.fillStyle = `rgba(255,255,255,${tm.glow * 0.6})`; circ(c, x, gy - 40, 26); c.fill(); }
  c.fillStyle = '#c98d55'; c.strokeStyle = INK; c.lineWidth = 1.3; rr(c, x - 4, gy - 34, 8, 34, 2); c.fill(); c.stroke();
  c.fillStyle = '#fffaf2'; circ(c, x, gy - 42, 12); c.fill(); c.stroke();
  c.fillStyle = tm.armed ? '#ffd23f' : '#c9a06a'; rr(c, x - 9, gy - 57, 18, 5, 2); c.fill(); c.stroke();
  // половина сонця, половина сніжинки; та, що буде після дотику, блимає
  c.save(); c.beginPath(); c.rect(x - 13, gy - 55, 13, 26); c.clip();
  c.fillStyle = '#ffd23f'; circ(c, x, gy - 42, 6); c.fill(); c.strokeStyle = '#ffb347'; c.lineWidth = 1.6; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + t * 0.5; c.beginPath(); c.moveTo(x + Math.cos(a) * 7.5, gy - 42 + Math.sin(a) * 7.5); c.lineTo(x + Math.cos(a) * 10, gy - 42 + Math.sin(a) * 10); c.stroke(); }
  c.restore();
  c.save(); c.beginPath(); c.rect(x, gy - 55, 13, 26); c.clip();
  c.strokeStyle = '#4cb6ff'; c.lineWidth = 1.6; for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3 - t * 0.5; c.beginPath(); c.moveTo(x - Math.cos(a) * 9, gy - 42 - Math.sin(a) * 9); c.lineTo(x + Math.cos(a) * 9, gy - 42 + Math.sin(a) * 9); c.stroke(); }
  c.restore();
  c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, x, gy - 42, 12); c.stroke();
  const k = 0.5 + 0.5 * Math.sin(t * 4);
  c.fillStyle = w ? `rgba(255,210,63,${0.3 + k * 0.5})` : `rgba(76,182,255,${0.3 + k * 0.5})`; sparkle(c, x + (w ? -15 : 15), gy - 56, 2.2, c.fillStyle);
  c.restore();
}
function drawFrozen(c, z, camX, viewW, t) {
  const x0 = Math.max(z.x0, camX - 10), x1 = Math.min(z.x1, camX + viewW + 10);
  if (x1 <= x0) return;
  const g = c.createLinearGradient(0, z.y, 0, VIEW_H); g.addColorStop(0, 'rgba(200,232,255,.75)'); g.addColorStop(1, 'rgba(140,190,240,.7)');
  c.fillStyle = g; c.fillRect(x0, z.y, x1 - x0, VIEW_H - z.y);
  c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1.2;
  for (let x = Math.floor(x0 / 60) * 60; x < x1; x += 60) { c.beginPath(); c.moveTo(x + 10, z.y + 20); c.lineTo(x + 24, z.y + 34); c.lineTo(x + 18, z.y + 50); c.stroke(); }
}

/* ===== Кільця-тарзанки ===== */
function drawRing(c, r, t) {
  c.save(); c.lineCap = 'round';
  c.fillStyle = '#4f9a48'; c.strokeStyle = INK; c.lineWidth = 1.2;
  ell(c, r.ax - 10, r.ay - 2, 9, 4, -0.3); c.fill(); c.stroke(); ell(c, r.ax + 10, r.ay - 3, 9, 4, 0.3); c.fill(); c.stroke();
  c.fillStyle = '#8a5a30'; circ(c, r.ax, r.ay, 3); c.fill(); c.stroke();
  c.strokeStyle = '#c98d55'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(r.ax, r.ay); c.lineTo(r.x, r.y - 6); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 4.6; circ(c, r.x, r.y, 6); c.stroke();
  c.strokeStyle = r.held ? '#ff7ab8' : '#ffd23f'; c.lineWidth = 2.8; circ(c, r.x, r.y, 6); c.stroke();
  if (!r.held) sparkle(c, r.x + 8, r.y - 6 + Math.sin(t * 4 + r.ax) * 1.5, 1.4, '#fff8c0');
  c.restore();
}

/* ===== Доміно ===== */
function drawDomino(c, d) {
  const px = d.x * T + T - 1, py = d.base * T, w = T - 2, h = 3 * T;
  c.save(); c.translate(px, py); c.rotate(d.a); c.lineJoin = 'round';
  c.fillStyle = '#fffaf2'; c.strokeStyle = INK; c.lineWidth = 1.6; rr(c, -w, -h, w, h, 5); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(59,31,79,.6)'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-w + 4, -h / 2); c.lineTo(-4, -h / 2); c.stroke();
  c.fillStyle = INK;
  const pip = (cx, cy, n) => { const pts = { 1: [[0, 0]], 2: [[-5, -8], [5, 8]], 3: [[-5, -9], [0, 0], [5, 9]], 4: [[-5, -8], [5, -8], [-5, 8], [5, 8]], 5: [[-5, -9], [5, -9], [0, 0], [-5, 9], [5, 9]], 6: [[-5, -10], [5, -10], [-5, 0], [5, 0], [-5, 10], [5, 10]] }[n]; for (const [dx, dy] of pts) { circ(c, cx + dx, cy + dy, 2.2); c.fill(); } };
  pip(-w / 2, -h * 0.75, 1 + (d.i * 2) % 6); pip(-w / 2, -h * 0.25, 1 + (d.i * 3 + 2) % 6);
  c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(-w + 3, -h + 4, 3, h - 8);
  c.restore();
}

/* ===== Літери ===== */
function drawLetterTile(c, l, t) {
  const y = l.y + Math.sin(t * 3 + l.t) * 2;
  c.save(); c.translate(l.x, y); c.rotate(Math.sin(t * 2 + l.t) * 0.08);
  c.fillStyle = 'rgba(255,240,170,.35)'; circ(c, 0, 0, 16); c.fill();
  c.fillStyle = '#f2d6a8'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, -11, -11, 22, 22, 4); c.fill(); c.stroke();
  c.fillStyle = '#e3bf86'; c.fillRect(-9, 7, 18, 2.4);
  c.fillStyle = INK; c.font = '900 15px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(l.ch, 0, 0.5);
  c.restore();
}
function drawHud9(c, x, top, H) {
  if (!G.letters.length) return;
  const n = G.letters.length, cw = 22, w = n * cw + 20;
  hudPill(c, x, top, w, H, G.letters.every(l => l.got) ? 'rgba(255,246,200,.95)' : null);
  c.font = '900 14px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  G.letters.forEach((l, i) => {
    const cx = x + 10 + i * cw + cw / 2, cy = top + H / 2;
    c.fillStyle = l.got ? '#f2d6a8' : 'rgba(59,31,79,.08)'; c.strokeStyle = l.got ? INK : 'rgba(59,31,79,.25)'; c.lineWidth = 1.2; rr(c, cx - 9, cy - 9, 18, 18, 3); c.fill(); c.stroke();
    if (l.got) { c.fillStyle = INK; c.fillText(l.ch, cx, cy + 1); }
  });
  c.textAlign = 'left';
}

/* ===== Кубик Кидайло ===== */
function dicePips(c, n, s, col) {
  const p = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] }[n] || [];
  c.fillStyle = col; for (const [dx, dy] of p) { circ(c, dx * s, dy * s, s * 0.42); c.fill(); }
}
function drawDiceBoss(c, B, t) {
  const st = B.state, flash = B.flash > 0, dizzy = st === 'dizzy', happy = B.dead;
  c.save(); c.translate(B.x, B.fy - 24); c.rotate(B.rot); c.lineJoin = 'round';
  c.fillStyle = flash ? '#fff' : '#ff5c7a'; c.strokeStyle = INK; c.lineWidth = 2;
  rr(c, -24, -24, 48, 48, 10); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.35)'; rr(c, -20, -21, 40, 8, 4); c.fill();
  const showN = st === 'show' || st === 'throw' || st === 'jump' || st === 'rest' || dizzy ? B.face : 0;
  if (showN) { c.fillStyle = 'rgba(255,255,255,.25)'; rr(c, -15, -2, 30, 22, 5); c.fill(); c.save(); c.translate(0, 9); dicePips(c, showN, 7, '#ffffff'); c.restore(); }
  // очі
  if (happy) { c.strokeStyle = INK; c.lineWidth = 2; for (const ex of [-9, 9]) { c.beginPath(); c.arc(ex, -12, 4, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); } }
  else if (dizzy) { c.strokeStyle = INK; c.lineWidth = 1.4; for (const ex of [-9, 9]) { c.beginPath(); for (let a = 0; a < 12; a++) { const r = 0.5 + a * 0.35; c.lineTo(ex + Math.cos(a * 1.1 + t * 9) * r * 0.85, -12 + Math.sin(a * 1.1 + t * 9) * r * 0.85); } c.stroke(); } }
  else { for (const ex of [-9, 9]) { c.fillStyle = '#fff'; ell(c, ex, -12, 4.4, 4.8); c.fill(); c.strokeStyle = INK; c.lineWidth = 1.2; c.stroke(); c.fillStyle = INK; circ(c, ex + (B.dir || 1) * 1.4, -11.6, 2.1); c.fill(); } c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(-14, -20); c.lineTo(-5, -18); c.moveTo(14, -20); c.lineTo(5, -18); c.stroke(); }
  if (!showN) { c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.arc(0, 4, 7, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }
  // корона
  c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-12, -24); c.lineTo(-12, -34); c.lineTo(-6, -28); c.lineTo(0, -36); c.lineTo(6, -28); c.lineTo(12, -34); c.lineTo(12, -24); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#4cb6ff'; circ(c, 0, -28, 2); c.fill();
  c.restore();
  if (dizzy) for (let i = 0; i < 3; i++) { const a = t * 4 + i * TAU / 3; c.fillStyle = '#ffd23f'; starPath(c, B.x + Math.cos(a) * 26, B.fy - 62 + Math.sin(a) * 6, 5, 2.2, 0); c.fill(); c.strokeStyle = INK; c.lineWidth = 0.8; c.stroke(); }
  if (st === 'show') { c.save(); const k = Math.min(1, B.st * 4); c.globalAlpha = k; c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 3; c.font = '900 26px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.strokeText(String(B.face), B.x, B.fy - 66 - k * 6); c.fillText(String(B.face), B.x, B.fy - 66 - k * 6); c.restore(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, B.fy - 70 - k * 30, 9); c.fillStyle = ['#ff7ab8', '#ffd23f', '#4cb6ff'][i]; c.fill(); c.restore(); }
}
function drawMiniDie(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(b.t * 9); c.lineJoin = 'round';
  c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2; rr(c, -7, -7, 14, 14, 3); c.fill(); c.stroke();
  dicePips(c, ((b.n || 1) - 1) % 6 + 1, 3.2, '#ff5c7a');
  c.restore();
}

function drawWorld9(c, t, vis) {
  for (const d of G.dominoes) if (vis(d.x * T, 100)) drawDomino(c, d);
  for (const tm of G.totems) if (vis(tm.x)) drawTotem(c, tm, t);
  for (const r of G.rings) if (vis(r.ax, 120)) drawRing(c, r, t);
  for (const r of G.roos) if (r.state === 'home' && vis(r.x)) { drawKangaroo(c, r.x, r.gy, -1, t, Math.max(0, Math.sin(t * 2.4 + r.x)) * 3, false); sparkle(c, r.x - 14, r.gy - 46 + Math.sin(t * 4) * 2, 1.6, '#fff8c0'); }
  for (const l of G.letters) if (!l.got && vis(l.x)) drawLetterTile(c, l, t);
}

/* ===== Блоки ===== */
function drawBlock10(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'termite') {
    rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#c9784a'; c.fill(); c.stroke();
    c.fillStyle = '#a85f36'; for (const [x, y] of [[7, 7], [16, 10], [9, 16], [17, 18]]) { ell(c, x, y, 2.4, 1.6); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,.25)'; ell(c, 7, 4, 4, 1.2); c.fill();
  } else if (b === 'leafbox' || b === 'snowbox') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#c98d55'; c.fill(); c.stroke();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1; c.beginPath(); c.moveTo(3, 12); c.lineTo(T - 3, 12); c.stroke();
    if (b === 'snowbox') { c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.1; c.beginPath(); c.moveTo(0, 6); c.quadraticCurveTo(6, -1, 12, 4); c.quadraticCurveTo(18, -1, T, 5); c.lineTo(T, 1); c.lineTo(0, 1); c.closePath(); c.fill(); }
    else { c.fillStyle = '#7fd46a'; c.strokeStyle = INK; c.lineWidth = 1; ell(c, 6, 3, 5, 2.4, -0.3); c.fill(); c.stroke(); ell(c, 17, 3, 5, 2.4, 0.3); c.fill(); c.stroke(); }
  } else if (b === 'dieblock' || b === 'reddie') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = b === 'reddie' ? '#ff5c7a' : '#ffffff'; c.fill(); c.stroke();
    c.save(); c.translate(T / 2, T / 2); dicePips(c, 1 + Math.floor((b.length * 7) % 6), 5, b === 'reddie' ? '#ffffff' : INK); c.restore();
  } else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor13(c, d, t) {
  const x = d.x, y = d.y, w = G.season === 'winter';
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'acaciaS':
      c.strokeStyle = '#8a5a30'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 1, y - 14); c.lineTo(x - 5, y - 20); c.moveTo(x + 1, y - 14); c.lineTo(x + 6, y - 21); c.stroke();
      c.fillStyle = '#7fae3a'; ell(c, x, y - 22, 12, 3.6); c.fill(); c.strokeStyle = INK; c.lineWidth = 0.8; c.stroke();
      break;
    case 'stree':
      c.fillStyle = '#8a5a30'; c.fillRect(x - 1.6, y - 12, 3.2, 12);
      if (w) { c.fillStyle = '#ffffff'; for (const [dx, dy, r] of [[0, -18, 7], [-5, -14, 5], [5, -14, 5]]) { circ(c, x + dx, y + dy, r); c.fill(); c.stroke(); } }
      else { c.fillStyle = '#6fcf5a'; for (const [dx, dy, r] of [[0, -18, 7], [-5, -14, 5], [5, -14, 5]]) { circ(c, x + dx, y + dy, r); c.fill(); c.stroke(); } c.fillStyle = '#ff5c7a'; circ(c, x + 3, y - 18, 1.6); c.fill(); circ(c, x - 4, y - 14, 1.4); c.fill(); }
      break;
    case 'sbush':
      if (w) { c.fillStyle = '#ffffff'; ell(c, x, y - 4, 8, 4.4); c.fill(); c.stroke(); c.fillStyle = '#ff7ab8'; c.strokeStyle = INK; for (const dx of [-6, 0, 6]) { c.beginPath(); c.moveTo(x + dx, y - 2); c.lineTo(x + dx, y - 10); c.stroke(); } }
      else { c.fillStyle = '#ffd23f'; for (const dx of [-5, 0, 5]) { circ(c, x + dx, y - 8 - (dx === 0 ? 3 : 0), 2.6); c.fill(); c.stroke(); } c.strokeStyle = '#4f9a48'; c.lineWidth = 1.4; c.beginPath(); for (const dx of [-5, 0, 5]) { c.moveTo(x + dx, y); c.lineTo(x + dx, y - 6 - (dx === 0 ? 3 : 0)); } c.stroke(); }
      break;
    case 'pawn':
      c.fillStyle = d.c || '#fffaf2'; c.beginPath(); c.moveTo(x - 6, y); c.lineTo(x + 6, y); c.lineTo(x + 3, y - 8); c.lineTo(x - 3, y - 8); c.closePath(); c.fill(); c.stroke(); circ(c, x, y - 11, 3.6); c.fill(); c.stroke();
      break;
    case 'dieS':
      c.fillStyle = '#ffffff'; rr(c, x - 6, y - 12, 12, 12, 2.4); c.fill(); c.stroke(); c.save(); c.translate(x, y - 6); dicePips(c, d.n || 5, 2.8, '#ff5c7a'); c.restore();
      break;
    case 'cardS':
      c.save(); c.translate(x, y - 9); c.rotate(-0.15); c.fillStyle = '#ffffff'; rr(c, -6, -9, 12, 18, 2); c.fill(); c.stroke(); c.fillStyle = '#ff5c7a'; heartPath(c, 0, 0, 6); c.fill(); c.restore();
      break;
  }
}

/* ===== Фони ===== */
function bgSavanna(c, viewW, camX, t) {
  const sx = viewW * 0.7, sg = c.createRadialGradient(sx, 120, 10, sx, 120, 90);
  sg.addColorStop(0, 'rgba(255,250,215,1)'); sg.addColorStop(0.4, 'rgba(255,200,120,.7)'); sg.addColorStop(1, 'rgba(255,200,120,0)');
  c.fillStyle = sg; circ(c, sx, 120, 90); c.fill();
  hill(c, viewW, 190, 8, 0.01, 0.5, camX * 0.12, '#e9b878');
  const span = 300;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 60;
    c.fillStyle = '#8a5a30'; c.fillRect(wx - 3, 150, 6, 50); c.fillRect(wx - 20, 148, 40, 4);
    c.fillStyle = '#7fae3a'; ell(c, wx, 144, 46, 10); c.fill(); ell(c, wx - 14, 138, 22, 7); c.fill();
    const gx = wx + 140 + Math.sin(t * 0.3 + i) * 20;
    c.fillStyle = '#f2c94a'; c.fillRect(gx - 2, 120, 5, 40); ell(c, gx + 6, 118, 7, 4); c.fill(); ell(c, gx, 166, 14, 9); c.fill(); c.fillRect(gx - 10, 172, 3, 22); c.fillRect(gx + 8, 172, 3, 22);
    c.fillStyle = '#c98d55'; for (const [dx, dy] of [[0, 128], [0, 140], [4, 162], [-6, 166]]) { circ(c, gx + dx, dy, 2); c.fill(); }
  }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.4, '#d9b85a');
}
function bgSeasonS(c, viewW, camX, t) {
  const sx = viewW * 0.8, sg = c.createRadialGradient(sx, 50, 4, sx, 50, 56);
  sg.addColorStop(0, 'rgba(255,250,200,1)'); sg.addColorStop(0.35, 'rgba(255,240,170,.8)'); sg.addColorStop(1, 'rgba(255,240,170,0)');
  c.fillStyle = sg; circ(c, sx, 50, 56); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.9)'); }
  hill(c, viewW, 180, 14, 0.012, 0.5, camX * 0.15, '#bfe6a8');
  seasonTrees(c, viewW, camX, false);
  hill(c, viewW, 206, 8, 0.02, 2, camX * 0.35, '#9fd88a');
}
function bgSeasonW(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 210 - camX * 0.1 + t * 3, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.85)'); }
  hill(c, viewW, 180, 14, 0.012, 0.5, camX * 0.15, '#e6eeff');
  seasonTrees(c, viewW, camX, true);
  hill(c, viewW, 206, 8, 0.02, 2, camX * 0.35, '#ffffff');
  c.fillStyle = 'rgba(255,255,255,.9)';
  for (let i = 0; i < 40; i++) { const x = wrapX(i * 53 - camX * 0.3 + Math.sin(t + i) * 12, viewW + 20) - 10, y = (i * 37 + t * (20 + (i % 3) * 8)) % VIEW_H; circ(c, x, y, 1.2 + (i % 3) * 0.5); c.fill(); }
}
function seasonTrees(c, viewW, camX, winter) {
  const span = 160;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 40;
    c.fillStyle = winter ? '#a898c4' : '#8a6a4a'; c.fillRect(wx - 3, 160, 6, 36);
    c.fillStyle = winter ? '#ffffff' : '#7fc96a'; circ(c, wx, 150, 20); c.fill(); circ(c, wx - 14, 160, 13); c.fill(); circ(c, wx + 14, 160, 13); c.fill();
    if (!winter) { c.fillStyle = '#ff7ab8'; for (const [dx, dy] of [[-6, 146], [8, 152], [-14, 160], [12, 162]]) { circ(c, wx + dx, dy, 2.4); c.fill(); } }
  }
}
function bgRings(c, viewW, camX, t) {
  const sx = viewW * 0.25, sg = c.createRadialGradient(sx, 46, 4, sx, 46, 54);
  sg.addColorStop(0, 'rgba(255,250,215,1)'); sg.addColorStop(0.35, 'rgba(255,240,180,.8)'); sg.addColorStop(1, 'rgba(255,240,180,0)');
  c.fillStyle = sg; circ(c, sx, 46, 54); c.fill();
  const sea = c.createLinearGradient(0, 150, 0, VIEW_H); sea.addColorStop(0, '#5fd3e0'); sea.addColorStop(1, '#2fa6c4');
  c.fillStyle = sea; c.fillRect(0, 150, viewW + 1, VIEW_H - 150);
  const span = 340;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.15, span) + 120;
    c.fillStyle = '#f3cf8e'; ell(c, wx, 152, 60, 10); c.fill();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 4; c.beginPath(); c.moveTo(wx - 10, 150); c.quadraticCurveTo(wx - 4, 120, wx + 6, 96); c.stroke();
    c.fillStyle = '#4fbf5a'; for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.6; c.save(); c.translate(wx + 6, 96); c.rotate(a + Math.PI / 2); ell(c, 0, -14, 5, 16); c.fill(); c.restore(); }
  }
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1.4;
  for (let i = 0; i < 12; i++) { const x = wrapX(i * 71 - camX * 0.25 + Math.sin(t + i) * 6, viewW + 40) - 20, y = 170 + (i % 4) * 14; c.beginPath(); c.moveTo(x - 6, y); c.lineTo(x + 6, y); c.stroke(); }
}
function bgBoard(c, viewW, camX, t) {
  const span = 380;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.15, span);
    c.fillStyle = 'rgba(122,90,217,.18)'; c.beginPath(); c.moveTo(wx + 40, 210); c.lineTo(wx + 50, 120); c.quadraticCurveTo(wx + 30, 90, wx + 60, 70); c.quadraticCurveTo(wx + 100, 70, wx + 96, 110); c.lineTo(wx + 80, 112); c.lineTo(wx + 90, 210); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,92,122,.18)'; c.beginPath(); c.moveTo(wx + 200, 210); c.lineTo(wx + 210, 150); c.lineTo(wx + 230, 150); c.lineTo(wx + 240, 210); c.closePath(); c.fill(); circ(c, wx + 220, 138, 16); c.fill();
    c.save(); c.translate(wx + 310, 150 + Math.sin(t + i) * 4); c.rotate(0.2 + t * 0.1); c.fillStyle = 'rgba(255,255,255,.7)'; rr(c, -20, -20, 40, 40, 8); c.fill(); dicePips(c, ((i % 6) + 6) % 6 + 1, 9, 'rgba(255,92,122,.5)'); c.restore();
  }
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.3, viewW + 120) - 60; c.save(); c.translate(x, 60 + (i % 2) * 30); c.rotate(-0.2 + i * 0.15); c.fillStyle = 'rgba(255,255,255,.8)'; rr(c, -14, -20, 28, 40, 4); c.fill(); c.fillStyle = i % 2 ? 'rgba(255,92,122,.6)' : 'rgba(59,31,79,.5)'; heartPath(c, 0, 0, 12); c.fill(); c.restore(); }
}
function bgDiceCastle(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 210 - camX * 0.1 + t * 4, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.85)'); }
  const span = 300;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span) + 50;
    c.fillStyle = '#c9b6e6'; c.fillRect(wx, 110, 60, 100); c.fillRect(wx + 150, 140, 80, 70);
    for (let k = 0; k < 3; k++) { c.fillStyle = '#ffffff'; rr(c, wx - 2 + k * 22, 94, 18, 18, 4); c.fill(); c.save(); c.translate(wx + 7 + k * 22, 103); dicePips(c, k * 2 + 1, 4, '#ff5c7a'); c.restore(); }
    c.fillStyle = '#8a7aa8'; c.beginPath(); c.arc(wx + 30, 210, 14, Math.PI, TAU); c.fill(); c.fillRect(wx + 16, 196, 28, 14);
    c.fillStyle = '#ffd23f'; c.fillRect(wx + 26, 130, 8, 12); c.fillRect(wx + 176, 160, 8, 12);
  }
  hill(c, viewW, 220, 5, 0.03, 1.2, camX * 0.4, '#e6dcf5');
}
Object.assign(BG2, { savanna: bgSavanna, seasonS: bgSeasonS, seasonW: bgSeasonW, rings: bgRings, board: bgBoard, dicecastle: bgDiceCastle });
