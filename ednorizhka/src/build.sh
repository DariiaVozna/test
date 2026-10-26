#!/bin/sh
# Збирає гру «Зоряна Єдиноріжка» з цієї папки в один файл ../index.html
# Запуск: sh ednorizhka/src/build.sh
set -e
cd "$(dirname "$0")"

# Порядок важливий: малюнки й світи → рівні → рушій → екрани
JS="js/art.js js/world.js js/art2.js js/art3.js js/art4.js js/art5.js js/art6.js js/art7.js js/art8.js js/art9.js js/levels.js js/engine.js js/engine2.js js/engine3.js js/engine4.js js/engine5.js js/ui.js"

{
  printf '<!doctype html>\n<html lang="uk">\n<head>\n<meta charset="utf-8">\n'
  printf '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">\n'
  printf '<meta name="theme-color" content="#ffc6e4">\n'
  printf '<style>html{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%%}[hidden]{display:none!important}</style>\n'
  awk '/<div id="app">/{exit} {print}' head.html | grep -v 'claude:viewport-fit-sides'
  printf '</head>\n<body>\n'
  awk 'f || /<div id="app">/ {f=1; print}' head.html
  echo '<script>'
  cat $JS | sed "s/^'use strict';$//"
  echo '</script>'
  printf '\n</body>\n</html>\n'
} > ../index.html

# Перевірка синтаксису, якщо є node
if command -v node >/dev/null 2>&1; then
  TMP="${TMPDIR:-/tmp}/ednorizhka-check.js"
  { echo "'use strict';"; cat $JS | sed "s/^'use strict';$//"; } > "$TMP"
  node --check "$TMP" && echo "Синтаксис ОК"
  rm -f "$TMP"
fi
echo "Готово: $(wc -c < ../index.html) байт у ednorizhka/index.html"
