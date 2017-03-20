var BinaryExpressionNode = require('./BinaryExpressionNode');

/**
*   <p>Node representing an substraction.</p>
*
*   @extends {BinaryExpressionNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function SubstractionNode(line) {

    BinaryExpressionNode.call(this, line, "Substraction");

};
SubstractionNode.prototype = Object.create(BinaryExpressionNode.prototype);
SubstractionNode.prototype.constructor = SubstractionNode;

module.exports = SubstractionNode;
