'use strict';
/* ===== Частина 29 «Сад і двір»: Чистий парк, Чарівна квасоля, Класики, Сад і двір, Двір Шипуна ===== */
Object.assign(THEMES, {
  recyclepark: { sky: ['#bfe8ff', '#e0f4ff', '#f6fff4'], panel: '#1f4a2a', top: '#7fd46a', topHi: '#b4f08e', topLo: '#4f9f4a', fill: '#b08a60', fillLo: '#9a7650', dots: ['#ffffff', '#ffd23f', '#7fb8ff'], block: 'leafblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  beanstalk: { sky: ['#c8f0ff', '#e4f8ff', '#fbfff0'], panel: '#1f4a2a', top: '#6ccf62', topHi: '#a4ee8e', topLo: '#3e9a48', fill: '#a07a50', fillLo: '#8a6640', dots: ['#ffffff', '#ffd23f', '#ff9fc4'], block: 'cliffblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  hopscotch: { sky: ['#ffe0ec', '#fff0f4', '#fffcf8'], panel: '#3a2a4a', top: '#c8ccd8', topHi: '#e8ecf4', topLo: '#a0a8b8', fill: '#b8bcc8', fillLo: '#a4a8b4', dots: ['#ff7ab8', '#7fb8ff', '#ffd23f'], block: 'chalkblock', ice: false, topStyle: 'stone', dotShape: 'sprinkle' },
  gardenyard: { sky: ['#d4f0c8', '#ecf8e4', '#fffef4'], panel: '#2a4a1f', top: '#8fd07a', topHi: '#bdf09e', topLo: '#5aa04a', fill: '#b08a60', fillLo: '#9a7650', dots: ['#ffffff', '#ff7a5a', '#ffd23f'], block: 'cliffblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  goosemeadow: { sky: ['#ffe8b8', '#fff2d4', '#fffbee'], panel: '#5a3a10', top: '#a0d87a', topHi: '#c8f0a0', topLo: '#6aa850', fill: '#c89a6a', fillLo: '#b08454', dots: ['#ffffff', '#ffd23f', '#ff9a3d'], block: 'hayblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
});

/* ===== Сміття й контейнери ===== */
function drawTrash29(c, k, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  if (k === 'bottle') { c.save(); c.rotate(0.5); c.fillStyle = 'rgba(160,220,255,.9)'; rr(c, -4, -6, 8, 14, 3); c.fill(); c.stroke(); c.fillRect(-2, -10, 4, 4); c.strokeRect(-2, -10, 4, 4); c.fillStyle = '#3f8fff'; c.fillRect(-2.5, -11.5, 5, 2.4); c.fillStyle = '#ffffff'; c.fillRect(-4, -1, 8, 4); c.restore(); }
  else if (k === 'can') { c.fillStyle = '#ff6a6a'; rr(c, -5, -7, 10, 14, 2); c.fill(); c.stroke(); c.fillStyle = '#d8dce4'; ell(c, 0, -7, 5, 1.6); c.fill(); c.stroke(); c.fillStyle = '#ffffff'; c.fillRect(-5, -2, 10, 3); }
  else if (k === 'paper') { c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-7, -6); c.lineTo(5, -8); c.lineTo(7, 5); c.lineTo(-5, 7); c.closePath(); c.fill(); c.stroke(); c.strokeStyle = '#a8b8d8'; c.lineWidth = 0.8; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(-4, -3 + i * 3.5); c.lineTo(4, -4 + i * 3.5); c.stroke(); } }
  else if (k === 'box') { c.fillStyle = '#d9a86a'; c.beginPath(); c.moveTo(-7, -3); c.lineTo(0, -7); c.lineTo(7, -3); c.lineTo(7, 5); c.lineTo(0, 8); c.lineTo(-7, 5); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-7, -3); c.lineTo(0, 1); c.lineTo(7, -3); c.moveTo(0, 1); c.lineTo(0, 8); c.stroke(); }
  else if (k === 'peel') { c.fillStyle = '#ffd23f'; for (const a of [-0.9, 0, 0.9]) { c.save(); c.rotate(a); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(4, -5, 1, -10); c.quadraticCurveTo(-3, -5, 0, 0); c.fill(); c.stroke(); c.restore(); } c.fillStyle = '#8a5a30'; rr(c, -1.5, 0, 3, 5, 1); c.fill(); }
  else if (k === 'core') { c.fillStyle = '#fff4dc'; c.beginPath(); c.moveTo(-3, -6); c.quadraticCurveTo(0, 0, -3, 6); c.lineTo(3, 6); c.quadraticCurveTo(0, 0, 3, -6); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#ff4d4d'; ell(c, 0, -7, 5, 2.4); c.fill(); c.stroke(); ell(c, 0, 7, 5, 2.4); c.fill(); c.stroke(); c.fillStyle = '#5a3a20'; circ(c, -0.8, 0, 0.9); c.fill(); }
  c.restore();
}
function drawBin29(c, b, t) {
  const x = b.x, gy = b.gy, col = BIN_COL[b.c], j = b.joy > 0 ? Math.sin(b.joy * 25) * 2 : 0, sh = b.bad > 0 ? Math.sin(b.bad * 40) * 2 : 0;
  c.save(); c.translate(x + sh, gy - j); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = col; c.beginPath(); c.moveTo(-12, -26); c.lineTo(12, -26); c.lineTo(10, 0); c.lineTo(-10, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(-9, -24, 3, 22);
  c.save(); c.translate(0, -27 - (b.joy > 0 ? 6 : 0)); c.rotate(b.joy > 0 ? -0.4 : 0); c.fillStyle = col; rr(c, -14, -4, 28, 5, 2); c.fill(); c.stroke(); c.fillStyle = INK; rr(c, -4, -7, 8, 3, 1.5); c.fill(); c.restore();
  c.fillStyle = '#ffffff'; circ(c, 0, -13, 8); c.fill();
  drawTrash29(c, b.c === 'yellow' ? 'bottle' : b.c === 'blue' ? 'paper' : 'peel', 0, -13, 0.7);
  c.restore();
}
function drawCleanGate(c, g, t) {
  drawDoorCol(c, g.x, g.top, 'clean', '#9fe08a', t);
  const cx = g.x * T + 12, cy = 4 * T + 8, n = G.sorted || 0;
  c.save(); c.translate(cx, cy); c.strokeStyle = INK; c.lineWidth = 1.3; c.fillStyle = '#ffffff'; rr(c, -16, -14, 32, 30, 6); c.fill(); c.stroke();
  c.strokeStyle = '#2f9a3a'; c.lineWidth = 2.4; for (let i = 0; i < 3; i++) { const a = i * TAU / 3 - Math.PI / 2 + t * 0.5; c.beginPath(); c.arc(0, -3, 7, a, a + 1.5); c.stroke(); }
  c.restore();
  txt24(c, Math.min(n, g.n) + '/' + g.n, cx, cy + 10, 9, n >= g.n ? '#2f9a3a' : '#a8683a');
}

/* ===== Квасоля ===== */
function drawSeed29(c, x, y, t) {
  c.save(); c.translate(x, y); c.globalAlpha = 0.4 + 0.25 * Math.sin(t * 5 + x); c.fillStyle = '#ffe066'; circ(c, 0, 0, 11); c.fill(); c.globalAlpha = 1;
  c.rotate(0.4 + Math.sin(t * 3 + x) * 0.15); c.fillStyle = '#7fd46a'; c.strokeStyle = INK; c.lineWidth = 1.3; ell(c, 0, 0, 7, 4.6); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.7)'; ell(c, -2, -1.5, 2.4, 1.2); c.fill(); c.restore();
}
function drawSoil29(c, s, t) {
  const x = s.x * T + 12, gy = 10 * T;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3; c.fillStyle = '#7a4a28'; c.beginPath(); c.moveTo(x - 14, gy); c.quadraticCurveTo(x, gy - 12, x + 14, gy); c.closePath(); c.fill(); c.stroke();
  if (!s.growing && !s.done) {
    c.fillStyle = '#a8683a'; c.fillRect(x - 18, gy - 30, 3, 30); c.fillStyle = '#fffaf0'; rr(c, x - 30, gy - 44, 26, 18, 4); c.fill(); c.stroke();
    drawSeed29(c, x - 17, gy - 35, t);
  }
  // стебло-ліана й листочки на виросших сходинках
  if (s.grown > 0) {
    c.strokeStyle = '#3e9a48'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, gy - 6);
    for (let i = 0; i < s.grown; i++) { const tx = (s.x + 1 + i) * T + 12, ty = (9 - i) * T + 12; c.quadraticCurveTo(tx - 16, ty + 10 + Math.sin(t * 2 + i) * 2, tx, ty); }
    c.stroke();
    for (let i = 0; i < s.grown; i++) {
      const tx = (s.x + 1 + i) * T, ty = (9 - i) * T;
      c.fillStyle = '#5cc05a'; c.strokeStyle = INK; c.lineWidth = 1.3; rr(c, tx, ty, T, T, 7); c.fill(); c.stroke();
      c.fillStyle = '#8ad87a'; ell(c, tx + 12, ty + 7, 9, 4.5, -0.15); c.fill();
      c.strokeStyle = '#3e9a48'; c.lineWidth = 1; c.beginPath(); c.moveTo(tx + 4, ty + 8); c.quadraticCurveTo(tx + 12, ty + 5, tx + 20, ty + 7); c.stroke();
      c.fillStyle = '#3e9a48'; circ(c, tx + 7, ty + 16, 1.6); c.fill(); circ(c, tx + 16, ty + 18, 1.3); c.fill();
    }
  }
  c.restore();
}

