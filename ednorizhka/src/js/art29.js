'use strict';
/* ===== Частина 30 «Зимове свято»: Зліпи сніговика, Хто як говорить?, Театр тіней, Зимове свято, Крижаний палац ===== */
Object.assign(THEMES, {
  snowmanhill: { sky: ['#cfe6ff', '#e6f2ff', '#fbfdff'], panel: '#1f3a6a', top: '#ffffff', topHi: '#ffffff', topLo: '#d8e8f8', fill: '#a8c0e0', fillLo: '#94acd0', dots: ['#ffffff', '#c8e0ff', '#ffd23f'], block: 'snowbrick30', ice: false, topStyle: 'snow', dotShape: 'pebble' },
  animalsounds: { sky: ['#d8ecff', '#ecf6ff', '#fffdf4'], panel: '#5a2a10', top: '#ffffff', topHi: '#ffffff', topLo: '#dce8f4', fill: '#c8a070', fillLo: '#b08a5a', dots: ['#ffffff', '#ffd23f', '#ff9a8a'], block: 'hayblock', ice: false, topStyle: 'snow', dotShape: 'pebble' },
  shadowtheater: { sky: ['#3a2a5a', '#5a3a6a', '#8a5a7a'], panel: '#1a0f2a', top: '#c8a070', topHi: '#e4c090', topLo: '#a07848', fill: '#7a4a5a', fillLo: '#683e4c', dots: ['#ffd23f', '#ff9fc4', '#ffffff'], block: 'curtain30', ice: false, topStyle: 'plank', dotShape: 'sprinkle' },
  winterfest: { sky: ['#bcd8ff', '#dcebff', '#fff8f0'], panel: '#1f3a6a', top: '#ffffff', topHi: '#ffffff', topLo: '#d8e8f8', fill: '#c8a8d8', fillLo: '#b494c8', dots: ['#ff4d4d', '#4cc35a', '#ffd23f'], block: 'snowbrick30', ice: false, topStyle: 'snow', dotShape: 'sprinkle' },
  icepalace: { sky: ['#1f2a5a', '#3a5a9a', '#8ab8e8'], panel: '#0f1a3a', top: '#e8f6ff', topHi: '#ffffff', topLo: '#b8d8f4', fill: '#8ab8e8', fillLo: '#78a4d8', dots: ['#ffffff', '#c8f0ff', '#ffd23f'], block: 'ice30', ice: false, topStyle: 'snow', dotShape: 'pebble' },
});

