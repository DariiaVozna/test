'use strict';
/* ===== Теми світів: небо, земля, декор ===== */
const THEMES = {
  meadow: { sky: ['#ffbfe0', '#ffe4f1', '#fff3d9'], panel: '#4a2550', top: '#7ddc7e', topHi: '#b0f0a2', topLo: '#3eae5c', fill: '#f5a3c7', fillLo: '#e886b0', dots: ['#fff', '#ffe066', '#7fd6ff', '#9b7bff'], block: 'candy', ice: false, topStyle: 'grass', dotShape: 'sprinkle' },
  clouds: { sky: ['#93ccff', '#cfe8ff', '#ffe6f4'], panel: '#22427a', top: '#ffffff', topHi: '#ffffff', topLo: '#c5dcf7', fill: '#e4f0ff', fillLo: '#cadff7', dots: ['#ffffff', '#ffe9a8', '#ffd2ea'], block: 'puff', ice: false, topStyle: 'snow', dotShape: 'dot' },
  forest: { sky: ['#120d33', '#28215f', '#4a3e8e'], panel: '#0d0a24', top: '#3f9b6b', topHi: '#6fcf8f', topLo: '#246345', fill: '#3d2c52', fillLo: '#2f2143', dots: ['#5b4777', '#6e5a8c', '#8ef0c0'], block: 'crate', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  ice: { sky: ['#a6deff', '#dcf3ff', '#ffffff'], panel: '#24506f', top: '#ffffff', topHi: '#ffffff', topLo: '#b9def5', fill: '#86cdf0', fillLo: '#6bb8e3', dots: ['#d8f3ff', '#ffffff'], block: 'icecube', ice: true, topStyle: 'snow', fillStyle: 'streaks' },
  castle: { sky: ['#352a58', '#5b4a85', '#8f79b0'], panel: '#1d1636', top: '#b3a6d4', topHi: '#d6cbef', topLo: '#7d70a6', fill: '#5d5182', fillLo: '#4b4070', dots: ['#6e6296'], block: 'stone', ice: false, topStyle: 'stone', fillStyle: 'bricks' },
  garden: { sky: ['#9fd8ff', '#d6f0ff', '#fff5c8'], panel: '#2f5a44', top: '#72d46f', topHi: '#a8ef9c', topLo: '#3f9e4f', fill: '#b97a4f', fillLo: '#9a6040', dots: ['#d9a273', '#8a5434', '#e6bf8f'], block: 'honey', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  lagoon: { sky: ['#7fd8f0', '#c4f0ff', '#fff2d6'], panel: '#135a78', top: '#fff0c4', topHi: '#ffffff', topLo: '#e9c886', fill: '#f3cf8e', fillLo: '#e2b56d', dots: ['#fff4d6', '#f5a3b5', '#ffffff', '#d9a86a'], block: 'coral', ice: false, topStyle: 'sand', dotShape: 'dot' },
  volcano: { sky: ['#ff9a8a', '#ffc49a', '#ffe6b8'], panel: '#4a1f2e', top: '#7a4030', topHi: '#ffb547', topLo: '#5e3424', fill: '#6b3a26', fillLo: '#55301f', dots: ['#ff7ab8', '#ffe14d', '#7fd6ff', '#ffffff'], block: 'choco', ice: false, topStyle: 'drip', dotShape: 'sprinkle' },
  space: { sky: ['#0b0820', '#1d1450', '#3a2470'], panel: '#07051a', top: '#cfc8f0', topHi: '#ece8ff', topLo: '#a69dd6', fill: '#8f86c4', fillLo: '#776eb0', dots: [], block: 'starblock', ice: false, topStyle: 'crater', fillStyle: 'craters' },
  autumn: { sky: ['#ffcf9e', '#ffe6c4', '#fff6e0'], panel: '#5a3320', top: '#c9d46b', topHi: '#e9ef9c', topLo: '#8fa040', fill: '#8a5a3a', fillLo: '#6e4529', dots: ['#c08458', '#5a3a24', '#e0a070'], block: 'wood', ice: false, topStyle: 'leaves', dotShape: 'pebble' },
  balloons: { sky: ['#8fd3ff', '#c9ecff', '#fff3d6'], panel: '#2a5d8a', top: '#86df73', topHi: '#b8f2a6', topLo: '#4fb055', fill: '#f0c38a', fillLo: '#dca66a', dots: ['#ffe1b0', '#c98d55', '#ffffff'], block: 'gift', ice: false, topStyle: 'grass', dotShape: 'dot' },
  toys: { sky: ['#ffe9d6', '#fff1e6', '#fff8f0'], panel: '#5a3a6a', top: '#e3a868', topHi: '#f6c890', topLo: '#b9783f', fill: '#d99a5c', fillLo: '#c3844a', dots: [], block: 'abc', ice: false, topStyle: 'plank', fillStyle: 'planks' },
  desert: { sky: ['#ffd98a', '#ffe9b8', '#fff6dc'], panel: '#7a4a1e', top: '#ffe0a0', topHi: '#fff2cc', topLo: '#e6b866', fill: '#eab86a', fillLo: '#d49e4e', dots: ['#f6d08e', '#c98d45', '#fff0c0'], block: 'sandstone', ice: false, topStyle: 'sand', dotShape: 'dot' },
  tower: { sky: ['#f7a8c8', '#ffc9d6', '#ffe6d6'], panel: '#4a2040', top: '#f3c4d4', topHi: '#ffe4ec', topLo: '#cc8fa6', fill: '#b8718c', fillLo: '#9c5a74', dots: [], block: 'rose', ice: false, topStyle: 'stone', fillStyle: 'bricks' },
  cave: { sky: ['#140d2a', '#21173f', '#2d1f52'], panel: '#0a0618', top: '#5fd3b8', topHi: '#9ff0dc', topLo: '#2f9e86', fill: '#4a3d6b', fillLo: '#3a2f57', dots: ['#5b4c80', '#6e5c96', '#8ef0d8'], block: 'cavestone', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  portal: { sky: ['#ffb3d9', '#d9c6ff', '#b8e8ff'], panel: '#3a2a6a', top: '#8fe3c8', topHi: '#c6f5e6', topLo: '#4fb89a', fill: '#7d6bc9', fillLo: '#6a58b5', dots: ['#9f8de0', '#c9b6ff', '#ffe1f3'], block: 'rune', ice: false, topStyle: 'grass', dotShape: 'dot' },
  button: { sky: ['#9fe0ff', '#d6f3ff', '#fff4dc'], panel: '#2a4a7a', top: '#ffd6e8', topHi: '#fff0f6', topLo: '#f0a8c8', fill: '#ffe9b8', fillLo: '#f5d48f', dots: [], block: 'gift', ice: false, topStyle: 'stone', fillStyle: 'checker' },
  maze: { sky: ['#bfe8ff', '#e6f7ff', '#f7fff0'], panel: '#2f5a3a', top: '#ddd6c8', topHi: '#f4f0e8', topLo: '#b8ae9c', fill: '#a89a84', fillLo: '#94866f', dots: ['#c4b8a4', '#8a7c66', '#e0d6c4'], block: 'hedge', ice: false, topStyle: 'sand', dotShape: 'pebble' },
  wizard: { sky: ['#0f1440', '#26206a', '#4a3a8e'], panel: '#080a24', top: '#b9a8ff', topHi: '#ddd4ff', topLo: '#7d6bc9', fill: '#4a3a8e', fillLo: '#3a2c75', dots: [], block: 'starblock', ice: false, topStyle: 'stone', fillStyle: 'bricks' },
  palace: { sky: ['#dcc0ff', '#f3e0ff', '#fff0fa'], panel: '#3b2a63', top: '#efe6ff', topHi: '#ffffff', topLo: '#c9b4f2', fill: '#c4b0f5', fillLo: '#a993e8', dots: [], block: 'gem', ice: false, topStyle: 'crystal', fillStyle: 'facets' },
  jungle: { sky: ['#9fe3c8', '#d4f5dc', '#fff6d0'], panel: '#1f4a32', top: '#5fcf5a', topHi: '#9be88a', topLo: '#2f9a46', fill: '#8a5a36', fillLo: '#6e4428', dots: ['#a87048', '#5a3a24', '#c99060'], block: 'bamboo', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  bubbles: { sky: ['#ffc9ec', '#d9ecff', '#e9fff6'], panel: '#3a3a7a', top: '#ffffff', topHi: '#ffffff', topLo: '#cfe3ff', fill: '#b9d9ff', fillLo: '#9cc4f5', dots: ['#ffffff', '#ffd6f0', '#e0f4ff'], block: 'soap', ice: false, topStyle: 'snow', dotShape: 'dot' },
  bakery: { sky: ['#ffd9e4', '#ffeef2', '#fff8ec'], panel: '#5a2f3a', top: '#ffe3f0', topHi: '#fffafc', topLo: '#f2c9dc', fill: '#d9925a', fillLo: '#b9743f', dots: ['#ff7ab8', '#7fd6ff', '#ffe14d', '#9ff0c4'], block: 'cake', ice: false, topStyle: 'drip', dotShape: 'sprinkle' },
  pirate: { sky: ['#8fd8ff', '#c6ecff', '#fff3d6'], panel: '#20405a', top: '#c98d55', topHi: '#e3b07a', topLo: '#8a5a30', fill: '#a8743f', fillLo: '#8a5a30', dots: [], block: 'barrel', ice: false, topStyle: 'plank', fillStyle: 'planks' },
  sea: { sky: ['#3aa6d6', '#6ccbe8', '#a8e6f2'], panel: '#0c3550', top: '#ffe2a8', topHi: '#fff2cc', topLo: '#e2b56d', fill: '#f0c98a', fillLo: '#dcae68', dots: ['#ffb3c6', '#fff4d6', '#c98d55'], block: 'pearl', ice: false, topStyle: 'sand', dotShape: 'dot' },
  music: { sky: ['#c9b6ff', '#e6dcff', '#fff0fa'], panel: '#2a1f4a', top: '#fffaf2', topHi: '#ffffff', topLo: '#d9d2e6', fill: '#4a3a7a', fillLo: '#3b2d66', dots: ['#ffd23f', '#ff7ab8', '#7fd6ff'], block: 'speaker', ice: false, topStyle: 'piano', dotShape: 'dot' },
  circus: { sky: ['#ffcf8a', '#ffe6c4', '#fff6e6'], panel: '#5a1f2a', top: '#ff5c7a', topHi: '#ff9fb0', topLo: '#c9304f', fill: '#fff3e0', fillLo: '#ff9fb0', dots: [], block: 'circus', ice: false, topStyle: 'plank', fillStyle: 'stripes' },
  dino: { sky: ['#ffd6a0', '#ffe9c4', '#e9f7d6'], panel: '#3a3020', top: '#7cc96a', topHi: '#a8e892', topLo: '#4f9a48', fill: '#c98d5a', fillLo: '#a8703f', dots: ['#e0a878', '#8a5a36', '#f2d6b0'], block: 'fossil', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  snow: { sky: ['#8f7fd9', '#c9b0ee', '#ffdcec'], panel: '#2a2a5a', top: '#ffffff', topHi: '#ffffff', topLo: '#cfdaf5', fill: '#9fa8e6', fillLo: '#8a92d6', dots: ['#c9d2ff', '#ffffff', '#b8c4f5'], block: 'gift', ice: true, topStyle: 'snow', dotShape: 'dot' },
  beans: { sky: ['#9fdcff', '#d6f2ff', '#f2ffe0'], panel: '#24502f', top: '#6fcf5a', topHi: '#a8ef8f', topLo: '#3f9e4f', fill: '#7a4f30', fillLo: '#5f3d24', dots: ['#9a6a42', '#5a3a24', '#b8865a'], block: 'cabbage', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  lantern: { sky: ['#0f1240', '#22205e', '#3a2f7a'], panel: '#080a24', top: '#3f8f7a', topHi: '#6fcfb0', topLo: '#246350', fill: '#2f2a5a', fillLo: '#252048', dots: ['#3f3a70', '#4a4580', '#ffe9a8'], block: 'lanternbox', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  rainbow: { sky: ['#ffd1ec', '#e6e0ff', '#d6f4ff'], panel: '#3a2f6a', top: '#ffffff', topHi: '#ffffff', topLo: '#e6e0ff', fill: '#fff4fa', fillLo: '#f2e6ff', dots: [], block: 'prism', ice: false, topStyle: 'snow', fillStyle: 'rainbowfill' },
  mine: { sky: ['#3a2f4a', '#5a4a6a', '#7a6a8a'], panel: '#1d1626', top: '#9a8aa6', topHi: '#c9bcd6', topLo: '#6e5f80', fill: '#6b5a7a', fillLo: '#584a68', dots: ['#7fd6ff', '#ff9fd0', '#ffe14d'], block: 'ore', ice: false, topStyle: 'stone', dotShape: 'dot' },
  burrow: { sky: ['#5a3a28', '#7a5038', '#9a6a48'], panel: '#2a1a12', top: '#b8865a', topHi: '#d9a878', topLo: '#8a5a36', fill: '#7a4f30', fillLo: '#633f26', dots: ['#9a6a42', '#5a3a24', '#c99060'], block: 'roots', ice: false, topStyle: 'sand', dotShape: 'pebble' },
  peaks: { sky: ['#9fd4ff', '#d6eeff', '#fff6e6'], panel: '#2a3a5a', top: '#7fcf6a', topHi: '#b0ef9a', topLo: '#4f9a48', fill: '#a89a8a', fillLo: '#8f8172', dots: ['#c9bcae', '#7d7064', '#e6ddd2'], block: 'rockblock', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  windmill: { sky: ['#9fdcff', '#d6f2ff', '#fff3d6'], panel: '#3a4a2a', top: '#86df73', topHi: '#b8f2a6', topLo: '#4fb055', fill: '#c99a5a', fillLo: '#ad7f45', dots: ['#e0b878', '#8a5a36', '#f2d6a0'], block: 'haybale', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  tiny: { sky: ['#bfeeff', '#e6fbff', '#f6ffe6'], panel: '#24502f', top: '#8fe36a', topHi: '#c6f5a8', topLo: '#4fb055', fill: '#9a6a42', fillLo: '#7e5432', dots: ['#c99060', '#6e4428', '#e0b080'], block: 'trunk', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  swing: { sky: ['#ffc9a0', '#ffe2c4', '#eef7d6'], panel: '#4a3020', top: '#a8d46a', topHi: '#d0ef9c', topLo: '#6fa040', fill: '#8a5a3a', fillLo: '#6e4529', dots: ['#c08458', '#5a3a24', '#e0a070'], block: 'wood', ice: false, topStyle: 'leaves', dotShape: 'pebble' },
  dream: { sky: ['#2a2a6e', '#5a4aa0', '#9a7ad0'], panel: '#14123a', top: '#f2eaff', topHi: '#ffffff', topLo: '#c9b6ff', fill: '#9a86d9', fillLo: '#8573c6', dots: ['#fff6c8', '#ffd6f0', '#c9f0ff'], block: 'pillowblock', ice: false, topStyle: 'snow', dotShape: 'dot' },
  tide: { sky: ['#8fd8ff', '#c6ecff', '#fff3d6'], panel: '#20405a', top: '#ffe2a8', topHi: '#fff2cc', topLo: '#e2b56d', fill: '#e6c48e', fillLo: '#d0aa6e', dots: ['#fff4d6', '#f5a3b5', '#c98d55'], block: 'driftwood', ice: false, topStyle: 'sand', dotShape: 'dot' },
  aurora: { sky: ['#0f1a3a', '#1e3060', '#3a5a8a'], panel: '#0a1024', top: '#ffffff', topHi: '#ffffff', topLo: '#c9daf5', fill: '#8fa6d9', fillLo: '#7a92c8', dots: ['#c9d8ff', '#ffffff', '#7fdcb0'], block: 'iceglow', ice: false, topStyle: 'snow', dotShape: 'dot' },
  storm: { sky: ['#7a8ab8', '#a8b6d9', '#d6def0'], panel: '#2a3050', top: '#7fcf8a', topHi: '#b0efa8', topLo: '#4f9a5a', fill: '#7a6a8a', fillLo: '#665878', dots: ['#8f80a0', '#5a4a6a', '#a8b6d9'], block: 'thunder', ice: false, topStyle: 'grass', dotShape: 'pebble' },
  moon: { sky: ['#0b0820', '#1d1450', '#3a2470'], panel: '#07051a', top: '#d6d2e6', topHi: '#f0eeff', topLo: '#a8a2ba', fill: '#a8a2ba', fillLo: '#928ca6', dots: [], block: 'moonrock', ice: false, topStyle: 'crater', fillStyle: 'craters' },
  station: { sky: ['#c9d0e8', '#dbe0f2', '#eef0fa'], panel: '#1d2240', top: '#aab4d6', topHi: '#d6dcf0', topLo: '#7d8aa6', fill: '#8f9cc8', fillLo: '#7d8ab6', dots: [], block: 'panel', ice: false, topStyle: 'stone', fillStyle: 'rivets' },
  factory: { sky: ['#b8c6e6', '#dbe3f2', '#f4f2fa'], panel: '#2a3040', top: '#9aa6c0', topHi: '#c9d2e6', topLo: '#6e7a96', fill: '#8a96b3', fillLo: '#76829f', dots: [], block: 'metal', ice: false, topStyle: 'stone', fillStyle: 'rivets' },
};
const PLANKS = { tide: ['#d9b48a', '#a8865e'], moon: ['#c9d2e6', '#7d8aa6'], station: ['#c9d2e6', '#7d8aa6'], peaks: ['#c98d55', '#8a5a30'], windmill: ['#e3b26b', '#a8743f'], swing: ['#c98d55', '#8a5a30'], mine: ['#c98d55', '#8a5a30'], burrow: ['#c98d55', '#8a5a30'], lagoon: ['#d9a36c', '#a8743f'], desert: ['#d9a36c', '#a8743f'], toys: ['#ffcf6b', '#a8743f'], jungle: ['#c98d55', '#8a5a30'], pirate: ['#d9a36c', '#a8743f'], bakery: ['#f3c27a', '#c98d45'], circus: ['#ff9fb0', '#c9304f'], dino: ['#c9b49a', '#9c8670'], factory: ['#c9d2e6', '#7d8aa6'] };

/* Спрайт плитки: kind = top | fill | block | cloud; l/r = відкритий край зліва/справа */
const tileCache = new Map();
function tileSprite(theme, kind, l, r, ps) {
  const key = theme + kind + (l ? 1 : 0) + (r ? 1 : 0) + ps.toFixed(3);
  let cv = tileCache.get(key); if (cv) return cv;
  if (kind === 'ceil') {
    // стеля в країні догори дриґом: верхня плитка, перевернута травою донизу
    const top = tileSprite(theme, 'top', l, r, ps), S2 = top.width;
    cv = makeCanvas(S2, S2); const c2 = cv.getContext('2d');
    c2.translate(0, S2); c2.scale(1, -1); c2.drawImage(top, 0, 0);
    tileCache.set(key, cv); return cv;
  }
  const S = Math.ceil(T * ps) + 1;
  cv = makeCanvas(S, S); const c = cv.getContext('2d');
  c.scale(ps, ps); c.lineJoin = 'round'; c.lineCap = 'round';
  const th = THEMES[theme], R = rng(kind.length * 97 + (l ? 13 : 0) + (r ? 29 : 0) + theme.length * 7);
  const roundL = l ? 7 : 0, roundR = r ? 7 : 0;
  const shape = (top) => { c.beginPath(); c.moveTo(roundL, top); c.lineTo(T - roundR, top); if (roundR) c.quadraticCurveTo(T, top, T, top + roundR); c.lineTo(T, T + 1); c.lineTo(0, T + 1); c.lineTo(0, top + roundL); if (roundL) c.quadraticCurveTo(0, top, roundL, top); c.closePath(); };
  if (kind === 'fill' || kind === 'top') {
    c.save(); shape(kind === 'top' ? 1 : -1); c.clip();
    c.fillStyle = th.fill; c.fillRect(0, -1, T + 1, T + 2);
    const fs = th.fillStyle || 'dots';
    if (fs === 'bricks') {
      c.strokeStyle = th.fillLo; c.lineWidth = 1.4;
      for (let y = 0; y < T; y += 8) { c.beginPath(); c.moveTo(0, y); c.lineTo(T, y); c.stroke(); const off = (y / 8) % 2 ? 6 : 18; c.beginPath(); c.moveTo(off, y); c.lineTo(off, y + 8); c.stroke(); }
    } else if (fs === 'streaks') {
      c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(4 + R() * 6, 22); c.lineTo(10 + R() * 6, 12); c.moveTo(14 + R() * 4, 23); c.lineTo(18 + R() * 4, 17); c.stroke();
    } else if (fs === 'facets') {
      c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineWidth = 1.2;
      c.beginPath(); c.moveTo(0, 6 + R() * 4); c.lineTo(T * 0.55, T); c.moveTo(T * 0.4, 0); c.lineTo(T, T * 0.6); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.22)'; c.beginPath(); c.moveTo(4, 5); c.lineTo(12, 5); c.lineTo(4, 14); c.closePath(); c.fill();
    } else if (fs === 'checker') {
      c.fillStyle = th.fillLo; c.globalAlpha = 0.55; c.fillRect(0, 0, 12, 12); c.fillRect(12, 12, 12, 12); c.globalAlpha = 1;
    } else if (fs === 'planks') {
      c.strokeStyle = th.fillLo; c.lineWidth = 1.3;
      for (let y = 6; y < T; y += 7) { c.beginPath(); c.moveTo(0, y); c.lineTo(T + 1, y); c.stroke(); }
      c.beginPath(); c.moveTo(9, 6); c.lineTo(9, 13); c.moveTo(18, 13); c.lineTo(18, 20); c.stroke();
      c.fillStyle = th.fillLo; circ(c, 4, 9.5, 0.9); c.fill(); circ(c, 14, 16.5, 0.9); c.fill();
    } else if (fs === 'stripes') {
      c.fillStyle = th.fillLo; c.fillRect(2, -1, 8, T + 2); c.fillRect(14, -1, 8, T + 2);
      c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(3, -1, 1.5, T + 2); c.fillRect(15, -1, 1.5, T + 2);
    } else if (fs === 'rainbowfill') {
      const cols = ['#ffd6e0', '#ffe6c4', '#fff6c4', '#d6f5dc', '#d6ecff', '#e6dcff'];
      for (let i = 0; i < 6; i++) { c.fillStyle = cols[i]; c.fillRect(0, i * 4, T + 1, 4.2); }
    } else if (fs === 'rivets') {
      c.strokeStyle = th.fillLo; c.lineWidth = 1.4; c.strokeRect(1.5, 1.5, T - 3, T - 3);
      c.fillStyle = th.fillLo; for (const [dx, dy] of [[5, 5], [19, 5], [5, 19], [19, 19]]) { circ(c, dx, dy, 1.4); c.fill(); }
      c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(3, 3, T - 6, 2);
    } else if (fs === 'craters') {
      for (let i = 0; i < 2; i++) { const cx = 4 + R() * 16, cy = 9 + R() * 11, rr2 = 2 + R() * 2.5; c.fillStyle = th.fillLo; ell(c, cx, cy, rr2, rr2 * 0.7); c.fill(); c.fillStyle = 'rgba(255,255,255,.18)'; ell(c, cx + 0.6, cy + rr2 * 0.35, rr2 * 0.8, rr2 * 0.35); c.fill(); }
    } else {
      for (let i = 0; i < 4 && th.dots.length; i++) {
        c.save(); c.translate(R() * T, 6 + R() * (T - 6)); c.rotate(R() * TAU);
        c.fillStyle = th.dots[Math.floor(R() * th.dots.length)];
        if (th.dotShape === 'sprinkle') rr(c, -2.2, -0.8, 4.4, 1.6, 0.8); else if (th.dotShape === 'pebble') ell(c, 0, 0, 2.2, 1.5); else circ(c, 0, 0, 1.6);
        c.fill(); c.restore();
      }
    }
    c.fillStyle = th.fillLo; c.globalAlpha = 0.5; c.fillRect(0, T - 3, T + 1, 4); c.globalAlpha = 1;
    c.restore();
    if (kind === 'top') {
      c.save(); shape(1); c.clip();
      const ts = th.topStyle;
      if (ts === 'grass') {
        c.fillStyle = th.top; c.fillRect(0, 0, T + 1, 6.5);
        for (let x = 2; x < T + 3; x += 5) { circ(c, x, 6.5, 2.6); c.fill(); }
        c.fillStyle = th.topHi; c.fillRect(0, 1, T + 1, 1.6);
        if (theme === 'forest') { c.strokeStyle = th.topHi; c.lineWidth = 1; for (let i = 0; i < 3; i++) { const gx = 3 + R() * 18; c.beginPath(); c.moveTo(gx, 2); c.lineTo(gx - 1, -2); c.stroke(); } }
      } else if (ts === 'leaves') {
        c.fillStyle = th.top; c.fillRect(0, 0, T + 1, 6.5);
        for (let x = 2; x < T + 3; x += 5) { circ(c, x, 6.5, 2.6); c.fill(); }
        c.fillStyle = th.topHi; c.fillRect(0, 1, T + 1, 1.6);
        for (let i = 0; i < 3; i++) { c.fillStyle = ['#ff8a3d', '#e85d3a', '#ffd23f'][i]; ell(c, 3 + R() * 18, 3 + R() * 3, 2.6, 1.3, R() * 3); c.fill(); }
      } else if (ts === 'plank') {
        c.fillStyle = th.top; c.fillRect(0, 0, T + 1, 6.5);
        c.fillStyle = th.topHi; c.fillRect(0, 1.2, T + 1, 1.5);
        c.fillStyle = th.topLo; c.fillRect(0, 6, T + 1, 1.2);
      } else if (ts === 'snow') {
        c.fillStyle = th.top; c.fillRect(0, 0, T + 1, 7);
        for (let x = 3; x < T + 3; x += 6) { circ(c, x, 7.5, 3.2); c.fill(); }
        c.fillStyle = th.topLo; c.globalAlpha = 0.6; for (let x = 3; x < T + 3; x += 6) { ell(c, x, 10.2, 2.6, 0.9); c.fill(); } c.globalAlpha = 1;
        if (theme === 'ice') { c.fillStyle = '#ffffff'; for (let i = 0; i < 2; i++) { const ix = 4 + R() * 16; c.beginPath(); c.moveTo(ix, 10); c.lineTo(ix + 2.2, 10); c.lineTo(ix + 1.1, 15); c.closePath(); c.fill(); } }
      } else if (ts === 'sand') {
        c.fillStyle = th.top; c.fillRect(0, 0, T + 1, 7);
        for (let x = 2; x < T + 3; x += 6) { circ(c, x, 7, 2.4); c.fill(); }
        c.fillStyle = th.topHi; c.fillRect(0, 1, T + 1, 1.4);
        c.fillStyle = th.topLo; for (let i = 0; i < 3; i++) { circ(c, 3 + R() * 18, 3 + R() * 3, 0.8); c.fill(); }
      } else if (ts === 'drip') {
        c.fillStyle = th.top; c.fillRect(0, 0, T + 1, 6);
        c.fillStyle = th.topHi; c.fillRect(0, 0, T + 1, 4.2);
        for (let i = 0; i < 2; i++) { const dx = 3 + R() * 16, dl = 4 + R() * 6; rr(c, dx, 2, 3.4, dl, 1.7); c.fill(); }
        c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 1.4, T + 1, 1);
      } else if (ts === 'crater') {
        c.fillStyle = th.top; c.fillRect(0, 0, T + 1, 6);
        c.fillStyle = th.topHi; c.fillRect(0, 1, T + 1, 1.5);
        c.fillStyle = th.topLo; ell(c, 6 + R() * 12, 4, 2.4, 1.1); c.fill();
      } else if (ts === 'piano') {
        drawPianoTop(c);
      } else if (ts === 'crystal') {
        c.fillStyle = th.top; c.fillRect(0, 0, T + 1, 6.5);
        c.fillStyle = th.topLo; for (let x = 0; x < T + 4; x += 6) { c.beginPath(); c.moveTo(x, 6.5); c.lineTo(x + 3, 10); c.lineTo(x + 6, 6.5); c.closePath(); c.fill(); }
        c.fillStyle = th.topHi; c.fillRect(0, 1, T + 1, 1.5);
      } else {
        c.fillStyle = th.top; c.fillRect(0, 0, T + 1, 7); c.fillStyle = th.topHi; c.fillRect(0, 1, T + 1, 1.5);
        c.strokeStyle = th.topLo; c.lineWidth = 1; c.beginPath(); c.moveTo(0, 7); c.lineTo(T + 1, 7); c.moveTo(12, 0); c.lineTo(12, 7); c.stroke();
      }
      c.restore();
      c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath();
      if (l) { c.moveTo(0.7, T + 1); c.lineTo(0.7, 1 + roundL); c.quadraticCurveTo(0.7, 1.7, roundL, 1.7); } else c.moveTo(0, 1.7);
      if (r) { c.lineTo(T - roundR, 1.7); c.quadraticCurveTo(T - 0.7, 1.7, T - 0.7, 1 + roundR); c.lineTo(T - 0.7, T + 1); } else c.lineTo(T + 1, 1.7);
      c.stroke();
    } else {
      c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath();
      if (l) { c.moveTo(0.7, -1); c.lineTo(0.7, T + 1); } if (r) { c.moveTo(T - 0.7, -1); c.lineTo(T - 0.7, T + 1); } c.stroke();
    }
  } else if (kind === 'block') {
    const b = th.block;
    c.strokeStyle = INK; c.lineWidth = 1.4;
    if (b === 'candy') {
      rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#fff'; c.fill();
      c.save(); rr(c, 1, 1, T - 2, T - 2, 5); c.clip(); c.strokeStyle = '#ff6fae'; c.lineWidth = 3.4;
      for (let i = -T; i < T * 2; i += 8) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i + T, T); c.stroke(); } c.restore();
      c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, 1, 1, T - 2, T - 2, 5); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.8)'; ell(c, 7, 5.5, 4, 1.6, -0.3); c.fill();
    } else if (b === 'puff') {
      rr(c, 1, 1, T - 2, T - 2, 8); c.fillStyle = '#fff'; c.fill(); c.stroke();
      c.fillStyle = '#ffd86b'; starPath(c, T / 2, T / 2 + 0.5, 5, 2.3, 0); c.fill(); c.strokeStyle = '#c98200'; c.lineWidth = 0.9; c.stroke();
    } else if (b === 'crate') {
      rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#9a6a45'; c.fill(); c.stroke();
      c.strokeStyle = '#6b4630'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(3, 8.5); c.lineTo(T - 3, 8.5); c.moveTo(3, 15.5); c.lineTo(T - 3, 15.5); c.moveTo(4, 4); c.lineTo(T - 4, T - 4); c.stroke();
      c.fillStyle = '#6fcf8f'; ell(c, 7, 2.5, 6, 2.2); c.fill(); ell(c, 15, 2, 4, 1.6); c.fill();
    } else if (b === 'icecube') {
      rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#c7ecff'; c.fill(); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.moveTo(4, 4); c.lineTo(12, 4); c.lineTo(4, 12); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(14, 19); c.lineTo(19, 14); c.stroke();
    } else if (b === 'cavestone') {
      rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#5b4c80'; c.fill(); c.stroke();
      c.fillStyle = '#8ef0d8'; for (const [dx, h] of [[7, 8], [11, 12], [15, 7]]) { c.beginPath(); c.moveTo(dx - 2, 18); c.lineTo(dx, 18 - h); c.lineTo(dx + 2, 18); c.closePath(); c.fill(); }
      c.fillStyle = 'rgba(255,255,255,.25)'; ell(c, 7, 5, 3, 1.2, -0.3); c.fill();
    } else if (b === 'rune') {
      rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#8f7fe0'; c.fill(); c.stroke();
      c.strokeStyle = '#ffd1f2'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(8, 6); c.lineTo(12, 18); c.lineTo(16, 6); c.moveTo(9, 12); c.lineTo(15, 12); c.stroke();
    } else if (b === 'hedge') {
      rr(c, 0.5, 0.5, T - 1, T - 1, 6); c.fillStyle = '#4fae5a'; c.fill(); c.stroke();
      c.fillStyle = '#6fcf7a'; for (const [dx, dy, r0] of [[6, 7, 4], [15, 6, 4.5], [10, 15, 4], [19, 16, 3.5], [4, 18, 3]]) { circ(c, dx, dy, r0); c.fill(); }
      c.fillStyle = '#3a8f48'; circ(c, 13, 11, 1.6); c.fill(); circ(c, 7, 13, 1.2); c.fill();
    } else if (b === 'wood') {
      rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#c98d55'; c.fill(); c.stroke();
      c.strokeStyle = '#8a5a3a'; c.lineWidth = 1.1; for (const r0 of [8, 5, 2]) { circ(c, T / 2, T / 2, r0); c.stroke(); }
      c.fillStyle = 'rgba(255,255,255,.35)'; ell(c, 7, 5, 3, 1.2, -0.3); c.fill();
    } else if (b === 'gift') {
      rr(c, 1, 3, T - 2, T - 4, 3); c.fillStyle = '#ff7ab8'; c.fill(); c.stroke();
      c.fillStyle = '#ffe14d'; c.fillRect(T / 2 - 2, 3, 4, T - 4); c.fillRect(1, T / 2, T - 2, 3.4);
      c.strokeStyle = INK; c.lineWidth = 0.9; c.fillStyle = '#ffe14d'; ell(c, T / 2 - 4, 2.6, 3.6, 2.2, -0.4); c.fill(); c.stroke(); ell(c, T / 2 + 4, 2.6, 3.6, 2.2, 0.4); c.fill(); c.stroke();
    } else if (b === 'abc') {
      rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#7fd6ff'; c.fill(); c.stroke();
      c.fillStyle = '#c6ecff'; rr(c, 4, 4, T - 8, T - 8, 3); c.fill();
      c.fillStyle = '#ff4f86'; c.font = '900 13px Nunito, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('А', T / 2, T / 2 + 1);
    } else if (b === 'sandstone') {
      rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#e3b26b'; c.fill(); c.stroke();
      c.strokeStyle = '#c99550'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(2, 9); c.lineTo(T - 2, 9); c.moveTo(2, 16); c.lineTo(T - 2, 16); c.moveTo(10, 2); c.lineTo(10, 9); c.moveTo(15, 9); c.lineTo(15, 16); c.moveTo(8, 16); c.lineTo(8, T - 2); c.stroke();
    } else if (b === 'rose') {
      rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#e6a9bf'; c.fill(); c.stroke();
      c.fillStyle = '#f7c9d8'; rr(c, 3.5, 3.5, T - 7, 6, 2); c.fill();
      c.fillStyle = '#c47a92'; rr(c, 3.5, 13, T - 7, 7, 2); c.fill();
    } else if (b === 'honey') {
      rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#ffcf4d'; c.fill(); c.stroke();
      c.strokeStyle = '#e0a020'; c.lineWidth = 1.1;
      const hex = (hx, hy, hr) => { c.beginPath(); for (let i = 0; i < 6; i++) { const a = i * TAU / 6 + Math.PI / 6; c.lineTo(hx + Math.cos(a) * hr, hy + Math.sin(a) * hr); } c.closePath(); c.stroke(); };
      hex(8, 8, 4.4); hex(16, 12.5, 4.4); hex(8, 17, 4.4);
      c.fillStyle = 'rgba(255,255,255,.6)'; ell(c, 6, 4.5, 3, 1.2, -0.3); c.fill();
    } else if (b === 'coral') {
      rr(c, 1, 1, T - 2, T - 2, 6); c.fillStyle = '#ff8fa3'; c.fill(); c.stroke();
      c.fillStyle = '#e8607a'; for (const [hx, hy, hr] of [[7, 8, 2], [16, 7, 1.6], [12, 15, 2.2], [18, 17, 1.4], [6, 17, 1.3]]) { circ(c, hx, hy, hr); c.fill(); }
      c.fillStyle = 'rgba(255,255,255,.55)'; ell(c, 7, 4.5, 3.4, 1.2, -0.3); c.fill();
    } else if (b === 'choco') {
      rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#7a4430'; c.fill(); c.stroke();
      c.fillStyle = '#8f5640'; rr(c, 3.5, 3.5, 7.5, 7.5, 1.5); c.fill(); rr(c, 13, 3.5, 7.5, 7.5, 1.5); c.fill(); rr(c, 3.5, 13, 7.5, 7.5, 1.5); c.fill(); rr(c, 13, 13, 7.5, 7.5, 1.5); c.fill();
      c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(4.5, 4.5, 5.5, 1.2); c.fillRect(14, 4.5, 5.5, 1.2);
    } else if (b === 'starblock') {
      rr(c, 1, 1, T - 2, T - 2, 5); c.fillStyle = '#5f53b8'; c.fill(); c.stroke();
      c.fillStyle = '#ffd86b'; starPath(c, T / 2, T / 2 + 0.5, 5.2, 2.3, 0); c.fill();
      c.fillStyle = '#fff'; circ(c, 5, 6, 0.9); c.fill(); circ(c, 18, 18, 0.8); c.fill(); circ(c, 18, 5, 0.6); c.fill();
    } else if (b === 'gem') {
      rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = '#a8d8ff'; c.fill(); c.stroke();
      c.fillStyle = '#ffc4ec'; c.beginPath(); c.moveTo(T - 2, 6); c.lineTo(T - 2, T - 2); c.lineTo(8, T - 2); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(4, T / 2); c.lineTo(T / 2, 4); c.moveTo(T / 2, T - 4); c.lineTo(T - 4, T / 2); c.stroke();
      c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, 1, 1, T - 2, T - 2, 4); c.stroke();
    } else if (!drawBlock2(c, b)) {
      rr(c, 1, 1, T - 2, T - 2, 3); c.fillStyle = '#8a7bb3'; c.fill(); c.stroke();
      c.fillStyle = '#a597cc'; rr(c, 3.5, 3.5, T - 7, 6, 2); c.fill();
      c.fillStyle = '#6c5f96'; rr(c, 3.5, 13, T - 7, 7, 2); c.fill();
    }
  } else if (kind.slice(0, 5) === 'blink') {
    drawBlinkTile(c, kind);
  } else if (kind === 'bounce') {
    drawBounceTile(c, theme);
  } else if (kind === 'qblock' || kind === 'used') {
    c.strokeStyle = INK; c.lineWidth = 1.4;
    rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = kind === 'qblock' ? '#ffcf3d' : '#c9a06a'; c.fill(); c.stroke();
    c.fillStyle = kind === 'qblock' ? '#ffe68a' : '#d9b886'; rr(c, 3.5, 3.5, T - 7, 4, 2); c.fill();
    c.fillStyle = kind === 'qblock' ? '#c98d00' : '#a87c4a'; for (const [dx, dy] of [[5, 5], [19, 5], [5, 19], [19, 19]]) { circ(c, dx, dy, 1.1); c.fill(); }
    if (kind === 'qblock') { c.fillStyle = '#ffffff'; c.strokeStyle = '#c98d00'; c.lineWidth = 1; starPath(c, T / 2, T / 2 + 1, 6, 2.7, 0); c.fill(); c.stroke(); }
  } else if (kind === 'pinkS' || kind === 'blueS') {
    const col = kind === 'pinkS' ? ['#ff7ab8', '#ffb3d6'] : ['#4cb6ff', '#a8dcff'];
    c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, 1, 1, T - 2, T - 2, 4); c.fillStyle = col[0]; c.fill(); c.stroke();
    c.fillStyle = col[1]; rr(c, 4, 4, T - 8, T - 8, 3); c.fill();
    c.fillStyle = col[0]; starPath(c, T / 2, T / 2 + 0.5, 4.5, 2, 0); c.fill();
  } else if (kind === 'pinkG' || kind === 'blueG') {
    const col = kind === 'pinkG' ? '#ff7ab8' : '#4cb6ff';
    c.fillStyle = col; c.globalAlpha = 0.14; rr(c, 1.5, 1.5, T - 3, T - 3, 4); c.fill(); c.globalAlpha = 1;
    c.strokeStyle = col; c.lineWidth = 1.5; c.setLineDash([3, 3]); rr(c, 1.5, 1.5, T - 3, T - 3, 4); c.stroke(); c.setLineDash([]);
  } else if (kind === 'door' || kind === 'doorTop') {
    c.fillStyle = '#b8783e'; c.fillRect(0, 0, T, T);
    c.strokeStyle = '#8a5a2a'; c.lineWidth = 1.2; c.beginPath(); for (const x of [6, 12, 18]) { c.moveTo(x, 0); c.lineTo(x, T); } c.stroke();
    c.strokeStyle = INK; c.lineWidth = 1.4; c.beginPath(); c.moveTo(0.7, 0); c.lineTo(0.7, T); c.moveTo(T - 0.7, 0); c.lineTo(T - 0.7, T); if (kind === 'doorTop') { c.moveTo(0, 0.7); c.lineTo(T, 0.7); } c.stroke();
    if (kind === 'doorTop') {
      c.fillStyle = '#ffcc33'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, 6, 10, 12, 10, 2); c.fill(); c.stroke();
      c.beginPath(); c.arc(12, 10, 3.6, Math.PI, TAU); c.lineWidth = 1.8; c.stroke();
      c.fillStyle = INK; circ(c, 12, 14, 1.4); c.fill(); c.fillRect(11.4, 14, 1.2, 3);
    } else { c.fillStyle = '#6b6b80'; c.fillRect(1, 9, T - 2, 3); c.fillStyle = '#9a9ab0'; circ(c, 5, 10.5, 1); c.fill(); circ(c, 19, 10.5, 1); c.fill(); }
  } else if (TILE7[kind]) {
    drawTile7(c, kind);
  } else if (kind === 'cloud') {
    if (theme === 'beans' || theme === 'tiny') {
      drawLeafTile(c, l, r);
    } else if (PLANKS[theme]) {
      const x0 = l ? 2 : -1, x1 = r ? T - 2 : T + 1;
      c.fillStyle = PLANKS[theme][0]; c.strokeStyle = INK; c.lineWidth = 1.4; rr(c, x0, 3, x1 - x0, 9, l || r ? 3 : 0); c.fill(); c.stroke();
      c.strokeStyle = PLANKS[theme][1]; c.lineWidth = 1; c.beginPath(); for (let x = 6; x < T; x += 6) { c.moveTo(x, 4); c.lineTo(x, 11); } c.stroke();
      c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x0 + 1, 4.5, x1 - x0 - 2, 1.4);
    } else {
      const col = { forest: '#c9c1f0', castle: '#d7d0ef', space: '#c9bcff', palace: '#f6eeff', volcano: '#fff1f6', tower: '#ffe6ef', autumn: '#fff3e6', cave: '#bfa8ff', portal: '#ffe6f7', wizard: '#c9bcff', sea: '#ffe2ef', music: '#fff0fa', bubbles: '#f2fbff' }[theme] || '#ffffff';
      const lo = { forest: '#9a8fd0', space: '#8f7fe0', volcano: '#f5c6d8', tower: '#f5c6d8', autumn: '#f2d6b8', cave: '#8f7fe0', portal: '#f5c6e8', wizard: '#8f7fe0', sea: '#f5b8d0', music: '#e0c9f5' }[theme] || '#c9dcf5';
      const puffs = [];
      for (let x = 3; x <= T - 3; x += 6) puffs.push([x, 7, 4.6]);
      if (l) puffs.push([4, 9, 4]); if (r) puffs.push([T - 4, 9, 4]);
      const base = [l ? 4 : -2, 6, T - (l ? 4 : -2) - (r ? 4 : -2), 7];
      c.strokeStyle = INK; c.lineWidth = 2.6;
      for (const p of puffs) { circ(c, p[0], p[1], p[2]); c.stroke(); }
      rr(c, base[0], base[1], base[2], base[3], 3.5); c.stroke();
      c.fillStyle = col; for (const p of puffs) { circ(c, p[0], p[1], p[2]); c.fill(); }
      rr(c, base[0], base[1], base[2], base[3], 3.5); c.fill();
      c.fillStyle = lo; rr(c, base[0] + 1, 10, base[2] - 2, 2.4, 1.2); c.fill();
    }
  }
  tileCache.set(key, cv);
  return cv;
}

