var gulp = require('gulp')
    , sass = require("gulp-sass")
    , sourcemaps = require('gulp-sourcemaps')
    , autoprefixer = require('gulp-autoprefixer')
    , notify = require('gulp-notify')
    , plumber = require('gulp-plumber')
    , browserSync = require('browser-sync')
    , autoprefixer_support = ['last 2 version']
;

gulp.task('styles', function() {
    return gulp.src('scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer(autoprefixer_support))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())
        .pipe(notify({
            message: '"styles" task complete'
        }));
});

//watch
gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch('scss/**/*.scss', gulp.series(['styles']));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', gulp.parallel(['styles', 'watch', 'browserSync']));
