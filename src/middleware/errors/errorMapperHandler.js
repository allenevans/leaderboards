/*
 * File         :   errorMapperHandler.js
 * Description  :   Maps known error types into HTTP error types.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const DbError = require('../../errors/db/DbError');
const RecordNotFoundError = require('../../errors/db/RecordNotFoundError');
const UniqueConflictError = require('../../errors/db/UniqueConflictError');

const NotFoundError = require('../../errors/http/NotFoundError');
const ResourceConflictError = require('../../errors/http/ResourceConflictError');

module.exports = (err, req, res, next) => {
  if (err instanceof DbError) {
    let mapped = null;

    if (err instanceof RecordNotFoundError) {
      mapped = new NotFoundError(err.message);
    }

    if (err instanceof UniqueConflictError) {
      mapped = new ResourceConflictError(err.message);
    }

    next(mapped);
  } else {
    next(err);
  }
};
