'use strict';
/* ===== Збереження ===== */
const SAVE_KEY = 'zoriana-ednorizhka-v1';
function defaultSave() { return { profile: { name: '', body: 'white', mane: 'rainbow', acc: ['crown', 'stars'], friend: 'cat', easy: false }, unlocked: 1, best: {}, bestR: {}, bestF: {}, record: 0, sound: true, finished: false }; }
let save = (() => { try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if (s && s.profile) { const d = defaultSave(); return Object.assign(d, s, { profile: Object.assign(d.profile, s.profile) }); } } catch (e) { } return defaultSave(); })();
(() => { const done = Object.keys(save.best || {}).map(Number).filter(n => !isNaN(n)); if (done.length) save.unlocked = Math.max(save.unlocked, Math.min(LEVELS.length, Math.max(...done) + 2)); })();
function writeSave() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { } }
Snd.on = save.sound !== false;

const $ = id => document.getElementById(id);
const cv = $('game'), ctx = cv.getContext('2d');
let dpr = 1, SW = 0, SH = 0, scale = 1, viewW = MIN_VIEW_W, bandY = 0, bandH = 0, ps = 1, padBelow = false;
const safe = { t: 0, r: 0, b: 0, l: 0 };
const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

function resize() {
  const cs = getComputedStyle($('safeProbe'));
  safe.t = parseFloat(cs.paddingTop) || 0; safe.r = parseFloat(cs.paddingRight) || 0; safe.b = parseFloat(cs.paddingBottom) || 0; safe.l = parseFloat(cs.paddingLeft) || 0;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  SW = window.innerWidth; SH = window.innerHeight;
  cv.width = Math.round(SW * dpr); cv.height = Math.round(SH * dpr);
  scale = Math.min(SH / VIEW_H, SW / MIN_VIEW_W);
  bandH = VIEW_H * scale;
  const spare = SH - bandH;
  padBelow = isTouch && spare > 190;
  bandY = padBelow ? safe.t + Math.min(30, (spare - 190) * 0.25) : spare / 2;
  viewW = SW / scale; ps = scale * dpr;
  const pad = $('pad');
  pad.classList.toggle('below', padBelow);
  pad.style.setProperty('--padTop', (bandY + bandH) + 'px');
  $('topBtns').style.top = Math.max(safe.t + 10, bandY + 10) + 'px';
  if (tileCache.size > 400) tileCache.clear();
  sizePreviews();
}

/* ===== Малювання гри ===== */
function drawMover(c, m, theme) {
  if (m.crumble) return drawCrumble(c, m, G.t, theme);
  if (m.balloon) return drawBalloonLift(c, m, G.t);
  if (drawMover2(c, m, theme)) return;
  if (theme === 'space') {
    c.fillStyle = '#9c93c9'; c.strokeStyle = INK; c.lineWidth = 1.6; rr(c, m.x, m.y + 2, m.w, 12, 6); c.fill(); c.stroke();
    c.fillStyle = '#7d73b3'; ell(c, m.x + m.w * 0.3, m.y + 8, 3.4, 2); c.fill(); ell(c, m.x + m.w * 0.72, m.y + 7, 2.4, 1.5); c.fill();
    c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(m.x + 4, m.y + 4, m.w - 8, 1.6);
    return;
  }
  const col = { forest: '#c9c1f0', castle: '#d7d0ef', palace: '#f6eeff', volcano: '#fff1f6' }[theme] || '#ffffff';
  const n = Math.max(2, Math.round(m.w / 12));
  c.strokeStyle = INK; c.lineWidth = 2.6;
  const puffs = []; for (let i = 0; i < n; i++) puffs.push([m.x + 6 + i * (m.w - 12) / (n - 1), m.y + 6, 6.5]);
  for (const p of puffs) { circ(c, p[0], p[1], p[2]); c.stroke(); }
  rr(c, m.x, m.y + 4, m.w, 9, 4.5); c.stroke();
  c.fillStyle = col; for (const p of puffs) { circ(c, p[0], p[1], p[2]); c.fill(); }
  rr(c, m.x, m.y + 4, m.w, 9, 4.5); c.fill();
  c.fillStyle = '#ffd86b'; starPath(c, m.x + m.w / 2, m.y + 8, 3.4, 1.6, 0); c.fill();
}

