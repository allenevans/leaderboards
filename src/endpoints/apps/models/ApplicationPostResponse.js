/*
 * File         :   ApplicationPostResponse.js
 * Description  :   Response model for the corresponding request.
 * ------------------------------------------------------------------------------------------------ */
class ApplicationPostResponse {
  constructor(appId) {
    this.success = !!appId;
    this.id = appId;
  }
}

module.exports = ApplicationPostResponse;
