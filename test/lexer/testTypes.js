var test = require('tape');

var Lexer = require('../../lexer');
var {SyntaxError} = require('../../errors');

var testTypes = test('Lexer.tokenize: type keywords', function(assert) {

    var computedTokens, expectedTokens, fn;

    //Case: output
    computedTokens = Lexer.tokenize('int ');
    expectedTokens = [
        {line: 1, type: 'type', subtype: 'int'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Type: int");

    //Case: output
    computedTokens = Lexer.tokenize('bool ');
    expectedTokens = [
        {line: 1, type: 'type', subtype: 'bool'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Type: bool");

    assert.end();

});

module.exports = testTypes;
