/*
 * File         :   typedErrorHandler.js
 * Description  :   Handle known typed errors, else pass onto next.
 * ------------------------------------------------------------------------------------------------ */
const MalformedRequestError = require('../../errors/http/MalformedRequestError');

module.exports = (err, req, res, next) => {
  if (err instanceof MalformedRequestError) {
    res.status(err.status)
      .send(Object.assign({ success: false }, err, { stack: undefined }));
  } else {
    next(err);
  }
};
