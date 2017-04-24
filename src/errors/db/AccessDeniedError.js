/*
 * File         :   AccessDeniedError.js
 * Description  :   A database error indicating that the action is not allowed.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const DbError = require('./DbError');

class AccessDeniedError extends DbError {
  constructor(detail, ...args) {
    super(
      'Access denied',
      `The requested operation has been blocked: ${detail}`,
      ...args
    );

    Error.captureStackTrace(this, AccessDeniedError);
  }
}

module.exports = AccessDeniedError;
