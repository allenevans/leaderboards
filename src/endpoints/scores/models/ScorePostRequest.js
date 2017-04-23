/*
 * File         :   ScorePostRequest.js
 * Description  :   Score POST request model.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const simpleIdentifierValidate = require('../../validation/simpleIdentifierValidate');
const wholeNumberValidate = require('../../validation/wholeNumberValidate');

const validation = [
  {
    field: 'boardId',
    validate: simpleIdentifierValidate,
    nullable: false
  },
  {
    field: 'player',
    validate: () => true,
    nullable: false
  },
  {
    field: 'timestamp',
    validate: wholeNumberValidate,
    nullable: false
  },
  {
    field: 'value',
    validate: wholeNumberValidate,
    nullable: false
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
 * Validate fields, return an array of errors.
 * @param data
 */
ScorePostRequest.validate = (data) => Object.keys(new ScorePostRequest())
    .filter(
      (key) => {
        const rule = validation.filter((rule) => rule.field === key)[0];

        return rule && (
            (!rule.nullable && (data[key] === null || data[key] === undefined)) ||
            (!rule.validate(data[key]))
          );
      }
    );

/**
 * Return boolean flag indicating if the request is valid.
 * @param data
 */
ScorePostRequest.isValid = (data) => ScorePostRequest.validate(data).length === 0;

module.exports = ScorePostRequest;
