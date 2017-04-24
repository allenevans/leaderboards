/*
 * File         :   index.js
 * Description  :   sessions route index.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
module.exports = (app) => {
  app.use(require('./sessions.post'));
};
