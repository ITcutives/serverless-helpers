/**
 * Created by ashish on 31/12/16.
 */
const boomToJsonAPI = require('./boom-to-jsonapi');
let finish,
  errorHandler;

finish = (cb, statusCode, body, customHeaders) => {
  const internalHeaders = {};
  internalHeaders['Content-Type'] = 'application/json';
  internalHeaders['Access-Control-Allow-Origin'] = '*';

  const headers = Object.assign(internalHeaders, customHeaders);
  cb(null, {
    body: JSON.stringify(body),
    headers: headers,
    statusCode: statusCode
  });
};

errorHandler = (cb, error) => {
  let jsonError = boomToJsonAPI(error);
  // Log the original error
  if (process.env.debug === 'true') {
    console.log('--> Error:', error);
    console.log('--> Stack:', error.stack);
  }

  finish(cb, jsonError.errors[0].status, jsonError);
};

module.exports = {finish, errorHandler};
