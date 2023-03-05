const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const del = require('del');

 const styles = () => {
  return gulp.src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const watcher = () => {
  gulp.watch('source/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('source/*.html').on('change', sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
)

const images = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
    ]))
}

exports.images = images;


const sprite = () => {
  return gulp.src('source/img/**/icon-*.svg')
    .pipe(svgstore())
    .pipe(rename('spriteicons.svg'))
    .pipe(gulp.dest('build/img'))
}

exports.sprite = sprite;

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/*.html",
    "source/css/normalize.css"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}

exports.copy = copy;

const clean = () => {
  return del('build');
}

exports.clean = clean


exports.build = gulp.series(
  clean, copy, styles, images, sprite
)

exports.start = gulp.series(
  clean, copy, styles, images, sprite, server
)
