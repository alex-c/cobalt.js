var CobaltError = require('./CobaltError');

/**
*   <p>Cobalt reference error.</p>
*
*   @extends {CobaltError}
*   @param {Number} line    The source code line at which the error is located.
*   @param {String} message A message to pass along.
*/
function CobaltReferenceError(line, message) {

    CobaltError.call(this, line, message);
    this.errorType = "reference error";

};
CobaltReferenceError.prototype = Object.create(CobaltError.prototype);
CobaltReferenceError.prototype.constructor = CobaltReferenceError;

module.exports = CobaltReferenceError;
