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

let board = {};

const authorize = (boardId) => new Promise((resolve) => {
  chai.request(server)
    .post('/sessions')
    .send({
      boardId
    })
    .end((err, res) => resolve(res.headers.authorization.split(/\s/)[1]));
});

describe('/scores endpoint => POST', () => {
  let authToken = null;

  beforeEach((done) => redis.flushdb(() =>
    seedBoards(1)
      .then((boards) => {
        board = boards[0];
        return authorize(board.id).then((token) => authToken = token)
      })
      .then(() => done()))
  );
  afterEach((done) => redis.flushdb(done));

  context('adding scores', () => {
    it('can post a new score', (done) => {
        chai.request(server)
          .post('/scores')
          .set('x-access-token', authToken)
          .send({
            boardId  : board.id,
            player   : 'player 1',
            timestamp: Date.now(),
            value    : 12345
          })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(err).to.equal(null);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.success).to.equal(true);
            done();
          });
      }
    );
  });

  context('data validation', () => {
    it('should require all mandatory fields', (done) => {
      chai.request(server)
        .post('/scores')
        .set('x-access-token', authToken)
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

    it('should not allow unauthenticated access to post scores', (done) => {
      chai.request(server)
        .post('/scores')
        .send({
          boardId  : board.id,
          player   : 'player 1',
          timestamp: Date.now(),
          value    : 12345
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });
});
