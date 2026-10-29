'use strict';
/* ===== Звук: усе синтезоване через Web Audio ===== */
const Snd = {
  ctx: null, master: null, on: true,
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    try { const C = window.AudioContext || window.webkitAudioContext; this.ctx = new C(); this.master = this.ctx.createGain(); this.master.gain.value = 0.55; this.master.connect(this.ctx.destination); } catch (e) { this.ctx = null; }
  },
  tone(f, d, type, v, f2, delay) {
    if (!this.on || !this.ctx || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime + (delay || 0), o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v || 0.1, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + d + 0.03);
  },
  seq(notes, base, gap, type, v) { notes.forEach((s, i) => this.tone(base * Math.pow(2, s / 12), 0.2, type || 'triangle', v || 0.12, null, i * gap)); },
  jump() { this.tone(330, 0.16, 'square', 0.05, 700); },
  flap() { this.tone(260, 0.12, 'sine', 0.09, 480); },
  star(n) { const f = 988 * Math.pow(2, (n % 8) * 2 / 12); this.tone(f, 0.1, 'triangle', 0.13); this.tone(f * 1.5, 0.12, 'triangle', 0.08, null, 0.05); },
  rainbow() { this.seq([0, 4, 7, 12, 16, 19], 784, 0.05, 'triangle', 0.12); },
  shoot() { this.tone(1300, 0.09, 'sine', 0.07, 2100); },
  charged() { this.tone(700, 0.12, 'triangle', 0.06, 1400); },
  big() { this.tone(420, 0.35, 'sawtooth', 0.05, 1600); this.tone(840, 0.3, 'triangle', 0.06, 2400); },
  pop() { this.tone(520, 0.14, 'triangle', 0.13, 1100); this.tone(880, 0.16, 'sine', 0.09, 1700, 0.05); },
  tink() { this.tone(2300, 0.07, 'square', 0.04); },
  hurt() { this.tone(330, 0.3, 'sawtooth', 0.07, 130); },
  power() { this.seq([0, 5, 9, 12, 17], 523, 0.06, 'square', 0.05); },
  gate() { this.seq([0, 4, 7, 12, 7, 12, 16, 19], 523, 0.08, 'triangle', 0.11); },
  check() { this.seq([7, 12], 784, 0.08, 'triangle', 0.1); },
  bossHit() { this.tone(200, 0.2, 'square', 0.06, 120); },
  win() { this.seq([0, 4, 7, 12, 11, 12, 16, 19, 24], 523, 0.1, 'triangle', 0.12); },
  boing() { this.tone(220, 0.25, 'triangle', 0.12, 660); this.tone(330, 0.2, 'sine', 0.06, 880, 0.03); },
  swim() { this.tone(480, 0.12, 'sine', 0.08, 720); },
  sneeze() { this.tone(900, 0.1, 'square', 0.05, 1500); this.tone(260, 0.4, 'sawtooth', 0.08, 70, 0.12); },
  portal() { this.seq([0, 7, 12, 19], 660, 0.04, 'sine', 0.09); },
  bump() { this.tone(300, 0.08, 'square', 0.06, 200); },
  click() { this.tone(500, 0.08, 'square', 0.06, 900); this.tone(900, 0.1, 'triangle', 0.06, null, 0.05); },
  door() { this.seq([0, 4, 7, 12], 392, 0.07, 'triangle', 0.1); },
  splash() { this.tone(900, 0.18, 'triangle', 0.05, 300); this.tone(300, 0.2, 'sine', 0.06, 150); },
};
const TUNES = {
  meadow: { base: 523.25, ms: 190, n: [0, null, 4, null, 7, null, 12, null, 9, null, 7, null, 4, null, 7, null, 5, null, 9, null, 12, null, 9, null, 7, null, 4, null, 2, null, null, null], b: [0, -3, -7, -5] },
  clouds: { base: 587.33, ms: 210, n: [0, null, null, 7, null, null, 12, null, 11, null, 7, null, 4, null, null, null, 5, null, null, 9, null, null, 12, null, 14, null, 12, null, 7, null, null, null], b: [0, -5, -3, -7] },
  forest: { base: 440, ms: 230, n: [0, null, 3, null, 7, null, 10, null, 7, null, 3, null, 5, null, null, null, 0, null, 3, null, 8, null, 7, null, 5, null, 3, null, 2, null, null, null], b: [0, -4, -2, -5] },
  ice: { base: 659.25, ms: 200, n: [12, null, 7, null, 4, null, 7, null, 11, null, 7, null, 4, null, 7, null, 9, null, 5, null, 2, null, 5, null, 7, null, 4, null, 0, null, null, null], b: [0, -3, -7, -5] },
  castle: { base: 440, ms: 200, n: [0, null, 3, null, 7, null, 3, null, 5, null, 8, null, 7, null, null, null, 0, null, 3, null, 10, null, 8, null, 7, null, 5, null, 3, null, null, null], b: [0, -4, -7, -5] },
  garden: { base: 523.25, ms: 180, n: [0, null, 4, 7, null, 4, 0, null, 2, null, 5, 9, null, 5, 2, null, 4, null, 7, 11, null, 7, 4, null, 5, 4, 2, null, 0, null, null, null], b: [0, -7, -3, -5] },
  lagoon: { base: 587.33, ms: 220, n: [0, null, null, 4, null, 7, 9, null, null, 7, null, 4, 2, null, null, null, 0, null, null, 4, null, 7, 12, null, null, 11, null, 9, 7, null, null, null], b: [0, -5, -3, -7] },
  volcano: { base: 440, ms: 170, n: [0, 3, 7, null, 3, 7, 10, null, 8, 7, 3, null, 5, null, null, null, 0, 3, 7, null, 10, 8, 7, null, 5, 3, 2, null, 0, null, null, null], b: [0, -4, -2, -5] },
  space: { base: 659.25, ms: 260, n: [0, null, 7, null, 12, null, 7, null, 11, null, 7, null, 4, null, null, null, 2, null, 9, null, 14, null, 9, null, 12, null, 7, null, 4, null, null, null], b: [0, -3, -5, -7] },
  palace: { base: 698.46, ms: 200, n: [0, 4, 7, 12, null, 7, 4, null, 2, 5, 9, 14, null, 9, 5, null, 4, 7, 11, 16, null, 11, 7, null, 5, 4, 2, null, 0, null, null, null], b: [0, -3, -5, -7] },
  autumn: { base: 523.25, ms: 230, n: [4, null, 2, null, 0, null, 2, 4, null, 4, null, 7, null, null, null, null, 5, null, 4, null, 2, null, 4, 5, null, 7, null, 4, null, null, null, null], b: [0, -3, -7, -5] },
  balloons: { base: 587.33, ms: 170, n: [0, 4, 7, null, 12, null, 7, null, 9, 7, 4, null, 2, null, null, null, 0, 4, 7, null, 12, null, 14, null, 12, 9, 7, null, 4, null, null, null], b: [0, -5, -3, -7] },
  toys: { base: 783.99, ms: 190, n: [0, null, 4, null, 7, null, 4, null, 0, null, 4, null, 7, null, null, null, 2, null, 5, null, 9, null, 5, null, 2, null, 5, null, 7, null, null, null], b: [0, -5, -3, -5] },
  desert: { base: 440, ms: 200, n: [0, 1, 4, null, 5, 4, 1, null, 0, null, 7, null, 5, 4, null, null, 0, 1, 4, null, 7, 8, 7, null, 5, 4, 1, null, 0, null, null, null], b: [0, -5, -4, -5] },
  tower: { base: 523.25, ms: 180, n: [0, null, 7, null, 12, null, 10, 7, null, 5, null, 7, 3, null, null, null, 0, null, 7, null, 12, null, 15, 14, null, 12, null, 10, 7, null, null, null], b: [0, -4, -2, -5] },
  cave: { base: 440, ms: 240, n: [0, null, 7, null, 3, null, 7, null, 12, null, 10, null, 7, null, null, null, 5, null, 8, null, 12, null, 8, null, 7, null, 3, null, 0, null, null, null], b: [0, -4, -2, -5] },
  portal: { base: 587.33, ms: 200, n: [0, 7, 12, null, 11, 7, 4, null, 5, 9, 12, null, 14, null, null, null, 0, 7, 12, null, 16, 14, 12, null, 11, 9, 7, null, 4, null, null, null], b: [0, -3, -5, -7] },
  button: { base: 523.25, ms: 170, n: [0, null, 0, 4, null, 4, 7, null, 7, null, 4, null, 0, null, null, null, 2, null, 2, 5, null, 5, 9, null, 7, null, 4, null, 0, null, null, null], b: [0, -5, -3, -7] },
  maze: { base: 587.33, ms: 210, n: [0, null, 4, null, 2, null, 5, null, 4, null, 7, null, 5, null, null, null, 7, null, 5, null, 4, null, 2, null, 0, null, 2, null, 0, null, null, null], b: [0, -5, -7, -3] },
  wizard: { base: 493.88, ms: 190, n: [0, null, 3, 7, null, 10, 7, null, 8, null, 7, 3, null, 2, null, null, 0, null, 3, 7, null, 12, 10, null, 8, null, 7, null, 3, null, null, null], b: [0, -4, -2, -5] },
  boss: { base: 392, ms: 150, n: [0, null, 0, 3, null, 0, 7, null, 6, null, 5, null, 3, null, null, null, 0, null, 0, 3, null, 0, 8, null, 7, null, 5, null, 3, null, 2, null], b: [0, 0, -2, -4] },
  victory: { base: 523.25, ms: 170, n: [0, 4, 7, 12, null, 7, 12, 16, null, 12, 16, 19, null, null, 24, null], b: [0, -5, -3, -7] },
};
const Music = {
  timer: null, step: 0, tune: null, name: '',
  start(name) {
    if (this.name === name && this.timer) return;
    this.stop(); this.name = name; this.tune = TUNES[name]; this.step = 0;
    this.timer = setInterval(() => this.tick(), this.tune.ms);
  },
  stop() { clearInterval(this.timer); this.timer = null; this.name = ''; },
  tick() {
    if (!Snd.on || mode !== 'play') return;
    const tu = this.tune, n = tu.n[this.step % tu.n.length];
    if (n != null) Snd.tone(tu.base * Math.pow(2, n / 12), 0.28, 'triangle', 0.035);
    if (this.step % 8 === 0) Snd.tone(tu.base / 4 * Math.pow(2, tu.b[(this.step / 8) % tu.b.length] / 12), 0.6, 'sine', 0.07);
    this.step++;
  },
};

