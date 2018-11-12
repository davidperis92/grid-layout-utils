var 
  gulp = require('gulp'),
  path = require('path'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  del = require('del');

var
  src_sass = path.join('./scss', '**', '*.scss'),
  dist_dir = './dist';


const clean = (cb) => del([dist_dir], cb)
clean.help = 'Remove files.';


const sassMin = () => {
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
}
sassMin.help = 'Compiles, minifies and autoprefixes sass desktop source files.';


const sassSrc = () => {
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
}
sassSrc.help = 'Compiles and autoprefixes sass desktop source files.';


const watch = () => gulp.watch(src_sass, gulp.parallel(sassSrc, sassMin))
watch.help = 'Keeps watching for changes in sass (trigger sass).';

const dist = gulp.series(
  clean,
  gulp.parallel(sassSrc, sassMin),
  function info() {
    return gulp.src('/').pipe(notify({
      title: 'Dist',
      message: 'Build task done!'
    }));
  }
)
export { dist }


const defaultTasks = gulp.parallel(
  gulp.series(
    clean,
    gulp.parallel(sassSrc, sassMin),
    function info() {
      return gulp.src('/').pipe(notify({
        title: 'Development',
        message: 'Built task done, now watching for changes...'
      }));
    }
  ), 
  watch
)
export default defaultTasks
