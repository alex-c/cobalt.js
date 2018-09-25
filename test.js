var Cobalt = require('./cobalt');
var {CobaltError} = require('./errors');

try {
    var result = Cobalt.js("def x:bool = 3+5 > 2-1;");
    console.log(result.toString());
} catch(e) {
    console.log(e.toString());
}
