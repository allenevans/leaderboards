/*
 * File         :   BoardPostRequest.js
 * Description  :   Board POST request model.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const boardNameValidate = require('../../validation/boardNameValidate');
const simpleIdentifierValidate = require('../../validation/simpleIdentifierValidate');

const validation = [
  {
    field: 'id',
    validate: simpleIdentifierValidate,
    nullable: false
  },
  {
    field: 'name',
    validate: boardNameValidate,
    nullable: false
  }
];

class BoardPostRequest {
  constructor() {
    this.id = null;
    this.name = null;
  }
}

/**
 * Parse JSON object into a BoardPostRequest
 * @param data
 * @returns {BoardPostRequest}
 */
BoardPostRequest.parse = (data) => {
  const request = new BoardPostRequest();

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
BoardPostRequest.validate = (data) => Object.keys(new BoardPostRequest())
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
BoardPostRequest.isValid = (data) => BoardPostRequest.validate(data).length === 0;

module.exports = BoardPostRequest;
