import gulp from 'gulp';
import watch from 'gulp-watch';

gulp.task('watch', function watchTask() {
  watch('./src/**/*.{json,yaml,html}', function htmlWatch() {
    gulp.start(['html']);
  });
  watch('./src/**/*.styl', function styleWatch() {
    gulp.start(['style']);
  });
  watch('./src/**/*.js', function scriptWatch() {
    gulp.start(['scripts']);
  });
  watch('./src/core/**/*', function coreWatch() {
    gulp.start(['core']);
  });
});
