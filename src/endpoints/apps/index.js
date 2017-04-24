/*
 * File         :   index.js
 * Description  :   applications route index.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
module.exports = (app) => {
  app.use(require('./apps.post'));
};
