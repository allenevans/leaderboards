/*
 * File         :   index.js
 * Description  :   Routing registration index.
 * ------------------------------------------------------------------------------------------------ */
module.exports = (app) => {
  /* GET home page. */
  app.get('/', (req, res, next) => {
    res.render('index', { title: 'Scoreboard' });
  });

  require('../endpoints')(app);
};
