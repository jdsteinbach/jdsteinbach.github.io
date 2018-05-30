'use strict'

/**
 * Required node plugins
 */
const gulp = require('gulp')
const glob = require('glob')
const del = require('del')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const exec = require('child_process').exec
const $ = require('gulp-load-plugins')()
const postcss = require('gulp-postcss')
const prefix = require('autoprefixer')
const cssnano = require('cssnano')
const inlineSVG = require('postcss-inline-svg')

/**
 * Set up prod/dev tasks
 */
const isProd = !($.util.env.dev)
const pkg = require('./package.json')

/**
 * Set up file paths
 */
const paths = {
  src: {
    html: './{_data,_includes,pages,posts}/',
    css: './scss/',
    js: './js/'
  },
  build: {
    root: './_site/',
    css: './_site/css/',
    js: './_site/js/'
  }
}

/**
 * Style vars
 */

const opts = {
  sass: {
    outputStyle: isProd ? 'compressed' : 'expanded',
    sourceComments: !isProd
  },
  postcss: [
    inlineSVG({path: './images'}),
    prefix({browsers: pkg.browserslist})
  ],
  standard: {
    breakOnError: true,
    quiet: false
  }
}
if (isProd) opts.postcss.push(cssnano())

/**
 * Error notification settings
 */
function errorAlert (err) {
  $.notify.onError({
    message: '<%= error.message %>',
    sound: 'Sosumi'
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
  exec('npm run 11ty')
})

/**
 * Lints the gulpfile for errors
 */
gulp.task('lint:gulpfile', () =>
  gulp.src('gulpfile.js')
    .pipe($.standard())
    .pipe($.standard.reporter('default', opts.standard))
)

/**
 * Lints the source js files for errors
 */
gulp.task('lint:src', () =>
  gulp.src(paths.src.js + '**/*.js')
    .pipe($.standard())
    .pipe($.standard.reporter('default', opts.standard))
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
    matches.forEach(match => {
      var dir = match.split('/js/')[1]
      var scripts = [
        paths.src.js + dir + '/libs/**/*.js',
        paths.src.js + dir + '/**/*.js'
      ]

      gulp.src(scripts)
        .pipe($.plumber({ errorHandler: errorAlert }))
        .pipe($.concat(dir + '.js'))
        .pipe($.babel({
          presets: ['env']
        }))
        // .pipe( isProd ? $.uglify() : $.util.noop() )
        .pipe(isProd ? $.rename(dir + '.min.js') : $.util.noop())
        .pipe(gulp.dest(paths.build.js))
        .pipe(reload({stream: true}))
        .on('error', errorAlert)
        .pipe(
          $.notify({
            message: dir + ' scripts have been compiled',
            onLast: true
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
    .pipe($.plumber({ errorHandler: errorAlert }))
    .pipe($.sass(opts.sass))
    .on('error', err => {
      $.util.PluginError(
        'CSS',
        err,
        {
          showStack: true
        }
      )
    })
    .pipe(isProd ? $.rename({ suffix: '.min' }) : $.util.noop())
    .pipe(postcss(opts.postcss))
    .pipe(gulp.dest(paths.build.css))
    .pipe(reload({stream: true}))
    .on('error', errorAlert)
    .pipe(
      $.notify({
        message: (isProd) ? 'Styles have been compiled and minified' : 'Dev styles have been compiled',
        onLast: true
      })
    )
)

/**
 * Lint the Sass
 */
gulp.task('lint:sass', () =>
  gulp.src(paths.src.css + '**/*.scss')
    .pipe($.sassLint({}))
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError())
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

  gulp.watch(`${paths.src.css}**/*`, ['styles'])
  gulp.watch(`${paths.src.js}**/*`, ['scripts'])
  gulp.watch(`${paths.src.html}**/*.{md,html,liquid,json}`, ['11ty'])
  gulp.watch(`${paths.build}**/*.html`).on('change', reload)
})

/**
 * Backup default task just triggers a build
 */
gulp.task('default', ['build'])
