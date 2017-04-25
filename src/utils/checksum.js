/*
 * File         :   checksum.js
 * Description  :   Calculate the checksum for an object.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const hash = require('crypto-js/hmac-sha1');
const objectUtils = require('./objectUtils');

/**
 * Calculate the checksum of an object.
 * @param object Supports simple objects with keys in any order.
 * @param key
 */
const checksum = (object, key) =>
  (object === null || object === undefined || key === null || key === undefined) ?
    undefined : hash(JSON.stringify(objectUtils.sortObjectKeys(object)), key).toString();

module.exports = checksum;
