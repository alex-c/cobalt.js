var ASTNode = require('./ASTNode');

/**
*  <p>Base node for all statements.</p>
*
*   @extends {ASTNode}
*   @param {Number} line The line from which the corresponding code is.
*   @param {String} type The node type.
*/
function StatementNode(line, type) {

    ASTNode.call(this, line, type);

};
StatementNode.prototype = Object.create(ASTNode.prototype);
StatementNode.prototype.constructor = StatementNode;

module.exports = StatementNode;
