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
 *  meta          --
 * }
 */
module.exports = (err) => {
  let detail;
  let code;

  if (!Boom.isBoom(err)) {
    // eslint-disable-next-line no-param-reassign
    err = Boom.boomify(err);
  }

  const { payload } = err.output;

  // look for error code
  detail = payload.message;
  const message = detail.split(':').map(v => v.trim());
  if (message.length > 1) {
    code = message[0].trim();
    detail = message.splice(1).join(':');
  }

  return {
    errors: [{
      status: payload.statusCode.toString(),
      title: payload.error,
      detail,
      code,
      meta: Boom.isBoom(err.data) ? err.data.stack : err.message,
    }],
  };
};
