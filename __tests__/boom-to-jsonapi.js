/**
 * Created by ashish on 03/06/18.
 */
const Boom = require('@hapi/boom');
const boomToJsonAPI = require('../src/boom-to-jsonapi');

describe('boom-to-jsonapi', () => {
  it('should convert the error object into jsonapi formatted object', () => {
    expect(boomToJsonAPI(new Error('random error'))).toEqual({
      errors: [{
        status: '500',
        title: 'Internal Server Error',
        detail: 'An internal server error occurred',
        code: undefined,
        meta: 'random error',
      }],
    });
  });

  it('should convert the boom object into jsonapi formatted object', () => {
    expect(boomToJsonAPI(Boom.badRequest('BAD Request'))).toEqual({
      errors: [{
        status: '400',
        title: 'Bad Request',
        detail: 'BAD Request',
        code: undefined,
        meta: 'BAD Request',
      }],
    });
  });

  it('should split code and message from the boom object into jsonapi formatted object', () => {
    expect(boomToJsonAPI(Boom.badRequest('CODE :Some Error:it happened'))).toEqual({
      errors: [{
        status: '400',
        title: 'Bad Request',
        detail: 'Some Error:it happened',
        code: 'CODE',
        meta: 'CODE :Some Error:it happened',
      }],
    });
  });

  it('should split and trim spaces from code and message from the boom object into jsonapi formatted object', () => {
    expect(boomToJsonAPI(Boom.badRequest('CODE : Some Error: it happened'))).toEqual({
      errors: [{
        status: '400',
        title: 'Bad Request',
        detail: 'Some Error:it happened',
        code: 'CODE',
        meta: 'CODE : Some Error: it happened',
      }],
    });
  });

  it('should put proper error message as meta', () => {
    const response = boomToJsonAPI(Boom.badRequest('CODE : Some Error: it happened', Boom.forbidden('Not allowed')));
    const error = response.errors[0];
    expect(error.status).toBe('400');
    expect(error.title).toBe('Bad Request');
    expect(error.detail).toBe('Some Error:it happened');
    expect(error.code).toBe('CODE');
    expect(error.meta.indexOf('Not allowed')).not.toBe(-1);
    expect(error.meta.indexOf('boom-to-jsonapi.js')).not.toBe(-1);
  });
});
