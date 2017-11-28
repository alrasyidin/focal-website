var gulp = require('gulp'),
    pump = require('pump');

// images
var imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminZopfli = require('imagemin-zopfli'),
    imageminGiflossy = require('imagemin-giflossy'),
    imageminMozjpeg = require('imagemin-mozjpeg');

var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var minifyHTML = require('gulp-htmlmin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('compress', function () {
    gulp.src('images/Portofolio/*')
        .pipe(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: 98 //lossy settings
            }),
            imageminZopfli({
                more: true
            }),

            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 90
            })
        ]))
        .pipe(gulp.dest('dist/images/Portofolio/'));
});

function run(source, task, dest) {
    return gulp.src(source)
           .pipe(task)
           .pipe(gulp.dest('dist/' + dest))
}

// Minify JS
gulp.task('uglify', function(){
    function createErrorHandler(name) {
        return function (err) {
            console.error('Error from ' + name + ' in compress task', err.toString());
        };
    }

    return gulp.src("script.js")
        .on('error', createErrorHandler('gulp.src'))
        .pipe(uglify())
        .on('error', createErrorHandler('uglify'))
        .pipe(gulp.dest('dist/'))
        .on('error', createErrorHandler('gulp.dest'));
});

gulp.task('minifyHTML', function () {
    return gulp.src('*.html')
        .pipe(minifyHTML({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

// Compile sass to css
// gulp.task('sass', run('sass/*',
//     sass().on('error', sass.logError),
//     'css'
// ));

gulp.task('copyHTML', function () {
    gulp.src('*.html')
        .pipe(gulp.dest('dist'))
});

// gulp.task('concat', function () {
//     gulp.src('*.js')
//         .pipe(concat('script.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'))
// });

gulp.task('minify-css', function(){
    gulp.src('*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['compress', 'uglify', 'minify-css', 'minifyHTML']);

// compile every time
gulp.task('watch', function () {
    gulp.watch('images/*', ['compress']);
    gulp.watch('script.js', ['uglify']);
    gulp.watch('*.css', ['minify-css']);
    gulp.watch('*.html', ['minifyHTML']);
});