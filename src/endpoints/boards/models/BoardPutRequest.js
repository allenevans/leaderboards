/*
 * File         :   BoardPutRequest.js
 * Description  :   Board PUT request model.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const boardNameValidate = require('../../validation/boardNameValidate');

const validation = [
  {
    field: 'name',
    validate: boardNameValidate,
    nullable: false
  }
];

class BoardPutRequest {
  constructor() {
    this.name = null;
  }
}

/**
 * Parse JSON object into a BoardPutRequest
 * @param data
 * @returns {BoardPutRequest}
 */
BoardPutRequest.parse = (data) => {
  const request = new BoardPutRequest();

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
BoardPutRequest.validate = (data) => Object.keys(new BoardPutRequest())
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
BoardPutRequest.isValid = (data) => BoardPutRequest.validate(data).length === 0;

module.exports = BoardPutRequest;
