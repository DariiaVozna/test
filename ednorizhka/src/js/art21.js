'use strict';
/* ===== Частина 21: Дощова долина, Парасольковий перевал, Лоскотний сад, Містечко усмішок, Країна Маші ===== */
Object.assign(THEMES, {
  rainvalley: { sky: ['#9fb4cf', '#c6d4e4', '#eef3f8'], panel: '#2a3a55', top: '#7fcf7a', topHi: '#b0ef9a', topLo: '#4f9f4a', fill: '#8a7560', fillLo: '#6e5c4a', dots: ['#a08870', '#5a4838', '#b8a088'], block: 'rainblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  umbrellas: { sky: ['#ffb3a6', '#ffdcc6', '#fff6e8'], panel: '#5a2a3a', top: '#9ad86a', topHi: '#c8f09a', topLo: '#6aa84a', fill: '#b08a6a', fillLo: '#94704f', dots: ['#c9a582', '#7a5a3e', '#e0c4a0'], block: 'umbrellablock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  ticklegarden: { sky: ['#bfe9ff', '#e4f6ff', '#fffbe6'], panel: '#1f4a3a', top: '#8fe07a', topHi: '#c4f7a8', topLo: '#5fb04a', fill: '#9a7048', fillLo: '#7e5a38', dots: ['#ff9fd0', '#ffe14d', '#ffffff'], block: 'flowerblock', ice: false, topStyle: 'leaves', dotShape: 'dot' },
  smiletown: { sky: ['#ffd96a', '#fff0b8', '#fffaf0'], panel: '#6a3a10', top: '#ff9fd0', topHi: '#ffd0e8', topLo: '#e06aa8', fill: '#ffe2a0', fillLo: '#f2c97a', dots: ['#ff7ab8', '#4cb6ff', '#7fd46a'], block: 'smileblock', ice: false, topStyle: 'plank', dotShape: 'dot' },
  mashaland: { sky: ['#ffc4e8', '#ffe6f6', '#fff9fd'], panel: '#4a2a6a', top: '#5cc8ff', topHi: '#a8e4ff', topLo: '#2f9ad8', fill: '#ffb3d9', fillLo: '#ff8fc6', dots: ['#b06ad8', '#ffe14d', '#ffffff'], block: 'mashablock', ice: false, topStyle: 'grass', dotShape: 'dot' },
});

/* ===== Вороги частини 21 — звичайні (равлики, жабки, пташки, бджілки, кажанчики) ===== */
function drawEnemy21(c, e, cx, fl) { return false; }

/* ===== Обличчя: сумне, веселе, сміється ===== */
function face21(c, x, y, s, mood, t, opts) {
  opts = opts || {};
  c.save(); c.translate(x, y); c.scale(s, s); c.lineCap = 'round'; c.lineJoin = 'round';
  if (mood > 0.5 && opts.laugh) {
    // сміється: очі-дужки
    c.strokeStyle = INK; c.lineWidth = 1.5;
    for (const ex of [-5, 5]) { c.beginPath(); c.arc(ex, 0, 2.6, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke(); }
  } else {
    c.fillStyle = INK; for (const ex of [-5, 5]) { ell(c, ex, 0, 1.7, 2.1); c.fill(); }
    c.fillStyle = '#fff'; for (const ex of [-5, 5]) { circ(c, ex - 0.6, -0.8, 0.7); c.fill(); }
    if (mood < 0) { c.strokeStyle = INK; c.lineWidth = 1.1; c.beginPath(); c.moveTo(-7.5, -3.2); c.lineTo(-3, -4.8); c.moveTo(7.5, -3.2); c.lineTo(3, -4.8); c.stroke(); }
  }
  c.strokeStyle = INK; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-4.5, 5); c.quadraticCurveTo(0, 5 + mood * 5, 4.5, 5); c.stroke();
  if (mood > 0.5 && opts.laugh) { c.fillStyle = '#ff6f9c'; c.beginPath(); c.moveTo(-4, 5.4); c.quadraticCurveTo(0, 11, 4, 5.4); c.closePath(); c.fill(); }
  if (mood > 0) { c.fillStyle = 'rgba(255,120,170,.55)'; circ(c, -8.4, 3, 1.9); c.fill(); circ(c, 8.4, 3, 1.9); c.fill(); }
  if (mood < 0 && opts.tear) { const k = (t * 0.9) % 1; c.fillStyle = '#7fd0ff'; c.beginPath(); c.ellipse(-6, 3 + k * 6, 1.3, 1.9, 0, 0, TAU); c.fill(); }
  c.restore();
}

/* ===== Сумні хмаринки: дощать, а після пострілу всміхаються й стають хмаринкою-містком ===== */
function drawSadCloud(c, q, t) {
  const x0 = q.x0 * T, w = q.w * T, y = q.row * T, cx = x0 + w / 2;
  if (q.happy) {
    // хмаринку малює плитка, тут — лише обличчя й радість
    const bob = q.joy > 0 ? Math.sin(q.joy * 16) * 2 * q.joy : 0;
    face21(c, cx, y + 10 + bob, 1, 1, t, { laugh: q.joy > 0 });
    if (q.joy > 0) for (let i = 0; i < 5; i++) { const a = t * 3 + i * TAU / 5; sparkle(c, cx + Math.cos(a) * (w / 2 + 4), y + 8 + Math.sin(a) * 14, 1.5, RAINBOW[i]); }
    return;
  }
  // дощик
  c.save(); c.strokeStyle = 'rgba(90,150,230,.55)'; c.lineWidth = 1.4; c.lineCap = 'round';
  for (let i = 0; i < q.w * 3; i++) {
    const rx = x0 + 6 + i * (w - 12) / Math.max(1, q.w * 3 - 1), ph = (t * 1.6 + i * 0.37 + q.x0 * 0.13) % 1, ry = y + 22 + ph * 70;
    c.globalAlpha = 1 - ph * 0.8; c.beginPath(); c.moveTo(rx, ry); c.lineTo(rx - 1.5, ry + 7); c.stroke();
  }
  c.restore();
  // сіра хмаринка
  const wob = Math.sin(t * 1.4 + q.x0) * 1.2;
  c.save(); c.translate(0, wob); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = '#c9d1de';
  c.beginPath(); c.moveTo(x0 + 6, y + 20);
  const bumps = q.w * 2;
  for (let i = 0; i < bumps; i++) { const bx = x0 + 6 + (i + 0.5) * (w - 12) / bumps, r = (w - 12) / bumps / 2 + 3; c.arc(bx, y + 9 - (i % 2) * 3, r, Math.PI, TAU); }
  c.lineTo(x0 + w - 6, y + 20); c.quadraticCurveTo(cx, y + 26, x0 + 6, y + 20); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.4)'; ell(c, x0 + 12, y + 4, 6, 3); c.fill();
  face21(c, cx, y + 12, 1, -1, t, { tear: true });
  c.restore();
}

