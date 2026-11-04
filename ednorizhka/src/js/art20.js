'use strict';
/* ===== Частина 20: Паперові літачки, Країна морозива, Веселкова доріжка, Морський коник, Ставок Квакуші ===== */
Object.assign(THEMES, {
  paperplanes: { sky: ['#a8d4ff', '#d6ecff', '#fffaf0'], panel: '#24406f', top: '#ffd23f', topHi: '#fff0a0', topLo: '#e0a820', fill: '#f6f1e4', fillLo: '#e6dcc4', dots: ['#8fb8ff', '#ff9fc4', '#9fe08a'], block: 'paperblock', ice: false, topStyle: 'plank', dotShape: 'dot' },
  icecream: { sky: ['#ffc4e4', '#ffe6f3', '#fff8ec'], panel: '#6a2a50', top: '#ff9fd0', topHi: '#ffd0e8', topLo: '#e06aa8', fill: '#e8b878', fillLo: '#d09a58', dots: ['#ffffff', '#7fd4ff', '#ffe14d', '#7fd46a'], block: 'waffleblock', ice: false, topStyle: 'drip', dotShape: 'dot' },
  rainbowroad: { sky: ['#c9b6ff', '#ffd6ec', '#fff6d6'], panel: '#3a2a6a', top: '#ffffff', topHi: '#ffffff', topLo: '#e6dcff', fill: '#e6dcff', fillLo: '#d6c8ff', dots: ['#ff7ab8', '#ffd23f', '#7fd46a', '#4cb6ff'], block: 'rainbowblock', ice: false, topStyle: 'snow', dotShape: 'dot' },
  seahorse: { sky: ['#2a8fd0', '#5cc0e8', '#a8e6f2'], panel: '#0c3550', top: '#ffe2a8', topHi: '#fff2cc', topLo: '#e2b56d', fill: '#f0c98a', fillLo: '#dcae68', dots: ['#ffb3c6', '#fff4d6', '#c98d55'], block: 'coralblock', ice: false, topStyle: 'sand', dotShape: 'dot' },
  pond: { sky: ['#b8e8d0', '#e0f6e8', '#fffbe6'], panel: '#1f4a3a', top: '#7fcf5a', topHi: '#b0ef8a', topLo: '#4f9f3a', fill: '#8a6a40', fillLo: '#6e5232', dots: ['#a8865a', '#5a4428', '#c9a878'], block: 'lilyblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
});

/* ===== Вороги: ріжечок-морозиво й золота рибка ===== */
function drawIceCone(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  const step = Math.sin(t * 10) * 2;
  c.beginPath(); c.moveTo(-4, -4); c.lineTo(-5 + step, 0); c.moveTo(4, -4); c.lineTo(5 - step, 0); c.stroke();
  c.fillStyle = flash ? '#fff' : '#e8b878'; c.beginPath(); c.moveTo(-9, -16); c.lineTo(9, -16); c.lineTo(0, -2); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(160,100,40,.6)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(-5, -16); c.lineTo(3, -6); c.moveTo(2, -16); c.lineTo(-3, -8); c.moveTo(6, -16); c.lineTo(-1, -10); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = flash ? '#fff' : '#ff9fd0'; c.beginPath(); c.arc(0, -18, 10, Math.PI, TAU); c.quadraticCurveTo(8, -13, 5, -15); c.quadraticCurveTo(2, -12, 0, -15); c.quadraticCurveTo(-4, -12, -6, -15); c.quadraticCurveTo(-9, -13, -10, -18); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; circ(c, 1, -22, 2.6); c.fill(); circ(c, 6, -22, 2.6); c.fill();
  c.fillStyle = INK; circ(c, 1.8, -22, 1.3); c.fill(); circ(c, 6.8, -22, 1.3); c.fill();
  for (const [sx, sy, col] of [[-6, -23, '#7fd4ff'], [-2, -26, '#ffe14d'], [4, -27, '#7fd46a']]) { c.fillStyle = col; rr(c, sx, sy, 3, 1.4, 0.7); c.fill(); }
  c.fillStyle = '#e8b878'; c.strokeStyle = INK; c.lineWidth = 0.9; circ(c, -1, -29, 2); c.fill(); c.stroke();
  c.restore();
}
function drawGoldfish(c, x, y, t, dir, flash) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.1;
  const w = Math.sin(t * 8) * 3;
  c.fillStyle = flash ? '#fff' : '#ffb347'; c.beginPath(); c.moveTo(-9, 0); c.lineTo(-17, -6 + w); c.quadraticCurveTo(-14, 0, -17, 6 + w); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#ff9a2a'; ell(c, 0, 0, 11, 7); c.fill(); c.stroke();
  c.fillStyle = '#ffd56a'; c.beginPath(); c.moveTo(-3, -6); c.quadraticCurveTo(1, -12, 5, -6); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 5, -2, 2.6); c.fill(); c.fillStyle = INK; circ(c, 5.8, -2, 1.3); c.fill();
  c.fillStyle = 'rgba(255,255,255,.45)'; ell(c, -2, -3, 4, 1.5, -0.2); c.fill();
  c.restore();
}
function drawEnemy16(c, e, cx, fl) {
  switch (e.k) {
    case 'icecone': drawIceCone(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
    case 'goldfish': drawGoldfish(c, cx, e.y + e.h / 2, e.t, e.dir || 1, fl); return true;
  }
  return false;
}

/* ===== Рухомі: паперовий літачок, кулька морозива, шматочок веселки ===== */
function drawPaperPlane(c, x, y, w, ang, crumple) {
  c.save(); c.translate(x + w / 2, y + 4); c.rotate(ang); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  if (crumple) {
    c.fillStyle = '#ffffff'; c.beginPath(); for (let i = 0; i < 9; i++) { const a = i / 9 * TAU, r = 9 + (i % 2 ? 3 : 0); c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = 'rgba(120,140,190,.7)'; c.lineWidth = 0.9; c.beginPath(); c.moveTo(-6, -3); c.lineTo(2, 1); c.lineTo(-1, 6); c.moveTo(3, -6); c.lineTo(6, 2); c.stroke();
    c.restore(); return;
  }
  const h = w / 2;
  // нижнє крило
  c.fillStyle = '#d6e6ff'; c.beginPath(); c.moveTo(h + 4, 0); c.lineTo(-h, -2); c.lineTo(-h + 6, 8); c.closePath(); c.fill(); c.stroke();
  // верхнє крило, на ньому стоїть єдиноріжка
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(h + 4, 0); c.lineTo(-h, -5); c.lineTo(-h + 2, -1); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(120,140,190,.8)'; c.lineWidth = 1; c.beginPath(); c.moveTo(h + 2, 0.4); c.lineTo(-h + 4, 2); c.stroke();
  c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(-h + 4, 3); c.lineTo(-h + 10, 3.6); c.lineTo(-h + 6, 6); c.closePath(); c.fill();
  c.restore();
}
function drawPlane(c, m, t) {
  const fly = m.state === 'fly', ang = fly ? clamp(Math.atan2(m.vy, PLANE_V) * 0.7, -0.35, 0.3) : 0;
  if (m.state === 'idle') {
    // стартовий майданчик під літачком
    c.save(); c.strokeStyle = INK; c.lineWidth = 1.1; c.fillStyle = '#ffd23f'; rr(c, m.bx - 2, m.by + 8, m.w + 4, 4, 2); c.fill(); c.stroke();
    c.fillStyle = '#8fb8ff'; for (let k = 0; k < 3; k++) { const a = ((t * 1.5 + k / 3) % 1); c.globalAlpha = 1 - a; c.beginPath(); c.moveTo(m.bx + m.w + 6 + a * 18, m.by - 6); c.lineTo(m.bx + m.w + 12 + a * 18, m.by - 2); c.lineTo(m.bx + m.w + 6 + a * 18, m.by + 2); c.fill(); } c.restore();
  }
  if (m.state === 'gone' && !m.crashed) return;
  drawPaperPlane(c, m.x, m.y, m.w, ang, m.crashed);
  if (fly) { c.save(); c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1.4; c.lineCap = 'round'; for (let k = 0; k < 3; k++) { const yy = m.y + 2 + k * 3; c.beginPath(); c.moveTo(m.x - 6 - k * 4, yy); c.lineTo(m.x - 16 - k * 6, yy); c.stroke(); } c.restore(); }
}
const SCOOP_COLS = ['#ff9fd0', '#9ff0c8', '#fff3c4', '#c08a5a', '#a8c4ff'];
function drawScoop(c, m, t) {
  const x = m.x, y = m.y, w = m.w, cx = x + w / 2, col = m.col || SCOOP_COLS[0];
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  if (m.state === 'gone') {
    // маленька ложечка морозива, що знову росте
    const k = Math.min(1, m.t / 3);
    c.globalAlpha = 0.35 + 0.3 * k; c.setLineDash([3, 3]); c.beginPath(); c.ellipse(cx, y + 6, w / 2, 7, 0, 0, TAU); c.stroke(); c.setLineDash([]);
    c.globalAlpha = 0.8; c.fillStyle = col; c.beginPath(); c.ellipse(cx, y + 6, w / 2 * k, 6 * k, 0, 0, TAU); c.fill();
    c.restore(); return;
  }
  const k = Math.max(0.25, m.life), hgt = 8 + 10 * k;
  if (m.state === 'melt' && m.life < 0.35) c.globalAlpha = 0.55 + 0.45 * Math.abs(Math.sin(t * 16));
  c.fillStyle = col;
  c.beginPath(); c.moveTo(x, y + 4);
  c.quadraticCurveTo(x, y - 2, x + 8, y - 2); c.lineTo(x + w - 8, y - 2); c.quadraticCurveTo(x + w, y - 2, x + w, y + 4);
  c.quadraticCurveTo(x + w, y + hgt * 0.6, cx + w * 0.3, y + hgt * 0.8);
  // крапельки знизу
  const drips = 4;
  for (let i = drips; i >= 0; i--) { const dx = x + w * (0.1 + 0.8 * i / drips), dl = (i % 2 ? 6 : 3) * (1.6 - k); c.quadraticCurveTo(dx + 4, y + hgt * 0.8, dx, y + hgt * 0.8 + dl); c.quadraticCurveTo(dx - 3, y + hgt * 0.8 + dl - 2, dx - 4, y + hgt * 0.8); }
  c.quadraticCurveTo(x, y + hgt * 0.6, x, y + 4);
  c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.55)'; ell(c, x + 10, y + 2, 6, 2, -0.1); c.fill();
  for (const [sx, sc] of [[0.3, '#7fd4ff'], [0.55, '#ffe14d'], [0.75, '#ff5c7a']]) { c.fillStyle = sc; rr(c, x + w * sx, y + 3, 3.4, 1.6, 0.8); c.fill(); }
  if (m.state === 'full' && m.life >= 1) { c.fillStyle = '#ff4f5e'; c.strokeStyle = INK; c.lineWidth = 1; circ(c, cx + 3, y - 5, 3.4); c.fill(); c.stroke(); c.beginPath(); c.moveTo(cx + 3, y - 8); c.quadraticCurveTo(cx + 6, y - 13, cx + 9, y - 13); c.stroke(); }
  c.restore();
}
function drawRainbowSeg(c, m, t) {
  if (m.state === 'gone') return;
  c.save(); if (m.life < 0.8) c.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * 14));
  const x = m.x, y = m.y, w = m.w;
  for (let i = 0; i < 6; i++) { c.fillStyle = RAINBOW[i]; rr(c, x, y + i * 1.7, w, 2.2, 1.1); c.fill(); }
  c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, x + 6, y + 6, 6, 4); c.fill(); ell(c, x + w - 6, y + 6, 6, 4); c.fill();
  c.restore();
}
function drawMover16(c, m) {
  if (m.plane) { drawPlane(c, m, G.t); return true; }
  if (m.scoop) { drawScoop(c, m, G.t); return true; }
  if (m.rbSeg) { drawRainbowSeg(c, m, G.t); return true; }
  return false;
}

