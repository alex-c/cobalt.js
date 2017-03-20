var CompilerError = require('../errors/CompilerError');
var StatementNode = require('./StatementNode');
var IdentifierNode = require('./IdentifierNode');
var TypeNode = require('./TypeNode');
var ExpressionNode = require('./ExpressionNode');

/**
*  <p>Variable declaration node for building the AST.</p>
*
*   @extends {StatementNode}
*   @param {Number} line The line from which the corresponding code is.
*/
function VariableDeclarationNode(line) {

    StatementNode.call(this, line, "VariableDeclaration");

    /** The identifier being declared. */
    this.identifierNode;

    /** Type node. Only set when the declaration includes an explicit type. */
    this.typeNode;

    /** Expression node. Only set when the declaration includes an expression. */
    this.expressionNode;

};
VariableDeclarationNode.prototype = Object.create(StatementNode.prototype);
VariableDeclarationNode.prototype.constructor = VariableDeclarationNode;

/**
*   <p>Assigns an identifier node to the declaration.</p>
*
*   @param {IdentifierNode} node  The identifier node.
*   @throws {CompilerError}
*/
VariableDeclarationNode.prototype.setIdentifier = function(node) {
    if(node instanceof IdentifierNode) {
        this.identifierNode = node;
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to set something as identifier that is not an identifier node.", "VariableDeclarationNode", "setIdentifier");
    }
};

/**
*   <p>Assigns a type node to the declaration.</p>
*
*   @param {TypeNode} node  The type node.
*   @throws {CompilerError}
*/
VariableDeclarationNode.prototype.setType = function(node) {
    if(node instanceof TypeNode) {
        this.typeNode = node;
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to set something as type that is not a type node.", "VariableDeclarationNode", "setType");
    }
};

/**
*   <p>Assigns an expression node to the declaration.</p>
*
*   @param {ExpressionNode} node  The expression node.
*   @throws {CompilerError}
*/
VariableDeclarationNode.prototype.setExpression = function(node) {
    if(node instanceof ExpressionNode) {
        this.expressionNode = node;
        node.setParent(this);
    } else {
        throw new CompilerError("Attempted to set something as expression that is not an expression node.", "VariableDeclarationNode", "setExpression");
    }
};

/*
*   <p>Performs type checking.</p>
*   <p>In case of successful type checking, the new symbol is registered int he local scope.</p>
*
*   @throws {TypeError}     Thrown in case of type missmatch.
*   @throws {CompilerError}
*
VariableDeclarationNode.prototype.typeCheck = function() {
    if(this.typeNode && this.expressionNode) {
        if(this.typeNode.getType() == this.expressionNode.getType()) {
            this.registerSymbol(this.identifierNode.name, this.typeNode.getType());
        } else {
            throw new TypeError(this.line, "Type missmatch in variable declaration: "+this.getType()+" expected, but "+this.expression.getType()+" assigned.");
        }
    } else if(this.typeNode) {
        this.registerSymbol(this.identifierNode.name, this.typeNode.getType());
    } else if(this.expressionNode) {
        this.registerSymbol(this.identifierNode.name, this.expressionNode.getType());
    } else {
        throw new CompilerError("Variable declaration has no explicit type, nor an expression from which to infer type.", "VariableDeclarationNode", "typeCheck");
    }
};*/

/**
*   <p>Returns node information as a string.</p>
*
*   @return {String} The info string.
*/
VariableDeclarationNode.prototype.toString = function() {
    var output = "VariableDeclaration["+this.identifierNode.name;
    if(this.typeNode) {
        output += ":" + this.typeNode.name;
    }
    output += "]=";
    if(this.expressionNode) {
        output += this.expressionNode.toString();
    }
    return(output);
};

module.exports = VariableDeclarationNode;
