(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'views/layout/feed'
	],
	function( Backbone, Communicator, FeedLayout ) {

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
				this.region.show( new FeedLayout() );
			}
		});

		return new Navigation();

	});
}).call( this );
