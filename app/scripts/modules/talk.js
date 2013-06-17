(function() {
	'use strict';

	var root = this;

	root.define([
		'jquery',
		'backbone',
		'communicator',
		'modules/config',
		'models/talk',
		'collections/talks',
		'views/composite/talksMainList',
		'views/item/newTalk'
	],
	function( $, Backbone, Communicator, moduleConfiguration, Talk, Talks, TalksMainListView, NewTalkView ) {

		var Navigation = Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a talk Controller");

				// module name
				this._name = "talk";

				// create a region
				this.region = Communicator.reqres.request( "RM:addRegion", _.uniqueId('region_'), '#main-region' );

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
				    console.log("Starting talk module !!");
				    this.controller.initTalk();
				});
			},

			initTalk: function() {
				// create talks collection
				this.createTalksCollection();

				// fetch talks then build main view
				$.when( this.talksCollection.fetch() ).then( _.bind( this.buildTalksMainView, this ) );	

				// set up events API
				Communicator.command.setHandler( "APP:TALK:NEW", this.handleNewTalk, this );
			},

			createTalksCollection: function() {
				// create talks collection
				this.talksCollection = new Talks();
			},

			buildTalksMainView: function( talks ) {
				console.log( "buildTalksMainView" );
				console.log( arguments );

				// build view
				var talksMainList = new TalksMainListView({ collection: this.talksCollection });

				// show in region
				this.region.show( talksMainList );
			},

			handleNewTalk: function() {

				// request login status
				var loggedIn = Communicator.reqres.request( "APP:ACCOUNT:ISLOGGEDIN" );

				// if logged in show talk modal
				if( loggedIn ) {

					// get account data
					var userData = Communicator.reqres.request( "APP:ACCOUNT:USER");

					// create model
					var newTalk = new Talk({
						createdDate: (new Date()).toLocaleString()
					});

					//create view
					var newTalkView = new NewTalkView({ 
						collection: this.talksCollection, 
						model: newTalk,
						userData: userData
					});

					// show view
					Communicator.command.execute( "APP:MODAL:SHOW", newTalkView, "modal-wide" );
				}
				// else go to log in
				else {
					var defer = $.Deferred();
					defer.done( this.handleNewTalk );
					Communicator.command.execute( "APP:ACCOUNT:LOGIN", defer );
				}
				
			}
		});

		return new Navigation();

	});
}).call( this );
