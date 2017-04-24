/*
 * File         :   BoardPostRequest.js
 * Description  :   Board POST request model.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const boardNameValidate = require('../../validation/boardNameValidate');
const BoardOrder = require('../../../types/BoardOrder');
const requestModelValidate = require('../../validation/requestModelValidate');
const simpleIdentifierValidate = require('../../validation/simpleIdentifierValidate');
const valueTypeValidate = require('../../validation/valueTypeValidate');

const rules = [
  {
    field: 'id',
    validate: simpleIdentifierValidate,
    optional: false
  },
  {
    field: 'name',
    validate: boardNameValidate,
    optional: false
  },
  {
    field: 'order',
    validate: valueTypeValidate(BoardOrder),
    optional: false
  }
];

class BoardPostRequest {
  constructor() {
    this.id = null;
    this.name = null;
    this.order = null;
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
      if (key === 'order') {
        request[key] = BoardOrder.parse(data[key]);
      } else {
        request[key] = data[key];
      }
    }
  });

  return request;
};

/**
 * Validate fields, return an array of errors.
 * @param data
 */
BoardPostRequest.validate = requestModelValidate(BoardPostRequest, rules);

/**
 * Return boolean flag indicating if the request is valid.
 * @param data
 */
BoardPostRequest.isValid = (data) => BoardPostRequest.validate(data).length === 0;

module.exports = BoardPostRequest;
