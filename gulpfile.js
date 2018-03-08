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

gulp.task('fontawesome-fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('css/fonts'));
});

gulp.task('fontawesome-sass', function() {
  return gulp.src('node_modules/font-awesome/scss/*')
    .pipe(gulp.dest('_sass/font-awesome'));
});

gulp.task('inline-css', function() {
  return gulp.src('css/*')
    .pipe(gulp.dest('_includes/css'));
});
