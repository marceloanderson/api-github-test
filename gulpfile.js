'use strict';

const gulp        = require('gulp')
const clean       = require('gulp-clean')
const sass        = require('gulp-sass')
const babel       = require('gulp-babel')
const uglify      = require('gulp-uglify')
const jshint      = require('gulp-jshint')
const imagemin    = require('gulp-imagemin')
const sourcemaps  = require('gulp-sourcemaps')
// const rename      = require('gulp-rename')
const browserSync = require('browser-sync').create()
const runSequence = require('run-sequence')

let bases = {
    src: './src',
    build: './build'
}
let paths = {
    styles: bases.src + '/assets/styles/*.scss',
    scripts: bases.src + '/assets/scripts/*.js',
    images: bases.src + '/assets/images/**/*',
    copy: [bases.src + '/*.html', bases.src + '/assets/vendors/**/*', bases.src + '/assets/fonts/**/*']
}

gulp.task('clean', () => {
    return gulp.src(bases.build)
        .pipe(clean())
})

gulp.task('copy', ['browserReload'], () => {
    gulp.src(paths.copy)
        .pipe(gulp.dest(bases.build))
})

gulp.task('styles', () => {
    return gulp.src(paths.styles)
        .pipe(sass({'sourcemap=none': true, noCache: true, outputStyle: 'compressed'}).on('error', sass.logError))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(bases.build + '/css'))
        .pipe(browserSync.stream())
})

gulp.task('lint', function () {
    return gulp.src(paths.scripts)
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('default'))
});

gulp.task('scripts', ['browserReload'], () => {
    return gulp.src(paths.scripts)
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(bases.build + '/js'))
})

gulp.task('images', () => {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 7, progressive: true}))
        .pipe(gulp.dest(bases.build + '/images'))
})

gulp.task('browserSync', () => {
    browserSync.init({
        server: bases.build
    })
})

gulp.task('watch', () => {
    gulp.watch(bases.src + '/assets/styles/**/*.scss', ['styles'])
    gulp.watch(bases.src + '/assets/scripts/**/*.js', ['lint', 'scripts'])
    gulp.watch(paths.images, ['images'])
    gulp.watch(paths.copy, ['copy'])
})

gulp.task('browserReload', (cb) => {
    browserSync.reload()
    cb()
})

gulp.task('dev', () => {
    runSequence('clean', ['copy', 'styles', 'scripts'], 'images', 'browserSync', 'watch')
})

gulp.task('default', () => {
    console.log('Check package json to run tasks')
})