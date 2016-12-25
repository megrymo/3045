import gulp from 'gulp';
import glob from 'glob';
import handlebars from 'handlebars';
import fs from 'fs';

function forEachPartial(filename) {
  handlebars.registerPartial(
    filename.replace('src/', '')
      .replace(/\//g, '-')
      .replace('.partial.html', ''),
    fs.readFileSync(filename, 'utf-8')
  );
}

gulp.task('partials', function partialsTask(done) {
  glob('src/**/*.partial.html', function globCallback(err, files) {
    if (err) {
      throw err;
    }

    files.forEach(forEachPartial);

    done();
  });
});
