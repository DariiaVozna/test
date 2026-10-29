'use strict';
/* ===== Константи світу ===== */
const T = 24, ROWS = 12, VIEW_H = ROWS * T, MIN_VIEW_W = 300;
const INK = '#3b1f4f';
const TAU = Math.PI * 2;

function makeCanvas(w, h) {
  if (typeof document !== 'undefined') { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  return createCanvas(w, h);
}
function rr(c, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  c.beginPath(); c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
function starPath(c, x, y, R, r, rot) {
  rot = rot || 0; c.beginPath();
  for (let i = 0; i < 10; i++) { const a = rot - Math.PI / 2 + i * Math.PI / 5, d = i % 2 ? r : R; c.lineTo(x + Math.cos(a) * d, y + Math.sin(a) * d); }
  c.closePath();
}
function heartPath(c, x, y, s) {
  const h = s / 2; c.beginPath();
  c.moveTo(x, y + h * 0.9);
  c.bezierCurveTo(x - h * 1.25, y + h * 0.05, x - h * 1.0, y - h * 1.05, x, y - h * 0.35);
  c.bezierCurveTo(x + h * 1.0, y - h * 1.05, x + h * 1.25, y + h * 0.05, x, y + h * 0.9);
  c.closePath();
}
function ell(c, x, y, rx, ry, rot) { c.beginPath(); c.ellipse(x, y, rx, ry, rot || 0, 0, TAU); }
function circ(c, x, y, r) { c.beginPath(); c.arc(x, y, r, 0, TAU); }
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const RAINBOW = ['#ff5c8a', '#ffa83b', '#ffe14d', '#54d68c', '#4cb6ff', '#a67bff'];

/* ===== Єдиноріжка: варіанти ===== */
const BODY = {
  white: { f: '#ffffff', s: '#eadcf5', label: 'Біла' },
  pink: { f: '#ffcfe6', s: '#f4a3cb', label: 'Рожева' },
  lilac: { f: '#e2d2ff', s: '#bba3ef', label: 'Бузкова' },
  sky: { f: '#cdeaff', s: '#97c9f0', label: 'Блакитна' },
  mint: { f: '#cdf7e8', s: '#8fdcc3', label: "М'ятна" },
  peach: { f: '#ffe0c7', s: '#f5b78f', label: 'Персикова' },
};
const MANE = {
  rainbow: { c: RAINBOW, label: 'Веселкова' },
  pink: { c: ['#ff3f9b', '#ff7ab8', '#ffb0d6'], label: 'Рожева' },
  purple: { c: ['#7b3dff', '#a978ff', '#d0b3ff'], label: 'Фіолетова' },
  blue: { c: ['#1f8fff', '#62bbff', '#a6dcff'], label: 'Блакитна' },
  gold: { c: ['#ff9f00', '#ffcb3d', '#fff0a0'], label: 'Золота' },
  mint: { c: ['#0fbf92', '#55e0bb', '#a6f2db'], label: "М'ятна" },
};
const ACC = [
  { id: 'crown', label: 'Корона' }, { id: 'flowers', label: 'Віночок' }, { id: 'stars', label: 'Зірочки на боці' },
  { id: 'bow', label: 'Бантик на хвості' }, { id: 'glasses', label: 'Окуляри-сердечка' }, { id: 'wings', label: 'Крильця' },
];
const FRIENDS = [{ id: 'cat', label: 'Котик' }, { id: 'dragon', label: 'Дракончик' }, { id: 'none', label: 'Без друга' }];

function leg(c, x, y, a, fill, hoof) {
  c.save(); c.translate(x, y); c.rotate(a);
  c.fillStyle = fill; c.strokeStyle = INK; c.lineWidth = 1.2;
  rr(c, -2.4, -1, 4.8, 12, 2.2); c.fill(); c.stroke();
  c.fillStyle = hoof; rr(c, -2.4, 8, 4.8, 3.2, 1.5); c.fill(); c.stroke();
  c.restore();
}
function drawWing(c, x, y, sc, ang, col, power) {
  c.save(); c.translate(x, y); c.rotate(-0.45 + ang); c.scale(sc, sc);
  if (power) { c.shadowColor = 'rgba(255,230,120,.9)'; c.shadowBlur = 6; }
  c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 1.1 / sc;
  c.beginPath(); c.moveTo(1, 0);
  c.quadraticCurveTo(-3, -11, -15, -12);
  c.quadraticCurveTo(-12.5, -8.5, -16, -6.5);
  c.quadraticCurveTo(-11.5, -4.5, -14, -1.5);
  c.quadraticCurveTo(-8.5, 0.5, -9.5, 3);
  c.quadraticCurveTo(-4, 3.5, 1, 0); c.closePath(); c.fill();
  c.shadowBlur = 0; c.stroke();
  c.strokeStyle = 'rgba(59,31,79,.35)'; c.beginPath(); c.moveTo(-2, -2); c.lineTo(-11, -8); c.moveTo(-3, 0); c.lineTo(-10, -3); c.stroke();
  c.restore();
}
function drawBow(c, x, y, col) {
  c.save(); c.translate(x, y); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 0.9;
  c.beginPath(); c.moveTo(0, 0); c.lineTo(-4.5, -3); c.lineTo(-4.5, 3); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(0, 0); c.lineTo(4.5, -3); c.lineTo(4.5, 3); c.closePath(); c.fill(); c.stroke();
  circ(c, 0, 0, 1.6); c.fill(); c.stroke(); c.restore();
}
function flower(c, x, y, r, col) {
  c.fillStyle = col; for (let i = 0; i < 5; i++) { const a = i * TAU / 5; circ(c, x + Math.cos(a) * r, y + Math.sin(a) * r, r * 0.85); c.fill(); }
  c.fillStyle = '#ffe14d'; circ(c, x, y, r * 0.7); c.fill();
}

/* o: {x,y — точка між копитцями; dir; t; run 0..1; air; s; prof; charge 0..1; blink; powerWings; alpha} */
function drawUnicorn(c, o) {
  const p = o.prof, B = BODY[p.body] || BODY.white, M = p.maneC || (MANE[p.mane] || MANE.rainbow).c, acc = p.acc || [];
  const has = id => acc.indexOf(id) >= 0;
  const t = o.t || 0, run = o.run || 0, air = !!o.air, s = o.s || 1, n = M.length;
  c.save(); c.translate(o.x, o.y); c.scale((o.dir || 1) * s, s);
  if (o.alpha != null) c.globalAlpha = o.alpha;
  c.lineJoin = 'round'; c.lineCap = 'round';
  const by = air ? 0 : -Math.abs(Math.sin(t * 11)) * 1.6 * run;

  if (o.powerWings) drawWing(c, -6, -24 + by, 1.25, Math.sin(t * 20) * 0.55 - 0.2, '#ffffff', true);

  // хвіст
  const tw = Math.sin(t * 7) * 2 + (air ? -2 : 0);
  for (let i = 0; i < n; i++) {
    c.strokeStyle = M[i]; c.lineWidth = n > 3 ? 2.7 : 3.8;
    const k = (i - (n - 1) / 2) * (n > 3 ? 1.25 : 1.9);
    c.beginPath(); c.moveTo(-12, -21 + by + k * 0.3);
    c.bezierCurveTo(-19 + tw * 0.3, -25 + by + k, -25 + tw, -16 + by + k, -20 + tw, -6.5 + by + k * 0.6);
    c.stroke();
  }
  if (has('bow')) drawBow(c, -14, -21.5 + by, M[0]);

  // ніжки
  const la = ph => air ? 0 : Math.sin(t * 13 + ph) * 0.6 * run;
  leg(c, -5, -11 + by, air ? 0.75 : la(Math.PI), B.s, B.s);
  leg(c, 9, -11 + by, air ? -0.75 : la(0), B.s, B.s);
  leg(c, -10, -11 + by, air ? 0.75 : la(0), B.f, B.s);
  leg(c, 4, -11 + by, air ? -0.75 : la(Math.PI), B.f, B.s);

  // тулуб
  c.fillStyle = B.f; c.strokeStyle = INK; c.lineWidth = 1.3;
  ell(c, 0, -17 + by, 14, 8.6); c.fill(); c.stroke();
  c.save(); ell(c, 0, -17 + by, 14, 8.6); c.clip();
  c.fillStyle = B.s; c.globalAlpha *= 0.5; ell(c, 1, -9.5 + by, 13, 3.6); c.fill();
  c.fillStyle = '#fff'; c.globalAlpha = (o.alpha != null ? o.alpha : 1) * 0.55; ell(c, -4, -22 + by, 6, 1.8, -0.15); c.fill();
  c.restore();
  if (has('stars')) {
    c.fillStyle = '#ffd23f'; c.strokeStyle = '#d18f00'; c.lineWidth = 0.7;
    starPath(c, -5, -17.5 + by, 3.3, 1.4, 0.2); c.fill(); c.stroke();
    starPath(c, 1.8, -14 + by, 2.3, 1, -0.2); c.fill(); c.stroke();
    starPath(c, -9.5, -13.5 + by, 1.7, 0.8, 0); c.fill(); c.stroke();
  }
  if (has('wings') && !o.powerWings) drawWing(c, -3, -23 + by, 0.8, Math.sin(t * 3) * 0.12, M[Math.min(1, n - 1)], false);

  // шия та голова: заливка закритим контуром, обвідка відкритим
  const head = (close) => {
    c.beginPath();
    c.moveTo(3, -24 + by);
    c.quadraticCurveTo(5, -33 + by, 11, -35.5 + by);
    c.quadraticCurveTo(17, -38 + by, 19.5, -31 + by);
    c.quadraticCurveTo(25, -28.5 + by, 23.2, -23.8 + by);
    c.quadraticCurveTo(22, -20.6 + by, 17.2, -21.4 + by);
    c.quadraticCurveTo(14.5, -19.5 + by, 13, -13 + by);
    if (close) { c.lineTo(6, -15 + by); c.closePath(); }
  };
  c.fillStyle = B.f; head(true); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1.3; head(false); c.stroke();
  c.fillStyle = B.s; c.globalAlpha *= 0.7; ell(c, 21, -24.6 + by, 2.9, 2.4, 0.3); c.fill(); c.globalAlpha = o.alpha != null ? o.alpha : 1;
  c.fillStyle = INK; circ(c, 22.4, -25.3 + by, 0.55); c.fill();
  c.lineWidth = 0.9; c.beginPath(); c.moveTo(19.4, -22.6 + by); c.quadraticCurveTo(20.6, -21.6 + by, 21.8, -22.4 + by); c.stroke();

  // грива
  for (let i = 0; i < n; i++) {
    const k = i * (n > 3 ? 0.95 : 1.5);
    c.strokeStyle = M[i]; c.lineWidth = n > 3 ? 2.5 : 3.5;
    c.beginPath(); c.moveTo(12.5 - k * 0.25, -36 + by + k * 0.15);
    c.bezierCurveTo(6 - k * 0.6, -37.5 + by + k * 0.3, 1.5 - k * 0.7, -30 + by + k, 3.5 - k * 0.45, -21 + by + k * 0.45);
    c.stroke();
  }
  // вушко
  c.fillStyle = B.f; c.strokeStyle = INK; c.lineWidth = 1.1;
  c.beginPath(); c.moveTo(9.2, -33.6 + by); c.lineTo(10.2, -40.5 + by); c.lineTo(13.4, -35.4 + by); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffb3d1'; c.beginPath(); c.moveTo(10.3, -34.6 + by); c.lineTo(10.7, -38.4 + by); c.lineTo(12.3, -35.5 + by); c.closePath(); c.fill();

  // ріг
  const tipX = 19.6, tipY = -47.5 + by;
  if (o.charge > 0) {
    const g = c.createRadialGradient(tipX, tipY, 0, tipX, tipY, 4 + o.charge * 9);
    g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(0.4, o.charge >= 1 ? 'rgba(255,120,200,.7)' : 'rgba(255,220,120,.6)'); g.addColorStop(1, 'rgba(255,150,220,0)');
    c.fillStyle = g; circ(c, tipX, tipY, 4 + o.charge * 9); c.fill();
  }
  c.fillStyle = '#ffd54a'; c.strokeStyle = '#a86f00'; c.lineWidth = 1;
  c.beginPath(); c.moveTo(13.2, -36.2 + by); c.lineTo(17.2, -36.6 + by); c.lineTo(tipX, tipY); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#e09a00'; c.lineWidth = 0.9;
  c.beginPath(); c.moveTo(14.2, -39 + by); c.lineTo(17.6, -38.6 + by); c.moveTo(15.4, -42 + by); c.lineTo(18.3, -41.8 + by); c.moveTo(16.8, -44.8 + by); c.lineTo(18.9, -44.8 + by); c.stroke();

  // чубчик
  c.lineWidth = n > 3 ? 2.3 : 3;
  for (let i = 0; i < Math.min(2, n); i++) { c.strokeStyle = M[i]; c.beginPath(); c.moveTo(12.5, -35.8 + by + i); c.quadraticCurveTo(16 + i, -37.5 + by + i, 16.2 + i * 0.5, -33.5 + by + i * 0.5); c.stroke(); }

  if (has('crown')) {
    c.save(); c.translate(14.6, -36.6 + by); c.rotate(-0.12);
    c.fillStyle = '#ffcc33'; c.strokeStyle = '#a86f00'; c.lineWidth = 0.9;
    c.beginPath(); c.moveTo(-4.4, 0.5); c.lineTo(-4.6, -4.8); c.lineTo(-2.2, -2.2); c.lineTo(0, -5.6); c.lineTo(2.2, -2.2); c.lineTo(4.6, -4.8); c.lineTo(4.4, 0.5); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ff4fa3'; circ(c, 0, -1.4, 1); c.fill();
    c.fillStyle = '#4cb6ff'; circ(c, -3, -0.9, 0.7); c.fill(); circ(c, 3, -0.9, 0.7); c.fill();
    c.restore();
  }
  if (has('flowers')) {
    flower(c, 10.6, -36 + by, 1.25, '#ff7ab8'); flower(c, 13.8, -37.8 + by, 1.25, '#fff2a8'); flower(c, 17.2, -36.6 + by, 1.25, '#a6dcff');
  }

  // очко
  if (o.blink) { c.strokeStyle = INK; c.lineWidth = 1.1; c.beginPath(); c.moveTo(14.2, -29 + by); c.quadraticCurveTo(15.6, -27.8 + by, 17, -29 + by); c.stroke(); }
  else {
    c.fillStyle = INK; ell(c, 15.6, -29.2 + by, 1.55, 2.15); c.fill();
    c.fillStyle = '#fff'; circ(c, 16.1, -30.1 + by, 0.65); c.fill();
    c.strokeStyle = INK; c.lineWidth = 0.8;
    c.beginPath(); c.moveTo(14.3, -30.9 + by); c.lineTo(13.2, -32.3 + by); c.moveTo(15.5, -31.4 + by); c.lineTo(15.3, -33 + by); c.moveTo(16.8, -31.1 + by); c.lineTo(17.6, -32.4 + by); c.stroke();
  }
  c.fillStyle = 'rgba(255,120,180,.5)'; circ(c, 18.4, -25.6 + by, 1.7); c.fill();
  if (has('glasses')) {
    c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(13, -30.2 + by); c.lineTo(10.2, -31.4 + by); c.stroke();
    c.fillStyle = 'rgba(255,79,163,.72)'; heartPath(c, 16, -29.4 + by, 6); c.fill(); c.lineWidth = 0.9; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.7)'; circ(c, 14.8, -30.6 + by, 0.7); c.fill();
  }
  c.restore();
}

/* ===== Друзі ===== */
function drawCat(c, x, y, dir, t) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const f = Math.sin(t * 18) * 0.6;
  c.save(); c.translate(-3, -2); c.rotate(-0.6 + f); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 0.9; ell(c, -4, -3, 5, 2.6, 0.3); c.fill(); c.stroke(); c.restore();
  c.strokeStyle = '#f08a3c'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(-6, 2); c.quadraticCurveTo(-12, 1, -10.5, -5); c.stroke();
  c.fillStyle = '#ffb86b'; c.strokeStyle = INK; c.lineWidth = 1;
  ell(c, -1, 3, 6.5, 4.5); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(0.4, -5.5); c.lineTo(1.2, -11); c.lineTo(4, -7.6); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(5.4, -7.8); c.lineTo(8.4, -10.8); c.lineTo(9, -5); c.closePath(); c.fill(); c.stroke();
  circ(c, 4.6, -3, 5.4); c.fill(); c.stroke();
  c.strokeStyle = '#f08a3c'; c.lineWidth = 0.9; c.beginPath(); c.moveTo(3.4, -8); c.lineTo(3.6, -6.4); c.moveTo(5.2, -8.2); c.lineTo(5.1, -6.6); c.stroke();
  c.fillStyle = INK; circ(c, 3.2, -3.4, 0.9); c.fill(); circ(c, 7, -3.4, 0.9); c.fill();
  c.fillStyle = '#ff7ab8'; circ(c, 5.2, -1.6, 0.8); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.5; c.beginPath(); c.moveTo(7, -1.2); c.lineTo(10.5, -2); c.moveTo(7, -0.6); c.lineTo(10.5, 0.2); c.stroke();
  c.restore();
}
function drawDragon(c, x, y, dir, t) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const f = Math.sin(t * 16) * 0.55;
  c.save(); c.translate(-2, -3); c.rotate(-0.7 + f); c.fillStyle = '#5fcf9a'; c.strokeStyle = INK; c.lineWidth = 0.9;
  c.beginPath(); c.moveTo(0, 0); c.lineTo(-9, -6); c.lineTo(-7.5, -2); c.lineTo(-10, 0); c.lineTo(-6, 1.5); c.closePath(); c.fill(); c.stroke(); c.restore();
  c.strokeStyle = INK; c.lineWidth = 1; c.fillStyle = '#8fe3b7';
  c.beginPath(); c.moveTo(-5, 4); c.quadraticCurveTo(-12, 6, -13, 0); c.lineWidth = 2.6; c.strokeStyle = '#8fe3b7'; c.stroke();
  c.fillStyle = '#5fcf9a'; c.beginPath(); c.moveTo(-13, 0); c.lineTo(-15.5, -2.5); c.lineTo(-11.5, -2.5); c.closePath(); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1; c.fillStyle = '#8fe3b7';
  ell(c, -1, 3, 6.5, 5); c.fill(); c.stroke();
  c.fillStyle = '#fff3c4'; ell(c, 0.5, 4.5, 3.6, 3); c.fill();
  c.fillStyle = '#8fe3b7'; ell(c, 5, -3, 5.6, 5); c.fill(); c.stroke();
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(2.4, -7); c.lineTo(2, -10.5); c.lineTo(4.2, -7.6); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(5.6, -7.8); c.lineTo(6.6, -11); c.lineTo(7.6, -7.4); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 6.4, -4, 1); c.fill(); c.fillStyle = '#fff'; circ(c, 6.7, -4.4, 0.35); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(7.6, -1.2); c.quadraticCurveTo(8.8, -0.2, 10, -1.4); c.stroke();
  c.fillStyle = 'rgba(255,120,180,.55)'; circ(c, 8.6, -2.4, 1); c.fill();
  c.restore();
}

