/*
*   Warning: All parser tests assume that lexer tests already successfully complete.
*/

var test = require('tape');

var Lexer = require('../../lexer');
var Parser = require('../../parser');

var {ProgramNode, CodeBlockNode, VariableDeclarationNode, IdentifierNode, TypeNode, AdditionNode, IntLiteralNode} = require('../../ast_nodes');

var testVariableDeclarations = test('Parser.parse: variable declarations', function(assert) {

    var computedAST, expectedAST;

    try {
        computedAST = Parser.parse(Lexer.tokenize('def x:int = 1+2;'));
        expectedAST = new ProgramNode(1);
        expectedAST.setCode(new CodeBlockNode(1));
        expectedAST.code.addStatement(new VariableDeclarationNode(1));
        expectedAST.code.statements[0].setIdentifier(new IdentifierNode(1, "x"));
        expectedAST.code.statements[0].setType(new TypeNode(1, "int"));
        expectedAST.code.statements[0].setExpression(new AdditionNode(1));
        expectedAST.code.statements[0].expressionNode.setLeftOperand(new IntLiteralNode(1, "1"));
        expectedAST.code.statements[0].expressionNode.setRightOperand(new IntLiteralNode(1, "2"));
        assert.deepEqual(computedAST, expectedAST, "Simple int variable declaration.");
    } catch(e) {
        console.log(e.toString());
    }


    assert.end();

});

module.exports = testVariableDeclarations;
