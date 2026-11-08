'use strict';
/* ===== Частина 22: Шкільне подвір'я, Феєрверкове свято, Скеледром, Святкова площа, Совиний гай ===== */
Object.assign(THEMES, {
  schoolyard: { sky: ['#9fd8ff', '#cdeeff', '#f4fbff'], panel: '#24405a', top: '#ff8a5c', topHi: '#ffb894', topLo: '#d8643a', fill: '#c9a07a', fillLo: '#a8805c', dots: ['#e0bf9a', '#8a6646', '#ffffff'], block: 'schoolblock', ice: false, topStyle: 'plank', dotShape: 'pebble' },
  fireworks: { sky: ['#1b1f4a', '#3a2f6e', '#6a4a8e'], panel: '#140f30', top: '#7fd46a', topHi: '#b4f08e', topLo: '#4f9f4a', fill: '#4a3a6a', fillLo: '#382a54', dots: ['#6a5a8e', '#2a1f44', '#ffd23f'], block: 'fireblock', ice: false, topStyle: 'grass', dotShape: 'dot' },
  climbwall: { sky: ['#ffd9a8', '#ffeccf', '#fff8ec'], panel: '#4a2a14', top: '#5cc8ff', topHi: '#a8e4ff', topLo: '#2f9ad8', fill: '#d9c4a8', fillLo: '#bfa888', dots: ['#ff7ab8', '#ffd23f', '#7fd46a'], block: 'climbblock', ice: false, topStyle: 'plank', dotShape: 'dot' },
  festsquare: { sky: ['#ffb3d9', '#ffd9ec', '#fff4fa'], panel: '#5a1a3a', top: '#ffd23f', topHi: '#fff0a0', topLo: '#e0a820', fill: '#e8b88a', fillLo: '#cc9a6a', dots: ['#ff7ab8', '#4cb6ff', '#ffffff'], block: 'festblock', ice: false, topStyle: 'stone', dotShape: 'dot' },
  owlwood: { sky: ['#8fb8a0', '#c0dcc4', '#eef6e8'], panel: '#1f3a2a', top: '#6fbf5a', topHi: '#a8e08a', topLo: '#4a8f3a', fill: '#7a5a3e', fillLo: '#5e442e', dots: ['#9a7656', '#4a3424', '#c9a882'], block: 'owlblock', ice: false, topStyle: 'leaves', dotShape: 'pebble' },
});

/* ===== Скакалка: два зайчики крутять її, а внизу вона зачіпає ===== */
function drawBunnyHolder(c, x, gy, dir, t, hy) {
  c.save(); c.translate(x, gy); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  c.fillStyle = '#ffffff';
  ell(c, 0, -12, 9, 12); c.fill(); c.stroke();               // тулуб
  circ(c, 0, -30, 9); c.fill(); c.stroke();                  // голова
  for (const s of [-1, 1]) { c.save(); c.translate(s * 4, -38); c.rotate(s * 0.15); ell(c, 0, -8, 3, 9); c.fill(); c.stroke(); c.fillStyle = '#ffc4dc'; ell(c, 0, -8, 1.4, 6); c.fill(); c.restore(); c.fillStyle = '#ffffff'; }
  c.fillStyle = INK; circ(c, dir * 3, -31, 1.3); c.fill(); circ(c, dir * 7, -31, 1.1); c.fill();
  c.fillStyle = '#ff9fc4'; circ(c, dir * 6, -27.5, 1.6); c.fill();
  // рука з ручкою скакалки крутиться
  const hx = dir * 10 + Math.sin(t) * 3, hh = hy - gy;
  c.beginPath(); c.moveTo(dir * 5, -16); c.lineTo(hx, hh); c.stroke();
  c.fillStyle = '#ff5c7a'; rr(c, hx - 2.5, hh - 4, 5, 8, 2); c.fill(); c.stroke();
  c.restore();
}
function drawRope(c, r, t) {
  const th = ropePhase(r), x0 = r.x0, x1 = r.x1, hy = r.gy - 30, R = 32, cs = Math.cos(th), sn = Math.sin(th);
  const midY = hy + R * cs * 1.0, back = sn < 0;
  const draw = () => {
    c.save(); c.strokeStyle = back ? 'rgba(255,92,122,.45)' : '#ff5c7a'; c.lineWidth = back ? 2 : 3; c.lineCap = 'round';
    c.beginPath(); c.moveTo(x0 + 2, hy); c.quadraticCurveTo((x0 + x1) / 2, hy + (midY - hy) * 2, x1 - 2, hy); c.stroke(); c.restore();
  };
  if (back) draw();
  drawBunnyHolder(c, x0 - 4, r.gy, 1, th, hy);
  drawBunnyHolder(c, x1 + 4, r.gy, -1, th, hy);
  if (!back) draw();
  // підказка на землі: смужка світиться, коли скакалка внизу
  if (cs > 0.6) { c.save(); c.globalAlpha = (cs - 0.6) * 1.5; c.fillStyle = '#ff5c7a'; rr(c, x0 + 6, r.gy - 3, x1 - x0 - 12, 3, 1.5); c.fill(); c.restore(); }
  if (r.combo > 0) { c.save(); c.font = '900 13px Nunito, sans-serif'; c.textAlign = 'center'; c.fillStyle = '#ff4fa3'; c.strokeStyle = '#fff'; c.lineWidth = 3; const s = '★ ' + r.combo; c.strokeText(s, (x0 + x1) / 2, r.gy - 72); c.fillText(s, (x0 + x1) / 2, r.gy - 72); c.restore(); }
}

