/*
 * File         :   apps.get.js
 * Description  :   Get an application by its id.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const ApplicationGetResponse = require('./models/ApplicationGetResponse');
const appService = require('../../../src/services/apps/appsService');
const endpoint = require('express').Router();
const MalformedRequestError = require('../../errors/http/MalformedRequestError');
const NotFoundError = require('../../errors/http/NotFoundError');
const uuidValidate = require('../validation/uuidValidate');

endpoint.get('/apps/:id', (req, res, next) => {
  const errors = [];

  if (!uuidValidate(req.params.id)) { errors.push('id'); }

  if (!errors.length) {
    appService.get(req.params.id)
      .then((app) => app ?
        res.status(200)
          .send(ApplicationGetResponse.parse(app)) :
        next(new NotFoundError(`No application found for key ${req.params.id}`))
      )
      .catch(next);
  } else {
    next(new MalformedRequestError(errors));
  }
});

module.exports = endpoint;
