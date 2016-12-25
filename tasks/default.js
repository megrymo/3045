import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', function defaultTask() {
  runSequence(
    ['clean'],
    ['core'],
    ['style', 'scripts', 'html'],
    ['watch', 'server']
   );
});
