'use strict';
/* ===== Частина 7: город, ліхтарики, веселкові мости, шахти, Король Кротів Копайло ===== */

function drawWorm(c, x, gy, dir, t, flash) {
  c.save(); c.translate(x, gy); c.scale(dir, 1); c.lineJoin = 'round';
  c.strokeStyle = INK; c.lineWidth = 1;
  const cols = flash ? ['#fff', '#fff', '#fff', '#fff'] : ['#9be36a', '#7fd46a', '#9be36a', '#7fd46a'];
  for (let i = 3; i >= 0; i--) {
    const sx = -11 + i * 6, lift = Math.max(0, Math.sin(t * 9 - i * 0.9)) * 3;
    c.fillStyle = cols[i]; circ(c, sx, -6 - lift, 5.4); c.fill(); c.stroke();
    if (i < 3) { c.fillStyle = 'rgba(255,255,255,.45)'; circ(c, sx - 1.5, -8 - lift, 1.4); c.fill(); }
  }
  const hl = Math.max(0, Math.sin(t * 9 - 3 * 0.9)) * 3;
  c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(8, -12 - hl); c.lineTo(10, -17 - hl); c.moveTo(11, -11 - hl); c.lineTo(14, -15 - hl); c.stroke();
  c.fillStyle = '#ff7ab8'; circ(c, 10, -17.5 - hl, 1.5); c.fill(); circ(c, 14.3, -15.5 - hl, 1.5); c.fill();
  c.fillStyle = '#fff'; circ(c, 9, -8 - hl, 1.9); c.fill(); c.fillStyle = INK; circ(c, 9.7, -8 - hl, 1); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.arc(9.5, -4.6 - hl, 1.6, 0.1 * Math.PI, 0.8 * Math.PI); c.stroke();
  c.restore();
}
function drawOwl(c, x, y, t, dir, flash, sitting) {
  c.save(); c.translate(x, y); c.scale(dir, 1); c.lineJoin = 'round';
  const f = sitting ? Math.sin(t * 2) * 0.15 : Math.sin(t * 14), body = flash ? '#fff' : '#9a7ad9', belly = flash ? '#fff' : '#e6dcff';
  c.strokeStyle = INK; c.lineWidth = 1;
  c.fillStyle = flash ? '#fff' : '#7a5ab9';
  if (sitting) { ell(c, -9, 2, 4, 8, 0.2); c.fill(); c.stroke(); ell(c, 9, 2, 4, 8, -0.2); c.fill(); c.stroke(); }
  else { ell(c, -11, -2 - f * 4, 9, 3.4, -0.5 - f * 0.4); c.fill(); c.stroke(); ell(c, 11, -2 - f * 4, 9, 3.4, 0.5 + f * 0.4); c.fill(); c.stroke(); }
  c.fillStyle = body; ell(c, 0, 1, 9, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-7, -6); c.lineTo(-8, -12); c.lineTo(-3, -8); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(7, -6); c.lineTo(8, -12); c.lineTo(3, -8); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = belly; ell(c, 0, 4, 5.4, 6); c.fill();
  c.fillStyle = '#fff'; circ(c, -3.6, -3, 3.4); c.fill(); c.stroke(); circ(c, 3.6, -3, 3.4); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, -3, -3, 1.6); c.fill(); circ(c, 4.2, -3, 1.6); c.fill();
  c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(-1.4, 0); c.lineTo(1.4, 0); c.lineTo(0, 2.6); c.closePath(); c.fill();
  c.fillStyle = '#ffb347'; for (const fx of [-3, 3]) { ell(c, fx, 10.6, 2, 1.1); c.fill(); }
  c.restore();
}
function moleBody(c, r, flash, happy, t) {
  c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = flash ? '#fff' : '#8a6a5a'; circ(c, 0, 0, r); c.fill(); c.stroke();
  c.fillStyle = flash ? '#fff' : '#d9b8a0'; ell(c, 0, r * 0.35, r * 0.55, r * 0.5); c.fill();
  c.fillStyle = '#ff9fbf'; ell(c, 0, -r * 0.05, r * 0.24, r * 0.18); c.fill(); c.stroke();
  c.fillStyle = '#fff'; circ(c, -r * 0.06, -r * 0.1, r * 0.06); c.fill();
  c.fillStyle = INK;
  if (happy) { c.lineWidth = 1.2; c.beginPath(); c.arc(-r * 0.36, -r * 0.3, r * 0.12, 1.1 * Math.PI, 1.9 * Math.PI); c.moveTo(r * 0.48, -r * 0.3); c.arc(r * 0.36, -r * 0.3, r * 0.12, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke(); }
  else { circ(c, -r * 0.36, -r * 0.3, r * 0.09); c.fill(); circ(c, r * 0.36, -r * 0.3, r * 0.09); c.fill(); }
  c.fillStyle = 'rgba(255,110,170,.45)'; circ(c, -r * 0.55, 0, r * 0.12); c.fill(); circ(c, r * 0.55, 0, r * 0.12); c.fill();
  c.strokeStyle = INK; c.lineWidth = 0.8; c.beginPath(); c.arc(0, r * 0.12, r * 0.14, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
}
function holeAt(c, x, gy, w) {
  c.fillStyle = '#3a2a24'; ell(c, x, gy - 1, w, 3.6); c.fill();
}
function moundAt(c, x, gy, w) {
  c.fillStyle = '#a8743f'; c.strokeStyle = INK; c.lineWidth = 1;
  c.beginPath(); c.moveTo(x - w - 4, gy); c.quadraticCurveTo(x - w, gy - 6, x - w + 6, gy - 2); c.lineTo(x + w - 6, gy - 2); c.quadraticCurveTo(x + w, gy - 6, x + w + 4, gy); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#7a4f30'; circ(c, x - w + 2, gy - 3, 1.4); c.fill(); circ(c, x + w - 3, gy - 3, 1.2); c.fill();
}
function drawMoleE(c, e, t, flash) {
  const cx = e.x + e.w / 2, gy = e.y + e.h, k = e.k || 0;
  c.save(); holeAt(c, cx, gy, 12);
  if (k > 0.02) {
    c.save(); c.beginPath(); c.rect(cx - 20, gy - 40, 40, 39); c.clip();
    c.translate(cx, gy + 9 - 21 * k);
    moleBody(c, 10, flash, false, t);
    c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.arc(0, -6, 9.4, Math.PI * 1.05, Math.PI * 1.95); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#fffbe0'; circ(c, 0, -12, 2.4); c.fill(); c.stroke();
    if (e.state === 'up') { const g = c.createRadialGradient(0, -12, 0, 0, -12, 14); g.addColorStop(0, 'rgba(255,240,160,.6)'); g.addColorStop(1, 'rgba(255,240,160,0)'); c.fillStyle = g; circ(c, 0, -12, 14); c.fill(); }
    c.fillStyle = flash ? '#fff' : '#f2cda4'; for (const s of [-1, 1]) { ell(c, s * 9, 4, 3.6, 2.6, s * 0.5); c.fill(); c.stroke(); }
    c.restore();
  } else if (e.state === 'peek') {
    for (let i = 0; i < 3; i++) { c.fillStyle = '#a8743f'; circ(c, cx + (i - 1) * 5, gy - 3 - Math.abs(Math.sin(t * 20 + i)) * 4, 1.6); c.fill(); }
  }
  moundAt(c, cx, gy, 11);
  c.restore();
}
function drawRock(c, x, y, t) {
  c.save(); c.translate(x, y); c.rotate(t * 6);
  c.fillStyle = '#9a8aa6'; c.strokeStyle = INK; c.lineWidth = 1;
  c.beginPath(); c.moveTo(-6, -2); c.lineTo(-3, -6); c.lineTo(4, -5); c.lineTo(6, 1); c.lineTo(2, 6); c.lineTo(-5, 4); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.35)'; circ(c, -1.5, -2.5, 1.6); c.fill();
  c.restore();
}

/* Король Кротів Копайло */
function drawMoleKing(c, B, t) {
  const gy = B.gy, k = B.k || 0, flash = B.flash > 0, happy = B.state === 'happy';
  c.save();
  for (const hx of B.holes) holeAt(c, hx, gy, 18);
  if (B.state === 'move' || B.state === 'warn') {
    const sh = B.state === 'warn' ? Math.sin(t * 50) * 1.5 : 0;
    c.fillStyle = '#a8743f'; c.strokeStyle = INK; c.lineWidth = 1.2;
    c.beginPath(); c.ellipse(B.x + sh, gy, 20, 8, 0, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
    for (let i = 0; i < 4; i++) { c.fillStyle = '#7a4f30'; circ(c, B.x + (i - 1.5) * 9 + sh, gy - 6 - Math.abs(Math.sin(t * 16 + i)) * 7, 2); c.fill(); }
  }
  if (k > 0.02) {
    c.save(); c.beginPath(); c.rect(B.x - 60, 0, 120, gy - 1); c.clip();
    c.translate(B.x, B.y); c.scale(B.dir || 1, 1);
    c.fillStyle = flash ? '#fff' : '#f2cda4'; c.strokeStyle = INK; c.lineWidth = 1.2;
    const wave = happy ? Math.sin(t * 8) * 0.5 : (B.state === 'throw' ? -0.9 : Math.sin(t * 4) * 0.15);
    for (const s of [-1, 1]) {
      c.save(); c.translate(s * 22, 4); c.rotate(s * (0.6 + (s > 0 ? wave : 0)));
      ell(c, 0, 0, 7, 5); c.fill(); c.stroke();
      c.strokeStyle = '#fffaf2'; c.lineWidth = 2; c.beginPath(); for (const d of [-3, 0, 3]) { c.moveTo(s * 5, d); c.lineTo(s * 9, d + s * 1.5); } c.stroke();
      c.restore(); c.strokeStyle = INK; c.lineWidth = 1.2;
    }
    moleBody(c, 24, flash, happy, t);
    c.save(); c.translate(0, -24);
    c.fillStyle = '#ffd23f'; c.strokeStyle = INK; c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(-12, 4); c.lineTo(-14, -9); c.lineTo(-6, -3); c.lineTo(0, -12); c.lineTo(6, -3); c.lineTo(14, -9); c.lineTo(12, 4); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ff5c7a'; circ(c, 0, -2, 2.2); c.fill(); c.fillStyle = '#4cb6ff'; circ(c, -8, 0, 1.6); c.fill(); circ(c, 8, 0, 1.6); c.fill();
    c.restore();
    if (!happy && B.state !== 'stun') { c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-13, -13); c.lineTo(-5, -10); c.moveTo(13, -13); c.lineTo(5, -10); c.stroke(); }
    c.restore();
  }
  for (const hx of B.holes) moundAt(c, hx, gy, 17);
  if (happy && k > 0.5) for (let i = 0; i < 3; i++) { const q = (t * 0.7 + i / 3) % 1; c.save(); c.globalAlpha = 1 - q; heartPath(c, B.x + (i - 1) * 18, B.y - 40 - q * 30, 9); c.fillStyle = '#ff7ab8'; c.fill(); c.restore(); }
  c.restore();
}

/* Вагонетка й рейки */
function drawRails(c, r, viewCam) {
  const y = r.y + 15;
  c.save(); c.lineCap = 'round';
  for (let x = r.x0 + 6; x < r.x1; x += 24) {
    const tx = Math.floor(x / T);
    if (!solid(tileAt(tx, 10)) && !solid(tileAt(tx, 11))) { c.fillStyle = '#8a5a30'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, x - 3, y + 2, 6, VIEW_H - y, 1.5); c.fill(); c.stroke(); c.strokeStyle = '#8a5a30'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 10, y + 30); c.lineTo(x, y + 4); c.lineTo(x + 10, y + 30); c.stroke(); }
    c.fillStyle = '#a8743f'; c.fillRect(x - 6, y - 1, 12, 4);
  }
  c.strokeStyle = INK; c.lineWidth = 3.4; c.beginPath(); c.moveTo(r.x0, y); c.lineTo(r.x1, y); c.stroke();
  c.strokeStyle = '#c9d2e6'; c.lineWidth = 1.8; c.stroke();
  c.restore();
}
function cartBody(c, m) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#8f9cb8'; c.beginPath(); c.moveTo(m.x, m.y - 12); c.lineTo(m.x + m.w, m.y - 12); c.lineTo(m.x + m.w - 5, m.y + 10); c.lineTo(m.x + 5, m.y + 10); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#ffd23f'; c.fillRect(m.x + 1, m.y - 11, m.w - 2, 3);
  c.fillStyle = '#c9d2e6'; c.fillRect(m.x + 4, m.y - 6, m.w - 8, 2);
  c.fillStyle = '#6e7a96'; for (const dx of [6, m.w / 2, m.w - 6]) { circ(c, m.x + dx, m.y + 3, 1.3); c.fill(); }
}
function drawCart(c, m, t) {
  c.save(); c.lineJoin = 'round';
  const spin = m.x * 0.25;
  for (const wx of [m.x + 11, m.x + m.w - 11]) {
    c.fillStyle = '#3a3448'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, wx, m.y + 11, 4.6); c.fill(); c.stroke();
    c.strokeStyle = '#c9d2e6'; c.lineWidth = 1; c.beginPath(); c.moveTo(wx + Math.cos(spin) * 3, m.y + 11 + Math.sin(spin) * 3); c.lineTo(wx - Math.cos(spin) * 3, m.y + 11 - Math.sin(spin) * 3); c.stroke();
  }
  cartBody(c, m);
  if (m.state === 'idle') { c.fillStyle = '#ff7ab8'; heartPath(c, m.x + m.w / 2, m.y - 20 + Math.sin(t * 4) * 2, 8); c.fill(); }
  c.restore();
}

