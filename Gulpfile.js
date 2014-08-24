var gulp  = require('gulp'),
    seq   = require('run-sequence'),
    clean = require('rimraf');

gulp.task('clean:dist', function (cb) {
    clean('./dist', cb);
});

gulp.task('clean:docs', function (cb) {
    clean('./docs/simplesearch.md', cb);
});

gulp.task('hint', function () {
    var jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    return gulp.src(['./src/**/*.js', './Gulpfile.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('js', ['clean:dist', 'hint'], function () {
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

gulp.task('docs', ['clean:docs'], function (cb) {
    var jsdox = require('jsdox');

    jsdox.generateForDir('src', 'docs', null, cb);
});

gulp.task('test', function () {
    var mocha = require('gulp-mocha');

    gulp.src('./test/**/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.js'], ['js', 'docs']);
    gulp.watch(['./dist/simplesearch.js', './test/**/*.js'], ['test']);
});

gulp.task('default', function () {
    seq('js', ['test', 'docs', 'watch']);
});
