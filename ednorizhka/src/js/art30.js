'use strict';
/* ===== Частина 31 «Абетка й порядок»: Перша буква, Більше чи менше?, Повтори за мною, Розумний двір, Болото Буквоїда ===== */
Object.assign(THEMES, {
  letterland: { sky: ['#fff0c8', '#fff8e4', '#fffef8'], panel: '#4a2a10', top: '#8fd07a', topHi: '#bdf09e', topLo: '#5aa04a', fill: '#e8c898', fillLo: '#d4b080', dots: ['#ff7a9a', '#4cb6ff', '#ffd23f'], block: 'abc30', ice: false, topStyle: 'grass', dotShape: 'sprinkle' },
  compareland: { sky: ['#c8f0e0', '#e4f8f0', '#fbfff8'], panel: '#1f4a3a', top: '#7fd46a', topHi: '#b4f08e', topLo: '#4f9f4a', fill: '#b8a080', fillLo: '#a48c6c', dots: ['#ffffff', '#ff7a5a', '#ffd23f'], block: 'scale30', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  memorylane: { sky: ['#e4d8ff', '#f0eaff', '#fdfbff'], panel: '#3a2a6a', top: '#9fd88a', topHi: '#c8f0b0', topLo: '#6aa85a', fill: '#c8b0e8', fillLo: '#b49cd8', dots: ['#ffffff', '#ff9fc4', '#ffd23f'], block: 'card30', ice: false, topStyle: 'grass', dotShape: 'sprinkle' },
  brainyard: { sky: ['#ffe4c8', '#fff0e0', '#fffcf6'], panel: '#5a2a10', top: '#8fd07a', topHi: '#bdf09e', topLo: '#5aa04a', fill: '#d0a070', fillLo: '#b88656', dots: ['#ffffff', '#ffd23f', '#7fb8ff'], block: 'abc30', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  crocswamp: { sky: ['#b8e0c8', '#d4ecd8', '#f0f8ec'], panel: '#1f3a2a', top: '#6aaa5a', topHi: '#8ac87a', topLo: '#4a8a40', fill: '#6a7a4a', fillLo: '#5a6a3e', dots: ['#ffd23f', '#ff9fc4', '#ffffff'], block: 'moss30', ice: false, topStyle: 'grass', dotShape: 'pebble' },
});

/* ===== Дошки: перша буква й порівняння ===== */
function drawPic30(c, k, x, y, s, t) {
  if (PIC_ANIMAL[k]) drawAnimal27(c, k, x, y + 14 * s, 1, t, s, false);
  else drawItem26(c, k, x, y, s * 1.3, t);
}
function drawQuizBoard30(c, q, t) {
  const o = q.opts[1], cx = o.tx * T + 12;
  c.save(); c.lineJoin = 'round';
  if (q.kind === 'letter') {
    const w = 124, h = 84, y = 2 * T - 12;
    c.strokeStyle = '#8a6a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(cx - 34, y); c.lineTo(cx - 28, y - 18); c.moveTo(cx + 34, y); c.lineTo(cx + 28, y - 18); c.stroke();
    c.fillStyle = '#a8683a'; c.strokeStyle = INK; rr(c, cx - w / 2 - 4, y - 4, w + 8, h + 8, 7); c.fill(); c.stroke();
    c.fillStyle = q.solved ? '#e8ffe0' : '#fffaf0'; rr(c, cx - w / 2, y, w, h, 5); c.fill();
    drawPic30(c, q.pic, cx, y + 28, 1.5, t);
    const word = FIRST_WORD[q.pic], rest = word.slice(1), first = q.solved ? word[0] : '?';
    c.font = '900 17px Nunito, sans-serif'; const wF = c.measureText(first).width, wR = c.measureText(rest).width, x0 = cx - (wF + wR) / 2;
    c.textAlign = 'left'; c.textBaseline = 'middle';
    c.fillStyle = q.solved ? '#2f9a3a' : '#ff4fa3'; c.fillText(first, x0, y + h - 13);
    c.fillStyle = '#3b2a5a'; c.fillText(rest, x0 + wF, y + h - 13); c.textBaseline = 'alphabetic';
    if (!q.solved) { c.globalAlpha = 0.5 + 0.4 * Math.sin(t * 5); c.strokeStyle = '#ff4fa3'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0 - 1, y + h - 3); c.lineTo(x0 + wF + 1, y + h - 3); c.stroke(); c.globalAlpha = 1; }
  } else {
    const w = 176, h = 82, y = 2 * T - 10;
    c.strokeStyle = '#8a6a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(cx - 50, y); c.lineTo(cx - 44, y - 18); c.moveTo(cx + 50, y); c.lineTo(cx + 44, y - 18); c.stroke();
    c.fillStyle = '#a8683a'; c.strokeStyle = INK; rr(c, cx - w / 2 - 4, y - 4, w + 8, h + 8, 7); c.fill(); c.stroke();
    c.fillStyle = q.solved ? '#e8ffe0' : '#fffaf0'; rr(c, cx - w / 2, y, w, h, 5); c.fill();
    const grp = (n, gx) => { for (let i = 0; i < n; i++) { const r = Math.floor(i / 3), k = i % 3, inRow = Math.min(3, n - r * 3); drawItem26(c, 'apple', gx - (inRow - 1) * 9 + k * 18, y + 13 + r * 17, 0.62, t); } txt24(c, String(n), gx, y + h - 9, 15, '#3f5aff'); };
    grp(q.a, cx - 52); grp(q.b, cx + 52);
    c.fillStyle = q.solved ? '#7fe08a' : '#ffe9a0'; c.strokeStyle = INK; c.lineWidth = 1.3; circ(c, cx, y + h / 2, 15); c.fill(); c.stroke();
    if (q.solved) txt24(c, q.ans, cx, y + h / 2 + 1, 20, '#1f5a2a');
    else { c.globalAlpha = 0.55 + 0.45 * Math.sin(t * 4); txt24(c, '?', cx, y + h / 2 + 1, 20, '#ff4fa3'); c.globalAlpha = 1; }
  }
  c.restore();
}

/* ===== Повтори за мною ===== */
function drawSeqBoard(c, s, t) {
  const cx = s.cards[1].tx * T + 12, n = s.order.length, w = 30 + n * 38, h = 56, y = 2 * T - 6;
  c.save(); c.lineJoin = 'round';
  c.strokeStyle = '#8a6a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(cx - w / 3, y); c.lineTo(cx - w / 3 + 6, y - 18); c.moveTo(cx + w / 3, y); c.lineTo(cx + w / 3 - 6, y - 18); c.stroke();
  c.fillStyle = '#6a4aa8'; c.strokeStyle = INK; rr(c, cx - w / 2 - 4, y - 4, w + 8, h + 8, 7); c.fill(); c.stroke();
  c.fillStyle = s.done ? '#e8ffe0' : '#fffaf0'; rr(c, cx - w / 2, y, w, h, 5); c.fill();
  s.order.forEach((k, i) => {
    const px = cx - (n - 1) * 19 + i * 38, done = i < s.step || s.done, now = i === s.step && !s.done;
    if (now) { c.globalAlpha = 0.4 + 0.3 * Math.sin(t * 6); c.fillStyle = '#ffd23f'; circ(c, px, y + 26, 17); c.fill(); c.globalAlpha = 1; }
    drawAnimal27(c, k, px, y + 38, 1, t, 1.05, false);
    txt24(c, String(i + 1), px - 13, y + 9, 10, done ? '#2f9a3a' : '#6a4aa8', '#ffffff', 2.5);
    if (done) { c.strokeStyle = '#2f9a3a'; c.lineWidth = 2.6; c.beginPath(); c.moveTo(px + 6, y + 44); c.lineTo(px + 10, y + 49); c.lineTo(px + 17, y + 39); c.stroke(); }
    if (i < n - 1) { c.fillStyle = '#b8a8d8'; c.beginPath(); c.moveTo(px + 17, y + 22); c.lineTo(px + 22, y + 26); c.lineTo(px + 17, y + 30); c.closePath(); c.fill(); }
  });
  c.restore();
}
function drawSeqCard(c, s, card, t) {
  const bad = s.wrongT > 0 && s.wrongTx === card.tx, ok = s.okT > 0 && s.okTx === card.tx, wob = bad ? Math.sin(s.wrongT * 40) * 3 : 0;
  const x = card.tx * T + 12 + wob, y = card.ty * T;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = s.done ? '#d8f8d0' : ok ? '#7fe08a' : bad ? '#ffb0b0' : '#fff6dc'; rr(c, x - 17, y - 10, 34, T + 10, 6); c.fill(); c.stroke();
  drawAnimal27(c, card.k, x, y + T - 1, 1, t, 1, false);
  if (!s.done) { c.globalAlpha = 0.4 + 0.3 * Math.sin(t * 5 + card.tx); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(x - 4, y + T + 3); c.lineTo(x + 4, y + T + 3); c.lineTo(x, y + T + 8); c.closePath(); c.fill(); }
  c.restore();
}

function drawWorld30(c, t, vis) {
  if (G.seqs) for (const s of G.seqs) {
    if (vis(s.cards[1].tx * T + 12, 220)) { drawSeqBoard(c, s, t); for (const card of s.cards) drawSeqCard(c, s, card, t); }
    if (vis(s.door * T + 12) && tileAt(s.door, 8) === 2) drawDoorCol(c, s.door, s.top, 'quiz', '#b89aff', t);
  }
}

/* ===== Крокодильчик Буквоїд ===== */
function drawCrocBoss(c, B, t) {
  const rest = B.state === 'rest' && !B.dead, run = B.state === 'dash' && !B.dead, fl = B.flash > 0;
  const x = B.x, gy = B.gy, hic = rest ? Math.max(0, Math.sin(t * 6)) * 4 : 0;
  c.save(); c.translate(x, gy - hic); c.scale(B.dir > 0 ? -1 : 1, 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.6;
  const skin = fl ? '#ffffff' : B.dead ? '#b8f0b0' : '#5cc05a', belly = fl ? '#ffffff' : '#d8f4a8';
  // хвіст
  c.fillStyle = skin; c.beginPath(); c.moveTo(22, -14); c.quadraticCurveTo(46, -10 + Math.sin(t * (run ? 14 : 3)) * 5, 54, -26); c.quadraticCurveTo(44, -14, 22, -4); c.closePath(); c.fill(); c.stroke();
  // лапки
  for (const fx of [-16, 12]) { c.fillStyle = skin; ell(c, fx + (run ? Math.sin(t * 18 + fx) * 3 : 0), -3, 6, 4); c.fill(); c.stroke(); }
  // тулуб
  c.fillStyle = skin; ell(c, 0, -16, 28, 14); c.fill(); c.stroke();
  c.fillStyle = belly; ell(c, -2, -9, 20, 6); c.fill();
  c.fillStyle = '#3e9a48'; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(-14 + i * 8, -29); c.lineTo(-10 + i * 8, -35); c.lineTo(-6 + i * 8, -29); c.closePath(); c.fill(); }
  // голова з довгою мордочкою
  c.fillStyle = skin; c.beginPath(); c.moveTo(-18, -30); c.quadraticCurveTo(-30, -38, -36, -30); c.lineTo(-58, -26); c.quadraticCurveTo(-64, -20, -58, -14); c.lineTo(-24, -10); c.closePath(); c.fill(); c.stroke();
  const open = run ? 0.5 + Math.abs(Math.sin(t * 10)) * 4 : B.state === 'throw' ? 6 : rest ? 0 : 2;
  c.fillStyle = '#ff7a8a'; c.beginPath(); c.moveTo(-56, -20); c.lineTo(-26, -18); c.lineTo(-56, -20 + open); c.closePath(); c.fill();
  c.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(-52 + i * 6, -20); c.lineTo(-50 + i * 6, -17); c.lineTo(-48 + i * 6, -20); c.closePath(); c.fill(); }
  c.lineWidth = 1.3; c.beginPath(); c.moveTo(-58, -20); c.quadraticCurveTo(-40, -16, -24, -20); c.stroke();
  // очі
  c.fillStyle = skin; circ(c, -30, -36, 7); c.fill(); c.stroke();
  if (rest) { c.lineWidth = 1.6; c.beginPath(); c.moveTo(-34, -37); c.lineTo(-26, -37); c.stroke(); }
  else { c.fillStyle = '#ffffff'; circ(c, -30, -37, 4.6); c.fill(); c.fillStyle = INK; circ(c, -31.5, -37, 2.4); c.fill(); c.fillStyle = '#fff'; circ(c, -32.5, -38.2, 0.9); c.fill(); }
  c.fillStyle = INK; circ(c, -60, -24, 1.2); c.fill();
  if (B.dead) { c.fillStyle = 'rgba(255,120,170,.6)'; circ(c, -24, -26, 3); c.fill(); }
  c.restore();
  if (rest) { c.save(); c.globalAlpha = 0.85; c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1; const by = gy - 50 - ((t * 20) % 16); circ(c, x + (B.dir > 0 ? 34 : -34), by, 4 + ((t * 20) % 16) / 5); c.fill(); c.stroke(); c.restore(); }
}
function drawLetterBolt(c, b) {
  const L = 'АБВГДЕЖЗИКЛМНОПРСТУФ', ch = L[Math.abs(Math.floor((b.vx || 1) * 13 + (b.vy || 0))) % L.length];
  c.save(); c.translate(b.x, b.y); c.rotate(b.t * 6); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = ['#ffd23f', '#9fd0ff', '#ff9fc4'][ch.charCodeAt(0) % 3]; rr(c, -7, -7, 14, 14, 2.5); c.fill(); c.stroke();
  txt24(c, ch, 0, 0.5, 10, '#3b2a5a');
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock30(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'abc30') { const L = 'АБВГДЕЖЗ', i = (c._abc30 = ((c._abc30 || 0) + 1) % 8); rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = ['#ffd8a0', '#c8e4ff', '#ffd0e0', '#d8f4c8'][i % 4]; c.fill(); c.stroke(); c.fillStyle = '#ffffff'; rr(c, 5, 5, T - 10, T - 10, 2); c.fill(); txt24(c, L[i], 12, 12.5, 11, ['#ff4f6a', '#3f8fff', '#4cc35a', '#a05ad8'][i % 4]); }
  else if (b === 'scale30') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#f4e4c8'; c.fill(); c.stroke(); c.fillStyle = '#a8683a'; c.fillRect(11, 6, 2, 12); c.fillRect(5, 6, 14, 2); c.fillStyle = '#ffd23f'; c.beginPath(); c.arc(6, 12, 3.5, 0, Math.PI); c.fill(); c.beginPath(); c.arc(18, 12, 3.5, 0, Math.PI); c.fill(); }
  else if (b === 'card30') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#b89aff'; c.fill(); c.stroke(); c.strokeStyle = '#ffffff'; c.lineWidth = 1.4; rr(c, 4, 4, T - 8, T - 8, 3); c.stroke(); c.fillStyle = '#ffffff'; starPath(c, 12, 12, 5, 2.2, 0); c.fill(); }
  else if (b === 'moss30') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#7a6a4a'; c.fill(); c.stroke(); c.fillStyle = '#6aaa5a'; c.beginPath(); c.moveTo(1.5, 1.5); c.lineTo(T - 1.5, 1.5); c.lineTo(T - 1.5, 6); c.quadraticCurveTo(18, 10, 14, 6); c.quadraticCurveTo(8, 11, 4, 6); c.lineTo(1.5, 7); c.closePath(); c.fill(); }
  else return false;
  return true;
}