/* Чарівна квасолина */
function drawBean(c, b, t) {
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  if (!b.grown) {
    const g = c.createRadialGradient(b.x, b.gy - 12, 0, b.x, b.gy - 12, 22); g.addColorStop(0, 'rgba(190,255,160,.55)'); g.addColorStop(1, 'rgba(190,255,160,0)');
    c.fillStyle = g; circ(c, b.x, b.gy - 12, 22); c.fill();
    c.strokeStyle = '#3f9e4f'; c.lineWidth = 3; c.beginPath(); c.moveTo(b.x, b.gy - 4); c.quadraticCurveTo(b.x - 5, b.gy - 14, b.x + 1, b.gy - 20 + Math.sin(t * 3) * 1.5); c.stroke();
    c.fillStyle = '#7fd46a'; c.strokeStyle = INK; c.lineWidth = 0.9; ell(c, b.x - 5, b.gy - 14, 4.5, 2.2, -0.5); c.fill(); c.stroke(); ell(c, b.x + 5, b.gy - 18, 4.5, 2.2, 0.5); c.fill(); c.stroke();
    c.fillStyle = '#b48cff'; ell(c, b.x, b.gy - 4, 6, 4.4); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.7)'; ell(c, b.x - 2, b.gy - 5.5, 2, 1.1, -0.3); c.fill();
    sparkle(c, b.x + 9, b.gy - 24 + Math.sin(t * 4) * 3, 1.8 + Math.sin(t * 6) * 0.6, '#fff8c0');
    sparkle(c, b.x - 10, b.gy - 18 + Math.cos(t * 3) * 3, 1.4, '#fff');
  } else {
    const top = b.gy - b.h * 48 + 6, cur = b.gy - Math.min(1, b.t / (b.h * 0.3 + 0.1)) * (b.gy - top);
    c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(b.x, b.gy);
    for (let y = b.gy; y >= cur; y -= 6) c.lineTo(b.x + Math.sin(y * 0.08) * 3, y); c.stroke();
    c.strokeStyle = '#4fbf5a'; c.lineWidth = 5; c.stroke();
    c.strokeStyle = '#9be36a'; c.lineWidth = 1.4; c.beginPath(); for (let y = b.gy; y >= cur; y -= 6) c.lineTo(b.x - 1 + Math.sin(y * 0.08) * 3, y); c.stroke();
    c.strokeStyle = '#4fbf5a'; c.lineWidth = 1.6;
    for (let y = b.gy - 30; y > cur + 10; y -= 48) { c.beginPath(); c.arc(b.x + 8, y, 5, Math.PI, TAU * 0.9); c.stroke(); }
    c.fillStyle = '#b48cff'; c.strokeStyle = INK; c.lineWidth = 0.9; ell(c, b.x, b.gy - 2, 6, 3.6); c.fill(); c.stroke();
  }
  c.restore();
}
/* Лист бобового стебла (хмаринка-платформа в чарівному городі) */
function drawLeafTile(c, l, r) {
  const x0 = l ? 1 : -2, x1 = r ? T - 1 : T + 2;
  c.save(); c.lineJoin = 'round';
  c.fillStyle = '#7fd46a'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.beginPath(); c.moveTo(x0, 7); c.quadraticCurveTo((x0 + x1) / 2, -1, x1, 7); c.quadraticCurveTo((x0 + x1) / 2, 15, x0, 7); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = '#3f9e4f'; c.lineWidth = 1.1; c.beginPath(); c.moveTo(x0 + 2, 7); c.lineTo(x1 - 2, 7); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.4)'; ell(c, (x0 + x1) / 2 - 3, 4, 4, 1.2); c.fill();
  c.restore();
}