/* ===== Фон: небо та паралакс-шари. Малюється в координатах екрана (одиниці світу) ===== */
function hill(c, viewW, base, amp, freq, phase, off, col) {
  c.fillStyle = col; c.beginPath(); c.moveTo(0, VIEW_H);
  for (let x = 0; x <= viewW + 8; x += 8) { const wx = x + off; c.lineTo(x, base + Math.sin(wx * freq + phase) * amp + Math.sin(wx * freq * 2.7 + phase * 2) * amp * 0.35); }
  c.lineTo(viewW, VIEW_H); c.closePath(); c.fill();
}
function puffCloud(c, x, y, s, col) {
  c.fillStyle = col; for (const p of [[-14, 4, 9], [0, 0, 13], [15, 4, 9], [5, 7, 10], [-6, 8, 8]]) { circ(c, x + p[0] * s, y + p[1] * s, p[2] * s); c.fill(); }
}
function drawBackground(c, theme, camX, viewW, t, flash) {
  const th = THEMES[theme];
  const g = c.createLinearGradient(0, 0, 0, VIEW_H); g.addColorStop(0, th.sky[0]); g.addColorStop(0.55, th.sky[1]); g.addColorStop(1, th.sky[2]);
  c.fillStyle = g; c.fillRect(0, 0, viewW + 1, VIEW_H);
  const wrap = (x, span) => ((x % span) + span) % span;
  if (theme === 'meadow') {
    const sx = viewW * 0.78; const sg = c.createRadialGradient(sx, 52, 4, sx, 52, 60); sg.addColorStop(0, 'rgba(255,250,200,1)'); sg.addColorStop(0.35, 'rgba(255,240,170,.8)'); sg.addColorStop(1, 'rgba(255,240,170,0)');
    c.fillStyle = sg; circ(c, sx, 52, 60); c.fill();
    for (let i = 0; i < 6; i++) { const x = wrap(i * 170 - camX * 0.18 + t * 5, viewW + 220) - 110; puffCloud(c, x, 34 + (i % 3) * 24, 0.9 + (i % 2) * 0.3, 'rgba(255,255,255,.9)'); }
    hill(c, viewW, 182, 16, 0.011, 0.5, camX * 0.2, '#f8b5d7');
    hill(c, viewW, 205, 12, 0.017, 2.1, camX * 0.4, '#c6efbd');
    for (let i = 0; i < 9; i++) { const x = wrap(i * 97 - camX * 0.4, viewW + 120) - 60; const y = 206 + Math.sin((x + camX * 0.4) * 0.017 + 2.1) * 12 - 4; c.strokeStyle = '#fff'; c.lineWidth = 1.8; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 18); c.stroke(); c.fillStyle = RAINBOW[i % 6]; circ(c, x, y - 22, 6); c.fill(); c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1.2; c.beginPath(); c.arc(x, y - 22, 3, 0, 4.5); c.stroke(); }
  } else if (theme === 'clouds') {
    const rx = wrap(260 - camX * 0.08, viewW + 700) - 200;
    for (let i = 0; i < 6; i++) { c.strokeStyle = RAINBOW[i]; c.globalAlpha = 0.55; c.lineWidth = 7; c.beginPath(); c.arc(rx, 230, 150 - i * 7, Math.PI, TAU); c.stroke(); }
    c.globalAlpha = 1;
    for (let i = 0; i < 7; i++) { const x = wrap(i * 150 - camX * 0.15 + t * 4, viewW + 240) - 120; puffCloud(c, x, 50 + (i % 3) * 30, 1 + (i % 2) * 0.4, 'rgba(255,255,255,.85)'); }
    hill(c, viewW, 214, 10, 0.02, 0, camX * 0.3, 'rgba(255,255,255,.75)');
    hill(c, viewW, 232, 8, 0.03, 1, camX * 0.5, '#ffffff');
  } else if (theme === 'forest') {
    const mg = c.createRadialGradient(viewW * 0.8, 52, 4, viewW * 0.8, 52, 50); mg.addColorStop(0, 'rgba(255,248,215,1)'); mg.addColorStop(0.35, 'rgba(255,248,215,.9)'); mg.addColorStop(0.4, 'rgba(255,248,215,.25)'); mg.addColorStop(1, 'rgba(255,248,215,0)');
    c.fillStyle = mg; circ(c, viewW * 0.8, 52, 50); c.fill();
    const R = rng(7);
    for (let i = 0; i < 45; i++) { const x = wrap(R() * 1400 - camX * 0.05, viewW + 20) - 10, y = R() * 150, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); c.fillStyle = `rgba(255,255,240,${0.3 + tw * 0.6})`; circ(c, x, y, 0.6 + R() * 0.9); c.fill(); }
    for (const [f, base, col, sp] of [[0.2, 190, '#2a2462', 46], [0.45, 210, '#1d1848', 64]]) {
      c.fillStyle = col;
      for (let i = -1; i < viewW / sp + 2; i++) { const wx = i * sp + wrap(-camX * f, sp); const h = 50 + ((i + Math.floor(camX * f / sp)) * 37 % 5) * 9; c.beginPath(); c.moveTo(wx - 18, base + 30); c.lineTo(wx, base - h); c.lineTo(wx + 18, base + 30); c.closePath(); c.fill(); }
      c.fillRect(0, base + 20, viewW + 1, VIEW_H);
    }
    for (let i = 0; i < 14; i++) { const x = wrap(i * 61 - camX * 0.6 + Math.sin(t * 0.7 + i) * 20, viewW + 40) - 20, y = 120 + Math.sin(t * 1.1 + i * 2) * 40 + (i % 4) * 18; const a = 0.4 + 0.6 * Math.abs(Math.sin(t * 2.5 + i)); const fg = c.createRadialGradient(x, y, 0, x, y, 6); fg.addColorStop(0, `rgba(240,255,150,${a})`); fg.addColorStop(1, 'rgba(240,255,150,0)'); c.fillStyle = fg; circ(c, x, y, 6); c.fill(); }
  } else if (theme === 'ice') {
    for (const [f, base, col, sp, h] of [[0.15, 200, '#cfe7f8', 120, 110], [0.35, 222, '#a9d4f1', 90, 80]]) {
      for (let i = -1; i < viewW / sp + 2; i++) {
        const wx = i * sp + wrap(-camX * f, sp); const hh = h * (0.7 + ((i + Math.floor(camX * f / sp)) * 53 % 4) * 0.1);
        c.fillStyle = col; c.beginPath(); c.moveTo(wx - sp * 0.75, base + 40); c.lineTo(wx, base - hh); c.lineTo(wx + sp * 0.75, base + 40); c.closePath(); c.fill();
        c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(wx - hh * 0.22, base - hh * 0.7); c.lineTo(wx, base - hh); c.lineTo(wx + hh * 0.22, base - hh * 0.7); c.lineTo(wx + hh * 0.08, base - hh * 0.62); c.lineTo(wx - hh * 0.05, base - hh * 0.72); c.closePath(); c.fill();
      }
      c.fillStyle = col; c.fillRect(0, base + 38, viewW + 1, VIEW_H);
    }
    for (let i = 0; i < 40; i++) { const x = wrap(i * 37 + Math.sin(t + i) * 12 - camX * 0.3, viewW + 20) - 10; const y = wrap(i * 53 + t * (14 + (i % 5) * 4), VIEW_H); c.fillStyle = 'rgba(255,255,255,.9)'; circ(c, x, y, 1 + (i % 3) * 0.5); c.fill(); }
  } else if (theme === 'castle') {
    for (let i = 0; i < 6; i++) { const x = wrap(i * 180 - camX * 0.1 + t * 8, viewW + 260) - 130; puffCloud(c, x, 36 + (i % 3) * 22, 1.3, 'rgba(60,48,95,.55)'); }
    const sp = 260, f = 0.14;
    for (let i = -1; i < viewW / sp + 2; i++) {
      const wx = i * sp + wrap(-camX * f, sp); c.fillStyle = '#3a2f62';
      c.fillRect(wx - 70, 150, 140, 140);
      for (const [tx, tw, th2] of [[-70, 26, 70], [-18, 36, 100], [44, 26, 80]]) { c.fillRect(wx + tx, 150 - th2 + 40, tw, th2); c.beginPath(); c.moveTo(wx + tx - 4, 150 - th2 + 40); c.lineTo(wx + tx + tw / 2, 150 - th2 + 5); c.lineTo(wx + tx + tw + 4, 150 - th2 + 40); c.closePath(); c.fill(); }
      c.fillStyle = 'rgba(255,214,110,.75)'; for (const [wx2, wy] of [[-60, 140], [-4, 110], [54, 132], [-30, 175], [20, 180]]) { rr(c, wx + wx2, wy, 5, 8, 2.5); c.fill(); }
    }
    hill(c, viewW, 218, 7, 0.02, 0, camX * 0.35, '#2a2148');
  }
  else if (theme === 'garden') bgGarden(c, viewW, camX, t);
  else if (theme === 'lagoon') bgLagoon(c, viewW, camX, t);
  else if (theme === 'volcano') bgVolcano(c, viewW, camX, t);
  else if (theme === 'space') bgSpace(c, viewW, camX, t);
  else if (theme === 'palace') bgPalace(c, viewW, camX, t);
  else if (theme === 'autumn') bgAutumn(c, viewW, camX, t);
  else if (theme === 'balloons') bgBalloons(c, viewW, camX, t);
  else if (theme === 'toys') bgToys(c, viewW, camX, t);
  else if (theme === 'desert') bgDesert(c, viewW, camX, t);
  else if (theme === 'tower') bgTower(c, viewW, camX, t);
  else if (theme === 'cave') bgCave(c, viewW, camX, t);
  else if (theme === 'portal') bgPortal(c, viewW, camX, t);
  else if (theme === 'button') bgButton(c, viewW, camX, t);
  else if (theme === 'maze') bgMaze(c, viewW, camX, t);
  else if (theme === 'wizard') bgWizard(c, viewW, camX, t);
  else if (BG2[theme]) BG2[theme](c, viewW, camX, t);
  if (flash > 0) { c.fillStyle = `rgba(255,255,255,${Math.min(0.6, flash)})`; c.fillRect(0, 0, viewW + 1, VIEW_H); }
}