/* ===== Декор ===== */
function drawDecor30(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'cubeS': c.fillStyle = d.c || '#ffd8a0'; rr(c, x - 6, y - 12, 12, 12, 2); c.fill(); c.stroke(); txt24(c, d.ch || 'А', x, y - 5.5, 9, '#3b2a5a'); break;
    case 'lilyS': c.fillStyle = '#5cc05a'; ell(c, x, y - 1.5, 9, 3); c.fill(); c.stroke(); c.fillStyle = '#ff9fc4'; for (let i = 0; i < 5; i++) { const a = i * TAU / 5; ell(c, x + Math.cos(a) * 2.6, y - 6 + Math.sin(a) * 1.4, 2.4, 1.6, a); c.fill(); } c.fillStyle = '#ffd23f'; circ(c, x, y - 6, 1.4); c.fill(); break;
    case 'reedS': c.strokeStyle = '#4a8a40'; c.lineWidth = 1.4; for (const dx of [-3, 0, 3]) { c.beginPath(); c.moveTo(x + dx, y); c.quadraticCurveTo(x + dx * 2, y - 10, x + dx * 1.5, y - 18); c.stroke(); } c.fillStyle = '#8a5a30'; ell(c, x, y - 18, 2, 4); c.fill(); break;
  }
}

