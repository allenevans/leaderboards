/*
 * File         :   errorMapperHandler.js
 * Description  :   Maps known error types into HTTP error types.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const AccessDeniedError = require('../../errors/db/AccessDeniedError');
const DbError = require('../../errors/db/DbError');
const RecordNotFoundError = require('../../errors/db/RecordNotFoundError');
const UniqueConflictError = require('../../errors/db/UniqueConflictError');

const ForbiddenError = require('../../errors/http/ForbiddenError');
const NotFoundError = require('../../errors/http/NotFoundError');
const ResourceConflictError = require('../../errors/http/ResourceConflictError');

module.exports = (err, req, res, next) => {
  if (err instanceof DbError) {
    let mapped = null;

    if (err instanceof AccessDeniedError) {
      mapped = new ForbiddenError(err.message);
    }

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
