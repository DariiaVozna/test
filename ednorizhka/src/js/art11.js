'use strict';
/* ===== Частина 11: Країна фарб, Піщаний храм, Дельфінова бухта, Каменоломня, Майстерня Хамелеона ===== */
Object.assign(THEMES, {
  paint: { sky: ['#ffd6f0', '#fff0d6', '#e0f4ff'], panel: '#3a2a5a', top: '#7fd46a', topHi: '#b0ef9a', topLo: '#4f9a48', fill: '#fff3e0', fillLo: '#f2d6b8', dots: ['#ff4f5e', '#3f8fff', '#ffd23f', '#54d68c'], block: 'paintblock', ice: false, topStyle: 'grass', dotShape: 'sprinkle' },
  temple: { sky: ['#ffd98a', '#ffe9b8', '#fff6dc'], panel: '#6a4a1e', top: '#f2d08a', topHi: '#fff0c4', topLo: '#d9a85a', fill: '#e6b86a', fillLo: '#cf9c4e', dots: [], block: 'sandbrick', ice: false, topStyle: 'stone', fillStyle: 'bricks' },
  bay: { sky: ['#7fd8f0', '#c4f0ff', '#fff2d6'], panel: '#135a78', top: '#fff0c4', topHi: '#ffffff', topLo: '#e9c886', fill: '#f3cf8e', fillLo: '#e2b56d', dots: ['#fff4d6', '#f5a3b5', '#ffffff', '#9fe0ff'], block: 'shellblock', ice: false, topStyle: 'sand', dotShape: 'dot' },
  quarry: { sky: ['#b8dcff', '#e0f0ff', '#fff4e0'], panel: '#3a3a4a', top: '#d6c4a8', topHi: '#efe2cc', topLo: '#a8927a', fill: '#b8a088', fillLo: '#9c8670', dots: ['#d6c8b8', '#8a7a68', '#efe6dc'], block: 'quarrystone', ice: false, topStyle: 'sand', dotShape: 'pebble' },
  studio: { sky: ['#fff0f6', '#f0e6ff', '#e0f4ff'], panel: '#3a2a5a', top: '#d9a878', topHi: '#f2c99a', topLo: '#a8743f', fill: '#ecdcc6', fillLo: '#d6c0a4', dots: [], block: 'easel', ice: false, topStyle: 'plank', fillStyle: 'planks' },
});
Object.assign(PLANKS, { temple: ['#e3b26b', '#a8743f'], bay: ['#d9a36c', '#a8743f'], quarry: ['#c98d55', '#8a5a30'], studio: ['#c98d55', '#8a5a30'] });

