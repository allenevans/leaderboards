/*
 * File         :   index.js
 * Description  :   Endpoints index registration.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
module.exports = (app) => {
  require('./boards/index')(app);
  require('./scores/index')(app);
};