/* Ліхтарики, які запалюються пострілом */
function drawLanternObj(c, l, t) {
  c.save(); c.lineJoin = 'round';
  const x = l.x, y = l.y, lit = l.lit, sw = Math.sin(t * 2 + x) * (l.hang ? 0.08 : 0);
  if (l.hang) { c.strokeStyle = 'rgba(59,31,79,.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, y - 10); c.stroke(); }
  else { c.fillStyle = '#5a4a6a'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, x - 2, y + 9, 4, l.gy - y - 9, 1.5); c.fill(); c.stroke(); rr(c, x - 6, l.gy - 3, 12, 3, 1.5); c.fill(); c.stroke(); }
  c.translate(x, y); c.rotate(sw);
  if (lit) {
    const g = c.createRadialGradient(0, 0, 2, 0, 0, 34); g.addColorStop(0, 'rgba(255,230,140,.75)'); g.addColorStop(1, 'rgba(255,200,120,0)');
    c.fillStyle = g; circ(c, 0, 0, 34); c.fill();
  }
  c.fillStyle = lit ? l.col : '#8a7f9c'; c.strokeStyle = INK; c.lineWidth = 1.2;
  ell(c, 0, 0, 8, 10); c.fill(); c.stroke();
  c.strokeStyle = lit ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.2)'; c.lineWidth = 1; c.beginPath(); c.moveTo(-4, -9); c.quadraticCurveTo(-6, 0, -4, 9); c.moveTo(4, -9); c.quadraticCurveTo(6, 0, 4, 9); c.stroke();
  if (lit) { c.fillStyle = '#fff6c8'; ell(c, 0, 1, 3, 4.4); c.fill(); }
  c.fillStyle = '#3a3448'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, -4, -12, 8, 3, 1); c.fill(); rr(c, -4, 9, 8, 3, 1); c.fill();
  if (!lit) sparkle(c, 9, -10 + Math.sin(t * 5 + x) * 2, 1.4 + Math.sin(t * 7 + x) * 0.5, '#fff8c0');
  c.restore();
}

