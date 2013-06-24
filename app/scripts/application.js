(function() {
	'use strict';

	var root = this;
	var _ = root._;

	root.define([
		'backbone',
		'communicator',
		'modules/config'
	],

	function( Backbone, Communicator, moduleConfiguration ) {

		//Backbone.emulateHTTP = true;

		var App = new Backbone.Marionette.Application();

		/* Add initializers here */
		App.addInitializer( function () {
			console.log("APP:START");

			// run through module config 
			var preLoadModules = [];
			_.each( moduleConfiguration, function(value, key, list) {
				// preload any module for APP:START
				if( value === "APP:START" ) {
					preLoadModules.push( 'modules/' + key );
				}
			});

			root.require(preLoadModules, function(){
				// publish application start event when the pre load modules have arrived
				Communicator.mediator.trigger("APP:START");
			});
		});

		return App;
	});
}).call( this );
