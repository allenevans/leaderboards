/*
 * File         :   SessionPostRequest.js
 * Description  :   Request model for creating a temporary session.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const requestModelValidate = require('../../validation/requestModelValidate');
const sessionsService = require('../../../services/sessions/sessionsService');
const simpleIdentifierValidate = require('../../validation/simpleIdentifierValidate');

const rules = [
  {
    field: 'boardId',
    validate: simpleIdentifierValidate,
    optional: false
  }
];

class SessionPostRequest {
  constructor() {
    this.boardId = null;
  }
}

/**
 * Parse JSON object into a SessionPostRequest
 * @param data
 * @returns {SessionPostRequest}
 */
SessionPostRequest.parse = (data) => {
  const request = new SessionPostRequest();

  Object.keys(request).forEach((key) => {
    if (data.hasOwnProperty(key)) {
      request[key] = data[key];
    }
  });

  return request;
};

/**
 * Validate fields, return an array of errors.
 * @param data
 */
SessionPostRequest.validate = requestModelValidate(SessionPostRequest, rules);

/**
 * Return boolean flag indicating if the request is valid.
 * @param data
 */
SessionPostRequest.isValid = (data) => SessionPostRequest.validate(data).length === 0;

module.exports = SessionPostRequest;
