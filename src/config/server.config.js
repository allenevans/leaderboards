/*
 * File         :   server.config.js
 * Description  :   Server configuration.
 * ------------------------------------------------------------------------------------------------ */
const redisConfig = {
  'development': {
    host: '127.0.0.1',
    port: 6379,
    db: 2
  },
  'test': {
    host: '127.0.0.1',
    port: 6379,
    db: 3
  }
};

module.exports = {
  redis: redisConfig[process.env.NODE_ENV],
  secret: 'Shhhh!!!, this is the secret key that should not be shared.',
  tokenDuration: 10 // seconds
};
