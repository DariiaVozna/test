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
      L.sign(124, 'Попереду Король Похмурої Хмари!');
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
      L.ground(84, 112);
      L.check(92);
      L.enemy('squirrel', 97, 10);
      L.spring(100); L.cloud(102, 4, 3); L.row(102, 3, 3);
      L.qblock(107, 6, 'star');
      L.ground(115, 172);
      L.row(116, 9, 4);
      L.sign(121, 'Сорока Блискітка! Стріляй, коли вона милується блискіткою');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(137, 6, 3); L.cloud(149, 6, 4); L.cloud(160, 6, 3);
      L.power('shield', 146, 9);
      L.gate(168);
    }
  },
  {
    id: 'paint', theme: 'paint', name: 'Країна фарб', blurb: 'Відро фарби фарбує гриву, і стіна такого ж кольору пропускає', w: 170,
    build(L) {
      L.ground(0, 30);
      L.sign(4, 'Відро фарби фарбує гриву. Стіна такого самого кольору тебе пропустить!');
      L.row(7, 9, 3);
      L.bucket(11, 'red');
      L.pwall(16, 'red');
      L.row(18, 9, 4);
      L.enemy('blob', 25, 10);
      L.arc(29, 8, 5, 2);
      L.ground(33, 66);
      L.check(35);
      L.cloud(38, 6, 3); L.row(38, 5, 3);
      L.bucket(41, 'blue');
      L.pwall(45, 'blue');
      L.row(47, 9, 3);
      L.qblock(49, 6, 'star5');
      L.bucket(53, 'yellow'); L.bucket(56, 'red');
      L.pwall(60, 'red');
      L.row(62, 9, 3);
      L.arc(65, 8, 5, 2);
      L.ground(69, 104);
      L.check(71);
      L.power('magnet', 73, 8);
      L.bucket(76, 'yellow');
      L.pwall(80, 'yellow');
      L.block(82, 6, 4); L.row(82, 5, 4); L.row(82, 9, 4);
      L.pwall(87, 'yellow');
      L.enemy('blob', 90, 10);
      L.bucket(93, 'blue');
      L.pwall(97, 'blue');
      L.row(99, 9, 3); L.rainbow(100, 6);
      L.arc(103, 8, 5, 2);
      L.ground(107, 140);
      L.check(109);
      L.bucket(112, 'red'); L.pwall(115, 'red'); L.row(116, 9, 2);
      L.bucket(118, 'yellow'); L.pwall(121, 'yellow'); L.row(122, 9, 2);
      L.bucket(124, 'blue'); L.pwall(127, 'blue'); L.row(128, 9, 2);
      L.qblock(131, 6, 'star'); L.qblock(132, 6, 'rainbow'); L.qblock(133, 6, 'star');
      L.enemy('blob', 137, 10);
      L.arc(139, 8, 5, 2);
      L.ground(143, 170);
      L.row(146, 9, 4);
      L.enemy('blob', 152, 10);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'temple', theme: 'temple', name: 'Піщаний храм', blurb: 'Кам\'яні кубики котяться вперед, а кнопки відчиняють двері', w: 170,
    build(L) {
      L.ground(0, 30);
      L.sign(4, 'Кам\'яний кубик можна штовхати вперед. Підсунь його до високої стіни й вилізь!');
      L.row(7, 9, 2);
      L.stone(10);
      L.block(16, 5, 2, 5); L.row(16, 4, 2);
      L.row(19, 9, 3);
      L.enemy('snake', 24, 10);
      L.arc(29, 8, 5, 2);
      L.ground(33, 72);
      L.check(35);
      L.sign(38, 'Постав кубик на кнопку — і двері відчиняться');
      L.stone(41);
      L.plate(47, 0); L.tdoor(48, 0);
      L.row(50, 9, 4);
      L.qblock(53, 6, 'star5');
      L.enemy('snake', 57, 10);
      L.stone(60);
      L.block(66, 5, 2, 5); L.row(66, 4, 2); L.rainbow(67, 1);
      L.row(68, 9, 3);
      L.arc(71, 8, 5, 2);
      L.ground(75, 118);
      L.check(77);
      L.power('magnet', 79, 8);
      L.stone(82);
      L.qblock(85, 6, 'shield');
      L.enemy('snake', 88, 10);
      L.plate(93, 1); L.tdoor(94, 1);
      L.row(95, 9, 4);
      L.block(100, 7, 3); L.row(100, 6, 3);
      L.stone(104);
      L.block(110, 5, 2, 5); L.row(110, 4, 2);
      L.row(112, 9, 4);
      L.arc(117, 8, 5, 2);
      L.ground(121, 152);
      L.check(123);
      L.qblock(126, 6, 'star'); L.qblock(127, 6, 'rainbow'); L.qblock(128, 6, 'star');
      L.stone(131);
      L.plate(138, 2); L.tdoor(139, 2);
      L.row(141, 9, 4);
      L.enemy('snake', 146, 10);
      L.arc(151, 8, 5, 2);
      L.ground(155, 170);
      L.row(155, 9, 2);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'bay', theme: 'bay', name: 'Дельфінова бухта', blurb: 'Дельфіни катають на спинці, а кит підкидає фонтаном', w: 170, needK: 0.45,
    build(L) {
      L.ground(0, 16, 8);
      L.sign(4, 'Дельфінчик катає! Стань йому на спинку, а коли він стрибне — стрибай і ти');
      L.row(7, 6, 3);
      L.enemy('urchin', 12, 8);
      L.ground(16, 44, 11); L.water(16, 44, 8);
      L.dolphin(16, 44, 8);
      L.row(19, 5, 4); L.arc(25, 3, 6, 2); L.row(34, 5, 4);
      L.row(21, 10, 3); L.enemy('urchin', 29, 11); L.row(37, 10, 3);
      L.enemy('puffer', 32, 9);
      L.ground(44, 62, 8);
      L.check(46);
      L.power('magnet', 49, 6);
      L.qblock(52, 4, 'star5');
      L.enemy('crab', 56, 8);
      L.ground(62, 98, 11); L.water(62, 98, 8);
      L.whale(64, 8);
      L.star(65, 5); L.star(66, 3); L.rainbow(65, 1);
      L.dolphin(68, 98, 8);
      L.row(72, 5, 4); L.arc(79, 3, 6, 2); L.row(88, 5, 4);
      L.row(80, 10, 4);
      L.enemy('puffer', 76, 10); L.enemy('puffer', 90, 9);
      L.enemy('gull', 84, 3);
      L.ground(98, 128, 8);
      L.check(100);
      L.enemy('crab', 104, 8);
      L.qblock(107, 4, 'star'); L.qblock(108, 4, 'rainbow'); L.qblock(109, 4, 'star');
      L.enemy('urchin', 113, 8);
      L.cloud(116, 5, 3); L.row(116, 4, 3);
      L.enemy('crab', 122, 8);
      L.ground(128, 154, 11); L.water(128, 154, 8);
      L.whale(130, 8); L.star(131, 5); L.star(132, 3); L.rainbow(131, 1);
      L.dolphin(135, 154, 8);
      L.row(138, 5, 4); L.arc(145, 3, 5, 2);
      L.enemy('urchin', 141, 11);
      L.ground(154, 170, 8);
      L.row(155, 6, 3);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'quarry', theme: 'quarry', name: 'Каменоломня', blurb: 'Стрілки розганяють, а велика куля рогу розбиває тріснуті скелі', w: 170,
    build(L) {
      L.ground(0, 18);
      L.sign(4, 'Стань на стрілку — вона розжене, і ти перелетиш широку яму!');
      L.row(7, 9, 4);
      L.boost(16, 1);
      L.arc(18, 7, 8, 3);
      L.ground(26, 58);
      L.check(28);
      L.sign(31, 'Тріснута скеля! Затисни «Ріг», а потім відпусти — велика куля її розіб\'є');
      L.crack(36);
      L.row(38, 9, 4);
      L.enemy('car', 44, 10);
      L.qblock(47, 6, 'star5');
      L.row(50, 9, 3);
      L.boost(56, 1);
      L.arc(58, 7, 8, 3);
      L.ground(66, 104);
      L.check(68);
      L.power('magnet', 70, 8);
      L.crack(74); L.row(76, 9, 3); L.crack(80);
      L.enemy('car', 86, 10);
      L.block(89, 7, 3); L.row(89, 6, 3);
      L.row(95, 9, 4);
      L.boost(102, 1);
      L.arc(104, 7, 8, 3);
      L.ground(112, 144);
      L.check(114);
      L.qblock(117, 6, 'star'); L.qblock(118, 6, 'rainbow'); L.qblock(119, 6, 'star');
      L.crack(123);
      L.enemy('car', 129, 10);
      L.row(132, 9, 4);
      L.boost(142, 1);
      L.arc(144, 7, 7, 3);
      L.ground(151, 170);
      L.row(153, 9, 4);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'studio', theme: 'studio', name: 'Майстерня Хамелеона', blurb: 'Битва з Хамелеоном Барвиком', w: 172, boss: 'chameleon',
    build(L) {
      L.ground(0, 34);
      L.sign(5, 'Майстерня Хамелеона Барвика. Він знебарвив зірочки й сховався!');
      L.qblock(9, 6, 'star5');
      L.bucket(12, 'blue'); L.pwall(16, 'blue');
      L.row(18, 9, 3);
      L.stone(22); L.plate(29, 0); L.tdoor(30, 0);
      L.row(31, 9, 1);
      L.boost(32, 1);
      L.arc(34, 7, 8, 3);
      L.ground(42, 80);
      L.check(44);
      L.power('magnet', 46, 8);
      L.crack(50);
      L.row(52, 9, 3);
      L.enemy('blob', 57, 10);
      L.bucket(61, 'red'); L.pwall(65, 'red');
      L.row(67, 9, 3);
      L.qblock(70, 6, 'shield');
      L.enemy('car', 75, 10);
      L.arc(79, 8, 5, 2);
      L.ground(83, 172);
      L.check(85);
      L.stone(88); L.block(94, 5, 2, 5); L.row(94, 4, 2);
      L.row(97, 9, 4);
      L.enemy('snake', 104, 10);
      L.qblock(108, 6, 'star');
      L.row(112, 9, 4);
      L.sign(121, 'Хамелеон Барвик! Перестрибни язик і стріляй, поки язик прилип');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(137, 6, 3); L.cloud(149, 6, 4); L.cloud(160, 6, 3);
      L.power('shield', 146, 9);
      L.gate(168);
    }
  },
  {
    id: 'farm', theme: 'farm', name: 'Курячий хутір', blurb: 'Курчатка йдуть за тобою слідом — відведи їх у курник', w: 170,
    build(L) {
      L.ground(0, 34);
      L.sign(4, 'Курчатко загубилося! Підійди — і воно піде за тобою. Відведи курчат у курник');
      L.chick(9);
      L.row(12, 9, 4);
      L.block(18, 7, 3); L.row(18, 6, 3);
      L.cloud(24, 6, 3); L.chick(25, 6); L.star(24, 5); L.star(26, 5);
      L.enemy('goose', 29, 10);
      L.arc(34, 8, 4, 2);
      L.ground(38, 82);
      L.check(40);
      L.spring(45);
      L.block(48, 5, 3); L.chick(49, 5); L.row(48, 4, 3);
      L.qblock(55, 6, 'star5');
      L.enemy('goose', 60, 10);
      L.row(62, 9, 3);
      L.sign(66, 'Курник! Заведи туди курчат — кожне дасть 2 зірочки');
      L.coop(70);
      L.row(74, 9, 4);
      L.arc(82, 8, 4, 2);
      L.ground(86, 120);
      L.check(88);
      L.power('magnet', 90, 8);
      L.row(92, 9, 4);
      L.cloud(96, 6, 3); L.row(96, 5, 3);
      L.spring(101);
      L.cloud(103, 4, 4); L.chick(104, 4); L.row(103, 3, 4);
      L.enemy('goose', 110, 10);
      L.block(114, 8, 2, 2); L.row(114, 7, 2);
      L.arc(120, 8, 4, 2);
      L.ground(124, 170);
      L.check(126);
      L.enemy('goose', 130, 10);
      L.chick(134);
      L.qblock(137, 6, 'star'); L.qblock(138, 6, 'rainbow'); L.qblock(139, 6, 'star');
      L.enemy('goose', 142, 10);
      L.cloud(145, 6, 3); L.chick(146, 6); L.star(145, 5); L.star(147, 5);
      L.coop(152);
      L.row(155, 9, 3);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'fair', theme: 'fair', name: 'Ярмарок', blurb: 'Американські гірки над прірвою і тир із качечками', w: 172,
    build(L) {
      L.ground(0, 24);
      L.sign(4, 'Американські гірки! Стань у вагончик — і він повезе над прірвою');
      L.row(8, 9, 4);
      L.enemy('top', 15, 10);
      L.row(18, 9, 3);
      L.coaster([[24, 10.75], [27, 10.75], [31, 7], [35, 4.5], [39, 8.5], [43, 5], [47, 9], [50, 10.75], [53, 10.75]]);
      L.rainbow(36, 0.6);
      L.ground(53, 92);
      L.check(55);
      L.sign(58, 'Тир! Влуч у всі качечки — і отримаєш веселкову зірочку');
      L.ducks(62, 70, 9, 4);
      L.enemy('top', 74, 10);
      L.row(75, 9, 3);
      L.qblock(79, 6, 'star5');
      L.block(83, 7, 2); L.row(83, 6, 2);
      L.enemy('top', 88, 10);
      L.arc(92, 8, 4, 2);
      L.ground(96, 114);
      L.check(98);
      L.power('magnet', 100, 8);
      L.row(102, 9, 6);
      L.enemy('top', 109, 10);
      L.coaster([[114, 10.75], [117, 10.75], [121, 6], [125, 9], [129, 3.8], [134, 3.8], [138, 8.5], [141, 6], [145, 9.5], [148, 10.75], [151, 10.75]]);
      L.rainbow(132, 0.4);
      L.ground(151, 172);
      L.check(153);
      L.ducks(156, 163, 9, 4);
      L.gate(167);
    }
  },
  {
    id: 'pumpkin', theme: 'pumpkin', name: 'Гарбузова ніч', blurb: 'Гарбузи котяться через колючки, а привиди бояться погляду', w: 170,
    build(L) {
      L.ground(0, 42);
      L.sign(4, 'Колючки! Стрибни на гарбуз і котися на ньому — гарбузу колючки не страшні');
      L.row(7, 9, 2);
      L.pumpkin(11);
      L.thorns(15, 29);
      L.row(16, 7, 12);
      L.block(29, 8, 2, 2);
      L.enemy('boo', 22, 4);
      L.check(33);
      L.row(35, 9, 3);
      L.arc(42, 8, 4, 2);
      L.ground(46, 92);
      L.sign(47, 'Привид підкрадається, коли ти відвертаєшся. Подивись на нього — і він засоромиться');
      L.check(51);
      L.pumpkin(53);
      L.thorns(57, 69);
      L.row(58, 7, 2); L.row(63, 7, 2); L.row(67, 7, 2);
      L.cloud(60, 6, 3); L.row(60, 5, 3); L.cloud(65, 6, 2); L.row(65, 5, 2);
      L.block(69, 8, 2, 2);
      L.enemy('boo', 64, 3);
      L.qblock(74, 6, 'star5');
      L.enemy('boo', 79, 5);
      L.row(81, 9, 4);
      L.arc(92, 8, 4, 2);
      L.ground(96, 142);
      L.check(98);
      L.power('magnet', 100, 8);
      L.row(102, 9, 3);
      L.pumpkin(107);
      L.thorns(111, 127);
      L.row(112, 7, 15);
      L.enemy('boo', 116, 5); L.enemy('boo', 124, 4);
      L.block(127, 8, 2, 2);
      L.qblock(131, 6, 'star'); L.qblock(132, 6, 'rainbow'); L.qblock(133, 6, 'star');
      L.enemy('boo', 137, 6);
      L.arc(142, 8, 4, 2);
      L.ground(146, 170);
      L.row(148, 9, 4);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'bricks', theme: 'bricks', name: 'Кубикове місто', blurb: 'Гриб-велетень робить єдиноріжку великою, і вона ламає стіни з кубиків', w: 170,
    build(L) {
      L.ground(0, 40);
      L.sign(4, 'Гриб-велетень! Візьми його — станеш великою й проламаєш стіни з кубиків');
      L.power('big', 9, 9);
      L.bricks(14, 3, 7, 2);
      L.row(17, 9, 2);
      L.bricks(20, 5, 5); L.bricks(21, 5, 1, 4); L.bricks(25, 5, 5); L.row(21, 8, 4);
      L.enemy('soldier', 30, 10);
      L.qblock(33, 6, 'star5');
      L.row(35, 9, 3);
      L.arc(40, 8, 4, 2);
      L.ground(44, 96);
      L.check(46);
      L.enemy('mouse', 50, 10);
      L.power('big', 53, 9);
      L.bricks(57, 0, 10);
      L.bricks(60, 4, 6); L.bricks(61, 4, 1, 4); L.bricks(65, 4, 6); L.row(61, 8, 4); L.rainbow(63, 5);
      L.enemy('soldier', 70, 10);
      L.row(72, 9, 3);
      L.block(76, 7, 2); L.row(76, 6, 2);
      L.enemy('top', 81, 10);
      L.power('magnet', 85, 8);
      L.row(87, 9, 6); L.arc(88, 6, 4, 1);
      L.arc(96, 8, 4, 2);
      L.ground(100, 170);
      L.check(102);
      L.power('big', 106, 9);
      L.bricks(110, 2, 8, 2);
      L.enemy('soldier', 115, 10); L.enemy('mouse', 118, 10);
      L.bricks(121, 6, 1, 6); L.row(121, 5, 6);
      L.bricks(130, 0, 10);
      L.qblock(134, 6, 'star'); L.qblock(135, 6, 'rainbow'); L.qblock(136, 6, 'star');
      L.enemy('top', 139, 10);
      L.power('big', 141, 9);
      L.bricks(144, 5, 5); L.bricks(145, 5, 1, 4); L.bricks(149, 5, 5); L.row(145, 8, 4);
      L.row(152, 9, 3);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'attic', theme: 'attic', name: 'Котяче горище', blurb: 'Битва з Котом Мурком', w: 172, boss: 'cat',
    build(L) {
      L.ground(0, 40);
      L.sign(5, 'Котяче горище! Кіт Мурко затягнув сюди всі зірочки');
      L.qblock(9, 6, 'star5');
      L.pumpkin(12);
      L.thorns(16, 28);
      L.row(17, 7, 10);
      L.block(28, 8, 2, 2);
      L.enemy('mouse', 33, 10);
      L.row(34, 9, 3);
      L.arc(40, 8, 4, 2);
      L.ground(44, 84);
      L.check(46);
      L.power('big', 50, 9);
      L.bricks(54, 2, 8, 2);
      L.enemy('mouse', 58, 10);
      L.bricks(61, 5, 5); L.bricks(62, 5, 1, 3); L.bricks(65, 5, 5); L.row(62, 8, 3);
      L.qblock(70, 6, 'shield');
      L.enemy('top', 75, 10);
      L.row(77, 9, 3);
      L.arc(84, 8, 4, 2);
      L.ground(88, 172);
      L.check(90);
      L.power('magnet', 92, 8);
      L.row(95, 9, 5);
      L.cloud(100, 6, 3); L.row(100, 5, 3);
      L.enemy('mouse', 106, 10);
      L.qblock(110, 6, 'star');
      L.row(113, 9, 4);
      L.sign(121, 'Кіт Мурко! Тікай від стрибків і стріляй, коли він умивається');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(136, 6, 3); L.cloud(147, 6, 4); L.cloud(159, 6, 3);
      L.power('shield', 152, 9);
      L.gate(168);
    }
  },
  {
    id: 'savanna', theme: 'savanna', name: 'Савана кенгуру', blurb: 'Кенгуру Скок катає верхи й стрибає вище за стіни', w: 170,
    build(L) {
      L.ground(0, 30);
      L.sign(3, 'Кенгуру Скок! Підійди — і поскачеш верхи. Тримай «Стрибок» — і стрибнеш дуже високо');
      L.roo(8);
      L.row(11, 9, 3);
      L.block(16, 5, 2, 5); L.row(16, 4, 2);
      L.row(19, 9, 3);
      L.enemy('echidna', 22, 10); L.enemy('echidna', 25, 10);
      L.cloud(23, 4, 3); L.row(23, 3, 3);
      L.arc(30, 7, 6, 3);
      L.ground(36, 70);
      L.check(39);
      L.roo(42);
      L.qblock(46, 6, 'star5');
      L.block(50, 5, 2, 5); L.rainbow(50, 3);
      L.row(53, 9, 3);
      L.enemy('echidna', 57, 10); L.enemy('echidna', 60, 10);
      L.block(62, 4, 3); L.row(62, 3, 3);
      L.arc(70, 7, 6, 3);
      L.ground(76, 112);
      L.check(79);
      L.power('magnet', 81, 8);
      L.row(83, 9, 6);
      L.cloud(86, 4, 4); L.row(86, 3, 4);
      L.roo(91);
      L.block(95, 5, 2, 5); L.row(95, 4, 2);
      L.enemy('echidna', 99, 10); L.enemy('echidna', 102, 10); L.enemy('echidna', 105, 10);
      L.row(100, 7, 5);
      L.arc(112, 7, 6, 3);
      L.ground(118, 170);
      L.check(121);
      L.qblock(124, 6, 'star'); L.qblock(125, 6, 'rainbow'); L.qblock(126, 6, 'star');
      L.roo(129);
      L.block(133, 5, 2, 5); L.row(133, 4, 2);
      L.enemy('bird', 141, 5);
      L.enemy('echidna', 139, 10); L.enemy('echidna', 143, 10);
      L.cloud(146, 4, 3); L.row(146, 3, 3);
      L.row(151, 9, 4);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'seasonS', theme: 'seasonS', seasons: true, name: 'Долина пір року', blurb: 'Тотем перемикає літо й зиму: то квіти-місточки, то лід і сніг', w: 170,
    build(L) {
      L.ground(0, 22);
      L.sign(3, 'Влітку з квітів виростає місточок. Іди по ньому!');
      L.row(8, 9, 4);
      L.flowers(22, 34, 9); L.row(23, 7, 10);
      L.ground(34, 50);
      L.check(36);
      L.sign(38, 'Тотем пір року! Застрибни на нього згори — і настане зима');
      L.totem(42, 'winter');
      L.snow(45, 46, 9); L.snow(46, 47, 8); L.snow(47, 48, 7); L.snow(48, 49, 6);
      L.block(49, 4, 2, 6); L.row(49, 3, 2);
      L.ground(51, 53, 8);
      L.sign(52, 'Влітку лід розтане, і під водою знайдуться зірочки');
      L.lake(53, 67, 8); L.ground(53, 67, 11);
      L.row(55, 10, 4); L.row(62, 10, 4); L.row(56, 6, 9);
      L.enemy('puffer', 60, 10);
      L.ground(67, 72, 8);
      L.totem(70, 'summer');
      L.flowers(72, 86, 9); L.row(73, 7, 12);
      L.ground(86, 124);
      L.check(88);
      L.power('magnet', 90, 8);
      L.row(92, 9, 5);
      L.totem(98, 'winter');
      L.snow(101, 102, 9); L.snow(102, 103, 8); L.snow(103, 104, 7); L.snow(104, 105, 6); L.snow(105, 106, 5);
      L.cloud(106, 4, 4); L.row(106, 3, 4); L.rainbow(108, 1);
      L.enemy('penguin', 114, 10);
      L.row(116, 9, 4);
      L.snow(124, 136, 9); L.row(125, 7, 10);
      L.ground(136, 150);
      L.check(138);
      L.qblock(141, 6, 'star'); L.qblock(142, 6, 'rainbow'); L.qblock(143, 6, 'star');
      L.totem(146, 'summer');
      L.flowers(150, 158, 9); L.row(151, 7, 6);
      L.ground(158, 170);
      L.gate(164);
    }
  },
  {
    id: 'rings', theme: 'rings', name: 'Острів тарзанок', blurb: 'Хапайся за кільця, розгойдуйся й перелітай через затоки', w: 172,
    build(L) {
      L.ground(0, 20);
      L.sign(3, 'Кільце! Застрибни й ухопися. Розгойдуйся вліво-вправо, а «Стрибок» — відпустити');
      L.row(8, 9, 4);
      L.ring(22, 2); L.ring(27, 2); L.ring(32, 2); L.ring(37, 2);
      L.row(24, 5, 2); L.row(29, 5, 2); L.row(34, 5, 2);
      L.ground(41, 70);
      L.check(43);
      L.enemy('monkey', 48, 10);
      L.qblock(52, 6, 'star5');
      L.ring(57, 1, 3); L.cloud(60, 4, 4); L.row(60, 3, 4);
      L.enemy('crab', 65, 10);
      L.ring(72, 2); L.ring(77, 2); L.ring(82, 2); L.ring(87, 2);
      L.row(74, 5, 2); L.row(79, 5, 2); L.row(84, 5, 2);
      L.ground(91, 128);
      L.check(93);
      L.power('magnet', 95, 8);
      L.row(97, 9, 6);
      L.enemy('monkey', 104, 10);
      L.block(108, 7, 3); L.row(108, 6, 3);
      L.enemy('crab', 114, 10);
      L.qblock(118, 6, 'star'); L.qblock(119, 6, 'rainbow'); L.qblock(120, 6, 'star');
      L.ring(130, 2); L.ring(135, 2); L.ring(140, 2); L.ring(145, 2);
      L.row(132, 5, 2); L.rainbow(137, 2); L.row(142, 5, 2);
      L.ground(149, 172);
      L.row(152, 9, 4);
      L.sign(159, 'Ворота вже близько!');
      L.gate(166);
    }
  },
  {
    id: 'board', theme: 'board', name: 'Країна настільних ігор', blurb: 'Доміно лягає містком, а з літер складається твоє ім\'я', w: 170,
    build(L) {
      L.ground(0, 21);
      L.sign(3, 'Доміно! Штовхни або вистріли — воно впаде й ляже містком. А ще збирай літери свого імені');
      L.row(10, 9, 3);
      L.dominoes(20, 4); L.row(22, 7, 9);
      L.ground(32, 57);
      L.check(34);
      L.enemy('knight', 40, 10);
      L.block(43, 7, 3);
      L.qblock(48, 6, 'star5');
      L.enemy('knight', 52, 10);
      L.dominoes(56, 3); L.row(58, 7, 6);
      L.ground(65, 100);
      L.check(67);
      L.power('magnet', 69, 8);
      L.row(71, 9, 5);
      L.cloud(78, 6, 3);
      L.enemy('knight', 84, 10);
      L.row(86, 9, 3);
      L.dominoes(99, 5); L.row(101, 7, 12);
      L.ground(114, 139);
      L.check(116);
      L.qblock(120, 6, 'star'); L.qblock(121, 6, 'rainbow'); L.qblock(122, 6, 'star');
      L.enemy('knight', 126, 10);
      L.block(129, 7, 3);
      L.dominoes(138, 3); L.row(140, 7, 6);
      L.ground(147, 170);
      L.cloud(155, 6, 3);
      L.letters([[8, 8], [16, 8], [36, 8], [44, 6], [51, 8], [68, 8], [75, 8], [79, 5], [90, 8], [118, 8], [130, 6], [150, 8], [156, 5], [160, 8]]);
      L.sign(159, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'dicecastle', theme: 'dicecastle', name: 'Замок Кубика', blurb: 'Битва з Кубиком Кидайлом', w: 172, boss: 'dice',
    build(L) {
      L.ground(0, 26);
      L.sign(5, 'Замок Кубика Кидайла! Він виграв усі зірочки в настільну гру');
      L.roo(9);
      L.block(15, 5, 2, 5); L.row(15, 4, 2);
      L.enemy('echidna', 19, 10); L.enemy('echidna', 22, 10);
      L.arc(26, 7, 6, 3);
      L.ground(32, 50);
      L.check(35);
      L.qblock(40, 6, 'star5');
      L.enemy('knight', 45, 10);
      L.rooStop(46);
      L.ring(52, 2); L.ring(57, 2); L.ring(62, 2);
      L.row(54, 5, 2); L.row(59, 5, 2);
      L.ground(66, 85);
      L.check(68);
      L.qblock(72, 6, 'shield');
      L.enemy('knight', 77, 10);
      L.dominoes(84, 3); L.row(86, 7, 6);
      L.ground(93, 172);
      L.check(95);
      L.power('magnet', 97, 8);
      L.row(99, 9, 5);
      L.cloud(104, 6, 3); L.row(104, 5, 3);
      L.enemy('echidna', 110, 10);
      L.qblock(114, 6, 'star');
      L.sign(121, 'Кубик Кидайло! Стріляй, коли випаде 1 або 2 — тоді він запаморочиться');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(136, 6, 3); L.cloud(147, 6, 4); L.cloud(159, 6, 3);
      L.power('shield', 152, 9);
      L.gate(168);
    }
  },
  {
    id: 'hive', theme: 'hive', name: 'Медовий вулик', blurb: 'До медових стін прилипаєш і відштовхуєшся вгору', w: 170,
    build(L) {
      L.ground(0, 34);
      L.sign(3, 'Медові стіни липкі! Стрибни до стіни — прилипнеш, а «Стрибок» відштовхне вгору');
      L.row(7, 9, 4);
      L.honey(14, 1, 7); L.honey(17, 3, 7);
      L.star(15, 7); L.star(16, 5); L.star(15, 3); L.star(17, 2); L.star(18, 2);
      L.row(20, 9, 3);
      L.enemy('bee', 24, 6);
      L.check(27);
      L.row(29, 9, 3);
      L.arc(34, 8, 4, 2);
      L.ground(38, 80);
      L.check(40);
      L.honey(44, 0, 8); L.honey(47, 2, 8);
      L.star(45, 7); L.star(46, 5); L.star(45, 3); L.star(46, 1); L.rainbow(47, 1);
      L.row(50, 9, 4);
      L.enemy('bee', 54, 6);
      L.qblock(58, 6, 'star5');
      L.honey(63, 5, 5); L.row(63, 4, 1);
      L.row(66, 9, 3);
      L.enemy('bee', 72, 5);
      L.row(74, 9, 3);
      L.arc(80, 8, 4, 2);
      L.ground(84, 130);
      L.check(86);
      L.power('magnet', 88, 8);
      L.row(90, 9, 5);
      L.honey(98, 0, 8); L.honey(101, 1, 9);
      L.star(99, 7); L.star(100, 5); L.star(99, 3); L.star(100, 1); L.row(101, 0, 2);
      L.enemy('bee', 106, 5);
      L.row(105, 9, 4);
      L.qblock(112, 6, 'star'); L.qblock(113, 6, 'rainbow'); L.qblock(114, 6, 'star');
      L.enemy('bee', 120, 6);
      L.row(122, 9, 4);
      L.arc(130, 8, 4, 2);
      L.ground(134, 170);
      L.check(136);
      L.honey(140, 1, 7); L.honey(143, 3, 7);
      L.star(141, 7); L.star(142, 5); L.star(141, 3); L.star(143, 2); L.star(144, 2);
      L.row(147, 9, 4);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'crystal', theme: 'crystal', name: 'Кришталева ущелина', blurb: 'Постріл у кристал запалює світловий міст над прірвою', w: 170,
    build(L) {
      L.ground(0, 18);
      L.sign(3, 'Вистріли в кристал — і над прірвою засяє світловий міст. Біжи, поки не згас!');
      L.row(7, 9, 3);
      L.crystal(15, 9, [[18, 30, 10]]);
      L.row(19, 8, 10);
      L.ground(30, 61);
      L.check(32);
      L.enemy('bat', 36, 3);
      L.crystal(39, 9, [[41, 43, 8], [43, 45, 6], [45, 47, 4]], 8);
      L.block(47, 4, 3); L.row(47, 3, 2); L.rainbow(49, 2);
      L.qblock(54, 6, 'star5');
      L.sign(57, 'Кристал на тому боці! Вистріли через прірву');
      L.crystal(70, 9, [[61, 70, 10]]);
      L.row(62, 8, 7);
      L.ground(70, 92);
      L.check(72);
      L.power('magnet', 74, 8);
      L.row(76, 9, 6);
      L.enemy('bat', 84, 3);
      L.crystal(89, 9, [[92, 112, 10]], 8);
      L.row(93, 8, 18);
      L.enemy('bat', 100, 4); L.enemy('bat', 107, 4);
      L.ground(112, 122);
      L.check(114);
      L.qblock(117, 6, 'star'); L.qblock(118, 6, 'rainbow'); L.qblock(119, 6, 'star');
      L.crystal(121, 9, [[122, 132, 10]]);
      L.ground(132, 134);
      L.crystal(133, 9, [[134, 144, 10]]);
      L.row(123, 8, 8); L.row(135, 8, 8);
      L.ground(144, 170);
      L.row(147, 9, 4);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'laundry', theme: 'laundry', name: 'Небесна пральня', blurb: 'Кошики на мотузках: один опускається, а другий піднімається', w: 172,
    build(L) {
      L.ground(0, 20);
      L.sign(3, 'Кошики на мотузках: станеш на один — він опуститься, а сусідній підніметься');
      L.row(8, 9, 4);
      L.pulley(22, 28, 2, 9, 9);
      L.row(22, 7, 3); L.row(28, 7, 3); L.arc(25, 6, 3, 1);
      L.ground(34, 62);
      L.check(36);
      L.enemy('sock', 42, 6);
      L.qblock(46, 6, 'star5');
      L.pulley(50, 55, 1, 9, 5);
      L.cloud(60, 2, 4); L.row(60, 1, 4);
      L.row(51, 7, 2);
      L.pulley(64, 70, 2, 9, 9);
      L.row(64, 7, 3); L.row(70, 7, 3);
      L.ground(76, 110);
      L.check(78);
      L.power('magnet', 80, 8);
      L.row(82, 9, 6);
      L.enemy('sock', 90, 5); L.enemy('sock', 97, 7);
      L.row(99, 9, 4);
      L.pulley(112, 118, 1, 9, 9);
      L.row(112, 7, 3); L.row(118, 7, 3); L.rainbow(116, 3);
      L.ground(124, 172);
      L.check(126);
      L.qblock(130, 6, 'star'); L.qblock(131, 6, 'rainbow'); L.qblock(132, 6, 'star');
      L.enemy('sock', 137, 6);
      L.cloud(141, 6, 3); L.row(141, 5, 3);
      L.row(150, 9, 4);
      L.sign(158, 'Ворота вже близько!');
      L.gate(166);
    }
  },
  {
    id: 'clocktower', theme: 'clocktower', name: 'Годинникова вежа', blurb: 'Маятники гойдаються, а пісочний годинник зупиняє час', w: 170,
    build(L) {
      L.ground(0, 33);
      L.sign(3, 'Маятники гойдаються — пробігай, коли маятник далеко. А пісочний годинник зупиняє час!');
      L.power('hourglass', 9, 9);
      L.row(12, 9, 2);
      L.pendulum(16, 0, 9.2, 0.9, 2.4); L.pendulum(22, 0, 9.2, 0.9, 2.4, 1.6);
      L.row(15, 9, 3); L.row(21, 9, 3);
      L.enemy('cuckoo', 28, 10);
      L.wheel(38, 6, 2.5, 3, 7);
      L.ground(43, 80);
      L.check(45);
      L.qblock(48, 6, 'star5');
      L.power('hourglass', 52, 9);
      L.pendulum(57, 0, 9.2, 1, 2.0); L.pendulum(62, 0, 9.2, 1, 2.0, 1); L.pendulum(67, 0, 9.2, 1, 2.0, 2);
      L.row(56, 9, 14);
      L.enemy('cuckoo', 74, 10);
      L.wheel(86, 6, 3, 4, 8);
      L.ground(92, 130);
      L.check(94);
      L.power('magnet', 96, 8);
      L.row(98, 9, 6);
      L.enemy('cuckoo', 106, 10); L.enemy('cuckoo', 112, 10);
      L.block(116, 7, 3); L.row(116, 6, 3);
      L.power('hourglass', 121, 9);
      L.pendulum(125, 0, 9.2, 0.9, 2.2);
      L.row(124, 9, 3);
      L.wheel(135, 6, 2.5, 3, 6);
      L.ground(140, 170);
      L.qblock(143, 6, 'star'); L.qblock(144, 6, 'rainbow'); L.qblock(145, 6, 'star');
      L.pendulum(151, 0, 9.2, 0.9, 2.4);
      L.row(149, 9, 5);
      L.sign(158, 'Ворота вже близько!');
      L.gate(164);
    }
  },
  {
    id: 'apiary', theme: 'apiary', name: 'Пасіка Бурмила', blurb: 'Битва з Ведмедем Бурмилом', w: 172, boss: 'bear',
    build(L) {
      L.ground(0, 26);
      L.sign(5, 'Пасіка Бурмила! Ведмідь забрав мед і зірочки');
      L.honey(12, 1, 7); L.honey(15, 3, 7);
      L.star(13, 7); L.star(14, 5); L.star(13, 3); L.star(15, 2);
      L.crystal(23, 9, [[26, 36, 10]]);
      L.row(27, 8, 8);
      L.ground(36, 60);
      L.check(38);
      L.power('hourglass', 41, 9);
      L.pendulum(46, 0, 9.2, 0.9, 2.4); L.pendulum(52, 0, 9.2, 0.9, 2.4, 1.4);
      L.row(45, 9, 10);
      L.pulley(62, 68, 2, 9, 9);
      L.row(62, 7, 3); L.row(68, 7, 3);
      L.ground(74, 172);
      L.check(76);
      L.qblock(80, 6, 'shield');
      L.enemy('bee', 86, 6);
      L.power('magnet', 92, 8);
      L.row(95, 9, 5);
      L.cloud(100, 6, 3); L.row(100, 5, 3);
      L.enemy('bee', 108, 5);
      L.qblock(112, 6, 'star');
      L.sign(119, 'Ведмідь Бурмило! Тікай від тіней і калюж меду, а стріляй, коли він їсть мед');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(136, 6, 3); L.cloud(147, 6, 4); L.cloud(159, 6, 3);
      L.power('shield', 152, 9);
      L.gate(168);
    }
  },
  {
    id: 'soaplake', theme: 'soaplake', name: 'Мильне озеро', blurb: 'Велика бульбашка піднімає вгору, а «Стрибок» її лопає', w: 170,
    build(L) {
      L.ground(0, 30, 8);
      L.sign(3, 'Торкнись великої бульбашки — вона понесе вгору. Кнопками керуй, а «Стрибок» лопне бульбашку');
      L.row(6, 7, 3);
      L.soap(10, 7, 15);
      L.block(14, 3, 3, 5);
      L.star(13, 5); L.star(13, 3); L.star(13, 1); L.row(14, 2, 3);
      L.enemy('crayfish', 21, 8);
      L.check(24);
      L.row(26, 7, 3);
      L.soap(28, 7, 48);
      L.ground(30, 46, 11); L.water(30, 46, 8);
      L.star(31, 6); L.star(33, 5); L.star(35, 3); L.star(37, 2); L.row(39, 1, 7);
      L.row(33, 10, 4);
      L.enemy('fish', 39, 10);
      L.ground(46, 52, 3);
      L.row(47, 2, 4);
      L.ground(52, 100, 8);
      L.check(54);
      L.power('magnet', 58, 6);
      L.row(60, 7, 4);
      for (let r = 1; r < 6; r++) { L.thorns(66, 67, r); L.thorns(71, 72, r); }
      L.soap(69, 7);
      L.star(68, 5); L.star(69, 3); L.rainbow(69, 1);
      L.enemy('crayfish', 76, 8);
      L.row(78, 7, 3);
      L.soap(82, 7, 86);
      L.cloud(84, 3, 4); L.row(84, 2, 4);
      L.qblock(92, 4, 'star5');
      L.check(96);
      L.soap(99, 7, 121);
      L.ground(100, 120, 11); L.water(100, 120, 8);
      L.star(101, 6); L.star(103, 5); L.star(105, 4); L.star(107, 3); L.row(109, 1, 10);
      L.row(104, 10, 5); L.row(112, 10, 4);
      L.enemy('fish', 109, 10);
      L.ground(120, 170, 8);
      L.check(122);
      L.qblock(126, 4, 'star'); L.qblock(127, 4, 'rainbow'); L.qblock(128, 4, 'star');
      L.soap(131, 7, 135);
      L.block(134, 3, 2, 5);
      L.star(133, 5); L.star(133, 3); L.row(134, 2, 2);
      L.enemy('crayfish', 145, 8);
      L.row(148, 7, 4);
      L.sign(156, 'Ворота вже близько!');
      L.gate(162);
    }
  },
  {
    id: 'nutgrove', theme: 'nutgrove', name: 'Горіховий гай', blurb: 'Біжиш у колесі білочки — і висуваються містки', w: 170,
    build(L) {
      L.ground(0, 16);
      L.sign(3, 'Біжи в колесі білочки — висунеться місток. Коли він готовий, біжи по ньому!');
      L.row(6, 9, 3);
      L.nutwheel(12, [[16, 28, 10]]);
      L.arc(17, 8, 10, 2);
      L.ground(28, 56);
      L.enemy('squirrel', 34, 10);
      L.check(36);
      L.qblock(40, 6, 'star5');
      L.nutwheel(44, [['gate', 49, 2, 8]]);
      L.block(49, 0, 1, 2);
      L.row(50, 9, 4);
      L.ground(58, 64);
      L.row(56, 8, 2);
      L.nutwheel(60, [[64, 67, 9], [67, 70, 7], [70, 73, 5]]);
      L.star(65, 8); L.star(68, 6); L.star(71, 4);
      L.ground(73, 88, 5);
      L.row(75, 4, 5);
      L.ground(88, 103);
      L.check(90);
      L.power('magnet', 93, 8);
      L.row(95, 9, 5);
      L.nutwheel(99, [[103, 114, 10]]);
      L.thorns(103, 114, 11);
      L.row(104, 8, 9);
      L.ground(114, 140);
      L.enemy('squirrel', 119, 10); L.enemy('hedgehog', 124, 10);
      L.check(126);
      L.qblock(130, 6, 'star'); L.qblock(131, 6, 'rainbow'); L.qblock(132, 6, 'star');
      L.nutwheel(136, [[140, 150, 10]]);
      L.arc(141, 7, 9, 2);
      L.ground(150, 170);
      L.row(152, 9, 3);
      L.sign(156, 'Ворота вже близько!');
      L.gate(163);
    }
  },
  {
    id: 'seafort', theme: 'seafort', name: 'Морський форт', blurb: 'Гармата гойдається, а пунктир показує, куди полетиш', w: 170,
    build(L) {
      L.ground(0, 14);
      L.sign(3, 'Залізь у гармату. Вона гойдається, а пунктир показує, куди полетиш. Тисни «Стрибок»!');
      L.row(5, 9, 3);
      L.swcannon(10, 20, 70, 2.6, 25);
      L.star(13, 8); L.star(15, 7); L.star(17, 6); L.star(19, 6); L.star(21, 7);
      L.ground(22, 41);
      L.enemy('crab', 30, 10);
      L.check(32);
      L.swcannon(36, 50, 85, 2.4, 43);
      L.block(41, 4, 4, 8);
      L.star(39, 5); L.star(40, 3); L.row(41, 3, 4);
      L.ground(45, 70);
      L.enemy('gull', 52, 5);
      L.power('magnet', 55, 8);
      L.row(57, 9, 6);
      L.check(64);
      L.swcannon(66, 25, 60, 2.2, 82);
      L.star(69, 7); L.star(71, 6); L.star(74, 5); L.star(77, 6);
      L.ground(79, 110);
      L.enemy('crab', 92, 10);
      L.check(96);
      L.qblock(100, 6, 'star'); L.qblock(101, 6, 'rainbow'); L.qblock(102, 6, 'star');
      L.ground(110, 114);
      L.swcannon(112, 30, 80, 3, 122);
      L.block(119, 5, 6, 7);
      L.star(116, 5); L.star(118, 3);
      L.row(119, 4, 6);
      L.ground(125, 170);
      L.enemy('crab', 135, 10);
      L.row(140, 9, 5);
      L.sign(156, 'Ворота вже близько!');
      L.gate(163);
    }
  },
  {
    id: 'ropepark', theme: 'ropepark', name: 'Мотузковий парк', blurb: 'Хапаєшся за поручні й перебираєш над прірвою', w: 170,
    build(L) {
      L.ground(0, 16);
      L.sign(3, 'Підстрибни до поручнів — вхопишся. Перебирай уперед, а «Стрибок» — щоб відпустити');
      L.row(6, 9, 3);
      L.bars(14, 28, 6);
      L.row(17, 7, 9);
      L.ground(26, 42);
      L.enemy('moth', 33, 7);
      L.check(36);
      L.bars(40, 45, 6); L.bars(47, 52, 6); L.bars(54, 60, 6);
      L.row(43, 7, 2); L.row(50, 7, 2); L.row(56, 7, 2); L.star(46, 5); L.star(53, 5);
      L.ground(58, 74);
      L.check(62);
      L.power('magnet', 65, 8);
      L.row(67, 9, 5);
      L.thorns(74, 88, 10);
      L.bars(73, 89, 6);
      L.row(75, 7, 12);
      L.enemy('moth', 81, 4);
      L.ground(88, 112);
      L.check(92);
      L.qblock(96, 6, 'star'); L.qblock(97, 6, 'rainbow'); L.qblock(98, 6, 'star');
      L.enemy('bird', 104, 6);
      L.bars(110, 126, 6);
      L.row(113, 7, 10);
      L.enemy('moth', 118, 8);
      L.ground(124, 170);
      L.enemy('bird', 136, 6);
      L.row(140, 9, 5);
      L.sign(156, 'Ворота вже близько!');
      L.gate(163);
    }
  },
  {
    id: 'foxden', theme: 'foxden', name: 'Лисяча нора', blurb: 'Битва з Лисом Хитриком', w: 172, boss: 'fox',
    build(L) {
      L.ground(0, 22);
      L.sign(4, 'Лисяча нора! Лис Хитрик сховав зірочки у свій хвіст');
      L.soap(9, 9, 13);
      L.block(12, 4, 2, 6);
      L.star(11, 6); L.star(11, 4); L.row(12, 3, 2);
      L.nutwheel(18, [[22, 31, 10]]);
      L.arc(23, 8, 8, 2);
      L.ground(31, 42);
      L.check(33);
      L.swcannon(38, 25, 65, 2.4, 53);
      L.ground(50, 62);
      L.bars(60, 74, 6);
      L.row(63, 7, 9);
      L.ground(72, 172);
      L.check(76);
      L.qblock(80, 6, 'shield');
      L.enemy('moth', 86, 6);
      L.power('magnet', 92, 8);
      L.row(95, 9, 5);
      L.cloud(100, 6, 3); L.row(100, 5, 3);
      L.enemy('hedgehog', 108, 10);
      L.qblock(112, 6, 'star');
      L.sign(119, 'Лис Хитрик! Тікай від пунктиру, а коли лис мчить, стрибай на хмарку чи поручні. Стріляй, коли він захекається');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(135, 6, 3); L.bars(145, 152, 6); L.cloud(160, 6, 3);
      L.power('shield', 148, 9);
      L.gate(168);
    }
  },
  {
    id: 'trampoline', theme: 'trampoline', name: 'Батутне містечко', blurb: 'Кожен стрибок на батуті вищий за попередній', w: 170,
    build(L) {
      L.ground(0, 31);
      L.sign(3, 'Батут! Стрибай на ньому — кожен стрибок вищий за попередній, аж до трьох разів');
      L.row(5, 9, 3);
      L.batut(9, 13);
      L.star(10, 6); L.star(11, 3); L.star(11, 1);
      L.batut(13, 17, 2);
      L.block(17, 4, 3, 6);
      L.row(17, 3, 3);
      L.enemy('bunny', 24, 10);
      L.check(27);
      L.batut(33, 36, 0, 11);
      L.arc(31, 7, 7, 2);
      L.ground(38, 72);
      L.power('magnet', 42, 8);
      L.row(44, 9, 5);
      L.batut(50, 54, 3);
      L.block(54, 2, 6, 8);
      L.row(54, 1, 6);
      L.star(51, 5); L.star(52, 3);
      L.check(64);
      L.enemy('dragonfly', 66, 6);
      L.batut(75, 77, 0, 11);
      L.arc(72, 7, 8, 2);
      L.ground(80, 170);
      L.check(84);
      L.qblock(90, 6, 'star'); L.qblock(91, 6, 'rainbow'); L.qblock(92, 6, 'star');
      L.batut(98, 108);
      L.row(99, 3, 4); L.row(104, 1, 3); L.rainbow(106, 3);
      L.enemy('bunny', 115, 10);
      L.enemy('dragonfly', 122, 5);
      L.batut(129, 133, 2);
      L.block(133, 4, 3, 6);
      L.row(133, 3, 3);
      L.row(140, 9, 4);
      L.sign(156, 'Ворота вже близько!');
      L.gate(163);
    }
  },
  {
    id: 'football', theme: 'football', name: 'Футбольне поле', blurb: 'Заб\'єш гол — і ворота відчиняться', w: 170,
    build(L) {
      L.ground(0, 170);
      L.sign(3, 'Біжи в м\'яч — і він покотиться. Заб\'єш гол — ворота відчиняться!');
      L.ball(8);
      L.row(11, 9, 5);
      L.goal(20, 2); L.block(22, 0, 1, 2);
      L.check(26);
      L.enemy('bunny', 31, 10);
      L.ball(36);
      L.row(41, 8, 3);
      L.enemy('dragonfly', 46, 5);
      L.goal(52, 2); L.block(54, 0, 1, 2);
      L.check(57);
      L.power('magnet', 60, 8);
      L.ball(62);
      L.row(64, 9, 6);
      L.enemy('beetle', 72, 10); L.enemy('beetle', 76, 10);
      L.goal(84, 2); L.block(86, 0, 1, 2);
      L.check(89);
      L.qblock(93, 6, 'star'); L.qblock(94, 6, 'rainbow'); L.qblock(95, 6, 'star');
      L.cloud(99, 5, 3); L.row(99, 4, 3);
      L.ball(104);
      L.enemy('beetle', 113, 10); L.enemy('bunny', 119, 10);
      L.row(112, 8, 3); L.row(118, 8, 2);
      L.enemy('dragonfly', 116, 5);
      L.goal(124, 2); L.block(126, 0, 1, 2);
      L.check(129);
      L.enemy('bunny', 135, 10);
      L.row(140, 9, 5);
      L.sign(156, 'Ворота вже близько!');
      L.gate(163);
    }
  },
  {
    id: 'mirrors', theme: 'mirrors', name: 'Дзеркальна майстерня', blurb: 'Дзеркальця ведуть сонячний промінь до квітки', w: 170,
    build(L) {
      L.ground(0, 170);
      L.sign(3, 'Сонячний промінь має влучити в квітку. Вистріли в дзеркальце — воно повернеться');
      L.lamp(9, 2, 'd');
      L.mirror(9, 9, 1, -1);
      L.sunflower(20, 9, 22, 2, 8); L.block(22, 0, 1, 2);
      L.row(12, 8, 6);
      L.check(25);
      L.enemy('bunny', 29, 10);
      L.lamp(34, 2, 'd');
      L.mirror(34, 9, 1, -1);
      L.mirror(42, 9, -1, 1);
      L.sunflower(42, 4, 48, 2, 8); L.block(48, 0, 1, 2);
      L.row(36, 8, 4); L.star(42, 7); L.star(42, 6);
      L.check(51);
      L.power('magnet', 54, 8);
      L.row(56, 9, 5);
      L.enemy('dragonfly', 63, 5);
      L.lamp(70, 9, 'r');
      L.mirror(76, 9, -1, 1);
      L.mirror(76, 3, 1);
      L.sunflower(84, 3, 90, 1, 9); L.block(90, 0, 1, 1);
      L.row(78, 8, 5);
      L.check(93);
      L.qblock(97, 6, 'star'); L.qblock(98, 6, 'rainbow'); L.qblock(99, 6, 'star');
      L.enemy('bunny', 104, 10);
      L.lamp(112, 3, 'd');
      L.mirror(112, 9, 1, -1);
      L.mirror(118, 9, -1, 1);
      L.mirror(118, 5, 1);
      L.mirror(124, 5, -1);
      L.mirror(124, 9, 1, -1);
      L.sunflower(128, 9, 130, 2, 8); L.block(130, 0, 1, 2);
      L.row(114, 8, 3); L.row(120, 8, 3);
      L.check(133);
      L.enemy('dragonfly', 140, 6);
      L.row(144, 9, 5);
      L.sign(156, 'Ворота вже близько!');
      L.gate(163);
    }
  },
  {
    id: 'observatory', theme: 'observatory', name: 'Обсерваторія', blurb: 'Влучиш у зорю-обмінницю — і помінялася з нею місцями', w: 170,
    build(L) {
      L.ground(0, 16);
      L.sign(3, 'Вистріли в зорю-обмінницю — і поміняєшся з нею місцями');
      L.row(6, 9, 3);
      L.swapper(28, 9);
      L.row(11, 8, 3); L.arc(30, 8, 5, 1);
      L.ground(28, 54);
      L.check(31);
      L.enemy('bunny', 35, 10);
      L.sign(37, 'Під стіною щілина! Стріляй у неї — за стіною зоря-обмінниця');
      L.block(41, 0, 2, 9);
      L.swapper(45, 9);
      L.row(46, 9, 4);
      L.check(51);
      L.power('magnet', 52, 8);
      L.ground(54, 60, 10);
      L.block(60, 5, 10, 5);
      L.swapper(62, 4);
      L.row(64, 4, 5);
      L.ground(70, 100);
      L.enemy('dragonfly', 76, 6);
      L.check(80);
      L.qblock(84, 6, 'star'); L.qblock(85, 6, 'rainbow'); L.qblock(86, 6, 'star');
      L.cloud(92, 5, 4); L.swapper(93, 4); L.row(94, 4, 3);
      L.swapper(112, 9);
      L.ground(112, 140);
      L.row(96, 9, 3); L.arc(113, 8, 6, 1);
      L.check(115);
      L.block(122, 0, 2, 9);
      L.swapper(126, 9);
      L.enemy('bunny', 132, 10);
      L.ground(140, 170);
      L.row(144, 9, 5);
      L.sign(156, 'Ворота вже близько!');
      L.gate(163);
    }
  },
  {
    id: 'peacock', theme: 'peacock', name: 'Сад Павича', blurb: 'Битва з Павичем Пишнохвостом', w: 172, boss: 'peacock',
    build(L) {
      L.ground(0, 30);
      L.sign(4, 'Сад Павича! Пишнохвіст прикрасив зірочками свій хвіст');
      L.batut(8, 12, 2);
      L.block(12, 4, 3, 6);
      L.row(12, 3, 3);
      L.ball(18);
      L.goal(26, 2); L.block(28, 0, 1, 2);
      L.ground(30, 172);
      L.check(31);
      L.lamp(36, 2, 'd');
      L.mirror(36, 9, 1, -1);
      L.sunflower(46, 9, 48, 2, 8); L.block(48, 0, 1, 2);
      L.row(38, 8, 5);
      L.block(56, 0, 2, 9);
      L.swapper(60, 9);
      L.check(64);
      L.qblock(70, 6, 'shield');
      L.enemy('dragonfly', 78, 6);
      L.power('magnet', 84, 8);
      L.row(87, 9, 5);
      L.cloud(96, 6, 3); L.row(96, 5, 3);
      L.enemy('bunny', 104, 10);
      L.qblock(110, 6, 'star');
      L.sign(119, 'Павич Пишнохвіст! Перестрибуй пір\'їнки й не стій там, де він клює. Стріляй, коли він милується собою');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(136, 6, 3); L.cloud(147, 6, 4); L.cloud(159, 6, 3);
      L.power('shield', 152, 9);
      L.gate(168);
    }
  },
  {
    id: 'sailake', theme: 'sailake', name: 'Вітрильне озеро', blurb: 'Постріл у вітрило — і човен пливе', w: 170,
    build(L) {
      L.ground(0, 20);
      L.sign(3, 'Вітрильне озеро! Тут усі плавають на вітрильниках');
      L.row(6, 9, 4);
      L.enemy('snail', 14, 10);
      L.ground(20, 30, 8);
      L.arc(20, 6, 4, 1);
      L.sign(26, 'Стань на човен і стріляй у вітрило — він попливе. Вплав не вийде: течія відносить назад');
      L.sailboat(30, 42, 8);
      L.row(33, 6, 7);
      L.ground(42, 58, 8);
      L.check(44);
      L.enemy('swan', 52, 7);
      L.ground(58, 80);
      L.row(60, 9, 3);
      L.qblock(65, 6, 'star');
      L.enemy('hedgehog', 69, 10);
      L.cloud(73, 6, 3); L.row(73, 5, 3);
      L.ground(80, 88, 8);
      L.check(82);
      L.sailboat(88, 104, 8);
      L.row(91, 6, 4); L.row(97, 6, 4);
      L.ground(104, 122, 8);
      L.power('magnet', 108, 6);
      L.enemy('swan', 115, 7);
      L.ground(122, 140);
      L.check(124);
      L.row(127, 9, 6);
      L.enemy('mosquito', 133, 8);
      L.ground(140, 146, 8);
      L.sailboat(146, 160, 8);
      L.row(149, 6, 8);
      L.ground(160, 170, 8);
      L.gate(166);
    }
  },
  {
    id: 'zoo', theme: 'zoo', name: 'Зоопарк', blurb: 'Нагодуй звірят — і вони допоможуть', w: 170,
    build(L) {
      L.ground(0, 24);
      L.sign(3, 'Зоопарк! Звірятка голодні. Візьми смаколик і віднеси тому, хто про нього мріє');
      L.food(8, 'melon');
      L.row(11, 9, 4);
      L.ground(24, 34, 8);
      L.row(25, 6, 3);
      L.hippo(30, 34, 44, 8);
      L.arc(37, 6, 4, 1);
      L.ground(44, 54, 8);
      L.check(47);
      L.ground(54, 74);
      L.row(56, 9, 3);
      L.food(61, 'apple');
      L.giraffe(67, 72, 5);
      L.ground(74, 96, 5);
      L.row(76, 4, 5);
      L.enemy('mouse', 88, 5);
      L.row(84, 2, 4);
      L.ground(96, 170);
      L.check(98);
      L.food(103, 'bun');
      L.elephant(109, 113, 3);
      L.ground(115, 128, 5);
      L.row(117, 4, 6);
      L.row(130, 9, 4);
      L.enemy('mosquito', 137, 7);
      L.qblock(142, 6, 'star');
      L.check(146);
      L.enemy('bunny', 152, 10);
      L.row(155, 8, 4);
      L.gate(166);
    }
  },
  {
    id: 'songmeadow', theme: 'songmeadow', name: 'Співоча галявина', blurb: 'Барабани грають мелодію — повтори її', w: 170,
    build(L) {
      L.ground(0, 170);
      L.sign(3, 'Співоча галявина! Барабани заграють мелодію. Повтори її: стрибай на барабани в тому ж порядку');
      L.row(6, 9, 4);
      L.drums(14, 7, 3, [0, 2, 1], 30, 4);
      L.row(16, 9, 3, 4);
      L.check(32);
      L.row(36, 9, 4);
      L.enemy('frog', 40, 10);
      L.qblock(44, 6, 'shield');
      L.drums(48, 7, 4, [1, 3, 0, 2], 70, 4);
      L.row(50, 9, 4, 4);
      L.check(72);
      L.cloud(78, 6, 4); L.row(78, 5, 4);
      L.row(84, 9, 4);
      L.enemy('mosquito', 88, 8);
      L.hole(93, 10, 2, 3);
      L.row(93, 7, 3);
      L.check(98);
      L.drums(102, 6, 4, [2, 0, 3, 1], 124, 3);
      L.row(104, 9, 4, 4);
      L.check(126);
      L.enemy('bunny', 132, 10);
      L.row(136, 9, 5);
      L.cloud(143, 6, 3); L.rainbow(144, 4);
      L.enemy('frog', 150, 10);
      L.row(153, 9, 5);
      L.gate(166);
    }
  },
  {
    id: 'treasure', theme: 'treasure', name: 'Скарбовий пагорб', blurb: 'Прокопай хід крізь м\'яку землю', w: 170,
    build(L) {
      L.ground(0, 170);
      L.sign(3, 'Скарбовий пагорб! М\'яку землю можна копати: штовхай її — і прокопаєш хід');
      L.row(6, 9, 3);
      L.dirt(12, 4, 6, 2);
      L.row(16, 9, 4);
      L.sign(23, 'Постій на м\'якій землі — і копатимеш униз. Там може бути скарб!');
      L.ground(26, 42, 6);
      L.row(27, 5, 3);
      L.dirt(30, 6, 2, 7); L.hole(30, 8, 2, 7); L.dirt(37, 8, 2, 5);
      L.row(30, 9, 7);
      L.row(38, 5, 3);
      L.check(45);
      L.enemy('beetle', 50, 10);
      L.qblock(54, 6, 'star');
      L.row(55, 9, 3);
      L.ground(60, 76, 6); L.thorns(60, 76, 5); L.dirt(60, 8, 2, 16);
      L.row(61, 9, 7, 2);
      L.check(78);
      L.row(81, 9, 4);
      L.enemy('worm', 86, 10);
      L.dirt(92, 3, 7, 1); L.dirt(96, 3, 7, 1);
      L.row(93, 9, 3);
      L.hole(100, 10, 2, 3);
      L.row(100, 7, 3);
      L.check(106);
      L.ground(110, 124, 6);
      L.dirt(114, 6, 2, 4); L.hole(114, 8, 2, 4); L.rainbow(115, 9);
      L.row(110, 5, 4); L.row(119, 5, 4);
      L.enemy('mole', 128, 10);
      L.row(131, 9, 4);
      L.dirt(138, 4, 6, 2);
      L.row(141, 9, 4);
      L.check(146);
      L.enemy('beetle', 152, 10);
      L.row(155, 8, 4);
      L.gate(166);
    }
  },
  {
    id: 'bananagrove', theme: 'bananagrove', name: 'Банановий гай', blurb: 'Битва з Мавпочкою Шкодою', w: 172, boss: 'monkey',
    build(L) {
      L.ground(0, 18);
      L.sign(3, 'Банановий гай! Мавпочка Шкода сховала зірочки серед бананів');
      L.row(6, 9, 3);
      L.ground(18, 26, 8);
      L.sailboat(26, 38, 8);
      L.row(29, 6, 5);
      L.ground(38, 46, 8);
      L.ground(46, 72);
      L.check(48);
      L.food(52, 'apple');
      L.giraffe(58, 62, 5);
      L.ground(64, 76, 5);
      L.row(66, 4, 4);
      L.ground(76, 172);
      L.check(79);
      L.drums(83, 7, 3, [2, 0, 1], 98, 4);
      L.check(100);
      L.dirt(106, 4, 6, 2);
      L.row(110, 9, 4);
      L.sign(119, 'Мавпочка Шкода! Перестрибуй банани й шкірки. Коли вона послизнеться — стріляй або стрибай на неї');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(136, 7, 3); L.cloud(147, 7, 4); L.cloud(159, 7, 3);
      L.gate(168);
    }
  },
  {
    id: 'hotair', theme: 'hotair', name: 'Повітряна куля', blurb: 'Лети над горами на повітряній кулі', w: 172,
    build(L) {
      L.ground(0, 16);
      L.sign(3, 'Повітряна куля! Застрибни в кошик, тримай «Стрибок» — і полетиш');
      L.row(5, 9, 3);
      L.hotair(11, 50);
      L.arc(17, 6, 4, 2);
      L.block(23, 0, 2, 4); L.row(23, 6, 2);
      L.arc(27, 5, 3, 1);
      L.block(31, 7, 2, 5); L.row(31, 5, 2);
      L.block(39, 0, 2, 3); L.block(39, 9, 2, 3); L.row(39, 6, 2);
      L.arc(43, 5, 4, 1);
      L.ground(48, 72);
      L.check(52);
      L.row(54, 9, 4);
      L.enemy('seal', 60, 10);
      L.qblock(64, 6, 'star');
      L.hotair(67, 112);
      L.block(77, 0, 2, 5); L.row(77, 7, 2);
      L.enemy('flake', 82, 4);
      L.block(86, 6, 2, 6); L.row(86, 3, 2);
      L.block(93, 0, 2, 3); L.block(93, 8, 2, 4); L.row(93, 5, 2);
      L.enemy('bird', 99, 6);
      L.block(103, 0, 2, 6); L.row(103, 8, 2);
      L.arc(106, 7, 4, 2);
      L.ground(110, 130);
      L.check(113);
      L.enemy('snowman', 120, 10);
      L.row(116, 9, 3);
      L.hotair(126, 162);
      L.block(132, 0, 1, 3); L.block(132, 8, 1, 4);
      L.row(132, 6, 1); L.row(136, 5, 3);
      L.block(140, 6, 1, 6); L.block(140, 0, 1, 1);
      L.row(140, 3, 1);
      L.block(146, 0, 1, 4); L.block(146, 9, 1, 3); L.row(146, 7, 1);
      L.enemy('flake', 150, 4);
      L.block(154, 5, 1, 7); L.row(154, 2, 1);
      L.ground(160, 172);
      L.gate(167);
    }
  },
  {
    id: 'snowvalley', theme: 'snowvalley', name: 'Сніжна долина', blurb: 'Сніжка росте, поки котиться', w: 170,
    build(L) {
      L.ground(0, 170);
      L.sign(3, 'Сніжна долина! Штовхай сніжку — котячись по снігу, вона росте');
      L.snowball(7, 12, 30);
      L.row(9, 9, 5, 2);
      L.ground(26, 36, 4);
      L.row(27, 3, 4);
      L.qblock(31, 0, 'star');
      L.check(38);
      L.enemy('seal', 44, 10);
      L.row(41, 9, 4);
      L.snowball(48, 12, 30);
      L.enemy('seal', 56, 10);
      L.ground(66, 74, 4);
      L.row(66, 3, 3);
      L.cloud(76, 6, 3); L.row(76, 5, 3);
      L.hole(82, 10, 2, 3);
      L.row(81, 7, 5);
      L.check(88);
      L.enemy('snowman', 94, 10);
      L.row(90, 9, 3);
      L.snowball(99, 12, 30);
      L.enemy('flake', 110, 7);
      L.block(117, 7, 1, 3);
      L.ground(118, 130, 4);
      L.row(119, 3, 5);
      L.ground(130, 170);
      L.check(134);
      L.enemy('seal', 140, 10);
      L.cloud(144, 6, 4); L.row(144, 5, 4);
      L.row(150, 9, 6);
      L.gate(165);
    }
  },
  {
    id: 'polarice', theme: 'polarice', name: 'Крижана рівнина', blurb: 'Зірочки-втікачки бігають по кризі', w: 170,
    build(L) {
      L.ground(0, 170);
      L.sign(3, 'Крижана рівнина! Тут живуть зірочки-втікачки. Заганяй їх у куток');
      L.row(6, 9, 3);
      L.block(13, 8, 1, 2); L.block(27, 8, 1, 2);
      L.runner(19, 14, 27);
      L.check(30);
      L.enemy('flake', 34, 7);
      L.row(32, 9, 4);
      L.ground(40, 54, 7);
      L.runner(46, 40, 54);
      L.row(41, 6, 2); L.row(52, 6, 2);
      L.enemy('owl', 60, 5);
      L.row(57, 9, 4);
      L.cloud(63, 6, 3); L.row(63, 5, 3);
      L.check(68);
      L.block(72, 7, 1, 3); L.block(88, 7, 1, 3);
      L.runner(78, 73, 88); L.runner(84, 73, 88);
      L.row(75, 9, 3, 4);
      L.enemy('seal', 94, 10);
      L.qblock(97, 6, 'shield');
      L.ground(102, 116, 6);
      L.row(103, 5, 3);
      L.block(116, 8, 1, 2);
      L.ground(116, 117, 8);
      L.runner(108, 102, 116);
      L.check(120);
      L.enemy('flake', 126, 6);
      L.hole(130, 10, 2, 3);
      L.row(129, 7, 5);
      L.block(136, 8, 1, 2); L.block(150, 8, 1, 2);
      L.runner(142, 137, 150);
      L.row(138, 9, 3, 4);
      L.rainbow(160, 5); L.cloud(158, 6, 4);
      L.gate(166);
    }
  },
  {
    id: 'sledtrack', theme: 'sledtrack', name: 'Санна траса', blurb: 'Санчата мчать самі, а ти стрибаєш', w: 178,
    build(L) {
      L.ground(0, 178);
      L.sign(3, 'Санна траса! Стань на санчата — вони поїдуть самі. Перед перешкодою тисни «Стрибок»');
      L.sled(8, 92);
      L.block(20, 9, 1, 1); L.arc(18, 7, 5, 2);
      L.hole(30, 10, 2, 4); L.arc(29, 7, 6, 2);
      L.block(40, 8, 1, 2); L.arc(38, 6, 5, 2);
      L.hole(48, 10, 2, 6); L.arc(47, 6, 8, 2);
      L.thorns(60, 63); L.arc(59, 7, 5, 2);
      L.block(70, 9, 2, 1);
      L.hole(76, 10, 2, 6); L.arc(75, 6, 8, 2);
      L.thorns(87, 89);
      L.check(95);
      L.enemy('seal', 99, 10);
      L.row(98, 9, 3);
      L.sled(103, 166);
      L.hole(112, 10, 2, 5); L.arc(111, 6, 7, 2);
      L.block(121, 8, 1, 2);
      L.thorns(127, 131); L.arc(126, 6, 6, 2);
      L.block(137, 9, 1, 1); L.hole(140, 10, 2, 5); L.arc(139, 6, 7, 2);
      L.thorns(149, 151);
      L.block(156, 8, 1, 2); L.arc(154, 6, 5, 2);
      L.hole(160, 10, 2, 4);
      L.check(169);
      L.gate(173);
    }
  },
  {
    id: 'iceberg', theme: 'iceberg', name: 'Айсберг Пінгвіна', blurb: 'Битва з Пінгвіном Ковзанчиком', w: 172, boss: 'penguin',
    build(L) {
      L.ground(0, 172);
      L.sign(3, 'Айсберг Пінгвіна! Ковзанчик сховав зірочки серед криги');
      L.snowball(7, 12, 30);
      L.ground(25, 33, 4);
      L.row(26, 3, 3);
      L.check(36);
      L.block(39, 8, 1, 2); L.block(52, 8, 1, 2);
      L.runner(46, 40, 52);
      L.sled(56, 100);
      L.hole(66, 10, 2, 5); L.arc(65, 6, 7, 2);
      L.block(76, 8, 1, 2);
      L.thorns(84, 87);
      L.hole(92, 10, 2, 4);
      L.check(103);
      L.enemy('seal', 108, 10);
      L.row(110, 9, 4);
      L.sign(118, 'Пінгвін Ковзанчик! Перестрибуй сніжки, а коли він помчить на животику — стрибни на нього згори. Тоді він закрутиться, і в нього можна стріляти');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(136, 7, 3); L.cloud(147, 7, 4); L.cloud(159, 7, 3);
      L.gate(168);
    }
  },
  {
    id: 'storks', theme: 'storks', name: 'Лелечий хутір', blurb: 'Лелеки переносять через річку й на пагорби', w: 170,
    build(L) {
      L.ground(0, 20);
      L.sign(3, 'Лелечий хутір! Лелеки переносять гостей. Застрибни лелеці на спинку');
      L.row(6, 9, 3);
      L.enemy('ladybug', 11, 10);
      L.stork([[17, 'g'], [21, 7], [27, 5], [37, 5], [44, 7], [48, 'g']]);
      L.arc(23, 4, 5, 1); L.row(30, 3, 5);
      L.ground(46, 72);
      L.check(50);
      L.row(54, 9, 4);
      L.enemy('butterfly', 60, 7);
      L.qblock(57, 6, 'star');
      L.stork([[64, 'g'], [66, 6], [68, 3]]);
      L.ground(70, 90, 4);
      L.row(72, 3, 5);
      L.enemy('ladybug', 82, 4);
      L.ground(90, 106);
      L.check(93);
      L.row(96, 9, 3);
      L.stork([[102, 'g'], [106, 6], [114, 4], [120, 6], [126, 4], [131, 'g']]);
      L.thorns(106, 129);
      L.row(110, 3, 3); L.row(122, 3, 3); L.arc(117, 5, 3, 1);
      L.ground(129, 170);
      L.check(133);
      L.enemy('ladybug', 140, 10);
      L.cloud(144, 6, 4); L.row(144, 5, 4);
      L.row(152, 9, 5);
      L.gate(165);
    }
  },
  {
    id: 'pogopark', theme: 'pogopark', name: 'Пого-парк', blurb: 'На пого-стрибунці вистрибнеш вище за дерева', w: 170,
    build(L) {
      L.ground(0, 170);
      L.sign(3, 'Пого-парк! Візьми пого-стрибунець і скачи. Тримай «Стрибок» — злетиш вище');
      L.power('pogo', 8, 9);
      L.row(11, 9, 3);
      L.ground(15, 21, 4); L.row(16, 3, 4);
      L.thorns(21, 29); L.arc(22, 5, 6, 2);
      L.ground(29, 35, 4); L.row(30, 3, 4);
      L.check(38);
      L.power('pogo', 41, 9);
      L.enemy('ladybug', 46, 10);
      L.ground(50, 54, 3); L.row(50, 2, 4);
      L.thorns(54, 62); L.arc(55, 5, 6, 2);
      L.ground(62, 66, 4); L.qblock(63, 0, 'star');
      L.thorns(66, 74); L.arc(67, 5, 6, 2);
      L.check(77);
      L.power('pogo', 80, 9);
      L.enemy('butterfly', 88, 6);
      L.ground(86, 92, 5); L.row(87, 4, 4);
      L.ground(96, 102, 3); L.row(97, 2, 4);
      L.ground(106, 112, 4); L.row(107, 3, 4);
      L.thorns(112, 120); L.arc(113, 5, 6, 2);
      L.check(123);
      L.power('pogo', 126, 9);
      L.enemy('ladybug', 131, 10);
      L.ground(134, 140, 4); L.row(135, 3, 4);
      L.thorns(140, 148); L.rainbow(144, 3);
      L.ground(148, 152, 4);
      L.row(154, 9, 5);
      L.gate(165);
    }
  },
  {
    id: 'inflatables', theme: 'inflatables', name: 'Надувне містечко', blurb: 'Накачай місток або кульку — і вперед', w: 170,
    build(L) {
      L.ground(0, 24);
      L.sign(3, 'Надувне містечко! Стрибни тричі на ручку насоса — накачаєш місток чи кульку');
      L.row(6, 9, 3);
      L.pumpBridge(16, 24, 32, 10);
      L.arc(25, 7, 6, 2);
      L.ground(32, 52);
      L.check(34);
      L.enemy('ladybug', 38, 10);
      L.pumpLift(41, 45, 4);
      L.ground(47, 62, 4); L.row(48, 3, 6);
      L.ground(62, 80);
      L.check(64);
      L.enemy('butterfly', 70, 7);
      L.row(66, 9, 4);
      L.pumpBridge(74, 80, 89, 10);
      L.row(81, 8, 8);
      L.ground(89, 110);
      L.qblock(93, 6, 'shield');
      L.pumpLift(99, 103, 3);
      L.ground(105, 112, 3); L.row(106, 2, 4);
      L.ground(112, 124);
      L.check(115);
      L.pumpBridge(118, 124, 131, 10);
      L.enemy('butterfly', 127, 7);
      L.arc(124, 7, 7, 2);
      L.ground(131, 170);
      L.check(134);
      L.enemy('ladybug', 142, 10);
      L.cloud(146, 6, 4); L.row(146, 5, 4);
      L.row(153, 9, 5);
      L.gate(165);
    }
  },
  {
    id: 'cloudshop', theme: 'cloudshop', name: 'Хмаринкова майстерня', blurb: 'Хмаринки з пляшечки стають під ноги', w: 170,
    build(L) {
      L.ground(0, 18);
      L.sign(3, 'Хмаринкова майстерня! Візьми пляшечку з хмаринками. У стрибку тисни «Ріг» — під ногами з\'явиться хмаринка');
      L.power('cloud', 10, 9);
      L.row(6, 9, 3);
      L.arc(19, 7, 7, 2);
      L.ground(27, 40);
      L.check(29);
      L.power('cloud', 33, 9);
      L.ground(40, 50, 3); L.row(41, 2, 5);
      L.ground(50, 60);
      L.power('cloud', 53, 9);
      L.enemy('butterfly', 56, 7);
      L.arc(60, 6, 8, 2);
      L.ground(69, 84);
      L.check(71);
      L.power('cloud', 75, 9);
      L.enemy('ladybug', 80, 10);
      L.arc(85, 5, 8, 2);
      L.ground(94, 100, 4); L.row(95, 3, 2); L.power('cloud', 98, 3);
      L.arc(101, 4, 7, 2);
      L.ground(108, 124);
      L.check(110);
      L.power('cloud', 114, 9);
      L.ground(124, 132, 2); L.row(125, 1, 4);
      L.ground(132, 140);
      L.power('cloud', 135, 9);
      L.arc(140, 6, 8, 2);
      L.ground(149, 170);
      L.enemy('ladybug', 154, 10);
      L.rainbow(158, 3); L.cloud(156, 4, 4);
      L.gate(165);
    }
  },
  {
    id: 'cabbage', theme: 'cabbage', name: 'Капустяний город', blurb: 'Битва з Гусеницею Ненажеркою', w: 172, boss: 'caterpillar',
    build(L) {
      L.ground(0, 20);
      L.sign(3, 'Капустяний город! Гусениця Ненажерка сховала зірочки серед капусти');
      L.row(6, 9, 3);
      L.stork([[16, 'g'], [20, 7], [28, 6], [34, 'g']]);
      L.row(24, 4, 4);
      L.ground(32, 60);
      L.check(36);
      L.power('pogo', 40, 9);
      L.ground(44, 48, 4); L.row(45, 3, 2);
      L.thorns(48, 56); L.arc(49, 5, 6, 2);
      L.check(62);
      L.ground(60, 76);
      L.pumpBridge(70, 76, 84, 10);
      L.ground(84, 100);
      L.check(87);
      L.power('cloud', 91, 9);
      L.arc(101, 6, 7, 2);
      L.ground(109, 172);
      L.enemy('ladybug', 114, 10);
      L.sign(118, 'Гусениця Ненажерка! Коли повзе — стрибай на хмарки або скачи їй по спинці. Коли жує листочок — стріляй у голову');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(136, 7, 3); L.cloud(147, 7, 4); L.cloud(159, 7, 3);
      L.gate(168);
    }
  },
  {
    id: 'paperplanes', theme: 'paperplanes', name: 'Паперові літачки', blurb: 'Літачок летить сам, а ти підкидаєш його вгору', w: 172,
    build(L) {
      L.ground(0, 16);
      L.sign(3, 'Паперові літачки! Застрибни на літачок — і він полетить. Тисни «Стрибок», щоб підкинути його вгору');
      L.row(5, 9, 3);
      L.plane(11);
      L.row(17, 6, 3); L.row(22, 6, 3);
      L.block(27, 9, 2, 3); L.row(27, 7, 2);
      L.hoop(31, 6);
      L.row(34, 5, 3); L.arc(38, 7, 3, 1);
      L.ground(42, 66);
      L.check(45);
      L.row(47, 9, 4);
      L.enemy('butterfly', 53, 7);
      L.qblock(56, 6, 'star');
      L.plane(60);
      L.block(72, 0, 2, 3); L.row(72, 5, 2);
      L.block(80, 9, 2, 3); L.row(80, 7, 2);
      L.hoop(85, 5);
      L.block(90, 0, 2, 3); L.row(90, 6, 2);
      L.block(97, 8, 2, 4); L.row(97, 6, 2);
      L.arc(100, 6, 3, 1);
      L.ground(104, 128);
      L.check(107);
      L.enemy('bird', 113, 6);
      L.row(110, 9, 5);
      L.plane(122);
      L.hoop(132, 4); L.row(135, 3, 3);
      L.block(139, 6, 2, 6);
      L.hoop(144, 5); L.row(147, 4, 3);
      L.block(151, 0, 2, 4); L.row(151, 7, 2);
      L.arc(155, 6, 4, 1);
      L.ground(160, 172);
      L.gate(167);
    }
  },
  {
    id: 'icecream', theme: 'icecream', name: 'Країна морозива', blurb: 'Кульки морозива тануть під ногами', w: 170,
    build(L) {
      L.ground(0, 16);
      L.sign(3, 'Країна морозива! Кульки морозива тануть, коли на них стоїш. Не зупиняйся!');
      L.row(6, 9, 3);
      L.enemy('icecone', 12, 10);
      L.scoop(18, 9); L.row(18, 8, 2);
      L.scoop(23, 8); L.row(23, 7, 2);
      L.scoop(28, 9); L.row(28, 8, 2);
      L.ground(32, 55);
      L.check(35);
      L.row(38, 9, 4);
      L.enemy('icecone', 44, 10);
      L.scoop(48, 8); L.scoop(53, 6); L.row(53, 5, 2);
      L.ground(55, 64, 4); L.row(56, 3, 6);
      L.qblock(60, 0, 'star');
      L.ground(64, 82);
      L.check(67);
      L.enemy('icecone', 73, 10);
      L.row(69, 9, 4);
      L.scoop(84, 9); L.row(84, 8, 2);
      L.scoop(89, 8); L.row(89, 7, 2);
      L.scoop(94, 7); L.arc(94, 5, 2, 1);
      L.scoop(99, 8); L.row(99, 7, 2);
      L.scoop(104, 9); L.row(104, 8, 2);
      L.ground(108, 132);
      L.check(111);
      L.enemy('icecone', 118, 10);
      L.qblock(115, 6, 'shield');
      L.row(121, 9, 4);
      L.scoop(126, 8); L.scoop(129, 5); L.row(129, 4, 2);
      L.scoop(134, 7); L.row(134, 6, 2);
      L.scoop(139, 5); L.row(139, 4, 2);
      L.scoop(144, 8); L.row(144, 7, 2);
      L.ground(148, 170);
      L.enemy('icecone', 154, 10);
      L.rainbow(158, 5); L.cloud(156, 6, 4);
      L.gate(165);
    }
  },
  {
    id: 'rainbowroad', theme: 'rainbowroad', name: 'Веселкова доріжка', blurb: 'Над ямою під ногами з\'являється веселка', w: 170,
    build(L) {
      L.ground(0, 18);
      L.sign(3, 'Веселкова доріжка! Візьми веселку — і над ямою під ногами з\'явиться веселковий місток');
      L.power('rainbow', 10, 9);
      L.row(5, 9, 3);
      L.row(19, 9, 10);
      L.ground(30, 46);
      L.check(32);
      L.enemy('butterfly', 37, 7);
      L.row(34, 9, 3);
      L.power('rainbow', 42, 9);
      L.row(47, 9, 3); L.block(52, 6, 4, 1); L.row(52, 5, 4); L.row(57, 9, 4);
      L.ground(62, 70, 6);
      L.row(63, 5, 3);
      L.power('rainbow', 68, 5);
      L.row(71, 5, 14);
      L.ground(86, 104);
      L.check(89);
      L.row(92, 9, 4);
      L.enemy('bird', 98, 6);
      L.power('rainbow', 101, 9);
      L.row(105, 9, 6); L.arc(112, 7, 5, 2); L.row(118, 9, 5);
      L.ground(124, 140);
      L.check(127);
      L.qblock(131, 6, 'star');
      L.power('rainbow', 136, 9);
      L.row(141, 9, 4); L.rainbow(149, 6); L.row(152, 9, 5);
      L.ground(158, 170);
      L.gate(165);
    }
  },
  {
    id: 'seahorse', theme: 'seahorse', name: 'Морський коник', blurb: 'З морським коником пропливеш крізь течію', w: 170,
    build(L) {
      L.ground(0, 16, 6);
      L.sign(3, 'Морський коник! У воді сильна течія. Підпливи до коника — з ним пропливеш швидко');
      L.row(6, 5, 4);
      L.ground(16, 44, 11); L.water(16, 21, 6); L.current(21, 40, 6); L.water(40, 44, 6);
      L.seahorse(18, 9);
      L.row(23, 9, 4); L.row(29, 8, 4); L.row(35, 10, 3);
      L.enemy('goldfish', 32, 9);
      L.ground(44, 60, 6);
      L.check(46);
      L.enemy('crab', 53, 6);
      L.row(48, 5, 4);
      L.ground(60, 96, 11); L.water(60, 65, 6); L.current(65, 92, 6, -170); L.water(92, 96, 6);
      L.seahorse(62, 9);
      L.block(72, 9, 2, 2); L.row(72, 8, 2);
      L.row(67, 10, 3); L.row(77, 9, 4);
      L.block(84, 6, 2, 3); L.row(84, 10, 2);
      L.enemy('goldfish', 80, 7);
      L.row(88, 8, 3);
      L.ground(96, 112, 6);
      L.check(99);
      L.qblock(104, 2, 'star');
      L.enemy('crab', 108, 6);
      L.ground(112, 150, 11); L.water(112, 116, 6); L.current(116, 146, 6); L.water(146, 150, 6);
      L.seahorse(114, 9);
      L.row(118, 9, 4);
      L.block(124, 6, 2, 3); L.row(124, 10, 2);
      L.enemy('goldfish', 129, 8);
      L.row(128, 8, 3);
      L.block(134, 9, 2, 2); L.row(134, 8, 2);
      L.rainbow(140, 10); L.row(142, 9, 3);
      L.ground(150, 170, 6);
      L.row(153, 5, 4);
      L.gate(165);
    }
  },
  {
    id: 'pond', theme: 'pond', name: 'Ставок Квакуші', blurb: 'Битва з Жабкою Квакушею', w: 172, boss: 'frog',
    build(L) {
      L.ground(0, 16);
      L.sign(3, 'Ставок Квакуші! Жабка Квакуша сховала зірочки-світлячки біля свого ставка');
      L.row(5, 9, 3);
      L.plane(11);
      L.row(18, 6, 3); L.hoop(23, 6); L.row(27, 6, 3);
      L.ground(34, 56);
      L.check(37);
      L.enemy('butterfly', 43, 7);
      L.row(40, 9, 3);
      L.power('rainbow', 50, 9);
      L.row(57, 9, 10);
      L.ground(68, 84);
      L.check(71);
      L.row(74, 9, 4);
      L.scoop(86, 9); L.row(86, 8, 2);
      L.scoop(91, 8); L.row(91, 7, 2);
      L.scoop(96, 9); L.row(96, 8, 2);
      L.ground(100, 172);
      L.enemy('ladybug', 112, 10);
      L.sign(118, 'Жабка Квакуша! Перестрибуй її язик і хвилі. Коли вона співає «Ква!» — стріляй або стрибни на неї');
      L.check(125);
      L.power('candy', 128, 8);
      L.arena(129, 172);
      L.cloud(136, 7, 3); L.cloud(147, 7, 4); L.cloud(159, 7, 3);
      L.gate(168);
    }
  },
  {
    id: 'rainvalley', theme: 'rainvalley', name: 'Дощова долина', blurb: 'Розвесели хмаринки — і по них пройдеш', w: 172,
    build(L) {
      L.ground(0, 18);
      L.sign(3, 'Дощова долина! Хмаринки сумують і плачуть дощем. Стрельни в хмаринку рогом — вона усміхнеться, і по ній можна буде пройти');
      L.row(6, 9, 3);
      L.enemy('snail', 13, 10);
      L.sadcloud(19, 9, 3); L.row(19, 8, 3);
      L.sadcloud(24, 8, 3); L.row(24, 7, 3);
      L.ground(29, 50);
      L.check(32);
      L.row(34, 9, 4);
      L.enemy('frog', 40, 10);
      L.qblock(44, 6, 'star');
      L.sadcloud(51, 9, 3); L.row(51, 8, 3);
      L.sadcloud(56, 8, 3); L.row(56, 7, 3);
      L.sadcloud(61, 7, 3); L.rainbow(62, 4);
      L.ground(66, 100);
      L.check(69);
      L.row(72, 9, 4);
      L.enemy('snail', 78, 10);
      L.sadcloud(82, 8, 2); L.sadcloud(85, 6, 2); L.sadcloud(88, 4, 3); L.row(88, 3, 3); L.qblock(89, 1, 'star5');
      L.enemy('bird', 95, 6);
      L.sadcloud(101, 9, 3); L.row(101, 8, 3);
      L.sadcloud(106, 9, 3); L.row(106, 8, 3);
      L.sadcloud(111, 8, 3); L.row(111, 7, 3);
      L.sadcloud(116, 8, 3); L.row(116, 7, 3);
      L.ground(121, 145);
      L.check(124);
      L.power('magnet', 127, 8);
      L.row(129, 9, 6);
      L.enemy('frog', 137, 10);
      L.sadcloud(146, 9, 3); L.row(146, 8, 3);
      L.sadcloud(151, 8, 3); L.row(151, 7, 3);
      L.ground(156, 172);
      L.gate(167);
    }
  },
  {
    id: 'umbrellas', theme: 'umbrellas', name: 'Парасольковий перевал', blurb: 'З парасолькою пролетиш над прірвою', w: 172,
    build(L) {
      L.ground(0, 16);
      L.sign(3, 'Парасольковий перевал! Візьми парасольку. У стрибку тримай «Стрибок» — і повільно опустишся, як пір\'їнка');
      L.row(5, 9, 3);
      L.power('umbrella', 10, 8);
      L.arc(17, 7, 7, 1.5);
      L.ground(25, 46);
      L.check(28);
      L.row(31, 9, 4);
      L.enemy('bird', 36, 6);
      L.block(38, 8, 2, 2);
      L.ground(41, 46, 6); L.row(41, 5, 5);
      L.row(50, 5, 2); L.row(53, 6, 4); L.row(58, 7, 3);
      L.ground(62, 84);
      L.check(65);
      L.qblock(69, 6, 'star');
      L.enemy('snail', 74, 10);
      L.row(76, 9, 3);
      L.power('umbrella', 80, 8);
      L.sign(82, 'Долина вітрів! Вітер підкидає вгору, а парасолька несе далі');
      L.wind(92, 95, 2); L.wind(104, 107, 2);
      L.row(96, 3, 5); L.row(108, 3, 5);
      L.ground(118, 140);
      L.check(121);
      L.power('umbrella', 124, 8);
      L.enemy('bee', 130, 7);
      L.row(126, 9, 5);
      L.block(132, 8, 2, 2);
      L.ground(135, 140, 6);
      L.rainbow(145, 2);
      L.arc(147, 6, 5, 1);
      L.ground(154, 172);
      L.gate(167);
    }
  },
  {
    id: 'ticklegarden', theme: 'ticklegarden', name: 'Лоскотний сад', blurb: 'Розсміши квіточки — і вони підкинуть угору', w: 172,
    build(L) {
      L.ground(0, 22);
      L.sign(3, 'Лоскотний сад! Квіточки засумували. Стрельни в квіточку — вона засміється, а тоді стрибни на неї — і вона підкине високо-високо');
      L.row(6, 9, 3);
      L.tickle(14);
      L.ground(17, 30, 4); L.row(19, 3, 6);
      L.enemy('snail', 26, 4);
      L.ground(30, 52);
      L.check(33);
      L.row(35, 9, 4);
      L.enemy('frog', 40, 10);
      L.tickle(45); L.qblock(45, 3, 'star5');
      L.ground(52, 100);
      L.tickle(56); L.cloud(58, 4, 4); L.row(58, 3, 4);
      L.cloud(64, 3, 3); L.rainbow(65, 1);
      L.check(70);
      L.enemy('bee', 74, 7);
      L.row(72, 9, 4);
      L.tickle(81); L.block(84, 4, 2, 6); L.row(84, 3, 2);
      L.enemy('snail', 92, 10);
      L.arc(100, 7, 4, 2);
      L.ground(104, 134);
      L.check(107);
      L.power('magnet', 111, 8);
      L.row(113, 9, 6);
      L.ground(127, 134, 7); L.tickle(130);
      L.ground(134, 142, 2); L.row(135, 1, 6);
      L.ground(142, 172);
      L.enemy('snail', 150, 10);
      L.row(153, 9, 4);
      L.gate(166);
    }
  },
  {
    id: 'smiletown', theme: 'smiletown', name: 'Містечко усмішок', blurb: 'Розвесели кубики — і вони стануть сходинками', w: 172,
    build(L) {
      L.ground(0, 16);
      L.sign(3, 'Містечко усмішок! Сумні кубики не хочуть підніматися. Стрельни в кубик — він усміхнеться й підніметься сходинкою');
      L.row(5, 9, 3);
      L.mood(12, 9, 3);
      L.ground(16, 30, 4); L.row(18, 3, 6);
      L.enemy('snail', 25, 4);
      L.ground(30, 50);
      L.check(33);
      L.row(35, 9, 4);
      L.enemy('frog', 40, 10);
      L.mood(44, 9, 3); L.qblock(44, 3, 'star5'); L.qblock(45, 3, 'star');
      L.ground(50, 70);
      L.mood(54, 9, 2); L.mood(57, 9, 5);
      L.ground(59, 70, 2); L.row(60, 1, 8);
      L.ground(70, 126);
      L.check(73);
      L.row(76, 9, 5);
      L.enemy('bee', 82, 7);
      L.power('magnet', 86, 8);
      L.mood(91, 9, 2); L.mood(94, 9, 4); L.mood(97, 9, 6);
      L.row(91, 6, 2); L.row(94, 4, 2); L.rainbow(98, 1);
      L.check(104);
      L.enemy('snail', 108, 10);
      L.row(110, 9, 4);
      L.mood(118, 9, 3);
      L.ground(121, 140, 4); L.row(123, 3, 8);
      L.enemy('snail', 132, 4);
      L.ground(140, 172);
      L.check(143);
      L.row(146, 9, 5);
      L.enemy('frog', 154, 10);
      L.gate(166);
    }
  },
  {
    // цей рівень придумала Маша: малюнки й опис — її
    id: 'mashaland', theme: 'mashaland', name: 'Країна Маші', blurb: 'Рівень придумала Маша! Зілля, пузирки й Сумний Смайлик', w: 200, boss: 'smiley', masha: true,
    build(L) {
      L.ground(0, 46);
      L.sign(3, 'Цей рівень придумала Маша! Тут живуть равлики, їжачки, пташки, кажанчики й бджілки');
      L.row(6, 9, 3);
      L.enemy('snail', 11, 10);
      L.power('heart', 15, 8);
      L.enemy('hedgehog', 21, 10);
      L.sign(24, 'Кубики Маші: стукни знизу — і вилетить зірочка');
      L.mbricks(27, 6, 1, 'B');
      L.mbricks(30, 6, 3, 'B'); L.enemy('bee', 31, 3);
      L.row(34, 5, 1);
      L.mbricks(36, 6, 3, 'B');
      L.enemy('bird', 40, 5);
      L.enemy('bat', 44, 4);
      L.check(42);
      L.arc(46, 8, 4, 1.5);
      L.ground(50, 118);
      L.mbricks(53, 6, 2, 'P'); L.mbricks(58, 6, 1, 'P'); L.mbricks(62, 6, 3, 'P');
      L.enemy('hedgehog', 67, 10);
      L.enemy('snail', 72, 10);
      L.check(76);
      L.power('potbig', 80, 8);
      L.bricks(86, 3, 7, 2);
      L.row(89, 9, 3);
      L.enemy('hedgehog', 93, 10);
      L.power('potsmall', 98, 9);
      L.block(102, 0, 8, 9);
      L.row(102, 9, 8);
      L.enemy('snail', 112, 10);
      L.block(116, 7, 2, 3);
      L.power('air', 117, 6);
      L.row(121, 5, 8); L.rainbow(130, 4); L.row(132, 5, 9);
      L.ground(144, 200);
      L.check(147);
      L.sign(150, 'Сумний Смайлик! Він дуже сумний. Коли він сяде поплакати — стріляй або стрибни на нього, і він повеселішає');
      L.power('candy', 154, 8);
      L.arena(156, 200);
      L.gate(196);
    }
  },
  {
    id: 'schoolyard', theme: 'schoolyard', name: 'Шкільне подвір\'я', blurb: 'Перестрибни скакалку, коли вона внизу', w: 172,
    build(L) {
      L.ground(0, 36);
      L.sign(3, 'Шкільне подвір\'я! Зайчики крутять скакалку. Стрибай, коли вона внизу. Можна стрибати й на місці — кожен стрибок дає зірочку!');
      L.row(6, 9, 3);
      L.rope(14, 3);
      L.enemy('snail', 22, 10);
      L.qblock(26, 6, 'star');
      L.rope(30, 3);
      L.arc(36, 7, 4, 1.5);
      L.ground(40, 74);
      L.rope(46, 4); L.row(46, 6, 4);
      L.check(53);
      L.row(55, 9, 4);
      L.rope(62, 3); L.row(62, 6, 3);
      L.enemy('bird', 70, 6);
      L.arc(74, 7, 4, 1.5);
      L.ground(78, 172);
      L.rope(84, 3); L.rope(90, 3);
      L.check(97);
      L.row(100, 9, 4);
      L.qblock(104, 6, 'star5');
      L.enemy('frog', 110, 10);
      L.rope(116, 5); L.row(117, 6, 3);
      L.check(126);
      L.power('magnet', 129, 8);
      L.row(131, 9, 6);
      L.rope(142, 3); L.rope(148, 3);
      L.enemy('snail', 156, 10);
      L.gate(166);
    }
  },
  {
    id: 'fireworks', theme: 'fireworks', name: 'Феєрверкове свято', blurb: 'Ракета підкине тебе аж до неба', w: 172,
    build(L) {
      L.ground(0, 54);
      L.sign(3, 'Феєрверкове свято! Стань біля ракети й натисни «Ріг» — ракета підкине тебе високо в небо');
      L.row(6, 9, 3);
      L.rocket(13, 3);
      L.ground(16, 30, 4); L.row(18, 3, 6);
      L.enemy('snail', 25, 4);
      L.check(33);
      L.row(35, 9, 4);
      L.enemy('frog', 41, 10);
      L.rocket(46, 1); L.row(46, 7, 1); L.row(46, 5, 1); L.row(46, 3, 1);
      L.qblock(51, 6, 'star');
      L.ground(54, 74);
      L.rocket(57, 2);
      L.ground(60, 74, 3); L.row(61, 2, 8);
      L.enemy('bee', 68, 1);
      L.ground(74, 110);
      L.check(77);
      L.row(79, 9, 4);
      L.rocket(86, 3); L.cloud(88, 4, 4); L.rainbow(90, 2);
      L.rocket(94, 2);
      L.ground(96, 110, 3); L.row(97, 2, 8);
      L.ground(110, 172);
      L.check(113);
      L.enemy('snail', 118, 10);
      L.power('magnet', 122, 8);
      L.row(124, 9, 6);
      L.rocket(134, 1); L.row(134, 6, 1); L.row(134, 4, 1); L.row(134, 2, 1);
      L.rocket(146, 3);
      L.ground(149, 160, 4); L.row(150, 3, 6);
      L.gate(167);
    }
  },
  {
    id: 'climbwall', theme: 'climbwall', name: 'Скеледром', blurb: 'У чарівних рукавичках дерешся по стінах', w: 172,
    build(L) {
      L.ground(0, 60);
      L.sign(3, 'Скеледром! Візьми чарівні рукавички. Стрибни до стіни й тримай «Стрибок» — полізеш угору');
      L.power('gloves', 9, 8); L.row(5, 9, 3);
      L.block(16, 2, 2, 8); L.row(16, 1, 2);
      L.enemy('snail', 23, 10);
      L.block(28, 3, 3, 7); L.row(28, 2, 3);
      L.check(33);
      L.row(34, 9, 3);
      L.ground(38, 60, 2); L.row(40, 1, 8);
      L.enemy('snail', 50, 2);
      L.row(53, 1, 5);
      L.ground(60, 172);
      L.check(63);
      L.row(65, 9, 4);
      L.enemy('frog', 70, 10);
      L.power('gloves', 75, 8);
      L.block(82, 3, 2, 7); L.row(82, 2, 2);
      L.block(88, 2, 2, 8); L.row(88, 1, 2);
      L.row(84, 6, 4);
      L.check(96);
      L.enemy('bee', 102, 6);
      L.row(99, 9, 4);
      L.power('gloves', 106, 8);
      L.ground(110, 124, 2); L.row(111, 1, 12);
      L.check(127);
      L.power('magnet', 130, 8);
      L.row(132, 9, 6);
      L.enemy('snail', 140, 10);
      L.power('gloves', 143, 8);
      L.block(148, 3, 2, 7); L.row(148, 2, 2);
      L.gate(166);
    }
  },
  {
    id: 'festsquare', theme: 'festsquare', name: 'Святкова площа', blurb: 'Скакалки, ракети й рукавички — усе разом', w: 172,
    build(L) {
      L.ground(0, 172);
      L.sign(3, 'Святкова площа! Тут і скакалки, і ракети, і скеледром');
      L.row(6, 9, 3);
      L.rope(13, 3);
      L.enemy('snail', 19, 10);
      L.rocket(24, 3);
      L.ground(27, 40, 4); L.row(29, 3, 6);
      L.check(43);
      L.power('gloves', 46, 8);
      L.block(52, 2, 2, 8); L.row(52, 1, 2);
      L.rope(58, 3);
      L.qblock(63, 6, 'star5');
      L.enemy('frog', 67, 10);
      L.check(73);
      L.rocket(77, 1); L.row(77, 6, 1); L.row(77, 4, 1); L.row(77, 2, 1);
      L.rope(83, 4); L.row(83, 6, 4);
      L.power('gloves', 90, 8);
      L.ground(94, 110, 3); L.row(96, 2, 8);
      L.check(113);
      L.rope(118, 3); L.rope(124, 3);
      L.power('magnet', 129, 8);
      L.row(131, 9, 5);
      L.rocket(138, 3);
      L.ground(141, 152, 4); L.row(142, 3, 6);
      L.enemy('snail', 157, 10);
      L.gate(166);
    }
  },
  {
    id: 'owlwood', theme: 'owlwood', name: 'Совиний гай', blurb: 'Битва із Совою Ухнюшкою', w: 172, boss: 'owl',
    build(L) {
      L.ground(0, 172);
      L.sign(3, 'Совиний гай. Тут живе Сова Ухнюшка. Вдень вона спить, а свято її розбудило…');
      L.row(6, 9, 3);
      L.rope(12, 3);
      L.enemy('snail', 18, 10);
      L.rocket(24, 3);
      L.ground(27, 38, 4); L.row(29, 3, 6);
      L.check(42);
      L.power('gloves', 46, 8);
      L.block(52, 2, 2, 8); L.row(52, 1, 2);
      L.enemy('frog', 60, 10);
      L.rope(66, 3);
      L.row(72, 9, 4);
      L.check(80);
      L.rocket(86, 1); L.row(86, 6, 1); L.row(86, 4, 1); L.row(86, 2, 1);
      L.enemy('bee', 94, 6);
      L.row(98, 9, 5);
      L.rope(106, 4);
      L.check(116);
      L.sign(119, 'Сова Ухнюшка! Коли вона задрімає на пеньку — стріляй або стрибни на неї');
      L.power('candy', 125, 8);
      L.arena(129, 172);
      L.gate(168);
    }
  },
  {
    id: 'postoffice', theme: 'postoffice', name: 'Поштове містечко', blurb: 'Віднеси посилку в поштомат — і шлагбаум відчиниться', w: 172,
    build(L) {
      L.ground(0, 32);
      L.sign(3, 'Поштове містечко! Візьми посилку й віднеси в поштомат — тоді шлагбаум відчиниться');
      L.row(6, 9, 3);
      L.parcel(11, 9);
      L.locker(15, 0); L.pdoor(20, 0, 4);
      L.enemy('snail', 25, 10);
      L.qblock(28, 6, 'star');
      L.arc(32, 7, 4, 1.5);
      L.ground(36, 100);
      L.check(38);
      L.parcel(42, 9);
      L.enemy('bird', 46, 6);
      L.locker(50, 1); L.pdoor(54, 1, 4);
      L.row(56, 9, 4);
      L.block(61, 7, 3, 1); L.parcel(62, 6);
      L.row(66, 9, 2);
      L.locker(69, 2); L.pdoor(73, 2, 4);
      L.check(76);
      L.enemy('frog', 80, 10);
      L.power('magnet', 84, 8);
      L.row(86, 9, 6);
      L.arc(100, 7, 4, 1.5);
      L.ground(104, 172);
      L.parcel(107, 9);
      L.locker(112, 3); L.pdoor(116, 3, 4);
      L.row(118, 9, 3);
      L.check(122);
      L.parcel(126, 9);
      L.enemy('snail', 130, 10);
      L.locker(135, 4); L.pdoor(139, 4, 4);
      L.row(141, 9, 5);
      L.enemy('bee', 150, 6);
      L.gate(166);
    }
  },
  {
    id: 'firestation', theme: 'firestation', name: 'Пожежна частина', blurb: 'Загаси вогонь із пожежного шланга', w: 172,
    build(L) {
      L.ground(0, 40);
      L.sign(3, 'Пожежна частина! Візьми пожежний шланг — і ріг стрілятиме водою. Гаси вогонь!');
      L.row(5, 9, 3);
      L.power('hose', 9, 8);
      L.fire(14, 8, 2);
      L.row(17, 9, 2);
      L.fire(21, 5, 5);
      L.enemy('snail', 26, 10);
      L.qblock(30, 6, 'star');
      L.fire(34, 7, 3);
      L.arc(40, 7, 4, 1.5);
      L.ground(44, 84);
      L.check(46);
      L.block(50, 7, 4, 1); L.row(50, 6, 4);
      L.fire(56, 5, 5);
      L.enemy('frog', 61, 10);
      L.fire(66, 5, 5); L.fire(68, 5, 5);
      L.check(73);
      L.row(76, 9, 4);
      L.arc(84, 7, 4, 1.5);
      L.ground(88, 172);
      L.fire(90, 5, 5);
      L.power('magnet', 96, 8);
      L.row(98, 9, 6);
      L.fire(106, 5, 5);
      L.enemy('bird', 110, 6);
      L.fire(114, 8, 2); L.fire(116, 8, 2); L.fire(118, 8, 2);
      L.check(122);
      L.block(126, 6, 6, 1); L.fire(128, 3, 3); L.row(129, 5, 3);
      L.fire(140, 5, 5);
      L.enemy('snail', 146, 10);
      L.fire(152, 5, 5);
      L.gate(166);
    }
  },
  {
    id: 'construction', theme: 'construction', name: 'Будмайданчик', blurb: 'У касці гупни згори — і тріснута плита розсиплеться', w: 172,
    build(L) {
      L.ground(0, 14);
      L.sign(3, 'Будмайданчик! Візьми каску. У стрибку натисни «Ріг» — гупнеш згори й розіб\'єш тріснуту плиту');
      L.power('helmet', 9, 8);
      L.row(5, 9, 3);
      L.ground(14, 40, 6); L.clear(18, 7, 22, 3); L.cracks(18, 6, 3); L.block(24, 0, 2, 6);
      L.row(26, 8, 10);
      L.enemy('snail', 33, 10);
      L.ground(40, 54);
      L.check(42);
      L.row(44, 9, 4);
      L.enemy('frog', 49, 10);
      L.ground(54, 64, 6); L.clear(56, 7, 8, 3); L.cracks(56, 6, 3); L.row(57, 8, 6);
      L.ground(64, 80);
      L.check(66);
      L.enemy('snail', 71, 10);
      L.qblock(74, 6, 'star');
      L.block(77, 7, 2, 3);
      L.ground(80, 100, 4); L.clear(82, 5, 3, 2); L.clear(82, 8, 18, 2); L.cracks(82, 4, 3); L.cracks(82, 7, 3); L.block(88, 0, 2, 4);
      L.row(83, 6, 1); L.row(86, 9, 12);
      L.ground(100, 172);
      L.check(103);
      L.power('magnet', 106, 8);
      L.row(108, 9, 6);
      L.enemy('frog', 116, 10);
      L.ground(122, 136, 6); L.clear(126, 7, 10, 3); L.cracks(126, 6, 3); L.block(131, 0, 2, 6); L.row(128, 8, 7);
      L.enemy('snail', 148, 10);
      L.row(150, 9, 4);
      L.gate(166);
    }
  },
  {
    id: 'citynight', theme: 'citynight', name: 'Нічне місто', blurb: 'Посилки, вогонь і тріснуті плити — усе разом', w: 172,
    build(L) {
      L.ground(0, 34);
      L.sign(3, 'Нічне місто! Тут треба й посилки носити, і вогонь гасити, і плити розбивати');
      L.power('hose', 8, 8); L.power('helmet', 11, 8);
      L.row(5, 9, 2);
      L.parcel(15, 9);
      L.fire(19, 8, 2);
      L.locker(23, 0); L.pdoor(28, 0, 4);
      L.check(30);
      L.ground(34, 52, 6); L.clear(38, 7, 14, 3); L.cracks(38, 6, 3); L.block(43, 0, 2, 6); L.row(41, 8, 8);
      L.ground(52, 90);
      L.fire(55, 5, 5);
      L.enemy('snail', 60, 10);
      L.parcel(64, 9);
      L.locker(70, 1); L.pdoor(75, 1, 4);
      L.check(78);
      L.power('magnet', 81, 8); L.row(83, 9, 5);
      L.arc(90, 7, 4, 1.5);
      L.ground(94, 172);
      L.fire(97, 5, 5); L.fire(99, 5, 5);
      L.enemy('frog', 104, 10);
      L.ground(108, 124, 6); L.clear(112, 7, 12, 3); L.cracks(112, 6, 3); L.block(117, 0, 2, 6); L.row(114, 8, 8);
      L.check(127);
      L.parcel(130, 9); L.fire(134, 8, 2); L.locker(138, 2); L.pdoor(143, 2, 4);
      L.row(146, 9, 5);
      L.enemy('snail', 152, 10);
      L.gate(166);
    }
  },
  {
    id: 'dogpark', theme: 'dogpark', name: 'Собачий парк', blurb: 'Битва з Цуциком Гавчиком', w: 172, boss: 'puppy',
    build(L) {
      L.ground(0, 172);
      L.sign(3, 'Собачий парк. Тут живе Цуцик Гавчик — це він розгриз коробки із зірочками!');
      L.row(6, 9, 3);
      L.parcel(12, 9); L.locker(16, 0); L.pdoor(21, 0, 4);
      L.power('hose', 25, 8); L.fire(30, 5, 5);
      L.enemy('snail', 35, 10);
      L.power('helmet', 39, 8);
      L.ground(44, 60, 6); L.clear(48, 7, 12, 3); L.cracks(48, 6, 3); L.block(53, 0, 2, 6); L.row(50, 8, 8);
      L.check(64);
      L.row(66, 9, 5);
      L.enemy('frog', 74, 10);
      L.qblock(80, 6, 'star5');
      L.fire(88, 8, 2);
      L.row(92, 9, 6);
      L.check(104);
      L.enemy('bee', 110, 6);
      L.sign(119, 'Цуцик Гавчик! Коли він ляже на спинку відпочити — стріляй або стрибни йому на пузико');
      L.power('candy', 125, 8);
      L.arena(129, 172);
      L.gate(168);
    }
  },
  {
    id: 'jetlab', theme: 'jetlab', name: 'Майстерня ранців', blurb: 'З реактивним ранцем злітаєш угору', w: 172,
    build(L) {
      L.ground(0, 34);
      L.sign(3, 'Майстерня ранців! Візьми реактивний ранець. У стрибку тримай «Стрибок» — і полетиш угору. Паливо набирається на землі');
      L.power('jetpack', 9, 8); L.row(5, 9, 3);
      L.ground(20, 34, 2); L.row(21, 1, 12);
      L.enemy('snail', 28, 2);
      L.arc(35, 3, 7, 2);
      L.ground(43, 80);
      L.check(46);
      L.row(50, 9, 4);
      L.enemy('frog', 56, 10);
      L.power('jetpack', 60, 8);
      L.ground(64, 72, 2); L.row(65, 1, 6);
      L.arc(81, 4, 6, 2);
      L.ground(88, 130);
      L.check(95);
      L.power('jetpack', 98, 8);
      L.enemy('bird', 102, 5);
      L.row(104, 9, 6);
      L.qblock(112, 2, 'star5');
      L.power('magnet', 116, 8);
      L.power('jetpack', 126, 8);
      L.arc(131, 4, 6, 2);
      L.ground(138, 172);
      L.enemy('snail', 150, 10);
      L.gate(166);
    }
  },
  {
    id: 'switchworks', theme: 'switchworks', name: 'Фабрика перемикачів', blurb: 'Торкнися перемикача — і кубики поміняються', w: 172,
    build(L) {
      L.ground(0, 22);
      L.sign(3, 'Фабрика перемикачів! Торкнися перемикача — червоні кубики сховаються, а сині з\'являться. І навпаки!');
      L.row(6, 9, 2);
      L.sw(10);
      L.rblk(14, 4, 1, 6);
      L.row(16, 9, 4);
      L.bblk(22, 10, 8, 1); L.row(23, 8, 6);
      L.ground(30, 46);
      L.check(32);
      L.enemy('snail', 35, 10);
      L.sw(40);
      L.bblk(43, 5, 1, 5);
      L.rblk(46, 10, 7, 1); L.row(47, 8, 5);
      L.ground(53, 80);
      L.check(55);
      L.qblock(58, 6, 'star');
      L.sw(64);
      L.rblk(67, 3, 1, 7);
      L.bblk(70, 8, 2, 1); L.bblk(73, 6, 2, 1); L.bblk(76, 4, 2, 1); L.row(76, 3, 2);
      L.bblk(80, 10, 6, 1); L.row(81, 8, 4);
      L.ground(86, 112);
      L.check(88);
      L.enemy('frog', 94, 10);
      L.power('magnet', 98, 8);
      L.row(100, 9, 5);
      L.sw(106);
      L.bblk(109, 4, 1, 6);
      L.rblk(112, 10, 7, 1); L.row(113, 8, 5);
      L.ground(119, 172);
      L.check(122);
      L.sw(126);
      L.rblk(129, 4, 1, 6);
      L.enemy('snail', 136, 10);
      L.sw(142);
      L.bblk(145, 4, 1, 6);
      L.row(148, 9, 5);
      L.gate(166);
    }
  },
  {
    id: 'glassbridge', theme: 'glassbridge', name: 'Невидимі містки', blurb: 'У чарівних окулярах видно невидимі містки', w: 172,
    build(L) {
      L.ground(0, 20);
      L.sign(3, 'Невидимі містки! Візьми чарівні окуляри — і побачиш містки над прірвою. Поспішай, поки окуляри діють!');
      L.row(6, 9, 3);
      L.power('glasses', 14, 8);
      L.ghost(20, 10, 12); L.row(21, 8, 10);
      L.ground(32, 56);
      L.check(34);
      L.enemy('snail', 40, 10);
      L.qblock(44, 6, 'star');
      L.power('glasses', 50, 8);
      L.ghost(56, 10, 4); L.ghost(60, 9, 4); L.ghost(64, 10, 6); L.row(57, 8, 12);
      L.ground(70, 100);
      L.check(72);
      L.row(74, 9, 4);
      L.enemy('frog', 80, 10);
      L.power('magnet', 84, 8);
      L.row(86, 9, 4);
      L.power('glasses', 93, 8);
      L.ghost(96, 7, 2); L.ghost(99, 5, 2); L.ghost(102, 3, 3); L.row(102, 2, 3);
      L.ghost(100, 10, 14); L.row(104, 8, 8);
      L.ground(114, 134);
      L.check(116);
      L.enemy('snail', 122, 10);
      L.power('glasses', 128, 8);
      L.ghost(134, 10, 5); L.ghost(141, 10, 4); L.ghost(147, 10, 3); L.row(135, 8, 3); L.row(141, 8, 3); L.row(147, 8, 2);
      L.ground(150, 172);
      L.gate(166);
    }
  },
  {
    id: 'inventfair', theme: 'inventfair', name: 'Виставка винаходів', blurb: 'Ранець, перемикачі й окуляри — усе разом', w: 172,
    build(L) {
      L.ground(0, 38);
      L.sign(3, 'Виставка винаходів! Ранець, перемикачі й чарівні окуляри — усе разом');
      L.row(6, 9, 3);
      L.power('jetpack', 10, 8);
      L.ground(16, 28, 3); L.row(17, 2, 8);
      L.sw(34);
      L.rblk(35, 4, 1, 6);
      L.bblk(38, 10, 7, 1); L.row(39, 8, 5);
      L.ground(45, 60);
      L.check(47);
      L.enemy('snail', 52, 10);
      L.power('glasses', 56, 8);
      L.ghost(60, 10, 12); L.row(61, 8, 10);
      L.ground(72, 100);
      L.check(74);
      L.power('jetpack', 77, 8);
      L.ground(82, 92, 2); L.row(83, 1, 8);
      L.sw(97);
      L.bblk(98, 4, 1, 6);
      L.rblk(100, 10, 7, 1); L.row(101, 8, 5);
      L.ground(107, 130);
      L.check(109);
      L.enemy('frog', 114, 10);
      L.power('magnet', 118, 8);
      L.row(120, 9, 5);
      L.power('glasses', 127, 8);
      L.ghost(130, 10, 12); L.row(131, 8, 10);
      L.ground(142, 172);
      L.enemy('snail', 150, 10);
      L.gate(166);
    }
  },
  {
    id: 'gearden', theme: 'gearden', name: 'Нора Клацика', blurb: 'Битва з Мишеням Клациком', w: 172, boss: 'mouse',
    build(L) {
      L.ground(0, 48);
      L.sign(3, 'Нора Клацика. Заводне Мишеня закрутило всі зірочки у свої шестерні!');
      L.row(6, 9, 3);
      L.power('jetpack', 10, 8);
      L.ground(16, 26, 3); L.row(17, 2, 8);
      L.sw(32);
      L.rblk(33, 4, 1, 6);
      L.enemy('snail', 38, 10);
      L.power('glasses', 44, 8);
      L.ghost(48, 10, 10); L.row(49, 8, 8);
      L.ground(58, 172);
      L.check(61);
      L.row(63, 9, 5);
      L.enemy('frog', 70, 10);
      L.qblock(76, 6, 'star5');
      L.sw(84);
      L.bblk(87, 4, 1, 6);
      L.row(92, 9, 6);
      L.check(104);
      L.enemy('bee', 110, 6);
      L.sign(119, 'Мишеня Клацик! Коли його ключик зупиниться — стріляй або стрибни на нього');
      L.power('candy', 125, 8);
      L.arena(129, 172);
      L.gate(168);
    }
  },
  /* ===== Частина 25: Розумна країна ===== */
  {
    id: 'numberland', theme: 'numberland', name: 'Країна чисел', blurb: 'Порахуй приклад і стукни правильний кубик', w: 170,
    build(L) {
      L.ground(0, 42);
      L.sign(3, 'Країна чисел! Порахуй приклад на дошці й стукни головою знизу кубик із правильною відповіддю — двері відчиняться');
      L.row(6, 9, 3);
      L.quiz(12, 2, '+', 1, [2, 5], 23, 1);
      L.row(12, 4, 3, 3);
      L.row(25, 9, 4);
      L.enemy('snail', 34, 10);
      L.ground(45, 92);
      L.check(47);
      L.quiz(53, 5, '-', 2, [4, 6], 64, 0);
      L.row(53, 4, 3, 3);
      L.block(70, 7, 3); L.row(70, 5, 3);
      L.enemy('frog', 78, 10);
      L.row(84, 9, 4);
      L.ground(95, 132);
      L.check(97);
      L.quiz(103, 3, '+', 4, [5, 6], 114, 2);
      L.row(103, 4, 3, 3);
      L.enemy('bee', 121, 6);
      L.row(118, 9, 5);
      L.ground(135, 170);
      L.check(137);
      L.quiz(141, 6, '+', 2, [7, 9], 152, 1);
      L.row(141, 4, 3, 3);
      L.row(155, 9, 3);
      L.gate(164);
    }
  },
  {
    id: 'abcmeadow', theme: 'abcmeadow', name: 'Англійська галявина', blurb: 'Збирай англійські слова по літерах', w: 170,
    build(L) {
      L.ground(0, 44);
      L.sign(3, 'Англійська галявина! Збирай літери слова по черзі — і двері відчиняться. Зайві літери висять угорі, їх не треба');
      L.word(8, 'CAT', 22, 3, [[12, 6, 'K'], [16, 6, 'O']]);
      L.row(25, 9, 4);
      L.enemy('snail', 35, 10);
      L.ground(47, 92);
      L.check(49);
      L.word(54, 'SUN', 68, 3, [[61, 6, 'Z']]);
      L.block(72, 7, 4); L.row(72, 5, 4);
      L.enemy('bee', 83, 6);
      L.row(80, 9, 5);
      L.ground(95, 132);
      L.check(97);
      L.word(101, 'DOG', 115, 3, [[105, 6, 'B'], [111, 6, 'Q']]);
      L.row(118, 9, 4);
      L.enemy('frog', 126, 10);
      L.ground(135, 172);
      L.check(137);
      L.word(140, 'FISH', 156, 3, [[147, 6, 'W'], [153, 6, 'Y']]);
      L.row(158, 9, 3);
      L.gate(166);
    }
  },
  {
    id: 'colorlab', theme: 'colorlab', name: 'Майстерня фарб', blurb: 'Змішуй фарби й відчиняй кольорові ворота', w: 172,
    build(L) {
      L.ground(0, 44);
      L.sign(3, 'Майстерня фарб! Торкнися двох відерець — фарби змішаються. Кольорові ворота відчиняє тільки фарба їхнього кольору');
      L.row(6, 9, 3);
      L.pot(11, 'red'); L.pot(15, 'yellow');
      L.cgate(20, 'orange');
      L.row(23, 9, 4);
      L.enemy('snail', 33, 10);
      L.ground(47, 92);
      L.check(49);
      L.pot(54, 'blue');
      L.block(57, 6, 3); L.pot(58, 'red', 6); L.row(57, 4, 3);
      L.pot(63, 'yellow');
      L.cgate(68, 'green');
      L.row(70, 9, 3);
      L.enemy('frog', 76, 10);
      L.pot(81, 'red'); L.pot(85, 'blue');
      L.cgate(89, 'purple');
      L.ground(95, 132);
      L.check(97);
      L.sign(100, 'Не всі фарби потрібні! Зайве відерце можна перестрибнути');
      L.pot(104, 'red'); L.pot(108, 'yellow'); L.pot(112, 'blue');
      L.cgate(117, 'green');
      L.row(119, 9, 4);
      L.enemy('bee', 127, 6);
      L.ground(135, 172);
      L.check(137);
      L.pot(141, 'blue'); L.pot(145, 'red'); L.pot(149, 'yellow');
      L.cgate(154, 'orange');
      L.row(157, 9, 3);
      L.gate(166);
    }
  },
  {
    id: 'smartschool', theme: 'smartschool', name: 'Розумна школа', blurb: 'Приклади, слова й фарби — усе разом', w: 172,
    build(L) {
      L.ground(0, 40);
      L.sign(3, 'Розумна школа! Тут усе разом: приклади, англійські слова й фарби');
      L.row(6, 9, 3);
      L.quiz(11, 4, '+', 4, [6, 9], 22, 1);
      L.row(11, 4, 3, 3);
      L.enemy('snail', 31, 10);
      L.ground(43, 90);
      L.check(45);
      L.word(48, 'BEE', 62, 3, [[55, 6, 'P']]);
      L.row(64, 9, 3);
      L.enemy('frog', 68, 10);
      L.pot(73, 'yellow');
      L.block(76, 6, 3); L.pot(77, 'red', 6); L.row(76, 4, 3);
      L.pot(81, 'blue');
      L.cgate(86, 'green');
      L.ground(93, 136);
      L.check(95);
      L.quiz(99, 9, '-', 4, [4, 6], 110, 1);
      L.row(99, 4, 3, 3);
      L.word(114, 'STAR', 130, 3, [[121, 6, 'X']]);
      L.row(132, 9, 3);
      L.ground(139, 172);
      L.check(141);
      L.enemy('bee', 146, 6);
      L.pot(149, 'red'); L.pot(153, 'blue');
      L.cgate(158, 'purple');
      L.row(160, 9, 3);
      L.gate(166);
    }
  },
  {
    id: 'inkwell', theme: 'inkwell', name: 'Чорнильниця', blurb: 'Битва з Кляксою Бризкою', w: 172, boss: 'blot',
    build(L) {
      L.ground(0, 46);
      L.sign(3, 'Чорнильниця. Клякса Бризка заляпала всі підказки! Порахуй приклад, збери слово й зміши фарби');
      L.row(6, 9, 3);
      L.quiz(11, 5, '+', 5, [9, 11], 22, 1);
      L.row(11, 4, 3, 3);
      L.row(25, 9, 3);
      L.enemy('snail', 33, 10);
      L.ground(49, 172);
      L.check(51);
      L.word(55, 'SUN', 69, 3, [[62, 6, 'M']]);
      L.row(71, 9, 3);
      L.pot(77, 'red'); L.pot(81, 'blue');
      L.cgate(86, 'purple');
      L.check(90);
      L.enemy('bee', 98, 6);
      L.row(100, 9, 5);
      L.check(108);
      L.sign(119, 'Клякса Бризка! Коли вона висохне й застигне — стріляй або стрибни на неї');
      L.power('candy', 125, 8);
      L.arena(129, 172);
      L.gate(168);
    }
  },  /* ===== Частина 26: Базар і хованки ===== */
  {
    id: 'fruitmarket', theme: 'fruitmarket', name: 'Фруктовий базар', blurb: 'Збери все зі списку покупок', w: 170,
    build(L) {
      L.ground(0, 44);
      L.sign(3, 'Фруктовий базар! На дошці — список покупок. Збери все зі списку в будь-якому порядку, і каса відчиниться');
      L.shop(8, ['apple', 'pear', 'banana'], 25, [['apple', 12], ['carrot', 15, 6], ['pear', 17, 7], ['banana', 21]]);
      L.row(27, 9, 3);
      L.enemy('snail', 35, 10);
      L.ground(47, 92);
      L.check(48);
      L.shop(53, ['carrot', 'cheese', 'bread'], 71, [['cheese', 57], ['grapes', 59, 6], ['carrot', 62, 7], ['milk', 65, 6], ['bread', 67]]);
      L.block(75, 7, 3); L.row(75, 5, 3);
      L.enemy('frog', 82, 10);
      L.row(86, 9, 3);
      L.ground(95, 132);
      L.check(96);
      L.shop(101, ['milk', 'grapes', 'apple', 'banana'], 121, [['banana', 105], ['milk', 108, 7], ['pear', 111, 6], ['grapes', 113], ['apple', 117, 7]]);
      L.row(123, 9, 4);
      L.ground(135, 170);
      L.check(136);
      L.shop(141, ['bread', 'cheese', 'pear'], 159, [['pear', 145, 7], ['bread', 148], ['banana', 151, 6], ['cheese', 154]]);
      L.row(161, 9, 3);
      L.gate(166);
    }
  },
  {
    id: 'hideforest', theme: 'hideforest', name: 'Ліс хованок', blurb: 'Знайди друзів, що сховалися в кущах', w: 170,
    build(L) {
      L.ground(0, 46);
      L.sign(3, 'Ліс хованок! У кущах сховалися друзі. Торкнися куща — і друг піде з тобою. Будиночок друзів відчиниться, коли всі будуть разом');
      L.hide(9, 'bunny'); L.row(12, 9, 3); L.hide(17, 'hedgehog');
      L.fgate(23, 2);
      L.row(26, 9, 3);
      L.enemy('snail', 33, 10);
      L.block(38, 8, 4, 2); L.hide(40, 'fox', 8);
      L.ground(49, 94);
      L.check(51);
      L.hide(56, 'squirrel');
      L.block(60, 6, 3); L.row(60, 4, 3);
      L.hide(65, 'mouse');
      L.fgate(71, 5);
      L.enemy('frog', 78, 10);
      L.row(82, 9, 4);
      L.ground(97, 134);
      L.check(99);
      L.hide(103, 'duck');
      L.row(107, 9, 4);
      L.enemy('bee', 112, 6);
      L.fgate(118, 6);
      L.row(121, 9, 4);
      L.ground(137, 170);
      L.check(139);
      L.block(144, 7, 5); L.row(144, 5, 5);
      L.gate(164);
    }
  },
  {
    id: 'shapetown', theme: 'shapetown', name: 'Містечко фігур', blurb: 'Принеси фігуру до дверей із такою діркою', w: 170,
    build(L) {
      L.ground(0, 44);
      L.sign(3, 'Містечко фігур! Візьми фігуру й принеси до дверей із такою самою діркою. Нова фігура міняється з тією, що несеш');
      L.shape(10, 'circle'); L.sdoor(16, 'circle');
      L.row(18, 9, 3);
      L.shape(25, 'square'); L.shape(30, 'triangle'); L.sdoor(36, 'triangle');
      L.enemy('snail', 39, 10);
      L.ground(47, 92);
      L.check(49);
      L.shape(53, 'star'); L.shape(57, 'heart'); L.sdoor(63, 'star');
      L.block(67, 7, 3); L.row(67, 5, 3);
      L.enemy('frog', 75, 10);
      L.shape(82, 'heart'); L.sdoor(88, 'heart');
      L.ground(95, 134);
      L.check(97);
      L.shape(100, 'triangle'); L.shape(104, 'circle'); L.shape(108, 'square'); L.sdoor(114, 'square');
      L.row(117, 9, 4);
      L.enemy('bee', 126, 6);
      L.ground(137, 170);
      L.check(139);
      L.shape(143, 'circle'); L.shape(147, 'heart'); L.sdoor(152, 'circle');
      L.row(154, 9, 3);
      L.gate(164);
    }
  },
  {
    id: 'bigshop', theme: 'bigshop', name: 'Великий магазин', blurb: 'Покупки, хованки й фігури — усе разом', w: 172,
    build(L) {
      L.ground(0, 44);
      L.sign(3, 'Великий магазин! Тут треба і покупки зібрати, і друзів знайти в коробках, і фігури підібрати');
      L.shop(8, ['milk', 'bread'], 19, [['milk', 12], ['cheese', 14, 6], ['bread', 16, 7]]);
      L.hide(23, 'mouse'); L.hide(28, 'bunny');
      L.fgate(33, 2);
      L.enemy('snail', 38, 10);
      L.ground(47, 92);
      L.check(49);
      L.shape(53, 'triangle'); L.shape(57, 'star'); L.sdoor(62, 'triangle');
      L.shop(67, ['apple', 'grapes', 'carrot'], 85, [['grapes', 71], ['apple', 74, 7], ['banana', 77, 6], ['carrot', 80]]);
      L.row(87, 9, 3);
      L.ground(95, 136);
      L.check(97);
      L.hide(101, 'duck');
      L.enemy('frog', 106, 10);
      L.hide(111, 'hedgehog');
      L.fgate(116, 4);
      L.shape(120, 'heart'); L.shape(124, 'square'); L.sdoor(130, 'square');
      L.ground(139, 172);
      L.check(141);
      L.enemy('bee', 146, 6);
      L.row(150, 9, 5);
      L.gate(166);
    }
  },
  {
    id: 'hamsterhole', theme: 'hamsterhole', name: 'Комора Жуйка', blurb: "Битва з Хом'ячком Жуйком", w: 172, boss: 'hamster',
    build(L) {
      L.ground(0, 46);
      L.sign(3, "Комора Жуйка. Хом'ячок сховав усі покупки! Збери список, знайди друга й принеси фігуру");
      L.shop(8, ['carrot', 'apple'], 18, [['carrot', 12], ['apple', 15, 7]]);
      L.hide(23, 'squirrel');
      L.fgate(28, 1);
      L.enemy('snail', 34, 10);
      L.ground(49, 172);
      L.check(51);
      L.shape(55, 'heart'); L.shape(59, 'circle'); L.sdoor(65, 'heart');
      L.row(68, 9, 4);
      L.check(75);
      L.enemy('bee', 84, 6);
      L.row(90, 9, 5);
      L.check(100);
      L.sign(119, "Хом'ячок Жуйко! Коли він наїсться й задрімає — стріляй або стрибни на нього");
      L.power('candy', 125, 8);
      L.arena(129, 172);
      L.gate(168);
    }
  },  /* ===== Частина 27: День народження ===== */
  {
    id: 'cakehill', theme: 'cakehill', name: 'Свічки на торті', blurb: 'Запали всі свічки — і торт відчиниться', w: 170,
    build(L) {
      L.ground(0, 44);
      L.sign(3, 'Свічки на торті! Торкнися свічки або стрельни в неї рогом — вона засвітиться. Торт-двері відчиняться, коли засвітиш усі свічки');
      L.candle(8); L.candle(11); L.candle(14);
      L.cake(19, 3);
      L.row(21, 9, 3);
      L.enemy('snail', 29, 10);
      L.block(34, 7, 4); L.candle(35, 7); L.candle(37, 7); L.row(34, 4, 4);
      L.ground(47, 92);
      L.check(49);
      L.candle(53); L.candle(56); L.candle(59); L.candle(62);
      L.cake(67, 7);
      L.row(69, 9, 3);
      L.enemy('frog', 76, 10);
      L.block(80, 6, 3); L.row(80, 4, 3);
      L.ground(95, 132);
      L.check(97);
      L.candle(101); L.candle(103); L.candle(105); L.candle(107); L.candle(109);
      L.cake(114, 12);
      L.row(117, 9, 5);
      L.enemy('bee', 124, 6);
      L.ground(135, 170);
      L.check(137);
      L.block(141, 8, 3, 2); L.candle(142, 8);
      L.candle(147); L.candle(150);
      L.cake(155, 15);
      L.row(157, 9, 3);
      L.gate(165);
    }
  },
  {
    id: 'giftland', theme: 'giftland', name: 'Країна подарунків', blurb: 'Знайди ключик у подарунках', w: 170,
    build(L) {
      L.ground(0, 44);
      L.sign(3, 'Країна подарунків! Стукни подарунок головою знизу — він відкриється. В одному з подарунків ключик від дверей');
      L.gifts(10, 2, 21);
      L.row(10, 4, 3, 3);
      L.row(23, 9, 3);
      L.enemy('snail', 31, 10);
      L.ground(47, 92);
      L.check(49);
      L.gifts(53, 0, 64);
      L.row(53, 4, 3, 3);
      L.block(68, 7, 3); L.row(68, 5, 3);
      L.enemy('frog', 76, 10);
      L.row(80, 9, 4);
      L.ground(95, 132);
      L.check(97);
      L.gifts(101, 1, 112);
      L.row(101, 4, 3, 3);
      L.row(114, 9, 4);
      L.enemy('bee', 122, 6);
      L.ground(135, 170);
      L.check(137);
      L.gifts(141, 2, 152);
      L.row(141, 4, 3, 3);
      L.row(154, 9, 3);
      L.gate(164);
    }
  },
  {
    id: 'plankbridge', theme: 'plankbridge', name: 'Міст із дощечок', blurb: 'Збирай дощечки й будуй мости', w: 172,
    build(L) {
      L.ground(0, 40);
      L.sign(3, 'Міст із дощечок! Збирай дощечки. Коли їх вистачить, підійди до річки — і міст збудується сам');
      L.plank(8); L.plank(12); L.plank(16); L.plank(20);
      L.block(24, 7, 3); L.plank(25, 6); L.row(24, 4, 3);
      L.enemy('snail', 31, 10);
      L.pbridge(40, 48);
      L.ground(48, 92);
      L.check(50);
      L.plank(54); L.plank(57); L.plank(60); L.plank(63); L.plank(66);
      L.block(70, 7, 3); L.row(70, 5, 3);
      L.enemy('frog', 78, 10);
      L.pbridge(92, 102);
      L.ground(102, 132);
      L.check(104);
      L.plank(108); L.plank(111); L.plank(114); L.plank(117);
      L.enemy('bee', 122, 6);
      L.pbridge(132, 140);
      L.ground(140, 172);
      L.check(142);
      L.row(146, 9, 5);
      L.gate(166);
    }
  },
  {
    id: 'partyhall', theme: 'partyhall', name: 'Велике свято', blurb: 'Свічки, подарунки й мости — усе разом', w: 172,
    build(L) {
      L.ground(0, 44);
      L.sign(3, 'Велике свято! Запали свічки, знайди ключик у подарунках і збудуй міст із дощечок');
      L.candle(8); L.candle(10); L.candle(12);
      L.cake(16, 3);
      L.plank(20); L.plank(23); L.plank(26); L.plank(29);
      L.enemy('snail', 34, 10);
      L.pbridge(44, 52);
      L.ground(52, 98);
      L.check(54);
      L.gifts(58, 0, 69);
      L.row(58, 4, 3, 3);
      L.candle(73); L.candle(76);
      L.block(79, 8, 3, 2); L.candle(80, 8);
      L.cake(86, 6);
      L.enemy('frog', 91, 10);
      L.ground(101, 140);
      L.check(103);
      L.gifts(107, 2, 118);
      L.row(107, 4, 3, 3);
      L.plank(121); L.plank(124); L.plank(127); L.plank(130);
      L.pbridge(140, 148);
      L.ground(148, 172);
      L.check(150);
      L.row(153, 9, 5);
      L.gate(166);
    }
  },
  {
    id: 'raccoonden', theme: 'raccoonden', name: 'Нора Шкодька', blurb: 'Битва з Єнотом Шкодьком', w: 172, boss: 'raccoon',
    build(L) {
      L.ground(0, 46);
      L.sign(3, 'Нора Шкодька. Єнот потягнув подарунки! Запали свічки й знайди ключик');
      L.candle(8); L.candle(11);
      L.cake(15, 2);
      L.gifts(19, 1, 30);
      L.row(19, 4, 3, 3);
      L.enemy('snail', 36, 10);
      L.ground(49, 172);
      L.check(51);
      L.row(55, 9, 4);
      L.check(75);
      L.enemy('bee', 84, 6);
      L.row(90, 9, 5);
      L.check(100);
      L.sign(119, 'Єнот Шкодько! Коли він заплутається у стрічці — стріляй або стрибни на нього');
      L.power('candy', 125, 8);
      L.arena(129, 172);
      L.gate(168);
    }
  },  /* ===== Частина 28: Розумна ферма ===== */
  {
    id: 'clockvillage', theme: 'clockvillage', name: 'Котра година?', blurb: 'Подивись на годинник і відчини двері', w: 170,
    build(L) {
      L.ground(0, 42);
      L.sign(3, 'Котра година? Подивись на годинник: коротка червона стрілка показує годину. Стукни головою знизу кубик із цим числом');
      L.row(6, 9, 3);
      L.clockq(12, 3, [2, 6], 23, 1);
      L.row(25, 9, 4);
      L.enemy('snail', 34, 10);
      L.ground(45, 92);
      L.check(47);
      L.clockq(53, 6, [9, 12], 64, 0);
      L.block(70, 7, 3); L.row(70, 5, 3);
      L.enemy('frog', 78, 10);
      L.row(84, 9, 4);
      L.ground(95, 132);
      L.check(97);
      L.clockq(103, 9, [4, 7], 114, 2);
      L.row(117, 9, 5);
      L.enemy('bee', 124, 6);
      L.ground(135, 170);
      L.check(137);
      L.clockq(141, 12, [1, 10], 152, 2);
      L.row(155, 9, 3);
      L.gate(164);
    }
  },
  {
    id: 'countmeadow', theme: 'countmeadow', name: 'Лічильна галявина', blurb: 'Порахуй картинки на дошці', w: 170,
    build(L) {
      L.ground(0, 42);
      L.sign(3, 'Лічильна галявина! Порахуй картинки на дошці й стукни головою знизу кубик із правильним числом');
      L.row(6, 9, 3);
      L.countq(12, 3, 'apple', [2, 4], 23, 1);
      L.row(25, 9, 4);
      L.enemy('snail', 34, 10);
      L.ground(45, 92);
      L.check(47);
      L.countq(53, 5, 'butterfly', [4, 6], 64, 1);
      L.block(70, 7, 3); L.row(70, 5, 3);
      L.enemy('frog', 78, 10);
      L.row(84, 9, 4);
      L.ground(95, 132);
      L.check(97);
      L.countq(103, 7, 'flower', [8, 9], 114, 0);
      L.row(117, 9, 5);
      L.enemy('bee', 124, 6);
      L.ground(135, 170);
      L.check(137);
      L.countq(141, 9, 'fish', [6, 8], 152, 2);
      L.row(155, 9, 3);
      L.gate(164);
    }
  },
  {
    id: 'mamafarm', theme: 'mamafarm', name: 'Де моя мама?', blurb: 'Допоможи малюкам знайти своїх мам', w: 170,
    build(L) {
      L.ground(0, 44);
      L.sign(3, 'Де моя мама? Візьми малюка й віднеси до його мами за хвірточкою. Новий малюк міняється з тим, якого несеш');
      L.baby(10, 'duck'); L.mom(16, 'duck');
      L.row(20, 9, 3);
      L.baby(25, 'cat'); L.baby(29, 'dog'); L.mom(35, 'dog');
      L.enemy('snail', 40, 10);
      L.ground(47, 92);
      L.check(49);
      L.baby(53, 'pig'); L.baby(57, 'hen'); L.mom(63, 'pig');
      L.block(68, 7, 3); L.row(68, 5, 3);
      L.enemy('frog', 76, 10);
      L.baby(81, 'cat'); L.mom(87, 'cat');
      L.ground(95, 134);
      L.check(97);
      L.baby(100, 'hen'); L.baby(104, 'duck'); L.baby(108, 'pig'); L.mom(114, 'pig');
      L.row(118, 9, 4);
      L.enemy('bee', 126, 6);
      L.ground(137, 170);
      L.check(139);
      L.baby(143, 'hen'); L.baby(147, 'dog'); L.mom(152, 'hen');
      L.row(156, 9, 3);
      L.gate(164);
    }
  },
  {
    id: 'smartfarm', theme: 'smartfarm', name: 'Розумна ферма', blurb: 'Годинник, лічилка й малюки — усе разом', w: 172,
    build(L) {
      L.ground(0, 44);
      L.sign(3, 'Розумна ферма! Тут і годинник, і лічилка, і малюки, що шукають маму');
      L.row(6, 9, 3);
      L.clockq(10, 4, [3, 8], 21, 1);
      L.baby(25, 'duck'); L.mom(31, 'duck');
      L.enemy('snail', 38, 10);
      L.ground(47, 94);
      L.check(49);
      L.countq(53, 6, 'butterfly', [5, 8], 64, 1);
      L.baby(68, 'pig'); L.baby(72, 'cat'); L.mom(78, 'cat');
      L.enemy('frog', 86, 10);
      L.ground(97, 136);
      L.check(99);
      L.clockq(103, 2, [5, 11], 114, 0);
      L.countq(117, 8, 'apple', [7, 10], 128, 1);
      L.ground(139, 172);
      L.check(141);
      L.baby(145, 'dog'); L.mom(150, 'dog');
      L.row(154, 9, 5);
      L.gate(166);
    }
  },
  {
    id: 'beaverdam', theme: 'beaverdam', name: 'Гребля Тріска', blurb: 'Битва з Бобром Тріском', w: 172, boss: 'bigbeaver',
    build(L) {
      L.ground(0, 46);
      L.sign(3, 'Гребля Тріска. Бобер перегородив річку! Визнач час, порахуй рибок і допоможи малюкові');
      L.clockq(10, 5, [3, 7], 21, 1);
      L.countq(24, 4, 'fish', [3, 5], 35, 1);
      L.enemy('snail', 40, 10);
      L.ground(49, 172);
      L.check(51);
      L.baby(55, 'duck'); L.mom(61, 'duck');
      L.row(66, 9, 4);
      L.check(75);
      L.enemy('bee', 84, 6);
      L.row(90, 9, 5);
      L.check(100);
      L.sign(119, 'Бобер Тріско! Коли він засяде гризти колоду — стріляй або стрибни на нього');
      L.power('candy', 125, 8);
      L.arena(129, 172);
      L.gate(168);
    }
  },
];

const DECOR_UNDER = {
  upside: (R, x, y) => R() < 0.55 ? { k: 'hangflower', x, y, c: ['#ff7ab8', '#ffd23f', '#9fe0ff', '#c5a8ff'][Math.floor(R() * 4)] } : { k: 'hangvine', x, y },
};
const DECOR = {
  postoffice: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'mailS', x, y } : r < 0.55 ? { k: 'lampS', x, y } : r < 0.8 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: '#ff7ab8' }; },
  firestation: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'hydrantS', x, y } : r < 0.6 ? { k: 'coneS', x, y } : { k: 'tuft', x, y }; },
  construction: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'coneS', x, y } : r < 0.7 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: '#ffd54a' }; },
  citynight: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'lampS', x, y } : r < 0.55 ? { k: 'hydrantS', x, y } : r < 0.75 ? { k: 'mailS', x, y } : { k: 'tuft', x, y }; },
  dogpark: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'boneS', x, y } : r < 0.5 ? { k: 'ballS', x, y, c: '#ff5c7a' } : r < 0.8 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: '#ffffff' }; },
  jetlab: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'gearS', x, y, c: '#9aa8bc' } : r < 0.7 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: '#4cb6ff' }; },
  switchworks: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'gearS', x, y, c: R() < 0.5 ? '#ff8a8a' : '#8ab0ff' } : { k: 'tuft', x, y }; },
  glassbridge: (R, x, y) => { const r = R(); return r < 0.5 ? { k: 'flower', x, y, c: ['#ffffff', '#9ff0e0'][Math.floor(R() * 2)] } : { k: 'tuft', x, y }; },
  inventfair: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'gearS', x, y, c: '#e0a040' } : r < 0.6 ? { k: 'flagsS', x, y, n: Math.floor(R() * 6) } : { k: 'tuft', x, y }; },
  gearden: (R, x, y) => { const r = R(); return r < 0.5 ? { k: 'gearS', x, y, c: '#c9a24a' } : { k: 'tuft', x, y }; },
  numberland: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'abacusS', x, y } : r < 0.55 ? { k: 'flower', x, y, c: ['#ff7a9a', '#ffd54a', '#4cb6ff'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  abcmeadow: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'abcS', x, y, ch: 'ABCDEFG'[Math.floor(R() * 7)], c: ['#9fd0ff', '#ff9fc4', '#9fe08a', '#ffd23f'][Math.floor(R() * 4)] } : r < 0.65 ? { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#ffffff'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  colorlab: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'paintS', x, y, c: ['#ff4d4d', '#ffd23f', '#3f8fff', '#4cc35a', '#a05ad8', '#ff9a2a'][Math.floor(R() * 6)] } : r < 0.7 ? { k: 'pencilS', x, y, c: RAINBOW[Math.floor(R() * 6)] } : { k: 'tuft', x, y }; },
  smartschool: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'bookS', x, y } : r < 0.5 ? { k: 'abacusS', x, y } : r < 0.7 ? { k: 'pencilS', x, y, c: RAINBOW[Math.floor(R() * 6)] } : { k: 'tuft', x, y }; },
  fruitmarket: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'basketS', x, y, it: ['apple', 'banana', 'grapes'][Math.floor(R() * 3)] } : r < 0.6 ? { k: 'flower', x, y, c: ['#ff7a9a', '#ffd54a', '#ffffff'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  hideforest: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'mushS', x, y } : r < 0.6 ? { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#ffffff'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  shapetown: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'shapeS', x, y, s: ['circle', 'square', 'triangle', 'star', 'heart'][Math.floor(R() * 5)] } : { k: 'tuft', x, y }; },
  bigshop: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'cartS', x, y } : r < 0.6 ? { k: 'basketS', x, y, it: ['apple', 'banana', 'grapes'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  hamsterhole: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'seedS', x, y } : r < 0.6 ? { k: 'mushS', x, y } : { k: 'tuft', x, y }; },
  cakehill: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'presentS', x, y, c: ['#ff7ab8', '#7fb8ff', '#9fe08a'][Math.floor(R() * 3)] } : r < 0.55 ? { k: 'confS', x, y } : { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#ffffff'][Math.floor(R() * 3)] }; },
  giftland: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'presentS', x, y, c: ['#ff7ab8', '#7fb8ff', '#ffd23f'][Math.floor(R() * 3)] } : r < 0.6 ? { k: 'balloonS', x, y, c: RAINBOW[Math.floor(R() * 6)] } : { k: 'tuft', x, y }; },
  plankbridge: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'stumpS', x, y } : r < 0.6 ? { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#ffffff'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  partyhall: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'balloonS', x, y, c: RAINBOW[Math.floor(R() * 6)] } : r < 0.65 ? { k: 'presentS', x, y, c: ['#ff7ab8', '#7fb8ff', '#9fe08a'][Math.floor(R() * 3)] } : { k: 'confS', x, y }; },
  raccoonden: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'stumpS', x, y } : r < 0.55 ? { k: 'mushS', x, y } : { k: 'tuft', x, y }; },
  clockvillage: (R, x, y) => { const r = R(); return r < 0.25 ? { k: 'clockS', x, y } : r < 0.55 ? { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#ffffff'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  countmeadow: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'butterS', x, y } : r < 0.6 ? { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#7fb8ff'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  mamafarm: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'fenceS', x, y } : r < 0.55 ? { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#ffffff'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  smartfarm: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'fenceS', x, y } : r < 0.45 ? { k: 'clockS', x, y } : { k: 'tuft', x, y }; },
  beaverdam: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'logS', x, y } : r < 0.55 ? { k: 'stumpS', x, y } : { k: 'tuft', x, y }; },
  inkwell: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'inkS', x, y } : r < 0.6 ? { k: 'bookS', x, y } : { k: 'tuft', x, y }; },
  schoolyard: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'hopS', x, y, n: 1 + Math.floor(R() * 3) } : r < 0.55 ? { k: 'ballS', x, y, c: ['#ff5c7a', '#4cb6ff', '#ffd23f'][Math.floor(R() * 3)] } : r < 0.8 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: '#ffffff' }; },
  fireworks: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'lanternS', x, y, c: ['#ffd23f', '#ff7ab8', '#8fd0ff'][Math.floor(R() * 3)] } : r < 0.7 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: '#ffd23f' }; },
  climbwall: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'matS', x, y, c: ['#4cb6ff', '#ff7ab8', '#7fd46a'][Math.floor(R() * 3)] } : r < 0.7 ? { k: 'ballS', x, y, c: '#ffd23f' } : { k: 'tuft', x, y }; },
  festsquare: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'flagsS', x, y, n: Math.floor(R() * 6) } : r < 0.6 ? { k: 'ballS', x, y, c: ['#ff5c7a', '#4cb6ff', '#ffd23f'][Math.floor(R() * 3)] } : { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a'][Math.floor(R() * 2)] }; },
  owlwood: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'mushS', x, y, c: ['#c0392b', '#e08a3a'][Math.floor(R() * 2)] } : r < 0.7 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#c9b6ff'][Math.floor(R() * 2)] }; },
  rainvalley: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'puddleS', x, y } : r < 0.65 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: ['#9fd0ff', '#ffffff', '#c9b6ff'][Math.floor(R() * 3)] }; },
  umbrellas: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'umbS', x, y } : r < 0.6 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#ffffff'][Math.floor(R() * 3)] }; },
  ticklegarden: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'daisyS', x, y, c: ['#ffffff', '#ffb3d6', '#fff3a8'][Math.floor(R() * 3)] } : r < 0.7 ? { k: 'flower', x, y, c: ['#ff7ab8', '#b98cff', '#4cb6ff'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  smiletown: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'smileS', x, y, c: ['#ffd23f', '#ff9fd0', '#8fd0ff'][Math.floor(R() * 3)] } : r < 0.6 ? { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#9fe08a'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  mashaland: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'heartS', x, y, c: ['#ff7ab8', '#ff4f9a'][Math.floor(R() * 2)] } : r < 0.55 ? { k: 'pstarS', x, y, c: ['#b06ad8', '#ffd23f'][Math.floor(R() * 2)] } : r < 0.8 ? { k: 'daisyS', x, y, c: ['#ffffff', '#ffb3d6'][Math.floor(R() * 2)] } : { k: 'flower', x, y, c: '#5cc8ff' }; },
  storks: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'hayS', x, y } : r < 0.6 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#ff7ab8', '#ffd54a'][Math.floor(R() * 3)] }; },
  pogopark: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'balloonS', x, y } : r < 0.6 ? { k: 'ballS', x, y, c: RAINBOW[Math.floor(R() * 6)] } : { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#9fe0ff'][Math.floor(R() * 3)] }; },
  inflatables: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'ballS', x, y, c: RAINBOW[Math.floor(R() * 6)] } : r < 0.7 ? { k: 'balloonS', x, y } : { k: 'tuft', x, y }; },
  cloudshop: (R, x, y) => R() < 0.6 ? { k: 'cloudpuffS', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#c5a8ff', '#ff9fd0'][Math.floor(R() * 3)] },
  paperplanes: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'pencilS', x, y, c: ['#ffd23f', '#4cb6ff', '#ff7ab8', '#7fd46a'][Math.floor(R() * 4)] } : r < 0.55 ? { k: 'paperboatS', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#8fb8ff', '#ff9fc4'][Math.floor(R() * 3)] }; },
  icecream: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'coneS', x, y, c: SCOOP_COLS[Math.floor(R() * 5)] } : r < 0.75 ? { k: 'sprinkleS', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#ff9fd0', '#9ff0c8'][Math.floor(R() * 3)] }; },
  rainbowroad: (R, x, y) => R() < 0.55 ? { k: 'cloudpuffS', x, y } : { k: 'flower', x, y, c: RAINBOW[Math.floor(R() * 6)] },
  seahorse: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'weed', x, y } : r < 0.75 ? { k: 'shell', x, y, c: ['#ffb3c6', '#ffd9a8', '#fff3e0'][Math.floor(R() * 3)] } : { k: 'starfish', x, y }; },
  pond: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'cattailS', x, y } : r < 0.55 ? { k: 'reed', x, y } : r < 0.7 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#ffb3d6', '#ffd54a'][Math.floor(R() * 3)] }; },
  cabbage: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'cabbageS', x, y } : r < 0.7 ? { k: 'carrotS', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#ffd54a'][Math.floor(R() * 2)] }; },
  hotair: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'pine', x, y } : r < 0.7 ? { k: 'snowmanS', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#ff9fd0', '#9fe0ff'][Math.floor(R() * 3)] }; },
  snowvalley: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'pine', x, y } : r < 0.7 ? { k: 'snowmanS', x, y } : { k: 'iglooS', x, y }; },
  aurora: (R, x, y) => R() < 0.6 ? { k: 'pine', x, y } : { k: 'crystal', x, y },
  sledtrack: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'slalom', x, y, c: R() < 0.5 ? '#ff5c7a' : '#4cb6ff' } : r < 0.75 ? { k: 'pine', x, y } : { k: 'snowmanS', x, y }; },
  iceberg: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'fishS', x, y } : r < 0.65 ? { k: 'iglooS', x, y } : { k: 'crystal', x, y }; },
  sailake: (R, x, y) => { if (y > 10 * T) return { k: 'none', x, y }; const r = R(); return r < 0.3 ? { k: 'lifebuoy', x, y } : r < 0.6 ? { k: 'reed', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#ff9fd0', '#ffd54a'][Math.floor(R() * 3)] }; },
  zoo: (R, x, y) => { if (y > 10 * T) return { k: 'none', x, y }; const r = R(); return r < 0.35 ? { k: 'pawprint', x, y } : r < 0.65 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#ff7ab8', '#ffd54a'][Math.floor(R() * 3)] }; },
  songmeadow: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'tulip', x, y, c: ['#ff5c8a', '#ffa83b', '#ffe14d', '#b28bff'][Math.floor(R() * 4)] } : r < 0.6 ? { k: 'noteS', x, y, c: ['#ff7ab8', '#4cb6ff', '#ffd23f', '#7fd46a'][Math.floor(R() * 4)] } : { k: 'flower', x, y, c: ['#ffffff', '#c5a8ff', '#ff9fd0'][Math.floor(R() * 3)] }; },
  treasure: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'gemS2', x, y, c: ['#ff7ab8', '#4cb6ff', '#7fd46a', '#ffd23f'][Math.floor(R() * 4)] } : r < 0.6 ? { k: 'rockpile', x, y } : { k: 'tuft', x, y }; },
  bananagrove: (R, x, y) => { if (y > 10 * T) return { k: 'none', x, y }; const r = R(); return r < 0.35 ? { k: 'bananaS', x, y } : r < 0.65 ? { k: 'fern', x, y, c: ['#4fbf5a', '#3fa64f', '#6fd46a'][Math.floor(R() * 3)] } : { k: 'flower', x, y, c: ['#ffffff', '#ff7ab8', '#ffd54a'][Math.floor(R() * 3)] }; },
  trampoline: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'ballS', x, y, c: RAINBOW[Math.floor(R() * 6)] } : r < 0.6 ? { k: 'balloonS', x, y } : { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#9fe0ff'][Math.floor(R() * 3)] }; },
  football: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'cornerflag', x, y, c: ['#ffd23f', '#ff7ab8', '#4cb6ff'][Math.floor(R() * 3)] } : r < 0.6 ? { k: 'tuft', x, y } : { k: 'flower', x, y, c: ['#ffffff', '#ffd54a'][Math.floor(R() * 2)] }; },
  mirrors: (R, x, y) => R() < 0.6 ? { k: 'jar', x, y, c: ['#ffd23f', '#ff9fd0', '#9fe0ff'][Math.floor(R() * 3)] } : { k: 'gearS', x, y, c: ['#ffb347', '#9fd8ff', '#ff9fcb'][Math.floor(R() * 3)] },
  observatory: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'telescopeS', x, y } : r < 0.7 ? { k: 'crystal', x, y } : { k: 'twinkle', x, y }; },
  peacock: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'featherS', x, y } : r < 0.65 ? { k: 'tulip', x, y, c: ['#ff5c8a', '#ffa83b', '#ffe14d', '#b28bff'][Math.floor(R() * 4)] } : { k: 'flower', x, y, c: ['#ffffff', '#ff7ab8', '#ffd54a'][Math.floor(R() * 3)] }; },
  soaplake: (R, x, y) => { if (y > 8 * T) return { k: 'none', x, y }; const r = R(); return r < 0.35 ? { k: 'bubbleS', x, y } : r < 0.55 ? { k: 'duckS', x, y } : r < 0.75 ? { k: 'reed', x, y } : { k: 'flower', x, y, c: ['#ff9fd0', '#9fe0ff', '#ffffff'][Math.floor(R() * 3)] }; },
  nutgrove: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'leafpile', x, y } : r < 0.6 ? { k: 'acornS', x, y } : r < 0.8 ? { k: 'mush', x, y, c: ['#ff6b8a', '#ffb347', '#e85d3a'][Math.floor(R() * 3)], glow: false } : { k: 'stump', x, y }; },
  seafort: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'cannonballs', x, y } : r < 0.5 ? { k: 'anchor', x, y } : r < 0.75 ? { k: 'shell', x, y, c: ['#ffb3c6', '#ffd9a8', '#fff3e0'][Math.floor(R() * 3)] } : { k: 'flag', x, y, c: RAINBOW[Math.floor(R() * 6)] }; },
  ropepark: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'ropecoil', x, y } : r < 0.6 ? { k: 'fern', x, y, c: ['#4fbf5a', '#3fa64f', '#6fd46a'][Math.floor(R() * 3)] } : r < 0.8 ? { k: 'mush', x, y, c: ['#ff6b8a', '#ffb347', '#b48cff'][Math.floor(R() * 3)], glow: false } : { k: 'flower', x, y, c: ['#ffffff', '#ff7ab8', '#ffd54a'][Math.floor(R() * 3)] }; },
  foxden: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'moonflower', x, y } : r < 0.6 ? { k: 'mush', x, y, c: ['#5fd3ff', '#b48cff', '#ff9fd9'][Math.floor(R() * 3)], glow: true } : r < 0.8 ? { k: 'firefly', x, y } : { k: 'root', x, y }; },
  hive: (R, x, y) => R() < 0.55 ? { k: 'honeypot', x, y } : { k: 'beeS', x, y },
  crystal: (R, x, y) => R() < 0.6 ? { k: 'gemS', x, y, c: ['#c9b6ff', '#9fe0ff', '#ffd6f0'][Math.floor(R() * 3)] } : { k: 'crystal', x, y },
  laundry: (R, x, y) => R() < 0.5 ? { k: 'peg', x, y, c: ['#ff7ab8', '#4cb6ff', '#ffd23f', '#7fd46a'][Math.floor(R() * 4)] } : { k: 'flower', x, y, c: ['#ff9fd0', '#9fe0ff', '#ffffff'][Math.floor(R() * 3)] },
  clocktower: (R, x, y) => ({ k: 'gearS', x, y, c: ['#ffb347', '#9fd8ff', '#ff9fcb'][Math.floor(R() * 3)] }),
  apiary: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'hiveS', x, y } : r < 0.6 ? { k: 'honeypot', x, y } : { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#ffffff'][Math.floor(R() * 3)] }; },
  savanna: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'acaciaS', x, y } : r < 0.7 ? { k: 'tuft', x, y } : { k: 'rockpile', x, y }; },
  seasonS: (R, x, y) => y > 10 * T ? { k: 'none', x, y } : R() < 0.5 ? { k: 'stree', x, y } : { k: 'sbush', x, y },
  rings: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'palmS', x, y } : r < 0.7 ? { k: 'shell', x, y, c: ['#ffb3c6', '#ffd9a8', '#fff3e0'][Math.floor(R() * 3)] } : { k: 'starfish', x, y }; },
  board: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'pawn', x, y, c: ['#fffaf2', '#3b3060', '#ff7ab8'][Math.floor(R() * 3)] } : r < 0.7 ? { k: 'dieS', x, y, n: 1 + Math.floor(R() * 6) } : { k: 'cardS', x, y }; },
  dicecastle: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'dieS', x, y, n: 1 + Math.floor(R() * 6) } : r < 0.7 ? { k: 'pawn', x, y, c: ['#fffaf2', '#ff7ab8'][Math.floor(R() * 2)] } : { k: 'torch', x, y }; },
  farm: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'fence', x, y } : r < 0.5 ? { k: 'hen', x, y } : r < 0.75 ? { k: 'sunflower', x, y } : { k: 'wheat', x, y }; },
  fair: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'balloonS', x, y } : r < 0.7 ? { k: 'flag', x, y, c: RAINBOW[Math.floor(R() * 6)] } : { k: 'popcorn', x, y }; },
  pumpkin: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'pumpkin', x, y } : r < 0.75 ? { k: 'candle', x, y } : { k: 'candybowl', x, y }; },
  bricks: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'toystack', x, y } : r < 0.75 ? { k: 'ball', x, y } : { k: 'duck', x, y }; },
  attic: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'yarnS', x, y, c: ['#4cb6ff', '#ff7ab8', '#ffd23f', '#7fd46a'][Math.floor(R() * 4)] } : r < 0.7 ? { k: 'bookstack', x, y } : { k: 'ball', x, y }; },
  paint: (R, x, y) => R() < 0.5 ? { k: 'paintpot', x, y, c: ['#ff4f5e', '#3f8fff', '#ffd23f'][Math.floor(R() * 3)] } : R() < 0.5 ? { k: 'brushes', x, y } : { k: 'flower', x, y, c: ['#ff7ab8', '#ffd54a', '#9fe0ff'][Math.floor(R() * 3)] },
  temple: (R, x, y) => R() < 0.5 ? { k: 'urn', x, y } : { k: 'obelisk', x, y },
  bay: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'umbrella', x, y } : r < 0.65 ? { k: 'shell', x, y, c: ['#ffb3c6', '#ffd9a8', '#fff3e0'][Math.floor(R() * 3)] } : { k: 'starfish', x, y }; },
  quarry: (R, x, y) => { const r = R(); return r < 0.45 ? { k: 'rockpile', x, y } : r < 0.75 ? { k: 'trafficcone', x, y } : { k: 'tuft', x, y }; },
  studio: (R, x, y) => R() < 0.5 ? { k: 'paintpot', x, y, c: ['#ff4f5e', '#3f8fff', '#ffd23f'][Math.floor(R() * 3)] } : { k: 'brushes', x, y },
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
  polarice: (R, x, y) => { const r = R(); return r < 0.3 ? { k: 'igloo', x, y } : r < 0.65 ? { k: 'pine', x, y } : { k: 'crystal', x, y }; },
  storm: (R, x, y) => { const r = R(); return r < 0.35 ? { k: 'puddle', x, y } : r < 0.7 ? { k: 'flower', x, y, c: ['#ffffff', '#9fe0ff', '#ffd54a'][Math.floor(R() * 3)] } : { k: 'tuft', x, y }; },
  moon: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'rock', x, y } : r < 0.7 ? { k: 'crystal', x, y } : { k: 'antenna', x, y }; },
  station: (R, x, y) => { const r = R(); return r < 0.4 ? { k: 'antenna', x, y } : r < 0.7 ? { k: 'crate2', x, y } : { k: 'gearS', x, y, c: ['#ffb347', '#9fd8ff', '#ff9fcb'][Math.floor(R() * 3)] }; },
  factory: (R, x, y) => R() < 0.5 ? { k: 'gearS', x, y, c: ['#ffb347', '#9fd8ff', '#ff9fcb'][Math.floor(R() * 3)] } : { k: 'crate2', x, y },
};

