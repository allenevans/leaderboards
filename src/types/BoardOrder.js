/*
 * File         :   BoardOrder.js
 * Description  :   Board scoring order value type e.g. lowest value first (default), or highest value first
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const BoardOrder = Object.freeze({
  lowestFirst : 0,
  highestFirst: 1,

  /**
   * Return the key for the value
   * @param value
   */
  key: (value) => {
    if (value === null || value === undefined) {
      return;
    }

    return Object.keys(BoardOrder)
      .reduce((mapped, key) => {
        if (Number(value) === (BoardOrder[key])) {
          mapped = key;
        }

        return mapped;
      }, undefined);
  },

  /**
   * Parse the value into a valid category value.
   * Defaults to lowestFirst value.
   * @param value
   */
  parse: (value) => {
    return Object.keys(BoardOrder)
      .reduce((mapped, key) => {
        if (value === key || (value !== null && Number(value) === (BoardOrder[key]))) {
          mapped = BoardOrder[key];
        }

        return mapped;
      }, undefined);
  }
});

module.exports = BoardOrder;
