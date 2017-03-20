var BinaryExpressionNode = require('./BinaryExpressionNode');

/**
*   <p>Node representing a logical and.</p>
*
*   @extends {BinaryExpressionNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function LogicalAndNode(line) {

    BinaryExpressionNode.call(this, line, "LogicalAnd");

};
LogicalAndNode.prototype = Object.create(BinaryExpressionNode.prototype);
LogicalAndNode.prototype.constructor = LogicalAndNode;

module.exports = LogicalAndNode;