let darkCv = null;
function drawDarkness(c, by, bh, camPx, t) {
  if (!darkCv) darkCv = document.createElement('canvas');
  if (darkCv.width !== cv.width || darkCv.height !== bh) { darkCv.width = cv.width; darkCv.height = bh; }
  const d = darkCv.getContext('2d'), P = G.P;
  d.setTransform(1, 0, 0, 1, 0, 0); d.globalCompositeOperation = 'source-over';
  d.clearRect(0, 0, darkCv.width, darkCv.height); d.fillStyle = 'rgba(12,8,34,.78)'; d.fillRect(0, 0, darkCv.width, darkCv.height);
  d.globalCompositeOperation = 'destination-out'; d.setTransform(ps, 0, 0, ps, -camPx, 0);
  const vis = x => x > G.cam - 60 && x < G.cam + viewW + 60;
  const hole = (x, y, r, a) => { if (!vis(x)) return; const g = d.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(0.55, `rgba(0,0,0,${a * 0.75})`); g.addColorStop(1, 'rgba(0,0,0,0)'); d.fillStyle = g; d.beginPath(); d.arc(x, y, r, 0, TAU); d.fill(); };
  hole(P.x + P.w / 2, P.y + P.h / 2, 125 + Math.sin(t * 3) * 4, 1);
  if (save.profile.friend !== 'none') hole(G.friend.x, G.friend.y, 40, 0.7);
  for (const s of G.stars) if (!s.got) hole(s.x, s.y, s.rainbow ? 40 : 24, 0.85);
  for (const s of G.drops) if (!s.got) hole(s.x, s.y, 22, 0.8);
  for (const p of G.powers) if (!p.got) hole(p.x, p.y, 30, 0.85);
  for (const s of G.shots) hole(s.x, s.y, 46, 0.9);
  for (const k of G.checks) hole(k.x, k.gy - 30, 34, 0.6);
  for (const dd of G.decor) if (dd.k === 'mush' || dd.k === 'crystal') hole(dd.x, dd.y - 10, 30, 0.7);
  for (const e of G.enemies) if (e.k === 'ghost') hole(e.x + e.w / 2, e.y + e.h / 2, 30, 0.7);
  for (const sg of G.signs) hole(sg.x, sg.gy - 50, 46, 0.75);
  for (const b of G.buttons) hole(b.x, b.gy - 10, 26, 0.7);
  for (const l of G.lanterns) hole(l.x, l.y, l.lit ? 125 : 22, l.lit ? 1 : 0.6);
  for (const dd of G.decor) if (dd.k === 'firefly') hole(dd.x + Math.sin(t * 1.3 + dd.x) * 8, dd.y - 18 + Math.sin(t * 1.9 + dd.x * 0.3) * 8, 14, 0.7);
  for (let tx = Math.floor(G.cam / T) - 1; tx < (G.cam + viewW) / T + 1; tx++) for (let ty = 0; ty < ROWS; ty++) if (tileAt(tx, ty) === 7) hole(tx * T + 12, ty * T + 12, 26, 0.75);
  hole(G.gate.x, G.gate.gy - 30, 70, 0.9);
  for (const p of G.parts) if (p.k === 'starpop' || p.k === 'text') hole(p.x, p.y, 22, 0.8);
  for (const b of G.bolts) hole(b.x, b.y, 22, 0.7);
  c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(darkCv, 0, by);
  c.setTransform(ps, 0, 0, ps, -camPx, by);
}
function renderGame(dt) {
  const c = ctx, th = THEMES[G.theme], t = G.t;
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.fillStyle = th.panel; c.fillRect(0, 0, cv.width, cv.height);
  const by = Math.round(bandY * dpr), bh = Math.round(bandH * dpr);
  c.save(); c.beginPath(); c.rect(0, by, cv.width, bh); c.clip();
  c.setTransform(ps, 0, 0, ps, 0, by);
  drawBackground(c, G.theme, G.cam, viewW, t, G.flash);

  const camPx = Math.round(G.cam * ps);
  if (G.caramel) { c.setTransform(ps, 0, 0, ps, -camPx, by); drawCaramel(c, G.cam, viewW, t); }
  // плитки
  c.setTransform(1, 0, 0, 1, 0, 0);
  const x0 = Math.max(0, Math.floor(G.cam / T) - 1), x1 = Math.min(G.Wt - 1, Math.ceil((G.cam + viewW) / T) + 1);
  for (let tx = x0; tx <= x1; tx++) {
    const sx = Math.round(tx * T * ps) - camPx;
    for (let ty = 0; ty < ROWS; ty++) {
      const v = G.map[ty * G.Wt + tx]; if (!v || v === 5) continue;
      let kind, l = false, r = false;
      if (v === 1) { const up = ty > 0 ? G.map[(ty - 1) * G.Wt + tx] : 0; kind = (up === 1 || up === 2 || up === 5 || up === 12) ? 'fill' : 'top'; l = tileAt(tx - 1, ty) !== 1; r = tileAt(tx + 1, ty) !== 1; }
      else if (v === 2) kind = 'block';
      else if (v === 7) kind = 'qblock';
      else if (v === 8) kind = 'used';
      else if (v === 9) kind = G.sw ? 'pinkS' : 'pinkG';
      else if (v === 10) kind = G.sw ? 'blueG' : 'blueS';
      else if (v === 11) kind = (ty > 0 && G.map[(ty - 1) * G.Wt + tx] === 11) ? 'door' : 'doorTop';
      else if (v === 12) kind = 'bounce';
      else if (v === 13) kind = G.blinkOn && !(G.blinkWarn && Math.floor(t * 10) % 2) ? 'blinkOn' + (tx % 6) : 'blinkOff';
      else { kind = 'cloud'; l = tileAt(tx - 1, ty) !== 3; r = tileAt(tx + 1, ty) !== 3; }
      const bt = (v === 7 || v === 8 || v === 12) ? G.bumps.get(ty * G.Wt + tx) : 0;
      const bo = bt ? -Math.sin((0.18 - bt) / 0.18 * Math.PI) * 5 : 0;
      c.drawImage(tileSprite(G.theme, kind, l, r, ps), sx, by + Math.round((ty * T + bo) * ps));
    }
  }
  // світ
  c.setTransform(ps, 0, 0, ps, -camPx, by);
  const vis = (x, m) => x > G.cam - (m || 40) && x < G.cam + viewW + (m || 40);
  for (const b of G.belts) if (b.x < G.cam + viewW + 20 && b.x + b.w > G.cam - 20) drawBelt(c, b, t);
  for (const z of G.winds) if (z.x1 > G.cam - 20 && z.x0 < G.cam + viewW + 20) { if (z.cyc) drawGeyser(c, z, t, G.t); else drawWind(c, z, t, G.theme); }
  for (const w of G.wheels) if (vis(w.cx, w.r + 60)) drawWheelStruct(c, w, t, G.theme);
  for (const r of G.rails) if (r.x1 > G.cam - 40 && r.x0 < G.cam + viewW + 40) drawRails(c, r);
  for (const z of G.breezes) if (z.x1 > G.cam - 20 && z.x0 < G.cam + viewW + 20) drawBreeze(c, z, t);
  for (const d of G.decor) if (vis(d.x)) drawDecor(c, d, t);
  for (const v of G.vines) if (vis(v.x)) drawVine(c, v, t);
  for (const l of G.launchers) if (vis(l.x)) drawLauncher(c, l, t);
  for (const b of G.beans) if (vis(b.x)) drawBean(c, b, t);
  for (const z of G.zips) if (Math.max(z.x0, z.x1) > G.cam - 40 && Math.min(z.x0, z.x1) < G.cam + viewW + 40) drawZip(c, z, t);
  for (const l of G.lanterns) if (vis(l.x)) drawLanternObj(c, l, t);
  for (const m of G.movers) if (vis(m.x, 90)) drawMover(c, m, G.theme);
  for (const s of G.springs) if (vis(s.x)) drawSpring(c, s.x, s.gy, s.sq, G.theme);
  for (const p of G.portals) if (vis(p.x)) drawPortal(c, p, t);
  for (const b of G.buttons) if (vis(b.x)) drawButton(c, b, G.sw, t);
  for (const k of G.keys) if (!k.got && vis(k.x)) drawKey(c, k.x, k.y, k.t);
  for (const s of G.signs) if (vis(s.x, 80)) drawSign(c, s.x, s.gy, s.text.replace('{name}', nameOf()));
  for (const k of G.checks) if (vis(k.x)) drawCheck(c, k.x, k.gy, k.on, t);
  if (G.gate && vis(G.gate.x, 60)) {
    drawGate(c, G.gate.x, G.gate.gy, t, G.gate.open);
    if (!G.gate.open && !G.boss) {
      c.font = '900 10px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      const txt = G.points + ' / ' + G.need; const w = c.measureText(txt).width + 22;
      c.fillStyle = 'rgba(255,255,255,.92)'; rr(c, G.gate.x - w / 2, G.gate.gy - 76, w, 15, 7.5); c.fill(); c.strokeStyle = INK; c.lineWidth = 1; c.stroke();
      c.fillStyle = '#ffcf2e'; starPath(c, G.gate.x - w / 2 + 9, G.gate.gy - 68.5, 4.5, 2.1, 0); c.fill(); c.stroke();
      c.fillStyle = INK; c.fillText(txt, G.gate.x + 5, G.gate.gy - 68);
    }
  }
  for (const f of G.flowers) if (vis(f.x)) drawFlowerDecor(c, f.x, f.gy, f.col, Math.min(1, f.t * 4) * 0.9);
  for (const s of G.stars) if (!s.got && vis(s.x)) { if (s.rainbow) drawRainbowStar(c, s.x, s.y, t); else drawStar(c, s.x, s.y, s.t); }
  for (const s of G.drops) if (!s.got && vis(s.x)) drawStar(c, s.x, s.y, s.t, 6.5);
  for (const p of G.powers) if (!p.got && vis(p.x)) drawPower(c, p.x, p.y, p.k, p.t);
  for (const e of G.enemies) {
    if (!vis(e.x)) continue;
    const cx = e.x + e.w / 2, fl = e.flash > 0;
    if (e.k === 'snail') drawSnail(c, cx, e.y + e.h, e.dir, e.t, fl);
    else if (e.k === 'hedgehog') drawHedgehog(c, cx, e.y + e.h, e.dir, e.t);
    else if (e.k === 'cloud') drawGrump(c, cx, e.y + e.h / 2, e.t, fl);
    else if (e.k === 'crab') drawCrab(c, cx, e.y + e.h, e.dir, e.t, fl);
    else if (e.k === 'bee') drawBee(c, cx, e.y + e.h / 2, e.t, e.dir, fl);
    else if (e.k === 'ufo') drawUfo(c, cx, e.y + e.h / 2, e.t, fl);
    else if (e.k === 'fish') drawFish(c, cx, e.y + e.h / 2, e.t, e.dir, fl);
    else if (e.k === 'jelly') drawJelly(c, cx, e.y + e.h / 2, e.t, fl);
    else if (e.k === 'spark') drawSpark(c, cx, e.y + e.h / 2, e.t, e.state, e.st, e.vy);
    else if (e.k === 'mush') drawMushWalker(c, cx, e.y + e.h, e.dir, e.t, fl);
    else if (e.k === 'soldier') drawSoldier(c, cx, e.y + e.h, e.dir, e.t, fl);
    else if (e.k === 'mouse') drawMouse(c, cx, e.y + e.h, e.dir, e.t, fl);
    else if (e.k === 'scorp') drawScorp(c, cx, e.y + e.h, e.dir, e.t, fl);
    else if (e.k === 'squirrel') drawSquirrel(c, cx, e.y + e.h, e.dir, e.t, e.throwT > 0, fl);
    else if (e.k === 'cactus') drawCactus(c, cx, e.y + e.h, e.t);
    else if (e.k === 'bird') drawBird(c, cx, e.y + e.h / 2, e.t, e.dir, fl);
    else if (e.k === 'frog') drawFrog(c, cx, e.y + e.h, e.dir, e.t, e.air, fl);
    else if (e.k === 'ghost') drawGhost(c, cx, e.y + e.h / 2, e.t, e.dir, fl);
    else if (e.k === 'beetle') drawBeetle(c, cx, e.y + e.h, e.dir, e.t, fl);
    else if (drawEnemy2(c, e, cx, fl)) { }
    else drawBat(c, cx, e.y + e.h / 2, e.t, e.state === 'hang', fl);
  }
  const B = G.boss;
  if (B && (G.bossActive || B.dead || vis(B.x, 120))) {
    if (B.kind === 'hedge') drawBigHedgehog(c, B.x, B.gy, B.dir, B.t, B.state, B.flash > 0, B.rot);
    else if (B.kind === 'dragon') drawDragonBoss(c, B.x, B.y, B.t, B.state, B.dir, B.flash > 0, B.st);
    else if (B.kind === 'medusa') drawMedusa(c, B, B.t);
    else if (B.kind === 'robot') drawRobot(c, B, B.t);
    else if (B.kind === 'moleking') drawMoleKing(c, B, B.t);
    else if (B.kind === 'clock') drawClockBoss(c, B, B.t);
    else if (B.kind === 'wizard') {
      for (const cl of B.clones) if (!cl.dead) drawWizard(c, cl.x, cl.fy, B.t + 1.3, B.state === 'cast' ? 'laugh' : B.state, B.st, B.dir, cl.alpha, false, false);
      drawWizard(c, B.x, B.fy, B.t, B.state, B.st, B.dir, B.alpha, B.flash > 0, true);
    }
    else {
      c.save(); c.globalAlpha = B.alpha;
      drawBoss(c, B.x, B.y, B.t, B.flash > 0, B.dead ? 'happy' : 'angry');
      if (B.dead) for (let i = 0; i < 6; i++) { c.strokeStyle = RAINBOW[i]; c.lineWidth = 4; c.beginPath(); c.arc(B.x, B.y + 60, 90 - i * 4.5, Math.PI * 1.08, Math.PI * 1.92); c.stroke(); }
      c.restore();
    }
  }
  for (const b of G.bolts) { if (drawBolt2(c, b)) { } else if (b.kind === 'magic') drawMagic(c, b.x, b.y, b.t); else if (b.kind === 'puff') drawPuff(c, b.x, b.y, b.t); else if (b.kind === 'acorn') drawAcorn(c, b.x, b.y, b.t * 10); else if (b.spike) drawSpike(c, b.x, b.y, Math.atan2(b.vy, b.vx)); else drawBolt(c, b.x, b.y, b.t); }

  const P = G.P;
  if (save.profile.friend === 'cat') drawCat(c, G.friend.x, G.friend.y, G.friend.dir, G.friend.t);
  else if (save.profile.friend === 'dragon') drawDragon(c, G.friend.x, G.friend.y, G.friend.dir, G.friend.t);
  const pcx = P.x + P.w / 2;
  if (P.shield) {
    c.save(); c.globalAlpha = 0.55 + Math.sin(t * 6) * 0.15;
    for (let i = 0; i < 3; i++) { c.strokeStyle = RAINBOW[(i * 2 + Math.floor(t * 4)) % 6]; c.lineWidth = 1.6; circ(c, pcx, P.y + 10, 27 - i * 2); c.stroke(); }
    c.restore();
  }
  const blinkHide = P.inv > 0 && Math.floor(P.inv * 14) % 2 === 0;
  if (!P.inCannon) {
  const cartM = P.ride || (P.onMover && P.onMover.cart ? P.onMover : null);
  drawUnicorn(c, { x: pcx, y: P.y + P.h + 1, dir: P.dir, t: P.t, run: P.onGround ? Math.min(1, Math.abs(P.vx) / SPEED) : 0, air: !P.onGround, s: P.mini ? 0.42 : 0.8, prof: save.profile, charge: P.charging ? Math.min(1, P.charge / 0.55) : 0, blink: P.blink > 0, powerWings: P.wingsT > 0, alpha: blinkHide ? 0.35 : 1 });
  if (cartM) cartBody(c, cartM);
  // ім'я над головою
  c.font = '900 9px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  const nm = nameOf(), nw = c.measureText(nm).width + 10, ny = P.y - (P.mini ? 12 : 19);
  c.fillStyle = 'rgba(255,255,255,.9)'; rr(c, pcx - nw / 2, ny - 6.5, nw, 13, 6.5); c.fill();
  c.strokeStyle = '#ff4fa3'; c.lineWidth = 1; c.stroke();
  c.fillStyle = INK; c.fillText(nm, pcx, ny + 0.5);
  }

  for (const z of G.water) drawWater(c, z, G.cam, viewW, t);
  for (const s of G.shots) {
    const g = c.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 1.8);
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.45, s.big ? '#ff9ad0' : '#fff0a0'); g.addColorStop(1, s.big ? 'rgba(180,120,255,0)' : 'rgba(255,200,120,0)');
    c.fillStyle = g; circ(c, s.x, s.y, s.r * 1.8); c.fill();
    if (s.big) { for (let i = 0; i < 6; i++) { c.strokeStyle = RAINBOW[i]; c.lineWidth = 1.2; c.beginPath(); c.arc(s.x, s.y, s.r - i * 1.2, s.t * 12 + i, s.t * 12 + i + 2.2); c.stroke(); } }
    else sparkle(c, s.x, s.y, 2.2, '#fff');
  }
  for (const p of G.parts) {
    const k = 1 - p.t / p.life;
    if (p.k === 'spark') { c.globalAlpha = k; sparkle(c, p.x, p.y, p.r * (0.6 + k * 0.4), p.col); }
    else if (p.k === 'puff') { c.globalAlpha = k * 0.7; c.fillStyle = '#fff'; circ(c, p.x - 5 - (1 - k) * 6, p.y - 2, p.r * (1.2 - k * 0.4)); c.fill(); circ(c, p.x + 5 + (1 - k) * 6, p.y - 2, p.r * (1.2 - k * 0.4)); c.fill(); }
    else if (p.k === 'starpop') { c.globalAlpha = Math.min(1, k * 2); drawStar(c, p.x, p.y, p.t * 3, 7); }
    else if (p.k === 'wind') { c.globalAlpha = k * 0.8; c.strokeStyle = '#ffffff'; c.lineWidth = 2; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x - p.dir * 18, p.y); c.stroke(); }
    else if (p.k === 'bubble') { c.globalAlpha = k * 0.85; c.strokeStyle = '#ffffff'; c.lineWidth = 1; circ(c, p.x + Math.sin(p.t * 8) * 1.5, p.y, p.r); c.stroke(); }
    else if (p.k === 'note') drawPart2(c, p, k);
    else if (p.k === 'text') { c.globalAlpha = k; c.font = '900 12px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.lineWidth = 3; c.lineJoin = 'round'; c.strokeStyle = '#fff'; c.strokeText(p.text, p.x, p.y); c.fillStyle = p.col; c.fillText(p.text, p.x, p.y); }
    c.globalAlpha = 1;
  }
  for (const f of G.flys) { c.globalAlpha = Math.min(1, (4 - f.t)); drawButterfly(c, f.x, f.y, f.t, f.col); c.globalAlpha = 1; }
  if (G.dark) drawDarkness(c, by, bh, camPx, t);
  c.restore();
  drawHud(c);
}

