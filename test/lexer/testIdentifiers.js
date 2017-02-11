var test = require('tape');

var Lexer = require('../../lexer');
var {SyntaxError} = require('../../errors');

var testIdentifiers = test('Lexer.tokenize: identifiers', function(assert) {

    var computedTokens, expectedTokens, fn;

    //Case: letters only
    computedTokens = Lexer.tokenize('abc ');
    expectedTokens = [
        {line: 1, type: 'identifier', value: 'abc'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Identifier: letters only");

    //Case: letters and numbers
    computedTokens = Lexer.tokenize('var1 var123var ');
    expectedTokens = [
        {line: 1, type: 'identifier', value: 'var1'},
        {line: 1, type: 'identifier', value: 'var123var'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Identifier: letters and numbers");

    //Case: letters, numbers and underlines
    computedTokens = Lexer.tokenize('var_1 var_123_var_ ');
    expectedTokens = [
        {line: 1, type: 'identifier', value: 'var_1'},
        {line: 1, type: 'identifier', value: 'var_123_var_'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Identifier: letters, numbers and underlines");

    //Case: identifiers can't start with numbers
    fn = function() {
        Lexer.tokenize('1var ');
    };
    assert.throws(fn, SyntaxError, "Identifier: cannot start with number");

    //Case: identifiers can't start with underlines
    fn = function() {
        Lexer.tokenize('_1var ');
    };
    assert.throws(fn, SyntaxError, "Identifier: cannot start with underline");

    //Case: forbiden char
    fn = function() {
        Lexer.tokenize('var%t ');
    };
    assert.throws(fn, SyntaxError, "Identifier: forbidden char");

    assert.end();

});

module.exports = testIdentifiers;