/* ===== Лоскотна квіточка: сумна похнюпилась, весела підкидає вгору ===== */
const TICKLE_COLS = ['#ff7ab8', '#ffd23f', '#b98cff', '#4cb6ff'];
function drawTickle(c, f, t, sq) {
  const x = f.x, gy = f.gy, col = TICKLE_COLS[Math.floor(f.x / T) % TICKLE_COLS.length];
  c.save(); c.translate(x, gy); c.lineJoin = 'round'; c.lineCap = 'round';
  // листочки
  c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = '#6fcf5a';
  ell(c, -7, -4, 6, 3, -0.4); c.fill(); c.stroke(); ell(c, 7, -4, 6, 3, 0.4); c.fill(); c.stroke();
  if (!f.happy) {
    // стебло похнюпилось, голівка дивиться вниз
    c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(2, -16, 9, -18); c.stroke();
    c.strokeStyle = '#5fbf4a'; c.lineWidth = 2.4; c.stroke();
    c.translate(10, -14); c.rotate(0.9);
    c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 1;
    for (let i = 0; i < 6; i++) { const a = i * TAU / 6; c.beginPath(); c.ellipse(Math.cos(a) * 6, Math.sin(a) * 6, 4.5, 3, a, 0, TAU); c.fill(); c.stroke(); }
    c.fillStyle = '#ffe9a8'; circ(c, 0, 0, 5.4); c.fill(); c.stroke();
    c.rotate(-0.9); face21(c, 0, 0, 0.45, -1, t, { tear: true });
  } else {
    const k = sq > 0 ? sq / 0.22 : 0, h = 22 - k * 8, wig = f.joy > 0 ? Math.sin(t * 30) * 0.12 : Math.sin(t * 2 + x) * 0.04;
    c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -h); c.stroke();
    c.strokeStyle = '#5fbf4a'; c.lineWidth = 2.4; c.stroke();
    // пружинка-листок, на який стрибають
    c.fillStyle = '#9fe08a'; c.strokeStyle = INK; c.lineWidth = 1.1; ell(c, 0, -h + 1, 12, 3.4); c.fill(); c.stroke();
    c.translate(0, -h - 8); c.rotate(wig);
    c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 1;
    for (let i = 0; i < 8; i++) { const a = i * TAU / 8 + t * 0.4; c.beginPath(); c.ellipse(Math.cos(a) * 8, Math.sin(a) * 8, 5.4, 3.4, a, 0, TAU); c.fill(); c.stroke(); }
    c.fillStyle = '#ffe9a8'; circ(c, 0, 0, 7); c.fill(); c.stroke();
    face21(c, 0, 0, 0.6, 1, t, { laugh: f.joy > 0 || sq > 0 });
  }
  c.restore();
}

