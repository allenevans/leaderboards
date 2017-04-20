/*
 * File         :   index.js
 * Description  :   Endpoints index registration.
 * ------------------------------------------------------------------------------------------------ */
module.exports = (app) => {
  require('./boards')(app);
};