/* ===== Вороги ===== */
function drawBlob(c, x, gy, dir, t, air, flash, col) {
  const pc = PAINT[col] || PAINT.red;
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round';
  const sq = air ? 1.15 : 0.9 + Math.abs(Math.sin(t * 4)) * 0.1; c.scale(1 / sq, sq);
  c.fillStyle = flash ? '#fff' : pc.col; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(-10, 0); c.quadraticCurveTo(-11, -10, -3, -15); c.quadraticCurveTo(0, -20, 3, -15); c.quadraticCurveTo(11, -10, 10, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.55)'; ell(c, -4, -10, 2.4, 1.4, -0.5); c.fill();
  c.fillStyle = '#fff'; circ(c, 1, -7, 3); c.fill(); circ(c, 6, -7, 2.4); c.fill();
  c.fillStyle = INK; circ(c, 2, -6.6, 1.5); c.fill(); circ(c, 6.6, -6.6, 1.2); c.fill();
  c.beginPath(); c.arc(4, -3, 2, 0.15 * Math.PI, 0.85 * Math.PI); c.lineWidth = 1; c.stroke();
  c.restore();
  if (!air) { c.fillStyle = pc.col; c.globalAlpha = 0.45; ell(c, x, gy - 0.5, 11, 2); c.fill(); c.globalAlpha = 1; }
}
function drawSnake(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  const body = flash ? '#fff' : '#7fd46a';
  c.strokeStyle = INK; c.lineWidth = 8.4; c.beginPath();
  for (let i = 0; i <= 10; i++) { const px = -14 + i * 2.4, py = -4 - Math.sin(t * 8 - i * 0.7) * 2.6 * (i / 10); if (i) c.lineTo(px, py); else c.moveTo(px, py); }
  c.stroke(); c.strokeStyle = body; c.lineWidth = 6.4; c.stroke();
  c.strokeStyle = '#ffd23f'; c.lineWidth = 1.6; c.setLineDash([2, 3]); c.stroke(); c.setLineDash([]);
  c.fillStyle = body; c.strokeStyle = INK; c.lineWidth = 1.1; ell(c, 11, -7, 6, 5); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 12.4, -8.6, 2.2); c.fill(); c.fillStyle = INK; circ(c, 13, -8.4, 1.1); c.fill();
  c.strokeStyle = '#ff5c7a'; c.lineWidth = 1; c.beginPath(); c.moveTo(16.4, -6); c.lineTo(19.4 + Math.sin(t * 20) * 0.8, -5.6); c.moveTo(19.4, -5.6); c.lineTo(20.6, -7); c.moveTo(19.4, -5.6); c.lineTo(20.6, -4.4); c.stroke();
  c.fillStyle = 'rgba(255,120,150,.5)'; circ(c, 11, -5, 1.4); c.fill();
  c.restore();
}
function drawCar(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = flash ? '#fff' : '#ffd23f'; rr(c, -13, -14, 26, 10, 3); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#ff9a3d'; c.beginPath(); c.moveTo(-12, -14); c.lineTo(-10, -20); c.lineTo(2, -20); c.lineTo(4, -14); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#bfe9ff'; rr(c, -8, -19, 4.4, 4, 1); c.fill(); rr(c, -2.6, -19, 4.4, 4, 1); c.fill();
  c.fillStyle = '#fff'; circ(c, 9, -10, 2.4); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, 9.6, -10, 1.2); c.fill();
  c.beginPath(); c.arc(9, -6.4, 2, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();
  for (const wx of [-7, 7]) { c.save(); c.translate(wx, -3.4); c.rotate(t * 14); c.fillStyle = '#3b1f4f'; circ(c, 0, 0, 3.6); c.fill(); c.fillStyle = '#c9d2e6'; circ(c, 0, 0, 1.6); c.fill(); c.fillRect(-0.4, -3, 0.8, 6); c.restore(); }
  c.restore();
  for (let i = 0; i < 2; i++) { c.fillStyle = 'rgba(200,190,170,.6)'; circ(c, x - dir * (16 + i * 6), gy - 4 - i * 2 + Math.sin(t * 10 + i) * 1.5, 2.6 - i * 0.8); c.fill(); }
}
function drawUrchin(c, x, gy, t) {
  c.save(); c.translate(x, gy - 9); c.rotate(Math.sin(t * 2) * 0.08); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1;
  for (let i = 0; i < 14; i++) { const a = i * TAU / 14; c.fillStyle = '#a67bff'; c.beginPath(); c.moveTo(Math.cos(a - 0.2) * 7, Math.sin(a - 0.2) * 7); c.lineTo(Math.cos(a) * 13, Math.sin(a) * 13); c.lineTo(Math.cos(a + 0.2) * 7, Math.sin(a + 0.2) * 7); c.closePath(); c.fill(); c.stroke(); }
  c.fillStyle = '#c9a8ff'; circ(c, 0, 0, 8); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, -2.6, -1, 2); c.fill(); circ(c, 2.6, -1, 2); c.fill();
  c.fillStyle = INK; circ(c, -2.4, -0.8, 1); c.fill(); circ(c, 2.8, -0.8, 1); c.fill();
  c.beginPath(); c.moveTo(-3, 3.6); c.lineTo(3, 3.6); c.stroke();
  c.restore();
}
function drawPuffer(c, x, y, t, dir, flash) {
  const puff = Math.max(0, Math.sin(t * 1.6)), r = 8 + puff * 4;
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = flash ? '#fff' : '#ffb347'; c.beginPath(); c.moveTo(-r + 1, 0); c.lineTo(-r - 6, -4); c.lineTo(-r - 6, 4); c.closePath(); c.fill(); c.stroke();
  if (puff > 0.3) for (let i = 0; i < 10; i++) { const a = i * TAU / 10; c.beginPath(); c.moveTo(Math.cos(a) * r, Math.sin(a) * r); c.lineTo(Math.cos(a) * (r + 3 * puff), Math.sin(a) * (r + 3 * puff)); c.stroke(); }
  c.fillStyle = flash ? '#fff' : '#ffd23f'; circ(c, 0, 0, r); c.fill(); c.stroke();
  c.fillStyle = '#fff3c9'; ell(c, 1, r * 0.4, r * 0.7, r * 0.4); c.fill();
  c.fillStyle = '#fff'; circ(c, r * 0.4, -r * 0.3, 2.6); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, r * 0.45, -r * 0.28, 1.3); c.fill();
  c.fillStyle = '#ff7a95'; circ(c, r - 1, 1.4, 1.6); c.fill();
  c.restore();
}
function drawEnemy7(c, e, cx, fl) {
  switch (e.k) {
    case 'blob': drawBlob(c, cx, e.y + e.h, e.dir, e.t, e.air, fl, e.col); return true;
    case 'snake': drawSnake(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
    case 'car': drawCar(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
    case 'urchin': drawUrchin(c, cx, e.y + e.h, e.t); return true;
    case 'puffer': drawPuffer(c, cx, e.y + e.h / 2, e.t, e.dir, fl); return true;
  }
  return false;
}

/* ===== Плитки: фарбові стіни, кам'яні кубики, тріснуті скелі, двері храму ===== */
const TILE7 = { paint0: 1, paint1: 1, paint2: 1, paint0o: 1, paint1o: 1, paint2o: 1, stone: 1, crack: 1, tdoor: 1, tdoorO: 1 };
function tileKind7(v) {
  if (v >= 14 && v <= 16) return 'paint' + (v - 14) + (G.paint === PAINTS[v - 14] ? 'o' : '');
  if (v === 17) return 'stone';
  if (v === 18) return 'crack';
  return G.doorOpen[v - 19] ? 'tdoorO' : 'tdoor';
}
function drawTile7(c, kind) {
  c.lineJoin = 'round'; c.lineCap = 'round';
  if (kind.slice(0, 5) === 'paint') {
    const pc = PAINT[PAINTS[+kind[5]]], open = kind.length > 6;
    if (open) {
      c.fillStyle = pc.col; c.globalAlpha = 0.16; rr(c, 1.5, 0, T - 3, T, 3); c.fill(); c.globalAlpha = 1;
      c.strokeStyle = pc.col; c.lineWidth = 1.6; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(1.5, 0); c.lineTo(1.5, T); c.moveTo(T - 1.5, 0); c.lineTo(T - 1.5, T); c.stroke(); c.setLineDash([]);
    } else {
      c.fillStyle = pc.col; c.fillRect(0, 0, T, T);
      c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(3, 0, 4, T); c.fillRect(12, 0, 2, T);
      c.fillStyle = pc.lo; c.globalAlpha = 0.5; c.beginPath(); c.arc(T / 2, T + 2, 6, Math.PI, TAU); c.fill(); c.globalAlpha = 1;
      c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(0.7, 0); c.lineTo(0.7, T); c.moveTo(T - 0.7, 0); c.lineTo(T - 0.7, T); c.stroke();
    }
  } else if (kind === 'stone') {
    c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#d9b47a'; c.fill(); c.stroke();
    c.fillStyle = '#c49a5a'; rr(c, 3.5, 3.5, T - 7, T - 7, 3); c.fill();
    c.fillStyle = '#fff3d6'; c.beginPath(); c.moveTo(7, 9.4); c.lineTo(13, 9.4); c.lineTo(13, 6.4); c.lineTo(18, 12); c.lineTo(13, 17.6); c.lineTo(13, 14.6); c.lineTo(7, 14.6); c.closePath(); c.fill(); c.lineWidth = 1; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.45)'; c.fillRect(4, 3, T - 8, 1.6);
  } else if (kind === 'crack') {
    c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, 0.5, 0.5, T - 1, T - 1, 3); c.fillStyle = '#b8a088'; c.fill(); c.stroke();
    c.strokeStyle = '#5a4a3a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(6, 0); c.lineTo(10, 8); c.lineTo(7, 13); c.lineTo(12, 20); c.lineTo(10, T); c.moveTo(10, 8); c.lineTo(17, 10); c.moveTo(12, 20); c.lineTo(19, 18); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.3)'; ell(c, 17, 5, 3, 1.4, -0.3); c.fill();
  } else if (kind === 'tdoor' || kind === 'tdoorO') {
    if (kind === 'tdoorO') { c.strokeStyle = 'rgba(201,141,85,.6)'; c.lineWidth = 1.4; c.setLineDash([3, 3]); c.strokeRect(2, 0, T - 4, T); c.setLineDash([]); return; }
    c.fillStyle = '#c98d55'; c.fillRect(1, 0, T - 2, T);
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1.2; c.beginPath(); for (const y of [6, 12, 18]) { c.moveTo(1, y); c.lineTo(T - 1, y); } c.stroke();
    c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 0.9; circ(c, T / 2, T / 2, 3.4); c.fill(); c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(1.2, 0); c.lineTo(1.2, T); c.moveTo(T - 1.2, 0); c.lineTo(T - 1.2, T); c.stroke();
  }
}

