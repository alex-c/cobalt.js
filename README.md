## Introduction
Cobalt.js is a Cobalt-to-JavaScript transpiler for the [Cobalt programming language](https://alex-c.github.io/cobalt-specification).

#### About Cobalt
Cobalt is a statically and strongly typed programming language, that uses type inference. It is a programming language I created purely for learning purposes. I do not claim, that it is good or useful in any respect, nor that it solves any problems which other languages don't. Cobalt is an experiment, with the main goal of writing a compiler for it.

## Installation
To add cobalt.js to your project, install it via NPM:

    $ npm install cobalt.js --save

## Getting started
To use cobalt.js, require the cobalt.js script, which will export an instance of the transpiler. You can then use the transpiler's
```javascript
String js(String cobalt_code)
```
method to generate JavaScript code:
```javascript
    var cobalt = require('cobalt.js');
    var jscode = cobalt.js('def x:int = 3;print x;');
    console.log(jscode);

    /* Outputs:
    *   var x = 3;console.log(x);
    */
```

## Project status
Cobalt.js is work in progress! Current implementation status for Cobalt 0.1 (see [Cobalt Language Specification](https://alex-c.github.io/cobalt-specification)):

- [x] Lexer
- [ ] Parser
- [ ] Semantic analysis
- [ ] Optimization
- [ ] Code generation

Testing status:

- [x] Lexer
- [ ] Parser
- [ ] Semantic analysis
- [ ] Optimization
- [ ] Code generation
