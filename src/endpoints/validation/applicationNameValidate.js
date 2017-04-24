/*
 * File         :   applicationNameValidate.js
 * Description  :   Validate an application name.
 *                  Name can consist of any characters and must not exceed 100 characters in length.
 *                  Name must begin with a character.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const applicationNameValidate = (value) => {
  return value && /^\w([\w\s]+)\w$/i.test(value) && value.length <= 100;
};

module.exports = applicationNameValidate;
