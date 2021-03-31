const Boom = require('@hapi/boom');
const REQ = require('../src/request');
const RES = require('../src/response');
const LambdaResponseFormatter = require('../src/lambdaResponseFormatter');

module.exports.hello = async (event) => {
  const request = REQ.normaliseLambdaRequest(event);
  const response = new RES();
  try {
    // custom error message example
    if (request.url.params.message === 'error') {
      throw Boom.badRequest('CUSTOM001:you requested error');
    }
    response.respond(200, request);
    return LambdaResponseFormatter.responseHandler(response);
  } catch (e) {
    return LambdaResponseFormatter.errorHandler(e);
  }
};