/* ===== Керування ===== */
const Keys = { left: false, right: false, jump: false, shoot: false, jumpTap: false };
const Touch = { dir: 0, jump: false, shoot: false, jumpTap: false };
const In = { left: false, right: false, jump: false, shoot: false, jumpP: false, shootP: false, shootR: false, _pj: false, _ps: false };
function pollInput() {
  const j = Keys.jump || Touch.jump, s = Keys.shoot || Touch.shoot;
  In.left = Keys.left || Touch.dir < 0; In.right = Keys.right || Touch.dir > 0;
  In.jumpP = (j && !In._pj) || Keys.jumpTap || Touch.jumpTap; Keys.jumpTap = Touch.jumpTap = false;
  In.shootP = s && !In._ps; In.shootR = !s && In._ps;
  In.jump = j; In.shoot = s; In._pj = j; In._ps = s;
}

/* ===== Стан гри ===== */
const SPEED = 150, JUMP = 580, GRAV = 1500, STEP = 1 / 60;
let G = null;
let mode = 'create';

function tileAt(tx, ty) { if (tx < 0 || tx >= G.Wt) return 1; if (ty < 0 || ty >= ROWS) return 0; return G.map[ty * G.Wt + tx]; }
const solid = v => v === 1 || v === 2 || v === 5 || v === 7 || v === 8 || v === 11 || v === 12 || (v === 13 && G.blinkOn) || (v === 9 && G.sw) || (v === 10 && !G.sw) || (v >= 14 && solid7(v));

function moveBody(b, dt) {
  let hitX = false; b.sideHit = null; b.headHit = null;
  b.x += b.vx * dt;
  const top = Math.floor(b.y / T), bot = Math.floor((b.y + b.h - 0.01) / T);
  if (b.vx > 0) { const tx = Math.floor((b.x + b.w) / T); for (let ty = top; ty <= bot; ty++) if (solid(tileAt(tx, ty))) { b.x = tx * T - b.w - 0.01; b.vx = 0; hitX = true; b.sideHit = { tx, ty }; break; } }
  else if (b.vx < 0) { const tx = Math.floor(b.x / T); for (let ty = top; ty <= bot; ty++) if (solid(tileAt(tx, ty))) { b.x = (tx + 1) * T + 0.01; b.vx = 0; hitX = true; b.sideHit = { tx, ty }; break; } }
  const prevB = b.y + b.h;
  b.y += b.vy * dt; b.onGround = false; b.groundTile = 0;
  const l = Math.floor(b.x / T), r = Math.floor((b.x + b.w - 0.01) / T);
  if (b.vy > 0) {
    const ty = Math.floor((b.y + b.h) / T);
    for (let tx = l; tx <= r; tx++) { const v = tileAt(tx, ty); if (solid(v) || (v === 3 && prevB <= ty * T + 0.5)) { b.y = ty * T - b.h; b.vy = 0; b.onGround = true; b.groundTile = v; break; } }
  } else if (b.vy < 0) {
    const ty = Math.floor(b.y / T), cx = Math.floor((b.x + b.w / 2) / T);
    let hx = solid(tileAt(cx, ty)) ? cx : -1;
    if (hx < 0) for (let tx = l; tx <= r; tx++) if (solid(tileAt(tx, ty))) { hx = tx; break; }
    if (hx >= 0) { b.y = (ty + 1) * T; b.vy = 0; b.headHit = { tx: hx, ty }; }
  }
  return hitX;
}

const overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
function circleRect(s, e, pad) { pad = pad || 0; const cx = Math.max(e.x - pad, Math.min(s.x, e.x + e.w + pad)), cy = Math.max(e.y - pad, Math.min(s.y, e.y + e.h + pad)); return (s.x - cx) ** 2 + (s.y - cy) ** 2 < s.r * s.r; }

function spawnEnemy(e) {
  const b = { k: e.k, dead: false, t: Math.random() * 5, flash: 0, hp: 1, dir: -1, vx: 0, vy: 0 };
  const hover = (w, h, range, speed, bob) => Object.assign(b, { w, h, hx: e.tx * T + 12, hy: e.ty * T + 12, x: e.tx * T, y: e.ty * T, range: range * T, speed, bob });
  const e2 = spawnEnemy2(e, b, hover); if (e2) return e2;
  if (e.k === 'snail') return Object.assign(b, { w: 24, h: 18, x: e.tx * T, y: e.ty * T - 18, speed: 24 });
  if (e.k === 'hedgehog') return Object.assign(b, { w: 24, h: 18, x: e.tx * T, y: e.ty * T - 18, speed: 34 });
  if (e.k === 'crab') return Object.assign(b, { w: 24, h: 16, x: e.tx * T, y: e.ty * T - 16, speed: 40 });
  if (e.k === 'mush') return Object.assign(b, { w: 20, h: 20, x: e.tx * T + 2, y: e.ty * T - 20, speed: 26 });
  if (e.k === 'soldier') return Object.assign(b, { w: 16, h: 26, x: e.tx * T + 4, y: e.ty * T - 26, speed: 30 });
  if (e.k === 'mouse') return Object.assign(b, { w: 22, h: 13, x: e.tx * T + 1, y: e.ty * T - 13, speed: 72 });
  if (e.k === 'scorp') return Object.assign(b, { w: 24, h: 14, x: e.tx * T, y: e.ty * T - 14, speed: 32 });
  if (e.k === 'squirrel') return Object.assign(b, { w: 18, h: 22, x: e.tx * T + 3, y: e.ty * T - 22, cool: 1 + Math.random(), throwT: 0 });
  if (e.k === 'cactus') return Object.assign(b, { w: 16, h: 26, x: e.tx * T + 4, y: e.ty * T - 26 });
  if (e.k === 'bird') return hover(22, 16, 4, 0.7, 4);
  if (e.k === 'ghost') return hover(20, 18, 2.5, 0.8, 6);
  if (e.k === 'beetle') return Object.assign(b, { w: 22, h: 14, x: e.tx * T + 1, y: e.ty * T - 14, speed: 34 });
  if (e.k === 'frog') return Object.assign(b, { w: 20, h: 16, x: e.tx * T + 2, y: e.ty * T - 16, cool: 0.8 + Math.random(), air: false });
  if (e.k === 'cloud') return hover(28, 20, 2.2, 0.9, 7);
  if (e.k === 'bee') return hover(20, 16, 2.2, 1.3, 9);
  if (e.k === 'ufo') return hover(28, 16, 2.6, 0.8, 5);
  if (e.k === 'fish') return hover(20, 18, 3, 0.9, 3);
  if (e.k === 'jelly') return Object.assign(b, { w: 20, h: 20, hx: e.tx * T + 12, hy: e.ty * T + 12, x: e.tx * T + 2, y: e.ty * T + 2, vr: 1.4 * T });
  if (e.k === 'spark') return Object.assign(b, { w: 14, h: 14, x: e.tx * T + 5, baseY: VIEW_H - 20, y: VIEW_H - 20, state: 'wait', st: Math.random() * 1.2, period: 1.9, jumpV: 600 });
  return Object.assign(b, { w: 22, h: 16, hx: e.tx * T + 12, hy: e.ty * T + 12, x: e.tx * T + 1, y: e.ty * T + 4, state: 'hang', st: 0, cool: 0 });
}

