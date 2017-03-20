var LiteralNode = require('./LiteralNode');

/**
*   <p>AST node representing an integer literal.</p>
*
*   @extends {LiteralNode}
*   @param {Number} line  The line from which the corresponding code is.
*   @param {String} value The integer value.
*/
function IntLiteralNode(line, value) {

    LiteralNode.call(this, line, "IntLiteral");

    /** The integer value. */
    this.value = value;

};
IntLiteralNode.prototype = Object.create(LiteralNode.prototype);
IntLiteralNode.prototype.constructor = IntLiteralNode;

/**
*   <p>Returns node information as a string.</p>
*
*   @return {String} The info string.
*/
IntLiteralNode.prototype.toString = function() {
    return("("+this.type+":"+this.value+")");
};

module.exports = IntLiteralNode;
