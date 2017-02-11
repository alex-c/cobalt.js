var test = require('tape');

var Lexer = require('../../lexer');
var {SyntaxError} = require('../../errors');

var testLiterals = test('Lexer.tokenize: literals', function(assert) {

    var computedTokens, expectedTokens, fn;

    //Case: bool literals
    computedTokens = Lexer.tokenize('true false ');
    expectedTokens = [
        {line: 1, type: 'literal', subtype:'bool', value: 'true'},
        {line: 1, type: 'literal', subtype:'bool', value: 'false'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Literals: bool literals");

    //Case: int literals
    computedTokens = Lexer.tokenize('12 98127 ');
    expectedTokens = [
        {line: 1, type: 'literal', subtype:'int', value: '12'},
        {line: 1, type: 'literal', subtype:'int', value: '98127'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Literals: valid int literals");

    //Case: int literal with dot
    fn = function() {
        Lexer.tokenize('12.3 ');
    };
    assert.throws(fn, SyntaxError, "Literals: non-valid int literal");

    assert.end();

});

module.exports = testLiterals;
