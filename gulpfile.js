var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var tsc = require('gulp-typescript');
var del = require('del');

gulp.task('default', ['build', 'build-test'], function () { });

// Compile the sources to javascript
gulp.task('build', function () {
  var tsMain = gulp.src('src/**/*.ts')
    .pipe(tsc({
      noImplicitAny: true,
      module: 'commonjs'
    }));
  return tsMain.js.pipe(gulp.dest('built/local'));
});

// Compile the tests to javascript
gulp.task('build-test', ['build'], function () {
  var tsTests = gulp.src(['src/**/*.ts', 'test/**/*.ts'])
    .pipe(tsc({
      noImplicitAny: true,
      module: 'commonjs'
    }));
  return tsTests.js.pipe(gulp.dest('built/test'));
});

// Run the tests 
gulp.task('test', ['build-test'], function () {
  return gulp.src('built/test/**/*.js', { read: false })
    .pipe(mocha({ reporter: 'list' }))
    .on('error', gutil.log);
});

// Run the build on changes
gulp.task('watch', function () {
  gulp.watch(['src/**', 'test/**'], ['build', 'build-test']);
});

// Run the tests on changes
gulp.task('watch-test', function () {
  gulp.watch(['src/**', 'test/**'], ['test']);
});

// Remove build files
gulp.task('clean', function () {
    del('built');
});

