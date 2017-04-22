/*
 * File         :   BoardPutResponse.js
 * Description  :   Response model for the corresponding request.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
class BoardPutResponse {
  constructor(boardId) {
    this.success = !!boardId;
    this.id = boardId;
  }
}

module.exports = BoardPutResponse;
