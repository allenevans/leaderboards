/*
 * File         :   HttpError.js
 * Description  :   Abstract Http Error type.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const errorsCodes = {
  0: { name: 'Unspecified error', message: 'An unspecified error has occurred' },
  400: { name: 'Malformed request', message: 'The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.' },
  401: { name: 'Unauthorized', message: 'The request requires user authentication. The client MAY repeat the request with a suitable Authorization header field' },
  403: { name: 'Forbidden', message: 'The server understood the request, but is refusing to fulfill it. Authorization will not help and the request SHOULD NOT be repeated.' },
  404: { name: 'Not found', message: 'The server has not found anything matching the Request-URI.' },
  409: { name: 'Resource conflict', message: 'The request could not be completed due to a conflict with the current state of the resource.' }
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