function hudPill(c, x, y, w, h, fill) { c.fillStyle = fill || 'rgba(255,255,255,.9)'; rr(c, x, y, w, h, h / 2); c.fill(); c.strokeStyle = 'rgba(59,31,79,.25)'; c.lineWidth = 2; c.stroke(); }
function drawHud(c) {
  const P = G.P;
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  const top = Math.max(safe.t + 10, bandY + 10), left = Math.max(12, safe.l + 10), H = 38;
  c.textBaseline = 'middle'; c.textAlign = 'left';
  // ім'я та серця
  c.font = '900 16px Nunito, system-ui, sans-serif';
  const nm = nameOf(), fullW = Math.min(c.measureText(nm).width, 140);
  const narrow = left + fullW + 22 + 72 + 10 + 120 > SW - 120;
  const nmW = narrow ? 0 : fullW;
  const w1 = (narrow ? 12 : nmW + 22) + 3 * 22 + (P.shield ? 24 : 0) + 6;
  hudPill(c, left, top, w1, H);
  let x = left + 14;
  if (!narrow) { c.fillStyle = INK; c.save(); c.beginPath(); c.rect(x, top, nmW, H); c.clip(); c.fillText(nm, x, top + H / 2 + 1); c.restore(); x += nmW + 10; }
  for (let i = 0; i < 3; i++) {
    heartPath(c, x + 9, top + H / 2, 17);
    if (i < P.hearts) { c.fillStyle = '#ff4f86'; c.fill(); c.strokeStyle = '#b8174f'; c.lineWidth = 1.6; c.stroke(); c.fillStyle = 'rgba(255,255,255,.7)'; circ(c, x + 5.5, top + H / 2 - 3, 2); c.fill(); }
    else { c.fillStyle = 'rgba(59,31,79,.12)'; c.fill(); c.strokeStyle = 'rgba(59,31,79,.35)'; c.lineWidth = 1.6; c.stroke(); }
    x += 22;
  }
  if (P.shield) { for (let i = 0; i < 4; i++) { c.strokeStyle = RAINBOW[i]; c.lineWidth = 2; c.beginPath(); c.arc(x + 9, top + H / 2 + 4, 9 - i * 2, Math.PI, TAU); c.stroke(); } }
  // зірочки
  c.font = '900 17px Nunito, system-ui, sans-serif';
  const open = G.gate.open;
  const txt = G.boss ? String(G.points) : (open ? G.points + '' : G.points + ' / ' + G.need);
  const tw = c.measureText(txt).width;
  const x2 = left + w1 + 10, w2 = tw + 46 + (open && !G.boss ? 30 : 0);
  hudPill(c, x2, top, w2, H, open && !G.boss ? 'rgba(220,255,240,.95)' : null);
  c.fillStyle = '#ffcf2e'; starPath(c, x2 + 20, top + H / 2 + 1, 10, 4.6, 0); c.fill(); c.strokeStyle = '#c98200'; c.lineWidth = 1.6; c.stroke();
  c.fillStyle = INK; c.fillText(txt, x2 + 36, top + H / 2 + 1);
  if (open && !G.boss) { c.save(); c.translate(x2 + 36 + tw + 16, top + H / 2 + 8); c.scale(0.42, 0.42); for (let i = 0; i < 4; i++) { c.strokeStyle = RAINBOW[i]; c.lineWidth = 4; c.beginPath(); c.arc(0, 0, 22 - i * 4, Math.PI, TAU); c.stroke(); } c.restore(); }
  if (G.hasDoors) {
    const x3 = x2 + w2 + 10, kt = String(G.keysHeld), kw = c.measureText(kt).width + 50;
    hudPill(c, x3, top, kw, H, G.keysHeld > 0 ? 'rgba(255,246,200,.95)' : null);
    c.save(); c.translate(x3 + 6, 0); drawKey(c, 14, top + H / 2, 0); c.restore();
    c.fillStyle = INK; c.textAlign = 'left'; c.fillText(kt, x3 + 38, top + H / 2 + 1);
  }
  // бонуси з таймером
  let px = left, py = top + H + 8;
  for (const [k, v, max] of [['wings', P.wingsT, 10], ['candy', P.candyT, 15], ['magnet', P.magnetT, 12], ['mini', P.mini ? P.miniT : 0, 14]]) {
    if (v <= 0) continue;
    c.fillStyle = 'rgba(255,255,255,.9)'; circ(c, px + 17, py + 17, 17); c.fill();
    c.strokeStyle = '#ff4fa3'; c.lineWidth = 3.5; c.beginPath(); c.arc(px + 17, py + 17, 15, -Math.PI / 2, -Math.PI / 2 + TAU * (v / max)); c.stroke();
    c.save(); c.translate(px + 17, py + 17); c.scale(1.3, 1.3); drawPowerIcon(c, k, 0); c.restore();
    px += 42;
  }
  // бос
  const B = G.boss;
  if (B && G.bossActive && !B.dead) {
    const bw = Math.min(280, SW * 0.6), bx = (SW - bw) / 2, byy = top + H + 12;
    c.font = '900 13px Nunito, system-ui, sans-serif'; c.textAlign = 'center';
    c.lineWidth = 3; c.lineJoin = 'round'; c.strokeStyle = 'rgba(42,22,64,.7)'; c.strokeText(B.name, SW / 2, byy); c.fillStyle = '#fff'; c.fillText(B.name, SW / 2, byy);
    hudPill(c, bx, byy + 10, bw, 16, 'rgba(42,22,64,.7)');
    const g = c.createLinearGradient(bx, 0, bx + bw, 0); RAINBOW.forEach((col, i) => g.addColorStop(i / 5, col));
    c.fillStyle = g; rr(c, bx + 3, byy + 13, Math.max(10, (bw - 6) * B.hp / B.max), 10, 5); c.fill();
  }
  // повідомлення
  if (G.msg) {
    const a = Math.min(1, G.msg.t * 3);
    c.font = '900 17px Nunito, system-ui, sans-serif'; c.textAlign = 'center';
    const lines = wrapText(c, G.msg.text, Math.min(SW - 60, 520));
    const mw = Math.max(...lines.map(l => c.measureText(l).width)) + 36, mh = lines.length * 22 + 16;
    const my = bandY + bandH * 0.3;
    c.globalAlpha = a; hudPill(c, SW / 2 - mw / 2, my - mh / 2, mw, mh, 'rgba(255,255,255,.95)');
    c.fillStyle = INK; lines.forEach((l, i) => c.fillText(l, SW / 2, my - mh / 2 + 19 + i * 22));
    c.globalAlpha = 1;
  }
}

