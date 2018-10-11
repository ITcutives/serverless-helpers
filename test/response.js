/**
 * Created by ashish on 3/7/17.
 */
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

const Response = require('../src/response');

chai.use(sinonChai);
chai.use(chaiAsPromised);

chai.should();

describe('response', () => {
  describe('respond', () => {
    it('should set properties and return the object', () => {
      const o = new Response();
      o.respond(123, { hello: 'world' }, { 'Content-Type': 'text/xml' });
      o.statusCode.should.be.eql(123);
      o.body.should.be.deep.eql({ hello: 'world' });
      o.headers.should.be.deep.eql({ 'Content-Type': 'text/xml' });
    });
  });
});
