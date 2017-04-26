/*
 * File         :   ScorePostRequest.js
 * Description  :   Score POST request model.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const requestModelValidate = require('../../validation/requestModelValidate');
const simpleIdentifierValidate = require('../../validation/simpleIdentifierValidate');
const wholeNumberValidate = require('../../validation/wholeNumberValidate');

const rules = [
  {
    field: 'boardId',
    validate: simpleIdentifierValidate,
    optional: false
  },
  {
    field: 'player',
    validate: () => true,
    optional: false
  },
  {
    field: 'timestamp',
    validate: wholeNumberValidate,
    optional: false
  },
  {
    field: 'value',
    validate: wholeNumberValidate,
    optional: false
  }
];

class ScorePostRequest {
  constructor() {
    this.boardId = null;
    this.player = null;
    this.timestamp = null;
    this.value = null;
  }
}

/**
 * Parse JSON object into a ScorePostRequest
 * @param data
 * @returns {ScorePostRequest}
 */
ScorePostRequest.parse = (data) => {
  const request = new ScorePostRequest();

  Object.keys(request).forEach((key) => {
    if (data.hasOwnProperty(key)) {
      request[key] = data[key];
    }
  });

  return request;
};

/**
 * Validate model against the request. Return an array of field names in error.
 * @param data
 */
ScorePostRequest.validate = requestModelValidate(ScorePostRequest, rules);

/**
 * Return boolean flag indicating if the request is valid.
 * @param data
 */
ScorePostRequest.isValid = (data) => ScorePostRequest.validate(data).length === 0;

module.exports = ScorePostRequest;