function startLevel(idx) {
  const L = buildLevel(idx);
  let sy = 10; for (let y = 0; y < ROWS; y++) if (solid(L.map[y * L.W + 2])) { sy = y; break; }
  const P = { x: 2 * T, y: sy * T - 30, w: 22, h: 30, vx: 0, vy: 0, dir: 1, onGround: false, coyote: 0, jumpBuf: 0, cut: false, inv: 0, hurtT: 0, hearts: 3, shield: false, wingsT: 0, candyT: 0, magnetT: 0, charge: 0, charging: false, shootCd: 0, t: 0, blink: 0, blinkT: 2.5, onMover: null, groundTile: 0 };
  P.safe = { x: P.x, y: P.y }; P.check = { x: P.x, y: P.y };
  G = {
    idx, L, def: L.def, theme: L.def.theme, map: L.map, Wt: L.W, Wpx: L.W * T, t: 0,
    points: 0, rainbows: 0, defeated: 0, collected: 0, need: L.need, total: L.total,
    stars: L.stars.map(s => Object.assign({}, s)), drops: [], powers: L.powers.map(p => Object.assign({}, p)),
    enemies: L.enemies.map(spawnEnemy), movers: L.movers.map(m => Object.assign({}, m, { x: m.bx, y: m.by, dx: 0, dy: 0 })),
    checks: L.checks.map(c => Object.assign({}, c)), signs: L.signs, gate: Object.assign({ open: false, glow: 0 }, L.gate), decor: L.decor,
    shots: [], bolts: [], parts: [], flys: [], flowers: [], msg: null,
    cam: 0, flash: 0, combo: 0, comboT: 0, done: false, doneT: 0,
    arena: L.arena, arenaLock: false, boss: null, bossActive: false, bossDefeated: false, P,
    friend: { x: P.x - 20, y: P.y - 20, t: 0, dir: 1 },
    springs: L.springs.map(s => Object.assign({}, s)), water: L.water, grav: L.def.grav || 1, caramel: !!L.def.caramel, swimHint: false,
    winds: L.winds, belts: L.belts, beltDir: L.beltDir, gust: null,
    qContent: L.qContent, qLeft: new Map(), bumps: new Map(), portals: L.portals.map(p => Object.assign({}, p)), buttons: L.buttons.map(b => Object.assign({}, b)), keys: L.keys.map(k => Object.assign({}, k)), keysHeld: 0, hasDoors: L.hasDoors, sw: false, dark: !!L.def.dark,
    zips: L.zips.map(z => Object.assign({}, z)), breezes: L.breezes, storms: L.storms.map(s => Object.assign({}, s)), lowgravs: L.lowgravs, pull: null,
    vines: L.vines, launchers: L.launchers.map(l => Object.assign({}, l)), wheels: L.wheels,
    beans: L.beans.map(b => Object.assign({}, b)), lanterns: L.lanterns.map(l => Object.assign({}, l)), rails: L.rails, blinkOn: true, blinkWarn: false,
  };
  initLevel6(G, L); initLevel7(G, L); initLevel8(G, L);
  const bk = L.def.boss;
  if (bk === 'hedge') G.boss = { kind: 'hedge', name: 'Пан Колючка', acc: 'Пана Колючку', x: L.arena.x0 + 28 * T, gy: 10 * T, y: 10 * T - 21, hw: 28, hh: 22, hp: 16, max: 16, t: 0, st: 0, state: 'wait', dir: -1, rot: 0, flash: 0, dead: false, deadT: 0, alpha: 1, throwT: 2.5, rolls: 0, hinted: false };
  else if (bk === 'wizard') {
    const A = L.arena, cx = (A.x0 + A.x1) / 2;
    const spots = [{ x: A.x0 + 7 * T, fy: 10 * T }, { x: A.x1 - 7 * T, fy: 10 * T }, { x: cx, fy: 10 * T }, { x: cx, fy: 7 * T }];
    G.boss = { kind: 'wizard', name: 'Чарівник Плутанко', acc: 'Чарівника Плутанка', win: ' Тепер він показує тільки добрі фокуси.', spots, spot: 2, x: cx, fy: 10 * T, y: 10 * T - 28, hw: 16, hh: 28, hp: 22, max: 22, t: 0, st: 0, state: 'wait', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, clones: [], cloneHint: false };
  }
  else if (bk === 'dragon') G.boss = { kind: 'dragon', name: 'Дракон Чхун', acc: 'Дракона Чхуна', win: ' Він одужав і більше не чхає.', x: L.arena.x0 + 30 * T, gy: 10 * T, y: 10 * T - 26, hw: 32, hh: 24, hp: 24, max: 24, t: 0, st: 0, state: 'sleep', dir: -1, flash: 0, dead: false, deadT: 0, alpha: 1, dropT: 1.2 };
  else if (BOSS2[bk]) G.boss = BOSS2[bk](L);
  else if (bk) G.boss = { kind: 'cloud', name: 'Король Похмурої Хмари', acc: 'Короля Похмурої Хмари', x: (L.arena.x0 + L.arena.x1) / 2, y: 62, hw: 46, hh: 28, hp: 14, max: 14, t: 0, phase: 'wait', pt: 0, boltT: 2.4, minionT: 5, diveT: 7, flash: 0, dead: false, deadT: 0, alpha: 1 };
  G.cam = 0;
  Music.start(G.theme);
  say(LEVELS[idx].name, 2.2);
}
function say(text, dur) { G.msg = { text, t: dur || 2.6 }; }
function nameOf() { return (save.profile.name || 'Єдиноріжка').trim(); }

function burst(x, y, n, cols, speed) {
  for (let i = 0; i < n; i++) { const a = Math.random() * TAU, s = (0.4 + Math.random() * 0.6) * (speed || 120); G.parts.push({ k: 'spark', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 30, t: 0, life: 0.5 + Math.random() * 0.4, col: cols[i % cols.length], r: 1.5 + Math.random() * 1.6 }); }
}
function floatText(x, y, text, col) { G.parts.push({ k: 'text', x, y, vx: 0, vy: -40, t: 0, life: 1, text, col: col || '#fff' }); }

function hurtPlayer(pit) {
  const P = G.P;
  if (!pit && P.inv > 0) return;
  if (!pit && P.big) return;
  if (!pit && P.shield) { P.shield = false; P.inv = 1.2; Snd.tink(); burst(P.x + 11, P.y + 10, 12, RAINBOW, 140); say('Щит захистив!', 1.4); return; }
  P.hearts--; P.inv = 1.8; Snd.hurt(); P.hurtT = 0.25;
  if (!pit) { P.vy = -280; P.vx = -P.dir * 150; }
  if (P.hearts <= 0) {
    if (save.profile.easy) { P.hearts = 3; say('Серця знову повні!', 2); }
    else { P.hearts = 0; setTimeout(() => { if (mode === 'play' && G && G.P.hearts <= 0) showLose(); }, 500); }
  }
}

function fire(big) {
  const P = G.P;
  if (!big && P.shootCd > 0) return;
  P.shootCd = 0.17;
  const ox = P.x + P.w / 2 + P.dir * 16, oy = P.flip ? P.y + P.h + 6 : P.y - 6, aim = P.flip ? P.y + 15 : P.y + P.h - 15;
  if (big) { G.shots.push({ x: ox, y: oy, aim, vx: P.dir * 330, r: 10, dmg: 3, big: true, frost: P.frostT > 0, life: 1.3, t: 0, hit: new Set() }); Snd.big(); }
  else {
    const offs = P.candyT > 0 ? [0, -15, -30] : [0];
    for (const o of offs) G.shots.push({ x: ox, y: oy, aim: aim + o, vx: P.dir * 410, r: 5, dmg: 1, frost: P.frostT > 0, life: 0.8, t: 0, hit: new Set() });
    Snd.shoot();
  }
}

const FLYERS = { cloud: 1, bat: 1, bee: 1, ufo: 1, bird: 1, ghost: 1 }, SWIMMERS = { fish: 1, jelly: 1 };
function bubbles(x, y, n) { for (let i = 0; i < n; i++) G.parts.push({ k: 'bubble', x: x + (Math.random() - 0.5) * 8, y, vx: (Math.random() - 0.5) * 10, vy: -30 - Math.random() * 30, t: 0, life: 0.8 + Math.random() * 0.6, r: 1.2 + Math.random() * 1.8 }); }
function defeat(e) {
  e.dead = true; G.defeated++; Snd.pop();
  const cx = e.x + e.w / 2, cy = e.y + e.h / 2;
  burst(cx, cy, 14, ['#fff', '#ffe14d', '#ff9fd0', '#9fe0ff'], 130);
  if (e.k === 'spark') { G.points += 1; floatText(cx, cy - 8, '+1', '#ff8a3d'); return; }
  const col = ['#ff9fd0', '#ffd54a', '#9fe0ff', '#c5a8ff', '#9ff0c4'][Math.floor(Math.random() * 5)];
  if (FLYERS[e.k]) G.flys.push({ x: cx, y: cy, vx: (Math.random() - 0.5) * 40, t: 0, col });
  else if (SWIMMERS[e.k]) bubbles(cx, cy, 10);
  else G.flowers.push({ x: cx, gy: e.y + e.h, col, t: 0 });
  G.drops.push({ x: cx, y: cy, vx: (Math.random() - 0.5) * 70, vy: -230, t: 0, got: false });
}

function collect(s) {
  s.got = true;
  if (s.rainbow) { G.points += 10; G.rainbows++; Snd.rainbow(); floatText(s.x, s.y - 10, '+10', '#ff4fa3'); burst(s.x, s.y, 18, RAINBOW, 160); }
  else { G.points += 1; G.collected++; G.combo = G.comboT > 0 ? G.combo + 1 : 0; G.comboT = 0.7; Snd.star(G.combo); burst(s.x, s.y, 6, ['#fff', '#ffe14d'], 80); }
}

