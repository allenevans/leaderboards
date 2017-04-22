/*
 * File         :   index.js
 * Description  :   boards route index.
 * ------------------------------------------------------------------------------------------------ */
module.exports = (app) => {
  app.use(require('./boards.delete'));
  app.use(require('./boards.get'));
  app.use(require('./boards.post'));
};
