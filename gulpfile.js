"use strict";

const FRONT_PATH = "/frontend/";
const BUILD_PATH = "/build/";

const gulp = require("gulp");
const plumber = require(`gulp-plumber`);
const notify = require(`gulp-notify`);
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

const dartSass = require(`sass`);
const gulpSass = require(`gulp-sass`);
const sass = gulpSass(dartSass);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const csso = require(`gulp-csso`);

const webpack = require("webpack-stream");
const webpackConfig = require(`./webpack.config.js`);

const imagemin = require(`gulp-imagemin`);
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const cheerio = require("gulp-cheerio");

const fileInclude = require("gulp-file-include");
const typograf = require(`gulp-typograf`);

// JS
const js = () => {
  return gulp
    .src(`.${FRONT_PATH}js/app.js`)
    .pipe(
      plumber(
        notify.onError({
          title: `js`,
          message: `Error: <%= error.message %>`,
        }),
      ),
    )
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(`.${BUILD_PATH}js`))
    .pipe(browserSync.stream());
};
exports.js = js;

// Стили
const styles = () => {
  return gulp
    .src(`.${FRONT_PATH}scss/style.scss`, {sourcemaps: true})
    .pipe(
      plumber(
        notify.onError({
          title: `Styles`,
          message: `Error: <%= error.message %>`,
        }),
      ),
    )
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename(`style.min.css`))
    .pipe(gulp.dest(`.${BUILD_PATH}css`, {sourcemaps: `.`}))
    .pipe(browserSync.stream());
};
exports.styles = styles;

// Изображения
const img = () => {
  return gulp
    .src(`.${FRONT_PATH}img/**/*.{jpg,gif,png,jpeg,svg}`)
    .pipe(
      imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({quality: 90, progressive: true}),
        imagemin.svgo({
          plugins: [
            {
              removeDimensions: true,
            },
          ],
        }),
      ]),
    )
    .pipe(gulp.dest(`.${BUILD_PATH}img`));
};
exports.img = img;

// Webp
const webpImages = () => {
  return gulp
    .src(`.${FRONT_PATH}img/**/*.{jpg,gif,png,jpeg}`)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(`.${BUILD_PATH}img`));
};

exports.webp = webpImages;

// SVG спрайт
const sprite = () => {
  return gulp
    .src(`.${FRONT_PATH}img/icons/icon-*.svg`)
    .pipe(svgstore({inlineSvg: true}))
    .pipe(
      cheerio({
        run: ($) => {
          $("symbol").attr("fill", "none");
        },
        parserOptions: {xmlMode: true},
      }),
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest(`.${BUILD_PATH}img`));
};
exports.sprite = sprite;

// HTML
const html = () => {
  return gulp
    .src(`.${FRONT_PATH}html/[^_]*.html`)
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(
      typograf({
        locale: [`ru`, `en-US`],
      }),
    )
    .pipe(gulp.dest(`.${BUILD_PATH}`))
    .pipe(browserSync.stream());
};
exports.html = html;

// Сервер
const server = (done) => {
  browserSync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};
exports.webserver = server;

// отслеживаем изменения в проекте
const watch = () => {
  gulp.watch(`.${FRONT_PATH}scss/**/*.scss`, gulp.series(styles));
  gulp.watch(`.${FRONT_PATH}js/**/*.js`, gulp.series(js));
  gulp.watch(`.${FRONT_PATH}html/**/*.html`, gulp.series(html));
  console.log("Running watch...");
};

// КОМАНДЫ ЗАПУСКА
exports.default = gulp.series(gulp.parallel(styles, js, html), server, watch);
exports.build = gulp.series(gulp.parallel(styles, js, html, img));
