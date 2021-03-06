/**
 * Created by ashish on 3/7/17.
 */
const Request = require('../src/request');

describe('request', () => {
  describe('normaliseLambdaRequest', () => {
    it('should correctly build response object from lambda event', () => {
      const event = {
        resource: '/v1/{parent}/{id}/{association}',
        path: '/v1/users/2/webservices',
        httpMethod: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.8,hi;q=0.6',
          Authorization: 'Bearer ABCD',
          'cache-control': 'no-cache',
          Host: '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
          origin: 'http://localhost:8080',
          pragma: 'no-cache',
          Referer: 'http://localhost:8080/',
          'User-Agent': 'Mozilla/5.0',
          Via: '2.0 8f1576b7655be126377fe32a39c280b6.cloudfront.net (CloudFront)',
        },
        queryStringParameters: {
          'fields[webservices]': 'id,name,adapter',
          'fields[users]': 'id,name',
        },
        pathParameters: {
          parent: 'users',
          association: 'webservices',
          id: 'ashish%40gmail.com',
        },
        stageVariables: null,
        requestContext: {
          path: '/dev/v1/users/2/webservices',
          accountId: '679802029599',
          resourceId: 'ujv7uo',
          stage: 'dev',
          requestId: '992d7b5f-60ae-11e7-afd3-a731ab6f7abe',
          identity: {},
          resourcePath: '/v1/{parent}/{id}/{association}',
          httpMethod: 'GET',
          apiId: '1xtqdza31m',
        },
        body: null,
        isBase64Encoded: false,
      };
      const url = {
        host: '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
        params: { parent: 'users', association: 'webservices', id: 'ashish@gmail.com' },
        pathname: '/v1/users/2/webservices',
        query: {
          fields: {
            webservices: 'id,name,adapter',
            users: 'id,name',
          },
        },
      };
      const headers = {
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.8,hi;q=0.6',
        authorization: 'Bearer ABCD',
        'cache-control': 'no-cache',
        host: '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
        origin: 'http://localhost:8080',
        pragma: 'no-cache',
        referer: 'http://localhost:8080/',
        'user-agent': 'Mozilla/5.0',
        via: '2.0 8f1576b7655be126377fe32a39c280b6.cloudfront.net (CloudFront)',
      };
      const expectation = new Request('992d7b5f-60ae-11e7-afd3-a731ab6f7abe', 'get', headers, url, null);
      expect(Request.normaliseLambdaRequest(event)).toEqual(expectation);
    });

    it('should correctly build response object from lambda event (without pathParams and qs)', () => {
      const event = {
        resource: '/v1/{parent}/{id}/{association}',
        path: '/v1/organisations/2/webservices',
        httpMethod: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.8,hi;q=0.6',
          Authorization: 'Bearer ABCD',
          'cache-control': 'no-cache',
          Host: '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
          origin: 'http://localhost:8080',
          pragma: 'no-cache',
          Referer: 'http://localhost:8080/',
          'User-Agent': 'Mozilla/5.0',
          Via: '2.0 8f1576b7655be126377fe32a39c280b6.cloudfront.net (CloudFront)',
        },
        queryStringParameters: null,
        pathParameters: null,
        stageVariables: null,
        requestContext: {
          path: '/dev/v1/organisations/2/webservices',
          accountId: '679802029599',
          resourceId: 'ujv7uo',
          stage: 'dev',
          requestId: '992d7b5f-60ae-11e7-afd3-a731ab6f7abe',
          identity: {},
          resourcePath: '/v1/{parent}/{id}/{association}',
          httpMethod: 'GET',
          apiId: '1xtqdza31m',
        },
        body: null,
        isBase64Encoded: false,
      };
      const url = {
        host: '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
        params: {},
        pathname: '/v1/organisations/2/webservices',
        query: {},
      };
      const headers = {
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.8,hi;q=0.6',
        authorization: 'Bearer ABCD',
        'cache-control': 'no-cache',
        host: '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
        origin: 'http://localhost:8080',
        pragma: 'no-cache',
        referer: 'http://localhost:8080/',
        'user-agent': 'Mozilla/5.0',
        via: '2.0 8f1576b7655be126377fe32a39c280b6.cloudfront.net (CloudFront)',
      };
      const expectation = new Request('992d7b5f-60ae-11e7-afd3-a731ab6f7abe', 'get', headers, url, null);
      expect(Request.normaliseLambdaRequest(event)).toEqual(expectation);
    });
  });

  describe('env (get/set)', () => {
    it('should assign `env` properly', () => {
      const req = new Request();
      req.setEnv({ abcd: 'xyz' });
      expect(req.getEnv()).toEqual({ abcd: 'xyz' });
    });
  });

  describe('token (get/set)', () => {
    const req = new Request();
    req.setToken({ abcd: 'xyz' });
    expect(req.getToken()).toEqual({ abcd: 'xyz' });
  });
});
