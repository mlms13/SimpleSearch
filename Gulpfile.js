var gulp  = require('gulp'),
    gutil = require('gulp-util'),
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


// everything we need to push a release to npm
gulp.task('release', ['js'], function () {
    var shell = require('shelljs'),
        type = gutil.env.major ? "major" :
            gutil.env.minor ? "minor" : "patch";

    if (!shell.which('git') || !shell.which('npm')) {
        console.error('You need git and npm installed to make a release');
        shell.exit(1);
    }

    // forcefully commit our ./dist folder for releases
    if (shell.exec('git add --force  ./dist').code !== 0) {
        console.error('Failed to add build directory to commit');
        shell.exit(1);
    }

    if (shell.exec('git commit -m "Compiled files for release"').code !== 0) {
        console.error('Failed to commit our compiled files');
        shell.exit(1);
    }

    // use npm to bump package version, add tags, and make the commit
    if (shell.exec('npm version ' + type).code !== 0) {
        console.error('Failed to commit changes with `npm version`');
        shell.exit(1);
    }

    // attempt to publish the most recently tagged version
    if (shell.exec('npm publish .').code !== 0) {
        console.error('Failed to publish package to npm,');
        shell.exit(1);
    }

});