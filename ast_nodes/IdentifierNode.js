var ASTNode = require('./ASTNode');

/**
*   <p>Identifier node for building the AST.</p>
*
*   @extends {ASTNode}
*   @param {Number} line The line from which the corresponding code is.
*   @param {String} name The identifier name.
*/
function IdentifierNode(line, name) {

    ASTNode.call(this, line, "Identifier");

    /** The variable name. */
    this.name = name;

};
IdentifierNode.prototype = Object.create(ASTNode.prototype);
IdentifierNode.prototype.constructor = IdentifierNode;

/**
*   <p>Returns a string representation of the node.</p>
*
*   @return {String} The info string.
*/
IdentifierNode.prototype.toString = function() {
    return("("+this.type+"["+this.name+"]"+":"+this.line+")");
};

module.exports = IdentifierNode;
