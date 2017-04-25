/*
 * File         :   scores.post.spec.js
 * Description  :   scores POST endpoint tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const chai = require('chai');
const expect = chai.expect;
const redis = require('../../providers/redisClient');
const seedScores = require('../../tests/seedScores');
const server = require('../../../src/app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const TOTAL_SCORES = 20;

let boardLowestFirst = {
  id   : 'my-apps-score-board-low',
  name : 'My Game Score Board - Low',
  order: 'lowestFirst'
};
let boardHighestFirst = {
  id   : 'my-apps-score-board-high',
  name : 'My Game Score Board - High',
  order: 'highestFirst'
};

const seedDb = () => seedScores([boardLowestFirst, boardHighestFirst], TOTAL_SCORES);

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
          expect(res.body.leaderboard.length).to.equal(TOTAL_SCORES);

          const first = res.body.leaderboard[0];
          const last = res.body.leaderboard[res.body.leaderboard.length - 1];

          expect(first.rank).to.equal(1);
          expect(first.score).to.be.lessThan(last.score); // lowest first

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
          expect(res.body.leaderboard.length).to.equal(TOTAL_SCORES);

          const first = res.body.leaderboard[0];
          const last = res.body.leaderboard[res.body.leaderboard.length - 1];

          expect(first.rank).to.equal(1);
          expect(first.score).to.be.greaterThan(last.score); // highest first

          done();
        });
    });
  });
});