/* ===== Класики ===== */
function drawHops29(c, h, t) {
  const gy = 10 * T;
  h.cols.forEach((cx, i) => {
    const n = h.nums[i], done = n < h.next, now = n === h.next && !h.done, x = cx * T;
    c.save(); c.lineJoin = 'round';
    c.fillStyle = done ? 'rgba(127,212,106,.55)' : now ? 'rgba(255,210,63,' + (0.35 + 0.3 * Math.sin(t * 6)) + ')' : 'rgba(255,255,255,.35)'; c.fillRect(x + 1, gy - 1, T - 2, 9);
    c.strokeStyle = '#ffffff'; c.lineWidth = 2.4; c.strokeRect(x + 1.5, gy - 0.5, T - 3, 9);
    c.restore();
    txt24(c, String(n), x + 12, gy - 12 + (now ? Math.sin(t * 6) * 1.5 : 0), 15, done ? '#2f9a3a' : RAINBOW[(n - 1) % 6], '#ffffff', 3.4);
  });
  if (vis26(h.door * T + 12) && tileAt(h.door, 8) === 2) {
    drawDoorCol(c, h.door, h.top, 'hops', '#ffb0d0', t);
    const sx = h.door * T + 12, sy = 4 * T + 8;
    c.save(); c.strokeStyle = INK; c.lineWidth = 1.3; c.fillStyle = '#ffffff'; rr(c, -16 + sx, sy - 13, 32, 26, 6); c.fill(); c.stroke(); c.restore();
    txt24(c, h.nums.length > 4 ? '1…' + h.nums.length : h.nums.slice().sort((a, b) => a - b).join(''), sx, sy - 2, h.nums.length > 4 ? 10 : 9, '#ff4fa3');
    txt24(c, (h.next - 1) + '/' + h.nums.length, sx, sy + 8, 8, '#a8683a');
  }
}
let vis26 = () => true;

