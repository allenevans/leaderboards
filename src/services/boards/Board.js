/*
 * File         :   Board.js
 * Description  :   Leaderboard database model.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
class Board {
  constructor(params) {
    this.id = null;
    this.name = null;

    Object.keys(this).forEach((key) => {
      if ((params || {}).hasOwnProperty(key)) {
        this[key] = params[key];
      }
    });
  }
}

Board.serialize = JSON.stringify;

Board.deserialize = (data) => new Board(JSON.parse(data));

module.exports = Board;