/* ===== Ракета-феєрверк ===== */
function drawRocketShape(c, x, y, t, flame) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  if (flame) { const f = 10 + Math.sin(t * 40) * 4; c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(-5, 0); c.quadraticCurveTo(0, f + 8, 5, 0); c.closePath(); c.fill(); c.fillStyle = '#ff7a3d'; c.beginPath(); c.moveTo(-3, 0); c.quadraticCurveTo(0, f, 3, 0); c.closePath(); c.fill(); }
  c.fillStyle = '#4cb6ff'; c.beginPath(); c.moveTo(-6, -4); c.lineTo(-11, 2); c.lineTo(-6, 0); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(6, -4); c.lineTo(11, 2); c.lineTo(6, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ff5c7a'; rr(c, -6, -26, 12, 26, 3); c.fill(); c.stroke();
  c.fillStyle = '#ffffff'; c.fillRect(-6, -17, 12, 4); c.fillStyle = '#ffd23f'; c.fillRect(-6, -10, 12, 3);
  c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(-6, -26); c.quadraticCurveTo(0, -38, 6, -26); c.closePath(); c.fill(); c.stroke();
  c.restore();
}
function drawRocket(c, r, t) {
  if (r.state === 'gone') { if (r.t < 1.2) { c.save(); c.globalAlpha = 1 - r.t / 1.2; for (let i = 0; i < 12; i++) { const a = i * TAU / 12, d = 20 + r.t * 60; sparkle(c, r.x + Math.cos(a) * d, r.by + Math.sin(a) * d + r.t * 20, 2.2, RAINBOW[i % 6]); } c.restore(); } return; }
  // підставка
  c.save(); c.strokeStyle = INK; c.lineWidth = 1.2; c.fillStyle = '#8a6a9e'; rr(c, r.x - 10, r.gy - 5, 20, 5, 2); c.fill(); c.stroke(); c.restore();
  if (r.state === 'fly') { drawRocketShape(c, r.x, r.gy - 5 + r.ry, t, true); return; }
  drawRocketShape(c, r.x, r.gy - 5, t, false);
  if (r.state === 'fuse') { for (let i = 0; i < 3; i++) sparkle(c, r.x + Math.sin(t * 30 + i) * 6, r.gy - 2 + Math.cos(t * 25 + i) * 3, 1.6, i % 2 ? '#ffd23f' : '#ffffff'); }
  else if (Math.abs(G.P.x + G.P.w / 2 - r.x) < 40 && G.P.onGround) { c.save(); c.globalAlpha = 0.6 + 0.4 * Math.sin(t * 6); c.font = '900 11px Nunito, sans-serif'; c.textAlign = 'center'; c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 2.5; c.strokeText('Ріг!', r.x, r.gy - 48); c.fillText('Ріг!', r.x, r.gy - 48); c.restore(); }
}
function drawWorld22(c, t, vis) {
  if (G.ropes) for (const r of G.ropes) if (vis((r.x0 + r.x1) / 2, r.x1 - r.x0 + 40)) drawRope(c, r, t);
  if (G.rockets) for (const r of G.rockets) if (vis(r.x)) drawRocket(c, r, t);
  const B = G.boss;
  if (B && B.kind === 'owl') { if (vis(B.stumpX)) drawStump22(c, B.stumpX, B.gy); if (B.state === 'dive' || B.state === 'windup') { c.save(); c.fillStyle = 'rgba(31,58,42,.25)'; ell(c, B.tx, B.gy - 2, 24, 5); c.fill(); c.restore(); } }
  drawWorld23(c, t, vis);
}
function drawStump22(c, x, gy) {
  c.save(); c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = '#9a6a3e'; rr(c, x - 20, gy - 10, 40, 10, 3); c.fill(); c.stroke();
  c.fillStyle = '#d9b07a'; ell(c, x, gy - 10, 20, 4); c.fill(); c.stroke(); c.strokeStyle = 'rgba(122,84,46,.6)'; c.lineWidth = 1; c.beginPath(); c.ellipse(x, gy - 10, 10, 2, 0, 0, TAU); c.stroke(); c.restore();
}

