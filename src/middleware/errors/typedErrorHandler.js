/*
 * File         :   typedErrorHandler.js
 * Description  :   Handle known typed errors, else pass onto next.
 * ------------------------------------------------------------------------------------------------ */
const HttpError = require('../../errors/http/HttpError');

module.exports = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status)
      .send(Object.assign({ success: false }, err, { stack: undefined }));
  } else {
    next(err);
  }
};
