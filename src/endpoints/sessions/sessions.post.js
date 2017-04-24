/*
 * File         :   sessions.post.js
 * Description  :   Create a session that will allow the caller to post a score to the leaderboard.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const boardsService = require('../../services/boards/boardsService');
const endpoint = require('express').Router();
const MalformedRequestError = require('../../errors/http/MalformedRequestError');
const SessionPostRequest = require('./models/SessionPostRequest');
const SessionPostResponse = require('./models/SessionPostResponse');
const sessionsService = require('../../services/sessions/sessionsService');

endpoint.post('/sessions', (req, res, next) => {
  const model = SessionPostRequest.parse(req.body);

  const errors = [
    ...SessionPostRequest.validate(model)
  ];

  if (!errors.length) {
      sessionsService.createSession(model.boardId)
        .then((token) =>
          res.status(201)
            .send(new SessionPostResponse(token))
        )
        .catch(next);
  } else {
    next(new MalformedRequestError(errors));
  }
});

module.exports = endpoint;