function waterAt(x, y) { for (const z of G.water) if (x >= z.x0 && x <= z.x1 && y > z.y) return z; return null; }
function updatePlayer(dt) {
  const P = G.P;
  if (P.inCannon) return holdInCannon(P, dt);
  if (P.zip) return rideZip(P, dt);
  if (P.kite) return rideKite(P, dt);
  flipCheck(P);
  let ax = (In.right ? 1 : 0) - (In.left ? 1 : 0);
  if (P.hurtT > 0) { P.hurtT -= dt; ax = 0; }
  if (ax) P.dir = ax;
  const wz = waterAt(P.x + P.w / 2, P.y + P.h / 2);
  if (wz && !P.wasWater) { Snd.splash(); burst(P.x + P.w / 2, wz.y, 10, ['#ffffff', '#bfefff'], 110); }
  if (!wz && P.wasWater && P.vy < 0) { burst(P.x + P.w / 2, P.y + P.h, 6, ['#ffffff', '#bfefff'], 80); if (In.jump && P.vy > -480) { P.vy = -480; P.cut = true; } }
  P.wasWater = !!wz;
  const ice = THEMES[G.theme].ice && P.onGround && P.groundTile === 1;
  const target = ax * SPEED * (wz ? 0.75 : 1);
  const a = ax ? (wz ? 700 : P.onGround ? (ice ? 420 : 1500) : 950) : (wz ? 500 : P.onGround ? (ice ? 200 : 1800) : 650);
  if (P.launchT > 0) { P.launchT -= dt; if (P.onGround || P.sideHit || wz) P.launchT = 0; }
  else if (P.vx < target) P.vx = Math.min(target, P.vx + a * dt); else if (P.vx > target) P.vx = Math.max(target, P.vx - a * dt);
  boostStep(P, dt); rideStep(P);

  if (In.jumpP) P.jumpBuf = 0.14;
  P.jumpBuf -= dt; P.coyote = P.onGround ? 0.1 : P.coyote - dt;
  if (wz) {
    if (!G.swimHint) { G.swimHint = true; say('Тисни «Стрибок», щоб плисти вгору', 2.6); }
    if (P.jumpBuf > 0) {
      P.jumpBuf = 0; P.cut = true; P.onGround = false; P.onMover = null;
      P.vy = P.y < wz.y + 6 ? -480 : Math.min(P.vy, -235);
      Snd.swim(); bubbles(P.x + P.w / 2 + P.dir * 14, P.y + 4, 3);
    } else if (In.jump && P.vy > -150) P.vy -= 700 * dt;
    P.vy = Math.min(P.vy + 420 * dt, 90);
    P.bubT = (P.bubT || 0) - dt; if (P.bubT <= 0) { P.bubT = 0.7; bubbles(P.x + P.w / 2 + P.dir * 14, P.y + 2, 1); }
  } else if (vineStep(P, ax, dt)) {
  } else {
    if (P.jumpBuf > 0 && P.coyote > 0) { P.vy = P.flip ? JUMP : -JUMP; P.jumpBuf = 0; P.coyote = 0; P.onGround = false; P.onMover = null; P.cut = false; Snd.jump(); G.parts.push({ k: 'puff', x: P.x + P.w / 2, y: P.y + P.h, vx: 0, vy: 0, t: 0, life: 0.35, r: 6 }); }
    else if (P.jumpBuf > 0 && P.wingsT > 0 && !P.onGround) { P.vy = Math.min(P.vy, -340); P.jumpBuf = 0; P.cut = true; Snd.flap(); burst(P.x + 4, P.y + 8, 4, ['#fff'], 60); }
    if (!In.jump && !P.cut && (P.flip ? P.vy > 340 : P.vy < -340)) { P.vy = P.flip ? 340 : -340; P.cut = true; }
    const glide = P.wingsT > 0 && In.jump && P.vy > 0;
    const gk = G.grav * lowGravAt(P);
    if (P.flip) P.vy = Math.max(P.vy - GRAV * dt, -620);
    else P.vy = Math.min(P.vy + (glide ? 450 : GRAV * gk) * dt, P.wingsT > 0 ? 230 : (gk < 1 ? 470 : 620));
    const wx = P.x + P.w / 2, wy = P.y + P.h / 2;
    for (const z of G.winds) if ((!z.cyc || (G.t + z.ph) % z.cyc < z.on) && wx > z.x0 && wx < z.x1 && wy > z.y - 10 && wy < z.y1) { const k = Math.max(0, Math.min(1, (wy - z.y + 10) / 50)); P.vy -= 2700 * k * dt; if (P.vy < -270) P.vy = -270; P.cut = true; }
  }

  if (P.onMover) { P.x += P.onMover.dx; P.y += P.onMover.dy; }
  const prevB = P.y + P.h; P.onMover = null;
  let carry = 0;
  if (P.onGround && P.groundTile === 5) carry += (G.beltDir[Math.floor((P.y + P.h + 2) / T) * G.Wt + Math.floor((P.x + P.w / 2) / T)] || 0) * 70;
  if (G.gust && G.gust.t > 0) carry += G.gust.dir * 170;
  carry += breezeAt(P) + pullAt(P) + flowAt(P);
  P.vx += carry;
  moveBody(P, dt);
  if (P.vx !== 0) P.vx -= carry;
  if (P.flip) { P.onGround = !!P.headHit; if (P.headHit) P.groundTile = tileAt(P.headHit.tx, P.headHit.ty); }
  for (const m of G.movers) {
    if (m.state === 'gone') continue;
    if (P.vy >= 0 && prevB <= Math.max(m.y, m.y - m.dy) + 3 && P.y + P.h >= m.y && P.x + P.w > m.x + 2 && P.x < m.x + m.w - 2) { P.y = m.y - P.h; P.vy = 0; P.onGround = true; P.onMover = m; P.groundTile = 3; }
  }
  for (const s of G.springs) {
    const top = s.gy - 16;
    if (P.vy >= 0 && P.y + P.h >= top && prevB <= s.gy + 1 && Math.abs(P.x + P.w / 2 - s.x) < 13) {
      P.y = top - P.h; P.vy = In.jump ? -760 : -690; P.cut = true; P.onGround = false; P.onMover = null; P.coyote = 0; s.sq = 0.22;
      Snd.boing(); burst(s.x, top, 8, ['#fff', '#ffd6ea', '#ffe14d'], 90);
    }
  }
  afterMove2(P);
  if (P.headHit && !P.flip && tileAt(P.headHit.tx, P.headHit.ty) === 7) bumpBlock(P.headHit.tx, P.headHit.ty);
  if (P.sideHit && tileAt(P.sideHit.tx, P.sideHit.ty) === 11) tryDoor(P.sideHit.tx, P.sideHit.ty);
  if (P.sideHit && tileAt(P.sideHit.tx, P.sideHit.ty) === 17) pushStone(P, P.sideHit.tx, P.sideHit.ty, dt);
  const pcxP = P.x + P.w / 2;
  if (P.portalLock && !(Math.abs(pcxP - P.portalLock.x) < 14 && P.y + P.h > P.portalLock.gy - 44 && P.y < P.portalLock.gy)) P.portalLock = null;
  for (const p of G.portals) {
    if (p === P.portalLock || !(Math.abs(pcxP - p.x) < 12 && P.y + P.h > p.gy - 44 && P.y < p.gy)) continue;
    const q = G.portals[p.to];
    burst(p.x, p.gy - 22, 14, [PORTAL_COLS[p.pair % 3][0], '#fff'], 120);
    P.x = q.x - P.w / 2; P.y = q.gy - P.h; P.vy = 0; P.onMover = null; P.portalLock = q;
    burst(q.x, q.gy - 22, 18, [PORTAL_COLS[q.pair % 3][0], '#fff'], 140); Snd.portal();
    G.cam = Math.max(G.arenaLock ? G.arena.x0 - T : 0, Math.min(Math.max(0, G.Wpx - viewW), q.x - viewW * 0.42));
    break;
  }
  for (const b of G.buttons) {
    const on = P.vy >= 0 && P.y + P.h >= b.gy - 12 && P.y + P.h <= b.gy + 2 && Math.abs(pcxP - b.x) < 14;
    if (on && !b.down) { b.down = true; b.pt = 0.25; P.vy = -280; P.cut = true; P.onGround = false; toggleSwitch(); }
    else if (!on && P.y + P.h < b.gy - 16) b.down = false;
  }
  if (P.y < -44 && !P.flip) { P.y = -44; if (P.vy < 0) P.vy = 0; }
  const minX = G.arenaLock ? G.arena.x0 : 0;
  if (P.x < minX) { P.x = minX; if (P.vx < 0) P.vx = 0; }
  if (P.onGround && !P.onMover && !P.mini) {
    const ty = P.flip ? Math.floor((P.y - 2) / T) : Math.floor((P.y + P.h + 2) / T);
    const firm = v => solid(v) && v !== 13 && v !== 22;
    if (firm(tileAt(Math.floor((P.x - 26) / T), ty)) && firm(tileAt(Math.floor((P.x + P.w + 26) / T), ty)) && firm(tileAt(Math.floor((P.x + P.w / 2) / T), ty))) P.safe = { x: P.x, y: P.y };
  }
  if (P.y > VIEW_H + 60 || (P.flip && P.y < -54)) { hurtPlayer(true); P.x = P.safe.x; P.y = P.safe.y - 2; P.vx = P.vy = 0; burst(P.x + 11, P.y + 15, 10, ['#fff', '#ffe14d'], 100); }

  if (In.shootP) { P.charging = true; P.charge = 0; P.chargeSnd = false; }
  if (P.charging) { P.charge += dt; if (P.charge >= 0.55 && !P.chargeSnd) { P.chargeSnd = true; Snd.charged(); } }
  if (In.shootR && P.charging) { fire(P.charge >= 0.55); P.charging = false; P.charge = 0; }
  P.shootCd -= dt;
  if (P.inv > 0) P.inv -= dt;
  // цукерка перед босом не закінчується, доки бос не переможений
  if (P.candyBoss) { if (G.boss && !G.boss.dead) P.candyT = 15; else P.candyBoss = false; }
  for (const k of ['wingsT', 'candyT', 'magnetT', 'frostT']) if (P[k] > 0) { P[k] -= dt; if (P[k] <= 0) P[k] = 0; }
  P.t += dt * (P.onGround ? Math.max(0.25, Math.abs(P.vx) / SPEED) : 0.6);
  P.blinkT -= dt; if (P.blinkT < 0) { P.blink = 0.12; P.blinkT = 2 + Math.random() * 3; } if (P.blink > 0) P.blink -= dt;
}

