
 /*
 * File         :   dateUtils.js
 * Description  :   Date utilities.
* -------------------------------------------------------------------------------------------------------------------------------------- */
 const ONE_DAY_MS = 1000 * 60 * 60 * 24;
 const ONE_SECOND_MS = 1000;
 const SECONDS_PER_DAY = 60 * 60 * 24;

 /**
  * Return the number of seconds remaining in the day.
  * @param date
  */
 const secondsRemainingInDay = (date) => {
   const now = date.valueOf();
   const tomorrow = now - (now % (ONE_DAY_MS)) + ONE_DAY_MS;

   return Math.floor((tomorrow - now) / ONE_SECOND_MS);
 };

 /**
  * Return the number of seconds remaining in the week.
  * @param date
  */
 const secondsRemainingInWeek = (date) => {
   const daysLeftInWeek = 7 - (new Date(date).getDay() || 7); // assumes monday is start of week
   return (daysLeftInWeek * SECONDS_PER_DAY) + secondsRemainingInDay(date);
 };

 /**
  * Return the number of seconds remaining in the month.
  * @param date
  */
 const secondsRemainingInMonth = (date) => {
   const now = new Date(date);
   const daysLeftInMonth = (new Date(now.getYear(), now.getMonth() + 1, 0).getDate()) - now.getDate();
   return (daysLeftInMonth * SECONDS_PER_DAY) + secondsRemainingInDay(now);
 };

 module.exports = {
   secondsRemainingInDay,
   secondsRemainingInWeek,
   secondsRemainingInMonth
 };
