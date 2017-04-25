/*
 * File         :   objectUtils.js
 * Description  :   Object utility helpers.
 * -------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Recursively loop through an object and ensure all its keys are sorted alphabetically.
 * @param object
 */
const sortObjectKeys = (object) => {
  if (object === null || object === undefined) { return; }

  if (typeof object === 'object') {
    const sortedObject = {};

    Object.keys(object).sort().forEach(key => {
      const value = object[key];

      sortedObject[key] = sortObjectKeys(value);
    });

    return sortedObject;
  }

  return object;
};

module.exports = {
  sortObjectKeys
};
