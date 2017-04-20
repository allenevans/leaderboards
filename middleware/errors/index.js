/*
 * File         :   index.js
 * Description  :   Express middleware error handlers.
 * ------------------------------------------------------------------------------------------------ */
module.exports = {
  development: require ('./developmentErrorHandler'),
  pageNotFound: require('./pageNotFoundErrorHandler'),
  production: require ('./productionErrorHandler')
};
