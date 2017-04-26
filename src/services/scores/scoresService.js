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

const getAllTimeLeaderboardId = (boardId) => `sc:${boardId}:a`;
const getDayLeaderboardId = (boardId) => `sc:${boardId}:d`;
const getWeekLeaderboardId = (boardId) => `sc:${boardId}:w`;
const getMonthLeaderboardId = (boardId) => `sc:${boardId}:m`;

const isHigherRankingScore = (currentScore, newScore, order) =>
  currentScore === null ||
    (order === BoardOrder.highestFirst && newScore > currentScore) ||
    (order === BoardOrder.lowestFirst && newScore < currentScore);

/**
 * Add a new score for the given board
 * @param boardId
 * @param score
 */
const add = (boardId, score) => {
  return Promise.all([
    boardsService.get(boardId),
    getPlayerScores(boardId, score.player)
  ])
    .then(([board, [allTime, monthly, weekly, daily]]) => {
      if (!board) {
        return Promise.reject(new RecordNotFoundError(boardId));
      }

      const now = Date.now();

      return new Promise((resolve, reject) => {
        let query = redis.multi();

        // all time leaderboard
        if (isHigherRankingScore(allTime, score.value, board.order)) {
          query = query.zadd(getAllTimeLeaderboardId(board.id), score.value, Score.serialize(new Score(score)));
          allTime = score.value;
        }

        // monthly leaderboard
        if (isHigherRankingScore(monthly, score.value, board.order)) {
          query = query
            .zadd(getMonthLeaderboardId(board.id), score.value, Score.serialize(new Score(score)))
            .expire(getMonthLeaderboardId(board.id), dateUtils.secondsRemainingInMonth(now));
          monthly = score.value;
        }

        // weekly leaderboard
        if (isHigherRankingScore(weekly, score.value, board.order)) {
          query = query
            .zadd(getWeekLeaderboardId(board.id), score.value, Score.serialize(new Score(score)))
            .expire(getWeekLeaderboardId(board.id), dateUtils.secondsRemainingInWeek(now));
          weekly = score.value;
        }

        // daily leaderboard
        if (isHigherRankingScore(daily, score.value, board.order)) {
          query = query
            .zadd(getDayLeaderboardId(board.id), score.value, Score.serialize(new Score(score)))
            .expire(getDayLeaderboardId(board.id), dateUtils.secondsRemainingInDay(now));
          daily = score.value;
        }

        query.exec((err) => err ? reject(err) : resolve([allTime, monthly, weekly, daily]));
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

/**
 * Get the players recorded score for all leaderboards
 * @param boardId
 * @param player
 */
const getPlayerScores = (boardId, player) => new Promise((resolve, reject) =>
  redis
    .multi()
    .zscore(`sc:${boardId}:a`, player)
    .zscore(`sc:${boardId}:m`, player)
    .zscore(`sc:${boardId}:w`, player)
    .zscore(`sc:${boardId}:d`, player)
    .exec((err, results) => err ? reject(err) : resolve(results.map(score => score === null ? null : Number(score))))
);

module.exports = {
  add,
  get,
  getPlayerScores
};
