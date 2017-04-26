/*
 * File         :   stringValidate.js
 * Description  :   Validate the value given is a string.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
/**
 * Validate that characters in the string match the defined regex.
 * @param maxLength Maximum length of the string (optional). Default = Number.MAX_SAFE_INTEGER
 * @param minLength Minimum length of the string (optional). Default = 0.
 */
const stringValidate = (maxLength, minLength) => (value) => {
  const length = value && value.toString().length;

  if (length < (minLength || 0) || length > (maxLength || Number.MAX_SAFE_INTEGER)) { return false; }

  return /^[\w|\s]+$/.test(value);
};

module.exports = stringValidate;
