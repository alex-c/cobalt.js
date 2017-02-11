var test = require('tape');

var Lexer = require('../../lexer');

var testOperators = test('Lexer.tokenize: operators', function(assert) {

    var computedTokens, expectedTokens;

    //Case: logical operators
    computedTokens = Lexer.tokenize('&|!');
    expectedTokens = [
        {line: 1, type: 'and'},
        {line: 1, type: 'or'},
        {line: 1, type: 'not'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Logical operators");

    //Case: comparison operators
    computedTokens = Lexer.tokenize('=<>');
    expectedTokens = [
        {line: 1, type: 'equal'},
        {line: 1, type: 'less'},
        {line: 1, type: 'greater'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Comparison operators");

    //Case: arithmetic operators
    computedTokens = Lexer.tokenize('+-*/ ');
    expectedTokens = [
        {line: 1, type: 'plus'},
        {line: 1, type: 'minus'},
        {line: 1, type: 'multiply'},
        {line: 1, type: 'divide'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Arithmetic operators");

    //Case: minus sign
    computedTokens = Lexer.tokenize('~');
    expectedTokens = [
        {line: 1, type: 'tilde'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Minus sign");

    assert.end();

});

module.exports = testOperators;
