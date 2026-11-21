'use strict';
/* ===== Частина 34 «Перегони й тіні»: теми, зайчик Шустрик, тінь-подружка, наліпки, Кролик Фокус-Покус ===== */
Object.assign(THEMES, {
  racestadium: Object.assign({}, THEMES.football, { sky: ['#9fdcff', '#d0f0ff', '#fff6dc'] }),
  shadowcastle: Object.assign({}, THEMES.castle, { sky: ['#b8a8f0', '#dcd0ff', '#fff0f8'] }),
  balloonvalley: Object.assign({}, THEMES.kites, { sky: ['#ffd0e0', '#ffe8d0', '#fff8e8'] }),
  snowrace: Object.assign({}, THEMES.sledtrack, { sky: ['#a8dcff', '#d8f0ff', '#f6fbff'] }),
  magicshow: Object.assign({}, THEMES.circus, { sky: ['#e0c0ff', '#f4e0ff', '#fff4fb'] }),
});
Object.assign(BG2, {
  racestadium: (c, viewW, camX, t) => drawBackground(c, 'football', camX, viewW, t, 0),
  shadowcastle: (c, viewW, camX, t) => drawBackground(c, 'castle', camX, viewW, t, 0),
  balloonvalley: (c, viewW, camX, t) => drawBackground(c, 'kites', camX, viewW, t, 0),
  snowrace: (c, viewW, camX, t) => drawBackground(c, 'sledtrack', camX, viewW, t, 0),
  magicshow: (c, viewW, camX, t) => drawBackground(c, 'circus', camX, viewW, t, 0),
});