/* ===== Предмети ===== */
function drawBucket(c, b, t) {
  const pc = PAINT[b.color], cur = G.paint === b.color;
  c.save(); c.translate(b.x, b.gy); c.lineJoin = 'round';
  if (b.splash > 0) for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.45, r = 14 + (0.5 - b.splash) * 40; c.fillStyle = pc.col; circ(c, Math.cos(a) * r, -18 + Math.sin(a) * r, 2.4); c.fill(); }
  c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#e6ebf5'; c.beginPath(); c.moveTo(-9, -18); c.lineTo(9, -18); c.lineTo(7, 0); c.lineTo(-7, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = pc.col; ell(c, 0, -18, 9, 3); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-7, -17); c.quadraticCurveTo(-8, -11, -5.4, -9); c.quadraticCurveTo(-3, -11, -3.6, -16.4); c.closePath(); c.fill();
  c.strokeStyle = '#8f9cc8'; c.lineWidth = 1.2; c.beginPath(); c.arc(0, -18, 10, Math.PI * 1.05, Math.PI * 1.95); c.stroke();
  c.fillStyle = pc.col; c.font = '900 9px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  heartPath(c, 0, -7, 6); c.fill();
  if (!cur) sparkle(c, 10, -24 + Math.sin(t * 4 + b.x) * 2, 1.8, '#fff8c0');
  c.restore();
}
function drawPlate(c, p, t) {
  c.save(); c.translate(p.x, p.gy); c.lineJoin = 'round';
  const dn = p.on ? 2 : 0;
  c.fillStyle = '#8a5a30'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, -12, -3, 24, 4, 2); c.fill(); c.stroke();
  c.fillStyle = p.on ? '#7fd46a' : '#ff7a95'; rr(c, -9, -7 + dn, 18, 5, 2); c.fill(); c.stroke();
  c.restore();
}
function drawBoost(c, b, t) {
  c.save(); c.translate(b.x, b.gy); c.scale(b.dir, 1); c.lineJoin = 'round';
  c.fillStyle = '#3b1f4f'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, -22, -5, 44, 6, 3); c.fill(); c.stroke();
  for (let i = 0; i < 3; i++) {
    const k = ((t * 3 - i / 3) % 1 + 1) % 1, on = b.glow > 0 || k > 0.5;
    c.fillStyle = on ? '#7dffe0' : 'rgba(125,255,224,.35)';
    c.beginPath(); c.moveTo(-14 + i * 10, -4.4); c.lineTo(-8 + i * 10, -2); c.lineTo(-14 + i * 10, 0.4); c.lineTo(-11 + i * 10, -2); c.closePath(); c.fill();
  }
  c.restore();
}
function drawSpout(c, z, t) {
  const ph = (G.t + z.ph) % z.cyc, on = ph < z.on, warn = !on && z.cyc - ph < 0.7, cx = (z.x0 + z.x1) / 2, w = z.x1 - z.x0;
  c.save();
  if (on) {
    const k = Math.min(1, ph / 0.2), top = z.y1 - (z.y1 - z.y + 10) * k;
    const g = c.createLinearGradient(0, top, 0, z.y1); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(140,220,255,.85)');
    c.fillStyle = g; c.beginPath(); c.moveTo(cx - w * 0.2, z.y1);
    for (let y = z.y1; y > top; y -= 8) c.lineTo(cx - w * 0.2 - Math.sin(y * 0.2 + t * 14) * 2.5, y);
    c.lineTo(cx, top - 6); for (let y = top; y < z.y1; y += 8) c.lineTo(cx + w * 0.2 + Math.sin(y * 0.2 + t * 14 + 1) * 2.5, y);
    c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,.9)'; for (let i = 0; i < 6; i++) { const a = t * 6 + i; circ(c, cx + Math.sin(a * 1.7) * w * 0.5, top + Math.abs(Math.sin(a)) * 12, 3 + (i % 3)); c.fill(); }
  } else if (warn) for (let i = 0; i < 4; i++) { const k = (t * 3 + i / 4) % 1; c.fillStyle = `rgba(255,255,255,${0.8 * (1 - k)})`; circ(c, cx + (i - 1.5) * 4, z.y1 - 6 - k * 16, 2 + k * 2); c.fill(); }
  c.restore();
}
function drawDolphin(c, m, t) {
  const d = m.dir || 1, tilt = m.air ? clamp(m.vy / 900, -0.5, 0.5) * d : 0;
  c.save(); c.translate(m.x + m.w / 2, m.y + 8); c.rotate(tilt); c.scale(d, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#5fb8ff';
  c.beginPath(); c.moveTo(-30, -2); c.lineTo(-40, -10 + Math.sin(t * 6) * 2); c.lineTo(-38, 0); c.lineTo(-40, 8 + Math.sin(t * 6) * 2); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-32, 0); c.quadraticCurveTo(-20, -10, 6, -8); c.quadraticCurveTo(24, -7, 30, 0); c.lineTo(38, 2); c.quadraticCurveTo(30, 8, 20, 8); c.quadraticCurveTo(-10, 12, -32, 4); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#dff3ff'; c.beginPath(); c.moveTo(-20, 6); c.quadraticCurveTo(5, 10, 28, 6); c.quadraticCurveTo(10, 4, -20, 6); c.fill();
  c.fillStyle = '#5fb8ff'; c.beginPath(); c.moveTo(-4, -8); c.lineTo(-10, -18); c.lineTo(4, -8); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 22, -2, 2.4); c.fill(); c.fillStyle = INK; circ(c, 22.6, -1.8, 1.2); c.fill();
  c.beginPath(); c.arc(30, 3, 3, 0.1 * Math.PI, 0.8 * Math.PI); c.lineWidth = 1; c.stroke();
  c.fillStyle = 'rgba(255,120,170,.5)'; circ(c, 24, 2.6, 1.6); c.fill();
  c.restore();
  if (!m.air) { c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1.4; for (let i = 0; i < 2; i++) { const k = (t * 1.5 + i * 0.5) % 1; c.globalAlpha = 1 - k; c.beginPath(); c.moveTo(m.x + m.w / 2 - d * (34 + k * 16), m.by + 14); c.lineTo(m.x + m.w / 2 - d * (28 + k * 16), m.by + 14); c.stroke(); } c.globalAlpha = 1; }
}
function drawWhale(c, m, t) {
  c.save(); c.translate(m.x, m.y); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.6; c.fillStyle = '#7a8ae6';
  c.beginPath(); c.moveTo(0, 6); c.quadraticCurveTo(0, -4, 20, -4); c.lineTo(m.w - 14, -4); c.quadraticCurveTo(m.w + 4, -2, m.w + 2, 14); c.lineTo(m.w + 2, 22); c.lineTo(0, 22); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(4, 8); c.lineTo(-14, -6); c.lineTo(-10, 8); c.lineTo(-16, 18); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#c9d2ff'; c.fillRect(6, 14, m.w - 6, 8);
  c.fillStyle = '#fff'; circ(c, m.w - 16, 4, 3); c.fill(); c.fillStyle = INK; circ(c, m.w - 15.4, 4.4, 1.5); c.fill();
  c.beginPath(); c.arc(m.w - 8, 10, 4, 0.1 * Math.PI, 0.8 * Math.PI); c.lineWidth = 1.2; c.stroke();
  c.fillStyle = 'rgba(255,120,170,.5)'; circ(c, m.w - 10, 9, 2.4); c.fill();
  c.fillStyle = '#3b1f4f'; ell(c, m.w / 2 - 2, -3.6, 4, 1.6); c.fill();
  c.restore();
}
function drawWorld7(c, t, vis) {
  for (const z of G.winds) if (z.whale && vis(z.x0, 80)) drawSpout(c, z, t);
  for (const p of G.plates) if (vis(p.x)) drawPlate(c, p, t);
  for (const b of G.boosts) if (vis(b.x)) drawBoost(c, b, t);
  for (const b of G.buckets) if (vis(b.x)) drawBucket(c, b, t);
}
/* Аура фарби навколо єдиноріжки */
function drawPaintAura(c, P, t) {
  if (!G.paint) return;
  const pc = PAINT[G.paint];
  for (let i = 0; i < 3; i++) { const k = (t * 1.2 + i / 3) % 1; c.fillStyle = pc.col; c.globalAlpha = 0.8 * (1 - k); circ(c, P.x + 4 + i * 7, P.y + P.h + 2 + k * 8, 1.8); c.fill(); }
  c.globalAlpha = 1;
}

