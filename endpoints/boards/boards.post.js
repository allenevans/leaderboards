/*
 * File         :   boards.post.js
 * Description  :   Create a new board with the given id.
 * ------------------------------------------------------------------------------------------------ */
const Board = require('../../services/boards/Board');
const BoardPostRequest = require('./models/BoardPostRequest');
const BoardPostResponse = require('./models/BoardPostResponse');
const boardService = require('../../services/boards/boardsService');
const endpoint = require('express').Router();
const MalformedRequestError = require('../../errors/http/MalformedRequestError');

/**
 * Register a new user
 */
endpoint.post('/boards', (req, res, next) => {
  const model = BoardPostRequest.parse(req.body);

  if (BoardPostRequest.isValid(model)) {
    boardService.add(new Board(model))
      .then((boardId) =>
        res.status(201)
          .send(new BoardPostResponse(boardId))
      )
      .catch(next);
  } else {
    next(new MalformedRequestError(BoardPostRequest.validate(model)));
  }
});

module.exports = endpoint;
