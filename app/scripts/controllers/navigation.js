(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator'
	],
	function( Backbone, Communicator ) {

		var Navigation = Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a Navigation Controller");

				// create a region
				this.region = Communicator.reqres.request( "RM:addRegion", _.uniqueId('region_'), '#nav-region' );

				// create a module
				this.module = Backbone.Marionette.Module.create( this, "navigation", this.moduleDefinition );

				// subscribe to events
				Communicator.mediator.on("APP:START", this.module.start);
			},

			moduleDefinition: function( MyModule, MyApp, Backbone, Marionette, $, _ ) {
				console.log("Executing module definition for navigation");
				console.log( arguments );

				MyModule.addInitializer(function(){
				    console.log("Starting navigation module");
				    console.log( arguments );
				});
			}
		});

		return new Navigation();

	});
}).call( this );
