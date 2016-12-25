import {assert, should, default as chai} from 'chai';
import mockery from 'mockery';
import {spy as Spy} from 'sinon';
import sinonChai from 'sinon-chai';

should();
chai.use(sinonChai);

describe('clean-dist task', function () {
  const delSpy = new Spy();

  beforeEach(function () {
    mockery.enable();
    mockery.registerMock('del', delSpy);
    mockery.warnOnUnregistered(false);
  });

  it('should should call `del` with build html and js', function () {
    const clean = require('./../tasks/clean-dist');
    const callbackSpy = new Spy();

    assert.typeOf(clean, 'Function');

    clean(callbackSpy);

    delSpy.should.have.been.calledWith(["dist"], callbackSpy);
  });

  afterEach(function () {
    mockery.disable();
    mockery.deregisterAll();
  });
});
