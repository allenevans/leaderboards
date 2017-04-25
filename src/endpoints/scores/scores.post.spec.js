/*
 * File         :   scores.post.spec.js
 * Description  :   scores POST endpoint tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const chai = require('chai');
const checksum = require('../../utils/checksum');
const expect = chai.expect;
const redis = require('../../providers/redisClient');
const seedBoards = require('../../tests/seedBoards');
const server = require('../../app');

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

const signPayload = (payload, token) => Object.assign(payload, { _signed_: checksum(payload, token)});

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
          .set('Authorization', `Bearer ${authToken}`)
          .send(signPayload({
            boardId  : board.id,
            player   : 'player 1',
            timestamp: Date.now(),
            value    : 12345
          }, authToken))
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
        .set('Authorization', `Bearer ${authToken}`)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['_signed_', 'boardId', 'player', 'timestamp', 'value']);
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

    it('should prevent tampering of the score', (done) => {
      const signedPayload = signPayload({
          boardId  : board.id,
          player   : 'player 1',
          timestamp: Date.now(),
          value    : 12345
        });

      signedPayload.value = 10000; // manipulate the score

      chai.request(server)
        .post('/scores')
        .send(signedPayload)
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
