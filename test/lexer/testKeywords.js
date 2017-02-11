var test = require('tape');

var Lexer = require('../../lexer');
var {SyntaxError} = require('../../errors');

var testKeywords = test('Lexer.tokenize: other multi-char keywords', function(assert) {

    var computedTokens, expectedTokens, fn;

    //Case: output
    computedTokens = Lexer.tokenize('print ');
    expectedTokens = [
        {line: 1, type: 'output'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Output - 'print' keyword");

    //Case: output
    computedTokens = Lexer.tokenize('def ');
    expectedTokens = [
        {line: 1, type: 'declaration'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Declaration - 'def' keyword");

    assert.end();

});

module.exports = testKeywords;
