var ASTNode = require('./ASTNode');
var ExpressionNode = require('./ExpressionNode');

/**
*   <p>Node representing a binary expression.</p>
*
*   @extends {ExpressionNode}
*   @param {Number} line The line from which the corresponding code is.
*   @param {String} type The expression type.
*/
function BinaryExpressionNode(line, type) {

    ExpressionNode.call(this, line, type);

    /** Left branch of the node. */
    this.left;

    /** Right branch of the node. */
    this.right;


};
BinaryExpressionNode.prototype = Object.create(ExpressionNode.prototype);
BinaryExpressionNode.prototype.constructor = BinaryExpressionNode;

/**
*   <p>Sets the left operand of the expression.</p>
*
*   @param {ASTNode} node  The operand node.
*   @throws {CompilerError}
*/
BinaryExpressionNode.prototype.setLeftOperand = function(node) {
    if(node instanceof ASTNode) {
        this.left = node;
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to set something as operand, that is not an AST node.", "BinaryExpressionNode", "setLeftOperand");
    }
};

/**
*   <p>Sets the right operand of the expression.</p>
*
*   @param {ASTNode} node  The operand node.
*   @throws {CompilerError}
*/
BinaryExpressionNode.prototype.setRightOperand = function(node) {
    if(node instanceof ASTNode) {
        this.right = node;
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to set something as operand, that is not an AST node.", "BinaryExpressionNode", "setRightOperand");
    }
};

/**
*   <p>Returns a string representation of the node.</p>
*
*   @return {String} The info string.
*/
BinaryExpressionNode.prototype.toString = function() {
    return(this.type+"("+this.left.toString()+","+this.right.toString()+")");
};


module.exports = BinaryExpressionNode;
