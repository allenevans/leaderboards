/*
 * File         :   boardsService.js
 * Description  :   Data manipulation services for board entities.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const Board = require('./Board');
const redis = require('../../providers/redisClient');
const RecordNotFoundError = require('../../errors/db/RecordNotFoundError');
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
          .set(boardKey(board.id), Board.serialize(new Board(board)), (err) => {
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

/**
 * Delete a board by its id.
 * @param id
 */
const remove = (id) => {
  return new Promise((resolve, reject) => {
    redis.del(boardKey(id), (err, data) => err ? reject(err) : resolve(data));
  });
};

/**
 * Get a board by its id.
 * @param id
 * @param model
 */
const update = (id, model) => {
  return get(id)
    .then((board) => {
      if (!board) { return Promise.reject(new RecordNotFoundError(boardKey(id))); }

      return new Promise((resolve, reject) => {
        redis
          .set(boardKey(board.id), Board.serialize(new Board(Object.assign(board, model))), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(board.id);
            }
          });
      });
    });
};

module.exports = {
  add,
  get,
  remove,
  update
};
