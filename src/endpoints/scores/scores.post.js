/*
 * File         :   scores.post.js
 * Description  :   Post a score to a leaderboard.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const appsService = require('../../services/apps/appsService');
const endpoint = require('express').Router();
const MalformedRequestError = require('../../errors/http/MalformedRequestError');
const Score = require('../../services/scores/Score');
const ScorePostRequest = require('./models/ScorePostRequest');
const ScorePostResponse = require('./models/ScorePostResponse');
const scoresService = require('../../services/scores/scoresService');
const sessionProtected = require('../../middleware/security/sessionProtected');
const checksum = require('../../middleware/security/checksumMiddleware');

endpoint.post('/scores', sessionProtected, checksum, (req, res, next) => {
  const model = ScorePostRequest.parse(req.body);

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