/* ===== Вороги ===== */
function drawGrump(c, x, y, t, flash, happy) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.lineCap = 'round';
  const puffs = [[-9, 2, 7], [0, -3, 9], [9, 2, 7], [0, 4.5, 8]];
  c.strokeStyle = INK; c.lineWidth = 2.4; for (const p of puffs) { circ(c, p[0], p[1], p[2]); c.stroke(); }
  c.fillStyle = flash ? '#ffffff' : (happy ? '#f4f6ff' : '#b8b2cf'); for (const p of puffs) { circ(c, p[0], p[1], p[2]); c.fill(); }
  c.fillStyle = 'rgba(255,255,255,.45)'; ell(c, -3, -7, 5, 2.4, -0.2); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1.2;
  if (happy) {
    c.fillStyle = INK; circ(c, -4, 0, 1.3); c.fill(); circ(c, 4, 0, 1.3); c.fill();
    c.beginPath(); c.arc(0, 3, 3, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
  } else {
    c.beginPath(); c.moveTo(-7, -4.5); c.lineTo(-2.2, -2.4); c.moveTo(7, -4.5); c.lineTo(2.2, -2.4); c.stroke();
    c.fillStyle = INK; circ(c, -4, 0, 1.4); c.fill(); circ(c, 4, 0, 1.4); c.fill();
    c.beginPath(); c.arc(0, 7.5, 3.2, 1.2 * Math.PI, 1.8 * Math.PI); c.stroke();
    c.strokeStyle = '#7fb8ff'; c.lineWidth = 1.2; const d = (t * 30) % 10;
    c.beginPath(); c.moveTo(-5, 13 + d); c.lineTo(-5.6, 15 + d); c.moveTo(4, 12 + (d + 5) % 10); c.lineTo(3.4, 14 + (d + 5) % 10); c.stroke();
  }
  c.restore();
}
function drawSnail(c, x, y, dir, t, flash) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const sq = Math.sin(t * 4) * 0.8;
  c.fillStyle = flash ? '#fff' : '#ffd77e'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(-12, 0); c.lineTo(10 + sq, 0); c.quadraticCurveTo(14 + sq, 0, 13.5 + sq, -6); c.quadraticCurveTo(13, -11, 9, -10); c.lineTo(4, -4); c.lineTo(-12, -3); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(10, -9.5); c.lineTo(9, -15); c.moveTo(12.5, -8.5); c.lineTo(13.5, -14); c.stroke();
  c.fillStyle = INK; circ(c, 9, -15.5, 1.3); c.fill(); circ(c, 13.6, -14.5, 1.3); c.fill();
  c.fillStyle = flash ? '#fff' : '#ffd77e'; c.beginPath(); c.arc(9, -15.5, 1.4, Math.PI, TAU); c.fill(); c.beginPath(); c.arc(13.6, -14.5, 1.4, Math.PI, TAU); c.fill();
  c.fillStyle = flash ? '#fff' : '#c9a6ff'; circ(c, -2, -10, 9); c.fill(); c.stroke();
  c.strokeStyle = '#8b63d9'; c.lineWidth = 1.6; c.beginPath();
  for (let a = 0; a < 4.2 * Math.PI; a += 0.3) { const r = 1 + a * 0.55; c.lineTo(-2 + Math.cos(a) * r, -10 + Math.sin(a) * r); }
  c.stroke();
  if (!flash) { c.fillStyle = INK; c.font = '800 6px Nunito, sans-serif'; c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 2); c.fillText('z', 13, -20 - (t * 4) % 4); }
  c.restore();
}
function drawHedgehog(c, x, y, dir, t) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round';
  const step = Math.sin(t * 12) * 1.2;
  c.fillStyle = '#5a3a2a'; c.strokeStyle = INK; c.lineWidth = 1.1;
  rr(c, -8 + step, -3, 4, 4, 1.5); c.fill(); rr(c, 3 - step, -3, 4, 4, 1.5); c.fill();
  c.fillStyle = '#6b4630';
  c.beginPath(); c.moveTo(-13, -3);
  for (let i = 0; i <= 8; i++) { const a = Math.PI + i * Math.PI / 8 * 0.85; const r1 = 11, r2 = 17; c.lineTo(-1 + Math.cos(a) * r1, -4 + Math.sin(a) * r1 * 0.95); c.lineTo(-1 + Math.cos(a + 0.12) * r2, -4 + Math.sin(a + 0.12) * r2 * 0.9); }
  c.lineTo(9, -6); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#a8744f'; ell(c, -1, -5, 10, 6.5); c.fill(); c.stroke();
  c.fillStyle = '#f2cda4'; c.beginPath(); c.moveTo(4, -10); c.quadraticCurveTo(15, -8, 15, -3); c.quadraticCurveTo(9, 0, 3, -1); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ff6fa8'; circ(c, 15, -3.5, 1.6); c.fill();
  c.fillStyle = INK; circ(c, 9, -6.5, 1.2); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.9; c.beginPath(); c.moveTo(7.4, -8.6); c.lineTo(10.4, -8.2); c.stroke();
  c.restore();
}
function drawBat(c, x, y, t, hang, flash) {
  c.save(); c.translate(x, y); c.lineJoin = 'round';
  const body = flash ? '#fff' : '#7a62b8', wing = flash ? '#eee' : '#4f3f86';
  if (hang) {
    c.strokeStyle = '#5b3b2a'; c.lineWidth = 2; c.beginPath(); c.moveTo(-10, -12); c.lineTo(10, -12); c.stroke();
    c.save(); c.rotate(Math.PI); c.translate(0, 2);
    c.fillStyle = wing; c.strokeStyle = INK; c.lineWidth = 1; ell(c, 0, -1, 6.5, 8); c.fill(); c.stroke();
    c.fillStyle = body; circ(c, 0, -2, 5); c.fill(); c.stroke();
    c.restore();
    c.fillStyle = INK; c.beginPath(); c.moveTo(-1.6, 4.5); c.lineTo(-2.6, 2.8); c.moveTo(1.6, 4.5); c.lineTo(2.6, 2.8); c.stroke();
    c.strokeStyle = INK; c.lineWidth = 0.9; c.beginPath(); c.moveTo(-3, 3.4); c.quadraticCurveTo(-2, 4.6, -1, 3.4); c.moveTo(1, 3.4); c.quadraticCurveTo(2, 4.6, 3, 3.4); c.stroke();
    c.restore(); return;
  }
  const f = Math.sin(t * 18);
  c.fillStyle = wing; c.strokeStyle = INK; c.lineWidth = 1;
  for (const s of [-1, 1]) {
    c.save(); c.scale(s, 1); c.beginPath(); c.moveTo(3, -1);
    c.quadraticCurveTo(9, -8 * f - 3, 15, -5 * f - 2); c.quadraticCurveTo(13, 0, 15, 3); c.quadraticCurveTo(10, 1, 9, 4); c.quadraticCurveTo(6, 2, 3, 3); c.closePath(); c.fill(); c.stroke(); c.restore();
  }
  c.fillStyle = body; circ(c, 0, 0, 5.5); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-4, -3); c.lineTo(-4.5, -8.5); c.lineTo(-1.5, -4.8); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(4, -3); c.lineTo(4.5, -8.5); c.lineTo(1.5, -4.8); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, -2, -0.6, 1.8); c.fill(); circ(c, 2, -0.6, 1.8); c.fill();
  c.fillStyle = INK; circ(c, -1.7, -0.3, 0.9); c.fill(); circ(c, 2.3, -0.3, 0.9); c.fill();
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-1.2, 2.4); c.lineTo(-0.6, 4); c.lineTo(0, 2.4); c.closePath(); c.fill();
  c.restore();
}
function drawBoss(c, x, y, t, flash, mood) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.lineCap = 'round';
  const wob = Math.sin(t * 3) * 1.5;
  const puffs = [[-34, 8, 20], [-16, -6, 26], [10, -10, 28], [32, 4, 22], [0, 14, 26], [-26, 20, 16], [24, 20, 16]];
  c.strokeStyle = INK; c.lineWidth = 3; for (const p of puffs) { circ(c, p[0], p[1] + wob * (p[0] > 0 ? 1 : -1) * 0.4, p[2]); c.stroke(); }
  const body = mood === 'happy' ? '#fbfbff' : flash ? '#ffffff' : '#5c5278';
  c.fillStyle = body; for (const p of puffs) { circ(c, p[0], p[1] + wob * (p[0] > 0 ? 1 : -1) * 0.4, p[2]); c.fill(); }
  c.fillStyle = mood === 'happy' ? 'rgba(255,200,230,.5)' : 'rgba(255,255,255,.14)'; ell(c, -8, -20, 22, 8, -0.1); c.fill();
  // корона
  c.save(); c.translate(6, -36); c.rotate(0.08 + Math.sin(t * 2) * 0.05);
  c.fillStyle = '#ffcc33'; c.strokeStyle = '#8a5a00'; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(-16, 6); c.lineTo(-17, -10); c.lineTo(-8, -2); c.lineTo(0, -14); c.lineTo(8, -2); c.lineTo(17, -10); c.lineTo(16, 6); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#7b3dff'; circ(c, 0, 0, 2.6); c.fill(); c.fillStyle = '#ff4fa3'; circ(c, -10, 1.5, 1.8); c.fill(); circ(c, 10, 1.5, 1.8); c.fill();
  c.restore();
  c.strokeStyle = INK; c.lineWidth = 2.4;
  if (mood === 'happy') {
    c.fillStyle = INK; circ(c, -10, 2, 3); c.fill(); circ(c, 12, 2, 3); c.fill();
    c.beginPath(); c.arc(1, 9, 8, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
    c.fillStyle = 'rgba(255,120,180,.5)'; circ(c, -18, 9, 4); c.fill(); circ(c, 20, 9, 4); c.fill();
  } else {
    c.beginPath(); c.moveTo(-20, -6); c.lineTo(-5, 0); c.moveTo(22, -6); c.lineTo(7, 0); c.stroke();
    c.fillStyle = '#ffe14d'; circ(c, -10, 4, 4); c.fill(); circ(c, 12, 4, 4); c.fill();
    c.fillStyle = INK; circ(c, -9, 5, 2); c.fill(); circ(c, 11, 5, 2); c.fill();
    c.beginPath(); c.moveTo(-10, 20); c.lineTo(-5, 16); c.lineTo(0, 20); c.lineTo(5, 16); c.lineTo(10, 20); c.stroke();
  }
  c.restore();
}
function drawBolt(c, x, y, t) {
  c.save(); c.translate(x, y); c.lineJoin = 'round';
  c.shadowColor = 'rgba(255,230,80,.9)'; c.shadowBlur = 8;
  c.fillStyle = '#ffe14d'; c.strokeStyle = '#a86f00'; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(-3, -12); c.lineTo(5, -12); c.lineTo(1, -3); c.lineTo(6, -3); c.lineTo(-4, 12); c.lineTo(-1, 1); c.lineTo(-6, 1); c.closePath(); c.fill(); c.shadowBlur = 0; c.stroke();
  c.restore();
}

