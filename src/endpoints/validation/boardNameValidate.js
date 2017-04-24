/*
 * File         :   boardNameValidate.js
 * Description  :   Validate a leaderboard name.
 *                  Name can consist of characters a-z, and dash `-` and must not exceed 100 characters.
 *                  Name must begin with a character.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const boardNameValidate = (value) => /^[a-z]([a-z]|\d|\-|\s)+$/i.test(value) && value.length <= 100;

module.exports = boardNameValidate;
