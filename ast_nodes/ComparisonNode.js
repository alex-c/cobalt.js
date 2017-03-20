var BinaryExpressionNode = require('./BinaryExpressionNode');

/**
*   <p>Node representing an comparison.</p>
*
*   @extends {BinaryExpressionNode}
*   @param {Number} line     The line from which the corresponding code is.
*   @param {String} operator The comparison operator.
*/
function ComparisonNode(line, operator) {

    BinaryExpressionNode.call(this, line, "Comparison");

    /** The comparison operator: 'equal', 'notequal', 'greater', 'greaterequal', 'less' or 'lessequal'. */
    this.operator = operator;

};
ComparisonNode.prototype = Object.create(BinaryExpressionNode.prototype);
ComparisonNode.prototype.constructor = ComparisonNode;

/**
*   <p>Returns a string representation of the node.</p>
*
*   @return {String} The info string.
*/
ComparisonNode.prototype.toString = function() {
    return(this.type+"["+this.operator+"]("+this.left.toString()+","+this.right.toString()+")");
};

module.exports = ComparisonNode;
