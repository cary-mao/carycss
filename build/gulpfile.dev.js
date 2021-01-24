const gulp = require('gulp')
const rename = require('gulp-rename')
const stylus = require('gulp-stylus')
const cleanCSS = require('gulp-clean-css')
const { getConfig, configPath } = require('./util')
const connect = require('gulp-connect')
const postcss = require('gulp-postcss')

const config = getConfig()

function compileStyles () {
  return gulp.src(config.styles.src)
    .pipe(stylus(config.dev.stylus))
    .pipe(postcss())
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(connect.reload())
}

function copyTemplates () {
  return gulp.src(config.templates.src)
    .pipe(gulp.dest(config.templates.dest))
    .pipe(connect.reload())
}

const compile = gulp.parallel(compileStyles, copyTemplates)

function watch () {
  gulp.watch(config.styles.src, compileStyles)
  gulp.watch(config.templates.src, copyTemplates)
  gulp.watch(configPath, compile)
}

function server () {
  connect.server({
    livereload: true,
    root: 'dist'
  })
}

const dev = gulp.series(compile, gulp.parallel(server, watch))

module.exports = {
  compileStyles,
  copyTemplates,
  dev,
  server
}
