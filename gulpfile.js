var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var injectPartials = require('gulp-inject-partials');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var thirdpartyJs = ['js/jquery.min.js'];
// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

gulp.task('js', function () {
    return gulp.src([
        'js/*.js',
        '!js/*.min.js',
       ])
      .pipe(uglify())
      .pipe(rename(function(path) {
        path.extname = ".min.js";
      }))
      .pipe(gulp.dest('js/'));
  });

  gulp.task('css', function () {
    return gulp.src([
        'css/*.css',
        '!css/*.min.css',
       ])
      .pipe(csso())
      .pipe(rename(function(path) {
        path.extname = ".min.css";
      }))
      .pipe(gulp.dest('css/'));
  });

  gulp.task('js-thirdparty-min', function() {
    return gulp.src(thirdpartyJs)
        .pipe(concat('fs.thirdparty.min.js'))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest('js/'));
  });

gulp.task('scss', function(done) {
    runSequence( "css", "js", 'js-thirdparty-min', done);
});

gulp.task('default', ['scss']);
