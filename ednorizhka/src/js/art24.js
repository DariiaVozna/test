'use strict';
/* ===== Частина 25 «Розумна країна»: Країна чисел, Англійська галявина, Майстерня фарб, Розумна школа, Чорнильниця ===== */
Object.assign(THEMES, {
  numberland: { sky: ['#b8e0ff', '#dcefff', '#fff8e8'], panel: '#1f3a6a', top: '#8fd07a', topHi: '#bdf09e', topLo: '#5aa04a', fill: '#f2c88a', fillLo: '#dcae6e', dots: ['#ffffff', '#ff7a9a', '#4cb6ff'], block: 'numblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  abcmeadow: { sky: ['#ffd6ec', '#ffeaf4', '#fffbe8'], panel: '#4a2550', top: '#7ddc7e', topHi: '#b0f0a2', topLo: '#3eae5c', fill: '#c9a0e0', fillLo: '#b088cc', dots: ['#ffffff', '#ffe066', '#7fd6ff'], block: 'abcblock', ice: false, topStyle: 'grass', dotShape: 'sprinkle' },
  colorlab: { sky: ['#fff0c8', '#fff8e4', '#ffffff'], panel: '#4a2a10', top: '#e8d8c0', topHi: '#fff4e0', topLo: '#c0a888', fill: '#d8c0a0', fillLo: '#c0a888', dots: ['#ff4d4d', '#ffd23f', '#3f8fff'], block: 'paintblock', ice: false, topStyle: 'plank', dotShape: 'sprinkle' },
  smartschool: { sky: ['#a8e0d8', '#d4f2ec', '#fbfff8'], panel: '#1f4a40', top: '#7fd46a', topHi: '#b4f08e', topLo: '#4f9f4a', fill: '#d0a070', fillLo: '#b88656', dots: ['#ffffff', '#ffd23f', '#ff7a9a'], block: 'deskblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  inkwell: { sky: ['#2a2a5a', '#4a4a8a', '#8a8ac0'], panel: '#14143a', top: '#e8e4f4', topHi: '#ffffff', topLo: '#b8b0d8', fill: '#5a5a9a', fillLo: '#48487e', dots: ['#2a2a6a', '#8a8ad0', '#ffffff'], block: 'inkblock', ice: false, topStyle: 'plank', dotShape: 'pebble' },
});

function txt24(c, s, x, y, size, fill, stroke, lw) {
  c.font = '900 ' + size + 'px Nunito, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw || 3; c.lineJoin = 'round'; c.strokeText(s, x, y); }
  c.fillStyle = fill; c.fillText(s, x, y); c.textBaseline = 'alphabetic';
}

/* ===== Приклади ===== */
function drawQuizBoard(c, q, t) {
  if (q.kind) return drawQuizBoard27(c, q, t);
  const o = q.opts[1], cx = o.tx * T + 12, y = 2 * T + 4, w = 120, h = 44;
  c.save(); c.lineJoin = 'round';
  // мотузочки
  c.strokeStyle = '#8a6a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(cx - 40, y); c.lineTo(cx - 34, y - 30); c.moveTo(cx + 40, y); c.lineTo(cx + 34, y - 30); c.stroke();
  c.fillStyle = '#a8683a'; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, cx - w / 2 - 4, y - 4, w + 8, h + 8, 6); c.fill(); c.stroke();
  c.fillStyle = q.solved ? '#2f6a4a' : '#2f5a4a'; rr(c, cx - w / 2, y, w, h, 4); c.fill();
  const s = q.a + ' ' + q.op + ' ' + q.b + ' = ' + (q.solved ? q.ans : '?');
  txt24(c, s, cx, y + h / 2 + 1, 24, q.solved ? '#bfffb0' : '#ffffff');
  if (!q.solved) { c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 4); txt24(c, '?', cx + 42, y + h / 2 + 1, 24, '#ffd23f'); c.globalAlpha = 1; }
  // крейда
  c.fillStyle = '#ffffff'; rr(c, cx + w / 2 - 18, y + h + 1, 10, 3, 1.5); c.fill();
  c.restore();
}
function drawAnswerCard(c, q, o, t) {
  if (q.kind === 'sound' || q.kind === 'shadow') return drawAnswerCard29(c, q, o, t);
  const good = q.solved && o.n === q.ans, wob = q.wrongT > 0 && q.wrongTx === o.tx ? Math.sin(q.wrongT * 40) * 3 : 0;
  const x = o.tx * T + wob, y = o.ty * T;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = good ? '#7fe08a' : q.wrongT > 0 && q.wrongTx === o.tx ? '#ffb0b0' : '#fff6dc'; rr(c, x + 1, y + 1, T - 2, T - 2, 4); c.fill(); c.stroke();
  txt24(c, String(o.n), x + 12, y + 13, 17, good ? '#1f5a2a' : '#3f5aff');
  if (!q.solved) { c.globalAlpha = 0.4 + 0.3 * Math.sin(t * 5 + o.tx); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(x + 8, y + T + 3); c.lineTo(x + 16, y + T + 3); c.lineTo(x + 12, y + T + 8); c.closePath(); c.fill(); }
  c.restore();
}
function drawDoorCol(c, x, top, kind, col, t) {
  // плитки дверей (стовп від top до землі) малюємо поверх звичайних кубиків
  let any = false;
  for (let y = top; y < 10; y++) if (tileAt(x, y) === 2) {
    any = true; const xx = x * T, yy = y * T;
    c.save(); c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = col; rr(c, xx + 1, yy, T - 2, T, 2); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(xx + 4, yy + 2, 3, T - 4);
    if (kind === 'paint') { c.fillStyle = 'rgba(255,255,255,.5)'; circ(c, xx + 15, yy + 8 + ((y * 7) % 9), 2.2); c.fill(); }
    c.restore();
  }
  if (!any || tileAt(x, 8) !== 2) return;
  const cx = x * T + 12, cy = 8 * T + 12;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  c.fillStyle = '#ffd23f'; rr(c, cx - 8, cy - 4, 16, 13, 3); c.fill(); c.stroke();
  c.beginPath(); c.arc(cx, cy - 4, 5, Math.PI, TAU); c.stroke();
  txt24(c, kind === 'quiz' ? '?' : kind === 'word' ? 'A' : '•', cx, cy + 3, 9, INK);
  if (kind === 'paint') { c.fillStyle = col; circ(c, cx, cy + 3, 3.4); c.fill(); c.stroke(); }
  c.restore();
}

