var Flyweight = function(ctor, keyfn) {

	'use strict';

	return function() {

		var key = keyfn.apply(arguments);

		if (Flyweight.cache[key]) {
			return Flyweight.cache[key];
		}

		var NewCtor       = function() {};
		NewCtor.prototype = ctor.prototype;
		var instance      = new NewCtor();
		ctor.apply(instance, arguments);

		Flyweight.cache[key] = instance;

		return instance;
	};
};

Flyweight.cache = {};