/*
 * File         :   pageNotFoundErrorHandler.js
 * Description  :   Catch 404 and forward to error handler.
 * ------------------------------------------------------------------------------------------------ */
const NotFoundError = require('../../errors/http/NotFoundError');

module.exports = (req, res, next) => {
  next(new NotFoundError(`Not found: ${req.method} ${req.originalUrl}`));
};
