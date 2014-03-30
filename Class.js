var Class = function() {};
Class.extend = function(proto) {
    var subclass = function() { //make new subclass
        for (var prop in this) {
            if (this[prop] instanceof Function && this.uber[prop]) {
                (function(me, fn) {
                    me[prop].uber = function() { //note that any call to this function will use this[prop] as its context
                        me.uber[fn].apply(me, arguments); //use current instance's context instead of this[prop]'s context
                    };
                })(this, prop); //store 'this' in closure and property name 'prop' and also store it in closure
            }
        }

        this.construct && this.construct.apply(this, arguments); //construct() if it exists
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

function uber() {
    return arguments.callee.caller.uber.apply(null, arguments);
}
