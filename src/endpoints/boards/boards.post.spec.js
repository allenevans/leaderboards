/*
 * File         :   boards.post.spec.js
 * Description  :   boards POST endpoint tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const chai = require('chai');
const expect = chai.expect;
const redis = require('../../providers/redisClient');
const seedApps = require('../../tests/seedApps');
const server = require('../../../src/app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const board = {
  id   : 'my-apps-score-board',
  name : 'My Game Score Board',
  order: 'lowestFirst'
};

const invalidBoardId = {
  id   : 'This is Invalid',
  name : 'My Game Score Board',
  order: 'lowestFirst'
};

const invalidBoardName = {
  id   : 'my-apps-score-board',
  name : 'An Invalid Name!',
  order: 'lowestFirst'
};

const invalidValues = {
  id   : 'Not an id',
  appId: 'NOT A UUID',
  name : 'An Invalid Name!',
  order: 'random'
};

let apps = null;

describe('/boards endpoint => POST', () => {
  beforeEach((done) => redis.flushdb(() => seedApps(1).then((seeded) => apps = seeded).then(() => done())));
  afterEach((done) => redis.flushdb(done));

  context('brand a new board', () => {
    it('should register a new user account and return a success response', (done) => {
      chai.request(server)
        .post('/boards')
        .send(Object.assign(board, {appId: apps[0].id}))
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
    beforeEach((done) => {
      chai.request(server)
        .post('/boards')
        .send(Object.assign(board, {appId: apps[0].id}))
        .end(done);
    });

    it('should not allow a board to be created if one already exists with the same id', (done) => {
      chai.request(server)
        .post('/boards')
        .send(Object.assign(board, {appId: apps[0].id}))
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it('should validate all fields', (done) => {
      chai.request(server)
        .post('/boards')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['id', 'appId', 'name', 'order']);
          done();
        });
    });

    it('should validate the board id', (done) => {
      chai.request(server)
        .post('/boards')
        .send(Object.assign(invalidBoardId, {appId: apps[0].id}))
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
        .send(Object.assign(invalidBoardName, {appId: apps[0].id}))
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['name']);
          done();
        });
    });

    it('should validate all field values', (done) => {
      chai.request(server)
        .post('/boards')
        .send(invalidValues)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['id', 'appId', 'name', 'order']);
          done();
        });
    });
  });
});
