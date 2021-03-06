/*
 * File         :   index.js
 * Description  :   Express middleware error handlers.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
module.exports = {
  development: require ('./developmentErrorHandler'),
  errorHeaderHandler: require('./errorHeaderHandler'),
  errorMapperHandler: require ('./errorMapperHandler'),
  pageNotFound: require('./pageNotFoundErrorHandler'),
  production: require ('./productionErrorHandler'),
  typedErrorHandler: require ('./typedErrorHandler')
};
