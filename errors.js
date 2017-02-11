/**
*   Base error object for cobalt.js.
*
*   @param {String} message A message to pass along.
*/
function CobaltError(message) {

    var message = message;

    /**
    *   Returns relevant error information as a string.
    *
    *   @return {String} The info string.
    */
    this.toString = function () {
        return("Cobalt error: "+message);
    };

};

/**
*   Compiler error. This should not happen.
*
*   @extends {CobaltError}
*   @param {String} message     A message to pass along.
*   @param {String} _module     Module the error was thrown in.
*   @param {String} _function   The function the error was thrown in.
*/
function CompilerError(message, _module, _function) {

    CobaltError.call(this, message);

    var _module = _module;
    var _function = _function;

    /**
    *   Returns relevant error information as a string.
    *
    *   @return {String} The info string.
    */
    this.toString = function () {
        return("Cobalt compiler error ["+_module+"/"+_function+"]: "+message);
    };

};
CompilerError.prototype = Object.create(CobaltError.prototype);
CompilerError.prototype.constructor = CompilerError;

/**
*   Cobalt syntax error.
*
*   @extends {CobaltError}
*   @param {String} message     A message to pass along.
*   @param {Number} line        Code line where the error happened.
*/
function SyntaxError(line, message) {

    CobaltError.call(this, message);

    var line = line;

    /**
    *   Returns relevant error information as a string.
    *
    *   @return {String} The info string.
    */
    this.toString = function () {
        return("Cobalt syntax error at line "+line+": "+message);
    };

};
SyntaxError.prototype = Object.create(CobaltError.prototype);
SyntaxError.prototype.constructor = SyntaxError;

module.exports = {
    CobaltError: CobaltError,
    CompilerError: CompilerError,
    SyntaxError: SyntaxError
}
