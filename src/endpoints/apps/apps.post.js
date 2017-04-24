/*
 * File         :   application.post.js
 * Description  :   Create a new application that leaderapplications can be assigned to.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const Application = require('../../../src/services/apps/Application');
const ApplicationPostRequest = require('./models/ApplicationPostRequest');
const ApplicationPostResponse = require('./models/ApplicationPostResponse');
const appsService = require('../../../src/services/apps/appsService');
const endpoint = require('express').Router();
const MalformedRequestError = require('../../errors/http/MalformedRequestError');

endpoint.post('/apps', (req, res, next) => {
  const model = ApplicationPostRequest.parse(req.body);

  if (ApplicationPostRequest.isValid(model)) {
    appsService.add(new Application(model))
      .then((applicationId) =>
        res.status(201)
          .send(new ApplicationPostResponse(applicationId))
      )
      .catch(next);
  } else {
    next(new MalformedRequestError(ApplicationPostRequest.validate(model)));
  }
});

module.exports = endpoint;
