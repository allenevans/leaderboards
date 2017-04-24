/*
 * File         :   seedBoards.js
 * Description  :   Seeds the database with the specified number of leaderboards.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const Board = require('../services/boards/Board');
const boardsServices = require('../services/boards/boardsService');
const random = require('random-name');
const seedApps = require('./seedApps');
const uuid = require('uuid/v4');

module.exports = (count, mergeList) => seedApps(count).then((apps) => new Promise((resolve) => {
  const boards = [];

  for (let i = 0; i < count; i++) {
    const merge = (mergeList || []).shift() || {};

    boards.push(new Board(Object.assign({
      id: uuid(),
      appId: apps[i].id,
      name: `${random.first()} ${random.place()}`,
      order: 'lowestFirst'
    }, merge)));
  }

  Promise.all(boards.map((board) => boardsServices.add(board))).then(() => resolve(boards));
}));
