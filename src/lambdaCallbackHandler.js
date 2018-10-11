/**
 * Created by ashish on 31/12/16.
 */
const boomToJsonAPI = require('./boom-to-jsonapi');

const finish = (cb, statusCode, body, customHeaders) => {
  const internalHeaders = {};
  internalHeaders['Content-Type'] = 'application/json';
  internalHeaders['Access-Control-Allow-Origin'] = '*';

  const headers = Object.assign(internalHeaders, customHeaders);
  cb(null, {
    body: JSON.stringify(body),
    headers,
    statusCode,
  });
};

const errorHandler = (cb, error) => {
  const jsonError = boomToJsonAPI(error);
  // Log the original error
  if (process.env.debug === 'true') {
    // eslint-disable-next-line no-console
    console.log('--> Error:', error);
  }

  finish(cb, jsonError.errors[0].status, jsonError);
};

module.exports = { finish, errorHandler };
