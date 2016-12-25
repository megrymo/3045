import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

export default function assetsDistTask() {
  return gulp.src('./src/content/**/*')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./dist/content'));
}

gulp.task('content:dist', assetsDistTask);
