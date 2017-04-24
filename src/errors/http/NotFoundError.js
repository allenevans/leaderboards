/*
 * File         :   NotFoundError.js
 * Description  :   HTTP 404 error
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const HttpError = require('./HttpError');

class NotFoundError extends HttpError {
  constructor(path, ...args) {
    super(...args);
    Error.captureStackTrace(this, NotFoundError);

    this.status = 404;
    this.detail = path;
  }
}

module.exports = NotFoundError;
