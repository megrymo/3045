import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dist', function distTask() {
  runSequence(
    ['clean:dist'],
    ['content:dist', 'style:dist', 'overrides'],
    ['scripts'],
    ['html:dist']
   );
});
