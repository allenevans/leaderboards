/*
 * File         :   ScorePostResponse.js
 * Description  :   Response model for the corresponding request.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
class ScorePostResponse {
  constructor(boardId) {
    this.success = !!boardId;
  }
}

module.exports = ScorePostResponse;
