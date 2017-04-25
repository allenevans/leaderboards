/*
 * File         :   UnauthorizedError.js
 * Description  :   HTTP 401 error
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const HttpError = require('./HttpError');

class UnauthorizedError extends HttpError {
  constructor(detail, ...args) {
    super(...args);
    Error.captureStackTrace(this, UnauthorizedError);

    this.status = 401;
    this.detail = detail;
  }
}

module.exports = UnauthorizedError;
