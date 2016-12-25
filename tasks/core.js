import gulp from 'gulp';

gulp.task('core', function coreTask() {
  return gulp.src('./src/core/**/*')
    .pipe(gulp.dest('./build/core'));
});
