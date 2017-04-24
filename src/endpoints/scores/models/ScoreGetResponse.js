/*
 * File         :   ScorePostResponse.js
 * Description  :   Response model for the corresponding request.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
class ScoreGetResponse {
  constructor() {
    this.success = true;
    this.leaderboard = [];
  }
}

/**
 * Takes a redis ZRANGE / ZREVRANGE WITHSCORES data set and parses it.
 * @param data
 */
ScoreGetResponse.parse = (data) => {
  const response = new ScoreGetResponse();

  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i += 2) {
      response.leaderboard.push({
        rank  : (i / 2) + 1,
        player: data[i],
        score : data[i + 1]
      });
    }
  }

  return response;
};

module.exports = ScoreGetResponse;