const WALKERS = { snail: 1, hedgehog: 1, crab: 1, mush: 1, soldier: 1, mouse: 1, scorp: 1, beetle: 1 }, HOVER = { cloud: 1, bee: 1, ufo: 1, fish: 1, bird: 1, ghost: 1 }, NO_STOMP = { hedgehog: 1, spark: 1, cactus: 1 }, IMMUNE = { hedgehog: 1, cactus: 1 };
function updateEnemy(e, dt) {
  e.t += dt; if (e.flash > 0) e.flash -= dt;
  const P = G.P;
  if (ENEMY2[e.k]) updateEnemy2(e, dt);
  else if (WALKERS[e.k]) {
    e.vx = e.dir * e.speed; e.vy = Math.min(e.vy + GRAV * dt, 600);
    if (moveBody(e, dt)) e.dir *= -1;
    else if (e.onGround) { const ax = e.dir > 0 ? e.x + e.w + 2 : e.x - 2; const v = tileAt(Math.floor(ax / T), Math.floor((e.y + e.h + 4) / T)); if (!(solid(v) || v === 3)) e.dir *= -1; }
    if (e.y > VIEW_H + 40) e.dead = true;
  } else if (HOVER[e.k]) {
    e.x = e.hx + Math.sin(e.t * e.speed) * e.range - e.w / 2; e.dir = Math.cos(e.t * e.speed) >= 0 ? 1 : -1;
    e.y = e.hy + Math.sin(e.t * 2.3) * e.bob - e.h / 2;
  } else if (e.k === 'frog' || e.k === 'alien' || e.k === 'blob') {
    const pcx = P.x + P.w / 2, cx = e.x + e.w / 2;
    if (e.onGround) {
      e.vx = 0; e.air = false; e.cool -= dt;
      if (e.cool <= 0 && Math.abs(pcx - cx) < 260) { e.dir = pcx < cx ? -1 : 1; e.vy = -400; e.vx = e.dir * 95; e.cool = 1.5; e.air = true; }
    }
    e.vy = Math.min(e.vy + GRAV * dt, 600);
    if (moveBody(e, dt)) { e.dir *= -1; e.vx = 0; }
    if (e.y > VIEW_H + 40) e.dead = true;
  } else if (e.k === 'squirrel') {
    const pcx = P.x + P.w / 2, cx = e.x + e.w / 2, d = Math.abs(pcx - cx);
    e.dir = pcx < cx ? -1 : 1; e.cool -= dt; if (e.throwT > 0) e.throwT -= dt;
    if (e.cool <= 0 && d < 230 && d > 24) { e.cool = 2.3; e.throwT = 0.3; G.bolts.push({ kind: 'acorn', x: cx + e.dir * 6, y: e.y + 4, vx: Math.max(-220, Math.min(220, (pcx - cx) / 0.75)), vy: -330, g: 900, t: 0 }); }
  } else if (e.k === 'jelly') {
    e.x = e.hx - e.w / 2; e.y = e.hy + Math.sin(e.t * 1.1) * e.vr - e.h / 2;
  } else if (e.k === 'spark') {
    e.st += dt;
    if (e.state === 'wait') { e.y = e.baseY; if (e.st > e.period) { e.state = 'warn'; e.st = 0; } }
    else if (e.state === 'warn') { if (e.st > 0.7) { e.state = 'air'; e.vy = -e.jumpV; e.st = 0; if (Math.abs(e.x - P.x) < 320) Snd.tone(500, 0.15, 'sine', 0.04, 900); } }
    else { e.vy += GRAV * dt; e.y += e.vy * dt; if (e.vy > 0 && e.y >= e.baseY) { e.state = 'wait'; e.st = 0; e.y = e.baseY; } }
    if (e.state !== 'air') return;
  } else if (e.k === 'bat' || e.k === 'ptero' || e.k === 'owl') {
    const pcx = P.x + P.w / 2, pcy = P.y + P.h / 2, cx = e.x + e.w / 2, cy = e.y + e.h / 2;
    if (e.state === 'hang') { e.cool -= dt; if (e.cool <= 0 && Math.abs(pcx - cx) < 120 && pcy > cy) { e.state = 'swoop'; e.st = 0; e.tx = pcx; e.ty = Math.min(pcy, 226); Snd.tone(900, 0.15, 'square', 0.03, 600); } }
    else if (e.state === 'swoop') { e.st += dt; const dx = e.tx - cx, dy = e.ty - cy, d = Math.hypot(dx, dy) || 1; if (d < 6 || e.st > 1.8) e.state = 'back'; else { e.x += dx / d * 125 * dt; e.y += dy / d * 125 * dt; } e.dir = dx >= 0 ? 1 : -1; }
    else { const dx = e.hx - cx, dy = e.hy - cy, d = Math.hypot(dx, dy) || 1; if (d < 3) { e.state = 'hang'; e.cool = 1.8; e.x = e.hx - e.w / 2; e.y = e.hy - e.h / 2; } else { e.x += dx / d * Math.min(d, 85 * dt); e.y += dy / d * Math.min(d, 85 * dt); } }
  }
  // зіткнення з єдиноріжкою
  const box = { x: e.x + 2, y: e.y + 2, w: e.w - 4, h: e.h - 2 };
  if (!e.dead && !e.ghost && overlap(P, box)) {
    const stomp = P.flip ? P.vy < -40 && (e.y + e.h - P.y) < Math.min(14, e.h * 0.7) + 2 : P.vy > 40 && (P.y + P.h - e.y) < Math.min(14, e.h * 0.7) + 2;
    if (stomp && !NO_STOMP[e.k]) { if (!stompHook(e)) defeat(e); P.vy = (In.jump ? 470 : 360) * (P.flip ? 1 : -1); P.cut = true; }
    else if (!touchHook(e)) hurtPlayer(false);
  }
}

function updateBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  if (!B) return;
  if (B.kind === 'hedge') return updateHedgeBoss(dt);
  if (B.kind === 'dragon') return updateDragonBoss(dt);
  if (B.kind === 'wizard') return updateWizardBoss(dt);
  if (B.kind === 'medusa') return updateMedusaBoss(dt);
  if (B.kind === 'robot') return updateRobotBoss(dt);
  if (B.kind === 'moleking') return updateMoleBoss(dt);
  if (B.kind === 'clock') return updateClockBoss(dt);
  if (B.kind === 'octopus') return updateOctoBoss(dt);
  if (B.kind === 'magpie') return updateMagpieBoss(dt);
  if (B.kind === 'chameleon') return updateChameleonBoss(dt);
  if (B.kind === 'cat') return updateCatBoss(dt);
  if (B.dead) { B.deadT += dt; B.y -= 18 * dt; B.alpha = Math.max(0, 1 - B.deadT / 4); return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.phase = 'float'; Music.start('boss'); say('Король Похмурої Хмари!', 2.4); G.flash = 0.6; }
    return;
  }
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  const cx = (A.x0 + A.x1) / 2, amp = (A.x1 - A.x0) / 2 - 80, angry = B.hp <= B.max / 2;
  const pcxB = P.x + P.w / 2, swing = Math.min(amp, viewW * 0.3);
  const home = Math.max(A.x0 + 70 + swing, Math.min(A.x1 - 70 - swing, pcxB));
  B.hx = B.hx == null ? cx : B.hx + (home - B.hx) * Math.min(1, dt * 0.8);
  B.x = B.hx + Math.sin(B.t * (angry ? 0.75 : 0.55)) * swing;
  if (B.phase === 'float') {
    B.y += (62 + Math.sin(B.t * 1.7) * 8 - B.y) * Math.min(1, dt * 3);
    B.boltT -= dt;
    if (B.boltT <= 0) { B.boltT = angry ? 1.5 : 2.3; const pcx = P.x + P.w / 2; G.bolts.push({ x: B.x + (Math.random() - 0.5) * 30, y: B.y + 30, vx: Math.max(-110, Math.min(110, (pcx - B.x) * 0.55)), vy: 165, t: 0 }); Snd.tone(1400, 0.12, 'square', 0.04, 500); }
    B.minionT -= dt;
    if (B.minionT <= 0) { B.minionT = 6.5; if (G.enemies.filter(e => e.minion && !e.dead).length < 2) { const m = spawnEnemy({ k: 'cloud', tx: Math.floor(B.x / T), ty: 6 }); m.hx = B.x; m.hy = 150; m.range = 3 * T; m.minion = true; G.enemies.push(m); burst(B.x, B.y + 20, 10, ['#b8b2cf', '#fff'], 100); } }
    B.diveT -= dt;
    if (B.diveT <= 0) { B.phase = 'dive'; B.pt = 0; say('Король спускається! Стріляй!', 1.6); }
  } else {
    B.pt += dt;
    const ty = B.pt < 3.2 ? 194 : 62;
    B.y += (ty - B.y) * Math.min(1, dt * 2.2);
    if (B.pt > 4.2) { B.phase = 'float'; B.diveT = angry ? 6 : 8; }
  }
  const box = { x: B.x - B.hw, y: B.y - B.hh, w: B.hw * 2, h: B.hh * 2 + 6 };
  if (overlap(P, box)) {
    if (P.vy > 40 && P.y + P.h - box.y < 16) { hitBoss(2); P.vy = -480; P.cut = true; }
    else hurtPlayer(false);
  }
}
function hitBoss(d) {
  const B = G.boss; if (B.dead) return;
  B.hp -= d; B.flash = 0.18; Snd.bossHit(); burst(B.x, B.y, 8, ['#fff', '#ffe14d'], 120);
  if (B.hp <= 0) {
    B.dead = true; B.hp = 0; G.bossDefeated = true; G.bolts = [];
    if (B.kind !== 'cloud') B.state = 'happy';
    if (B.kind === 'medusa') B.shield = 0;
    if (B.kind === 'wizard') { B.clones = []; B.alpha = 1; }
    G.gust = null; G.pull = null; if (B.tents) B.tents = [];
    G.enemies.forEach(e => { if (e.minion && !e.dead) defeat(e); });
    for (let i = 0; i < 18; i++) G.drops.push({ x: B.x + (Math.random() - 0.5) * 60, y: B.y, vx: (Math.random() - 0.5) * 260, vy: -150 - Math.random() * 250, t: 0, got: false });
    burst(B.x, B.y, 40, RAINBOW, 220); G.flash = 0.8; Snd.win();
    say(nameOf() + ' перемогла ' + B.acc + '!' + (B.win || (B.kind === 'hedge' ? ' Тепер він добрий.' : '')) + ' Ворота відчинилися.', 4);
    Music.start('victory');
  }
}
function updateWizardBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  B.y = B.fy - 28;
  if (B.dead) { B.deadT += dt; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'laugh'; B.st = 0; Music.start('boss'); say('Плутанко: «Хі-хі! Зараз я все переплутаю!»', 2.6); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2;
  B.dir = pcx < B.x ? -1 : 1;
  if (B.state === 'vanish') {
    B.alpha = Math.max(0, 1 - B.st / 0.45); for (const cl of B.clones) cl.alpha = Math.min(cl.alpha, B.alpha * 0.8);
    if (B.st > 0.45) {
      const opts = B.spots.map((s, i) => i).filter(i => i !== B.spot && Math.abs(B.spots[i].x - pcx) > 70);
      const pick = opts.length ? opts[Math.floor(Math.random() * opts.length)] : (B.spot + 1) % B.spots.length;
      B.spot = pick; B.x = B.spots[pick].x; B.fy = B.spots[pick].fy; B.y = B.fy - 28;
      B.clones = angry ? B.spots.map((s, i) => i).filter(i => i !== pick).sort(() => Math.random() - 0.5).slice(0, 2).map(i => ({ x: B.spots[i].x, fy: B.spots[i].fy, alpha: 0, dead: false })) : [];
      B.state = 'appear'; B.st = 0; Snd.portal(); burst(B.x, B.y, 16, ['#fff', '#c9b6ff', '#ffd23f'], 130);
    }
  } else if (B.state === 'appear') {
    B.alpha = Math.min(1, B.st / 0.5); for (const cl of B.clones) if (!cl.dead) cl.alpha = B.alpha * 0.8;
    if (B.st > 0.5) { B.state = 'cast'; B.st = 0; }
  } else if (B.state === 'cast') {
    if (B.st > (angry ? 0.8 : 1.0)) {
      const wx = B.x + B.dir * 22, wy = B.fy - 46, base = Math.atan2((P.y + P.h / 2) - wy, pcx - wx);
      for (const d of angry ? [-0.5, -0.25, 0, 0.25, 0.5] : [-0.3, 0, 0.3]) G.bolts.push({ kind: 'magic', x: wx, y: wy, vx: Math.cos(base + d) * 125, vy: Math.sin(base + d) * 125, t: 0 });
      Snd.tone(1200, 0.25, 'sine', 0.06, 2000); B.state = 'laugh'; B.st = 0;
    }
  } else if (B.state === 'laugh') {
    if (B.st > (angry ? 1.3 : 1.8)) { B.state = 'vanish'; B.st = 0; }
  }
  if ((B.state === 'cast' || B.state === 'laugh') && overlap(P, { x: B.x - 14, y: B.fy - 56, w: 28, h: 56 })) {
    if (P.vy > 40 && P.y + P.h - (B.fy - 56) < 18) { hitBoss(2); P.vy = -480; P.cut = true; }
    else hurtPlayer(false);
  }
}
function updateDragonBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt; if (B.flash > 0) B.flash -= dt;
  const ground = B.gy - 26;
  if (B.dead) { B.deadT += dt; B.y += (ground - B.y) * Math.min(1, dt * 3); return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'takeoff'; B.st = 0; Music.start('boss'); say('Дракон Чхун прокинувся! Апчхи!', 2.4); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2, left = A.x0 + 60, right = A.x1 - 60;
  if (B.state === 'takeoff') { B.y += (70 - B.y) * Math.min(1, dt * 2.5); if (B.st > 0.9) { B.state = 'fly'; B.st = 0; B.hx = B.x; } }
  else if (B.state === 'fly') {
    const swing = Math.min((right - left) / 2, viewW * 0.32), home = Math.max(left + swing, Math.min(right - swing, pcx));
    B.hx += (home - B.hx) * Math.min(1, dt * 0.8);
    const nx = B.hx + Math.sin(B.st * (angry ? 0.95 : 0.75)) * swing;
    if (Math.abs(nx - B.x) > 0.3) B.dir = nx > B.x ? 1 : -1;
    B.x = nx; B.y = 70 + Math.sin(B.t * 2) * 12;
    B.dropT -= dt;
    if (B.dropT <= 0) { B.dropT = angry ? 1.1 : 1.6; G.bolts.push({ kind: 'puff', fall: true, x: B.x + B.dir * 20, y: B.y + 22, vx: 0, vy: 60, g: 400, t: 0 }); }
    if (B.st > (angry ? 4 : 5.5)) { B.state = 'land'; B.st = 0; }
  } else if (B.state === 'land') {
    B.y += (ground - B.y) * Math.min(1, dt * 3.2); B.dir = pcx < B.x ? -1 : 1;
    if (B.st > 0.8) { B.y = ground; B.state = 'inhale'; B.st = 0; Snd.bossHit(); burst(B.x, B.gy - 4, 12, ['#fff', '#e8dcff'], 120); }
  } else if (B.state === 'inhale') {
    B.dir = pcx < B.x ? -1 : 1;
    if (B.st > (angry ? 1.1 : 1.5)) {
      B.state = 'sneeze'; B.st = 0; G.gust = { t: 1.1, dir: B.dir }; Snd.sneeze(); G.flash = 0.12;
      floatText(B.x + B.dir * 40, B.y - 40, 'АПЧХИ!', '#7a5ad9');
      for (const k of [0, 1]) G.bolts.push({ kind: 'puff', x: B.x + B.dir * (46 + k * 40), y: B.gy - 9, vx: B.dir * (130 - k * 30), vy: 0, t: 0 });
    }
  } else if (B.state === 'sneeze') { if (B.st > 0.6) { B.state = 'tired'; B.st = 0; } }
  else if (B.state === 'tired') { if (B.st > (angry ? 1.8 : 2.4)) { B.state = 'takeoff'; B.st = 0; } }
  B.x = Math.max(left, Math.min(right, B.x));
  const box = { x: B.x - 30, y: B.y - 22, w: 60, h: 46 };
  if (overlap(P, box)) {
    if (P.vy > 40 && P.y + P.h - box.y < 18) { hitBoss(2); P.vy = -480; P.cut = true; }
    else if (B.state !== 'tired') hurtPlayer(false);
  }
}
function updateHedgeBoss(dt) {
  const B = G.boss, P = G.P, A = G.arena;
  B.t += dt;
  if (B.flash > 0) B.flash -= dt;
  if (B.dead) { B.deadT += dt; return; }
  if (!G.bossActive) {
    if (P.x > A.x0 + 2 * T) { G.bossActive = true; G.arenaLock = true; B.state = 'walk'; B.st = 0; Music.start('boss'); say('Пан Колючка прокинувся!', 2.4); G.flash = 0.4; }
    return;
  }
  B.st += dt;
  const pcx = P.x + P.w / 2, angry = B.hp <= B.max / 2;
  const left = A.x0 + 40, right = A.x1 - 40;
  if (B.state === 'walk') {
    B.dir = pcx < B.x ? -1 : 1;
    if (Math.abs(pcx - B.x) > 24) B.x += B.dir * (angry ? 55 : 40) * dt;
    if (angry) {
      B.throwT -= dt;
      if (B.throwT <= 0) { B.throwT = 3.4; for (const vx of [-100, 0, 100]) G.bolts.push({ spike: true, x: B.x, y: B.gy - 46, vx: vx + (pcx - B.x) * 0.2, vy: -400, t: 0 }); Snd.tone(700, 0.12, 'square', 0.04, 400); }
    }
    if (B.st > (angry ? 2.2 : 3)) { B.state = 'curl'; B.st = 0; Snd.tone(300, 0.5, 'sawtooth', 0.04, 600); }
  } else if (B.state === 'curl') {
    if (B.st > 0.85) { B.state = 'roll'; B.st = 0; B.dir = pcx < B.x ? -1 : 1; B.rolls = angry ? 2 : 1; }
  } else if (B.state === 'roll') {
    const v = angry ? 270 : 240;
    B.x += B.dir * v * dt; B.rot += B.dir * v * dt / 22;
    if (B.x <= left || B.x >= right) {
      B.x = Math.max(left, Math.min(right, B.x)); G.flash = 0.15; Snd.bossHit(); burst(B.x + B.dir * 26, B.gy - 24, 10, ['#fff', '#ffe14d'], 120);
      B.rolls--;
      if (B.rolls > 0) B.dir *= -1;
      else { B.state = 'dizzy'; B.st = 0; say('Пан Колючка запаморочився! Стріляй!', 1.6); }
    }
  } else if (B.state === 'dizzy') {
    if (B.st > (angry ? 2.8 : 3.4)) { B.state = 'walk'; B.st = 0; }
  }
  B.x = Math.max(left, Math.min(right, B.x));
  const ball = B.state === 'roll' || B.state === 'curl';
  B.y = B.gy - (ball ? 24 : 21);
  const box = ball ? { x: B.x - 22, y: B.gy - 46, w: 44, h: 46 } : { x: B.x - 28, y: B.gy - 40, w: 56, h: 40 };
  if (overlap(P, box)) {
    if (B.state === 'dizzy') { if (P.vy > 40 && P.y + P.h - box.y < 18) { hitBoss(2); P.vy = -480; P.cut = true; } }
    else hurtPlayer(false);
  }
}

