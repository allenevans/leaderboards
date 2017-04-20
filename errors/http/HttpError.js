/*
 * File         :   HttpError.js
 * Description  :   Abstract Http Error type.
 * ------------------------------------------------------------------------------------------------ */
const errorsCodes = {
  0: { name: 'Unspecified error', message: 'An unspecified error has occurred' },
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
