var ASTNode = require('./ASTNode');

/**
*   <p>AST node representing a literal.</p>
*
*   @extends {ASTNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function LiteralNode(line, type) {

    ASTNode.call(this, line, type);

};
LiteralNode.prototype = Object.create(ASTNode.prototype);
LiteralNode.prototype.constructor = LiteralNode;

/**
*   <p>Returns node information as a string.</p>
*
*   @return {String} The info string.
*/
LiteralNode.prototype.toString = function() {
    return("("+this.type+")");
};

module.exports = LiteralNode;
