const express = require('express');

module.exports = (app) => {
  /* GET home page. */
  app.get('/', (req, res, next) => {
    res.render('index', { title: 'Scoreboard' });
  });
};
