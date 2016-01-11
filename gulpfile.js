var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('app:watch', function () {
    gulp.start('sass:watch', 'watchify');
});

gulp.task('browserify', function () {
    return build();
});


function build() {

    var b = browserify('./src/main.js');
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./dist'));
}

gulp.task('watchify', function () {
    return bundle('main', 'bundle')
});

function bundle(file, output) {
    watchify.args.debug = true;
    var bundler = watchify(browserify('./src/' + file + '.js', watchify.args));
    bundler.on('update', rebundle);
    bundler.on('log', gutil.log.bind(gutil));
    function rebundle() {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(output + '.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
            // Add transformation tasks to the pipeline here.
            .pipe(sourcemaps.write('./')) // writes .map file
            .pipe(gulp.dest('./dist'));
    }
    return rebundle();
}

gulp.task('build', ['browserify']);
gulp.task('watch', ['watchify']);