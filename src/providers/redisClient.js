/*
 * File         :   RedisClient.js
 * Description  :   RedisClient instance.
 * ------------------------------------------------------------------------------------------------ */
const redis = require('redis');
const config = require('../config/server.config');

const tryCatch = (func) => () => { try { func(); } catch(x) { /* ignore errors */ } };

const client = redis.createClient(config.redis);
process.on('SIGINT', tryCatch(() => client.quit()));
process.on('SIGTERM', tryCatch(() => client.quit()));

module.exports = client;
