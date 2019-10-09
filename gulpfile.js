'use strict';

const gulp        = require('gulp')
const clean       = require('gulp-clean')

let bases = {
    src: './src',
    build: './build'
}

gulp.task('clean', () => {
    return gulp.src(bases.build + '/../')
        .pipe(clean())
})

gulp.task('default', () => {
    console.log('Check package json to run tasks')
})

gulp.task('build', ['clean']);