
 /*
 * File         :   dateUtils.spec.js
 * Description  :   Date utility tests.
* -------------------------------------------------------------------------------------------------------------------------------------- */
 const dateUtils = require('./dateUtils');
 const expect = require('chai').expect;

 describe('Date utility tests', () => {
   context('secondsRemainingInDay', () => {
     const testCases = [
       { now: new Date('2017-04-21T23:59:59.000Z'), expected: 1 },
       { now: new Date('2017-04-21T23:59:59.001Z'), expected: 0 },
       { now: new Date('2017-04-22T00:00:00.000Z'), expected: 86400 },
       { now: new Date('2017-04-22T00:00:00.001Z'), expected: 86399 },
       { now: new Date('2017-04-22T00:00:01.000Z'), expected: 86399 },
       { now: new Date('2017-01-01T12:00:00.000Z'), expected: 43200 }
     ];

     testCases.forEach((test) => {
       it(`should return ${test.expected} seconds in the day for date ${test.now.toISOString()}`, () => {
         expect(dateUtils.secondsRemainingInDay(test.now)).to.equal(test.expected);
       });
     });
   });

   context('secondsRemainingInWeek', () => {
     const testCases = [
       { now: new Date('2017-03-25T00:00:00.000Z'), expected: 86400 * 2 },
       { now: new Date('2017-04-23T00:00:00.000Z'), expected: 86400 },
       { now: new Date('2017-04-23T00:00:00.000Z'), expected: 86400 },
       { now: new Date('2017-04-23T12:00:00.000Z'), expected: 43200 },
       { now: new Date('2017-04-22T00:00:00.000Z'), expected: 86400 * 2 },
       { now: new Date('2017-04-22T00:00:01.000Z'), expected: (86400 * 2) - 1 },
       { now: new Date('2017-04-24T00:00:00.000Z'), expected: (86400 * 7) },
       { now: new Date('2017-04-25T00:00:00.000Z'), expected: (86400 * 6) },
       { now: new Date('2017-04-26T00:00:00.000Z'), expected: (86400 * 5) },
       { now: new Date('2017-04-27T00:00:00.000Z'), expected: (86400 * 4) },
       { now: new Date('2017-04-28T00:00:00.000Z'), expected: (86400 * 3) },
       { now: new Date('2017-04-29T00:00:00.000Z'), expected: (86400 * 2) },
       { now: new Date('2017-04-30T00:00:00.000Z'), expected: (86400 * 1) }
     ];

     testCases.forEach((test) => {
       it(`should return ${test.expected} seconds in the day for date ${test.now.toISOString()}`, () => {
         expect(dateUtils.secondsRemainingInWeek(test.now)).to.equal(test.expected);
       });
     });
   });

   context('secondsRemainingInMonth', () => {
     const testCases = [
       { now: new Date('2017-03-25T00:00:00.000Z'), expected: 86400 * 7 },
       { now: new Date('2017-03-25T00:00:00.001Z'), expected: (86400 * 7) - 1 },
       { now: new Date('2017-03-26T00:00:00.000Z'), expected: (86400 * 6) },
       { now: new Date('2017-03-27T00:00:00.000Z'), expected: (86400 * 5) },
       { now: new Date('2017-03-28T00:00:00.000Z'), expected: (86400 * 4) },
       { now: new Date('2017-03-29T00:00:00.000Z'), expected: (86400 * 3) },
       { now: new Date('2017-03-30T00:00:00.000Z'), expected: (86400 * 2) },
       { now: new Date('2017-03-31T00:00:00.000Z'), expected: (86400 * 1) },
       { now: new Date('2016-12-31T23:59:59.000Z'), expected: 1 },
     ];

     testCases.forEach((test) => {
       it(`should return ${test.expected} seconds in the day for date ${test.now.toISOString()}`, () => {
         expect(dateUtils.secondsRemainingInMonth(test.now)).to.equal(test.expected);
       });
     });
   });
 });
