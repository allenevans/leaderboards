/*
 * File         :   index.js
 * Description  :   scores route index.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
module.exports = (app) => {
  app.use(require('./scores.post'));
};
