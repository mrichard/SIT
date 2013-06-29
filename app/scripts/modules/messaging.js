(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'modules/config',
		'models/message',
		'views/item/message'
	],
	function( Backbone, Communicator, moduleConfiguration, Message, MessageView ) {

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
				//message model
				this.messageModel = new Message();

				// set up events API
				Communicator.mediator.on( "APP:MESSAGING", this.handleMessaging, this );
			},

			handleMessaging: function( messageObject ) {
				console.log( "handleMessaging" );
				console.log( messageObject );

				this.messageModel.set( messageObject );

				this.region.show( new MessageView({ model: this.messageModel }) );

				// after 4 seconds fade out the message
				setTimeout( _.bind(function(){
					this.region.currentView.$el.fadeOut( 500 );
				}, this), 3000);
			}
		});

		return new Navigation();

	});
}).call( this );
