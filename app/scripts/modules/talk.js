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
		'views/item/newTalk',
		'views/item/editTalk',
		'models/account'
	],
	function( $, Backbone, Communicator, moduleConfiguration, Talk, Talks, TalksMainListView, NewTalkView, EditTalkView, account ) {

		var TalkModule = Backbone.Marionette.Controller.extend({
		
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
				this.createDataStores();

				// fetch talks then build main view
				$.when( this.talksCollection.fetch() ).then( _.bind( function(){
					this.region.show( new TalksMainListView({ collection: this.talksCollection, model: this.account }) );
				}, this ) );	

				// set up events API
				Communicator.command.setHandler( "APP:TALK:NEW", this.handleNewTalk, this );
				Communicator.command.setHandler( "APP:TALK:EDIT", this.handleEditTalk, this );
				Communicator.command.setHandler( "APP:TALK:MINE", this.handleMyTalks, this );
				Communicator.command.setHandler( "APP:TALK:ALL", this.handleAllTalks, this );
			},

			createDataStores: function() {
				// create talks collection
				this.talksCollection = new Talks();
				this.account = account;
			},

			handleNewTalk: function() {
				console.log('handle new talk module handler');

				// request login status
				var loggedIn = Communicator.reqres.request( "APP:ACCOUNT:ISLOGGEDIN" );


				// if logged in show talk modal
				if( loggedIn ) {
					console.log( "loggedIn" );

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

					console.log( "NEWTALKVIEW  --->");
					console.log( newTalkView );

					// show view
					Communicator.command.execute( "APP:MODAL:SHOW", newTalkView, "modal-wide" );
				}
				// else go to log in
				else {
					var defer = $.Deferred();
					defer.done( _.bind(this.handleNewTalk, this) );
					Communicator.command.execute( "APP:ACCOUNT:LOGIN", defer );
				}
				
			},

			handleEditTalk: function( talk ) {
				console.log("handleEditTalk");
				console.log( talk );

				var userData = Communicator.reqres.request( "APP:ACCOUNT:USER");

				Communicator.command.execute( "APP:MODAL:SHOW", new EditTalkView({ 
					model: talk,
					userData: userData
				}), "modal-wide" );
			},

			handleAllTalks: function() {
				console.log("TALK module: handleAllTalks");

				// set talksConfig
				this.account.set({ _mine: false });

				//fetch ALL talks
				this.talksCollection.fetch({
    				reset: true
    			});
			},

			handleMyTalks: function() {
				console.log("TALK module: handleMyTalks");

				// set talksConfig
				this.account.set({ _mine: true });

				console.log( this.account );

				//fetch MY talks "mine"
				this.talksCollection.fetch({
    				reset: true,
    				data: { mine: true }
    			});
			}
		});

		return new TalkModule();

	});
}).call( this );
