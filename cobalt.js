/**
*   <p>A Cobalt-to-JavaScript transpiler.</p>
*   <p>This version of cobalt.js targets Cobalt version 0.1.</p>
*   <p>Language specification: http://alex-c.github.io/cobalt-specification</p>
*
*   @author ALexandre Charoy
*   @version 0.0.1 WIP
*/
function Cobalt() {

    //Load components
    var Lexer = require('./lexer');
    var Parser = require('./parser');

    /**
    *   <p>Translates a string of Cobalt code to JavaScript code.</p>
    *
    *   @param {String} code           Input Cobalt code.
    *   @return {String}               Generated JavaScript code.
    *   @throws {CompilerError}        A CompilerError is thrown when an internal error is encountered. This should not happen.
    *   @throws {CobaltSyntaxError}    A CobaltSyntaxError is thrown when the input program is not valid Cobalt syntax. Syntax errors can be detected during lexical analysis and parsing.
    *   @throws {CobaltTypeError}      A CobaltTypeError is thrown when there are type missmatches. Typing errors are detected during semantic analysis.
    *   @throws {CobaltReferenceError} A CobaltReferenceError is thrown when variables are being used, that have not previously been declared or instantiated.
    */
    this.js = function(code) {
        try {
            //Front end
            var tokens = Lexer.tokenize(code);
            var AST = Parser.parse(tokens);
            return(AST);
            //AST.typeCheck();
            //Middle end
            //AST = ?.optimize(AST);
            //Back end
            //var code = ?.generate(AST);
            //return(code);
        } catch(error) {
            return(error);
        }
    };

};

module.exports = new Cobalt();
