var CompilerError = require('../errors/CompilerError');
var StatementNode = require('./StatementNode');
var IdentifierNode = require('./IdentifierNode');
var ExpressionNode = require('./ExpressionNode');

/**
*  <p>Assignment statment node for building the AST.</p>
*
*   @extends {StatementNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function AssignmentNode(line) {

    StatementNode.call(this, line, "Assignment");

    /** The identifier being declared. */
    this.identifierNode;

    /** Node representing the assigned expression. */
    this.expressionNode;

};
AssignmentNode.prototype = Object.create(StatementNode.prototype);
AssignmentNode.prototype.constructor = AssignmentNode;

/**
*   <p>Assigns an identifier node to the statement.</p>
*
*   @param {IdentifierNode} node  The identifier node.
*   @throws {CompilerError}
*/
AssignmentNode.prototype.setIdentifier = function(node) {
    if(node instanceof IdentifierNode) {
        this.identifierNode = node;
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to set something as identifier that is not an identifier node.", "AssignmentNode", "setIdentifier");
    }
};

/**
*   <p>Assigns an expression node to the statement.</p>
*
*   @param {ExpressionNode} node  The expression node.
*   @throws {CompilerError}
*/
AssignmentNode.prototype.setExpression = function(node) {
    if(node instanceof ExpressionNode) {
        this.expressionNode = node;
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to set something as expression that is not an expression node.", "AssignmentNode", "setExpression");
    }
};

/**
*   <p>Returns node information as a string.</p>
*
*   @return {String} The info string.
*/
AssignmentNode.prototype.toString = function() {
    return("Assignement["+this.identifierNode.name+"]="+this.expressionNode.toString());
};

module.exports = AssignmentNode;
