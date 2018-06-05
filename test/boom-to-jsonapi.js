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
        code: undefined
      }]
    });
  });

  it('should convert the boom object into jsonapi formatted object', () => {
    boomToJsonAPI(Boom.badRequest('BAD Request')).should.be.deep.eql({
      errors: [{
        status: '400',
        title: 'Bad Request',
        detail: 'BAD Request',
        code: undefined
      }]
    });
  });

  it('should split code and message from the boom object into jsonapi formatted object', () => {
    boomToJsonAPI(Boom.badRequest('CODE :Some Error:it happened')).should.be.deep.eql({
      errors: [{
        status: '400',
        title: 'Bad Request',
        detail: 'Some Error:it happened',
        code: 'CODE'
      }]
    });
  });
});
