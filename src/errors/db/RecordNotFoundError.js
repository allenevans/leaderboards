/*
 * File         :   RecordNotFound.js
 * Description  :   A database error indicating that the record for the given key does not exist.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const DbError = require('./DbError');

class RecordNotFound extends DbError {
  constructor(key, ...args) {
    super(
      'Record not found',
      `There is no corresponding record for key '${key}'`,
      ...args
    );

    Error.captureStackTrace(this, RecordNotFound);
  }
}

module.exports = RecordNotFound;
