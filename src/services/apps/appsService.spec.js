/*
 * File         :   appsService.spec.js
 * Description  :   Apps redis service integration tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const Application = require('./Application');
const appsService = require('./appsService');
const expect = require('chai').expect;
const redis = require('../../providers/redisClient');
const UniqueConflictError = require('../../errors/db/UniqueConflictError');
const uuid = require('uuid/v4');

describe('appsService integration tests', () => {
  beforeEach((done) => redis.flushdb(done));
  afterEach((done) => redis.flushdb(done));

  context('adding new apps', () => {
    it('should add a new app', () => {
      const app = new Application({
        id: uuid(),
        name: 'My app'
      });

      return appsService.add(app)
        .then((id) => {
          expect(!!id).to.equal(true);
        })
    });

    it('application name should be unique', () => {
      const app1 = new Application({
        id: uuid(),
        name: 'My app'
      });
      const app2 = new Application({
        id: uuid(),
        name: 'My app'
      });

      return appsService.add(app1)
        .then(() => appsService.add(app2))
        .then(
          () => expect.fail('Should throw an error to that the application name has already been taken'),
          (err) => {
            expect(!!err).to.equal(true);
            expect(err).to.be.an.instanceOf(UniqueConflictError);
          }
        );
    });
  })
});