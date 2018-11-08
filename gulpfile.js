var 
  gulp = require('gulp'),
  path = require('path'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  runSequence = require('run-sequence'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  del = require('del');

var
  src_sass = path.join('./scss', '**', '*.scss'),
  dist_dir = './dist';


gulp.task('clean', function (cb) {
  return del([dist_dir], cb);
}).help = 'Remove files.';


gulp.task('sass-min', function () {
  return gulp
    .src(src_sass)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed',
      sourceComments: false
    }))
    .pipe(autoprefixer({
      browsers: ['last 3 version', 'ie >= 10']
    }))
    .pipe(rename('grid-layout.min.css'))
    .pipe(gulp.dest(dist_dir));
}).help = 'Compiles, minifies and autoprefixes sass desktop source files.';


gulp.task('sass', function () {
  return gulp
    .src(src_sass)
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 3 version', 'ie >= 10']
    }))
    .pipe(gulp.dest(dist_dir));
}).help = 'Compiles and autoprefixes sass desktop source files.';


gulp.task('watch', function () {
  gulp.watch(src_sass, ['sass', 'sass-min']);
}).help = 'Keeps watching for changes in sass (trigger sass).';


gulp.task('dist', function () {
  runSequence(
    'clean',
    ['sass', 'sass-min'],
    function () {
      gulp.src('').pipe(notify({
        title: 'Dist',
        message: 'Build task done!'
      }));
    }
  );
}).help = 'Builds dist. Executes clean and sass-min.';


gulp.task('default', function () {
  runSequence(
    'clean',
    ['sass', 'sass-min'], ['watch'],
    function () {
      gulp.src('').pipe(notify({
        title: 'Development',
        message: 'Built task done, now watching for changes...'
      }));
    }
  );
}).help = 'Build assets for development. Executes sass. Keeps watching for changes';