/* ===== Прев'ю єдиноріжки в меню ===== */
const previews = [];
function sizePreviews() { for (const p of previews) { const r = p.cv.getBoundingClientRect(); if (r.width) { p.cv.width = Math.round(r.width * dpr); p.cv.height = Math.round(r.height * dpr); } } }
function renderPreview(p, t) {
  const c = p.cv.getContext('2d'), W = p.cv.width, H = p.cv.height; if (!W) return;
  c.setTransform(1, 0, 0, 1, 0, 0);
  const k = H / 150; c.setTransform(k, 0, 0, k, 0, 0); const vw = W / k;
  const g = c.createLinearGradient(0, 0, 0, 150); g.addColorStop(0, '#ffcfe7'); g.addColorStop(1, '#fff2df'); c.fillStyle = g; c.fillRect(0, 0, vw + 1, 150);
  for (let i = 0; i < 3; i++) puffCloud(c, ((i * 120 + t * 6) % (vw + 120)) - 60, 26 + i * 12, 0.7, 'rgba(255,255,255,.9)');
  c.fillStyle = '#c6efbd'; c.beginPath(); c.moveTo(0, 150); for (let x = 0; x <= vw + 8; x += 8) c.lineTo(x, 118 + Math.sin(x * 0.03) * 5); c.lineTo(vw, 150); c.fill();
  c.fillStyle = '#7ddc7e'; c.fillRect(0, 128, vw + 1, 22); c.fillStyle = '#f5a3c7'; c.fillRect(0, 136, vw + 1, 14);
  for (let x = 2; x < vw + 4; x += 5) { c.fillStyle = '#7ddc7e'; circ(c, x, 136, 2.6); c.fill(); }
  const s = p.big ? 1.9 : 1.6, cx = vw / 2 + 14, gy = 132;
  const blink = (t % 3.2) < 0.12;
  if (save.profile.friend !== 'none') {
    c.save(); c.translate(cx - 31 * s, gy - 36 * s + Math.sin(t * 3) * 3); c.scale(s * 0.85, s * 0.85);
    if (save.profile.friend === 'cat') drawCat(c, 0, 0, 1, t); else drawDragon(c, 0, 0, 1, t);
    c.restore();
  }
  drawUnicorn(c, { x: cx, y: gy, dir: 1, t, run: 0, s, prof: save.profile, blink });
  const nm = (save.profile.name || '').trim();
  if (nm) {
    c.font = '900 12px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    const w = Math.min(vw - 10, c.measureText(nm).width + 16), y = gy - 47.5 * s - 12;
    c.fillStyle = 'rgba(255,255,255,.95)'; rr(c, cx + 4 * s - w / 2, y - 9, w, 18, 9); c.fill(); c.strokeStyle = '#ff4fa3'; c.lineWidth = 1.5; c.stroke();
    c.fillStyle = INK; c.fillText(nm, cx + 4 * s, y + 1, w - 10);
  }
}

