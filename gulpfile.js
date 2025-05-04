const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // для компиляции SCSS
const cleanCSS = require('gulp-clean-css'); // для минификации CSS
const rename = require('gulp-rename'); // для переименования файлов
const uglify = require('gulp-uglify'); // для минификации JavaScript

// Путь к основному SCSS файлу
const scssPath = 'src/scss/main.scss';

// Путь к JavaScript файлу
const jsPath = 'src/js/script.js';

// Таск для компиляции SCSS
gulp.task('scss', function () {
    return gulp.src(scssPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
});

// Таск для минификации JavaScript
gulp.task('js', function () {
    return gulp.src(jsPath)
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});

// Таск для наблюдения за изменениями в SCSS и JS файлах
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
});

// Таск по умолчанию
gulp.task('default', gulp.series('scss', 'js', 'watch'));