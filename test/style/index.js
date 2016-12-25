var assert = require('chai').assert;
var style = require('./../../tasks/style');

describe('style task', function () {
  it('should be a function', function () {
    assert.typeOf(style, 'Function');
  });
});
