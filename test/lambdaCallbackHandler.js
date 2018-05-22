/**
 * Created by ashish on 3/7/17.
 */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const Boom = require('boom');
const lambdaCallbackHandler = require('../src/lambdaCallbackHandler');

chai.use(sinonChai);
chai.use(chaiAsPromised);

chai.should();

describe('helpers.lambdaCallbackHandler', () => {
  describe('finish', () => {
    it('should call callback with correctly built parameters', (done) => {
      let expectation, fn;
      expectation = {
        body: JSON.stringify({'hello': 'world'}),
        statusCode: 123,
        headers: {
          'Content-Type': 'text/xml',
          'Access-Control-Allow-Origin': '*'
        }
      };
      fn = (e, object) => {
        (e === null).should.be.eql(true);
        object.should.be.deep.eql(expectation);
        done();
      };
      lambdaCallbackHandler.finish(fn, 123, {'hello': 'world'}, {'Content-Type': 'text/xml'});
    });
  });

  describe('errorHandler', () => {
    let spy;

    beforeEach(() => {
      spy = sinon.spy(console, 'log');
    });

    afterEach(() => {
      console.log.restore();
    });

    it('should print logs if `process.end.debug` is set to `true`', (done) => {
      let err, fn;
      err = new Error('error');
      fn = function() {
        spy.should.have.callCount(2);
        done();
      };
      process.env.debug = 'true';
      lambdaCallbackHandler.errorHandler(fn, err);
    });

    it('should not print logs if `process.end.debug` is set to `false`', (done) => {
      let err, fn;
      err = new Error('error');
      fn = function() {
        spy.should.have.callCount(0);
        done();
      };
      process.env.debug = 'false';
      lambdaCallbackHandler.errorHandler(fn, err);
    });

    it('should execute callback correctly (non boom error)', (done) => {
      let err, expectation, fn;
      err = new Error('error');
      expectation = {
        body: JSON.stringify({
          error: ['An internal server error occurred'],
          detail: {
            'e': err.toString()
          }
        }),
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      fn = function(e, object) {
        (e === null).should.be.eql(true);
        object.should.be.deep.eql(expectation);
        done();
      };
      lambdaCallbackHandler.errorHandler(fn, err);
    });

    it('should execute callback correctly (boom error)', (done) => {
      let err, expectation, fn;
      err = Boom.entityTooLarge('big entity');
      expectation = {
        body: JSON.stringify({
          error: ['big entity']
        }),
        statusCode: 413,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      fn = function(e, object) {
        (e === null).should.be.eql(true);
        object.should.be.deep.eql(expectation);
        done();
      };
      lambdaCallbackHandler.errorHandler(fn, err);
    });
  });
});
