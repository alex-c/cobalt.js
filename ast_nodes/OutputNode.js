var CompilerError = require('../errors/CompilerError');
var StatementNode = require('./StatementNode');
var ExpressionNode = require('./ExpressionNode');

/**
*  <p>Output statment node for building the AST.</p>
*
*   @extends {StatementNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function OutputNode(line) {

    StatementNode.call(this, line, "Output");

    /** Node representing the expression, from which the output value will be evaluated. */
    this.expressionNode;

};
OutputNode.prototype = Object.create(StatementNode.prototype);
OutputNode.prototype.constructor = OutputNode;

/**
*   <p>Assigns an expression node to the statement.</p>
*
*   @param {ExpressionNode} node  The expression node.
*   @throws {CompilerError}
*/
OutputNode.prototype.setExpression = function(node) {
    if(node instanceof ExpressionNode) {
        this.expressionNode = node;
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to set something as expression that is not an expression node.", "OutputNode", "setExpression");
    }
};

/**
*   <p>Returns node information as a string.</p>
*
*   @return {String} The info string.
*/
OutputNode.prototype.toString = function() {
    return("Output:"+this.expressionNode.toString());
};

module.exports = OutputNode;
