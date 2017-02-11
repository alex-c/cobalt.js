var test = require('tape');

var Lexer = require('../../lexer');

var testNewLines = test('Lexer.tokenize: new lines', function(assert) {

    var computedTokens, expectedTokens, fn;

    //Case: \n new lines
    computedTokens = Lexer.tokenize('\n\n;');
    expectedTokens = [
        {line: 3, type: 'semicolon'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "\\n new lines");

    //Case: \r new lines
    computedTokens = Lexer.tokenize('\r\r;');
    expectedTokens = [
        {line: 3, type: 'semicolon'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "\\r new lines");

    //Case: \r\n new lines
    computedTokens = Lexer.tokenize('\r\n\r\n;');
    expectedTokens = [
        {line: 3, type: 'semicolon'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "\\r\\n new lines");

    assert.end();

});

module.exports = testNewLines;
