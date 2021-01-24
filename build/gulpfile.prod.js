const gulp = require('gulp')
const rename = require('gulp-rename')
const stylus = require('gulp-stylus')
const cleanCSS = require('gulp-clean-css')
const { getConfig } = require('./util')

const config = getConfig()

function compileStyles () {
  return gulp.src(config.styles.src)
    .pipe(stylus(config.prod.stylus))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.styles.dest))
}

function copyTemplates () {
  return gulp.src(config.templates.src)
    .pipe(gulp.dest(config.templates.dest))
}

const build = gulp.parallel(compileStyles, copyTemplates)

module.exports = {
  compileStyles,
  copyTemplates,
  build
}
