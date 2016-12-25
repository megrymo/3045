import {assert, should, default as chai} from 'chai';
import mockery from 'mockery';
import {spy as Spy} from 'sinon';
import sinonChai from 'sinon-chai';
import {default as File} from 'vinyl';
import es from 'event-stream';

should();
chai.use(sinonChai);

describe('html task', function () {
  beforeEach(function () {
    mockery.enable();
    mockery.registerMock('gulp', {
      task: () => {},
      src: function () {
        return new File({
          content: es.readArray(['stream', 'with', 'contents'])
        });
      },
      dest: () => {
        return {
          on: function () {
            console.log(arguments);
          },
          emit: () => {
            console.log(arguments);
          },
          once: () => {
            console.log(arguments);
          }
        };
      }
    });

    mockery.warnOnUnregistered(false);
  });

  it('should do stuff', function () {
    const html = require('./../tasks/html');

    assert.typeOf(html, 'Function');

    html();
  });

  afterEach(function () {
    mockery.disable();
    mockery.deregisterAll();
  });
});
