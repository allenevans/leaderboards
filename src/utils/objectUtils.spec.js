/*
 * File         :   objectUtils.spec.js
 * Description  :   Tests for object utilities.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const expect = require('chai').expect;
const objectUtils = require('./objectUtils');

describe('objectUtils tests', () => {
  context('sortObjectKeys', () => {
    it('should sort the keys in an object', () => {
      const input = {a: 1, c: 3, b: 2};

      const result = objectUtils.sortObjectKeys(input);

      expect(Object.keys(input)).to.deep.equal(['a', 'c', 'b']);
      expect(Object.keys(result)).to.deep.equal(['a', 'b', 'c']);
      Object.keys(input).forEach(key => {
        expect(input[key]).to.equal(result[key]);
      });
    });

    it('should sort the keys in in nested objects', () => {
      const input = {a: 1, c: 3, d: {
        f: 1,
        e: { g: 2 }
      }, b: 2};

      const result = objectUtils.sortObjectKeys(input);

      expect(Object.keys(input)).to.deep.equal(['a', 'c', 'd', 'b']);
      expect(Object.keys(input.d)).to.deep.equal(['f', 'e']);
      expect(Object.keys(input.d.e)).to.deep.equal(['g']);

      expect(Object.keys(result)).to.deep.equal(['a', 'b', 'c', 'd']);
      expect(Object.keys(result.d)).to.deep.equal(['e', 'f']);
      expect(Object.keys(result.d.e)).to.deep.equal(['g']);
    });
  });
});
