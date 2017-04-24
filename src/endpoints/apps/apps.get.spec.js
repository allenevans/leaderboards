/*
 * File         :   apps.get.spec.js
 * Description  :   apps GET endpoint tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const chai = require('chai');
const expect = chai.expect;
const redis = require('../../providers/redisClient');
const seedApps = require('../../tests/seedApps');
const server = require('../../../src/app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let apps = null;

describe('/apps endpoint => GET', () => {
  beforeEach((done) => redis.flushdb(() => seedApps(1).then((seeded) => apps = seeded).then(() => done())));
  afterEach((done) => redis.flushdb(done));

  context('retrieve existing apps', () => {
    it('should retrieve an existing app', (done) => {
      chai.request(server)
        .get(`/apps/${apps[0].id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.equal(null);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(true);
          expect(res.body.id).to.equal(apps[0].id);
          expect(res.body.name).to.equal(apps[0].name);
          done();
        });
    });
  });

  context('error cases', () => {
    it('should return 404 if the app does not exist', (done) => {
      chai.request(server)
        .get(`/apps/f8dd0eda-2d60-4c3b-b80a-4d38bc547578`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(!!err).to.equal(true);
          expect(res.headers['content-type']).to.contain('application/json');
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it('should not process invalid app ids', (done) => {
      chai.request(server)
        .get(`/apps/Invalid%20App-Id`)
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
