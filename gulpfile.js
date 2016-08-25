var gulp = require('gulp'),
    //gulp_jspm = require('gulp-jspm'),
    connect = require('gulp-connect');


// JSPM
// gulp.task('buildJspmPackage', () => {
//     // bundle and minify all js
//     return gulp.src('./app/app.js')
//         .pipe(gulp_jspm({
//             fileName: 'app',
//             selfExecutingBundle: false,
//             minify: false
//         }))
//         .pipe(gulp.dest('./dist'));
// });

gulp.task('copyJs', () => {
   return gulp
       .src('./app/**/*.js')
       .pipe(gulp.dest('dist'))
       .pipe(connect.reload());
});

gulp.task('watchJs', () => {
    gulp.watch(['./app/**/*.js'], ['copyJs']);
});

gulp.task('copyJspmAssets', () => {
    return gulp
        .src('./jspm_packages/**/*.*')
        .pipe(gulp.dest('dist/jspm_packages'));
});

gulp.task('copyConfigJs', () => {
    return gulp
        .src('config.js')
        .pipe(gulp.dest('dist'));
});


// HTML
gulp.task('copyHtmlFiles', () => {
    return gulp
        .src('./app/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('watchHtml', () => {
    gulp.watch(['./app/**/*.html'], ['copyHtmlFiles']);
});


// Serve
gulp.task('serve',['build-dev', 'watchHtml', 'watchJs'],() => {
    connect.server({
        root: 'dist',
        livereload: true
    });
});


// Builds
gulp.task('build-dev', ['copyJs', 'copyConfigJs', 'copyJspmAssets', 'copyHtmlFiles']);
gulp.task('default', ['build-dev']);