/* ===== Наліпки: малюються і в грі, і в альбомі ===== */
function drawSticker(c, k, x, y, r) {
  c.save(); c.translate(x, y); c.lineJoin = 'round'; c.lineCap = 'round';
  c.fillStyle = 'rgba(59,31,79,.18)'; circ(c, 1.5, 2.5, r); c.fill();
  c.fillStyle = '#ffffff'; circ(c, 0, 0, r); c.fill(); c.strokeStyle = '#e8d8f0'; c.lineWidth = r * 0.06; c.stroke();
  const s = r / 20; c.scale(s, s);
  const bg = { sunmoon: '#ffeccc', key: '#fff3c4', shell: '#ffe0ea', icecream: '#ffe6f2', panda: '#dcf7e4', medal: '#e0f0ff', crown: '#f0e4ff', balloon: '#ffe8d0', snowflake: '#dff2ff', rabbit: '#f4e0ff' }[k] || '#fff0f8';
  c.fillStyle = bg; circ(c, 0, 0, 16.5); c.fill();
  c.strokeStyle = INK; c.lineWidth = 1.3;
  if (k === 'sunmoon') {
    c.fillStyle = '#ffd23f'; c.beginPath(); c.arc(0, 0, 10, Math.PI / 2, Math.PI * 1.5); c.closePath(); c.fill();
    c.fillStyle = '#5a64d8'; c.beginPath(); c.arc(0, 0, 10, -Math.PI / 2, Math.PI / 2); c.closePath(); c.fill();
    c.fillStyle = '#fff6cc'; circ(c, 4, 0, 4.5); c.fill(); c.fillStyle = '#5a64d8'; circ(c, 6, -1.5, 3.8); c.fill();
    c.strokeStyle = '#ff9f1c'; c.lineWidth = 1.6; for (let i = 0; i < 4; i++) { const a = Math.PI * (0.6 + i * 0.27); c.beginPath(); c.moveTo(Math.cos(a) * 12, Math.sin(a) * 12); c.lineTo(Math.cos(a) * 15, Math.sin(a) * 15); c.stroke(); }
    c.strokeStyle = INK; c.lineWidth = 1.3; circ(c, 0, 0, 10); c.stroke();
  } else if (k === 'key') {
    c.fillStyle = '#ffcf2e'; circ(c, -6, -4, 6); c.fill(); c.stroke(); c.fillStyle = bg; circ(c, -6, -4, 2.4); c.fill(); c.stroke();
    c.fillStyle = '#ffcf2e'; c.beginPath(); c.moveTo(-1, -1); c.lineTo(11, 9); c.lineTo(9, 11); c.lineTo(-3, 1); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(7, 7); c.lineTo(4, 10); c.moveTo(9.5, 9.5); c.lineTo(7, 12); c.stroke();
  } else if (k === 'shell') {
    c.fillStyle = '#ff9fc4'; c.beginPath(); c.moveTo(0, 11); for (let i = 0; i <= 6; i++) { const a = Math.PI * (1.08 + i * 0.14); c.lineTo(Math.cos(a) * 13, Math.sin(a) * 13 + 3); } c.closePath(); c.fill(); c.stroke();
    for (let i = 1; i < 6; i++) { const a = Math.PI * (1.08 + i * 0.14); c.beginPath(); c.moveTo(0, 10); c.lineTo(Math.cos(a) * 12, Math.sin(a) * 12 + 3); c.stroke(); }
    c.fillStyle = '#ffd0e0'; rr(c, -4, 8, 8, 4, 2); c.fill(); c.stroke();
  } else if (k === 'icecream') {
    c.fillStyle = '#e8a860'; c.beginPath(); c.moveTo(-6, 0); c.lineTo(6, 0); c.lineTo(0, 14); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ff9fc4'; circ(c, -3.5, -3, 5.5); c.fill(); c.stroke(); c.fillStyle = '#c8f0ff'; circ(c, 3.5, -4, 5.5); c.fill(); c.stroke();
    c.fillStyle = '#ff4f5e'; circ(c, 0, -10.5, 2.4); c.fill(); c.stroke();
  } else if (k === 'panda') {
    c.fillStyle = '#2a2438'; circ(c, -8, -8, 4.5); c.fill(); circ(c, 8, -8, 4.5); c.fill();
    c.fillStyle = '#ffffff'; circ(c, 0, 1, 11); c.fill(); c.stroke();
    c.fillStyle = '#2a2438'; ell(c, -4.5, 0, 3, 4, 0.5); c.fill(); ell(c, 4.5, 0, 3, 4, -0.5); c.fill(); ell(c, 0, 5, 2, 1.4); c.fill();
    c.fillStyle = '#fff'; circ(c, -4, -0.5, 1.2); c.fill(); circ(c, 5, -0.5, 1.2); c.fill();
    c.fillStyle = 'rgba(255,140,180,.6)'; circ(c, -7.5, 5, 1.8); c.fill(); circ(c, 7.5, 5, 1.8); c.fill();
  } else if (k === 'medal') {
    c.fillStyle = '#ff5c7a'; c.beginPath(); c.moveTo(-7, -14); c.lineTo(-1, -14); c.lineTo(3, -2); c.lineTo(-3, -2); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#4cb6ff'; c.beginPath(); c.moveTo(7, -14); c.lineTo(1, -14); c.lineTo(-3, -2); c.lineTo(3, -2); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ffcf2e'; circ(c, 0, 4, 8.5); c.fill(); c.stroke(); c.fillStyle = '#fff3a0'; starPath(c, 0, 4, 4.8, 2.2, 0); c.fill();
  } else if (k === 'crown') {
    c.fillStyle = '#ffcf2e'; c.beginPath(); c.moveTo(-12, 8); c.lineTo(-13, -6); c.lineTo(-6, 0); c.lineTo(0, -10); c.lineTo(6, 0); c.lineTo(13, -6); c.lineTo(12, 8); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ff4fa3'; circ(c, 0, 3, 2.6); c.fill(); c.fillStyle = '#4cb6ff'; circ(c, -7, 4, 2); c.fill(); circ(c, 7, 4, 2); c.fill();
  } else if (k === 'balloon') {
    const cols = ['#ff5c7a', '#ffd23f', '#4cb6ff', '#7ee08a'];
    for (let i = 0; i < 4; i++) { c.fillStyle = cols[i]; c.beginPath(); c.ellipse(0, -4, 11 - i * 3, 11, 0, 0, TAU); c.fill(); }
    c.beginPath(); c.ellipse(0, -4, 11, 11, 0, 0, TAU); c.stroke();
    c.beginPath(); c.moveTo(-6, 5); c.lineTo(-3, 10); c.moveTo(6, 5); c.lineTo(3, 10); c.stroke();
    c.fillStyle = '#c8884a'; rr(c, -4, 10, 8, 5, 1.5); c.fill(); c.stroke();
  } else if (k === 'snowflake') {
    c.strokeStyle = '#3f8fff'; c.lineWidth = 2.2;
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * 12, Math.sin(a) * 12); c.moveTo(Math.cos(a) * 7, Math.sin(a) * 7); c.lineTo(Math.cos(a + 0.5) * 10, Math.sin(a + 0.5) * 10); c.moveTo(Math.cos(a) * 7, Math.sin(a) * 7); c.lineTo(Math.cos(a - 0.5) * 10, Math.sin(a - 0.5) * 10); c.stroke(); }
    c.fillStyle = '#ffffff'; circ(c, 0, 0, 2.5); c.fill();
  } else if (k === 'rabbit') {
    c.fillStyle = '#ffffff'; ell(c, -4, -9, 2.8, 7, -0.15); c.fill(); c.stroke(); ell(c, 4, -9, 2.8, 7, 0.15); c.fill(); c.stroke();
    c.fillStyle = '#ffb3c6'; ell(c, -4, -9, 1.2, 4.5, -0.15); c.fill(); ell(c, 4, -9, 1.2, 4.5, 0.15); c.fill();
    c.fillStyle = '#ffffff'; circ(c, 0, -1, 6); c.fill(); c.stroke();
    c.fillStyle = INK; circ(c, -2.2, -2, 1); c.fill(); circ(c, 2.2, -2, 1); c.fill();
    c.fillStyle = '#2a2438'; rr(c, -10, 4, 20, 9, 2); c.fill(); c.stroke(); rr(c, -13, 3, 26, 3, 1.5); c.fill(); c.stroke();
    c.fillStyle = '#ff4f5e'; c.fillRect(-10, 7, 20, 2.4);
  } else drawSticker34(c, k);
  c.restore();
}
function drawStickerItem(c, s, t) {
  if (s.got) return;
  const bob = Math.sin(t * 2.4 + s.x) * 3;
  c.save(); if (s.had) c.globalAlpha = 0.5;
  const g = c.createRadialGradient(s.x, s.y + bob, 4, s.x, s.y + bob, 22); g.addColorStop(0, 'rgba(255,240,250,.9)'); g.addColorStop(1, 'rgba(255,240,250,0)');
  c.fillStyle = g; circ(c, s.x, s.y + bob, 22); c.fill();
  c.translate(s.x, s.y + bob); c.rotate(Math.sin(t * 1.6) * 0.12); drawSticker(c, s.k, 0, 0, 12);
  c.restore();
  if (!s.had && (t * 1.3 + s.x) % 1.6 < 0.4) sparkle(c, s.x + 11, s.y - 10 + bob, 3, '#ffe14d');
}

