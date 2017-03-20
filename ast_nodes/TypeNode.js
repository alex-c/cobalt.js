var ASTNode = require('./ASTNode');

/**
*   <p>AST node representing a type keywprd.</p>
*
*   @extends {ASTNode}
*   @param {Number} line The line from which the corresponding code is.
*   @param {String} name The type name: 'int' or 'bool'
*/
function TypeNode(line, name) {

    ASTNode.call(this, line, "Type");

    /** The type keywprd, eg. "int". */
    this.name = name;

};
TypeNode.prototype = Object.create(ASTNode.prototype);
TypeNode.prototype.constructor = TypeNode;

/**
*   <p>Returns node information as a string.</p>
*
*   @return {String} The info string.
*/
TypeNode.prototype.toString = function() {
    return("("+this.type+"["+this.name+"]"+":"+this.line+")");
};

module.exports = TypeNode;
