/*
 * File         :   boards.put.js
 * Description  :   Update the scoreboard identified by its id.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const Board = require('../../../src/services/boards/Board');
const BoardPutRequest = require('./models/BoardPutRequest');
const BoardPutResponse = require('./models/BoardPutResponse');
const boardService = require('../../../src/services/boards/boardsService');
const endpoint = require('express').Router();
const MalformedRequestError = require('../../errors/http/MalformedRequestError');
const simpleIdentifierValidate = require('../validation/simpleIdentifierValidate');

endpoint.put('/boards/:id', (req, res, next) => {
  const errors = [];
  if (!simpleIdentifierValidate(req.params.id)) { errors.push('id'); }

  const model = BoardPutRequest.parse(req.body);

  if (BoardPutRequest.isValid(model)) {
    boardService.update(req.params.id, model)
      .then((boardId) =>
        res.status(200)
          .send(new BoardPutResponse(boardId))
      )
      .catch(next);
  } else {
    next(new MalformedRequestError(BoardPutRequest.validate(model)));
  }
});

module.exports = endpoint;
