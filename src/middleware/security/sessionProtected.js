/*
 * File         :   sessionProtected.js
 * Description  :   Require and validate a JWT token is in the request header.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const sessionsService = require('../../services/sessions/sessionsService');
const UnauthorizedError = require('../../errors/http/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return next(new UnauthorizedError('Token missing'));
  } else {
    sessionsService.validate(token)
      .then((session) => {
        if (session) {
          req.session = session;
        }

        next(session ? undefined : new UnauthorizedError('Token invalid'));
      })
      .catch((err) => next(new UnauthorizedError(err.message)));
  }
};
