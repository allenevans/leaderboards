/*
 * File         :   SessionPostResponse.js
 * Description  :   Response model for the corresponding request.
 * ------------------------------------------------------------------------------------------------ */
class SessionPostResponse {
  constructor(token) {
    this.success = !!token;
    this.token = token;
  }
}

module.exports = SessionPostResponse;
