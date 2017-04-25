/*
 * File         :   checksum.spec.js
 * Description  :   Checksum tests.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const checksum = require('./checksum');
const expect = require('chai').expect;

describe('checksum', () => {
  it('should generate a checksum for an object', () => {
    const input = {score: 123, timestamp: 1493115971671};

    const result = checksum(input, 'secret');

    expect(!!result).to.equal(true);
  });

  it('should generate the same checksum even when the object keys are in a different order', () => {
    const input1 = {score: 123, timestamp: 1493115971671};
    const input2 = {timestamp: 1493115971671, score: 123};

    const result1 = checksum(input1, 'secret');
    const result2 = checksum(input2, 'secret');

    expect(result1).to.equal(result2);
  });

  it('should produce different checksums for different objects', () => {
    const input1 = {a: 1};
    const input2 = {a: 2};

    const result1 = checksum(input1, 'secret');
    const result2 = checksum(input2, 'secret');

    expect(result1).not.to.equal(result2);
  });

  it('should produce a different checksum if a different key is used', () => {
    const input = {a: 1, b: {c: 2}};

    const result1 = checksum(input, 'secret 1');
    const result2 = checksum(input, 'secret 2');

    expect(result1).not.to.equal(result2);
  });

  it('should produce checksum for a primitive value', () => {
    const input1 = 'hello';
    const input2 = 123;
    const input3 = false;

    const result1 = checksum(input1, 'secret');
    const result2 = checksum(input2, 'secret');
    const result3 = checksum(input3, 'secret');

    expect(!!result1).to.equal(true);
    expect(!!result2).to.equal(true);
    expect(!!result3).to.equal(true);
    expect(result1).not.to.equal(result2);
    expect(result2).not.to.equal(result3);
    expect(result1).not.to.equal(result3);
  });

  it('should not produce checksums for null or undefined values', () => {
    const input1 = null;
    const input2 = undefined;

    const result1 = checksum(input1, 'secret');
    const result2 = checksum(input2, 'secret');

    expect(!!result1).to.equal(false);
    expect(!!result2).to.equal(false);
  });

  it('should not produce checksums for null or undefined keys', () => {
    const input = 'hello';

    const result1 = checksum(input, null);
    const result2 = checksum(input);

    expect(!!result1).to.equal(false);
    expect(!!result2).to.equal(false);
  });
});