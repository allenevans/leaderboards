/*
 * File         :   sessions.post.spec.js
 * Description  :   sessions POST endpoint tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const chai = require('chai');
const expect = chai.expect;
const redis = require('../../providers/redisClient');
const seedBoards = require('../../tests/seedBoards');
const server = require('../../../src/app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let seededBoards = null;

describe('/sessions endpoint => POST', () => {
  beforeEach((done) => redis.flushdb(() => seedBoards(1).then((seeded) => seededBoards = seeded).then(() => done())));
  afterEach((done) => redis.flushdb(done));

  context('create a new session', () => {
    it('should create a new session for the specified leaderboard', (done) => {
      const payload = {
        boardId: seededBoards[0].id
      };

      chai.request(server)
        .post('/sessions')
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(err).to.equal(null);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(true);
          expect(res.headers.authorization).to.match(/Bearer\s\w+/);
          done();
        });
    });
  });

  context('data validation', () => {
    it('should not generate a token if the leaderboard id is invalid', (done) => {
      const payload = {
        boardId: 'not-a-leaderboard-id'
      };

      chai.request(server)
        .post('/sessions')
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it('should validate all fields', (done) => {
      chai.request(server)
        .post('/sessions')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['boardId']);
          done();
        });
    });
  });
});
