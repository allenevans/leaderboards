/*
 * File         :   boards.put.spec.js
 * Description  :   boards PUT endpoint tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const chai = require('chai');
const expect = chai.expect;
const redis = require('../../providers/redisClient');
const server = require('../../../src/app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const board = {
  id: 'my-game-score-board',
  name: 'My Game Score Board'
};

describe('/boards endpoint', () => {
  beforeEach((done) => redis.flushdb(done));
  afterEach((done) => redis.flushdb(done));

  context('update existing boards', () => {
    beforeEach((done) => {
      chai.request(server)
        .post('/boards')
        .send(board)
        .end(done);
    });

    it('should be able to update an existing leaderboard', (done) => {
      const modify = {
        name: board.name + ' updated'
      };
      
      chai.request(server)
        .put(`/boards/${board.id}`)
        .send(modify)
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
    beforeEach((done) => {
      chai.request(server)
        .post('/boards')
        .send(board)
        .end(done);
    });
    
    it('should return 404 if the board does not exist', (done) => {
      chai.request(server)
        .put(`/boards/does-not-exist`)
        .send({ name: 'something' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it('should not process invalid board name', (done) => {
      const modify = {
        name: 'An Invalid Name!'
      };
      
      chai.request(server)
        .put(`/boards/${board.id}`)
        .send(modify)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['name']);
          done();
        });
    });
  });
});