/* ===== Світ: кільця для літачків, морські коники, латаття на арені ===== */
function drawPlaneRing(c, r, t) {
  c.save(); c.lineCap = 'round';
  if (r.got) c.globalAlpha = 0.25;
  const wob = Math.sin(t * 3 + r.x) * 1.5;
  for (let i = 0; i < 3; i++) { c.strokeStyle = RAINBOW[(i * 2 + Math.floor(t * 4)) % 6]; c.lineWidth = 2.4; c.beginPath(); c.ellipse(r.x, r.y + wob, 9 - i * 0.5, 22 - i * 2, 0, i * 0.4, TAU - 0.4 + i * 0.4); c.stroke(); }
  c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.ellipse(r.x, r.y + wob, 10.4, 23.4, 0, 0, TAU); c.stroke();
  c.restore();
}
function drawSeahorseShape(c, x, y, t, dir, ride) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  const sw = Math.sin(t * 6) * 0.08;
  // верхи коник пливе майже лежачи, щоб єдиноріжка сиділа в нього на спинці
  if (ride) { c.rotate(1.2); c.scale(0.85, 0.85); } else c.rotate(sw);
  // хвостик-завиток
  c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(-2, 10); c.quadraticCurveTo(-6, 22, 0, 24); c.quadraticCurveTo(5, 25, 4, 20); c.stroke();
  c.strokeStyle = '#ffb84d'; c.lineWidth = 4; c.stroke();
  c.strokeStyle = INK; c.lineWidth = 1.3;
  // тулуб
  c.fillStyle = '#ffb84d'; c.beginPath(); c.moveTo(-3, 12); c.quadraticCurveTo(-11, 2, -6, -8); c.quadraticCurveTo(0, -14, 6, -8); c.quadraticCurveTo(9, 2, 3, 12); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffe08a'; c.beginPath(); c.moveTo(1, 10); c.quadraticCurveTo(6, 2, 4, -6); c.quadraticCurveTo(0, 2, -1, 10); c.closePath(); c.fill();
  // плавничок на спинці
  c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(-7, -2); c.quadraticCurveTo(-14 - Math.sin(t * 14) * 2, 2, -8, 6); c.closePath(); c.fill(); c.stroke();
  // голова з мордочкою-трубочкою
  c.fillStyle = '#ffb84d'; circ(c, 2, -12, 6.4); c.fill(); c.stroke();
  c.fillStyle = '#ffb84d'; rr(c, 6, -13, 9, 4.4, 2.2); c.fill(); c.stroke();
  c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(-2, -17); c.lineTo(0, -22); c.lineTo(3, -18); c.lineTo(5, -22); c.lineTo(6, -16); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 3.4, -13, 2.4); c.fill(); c.fillStyle = INK; circ(c, 4, -13, 1.2); c.fill();
  c.restore();
}
function drawLilyPad(c, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#5fbf4a'; c.beginPath(); c.ellipse(0, 0, 18, 6, 0, 0.2, TAU - 0.2); c.lineTo(0, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffb3d6'; c.beginPath(); for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.45; c.ellipse(4 + Math.cos(a) * 3, -4 + Math.sin(a) * 3, 2.6, 5, a + Math.PI / 2, 0, TAU); } c.fill();
  c.fillStyle = '#ffe14d'; circ(c, 4, -5, 2); c.fill();
  c.restore();
}
function drawWorld16(c, t, vis) {
  for (const r of G.planeRings) if (vis(r.x)) drawPlaneRing(c, r, t);
  for (const s of G.seahorses) if (s.state === 'free' && vis(s.x)) {
    drawSeahorseShape(c, s.x, s.y, t + s.ox, s.dir || 1, false);
    if (!G.P.seahorse) { c.save(); c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 4); c.fillStyle = '#fff3a8'; for (let k = 0; k < 3; k++) { const a = t * 2 + k * 2.1; circ(c, s.x + Math.cos(a) * 16, s.y - 4 + Math.sin(a) * 18, 1.6); c.fill(); } c.restore(); }
  }
  const B = G.boss;
  if (B && B.kind === 'frog' && G.arena) for (let k = 0; k < 5; k++) { const x = G.arena.x0 + (4 + k * 9) * T; if (vis(x)) drawLilyPad(c, x, B.gy - 1, 0.8); }
}
function drawUnder16(c, P, t) {
  if (P.seahorse) drawSeahorseShape(c, P.x + P.w / 2 + P.dir * 2, P.y + P.h - 1, t, P.dir, true);
  if (P.rainbowT > 0 && !P.onGround) { c.save(); c.globalAlpha = 0.6; for (let i = 0; i < 6; i++) { c.fillStyle = RAINBOW[i]; circ(c, P.x + P.w / 2 - P.dir * (8 + i * 3), P.y + P.h - 2 + Math.sin(t * 10 + i) * 1.5, 1.8); c.fill(); } c.restore(); }
}
function drawOver16(c, P, t) {
  if (P.plane) for (let i = 0; i < P.plane.puffs; i++) {
    const x = P.x + P.w / 2 - 12 + i * 12, y = P.y - 30;
    c.save(); c.translate(x, y); c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 0.9; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(5, 0); c.lineTo(-5, -3); c.lineTo(-3, 0); c.lineTo(-5, 3); c.closePath(); c.fill(); c.stroke(); c.restore();
  }
}
function drawPowerIcon20(c, kind, t) {
  c.lineJoin = 'round'; c.lineCap = 'round';
  if (kind === 'rainbow') {
    for (let i = 0; i < 6; i++) { c.strokeStyle = RAINBOW[i]; c.lineWidth = 1.6; c.beginPath(); c.arc(0, 4, 9 - i * 1.5, Math.PI, TAU); c.stroke(); }
    c.fillStyle = '#ffffff'; circ(c, -8, 5, 3); c.fill(); circ(c, 8, 5, 3); c.fill();
  }
}