/* ===== Зайчик Шустрик і стрічки старту й фінішу ===== */
function drawRaceBanner(c, x, gy, text, t) {
  const x0 = x * T - 20, x1 = x * T + 44, top = gy - 100;
  c.save(); c.lineJoin = 'round';
  c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.4;
  rr(c, x0 - 2, top, 5, gy - top, 2); c.fill(); c.stroke(); rr(c, x1 - 3, top, 5, gy - top, 2); c.fill(); c.stroke();
  const by = top + 2 + Math.sin(t * 3) * 1.5, bw = x1 - x0, bh = 18;
  for (let i = 0; i < 12; i++) for (let j = 0; j < 2; j++) { c.fillStyle = (i + j) % 2 ? '#2a2438' : '#ffffff'; c.fillRect(x0 + i * bw / 12, by + j * 4, bw / 12 + 0.3, 4); }
  c.fillStyle = '#ffd23f'; rr(c, x0, by + 8, bw, bh - 8, 3); c.fill(); c.stroke();
  c.strokeRect(x0, by, bw, 8);
  txt24(c, text, (x0 + x1) / 2, by + 13.5, 8.5, INK, '#ffffff', 0);
  c.restore();
}
function drawRacer(c, r, t) {
  const b = r.b, x = b.x + b.w / 2, gy = b.y + b.h, run = r.state === 'run' || (r.state === 'slow' && Math.abs(b.vx) > 5), air = !b.onGround;
  const ph = r.t * 14, leg = run && !air ? Math.sin(ph) * 4 : 0, cheer = r.state === 'done';
  c.save(); c.translate(x, gy); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.3;
  // ніжки
  c.fillStyle = '#ffffff'; ell(c, -4 + leg, -2, 4.5, 2.6); c.fill(); c.stroke(); ell(c, 5 - leg, -2, 4.5, 2.6); c.fill(); c.stroke();
  // тулуб із номером
  c.fillStyle = '#ffffff'; ell(c, 0, -11, 8, 9); c.fill(); c.stroke();
  c.fillStyle = '#4cb6ff'; rr(c, -4.5, -15, 9, 8, 2); c.fill(); c.stroke(); txt24(c, '1', 0, -11, 6, '#ffffff', '#4cb6ff', 0);
  // лапки
  const arm = cheer ? -1 : run ? Math.sin(ph) * 0.6 : 0.3;
  c.save(); c.translate(6, -14); c.rotate(cheer ? -2.2 + Math.sin(t * 10) * 0.3 : arm); c.fillStyle = '#ffffff'; ell(c, 3, 0, 4, 2.2); c.fill(); c.stroke(); c.restore();
  // голова з вушками й кепкою
  c.fillStyle = '#ffffff'; ell(c, -3, -36, 2.6, 8, -0.25 + (run ? Math.sin(ph) * 0.1 : 0)); c.fill(); c.stroke(); ell(c, 3, -37, 2.6, 8, 0.2); c.fill(); c.stroke();
  c.fillStyle = '#ffb3c6'; ell(c, -3, -36, 1, 5, -0.25); c.fill(); ell(c, 3, -37, 1, 5, 0.2); c.fill();
  c.fillStyle = '#ffffff'; circ(c, 1, -24, 7.5); c.fill(); c.stroke();
  c.fillStyle = '#ff4f5e'; c.beginPath(); c.arc(1, -26, 7.6, Math.PI * 1.05, Math.PI * 1.95); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(6, -28); c.lineTo(13, -27); c.lineTo(7, -25); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = INK; circ(c, 4, -23.5, 1.3); c.fill(); c.fillStyle = '#ff9fc4'; circ(c, 8, -21, 1.4); c.fill();
  c.beginPath(); c.strokeStyle = INK; c.lineWidth = 1.1; if (cheer) c.arc(5, -20, 2, 0.1, Math.PI - 0.1); else { c.moveTo(4, -19.5); c.lineTo(6.5, -19.5); } c.stroke();
  c.fillStyle = 'rgba(255,140,180,.5)'; circ(c, 0, -20.5, 1.8); c.fill();
  c.restore();
  if (run && !air && Math.floor(r.t * 8) % 2 === 0) { c.save(); c.globalAlpha = 0.4; c.fillStyle = '#e8dcc0'; circ(c, x - 10, gy - 2, 2.5); c.fill(); c.restore(); }
}
function drawRaceHud(c, x, top, H) {
  const r = G.races.find(q => q.state === 'run');
  if (!r) return;
  const w = 130, P = G.P, len = (r.x1 - r.x0) * T, kp = Math.max(0, Math.min(1, (P.x + P.w / 2 - r.x0 * T) / len)), kb = Math.max(0, Math.min(1, (r.b.x + 9 - r.x0 * T) / len));
  hudPill(c, x, top, w, H);
  const x0 = x + 14, x1 = x + w - 16, cy = top + H / 2 + 2;
  c.save(); c.strokeStyle = 'rgba(59,31,79,.25)'; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(x0, cy); c.lineTo(x1, cy); c.stroke();
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { c.fillStyle = (i + j) % 2 ? INK : '#fff'; c.fillRect(x1 + 2 + i * 3, cy - 6 + j * 3, 3, 3); }
  c.fillStyle = '#ffffff'; c.strokeStyle = INK; c.lineWidth = 1.2; circ(c, x0 + (x1 - x0) * kb, cy - 3, 5.5); c.fill(); c.stroke();
  c.fillStyle = '#ff4f5e'; c.beginPath(); c.arc(x0 + (x1 - x0) * kb, cy - 4, 5.5, Math.PI, TAU); c.fill();
  c.fillStyle = '#ff7ab8'; circ(c, x0 + (x1 - x0) * kp, cy + 3, 5.5); c.fill(); c.stroke();
  c.fillStyle = '#ffe14d'; starPath(c, x0 + (x1 - x0) * kp, cy + 3, 3, 1.4, 0); c.fill();
  c.restore();
}