/* Веселкові блоки, що з'являються й зникають */
const BLINK_COLS = ['#ff7a95', '#ffb347', '#ffe14d', '#7fdc8a', '#7fc8ff', '#b99aff'];
function drawBlinkTile(c, kind) {
  c.save();
  if (kind === 'blinkOff') {
    c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 1.5; c.setLineDash([3, 3]); rr(c, 1.5, 1.5, T - 3, T - 3, 5); c.stroke(); c.setLineDash([]);
    c.fillStyle = 'rgba(255,255,255,.15)'; rr(c, 1.5, 1.5, T - 3, T - 3, 5); c.fill();
  } else {
    const col = BLINK_COLS[+kind.slice(7) % 6];
    c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = col; c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.55)'; rr(c, 4, 4, T - 8, 5, 2.5); c.fill();
    c.fillStyle = '#fff'; starPath(c, T / 2, T / 2 + 3, 4, 1.8, 0); c.fill();
  }
  c.restore();
}

/* Блоки сьомої частини */
function drawBlock4(c, b) {
  c.strokeStyle = INK; c.lineWidth = 1.4;
  if (b === 'cabbage') {
    rr(c, 1, 5, T - 2, T - 6, 3); c.fillStyle = '#c98d55'; c.fill(); c.stroke();
    c.strokeStyle = '#8a5a30'; c.lineWidth = 1; c.beginPath(); c.moveTo(2, 14); c.lineTo(T - 2, 14); c.stroke();
    c.fillStyle = '#9be36a'; c.strokeStyle = INK; c.lineWidth = 1; circ(c, 8, 6, 5); c.fill(); c.stroke(); circ(c, 16, 6, 5); c.fill(); c.stroke();
    c.fillStyle = '#ff8a3d'; c.beginPath(); c.moveTo(11, 2); c.lineTo(13.5, 2); c.lineTo(12.2, 10); c.closePath(); c.fill(); c.stroke();
  } else if (b === 'lanternbox') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#5a4a7a'; c.fill(); c.stroke();
    c.fillStyle = '#ffe9a8'; heartPath(c, T / 2, T / 2 + 1, 10); c.fill();
    c.strokeStyle = '#3a2f57'; c.lineWidth = 1; c.beginPath(); c.moveTo(1.5, 5); c.lineTo(T - 1.5, 5); c.moveTo(1.5, T - 5); c.lineTo(T - 1.5, T - 5); c.stroke();
  } else if (b === 'prism') {
    rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#f2f0ff'; c.fill(); c.stroke();
    c.save(); rr(c, 1, 1, T - 2, T - 2, 5); c.clip(); for (let i = 0; i < 6; i++) { c.fillStyle = BLINK_COLS[i]; c.globalAlpha = 0.7; c.fillRect(1 + i * 3.7, T * 0.55, 3.7, T); } c.restore();
    c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(T / 2, 3); c.lineTo(T - 5, T * 0.55); c.lineTo(5, T * 0.55); c.closePath(); c.fill(); c.lineWidth = 1; c.stroke();
  } else if (b === 'ore') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#7d6e8f'; c.fill(); c.stroke();
    for (const [x, y, col] of [[7, 8, '#7fd6ff'], [16, 14, '#ff9fd0'], [9, 17, '#ffe14d']]) { c.fillStyle = col; c.beginPath(); c.moveTo(x, y - 3.4); c.lineTo(x + 3, y); c.lineTo(x, y + 3.4); c.lineTo(x - 3, y); c.closePath(); c.fill(); c.lineWidth = 0.8; c.stroke(); }
    c.fillStyle = 'rgba(255,255,255,.25)'; ell(c, 7, 4.5, 3, 1.2, -0.3); c.fill();
  } else if (b === 'roots') {
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#9a6a42'; c.fill(); c.stroke();
    c.strokeStyle = '#6e4428'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(4, 3); c.quadraticCurveTo(10, 12, 6, T - 3); c.moveTo(14, 3); c.quadraticCurveTo(20, 10, 17, T - 3); c.moveTo(10, 12); c.lineTo(15, 15); c.stroke();
  } else return false;
  return true;
}

