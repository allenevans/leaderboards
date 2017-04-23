/*
 * File         :   Score.js
 * Description  :   Score database model.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
class Score {
  constructor(params) {
    this.player = null;
    this.timestamp = null;
    this.value = null;

    Object.keys(this).forEach((key) => {
      if ((params || {}).hasOwnProperty(key)) {
        this[key] = params[key];
      }
    });
  }
}

Score.serialize = (score) => `${score.player}`;

module.exports = Score;
