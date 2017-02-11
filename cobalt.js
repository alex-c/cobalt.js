var {CompilerError} = require('./errors');

/**
*   <p>A Cobalt to JavaScript transpiler.</p>
*
*   @author ALexandre Charoy
*   @version 0.0.1 WIP
*/
function Cobalt() {

    var Lexer = require('./lexer');
    //var Parser = require('./parser');

    /**
    *   <p>Translates a string of Cobalt code to JavaScript code.</p>
    *
    *   @param {String} code    Cobalt code.
    *   @return {String}        JavaScript code.
    */
    this.js = function(code) {
        try {
            var tokens = Lexer.tokenize(code);
            return(tokens);
        } catch(error) {
            return(error);
        }
    };

};

module.exports = new Cobalt();
