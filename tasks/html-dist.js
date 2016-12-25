import jsonHbsHtml from 'gulp-json-to-hbs-to-html';
import rename from 'gulp-rename';
import gulp from 'gulp';
import addHtmlExt from './html/rename';
import replace from 'gulp-replace';
import inline from 'gulp-inline-source';
import handlebars from 'handlebars';
import strip from 'gulp-strip-comments';

/**
 * Dist HTML task
 * @module tasks/html-dist
 * @requires gulp-json-to-hbs-to-html
 * @requires gulp-rename
 * @requires gulp
 * @requires tasks/html/rename
 * @requires gulp-replace
 * @requires gulp-inline-source
 * @requires handlebars
 */

/**
 * Dist task
 *
 * @return {Stream} Vinyl source stream
 */
function distTask() {
  const jsonHbsHtmlOptions = require('./html/options')(handlebars);

  return gulp.src('./src/**/*.yaml')
    .pipe(jsonHbsHtml(jsonHbsHtmlOptions))

    // converts comment to empty string instead of development partial
    .pipe(replace(/<!-- dev\w* -->/g, ''))

    // changes src paths from local directory paths for demandware
    .pipe(replace('/content', 'content'))

    .pipe(rename(addHtmlExt))
    .pipe(inline({
      rootpath: 'build',
      attribute: 'inline',
      compress: true
    }))
    .pipe(inline({
      rootpath: 'build',
      attribute: 'inject',
      compress: false
    }))

    // take away block comments
    .pipe(strip({
      block: true
    }))

    // adding break between <script> tags and scripts b/c scripts were being removed by demandware
    .pipe(replace(/<script>/g, '<script>\n'))
    .pipe(replace(/<\/script>/g, '\n</script>'))

    // takes multiple line breaks and turns into one
    .pipe(replace(/\n{2,}/g, '\n'))

    // converts lines with just a line break and / or spaces and kills them
    .pipe(replace(/^\s*\n/g, ''))

    .pipe(gulp.dest('./dist'));
}

gulp.task('html:dist', ['partials'], distTask);
