"use strict";

// npm install --save-dev gulp
// https://gulpjs.com/
const { series, parallel, src, dest, watch } = require("gulp");

// npm install --save-dev postcss gulp-postcss autoprefixer cssnano
// https://www.npmjs.com/package/gulp-postcss
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");

// npm install sass gulp-sass --save-dev
// https://www.npmjs.com/package/gulp-sass
const sass = require('gulp-sass')(require('sass'));

// npm install --save-dev browser-sync
// https://browsersync.io/docs/gulp
const browserSync = require("browser-sync").create();

// npm install --save-dev bourbon
const bourbon = require("bourbon").includePaths;

// npm install --save-dev gulp-plumber
// https://www.npmjs.com/package/gulp-plumber
const plumber = require("gulp-plumber");

// npm install --save-dev gulp-rename
// https://www.npmjs.com/package/gulp-rename
const rename = require("gulp-rename");

// npm install gulp-concat-util --save-dev
// https://www.npmjs.com/package/gulp-concat-util
const concat = require('gulp-concat-util');

// npm install gulp-uglify --save-dev
// https://www.npmjs.com/package/gulp-uglify
const uglify = require("gulp-uglify");

// npm install ansi-colors fancy-log --save-dev
const c = require('ansi-colors');
const log = require('fancy-log');

// npm install gulp-util --save-dev
const gutil  = require('gulp-util');

var proxy = 'http://dev.test';

var basePaths = {
  src: "dev/",
  dest: ""
};
var paths = {
  scripts: {
    src: basePaths.src + "scripts/",
    dest: basePaths.dest + "js/"
  },
  styles: {
    src: basePaths.src + "styles/",
    dest: basePaths.dest + "css/"
  }
};
var reportError = function (error) {
    gutil.beep();
    log(c.yellow(
      `\n File: ${c.red.bold( error.relativePath + " " + error.line + ":" + error.column )}
      \n Error: ${c.cyan(error.messageOriginal)}`));
    this.emit('end');
};

function styles(done) {
  return src(paths.styles.src + "umf-product-data.scss")
    .pipe(plumber({errorHandler: reportError}))
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: [].concat( bourbon ),
    }))
    .pipe(dest(paths.styles.dest))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream({match: "**/*.css"}));
    done();
}
function scripts(done) {
  return src(paths.scripts.src + "**/*")
    .pipe(plumber())
    .pipe(concat("scripts.js"))
    .pipe(concat.header('(function($) {\n'))
    .pipe(concat.footer('\n})(jQuery);'))
    .pipe(dest(paths.scripts.dest))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
    done();
}
function reload(done) {
  browserSync.reload();
  done();
}
function serve() {

  browserSync.init({
    server: {
        baseDir: "./"
    }
    //proxy: proxy
  });
  watch( paths.styles.src + "**/*.scss", styles);
  watch( paths.scripts.src + "**/*.js", scripts);
  watch( paths.scripts.dest + "**/*.js", reload);
  watch( "./**/*.html",reload);
}

exports.serve = series(scripts, styles, serve);
exports.default = parallel(scripts, styles);