/* ===== Англійські слова ===== */
function drawWordPic(c, w, x, y, t) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  if (w === 'CAT') {
    c.fillStyle = '#ffb04a'; ell(c, 0, 6, 11, 8); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-9, -6); c.lineTo(-7, -15); c.lineTo(-2, -9); c.moveTo(9, -6); c.lineTo(7, -15); c.lineTo(2, -9); c.fill(); c.stroke();
    circ(c, 0, -4, 9); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, -3.5, -5, 1.4); c.fill(); circ(c, 3.5, -5, 1.4); c.fill();
    c.beginPath(); c.moveTo(-1.5, -1.5); c.lineTo(1.5, -1.5); c.lineTo(0, 0); c.closePath(); c.fill();
    c.lineWidth = 0.8; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 3, -1); c.lineTo(s * 12, -3); c.moveTo(s * 3, 0); c.lineTo(s * 12, 1); c.stroke(); }
    c.lineWidth = 2.4; c.strokeStyle = '#ffb04a'; c.beginPath(); c.moveTo(10, 8); c.quadraticCurveTo(18, 6 + Math.sin(t * 3) * 2, 16, -2); c.stroke();
  } else if (w === 'SUN') {
    c.save(); c.rotate(t * 0.5); c.strokeStyle = '#ffa020'; c.lineWidth = 2.4; for (let i = 0; i < 8; i++) { const a = i * TAU / 8; c.beginPath(); c.moveTo(Math.cos(a) * 12, Math.sin(a) * 12); c.lineTo(Math.cos(a) * 17, Math.sin(a) * 17); c.stroke(); } c.restore();
    c.fillStyle = '#ffd23f'; circ(c, 0, 0, 10); c.fill(); c.stroke(); face21(c, 0, 0, 0.7, 1, t);
  } else if (w === 'DOG') {
    c.fillStyle = '#d9a86a'; ell(c, 0, 7, 12, 7); c.fill(); c.stroke();
    circ(c, 0, -4, 9); c.fill(); c.stroke();
    c.fillStyle = '#8a5a30'; ell(c, -9, -3, 3.5, 7, 0.3); c.fill(); c.stroke(); ell(c, 9, -3, 3.5, 7, -0.3); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, -3.5, -6, 1.4); c.fill(); circ(c, 3.5, -6, 1.4); c.fill(); ell(c, 0, -1, 2.4, 1.8); c.fill();
    c.fillStyle = '#ff7a9a'; ell(c, 0, 3 + Math.sin(t * 8), 1.8, 2.6); c.fill();
  } else if (w === 'FISH') {
    c.save(); c.translate(Math.sin(t * 2) * 2, 0);
    c.fillStyle = '#4cb6ff'; c.beginPath(); c.moveTo(10, 0); c.lineTo(18, -7); c.lineTo(18, 7); c.closePath(); c.fill(); c.stroke();
    ell(c, 0, 0, 12, 8); c.fill(); c.stroke();
    c.fillStyle = '#ffffff'; circ(c, -6, -2, 2.4); c.fill(); c.fillStyle = INK; circ(c, -6, -2, 1.2); c.fill();
    c.strokeStyle = '#ffffff'; c.lineWidth = 1; c.beginPath(); c.arc(1, 0, 4, -1, 1); c.stroke(); c.restore();
  } else if (w === 'BEE') {
    c.fillStyle = 'rgba(255,255,255,.85)'; ell(c, -4, -9, 5, 7, -0.4 + Math.sin(t * 20) * 0.2); c.fill(); c.stroke(); ell(c, 4, -9, 5, 7, 0.4 - Math.sin(t * 20) * 0.2); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; ell(c, 0, 2, 12, 8); c.fill(); c.stroke();
    c.fillStyle = INK; c.fillRect(-3, -5.5, 3, 15); c.fillRect(4, -5, 3, 14); circ(c, -8, 0, 1.3); c.fill();
  } else if (w === 'STAR') {
    c.fillStyle = '#ffd23f'; starPath(c, 0, 0, 14, 6, t * 0.3); c.fill(); c.stroke(); face21(c, 0, 1, 0.55, 1, t);
  }
  c.restore();
}
function drawWordBoard(c, w, t) {
  const x = w.bx, gy = w.gy, n = w.w.length, bw = Math.max(70, 22 + n * 18), bh = 62, top = gy - 28 - bh;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#a8683a'; c.fillRect(x - bw / 2 + 6, top + bh, 5, gy - top - bh); c.strokeRect(x - bw / 2 + 6, top + bh, 5, gy - top - bh); c.fillRect(x + bw / 2 - 11, top + bh, 5, gy - top - bh); c.strokeRect(x + bw / 2 - 11, top + bh, 5, gy - top - bh);
  c.fillStyle = w.done ? '#e8ffe0' : '#fffaf0'; rr(c, x - bw / 2, top, bw, bh, 7); c.fill(); c.stroke();
  drawWordPic(c, w.w, x, top + 20, t);
  for (let i = 0; i < n; i++) {
    const sx = x - (n - 1) * 9 + i * 18, sy = top + 50, got = i < w.got, now = i === w.got && !w.done;
    c.fillStyle = got ? '#4cb6ff' : now ? 'rgba(255,210,63,' + (0.45 + 0.35 * Math.sin(t * 6)) + ')' : '#ece4f4'; rr(c, sx - 8, sy - 8, 16, 16, 3); c.fill(); c.lineWidth = 1; c.stroke();
    txt24(c, w.w[i], sx, sy + 1, 12, got ? '#ffffff' : 'rgba(59,31,79,.35)');
  }
  c.restore();
}
function drawLetterBubble(c, ch, x, y, t, need, wob, decoy) {
  const bob = Math.sin(t * 3 + x * 0.05) * 2, dx = wob > 0 ? Math.sin(wob * 40) * 3 : 0;
  c.save(); c.translate(x + dx, y + bob); c.lineJoin = 'round';
  if (need) { c.globalAlpha = 0.35 + 0.25 * Math.sin(t * 6); c.fillStyle = '#ffd23f'; circ(c, 0, 0, 15); c.fill(); c.globalAlpha = 1; }
  c.fillStyle = wob > 0 ? '#ffb0b0' : decoy ? '#e8ddff' : '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.4; circ(c, 0, 0, 11); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.8)'; circ(c, -4, -5, 2.4); c.fill();
  txt24(c, ch, 0, 1, 14, decoy ? '#8a6ac8' : '#ff4f9a', '#ffffff', 2.5);
  c.restore();
}