/* ===== Сніговик ===== */
function drawSnowPart(c, k, x, y, s, t) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  const ball = r => { c.fillStyle = '#ffffff'; circ(c, 0, 0, r); c.fill(); c.stroke(); c.fillStyle = '#dceaf8'; ell(c, r * 0.25, r * 0.35, r * 0.6, r * 0.35); c.fill(); };
  if (k === 'base') ball(11);
  else if (k === 'mid') ball(8.5);
  else if (k === 'head') ball(6.5);
  else if (k === 'nose') { c.fillStyle = '#ff9a2a'; c.beginPath(); c.moveTo(-6, -3); c.lineTo(8, 0); c.lineTo(-6, 3); c.closePath(); c.fill(); c.stroke(); }
  else if (k === 'hat') { c.fillStyle = '#4cb6ff'; c.beginPath(); c.moveTo(-6, 5); c.lineTo(-4.5, -6); c.lineTo(4.5, -6); c.lineTo(6, 5); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#2a8ad8'; rr(c, -8, 4, 16, 3, 1.5); c.fill(); c.stroke(); }
  else if (k === 'scarf') { c.fillStyle = '#ff4d6a'; rr(c, -9, -3, 18, 6, 3); c.fill(); c.stroke(); c.fillRect(3, 1, 5, 9); c.strokeRect(3, 1, 5, 9); c.fillStyle = '#ffffff'; c.fillRect(-5, -3, 2, 6); c.fillRect(1, -3, 2, 6); }
  c.restore();
}
function drawSnowman30(c, s, t) {
  const x = s.x, gy = s.gy, has = k => s.got.includes(k), need = k => s.items.some(i => i.k === k);
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  const ghost = (fn) => { c.save(); c.globalAlpha = 0.35; c.setLineDash([3, 3]); c.strokeStyle = '#6a8ab8'; c.lineWidth = 1.5; fn(); c.restore(); };
  const parts = [['base', 0, -16, 16], ['mid', 0, -41, 12], ['head', 0, -61, 9]];
  for (const [k, dx, dy, r] of parts) {
    if (has(k)) { c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.4; circ(c, x + dx, gy + dy, r); c.fill(); c.stroke(); c.fillStyle = '#dceaf8'; ell(c, x + dx + r * 0.25, gy + dy + r * 0.35, r * 0.6, r * 0.35); c.fill(); }
    else if (need(k)) ghost(() => { circ(c, x + dx, gy + dy, r); c.stroke(); });
  }
  if (has('mid')) { c.fillStyle = INK; for (const by of [-46, -40, -34]) { circ(c, x, gy + by, 1.6); c.fill(); } }
  if (has('head')) { c.fillStyle = INK; circ(c, x - 3, gy - 63, 1.4); c.fill(); circ(c, x + 3, gy - 63, 1.4); c.fill(); c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath(); c.arc(x, gy - 59, 3.5, 0.2 * Math.PI, 0.8 * Math.PI); c.stroke(); }
  if (has('nose')) { c.fillStyle = '#ff9a2a'; c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(x, gy - 62); c.lineTo(x + 9, gy - 60); c.lineTo(x, gy - 59); c.closePath(); c.fill(); c.stroke(); }
  else if (need('nose')) ghost(() => { c.beginPath(); c.moveTo(x, gy - 62); c.lineTo(x + 9, gy - 60); c.lineTo(x, gy - 59); c.closePath(); c.stroke(); });
  if (has('hat')) drawSnowPart(c, 'hat', x, gy - 74, 1.1, t); else if (need('hat')) ghost(() => { c.strokeRect(x - 6, gy - 82, 12, 11); });
  if (has('scarf')) drawSnowPart(c, 'scarf', x, gy - 52, 1, t); else if (need('scarf')) ghost(() => { c.strokeRect(x - 9, gy - 55, 18, 6); });
  // руки-гілочки, після готовності — махає
  if (has('mid')) {
    const wv = s.done ? Math.sin(t * 8) * 0.5 : 0;
    c.strokeStyle = '#8a5a30'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(x - 10, gy - 42); c.lineTo(x - 24, gy - 50); c.stroke();
    c.save(); c.translate(x + 10, gy - 42); c.rotate(-0.4 + wv); c.beginPath(); c.moveTo(0, 0); c.lineTo(15, -6); c.moveTo(10, -4); c.lineTo(13, -10); c.stroke(); c.restore();
  }
  c.restore();
  if (!s.done) txt24(c, s.got.length + '/' + s.items.length, x, gy - 96, 11, '#3f5aa8', '#ffffff', 3);
}

