import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('eslint', function eslintTask() {
  return gulp.src('./src/**/*.js')
   .pipe(eslint())
   .pipe(eslint.format());
});