/* ===== Фарби ===== */
function drawPaintPot(c, p, t) {
  const x = p.x, gy = p.gy, j = p.joy > 0 ? Math.sin(p.joy * 20) * 2 : 0, col = COLORS25[p.c];
  c.save(); c.translate(x, gy - j); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#e8eef4'; c.beginPath(); c.moveTo(-10, -18); c.lineTo(10, -18); c.lineTo(8, 0); c.lineTo(-8, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = col; c.beginPath(); c.moveTo(-10, -18); c.lineTo(10, -18); c.lineTo(9.6, -14); c.quadraticCurveTo(5, -10, 3, -13); c.quadraticCurveTo(1, -5, -1, -13); c.quadraticCurveTo(-6, -11, -9.6, -14); c.closePath(); c.fill(); c.stroke();
  ell(c, 0, -18, 10, 3); c.fill(); c.stroke();
  c.fillStyle = col; rr(c, -5, -9, 10, 6, 2); c.fill(); c.lineWidth = 0.8; c.stroke();
  c.strokeStyle = '#8a8a9a'; c.lineWidth = 1.2; c.beginPath(); c.arc(0, -16, 12, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
  // пензлик
  c.save(); c.translate(6, -20); c.rotate(0.5 + Math.sin(t * 2 + x) * 0.1); c.fillStyle = '#c08a4a'; c.fillRect(-1.2, -14, 2.4, 10); c.strokeStyle = INK; c.lineWidth = 0.8; c.strokeRect(-1.2, -14, 2.4, 10); c.fillStyle = col; rr(c, -2, -5, 4, 6, 2); c.fill(); c.stroke(); c.restore();
  c.restore();
}
function drawWorld24(c, t, vis) {
  if (G.quizzes) for (const q of G.quizzes) {
    if (vis(q.opts[1].tx * T + 12, 200)) { drawQuizBoard(c, q, t); for (const o of q.opts) drawAnswerCard(c, q, o, t); }
    if (vis(q.door * T + 12)) drawDoorCol(c, q.door, q.top, 'quiz', '#7a8aff', t);
  }
  if (G.words25) for (const w of G.words25) {
    if (vis(w.bx, 120)) drawWordBoard(c, w, t);
    if (!w.done) {
      const need = w.letters[w.got];
      for (const l of w.letters) if (!l.taken && vis(l.x)) drawLetterBubble(c, l.ch, l.x, l.y, t, l === need, l.wob, false);
      for (const d of w.decoys) if (vis(d.x)) drawLetterBubble(c, d.ch, d.x, d.y, t, false, d.wob, true);
    }
    if (vis(w.door * T + 12)) drawDoorCol(c, w.door, w.top, 'word', '#ff8ac0', t);
  }
  if (G.pots) for (const p of G.pots) if (vis(p.x)) drawPaintPot(c, p, t);
  if (G.cgates) for (const g of G.cgates) if (vis(g.x * T + 12)) drawDoorCol(c, g.x, g.top, 'paint', COLORS25[g.c], t);
  const B = G.boss;
  if (B && B.kind === 'blot' && G.arena) for (let k = 0; k < 5; k++) { const x = G.arena.x0 + (5 + k * 8) * T; if (vis(x)) { c.save(); c.fillStyle = 'rgba(40,40,110,.25)'; ell(c, x, 10 * T - 1, 14 + (k % 2) * 6, 3); c.fill(); c.restore(); } }
  drawWorld25(c, t, vis);
}

/* ===== Фарба на гриві ===== */
function drawOver24(c, P, t) {
  drawOver25(c, P, t);
  if (!P.mixC || !P.mixC.length) return;
  const s = P.big ? 1.3 : P.mini ? 0.6 : 1, cx = P.x + P.w / 2, mix = mixName(P.mixC), col = COLORS25[mix];
  c.save(); c.translate(cx, (P.flip ? P.y + P.h + 42 : P.y - 40) + Math.sin(t * 4) * 1.5); c.scale(1.2, 1.2); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  // крапля фарби над головою
  c.fillStyle = col; c.beginPath(); c.moveTo(0, -9); c.quadraticCurveTo(7, -1, 6, 3); c.arc(0, 3, 6, 0, Math.PI); c.quadraticCurveTo(-7, -1, 0, -9); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.7)'; circ(c, -2, 1, 1.6); c.fill();
  if (P.mixC.length === 2) { for (const [i, k] of [[-1, 0], [1, 1]]) { c.fillStyle = COLORS25[P.mixC[k]]; circ(c, i * 10, 4, 3); c.fill(); c.lineWidth = 0.8; c.stroke(); } }
  c.restore();
  // плямки на боці
  c.save(); c.fillStyle = col; c.globalAlpha = 0.85; circ(c, cx - P.dir * 4 * s, P.y + 16 * s, 3.5 * s); c.fill(); circ(c, cx + P.dir * 2 * s, P.y + 20 * s, 2.2 * s); c.fill(); c.restore();
}

