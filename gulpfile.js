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
const yargs = require('yargs')

const { dest, series, src, task, watch } = gulp

/**
 * Set up prod/dev tasks
 */
const isProd = !(yargs.env.dev)
const pkg = require('./package.json')

/**
 * Set up file paths
 */
const paths = {
  src: {
    html: './{_data,_includes,pages,posts}/',
    js: './assets/js/'
  },
  build: {
    root: './_site/',
    js: './_site/js/'
  }
}

/**
 * Style vars
 */

const opts = {
  standard: {
    breakOnError: true,
    quiet: false
  }
}

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
task('clean', () => del([
  `${paths.build.root}/**/*`,
  `!${paths.build.root}/.git`
]))

/**
 * Build the markup
 */
task('11ty', () => exec('npm run 11ty'))

/**
 * Lints the gulpfile for errors
 */
task('lint:gulpfile', () =>
  src('gulpfile.js')
    .pipe($.standard())
    .pipe($.standard.reporter('default', opts.standard))
)

/**
 * Lints the source js files for errors
 */
task('lint:src', () =>
  src(paths.src.js + '**/*.js')
    .pipe($.standard())
    .pipe($.standard.reporter('default', opts.standard))
)

/**
 * Lint the Sass
 */
task('lint:sass', () =>
  src('./assets/scss/**/*.scss')
    .pipe($.sassLint({}))
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError())
)

/**
 * Lints all the js files for errors
 */
task('lint', series('lint:gulpfile', 'lint:src', 'lint:sass', cb => cb()))

/**
 * Concatenates and minifies the source JS files for dist/dev
 */
task('scripts', async () => {
  var matches = glob.sync(paths.src.js + '*')

  if (matches.length) {
    matches.forEach(match => {
      var dir = match.split('/js/')[1]
      var scripts = [
        paths.src.js + dir + '/libs/**/*.js',
        paths.src.js + dir + '/**/*.js'
      ]

      src(scripts)
        .pipe($.plumber({ errorHandler: errorAlert }))
        .pipe($.concat(dir + '.js'))
        .pipe($.babel({}))
        .pipe(dest(paths.build.js))
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
 * Builds for distribution (staging or production)
 */
task('build', series('clean', '11ty', 'scripts', cb => cb()))

/**
 * Builds assets and reloads the page when any php, html, img or dev files change
 */
task('watch', series('build', () => {
  browserSync.init({
    server: {
      baseDir: paths.build.root
    },
    notify: true
  })

  watch(`${paths.src.js}**/*`, series('scripts'))
  watch(`${paths.src.html}**/*`, series('11ty'))
  watch(`${paths.build}**/*.html`).on('change', reload)
}))

/**
 * Deploy to Github Pages
 */
task('deploy', () => exec('npm run deploy'))

/**
 * Backup default task just triggers a build
 */
task('default', series('build', cb => cb()))
