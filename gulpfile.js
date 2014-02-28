var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

// Default
// =====================================

gulp.task('default', ['webpack-dev-server'], function() {});

gulp.task('webpack-dev-server', function() {
  new WebpackDevServer(webpack(webpackConfig), {
    contentBase: 'src/index.html',
    publicPath: '/' + webpackConfig.output.publicPath
  }).listen(8080, 'localhost', function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/');
  });
});

// Clean
// =====================================

gulp.task('clean', function() {
  gulp.src('dist', {read: false})
    .pipe(clean());
});

// Build
// =====================================

gulp.task('build', ['copy', 'webpack:build'], function() {});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack:build', function(callback) {
  // Modify some webpack config options
  var myConfig = Object.create(webpackConfig);

  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.eng': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );

  // Run webpack
  webpack(myConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }

    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    callback();
  });
});
