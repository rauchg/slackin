'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import rimraf from 'gulp-rimraf';

const paths = {
  in_js: "lib/*.js",
  in_assets: "lib/assets/*",
  in_locale: "lib/locale/*.js",
  out_js: "node",
  out_locale: "node/locale",
  out_assets: "node/assets",
};

gulp.task('es6to5', () => {
  gulp.src(paths.in_js)
      .pipe(babel())
      .pipe(gulp.dest(paths.out_js));
   
   gulp.src(paths.in_locale)
       .pipe(babel())
       .pipe(gulp.dest(paths.out_locale));
});

gulp.task('copyassets', () => {
  return gulp.src(paths.in_assets)
             .pipe(gulp.dest(paths.out_assets));
});

gulp.task('clean', () => {
  return gulp.src(paths.out_js, { read: false })
             .pipe(rimraf());
});

gulp.task('default', ['es6to5', 'copyassets']);
