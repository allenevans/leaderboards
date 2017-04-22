/*
 * File         :   BoardGetResponse.js
 * Description  :   Response model for the corresponding request.
 * ------------------------------------------------------------------------------------------------ */
class BoardGetResponse {
  constructor() {
    this.success = true;

    this.id = null;
    this.name = null;
  }
}

BoardGetResponse.parse = (data) => {
  const response = new BoardGetResponse();

  Object.keys(response).forEach((key) => {
    if (data.hasOwnProperty(key)) {
      response[key] = data[key];
    }
  });

  return response;
};

module.exports = BoardGetResponse;
