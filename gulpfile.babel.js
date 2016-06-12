import gulp from 'gulp'
import babel from 'gulp-babel'
import rimraf from 'gulp-rimraf'

const paths = {
  in_js: 'lib/*.js',
  in_assets: 'lib/assets/*',
  out_js: 'node',
  out_assets: 'node/assets',
}

gulp.task('transpile', () => {
  return gulp.src(paths.in_js)
  .pipe(babel())
  .pipe(gulp.dest(paths.out_js))
})

gulp.task('assets', () => {
  return gulp.src(paths.in_assets)
  .pipe(gulp.dest(paths.out_assets))
})

gulp.task('clean', () => {
  return gulp.src(paths.out_js, {
    read: false
  })
  .pipe(rimraf())
})

gulp.task('default', ['transpile', 'assets'])