/* ===== Клякса Бризка ===== */
function drawBlotBoss(c, B, t) {
  const x = B.x, y = B.y, fl = B.flash > 0, dry = B.state === 'rest' && !B.dead, run = B.state === 'dash' && !B.dead;
  c.save(); c.translate(x, y + 4); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.6;
  if (B.dir > 0) c.scale(-1, 1);
  const body = fl ? '#ffffff' : B.dead ? '#ff9fd0' : dry ? '#8a8ac0' : '#2a2a7a', sq = run ? 1 + Math.sin(t * 22) * 0.08 : 1;
  c.scale(1 / sq, sq);
  // клякса з бризками
  c.fillStyle = body; c.beginPath();
  for (let i = 0; i <= 24; i++) {
    const a = i * TAU / 24, w = dry ? 0 : Math.sin(t * 6 + i * 1.7) * 2, r = (i % 3 === 0 ? 31 : 26) + w;
    const px = Math.cos(a) * r, py = Math.sin(a) * r * 0.82;
    if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
  }
  c.closePath(); c.fill(); c.stroke();
  if (B.dead) { for (let i = 0; i < 6; i++) { c.fillStyle = RAINBOW[i]; circ(c, Math.cos(i + t) * 14, Math.sin(i * 2 + t) * 9, 4.5); c.fill(); } }
  if (dry) { c.strokeStyle = 'rgba(40,30,80,.55)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-14, -10); c.lineTo(-6, -2); c.lineTo(-10, 8); c.moveTo(10, -14); c.lineTo(6, -4); c.lineTo(14, 4); c.stroke(); }
  // бризки-краплі навколо
  if (!dry && !B.dead) { c.fillStyle = body; for (let i = 0; i < 4; i++) { const a = t * 2 + i * 1.6; circ(c, Math.cos(a) * 38, Math.sin(a) * 26 - 4, 3 + (i % 2)); c.fill(); } }
  // блиск
  c.fillStyle = 'rgba(255,255,255,.35)'; ell(c, -10, -12, 7, 4, -0.5); c.fill();
  // обличчя
  c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.3;
  for (const ex of [-9, 7]) { ell(c, ex, -4, 6.5, dry ? 2.5 : 7.5); c.fill(); c.stroke(); }
  if (!dry) { c.fillStyle = INK; const lx = Math.sin(t * 2) * 1.5; circ(c, -9 - 2 + lx, -3, 3); c.fill(); circ(c, 7 - 2 + lx, -3, 3); c.fill(); c.fillStyle = '#fff'; circ(c, -11 + lx, -5, 1.1); c.fill(); circ(c, 5 + lx, -5, 1.1); c.fill(); }
  c.strokeStyle = B.dead || dry ? INK : '#ffffff'; c.lineWidth = 1.6; c.beginPath();
  if (B.dead) c.arc(-1, 8, 6, 0.1 * Math.PI, 0.9 * Math.PI); else if (dry) { c.moveTo(-6, 11); c.lineTo(4, 11); } else { c.moveTo(-8, 11); c.quadraticCurveTo(-1, 6, 6, 11); }
  c.stroke();
  if (B.dead) { c.fillStyle = 'rgba(255,120,170,.6)'; circ(c, -17, 4, 3); c.fill(); circ(c, 15, 4, 3); c.fill(); }
  c.restore();
}
function drawInkBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2); c.strokeStyle = '#ffffff'; c.lineWidth = 1.2; c.fillStyle = '#2a2a7a';
  c.beginPath(); c.moveTo(0, 9); c.quadraticCurveTo(7, 0, 6, -3); c.arc(0, -3, 6, 0, Math.PI, true); c.quadraticCurveTo(-7, 0, 0, 9); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.6)'; circ(c, -2, -4, 1.6); c.fill();
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock24(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'numblock') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#ffcf5a'; c.fill(); c.stroke(); c.fillStyle = '#ff7a9a'; for (const [a, d] of [[7, 7], [17, 7], [12, 12], [7, 17], [17, 17]]) { circ(c, a, d, 1.8); c.fill(); } }
  else if (b === 'abcblock') { rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#9fd0ff'; c.fill(); c.stroke(); c.fillStyle = '#ffffff'; rr(c, 5, 5, T - 10, T - 10, 3); c.fill(); txt24(c, 'A', 12, 13, 11, '#ff4f9a'); }
  else if (b === 'paintblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#f4ead8'; c.fill(); c.stroke(); c.fillStyle = '#ff4d4d'; circ(c, 7, 8, 3.2); c.fill(); c.fillStyle = '#ffd23f'; circ(c, 16, 9, 3.6); c.fill(); c.fillStyle = '#3f8fff'; circ(c, 11, 17, 3.4); c.fill(); }
  else if (b === 'deskblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#c99a6a'; c.fill(); c.stroke(); c.fillStyle = '#e8c090'; c.fillRect(1.5, 1.5, T - 3, 5); c.fillStyle = '#2f5a4a'; rr(c, 5, 9, 14, 10, 1.5); c.fill(); c.fillStyle = '#ffffff'; c.fillRect(7, 12, 6, 1.2); c.fillRect(7, 15, 9, 1.2); }
  else if (b === 'inkblock') { rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#f2eefc'; c.fill(); c.stroke(); c.strokeStyle = '#b8c8ff'; c.lineWidth = 1; for (const yy of [8, 14, 20]) { c.beginPath(); c.moveTo(3, yy); c.lineTo(T - 3, yy); c.stroke(); } c.fillStyle = '#2a2a7a'; circ(c, 15, 9, 3.4); c.fill(); circ(c, 19, 13, 1.4); c.fill(); }
  else return drawBlock25(c, b);
  return true;
}

/* ===== Декор ===== */
function drawDecor24(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'abacusS':
      c.fillStyle = '#a8683a'; c.fillRect(x - 9, y - 18, 2, 18); c.fillRect(x + 7, y - 18, 2, 18); c.fillRect(x - 9, y - 19, 18, 2);
      for (let r = 0; r < 3; r++) { c.strokeStyle = '#8a6a4a'; c.beginPath(); c.moveTo(x - 7, y - 14 + r * 5); c.lineTo(x + 7, y - 14 + r * 5); c.stroke(); for (let k = 0; k < 3; k++) { c.fillStyle = RAINBOW[(r * 2 + k) % 6]; circ(c, x - 5 + k * 3 + r, y - 14 + r * 5, 1.6); c.fill(); } }
      break;
    case 'bookS': for (let i = 0; i < 3; i++) { c.fillStyle = ['#ff7a9a', '#4cb6ff', '#7fd46a'][(i + Math.floor(x)) % 3]; rr(c, x - 8 + i, y - 5 - i * 5, 16 - i * 2, 5, 1); c.fill(); c.stroke(); c.fillStyle = '#fffaf0'; c.fillRect(x + 6 - i, y - 4 - i * 5, 1.5, 3); } break;
    case 'paintS': c.fillStyle = d.c || '#ff4d4d'; ell(c, x, y - 1.5, 7, 2.4); c.fill(); circ(c, x + 8, y - 2, 1.4); c.fill(); circ(c, x - 9, y - 1, 1); c.fill(); break;
    case 'abcS': c.fillStyle = d.c || '#9fd0ff'; rr(c, x - 6, y - 12, 12, 12, 2); c.fill(); c.stroke(); txt24(c, d.ch || 'A', x, y - 5.5, 9, '#ffffff', INK, 2); break;
    case 'inkS': c.fillStyle = '#2a2a7a'; rr(c, x - 5, y - 10, 10, 10, 2); c.fill(); c.stroke(); c.fillStyle = '#5a5aaa'; c.fillRect(x - 3, y - 13, 6, 3); c.save(); c.translate(x + 2, y - 12); c.rotate(0.4); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(5, -10, 2, -18); c.quadraticCurveTo(-2, -10, 0, 0); c.fill(); c.stroke(); c.restore(); break;
    default: drawDecor25(c, d, t); break;
  }
}

