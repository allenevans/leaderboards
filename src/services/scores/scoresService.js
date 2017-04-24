/*
 * File         :   scoresService.js
 * Description  :   Data manipulation services for score entities.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const BoardOrder = require('../../types/BoardOrder');
const boardsService = require('../boards/boardsService');
const dateUtils = require('../../utils/dateUtils');
const RecordNotFoundError = require('../../errors/db/RecordNotFoundError');
const redis = require('../../providers/redisClient');
const Score = require('./Score');
const ScoreCategory = require('../../types/ScoreCategory');

const getAllTimeLeaderboardId = (boardId) => `sc:${boardId}`;
const getDayLeaderboardId = (boardId) => `sc:${boardId}:d`;
const getWeekLeaderboardId = (boardId) => `sc:${boardId}:w`;
const getMonthLeaderboardId = (boardId) => `sc:${boardId}:m`;

/**
 * Add a new score for the given board
 * @param boardId
 * @param score
 */
const add = (boardId, score) => {
  return boardsService.get(boardId)
    .then((board) => {
      if (!board) {
        return Promise.reject(new RecordNotFoundError(boardId));
      }

      const now = Date.now();

      return new Promise((resolve, reject) => {
        redis
          .multi()
          // all time leaderboard
          .zadd(getAllTimeLeaderboardId(board.id), score.value, Score.serialize(new Score(score)))

          // daily leaderboard
          .zadd(getDayLeaderboardId(board.id), score.value, Score.serialize(new Score(score)))
          .expire(getDayLeaderboardId(board.id), dateUtils.secondsRemainingInDay(now))

          // weekly leaderboard
          .zadd(getWeekLeaderboardId(board.id), score.value, Score.serialize(new Score(score)))
          .expire(getWeekLeaderboardId(board.id), dateUtils.secondsRemainingInWeek(now))

          // // monthly leaderboard
          .zadd(getMonthLeaderboardId(board.id), score.value, Score.serialize(new Score(score)))
          .expire(getMonthLeaderboardId(board.id), dateUtils.secondsRemainingInMonth(now))

          .exec((err) => err ? reject(err) : resolve(board.id));
      });
    });
};

/**
 * Get the scores for the specified board
 * @param boardId
 * @param category
 * @param count
 * @return {Promise}
 */
const get = (boardId, category, count) => {
  return boardsService.get(boardId)
    .then((board) => new Promise((resolve, reject) => {
      const key = {
        [ScoreCategory.allTime]: getAllTimeLeaderboardId(boardId),
        [ScoreCategory.daily]  : getDayLeaderboardId(boardId),
        [ScoreCategory.weekly] : getWeekLeaderboardId(boardId),
        [ScoreCategory.monthly]: getMonthLeaderboardId(boardId)
      }[category || 0];

      const method = board.order === BoardOrder.highestFirst ? 'zrevrange' : 'zrange';
      redis[method](key, 0, count - 1, 'WITHSCORES', (err, result) => err ? reject(err) : resolve(result));
    }));
};

module.exports = {
  add,
  get
};
