/*
 * File         :   wholeNumberValidate.js
 * Description  :   Validate the string value is a valid whole number.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const wholeNumberValidate = (value) =>
  value && /^\d+$/.test(value) && value.toString().length <= 16 && Number(value) <= Number.MAX_SAFE_INTEGER;

module.exports = wholeNumberValidate;
