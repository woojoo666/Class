var Class = function() {};
Class.extend = function(proto) {
    var subclass = function(args) { //make new subclass
        for (var prop in this) {
            if (this[prop] instanceof Function && this.uber[prop]) {
                (function(me, func) {
                    me[prop].uber = function(args2) { //note that any call to this function will use this[prop] as its scope
                        me.uber[func].call(me, args2); //use current instance's scope instead of this[prop]'s scope
                    };
                })(this, prop); //store 'this' in closure and property name 'prop' and also store it in closure
            }
        }

        this.construct && this.construct(args); //construct() if it exists
    };

    function temp() {}
    temp.prototype = this.prototype; //temp is a copy of the superclass without its constructor
    subclass.prototype = new temp(); //now you can inherit superclass's prototype without calling superclass's constructor
    subclass.extend = this.extend; //copy extend function
    subclass.prototype.uber = this.prototype;

    //append prototype
    for (var prop in proto)
        subclass.prototype[prop] = proto[prop];

    return subclass;
};

function uber(args) {
    return arguments.callee.caller.uber(args);
}