/* ===== Фони ===== */
function bgLetterland(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const AB = 'АБВГҐДЕЄЖЗИІЇЙ';
  for (let i = 0; i < 14; i++) { const x = wrapX(i * 71 + 20 - camX * 0.2, viewW + 100) - 50, y = 70 + ((i * 41) % 90) + Math.sin(t * 1.4 + i) * 5; c.save(); c.globalAlpha = 0.28; txt24(c, AB[i], x, y, 24, RAINBOW[(i + 1) % 6]); c.restore(); }
  hill(c, viewW, 200, 10, 0.012, 0.4, camX * 0.12, '#f0e0b0');
  hill(c, viewW, 218, 6, 0.03, 1.2, camX * 0.45, '#b4e8a0');
}
function bgCompareland(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const span = 220;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.22, span) + 60, tilt = Math.sin(t * 0.8 + i) * 0.15;
    c.fillStyle = 'rgba(168,104,58,.5)'; c.fillRect(wx - 3, 120, 6, 102); c.fillRect(wx - 16, 216, 32, 6);
    c.save(); c.translate(wx, 124); c.rotate(tilt); c.fillRect(-50, -2, 100, 4);
    for (const s of [-1, 1]) { c.strokeStyle = 'rgba(168,104,58,.5)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(s * 46, 0); c.lineTo(s * 46 - 12, 26); c.moveTo(s * 46, 0); c.lineTo(s * 46 + 12, 26); c.stroke(); c.fillStyle = 'rgba(255,210,63,.6)'; c.beginPath(); c.arc(s * 46, 26, 14, 0, Math.PI); c.fill(); }
    c.restore();
  }
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#a8dc90');
}
function bgMemorylane(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  for (let i = 0; i < 10; i++) { const x = wrapX(i * 97 + 30 - camX * 0.18, viewW + 100) - 50, y = 80 + ((i * 37) % 80) + Math.sin(t + i) * 4, flip = Math.cos(t * 0.8 + i); c.save(); c.translate(x, y); c.scale(Math.max(0.1, Math.abs(flip)), 1); c.globalAlpha = 0.4; c.fillStyle = flip > 0 ? '#b89aff' : '#ffffff'; rr(c, -12, -16, 24, 32, 4); c.fill(); c.restore(); }
  hill(c, viewW, 218, 6, 0.03, 1.2, camX * 0.45, '#b8e0a0');
}
function bgBrainyard(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const sx = wrapX(260 - camX * 0.2, viewW + 360) - 180;
  c.fillStyle = '#ffe0b8'; c.fillRect(sx, 110, 200, 112); c.fillStyle = '#5aa0d8'; c.beginPath(); c.moveTo(sx - 10, 112); c.lineTo(sx + 100, 72); c.lineTo(sx + 210, 112); c.closePath(); c.fill();
  for (let a = 0; a < 4; a++) { c.fillStyle = '#9fd8ff'; c.fillRect(sx + 14 + a * 48, 128, 30, 26); }
  c.fillStyle = '#2f5a4a'; c.fillRect(sx + 40, 168, 120, 34); txt24(c, 'А Б В  1 2 3', sx + 100, 186, 13, '#ffffff');
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#a8dc90');
}
function bgCrocswamp(c, viewW, camX, t) {
  for (let i = 0; i < 3; i++) { const x = wrapX(i * 300 - camX * 0.06 + t * 4, viewW + 300) - 150; puffCloud(c, x, 34 + (i % 2) * 20, 0.8, 'rgba(255,255,255,.85)'); }
  const span = 140;
  for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.22, span) + 20; c.fillStyle = 'rgba(80,110,70,.5)'; c.fillRect(wx - 4, 130, 8, 92); c.fillStyle = 'rgba(90,150,90,.5)'; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(wx, 130); c.quadraticCurveTo(wx + (k - 1.5) * 26, 110, wx + (k - 1.5) * 34, 150); c.lineWidth = 6; c.strokeStyle = 'rgba(90,150,90,.5)'; c.stroke(); } }
  c.fillStyle = '#7ab0a0'; c.fillRect(0, 206, viewW, 20);
  for (let i = 0; i < viewW / 90 + 2; i++) { const lx = i * 90 + wrapX(-camX * 0.4, 90); c.fillStyle = '#5cc05a'; ell(c, lx, 212, 12, 3.5); c.fill(); }
}
Object.assign(BG2, { letterland: bgLetterland, compareland: bgCompareland, memorylane: bgMemorylane, brainyard: bgBrainyard, crocswamp: bgCrocswamp });
