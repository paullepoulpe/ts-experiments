var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var ts = require('gulp-typescript');

gulp.task('default', ['build', 'build-test'], function () { });

// Compile the sources to javascript
gulp.task('build', function () {
  var tsMain = gulp.src('src/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      module: 'commonjs'
    }));
  return tsMain.js.pipe(gulp.dest('built/local'));
});

// Compile the tests to javascript
gulp.task('build-test', ['build'], function () {
  var tsTests = gulp.src('test/**/*.ts')
    .pipe(ts({
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
