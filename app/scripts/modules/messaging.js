(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'modules/config'
	],
	function( Backbone, Communicator, moduleConfiguration ) {

		var Navigation = Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a Messaging Controller");

				// module name
				this._name = "messaging";

				// create a region
				this.region = Communicator.reqres.request( "RM:addRegion", _.uniqueId('region_'), '#messages-region' );

				// create a module
				this.submodules = {};
				this.module = Backbone.Marionette.Module.create( this, this._name, this.moduleDefinition );

				// subscribe to events
				Communicator.mediator.on( moduleConfiguration[ this._name ], this.module.start, this.module);
			},

			moduleDefinition: function( MyModule, Controller, Backbone, Marionette, $, _ ) {
				/* no need to start with parent */
				this.startWithParent = false;

				MyModule.controller = Controller;

				MyModule.addInitializer(function(){
				    console.log("Starting messaging module !!");
				    this.controller.initMessaging();
				});
			},

			initMessaging: function() {
				// need message model

				// need message view

				// set up events API
				Communicator.mediator.on( "APP:MESSAGING", this.handleMessaging, this );
			},

			handleMessaging: function( messageObject ) {
				// set the model with the latest messagingObject
				// possibly show a new view in the region
			}
		});

		return new Navigation();

	});
}).call( this );
