(function() {
    'use strict';

    var root = this;

    root.require([
		'backbone',
		'application',
		'regionManager',
		'controllers/navigation'
	],
	function ( Backbone, App ) {
		App.start();
	});
}).call( this );