/* ===== Екрани ===== */
const screens = ['scrCreate', 'scrMap', 'scrPause', 'scrWin', 'scrLose', 'scrFinal'];
function show(id) { for (const s of screens) $(s).hidden = s !== id; }
function setPlayUi(on) { $('topBtns').hidden = !on; $('pad').hidden = !(on && isTouch); }

function chipGroup(el, items, isOn, onPick) {
  el.innerHTML = '';
  for (const it of items) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = it.label; b.id = el.id + '_' + it.id;
    b.setAttribute('aria-pressed', isOn(it.id) ? 'true' : 'false');
    b.onclick = () => { onPick(it.id); refreshCreate(); };
    el.appendChild(b);
  }
}
function swatchGroup(el, map, key, bg) {
  el.innerHTML = '';
  for (const id of Object.keys(map)) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'sw'; b.id = el.id + '_' + id;
    b.style.background = bg(id); b.setAttribute('aria-label', map[id].label); b.title = map[id].label;
    b.setAttribute('aria-pressed', save.profile[key] === id ? 'true' : 'false');
    b.onclick = () => { save.profile[key] = id; writeSave(); refreshCreate(); };
    el.appendChild(b);
  }
}
function refreshCreate() {
  const pr = save.profile;
  swatchGroup($('swBody'), BODY, 'body', id => BODY[id].f);
  swatchGroup($('swMane'), MANE, 'mane', id => id === 'rainbow' ? 'conic-gradient(' + RAINBOW.concat(RAINBOW[0]).join(',') + ')' : 'linear-gradient(135deg,' + MANE[id].c.join(',') + ')');
  chipGroup($('chAcc'), ACC, id => pr.acc.indexOf(id) >= 0, id => {
    const i = pr.acc.indexOf(id);
    if (i >= 0) pr.acc.splice(i, 1);
    else { pr.acc.push(id); if (id === 'crown') pr.acc = pr.acc.filter(a => a !== 'flowers'); if (id === 'flowers') pr.acc = pr.acc.filter(a => a !== 'crown'); }
    writeSave();
  });
  chipGroup($('chFriend'), FRIENDS, id => pr.friend === id, id => { pr.friend = id; writeSave(); });
  chipGroup($('chMode'), [{ id: 'normal', label: 'Звичайна гра' }, { id: 'easy', label: 'Без програшу' }], id => (id === 'easy') === !!pr.easy, id => { pr.easy = id === 'easy'; writeSave(); });
  $('modeHint').textContent = pr.easy ? 'Серця не закінчуються: можна грати спокійно і нічого не боятися.' : 'Коли серця закінчаться, можна продовжити з останнього прапорця.';
}
function showCreate() {
  mode = 'create'; Music.stop(); setPlayUi(false); show('scrCreate');
  $('inName').value = save.profile.name || ''; refreshCreate(); requestAnimationFrame(sizePreviews);
}
const PARTS = ['Король Похмурої Хмари', 'Пан Колючка', 'Дракон Чхун', 'Чарівник Плутанко', 'Медуза Желейка', 'Робот Брязкало', 'Король Кротів Копайло', 'Будильник Дзеленчик'];
function showMap() {
  mode = 'map'; Music.stop(); setPlayUi(false); show('scrMap');
  $('mapName').textContent = nameOf();
  const starSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.2 6.7.8-5 4.6 1.4 6.7L12 17.4l-6 3.4 1.4-6.7-5-4.6 6.7-.8z" fill="#ffcf2e" stroke="#c98200" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  $('recordPill').innerHTML = starSvg + 'Рекорд: ' + (save.record || 0);
  const ol = $('worlds'); ol.innerHTML = '';
  LEVELS.forEach((lv, i) => {
    if (i % 5 === 0 && PARTS[i / 5]) { const h = document.createElement('li'); h.className = 'part'; h.textContent = 'Частина ' + (i / 5 + 1) + ' · ' + PARTS[i / 5]; ol.appendChild(h); }
    const li = document.createElement('li'), b = document.createElement('button'); b.type = 'button'; b.className = 'world'; b.id = 'world_' + i;
    const locked = i + 1 > save.unlocked, best = save.best[i];
    if (locked) b.disabled = true;
    const status = locked ? 'Відкриється після країни ' + i : (best != null ? 'Пройдено · найкраще ' + best + ' ' + starWord(best) : (i >= 5 ? 'Нова країна!' : 'Можна грати'));
    b.innerHTML = '<span class="thumb"><canvas></canvas><span class="num">' + (i + 1) + '</span>' + (locked ? '<span class="lock"><svg viewBox="0 0 24 24"><rect x="4.5" y="10" width="15" height="11" rx="3" fill="#fff" stroke="#3b1f4f" stroke-width="1.8"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" fill="none" stroke="#fff" stroke-width="3"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" fill="none" stroke="#3b1f4f" stroke-width="1.6"/><circle cx="12" cy="15.5" r="1.8" fill="#3b1f4f"/></svg></span>' : '') + '</span>'
      + '<span class="wbody"><span class="wname"></span><span class="wblurb"></span><span class="wstat"></span></span>';
    b.querySelector('.wname').textContent = lv.name; b.querySelector('.wblurb').textContent = lv.blurb; b.querySelector('.wstat').textContent = status;
    b.onclick = () => { if (!locked) startPlay(i); };
    li.appendChild(b); ol.appendChild(li);
  });
  requestAnimationFrame(() => {
    sizePreviews();
    ol.querySelectorAll('canvas').forEach((cn, i) => {
      const r = cn.getBoundingClientRect(); cn.width = Math.round(r.width * dpr); cn.height = Math.round(r.height * dpr);
      const c = cn.getContext('2d'), k = cn.height / VIEW_H; c.setTransform(k, 0, 0, k, 0, 0);
      drawBackground(c, LEVELS[i].theme, 400, cn.width / k, 3, 0);
      const th = THEMES[LEVELS[i].theme]; c.fillStyle = th.top; c.fillRect(0, 238, cn.width / k + 1, 8); c.fillStyle = th.fill; c.fillRect(0, 244, cn.width / k + 1, 50);
      c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 238); c.lineTo(cn.width / k + 1, 238); c.stroke();
      drawStar(c, cn.width / k * 0.7, 150, 0.2, 16);
    });
  });
  $('rotateTip').hidden = !(isTouch && SH > SW);
  $('keysHint').hidden = isTouch;
}
function startPlay(i) {
  Snd.init(); fonts();
  startLevel(i); mode = 'play'; show(null); setPlayUi(true); resetTouch();
}
function pauseGame() { if (mode !== 'play') return; mode = 'pause'; resetTouch(); $('pauseText').textContent = nameOf() + ' чекає. ' + LEVELS[G.idx].name + ': ' + G.points + ' ' + starWord(G.points) + '.'; show('scrPause'); }
function resumeGame() { Snd.init(); mode = 'play'; show(null); }
function showWin() {
  const i = G.idx;
  save.bestR[i] = Math.max(save.bestR[i] || 0, G.rainbows); save.bestF[i] = Math.max(save.bestF[i] || 0, G.defeated); writeSave();
  if (i === LEVELS.length - 1) {
    mode = 'final'; setPlayUi(false);
    $('finalText').textContent = nameOf() + ' пройшла всі країни! ' + PARTS.join(', ').replace(/, ([^,]*)$/, ' і $1') + ' тепер друзі, а веселка сяє в небі.';
    const sum = o => Object.values(o).reduce((a, b) => a + b, 0);
    $('fStars').textContent = save.record; $('fRain').textContent = sum(save.bestR); $('fFoes').textContent = sum(save.bestF);
    show('scrFinal'); return;
  }
  mode = 'win'; setPlayUi(false);
  $('winTitle').textContent = nameOf() + ' пройшла рівень!';
  $('winText').textContent = LEVELS[i].name + ' позаду. Наступна країна: ' + LEVELS[i + 1].name + '.';
  if (i === 4) { $('winTitle').textContent = 'Веселка повернулася!'; $('winText').textContent = 'Король Похмурої Хмари подобрішав. Але Пан Колючка заховав чарівні зірочки в нових країнах. Наступна країна: ' + LEVELS[5].name + '.'; }
  if (i === 14) { $('winTitle').textContent = 'Дракон Чхун одужав!'; $('winText').textContent = 'Але Чарівник Плутанко все переплутав: скриньки, двері й мости в нових країнах. Наступна країна: ' + LEVELS[15].name + '.'; }
  if (i === 19) { $('winTitle').textContent = 'Плутанко тепер добрий чарівник!'; $('winText').textContent = 'Але Медуза Желейка сховала зірочки у свої бульбашки й розпустила їх по нових країнах. Наступна країна: ' + LEVELS[20].name + '.'; }
  if (i === 34) { $('winTitle').textContent = 'Копайло тепер копає тунелі для потягів!'; $('winText').textContent = 'Але Будильник Дзеленчик не дає нікому спати: він розбудив зірочки, і вони порозбігалися по нових країнах. Наступна країна: ' + LEVELS[35].name + '.'; }
  if (i === 29) { $('winTitle').textContent = 'Робот Брязкало тепер майструє іграшки!'; $('winText').textContent = 'Але Король Кротів Копайло прорив тунелі й затягнув зірочки під землю. Наступна країна: ' + LEVELS[30].name + '.'; }
  if (i === 24) { $('winTitle').textContent = 'Медуза Желейка подобрішала!'; $('winText').textContent = 'Але Робот Брязкало забирає всі зірочки на свою фабрику. Треба його зупинити! Наступна країна: ' + LEVELS[25].name + '.'; }
  if (i === 9) { $('winTitle').textContent = 'Пан Колючка тепер добрий!'; $('winText').textContent = 'Але Дракон Чхун застудився, і його «Апчхи!» розвіяло зірочки по нових країнах. Наступна країна: ' + LEVELS[10].name + '.'; }
  $('sStars').textContent = G.points; $('sRain').textContent = G.rainbows; $('sFoes').textContent = G.defeated;
  show('scrWin');
}
function showLose() {
  mode = 'lose'; setPlayUi(false); resetTouch();
  $('loseText').textContent = nameOf() + ' трохи втомилася. Зібрані зірочки залишаються з тобою.';
  show('scrLose');
}
function continueFromCheck() {
  const P = G.P; P.zip = null; P.ride = null; P.vine = null; P.hearts = 3; P.x = P.check.x; P.y = P.check.y; P.vx = P.vy = 0; P.inv = 2; P.safe = { x: P.x, y: P.y };
  if (G.bossActive && G.boss && !G.boss.dead) { G.bolts = []; if (G.boss.kind === 'hedge') { G.boss.state = 'walk'; G.boss.st = 0; G.boss.x = Math.max(G.boss.x, G.arena.x0 + 14 * T); } if (G.boss.kind === 'dragon') { G.boss.state = 'takeoff'; G.boss.st = 0; G.gust = null; } resetBoss2(G.boss); }
  mode = 'play'; show(null); setPlayUi(true);
}
function soundIcon() {
  const on = Snd.on;
  $('btnSound').innerHTML = on
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9.5l5 5M20.5 9.5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  $('btnSound').setAttribute('aria-label', on ? 'Вимкнути звук' : 'Увімкнути звук');
  $('btnSound2').textContent = on ? 'Вимкнути звук' : 'Увімкнути звук';
}
function toggleSound() { Snd.on = !Snd.on; save.sound = Snd.on; writeSave(); if (Snd.on) Snd.init(); soundIcon(); }
let fontsAsked = false;
function fonts() { if (fontsAsked || !document.fonts) return; fontsAsked = true; try { document.fonts.load('900 16px Nunito'); document.fonts.load('700 16px Comfortaa'); } catch (e) { } }

