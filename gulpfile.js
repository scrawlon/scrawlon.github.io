'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

gulp.task('browserify', function() {
  var b = browserify({
    entries: './_js/app.js',
    debug: true,
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./js/'));
});

gulp.task('watch', function() {
  gulp.watch(['./_js/*.js', './_js/velocity-animations/*.js', 'portfolio-projects.json'], ['browserify']);
});
