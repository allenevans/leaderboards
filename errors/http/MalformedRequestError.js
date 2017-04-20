/*
 * File         :   MalformedRequestError.js
 * Description  :   Error to use when a request is not correctly formed.
 * ------------------------------------------------------------------------------------------------ */
 class MalformedRequestError extends Error {
   constructor(fields, ...args) {
     super(...args);
     Error.captureStackTrace(this, MalformedRequestError);

     this.status = 400;
     this.fields = fields;
   }
 }

 module.exports = MalformedRequestError;