function update(dt) {
  if (!G || G.done) { if (G && G.done) { G.doneT += dt; G.t += dt; updateParts(dt); } return; }
  G.t += dt;
  const P = G.P;
  for (const m of G.movers) {
    if (m.crumble || m.balloon || m.bubble || m.cart || m.sheep || m.ice || m.log || m.dolphin || m.whale || m.coaster || m.ball) { updatePlatform(m, dt); continue; }
    let nx, ny;
    if (m.circ) { const a = G.t * TAU / m.period + m.ph; nx = m.cx + Math.cos(a) * m.r - m.w / 2; ny = m.cy + Math.sin(a) * m.r; }
    else if (m.swing) { const a = m.amp * Math.sin(G.t * TAU / m.period + m.ph); nx = m.px + Math.sin(a) * m.len - m.w / 2; ny = m.py + Math.cos(a) * m.len; }
    else { const ph = Math.sin(G.t * TAU / m.period); nx = m.bx + ph * m.ax; ny = m.by + ph * m.ay; }
    m.dx = nx - m.x; m.dy = ny - m.y; m.x = nx; m.y = ny;
  }
  for (const s of G.springs) if (s.sq > 0) s.sq -= dt;
  if (G.gust) { G.gust.t -= dt; if (G.gust.t <= 0) G.gust = null; else for (let i = 0; i < 2; i++) G.parts.push({ k: 'wind', x: (G.boss ? G.boss.x : P.x) + G.gust.dir * (30 + Math.random() * 60), y: 150 + Math.random() * 90, vx: G.gust.dir * (360 + Math.random() * 140), vy: 0, t: 0, life: 0.9, dir: G.gust.dir }); }
  updatePlayer(dt);
  update2(dt);
  for (const e of G.enemies) if (!e.dead) updateEnemy(e, dt);
  updateBoss(dt);

  const pcx = P.x + P.w / 2, pcy = P.y + P.h / 2, F = G.friend;
  const near = s => s.x > P.x - 9 && s.x < P.x + P.w + 9 && s.y > P.y - 12 && s.y < P.y + P.h + 9;
  const byFriend = s => save.profile.friend !== 'none' && Math.hypot(s.x - F.x, s.y - F.y) < 15;
  const pull = s => { if (P.magnetT > 0) { const dx = pcx - s.x, dy = pcy - s.y, d = Math.hypot(dx, dy) || 1; if (d < 130) { const k = Math.min(d, 340 * 1 / 60); s.x += dx / d * k; s.y += dy / d * k; } } };
  for (const s of G.stars) { if (s.got) continue; s.t += dt; pull(s); if (near(s) || byFriend(s)) collect(s); }
  for (const s of G.drops) {
    if (s.got) continue; s.t += dt;
    if (!s.rest) { s.vy = Math.min(s.vy + 900 * dt, 500); s.x += s.vx * dt; s.y += s.vy * dt; const v = tileAt(Math.floor(s.x / T), Math.floor((s.y + 8) / T)); if (s.vy > 0 && (solid(v) || v === 3)) { s.y = Math.floor((s.y + 8) / T) * T - 8; if (s.vy > 120) { s.vy *= -0.4; s.vx *= 0.6; } else { s.rest = true; } } if (s.y > VIEW_H + 30) s.got = true; }
    pull(s); if (s.t > 0.25 && (near(s) || byFriend(s))) collect(s);
  }
  if (G.comboT > 0) G.comboT -= dt;
  for (const p of G.powers) {
    if (p.got) continue; p.t += dt;
    if (near(p)) {
      p.got = true; Snd.power(); burst(p.x, p.y, 16, RAINBOW, 140);
      if (p.k === 'wings') { P.wingsT = 10; say('Крила! У повітрі тисни стрибок ще раз'); }
      else if (p.k === 'shield') { P.shield = true; say('Веселковий щит береже від одного удару'); }
      else if (p.k === 'candy') { P.candyT = 15; P.candyBoss = !!(G.boss && !G.bossDefeated); say(P.candyBoss ? 'Цукерка! Ріг стріляє трьома іскорками аж до кінця битви' : 'Цукерка! Ріг стріляє трьома іскорками', 2.4); }
      else if (p.k === 'frost') { P.frostT = 15; say('Сніжинка! Ріг заморожує ворогів у крижані кубики', 2.4); }
      else if (p.k === 'mini') { setMini(P, true, 14); say('Ти маленька! Тепер можна пролізти в нірку', 2.2); }
      else if (p.k === 'big') { setBig(P, true, BIG_TIME); say(G.bigHint ? 'Знову велика!' : 'Гриб-велетень! Ти велика: ламай стіни з кубиків', 2.4); G.bigHint = true; }
      else { P.magnetT = 12; say('Магніт! Зірочки самі летять до тебе'); }
    }
  }
  for (const k of G.keys) { if (k.got) continue; k.t += dt; if (Math.abs(k.x - pcx) < 24 && Math.abs(k.y - pcy) < 30) { k.got = true; G.keysHeld++; Snd.power(); burst(k.x, k.y, 14, ['#ffcc33', '#fff'], 120); say(G.keysHeld > 1 ? 'Ключиків: ' + G.keysHeld : 'Ключик! Тепер можна відчинити двері', 1.8); } }
  for (const [i, v] of G.bumps) { if (v - dt <= 0) G.bumps.delete(i); else G.bumps.set(i, v - dt); }
  for (const b of G.buttons) if (b.pt > 0) b.pt -= dt;
  for (const c of G.checks) if (!c.on && Math.abs(pcx - c.x) < 16 && P.y + P.h > c.gy - 44) { c.on = true; P.check = { x: c.x - 11, y: c.gy - 30 }; Snd.check(); burst(c.x + 8, c.gy - 34, 12, RAINBOW, 110); say('Прапорець піднято!', 1.6); }

  // постріли
  for (const s of G.shots) {
    s.t += dt; s.life -= dt; s.x += s.vx * dt; s.y += (s.aim - s.y) * Math.min(1, dt * 22);
    if (s.big || s.t % 0.05 < dt) G.parts.push({ k: 'spark', x: s.x, y: s.y, vx: -s.vx * 0.05, vy: (Math.random() - 0.5) * 30, t: 0, life: 0.3, col: RAINBOW[Math.floor(Math.random() * 6)], r: s.big ? 2.4 : 1.4 });
    const stx = Math.floor(s.x / T), sty = Math.floor(s.y / T), stv = tileAt(stx, sty);
    if (solid(stv)) { if (stv === 18) crackHit(stx, sty, s); s.life = 0; burst(s.x, s.y, 5, ['#fff', '#ffe14d'], 60); }
    for (const e of G.enemies) {
      if (e.dead || e.ghost || s.life <= 0 || s.hit.has(e) || !circleRect(s, e, 2)) continue;
      s.hit.add(e);
      if (IMMUNE[e.k]) { Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); if (s.big) s.life = 0; else { s.vx *= -0.7; s.life = Math.min(s.life, 0.25); } }
      else if (s.frost && freezeEnemy(e)) { if (!s.big) s.life = 0; }
      else { e.hp -= s.dmg; e.flash = 0.15; if (e.hp <= 0) defeat(e); if (!s.big) s.life = 0; }
    }
    for (const b of G.bolts) if (SHOOTABLE[b.kind] && !b.dead && s.life > 0 && Math.abs(s.x - b.x) < 9 + s.r && Math.abs(s.y - b.y) < 8 + s.r) { b.dead = true; if (!s.big) s.life = 0; burst(b.x, b.y, 8, ['#fff', '#e8dcff'], 90); Snd.pop(); }
    const B = G.boss;
    if (B && B.kind === 'wizard' && G.bossActive && !B.dead && s.life > 0) for (const cl of B.clones) {
      if (cl.dead || cl.alpha < 0.4 || s.life <= 0 || Math.abs(s.x - cl.x) > 16 + s.r || Math.abs(s.y - (cl.fy - 28)) > 28 + s.r) continue;
      cl.dead = true; s.life = 0; burst(cl.x, cl.fy - 28, 16, ['#fff', '#c9b6ff', '#ffd23f'], 140); Snd.pop();
      if (!B.cloneHint) { B.cloneHint = true; say('Пуф! Це був двійник. У справжнього Плутанка золота зірка на капелюсі', 3); }
    }
    if (B && G.bossActive && !B.dead && s.life > 0 && (B.kind !== 'wizard' || B.state === 'cast' || B.state === 'laugh') && !s.hit.has(B) && Math.abs(s.x - B.x) < B.hw + s.r && Math.abs(s.y - B.y) < B.hh + s.r) {
      s.hit.add(B);
      if (B.kind === 'hedge' && B.state !== 'dizzy') {
        Snd.tink(); burst(s.x, s.y, 4, ['#fff'], 70); s.vx *= -0.6; s.life = Math.min(s.life, 0.25);
        if (!B.hinted) { B.hinted = true; say('Колючки не пускають! Стріляй, коли Пан Колючка запаморочиться', 2.6); }
      } else if (armored2(s, B)) {
      } else { hitBoss(s.dmg); s.life = 0; }
    }
  }
  G.shots = G.shots.filter(s => s.life > 0);
  for (const b of G.bolts) {
    b.t += dt; if (b.g) b.vy += b.g * dt; else if (b.spike) b.vy += 900 * dt; if (b.kind === 'bub') b.vy = Math.sin(b.t * 3.2) * 28 + b.sink; b.x += b.vx * dt; b.y += b.vy * dt;
    const roll = (b.kind === 'puff' && !b.fall) || b.kind === 'wave' || b.kind === 'ringw' || b.kind === 'yarn', floaty = b.kind === 'magic' || b.kind === 'bub';
    const gone = (roll || floaty) ? (b.t > (b.kind === 'bub' ? 6 : 4.5) || (G.arena && (b.x < G.arena.x0 || b.x > G.arena.x1)) || (floaty && (b.y > VIEW_H || solid(tileAt(Math.floor(b.x / T), Math.floor(b.y / T)))))) : (solid(tileAt(Math.floor(b.x / T), Math.floor((b.y + (b.kind ? 5 : 10)) / T))) || b.y > VIEW_H || b.t > 6);
    const hb = b.r ? { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 } : b.kind === 'magic' ? { x: b.x - 5, y: b.y - 5, w: 10, h: 10 } : b.kind === 'puff' ? { x: b.x - 7, y: b.y - 6, w: 14, h: 12 } : b.kind === 'acorn' ? { x: b.x - 4, y: b.y - 4, w: 8, h: 8 } : { x: b.x - 4, y: b.y - 9, w: 8, h: 18 };
    if (gone) { b.dead = true; burst(b.x, b.y + 4, 6, b.kind === 'puff' ? ['#fff', '#e8dcff'] : ['#ffe14d', '#fff'], 80); }
    else if (overlap(P, hb)) { b.dead = true; hurtPlayer(false); }
  }
  G.bolts = G.bolts.filter(b => !b.dead);
  G.enemies = G.enemies.filter(e => !e.dead);

  // друг
  F.t += dt;
  if (save.profile.friend !== 'none') {
    const tx = pcx - P.dir * 26, ty = (P.flip ? P.y + P.h + 10 : P.y - 10) + Math.sin(F.t * 3) * 4;
    F.x += (tx - F.x) * Math.min(1, dt * 4.5); F.y += (ty - F.y) * Math.min(1, dt * 4.5); F.dir = P.dir;
  }

  // ворота
  const gt = G.gate;
  if (!gt.open && G.points >= G.need && (!G.boss || G.bossDefeated)) { gt.open = true; Snd.gate(); if (!G.boss) say('Ворота відчинилися!', 2.4); burst(gt.x, gt.gy - 30, 30, RAINBOW, 180); }
  if (gt.open && Math.abs(pcx - gt.x) < 16 && P.y + P.h > gt.gy - 52) levelComplete();
  else if (!gt.open && Math.abs(pcx - gt.x) < 30 && (!G.msg || G.msg.t < 0.5)) {
    if (G.boss && !G.bossDefeated) say('Спочатку переможи ' + G.boss.acc, 1.8);
    else say('Ще ' + (G.need - G.points) + ' ' + starWord(G.need - G.points) + ', і ворота відчиняться', 1.8);
  }

  // камера
  const viewWNow = viewW;
  const camTarget = pcx - viewWNow * 0.42 + P.dir * 18;
  const minCam = G.arenaLock ? G.arena.x0 - T : 0, maxCam = Math.max(0, G.Wpx - viewWNow);
  G.cam += (Math.max(minCam, Math.min(maxCam, camTarget)) - G.cam) * Math.min(1, dt * 6);
  G.cam = Math.max(0, Math.min(maxCam, G.cam));
  if (G.flash > 0) G.flash -= dt;
  if (G.msg) { G.msg.t -= dt; if (G.msg.t <= 0) G.msg = null; }
  updateParts(dt);
}
function giveStar(x, y) {
  G.points += 1; G.combo = G.comboT > 0 ? G.combo + 1 : 0; G.comboT = 0.7; Snd.star(G.combo);
  G.parts.push({ k: 'starpop', x, y, vx: 0, vy: -170, t: 0, life: 0.55 });
}
function bumpBlock(tx, ty) {
  const i = ty * G.Wt + tx, cnt = G.qContent.get(i) || 'star', x = tx * T + 12, y = ty * T - 8;
  G.bumps.set(i, 0.18); Snd.bump();
  if (cnt === 'star5') { const left = (G.qLeft.has(i) ? G.qLeft.get(i) : 5) - 1; G.qLeft.set(i, left); giveStar(x, y); if (left <= 0) G.map[i] = 8; }
  else {
    G.map[i] = 8;
    if (cnt === 'star') giveStar(x, y);
    else if (cnt === 'rainbow') { G.points += 10; G.rainbows++; Snd.rainbow(); floatText(x, y - 10, '+10', '#ff4fa3'); burst(x, y, 18, RAINBOW, 160); }
    else { G.powers.push({ k: cnt, x, y: ty * T - 14, t: 0 }); Snd.power(); }
  }
  for (const e of G.enemies) if (!e.dead && Math.abs(e.x + e.w / 2 - x) < 18 && Math.abs(e.y + e.h - ty * T) < 5) defeat(e);
}
function tryDoor(tx, ty) {
  if (G.keysHeld <= 0) { if (!G.msg || G.msg.t < 0.4) say('Потрібен ключик! Пошукай його', 1.6); return; }
  G.keysHeld--; Snd.door();
  let y0 = ty; while (y0 > 0 && G.map[(y0 - 1) * G.Wt + tx] === 11) y0--;
  for (let y = y0; y < ROWS && G.map[y * G.Wt + tx] === 11; y++) { G.map[y * G.Wt + tx] = 0; burst(tx * T + 12, y * T + 12, 6, ['#ffcc33', '#fff', '#b8783e'], 110); }
  say('Двері відчинилися!', 1.4);
}
function toggleSwitch() {
  G.sw = !G.sw; Snd.click(); G.flash = 0.08;
  const P = G.P;
  for (let k = 0; k < 4; k++) {
    let top = -1;
    for (let ty = Math.floor(P.y / T); ty <= Math.floor((P.y + P.h - 0.01) / T); ty++) for (let tx = Math.floor(P.x / T); tx <= Math.floor((P.x + P.w - 0.01) / T); tx++) if (solid(tileAt(tx, ty)) && (top < 0 || ty < top)) top = ty;
    if (top < 0) break;
    P.y = top * T - P.h; P.vy = Math.min(P.vy, 0);
  }
  for (const e of G.enemies) if (!e.dead && solid(tileAt(Math.floor((e.x + e.w / 2) / T), Math.floor((e.y + e.h / 2) / T)))) defeat(e);
}
function updatePlatform(m, dt) {
  if (m.bubble) return updateBubble(m, dt);
  if (m.cart) return updateCart(m, dt);
  if (m.sheep) return updateSheep(m, dt);
  if (m.ice) return updateIce(m, dt);
  if (m.log) return updateLog(m, dt);
  if (m.dolphin) return updateDolphin(m, dt);
  if (m.whale) return updateWhale(m, dt);
  if (m.coaster) return updateCoaster(m, dt);
  if (m.ball) return updateBall(m, dt);
  const y0 = m.y; m.dx = 0; m.dy = 0; m.st += dt;
  if (m.crumble) {
    if (m.state === 'idle') { m.y = m.by; if (G.P.onMover === m) { m.state = 'shake'; m.st = 0; Snd.tone(240, 0.25, 'triangle', 0.05, 150); } }
    else if (m.state === 'shake') { if (m.st > 0.45) { m.state = 'fall'; m.st = 0; m.vy = 0; } }
    else if (m.state === 'fall') { m.vy += 1100 * dt; m.y += m.vy * dt; m.dy = m.y - y0; if (m.y > VIEW_H + 40) { m.state = 'gone'; m.st = 0; } }
    else if (m.st > 2.6) { m.state = 'idle'; m.st = 0; m.y = m.by; m.vy = 0; }
  } else {
    if (m.state === 'wait') { m.y = m.by; if (m.st > 1.1) { m.state = 'rise'; m.st = 0; } }
    else if (m.state === 'rise') { m.y = Math.max(46, m.y - 48 * dt); m.dy = m.y - y0; if (m.y <= 46) { m.state = 'top'; m.st = 0; } }
    else if (m.state === 'top') { if (m.st > 0.8) { m.state = 'gone'; m.st = 0; if (Math.abs(m.x - G.P.x) < 420) Snd.pop(); burst(m.x + m.w / 2, m.y - 38, 16, RAINBOW, 150); } }
    else if (m.st > 1.4) { m.state = 'wait'; m.st = 0; m.y = m.by; }
  }
}
function updateParts(dt) {
  for (const p of G.parts) { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.k === 'spark') p.vy += 160 * dt; }
  G.parts = G.parts.filter(p => p.t < p.life);
  for (const f of G.flys) { f.t += dt; f.x += f.vx * dt + Math.sin(f.t * 3) * 0.5; f.y -= 22 * dt; }
  G.flys = G.flys.filter(f => f.t < 4);
  for (const f of G.flowers) f.t += dt;
}
function starWord(n) { const a = Math.abs(n) % 100, b = a % 10; if (a > 10 && a < 20) return 'зірочок'; if (b === 1) return 'зірочка'; if (b >= 2 && b <= 4) return 'зірочки'; return 'зірочок'; }

function levelComplete() {
  if (G.done) return;
  G.done = true; G.doneT = 0; Snd.win(); burst(G.gate.x, G.gate.gy - 30, 40, RAINBOW, 200);
  const prev = save.best[G.idx] || 0;
  save.best[G.idx] = Math.max(prev, G.points);
  save.unlocked = Math.max(save.unlocked, Math.min(LEVELS.length, G.idx + 2));
  if (G.idx === LEVELS.length - 1) save.finished = true;
  save.record = Object.values(save.best).reduce((a, b) => a + b, 0);
  writeSave();
  setTimeout(() => showWin(), 1100);
}
