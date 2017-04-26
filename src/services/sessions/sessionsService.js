/*
 * File         :   sessionsService.js
 * Description  :   JWT session token service.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const AccessDeniedError = require('../../errors/db/AccessDeniedError');
const boardsService = require('../boards/boardsService');
const config = require('../../config/server.config');
const jwt = require('jsonwebtoken');
const Session = require('./Session');

/**
 * Create a JWT.
 * @param boardId
 * @return {Promise}
 */
const createSession = (boardId) => {
  return boardsService.get(boardId)
    .then((board) => {
      if (!board) {
        return Promise.reject(new AccessDeniedError('Leaderboard not found'));
      }

      const session = new Session({
        appId    : board.appId,
        boardId  : board.id,
        timestamp: Date.now()
      });

      return new Promise((resolve, reject) =>
        jwt.sign(session, config.secret, {expiresIn: config.tokenDuration}, (err, token) => err ? reject(err) : resolve(token))
      );
    });
};

const validate = (token) => new Promise((resolve, reject) => {
  // verifies secret and checks exp
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return err.message === 'invalid signature' ? resolve(false) : reject(err);
    }

    const session = Session.parse(decoded);

    boardsService.get(session.boardId)
      .then((board) => resolve(session), (err) => reject(err));
  });
});

module.exports = {
  createSession,
  validate
};
