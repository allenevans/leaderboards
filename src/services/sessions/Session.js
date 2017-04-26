/*
 * File         :   Session.js
 * Description  :   A JWT Session class.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
class Session {
  constructor(params) {
    this.appId = null;
    this.boardId = null;
    this.timestamp = null;

    Object.keys(this).forEach((key) => {
      if ((params || {}).hasOwnProperty(key)) {
        this[key] = params[key];
      }
    });
  }
}

Session.parse = (data) => {
  const session = new Session();

  Object.keys(session).forEach((key) => {
    if (data.hasOwnProperty(key)) {
      session[key] = data[key];
    }
  });

  return session;
};

module.exports = Session;
