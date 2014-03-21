var Class = function() {};
Class.extend = function(proto) {
    var subclass = function(args) { //make new subclass
        var _this = this; //store in closure

        for (var prop in this)
            if (this[prop] instanceof Function && this.uber[prop])
                this[prop].uber = function(args2) { //note that any call to this function will use this[prop] as its scope
                    _this.uber[prop].call(_this, args2); //use current instance's scope instead of this[prop]'s scope
                };

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