/* ===== Чарівні рукавички ===== */
function drawGlove(c, x, y, s, t) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = '#b98cff'; rr(c, -5, -3, 10, 9, 3); c.fill(); c.stroke();
  ell(c, -6, 0, 2.6, 3.6, -0.4); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; rr(c, -5.5, 4, 11, 3, 1.5); c.fill(); c.stroke();
  sparkle(c, 3, -5 + Math.sin(t * 5) * 1, 1.4, '#ffffff');
  c.restore();
}
function drawOver22(c, P, t) {
  if (P.gloveT > 0) {
    const s = P.big ? 1.3 : P.mini ? 0.6 : 0.9;
    drawGlove(c, P.x + P.w / 2 + P.dir * P.w * 0.45, P.y + P.h - 6, s, t);
    if (P.climbing) for (let i = 0; i < 3; i++) sparkle(c, P.x + (P.dir > 0 ? P.w : 0) + Math.sin(t * 9 + i) * 2, P.y + 6 + i * 9, 1.3, i % 2 ? '#ffd23f' : '#b98cff');
  }
  drawOver23(c, P, t);
}
function drawPowerIcon22(c, kind, t) {
  if (kind === 'gloves') { drawGlove(c, 0, 1, 1.1, t); return true; }
  return drawPowerIcon23(c, kind, t);
}

