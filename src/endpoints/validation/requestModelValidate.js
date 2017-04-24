
 /*
 * File         :   requestModelValidate.js
 * Description  :   Request model validation function.
* -------------------------------------------------------------------------------------------------------------------------------------- */

 /**
  * Get a method that can validate the data matches the rules defined for a request model.
  * @param Model Model class e.g. GamePostRequest
  * @param rules Array of validation rules e.g.
  * {
  *   field: 'name',
  *   validate: gameNameValidate,
  *   optional: false
  * }
  */
 module.exports = (Model, rules) => (data) => Object.keys(new Model())
   .filter(
     (key) => {
       const rule = rules.filter((rule) => rule.field === key)[0];

       return rule && (
           (!rule.optional && (data[key] === null || data[key] === undefined)) ||
           (data[key] !== null && !rule.validate(data[key]))
         );
     }
   );
