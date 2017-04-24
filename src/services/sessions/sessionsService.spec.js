/*
 * File         :   sessionsService.spec.js
 * Description  :   Session integration tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const AccessDeniedError = require('../../errors/db/AccessDeniedError');
const expect = require('chai').expect;
const redis = require('../../providers/redisClient');
const seedBoards = require('../../tests/seedBoards');
const Session = require('./Session');
const sessionsService = require('./sessionsService');

let seededBoards = {};

describe('sessionsService integration tests', () => {
  beforeEach((done) => redis.flushdb(() => seedBoards(1).then((boards) => seededBoards = boards).then(() => done())));
  afterEach((done) => redis.flushdb(done));

  context('createSession', () => {
    it('should generate a session token for the given leaderboard', () =>
      sessionsService.createSession(seededBoards[0].id)
        .then((token) => {
          expect(!!token).to.equal(true);
          expect(typeof token === 'string').to.equal(true);
        })
    );

    it('should reject if the boardId does not exist', () =>
      sessionsService.createSession('invalid')
        .then(() => {
          expect.fail('Token should not be generated');
        }, (err) => {
          expect(err).to.be.an.instanceOf(AccessDeniedError);
        })
    );
  });
});