/* Декор на поверхні (за персонажами) */
function drawDecor(c, d, t) {
  const x = d.x, y = d.y;
  switch (d.k) {
    case 'lolli': c.strokeStyle = '#fff'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 16); c.stroke(); c.strokeStyle = INK; c.lineWidth = 0.6; c.stroke();
      c.fillStyle = d.c; circ(c, x, y - 21, 6.5); c.fill(); c.strokeStyle = INK; c.lineWidth = 1; c.stroke(); c.strokeStyle = '#fff'; c.lineWidth = 1.4; c.beginPath(); c.arc(x, y - 21, 3.2, 0, 4.6); c.stroke(); break;
    case 'flower': drawFlowerDecor(c, x, y, d.c, 0.8); break;
    case 'mush': c.fillStyle = '#f5ead6'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, x - 2.5, y - 8, 5, 8, 2); c.fill(); c.stroke();
      c.fillStyle = d.c; c.beginPath(); c.arc(x, y - 8, 7, Math.PI, TAU); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#fff'; circ(c, x - 3, y - 11, 1.3); c.fill(); circ(c, x + 2.5, y - 12, 1); c.fill();
      if (d.glow) { const g = c.createRadialGradient(x, y - 9, 0, x, y - 9, 14); g.addColorStop(0, 'rgba(140,255,200,.35)'); g.addColorStop(1, 'rgba(140,255,200,0)'); c.fillStyle = g; circ(c, x, y - 9, 14); c.fill(); } break;
    case 'pine': c.fillStyle = '#4fa58a'; c.strokeStyle = INK; c.lineWidth = 1;
      for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(x - 10 + i * 2, y - 4 - i * 8); c.lineTo(x, y - 18 - i * 8); c.lineTo(x + 10 - i * 2, y - 4 - i * 8); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(x - 4, y - 12 - i * 8); c.lineTo(x, y - 18 - i * 8); c.lineTo(x + 4, y - 12 - i * 8); c.closePath(); c.fill(); c.fillStyle = '#4fa58a'; }
      c.fillStyle = '#8a5a3b'; c.fillRect(x - 1.5, y - 4, 3, 4); break;
    case 'crystal': c.fillStyle = '#c6b8ff'; c.strokeStyle = INK; c.lineWidth = 0.9; for (const [dx, h] of [[-3, 10], [1, 14], [5, 8]]) { c.beginPath(); c.moveTo(x + dx - 2, y); c.lineTo(x + dx, y - h); c.lineTo(x + dx + 2, y); c.closePath(); c.fill(); c.stroke(); } break;
    case 'torch': c.fillStyle = '#6c5f96'; c.strokeStyle = INK; c.lineWidth = 1; rr(c, x - 2, y - 16, 4, 16, 1.5); c.fill(); c.stroke();
      const fl = Math.sin(t * 12 + x) * 1.2; c.fillStyle = '#ffb02e'; c.beginPath(); c.moveTo(x - 3.5, y - 16); c.quadraticCurveTo(x - 3, y - 24 - fl, x, y - 27 - fl); c.quadraticCurveTo(x + 3, y - 24 + fl, x + 3.5, y - 16); c.closePath(); c.fill(); c.fillStyle = '#ffe14d'; ell(c, x, y - 19, 1.6, 3); c.fill();
      const tg = c.createRadialGradient(x, y - 20, 0, x, y - 20, 20); tg.addColorStop(0, 'rgba(255,200,90,.35)'); tg.addColorStop(1, 'rgba(255,200,90,0)'); c.fillStyle = tg; circ(c, x, y - 20, 20); c.fill(); break;
    case 'twinkle': sparkle(c, x, y - 10 - Math.sin(t * 2 + x) * 3, 1.6 + Math.sin(t * 4 + x) * 0.6, '#fff8c0'); break;
    default: drawDecor2(c, d, t);
  }
}
