(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'backbone.marionette'
	],
	function( Backbone ) {

		var communicator = Backbone.Marionette.Controller.extend({
			initialize: function( options ) {
				console.log("initialize a Communicator");

				// create a pub sub
				this.mediator = new Backbone.Wreqr.EventAggregator();

				//create a req/res
				this.reqres = new Backbone.Wreqr.RequestResponse();

				// create commands
				this.command = new Backbone.Wreqr.Commands();
			}
		});

		/* return singleton */
		return new communicator();
	});
}).call( this );