/*
 * File         :   index.js
 * Description  :   Routing registration index.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
module.exports = (app) => {
  /* GET home page. */
  app.get('/', (req, res) => {
    res.render('index', { title: 'Leaderboard' });
  });

  require('../endpoints')(app);
};