/* ===== Дошки: тваринка й тінь ===== */
const SIL30 = {};
function silhouette30(k) {
  if (SIL30[k]) return SIL30[k];
  const cv = document.createElement('canvas'); cv.width = 90; cv.height = 70;
  const oc = cv.getContext('2d');
  drawAnimal27(oc, k, 45, 62, 1, 0, 2, false);
  oc.globalCompositeOperation = 'source-in'; oc.fillStyle = '#241c3a'; oc.fillRect(0, 0, 90, 70);
  return (SIL30[k] = cv);
}
function drawQuizBoard29(c, q, t) {
  const o = q.opts[1], cx = o.tx * T + 12, y = 2 * T - 6, w = 96, h = 70;
  c.save(); c.lineJoin = 'round';
  c.strokeStyle = '#8a6a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(cx - 30, y); c.lineTo(cx - 24, y - 22); c.moveTo(cx + 30, y); c.lineTo(cx + 24, y - 22); c.stroke();
  c.fillStyle = q.kind === 'shadow' ? '#8a4a5a' : '#a8683a'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, cx - w / 2 - 4, y - 4, w + 8, h + 8, 7); c.fill(); c.stroke();
  if (q.kind === 'shadow') {
    const g = c.createRadialGradient(cx, y + h / 2, 4, cx, y + h / 2, w / 1.6); g.addColorStop(0, '#fff8d8'); g.addColorStop(1, '#f4d890');
    c.fillStyle = q.solved ? '#e8ffe0' : g; rr(c, cx - w / 2, y, w, h, 5); c.fill();
    if (q.solved) drawAnimal27(c, q.ans, cx, y + h - 6, 1, t, 2, false);
    else c.drawImage(silhouette30(q.ans), cx - 45, y + h - 68);
  } else {
    c.fillStyle = q.solved ? '#e8ffe0' : '#fffaf0'; rr(c, cx - w / 2, y, w, h, 5); c.fill();
    drawAnimal27(c, q.animal, cx - 12, y + h - 6, 1, t, 1.9, false);
    // бульбашка-«питання»
    const bx = cx + 30, by = y + 18;
    c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2; ell(c, bx, by, 15, 11); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(bx - 10, by + 7); c.lineTo(bx - 16, by + 16); c.lineTo(bx - 4, by + 10); c.fill();
    txt24(c, q.solved ? q.ans : '?', bx, by + 1, q.solved ? 9 : 14, q.solved ? '#2f9a3a' : '#ff4fa3');
  }
  c.restore();
}
function drawAnswerCard29(c, q, o, t) {
  const good = q.solved && o.n === q.ans, bad = q.wrongT > 0 && q.wrongTx === o.tx, wob = bad ? Math.sin(q.wrongT * 40) * 3 : 0;
  const x = o.tx * T + 12 + wob, y = o.ty * T;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = good ? '#7fe08a' : bad ? '#ffb0b0' : '#fff6dc';
  if (q.kind === 'sound') {
    rr(c, x - 22, y - 2, 44, T + 2, 8); c.fill(); c.stroke();
    txt24(c, String(o.n), x, y + 12, 13, good ? '#1f5a2a' : '#3f5aff');
  } else {
    rr(c, x - 17, y - 10, 34, T + 10, 6); c.fill(); c.stroke();
    drawAnimal27(c, o.n, x, y + T - 1, 1, t, 1, false);
  }
  if (!q.solved) { c.globalAlpha = 0.4 + 0.3 * Math.sin(t * 5 + o.tx); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(x - 4, y + T + 3); c.lineTo(x + 4, y + T + 3); c.lineTo(x, y + T + 8); c.closePath(); c.fill(); }
  c.restore();
}

function drawWorld29(c, t, vis) {
  if (G.snowkits) for (const s of G.snowkits) {
    if (vis(s.x, 80)) drawSnowman30(c, s, t);
    if (!s.done) for (const it of s.items) if (!it.taken && vis(it.x)) { c.save(); c.globalAlpha = 0.45; c.fillStyle = '#ffffff'; circ(c, it.x, it.y, 14); c.fill(); c.restore(); drawSnowPart(c, it.k, it.x, it.y + Math.sin(t * 3 + it.x) * 2, 1, t); }
    if (vis(s.door * T + 12) && tileAt(s.door, 8) === 2) {
      drawDoorCol(c, s.door, s.top, 'snow', '#c8e0ff', t);
      c.save(); c.translate(s.door * T + 12, 4 * T + 8); c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, 0, 4, 7); c.fill(); c.stroke(); circ(c, 0, -6, 5); c.fill(); c.stroke(); c.fillStyle = '#ff9a2a'; c.beginPath(); c.moveTo(0, -6); c.lineTo(6, -5); c.lineTo(0, -4); c.fill(); c.restore();
    }
  }
}

