/* eslint-disable no-console */
/**
 * Created by ashish on 3/7/17.
 */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const Boom = require('boom');
const Response = require('../src/response');
const lambdaResponseFormatter = require('../src/lambdaResponseFormatter');

chai.use(sinonChai);
chai.use(chaiAsPromised);

chai.should();

describe('lambdaResponseFormatter', () => {
  describe('finish', () => {
    let tempConsole;
    let middleware;
    let response;

    beforeEach(() => {
      tempConsole = console.log;
      console.log = sinon.stub();
      // eslint-disable-next-line prefer-destructuring
      middleware = lambdaResponseFormatter.middleware;
      response = new Response();
    });

    afterEach(() => {
      console.log = tempConsole;
      lambdaResponseFormatter.middleware = middleware;
    });

    it('should log error if middleware throws error', (done) => {
      const error = new Error('bad Error');
      lambdaResponseFormatter.middleware = () => {
        throw error;
      };
      const expectation = {
        body: JSON.stringify({ hello: 'world' }),
        statusCode: 123,
        headers: {
          'Content-Type': 'text/xml',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const fn = (e, object) => {
        (e === null).should.be.eql(true);
        object.should.be.deep.eql(expectation);
        console.log.should.have.callCount(1);
        console.log.should.have.been.calledWith('--> MiddleWareError:', error);
        done();
      };
      lambdaResponseFormatter.finish(fn, response.respond(123, { hello: 'world' }, { 'Content-Type': 'text/xml' }));
    });

    it('should call callback with correctly built parameters', (done) => {
      const expectation = {
        body: JSON.stringify({ hello: 'world' }),
        statusCode: 123,
        headers: {
          'Content-Type': 'text/xml',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const fn = (e, object) => {
        (e === null).should.be.eql(true);
        object.should.be.deep.eql(expectation);
        console.log.should.have.callCount(0);
        done();
      };
      lambdaResponseFormatter.finish(fn, response.respond(123, { hello: 'world' }, { 'Content-Type': 'text/xml' }));
    });
  });

  describe('errorHandler', () => {
    let tempConsole;

    beforeEach(() => {
      tempConsole = console.log;
      console.log = sinon.stub();
    });

    afterEach(() => {
      console.log = tempConsole;
    });

    it('should print logs if `process.env.debug` is set to `true`', (done) => {
      const err = new Error('error');
      const fn = () => {
        console.log.should.have.callCount(1);
        done();
      };
      process.env.debug = 'true';
      lambdaResponseFormatter.errorHandler(fn, err);
    });

    it('should not print logs if `process.env.debug` is set to `false`', (done) => {
      const err = new Error('error');
      const fn = () => {
        console.log.should.have.callCount(0);
        done();
      };
      process.env.debug = 'false';
      lambdaResponseFormatter.errorHandler(fn, err);
    });

    it('should execute callback correctly (non boom error)', (done) => {
      const err = new Error('error');
      const expectation = {
        body: JSON.stringify({
          errors: [{
            status: '500',
            title: 'Internal Server Error',
            detail: 'An internal server error occurred',
            meta: 'error',
          }],
        }),
        statusCode: '500',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const fn = (e, object) => {
        (e === null).should.be.eql(true);
        object.should.be.deep.eql(expectation);
        done();
      };
      lambdaResponseFormatter.errorHandler(fn, err);
    });

    it('should execute callback correctly (boom error)', (done) => {
      const err = Boom.entityTooLarge('big entity');
      const expectation = {
        body: JSON.stringify({
          errors: [{
            status: '413',
            title: 'Request Entity Too Large',
            detail: 'big entity',
            meta: 'big entity',
          }],
        }),
        statusCode: '413',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const fn = (e, object) => {
        (e === null).should.be.eql(true);
        object.should.be.deep.eql(expectation);
        done();
      };
      lambdaResponseFormatter.errorHandler(fn, err);
    });
  });
});
