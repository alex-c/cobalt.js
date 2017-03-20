var {CompilerError} = require('../errors');
var ASTNode = require('./ASTNode');
var CodeBlockNode = require('./CodeBlockNode');

/**
*   <p>AST node representing a Cobalt program.</p>
*
*   @extends {ASTNode}
*/
function ProgramNode() {

    ASTNode.call(this, 0, "Program");

    /** The program code - should be of type {CodeBlockNode}. */
    this.code;

};
ProgramNode.prototype = Object.create(ASTNode.prototype);
ProgramNode.prototype.constructor = ProgramNode;

/**
*   <p>Sets the program's code.</p>
*
*   @param {CodeBlockNode} node Code block node of the main program.
*   @throws {CompilerError}
*/
ProgramNode.prototype.setCode = function(node) {
    if(node instanceof CodeBlockNode) {
        this.code = node;
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to set something as program code that is not a code block node.", "ProgramNode", "setCode");
    }
};

/**
*   <p>Returns a string representation of the program.</p>
*
*   @return {String} ProgramNode represented as a string.
*/
ProgramNode.prototype.toString = function() {
    return(this.type+":"+this.code.toString());
};

module.exports = ProgramNode;