/* ===== Предмети ===== */
function drawStar(c, x, y, t, R) {
  R = R || 7.5;
  c.save(); c.translate(x, y);
  const g = c.createRadialGradient(0, 0, 0, 0, 0, R * 1.9); g.addColorStop(0, 'rgba(255,240,150,.55)'); g.addColorStop(1, 'rgba(255,240,150,0)');
  c.fillStyle = g; circ(c, 0, 0, R * 1.9); c.fill();
  c.scale(Math.max(0.3, Math.abs(Math.cos(t * 2.4))), 1);
  c.fillStyle = '#ffcf2e'; c.strokeStyle = '#c98200'; c.lineWidth = 1.2; c.lineJoin = 'round';
  starPath(c, 0, 0.5, R, R * 0.48, 0); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.75)'; starPath(c, -1.2, -0.8, R * 0.38, R * 0.18, 0); c.fill();
  c.restore();
}
function drawRainbowStar(c, x, y, t) {
  const R = 11; c.save(); c.translate(x, y);
  const g = c.createRadialGradient(0, 0, 0, 0, 0, R * 2.2); g.addColorStop(0, 'rgba(255,255,255,.75)'); g.addColorStop(1, 'rgba(255,200,255,0)');
  c.fillStyle = g; circ(c, 0, 0, R * 2.2); c.fill();
  c.rotate(Math.sin(t * 1.5) * 0.25);
  const lg = c.createLinearGradient(-R, -R, R, R); const sh = (t * 0.4) % 1;
  RAINBOW.forEach((col, i) => lg.addColorStop(((i / 6) + sh) % 1, col));
  starPath(c, 0, 0, R, R * 0.5, 0); c.fillStyle = lg; c.fill();
  c.strokeStyle = '#fff'; c.lineWidth = 2; c.lineJoin = 'round'; c.stroke();
  c.strokeStyle = INK; c.lineWidth = 0.9; c.stroke();
  for (let i = 0; i < 3; i++) { const a = t * 2 + i * TAU / 3; sparkle(c, Math.cos(a) * 16, Math.sin(a) * 16, 2.2, '#fff'); }
  c.restore();
}
function sparkle(c, x, y, r, col) {
  c.fillStyle = col; c.beginPath(); c.moveTo(x, y - r * 2); c.quadraticCurveTo(x, y, x + r * 2, y); c.quadraticCurveTo(x, y, x, y + r * 2); c.quadraticCurveTo(x, y, x - r * 2, y); c.quadraticCurveTo(x, y, x, y - r * 2); c.fill();
}
function drawPowerIcon(c, kind, t) {
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1;
  if (kind === 'wings') {
    for (const s of [-1, 1]) { c.save(); c.scale(s, 1); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(0.5, 1); c.quadraticCurveTo(2, -6, 8, -6); c.quadraticCurveTo(6.5, -3, 8, -1.5); c.quadraticCurveTo(5, 0, 6, 2.5); c.quadraticCurveTo(3, 3, 0.5, 1); c.fill(); c.stroke(); c.restore(); }
  } else if (kind === 'shield') {
    for (let i = 0; i < 5; i++) { c.strokeStyle = RAINBOW[i]; c.lineWidth = 1.4; c.beginPath(); c.arc(0, 1.5, 7.5 - i * 1.3, Math.PI, TAU); c.stroke(); }
    c.fillStyle = '#fff'; ell(c, -6, 2, 2.6, 1.6); c.fill(); ell(c, 6, 2, 2.6, 1.6); c.fill();
  } else if (kind === 'candy') {
    c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(-5, 0); c.lineTo(-9, -4); c.lineTo(-9, 4); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(5, 0); c.lineTo(9, -4); c.lineTo(9, 4); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#fff'; ell(c, 0, 0, 5.5, 4.5); c.fill(); c.stroke();
    c.save(); ell(c, 0, 0, 5.5, 4.5); c.clip(); c.strokeStyle = '#ff4fa3'; c.lineWidth = 1.6;
    for (let i = -8; i < 8; i += 3.5) { c.beginPath(); c.moveTo(i, -5); c.lineTo(i + 5, 5); c.stroke(); } c.restore();
  } else if (kind === 'magnet') {
    c.lineWidth = 4.2; c.strokeStyle = INK; c.beginPath(); c.arc(0, 0, 5, Math.PI, TAU); c.moveTo(-5, 0); c.lineTo(-5, 5); c.moveTo(5, 0); c.lineTo(5, 5); c.stroke();
    c.lineWidth = 2.6; c.strokeStyle = '#ff4f6d'; c.beginPath(); c.arc(0, 0, 5, Math.PI, TAU); c.moveTo(-5, 0); c.lineTo(-5, 3); c.moveTo(5, 0); c.lineTo(5, 3); c.stroke();
    c.strokeStyle = '#f2f2f2'; c.beginPath(); c.moveTo(-5, 3.2); c.lineTo(-5, 5); c.moveTo(5, 3.2); c.lineTo(5, 5); c.stroke();
  } else if (kind === 'frost') {
    c.strokeStyle = '#4cb6ff'; c.lineWidth = 2;
    for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3; c.beginPath(); c.moveTo(Math.cos(a) * -7, Math.sin(a) * -7); c.lineTo(Math.cos(a) * 7, Math.sin(a) * 7); c.stroke(); }
    c.lineWidth = 1.4; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3, x = Math.cos(a) * 4.6, y = Math.sin(a) * 4.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a + 0.8) * 2.4, y + Math.sin(a + 0.8) * 2.4); c.moveTo(x, y); c.lineTo(x + Math.cos(a - 0.8) * 2.4, y + Math.sin(a - 0.8) * 2.4); c.stroke(); }
    c.fillStyle = '#fff'; circ(c, 0, 0, 1.6); c.fill();
  } else if (kind === 'mini') {
    c.fillStyle = '#fff3e0'; rr(c, -2.6, -1, 5.2, 7, 2); c.fill(); c.stroke();
    c.fillStyle = '#ff5c7a'; c.beginPath(); c.arc(0, 0, 7, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#fff'; circ(c, -3.4, -2.6, 1.3); c.fill(); circ(c, 2, -4.4, 1.1); c.fill(); circ(c, 4.2, -1.4, 0.9); c.fill();
  } else if (kind === 'big') {
    c.fillStyle = '#fff3e0'; rr(c, -3.4, -0.5, 6.8, 8, 2.4); c.fill(); c.stroke();
    c.fillStyle = '#ff9a3d'; c.beginPath(); c.arc(0, 0.5, 8.6, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ffe14d'; starPath(c, -3.8, -3, 2.4, 1.1, 0); c.fill(); starPath(c, 3.4, -4.6, 2, 0.9, 0); c.fill();
    c.strokeStyle = '#fff'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, 6); c.lineTo(0, 2.6); c.moveTo(-1.4, 4); c.lineTo(0, 2.6); c.lineTo(1.4, 4); c.stroke();
  }
}
function drawPower(c, x, y, kind, t) {
  c.save(); c.translate(x, y + Math.sin(t * 3) * 2);
  const g = c.createRadialGradient(-3, -4, 1, 0, 0, 12); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(0.6, 'rgba(220,235,255,.55)'); g.addColorStop(1, 'rgba(255,190,240,.6)');
  c.fillStyle = g; circ(c, 0, 0, 11); c.fill();
  c.strokeStyle = '#fff'; c.lineWidth = 1.6; c.stroke();
  c.strokeStyle = 'rgba(59,31,79,.45)'; c.lineWidth = 0.8; circ(c, 0, 0, 11.8); c.stroke();
  drawPowerIcon(c, kind, t);
  c.fillStyle = 'rgba(255,255,255,.9)'; ell(c, -5, -6, 2.6, 1.4, -0.6); c.fill();
  c.restore();
}
function drawGate(c, x, gy, t, open, need) {
  c.save(); c.translate(x, gy);
  if (open) {
    const g = c.createRadialGradient(0, -24, 2, 0, -24, 30); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(0.5, 'rgba(255,190,240,.55)'); g.addColorStop(1, 'rgba(180,150,255,.15)');
    c.fillStyle = g; c.beginPath(); c.moveTo(-17, 0); c.lineTo(-17, -24); c.arc(0, -24, 17, Math.PI, TAU); c.lineTo(17, 0); c.closePath(); c.fill();
    for (let i = 0; i < 7; i++) { const a = t * 2.5 + i * TAU / 7, r = 6 + (i % 3) * 4; sparkle(c, Math.cos(a) * r, -22 + Math.sin(a) * r, 1.6, i % 2 ? '#fff' : '#ffe14d'); }
  } else {
    c.fillStyle = 'rgba(120,100,170,.35)'; c.beginPath(); c.moveTo(-17, 0); c.lineTo(-17, -24); c.arc(0, -24, 17, Math.PI, TAU); c.lineTo(17, 0); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.2;
    for (let i = -12; i <= 12; i += 6) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i, -24 - Math.sqrt(Math.max(0, 289 - i * i)) * 0.9); c.stroke(); }
    c.fillStyle = '#ffd54a'; c.strokeStyle = INK; c.lineWidth = 1.1; rr(c, -6, -22, 12, 9, 2); c.fill(); c.stroke();
    c.beginPath(); c.arc(0, -22, 4, Math.PI, TAU); c.lineWidth = 1.8; c.strokeStyle = INK; c.stroke();
  }
  for (let i = 0; i < 6; i++) {
    const r = 27 - i * 2.2; c.strokeStyle = RAINBOW[i]; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(-r, 0); c.lineTo(-r, -24); c.arc(0, -24, r, Math.PI, TAU); c.lineTo(r, 0); c.stroke();
  }
  c.strokeStyle = 'rgba(59,31,79,.5)'; c.lineWidth = 0.8;
  c.beginPath(); c.moveTo(-28.4, 0); c.lineTo(-28.4, -24); c.arc(0, -24, 28.4, Math.PI, TAU); c.lineTo(28.4, 0); c.stroke();
  for (const sx of [-23, 23]) { c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 1; for (const p of [[-6, -2, 5], [0, -5, 6], [6, -2, 5]]) { circ(c, sx + p[0], p[1], p[2]); c.fill(); } }
  if (open) for (let i = 0; i < 3; i++) sparkle(c, Math.sin(t * 3 + i * 2) * 22, -56 - i * 4, 1.8 + Math.sin(t * 5 + i) * 0.6, '#fff');
  c.restore();
}
function drawCheck(c, x, gy, active, t) {
  c.save(); c.translate(x, gy);
  c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = '#e8d9ff';
  rr(c, -1.6, -40, 3.2, 40, 1.5); c.fill(); c.stroke();
  const wave = Math.sin(t * 5) * 2;
  c.beginPath(); c.moveTo(1.6, -39); c.quadraticCurveTo(10, -40 + wave, 18, -36); c.quadraticCurveTo(10, -32 - wave, 1.6, -27); c.closePath();
  if (active) { const g = c.createLinearGradient(0, -40, 0, -27); RAINBOW.forEach((col, i) => g.addColorStop(i / 5, col)); c.fillStyle = g; } else c.fillStyle = '#b7aecb';
  c.fill(); c.stroke();
  c.fillStyle = active ? '#fff' : '#d9d2e6'; starPath(c, 8.5, -33.5, 3.2, 1.4, 0); c.fill();
  c.fillStyle = '#ffd54a'; circ(c, 0, -41.5, 2.6); c.fill(); c.stroke();
  c.restore();
}
function wrapText(c, text, maxW) {
  const words = text.split(' '), lines = []; let cur = '';
  for (const w of words) { const test = cur ? cur + ' ' + w : w; if (c.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test; }
  if (cur) lines.push(cur); return lines;
}
function drawSign(c, x, gy, text) {
  c.save(); c.translate(x, gy);
  c.font = '800 9px Nunito, system-ui, sans-serif';
  const lines = wrapText(c, text, 104); const lh = 11;
  const w = Math.max(...lines.map(l => c.measureText(l).width)) + 14, h = lines.length * lh + 9;
  const top = -34 - h;
  c.fillStyle = '#b07a52'; c.strokeStyle = INK; c.lineWidth = 1.1;
  rr(c, -2, top + h - 2, 4, 36 - (h - 2) + h - 2 + 2, 1.5); c.fill(); c.stroke();
  c.fillStyle = '#fff7e6'; rr(c, -w / 2, top, w, h, 5); c.fill(); c.lineWidth = 1.4; c.stroke();
  c.strokeStyle = '#f1c7a5'; c.lineWidth = 0.8; rr(c, -w / 2 + 2.5, top + 2.5, w - 5, h - 5, 3.5); c.stroke();
  c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle';
  lines.forEach((l, i) => c.fillText(l, 0, top + 5 + lh / 2 + i * lh));
  c.restore();
}
function drawButterfly(c, x, y, t, col) {
  c.save(); c.translate(x, y); const f = Math.abs(Math.sin(t * 14));
  c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 0.7;
  for (const s of [-1, 1]) { c.save(); c.scale(s * (0.25 + f * 0.75), 1); ell(c, 3.5, -2.5, 3.6, 3); c.fill(); c.stroke(); ell(c, 3, 2.2, 2.6, 2.2); c.fill(); c.stroke(); c.restore(); }
  c.fillStyle = INK; rr(c, -0.7, -4, 1.4, 8, 0.7); c.fill();
  c.restore();
}
function drawFlowerDecor(c, x, gy, col, sc) {
  c.save(); c.translate(x, gy); c.scale(sc, sc);
  c.strokeStyle = '#3aa65a'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-1.5, -6, 0, -11); c.stroke();
  c.fillStyle = '#5fcf6a'; ell(c, -3, -5, 2.6, 1.2, 0.5); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.6;
  for (let i = 0; i < 5; i++) { const a = i * TAU / 5 - Math.PI / 2; c.fillStyle = col; circ(c, Math.cos(a) * 3, -12 + Math.sin(a) * 3, 2.4); c.fill(); c.stroke(); }
  c.fillStyle = '#ffe14d'; circ(c, 0, -12, 1.9); c.fill(); c.stroke();
  c.restore();
}