/* ===== Сова Ухнюшка ===== */
function drawOwlBoss(c, B, t) {
  const x = B.x, y = B.y, fl = B.flash > 0, sleep = B.state === 'sleep' && !B.dead;
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round'; c.translate(x, y);
  const flying = !sleep && !B.dead && B.state !== 'wait', flap = flying ? Math.sin(t * (B.state === 'dive' ? 6 : 14)) : 0;
  if (B.dir > 0) c.scale(-1, 1);
  // крила
  c.strokeStyle = INK; c.lineWidth = 1.6; c.fillStyle = fl ? '#ffffff' : '#9a6a3e';
  for (const s of [-1, 1]) { c.save(); c.translate(s * 20, -2); c.rotate(s * (0.3 + flap * 0.7)); c.beginPath(); c.ellipse(s * 10, 4, 15, 9, s * 0.4, 0, TAU); c.fill(); c.stroke(); c.restore(); }
  // тулуб
  const g = c.createLinearGradient(0, -30, 0, 28); g.addColorStop(0, fl ? '#ffffff' : '#c08a56'); g.addColorStop(1, fl ? '#ffffff' : '#9a6a3e');
  c.fillStyle = g; ell(c, 0, 0, 24, 28); c.fill(); c.stroke();
  c.fillStyle = fl ? '#fff' : '#f2dcb8'; ell(c, 0, 8, 15, 17); c.fill();
  c.strokeStyle = 'rgba(154,106,62,.6)'; c.lineWidth = 1.2; for (let i = 0; i < 3; i++) for (let j = -1; j <= 1; j++) { c.beginPath(); c.arc(j * 7, 4 + i * 7, 3, 0.2 * Math.PI, 0.8 * Math.PI); c.stroke(); }
  // вушка-пір'їнки
  c.strokeStyle = INK; c.lineWidth = 1.4; c.fillStyle = fl ? '#fff' : '#9a6a3e';
  for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 10, -22); c.lineTo(s * 18, -36); c.lineTo(s * 19, -20); c.closePath(); c.fill(); c.stroke(); }
  // нічний ковпак — вона ж хоче спати
  c.fillStyle = '#4cb6ff'; c.beginPath(); c.moveTo(-12, -24); c.quadraticCurveTo(4, -48, 26, -40); c.lineTo(12, -24); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; for (let i = 0; i < 3; i++) { starPath(c, -4 + i * 7, -30 - i * 3, 2, 0.9, 0); c.fill(); }
  c.fillStyle = '#ffffff'; circ(c, 27, -40, 4); c.fill(); c.stroke();
  // очі
  for (const s of [-1, 1]) {
    c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.5; circ(c, s * 9, -12, 8); c.fill(); c.stroke();
    if (sleep || B.state === 'wait') { c.beginPath(); c.arc(s * 9, -13, 5, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }
    else if (B.dead) { c.lineWidth = 2; c.beginPath(); c.arc(s * 9, -10, 4.5, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke(); }
    else { c.fillStyle = '#ffb000'; circ(c, s * 9, -12, 5); c.fill(); c.fillStyle = INK; circ(c, s * 9 - 1, -12, 2.6); c.fill(); c.fillStyle = '#fff'; circ(c, s * 9 - 2.2, -13.8, 1.1); c.fill();
      // сердиті брови
      c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(s * 2, -20); c.lineTo(s * 15, -22); c.stroke(); }
  }
  // дзьоб
  c.fillStyle = '#ffb000'; c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-4, -6); c.lineTo(4, -6); c.lineTo(0, 2); c.closePath(); c.fill(); c.stroke();
  if (B.state === 'hoot' && !B.dead && B.st % 0.7 < 0.3) { c.fillStyle = INK; ell(c, 0, -1, 2.4, 2); c.fill(); }
  // лапки
  c.strokeStyle = '#e09a20'; c.lineWidth = 2.2; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 7, 26); c.lineTo(s * 7, 30); c.moveTo(s * 7, 30); c.lineTo(s * 11, 32); c.moveTo(s * 7, 30); c.lineTo(s * 3, 32); c.stroke(); }
  if (B.dead) { c.fillStyle = 'rgba(255,120,170,.6)'; circ(c, -16, -4, 4); c.fill(); circ(c, 16, -4, 4); c.fill(); }
  c.restore();
  if (sleep) { c.save(); c.font = '900 14px Nunito, sans-serif'; c.fillStyle = '#4cb6ff'; c.strokeStyle = '#fff'; c.lineWidth = 3; for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; c.globalAlpha = 1 - k; const zx = x + 18 + k * 20, zy = y - 30 - k * 30; c.strokeText('з', zx, zy); c.fillText('з', zx, zy); } c.restore(); }
  if (B.dead) for (let i = 0; i < 6; i++) { const a = t * 1.5 + i * TAU / 6; sparkle(c, x + Math.cos(a) * 44, y + Math.sin(a) * 30, 2.2, RAINBOW[i]); }
}
function drawHootBolt(c, b) {
  c.save(); c.translate(b.x, b.y); c.strokeStyle = 'rgba(76,182,255,.9)'; c.lineWidth = 2.2; c.lineCap = 'round';
  const k = 1 + Math.sin(b.t * 18) * 0.12;
  for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(0, 0, (4 + i * 4) * k, -0.9, 0.9); c.stroke(); c.beginPath(); c.arc(0, 0, (4 + i * 4) * k, Math.PI - 0.9, Math.PI + 0.9); c.stroke(); }
  c.font = '900 9px Nunito, sans-serif'; c.textAlign = 'center'; c.fillStyle = '#1f5fd0'; c.fillText('ух', 0, 3);
  c.restore();
}

