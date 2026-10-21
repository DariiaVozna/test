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
      L.power('candy', 90, 8);
      L.enemy('hedgehog', 95, 10);
      L.arc(99, 8, 5, 2);
      L.ground(103, 172);
      L.enemy('cloud', 108, 7);
      L.enemy('cloud', 114, 5);
      L.row(110, 9, 4);
      L.enemy('hedgehog', 120, 10);
      L.power('magnet', 124, 8);
      L.sign(126, 'Попереду Король Похмурої Хмари!');
      L.check(129);
      L.block(131, 9, 1);
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
      L.power('magnet', 139, 10);
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
      L.power('magnet', 107, 8);
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
      L.power('magnet', 155, 8);
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
      L.arc(59, 8, 4, 2);
      L.ground(65, 100);
      L.check(67);
      L.enemy('bat', 73, 4); L.enemy('bat', 80, 4);
      L.row(75, 9, 5);
      L.spring(84);
      L.cloud(86, 4, 4); L.row(86, 3, 3); L.rainbow(89, 2);
      L.enemy('ufo', 92, 6);
      L.power('candy', 95, 8);
      L.ground(103, 172);
      L.enemy('cloud', 108, 7);
      L.enemy('hedgehog', 114, 10);
      L.row(110, 9, 4);
      L.power('magnet', 118, 8);
      L.sign(122, 'Пан Колючка! Стріляй, коли в нього паморочиться голова');
      L.check(126);
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
      L.power('magnet', 155, 8);
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
      L.power('magnet', 122, 8);
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
      L.power('magnet', 151, 8);
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
      L.power('magnet', 152, 8);
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
      L.crumble(65, 8, 2); L.crumble(68, 7, 2);
      L.row(65, 7, 2); L.row(68, 6, 2);
      L.ground(71, 100);
      L.check(73);
      L.belt(76, 10, 6, 1); L.row(76, 9, 6);
      L.enemy('mouse', 84, 10);
      L.balloon(88);
      L.cloud(91, 3, 4); L.row(91, 2, 3); L.rainbow(94, 1);
      L.power('candy', 96, 8);
      L.ground(103, 172);
      L.enemy('cloud', 109, 7);
      L.enemy('cactus', 114, 10);
      L.row(110, 9, 3); L.row(116, 9, 2);
      L.power('magnet', 118, 8);
      L.sign(122, 'Дракон Чхун! Стріляй, коли він сідає і чхає');
      L.check(126);
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
      L.qblock(137, 6, 'magnet');
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
      L.qblock(152, 6, 'magnet');
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
      L.qblock(151, 6, 'magnet');
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
      L.qblock(154, 6, 'magnet');
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
      L.qblock(84, 6, 'candy');
      L.enemy('frog', 88, 10);
      L.spring(91);
      L.cloud(93, 3, 4); L.row(93, 2, 3); L.rainbow(96, 1);
      L.ground(103, 172);
      L.enemy('beetle', 108, 10);
      L.qblock(112, 6, 'magnet');
      L.row(110, 9, 3);
      L.sign(121, 'Плутанко! Стріляй, коли він чаклує або сміється');
      L.check(125);
      L.arena(129, 172);
      L.cloud(137, 7, 3); L.cloud(149, 7, 4); L.cloud(160, 7, 3);
      L.power('shield', 146, 9);
      L.gate(168);
    }
  },
];

const DECOR = {
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
};

function buildLevel(idx) {
  const def = LEVELS[idx], W = def.w, map = new Uint8Array(W * ROWS);
  const set = (x, y, v) => { if (x >= 0 && x < W && y >= 0 && y < ROWS) map[y * W + x] = v; };
  const L = { def, W, map, stars: [], powers: [], enemies: [], movers: [], checks: [], signs: [], springs: [], water: [], winds: [], belts: [], beltDir: new Int8Array(W * ROWS), qContent: new Map(), portals: [], buttons: [], keys: [], hasDoors: false, gate: null, arena: null, decor: [] };
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
    belt(x, row, w, dir) { for (let i = 0; i < w; i++) { set(x + i, row, 5); L.beltDir[row * W + x + i] = dir; } L.belts.push({ x: x * T, y: row * T, w: w * T, dir }); },
    wind(x0, x1, top) {
      later.push(() => {
        let gr = -1; for (let y = top + 1; y < ROWS; y++) { const v = map[y * W + x0]; if (v === 1 || v === 2) { gr = y; break; } }
        L.winds.push({ x0: x0 * T, x1: x1 * T, y: top * T, y1: gr >= 0 ? gr * T : VIEW_H + 60, fanY: gr >= 0 ? null : VIEW_H - 10 });
      });
    },
  };
  const groundY = x => { for (let y = 0; y < ROWS; y++) { const v = map[y * W + x]; if (v === 1 || v === 2) return y * T; } return 10 * T; };
  def.build(api);
  later.forEach(f => f());
  const normal = L.stars.filter(s => !s.rainbow).length;
  L.total = normal;
  L.need = def.boss ? 0 : Math.max(5, Math.round(normal * (def.needK || 0.5)));
  const R = rng(idx * 1013 + 77), avoid = [...L.signs, ...L.checks, ...L.springs, ...L.buttons, ...L.portals, L.gate].filter(Boolean).map(o => o.x);
  for (let x = 1; x < W - 1; x++) {
    for (let y = 1; y < ROWS; y++) {
      if (map[y * W + x] === 1 && map[(y - 1) * W + x] === 0) {
        const px = x * T + 6 + R() * 12;
        if (R() < 0.24 && !avoid.some(a => Math.abs(a - px) < 40)) L.decor.push(DECOR[def.theme](R, px, y * T));
        break;
      }
    }
  }
  return L;
}
