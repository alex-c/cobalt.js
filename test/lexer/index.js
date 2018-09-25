var lexerTests = {
    testWhitespace: require('./testWhitespace'),
    testNewLines: require('./testNewLines'),
    testOperators: require('./testOperators'),
    testDelimiters: require('./testDelimiters'),
    testTypes: require('./testTypes'),
    testKeywords: require('./testKeywords'),
    testIdentifiers: require('./testIdentifiers'),
    testLiterals: require('./testLiterals'),
    testComments: require('./testComments')
}

module.exports = lexerTests;
