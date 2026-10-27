'use strict';
/* ===== Рівні. Координати в плитках: x — стовпчик, y — рядок (0 угорі, земля з рядка 10) ===== */
const LEVELS = [
  {
    id: 'meadow', theme: 'meadow', name: 'Цукерковий луг', blurb: 'Льодяники, квіти і перші вороги', w: 150,
    build(L) {
      L.ground(0, 30);
      L.sign(7, 'Привіт, {name}! Збирай зірочки');
      L.row(5, 9, 5);
      L.block(13, 7, 4); L.row(13, 6, 4);
      L.enemy('snail', 20, 10);
      L.row(22, 9, 4);
      L.arc(28, 8, 6, 2.2);
      L.ground(33, 92);
      L.sign(35, 'Стрибай на ворогів зверху');
      L.enemy('snail', 40, 10);
      L.cloud(44, 7, 4); L.row(44, 6, 4); L.rainbow(45, 3);
      L.enemy('snail', 48, 10);
      L.power('shield', 52, 8);
      L.sign(56, 'Стріляй рогом! Затисни — буде велика куля');
      L.row(59, 9, 3);
      L.enemy('cloud', 63, 7);
      L.enemy('snail', 67, 10);
      L.block(70, 9, 1); L.block(71, 8, 1, 2); L.block(72, 7, 1, 3);
      L.star(70, 8); L.star(71, 7); L.star(72, 6);
      L.check(76);
      L.sign(79, 'Колючку не переможеш. Перестрибни!');
      L.enemy('hedgehog', 86, 10);
      L.arc(83, 8, 5, 2);
      L.arc(91, 8, 5, 2);
      L.ground(95, 120);
      L.enemy('cloud', 100, 6);
      L.block(104, 7, 3); L.row(104, 6, 3);
      L.enemy('snail', 109, 10);
      L.power('candy', 112, 8);
      L.row(114, 9, 4);
      L.mover(121, 9, 3, 2.5, 0, 4);
      L.row(122, 7, 4);
      L.ground(128, 150);
      L.sign(131, 'Збери зірочки, і ворота відчиняться');
      L.row(134, 9, 5);
      L.gate(144);
    }
  },
  {
    id: 'clouds', theme: 'clouds', name: 'Хмарне королівство', blurb: 'Стрибки по хмаринках високо в небі', w: 170,
    build(L) {
      L.ground(0, 20);
      L.row(4, 9, 4);
      L.enemy('cloud', 14, 7);
      L.cloud(20, 8, 4); L.row(20, 7, 4);
      L.ground(24, 44);
      L.enemy('snail', 29, 10);
      L.cloud(32, 7, 3); L.row(32, 6, 3);
      L.cloud(36, 4, 3); L.row(36, 3, 3); L.rainbow(37, 1);
      L.power('wings', 41, 8);
      L.row(45, 2, 8, 1.5);
      L.mover(46, 8, 2, 0, 2.5, 3.5);
      L.ground(48, 70);
      L.enemy('cloud', 52, 6);
      L.row(50, 9, 3);
      L.enemy('cloud', 58, 8);
      L.row(56, 9, 3);
      L.enemy('hedgehog', 63, 10);
      L.check(67);
      L.cloud(71, 8, 3); L.row(71, 7, 3);
      L.cloud(75, 6, 3); L.row(75, 5, 3);
      L.cloud(79, 8, 3); L.row(79, 7, 3);
      L.enemy('cloud', 81, 4);
      L.cloud(83, 6, 3); L.row(83, 5, 3);
      L.cloud(87, 8, 3); L.row(87, 7, 2);
      L.ground(90, 115);
      L.enemy('snail', 95, 10); L.enemy('snail', 100, 10);
      L.power('candy', 103, 8);
      L.block(106, 7, 3); L.row(106, 6, 3);
      L.enemy('cloud', 110, 7);
      L.row(111, 9, 3);
      L.mover(116, 9, 3, 1.5, 0, 3.2);
      L.row(117, 7, 3);
      L.ground(121, 170);
      L.cloud(126, 7, 4); L.row(126, 6, 4); L.rainbow(127, 3);
      L.enemy('hedgehog', 134, 10);
      L.enemy('cloud', 140, 6);
      L.row(143, 9, 5);
      L.enemy('snail', 150, 10);
      L.sign(154, 'Ворота вже близько!');
      L.row(155, 8, 3);
      L.gate(162);
    }
  },
  {
    id: 'forest', theme: 'forest', name: 'Нічний ліс', blurb: 'Світлячки, кажанчики і великий місяць', w: 170,
    build(L) {
      L.ground(0, 38);
      L.sign(6, 'Кажанчики сплять, поки не підійдеш близько');
      L.row(6, 9, 4);
      L.enemy('bat', 14, 4);
      L.row(12, 9, 4);
      L.enemy('snail', 20, 10);
      L.block(27, 7, 2); L.row(27, 6, 2);
      L.block(31, 5, 2); L.row(31, 4, 2); L.rainbow(31, 1);
      L.enemy('hedgehog', 34, 10);
      L.arc(37, 8, 5, 2);
      L.ground(41, 70);
      L.enemy('hedgehog', 46, 10);
      L.enemy('bat', 52, 4);
      L.cloud(55, 7, 3); L.row(55, 6, 3);
      L.enemy('snail', 60, 10);
      L.power('magnet', 63, 8);
      L.row(64, 9, 4);
      L.check(68);
      L.arc(69, 8, 5, 2);
      L.ground(73, 100);
      L.enemy('bat', 76, 3);
      L.enemy('hedgehog', 79, 10); L.enemy('hedgehog', 86, 10);
      L.row(81, 9, 3);
      L.block(88, 7, 4); L.row(88, 6, 4);
      L.enemy('bat', 93, 4);
      L.power('wings', 96, 8);
      L.row(98, 1, 8, 1.5);
      L.mover(101, 8, 3, 2, 0, 3.6);
      L.row(102, 6, 3);
      L.ground(108, 170);
      L.enemy('snail', 113, 10);
      L.enemy('bat', 118, 4);
      L.cloud(121, 7, 3); L.row(121, 6, 3);
      L.cloud(125, 5, 3); L.row(125, 4, 3); L.rainbow(126, 1);
      L.enemy('hedgehog', 132, 10);
      L.enemy('snail', 138, 10);
      L.enemy('bat', 145, 4);
      L.row(148, 9, 5);
      L.sign(153, 'Ворота вже близько!');
      L.gate(160);
    }
  },
  {
    id: 'ice', theme: 'ice', name: 'Крижані гори', blurb: 'Слизький лід і сніжинки', w: 170,
    build(L) {
      L.ground(0, 24);
      L.sign(6, 'Обережно, лід слизький!');
      L.row(6, 9, 4);
      L.enemy('snail', 14, 10);
      L.block(17, 7, 3); L.row(17, 6, 3);
      L.arc(23, 8, 5, 2);
      L.ground(27, 52);
      L.enemy('cloud', 31, 7);
      L.enemy('hedgehog', 37, 10);
      L.power('shield', 41, 8);
      L.block(44, 9, 1); L.block(45, 8, 1, 2); L.block(46, 7, 1, 3);
      L.star(44, 8); L.star(45, 7); L.star(46, 6);
      L.enemy('cloud', 49, 5);
      L.arc(51, 8, 5, 2);
      L.ground(55, 80);
      L.enemy('snail', 60, 10); L.enemy('snail', 64, 10);
      L.cloud(66, 7, 4); L.row(66, 6, 4); L.rainbow(67, 3);
      L.enemy('hedgehog', 72, 10);
      L.check(77);
      L.cloud(81, 8, 2); L.row(81, 7, 2);
      L.cloud(85, 8, 2); L.row(85, 7, 2);
      L.ground(88, 118);
      L.power('candy', 91, 8);
      L.enemy('cloud', 95, 6); L.enemy('cloud', 100, 8);
      L.row(96, 9, 4);
      L.enemy('snail', 104, 10);
      L.enemy('hedgehog', 110, 10);
      L.row(112, 9, 3);
      L.mover(119, 9, 3, 1.5, 0, 3.4);
      L.row(119, 7, 3);
      L.ground(125, 170);
      L.power('wings', 128, 8);
      L.row(130, 2, 8, 1.5);
      L.enemy('hedgehog', 136, 10);
      L.enemy('snail', 141, 10);
      L.enemy('cloud', 146, 6);
      L.row(150, 9, 5);
      L.gate(160);
    }
  },
  {
    id: 'castle', theme: 'castle', name: 'Замок Похмурої Хмари', blurb: 'Битва з Королем Похмурої Хмари', w: 172, boss: 'cloud',
    build(L) {
      L.ground(0, 30);
      L.sign(6, 'Замок Похмурої Хмари. Будь сміливою!');
      L.row(5, 9, 4);
      L.enemy('cloud', 12, 7);
      L.enemy('hedgehog', 18, 10);
      L.block(22, 7, 3); L.row(22, 6, 3);
      L.enemy('bat', 27, 4);
      L.arc(29, 8, 5, 2);
      L.ground(33, 60);
      L.enemy('snail', 38, 10);
      L.power('magnet', 40, 8);
      L.enemy('cloud', 44, 6);
      L.power('shield', 47, 8);
      L.enemy('hedgehog', 52, 10);
      L.cloud(55, 7, 3); L.row(55, 6, 3); L.rainbow(56, 3);
      L.mover(61, 8, 3, 2, 0, 3.5);
      L.row(62, 6, 3);
      L.ground(67, 100);
      L.check(69);
      L.enemy('bat', 75, 4); L.enemy('bat', 82, 4);
      L.row(76, 9, 4);
      L.enemy('snail', 86, 10);
      L.enemy('hedgehog', 95, 10);
      L.arc(99, 8, 5, 2);
      L.ground(103, 172);
      L.enemy('cloud', 108, 7);
      L.enemy('cloud', 114, 5);
      L.row(110, 9, 4);
      L.enemy('hedgehog', 120, 10);
      L.sign(126, 'Попереду Король Похмурої Хмари!');
      L.check(129);
      L.block(131, 9, 1);
      L.power('candy', 128, 8);
      L.arena(133, 172);
      L.cloud(137, 7, 3); L.cloud(143, 5, 3); L.cloud(150, 7, 3); L.cloud(156, 5, 3); L.cloud(162, 7, 3);
      L.power('shield', 147, 9);
      L.gate(168);
    }
  },
  {
    id: 'garden', theme: 'garden', name: 'Квітковий сад', blurb: 'Квіти-пружинки і бджілки', w: 170,
    build(L) {
      L.ground(0, 26);
      L.sign(6, 'Квіти-пружинки підкидають високо!');
      L.row(9, 9, 3);
      L.spring(13);
      L.cloud(16, 4, 4); L.row(16, 3, 4);
      L.enemy('bee', 21, 7);
      L.row(20, 9, 4);
      L.ground(29, 60);
      L.enemy('snail', 34, 10);
      L.block(37, 7, 3); L.row(37, 6, 3);
      L.enemy('bee', 43, 6);
      L.spring(47);
      L.cloud(49, 3, 5); L.row(49, 2, 4); L.rainbow(53, 1);
      L.power('magnet', 53, 8);
      L.enemy('hedgehog', 56, 10);
      L.check(58);
      L.arc(59, 8, 4, 2);
      L.ground(63, 95);
      L.enemy('bee', 67, 7); L.enemy('bee', 74, 5);
      L.row(66, 9, 6);
      L.spring(78);
      L.block(81, 5, 3); L.row(81, 4, 3);
      L.enemy('snail', 86, 10); L.enemy('hedgehog', 90, 10);
      L.power('candy', 92, 8);
      L.spring(93);
      L.arc(94, 5, 5, 2);
      L.ground(98, 130);
      L.sign(101, 'Бджілок можна стріляти рогом');
      L.enemy('bee', 105, 6); L.enemy('bee', 110, 8);
      L.row(104, 9, 4);
      L.block(113, 7, 4); L.row(113, 6, 4);
      L.enemy('snail', 118, 10);
      L.check(121);
      L.spring(124);
      L.cloud(126, 4, 4); L.row(126, 3, 3); L.rainbow(129, 2);
      L.enemy('hedgehog', 127, 10);
      L.arc(129, 8, 4, 2);
      L.ground(133, 170);
      L.enemy('bee', 137, 7);
      L.enemy('snail', 142, 10);
      L.row(140, 9, 5);
      L.power('shield', 146, 8);
      L.enemy('hedgehog', 150, 10);
      L.row(152, 8, 4);
      L.sign(157, 'Ворота вже близько!');
      L.gate(163);
    }
  },
  {
    id: 'lagoon', theme: 'lagoon', name: 'Перлинна лагуна', blurb: 'Пірнай і плавай під водою', w: 170,
    build(L) {
      L.ground(0, 18, 6);
      L.sign(5, 'Пірнай! У воді тисни «Стрибок», щоб плисти');
      L.row(8, 5, 4);
      L.enemy('crab', 14, 6);
      L.ground(18, 34, 11); L.water(18, 34, 6);
      L.row(20, 9, 4); L.arc(25, 10, 4, 2);
      L.enemy('jelly', 24, 8);
      L.block(29, 10, 2); L.row(29, 9, 2);
      L.power('shield', 32, 8);
      L.ground(34, 52, 6);
      L.enemy('crab', 40, 6);
      L.row(37, 5, 4);
      L.block(44, 3, 3); L.row(44, 2, 3);
      L.power('magnet', 47, 5);
      L.check(49);
      L.ground(52, 80, 11); L.water(52, 80, 6);
      L.row(54, 10, 4);
      L.enemy('fish', 60, 8);
      L.row(61, 8, 4);
      L.block(64, 10, 2);
      L.enemy('jelly', 67, 9);
      L.rainbow(70, 10);
      L.enemy('fish', 74, 9);
      L.row(74, 7, 4);
      L.ground(80, 100, 6);
      L.enemy('crab', 85, 6);
      L.power('candy', 88, 5);
      L.row(90, 5, 5);
      L.enemy('crab', 95, 6);
      L.ground(100, 112, 11); L.water(100, 112, 6);
      L.cloud(102, 5, 3); L.row(102, 4, 3);
      L.cloud(107, 5, 3); L.row(107, 4, 3);
      L.enemy('jelly', 105, 9);
      L.row(103, 10, 6);
      L.ground(112, 130, 6);
      L.check(114);
      L.enemy('crab', 121, 6);
      L.row(118, 5, 5);
      L.block(125, 3, 2); L.row(125, 2, 2);
      L.ground(130, 152, 11); L.water(130, 152, 6);
      L.row(132, 10, 6);
      L.enemy('fish', 136, 8);
      L.enemy('jelly', 141, 8);
      L.row(144, 8, 6);
      L.enemy('fish', 147, 10);
      L.ground(152, 170, 6);
      L.enemy('crab', 157, 6);
      L.row(155, 5, 3);
      L.sign(160, 'Ворота вже близько!');
      L.gate(165);
    }
  },
  {
    id: 'volcano', theme: 'volcano', name: 'Карамельний вулкан', blurb: 'Гаряча карамель і стрибучі іскри', w: 170, caramel: true,
    build(L) {
      L.ground(0, 24);
      L.sign(6, 'Не падай у карамель! Стрибай, коли іскра сховається');
      L.row(9, 9, 4);
      L.enemy('snail', 16, 10);
      L.block(19, 7, 3); L.row(19, 6, 3);
      L.enemy('spark', 25, 11); L.arc(24, 7, 3, 1);
      L.ground(27, 50);
      L.enemy('hedgehog', 33, 10);
      L.row(30, 9, 4);
      L.spring(37);
      L.cloud(39, 4, 4); L.row(39, 3, 3); L.rainbow(42, 2);
      L.power('shield', 44, 8);
      L.enemy('snail', 47, 10);
      L.enemy('spark', 51, 11);
      L.ground(53, 80);
      L.check(55);
      L.power('magnet', 58, 8);
      L.enemy('cloud', 60, 7);
      L.row(58, 9, 5);
      L.block(65, 7, 1, 3); L.star(65, 6);
      L.enemy('hedgehog', 70, 10);
      L.power('candy', 73, 8);
      L.enemy('snail', 76, 10);
      L.mover(80, 8, 2, 1.5, 0, 3);
      L.row(80, 6, 4);
      L.ground(84, 110);
      L.enemy('cloud', 90, 6);
      L.row(87, 9, 5);
      L.spring(95);
      L.cloud(97, 4, 4); L.row(97, 3, 4);
      L.enemy('hedgehog', 100, 10);
      L.enemy('snail', 105, 10);
      L.enemy('spark', 111, 11);
      L.ground(113, 140);
      L.check(115);
      L.enemy('cloud', 120, 7);
      L.block(123, 7, 4); L.row(123, 6, 4);
      L.enemy('hedgehog', 129, 10);
      L.row(132, 9, 4);
      L.enemy('snail', 136, 10);
      L.enemy('spark', 141, 11);
      L.ground(143, 170);
      L.enemy('cloud', 148, 6);
      L.row(146, 9, 5);
      L.sign(154, 'Ворота вже близько!');
      L.gate(162);
    }
  },
  {
    id: 'space', theme: 'space', name: 'Зоряний космос', blurb: 'Високі повільні стрибки і НЛО', w: 175, grav: 0.62, needK: 0.42,
    build(L) {
      L.ground(0, 22);
      L.sign(6, 'У космосі стрибки високі й повільні!');
      L.row(9, 9, 3);
      L.arc(13, 6, 6, 3);
      L.enemy('ufo', 18, 5);
      L.arc(22, 6, 4, 2);
      L.ground(26, 46);
      L.enemy('snail', 31, 10);
      L.cloud(34, 6, 3); L.row(34, 5, 3);
      L.cloud(39, 3, 3); L.row(39, 2, 2); L.rainbow(41, 1);
      L.enemy('ufo', 43, 6);
      L.mover(47, 8, 2, 0, 2, 3);
      L.arc(46, 5, 5, 2);
      L.ground(51, 75);
      L.check(53);
      L.power('candy', 56, 8);
      L.enemy('hedgehog', 60, 10);
      L.enemy('ufo', 64, 5);
      L.row(62, 9, 5);
      L.block(68, 6, 3); L.row(68, 5, 3);
      L.enemy('snail', 72, 10);
      L.cloud(77, 7, 2); L.row(77, 6, 2);
      L.ground(80, 105);
      L.power('magnet', 82, 8);
      L.enemy('ufo', 86, 6); L.enemy('ufo', 95, 4);
      L.row(84, 9, 6);
      L.cloud(90, 4, 4); L.row(90, 3, 4);
      L.enemy('hedgehog', 98, 10);
      L.power('shield', 101, 8);
      L.mover(106, 8, 3, 1, 0, 3.4);
      L.arc(105, 6, 5, 2);
      L.ground(110, 140);
      L.check(112);
      L.row(116, 9, 4);
      L.enemy('snail', 120, 10);
      L.arc(124, 5, 7, 3);
      L.enemy('ufo', 128, 4);
      L.block(132, 7, 3); L.row(132, 6, 3);
      L.enemy('hedgehog', 137, 10);
      L.arc(140, 6, 4, 2);
      L.ground(144, 175);
      L.enemy('ufo', 150, 6);
      L.row(148, 9, 5);
      L.sign(160, 'Ворота вже близько!');
      L.gate(167);
    }
  },
  {
    id: 'palace', theme: 'palace', name: 'Кришталевий палац', blurb: 'Битва з Паном Колючкою', w: 172, boss: 'hedge',
    build(L) {
      L.ground(0, 30);
      L.sign(6, 'Кришталевий палац. Тут живе Пан Колючка');
      L.row(8, 9, 4);
      L.enemy('bat', 15, 4);
      L.spring(19);
      L.cloud(21, 4, 4); L.row(21, 3, 4);
      L.enemy('hedgehog', 26, 10);
      L.ground(33, 62);
      L.enemy('snail', 38, 10);
      L.enemy('bee', 44, 6);
      L.power('shield', 47, 8);
      L.block(50, 7, 3); L.row(50, 6, 3);
      L.enemy('crab', 55, 10);
      L.power('magnet', 57, 8);
      L.arc(59, 8, 4, 2);
      L.ground(65, 100);
      L.check(67);
      L.enemy('bat', 73, 4); L.enemy('bat', 80, 4);
      L.row(75, 9, 5);
      L.spring(84);
      L.cloud(86, 4, 4); L.row(86, 3, 3); L.rainbow(89, 2);
      L.enemy('ufo', 92, 6);
      L.ground(103, 172);
      L.enemy('cloud', 108, 7);
      L.enemy('hedgehog', 114, 10);
      L.row(110, 9, 4);
      L.sign(122, 'Пан Колючка! Стріляй, коли в нього паморочиться голова');
      L.check(126);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(135, 7, 3); L.cloud(146, 6, 3); L.cloud(158, 7, 3);
      L.power('shield', 147, 5);
      L.gate(168);
    }
  },
  {
    id: 'autumn', theme: 'autumn', name: 'Осінній ліс', blurb: 'Листяні гілки падають, білочки кидаються жолудями', w: 170,
    build(L) {
      L.ground(0, 24);
      L.sign(6, 'Листяні гілки падають! Не стій на них довго');
      L.row(9, 9, 4);
      L.enemy('mush', 16, 10);
      L.crumble(25, 8, 2); L.crumble(28, 7, 2);
      L.row(25, 7, 2); L.row(28, 6, 2);
      L.ground(31, 58);
      L.power('magnet', 32, 8);
      L.row(34, 9, 4);
      L.enemy('squirrel', 39, 10);
      L.block(42, 7, 3); L.row(42, 6, 3);
      L.enemy('mush', 47, 10);
      L.power('shield', 50, 8);
      L.enemy('squirrel', 55, 10);
      L.crumble(59, 8, 2); L.crumble(62, 6, 2); L.crumble(65, 8, 2);
      L.row(59, 7, 2); L.rainbow(63, 4); L.row(65, 7, 2);
      L.ground(68, 96);
      L.check(70);
      L.enemy('mush', 75, 10); L.enemy('mush', 79, 10);
      L.row(73, 9, 5);
      L.crumble(82, 6, 3); L.row(82, 5, 3);
      L.enemy('squirrel', 88, 10);
      L.power('candy', 91, 8);
      L.crumble(97, 8, 2); L.crumble(100, 7, 2);
      L.row(97, 7, 2); L.row(100, 6, 2);
      L.ground(103, 135);
      L.enemy('bee', 109, 6);
      L.check(112);
      L.enemy('squirrel', 118, 10);
      L.block(121, 7, 4); L.row(121, 6, 4);
      L.enemy('mush', 127, 10);
      L.row(129, 9, 4);
      L.crumble(136, 8, 2); L.crumble(139, 7, 2);
      L.row(136, 7, 2); L.row(139, 6, 2);
      L.ground(142, 170);
      L.enemy('mush', 147, 10);
      L.row(149, 9, 4);
      L.enemy('squirrel', 153, 10);
      L.sign(159, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'balloons', theme: 'balloons', name: 'Свято повітряних кульок', blurb: 'Кульки піднімають угору, вітер несе над ямами', w: 170,
    build(L) {
      L.ground(0, 22);
      L.sign(5, 'Стань на кошик із кульками, і він підніме вгору');
      L.row(8, 9, 4);
      L.enemy('bird', 16, 5);
      L.wind(22, 28, 4); L.arc(22, 4, 6, 2);
      L.ground(28, 50);
      L.enemy('snail', 32, 10);
      L.balloon(36);
      L.cloud(39, 3, 5); L.row(39, 2, 4); L.rainbow(43, 1);
      L.enemy('bird', 45, 6);
      L.power('shield', 47, 8);
      L.wind(50, 57, 4); L.row(51, 3, 6);
      L.ground(57, 85);
      L.check(59);
      L.enemy('snail', 64, 10);
      L.power('magnet', 62, 8);
      L.balloon(67);
      L.cloud(70, 3, 4); L.row(70, 2, 4);
      L.row(74, 9, 5);
      L.enemy('cloud', 77, 7);
      L.power('candy', 80, 8);
      L.enemy('bird', 82, 4);
      L.wind(85, 93, 4); L.arc(85, 4, 8, 2);
      L.ground(93, 125);
      L.check(95);
      L.balloon(99);
      L.cloud(102, 3, 6); L.row(102, 2, 6);
      L.enemy('snail', 110, 10);
      L.enemy('bird', 114, 6);
      L.block(118, 7, 3); L.row(118, 6, 3);
      L.wind(125, 133, 4); L.arc(125, 4, 8, 2);
      L.ground(133, 170);
      L.enemy('snail', 138, 10);
      L.enemy('bird', 143, 5);
      L.row(140, 9, 5);
      L.balloon(148);
      L.cloud(151, 3, 4); L.row(151, 2, 4);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'toys', theme: 'toys', name: 'Іграшкова кімната', blurb: 'Стрічки-конвеєри, солдатики й заводні мишки', w: 170,
    build(L) {
      L.ground(0, 24);
      L.sign(6, 'Стрічки-конвеєри везуть тебе вбік');
      L.row(9, 9, 3);
      L.belt(14, 10, 6, 1);
      L.row(14, 9, 6);
      L.enemy('soldier', 21, 10);
      L.ground(27, 52);
      L.belt(30, 10, 8, -1);
      L.row(31, 8, 6);
      L.enemy('mouse', 36, 10);
      L.spring(41);
      L.cloud(43, 4, 4); L.row(43, 3, 3); L.rainbow(46, 2);
      L.enemy('soldier', 47, 10);
      L.power('shield', 49, 8);
      L.ground(55, 80);
      L.check(57);
      L.block(60, 7, 3); L.row(60, 6, 3);
      L.enemy('mouse', 64, 10);
      L.belt(66, 7, 5, 1); L.row(66, 6, 5);
      L.enemy('soldier', 73, 10);
      L.power('candy', 75, 8);
      L.enemy('mouse', 77, 10);
      L.belt(80, 8, 4, 1); L.row(80, 7, 4);
      L.ground(84, 112);
      L.enemy('soldier', 89, 10);
      L.power('magnet', 91, 8);
      L.spring(94);
      L.cloud(96, 3, 4); L.row(96, 2, 4);
      L.belt(100, 10, 6, -1); L.row(100, 9, 6);
      L.enemy('mouse', 104, 10);
      L.check(108);
      L.ground(115, 140);
      L.enemy('ufo', 120, 6);
      L.block(122, 7, 4); L.row(122, 6, 4);
      L.belt(128, 10, 6, 1); L.row(128, 9, 6);
      L.enemy('mouse', 131, 10);
      L.ground(143, 170);
      L.enemy('soldier', 148, 10);
      L.row(150, 9, 5);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'desert', theme: 'desert', name: 'Пустеля Вихорів', blurb: 'Вихори підкидають угору, кактуси колються', w: 170,
    build(L) {
      L.ground(0, 24);
      L.sign(6, 'Вихор підкидає вгору! Заходь у нього');
      L.row(9, 9, 3);
      L.wind(13, 15, 1);
      L.cloud(15, 3, 5); L.row(15, 2, 4); L.rainbow(19, 1);
      L.enemy('scorp', 20, 10);
      L.wind(24, 30, 4); L.arc(24, 4, 6, 2);
      L.ground(30, 58);
      L.enemy('cactus', 35, 10);
      L.row(32, 9, 2); L.row(37, 9, 3);
      L.enemy('scorp', 42, 10);
      L.block(45, 7, 3); L.row(45, 6, 3);
      L.enemy('bird', 50, 5);
      L.power('shield', 52, 8);
      L.enemy('cactus', 55, 10);
      L.wind(58, 65, 4); L.arc(58, 4, 7, 2);
      L.ground(65, 95);
      L.check(67);
      L.enemy('scorp', 72, 10);
      L.wind(76, 78, 1);
      L.cloud(78, 3, 5); L.row(78, 2, 5);
      L.enemy('cactus', 85, 10);
      L.enemy('bird', 88, 6);
      L.power('candy', 90, 8);
      L.power('magnet', 92, 8);
      L.wind(95, 101, 5); L.arc(95, 5, 6, 2);
      L.ground(101, 130);
      L.enemy('scorp', 106, 10);
      L.enemy('cactus', 111, 10);
      L.check(114);
      L.row(116, 9, 4);
      L.block(121, 7, 3); L.row(121, 6, 3);
      L.enemy('scorp', 126, 10);
      L.wind(130, 137, 4); L.row(131, 4, 5);
      L.ground(137, 170);
      L.enemy('cactus', 143, 10);
      L.enemy('bird', 148, 5);
      L.row(145, 9, 5);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'tower', theme: 'tower', name: 'Вежа Дракона', blurb: 'Битва з Драконом Чхуном', w: 172, boss: 'dragon',
    build(L) {
      L.ground(0, 30);
      L.sign(6, 'Вежа Дракона Чхуна. Чуєш? Апчхи!');
      L.row(8, 9, 4);
      L.enemy('bat', 15, 4);
      L.spring(19);
      L.cloud(21, 4, 4); L.row(21, 3, 4);
      L.enemy('soldier', 26, 10);
      L.wind(30, 36, 4); L.arc(30, 5, 6, 2);
      L.ground(36, 64);
      L.enemy('squirrel', 42, 10);
      L.enemy('scorp', 47, 10);
      L.power('shield', 50, 8);
      L.block(53, 7, 3); L.row(53, 6, 3);
      L.enemy('bird', 58, 5);
      L.power('magnet', 60, 8);
      L.crumble(65, 8, 2); L.crumble(68, 7, 2);
      L.row(65, 7, 2); L.row(68, 6, 2);
      L.ground(71, 100);
      L.check(73);
      L.belt(76, 10, 6, 1); L.row(76, 9, 6);
      L.enemy('mouse', 84, 10);
      L.balloon(88);
      L.cloud(91, 3, 4); L.row(91, 2, 3); L.rainbow(94, 1);
      L.ground(103, 172);
      L.enemy('cloud', 109, 7);
      L.enemy('cactus', 114, 10);
      L.row(110, 9, 3); L.row(116, 9, 2);
      L.sign(122, 'Дракон Чхун! Стріляй, коли він сідає і чхає');
      L.check(126);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(136, 6, 3); L.cloud(158, 6, 3);
      L.power('shield', 147, 9);
      L.gate(168);
    }
  },
  {
    id: 'cave', theme: 'cave', name: 'Світлячкова печера', blurb: 'Темно, світлячки й чарівні скриньки', w: 170, dark: true,
    build(L) {
      L.ground(0, 26);
      L.sign(5, 'Стукни головою в золоту скриньку знизу!');
      L.qblock(9, 6, 'star'); L.qblock(10, 6, 'star5'); L.qblock(11, 6, 'star');
      L.row(14, 9, 4);
      L.enemy('bat', 18, 4);
      L.enemy('ghost', 22, 6);
      L.ground(29, 56);
      L.qblock(32, 6, 'shield');
      L.enemy('beetle', 36, 10);
      L.block(39, 7, 3); L.row(39, 6, 3);
      L.enemy('frog', 45, 10);
      L.spring(49);
      L.cloud(51, 3, 4); L.row(51, 2, 3); L.rainbow(54, 1);
      L.mover(57, 8, 2, 1, 0, 3); L.row(56, 7, 4);
      L.ground(60, 90);
      L.check(62);
      L.qblock(66, 6, 'star5');
      L.enemy('ghost', 70, 5);
      L.qblock(72, 6, 'magnet');
      L.enemy('beetle', 74, 10);
      L.row(72, 9, 4);
      L.qblock(79, 6, 'candy');
      L.enemy('frog', 83, 10);
      L.enemy('bat', 87, 4);
      L.ground(93, 125);
      L.row(95, 9, 3);
      L.qblock(99, 6, 'star'); L.qblock(100, 6, 'rainbow'); L.qblock(101, 6, 'star');
      L.enemy('beetle', 105, 10);
      L.check(110);
      L.enemy('ghost', 114, 6);
      L.block(117, 7, 3); L.row(117, 6, 3);
      L.enemy('frog', 121, 10);
      L.ground(128, 170);
      L.enemy('bat', 133, 4);
      L.row(139, 9, 5);
      L.enemy('beetle', 146, 10);
      L.qblock(150, 6, 'star5');
      L.sign(156, 'Ворота вже близько!');
      L.gate(163);
    }
  },
  {
    id: 'portal', theme: 'portal', name: 'Острів порталів', blurb: 'Портали переносять у різні місця', w: 170,
    build(L) {
      L.ground(0, 28);
      L.sign(5, 'Заходь у портал, і він перенесе тебе!');
      L.row(8, 9, 3);
      L.qblock(12, 6, 'star5');
      L.portal(18, 31, null, 4);
      L.ground(28, 36, 4);
      L.row(29, 3, 3); L.rainbow(33, 2);
      L.ground(36, 60);
      L.enemy('frog', 40, 10);
      L.qblock(43, 6, 'star5');
      L.enemy('ghost', 48, 6);
      L.block(51, 7, 3); L.row(51, 6, 3);
      L.power('shield', 55, 8);
      L.portal(58, 70);
      L.ground(68, 110);
      L.check(72);
      L.enemy('beetle', 76, 10);
      L.qblock(79, 6, 'candy');
      L.row(80, 9, 4);
      L.enemy('frog', 84, 10);
      L.portal(87, 95);
      L.block(90, 0, 2, 10);
      L.qblock(98, 6, 'magnet');
      L.enemy('ghost', 100, 6);
      L.row(97, 9, 4);
      L.qblock(103, 6, 'star5');
      L.ground(113, 140);
      L.check(115);
      L.enemy('frog', 119, 10);
      L.portal(124, 131, null, 3);
      L.cloud(129, 3, 6); L.row(129, 2, 4); L.rainbow(134, 1);
      L.enemy('beetle', 136, 10);
      L.ground(143, 170);
      L.enemy('frog', 148, 10);
      L.row(150, 9, 4);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'button', theme: 'button', name: 'Місто кнопок', blurb: 'Кнопки вмикають рожеві й блакитні мости', w: 170,
    build(L) {
      L.ground(0, 24);
      L.sign(4, 'Стрибни на кнопку, і рожеві та блакитні блоки поміняються!');
      L.button(11);
      L.row(14, 9, 4);
      L.qblock(18, 6, 'star5');
      L.swblocks(24, 10, 8, 'pink'); L.row(25, 8, 6);
      L.ground(32, 60);
      L.enemy('beetle', 36, 10);
      L.qblock(39, 6, 'star5');
      L.button(44);
      L.qblock(47, 6, 'magnet');
      L.swblocks(50, 6, 2, 'pink', 4);
      L.swblocks(53, 8, 2, 'blue'); L.swblocks(55, 6, 2, 'blue'); L.row(55, 5, 2); L.rainbow(57, 3);
      L.swblocks(60, 10, 8, 'blue'); L.enemy('ghost', 64, 6); L.row(61, 8, 6);
      L.ground(68, 96);
      L.check(70);
      L.button(74);
      L.enemy('frog', 79, 10);
      L.qblock(82, 6, 'candy');
      L.swblocks(84, 6, 3, 'pink'); L.row(84, 5, 3);
      L.swblocks(88, 7, 3, 'blue'); L.row(88, 6, 3);
      L.button(93);
      L.swblocks(96, 10, 8, 'pink'); L.row(97, 8, 6);
      L.ground(104, 133);
      L.enemy('beetle', 108, 10);
      L.check(110);
      L.button(114);
      L.enemy('frog', 118, 10);
      L.row(116, 9, 4);
      L.qblock(121, 6, 'star5');
      L.swblocks(124, 6, 3, 'blue'); L.row(124, 5, 3);
      L.swblocks(127, 7, 2, 'pink'); L.row(127, 6, 2);
      L.button(131);
      L.swblocks(133, 10, 8, 'blue'); L.row(134, 8, 6);
      L.ground(141, 170);
      L.enemy('ghost', 146, 6);
      L.row(149, 9, 4);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'maze', theme: 'maze', name: 'Лабіринт ключиків', blurb: 'Знайди ключики, щоб відчинити двері', w: 170,
    build(L) {
      L.ground(0, 30);
      L.sign(4, 'Двері відчиняє ключик. Знайди його!');
      L.key(11, 9);
      L.row(13, 9, 4);
      L.qblock(15, 6, 'star5');
      L.door(20);
      L.row(23, 9, 3);
      L.enemy('beetle', 25, 10);
      L.ground(33, 70);
      L.qblock(35, 6, 'magnet');
      L.enemy('frog', 37, 10);
      L.spring(40);
      L.cloud(42, 4, 4); L.key(44, 3); L.row(42, 3, 2);
      L.door(50);
      L.enemy('ghost', 55, 6);
      L.row(53, 9, 3);
      L.block(58, 7, 3); L.row(58, 6, 3);
      L.qblock(63, 6, 'shield');
      L.check(66);
      L.ground(73, 116);
      L.enemy('frog', 77, 10); L.enemy('beetle', 81, 10);
      L.key(85, 9);
      L.row(87, 9, 2);
      L.door(90);
      L.qblock(94, 6, 'rainbow');
      L.row(93, 9, 3);
      L.enemy('ghost', 97, 5);
      L.spring(99);
      L.block(101, 5, 4); L.key(104, 4); L.row(101, 4, 2);
      L.key(107, 9);
      L.door(109); L.door(111);
      L.ground(119, 145);
      L.check(121);
      L.enemy('frog', 124, 10);
      L.qblock(126, 6, 'candy');
      L.row(128, 9, 3);
      L.key(132, 9);
      L.enemy('beetle', 135, 10);
      L.door(139);
      L.row(141, 9, 3);
      L.ground(148, 170);
      L.enemy('ghost', 151, 6);
      L.row(152, 9, 3);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'wizard', theme: 'wizard', name: 'Вежа Чарівника', blurb: 'Битва з Чарівником Плутанком', w: 172, boss: 'wizard',
    build(L) {
      L.ground(0, 30);
      L.sign(5, 'Вежа Чарівника Плутанка. Тут усе перемішалося!');
      L.qblock(10, 6, 'star5');
      L.row(13, 9, 4);
      L.enemy('ghost', 18, 6);
      L.button(24);
      L.swblocks(30, 10, 4, 'pink'); L.row(30, 8, 4);
      L.ground(34, 64);
      L.qblock(36, 6, 'magnet');
      L.enemy('frog', 39, 10);
      L.qblock(42, 6, 'shield');
      L.key(45, 9);
      L.door(50);
      L.enemy('beetle', 54, 10);
      L.block(57, 7, 3); L.row(57, 6, 3);
      L.portal(61, 74);
      L.ground(71, 100);
      L.check(77);
      L.enemy('ghost', 81, 6);
      L.qblock(84, 6, 'star');
      L.enemy('frog', 88, 10);
      L.spring(91);
      L.cloud(93, 3, 4); L.row(93, 2, 3); L.rainbow(96, 1);
      L.ground(103, 172);
      L.enemy('beetle', 108, 10);
      L.row(110, 9, 3);
      L.sign(121, 'Плутанко! Стріляй, коли він чаклує або сміється');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(137, 7, 3); L.cloud(149, 7, 4); L.cloud(160, 7, 3);
      L.power('shield', 146, 9);
      L.gate(168);
    }
  },  {
    id: 'jungle', theme: 'jungle', name: 'Джунглі ліан', blurb: 'Лізь по ліанах, мавпочки кидаються бананами', w: 170,
    build(L) {
      L.ground(0, 30);
      L.sign(4, 'Підстрибни до ліани й тримай «Стрибок» — полізеш угору!');
      L.row(7, 9, 3);
      L.vine(12, 3); L.cloud(13, 4, 4); L.row(13, 3, 4); L.rainbow(18, 2);
      L.enemy('monkey', 22, 10);
      L.row(24, 9, 3);
      L.ground(33, 62);
      L.enemy('parrot', 37, 6);
      L.qblock(40, 6, 'star5');
      L.enemy('frog', 45, 10);
      L.qblock(47, 6, 'magnet');
      L.vine(49, 2); L.block(50, 3, 3); L.row(50, 2, 3);
      L.enemy('monkey', 56, 10);
      L.row(58, 9, 3);
      L.ground(65, 100);
      L.check(67);
      L.enemy('parrot', 72, 5);
      L.qblock(74, 6, 'shield');
      L.row(76, 9, 4);
      L.vine(81, 4); L.cloud(82, 5, 3); L.row(82, 4, 3);
      L.enemy('frog', 87, 10);
      L.enemy('monkey', 93, 10);
      L.mover(101, 8, 2, 1, 0, 3); L.row(100, 7, 4);
      L.ground(104, 135);
      L.enemy('parrot', 108, 6);
      L.qblock(111, 6, 'star'); L.qblock(112, 6, 'rainbow'); L.qblock(113, 6, 'star');
      L.check(116);
      L.enemy('monkey', 120, 10);
      L.vine(124, 3); L.cloud(125, 4, 4); L.row(125, 3, 4);
      L.enemy('frog', 131, 10);
      L.ground(138, 170);
      L.enemy('parrot', 142, 6);
      L.row(148, 9, 4);
      L.enemy('monkey', 154, 10);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'bubbles', theme: 'bubbles', name: 'Бульбашкове небо', blurb: 'Бульбашки тримають недовго, а тоді лопаються', w: 170,
    build(L) {
      L.ground(0, 26);
      L.sign(4, 'Бульбашка тримає недовго. Стрибай з неї далі!');
      L.row(7, 9, 3);
      L.bubble(11, 7); L.star(11, 6); L.bubble(14, 5); L.star(14, 4); L.bubble(17, 3); L.star(17, 2); L.rainbow(20, 2);
      L.enemy('bee', 22, 7);
      L.bubble(29, 9);
      L.ground(30, 58);
      L.enemy('frog', 34, 10);
      L.qblock(37, 6, 'star5');
      L.row(39, 9, 3);
      L.spring(43);
      L.bubble(45, 4); L.star(45, 3); L.bubble(48, 3); L.star(48, 2); L.bubble(51, 4); L.star(51, 3);
      L.enemy('parrot', 54, 6);
      L.bubble(61, 9);
      L.ground(62, 96);
      L.check(64);
      L.qblock(67, 6, 'magnet');
      L.enemy('bee', 70, 6);
      L.row(68, 9, 4);
      L.qblock(73, 6, 'shield');
      L.enemy('frog', 77, 10);
      L.bubble(79, 7); L.cloud(81, 5, 3); L.row(81, 4, 3);
      L.enemy('parrot', 87, 5);
      L.row(89, 9, 4);
      L.bubble(99, 9);
      L.ground(100, 132);
      L.enemy('bee', 104, 7);
      L.qblock(107, 6, 'star'); L.qblock(108, 6, 'rainbow'); L.qblock(109, 6, 'star');
      L.check(112);
      L.enemy('frog', 116, 10);
      L.spring(120); L.bubble(122, 4); L.star(122, 3); L.bubble(125, 3); L.rainbow(125, 1); L.bubble(128, 4); L.star(128, 3);
      L.bubble(135, 9);
      L.ground(136, 170);
      L.enemy('parrot', 140, 6);
      L.row(146, 9, 4);
      L.enemy('bee', 152, 7);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'bakery', theme: 'bakery', name: 'Солодка пекарня', blurb: 'Желе підкидає, пряничні чоловічки бігають', w: 170,
    build(L) {
      L.ground(0, 28);
      L.sign(4, 'Желе підкидає високо! Тримай «Стрибок», щоб злетіти ще вище');
      L.jelly(9, 10, 3); L.row(9, 5, 3);
      L.enemy('ginger', 16, 10);
      L.jelly(20, 10, 2);
      L.block(22, 5, 2, 5); L.row(22, 4, 2);
      L.row(25, 9, 2);
      L.ground(31, 60);
      L.belt(34, 10, 6, 1); L.row(34, 9, 6);
      L.enemy('mouse', 42, 10);
      L.qblock(45, 6, 'star5');
      L.jelly(48, 9, 2);
      L.cloud(50, 5, 4); L.row(50, 4, 4); L.rainbow(54, 3);
      L.enemy('ginger', 56, 10);
      L.ground(63, 98);
      L.check(65);
      L.qblock(68, 6, 'magnet');
      L.enemy('ginger', 70, 10);
      L.qblock(73, 6, 'shield');
      L.row(72, 9, 4);
      L.jelly(78, 10, 4); L.row(78, 4, 4);
      L.enemy('mouse', 85, 10);
      L.belt(88, 7, 5, -1); L.row(88, 6, 5);
      L.enemy('ginger', 94, 10);
      L.jelly(98, 10, 4); L.row(98, 6, 4);
      L.ground(102, 134);
      L.enemy('mouse', 106, 10);
      L.qblock(109, 6, 'star'); L.qblock(110, 6, 'rainbow'); L.qblock(111, 6, 'star');
      L.check(114);
      L.enemy('ginger', 118, 10);
      L.jelly(122, 10, 2); L.block(124, 5, 2, 5); L.row(124, 4, 2);
      L.belt(127, 10, 5, 1); L.row(127, 9, 5);
      L.ground(137, 170);
      L.enemy('ginger', 141, 10);
      L.row(147, 9, 4);
      L.enemy('mouse', 152, 10);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'pirate', theme: 'pirate', name: 'Піратська бухта', blurb: 'Гармати стріляють ядрами, чайки літають над водою', w: 170,
    build(L) {
      L.ground(0, 22, 7);
      L.sign(4, 'Гармати стріляють ядрами! Перестрибуй або стріляй у гармату');
      L.row(7, 6, 3);
      L.enemy('cannon', 17, 7);
      L.ground(22, 38, 11); L.water(22, 38, 8);
      L.cloud(25, 5, 3); L.row(25, 4, 3);
      L.row(24, 10, 3);
      L.enemy('fish', 29, 9);
      L.row(31, 10, 4);
      L.ground(38, 62, 7);
      L.check(40);
      L.enemy('crab', 44, 7);
      L.qblock(47, 3, 'star5');
      L.enemy('gull', 50, 3);
      L.block(53, 5, 2, 2); L.row(53, 4, 2);
      L.enemy('cannon', 58, 7);
      L.ground(62, 80, 11); L.water(62, 80, 8);
      L.mover(66, 7, 2, 1.5, 0, 3); L.row(65, 6, 4);
      L.enemy('fish', 70, 10);
      L.row(72, 10, 5);
      L.enemy('jelly', 76, 9);
      L.ground(80, 104, 7);
      L.check(82);
      L.row(84, 6, 3);
      L.power('magnet', 84, 5);
      L.enemy('cannon', 89, 7);
      L.qblock(92, 3, 'shield');
      L.enemy('gull', 96, 3);
      L.enemy('crab', 100, 7);
      L.ground(104, 120, 11); L.water(104, 120, 8);
      L.cloud(107, 5, 3); L.row(107, 4, 3);
      L.cloud(113, 5, 3); L.row(113, 4, 3); L.rainbow(117, 3);
      L.enemy('fish', 110, 10); L.row(108, 10, 6);
      L.ground(120, 146, 7);
      L.check(122);
      L.enemy('crab', 126, 7);
      L.qblock(129, 3, 'star'); L.qblock(130, 3, 'rainbow'); L.qblock(131, 3, 'star');
      L.enemy('cannon', 137, 7);
      L.enemy('gull', 141, 3);
      L.ground(149, 170, 7);
      L.enemy('crab', 153, 7);
      L.row(154, 6, 4);
      L.sign(159, 'Ворота вже близько!');
      L.gate(165);
    }
  },
  {
    id: 'sea', theme: 'sea', name: 'Кораловий палац', blurb: 'Битва з Медузою Желейкою', w: 172, boss: 'medusa',
    build(L) {
      L.ground(0, 26, 7);
      L.sign(5, 'Кораловий палац Медузи Желейки. Обережно, бульбашки!');
      L.qblock(10, 3, 'star5');
      L.row(13, 6, 4);
      L.enemy('crab', 19, 7);
      L.ground(26, 48, 11); L.water(26, 48, 8);
      L.row(28, 10, 4); L.enemy('fish', 33, 10); L.rainbow(37, 10); L.enemy('jelly', 41, 9); L.row(43, 10, 4);
      L.ground(48, 56, 7);
      L.ground(56, 78);
      L.check(58);
      L.qblock(61, 6, 'shield');
      L.bubble(64, 7); L.star(64, 6); L.bubble(67, 5); L.star(67, 4); L.cloud(70, 4, 3); L.row(70, 3, 3);
      L.qblock(65, 6, 'magnet');
      L.enemy('crab', 74, 10);
      L.row(75, 9, 2);
      L.ground(81, 100);
      L.enemy('jelly', 85, 7);
      L.qblock(88, 6, 'star');
      L.enemy('crab', 92, 10);
      L.spring(95); L.cloud(97, 4, 4); L.row(97, 3, 3); L.rainbow(100, 2);
      L.ground(103, 172);
      L.enemy('crab', 108, 10);
      L.row(110, 9, 3);
      L.sign(121, 'Медуза Желейка! Лопни щит у стрибку, а тоді стріляй');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(137, 7, 3); L.cloud(149, 7, 4); L.cloud(160, 7, 3);
      L.power('shield', 146, 9);
      L.gate(168);
    }
  },
  {
    id: 'music', theme: 'music', name: 'Музична країна', blurb: 'Клавіші співають, барабани підкидають', w: 170,
    build(L) {
      L.ground(0, 28);
      L.sign(4, 'Кожна клавіша співає! А барабан підкидає вгору');
      L.row(8, 9, 4);
      L.jelly(14, 10, 2); L.cloud(16, 5, 3); L.row(16, 4, 3);
      L.enemy('note', 21, 6);
      L.row(23, 9, 3);
      L.ground(31, 60);
      L.enemy('beetle', 35, 10);
      L.qblock(38, 6, 'star5');
      L.jelly(42, 9); L.star(44, 5); L.jelly(46, 7); L.star(48, 3); L.jelly(50, 5); L.rainbow(52, 1);
      L.enemy('note', 55, 5);
      L.ground(63, 98);
      L.check(65);
      L.qblock(68, 6, 'magnet');
      L.enemy('frog', 70, 10);
      L.row(68, 9, 4);
      L.qblock(74, 6, 'shield');
      L.jelly(76, 10, 2); L.block(78, 5, 2, 5); L.row(78, 4, 2);
      L.enemy('note', 84, 6);
      L.enemy('beetle', 88, 10);
      L.row(90, 9, 5);
      L.jelly(98, 10, 4); L.row(98, 6, 4);
      L.ground(102, 134);
      L.enemy('note', 106, 5);
      L.qblock(109, 6, 'star'); L.qblock(110, 6, 'rainbow'); L.qblock(111, 6, 'star');
      L.check(114);
      L.enemy('frog', 118, 10);
      L.jelly(122, 9, 2); L.cloud(124, 4, 4); L.row(124, 3, 4);
      L.enemy('beetle', 130, 10);
      L.ground(137, 170);
      L.enemy('note', 141, 6);
      L.row(147, 9, 4);
      L.enemy('frog', 152, 10);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'circus', theme: 'circus', name: 'Веселий цирк', blurb: 'Гармата перекидає через ями, колесо огляду крутиться', w: 170,
    build(L) {
      L.ground(0, 17);
      L.sign(4, 'Залізай у гармату — вона перекине тебе через яму!');
      L.row(7, 9, 3);
      L.launcher(13);
      L.arc(16, 4, 7, 1.4);
      L.ground(23, 52);
      L.enemy('bouncer', 30, 10);
      L.qblock(33, 6, 'star5');
      L.row(35, 9, 4);
      L.jelly(40, 10, 2); L.cloud(42, 5, 4); L.row(42, 4, 4);
      L.enemy('parrot', 47, 5);
      L.enemy('bouncer', 49, 10);
      L.ground(55, 92);
      L.check(57);
      L.qblock(60, 6, 'magnet');
      L.wheel(66, 4, 3.5, 4, 9);
      L.rainbow(65, 0); L.star(62, 3); L.star(69, 3);
      L.enemy('bouncer', 74, 10);
      L.qblock(77, 6, 'shield');
      L.row(79, 9, 4);
      L.launcher(88);
      L.arc(91, 4, 7, 1.4);
      L.ground(98, 130);
      L.check(101);
      L.enemy('bouncer', 106, 10);
      L.jelly(110, 10, 3); L.row(110, 5, 3);
      L.qblock(115, 6, 'star'); L.qblock(116, 6, 'rainbow'); L.qblock(117, 6, 'star');
      L.enemy('parrot', 120, 5);
      L.enemy('bouncer', 122, 10);
      L.row(124, 9, 4);
      L.ground(133, 170);
      L.enemy('bouncer', 138, 10);
      L.spring(141); L.cloud(143, 4, 4); L.row(143, 3, 4);
      L.row(150, 9, 4);
      L.enemy('bouncer', 153, 10);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'dino', theme: 'dino', name: 'Долина динозавриків', blurb: 'Гейзери підкидають, динозаврики тупотять', w: 170,
    build(L) {
      L.ground(0, 28);
      L.sign(4, 'Гейзер б\'є вгору по черзі. Стань у нього й зачекай!');
      L.row(7, 9, 3);
      L.geyser(11, 14, 2); L.block(14, 4, 2, 6); L.row(14, 3, 2);
      L.enemy('dino', 20, 10);
      L.row(22, 9, 3);
      L.ground(31, 62);
      L.enemy('ptero', 35, 3);
      L.qblock(38, 6, 'star5');
      L.qblock(41, 6, 'magnet');
      L.enemy('dino', 43, 10);
      L.geyser(46, 49, 1); L.cloud(49, 4, 4); L.row(49, 3, 4); L.rainbow(54, 2);
      L.row(52, 9, 4);
      L.enemy('frog', 58, 10);
      L.ground(65, 100);
      L.check(67);
      L.enemy('dino', 72, 10);
      L.qblock(75, 6, 'shield');
      L.geyser(78, 81, 2); L.block(81, 4, 2, 6); L.row(81, 3, 2);
      L.enemy('ptero', 87, 3);
      L.row(85, 9, 4);
      L.enemy('dino', 92, 10);
      L.mover(101, 8, 2, 1, 0, 3); L.row(100, 7, 4);
      L.ground(104, 136);
      L.enemy('ptero', 108, 3);
      L.qblock(111, 6, 'star'); L.qblock(112, 6, 'rainbow'); L.qblock(113, 6, 'star');
      L.check(116);
      L.enemy('dino', 120, 10);
      L.geyser(124, 127, 2); L.block(127, 4, 2, 6); L.row(127, 3, 2);
      L.enemy('dino', 133, 10);
      L.ground(139, 170);
      L.enemy('ptero', 143, 3);
      L.row(148, 9, 4);
      L.enemy('dino', 153, 10);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'snow', theme: 'snow', name: 'Сніжне містечко', blurb: 'Слизько! Сніговики кидаються сніжками, пінгвіни ковзають', w: 170,
    build(L) {
      L.ground(0, 26);
      L.sign(4, 'Тут слизько! А сніговики кидаються сніжками');
      L.row(7, 9, 4);
      L.enemy('penguin', 14, 10);
      L.qblock(17, 6, 'star5');
      L.enemy('snowman', 22, 10);
      L.crumble(26, 8, 2);
      L.ground(29, 58);
      L.row(31, 9, 3);
      L.enemy('penguin', 35, 10);
      L.cloud(38, 7, 3); L.row(38, 6, 3);
      L.enemy('snowman', 44, 10);
      L.qblock(46, 6, 'magnet');
      L.crumble(47, 6, 2); L.crumble(50, 4, 2); L.row(47, 5, 2); L.row(50, 3, 2); L.rainbow(53, 2);
      L.enemy('penguin', 55, 10);
      L.ground(61, 97);
      L.check(63);
      L.enemy('snowman', 68, 10);
      L.qblock(71, 6, 'shield');
      L.row(73, 9, 4);
      L.enemy('penguin', 78, 10);
      L.block(81, 7, 3); L.row(81, 6, 3);
      L.enemy('snowman', 87, 10);
      L.row(89, 9, 4);
      L.crumble(97, 8, 2);
      L.ground(100, 132);
      L.enemy('penguin', 104, 10);
      L.qblock(107, 6, 'star'); L.qblock(108, 6, 'rainbow'); L.qblock(109, 6, 'star');
      L.check(112);
      L.enemy('snowman', 116, 10);
      L.spring(120); L.cloud(122, 4, 4); L.row(122, 3, 4);
      L.enemy('penguin', 127, 10);
      L.ground(135, 170);
      L.enemy('snowman', 140, 10);
      L.row(146, 9, 4);
      L.enemy('penguin', 151, 10);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'factory', theme: 'factory', name: 'Фабрика Брязкала', blurb: 'Битва з Роботом Брязкалом', w: 172, boss: 'robot',
    build(L) {
      L.ground(0, 28);
      L.sign(5, 'Фабрика Робота Брязкала. Шестерні крутяться!');
      L.qblock(10, 6, 'star5');
      L.belt(13, 10, 6, 1); L.row(13, 9, 6);
      L.enemy('soldier', 22, 10);
      L.ground(31, 64);
      L.wheel(37, 5, 3, 3, 8); L.star(36, 1);
      L.qblock(41, 6, 'magnet');
      L.enemy('mouse', 43, 10);
      L.qblock(46, 6, 'shield');
      L.belt(49, 7, 5, -1); L.row(49, 6, 5);
      L.enemy('soldier', 56, 10);
      L.row(58, 9, 4);
      L.ground(67, 100);
      L.check(69);
      L.enemy('mouse', 74, 10);
      L.wheel(81, 5, 3, 4, 9); L.rainbow(80, 1);
      L.enemy('soldier', 87, 10);
      L.qblock(90, 6, 'star');
      L.row(92, 9, 4);
      L.ground(103, 172);
      L.enemy('mouse', 108, 10);
      L.row(110, 9, 3);
      L.sign(121, 'Робот Брязкало! Стріляй, коли на животі відчиниться віконце');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(137, 6, 3); L.cloud(149, 6, 4); L.cloud(160, 6, 3);
      L.power('shield', 146, 9);
      L.gate(168);
    }
  },  {
    id: 'beans', theme: 'beans', name: 'Чарівний город', blurb: 'Стрільни в квасолину — виросте стебло до неба', w: 170,
    build(L) {
      L.ground(0, 30);
      L.sign(4, 'Стрільни рогом у чарівну квасолину — виросте стебло!');
      L.row(7, 9, 3);
      L.bean(12, 3); L.block(14, 4, 2, 6); L.row(14, 3, 2);
      L.enemy('worm', 19, 10);
      L.row(21, 9, 4);
      L.enemy('bird', 26, 6);
      L.ground(33, 64);
      L.qblock(36, 6, 'star5');
      L.enemy('worm', 40, 10);
      L.bean(44, 4); L.cloud(46, 2, 4); L.row(46, 1, 4); L.rainbow(51, 1);
      L.enemy('mole', 53, 10);
      L.row(55, 9, 4);
      L.enemy('worm', 60, 10);
      L.ground(67, 100);
      L.check(69);
      L.enemy('mole', 73, 10);
      L.qblock(76, 6, 'shield');
      L.bean(80, 3); L.block(82, 4, 2, 6); L.row(82, 3, 2);
      L.enemy('bird', 88, 6);
      L.qblock(90, 6, 'magnet');
      L.enemy('worm', 92, 10);
      L.row(94, 9, 4);
      L.mover(101, 8, 2, 1, 0, 3); L.row(100, 7, 4);
      L.ground(104, 136);
      L.enemy('mole', 108, 10);
      L.qblock(111, 6, 'star'); L.qblock(112, 6, 'rainbow'); L.qblock(113, 6, 'star');
      L.check(116);
      L.enemy('worm', 120, 10);
      L.bean(124, 3); L.block(126, 4, 2, 6); L.row(126, 3, 2);
      L.enemy('bird', 131, 6);
      L.ground(139, 170);
      L.enemy('mole', 143, 10);
      L.row(148, 9, 4);
      L.enemy('worm', 153, 10);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'lantern', theme: 'lantern', name: 'Ліхтарикова ніч', blurb: 'Темно! Запалюй ліхтарики пострілом рога', w: 170, dark: true,
    build(L) {
      L.ground(0, 28);
      L.sign(4, 'Темно! Стрільни в ліхтарик — і він засвітиться');
      L.lantern(8); L.row(10, 9, 3);
      L.enemy('owl', 15, 4);
      L.lantern(18, 5);
      L.enemy('frog', 21, 10);
      L.row(23, 9, 3);
      L.ground(31, 60);
      L.lantern(33);
      L.qblock(36, 6, 'star5');
      L.enemy('ghost', 40, 6);
      L.cloud(43, 6, 3); L.row(43, 5, 3); L.lantern(47, 4);
      L.enemy('owl', 50, 3);
      L.enemy('worm', 54, 10);
      L.lantern(57);
      L.ground(63, 98);
      L.check(65);
      L.lantern(68);
      L.enemy('frog', 72, 10);
      L.qblock(75, 6, 'shield');
      L.row(77, 9, 4);
      L.qblock(78, 6, 'magnet');
      L.enemy('owl', 82, 4);
      L.lantern(85, 5);
      L.block(88, 7, 3); L.row(88, 6, 3);
      L.enemy('ghost', 93, 6);
      L.lantern(96);
      L.mover(99, 8, 2, 1, 0, 3); L.row(98, 7, 4);
      L.ground(102, 134);
      L.lantern(104);
      L.qblock(108, 6, 'star'); L.qblock(109, 6, 'rainbow'); L.qblock(110, 6, 'star');
      L.check(113);
      L.enemy('owl', 117, 4);
      L.enemy('worm', 121, 10);
      L.lantern(124, 5);
      L.spring(127); L.cloud(129, 4, 4); L.row(129, 3, 4);
      L.ground(137, 170);
      L.lantern(139);
      L.enemy('frog', 143, 10);
      L.row(148, 9, 4);
      L.enemy('owl', 152, 4);
      L.lantern(155);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'rainbow', theme: 'rainbow', name: 'Веселкові мости', blurb: 'Веселкові блоки то з\'являються, то зникають', w: 170,
    build(L) {
      L.ground(0, 26);
      L.sign(4, 'Веселкові мости то є, то немає. Коли блимають — скоро зникнуть!');
      L.row(7, 9, 3);
      L.blink(12, 7, 3); L.row(12, 6, 3);
      L.enemy('bird', 18, 6);
      L.row(20, 9, 3);
      L.blink(26, 10, 4);
      L.ground(30, 58);
      L.enemy('worm', 34, 10);
      L.qblock(37, 6, 'star5');
      L.blink(41, 7, 2); L.blink(44, 5, 2); L.blink(47, 3, 2); L.row(47, 2, 2); L.rainbow(50, 2);
      L.enemy('bee', 53, 7);
      L.qblock(55, 6, 'magnet');
      L.blink(58, 10, 4);
      L.ground(62, 96);
      L.check(64);
      L.enemy('worm', 69, 10);
      L.qblock(72, 6, 'shield');
      L.row(74, 9, 4);
      L.enemy('bird', 79, 5);
      L.blink(83, 7, 3); L.row(83, 6, 3);
      L.enemy('bee', 89, 7);
      L.row(91, 9, 3);
      L.blink(96, 10, 4);
      L.ground(100, 132);
      L.enemy('worm', 104, 10);
      L.qblock(107, 6, 'star'); L.qblock(108, 6, 'rainbow'); L.qblock(109, 6, 'star');
      L.check(112);
      L.enemy('bird', 116, 6);
      L.blink(120, 8, 2); L.blink(123, 6, 2); L.cloud(126, 4, 4); L.row(126, 3, 4);
      L.blink(132, 10, 4);
      L.ground(136, 170);
      L.enemy('worm', 140, 10);
      L.row(146, 9, 4);
      L.enemy('bird', 151, 6);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'mine', theme: 'mine', name: 'Кротячі шахти', blurb: 'Вагонетки везуть над прірвою, кроти визирають із нірок', w: 170,
    build(L) {
      L.ground(0, 20);
      L.sign(4, 'Заходь у вагонетку — вона перевезе через прірву!');
      L.row(7, 9, 3);
      L.cart(14, 31); L.row(21, 8, 6);
      L.ground(28, 50);
      L.enemy('mole', 35, 10);
      L.qblock(38, 6, 'star5');
      L.enemy('worm', 42, 10);
      L.row(44, 9, 2);
      L.qblock(44, 6, 'magnet');
      L.cart(47, 62); L.row(51, 8, 6);
      L.enemy('bat', 55, 3);
      L.ground(58, 90);
      L.check(64);
      L.enemy('mole', 67, 10);
      L.qblock(70, 6, 'shield');
      L.row(72, 9, 4);
      L.enemy('mole', 77, 10);
      L.block(80, 7, 3); L.row(80, 6, 3);
      L.enemy('worm', 84, 10);
      L.cart(86, 104); L.row(91, 8, 8);
      L.enemy('bat', 96, 3);
      L.ground(100, 132);
      L.check(106);
      L.enemy('mole', 109, 10);
      L.qblock(112, 6, 'star'); L.qblock(113, 6, 'rainbow'); L.qblock(114, 6, 'star');
      L.enemy('bat', 118, 3);
      L.enemy('mole', 122, 10);
      L.row(124, 9, 4);
      L.ground(135, 170);
      L.enemy('worm', 139, 10);
      L.row(145, 9, 4);
      L.enemy('mole', 150, 10);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'burrow', theme: 'burrow', name: 'Нора Копайла', blurb: 'Битва з Королем Кротів Копайлом', w: 172, boss: 'moleking',
    build(L) {
      L.ground(0, 28);
      L.sign(5, 'Нора Короля Кротів Копайла. Під землею хтось копає!');
      L.qblock(10, 6, 'star5');
      L.row(13, 9, 4);
      L.enemy('mole', 18, 10);
      L.enemy('worm', 22, 10);
      L.cart(25, 42); L.row(29, 8, 8);
      L.ground(38, 64);
      L.check(44);
      L.enemy('mole', 48, 10);
      L.qblock(51, 6, 'shield');
      L.row(53, 9, 4);
      L.enemy('worm', 58, 10);
      L.blink(64, 10, 3);
      L.ground(67, 100);
      L.check(69);
      L.enemy('mole', 74, 10);
      L.qblock(77, 6, 'star');
      L.enemy('worm', 81, 10);
      L.qblock(83, 6, 'magnet');
      L.row(84, 9, 4);
      L.spring(90); L.cloud(92, 4, 4); L.row(92, 3, 3); L.rainbow(96, 2);
      L.ground(103, 172);
      L.enemy('mole', 108, 10);
      L.row(110, 9, 3);
      L.sign(121, 'Король Кротів! Стріляй, коли він вилазить із нірки');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(139, 6, 3); L.cloud(153, 6, 3);
      L.power('shield', 146, 9);
      L.gate(168);
    }
  },  {
    id: 'peaks', theme: 'peaks', name: 'Канатні гори', blurb: 'Канатна дорога через долини, кізоньки бодаються', w: 170,
    build(L) {
      L.ground(0, 22, 6);
      L.sign(4, 'Підійди до ручки — канатна дорога перенесе через долину!');
      L.row(8, 5, 3);
      L.enemy('goat', 12, 6);
      L.zip(19, 37, 6, 7); L.row(24, 5, 10);
      L.ground(34, 60, 7);
      L.qblock(42, 3, 'star5');
      L.enemy('goat', 46, 7);
      L.enemy('bird', 50, 3);
      L.row(51, 6, 3);
      L.zip(56, 73, 7, 6); L.row(60, 5, 9);
      L.ground(70, 96, 6);
      L.check(75);
      L.power('magnet', 78, 4);
      L.enemy('goat', 80, 6);
      L.qblock(84, 2, 'shield');
      L.row(86, 5, 3);
      L.enemy('bird', 90, 2);
      L.zip(92, 110, 6, 8); L.row(97, 6, 10);
      L.ground(107, 136, 8);
      L.check(113);
      L.enemy('goat', 117, 8);
      L.qblock(120, 4, 'star'); L.qblock(121, 4, 'rainbow'); L.qblock(122, 4, 'star');
      L.row(124, 7, 4);
      L.enemy('goat', 130, 8);
      L.ground(139, 170, 8);
      L.enemy('bird', 143, 4);
      L.row(148, 7, 4);
      L.enemy('goat', 154, 8);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'windmill', theme: 'windmill', name: 'Долина вітряків', blurb: 'Попутний вітер переносить через широкі ями', w: 170,
    build(L) {
      L.ground(0, 24);
      L.sign(4, 'Вітер дме вперед! Розбіжись і стрибай — він перенесе через яму');
      L.row(7, 9, 3);
      L.breeze(17, 32); L.arc(25, 7, 6, 2);
      L.ground(31, 58);
      L.enemy('mouse', 36, 10);
      L.qblock(39, 6, 'star5');
      L.qblock(46, 6, 'magnet');
      L.wheel(47, 5, 3.5, 4, 10); L.rainbow(46, 0);
      L.enemy('bird', 53, 5);
      L.breeze(51, 66); L.arc(59, 7, 6, 2);
      L.ground(65, 96);
      L.check(67);
      L.enemy('mouse', 72, 10);
      L.qblock(75, 6, 'shield');
      L.row(77, 9, 3);
      L.enemy('bee', 82, 7);
      L.wheel(86, 5, 3, 3, 9); L.star(85, 1);
      L.breeze(89, 104); L.arc(97, 7, 6, 2);
      L.ground(103, 134);
      L.check(105);
      L.enemy('mouse', 109, 10);
      L.qblock(112, 6, 'star'); L.qblock(113, 6, 'rainbow'); L.qblock(114, 6, 'star');
      L.enemy('bird', 118, 5);
      L.row(120, 9, 3);
      L.breeze(124, 141); L.arc(135, 7, 6, 2);
      L.ground(141, 170);
      L.enemy('mouse', 146, 10);
      L.row(151, 9, 4);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'tiny', theme: 'tiny', name: 'Країна велетенських квітів', blurb: 'Грибочок зменшує, і можна пролізти в нірку', w: 170,
    build(L) {
      L.ground(0, 30);
      L.sign(4, 'Чарівний грибочок зменшує! Маленька єдиноріжка пролізе в нірку');
      L.row(7, 9, 3);
      L.power('mini', 12, 9);
      L.block(16, 0, 6, 9); L.row(16, 9, 6);
      L.enemy('ant', 25, 10);
      L.ground(33, 64);
      L.enemy('beetle', 37, 10);
      L.qblock(40, 6, 'star5');
      L.power('mini', 45, 9);
      L.block(48, 0, 5, 9); L.row(48, 9, 5);
      L.enemy('ant', 56, 10);
      L.row(58, 9, 3);
      L.ground(67, 100);
      L.check(69);
      L.qblock(72, 6, 'magnet');
      L.enemy('bee', 74, 7);
      L.qblock(77, 6, 'shield');
      L.cloud(80, 6, 3); L.row(80, 5, 3);
      L.power('mini', 85, 9);
      L.block(88, 0, 6, 9); L.row(88, 9, 6);
      L.enemy('ant', 96, 10);
      L.mover(101, 8, 2, 1, 0, 3); L.row(100, 7, 4);
      L.ground(104, 136);
      L.enemy('beetle', 108, 10);
      L.qblock(111, 6, 'star'); L.qblock(112, 6, 'rainbow'); L.qblock(113, 6, 'star');
      L.check(116);
      L.enemy('ant', 120, 10);
      L.power('mini', 123, 9);
      L.block(126, 0, 5, 9); L.row(126, 9, 5);
      L.ground(139, 170);
      L.enemy('bee', 143, 7);
      L.row(148, 9, 4);
      L.enemy('ant', 153, 10);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'swing', theme: 'swing', name: 'Ліс гойдалок', blurb: 'Гойдалки над ярами, павучки спускаються на павутинках', w: 170, needK: 0.42,
    build(L) {
      L.ground(0, 26);
      L.sign(4, 'Стрибай на гойдалку — вона перенесе далі!');
      L.row(7, 9, 3);
      L.swing(14, 1, 6, 0.6, 3.2); L.row(11, 6, 7);
      L.enemy('spider', 21, 6);
      L.swing(28, 2, 6, 0.55, 3.4);
      L.ground(30, 60);
      L.qblock(34, 6, 'star5');
      L.row(36, 9, 3);
      L.enemy('owl', 39, 3);
      L.enemy('spider', 43, 6);
      L.swing(48, 1, 5, 0.7, 3); L.cloud(52, 3, 4); L.row(52, 2, 4); L.rainbow(57, 1);
      L.qblock(48, 6, 'magnet');
      L.swing(61, 2, 6, 0.5, 3.4);
      L.ground(63, 96);
      L.check(65);
      L.row(66, 9, 3);
      L.enemy('spider', 70, 6);
      L.qblock(73, 6, 'shield');
      L.row(75, 9, 4);
      L.enemy('owl', 80, 3);
      L.swing(84, 1, 6, 0.6, 3.2); L.row(81, 6, 7);
      L.enemy('spider', 90, 6);
      L.swing(98, 2, 6, 0.55, 3.4);
      L.ground(100, 132);
      L.check(102);
      L.enemy('owl', 106, 3);
      L.row(104, 9, 3);
      L.qblock(109, 6, 'star'); L.qblock(110, 6, 'rainbow'); L.qblock(111, 6, 'star');
      L.enemy('spider', 115, 6);
      L.row(116, 9, 3);
      L.swing(120, 1, 5, 0.7, 3); L.cloud(124, 3, 4); L.row(124, 2, 4);
      L.swing(134, 2, 6, 0.55, 3.4);
      L.ground(136, 170);
      L.row(138, 9, 3);
      L.enemy('spider', 141, 6);
      L.row(147, 9, 4);
      L.enemy('owl', 151, 3);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'dream', theme: 'dream', name: 'Країна снів', blurb: 'Битва з Будильником Дзеленчиком', w: 172, boss: 'clock',
    build(L) {
      L.ground(0, 28);
      L.sign(5, 'Країна снів. Подушки підкидають, а на овечок можна стрибати');
      L.jelly(9, 10, 3); L.row(9, 5, 3);
      L.sheep(14, 26); L.cloud(19, 5, 4); L.row(19, 4, 4);
      L.ground(31, 64);
      L.qblock(34, 6, 'star5');
      L.enemy('owl', 38, 4);
      L.qblock(40, 6, 'magnet');
      L.sheep(42, 56); L.cloud(47, 5, 4); L.row(47, 4, 4); L.rainbow(52, 3);
      L.enemy('ghost', 59, 6);
      L.ground(67, 100);
      L.check(69);
      L.jelly(73, 10, 2); L.block(75, 5, 2, 5); L.row(75, 4, 2);
      L.enemy('owl', 82, 4);
      L.qblock(86, 6, 'star');
      L.sheep(88, 99); L.cloud(92, 5, 3); L.row(92, 4, 3);
      L.ground(103, 172);
      L.enemy('ghost', 108, 6);
      L.row(110, 9, 3);
      L.sign(121, 'Будильник Дзеленчик! Чекай, поки задрімає, і тоді стріляй');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(137, 6, 3); L.cloud(149, 6, 4); L.cloud(160, 6, 3);
      L.power('shield', 146, 9);
      L.gate(168);
    }
  },  {
    id: 'tide', theme: 'tide', name: 'Острів припливів', blurb: 'Вода то прибуває, то відступає; черепашки ховаються в панцирики', w: 170,
    build(L) {
      L.ground(0, 22, 5);
      L.sign(4, 'Вода то прибуває, то відступає. Пливи нагору, коли вона висока!');
      L.row(7, 4, 3);
      L.enemy('turtle', 15, 5);
      L.ground(22, 46, 11); L.tide(22, 46, 11.3, 5.3, 8);
      L.row(24, 10, 4); L.row(31, 7, 4); L.enemy('crab', 37, 11); L.row(40, 10, 3);
      L.ground(46, 72, 5);
      L.check(48);
      L.enemy('turtle', 53, 5);
      L.qblock(56, 1, 'star5');
      L.enemy('turtle', 61, 5);
      L.row(63, 4, 4);
      L.qblock(68, 1, 'magnet');
      L.ground(72, 100, 11); L.tide(72, 100, 11.3, 5.3, 7);
      L.row(74, 10, 4); L.enemy('crab', 82, 11); L.rainbow(85, 7); L.row(90, 8, 4);
      L.ground(100, 132, 5);
      L.check(102);
      L.enemy('turtle', 107, 5);
      L.qblock(110, 1, 'star'); L.qblock(111, 1, 'rainbow'); L.qblock(112, 1, 'star');
      L.enemy('turtle', 116, 5);
      L.row(118, 4, 4);
      L.enemy('bird', 124, 2);
      L.ground(135, 170, 5);
      L.enemy('turtle', 140, 5);
      L.row(146, 4, 4);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'aurora', theme: 'aurora', name: 'Північне сяйво', blurb: 'Сніжинка заморожує ворогів у крижані кубики', w: 170, needK: 0.36,
    build(L) {
      L.ground(0, 26);
      L.sign(4, 'Сніжинка заморожує ворогів у крижані кубики. Стань на кубик — і дострибнеш до хмаринки!');
      L.power('frost', 8, 8);
      L.row(10, 9, 3);
      L.enemy('snowman', 15, 10);
      L.cloud(16, 5, 5); L.row(16, 3, 5);
      L.enemy('penguin', 23, 10);
      L.ground(29, 58);
      L.enemy('owl', 33, 4);
      L.qblock(36, 6, 'star5');
      L.power('frost', 40, 8);
      L.enemy('snowman', 44, 10);
      L.cloud(45, 5, 3); L.row(45, 3, 3);
      L.cloud(49, 3, 3); L.row(49, 2, 3); L.rainbow(52, 1);
      L.enemy('penguin', 54, 10);
      L.row(55, 9, 2);
      L.ground(61, 96);
      L.check(63);
      L.qblock(66, 6, 'magnet');
      L.enemy('owl', 70, 4);
      L.qblock(73, 6, 'shield');
      L.row(75, 9, 4);
      L.power('frost', 80, 8);
      L.enemy('penguin', 84, 10); L.enemy('penguin', 93, 10);
      L.cloud(85, 5, 6); L.row(85, 3, 6);
      L.mover(97, 8, 2, 1, 0, 3); L.row(96, 7, 4);
      L.ground(100, 132);
      L.check(102);
      L.enemy('penguin', 106, 10);
      L.qblock(109, 6, 'star'); L.qblock(110, 6, 'rainbow'); L.qblock(111, 6, 'star');
      L.power('frost', 114, 8);
      L.enemy('snowman', 119, 10);
      L.cloud(120, 5, 4); L.row(120, 3, 3);
      L.cloud(125, 2, 4); L.row(125, 1, 4);
      L.row(128, 9, 3);
      L.ground(135, 170);
      L.enemy('owl', 139, 4);
      L.row(145, 9, 4);
      L.enemy('penguin', 150, 10);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'storm', theme: 'storm', name: 'Грозові хмари', blurb: 'Хмарки блимають і б\'ють блискавками — проходь між ударами', w: 170,
    build(L) {
      L.ground(0, 26);
      L.sign(4, 'Грозова хмарка блимає, перш ніж ударить блискавкою. Проходь, коли вона спокійна!');
      L.row(7, 9, 3);
      L.storm(14); L.row(12, 9, 5);
      L.enemy('cloud', 20, 5);
      L.ground(29, 58);
      L.storm(33); L.qblock(37, 6, 'star5');
      L.enemy('bird', 41, 5);
      L.qblock(43, 6, 'magnet');
      L.storm(45); L.row(43, 9, 5);
      L.cloud(49, 6, 3); L.row(49, 5, 3);
      L.enemy('cloud', 54, 5);
      L.ground(61, 96);
      L.check(63);
      L.storm(68); L.row(66, 9, 5);
      L.qblock(72, 6, 'shield');
      L.enemy('bird', 76, 5);
      L.storm(81); L.storm(85); L.row(79, 9, 8);
      L.enemy('cloud', 90, 5);
      L.mover(97, 8, 2, 1, 0, 3); L.row(96, 7, 4);
      L.ground(100, 132);
      L.check(102);
      L.storm(107);
      L.qblock(110, 6, 'star'); L.qblock(111, 6, 'rainbow'); L.qblock(112, 6, 'star');
      L.enemy('cloud', 116, 5);
      L.storm(121); L.row(119, 9, 5);
      L.spring(126); L.cloud(128, 4, 3); L.row(128, 3, 3);
      L.ground(135, 170);
      L.storm(140);
      L.enemy('bird', 144, 5);
      L.row(149, 9, 4);
      L.sign(157, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'moon', theme: 'moon', name: 'Місячна база', blurb: 'У фіолетових колонах майже немає ваги — стрибки до неба', w: 170, needK: 0.42,
    build(L) {
      L.ground(0, 32);
      L.sign(4, 'У фіолетових колонах майже немає ваги — стрибай дуже високо!');
      L.row(7, 9, 3);
      L.lowgrav(13, 22); L.block(20, 3, 2, 7); L.row(20, 2, 2);
      L.enemy('alien', 26, 10);
      L.row(27, 9, 3);
      L.lowgrav(30, 42); L.arc(33, 5, 7, 3);
      L.ground(40, 72);
      L.check(44);
      L.qblock(47, 6, 'star5');
      L.qblock(50, 6, 'magnet');
      L.enemy('ufo', 52, 5);
      L.enemy('alien', 55, 10);
      L.lowgrav(58, 64); L.cloud(60, 2, 4); L.row(60, 1, 4);
      L.enemy('alien', 67, 10);
      L.row(68, 9, 3);
      L.lowgrav(70, 82); L.arc(73, 5, 7, 3);
      L.ground(80, 112);
      L.check(84);
      L.enemy('alien', 88, 10);
      L.qblock(91, 6, 'shield');
      L.lowgrav(95, 103); L.block(101, 3, 2, 7); L.row(101, 2, 2);
      L.enemy('ufo', 106, 5);
      L.row(107, 9, 3);
      L.lowgrav(110, 122); L.arc(113, 5, 7, 3);
      L.ground(120, 170);
      L.enemy('alien', 126, 10);
      L.qblock(129, 6, 'star'); L.qblock(130, 6, 'rainbow'); L.qblock(131, 6, 'star');
      L.enemy('alien', 136, 10);
      L.lowgrav(139, 145); L.cloud(141, 2, 4); L.row(141, 1, 4);
      L.enemy('ufo', 148, 5);
      L.row(153, 9, 4);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'station', theme: 'station', name: 'Космічна станція', blurb: 'Битва з Восьминіжкою Ласункою', w: 172, boss: 'octopus',
    build(L) {
      L.ground(0, 28);
      L.sign(5, 'Космічна станція Восьминіжки Ласунки. Вона з\'їла всі зоряні цукерки!');
      L.qblock(10, 6, 'star5');
      L.row(13, 9, 4);
      L.enemy('alien', 18, 10);
      L.lowgrav(22, 35); L.arc(28, 6, 5, 2);
      L.ground(33, 64);
      L.check(36);
      L.enemy('ufo', 41, 5);
      L.qblock(44, 6, 'shield');
      L.enemy('alien', 48, 10);
      L.row(50, 9, 4);
      L.enemy('turtle', 56, 10);
      L.ground(67, 100);
      L.check(69);
      L.enemy('alien', 74, 10);
      L.qblock(76, 6, 'magnet');
      L.power('frost', 77, 8);
      L.qblock(80, 6, 'star');
      L.enemy('ufo', 84, 5);
      L.lowgrav(88, 96); L.cloud(90, 2, 4); L.row(90, 1, 4); L.rainbow(95, 1);
      L.ground(103, 172);
      L.enemy('alien', 108, 10);
      L.row(110, 9, 3);
      L.sign(121, 'Восьминіжка Ласунка! Стріляй, коли вона відкриє ротик');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(137, 6, 3); L.cloud(149, 6, 4); L.cloud(160, 6, 3);
      L.power('shield', 146, 9);
      L.gate(168);
    }
  },
  {
    id: 'river', theme: 'river', name: 'Боброва річка', blurb: 'Колоди пливуть за течією, а рибки вистрибують із води', w: 170, needK: 0.45,
    build(L) {
      L.ground(0, 18, 8);
      L.sign(4, 'Колоди пливуть за течією. Стрибай на колоду — і катайся!');
      L.row(7, 6, 3);
      L.enemy('beaver', 12, 8);
      L.ground(18, 48, 11); L.river(18, 48, 8, 55); L.logs(18, 48, 8, 3, 50);
      L.row(21, 6, 4); L.arc(27, 4, 5, 2); L.row(34, 6, 4); L.row(41, 3, 3);
      L.row(23, 10, 3); L.row(37, 10, 3);
      L.enemy('leaper', 31, 8); L.enemy('leaper', 44, 8);
      L.ground(48, 72, 8);
      L.check(50);
      L.power('magnet', 53, 6);
      L.qblock(56, 4, 'star5');
      L.enemy('beaver', 60, 8);
      L.cloud(63, 4, 3); L.row(63, 3, 3);
      L.enemy('beaver', 68, 8);
      L.ground(72, 110, 11); L.river(72, 110, 8, 70); L.logs(72, 110, 8, 4, 55);
      L.row(75, 6, 5); L.arc(83, 4, 6, 2); L.rainbow(91, 2); L.row(95, 6, 5); L.row(103, 3, 3);
      L.row(80, 10, 4); L.row(97, 10, 4);
      L.enemy('leaper', 81, 8); L.enemy('leaper', 89, 8); L.enemy('leaper', 100, 8);
      L.ground(110, 136, 8);
      L.check(112);
      L.enemy('beaver', 117, 8);
      L.qblock(120, 4, 'star'); L.qblock(121, 4, 'rainbow'); L.qblock(122, 4, 'star');
      L.cloud(126, 5, 3); L.row(126, 4, 3);
      L.enemy('beaver', 131, 8);
      L.ground(136, 156, 11); L.river(136, 156, 8, 60); L.logs(136, 156, 8, 2, 45);
      L.row(139, 6, 4); L.arc(146, 4, 5, 2);
      L.enemy('leaper', 144, 8);
      L.ground(156, 170, 8);
      L.row(157, 6, 3);
      L.sign(160, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'kites', theme: 'kites', name: 'Луг повітряних зміїв', blurb: 'Хапай змія: тримай «Стрибок» — вище, відпусти — нижче', w: 170, needK: 0.4,
    build(L) {
      L.ground(0, 22);
      L.sign(4, 'Підійди до повітряного змія — він сам підхопить! Тримай «Стрибок» — вище, відпусти — нижче');
      L.row(8, 9, 3);
      L.enemy('snail', 13, 10);
      L.kite(19, 50, 2);
      for (let i = 0; i < 12; i++) L.star(24 + i * 2, Math.round(5 - 2.6 * Math.sin(i * 0.65)));
      L.rainbow(35, 2);
      L.ground(48, 74);
      L.check(53);
      L.qblock(57, 6, 'star5');
      L.enemy('frog', 61, 10);
      L.power('magnet', 64, 8);
      L.cloud(66, 6, 3); L.row(66, 5, 3);
      L.kite(71, 104, 1);
      L.row(75, 2, 4); L.row(81, 7, 4); L.row(87, 2, 4); L.rainbow(90, 1); L.row(93, 7, 4); L.row(99, 3, 3);
      L.enemy('sparrow', 86, 5); L.enemy('sparrow', 97, 3);
      L.ground(102, 128);
      L.check(107);
      L.enemy('snail', 111, 10);
      L.spring(115); L.cloud(117, 4, 3); L.row(117, 3, 3); L.rainbow(118, 1);
      L.qblock(121, 6, 'shield');
      L.enemy('frog', 123, 10);
      L.kite(126, 152, 2);
      L.arc(130, 7, 9, 4); L.row(140, 2, 3); L.row(146, 6, 3);
      L.enemy('sparrow', 142, 4);
      L.ground(150, 170);
      L.row(153, 9, 3);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'pinball', theme: 'pinball', name: 'Зоряний пінбол', blurb: 'Кульки-відбивачі підкидають і дзвенять, вогники світяться', w: 170,
    build(L) {
      L.ground(0, 30);
      L.sign(4, 'Кулька-відбивач підкидає високо — дзинь! Кожна кулька дає три зірочки');
      L.bumper(11, 9);
      L.cloud(13, 5, 4); L.row(13, 3, 4);
      L.lights(19, 5);
      L.enemy('marble', 26, 10);
      L.ground(33, 62);
      L.check(35);
      L.bumper(39, 6); L.bumper(43, 5); L.bumper(47, 6);
      L.row(38, 9, 11);
      L.enemy('marble', 52, 10);
      L.spring(55); L.cloud(57, 4, 4); L.row(57, 3, 4);
      L.ground(65, 100);
      L.power('magnet', 67, 8);
      L.bumper(70, 9);
      L.block(73, 5, 2, 5); L.row(73, 4, 2);
      L.bumper(77, 9);
      L.lights(80, 6);
      L.enemy('marble', 88, 10);
      L.qblock(91, 6, 'star5');
      L.bumper(95, 7);
      L.mover(101, 8, 2, 1, 0, 3); L.row(100, 7, 4);
      L.ground(104, 136);
      L.check(106);
      L.bumper(110, 9); L.cloud(112, 5, 3); L.row(112, 3, 3); L.rainbow(113, 1);
      L.enemy('marble', 118, 10);
      L.bumper(122, 6); L.bumper(125, 6); L.bumper(128, 6);
      L.row(121, 9, 9);
      L.qblock(131, 6, 'star'); L.qblock(132, 6, 'rainbow'); L.qblock(133, 6, 'star');
      L.ground(139, 170);
      L.lights(142, 7);
      L.row(150, 9, 4);
      L.enemy('marble', 153, 10);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'upside', theme: 'upside', name: 'Країна догори дриґом', blurb: 'У фіолетових смугах усе падає вгору — ходи по стелі', w: 170,
    build(L) {
      L.ground(0, 25);
      L.sign(4, 'У фіолетовій смузі все падає вгору! Ходи по стелі, а дірки перестрибуй');
      L.row(8, 9, 3);
      L.enemy('snail', 13, 10);
      L.ceiling(19, 31, 2); L.ceiling(34, 49, 2);
      L.flip(21, 47);
      L.row(22, 2, 8); L.row(31, 5, 3); L.row(36, 2, 5);
      L.enemy('ghost', 42, 2);
      L.row(44, 3, 3);
      L.ground(43, 70);
      L.check(51);
      L.power('magnet', 54, 8);
      L.qblock(57, 6, 'star5');
      L.enemy('snail', 60, 10);
      L.ceiling(64, 72, 2); L.ceiling(72, 82, 3); L.ceiling(82, 98, 2);
      L.flip(66, 96);
      L.row(67, 2, 4); L.row(70, 5, 2); L.row(73, 3, 8); L.row(84, 2, 6);
      L.enemy('bird', 89, 2);
      L.ground(92, 122);
      L.check(100);
      L.qblock(105, 6, 'star'); L.qblock(106, 6, 'rainbow'); L.qblock(107, 6, 'star');
      L.row(110, 9, 4);
      L.enemy('frog', 115, 10);
      L.ceiling(118, 128, 2); L.ceiling(130, 152, 2);
      L.flip(120, 134); L.flip(138, 152);
      L.row(121, 2, 6); L.row(128, 5, 2); L.row(131, 2, 2);
      L.star(135, 3); L.star(136, 4); L.star(135, 5); L.star(136, 6); L.star(135, 7);
      L.ground(133, 139);
      L.row(140, 2, 6);
      L.enemy('ghost', 147, 2);
      L.ground(148, 170);
      L.row(154, 9, 3);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'nest', theme: 'nest', name: 'Гніздо Сороки', blurb: 'Битва із Сорокою Блискіткою', w: 172, boss: 'magpie',
    build(L) {
      L.ground(0, 24);
      L.sign(5, 'Гніздо Сороки Блискітки — на найвищому дереві. Вона забрала всі блискучі зірочки!');
      L.qblock(10, 6, 'star5');
      L.row(13, 9, 4);
      L.enemy('squirrel', 18, 10);
      L.kite(21, 46, 2);
      for (let i = 0; i < 10; i++) L.star(25 + i * 2, Math.round(5 - 2.4 * Math.sin(i * 0.7)));
      L.ground(44, 68);
      L.check(48);
      L.power('magnet', 51, 8);
      L.qblock(55, 6, 'shield');
      L.row(57, 9, 4);
      L.enemy('sparrow', 62, 5);
      L.ceiling(62, 90, 2);
      L.flip(64, 88);
      L.row(66, 2, 6); L.row(73, 5, 3); L.row(77, 2, 6);
      L.enemy('ghost', 82, 2);
      L.ground(84, 110);
      L.check(92);
      L.enemy('squirrel', 97, 10);
      L.spring(100); L.cloud(102, 4, 3); L.row(102, 3, 3);
      L.qblock(107, 6, 'star');
      L.ground(113, 172);
      L.row(114, 9, 4);
      L.sign(121, 'Сорока Блискітка! Стріляй, коли вона милується блискіткою');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(137, 6, 3); L.cloud(149, 6, 4); L.cloud(160, 6, 3);
      L.power('shield', 146, 9);
      L.gate(168);
    }
  },
];

const DECOR_UNDER = {
  upside: (R, x, y) => R() < 0.55 ? { k: 'hangflower', x, y, c: ['#ff7ab8', '#ffd23f', '#9fe0ff', '#c5a8ff'][Math.floor(R() * 4)] } : { k: 'hangvine', x, y },
};
const DECOR = {
  river: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'reed', x, y } : r < 0.65 ? { k: 'stump', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#ffd54a', '#ff9fd0'][Math.floor(R() * 3)] }; },
  kites: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'dandelion', x, y } : r < 0.65 ? { k: 'pinwheel', x, y } : { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#9fe0ff'][Math.floor(R() * 3)] }; },
  pinball: (R, x, y) => R() < 0.55 ? { k: 'bulb', x, y } : { k: 'arrowlamp', x, y },
  upside: (R, x, y) => R() < 0.6 ? { k: 'flower', x, y, c: ['#ff7ab8', '#ffd23f', '#9fe0ff', '#c5a8ff'][Math.floor(R() * 4)] } : { k: 'mush', x, y, c: ['#ff9fd9', '#b48cff', '#5fd3ff'][Math.floor(R() * 3)], glow: false },
  nest: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'feather', x, y } : r < 0.65 ? { k: 'leafpile', x, y } : { k: 'nestegg', x, y, c: ['#9fe0ff', '#ffffff', '#ffd6ea'][Math.floor(R() * 3)] }; },
  meadow: (R, x, y) => R() < 0.5 ? { k: 'lolli', x, y, c: RAINBOW[Math.floor(R() * 6)] } : { k: 'flower', x, y, c: ['#ff7ab8', '#ffffff', '#b28bff', '#ffd54a'][Math.floor(R() * 4)] },
  clouds: (R, x, y) => ({ k: 'twinkle', x, y }),
  forest: (R, x, y) => ({ k: 'mush', x, y, c: ['#ff6b8a', '#b48cff', '#5fd3ff'][Math.floor(R() * 3)], glow: R() < 0.5 }),
  ice: (R, x, y) => R() < 0.6 ? { k: 'pine', x, y } : { k: 'crystal', x, y },
  castle: (R, x, y) => ({ k: 'torch', x, y }),
  garden: (R, x, y) => R() < 0.5 ? { k: 'tulip', x, y, c: ['#ff5c8a', '#ffa83b', '#ffe14d', '#b28bff'][Math.floor(R() * 4)] } : { k: 'flower', x, y, c: ['#ffffff', '#ff7ab8', '#ffd54a'][Math.floor(R() * 3)] },
  lagoon: (R, x, y) => y >= 10 * T ? { k: 'weed', x, y } : (R() < 0.5 ? { k: 'shell', x, y, c: ['#ffb3c6', '#ffd9a8', '#fff3e0'][Math.floor(R() * 3)] } : { k: 'starfish', x, y }),
  volcano: (R, x, y) => R() < 0.6 ? { k: 'gumdrop', x, y, c: ['#ff7ab8', '#7fd6ff', '#ffe14d', '#9ff0c4'][Math.floor(R() * 4)] } : { k: 'lolli', x, y, c: RAINBOW[Math.floor(R() * 6)] },
  space: (R, x, y) => R() < 0.5 ? { k: 'crystal', x, y } : { k: 'rock', x, y },
  palace: (R, x, y) => ({ k: 'gem', x, y, c: ['#ffb3e6', '#a8d8ff', '#c9b6ff'][Math.floor(R() * 3)] }),
  autumn: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'leafpile', x, y } : r < 0.75 ? { k: 'mush', x, y, c: ['#ff6b8a', '#ffb347', '#e85d3a'][Math.floor(R() * 3)], glow: false } : { k: 'pumpkin', x, y }; },
  balloons: (R, x, y) => R() < 0.5 ? { k: 'tulip', x, y, c: ['#ff5c8a', '#ffa83b', '#ffe14d', '#b28bff'][Math.floor(R() * 4)] } : { k: 'flower', x, y, c: ['#ffffff', '#ff7ab8', '#ffd54a'][Math.floor(R() * 3)] },
  toys: (R, x, y) => R() < 0.5 ? { k: 'ball', x, y } : { k: 'duck', x, y },
  desert: (R, x, y) => R() < 0.5 ? { k: 'cactusS', x, y } : { k: 'tuft', x, y },
  cave: (R, x, y) => R() < 0.55 ? { k: 'mush', x, y, c: ['#5fd3ff', '#b48cff', '#ff9fd9'][Math.floor(R() * 3)], glow: true } : { k: 'crystal', x, y },
  portal: (R, x, y) => R() < 0.5 ? { k: 'tulip', x, y, c: ['#ff5cc8', '#b28bff', '#4cb6ff'][Math.floor(R() * 3)] } : { k: 'gem', x, y, c: ['#ffb3e6', '#a8d8ff', '#c9b6ff'][Math.floor(R() * 3)] },
  button: (R, x, y) => R() < 0.5 ? { k: 'flower', x, y, c: ['#ff7ab8', '#4cb6ff', '#ffd54a'][Math.floor(R() * 3)] } : { k: 'ball', x, y },
  maze: (R, x, y) => R() < 0.5 ? { k: 'tulip', x, y, c: ['#ff5c8a', '#ffa83b', '#ffe14d', '#b28bff'][Math.floor(R() * 4)] } : { k: 'flower', x, y, c: ['#ffffff', '#ff7ab8', '#ffd54a'][Math.floor(R() * 3)] },
  wizard: (R, x, y) => R() < 0.5 ? { k: 'gem', x, y, c: ['#ffb3e6', '#a8d8ff', '#c9b6ff'][Math.floor(R() * 3)] } : { k: 'torch', x, y },
  tower: (R, x, y) => R() < 0.5 ? { k: 'torch', x, y } : { k: 'gem', x, y, c: ['#ffb3e6', '#a8d8ff', '#c9b6ff'][Math.floor(R() * 3)] },
  jungle: (R, x, y) => R() < 0.55 ? { k: 'fern', x, y, c: ['#4fbf5a', '#3fa64f', '#6fd46a'][Math.floor(R() * 3)] } : { k: 'hibiscus', x, y, c: ['#ff5c7a', '#ff9a3d', '#ff7ab8', '#ffd23f'][Math.floor(R() * 4)] },
  bubbles: (R, x, y) => R() < 0.6 ? { k: 'flower', x, y, c: ['#ff9fd0', '#9fe0ff', '#ffffff', '#c5a8ff'][Math.floor(R() * 4)] } : { k: 'twinkle', x, y },
  bakery: (R, x, y) => R() < 0.55 ? { k: 'cupcake', x, y, c: ['#ffb3d6', '#b8e6ff', '#fff3a8', '#d6c4ff'][Math.floor(R() * 4)] } : { k: 'lolli', x, y, c: RAINBOW[Math.floor(R() * 6)] },
  pirate: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'anchor', x, y } : r < 0.6 ? { k: 'chest', x, y } : { k: 'shell', x, y, c: ['#ffb3c6', '#ffd9a8', '#fff3e0'][Math.floor(R() * 3)] }; },
  sea: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'weed', x, y } : r < 0.75 ? { k: 'shell', x, y, c: ['#ffb3c6', '#ffd9a8', '#fff3e0'][Math.floor(R() * 3)] } : { k: 'starfish', x, y }; },
  music: (R, x, y) => R() < 0.6 ? { k: 'noteS', x, y, c: ['#ff7ab8', '#7a5ad9', '#4cb6ff', '#ff9a3d'][Math.floor(R() * 4)] } : { k: 'flower', x, y, c: ['#ff7ab8', '#ffffff', '#ffd54a'][Math.floor(R() * 3)] },
  circus: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'flag', x, y, c: RAINBOW[Math.floor(R() * 6)] } : r < 0.7 ? { k: 'popcorn', x, y } : { k: 'ball', x, y }; },
  dino: (R, x, y) => R() < 0.6 ? { k: 'fern', x, y, c: ['#4fbf5a', '#3fa64f', '#6fd46a'][Math.floor(R() * 3)] } : { k: 'egg', x, y, c: ['#7fd46a', '#ff9fcb', '#4cb6ff', '#ffb347'][Math.floor(R() * 4)] },
  snow: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'pine', x, y } : r < 0.7 ? { k: 'snowmanS', x, y } : { k: 'lamp', x, y }; },
  beans: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'carrot', x, y } : r < 0.7 ? { k: 'cabbageS', x, y } : { k: 'sunflower', x, y }; },
  lantern: (R, x, y) => R() < 0.55 ? { k: 'firefly', x, y } : { k: 'mush', x, y, c: ['#5fd3ff', '#b48cff', '#ff9fd9'][Math.floor(R() * 3)], glow: true },
  rainbow: (R, x, y) => R() < 0.5 ? { k: 'twinkle', x, y } : { k: 'flower', x, y, c: ['#ff9fd0', '#ffd54a', '#9fe0ff', '#c5a8ff'][Math.floor(R() * 4)] },
  mine: (R, x, y) => R() < 0.5 ? { k: 'crystal', x, y } : { k: 'gem', x, y, c: ['#ffb3e6', '#a8d8ff', '#ffe9a8'][Math.floor(R() * 3)] },
  burrow: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'root', x, y } : r < 0.7 ? { k: 'carrot', x, y } : { k: 'mush', x, y, c: ['#ff9fd9', '#5fd3ff', '#ffb347'][Math.floor(R() * 3)], glow: true }; },
  peaks: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'pine', x, y } : r < 0.75 ? { k: 'edelweiss', x, y } : { k: 'rock', x, y }; },
  windmill: (R, x, y) => R() < 0.5 ? { k: 'wheat', x, y } : { k: 'tulip', x, y, c: ['#ff5c8a', '#ffa83b', '#ffe14d', '#b28bff'][Math.floor(R() * 4)] },
  tiny: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'dewdrop', x, y } : r < 0.7 ? { k: 'clover', x, y } : { k: 'mush', x, y, c: ['#ff6b8a', '#ffb347', '#b48cff'][Math.floor(R() * 3)], glow: false }; },
  swing: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'leafpile', x, y } : r < 0.7 ? { k: 'mush', x, y, c: ['#ff6b8a', '#ffb347', '#e85d3a'][Math.floor(R() * 3)], glow: false } : { k: 'flower', x, y, c: ['#ffffff', '#ff7ab8', '#ffd54a'][Math.floor(R() * 3)] }; },
  dream: (R, x, y) => R() < 0.5 ? { k: 'zzz', x, y } : { k: 'twinkle', x, y },
  tide: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'palmS', x, y } : r < 0.7 ? { k: 'shell', x, y, c: ['#ffb3c6', '#ffd9a8', '#fff3e0'][Math.floor(R() * 3)] } : { k: 'starfish', x, y }; },
  aurora: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'igloo', x, y } : r < 0.65 ? { k: 'pine', x, y } : { k: 'crystal', x, y }; },
  storm: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'puddle', x, y } : r < 0.7 ? { k: 'flower', x, y, c: ['#ffffff', '#9fe0ff', '#ffd54a'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  moon: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'rock', x, y } : r < 0.7 ? { k: 'crystal', x, y } : { k: 'antenna', x, y }; },
  station: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'antenna', x, y } : r < 0.7 ? { k: 'crate2', x, y } : { k: 'gearS', x, y, c: ['#ffb347', '#9fd8ff', '#ff9fcb'][Math.floor(R() * 3)] }; },
  factory: (R, x, y) => R() < 0.5 ? { k: 'gearS', x, y, c: ['#ffb347', '#9fd8ff', '#ff9fcb'][Math.floor(R() * 3)] } : { k: 'crate2', x, y },
};

function buildLevel(idx) {
  const def = LEVELS[idx], W = def.w, map = new Uint8Array(W * ROWS);
  const set = (x, y, v) => { if (x >= 0 && x < W && y >= 0 && y < ROWS) map[y * W + x] = v; };
  const L = { def, W, map, stars: [], powers: [], enemies: [], movers: [], checks: [], signs: [], springs: [], water: [], winds: [], belts: [], beltDir: new Int8Array(W * ROWS), qContent: new Map(), portals: [], buttons: [], keys: [], hasDoors: false, gate: null, arena: null, decor: [], vines: [], launchers: [], wheels: [], beans: [], lanterns: [], rails: [], zips: [], breezes: [], storms: [], lowgravs: [], kites: [], bumpers: [], lightSets: [], flips: [] };
  const later = [];
  const api = {
    ground(x0, x1, top) { top = top == null ? 10 : top; for (let x = x0; x < x1; x++) for (let y = top; y < ROWS; y++) set(x, y, 1); },
    block(x, y, w, h) { w = w || 1; h = h || 1; for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) set(x + i, y + j, 2); },
    cloud(x, y, w) { for (let i = 0; i < w; i++) set(x + i, y, 3); },
    star(x, y) { L.stars.push({ x: x * T + 12, y: y * T + 12, t: (x * 0.37) % 6 }); },
    row(x, y, n, step) { step = step || 1; for (let i = 0; i < n; i++) api.star(x + i * step, y); },
    arc(x, y, n, h) { h = h || 2; for (let i = 0; i < n; i++) { const k = n > 1 ? i / (n - 1) : 0.5; api.star(x + i, y - Math.sin(k * Math.PI) * h); } },
    rainbow(x, y) { L.stars.push({ x: x * T + 12, y: y * T + 12, rainbow: true, t: 0 }); },
    power(k, x, y) { L.powers.push({ k, x: x * T + 12, y: y * T + 12, t: x }); },
    enemy(k, x, y) { L.enemies.push({ k, tx: x, ty: y }); },
    mover(x, y, w, ax, ay, period) { L.movers.push({ bx: x * T, by: y * T, w: w * T, ax: ax * T, ay: ay * T, period }); },
    check(x) { later.push(() => L.checks.push({ x: x * T + 12, gy: groundY(x), on: false })); },
    sign(x, text) { later.push(() => L.signs.push({ x: x * T + 12, gy: groundY(x), text })); },
    gate(x) { later.push(() => { L.gate = { x: x * T + 12, gy: groundY(x) }; }); },
    arena(x0, x1) { L.arena = { x0: x0 * T, x1: x1 * T }; },
    spring(x) { later.push(() => L.springs.push({ x: x * T + 12, gy: groundY(x), sq: 0 })); },
    water(x0, x1, row) { L.water.push({ x0: x0 * T, x1: x1 * T, y: row * T + 6 }); },
    crumble(x, row, w) { L.movers.push({ crumble: true, bx: x * T, by: row * T, w: w * T, ax: 0, ay: 0, period: 1, state: 'idle', st: 0, vy: 0 }); },
    balloon(x) { later.push(() => L.movers.push({ balloon: true, bx: x * T, by: groundY(x) - 2, w: 2 * T, ax: 0, ay: 0, period: 1, state: 'wait', st: Math.random() * 0.8 })); },
    qblock(x, row, content) { set(x, row, 7); L.qContent.set(row * W + x, content || 'star'); },
    key(x, row) { L.keys.push({ x: x * T + 12, y: row * T + 12, got: false, t: x }); },
    door(x, top) { top = top == null ? 6 : top; for (let y = 0; y < top; y++) set(x, y, 2); for (let y = top; y < 10; y++) set(x, y, 11); L.hasDoors = true; },
    swblocks(x, row, w, color, h) { h = h || 1; for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) set(x + i, row + j, color === 'pink' ? 9 : 10); },
    button(x) { later.push(() => L.buttons.push({ x: x * T + 12, gy: groundY(x), pt: 0, down: false })); },
    portal(xa, xb, rowA, rowB) {
      later.push(() => {
        const i = L.portals.length, pair = i / 2;
        L.portals.push({ x: xa * T + 12, gy: rowA != null ? rowA * T : groundY(xa), to: i + 1, pair });
        L.portals.push({ x: xb * T + 12, gy: rowB != null ? rowB * T : groundY(xb), to: i, pair });
      });
    },
    vine(x, top) { later.push(() => L.vines.push({ x: x * T + 12, y0: top * T, y1: groundY(x) })); },
    bubble(x, row) { L.movers.push({ bubble: true, bx: x * T - 2, by: row * T, w: 28, ax: 0, ay: 0, period: 1, state: 'idle', st: 0 }); },
    jelly(x, row, w, h) { w = w || 1; h = h || 1; for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) set(x + i, row + j, 12); },
    wheel(cx, cy, r, n, period, w) {
      w = (w || 2) * T; const C = { cx: cx * T, cy: cy * T, r: r * T, n, period }; L.wheels.push(C);
      for (let i = 0; i < n; i++) { const ph = i * TAU / n; L.movers.push({ circ: true, cx: C.cx, cy: C.cy, r: C.r, ph, period, w, bx: C.cx + Math.cos(ph) * C.r - w / 2, by: C.cy + Math.sin(ph) * C.r, ax: 0, ay: 0 }); }
    },
    geyser(x0, x1, top, cyc, on) { later.push(() => L.winds.push({ x0: x0 * T, x1: x1 * T, y: top * T, y1: groundY(x0), cyc: cyc || 3.2, on: on || 1.5, ph: (x0 * 0.7) % 3 })); },
    tide(x0, x1, lowRow, highRow, period) { const lo = lowRow * T + 6, hi = highRow * T + 6; L.water.push({ x0: x0 * T, x1: x1 * T, y: lo, tide: { lo, hi, per: period || 8 } }); },
    storm(x) { later.push(() => L.storms.push({ x: x * T + 12, y: 40, gy: groundY(x), per: 3.4, ph: (x * 0.53) % 3.4, struck: false })); },
    lowgrav(x0, x1) { L.lowgravs.push({ x0: x0 * T, x1: x1 * T }); },
    river(x0, x1, row, flow) { L.water.push({ x0: x0 * T, x1: x1 * T, y: row * T + 6, flow: flow || 60 }); },
    logs(x0, x1, row, n, speed) { const span = (x1 - x0) * T; for (let i = 0; i < n; i++) L.movers.push({ log: true, bx: x0 * T + i * span / n, by: row * T - 2, w: 3 * T, h: 14, xStart: x0 * T, xEnd: x1 * T, v: speed || 50, state: 'float', st: 0, ph: i * 1.7, ax: 0, ay: 0, period: 1 }); },
    kite(x0, x1, top) { later.push(() => { const gy = groundY(x0); L.kites.push({ x0: x0 * T + 12, x1: x1 * T + 12, gy, yMin: (top == null ? 2 : top) * T, yMax: 7 * T, state: 'idle', st: 0, vy: 0, hx: x0 * T + 18, hy: gy - 24, kx: x0 * T + 48, ky: gy - 120 }); }); },
    bumper(x, row) { L.bumpers.push({ x: x * T + 12, y: row * T + 12, r: 14, hits: 0, cd: 0, glow: 0 }); },
    lights(x, n) { later.push(() => { const gy = groundY(x), lamps = []; for (let i = 0; i < n; i++) lamps.push({ x: (x + i) * T + 12, gy, on: false }); L.lightSets.push({ lamps }); }); },
    flip(x0, x1) { L.flips.push({ x0: x0 * T, x1: x1 * T }); },
    ceiling(x0, x1, rows) { L.hasCeil = true; for (let x = x0; x < x1; x++) for (let y = 0; y < (rows || 2); y++) set(x, y, 1); },
    zip(x0, x1, top0, top1) { const z = { x0: x0 * T + 12, y0: top0 * T - 34, x1: x1 * T + 12, y1: top1 * T - 46, gy0: top0 * T, gy1: top1 * T, state: 'idle', d: 0, v: 0 }; z.len = Math.hypot(z.x1 - z.x0, z.y1 - z.y0); z.hx = z.x0; z.hy = z.y0 + 8; L.zips.push(z); },
    breeze(x0, x1) { L.breezes.push({ x0: x0 * T, x1: x1 * T, p: 170 }); },
    swing(cx, cy, len, amp, period) { const px = cx * T + 12, py = cy * T, l = len * T, w = 2 * T; L.movers.push({ swing: true, px, py, len: l, amp, period, ph: 0, w, bx: px - w / 2, by: py + l, ax: 0, ay: 0 }); },
    sheep(x0, x1) { later.push(() => { const gy = groundY(x0); L.movers.push({ sheep: true, bx: x0 * T, by: gy - 34, w: 2 * T, minX: x0 * T, maxX: x1 * T, dir: 1, speed: 34, ax: 0, ay: 0, period: 1 }); }); },
    bean(x, h) { later.push(() => { const gy = groundY(x); L.beans.push({ x: x * T + 12, tx: x, gy, row: gy / T, h: h || 3, grown: false, t: 0, placed: 0 }); }); },
    lantern(x, row) { later.push(() => { const gy = groundY(x), hang = row != null; L.lanterns.push({ x: x * T + 12, y: hang ? row * T + 12 : gy - 22, gy, hang, lit: false, col: LANTERN_COLS[L.lanterns.length % LANTERN_COLS.length] }); }); },
    blink(x, row, w) { for (let i = 0; i < (w || 1); i++) set(x + i, row, 13); },
    cart(x0, x1) { later.push(() => { const gy = groundY(x0); L.movers.push({ cart: true, bx: x0 * T, by: gy, w: 2 * T, x1: x1 * T, ax: 0, ay: 0, period: 1, state: 'idle', st: 0, v: 0 }); L.rails.push({ x0: x0 * T, x1: x1 * T, y: gy }); }); },
    launcher(x) { later.push(() => L.launchers.push({ x: x * T + 12, gy: groundY(x), state: 'idle', st: 0 })); },
    belt(x, row, w, dir) { for (let i = 0; i < w; i++) { set(x + i, row, 5); L.beltDir[row * W + x + i] = dir; } L.belts.push({ x: x * T, y: row * T, w: w * T, dir }); },
    wind(x0, x1, top) {
      later.push(() => {
        let gr = -1; for (let y = top + 1; y < ROWS; y++) { const v = map[y * W + x0]; if (v === 1 || v === 2) { gr = y; break; } }
        L.winds.push({ x0: x0 * T, x1: x1 * T, y: top * T, y1: gr >= 0 ? gr * T : VIEW_H + 60, fanY: gr >= 0 ? null : VIEW_H - 10 });
      });
    },
  };
  const groundY = x => {
    let y = 0;
    if (L.hasCeil) while (y < ROWS && map[y * W + x] === 1) y++;   // стелю пропускаємо
    for (; y < ROWS; y++) { const v = map[y * W + x]; if (v === 1 || v === 2) return y * T; }
    return 10 * T;
  };
  def.build(api);
  later.forEach(f => f());
  const normal = L.stars.filter(s => !s.rainbow).length;
  L.total = normal;
  L.need = def.boss ? 0 : Math.max(5, Math.round(normal * (def.needK || 0.5)));
  const R = rng(idx * 1013 + 77), avoid = [...L.signs, ...L.checks, ...L.springs, ...L.buttons, ...L.portals, ...L.beans, ...L.lanterns, L.gate].filter(Boolean).map(o => o.x);
  for (let x = 1; x < W - 1; x++) {
    for (let y = 1; y < ROWS; y++) {
      if (map[y * W + x] === 1 && map[(y - 1) * W + x] === 0) {
        const px = x * T + 6 + R() * 12;
        if (R() < 0.24 && !avoid.some(a => Math.abs(a - px) < 40)) L.decor.push(DECOR[def.theme](R, px, y * T));
        break;
      }
    }
  }
  if (DECOR_UNDER[def.theme]) for (let x = 1; x < W - 1; x++) for (let y = 0; y < 6; y++) {
    if (map[y * W + x] === 1 && map[(y + 1) * W + x] === 0) { if (R() < 0.3) L.decor.push(DECOR_UNDER[def.theme](R, x * T + 6 + R() * 12, (y + 1) * T)); break; }
  }
  return L;
}
