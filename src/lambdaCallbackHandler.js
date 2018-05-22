/**
 * Created by ashish on 31/12/16.
 */
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
  // Log the original error
  if (process.env.debug === 'true') {
    console.log('--> Error:', error);
    console.log('--> Stack:', error.stack);
  }

  if (error && error.isBoom && error.output && error.output.payload && error.output.statusCode) {
    return finish(cb, error.output.statusCode, {error: [error.output.payload.message]});
  }

  finish(cb, 500, {
    error: ['An internal server error occurred'],
    detail: {
      'e': error.toString()
    }
  });
};

module.exports = {finish, errorHandler};