/* ===== Блоки ===== */
function drawBlock22(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'schoolblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#e0704a'; c.fill(); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(1, 12); c.lineTo(T - 1, 12); c.moveTo(12, 1); c.lineTo(12, 12); c.moveTo(6, 12); c.lineTo(6, T - 1); c.moveTo(18, 12); c.lineTo(18, T - 1); c.stroke();
  } else if (b === 'fireblock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#5a4a8e'; c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; starPath(c, 8, 9, 3, 1.3, 0); c.fill(); c.fillStyle = '#ff7ab8'; starPath(c, 16, 16, 2.4, 1, 0); c.fill();
  } else if (b === 'climbblock') {
    rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#e8d6bc'; c.fill(); c.stroke();
    const cols = ['#ff5c7a', '#4cb6ff', '#ffd23f', '#7fd46a'];
    c.lineWidth = 1; c.fillStyle = cols[0]; ell(c, 7, 7, 3.4, 2.6, 0.4); c.fill(); c.stroke(); c.fillStyle = cols[1]; ell(c, 17, 11, 3, 2.4, -0.3); c.fill(); c.stroke(); c.fillStyle = cols[2]; ell(c, 9, 18, 2.8, 2.2, 0.2); c.fill(); c.stroke();
  } else if (b === 'festblock') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#ffffff'; c.fill(); c.stroke();
    c.save(); rr(c, 1.7, 1.7, T - 3.4, T - 3.4, 3.4); c.clip(); const cs = ['#ff7ab8', '#4cb6ff', '#ffd23f']; for (let i = 0; i < 4; i++) { c.fillStyle = cs[i % 3]; c.fillRect(i * 6, 0, 3, T); } c.restore();
    c.strokeStyle = INK; rr(c, 1, 1, T - 2, T - 2, 4); c.stroke();
  } else if (b === 'owlblock') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#8a6440'; c.fill(); c.stroke();
    c.strokeStyle = 'rgba(60,40,20,.5)'; c.lineWidth = 1; c.beginPath(); c.ellipse(12, 12, 6, 4, 0, 0, TAU); c.stroke(); c.beginPath(); c.ellipse(12, 12, 2.5, 1.6, 0, 0, TAU); c.stroke();
    c.fillStyle = '#6fbf5a'; ell(c, 6, 3, 4, 2); c.fill();
  } else return drawBlock23(c, b);
  return true;
}

