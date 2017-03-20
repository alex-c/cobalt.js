var ASTNode = require('./ASTNode');

/**
*   <p>Node representing an expression.</p>
*
*   @extends {ASTNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function ExpressionNode(line, name) {

    ASTNode.call(this, line, "Expression");

};
ExpressionNode.prototype = Object.create(ASTNode.prototype);
ExpressionNode.prototype.constructor = ExpressionNode;

/**
*   <p>Returns a string representation of the node.</p>
*
*   @return {String} The info string.
*/
ExpressionNode.prototype.toString = function() {
    return("("+this.type+")");
};


module.exports = ExpressionNode;