/* Декор сьомої частини */
function drawDecor7(c, d, t) {
  const x = d.x, y = d.y;
  c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 0.8;
  switch (d.k) {
    case 'carrot':
      c.fillStyle = '#ff8a3d'; c.beginPath(); c.moveTo(x - 4, y); c.lineTo(x + 4, y); c.lineTo(x, y + 4); c.closePath(); c.fill();
      c.fillStyle = '#4fbf5a'; for (const a of [-0.5, 0, 0.5]) { c.save(); c.translate(x, y); c.rotate(a + Math.sin(t * 2 + x) * 0.05); ell(c, 0, -6, 1.8, 6); c.fill(); c.stroke(); c.restore(); }
      break;
    case 'cabbageS':
      c.fillStyle = '#9be36a'; circ(c, x, y - 6, 6.5); c.fill(); c.stroke(); c.fillStyle = '#c6f5a8'; circ(c, x, y - 6, 3.4); c.fill();
      c.strokeStyle = '#4fbf5a'; c.beginPath(); c.arc(x, y - 6, 5, 3.6, 5.4); c.stroke(); break;
    case 'sunflower': {
      c.strokeStyle = '#3f9e4f'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 22); c.stroke();
      c.fillStyle = '#4fbf5a'; c.lineWidth = 0.8; c.strokeStyle = INK; ell(c, x - 4, y - 10, 4, 1.8, 0.5); c.fill(); c.stroke();
      c.fillStyle = '#ffd23f'; for (let i = 0; i < 10; i++) { const a = i * TAU / 10 + t * 0.3; ell(c, x + Math.cos(a) * 6, y - 26 + Math.sin(a) * 6, 3.4, 1.8, a); c.fill(); }
      c.fillStyle = '#8a5a30'; circ(c, x, y - 26, 4); c.fill(); c.stroke(); break;
    }
    case 'firefly': {
      const fx = x + Math.sin(t * 1.3 + x) * 8, fy = y - 18 + Math.sin(t * 1.9 + x * 0.3) * 8, a = 0.5 + 0.5 * Math.sin(t * 4 + x);
      const g = c.createRadialGradient(fx, fy, 0, fx, fy, 8); g.addColorStop(0, `rgba(240,255,150,${0.9 * a})`); g.addColorStop(1, 'rgba(240,255,150,0)');
      c.fillStyle = g; circ(c, fx, fy, 8); c.fill(); c.fillStyle = '#fffbe0'; circ(c, fx, fy, 1.4); c.fill(); break;
    }
    case 'root':
      c.strokeStyle = '#8a5a30'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(x - 8, y); c.quadraticCurveTo(x - 2, y - 10, x + 4, y - 6); c.quadraticCurveTo(x + 8, y - 4, x + 9, y); c.stroke();
      c.fillStyle = '#7fd46a'; ell(c, x + 4, y - 8, 3, 1.6, -0.4); c.fill(); c.lineWidth = 0.8; c.strokeStyle = INK; c.stroke(); break;
  }
}

