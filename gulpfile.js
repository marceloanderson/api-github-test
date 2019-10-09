'use strict';

const gulp        = require('gulp')
const clean       = require('gulp-clean')
const sass        = require('gulp-sass')
const babel       = require('gulp-babel')
const uglify      = require('gulp-uglify')
const jshint      = require('gulp-jshint')
const imagemin    = require('gulp-imagemin')
const sourcemaps  = require('gulp-sourcemaps')
const rename      = require('gulp-rename')
// const jsImport    = require('gulp-js-import')
const browserSync = require('browser-sync').create()
const runSequence = require('run-sequence')

let bases = {
    src: './src',
    build: './build'
}
let paths = {
    sass: bases.src + '/assets/sass/*.scss',
    scripts: bases.src + '/assets/js/*.js',
    images: bases.src + '/assets/images/**/*',
    copy: [bases.src + '/assets/vendors/**/*', bases.src + '/assets/fonts/**/*']
}

gulp.task('clean', () => {
    return gulp.src(bases.build + '/../')
        .pipe(clean())
})

gulp.task('copy', () => {
    gulp.src(paths.copy)
        .pipe(gulp.dest(bases.build))
})

gulp.task('sass', () => {
    if(environment == 'prod'){
        let scss = gulp.src(paths.sass)
            .pipe(sass(sassStyle).on('error', sass.logError))
            // .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(bases.build))
            .pipe(browserSync.stream())

        return scss
    }else{
        let scss = gulp.src(paths.sass)
            .pipe(sass(sassStyle).on('error', sass.logError))
            .pipe(sourcemaps.write())  
            .pipe(gulp.dest(bases.build))
            .pipe(browserSync.stream())
        
        return scss
    }
})

gulp.task('lint', function () {
    return gulp.src(paths.scripts)
        .pipe(jsImport({hideConsole: true}))
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('default'))
});

gulp.task('scripts', ['browserReload'], () => {
    if(environment == 'prod'){
        let script = gulp.src(paths.scripts)
            .pipe(jsImport({hideConsole: true}))
            .pipe(babel({presets: ['@babel/env']}))
            .pipe(uglify())
            // .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(bases.build))
        
        return script
    }else{
        let script = gulp.src(paths.scripts)
            .pipe(jsImport({hideConsole: true}))
            .pipe(babel({presets: ['@babel/env']}))
            .pipe(gulp.dest(bases.build))
            // .pipe(notify("Found file: <%= file.relative %>!"))
        
        return script
    }
})

gulp.task('images', () => {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 7, progressive: true}))
        .pipe(gulp.dest(bases.build + '/images'))
})

gulp.task('browserSync', () => {
    browserSync.init({
        open: false,
        https: config.https || true,
        host: config.accountName + '.vtexlocal.com.br',
        startPath: '/admin/login/',
        proxy: 'https://' + config.accountName + '.vtexcommercestable.com.br',
        serveStatic: [{
            route: '/arquivos',
            dir: [bases.build]
        }]
    })
})

gulp.task('watch', () => {
    gulp.watch(bases.src + '/assets/sass/**/*.scss', ['sass'])
    gulp.watch(bases.src + '/assets/js/**/*.js', ['lint', 'scripts'])
    gulp.watch(paths.images, ['sprite', 'images'])
    gulp.watch(paths.fonts, ['copy'])
})

gulp.task('browserReload', (cb) => {
    browserSync.reload()
    cb()
})

// gulp.task('dev', () => {
//     setEnv('dev')
//     runSequence('clean', 'sprite', ['copy', 'sass', 'scripts'], 'images', 'browserSync', 'watch')
// })

gulp.task('default', () => {
    console.log('Check package json to run tasks')
})

gulp.task('build', ['clean', 'sprite', ['copy', 'sass', 'scripts'], 'images', 'browserSync', 'watch']);