/* ===== Декор ===== */
function drawDecor22(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'hopS': // класики на асфальті
      c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1.2; for (let i = 0; i < 3; i++) c.strokeRect(x - 12 + i * 8, y - 3, 8, 3);
      c.fillStyle = '#fff'; c.font = '700 5px Nunito, sans-serif'; c.fillText(String(d.n || 1), x - 10, y - 0.5);
      break;
    case 'ballS': c.fillStyle = d.c || '#ff5c7a'; circ(c, x, y - 5, 5); c.fill(); c.stroke(); c.strokeStyle = '#fff'; c.lineWidth = 1.2; c.beginPath(); c.arc(x, y - 5, 3, 0.5, 2.4); c.stroke(); break;
    case 'flagsS':
      c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x - 14, y - 26); c.quadraticCurveTo(x, y - 20, x + 14, y - 26); c.stroke();
      for (let i = 0; i < 4; i++) { c.fillStyle = RAINBOW[(i + (d.n || 0)) % 6]; const fx = x - 11 + i * 7, fy = y - 24 + Math.abs(i - 1.5) * -1.2; c.beginPath(); c.moveTo(fx - 3, fy); c.lineTo(fx + 3, fy); c.lineTo(fx, fy + 6); c.closePath(); c.fill(); }
      c.strokeStyle = '#8a6a4a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x - 14, y); c.lineTo(x - 14, y - 27); c.moveTo(x + 14, y); c.lineTo(x + 14, y - 27); c.stroke();
      break;
    case 'matS': c.fillStyle = d.c || '#4cb6ff'; rr(c, x - 10, y - 4, 20, 4, 1.5); c.fill(); c.stroke(); break;
    case 'mushS': c.fillStyle = '#f2e6d0'; rr(c, x - 1.6, y - 6, 3.2, 6, 1); c.fill(); c.stroke(); c.fillStyle = d.c || '#c0392b'; c.beginPath(); c.arc(x, y - 6, 5, Math.PI, TAU); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#fff'; circ(c, x - 2, y - 8, 0.9); c.fill(); circ(c, x + 2, y - 7.5, 0.8); c.fill(); break;
    default: drawDecor23(c, d, t); break;
    case 'lanternS': c.strokeStyle = INK; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 16); c.stroke(); c.fillStyle = d.c || '#ffd23f'; ell(c, x, y - 20, 4.5, 5.5); c.fill(); c.stroke(); c.save(); c.globalAlpha = 0.3 + 0.2 * Math.sin(t * 3 + x); c.fillStyle = d.c || '#ffd23f'; circ(c, x, y - 20, 10); c.fill(); c.restore(); break;
  }
}

