/*
 * File         :   simpleIdentifierValidate.js
 * Description  :   Validate a simple string identifier.
 *                  Identifier can only consist of lowercase characters a-z, and dash `-` and must not exceed 40 characters
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const simpleIdentifierValidate = (value) => /^([a-z]|\d|\-)+$/.test(value) && value.length <= 40;

module.exports = simpleIdentifierValidate;
