(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'views/layout/feed',
		'views/composite/feedUsers',
		'collections/feedUsers'
	],
	function( Backbone, Communicator, FeedLayout, FeedUsersView, FeedUsers ) {

		var Navigation = Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a Feed Controller");

				// module name
				this._name = "feed";

				// create a region
				this.region = Communicator.reqres.request( "RM:addRegion", _.uniqueId('region_'), '#feed-region' );

				// create a module
				this.submodules = {};
				this.module = Backbone.Marionette.Module.create( this, this._name, this.moduleDefinition );
			},

			moduleDefinition: function( MyModule, Controller, Backbone, Marionette, $, _ ) {
				/* no need to start with parent */
				this.startWithParent = false;

				MyModule.controller = Controller;

				MyModule.addInitializer(function(){
				    console.log("Starting Feed module !!");
				    this.controller.initFeed();
				});
			},

			initFeed: function() {
				// build layout
				var feedLayout = new FeedLayout();

				// show on module region
				this.region.show( feedLayout );

				// show  users sub view in layout region
				feedLayout.users.show( new FeedUsersView({ collection: new FeedUsers() }) );
			}
		});

		return new Navigation();

	});
}).call( this );
