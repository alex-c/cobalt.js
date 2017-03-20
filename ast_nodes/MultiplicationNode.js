var BinaryExpressionNode = require('./BinaryExpressionNode');

/**
*   <p>Node representing a multiplication.</p>
*
*   @extends {BinaryExpressionNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function MultiplicationNode(line) {

    BinaryExpressionNode.call(this, line, "Multiplication");

};
MultiplicationNode.prototype = Object.create(BinaryExpressionNode.prototype);
MultiplicationNode.prototype.constructor = MultiplicationNode;

module.exports = MultiplicationNode;
