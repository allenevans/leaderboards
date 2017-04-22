/*
 * File         :   DbError.js
 * Description  :   Abstract Database Error type.
 * ------------------------------------------------------------------------------------------------ */
class DbError extends Error {
  constructor(name, message, ...args) {
    super(...args);
    Error.captureStackTrace(this, DbError);

    this.name = name;
    this.message = message;
  }
}

module.exports = DbError;
