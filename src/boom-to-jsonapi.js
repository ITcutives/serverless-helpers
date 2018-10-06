/**
 * Created by ashish on 03/06/18.
 */
const Boom = require('boom');

/**
 * {
 *  id
 *  links
 *    about
 *  status        --
 *  code
 *  title         --
 *  detail        --
 *  source
 *    pointer
 *    parameter
 *  meta
 * }
 */
module.exports = (err) => {
  let payload, message, detail, code;

  if (!Boom.isBoom(err)) {
    err = Boom.boomify(err);
  }

  payload = err.output.payload;

  // look for error code
  detail = payload.message;
  message = detail.split(':').map(v => v.trim());
  if (message.length > 1) {
    code = message[0].trim();
    detail = message.splice(1).join(':');
  }

  return {
    'errors': [{
      'status': payload.statusCode.toString(),
      'title': payload.error,
      detail,
      code
    }]
  };
};