/* ===== Фони ===== */
function bgSchoolyard(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 5, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  // школа на тлі
  const sx = wrapX(320 - camX * 0.15, viewW + 520) - 260;
  c.fillStyle = '#f2c48a'; c.fillRect(sx, 110, 260, 112); c.fillStyle = '#e08a5a'; c.beginPath(); c.moveTo(sx - 10, 110); c.lineTo(sx + 130, 70); c.lineTo(sx + 270, 110); c.closePath(); c.fill();
  c.fillStyle = '#fffbe6'; for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { rr(c, sx + 14 + i * 40, 124 + j * 40, 24, 24, 3); c.fill(); }
  c.fillStyle = '#8a5a3a'; rr(c, sx + 115, 182, 30, 40, 3); c.fill();
  c.fillStyle = '#ffd23f'; circ(c, sx + 130, 92, 9); c.fill(); c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath(); c.moveTo(sx + 130, 92); c.lineTo(sx + 130, 86); c.moveTo(sx + 130, 92); c.lineTo(sx + 135, 94); c.stroke();
  hill(c, viewW, 220, 4, 0.03, 1.2, camX * 0.45, '#b8e08a');
}
function bgFireworks(c, viewW, camX, t) {
  c.fillStyle = 'rgba(255,255,255,.8)'; for (let i = 0; i < 40; i++) { const x = wrapX(i * 71 - camX * 0.05, viewW + 20) - 10, y = (i * 37) % 170; circ(c, x, y, (i % 3) * 0.4 + 0.6); c.fill(); }
  for (let i = 0; i < 4; i++) {
    const per = 2.6 + i * 0.4, k = ((t + i * 0.9) % per) / per, x = wrapX(i * 210 + 80 - camX * 0.2, viewW + 200) - 100, y = 50 + (i % 3) * 30;
    if (k < 0.3) { c.fillStyle = 'rgba(255,240,200,.8)'; circ(c, x, 230 - (230 - y) * (k / 0.3), 1.6); c.fill(); }
    else { const p = (k - 0.3) / 0.7; c.save(); c.globalAlpha = 1 - p; for (let j = 0; j < 14; j++) { const a = j * TAU / 14; c.fillStyle = RAINBOW[(i + j) % 6]; circ(c, x + Math.cos(a) * p * 40, y + Math.sin(a) * p * 40 + p * p * 10, 2); c.fill(); } c.restore(); }
  }
  hill(c, viewW, 200, 10, 0.012, 0.4, camX * 0.12, '#2a2558');
  hill(c, viewW, 220, 6, 0.03, 1.2, camX * 0.45, '#3a6a4a');
}
function bgClimbwall(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.9)'); }
  const span = 120, cols = ['#ff5c7a', '#4cb6ff', '#ffd23f', '#7fd46a', '#b98cff'];
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span), h = 110 + (((i % 3) + 3) % 3) * 30;
    c.fillStyle = 'rgba(232,214,188,.9)'; c.fillRect(wx + 10, 222 - h, 90, h);
    for (let j = 0; j < 7; j++) { c.fillStyle = cols[(j + i * 2 + 10) % 5]; ell(c, wx + 22 + (j * 37) % 70, 222 - h + 14 + j * (h - 24) / 7, 4, 3, j); c.fill(); }
  }
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#9fd0ff');
}
function bgFestsquare(c, viewW, camX, t) {
  for (let i = 0; i < 4; i++) { const x = wrapX(i * 230 - camX * 0.08 + t * 4, viewW + 240) - 120; puffCloud(c, x, 30 + (i % 2) * 22, 0.85, 'rgba(255,255,255,.95)'); }
  // карусель і прапорці
  const cx = wrapX(280 - camX * 0.18, viewW + 300) - 150;
  c.fillStyle = '#ff7ab8'; c.beginPath(); c.moveTo(cx - 60, 140); c.lineTo(cx, 96); c.lineTo(cx + 60, 140); c.closePath(); c.fill();
  c.fillStyle = '#fff4fa'; c.fillRect(cx - 54, 140, 108, 10); c.fillStyle = '#e06aa8'; c.fillRect(cx - 3, 150, 6, 72);
  for (let i = 0; i < 4; i++) { const a = t * 0.8 + i * Math.PI / 2, hx = cx + Math.cos(a) * 46, hz = Math.sin(a); c.globalAlpha = hz > 0 ? 1 : 0.6; c.fillStyle = ['#ffffff', '#ffd23f', '#8fd0ff', '#b8e88a'][i]; ell(c, hx, 182 + Math.sin(t * 3 + i) * 4, 12, 8); c.fill(); c.globalAlpha = 1; }
  for (let i = -1; i < viewW / 90 + 2; i++) { const wx = i * 90 + wrapX(-camX * 0.3, 90); c.strokeStyle = 'rgba(90,26,58,.5)'; c.lineWidth = 1; c.beginPath(); c.moveTo(wx, 60); c.quadraticCurveTo(wx + 45, 74, wx + 90, 60); c.stroke(); for (let j = 0; j < 5; j++) { c.fillStyle = RAINBOW[(j + i * 3 + 30) % 6]; const fx = wx + 10 + j * 17, fy = 62 + Math.sin((j + 0.5) / 5 * Math.PI) * 10; c.beginPath(); c.moveTo(fx - 5, fy); c.lineTo(fx + 5, fy); c.lineTo(fx, fy + 9); c.closePath(); c.fill(); } }
  hill(c, viewW, 222, 4, 0.03, 1.2, camX * 0.45, '#ffe6a8');
}
function bgOwlwood(c, viewW, camX, t) {
  hill(c, viewW, 180, 12, 0.012, 0.4, camX * 0.1, '#a8c8b0');
  const span = 90;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.3, span) + 40, h = 120 + (((i % 3) + 3) % 3) * 20;
    c.fillStyle = '#7a5a3e'; c.fillRect(wx - 6, 222 - h + 40, 12, h - 40);
    c.fillStyle = '#5f9f62'; circ(c, wx, 222 - h + 30, 34); c.fill(); circ(c, wx - 22, 222 - h + 50, 22); c.fill(); circ(c, wx + 22, 222 - h + 48, 24); c.fill();
    if (i % 3 === 0) { c.fillStyle = '#3a2a1a'; ell(c, wx, 222 - h + 70, 5, 7); c.fill(); }
  }
  hill(c, viewW, 218, 6, 0.03, 1.2, camX * 0.45, '#8fd07a');
}
Object.assign(BG2, { schoolyard: bgSchoolyard, fireworks: bgFireworks, climbwall: bgClimbwall, festsquare: bgFestsquare, owlwood: bgOwlwood });
