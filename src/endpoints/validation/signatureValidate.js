/*
 * File         :   signatureValidate.js
 * Description  :   Request model validation function that validates the checksum signature against the model.
 *                  Both _signed_ and _to
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const checksum = require('../../utils/checksum');

const signatureValidate = (value, model, req) => {
  if (!value || !model) { return false; }

  const filtered = Object.assign({}, model);
  delete filtered._signed_;

  return model._signed_ === checksum(filtered, (req.session || {}).token);
};

module.exports = signatureValidate;
