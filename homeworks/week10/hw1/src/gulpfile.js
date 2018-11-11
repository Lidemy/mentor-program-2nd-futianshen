const gulp = require('gulp')

const stylus = require('gulp-stylus')
const minifycss = require('gulp-csso')
gulp.task('css', () => {
  return gulp.src('stylus/*.styl') 
  .pipe(stylus({
    compress: true
  }))
  .pipe(minifycss())
  .pipe(gulp.dest('../build'))
})

const babel = require('gulp-babel')
const minifyjs = require('gulp-jsmin')
gulp.task('js', () => {
  return gulp.src('js/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(minifyjs())
  .pipe(gulp.dest('../build')) 
})

gulp.task('default', ['css','js'])
