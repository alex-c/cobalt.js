var BinaryExpressionNode = require('./BinaryExpressionNode');

/**
*   <p>Node representing an addition.</p>
*
*   @extends {BinaryExpressionNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function AdditionNode(line) {

    BinaryExpressionNode.call(this, line, "Addition");

};
AdditionNode.prototype = Object.create(BinaryExpressionNode.prototype);
AdditionNode.prototype.constructor = AdditionNode;

module.exports = AdditionNode;
