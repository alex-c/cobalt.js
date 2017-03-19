var {CompilerError, CobaltSyntaxError} = require('./errors');

/**
*   A lexer for the Cobalt programming language.
*/
function Lexer() {

    //A list of keywords that can delimit a word (identifier, literal or keyword).
    var delimiters = [' ','\t','\n','\r',':',';','&','|','!','+','-','*','/','~','=','>','<','(',')'];

    /**
    *   <p>Tokenizes a string of Cobalt code.</p>
    *
    *   @param {String} code    String of Cobalt code.
    *   @return {Array}         Token list.
    *   @throws {CobaltSyntaxError}
    */
    this.tokenize = function(code) {

        //Set up
        var tokens = [];
        var position = 0;
        var line = 1;
        var firstChar;

        //Tokenize
        while(position < code.length) {
            firstChar = code.charAt(position);
            if(firstChar == ' ' || firstChar == '\t') {
                position++;
            } else if(firstChar == '\n' || firstChar == '\r') {
                line++;
                position++;
                if(firstChar == '\r' && code.charAt(position) == '\n') position++;
            } else if(firstChar == ':') {
                tokens.push({type: 'colon', line: line});
                position++;
            } else if(firstChar == ';') {
                tokens.push({type: 'semicolon', line: line});
                position++;
            } else if(firstChar == '&') {
                tokens.push({type: 'and', line: line});
                position++;
            } else if(firstChar == '|') {
                tokens.push({type: 'or', line: line});
                position++;
            } else if(firstChar == '!') {
                tokens.push({type: 'not', line: line});
                position++;
            } else if(firstChar == '=') {
                tokens.push({type: 'equal', line: line});
                position++;
            } else if(firstChar == '>') {
                tokens.push({type: 'greater', line: line});
                position++;
            } else if(firstChar == '<') {
                tokens.push({type: 'less', line: line});
                position++;
            } else if(firstChar == '+') {
                tokens.push({type: 'plus', line: line});
                position++;
            } else if(firstChar == '-') {
                tokens.push({type: 'minus', line: line});
                position++;
            } else if(firstChar == '*') {
                tokens.push({type: 'multiply', line: line});
                position++;
            } else if(firstChar == '/') {
                if(code.charAt(position+1) == '/') {
                    var position = findNext(code, position, ['\n','\r']);
                } else {
                    tokens.push({type: 'divide', line: line});
                    position++;
                }
            } else if(firstChar == '~') {
                tokens.push({type: 'tilde', line: line});
                position++;
            } else if(firstChar == '(') {
                tokens.push({type: 'lparen', line: line});
                position++;
            } else if(firstChar == ')') {
                tokens.push({type: 'rparen', line: line});
                position++;
            } else {
                //Possible tokens left: literal, identifier, multi-letter keyword
                var wordLimit = findNext(code, position, delimiters);
                if(wordLimit > 0) {
                    var word = code.substring(position, wordLimit);
                    if(word == 'def') {
                        tokens.push({type: 'declaration', line: line});
                    } else if(word == 'print') {
                        tokens.push({type: 'output', line: line});
                    } else if(word == 'int') {
                        tokens.push({type: 'type', subtype: 'int', line: line});
                    } else if(word == 'bool') {
                        tokens.push({type: 'type', subtype: 'bool', line: line});
                    } else if(word == 'true') {
                        tokens.push({type: 'literal', subtype: 'bool', value: 'true', line: line});
                    } else if(word == 'false') {
                        tokens.push({type: 'literal', subtype: 'bool', value: 'false', line: line});
                    } else if(!isNaN(word)) {
                        if(word.indexOf('.') == -1) {
                            tokens.push({type: 'literal', subtype: 'int', value: word, line: line});
                        } else {
                            throw new CobaltSyntaxError(line, "Unexpected dot (.). Note that this version of Cobalt does not support floating point numbers.");
                        }
                    } else {
                        if(validIdentifier(word)) {
                            tokens.push({type: 'identifier', value: word, line: line});
                        } else {
                            throw new CobaltSyntaxError(line, "Invalid syntax. Expected identifier.");
                        }
                    }
                    position += word.length;
                } else {
                    throw new CobaltSyntaxError(line, "Unable to find word end. Check wether you are missing a semicolon (;).");
                }
            }
        }

        //Tokenization successful - return token list
        return(tokens);

    };

    /**
    *   <p>Finds the next occurence of one of a set of strings in Cobalt code.</p>
    *   <p>Examples:<br />
    *   - Find end of line: var eol = findNext(code, offset, ['\n','\r']);<br />
    *   - Find end of word: var wordLimit = findNext(code, offset, delimiters);</p>
    *
    *   @private
    *   @param {String} code      The Cobalt code in which to look.
    *   @param {Number} offset    The offset at which to start.
    *   @param {Array} tokens     List of strings to look for.
    *   @return {Number}          Position of the first matching token. -1 if none found.
    *   @throws {CompilerError}
    */
    function findNext(code, offset, tokens) {
        if(tokens.length > 0) {
            var pos = -1;
            for(var i=0; i<tokens.length; i++) {
                if(pos<0 || (code.indexOf(tokens[i], offset)!=-1 && code.indexOf(tokens[i], offset)<pos)) {
                    pos = code.indexOf(tokens[i], offset);
                }
            }
            return(pos);
        } else {
            throw new CompilerError("Empty token list passed.","Lexer","findNext");
        }
    };

    /**
    *   <p>Check an identifier for validity.</p>
    *
    *   @private
    *   @param {String} word    The word to check.
    *   @return {Boolean}       Wether the identifier is valid.
    */
    function validIdentifier(word) {
        var validator = /^[a-z,A-Z]+\w*$/;
        return(validator.test(word));
    };

};

module.exports = new Lexer();
