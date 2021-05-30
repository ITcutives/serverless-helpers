/**
 * Created by ashish on 3/7/17.
 */
const Response = require('../src/response');

describe('response', () => {
  let o;

  beforeEach(() => {
    o = new Response();
  });

  describe('addHeaders', () => {
    it('should add to headers object', () => {
      o.headers = {
        'Content-Type': 'text/xml',
      };
      o.addHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      });

      expect(o.headers).toEqual({
        'Content-Type': 'text/xml',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      });
    });

    it('should add to headers object', () => {
      o.headers = {
        'Content-Type': 'text/xml',
      };
      o.addHeaders({
        'Content-Type': 'text/json',
      });

      expect(o.headers).toEqual({
        'Content-Type': 'text/json',
      });
    });
  });

  describe('respond', () => {
    it('should set properties and return the object', () => {
      o.respond(123, { hello: 'world' }, { 'Content-Type': 'text/xml' });
      expect(o.statusCode).toBe(123);
      expect(o.body).toEqual({ hello: 'world' });
      expect(o.headers).toEqual({ 'Content-Type': 'text/xml' });
    });
  });
});
