/*
 * File         :   ApplicationGetResponse.js
 * Description  :   Response model for the corresponding request.
 * ------------------------------------------------------------------------------------------------ */
class ApplicationGetResponse {
  constructor() {
    this.success = true;

    this.id = null;
    this.name = null;
  }
}

ApplicationGetResponse.parse = (data) => {
  const response = new ApplicationGetResponse();

  Object.keys(response).forEach((key) => {
    if (data.hasOwnProperty(key)) {
      response[key] = data[key];
    }
  });

  return response;
};

module.exports = ApplicationGetResponse;
