import gulp from 'gulp';
import autoPrefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import GulpCleanCss from 'gulp-clean-css';
import GulpUglify from 'gulp-uglify';
import htmlhintPlugin from 'gulp-htmlhint';
import gulpRigger from 'gulp-rigger';
import { deleteAsync } from 'del';
const sass = gulpSass(dartSass);

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});


gulp.task('styles', function () {
    return gulp.src('src/assets/scss/*.+(scss|sass)')
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: '',
            suffix: '.min'
        }))
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(GulpCleanCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    deleteAsync('./dist/*.*');
    return gulp.src("./src/*.html")
        .pipe(gulpRigger())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream())
});

gulp.task('html:validator', function () {
    return gulp.src('./dist/*.html')
        .pipe(htmlhintPlugin())
        .pipe(htmlhintPlugin.reporter())
});

gulp.task('js', function () {
    deleteAsync('./dist/assets/js/*.*');
    return gulp.src('./src/assets/js/*.js')
        .pipe(GulpUglify())
        .pipe(gulp.dest('./dist/assets/js/'))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    deleteAsync('./dist/assets/images/*.*');
    return gulp.src('./src/assets/images/*.*')
        .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('fonts', function () {
    deleteAsync('./dist/assets/fonts/*.*');
    return gulp.src('./src/assets/fonts/*.*')
        .pipe(gulp.dest('./dist/assets/fonts/'));
});

gulp.task('css', function () {
    return gulp.src('./src/assets/css/*.css')
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    // sass change
    gulp.watch('src/assets/scss/**/*.+(scss|sass)').on('all', gulp.parallel('styles', browserSync.reload));
    // sass change
    gulp.watch('src/assets/css/**/*.*').on('all', gulp.parallel('css', browserSync.reload));
    // images
    gulp.watch(['src/assets/images/*.*',]).on('all', gulp.parallel('images', browserSync.reload));
    // js
    gulp.watch('src/assets/js/*.js').on('all', gulp.parallel('js', browserSync.reload));
    // html
    gulp.watch('src/**/*.html').on('all', gulp.parallel('html', browserSync.reload));
    // validate html
    gulp.watch('dist/*.html').on('all', gulp.parallel('html:validator'));
});

gulp.task('default', gulp.parallel('watch', 'html', 'browser-sync', 'styles', 'js', 'images', 'fonts', 'css'))