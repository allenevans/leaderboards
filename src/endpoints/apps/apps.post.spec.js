/*
 * File         :   apps.post.spec.js
 * Description  :   apps POST endpoint tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const chai = require('chai');
const expect = chai.expect;
const redis = require('../../providers/redisClient');
const seedApps = require('../../tests/seedApps');
const server = require('../../../src/app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let seededApps = null;

describe('/apps endpoint => POST', () => {
  beforeEach((done) => redis.flushdb(() => seedApps(1).then((seeded) => seededApps = seeded).then(() => done())));
  afterEach((done) => redis.flushdb(done));

  context('brand a new board', () => {
    it('should register a new app and return a success response', (done) => {
      const app = {
        name: 'My new shiny app'
      };

      chai.request(server)
        .post('/apps')
        .send(app)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(err).to.equal(null);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(true);
          expect(!!res.body.id).to.equal(true);
          done();
        });
    });
  });

  context('data validation', () => {
    it('should not allow an to be created if one already exists with the same name', (done) => {
      const app = {
        name: seededApps[0]
      };

      chai.request(server)
        .post('/apps')
        .send(app)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          expect(res.body.fields).to.deep.equal(['name']);
          done();
        });
    });

    it('should validate all fields', (done) => {
      chai.request(server)
        .post('/apps')
        .send({})
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
      const app = {
        name: '    INVALID'
      };
      chai.request(server)
        .post('/apps')
        .send(app)
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