/* ===== Жабка Квакуша ===== */
function drawFrogBoss(c, B, t) {
  const fl = B.flash > 0, x = B.x, gy = B.fy, d = B.dir || -1;
  const col = fl ? '#ffffff' : '#6fcf4a', colLo = fl ? '#ffffff' : '#4fa83a';
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.5;
  if (B.dead) {
    // світлячки-зірочки кружляють довкола щасливої жабки
    for (let i = 0; i < 6; i++) { const a = t * 1.6 + i * TAU / 6; c.save(); c.globalAlpha = 0.6 + 0.4 * Math.sin(t * 5 + i); c.fillStyle = '#fff3a8'; circ(c, x + Math.cos(a) * 46, gy - 34 + Math.sin(a) * 20, 3.4); c.fill(); c.fillStyle = 'rgba(255,240,140,.35)'; circ(c, x + Math.cos(a) * 46, gy - 34 + Math.sin(a) * 20, 7); c.fill(); c.restore(); }
  }
  // перед пострілом язиком кінчик визирає з рота — підказка, що час стрибати
  if (B.state === 'sit' && !B.dead && B.st > 0.35) { const k = Math.min(1, (B.st - 0.35) / 0.4); c.fillStyle = '#ff7ab8'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, x + d * (20 + k * 4), gy - 12, 2 + k * 3); c.fill(); c.stroke(); }
  // язик
  if (B.tongue > 2) {
    const x0 = x + d * 18, x1 = x0 + d * B.tongue, ty = gy - 12;
    c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(x0, ty); c.lineTo(x1, ty); c.stroke();
    c.strokeStyle = '#ff7ab8'; c.lineWidth = 4; c.stroke();
    c.fillStyle = '#ff7ab8'; c.strokeStyle = INK; c.lineWidth = 1.3; circ(c, x1, ty, 5.4); c.fill(); c.stroke();
  }
  c.translate(x, gy); c.scale(-d, 1);
  const crouch = B.state === 'crouch' ? Math.min(1, B.st / 0.4) : 0, leap = B.state === 'leap';
  c.scale(1 + crouch * 0.12, 1 - crouch * 0.18);
  // задні лапки
  c.fillStyle = colLo;
  if (leap) { c.beginPath(); c.moveTo(14, -10); c.lineTo(30, 6); c.lineTo(36, 4); c.lineTo(20, -14); c.closePath(); c.fill(); c.stroke(); }
  else { ell(c, 16, -8, 12, 8, 0.2); c.fill(); c.stroke(); ell(c, 22, -1, 9, 3); c.fill(); c.stroke(); }
  // тулуб
  c.fillStyle = col; c.beginPath(); c.ellipse(0, -18, 25, 18, 0, 0, TAU); c.fill(); c.stroke();
  c.fillStyle = fl ? '#fff' : '#d6f5a8'; c.beginPath(); c.ellipse(-4, -12, 15, 11, 0, 0, TAU); c.fill();
  // плямки на спинці
  c.fillStyle = colLo; circ(c, 12, -28, 3); c.fill(); circ(c, 18, -20, 2.2); c.fill(); circ(c, 6, -32, 2); c.fill();
  // горлечко, що надувається під час «Ква!»
  if (B.state === 'croak' && !B.dead) { const s = 6 + B.sac * 8; c.fillStyle = '#ffd6ea'; c.beginPath(); c.ellipse(-14, -6, s, s * 0.8, 0, 0, TAU); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, -16, -9, s * 0.35, s * 0.2, -0.4); c.fill(); }
  // передні лапки
  c.fillStyle = col; ell(c, -14, -2, 6, 3); c.fill(); c.stroke(); ell(c, 2, -2, 6, 3); c.fill(); c.stroke();
  // очі на маківці
  for (const ex of [-14, 4]) { c.fillStyle = col; circ(c, ex, -34, 8); c.fill(); c.stroke(); }
  const closed = (B.state === 'croak' && !B.dead) || B.dead;
  for (const ex of [-14, 4]) {
    if (closed) { c.lineWidth = 1.6; c.beginPath(); c.arc(ex, -34, 4, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); }
    else { c.fillStyle = '#ffffff'; circ(c, ex, -34, 5.4); c.fill(); c.lineWidth = 1; c.stroke(); c.fillStyle = INK; circ(c, ex - 1.6, -33.6, 2.6); c.fill(); c.fillStyle = '#fff'; circ(c, ex - 2.4, -34.8, 0.9); c.fill(); }
  }
  // ротик
  c.lineWidth = 1.5;
  if (B.state === 'tongue') { c.fillStyle = '#c0306a'; c.beginPath(); c.ellipse(-20, -14, 6, 4, 0, 0, TAU); c.fill(); c.stroke(); }
  else { c.beginPath(); c.moveTo(-24, -18); c.quadraticCurveTo(-10, -10, 6, -18); c.stroke(); }
  c.fillStyle = 'rgba(255,110,170,.55)'; circ(c, -20, -22, 3); c.fill();
  // корона з латаття
  c.fillStyle = '#ffb3d6'; c.strokeStyle = INK; c.lineWidth = 1; for (let i = 0; i < 3; i++) { c.beginPath(); c.ellipse(-8 + i * 6, -42, 2.6, 5, (i - 1) * 0.5, 0, TAU); c.fill(); c.stroke(); }
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock17(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'paperblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#ffffff'; c.fill(); c.stroke();
    c.strokeStyle = '#8fb8ff'; c.lineWidth = 1; c.beginPath(); for (let k = 7; k < T - 2; k += 5) { c.moveTo(3, k); c.lineTo(T - 3, k); } c.stroke();
    c.strokeStyle = '#ff9fc4'; c.beginPath(); c.moveTo(7, 2); c.lineTo(7, T - 2); c.stroke();
  } else if (b === 'waffleblock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#e8b878'; c.fill(); c.stroke();
    c.strokeStyle = 'rgba(160,100,40,.7)'; c.lineWidth = 1.2; c.beginPath(); for (let k = 6; k < T; k += 6) { c.moveTo(k, 2); c.lineTo(k, T - 2); c.moveTo(2, k); c.lineTo(T - 2, k); } c.stroke();
    c.fillStyle = '#ff9fd0'; c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(1, 6); c.quadraticCurveTo(4, 1, 12, 1); c.quadraticCurveTo(20, 1, T - 1, 6); c.quadraticCurveTo(T - 4, 10, T - 6, 6); c.quadraticCurveTo(12, 11, 8, 6); c.quadraticCurveTo(4, 9, 1, 6); c.closePath(); c.fill(); c.stroke();
  } else if (b === 'rainbowblock') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#ffffff'; c.fill(); c.stroke();
    for (let i = 0; i < 6; i++) { c.strokeStyle = RAINBOW[i]; c.lineWidth = 1.4; c.beginPath(); c.arc(T / 2, T - 4, 9 - i * 1.4, Math.PI, TAU); c.stroke(); }
  } else if (b === 'coralblock') {
    rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#ff8fa8'; c.fill(); c.stroke();
    c.fillStyle = '#ffc4d0'; for (const [px, py] of [[7, 7], [16, 9], [9, 16], [17, 17]]) { circ(c, px, py, 2.4); c.fill(); }
  } else if (b === 'lilyblock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#5fbf4a'; c.fill(); c.stroke();
    c.strokeStyle = 'rgba(40,90,30,.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(T / 2, T / 2); c.lineTo(4, 4); c.moveTo(T / 2, T / 2); c.lineTo(T - 4, 6); c.moveTo(T / 2, T / 2); c.lineTo(T / 2, T - 3); c.stroke();
    c.fillStyle = '#ffb3d6'; circ(c, 16, 8, 3); c.fill();
  } else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor20(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'pencilS':
      c.save(); c.translate(x, y); c.rotate(-0.25);
      c.fillStyle = d.c || '#ffd23f'; c.fillRect(-2.4, -18, 4.8, 14); c.strokeRect(-2.4, -18, 4.8, 14);
      c.fillStyle = '#f3cf8e'; c.beginPath(); c.moveTo(-2.4, -4); c.lineTo(2.4, -4); c.lineTo(0, 1); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#ff9fc4'; c.fillRect(-2.4, -21, 4.8, 3); c.strokeRect(-2.4, -21, 4.8, 3);
      c.restore(); break;
    case 'paperboatS':
      c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(x - 9, y - 6); c.lineTo(x + 9, y - 6); c.lineTo(x + 6, y); c.lineTo(x - 6, y); c.closePath(); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(x - 4, y - 6); c.lineTo(x, y - 14); c.lineTo(x + 4, y - 6); c.closePath(); c.fill(); c.stroke();
      break;
    case 'coneS':
      c.fillStyle = '#e8b878'; c.beginPath(); c.moveTo(x - 4, y - 10); c.lineTo(x + 4, y - 10); c.lineTo(x, y); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = d.c || '#ff9fd0'; circ(c, x, y - 12, 4.6); c.fill(); c.stroke();
      break;
    case 'sprinkleS':
      for (let i = 0; i < 4; i++) { c.fillStyle = RAINBOW[(i + Math.floor(x)) % 6]; c.save(); c.translate(x - 6 + i * 4, y - 2 - (i % 2) * 2); c.rotate(i * 0.8); rr(c, -2, -0.7, 4, 1.4, 0.7); c.fill(); c.restore(); }
      break;
    case 'lilyS': drawLilyPad(c, x, y - 1, 0.5); break;
    case 'cattailS':
      c.strokeStyle = '#4f9f3a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 20); c.moveTo(x + 3, y); c.quadraticCurveTo(x + 6, y - 10, x + 9, y - 14); c.stroke();
      c.fillStyle = '#8a5a30'; c.strokeStyle = INK; c.lineWidth = 0.8; rr(c, x - 2, y - 26, 4, 9, 2); c.fill(); c.stroke();
      break;
  }
}

