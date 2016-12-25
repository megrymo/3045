import gulp from 'gulp';
import connect from 'gulp-connect';

gulp.task('server', function serverTask() {
  connect.server({
    root: [
      'build',
      'src'
    ],
    port: process.env.PORT || 8080,
    livereload: true
  });
});