/* ===== Хамелеон Барвик ===== */
const CHAM_COLS = ['#7fd46a', '#ff7ab8', '#4cb6ff', '#ffd23f', '#a67bff'];
function drawChameleon(c, B, t) {
  const st = B.state, flash = B.flash > 0, happy = st === 'happy' || B.dead, stuck = st === 'stuck';
  const col = happy ? CHAM_COLS[Math.floor(t * 3) % CHAM_COLS.length] : stuck ? '#ff9a3d' : '#7fd46a';
  const d = B.dir || 1, gy = B.gy;
  // язик
  if (B.tongue > 2) {
    const x0 = B.x + d * 22, x1 = x0 + d * B.tongue, ty = gy - 11;
    c.save(); c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(x0, ty); c.lineTo(x1, ty); c.stroke();
    c.strokeStyle = '#ff7ab8'; c.lineWidth = 4.6; c.stroke();
    c.fillStyle = '#ff5c8a'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, x1, ty, 6); c.fill(); c.stroke();
    if (stuck) { c.fillStyle = 'rgba(255,255,255,.8)'; ell(c, x1, gy - 2, 9, 2.4); c.fill(); }
    c.restore();
  }
  c.save(); c.globalAlpha = B.alpha; c.translate(B.x, gy); c.scale(d, 1); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 1.5;
  // хвіст-спіраль
  c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(-20, -14); c.quadraticCurveTo(-34, -14, -36, -24); c.arc(-30, -24, 6, Math.PI, Math.PI * 2.6); c.stroke();
  c.strokeStyle = flash ? '#fff' : col; c.lineWidth = 3.6; c.stroke();
  // лапки
  c.fillStyle = flash ? '#fff' : col; c.strokeStyle = INK; c.lineWidth = 1.2;
  const step = (st === 'walk' || st === 'hide') ? Math.sin(t * 10) * 2 : 0;
  for (const [lx, s] of [[-12, 1], [-4, -1], [6, 1], [14, -1]]) { rr(c, lx - 2.4 + step * s * 0.5, -10, 4.8, 10, 2); c.fill(); c.stroke(); }
  // тіло
  c.lineWidth = 1.6; ell(c, 0, -20, 22, 13); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.3)'; for (let i = 0; i < 4; i++) { circ(c, -12 + i * 7, -24 + (i % 2) * 4, 2.4); c.fill(); }
  c.strokeStyle = 'rgba(59,31,79,.35)'; c.lineWidth = 1.2; c.beginPath(); for (let i = -16; i < 14; i += 6) { c.moveTo(i, -32); c.quadraticCurveTo(i + 3, -28, i, -24); } c.stroke();
  // голова
  c.save(); c.translate(20, -26 + (st === 'aim' ? Math.sin(t * 30) : 0));
  c.fillStyle = flash ? '#fff' : col; c.strokeStyle = INK; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(-6, -6); c.quadraticCurveTo(4, -16, 12, -4); c.quadraticCurveTo(16, 4, 8, 10); c.quadraticCurveTo(-4, 12, -8, 4); c.closePath(); c.fill(); c.stroke();
  // шолом-гребінь
  c.beginPath(); c.moveTo(-6, -6); c.quadraticCurveTo(-8, -18, 2, -14); c.stroke();
  // око-башточка
  c.fillStyle = flash ? '#fff' : col; circ(c, 3, -3, 6.4); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, 3, -3, 4); c.fill();
  if (happy) { c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.arc(3, -2, 2.6, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); }
  else if (stuck) { c.strokeStyle = INK; c.lineWidth = 1.1; c.beginPath(); for (let a = 0; a < 10; a++) { const r = 0.4 + a * 0.3; c.lineTo(3 + Math.cos(a * 1.2 + t * 8) * r, -3 + Math.sin(a * 1.2 + t * 8) * r); } c.stroke(); }
  else { const lx = Math.cos(t * 2) * 1.2; c.fillStyle = INK; circ(c, 4 + lx, -3, 2); c.fill(); c.fillStyle = '#fff'; circ(c, 4.6 + lx, -3.8, 0.7); c.fill(); }
  // рот і щоки
  c.strokeStyle = INK; c.lineWidth = 1.2;
  if (st === 'aim') { c.fillStyle = '#ff9fbf'; ell(c, 12, 5, 4.4, 3.4); c.fill(); c.stroke(); }
  else { c.beginPath(); c.arc(8, 5, 4, 0.1 * Math.PI, 0.8 * Math.PI); c.stroke(); }
  c.fillStyle = 'rgba(255,120,170,.5)'; circ(c, 6, 3, 2.4); c.fill();
  c.restore();
  c.restore();
  if (st === 'hide' && B.alpha < 0.5) {
    const ex = B.x + d * 23, ey = gy - 29;
    c.fillStyle = '#fff'; circ(c, ex, ey, 3.4); c.fill(); c.strokeStyle = INK; c.lineWidth = 1; c.stroke();
    c.fillStyle = INK; circ(c, ex + d, ey, 1.6); c.fill();
  }
  if (stuck) { c.save(); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 2.4; c.font = '900 11px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; const k = (t * 0.8) % 1; c.globalAlpha = 1 - k; c.strokeText('ой!', B.x, gy - 52 - k * 14); c.fillText('ой!', B.x, gy - 52 - k * 14); c.restore(); }
  if (happy) for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; heartPath(c, B.x + (i - 1) * 18, gy - 56 - k * 30, 9); c.fillStyle = CHAM_COLS[i]; c.fill(); c.restore(); }
}
function drawPaintball(c, b) {
  const pc = PAINT[b.col] || PAINT.red;
  c.save(); c.translate(b.x, b.y); c.rotate(b.t * 8); c.lineJoin = 'round';
  c.fillStyle = pc.col; c.strokeStyle = INK; c.lineWidth = 1.1;
  c.beginPath(); c.moveTo(0, -7); c.quadraticCurveTo(6, -2, 5, 3); c.quadraticCurveTo(0, 8, -5, 3); c.quadraticCurveTo(-6, -2, 0, -7); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, -1.6, -1.6, 1.6, 1); c.fill();
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock8(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'paintblock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#fffaf2'; c.fill(); c.stroke();
    c.fillStyle = '#ff4f5e'; c.beginPath(); c.moveTo(2, 2); c.lineTo(12, 2); c.quadraticCurveTo(11, 7, 8, 6); c.quadraticCurveTo(5, 11, 2, 8); c.closePath(); c.fill();
    c.fillStyle = '#3f8fff'; circ(c, 16, 15, 4); c.fill(); c.fillStyle = '#ffd23f'; circ(c, 7, 17, 3); c.fill();
  } else if (b === 'sandbrick') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#e6b86a'; c.fill(); c.stroke();
    c.strokeStyle = '#c9944a'; c.lineWidth = 1.1; c.beginPath(); c.moveTo(4, 12); c.lineTo(T - 4, 12); c.moveTo(12, 4); c.lineTo(12, 12); c.stroke();
    c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(12, 15); c.lineTo(15, 19.4); c.lineTo(9, 19.4); c.closePath(); c.fill();
  } else if (b === 'shellblock') {
    rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#ffd6e0'; c.fill(); c.stroke();
    c.strokeStyle = '#f5a3b5'; c.lineWidth = 1.2; c.beginPath(); for (let i = -2; i <= 2; i++) { c.moveTo(T / 2, T - 4); c.lineTo(T / 2 + i * 4, 5); } c.stroke();
  } else if (b === 'quarrystone') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#c9b49a'; c.fill(); c.stroke();
    c.fillStyle = '#a8927a'; ell(c, 8, 8, 3.6, 2.4); c.fill(); ell(c, 16, 15, 3, 2); c.fill();
    c.fillStyle = 'rgba(255,255,255,.35)'; ell(c, 7, 6, 2.4, 1); c.fill();
  } else if (b === 'easel') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#fffaf2'; c.fill(); c.stroke();
    c.fillStyle = '#7fd46a'; c.fillRect(4, 13, T - 8, 6); c.fillStyle = '#9fe0ff'; c.fillRect(4, 4, T - 8, 9);
    c.fillStyle = '#ffd23f'; circ(c, 16, 8, 2.4); c.fill();
  } else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor11(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'paintpot':
      c.fillStyle = d.c; ell(c, x + 6, y - 1, 6, 1.6); c.fill();
      c.fillStyle = '#e6ebf5'; rr(c, x - 5, y - 9, 10, 9, 2); c.fill(); c.stroke(); c.fillStyle = d.c; ell(c, x, y - 9, 5, 1.6); c.fill(); c.stroke();
      c.strokeStyle = '#8a5a30'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x + 1, y - 9); c.lineTo(x + 5, y - 19); c.stroke(); c.fillStyle = d.c; ell(c, x + 5.6, y - 20, 1.6, 2.6, 0.4); c.fill();
      break;
    case 'brushes':
      for (let i = 0; i < 3; i++) { c.strokeStyle = '#c98d55'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x - 3 + i * 3, y); c.lineTo(x - 5 + i * 5, y - 16); c.stroke(); c.fillStyle = ['#ff4f5e', '#3f8fff', '#ffd23f'][i]; ell(c, x - 5 + i * 5, y - 18, 1.6, 2.8); c.fill(); }
      break;
    case 'urn':
      c.fillStyle = '#d98d55'; c.beginPath(); c.moveTo(x - 4, y); c.quadraticCurveTo(x - 9, y - 7, x - 4, y - 13); c.lineTo(x + 4, y - 13); c.quadraticCurveTo(x + 9, y - 7, x + 4, y); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = '#fff3d6'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x - 6, y - 7); c.lineTo(x + 6, y - 7); c.stroke();
      break;
    case 'obelisk':
      c.fillStyle = '#f2d08a'; c.beginPath(); c.moveTo(x - 4, y); c.lineTo(x - 3, y - 18); c.lineTo(x, y - 22); c.lineTo(x + 3, y - 18); c.lineTo(x + 4, y); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#c9944a'; circ(c, x, y - 12, 1.4); c.fill(); c.fillRect(x - 1, y - 8, 2, 4);
      break;
    case 'umbrella':
      c.strokeStyle = '#8a5a30'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 2, y - 22); c.stroke();
      c.strokeStyle = INK; c.lineWidth = 0.8;
      for (let i = 0; i < 4; i++) { c.fillStyle = i % 2 ? '#ffffff' : '#ff7ab8'; c.beginPath(); c.moveTo(x + 2, y - 26); c.arc(x + 2, y - 20, 12, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); c.closePath(); c.fill(); c.stroke(); }
      break;
    case 'rockpile':
      c.fillStyle = '#a8927a'; for (const [dx, dy, r] of [[-5, -3, 4], [3, -3, 4.4], [-1, -8, 3.6]]) { circ(c, x + dx, y + dy, r); c.fill(); c.stroke(); }
      break;
    case 'trafficcone':
      c.fillStyle = '#ff9a3d'; c.beginPath(); c.moveTo(x - 5, y - 1); c.lineTo(x - 1.4, y - 14); c.lineTo(x + 1.4, y - 14); c.lineTo(x + 5, y - 1); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#fff'; c.fillRect(x - 3, y - 8, 6, 2.4); c.fillStyle = '#ff9a3d'; rr(c, x - 7, y - 2, 14, 2.4, 1); c.fill(); c.stroke();
      break;
  }
}

