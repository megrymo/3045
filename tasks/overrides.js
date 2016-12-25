import gulp from 'gulp';

gulp.task('overrides', function overridesTask() {
  return gulp.src('./src/!(core)/**/*.css')
    .pipe(gulp.dest('./build'));
});
