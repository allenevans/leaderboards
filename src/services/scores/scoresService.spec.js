/*
 * File         :   scoresService.spec.js
 * Description  :   Scores redis service integration tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const Board = require('../boards/Board');
const boardsService = require('../boards/boardsService');
const expect = require('chai').expect;
const redis = require('../../providers/redisClient');
const Score = require('./Score');
const scoresService = require('./scoresService');
const seedBoards = require('../../tests/seedBoards');

let board = {};

const highScore = new Score({
  player   : 'player 1',
  value    : 1000,
  timestamp: Date.now()
});

const midScore = new Score({
  player   : 'player 2',
  value    : 500,
  timestamp: Date.now()
});

const lowScore = new Score({
  player   : 'player 3',
  value    : 1,
  timestamp: Date.now()
});

const getRank = (key, member) => new Promise((resolve, reject) =>
  redis.zrank(key, member, (err, result) => err ? reject(err) : resolve(result))
);

describe('scoresService integration tests', () => {
  beforeEach((done) => redis.flushdb(() => seedBoards(1).then((boards) => board = boards[0]).then(() => done())));
  afterEach((done) => redis.flushdb(done));

  context('adding new scores', () => {
    it('should add a score to the all time leaderboard', () =>
      scoresService.add(board.id, highScore)
        .then(() => getRank(`sc:${board.id}:a`, highScore.player))
        .then((rank) => {
          expect(rank).to.equal(0);
        })
    );

    it('should add multiple scores to the leaderboard, and order by score', () =>
      Promise.all([
        scoresService.add(board.id, midScore),
        scoresService.add(board.id, lowScore),
        scoresService.add(board.id, highScore)
      ])
        .then(() => Promise.all([
          getRank(`sc:${board.id}:a`, highScore.player),
          getRank(`sc:${board.id}:a`, midScore.player),
          getRank(`sc:${board.id}:a`, lowScore.player)
        ]))
        .then(([highRank, midRank, lowRank]) => {
          expect(highRank).to.equal(2);
          expect(midRank).to.equal(1);
          expect(lowRank).to.equal(0);
        })
    );

    it('should add a score to the monthly leaderboard', () =>
      scoresService.add(board.id, highScore)
        .then(() => getRank(`sc:${board.id}:m`, highScore.player))
        .then((rank) => {
          expect(rank).to.equal(0);
        })
    );

    it('should add a score to the weekly leaderboard', () =>
      scoresService.add(board.id, highScore)
        .then(() => getRank(`sc:${board.id}:w`, highScore.player))
        .then((rank) => {
          expect(rank).to.equal(0);
        })
    );

    it('should add a score to the daily leaderboard', () =>
      scoresService.add(board.id, highScore)
        .then(() => getRank(`sc:${board.id}:d`, highScore.player))
        .then((rank) => {
          expect(rank).to.equal(0);
        })
    );
  })
});