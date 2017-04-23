
 /*
 * File         :   scoresService.js
 * Description  :   Data manipulation services for score entities.
* -------------------------------------------------------------------------------------------------------------------------------------- */
 const boardsService = require('../boards/boardsService');
 const RecordNotFoundError = require('../../errors/db/RecordNotFoundError');
 const redis = require('../../providers/redisClient');
 const Score = require('./Score');
 const dateUtils = require('../../utils/dateUtils');

 const getAllTimeScoreBoardId = (boardId) => `sc:${boardId}`;
 const getDayScoreBoardId = (boardId) => `sc:${boardId}:d`;
 const getWeekScoreBoardId = (boardId) => `sc:${boardId}:w`;
 const getMonthScoreBoardId = (boardId) => `sc:${boardId}:m`;

 /**
  * Add a new score for the given board
  * @param boardId
  * @param score
  */
 const add = (boardId, score) => {
   return boardsService.get(boardId)
     .then((board) => {
       if (!board) { return Promise.reject(new RecordNotFoundError(boardId)); }

       const now = Date.now();

       return new Promise((resolve, reject) => {
         redis
           .multi()
           // all time scoreboard
           .zadd(getAllTimeScoreBoardId(board.id), score.value, Score.serialize(new Score(score)))

           // daily scoreboard
           .zadd(getDayScoreBoardId(board.id), score.value, Score.serialize(new Score(score)))
           .expire(getDayScoreBoardId(board.id), dateUtils.secondsRemainingInDay(now))

           // weekly scoreboard
           .zadd(getWeekScoreBoardId(board.id), score.value, Score.serialize(new Score(score)))
           .expire(getWeekScoreBoardId(board.id), dateUtils.secondsRemainingInWeek(now))

           // // monthly scoreboard
           .zadd(getMonthScoreBoardId(board.id), score.value, Score.serialize(new Score(score)))
           .expire(getMonthScoreBoardId(board.id), dateUtils.secondsRemainingInMonth(now))

           .exec((err) => {
             if (err) {
               console.log(err);
               reject(err);
             } else {
               resolve(board.id);
             }
           })
       });
     });
 };


 module.exports = {
   add
 };
