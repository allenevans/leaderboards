/*
 * File         :   valueTypeValidate.js
 * Description  :   Validate that the value passed belongs to the enum type.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const valueTypeValidate = (EnumType) =>
        (value) => EnumType.parse(value) !== undefined;

module.exports = valueTypeValidate;
