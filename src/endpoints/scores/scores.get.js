/*
 * File         :   scores.get.js
 * Description  :   Get the scores for a leaderboard.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const endpoint = require('express').Router();
const MalformedRequestError = require('../../errors/http/MalformedRequestError');
const rangeValidate = require('../validation/rangeValidate');
const ScoreCategory = require('../../types/ScoreCategory');
const ScoreGetResponse = require('./models/ScoreGetResponse');
const scoresService = require('../../../src/services/scores/scoresService');
const simpleIdentifierValidate = require('../validation/simpleIdentifierValidate');

const MIN_RESULTS = 1;
const DEFAULT_RESULTS = 25;
const MAX_RESULTS = 100;

endpoint.get('/scores/:boardId', (req, res, next) => {
  const errors = [];

  if (!simpleIdentifierValidate(req.params.boardId)) { errors.push('boardId'); }
  if (!rangeValidate(req.query.top || DEFAULT_RESULTS, MIN_RESULTS, MAX_RESULTS)) { errors.push('top'); }

  const category = ScoreCategory.parse(req.query.category);

  if (!errors.length) {
    scoresService.get(req.params.boardId, category, Number(req.query.top || DEFAULT_RESULTS))
      .then((data) =>
        res.status(200)
          .send(ScoreGetResponse.parse(data))
      )
      .catch(next);
  } else {
    next(new MalformedRequestError(errors));
  }
});

module.exports = endpoint;
