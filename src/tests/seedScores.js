/*
 * File         :   seedScores.js
 * Description  :   Seeds the database with the specified scores for the given leaderboards.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const Score = require('../services/scores/Score');
const scoresService = require('../services/scores/scoresService');
const seedBoards = require('./seedBoards');

module.exports = (boards, count) =>
  seedBoards(boards.length, boards)
    .then((seededBoards) => {
      const scores = [];

      for (let i = 0; i < seededBoards.length; i++) {
        const board = seededBoards[i];

        for (let j = 0; j < count; j++) {
          scores.push({
            boardId  : board.id,
            player   : `Player ${j}`,
            timestamp: Date.now(),
            value    : j * 1000
          });
        }
      }

      return Promise.all(
        scores.map((score) => scoresService.add(score.boardId, new Score(score)))
      );
    }
  );
