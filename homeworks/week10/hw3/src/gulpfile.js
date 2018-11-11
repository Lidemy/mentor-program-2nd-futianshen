const gulp = require('gulp')

const pug = require('gulp-pug')
gulp.task('html', () => {
  return gulp.src('pug/*.pug')
    .pipe(pug([Object]))
    .pipe(gulp.dest('../'))
}); 

const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const minifycss = require('gulp-csso')
gulp.task('css', () => {
  return gulp.src('./stylus/*.styl')
    .pipe(stylus())
    .pipe(postcss([autoprefixer]))
    .pipe(minifycss())
    .pipe(gulp.dest('../'))
});

const babel = require('gulp-babel')
const jsmin = require('gulp-jsmin')

gulp.task('js', () =>
    gulp.src('js/index.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(jsmin())
        .pipe(gulp.dest('../'))
);
const watch = require('gulp-watch')
gulp.task('watch', () => {
    gulp.watch('pug/*.pug', ['html'])
    gulp.watch('stylus/*.styl', ['css'])
    gulp.watch('js/*.js', ['js'])
})

gulp.task('default', ['html', 'css', 'js', 'watch'])