/* ===== Кубик-смайлик: сумний сидить унизу, веселий піднімається сходинкою ===== */
function drawMood(c, m, t) {
  const x = m.x, y = m.y, w = m.w, happy = m.state !== 'sad';
  c.save(); c.lineJoin = 'round';
  if (happy) {
    // чарівний слід під кубиком
    for (let i = 0; i < 4; i++) { const ph = (t * 1.5 + i * 0.25) % 1; c.globalAlpha = 1 - ph; sparkle(c, x + w / 2 + Math.sin(i * 2.1 + t) * w * 0.3, y + 26 + ph * 26, 1.3, RAINBOW[(i + Math.floor(t * 3)) % 6]); }
    c.globalAlpha = 1;
  }
  const col = happy ? ['#ffd23f', '#fff0a0', '#e0a820'] : ['#9fb2cc', '#c9d6e6', '#7a8ca8'];
  c.strokeStyle = INK; c.lineWidth = 1.5; rr(c, x + 1, y, w - 2, T, 6); c.fillStyle = col[0]; c.fill(); c.stroke();
  c.fillStyle = col[1]; rr(c, x + 4, y + 3, w - 8, 5, 2.5); c.fill();
  c.fillStyle = col[2]; rr(c, x + 4, y + T - 6, w - 8, 3, 1.5); c.fill();
  const bob = m.joy > 0 ? Math.sin(m.joy * 18) * 1.5 : 0;
  face21(c, x + w / 2, y + 11 + bob, 0.9, happy ? 1 : -1, t, { tear: !happy, laugh: m.joy > 0 });
  c.restore();
}

/* ===== Повітряна доріжка із зілля ===== */
function drawAirSeg(c, m, t) {
  if (m.state === 'gone') return;
  c.save(); c.globalAlpha = Math.min(1, m.life * 2);
  const x = m.x, y = m.y, w = m.w;
  c.fillStyle = 'rgba(232,214,255,.85)';
  for (let i = 0; i < 4; i++) { circ(c, x + 6 + i * (w - 12) / 3, y + 4 + Math.sin(t * 4 + i + x * 0.1) * 1.2, 6); c.fill(); }
  c.fillStyle = 'rgba(255,255,255,.9)'; rr(c, x + 2, y + 1, w - 4, 4, 2); c.fill();
  for (let i = 0; i < 3; i++) sparkle(c, x + 8 + i * 12, y + 3 + Math.sin(t * 6 + i) * 3, 1.3, i % 2 ? '#ffe14d' : '#b98cff');
  c.restore();
}
function drawMover21(c, m) {
  if (m.mood) { drawMood(c, m, G.t); return true; }
  if (m.airSeg) { drawAirSeg(c, m, G.t); return true; }
  return false;
}

/* ===== Світ: сумні хмаринки й лоскотні квіточки ===== */
function drawWorld21(c, t, vis) {
  if (G.sadClouds) for (const q of G.sadClouds) if (vis(q.x0 * T + q.w * T / 2, q.w * T)) drawSadCloud(c, q, t);
  if (G.tickles) for (const f of G.tickles) if (vis(f.x)) { const sp = f.spring; drawTickle(c, f, t, sp ? sp.sq : 0); }
  drawWorld22(c, t, vis);
}

/* ===== Парасолька над єдиноріжкою, сердечко-суперсила, зілля ===== */
function drawUmbrellaShape(c, x, y, open, t, s) {
  c.save(); c.translate(x, y); c.scale(s || 1, s || 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK;
  if (open) {
    const cols = ['#ff5c7a', '#ffffff', '#4cb6ff', '#ffffff', '#ffd23f', '#ffffff'];
    c.lineWidth = 1.4; c.beginPath(); c.moveTo(0, -16); c.lineTo(0, 10); c.stroke();
    c.beginPath(); c.arc(-3, 10, 3, 0, Math.PI); c.stroke();
    for (let i = 0; i < 6; i++) {
      const a0 = Math.PI + i * Math.PI / 6, a1 = a0 + Math.PI / 6;
      c.fillStyle = cols[i]; c.beginPath(); c.moveTo(0, -16); c.lineTo(Math.cos(a0) * 22, -16 + Math.sin(a0) * 12 + 12); c.quadraticCurveTo(Math.cos((a0 + a1) / 2) * 20, -12 + Math.sin((a0 + a1) / 2) * 12 + 10, Math.cos(a1) * 22, -16 + Math.sin(a1) * 12 + 12); c.closePath(); c.fill(); c.lineWidth = 1; c.stroke();
    }
    c.fillStyle = INK; circ(c, 0, -17, 1.6); c.fill();
  } else {
    c.rotate(0.5);
    c.lineWidth = 1.3; c.beginPath(); c.moveTo(0, -12); c.lineTo(0, 10); c.stroke(); c.beginPath(); c.arc(-2.4, 10, 2.4, 0, Math.PI); c.stroke();
    c.fillStyle = '#ff5c7a'; c.beginPath(); c.moveTo(0, -14); c.quadraticCurveTo(5, -4, 2, 4); c.lineTo(-2, 4); c.quadraticCurveTo(-5, -4, 0, -14); c.closePath(); c.fill(); c.lineWidth = 1; c.stroke();
    c.strokeStyle = '#ffffff'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-1, -6); c.lineTo(1.4, -2); c.stroke();
  }
  c.restore();
}
function heart21(c, x, y, s) {
  c.beginPath(); c.moveTo(x, y + 6 * s);
  c.bezierCurveTo(x - 10 * s, y - 1 * s, x - 7 * s, y - 9 * s, x, y - 4.5 * s);
  c.bezierCurveTo(x + 7 * s, y - 9 * s, x + 10 * s, y - 1 * s, x, y + 6 * s); c.closePath();
}
function drawUnder21(c, P, t) {
  // зілля: під ногами іскорки, поки воно діє
  if (P.airT > 0 && !P.onGround) { c.save(); c.globalAlpha = 0.7; for (let i = 0; i < 4; i++) sparkle(c, P.x + P.w / 2 - P.dir * (6 + i * 4), P.y + P.h + Math.sin(t * 9 + i) * 2, 1.2, i % 2 ? '#ffe14d' : '#b98cff'); c.restore(); }
}
function drawOver21(c, P, t) {
  if (P.umbT > 0) {
    const open = !P.onGround && P.vy > 0 && In.jump;
    if (open) drawUmbrellaShape(c, P.x + P.w / 2 + P.dir * 2, P.y - 14, true, t, P.big ? 1.3 : P.mini ? 0.7 : 1);
    else drawUmbrellaShape(c, P.x + P.w / 2 - P.dir * 10, P.y + 6, false, t, P.mini ? 0.6 : 0.8);
  }
  if (P.heartPow) {
    // маленьке сердечко кружляє біля єдиноріжки
    const a = t * 2.4, hx = P.x + P.w / 2 + Math.cos(a) * 18, hy = P.y + 4 + Math.sin(a) * 8;
    c.save(); c.globalAlpha = 0.9; heart21(c, hx, hy, 0.55); c.fillStyle = '#ff4f9a'; c.fill(); c.strokeStyle = '#ffffff'; c.lineWidth = 1; c.stroke(); c.restore();
  }
  drawOver22(c, P, t);
}

