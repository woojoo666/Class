var Class = function() {};
Class.extend = function(proto) {
    var subclass = proto.construct || function(){}; //make new subclass
    subclass.prototype = new this(); //inherit prototype
    subclass.extend = this.extend; //copy extend function

    //append prototype
    for (var prop in proto) {
        subclass.prototype[prop] = proto[prop];

        if (proto[prop] instanceof Function && this.prototype[prop]) //if superclass has function
            subclass.prototype[prop].uber = this.prototype[prop]; //add uber()
    }

    return subclass;
};

function uber() {
  return arguments.callee.caller.uber();
}