/* ===== Фони ===== */
function bgPaint(c, viewW, camX, t) {
  for (let i = 0; i < 6; i++) { const x = wrapX(i * 170 - camX * 0.1 + t * 6, viewW + 240) - 120; puffCloud(c, x, 34 + (i % 3) * 20, 0.9, 'rgba(255,255,255,.9)'); }
  const cols = ['#ff9fb0', '#9fc8ff', '#ffe08a', '#a8e6b0', '#d6b8ff'];
  for (let k = 0; k < 2; k++) {
    const span = k ? 140 : 210, f = k ? 0.35 : 0.18;
    for (let i = -1; i < viewW / span + 2; i++) {
      const wx = i * span + wrapX(-camX * f, span), ci = ((i + Math.floor(camX * f / span)) % 5 + 5) % 5;
      c.fillStyle = cols[ci]; c.globalAlpha = k ? 0.85 : 0.55;
      c.beginPath(); c.moveTo(wx - 50, VIEW_H); c.quadraticCurveTo(wx - 40, (k ? 196 : 170) - 30, wx, (k ? 196 : 170) - 40); c.quadraticCurveTo(wx + 40, (k ? 196 : 170) - 30, wx + 50, VIEW_H); c.closePath(); c.fill();
      c.globalAlpha = 1;
      if (k) { c.fillStyle = cols[(ci + 2) % 5]; for (let j = 0; j < 3; j++) { c.beginPath(); c.moveTo(wx - 20 + j * 14, 162 + j * 4); c.quadraticCurveTo(wx - 18 + j * 14, 176, wx - 16 + j * 14, 162 + j * 4); c.fill(); } }
    }
  }
}
function bgTemple(c, viewW, camX, t) {
  const sx = viewW * 0.78, sg = c.createRadialGradient(sx, 50, 4, sx, 50, 60);
  sg.addColorStop(0, 'rgba(255,250,215,1)'); sg.addColorStop(0.35, 'rgba(255,230,160,.8)'); sg.addColorStop(1, 'rgba(255,230,160,0)');
  c.fillStyle = sg; circ(c, sx, 50, 60); c.fill();
  const span = 320;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.12, span) + 100;
    c.fillStyle = '#f0cf8a'; c.beginPath(); c.moveTo(wx - 90, 200); c.lineTo(wx, 92); c.lineTo(wx + 90, 200); c.closePath(); c.fill();
    c.fillStyle = 'rgba(201,148,74,.35)'; c.beginPath(); c.moveTo(wx, 92); c.lineTo(wx + 90, 200); c.lineTo(wx + 20, 200); c.closePath(); c.fill();
  }
  hill(c, viewW, 206, 8, 0.016, 0.4, camX * 0.25, '#f5dca0');
  const cs = 180;
  for (let i = -1; i < viewW / cs + 2; i++) { const wx = i * cs + wrapX(-camX * 0.35, cs) + 40; c.fillStyle = '#e6c27a'; c.fillRect(wx - 8, 170, 16, 50); c.fillStyle = '#d9a85a'; c.fillRect(wx - 11, 166, 22, 6); c.fillRect(wx - 11, 216, 22, 4); }
  hill(c, viewW, 222, 5, 0.03, 1.2, camX * 0.4, '#ecc988');
}
function bgBay(c, viewW, camX, t) {
  const sx = viewW * 0.3, sg = c.createRadialGradient(sx, 46, 4, sx, 46, 54);
  sg.addColorStop(0, 'rgba(255,250,215,1)'); sg.addColorStop(0.35, 'rgba(255,240,180,.8)'); sg.addColorStop(1, 'rgba(255,240,180,0)');
  c.fillStyle = sg; circ(c, sx, 46, 54); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 3) * 18, 0.85, 'rgba(255,255,255,.9)'); }
  const sea = c.createLinearGradient(0, 140, 0, VIEW_H); sea.addColorStop(0, '#7fd8f0'); sea.addColorStop(1, '#3aa6d6');
  c.fillStyle = sea; c.fillRect(0, 140, viewW + 1, VIEW_H - 140);
  const span = 300;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.15, span) + 120;
    c.fillStyle = '#fff'; c.beginPath(); c.moveTo(wx - 12, 134); c.lineTo(wx, 100); c.lineTo(wx + 2, 134); c.closePath(); c.fill();
    c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(wx + 4, 132); c.lineTo(wx + 4, 106); c.lineTo(wx + 18, 132); c.closePath(); c.fill();
    c.fillStyle = '#c98d55'; c.beginPath(); c.moveTo(wx - 16, 134); c.lineTo(wx + 22, 134); c.lineTo(wx + 16, 142); c.lineTo(wx - 12, 142); c.closePath(); c.fill();
    const k = (t * 0.4 + i * 0.3) % 1, jx = wx + 120 + k * 60, jy = 160 - Math.sin(k * Math.PI) * 30;
    c.fillStyle = 'rgba(95,184,255,.8)'; c.save(); c.translate(jx, jy); c.rotate(Math.cos(k * Math.PI) * -0.8); ell(c, 0, 0, 9, 3.4); c.fill(); c.restore();
  }
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1.4;
  for (let i = 0; i < 12; i++) { const x = wrapX(i * 71 - camX * 0.25 + Math.sin(t + i) * 6, viewW + 40) - 20, y = 168 + (i % 4) * 14; c.beginPath(); c.moveTo(x - 6, y); c.lineTo(x + 6, y); c.stroke(); }
}
function bgQuarry(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 200 - camX * 0.1 + t * 5, viewW + 240) - 120; puffCloud(c, x, 32 + (i % 3) * 20, 0.85, 'rgba(255,255,255,.9)'); }
  for (const [f, base, col] of [[0.12, 150, '#d6c8b8'], [0.28, 186, '#c4b4a0']]) {
    const span = 150;
    c.fillStyle = col;
    c.beginPath(); c.moveTo(0, VIEW_H);
    for (let i = -1; i < viewW / span + 3; i++) { const wx = i * span + wrapX(-camX * f, span); c.lineTo(wx, base + 30); c.lineTo(wx + 10, base); c.lineTo(wx + span - 30, base); c.lineTo(wx + span - 20, base + 30); }
    c.lineTo(viewW + 1, VIEW_H); c.closePath(); c.fill();
  }
  const cs = 340;
  for (let i = -1; i < viewW / cs + 2; i++) {
    const wx = i * cs + wrapX(-camX * 0.3, cs) + 160;
    c.strokeStyle = '#ffb347'; c.lineWidth = 4; c.beginPath(); c.moveTo(wx, 210); c.lineTo(wx, 90); c.lineTo(wx + 70, 90); c.stroke();
    c.strokeStyle = 'rgba(59,31,79,.5)'; c.lineWidth = 1; c.beginPath(); c.moveTo(wx + 60, 90); c.lineTo(wx + 60, 130 + Math.sin(t) * 6); c.stroke();
    c.fillStyle = '#9c8670'; rr(c, wx + 52, 130 + Math.sin(t) * 6, 16, 12, 3); c.fill();
  }
  hill(c, viewW, 222, 5, 0.03, 1.2, camX * 0.4, '#b8a690');
}
function bgStudio(c, viewW, camX, t) {
  const span = 240;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.18, span);
    c.fillStyle = 'rgba(255,255,255,.7)'; rr(c, wx + 20, 40, 100, 80, 6); c.fill();
    c.fillStyle = ['#ffd6e0', '#d6ecff', '#fff3c4', '#e6dcff'][((i % 4) + 4) % 4]; rr(c, wx + 28, 48, 84, 64, 4); c.fill();
    c.fillStyle = 'rgba(255,255,255,.8)'; circ(c, wx + 60 + Math.sin(t * 0.5 + i) * 10, 76, 14); c.fill();
    c.fillStyle = '#c98d55'; c.fillRect(wx + 150, 120, 4, 100); c.fillRect(wx + 186, 120, 4, 100);
    c.fillStyle = '#fffaf2'; rr(c, wx + 140, 70, 60, 52, 3); c.fill();
    for (let k = 0; k < 3; k++) { c.fillStyle = ['#ff4f5e', '#3f8fff', '#ffd23f'][(k + i + 6) % 3]; ell(c, wx + 156 + k * 14, 96 + Math.sin(k + i) * 6, 6, 9, k); c.fill(); }
  }
  c.fillStyle = 'rgba(214,192,164,.5)'; c.fillRect(0, 214, viewW + 1, VIEW_H);
}
Object.assign(BG2, { paint: bgPaint, temple: bgTemple, bay: bgBay, quarry: bgQuarry, studio: bgStudio });
