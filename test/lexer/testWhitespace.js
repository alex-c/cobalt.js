var test = require('tape');

var Lexer = require('../../lexer');

var testWhitespace = test('Lexer.tokenize: whitespace', function(assert) {

    var computedTokens, expectedTokens;

    //Case: ignore whitespace
    computedTokens = Lexer.tokenize('  \t\t \t  ; \t    \t');
    expectedTokens = [
        {line: 1, type: 'semicolon'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Ignore whitespace");

    assert.end();

});

module.exports = testWhitespace;
