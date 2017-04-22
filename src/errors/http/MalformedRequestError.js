/*
 * File         :   MalformedRequestError.js
 * Description  :   Error to use when a request is not correctly formed.
 * ------------------------------------------------------------------------------------------------ */
const HttpError = require('./HttpError');

 class MalformedRequestError extends HttpError {
   constructor(fields, ...args) {
     super(...args);
     Error.captureStackTrace(this, MalformedRequestError);

     this.status = 400;
     this.fields = fields;
   }
 }

 module.exports = MalformedRequestError;
