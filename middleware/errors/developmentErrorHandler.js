/*
 * File         :   developmentErrorHandler.js
 * Description  :   Express Development logging production handler. Prints stack traces. Not to be used in production.
 * ------------------------------------------------------------------------------------------------ */
module.exports = (err, req, res, next) => {
  res.status(err.status || 500);

  res.render('error', {
    message: err.message,
    error  : err
  });
};
