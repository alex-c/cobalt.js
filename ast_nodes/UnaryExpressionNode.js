var ExpressionNode = require('./ExpressionNode');

/**
*   <p>Node representing a binary expression.</p>
*
*   @extends {ExpressionNode}
*   @param {Number} line The line from which the corresponding code is.
*   @param {String} type The expression type.
*/
function UnaryExpressionNode(line, type) {

    ExpressionNode.call(this, line, type);

    /** The operand of the node. */
    this.operand;


};
UnaryExpressionNode.prototype = Object.create(ExpressionNode.prototype);
UnaryExpressionNode.prototype.constructor = UnaryExpressionNode;

/**
*   <p>Sets the operand of the expression.</p>
*
*   @param {ASTNode} node  The operand node.
*   @throws {CompilerError}
*/
UnaryExpressionNode.prototype.setOperand = function(node) {
    if(node instanceof ASTNode) {
        this.left = node;
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to set something as operand, that is not an AST node.", "UnaryExpressionNode", "setOperand");
    }
};

/**
*   <p>Returns a string representation of the node.</p>
*
*   @return {String} The info string.
*/
UnaryExpressionNode.prototype.toString = function() {
    return(this.type+"("+this.operand.toString()+")");
};


module.exports = UnaryExpressionNode;
