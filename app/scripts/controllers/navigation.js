(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator'
	],
	function( Backbone, Communicator ) {

		return Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a Navigation Controller");

				// TODO set a module and region
			}
		});

	});
}).call( this );