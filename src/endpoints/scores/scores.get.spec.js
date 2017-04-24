/*
 * File         :   scores.post.spec.js
 * Description  :   scores POST endpoint tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const chai = require('chai');
const expect = chai.expect;
const redis = require('../../providers/redisClient');
const server = require('../../../src/app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const board = {
  id  : 'my-game-score-board',
  name: 'My Game Score Board'
};

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

const seedBoard = () => new Promise((resolve) => {
  chai.request(server)
    .post('/boards')
    .send(board)
    .end(resolve);
});

const seedScore = (score, player) => new Promise((resolve) => {
  chai.request(server)
    .post('/scores')
    .send({
      boardId  : board.id,
      player   : player,
      timestamp: Date.now(),
      value    : score
    })
    .end(resolve);
});

const seedDb = () =>
  seedBoard()
    .then(() => Promise.all(seededScores.map(seed => seedScore(seed.score, seed.player))));

describe('/scores endpoint', () => {
  beforeEach((done) => redis.flushdb(() => seedDb().then(() => done())));
  afterEach((done) => redis.flushdb(done));

  context('get leaderboard scores', () => {
    it('can get the scores for a leaderboard', (done) => {
      chai.request(server)
        .get(`/scores/${board.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.equal(null);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(true);
          expect(res.body.leaderboard.length).to.equal(seededScores.length);
          done();
        });
    });
  });
});
