/*
 * File         :   boardsService.js
 * Description  :   Data manipulation services for board entities.
 * ------------------------------------------------------------------------------------------------ */
const Board = require('./Board');
const redis = require('../../providers/redisClient');
const UniqueConflictError = require('../../errors/db/UniqueConflictError');

const boardKey = (boardId) => `sb:${boardId}`;

/**
 * Add a new board to the database
 * @param board
 */
const add = (board) => {
  return get(board.id)
    .then((exists) => {
      if (exists) {
        return Promise.reject(new UniqueConflictError(board.id));
      }

      return new Promise((resolve, reject) => {
        redis
          .set(boardKey(board.id), Board.serialize(board), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(board.id);
            }
          });
      });
    });
};

/**
 * Get a board by its id.
 * @param id
 */
const get = (id) => {
  return new Promise((resolve, reject) => {
    redis.get(boardKey(id), (err, data) => err ? reject(err) : resolve(data && Board.deserialize(data)));
  });
};

module.exports = {
  add,
  get
};