/* ===== Сніговик Хрумко ===== */
function drawSnowBoss(c, B, t) {
  const rest = B.state === 'rest' && !B.dead, run = B.state === 'dash' && !B.dead, fl = B.flash > 0;
  const x = B.x, gy = B.gy, melt = rest ? 0.86 : 1, bob = run ? Math.abs(Math.sin(t * 16)) * 3 : 0;
  c.save(); c.translate(x, gy - bob); c.scale((B.dir > 0 ? -1 : 1) * 0.62, melt * 0.62); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.8;
  const snow = fl ? '#fff4c0' : '#ffffff';
  if (rest) { c.fillStyle = 'rgba(160,200,255,.5)'; ell(c, 0, 0, 34, 5); c.fill(); }
  c.fillStyle = snow; circ(c, 0, -22, 24); c.fill(); c.stroke(); circ(c, 0, -58, 18); c.fill(); c.stroke(); circ(c, 0, -86, 14); c.fill(); c.stroke();
  c.fillStyle = '#dceaf8'; ell(c, 8, -14, 12, 7); c.fill(); ell(c, 6, -52, 9, 5); c.fill();
  // шарф і відро
  c.fillStyle = '#4cb6ff'; rr(c, -15, -74, 30, 7, 3); c.fill(); c.stroke(); c.fillRect(-12, -70, 7, 16); c.strokeRect(-12, -70, 7, 16);
  c.fillStyle = '#ff4d6a'; c.beginPath(); c.moveTo(-11, -98); c.lineTo(-9, -116); c.lineTo(9, -116); c.lineTo(11, -98); c.closePath(); c.fill(); c.stroke(); rr(c, -14, -100, 28, 5, 2); c.fill(); c.stroke();
  // обличчя
  c.fillStyle = INK;
  if (rest) { c.lineWidth = 1.6; c.beginPath(); c.moveTo(-8, -90); c.lineTo(-3, -89); c.moveTo(3, -89); c.lineTo(8, -90); c.stroke(); }
  else { circ(c, -5, -90, 2.4); c.fill(); circ(c, 5, -90, 2.4); c.fill(); c.lineWidth = 1.8; c.beginPath(); c.moveTo(-9, -96); c.lineTo(-2, -94); c.moveTo(9, -96); c.lineTo(2, -94); c.stroke(); }
  c.fillStyle = '#ff9a2a'; c.beginPath(); c.moveTo(0, -86); c.lineTo(-16, -83); c.lineTo(0, -82); c.closePath(); c.fill(); c.lineWidth = 1.2; c.stroke();
  c.fillStyle = INK; if (B.dead) { c.lineWidth = 1.6; c.beginPath(); c.arc(0, -79, 5, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke(); } else for (let i = -2; i <= 2; i++) { circ(c, i * 3, -77 + Math.abs(i) * -0.8, 1.2); c.fill(); }
  // ґудзики й руки-гілки
  for (const by of [-64, -56, -48]) { circ(c, 0, by, 2.2); c.fill(); }
  c.strokeStyle = '#8a5a30'; c.lineWidth = 3;
  const arm = run ? Math.sin(t * 16) * 0.4 : rest ? 0.6 : -0.3;
  for (const s of [-1, 1]) { c.save(); c.translate(s * 16, -60); c.rotate(s * arm); c.beginPath(); c.moveTo(0, 0); c.lineTo(s * 22, -10); c.moveTo(s * 14, -6); c.lineTo(s * 18, -14); c.stroke(); c.restore(); }
  if (B.dead) { c.fillStyle = 'rgba(255,120,170,.6)'; circ(c, -10, -82, 3); c.fill(); circ(c, 10, -82, 3); c.fill(); }
  c.restore();
  if (rest) for (let i = 0; i < 3; i++) { c.save(); c.fillStyle = '#8ac8ff'; const dy = ((t * 30 + i * 9) % 26); ell(c, x - 10 + i * 10, gy - 40 + dy, 2, 3); c.fill(); c.restore(); }
}

/* ===== Блоки ===== */
function drawBlock29(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'snowbrick30') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#eef6ff'; c.fill(); c.stroke(); c.fillStyle = '#ffffff'; rr(c, 1.5, 1.5, T - 3, 7, 3.5); c.fill(); c.fillStyle = '#c8dcf4'; circ(c, 7, 15, 2); c.fill(); circ(c, 16, 18, 1.5); c.fill(); }
  else if (b === 'curtain30') { rr(c, 1, 1, T - 2, T - 2, 2); c.fillStyle = '#c84a5a'; c.fill(); c.stroke(); c.strokeStyle = '#a83a4a'; c.lineWidth = 1.4; for (const xx of [7, 12, 17]) { c.beginPath(); c.moveTo(xx, 2); c.quadraticCurveTo(xx + 2, 12, xx, T - 2); c.stroke(); } c.fillStyle = '#ffd23f'; c.fillRect(1.5, 1.5, T - 3, 3); }
  else if (b === 'ice30') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#bfe4ff'; c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.75)'; c.beginPath(); c.moveTo(4, 4); c.lineTo(11, 4); c.lineTo(4, 12); c.closePath(); c.fill(); c.strokeStyle = '#8ac0e8'; c.lineWidth = 1; c.beginPath(); c.moveTo(14, 14); c.lineTo(19, 19); c.stroke(); }
  else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor29(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'firSnow': c.fillStyle = '#8a5a30'; c.fillRect(x - 1.5, y - 5, 3, 5); for (let i = 0; i < 3; i++) { c.fillStyle = '#3e9a5a'; c.beginPath(); c.moveTo(x, y - 24 + i * 6); c.lineTo(x + 8 - i, y - 10 + i * 4 - 4); c.lineTo(x - 8 + i, y - 10 + i * 4 - 4); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(x, y - 24 + i * 6); c.lineTo(x + 3, y - 20 + i * 6); c.lineTo(x - 3, y - 20 + i * 6); c.closePath(); c.fill(); } if (d.lights) for (let i = 0; i < 4; i++) { c.fillStyle = RAINBOW[(i + Math.floor(t * 3)) % 6]; circ(c, x - 5 + i * 3.4, y - 12 - (i % 2) * 6, 1.3); c.fill(); } break;
    case 'sledS': c.fillStyle = '#ff6a6a'; rr(c, x - 10, y - 8, 20, 4, 2); c.fill(); c.stroke(); c.strokeStyle = '#8a5a30'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x - 10, y - 1); c.lineTo(x + 9, y - 1); c.quadraticCurveTo(x + 13, y - 1, x + 12, y - 5); c.moveTo(x - 6, y - 4); c.lineTo(x - 6, y - 1); c.moveTo(x + 6, y - 4); c.lineTo(x + 6, y - 1); c.stroke(); break;
    case 'flakeS': c.strokeStyle = '#ffffff'; c.lineWidth = 1.2; c.save(); c.translate(x, y - 14 + Math.sin(t * 2 + x) * 2); c.rotate(t * 0.5 + x); for (let i = 0; i < 3; i++) { c.rotate(Math.PI / 3); c.beginPath(); c.moveTo(-5, 0); c.lineTo(5, 0); c.stroke(); } c.restore(); break;
    case 'maskS': c.fillStyle = d.c || '#ffd23f'; ell(c, x, y - 8, 7, 6); c.fill(); c.stroke(); c.fillStyle = INK; circ(c, x - 2.5, y - 9, 1.2); c.fill(); circ(c, x + 2.5, y - 9, 1.2); c.fill(); c.beginPath(); c.arc(x, y - 7, 3, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); c.fillStyle = '#8a5a30'; c.fillRect(x - 0.8, y - 3, 1.6, 3); break;
  }
}

