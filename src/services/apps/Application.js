/*
 * File         :   Application.js
 * Description  :   Application database model.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
class Application {
  constructor(params) {
    this.accessKey = null;
    this.id = null;
    this.name = null;

    Object.keys(this).forEach((key) => {
      if ((params || {}).hasOwnProperty(key)) {
        this[key] = params[key];
      }
    });
  }
}

Application.serialize = JSON.stringify;

Application.deserialize = (data) => new Application(JSON.parse(data));

module.exports = Application;
