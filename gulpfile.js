const { src, watch, dest, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// css
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');

// imagenes
const imagemin = require('gulp-imagemin');

const paths = {
  css: "./src/scss/**/*.scss",
  imagenes: "./src/img/**/*"
}

function css() {
  return src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler(err) {
        console.log("Error:", err.message);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(postcss([autoprefixer() /*cssnano()*/]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css'));
}

function imagenes() {
  return src(paths.imagenes)
    .pipe(imagemin({
      optimizationLevel: 3
    }))
    .pipe(dest('build/img'));
}

function dev() {
  watch(paths.css, css)
  watch(paths.imagenes, imagenes)
}

exports.css = css;
exports.imagenes = imagenes;
exports.dev = dev;
exports.default = series(css, imagenes, dev);