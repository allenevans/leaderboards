/*
 * File         :   checksumMiddleware.js
 * Description  :   Validate the payload against a checksum.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const appsService = require('../../services/apps/appsService');
const checksum = require('../../utils/checksum');
const MalformedRequestError = require('../../errors/http/MalformedRequestError');

module.exports = (req, res, next) => {
  const hash = req.headers['x-checksum'];

  if (!hash) {
    return next(new MalformedRequestError(['checksum']));
  }

  const session = req.session || {};

  appsService.get(session.appId)
    .then((app) => checksum(req.body, `${app.accessKey}-${session.token}`) === hash)
    .then((valid) => valid ? next() : next(new MalformedRequestError(['checksum'])))
    .catch(next);
};
