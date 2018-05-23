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
const _src_11ty   = './{_data,_includes,pages,posts}/'
const _src_css    = './scss/'
const _src_js     = './js/'
const _build_dir  = './_site/'
const _build_css  = `${_build_dir}css/`
const _build_js   = `${_build_dir}js/`

/**
 * Style vars
 */

const _sass_opts = {
  outputStyle:  is_prod ? 'compressed' : 'expanded',
  sourceComments: !is_prod
}

const _postcss_opts = [
  prefix({browsers: pkg.browserslist})
]

if ( is_prod ) _postcss_opts.push(cssnano())

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
gulp.task('clean', () => del([_build_css + '/**/*', _build_js + '/**/*']))


/**
 * Build the markup
 */
// gulp.task('11ty:serve', () => $.exec('eleventy --watch'))


/**
 * Build the markup
 */
gulp.task('11ty', () => {
  $.exec('eleventy')
  $.notify('11ty is compiled')
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
  gulp.src(_src_js + '**/*.js')
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
  var matches = glob.sync(_src_js + '*')

  if (matches.length) {
    matches.forEach( match => {
      var dir     = match.split('/js/')[1]
      var scripts = [
        _src_js + dir + '/libs/**/*.js',
        _src_js + dir + '/**/*.js'
      ]

      gulp.src(scripts)
        .pipe( $.plumber({ errorHandler: errorAlert }) )
        .pipe( $.concat(dir + '.js') )
        .pipe( $.babel({
          presets: ['env']
        }) )
        // .pipe( is_prod ? $.uglify() : $.util.noop() )
        .pipe( is_prod ? $.rename(dir + '.min.js') : $.util.noop() )
        .pipe( gulp.dest(_build_js) )
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
  gulp.src(_src_css + 'main.scss')
    .pipe( $.plumber({ errorHandler: errorAlert }) )
    .pipe( $.sass(_sass_opts) )
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
    .pipe( postcss(_postcss_opts) )
    .pipe( gulp.dest(_build_css) )
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
  gulp.src(_src_css + '**/*.scss')
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
      baseDir: _build_dir
    },
    notify: true
  })

  gulp.watch( `${_src_css}**/*`, ['styles'] )
  gulp.watch( `${_src_js}**/*`, ['scripts'] )
  gulp.watch( `${_src_11ty}**/*`, ['11ty'] )
  gulp.watch( `${_build_dir}**/*.html` ).on('change', reload )
})

/**
 * Backup default task just triggers a build
 */
gulp.task('default', ['build'])
