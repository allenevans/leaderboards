/*
 * File         :   app.spec.js
 * Description  :   app integration tests.
 * ------------------------------------------------------------------------------------------------ */
const chai = require('chai');
const expect = chai.expect;
const server = require('./app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('default routes', () => {
  it('should return a valid 200 response and html page for the default route', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.headers['content-type']).to.contain('text/html');
        done();
      });
  });

  it.only('should return return a 404 error response for routes not defined', (done) => {
    chai.request(server)
      .get('/does-not-exist')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.headers['content-type']).to.contain('text/html');
        done();
      });
  });
});