/* ===== Значки бонусів ===== */
function drawPowerIcon21(c, kind, t) {
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1;
  if (kind === 'heart') {
    heart21(c, 0, 0.5, 1); c.fillStyle = '#ff4f9a'; c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.75)'; ell(c, -3.6, -2.4, 1.8, 1.1, -0.6); c.fill();
  } else if (kind === 'umbrella') {
    drawUmbrellaShape(c, 0, 3, true, t, 0.42);
  } else if (kind === 'air' || kind === 'potbig' || kind === 'potsmall') {
    const big = kind === 'potbig', small = kind === 'potsmall';
    const liq = kind === 'air' ? ['#b98cff', '#e3d2ff'] : big ? ['#ff8a3d', '#ffd0a0'] : ['#4cb6ff', '#bfe6ff'];
    if (small) {
      c.fillStyle = 'rgba(230,245,255,.9)'; rr(c, -3.4, -6, 6.8, 13, 3); c.fill(); c.stroke();
      c.fillStyle = liq[0]; rr(c, -2.4, -1, 4.8, 7, 2.2); c.fill();
      c.fillStyle = '#c98d55'; rr(c, -2.2, -9, 4.4, 3, 1); c.fill(); c.stroke();
      c.fillStyle = '#fff'; starPath(c, 0, 2.6, 1.6, 0.7, 0); c.fill();
    } else {
      const r = big ? 7.6 : 6.4;
      c.fillStyle = 'rgba(240,235,255,.9)'; circ(c, 0, 2, r); c.fill(); c.stroke();
      c.save(); circ(c, 0, 2, r - 0.6); c.clip(); c.fillStyle = liq[0]; c.fillRect(-r, 2 - r * 0.15, r * 2, r * 2); c.fillStyle = liq[1]; ell(c, 0, 2 - r * 0.15, r, 1.6); c.fill(); c.restore();
      c.fillStyle = 'rgba(240,235,255,.95)'; rr(c, -2.6, -r - 1, 5.2, 4, 1); c.fill(); c.stroke();
      c.fillStyle = '#c98d55'; rr(c, -2.4, -r - 4, 4.8, 3.2, 1); c.fill(); c.stroke();
      if (big) { c.fillStyle = '#fff'; starPath(c, 0, 4, 3.6, 1.6, 0); c.fill(); }
      else { for (let i = 0; i < 3; i++) sparkle(c, -3 + i * 3, 3 + (i % 2) * 2, 0.8, '#ffffff'); }
      c.fillStyle = 'rgba(255,255,255,.8)'; ell(c, -r * 0.45, -r * 0.1, 1.4, 2.4, 0.4); c.fill();
    }
  } else return drawPowerIcon22(c, kind, t);
  return true;
}