/* ===== Тінь-подружка, дзеркальце, тіньові кнопки й ворота ===== */
let twinCv = null;
function drawTwin(c, tw, t) {
  const size = 72, sc = Math.max(1, ps);
  if (!twinCv) twinCv = document.createElement('canvas');
  const W = Math.ceil(size * sc);
  if (twinCv.width !== W) { twinCv.width = W; twinCv.height = W; }
  const oc = twinCv.getContext('2d');
  oc.setTransform(1, 0, 0, 1, 0, 0); oc.clearRect(0, 0, W, W); oc.globalCompositeOperation = 'source-over';
  oc.setTransform(sc, 0, 0, sc, 0, 0);
  drawUnicorn(oc, { x: size / 2, y: size - 6, dir: tw.dir, t: tw.pt, run: tw.run, air: tw.air, s: 0.8, prof: save.profile, blink: false });
  oc.setTransform(1, 0, 0, 1, 0, 0); oc.globalCompositeOperation = 'source-in';
  const g = oc.createLinearGradient(0, 0, 0, W); g.addColorStop(0, '#d8c8ff'); g.addColorStop(1, '#8a6ae8'); oc.fillStyle = g; oc.fillRect(0, 0, W, W);
  oc.globalCompositeOperation = 'source-over';
  const cx = tw.x + 11, gy = tw.y + 30 + 1;
  c.save(); c.globalAlpha = 0.35 * tw.k; c.fillStyle = '#ffffff'; ell(c, cx, gy - 16, 22, 20); c.fill();
  c.globalAlpha = 0.72 * tw.k; c.drawImage(twinCv, cx - size / 2, gy - size + 6, size, size); c.restore();
  if ((t * 2) % 1 < 0.08) sparkle(c, cx + Math.sin(t * 3) * 10, gy - 30, 2.2, '#c8b8ff');
}
function drawTwinMirror(c, w, t) {
  const x = w.x * T + 12, gy = w.gy, on = !w.used;
  c.save(); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#c89a5a'; rr(c, x - 9, gy - 6, 18, 6, 2); c.fill(); c.stroke(); rr(c, x - 2, gy - 16, 4, 11, 1.5); c.fill(); c.stroke();
  c.fillStyle = '#e8c070'; ell(c, x, gy - 30, 11, 15); c.fill(); c.stroke();
  const g = c.createLinearGradient(x - 8, gy - 44, x + 8, gy - 16); g.addColorStop(0, on ? '#c8b8ff' : '#e0dcf0'); g.addColorStop(1, on ? '#6a4ab8' : '#b8b0d0');
  c.fillStyle = g; ell(c, x, gy - 30, 8, 12); c.fill();
  c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, x - 3, gy - 35, 2, 4, -0.3); c.fill();
  c.restore();
  if (on) { c.save(); c.globalAlpha = 0.5 + 0.3 * Math.sin(t * 4); sparkle(c, x + 10, gy - 42, 3, '#ffffff'); sparkle(c, x - 11, gy - 22, 2.4, '#c8b8ff'); c.restore(); }
}
function drawShadowPlate(c, p, t) {
  const x = p.x * T, gy = p.gy, d = p.down;
  c.save(); c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = d ? '#9a7ae8' : '#4a3a8a'; rr(c, x + 2, gy - (d ? 3 : 6), T - 4, d ? 3 : 6, 2); c.fill(); c.stroke();
  c.fillStyle = d ? '#ffffff' : '#fff6cc'; circ(c, x + 11, gy - (d ? 7 : 11), 3.2); c.fill(); c.fillStyle = d ? '#9a7ae8' : '#4a3a8a'; circ(c, x + 12.6, gy - (d ? 8 : 12), 2.6); c.fill();
  if (!d) { c.globalAlpha = 0.35 + 0.25 * Math.sin(t * 3); c.fillStyle = '#c8b8ff'; ell(c, x + 12, gy - 2, 12, 3); c.fill(); }
  c.restore();
}
function drawWorld33(c, t, vis) {
  if (G.races) for (const r of G.races) {
    if (vis(r.x0 * T)) drawRaceBanner(c, r.x0, r.gy || 10 * T, 'СТАРТ', t);
    if (vis(r.x1 * T)) drawRaceBanner(c, r.x1, r.gy1 || 10 * T, 'ФІНІШ', t);
  }
  if (G.twins) for (const w of G.twins) if (vis(w.x * T + 12)) drawTwinMirror(c, w, t);
  if (G.splates) for (const p of G.splates) if (vis(p.x * T + 12)) drawShadowPlate(c, p, t);
  if (G.sgates) for (const g of G.sgates) if (vis(g.x * T + 12) && tileAt(g.x, 8) === 2) {
    drawDoorCol(c, g.x, 1, 'twin', '#6a4ab8', t);
    c.save(); c.fillStyle = '#fff6cc'; circ(c, g.x * T + 11, 8 * T + 12, 5); c.fill(); c.fillStyle = '#6a4ab8'; circ(c, g.x * T + 13.5, 8 * T + 10, 4.2); c.fill(); c.restore();
  }
  if (G.twin) drawTwin(c, G.twin, t);
  if (G.stickers) for (const s of G.stickers) if (vis(s.x)) drawStickerItem(c, s, t);
  if (G.races) for (const r of G.races) if (vis(r.b.x)) drawRacer(c, r, t);
  drawWorld34(c, t, vis);
}

