/*
 * File         :   seedApps.js
 * Description  :   Seeds the database with the specified number of apps.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const appsServices = require('../services/apps/appsService');
const Application = require('../services/apps/Application');
const random = require('random-name');
const uuid = require('uuid/v4');

module.exports = (count) => new Promise((resolve) => {
  const apps = [];

  for (let i = 0; i < count; i++) {
    apps.push(new Application({
      id: uuid(),
      name: `${random.first()} ${random.place()}`
    }));
  }

  Promise.all(apps.map((app) => appsServices.add(app))).then(() => resolve(apps));
});