/* ===== Сумний Смайлик (з малюнка Маші) ===== */
function drawSmileyBoss(c, B, t) {
  const x = B.x, cy = B.cy, R = B.R, fl = B.flash > 0;
  // настрій: від сумного (−1) до веселого (+1) — з кожним влученням Смайлик трішки веселішає
  const mood = B.dead ? 1 : clamp(1 - 2 * B.hp / B.max, -1, 0.6);
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  // тінь на землі
  if (!B.dead || true) { const h = Math.max(0, B.gy - (cy + R)); c.fillStyle = `rgba(59,31,79,${0.18 * Math.max(0.3, 1 - h / 200)})`; ell(c, x, B.gy - 2, R * (1 - Math.min(0.5, h / 400)), 5); c.fill(); }
  if (B.dead) for (let i = 0; i < 8; i++) { const a = t * 1.4 + i * TAU / 8; c.save(); c.globalAlpha = 0.8; if (i % 2) { heart21(c, x + Math.cos(a) * (R + 22), cy + Math.sin(a) * (R + 14), 0.6); c.fillStyle = '#ff7ab8'; c.fill(); } else sparkle(c, x + Math.cos(a) * (R + 22), cy + Math.sin(a) * (R + 14), 2.2, RAINBOW[i % 6]); c.restore(); }
  c.translate(x, cy);
  const sq = B.squash || 0, wob = B.state === 'sob' && !B.dead ? Math.sin(t * 22) * 0.03 : 0;
  c.scale(1 + sq * 0.5 + wob, 1 - sq * 0.5 - wob);
  // обвідка, як на малюнку Маші
  c.strokeStyle = 'rgba(70,140,230,.75)'; c.lineWidth = 1.6; c.beginPath(); c.arc(0, 0, R + 7, 0, TAU); c.stroke();
  // кругле обличчя, зафарбоване фіолетовим фломастером
  const g = c.createRadialGradient(-R * 0.35, -R * 0.4, 4, 0, 0, R);
  g.addColorStop(0, fl ? '#ffffff' : B.dead ? '#e6c4ff' : '#d8a8f5'); g.addColorStop(1, fl ? '#ffffff' : B.dead ? '#c08af0' : '#a564d6');
  c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 2; circ(c, 0, 0, R); c.fill(); c.stroke();
  if (!fl) {
    c.save(); circ(c, 0, 0, R - 1); c.clip(); c.strokeStyle = 'rgba(150,70,210,.35)'; c.lineWidth = 2.2;
    for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(Math.sin(i * 1.7) * 6, Math.cos(i * 2.3) * 5, R * (0.55 + i * 0.07), R * (0.45 + (i % 3) * 0.12), i * 0.6, 0, TAU); c.stroke(); }
    c.restore();
  }
  c.fillStyle = 'rgba(255,255,255,.45)'; ell(c, -R * 0.42, -R * 0.52, R * 0.22, R * 0.12, -0.5); c.fill();
  // брови
  if (!B.dead && mood < 0.3) { c.strokeStyle = INK; c.lineWidth = 2.2; const k = (0.3 - mood) * 5; c.beginPath(); c.moveTo(-R * 0.55, -R * 0.42 + k); c.lineTo(-R * 0.18, -R * 0.5 - k * 0.3); c.moveTo(R * 0.55, -R * 0.42 + k); c.lineTo(R * 0.18, -R * 0.5 - k * 0.3); c.stroke(); }
  // очі сині, як на малюнку
  const ex = R * 0.36, ey = -R * 0.18, closed = (B.state === 'sob' && !B.dead);
  for (const s of [-1, 1]) {
    if (closed) { c.strokeStyle = INK; c.lineWidth = 2.2; c.beginPath(); c.arc(s * ex, ey + 2, 6, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }
    else if (B.dead) { c.strokeStyle = '#1f5fd0'; c.lineWidth = 3; c.beginPath(); c.arc(s * ex, ey + 3, 6.4, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke(); }
    else {
      c.fillStyle = '#3f8fff'; c.strokeStyle = INK; c.lineWidth = 1.6; circ(c, s * ex, ey, 7.4); c.fill(); c.stroke();
      c.fillStyle = '#1b3f9a'; circ(c, s * ex + (B.dir || 0) * 1.4, ey + 1, 3.6); c.fill();
      c.fillStyle = '#ffffff'; circ(c, s * ex - 2.2, ey - 2.4, 1.8); c.fill();
    }
  }
  // сльози
  if (!B.dead && (B.state === 'sob' || B.state === 'cry' || B.state === 'wait')) {
    c.fillStyle = '#7fd0ff'; c.strokeStyle = 'rgba(31,95,208,.7)'; c.lineWidth = 1;
    for (const s of [-1, 1]) { const k = (t * 1.3 + (s > 0 ? 0.5 : 0)) % 1; c.beginPath(); c.ellipse(s * (ex + 2), ey + 10 + k * R * 0.7, 2.4, 3.4, 0, 0, TAU); c.fill(); c.stroke(); }
  }
  // рот: від сумної дужки до великої усмішки
  const mw = R * 0.42, my = R * 0.42;
  c.strokeStyle = '#1f5fd0'; c.lineWidth = 4.2;
  if (B.dead) {
    c.fillStyle = '#ff6f9c'; c.beginPath(); c.moveTo(-mw - 2, my - 6); c.quadraticCurveTo(0, my + 22, mw + 2, my - 6); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,120,170,.6)'; circ(c, -R * 0.66, R * 0.2, 5); c.fill(); circ(c, R * 0.66, R * 0.2, 5); c.fill();
  } else {
    c.beginPath(); c.moveTo(-mw, my); c.quadraticCurveTo(0, my + mood * 20, mw, my); c.stroke();
    if (mood > 0) { c.fillStyle = `rgba(255,120,170,${0.5 * mood})`; circ(c, -R * 0.66, R * 0.2, 5); c.fill(); circ(c, R * 0.66, R * 0.2, 5); c.fill(); }
  }
  c.restore();
}
function drawTearBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.lineJoin = 'round';
  c.fillStyle = '#7fd0ff'; c.strokeStyle = '#1f5fd0'; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(0, -8); c.quadraticCurveTo(6, 0, 5, 3); c.arc(0, 3, 5, 0, Math.PI); c.quadraticCurveTo(-6, 0, 0, -8); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.8)'; ell(c, -1.8, 2, 1.2, 2); c.fill();
  c.restore();
  // тінь на землі, щоб було видно, куди впаде
  c.save(); c.fillStyle = 'rgba(31,95,208,.25)'; ell(c, b.x, (G.boss ? G.boss.gy : 240) - 2, 6, 2); c.fill(); c.restore();
}

