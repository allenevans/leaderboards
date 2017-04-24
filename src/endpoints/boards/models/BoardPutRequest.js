/*
 * File         :   BoardPutRequest.js
 * Description  :   Board PUT request model.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const boardNameValidate = require('../../validation/boardNameValidate');
const BoardOrder = require('../../../types/BoardOrder');
const requestModelValidate = require('../../validation/requestModelValidate');
const valueTypeValidate = require('../../validation/valueTypeValidate');

const rules = [
  {
    field: 'name',
    validate: boardNameValidate,
    optional: true
  },
  {
    field: 'order',
    validate: valueTypeValidate(BoardOrder),
    optional: true
  }
];

class BoardPutRequest {
  constructor() {
    this.name = null;
    this.order = null;
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
BoardPutRequest.validate = requestModelValidate(BoardPutRequest, rules);

/**
 * Return boolean flag indicating if the request is valid.
 * @param data
 */
BoardPutRequest.isValid = (data) => BoardPutRequest.validate(data).length === 0;

module.exports = BoardPutRequest;
