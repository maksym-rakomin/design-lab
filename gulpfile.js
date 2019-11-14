'use strict';

var gulp       	 = require('gulp');
var browserSync	 = require('browser-sync').create();
var sass       	 = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rigger       = require('gulp-rigger');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src([
        'partials/*.html',
        '!partials/_*.html'])
        .pipe(rigger())
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('html', 'sass', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", gulp.parallel('sass'));
    gulp.watch("partials/*.html", gulp.parallel('html'));
    gulp.watch("js/*.js").on('change', browserSync.reload);
}));


gulp.task('default', gulp.series('serve'));