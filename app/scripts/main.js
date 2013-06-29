(function() {
    'use strict';

    var root = this;

    root.require([
		'backbone',
		'application',
		'regions/regionManager',
		'modules/moduleLoader'
	],
	function ( Backbone, App ) {
		App.start();
	});
}).call( this );