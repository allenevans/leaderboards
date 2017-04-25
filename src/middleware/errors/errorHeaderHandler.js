/*
 * File         :   errorHeaderHandler.js
 * Description  :   Add any necessary headers into the response.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const UnauthorizedError = require('../../errors/http/UnauthorizedError');

module.exports = (err, req, res, next) => {
  if (err instanceof UnauthorizedError) {
    res.set('WWW-Authenticate', 'Bearer realm="leaderboards"');
  }

  next(err);
};
