/*
 * File         :   BoardOrder.spec.js
 * Description  :   BoardOrder value type test.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const expect = require('chai').expect;
const BoardOrder = require('./BoardOrder');

describe('BoardOrder', () => {
  context('key', () => {
    const tests = [
      {input: 0, expected: 'lowestFirst'},
      {input: 1, expected: 'highestFirst'},
      {input: 'rubbish', expected: undefined},
      {input: null, expected: undefined},
      {input: undefined, expected: undefined},
    ];

    tests.forEach((test) =>
      it(`should expect key for input ${test.input} to be ${test.expected}`, () => {
        expect(BoardOrder.key(test.input)).to.equal(test.expected);
      })
    );
  });

  context('parse', () => {
    const tests = [
      {input: 0, expected: BoardOrder.lowestFirst},
      {input: 1, expected: BoardOrder.highestFirst},

      {input: '0', expected: BoardOrder.lowestFirst},
      {input: '1', expected: BoardOrder.highestFirst},

      {input: 'lowestFirst', expected: BoardOrder.lowestFirst},
      {input: 'highestFirst', expected: BoardOrder.highestFirst},

      {input: null, expected: undefined},
      {input: undefined, expected: undefined},
      {input: 'rubbish', expected: undefined}
    ];

    tests.forEach((test) =>
      it(`should parse input ${test.input} to BoardOrder ${test.expected}`, () => {
        expect(BoardOrder.parse(test.input)).to.equal(test.expected);
      })
    );
  });
});
