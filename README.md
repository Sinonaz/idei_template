# Сборщик Дизайн-студии IDEI

- В основе лежат: Gulp, Webpack, SCSS
- Дополнительные инструменты: Stylelint

## Структура

```
  builds/
    fonts/                    - папка с шрифтами
  source/
    html/                     - папка с html страницами
      modules/                  - различные модули для страниц (head, footer, header)
      pages/                    - основной контент страницы (main)
      index.html                - дефолтная главная страница
    img/                      - папка с изображениями
      pages/                    - папка с изображениями страниц
      icons/                    - папка с свг иконками
    js/                       - папка с JS-модулями
      app.js                    - точка вхождения JS-модулей
    scss/                     - папка с SCSS модулями
      blocks/                   - папка для стилей блоков по БЭМ
      common/                   - папка для общих стилей
        fonts.scss                - подключение шрифтов
        global.scss               - глобальные стили
        variables.scss            - SCSS переменные (размеры, цвета)
        mixin.scss                - SCSS миксины
        responsive.scss           - блок .container
        animation.scss            - анимации
      plugins/                  - папка со стилями для переопредедения стилей стилей плагинов
      style.scss                - подключение стилей
  .editorconfig               - настройки для редактора кода
  .gitignore                  - файлы/папки игнорируемые Git
  .prettierrc                 - настройки форматирования кода (Prettier)
  .stylelintrc                - настройки для линтера SCSS (Stylelint)
  babel.config.json           - настройки для Babel
  package.json                - зависимости, скрипты и базовая информация
  gulpfile.js                 - настройка Gulp
  webpack.config.js           - настройка WebPack
```

## Основные команды

Установка:

```bash
  npm i
```

Запуск:

```bash
  npm start
```

Проверка Stylelint:

```bash
  npm run stylelint
```

Исправление с помощью Stylelint:

```bash
  npm run stylelint:fix
```

## Авторы

- [@ArtemVafin](https://www.github.com/VafinArtem)

## License

[ISC](https://choosealicense.com/licenses/isc/)