/* ===== Блоки ===== */
function drawBlock21(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'rainblock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#8fa3bf'; c.fill(); c.stroke();
    c.fillStyle = '#b4c4da'; rr(c, 3.5, 3.5, T - 7, 5, 2.5); c.fill();
    c.fillStyle = '#7fd0ff'; c.beginPath(); c.moveTo(16, 10); c.quadraticCurveTo(19.5, 15, 18.5, 17); c.arc(16, 17, 2.5, 0, Math.PI); c.quadraticCurveTo(12.5, 15, 16, 10); c.fill();
  } else if (b === 'umbrellablock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#ffffff'; c.fill(); c.stroke();
    c.save(); rr(c, 1.7, 1.7, T - 3.4, T - 3.4, 3.4); c.clip(); c.fillStyle = '#ff5c7a'; for (let k = -T; k < T; k += 8) { c.beginPath(); c.moveTo(k, 0); c.lineTo(k + 4, 0); c.lineTo(k + 4 + T, T); c.lineTo(k + T, T); c.closePath(); c.fill(); } c.restore();
    c.strokeStyle = INK; rr(c, 1, 1, T - 2, T - 2, 4); c.stroke();
  } else if (b === 'flowerblock') {
    rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#6fcf5a'; c.fill(); c.stroke();
    c.fillStyle = '#9fe08a'; circ(c, 7, 7, 4); c.fill(); circ(c, 17, 9, 3.4); c.fill();
    c.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) { const a = i * TAU / 5; circ(c, 13 + Math.cos(a) * 3, 15 + Math.sin(a) * 3, 2); c.fill(); }
    c.fillStyle = '#ffd23f'; circ(c, 13, 15, 1.6); c.fill();
  } else if (b === 'smileblock') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#ffd23f'; c.fill(); c.stroke();
    c.fillStyle = '#fff0a0'; rr(c, 3.5, 3.5, T - 7, 4, 2); c.fill();
    c.fillStyle = INK; circ(c, 9, 11, 1.3); c.fill(); circ(c, 15, 11, 1.3); c.fill();
    c.lineWidth = 1.2; c.beginPath(); c.moveTo(8.5, 15); c.quadraticCurveTo(12, 18.5, 15.5, 15); c.stroke();
  } else if (b === 'mashablock') {
    drawMashaBrick(c, 'blk');
  } else return drawBlock22(c, b);
  return true;
}
/* Кубики з малюнків Маші: зафарбовані фломастером, зі смужками всередині */
function drawMashaBrick(c, kind) {
  const pink = kind === 'mqP' || kind === 'muP', used = kind.slice(0, 2) === 'mu';
  const fill = pink ? (used ? '#ffc4e0' : '#ff8cc6') : (used ? '#b8e6ff' : '#5cc8ff'), hatch = pink ? (used ? '#ffadd4' : '#ff5caf') : (used ? '#9ad8ff' : '#2fa8f0');
  c.strokeStyle = INK; c.lineWidth = 1.4; c.lineJoin = 'round'; c.lineCap = 'round';
  rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = fill; c.fill();
  c.save(); rr(c, 1.5, 1.5, T - 3, T - 3, 2); c.clip();
  c.strokeStyle = hatch; c.lineWidth = 2.2;
  if (pink) { c.beginPath(); c.moveTo(2, 20); for (let i = 0; i < 6; i++) c.lineTo(4 + i * 3.6, i % 2 ? 20 : 4); c.stroke(); }
  else { c.beginPath(); for (let k = -T; k < T; k += 5) { c.moveTo(k, T); c.lineTo(k + T * 0.8, 0); } c.stroke(); }
  c.restore();
  c.strokeStyle = INK; c.lineWidth = 1.3; rr(c, 1, 1, T - 2, T - 2, 2); c.stroke();
  c.lineWidth = 1; c.beginPath(); c.moveTo(T - 1.5, 3); c.lineTo(T - 1.5, T - 3); c.stroke();
  if (kind.slice(0, 2) === 'mq') { c.fillStyle = '#ffffff'; c.strokeStyle = pink ? '#c0306a' : '#1f5fd0'; c.lineWidth = 1; starPath(c, T / 2, T / 2 + 1, 6, 2.7, 0); c.fill(); c.stroke(); }
}