/* ===== Фони ===== */
function bgNumberland(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  for (let i = 0; i < 9; i++) { const x = wrapX(i * 97 + 40 - camX * 0.18, viewW + 100) - 50, y = 80 + ((i * 37) % 70) + Math.sin(t * 1.2 + i) * 6; c.save(); c.globalAlpha = 0.35; txt24(c, String(i + 1), x, y, 26, RAINBOW[i % 6]); c.restore(); }
  hill(c, viewW, 200, 10, 0.012, 0.4, camX * 0.12, '#cfe8b8');
  hill(c, viewW, 218, 6, 0.03, 1.2, camX * 0.45, '#a8dc90');
}
function bgAbcmeadow(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const AB = 'ABCDEFGHIJ';
  for (let i = 0; i < 10; i++) { const x = wrapX(i * 89 + 20 - camX * 0.2, viewW + 100) - 50, y = 70 + ((i * 41) % 80) + Math.sin(t * 1.4 + i) * 5; c.save(); c.globalAlpha = 0.3; txt24(c, AB[i], x, y, 24, RAINBOW[(i + 2) % 6]); c.restore(); }
  hill(c, viewW, 196, 10, 0.012, 0.4, camX * 0.12, '#e4c8f0');
  hill(c, viewW, 218, 6, 0.03, 1.2, camX * 0.45, '#b4e8a0');
}
function bgColorlab(c, viewW, camX, t) {
  c.save(); c.globalAlpha = 0.28; c.lineWidth = 14; c.lineCap = 'round';
  for (let i = 0; i < 6; i++) { c.strokeStyle = RAINBOW[i]; c.beginPath(); c.arc(wrapX(viewW * 0.5 - camX * 0.05, viewW + 400) - 200, 260, 190 - i * 14, Math.PI, TAU); c.stroke(); }
  c.restore();
  const span = 150;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 40, k = ((i % 3) + 3) % 3;
    c.strokeStyle = '#a8683a'; c.lineWidth = 3; c.beginPath(); c.moveTo(wx - 18, 222); c.lineTo(wx, 140); c.lineTo(wx + 18, 222); c.stroke();
    c.fillStyle = '#ffffff'; c.fillRect(wx - 22, 146, 44, 34); c.strokeStyle = '#d8c0a0'; c.lineWidth = 1.5; c.strokeRect(wx - 22, 146, 44, 34);
    c.fillStyle = ['#ff9a2a', '#4cc35a', '#a05ad8'][k]; circ(c, wx - 6, 160, 8); c.fill(); c.fillStyle = ['#ffd23f', '#3f8fff', '#ff4d4d'][k]; circ(c, wx + 7, 166, 7); c.fill();
  }
  hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#ead8bc');
}
function bgSmartschool(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  const sx = wrapX(260 - camX * 0.2, viewW + 360) - 180;
  c.fillStyle = '#f0c8a0'; c.fillRect(sx, 110, 200, 112); c.fillStyle = '#d06a5a'; c.beginPath(); c.moveTo(sx - 10, 112); c.lineTo(sx + 100, 70); c.lineTo(sx + 210, 112); c.closePath(); c.fill();
  c.fillStyle = '#ffffff'; circ(c, sx + 100, 96, 10); c.fill(); c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(sx + 100, 96); c.lineTo(sx + 100, 89); c.moveTo(sx + 100, 96); c.lineTo(sx + 105, 98); c.stroke();
  for (let a = 0; a < 4; a++) { c.fillStyle = '#9fd8ff'; c.fillRect(sx + 14 + a * 48, 128, 30, 26); c.fillStyle = '#2f5a4a'; c.fillRect(sx + 14 + a * 48, 170, 30, 22); }
  c.fillStyle = '#a8683a'; c.fillRect(sx + 86, 180, 28, 42);
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#a8dc90');
}
function bgInkwell(c, viewW, camX, t) {
  c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 1; for (let y = 30; y < 222; y += 22) { c.beginPath(); c.moveTo(0, y); c.lineTo(viewW, y); c.stroke(); }
  c.strokeStyle = 'rgba(255,120,150,.15)'; c.beginPath(); c.moveTo(60, 0); c.lineTo(60, 222); c.stroke();
  for (let i = 0; i < 8; i++) { const x = wrapX(i * 113 + 30 - camX * 0.15, viewW + 120) - 60, y = ((t * 40 + i * 53) % 260) - 30; c.fillStyle = 'rgba(20,20,70,.45)'; c.beginPath(); c.moveTo(x, y - 6); c.quadraticCurveTo(x + 5, y, x + 4, y + 2); c.arc(x, y + 2, 4, 0, Math.PI); c.quadraticCurveTo(x - 5, y, x, y - 6); c.fill(); }
  const span = 170; for (let i = -1; i < viewW / span + 2; i++) { const wx = i * span + wrapX(-camX * 0.3, span) + 50; c.fillStyle = 'rgba(20,20,60,.4)'; rr(c, wx - 16, 176, 32, 46, 6); c.fill(); c.fillRect(wx - 8, 168, 16, 10); }
  hill(c, viewW, 222, 3, 0.03, 1.2, camX * 0.45, '#3a3a72');
}
Object.assign(BG2, { numberland: bgNumberland, abcmeadow: bgAbcmeadow, colorlab: bgColorlab, smartschool: bgSmartschool, inkwell: bgInkwell });
