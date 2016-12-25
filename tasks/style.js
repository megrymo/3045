import gulp from 'gulp';
import stylus from 'gulp-stylus';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import nib from 'nib';
import sopStyle from 'sop-styl';

export default function styleTask() {
  return gulp.src('./src/index.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      import: 'core/fonts/internal',
      use: [
        nib(),
        sopStyle()
      ]
    }))
    .pipe(rename(require('./style/rename')))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'))
    .pipe(rename(function (filename) {
      filename.basename = 'overrides.original';
    }))
    .pipe(gulp.dest('./dist/css'));
}

export default function separatesTask() {
  return gulp.src('./src/!(core)/**/*-separate.styl')
    .pipe(stylus({
      use: [
        nib(),
        sopStyle()
      ],
      import: [
        'nib',
        'sop-styl',
        __dirname + '/../src/core',
        __dirname + '/../src/core/fonts/internal'
      ]
    }))
    .pipe(gulp.dest('./build/separate-css'));
}

gulp.task('separate-styles', separatesTask);
gulp.task('styles', styleTask);
gulp.task('style', ['styles', 'separate-styles']);
