import jsonHbsHtml from 'gulp-json-to-hbs-to-html';
import rename from 'gulp-rename';
import gulp from 'gulp';
import addHtmlExt from './html/rename';
import path from 'path';
import fs from 'fs';
import replace from 'gulp-replace';
import handlebars from 'handlebars';

/**
 * HTML module
 * @module tasks/html
 * @requires tasks/html/options
 * @requires gulp-json-to-hbs-to-html
 * @requires gulp-rename
 * @requires gulp
 * @requires html/rename
 * @requires path
 * @requires fs
 * @requires gulp-replace
 * @requires handlebars
 */

/**
 * Dev partial replacement
 * @param {Vinyl} - partial vinyl source stream
 * @param {string} - param name
 *
 * @return {string} - partial text content
 */
function devPartial(partial, partialType) {
  const templatePath = path.join('./src/vendor', partialType + '.html');
  if (!fs.existsSync(templatePath)) {
    return '';
  }
  return fs.readFileSync(templatePath, 'utf-8');
}

gulp.task('htmlStatic', ['partials'], function htmlTask() {
  const jsonHbsHtmlOptions = require('./html/options')(handlebars);

  return gulp.src('./src/**/static/*.yaml')
    .pipe(jsonHbsHtml(jsonHbsHtmlOptions))
    .pipe(replace(/<!-- (dev\w*) -->/g, devPartial))
    .pipe(rename(addHtmlExt))
    .pipe(gulp.dest('./build'));
});

gulp.task('html', ['partials'], function htmlTask() {
  const jsonHbsHtmlOptions = require('./html/options')(handlebars);

  return gulp.src('./src/**/!(static)/*.yaml')
    .pipe(jsonHbsHtml(jsonHbsHtmlOptions))
    .pipe(replace(/<!-- (dev\w*) -->/g, devPartial))
    .pipe(rename(addHtmlExt))
    .pipe(gulp.dest('./build'));
});
