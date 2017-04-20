/*
 * File         :   BoardPostResponse.js
 * Description  :   Response model for the corresponding request.
 * ------------------------------------------------------------------------------------------------ */
class BoardPostResponse {
  constructor(boardId) {
    this.success = !!boardId;
    this.id = boardId;
  }
}

module.exports = BoardPostResponse;