function buildLevel(idx) {
  const def = LEVELS[idx], W = def.w, map = new Uint8Array(W * ROWS);
  const set = (x, y, v) => { if (x >= 0 && x < W && y >= 0 && y < ROWS) map[y * W + x] = v; };
  const L = { def, W, map, stars: [], powers: [], enemies: [], movers: [], checks: [], signs: [], springs: [], water: [], winds: [], belts: [], beltDir: new Int8Array(W * ROWS), qContent: new Map(), portals: [], buttons: [], keys: [], hasDoors: false, gate: null, arena: null, decor: [], vines: [], launchers: [], wheels: [], beans: [], lanterns: [], rails: [], zips: [], breezes: [], storms: [], lowgravs: [], kites: [], bumpers: [], lightSets: [], flips: [], buckets: [], plates: [], boosts: [], stones: [], chicks: [], coops: [], duckSets: [], roos: [], totems: [], rings: [], dominoes: [], letterSpots: [], crystals: [], pendulums: [], soaps: [], nutWheels: [], swCannons: [], tramps: [], balls12: [], goals: [], mirrors: [], lamps: [], suns: [], swappers: [], foods: [], animals: [], padSets: [], runners: [], sleds: [], bridges19: [], planeRings: [], seahorses: [], sadClouds: [], tickles: [], mcol: new Map(), ropes: [], rockets: [], parcels: [], lockers: [], pdoors: [], fires: [], switches: [], swBlocks: [], ghosts: [], quizzes: [], words25: [], pots: [], cgates: [], shops26: [], hiders: [], fgates: [], shapes26: [], sdoors: [], candles: [], cakes: [], gifts: [], kdoors: [], planks: [], pbridges: [], babies: [], moms: [] };
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
    bucket(x, color, row) { later.push(() => L.buckets.push({ x: x * T + 12, gy: row != null ? row * T : groundY(x), color, splash: 0 })); },
    pwall(x, color, top, h) { top = top || 0; h = h || 10 - top; for (let y = top; y < top + h; y++) set(x, y, 14 + PAINTS.indexOf(color)); },
    stone(x, row) { later.push(() => { const y = row != null ? row : groundY(x) / T - 1; set(x, y, 17); L.stones.push({ x, y }); }); },
    plate(x, id) { later.push(() => { const gy = groundY(x); L.plates.push({ x: x * T + 12, tx: x, gy, row: gy / T - 1, id: id || 0, on: false }); }); },
    tdoor(x, id, top) { for (let y = top || 0; y < 10; y++) set(x, y, 19 + (id || 0)); },
    boost(x, dir) { later.push(() => L.boosts.push({ x: x * T + 24, gy: groundY(x), dir: dir || 1, glow: 0 })); },
    crack(x, top, h) { top = top || 0; h = h || 10 - top; for (let y = top; y < top + h; y++) set(x, y, 18); },
    dolphin(x0, x1, row) { L.movers.push({ dolphin: true, bx: x0 * T + 4, by: row * T - 10, w: 3 * T, minX: x0 * T, maxX: x1 * T, dir: 1, speed: 75, st: 0, air: false, vy: 0, jumpT: 1.5 + (x0 % 3) * 0.5, ax: 0, ay: 0, period: 1 }); },
    whale(x, row, top) { const by = row * T - 6; L.movers.push({ whale: true, bx: x * T, by, w: 4 * T, st: 0, ax: 0, ay: 0, period: 1 }); L.winds.push({ x0: (x + 1) * T + 4, x1: (x + 3) * T - 4, y: (top == null ? 1 : top) * T, y1: by + 4, cyc: 3.6, on: 1.5, ph: (x * 0.7) % 3, whale: true }); },
    chick(x, row) { later.push(() => L.chicks.push({ x: x * T + 12, y: row != null ? row * T : groundY(x) })); },
    coop(x) { later.push(() => L.coops.push({ x: x * T + 12, gy: groundY(x) })); },
    ducks(x0, x1, row, n) { const s = { x0: x0 * T + 12, x1: x1 * T - 12, y: row * T + 12, speed: 42, ducks: [] }, span = s.x1 - s.x0; for (let i = 0; i < n; i++) s.ducks.push({ off: i * span / n, down: false, fall: 0, x: 0 }); L.duckSets.push(s); },
    coaster(pts, stars) {
      const P = pts.map(([x, r]) => ({ x: x * T, y: r * T })), c0 = P[0].x + 24, c1 = P[P.length - 1].x - 24;
      L.movers.push({ coaster: true, pts: P, c0, c1, cx: c0, v: 0, state: 'idle', st: 0, bx: c0 - 24, by: railY(P, c0) - 18, w: 48, ax: 0, ay: 0, period: 1 });
      if (stars !== false) for (let x = P[0].x + 3 * T; x < P[P.length - 1].x - 2 * T; x += 2 * T) L.stars.push({ x: x + 12, y: railY(P, x + 12) - 33, t: (x * 0.01) % 6 });
    },
    pumpkin(x) { later.push(() => { const gy = groundY(x), h = 34; L.movers.push({ ball: true, bx: x * T + 2, by: gy - h, w: 40, h, vx: 0, vy: 0, rot: 0, ax: 0, ay: 0, period: 1 }); }); },
    thorns(x0, x1, row) { for (let x = x0; x < x1; x++) set(x, row == null ? 10 : row, 22); },
    bricks(x, top, h, w) { for (let i = 0; i < (w || 1); i++) for (let y = top; y < top + h; y++) set(x + i, y, 23); },
    roo(x) { later.push(() => L.roos.push({ x: x * T + 12, gy: groundY(x) })); },
    rooStop(x) { (L.rooStops = L.rooStops || []).push(x * T); },
    totem(x, want) { later.push(() => L.totems.push({ x: x * T + 12, gy: groundY(x), want })); },
    ring(x, row, len) { L.rings.push({ ax: x * T + 12, ay: row * T, len: (len || 3) * T }); },
    dominoes(x0, n) { for (let i = 0; i < n; i++) { const x = x0 + 3 * i; L.dominoes.push({ x, base: 10, i }); for (let y = 7; y < 10; y++) set(x, y, 24); if (i) { set(x, 10, 2); set(x, 11, 2); } } },
    letters(spots) { L.letterSpots = spots.map(([x, y]) => ({ x: x * T + 12, y: y * T + 12 })); },
    lake(x0, x1, row) { L.water.push({ x0: x0 * T, x1: x1 * T, y: row * T + 6 }); for (let x = x0; x < x1; x++) set(x, row, 25); },
    flowers(x0, x1, row) { for (let x = x0; x < x1; x++) set(x, row, 26); },
    snow(x0, x1, row) { for (let x = x0; x < x1; x++) set(x, row, 27); },
    honey(x, top, h, w) { for (let i = 0; i < (w || 1); i++) for (let y = top; y < top + h; y++) set(x + i, y, 28); },
    crystal(x, row, segs, dur) { L.crystals.push({ x: x * T + 12, y: row * T + 12, segs, dur: dur || 7 }); for (const [x0, x1, r] of segs) for (let xx = x0; xx < x1; xx++) set(xx, r, 30); },
    pulley(xa, xb, wheelRow, rowA, rowB) {
      const i = L.movers.length, minY = wheelRow * T + 50, maxY = 10 * T + 16, sum = (rowA + rowB) * T;
      L.movers.push({ pulley: true, lead: true, mate: i + 1, bx: xa * T, by: rowA * T, w: 3 * T, minY, maxY, sum, wheelY: wheelRow * T, ax: 0, ay: 0, period: 1 });
      L.movers.push({ pulley: true, mate: i, bx: xb * T, by: rowB * T, w: 3 * T, minY, maxY, ax: 0, ay: 0, period: 1 });
    },
    pendulum(x, row, len, amp, period, ph) { L.pendulums.push({ ax: x * T + 12, ay: row * T, len: len * T, amp, period, ph: ph || 0 }); },
    soap(x, row, to) { L.soaps.push({ hx: x * T + 12, hy: row * T + 12, to: to == null ? null : to * T + 12 }); },
    nutwheel(x, segs) {
      const tiles = [];
      for (const s of segs) {
        if (s[0] === 'gate') { const [, gx, top, h] = s; for (let y = top + h - 1; y >= top; y--) { tiles.push([gx, y, 'g']); set(gx, y, 33); } }
        else { const [x0, x1, row] = s, d = x1 >= x0 ? 1 : -1; for (let xx = x0; xx !== x1; xx += d) { tiles.push([xx, row, 'b']); set(xx, row, 32); } }
      }
      later.push(() => L.nutWheels.push({ x: x * T + 12, gy: groundY(x), tiles }));
    },
    swcannon(x, a0, a1, period, aim, ph) { later.push(() => L.swCannons.push({ x: x * T + 12, gy: groundY(x), a0: a0 * Math.PI / 180, a1: a1 * Math.PI / 180, period, aim: aim * T + 12, ph: ph || 0 })); },
    bars(x0, x1, row) { for (let x = x0; x < x1; x++) set(x, row, 35); },
    batut(x0, x1, need, row) { row = row == null ? 10 : row; for (let x = x0; x < x1; x++) set(x, row, 36); L.tramps.push({ x0: x0 * T, x1: x1 * T, need: need || 0, row }); },
    ball(x) { later.push(() => L.balls12.push({ hx: x * T + 2, hy: groundY(x) - 20 })); },
    goal(x, top) { later.push(() => { const gy = groundY(x), tiles = []; for (let y = top; y < gy / T; y++) { tiles.push([x + 2, y]); set(x + 2, y, 33); } L.goals.push({ x0: x * T + 4, x1: (x + 2) * T, gy, tiles }); }); },
    mirror(x, row, d, want) { L.mirrors.push({ tx: x, ty: row, d, want: want == null ? d : want }); },
    lamp(x, row, dir) { const D = { r: [1, 0], l: [-1, 0], u: [0, -1], d: [0, 1] }[dir]; L.lamps.push({ tx: x, ty: row, dx: D[0], dy: D[1] }); },
    sunflower(x, row, dx, top, h) { const door = []; for (let y = top; y < top + h; y++) { door.push([dx, y]); set(dx, y, 37); } L.suns.push({ tx: x, ty: row, door }); },
    swapper(x, row) { L.swappers.push({ x: x * T + 12, y: row * T + 12 }); },
    // озеро з течією назад (вплав не перебратися) і вітрильник біля лівого берега
    sailboat(x0, x1, row) {
      L.water.push({ x0: x0 * T, x1: x1 * T, y: row * T + 6, flow: -140 });
      for (let x = x0; x < x1; x++) set(x, 11, 1);
      L.movers.push({ sailboat: true, bx: x0 * T, by: row * T, w: 3 * T, x0: x0 * T, x1: x1 * T, vx: 0, puff: 0, ax: 0, ay: 0, period: 1 });
    },
    food(x, kind, row) { later.push(() => L.foods.push({ hx: x * T + 12, hy: (row != null ? row * T : groundY(x)) - 14, kind })); },
    // бегемотик сидить на березі x; наївшись, лягає посеред річки rx0..rx1
    hippo(x, rx0, rx1, row) {
      L.water.push({ x0: rx0 * T, x1: rx1 * T, y: row * T + 6, flow: -140 });
      for (let xx = rx0; xx < rx1; xx++) set(xx, 11, 1);
      const i = L.movers.length, mx = Math.round((rx0 + rx1) / 2) - 2;
      L.movers.push({ hippo: true, bx: mx * T, by: row * T - 10, w: 4 * T - 16, state: 'gone', ax: 0, ay: 0, period: 1 });
      later.push(() => L.animals.push({ kind: 'hippo', x: x * T + 12, gy: groundY(x), mover: i }));
    },
    // жирафа стоїть у x, її голова (ліфт) — у hx, нагорі на рядку topRow
    giraffe(x, hx, topRow) {
      const i = L.movers.length;
      L.movers.push({ giraffe: true, bx: hx * T, by: topRow * T - 2, w: 2 * T, yTop: topRow * T - 2, yBot: 0, ax: 0, ay: 0, period: 1 });
      later.push(() => { L.movers[i].yBot = groundY(hx) - 2; L.animals.push({ kind: 'giraffe', x: x * T + 12, gy: groundY(x), mover: i }); });
    },
    // слоник у x пускає фонтан у стовпчику fx..fx+2 до рядка ftop
    elephant(x, fx, ftop) { later.push(() => L.animals.push({ kind: 'elephant', x: x * T + 12, gy: groundY(x), fx0: fx * T + 4, fx1: (fx + 2) * T - 4, ftop: ftop * T })); },
    // барабани-повторюшки: n барабанів через 4 клітинки, мелодія seq, ворота в стовпчику gx від рядка gtop
    drums(x, row, n, seq, gx, gtop) {
      const idx = [];
      for (let i = 0; i < n; i++) { idx.push(L.movers.length); L.movers.push({ drum: true, bx: (x + i * 4) * T, by: row * T + 4, w: 2 * T, ax: 0, ay: 0, period: 1 }); }
      const door = []; for (let y = gtop; y < 10; y++) { door.push([gx, y]); set(gx, y, 33); }
      for (let y = 0; y < gtop; y++) set(gx, y, 2);
      L.padSets.push({ drums: idx, seq, door });
    },
    // повітряна куля стоїть на землі в x і приземляється, коли долетить до стовпчика x1
    hotair(x, x1) { later.push(() => L.movers.push({ hotair: true, bx: x * T, by: groundY(x) - 18, w: 44, x1: x1 * T, state: 'idle', vy: 0, ax: 0, ay: 0, period: 1 })); },
    // сніжка в x: починає з радіуса r0 і росте, поки котиться, до rMax
    snowball(x, r0, rMax) { later.push(() => L.movers.push({ snowball: true, hx: x * T + 12, r0: r0 || 12, rMax: rMax || 30, gy: groundY(x), bx: x * T, by: groundY(x) - 24, w: 24, ax: 0, ay: 0, period: 1 })); },
    // зірочка-втікачка в x, тікає в межах від x0 до x1
    runner(x, x0, x1) { later.push(() => L.runners.push({ x: x * T + 12, x0: x0 * T, x1: x1 * T, gy: groundY(x) })); },
    // санчата стоять у x і зупиняються біля прапорця x1
    sled(x, x1) { later.push(() => L.sleds.push({ x: x * T + 12, x1: x1 * T + 12, gy: groundY(x) })); },
    // лелека: маршрут [[x, рядок спинки], ...]; 'g' — стоїть на землі
    stork(path) {
      later.push(() => {
        const pts = path.map(([x, r]) => [x * T + 12, r === 'g' ? groundY(Math.round(x)) - 26 : r * T]);
        L.movers.push({ special15: true, stork: true, path: pts, w: 2 * T, bx: pts[0][0] - T, by: pts[0][1], face: Math.sign(pts[1][0] - pts[0][0]) || 1, ax: 0, ay: 0, period: 1 });
      });
    },
    // насос у px накачує кульку-ліфт у lx (2 плитки), що піднімає до рядка topRow
    pumpLift(px, lx, topRow) {
      later.push(() => {
        const li = L.movers.length, gy = groundY(lx), pgy = groundY(px);
        L.movers.push({ special15: true, lift19: true, bx: lx * T, by: gy - 2, w: 2 * T, yBot: gy - 2, yTop: topRow * T - 2, ax: 0, ay: 0, period: 1 });
        L.movers.push({ special15: true, pump: true, lift: li, bx: px * T - 2, by: pgy - 22, gy: pgy, w: 28, ax: 0, ay: 0, period: 1 });
      });
    },
    // насос у px надуває місток у рядку row від x0 до x1
    pumpBridge(px, x0, x1, row) {
      const tiles = []; for (let x = x0; x < x1; x++) { tiles.push([x, row]); set(x, row, 41); }
      const bi = L.bridges19.length; L.bridges19.push({ tiles });
      later.push(() => { const pgy = groundY(px); L.movers.push({ special15: true, pump: true, bridge: bi, bx: px * T - 2, by: pgy - 22, gy: pgy, w: 28, ax: 0, ay: 0, period: 1 }); });
    },
    // паперовий літачок стоїть на стартовому майданчику в x
    plane(x) { later.push(() => L.movers.push({ special15: true, plane: true, bx: x * T, by: groundY(x) - 10, w: 40, ax: 0, ay: 0, period: 1, state: 'idle' })); },
    // кільце в повітрі: літачок, що пролетить крізь нього, отримає ще два підкидання
    hoop(x, y) { L.planeRings.push({ x: x * T + 12, y: y * T + 12 }); },
    // кулька морозива, що тане під ногами: x, рядок верху, ширина в плитках
    scoop(x, row, w) { const n = L.movers.filter(m => m.scoop).length; L.movers.push({ special15: true, scoop: true, bx: x * T, by: row * T, w: (w || 2) * T, ax: 0, ay: 0, period: 1, col: SCOOP_COLS[n % SCOOP_COLS.length] }); },
    // сильна течія назад у воді (без морського коника не пропливеш)
    current(x0, x1, row, flow) { L.water.push({ x0: x0 * T, x1: x1 * T, y: row * T + 6, flow: flow || -150 }); },
    // морський коник чекає у воді в x, рядок row
    seahorse(x, row) { L.seahorses.push({ x: x * T + 12, y: row * T + 12 }); },
    // сумна хмаринка: x, рядок, ширина; після пострілу стає хмаринкою-містком (плитки 3)
    sadcloud(x, row, w) { L.sadClouds.push({ x0: x, row, w: w || 3 }); },
    // лоскотна квіточка на землі в x: після пострілу підкидає, як пружинка
    tickle(x) { later.push(() => L.tickles.push({ x: x * T + 12, gy: groundY(x) })); },
    // кубик-смайлик: x, рядок верху, на скільки рядків підніметься після пострілу, ширина
    mood(x, row, rise, w) { L.movers.push({ special15: true, mood: true, bx: x * T, by: row * T, w: (w || 2) * T, rise: rise * T, ax: 0, ay: 0, period: 1 }); },
    // кубики Маші: удар знизу — вилітає зірочка; col — 'B' (блакитні) чи 'P' (рожеві)
    mbricks(x, row, w, col) { for (let i = 0; i < (w || 1); i++) { set(x + i, row, 7); L.qContent.set(row * W + x + i, 'star'); L.mcol.set(row * W + x + i, col || 'B'); } },
    // скакалка над землею: x, ширина в плитках (типово 3); два зайчики крутять її
    rope(x, w) { later.push(() => L.ropes.push({ x0: x * T, x1: (x + (w || 3)) * T, gy: groundY(x), ph: (x * 0.7) % TAU })); },
    // ракета на землі в x: «Ріг» поруч — і підкидає так, що ноги доходять до рядка top
    rocket(x, top) { later.push(() => L.rockets.push({ x: x * T + 12, gy: groundY(x), top: top * T })); },
    // посилка (x, рядок) і поштомат (x, id, скільки посилок треба): доставлена посилка відчиняє шлагбаум pdoor(x, id, top) — стовпчик плиток від рядка top до 9
    parcel(x, row) { L.parcels.push({ x: x * T + 12, y: row * T + 12 }); },
    locker(x, id, need) { later.push(() => L.lockers.push({ x: x * T, gy: groundY(x), id: id || 0, need: need || 1 })); },
    pdoor(x, id, top) { for (let y = top; y < 10; y++) set(x, y, 2); L.pdoors.push({ x, id: id || 0, top }); },
    // вогонь: x, верхній рядок, висота в плитках; гасиш водою з пожежного шланга
    fire(x, row, h) { L.fires.push({ x, row, h: h || 2 }); },
    // прибрати плитки (коридори під тріснутими плитами) і ряд тріснутих плит (плитка 18)
    clear(x, row, w, h) { for (let i = 0; i < w; i++) for (let j = 0; j < (h || 1); j++) set(x + i, row + j, 0); },
    cracks(x, row, w) { for (let i = 0; i < (w || 1); i++) set(x + i, row, 18); },
    // перемикач на землі й червоні/сині кубики: на початку тверді червоні
    sw(x) { later.push(() => L.switches.push({ x: x * T + 12, gy: groundY(x) })); },
    rblk(x, row, w, h) { for (let i = 0; i < (w || 1); i++) for (let j = 0; j < (h || 1); j++) L.swBlocks.push({ x: x + i, y: row + j, c: 'R' }); },
    bblk(x, row, w, h) { for (let i = 0; i < (w || 1); i++) for (let j = 0; j < (h || 1); j++) L.swBlocks.push({ x: x + i, y: row + j, c: 'B' }); },
    // невидимий місток: тверді плитки лише поки діють чарівні окуляри
    ghost(x, row, w) { for (let i = 0; i < (w || 1); i++) L.ghosts.push({ x: x + i, y: row }); },
    // частина 25: приклад (три кубики-відповіді в рядку 6 через 2 клітинки, правильна — на місці pos) і двері-стовп
    quiz(x, a, op, b, wrong, door, pos) {
      const ans = op === '+' ? a + b : a - b, nums = wrong.slice(); nums.splice(pos || 0, 0, ans);
      const opts = nums.map((n, j) => ({ tx: x + j * 3, ty: 6, n }));
      for (const o of opts) set(o.tx, o.ty, 2);
      for (let y = 1; y < 10; y++) set(door, y, 2);
      L.quizzes.push({ a, op, b, ans, opts, door, top: 1 });
    },
    // англійське слово: дошка з картинкою на x, літери по черзі на землі через step клітинок, зайві літери [[x, row, 'K'], …]
    word(x, w, door, step, decoys) {
      step = step || 3;
      const ws = { w, door, top: 1, bx: x * T + 12, gy: 10 * T, letters: [...w].map((ch, i) => ({ ch, tx: x + 3 + i * step })), decoys: (decoys || []).map(([dx, row, ch]) => ({ ch, x: dx * T + 12, y: row * T + 12 })) };
      for (let y = 1; y < 10; y++) set(door, y, 2);
      later.push(() => { ws.gy = groundY(x); for (const l of ws.letters) { l.x = l.tx * T + 12; l.y = groundY(l.tx) - 16; } });
      L.words25.push(ws);
    },
    // відерце з фарбою (red, yellow, blue); row — якщо стоїть на уступі
    pot(x, c, row) { const p = { x: x * T + 12, gy: row ? row * T : 10 * T, c }; if (!row) later.push(() => { p.gy = groundY(x); }); L.pots.push(p); },
    // кольорові ворота: відчиняються, коли фарба на гриві того самого кольору
    cgate(x, c) { for (let y = 1; y < 10; y++) set(x, y, 2); L.cgates.push({ x, c, top: 1 }); },
    // частина 26: список покупок — дошка на x, товари [[k, x, row], …] (row не вказано — на землі), каса-двері door (рядки 1–9)
    shop(x, list, door, items) {
      const s = { list, door, top: 1, bx: x * T + 12, gy: 10 * T, items: items.map(([k, tx, row]) => ({ k, tx, row, x: tx * T + 12, y: row ? row * T + 12 : 0 })) };
      for (let y = 1; y < 10; y++) set(door, y, 2);
      later.push(() => { s.gy = groundY(x); for (const it of s.items) if (!it.row) it.y = groundY(it.tx) - 14; });
      L.shops26.push(s);
    },
    // кущ, у якому сховався друг (bunny, hedgehog, fox, squirrel, mouse, duck); row — якщо кущ на уступі
    hide(x, k, row) { const h = { x: x * T + 12, gy: row ? row * T : 10 * T, k }; if (!row) later.push(() => { h.gy = groundY(x); }); L.hiders.push(h); },
    // будиночок друзів: стовп відчиняється, коли знайдено n друзів (рахуються всі знайдені на рівні)
    fgate(x, n) { for (let y = 1; y < 10; y++) set(x, y, 2); L.fgates.push({ x, n, top: 1 }); },
    // фігура (circle, square, triangle, star, heart) і двері з діркою такої фігури
    shape(x, s, row) { const p = { x: x * T + 12, y: row ? row * T + 12 : 0, s }; if (!row) later.push(() => { p.y = groundY(x) - 14; }); L.shapes26.push(p); },
    sdoor(x, s) { for (let y = 1; y < 10; y++) set(x, y, 2); L.sdoors.push({ x, s, top: 1 }); },
    // частина 27: свічка (row — якщо на уступі); торт-двері cake(x, n) відчиняються, коли на рівні горить n свічок
    candle(x, row) { const c = { x: x * T + 12, gy: row ? row * T : 10 * T }; if (!row) later.push(() => { c.gy = groundY(x); }); L.candles.push(c); },
    cake(x, n) { for (let y = 1; y < 10; y++) set(x, y, 2); L.cakes.push({ x, n, top: 1 }); },
    // три подарунки в рядку 6 на x, x+3, x+6; ключик у подарунку key (0–2) відчиняє двері door (рядки 1–9)
    gifts(x, key, door) {
      const group = L.kdoors.length;
      for (let j = 0; j < 3; j++) { set(x + j * 3, 6, 2); L.gifts.push({ tx: x + j * 3, ty: 6, key: j === key, group }); }
      for (let y = 1; y < 10; y++) set(door, y, 2);
      L.kdoors.push({ x: door, top: 1, group });
    },
    // дощечка (row — якщо на уступі) і міст через яму від x0 до x1 (там не має бути землі); одна дощечка — дві клітинки
    plank(x, row) { const p = { x: x * T + 12, y: row ? row * T + 12 : 0 }; if (!row) later.push(() => { p.y = groundY(x) - 12; }); L.planks.push(p); },
    pbridge(x0, x1) { L.pbridges.push({ x0, x1, need: Math.ceil((x1 - x0) / 2) }); },
    // частина 28: «Котра година?» — дошка з годинником (стрілка на hour), кубики-відповіді як у quiz
    clockq(x, hour, wrong, door, pos) {
      const nums = wrong.slice(); nums.splice(pos || 0, 0, hour);
      const opts = nums.map((n, j) => ({ tx: x + j * 3, ty: 6, n }));
      for (const o of opts) set(o.tx, o.ty, 2);
      for (let y = 1; y < 10; y++) set(door, y, 2);
      L.quizzes.push({ kind: 'clock', ans: hour, opts, door, top: 1 });
    },
    // лічилка: на дошці n картинок (butterfly, apple, flower, fish), кубики-відповіді як у quiz
    countq(x, n, pic, wrong, door, pos) {
      const nums = wrong.slice(); nums.splice(pos || 0, 0, n);
      const opts = nums.map((v, j) => ({ tx: x + j * 3, ty: 6, n: v }));
      for (const o of opts) set(o.tx, o.ty, 2);
      for (let y = 1; y < 10; y++) set(door, y, 2);
      L.quizzes.push({ kind: 'count', pic, ans: n, opts, door, top: 1 });
    },
    // малюк (duck, cat, dog, hen, pig) і хвірточка mom(x, k): за нею чекає мама, відчиняється, коли принесеш її малюка
    baby(x, k, row) { const b = { x: x * T + 12, y: row ? row * T : 10 * T, k }; if (!row) later.push(() => { b.y = groundY(x); }); L.babies.push(b); },
    mom(x, k) { for (let y = 1; y < 10; y++) set(x, y, 2); const m = { x, k, top: 1, gy: 10 * T }; later.push(() => { m.gy = groundY(x + 1); }); L.moms.push(m); },
    dirt(x, top, h, w) { for (let i = 0; i < (w || 1); i++) for (let y = top; y < top + h; y++) set(x + i, y, 39); },
    hole(x, top, h, w) { for (let i = 0; i < (w || 1); i++) for (let y = top; y < top + h; y++) set(x + i, y, 0); },
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
  const R = rng(idx * 1013 + 77), avoid = [...L.signs, ...L.checks, ...L.springs, ...L.buttons, ...L.portals, ...L.beans, ...L.lanterns, ...L.coops, ...L.chicks, ...L.roos, ...L.totems, ...L.pots, ...L.words25.map(w => ({ x: w.bx })), ...L.hiders, ...L.shops26.map(w => ({ x: w.bx })), L.gate].filter(Boolean).map(o => o.x);
  for (const d of L.dominoes) avoid.push(d.x * T + 12, d.x * T + 60);
  for (const c of L.crystals) avoid.push(c.x);
  for (const q of L.pendulums) avoid.push(q.ax);
  for (const o of [...L.nutWheels, ...L.swCannons]) avoid.push(o.x - 24, o.x + 24);
  for (const s of L.soaps) avoid.push(s.hx);
  for (const o of [...L.mirrors, ...L.lamps, ...L.suns]) avoid.push(o.tx * T + 12);
  for (const g of L.goals) avoid.push(g.x0, g.x1);
  for (const o of L.swappers) avoid.push(o.x);
  for (const f of L.foods) avoid.push(f.hx);
  for (const a of L.animals) avoid.push(a.x, a.x + 30, a.fx0 || a.x);
  for (const m of L.movers) if (m.drum) avoid.push(m.bx + 24);
  for (const m of L.movers) if (m.hotair || m.snowball) avoid.push(m.bx + 22, m.hx || m.bx);
  for (const r of L.runners) avoid.push(r.x);
  for (const q of L.sleds) avoid.push(q.x, q.x1);
  for (const m of L.movers) if (m.pump || m.lift19 || m.stork) avoid.push(m.bx + 14, m.bx + 34);
  for (const m of L.movers) if (m.plane) avoid.push(m.bx + 4, m.bx + 36);
  for (const s of L.duckSets) for (let x = s.x0 - 20; x <= s.x1 + 20; x += 30) avoid.push(x);
  for (const m of L.movers) if (m.ball || m.coaster) avoid.push(m.bx + 20);
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
