/*
 * File         :   BoardDeleteResponse.js
 * Description  :   Response model for the corresponding request.
 * ------------------------------------------------------------------------------------------------ */
class BoardDeleteResponse {
  constructor() {
    this.success = true;

    this.id = null;
  }
}

BoardDeleteResponse.parse = (data) => {
  const response = new BoardDeleteResponse();

  Object.keys(response).forEach((key) => {
    if (data.hasOwnProperty(key)) {
      response[key] = data[key];
    }
  });

  return response;
};

module.exports = BoardDeleteResponse;
