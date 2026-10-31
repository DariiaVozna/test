// Перевірка: чи не закриває табличка щось, з чим треба взаємодіяти (кнопки, бонуси, тотеми, скриньки...).
// Запуск з кореня репозиторію: node ednorizhka/src/tools/signs.js (потрібен Playwright із Chromium)
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 844, height: 390 } });
  await pg.addInitScript(() => { localStorage.setItem('zoriana-ednorizhka-v1', JSON.stringify({ profile: { name: 'Маша', body: 'pink', mane: 'rainbow', acc: [], friend: 'cat', easy: true }, unlocked: 99, best: {}, bestR: {}, bestF: {}, record: 0, sound: false })); });
  await pg.goto('file://' + require('path').join(__dirname, '..', '..', 'index.html')); await pg.waitForTimeout(300);
  const out = await pg.evaluate(() => {
    const cv = document.createElement('canvas').getContext('2d'); cv.font = '800 9px Nunito, system-ui, sans-serif';
    const res = [];
    for (let i = 0; i < LEVELS.length; i++) {
      startPlay(i);
      const objs = [];
      const add = (k, x, y, w, h) => objs.push({ k, x, y, w, h });
      for (const o of G.totems || []) add('тотем', o.x - 12, o.gy - 58, 24, 58);
      for (const o of G.roos || []) add('кенгуру', o.x - 16, o.gy - 44, 32, 44);
      for (const o of G.crystals || []) add('кристал', o.x - 10, o.y - 20, 20, 32);
      for (const o of G.chicks || []) add('курча', o.x - 8, o.y - 16, 16, 16);
      for (const o of G.coops || []) add('курник', o.x - 24, o.gy - 52, 48, 52);
      for (const o of G.buckets || []) add('відро', o.x - 10, o.gy - 24, 20, 24);
      for (const o of G.plates || []) add('кнопка храму', o.x - 12, o.gy - 8, 24, 8);
      for (const o of G.springs) add('пружинка', o.x - 12, o.gy - 16, 24, 16);
      for (const o of G.buttons) add('кнопка', o.x - 12, o.gy - 12, 24, 12);
      for (const o of G.portals) add('портал', o.x - 12, o.gy - 44, 24, 44);
      for (const o of G.lanterns) add('ліхтарик', o.x - 8, o.y - 12, 16, 24);
      for (const o of G.beans) add('квасолина', o.x - 8, o.gy - 16, 16, 16);
      for (const o of G.keys) add('ключик', o.x - 8, o.y - 8, 16, 16);
      for (const o of G.powers) add('бонус ' + o.k, o.x - 11, o.y - 11, 22, 22);
      for (const o of G.letters || []) add('літера', o.x - 11, o.y - 11, 22, 22);
      for (const o of G.rings || []) add('кільце', o.x - 8, o.y - 8, 16, 16);
      for (const o of G.dominoes || []) add('доміно', o.x * T, (o.base - 3) * T, 24, 72);
      for (const o of G.launchers) add('гармата', o.x - 16, o.gy - 36, 32, 36);
      for (const o of G.movers) if (o.ball || o.coaster || o.pulley || o.cart || o.balloon) add('платформа', o.x, o.y - 10, o.w, 30);
      for (let x = 0; x < G.Wt; x++) for (let y = 0; y < ROWS; y++) if (G.map[y * G.Wt + x] === 7) add('скринька', x * T, y * T, 24, 24);
      const signs = G.signs.map(s => { const lines = wrapText(cv, s.text.replace('{name}', 'Маша'), 104); const w = Math.max(...lines.map(l => cv.measureText(l).width)) + 14, h = lines.length * 11 + 9; return { x: s.x - w / 2, y: s.gy - 34 - h, w, h, text: s.text }; });
      const ov = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
      signs.forEach((s, si) => {
        for (const o of objs) if (ov(s, o)) res.push((i + 1) + ' ' + LEVELS[i].name + ': табличка «' + s.text.slice(0, 28) + '…» закриває ' + o.k);
        signs.forEach((s2, sj) => { if (sj > si && ov(s, s2)) res.push((i + 1) + ' ' + LEVELS[i].name + ': дві таблички накладаються'); });
      });
    }
    return res;
  });
  console.log(out.length ? out.join('\n') : 'Таблички нічого не закривають');
  await b.close();
})();
