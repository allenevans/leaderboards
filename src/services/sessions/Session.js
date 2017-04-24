
 /*
 * File         :   Session.js
 * Description  :   A JWT Session class.
* -------------------------------------------------------------------------------------------------------------------------------------- */
 class Session {
   constructor(params) {
     this.boardId = null;
     this.timestamp = null;

     Object.keys(this).forEach((key) => {
       if ((params || {}).hasOwnProperty(key)) {
         this[key] = params[key];
       }
     });
   }
 }

 module.exports = Session;
