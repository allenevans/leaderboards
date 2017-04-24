/*
 * File         :   scores.post.spec.js
 * Description  :   scores POST endpoint tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const chai = require('chai');
const expect = chai.expect;
const redis = require('../../providers/redisClient');
const seedBoards = require('../../tests/seedBoards');
const server = require('../../../src/app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let boardLowestFirst = {};
let boardHighestFirst = {};

const seededScores = [
  {player: 'player A', score: 1000},
  {player: 'player B', score: 2000},
  {player: 'player C', score: 3000},
  {player: 'player D', score: 4000},
  {player: 'player E', score: 5000},
  {player: 'player F', score: 6000},
  {player: 'player G', score: 7000},
  {player: 'player H', score: 8000},
  {player: 'player I', score: 9000},

  {player: 'player J', score: 500},
  {player: 'player K', score: 1500},
  {player: 'player L', score: 2000},
  {player: 'player M', score: 2500},
  {player: 'player N', score: 3000},
  {player: 'player O', score: 3500},
  {player: 'player P', score: 4000},
  {player: 'player Q', score: 4500},
  {player: 'player R', score: 5000}
];

const seedScore = (boardId, score, player) => new Promise((resolve) => {
  chai.request(server)
    .post('/scores')
    .send({
      boardId  : boardId,
      player   : player,
      timestamp: Date.now(),
      value    : score
    })
    .end(resolve);
});

const seedDb = () =>
  seedBoards(2,
    [
      {
        id   : 'my-apps-score-board-low',
        name : 'My Game Score Board - Low',
        order: 'lowestFirst'
      },
      {
        id   : 'my-apps-score-board-high',
        name : 'My Game Score Board - High',
        order: 'highestFirst'
      }
    ])
    .then(([lowest, highest]) => [boardLowestFirst, boardHighestFirst] = [lowest, highest])
    .then(() => Promise.all([
      ...seededScores.map(seed => seedScore(boardLowestFirst.id, seed.score, seed.player)),
      ...seededScores.map(seed => seedScore(boardHighestFirst.id, seed.score, seed.player))
    ]));

describe('/scores endpoint => GET', () => {
  beforeEach((done) => redis.flushdb(() => seedDb().then(() => done())));
  afterEach((done) => redis.flushdb(done));

  context('get leaderboard scores', () => {
    it('can get the scores for a leaderboard - lowestFirst', (done) => {
      chai.request(server)
        .get(`/scores/${boardLowestFirst.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.equal(null);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(true);
          expect(res.body.leaderboard.length).to.equal(seededScores.length);
          expect(res.body.leaderboard[0].player).to.equal('player J');
          expect(res.body.leaderboard[0].rank).to.equal(1);
          done();
        });
    });

    it('can get the scores for a leaderboard - highestFirst', (done) => {
      chai.request(server)
        .get(`/scores/${boardHighestFirst.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.equal(null);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(true);
          expect(res.body.leaderboard.length).to.equal(seededScores.length);
          expect(res.body.leaderboard[0].player).to.equal('player I');
          expect(res.body.leaderboard[0].rank).to.equal(1);
          done();
        });
    });
  });
});
