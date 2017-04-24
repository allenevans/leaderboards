/*
 * File         :   ScoreCategory.js
 * Description  :   Score category value type.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const ScoreCategory = Object.freeze({
  allTime: 0,
  daily: 1,
  weekly: 2,
  monthly: 3,

  /**
   * Return the key for the value
   * @param value
   */
  key: (value) => {
    if (value === null || value === undefined) { return; }

    return Object.keys(ScoreCategory)
      .reduce((mapped, key) => {
        if (Number(value) === (ScoreCategory[key])) {
          mapped = key;
        }

        return mapped;
      }, undefined);
  },

  /**
   * Parse the value into a valid category value.
   * Defaults to allTime value.
   * @param value
   */
  parse: (value) => {
    return Object.keys(ScoreCategory)
      .reduce((mapped, key) => {
        if (value === key || (value !== null && Number(value) === (ScoreCategory[key]))) {
          mapped = ScoreCategory[key];
        }

        return mapped;
      }, undefined);
  }
});

module.exports = ScoreCategory;
