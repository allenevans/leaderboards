/*
 * File         :   scores.post.js
 * Description  :   Post a score to a leaderboard.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const endpoint = require('express').Router();
const MalformedRequestError = require('../../errors/http/MalformedRequestError');
const Score = require('../../services/scores/Score');
const ScorePostRequest = require('./models/ScorePostRequest');
const ScorePostResponse = require('./models/ScorePostResponse');
const scoresService = require('../../services/scores/scoresService');
const sessionProtected = require('../../middleware/security/sessionProtected');

endpoint.post('/scores', sessionProtected, (req, res, next) => {
  const payload = Object.assign(req.body, { _token_: req.session.token });
  const model = ScorePostRequest.parse(payload);

  const errors = [
    ...ScorePostRequest.validate(model, req)
  ];

  if (req.session.boardId !== model.boardId && !~errors.indexOf('boardId')) {
    errors.push('boardId');
  }

  if (!errors.length) {
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
