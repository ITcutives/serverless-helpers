/* eslint-disable no-console */
/**
 * Created by ashish on 3/7/17.
 */
const Boom = require('@hapi/boom');
const Response = require('../src/response');
const lambdaResponseFormatter = require('../src/lambdaResponseFormatter');

describe('lambdaResponseFormatter', () => {
  describe('responseHandler', () => {
    let tempConsole;
    let middleware;
    let response;

    beforeEach(() => {
      tempConsole = console.log;
      console.log = jest.fn();
      // eslint-disable-next-line prefer-destructuring
      middleware = lambdaResponseFormatter.middleware;
      response = new Response();
    });

    afterEach(() => {
      console.log = tempConsole;
      lambdaResponseFormatter.middleware = middleware;
    });

    it('should log error if middleware throws error', async () => {
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
      const result = await lambdaResponseFormatter.responseHandler(response.respond(123, '{"hello":"world"}', { 'Content-Type': 'text/xml' }));
      expect(result).toEqual(expectation);
      expect(console.log).toHaveBeenCalledWith('--> MiddleWareError:', error);
    });

    it('should call callback with correctly built parameters', async () => {
      const expectation = {
        body: JSON.stringify({ hello: 'world' }),
        statusCode: 123,
        headers: {
          'Content-Type': 'text/xml',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const result = await lambdaResponseFormatter.responseHandler(response.respond(123, '{"hello":"world"}', { 'Content-Type': 'text/xml' }));
      expect(result).toEqual(expectation);
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('errorHandler', () => {
    let tempConsole;

    beforeEach(() => {
      tempConsole = console.log;
      console.log = jest.fn();
    });

    afterEach(() => {
      console.log = tempConsole;
    });

    it('should print logs if `process.env.debug` is set to `true`', async () => {
      const err = new Error('error');
      process.env.debug = 'true';
      await lambdaResponseFormatter.errorHandler(err);
      expect(console.log).toHaveBeenCalled();
    });

    it('should not print logs if `process.env.debug` is set to `false`', async () => {
      const err = new Error('error');
      process.env.debug = 'false';
      await lambdaResponseFormatter.errorHandler(err);
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should execute callback correctly (non boom error)', async () => {
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
      const result = await lambdaResponseFormatter.errorHandler(err);
      expect(result).toEqual(expectation);
    });

    it('should execute callback correctly (boom error)', async () => {
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
      const result = await lambdaResponseFormatter.errorHandler(err);
      expect(result).toEqual(expectation);
    });
  });
});
