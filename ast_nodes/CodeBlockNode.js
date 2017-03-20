var {CompilerError, CobaltTypeError} = require('../errors');
var ASTNode = require('./ASTNode');
var StatementNode = require('./StatementNode');
//var SymbolTable = require('./SymbolTable');

/**
*   <p>A node representing a code block, which defines a scope.</p>
*
*   @extends {ASTNode}
*   @param {Number} line    The source code line where the code block starts.
*/
function CodeBlockNode(line) {

    ASTNode.call(this, line, "CodeBlock");

    /** Statement list. Elements should be of type {StatementNode}. */
    this.statements = [];

    /** A code block defines a scope. */
    this.definesScope = true;
    this.symbolTable = [];//new SymbolTable();

};
CodeBlockNode.prototype = Object.create(ASTNode.prototype);
CodeBlockNode.prototype.constructor = CodeBlockNode;

/**
*   <p>Adds a statement to the program node.</p>
*
*   @param {ASTNode} node The node to add.
*   @throws {CompilerError}
*/
CodeBlockNode.prototype.addStatement = function(node) {
    if(node instanceof StatementNode) {
        this.statements.push(node);
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to push something to code block statements that is not a statement node.", "CodeBlockNode", "addStatement");
    }
};

/*
*   <p>Performs type checking.</p>
*
*   @throws {TypeError}
*
CodeBlockNode.prototype.typeCheck = function() {
    for(var i=0; i<this.statements.length; i++) {
        this.statements[i].typeCheck();
    }
};*/

/**
*   <p>Returns a string representation of the code block.</p>
*
*   @return {String} CodeBlockNode represented as a string.
*/
CodeBlockNode.prototype.toString = function() {
    var output = "CodeBlock{";
    for(var i=0; i<this.statements.length; i++) {
        output += this.statements[i].toString();
        if(i < this.statements.length-1) {
            output += ",\n"
        }
    }
    output += "}";
    return(output);
};

module.exports = CodeBlockNode;
