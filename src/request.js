/**
 * Created by ashish on 11/1/17.
 */
const QS = require('qs');

class Request {
  /**
   * @param id
   * @param method
   * @param headers
   * @param url
   * @param body
   */
  constructor(id, method, headers, url, body) {
    this.id = id;
    this.method = method;
    this.headers = headers;
    this.url = url;
    this.body = body;
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setEnv(env) {
    this.env = env;
  }

  getEnv() {
    return this.env;
  }

  /**
   * @param event
   * @returns {Request}
   */
  static normaliseLambdaRequest(event) {
    const headers = Object.keys(event.headers).reduce((result, key) => {
      // eslint-disable-next-line no-param-reassign
      result[key.toLowerCase()] = event.headers[key];
      return result;
    }, {});
    const method = event.httpMethod.toLowerCase();
    const url = {
      host: headers.host,
      params: {},
      pathname: event.path,
      // query: event.queryStringParameters || {},
      query: QS.parse(QS.stringify(event.queryStringParameters || {})),
    };

    if (event.pathParameters) {
      Object.keys(event.pathParameters).forEach((v) => {
        url.params[v] = decodeURIComponent(event.pathParameters[v]);
      });
    }

    let { body } = event;
    try {
      // eslint-disable-next-line no-const-assign
      body = JSON.parse(body);
    } catch (e) {
      // Do nothing...
    }
    return new Request(event.requestContext.requestId, method, headers, url, body);
  }
}

module.exports = Request;
