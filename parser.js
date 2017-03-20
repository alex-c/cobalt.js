var {CompilerError, CobaltSyntaxError} = require('./errors');

/**
*   <p>A parser for the Cobalt programming language.</p>
*/
function Parser() {

    var {
        ProgramNode,
        CodeBlockNode,
        VariableDeclarationNode,
        AssignmentNode,
        OutputNode,
        ExpressionNode,
        BinaryExpressionNode,
        AdditionNode,
        SubstractionNode,
        MultiplicationNode,
        DivisionNode,
        ComparisonNode,
        LogicalAndNode,
        LogicalOrNode,
        UnaryExpressionNode,
        LogicalNegationNode,
        ArithmeticNegationNode,
        IdentifierNode,
        TypeNode,
        IntLiteralNode,
        BoolLiteralNode,
        ASTNode
    } = require('./ast_nodes');

    /**
    *   <p>Parses a Cobalt program in token form and builds an AST (abstract syntax tree).</p>
    *   <p>A Cobalt program is handled as a code block whith an associated block scope, which constitutes the global program scope.</p>
    *   <p>The AST getting returned, is an instance of {ProgramNode}, which contains a {CodeBlockNode} and possibly some meta-information. All AST nodes are instances of {ASTNode}.</p>
    *   <p>The parser only builds the AST following the grammar rules given in EBNF form in the language specification. It does not perform type checking, nor does it populate symbol tables.</p>
    *
    *   @param {Array} tokens   The token list to parse.
    *   @return {ProgramNode}   The AST representation of the Cobalt program.
    *   @throws {CobaltSyntaxError}
    */
    this.parse = function(tokens) {

        //Set up
        var AST = new ProgramNode();

        //Parse the program
        var codeBlock = parseCodeBlock(tokens, 0, tokens.length);
        AST.setCode(codeBlock);

        //Parsing successful, return AST
        return(AST);

    };

    /**
    *   <p>Parses a code block.</p>
    *
    *   @private
    *   @param {Array} tokens       The token list from which to parse.
    *   @param {Number} position    Where to start parsing.
    *   @param {Number} limit       End of the code block.
    *   @return {CodeBlockNode}     Returns a {CodeBlockNode} to be integrated in the AST.
    *   @throws {CobaltSyntaxError}
    */
    function parseCodeBlock(tokens, position, limit) {

        //Set up new code block node
        var codeBlock = new CodeBlockNode(tokens[0].line);

        //Parse code block
        while(position < limit) {
            var token = tokens[position];
            if(token.type == 'declaration') {
                var declarationLimit = findNextSemicolon(tokens, position);
                if(declarationLimit >  0) {
                    codeBlock.addStatement(parseVariableDeclaration(tokens, position, declarationLimit));
                    position = declarationLimit+1;
                } else {
                    throw new CobaltSyntaxError(token.line, "Could not find a semicolon to close a variable declaration statement.");
                }
            } else if(token.type == 'identifier') {
                var assignmentLimit = findNextSemicolon(tokens, position);
                if(assignmentLimit >  0) {
                    codeBlock.addStatement(parseAssignment(tokens, position, assignmentLimit));
                    position = assignmentLimit+1;
                } else {
                    throw new CobaltSyntaxError(token.line, "Could not find a semicolon to close expression in an assignment statement.");
                }
            } else if(token.type == 'output') {
                var outputLimit = findNextSemicolon(tokens, position);
                if(outputLimit >  0) {
                    codeBlock.addStatement(parseOutput(tokens, position, outputLimit));
                    position = outputLimit+1;
                } else {
                    throw new CobaltSyntaxError(token.line, "Could not find a semicolon to close expression in an output statement.");
                }
            }  else {
                throw new CobaltSyntaxError(token.line, "Expexted a statement while parsing code block, got '"+token.type+"' instead.");
            }
        }

        //Parsing successful, return code block node
        return(codeBlock);

    };

    /**
    *   <p>Parses a varaible declaration.</p>
    *
    *   @private
    *   @param {Array} tokens               The token list from which to parse.
    *   @param {Number} position            Where to start parsing.
    *   @param {Number} limit               End of the declaration statement.
    *   @return {VariableDeclarationNode}   Returns a {VariableDeclarationNode} to be integrated in the AST.
    *   @throws {CobaltSyntaxError}
    */
    function parseVariableDeclaration(tokens, position, limit) {

        //Set up new variable declaration node
        var variableDeclaration = new VariableDeclarationNode(tokens[position].line);

        //Parse the variable declaration
        if(tokens[position].type == 'declaration'
        && tokens[position+1].type == 'identifier'
        && tokens[position+2].type == 'colon') {
            if(tokens[position+3].type == 'type') {
                variableDeclaration.setIdentifier(parseIdentifier(tokens[position+1]));
                variableDeclaration.setType(parseType(tokens[position+3]));
                if(tokens[position+4].type == 'equal') {
                    variableDeclaration.setExpression(parseExpression(tokens, position+5, limit));
                } else if(tokens[position+4].type == 'semicolon' && limit == position+4) {
                    //Variable declaration with explict type, and no exression
                } else {
                    throw new CobaltSyntaxError(tokens[position+4].line, "Illegal syntax inside a variable declaration: the type keyword should either be followed by an assigned expression or a semicolon.");
                }
            } else {
                if(tokens[position+3].type == 'equal') {
                    variableDeclaration.setExpression(parseExpression(tokens, position+4, limit));
                } else {
                    throw new CobaltSyntaxError(tokens[position+3].line, "Illegal syntax inside a variable declaration: a declaration without an explicit type needs an assigned expression.");
                }
            }
        } else {
            throw new CobaltSyntaxError(tokens[position].line, "Illegal syntax inside a variable declaration.");
        }

        //Parsing successful, return variable declaration node
        return(variableDeclaration);

    };

    /**
    *   <p>Parses a varaible assignment.</p>
    *
    *   @private
    *   @param {Array} tokens       The token list from which to parse.
    *   @param {Number} position    Where to start parsing.
    *   @param {Number} limit       End of the assignment statement.
    *   @return {AssignmentNode}    Returns an {AssignmentNode} to be integrated in the AST.
    *   @throws {CobaltSyntaxError}
    */
    function parseAssignment(tokens, position, limit) {

        //Set up new assignment node
        var assignment = new AssignmentNode(tokens[position].line);

        //Parse the variable assignment
        if(tokens[position].type == 'identifier'
        && tokens[position+1].type == 'colon'
        && tokens[position+2].type == 'equal'
        && tokens[limit].type == 'semicolon') {
            assignment.setIdentifier(parseIdentifier(tokens[position]));
            assignment.setExpression(parseExpression(tokens, position+3, limit));
        } else {
            throw new CobaltSyntaxError(tokens[position].line, "Illegal syntax inside an assignment statement.");
        }

        //Parsing successful, return assignement node
        return(assignement);

    };

    /**
    *   <p>Parses an output statement.</p>
    *
    *   @private
    *   @param {Array} tokens       The token list from which to parse.
    *   @param {Number} position    Where to start parsing.
    *   @param {Number} limit       End of the output statement.
    *   @return {OutputNode}        Returns an {OutputNode} to be integrated in the AST.
    *   @throws {CobaltSyntaxError}
    */
    function parseOutput(tokens, position, limit) {

        //Set up new output node
        var output = new OutputNode(tokens[position].line);

        //Parse the output statement
        if(tokens[position].type == 'out' && tokens[limit].type == 'semicolon') {
            output.setExpression(parseExpression(tokens, position+1, limit));
        } else {
            throw new CobaltSyntaxError(tokens[position].line, "Illegal syntax in an output statement.");
        }

        //Parsing successful, return output node
        return(output);

    };

    /**
    *   <p>Parses an expression.</p>
    *
    *   @private
    *   @param {Array} tokens       The token list from which to parse.
    *   @param {Number} position    Where to start parsing.
    *   @param {Number} limit       End of the expression.
    *   @return {ExpressionNode}    Returns an {ExpressionNode} to be integrated in the AST.
    *   @throws {CobaltSyntaxError}
    */
    function parseExpression(tokens, position, limit) {

        //Preprocess -> recognize operators and enrich with precedence information
        var expressionTokens = preprocessExpression(tokens, position, limit);
        if(expressionTokens.length == 0) {
            throw new CobaltSyntaxError(-1, "Illegal syntax, expression is empty.");
        }

        //Parse expression - shunting yard algorithm
        var outputStack = [];
        var operatorStack = [];
        var token, operator, left, right;
        for(var i=0; i<expressionTokens.length; i++) {
            token = expressionTokens[i];
            if(token.type == 'identifier') {
                outputStack.push(parseIdentifier(token));
            } else if(token.type == 'literal') {
                outputStack.push(parseLiteral(token));
            } else if(token.precedence != undefined) {
                while(operatorStack.length>0 && token.precedence<=operatorStack[operatorStack.length-1].precedence) {
                    operator = operatorStack.pop();
                    if(operator.arity == 2) {
                        right = outputStack.pop();
                        left = outputStack.pop();
                        outputStack.push(parseBinaryExpresssion(operator, left, right));
                    } else if(operator.arity == 1) {
                        right = outputStack.pop();
                        outputStack.push(parseUnaryExpression(operator, right));
                    } else {
                        throw new CompilerError("Operator with illegal arity ("+operator.arity+").", "Parser", "parseExpression");
                    }
                }
                operatorStack.push(token);
            } else if(token.type == 'lparen') {
                operatorStack.push(token);
            } else if(token.type == 'rparen') {
                while(operatorStack.length !=0 && operatorStack[operatorStack.length-1].type != 'lparen') {
                    operator = operatorStack.pop();
                    if(operator.arity == 2) {
                        right = outputStack.pop();
                        left = outputStack.pop();
                        outputStack.push(parseBinaryExpresssion(operator, left, right));
                    } else if(operator.arity == 1) {
                        right = outputStack.pop();
                        outputStack.push(parseUnaryExpression(operator, right));
                    } else {
                        throw new CompilerError("Operator with illegal arity ("+operator.arity+").", "Parser", "parseExpression");
                    }
                }
                if(operatorStack[operatorStack.length-1].type != 'lparen') {
                    throw new CobaltSyntaxError(token.line, "Parantheses missmatched in expression.");
                }
                operatorStack.pop();
            } else {
                throw new CompilerError("Illegal token in expression", "Parser", "parseExpression"); //this should have been caught in the expression preprocessor
            }
        }
        while(operatorStack.length > 0) {
            operator = operatorStack.pop();
            if(operator.type == 'lparen' || operator.type == 'rparen') {
                throw new CobaltSyntaxError(operator.line, "Parantheses missmatched in expression.");
            }
            if(operator.arity == 2) {
                right = outputStack.pop();
                left = outputStack.pop();
                outputStack.push(parseBinaryExpresssion(operator, left, right));
            } else if(operator.arity == 1) {
                right = outputStack.pop();
                outputStack.push(parseUnaryExpression(operator, right));
            } else {
                throw new CompilerError("Operator with illegal arity ("+operator.arity+").", "Parser", "parseExpression");
            }
        }
        if(outputStack.length == 1) {
            return(outputStack.pop());
        } else {
            throw new CompilerError("Parsing expression failed, more than one element left on the output stack.", "Parser", "parseExpression");
        }
    };

    /**
    *   <p>Parses a binary expression.</p>
    *
    *   @private
    *   @param {token} operator An operator token.
    *   @param {ASTNode} left   Left branch of the binary expression.
    *   @param {ASTNode} right  Right branch of the binary expression.
    *   @return {BinaryExpressionNode}
    */
    function parseBinaryExpresssion(operator, left, right) {
        if(!(left instanceof ASTNode && right instanceof ASTNode)) {
            throw new CompilerError("At least one of the passed branches is not an AST node.", "Parser", "parseBinaryExpresssion");
        }
        var expression;
        if(operator.type == 'plus') {
            expression = new AdditionNode(operator.line);
        } else if(operator.type == 'minus') {
            expression = new SubstractionNode(operator.line);
        } else if(operator.type == 'multiply') {
            expression = new MultiplicationNode(operator.line);
        } else if(operator.type == 'divide') {
            expression = new DivisionNode(operator.line);
        } else if(operator.type == 'equal' || operator.type == 'notequal' || operator.type == 'greater' || operator.type == 'greaterequal' || operator.type == 'less' || operator.type == 'lessequal') {
            expression = new ComparisonNode(operator.line, operator.type);
        } else if(operator.type == 'and') {
            expression = new LogicalAndNode(operator.line);
        } else if(operator.type == 'or') {
            expression = new LogicalOrNode(operator.line);
        } else {
            throw new CompilerError("Passed token is not a legal operator, has type "+operator.type+" instead.", "Parser", "parseBinaryExpresssion");
        }
        expression.setLeftOperand(left);
        expression.setRightOperand(right);
        return(expression);
    };

    /**
    *   <p>Parses an unary expression.</p>
    *
    *   @private
    *   @param {token} operator     An operator token.
    *   @param {ASTNode} operand    Operand branch of the expression.
    *   @return {UnaryExpressionNode}
    */
    function parseUnaryExpresssion(operator, operand) {
        if(!operand instanceof ASTNode) {
            throw new CompilerError("The passed operand is not an AST node.", "Parser", "parseUnaryExpresssion");
        }
        var expression;
        if(operator.type == 'not') {
            expression = new LogicalNegationNode(operator.line);
        } else if(operator.type == 'tilde') {
            expression = new ArithmeticNegationNode(operator.line);
        } else {
            throw new CompilerError("Passed token is not a legal operator, has type "+operator.type+" instead.", "Parser", "parseUnaryExpresssion");
        }
        expression.setOperand(operand);
        return(expression);
    };

    /**
    *   <p>Parses an identifier.</p>
    *
    *   @private
    *   @param {Object} token       The token to parse.
    *   @return {IdentifierNode}    Returns an {IdentifierNode} to be integrated in the AST.
    *   @throws {CompilerError}
    */
    function parseIdentifier(token) {
        if(token.type == 'identifier') {
            var identifier = new IdentifierNode(token.line, token.value);
            return(identifier);
        } else {
            throw new CompilerError("Attempted parsing an identifier, but token is of type "+token.type+".", "Parser", "parseIdentifier");
        }
    };

    /**
    *   <p>Parses a type keyword.</p>
    *
    *   @private
    *   @param {Object} token       The token to parse.
    *   @return {TypeNode}          Returns a {TypeNode} to be integrated in the AST.
    *   @throws {CompilerError}
    */
    function parseType(token) {
        if(token.type == 'type') {
            var type = new TypeNode(token.line, token.subtype);
            return(type);
        } else {
            throw new CompilerError("Attempted parsing a type keyword, but token is of type "+token.type+".", "Parser", "parseType");
        }
    };

    /**
    *   <p>Parses a literal value.</p>
    *
    *   @private
    *   @param {Object} token       The token to parse.
    *   @return {LiteralNode}       Returns a {LiteralNode} ({IntLiteralNode} or {BoolLiteralNode}) to be integrated in the AST.
    *   @throws {CompilerError}
    */
    function parseLiteral(token) {
        if(token.type == 'literal') {
            var literal;
            if(token.subtype == 'int') {
                literal = new IntLiteralNode(token.line, token.value);
            } else if(token.subtype == 'bool') {
                literal = new BoolLiteralNode(token.line, token.value);
            } else {
                throw new CompilerError("Failed parsing a literal: unknown type.", "Parser", "parseLiteral");
            }
            return(literal);
        } else {
            throw new CompilerError("Attempted parsing a literal, but toke is of type "+token.type+".", "Parser", "parseLiteral");
        }
    };

    /**
    *   <p>Preprocesses an expression before it is parsed.</p>
    *   <p>This function recognizes operators, and builds a new token list with updated tokens.</p>
    *   <p>The new token list has tokens for operators, instead of tokens for single syntactic units (eg. EqualOperator instead of Equal,Equal).</p>
    *   <p>The new operator tokens are enriched with information about operator precedence.</p>
    *
    *   @param {Array} tokens       The token list to process.
    *   @param {Number} position    Where to start preprocessing.
    *   @param {Number} limit       End of the expression.
    *   @return {Array}             Returns the new token list.
    *   @throws {CobaltSyntaxError}
    */
    function preprocessExpression(tokens, position, limit) {
        var processedTokens = [];
        var token;
        while(position < limit) {
            token = tokens[position];
            if(token.type == 'literal' || token.type == 'identifier' || token.type == 'lparen' || token.type == 'rparen') {
                processedTokens.push(token);
            } else if(token.type == 'and' || token.type == 'or') {
                processedTokens.push({
                    type: token.type,
                    line: token.line,
                    precedence: 1,
                    arity: 2
                });
            } else if(token.type == 'not') {
                if(tokens[position+1].type == 'equal') {
                    processedTokens.push({
                        type: 'notequal',
                        line: token.line,
                        precedence: 3,
                        arity: 2
                    });
                    position++;
                } else {
                    processedTokens.push({
                        type: token.type,
                        line: token.line,
                        precedence: 2,
                        arity: 1
                    });
                }
            } else if(token.type == 'equal') {
                if(tokens[position+1].type == 'equal') {
                    processedTokens.push({
                        type: token.type,
                        line: token.line,
                        precedence: 3,
                        arity: 2
                    });
                    position++;
                } else {
                    throw new CobaltSyntaxError(token.line, "Illegal operator in expression: expected equal, got "+tokens[position+1].type+" instead.")
                }
            } else if(token.type == 'greater' || token.type == 'less') {
                if(tokens[position+1].type == 'equal') {
                    processedTokens.push({
                        type: token.type+'equal',
                        line: token.line,
                        precedence: 3,
                        arity: 2
                    });
                    position++;
                } else {
                    processedTokens.push({
                        type: token.type,
                        line: token.line,
                        precedence: 3,
                        arity: 2
                    });
                }
            } else if(token.type == 'plus' || token.type == 'minus') {
                processedTokens.push({
                    type: token.type,
                    line: token.line,
                    precedence: 4,
                    arity: 2
                });
            } else if(token.type == 'multiply' || token.type == 'divide') {
                processedTokens.push({
                    type: token.type,
                    line: token.line,
                    precedence: 5,
                    arity: 2
                });
            } else if(token.type == 'tilde') {
                processedTokens.push({
                    type: token.type,
                    line: token.line,
                    precedence: 6,
                    arity: 1
                });
            } else {
                throw new CobaltSyntaxError(token.line, "Illegal token ("+token.type+") in expression.");
            }
            position++;
        }
        return(processedTokens);
    };

    /**
    *   <p>Finds the next semicolon in a token list, starting from an offset.</p>
    *
    *   @param {Array} tokens  Token list to search in.
    *   @param {Number} offset The offset from where to start searching.
    *   @return {Number}       The position of the next semicolon. -1 if no semicolon found.
    */
    function findNextSemicolon(tokens, offset) {
        for(var i=offset; i<tokens.length; i++) {
            if(tokens[i].type == 'semicolon') return i;
        }
        return(-1);
    };

    /**
    *   <p>Finds a matching token in a list of tokens.</p>
    *   <p>This is used to find matching parantheses: findMatching(tokens, offset, "rparen", "lparen");</p>
    *
    *   @param {Array} tokens     The token list to search in.
    *   @param {Number} offset    The offset at which to start.
    *   @param {String} find      The token type to find.
    *   @param {String} ignore    For each occurence of a token of this type, one occurence of a token to find is ignored.
    *   @return {Number}          The position of the matching token. -1 if none found.
    */
    function findMatching(tokens, offset, find, ignore) {
        var count = 0;
        for(var i=offset; i<tokens.length; i++) {
            if(tokens[i].type == find) {
                if(count == 0) {
                    return(i);
                } else {
                    count--;
                }
            } else if (tokens[i].type == ignore) {
                count++;
            }
        }
        return(-1);
    };

};

module.exports = new Parser();
