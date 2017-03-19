/**
*   <p>Compiler error. This error is thrown if something interal goes wrong.</p>
*
*   @param {String} message     A message to pass along.
*   @param {String} _module     Module the error was thrown in.
*   @param {String} _function   The function the error was thrown in.
*/
function CompilerError(message, _module, _function) {

    this.message = message;
    this._module = _module;
    this._function = _function;

};

/**
*   <p>Returns relevant error information as a string.</p>
*
*   @return {String} The info string.
*/
CompilerError.prototype.toString = function () {
    return("Compiler error ["+this._module+"/"+this._function+"]: "+this.message);
};

module.exports = CompilerError;
