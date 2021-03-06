/*
 * File         :   boards.put.spec.js
 * Description  :   boards PUT endpoint tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const chai = require('chai');
const expect = chai.expect;
const redis = require('../../providers/redisClient');
const seedBoards = require('../../tests/seedBoards');
const server = require('../../../src/app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let boards = null;

describe('/boards endpoint => PUT', () => {
  beforeEach((done) => redis.flushdb(() => seedBoards(2).then((seeded) => boards = seeded).then(() => done())));
  afterEach((done) => redis.flushdb(done));

  context('update existing boards', () => {
    it('should be able to update an existing leaderboard', (done) => {
      const modify = {
        name: boards[0].name + ' updated'
      };
      
      chai.request(server)
        .put(`/boards/${boards[0].id}`)
        .send(modify)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.equal(null);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(true);
          expect(res.body.id).to.equal(boards[0].id);
          done();
        });
    });
  });

  context('error cases', () => {
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
        .put(`/boards/${boards[1].id}`)
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

    it('should not process invalid order', (done) => {
      const modify = {
        order: 'random'
      };

      chai.request(server)
        .put(`/boards/${boards[0].id}`)
        .send(modify)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['order']);
          done();
        });
    });
  });
});
