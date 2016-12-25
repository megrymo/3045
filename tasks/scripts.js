import gulp from 'gulp';
import browserify from 'gulp-browserify';

gulp.task('scripts', ['htmlStatic'], function scriptsTask() {
  return gulp.src('./src/!(core)/**/main.js')
    .pipe(browserify({
      debug: true,
      transform: [
        'babelify',
        'brfs',
        'yamlify'
      ]
    }))
    .pipe(gulp.dest('./build'));
});
