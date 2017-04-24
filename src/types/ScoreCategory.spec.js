/*
 * File         :   ScoreCategory.spec.js
 * Description  :   tests for score category value types.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const expect = require('chai').expect;
const ScoreCategory = require('./ScoreCategory');

describe('ScoreCategory', () => {
  context('key', () => {
    const tests = [
      {input: 0, expected: 'allTime'},
      {input: 1, expected: 'daily'},
      {input: 2, expected: 'weekly'},
      {input: 3, expected: 'monthly'},
      {input: '0', expected: 'allTime'},
      {input: '1', expected: 'daily'},
      {input: '2', expected: 'weekly'},
      {input: '3', expected: 'monthly'},
      {input: 'rubbish', expected: undefined},
      {input: null, expected: undefined},
      {input: undefined, expected: undefined},
    ];

    tests.forEach((test) =>
      it(`should expect key for input ${test.input} to be ${test.expected}`, () => {
        expect(ScoreCategory.key(test.input)).to.equal(test.expected);
      })
    );
  });

  context('parse', () => {
    const tests = [
      {input: 0, expected: ScoreCategory.allTime},
      {input: 1, expected: ScoreCategory.daily},
      {input: 2, expected: ScoreCategory.weekly},
      {input: 3, expected: ScoreCategory.monthly},

      {input: '0', expected: ScoreCategory.allTime},
      {input: '1', expected: ScoreCategory.daily},
      {input: '2', expected: ScoreCategory.weekly},
      {input: '3', expected: ScoreCategory.monthly},

      {input: 'allTime', expected: ScoreCategory.allTime},
      {input: 'daily', expected: ScoreCategory.daily},
      {input: 'weekly', expected: ScoreCategory.weekly},
      {input: 'monthly', expected: ScoreCategory.monthly},

      {input: null, expected: undefined},
      {input: undefined, expected: undefined},
      {input: 'rubbish', expected: undefined}
    ];

    tests.forEach((test) =>
      it(`should parse input ${test.input} to ScoreCategory ${test.expected}`, () => {
        expect(ScoreCategory.parse(test.input)).to.equal(test.expected);
      })
    );
  });
});
