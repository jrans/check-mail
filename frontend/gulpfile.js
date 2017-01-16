'use strict';

var gulp = require('gulp');
var RSBundler = require('@redsift/redsift-bundler');
var download = require('gulp-download');
var unzip = require('gulp-unzip');
var replace = require('gulp-replace');
var fs = require('fs');



// The definitions for this Sift's bundles
var bundles = require('./bundle.config.js');

gulp.task('bundle-js', RSBundler.loadTask(gulp, 'bundle-js', bundles('js')));
gulp.task('bundle-css', RSBundler.loadTask(gulp, 'bundle-css', bundles('css')));
gulp.task('download-chessboard', function() {
  fs.stat('public/chessboardjs-0.3.0', function(err) {
    if(err) {
      console.log('downloading chessboardjs');
      download('http://chessboardjs.com/releases/0.3.0/chessboardjs-0.3.0.zip')
        .pipe(unzip())
        .pipe(gulp.dest('public/chessboardjs-0.3.0/'));
    }
  });
});

gulp.task('correct-image-urls', function () {
  gulp.src([
    'public/chessboardjs-0.3.0/js/chessboard-0.3.0.js'
  ])
    .pipe(replace('    cfg.pieceTheme = \'img/chesspieces/wikipedia/{piece}.png\';', '    cfg.pieceTheme = \'chessboardjs-0.3.0/img/chesspieces/wikipedia/{piece}.png\';'))
    .pipe(gulp.dest('public/chessboardjs-0.3.0/js'));
  gulp.src([
    'public/chessboardjs-0.3.0/js/chessboard-0.3.0.min.js'
  ])
    .pipe(replace('b.pieceTheme="img/chesspieces/wikipedia/{piece}.png";', 'b.pieceTheme="chessboardjs-0.3.0/img/chesspieces/wikipedia/{piece}.png";'))
    .pipe(gulp.dest('public/chessboardjs-0.3.0/js'));
});

gulp.task('default', ['download-chessboard', 'correct-image-urls', 'bundle-js', 'bundle-css'], function () {
  console.log('Bundling complete');
});
