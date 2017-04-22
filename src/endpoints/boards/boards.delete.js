/*
 * File         :   boards.delete.js
 * Description  :   Delete a scoreboard by its id.
 * ------------------------------------------------------------------------------------------------ */
const Board = require('../../../src/services/boards/Board');
const BoardDeleteResponse = require('./models/BoardDeleteResponse');
const boardService = require('../../../src/services/boards/boardsService');
const endpoint = require('express').Router();
const NotFoundError = require('../../errors/http/NotFoundError');
const MalformedRequestError = require('../../errors/http/MalformedRequestError');

endpoint.delete('/boards/:id', (req, res, next) => {
  const errors = [];

  if (!(/^([a-z]|\d|\-)+$/.test(req.params.id) && req.params.id.length <= 40)) { errors.push('id'); }

  if (!errors.length) {
    boardService.remove(req.params.id)
      .then((board) => board ?
        res.status(200)
          .send(BoardDeleteResponse.parse({id: req.params.id})) :
        next(new NotFoundError(`No board found for key ${req.params.id}`))
      )
      .catch(next);
  } else {
    next(new MalformedRequestError(errors));
  }
});

module.exports = endpoint;
