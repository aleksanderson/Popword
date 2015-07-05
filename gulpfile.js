var gulp = require('gulp');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var env = require('gulp-env');
var preprocess = require('gulp-preprocess');

var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

gulp.task('set-env-dev', function () {
    env({
        vars: {
            NODE_ENV: 'development'
        }
    });
});

gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(preprocess())
        .pipe(gulp.dest('./app/built/'));
});

gulp.task('webpack-compile', function(callback) {
    var compiler = webpack(webpackConfig);

    compiler.run(function(err) {
        if(err) return gutil.log('[Webpack compile Error]: ' + err);
        callback()
    });
});

gulp.task('electron', shell.task('electron .'));

gulp.task('dev', ['set-env-dev', 'html', 'webpack-compile'], function() {
    gulp.start('electron');
});




//TODO: create build task that will combine everything and put into the 'built' dir