/* ===== Декор ===== */
function drawDecor21(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'puddleS':
      c.fillStyle = 'rgba(127,208,255,.7)'; ell(c, x, y - 1, 9, 2.4); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.8)'; c.beginPath(); c.ellipse(x + Math.sin(t * 2 + x) * 2, y - 1, 3 + ((t + x * 0.1) % 1) * 4, 1, 0, 0, TAU); c.stroke();
      break;
    case 'umbS': drawUmbrellaShape(c, x, y - 10, true, t, 0.38); break;
    case 'daisyS':
      c.strokeStyle = '#5fbf4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 10); c.stroke();
      c.fillStyle = d.c || '#ffffff'; for (let i = 0; i < 6; i++) { const a = i * TAU / 6; circ(c, x + Math.cos(a) * 3, y - 12 + Math.sin(a) * 3, 2); c.fill(); }
      c.fillStyle = '#ffd23f'; circ(c, x, y - 12, 2); c.fill();
      c.fillStyle = INK; circ(c, x - 0.8, y - 12.4, 0.4); c.fill(); circ(c, x + 0.8, y - 12.4, 0.4); c.fill();
      break;
    case 'heartS':
      c.strokeStyle = '#3b1f4f'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 9); c.stroke();
      heart21(c, x, y - 12, 0.5); c.fillStyle = d.c || '#ff7ab8'; c.fill(); c.stroke();
      break;
    case 'pstarS':
      c.fillStyle = d.c || '#b06ad8'; c.save(); c.translate(x, y - 8); c.rotate(Math.sin(t + x) * 0.2);
      c.beginPath(); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; c.lineTo(Math.cos(a) * 7, Math.sin(a) * 7); c.lineTo(Math.cos(a + Math.PI / 4) * 2.2, Math.sin(a + Math.PI / 4) * 2.2); } c.closePath(); c.fill(); c.restore();
      break;
    case 'smileS':
      c.fillStyle = d.c || '#ffd23f'; circ(c, x, y - 6, 5); c.fill(); c.stroke();
      c.fillStyle = INK; circ(c, x - 1.6, y - 7, 0.6); c.fill(); circ(c, x + 1.6, y - 7, 0.6); c.fill();
      c.beginPath(); c.arc(x, y - 6.4, 2.4, 0.2 * Math.PI, 0.8 * Math.PI); c.stroke();
      break;
    default: drawDecor22(c, d, t);
  }
}