/* ===== Над єдиноріжкою: сміття в руках або зернятка ===== */
function drawOver28(c, P, t) {
  const cx = P.x + P.w / 2, y = (P.flip ? P.y + P.h + 40 : P.y - 40) + Math.sin(t * 4) * 1.5;
  if (P.trash) { c.save(); c.globalAlpha = 0.55; c.fillStyle = '#ffffff'; circ(c, cx, y, 13); c.fill(); c.restore(); drawTrash29(c, P.trash, cx, y, 1); }
  else if (P.seeds) { c.save(); c.globalAlpha = 0.55; c.fillStyle = '#ffffff'; rr(c, cx - 20, y - 10, 40, 20, 8); c.fill(); c.restore(); drawSeed29(c, cx - 7, y, t); txt24(c, '×' + P.seeds, cx + 10, y + 1, 11, '#4a8a3a'); }
}

function drawWorld28(c, t, vis) {
  vis26 = vis;
  if (G.trashes) for (const o of G.trashes) if (!o.taken && vis(o.x)) { const j = o.joy > 0 ? Math.abs(Math.sin(o.joy * 20)) * 4 : 0; drawTrash29(c, o.k, o.x, o.y - j + Math.sin(t * 3 + o.x) * 1.5, 1.1); }
  if (G.bins) for (const b of G.bins) if (vis(b.x)) drawBin29(c, b, t);
  if (G.cleangates) for (const g of G.cleangates) if (vis(g.x * T + 12) && tileAt(g.x, 8) === 2) drawCleanGate(c, g, t);
  if (G.seeds29) for (const s of G.seeds29) if (!s.taken && vis(s.x)) drawSeed29(c, s.x, s.y + Math.sin(t * 3 + s.x) * 2, t);
  if (G.soils) for (const s of G.soils) if (vis((s.x + s.h / 2) * T, (s.h + 2) * T)) drawSoil29(c, s, t);
  if (G.hops) for (const h of G.hops) if (vis((h.cols[0] + h.door) / 2 * T, (h.door - h.cols[0] + 2) * T)) drawHops29(c, h, t);
}