/* ===== Обробники ===== */
$('inName').addEventListener('input', e => { save.profile.name = e.target.value.slice(0, 14); $('nameErr').hidden = true; writeSave(); });
$('inName').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
$('btnGo').onclick = () => {
  const nm = (save.profile.name || '').trim();
  if (!nm) { $('nameErr').hidden = false; $('inName').focus(); return; }
  save.profile.name = nm; writeSave(); Snd.init(); showMap();
};
$('btnEdit').onclick = showCreate;
$('btnPause').onclick = pauseGame;
$('btnSound').onclick = toggleSound;
$('btnSound2').onclick = toggleSound;
$('btnResume').onclick = resumeGame;
$('btnRestart').onclick = () => startPlay(G.idx);
$('btnToMap').onclick = showMap;
$('btnNext').onclick = () => startPlay(Math.min(LEVELS.length - 1, G.idx + 1));
$('btnWinMap').onclick = showMap;
$('btnContinue').onclick = continueFromCheck;
$('btnLoseRestart').onclick = () => startPlay(G.idx);
$('btnLoseMap').onclick = showMap;
$('btnFinalMap').onclick = showMap;

const KEYMAP = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'jump', KeyW: 'jump', Space: 'jump', KeyX: 'shoot', KeyJ: 'shoot', KeyK: 'shoot' };
window.addEventListener('keydown', e => {
  if (mode !== 'play') { if ((e.code === 'Escape' || e.code === 'KeyP') && mode === 'pause') resumeGame(); return; }
  if (e.code === 'Escape' || e.code === 'KeyP') { pauseGame(); return; }
  const k = KEYMAP[e.code]; if (!k) return;
  e.preventDefault(); Snd.init();
  if (k === 'jump' && !Keys.jump) Keys.jumpTap = true;
  Keys[k] = true;
});
window.addEventListener('keyup', e => { const k = KEYMAP[e.code]; if (k) Keys[k] = false; });
window.addEventListener('blur', () => { for (const k of ['left', 'right', 'jump', 'shoot']) Keys[k] = false; resetTouch(); });

