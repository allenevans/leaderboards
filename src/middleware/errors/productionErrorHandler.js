/*
 * File         :   productionErrorHandler.js
 * Description  :   production error handler, no stack traces leaked to user.
 * ------------------------------------------------------------------------------------------------ */
module.exports = (err, req, res, next) => {
  res.status(err.status || 500);

  res.render('error', {
    message: err.message,
    error: {}
  });
};