/* ===== Фони ===== */
function bgRainvalley(c, viewW, camX, t) {
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 6, viewW + 240) - 120; puffCloud(c, x, 26 + (i % 3) * 16, 1.1, 'rgba(176,190,212,.95)'); }
  c.strokeStyle = 'rgba(110,150,210,.35)'; c.lineWidth = 1.2;
  for (let i = 0; i < 40; i++) { const x = wrapX(i * 37 - camX * 0.3 - t * 40, viewW + 40) - 20, y = ((t * 220 + i * 53) % 260); c.beginPath(); c.moveTo(x, y); c.lineTo(x - 3, y + 9); c.stroke(); }
  hill(c, viewW, 188, 10, 0.012, 0.4, camX * 0.12, '#a9c3b6');
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#9fcf9a');
}
function bgUmbrellas(c, viewW, camX, t) {
  c.fillStyle = 'rgba(255,240,200,.9)'; circ(c, viewW * 0.75 - camX * 0.02 % 40, 70, 26); c.fill();
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.9)'); }
  // далекі гори
  const span = 220;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.15, span); c.fillStyle = '#c99aa8'; c.beginPath(); c.moveTo(wx - 40, 230); c.lineTo(wx + 70, 110 + (i % 2) * 20); c.lineTo(wx + 180, 230); c.closePath(); c.fill(); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(wx + 52, 132 + (i % 2) * 20); c.lineTo(wx + 70, 110 + (i % 2) * 20); c.lineTo(wx + 88, 132 + (i % 2) * 20); c.closePath(); c.fill(); }
  // парасольки летять у небі
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 260 + t * 18 - camX * 0.25, viewW + 200) - 100, y = 60 + (i % 3) * 26 + Math.sin(t * 1.2 + i) * 10; c.save(); c.globalAlpha = 0.75; drawUmbrellaShape(c, x, y, true, t, 0.55); c.restore(); }
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#b8e08a');
}
function bgTicklegarden(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 190, 10, 0.012, 0.4, camX * 0.12, '#c8efc0');
  const span = 110;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 30, k = ((i % 4) + 4) % 4, h = 60 + (k % 2) * 22, sway = Math.sin(t * 1.5 + i) * 3;
    c.strokeStyle = '#7fcf6a'; c.lineWidth = 4; c.beginPath(); c.moveTo(wx, 222); c.quadraticCurveTo(wx + sway, 222 - h / 2, wx + sway, 222 - h); c.stroke();
    c.fillStyle = TICKLE_COLS[k] + 'aa'; for (let p = 0; p < 7; p++) { const a = p * TAU / 7 + t * 0.2; circ(c, wx + sway + Math.cos(a) * 11, 222 - h + Math.sin(a) * 11, 7); c.fill(); }
    c.fillStyle = '#fff3c4'; circ(c, wx + sway, 222 - h, 7); c.fill();
    c.fillStyle = INK; c.globalAlpha = 0.6; circ(c, wx + sway - 2.4, 222 - h - 1, 0.9); c.fill(); circ(c, wx + sway + 2.4, 222 - h - 1, 0.9); c.fill();
    c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.arc(wx + sway, 222 - h + 1, 3, 0.2 * Math.PI, 0.8 * Math.PI); c.stroke(); c.globalAlpha = 1;
  }
  hill(c, viewW, 216, 6, 0.03, 1.2, camX * 0.45, '#a8e48a');
}
function bgSmiletown(c, viewW, camX, t) {
  // сонечко з усмішкою
  const sx = viewW * 0.8, sy = 56;
  c.fillStyle = 'rgba(255,214,70,.95)'; circ(c, sx, sy, 24); c.fill();
  c.strokeStyle = 'rgba(255,190,40,.8)'; c.lineWidth = 3; for (let i = 0; i < 10; i++) { const a = i * TAU / 10 + t * 0.3; c.beginPath(); c.moveTo(sx + Math.cos(a) * 30, sy + Math.sin(a) * 30); c.lineTo(sx + Math.cos(a) * 38, sy + Math.sin(a) * 38); c.stroke(); }
  face21(c, sx, sy, 1.6, 1, t, {});
  // будиночки з вікнами-оченятами
  const span = 130, cols = ['#ff9fd0', '#8fd0ff', '#b8e88a', '#ffc48a'];
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 20, k = ((i % 4) + 4) % 4, h = 70 + (k % 2) * 24;
    c.fillStyle = cols[k]; c.fillRect(wx, 222 - h, 64, h); c.fillStyle = '#e06a6a'; c.beginPath(); c.moveTo(wx - 6, 222 - h); c.lineTo(wx + 32, 222 - h - 30); c.lineTo(wx + 70, 222 - h); c.closePath(); c.fill();
    c.fillStyle = '#fffbe6'; rr(c, wx + 10, 222 - h + 14, 14, 14, 3); c.fill(); rr(c, wx + 40, 222 - h + 14, 14, 14, 3); c.fill();
    c.fillStyle = INK; circ(c, wx + 17, 222 - h + 21, 2); c.fill(); circ(c, wx + 47, 222 - h + 21, 2); c.fill();
    c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.arc(wx + 32, 222 - h + 34, 9, 0.2 * Math.PI, 0.8 * Math.PI); c.stroke();
  }
  hill(c, viewW, 220, 5, 0.03, 1.2, camX * 0.45, '#ffe6a8');
}
function bgMashaland(c, viewW, camX, t) {
  // лінійки, як у зошиті
  c.strokeStyle = 'rgba(120,180,255,.18)'; c.lineWidth = 1;
  for (let y = 20; y < 240; y += 20) { c.beginPath(); c.moveTo(0, y); c.lineTo(viewW, y); c.stroke(); }
  // жовте сонечко-завиток
  const sx = wrapX(viewW * 0.7 - camX * 0.03, viewW + 80) - 40;
  c.fillStyle = 'rgba(255,225,77,.75)'; circ(c, sx, 52, 20); c.fill();
  c.strokeStyle = 'rgba(200,150,0,.6)'; c.lineWidth = 1.6; c.beginPath(); for (let a = 0; a < 12; a += 0.3) c.lineTo(sx + Math.cos(a) * a * 1.3, 52 + Math.sin(a) * a * 1.3); c.stroke();
  // сердечка, фіолетові зірки й блакитні хмаринки, як на малюнку
  const span = 150;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span) + 30, k = ((i % 3) + 3) % 3, y = 70 + k * 30 + Math.sin(t + i) * 4;
    if (k === 0) { heart21(c, wx, y, 1.6); c.fillStyle = 'rgba(255,122,184,.45)'; c.fill(); }
    else if (k === 1) { c.save(); c.translate(wx, y); c.rotate(t * 0.3 + i); c.fillStyle = 'rgba(176,106,216,.45)'; c.beginPath(); for (let j = 0; j < 4; j++) { const a = j * Math.PI / 2; c.lineTo(Math.cos(a) * 14, Math.sin(a) * 14); c.lineTo(Math.cos(a + Math.PI / 4) * 4, Math.sin(a + Math.PI / 4) * 4); } c.closePath(); c.fill(); c.restore(); }
    else { c.strokeStyle = 'rgba(92,200,255,.6)'; c.lineWidth = 2.4; c.beginPath(); for (let j = 0; j < 5; j++) c.arc(wx - 16 + j * 8, y, 5, Math.PI, TAU); c.stroke(); }
  }
  // рожева пташка летить
  const bx = wrapX(t * 26 - camX * 0.3, viewW + 120) - 60, byy = 40 + Math.sin(t * 2) * 8;
  c.fillStyle = 'rgba(255,110,180,.7)'; ell(c, bx, byy, 7, 4); c.fill(); c.beginPath(); c.moveTo(bx - 2, byy - 1); c.lineTo(bx - 8, byy - 8 + Math.sin(t * 12) * 4); c.lineTo(bx + 3, byy - 2); c.closePath(); c.fill();
  hill(c, viewW, 218, 6, 0.03, 1.2, camX * 0.45, 'rgba(92,200,255,.35)');
}
Object.assign(BG2, { rainvalley: bgRainvalley, umbrellas: bgUmbrellas, ticklegarden: bgTicklegarden, smiletown: bgSmiletown, mashaland: bgMashaland });
