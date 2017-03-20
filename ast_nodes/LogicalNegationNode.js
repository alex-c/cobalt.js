var UnaryExpressionNode = require('./UnaryExpressionNode');

/**
*   <p>Node representing a logical negation.</p>
*
*   @extends {UnaryExpressionNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function LogicalNegationNode(line) {

    UnaryExpressionNode.call(this, line, "LogicalNegation");

};
LogicalNegationNode.prototype = Object.create(UnaryExpressionNode.prototype);
LogicalNegationNode.prototype.constructor = LogicalNegationNode;

module.exports = LogicalNegationNode;
