/*
 * File         :   boards.delete.spec.js
 * Description  :   boards DELETE endpoint tests.
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

describe('/boards endpoint', () => {
  beforeEach((done) => redis.flushdb(done));
  afterEach((done) => redis.flushdb(done));

  context('delete existing boards', () => {
    beforeEach((done) => {
      chai.request(server)
        .post('/boards')
        .send(board)
        .end(done);
    });

    it('should delete an existing board', (done) => {
      chai.request(server)
        .delete(`/boards/${board.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.equal(null);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(true);
          expect(res.body.id).to.equal(board.id);
          done();
        });
    });
  });

  context('error cases', () => {
    it('should return 404 if the board does not exist', (done) => {
      chai.request(server)
        .delete(`/boards/does-not-exist`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it('should not process invalid board-ids', (done) => {
      chai.request(server)
        .delete(`/boards/Invalid%20board-Id`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['id']);
          done();
        });
    });
  });
});
