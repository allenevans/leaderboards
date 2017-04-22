/*
 * File         :   UniqueConflictError.js
 * Description  :   A database error indicating that a unique record already exists for the given criteria.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const DbError = require('./DbError');

class UniqueConflictError extends DbError {
  constructor(key, ...args) {
    super(
      'Unique record conflict',
      `A record already exists for key '${key}'`,
      ...args
    );

    Error.captureStackTrace(this, UniqueConflictError);
  }
}

module.exports = UniqueConflictError;
