/**
 * Created by ashish on 31/12/16.
 */
const boomToJsonAPI = require('./boom-to-jsonapi');
const Response = require('./response');

class LambdaResponseFormatter {
  static async middleware() {
    return true;
  }

  static async finish(cb, resp) {
    const { statusCode, body, headers } = resp;
    const internalHeaders = {};
    internalHeaders['Content-Type'] = 'application/json';
    internalHeaders['Access-Control-Allow-Origin'] = '*';

    try {
      await LambdaResponseFormatter.middleware();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('--> MiddleWareError:', error);
    }

    const finalHeaders = Object.assign(internalHeaders, headers);
    cb(null, {
      body: JSON.stringify(body),
      headers: finalHeaders,
      statusCode,
    });
  }

  static errorHandler(cb, error) {
    const response = new Response();
    const jsonError = boomToJsonAPI(error);
    // Log the original error
    if (process.env.debug === 'true') {
      // eslint-disable-next-line no-console
      console.log('--> Error:', error);
    }

    LambdaResponseFormatter.finish(cb, response.respond(jsonError.errors[0].status, jsonError));
  }
}

module.exports = LambdaResponseFormatter;