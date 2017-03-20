var UnaryExpressionNode = require('./UnaryExpressionNode');

/**
*   <p>Node representing an arithmetic negation.</p>
*
*   @extends {UnaryExpressionNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function ArithmeticNegationNode(line) {

    UnaryExpressionNode.call(this, line, "ArithmeticNegation");

};
ArithmeticNegationNode.prototype = Object.create(UnaryExpressionNode.prototype);
ArithmeticNegationNode.prototype.constructor = ArithmeticNegationNode;

module.exports = ArithmeticNegationNode;
