'use strict'

/**
 * Required node plugins
 */
const gulp        = require('gulp')
const glob        = require('glob')
const del         = require('del')
const browserSync = require('browser-sync').create()
const reload      = browserSync.reload
const $           = require('gulp-load-plugins')()
const postcss     = require('gulp-postcss')
const prefix      = require('autoprefixer')
const cssnano     = require('cssnano')

/**
 * Set up prod/dev tasks
 */
const is_prod = !($.util.env.dev)
const pkg     = require('./package.json')

/**
 * Set up file paths
 */
const paths = {
  src: {
    html: './{_data,_includes,pages,posts}/',
    css: './scss/',
    js: './js/',
  },
  build: {
    root: './_site/',
    css: './_site/css/',
    js: './_site/js/',
  }
}

/**
 * Style vars
 */

const opts = {
  sass: {
    outputStyle:  is_prod ? 'compressed' : 'expanded',
    sourceComments: !is_prod
  },
  postcss: [
    prefix({browsers: pkg.browserslist})
  ]
}
if ( is_prod ) opts.postcss.push(cssnano())

/**
 * Error notification settings
 */
function errorAlert(err) {
  $.notify.onError({
    message:  '<%= error.message %>',
    sound:    'Sosumi'
  })(err)
}

/**
 * Clean the dist/dev directories
 */
gulp.task('clean', () => del([paths.build.css + '/**/*', paths.build.js + '/**/*']))

/**
 * Build the markup
 */
gulp.task('11ty', () => {
  $.exec('eleventy')
})

/**
 * Lints the gulpfile for errors
 */
gulp.task('lint:gulpfile', () =>
  gulp.src('gulpfile.js')
    .pipe( $.jshint() )
    .pipe( $.jshint.reporter('default') )
    .on( 'error', errorAlert )
)

/**
 * Lints the source js files for errors
 */
gulp.task('lint:src', () =>
  gulp.src(paths.src.js + '**/*.js')
    .pipe( $.jshint() )
    .pipe( $.jshint.reporter('default') )
    .on( 'error', errorAlert )
)

/**
 * Lints all the js files for errors
 */
gulp.task('lint', ['lint:gulpfile', 'lint:src', 'lint:sass'])

/**
 * Concatenates, minifies and renames the source JS files for dist/dev
 */
gulp.task('scripts', () => {
  var matches = glob.sync(paths.src.js + '*')

  if (matches.length) {
    matches.forEach( match => {
      var dir     = match.split('/js/')[1]
      var scripts = [
        paths.src.js + dir + '/libs/**/*.js',
        paths.src.js + dir + '/**/*.js'
      ]

      gulp.src(scripts)
        .pipe( $.plumber({ errorHandler: errorAlert }) )
        .pipe( $.concat(dir + '.js') )
        .pipe( $.babel({
          presets: ['env']
        }) )
        // .pipe( is_prod ? $.uglify() : $.util.noop() )
        .pipe( is_prod ? $.rename(dir + '.min.js') : $.util.noop() )
        .pipe( gulp.dest(paths.build.js) )
        .pipe( reload({stream:true}) )
        .on( 'error', errorAlert )
        .pipe(
          $.notify({
            message: dir + ' scripts have been compiled',
            onLast:   true
          })
        )
    })
  }
})

/**
 * Compiles and compresses the source Sass files for dist/dev
 */
gulp.task('styles', () =>
  gulp.src(paths.src.css + 'main.scss')
    .pipe( $.plumber({ errorHandler: errorAlert }) )
    .pipe( $.sass(opts.sass) )
    .on( 'error', err => {
      new $.util.PluginError(
        'CSS',
        err,
        {
          showStack: true
        }
      )
    })
    .pipe( is_prod ? $.rename({ suffix: '.min' }) : $.util.noop() )
    .pipe( postcss(opts.postcss) )
    .pipe( gulp.dest(paths.build.css) )
    .pipe( reload({stream:true}) )
    .on( 'error', errorAlert )
    .pipe(
      $.notify({
        message:  (is_prod) ? 'Styles have been compiled and minified' : 'Dev styles have been compiled',
        onLast:   true
      })
    )
)

/**
 * Lint the Sass
 */
gulp.task('lint:sass', () =>
  gulp.src(paths.src.css + '**/*.scss')
    .pipe( $.sassLint({
      'merge-default-rules': true
    }) )
    .pipe( $.sassLint.format() )
    .pipe( $.sassLint.failOnError() )
)

/**
 * Builds for distribution (staging or production)
 */
gulp.task('build', ['clean', 'styles', 'scripts', '11ty'])

/**
 * Builds assets and reloads the page when any php, html, img or dev files change
 */
gulp.task('watch', ['clean', 'styles', 'scripts', '11ty'], () => {
  browserSync.init({
    server: {
      baseDir: paths.build.root
    },
    notify: true
  })

  gulp.watch( `${paths.src.css}**/*`, ['styles'] )
  gulp.watch( `${paths.src.js}**/*`, ['scripts'] )
  gulp.watch( `${paths.src.html}**/*.{md,html,liquid,json}`, ['11ty'] )
  gulp.watch( `${paths.build}**/*.html` ).on('change', reload )
})

/**
 * Backup default task just triggers a build
 */
gulp.task('default', ['build'])
