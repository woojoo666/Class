var Class = function() {};
Class.extend = function(proto) {
    var subclass = function(args) { //make new subclass
        for (var prop in this) {
            if (this[prop] instanceof Function && this.uber[prop]) {
                (function(me, func) {
                    me[prop].uber = function(args2) { //note that any call to this function will use this[prop] as its scope
                        console.log(func);
                        me.uber[func].call(me, args2); //use current instance's scope instead of this[prop]'s scope
                    };
                })(this, prop); //store 'this' in closure and property name 'prop' and also store it in closure
            }
        }

        this.construct && this.construct(args); //construct() if it exists
    };

    subclass.prototype = new this(); //inherit prototype
    subclass.extend = this.extend; //copy extend function
    subclass.prototype.uber = this.prototype;

    //append prototype
    for (var prop in proto)
        subclass.prototype[prop] = proto[prop];

    return subclass;
};

function uber() {
    return arguments.callee.caller.uber();
}
