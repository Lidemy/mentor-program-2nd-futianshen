const gulp = require('gulp')

const stylus = require('gulp-stylus')
gulp.task('css', () => {
  return gulp.src('./**/*.styl') 
  .pipe(stylus({
    compress: true
  }))
  .pipe(gulp.dest('./'))
})

gulp.task('watch', () => {
    gulp.watch('./**/*.styl', ['css'])
})

gulp.task('default', ['watch'])