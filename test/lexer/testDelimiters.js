var test = require('tape');

var Lexer = require('../../lexer');

var testDelimiters = test('Lexer.tokenize: other delimiters', function(assert) {

    var computedTokens, expectedTokens;

    //Case: type operator
    computedTokens = Lexer.tokenize(':');
    expectedTokens = [
        {line: 1, type: 'colon'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Type setting operator ':'");

    //Case: semicolon
    computedTokens = Lexer.tokenize(';');
    expectedTokens = [
        {line: 1, type: 'semicolon'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Semicolon");

    //Case: Parentheses
    computedTokens = Lexer.tokenize('()');
    expectedTokens = [
        {line: 1, type: 'lparen'},
        {line: 1, type: 'rparen'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Parantheses");

    assert.end();

});

module.exports = testDelimiters;
