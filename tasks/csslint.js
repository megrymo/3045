import csslint from 'gulp-csslint';
import gulp from 'gulp';

gulp.task('csslint', function csslintTask() {
  return gulp.src('./build/css/index.css')
   .pipe(csslint('.csslintrc.json'))
   .pipe(csslint.reporter());
});