/* ===== Фони ===== */
function snowfall30(c, viewW, camX, t, n) {
  c.fillStyle = 'rgba(255,255,255,.85)';
  for (let i = 0; i < n; i++) { const x = wrapX(i * 53 + 17 - camX * 0.25 + Math.sin(t + i) * 10, viewW + 40) - 20, y = (t * (14 + (i % 5) * 4) + i * 37) % 240 - 10; circ(c, x, y, 1.2 + (i % 3) * 0.6); c.fill(); }
}
function bgSnowmanhill(c, viewW, camX, t) {
  for (let i = 0; i < 3; i++) { const x = wrapX(i * 300 - camX * 0.06 + t * 4, viewW + 300) - 150; puffCloud(c, x, 34 + (i % 2) * 20, 0.85, 'rgba(255,255,255,.95)'); }
  hill(c, viewW, 190, 14, 0.01, 0.4, camX * 0.12, '#eef4fc');
  hill(c, viewW, 214, 8, 0.025, 1.2, camX * 0.4, '#ffffff');
  snowfall30(c, viewW, camX, t, 40);
}
function bgAnimalsounds(c, viewW, camX, t) {
  for (let i = 0; i < 3; i++) { const x = wrapX(i * 300 - camX * 0.06 + t * 4, viewW + 300) - 150; puffCloud(c, x, 34 + (i % 2) * 20, 0.85, 'rgba(255,255,255,.95)'); }
  const bx = wrapX(300 - camX * 0.2, viewW + 360) - 180;
  c.fillStyle = '#e05a4a'; c.fillRect(bx, 130, 120, 92); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(bx - 12, 134); c.lineTo(bx + 60, 88); c.lineTo(bx + 132, 134); c.closePath(); c.fill();
  c.fillStyle = '#ffffff'; c.fillRect(bx + 40, 170, 40, 52); c.strokeStyle = '#e05a4a'; c.lineWidth = 3; c.beginPath(); c.moveTo(bx + 40, 170); c.lineTo(bx + 80, 222); c.moveTo(bx + 80, 170); c.lineTo(bx + 40, 222); c.stroke();
  hill(c, viewW, 214, 6, 0.03, 1.2, camX * 0.45, '#ffffff');
  snowfall30(c, viewW, camX, t, 30);
}
function bgShadowtheater(c, viewW, camX, t) {
  c.fillStyle = 'rgba(255,240,200,.18)'; c.beginPath(); c.moveTo(viewW * 0.5 - 30, 0); c.lineTo(viewW * 0.5 + 30, 0); c.lineTo(viewW * 0.5 + 160, 222); c.lineTo(viewW * 0.5 - 160, 222); c.closePath(); c.fill();
  const span = 200;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span);
    c.fillStyle = '#a83a4a'; c.beginPath(); c.moveTo(wx, 0); c.quadraticCurveTo(wx + 40, 80, wx + 20, 222); c.lineTo(wx - 20, 222); c.quadraticCurveTo(wx - 40, 80, wx, 0); c.fill();
    c.fillStyle = '#ffd23f'; c.fillRect(wx - 100, 0, 200, 8);
  }
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 210 + 60 - camX * 0.3, viewW + 210) - 105; c.save(); c.globalAlpha = 0.25; c.drawImage(silhouette30(['cat', 'duck', 'dog', 'hen'][i]), x - 45, 150); c.restore(); }
}
function bgWinterfest(c, viewW, camX, t) {
  for (let i = 0; i < 3; i++) { const x = wrapX(i * 300 - camX * 0.06 + t * 4, viewW + 300) - 150; puffCloud(c, x, 30 + (i % 2) * 20, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 140;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 20, k = ((i % 3) + 3) % 3, h = 80 + k * 16;
    c.fillStyle = ['#ffd8c8', '#d8e4ff', '#e8d8f8'][k]; c.fillRect(wx, 222 - h, 80, h); c.fillStyle = '#ffffff'; rr(c, wx - 4, 222 - h - 6, 88, 10, 5); c.fill();
    c.fillStyle = '#ffe9a0'; for (let r = 0; r < 2; r++) for (let w = 0; w < 3; w++) c.fillRect(wx + 10 + w * 24, 222 - h + 16 + r * 30, 12, 14);
    c.strokeStyle = '#8a8a9a'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(wx, 222 - h + 4); c.quadraticCurveTo(wx + 40, 222 - h + 16, wx + 80, 222 - h + 4); c.stroke();
    for (let l = 0; l < 6; l++) { c.fillStyle = RAINBOW[(l + i + Math.floor(t * 2)) % 6]; circ(c, wx + 7 + l * 13, 222 - h + 7 + Math.sin((l + 0.5) / 6 * Math.PI) * 6, 2); c.fill(); }
  }
  snowfall30(c, viewW, camX, t, 35);
}
function bgIcepalace(c, viewW, camX, t) {
  for (let i = 0; i < 3; i++) { c.strokeStyle = ['rgba(120,255,200,.25)', 'rgba(160,140,255,.2)', 'rgba(120,220,255,.2)'][i]; c.lineWidth = 16; c.beginPath(); for (let x = 0; x <= viewW; x += 20) { const y = 50 + i * 18 + Math.sin(x * 0.01 + t * 0.6 + i) * 14; if (x === 0) c.moveTo(x, y); else c.lineTo(x, y); } c.stroke(); }
  for (let i = 0; i < 16; i++) { c.fillStyle = 'rgba(255,255,255,' + (0.4 + 0.4 * Math.sin(t * 2 + i)) + ')'; circ(c, (i * 89 + 20) % viewW, 12 + (i * 47) % 70, 1.2); c.fill(); }
  const px = wrapX(380 - camX * 0.15, viewW + 400) - 200;
  c.fillStyle = 'rgba(200,236,255,.85)';
  for (const [dx, w, h] of [[0, 60, 110], [-50, 36, 80], [56, 36, 80], [-90, 26, 60], [96, 26, 60]]) { c.fillRect(px + dx - w / 2, 222 - h, w, h); c.beginPath(); c.moveTo(px + dx - w / 2 - 4, 222 - h); c.lineTo(px + dx, 222 - h - w * 0.9); c.lineTo(px + dx + w / 2 + 4, 222 - h); c.closePath(); c.fill(); }
  c.fillStyle = 'rgba(120,180,230,.6)'; rr(c, px - 12, 186, 24, 36, 12); c.fill();
  snowfall30(c, viewW, camX, t, 30);
}
Object.assign(BG2, { snowmanhill: bgSnowmanhill, animalsounds: bgAnimalsounds, shadowtheater: bgShadowtheater, winterfest: bgWinterfest, icepalace: bgIcepalace });
