(function() {
  'use strict';

  /**
   * Required node plugins
   */
  var gulp        = require('gulp');
  var glob        = require('glob');
  var del         = require('del');
  var browserSync = require('browser-sync').create();
  var reload      = browserSync.reload;
  var $           = require('gulp-load-plugins')();
  var postcss     = require('gulp-postcss');
  var prefix      = require('autoprefixer');
  var cssnano     = require('cssnano');
  var exec        = require('child_process').exec;


  /**
   * Set up prod/dev tasks
   */
  var is_prod       = !($.util.env.dev);


  /**
   * Set up file paths
   */
  var _assets_dir     = './assets';
  var _src_dir        = _assets_dir;
  var _public_dir     = './public';
  var _dist_dir       = _public_dir + '/assets';


  /**
   * Error notification settings
   */
  function errorAlert(err) {
    $.notify.onError({
      message:  '<%= error.message %>',
      sound:    'Sosumi'
    })(err);
  }


  /**
   * Clean the dist/dev directories
   */
  gulp.task('clean', function() {
    // del( _dist_dir + '/**/*' );
  });


  /**
   * Concatenates, minifies and renames the source JS files for dist/dev
   */
  gulp.task('scripts', function() {
    var matches = glob.sync(_src_dir + '/js/*');

    if (matches.length) {
      matches.forEach(function(match) {
        var dir     = match.split('/js/')[1];
        var scripts = [
          _src_dir + '/js/' + dir + '/**/*.js'
        ];
        gulp.src(scripts)
          .pipe( $.plumber({ errorHandler: errorAlert }) )
          .pipe( $.concat(dir + '.js') )
          .pipe( is_prod ? $.uglify() : $.util.noop() )
          .pipe( gulp.dest(_dist_dir) )
          .pipe( reload({stream:true}) )
          .on( 'error', errorAlert )
          .pipe(
            $.notify({
              message:  (is_prod) ? dir + ' scripts have been compiled and minified' : dir + ' dev scripts have been compiled',
              onLast:   true
            })
          );
      });
    }
  });


  /**
   * Compiles and compresses the source Sass files for dist/dev
   */
  gulp.task('styles', function() {
    var _sass_opts = {
      outputStyle:  is_prod ? 'compressed' : 'expanded',
      sourceComments: !is_prod
    };

    var _postcss_opts = [
      prefix({browsers: ['last 3 versions']})
    ];

    if ( is_prod ) _postcss_opts.push(cssnano());

    gulp.src(_src_dir + '/scss/main.scss')
      .pipe( $.plumber({ errorHandler: errorAlert }) )
      .pipe( $.sass(_sass_opts) )
      .on( 'error', function(err) {
        new $.util.PluginError(
          'CSS',
          err,
          {
            showStack: true
          }
        );
      })
      .pipe( postcss(_postcss_opts) )
      .pipe( gulp.dest(_dist_dir) )
      .pipe( reload({stream:true}) )
      .on( 'error', errorAlert )
      .pipe(
        $.notify({
          message: 'Styles have been compiled and minified',
          onLast:   true
        })
      );
  });


  /**
   * Minifies Images
   */
  gulp.task('images', function() {
    gulp.src(_src_dir + '/images/**.{png,jpg}')
      .pipe($.imagemin())
      .pipe(gulp.dest(_dist_dir + '/images'));
 });


  /**
   * Static Assets
   */
  gulp.task('static', function() {
    gulp.src(_src_dir + '/images/**.{pdf,gif}')
      .pipe(gulp.dest(_dist_dir + '/images'));
  });


  /**
   * Moves fonts
   */
  gulp.task('fonts', function() {
    gulp.src(_src_dir + '/webfonts/**.*')
      .pipe(gulp.dest(_dist_dir + '/webfonts'));
  });


  /**
   * Runs metalsmith
   */
  gulp.task('metalsmith', function() {
    exec('npm start');
  });


  /**
   * Builds for distribution (staging or production)
   */
  gulp.task('assets', ['styles', 'images', 'static', 'scripts', 'fonts' ], function() {
  });


  /**
   * Builds for distribution (staging or production)
   */
  gulp.task('build', ['metalsmith'], function() {
    exec('gulp assets');
  });


  /**
   * Builds assets and reloads the page when any php, html, img or dev files change
   */
  gulp.task('watch', ['build'], function() {
    browserSync.init({
      server: {
        baseDir: './public'
      },
      notify: true
    });

    gulp.watch(_src_dir + '/scss/**/*', ['styles']);
    gulp.watch(_src_dir + '/js/**/*', ['scripts']);
    gulp.watch(_src_dir + '/fonts/**/*', ['fonts']);
    gulp.watch(_src_dir + '/images/**/*.{png,jpg,svg}', ['images']);
    gulp.watch(_src_dir + '/images/**/*.{pdf,gif', ['static']);
    gulp.watch('./{content,_layouts,_includes}/**/*.{html,md}', ['build']).on('change', reload);
  });

  /**
   * Backup default task just triggers a build
   */
  gulp.task('default', ['build']);

}());
