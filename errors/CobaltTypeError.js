var CobaltError = require('./CobaltError');

/**
*   <p>Cobalt type error.</p>
*
*   @extends {CobaltError}
*   @param {Number} line    The source code line at which the error is located.
*   @param {String} message A message to pass along.
*/
function CobaltTypeError(line, message) {

    CobaltError.call(this, line, message);
    this.errorType = "type error";

};
CobaltTypeError.prototype = Object.create(CobaltError.prototype);
CobaltTypeError.prototype.constructor = CobaltTypeError;

module.exports = CobaltTypeError;
