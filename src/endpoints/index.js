/*
 * File         :   index.js
 * Description  :   Endpoints index registration.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
module.exports = (app) => {
  require('./apps/index')(app);
  require('./boards/index')(app);
  require('./scores/index')(app);
  require('./sessions/index')(app);
};
