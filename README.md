Class.js
========

A tiny, microscopic, quark-sized javascript file for simple class functionality. 
Heavily based off of code from [this website](http://joshgertzen.com/object-oriented-super-class-method-calling-with-javascript/)

Includes:
- Easy subclassing
- Accessing parent class and parent functions

To use it, just include the `Class.js` file in your page. The `testClass.html` file is just an example. For an in-depth tutorial, read on!

Declaring a new Class or Subclass
---------------------------------

Use syntax:

	Class.extend({prototype})

You can also declare a constructor function in the prototype using the `construct` property.
This method will automatically be called when you create a new instance.

	var baseClass = Class.extend({
		construct: function(name) {
			this.name = name;
			this.job = 'rapper';
		}
	});

	var myBase = new Baseclass('Based God');


`Class` is a class itself, so this is actually making a subclass of `Class`.
You can do this with any class by replacing `Class`, eg.

	var subClass = baseClass.extend({subclass-prototype});

Parent class properties and methods are inherited, and can be overriden.


Accessing the Parent Class
--------------------------

To access a method's superclass method from inside the function, you can just use the `uber()` keyword.
To call the superclass method from anywhere, use the function's `uber` property. Using this, you can even do constructor chaining.

For example, continuing from the previously defined `baseClass`

	var subClass = baseClass.extend({
		construct: function() {
			uber('m&m'); //call the parent constructor
			this.catchphrase = 'but Im not a wrapper';
		}
	})

	var mySub = new subClass();
	mySub.construct.uber('Rap God'); //call the function's parent function to change my 'name'
	mySub.uber.construct('Rap God'); //call the parent class's function to change my 'name' (same effect)


Notes
-----

Please don't modify or reassign `Class` or `uber`, treat them like reserved words.
I am not responsible for any code deaths.
