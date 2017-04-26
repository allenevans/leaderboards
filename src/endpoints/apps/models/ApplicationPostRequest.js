/*
 * File         :   ApplicationPostRequest.js
 * Description  :   Application POST request model.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const applicationNameValidate = require('../../validation/applicationNameValidate');
const requestModelValidate = require('../../validation/requestModelValidate');
const stringValidate = require('../../validation/stringValidate');
const uuidV4 = require('uuid/v4');
const uuidValidate = require('../../validation/uuidValidate');

const rules = [
  {
    field: 'id',
    validate: uuidValidate,
    optional: false
  },
  {
    field: 'name',
    validate: applicationNameValidate,
    optional: false
  },
  {
    field: 'accessKey',
    validate: stringValidate(1000, 8),
    optional: true
  }
];

class ApplicationPostRequest {
  constructor() {
    this.id = uuidV4();
    this.name = null;
    this.accessKey = Math.random().toString(31).substring(2, 34);
  }
}

/**
 * Parse JSON object into a ApplicationPostRequest
 * @param data
 * @returns {ApplicationPostRequest}
 */
ApplicationPostRequest.parse = (data) => {
  const request = new ApplicationPostRequest();

  Object.keys(request).forEach((key) => {
    if (key !== 'id' && data.hasOwnProperty(key)) {
      request[key] = data[key];
    }
  });

  return request;
};

/**
 * Validate fields, return an array of errors.
 * @param data
 */
ApplicationPostRequest.validate = requestModelValidate(ApplicationPostRequest, rules);

/**
 * Return boolean flag indicating if the request is valid.
 * @param data
 */
ApplicationPostRequest.isValid = (data) => ApplicationPostRequest.validate(data).length === 0;

module.exports = ApplicationPostRequest;
