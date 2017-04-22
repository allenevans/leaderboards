/*
 * File         :   ResourceConflictError.js
 * Description  :   HTTP 409 error
 * ------------------------------------------------------------------------------------------------ */
const HttpError = require('./HttpError');

class ResourceConflictError extends HttpError {
  constructor(detail, ...args) {
    super(...args);
    Error.captureStackTrace(this, ResourceConflictError);

    this.status = 409;
    this.detail = detail;
  }
}

module.exports = ResourceConflictError;
