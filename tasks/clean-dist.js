import gulp from 'gulp';
import del from 'del';

export default function cleanDist(done) {
  del([
    'dist'
  ], done);
}

gulp.task('clean:dist', cleanDist);
