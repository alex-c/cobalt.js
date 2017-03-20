var BinaryExpressionNode = require('./BinaryExpressionNode');

/**
*   <p>Node representing an division.</p>
*
*   @extends {BinaryExpressionNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function DivisionNode(line) {

    BinaryExpressionNode.call(this, line, "Division");

};
DivisionNode.prototype = Object.create(BinaryExpressionNode.prototype);
DivisionNode.prototype.constructor = DivisionNode;

module.exports = DivisionNode;