/* ===== Кролик Фокус-Покус ===== */
function drawTopHat(c, x, y, wig, t) {
  c.save(); c.translate(x, y); if (wig > 0) c.rotate(Math.sin(t * 40) * 0.08);
  c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.5;
  c.fillStyle = '#2a2438'; rr(c, -16, -34, 32, 30, 3); c.fill(); c.stroke();
  c.fillStyle = '#3e3456'; rr(c, -13, -32, 6, 26, 2); c.fill();
  c.fillStyle = '#ff4f5e'; c.fillRect(-16, -12, 32, 6); c.strokeRect(-16, -12, 32, 6);
  c.fillStyle = '#ffe14d'; starPath(c, 0, -22, 5, 2.3, 0); c.fill();
  c.fillStyle = '#2a2438'; ell(c, 0, -3, 22, 4.5); c.fill(); c.stroke();
  c.restore();
}
function drawHatRabbit(c, x, y, pop, mood, t) {
  // кролик визирає з капелюха; mood: 'wave', 'dizzy', 'laugh', 'peek'
  const base = mood === 'peek' ? y - 10 : y - 12 + (1 - pop) * 26;
  c.save(); c.translate(x, base); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 1.4;
  c.fillStyle = '#ffffff'; ell(c, -6, -20, 3.6, 11, -0.2 + Math.sin(t * 3) * 0.05); c.fill(); c.stroke(); ell(c, 6, -21, 3.6, 11, 0.2); c.fill(); c.stroke();
  c.fillStyle = '#ffb3c6'; ell(c, -6, -20, 1.6, 7, -0.2); c.fill(); ell(c, 6, -21, 1.6, 7, 0.2); c.fill();
  if (mood !== 'peek') {
    c.fillStyle = '#ffffff'; circ(c, 0, -2, 10); c.fill(); c.stroke();
    if (mood === 'dizzy') { c.strokeStyle = INK; c.lineWidth = 1.1; for (const ex of [-4, 4]) { c.beginPath(); for (let a = 0; a < 8; a += 0.5) c.lineTo(ex + Math.cos(a + t * 8) * a * 0.32, -4 + Math.sin(a + t * 8) * a * 0.32); c.stroke(); } }
    else if (mood === 'laugh') { c.lineWidth = 1.4; c.beginPath(); c.arc(-4, -3, 2, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); c.beginPath(); c.arc(4, -3, 2, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); }
    else { c.fillStyle = INK; circ(c, -3.5, -3.5, 1.5); c.fill(); circ(c, 3.5, -3.5, 1.5); c.fill(); }
    c.fillStyle = '#ff9fc4'; ell(c, 0, 1, 1.8, 1.3); c.fill();
    c.strokeStyle = INK; c.lineWidth = 1.2; c.beginPath(); if (mood === 'laugh') { c.arc(0, 3.5, 3, 0, Math.PI); } else { c.moveTo(-2.5, 4); c.quadraticCurveTo(0, 6, 2.5, 4); } c.stroke();
    c.fillStyle = 'rgba(255,140,180,.55)'; circ(c, -6.5, 2, 2); c.fill(); circ(c, 6.5, 2, 2); c.fill();
    c.fillStyle = '#ff4f5e'; c.beginPath(); c.moveTo(0, 9); c.lineTo(-5, 6.5); c.lineTo(-5, 11.5); c.closePath(); c.moveTo(0, 9); c.lineTo(5, 6.5); c.lineTo(5, 11.5); c.closePath(); c.fill(); c.stroke();
    if (mood === 'wave') { c.save(); c.translate(10, 4); c.rotate(-0.8 + Math.sin(t * 8) * 0.4); c.fillStyle = '#2a2438'; rr(c, 0, -1.5, 14, 3, 1); c.fill(); c.fillStyle = '#ffffff'; c.fillRect(11, -1.5, 3, 3); c.restore(); }
  }
  c.restore();
  if (mood === 'dizzy') for (let i = 0; i < 3; i++) { const a = t * 4 + i * TAU / 3; c.save(); c.fillStyle = '#ffe14d'; c.strokeStyle = INK; c.lineWidth = 0.8; starPath(c, x + Math.cos(a) * 14, base - 32 + Math.sin(a) * 4, 4, 1.8, a); c.fill(); c.stroke(); c.restore(); }
  if (mood === 'laugh') txt24(c, 'Хі-хі!', x, base - 48, 10, '#a05ad8', '#ffffff', 2);
}
function drawHatBoss(c, B, t) {
  const gy = B.gy, rh = B.hats[B.hat];
  // кролик під капелюхом малюється до капелюха, щоб капелюх його ховав
  for (let i = 0; i < 3; i++) {
    const h = B.hats[i], hy = gy + h.y - h.lift * 48;
    if (i === B.hat && (B.pop > 0.02 || B.dead)) {
      const mood = B.dead ? 'wave' : B.state === 'found' ? 'dizzy' : B.state === 'miss' ? 'laugh' : 'wave';
      drawHatRabbit(c, h.x, gy, B.dead ? 1 : B.pop, mood, t);
    } else if (i === B.hat && B.state === 'pick' && B.peek) drawHatRabbit(c, h.x, gy, 0, 'peek', t);
    if (B.state === 'miss' && i === B.pick && h.lift > 0.3) { c.save(); c.globalAlpha = 0.5; txt24(c, '?', h.x, gy - 18, 14, '#a05ad8', '#ffffff', 2); c.restore(); }
    drawTopHat(c, h.x, hy, h.wig, t);
    if (B.state === 'pick' && !B.dead) { c.save(); c.globalAlpha = 0.35 + 0.25 * Math.sin(t * 5 + i); c.fillStyle = '#ffe14d'; ell(c, h.x, gy - 1, 22, 3); c.fill(); c.restore(); }
  }
  if (B.state === 'shuffle') for (const h of B.hats) if (h.y < -4) { c.save(); c.globalAlpha = 0.5; sparkle(c, h.x + 18, gy + h.y - 30, 3, '#ffe14d'); c.restore(); }
}
function drawDove(c, b) {
  const x = b.x, y = b.y, d = b.vx < 0 ? -1 : 1, f = Math.sin(b.t * 18);
  c.save(); c.translate(x, y); c.scale(d, 1); c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 1.2;
  c.fillStyle = '#ffffff'; ell(c, 0, 0, 9, 5.5); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-8, -1); c.lineTo(-14, -4); c.lineTo(-13, 2); c.closePath(); c.fill(); c.stroke();
  circ(c, 8, -3, 4); c.fill(); c.stroke();
  c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(11.5, -3); c.lineTo(15, -2); c.lineTo(11.5, -1); c.closePath(); c.fill();
  c.fillStyle = INK; circ(c, 9, -4, 0.9); c.fill();
  c.fillStyle = '#f0f4ff'; c.beginPath(); c.moveTo(-2, -2); c.quadraticCurveTo(0, -10 - f * 5, 5, -2); c.closePath(); c.fill(); c.stroke();
  c.restore();
}

/* ===== Декор ===== */
function drawDecor33(c, d, t) { }
