var BinaryExpressionNode = require('./BinaryExpressionNode');

/**
*   <p>Node representing a logical or.</p>
*
*   @extends {BinaryExpressionNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function LogicalOrNode(line) {

    BinaryExpressionNode.call(this, line, "LogicalOr");

};
LogicalOrNode.prototype = Object.create(BinaryExpressionNode.prototype);
LogicalOrNode.prototype.constructor = LogicalOrNode;

module.exports = LogicalOrNode;
