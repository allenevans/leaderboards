/*
 * File         :   boards.post.spec.js
 * Description  :   boards POST endpoint tests.
 * ------------------------------------------------------------------------------------------------ */
const chai = require('chai');
const expect = chai.expect;
const server = require('../../app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const board = {
  id: 'my-game-score-board',
  name: 'My Game Score Board'
};

const invalidBoardId = {
  id: 'This is Invalid',
  name: 'My Game Score Board'
};

const invalidBoardName = {
  id: 'my-game-score-board',
  name: 'An Invalid Name!'
};

describe('/boards endpoint', () => {
  context('brand a new board', () => {
    it('should register a new user account and return a success response', (done) => {
      chai.request(server)
        .post('/boards')
        .send(board)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(err).to.equal(null);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(true);
          expect(res.body.id).to.equal(board.id);
          done();
        });
    });
  });

  context('data validation', () => {
    it('should validate all fields', (done) => {
      chai.request(server)
        .post('/boards')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['id', 'name']);
          done();
        });
    });

    it('should validate the board id', (done) => {
      chai.request(server)
        .post('/boards')
        .send(invalidBoardId)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['id']);
          done();
        });
    });

    it('should validate the board name', (done) => {
      chai.request(server)
        .post('/boards')
        .send(invalidBoardName)
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
