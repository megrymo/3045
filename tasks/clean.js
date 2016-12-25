import gulp from 'gulp';
import del from 'del';

export default function cleanTask(done) {
  del([
    'build/**/*.html',
    'build/**/*.js'
  ], done);
}

gulp.task('clean', cleanTask);
