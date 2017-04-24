/*
 * File         :   rangeValidate.js
 * Description  :   Validate the string value is a whole number within the specified range inclusive.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const wholeNumberValidate = require('./wholeNumberValidate');

const rangeValidate = (value, min, max) => wholeNumberValidate(value) && Number(value) >= min && Number(value) <= max;

module.exports = rangeValidate;
