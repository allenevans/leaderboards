/*
 * File         :   boards.post.js
 * Description  :   Create a new board with the given id.
 * ------------------------------------------------------------------------------------------------ */
const BoardPostRequest = require('./models/BoardPostRequest');
const BoardPostResponse = require('./models/BoardPostResponse');
const MalformedRequestError = require('../../errors/http/MalformedRequestError');
const endpoint = require('express').Router();

/**
 * Register a new user
 */
endpoint.post('/boards', (req, res, next) => {
  const model = BoardPostRequest.parse(req.body);

  if (BoardPostRequest.isValid(model)) {
    // TODO. Check if already exists in the database, and persist.
    const boardId = model.id;

    res.status(201)
      .send(new BoardPostResponse(boardId))
  } else {
    next(new MalformedRequestError(BoardPostRequest.validate(model)));
  }
});

module.exports = endpoint;
