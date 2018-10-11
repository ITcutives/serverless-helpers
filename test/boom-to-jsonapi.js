/**
 * Created by ashish on 03/06/18.
 */
const chai = require('chai');
const Boom = require('boom');
const boomToJsonAPI = require('../src/boom-to-jsonapi');

chai.should();

describe('boom-to-jsonapi', () => {
  it('should convert the error object into jsonapi formatted object', () => {
    boomToJsonAPI(new Error('random error')).should.be.deep.eql({
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
    boomToJsonAPI(Boom.badRequest('BAD Request')).should.be.deep.eql({
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
    boomToJsonAPI(Boom.badRequest('CODE :Some Error:it happened')).should.be.deep.eql({
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
    boomToJsonAPI(Boom.badRequest('CODE : Some Error: it happened')).should.be.deep.eql({
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
    error.status.should.be.eql('400');
    error.title.should.be.eql('Bad Request');
    error.detail.should.be.eql('Some Error:it happened');
    error.code.should.be.eql('CODE');
    error.meta.indexOf('Not allowed').should.not.be.eql(-1);
    error.meta.indexOf('boom-to-jsonapi.js').should.not.be.eql(-1);
  });
});
