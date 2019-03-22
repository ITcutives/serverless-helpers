/**
 * Created by ashish on 11/1/17.
 */
class Response {
  constructor() {
    this.headers = {};
  }

  /**
   * @param statusCode
   * @param body
   * @param headers
   * @returns {Response}
   */
  respond(statusCode, body, headers) {
    this.statusCode = statusCode;
    this.body = body;
    this.headers = Object.assign(this.headers, headers);
    return this;
  }
}

module.exports = Response;
