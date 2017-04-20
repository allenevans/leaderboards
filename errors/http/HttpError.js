/*
 * File         :   HttpError.js
 * Description  :   Abstract Http Error type.
 * ------------------------------------------------------------------------------------------------ */
const errorsCodes = {
  0: { name: 'Unspecified error', message: 'An unspecified error has occurred' },
  400: { name: 'Malformed request', message: 'The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.' },
  404: { name: 'Not found', message: 'The server has not found anything matching the Request-URI.' }
};

class HttpError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, HttpError);

    this.status = 0;
  }

  get name() {
    return errorsCodes[this.status].name;
  }

  get message() {
    return errorsCodes[this.status].message
  }
}

module.exports = HttpError;
