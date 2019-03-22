/**
 * Created by ashish on 3/7/17.
 */
const Response = require('../src/response');

describe('response', () => {
  describe('respond', () => {
    it('should set properties and return the object', () => {
      const o = new Response();
      o.respond(123, { hello: 'world' }, { 'Content-Type': 'text/xml' });
      expect(o.statusCode).toBe(123);
      expect(o.body).toEqual({ hello: 'world' });
      expect(o.headers).toEqual({ 'Content-Type': 'text/xml' });
    });
  });
});
