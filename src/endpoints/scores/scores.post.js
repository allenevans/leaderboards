/*
 * File         :   scores.post.js
 * Description  :   Post a score to a scoreboard.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const endpoint = require('express').Router();
const MalformedRequestError = require('../../errors/http/MalformedRequestError');
const Score = require('../../services/scores/Score');
const ScorePostRequest = require('./models/ScorePostRequest');
const ScorePostResponse = require('./models/ScorePostResponse');
const scoresService = require('../../../src/services/scores/scoresService');

endpoint.post('/scores', (req, res, next) => {
  const model = ScorePostRequest.parse(req.body);

  const errors = [
    ...ScorePostRequest.validate(model)
  ];

  if (errors.length === 0) {
    scoresService.add(model.boardId, new Score(model))
      .then(() =>
        res.status(201)
          .send(new ScorePostResponse(model.boardId))
      )
      .catch(next);
  } else {
    next(new MalformedRequestError(errors));
  }
});

module.exports = endpoint;
