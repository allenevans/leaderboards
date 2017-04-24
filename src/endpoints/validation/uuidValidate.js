/*
 * File         :   uuidValidate.js
 * Description  :   Validate a UUID as specified in RFC4122.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const uuidValidate = (value) => 
  value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value) && value.length <= 100;

module.exports = uuidValidate;
