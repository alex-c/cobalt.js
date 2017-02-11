var test = require('tape');

var Lexer = require('../../lexer');

var testComments = test('Lexer.tokenize: comments', function(assert) {

    var computedTokens, expectedTokens;

    //Case: eol comments
    computedTokens = Lexer.tokenize('+//blabla\n+');
    expectedTokens = [
        {line: 1, type: 'plus'},
        {line: 2, type: 'plus'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "End-of-line comments");

    assert.end();

});

module.exports = testComments;
