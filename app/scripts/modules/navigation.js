(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'modules/config',
		'views/item/navbar',
		'models/account'
	],
	function( Backbone, Communicator, moduleConfiguration, NavBar, account ) {

		var Navigation = Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a Navigation Controller");

				// module name
				this._name = "navigation";

				// create a region
				this.region = Communicator.reqres.request( "RM:addRegion", _.uniqueId('region_'), '#nav-region' );

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
				    console.log("Starting navigation module !!");
				    this.controller.initNavBar();
				});
			},

			initNavBar: function() {

				// on init nav bar check if we are authenticated
				// then build the nav bar
				var navBar = new NavBar({ model: account });

				navBar.on( "NAV:ACCOUNT", this.handleAccount, this );
				navBar.on( "NAV:TALK", this.handleTalk, this );

				this.region.show( navBar );

				account.isAuthenticated();
			},

			handleAccount: function( action ) {
				console.log("handleAccount");
				Communicator.command.execute( "APP:ACCOUNT:" + action );
			},

			handleTalk: function( action ) {
				console.log( "handleTalk" );
				Communicator.command.execute( "APP:TALK:" + action );
			}
		});

		return new Navigation();

	});
}).call( this );