/* ===== Гусак Шипун ===== */
function drawGooseBoss(c, B, t) {
  const rest = B.state === 'rest' && !B.dead, run = B.state === 'dash' && !B.dead, dir = B.dir > 0 ? 1 : -1;
  c.save(); c.translate(B.x, B.gy); c.scale(2.3, 2.3);
  drawGoose(c, 0, 0, dir, t, run ? 'run' : B.state === 'throw' ? 'honk' : 'walk', B.flash > 0);
  if (rest) { c.save(); c.scale(dir, 1); c.fillStyle = '#e6ebf5'; c.strokeStyle = INK; c.lineWidth = 0.6; ell(c, 8, -24, 6.5, 6, 0.3); c.fill(); c.stroke(); c.strokeStyle = '#b8c0d0'; c.beginPath(); c.moveTo(4, -24); c.quadraticCurveTo(8, -21, 12, -25); c.moveTo(5, -27); c.quadraticCurveTo(8, -25, 11, -28); c.stroke(); c.restore(); }
  c.restore();
  if (rest) txt24(c, 'z', B.x + 20, B.gy - 70 - (t * 10) % 10, 12, '#8a5a30', '#ffffff', 2);
  if (B.dead) { c.save(); c.fillStyle = 'rgba(255,120,170,.6)'; circ(c, B.x - 10, B.gy - 40, 3); c.fill(); circ(c, B.x + 10, B.gy - 40, 3); c.fill(); c.restore(); }
}

/* ===== Блоки ===== */
function drawBlock28(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'cliffblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#b8a088'; c.fill(); c.stroke(); c.fillStyle = '#a08870'; ell(c, 8, 9, 5, 3); c.fill(); ell(c, 16, 16, 4, 2.6); c.fill(); c.fillStyle = '#7fd46a'; c.fillRect(1.5, 1.5, T - 3, 3); }
  else if (b === 'chalkblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#d8dce4'; c.fill(); c.stroke(); c.strokeStyle = ['#ff7ab8', '#7fb8ff', '#ffd23f'][0]; c.lineWidth = 1.6; c.beginPath(); c.moveTo(5, 16); c.quadraticCurveTo(12, 6, 19, 14); c.stroke(); }
  else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor28(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'sproutS': c.strokeStyle = '#3e9a48'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 9); c.stroke(); c.fillStyle = '#7fd46a'; c.strokeStyle = INK; c.lineWidth = 0.8; ell(c, x - 4, y - 10, 4, 2.2, -0.4); c.fill(); c.stroke(); ell(c, x + 4, y - 11, 4, 2.2, 0.4); c.fill(); c.stroke(); break;
    case 'chalkS': c.fillStyle = d.c || '#ff7ab8'; c.save(); c.translate(x, y - 2); c.rotate(0.3); rr(c, -5, -1.5, 10, 3, 1.5); c.fill(); c.stroke(); c.restore(); break;
    case 'canS': c.fillStyle = '#7fb8ff'; c.beginPath(); c.moveTo(x - 6, y - 10); c.lineTo(x + 5, y - 10); c.lineTo(x + 4, y); c.lineTo(x - 5, y); c.closePath(); c.fill(); c.stroke(); c.strokeStyle = '#7fb8ff'; c.lineWidth = 2; c.beginPath(); c.moveTo(x + 5, y - 8); c.lineTo(x + 11, y - 13); c.stroke(); break;
  }
}

