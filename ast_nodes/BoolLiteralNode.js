var LiteralNode = require('./LiteralNode');

/**
*   <p>AST node representing an boolean literal.</p>
*
*   @extends {LiteralNode}
*   @param {Number} line  The line from which the corresponding code is.
*   @param {String} value The integer value.
*/
function BoolLiteralNode(line, value) {

    LiteralNode.call(this, line, "BoolLiteral");

    /** The boolean value - either 'true' or 'false'. */
    this.value = value;

};
BoolLiteralNode.prototype = Object.create(LiteralNode.prototype);
BoolLiteralNode.prototype.constructor = BoolLiteralNode;

/**
*   <p>Returns node information as a string.</p>
*
*   @return {String} The info string.
*/
BoolLiteralNode.prototype.toString = function() {
    return("("+this.type+":"+this.value+")");
};

module.exports = BoolLiteralNode;
