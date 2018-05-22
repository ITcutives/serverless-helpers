/**
 * Created by ashish on 3/7/17.
 */
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

const Request = require('../src/request');

chai.use(sinonChai);
chai.use(chaiAsPromised);

chai.should();

describe('helpers.request', () => {
  describe('normaliseLambdaRequest', () => {
    it('should correctly build response object from lambda event', () => {
      let event, url, headers, expectation;
      event = {
        'resource': '/v1/{parent}/{id}/{association}',
        'path': '/v1/organisations/2/webservices',
        'httpMethod': 'GET',
        'headers': {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.8,hi;q=0.6',
          'Authorization': 'Bearer ABCD',
          'cache-control': 'no-cache',
          'Host': '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
          'origin': 'http://localhost:8080',
          'pragma': 'no-cache',
          'Referer': 'http://localhost:8080/',
          'User-Agent': 'Mozilla/5.0',
          'Via': '2.0 8f1576b7655be126377fe32a39c280b6.cloudfront.net (CloudFront)'
        },
        'queryStringParameters': {
          'fields': 'id,name,adapter'
        },
        'pathParameters': {
          'parent': 'organisations',
          'association': 'webservices',
          'id': '2'
        },
        'stageVariables': null,
        'requestContext': {
          'path': '/dev/v1/organisations/2/webservices',
          'accountId': '679802029599',
          'resourceId': 'ujv7uo',
          'stage': 'dev',
          'requestId': '992d7b5f-60ae-11e7-afd3-a731ab6f7abe',
          'identity': {},
          'resourcePath': '/v1/{parent}/{id}/{association}',
          'httpMethod': 'GET',
          'apiId': '1xtqdza31m'
        },
        'body': null,
        'isBase64Encoded': false
      };
      url = {
        host: '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
        params: {parent: 'organisations', association: 'webservices', id: '2'},
        pathname: '/v1/organisations/2/webservices',
        query: {fields: 'id,name,adapter'}
      };
      headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.8,hi;q=0.6',
        'authorization': 'Bearer ABCD',
        'cache-control': 'no-cache',
        'host': '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
        'origin': 'http://localhost:8080',
        'pragma': 'no-cache',
        'referer': 'http://localhost:8080/',
        'user-agent': 'Mozilla/5.0',
        'via': '2.0 8f1576b7655be126377fe32a39c280b6.cloudfront.net (CloudFront)'
      };
      expectation = new Request('992d7b5f-60ae-11e7-afd3-a731ab6f7abe', 'get', headers, url, null);
      Request.normaliseLambdaRequest(event).should.be.deep.eql(expectation);
    });

    it('should correctly build response object from lambda event (without pathParams and qs)', () => {
      let event, url, headers, expectation;
      event = {
        'resource': '/v1/{parent}/{id}/{association}',
        'path': '/v1/organisations/2/webservices',
        'httpMethod': 'GET',
        'headers': {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.8,hi;q=0.6',
          'Authorization': 'Bearer ABCD',
          'cache-control': 'no-cache',
          'Host': '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
          'origin': 'http://localhost:8080',
          'pragma': 'no-cache',
          'Referer': 'http://localhost:8080/',
          'User-Agent': 'Mozilla/5.0',
          'Via': '2.0 8f1576b7655be126377fe32a39c280b6.cloudfront.net (CloudFront)'
        },
        'queryStringParameters': null,
        'pathParameters': null,
        'stageVariables': null,
        'requestContext': {
          'path': '/dev/v1/organisations/2/webservices',
          'accountId': '679802029599',
          'resourceId': 'ujv7uo',
          'stage': 'dev',
          'requestId': '992d7b5f-60ae-11e7-afd3-a731ab6f7abe',
          'identity': {},
          'resourcePath': '/v1/{parent}/{id}/{association}',
          'httpMethod': 'GET',
          'apiId': '1xtqdza31m'
        },
        'body': null,
        'isBase64Encoded': false
      };
      url = {
        host: '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
        params: {},
        pathname: '/v1/organisations/2/webservices',
        query: {}
      };
      headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.8,hi;q=0.6',
        'authorization': 'Bearer ABCD',
        'cache-control': 'no-cache',
        'host': '1xtqdza31m.execute-api.ap-southeast-2.amazonaws.com',
        'origin': 'http://localhost:8080',
        'pragma': 'no-cache',
        'referer': 'http://localhost:8080/',
        'user-agent': 'Mozilla/5.0',
        'via': '2.0 8f1576b7655be126377fe32a39c280b6.cloudfront.net (CloudFront)'
      };
      expectation = new Request('992d7b5f-60ae-11e7-afd3-a731ab6f7abe', 'get', headers, url, null);
      Request.normaliseLambdaRequest(event).should.be.deep.eql(expectation);
    });
  });

  describe('env (get/set)', () => {
    it('should assign `env` properly', () => {
      let req = new Request();
      req.setEnv({'abcd': 'xyz'});
      req.getEnv().should.be.deep.eql({'abcd': 'xyz'});
    });
  });

  describe('token (get/set)', () => {
    let req = new Request();
    req.setToken({'abcd': 'xyz'});
    req.getToken().should.be.deep.eql({'abcd': 'xyz'});
  });
});
