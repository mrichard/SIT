(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator'
	],

	function( Backbone, Communicator ) {

		//Backbone.emulateHTTP = true;

		var App = new Backbone.Marionette.Application();

		/* Add initializers here */
		App.addInitializer( function () {
			console.log("APP:START");

			// publish a load event for the APP:START
			Communicator.mediator.trigger( "APP:LOAD", "APP:START" );
		});

		return App;
	});
}).call( this );
