/**
*   <p>Base error object for Cobalt program errors.</p>
*
*   @param {Number} line    The source code line at which the error is located.
*   @param {String} message A message to pass along.
*/
function CobaltError(line, message) {

    this.errorType = "error";
    this.line = line;
    this.message = message;

};

/**
*   <p>Returns relevant error information as a string.</p>
*
*   @return {String} The info string.
*/
CobaltError.prototype.toString = function () {
    return("Cobalt "+this.errorType+" at line "+this.line+": "+this.message);
};

module.exports = CobaltError;
