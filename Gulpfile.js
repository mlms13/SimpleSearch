var gulp = require('gulp');

gulp.task('clean', function (cb) {
    var clean = require('rimraf');
    clean('./dist', cb);
});

gulp.task('hint', function () {
    var jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    return gulp.src(['./src/**/*.js', './Gulpfile.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('js', ['clean', 'hint'], function () {
    var wrap = require('gulp-wrap-umd'),
        streamify = require('gulp-streamify'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename');

    return gulp.src('./src/simplesearch.js')
        .pipe(wrap({
            namespace: 'SimpleSearch',
            exports: 'SimpleSearch'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(streamify(uglify()))
        .pipe(rename('simplesearch.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('default', ['js', 'watch']);
