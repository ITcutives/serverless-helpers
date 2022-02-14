/**
 * Created by ashish on 31/12/16.
 */
const boomToJsonAPI = require('./boom-to-jsonapi');
const Response = require('./response');

class LambdaResponseFormatter {
  static async middleware() {
    return true;
  }

  static async responseHandler(resp) {
    const { statusCode, body, headers } = resp;
    const internalHeaders = {};
    internalHeaders['Access-Control-Allow-Origin'] = '*';

    try {
      await this.middleware(resp);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('--> MiddleWareError:', error);
    }

    const finalHeaders = Object.assign(internalHeaders, headers);
    return {
      body,
      headers: finalHeaders,
      statusCode,
    };
  }

  static errorHandler(error) {
    const response = new Response();
    const jsonError = boomToJsonAPI(error);
    // Log the original error
    if (process.env.debug === 'true') {
      // eslint-disable-next-line no-console
      console.log('--> Error:', error);
    }

    return LambdaResponseFormatter.responseHandler(response.respond(jsonError.errors[0].status, JSON.stringify(jsonError), { 'Content-Type': 'application/json' }));
  }
}

module.exports = LambdaResponseFormatter;