function resetTouch() { Touch.dir = 0; Touch.jump = false; Touch.shoot = false; dpadId = null; for (const id of ['bLeft', 'bRight', 'bJump', 'bHorn']) $(id).classList.remove('on'); }
let dpadId = null;
function dpadAt(e) {
  const l = $('bLeft').getBoundingClientRect(), r = $('bRight').getBoundingClientRect();
  const mid = (l.right + r.left) / 2;
  Touch.dir = e.clientX < mid ? -1 : 1;
  $('bLeft').classList.toggle('on', Touch.dir < 0); $('bRight').classList.toggle('on', Touch.dir > 0);
}
const dpad = $('dpad');
dpad.addEventListener('pointerdown', e => { e.preventDefault(); Snd.init(); dpadId = e.pointerId; try { dpad.setPointerCapture(e.pointerId); } catch (_) { } dpadAt(e); });
dpad.addEventListener('pointermove', e => { if (e.pointerId === dpadId) dpadAt(e); });
for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) dpad.addEventListener(ev, e => { if (e.pointerId === dpadId) { dpadId = null; Touch.dir = 0; $('bLeft').classList.remove('on'); $('bRight').classList.remove('on'); } });
function holdButton(id, key) {
  const el = $(id); let pid = null;
  el.addEventListener('pointerdown', e => { e.preventDefault(); Snd.init(); pid = e.pointerId; try { el.setPointerCapture(e.pointerId); } catch (_) { } if (key === 'jump') Touch.jumpTap = true; Touch[key] = true; el.classList.add('on'); });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) el.addEventListener(ev, e => { if (e.pointerId === pid) { pid = null; Touch[key] = false; el.classList.remove('on'); } });
}
holdButton('bJump', 'jump'); holdButton('bHorn', 'shoot');
$('pad').addEventListener('contextmenu', e => e.preventDefault());
/* Захист від випадкового збільшення екрана: діти тиснуть двома пальцями одразу або двічі поспіль */
for (const ev of ['gesturestart', 'gesturechange', 'gestureend']) document.addEventListener(ev, e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault());
document.addEventListener('touchmove', e => { if (e.touches.length > 1 || mode === 'play') e.preventDefault(); }, { passive: false });
let lastTouchEnd = 0;
document.addEventListener('touchend', e => {
  const now = performance.now();
  if (now - lastTouchEnd < 380 && e.target.closest && e.target.closest('#pad, #game, #topBtns')) e.preventDefault();
  lastTouchEnd = now;
}, { passive: false });
/* Якщо екран усе ж збільшився — ставимо гру на паузу й повертаємо звичайний масштаб */
let zoomFix = false;
function zoomGuard() {
  const vv = window.visualViewport;
  if (!vv || vv.scale < 1.03) return;
  if (mode === 'play') pauseGame();
  const meta = document.querySelector('meta[name=viewport]');
  if (meta) { zoomFix = !zoomFix; meta.setAttribute('content', 'width=device-width, initial-scale=1' + (zoomFix ? '.0' : '') + ', minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'); }
}
if (window.visualViewport) { visualViewport.addEventListener('resize', zoomGuard); setInterval(zoomGuard, 1500); }
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 200));

/* ===== Головний цикл ===== */
previews.push({ cv: $('preview'), big: true }, { cv: $('mapPreview'), big: false });
let last = performance.now(), accum = 0, clock = 0;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000); last = now; clock += dt;
  if (mode === 'play') { accum += dt; let n = 0; while (accum >= STEP && n < 4) { pollInput(); update(STEP); accum -= STEP; n++; } if (n === 4) accum = 0; }
  else if (G && (mode === 'win' || mode === 'final')) update(dt);
  if (G && (mode === 'play' || mode === 'pause' || mode === 'win' || mode === 'lose' || mode === 'final')) renderGame(dt);
  else { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#2a1640'; ctx.fillRect(0, 0, cv.width, cv.height); }
  if (mode === 'create') renderPreview(previews[0], clock);
  if (mode === 'map') renderPreview(previews[1], clock);
}
soundIcon();
resize();
if ((save.profile.name || '').trim()) showMap(); else showCreate();
requestAnimationFrame(frame);
