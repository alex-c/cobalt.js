var ASTNode = require('./ASTNode');

/**
*   <p>Base object for expression nodes.</p>
*
*   @extends {ASTNode}
*   @param {Number} line The line from which the corresponding code is.
*   @param {String} type The expression type.
*/
function ExpressionNode(line, type) {

    ASTNode.call(this, line, type);

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
