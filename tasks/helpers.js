import handlebars from 'handlebars';
import helpers from 'diy-handlebars-helpers';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const helpersFolder = path.join(__dirname, '..', '/src/core/helpers/');

_.each(helpers, function forEachDIYHelpers(item, index) {
  handlebars.registerHelper(index, item);
});

function eachHelper(filename) {
  handlebars.registerHelper(
    filename.replace('.js', ''),
    require(path.join(helpersFolder, filename))
  );
}

fs.readdir(helpersFolder, function onHelpersReaddir(err, files) {
  if (err) {
    throw err;
  }

  _.each(files, eachHelper);
});