/* ===== Фони ===== */
function bgRecyclepark(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 120;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.22, span) + 20; c.fillStyle = '#9a7050'; c.fillRect(wx - 4, 160, 8, 62); c.fillStyle = '#8fd88a'; circ(c, wx, 150, 26); c.fill(); circ(c, wx - 16, 166, 18); c.fill(); circ(c, wx + 16, 164, 18); c.fill(); }
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#a8dc90');
}
function bgBeanstalk(c, viewW, camX, t) {
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 200 - camX * 0.06 + t * 4, viewW + 240) - 120; puffCloud(c, x, 24 + (i % 3) * 18, 0.9, 'rgba(255,255,255,.95)'); }
  const span = 300;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.15, span) + 60;
    c.strokeStyle = 'rgba(80,170,90,.45)'; c.lineWidth = 9; c.beginPath(); c.moveTo(wx, 222); for (let k = 1; k <= 6; k++) c.quadraticCurveTo(wx + (k % 2 ? 30 : -30), 222 - k * 34 + 17, wx, 222 - k * 34); c.stroke();
    c.fillStyle = 'rgba(110,200,110,.45)'; for (let k = 1; k <= 5; k++) ell(c, wx + (k % 2 ? 18 : -18), 222 - k * 34, 12, 6, k % 2 ? -0.4 : 0.4), c.fill();
  }
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#9ad88a');
}
function bgHopscotch(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 170;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.22, span) + 20, k = ((i % 3) + 3) % 3, h = 90 + k * 20;
    c.fillStyle = ['#ffd0dc', '#d0e0ff', '#fff0b8'][k]; c.fillRect(wx, 222 - h, 90, h);
    c.fillStyle = '#ffffff'; for (let r = 0; r < Math.floor(h / 34); r++) for (let w = 0; w < 3; w++) c.fillRect(wx + 10 + w * 27, 222 - h + 12 + r * 34, 16, 18);
  }
  c.fillStyle = '#e0e2ea'; c.fillRect(0, 214, viewW, 8);
}
function bgGardenyard(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const hx = wrapX(320 - camX * 0.2, viewW + 360) - 180;
  c.fillStyle = '#fff0d8'; c.fillRect(hx, 140, 110, 82); c.fillStyle = '#e07a5a'; c.beginPath(); c.moveTo(hx - 10, 142); c.lineTo(hx + 55, 100); c.lineTo(hx + 120, 142); c.closePath(); c.fill();
  c.fillStyle = '#9fd8ff'; c.fillRect(hx + 14, 160, 24, 22); c.fillRect(hx + 72, 160, 24, 22); c.fillStyle = '#a8683a'; c.fillRect(hx + 44, 180, 22, 42);
  const span = 26; c.fillStyle = '#f4ead8'; for (let i = 0; i < viewW / span + 2; i++) { const fx = i * span + wrapX(-camX * 0.35, span); c.fillRect(fx, 196, 8, 26); }
  c.fillRect(0, 202, viewW, 4); c.fillRect(0, 212, viewW, 4);
}
function bgGoosemeadow(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 196, 10, 0.012, 0.4, camX * 0.12, '#d8e8a8');
  c.fillStyle = '#8ac8e8'; ell(c, wrapX(viewW * 0.4 - camX * 0.2, viewW + 300) - 150, 212, 120, 12); c.fill();
  hill(c, viewW, 220, 5, 0.03, 1.2, camX * 0.45, '#b8e090');
}
Object.assign(BG2, { recyclepark: bgRecyclepark, beanstalk: bgBeanstalk, hopscotch: bgHopscotch, gardenyard: bgGardenyard, goosemeadow: bgGoosemeadow });
