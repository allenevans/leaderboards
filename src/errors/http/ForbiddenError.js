/*
 * File         :   ForbiddenError.js
 * Description  :   HTTP 403 error
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const HttpError = require('./HttpError');

class ForbiddenError extends HttpError {
  constructor(detail, ...args) {
    super(...args);
    Error.captureStackTrace(this, ForbiddenError);

    this.status = 403;
    this.detail = detail;
  }
}

module.exports = ForbiddenError;
