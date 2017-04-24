/*
 * File         :   appsService.js
 * Description  :   Data manipulation services for application entities.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const Application = require('./Application');
const RecordNotFoundError = require('../../errors/db/RecordNotFoundError');
const redis = require('../../providers/redisClient');
const UniqueConflictError = require('../../errors/db/UniqueConflictError');

const getAppKey = (appId) => `app:${appId}`;

/**
 * Reserve an application name to keep them unique.
 * @param appId
 * @param appName
 */
const reserveName = (appId, appName) =>
  get(appId).then((existsByAppId) => {
    if (existsByAppId) { return false; }

    return new Promise((resolve, reject) => {
      redis.hincrby('app:names', appName, 1, (err, result) => {
        if (err) { reject(err); }

        resolve(result === 1);
      })
    });
  });

/**
 * Add a new application
 * @param app
 */
const add = (app) => {
  return reserveName(app.id, app.name)
    .then((reserved) => {
      if (!reserved) {
        return Promise.reject(new UniqueConflictError(app.name));
      }

      return new Promise((resolve, reject) => {
        redis
          .set(getAppKey(app.id), Application.serialize(new Application(app)), (err) => (err) ? reject(err) : resolve(app.id));
      });
    });
};

/**
 * Get an application by its id.
 * @param id
 */
const get = (id) => {
  return new Promise((resolve, reject) => {
    redis.get(getAppKey(id), (err, data) => err ? reject(err) : resolve(data && Application.deserialize(data)));
  });
};

module.exports = {
  add,
  get
};
