/*
|--------------------------------------------------------------------------
| Gulp e Plugins
|--------------------------------------------------------------------------
*/

// Gulp

var gulp = require('gulp');

// Plugins

var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var autoprefixer = require('gulp-autoprefixer');
var connect = require( 'gulp-connect' );

// Setups

var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'compressed'
}

/*
|--------------------------------------------------------------------------
| Paths
|--------------------------------------------------------------------------
*/

var paths = {

    sass : [
            'content/assets_src/sass/**/*.scss',
            'content/assets_src/sass/style.scss'
    ],
    js_lint : [
            'content/assets_src/js/**/*.js',
            '!content/assets_src/js/vendor/*.js'
    ],
    js : [
             'content/assets_src/js/vendor/jquery.js' ,
             'content/assets_src/js/vendor/parallax.js' ,
             'content/assets_src/js/core/_namespace.js',
             'content/assets_src/js/core/_core.js',
             'content/assets_src/js/components/*.js',
             'content/assets_src/js/controller/*.js'
    ],
    files : [
          'index.html',
          'content/assets/css/style.css'
    ]
}

/*
|--------------------------------------------------------------------------
| Tarefas
|--------------------------------------------------------------------------
*/

// FILES

gulp.task( 'files', function() {
  return gulp
    .src(paths.files).pipe(connect.reload());
});

// CLEAN

gulp.task('clean', function () {
  return gulp
    .src([
      'content/assets/css/style.css',
      'content/assets/js/scripts.js',
      ])
      .pipe(clean());
});


// CONCAT e MINIFICA

gulp.task('concat', function () {
    return gulp
    .src(paths.js) 
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('content/assets/js'))
});

 // LINT

 gulp.task('lint', function() {
    return gulp
    .src(paths.js_lint)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish));
});

// SASS

 gulp.task('sass', function () {
    return gulp
    .src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('content/assets/css'))
    .resume();
});


/*
|--------------------------------------------------------------------------
| Tarefas Gerais
|--------------------------------------------------------------------------
*/

// Watch

gulp.task('watch', ['sass', 'lint', 'concat', 'files' ], function() {

  gulp.watch(paths.js, ['concat']);
  gulp.watch(paths.js_lint, ['lint']);
  gulp.watch(paths.sass ,['sass']);
  gulp.watch(paths.files, [ 'files' ]);

});

// Connect

gulp.task( 'connect', function() {
  connect.server({ livereload: true });
});

// Default

gulp.task('default', ['connect','watch']);