/* ===== Фони ===== */
function bgPaperplanes(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 210 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.95)'); }
  // літачки летять у небі
  for (let i = 0; i < 4; i++) {
    const x = wrapX(i * 260 + t * 30 - camX * 0.2, viewW + 200) - 100, y = 50 + (i % 3) * 30 + Math.sin(t * 1.4 + i) * 8;
    c.save(); c.translate(x, y); c.rotate(Math.sin(t + i) * 0.1); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.moveTo(14, 0); c.lineTo(-12, -6); c.lineTo(-8, 0); c.lineTo(-12, 5); c.closePath(); c.fill(); c.restore();
  }
  hill(c, viewW, 190, 10, 0.012, 0.4, camX * 0.12, '#cfe0ff');
  const span = 120;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.3, span) + 30, cols = ['#ff9fc4', '#ffd23f', '#8fb8ff', '#9fe08a'], k = ((i % 4) + 4) % 4; c.fillStyle = cols[k]; c.fillRect(wx, 150 + (k % 2) * 16, 10, 70); c.fillStyle = '#f3cf8e'; c.beginPath(); c.moveTo(wx, 150 + (k % 2) * 16); c.lineTo(wx + 10, 150 + (k % 2) * 16); c.lineTo(wx + 5, 138 + (k % 2) * 16); c.closePath(); c.fill(); }
  hill(c, viewW, 216, 6, 0.03, 1.2, camX * 0.45, '#e6eeff');
}
function bgIcecream(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 170;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.22, span) + 40, k = ((i % 3) + 3) % 3, h = 60 + k * 18;
    c.fillStyle = '#f0c890'; c.beginPath(); c.moveTo(wx - 22, 210 - h + 30); c.lineTo(wx + 22, 210 - h + 30); c.lineTo(wx, 214); c.closePath(); c.fill();
    c.fillStyle = ['#ffd0e8', '#c4f5dc', '#fff3c4'][k]; circ(c, wx, 210 - h + 22, 26); c.fill();
    c.fillStyle = ['#ffb3d6', '#9ff0c8', '#ffe08a'][k]; circ(c, wx + 6, 210 - h - 2, 18); c.fill();
  }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#ffd6ea');
}
function bgRainbowroad(c, viewW, camX, t) {
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 40 + (i % 3) * 30, 1, 'rgba(255,255,255,.9)'); }
  const off = wrapX(-camX * 0.15, 520);
  for (let r = 0; r < 2; r++) { const cx = off + r * 520 - 60; for (let i = 0; i < 6; i++) { c.strokeStyle = RAINBOW[i]; c.globalAlpha = 0.45; c.lineWidth = 7; c.beginPath(); c.arc(cx, 230, 170 - i * 7, Math.PI, TAU); c.stroke(); } c.globalAlpha = 1; }
  hill(c, viewW, 226, 6, 0.03, 1.2, camX * 0.45, '#f6e2ff');
}
function bgSeahorse(c, viewW, camX, t) {
  // промені світла крізь воду
  c.fillStyle = 'rgba(255,255,255,.08)';
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 130 - camX * 0.1, viewW + 200) - 100; c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 40, 0); c.lineTo(x + 110, VIEW_H); c.lineTo(x + 70, VIEW_H); c.closePath(); c.fill(); }
  for (let i = 0; i < 10; i++) { const x = wrapX(i * 83 - camX * 0.2, viewW + 40) - 20, y = VIEW_H - ((t * 24 + i * 47) % (VIEW_H + 20)); c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 1; circ(c, x + Math.sin(t * 2 + i) * 4, y, 2 + (i % 3)); c.stroke(); }
  hill(c, viewW, 200, 10, 0.012, 0.4, camX * 0.12, '#3a9ac8');
  const span = 90;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.3, span) + 20; c.strokeStyle = '#2f8a5a'; c.lineWidth = 4; c.beginPath(); c.moveTo(wx, 230); for (let k = 1; k < 6; k++) c.lineTo(wx + Math.sin(t * 1.5 + k + i) * 5, 230 - k * 14); c.stroke(); }
  hill(c, viewW, 222, 5, 0.03, 1.2, camX * 0.45, '#e9c886');
}
function bgPond(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 186, 10, 0.012, 0.4, camX * 0.12, '#bfe8c0');
  const span = 70;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.35, span) + 20; c.strokeStyle = '#5fa84a'; c.lineWidth = 2; c.beginPath(); c.moveTo(wx, 212); c.lineTo(wx - 2, 176); c.moveTo(wx + 6, 212); c.quadraticCurveTo(wx + 10, 190, wx + 14, 184); c.stroke(); c.fillStyle = '#8a5a30'; rr(c, wx - 4.5, 168, 5, 12, 2.5); c.fill(); }
  // світлячки
  for (let i = 0; i < 8; i++) { const x = wrapX(i * 97 - camX * 0.25 + Math.sin(t + i) * 10, viewW + 40) - 20, y = 120 + Math.sin(t * 1.3 + i * 2) * 30 + (i % 3) * 20; c.fillStyle = `rgba(255,240,140,${0.4 + 0.4 * Math.sin(t * 4 + i)})`; circ(c, x, y, 2.4); c.fill(); }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#9fd88a');
}
Object.assign(BG2, { paperplanes: bgPaperplanes, icecream: bgIcecream, rainbowroad: bgRainbowroad, seahorse: bgSeahorse, pond: bgPond });
