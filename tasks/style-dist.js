import gulp from 'gulp';
import stylus from 'gulp-stylus';
import rename from 'gulp-rename';
import path from 'path';
import nib from 'nib';
import sopStyle from 'sop-styl';

export default function styleDistTask() {
  return gulp.src('./src/index.styl')
    .pipe(stylus({
      import: 'core/fonts/server',
      compress: true,
      use: [
        nib(),
        sopStyle()
      ],
      url: {
        name: 'url',
        paths: [path.join(__dirname, '/src')]
      }
    }))
    .pipe(rename(require('./style/rename')))
    .pipe(gulp.dest('./dist/css'));
}

export default function separatesDistTask() {
  return gulp.src('./src/!(core)/**/*-separate.styl')
    .pipe(stylus({
      import: [
        'nib',
        'sop-styl',
        __dirname + '/../src/core',
        __dirname + '/../src/core/fonts/server'
      ],
      compress: false,
      use: [
        nib(),
        sopStyle()
      ],
      url: {
        name: 'url',
        paths: [path.join(__dirname, '/../src/')]
      }
    }))
    .pipe(gulp.dest('./dist/separate-css'));
}

gulp.task('separate-css:dist', separatesDistTask);
gulp.task('style:dist', ['clean:dist', 'separate-css:dist'], styleDistTask);
