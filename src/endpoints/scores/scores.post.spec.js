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
  id: 'my-game-score-board',
  name: 'My Game Score Board',
  order: 'lowestFirst'
};

describe('/scores endpoint', () => {
  beforeEach((done) => {
    redis.flushdb(() => {
      chai.request(server)
        .post('/boards')
        .send(board)
        .end(done);
    })
  });
  afterEach((done) => redis.flushdb(done));

  context('adding scores', () => {
    it('can post a new score', (done) => {
      chai.request(server)
        .post('/scores')
        .send({
          boardId: board.id,
          player: 'player 1',
          timestamp: Date.now(),
          value: 12345
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(err).to.equal(null);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });

  context('data validation', () => {
    it('should require all mandatory fields', (done) => {
      chai.request(server)
        .post('/scores')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['boardId', 'player', 'timestamp', 'value']);
          done();
        });
    });

    it('should validate that the leaderboard specified exists', (done) => {
      chai.request(server)
        .post('/scores')
        .send({
          boardId: 'does-not-exist',
          player: 'player 1',
          timestamp: Date.now(),
          value: 12345
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });
});