/* Фони сьомої частини */
function bgBeans(c, viewW, camX, t) {
  const sx = viewW * 0.8, sg = c.createRadialGradient(sx, 48, 4, sx, 48, 56);
  sg.addColorStop(0, 'rgba(255,250,210,1)'); sg.addColorStop(0.35, 'rgba(255,240,170,.8)'); sg.addColorStop(1, 'rgba(255,240,170,0)');
  c.fillStyle = sg; circ(c, sx, 48, 56); c.fill();
  for (let i = 0; i < 5; i++) { const x = wrapX(i * 190 - camX * 0.1 + t * 4, viewW + 240) - 120; puffCloud(c, x, 32 + (i % 3) * 20, 0.85, 'rgba(255,255,255,.9)'); }
  const bx = wrapX(viewW * 0.3 - camX * 0.06, viewW + 500) - 100;
  c.strokeStyle = '#8fd07a'; c.lineWidth = 10; c.beginPath(); c.moveTo(bx, 210); for (let y = 210; y > -10; y -= 10) c.lineTo(bx + Math.sin(y * 0.04) * 16, y); c.stroke();
  c.fillStyle = '#8fd07a'; for (let y = 180; y > 0; y -= 40) { ell(c, bx + Math.sin(y * 0.04) * 16 + (y % 80 ? 16 : -16), y, 16, 6, y % 80 ? 0.3 : -0.3); c.fill(); }
  hill(c, viewW, 196, 10, 0.014, 0.6, camX * 0.2, '#b8e6a0');
  const span = 26, off = wrapX(-camX * 0.35, span);
  c.fillStyle = '#f2d6b0'; c.fillRect(0, 206, viewW + 1, 4);
  for (let x = -span + off; x < viewW + span; x += span) { c.fillStyle = '#f2d6b0'; rr(c, x, 196, 6, 30, 2); c.fill(); }
  c.fillStyle = '#9fd08a'; c.fillRect(0, 222, viewW + 1, VIEW_H);
  const ss = 140, so = wrapX(-camX * 0.35, ss);
  for (let x = -ss + so; x < viewW + ss; x += ss) {
    c.strokeStyle = '#3f9e4f'; c.lineWidth = 2; c.beginPath(); c.moveTo(x + 40, 224); c.lineTo(x + 40, 180); c.stroke();
    c.fillStyle = '#ffd23f'; for (let i = 0; i < 10; i++) { const a = i * TAU / 10; ell(c, x + 40 + Math.cos(a) * 8, 176 + Math.sin(a) * 8, 4.4, 2.2, a); c.fill(); }
    c.fillStyle = '#8a5a30'; circ(c, x + 40, 176, 5); c.fill();
  }
}
function bgLantern(c, viewW, camX, t) {
  const mg = c.createRadialGradient(viewW * 0.75, 52, 4, viewW * 0.75, 52, 46); mg.addColorStop(0, 'rgba(255,248,215,1)'); mg.addColorStop(0.38, 'rgba(255,248,215,.9)'); mg.addColorStop(0.44, 'rgba(255,248,215,.2)'); mg.addColorStop(1, 'rgba(255,248,215,0)');
  c.fillStyle = mg; circ(c, viewW * 0.75, 52, 46); c.fill();
  const R = rng(13);
  for (let i = 0; i < 50; i++) { const x = wrapX(R() * 1400 - camX * 0.05, viewW + 20) - 10, y = R() * 150, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); c.fillStyle = `rgba(255,255,240,${0.3 + tw * 0.6})`; circ(c, x, y, 0.6 + R() * 0.9); c.fill(); }
  const span = 170;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.2, span), h = 40 + (((i + Math.floor(camX * 0.2 / span)) % 3 + 3) % 3) * 12;
    c.fillStyle = '#2a2458'; c.fillRect(wx, 200 - h, 60, h + 40);
    c.beginPath(); c.moveTo(wx - 8, 200 - h); c.lineTo(wx + 30, 200 - h - 26); c.lineTo(wx + 68, 200 - h); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,214,110,.85)'; rr(c, wx + 12, 210 - h, 9, 11, 2); c.fill(); rr(c, wx + 38, 210 - h, 9, 11, 2); c.fill();
  }
  const ls = 34, lo = wrapX(-camX * 0.3, ls);
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 1; c.beginPath();
  for (let x = -ls + lo; x < viewW + ls; x += ls) { c.moveTo(x, 118); c.quadraticCurveTo(x + ls / 2, 128, x + ls, 118); } c.stroke();
  for (let x = -ls + lo, i = Math.floor(camX * 0.3 / ls); x < viewW + ls; x += ls, i++) { const col = ['#ff9a7a', '#ffd23f', '#ff7ab8', '#9fe0ff'][((i % 4) + 4) % 4]; const g = c.createRadialGradient(x + ls / 2, 128, 0, x + ls / 2, 128, 9); g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; circ(c, x + ls / 2, 128, 9); c.fill(); c.fillStyle = col; ell(c, x + ls / 2, 128, 3, 4); c.fill(); }
  c.fillStyle = '#1d1848'; c.fillRect(0, 226, viewW + 1, VIEW_H);
}
function bgRainbow(c, viewW, camX, t) {
  for (let k = 0; k < 2; k++) {
    const rx = wrapX(240 + k * 520 - camX * (0.06 + k * 0.04), viewW + 900) - 300, rad = 170 - k * 40, base = 250 - k * 20;
    for (let i = 0; i < 6; i++) { c.strokeStyle = BLINK_COLS[i]; c.globalAlpha = 0.45; c.lineWidth = 9; c.beginPath(); c.arc(rx, base, rad - i * 9, Math.PI, TAU); c.stroke(); }
  }
  c.globalAlpha = 1;
  for (let i = 0; i < 7; i++) { const x = wrapX(i * 150 - camX * 0.15 + t * 4, viewW + 240) - 120; puffCloud(c, x, 50 + (i % 3) * 30, 1 + (i % 2) * 0.4, 'rgba(255,255,255,.88)'); }
  const span = 300;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span) + 80, wy = 150 + Math.sin(t * 0.8 + i) * 4;
    c.fillStyle = '#ffffff'; ell(c, wx, wy, 46, 10); c.fill();
    c.fillStyle = '#c9b6ff'; c.beginPath(); c.moveTo(wx - 40, wy + 4); c.lineTo(wx, wy + 40); c.lineTo(wx + 40, wy + 4); c.closePath(); c.fill();
    c.fillStyle = '#7fdc8a'; ell(c, wx, wy - 4, 42, 7); c.fill();
  }
  hill(c, viewW, 226, 8, 0.03, 1, camX * 0.5, '#ffffff');
}
function bgMine(c, viewW, camX, t) {
  const span = 150;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.25, span);
    c.fillStyle = '#4a3a5a'; rr(c, wx + 20, 70, 90, 160, 40); c.fill();
    c.fillStyle = '#8a5a30'; c.fillRect(wx + 18, 72, 8, 150); c.fillRect(wx + 104, 72, 8, 150); c.fillRect(wx + 14, 68, 102, 9);
    const g = c.createRadialGradient(wx + 65, 92, 0, wx + 65, 92, 24); g.addColorStop(0, 'rgba(255,220,130,.75)'); g.addColorStop(1, 'rgba(255,220,130,0)');
    c.fillStyle = g; circ(c, wx + 65, 92, 24); c.fill(); c.fillStyle = '#ffd23f'; ell(c, wx + 65, 92, 3, 4); c.fill();
  }
  const R = rng(21);
  for (let i = 0; i < 18; i++) {
    const x = wrapX(R() * 1600 - camX * 0.15, viewW + 40) - 20, y = 20 + R() * 120, col = ['#7fd6ff', '#ff9fd0', '#ffe14d', '#b99aff'][i % 4], a = 0.5 + 0.5 * Math.sin(t * 2 + i);
    const g = c.createRadialGradient(x, y, 0, x, y, 10); g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,255,255,0)'); c.globalAlpha = 0.35 + a * 0.3; c.fillStyle = g; circ(c, x, y, 10); c.fill(); c.globalAlpha = 1;
    c.fillStyle = col; c.beginPath(); c.moveTo(x, y - 4); c.lineTo(x + 3, y); c.lineTo(x, y + 4); c.lineTo(x - 3, y); c.closePath(); c.fill();
  }
  c.fillStyle = '#3a2f4a'; c.fillRect(0, 226, viewW + 1, VIEW_H);
}
function bgBurrow(c, viewW, camX, t) {
  const R = rng(31);
  c.strokeStyle = '#8a5a30'; c.lineWidth = 3;
  for (let i = 0; i < 12; i++) { const x = wrapX(R() * 1400 - camX * 0.2, viewW + 60) - 30, l = 30 + R() * 60; c.beginPath(); c.moveTo(x, 0); c.quadraticCurveTo(x + 10, l / 2, x - 4 + Math.sin(t + i) * 2, l); c.stroke(); }
  const span = 220;
  for (let i = -1; i < viewW / span + 2; i++) {
    const wx = i * span + wrapX(-camX * 0.22, span);
    c.fillStyle = '#6e4a34'; ell(c, wx + 90, 170, 70, 44); c.fill();
    c.fillStyle = '#5a3a28'; ell(c, wx + 90, 178, 56, 32); c.fill();
    c.fillStyle = '#ffb347'; rr(c, wx + 70, 160, 14, 18, 3); c.fill(); c.fillStyle = '#ff8a3d'; c.beginPath(); c.moveTo(wx + 98, 182); c.lineTo(wx + 112, 182); c.lineTo(wx + 105, 200); c.closePath(); c.fill();
  }
  for (let i = 0; i < 10; i++) { const x = wrapX(i * 89 - camX * 0.35, viewW + 40) - 20, a = 0.4 + 0.4 * Math.sin(t * 2 + i); const g = c.createRadialGradient(x, 214, 0, x, 214, 12); g.addColorStop(0, `rgba(140,255,200,${a})`); g.addColorStop(1, 'rgba(140,255,200,0)'); c.fillStyle = g; circ(c, x, 214, 12); c.fill(); }
  c.fillStyle = '#4a3226'; c.fillRect(0, 226, viewW + 1, VIEW_H);
}
Object.assign(BG2, { beans: bgBeans, lantern: bgLantern, rainbow: bgRainbow, mine: bgMine, burrow: bgBurrow });

/* Нові вороги для малювання */
function drawEnemy3(c, e, cx, fl) {
  switch (e.k) {
    case 'worm': drawWorm(c, cx, e.y + e.h, e.dir, e.t, fl); return true;
    case 'owl': drawOwl(c, cx, e.y + e.h / 2, e.t, e.dir, fl, e.state === 'hang'); return true;
    case 'mole': drawMoleE(c, e, e.t, fl); return true;
  }
  return false;
}
