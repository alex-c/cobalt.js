var {CobaltError, CobaltTypeError, CobaltReferenceError} = require('../errors');

/**
*   <p>Symbol tables used in scope-defining nodes of the AST.</p>
*/
function SymbolTable() {

    this.symbols = [];

};

SymbolTable.prototype.hasSymbol = function(name) {
    var found = false;
    for(var i=0; i<this.symbols.length; i++) {
        if(this.symbols[i].name == name) {
            found = true;
            break;
        }
    }
    return(found)
};

SymbolTable.prototype.registerSymbol = function(name, type) {
    if(this.hasSymbol()) {
        throw new CobaltError(-1, "A variable with the "+name+" has already been declared in this scope.");
    } else {
        this.symbols.push({
            name: name,
            type: type
        });
    }
};

SymbolTable.prototype.updateSymbol = function(name, type, value) {
    var found = false;
    for(var i=0; i<this.symbols.length; i++) {
        if(this.symbols[i].name == name) {
            found = true;
            if(this.symbols[i].type == type) {
                this.symbols[i].value = value;
            } else {
                throw new CobaltTypeError(-1, "Cannot assign value of type "+type+", as "+name+" is of type "+this.symbols[i].type+".");
            }
            break;
        }
    }
    if(!found) {
        throw new CobaltReferenceError(-1, "Could not assign value to variable "+name+", as it has not been declared.");
    }
};

module.exports = SymbolTable;
