var CobaltError = require('./CobaltError');

/**
*   <p>Cobalt syntax error.</p>
*
*   @extends {CobaltError}
*   @param {Number} line    The source code line at which the error is located.
*   @param {String} message A message to pass along.
*/
function CobaltSyntaxError(line, message) {

    CobaltError.call(this, line, message);
    this.errorType = "syntax error";

};
CobaltSyntaxError.prototype = Object.create(CobaltError.prototype);
CobaltSyntaxError.prototype.constructor = CobaltSyntaxError;

module.exports = CobaltSyntaxError;
